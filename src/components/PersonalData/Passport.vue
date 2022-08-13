<template>
    <div>
        <!-- Have issued with a passport -->
        <v-radio-group
            v-model="haveBeenIssuedPassport"
            :error-messages="haveBeenIssuedPassportValidationMessage"
        >
            <template v-slot:label>
                <span class="required mb-2">
                    Have you ever been issued with a passport? If yes, please describe.
                </span>
            </template>

            <v-radio value="Yes" label="Check this box to add fields"></v-radio>
            <v-radio value="No" label="Not Applicable"></v-radio>
        </v-radio-group>

        <div v-if="haveBeenIssuedPassport === 'Yes'">
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
                <!-- Date of Issue -->
                <template v-slot:[`item.dateOfIssue`]="{ item }">
                    <span>
                    {{formatDatetimeTable(item.dateOfIssue)}}
                    </span>
                </template>

                <!-- Expiry Date -->
                <template v-slot:[`item.expiryDate`]="{ item }">
                    <span>
                    {{formatDatetimeTable(item.expiryDate)}}
                    </span>
                </template>

                <!-- countryOfIssue -->
                <template v-slot:[`item.countryOfIssue`]="{ item }">
                    {{ getOptionText(countryOptions, item.countryOfIssue) }}
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
                        <v-btn color="blue darken-1" text @click="deleteConfirm(getSection1BPassport.tableName)">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Add new -->
            <v-dialog
                v-if="showDialog"
                v-model="showDialog"
                persistent
                max-width="500px"
            >
                <v-card>
                    <v-card-title>Details</v-card-title>

                    <v-card-text>
                        <!-- Passport Number -->
                        <v-text-field
                            outlined
                            label="Passport Number"
                            v-model="editingItem.passportNumber"
                            :error-messages="passportNumberValidationMessage"
                            @input="v$.editingItem.passportNumber.$touch"
                            @blur="v$.editingItem.passportNumber.$touch"
                        ></v-text-field>

                        <!-- Name on Passport -->
                        <v-text-field
                            outlined
                            label="Name on Passport"
                            v-model="editingItem.nameOnPassport"
                            :error-messages="nameOnPassportValidationMessage"
                            @input="v$.editingItem.nameOnPassport.$touch"
                            @blur="v$.editingItem.nameOnPassport.$touch"
                        ></v-text-field>

                        <!-- Country of Issue -->
                        <v-select
                            outlined
                            label="Country of Issue"
                            :items="countryOptions"
                            item-value="value"
                            item-text="label"
                            v-model="editingItem.countryOfIssue"
                            :error-messages="countryOfIssueValidationMessage"
                            @input="v$.editingItem.countryOfIssue.$touch"
                            @blur="v$.editingItem.countryOfIssue.$touch"
                        ></v-select>

                        <!-- Place of Issue -->
                        <v-text-field
                            outlined
                            label="Place of Issue"
                            v-model="editingItem.placeOfIssue"
                            :error-messages="placeOfIssueValidationMessage"
                            @input="v$.editingItem.placeOfIssue.$touch"
                            @blur="v$.editingItem.placeOfIssue.$touch"
                        ></v-text-field>

                        <!-- Date of Issue -->
                        <v-menu
                            ref="dateOfIssue"
                            v-model="showDateOfIssue"
                            :close-on-content-click="false"
                            :return-value.sync="editingItem.dateOfIssue"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="dateOfIssueFormatted"
                                    label="Date Of Issue"
                                    outlined
                                    append-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :error-messages="dateOfIssueValidationMessage"
                                    @input="v$.editingItem.dateOfIssue.$touch"
                                    @blur="v$.editingItem.dateOfIssue.$touch"
                                ></v-text-field>
                            </template>

                            <v-date-picker v-model="editingItem.dateOfIssue" scrollable no-title>
                                <v-spacer></v-spacer>

                                <v-btn text color="primary" @click="showDateOfIssue = false">
                                    Cancel
                                </v-btn>

                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dateOfIssue.save(editingItem.dateOfIssue)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>

                        <!-- Expiry Date -->
                        <v-menu
                            ref="expiryDate"
                            v-model="showExpiryDate"
                            :close-on-content-click="false"
                            :return-value.sync="editingItem.expiryDate"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="expiryDateFormatted"
                                    label="Expiry Date"
                                    outlined
                                    append-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :error-messages="expiryDateValidationMessage"
                                    @input="v$.editingItem.expiryDate.$touch"
                                    @blur="v$.editingItem.expiryDate.$touch"
                                ></v-text-field>
                            </template>

                            <v-date-picker v-model="editingItem.expiryDate" scrollable no-title>
                                <v-spacer></v-spacer>

                                <v-btn text color="primary" @click="showExpiryDate = false">
                                    Cancel
                                </v-btn>

                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.expiryDate.save(editingItem.expiryDate)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn color="primary" @click="cancelItem">Cancel</v-btn>
                        <v-btn color="primary" @click="saveItem">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import useRecordStatus from "@/compositionApi/useRecordStatus";
