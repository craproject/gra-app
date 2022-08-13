import { getDiff } from "recursive-diff";

export default function useRecordStatus() {
    function setRecordStatus(original, current) {
        let currentData = current;
        let originalCrmIds = original?.map(o => o.crmId) ?? [];

        for (let currentItem of currentData) {
            // New
            if (currentItem.crmId === undefined || currentItem.crmId === "") {
                currentItem.recordStatus = 0;

                continue;
            }

            // Updated
            if (originalCrmIds.includes(currentItem.crmId)) {
                let originalItem = original.filter(i => i.crmId === currentItem.crmId);

                let changes = getDiff(originalItem, currentItem);
                if (changes.length > 0) {
                    currentItem.recordStatus = 1;

                    continue;
                }
            }
        }

        return currentData;
    }

    return { setRecordStatus };
}
