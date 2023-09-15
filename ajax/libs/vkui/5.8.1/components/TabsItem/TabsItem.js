import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { SizeType } from "../../lib/adaptivity";
import { warnOnce } from "../../lib/warnOnce";
import { TabsModeContext } from "../Tabs/Tabs";
import { Tappable } from "../Tappable/Tappable";
import { Headline } from "../Typography/Headline/Headline";
import { Subhead } from "../Typography/Subhead/Subhead";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden";
var sizeYClassNames = _define_property({
    none: "vkuiTabsItem--sizeY-none"
}, SizeType.COMPACT, "vkuiTabsItem--sizeY-compact");
var stylesMode = {
    default: "vkuiTabsItem--mode-default",
    accent: "vkuiTabsItem--mode-accent",
    secondary: "vkuiTabsItem--mode-secondary"
};
var warn = warnOnce("TabsItem");
/**
 * @see https://vkcom.github.io/VKUI/#/TabsItem
 */ export var TabsItem = function(_param) {
    var before = _param.before, children = _param.children, status = _param.status, after = _param.after, _param_selected = _param.selected, selected = _param_selected === void 0 ? false : _param_selected, className = _param.className, _param_role = _param.role, role = _param_role === void 0 ? "tab" : _param_role, tabIndexProp = _param.tabIndex, restProps = _object_without_properties(_param, [
        "before",
        "children",
        "status",
        "after",
        "selected",
        "className",
        "role",
        "tabIndex"
    ]);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _React_useContext = React.useContext(TabsModeContext), mode = _React_useContext.mode, withGaps = _React_useContext.withGaps;
    var statusComponent = null;
    var isTabFlow = role === "tab";
    if (status) {
        statusComponent = typeof status === "number" ? /*#__PURE__*/ React.createElement(Subhead, {
            Component: "span",
            className: classNames("vkuiTabsItem__status", "vkuiTabsItem__status--count"),
            weight: "2"
        }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, "\xa0"), status) : /*#__PURE__*/ React.createElement("span", {
            className: "vkuiTabsItem__status"
        }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, "\xa0"), status);
    }
    if (process.env.NODE_ENV === "development" && isTabFlow) {
        if (!restProps["aria-controls"]) {
            warn('Передайте в "aria-controls" id контролируемого блока', "warn");
        } else if (!restProps["id"]) {
            warn('Передайте "id" компоненту для использования в "aria-labelledby" контролируемого блока', "warn");
        }
    }
    var tabIndex = tabIndexProp;
    if (isTabFlow && tabIndex === undefined) {
        tabIndex = selected ? 0 : -1;
    }
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiTabsItem", mode && stylesMode[mode], selected && "vkuiTabsItem--selected", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], withGaps && "vkuiTabsItem--withGaps", className),
        hoverMode: "vkuiTabsItem--hover",
        activeMode: "",
        focusVisibleMode: "inside",
        hasActive: false,
        role: role,
        "aria-selected": selected,
        tabIndex: tabIndex
    }), before && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiTabsItem__before"
    }, before), /*#__PURE__*/ React.createElement(Headline, {
        Component: "span",
        className: "vkuiTabsItem__label",
        level: mode === "default" ? "1" : "2",
        weight: "2"
    }, children), statusComponent, after && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiTabsItem__after"
    }, after), mode === "default" && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiTabsItem__underline",
        "aria-hidden": true,
        "data-selected": selected
    }));
};

//# sourceMappingURL=TabsItem.js.map