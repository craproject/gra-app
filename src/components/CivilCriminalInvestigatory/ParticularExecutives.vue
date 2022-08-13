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

                <!-- Gender -->
                <template v-slot:[`item.gender`]="{ item }">
                    {{ getOptionText(genderOptions, item.gender) }}
                </template>

                <!-- Date of Birth -->
                <template v-slot:[`item.dateOfBirth`]="{ item }">
                    <span>
                        {{ formatDatetimeTable(item.dateOfBirth) }}
                    </span>
                </template>

                <!-- Country of Birth -->
                <template v-slot:[`item.countryOfBirth`]="{ item }">
                    {{ getOptionText(countryOptions, item.countryOfBirth) }}
                </template>

                <!-- Identification Type -->
                <template v-slot:[`item.citizenshipType`]="{ item }">
                    {{ getOptionText(citizenshipTypeOptions, item.citizenshipType) }}
                </template>

                <!-- Country -->
                <template v-slot:[`item.country`]="{ item }">
                    {{ getOptionText(countryOptions, item.country) }}
                </template>

                <!-- Nationality -->
                <template v-slot:[`item.nationality`]="{ item }">
                    {{ getOptionText(countryOptions, item.nationality) }}
                </template>

                <!-- Date of Appointment -->
                <template v-slot:[`item.dateOfAppointment`]="{ item }">
                    <span>
                        {{ formatDatetimeTable(item.dateOfAppointment) }}
                    </span>
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
                            @click="deleteConfirm(getSection4A.tableName)"
                            >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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

                    <!-- Gender -->
                    <v-select
                        outlined
                        label="Gender"
                        :items="genderOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.gender"
                        :error-messages="genderValidationMessage"
                        @input="v$.editingItem.gender.$touch"
                        @blur="v$.editingItem.gender.$touch"
                    ></v-select>

                    <!-- Date of Birth -->
                    <v-menu
                        ref="dateOfBirth"
                        v-model="showDateOfBirth"
                        :close-on-content-click="false"
                        :return-value.sync="editingItem.dateOfBirth"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateOfBirthFormatted"
                                label="Date of Birth"
                                outlined
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="dateOfBirthValidationMessage"
                                @input="v$.editingItem.dateOfBirth.$touch"
                                @blur="v$.editingItem.dateOfBirth.$touch"
                            ></v-text-field>
                        </template>

                        <v-date-picker v-model="editingItem.dateOfBirth" no-title scrollable>
                            <v-spacer></v-spacer>

                            <v-btn text color="primary" @click="showDateOfBirth = false">
                                CANCEL
                            </v-btn>

                            <v-btn
                                text
                                color="primary"
                                @click="$refs.dateOfBirth.save(editingItem.dateOfBirth)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>

                    <!-- Country of Birth -->
                    <v-select
                        outlined
                        label="Country of Birth"
                        :items="countryOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.countryOfBirth"
                        :error-messages="countryOfBirthValidationMessage"
                        @input="v$.editingItem.countryOfBirth.$touch"
                        @blur="v$.editingItem.countryOfBirth.$touch"
                    ></v-select>

                    <!-- Identification Type -->
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

                    <!-- Nationality -->
                    <v-select
                        outlined
                        label="Nationality"
                        :items="countryOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.nationality"
                        :error-messages="nationalityValidationMessage"
                        @input="v$.editingItem.nationality.$touch"
                        @blur="v$.editingItem.nationality.$touch"
                    ></v-select>

                    <!-- Main Contact Number -->
                    <v-text-field
                        outlined
                        label="Main Contact Number"
                        v-model="editingItem.mainContactNumber"
                        :counter="100"
                        :error-messages="mainContactNumberValidationMessage"
                        @input="v$.editingItem.mainContactNumber.$touch"
                        @blur="v$.editingItem.mainContactNumber.$touch"
                    ></v-text-field>

                    <!-- Residential Address -->
                    <v-text-field
                        outlined
                        label="Residential Address"
                        v-model="editingItem.residentialAddress"
                        :error-messages="residentialAddressValidationMessage"
                        @input="v$.editingItem.residentialAddress.$touch"
                        @blur="v$.editingItem.residentialAddress.$touch"
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

                    <!-- If Other 
                    <v-text-field
                        v-if="entityType === '3'"
                        outlined
                        v-model="entityType_other"
                        :counter="100"
                    >
                        <template v-slot:label>
                            <span class="required">If Others</span>
                        </template>
                    </v-text-field>-->

                    <!-- Date of Appointment -->
                    <v-menu
                        ref="dateOfAppointment"
                        v-model="showDateOfAppointment"
                        :close-on-content-click="false"
                        :return-value.sync="editingItem.dateOfAppointment"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateOfAppointmentFormatted"
                                label="Date of Appointment"
                                outlined
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="dateOfAppointmentValidationMessage"
                                @input="v$.editingItem.dateOfAppointment.$touch"
                                @blur="v$.editingItem.dateOfAppointment.$touch"
                            ></v-text-field>
                        </template>

                        <v-date-picker v-model="editingItem.dateOfAppointment" no-title scrollable>
                            <v-spacer></v-spacer>

                            <v-btn text color="primary" @click="showDateOfAppointment = false">
                                CANCEL
                            </v-btn>

                            <v-btn
                                text
                                color="primary"
                                @click="$refs.dateOfAppointment.save(editingItem.dateOfAppointment)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>

                    <!-- Roles and Responsibilities -->
                    <v-textarea
                        v-model="editingItem.roles"
                        label="Roles and Responsibilities"
                        :error-messages="rolesValidationMessage"
                        :counter="100"
                        rows="2"
                        row-height="30"
                        outlined
                        auto-grow
                        @input="v$.editingItem.roles.$touch"
                        @blur="v$.editingItem.roles.$touch"
                    ></v-textarea>

                    <p>
                        Does the Applicant know of any of the following made against this
                        responsible executive?
                    </p>

                    <!-- Any Arrest Made -->
                    <v-radio-group
                        v-model="editingItem.anyArrestMade"
                        :error-messages="anyArrestMadeValidationMessage"
                        @input="v$.editingItem.anyArrestMade.$touch"
                        @blur="v$.editingItem.anyArrestMade.$touch"
                    >
                        <template v-slot:label>
                            <span class="required mb-2">
                                Any Arrest Made
                            </span>
                        </template>

                        <v-radio value="Yes" label="Yes"></v-radio>
                        <v-radio value="No" label="No"></v-radio>
                    </v-radio-group>

                    <!-- Any Criminal Charges -->
                    <v-radio-group
                        v-model="editingItem.anyCriminalCharges"
                        :error-messages="anyCriminalChargesValidationMessage"
                        @input="v$.editingItem.anyCriminalCharges.$touch"
                        @blur="v$.editingItem.anyCriminalCharges.$touch"
                    >
                        <template v-slot:label>
                            <span class="required mb-2">
                                Any Criminal Charges
                            </span>
                        </template>

                        <v-radio value="Yes" label="Yes"></v-radio>
                        <v-radio value="No" label="No"></v-radio>
                    </v-radio-group>

                    <!-- Any Investigation Conducted -->
                    <v-radio-group
                        v-model="editingItem.anyInvestigationConducted"
                        :error-messages="anyInvestigationConductedValidationMessage"
                        @input="v$.editingItem.anyInvestigationConducted.$touch"
                        @blur="v$.editingItem.anyInvestigationConducted.$touch"
                    >
                        <template v-slot:label>
                            <span class="required mb-2">
                                Any investigation conducted or to be conducted on the responsible
                                executive’s affairs, including being asked to provide evidence (e.g.
                                to give a statement to Police)
                            </span>
                        </template>

                        <v-radio value="Yes" label="Yes"></v-radio>
                        <v-radio value="No" label="No"></v-radio>
                    </v-radio-group>
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
import { ParticularExecutiveModel } from "@/models/ParticularExecutiveModel";

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
import { mapGetters } from "vuex";
import moment from "moment";
import crudMixin from "@/mixins/crudMixin";
import minAge from "@/validations/minAge";
import { SCnricValidator } from "@/validations/uen";

