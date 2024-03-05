import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon20CheckBoxOff, Icon20CheckBoxOn, Icon24CheckBoxOff, Icon24CheckBoxOn, Icon24CheckCircleOff, Icon24CheckCircleOn } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../../hooks/usePlatform';
import { AdaptiveIconRenderer } from '../../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
const CheckBoxOn = ()=>/*#__PURE__*/ React.createElement(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckBoxOn,
        IconRegular: Icon24CheckBoxOn
    });
const CheckBoxOff = ()=>/*#__PURE__*/ React.createElement(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckBoxOff,
        IconRegular: Icon24CheckBoxOff
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
    const IconOff = typeIcon === 'circle' ? Icon24CheckCircleOff : CheckBoxOff;
    const IconOn = typeIcon === 'circle' ? Icon24CheckCircleOn : CheckBoxOn;
    return /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiCellCheckbox", className),
        style: style,
        ref: getRootRef
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, _object_spread_props(_object_spread({}, restProps), {
        Component: "input",
        type: "checkbox",
        className: "vkuiCellCheckbox__input",
        getRootRef: getRef
    })), /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--off"),
        "aria-hidden": true
    }, /*#__PURE__*/ React.createElement(IconOff, null)), /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--on"),
        "aria-hidden": true
    }, /*#__PURE__*/ React.createElement(IconOn, null)));
};

//# sourceMappingURL=CellCheckbox.js.map