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
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _tooltipContainer = require("../Tooltip/TooltipContainer");
var _touch = require("../Touch/Touch");
var _obj;
var sizeXClassNames = (_obj = {
    none: "vkuiPanel--sizeX-none"
}, _defineProperty(_obj, _adaptivity.SizeType.COMPACT, "vkuiPanel--sizeX-compact"), _defineProperty(_obj, _adaptivity.SizeType.REGULAR, "vkuiPanel--sizeX-regular"), _obj);
var Panel = function(_param) {
    var _param_centered = _param.centered, centered = _param_centered === void 0 ? false : _param_centered, children = _param.children, getRootRef = _param.getRootRef, nav = _param.nav, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "centered",
        "children",
        "getRootRef",
        "nav",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiPanel", sizeXClassNames[sizeX], centered && "vkuiInternalPanel--centered", className)
    }), /*#__PURE__*/ _react.createElement(_touch.Touch, {
        Component: _tooltipContainer.TooltipContainer,
        className: (0, _vkjs.classNames)("vkuiPanel__in", "vkuiInternalPanel__in")
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanel__in-before"
    }), centered ? /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanel__centered"
    }, children) : children, platform === _platform.Platform.IOS && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiInternalPanel__fade"
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanel__in-after"
    })));
};

//# sourceMappingURL=Panel.js.map