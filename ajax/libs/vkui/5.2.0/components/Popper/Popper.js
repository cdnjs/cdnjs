import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["targetRef", "children", "getRef", "placement", "onPlacementChange", "arrow", "arrowClassName", "sameWidth", "offsetDistance", "offsetSkidding", "forcePortal", "autoUpdateOnTargetResize", "style", "customMiddlewares", "renderContent", "className"];
import * as React from 'react';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { ARROW_PADDING, ARROW_HEIGHT, PopperArrow } from '../PopperArrow/PopperArrow';
import { useExternRef } from '../../hooks/useExternRef';
import { checkIsNotAutoPlacement, getAutoPlacementAlign, convertFloatingDataToReactCSSProperties, useFloating, autoUpdateFloatingElement, offsetMiddleware, flipMiddleware, shiftMiddleware, autoPlacementMiddleware, arrowMiddleware, sizeMiddleware } from '../../lib/floating';
import { classNames } from '@vkontakte/vkjs';
/**
 * @see https://vkcom.github.io/VKUI/#/Popper
 */
export var Popper = function Popper(_ref) {
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  var arrowRef = React.useRef(null);
  var isNotAutoPlacement = checkIsNotAutoPlacement(placementProp);
  var memoizedMiddlewares = React.useMemo(function () {
    var middlewares = [offsetMiddleware({
      crossAxis: offsetSkidding,
      mainAxis: arrow ? offsetDistance + ARROW_HEIGHT : offsetDistance
    })];

    // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
    if (isNotAutoPlacement) {
      middlewares.push(flipMiddleware());
    } else {
      middlewares.push(autoPlacementMiddleware({
        alignment: getAutoPlacementAlign(placementProp)
      }));
    }
    middlewares.push(shiftMiddleware());
    if (sameWidth) {
      middlewares.push(sizeMiddleware({
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
      middlewares.push.apply(middlewares, _toConsumableArray(customMiddlewares));
    }

    // см. https://floating-ui.com/docs/arrow#order
    if (arrow) {
      middlewares.push(arrowMiddleware({
        element: arrowRef,
        padding: ARROW_PADDING
      }));
    }
    return middlewares;
  }, [arrow, sameWidth, offsetSkidding, offsetDistance, customMiddlewares, placementProp, isNotAutoPlacement]);
  var _useFloating = useFloating({
      placement: isNotAutoPlacement ? placementProp : undefined,
      middleware: memoizedMiddlewares,
      whileElementsMounted: function whileElementsMounted() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return autoUpdateFloatingElement.apply(void 0, args.concat([{
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
  var handleRootRef = useExternRef(refs.setFloating, getRef);
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
  var dropdown = /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiPopper", className),
    ref: handleRootRef,
    style: _objectSpread(_objectSpread({}, styleProp), convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY, sameWidth ? null : undefined))
  }), arrow && /*#__PURE__*/React.createElement(PopperArrow, {
    coords: arrowCoords,
    placement: resolvedPlacement,
    arrowClassName: arrowClassName,
    getRootRef: arrowRef
  }), renderContent ? renderContent({
    className: "vkuiPopper__content"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopper__content"
  }, children));
  return /*#__PURE__*/React.createElement(AppRootPortal, {
    forcePortal: forcePortal,
    className: "vkuiPopperPortal"
  }, dropdown);
};
//# sourceMappingURL=Popper.js.map