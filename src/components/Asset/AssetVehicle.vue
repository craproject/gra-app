<template>
    <div class="mb-9">
        <h4>Vehicle</h4>

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
            <!-- Amount -->
            <template v-slot:[`item.vehicleAmt`]="{ item }">
                {{ numberHelper.toCurrency(item.vehicleAmt) }}
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
                    <v-btn color="blue darken-1" text @click="deleteConfirm(getSection7AssetVehicle.tableName)">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- New Item -->
        <v-dialog v-model="showDialog" persistent width="500px">
            <v-card>
                <v-card-title>Details</v-card-title>

                <v-card-text>
                    <v-text-field
                        outlined
                        v-model="editingItem.vehicleType"
                        label="Vehicle Type"
                        :error-messages="vehicleTypeValidationMessage"
                        @input="v$.editingItem.vehicleType.$touch"
                        @blur="v$.editingItem.vehicleType.$touch"
                    />

                    <v-text-field
                        outlined
                        v-model="editingItem.vehicleDescription"
                        label="Description"
                        :error-messages="vehicleDescriptionValidationMessage"
                        @input="v$.editingItem.vehicleDescription.$touch"
                        @blur="v$.editingItem.vehicleDescription.$touch"
                    />

                    <v-currency-field
                        outlined
                        v-model="editingItem.vehicleAmt"
                        label="Amount (SGD)"
                        :error-messages="vehicleAmtValidationMessage"
                        @input="v$.editingItem.vehicleAmt.$touch"
                        @blur="v$.editingItem.vehicleAmt.$touch"
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
import { AssetVehicleModel } from "@/models/AssetVehicleModel";
import useVuelidate from "@vuelidate/core";
import { maxLength, minValue, required,helpers } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
    name: "AssetVehicle",
    setup() {
        return {
            v$: useVuelidate(),
            recordStatus: useRecordStatus(),
            numberHelper: useNumberHelper()
        };
    },
    mixins: [crudMixin],
    data() {
        return {
            headers: [
                { value: "vehicleType", text: "Vehicle Type" },
                { value: "vehicleDescription", text: "Description" },
                { value: "vehicleAmt", text: "Amount (SGD)" },
                { value: "actions", text: "Actions", sortable: false }
            ]
        };
    },
    validations() {
        return {
            editingItem: {
                vehicleType: { required:helpers.withMessage('This field is mandatory', required), max: maxLength(66) },
                vehicleDescription: { required:helpers.withMessage('This field is mandatory', required), max: maxLength(66) },
                vehicleAmt: { required:helpers.withMessage('This field is mandatory', required), min: minValue(0) }
            }
        };
    },
    computed: {
        ...mapGetters(["getSection7AssetVehicle"]),

        isValid() {
            // return this.table.length > 0;
            return true;
        },

        subtotal() {
            return this.table.reduce((total, item) => total + parseFloat(item.vehicleAmt), 0);
        },

        // Validation messages
        vehicleTypeValidationMessage() {
            return this.v$.editingItem.vehicleType.$errors.find((e) => e)?.$message ?? "";
        },
        vehicleDescriptionValidationMessage() {
            return this.v$.editingItem.vehicleDescription.$errors.find((e) => e)?.$message ?? "";
        },
        vehicleAmtValidationMessage() {
            return this.v$.editingItem.vehicleAmt.$errors.find((e) => e)?.$message ?? "";
        }
    },
    watch: {
        table: {
            handler() {
                // Update value in store
                this.$store.commit("setSection7AssetVehicle", {
                    table: this.table,
                    tableName: this.getSection7AssetVehicle.tableName,
                    subTotal: this.subtotal
                });
            },
            deep: true
        }
    },
    methods: {
        addItem() {
            this.editingItem = new AssetVehicleModel();
            this.showDialog = true;
        },

        validateSection() {},
        populateData() {
            this.table = this.getSection7AssetVehicle.table;
        },
        buildApiData() {
            let decoratedData = this.recordStatus.setRecordStatus(
                this.getSection7AssetVehicle.table,
                this.table
            );
            this.$store.commit("setSection7VehicleSubTotal", this.subtotal);
            return AssetVehicleModel.toJsonApi({ table: decoratedData, subtotal: this.subtotal });
        }
    }
};
</script>

<style scoped></style>