import optionMixin from "@/mixins/optionMixin";
import crudMixin from "@/mixins/crudMixin";
import PersonalPassportModel from "@/models/PersonalPassportModel";
import { afterOrEqual } from "@/validations/afterOrEqual";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, required } from "@vuelidate/validators";
import { DateTime } from "luxon";
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "Passport",
    setup() {
        return {
            v$: useVuelidate(),
            recordStatus: useRecordStatus()
        };
    },
    mixins: [optionMixin,crudMixin],
    data() {
        return {
            haveBeenIssuedPassport: "",

            // Table
            editingItem: Object.assign({}, new PersonalPassportModel()),
            passportTable: [],

            headers: [
                { value: "passportNumber", text: "Passport Number" },
                { value: "nameOnPassport", text: "Name on Passport" },
                { value: "countryOfIssue", text: "Country of Issue" },
                { value: "placeOfIssue", text: "Place of Issue" },
                { value: "dateOfIssue", text: "Date of Issue" },
                { value: "expiryDate", text: "Expiry Date" },
                { value: "actions", text: "Actions", sortable: false }
            ],

            // Other controls
            showPassportDialog: false,
            showDateOfIssue: false,
            showExpiryDate: false
        };
    },
    validations() {
        return {
            haveBeenIssuedPassport: { required: helpers.withMessage('This field is mandatory', required) },
            editingItem: {
                passportNumber: { required: helpers.withMessage('This field is mandatory', required), max: maxLength(20) },
                nameOnPassport: { required: helpers.withMessage('This field is mandatory', required), max: maxLength(66) },
                countryOfIssue: { required: helpers.withMessage('This field is mandatory', required) },
                placeOfIssue: { required: helpers.withMessage('This field is mandatory', required), max: maxLength(30) },
                dateOfIssue: {
                    required:helpers.withMessage('This field is mandatory', required),
                    afterPeriod: helpers.withMessage(
                        '"Date of Issue" must be before "Expiry Date"',
                        () =>
                            afterOrEqual(this.editingItem.dateOfIssue, this.editingItem.expiryDate)
                    )
                },
                expiryDate: {
                    required: helpers.withMessage('This field is mandatory', required),
                    afterPeriod: helpers.withMessage(
                        '"Expiry Date" must be after "Date of Issue"',
                        () =>
                            afterOrEqual(this.editingItem.dateOfIssue, this.editingItem.expiryDate)
                    )
                }
            }
        };
    },
    computed: {
        ...mapGetters(["getCrmId", "getSection1BPassport", "getSection1D"]),

        names() {
            let name = this.getSection1D.name;

            return name ? [name] : [];
        },
        haveBeenIssuedPassportValidationMessage() {
            return this.v$.haveBeenIssuedPassport?.$errors.find((e) => e)?.$message ?? "";
        },

        dateOfIssueFormatted() {
            return (
                this.editingItem.dateOfIssue &&
                DateTime.fromISO(this.editingItem.dateOfIssue).toFormat("dd-MM-yyyy")
            );
        },
        expiryDateFormatted() {
            return (
                this.editingItem.expiryDate &&
                DateTime.fromISO(this.editingItem.expiryDate).toFormat("dd-MM-yyyy")
            );
        },

        isValid() {
            return (
                this.haveBeenIssuedPassport === "No" ||
                (this.haveBeenIssuedPassport === "Yes" && this.table.length > 0)
            );
        },

        // Validation messages
        passportNumberValidationMessage() {
            return this.v$.editingItem.passportNumber?.$errors.find(e => e)?.$message ?? "";

            // return this.getFirstError("passportNumber");
        },
        nameOnPassportValidationMessage() {
            return this.v$.editingItem.nameOnPassport?.$errors.find((e) => e)?.$message ?? "";
        },
        countryOfIssueValidationMessage() {
            return this.v$.editingItem.countryOfIssue?.$errors.find((e) => e)?.$message ?? "";
        },
        placeOfIssueValidationMessage() {
            return this.v$.editingItem.placeOfIssue?.$errors.find((e) => e)?.$message ?? "";
        },
        dateOfIssueValidationMessage() {
            return this.v$.editingItem.dateOfIssue?.$errors.find((e) => e)?.$message ?? "";
        },
        expiryDateValidationMessage() {
            return this.v$.editingItem.expiryDate?.$errors.find((e) => e)?.$message ?? "";
        }
    },
    watch: {
        // haveBeenIssuedPassport() {
        //     this.setSection1BPassportJson(this.buildApiData());
        // },
        // passportTable() {
        //     this.setSection1BPassportJson(this.buildApiData());
        // }
    },
    methods: {
        // ...mapMutations(["setSection1BPassportJson"]),
         formatDatetimeTable(item){
             return(
                 item &&
                  DateTime.fromISO(item).toFormat("dd-MM-yyyy")
             );
        },

        getFirstError(propName) {
            return this.v$.editingItem[propName]?.$errors.find((e) => e)?.$message ?? "";
        },

        // CRUD actions
        addItem() {
            this.editingItem = new PersonalPassportModel();

            this.showDialog = true;
        },
        // editItem(item) {
        //     this.editingItem = Object.assign({}, item);
        //     this.showPassportDialog = true;
        // },
        // cancelItem() {
        //     Object.assign(this.editingItem, new PersonalPassportModel());
        //     this.showPassportDialog = false;
        //     this.v$.$reset();
        // },
        // deleteItem(item) {
        //     this.passportTable = this.passportTable.filter((i) => i !== item);
        // },
        // saveItem() {
        //     // Validate form
        //     this.v$.$validate();
        //     if (this.v$.editingItem.$invalid) return;

        //     // Get item index
        //     let itemIndex = this.passportTable.findIndex((r) => r.rowNo === this.editingItem.rowNo);

        //     // Update/Insert
        //     if (itemIndex > -1) {
        //         Object.assign(this.passportTable[itemIndex], this.editingItem);
        //     } else {
        //         this.editingItem.rowNo =
        //             parseInt(
        //                 this.passportTable.reduce((max, item) => Math.max(max, item.rowNo), 0)
        //             ) + 1;

        //         this.passportTable.push(this.editingItem);
        //     }

        //     this.showPassportDialog = false;
        //     this.editingItem = new PersonalPassportModel();
        //     this.v$.$reset();
        // },

        validateSection() {
            this.v$.haveBeenIssuedPassport.$touch();
        },
        populateData() {
            this.haveBeenIssuedPassport = this.getSection1BPassport.haveBeenIssuedPassport;
            this.table = this.getSection1BPassport.passportTable;
        },
        buildApiData() {
            let originalData = this.getSection1BPassport.passportTable;
            let decoratedData = this.recordStatus.setRecordStatus(originalData, this.table);

            let passportData = {
                haveBeenIssuedPassport: this.haveBeenIssuedPassport,
                passportTable: decoratedData
            };

            return PersonalPassportModel.toJsonApi(passportData);
        }
    }
};
</script>

<style scoped></style>
