<template>
    <div class="mb-9">
        <h4>Investment</h4>

         <template>
                    <div style="text-align:right">
                         <v-btn color="primary" dark class="mb-2" @click="addItem">
                        ADD
                    </v-btn>
                    </div>
                   
                </template>
        <v-data-table
            :items="table"
            :headers="headers"
            hide-default-footer
            class="c-table-bordered mb-3"
        >
            <!-- investmentAmt -->
            <template v-slot:[`item.investmentAmt`]="{ item }">
                {{ numberHelper.toCurrency(item.investmentAmt) }}
            </template>

            <!-- Actions -->
            <template v-slot:[`item.actions`]="{ item, index }">
                <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>

                <v-icon small @click="deleteRecord(index)"> mdi-delete </v-icon>
               
            </template>

            <template v-slot:[`body.append`]>
                <!-- SubTotal -->
                <tr class="grey lighten-5">
                    <td colspan="2" class="text-right font-weight-bold">Sub Total</td>
                    <td colspan="2">{{ numberHelper.toCurrency(subtotal) }}</td>
                </tr>

                <!-- New button -->
                <!-- <tr style="border-top: none">
                    <td colspan="4" class="pa-0" style="height: 32px">
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
                    <v-btn color="blue darken-1" text @click="deleteConfirm(getSection7AssetInvestment.tableName)">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- New Investment -->
        <v-dialog v-model="showDialog" persistent width="500px">
            <v-card>
                <v-card-title>Details</v-card-title>

                <v-card-text>
                    <v-text-field
                        outlined
                        v-model="editingItem.investmentType"
                        label="Investment Type"
                        :error-messages="investmentTypeValidationMessage"
                        @input="v$.editingItem.investmentType.$touch"
                        @blur="v$.editingItem.investmentType.$touch"
                    />

                    <v-text-field
                        outlined
                        v-model="editingItem.investmentDescription"
                        label="Description"
                        :error-messages="investmentDescriptionValidationMessage"
                        @input="v$.editingItem.investmentDescription.$touch"
                        @blur="v$.editingItem.investmentDescription.$touch"
                    />

                    <v-currency-field
                        outlined
                        v-model="editingItem.investmentAmt"
                        label="Amount (SGD)"
                        :error-messages="investmentAmtValidationMessage"
                        @input="v$.editingItem.investmentAmt.$touch"
                        @blur="v$.editingItem.investmentAmt.$touch"
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
import { AssetInvestmentModel } from "@/models/AssetInvestmentModel";
import useVuelidate from "@vuelidate/core";
import { maxLength, minValue, required,helpers } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
    name: "AssetInvestment",
    setup() {
        return {
            v$: useVuelidate(),
            recordStatus: useRecordStatus(),
            numberHelper: useNumberHelper()
        };
    },
    mixins: [crudMixin, numberMixin],
    data() {
        return {
            headers: [
                { value: "investmentType", text: "Investment Type" },
                { value: "investmentDescription", text: "Description" },
                { value: "investmentAmt", text: "Amount (SGD)" },
                { value: "actions", text: "Actions", sortable: false }
            ]
        };
    },
    validations() {
        return {
            editingItem: {
                investmentType: { required:helpers.withMessage('This field is mandatory', required), max: maxLength(66) },
                investmentDescription: { required:helpers.withMessage('This field is mandatory', required), max: maxLength(66) },
                investmentAmt: { required:helpers.withMessage('This field is mandatory', required), min: minValue(0) }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection7AssetInvestment"]),

        isValid() {
            // return this.table.length > 0;
            return true;
        },

        subtotal() {
            return this.table
                .map((i) => i.investmentAmt)
                .reduce((total, amt) => total + parseFloat(amt), 0);
        },

        // Validation messages
        investmentTypeValidationMessage() {
            return this.v$.editingItem.investmentType.$errors.find((e) => e)?.$message ?? "";
        },
        investmentDescriptionValidationMessage() {
            return this.v$.editingItem.investmentDescription.$errors.find((e) => e)?.$message ?? "";
        },
        investmentAmtValidationMessage() {
            return this.v$.editingItem.investmentAmt.$errors.find((e) => e)?.$message ?? "";
        }
    },
    watch: {},
    methods: {
        addItem() {
            this.editingItem = new AssetInvestmentModel();
            this.showDialog = true;
        },

        validateSection() {},
        populateData() {
            this.table = this.getSection7AssetInvestment.table;
        },
        buildApiData() {
            let decoratedData = this.recordStatus.setRecordStatus(
                this.getSection7AssetInvestment.table,
                this.table
            );
            this.$store.commit("setSection7InvestmentSubTotal", this.subtotal);
            return AssetInvestmentModel.toJsonApi({
                table: decoratedData,
                subtotal: this.subtotal
            });
        }
    }
};
</script>

<style scoped></style>
