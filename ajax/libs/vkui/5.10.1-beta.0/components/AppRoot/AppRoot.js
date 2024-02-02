import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useAppearance } from "../../hooks/useAppearance";
import { useInsets } from "../../hooks/useInsets";
import { useKeyboardInputTracker } from "../../hooks/useKeyboardInputTracker";
import { SizeType } from "../../lib/adaptivity";
import { useDOM } from "../../lib/dom";
import { isRefObject } from "../../lib/isRefObject";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { warnOnce } from "../../lib/warnOnce";
import { AppRootContext } from "./AppRootContext";
import { ElementScrollController, GlobalScrollController } from "./ScrollContext";
var warn = warnOnce("AppRoot");
var vkuiSizeXClassNames = _define_property({
    none: "vkui--sizeX-none"
}, SizeType.REGULAR, "vkui--sizeX-regular");
var vkuiLayoutClassNames = {
    card: "vkui--layout-card",
    plain: "vkui--layout-plain"
};
function containerClassNames(layout, sizeX) {
    var classNames = [];
    if (layout) {
        classNames.push(vkuiLayoutClassNames[layout]);
    }
    if (sizeX !== SizeType.COMPACT) {
        classNames.push(vkuiSizeXClassNames[sizeX]);
    }
    return classNames;
}
var INSET_CUSTOM_PROPERTY_PREFIX = "--vkui_internal--safe_area_inset_";
/**
 * @see https://vkcom.github.io/VKUI/#/AppRoot
 */ export var AppRoot = function(_param) {
    var children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "full" : _param_mode, _param_scroll = _param.scroll, scroll = _param_scroll === void 0 ? "global" : _param_scroll, tmp = _param.portalRoot, portalRootProp = tmp === void 0 ? null : tmp, disablePortal = _param.disablePortal, disableParentTransformForPositionFixedElements = _param.disableParentTransformForPositionFixedElements, className = _param.className, safeAreaInsets = _param.safeAreaInsets, layout = _param.layout, props = _object_without_properties(_param, [
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
    var isKeyboardInputActive = useKeyboardInputTracker();
    var rootRef = React.useRef(null);
    var _React_useState = _sliced_to_array(React.useState(null), 2), portalRoot = _React_useState[0], setPortalRoot = _React_useState[1];
    var document = useDOM().document;
    var deprecatedInsetsDisabled = Boolean(safeAreaInsets);
    var deprecatedInsets = useInsets(deprecatedInsetsDisabled);
    var insets = safeAreaInsets ? safeAreaInsets : deprecatedInsets;
    var appearance = useAppearance();
    var _useAdaptivity = useAdaptivity(), hasPointer = _useAdaptivity.hasPointer, _useAdaptivity_sizeX = _useAdaptivity.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    if (process.env.NODE_ENV === "development") {
        if (!safeAreaInsets) {
            // TODO [>=6]: удалить warn
            warn("[@vkontakte/vk-bridge] Интеграция VKUI с @vkontakte/vk-bridge устарела и будет удалена в v6. Используйте хук `useInsets()` из @vkontakte/vk-bridge-react и результат передайте в параметр `safeAreaInsets` (см. https://github.com/VKCOM/VKUI/issues/5049)"); // prettier-ignore
        }
    }
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
                var _portal_parentElement;
                portal === null || portal === void 0 ? void 0 : (_portal_parentElement = portal.parentElement) === null || _portal_parentElement === void 0 ? void 0 : _portal_parentElement.removeChild(portal);
            }
        };
    }, [
        portalRootProp
    ]);
    // setup root classes
    useIsomorphicLayoutEffect(function() {
        var _rootRef_current;
        if (mode === "partial") {
            return noop;
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
            (_parent_classList = parent.classList).add.apply(_parent_classList, _to_consumable_array(classes));
        }
        return function() {
            if (parent) {
                var _parent_classList;
                if (mode === "embedded" && !disableParentTransformForPositionFixedElements) {
                    parent.style.transform = "";
                }
                (_parent_classList = parent.classList).remove.apply(_parent_classList, _to_consumable_array(classes));
            }
        };
    }, [
        disableParentTransformForPositionFixedElements
    ]);
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
        var _container_classList;
        var _rootRef_current;
        if (mode === "partial") {
            return noop;
        }
        var _$classNames = containerClassNames(layout, sizeX);
        var container = mode === "embedded" ? (_rootRef_current = rootRef.current) === null || _rootRef_current === void 0 ? void 0 : _rootRef_current.parentElement : document.body;
        if (!_$classNames.length || !container) {
            return noop;
        }
        (_container_classList = container.classList).add.apply(_container_classList, _to_consumable_array(_$classNames));
        return function() {
            var _container_classList;
            (_container_classList = container.classList).remove.apply(_container_classList, _to_consumable_array(_$classNames));
        };
    }, [
        sizeX,
        layout
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
            disablePortal: disablePortal,
            layout: layout
        }
    }, /*#__PURE__*/ React.createElement(ScrollController, {
        elRef: rootRef
    }, children));
    return mode === "partial" ? content : /*#__PURE__*/ React.createElement("div", _object_spread({
        ref: rootRef,
        className: classNames("vkuiAppRoot", hasPointer === undefined ? "vkuiAppRoot--pointer-none" : !hasPointer && "vkuiAppRoot--pointer-has-not", className)
    }, props), content);
};

//# sourceMappingURL=AppRoot.js.map