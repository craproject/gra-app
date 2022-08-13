import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
Vue.config.devtools=true; //for debugging purpose

export default new Vuex.Store({
    state: {
        currentPageIndex: 0,
        previousPageIndex:0,
        isLoading: false,
        isSuccessRequest: false,

        submittedSections: [],

        crmId: "",
        appData: {},
        appErrors: [],

        // Section data
        // Section0->8 contain data of that section which isn't contained in sub-section

        // Section 0
        section0: {},
        //section0Json: {},

        // Section 1
        section1: {},

        //myInfoData: {},

        // Section 2
        section2: {},
        section2A: {}, //contactPerson

        // Section 3
        section3: {},
        section3A: {}, //arrested
        section3B: {}, //subjectOfInvestigation

        // Section 4
        section4: {},
        section4A: {} //particularExecutive

    },

    getters,
    mutations,
    actions
});
