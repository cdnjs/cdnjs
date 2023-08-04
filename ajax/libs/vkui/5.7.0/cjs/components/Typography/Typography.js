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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Typography = function(_param) /*#__PURE__*/ {
    var className = _param.className, weight = _param.weight, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, normalize = _param.normalize, getRootRef = _param.getRootRef, restProps = _object_without_properties._(_param, [
        "className",
        "weight",
        "Component",
        "normalize",
        "getRootRef"
    ]);
    return _react.createElement(Component, _object_spread_props._(_object_spread._({}, restProps), {
        ref: getRootRef,
        className: (0, _vkjs.classNames)(className, normalize && "vkuiTypography--normalize", weight && ({
            "1": "vkuiTypography--weight-1",
            "2": "vkuiTypography--weight-2",
            "3": "vkuiTypography--weight-3"
        })[weight])
    }));
};

//# sourceMappingURL=Typography.js.map