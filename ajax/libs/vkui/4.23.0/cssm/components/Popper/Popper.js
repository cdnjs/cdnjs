import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["targetRef", "children", "getRef", "placement", "onPlacementChange", "arrow", "arrowClassName", "offsetDistance", "offsetSkidding", "style"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { usePopper } from 'react-popper';
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import { useExternRef } from "../../hooks/useExternRef";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import "./Popper.css";
var ARROW_PADDING = 8;
var ARROW_WIDTH = 20;
var ARROW_HEIGHT = 8;
export var Popper = function Popper(_ref) {
  var targetRef = _ref.targetRef,
      children = _ref.children,
      getRef = _ref.getRef,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottom-start' : _ref$placement,
      onPlacementChange = _ref.onPlacementChange,
      arrow = _ref.arrow,
      arrowClassName = _ref.arrowClassName,
      _ref$offsetDistance = _ref.offsetDistance,
      offsetDistance = _ref$offsetDistance === void 0 ? 8 : _ref$offsetDistance,
      _ref$offsetSkidding = _ref.offsetSkidding,
      offsetSkidding = _ref$offsetSkidding === void 0 ? 0 : _ref$offsetSkidding,
      compStyles = _ref.style,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      popperNode = _React$useState2[0],
      setPopperNode = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      smallTargetOffsetSkidding = _React$useState4[0],
      setSmallTargetOffsetSkidding = _React$useState4[1];

  var platform = usePlatform();
  var setExternalRef = useExternRef(getRef, setPopperNode);
  var modifiers = [{
    name: 'preventOverflow'
  }, {
    name: 'offset',
    options: {
      offset: [arrow ? offsetSkidding - smallTargetOffsetSkidding : offsetSkidding, arrow ? offsetDistance + ARROW_HEIGHT : offsetDistance]
    }
  }, {
    name: 'flip'
  }];

  if (arrow) {
    modifiers.push({
      name: 'arrow',
      options: {
        padding: ARROW_PADDING
      }
    });
  }

  var _usePopper = usePopper(targetRef.current, popperNode, {
    placement: placement,
    modifiers: modifiers
  }),
      styles = _usePopper.styles,
      state = _usePopper.state,
      attributes = _usePopper.attributes;

  var resolvedPlacement = state === null || state === void 0 ? void 0 : state.placement;
  var isEdgePlacement = !!resolvedPlacement && resolvedPlacement.includes('-'); // true, если поппер отрисован скраю
  // Если поппер рисуется скраю, то нужно опционально сместить его в тех случаях, когда стрелка не дотягивается до
  // таргета из-за маленьких размеров последнего

  useIsomorphicLayoutEffect(function () {
    if (arrow && isEdgePlacement) {
      var placementDirection = resolvedPlacement.startsWith('bottom') || resolvedPlacement.startsWith('top') ? 'vertical' : 'horizontal';
      var arrowSize = placementDirection === 'vertical' ? ARROW_WIDTH : ARROW_HEIGHT;
      var targetSize = placementDirection === 'vertical' ? targetRef.current.offsetWidth : targetRef.current.offsetHeight;

      if (targetSize < arrowSize + 2 * ARROW_PADDING) {
        setSmallTargetOffsetSkidding(ARROW_PADDING + arrowSize / 2);
      }
    } else {
      setSmallTargetOffsetSkidding(0);
    }
  }, [arrow, isEdgePlacement]);
  React.useEffect(function () {
    if (resolvedPlacement) {
      onPlacementChange && onPlacementChange({
        placement: resolvedPlacement
      });
    }
  }, [resolvedPlacement]);
  var dropdown = createScopedElement("div", _extends({}, restProps, attributes.popper, {
    vkuiClass: getClassName('Popper', platform),
    ref: setExternalRef,
    style: _objectSpread(_objectSpread({}, compStyles), styles.popper)
  }), arrow && createScopedElement("div", _extends({}, attributes.arrow, {
    vkuiClass: "Popper__arrow",
    "data-popper-arrow": true,
    style: styles.arrow
  }), createScopedElement("svg", {
    vkuiClass: "Popper__arrow-in",
    className: arrowClassName,
    width: "20",
    height: "8",
    viewBox: "0 0 20 8",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, createScopedElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10 0C13 0 15.9999 8 20 8H0C3.9749 8 7 0 10 0Z",
    fill: "currentColor"
  }))), createScopedElement("div", {
    vkuiClass: "Popper__content"
  }, children));
  return createScopedElement(AppRootPortal, {
    forcePortal: true,
    vkuiClass: "PopperPortal"
  }, dropdown);
};
//# sourceMappingURL=Popper.js.map