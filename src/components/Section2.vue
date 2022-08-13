<template>
    <div>
        <h1>2. Contact Person(s)</h1>
         <p>
            *Limit to 5 records. The first entry will be the main contact person for the applicant
        </p>
        <!--
        <div class="mb-2">
            Answer yes even if:

            <ul class="list-type-upper-alpha">
                <li>the entity, its directors, trustees, or officers did not commit the offence charged;</li>
                <li>the charges were dismissed;</li>
                <li>the entity, its directors, trustees, or officers were not convicted; or</li>
                <li>the charges or offences happened a long time ago.</li>
            </ul>
        </div>-->

        <!-- Important -->
        <!--<v-alert border="left" type="warning" class="m-2" colored-border elevation="1">
        IMPORTANT<br />
        Inquiries will be made to establish whether the applicant has had any involvement with
        law enforcement agencies. Failure to disclose any such involvement will be taken into
        account in assessing the applicant's character, honesty and integrity.
        </v-alert>-->

        
        <div class="sub-section-group">
            <contactPersons ref="contactPersons"></contactPersons>
        </div>
    </div>
</template>
<script>
    import ContactPersons from "@/components/CivilCriminalInvestigatory/ContactPersons";
    import { mapGetters, mapMutations } from "vuex";

    export default {
        name: "Section2",
        components: {
            ContactPersons
        },
        computed: {
            ...mapGetters(["getSection2","getSection2A"]),

            isValid() {
                return (
                    this.$refs.contactPersons.isValid
                );
            }
        },
        methods: {
            ...mapMutations(["setSection2" , "setSection2A"]),

            validateSection() {
                this.$refs.contactPersons.validateSection();
            },
            populateData() {
                console.log('this.getSection2: ',this.getSection2.Sec_2_Yes_Table)
                console.log('this.getSection23: ',this.getSection2.contactPersonTable)

                this.$refs.contactPersons.populateData();
            },
            buildApiData() {
                return {
                    //CRM_ID: this.getSection3.crmId,
                    ...this.$refs.contactPersons.buildApiData()
                };
            },
            async submit(fromSectionIndex, toSectionIndex) {
                // this.setSection2(this.getSection2);
                // this.setSection2A(this.getSection2A);
                let data = this.buildApiData();
            console.log("data: ", data);

            // await this.$store.dispatch("commitSectionData");
            await this.$store.dispatch("commitSectionData", data);

            }
        },
            mounted(){
        this.populateData()
    }
    };
</script>
<style scoped></style>
