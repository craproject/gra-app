<template>
    <div>
        <!-- Been the subject of an investigation? -->
        <v-radio-group
            v-model="wasSubjectOfInvestigation"
            :error-messages="wasSubjectOfInvestigationValidationMessage"
        >
            <template v-slot:label>
                <span class="required mb-2">
                    Has the Applicant, or its related companies been under investigation or assisted
                    in an investigation by the Commercial Affairs Department, the Inland Revenue
                    Authority of Singapore or any other governmental authority? (Overseas based
                    companies should refer to any investigations by similar government regulatory
                    organisations in their own jurisdictions) <br><br>
                    If yes, provide details.
                </span>
            </template>

            <v-radio value="Yes" label="Yes"></v-radio>
            <v-radio value="No" label="No"></v-radio>
        </v-radio-group>

        <div v-if="wasSubjectOfInvestigation === 'Yes'">
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
                <!-- Date Investigation From -->
                <template v-slot:[`item.investigationFrom`]="{ item }">
                    <span>
                        {{ formatDatetimeTable(item.investigationFrom) }}
                    </span>
                </template>

                <!-- Date Investigation To -->
                <template v-slot:[`item.investigationTo`]="{ item }">
                    <span>
                        {{ formatDatetimeTable(item.investigationTo) }}
                    </span>
                </template>

                <!-- Actions -->
                <template v-slot:[`item.actions`]="{ item, index }">
                    <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>

                    <v-icon small @click="deleteRecord(index)"> mdi-delete </v-icon>
                </template>

                <!-- New button -->
                <!-- <template v-slot:[`body.append`]>
                    <tr style="border-top: none">
                        <td colspan="15" class="pa-0" style="height: 32px">
                            <v-btn block depressed tile @click="addItem"> Add </v-btn>
                        </td>
                    </tr>
                </template> -->
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
                            @click="deleteConfirm(getSection3B.tableName)"
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
                    <!-- Name of Company -->
                    <v-text-field
                        outlined
                        label="Name of Company"
                        v-model="editingItem.name"
                        :counter="100"
                        :error-messages="nameValidationMessage"
                        @input="v$.editingItem.name.$touch"
                        @blur="v$.editingItem.name.$touch"
                    ></v-text-field>

                    <!-- Name of Government Regulatory -->
                    <v-text-field
                        outlined
                        label="Name of Government Regulatory Organisation"
                        v-model="editingItem.governmentOrganization"
                        :counter="100"
                        :error-messages="governmentOrganizationValidationMessage"
                        @input="v$.editingItem.governmentOrganization.$touch"
                        @blur="v$.editingItem.governmentOrganization.$touch"
                    ></v-text-field>

                    <!-- Country of Court or Agency 
                    <v-select
                        outlined
                        label="Country of Court or Agency"
                        :items="countryOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.country"
                        :error-messages="countryValidationMessage"
                        @input="v$.editingItem.country.$touch"
                        @blur="v$.editingItem.country.$touch"
                    ></v-select>-->

                    <!-- Details of Investigation -->
                    <v-textarea
                        v-model="editingItem.detailsOfInvestigation"
                        :counter="300"
                        label="Details of Investigation"
                        :error-messages="detailsOfInvestigationValidationMessage"
                        rows="2"
                        row-height="30"
                        outlined
                        auto-grow
                        @input="v$.editingItem.detailsOfInvestigation.$touch"
                        @blur="v$.editingItem.detailsOfInvestigation.$touch"
                    ></v-textarea>

                    <!-- Outcome -->
                    <v-text-field
                        outlined
                        label="Outcome"
                        v-model="editingItem.outcome"
                        :counter="100"
                        :error-messages="outcomeValidationMessage"
                        @input="v$.editingItem.outcome.$touch"
                        @blur="v$.editingItem.outcome.$touch"
                    ></v-text-field>

                    <!-- Outcome 
                    <v-select
                        outlined
                        label="Outcome"
                        :items="chargeOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.outcome"
                        :error-messages="outcomeValidationMessage"
                        @input="v$.editingItem.outcome.$touch"
                        @blur="v$.editingItem.outcome.$touch"
                        @change="
                            getOptionText(chargeOptions, editingItem.outcome) !== 'Others'
                                ? (editingItem.outcomeOthers = '')
                                : ''
                        "
                    ></v-select>-->

                    <!-- Outcome (If Others) 
                    <v-text-field
                        v-if="getOptionText(chargeOptions, editingItem.outcome) === 'Others'"
                        label="If Others"
                        v-model="editingItem.outcomeOthers"
                        :error-messages="outcomeOthersValidationMessage"
                        class="required"
                        :counter="66"
                        outlined
                        @input="v$.editingItem.outcomeOthers.$touch"
                        @blur="v$.editingItem.outcomeOthers.$touch"
                    ></v-text-field>-->

                    <!-- Investigation period from -->
                    <v-menu
                        ref="investigationFrom"
                        v-model="showInvestigationFrom"
                        :close-on-content-click="false"
                        :return-value.sync="editingItem.investigationFrom"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="investigationFromFormatted"
                                label="Approximate Investigation Period From"
                                outlined
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="investigationFromValidationMessage"
                                @input="v$.editingItem.investigationFrom.$touch()"
                                @blur="v$.editingItem.investigationFrom.$touch()"
                            ></v-text-field>
                        </template>

                        <v-date-picker v-model="editingItem.investigationFrom" no-title scrollable>
                            <v-spacer></v-spacer>

                            <v-btn text color="primary" @click="showInvestigationFrom = false">
                                CANCEL
                            </v-btn>

                            <v-btn
                                text
                                color="primary"
                                @click="$refs.investigationFrom.save(editingItem.investigationFrom)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>

                    <!-- Investigation period to -->
                    <v-menu
                        ref="investigationTo"
                        v-model="showInvestigationTo"
                        :close-on-content-click="false"
                        :return-value.sync="editingItem.investigationTo"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="investigationToFormatted"
                                label="Approximate Investigation period To"
                                outlined
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="investigationToValidationMessage"
                                @input="v$.editingItem.investigationTo.$touch"
                                @blur="v$.editingItem.investigationTo.$touch"
                            ></v-text-field>
                        </template>

                        <v-date-picker v-model="editingItem.investigationTo" no-title scrollable>
                            <v-spacer></v-spacer>

                            <v-btn text color="primary" @click="showInvestigationTo = false">
                                CANCEL
                            </v-btn>

                            <v-btn
                                text
                                color="primary"
                                @click="$refs.investigationTo.save(editingItem.investigationTo)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" @click="cancelItem">CANCEL</v-btn>
                    <v-btn color="primary" @click="saveItem">SAVE</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div v-if="showAlert">
            <p style="color:red;">
                {{ alertMsg }}
            </p>
        </div>
    </div>
