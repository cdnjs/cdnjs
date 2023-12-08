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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../../hooks/useAdaptivity");
const _Typography = require("../Typography");
const sizeYClassNames = {
    none: "vkuiSubhead--sizeY-none",
    ['compact']: "vkuiSubhead--sizeY-compact"
};
const Subhead = (_param)=>{
    var { className, Component = 'span', normalize = true } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "Component",
        "normalize"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ _react.createElement(_Typography.Typography, _object_spread._({
        Component: Component,
        normalize: normalize,
        className: (0, _vkjs.classNames)(className, "vkuiSubhead", sizeY !== 'regular' && sizeYClassNames[sizeY])
    }, restProps));
};

//# sourceMappingURL=Subhead.js.map