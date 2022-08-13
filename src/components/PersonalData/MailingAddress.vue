<template>
    <div>
        <v-checkbox
            label="Same as Residential Address"
            v-model="haveSameAddress"
            @change="haveSameAddressChange"
        ></v-checkbox>

        <div class="row no-gutters">
            <v-select
                outlined
                class="col-12 col-md-6 col-lg-4 pe-3"
                :items="addressTypeOptions"
                item-value="value"
                item-text="label"
                v-model="mailingAddress.mailingAddressType"
                :error-messages="mailingAddressTypeValidationMessage"
                @change="v$.mailingAddress.mailingAddressType.$touch"
                @blur="v$.mailingAddress.mailingAddressType.$touch"
                :disabled="haveSameAddress"
            >
                <template v-slot:label>
                    <span class="required"> Address Type </span>
                </template>
            </v-select>

            <v-text-field
                outlined
                class="col-12 col-md-6 col-lg-4"
                v-model="mailingAddress.mailingBlk"
                :error-messages="mailingBlkValidationMessage"
                @input="v$.mailingAddress.mailingBlk.$touch"
                @blur="v$.mailingAddress.mailingBlk.$touch"
                :disabled="haveSameAddress"
            >
                <template v-slot:label>
                    <span :class="{'required': !notRequiredProps.includes('Blk')}"> Blk / House # </span>
                </template>
            </v-text-field>

            <v-text-field
                outlined
                class="col-12 col-md-6 col-lg-4 pe-3"
                v-model="mailingAddress.mailingStreet"
                :error-messages="mailingStreetValidationMessage"
                @input="v$.mailingAddress.mailingStreet.$touch"
                @blur="v$.mailingAddress.mailingStreet.$touch"
                :disabled="haveSameAddress"
            >
                <template v-slot:label>
                    <span :class="{'required': !notRequiredProps.includes('Street')}">Street </span>
                </template>
            </v-text-field>

            <v-text-field
                outlined
                class="col-12 col-md-6 col-lg-4"
                v-model="mailingAddress.mailingFloor"
                 :error-messages="mailingFloorValidationMessage"
                @input="v$.mailingAddress.mailingFloor.$touch"
                @blur="v$.mailingAddress.mailingFloor.$touch"
                :disabled="haveSameAddress"
            >
                <template v-slot:label>
                    <span :class="{'required': !notRequiredProps.includes('Floor')}">Floor </span>
                </template>
            </v-text-field>

            <v-text-field
                outlined
                class="col-12 col-md-6 col-lg-4 pe-3"
                v-model="mailingAddress.mailingUnit"
                :error-messages="mailingUnitValidationMessage"
                @input="v$.mailingAddress.mailingUnit.$touch"
                @blur="v$.mailingAddress.mailingUnit.$touch"
                :disabled="haveSameAddress"
            >
                <template v-slot:label>
                    <span :class="{'required': !notRequiredProps.includes('Unit')}">Unit </span>
                </template>
            </v-text-field>
            
            <v-text-field
                outlined
                class="col-12 col-md-6 col-lg-4"
                v-model="mailingAddress.mailingBuilding"
                 :error-messages="mailingBuildingValidationMessage"
                @input="v$.mailingAddress.mailingBuilding.$touch"
                @blur="v$.mailingAddress.mailingBuilding.$touch"
                :disabled="haveSameAddress"
            >
                <template v-slot:label>
                    <span :class="{'required': !notRequiredProps.includes('Building')}"> Building </span>
                </template>
            </v-text-field>

            <v-text-field
                outlined
                class="col-12 col-md-6 col-lg-4 pe-3"
                v-model="mailingAddress.mailingPostalCode"
                :error-messages="mailingPostalCodeValidationMessage"
                @input="v$.mailingAddress.mailingPostalCode.$touch"
                @blur="v$.mailingAddress.mailingPostalCode.$touch"
                :disabled="haveSameAddress"
            >
                <template v-slot:label>
                    <span :class="{'required': !notRequiredProps.includes('PostalCode')}">ZIP / Postal Code </span>
                </template>
            </v-text-field>

            <v-select
                outlined
                class="col-12 col-md-6 col-lg-4"
                :items="countryOptions"
                item-value="value"
                item-text="label"
                v-model="mailingAddress.mailingCountry"
                :error-messages="mailingCountryValidationMessage"
                @change="v$.mailingAddress.mailingCountry.$touch"
                @blur="v$.mailingAddress.mailingCountry.$touch"
                :disabled="haveSameAddress"
            >
                <template v-slot:label>
                    <span :class="{'required': !notRequiredProps.includes('Country')}">Country </span>
                </template>
            </v-select>
        </div>
    </div>
