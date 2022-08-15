//import { MyInfoMapping } from "@/data/myInfoMapping";

export class ApplicantDataModel {
    nameOfApplicant;
    entityType;
    entityType_other;
    natureEntity;
    natureEntity_other;
    uen;
    descriptionOfOperations;
    postalCode;
    address;
    businessTelephoneNumber;
    websiteAddress;
    emailAddress;
    emailCheckbox;
    dateOfAppointment;

    static parseFromJson(data) {
        return {
            NameOfApplicant: data.nameOfApplicant,
            EntityType: data.entityType,
            EntityType_Other: data.entityType_other,
            NatureEntity: data.natureEntity,
            NatureEntity_other: data.natureEntity_other,
            Uen: data.uen,
            DescriptionOfOperations: data.descriptionOfOperations,
            PostalCode: data.postalCode,
            Address: data.address,
            BusinessTelephoneNumber: data.businessTelephoneNumber,
            WebsiteAddress: data.websiteAddress,
            EmailAddress: data.emailAddress,
            EmailCheckbox: data.emailCheckbox,
            DateOfAppointment: data.dateOfAppointment
        
        };
    }

    // static toJsonApi(model) {
    //     return {
    //         NameOfApplicant: model.nameOfApplicant,
    //         EntityType: model.entityType,
    //         EntityType_Other: model.entityType_other,
    //         NatureEntity: model.natureEntity,
    //         NatureEntity_other: model.natureEntity_other,
    //         Uen: model.uen,
    //         DescriptionOfOperations: model.descriptionOfOperations,
    //         PostalCode: model.postalCode,
    //         Address: model.address,
    //         BusinessTelephoneNumber: model.businessTelephoneNumber,
    //         WebsiteAddress: model.websiteAddress,
    //         EmailAddress: model.emailAddress,
    //         EmailCheckbox: model.emailCheckbox,
    //         DateOfAppointment: model.dateOfAppointment
    //     };
    // }
}
