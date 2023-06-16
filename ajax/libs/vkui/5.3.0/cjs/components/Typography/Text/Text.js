"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Text", {
    enumerable: true,
    get: function() {
        return Text;
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
var _adaptivity = require("../../../lib/adaptivity");
var _warnOnce = require("../../../lib/warnOnce");
var sizeYClassNames = _defineProperty({
    none: "vkuiText--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiText--sizeY-compact");
var warn = (0, _warnOnce.warnOnce)("Text");
var Text = function(_param) {
    var className = _param.className, children = _param.children, weight = _param.weight, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, getRootRef = _param.getRootRef, restProps = _objectWithoutProperties(_param, [
        "className",
        "children",
        "weight",
        "Component",
        "getRootRef"
    ]);
    if (process.env.NODE_ENV === "development" && typeof Component !== "string" && getRootRef) {
        warn('Свойство "getRootRef" может использоваться только с компонентами DOM', "error");
    }
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, restProps), {
        ref: getRootRef,
        className: (0, _vkjs.classNames)(className, "vkuiText", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], weight && ({
            "1": "vkuiText--weight-1",
            "2": "vkuiText--weight-2",
            "3": "vkuiText--weight-3"
        })[weight])
    }), children);
};

//# sourceMappingURL=Text.js.map