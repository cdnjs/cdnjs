"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Tooltip", {
    enumerable: true,
    get: function() {
        return Tooltip;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireDefault = require("@swc/helpers/lib/_interop_require_default.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _reactDom = /*#__PURE__*/ _interopRequireDefault(require("react-dom"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _dom = require("../../lib/dom");
var _floating = require("../../lib/floating");
var _warnOnce = require("../../lib/warnOnce");
var _navTransitionContext = require("../NavTransitionContext/NavTransitionContext");
var _popperArrow = require("../PopperArrow/PopperArrow");
var _subhead = require("../Typography/Subhead/Subhead");
var _tooltipContainer = require("./TooltipContainer");
var isDOMTypeElement = function(element) {
    return /*#__PURE__*/ _react.isValidElement(element) && typeof element.type === "string";
};
var warn = (0, _warnOnce.warnOnce)("Tooltip");
var stylesAppearance = {
    accent: "vkuiTooltip--appearance-accent",
    white: "vkuiTooltip--appearance-white",
    black: "vkuiTooltip--appearance-black",
    inversion: "vkuiTooltip--appearance-inversion"
};
function mapAlignX(x) {
    switch(x){
        case "left":
            return "start";
        case "right":
            return "end";
        default:
            return "";
    }
}
function getDefaultPlacement(alignX, alignY) {
    return [
        alignY || "bottom",
        mapAlignX(alignX || "left")
    ].filter(function(p) {
        return !!p;
    }).join("-");
}
function isVerticalPlacement(placement) {
    return placement.startsWith("top") || placement.startsWith("bottom");
}
var Tooltip = function(_param) {
    var children = _param.children, tmp = _param.isShown, isShownProp = tmp === void 0 ? true : tmp, _param_offsetX = _param.offsetX, offsetX = _param_offsetX === void 0 ? 0 : _param_offsetX, _param_offsetY = _param.offsetY, offsetY = _param_offsetY === void 0 ? 15 : _param_offsetY, alignX = _param.alignX, alignY = _param.alignY, onClose = _param.onClose, _param_cornerOffset = _param.cornerOffset, cornerOffset = _param_cornerOffset === void 0 ? 0 : _param_cornerOffset, cornerAbsoluteOffset = _param.cornerAbsoluteOffset, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "accent" : _param_appearance, _param_arrow = _param.arrow, arrow = _param_arrow === void 0 ? true : _param_arrow, placementProp = _param.placement, text = _param.text, header = _param.header, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "isShown",
        "offsetX",
        "offsetY",
        "alignX",
        "alignY",
        "onClose",
        "cornerOffset",
        "cornerAbsoluteOffset",
        "appearance",
        "arrow",
        "placement",
        "text",
        "header",
        "className"
    ]);
    var arrowRef = _react.useRef(null);
    var _React_useState = _slicedToArray(_react.useState(null), 2), target = _React_useState[0], setTarget = _React_useState[1];
    /* eslint-disable no-restricted-properties */ var tooltipContainer = _react.useMemo(function() {
        return target === null || target === void 0 ? void 0 : target.closest("[".concat(_tooltipContainer.tooltipContainerAttr, "]"));
    }, [
        target
    ]);
    var entering = (0, _navTransitionContext.useNavTransition)().entering;
    var isShown = isShownProp && tooltipContainer && !entering;
    var placement = placementProp || getDefaultPlacement(alignX, alignY);
    var isNotAutoPlacement = (0, _floating.checkIsNotAutoPlacement)(placement);
    if (process.env.NODE_ENV === "development") {
        var multiChildren = _react.Children.count(children) > 1;
        // Empty children is a noop
        var primitiveChild = (0, _vkjs.hasReactNode)(children) && typeof children !== "object";
        (multiChildren || primitiveChild) && warn([
            "children должен быть одним React элементом, получено",
            multiChildren && "несколько",
            primitiveChild && JSON.stringify(children)
        ].filter(Boolean).join(" "), "error");
    }
    var floatingPositionStrategy = _react.useMemo(function() {
        return (target === null || target === void 0 ? void 0 : target.style.position) === "fixed" ? "fixed" : "absolute";
    }, [
        target
    ]);
    if (process.env.NODE_ENV === "development" && target && !tooltipContainer) {
        throw new Error("Use TooltipContainer for Tooltip outside Panel (see docs)");
    }
    var memoizedMiddlewares = _react.useMemo(function() {
        var middlewares = [
            (0, _floating.offsetMiddleware)({
                crossAxis: offsetX,
                mainAxis: offsetY
            })
        ];
        // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
        if (isNotAutoPlacement) {
            middlewares.push((0, _floating.flipMiddleware)());
        } else {
            middlewares.push((0, _floating.autoPlacementMiddleware)({
                alignment: placement ? (0, _floating.getAutoPlacementAlign)(placement) : null
            }));
        }
        middlewares.push((0, _floating.shiftMiddleware)());
        // см. https://floating-ui.com/docs/arrow#order
        if (arrow) {
            middlewares.push((0, _floating.arrowMiddleware)({
                element: arrowRef,
                padding: 14
            }));
            middlewares.push({
                name: "arrowOffset",
                fn: function fn(param) {
                    var placement = param.placement, middlewareData = param.middlewareData;
                    if (!middlewareData.arrow) {
                        return Promise.resolve({});
                    }
                    if (isVerticalPlacement(placement)) {
                        if (cornerAbsoluteOffset !== undefined) {
                            middlewareData.arrow.x = cornerAbsoluteOffset;
                        } else if (middlewareData.arrow.x !== undefined) {
                            middlewareData.arrow.x += cornerOffset;
                        }
                    } else {
                        if (cornerAbsoluteOffset !== undefined) {
                            middlewareData.arrow.y = cornerAbsoluteOffset;
                        } else if (middlewareData.arrow.y !== undefined) {
                            middlewareData.arrow.y += cornerOffset;
                        }
                    }
                    return Promise.resolve({});
                }
            });
        }
        return middlewares;
    }, [
        arrow,
        cornerAbsoluteOffset,
        cornerOffset,
        offsetX,
        offsetY,
        placement,
        isNotAutoPlacement
    ]);
    var _useFloating = (0, _floating.useFloating)({
        strategy: floatingPositionStrategy,
        placement: isNotAutoPlacement ? placement : undefined,
        middleware: memoizedMiddlewares,
        whileElementsMounted: _floating.autoUpdateFloatingElement
    }), floatingDataX = _useFloating.x, floatingDataY = _useFloating.y, resolvedPlacement = _useFloating.placement, refs = _useFloating.refs, _useFloating_middlewareData = _useFloating.middlewareData, arrowCoords = _useFloating_middlewareData.arrow;
    var document = (0, _dom.useDOM)().document;
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "click", isShown && onClose, {
        capture: true,
        passive: true
    });
    var childRef = isDOMTypeElement(children) ? children.ref : /*#__PURE__*/ _react.isValidElement(children) ? children.props.getRootRef : null;
    var patchedRef = (0, _useExternRef.useExternRef)(setTarget, refs.setReference, childRef);
    var child = /*#__PURE__*/ _react.isValidElement(children) ? /*#__PURE__*/ _react.cloneElement(children, _defineProperty({}, isDOMTypeElement(children) ? "ref" : "getRootRef", patchedRef)) : children;
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, child, isShown && target != null && /*#__PURE__*/ _reactDom.default.createPortal(/*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiTooltip", appearance !== "neutral" && stylesAppearance[appearance], className)
    }), /*#__PURE__*/ _react.createElement("div", {
        ref: refs.setFloating,
        style: (0, _floating.convertFloatingDataToReactCSSProperties)(floatingPositionStrategy, floatingDataX, floatingDataY)
    }, arrow && /*#__PURE__*/ _react.createElement(_popperArrow.PopperArrow, {
        coords: arrowCoords,
        placement: resolvedPlacement,
        arrowClassName: "vkuiTooltip__arrow",
        getRootRef: arrowRef
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTooltip__content"
    }, header && /*#__PURE__*/ _react.createElement(_subhead.Subhead, {
        weight: "2"
    }, header), text && /*#__PURE__*/ _react.createElement(_subhead.Subhead, null, text)))), tooltipContainer));
};

//# sourceMappingURL=Tooltip.js.map