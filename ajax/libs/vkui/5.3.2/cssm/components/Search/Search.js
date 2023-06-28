import * as React from 'react';
import { Icon16Clear, Icon16SearchOutline, Icon24Cancel } from '@vkontakte/icons';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useEnsuredControl } from '../../hooks/useEnsuredControl';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { Touch } from '../Touch/Touch';
import { Headline } from '../Typography/Headline/Headline';
import { Title } from '../Typography/Title/Title';
import styles from './Search.module.css';
const sizeYClassNames = {
    none: styles['Search--sizeY-none'],
    [SizeType.REGULAR]: styles['Search--sizeY-regular']
};
const SearchPlaceholderTypography = ({ children , ...restProps })=>{
    const platform = usePlatform();
    switch(platform){
        case Platform.IOS:
            return /*#__PURE__*/ React.createElement(Title, {
                ...restProps,
                level: "3",
                weight: "3"
            }, children);
        default:
            return /*#__PURE__*/ React.createElement(Headline, {
                ...restProps,
                weight: "3"
            }, children);
    }
};
/**
 * @see https://vkcom.github.io/VKUI/#/Search
 */ export const Search = ({ before =/*#__PURE__*/ React.createElement(Icon16SearchOutline, null) , className , defaultValue ='' , placeholder ='Поиск' , after ='Отмена' , getRef , icon , onIconClick =noop , style , autoComplete ='off' , onChange: onChangeProp , value: valueProp , ...inputProps })=>{
    const inputRef = useExternRef(getRef);
    const [isFocused, setFocused] = React.useState(false);
    const [value, onChange] = useEnsuredControl({
        defaultValue,
        onChange: onChangeProp,
        value: valueProp
    });
    const { sizeY ='none'  } = useAdaptivity();
    const platform = usePlatform();
    const onFocus = (e)=>{
        setFocused(true);
        inputProps.onFocus && inputProps.onFocus(e);
    };
    const onBlur = (e)=>{
        setFocused(false);
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
        onCancel();
    }, [
        inputRef,
        onCancel
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['Search'], sizeY !== SizeType.COMPACT && sizeYClassNames[sizeY], isFocused && styles['Search--focused'], value && styles['Search--has-value'], after && styles['Search--has-after'], icon && styles['Search--has-icon'], className),
        style: style
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__in']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__width']
    }), /*#__PURE__*/ React.createElement("label", {
        className: styles['Search__control']
    }, /*#__PURE__*/ React.createElement("input", {
        type: "search",
        ...inputProps,
        autoComplete: autoComplete,
        ref: inputRef,
        className: styles['Search__input'],
        onFocus: onFocus,
        onBlur: onBlur,
        onChange: onChange,
        value: value
    }), platform === Platform.IOS && after && /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__after-width']
    }, after), /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__placeholder']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__placeholder-in']
    }, before, /*#__PURE__*/ React.createElement(SearchPlaceholderTypography, {
        className: styles['Search__placeholder-text']
    }, placeholder)), isFocused && platform === Platform.IOS && after && /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__after-width']
    }, after))), /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__after']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__icons']
    }, icon && /*#__PURE__*/ React.createElement(Touch, {
        onStart: onIconClickStart,
        className: styles['Search__icon']
    }, icon), !!value && /*#__PURE__*/ React.createElement(Touch, {
        onStart: onIconCancelClickStart,
        onClick: onCancel,
        className: styles['Search__icon']
    }, platform === Platform.IOS ? /*#__PURE__*/ React.createElement(Icon16Clear, null) : /*#__PURE__*/ React.createElement(Icon24Cancel, null))), platform === Platform.IOS && after && /*#__PURE__*/ React.createElement("div", {
        className: styles['Search__after-in'],
        onClick: onCancel
    }, after))));
};

//# sourceMappingURL=Search.js.map