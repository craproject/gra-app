import store from "../store";
import { ContactPersonModel } from "../models/ContactPersonModel";

export function getJsonObject() {
    //     let data= {
    //         "LicenceType": store.getters.getSection0,
    //         "Applicant": [
    //             {
    //               "nameOfApplicant": store.getters.getSection1.nameOfApplicant,
    //               "entityType": store.getters.getSection1.entityType,
    //               "entityType_other": store.getters.getSection1.entityType_other,
    //               "natureEntity": store.getters.getSection1.natureEntity,
    //               "natureEntity_other": store.getters.getSection1.natureEntity_other,
    //               "uen": store.getters.getSection1.uen,
    //               "descriptionOfOperations":store.getters.getSection1.descriptionOfOperations,
    //               "postalCode": store.getters.getSection1.postalCode,
    //               "address": store.getters.getSection1.address,
    //               "businessTelephoneNumber": store.getters.getSection1.businessTelephoneNumber,
    //               "websiteAddress":store.getters.getSection1.websiteAddress,
    //               "emailAddress": store.getters.getSection1.emailAddress,
    //               "emailCheckbox": store.getters.getSection1.emailCheckbox,
    //               "dateOfAppointment":
    //               store.getters.getSection1.dateOfAppointment
    //             }
    //           ],
    //           "Contact_Persons_Table":store.getters.getSection2A.Sec_2_Yes_Table,
    //           "haveEverBeenArrested": store.getters.getSection3A.haveEverBeenArrested,
    //           "Arrested_Table":store.getters.getSection3A.arrestedTable,
    //           "wasSubjectOfInvestigation": store.getters.getSection3B.wasSubjectOfInvestigation,
    //           "Investigation_Table": store.getters.getSection3B.subjectOfInvestigationTable,
    // "Particular_Executive_Table":store.getters.getSection4A.particularExecutiveTable,
    //         //   "Contact_Persons_Table": [
    //         //     store.getters.getSection2.map(table=>{
    //         //         let tableData={
    //         //             "salutation": table.salutation,
    //         //             "name": table.name,
    //         //             "citizenshipType": table.citizenshipType,
    //         //             "nric": table.nric,
    //         //             "countryIdNumber": table.countryIdNumber,
    //         //             "country": table.country,
    //         //             "positionHeld": table.positionHeld,
    //         //             "officePhoneNumber": table.officePhoneNumber,
    //         //             "mobilePhoneNumber": table.mobilePhoneNumber,
    //         //             "email": table.email,
    //         //             "RowNo": table.rowNo
    //         //         }
    //         // return tableData
    //         //     })
    //         //   ]
    //     }
    // Contact_Persons_Table: ContactPersonModel.convertJson(store.getters.getSection2A.Sec_2_Yes_Table) ,

    let data = {
        LicenceType: store.getters.getSection0,
        Applicant: [
            {
                NameOfApplicant: store.getters.getSection1.nameOfApplicant,
                EntityType: store.getters.getSection1.entityType,
                EntityType_Other: store.getters.getSection1.entityType_other,
                NatureEntity: store.getters.getSection1.natureEntity,
                NatureEntity_other: store.getters.getSection1.natureEntity_other,
                Uen: store.getters.getSection1.uen,
                DescriptionOfOperations: store.getters.getSection1.descriptionOfOperations,
                PostalCode: store.getters.getSection1.postalCode,
                Address: store.getters.getSection1.address,
                BusinessTelephoneNumber: store.getters.getSection1.businessTelephoneNumber,
                WebsiteAddress: store.getters.getSection1.websiteAddress,
                EmailAddress: store.getters.getSection1.emailAddress,
                EmailCheckbox: store.getters.getSection1.emailCheckbox,
                DateOfIncorporation: store.getters.getSection1.dateOfAppointment
            }
        ],
        Contact_Persons_Table: store.getters.getSection2A.Sec_2_Yes_Table,
        haveEverBeenArrested: store.getters.getSection3A.haveEverBeenArrested,
        Arrested_Table: store.getters.getSection3A.arrestedTable,
        wasSubjectOfInvestigation: store.getters.getSection3B.wasSubjectOfInvestigation,
        Investigation_Table: store.getters.getSection3B.subjectOfInvestigationTable,
        Particular_Executive_Table: store.getters.getSection4A.particularExecutiveTable
    };

    return data;
}
