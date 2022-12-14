/**
 * Vue Currency Input 1.22.6
 * (c) 2018-2021 Matthias Stiller
 * @license MIT
 */
var escapeRegExp = function(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var removeLeadingZeros = function(str) {
    return str.replace(/^0+(0$|[^0])/, "$1");
};
var count = function(str, search) {
    return (str.match(new RegExp(escapeRegExp(search), "g")) || []).length;
};
var startsWith = function(str, search) {
    return str.substring(0, search.length) === search;
};
var substringBefore = function(str, search) {
    return str.substring(0, str.indexOf(search));
};

var DECIMAL_SYMBOLS = [",", ".", "٫"];
var INTEGER_PATTERN = "(0|[1-9]\\d*)";
var NumberFormat = function NumberFormat(options) {
    var currency = options.currency;
    var locale = options.locale;
    var precision = options.precision;
    var autoDecimalMode = options.autoDecimalMode;
    var valueAsInteger = options.valueAsInteger;
    var numberFormat = new Intl.NumberFormat(
        locale,
        typeof currency === "string" ? { currency: currency, style: "currency" } : { minimumFractionDigits: 1 }
    );
    var ps = numberFormat.format(123456);
    this.locale = locale;
    this.currency = currency;
    this.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(i) {
        return i.toLocaleString(locale);
    });
    this.decimalSymbol = count(ps, this.digits[0]) ? ps.substr(ps.indexOf(this.digits[6]) + 1, 1) : undefined;
    this.groupingSymbol = ps.substr(ps.indexOf(this.digits[3]) + 1, 1);
    this.minusSymbol = substringBefore(Number(-1).toLocaleString(locale), this.digits[1]);
    if (this.decimalSymbol === undefined) {
        this.minimumFractionDigits = this.maximumFractionDigits = 0;
    } else if (typeof precision === "number") {
        this.minimumFractionDigits = this.maximumFractionDigits = precision;
    } else if (typeof precision === "object" && !autoDecimalMode && !valueAsInteger) {
        this.minimumFractionDigits = precision.min || 0;
        this.maximumFractionDigits = precision.max !== undefined ? precision.max : 20;
    } else if (typeof currency === "string") {
        this.minimumFractionDigits = numberFormat.resolvedOptions().minimumFractionDigits;
        this.maximumFractionDigits = numberFormat.resolvedOptions().maximumFractionDigits;
    } else {
        this.minimumFractionDigits = this.maximumFractionDigits = 2;
    }
    if (typeof currency === "string") {
        this.prefix = substringBefore(ps, this.digits[1]);
        this.negativePrefix = substringBefore(numberFormat.format(-1), this.digits[1]);
        this.suffix = ps.substring(ps.lastIndexOf(this.decimalSymbol ? this.digits[0] : this.digits[6]) + 1);
    } else {
        this.prefix = (currency || {}).prefix || "";
        this.negativePrefix = "" + this.minusSymbol + this.prefix;
        this.suffix = (currency || {}).suffix || "";
    }
};
NumberFormat.prototype.parse = function parse(str, valueAsInteger) {
    if (valueAsInteger === void 0) valueAsInteger = false;
    if (str) {
        var negative = this.isNegative(str);
        str = this.normalizeDigits(str);
        str = this.stripCurrencySymbol(str);
        str = this.stripMinusSymbol(str);
        var fraction = this.decimalSymbol ? "(?:" + escapeRegExp(this.decimalSymbol) + "(\\d*))?" : "";
        var match = this.stripGroupingSymbol(str).match(new RegExp("^" + INTEGER_PATTERN + fraction + "$"));
        if (match && this.isValidIntegerFormat(str.split(this.decimalSymbol)[0], Number(match[1]))) {
            var number = Number("" + (negative ? "-" : "") + match[1] + "." + (match[2] || ""));
            return valueAsInteger
                ? Number(
                      number
                          .toFixed(this.maximumFractionDigits)
                          .split(".")
                          .join("")
                  )
                : number;
        }
    }
    return null;
};
NumberFormat.prototype.isValidIntegerFormat = function isValidIntegerFormat(str, integerNumber) {
    var options =
        typeof this.currency === "string"
            ? { style: "currency", currency: this.currency, minimumFractionDigits: 0 }
            : {};
    return [
        this.stripCurrencySymbol(
            this.normalizeDigits(
                integerNumber.toLocaleString(this.locale, Object.assign({}, options, { useGrouping: true }))
            )
        ),
        this.stripCurrencySymbol(
            this.normalizeDigits(
                integerNumber.toLocaleString(this.locale, Object.assign({}, options, { useGrouping: false }))
            )
        ),
    ].includes(str);
};
NumberFormat.prototype.format = function format(number, options) {
    if (options === void 0)
        options = {
            minimumFractionDigits: this.minimumFractionDigits,
            maximumFractionDigits: this.maximumFractionDigits,
        };
    if (typeof this.currency === "string") {
        return number.toLocaleString(
            this.locale,
            Object.assign({}, { style: "currency", currency: this.currency }, options)
        );
    } else {
        return this.insertCurrencySymbol(
            Math.abs(number).toLocaleString(this.locale, options),
            number < 0 || (number === 0 && 1 / number < 0)
        );
    }
};
NumberFormat.prototype.toFraction = function toFraction(str) {
    return (
        "" +
        this.digits[0] +
        this.decimalSymbol +
        this.onlyLocaleDigits(str.substr(1)).substr(0, this.maximumFractionDigits)
    );
};
NumberFormat.prototype.isFractionIncomplete = function isFractionIncomplete(str) {
    return !!this.normalizeDigits(this.stripGroupingSymbol(str)).match(
        new RegExp("^" + INTEGER_PATTERN + escapeRegExp(this.decimalSymbol) + "$")
    );
};
NumberFormat.prototype.isNegative = function isNegative(str) {
    return startsWith(str, this.negativePrefix) || startsWith(str.replace("-", this.minusSymbol), this.minusSymbol);
};
NumberFormat.prototype.insertCurrencySymbol = function insertCurrencySymbol(str, negative) {
    return "" + (negative ? this.negativePrefix : this.prefix) + str + this.suffix;
};
NumberFormat.prototype.stripGroupingSymbol = function stripGroupingSymbol(str) {
    return str.replace(new RegExp(escapeRegExp(this.groupingSymbol), "g"), "");
};
NumberFormat.prototype.stripMinusSymbol = function stripMinusSymbol(str) {
    return str.replace("-", this.minusSymbol).replace(this.minusSymbol, "");
};
NumberFormat.prototype.stripCurrencySymbol = function stripCurrencySymbol(str) {
    return str
        .replace(this.negativePrefix, "")
        .replace(this.prefix, "")
        .replace(this.suffix, "");
};
NumberFormat.prototype.normalizeDecimalSymbol = function normalizeDecimalSymbol(str, from) {
    var this$1 = this;
    DECIMAL_SYMBOLS.forEach(function(s) {
        str = str.substr(0, from) + str.substr(from).replace(s, this$1.decimalSymbol);
    });
    return str;
};
NumberFormat.prototype.normalizeDigits = function normalizeDigits(str) {
    if (this.digits[0] !== "0") {
        this.digits.forEach(function(digit, index) {
            str = str.replace(new RegExp(digit, "g"), index);
        });
    }
    return str;
};
NumberFormat.prototype.onlyDigits = function onlyDigits(str) {
    return this.normalizeDigits(str).replace(/\D+/g, "");
};
NumberFormat.prototype.onlyLocaleDigits = function onlyLocaleDigits(str) {
    return str.replace(new RegExp("[^" + this.digits.join("") + "]*", "g"), "");
};

