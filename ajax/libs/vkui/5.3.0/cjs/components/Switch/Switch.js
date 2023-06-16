"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Switch", {
    enumerable: true,
    get: function() {
        return Switch;
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
var _useFocusVisible = require("../../hooks/useFocusVisible");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _callMultiple = require("../../lib/callMultiple");
var _platform = require("../../lib/platform");
var _focusVisible = require("../FocusVisible/FocusVisible");
var _visuallyHiddenInput = require("../VisuallyHiddenInput/VisuallyHiddenInput");
var sizeYClassNames = _defineProperty({
    none: "vkuiSwitch--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSwitch--sizeY-compact");
var Switch = function(_param) {
    var style = _param.style, className = _param.className, getRootRef = _param.getRootRef, restProps = _objectWithoutProperties(_param, [
        "style",
        "className",
        "getRootRef"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _useFocusVisible1 = (0, _useFocusVisible.useFocusVisible)(), onBlur = _useFocusVisible1.onBlur, onFocus = _useFocusVisible1.onFocus;
    return /*#__PURE__*/ _react.createElement("label", {
        className: (0, _vkjs.classNames)("vkuiSwitch", platform === _platform.Platform.IOS && "vkuiSwitch--ios", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], restProps.disabled && "vkuiSwitch--disabled", className),
        style: style,
        ref: getRootRef
    }, /*#__PURE__*/ _react.createElement(_visuallyHiddenInput.VisuallyHiddenInput, _objectSpreadProps(_objectSpread({}, restProps), {
        type: "checkbox",
        className: "vkuiSwitch__self",
        onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
        onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
    })), /*#__PURE__*/ _react.createElement("span", {
        "aria-hidden": true,
        className: "vkuiSwitch__pseudo"
    }), /*#__PURE__*/ _react.createElement(_focusVisible.FocusVisible, {
        mode: "outside"
    }));
};

//# sourceMappingURL=Switch.js.map