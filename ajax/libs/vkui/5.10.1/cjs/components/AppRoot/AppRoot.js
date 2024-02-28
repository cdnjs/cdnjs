"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppRoot", {
    enumerable: true,
    get: function() {
        return AppRoot;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _to_consumable_array = require("@swc/helpers/_/_to_consumable_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useAppearance = require("../../hooks/useAppearance");
var _useInsets = require("../../hooks/useInsets");
var _useKeyboardInputTracker = require("../../hooks/useKeyboardInputTracker");
var _adaptivity = require("../../lib/adaptivity");
var _dom = require("../../lib/dom");
var _isRefObject = require("../../lib/isRefObject");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _warnOnce = require("../../lib/warnOnce");
var _AppRootContext = require("./AppRootContext");
var _ScrollContext = require("./ScrollContext");
var warn = (0, _warnOnce.warnOnce)("AppRoot");
var vkuiSizeXClassNames = _define_property._({
    none: "vkui--sizeX-none"
}, _adaptivity.SizeType.REGULAR, "vkui--sizeX-regular");
var vkuiLayoutClassNames = {
    card: "vkui--layout-card",
    plain: "vkui--layout-plain"
};
function containerClassNames(layout, sizeX) {
    var classNames = [];
    if (layout) {
        classNames.push(vkuiLayoutClassNames[layout]);
    }
    if (sizeX !== _adaptivity.SizeType.COMPACT) {
        classNames.push(vkuiSizeXClassNames[sizeX]);
    }
    return classNames;
}
var INSET_CUSTOM_PROPERTY_PREFIX = "--vkui_internal--safe_area_inset_";
var AppRoot = function(_param) {
    var children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "full" : _param_mode, _param_scroll = _param.scroll, scroll = _param_scroll === void 0 ? "global" : _param_scroll, tmp = _param.portalRoot, portalRootProp = tmp === void 0 ? null : tmp, disablePortal = _param.disablePortal, disableParentTransformForPositionFixedElements = _param.disableParentTransformForPositionFixedElements, className = _param.className, safeAreaInsets = _param.safeAreaInsets, layout = _param.layout, props = _object_without_properties._(_param, [
        "children",
        "mode",
        "scroll",
        "portalRoot",
        "disablePortal",
        "disableParentTransformForPositionFixedElements",
        "className",
        "safeAreaInsets",
        "layout"
    ]);
    var isKeyboardInputActive = (0, _useKeyboardInputTracker.useKeyboardInputTracker)();
    var rootRef = _react.useRef(null);
    var _React_useState = _sliced_to_array._(_react.useState(null), 2), portalRoot = _React_useState[0], setPortalRoot = _React_useState[1];
    var document = (0, _dom.useDOM)().document;
    var deprecatedInsetsDisabled = Boolean(safeAreaInsets);
    var deprecatedInsets = (0, _useInsets.useInsets)(deprecatedInsetsDisabled);
    var insets = safeAreaInsets ? safeAreaInsets : deprecatedInsets;
    var appearance = (0, _useAppearance.useAppearance)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), hasPointer = _useAdaptivity1.hasPointer, _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    if (process.env.NODE_ENV === "development") {
        if (!safeAreaInsets) {
            // TODO [>=6]: удалить warn
            warn("[@vkontakte/vk-bridge] Интеграция VKUI с @vkontakte/vk-bridge устарела и будет удалена в v6. Используйте хук `useInsets()` из @vkontakte/vk-bridge-react и результат передайте в параметр `safeAreaInsets` (см. https://github.com/VKCOM/VKUI/issues/5049)"); // prettier-ignore
        }
    }
    // setup portal
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        var portal = null;
        if (portalRootProp) {
            if ((0, _isRefObject.isRefObject)(portalRootProp)) {
                portal = portalRootProp.current;
            } else {
                portal = portalRootProp;
            }
        }
        if (!portal) {
            portal = document.createElement("div");
            document.body.appendChild(portal);
        }
        setPortalRoot(portal);
        return function() {
            if (!portalRootProp) {
                var _portal_parentElement;
                portal === null || portal === void 0 ? void 0 : (_portal_parentElement = portal.parentElement) === null || _portal_parentElement === void 0 ? void 0 : _portal_parentElement.removeChild(portal);
            }
        };
    }, [
        portalRootProp
    ]);
    // setup root classes
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        var _rootRef_current;
        if (mode === "partial") {
            return _vkjs.noop;
        }
        var parent = (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement;
        var classes = [
            "vkui__root"
        ].concat(mode === "embedded" ? "vkui__root--embedded" : []);
        if (parent) {
            var _parent_classList;
            if (mode === "embedded" && !disableParentTransformForPositionFixedElements) {
                parent.style.transform = "translate3d(0, 0, 0)";
            }
            (_parent_classList = parent.classList).add.apply(_parent_classList, _to_consumable_array._(classes));
        }
        return function() {
            if (parent) {
                var _parent_classList;
                if (mode === "embedded" && !disableParentTransformForPositionFixedElements) {
                    parent.style.transform = "";
                }
                (_parent_classList = parent.classList).remove.apply(_parent_classList, _to_consumable_array._(classes));
            }
        };
    }, [
        disableParentTransformForPositionFixedElements
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (mode === "full") {
            document.documentElement.classList.add("vkui");
            return function() {
                document.documentElement.classList.remove("vkui");
            };
        }
        return undefined;
    }, [
        document,
        mode
    ]);
    // setup insets
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        var _rootRef_current;
        if (mode === "partial" || !((_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement)) {
            return _vkjs.noop;
        }
        var parent = rootRef.current.parentElement;
        var key;
        for(key in insets){
            if (insets.hasOwnProperty(key) && typeof insets[key] === "number") {
                var inset = insets[key];
                parent.style.setProperty(INSET_CUSTOM_PROPERTY_PREFIX + key, "".concat(inset, "px"));
                portalRoot && portalRoot.style.setProperty(INSET_CUSTOM_PROPERTY_PREFIX + key, "".concat(inset, "px"));
            }
        }
        return function() {
            var key;
            for(key in insets){
                if (insets.hasOwnProperty(key)) {
                    parent.style.removeProperty(INSET_CUSTOM_PROPERTY_PREFIX + key);
                    portalRoot && portalRoot.style.removeProperty(INSET_CUSTOM_PROPERTY_PREFIX + key);
                }
            }
        };
    }, [
        insets,
        portalRoot
    ]);
    // adaptivity handler
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        var _container_classList;
        var _rootRef_current;
        if (mode === "partial") {
            return _vkjs.noop;
        }
        var _$classNames = containerClassNames(layout, sizeX);
        var container = mode === "embedded" ? (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement : document.body;
        if (!_$classNames.length || !container) {
            return _vkjs.noop;
        }
        (_container_classList = container.classList).add.apply(_container_classList, _to_consumable_array._(_$classNames));
        return function() {
            var _container_classList;
            (_container_classList = container.classList).remove.apply(_container_classList, _to_consumable_array._(_$classNames));
        };
    }, [
        sizeX,
        layout
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (mode !== "full" || appearance === undefined) {
            return _vkjs.noop;
        }
        document.documentElement.style.setProperty("color-scheme", appearance);
        return function() {
            return document.documentElement.style.removeProperty("color-scheme");
        };
    }, [
        appearance
    ]);
    var ScrollController = _react.useMemo(function() {
        return scroll === "contain" ? _ScrollContext.ElementScrollController : _ScrollContext.GlobalScrollController;
    }, [
        scroll
    ]);
    var content = /*#__PURE__*/ _react.createElement(_AppRootContext.AppRootContext.Provider, {
        value: {
            appRoot: rootRef,
            portalRoot: portalRoot,
            embedded: mode === "embedded",
            keyboardInput: isKeyboardInputActive,
            mode: mode,
            disablePortal: disablePortal,
            layout: layout
        }
    }, /*#__PURE__*/ _react.createElement(ScrollController, {
        elRef: rootRef
    }, children));
    return mode === "partial" ? content : /*#__PURE__*/ _react.createElement("div", _object_spread._({
        ref: rootRef,
        className: (0, _vkjs.classNames)("vkuiAppRoot", hasPointer === undefined ? "vkuiAppRoot--pointer-none" : !hasPointer && "vkuiAppRoot--pointer-has-not", className)
    }, props), content);
};

//# sourceMappingURL=AppRoot.js.map