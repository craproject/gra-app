<template>
    <div class="row no-gutters">
        <v-subheader class="col-12 black--text">Home Telephone</v-subheader>

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4 pe-3"
            label="Country Code"
            v-model="personalContact.homeTelCountryCode"
            :error-messages="homeTelCountryCodeValidationMessage"
            @input="v$.personalContact.homeTelCountryCode.$touch"
            @blur="v$.personalContact.homeTelCountryCode.$touch"
        />

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4"
            label="Area Code"
            v-model="personalContact.homeTelAreaCode"
            :error-messages="homeTelAreaCodeValidationMessage"
            @input="v$.personalContact.homeTelAreaCode.$touch"
            @blur="v$.personalContact.homeTelAreaCode.$touch"
        />

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4 pe-3"
            label="Number"
            v-model="personalContact.homeTelNumber"
            :error-messages="homeTelNumberValidationMessage"
            @input="v$.personalContact.homeTelNumber.$touch"
            @blur="v$.personalContact.homeTelNumber.$touch"
        />

        <v-subheader class="col-12 black--text">Mobile Number</v-subheader>

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4 pe-3"
            v-model="personalContact.mobilePhoneCountryCode"
            :error-messages="mobilePhoneCountryCodeValidationMessage"
            @input="v$.personalContact.mobilePhoneCountryCode.$touch"
            @blur="v$.personalContact.mobilePhoneCountryCode.$touch"
        >
            <template v-slot:label>
                <span class="required"> Country Code </span>
            </template>
        </v-text-field>

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4"
            v-model="personalContact.mobilePhoneAreaCode"
            :error-messages="mobilePhoneAreaCodeValidationMessage"
            @input="v$.personalContact.mobilePhoneAreaCode.$touch"
            @blur="v$.personalContact.mobilePhoneAreaCode.$touch"
        >
            <template v-slot:label>
                <span> Area Code </span>
            </template>
        </v-text-field>

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4 pe-3"
            v-model="personalContact.mobilePhoneNumber"
            :error-messages="mobilePhoneNumberValidationMessage"
            @input="v$.personalContact.mobilePhoneNumber.$touch"
            @blur="v$.personalContact.mobilePhoneNumber.$touch"
        >
            <template v-slot:label>
                <span class="required"> Number </span>
            </template>
        </v-text-field>

        <v-subheader class="col-12 black--text">Office Number</v-subheader>

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4 pe-3"
            label="Country Code"
            v-model="personalContact.officeNumCountryCode"
            :error-messages="officeNumCountryCodeValidationMessage"
            @input="v$.personalContact.officeNumCountryCode.$touch"
            @blur="v$.personalContact.officeNumCountryCode.$touch"
        />

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4"
            label="Area Code"
            v-model="personalContact.officeNumAreaCode"
            :error-messages="officeNumAreaCodeValidationMessage"
            @input="v$.personalContact.officeNumAreaCode.$touch"
            @blur="v$.personalContact.officeNumAreaCode.$touch"
        />

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4 pe-3"
            label="Number"
            v-model="personalContact.officeNum"
            :error-messages="officeNumValidationMessage"
            @input="v$.personalContact.officeNum.$touch"
            @blur="v$.personalContact.officeNum.$touch"
        ></v-text-field>

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4"
            label="Extension"
            v-model="personalContact.officeNumExtension"
            :error-messages="officeNumExtensionValidationMessage"
            @input="v$.personalContact.officeNumExtension.$touch"
            @blur="v$.personalContact.officeNumExtension.$touch"
        ></v-text-field>

        <v-subheader class="col-12 black--text">Email Address</v-subheader>

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4 pe-3"
            v-model="personalContact.personalEmail"
            :error-messages="personalEmailValidationMessage"
            @input="v$.personalContact.personalEmail.$touch"
            @blur="v$.personalContact.personalEmail.$touch"
        >
            <template v-slot:label>
                <span class="required"> Personal Email </span>
            </template>
        </v-text-field>

        <v-text-field
            outlined
            class="col-12 col-md-6 col-lg-4"
            v-model="personalContact.workEmail"
            :error-messages="workEmailValidationMessage"
            @input="v$.personalContact.workEmail.$touch"
            @blur="v$.personalContact.workEmail.$touch"
        >
            <template v-slot:label>
                <span class="required"> Work Email </span>
            </template>
        </v-text-field>

        <v-checkbox
            label="I understand"
            v-model="personalContact.telAndEmailAgreement"
            :error-messages="telAndEmailAgreementValidationMessage"
            @change="v$.personalContact.telAndEmailAgreement.$touch"
            @blur="v$.personalContact.telAndEmailAgreement.$touch"
        >
            <template v-slot:label>
                <span class="required">
                    I understand that the aforementioned email address will be used for electronic
                    service and that it is my / the Applicant or Associate’s responsibility to
                    update the Authority with any changes in the electronic service address.
                </span>
            </template>
        </v-checkbox>
    </div>
</template>

