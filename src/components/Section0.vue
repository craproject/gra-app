<template>
    <div>
        <!-- 1 -->
        <h1>General Information</h1>
        <span class="required">Please select the Licence you are applying for:</span>
        <!-- Entity Type -->
        <v-radio-group v-model="licenceType" :error-messages="licenceTypeValidationMessage" >
            <v-radio
                value="Licence to Conduct Lottery and Betting Operations"
                label="Licence to Conduct Lottery and Betting Operations"
            ></v-radio>
            <v-radio
                value="Licence to Conduct Gaming Involving Gaming Machines in a Gaming Machine Room"
                label="Licence to Conduct Gaming Involving Gaming Machines in a Gaming Machine Room"
            ></v-radio>
            <v-radio
                value="Licence to Conduct Tombola"
                label="Licence to Conduct Tombola"
            ></v-radio>
            <v-radio value="Licence to Conduct Gambling in Private Establishments" 
            label="Licence to Conduct Gambling in Private Establishments"></v-radio>
        </v-radio-group>
        <!--<select v-model="selected">
            <option value=0>Please select one of type</option>
            <option value=1>Gambling Operator Licensed to Conduct Lottery and Sports Betting</option>
            <option value=2>Gambling Operator Licensed to Conduct Gambling in Private Premises</option>
            <option value=3>Gambling Operator Licensed to Conduct Gambling with Gaming Machines</option>
            <option value=4>Gambling Operator Licensed to Conduct Tombola</option>
        </select>-->
        <!--<ul>
            <li class="list-type-none">
                <ul>
                    <li class="list-type-lower-alpha mb-3">
                        Gambling Operator Licensed to Conduct Lottery and Sports Betting (for internal reference only: SPPL)
                    </li>
                    <li class="list-type-lower-alpha mb-3">
                        Gambling Operator Licensed to Conduct Gambling in Private Premises
                    </li>
                    <li class="list-type-lower-alpha mb-3">
                        Gambling Operator Licensed to Conduct Gambling with Gaming Machines
                    </li>
                    <li class="list-type-lower-alpha mb-3">
                        Gambling Operator Licensed to Conduct Tombola
                    </li>
                </ul>
            </li>
        </ul>-->
    </div>
</template>

<script>
import useRecordStatus from "@/compositionApi/useRecordStatus";
import { GeneralModel } from "@/models/GeneralModel";
import useVuelidate from "@vuelidate/core";
import { maxLength, required, requiredIf,helpers } from "@vuelidate/validators";
import { sameAs } from "@vuelidate/validators";
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "Section0",
    setup() {
        return {
            v$: useVuelidate(),
            recordStatus: useRecordStatus()
        };
    },
    data() {
        return {
            licenceType: ""
        };
    },
    validations() {
        return {
            licenceType: { required: helpers.withMessage("Please select one option", required) }
        };
    },
    computed: {
        ...mapGetters(["getSection0Json", "getSection0"]),

        // Validation message
        licenceTypeValidationMessage() {
            return this.v$.licenceType.$errors.find(e => e)?.$message ?? "";
        },

        isValid() {
            return !this.v$.$invalid;
        }
    },
    /*watch: {
        getSection0() {
            console.log("Populating Lincence Type...")
            // Populate Section Data
            this.licenceType = this.getSection0;
        }
    },*/
    methods: {
        ...mapMutations(["setSection0"]),

        updateLicenceType() {
            console.log("Storing Lincence Type...",this.licenceType)
            //this.setLicenceType(this.licenceType);
            this.setSection0(this.licenceType);
        },

        validateSection() {
            this.v$.$validate();
        },
        buildApiData() {
            return GeneralModel.toJsonApi(this.licenceType);
        },
        populateData() {
            console.log("populate data section 0 called...");

            //this.licenceType = this.getSection0.licenceType;
            this.licenceType = this.getSection0;
        },
        async submit(fromSectionIndex, toSectionIndex) {
            // console.log("fromSectionIndex: " + fromSectionIndex);
            // console.log("toSectionIndex: " + toSectionIndex);

            // let data = this.buildApiData();
            // console.log("Data : " + data);
            let data= this.licenceType

            // await this.$store.dispatch("commitSectionData");
           await this.$store.dispatch("commitSectionData",  data);

            
            //this.$store.licenceType
            // this.$store.dispatch("postAppData", [data, fromSectionIndex, toSectionIndex]);
        }
        /*watch: {
        getSection0() {
            // Populate Section Data
            console.log("Populating : " + this.getSection0);
            this.licenceType = this.getSection0;
        }
    },*/
        //updateLicenceType() {
        //    setLicenceType = this.licenceType;
        //}
    },
    mounted(){
        this.populateData()
    }
};
</script>

<style scoped></style>