import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';
import { useBooleanState } from './useBooleanState';
import { useGlobalEventListener } from './useGlobalEventListener';
import { useDOM } from '../lib/dom';
export function useDateInput(_ref) {
  var maxElement = _ref.maxElement,
    refs = _ref.refs,
    autoFocus = _ref.autoFocus,
    disabled = _ref.disabled,
    elementsConfig = _ref.elementsConfig,
    onChange = _ref.onChange,
    onInternalValueChange = _ref.onInternalValueChange,
    getInternalValue = _ref.getInternalValue,
    value = _ref.value;
  var _useDOM = useDOM(),
    document = _useDOM.document;
  var _useBooleanState = useBooleanState(false),
    open = _useBooleanState.value,
    openCalendar = _useBooleanState.setTrue,
    closeCalendar = _useBooleanState.setFalse;
  var rootRef = React.useRef(null);
  var calendarRef = React.useRef(null);
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    internalValue = _React$useState2[0],
    setInternalValue = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    focusedElement = _React$useState4[0],
    setFocusedElement = _React$useState4[1];
  var _useDOM2 = useDOM(),
    window = _useDOM2.window;
  var removeFocusFromField = React.useCallback(function () {
    if (open) {
      var _getSelection;
      setFocusedElement(null);
      closeCalendar();
      (_getSelection = window.getSelection()) === null || _getSelection === void 0 ? void 0 : _getSelection.removeAllRanges();
      setInternalValue(getInternalValue(value));
    }
  }, [closeCalendar, getInternalValue, open, value, window]);
  var handleClickOutside = React.useCallback(function (e) {
    var _rootRef$current, _calendarRef$current;
    if (!((_rootRef$current = rootRef.current) !== null && _rootRef$current !== void 0 && _rootRef$current.contains(e.target)) && !((_calendarRef$current = calendarRef.current) !== null && _calendarRef$current !== void 0 && _calendarRef$current.contains(e.target))) {
      removeFocusFromField();
    }
  }, [removeFocusFromField]);
  var selectFirst = React.useCallback(function () {
    setFocusedElement(0);
  }, []);
  useGlobalEventListener(document, 'click', handleClickOutside, {
    capture: true
  });
  React.useEffect(function () {
    setInternalValue(getInternalValue(value));
  }, [getInternalValue, value]);
  React.useEffect(function () {
    if (autoFocus) {
      selectFirst();
    }
  }, [autoFocus, selectFirst]);
  React.useEffect(function () {
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
  }, [disabled, focusedElement, openCalendar, refs, window]);
  var clear = React.useCallback(function () {
    onChange === null || onChange === void 0 ? void 0 : onChange(undefined);
    selectFirst();
  }, [onChange, selectFirst]);
  var handleFieldEnter = React.useCallback(function () {
    if (!open) {
      selectFirst();
    }
  }, [open, selectFirst]);
  var handleKeyDown = React.useCallback(function (e) {
    if (focusedElement === null) {
      return;
    }
    var _value = _toConsumableArray(internalValue);
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
    } else if (e.key === 'Backspace') {
      if (!_value[focusedElement]) {
        setFocusedElement(focusedElement <= 0 ? maxElement : focusedElement - 1);
      } else {
        _value[focusedElement] = _value[focusedElement].slice(0, -1);
      }
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
      var currentValue = Number(_value[focusedElement]);
      _value[focusedElement] = String(currentValue <= config.min ? config.max : currentValue - 1).padStart(config.length, '0');
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
      var _currentValue = Number(_value[focusedElement]);
      _value[focusedElement] = String(_currentValue >= config.max ? config.min : _currentValue + 1).padStart(config.length, '0');
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
  }, [elementsConfig, focusedElement, internalValue, maxElement, onInternalValueChange, removeFocusFromField]);
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