export class CcipData {
    static parseFromJson(data) {
        return {
            crmId: data.CRM_ID
        };
    }

    static toJsonApi(model) {
        return {
            CRM_ID: model.crmId
        };
    }
}
