<template>
    <div>
        <h1>4. Particulars of Responsible Executives</h1>
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
            <particularExecutives ref="particularExecutives"></particularExecutives>
        </div>
    </div>
</template>
<script>
import ParticularExecutives from "@/components/CivilCriminalInvestigatory/ParticularExecutives";
import { mapGetters } from "vuex";

export default {
    name: "Section4",
    components: {
        ParticularExecutives
    },
    computed: {
        ...mapGetters(["getSection4"]),

        isValid() {
            return this.$refs.particularExecutives.isValid;
        }
    },
    methods: {
        validateSection() {
            this.$refs.particularExecutives.validateSection();
        },
        populateData() {
            this.$refs.particularExecutives.populateData();
        },
        buildApiData() {
            return {
                //CRM_ID: this.getSection3.crmId,
                ...this.$refs.particularExecutives.buildApiData()
            };
        },
        async submit(fromSectionIndex, toSectionIndex) {
            let data = this.buildApiData();
            await this.$store.dispatch("commitSectionData", data);

            // this.$store.dispatch("postAppData", [data, fromSectionIndex, toSectionIndex]);
        }
    },
    mounted(){
        this.populateData()
    }
};
</script>
<style scoped></style>
