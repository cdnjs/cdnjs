"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Subhead", {
    enumerable: true,
    get: function() {
        return Subhead;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../../hooks/useAdaptivity");
var _adaptivity = require("../../../lib/adaptivity");
var _typography = require("../Typography");
var sizeYClassNames = _defineProperty({
    none: "vkuiSubhead--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSubhead--sizeY-compact");
var Subhead = function(_param) {
    var className = _param.className, _param_Component = _param.Component, Component = _param_Component === void 0 ? "h5" : _param_Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _objectWithoutProperties(_param, [
        "className",
        "Component",
        "normalize"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement(_typography.Typography, _objectSpread({
        Component: Component,
        normalize: normalize,
        className: (0, _vkjs.classNames)(className, "vkuiSubhead", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY])
    }, restProps));
};

//# sourceMappingURL=Subhead.js.map