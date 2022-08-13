<template>
    <div class="mb-9">
        <table class="table table-bordered mb-0">
            <!-- Latest Month Gross Salary -->
            <tr>
                <td colspan="4" class="font-weight-bold">
                    Latest Month Gross Salary *Excluding bonuses (SGD)
                </td>
                <td colspan="2">
                    <v-currency-field
                        outlined
                        v-model="cashLatestGrossSalary"
                        :error-messages="cashLatestGrossSalaryValidationMessage"
                        @input="v$.cashLatestGrossSalary.$touch"
                        @blur="v$.cashLatestGrossSalary.$touch"
                    />
                </td>
            </tr>

            <!-- Cash on Hand -->
            <tr>
                <td colspan="6" style="border: none">
                    <h4>Cash</h4>
                </td>
            </tr>

            <tr>
                <td colspan="4"></td>
                <td colspan="2" class="grey lighten-4">Amount (SGD)</td>
            </tr>

            <tr>
                <td colspan="4" class="font-weight-bold">Cash on Hand</td>
                <td colspan="2">
                    <v-currency-field
                        outlined
                        type="number"
                        v-model="cashOnHand"
                        :error-messages="cashOnHandValidationMessage"
                        @input="v$.cashOnHand.$touch"
                        @blur="v$.cashOnHand.$touch"
                    />
                </td>
            </tr>

            <tr>
                <td colspan="6" class="font-weight-bold">Cash in Bank</td>
            </tr>
        </table>

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
            class="c-table-bordered"
        >
            <!-- cashAccountType -->
            <template v-slot:[`item.cashAccountType`]="{ item }">
                {{ getOptionText(accountOptions, item.cashAccountType) }}
            </template>

            <!-- Amount in Account (SGD) -->
            <template v-slot:[`item.cashSgd`]="{ item }">
                {{ numberHelper.toCurrency(item.cashSgd) }}
            </template>

            <!-- Amount -->
            <template v-slot:[`item.cashAmt`]="{ item }">
                {{ numberHelper.toCurrency(item.cashAmt) }}
            </template>

            <!-- Actions -->
            <template v-slot:[`item.actions`]="{ item, index }">
                <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>

                <v-icon small @click="deleteRecord(index)"> mdi-delete </v-icon>
                
            </template>

            <template v-slot:[`body.append`]>
                <!-- Subtotal-->
                <tr class="grey lighten-5">
                    <td colspan="4" class="text-right font-weight-bold">Sub Total</td>
                    <td colspan="2">{{ numberHelper.toCurrency(subtotal) }}</td>
                </tr>

                <!-- New button -->
                <!-- <tr style="border-top: none">
                    <td colspan="6" class="pa-0" style="height: 32px">
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
                    <v-btn color="blue darken-1" text @click="deleteConfirm(getSection7AssetCash.tableName)">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- New Cash in Bank showDialog-->
        <v-dialog v-model="showDialog" persistent width="500px">
            <v-card>
                <v-card-title>Details</v-card-title>

                <v-card-text>
                    <v-text-field
                        outlined
                        v-model="editingItem.nameOfBank"
                        label="Name of Bank"
                        :error-messages="nameOfBankValidationMessage"
                        @input="v$.editingItem.nameOfBank.$touch"
                        @blur="v$.editingItem.nameOfBank.$touch"
                    />

                    <v-currency-field
                        outlined
                        v-model="editingItem.cashSgd"
                        label="Amount in Account (SGD)"
                        :error-messages="cashSgdValidationMessage"
                        @input="v$.editingItem.cashSgd.$touch"
                        @blur="v$.editingItem.cashSgd.$touch"
                    />

                    <v-currency-field
                        outlined
                        v-model="editingItem.cashPercentageAttributable"
                        label="% Attributable to you"
                        :error-messages="cashPercentageAttributableValidationMessage"
                        @input="v$.editingItem.cashPercentageAttributable.$touch"
                        @blur="v$.editingItem.cashPercentageAttributable.$touch"
                    />

                    <v-select
                        outlined
                        :items="accountOptions"
                        item-text="label"
                        item-value="value"
                        v-model="editingItem.cashAccountType"
                        label="Account Type"
                        :error-messages="cashAccountTypeValidationMessage"
                        @input="v$.editingItem.cashAccountType.$touch"
                        @blur="v$.editingItem.cashAccountType.$touch"
                    />

                    <!--<v-text-field
                        v-if="
                            getOptionText(accountOptions, editingItem.cashAccountType) === 'Others'
                        "
                        outlined
                        
                        label="Other type"
                        v-model="editingItem.cashAccountTypeOthers"
                        :error-messages="cashAccountTypeOthersValidationMessage"
                        @input="v$.editingItem.cashAccountTypeOthers.$touch"
                        @blur="v$.editingItem.cashAccountTypeOthers.$touch"
                    />-->

                    <v-currency-field
                        outlined
                        disabled
                        v-model="editingItem.cashAmt"
                        label="Amount (SGD)"
                        :error-messages="cashAmtValidationMessage"
                        @input="v$.editingItem.cashAmt.$touch"
                        @blur="v$.editingItem.cashAmt.$touch"
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
import optionMixin from "@/mixins/optionMixin";
import { AssetCashModel } from "@/models/AssetCashModel";
import useVuelidate from "@vuelidate/core";
import { maxValue, minValue, required,helpers } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
    name: "AssetCash",
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
            cashLatestGrossSalary: "", // this.values.Sec_23_Asset_Cash_Latest_Gross_Salary
            cashOnHand: "", // this.values.Sec_23_Asset_Cash_On_Hand
            // cashInBank: "", // this.values.Sec_23_Asset_Cash_In_Bank

            headers: [
                { value: "nameOfBank", text: "Name of Bank" },
                { value: "cashSgd", text: "Amount in Account (SGD)" },
                { value: "cashPercentageAttributable", text: "% Attributable to you" },
                { value: "cashAccountType", text: "Account Type" },
                //{ value: "cashAccountTypeOthers", text: "Account Type Others" },
                { value: "cashAmt", text: "Amount (SGD)" },
                { value: "actions", text: "Actions", sortable: false }
            ]
        };
    },
    validations() {
        return {
            cashLatestGrossSalary: { required:helpers.withMessage('This field is mandatory', required), min: minValue(0) },
            cashOnHand: {}, // required, min: minValue(0)
            editingItem: {
                nameOfBank: { required:helpers.withMessage('This field is mandatory', required) },
                cashSgd: { required:helpers.withMessage('This field is mandatory', required), min: minValue(0) },
                cashPercentageAttributable: { required:helpers.withMessage('This field is mandatory', required), min: minValue(0), max: maxValue(100) },
                cashAccountType: { required:helpers.withMessage('This field is mandatory', required) },
                /*cashAccountTypeOthers: {
                 required: requiredIf(
                 this.getOptionText(
                 this.accountOptions,
                 this.editingItem.cashAccountType
                 ) === "Others"
                 ),
                 max: maxLength(66)
                 },*/
                cashAmt: { required:helpers.withMessage('This field is mandatory', required) }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection7AssetCash"]),

        isValid() {
            return !this.v$.cashLatestGrossSalary.$invalid && !this.v$.cashOnHand.$invalid;
        },

        subtotal() {
            return (
                this.table?.reduce((total, item) => total + parseFloat(item.cashAmt), 0) +
                parseFloat(this.cashOnHand, 0)
            );
        },

        // Validation messages
        cashLatestGrossSalaryValidationMessage() {
            return this.v$.cashLatestGrossSalary.$errors.find((e) => e)?.$message ?? "";
        },
        cashOnHandValidationMessage() {
            return this.v$.cashOnHand.$errors.find((e) => e)?.$message ?? "";
        },
        nameOfBankValidationMessage() {
            return this.v$.editingItem.nameOfBank.$errors.find((e) => e)?.$message ?? "";
        },
        cashSgdValidationMessage() {
            return this.v$.editingItem.cashSgd.$errors.find((e) => e)?.$message ?? "";
        },
        cashPercentageAttributableValidationMessage() {
            return (
                this.v$.editingItem.cashPercentageAttributable.$errors.find((e) => e)?.$message ??
                ""
            );
        },
        cashAccountTypeValidationMessage() {
            return this.v$.editingItem.cashAccountType.$errors.find((e) => e)?.$message ?? "";
        },
        /*cashAccountTypeOthersValidationMessage() {
         return this.v$.editingItem.cashAccountTypeOthers.$errors.find(e => e)?.$message ?? "";
         },*/
        cashAmtValidationMessage() {
            return this.v$.editingItem.cashAmt.$errors.find((e) => e)?.$message ?? "";
        }
    },
    watch: {
        // Calculate Cash amount
        "editingItem.cashSgd"() {
            if (this.editingItem === {}) return;

            this.editingItem.cashAmt = this.calCashAmount();
        },
        "editingItem.cashPercentageAttributable"() {
            if (this.editingItem === {}) return;

            this.editingItem.cashAmt = this.calCashAmount();
        }
        // cashOnHand() {
        //     this.$emit("assetCashChanged", this.buildApiData());
        // },
        // table: {
        //     handler() {
        //         this.$emit("assetCashChanged", this.buildApiData());
        //     },
        //     deep: true
        // }
    },
    methods: {
        calCashAmount() {
            let cash =
                this.numberHelper.isNumeric(this.editingItem.cashSgd) &&
                parseFloat(this.editingItem.cashSgd);

            let percent =
                this.numberHelper.isNumeric(this.editingItem.cashPercentageAttributable) &&
                parseFloat(this.editingItem.cashPercentageAttributable);

            return (cash * percent * 0.01).toFixed(2);
        },

        addItem() {
            this.editingItem = new AssetCashModel();
            this.showDialog = true;
        },

        validateSection() {
            this.v$.cashLatestGrossSalary.$touch();
            this.v$.cashOnHand.$touch();
        },
        populateData() {
            this.cashLatestGrossSalary = this.getSection7AssetCash.cashLatestGrossSalary;
            this.cashOnHand = this.getSection7AssetCash.cashOnHand ? this.getSection7AssetCash.cashOnHand : 0 ;
            this.table = this.getSection7AssetCash.table;
            // this.subtotal = this.getSection7AssetCash.subtotal;
        },
        buildApiData() {
            let decoratedData = this.recordStatus.setRecordStatus(
                this.getSection7AssetCash.table,
                this.table
            );

            let data = {
                cashLatestGrossSalary: this.cashLatestGrossSalary,
                cashOnHand: this.cashOnHand,
                table: decoratedData,
                subtotal: this.subtotal
            };
            console.log("Decorate data"+JSON.stringify(decoratedData));
            console.log("data submit"+JSON.stringify(data));
            this.$store.commit("setSection7AssetCashSubTotal", this.subtotal);
            return AssetCashModel.toJsonApi(data);
        }
    }
};
</script>

<style scoped></style>
