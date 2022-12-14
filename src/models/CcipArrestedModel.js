export class CcipArrestedModel {
    //crmId;
    //recordStatus;
    rowNo;
    nameOfCase;
    dateOfCharge;
    natureOfCharge;
    //location;
    name;
    address;
    //dateOfArrest;
    //country;
    disposition;
    //outcomeOthers;
    sentence;

    static convertJson(model) {
        return {
            arrestedTable: model.arrestedTable.map(item => {
                return {
                    nameOfCase: item.nameOfCase,
                    dateOfCharge: item.dateOfCharge,
                    natureOfCharge: item.natureOfCharge,
                    name: item.name,
                    address: item.address,
                    disposition: item.disposition,
                    sentence: item.sentence,
                    rowNo: item.RowNo
                };
            })
        };
    }

    static parseFromJson(data) {
        return {
            haveEverBeenArrested: data.Sec_3A_Checkbox,
            tableName:"Sec_3A_Yes_Table",
            arrestedTable:
                data.Sec_3A_Yes_Table?.map(item => {
                    return {
                        nameOfCase: item.Sec_3A_Name_of_Case,
                        dateOfCharge: item.Sec_3A_Date_of_Charge,
                        natureOfCharge: item.Sec_3A_Nature_of_Charge,
                        //location: item.Sec_3A_Location,
                        //dateOfArrest: item.Sec_3A_Date_of_Arrest,
                        name: item.Sec_3A_Name_of_Law_Enforcement_Agency,
                        address: item.Sec_3A_Address,
                        //country: item.Sec_3A_Country,
                        disposition: item.Sec_3A_Disposition,
                        //outcomeOthers: item.Sec_3A_Outcome_Others,
                        sentence: item.Sec_3A_Sentence,
                        rowNo: item.RowNo
                        //crmId: item.CRM_ID,
                        //recordStatus: item.RecordStatus
                    };
                }) ?? []
        };
    }

    static toJsonApi(model) {
        return {
            Sec_3A_Checkbox: model.haveEverBeenArrested,
            Sec_3A_Yes_Table: model.arrestedTable.map(item => {
                return {
                    Sec_3A_Name_of_Case: item.nameOfCase,
                    //Sec_3A_Date_of_Arrest: item.dateOfArrest,
                    Sec_3A_Date_of_Charge: item.dateOfCharge,
                    Sec_3A_Nature_of_Charge: item.natureOfCharge,
                    Sec_3A_Name_of_Law_Enforcement_Agency: item.name,
                    
                    Sec_3A_Address: item.address,
                    //Sec_3A_Country: item.country,
                    Sec_3A_Disposition: item.disposition,
                    Sec_3A_Sentence: item.sentence,
                    RowNo: item.rowNo
                    //CRM_ID: item.crmId,
                    //RecordStatus: item.recordStatus
                };
            })
        };
    }
}
