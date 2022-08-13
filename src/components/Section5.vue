<template>
    <div>
        <h1>1. General Information of Applicant</h1>

        <!-- Retrieve from MyInfo -->
        <v-checkbox name="Sec_1A_Checkbox"
                    v-model="retrieveFromMyInfo"
                    label="Retrieve from MyInfo"
                    class="font-weight-bold checkbox-large">
                    <!--@change="retrieveFromMyInfoChange">-->
        </v-checkbox>
        
        <!-- 1A -->
        <v-subheader class="black--text"></v-subheader>
        <div class="row no-gutters">
            <div class="col-12">
                <div class="sub-section-group">

                    <!-- Name -->
                    <v-row>
                        <v-col>
                            <ValidationProvider vid="A1_Name_of_Applicant"
                                                name="Name of Applicant"
                                                rules="required|max:66"
                                                v-slot="{ errors, valid }">
                                <v-text-field v-model="formData.A1_Name_of_Applicant"
                                              :counter="66"
                                              :error-messages="errors"
                                              :success="valid"
                                              list="names"
                                              class="required"
                                              @input="update"
                                              outlined>
                                    <template v-slot:label>
                                        Name of Applicant
                                    </template>
                                </v-text-field>
                            </ValidationProvider>
                        </v-col>
                    </v-row>

                    <!-- Type of Entity -->
                    <v-row>
                        <v-col>
                            <entityType ref="entityType"></entityType>
                        </v-col>
                    </v-row>

                    <!-- Nature of Entity 
                    <v-row>
                        <v-col>
                            <entityType ref="natureEntity"></entityType>
                        </v-col>
                    </v-row>-->

                    <!-- UEN -->
                    <v-row>
                        <v-col>
                            <ValidationProvider vid="A1_Unique_Entity_Number"
                                                name=" nique Entity Number (UEN)"
                                                rules="required|max:66"
                                                v-slot="{ errors, valid }">
                                <v-text-field v-model="formData.A1_Unique_Entity_Number"
                                              :counter="66"
                                              :error-messages="errors"
                                              :success="valid"
                                              class="required"
                                              @input="update"
                                              outlined>
                                    <template v-slot:label>
                                        Unique Entity Number (UEN)
                                    </template>
                                </v-text-field>
                            </ValidationProvider>
                        </v-col>
                    </v-row>

                    <!-- Date_of_Incorporation -->
                    <v-row>
                        <v-col>
                            <ValidationProvider vid="A1_Date_of_Incorporation"
                                                name="Date of Incorporation"
                                                v-slot="{ errors }">
                                <Datepicker label="Date of Incorporation"
                                            v-model="formData.A1_Date_of_Incorporation"
                                            dateFormat="dd-MM-yyyy"
                                            :errorMessages="errors"
                                            :datePickerProps="{ max: currentDate }"
                                            @input="update"
                                            outlined>
                                </Datepicker>
                            </ValidationProvider>
                        </v-col>
                    </v-row>

                    <!-- Description of Operations -->
                    <v-row>
                        <v-col>
                            <ValidationProvider vid="A1_Description_of_Operations"
                                                name="Description of Operations"
                                                v-slot="{ errors, valid }">
                                <v-textarea v-model="formData.A1_Description_of_Operations"
                                            :counter="255"
                                            :error-messages="errors"
                                            :success="valid"
                                            :class="required"
                                            rows="2"
                                            row-height="30"
                                            auto-grow
                                            @input="update"
                                            outlined>
                                    <template v-slot:label>
                                        <span class="required">Description of Operations</span>
                                    </template>
                                </v-textarea>
                            </ValidationProvider>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>

        <!-- A2 -->
        <v-subheader class="black--text">Registered Business Address of the Applicant</v-subheader>
        <div class="row no-gutters">
            <div class="col-12">
                <div class="sub-section-group">
                    <!-- ZIP / Postal Code -->
                    <v-row>
                        <v-col>
                            <ValidationProvider vid="A2_Zip_Postal"
                                                name="ZIP / Postal Code"
                                                rules="required|numeric|max:9"
                                                v-slot="{ errors, valid }">
                                <v-text-field v-model="formData.A2_Zip_Postal"
                                              :counter="9"
                                              :error-messages="errors"
                                              :success="valid"
                                              class="required"
                                              @input="update"
                                              outlined>
                                    <template v-slot:label>
                                        <span class="required">ZIP / Postal Code</span>
                                    </template>
                                </v-text-field>
                            </ValidationProvider>
                        </v-col>
                    </v-row>

                    <!-- Address -->
                    <v-row>
                        <v-col>
                            <ValidationProvider vid="A2_Address"
                                                name="Address"
                                                rules="required|max:255"
                                                v-slot="{ errors, valid }">
                                <v-textarea v-model="formData.A2_Address"
                                            :counter="255"
                                            :error-messages="errors"
                                            :success="valid"
                                            class="required"
                                            rows="2"
                                            row-height="30"
                                            @input="update"
                                            auto-grow
                                            outlined>
                                    <template v-slot:label>
                                        <span class="required">Address</span>
                                    </template>
                                </v-textarea>
                            </ValidationProvider>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>

        <!-- A3 -->
        <v-subheader class="black--text">Contact Information of the Applicant</v-subheader>
        <div class="sub-section-group">
            <!-- A3_Business_Telephone_Number_Number -->
            <v-row>
                <v-col>
                    <ValidationProvider name="Number"
                                        rules="required|numeric|max:15"
                                        v-slot="{ errors, valid }">
                        <v-text-field v-model="formData.A3_Business_Telephone_Number_Number"
                                      :counter="15"
                                      :error-messages="errors"
                                      :success="valid"
                                      class="required"
                                      @input="update"
                                      outlined>
                            <template v-slot:label>
                                Business Telephone Number
                            </template>
                        </v-text-field>
                    </ValidationProvider>
                </v-col>
            </v-row>

            <!-- A3_Website_Address -->
            <v-row>
                <v-col>
                    <ValidationProvider vid="A3_Website_Address"
                                        name="Website Address"
                                        rules="required|max:40"
                                        v-slot="{ errors, valid }">
                        <v-text-field v-model="formData.A3_Website_Address"
                                      :counter="40"
                                      :error-messages="errors"
                                      :success="valid"
                                      class="required"
                                      @input="update"
                                      outlined>
                            <template v-slot:label>
                                Website Address
                            </template>
                        </v-text-field>
                    </ValidationProvider>
                </v-col>
            </v-row>

            <!-- A3_Email_Address -->
            <v-row>
                <v-col>
                    <ValidationProvider vid="A3_Email_Address"
                                        name="Email Address"
                                        rules="required|email|max:320"
                                        v-slot="{ errors, valid }">
                        <v-text-field v-model="formData.A3_Email_Address"
                                      :counter="320"
                                      :error-messages="errors"
                                      :success="valid"
                                      class="required"
                                      @input="update"
                                      outlined>
                            <template v-slot:label>
                                Email Address
                            </template>
                        </v-text-field>
                    </ValidationProvider>
                </v-col>
            </v-row>

            <!-- A3_Email_Checkbox -->
            <v-row>
                <v-col>
                    <ValidationProvider vid="A3_Email_Checkbox"
                                        name="Email Checkbox"
                                        :rules="{ required: { allowFalse: false } }"
                                        v-slot="{ errors, valid }">
                        <v-checkbox v-model="formData.A3_Email_Checkbox"
                                    :error-messages="errors"
                                    :success="valid"
                                    @change="update">
                            <template v-slot:label>
                                <span class="black--text required">
                                    I understand that the aforementioned email address will be used
                                    for electronic service and that it is my / the Applicant or
                                    Associate's responsibility to update the Authority with any
                                    changes in the electronic service address.
                                </span>
                            </template>
                        </v-checkbox>
                    </ValidationProvider>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script>
