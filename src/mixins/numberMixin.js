export default {
    methods: {
        isNumeric(str) {
            return !isNaN(str) && !isNaN(parseFloat(str));
        }
    }
};
