import {
    tableDeleteAPI_NEC,
    wsAuthenWidgetSubmitUrl,
    // wsAuthenWidgetDeletetUrl,
} from "@/apiServices/urls";
import axios from "axios";
import store from "@/store";

export default {
    props: {
        // table: { type: Array, required: true }
    },
    data() {
        return {
            table: [],
            editingItem: {},
            showDialog: false,
            dialogDelete: false,
            deleteIndex:0,
        };
    },
    methods: {
        addItem() {
            // Object.assign(this.editingItem, {});
            this.editingItem = {};
            this.showDialog = true;
        },
        editItem(item) {
            this.editingItem = Object.assign({}, item);
            this.showDialog = true;
        },
        cancelItem() {
            // Object.assign(this.editingItem, {});
            this.editingItem = {};
            this.showDialog = false;
            this.v$.$reset();
        },
        deleteItem(tableName) {
            var item = this.table[this.deleteIndex];
            if(item.crmId){
                console.log(tableName);
                this.isLoading = true;
                // let url = wsAuthenWidgetDeletetUrl; // API Widget
                let url = wsAuthenWidgetSubmitUrl
                var TripObject = {
                    url: tableDeleteAPI_NEC, // NEC Url
                    data: { CRM_ID: item.crmId, Table_Name: tableName },
                };
                axios({
                    method: "post",
                    url: url,
                    data: TripObject,
                    dataType: "json",
                })
                    .then((response) => {
                        let data = response.data;
                        if (data["IsSuccessful"] && data["Data"][0]) {
                            this.table.splice(this.deleteIndex, 1);
                        }
                        else{
                            this.error = data["Errors"];
                            // alert("Error: " + this.error[0]["ErrorMessage"]);
                            store.commit("addAppError", data.Errors[0]["ErrorMessage"]);
                        }
                        this.isLoading = false;
                    })
                    .catch((e) => {
                        this.isLoading = false;
                        store.commit("addAppError", "Server return invalid message");
                    });
            }
            else
            {
                this.table.splice(this.deleteIndex, 1);
            }
        },

        saveItem() {
            // Validate form
            this.v$.$validate();
            if (this.v$.editingItem.$invalid) return;

            // Get item index
            let itemIndex = this.table.findIndex(r => r.rowNo === this.editingItem.rowNo);

            // Update/Insert
            if (itemIndex > -1) {
                // Object.assign(this.table[itemIndex], this.editingItem);
                this.$set(this.table, itemIndex, this.editingItem);
            } else {
                this.editingItem.rowNo =
                    parseInt(this.table.reduce((max, item) => Math.max(max, item.rowNo), 0)) + 1;

                this.table.push(this.editingItem);
                console.log(this.table);
            }

            this.showDialog = false;
            this.editingItem = {};
            this.v$.$reset();
        },
        deleteRecord(index) {
            console.log("index ne: "+ index);
            this.deleteIndex = index;
            this.dialogDelete = true;
        },
        closeDelete() {
            this.dialogDelete = false;
        },
        deleteConfirm(tableName) {
            this.deleteItem(tableName);
            this.closeDelete();
        },
    },
    watch:{
        showDialog(val) {
            val || this.cancelItem();
            if(val){
                this.$nextTick(() => {
                    console.log("vao day");
                    let dialogEle = document.getElementsByClassName("v-dialog--active")[0];
                    if(dialogEle){
                        dialogEle.scrollTop=0;
                    }
                });
            }
        },
    },
};
