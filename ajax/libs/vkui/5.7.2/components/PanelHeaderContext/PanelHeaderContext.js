import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { usePlatform } from "../../hooks/usePlatform";
import { useTimeout } from "../../hooks/useTimeout";
import { SizeType } from "../../lib/adaptivity";
import { useDOM } from "../../lib/dom";
import { Platform } from "../../lib/platform";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useScrollLock } from "../AppRoot/ScrollContext";
import { FixedLayout } from "../FixedLayout/FixedLayout";
var _obj;
var sizeXClassNames = (_obj = {
    none: "vkuiPanelHeaderContext--sizeX-none"
}, _define_property(_obj, SizeType.COMPACT, "vkuiPanelHeaderContext--sizeX-compact"), _define_property(_obj, SizeType.REGULAR, "vkuiPanelHeaderContext--sizeX-regular"), _obj);
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContext
 */ export var PanelHeaderContext = function(_param) {
    var children = _param.children, onClose = _param.onClose, _param_opened = _param.opened, opened = _param_opened === void 0 ? false : _param_opened, className = _param.className, restProps = _object_without_properties(_param, [
        "children",
        "onClose",
        "opened",
        "className"
    ]);
    var document = useDOM().document;
    var platform = usePlatform();
    var _React_useState = _sliced_to_array(React.useState(opened), 2), visible = _React_useState[0], setVisible = _React_useState[1];
    var closing = visible && !opened;
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeX = _useAdaptivity.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    var elementRef = React.useRef(null);
    useIsomorphicLayoutEffect(function() {
        opened && setVisible(true);
    }, [
        opened
    ]);
    useScrollLock(platform !== Platform.VKCOM && opened);
    // start closing on outer click
    useGlobalEventListener(document, "click", opened && !closing && function(event) {
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
    var animationFallback = useTimeout(onAnimationEnd, 200);
    React.useEffect(function() {
        return closing ? animationFallback.set() : animationFallback.clear();
    }, [
        animationFallback,
        closing
    ]);
    return /*#__PURE__*/ React.createElement(FixedLayout, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiPanelHeaderContext", platform === Platform.IOS && "vkuiPanelHeaderContext--ios", opened && "vkuiPanelHeaderContext--opened", closing && "vkuiPanelHeaderContext--closing", sizeXClassNames[sizeX], className),
        vertical: "top"
    }), visible && /*#__PURE__*/ React.createElement("div", {
        onClick: function(event) {
            event.stopPropagation();
            onClose();
        },
        className: "vkuiPanelHeaderContext__fade"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanelHeaderContext__in",
        ref: elementRef,
        onAnimationEnd: closing ? onAnimationEnd : undefined
    }, visible && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanelHeaderContext__content"
    }, children)));
};

//# sourceMappingURL=PanelHeaderContext.js.map