</template>

<script>
import optionMixin from "@/mixins/optionMixin";
import { PersonalMailingAddressModel } from "@/models/PersonalMailingAddressModel";
import useVuelidate from "@vuelidate/core";
import { maxLength, required, requiredIf,helpers } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
    name: "MailingAddress",
    setup() {
        return { v$: useVuelidate() };
    },
    mixins: [optionMixin],
    data() {
        return {
            haveSameAddress: false,

            mailingAddress: {
                mailingAddressType: "",
                mailingBlk: "",
                mailingStreet: "",
                mailingFloor: "",
                mailingUnit: "",
                mailingBuilding: "",
                mailingPostalCode: "",
                mailingCountry: ""
            }
        };
    },
    validations() {
        return {
            mailingAddress: {
                mailingAddressType: { required: helpers.withMessage('This field is mandatory', required) },
                mailingBlk: {
                    required: helpers.withMessage('This field is mandatory', requiredIf(() => !this.notRequiredProps.includes("Blk"))) , // Not required if in notRequiredProps
                    max: maxLength(5)
                },
                mailingStreet: {
                    required: helpers.withMessage('This field is mandatory', requiredIf(() => !this.notRequiredProps.includes("Street"))) ,
                    max: maxLength(32)
                },
                mailingFloor: {
                    required: helpers.withMessage('This field is mandatory', requiredIf(() => !this.notRequiredProps.includes("Floor") )) ,
                    max: maxLength(2)
                },
                mailingUnit: {
                    required: helpers.withMessage('This field is mandatory', requiredIf(() => !this.notRequiredProps.includes("Unit") )) ,
                    max: maxLength(5)
                },
                mailingBuilding: {
                    required: helpers.withMessage('This field is mandatory', requiredIf(() => !this.notRequiredProps.includes("Building"))) ,
                    max: maxLength(30)
                },
                mailingPostalCode: {
                    required: helpers.withMessage('This field is mandatory', requiredIf(() => !this.notRequiredProps.includes("PostalCode"))) ,
                    // max: maxLength(6)
                    max: maxLength(this.customMaxLength)
                },
                mailingCountry: {
                    required: helpers.withMessage('This field is mandatory', requiredIf(() => !this.notRequiredProps.includes("Country"))) 
                }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection1D", "getSection1E"]),

        residentAddress() {
            return this.getSection1D;
        },

         customMaxLength(){
            let country =  this.getOptionText(
                this.countryOptions,
                this.mailingAddress.mailingCountry
            );
            var maxLength = 0;
            if(country === "Singapore"){
                maxLength = 6;
            }
            else{
                maxLength = 100;
            }
            return maxLength
        },

        notRequiredProps() {
            if (this.mailingAddress === undefined) return;

            let addressType = this.getOptionText(
                this.addressTypeOptions,
                this.mailingAddress.mailingAddressType
            );

            switch (addressType) {
                case "Apt Blk": {
                    return ["Building"];
                }
                case "Without Apt Blk": {
                    return ["Blk","Floor", "Unit", "Building"];
                }
                case "Overseas Address": {
                    return ["Floor", "Unit", "Building"];
                }
                case "Private Flats With Apt Blk": {
                    return ["Building"];
                }
                case "C/O Apt Blk": {
                    return ["Building"];
                }
                case "C/O Without Apt Blk": {
                    return ["Blk","Floor", "Unit", "Building"];
                }
                case "Quarter Address": {
                    return ["Blk", "Floor", "Building"];
                }
                case "Island Address": {
                    return ["Blk", "Floor", "Unit", "Building", "PostalCode"];
                }
                case "Reverse of AptBlk & StrName": {
                    return ["Blk", "Floor", "Unit", "Building"];
                }
                case "NIL": {
                    return ["Blk", "Street", "Floor", "Unit", "Building", "PostalCode", "Country"];
                }
                default:
                    return [];
            }
        },

        // Validation messages
        mailingAddressTypeValidationMessage() {
            return this.v$.mailingAddress.mailingAddressType.$errors.find((e) => e)?.$message ?? "";
        },
        mailingBlkValidationMessage() {
            return this.v$.mailingAddress.mailingBlk.$errors.find((e) => e)?.$message ?? "";
        },
        mailingStreetValidationMessage() {
            return this.v$.mailingAddress.mailingStreet.$errors.find((e) => e)?.$message ?? "";
        },
        mailingFloorValidationMessage() {
            return this.v$.mailingAddress.mailingFloor.$errors.find((e) => e)?.$message ?? "";
        },
        mailingUnitValidationMessage() {
            return this.v$.mailingAddress.mailingUnit.$errors.find((e) => e)?.$message ?? "";
        },
        mailingBuildingValidationMessage() {
            return this.v$.mailingAddress.mailingBuilding.$errors.find((e) => e)?.$message ?? "";
        },
        mailingPostalCodeValidationMessage() {
            return this.v$.mailingAddress.mailingPostalCode.$errors.find((e) => e)?.$message ?? "";
        },
        mailingCountryValidationMessage() {
            return this.v$.mailingAddress.mailingCountry.$errors.find((e) => e)?.$message ?? "";
        },
        isValid() {
            return !this.v$.mailingAddress.$invalid;
        },
    },

    methods: {
        haveSameAddressChange() {
            if (this.haveSameAddress === true) this.copyResidentToMailingAddress();
        },

        copyResidentToMailingAddress() {
            console.log("Mailing Address method copyResidentToMailingAddress called...");

            let residentData = this.getSection1D;

            this.mailingAddress.mailingAddressType = residentData.residentAddressType;
            this.mailingAddress.mailingBlk = residentData.residentBlk;
            this.mailingAddress.mailingStreet = residentData.residentStreet;
            this.mailingAddress.mailingFloor = residentData.residentFloor;
            this.mailingAddress.mailingUnit = residentData.residentUnit;
            this.mailingAddress.mailingBuilding = residentData.residentBuilding;
            this.mailingAddress.mailingPostalCode = residentData.residentPostalCode;
            this.mailingAddress.mailingCountry = residentData.residentCountry;
        },
        validateSection() {
            this.v$.$validate();
        },
        populateData() {
            console.log("Mailing Address populateData called...");
            console.log("Mailing Address data (from store): ");
            console.log(JSON.stringify(this.getSection1E, null, 4));

            this.haveSameAddress = this.getSection1E.haveSameAddressWithResident;
            this.mailingAddress = this.getSection1E;
        },
        buildApiData() {
            this.mailingAddress.haveSameAddressWithResident = this.haveSameAddress;
            return PersonalMailingAddressModel.toJsonApi(this.mailingAddress);
        }
    },
    watch: {
        residentAddress: {
            handler() {
                console.log("Mailing Address watch residentAddress called...");
                console.log(
                    `this.haveSameAddress: ${this.haveSameAddress} type ${typeof this
                        .haveSameAddress}`
                );

                if (this.haveSameAddress === true) this.copyResidentToMailingAddress();
            },
            deep: true
        },
        // For testing purpose
        "mailingAddress.mailingAddressType"() {
            console.log("Mailing Address Not required props:");
            console.log(this.notRequiredProps);
        }
    }
};
</script>

<style scoped></style>
