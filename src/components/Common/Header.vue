<template>
    <div class="header">
        <div class="grey lighten-3">
            <a class="header-row" href="https://www.gov.sg" target="_blank">
                <v-img
                    max-height="40"
                    max-width="20"
                    src="/img/singapore-lion-logo.png"
                    class="mx-2 my-1"
                ></v-img>
                <span> A Singapore Government Agency Website</span>
            </a>
        </div>

        <div class="header-row">
            <v-img
                max-height="100"
                max-width="200"
                src="/img/cra-logo.png"
                class="my-5 mx-1"
            ></v-img>

            <!-- Text size -->
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
    a {
        text-decoration: none;
        color: black;
    }

    .header-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
}
</style>
