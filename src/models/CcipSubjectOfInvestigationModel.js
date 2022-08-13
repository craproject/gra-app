export class CcipSubjectOfInvestigationModel {
    //crmId;
    //recordStatus;
    rowNo;
    name;
    governmentOrganization;
    //country;
    detailsOfInvestigation;
    outcome;
    //outcomeOthers;
    investigationFrom;
    investigationTo;

    static parseFromJson(data) {
        return {
            wasSubjectOfInvestigation: data.Sec_3B_Checkbox,
            tableName:"Sec_3B_Yes_Table",
            subjectOfInvestigationTable:
                data.Sec_3B_Yes_Table?.map(item => {
                    return {
                        name: item.Sec_3B_Name,
                        governmentOrganization: item.Sec_3B_Government_of_Organization,
                        detailsOfInvestigation: item.Sec_3B_Details_of_Investigation,
                        //wasTestimonyGiven: item.Sec_7C_Was_Testimony_Given,
                        //dateTestimony: item.Sec_7C_Date_Testimony,
                        //wasCaseConcluded: item.Sec_7C_Case_Concluded,
                        outcome: item.Sec_3B_Outcome,
                        investigationFrom: item.Sec_3B_Investigation_From,
                        investigationTo: item.Sec_3B_Investigation_To,
                        rowNo: item.RowNo
                        //crmId: item.CRM_ID,
                        //recordStatus: item.RecordStatus
                    };
                }) ?? []
        };
    }

    static toJsonApi(model) {
        return {
            Sec_3B_Checkbox: model.wasSubjectOfInvestigation,
            Sec_3B_Yes_Table: model.subjectOfInvestigationTable.map(item => {
                return {
                    Sec_3B_Name: item.name,
                    Sec_3B_Government_of_Organization: item.governmentOrganization,
                    Sec_3B_Details_of_Investigation: item.detailsOfInvestigation,
                    //Sec_7C_Was_Testimony_Given: item.wasTestimonyGiven,
                    //Sec_7C_Date_Testimony: item.dateTestimony,
                    //Sec_7C_Case_Concluded: item.wasCaseConcluded,
                    Sec_3B_Outcome: item.outcome,
                    Sec_3B_Investigation_From: item.investigationFrom,
                    Sec_3B_Investigation_To: item.investigationTo,
                    RowNo: item.rowNo
                    //CRM_ID: item.crmId,
                    //RecordStatus: item.recordStatus
                };
            })
        };
    }
}
