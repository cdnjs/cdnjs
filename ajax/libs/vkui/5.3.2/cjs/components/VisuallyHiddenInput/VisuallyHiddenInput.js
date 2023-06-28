"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VisuallyHiddenInput", {
    enumerable: true,
    get: function() {
        return VisuallyHiddenInput;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var VisuallyHiddenInput = function(_param) {
    var getRef = _param.getRef, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "getRef",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement("input", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiVisuallyHiddenInput", className),
        ref: getRef
    }));
};

//# sourceMappingURL=VisuallyHiddenInput.js.map