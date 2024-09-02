"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelHeaderContext", {
    enumerable: true,
    get: function() {
        return PanelHeaderContext;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useGlobalOnClickOutside = require("../../hooks/useGlobalOnClickOutside");
const _usePlatform = require("../../hooks/usePlatform");
const _animation = require("../../lib/animation");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _FixedLayout = require("../FixedLayout/FixedLayout");
const sizeXClassNames = {
    none: "vkuiPanelHeaderContext--sizeX-none",
    compact: "vkuiPanelHeaderContext--sizeX-compact",
    regular: "vkuiPanelHeaderContext--sizeX-regular"
};
const PanelHeaderContext = (_param)=>{
    var { children, opened = false, className, onClose } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "opened",
        "className",
        "onClose"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { sizeX = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const elementRef = _react.useRef(null);
    const [animationState, animationHandlers] = (0, _animation.useCSSKeyframesAnimationController)(opened ? 'enter' : 'exit', undefined, true);
    const visible = animationState !== 'exited';
    (0, _ScrollContext.useScrollLock)(platform !== 'vkcom' && visible);
    const handleGlobalOnClickOutside = _react.useCallback((event)=>{
        if (opened) {
            event.stopPropagation();
            onClose();
        }
    }, [
        opened,
        onClose
    ]);
    (0, _useGlobalOnClickOutside.useGlobalOnClickOutside)(handleGlobalOnClickOutside, visible ? elementRef : null);
    if (!visible) {
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_FixedLayout.FixedLayout, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiPanelHeaderContext", platform === 'ios' && "vkuiPanelHeaderContext--ios", opened ? "vkuiPanelHeaderContext--opened" : "vkuiPanelHeaderContext--closing", sizeXClassNames[sizeX], className),
        vertical: "top",
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                onClick: (event)=>{
                    event.stopPropagation();
                    onClose();
                },
                className: "vkuiPanelHeaderContext__fade"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread_props._(_object_spread._({
                "data-testid": process.env.NODE_ENV === 'test' ? 'content' : undefined,
                className: "vkuiPanelHeaderContext__in",
                ref: elementRef
            }, animationHandlers), {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiPanelHeaderContext__content",
                    children: children
                })
            }))
        ]
    }));
};

//# sourceMappingURL=PanelHeaderContext.js.map