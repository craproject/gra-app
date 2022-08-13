import { CcipArrestedModel } from "@/models/CcipArrestedModel";
import { CcipSubjectOfInvestigationModel } from "@/models/CcipSubjectOfInvestigationModel";
import { ParticularExecutiveModel } from "@/models/ParticularExecutiveModel";
import { ContactPersonModel } from "@/models/ContactPersonModel";
import { PersonalDataModel } from "@/models/PersonalDataModel";


import { GeneralModel } from "@/models/GeneralModel";

import store from "@/store";
function parseSectionDataAndCommitToStore(sectionNumber, sectionData) {
    switch (sectionNumber) {
        case 0: {
            // let generalData = GeneralModel.parseFromJsonApi(sectionData);
            store.commit("setSection0", sectionData);

            break;
        }

        case 1: {
            // let personalData = PersonalDataModel.parseFromJsonApi(sectionData); // crmId, 1A, 1C, 1G

            //let citizenship = PersonalCitizenshipModel.parseFromJsonApi(sectionData);
            //let passport = PersonalPassportModel.parseFromJsonApi(sectionData);
            //let residentialAddress = PersonalResidentialAddressModel.parseFromJsonApi(sectionData);
            //let mailingAddress = PersonalMailingAddressModel.parseFromJsonApi(sectionData);
            //let contact = PersonalContactModel.parseFromJsonApi(sectionData);
            //let otherName = PersonalOtherNameModel.parseFromJsonApi(sectionData);
            //let characteristic = PersonalCharacteristicModel.parseFromJsonApi(sectionData);

            store.commit("setSection1", sectionData);

            //store.commit("setSection1BCitizen", citizenship);
            //store.commit("setSection1BPassport", passport);
            //store.commit("setSection1D", residentialAddress);
            //store.commit("setSection1E", mailingAddress);
            //store.commit("setSection1F", contact);
            // store.commit("setSection1G", personalData.race);
            //store.commit("setSection1H", otherName);
            //store.commit("setSection1I", characteristic);

            // console.log("personalData: " + JSON.stringify(personalData, null, 4));
            //console.log("citizenshipType: " + JSON.stringify(citizenship, null, 4));
            //console.log("passport: " + JSON.stringify(passport, null, 4));
            //console.log("residentialAddress: " + JSON.stringify(residentialAddress, null, 4));
            //console.log("mailingAddress: " + JSON.stringify(mailingAddress, null, 4));
            //console.log("contact: " + JSON.stringify(contact, null, 4));
            //console.log("otherName: " + JSON.stringify(otherName, null, 4));
            //console.log("characteristic: " + JSON.stringify(characteristic, null, 4));

            break;
        }

        case 2: {
            // let contactPersonData = ContactPersonModel.parseFromJsonApi(sectionData);
            store.commit("setSection2A", sectionData);
            // store.commit("setSection2", sectionData);


            console.log("contactPersonData: " + sectionData);

            break;
        }

        case 3: {
            //let section5Data = CcipData.parseFromJson(sectionData);

            let arrested = CcipArrestedModel.parseFromJson(sectionData);
            let subjectOfInvestigation = CcipSubjectOfInvestigationModel.parseFromJson(sectionData);
            
            //store.commit("setSection5", section5Data);
            store.commit("setSection3A", arrested);
            store.commit("setSection3B", subjectOfInvestigation);
            console.log("arrested" + JSON.stringify(arrested, null, 4));
            console.log("subjectOfInvestigation" + JSON.stringify(subjectOfInvestigation, null, 4));

            break;
        }
            
        case 4: {
            // let particularExcutiveData = ParticularExecutiveModel.parseFromJson(sectionData);
            store.commit("setSection4A", sectionData);
            console.log("particularExcutiveData: " + sectionData);

            // console.log("particularExcutiveData: " + JSON.stringify(particularExcutiveData, null, 4));

            break;
        }
    }
}

export { parseSectionDataAndCommitToStore };
