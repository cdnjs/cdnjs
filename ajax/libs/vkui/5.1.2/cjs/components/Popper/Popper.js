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
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _reactPopper = require("react-popper");
var _AppRootPortal = require("../AppRoot/AppRootPortal");
var _PopperArrow = require("../PopperArrow/PopperArrow");
var _usePlatform = require("../../hooks/usePlatform");
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _useExternRef = require("../../hooks/useExternRef");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["targetRef", "children", "getRef", "placement", "onPlacementChange", "arrow", "arrowClassName", "sameWidth", "offsetDistance", "offsetSkidding", "forcePortal", "style", "customModifiers", "renderContent", "className"];
var ARROW_PADDING = 8;
var ARROW_WIDTH = 20;
var ARROW_HEIGHT = 8;
var preventOverflowModifier = {
  name: 'preventOverflow',
  options: {
    mainAxis: false
  }
};
var flipModifier = {
  name: 'flip'
};
var arrowModifier = {
  name: 'arrow',
  options: {
    padding: ARROW_PADDING
  }
};
var sameWidthModifier = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: function fn(_ref) {
    var state = _ref.state;
    state.styles.popper.width = "".concat(state.rects.reference.width, "px");
  },
  effect: function effect(_ref2) {
    var state = _ref2.state;
    state.elements.popper.style.width = "".concat(state.elements.reference.offsetWidth, "px");
  }
};

/**
 * @see https://vkcom.github.io/VKUI/#/Popper
 */
var Popper = function Popper(_ref3) {
  var _targetRef$current3;
  var targetRef = _ref3.targetRef,
    children = _ref3.children,
    getRef = _ref3.getRef,
    _ref3$placement = _ref3.placement,
    placement = _ref3$placement === void 0 ? 'bottom-start' : _ref3$placement,
    onPlacementChange = _ref3.onPlacementChange,
    arrow = _ref3.arrow,
    arrowClassName = _ref3.arrowClassName,
    sameWidth = _ref3.sameWidth,
    _ref3$offsetDistance = _ref3.offsetDistance,
    offsetDistance = _ref3$offsetDistance === void 0 ? 8 : _ref3$offsetDistance,
    _ref3$offsetSkidding = _ref3.offsetSkidding,
    offsetSkidding = _ref3$offsetSkidding === void 0 ? 0 : _ref3$offsetSkidding,
    _ref3$forcePortal = _ref3.forcePortal,
    forcePortal = _ref3$forcePortal === void 0 ? true : _ref3$forcePortal,
    compStyles = _ref3.style,
    customModifiers = _ref3.customModifiers,
    renderContent = _ref3.renderContent,
    className = _ref3.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref3, _excluded);
  var _React$useState = React.useState(null),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    popperNode = _React$useState2[0],
    setPopperNode = _React$useState2[1];
  var _React$useState3 = React.useState(0),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    smallTargetOffsetSkidding = _React$useState4[0],
    setSmallTargetOffsetSkidding = _React$useState4[1];
  var platform = (0, _usePlatform.usePlatform)();
  var setExternalRef = (0, _useExternRef.useExternRef)(getRef, setPopperNode);
  var modifiers = React.useMemo(function () {
    var modifiers = [preventOverflowModifier, {
      name: 'offset',
      options: {
        offset: [arrow ? offsetSkidding - smallTargetOffsetSkidding : offsetSkidding, arrow ? offsetDistance + ARROW_HEIGHT : offsetDistance]
      }
    }, flipModifier];
    if (arrow) {
      modifiers.push(arrowModifier);
    }
    if (sameWidth) {
      modifiers.push(sameWidthModifier);
    }
    if (customModifiers) {
      modifiers.push.apply(modifiers, (0, _toConsumableArray2.default)(customModifiers));
    }
    return modifiers;
  }, [arrow, sameWidth, smallTargetOffsetSkidding, offsetSkidding, offsetDistance, customModifiers]);
  var _usePopper = (0, _reactPopper.usePopper)(targetRef.current, popperNode, {
      placement: placement,
      modifiers: modifiers
    }),
    popperStyles = _usePopper.styles,
    state = _usePopper.state,
    attributes = _usePopper.attributes;
  var resolvedPlacement = state === null || state === void 0 ? void 0 : state.placement;
  var isEdgePlacement = !!resolvedPlacement && resolvedPlacement.includes('-'); // true, если поппер отрисован с краю

  // Если поппер рисуется с краю, то нужно опционально сместить его в тех случаях, когда стрелка не дотягивается до
  // таргета из-за маленьких размеров последнего
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (arrow && isEdgePlacement) {
      var _ref4, _targetRef$current, _targetRef$current2;
      var placementDirection = resolvedPlacement !== null && resolvedPlacement !== void 0 && resolvedPlacement.startsWith('bottom') || resolvedPlacement !== null && resolvedPlacement !== void 0 && resolvedPlacement.startsWith('top') ? 'vertical' : 'horizontal';
      var arrowSize = placementDirection === 'vertical' ? ARROW_WIDTH : ARROW_HEIGHT;
      var targetSize = (_ref4 = placementDirection === 'vertical' ? (_targetRef$current = targetRef.current) === null || _targetRef$current === void 0 ? void 0 : _targetRef$current.offsetWidth : (_targetRef$current2 = targetRef.current) === null || _targetRef$current2 === void 0 ? void 0 : _targetRef$current2.offsetHeight) !== null && _ref4 !== void 0 ? _ref4 : 0;
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
  }, [onPlacementChange, resolvedPlacement]);
  var dropdown = /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, attributes.popper, {
    className: (0, _vkjs.classNames)("vkuiPopper", (0, _getPlatformClassName.getPlatformClassName)("vkuiPopper", platform), className),
    ref: setExternalRef,
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, compStyles), popperStyles.popper), {}, {
      minWidth: sameWidth ? (_targetRef$current3 = targetRef.current) === null || _targetRef$current3 === void 0 ? void 0 : _targetRef$current3.scrollWidth : undefined
    })
  }), arrow && /*#__PURE__*/React.createElement(_PopperArrow.PopperArrow, {
    attributes: attributes.arrow,
    style: popperStyles.arrow,
    arrowClassName: arrowClassName
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