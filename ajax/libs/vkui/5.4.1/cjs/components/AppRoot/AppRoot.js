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
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _toConsumableArray = require("@swc/helpers/lib/_to_consumable_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useAppearance = require("../../hooks/useAppearance");
var _useInsets = require("../../hooks/useInsets");
var _useKeyboardInputTracker = require("../../hooks/useKeyboardInputTracker");
var _adaptivity = require("../../lib/adaptivity");
var _dom = require("../../lib/dom");
var _isRefObject = require("../../lib/isRefObject");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _appRootContext = require("./AppRootContext");
var _scrollContext = require("./ScrollContext");
var vkuiSizeXClassNames = _defineProperty({
    none: "vkui--sizeX-none"
}, _adaptivity.SizeType.REGULAR, "vkui--sizeX-regular");
var INSET_CUSTOM_PROPERTY_PREFIX = "--vkui_internal--safe_area_inset_";
var AppRoot = function(_param) {
    var children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "full" : _param_mode, _param_scroll = _param.scroll, scroll = _param_scroll === void 0 ? "global" : _param_scroll, tmp = _param.portalRoot, portalRootProp = tmp === void 0 ? null : tmp, disablePortal = _param.disablePortal, className = _param.className, props = _objectWithoutProperties(_param, [
        "children",
        "mode",
        "scroll",
        "portalRoot",
        "disablePortal",
        "className"
    ]);
    var isKeyboardInputActive = (0, _useKeyboardInputTracker.useKeyboardInputTracker)();
    var rootRef = _react.useRef(null);
    var _React_useState = _slicedToArray(_react.useState(null), 2), portalRoot = _React_useState[0], setPortalRoot = _React_useState[1];
    var document = (0, _dom.useDOM)().document;
    var insets = (0, _useInsets.useInsets)();
    var appearance = (0, _useAppearance.useAppearance)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), hasPointer = _useAdaptivity1.hasPointer, _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
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
            var _portal_parentElement;
            portal === null || portal === void 0 ? void 0 : (_portal_parentElement = portal.parentElement) === null || _portal_parentElement === void 0 ? void 0 : _portal_parentElement.removeChild(portal);
        };
    }, [
        portalRootProp
    ]);
    // setup root classes
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        var _parent_classList;
        var _rootRef_current;
        if (mode === "partial") {
            return _vkjs.noop;
        }
        var parent = (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement;
        var classes = [
            "vkui__root"
        ].concat(mode === "embedded" ? "vkui__root--embedded" : []);
        parent === null || parent === void 0 ? void 0 : (_parent_classList = parent.classList).add.apply(_parent_classList, _toConsumableArray(classes));
        return function() {
            var _parent_classList;
            parent === null || parent === void 0 ? void 0 : (_parent_classList = parent.classList).remove.apply(_parent_classList, _toConsumableArray(classes));
        };
    }, []);
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
        var _rootRef_current;
        if (mode === "partial") {
            return _vkjs.noop;
        }
        var className = sizeX !== _adaptivity.SizeType.COMPACT ? vkuiSizeXClassNames[sizeX] : null;
        var container = mode === "embedded" ? (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement : document.body;
        if (className === null || !container) {
            return _vkjs.noop;
        }
        container.classList.add(className);
        return function() {
            container.classList.remove(className);
        };
    }, [
        sizeX
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
        return scroll === "contain" ? _scrollContext.ElementScrollController : _scrollContext.GlobalScrollController;
    }, [
        scroll
    ]);
    var content = /*#__PURE__*/ _react.createElement(_appRootContext.AppRootContext.Provider, {
        value: {
            appRoot: rootRef,
            portalRoot: portalRoot,
            embedded: mode === "embedded",
            keyboardInput: isKeyboardInputActive,
            mode: mode,
            disablePortal: disablePortal
        }
    }, /*#__PURE__*/ _react.createElement(ScrollController, {
        elRef: rootRef
    }, /*#__PURE__*/ _react.createElement(_icons.IconSettingsProvider, {
        classPrefix: "vkui"
    }, children)));
    return mode === "partial" ? content : /*#__PURE__*/ _react.createElement("div", _objectSpread({
        ref: rootRef,
        className: (0, _vkjs.classNames)("vkuiAppRoot", hasPointer === undefined ? "vkuiAppRoot--pointer-none" : !hasPointer && "vkuiAppRoot--pointer-has-not", className)
    }, props), content);
};

//# sourceMappingURL=AppRoot.js.map