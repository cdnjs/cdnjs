"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Popper", {
    enumerable: true,
    get: function() {
        return Popper;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _toConsumableArray = require("@swc/helpers/lib/_to_consumable_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _floating = require("../../lib/floating");
var _appRootPortal = require("../AppRoot/AppRootPortal");
var _popperArrow = require("../PopperArrow/PopperArrow");
var Popper = function(_param) {
    var targetRef = _param.targetRef, children = _param.children, getRef = _param.getRef, tmp = _param.placement, placementProp = tmp === void 0 ? "bottom-start" : tmp, onPlacementChange = _param.onPlacementChange, arrow = _param.arrow, arrowClassName = _param.arrowClassName, sameWidth = _param.sameWidth, _param_offsetDistance = _param.offsetDistance, offsetDistance = _param_offsetDistance === void 0 ? 8 : _param_offsetDistance, _param_offsetSkidding = _param.offsetSkidding, offsetSkidding = _param_offsetSkidding === void 0 ? 0 : _param_offsetSkidding, _param_forcePortal = _param.forcePortal, forcePortal = _param_forcePortal === void 0 ? true : _param_forcePortal, _param_autoUpdateOnTargetResize = _param.autoUpdateOnTargetResize, autoUpdateOnTargetResize = _param_autoUpdateOnTargetResize === void 0 ? false : _param_autoUpdateOnTargetResize, styleProp = _param.style, customMiddlewares = _param.customMiddlewares, renderContent = _param.renderContent, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "targetRef",
        "children",
        "getRef",
        "placement",
        "onPlacementChange",
        "arrow",
        "arrowClassName",
        "sameWidth",
        "offsetDistance",
        "offsetSkidding",
        "forcePortal",
        "autoUpdateOnTargetResize",
        "style",
        "customMiddlewares",
        "renderContent",
        "className"
    ]);
    var arrowRef = _react.useRef(null);
    var isNotAutoPlacement = (0, _floating.checkIsNotAutoPlacement)(placementProp);
    var memoizedMiddlewares = _react.useMemo(function() {
        var middlewares = [
            (0, _floating.offsetMiddleware)({
                crossAxis: offsetSkidding,
                mainAxis: arrow ? offsetDistance + _popperArrow.ARROW_HEIGHT : offsetDistance
            })
        ];
        // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
        if (isNotAutoPlacement) {
            middlewares.push((0, _floating.flipMiddleware)());
        } else {
            middlewares.push((0, _floating.autoPlacementMiddleware)({
                alignment: (0, _floating.getAutoPlacementAlign)(placementProp)
            }));
        }
        middlewares.push((0, _floating.shiftMiddleware)());
        if (sameWidth) {
            middlewares.push((0, _floating.sizeMiddleware)({
                apply: function apply(param) {
                    var rects = param.rects, elements = param.elements;
                    Object.assign(elements.floating.style, {
                        width: "".concat(rects.reference.width, "px")
                    });
                }
            }));
        }
        if (customMiddlewares) {
            var _middlewares;
            (_middlewares = middlewares).push.apply(_middlewares, _toConsumableArray(customMiddlewares));
        }
        // см. https://floating-ui.com/docs/arrow#order
        if (arrow) {
            middlewares.push((0, _floating.arrowMiddleware)({
                element: arrowRef,
                padding: _popperArrow.ARROW_PADDING
            }));
        }
        return middlewares;
    }, [
        arrow,
        sameWidth,
        offsetSkidding,
        offsetDistance,
        customMiddlewares,
        placementProp,
        isNotAutoPlacement
    ]);
    var _useFloating = (0, _floating.useFloating)({
        placement: isNotAutoPlacement ? placementProp : undefined,
        middleware: memoizedMiddlewares,
        whileElementsMounted: function whileElementsMounted() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            return _floating.autoUpdateFloatingElement.apply(void 0, _toConsumableArray(args).concat([
                {
                    elementResize: autoUpdateOnTargetResize
                }
            ]));
        }
    }), floatingDataX = _useFloating.x, floatingDataY = _useFloating.y, floatingPositionStrategy = _useFloating.strategy, resolvedPlacement = _useFloating.placement, refs = _useFloating.refs, _useFloating_middlewareData = _useFloating.middlewareData, arrowCoords = _useFloating_middlewareData.arrow;
    var handleRootRef = (0, _useExternRef.useExternRef)(refs.setFloating, getRef);
    _react.useEffect(function() {
        refs.setReference(targetRef.current);
    }, [
        refs,
        targetRef
    ]);
    _react.useEffect(function() {
        if (resolvedPlacement && onPlacementChange) {
            onPlacementChange({
                placement: resolvedPlacement
            });
        }
    }, [
        onPlacementChange,
        resolvedPlacement
    ]);
    var dropdown = /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiPopper", className),
        ref: handleRootRef,
        style: _objectSpread({}, styleProp, (0, _floating.convertFloatingDataToReactCSSProperties)(floatingPositionStrategy, floatingDataX, floatingDataY, sameWidth ? null : undefined))
    }), arrow && /*#__PURE__*/ _react.createElement(_popperArrow.PopperArrow, {
        coords: arrowCoords,
        placement: resolvedPlacement,
        arrowClassName: arrowClassName,
        getRootRef: arrowRef
    }), renderContent ? renderContent({
        className: ""
    }) : children);
    return /*#__PURE__*/ _react.createElement(_appRootPortal.AppRootPortal, {
        forcePortal: forcePortal
    }, dropdown);
};

//# sourceMappingURL=Popper.js.map