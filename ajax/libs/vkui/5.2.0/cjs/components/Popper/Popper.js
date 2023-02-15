"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popper = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _AppRootPortal = require("../AppRoot/AppRootPortal");
var _PopperArrow = require("../PopperArrow/PopperArrow");
var _useExternRef = require("../../hooks/useExternRef");
var _floating = require("../../lib/floating");
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["targetRef", "children", "getRef", "placement", "onPlacementChange", "arrow", "arrowClassName", "sameWidth", "offsetDistance", "offsetSkidding", "forcePortal", "autoUpdateOnTargetResize", "style", "customMiddlewares", "renderContent", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Popper
 */
var Popper = function Popper(_ref) {
  var targetRef = _ref.targetRef,
    children = _ref.children,
    getRef = _ref.getRef,
    _ref$placement = _ref.placement,
    placementProp = _ref$placement === void 0 ? 'bottom-start' : _ref$placement,
    onPlacementChange = _ref.onPlacementChange,
    arrow = _ref.arrow,
    arrowClassName = _ref.arrowClassName,
    sameWidth = _ref.sameWidth,
    _ref$offsetDistance = _ref.offsetDistance,
    offsetDistance = _ref$offsetDistance === void 0 ? 8 : _ref$offsetDistance,
    _ref$offsetSkidding = _ref.offsetSkidding,
    offsetSkidding = _ref$offsetSkidding === void 0 ? 0 : _ref$offsetSkidding,
    _ref$forcePortal = _ref.forcePortal,
    forcePortal = _ref$forcePortal === void 0 ? true : _ref$forcePortal,
    _ref$autoUpdateOnTarg = _ref.autoUpdateOnTargetResize,
    autoUpdateOnTargetResize = _ref$autoUpdateOnTarg === void 0 ? false : _ref$autoUpdateOnTarg,
    styleProp = _ref.style,
    customMiddlewares = _ref.customMiddlewares,
    renderContent = _ref.renderContent,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var arrowRef = React.useRef(null);
  var isNotAutoPlacement = (0, _floating.checkIsNotAutoPlacement)(placementProp);
  var memoizedMiddlewares = React.useMemo(function () {
    var middlewares = [(0, _floating.offsetMiddleware)({
      crossAxis: offsetSkidding,
      mainAxis: arrow ? offsetDistance + _PopperArrow.ARROW_HEIGHT : offsetDistance
    })];

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
        apply: function apply(_ref2) {
          var rects = _ref2.rects,
            elements = _ref2.elements;
          Object.assign(elements.floating.style, {
            width: "".concat(rects.reference.width, "px")
          });
        }
      }));
    }
    if (customMiddlewares) {
      middlewares.push.apply(middlewares, (0, _toConsumableArray2.default)(customMiddlewares));
    }

    // см. https://floating-ui.com/docs/arrow#order
    if (arrow) {
      middlewares.push((0, _floating.arrowMiddleware)({
        element: arrowRef,
        padding: _PopperArrow.ARROW_PADDING
      }));
    }
    return middlewares;
  }, [arrow, sameWidth, offsetSkidding, offsetDistance, customMiddlewares, placementProp, isNotAutoPlacement]);
  var _useFloating = (0, _floating.useFloating)({
      placement: isNotAutoPlacement ? placementProp : undefined,
      middleware: memoizedMiddlewares,
      whileElementsMounted: function whileElementsMounted() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _floating.autoUpdateFloatingElement.apply(void 0, args.concat([{
          elementResize: autoUpdateOnTargetResize
        }]));
      }
    }),
    floatingDataX = _useFloating.x,
    floatingDataY = _useFloating.y,
    floatingPositionStrategy = _useFloating.strategy,
    resolvedPlacement = _useFloating.placement,
    refs = _useFloating.refs,
    arrowCoords = _useFloating.middlewareData.arrow;
  var handleRootRef = (0, _useExternRef.useExternRef)(refs.setFloating, getRef);
  React.useEffect(function () {
    refs.setReference(targetRef.current);
  }, [refs, targetRef]);
  React.useEffect(function () {
    if (resolvedPlacement && onPlacementChange) {
      onPlacementChange({
        placement: resolvedPlacement
      });
    }
  }, [onPlacementChange, resolvedPlacement]);
  var dropdown = /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiPopper", className),
    ref: handleRootRef,
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, styleProp), (0, _floating.convertFloatingDataToReactCSSProperties)(floatingPositionStrategy, floatingDataX, floatingDataY, sameWidth ? null : undefined))
  }), arrow && /*#__PURE__*/React.createElement(_PopperArrow.PopperArrow, {
    coords: arrowCoords,
    placement: resolvedPlacement,
    arrowClassName: arrowClassName,
    getRootRef: arrowRef
  }), renderContent ? renderContent({
    className: "vkuiPopper__content"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopper__content"
  }, children));
  return /*#__PURE__*/React.createElement(_AppRootPortal.AppRootPortal, {
    forcePortal: forcePortal,
    className: "vkuiPopperPortal"
  }, dropdown);
};
exports.Popper = Popper;
//# sourceMappingURL=Popper.js.map