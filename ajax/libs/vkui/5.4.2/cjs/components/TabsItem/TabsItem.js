"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TabsItem", {
    enumerable: true,
    get: function() {
        return TabsItem;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _warnOnce = require("../../lib/warnOnce");
var _tabs = require("../Tabs/Tabs");
var _tappable = require("../Tappable/Tappable");
var _headline = require("../Typography/Headline/Headline");
var _subhead = require("../Typography/Subhead/Subhead");
var _visuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var sizeYClassNames = _defineProperty({
    none: "vkuiTabsItem--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiTabsItem--sizeY-compact");
var warn = (0, _warnOnce.warnOnce)("TabsItem");
var TabsItem = function(_param) {
    var before = _param.before, children = _param.children, status = _param.status, after = _param.after, _param_selected = _param.selected, selected = _param_selected === void 0 ? false : _param_selected, className = _param.className, _param_role = _param.role, role = _param_role === void 0 ? "tab" : _param_role, tabIndexProp = _param.tabIndex, restProps = _objectWithoutProperties(_param, [
        "before",
        "children",
        "status",
        "after",
        "selected",
        "className",
        "role",
        "tabIndex"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _React_useContext = _react.useContext(_tabs.TabsModeContext), mode = _React_useContext.mode, withGaps = _React_useContext.withGaps;
    var statusComponent = null;
    var isTabFlow = role === "tab";
    if (status) {
        statusComponent = typeof status === "number" ? /*#__PURE__*/ _react.createElement(_subhead.Subhead, {
            Component: "span",
            className: (0, _vkjs.classNames)("vkuiTabsItem__status", "vkuiTabsItem__status--count"),
            weight: "2"
        }, /*#__PURE__*/ _react.createElement(_visuallyHidden.VisuallyHidden, null, "\xa0"), status) : /*#__PURE__*/ _react.createElement("span", {
            className: "vkuiTabsItem__status"
        }, /*#__PURE__*/ _react.createElement(_visuallyHidden.VisuallyHidden, null, "\xa0"), status);
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
    return /*#__PURE__*/ _react.createElement(_tappable.Tappable, _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiTabsItem", mode && ({
            default: "vkuiTabsItem--mode-default",
            accent: "vkuiTabsItem--mode-accent",
            secondary: "vkuiTabsItem--mode-secondary"
        })[mode], selected && "vkuiTabsItem--selected", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], withGaps && "vkuiTabsItem--withGaps", className),
        hoverMode: "vkuiTabsItem--hover",
        activeMode: "",
        focusVisibleMode: "inside",
        hasActive: false,
        role: role,
        "aria-selected": selected,
        tabIndex: tabIndex
    }), before && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabsItem__before"
    }, before), /*#__PURE__*/ _react.createElement(_headline.Headline, {
        Component: "span",
        className: "vkuiTabsItem__label",
        level: mode === "default" ? "1" : "2",
        weight: "2"
    }, children), statusComponent, after && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabsItem__after"
    }, after), mode === "default" && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabsItem__underline",
        "aria-hidden": true,
        "data-selected": selected
    }));
};

//# sourceMappingURL=TabsItem.js.map