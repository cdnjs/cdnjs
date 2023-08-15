"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CellCheckbox", {
    enumerable: true,
    get: function() {
        return CellCheckbox;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../../hooks/usePlatform");
var _platform = require("../../../lib/platform");
var _AdaptiveIconRenderer = require("../../AdaptiveIconRenderer/AdaptiveIconRenderer");
var _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
var CheckBoxOn = function() {
    return /*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
        IconCompact: _icons.Icon20CheckBoxOn,
        IconRegular: _icons.Icon24CheckBoxOn
    });
};
var CheckBoxOff = function() {
    return /*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
        IconCompact: _icons.Icon20CheckBoxOff,
        IconRegular: _icons.Icon24CheckBoxOff
    });
};
function useTypeIcon(type) {
    var platform = (0, _usePlatform.usePlatform)();
    if (type !== "auto") {
        return type;
    }
    if (platform === _platform.Platform.IOS || platform === _platform.Platform.VKCOM) {
        return "circle";
    }
    return "square";
}
var CellCheckbox = function(_param) {
    var getRootRef = _param.getRootRef, getRef = _param.getRef, className = _param.className, style = _param.style, _param_type = _param.type, type = _param_type === void 0 ? "auto" : _param_type, restProps = _object_without_properties._(_param, [
        "getRootRef",
        "getRef",
        "className",
        "style",
        "type"
    ]);
    var typeIcon = useTypeIcon(type);
    var IconOff = typeIcon === "circle" ? _icons.Icon24CheckCircleOff : CheckBoxOff;
    var IconOn = typeIcon === "circle" ? _icons.Icon24CheckCircleOn : CheckBoxOn;
    return /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiCellCheckbox", className),
        style: style,
        ref: getRootRef
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "input",
        type: "checkbox",
        className: "vkuiCellCheckbox__input",
        getRootRef: getRef
    })), /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--off"),
        "aria-hidden": true
    }, /*#__PURE__*/ _react.createElement(IconOff, null)), /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--on"),
        "aria-hidden": true
    }, /*#__PURE__*/ _react.createElement(IconOn, null)));
};

//# sourceMappingURL=CellCheckbox.js.map