import { DateTime } from "luxon";

export default function minAge(dateOfBirth, minValue) {
    // Check input date
    let dob = DateTime.fromISO(dateOfBirth);
    if (!dob.isValid) return false;

    let today = DateTime.now();

    // Calculate age
    let age = today.diff(dob, "years").years;

    // Adjust age base on month and date
    let monthDiff = today.diff(dob, "months").months;
    if (monthDiff < 0 || (monthDiff === 0 && today.day < dob.day)) {
        age--;
    }

    return age >= minValue;
}
