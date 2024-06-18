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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const Spinner = /*#__PURE__*/ _react.memo((_param)=>{
    var { size = 'regular', children = 'Загружается...', disableAnimation } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "children",
        "disableAnimation"
    ]);
    const SpinnerIcon = {
        small: _icons.Icon16Spinner,
        regular: _icons.Icon24Spinner,
        medium: _icons.Icon32Spinner,
        large: _icons.Icon44Spinner
    }[size];
    const center = {
        small: 8,
        regular: 12,
        medium: 16,
        large: 22
    }[size];
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "span",
        role: "status"
    }, restProps), {
        baseClassName: "vkuiSpinner"
    }), /*#__PURE__*/ _react.createElement(SpinnerIcon, null, !disableAnimation && // TODO [a11y]: use reduced motion hook?
    //              https://github.com/VKCOM/VKUI/pull/4673
    /*#__PURE__*/ _react.createElement("animateTransform", {
        attributeName: "transform",
        attributeType: "XML",
        type: "rotate",
        from: `0 ${center} ${center}`,
        to: `360 ${center} ${center}`,
        dur: "0.7s",
        repeatCount: "indefinite"
    })), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, children));
});
Spinner.displayName = 'Spinner';

//# sourceMappingURL=Spinner.js.map