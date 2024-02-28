import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { CustomScrollView } from "../CustomScrollView/CustomScrollView";
import { Popper } from "../Popper/Popper";
import { Spinner } from "../Spinner/Spinner";
var calcIsTop = function(placement) {
    return placement === null || placement === void 0 ? void 0 : placement.includes("top");
};
export var CustomSelectDropdown = function(_param) {
    var children = _param.children, targetRef = _param.targetRef, scrollBoxRef = _param.scrollBoxRef, placement = _param.placement, fetching = _param.fetching, parentOnPlacementChange = _param.onPlacementChange, _param_offsetDistance = _param.offsetDistance, offsetDistance = _param_offsetDistance === void 0 ? 0 : _param_offsetDistance, _param_sameWidth = _param.sameWidth, sameWidth = _param_sameWidth === void 0 ? true : _param_sameWidth, _param_forcePortal = _param.forcePortal, forcePortal = _param_forcePortal === void 0 ? true : _param_forcePortal, autoHideScrollbar = _param.autoHideScrollbar, autoHideScrollbarDelay = _param.autoHideScrollbarDelay, className = _param.className, _param_noMaxHeight = _param.noMaxHeight, noMaxHeight = _param_noMaxHeight === void 0 ? false : _param_noMaxHeight, restProps = _object_without_properties(_param, [
        "children",
        "targetRef",
        "scrollBoxRef",
        "placement",
        "fetching",
        "onPlacementChange",
        "offsetDistance",
        "sameWidth",
        "forcePortal",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "className",
        "noMaxHeight"
    ]);
    var _React_useState = _sliced_to_array(React.useState(function() {
        return calcIsTop(placement);
    }), 2), isTop = _React_useState[0], setIsTop = _React_useState[1];
    var onPlacementChange = React.useCallback(function(param) {
        var placement = param.placement;
        setIsTop(calcIsTop(placement));
        parentOnPlacementChange === null || parentOnPlacementChange === void 0 ? void 0 : parentOnPlacementChange(placement);
    }, [
        parentOnPlacementChange,
        setIsTop
    ]);
    return /*#__PURE__*/ React.createElement(Popper, _object_spread({
        targetRef: targetRef,
        offsetDistance: offsetDistance,
        sameWidth: sameWidth,
        onPlacementChange: onPlacementChange,
        placement: placement,
        className: classNames("vkuiCustomSelectDropdown", "vkuiInternalCustomSelectDropdown", offsetDistance === 0 && (isTop ? "vkuiCustomSelectDropdown--top" : "vkuiCustomSelectDropdown--bottom"), sameWidth && classNames("vkuiCustomSelectDropdown--wide", "vkuiInternalCustomSelectDropdown--wide"), className),
        forcePortal: forcePortal,
        autoUpdateOnTargetResize: true
    }, restProps), /*#__PURE__*/ React.createElement(CustomScrollView, {
        boxRef: scrollBoxRef,
        className: noMaxHeight ? undefined : "vkuiCustomSelectDropdown__in--withMaxHeight",
        autoHideScrollbar: autoHideScrollbar,
        autoHideScrollbarDelay: autoHideScrollbarDelay
    }, fetching ? /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomSelectDropdown__fetching"
    }, /*#__PURE__*/ React.createElement(Spinner, {
        size: "small"
    })) : children));
};

//# sourceMappingURL=CustomSelectDropdown.js.map