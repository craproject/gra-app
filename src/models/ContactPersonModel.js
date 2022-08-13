export class ContactPersonModel {
    rowNo;
    salutation;
    name;
    citizenshipType;
    nric;
    countryIdNumber;
    country;
    positionHeld;
    officePhoneNumber;
    mobilePhoneNumber;
    email;

    static parseFromJson(data) {
        return {
            //haveEverBeenArrested: data.Sec_2_Checkbox,
            tableName:"Sec_2_Yes_Table",
            contactPersonTable:
                data.Sec_2_Yes_Table?.map(item => {
                    return {
                        salutation: item.Sec_2_Salutation,
                        name: item.Sec_2_Name,
                        citizenshipType: item.Sec_2_Identification_Type,
                        nric: item.Sec_2_Identification_Number,
                        countryIdNumber: item.Sec_2_Country_Identification_Number,
                        country: item.Sec_2_Country_of_Issue,
                        positionHeld: item.Sec_2_Position_Held,
                        officePhoneNumber: item.Sec_2_Office_Phone_Number ,
                        mobilePhoneNumber: item.Sec_2_Mobile_Phone_Number ,
                        email: item.Sec_2_Email_Address,
                        rowNo: item.RowNo
                        //crmId: item.CRM_ID,
                        //recordStatus: item.RecordStatus
                    };
                }) ?? []
        };
    }

    static toJsonApi(model) {
        return {
            Sec_2_Yes_Table: model.contactPersonTable.map(item => {
                return {
                    salutation: item.salutation,
                    name: item.name,
                    citizenshipType: item.citizenshipType,
                    nric: item.nric,
                    
                    countryIdNumber: item.countryIdNumber,
                    //Sec_2_Country: item.country,
                    country: item.country,
                    positionHeld: item.positionHeld,
                    officePhoneNumber: item.officePhoneNumber,
                    mobilePhoneNumber: item.mobilePhoneNumber,
                    email: item.email,
                    rowNo: item.rowNo
                    //CRM_ID: item.crmId,
                    //RecordStatus: item.recordStatus
                };
            })
        };
    }

}
