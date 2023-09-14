import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon20CheckBoxOff, Icon20CheckBoxOn, Icon24CheckBoxOff, Icon24CheckBoxOn, Icon24CheckCircleOff, Icon24CheckCircleOn } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../../hooks/usePlatform";
import { Platform } from "../../../lib/platform";
import { AdaptiveIconRenderer } from "../../AdaptiveIconRenderer/AdaptiveIconRenderer";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden";
var CheckBoxOn = function() {
    return /*#__PURE__*/ React.createElement(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckBoxOn,
        IconRegular: Icon24CheckBoxOn
    });
};
var CheckBoxOff = function() {
    return /*#__PURE__*/ React.createElement(AdaptiveIconRenderer, {
        IconCompact: Icon20CheckBoxOff,
        IconRegular: Icon24CheckBoxOff
    });
};
function useTypeIcon(type) {
    var platform = usePlatform();
    if (type !== "auto") {
        return type;
    }
    if (platform === Platform.IOS || platform === Platform.VKCOM) {
        return "circle";
    }
    return "square";
}
export var CellCheckbox = function(_param) {
    var getRootRef = _param.getRootRef, getRef = _param.getRef, className = _param.className, style = _param.style, _param_type = _param.type, type = _param_type === void 0 ? "auto" : _param_type, restProps = _object_without_properties(_param, [
        "getRootRef",
        "getRef",
        "className",
        "style",
        "type"
    ]);
    var typeIcon = useTypeIcon(type);
    var IconOff = typeIcon === "circle" ? Icon24CheckCircleOff : CheckBoxOff;
    var IconOn = typeIcon === "circle" ? Icon24CheckCircleOn : CheckBoxOn;
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