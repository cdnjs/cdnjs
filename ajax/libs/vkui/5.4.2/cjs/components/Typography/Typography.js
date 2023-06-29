"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Typography", {
    enumerable: true,
    get: function() {
        return Typography;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Typography = function(_param) /*#__PURE__*/ {
    var className = _param.className, weight = _param.weight, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, normalize = _param.normalize, getRootRef = _param.getRootRef, restProps = _objectWithoutProperties(_param, [
        "className",
        "weight",
        "Component",
        "normalize",
        "getRootRef"
    ]);
    return _react.createElement(Component, _objectSpreadProps(_objectSpread({}, restProps), {
        ref: getRootRef,
        className: (0, _vkjs.classNames)(className, normalize && "vkuiTypography--normalize", weight && ({
            "1": "vkuiTypography--weight-1",
            "2": "vkuiTypography--weight-2",
            "3": "vkuiTypography--weight-3"
        })[weight])
    }));
};

//# sourceMappingURL=Typography.js.map