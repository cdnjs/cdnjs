import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { Icon24CheckBoxOff, Icon24CheckBoxOn, Icon24CheckCircleOff, Icon24CheckCircleOn } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../../hooks/usePlatform";
import { Platform } from "../../../lib/platform";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden";
export var CellCheckbox = function(_param) {
    var className = _param.className, style = _param.style, getRef = _param.getRef, restProps = _object_without_properties(_param, [
        "className",
        "style",
        "getRef"
    ]);
    var platform = usePlatform();
    var IconOff = platform === Platform.IOS || platform === Platform.VKCOM ? Icon24CheckCircleOff : Icon24CheckBoxOff;
    var IconOn = platform === Platform.IOS || platform === Platform.VKCOM ? Icon24CheckCircleOn : Icon24CheckBoxOn;
    return /*#__PURE__*/ React.createElement("span", {
        className: className,
        style: style
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