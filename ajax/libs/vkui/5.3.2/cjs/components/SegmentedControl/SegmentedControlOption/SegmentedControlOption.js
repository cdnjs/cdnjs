"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SegmentedControlOption", {
    enumerable: true,
    get: function() {
        return SegmentedControlOption;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../../hooks/useAdaptivity");
var _useFocusVisible = require("../../../hooks/useFocusVisible");
var _adaptivity = require("../../../lib/adaptivity");
var _callMultiple = require("../../../lib/callMultiple");
var _focusVisible = require("../../FocusVisible/FocusVisible");
var _visuallyHiddenInput = require("../../VisuallyHiddenInput/VisuallyHiddenInput");
var sizeYClassNames = _defineProperty({
    none: "vkuiSegmentedControlOption__content--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSegmentedControlOption__content--sizeY-compact");
var SegmentedControlOption = function(_param) {
    var className = _param.className, style = _param.style, children = _param.children, restProps = _objectWithoutProperties(_param, [
        "className",
        "style",
        "children"
    ]);
    var _useFocusVisible1 = (0, _useFocusVisible.useFocusVisible)(), onBlur = _useFocusVisible1.onBlur, onFocus = _useFocusVisible1.onFocus;
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement("label", {
        className: (0, _vkjs.classNames)("vkuiSegmentedControlOption", restProps.checked && "vkuiSegmentedControlOption--checked", className),
        style: style
    }, /*#__PURE__*/ _react.createElement(_visuallyHiddenInput.VisuallyHiddenInput, _objectSpreadProps(_objectSpread({}, restProps), {
        type: "radio",
        onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
        onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
    })), /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiSegmentedControlOption__content", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY])
    }, children), /*#__PURE__*/ _react.createElement(_focusVisible.FocusVisible, {
        mode: "inside"
    }));
};

//# sourceMappingURL=SegmentedControlOption.js.map