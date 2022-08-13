export class MyInfoMapping {
    myInfoMapper = [
        // Gender
        { type: "genderOptions", value: "100000000", myInfoValue: "M" },
        { type: "genderOptions", value: "100000001", myInfoValue: "F" },

        // Race
        {
            type: "raceOptions",
            value: "f8ec0c20-7ac3-eb11-9676-005056b57f58",
            myInfoValue: "CN",
            label: "Chinese"
        },
        {
            type: "raceOptions",
            value: "45a62826-7ac3-eb11-9676-005056b57f58",
            myInfoValue: "ML",
            label: "Malay"
        },

        // Country
        {
            type: "countryOptions",
            value: "09b03876-6ab1-eb11-966c-005056b57f58",
            myInfoValue: "JP",
            label: "Japan"
        },
        {
            type: "countryOptions",
            value: "9853ce96-69b1-eb11-966c-005056b57f58",
            myInfoValue: "SG",
            label: "Singapore"
        }
    ];

    findOptionValue(optionType, myInfoValue) {
        console.log("myInfoMapping called...");

        return this.myInfoMapper
            .filter(item => item.type === optionType)
            ?.find(item => item.myInfoValue === myInfoValue);
    }
    getOptionValueByText(optionType, text) {
        console.log("findOptionValueByMaster called...");
        let ls = this.optionData[optionType];
        if (Array.isArray(ls)) {
            return ls.filter(i => i.label.toLowerCase() === text.toLowerCase())[0]?.value ?? "";
        }
    }
    getOptionTextByValue(optionType, val) {
        // console.log("getOptionTextByValue called...",optionData);
        // let ls = this.optionData[optionType];
        // if (Array.isArray(ls)) {
        //     return ls.filter(i => i.value === val)[0]?.label ?? "";
        // }
        // return "";
    }
}
