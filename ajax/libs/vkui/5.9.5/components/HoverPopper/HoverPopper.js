import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { useEventListener } from "../../hooks/useEventListener";
import { usePatchChildrenRef } from "../../hooks/usePatchChildrenRef";
import { useTimeout } from "../../hooks/useTimeout";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { Popper } from "../Popper/Popper";
export var HoverPopper = function(_param) {
    var getRef = _param.getRef, content = _param.content, children = _param.children, onShownChange = _param.onShownChange, _shown = _param.shown, _param_showDelay = _param.showDelay, showDelay = _param_showDelay === void 0 ? 150 : _param_showDelay, _param_hideDelay = _param.hideDelay, hideDelay = _param_hideDelay === void 0 ? 150 : _param_hideDelay, restProps = _object_without_properties(_param, [
        "getRef",
        "content",
        "children",
        "onShownChange",
        "shown",
        "showDelay",
        "hideDelay"
    ]);
    var _React_useState = _sliced_to_array(React.useState(_shown || false), 2), computedShown = _React_useState[0], setComputedShown = _React_useState[1];
    var shown = typeof _shown === "boolean" ? _shown : computedShown;
    var setShown = function(value) {
        if (typeof _shown !== "boolean") {
            setComputedShown(value);
        }
        typeof onShownChange === "function" && onShownChange(value);
    };
    var showTimeout = useTimeout(function() {
        setShown(true);
    }, showDelay);
    var hideTimeout = useTimeout(function() {
        setShown(false);
    }, hideDelay);
    var _usePatchChildrenRef = _sliced_to_array(usePatchChildrenRef(children), 2), childRef = _usePatchChildrenRef[0], child = _usePatchChildrenRef[1];
    var onTargetEnter = function() {
        hideTimeout.clear();
        showTimeout.set();
    };
    var onTargetLeave = function() {
        showTimeout.clear();
        hideTimeout.set();
    };
    var targetEnterListener = useEventListener("pointerenter", onTargetEnter);
    var targetLeaveListener = useEventListener("pointerleave", onTargetLeave);
    useIsomorphicLayoutEffect(function() {
        if (childRef.current) {
            targetEnterListener.add(childRef.current);
            targetLeaveListener.add(childRef.current);
        }
    }, []);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, child, shown && /*#__PURE__*/ React.createElement(Popper, _object_spread_props(_object_spread({}, restProps), {
        onMouseOver: hideTimeout.clear,
        onMouseOut: onTargetLeave,
        getRef: getRef,
        targetRef: childRef
    }), content));
};

//# sourceMappingURL=HoverPopper.js.map