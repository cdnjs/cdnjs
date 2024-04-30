import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useLayoutEffect } from 'react';
import clsx from 'clsx';
import updateInputWidth, { getFontShorthand } from 'update-input-width';
var isBrowser = typeof document !== 'undefined';
var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
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
        updateInputWidth(element);
    }
    window.addEventListener('load', onLoad);
}
function updateInputWidthOnFontLoad(element) {
    if (!document.fonts) {
        return;
    }
    var font = getFontShorthand(element);
    if (!font) {
        return;
    }
    var isFontLoaded = document.fonts.check(font);
    if (isFontLoaded) {
        return;
    }
    function onLoadingDone() {
        updateInputWidth(element);
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
export default function Input(_a) {
    var ariaLabel = _a.ariaLabel, autoFocus = _a.autoFocus, className = _a.className, disabled = _a.disabled, inputRef = _a.inputRef, max = _a.max, min = _a.min, name = _a.name, nameForClass = _a.nameForClass, onChange = _a.onChange, onKeyDown = _a.onKeyDown, onKeyUp = _a.onKeyUp, _b = _a.placeholder, placeholder = _b === void 0 ? '--' : _b, required = _a.required, showLeadingZeros = _a.showLeadingZeros, step = _a.step, value = _a.value;
    useIsomorphicLayoutEffect(function () {
        if (!inputRef || !inputRef.current) {
            return;
        }
        updateInputWidth(inputRef.current);
        updateInputWidthOnLoad(inputRef.current);
        updateInputWidthOnFontLoad(inputRef.current);
    }, [inputRef, value]);
    var hasLeadingZero = showLeadingZeros &&
        value &&
        Number(value) < 10 &&
        (value === '0' || !value.toString().startsWith('0'));
    var maxLength = max ? max.toString().length : null;
    return (_jsxs(_Fragment, { children: [hasLeadingZero ? _jsx("span", { className: "".concat(className, "__leadingZero"), children: "0" }) : null, _jsx("input", { "aria-label": ariaLabel, autoComplete: "off", autoFocus: autoFocus, className: clsx("".concat(className, "__input"), "".concat(className, "__").concat(nameForClass || name), hasLeadingZero && "".concat(className, "__input--hasLeadingZero")), "data-input": "true", disabled: disabled, inputMode: "numeric", max: max, min: min, name: name, onChange: onChange, onFocus: onFocus, onKeyDown: onKeyDown, onKeyPress: makeOnKeyPress(maxLength), onKeyUp: function (event) {
                    updateInputWidth(event.target);
                    if (onKeyUp) {
                        onKeyUp(event);
                    }
                }, placeholder: placeholder, 
                // Assertion is needed for React 18 compatibility
                ref: inputRef, required: required, step: step, type: "number", value: value !== null ? value : '' })] }));
}