var DEFAULT_OPTIONS = {
    locale: undefined,
    currency: "EUR",
    valueAsInteger: false,
    distractionFree: true,
    precision: undefined,
    autoDecimalMode: false,
    valueRange: undefined,
    allowNegative: true,
};
var format = function(numberValue, options) {
    var mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    return new NumberFormat(mergedOptions).format(numberValue);
};
var parse = function(formattedValue, options) {
    var mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    return new NumberFormat(mergedOptions).parse(formattedValue, mergedOptions.valueAsInteger);
};
var getValue = function(ref) {
    return (ref.$el || ref).$ci.getValue();
};
var setValue = function(ref, value) {
    (ref.$el || ref).$ci.setValue(value);
};

var equal = function(a, b) {
    if (a === b) {
        return true;
    }
    if (!a || !b || typeof a !== "object" || typeof b !== "object") {
        return false;
    }
    var keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) {
        return false;
    }
    if (!keys.every(Object.prototype.hasOwnProperty.bind(b))) {
        return false;
    }
    return keys.every(function(key) {
        return equal(a[key], b[key]);
    });
};

var DefaultNumberMask = function DefaultNumberMask(numberFormat) {
    this.numberFormat = numberFormat;
};
DefaultNumberMask.prototype.conformToMask = function conformToMask(str, previousConformedValue) {
    var this$1 = this;
    if (previousConformedValue === void 0) previousConformedValue = "";
    var negative = this.numberFormat.isNegative(str);
    var checkIncompleteValue = function(str) {
        if (str === "" && negative && previousConformedValue !== this$1.numberFormat.negativePrefix) {
            return "";
        } else if (this$1.numberFormat.maximumFractionDigits > 0) {
            if (this$1.numberFormat.isFractionIncomplete(str)) {
                return str;
            } else if (startsWith(str, this$1.numberFormat.decimalSymbol)) {
                return this$1.numberFormat.toFraction(str);
            }
        }
        return null;
    };
    var value = str;
    value = this.numberFormat.stripCurrencySymbol(value);
    value = this.numberFormat.stripMinusSymbol(value);
    var incompleteValue = checkIncompleteValue(value);
    if (incompleteValue != null) {
        return this.numberFormat.insertCurrencySymbol(incompleteValue, negative);
    }
    var ref = value.split(this.numberFormat.decimalSymbol);
    var integer = ref[0];
    var fraction = ref.slice(1);
    var integerDigits = removeLeadingZeros(this.numberFormat.onlyDigits(integer));
    var fractionDigits = this.numberFormat
        .onlyDigits(fraction.join(""))
        .substr(0, this.numberFormat.maximumFractionDigits);
    var invalidFraction = fraction.length > 0 && fractionDigits.length === 0;
    var invalidNegativeValue =
        integerDigits === "" &&
        negative &&
        (previousConformedValue === str.slice(0, -1) || previousConformedValue !== this.numberFormat.negativePrefix);
    if (invalidFraction || invalidNegativeValue) {
        return previousConformedValue;
    } else if (integerDigits.match(/\d+/)) {
        return {
            numberValue: Number("" + (negative ? "-" : "") + integerDigits + "." + fractionDigits),
            fractionDigits: fractionDigits,
        };
    } else {
        return "";
    }
};
var AutoDecimalModeNumberMask = function AutoDecimalModeNumberMask(numberFormat) {
    this.numberFormat = numberFormat;
};
AutoDecimalModeNumberMask.prototype.conformToMask = function conformToMask(str) {
    if (str === "") {
        return "";
    }
    var negative = this.numberFormat.isNegative(str);
    var numberValue =
        this.numberFormat.stripMinusSymbol(str) === ""
            ? -0
            : Number("" + (negative ? "-" : "") + removeLeadingZeros(this.numberFormat.onlyDigits(str))) /
              Math.pow(10, this.numberFormat.minimumFractionDigits);
    return {
        numberValue: numberValue,
        fractionDigits: numberValue
            .toFixed(this.numberFormat.minimumFractionDigits)
            .slice(-this.numberFormat.minimumFractionDigits),
    };
};

