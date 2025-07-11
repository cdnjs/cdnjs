import { useCallback } from "react";
import * as React from "react";
import { useDOM } from "../lib/dom.js";
import { useBooleanState } from "./useBooleanState.js";
import { useGlobalEventListener } from "./useGlobalEventListener.js";
export function useDateInput({ maxElement, refs, autoFocus, disabled, elementsConfig, onClear, onInternalValueChange, getInternalValue, value, onCalendarOpenChanged, accessible }) {
    const { document } = useDOM();
    const { value: open, setTrue: openCalendar, setFalse: closeCalendar } = useBooleanState(false);
    const rootRef = React.useRef(null);
    const calendarRef = React.useRef(null);
    const [internalValue, setInternalValue] = React.useState([]);
    const [focusedElement, setFocusedElement] = React.useState(null);
    const isClickedOutsideRef = React.useRef(false);
    const { window } = useDOM();
    const handleRestoreFocus = React.useCallback(()=>{
        // если календарь был закрыт кликом вне календаря
        // то FocusTrap возвращать фокус не должен
        return !isClickedOutsideRef.current;
    }, []);
    const _onCalendarClose = useCallback(()=>{
        if (open) {
            closeCalendar();
            onCalendarOpenChanged === null || onCalendarOpenChanged === void 0 ? void 0 : onCalendarOpenChanged(false);
        }
    }, [
        closeCalendar,
        onCalendarOpenChanged,
        open
    ]);
    const _onCalendarOpen = useCallback(()=>{
        if (!open) {
            openCalendar();
            onCalendarOpenChanged === null || onCalendarOpenChanged === void 0 ? void 0 : onCalendarOpenChanged(true);
            if (accessible) {
                setFocusedElement(null);
            }
            isClickedOutsideRef.current = false;
        }
    }, [
        onCalendarOpenChanged,
        open,
        openCalendar,
        accessible
    ]);
    const resetFocusedElement = React.useCallback(()=>{
        if (focusedElement !== null) {
            var _window_getSelection;
            setFocusedElement(null);
            (_window_getSelection = window.getSelection()) === null || _window_getSelection === void 0 ? void 0 : _window_getSelection.removeAllRanges();
            setInternalValue(getInternalValue(value));
        }
    }, [
        focusedElement,
        getInternalValue,
        value,
        window
    ]);
    const removeFocusFromField = React.useCallback(()=>{
        resetFocusedElement();
        _onCalendarClose();
    }, [
        resetFocusedElement,
        _onCalendarClose
    ]);
    const toggleCalendar = useCallback(()=>{
        resetFocusedElement();
        if (open) {
            _onCalendarClose();
        } else {
            _onCalendarOpen();
        }
    }, [
        resetFocusedElement,
        open,
        _onCalendarClose,
        _onCalendarOpen
    ]);
    const handleClickOutside = React.useCallback((e)=>{
        var _rootRef_current, _calendarRef_current;
        if (!((_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.contains(e.target)) && !((_calendarRef_current = calendarRef.current) === null || _calendarRef_current === void 0 ? void 0 : _calendarRef_current.contains(e.target))) {
            isClickedOutsideRef.current = true;
            removeFocusFromField();
        }
    }, [
        removeFocusFromField
    ]);
    const selectFirst = React.useCallback(()=>{
        if (focusedElement !== null) {
            return;
        }
        setFocusedElement(0);
    }, [
        focusedElement
    ]);
    useGlobalEventListener(document, 'click', handleClickOutside, {
        capture: true
    });
    React.useEffect(()=>{
        setInternalValue(getInternalValue(value));
    }, [
        getInternalValue,
        value
    ]);
    React.useEffect(()=>{
        if (autoFocus) {
            selectFirst();
        }
    }, [
        autoFocus,
        selectFirst
    ]);
    React.useEffect(()=>{
        if (disabled || focusedElement === null) {
            return;
        }
        const range = window.document.createRange();
        let element = refs[focusedElement].current;
        let timerId;
        if (element) {
            element.focus();
            if (!accessible) {
                _onCalendarOpen();
            }
            range.selectNodeContents(element);
            // Fix для Firefox: setTimeout нужен чтобы отложить range selection на
            // какое-то время, иначе, при фокусе на InputLike
            // извне, контент визуально не будет выбран
            timerId = setTimeout(()=>{
                const selection = window.getSelection();
                selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
                selection === null || selection === void 0 ? void 0 : selection.addRange(range);
            }, 0);
        }
        return ()=>{
            clearTimeout(timerId);
        };
    }, [
        disabled,
        focusedElement,
        refs,
        window,
        _onCalendarOpen,
        accessible
    ]);
    const clear = React.useCallback(()=>{
        onClear === null || onClear === void 0 ? void 0 : onClear();
        selectFirst();
    }, [
        onClear,
        selectFirst
    ]);
    const handleFieldEnter = React.useCallback(()=>{
        selectFirst();
    }, [
        selectFirst
    ]);
    const handleKeyDown = React.useCallback((e)=>{
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
        } else if (e.key === 'ArrowLeft' || e.key === 'Left' || e.key === 'Tab' && e.shiftKey) {
            if (focusedElement <= 0) {
                if (e.key === 'Tab') {
                    removeFocusFromField();
                }
                return;
            }
            setFocusedElement(focusedElement - 1);
        } else if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'Tab') {
            if (focusedElement >= maxElement) {
                if (e.key === 'Tab') {
                    removeFocusFromField();
                }
                return;
            }
            setFocusedElement(focusedElement + 1);
        } else if (e.key === 'Delete' || e.key === 'Del') {
            _value[focusedElement] = '';
        } else if (e.key === ' ') {
            e.preventDefault();
            _onCalendarOpen();
            return;
        } else {
            return;
        }
        e.preventDefault();
        setInternalValue(_value);
        onInternalValueChange(_value);
    }, [
        _onCalendarOpen,
        removeFocusFromField,
        elementsConfig,
        focusedElement,
        internalValue,
        maxElement,
        onInternalValueChange
    ]);
    return {
        rootRef,
        calendarRef,
        open,
        openCalendar: _onCalendarOpen,
        closeCalendar: _onCalendarClose,
        toggleCalendar,
        internalValue,
        focusedElement,
        setFocusedElement,
        handleKeyDown,
        clear,
        handleFieldEnter,
        removeFocusFromField,
        handleRestoreFocus
    };
}

//# sourceMappingURL=useDateInput.js.map