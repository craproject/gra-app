<template>
    <div>
        <h1>3. Compliance Records</h1>

        <p>Definitions for purposes of this question</p>
        <p>
            A. "Charge" includes any indictment, complaint, information, summons, or other notice of
            the alleged commission of any "offence".
        </p>
        <p>
            B. "Offence" includes all felonies, crimes, high misdemeanors, disorderly persons
            offences, and petty disorderly persons offences.
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

        <v-subheader class="black--text"></v-subheader>
        <div class="sub-section-group">
            <arrested ref="arrested"></arrested>
        </div>

        <v-subheader class="black--text"></v-subheader>
        <div class="sub-section-group">
            <subject-of-investigation ref="subjectOfInvestigation"></subject-of-investigation>
        </div>
    </div>
</template>
<script>
import Arrested from "@/components/CivilCriminalInvestigatory/Arrested";
import SubjectOfInvestigation from "@/components/CivilCriminalInvestigatory/SubjectOfInvestigation";
import { mapGetters } from "vuex";

export default {
    name: "Section3",
    components: {
        Arrested,
        SubjectOfInvestigation
    },
    data() {
        return {
            section3AData: []
        };
    },
    computed: {
        ...mapGetters(["getSection3"]),

        isValid() {
            return this.$refs.arrested.isValid && this.$refs.subjectOfInvestigation.isValid;
        }
    },
    watch: {
        section3AData() {
            this.$store.commit("setSection3A", this.section3AData);
        }
    },
    methods: {
        validateSection() {
            this.$refs.arrested.validateSection();
            this.$refs.subjectOfInvestigation.validateSection();
        },
        populateData() {
            this.$refs.arrested.populateData();
            this.$refs.subjectOfInvestigation.populateData();
        },
        buildApiData() {
            return {
                //CRM_ID: this.getSection3.crmId,
                ...this.$refs.arrested.buildApiData(),
                ...this.$refs.subjectOfInvestigation.buildApiData()
            };
        },
        async submit(fromSectionIndex, toSectionIndex) {
               let data = this.buildApiData();
            console.log("data: ", data);

            // await this.$store.dispatch("commitSectionData");
            await this.$store.dispatch("commitSectionData", data);
            //this.$store.dispatch("postAppData", [data, fromSectionIndex, toSectionIndex]);
        }
    },
           mounted(){
        this.populateData()
    }
};
</script>
<style scoped></style>
