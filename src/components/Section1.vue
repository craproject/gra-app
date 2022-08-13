<template>
    <div>
        <h1>1. General Information of Applicant</h1>
        <!-- Retrieve from MyInfo 
        <v-checkbox
            name="Sec_1A_Checkbox"
            v-model="retrieveFromMyInfo"
            label="Retrieve from MyInfo"
            class="font-weight-bold checkbox-large"
        >
        </v-checkbox>-->

        <!-- 1A -->
        <v-subheader class="black--text"></v-subheader>
        <div class="row no-gutters">
            <div class="col-12">
                <div class="sub-section-group">
                    <!-- Name -->
                    <v-text-field
                        outlined
                        v-model="applicant.nameOfApplicant"
                        :counter="100"
                        :error-messages="nameOfApplicantValidationMessage"
                        @input="v$.applicant.nameOfApplicant.$touch"
                        @blur="v$.applicant.nameOfApplicant.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">Name of Applicant</span>
                        </template>
                    </v-text-field>

                    <!-- Entity Type -->
                    <v-radio-group
                        v-model="applicant.entityType"
                        :error-messages="entityTypeValidationMessage"
                        @change="updateEntityType_otherRequired"
                    >
                        <v-radio value="1" label="Company registered with ACRA"></v-radio>
                        <v-radio value="2" label="Society registered with ROS"></v-radio>
                        <v-radio value="3" label="Others"></v-radio>
                        <template v-slot:label>
                            <span class="required">Type of Entity</span>
                        </template>
                    </v-radio-group>

                    <!-- If Other -->
                    <!-- <v-text-field
                        v-if="applicant.entityType === '3'"
                        outlined
                        v-model="applicant.entityType_other"
                        :counter="100"
                    >
                        <template v-slot:label>
                            <span class="required">If Others</span>
                        </template>
                    </v-text-field> -->

                    <v-text-field
                    v-if="entityType_otherRequired"
                        outlined
                        v-model="applicant.entityType_other"
                        :counter="100"
                        :error-messages="entityType_otherValidationMessage"
                        @input="v$.applicant.entityType_other.$touch"
                        @blur="v$.applicant.entityType_other.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">If Others</span>
                        </template>
                    </v-text-field>

                    <!-- Nature Entity -->
                    <v-radio-group
                        v-model="applicant.natureEntity"
                        :error-messages="natureEntityValidationMessage"
                        @change="updateNatureEntity_otherRequired"
                    >
                        <v-radio value="1" label="Recreational club"></v-radio>
                        <v-radio value="2" label="Others"></v-radio>
                        <template v-slot:label>
                            <span class="required">Nature of Entity</span>
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
                    <!-- <v-text-field
                        v-if="applicant.natureEntity === '2'"
                        outlined
                        v-model="applicant.natureEntity_other"
                        :counter="100"
                    >
                        <template v-slot:label>
                            <span class="required">If Others</span>
                        </template>
                    </v-text-field> -->
                    <!-- <v-text-field
                        v-if="applicant.natureEntity === '2'"
                        outlined
                        v-model="applicant.natureEntity_other"
                        :counter="100"
                        :error-messages="natureEntity_otherValidationMessage"
                        @input="v$.applicant.natureEntity_other.$touch"
                        @blur="v$.applicant.natureEntity_other.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">If Others</span>
                        </template>
                    </v-text-field> -->
                    <v-text-field
                     v-if="natureEntity_otherRequired"
                        outlined
                        v-model="applicant.natureEntity_other"
                        :counter="100"
                        :error-messages="natureEntity_otherValidationMessage"
                        @input="v$.applicant.natureEntity_other.$touch"
                        @blur="v$.applicant.natureEntity_other.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">If Others</span>
                        </template>
                    </v-text-field>

                    <!-- Unique Entity Number (UEN) -->
                    <v-text-field
                        v-model="applicant.uen"
                        :counter="100"
                        class="mt-3"
                        outlined
                        :error-messages="uenValidationMessage"
                        @input="v$.applicant.uen.$touch"
                        @blur="v$.applicant.uen.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">Unique Entity Number (UEN)</span>
                        </template>
                    </v-text-field>

                    <!-- Date of Incorporation -->
                    <v-menu
                        ref="dateOfAppointment"
                        v-model="showDateOfAppointment"
                        :close-on-content-click="false"
                        :return-value.sync="dateOfAppointment"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateOfAppointmentFormatted"
                                label="Date of Incorporation/Registration (DD-MM-YYYY)"
                                outlined
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="dateOfAppointmentValidationMessage"
                                @input="v$.dateOfAppointment.$touch"
                                @blur="v$.dateOfAppointment.$touch"
                            ></v-text-field>
                        </template>

                        <v-date-picker v-model="dateOfAppointment" no-title scrollable>
                            <v-spacer></v-spacer>

                            <v-btn text color="primary" @click="showDateOfAppointment = false">
                                CANCEL
                            </v-btn>

                            <v-btn
                                text
                                color="primary"
                                @click="$refs.dateOfAppointment.save(dateOfAppointment)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>

                    <!-- Description of Operations -->
                    <v-textarea
                        v-model="applicant.descriptionOfOperations"
                        :counter="300"
                        rows="2"
                        row-height="30"
                        auto-grow
                        outlined
                        :error-messages="descriptionOfOperationsValidationMessage"
                        @input="v$.applicant.descriptionOfOperations.$touch"
                        @blur="v$.applicant.descriptionOfOperations.$touch"
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

        <v-subheader class="black--text"></v-subheader>
        <h5>Registered Business Address of the Applicant</h5>
        <div class="row no-gutters">
            <div class="col-12">
                <div class="sub-section-group">
                    <!-- ZIP / Postal Code -->
                    <v-text-field
                        v-model="applicant.postalCode"
                        :counter="20"
                        outlined
                        :error-messages="postalCodeValidationMessage"
                        @input="v$.applicant.postalCode.$touch"
                        @blur="v$.applicant.postalCode.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">ZIP / Postal Code</span>
                        </template>
                    </v-text-field>

                    <!-- Address -->
                    <v-textarea
                        v-model="applicant.address"
                        :counter="100"
                        rows="2"
                        row-height="30"
                        auto-grow
                        outlined
                        :error-messages="addressValidationMessage"
                        @input="v$.applicant.address.$touch"
                        @blur="v$.applicant.address.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">Address</span>
                        </template>
                    </v-textarea>
                </div>
            </div>
        </div>

        <!-- A3 -->
        <v-subheader class="black--text"></v-subheader>
        <h5>Contact Information of the Applicant</h5>
        <div class="row no-gutters">
            <div class="col-12">
                <div class="sub-section-group">
                    <!-- Business Telephone Number -->
                    <v-text-field
                        v-model="applicant.businessTelephoneNumber"
                        :counter="100"
                        outlined
                        :error-messages="businessTelephoneNumberValidationMessage"
                        @input="v$.applicant.businessTelephoneNumber.$touch"
                        @blur="v$.applicant.businessTelephoneNumber.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">Business Telephone Number</span>
                        </template>
                    </v-text-field>

                    <!-- Website Address -->
                    <v-text-field
                        v-model="applicant.websiteAddress"
                        :counter="100"
                        outlined
                        :error-messages="websiteAddressValidationMessage"
                        @input="v$.applicant.websiteAddress.$touch"
                        @blur="v$.applicant.websiteAddress.$touch"
                    >
                        <template v-slot:label>
                            <span>Website Address</span>
                        </template>
                    </v-text-field>

                    <!-- Email Address -->
                    <v-text-field
                        v-model="applicant.emailAddress"
                        :counter="100"
                        outlined
                        :error-messages="emailAddressValidationMessage"
                        @input="v$.applicant.emailAddress.$touch"
                        @blur="v$.applicant.emailAddress.$touch"
                    >
                        <template v-slot:label>
                            <span class="required">Email Address</span>
                        </template>
                    </v-text-field>

                    <!-- Email Checkbox -->
                    <v-checkbox
                        v-model="applicant.emailCheckbox"
                        :error-messages="emailCheckboxValidationMessage"
                        @input="v$.applicant.emailCheckbox.$touch"
                        @change="v$.applicant.emailCheckbox.$touch;"
                    >
                        <template v-slot:label>
                            <span class="black--text required">
                                I understand that the aforementioned email address will be used for
                                electronic service and that it is my / the Applicant's
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
import {
    email,
    helpers,
    maxLength,
    required,
    sameAs,
    numeric,
    requiredIf
} from "@vuelidate/validators";

