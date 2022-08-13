<template>
    <v-snackbar
        app
        right
        top
        multi-line
        :timeout="timeout"
        v-model="snackbar"
        :color="getSnackbarColor(currentMessage.type)"
        transition="slide-y-reverse-transition"
    >
        {{ currentMessage.message }}

        <template v-slot:action="{ attrs }">
            <!-- Pin -->
            <v-btn icon v-bind="attrs" @click="extendTimeout" :class="{ 'elevation-2': isPinned }">
                <v-icon small>mdi-pin</v-icon>
            </v-btn>

            <!-- Close -->
            <v-btn icon v-bind="attrs" @click="closeSnackbars">
                <v-icon small>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

// class NotifyMessage {
//     id;
//     type;
//     message;
// }

export default {
    name: "ToastLikeNotify",
    data() {
        return {
            messages: [],
            currentMessage: {},
            snackbar: false,
            defaultTimeout: 5000,
            timeout: 5000,
            isPinned: false
        };
    },
    computed: {
        ...mapGetters(["getAppErrors"]),
        ...mapMutations(["removeFirstAppError"]),

        errorMessages() {
            return this.messages;
        }
    },
    methods: {
        extendTimeout() {
            if (this.isPinned) {
                this.isPinned = false;
                this.timeout = this.defaultTimeout;
            } else {
                this.isPinned = true;
                this.timeout = -1;
            }
        },
        closeSnackbars() {
            this.snackbar = false;
        },
        showSnackbars() {
            // Set and show first message
            this.currentMessage = this.messages[0];
            this.snackbar = true;
        },
        removeFistMessage() {
            this.messages.splice(0, 1);
        },
        getSnackbarColor(type) {
            switch (type) {
                case "error":
                    return "red lighten-1";

                case "warning":
                    return "amber lighten-1";

                case "success":
                    return "green lighten-1";

                default:
                    return "red lighten-1";
            }
        },
        fetchErrorsFromStore() {
            // Add if not exist
            let ids = this.messages.map(m => m.id);

            let appErrors = this.getAppErrors;
            appErrors.forEach(m => !ids.includes(m.id) && this.messages.push(m));
        },

        async wait(timeout) {
            await new Promise(resolve => {
                setTimeout(resolve, timeout);
            });
        }
    },
    watch: {
        getAppErrors: {
            handler() {
                this.fetchErrorsFromStore();
            },
            deep: true
        },
        messages() {
            if (this.messages.length > 0) {
                this.closeSnackbars();
                this.showSnackbars();
                this.removeFistMessage();
            }
        }
    }
};
</script>

<style scoped></style>
