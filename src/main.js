import Vue from "vue";
import store from "./store";

// Libraries
import VTooltip from "v-tooltip";
import vuetify from "./plugins/vuetify";
import { VTextField } from "vuetify/lib";
import VCurrencyField from "v-currency-field";

// Components
import App from "./App.vue";

import Section0 from "./components/Section0";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
//import Section5 from "./components/Section5";
//import Section6 from "./components/Section6";
//import Section7 from "./components/Section7";
//import Section8 from "./components/Section8";
//import Section9 from "./components/Section9";

// Import CSS files
import "mdi-icons/css/materialdesignicons.min.css";
import "bootstrap/scss/bootstrap.scss";

import "./scss/main.scss";
import "./css/custom.css";

// Register Components and plugins
Vue.component("Section0", Section0);
Vue.component("Section1", Section1);
Vue.component("Section2", Section2);
Vue.component("Section3", Section3);
Vue.component("Section4", Section4);
//Vue.component("Section5", Section5);
//Vue.component("Section6", Section6);
//Vue.component("Section7", Section7);
//Vue.component("Section8", Section8);
//Vue.component("Section9", Section9);

// Register v-tooltip
Vue.use(VTooltip);
Vue.config.devtools=true; //for debugging purpose

// VCurrencyField
Vue.component("v-text-field", VTextField);

Vue.use(VCurrencyField, {
    decimalLength: { min: 2, max: 10 },
    autoDecimalMode: false,
    allowNegative: false
});

Vue.config.productionTip = false;

new Vue({
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");