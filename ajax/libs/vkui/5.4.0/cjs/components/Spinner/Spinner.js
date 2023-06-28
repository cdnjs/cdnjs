"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Spinner", {
    enumerable: true,
    get: function() {
        return Spinner;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var Spinner = /*#__PURE__*/ _react.memo(function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "regular" : _param_size, tmp = _param["aria-label"], ariaLabel = tmp === void 0 ? "Загружается..." : tmp, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "size",
        "aria-label",
        "className"
    ]);
    var SpinnerIcon = {
        small: _icons.Icon16Spinner,
        regular: _icons.Icon24Spinner,
        medium: _icons.Icon32Spinner,
        large: _icons.Icon44Spinner
    }[size];
    return /*#__PURE__*/ _react.createElement("span", _objectSpreadProps(_objectSpread({
        role: "status",
        "aria-label": ariaLabel
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiSpinner", className)
    }), /*#__PURE__*/ _react.createElement(SpinnerIcon, {
        className: "vkuiSpinner__self"
    }));
});
Spinner.displayName = "Spinner";

//# sourceMappingURL=Spinner.js.map