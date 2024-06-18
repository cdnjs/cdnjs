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
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
const _usePlatform = require("../../hooks/usePlatform");
const _useTimeout = require("../../hooks/useTimeout");
const _dom = require("../../lib/dom");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _FixedLayout = require("../FixedLayout/FixedLayout");
const sizeXClassNames = {
    none: "vkuiPanelHeaderContext--sizeX-none",
    ['compact']: "vkuiPanelHeaderContext--sizeX-compact",
    ['regular']: "vkuiPanelHeaderContext--sizeX-regular"
};
const PanelHeaderContext = (_param)=>{
    var { children, onClose, opened = false, className } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "onClose",
        "opened",
        "className"
    ]);
    const { document } = (0, _dom.useDOM)();
    const platform = (0, _usePlatform.usePlatform)();
    const [visible, setVisible] = _react.useState(opened);
    const closing = visible && !opened;
    const { sizeX = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const elementRef = _react.useRef(null);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        opened && setVisible(true);
    }, [
        opened
    ]);
    (0, _ScrollContext.useScrollLock)(platform !== 'vkcom' && opened);
    // start closing on outer click
    (0, _useGlobalEventListener.useGlobalEventListener)(document, 'click', opened && !closing && ((event)=>{
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            event.stopPropagation();
            onClose();
        }
    }), {
        capture: true
    });
    // fallback onAnimationEnd when animationend not supported
    const onAnimationEnd = ()=>setVisible(false);
    const animationFallback = (0, _useTimeout.useTimeout)(onAnimationEnd, 200);
    _react.useEffect(()=>closing ? animationFallback.set() : animationFallback.clear(), [
        animationFallback,
        closing
    ]);
    return /*#__PURE__*/ _react.createElement(_FixedLayout.FixedLayout, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiPanelHeaderContext", platform === 'ios' && "vkuiPanelHeaderContext--ios", opened && "vkuiPanelHeaderContext--opened", closing && "vkuiPanelHeaderContext--closing", sizeXClassNames[sizeX], className),
        vertical: "top"
    }), visible && /*#__PURE__*/ _react.createElement("div", {
        onClick: (event)=>{
            event.stopPropagation();
            onClose();
        },
        className: "vkuiPanelHeaderContext__fade"
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeaderContext__in",
        ref: elementRef,
        onAnimationEnd: closing ? onAnimationEnd : undefined
    }, visible && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeaderContext__content"
    }, children)));
};

//# sourceMappingURL=PanelHeaderContext.js.map