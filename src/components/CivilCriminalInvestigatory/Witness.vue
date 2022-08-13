<template>
    <div>
        <!-- Been the witness? -->
        <v-radio-group
            v-model="haveBeenAWitness"
            :error-messages="haveBeenAWitnessValidationMessage"
        >
            <template v-slot:label>
                <span class="required mb-2">
                    i. Have you ever been called to testify, or otherwise been questioned,
                    interviewed, deposed, or requested to take a polygraph exam by any government
                    agency / organisation, court, commission, committee, grand jury or investigative
                    body (local, state, county, provincial, federal, national, etc) in any
                    jurisdiction other than in response to a traffic summon? If yes, please
                    describe.
                </span>
            </template>

            <v-radio value="Yes" label="Yes"></v-radio>
            <v-radio value="No" label="No"></v-radio>
        </v-radio-group>

        <div v-if="haveBeenAWitness === 'Yes'">
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
                <!-- Date Testimony -->
                <template v-slot:[`item.dateTestimony`]="{ item }">
                    <span>
                        {{ formatDatetimeTable(item.dateTestimony) }}
                    </span>
                </template>

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
                <!-- Country -->
                <template v-slot:[`item.country`]="{ item }">
                    {{ getOptionText(countryOptions, item.country) }}
                </template>

                <!-- Was Testimony Given -->
                <template v-slot:[`item.wasTestimonyGiven`]="{ item }">
                    {{ getOptionText(yesNoOptions, item.wasTestimonyGiven) }}
                </template>

                <!-- Case Concluded -->
                <template v-slot:[`item.wasCaseConcluded`]="{ item }">
                    {{ getOptionText(yesNoOptions, item.wasCaseConcluded) }}
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
                            @click="deleteConfirm(getSection5CWitness.tableName)"
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
                    <!-- Name of Court or Agency -->
                    <v-text-field
                        outlined
                        label="Name of Court or Agency"
                        v-model="editingItem.name"
                        :error-messages="nameValidationMessage"
                        @input="v$.editingItem.name.$touch"
                        @blur="v$.editingItem.name.$touch"
                    ></v-text-field>

                    <!-- Country of Court or Agency -->
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
                    ></v-select>

                    <!-- Nature of Proceeding or Investigation -->
                    <v-textarea
                        v-model="editingItem.natureOfProceeding"
                        label="Nature of Proceeding or Investigation"
                        :error-messages="natureOfProceedingValidationMessage"
                        :counter="100"
                        class="required"
                        rows="2"
                        row-height="30"
                        outlined
                        auto-grow
                        @input="v$.editingItem.natureOfProceeding.$touch"
                        @blur="v$.editingItem.natureOfProceeding.$touch"
                    ></v-textarea>

                    <!-- Was Testimony Given? -->
                    <v-select
                        outlined
                        label="Was Testimony Given?"
                        :items="yesNoOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.wasTestimonyGiven"
                        :error-messages="wasTestimonyGivenValidationMessage"
                        @input="v$.editingItem.wasTestimonyGiven.$touch"
                        @blur="v$.editingItem.wasTestimonyGiven.$touch"
                    ></v-select>

                    <!-- Date Testimony was given -->
                    <v-menu
                        ref="dateTestimony"
                        v-model="showDateTestimony"
                        :close-on-content-click="false"
                        :return-value.sync="editingItem.dateTestimony"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateTestimonyFormatted"
                                label="Date Testimony was given"
                                outlined
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="dateTestimonyValidationMessage"
                                @input="v$.editingItem.dateTestimony.$touch"
                                @blur="v$.editingItem.dateTestimony.$touch"
                            ></v-text-field>
                        </template>

                        <v-date-picker v-model="editingItem.dateTestimony" no-title scrollable>
                            <v-spacer></v-spacer>

                            <v-btn text color="primary" @click="showDateTestimony = false">
                                CANCEL
                            </v-btn>

                            <v-btn
                                text
                                color="primary"
                                @click="$refs.dateTestimony.save(editingItem.dateTestimony)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>

                    <!-- Case concluded? -->
                    <v-select
                        outlined
                        label="Case concluded?"
                        messages='*If unsure, please indicate "No"'
                        :items="yesNoOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.wasCaseConcluded"
                        :error-messages="wasCaseConcludedValidationMessage"
                        @input="v$.editingItem.wasCaseConcluded.$touch"
                        @blur="v$.editingItem.wasCaseConcluded.$touch"
                        @change="clearInput"
                        persistent-hint
                        hint='*If unsure, please indicate "No"'
                    >
                    </v-select>

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
                                label="Investigation period from"
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
                        v-if="editingItem.wasCaseConcluded === 'Yes'"
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
                                label="Investigation period to"
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
    </div>
</template>

<script>
import useRecordStatus from "@/compositionApi/useRecordStatus";
import { getOptions } from "@/data/optionData";
import optionMixin from "@/mixins/optionMixin";
import { CcipBeenAWitnessModel } from "@/models/CcipBeenAWitnessModel";
import { afterOrEqual } from "@/validations/afterOrEqual";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, requiredIf, helpers } from "@vuelidate/validators";
import { DateTime } from "luxon";
import { mapGetters } from "vuex";
import crudMixin from "@/mixins/crudMixin";

