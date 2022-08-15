<template>
    <div>
        <div>
            <template>
                <div style="text-align:right">
                    <v-btn color="primary" dark class="mb-2" @click="addItem">
                        ADD
                    </v-btn>
                </div>
            </template>
            <v-data-table
                :headers="headers"
                :items="table"
                class="c-table-bordered"
                hide-default-footer
            >
                <!-- Salution type -->
                <template v-slot:[`item.salutation`]="{ item }">
                    {{ getOptionText(salutationTypeOptions, item.salutation) }}
                </template>

                <!-- Identification Type -->
                <template v-slot:[`item.citizenshipType`]="{ item }">
                    {{ getOptionText(citizenshipTypeOptions, item.citizenshipType) }}
                </template>

                <!-- Country -->
                <template v-slot:[`item.country`]="{ item }">
                    {{ getOptionText(countryOptions, item.country) }}
                </template>

                <!-- Actions -->
                <template v-slot:[`item.actions`]="{ item, index }">
                    <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>

                    <v-icon small @click="deleteRecord(index)"> mdi-delete </v-icon>
                </template>
            </v-data-table>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5"
                        >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteConfirm(getSection2A.tableName)"
                            >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <div v-if="showAlert">
                <p style="color:red;">
                    {{ alertMsg }}
                </p>
            </div>
        </div>

        <!-- Add new -->
        <v-dialog v-model="showDialog" persistent max-width="500px">
            <v-card>
                <v-card-title>Details</v-card-title>

                <v-card-text>
                    <!-- Salutation type -->
                    <v-select
                        outlined
                        label="Salutation"
                        :items="salutationTypeOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.salutation"
                        :error-messages="salutationValidationMessage"
                        @input="v$.editingItem.salutation.$touch"
                        @blur="v$.editingItem.salutation.$touch"
                    ></v-select>

                    <!-- Name -->
                    <v-text-field
                        outlined
                        label="Name"
                        v-model="editingItem.name"
                        :counter="100"
                        :error-messages="nameValidationMessage"
                        @input="v$.editingItem.name.$touch"
                        @blur="v$.editingItem.name.$touch"
                    />

                    <!-- Identification Type -->
                    <!-- <v-select
                        outlined
                        label="Identification Type"
                        :items="citizenshipTypeOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.citizenshipType"
                        :error-messages="citizenshipTypeValidationMessage"
                        @change="v$.editingItem.citizenshipType.$touch;"
                        @blur="v$.editingItem.citizenshipType.$touch"
                    ></v-select> -->
                    <v-select
                        outlined
                        label="Identification Type"
                        :items="citizenshipTypeOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.citizenshipType"
                        :error-messages="citizenshipTypeValidationMessage"
                        @change="clearIdentificationFields"
                        @blur="v$.editingItem.citizenshipType.$touch"
                    ></v-select>
                    <!-- Identification Number -->
                    <v-text-field
                        outlined
                        v-if="
                            editingItem.citizenshipType === '100000000' ||
                                editingItem.citizenshipType === '100000001' ||
                                editingItem.citizenshipType === '100000002'
                        "
                        label="Identification Number"
                        v-model="editingItem.nric"
                        :counter="100"
                        :error-messages="nricValidationMessage"
                        @input="v$.editingItem.nric.$touch"
                        @blur="v$.editingItem.nric.$touch"
                    />

                    <!-- Country Identification Number -->
                    <v-text-field
                        outlined
                        v-if="editingItem.citizenshipType === '100000003'"
                        label="Country Identification Number"
                        v-model="editingItem.countryIdNumber"
                        :counter="100"
                        :error-messages="countryIdNumberValidationMessage"

                    />

                    <!-- Country -->
                    <v-select
                        outlined
                        label="Country of Issue"
                        :items="countryOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.country"
                        :error-messages="countryValidationMessage"
                        @input="v$.editingItem.country.$touch"
                        @blur="v$.editingItem.country.$touch"
                    ></v-select>
                    <!-- Position Held -->
                    <v-text-field
                        outlined
                        label="Position Held in Organisation"
                        v-model="editingItem.positionHeld"
                        :counter="100"
                        :error-messages="positionHeldValidationMessage"
                        @input="v$.editingItem.positionHeld.$touch"
                        @blur="v$.editingItem.positionHeld.$touch"
                    />

                    <!-- Office Phone Number -->
                    <v-text-field
                        outlined
                        label="Office Phone Number"
                        v-model="editingItem.officePhoneNumber"
                        :counter="100"
                        :error-messages="officePhoneNumberValidationMessage"
                        @input="v$.editingItem.officePhoneNumber.$touch"
                        @blur="v$.editingItem.officePhoneNumber.$touch"
                    ></v-text-field>

                    <!-- Mobile Phone Number -->
                    <v-text-field
                        outlined
                        label="Mobile Phone Number"
                        v-model="editingItem.mobilePhoneNumber"
                        :counter="100"
                        :error-messages="mobilePhoneNumberValidationMessage"
                        @input="v$.editingItem.mobilePhoneNumber.$touch"
                        @blur="v$.editingItem.mobilePhoneNumber.$touch"
                    ></v-text-field>

                    <!-- Email -->
                    <v-text-field
                        outlined
                        label="Email Address"
                        v-model="editingItem.email"
                        :counter="100"
                        :error-messages="emailValidationMessage"
                        @input="v$.editingItem.email.$touch"
                        @blur="v$.editingItem.email.$touch"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" @click="cancelItem">CANCEL</v-btn>
                    <v-btn color="primary" @click="saveItem">SAVE</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import useRecordStatus from "@/compositionApi/useRecordStatus";
