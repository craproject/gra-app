import { helpers } from "@vuelidate/validators";

export function nricValidator(nricInput) { // FIN
    if (!nricInput) return true;

    // validation rules
    const nricRegex = /(\D)(\d{7})(\D)/;
    const nricTypeRegex = /F|G|M/;
    const weightArr = [2, 7, 6, 5, 4, 3, 2];
    const nricLetterFG = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];
    const mFinLetters = ["X", "W", "U", "T", "R", "Q", "P", "N", "J", "L", "K"];

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

    // if the nric type is G, add 4 to the total
    if (nricType === "G") {
        total += 4;
    }

     // if the fin type is M, add 3 to the total
     if (nricType === "M") {
        total += 3;
    }

    // check last letter of nric for local
    const letterIndex = total % 11;
    const nricLetter = nricArr[3];

    // check last letter of fin
    if(nricType === "M"){
        return mFinLetters[letterIndex] === nricLetter;
    }
    else{
        return nricLetterFG[letterIndex] === nricLetter;
    }
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

export function nricByType(type, value) {
    if(type === "Singapore Citizen" || type ==="Permanent Resident"){
        return SCnricValidator(value); // NRIC
    }
    else if(type === "Work Pass Holder"){
        return nricValidator(value); // FIN
    }
    // return type === "Singapore Citizen" || type ==="Permanent Resident" ? SCnricValidator(value) : nricValidator(value);
}
