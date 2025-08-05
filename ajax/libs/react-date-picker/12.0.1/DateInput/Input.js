import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useLayoutEffect } from 'react';
import clsx from 'clsx';
import updateInputWidth, { getFontShorthand } from 'update-input-width';
const isBrowser = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
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
        updateInputWidth(element);
    }
    window.addEventListener('load', onLoad);
}
function updateInputWidthOnFontLoad(element) {
    if (!document.fonts) {
        return;
    }
    const font = getFontShorthand(element);
    if (!font) {
        return;
    }
    const isFontLoaded = document.fonts.check(font);
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
export default function Input({ ariaLabel, autoFocus, className, disabled, inputRef, max, min, name, nameForClass, onChange, onKeyDown, onKeyUp, placeholder = '--', required, showLeadingZeros, step, value, }) {
    useIsomorphicLayoutEffect(() => {
        if (!inputRef || !inputRef.current) {
            return;
        }
        updateInputWidth(inputRef.current);
        updateInputWidthOnLoad(inputRef.current);
        updateInputWidthOnFontLoad(inputRef.current);
    }, [inputRef, value]);
    const hasLeadingZero = showLeadingZeros &&
        value &&
        Number(value) < 10 &&
        (value === '0' || !value.toString().startsWith('0'));
    const maxLength = max ? max.toString().length : null;
    return (_jsxs(_Fragment, { children: [hasLeadingZero ? _jsx("span", { className: `${className}__leadingZero`, children: "0" }) : null, _jsx("input", { "aria-label": ariaLabel, autoComplete: "off", 
                // biome-ignore lint/a11y/noAutofocus: This is up to developers' decision
                autoFocus: autoFocus, className: clsx(`${className}__input`, `${className}__${nameForClass || name}`, hasLeadingZero && `${className}__input--hasLeadingZero`), "data-input": "true", disabled: disabled, inputMode: "numeric", max: max, min: min, name: name, onChange: onChange, onFocus: onFocus, onKeyDown: onKeyDown, onKeyPress: makeOnKeyPress(maxLength), onKeyUp: (event) => {
                    updateInputWidth(event.target);
                    if (onKeyUp) {
                        onKeyUp(event);
                    }
                }, placeholder: placeholder, 
                // Assertion is needed for React 18 compatibility
                ref: inputRef, required: required, step: step, type: "number", value: value !== null ? value : '' })] }));
}
