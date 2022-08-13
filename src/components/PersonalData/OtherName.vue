<template>
    <div>
        <v-radio-group v-model="haveOtherNames" :error-messages="haveOtherNamesValidationMessage">
            <template v-slot:label>
                <span class="required">
                    Have you been known by any other name or names (including maiden name, aliases,
                    nicknames, other name changes, legal or otherwise)? If yes, please describe.
                </span>
            </template>

            <v-radio value="Yes" label="Yes"></v-radio>
            <v-radio value="No" label="No"></v-radio>
        </v-radio-group>

        <template  v-if="haveOtherNames === 'Yes'">
                    <div style="text-align:right">
                         <v-btn color="primary" dark class="mb-2" @click="addItem">
                            ADD
                        </v-btn>
                    </div>
                   
        </template>
        <v-data-table
            v-if="haveOtherNames === 'Yes'"
            :headers="headers"
            :items="table"
            class="c-table-bordered"
            hide-default-footer
        >
            <!-- Date From -->
            <template v-slot:[`item.fromPeriod`]="{ item }">
                <span>
                  {{formatDatetimeTable(item.fromPeriod)}}
                </span>
            </template>

             <!-- Date To -->
            <template v-slot:[`item.toPeriod`]="{ item }">
                <span>
                  {{formatDatetimeTable(item.toPeriod)}}
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
                    <v-btn color="blue darken-1" text @click="deleteConfirm(getSection1H.tableName)">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
         <div v-if="showAlert">
                 <p style="color:red;">
                     {{ alertMsg }}
                 </p>
        </div>

        <v-dialog v-model="showDialog" persistent width="350px">
            <v-card>
                <v-card-title>Details</v-card-title>

                <v-alert v-if="errMsg.length > 0" color="warning lighten-4" class="p-2">
                    {{ errMsg }}
                </v-alert>

                <v-card-text>
                    <v-form v-model="isValidEditingOtherName" ref="editingOtherNameForm">
                        <!-- Name -->
                        <v-text-field
                            outlined
                            v-model="editingItem.name"
                            label="Name"
                            :rules="[(value) => !!value || 'This field is mandatory']"
                        ></v-text-field>

                        <!-- From period -->
                        <v-menu
                            ref="fromPeriodMenu"
                            v-model="fromPeriodMenu"
                            :close-on-content-click="false"
                            :return-value.sync="editingItem.fromPeriod"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="dateFromIssueFormatted"
                                    label="From period"
                                    outlined
                                    append-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :rules="[(value) => !!value || 'This field is mandatory']"
                                ></v-text-field>
                            </template>

                            <v-date-picker
                                :allowed-dates="(date) => date <= new Date().toISOString().substr(0, 10)"
                                v-model="editingItem.fromPeriod"
                                type="date"
                                no-title
                                scrollable
                            >
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="fromPeriodMenu = false">
                                    CANCEL
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.fromPeriodMenu.save(editingItem.fromPeriod)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>

                        <!-- To period -->
                        <v-menu
                            ref="toPeriodMenu"
                            v-model="toPeriodMenu"
                            :close-on-content-click="false"
                            :return-value.sync="editingItem.toPeriod"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="dateToIssueFormatted"
                                    label="To period"
                                    outlined
                                    append-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :rules="[(value) => !!value || 'This field is mandatory']"
                                ></v-text-field>
                            </template>

                            <v-date-picker
                                :allowed-dates="(date) => date <= new Date().toISOString().substr(0, 10)"
                                v-model="editingItem.toPeriod"
                                type="date"
                                no-title
                                scrollable
                            >
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="toPeriodMenu = false">
                                    CANCEL
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.toPeriodMenu.save(editingItem.toPeriod)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" @click="cancelItem"> CANCEL </v-btn>

                    <v-btn color="primary" @click="saveItem"> SAVE </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import useRecordStatus from "@/compositionApi/useRecordStatus";
import { PersonalOtherNameModel } from "@/models/PersonalOtherNameModel";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import { DateTime } from "luxon";
import crudMixin from "@/mixins/crudMixin";

