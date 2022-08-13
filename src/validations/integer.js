export default function integerValidator(value) {
	return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}