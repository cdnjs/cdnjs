"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Progress", {
    enumerable: true,
    get: function() {
        return Progress;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _math = require("../../helpers/math");
var PROGRESS_MIN_VALUE = 0;
var PROGRESS_MAX_VALUE = 100;
var Progress = function(_param) {
    var _param_value = _param.value, value = _param_value === void 0 ? 0 : _param_value, getRootRef = _param.getRootRef, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "value",
        "getRootRef",
        "className"
    ]);
    var progress = (0, _math.clamp)(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
    var title = "".concat(progress, " / ").concat(PROGRESS_MAX_VALUE);
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({
        "aria-valuenow": value,
        title: title
    }, restProps), {
        role: "progressbar",
        "aria-valuemin": PROGRESS_MIN_VALUE,
        "aria-valuemax": PROGRESS_MAX_VALUE,
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiProgress", className)
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiProgress__in",
        style: {
            width: "".concat(progress, "%")
        }
    }));
};

//# sourceMappingURL=Progress.js.map