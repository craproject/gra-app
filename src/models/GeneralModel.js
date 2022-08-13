export class GeneralModel {
    //crmId;
    //allowInvestigation;
    //allowInspect;
    //haveAttentionToCca;
    //haveUnderstand;
    //haveAcceptFine;
    licenceType

    static parseFromJsonApi(jsonData) {
        let newGeneralModel = new GeneralModel();
        //newGeneralModel.crmId = jsonData["CRM_ID"];
        //newGeneralModel.allowInvestigation = jsonData["General_Info_PRAF_Checkbox_1"];
        //newGeneralModel.allowInspect = jsonData["General_Info_PRAF_Checkbox_2"];
        //newGeneralModel.haveAttentionToCca = jsonData["General_Info_Checkbox_1"];
        //newGeneralModel.haveUnderstand = jsonData["General_Info_Checkbox_2"];
        //newGeneralModel.haveAcceptFine = jsonData["General_Info_Checkbox_3"];
        newGeneralModel.licenceType = jsonData["General_Licence_Type"];

        return newGeneralModel;
    }

    static toJsonApi(model) {
        return {
            //CRM_ID: model.crmId,
            //General_Info_PRAF_Checkbox_1: model.allowInvestigation,
            //General_Info_PRAF_Checkbox_2: model.allowInspect,
            //General_Info_Checkbox_1: model.haveAttentionToCca,
            //General_Info_Checkbox_2: model.haveUnderstand,
            //General_Info_Checkbox_3: model.haveAcceptFine
            General_Licence_Type: model.licenceType
        };
    }
}
