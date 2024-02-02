import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { SizeType } from "../../lib/adaptivity";
import { AppRootContext } from "../AppRoot/AppRootContext";
import { NavPanelIdContext } from "../NavIdContext/NavIdContext";
import { RootComponent } from "../RootComponent/RootComponent";
import { TooltipContainer } from "../Tooltip/TooltipContainer";
import { Touch } from "../Touch/Touch";
var _obj;
var sizeXClassNames = (_obj = {
    none: "vkuiPanel--sizeX-none"
}, _define_property(_obj, SizeType.COMPACT, "vkuiPanel--sizeX-compact"), _define_property(_obj, SizeType.REGULAR, "vkuiPanel--sizeX-regular"), _obj);
/**
 * @see https://vkcom.github.io/VKUI/#/Panel
 */ export var Panel = function(_param) {
    var _param_centered = _param.centered, centered = _param_centered === void 0 ? false : _param_centered, children = _param.children, nav = _param.nav, restProps = _object_without_properties(_param, [
        "centered",
        "children",
        "nav"
    ]);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeX = _useAdaptivity.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    var layout = React.useContext(AppRootContext).layout;
    return /*#__PURE__*/ React.createElement(NavPanelIdContext.Provider, {
        value: restProps.id || nav
    }, /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiPanel", sizeXClassNames[sizeX], centered && "vkuiInternalPanel--centered", layout === "card" && "vkuiPanel--layout-card")
    }), /*#__PURE__*/ React.createElement(Touch, {
        Component: TooltipContainer,
        className: classNames("vkuiPanel__in", "vkuiInternalPanel__in")
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanel__in-before"
    }), centered ? /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanel__centered"
    }, children) : children, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanel__in-after"
    }))));
};

//# sourceMappingURL=Panel.js.map