<template>
    <v-app>
        <!-- A Singapore Government Agency Website -->
        <government-agency-website :auto-hide="true" />

        <!-- Logo and Title -->
        <v-app-bar clipped-left app color="white" class="elevation-1">
            <v-app-bar-nav-icon
                class="d-sm-flex d-lg-none"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-img src="/img/cra-logo.png" max-height="100" max-width="180" class="mr-6"></v-img>

            <v-app-bar-title>
                {{ appTitle }}
            </v-app-bar-title>
        </v-app-bar>

        <!-- Loading -->
        <v-overlay :value="$store.getters.getIsLoading || isLoading">
            <v-progress-circular indeterminate color="white" size="64">
                <div>{{ loadingAction }}</div>
            </v-progress-circular>
        </v-overlay>

        <v-main>
            <!-- Notify -->
            <toast-like-notify></toast-like-notify>

            <!-- Confirm submitAndNavigate -->
            <v-dialog v-model="showConfirmNavigateDialog" width="500px" persistent>
                <v-card>
                    <v-card-title>Do you want to go to Section {{ toSectionIndex }}?</v-card-title>

                    <v-card-actions>
                        <v-btn depressed color="primary" @click="confirmedYes">
                            Yes, take me there
                        </v-btn>
                        <v-btn depressed @click="confirmedNo">Cancel</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-navigation-drawer
                v-model="drawer"
                :class="{ 'd-none': $store.getters.getIsLoading }"
                mini-variant-width="60"
                :permanent="$vuetify.breakpoint.lgAndUp"
                app
                clipped
                expand-on-hover
            >
                <v-list>
                    <v-stepper
                        ref="appStepper"
                        v-model="stepperIndex"
                        non-linear
                        elevation="0"
                        vertical
                        style="height: 100%"
                    >
                        <!-- Steppers -->
                        <v-stepper-step
                            v-for="(section, index) in sections"
                            :key="index"
                            :step="index"
                            :complete="completedSections(index)"
                            :rules="[value => UncompletedSections(index) || index === stepperIndex]"
                            :color="sectionStatus(index)"
                            class="c-hover pl-4"
                        >
                            <span class="small-stepper-header ml-3">{{ sections[index] }}</span>
                        </v-stepper-step>
                        <!-- <v-stepper-step
                            v-for="(section, index) in sections"
                            :key="index"
                            :step="index"
                            :complete="completedSections(index)"
                            :rules="[value => UncompletedSections(index) || index === stepperIndex]"
                            @click="stepperStepClicked(index)"
                            :color="sectionStatus(index)"
                            class="c-hover pl-4"
                        >
                            <span class="small-stepper-header ml-3">{{ sections[index] }}</span>
                        </v-stepper-step> -->
                    </v-stepper>
                </v-list>
            </v-navigation-drawer>
            <v-container>
                <!-- <v-btn v-if="currentIndex === 8" @click="downloadPDF()">Download PDF</v-btn> // for debug -->
                <!-- General Info -->
                <div v-if="currentIndex === 0 || renderAll">
                    <Section0 ref="section0" />
                </div>

                <!-- Personal Data -->
                <div v-if="currentIndex === 1 || renderAll">
                    <Section1 ref="section1" />
                </div>

                <!-- Contact Person -->
                <div v-if="currentIndex === 2 || renderAll">
                    <Section2 ref="section2" />
                </div>

                <!-- 3 Family / Social Data -->
                <div v-if="currentIndex === 3 || renderAll">
                    <Section3 ref="section3" />
                </div>

                <!-- 4 Employment and Licensing Data -->
                <div v-if="currentIndex === 4 || renderAll">
                    <Section4 ref="section4" />
                </div>

                <!--&lt;!&ndash; Supporting Document &ndash;&gt;-->
                <!--<div v-if="currentIndex === 9">-->
                <!--    <Section9 ref="section9" />-->
                <!--</div>-->

                <!-- Navigate buttons -->
                <div class="ma-2">
                    <!--<v-btn
                        v-if="currentIndex < 8"
                        color="primary"
                        class="me-2"
                        @click="closeClicked()"
                    >
                        SAVE &amp; CLOSE
                    </v-btn>-->
                    <v-btn @click="prev" v-if="currentIndex > 0" color="primary" class="me-2">
                        PREV
                    </v-btn>

                    <v-btn @click="next" v-if="currentIndex < 4" color="primary" class="me-2">
                        NEXT
                    </v-btn>

                    <v-btn @click="next" v-if="currentIndex == 4" color="primary">
                        SUBMIT
                    </v-btn>
                    <!-- for testing purpose in SIT API -->
                    <!-- <v-btn @click="testSection" color="primary">
                        testSection
                    </v-btn> -->
                </div>
            </v-container>

            <!-- Dialog for Save & Close button -->
            <v-dialog v-model="dialogConfirm" max-width="650px">
                <v-card>
                    <v-card-title class="text-h5">
                        Do you wish to save and close this application form?
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeConfirmClicked"
                            >Cancel</v-btn
                        >
                        <v-btn color="blue darken-1" text @click="confirmClicked">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Dialog for Submitted Success -->
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title
                        class="text-h5 justify-center"
                        v-text="dialogTitle"
                    ></v-card-title>
                    <v-card-text>
                        <div class="text-center" v-text="dialogMsg"></div>
                    </v-card-text>

                    <!--
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn v-if="enablePDF" color="blue darken-1" text @click="downloadPDF()"
                            >Download PDF</v-btn
                        >
                        <v-spacer></v-spacer>
                    </v-card-actions>-->

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeErrorClicked">Close</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Timeout Reminder 
            <session-manager />-->

            <!-- For Dev 
            <div class="formData" style="color: white; display: none;">
                <h1>For Developer Use</h1>
                <VueJsonPretty :data="values"></VueJsonPretty>
            </div>
            <datalist id="names">
                <option v-for="name in nameList" :key="name">{{ name }}</option>
            </datalist>
            <datalist id="ics">
                <option v-for="ic in icList" :key="ic">{{ ic }}</option>
            </datalist>-->
        </v-main>
    </v-app>
