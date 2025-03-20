import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon20CheckBoxOff, Icon20CheckBoxOn, Icon20CheckCircleOff, Icon20CheckCircleOn, Icon24CheckBoxOff, Icon24CheckBoxOn, Icon24CheckCircleOff, Icon24CheckCircleOn } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../../hooks/usePlatform';
import { AdaptiveIconRenderer } from '../../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
const CheckBoxOn = ()=>/*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckBoxOn,
        IconRegular: Icon24CheckBoxOn
    });
const CheckBoxOff = ()=>/*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckBoxOff,
        IconRegular: Icon24CheckBoxOff
    });
const CheckCircleOn = ()=>/*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckCircleOn,
        IconRegular: Icon24CheckCircleOn
    });
const CheckCircleOff = ()=>/*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckCircleOff,
        IconRegular: Icon24CheckCircleOff
    });
function useTypeIcon(type) {
    const platform = usePlatform();
    if (type !== 'auto') {
        return type;
    }
    if (platform === 'ios' || platform === 'vkcom') {
        return 'circle';
    }
    return 'square';
}
export const CellCheckbox = (_param)=>{
    var { getRootRef, getRef, className, style, type = 'auto' } = _param, restProps = _object_without_properties(_param, [
        "getRootRef",
        "getRef",
        "className",
        "style",
        "type"
    ]);
    const typeIcon = useTypeIcon(type);
    const IconOff = typeIcon === 'circle' ? CheckCircleOff : CheckBoxOff;
    const IconOn = typeIcon === 'circle' ? CheckCircleOn : CheckBoxOn;
    return /*#__PURE__*/ _jsxs("span", {
        className: classNames("vkuiCellCheckbox", className),
        style: style,
        ref: getRootRef,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, _object_spread_props(_object_spread({}, restProps), {
                Component: "input",
                type: "checkbox",
                className: "vkuiCellCheckbox__input",
                getRootRef: getRef
            })),
            /*#__PURE__*/ _jsx("span", {
                className: classNames("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--off"),
                "aria-hidden": true,
                children: /*#__PURE__*/ _jsx(IconOff, {})
            }),
            /*#__PURE__*/ _jsx("span", {
                className: classNames("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--on"),
                "aria-hidden": true,
                children: /*#__PURE__*/ _jsx(IconOn, {})
            })
        ]
    });
};

//# sourceMappingURL=CellCheckbox.js.map