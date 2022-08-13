export default {
    // Common
    getCurrentPageIndex: state => state.currentPageIndex,
    getPreviousPageIndex: state => state.previousPageIndex,

    getIsLoading: state => state.isLoading,
    getIsSuccessRequest: state => state.isSuccessRequest,

    getAppErrors: state => state.appErrors,

    // App data
    getCrmId: state => state.crmId,

    getLicenceType: state => state.lincenceType,
        
    getAppData(state) {
        return state.appData;
    },
    getSubmittedSections(state) {
        return state.submittedSections;
    },

    // Section 0
    getSection0: state => state.section0,
    getSection0Json: state => state.section0Json,

    // Section 1
    getSection1: state => state.section1,

    //getMyInfoData: state => state.myInfoData,

    // Section 2
    getSection2: state => state.section2,
    getSection2A: state => state.section2A,

    // Section 3
    getSection3: state => state.section3,
    getSection3A: state => state.section3A,
    getSection3B: state => state.section3B,

    // Section 4
    getSection4: state => state.section4,
    getSection4A: state => state.section4A,
};
