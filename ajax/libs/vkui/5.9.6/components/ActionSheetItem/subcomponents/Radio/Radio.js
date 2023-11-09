import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon20CheckCircleOn, Icon24CheckCircleOn } from "@vkontakte/icons";
import { AdaptiveIconRenderer } from "../../../AdaptiveIconRenderer/AdaptiveIconRenderer";
import { RootComponent } from "../../../RootComponent/RootComponent";
import { VisuallyHidden } from "../../../VisuallyHidden/VisuallyHidden";
var adaptiveIcon = /*#__PURE__*/ React.createElement(AdaptiveIconRenderer, {
    IconCompact: Icon20CheckCircleOn,
    IconRegular: Icon24CheckCircleOn
});
export var Radio = function(_param) {
    var _param_children = _param.children, children = _param_children === void 0 ? adaptiveIcon : _param_children, getRootRef = _param.getRootRef, getRef = _param.getRef, className = _param.className, style = _param.style, restProps = _object_without_properties(_param, [
        "children",
        "getRootRef",
        "getRef",
        "className",
        "style"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        getRootRef: getRootRef,
        className: className,
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, _object_spread({
        Component: "input",
        getRootRef: getRef,
        type: "radio",
        className: "vkuiActionSheetItemRadio__input"
    }, restProps)), children);
};

//# sourceMappingURL=Radio.js.map