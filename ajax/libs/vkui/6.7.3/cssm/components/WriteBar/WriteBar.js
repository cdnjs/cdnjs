import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { callMultiple } from '../../lib/callMultiple';
import { useResizeTextarea } from '../Textarea/useResizeTextarea';
import { Headline } from '../Typography/Headline/Headline';
import { Title } from '../Typography/Title/Title';
import styles from './WriteBar.module.css';
const WriteBarTypography = (props)=>{
    const platform = usePlatform();
    if (platform === 'ios') {
        return /*#__PURE__*/ _jsx(Title, {
            ...props,
            level: "3",
            weight: "3"
        });
    }
    return /*#__PURE__*/ _jsx(Headline, {
        weight: "3",
        ...props
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBar
 */ export const WriteBar = ({ className, style, before, inlineAfter, after, getRootRef, getRef, onHeightChange, shadow = false, onChange, ...restProps })=>{
    const platform = usePlatform();
    const [refResizeTextarea, resize] = useResizeTextarea(onHeightChange, true);
    const textareaRef = useExternRef(getRef, refResizeTextarea);
    React.useEffect(resize, [
        resize,
        platform
    ]);
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        className: classNames(styles['WriteBar'], platform === 'ios' && styles['WriteBar--ios'], shadow && styles['WriteBar--shadow'], className),
        style: style,
        children: /*#__PURE__*/ _jsxs("div", {
            className: styles['WriteBar__form'],
            children: [
                hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                    className: styles['WriteBar__before'],
                    children: before
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: styles['WriteBar__formIn'],
                    children: [
                        /*#__PURE__*/ _jsx(WriteBarTypography, {
                            ...restProps,
                            Component: "textarea",
                            className: styles['WriteBar__textarea'],
                            onChange: callMultiple(onChange, resize),
                            getRootRef: textareaRef
                        }),
                        hasReactNode(inlineAfter) && /*#__PURE__*/ _jsx("div", {
                            className: styles['WriteBar__inlineAfter'],
                            children: inlineAfter
                        })
                    ]
                }),
                hasReactNode(after) && /*#__PURE__*/ _jsx("div", {
                    className: styles['WriteBar__after'],
                    children: after
                })
            ]
        })
    });
};

//# sourceMappingURL=WriteBar.js.map