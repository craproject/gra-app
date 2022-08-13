<template>
    <v-system-bar v-if="canShow" window app class="pa-0" color="grey lighten-3">
        <a
            class="text-decoration-none black--text d-flex flex-grow-1"
            href="https://www.gov.sg"
            target="_blank"
        >
            <v-img
                max-height="40"
                max-width="20"
                src="/img/singapore-lion-logo.png"
                class="mx-2 my-1"
            ></v-img>

            <span class="my-auto"> A Singapore Government Agency Website</span>
        </a>
    </v-system-bar>
</template>

<script>
export default {
    name: "GovernmentAgencyWebsite",
    props: {
        autoHide: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            windowOffsetTop: 0
        };
    },
    computed: {
        canShow() {
            return this.windowOffsetTop <= 32;
        }
    },
    methods: {},
    mounted() {
        if (this.autoHide === true) {
            window.addEventListener("scroll", () => {
                this.windowOffsetTop = window.pageYOffset;
            });
        }
    }
};
</script>

<style scoped></style>
