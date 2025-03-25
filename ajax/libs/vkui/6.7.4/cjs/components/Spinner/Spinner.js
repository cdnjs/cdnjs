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
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _animation = require("../../lib/animation");
const _RootComponent = require("../RootComponent/RootComponent");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const Spinner = /*#__PURE__*/ _react.memo((_param)=>{
    var { size = 'regular', children = 'Загружается...', disableAnimation = false, noColor = false } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "children",
        "disableAnimation",
        "noColor"
    ]);
    const isReducedMotion = (0, _animation.useReducedMotion)();
    const SpinnerIcon = {
        small: _icons.Icon16Spinner,
        regular: _icons.Icon24Spinner,
        medium: _icons.Icon32Spinner,
        large: _icons.Icon44Spinner
    }[size];
    let svgAnimateElement = null;
    const [isReadyForSetSVGAnimateElement, setIsReadyForSetSVGAnimateElement] = _react.useState(disableAnimation ? true : false);
    _react.useEffect(function waitReactHydrationBeforeSetSVGAnimateElement() {
        setIsReadyForSetSVGAnimateElement(true);
    }, []);
    if (isReadyForSetSVGAnimateElement && !disableAnimation) {
        if (isReducedMotion) {
            svgAnimateElement = /*#__PURE__*/ (0, _jsxruntime.jsx)("animate", {
                attributeName: "opacity",
                keyTimes: "0; 0.5; 1",
                values: "1; 0.1; 1",
                begin: "0s",
                dur: "2s",
                repeatCount: "indefinite"
            });
        } else {
            const center = {
                small: 8,
                regular: 12,
                medium: 16,
                large: 22
            }[size];
            svgAnimateElement = /*#__PURE__*/ (0, _jsxruntime.jsx)("animateTransform", {
                attributeType: "XML",
                attributeName: "transform",
                type: "rotate",
                from: `0 ${center} ${center}`,
                to: `360 ${center} ${center}`,
                dur: "0.7s",
                repeatCount: "indefinite"
            });
        }
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "span",
        role: "status"
    }, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiSpinner", noColor && "vkuiSpinner--no-color"),
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(SpinnerIcon, {
                children: svgAnimateElement
            }),
            (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                children: children
            })
        ]
    }));
});
Spinner.displayName = 'Spinner';

//# sourceMappingURL=Spinner.js.map