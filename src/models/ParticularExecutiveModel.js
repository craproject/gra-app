export class ParticularExecutiveModel {
    rowNo;
    salutation;
    name;
    gender;
    dateOfBirth;
    countryOfBirth;
    citizenshipType;
    nric;
    countryIdNumber;
    country;
    nationality;
    mainContactNumber;
    residentialAddress;
    email;
    positionHeld;
    dateOfAppointment;
    roles;
    anyArrestMade;
    anyCriminalCharges;
    anyInvestigationConducted;

    static convertJson(model) {
        return {
            particularExecutiveTable: model.particularExecutiveTable.map(item => {
                return {
                    salutation: item.salutation,
                    name: item.name,
                    gender: item.gender,
                    dateOfBirth: item.dateOfBirth,
                    countryOfBirth: item.countryOfBirth,
                    citizenshipType: item.citizenshipType,
                    nric: item.nric,
                    countryIdNumber: item.countryIdNumber,
                    country: item.country,
                    nationality: item.nationality,
                    mainContactNumber: item.mainContactNumber,
                    residentialAddress: item.residentialAddress,
                    email: item.email,
                    positionHeld: item.positionHeld,
                    dateOfAppointment: item.dateOfAppointment,
                    roles: item.roles,
                    anyArrestMade: item.anyArrestMade,
                    anyCriminalCharges: item.anyCriminalCharges,
                    anyInvestigationConducted: item.anyInvestigationConducted,
                    rowNo: item.rowNo
                };
            })
        };
    }

    static parseFromJson(data) {
        return {
            //haveEverBeenArrested: data.Sec_4_Checkbox,
            tableName:"Sec_4_Yes_Table",
            particularExecutiveTable:
                data.Sec_4_Yes_Table?.map(item => {
                    return {
                        salutation: item.Sec_4_Salutation,
                        name: item.Sec_4_Name,
                        gender: item.Sec_4_Gender,
                        dateOfBirth: item.Sec_4_Date_of_Birth,
                        countryOfBirth: item.Sec_4_Country_of_Birth,
                        citizenshipType: item.Sec_4_Identification_Type,
                        nric: item.Sec_4_Identification_Number,
                        //countryIdNumber: item.Sec_4_Country_Identification_Number,
                        country: item.Sec_4_Country_of_Issue,
                        nationality: item.Sec_4_Nationality,
                        mainContactNumber: item.Sec_4_Main_Contact_Number,
                        residentialAddress: item.Sec_4_Residential_Address,
                        email: item.Sec_4_Email_Address,
                        positionHeld: item.Sec_4_Position_Held,

                        dateOfAppointment: item.Sec_4_Date_of_Appointment,

                        roles: item.Sec_4_Roles,
                        anyArrestMade: item.Sec_4_Any_Arrest_Made,
                        anyCriminalCharges: item.Sec_4_Any_Criminal_Charges,
                        anyInvestigationConducted: item.Sec_4_Any_Investigation_Conducted,
                        rowNo: item.RowNo
                        //crmId: item.CRM_ID,
                        //recordStatus: item.RecordStatus
                    };
                }) ?? []
        };
    }

    static toJsonApi(model) {
        return {
            particularExecutiveTable: model.particularExecutiveTable.map(item => {
                return {
                    salutation: item.salutation,
                    name: item.name,
                    gender: item.gender,
                    dateOfBirth: item.dateOfBirth,
                    countryOfBirth: item.countryOfBirth,
                    citizenshipType: item.citizenshipType,
                    nric: item.nric,
                    
                    countryIdNumber: item.countryIdNumber,
                    //Sec_4_Country: item.country,
                    country: item.country,
                    nationality: item.nationality,
                    mainContactNumber: item.mainContactNumber,
                    residentialAddress: item.residentialAddress,
                    
                    email: item.email,
                    positionHeld: item.positionHeld,

                    dateOfAppointment: item.dateOfAppointment,

                    roles: item.roles,
                    anyArrestMade: item.anyArrestMade,
                    anyCriminalCharges: item.anyCriminalCharges,
                    anyInvestigationConducted: item.anyInvestigationConducted,
                    rowNo: item.rowNo
                    //CRM_ID: item.crmId,
                    //RecordStatus: item.recordStatus
                };
            })
        };
    }

}
