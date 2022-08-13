<template>
    <div class="row no-gutters">
        <div class="col-12">
            <!-- Type of Entity -->
            <v-select outlined
                      :items="natureEntityOptions"
                      item-text="label"
                      item-value="value"
                      v-model="natureEntity"
                      :error-messages="natureEntityValidationMessage"
                      @change="
                    v$.natureEntity.$touch;
                    updateFieldsRelatedToCitizenType();
                "
                      @blur="v$.entityType.$touch">
                <template v-slot:label>
                    <span class="required">Type of Entity</span>
                </template>
            </v-select>
            
            <!-- Other -->
            <v-text-field outlined
                          v-if="displayForeignIC"
                          v-model="countryIdNumber"
                          :error-messages="countryIdNumberValidationMessage"
                          @input="v$.countryIdNumber.$touch"
                          @blur="v$.countryIdNumber.$touch">
                <template v-slot:label>
                    <span class="required"> Country Identification Number </span>
                </template>
            </v-text-field>
        </div>

        <div class="col-12">
            <!-- Data table -->
            <div v-if="haveOtherCitizenship === 'Yes'">
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
                    class="c-table-bordered mb-3"
                    hide-default-footer
                >
                    <!-- Citizenship -->
                    <template v-slot:[`item.foreignCitizenship`]="{ item }">
                        {{ getOptionText(foreignCitizenshipOptions, item.foreignCitizenship) }}
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
                            <v-btn color="blue darken-1" text @click="deleteConfirm(getSection1BCitizen.tableName)">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </div>

        <!-- Add new -->
        <v-dialog v-model="showDialog" persistent max-width="500px">
           
            <v-card>
                <v-card-title>Details</v-card-title>

                <v-card-text>
                    <!-- Citizenship -->
                    <v-select
                        outlined
                        label="Citizenship"
                        :items="filteredForeignCitizenshipOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.foreignCitizenship"
                        :error-messages="foreignCitizenshipValidationMessage"
                        @input="v$.editingItem.foreignCitizenship.$touch"
                        @blur="v$.editingItem.foreignCitizenship.$touch"
                    ></v-select>

                    <!-- Country-->
                    <v-select
                        outlined
                        label="Country"
                        :items="countryOptions"
                        item-value="value"
                        item-text="label"
                        v-model="editingItem.country"
                        :error-messages="countryValidationMessage"
                        @input="v$.editingItem.country.$touch"
                        @blur="v$.editingItem.country.$touch"
                    ></v-select>

                    <!-- Country Identification Number -->
                    <v-text-field
                        outlined
                        label="Country Identification Number"
                        :items="countryIds"
                        hide-no-data
                        v-model="editingItem.foreignCountryId"
                        :error-messages="foreignCountryIdValidationMessage"
                        @input="v$.editingItem.foreignCountryId.$touch"
                        @input.native="editingItem.foreignCountryId = $event.srcElement.value"
                        @blur="v$.editingItem.foreignCountryId.$touch"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" @click="cancelItem">Cancel</v-btn>
                    <v-btn color="primary" @click="saveItem">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>      
    </div>
</template>

