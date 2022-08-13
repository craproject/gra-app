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
            <v-img
                src="./assets/cra-logo.png"
                max-height="100"
                max-width="180"
                class="mr-6"
            ></v-img>

            <v-app-bar-title>
                Application Form
            </v-app-bar-title>
        </v-app-bar>

        <!-- Loading 
        <v-overlay :value="$store.getters.getIsLoading || isLoading">
            <v-progress-circular indeterminate color="white" size="64">
                <div>{{ loadingAction }}</div>
            </v-progress-circular>
        </v-overlay>-->

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

            <!-- <v-navigation-drawer
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

                        <v-stepper-step
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
                        </v-stepper-step>
                    </v-stepper>
                </v-list>
            </v-navigation-drawer> -->
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

                <!-- Residence Data -->
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

                <!-- 5 Civil, Criminal and Investigatory Proceedings 
                <div v-if="currentIndex === 5 || renderAll">
                    <Section5 ref="section5" />
                </div>-->

                <!-- 6 Financial Data 
                <div v-if="currentIndex === 6 || renderAll">
                    <Section6 ref="section6" :xRates="xRateData" />
                </div>-->

                <!-- 7 Net Worth Statement - Assets and Liabilities 
                <div v-if="currentIndex === 7 || renderAll">
                    <Section7 ref="section7" :xRates="xRateData" />
                </div>-->

                <!-- End of APHDF 
                <div v-if="currentIndex === 8 || renderAll">
                    <Section8 ref="section8" />
                </div>-->

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

                    <v-btn @click="next" v-if="currentIndex < 8" color="primary" class="me-2">
                        NEXT
                    </v-btn>

                    <v-btn @click="next" v-if="currentIndex == 8" color="primary">
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
//import VueJsonPretty from "vue-json-pretty";
import { mapGetters, mapMutations } from "vuex";
import { getExRateData } from "./data/xRateData.js";
import { exportPDF } from "@/libs/exportPDF.js";
import { getAPHDFPDFTemplate } from "@/libs/pdfConfigs.js";
import optionMixin from "@/mixins/optionMixin";

