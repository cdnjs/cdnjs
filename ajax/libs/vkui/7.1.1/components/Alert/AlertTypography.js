'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { usePlatform } from "../../hooks/usePlatform.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Text } from "../Typography/Text/Text.js";
import { Title } from "../Typography/Title/Title.js";
export const AlertTitle = (props)=>{
    const platform = usePlatform();
    switch(platform){
        case 'ios':
            return /*#__PURE__*/ _jsx(Title, _object_spread({
                className: "vkuiAlert__title",
                weight: "1",
                level: "3"
            }, props));
        default:
            return /*#__PURE__*/ _jsx(Title, _object_spread({
                className: "vkuiAlert__title",
                weight: "2",
                level: "2"
            }, props));
    }
};
export const AlertDescription = (props)=>{
    const platform = usePlatform();
    switch(platform){
        case 'vkcom':
            return /*#__PURE__*/ _jsx(Footnote, _object_spread({
                className: "vkuiAlert__description"
            }, props));
        case 'ios':
            return /*#__PURE__*/ _jsx(Caption, _object_spread({
                className: "vkuiAlert__description"
            }, props));
        default:
            return /*#__PURE__*/ _jsx(Text, _object_spread({
                Component: "span",
                className: "vkuiAlert__description",
                weight: "3"
            }, props));
    }
};

//# sourceMappingURL=AlertTypography.js.map