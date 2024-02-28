import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { useEffectDev } from "../../hooks/useEffectDev";
import { useEventListener } from "../../hooks/useEventListener";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { useDOM } from "../../lib/dom";
import { isRefObject } from "../../lib/isRefObject";
import { Platform } from "../../lib/platform";
import { warnOnce } from "../../lib/warnOnce";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import { Popper } from "../Popper/Popper";
var warn = warnOnce("ActionSheet");
function getEl(ref) {
    return ref && "current" in ref ? ref.current : ref;
}
export var ActionSheetDropdownMenu = function(_param) {
    var children = _param.children, toggleRef = _param.toggleRef, closing = _param.closing, popupDirection = _param.popupDirection, onClose = _param.onClose, className = _param.className, style = _param.style, _param_popupOffsetDistance = _param.popupOffsetDistance, popupOffsetDistance = _param_popupOffsetDistance === void 0 ? 0 : _param_popupOffsetDistance, placementProp = _param.placement, restProps = _object_without_properties(_param, [
        "children",
        "toggleRef",
        "closing",
        "popupDirection",
        "onClose",
        "className",
        "style",
        "popupOffsetDistance",
        "placement"
    ]);
    var document = useDOM().document;
    var platform = usePlatform();
    var sizeY = useAdaptivityWithJSMediaQueries().sizeY;
    var elementRef = React.useRef(null);
    useEffectDev(function() {
        var toggleEl = getEl(toggleRef);
        if (!toggleEl) {
            warn('Свойство "toggleRef" не передано', "error");
        }
    }, [
        toggleRef
    ]);
    var isPopupDirectionTop = React.useMemo(function() {
        return popupDirection === "top" || typeof popupDirection === "function" && popupDirection(elementRef) === "top";
    }, [
        popupDirection,
        elementRef
    ]);
    var placement = placementProp !== null && placementProp !== void 0 ? placementProp : isPopupDirectionTop ? "top-end" : "bottom-end";
    var bodyClickListener = useEventListener("click", function(e) {
        var dropdownElement = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;
        if (dropdownElement && !dropdownElement.contains(e.target)) {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    });
    React.useEffect(function() {
        setTimeout(function() {
            bodyClickListener.add(document.body);
        });
    }, [
        bodyClickListener,
        document
    ]);
    var onClick = React.useCallback(function(e) {
        return e.stopPropagation();
    }, []);
    var targetRef = React.useMemo(function() {
        if (isRefObject(toggleRef)) {
            return toggleRef;
        }
        return {
            current: toggleRef
        };
    }, [
        toggleRef
    ]);
    return /*#__PURE__*/ React.createElement(Popper, {
        targetRef: targetRef,
        offsetDistance: popupOffsetDistance,
        placement: placement,
        className: classNames("vkuiActionSheet", platform === Platform.IOS && "vkuiActionSheet--ios", "vkuiActionSheet--menu", sizeY === SizeType.COMPACT && "vkuiActionSheet--sizeY-compact", className),
        style: style,
        getRef: elementRef,
        forcePortal: false
    }, /*#__PURE__*/ React.createElement(FocusTrap, _object_spread_props(_object_spread({
        onClose: onClose
    }, restProps), {
        onClick: onClick
    }), children));
};

//# sourceMappingURL=ActionSheetDropdownMenu.js.map