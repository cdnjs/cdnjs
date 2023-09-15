"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Popover", {
    enumerable: true,
    get: function() {
        return Popover;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useEventListener = require("../../hooks/useEventListener");
var _useExternRef = require("../../hooks/useExternRef");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _usePatchChildrenRef = require("../../hooks/usePatchChildrenRef");
var _useTimeout = require("../../hooks/useTimeout");
var _dom = require("../../lib/dom");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _Popper = require("../Popper/Popper");
var Popover = function(_param) {
    var _param_action = _param.action, action = _param_action === void 0 ? "click" : _param_action, shownProp = _param.shown, _param_showDelay = _param.showDelay, showDelay = _param_showDelay === void 0 ? 150 : _param_showDelay, _param_hideDelay = _param.hideDelay, hideDelay = _param_hideDelay === void 0 ? 150 : _param_hideDelay, _param_offsetDistance = _param.offsetDistance, offsetDistance = _param_offsetDistance === void 0 ? 8 : _param_offsetDistance, content = _param.content, children = _param.children, styleProp = _param.style, className = _param.className, getRef = _param.getRef, onShownChange = _param.onShownChange, _param_restoreFocus = _param.restoreFocus, restoreFocus = _param_restoreFocus === void 0 ? true : _param_restoreFocus, restProps = _object_without_properties._(_param, [
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
    var document = (0, _dom.useDOM)().document;
    var hoverable = action === "hover";
    var hovered = _react.useRef(false);
    var _React_useState = _sliced_to_array._(_react.useState(shownProp || false), 2), computedShown = _React_useState[0], setComputedShown = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(null), 2), dropdownNode = _React_useState1[0], setPopperNode = _React_useState1[1];
    var shown = typeof shownProp === "boolean" ? shownProp : computedShown;
    var patchedPopperRef = (0, _useExternRef.useExternRef)(setPopperNode, getRef);
    var _usePatchChildrenRef1 = _sliced_to_array._((0, _usePatchChildrenRef.usePatchChildrenRef)(children), 2), childRef = _usePatchChildrenRef1[0], child = _usePatchChildrenRef1[1];
    var setShown = function(value) {
        if (typeof shownProp !== "boolean") {
            setComputedShown(value);
        }
        typeof onShownChange === "function" && onShownChange(value);
    };
    var showTimeout = (0, _useTimeout.useTimeout)(function() {
        return setShown(true);
    }, showDelay);
    var hideTimeout = (0, _useTimeout.useTimeout)(function() {
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
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "click", handleOutsideClick, {
        capture: true,
        passive: true
    });
    var targetEnterListener = (0, _useEventListener.useEventListener)("mouseenter", handleTargetEnter);
    var targetClickEvent = (0, _useEventListener.useEventListener)("click", handleTargetClick);
    var targetLeaveListener = (0, _useEventListener.useEventListener)("mouseleave", handleTargetLeave);
    _react.useEffect(function() {
        if (!childRef.current) {
            return;
        }
        targetClickEvent.add(childRef.current);
    }, [
        childRef,
        targetClickEvent
    ]);
    _react.useEffect(function() {
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
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, child, shown && /*#__PURE__*/ _react.createElement(_Popper.Popper, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiPopover", className),
        targetRef: childRef,
        getRef: patchedPopperRef,
        offsetDistance: offsetDistance,
        style: // Reason: Typescript ругается на CSS Custom Properties в объекте
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        _object_spread_props._(_object_spread._({}, styleProp), {
            "--vkui_internal--popover_safe_zone_padding": "".concat(offsetDistance, "px")
        }),
        renderContent: function(param) {
            var wrapperClassName = param.className;
            return /*#__PURE__*/ _react.createElement(_FocusTrap.FocusTrap, {
                className: (0, _vkjs.classNames)("vkuiPopover__in", wrapperClassName),
                onClose: handleContentKeyDownEscape,
                restoreFocus: restoreFocus
            }, content);
        },
        onMouseOver: hoverable ? hideTimeout.clear : undefined,
        onMouseOut: hoverable ? handleTargetLeave : undefined
    })));
};

//# sourceMappingURL=Popover.js.map