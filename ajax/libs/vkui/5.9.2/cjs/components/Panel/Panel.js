"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Panel", {
    enumerable: true,
    get: function() {
        return Panel;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _AppRootContext = require("../AppRoot/AppRootContext");
var _NavIdContext = require("../NavIdContext/NavIdContext");
var _RootComponent = require("../RootComponent/RootComponent");
var _TooltipContainer = require("../Tooltip/TooltipContainer");
var _Touch = require("../Touch/Touch");
var _obj;
var sizeXClassNames = (_obj = {
    none: "vkuiPanel--sizeX-none"
}, _define_property._(_obj, _adaptivity.SizeType.COMPACT, "vkuiPanel--sizeX-compact"), _define_property._(_obj, _adaptivity.SizeType.REGULAR, "vkuiPanel--sizeX-regular"), _obj);
var Panel = function(_param) {
    var _param_centered = _param.centered, centered = _param_centered === void 0 ? false : _param_centered, children = _param.children, nav = _param.nav, restProps = _object_without_properties._(_param, [
        "centered",
        "children",
        "nav"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    var layout = _react.useContext(_AppRootContext.AppRootContext).layout;
    return /*#__PURE__*/ _react.createElement(_NavIdContext.NavPanelIdContext.Provider, {
        value: restProps.id || nav
    }, /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiPanel", sizeXClassNames[sizeX], centered && "vkuiInternalPanel--centered", layout === "card" && "vkuiPanel--layout-card")
    }), /*#__PURE__*/ _react.createElement(_Touch.Touch, {
        Component: _TooltipContainer.TooltipContainer,
        className: (0, _vkjs.classNames)("vkuiPanel__in", "vkuiInternalPanel__in")
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanel__in-before"
    }), centered ? /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanel__centered"
    }, children) : children, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanel__in-after"
    }))));
};

//# sourceMappingURL=Panel.js.map