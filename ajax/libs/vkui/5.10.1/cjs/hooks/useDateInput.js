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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _to_consumable_array = require("@swc/helpers/_/_to_consumable_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _dom = require("../lib/dom");
var _useBooleanState = require("./useBooleanState");
var _useGlobalEventListener = require("./useGlobalEventListener");
function useDateInput(param) {
    var maxElement = param.maxElement, refs = param.refs, autoFocus = param.autoFocus, disabled = param.disabled, elementsConfig = param.elementsConfig, onChange = param.onChange, onInternalValueChange = param.onInternalValueChange, getInternalValue = param.getInternalValue, value = param.value;
    var document = (0, _dom.useDOM)().document;
    var _useBooleanState1 = (0, _useBooleanState.useBooleanState)(false), open = _useBooleanState1.value, openCalendar = _useBooleanState1.setTrue, closeCalendar = _useBooleanState1.setFalse;
    var rootRef = _react.useRef(null);
    var calendarRef = _react.useRef(null);
    var _React_useState = _sliced_to_array._(_react.useState([]), 2), internalValue = _React_useState[0], setInternalValue = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(null), 2), focusedElement = _React_useState1[0], setFocusedElement = _React_useState1[1];
    var window = (0, _dom.useDOM)().window;
    var removeFocusFromField = _react.useCallback(function() {
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
    var handleClickOutside = _react.useCallback(function(e) {
        var _rootRef_current, _calendarRef_current;
        if (!((_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.contains(e.target)) && !((_calendarRef_current = calendarRef.current) === null || _calendarRef_current === void 0 ? void 0 : _calendarRef_current.contains(e.target))) {
            removeFocusFromField();
        }
    }, [
        removeFocusFromField
    ]);
    var selectFirst = _react.useCallback(function() {
        setFocusedElement(0);
    }, []);
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "click", handleClickOutside, {
        capture: true
    });
    _react.useEffect(function() {
        setInternalValue(getInternalValue(value));
    }, [
        getInternalValue,
        value
    ]);
    _react.useEffect(function() {
        if (autoFocus) {
            selectFirst();
        }
    }, [
        autoFocus,
        selectFirst
    ]);
    _react.useEffect(function() {
        if (disabled || focusedElement === null) {
            return;
        }
        var range = window.document.createRange();
        var element = refs[focusedElement].current;
        if (element) {
            element.focus();
            openCalendar();
            range.selectNodeContents(element);
            var selection = window.getSelection();
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
    var clear = _react.useCallback(function() {
        onChange === null || onChange === void 0 ? void 0 : onChange(undefined);
        selectFirst();
    }, [
        onChange,
        selectFirst
    ]);
    var handleFieldEnter = _react.useCallback(function() {
        if (!open) {
            selectFirst();
        }
    }, [
        open,
        selectFirst
    ]);
    var handleKeyDown = _react.useCallback(function(e) {
        if (focusedElement === null) {
            return;
        }
        var _value = _to_consumable_array._(internalValue);
        var config = elementsConfig(focusedElement);
        if (/^\d+$/.test(e.key)) {
            if (_value[focusedElement].length >= config.length) {
                _value[focusedElement] = e.key;
            } else {
                _value[focusedElement] += e.key;
                if (_value[focusedElement].length >= config.length && focusedElement < maxElement) {
                    setFocusedElement(focusedElement + 1);
                }
            }
        } else if (e.key === "Backspace") {
            if (!_value[focusedElement]) {
                setFocusedElement(focusedElement <= 0 ? maxElement : focusedElement - 1);
            } else {
                _value[focusedElement] = _value[focusedElement].slice(0, -1);
            }
        } else if (e.key === "ArrowDown" || e.key === "Down") {
            var currentValue = Number(_value[focusedElement]);
            _value[focusedElement] = String(currentValue <= config.min ? config.max : currentValue - 1).padStart(config.length, "0");
        } else if (e.key === "ArrowUp" || e.key === "Up") {
            var currentValue1 = Number(_value[focusedElement]);
            _value[focusedElement] = String(currentValue1 >= config.max ? config.min : currentValue1 + 1).padStart(config.length, "0");
        } else if (e.key === "Enter" || e.key === "Tab" && focusedElement === maxElement || e.key === "Tab" && e.shiftKey && focusedElement === 0) {
            removeFocusFromField();
            return;
        } else if (e.key === "ArrowLeft" || e.key === "Left" || e.key === "Tab" && e.shiftKey) {
            setFocusedElement(focusedElement <= 0 ? maxElement : focusedElement - 1);
        } else if (e.key === "ArrowRight" || e.key === "Right" || e.key === "Tab") {
            setFocusedElement(focusedElement >= maxElement ? 0 : focusedElement + 1);
        } else if (e.key === "Delete" || e.key === "Del") {
            _value[focusedElement] = "";
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
        rootRef: rootRef,
        calendarRef: calendarRef,
        open: open,
        openCalendar: openCalendar,
        closeCalendar: closeCalendar,
        internalValue: internalValue,
        focusedElement: focusedElement,
        setFocusedElement: setFocusedElement,
        handleKeyDown: handleKeyDown,
        clear: clear,
        handleFieldEnter: handleFieldEnter,
        removeFocusFromField: removeFocusFromField
    };
}

//# sourceMappingURL=useDateInput.js.map