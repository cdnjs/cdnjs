'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { usePlatform } from "../../hooks/usePlatform.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Text } from "../Typography/Text/Text.js";
import { Title } from "../Typography/Title/Title.js";
import styles from "./Alert.module.css";
export const AlertTitle = (props)=>{
    const platform = usePlatform();
    switch(platform){
        case 'ios':
            return /*#__PURE__*/ _jsx(Title, {
                className: styles.title,
                weight: "1",
                level: "3",
                ...props
            });
        default:
            return /*#__PURE__*/ _jsx(Title, {
                className: styles.title,
                weight: "2",
                level: "2",
                ...props
            });
    }
};
export const AlertDescription = (props)=>{
    const platform = usePlatform();
    switch(platform){
        case 'vkcom':
            return /*#__PURE__*/ _jsx(Footnote, {
                className: styles.description,
                ...props
            });
        case 'ios':
            return /*#__PURE__*/ _jsx(Caption, {
                className: styles.description,
                ...props
            });
        default:
            return /*#__PURE__*/ _jsx(Text, {
                Component: "span",
                className: styles.description,
                weight: "3",
                ...props
            });
    }
};

//# sourceMappingURL=AlertTypography.js.map