<script>
import { PersonalContactModel } from "@/models/PersonalContactModel";
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
import { mapGetters } from "vuex";

export default {
    name: "PersonalContact",
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            personalContact: {
                homeTelCountryCode: "",
                homeTelAreaCode: "",
                homeTelNumber: "",
                mobilePhoneCountryCode: "",
                mobilePhoneAreaCode: "",
                mobilePhoneNumber: "",
                officeNumCountryCode: "",
                officeNumAreaCode: "",
                officeNum: "",
                officeNumExtension: "",
                personalEmail: "",
                workEmail: "",
                telAndEmailAgreement: undefined
            }
        };
    },
    validations() {
        return {
            personalContact: {
                homeTelCountryCode: { numeric, max: maxLength(5) },
                homeTelAreaCode: { numeric, max: maxLength(5) },
                homeTelNumber: { numeric, max: maxLength(12) },
                mobilePhoneCountryCode: {
                    required: helpers.withMessage("This field is mandatory", required),
                    numeric,
                    max: maxLength(5)
                },
                mobilePhoneAreaCode: { numeric, max: maxLength(5) },
                mobilePhoneNumber: {
                    required: helpers.withMessage("This field is mandatory", required),
                    numeric,
                    max: maxLength(12)
                },
                officeNumCountryCode: { numeric, max: maxLength(5) },
                officeNumAreaCode: { numeric, max: maxLength(5) },
                officeNum: { numeric, max: maxLength(12) },
                officeNumExtension: { numeric, max: maxLength(5) },
                personalEmail: {
                    required: helpers.withMessage(
                        "This field is mandatory",
                        requiredIf(!this.personalContact.workEmail)
                    ),
                    email: helpers.withMessage("Invalid email address", email),
                    max: maxLength(131)
                },
                workEmail: {
                    required: helpers.withMessage(
                        "This field is mandatory",
                        requiredIf(!this.personalContact.personalEmail)
                    ),
                    email: helpers.withMessage("Invalid email address", email),
                    max: maxLength(131)
                },
                telAndEmailAgreement: {
                    required: helpers.withMessage("This field is mandatory", required),
                    sameAs: helpers.withMessage("Please accept", sameAs(true))
                }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection1F"]),

        // Validation messages
        homeTelCountryCodeValidationMessage() {
            return this.v$.personalContact.homeTelCountryCode.$errors.find(e => e)?.$message ?? "";
        },
        homeTelAreaCodeValidationMessage() {
            return this.v$.personalContact.homeTelAreaCode.$errors.find(e => e)?.$message ?? "";
        },
        homeTelNumberValidationMessage() {
            return this.v$.personalContact.homeTelNumber.$errors.find(e => e)?.$message ?? "";
        },
        mobilePhoneCountryCodeValidationMessage() {
            return (
                this.v$.personalContact.mobilePhoneCountryCode.$errors.find(e => e)?.$message ?? ""
            );
        },
        mobilePhoneAreaCodeValidationMessage() {
            return this.v$.personalContact.mobilePhoneAreaCode.$errors.find(e => e)?.$message ?? "";
        },
        mobilePhoneNumberValidationMessage() {
            return this.v$.personalContact.mobilePhoneNumber.$errors.find(e => e)?.$message ?? "";
        },
        officeNumCountryCodeValidationMessage() {
            return (
                this.v$.personalContact.officeNumCountryCode.$errors.find(e => e)?.$message ?? ""
            );
        },
        officeNumAreaCodeValidationMessage() {
            return this.v$.personalContact.officeNumAreaCode.$errors.find(e => e)?.$message ?? "";
        },
        officeNumValidationMessage() {
            return this.v$.personalContact.officeNum.$errors.find(e => e)?.$message ?? "";
        },
        officeNumExtensionValidationMessage() {
            return this.v$.personalContact.officeNumExtension.$errors.find(e => e)?.$message ?? "";
        },
        personalEmailValidationMessage() {
            return this.v$.personalContact.personalEmail.$errors.find(e => e)?.$message ?? "";
        },
        workEmailValidationMessage() {
            return this.v$.personalContact.workEmail.$errors.find(e => e)?.$message ?? "";
        },
        telAndEmailAgreementValidationMessage() {
            return (
                this.v$.personalContact.telAndEmailAgreement.$errors.find(e => e)?.$message ?? ""
            );
        },

        isValid() {
            return !this.v$.$invalid;
        }
    },
    methods: {
        validateSection() {
            this.v$.$validate();
        },
        validateAgreement() {
            if (this.personalContact.personalEmail || this.personalContact.workEmail) {
                this.v$.personalContact.telAndEmailAgreement.$validate();
            }
        },
        populateData() {
            this.personalContact = this.getSection1F;
            // this.validateSection(); // for API return data error (will display UI error after get data)
            this.validateAgreement();
        },
        buildApiData() {
            console.log("getSection1F: " + JSON.stringify(this.getSection1F));
            return PersonalContactModel.toJsonApi(this.personalContact);
        }
    }
};
</script>

<style scoped></style>