var getCaretPositionAfterFormat = function(newValue, inputtedValue, caretPosition, numberFormat, options) {
    var prefix = numberFormat.prefix;
    var suffix = numberFormat.suffix;
    var decimalSymbol = numberFormat.decimalSymbol;
    var maximumFractionDigits = numberFormat.maximumFractionDigits;
    var groupingSymbol = numberFormat.groupingSymbol;
    var decimalSymbolPosition = inputtedValue.indexOf(decimalSymbol) + 1;
    var caretPositionFromLeft = inputtedValue.length - caretPosition;
    if (Math.abs(newValue.length - inputtedValue.length) > 1 && caretPosition <= decimalSymbolPosition) {
        return newValue.indexOf(decimalSymbol) + 1;
    } else if (
        newValue.substr(caretPosition, 1) === groupingSymbol &&
        count(newValue, groupingSymbol) === count(inputtedValue, groupingSymbol) + 1
    ) {
        return newValue.length - caretPositionFromLeft - 1;
    } else {
        if (!options.autoDecimalMode && decimalSymbolPosition !== 0 && caretPosition > decimalSymbolPosition) {
            if (
                numberFormat.onlyDigits(inputtedValue.substr(decimalSymbolPosition)).length - 1 ===
                maximumFractionDigits
            ) {
                caretPositionFromLeft -= 1;
            }
        }
        return options.distractionFree.hideCurrencySymbol
            ? newValue.length - caretPositionFromLeft
            : Math.max(
                  newValue.length - Math.max(caretPositionFromLeft, suffix.length),
                  prefix.length === 0 ? 0 : prefix.length + 1
              );
    }
};
var getDistractionFreeCaretPosition = function(numberFormat, options, value, caretPosition) {
    var result = caretPosition;
    if (options.distractionFree.hideCurrencySymbol) {
        result -= numberFormat.prefix.length;
    }
    if (options.distractionFree.hideGroupingSymbol) {
        result -= count(value.substring(0, caretPosition), numberFormat.groupingSymbol);
    }
    return Math.max(0, result);
};

