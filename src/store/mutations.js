import { v4 as uuidV4 } from "uuid";

export default {
    // Common
    addAppError(state, data) {
        let error = {
            id: uuidV4(),
            type: "error",
            message: data
        };

        state.appErrors.push(error);
    },
    removeFirstAppError(state) {
        state.appErrors.shift();
    },

    setCurrentPageIndex(state, data) {
        state.currentPageIndex = data;
    },
    setPreviousPageIndex(state, data) {
        state.previousPageIndex = data;
    },
    setLoading(state, data) {
        state.isLoading = data;
    },
    setIsRequestSuccess(state, data) {
        state.isSuccessRequest = data;
    },
    addSubmittedSection(state, data) {
        let index = state.submittedSections.indexOf(data);

        if (index > -1) state.submittedSections[index] = data;
        else state.submittedSections.push(data);
    },

    // App data
    setCrmId(state, data) {
        state.crmId = data;
    },

    setAppData(state, data) {
        state.appData = data;
    },

    // Section 0
    setSection0(state, data) {
        state.section0 = data;
    },
    
    setLicenceType(state, data) {
        state.licenceType = data;
    },

    setSection0Json(state, data) {
        state.section0Json = data;
    },

    // Section 1
    setSection1(state, data) {
        state.section1 = data;
    },

    // setSection1BPassportJson(state, data) {
    //     state.section1BPassportJson = data;
    // },

    // Section 2
    setSection2(state, data) {
        state.section2 = data;
    },
    setSection2A(state, data) {
        state.section2A = data;
    },

    // Section 3
    setSection3(state, data) {
        state.section3 = data;
    },
      setSection3A(state, data) {
        state.section3A = data;
    },
        setSection3B(state, data) {
        state.section3B = data;
    },

    // Section 4
    setSection4(state, data) {
        state.section4 = data;
    },
     setSection4A(state, data) {
        state.section4A = data;
    }
     

};
