<template>
    <div>
        <h1>2. Contact Person(s)</h1>
        <!-- <v-alert v-model="showAlert" type="error">{{ alertMsg }}</v-alert> -->

        <!--<v-subheader class="black--text">2A</v-subheader>-->
        <div class="sub-section-group mb-3">
            <!-- President declare instruction -->
            <span class="required mb-2">
                *Limit to 5 records. The first entry will be the main contact person for the
                applicant
            </span>

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
                    :items="contactPersonTable"
                    class="c-table-bordered"
                    hide-default-footer
                >
                    <!-- Salution type -->
                    <template v-slot:[`item.salutation`]="{ item }">
                        {{ getOptionText(salutationTypeOptions, item.salutation) }}
                    </template>

                    <!-- Identification Type -->
                    <template v-slot:[`item.identificationType`]="{ item }">
                        {{ getOptionText(citizenshipTypeOptions, item.identificationType) }}
                    </template>

                    <!-- Country -->
                    <template v-slot:[`item.country`]="{ item }">
                        {{ getOptionText(countryOptions, item.country) }}
                    </template>

                    <!-- Actions -->
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>

                        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>

            <!-- Add new Contact Person -->
            <v-dialog v-model="dialog" persistent max-width="500px">
                <v-card>
                    <v-card-title>Details</v-card-title>

                    <v-card-text>
                        <!-- Salutation type -->
                        <v-select
                            outlined
                            label="Salutation"
                            :items="salutationTypeOptions"
                            item-text="label"
                            item-value="value"
                            v-model="editedItem.salutation"
                        >
                            <template v-slot:label>
                                <span class="required">Salutation</span>
                            </template>
                        </v-select>

                        <!-- Name -->
                        <v-text-field outlined v-model="editedItem.name" label="Name">
                            <template v-slot:label>
                                <span class="required">Name</span>
                            </template>
                        </v-text-field>

                        <!-- Identification Type -->
                        <v-select
                            outlined
                            label="Identification Type"
                            :items="citizenshipTypeOptions"
                            item-text="label"
                            item-value="value"
                            v-model="editedItem.identificationType"
                        >
                            <template v-slot:label>
                                <span class="required">Identification Type</span>
                            </template>
                        </v-select>

                        <!-- Identification Number -->
                        <v-text-field
                            outlined
                            v-model="editedItem.identificationNumber"
                            label="Identification Number"
                        >
                            <template v-slot:label>
                                <span class="required">Identification Number</span>
                            </template>
                        </v-text-field>

                        <!-- Country -->
                        <v-select
                            outlined
                            v-model="editedItem.country"
                            :items="countryOptions"
                            item-value="value"
                            item-text="label"
                            label="Country of Issue"
                        >
                            <template v-slot:label>
                                <span class="required">Country of Issue</span>
                            </template>
                        </v-select>

                        <!-- Position Held -->
                        <v-text-field
                            outlined
                            v-model="editedItem.positionHeld"
                            label="Position Held in Organization"
                        >
                            <template v-slot:label>
                                <span class="required">Position Held in Organization</span>
                            </template>
                        </v-text-field>

                        <!-- Office Phone Number -->
                        <v-text-field
                            outlined
                            v-model="editedItem.officePhoneNumber"
                            label="Office Phone Number"
                        >
                            <template v-slot:label>
                                <span>Office Phone Number</span>
                            </template>
                        </v-text-field>

                        <!-- Mobile Phone Number -->
                        <v-text-field
                            outlined
                            v-model="editedItem.mobilePhoneNumber"
                            label="Mobile Phone Number"
                        >
                            <template v-slot:label>
                                <span class="required">Mobile Phone Number</span>
                            </template>
                        </v-text-field>

                        <!-- Email Address -->
                        <v-text-field outlined v-model="editedItem.email" label="Email Address">
                            <template v-slot:label>
                                <span>Email Address</span>
                            </template>
                        </v-text-field>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                            Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>
<script>
import useRecordStatus from "@/compositionApi/useRecordStatus";
import optionMixin from "@/mixins/optionMixin";
import { afterOrEqual } from "@/validations/afterOrEqual";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, required, requiredIf } from "@vuelidate/validators";
import moment from "moment";
import { ContactPersonModel } from "@/models/ContactPersonModel";
import { mapGetters } from "vuex";
import { DateTime } from "luxon";
//import crudMixin from "@/mixins/crudMixin";

export default {
    name: "Section2",
    setup() {
        return { v$: useVuelidate(), recordStatus: useRecordStatus() };
    },
    mixins: [optionMixin],
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            // Data Table
            headers: [
                { value: "salutation", text: "Salutation" },
                { value: "name", text: "Name" },
                { value: "identificationType", text: "Identification Type" },
                { value: "identificationNumber", text: "Identification Number" },
                { value: "country", text: "Country of Issue" },
                { value: "positionHeld", text: "Position Held in Organisation" },
                { value: "officePhoneNumber", text: "Office Phone Number" },
                { value: "mobilePhoneNumber", text: "Mobile Phone Number" },
                { value: "email", text: "Email Address" },
                { value: "actions", text: "Actions", sortable: false }
            ],

            contactPersonTable: [],
            editedIndex: -1,
            editedItem: Object.assign({}, new ContactPersonModel()),
            defaultItem: Object.assign({}, new ContactPersonModel())
        };
    },
    validations() {
        return {
            validationConfig: {
                $autoDirty: true
            }
        };
    },
    computed: {
        //...mapGetters(["getSection2"]),
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        }
    },

    methods: {
        addItem() {
            this.editedItem = new ContactPersonModel();
            this.dialog = true;
        },
        editItem(item) {
            this.editedIndex = this.contactPersonTable.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.contactPersonTable.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.contactPersonTable.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.contactPersonTable[this.editedIndex], this.editedItem);
            } else {
                this.contactPersonTable.push(this.editedItem);
            }
            this.close();
        }
    }
};
</script>

<style scoped>
.font-size-1rem {
    font-size: 1rem;
}
</style>