</template>

<script>
import GovernmentAgencyWebsite from "@/components/Common/GovernmentAgencyWebsite";
import ToastLikeNotify from "@/components/Common/ToastLikeNotify";
import { logAppVersion } from "@/compositionApi/appVersion";
//import SessionManager from "@/components/Common/SessionManager";
// import Section9 from "@/components/Section9";
import numberMixin from "@/mixins/numberMixin";
import "@braid/vue-formulate/dist/snow.css";
import { parse } from "query-string";
import VueJsonPretty from "vue-json-pretty";
import { mapGetters, mapMutations } from "vuex";
import { getExRateData } from "./data/xRateData.js";
import { exportPDF } from "@/libs/exportPDF.js";
import { getAPHDFPDFTemplate } from "@/libs/pdfConfigs.js";
import optionMixin from "@/mixins/optionMixin";
import { getJsonObject } from "@/libs/jsonObject.js";

export default {
    components: {
        GovernmentAgencyWebsite,
        // Section9,
        ToastLikeNotify
        //VueJsonPretty,
        //"session-manager": SessionManager
    },
    name: "App",
    mixins: [numberMixin, optionMixin],
    data() {
        return {
            drawer: false,
            stepperIndex: 0,
            lastStepperIndex: undefined,
            sections: [
                "General",
                "General Information of Applicant",
                "Contact Persons",
                "Compliance Records",
                "Particulars of Responsible Executives"
                // "Supporting Document"
            ],

            //crmId: this.getCrmIdFromUrl(),

            // Navigate to selected section
            showConfirmNavigateDialog: false,
            confirmResult: false,
            toSectionIndex: 0, // Use with carefully

            // section: this.getSection(),
            values: {},
            origValues: {},
            sectionData: [],
            optionData: {},
            xRateData: [],
            isLoading: false,
            firstLoad: false,
            currentpage: "",
            nextpage: "",
            error: [],
            dialogConfirm: false,
            loadingAction: "",
            UncompleteArray: [],
            isNavigateByStepClicked: false,
            renderAll: false,
            //loginData: new Object(),
            dialog: false,
            dialogTitle: "",
            dialogMsg: "",
            configData: {},
            enablePDF: false,
            apiBaseUrl: "",
            redirectionEndpoint: "",
            enableChecking: true,
            enableAPICall: true
        };
    },
    computed: {
        ...mapGetters(["getIsSuccessRequest", "getCurrentPageIndex", "getSubmittedSections"]),

        currentIndex() {
            return this.stepperIndex;
        },
        appTitle() {
            return this.currentIndex === 0 ? "Application Form" : this.$store.getters.getSection0;
        }

        /*
        nameList() {
            let list = [];
            if (!this.values) return list;
            if (this.values["Sec_1A_Name"]) {
                list.push(this.values["Sec_1A_Name"]);
            }
            if (Array.isArray(this.values["Sec_3A_Yes_Table"])) {
                this.values["Sec_3A_Yes_Table"].forEach(element => {
                    if (element && element["Sec_3A_Spouse_Name"]) {
                        list.push(element["Sec_3A_Spouse_Name"]);
                    }
                });
            }
            if (Array.isArray(this.values["Sec_3B_Yes_Table"])) {
                this.values["Sec_3B_Yes_Table"].forEach(element => {
                    if (element && element["Sec_3B_Name"]) {
                        list.push(element["Sec_3B_Name"]);
                    }
                });
            }
            return [...new Set(list)];
        },
        icList() {
            let list = [];
            if (!this.values) return list;
            if (this.values["Sec_1B_Country_Identification_Number"]) {
                list.push(this.values["Sec_1B_Country_Identification_Number"]);
            }
            return [...new Set(list)];
        } */
    },

    methods: {
        ...mapMutations([
            "addAppError",
            "setCurrentPageIndex",
            "setPreviousPageIndex",
            "addSubmittedSection"
        ]),

        completedSections(index) {
            return this.getSubmittedSections.includes(index); // this.getCurrentPageIndex > index;
        },
        UncompletedSections(index) {
            return !this.UncompleteArray.includes(index);
        },
        sectionStatus(index) {
            console.log(JSON.stringify(this.getSubmittedSections));
            return this.getSubmittedSections.includes(index) ? "green" : "blue";
            // this.getCurrentPageIndex > index ? "green" : "blue";
        },
        getSectionByIndex(index) {
            let sectionIndex =
                this.isNumeric(index) && index >= 0 && index <= this.lastStepperIndex
                    ? index
                    : this.getCurrentPageIndex;
            return this.$refs[`section${sectionIndex}`];
        },
        markSectionAsCompleted(index) {
            this.addSubmittedSection(index);
        },

        stepperStepClicked(index) {
            // Avoid navigate to the same section
            if (this.stepperIndex == index) return;

            // Validate section
            let isValidSection = this.validateSection(this.stepperIndex);
            if (!isValidSection && this.stepperIndex === 0) {
                this.addAppError("Please complete all mandatory fields before proceeding.");

                return;
            }

            // Ask user to save data
            this.showConfirmNavigateDialog = true;

            this.toSectionIndex = index;
            this.isNavigateByStepClicked = true;
        },
        async confirmedYes() {
            this.turnOffConfirmDialog();

            // await this.submitAndNavigate(this.stepperIndex, this.toSectionIndex);
        },
        confirmedNo() {
            this.turnOffConfirmDialog();
        },
        turnOffConfirmDialog() {
            this.showConfirmNavigateDialog = false;
        },

        // Navigation

        async next() {
            this.isNavigateByStepClicked = false;
            let currentIndex = this.stepperIndex;
            let newIndex = this.increaseStepperIndex(currentIndex);

            // Validate
            // let isValidSection = this.validateSection(currentIndex);
            // if (!isValidSection && currentIndex === 0) {
            //     this.addAppError("Please complete all mandatory fields before proceeding.");

            //     return;
            // }

            let isSubmitted = await this.submitAndNavigate(currentIndex, true);

            if (isSubmitted) {
                this.stepperIndex = newIndex;
                this.setCurrentPageIndex(newIndex);
                this.setPreviousPageIndex(currentIndex);
                this.scrollTop(); // Goto top
            }
        },
        async prev() {
            this.isNavigateByStepClicked = false;
            let currentIndex = this.stepperIndex;

            let newIndex = this.decreaseStepperIndex(currentIndex);

            await this.submitAndNavigate(currentIndex, false);
            this.stepperIndex = newIndex;
            this.setCurrentPageIndex(newIndex);
            this.setPreviousPageIndex(currentIndex);
            this.scrollTop(); // Goto top
        },
        scrollTop() {
            this.$vuetify.goTo(0);
        },

        // Validate and Submit

        validateSection(sectionIndex) {
            let currentSection = this.getSectionByIndex(sectionIndex);
            // Validate Section
            currentSection.validateSection();

            return currentSection.isValid;
        },
        async submitAndNavigate(currentIndex, toValidate) {
            this.loadingAction = "Saving";
            let currentSection = this.getSectionByIndex(currentIndex);
            let formValid = false;

            // validate section for dispay Warning Uncomplete
            if (toValidate) {
                currentSection.validateSection();
                let boolIsValid = currentSection.isValid;
                if (boolIsValid) {
                    this.markSectionAsCompleted(currentIndex); // Mark current section as complete
                    if (this.UncompleteArray.includes(currentIndex)) {
                        const index = this.UncompleteArray.indexOf(currentIndex);
                        if (index > -1) {
                            this.UncompleteArray.splice(index, 1);
                        }
                    }
                } else {
                    if (!this.UncompleteArray.includes(currentIndex)) {
                        this.UncompleteArray.push(currentIndex);
                    }
                    if (this.enableChecking) return;
                }
                formValid = boolIsValid;
            }

            await currentSection.submit(currentIndex, this.lastStepperIndex);


            if (!this.enableChecking) formValid = true; //bypass Validation

            if (this.stepperIndex == 4 && formValid && toValidate) {
                let data = getJsonObject();
                console.log("form is submitted: ", data);
                if (this.enableAPICall)
                    await this.$store.dispatch("postGraData", [data, this.apiBaseUrl]);
                this.dialogTitle = "Success";
                this.dialogMsg = `Your application form has been successfully submitted. 
Please submit the relevant supporting documents via licensing@gra.gov.sg`;
                this.dialog = true;
                return;
            }

            return true
        },

        increaseStepperIndex(current) {
            return parseInt(current) + 1;
        },
        // increaseStepperIndex() {
        //     this.stepperIndex = parseInt(this.stepperIndex) + 1;
        //
        //     // Limit maximum step at 9
        //     if (this.stepperIndex > this.lastStepperIndex) {
        //         this.stepperIndex = this.lastStepperIndex;
        //     }
        //
        //     return this.stepperIndex;
        // },
        decreaseStepperIndex() {
            this.stepperIndex = parseInt(this.stepperIndex) - 1;

            // Limit minimum step at 0
            if (this.stepperIndex < 0) this.stepperIndex = 0;

            return this.stepperIndex;
        },

        async testSection() {
            let currentIndex = this.stepperIndex;
            let currentSection = this.getSectionByIndex(currentIndex);
            await currentSection.submit(currentIndex);
        },

        closeClicked() {
            this.dialogConfirm = true;
        },
        closeConfirmClicked() {
            this.dialogConfirm = false;
        },
        async confirmClicked() {
            this.dialogConfirm = false;
            this.isLoading = true;
            this.loadingAction = "Saving";
            let currentIndex = this.stepperIndex;
            let currentSection = this.getSectionByIndex(currentIndex);
            await currentSection.submit(currentIndex);
            while (this.$store.getters.getIsLoading) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            if (!this.getIsSuccessRequest) {
                this.isLoading = false;
                return;
            } else {
                this.isLoading = false;
                window.location.replace("/dashboard");
            }
        },

        // Handle status of page
        parseSections() {
            return [
                ...new Set(
                    this.sections.map(i => {
                        return {
                            value: i["Section"] + "",
                            text: i["Section Name"],
                            valid: null
                        };
                    })
                )
            ];
        },

        verifyStatusForAllSection(callback) {
            let uncompleteSection = [];
            // this.renderAll = true;
            this.$nextTick(async function() {
                for (var i = 0; i < 9; i++) {
                    let currentSection = await this.$refs["section" + i];
                    await currentSection.populateData();
                    // let currentSection = await this.$refs.section0;
                    console.log("currentSection " + i + currentSection);
                    // validate section for dispay Warning Uncomplete
                    // let boolIsValid = await  this.validateSection(i);
                    await currentSection.validateSection();
                    let boolIsValid = currentSection.isValid;
                    console.log("IsValid: " + boolIsValid);
                    if (!boolIsValid) {
                        uncompleteSection.push(i);
                    }
                    console.log("uncompleteSection: " + uncompleteSection);
                }
                this.renderAll = false;
                if (typeof callback === "function" && uncompleteSection.length <= 0) {
                    callback();
                }
            });
        },
        closeErrorClicked() {
            this.dialog = false;
            //Direct to dash board page after submitted successfully
            // new Promise(resolve => setTimeout(resolve, 500));
            // window.location.replace(
            //     window.loginData?.dashboardLink === undefined
            //         ? "/dashboard"
            //         : window.loginData?.dashboardLink === ""
            //         ? "/dashboard"
            //         : window.loginData.dashboardLink
            // );
            //   window.open('','_self').close()
            window.location.replace(this.redirectionEndpoint);
            return false;
        },

        arrayCompare(_arr1, _arr2) {
            if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length) {
                return false;
            }

            // .concat() to not mutate arguments
            const arr1 = _arr1.concat().sort();
            const arr2 = _arr2.concat().sort();

            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) {
                    return false;
                }
            }

            return true;
        },
        async downloadPDF() {
            await this.$store.dispatch("getSectionData");
            this.dialog = false;
            this.isLoading = true;
            this.loadingAction = "Exporting";

            let pdfTemp = getAPHDFPDFTemplate();
            let optionSet = this.optionData;

            if (!("programOptions" in optionSet)) {
                optionSet["programOptions"] = this.programOptions;
            }

            if (!("vehicleLoanOptions" in optionSet)) {
                optionSet["vehicleLoanOptions"] = this.vehicleLoanOptions;
            }

            if (!("raceOptions" in optionSet)) {
                optionSet["raceOptions"] = this.raceOptions;
            }

            console.log(JSON.stringify(optionSet, null, 4));

            await exportPDF(pdfTemp, optionSet, "aphdf").then(successMessage => {
                console.log("successMessage: " + successMessage);
                if (successMessage == "resolved") {
                    this.isLoading = false;
                    new Promise(resolve => setTimeout(resolve, 500));
                    this.dialog = true;
                } else {
                    throw successMessage;
                }
                // this.closeErrorClicked();
            });
        }
    },
    watch: {
        // stepperIndex() {
        //     this.setCurrentPageIndex(this.stepperIndex);
        // }
    },
    // created() {},
    async beforeMount() {
        this.configData = await await (await fetch("data/grademo/configs.json")).json();
        this.apiBaseUrl = this.configData.apiBaseUrl;
        this.redirectionEndpoint = this.configData.redirectionEndpoint;
        this.enableChecking = this.configData.enableChecking;
        this.enableAPICall = this.configData.enableAPICall;
        console.log(`
        this.apiBaseUrl = ${this.apiBaseUrl};
        this.redirectionEndpoint = ${this.redirectionEndpoint};
        this.enableChecking = ${this.enableChecking};
`);
    },
    async mounted() {
        logAppVersion();

        this.lastStepperIndex = this.$refs.appStepper.steps.length - 1;

        // this.appTitle = this.$store.getters.getSection0 ===''? 'Application Form': this.$store.getters.getSection0

        //this.setCrmId(this.crmId);
        // this.xRateData = getExRateData();

        // Fetch APHDF Data
        // this.$store.dispatch("getSectionData");

        // await this.verifyStatusForAllSection();

        // window.loginData = window.loginData ?? {}
        // window.loginData={
        //     category: "100000003",
        //     categoryName: "SEL CAT C2"
        // };

        /*console.log("loginData mounted:" + JSON.stringify(window.loginData, null, 4));
        this.loginData.Name = window.loginData ? window.loginData.userName : "";
        if (window.loginData) {
            if (window.loginData.uen !== "") {
                this.loginData.UIN_BRN = window.loginData.uen;
            } else {
                if (window.loginData.loginId !== "") {
                    this.loginData.UIN_BRN = window.loginData.loginId;
                } else {
                    this.loginData.UIN_BRN = "";
                }
            }

            if (window.loginData.category !== "" && window.loginData.categoryName !== "") {
                this.loginData.category = window.loginData.category;
                this.loginData.categoryName = window.loginData.categoryName;
            } else {
                this.loginData.category = "";
                this.loginData.categoryName = "";
            }
        } else {
            this.loginData.UIN_BRN = "";
            this.loginData.category = "";
            this.loginData.categoryName = "";
        }*/
    }
};
</script>

<style>
.v-app-bar-title__content {
    width: auto !important;
}
.formData {
    width: 30%;
    margin-left: 10%;
    position: fixed;
    right: 0;
    height: 100%;
    overflow: auto;
}

.c-hover:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.06);
}
</style>
