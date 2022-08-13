<template>
    <div>
        <v-dialog v-model="showWarning" max-width="600px">
            <v-card>
                <v-card-title class="text-h5"> Need More Time? </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>You session is about to expire. You will be automatically logged out in</v-col>
                    </v-row>
                    <v-row>
                        <v-col class="font-weight-black text-center text-h4">
                            {{ timeRemaining }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>To continue your session, select STAY SIGNED IN.</v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="stay">Stay Signed In</v-btn>
                    <v-btn color="blue darken-1" text @click="logout">Logout</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showDialog" max-width="600px">
            <v-card>
                <v-card-title class="text-h5 justify-center"> {{ dialogTitle }} </v-card-title>
                <v-card-text>
                    <div class="text-center">
                        {{ dialogContent }}
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeError">Close</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "SessionManager",
    data: () => ({
        timeout: null,
        warning: null,
        showWarning: false,
        showDialog: false,
        timeRemaining: "",
        loginId: null,

        dialogTitle: "",
        dialogContent: "",
        dialogOnClose: null,
    }),
    beforeMount() {
        this.initTimeout();
        axios.interceptors.response.use(
            (response) => {
                this.resetTimeout();
                let data = response?.data;
                let preId = this.loginId;
                let id = data?.LoginID;
                if (!preId && id) {
                    this.loginId = id;
                } else if (preId && id && preId != id) {
                    this.dialogTitle = "Oops";
                    this.dialogContent = "Your login session is changed, please refresh the page.";
                    this.dialogOnClose = () => {
                        window.onbeforeunload = null;
                        window.location.reload();
                    };
                    this.showDialog = true;
                }
                return response;
            },
            (error) => {
                let res = error?.response;
                let status = res?.status;
                let data = res?.data;
                if (status === 403) {
                    this.dialogTitle = "Oops";
                    this.dialogContent = "Your login session is either invalid or has expired, please login again.";
                    this.dialogOnClose = () => {
                        window.onbeforeunload = null;
                        window.location.reload();
                    };
                    this.showDialog = true;
                }
                return Promise.reject(error);
            }
        );
    },
    watch: {
        showDialog: function (newValue) {
            if (!newValue && typeof this.dialogOnClose === "function") {
                this.dialogOnClose();
            }
        },
    },
    methods: {
        setTimer() {
            setInterval(() => {
                let warningTime = localStorage.getItem("warningTime");
                let endTime = localStorage.getItem("endTime");
                if (warningTime && endTime) {
                    let now = new Date();
                    warningTime = new Date(localStorage.getItem("warningTime"));
                    endTime = new Date(localStorage.getItem("endTime"));

                    if (now.getTime() >= warningTime) {
                        if (!this.showWarning) this.showWarning = true;
                        this.timeRemaining = this.countDown(now, endTime);
                    } else {
                        if (this.showWarning) this.showWarning = false;
                    }

                    if (now.getTime() >= endTime && this.showWarning) {
                        this.logout();
                    }
                }
            }, 1000);
        },
        initTimeout() {
            axios({
                method: "GET",
                url: "http://localhost:8082/APICall-api/APICall/GetTimeout",
                dataType: "json",
            })
                .then((response) => {
                    if (response?.data) {
                        let d = response.data ? response.data : "";
                        let settings = d.split(",");
                        this.timeout = parseInt(settings[0]) ? parseInt(settings[0]) : null;
                        this.warning = parseInt(settings[1]) ? parseInt(settings[1]) : 2;

                        if (this.timeout && this.warning) {
                            this.resetTimeout();
                            this.setTimer();
                        }
                    }
                })
                .catch((ex) => {
                    console.log("Timeout setting is not available, session reminder is disabled.");
                });
        },
        resetTimeout() {
            if (this.timeout) {
                let startTime = new Date();
                let endTime = new Date(startTime.getTime() + this.timeout * 60 * 1000);
                let warningTime = new Date(startTime.getTime() + (this.timeout - this.warning) * 60 * 1000);

                localStorage.setItem("startTime", startTime);
                localStorage.setItem("endTime", endTime);
                localStorage.setItem("warningTime", warningTime);
            }
        },
        stay() {
            axios({
                method: "POST",
                url: "/APICall-api/APICall/RefreshSession",
                dataType: "json",
            })
                .then(() => {
                    this.resetTimeout();
                    this.showWarning = false;
                })
                .catch((ex) => {
                    this.showDialog = true;
                    this.dialogTitle = "Oops";
                    this.dialogMsg = ex.message;
                });
        },
        logout() {
            axios({
                method: "POST",
                url: "/Esevices-Logout",
                data: {},
                dataType: "json",
            })
                .then((response) => {
                    if (response.data) {
                        let json = response.data;
                        if (json.success) {
                            localStorage.removeItem("startTime");
                            localStorage.removeItem("endTime");
                            localStorage.removeItem("warningTime");
                            this.showWarning = false;
                            this.showDialog = true;
                            this.dialogTitle = "";
                            this.dialogContent = "You are logged out!";
                            this.dialogOnClose = () => {
                                window.onbeforeunload = null;
                                window.location.reload();
                            };
                        }
                    }
                })
                .catch((ex) => {
                    this.showDialog = true;
                    this.dialogTitle = "Oops";
                    this.dialogMsg = ex.message;
                });
        },
        closeError() {
            this.showDialog = false;
        },
        countDown(start, end) {
            let times = (end - start) / 1000;
            if (times < 0) return "00";
            let d = parseInt(times / 60 / 60 / 24);
            d = d < 10 ? "0" + d : d;
            let h = parseInt((times / 60 / 60) % 24);
            h = h < 10 ? "0" + h : h;
            let m = parseInt((times / 60) % 60);
            m = m < 10 ? "0" + m : m;
            let s = parseInt(times % 60);
            s = s < 10 ? "0" + s : s;
            let output = "";
            if (d != "00") {
                output += d + (d == "01" ? " day " : " days ");
            }
            if (output || h != "00") {
                output += h + ":";
            }
            if (output || m != "00") {
                output += m + ":";
            }
            if (output || s != "00") {
                output += s;
            }
            return output;
        },
    },
};
</script>