</template>

<script>
import useRecordStatus from "@/compositionApi/useRecordStatus";
import optionMixin from "@/mixins/optionMixin";
import { CcipSubjectOfInvestigationModel } from "@/models/CcipSubjectOfInvestigationModel";
import { afterOrEqual } from "@/validations/afterOrEqual";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, requiredIf, helpers } from "@vuelidate/validators";
import { DateTime } from "luxon";
import { mapGetters } from "vuex";
import crudMixin from "@/mixins/crudMixin";

export default {
    name: "SubjectOfInvestigation",
    setup() {
        return {
            v$: useVuelidate(),
            recordStatus: useRecordStatus()
        };
    },
    mixins: [optionMixin, crudMixin],
    data() {
        return {
            wasSubjectOfInvestigation: "",

            // Table
            editingItem: Object.assign({}, new CcipSubjectOfInvestigationModel()),
            subjectOfInvestigationTable: [],
            table:[],

            headers: [
                { value: "name", text: "Name of Company" },
                {
                    value: "governmentOrganization",
                    text: "Name of Government Regulatory Organisation"
                },
                //{ value: "country", text: "Country of Court or Agency" },
                { value: "detailsOfInvestigation", text: "Details of Investigation" },
                //{ value: "wasTestimonyGiven", text: "Was Testimony Given?" },
                //{ value: "dateTestimony", text: "Date Testimony was given" },
                //{ value: "wasCaseConcluded", text: "Case concluded?" },
                { value: "outcome", text: "Outcome" },
                //{ value: "outcomeOthers", text: "If Others" },
                { value: "investigationFrom", text: "Approximate Investigation Period From" },
                { value: "investigationTo", text: "Approximate Investigation Period To" },
                { value: "actions", text: "Actions", sortable: false }
            ],

            // Other controls
            showSubjectOfInvestigationDialog: false,
            alertMsg: "",
            //showDateTestimony: false,
            showInvestigationFrom: false,
            showInvestigationTo: false
        };
    },
    validations() {
        return {
            wasSubjectOfInvestigation: {
                required: helpers.withMessage("This field is mandatory", required)
            },
            editingItem: {
                name: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                governmentOrganization: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                //country: { required: helpers.withMessage("This field is mandatory", required) },
                detailsOfInvestigation: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(300)
                },
                outcome: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },

                investigationFrom: {
                    required: helpers.withMessage("This field is mandatory", required),
                    afterPeriod: helpers.withMessage(
                        '"Investigation period from" must be before "Investigation period to"',
                        () =>
                            afterOrEqual(
                                this.editingItem.investigationFrom,
                                this.editingItem.investigationTo
                            )
                    )
                },
                investigationTo: {
                    required: helpers.withMessage(
                        "This field is mandatory",
                        requiredIf(() => this.editingItem.wasCaseConcluded === "Yes")
                    ),
                    afterPeriod: helpers.withMessage(
                        '"Investigation period to" must be after "Investigation period from"',
                        () =>
                            afterOrEqual(
                                this.editingItem.investigationFrom,
                                this.editingItem.investigationTo
                            )
                    )
                }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection3B"]),

        isValid() {
            return (
                this.wasSubjectOfInvestigation === "No" ||
                (this.wasSubjectOfInvestigation === "Yes" && this.table.length > 0)
            );
        },

        showAlert(){
            return(this.wasSubjectOfInvestigation === "Yes" && this.table.length === 0)
        },

        // Validation messages
        wasSubjectOfInvestigationValidationMessage() {
            return this.v$.wasSubjectOfInvestigation.$errors.find(e => e)?.$message ?? "";
        },
        nameValidationMessage() {
            return this.v$.editingItem.name.$errors.find(e => e)?.$message ?? "";
        },
        governmentOrganizationValidationMessage() {
            return this.v$.editingItem.governmentOrganization.$errors.find(e => e)?.$message ?? "";
        },
        detailsOfInvestigationValidationMessage() {
            return this.v$.editingItem.detailsOfInvestigation.$errors.find(e => e)?.$message ?? "";
        },
        outcomeValidationMessage() {
            return this.v$.editingItem.outcome.$errors.find(e => e)?.$message ?? "";
        },
        outcomeOthersValidationMessage() {
            return this.v$.editingItem.outcomeOthers.$errors.find(e => e)?.$message ?? "";
        },
        investigationFromValidationMessage() {
            return this.v$.editingItem.investigationFrom.$errors.find(e => e)?.$message ?? "";
        },
        investigationToValidationMessage() {
            return this.v$.editingItem.investigationTo.$errors.find(e => e)?.$message ?? "";
        },

        // Date fields
        investigationFromFormatted() {
            return (
                this.editingItem.investigationFrom &&
                DateTime.fromISO(this.editingItem.investigationFrom).toFormat("dd-MM-yyyy")
            );
        },
        investigationToFormatted() {
            return (
                this.editingItem.investigationTo &&
                DateTime.fromISO(this.editingItem.investigationTo).toFormat("dd-MM-yyyy")
            );
        }
    },
    methods: {
        // CRUD actions
        addItem() {
            this.editingItem = new CcipSubjectOfInvestigationModel();
            this.showDialog = true;
        },
        validateSection() {
            this.v$.wasSubjectOfInvestigation.$touch();
        },
        populateData() {
            this.wasSubjectOfInvestigation = this.getSection3B.wasSubjectOfInvestigation;
            this.table = this.getSection3B.subjectOfInvestigationTable == undefined? []: this.getSection3B.subjectOfInvestigationTable;

        },
        buildApiData() {
            let decoratedData = this.recordStatus.setRecordStatus(
                this.getSection3B.subjectOfInvestigationTable,
                this.table
            );

            let data = {
                wasSubjectOfInvestigation: this.wasSubjectOfInvestigation,
                subjectOfInvestigationTable: decoratedData
            };

            return CcipSubjectOfInvestigationModel.toJsonApi(data);
        },
        formatDatetimeTable(item) {
            return item && DateTime.fromISO(item).toFormat("dd-MM-yyyy");
        }
    },
    watch: {
        table: {
            handler() {
                if (this.table) {
                    console.log("length ne: " + this.table.length);
                    if (this.table?.length > 0) {
                        // this.showAlert = false;
                        this.alertMsg = "";
                    } else {
                        // this.showAlert = this.wasSubjectOfInvestigation === "Yes" ? true : false;
                        this.alertMsg = "At least one record must be filled in";
                    }

                } else {
                    // this.showAlert = this.wasSubjectOfInvestigation === "Yes" ? true : false;

                    this.alertMsg = "At least one record must be filled in";
                }

            },
            deep: true
        }
    }
};
</script>

<style scoped></style>
