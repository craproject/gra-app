<template>
    <div>
        <h1>1. General Information of Applicant</h1>

        <!-- Retrieve from MyInfo -->
        <v-checkbox
            name="Sec_1A_Checkbox"
            v-model="retrieveFromMyInfo"
            label="Retrieve from MyInfo"
            class="font-weight-bold checkbox-large"
        >
            <!--@change="retrieveFromMyInfoChange">-->
        </v-checkbox>

        <!-- 1A -->
        <v-subheader class="black--text"></v-subheader>
        <div class="row no-gutters">
            <div class="col-12">
                <div class="sub-section-group">
                    <!-- Name -->
                    <v-text-field
                        outlined
                        v-model="nameOfApplicant"
                        :counter="100"
                        :error-messages="nameOfApplicantValidationMessage"
                        @input="v$.nameOfApplicant.$touch"
                        @blur="v$.nameOfApplicant.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">Name of Applicant</span>
                        </template>
                    </v-text-field>

                    <!-- Entity Type -->
                    <v-radio-group
                        v-model="entityType"
                        :error-messages="entityTypeValidationMessage"
                        @input="v$.entityType.$touch"
                        @blur="v$.entityType.$touch"
                    >
                        <v-radio value="1" label="Company registered with ACRA"></v-radio>
                        <v-radio value="2" label="Society registered with ROS"></v-radio>
                        <v-radio value="3" label="Others"></v-radio>
                        <template v-slot:label>
                            <span class="required">Entity Type</span>
                        </template>
                    </v-radio-group>

                    <!-- If Other -->
                    <v-text-field
                        v-if="entityType === '3'"
                        outlined
                        v-model="entityType_other"
                        :counter="100"
                    >
                        <template v-slot:label>
                            <span class="required">If Others</span>
                        </template>
                    </v-text-field>

                    <!-- Nature Entity -->
                    <v-radio-group
                        v-model="natureEntity"
                        :error-messages="natureEntityValidationMessage"
                        @input="v$.natureEntity.$touch"
                        @blur="v$.natureEntity.$touch"
                    >
                        <v-radio value="1" label="Company registered with ACRA"></v-radio>
                        <v-radio value="2" label="Others"></v-radio>
                        <template v-slot:label>
                            <span class="required">Nature Entity</span>
                        </template>
                    </v-radio-group>
                    <!--<v-select
                        outlined
                        :items="natureEntityOptions"
                        item-value="value"
                        item-text="label"
                        v-model="natureEntity"
                    >
                        <template v-slot:label>
                            <span class="required">Nature Entity</span>
                        </template>
                    </v-select>-->

                    <!-- If Other -->
                    <v-text-field
                        v-if="natureEntity === '2'"
                        outlined
                        v-model="natureEntity_other"
                        :counter="100"
                    >
                        <template v-slot:label>
                            <span class="required">If Others</span>
                        </template>
                    </v-text-field>

                    <!-- Unique Entity Number (UEN) -->
                    <v-text-field
                        v-model="A1_Unique_Entity_Number"
                        :counter="100"
                        outlined
                        :error-messages="A1_Unique_Entity_NumberValidationMessage"
                        @input="v$.A1_Unique_Entity_Number.$touch"
                        @blur="v$.A1_Unique_Entity_Number.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">Unique Entity Number (UEN)</span>
                        </template>
                    </v-text-field>

                    <!-- Date of Incorporation -->
                    <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateFormatted"
                                label="Date of Incorporation"
                                hint="MM/DD/YYYY format"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                @blur="date = parseDate(dateFormatted)"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            no-title
                            @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>

                    <!-- Description of Operations -->
                    <v-textarea
                        v-model="A1_Description_of_Operations"
                        :counter="300"
                        rows="2"
                        row-height="30"
                        auto-grow
                        outlined
                    >
                        >
                        <template v-slot:label>
                            <span class="required">Description of Operations</span>
                        </template>
                    </v-textarea>
                </div>
            </div>
        </div>

        <!-- A2 -->
        <v-subheader class="black--text">Registered Business Address of the Applicant</v-subheader>
        <div class="row no-gutters">
            <div class="col-12">
                <div class="sub-section-group">
                    <!-- ZIP / Postal Code -->
                    <v-text-field
                        v-model="A2_Zip_Postal"
                        :counter="15"
                        outlined
                        :error-messages="A2_Zip_PostalValidationMessage"
                        @input="v$.A2_Zip_Postal.$touch"
                        @blur="v$.A2_Zip_Postal.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">ZIP / Postal Code</span>
                        </template>
                    </v-text-field>

                    <!-- Address -->
                    <v-textarea
                        v-model="A2_Address"
                        :counter="100"
                        rows="2"
                        row-height="30"
                        auto-grow
                        outlined
                        :error-messages="A2_AddressValidationMessage"
                        @input="v$.A2_Address.$touch"
                        @blur="v$.A2_Address.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">Address</span>
                        </template>
                    </v-textarea>
                </div>
            </div>
        </div>

        <!-- A3 -->
        <v-subheader class="black--text">Contact Information of the Applicant</v-subheader>
        <div class="row no-gutters">
            <div class="col-12">
                <div class="sub-section-group">
                    <!-- Business Telephone Number -->
                    <v-text-field
                        v-model="A3_Business_Telephone_Number_Number"
                        :counter="100"
                        outlined
                        :error-messages="A3_Business_Telephone_Number_NumberValidationMessage"
                        @input="v$.A3_Business_Telephone_Number_Number.$touch"
                        @blur="v$.A3_Business_Telephone_Number_Number.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">Business Telephone Number</span>
                        </template>
                    </v-text-field>

                    <!-- Website Address -->
                    <v-text-field
                        v-model="A3_Website_Address"
                        :counter="100"
                        outlined
                        :error-messages="A3_Website_AddressValidationMessage"
                        @input="v$.A3_Website_Address.$touch"
                        @blur="v$.A3_Website_Address.$touch"
                    >
                        <template v-slot:label>
                            <span>Website Address</span>
                        </template>
                    </v-text-field>

                    <!-- Email Address -->
                    <v-text-field
                        v-model="A3_Email_Address"
                        :counter="100"
                        outlined
                        :error-messages="A3_Email_AddressValidationMessage"
                        @input="v$.A3_Email_Address.$touch"
                        @blur="v$.A3_Email_Address.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">Email Address</span>
                        </template>
                    </v-text-field>

                    <!-- Email Address -->
                    <v-checkbox
                        v-model="A3_Email_Checkbox"
                        :error-messages="A3_Email_CheckboxValidationMessage"
                        @input="v$.A3_Email_Checkbox.$touch"
                        @blur="v$.A3_Email_Checkbox.$touch"
                    >
                        <template v-slot:label>
                            <span class="black--text required">
                                I understand that the aforementioned email address will be used for
                                electronic service and that it is my / the Applicant or Associate's
                                responsibility to update the Authority with any changes in the
                                electronic service address.
                            </span>
                        </template>
                    </v-checkbox>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//import EntityType from "@/components/PersonalData/EntityType";
