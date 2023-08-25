"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HoverPopper", {
    enumerable: true,
    get: function() {
        return HoverPopper;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useEventListener = require("../../hooks/useEventListener");
var _usePatchChildrenRef = require("../../hooks/usePatchChildrenRef");
var _useTimeout = require("../../hooks/useTimeout");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _Popper = require("../Popper/Popper");
var HoverPopper = function(_param) {
    var getRef = _param.getRef, content = _param.content, children = _param.children, onShownChange = _param.onShownChange, _shown = _param.shown, _param_showDelay = _param.showDelay, showDelay = _param_showDelay === void 0 ? 150 : _param_showDelay, _param_hideDelay = _param.hideDelay, hideDelay = _param_hideDelay === void 0 ? 150 : _param_hideDelay, restProps = _object_without_properties._(_param, [
        "getRef",
        "content",
        "children",
        "onShownChange",
        "shown",
        "showDelay",
        "hideDelay"
    ]);
    var _React_useState = _sliced_to_array._(_react.useState(_shown || false), 2), computedShown = _React_useState[0], setComputedShown = _React_useState[1];
    var shown = typeof _shown === "boolean" ? _shown : computedShown;
    var setShown = function(value) {
        if (typeof _shown !== "boolean") {
            setComputedShown(value);
        }
        typeof onShownChange === "function" && onShownChange(value);
    };
    var showTimeout = (0, _useTimeout.useTimeout)(function() {
        setShown(true);
    }, showDelay);
    var hideTimeout = (0, _useTimeout.useTimeout)(function() {
        setShown(false);
    }, hideDelay);
    var _usePatchChildrenRef1 = _sliced_to_array._((0, _usePatchChildrenRef.usePatchChildrenRef)(children), 2), childRef = _usePatchChildrenRef1[0], child = _usePatchChildrenRef1[1];
    var onTargetEnter = function() {
        hideTimeout.clear();
        showTimeout.set();
    };
    var onTargetLeave = function() {
        showTimeout.clear();
        hideTimeout.set();
    };
    var targetEnterListener = (0, _useEventListener.useEventListener)("pointerenter", onTargetEnter);
    var targetLeaveListener = (0, _useEventListener.useEventListener)("pointerleave", onTargetLeave);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (childRef.current) {
            targetEnterListener.add(childRef.current);
            targetLeaveListener.add(childRef.current);
        }
    }, []);
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, child, shown && /*#__PURE__*/ _react.createElement(_Popper.Popper, _object_spread_props._(_object_spread._({}, restProps), {
        onMouseOver: hideTimeout.clear,
        onMouseOut: onTargetLeave,
        getRef: getRef,
        targetRef: childRef
    }), content));
};

//# sourceMappingURL=HoverPopper.js.map