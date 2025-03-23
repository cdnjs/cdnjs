import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { usePlatform } from '../../hooks/usePlatform';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
export const AlertHeader = (props)=>{
    const platform = usePlatform();
    switch(platform){
        case 'ios':
            return /*#__PURE__*/ _jsx(Title, _object_spread({
                className: "vkuiAlert__header",
                weight: "1",
                level: "3"
            }, props));
        default:
            return /*#__PURE__*/ _jsx(Title, _object_spread({
                className: "vkuiAlert__header",
                weight: "2",
                level: "2"
            }, props));
    }
};
export const AlertText = (props)=>{
    const platform = usePlatform();
    switch(platform){
        case 'vkcom':
            return /*#__PURE__*/ _jsx(Footnote, _object_spread({
                className: "vkuiAlert__text"
            }, props));
        case 'ios':
            return /*#__PURE__*/ _jsx(Caption, _object_spread({
                className: "vkuiAlert__text"
            }, props));
        default:
            return /*#__PURE__*/ _jsx(Text, _object_spread({
                Component: "span",
                className: "vkuiAlert__text",
                weight: "3"
            }, props));
    }
};

//# sourceMappingURL=AlertTypography.js.map