"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelSpinner", {
    enumerable: true,
    get: function() {
        return PanelSpinner;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _spinner = require("../Spinner/Spinner");
var PanelSpinner = /*#__PURE__*/ _react.memo(function(_param) /*#__PURE__*/ {
    var _param_height = _param.height, height = _param_height === void 0 ? 96 : _param_height, style = _param.style, restProps = _objectWithoutProperties(_param, [
        "height",
        "style"
    ]);
    return _react.createElement(_spinner.Spinner, _objectSpreadProps(_objectSpread({
        size: "regular"
    }, restProps), {
        style: _objectSpread({
            height: height
        }, style)
    }));
});
PanelSpinner.displayName = "PanelSpinner";

//# sourceMappingURL=PanelSpinner.js.map