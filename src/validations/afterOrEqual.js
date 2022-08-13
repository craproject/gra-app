import { DateTime } from "luxon";

export function afterOrEqual(from, to) {
    let startDate = DateTime.fromISO(from);
    if (!startDate.isValid) return true;

    let endDate = DateTime.fromISO(to);
    if (!endDate.isValid) return true;

    return startDate <= endDate;
}
