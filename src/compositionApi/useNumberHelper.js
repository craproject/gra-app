export function useNumberHelper() {
    const defaultLocale = "en-EN";

    /** Check if string contains valid number */
    function isNumeric(numberAsString) {
        return !isNaN(numberAsString) && !isNaN(parseFloat(numberAsString));
    }

    /** Format number as currency using Intl.NumberFormat */
    function toCurrency(number, locale = defaultLocale, options = {}) {
        if (number === undefined) number = 0;
        var convertToString = number.toString();
        if (convertToString.indexOf(",") > -1) {
            return number;
        }
        // console.log("number: "+number);
        let defaultOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
        let mergedOptions = Object.assign({}, defaultOptions, options);
        // console.log("mergedOptions: "+JSON.stringify(mergedOptions));
        // console.log("result: "+new Intl.NumberFormat(locale, mergedOptions).format(number));
        return new Intl.NumberFormat(locale, mergedOptions).format(number);
    }

    /** Format number as currency using Intl.NumberFormat */
    function toCurrencyWithNoDefault(number, locale = defaultLocale, options = {}) {
        if (number === undefined || number === null) return undefined;

        let defaultOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
        let mergedOptions = Object.assign({}, defaultOptions, options);

        return new Intl.NumberFormat(locale, mergedOptions).format(number);
    }

    /**
     * Parse a localized number to a float.
     * @param {string} stringNumber - the localized number
     * @param {string} locale - [optional] the locale that the number is represented in. Omit this parameter to use the current locale.
     */
    function parseLocaleNumber(stringNumber, locale = defaultLocale) {
        let thousandSeparator = Intl.NumberFormat(locale)
            .format(11111)
            .replace(/\p{Number}/gu, "");

        let decimalSeparator = Intl.NumberFormat(locale)
            .format(1.1)
            .replace(/\p{Number}/gu, "");

        return parseFloat(
            stringNumber
                .replace(new RegExp("\\" + thousandSeparator, "g"), "")
                .replace(new RegExp("\\" + decimalSeparator), ".")
        );
    }

    function toTwoDecimals(number) {
        return (Math.round(number * 100) / 100).toFixed(2);
    }

    return { isNumeric, toCurrency, toCurrencyWithNoDefault, parseLocaleNumber, toTwoDecimals };
}
