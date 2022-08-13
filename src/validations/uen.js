import { helpers } from "@vuelidate/validators";

export function uenValidator(uen) { // FIN
    if (!uen || String(uen) === "") return true;

    // validation rules
    const entityTypeIndicator = [
        "LP",
        "LL",
        "FC",
        "PF",
        "RF",
        "MQ",
        "MM",
        "NB",
        "CC",
        "CS",
        "MB",
        "FM",
        "GS",
        "GA",
        "GB",
        "DP",
        "CP",
        "NR",
        "CM",
        "CD",
        "MD",
        "HS",
        "VH",
        "CH",
        "MH",
        "CL",
        "XL",
        "CX",
        "RP",
        "TU",
        "TC",
        "FB",
        "FN",
        "PA",
        "PB",
        "SS",
        "MC",
        "SM",
    ];
    
    if (uen.length < 9 || uen.length > 10) {
        //if (debug) {
        //    console.log("UEN is not 9 or 10 digits");
        //}
        return false;
    }

    uen = uen.toUpperCase();
        var uenStrArray = uen.split("");

        // (A) Businesses registered with ACRA
        if (uenStrArray.length === 9) {
            // check that last character is a letter
            if (!isNaN(uenStrArray[uenStrArray.length - 1])) {
                //if (debug) {
                //    console.log("(A) last character is not an alphabet");
                //}
                return false;
            }

            for (let i = 0; i < uenStrArray.length - 1; i++) {
                // check that first 8 letters are all numbers
                if (isNaN(uenStrArray[i])) {
                    //if (debug) {
                    //    console.log("(A) there are non-numbers in 1st to 8th letters");
                    //}
                    return false;
                }
            }

            // (A) Businesses registered with ACRA (SUCCESS)
            //if (debug) {
            //    console.log("valid (A) Businesses registered with ACRA");
            //}
            return true;
        } else if (uenStrArray.length === 10) {
            // check that last character is a letter
            if (!isNaN(uenStrArray[uenStrArray.length - 1])) {
                //if (debug) {
                //    console.log("(B)(C) last character is not an alphabet");
                //}
                return false;
            }

            // (B) Local companies registered with ACRA
            if (!isNaN(uenStrArray[0]) && !isNaN(uenStrArray[1]) && !isNaN(uenStrArray[2]) && !isNaN(uenStrArray[3])) {
                // check that 5th to 9th letters are all numbers
                if (
                    !isNaN(uenStrArray[4]) &&
                    !isNaN(uenStrArray[5]) &&
                    !isNaN(uenStrArray[6]) &&
                    !isNaN(uenStrArray[7]) &&
                    !isNaN(uenStrArray[8])
                ) {
                    // (B) Local companies registered with ACRA (SUCCESS)
                    //if (debug) {
                    //    console.log("valid (B) Local companies registered with ACRA");
                    //}
                    return true;
                } else {
                    //if (debug) {
                    //    console.log("(B) there are non-numbers in 5th to 9th letters");
                    //}
                    return false;
                }
            }
            // (C) All other entities which will be issued new UEN
            else {
                // check that 1st letter is either T or S or R
                if (uenStrArray[0] !== "T" && uenStrArray[0] !== "S" && uenStrArray[0] !== "R") {
                    //if (debug) {
                    //    console.log("(C) 1st letter is incorrect");
                    //}
                    return false;
                }

                // check that 2nd and 3rd letters are numbers only
                if (isNaN(uenStrArray[1]) || isNaN(uenStrArray[2])) {
                    //if (debug) {
                    //    console.log("(C) 2nd and 3rd letter is incorrect");
                    //}
                    return false;
                }

                // check that 4th letter is an alphabet
                if (!isNaN(uenStrArray[3])) {
                    //if (debug) {
                    //    console.log("(C) 4th letter is not an alphabet");
                    //}
                    return false;
                }

                // check entity-type indicator
                var entityTypeMatch = false,
                    entityType = String(uenStrArray[3]) + String(uenStrArray[4]);
                for (let i = 0; i < entityTypeIndicator.length; i++) {
                    if (String(entityTypeIndicator[i]) === String(entityType)) {
                        entityTypeMatch = true;
                    }
                }
                if (!entityTypeMatch) {
                    //if (debug) {
                    //    console.log("(C) entity-type indicator is invalid");
                    //}
                    return false;
                }

                // check that 6th to 9th letters are numbers only
                if (isNaN(uenStrArray[5]) || isNaN(uenStrArray[6]) || isNaN(uenStrArray[7]) || isNaN(uenStrArray[8])) {
                    //if (debug) {
                        console.log("(C) 2nd and 3rd letter is incorrect");
                    //}
                    //return false;
                }

                // (C) All other entities which will be issued new UEN (SUCCESS)
                //if (debug) {
                //    console.log("valid (C) All other entities which will be issued new UEN");
                //}
                return true;
            }
        }

        return false;
}