var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
var NumberInput = function NumberInput(el, options, callbackFns) {
    this.el = el;
    this.callbackFns = callbackFns;
    this.numberValue = null;
    this.addEventListener();
    this.init(options);
    this.setValue(this.currencyFormat.parse(this.el.value));
};
NumberInput.prototype.init = function init(newOptions) {
    var options = Object.assign({}, newOptions);
    var distractionFree = options.distractionFree;
    var autoDecimalMode = options.autoDecimalMode;
    var valueRange = options.valueRange;
    if (typeof distractionFree === "boolean") {
        options.distractionFree = {
            hideCurrencySymbol: distractionFree,
            hideNegligibleDecimalDigits: distractionFree,
            hideGroupingSymbol: distractionFree,
        };
    }
    if (valueRange) {
        options.valueRange = {
            min: valueRange.min !== undefined ? Math.max(valueRange.min, -MAX_SAFE_INTEGER) : -MAX_SAFE_INTEGER,
            max: valueRange.max !== undefined ? Math.min(valueRange.max, MAX_SAFE_INTEGER) : MAX_SAFE_INTEGER,
        };
    } else {
        options.valueRange = {
            min: -MAX_SAFE_INTEGER,
            max: MAX_SAFE_INTEGER,
        };
    }
    if (autoDecimalMode) {
        options.distractionFree.hideNegligibleDecimalDigits = false;
        this.el.setAttribute("inputmode", "numeric");
    } else {
        this.el.setAttribute("inputmode", "decimal");
    }
    this.options = options;
    this.currencyFormat = new NumberFormat(this.options);
    this.numberMask = options.autoDecimalMode
        ? new AutoDecimalModeNumberMask(this.currencyFormat)
        : new DefaultNumberMask(this.currencyFormat);
};
NumberInput.prototype.setOptions = function setOptions(options) {
    this.init(options);
    this.applyFixedFractionFormat(this.numberValue, true);
};
NumberInput.prototype.applyFixedFractionFormat = function applyFixedFractionFormat(number, forcedChange) {
    this.format(number != null ? this.currencyFormat.format(this.validateValueRange(number)) : null);
    if (number !== this.numberValue || forcedChange) {
        this.callbackFns.onChange(this.getValue());
    }
};
NumberInput.prototype.getValue = function getValue() {
    return this.currencyFormat.parse(this.formattedValue, this.options.valueAsInteger);
};
NumberInput.prototype.setValue = function setValue(value) {
    var newValue =
        this.options.valueAsInteger && value != null
            ? value / Math.pow(10, this.currencyFormat.maximumFractionDigits)
            : value;
    if (newValue !== this.numberValue) {
        this.applyFixedFractionFormat(newValue);
    }
};
NumberInput.prototype.validateValueRange = function validateValueRange(value) {
    var ref = this.options.valueRange;
    var min = ref.min;
    var max = ref.max;
    return Math.min(Math.max(value, min), max);
};
NumberInput.prototype.updateInputValue = function updateInputValue(value, hideNegligibleDecimalDigits) {
    if (hideNegligibleDecimalDigits === void 0) hideNegligibleDecimalDigits = false;
    if (value != null) {
        if (this.decimalSymbolInsertedAt !== undefined) {
            value = this.currencyFormat.normalizeDecimalSymbol(value, this.decimalSymbolInsertedAt);
            this.decimalSymbolInsertedAt = undefined;
        }
        var conformedValue = this.numberMask.conformToMask(value, this.formattedValue);
        var formattedValue;
        if (typeof conformedValue === "object") {
            var numberValue = conformedValue.numberValue;
            var fractionDigits = conformedValue.fractionDigits;
            var ref = this.currencyFormat;
            var maximumFractionDigits = ref.maximumFractionDigits;
            var minimumFractionDigits = ref.minimumFractionDigits;
            if (this.focus) {
                minimumFractionDigits = maximumFractionDigits;
            }
            minimumFractionDigits = hideNegligibleDecimalDigits
                ? fractionDigits.replace(/0+$/, "").length
                : Math.min(minimumFractionDigits, fractionDigits.length);
            formattedValue =
                numberValue > MAX_SAFE_INTEGER
                    ? this.formattedValue
                    : this.currencyFormat.format(numberValue, {
                          useGrouping: !(this.focus && this.options.distractionFree.hideGroupingSymbol),
                          minimumFractionDigits: minimumFractionDigits,
                          maximumFractionDigits: maximumFractionDigits,
                      });
        } else {
            formattedValue = conformedValue;
        }
        if (!this.options.allowNegative) {
            formattedValue = formattedValue.replace(this.currencyFormat.negativePrefix, this.currencyFormat.prefix);
        }
        if (this.focus && this.options.distractionFree.hideCurrencySymbol) {
            formattedValue = formattedValue
                .replace(this.currencyFormat.negativePrefix, this.currencyFormat.minusSymbol)
                .replace(this.currencyFormat.prefix, "")
                .replace(this.currencyFormat.suffix, "");
        }
        this.el.value = formattedValue;
        this.numberValue = this.currencyFormat.parse(formattedValue);
    } else {
        this.el.value = this.numberValue = null;
    }
    this.formattedValue = this.el.value;
};
NumberInput.prototype.format = function format(value) {
    this.updateInputValue(value);
    this.callbackFns.onInput(this.getValue());
};
NumberInput.prototype.addEventListener = function addEventListener() {
    var this$1 = this;
    this.el.addEventListener(
        "input",
        function() {
            var ref = this$1.el;
            var value = ref.value;
            var selectionStart = ref.selectionStart;
            this$1.format(value);
            if (this$1.focus) {
                this$1.setCaretPosition(
                    getCaretPositionAfterFormat(
                        this$1.formattedValue,
                        value,
                        selectionStart,
                        this$1.currencyFormat,
                        this$1.options
                    )
                );
            }
        },
        { capture: true }
    );
    this.el.addEventListener("focus", function() {
        this$1.focus = true;
        var ref = this$1.options.distractionFree;
        var hideCurrencySymbol = ref.hideCurrencySymbol;
        var hideGroupingSymbol = ref.hideGroupingSymbol;
        var hideNegligibleDecimalDigits = ref.hideNegligibleDecimalDigits;
        if (hideCurrencySymbol || hideGroupingSymbol || hideNegligibleDecimalDigits) {
            setTimeout(function() {
                var ref = this$1.el;
                var value = ref.value;
                var selectionStart = ref.selectionStart;
                var selectionEnd = ref.selectionEnd;
                if (value) {
                    this$1.updateInputValue(this$1.el.value, hideNegligibleDecimalDigits);
                }
                if (Math.abs(selectionStart - selectionEnd) > 0) {
                    this$1.setCaretPosition(0, this$1.el.value.length);
                } else {
                    this$1.setCaretPosition(
                        getDistractionFreeCaretPosition(this$1.currencyFormat, this$1.options, value, selectionStart)
                    );
                }
            });
        }
    });
    this.el.addEventListener("keypress", function(e) {
        if (DECIMAL_SYMBOLS.includes(e.key)) {
            this$1.decimalSymbolInsertedAt = this$1.el.selectionStart;
        }
    });
    this.el.addEventListener("blur", function() {
        this$1.focus = false;
        if (this$1.numberValue != null) {
            this$1.applyFixedFractionFormat(this$1.numberValue);
        }
    });
    this.el.addEventListener("change", function() {
        this$1.callbackFns.onChange(this$1.getValue());
    });
};
NumberInput.prototype.setCaretPosition = function setCaretPosition(start, end) {
    if (end === void 0) end = start;
    this.el.setSelectionRange(start, end);
};