import { DateTime } from "luxon";
import { uenValidator } from "@/validations/uen";
//import SectionMixin from "./SectionMixin.js";
import { mapGetters, mapMutations } from "vuex";
import { ApplicantDataModel } from "@/models/ApplicantDataModel";

export default {
    name: "Section1",
    components: {},
    mixins: [optionMixin],
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            // Other controls
            showDateOfAppointment: false,

            //retrieveFromMyInfo: false,
            applicant: new ApplicantDataModel(),
            dateOfAppointment: "",

            entityType_otherRequired: false,
            natureEntity_otherRequired: false

            /*nameOfApplicant: "",
            entityType: "",
            entityType_other: "",
            natureEntity: "",
            natureEntity_other: "",
            uen: "",
            descriptionOfOperations: "",
            postalCode: "",
            address: "",
            businessTelephoneNumber: "",
            websiteAddress: "",
            emailAddress: "",
            emailCheckbox: "",
            dateOfAppointment: ""*/
        };
    },
    validations() {
        return {
            // retrieveFromMyInfo: false,
            dateOfAppointment: {
                required: helpers.withMessage("This field is mandatory", required)
            },
            applicant: {
                // 1A
                nameOfApplicant: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                entityType: { required: helpers.withMessage("This field is mandatory", required) },
                entityType_other: {
                    // required: helpers.withMessage(
                    //     "This field is mandatory",
                    //     requiredIf(function() {
                    //         return this.entityType_otherRequired; // return true if this field is required
                    //     })
                    // )
                    // // required: requiredIf(this.entityType_otherRequired)
                    // // required: helpers.withMessage("This field is mandatory", required)
                },
                natureEntity: {
                    required: helpers.withMessage("This field is mandatory", required)
                },
                natureEntity_other: {
                    //  required: helpers.withMessage(
                    //     "This field is mandatory",
                    //     requiredIf(function() {
                    //         return this.natureEntity_otherRequired; // return true if this field is required
                    //     })
                    // )
                    //  required: requiredIf(function(field) {
                    //     return this.applicant.natureEntity === '2';
                    // })
                    // required: helpers.withMessage("This field is mandatory", required)
                },
                uen: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100),
                    uen: helpers.withMessage("Invalid Unique Entity Number (UEN)", () =>
                        uenValidator(this.applicant.uen)
                    )
                },

                descriptionOfOperations: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(300)
                },

                // 1B
                postalCode: {
                    required: helpers.withMessage("This field is mandatory", required),
                    numeric,
                    max: maxLength(20)
                },
                address: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },

                // 1C
                businessTelephoneNumber: {
                    numeric,
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                websiteAddress: {
                    max: maxLength(100)
                },
                emailAddress: {
                    required: helpers.withMessage("This field is mandatory", required),
                    email: helpers.withMessage("Invalid email address", email),
                    max: maxLength(100)
                },
                emailCheckbox: {
                    required: helpers.withMessage("This field is mandatory", required),
                     emailCheckbox: helpers.withMessage("This field is mandatory to check", () =>
                        this.applicant.emailCheckbox
                    )
                }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection1"]),

        ApplicantInfo() {
            return this.applicant;
        },

        dateOfAppointmentFormatted() {
            return (
                this.dateOfAppointment &&
                DateTime.fromISO(this.dateOfAppointment).toFormat("dd-MM-yyyy")
            );
        },

        // Validation messages
        nameOfApplicantValidationMessage() {
            return this.v$.applicant.nameOfApplicant.$errors.find(e => e)?.$message ?? "";
        },
        entityTypeValidationMessage() {
            return this.v$.applicant.entityType.$errors.find(e => e)?.$message ?? "";
        },
        entityType_otherValidationMessage() {
            return this.v$.applicant.entityType_other.$errors.find(e => e)?.$message ?? "";
        },
        natureEntityValidationMessage() {
            return this.v$.applicant.natureEntity.$errors.find(e => e)?.$message ?? "";
        },
        natureEntity_otherValidationMessage() {
            return this.v$.applicant.natureEntity_other.$errors.find(e => e)?.$message ?? "";
        },
        uenValidationMessage() {
            return this.v$.applicant.uen.$errors.find(e => e)?.$message ?? "";
        },
        descriptionOfOperationsValidationMessage() {
            return this.v$.applicant.descriptionOfOperations.$errors.find(e => e)?.$message ?? "";
        },
        postalCodeValidationMessage() {
            return this.v$.applicant.postalCode.$errors.find(e => e)?.$message ?? "";
        },
        addressValidationMessage() {
            return this.v$.applicant.address.$errors.find(e => e)?.$message ?? "";
        },
        businessTelephoneNumberValidationMessage() {
            return this.v$.applicant.businessTelephoneNumber.$errors.find(e => e)?.$message ?? "";
        },
        websiteAddressValidationMessage() {
            return this.v$.applicant.websiteAddress.$errors.find(e => e)?.$message ?? "";
        },
        emailAddressValidationMessage() {
            return this.v$.applicant.emailAddress.$errors.find(e => e)?.$message ?? "";
        },
        emailCheckboxValidationMessage() {
            return this.v$.applicant.emailCheckbox.$errors.find(e => e)?.$message ?? "";
        },
        dateOfAppointmentValidationMessage() {
            return this.v$.dateOfAppointment.$errors.find(e => e)?.$message ?? "";
        },

        isValid() {
            return !this.v$.applicant.$invalid && !this.v$.dateOfAppointment.isValid;
            /*(!this.v$.nameOfApplicant.$invalid &&
                !this.v$.entityType.$invalid &&
                !this.v$.entityType_other.$invalid &&
                !this.v$.natureEntity.$invalid &&
                !this.v$.natureEntity_other.$invalid &&
                !this.v$.uen.$invalid &&
                !this.v$.descriptionOfOperations.$invalid &&
                !this.v$.postalCode.$invalid &&
                !this.v$.address.$invalid &&
                !this.v$.businessTelephoneNumber.$invalid &&
                !this.v$.websiteAddress.$invalid &&
                !this.v$.emailAddress.$invalid &&
                !this.v$.emailCheckbox.$invalid &&
                !this.v$.dateOfAppointment.$invalid);*/
        }
    },

    methods: {
        ...mapMutations(["setSection1"]),

        //updateGeneralInfo() {
        //    console.log("Storing Applicant Info: " + this.applicant);
        //    //this.setSection1(this.applicant);
        //    this.$store.commit("setSection1", this.applicant);
        //},
        formatDatetimeTable(item) {
            return item && DateTime.fromISO(item).toFormat("dd-MM-yyyy");
        },
        updateEntityType_otherRequired() {
            this.entityType_otherRequired = this.applicant.entityType === "3" ? true : false;
            this.applicant.entityType_other = "";
        },
        updateNatureEntity_otherRequired() {
            this.natureEntity_otherRequired = this.applicant.natureEntity === "2" ? true : false;
            this.applicant.natureEntity_other = "";
        },
        validateSection() {
            console.log("section 1 validate");
            this.v$.$validate();
            /*this.v$.nameOfApplicant.$touch();
            this.v$.entityType.$touch();
            this.v$.entityType_other.$touch();
            this.v$.natureEntity.$touch();
            this.v$.natureEntity_other.$touch();
            this.v$.uen.$touch();
            this.v$.descriptionOfOperations.$touch();
            this.v$.postalCode.$touch();
            this.v$.address.$touch();
            this.v$.businessTelephoneNumber.$touch();
            this.v$.websiteAddress.$touch();
            this.v$.emailAddress.$touch();
            this.v$.emailCheckbox.$touch();
            this.v$.dateOfAppointment.$touch();*/
        },
        populateData() {
            // console.log("Populate Info: " + this.getSection1);
            this.applicant = this.getSection1;
            this.dateOfAppointment = this.applicant.dateOfAppointment;
            this.entityType_otherRequired = this.applicant.entityType === "3" ? true : false;
            this.natureEntity_otherRequired = this.applicant.natureEntity === "2" ? true : false;

            //this.$store.commit("setSection1", this.applicant);
            /*this.nameOfApplicant = this.getSection1.nameOfApplicant;
            this.entityType = this.getSection1.entityType;
            this.entityType_other = this.getSection1.entityType_other;
            this.natureEntity = this.getSection1.natureEntity;
             this.natureEntity_other = this.getSection1.natureEntity_other;
            this.uen = this.getSection1.uen;
            this.descriptionOfOperations = this.getSection1.descriptionOfOperations;
            this.postalCode = this.getSection1.postalCode;
            this.address = this.getSection1.address;
            this.businessTelephoneNumber = this.getSection1.businessTelephoneNumber;
            this.websiteAddress = this.getSection1.websiteAddress;
            this.emailAddress = this.getSection1.emailAddress;
            this.emailCheckbox = this.getSection1.emailCheckbox;
            this.dateOfAppointment = this.getSection1.dateOfAppointment;*/
        },
        buildApiData() {
            console.log("Storing Applicant Info 1 : " + this.applicant);
            this.$store.commit("setSection1", this.applicant);
            return ApplicantDataModel.toJsonApi(this.applicant);
            /*{Name_of_Applicant: this.nameOfApplicant,
                Type_of_Entity: this.entityType,
                Type_of_Entity_Other: this.entityType_other,
                Nature_of_Entity: this.natureEntity,
                Nature_of_Entity_Other: this.natureEntity_other,
                Unique_Entity_Number: this.uen,
                Description_of_Operations: this.descriptionOfOperations,
                Postal_Code: this.postalCode,
                Address: this.address,
                Business_Telephone_Number: this.businessTelephoneNumber,
                Website_Address: this.websiteAddress,
                Email_Address: this.emailAddress,
                Email_Checkbox: this.emailCheckbox,
                Date_of_Appointment: this.dateOfAppointment
                //CRM_ID: this.getSection3.crmId,
                //Sec_1A_Name: this.name // "Applicant Name",*/
        },
        //},
        async submit(fromSectionIndex, toSectionIndex) {
            this.applicant.dateOfAppointment = this.dateOfAppointment;
            let data = this.applicant;
            console.log("applicant: ", data);

            // await this.$store.dispatch("commitSectionData");
            await this.$store.dispatch("commitSectionData", data);
        }
    },
    mounted() {
        console.log('mounted section 1');
        this.populateData();
    },
    watch: {
        // getSection1() {
        //     // Populate Section Data
        //     this.applicant = this.getSection1;
        // }
    }
    /*watch: {
        applicantInfo: {
            handler() {
                console.log("Applicant Info : " + this.applicant);
                if (this.isValid) this.$store.commit("setSection1", this.applicant);
            },
            deep: true
        }
    }*/
};
</script>

<style scoped></style>
