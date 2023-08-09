import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useEventListener } from "../../hooks/useEventListener";
import { useExternRef } from "../../hooks/useExternRef";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { usePatchChildrenRef } from "../../hooks/usePatchChildrenRef";
import { useTimeout } from "../../hooks/useTimeout";
import { useDOM } from "../../lib/dom";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import { Popper } from "../Popper/Popper";
/**
 * @see https://vkcom.github.io/VKUI/#/Popover
 */ export var Popover = function(_param) {
    var _param_action = _param.action, action = _param_action === void 0 ? "click" : _param_action, shownProp = _param.shown, _param_showDelay = _param.showDelay, showDelay = _param_showDelay === void 0 ? 150 : _param_showDelay, _param_hideDelay = _param.hideDelay, hideDelay = _param_hideDelay === void 0 ? 150 : _param_hideDelay, _param_offsetDistance = _param.offsetDistance, offsetDistance = _param_offsetDistance === void 0 ? 8 : _param_offsetDistance, content = _param.content, children = _param.children, styleProp = _param.style, className = _param.className, getRef = _param.getRef, onShownChange = _param.onShownChange, _param_restoreFocus = _param.restoreFocus, restoreFocus = _param_restoreFocus === void 0 ? true : _param_restoreFocus, restProps = _object_without_properties(_param, [
        "action",
        "shown",
        "showDelay",
        "hideDelay",
        "offsetDistance",
        "content",
        "children",
        "style",
        "className",
        "getRef",
        "onShownChange",
        "restoreFocus"
    ]);
    var document = useDOM().document;
    var hoverable = action === "hover";
    var hovered = React.useRef(false);
    var _React_useState = _sliced_to_array(React.useState(shownProp || false), 2), computedShown = _React_useState[0], setComputedShown = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(null), 2), dropdownNode = _React_useState1[0], setPopperNode = _React_useState1[1];
    var shown = typeof shownProp === "boolean" ? shownProp : computedShown;
    var patchedPopperRef = useExternRef(setPopperNode, getRef);
    var _usePatchChildrenRef = _sliced_to_array(usePatchChildrenRef(children), 2), childRef = _usePatchChildrenRef[0], child = _usePatchChildrenRef[1];
    var setShown = function(value) {
        if (typeof shownProp !== "boolean") {
            setComputedShown(value);
        }
        typeof onShownChange === "function" && onShownChange(value);
    };
    var showTimeout = useTimeout(function() {
        return setShown(true);
    }, showDelay);
    var hideTimeout = useTimeout(function() {
        return setShown(false);
    }, hideDelay);
    var handleTargetEnter = function() {
        hovered.current = true;
        hideTimeout.clear();
        showTimeout.set();
    };
    var handleTargetClick = function() {
        if (hovered.current && shown) {
            return;
        }
        setShown(!shown);
    };
    var handleTargetLeave = function() {
        hovered.current = false;
        showTimeout.clear();
        hideTimeout.set();
    };
    var handleContentKeyDownEscape = function() {
        setShown(false);
    };
    var handleOutsideClick = function(e) {
        var _childRef_current;
        if (dropdownNode && !((_childRef_current = childRef.current) === null || _childRef_current === void 0 ? void 0 : _childRef_current.contains(e.target)) && !dropdownNode.contains(e.target)) {
            setShown(false);
        }
    };
    useGlobalEventListener(document, "click", handleOutsideClick, {
        capture: true,
        passive: true
    });
    var targetEnterListener = useEventListener("mouseenter", handleTargetEnter);
    var targetClickEvent = useEventListener("click", handleTargetClick);
    var targetLeaveListener = useEventListener("mouseleave", handleTargetLeave);
    React.useEffect(function() {
        if (!childRef.current) {
            return;
        }
        targetClickEvent.add(childRef.current);
    }, [
        childRef,
        targetClickEvent
    ]);
    React.useEffect(function() {
        if (!childRef.current) {
            return;
        }
        if (hoverable) {
            targetEnterListener.add(childRef.current);
            targetLeaveListener.add(childRef.current);
        }
        return function() {
            targetEnterListener.remove();
            targetLeaveListener.remove();
        };
    }, [
        childRef,
        hoverable,
        targetEnterListener,
        targetLeaveListener
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, child, shown && /*#__PURE__*/ React.createElement(Popper, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiPopover", className),
        targetRef: childRef,
        getRef: patchedPopperRef,
        offsetDistance: offsetDistance,
        style: // Reason: Typescript ругается на CSS Custom Properties в объекте
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        _object_spread_props(_object_spread({}, styleProp), {
            "--vkui_internal--popover_safe_zone_padding": "".concat(offsetDistance, "px")
        }),
        renderContent: function(param) {
            var wrapperClassName = param.className;
            return /*#__PURE__*/ React.createElement(FocusTrap, {
                className: classNames("vkuiPopover__in", wrapperClassName),
                onClose: handleContentKeyDownEscape,
                restoreFocus: restoreFocus
            }, content);
        },
        onMouseOver: hoverable ? hideTimeout.clear : undefined,
        onMouseOut: hoverable ? handleTargetLeave : undefined
    })));
};

//# sourceMappingURL=Popover.js.map