'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { useResizeTextarea } from "../Textarea/useResizeTextarea.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Title } from "../Typography/Title/Title.js";
import styles from "./WriteBar.module.css";
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
        className: classNames(styles.host, platform === 'ios' && styles.ios, shadow && styles.shadow, className),
        style: style,
        children: /*#__PURE__*/ _jsxs("div", {
            className: styles.form,
            children: [
                hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                    className: styles.before,
                    children: before
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: styles.formIn,
                    children: [
                        /*#__PURE__*/ _jsx(WriteBarTypography, {
                            ...restProps,
                            Component: "textarea",
                            className: styles.textarea,
                            onChange: callMultiple(onChange, resize),
                            getRootRef: textareaRef
                        }),
                        hasReactNode(inlineAfter) && /*#__PURE__*/ _jsx("div", {
                            className: styles.inlineAfter,
                            children: inlineAfter
                        })
                    ]
                }),
                hasReactNode(after) && /*#__PURE__*/ _jsx("div", {
                    className: styles.after,
                    children: after
                })
            ]
        })
    });
};

//# sourceMappingURL=WriteBar.js.map