<template>
    <div class="mb-9">
        <h4 class="d-inline">Real Estate</h4>

         <template>
                    <div style="text-align:right">
                         <v-btn color="primary" dark class="mb-2" @click="addItem">
                        ADD
                    </v-btn>
                    </div>
                   
                </template>
        <v-data-table :items="table" :headers="headers" hide-default-footer class="table-bordered">
            <!-- Property Type -->
            <template v-slot:[`item.propertyType`]="{ item }">
                {{ getOptionTextForName(propertyOptions, item.propertyType) }}
            </template>

            <!-- propertyMarketValueSgd -->
            <template v-slot:[`item.propertyMarketValueSgd`]="{ item }">
                {{ numberHelper.toCurrency(item.propertyMarketValueSgd) }}
            </template>

            <!-- Amount -->
            <template v-slot:[`item.propertyAmt`]="{ item }">
                {{ numberHelper.toCurrency(item.propertyAmt) }}
            </template>

            <!-- PropertyOwnershipPercentage -->
            <template v-slot:[`item.propertyOwnershipPercentage`]="{ item }">
                {{ numberHelper.toTwoDecimals(item.propertyOwnershipPercentage) }}
            </template>

            <!-- Actions -->
            <template v-slot:[`item.actions`]="{ item, index }">
                <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>

                <v-icon small @click="deleteRecord(index)"> mdi-delete </v-icon>
               
            </template>

            <template v-slot:[`body.append`]>
                <!-- Subtotal -->
                <tr class="grey lighten-5">
                    <td colspan="4" class="text-right font-weight-bold">Sub Total</td>
                    <td colspan="2">{{ numberHelper.toCurrency(subtotal) }}</td>
                </tr>

                <!-- New button -->
                <!-- <tr style="border-top: none">
                    <td colspan="7" class="pa-0" style="height: 32px">
                        <v-btn block depressed tile @click="addItem"> Add </v-btn>
                    </td>
                </tr> -->
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
                    <v-btn color="blue darken-1" text @click="deleteConfirm(getSection7AssetRealEstate.tableName)">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- New item -->
        <v-dialog v-model="showDialog" persistent width="500px">
            <v-card>
                <v-card-title>Details</v-card-title>

                <v-card-text>
                    <v-select
                        outlined
                        :items="propertyOptions"
                        item-text="name"
                        item-value="value"
                        v-model="editingItem.propertyType"
                        label="Property Type"
                        :error-messages="propertyTypeValidationMessage"
                        @input="v$.editingItem.propertyType.$touch"
                        @blur="v$.editingItem.propertyType.$touch"
                    />

                    <v-currency-field
                        outlined
                        v-model="editingItem.propertyMarketValueSgd"
                        label="Estimated Market Value (SGD)"
                        :error-messages="propertyMarketValueSgdValidationMessage"
                        @input="v$.editingItem.propertyMarketValueSgd.$touch"
                        @blur="v$.editingItem.propertyMarketValueSgd.$touch"
                    />

                    <v-currency-field
                        outlined
                        v-model="editingItem.propertyOwnershipPercentage"
                        label="Ownership %"
                        :error-messages="propertyOwnershipPercentageValidationMessage"
                        @input="v$.editingItem.propertyOwnershipPercentage.$touch"
                        @blur="v$.editingItem.propertyOwnershipPercentage.$touch"
                    />

                    <v-text-field
                        outlined
                        v-model="editingItem.propertyDescription"
                        label="Description"
                        :error-messages="propertyDescriptionValidationMessage"
                        @input="v$.editingItem.propertyDescription.$touch"
                        @blur="v$.editingItem.propertyDescription.$touch"
                    />

                    <v-currency-field
                        outlined
                        v-model="editingItem.propertyAmt"
                        label="Amount (SGD)"
                        :error-messages="propertyAmtValidationMessage"
                        @input="v$.editingItem.propertyAmt.$touch"
                        @blur="v$.editingItem.propertyAmt.$touch"
                        disabled
                    />
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
import { useNumberHelper } from "@/compositionApi/useNumberHelper";
import useRecordStatus from "@/compositionApi/useRecordStatus";
import crudMixin from "@/mixins/crudMixin";
import numberMixin from "@/mixins/numberMixin";
import optionMixin from "@/mixins/optionMixin";
import { AssetRealEstateModel } from "@/models/AssetRealEstateModel";
import useVuelidate from "@vuelidate/core";
import { maxLength, maxValue, minValue, required,helpers } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
    name: "AssetRealEstate",
    mixins: [optionMixin, crudMixin],
    setup() {
        return {
            v$: useVuelidate(),
            recordStatus: useRecordStatus(),
            numberHelper: useNumberHelper()
        };
    },
    data() {
        return {
            headers: [
                { value: "propertyType", text: "Property Type" },
                { value: "propertyMarketValueSgd", text: "Estimated Market Value (SGD)" },
                { value: "propertyOwnershipPercentage", text: "Ownership %" },
                { value: "propertyDescription", text: "Description" },
                { value: "propertyAmt", text: "Amount (SGD)" },
                { value: "actions", text: "Actions", sortable: false }
            ]
        };
    },
    validations() {
        return {
            editingItem: {
                propertyType: { required:helpers.withMessage('This field is mandatory', required) },
                propertyMarketValueSgd: { required:helpers.withMessage('This field is mandatory', required), min: minValue(0) },
                propertyOwnershipPercentage: {
                    required:helpers.withMessage('This field is mandatory', required),
                    min: minValue(0),
                    max: maxValue(100)
                },
                propertyDescription: { required:helpers.withMessage('This field is mandatory', required), max: maxLength(66) },
                propertyAmt: { required:helpers.withMessage('This field is mandatory', required) }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection7AssetRealEstate"]),

        isValid() {
            // return this.table.length > 0;
            return true;
        },

        subtotal() {
            return this.table
                .map((r) => r.propertyAmt)
                .reduce((total, amt) => total + parseFloat(amt), 0);
        },

        // Validation messages
        propertyTypeValidationMessage() {
            return this.v$.editingItem.propertyType.$errors.find((e) => e)?.$message ?? "";
        },
        propertyMarketValueSgdValidationMessage() {
            return (
                this.v$.editingItem.propertyMarketValueSgd.$errors.find((e) => e)?.$message ?? ""
            );
        },
        propertyOwnershipPercentageValidationMessage() {
            return (
                this.v$.editingItem.propertyOwnershipPercentage.$errors.find((e) => e)?.$message ??
                ""
            );
        },
        propertyDescriptionValidationMessage() {
            return this.v$.editingItem.propertyDescription.$errors.find((e) => e)?.$message ?? "";
        },
        propertyAmtValidationMessage() {
            return this.v$.editingItem.propertyAmt.$errors.find((e) => e)?.$message ?? "";
        }
    },
    watch: {
        table: {
            handler() {
                this.$store.commit("setSection7AssetRealEstate", {
                    table: this.table,
                    tableName: this.getSection7AssetRealEstate.tableName,
                    subtotal: this.subtotal
                });
            },
            deep: true
        },

        "editingItem.propertyMarketValueSgd"() {
            if (this.editingItem === {}) return;

            this.editingItem.propertyAmt = this.calRealEstateAmount();
        },
        "editingItem.propertyOwnershipPercentage"() {
            if (this.editingItem === {}) return;

            this.editingItem.propertyAmt = this.calRealEstateAmount();
        }
    },
    methods: {
        calRealEstateAmount() {
            let value =
                this.numberHelper.isNumeric(this.editingItem.propertyMarketValueSgd) &&
                parseFloat(this.editingItem.propertyMarketValueSgd);

            let percent =
                this.numberHelper.isNumeric(this.editingItem.propertyOwnershipPercentage) &&
                parseFloat(this.editingItem.propertyOwnershipPercentage);

            return (value * percent * 0.01).toFixed(2);
        },

        addItem() {
            this.editingItem = new AssetRealEstateModel();
            this.showDialog = true;
        },

        validateSection() {},
        populateData() {
            this.table = this.getSection7AssetRealEstate.table;
        },
        buildApiData() {
            let decoratedData = this.recordStatus.setRecordStatus(
                this.getSection7AssetRealEstate.table,
                this.table
            );
            this.$store.commit("setSection7RealEstateSubTotal", this.subtotal);
            return AssetRealEstateModel.toJsonApi({
                table: decoratedData,
                subtotal: this.subtotal
            });
        }
    }
};
</script>

<style scoped></style>
