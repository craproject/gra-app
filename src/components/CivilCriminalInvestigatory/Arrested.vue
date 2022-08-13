<template>
    <div>
        <!-- Have been discharged  class="radio-black"-->
        <v-radio-group
            v-model="haveEverBeenArrested"
            :error-messages="haveEverBeenArrestedValidationMessage"
        >
            <template v-slot:label>
                <span class="required mb-2">
                    Has the entity or any of its subsidiaries, directors, trustees, or officers ever
                    been indicted, charged with or convicted of a criminal or disorderly persons
                    offence or been a party to or named as an unindicted co-conspirator in any
                    criminal proceeding in any jurisdiction? <br /><br />
                    Answer yes even if: <br />
                    (1) the entity, its directors, trustees, or officers did not commit the offence
                    charged; <br />
                    (2) the charges were dismissed; <br />
                    (3) the entity,its directors, trustees, or officers were not convicted; or
                    <br />
                    (4) the charges or offences happened a long time ago.
                </span>
            </template>

            <v-radio value="Yes" label="Yes"></v-radio>
            <v-radio value="No" label="No"></v-radio>
        </v-radio-group>

        <div v-if="haveEverBeenArrested === 'Yes'">
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
                <!-- Date Of Arrest 
                <template v-slot:[`item.dateOfArrest`]="{ item }">
                    <span>
                        {{ formatDatetimeTable(item.dateOfArrest) }}
                    </span>
                </template>-->

                <!-- Date Of Charge -->
                <template v-slot:[`item.dateOfCharge`]="{ item }">
                    <span>
                        {{ formatDatetimeTable(item.dateOfCharge) }}
                    </span>
                </template>

                <!-- Country 
                <template v-slot:[`item.country`]="{ item }">
                    {{ getOptionText(countryOptions, item.country) }}
                </template>-->

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
                            @click="deleteConfirm(getSection3A.tableName)"
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
                    <!-- Name of Case and Docket or Tracking Number -->
                    <v-text-field
                        outlined
                        label="Name of Case and Docket or Tracking Number"
                        v-model="editingItem.nameOfCase"
                        :error-messages="nameOfCaseValidationMessage"
                        @input="v$.editingItem.nameOfCase.$touch"
                        @blur="v$.editingItem.nameOfCase.$touch"
                    />
                    <!-- Date of Charge or Offence -->
                    <v-menu
                        ref="dateOfCharge"
                        v-model="showDateOfCharged"
                        :close-on-content-click="false"
                        :return-value.sync="editingItem.dateOfCharge"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateOfChargeFormatted"
                                label="Date of Charge or Offence"
                                outlined
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="dateOfChargeValidationMessage"
                                @input="v$.editingItem.dateOfCharge.$touch"
                                @blur="v$.editingItem.dateOfCharge.$touch"
                            ></v-text-field>
                        </template>

                        <v-date-picker v-model="editingItem.dateOfCharge" no-title scrollable>
                            <v-spacer></v-spacer>

                            <v-btn text color="primary" @click="showDateOfCharged = false">
                                CANCEL
                            </v-btn>

                            <v-btn
                                text
                                color="primary"
                                @click="$refs.dateOfCharge.save(editingItem.dateOfCharge)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>

                    <!-- Nature of Charge or Offence -->
                    <v-textarea
                        v-model="editingItem.natureOfCharge"
                        label="Nature of Charge or Offence"
                        :error-messages="natureOfChargeValidationMessage"
                        rows="2"
                        row-height="30"
                        outlined
                        auto-grow
                        @input="v$.editingItem.natureOfCharge.$touch"
                        @blur="v$.editingItem.natureOfCharge.$touch"
                    ></v-textarea>

                    <!-- Location of incident 
                    <v-text-field
                        outlined
                        label="Location of incident"
                        v-model="editingItem.location"
                        :error-messages="locationValidationMessage"
                        @input="v$.editingItem.location.$touch"
                        @blur="v$.editingItem.location.$touch"
                    ></v-text-field>-->

                    <!-- Date of Arrest 
                    <v-menu
                        ref="dateOfArrestPicker"
                        v-model="showDateOfArrested"
                        :close-on-content-click="false"
                        :return-value.sync="editingItem.dateOfArrest"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateOfArrestFormatted"
                                label="Date of Arrest"
                                outlined
                                append-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="dateOfArrestValidationMessage"
                                @input="v$.editingItem.dateOfArrest.$touch"
                                @blur="v$.editingItem.dateOfArrest.$touch"
                            ></v-text-field>
                        </template>

                        <v-date-picker v-model="editingItem.dateOfArrest" scrollable no-title>
                            <v-spacer></v-spacer>

                            <v-btn text color="primary" @click="showDateOfArrested = false">
                                CANCEL
                            </v-btn>

                            <v-btn
                                text
                                color="primary"
                                @click="$refs.dateOfArrestPicker.save(editingItem.dateOfArrest)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>-->

                    <!-- Name of Law Enforcement Agency or Court involved -->
                    <v-text-field
                        outlined
                        label="Name of Law Enforcement Agency or Court involved"
                        v-model="editingItem.name"
                        :error-messages="nameValidationMessage"
                        @input="v$.editingItem.name.$touch"
                        @blur="v$.editingItem.name.$touch"
                    />

                    <!-- Address of Law Enforcement Agency or Court involved -->
                    <v-text-field
                        outlined
                        label="Address of Law Enforcement Agency or Court involved"
                        v-model="editingItem.address"
                        :error-messages="addressValidationMessage"
                        @input="v$.editingItem.address.$touch"
                        @blur="v$.editingItem.address.$touch"
                    />

                    <!-- Disposition-->
                    <v-text-field
                        outlined
                        label="Disposition (Acquitted, Convicted, Dismissed, etc)"
                        v-model="editingItem.disposition"
                        :error-messages="dispositionValidationMessage"
                        @input="v$.editingItem.disposition.$touch"
                        @blur="v$.editingItem.disposition.$touch"
                    />

                    <!-- Country of Law Enforcement Agency 
                    <v-select
                        outlined
                        label="Country of Law Enforcement Agency"
                        :items="countryOptions"
                        item-text="label"
                        item-value="value"
                        v-model="editingItem.country"
                        :error-messages="countryValidationMessage"
                        @input="v$.editingItem.country.$touch"
                        @blur="v$.editingItem.country.$touch"
                    ></v-select>-->

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

                    <v-text-field
                        outlined
                        label="Sentence"
                        v-model="editingItem.sentence"
                        :error-messages="sentenceValidationMessage"
                        @input="v$.editingItem.sentence.$touch"
                        @blur="v$.editingItem.sentence.$touch"
                    ></v-text-field>
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
import { CcipArrestedModel } from "@/models/CcipArrestedModel";
import useVuelidate from "@vuelidate/core";
import { maxLength, required, requiredIf, helpers } from "@vuelidate/validators";
import { DateTime } from "luxon";
import { mapGetters, mapMutations } from "vuex";
import moment from "moment";
import crudMixin from "@/mixins/crudMixin";