//import NatureEntity from "@/components/PersonalData/NatureEntity";
import optionMixin from "@/mixins/optionMixin";

import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, required } from "@vuelidate/validators";

import { DateTime } from "luxon";

//import SectionMixin from "./SectionMixin.js";
import { mapGetters } from "vuex";

export default {
    name: "Section1",
    components: {},
    mixins: [optionMixin],
    setup() {
        return { v$: useVuelidate() };
    },
    data: vm => ({
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
        dateFormatted: vm.formatDate(
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
        ),
        menu1: false,

        retrieveFromMyInfo: false,
        nameOfApplicant: "",
        entityType: "",
        entityType_other: "",
        natureEntity: "",
        natureEntity_other: "",
        A1_Unique_Entity_Number: "",
        A1_Description_of_Operations: "",
        A2_Zip_Postal: "",
        A2_Address: "",
        A3_Business_Telephone_Number_Number: "",
        A3_Website_Address: "",
        A3_Email_Address: "",
        A3_Email_Checkbox: ""
    }),
    validations() {
        return {
            // retrieveFromMyInfo: false,

            // 1A
            nameOfApplicant: {
                required: helpers.withMessage("This field is mandatory", required),
                max: maxLength(100)
            },
            entityType: { required: helpers.withMessage("This field is mandatory", required) },
            natureEntity: { required: helpers.withMessage("This field is mandatory", required) },
            A1_Unique_Entity_Number: {
                required: helpers.withMessage("This field is mandatory", required),
                max: maxLength(100)
            },
            date: {
                required: helpers.withMessage("This field is mandatory", required)
            },
            A1_Description_of_Operations: {
                required: helpers.withMessage("This field is mandatory", required),
                max: maxLength(300)
            },

            // 1B
            A2_Zip_Postal: {
                required: helpers.withMessage("This field is mandatory", required),
                max: maxLength(20)
            },
            A2_Address: {
                required: helpers.withMessage("This field is mandatory", required),
                max: maxLength(100)
            },

            // 1C
            A3_Business_Telephone_Number_Number: {
                required: helpers.withMessage("This field is mandatory", required),
                max: maxLength(100)
            },
            A3_Website_Address: { max: maxLength(100) },
            A3_Email_Address: {
                required: helpers.withMessage("This field is mandatory", required),
                max: maxLength(100)
            },
            A3_Email_Checkbox: {
                required: helpers.withMessage("This field is mandatory", required)
            }
        };
    },
    computed: {
        ...mapGetters(["getSection1", "getMyInfoData"]),
        
        computedDateFormatted() {
            return this.formatDate(this.date);
        },
        //...mapGetters(["getSection1", "getMyInfoData"]),

        // Validation messages
        nameOfApplicantValidationMessage() {
            return this.v$.nameOfApplicant.$errors.find(e => e)?.$message ?? "";
        },
        entityTypeValidationMessage() {
            return this.v$.entityType.$errors.find(e => e)?.$message ?? "";
        },
        natureEntityValidationMessage() {
            return this.v$.natureEntity.$errors.find(e => e)?.$message ?? "";
        },
        A1_Unique_Entity_NumberValidationMessage() {
            return this.v$.A1_Unique_Entity_Number.$errors.find(e => e)?.$message ?? "";
        },
        A1_Description_of_OperationsValidationMessage() {
            return this.v$.A1_Description_of_Operations.$errors.find(e => e)?.$message ?? "";
        },
        A2_Zip_PostalValidationMessage() {
            return this.v$.A2_Zip_Postal.$errors.find(e => e)?.$message ?? "";
        },
        A2_AddressValidationMessage() {
            return this.v$.A2_Address.$errors.find(e => e)?.$message ?? "";
        },
        A3_Business_Telephone_Number_NumberValidationMessage() {
            return this.v$.A3_Business_Telephone_Number_Number.$errors.find(e => e)?.$message ?? "";
        },
        A3_Website_AddressValidationMessage() {
            return this.v$.A3_Website_Address.$errors.find(e => e)?.$message ?? "";
        },
        A3_Email_AddressValidationMessage() {
            return this.v$.A3_Email_Address.$errors.find(e => e)?.$message ?? "";
        },
        A3_Email_CheckboxValidationMessage() {
            return this.v$.A3_Email_Checkbox.$errors.find(e => e)?.$message ?? "";
        }
    },
    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        }
    },

    methods: {
        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split("-");
            return `${month}/${day}/${year}`;
        },
        parseDate(date) {
            if (!date) return null;

            const [month, day, year] = date.split("/");
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
    }
};
</script>

<style scoped></style>
