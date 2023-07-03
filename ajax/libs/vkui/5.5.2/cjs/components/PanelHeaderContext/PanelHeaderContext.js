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
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _usePlatform = require("../../hooks/usePlatform");
var _useTimeout = require("../../hooks/useTimeout");
var _adaptivity = require("../../lib/adaptivity");
var _dom = require("../../lib/dom");
var _platform = require("../../lib/platform");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _FixedLayout = require("../FixedLayout/FixedLayout");
var _obj;
var sizeXClassNames = (_obj = {
    none: "vkuiPanelHeaderContext--sizeX-none"
}, _define_property._(_obj, _adaptivity.SizeType.COMPACT, "vkuiPanelHeaderContext--sizeX-compact"), _define_property._(_obj, _adaptivity.SizeType.REGULAR, "vkuiPanelHeaderContext--sizeX-regular"), _obj);
var PanelHeaderContext = function(_param) {
    var children = _param.children, onClose = _param.onClose, _param_opened = _param.opened, opened = _param_opened === void 0 ? false : _param_opened, className = _param.className, restProps = _object_without_properties._(_param, [
        "children",
        "onClose",
        "opened",
        "className"
    ]);
    var document = (0, _dom.useDOM)().document;
    var platform = (0, _usePlatform.usePlatform)();
    var _React_useState = _sliced_to_array._(_react.useState(opened), 2), visible = _React_useState[0], setVisible = _React_useState[1];
    var closing = visible && !opened;
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    var elementRef = _react.useRef(null);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        opened && setVisible(true);
    }, [
        opened
    ]);
    (0, _ScrollContext.useScrollLock)(platform !== _platform.Platform.VKCOM && opened);
    // start closing on outer click
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "click", opened && !closing && function(event) {
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            event.stopPropagation();
            onClose();
        }
    }, {
        capture: true
    });
    // fallback onAnimationEnd when animationend not supported
    var onAnimationEnd = function() {
        return setVisible(false);
    };
    var animationFallback = (0, _useTimeout.useTimeout)(onAnimationEnd, 200);
    _react.useEffect(function() {
        return closing ? animationFallback.set() : animationFallback.clear();
    }, [
        animationFallback,
        closing
    ]);
    return /*#__PURE__*/ _react.createElement(_FixedLayout.FixedLayout, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiPanelHeaderContext", platform === _platform.Platform.IOS && "vkuiPanelHeaderContext--ios", opened && "vkuiPanelHeaderContext--opened", closing && "vkuiPanelHeaderContext--closing", sizeXClassNames[sizeX], className),
        vertical: "top"
    }), visible && /*#__PURE__*/ _react.createElement("div", {
        onClick: function(event) {
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