export default {
    name: "Arrested",
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
            //showDateOfArrested: false,
            showDateOfCharged: false,
            showArrestDialog: false,
            alertMsg: "",
            // showAlert: false,
            // Table
            editingItem: Object.assign({}, new CcipArrestedModel()),
            arrestedTable: [],
            table: [],

            headers: [
                { value: "nameOfCase", text: "Name of Case and Docket or Tracking Number" },
                { value: "dateOfCharge", text: "Date of Charge or Offence" },
                { value: "natureOfCharge", text: "Nature of Charge or Offence" },
                //{ value: "location", text: "Location of incident" },
                //{ value: "dateOfArrest", text: "Date of Arrest" },
                { value: "name", text: "Name of Law Enforcement Agency or Court involved" },
                { value: "address", text: "Address of Law Enforcement Agency or Court involved" },
                //{ value: "country", text: "Country of Law Enforcement Agency" },
                { value: "disposition", text: "Disposition" },
                //{ value: "outcomeOthers", text: "If Others" },
                { value: "sentence", text: "Sentence" },
                { value: "actions", text: "Actions", sortable: false }
            ],

            haveEverBeenArrested: ""
        };
    },
    validations() {
        return {
            haveEverBeenArrested: {
                required: helpers.withMessage("This field is mandatory", required)
            },
            editingItem: {
                nameOfCase: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                natureOfCharge: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                address: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                dateOfCharge: {
                    required: helpers.withMessage("This field is mandatory", required)
                },
                name: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                //country: { required: helpers.withMessage("This field is mandatory", required) },
                disposition: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                },
                sentence: {
                    required: helpers.withMessage("This field is mandatory", required),
                    max: maxLength(100)
                }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection3A"]),

        isValid() {
            return (
                this.haveEverBeenArrested === "No" ||
                (this.haveEverBeenArrested === "Yes" && this.table.length > 0)
            );
        },
        showAlert(){
            return(this.haveEverBeenArrested === "Yes" && this.table.length === 0)
        },

        //dateOfArrestFormatted() {
        //    return (
        //        this.editingItem.dateOfArrest &&
        //        DateTime.fromISO(this.editingItem.dateOfArrest).toFormat("dd-MM-yyyy")
        //    );
        //},
        dateOfChargeFormatted() {
            return (
                this.editingItem.dateOfCharge &&
                DateTime.fromISO(this.editingItem.dateOfCharge).toFormat("dd-MM-yyyy")
            );
        },

        // Validation messages
        haveEverBeenArrestedValidationMessage() {
            return this.v$.haveEverBeenArrested.$errors.find(e => e)?.$message ?? "";
        },
        nameOfCaseValidationMessage() {
            return this.v$.editingItem.nameOfCase.$errors.find(e => e)?.$message ?? "";
        },
        natureOfChargeValidationMessage() {
            return this.v$.editingItem.natureOfCharge.$errors.find(e => e)?.$message ?? "";
        },
        addressValidationMessage() {
            return this.v$.editingItem.address.$errors.find(e => e)?.$message ?? "";
        },
        //dateOfArrestValidationMessage() {
        //    return this.v$.editingItem.dateOfArrest.$errors.find(e => e)?.$message ?? "";
        //},
        dateOfChargeValidationMessage() {
            return this.v$.editingItem.dateOfCharge.$errors.find(e => e)?.$message ?? "";
        },
        nameValidationMessage() {
            return this.v$.editingItem.name.$errors.find(e => e)?.$message ?? "";
        },
        //countryValidationMessage() {
        //    return this.v$.editingItem.country.$errors.find(e => e)?.$message ?? "";
        //},
        dispositionValidationMessage() {
            return this.v$.editingItem.disposition.$errors.find(e => e)?.$message ?? "";
        },
        sentenceValidationMessage() {
            return this.v$.editingItem.sentence.$errors.find(e => e)?.$message ?? "";
        },
        dateFormatted() {
            return this.editingItem.date ? moment(this.editingItem.date).format("DD-MM-YYYY") : "";
        }
    },
    methods: {
        //...mapMutations(["setSection3A"]),

        // CRUD actions
        addItem() {
            this.editingItem = new CcipArrestedModel();
            this.showDialog = true;
        },

        validateSection() {
            this.v$.haveEverBeenArrested.$touch();
        },
        populateData() {
            this.haveEverBeenArrested = this.getSection3A.haveEverBeenArrested;
            // this.table = this.getSection3A.arrestedTable;
            this.table =
                this.getSection3A.arrestedTable == undefined ? [] : this.getSection3A.arrestedTable;
        },
        buildApiData() {
            let decoratedData = this.recordStatus.setRecordStatus(
                this.getSection3A.arrestedTable,
                this.table
            );

            let arrestedData = {
                haveEverBeenArrested: this.haveEverBeenArrested,
                arrestedTable: decoratedData
            };

            return CcipArrestedModel.toJsonApi(arrestedData);
        },
        formatDatetimeTable(item) {
            return item && DateTime.fromISO(item).toFormat("dd-MM-yyyy");
        }
    },
    watch: {
        table: {
            handler() {
                //console.log("Testing 1"),
                //console.log("setSection4A Table 1: " + this.table),
                //this.$store.commit("setSection3A", this.table);
                if (this.table) {
                    console.log("length ne: " + this.table.length);
                    if (this.table?.length > 0) {
                        // this.showAlert = false;
                        this.alertMsg = "";
                    } else {
                        // this.showAlert = this.haveEverBeenArrested === "Yes" ? true : false;
                        this.alertMsg = "At least 1 record must be fill in";
                    }

                    //console.log("setSection2A Table 1: " + this.table),
                    //this.$store.commit("setSection2A", this.table);
                    // this.$store.commit("setSection3A", {
                    //     tableName: this.getSection3A.tableName,
                    //     table: this.table
                    // });
                } else {
                    // this.showAlert = this.haveEverBeenArrested === "Yes" ? true : false;

                    this.alertMsg = "At least 1 record must be fill in";
                }

                // this.$store.commit("setSection3A", {
                //     tableName: this.getSection3A.tableName,
                //     table: this.table
                // });
            },
            deep: true
        }
    }
};
</script>

<style scoped></style>