export function SCnricValidator(nricInput) { // NRIC
    if (!nricInput) return true;

    // validation rules
    const nricRegex = /(\D)(\d{7})(\D)/;
    const nricTypeRegex = /S|T|F|G|M/;
    const weightArr = [2, 7, 6, 5, 4, 3, 2];
    const nricLetterST = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
    const nricLetterFG = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];

    // set nric to all uppercase to remove case sensitivity
    const nric = nricInput.toUpperCase();

    // returns false if it false basic validation
    if (!nricRegex.exec(nric)) {
        return false;
    }

    // get nric type
    const nricArr = nric.match(nricRegex);
    const nricType = nricArr[1];

    // returns false if it false basic validation
    if (!nricTypeRegex.exec(nricType)) {
        return false;
    }

    // multiply each digit in the nric number by it's weight in order
    const nricDigitsArr = nricArr[2].split("");
    let total = 0;
    for (let i = 0; i < nricDigitsArr.length; i++) {
        total += parseInt(nricDigitsArr[i]) * weightArr[i];
    }

    // if the nric type is T or G, add 4 to the total
    if (["T", "G"].indexOf(nricType) >= 0) {
        total += 4;
    }

     // if the nric type is M, add 3 to the total
     if (nricType === "M") {
        total += 3;
    }

    // check last letter of nric for local
    const letterIndex = total % 11;
    const nricLetter = nricArr[3];
    if (["S", "T"].indexOf(nricType) >= 0) {
        return nricLetterST[letterIndex] === nricLetter;
    }

    // check last letter of nric for foreigners
    return nricLetterFG[letterIndex] === nricLetter;
}

// export function NCnricValidator(nricInput) {
//     if (!nricInput) return true;

//     // validation rules
//     const nricRegex = /(\D)(\d{7})(\D)/;
//     const nricTypeRegex = /F|G/;
//     const weightArr = [2, 7, 6, 5, 4, 3, 2];
//     const nricLetterST = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
//     const nricLetterFG = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];

//     // set nric to all uppercase to remove case sensitivity
//     const nric = nricInput.toUpperCase();

//     // returns false if it false basic validation
//     if (!nricRegex.exec(nric)) {
//         return false;
//     }

//     // get nric type
//     const nricArr = nric.match(nricRegex);
//     const nricType = nricArr[1];

//     // returns false if it false basic validation
//     if (!nricTypeRegex.exec(nricType)) {
//         return false;
//     }

//     // multiply each digit in the nric number by it's weight in order
//     const nricDigitsArr = nricArr[2].split("");
//     let total = 0;
//     for (let i = 0; i < nricDigitsArr.length; i++) {
//         total += parseInt(nricDigitsArr[i]) * weightArr[i];
//     }

//     // if the nric type is T or G, add 4 to the total
//     if (["T", "G"].indexOf(nricType) >= 0) {
//         total += 4;
//     }

//     // check last letter of nric for local
//     const letterIndex = total % 11;
//     const nricLetter = nricArr[3];
//     if (["S", "T"].indexOf(nricType) >= 0) {
//         return nricLetterST[letterIndex] === nricLetter;
//     }

//     // check last letter of nric for foreigners
//     return nricLetterFG[letterIndex] === nricLetter;
// }

export function UEN(value) {
    return uenValidator(value);
    //if(type === "Singapore Citizen" || type ==="Permanent Resident"){
    //    return SCnricValidator(value); // NRIC
    //}
    //else if(type === "Work Pass Holder"){
    //    return nricValidator(value); // FIN
    //}
    // return type === "Singapore Citizen" || type ==="Permanent Resident" ? SCnricValidator(value) : nricValidator(value);
}
