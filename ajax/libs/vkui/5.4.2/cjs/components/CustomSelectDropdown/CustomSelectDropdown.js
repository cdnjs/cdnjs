"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomSelectDropdown", {
    enumerable: true,
    get: function() {
        return CustomSelectDropdown;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _customScrollView = require("../CustomScrollView/CustomScrollView");
var _popper = require("../Popper/Popper");
var _spinner = require("../Spinner/Spinner");
var calcIsTop = function(placement) {
    return placement === null || placement === void 0 ? void 0 : placement.includes("top");
};
var CustomSelectDropdown = function(_param) {
    var children = _param.children, targetRef = _param.targetRef, scrollBoxRef = _param.scrollBoxRef, placement = _param.placement, fetching = _param.fetching, parentOnPlacementChange = _param.onPlacementChange, _param_offsetDistance = _param.offsetDistance, offsetDistance = _param_offsetDistance === void 0 ? 0 : _param_offsetDistance, _param_sameWidth = _param.sameWidth, sameWidth = _param_sameWidth === void 0 ? true : _param_sameWidth, _param_forcePortal = _param.forcePortal, forcePortal = _param_forcePortal === void 0 ? true : _param_forcePortal, autoHideScrollbar = _param.autoHideScrollbar, autoHideScrollbarDelay = _param.autoHideScrollbarDelay, className = _param.className, restProps = _objectWithoutProperties(_param, [
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
        "className"
    ]);
    var _React_useState = _slicedToArray(_react.useState(function() {
        return calcIsTop(placement);
    }), 2), isTop = _React_useState[0], setIsTop = _React_useState[1];
    var onPlacementChange = _react.useCallback(function(param) {
        var placement = param.placement;
        setIsTop(calcIsTop(placement));
        parentOnPlacementChange === null || parentOnPlacementChange === void 0 ? void 0 : parentOnPlacementChange(placement);
    }, [
        parentOnPlacementChange,
        setIsTop
    ]);
    return /*#__PURE__*/ _react.createElement(_popper.Popper, _objectSpread({
        targetRef: targetRef,
        offsetDistance: offsetDistance,
        sameWidth: sameWidth,
        onPlacementChange: onPlacementChange,
        placement: placement,
        className: (0, _vkjs.classNames)("vkuiCustomSelectDropdown", "vkuiInternalCustomSelectDropdown", offsetDistance === 0 && (isTop ? "vkuiCustomSelectDropdown--top" : "vkuiCustomSelectDropdown--bottom"), sameWidth && (0, _vkjs.classNames)("vkuiCustomSelectDropdown--wide", "vkuiInternalCustomSelectDropdown--wide"), className),
        forcePortal: forcePortal,
        autoUpdateOnTargetResize: true
    }, restProps), /*#__PURE__*/ _react.createElement(_customScrollView.CustomScrollView, {
        boxRef: scrollBoxRef,
        className: "vkuiCustomSelectDropdown__in",
        autoHideScrollbar: autoHideScrollbar,
        autoHideScrollbarDelay: autoHideScrollbarDelay
    }, fetching ? /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomSelectDropdown__fetching"
    }, /*#__PURE__*/ _react.createElement(_spinner.Spinner, {
        size: "small"
    })) : children));
};

//# sourceMappingURL=CustomSelectDropdown.js.map