export default {
    name: "ParticularExecutives",
    setup() {
        return {
            v$: useVuelidate(),
            recordStatus: useRecordStatus()
        };
    },
    mixins: [optionMixin, crudMixin],
    data() {
        return {
            // Other controls
            showDateOfBirth: false,
            showDateOfAppointment: false,
            // Table
            editingItem: Object.assign({}, new ParticularExecutiveModel()),
            particularExecutiveTable: [],
            table: [],
            headers: [
                { value: "salutation", text: "Salutation" },
                { value: "name", text: "Name" },
                { value: "gender", text: "Gender" },
                { value: "dateOfBirth", text: "Date of Birth" },
                { value: "countryOfBirth", text: "Country of Birth" },
                { value: "citizenshipType", text: "Identification Type" },
                { value: "nric", text: "Identification Number" },
                { value: "countryIdNumber", text: "Country Identification Number" },
                { value: "country", text: "Country of Issue" },
                { value: "nationality", text: "Nationality" },
                { value: "mainContactNumber", text: "Main Contact Number" },
                { value: "residentialAddress", text: "Residential Address" },
                { value: "email", text: "Email Address" },
                { value: "positionHeld", text: "Position Held in Organisation" },
                { value: "dateOfAppointment", text: "Date of Appointment to position" },
                { value: "roles", text: "Roles and Responsibilities" },
                { value: "anyArrestMade", text: "Any Arrest Made" },
                { value: "anyCriminalCharges", text: "Any Criminal Charges" },
                { value: "anyInvestigationConducted", text: "Any Investigation Conducted" },
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
                gender: { required: helpers.withMessage("This field is mandatory", required) },
                dateOfBirth: {
                    required: helpers.withMessage("This field is mandatory", required),
                    age: helpers.withMessage("You must be at least 21 years old.", () =>
                        minAge(this.editingItem.dateOfBirth, 21)
                    )
                },
                countryOfBirth: {
                    required: helpers.withMessage("This field is mandatory", required)
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
                    //         this.editingItem.nric
                    //     )
                    // )
                },
                countryIdNumber: {
                    required: helpers.withMessage(
                        "This field is mandatory",
                        requiredIf(function() {
                            return this.editingItem.citizenshipType == "100000003"; // return true if this field is required
                        })
                    )
                    //    required: helpers.withMessage("This field is mandatory", required)
                },
                country: { required: helpers.withMessage("This field is mandatory", required) },
                nationality: { required: helpers.withMessage("This field is mandatory", required) },
                mainContactNumber: {
                    required: helpers.withMessage("This field is mandatory", required),
                    numeric,
                    max: maxLength(100)
                },
                residentialAddress: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                email: {
                    email: helpers.withMessage("Invalid email address", email),
                    max: maxLength(100)
                },
                positionHeld: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                dateOfAppointment: {
                    required: helpers.withMessage("This field is mandatory", required)
                },
                roles: { max: maxLength(100) },
                anyArrestMade: {
                    required: helpers.withMessage("This field is mandatory", required)
                },
                anyCriminalCharges: {
                    required: helpers.withMessage("This field is mandatory", required)
                },
                anyInvestigationConducted: {
                    required: helpers.withMessage("This field is mandatory", required)
                }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection4A"]),
        isValid() {
            return true;
            // return this.table.length > 0 && this.table.length < 6;
        },
        dateOfBirthFormatted() {
            return (
                this.editingItem.dateOfBirth &&
                DateTime.fromISO(this.editingItem.dateOfBirth).toFormat("dd-MM-yyyy")
            );
        },

        dateOfAppointmentFormatted() {
            return (
                this.editingItem.dateOfAppointment &&
                DateTime.fromISO(this.editingItem.dateOfAppointment).toFormat("dd-MM-yyyy")
            );
        },

        // Validation messages
        salutationValidationMessage() {
            return this.v$.editingItem.salutation.$errors.find(e => e)?.$message ?? "";
        },
        nameValidationMessage() {
            return this.v$.editingItem.name.$errors.find(e => e)?.$message ?? "";
        },
        genderValidationMessage() {
            return this.v$.editingItem.gender.$errors.find(e => e)?.$message ?? "";
        },
        dateOfBirthValidationMessage() {
            return this.v$.editingItem.dateOfBirth.$errors.find(e => e)?.$message ?? "";
        },
        countryOfBirthValidationMessage() {
            return this.v$.editingItem.countryOfBirth.$errors.find(e => e)?.$message ?? "";
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
        //countryIdNumberValidationMessage() {
        //    return this.v$.editingItem.countryIdNumber.$errors.find(e => e)?.$message ?? "";
        //},
        countryValidationMessage() {
            return this.v$.editingItem.country.$errors.find(e => e)?.$message ?? "";
        },
        nationalityValidationMessage() {
            return this.v$.editingItem.nationality.$errors.find(e => e)?.$message ?? "";
        },
        mainContactNumberValidationMessage() {
            return this.v$.editingItem.mainContactNumber.$errors.find(e => e)?.$message ?? "";
        },
        residentialAddressValidationMessage() {
            return this.v$.editingItem.residentialAddress.$errors.find(e => e)?.$message ?? "";
        },
        emailValidationMessage() {
            return this.v$.editingItem.email.$errors.find(e => e)?.$message ?? "";
        },
        positionHeldValidationMessage() {
            return this.v$.editingItem.positionHeld.$errors.find(e => e)?.$message ?? "";
        },
        dateOfAppointmentValidationMessage() {
            return this.v$.editingItem.dateOfAppointment.$errors.find(e => e)?.$message ?? "";
        },
        rolesValidationMessage() {
            return this.v$.editingItem.roles.$errors.find(e => e)?.$message ?? "";
        },
        anyArrestMadeValidationMessage() {
            return this.v$.editingItem.anyArrestMade.$errors.find(e => e)?.$message ?? "";
        },
        anyCriminalChargesValidationMessage() {
            return this.v$.editingItem.anyCriminalCharges.$errors.find(e => e)?.$message ?? "";
        },
        anyInvestigationConductedValidationMessage() {
            return (
                this.v$.editingItem.anyInvestigationConducted.$errors.find(e => e)?.$message ?? ""
            );
        }
    },
    methods: {
        clearIdentificationFields() {
            this.editingItem.nric = "";
            this.editingItem.countryIdNumber = "";
        },
        // CRUD actions
        addItem() {
            this.editingItem = new ParticularExecutiveModel();
            this.showDialog = true;
        },
        validateSection() {
            this.v$.editingItem.name.$touch();
        },
        populateData() {
            //this.haveEverBeenArrested = this.getSection5A.haveEverBeenArrested;
            this.table =
                this.getSection4A.particularExecutiveTable == undefined
                    ? []
                    : this.getSection4A.particularExecutiveTable;
        },
        buildApiData() {
            let decoratedData = this.recordStatus.setRecordStatus(
                this.getSection4A.particularExecutiveTable,
                this.table
            );

            let particularExecutiveData = {
                //haveEverBeenArrested: this.haveEverBeenArrested,
                particularExecutiveTable: decoratedData
            };

            return ParticularExecutiveModel.toJsonApi(particularExecutiveData);
        },
        formatDatetimeTable(item) {
            return item && DateTime.fromISO(item).toFormat("dd-MM-yyyy");
        },
        updateFieldsRelatedToCitizenType() {
            this.editingItem.nric = "";
            this.editingItem.countryIdNumber = "";
        }
    },
    watch: {
        table: {
            handler() {
                //console.log("setSection4A Table 1: " + this.table),
                //this.$store.commit("setSection4A", this.table);
                // this.$store.commit("setSection4A", {
                //     tableName: this.getSection4A.tableName,
                //     table: this.table
                // });
            },
            deep: true
        }
    }
};
</script>

<style scoped></style>
