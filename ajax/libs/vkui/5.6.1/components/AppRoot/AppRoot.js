import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import * as React from "react";
import { IconSettingsProvider } from "@vkontakte/icons";
import { classNames, noop } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useAppearance } from "../../hooks/useAppearance";
import { useInsets } from "../../hooks/useInsets";
import { useKeyboardInputTracker } from "../../hooks/useKeyboardInputTracker";
import { SizeType } from "../../lib/adaptivity";
import { useDOM } from "../../lib/dom";
import { isRefObject } from "../../lib/isRefObject";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { AppRootContext } from "./AppRootContext";
import { ElementScrollController, GlobalScrollController } from "./ScrollContext";
var vkuiSizeXClassNames = _define_property({
    none: "vkui--sizeX-none"
}, SizeType.REGULAR, "vkui--sizeX-regular");
var INSET_CUSTOM_PROPERTY_PREFIX = "--vkui_internal--safe_area_inset_";
/**
 * @see https://vkcom.github.io/VKUI/#/AppRoot
 */ export var AppRoot = function(_param) {
    var children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "full" : _param_mode, _param_scroll = _param.scroll, scroll = _param_scroll === void 0 ? "global" : _param_scroll, tmp = _param.portalRoot, portalRootProp = tmp === void 0 ? null : tmp, disablePortal = _param.disablePortal, className = _param.className, props = _object_without_properties(_param, [
        "children",
        "mode",
        "scroll",
        "portalRoot",
        "disablePortal",
        "className"
    ]);
    var isKeyboardInputActive = useKeyboardInputTracker();
    var rootRef = React.useRef(null);
    var _React_useState = _sliced_to_array(React.useState(null), 2), portalRoot = _React_useState[0], setPortalRoot = _React_useState[1];
    var document = useDOM().document;
    var insets = useInsets();
    var appearance = useAppearance();
    var _useAdaptivity = useAdaptivity(), hasPointer = _useAdaptivity.hasPointer, _useAdaptivity_sizeX = _useAdaptivity.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    // setup portal
    useIsomorphicLayoutEffect(function() {
        var portal = null;
        if (portalRootProp) {
            if (isRefObject(portalRootProp)) {
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
                var _portal_parentElement, _portal;
                (_portal = portal) === null || _portal === void 0 ? void 0 : (_portal_parentElement = _portal.parentElement) === null || _portal_parentElement === void 0 ? void 0 : _portal_parentElement.removeChild(portal);
            }
        };
    }, [
        portalRootProp
    ]);
    // setup root classes
    useIsomorphicLayoutEffect(function() {
        var _parent_classList;
        var _rootRef_current, _parent;
        if (mode === "partial") {
            return noop;
        }
        var parent = (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement;
        var classes = [
            "vkui__root"
        ].concat(mode === "embedded" ? "vkui__root--embedded" : []);
        (_parent = parent) === null || _parent === void 0 ? void 0 : (_parent_classList = _parent.classList).add.apply(_parent_classList, _to_consumable_array(classes));
        return function() {
            var _parent_classList;
            var _parent;
            (_parent = parent) === null || _parent === void 0 ? void 0 : (_parent_classList = _parent.classList).remove.apply(_parent_classList, _to_consumable_array(classes));
        };
    }, []);
    useIsomorphicLayoutEffect(function() {
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
    useIsomorphicLayoutEffect(function() {
        var _rootRef_current;
        if (mode === "partial" || !((_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement)) {
            return noop;
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
    useIsomorphicLayoutEffect(function() {
        var _rootRef_current;
        if (mode === "partial") {
            return noop;
        }
        var className = sizeX !== SizeType.COMPACT ? vkuiSizeXClassNames[sizeX] : null;
        var container = mode === "embedded" ? (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement : document.body;
        if (className === null || !container) {
            return noop;
        }
        container.classList.add(className);
        return function() {
            container.classList.remove(className);
        };
    }, [
        sizeX
    ]);
    useIsomorphicLayoutEffect(function() {
        if (mode !== "full" || appearance === undefined) {
            return noop;
        }
        document.documentElement.style.setProperty("color-scheme", appearance);
        return function() {
            return document.documentElement.style.removeProperty("color-scheme");
        };
    }, [
        appearance
    ]);
    var ScrollController = React.useMemo(function() {
        return scroll === "contain" ? ElementScrollController : GlobalScrollController;
    }, [
        scroll
    ]);
    var content = /*#__PURE__*/ React.createElement(AppRootContext.Provider, {
        value: {
            appRoot: rootRef,
            portalRoot: portalRoot,
            embedded: mode === "embedded",
            keyboardInput: isKeyboardInputActive,
            mode: mode,
            disablePortal: disablePortal
        }
    }, /*#__PURE__*/ React.createElement(ScrollController, {
        elRef: rootRef
    }, /*#__PURE__*/ React.createElement(IconSettingsProvider, {
        classPrefix: "vkui"
    }, children)));
    return mode === "partial" ? content : /*#__PURE__*/ React.createElement("div", _object_spread({
        ref: rootRef,
        className: classNames("vkuiAppRoot", hasPointer === undefined ? "vkuiAppRoot--pointer-none" : !hasPointer && "vkuiAppRoot--pointer-has-not", className)
    }, props), content);
};

//# sourceMappingURL=AppRoot.js.map