import {getExRateData} from "@/data/xRateData";
export function useExRate() {
    // const rates = [
    //     { id: "7b1384ba-b4c8-eb11-9676-005056b57f58", value: 0.00005739 },
    //     { id: "9d42069a-fcbc-eb11-9676-005056b57f58", value: 1.6129 },
    //     { id: "91f9b571-bbae-eb11-966c-005056b57f58", value: 1.0 },
    //     { id: "1f5ca3ee-91c7-eb11-9676-005056b57f58", value: 1.31578 }
    // ];
    
    function getExRateById(id) {
        return getExRateData().find(r => r.Id === id)?.Value;
    }
    
    return { getExRateById };
}