import optionMixin from "@/mixins/optionMixin";
import { ContactPersonModel } from "@/models/ContactPersonModel";

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
import { nricByType } from "@/validations/nric";
import { DateTime } from "luxon";
import { mapGetters, mapMutations } from "vuex";
import moment from "moment";
import crudMixin from "@/mixins/crudMixin";
import minAge from "@/validations/minAge";
import { SCnricValidator } from "@/validations/uen";

export default {
    name: "ContactPersons",
    setup() {
        return {
            v$: useVuelidate(),
            recordStatus: useRecordStatus()
        };
    },
    mixins: [optionMixin, crudMixin],
    data() {
        return {
            // Table
            editingItem: Object.assign({}, new ContactPersonModel()),
            contactPersonTable: [],
            alertMsg: "",
            showAlert: false,
            headers: [
                { value: "salutation", text: "Salutation" },
                { value: "name", text: "Name" },
                { value: "citizenshipType", text: "Identification Type" },
                { value: "nric", text: "Identification Number" },
                { value: "countryIdNumber", text: "Country Identification Number" },
                { value: "country", text: "Country of Issue" },
                { value: "positionHeld", text: "Position Held in Organisation" },
                { value: "officePhoneNumber", text: "Office Phone Number" },
                { value: "mobilePhoneNumber", text: "Mobile Phone Number" },
                { value: "email", text: "Email Address" },
                { value: "actions", text: "Actions", sortable: false }
            ]
        };
    },
    validations() {
        return {
            editingItem: {
                salutation: { required: helpers.withMessage("This field is mandatory", required) },
                name: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                citizenshipType: {
                    required: helpers.withMessage("This field is mandatory", required)
                },
                nric: {
                    required: helpers.withMessage(
                        "This field is mandatory",
                        requiredIf(function() {
                            return this.editingItem.citizenshipType != "100000003"; // return true if this field is required
                        })
                    ),
                    nric: helpers.withMessage("Invalid NRIC/FIN", () =>
                        SCnricValidator(this.editingItem.nric)
                    )
                    // required: helpers.withMessage("This field is mandatory", required),
                    // nric: helpers.withMessage("Invalid NRIC/FIN", () =>
                    //     nricByType(
                    //         this.getOptionText(
                    //             this.citizenshipTypeOptions,
                    //             this.editingItem.citizenshipType
                    //         ),
                    //         //console.log(this.getOptionText(this.citizenshipTypeOptions, this.editingItem.citizenshipType)),
                    //         this.editingItem.nric
                    //         //console.log(this.editingItem.nric)
                    //     )
                    // )
                },
                countryIdNumber: {
                     required: helpers.withMessage(
                        "This field is mandatory",
                        requiredIf(function() {
                            return this.editingItem.citizenshipType == "100000003"; // return true if this field is required
                        })
                    ),
                //    required: helpers.withMessage("This field is mandatory", required)
                },
                country: { 
                    // required: helpers.withMessage("This field is mandatory", required)
                       required: helpers.withMessage(
                        "This field is mandatory",
                        requiredIf(function() {
                            return this.editingItem.citizenshipType == "100000003"; // return true if this field is required
                        })
                    ),
                     },
                positionHeld: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                officePhoneNumber: {
                    // required: helpers.withMessage("This field is mandatory", required),
                    numeric,
                    max: maxLength(100)
                },
                mobilePhoneNumber: {
                    required: helpers.withMessage("This field is mandatory", required),
                    numeric,
                    max: maxLength(100)
                },
                email: {
                    email: helpers.withMessage("Invalid email address", email),
                    max: maxLength(100)
                }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection2A"]),

        isValid() {
            return this.table.length > 0 && this.table.length < 6;
        },

        // Validation messages
        salutationValidationMessage() {
            return this.v$.editingItem.salutation.$errors.find(e => e)?.$message ?? "";
        },
        nameValidationMessage() {
            return this.v$.editingItem.name.$errors.find(e => e)?.$message ?? "";
        },
        citizenshipTypeValidationMessage() {
            return this.v$.editingItem.citizenshipType.$errors.find(e => e)?.$message ?? "";
        },
        nricValidationMessage() {
            return this.v$.editingItem.nric.$errors.find(e => e)?.$message ?? "";
        },
        countryIdNumberValidationMessage() {
           return this.v$.editingItem.countryIdNumber.$errors.find(e => e)?.$message ?? "";
        },
        countryValidationMessage() {
            return this.v$.editingItem.country.$errors.find(e => e)?.$message ?? "";
        },
        positionHeldValidationMessage() {
            return this.v$.editingItem.positionHeld.$errors.find(e => e)?.$message ?? "";
        },
        officePhoneNumberValidationMessage() {
            return this.v$.editingItem.officePhoneNumber.$errors.find(e => e)?.$message ?? "";
        },
        mobilePhoneNumberValidationMessage() {
            return this.v$.editingItem.mobilePhoneNumber.$errors.find(e => e)?.$message ?? "";
        },
        emailValidationMessage() {
            return this.v$.editingItem.email.$errors.find(e => e)?.$message ?? "";
        }
    },
    methods: {
        ...mapMutations(["setSection2B"]),

        clearIdentificationFields() {
            this.editingItem.nric = "";
            this.editingItem.countryIdNumber = "";
            this.editingItem.country = "";

        },

        // CRUD actions
        addItem() {
            this.editingItem = new ContactPersonModel();
            this.showDialog = true;
        },
        validateSection() {
            //this.v$.haveEverBeenArrested.$touch();
            // this.v$.editingItem.name.$touch();
        },
        populateData() {
            //this.haveEverBeenArrested = this.getSection5A.haveEverBeenArrested;
            this.table =
                this.getSection2A.Sec_2_Yes_Table == undefined
                    ? []
                    : this.getSection2A.Sec_2_Yes_Table;
            // this.contactPersonTable=this.getSection2A.Sec_2_Yes_Table
            console.log("contactPersonTable: ", this.contactPersonTable);
        },
        buildApiData() {
            let decoratedData = this.recordStatus.setRecordStatus(
                this.getSection2A.contactPersonTable,
                this.table
            );

            let contactPersonData = {
                //haveEverBeenArrested: this.haveEverBeenArrested,
                contactPersonTable: decoratedData
            };

            console.log(contactPersonData);

            return ContactPersonModel.toJsonApi(contactPersonData);
        },
        //formatDatetimeTable(item) {
        //    return item && DateTime.fromISO(item).toFormat("dd-MM-yyyy");
        //},
        updateFieldsRelatedToCitizenType() {
            this.editingItem.nric = "";
            this.editingItem.countryIdNumber = "";
        }
    },
    watch: {
        table: {
            handler() {
                // Validate Contact Person Table
                if (this.table) {
                    console.log("length ne: " + this.table.length);
                    if (this.table?.length > 0 && this.table?.length <= 5) {
                        this.showAlert = false;
                        this.alertMsg = "";
                    } else if(this.table?.length ==0) {
                        this.showAlert = true;
                        this.alertMsg = "At least one record must be filled in";
                    }
                    else if(this.table?.length >5) {
                        this.showAlert = true;
                        this.alertMsg = "Limit to 5 records";
                    }

                    //console.log("setSection2A Table 1: " + this.table),
                    //this.$store.commit("setSection2A", this.table);
                    // this.$store.commit("setSection2A", {
                    //     tableName: this.getSection2A.tableName,
                    //     table: this.table
                    // });
                } else {
                    this.showAlert = true;
                    this.alertMsg = "At least one record must be filled in";
                }
            },
            deep: true
        }
    }
};
</script>

<style scoped></style>
