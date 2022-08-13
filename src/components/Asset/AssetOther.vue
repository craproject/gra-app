<template>
    <div class="mb-9">
        <h4>Others</h4>

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
            <!-- Amount -->
            <template v-slot:[`item.othersAmt`]="{ item }">
                {{ numberHelper.toCurrency(item.othersAmt) }}
            </template>

            <!-- Actions -->
            <template v-slot:[`item.actions`]="{ item, index }">
                <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>

                <v-icon small @click="deleteRecord(index)"> mdi-delete </v-icon>
               
            </template>

            <template v-slot:[`body.append`]>
                <!-- SubTotal -->
                <tr class="grey lighten-5">
                    <td class="text-right font-weight-bold">Sub Total</td>
                    <td colspan="2">{{ numberHelper.toCurrency(subtotal) }}</td>
                    <!--<td></td>-->
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
                        <v-btn color="blue darken-1" text @click="deleteConfirm(getSection7AssetOther.tableName)">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        <!-- New item -->
        <v-dialog v-model="showDialog" persistent width="500px">
            <v-card>
                <v-card-title>Details</v-card-title>

                <v-card-text>
                    <v-text-field
                        outlined
                        v-model="editingItem.othersDescription"
                        label="Description"
                        :error-messages="othersDescriptionValidationMessage"
                        @input="v$.editingItem.othersDescription.$touch"
                        @blur="v$.editingItem.othersDescription.$touch"
                    />

                    <v-currency-field
                        outlined
                        v-model="editingItem.othersAmt"
                        label="Amount (SGD)"
                        :error-messages="othersAmtValidationMessage"
                        @input="v$.editingItem.othersAmt.$touch"
                        @blur="v$.editingItem.othersAmt.$touch"
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
import { AssetOtherModel } from "@/models/AssetOtherModel";
import useVuelidate from "@vuelidate/core";
import { maxLength, minValue, required,helpers } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
    name: "AssetOther",
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
                { value: "othersDescription", text: "Description" },
                { value: "othersAmt", text: "Amount (SGD)" },
                { value: "actions", text: "Actions", sortable: false }
            ]
        };
    },
    validations() {
        return {
            editingItem: {
                othersDescription: { required:helpers.withMessage('This field is mandatory', required), max: maxLength(66) },
                othersAmt: { required:helpers.withMessage('This field is mandatory', required), min: minValue(0) }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection7AssetOther"]),

        isValid() {
            // return this.table.length > 0;
            return true;
        },

        subtotal() {
            return this.table
                .map((i) => i.othersAmt)
                .reduce((total, amt) => total + parseFloat(amt), 0);
        },
        isValidOthersRecord() {
            return !!(this.editingItem.othersDescription && this.editingItem.othersAmt);
        },

        // Validation messages
        othersDescriptionValidationMessage() {
            return this.v$.editingItem.othersDescription.$errors.find((e) => e)?.$message ?? "";
        },
        othersAmtValidationMessage() {
            return this.v$.editingItem.othersAmt.$errors.find((e) => e)?.$message ?? "";
        }
    },
    methods: {
        addItem() {
            this.editingItem = new AssetOtherModel();
            this.showDialog = true;
        },

        validateSection() {},
        populateData() {
            this.table = this.getSection7AssetOther.table;
        },
        buildApiData() {
            let decoratedData = this.recordStatus.setRecordStatus(
                this.getSection7AssetOther.table,
                this.table
            );
            this.$store.commit("setSection7OthersSubTotal", this.subtotal);
            return AssetOtherModel.toJsonApi({ table: decoratedData, subtotal: this.subtotal });
        }
    }
};
</script>

<style scoped></style>