export default {
    name: "Witness",
    setup() {
        return {
            v$: useVuelidate(),
            recordStatus: useRecordStatus()
        };
    },
    mixins: [optionMixin, crudMixin],
    data() {
        return {
            haveBeenAWitness: "",

            // Table
            editingItem: Object.assign({}, new CcipBeenAWitnessModel()),
            beenAWitnessTable: [],

            headers: [
                { value: "name", text: "Name of Court or Agency" },
                { value: "country", text: "Country of Court or Agency" },
                { value: "natureOfProceeding", text: "Nature of Proceeding or Investigation" },
                { value: "wasTestimonyGiven", text: "Was Testimony Given?" },
                { value: "dateTestimony", text: "Date Testimony was given" },
                { value: "wasCaseConcluded", text: "Case concluded?" },
                { value: "investigationFrom", text: "Investigation period from" },
                { value: "investigationTo", text: "Investigation period to" },
                { value: "actions", text: "Actions", sortable: false }
            ],

            // Other controls
            showSubjectOfInvestigationDialog: false,
            showDateTestimony: false,
            showInvestigationFrom: false,
            showInvestigationTo: false
        };
    },
    validations() {
        return {
            haveBeenAWitness: {
                required: helpers.withMessage("This field is mandatory", required)
            },
            editingItem: {
                name: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(66)
                },
                country: { required: helpers.withMessage("This field is mandatory", required) },
                natureOfProceeding: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                wasTestimonyGiven: {},
                dateTestimony: {},
                wasCaseConcluded: {
                    required: helpers.withMessage("This field is mandatory", required)
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
        ...mapGetters(["getSection5CWitness"]),

        isValid() {
            return (
                this.haveBeenAWitness === "No" ||
                (this.haveBeenAWitness === "Yes" && this.table.length > 0)
            );
        },

        // Validation messages
        haveBeenAWitnessValidationMessage() {
            return this.v$.haveBeenAWitness.$errors.find(e => e)?.$message ?? "";
        },
        nameValidationMessage() {
            return this.v$.editingItem.name.$errors.find(e => e)?.$message ?? "";
        },
        countryValidationMessage() {
            return this.v$.editingItem.country.$errors.find(e => e)?.$message ?? "";
        },
        natureOfProceedingValidationMessage() {
            return this.v$.editingItem.natureOfProceeding.$errors.find(e => e)?.$message ?? "";
        },
        wasTestimonyGivenValidationMessage() {
            return this.v$.editingItem.wasTestimonyGiven.$errors.find(e => e)?.$message ?? "";
        },
        dateTestimonyValidationMessage() {
            return this.v$.editingItem.dateTestimony.$errors.find(e => e)?.$message ?? "";
        },
        wasCaseConcludedValidationMessage() {
            return this.v$.editingItem.wasCaseConcluded.$errors.find(e => e)?.$message ?? "";
        },
        investigationFromValidationMessage() {
            return this.v$.editingItem.investigationFrom.$errors.find(e => e)?.$message ?? "";
        },
        investigationToValidationMessage() {
            return this.v$.editingItem.investigationTo.$errors.find(e => e)?.$message ?? "";
        },

        // Date fields
        dateTestimonyFormatted() {
            return (
                this.editingItem.dateTestimony &&
                DateTime.fromISO(this.editingItem.dateTestimony).toFormat("dd-MM-yyyy")
            );
        },
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
            this.editingItem = new CcipBeenAWitnessModel();
            this.showDialog = true;
        },
        // editItem(item) {
        //     this.editingItem = Object.assign({}, item);
        //     this.showSubjectOfInvestigationDialog = true;
        // },
        // cancelItem() {
        //     Object.assign(this.editingItem, new CcipBeenAWitnessModel());
        //     this.showSubjectOfInvestigationDialog = false;
        //     this.v$.$reset();
        // },
        // deleteItem(item) {
        //     this.beenAWitnessTable = this.beenAWitnessTable.filter((i) => i !== item);
        // },
        // saveItem() {
        //     // Validate form
        //     this.v$.$validate();
        //     if (this.v$.editingItem.$invalid) return;

        //     // Get item index
        //     let itemIndex = this.beenAWitnessTable.findIndex(
        //         (r) => r.rowNo === this.editingItem.rowNo
        //     );

        //     // Update/Insert
        //     if (itemIndex > -1) {
        //         Object.assign(this.beenAWitnessTable[itemIndex], this.editingItem);
        //     } else {
        //         this.editingItem.rowNo =
        //             parseInt(
        //                 this.beenAWitnessTable.reduce((max, item) => Math.max(max, item.rowNo), 0)
        //             ) + 1;

        //         this.beenAWitnessTable.push(this.editingItem);
        //     }

        //     this.showSubjectOfInvestigationDialog = false;
        //     this.editingItem = new CcipBeenAWitnessModel();
        //     this.v$.$reset();
        // },

        validateSection() {
            this.v$.haveBeenAWitness.$touch();
        },
        populateData() {
            this.haveBeenAWitness = this.getSection5CWitness.haveBeenAWitness;
            this.table = this.getSection5CWitness.beenAWitnessTable;
        },
        buildApiData() {
            let decoratedData = this.recordStatus.setRecordStatus(
                this.getSection5CWitness.beenAWitnessTable,
                this.table
            );

            let data = {
                haveBeenAWitness: this.haveBeenAWitness,
                beenAWitnessTable: decoratedData
            };

            return CcipBeenAWitnessModel.toJsonApi(data);
        },
        formatDatetimeTable(item) {
            return item && DateTime.fromISO(item).toFormat("dd-MM-yyyy");
        },
        clearInput() {
            if (this.editingItem.wasCaseConcluded === "No") {
                this.editingItem.investigationTo = "";
            }
        }
    }
};
</script>

<style scoped></style>
