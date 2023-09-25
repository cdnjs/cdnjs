import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useEnsuredControl } from '../../hooks/useEnsuredControl';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { Headline } from '../Typography/Headline/Headline';
import { Title } from '../Typography/Title/Title';
import styles from './WriteBar.module.css';
const WriteBarTypography = (props)=>{
    const platform = usePlatform();
    if (platform === Platform.IOS) {
        return /*#__PURE__*/ React.createElement(Title, {
            ...props,
            level: "3",
            weight: "3"
        });
    }
    return /*#__PURE__*/ React.createElement(Headline, props);
};
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBar
 */ export const WriteBar = ({ className, style, before, inlineAfter, after, getRootRef, getRef, onHeightChange, shadow = false, defaultValue, ...restProps })=>{
    const platform = usePlatform();
    const [value, onChange] = useEnsuredControl({
        defaultValue,
        ...restProps
    });
    const textareaRef = useExternRef(getRef);
    const currentScrollHeight = React.useRef();
    const resize = React.useCallback(()=>{
        const textareaEl = textareaRef.current;
        if (!textareaEl) {
            return;
        }
        if (textareaEl.offsetParent) {
            textareaEl.style.height = '';
            textareaEl.style.height = `${textareaEl.scrollHeight}px`;
            if (textareaEl.scrollHeight !== currentScrollHeight.current && onHeightChange) {
                onHeightChange();
                currentScrollHeight.current = textareaEl.scrollHeight;
            }
        }
    }, [
        onHeightChange,
        textareaRef
    ]);
    React.useEffect(resize, [
        resize,
        value,
        platform
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        ref: getRootRef,
        className: classNames(styles['WriteBar'], platform === Platform.IOS && styles['WriteBar--ios'], shadow && styles['WriteBar--shadow'], className),
        style: style
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['WriteBar__form']
    }, hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: styles['WriteBar__before']
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: styles['WriteBar__formIn']
    }, /*#__PURE__*/ React.createElement(WriteBarTypography, {
        ...restProps,
        Component: "textarea",
        className: styles['WriteBar__textarea'],
        onChange: onChange,
        getRootRef: textareaRef,
        value: value
    }), hasReactNode(inlineAfter) && /*#__PURE__*/ React.createElement("div", {
        className: styles['WriteBar__inlineAfter']
    }, inlineAfter)), hasReactNode(after) && /*#__PURE__*/ React.createElement("div", {
        className: styles['WriteBar__after']
    }, after)));
};

//# sourceMappingURL=WriteBar.js.map