export default {
    name: "OtherName",
    mixins: [crudMixin],
    setup() {
        return { v$: useVuelidate(), recordStatus: useRecordStatus() };
    },
    data() {
        return {
            showDialog: false,
            editingAlertMsg: "",

            haveOtherNames: "",
            otherNameTable: [],
            headers: [
                { value: "name", text: "Other Name" },
                { value: "fromPeriod", text: "Date From" },
                { value: "toPeriod", text: "Date To" },
                { value: "actions", text: "Actions", sortable: false }
            ],

            editingItem: Object.assign({}, new PersonalOtherNameModel()),
            errMsg: "",
            alertMsg: "",
            isValidEditingOtherName: false,

            // modal: false,

            fromPeriodMenu: false,
            toPeriodMenu: false
            // date: ""
        };
    },
    validations() {
        return {
            haveOtherNames: { required: helpers.withMessage('This field is mandatory', required), $autoDirty: true },

            editingItem: {
                fromPeriod: { required: helpers.withMessage('This field is mandatory', required) },
                toPeriod: { required: helpers.withMessage('This field is mandatory', required) },
                name: { required: helpers.withMessage('This field is mandatory', required) }
            },
            errMsg: "",
            isValidEditingOtherName: false,

            // modal: false,

            fromPeriodMenu: false,
            toPeriodMenu: false
            // date: ""
        };
    },
    computed: {
        ...mapGetters(["getSection1H"]),

        haveOtherNamesValidationMessage() {
            return this.v$.haveOtherNames.$errors.find((e) => e)?.$message ?? "";
        },
         dateFromIssueFormatted() {
            return (
                this.editingItem.fromPeriod &&
                DateTime.fromISO(this.editingItem.fromPeriod).toFormat("dd-MM-yyyy")
            );
        },
         dateToIssueFormatted() {
            return (
                this.editingItem.toPeriod &&
                DateTime.fromISO(this.editingItem.toPeriod).toFormat("dd-MM-yyyy")
            );
        },
       
        isValid() {
            return (
                this.haveOtherNames === "No" ||
                (this.haveOtherNames === "Yes" && this.table.length > 0)
            );
        },
          showAlert() {
            return this.alertMsg !== "" && this.haveOtherNames === "Yes";
        },
    },
    methods: {
         formatDatetimeTable(item){
             return(
                 item &&
                  DateTime.fromISO(item).toFormat("dd-MM-yyyy")
             );
        },
        addItem() {
            this.editingItem = new PersonalOtherNameModel();
            this.showDialog = true;
        },
        // editItem(item) {
        //     this.editingOtherName = Object.assign({}, item);
        //     this.showDialog = true;
        // },
        // deleteItem(item) {
        //     this.otherNameTable = this.otherNameTable.filter((n) => n !== item);
        // },
        // cancelItem() {
        //     Object.assign(this.editingOtherName, {});
        //     this.showDialog = false;
        // },
        saveItem() {
            // Validate form
            let isValidForm = this.$refs.editingOtherNameForm.validate();
            if (!isValidForm) return;

            let itemIndex = this.table.findIndex(
                (i) => i.rowNo === this.editingItem.rowNo
            );

            // Validate
            // Period must not be in used
            /*let isFromPeriodInUsed = this.isPeriodInUsed(this.editingOtherName.fromPeriod);
            if (isFromPeriodInUsed.value) {
                this.errMsg = isFromPeriodInUsed.msg;

                return;
            }

            let isToPeriodInUsed = this.isPeriodInUsed(this.editingOtherName.toPeriod);
            if (isFromPeriodInUsed.value) {
                this.errMsg = isToPeriodInUsed.msg;

                return;
            }*/

            // toPeriod must be after or equal to fromPeriod
            if (this.editingItem.fromPeriod > this.editingItem.toPeriod) {
                this.errMsg = "To period must be after From period";

                return;
            }

            // Save
            if (itemIndex > -1) {
                Object.assign(this.table[itemIndex], this.editingItem);
            } else {
                this.editingItem.rowNo =
                    parseInt(
                        this.table.reduce((max, item) => Math.max(max, item.rowNo), 0)
                    ) + 1;

                this.table.push(this.editingItem);
            }

            this.table.sort((a, b) => Date.parse(a.fromPeriod) - Date.parse(b.fromPeriod));

            this.editingItem = {};
            this.showDialog = false;
            this.$refs.editingOtherNameForm.resetValidation();
            this.v$.$reset();
        },
        isPeriodInUsed(period) {
            for (let usedPeriod of this.table) {
                if (usedPeriod.fromPeriod < period && period < usedPeriod.toPeriod) {
                    return { value: true, msg: `This period was used by Name: ${usedPeriod.name}` };
                }
            }

            return { value: false, msg: "" };
        },

        validateSection() {
            this.v$.haveOtherNames.$touch();
        },
        populateData() {
            this.haveOtherNames = this.getSection1H.haveOtherNames;
            this.table = this.getSection1H.otherNameTable;
        },
        buildApiData() {
            let originalData = this.getSection1H.otherNameTable;

            let decoratedData = this.recordStatus.setRecordStatus(
                originalData,
                this.table
            );

            let otherNameData = {
                haveOtherNames: this.haveOtherNames,
                otherNameTable: decoratedData
            };

            return PersonalOtherNameModel.toJsonApi(otherNameData);
        }
    },
    watch: {
        "editingItem.fromPeriod": {
            handler() {
                // Validate Currently Staying            
                if (this.editingItem.fromPeriod > this.editingItem.toPeriod)
                    this.errMsg = "To period must be after From period";
                else 
                     this.errMsg = "";
            },
            deep: true
        },
         "editingItem.toPeriod": {
            handler() {
                // Validate Currently Staying            
                if (this.editingItem.fromPeriod > this.editingItem.toPeriod)
                    this.errMsg = "To period must be after From period";
                else 
                     this.errMsg = "";
            },
            deep: true
        },
        table: {
            handler() {
                // Validate Currently Staying            
                console.log("length ne: "+ this.table.length);
                if(this.table.length == 0){
                    this.alertMsg = "This field is mandatory";
                }
                else{
                     this.alertMsg = "";
                }
            },
            deep: true
        },
    }
};
</script>

<style scoped></style>
