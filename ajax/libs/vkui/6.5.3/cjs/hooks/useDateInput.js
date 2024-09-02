"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useDateInput", {
    enumerable: true,
    get: function() {
        return useDateInput;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _dom = require("../lib/dom");
const _useBooleanState = require("./useBooleanState");
const _useGlobalEventListener = require("./useGlobalEventListener");
function useDateInput({ maxElement, refs, autoFocus, disabled, elementsConfig, onChange, onInternalValueChange, getInternalValue, value }) {
    const { document } = (0, _dom.useDOM)();
    const { value: open, setTrue: openCalendar, setFalse: closeCalendar } = (0, _useBooleanState.useBooleanState)(false);
    const rootRef = _react.useRef(null);
    const calendarRef = _react.useRef(null);
    const [internalValue, setInternalValue] = _react.useState([]);
    const [focusedElement, setFocusedElement] = _react.useState(null);
    const { window } = (0, _dom.useDOM)();
    const removeFocusFromField = _react.useCallback(()=>{
        if (focusedElement !== null) {
            var _window_getSelection;
            setFocusedElement(null);
            closeCalendar();
            (_window_getSelection = window.getSelection()) === null || _window_getSelection === void 0 ? void 0 : _window_getSelection.removeAllRanges();
            setInternalValue(getInternalValue(value));
        }
    }, [
        focusedElement,
        closeCalendar,
        getInternalValue,
        value,
        window
    ]);
    const handleClickOutside = _react.useCallback((e)=>{
        var _rootRef_current, _calendarRef_current;
        if (!((_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.contains(e.target)) && !((_calendarRef_current = calendarRef.current) === null || _calendarRef_current === void 0 ? void 0 : _calendarRef_current.contains(e.target))) {
            removeFocusFromField();
        }
    }, [
        removeFocusFromField
    ]);
    const selectFirst = _react.useCallback(()=>{
        setFocusedElement(0);
    }, []);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, 'click', handleClickOutside, {
        capture: true
    });
    _react.useEffect(()=>{
        setInternalValue(getInternalValue(value));
    }, [
        getInternalValue,
        value
    ]);
    _react.useEffect(()=>{
        if (autoFocus) {
            selectFirst();
        }
    }, [
        autoFocus,
        selectFirst
    ]);
    _react.useEffect(()=>{
        if (disabled || focusedElement === null) {
            return;
        }
        const range = window.document.createRange();
        let element = refs[focusedElement].current;
        if (element) {
            element.focus();
            openCalendar();
            range.selectNodeContents(element);
            const selection = window.getSelection();
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            selection === null || selection === void 0 ? void 0 : selection.addRange(range);
        }
    }, [
        disabled,
        focusedElement,
        openCalendar,
        refs,
        window
    ]);
    const clear = _react.useCallback(()=>{
        onChange === null || onChange === void 0 ? void 0 : onChange(undefined);
        selectFirst();
    }, [
        onChange,
        selectFirst
    ]);
    const handleFieldEnter = _react.useCallback(()=>{
        if (!open) {
            selectFirst();
        }
    }, [
        open,
        selectFirst
    ]);
    const handleKeyDown = _react.useCallback((e)=>{
        if (focusedElement === null) {
            return;
        }
        const _value = [
            ...internalValue
        ];
        const config = elementsConfig(focusedElement);
        if (/^\d+$/.test(e.key)) {
            if (_value[focusedElement].length >= config.length) {
                _value[focusedElement] = e.key;
            } else {
                _value[focusedElement] += e.key;
                if (_value[focusedElement].length >= config.length && focusedElement < maxElement) {
                    setFocusedElement(focusedElement + 1);
                }
            }
        } else if (e.key === 'Backspace') {
            if (!_value[focusedElement]) {
                setFocusedElement(focusedElement <= 0 ? maxElement : focusedElement - 1);
            } else {
                _value[focusedElement] = _value[focusedElement].slice(0, -1);
            }
        } else if (e.key === 'ArrowDown' || e.key === 'Down') {
            let currentValue = Number(_value[focusedElement]);
            _value[focusedElement] = String(currentValue <= config.min ? config.max : currentValue - 1).padStart(config.length, '0');
        } else if (e.key === 'ArrowUp' || e.key === 'Up') {
            let currentValue = Number(_value[focusedElement]);
            _value[focusedElement] = String(currentValue >= config.max ? config.min : currentValue + 1).padStart(config.length, '0');
        } else if (e.key === 'Enter' || e.key === 'Tab' && focusedElement === maxElement || e.key === 'Tab' && e.shiftKey && focusedElement === 0) {
            removeFocusFromField();
            return;
        } else if (e.key === 'ArrowLeft' || e.key === 'Left' || e.key === 'Tab' && e.shiftKey) {
            setFocusedElement(focusedElement <= 0 ? maxElement : focusedElement - 1);
        } else if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'Tab') {
            setFocusedElement(focusedElement >= maxElement ? 0 : focusedElement + 1);
        } else if (e.key === 'Delete' || e.key === 'Del') {
            _value[focusedElement] = '';
        } else {
            return;
        }
        e.preventDefault();
        setInternalValue(_value);
        onInternalValueChange(_value);
    }, [
        elementsConfig,
        focusedElement,
        internalValue,
        maxElement,
        onInternalValueChange,
        removeFocusFromField
    ]);
    return {
        rootRef,
        calendarRef,
        open,
        openCalendar,
        closeCalendar,
        internalValue,
        focusedElement,
        setFocusedElement,
        handleKeyDown,
        clear,
        handleFieldEnter,
        removeFocusFromField
    };
}

//# sourceMappingURL=useDateInput.js.map