//import { MyInfoMapping } from "@/data/myInfoMapping";

export class PersonalDataModel {
    static parseFromJsonApi(data) {
        return {
            crmId: data.CRM_ID,

            // 1A
            //retrieveFromMyInfo: data.Sec_1A_Checkbox,
            nameOfApplicant: data.Sec_1_Name_of_Applicant, // Applicant Name
            entityType: data.Sec_1_Type_of_Entity,
            entityType_other: data.Sec_1_Type_of_Entity_Other,
            natureEntity: data.Sec_1_Nature_of_Entity,
            natureEntity_other: data.Sec_1_Nature_of_Entity_Other

        };
    }

    /*static parseFromMyInfo(data) {
        let myInfoMapping = new MyInfoMapping();

        return {
            crmId: undefined,

            // 1A
            retrieveFromMyInfo: true,
            name: data.name.value,
            gender: myInfoMapping.findOptionValue("genderOptions", data.sex.code),

            // 1C
            dateOfBirth: data.dob.value,
            countryOfBirth: myInfoMapping.findOptionValue(
                "countryOptions",
                data.birthcountry.value
            ),

            // 1G
            race: myInfoMapping.findOptionValue("raceOptions", data.race.code)
        };
    }*/

    static toJsonApi(model) {
        return {
            //CRM_ID: model.crmId,
            // 1A
            //Sec_1A_Checkbox: model.retrieveFromMyInfo,
            Sec_1_Name_of_Applicant: model.nameOfApplicant,
            Sec_1_Type_of_Entity: model.entityType,
            Sec_1_Nature_of_Entity: model.natureEntity,
            Sec_1_Nature_of_Entity_Other: model.natureEntity_other
        };
    }
}
