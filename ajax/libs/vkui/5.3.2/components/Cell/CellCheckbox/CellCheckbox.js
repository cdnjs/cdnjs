import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { Icon24CheckBoxOff, Icon24CheckBoxOn, Icon24CheckCircleOff, Icon24CheckCircleOn } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../../hooks/usePlatform";
import { Platform } from "../../../lib/platform";
import { VisuallyHiddenInput } from "../../VisuallyHiddenInput/VisuallyHiddenInput";
export var CellCheckbox = function(_param) {
    var className = _param.className, style = _param.style, restProps = _object_without_properties(_param, [
        "className",
        "style"
    ]);
    var platform = usePlatform();
    var IconOff = platform === Platform.IOS || platform === Platform.VKCOM ? Icon24CheckCircleOff : Icon24CheckBoxOff;
    var IconOn = platform === Platform.IOS || platform === Platform.VKCOM ? Icon24CheckCircleOn : Icon24CheckBoxOn;
    return /*#__PURE__*/ React.createElement("span", {
        className: className,
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHiddenInput, _object_spread({
        className: "vkuiCellCheckbox__input",
        type: "checkbox"
    }, restProps)), /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--off"),
        "aria-hidden": true
    }, /*#__PURE__*/ React.createElement(IconOff, null)), /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--on"),
        "aria-hidden": true
    }, /*#__PURE__*/ React.createElement(IconOn, null)));
};

//# sourceMappingURL=CellCheckbox.js.map