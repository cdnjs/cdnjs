import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { PopoutRoot } from "../PopoutRoot/PopoutRoot";
/**
 * @see https://vkcom.github.io/VKUI/#/SplitLayout
 */ export var SplitLayout = function(_param) {
    var popout = _param.popout, modal = _param.modal, header = _param.header, children = _param.children, getRootRef = _param.getRootRef, getRef = _param.getRef, className = _param.className, restProps = _object_without_properties(_param, [
        "popout",
        "modal",
        "header",
        "children",
        "getRootRef",
        "getRef",
        "className"
    ]);
    var platform = usePlatform();
    return /*#__PURE__*/ React.createElement(PopoutRoot, {
        className: classNames("vkuiSplitLayout", platform === Platform.IOS && "vkuiSplitLayout--ios"),
        popout: popout,
        modal: modal,
        getRootRef: getRootRef
    }, header, /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({}, restProps), {
        ref: getRef,
        className: classNames("vkuiSplitLayout__inner", !!header && "vkuiSplitLayout__inner--header", className)
    }), children));
};

//# sourceMappingURL=SplitLayout.js.map