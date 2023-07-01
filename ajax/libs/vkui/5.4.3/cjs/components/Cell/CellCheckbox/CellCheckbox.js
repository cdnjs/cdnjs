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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../../hooks/usePlatform");
var _platform = require("../../../lib/platform");
var _visuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
var CellCheckbox = function(_param) {
    var className = _param.className, style = _param.style, getRef = _param.getRef, restProps = _objectWithoutProperties(_param, [
        "className",
        "style",
        "getRef"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var IconOff = platform === _platform.Platform.IOS || platform === _platform.Platform.VKCOM ? _icons.Icon24CheckCircleOff : _icons.Icon24CheckBoxOff;
    var IconOn = platform === _platform.Platform.IOS || platform === _platform.Platform.VKCOM ? _icons.Icon24CheckCircleOn : _icons.Icon24CheckBoxOn;
    return /*#__PURE__*/ _react.createElement("span", {
        className: className,
        style: style
    }, /*#__PURE__*/ _react.createElement(_visuallyHidden.VisuallyHidden, _objectSpreadProps(_objectSpread({}, restProps), {
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