import EntityType from "@/components/PersonalData/EntityType";
//import NatureEntity from "@/components/PersonalData/NatureEntity";
import optionMixin from "@/mixins/optionMixin";

import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, required } from "@vuelidate/validators";

import { DateTime } from "luxon";

// import SectionMixin from "./SectionMixin.js";
import { mapGetters } from "vuex";

export default {
    name: "Section1",
    components: {
        EntityType
    },
    mixins: [optionMixin],
    data() {
        return {
            valid: true,
        };
    },
    computed: {
        ...mapGetters(["getSection1", "getMyInfoData"]),

        
    },
    /**methods: {
        async retrieveFromMyInfoChange() {
            let data = this.login;
            console.log("retrieveFromMyInfoChange called...");
            console.log("data.UIN_BRN in section 1: "+data.UIN_BRN);
            if (this.retrieveFromMyInfo === false) return;

            await this.$store.dispatch("retrieveMyInfo", data);
            this.populateData();
        },
        validateSection() {
            // Manual trigger $touch()
            this.v$.name.$touch();
            this.v$.gender.$touch();
            this.v$.dateOfBirth.$touch();
            this.v$.countryOfBirth.$touch();
            this.v$.race.$touch();

            this.$refs.citizenship.validateSection();
            this.$refs.passport.validateSection();
            this.$refs.residentialAddress.validateSection();
            this.$refs.mailingAddress.validateSection();
            this.$refs.contact.validateSection();
            this.$refs.otherName.validateSection();
            this.$refs.characteristic.validateSection();
        },
        populateData() {
            this.retrieveFromMyInfo = this.getSection1.retrieveFromMyInfo;
            this.name = this.getSection1.name;
            this.gender = this.getSection1.gender;

            this.dateOfBirth = this.getSection1.dateOfBirth;
            this.countryOfBirth = this.getSection1.countryOfBirth;

            this.race = this.getSection1.race;

            this.$refs.citizenship.populateData();
            this.$refs.passport.populateData();
            this.$refs.residentialAddress.populateData();
            this.$refs.mailingAddress.populateData();
            this.$refs.contact.populateData();
            this.$refs.otherName.populateData();
            this.$refs.characteristic.populateData();
        },
        buildApiData() {
            return {
                CRM_ID: this.getSection1.crmId,
                Sec_1A_Checkbox: this.retrieveFromMyInfo,
                Sec_1A_Name: this.name, // "Applicant Name",
                Sec_1A_Gender: this.gender,

                ...this.$refs.citizenship.buildApiData(),
                ...this.$refs.passport.buildApiData(),

                Sec_1C_Date_of_Birth: this.dateOfBirth,
                Sec_1C_Country_of_Birth: this.countryOfBirth,

                ...this.$refs.residentialAddress.buildApiData(),
                ...this.$refs.mailingAddress.buildApiData(),
                ...this.$refs.contact.buildApiData(),

                Sec_1G_Race: this.race,

                ...this.$refs.otherName.buildApiData(),
                ...this.$refs.characteristic.buildApiData()
            };
        },

        submit(fromSectionIndex, toSectionIndex) {
            let data = this.buildApiData();
            console.log(data);
            this.$store.dispatch("postAppData", [data, fromSectionIndex, toSectionIndex]);
        }
    }**/
};
</script>

<style scoped></style>

