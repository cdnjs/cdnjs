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
exports.default = Input;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const clsx_1 = __importDefault(require("clsx"));
const update_input_width_1 = __importStar(require("update-input-width"));
const isBrowser = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = isBrowser ? react_1.useLayoutEffect : react_1.useEffect;
const isIEOrEdgeLegacy = isBrowser && /(MSIE|Trident\/|Edge\/)/.test(navigator.userAgent);
const isFirefox = isBrowser && /Firefox/.test(navigator.userAgent);
function onFocus(event) {
    const { target } = event;
    if (isIEOrEdgeLegacy) {
        requestAnimationFrame(() => target.select());
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
    const font = (0, update_input_width_1.getFontShorthand)(element);
    if (!font) {
        return;
    }
    const isFontLoaded = document.fonts.check(font);
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
        const selection = window.getSelection();
        return selection === null || selection === void 0 ? void 0 : selection.toString();
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
        const { key, target: input } = event;
        const { value } = input;
        const isNumberKey = key.length === 1 && /\d/.test(key);
        const selection = getSelectionString(input);
        if (!isNumberKey || !(selection || value.length < maxLength)) {
            event.preventDefault();
        }
    };
}
function Input({ ariaLabel, autoFocus, className, disabled, inputRef, max, min, name, nameForClass, onChange, onKeyDown, onKeyUp, placeholder = '--', required, showLeadingZeros, step, value, }) {
    useIsomorphicLayoutEffect(() => {
        if (!inputRef || !inputRef.current) {
            return;
        }
        (0, update_input_width_1.default)(inputRef.current);
        updateInputWidthOnLoad(inputRef.current);
        updateInputWidthOnFontLoad(inputRef.current);
    }, [inputRef, value]);
    const hasLeadingZero = showLeadingZeros &&
        value &&
        Number(value) < 10 &&
        (value === '0' || !value.toString().startsWith('0'));
    const maxLength = max ? max.toString().length : null;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [hasLeadingZero ? (0, jsx_runtime_1.jsx)("span", { className: `${className}__leadingZero`, children: "0" }) : null, (0, jsx_runtime_1.jsx)("input", { "aria-label": ariaLabel, autoComplete: "off", 
                // biome-ignore lint/a11y/noAutofocus: This is up to developers' decision
                autoFocus: autoFocus, className: (0, clsx_1.default)(`${className}__input`, `${className}__${nameForClass || name}`, hasLeadingZero && `${className}__input--hasLeadingZero`), "data-input": "true", disabled: disabled, inputMode: "numeric", max: max, min: min, name: name, onChange: onChange, onFocus: onFocus, onKeyDown: onKeyDown, onKeyPress: makeOnKeyPress(maxLength), onKeyUp: (event) => {
                    (0, update_input_width_1.default)(event.target);
                    if (onKeyUp) {
                        onKeyUp(event);
                    }
                }, placeholder: placeholder, 
                // Assertion is needed for React 18 compatibility
                ref: inputRef, required: required, step: step, type: "number", value: value !== null ? value : '' })] }));
}