var directive = {
    bind: function bind(el, ref, vnode) {
        var optionsFromBinding = ref.value;
        var inputElement = el.tagName.toLowerCase() === "input" ? el : el.querySelector("input");
        if (!inputElement) {
            throw new Error("No input element found");
        }
        var options = Object.assign({}, DEFAULT_OPTIONS, (vnode.context.$ci || {}).globalOptions, optionsFromBinding);
        var listeners =
            (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners) || {};
        var emit = function(event, data) {
            if (listeners[event]) {
                listeners[event](vnode.componentOptions ? data : { target: { value: data } });
            }
        };
        el.$ci = new NumberInput(inputElement, options, {
            onChange: function() {
                emit("change", inputElement.value);
            },
            onInput: function() {
                emit("input", inputElement.value);
            },
        });
    },
    componentUpdated: function componentUpdated(el, ref) {
        var value = ref.value;
        var oldValue = ref.oldValue;
        if (!equal(value, oldValue)) {
            el.$ci.setOptions(value);
        }
    },
};

var component = {
    render: function render(h) {
        var this$1 = this;
        return h("input", {
            directives: [
                {
                    name: "currency",
                    value: this.options,
                },
            ],
            on: Object.assign({}, this.$listeners, {
                change: function() {
                    this$1.$emit("change", getValue(this$1.$el));
                },
                input: function() {
                    var numberValue = getValue(this$1.$el);
                    if (this$1.value !== numberValue) {
                        this$1.$emit("input", numberValue);
                    }
                },
            }),
        });
    },
    directives: {
        currency: directive,
    },
    name: "CurrencyInput",
    props: {
        value: {
            type: Number,
            default: null,
        },
        locale: {
            type: String,
            default: undefined,
        },
        currency: {
            type: [String, Object],
            default: undefined,
        },
        distractionFree: {
            type: [Boolean, Object],
            default: undefined,
        },
        precision: {
            type: [Number, Object],
            default: undefined,
        },
        autoDecimalMode: {
            type: Boolean,
            default: undefined,
        },
        valueAsInteger: {
            type: Boolean,
            default: undefined,
        },
        valueRange: {
            type: Object,
            default: undefined,
        },
        allowNegative: {
            type: Boolean,
            default: undefined,
        },
    },
    mounted: function mounted() {
        this.setValue(this.value);
    },
    computed: {
        options: function options() {
            var this$1 = this;
            var options = Object.assign({}, DEFAULT_OPTIONS, (this.$ci || {}).globalOptions);
            Object.keys(DEFAULT_OPTIONS).forEach(function(key) {
                if (this$1[key] !== undefined) {
                    options[key] = this$1[key];
                }
            });
            return options;
        },
    },
    watch: {
        value: "setValue",
    },
    methods: {
        setValue: function setValue$1(value) {
            setValue(this.$el, value);
        },
    },
};

var plugin = {
    install: function install(Vue, ref) {
        if (ref === void 0) ref = {};
        var componentName = ref.componentName;
        if (componentName === void 0) componentName = component.name;
        var directiveName = ref.directiveName;
        if (directiveName === void 0) directiveName = "currency";
        var globalOptions = ref.globalOptions;
        if (globalOptions === void 0) globalOptions = {};
        Vue.component(componentName, component);
        Vue.directive(directiveName, directive);
        Vue.prototype.$ci = {
            parse: function(formattedValue, options) {
                return parse(formattedValue, Object.assign({}, globalOptions, options));
            },
            getValue: getValue,
            setValue: setValue,
            globalOptions: globalOptions,
        };
    },
};

if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
export { directive as CurrencyDirective, component as CurrencyInput, format, getValue, parse, setValue };