export default {
    components: {
        GovernmentAgencyWebsite,
        // Section9,
        ToastLikeNotify
        //VueJsonPretty
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
            enablePDF: false
        };
    },
    computed: {
        ...mapGetters(["getIsSuccessRequest", "getCurrentPageIndex", "getSubmittedSections"]),

        currentIndex() {
            return this.stepperIndex;
        },
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
        }*/
    },

    methods: {
        ...mapMutations(["addAppError", "setCurrentPageIndex","setPreviousPageIndex", "addSubmittedSection"]),

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

            await this.submitAndNavigate(this.stepperIndex, this.toSectionIndex);
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
            console.log(this.$store.getters.getLicenceType);

            // Validate
            let isValidSection = this.validateSection(currentIndex);
            if (!isValidSection && currentIndex === 0) {
                this.addAppError("Please complete all mandatory fields before proceeding.");

                return;
            }

            // Navigate
            let nextSectionIndex = this.increaseStepperIndex(currentIndex);
            // this.setCurrentPageIndex(nextSectionIndex);
            // this.stepperIndex = nextSectionIndex;

            await this.submitAndNavigate(currentIndex, nextSectionIndex);
        },
        async prev() {
            this.isNavigateByStepClicked = false;
            console.log("stepper index: " + this.stepperIndex);
            let currentIndex = this.stepperIndex;

            // Validate
            let isValidSection = this.validateSection(currentIndex);
            // if (!isValidSection) {
            //     this.addAppError("Please full-fill the form before processing");

            //     return;
            // }

            // Navigate
            let prevSectionIndex = this.decreaseStepperIndex();
            // this.setCurrentPageIndex(prevSectionIndex);
            // this.stepperIndex = prevSectionIndex;

            await this.submitAndNavigate(currentIndex, prevSectionIndex);
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
        async submitAndNavigate(fromSectionIndex, toSectionIndex) {
            this.loadingAction = "Saving";
            let currentSection = this.getSectionByIndex(fromSectionIndex);
            this.setPreviousPageIndex(fromSectionIndex);

            // validate section for dispay Warning Uncomplete
            currentSection.validateSection();
            let boolIsValid = currentSection.isValid;
            console.log("IsValid: " + boolIsValid);
            if (boolIsValid) {
                this.markSectionAsCompleted(fromSectionIndex); // Mark current section as complete
                if (this.UncompleteArray.includes(fromSectionIndex)) {
                    const index = this.UncompleteArray.indexOf(fromSectionIndex);
                    if (index > -1) {
                        this.UncompleteArray.splice(index, 1);
                    }
                }
            } else {
                if (!this.UncompleteArray.includes(fromSectionIndex)) {
                    this.UncompleteArray.push(fromSectionIndex);
                }
            }

            console.log("Uncomplete Array: " + this.UncompleteArray);

            // Submit data
            /*if (toSectionIndex > this.lastStepperIndex) {
                // validate all section complete before click submit
                let fullCompleteSection = [0, 1, 2, 3, 4];
                let sectionCompleted = this.getSubmittedSections.filter(
                    x => !this.UncompleteArray.includes(x)
                );
                console.log("sectionCompleted:" + sectionCompleted);
                console.log(
                    "this.arrayCompare(fullCompleteSection, sectionCompleted): " +
                        this.arrayCompare(fullCompleteSection, sectionCompleted)
                );
                if (this.arrayCompare(fullCompleteSection, sectionCompleted)) {
                    sessionStorage.removeItem("aphdf_id");
                    await currentSection.submit(fromSectionIndex, this.lastStepperIndex);
                } else {
                    this.addAppError("Please complete all sections before proceeding.");
                    return;
                }
            } else {
                await currentSection.submit(fromSectionIndex, toSectionIndex); // Error handling and Notify contained
            }
            console.log("loading: " + this.$store.getters.getIsLoading);
            while (this.$store.getters.getIsLoading) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            console.log("get is success request: " + this.getIsSuccessRequest);
            console.log("boolIsValid: " + boolIsValid);
            if (!this.getIsSuccessRequest) return;

            if (
                this.stepperIndex == 4 &&
                boolIsValid &&
                !this.isNavigateByStepClicked &&
                this.getIsSuccessRequest
            ) {
                //Direct to dash board page after submitted successfully
                // await new Promise((resolve) => setTimeout(resolve, 500));
                // window.location.replace(
                //     window.loginData?.dashboardLink === undefined
                //     ? "/dashboard"
                //     : window.loginData?.dashboardLink === ""
                //     ? "/dashboard"
                //     : window.loginData.dashboardLink
                // );
                this.dialogTitle = "Success";
                this.dialogMsg = "Form is submitted";
                this.dialog = true;
            }*/

            // Navigate to next section
            // if (toSectionIndex > this.lastStepperIndex) return; // Don't need to fetch new data if this is the last section

            this.stepperIndex = toSectionIndex;
            this.setCurrentPageIndex(toSectionIndex);

            this.scrollTop(); // Goto top

            // Get data of next section
            await this.$store.dispatch("getSectionData");

            let nextSection = this.getSectionByIndex(); // Index have been mutate in Watch hook
            nextSection.populateData();
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

        // getCrmIdFromUrl() {
        //     // sessionStorage.setItem('aphdf_id', 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX');
        //     let crmId = "";
        //     let storageValue = sessionStorage.getItem("aphdf_id");
        //     if (storageValue === "" || storageValue === null || storageValue === undefined) {
        //         let search = window.location.search?.toLowerCase() ?? "";
        //         crmId = parse(search).crm_id?.toString();
        //     } else {
        //         crmId = sessionStorage.getItem("aphdf_id");
        //     }
        //     console.log("crmId: " + crmId);
        //     if (!crmId) return "";

        //     // this.setCrmId(crmId); // Save CRM ID to store

        //     return crmId;
        // },
        async testSection(){
            let currentIndex = this.stepperIndex;
            let currentSection = this.getSectionByIndex(currentIndex);
            await currentSection.submit(currentIndex);
        },
        /*getCrmIdFromUrl() {
            let search = window.location.search?.toLowerCase() ?? "";
            let crmId = "";
            const { crm_id } = parse(search) || {};
            crmId = crm_id;
            if (crm_id === undefined || crm_id === "") {
                crmId = sessionStorage.getItem("aphdf_id");
            }
            this.setCrmId(crmId);
            console.log("crmId", crmId);
            return crmId + "";
        },*/
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
            new Promise(resolve => setTimeout(resolve, 500));
            
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
    created() {},
    async beforeMount() {
        this.xRateData = await await (await fetch("data/xRates.json")).json();
        this.configData = await await (await fetch("data/aphdf/configs.json")).json();
        console.log(this.xRateData);
        this.enablePDF = this.configData.EnablePDF;
    },
    async mounted() {
        logAppVersion();

        this.lastStepperIndex = this.$refs.appStepper.steps.length - 1;

        //this.setCrmId(this.crmId);
        // this.xRateData = getExRateData();

        // Fetch APHDF Data
        this.$store.dispatch("getSectionData");

        // await this.verifyStatusForAllSection();

        // window.loginData = window.loginData ?? {}
        // window.loginData={
        //     category: "100000003",
        //     categoryName: "SEL CAT C2"
        // };
    }
};
</script>

<style scoped>
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
