import store from "../store";
import { ContactPersonModel } from "../models/ContactPersonModel";
import { ApplicantDataModel } from "../models/ApplicantDataModel";
import { CcipArrestedModel } from "../models/CcipArrestedModel";
import { CcipSubjectOfInvestigationModel } from "../models/CcipSubjectOfInvestigationModel";
import { ParticularExecutiveModel } from "../models/ParticularExecutiveModel";

export function getJsonObject() {
    let LicenceType = store.getters.getSection0;
    let Applicant = ApplicantDataModel.convertJson(store.getters.getSection1);
    let Contact_Persons_Table = ContactPersonModel.convertJson(store.getters.getSection2A)
        .Contact_Persons_Table;
    let haveEverBeenArrested = store.getters.getSection3A.haveEverBeenArrested;
    let Arrested_Table = CcipArrestedModel.convertJson(store.getters.getSection3A).arrestedTable;
    let wasSubjectOfInvestigation = store.getters.getSection3B.wasSubjectOfInvestigation;
    let Investigation_Table = CcipSubjectOfInvestigationModel.convertJson(
        store.getters.getSection3B
    ).subjectOfInvestigationTable;
    let Particular_Executive_Table = ParticularExecutiveModel.convertJson(
        store.getters.getSection4A
    ).particularExecutiveTable;

    let data = {
        LicenceType,
        Applicant,
        Contact_Persons_Table,
        haveEverBeenArrested,
        Arrested_Table,
        wasSubjectOfInvestigation,
        Investigation_Table,
        Particular_Executive_Table
    };

    return data;
}
