export default function ageValidator({ value }, ...args) {
    let today = new Date();
    let birthDate = new Date(value);
    if (birthDate instanceof Date && !isNaN(birthDate)) {
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        let x = !isNaN(args[0]) ? Number(args[0]) : 0;
        let y = args[1];
        return y === "max" ? age <= x : y === "min" ? age >= x : true;
    } else return false;
}