<script>
import useRecordStatus from "@/compositionApi/useRecordStatus";
import optionMixin from "@/mixins/optionMixin";
import crudMixin from "@/mixins/crudMixin";
import { PersonalCitizenshipModel } from "@/models/PersonalCitizenshipModel";
import { nricByType } from "@/validations/nric";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, required } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
    name: "Citizenship",
    mixins: [optionMixin, crudMixin],
    setup() {
        return {
            v$: useVuelidate(),
            recordStatus: useRecordStatus()
        };
    },
    data() {
        return {
            filteredForeignCitizenshipOptions: this.foreignCitizenshipOptions,

            // Table
            editingItem: Object.assign({}, new PersonalCitizenshipModel()),
            citizenshipTable: [],

            headers: [
                { value: "foreignCitizenship", text: "Citizenship" },
                { value: "country", text: "Country" },
                { value: "foreignCountryId", text: "Country Identification Number" },
                { value: "actions", text: "Actions", sortable: false }
            ],

            // Other controls
            showCitizenshipDialog: false,

            // Component data
            citizenshipType: "",
            nric: "",
            countryIdNumber: "",
            haveOtherCitizenship: undefined
        };
    },
    validations() {
        return {
            citizenshipType: { required: helpers.withMessage('This field is mandatory', required)},
            nric: {
                required: helpers.withMessage('This field is mandatory', required),
                nric: helpers.withMessage("Invalid NRIC/FIN", () =>
                    nricByType(
                        this.getOptionText(this.citizenshipTypeOptions, this.citizenshipType),
                        this.nric
                    )
                )
            },
            countryIdNumber: { required: helpers.withMessage('This field is mandatory', required), max: maxLength(20) },
            haveOtherCitizenship: { required: helpers.withMessage('This field is mandatory', required) },

            editingItem: {
                foreignCitizenship: { required: helpers.withMessage('This field is mandatory', required) },
                country: { required: helpers.withMessage('This field is mandatory', required) },
                foreignCountryId: { required: helpers.withMessage('This field is mandatory', required), max: maxLength(20) }
            }
        };
    },
    computed: {
        ...mapGetters(["getCrmId", "getSection1BCitizen"]),

        citizenData() {
            return this.getSection1BCitizen;
        },

        countryIds() {
            let ids = [];

            if (this.countryIdNumber) {
                ids.push(this.countryIdNumber);
            }

            return ids;
        },
        isForeigner() {
            return (
                // 100000001: Permanent Resident
                // 100000002: Work Pass Holder
                // 100000003: Others

                this.getOptionText(this.citizenshipTypeOptions, this.citizenshipType) !==
                "Singapore Citizen"
            );
        },
        displayNRICFIN() {
            let citizenshipType = this.getOptionText(
                this.citizenshipTypeOptions,
                this.citizenshipType
            );

            return (
                // 100000000: Singapore Citizen
                // 100000001: Permanent Resident
                // 100000002: Work Pass Holder
                // 100000003: Others

                // this.citizenshipTypeOptions.some(
                //     c => c.value === this.citizenshipType && c.label === "Singapore Citizen"
                // ) ||
                // this.citizenshipTypeOptions.some(
                //     c => c.value === this.citizenshipType && c.label === "Permanent Resident"
                // ) ||
                // this.citizenshipTypeOptions.some(
                //     c => c.value === this.citizenshipType && c.label === "Work Pass Holder"
                // )

                citizenshipType === "Singapore Citizen" ||
                citizenshipType === "Permanent Resident" ||
                citizenshipType === "Work Pass Holder"
            );
        },
        displayForeignIC() {
            let citizenshipType = this.getOptionText(
                this.citizenshipTypeOptions,
                this.citizenshipType
            );

            return (
                // 100000003: Others

                // this.citizenshipTypeOptions.some(
                // 	c => c.value == this.citizenshipType && c.label === "Others"
                // )

                citizenshipType === "Others"
            );
        },

        // Validation messages
        citizenshipValidationMessage() {
            return this.v$.citizenshipType.$errors.find((e) => e)?.$message ?? "";
        },
        nricValidationMessage() {
            return this.v$.nric.$errors.find((e) => e)?.$message ?? "";
        },
        countryIdNumberValidationMessage() {
            return this.v$.countryIdNumber.$errors.find((e) => e)?.$message ?? "";
        },
        haveOtherCitizenshipValidationMessage() {
            return this.v$.haveOtherCitizenship.$errors.find((e) => e)?.$message ?? "";
        },
        foreignCitizenshipValidationMessage() {
            return this.v$.editingItem.foreignCitizenship.$errors.find((e) => e)?.$message ?? "";
        },
        countryValidationMessage() {
            return this.v$.editingItem.country.$errors.find((e) => e)?.$message ?? "";
        },
        foreignCountryIdValidationMessage() {
            return this.v$.editingItem.foreignCountryId.$errors.find((e) => e)?.$message ?? "";
        },

        isValid() {
            return (
                this.haveOtherCitizenship === "No" ||
                (this.haveOtherCitizenship === "Yes" && this.table.length > 0)
            );
        }
    },
    methods: {
        // CRUD actions
        validateCitizenshipObj() {
            return (
                !this.v$.editingItem.foreignCitizenship.$touch() &&
                !this.v$.editingItem.country.$touch() &&
                !this.v$.editingItem.foreignCountryId.$touch()
            );
        },
        addItem() {
            this.editingItem = new PersonalCitizenshipModel();
            this.showDialog = true;

            this.updateForeignCitizenshipOptions();

            // Auto select foreignCitizenship
            if (this.filteredForeignCitizenshipOptions?.length === 1)
                this.editingItem.foreignCitizenship =
                    this.filteredForeignCitizenshipOptions[0].value;
        },
        // editItem(item) {
        //     this.editingItem = Object.assign({}, item);
        //     this.showCitizenshipDialog = true;
        // },
        // cancelItem() {
        //     Object.assign(this.editingItem, new PersonalCitizenshipModel());
        //     this.showCitizenshipDialog = false;
        //     this.v$.$reset();
        // },
        // deleteItem(item) {
        //     this.citizenshipTable = this.citizenshipTable.filter((i) => i !== item);
        // },
        // saveItem() {
        //     // Validate form
        //     // this.v$.$validate();
        //     this.validateCitizenshipObj();
        //     if (this.v$.editingItem.$invalid) return;

        //     // Get item index
        //     let itemIndex = this.citizenshipTable.findIndex(
        //         (r) => r.rowNo === this.editingItem.rowNo
        //     );

        //     // Update/Insert
        //     if (itemIndex > -1) {
        //         Object.assign(this.citizenshipTable[itemIndex], this.editingItem);
        //     } else {
        //         this.editingItem.rowNo =
        //             parseInt(
        //                 this.citizenshipTable.reduce((max, item) => Math.max(max, item.rowNo), 0)
        //             ) + 1;

        //         this.citizenshipTable.push(this.editingItem);
        //     }

        //     this.showCitizenshipDialog = false;
        //     this.editingItem = new PersonalCitizenshipModel();
        //     this.v$.$reset();
        // },

        // Component methods

        validateSection() {
            this.v$.haveOtherCitizenship.$touch();
        },

        // Filter foreignCitizenshipOptions by citizenshipType
        updateForeignCitizenshipOptions() {
            let citizenshipType = this.getOptionText(
                this.citizenshipTypeOptions,
                this.citizenshipType
            );
            if (citizenshipType === "Singapore Citizen") {
                this.filteredForeignCitizenshipOptions = this.foreignCitizenshipOptions.filter(
                    (c) => c.label !== "Citizen"
                );

                return;
            }

            // These logic can never be reach because User can only input if citizenshipType is "Singapore Citizen"

            // if (this.citizenshipTable.length === 0) {
            //     this.filteredForeignCitizenshipOptions = this.foreignCitizenshipOptions.filter(
            //         (c) => c.label === "Citizen"
            //     );

            //     return;
            // }

            this.filteredForeignCitizenshipOptions = this.foreignCitizenshipOptions;
        },

        buildApiData() {
            // Set record status
            let originalData = this.$store.getters.getSection1BCitizen.citizenshipTable;

            let decoratedCitizens = this.recordStatus.setRecordStatus(
                originalData,
                this.table
            );

            // Collect data
            let citizenshipData = {
                citizenshipType: this.citizenshipType,
                nric: this.nric,
                haveOtherCitizenship: this.haveOtherCitizenship,
                citizenshipTable: decoratedCitizens
            };

            return PersonalCitizenshipModel.toJsonApi(citizenshipData);
        },
        populateData() {
            this.citizenshipType = this.citizenData.citizenshipType;
            this.nric = this.citizenData.nric;
            this.countryIdNumber = this.citizenData.countryIdNumber;
            this.haveOtherCitizenship = this.citizenData.haveOtherCitizenship;
            this.table = this.citizenData.citizenshipTable;
        },
        updateFieldsRelatedToCitizenType() {
            if (this.isForeigner) 
                this.haveOtherCitizenship = "Yes";
            else
                 this.haveOtherCitizenship = "No";

            this.nric = "";
            this.countryIdNumber = "";
            this.table = [];
        }
    },
    watch: {
        // citizenshipType() {
        //     if (this.isForeigner) this.haveOtherCitizenship = "Yes";
        //     console.log("update nric from watch...");
        //
        //     this.nric = "";
        //     this.countryIdNumber = "";
        //     this.citizenshipTable = [];
        // }
        // citizenshipTable() {
        //     this.buildApiData();
        // }
    }
};
</script>

<style scoped></style>
