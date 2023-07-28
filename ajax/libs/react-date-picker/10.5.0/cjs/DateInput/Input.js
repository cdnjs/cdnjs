"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var update_input_width_1 = __importStar(require("update-input-width"));
var isBrowser = typeof document !== 'undefined';
var useIsomorphicLayoutEffect = isBrowser ? react_1.useLayoutEffect : react_1.useEffect;
var isIEOrEdgeLegacy = isBrowser && /(MSIE|Trident\/|Edge\/)/.test(navigator.userAgent);
var isFirefox = isBrowser && /Firefox/.test(navigator.userAgent);
function onFocus(event) {
    var target = event.target;
    if (isIEOrEdgeLegacy) {
        requestAnimationFrame(function () { return target.select(); });
    }
    else {
        target.select();
    }
}
function updateInputWidthOnLoad(element) {
    if (document.readyState === 'complete') {
        return;
    }
    function onLoad() {
        (0, update_input_width_1.default)(element);
    }
    window.addEventListener('load', onLoad);
}
function updateInputWidthOnFontLoad(element) {
    if (!document.fonts) {
        return;
    }
    var font = (0, update_input_width_1.getFontShorthand)(element);
    if (!font) {
        return;
    }
    var isFontLoaded = document.fonts.check(font);
    if (isFontLoaded) {
        return;
    }
    function onLoadingDone() {
        (0, update_input_width_1.default)(element);
    }
    document.fonts.addEventListener('loadingdone', onLoadingDone);
}
function getSelectionString(input) {
    /**
     * window.getSelection().toString() returns empty string in IE11 and Firefox,
     * so alternatives come first.
     */
    if (input &&
        'selectionStart' in input &&
        input.selectionStart !== null &&
        'selectionEnd' in input &&
        input.selectionEnd !== null) {
        return input.value.slice(input.selectionStart, input.selectionEnd);
    }
    if ('getSelection' in window) {
        var selection = window.getSelection();
        return selection && selection.toString();
    }
    return null;
}
function makeOnKeyPress(maxLength) {
    if (maxLength === null) {
        return undefined;
    }
    /**
     * Prevents keystrokes that would not produce a number or when value after keystroke would
     * exceed maxLength.
     */
    return function onKeyPress(event) {
        if (isFirefox) {
            // See https://github.com/wojtekmaj/react-time-picker/issues/92
            return;
        }
        var key = event.key, input = event.target;
        var value = input.value;
        var isNumberKey = key.length === 1 && /\d/.test(key);
        var selection = getSelectionString(input);
        if (!isNumberKey || !(selection || value.length < maxLength)) {
            event.preventDefault();
        }
    };
}
function Input(_a) {
    var ariaLabel = _a.ariaLabel, autoFocus = _a.autoFocus, className = _a.className, disabled = _a.disabled, inputRef = _a.inputRef, max = _a.max, min = _a.min, name = _a.name, nameForClass = _a.nameForClass, onChange = _a.onChange, onKeyDown = _a.onKeyDown, onKeyUp = _a.onKeyUp, _b = _a.placeholder, placeholder = _b === void 0 ? '--' : _b, required = _a.required, showLeadingZeros = _a.showLeadingZeros, step = _a.step, value = _a.value;
    useIsomorphicLayoutEffect(function () {
        if (!inputRef || !inputRef.current) {
            return;
        }
        (0, update_input_width_1.default)(inputRef.current);
        updateInputWidthOnLoad(inputRef.current);
        updateInputWidthOnFontLoad(inputRef.current);
    }, [inputRef, value]);
    var hasLeadingZero = showLeadingZeros &&
        value &&
        Number(value) < 10 &&
        (value === '0' || !value.toString().startsWith('0'));
    var maxLength = max ? max.toString().length : null;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        hasLeadingZero ? react_1.default.createElement("span", { className: "".concat(className, "__leadingZero") }, "0") : null,
        react_1.default.createElement("input", { "aria-label": ariaLabel, autoComplete: "off", autoFocus: autoFocus, className: (0, clsx_1.default)("".concat(className, "__input"), "".concat(className, "__").concat(nameForClass || name), hasLeadingZero && "".concat(className, "__input--hasLeadingZero")), "data-input": "true", disabled: disabled, inputMode: "numeric", max: max, min: min, name: name, onChange: onChange, onFocus: onFocus, onKeyDown: onKeyDown, onKeyPress: makeOnKeyPress(maxLength), onKeyUp: function (event) {
                (0, update_input_width_1.default)(event.target);
                if (onKeyUp) {
                    onKeyUp(event);
                }
            }, placeholder: placeholder, ref: inputRef, required: required, step: step, type: "number", value: value !== null ? value : '' })));
}
exports.default = Input;
