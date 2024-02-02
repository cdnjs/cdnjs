import * as React from 'react';
import { Icon16Clear, Icon16SearchOutline, Icon24Cancel } from '@vkontakte/icons';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
import { useBooleanState } from '../../hooks/useBooleanState';
import { useEnsuredControl } from '../../hooks/useEnsuredControl';
import { useExternRef } from '../../hooks/useExternRef';
import { useId } from '../../hooks/useId';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { touchEnabled } from '../../lib/touch';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Headline } from '../Typography/Headline/Headline';
import styles from './Search.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Search
 */ export const Search = ({ id: idProp, before = /*#__PURE__*/ React.createElement(Icon16SearchOutline, null), className, defaultValue = '', placeholder = 'Поиск', after = 'Отмена', getRef, icon, onIconClick = noop, style, autoComplete = 'off', onChange: onChangeProp, value: valueProp, iconAriaLabel, clearAriaLabel = 'Очистить', noPadding, getRootRef, findButtonText = 'Найти', onFindButtonClick, ...inputProps })=>{
    const inputRef = useExternRef(getRef);
    const { value: isFocused, setTrue: setFocusedTrue, setFalse: setFocusedFalse } = useBooleanState(false);
    const generatedId = useId();
    const inputId = idProp ? idProp : `search-${generatedId}`;
    const [value, onChange] = useEnsuredControl({
        defaultValue,
        onChange: onChangeProp,
        value: valueProp
    });
    const { sizeY = 'none' } = useAdaptivity();
    const { sizeY: adaptiveSizeY } = useAdaptivityConditionalRender();
    const platform = usePlatform();
    const onFocus = (e)=>{
        setFocusedTrue();
        inputProps.onFocus && inputProps.onFocus(e);
    };
    const onBlur = (e)=>{
        setFocusedFalse();
        inputProps.onBlur && inputProps.onBlur(e);
    };
    const onCancel = React.useCallback(()=>{
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
        nativeInputValueSetter?.call(inputRef.current, '');
        const ev2 = new Event('input', {
            bubbles: true
        });
        inputRef.current?.dispatchEvent(ev2);
    }, [
        inputRef
    ]);
    const onIconClickStart = React.useCallback((e)=>onIconClick(e.originalEvent), [
        onIconClick
    ]);
    const onIconCancelClickStart = React.useCallback((e)=>{
        e.originalEvent.preventDefault();
        inputRef.current?.focus();
        if (touchEnabled()) {
            onCancel();
        }
    }, [
        inputRef,
        onCancel
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames('vkuiInternalSearch', styles['Search'], sizeY === 'none' && styles['Search--sizeY-none'], sizeY === SizeType.COMPACT && styles['Search--sizeY-compact'], isFocused && styles['Search--focused'], value && styles['Search--has-value'], after && styles['Search--has-after'], icon && styles['Search--has-icon'], inputProps.disabled && styles['Search--disabled'], !noPadding && styles['Search--withPadding'], className),
        ref: getRootRef,
        style: style
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__field']
    }, /*#__PURE__*/ React.createElement("label", {
        htmlFor: inputId,
        className: styles['Search__label']
    }, placeholder), /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__input']
    }, before, /*#__PURE__*/ React.createElement(Headline, {
        Component: "input",
        type: "search",
        level: "1",
        weight: "3",
        ...inputProps,
        id: inputId,
        placeholder: placeholder,
        autoComplete: autoComplete,
        getRootRef: inputRef,
        className: styles['Search__nativeInput'],
        onFocus: onFocus,
        onBlur: onBlur,
        onChange: onChange,
        value: value
    })), /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__controls']
    }, icon && /*#__PURE__*/ React.createElement(IconButton, {
        hoverMode: "opacity",
        onStart: onIconClickStart,
        className: styles['Search__icon'],
        onFocus: setFocusedTrue,
        onBlur: setFocusedFalse,
        "aria-label": iconAriaLabel
    }, icon), /*#__PURE__*/ React.createElement(IconButton, {
        hoverMode: "opacity",
        onStart: onIconCancelClickStart,
        onClick: onCancel,
        className: styles['Search__icon'],
        "aria-label": clearAriaLabel,
        tabIndex: value ? undefined : -1
    }, platform === Platform.IOS ? /*#__PURE__*/ React.createElement(Icon16Clear, null) : /*#__PURE__*/ React.createElement(Icon24Cancel, null)), adaptiveSizeY.compact && onFindButtonClick && /*#__PURE__*/ React.createElement(Button, {
        mode: "primary",
        size: "m",
        className: classNames(styles['Search__findButton'], adaptiveSizeY.compact.className),
        focusVisibleMode: "inside",
        onClick: onFindButtonClick,
        tabIndex: value ? undefined : -1
    }, findButtonText))), platform === Platform.IOS && after && /*#__PURE__*/ React.createElement(Button, {
        mode: "tertiary",
        size: "m",
        className: styles['Search__after'],
        focusVisibleMode: "inside",
        onClick: onCancel,
        onFocus: setFocusedTrue,
        onBlur: setFocusedFalse
    }, /*#__PURE__*/ React.createElement("span", {
        className: styles['Search__afterText']
    }, after)));
};

//# sourceMappingURL=Search.js.map