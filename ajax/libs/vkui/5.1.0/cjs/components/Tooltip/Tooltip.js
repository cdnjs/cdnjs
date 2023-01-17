"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _vkjs = require("@vkontakte/vkjs");
var _Subhead = require("../Typography/Subhead/Subhead");
var _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
var _PopperArrow = require("../PopperArrow/PopperArrow");
var _reactPopper = require("react-popper");
var _TooltipContainer = require("./TooltipContainer");
var _useExternRef = require("../../hooks/useExternRef");
var _dom = require("../../lib/dom");
var _warnOnce = require("../../lib/warnOnce");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _excluded = ["className"],
  _excluded2 = ["children", "isShown", "offsetX", "offsetY", "alignX", "alignY", "onClose", "cornerOffset", "cornerAbsoluteOffset", "appearance", "arrow", "placement"];
var isDOMTypeElement = function isDOMTypeElement(element) {
  return /*#__PURE__*/React.isValidElement(element) && typeof element.type === 'string';
};
var warn = (0, _warnOnce.warnOnce)('Tooltip');
var IS_DEV = process.env.NODE_ENV === 'development';
var SimpleTooltip = /*#__PURE__*/React.forwardRef(function SimpleTooltip(_ref, ref) {
  var _attributes$container;
  var _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? 'accent' : _ref$appearance,
    header = _ref.header,
    text = _ref.text,
    arrow = _ref.arrow,
    _ref$style = _ref.style,
    popperStyles = _ref$style === void 0 ? {} : _ref$style,
    attributes = _ref.attributes,
    className = _ref.className;
  var _ref2 = (_attributes$container = attributes === null || attributes === void 0 ? void 0 : attributes.container) !== null && _attributes$container !== void 0 ? _attributes$container : {},
    containerClassName = _ref2.className,
    restContainerAttributes = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)("vkuiTooltip", styles["Tooltip--appearance-".concat(appearance)], className)
  }, /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiTooltip__container", containerClassName),
    ref: ref,
    style: popperStyles.container
  }, restContainerAttributes), arrow && /*#__PURE__*/React.createElement(_PopperArrow.PopperArrow, {
    style: popperStyles.arrow,
    attributes: attributes === null || attributes === void 0 ? void 0 : attributes.arrow,
    arrowClassName: "vkuiTooltip__arrow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiTooltip__content"
  }, header && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
    weight: "2",
    className: "vkuiTooltip__title"
  }, header), text && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
    className: "vkuiTooltip__text"
  }, text))));
});
function mapAlignX(x) {
  switch (x) {
    case 'left':
      return 'start';
    case 'right':
      return 'end';
    default:
      return '';
  }
}
function getPlacement(alignX, alignY) {
  return [alignY || 'bottom', mapAlignX(alignX || 'left')].filter(function (p) {
    return !!p;
  }).join('-');
}
function isVerticalPlacement(placement) {
  return placement.startsWith('top') || placement.startsWith('bottom');
}

/**
 * @see https://vkcom.github.io/VKUI/#/Tooltip
 */
var Tooltip = function Tooltip(_ref3) {
  var _attributes$arrow, _attributes$popper;
  var children = _ref3.children,
    _ref3$isShown = _ref3.isShown,
    _isShown = _ref3$isShown === void 0 ? true : _ref3$isShown,
    _ref3$offsetX = _ref3.offsetX,
    offsetX = _ref3$offsetX === void 0 ? 0 : _ref3$offsetX,
    _ref3$offsetY = _ref3.offsetY,
    offsetY = _ref3$offsetY === void 0 ? 15 : _ref3$offsetY,
    alignX = _ref3.alignX,
    alignY = _ref3.alignY,
    onClose = _ref3.onClose,
    _ref3$cornerOffset = _ref3.cornerOffset,
    cornerOffset = _ref3$cornerOffset === void 0 ? 0 : _ref3$cornerOffset,
    cornerAbsoluteOffset = _ref3.cornerAbsoluteOffset,
    appearance = _ref3.appearance,
    _ref3$arrow = _ref3.arrow,
    arrow = _ref3$arrow === void 0 ? true : _ref3$arrow,
    placement = _ref3.placement,
    restProps = (0, _objectWithoutProperties2.default)(_ref3, _excluded2);
  var _useNavTransition = (0, _NavTransitionContext.useNavTransition)(),
    entering = _useNavTransition.entering;
  var isShown = _isShown && !entering;
  var _React$useState = React.useState(null),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    tooltipRef = _React$useState2[0],
    setTooltipRef = _React$useState2[1];
  var _React$useState3 = React.useState(),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    target = _React$useState4[0],
    setTarget = _React$useState4[1];
  if (IS_DEV) {
    var multiChildren = React.Children.count(children) > 1;
    // Empty children is a noop
    var primitiveChild = (0, _vkjs.hasReactNode)(children) && (0, _typeof2.default)(children) !== 'object';
    (multiChildren || primitiveChild) && warn(['children должен быть одним React элементом, получено', multiChildren && 'несколько', primitiveChild && JSON.stringify(children)].filter(Boolean).join(' '), 'error');
  }

  /* eslint-disable no-restricted-properties */
  /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion*/
  var tooltipContainer = React.useMemo(function () {
    return target === null || target === void 0 ? void 0 : target.closest("[".concat(_TooltipContainer.tooltipContainerAttr, "]"));
  }, [target]);
  var strategy = React.useMemo(function () {
    return (target === null || target === void 0 ? void 0 : target.style.position) === 'fixed' ? 'fixed' : 'absolute';
  }, [target]);
  /* eslint-enable @typescript-eslint/no-unnecessary-type-assertion*/
  /* eslint-enable no-restricted-properties */

  if (IS_DEV && target && !tooltipContainer) {
    throw new Error('Use TooltipContainer for Tooltip outside Panel (see docs)');
  }
  var modifiers = React.useMemo(function () {
    var modifiers = [{
      name: 'offset',
      options: {
        offset: [offsetX, offsetY]
      }
    }, {
      name: 'preventOverflow'
    }, {
      name: 'flip'
    }];
    if (arrow) {
      modifiers.push({
        name: 'arrow',
        options: {
          padding: 14
        }
      });
      modifiers.push({
        name: 'arrowOffset',
        enabled: true,
        phase: 'main',
        fn: function fn(_ref4) {
          var state = _ref4.state;
          if (!state.modifiersData.arrow) {
            return;
          }
          if (isVerticalPlacement(state.placement)) {
            if (cornerAbsoluteOffset !== undefined) {
              state.modifiersData.arrow.x = cornerAbsoluteOffset;
            } else {
              var _state$modifiersData$;
              if (((_state$modifiersData$ = state.modifiersData.arrow) === null || _state$modifiersData$ === void 0 ? void 0 : _state$modifiersData$.x) !== undefined) {
                state.modifiersData.arrow.x += cornerOffset;
              }
            }
          } else {
            if (cornerAbsoluteOffset !== undefined) {
              state.modifiersData.arrow.y = cornerAbsoluteOffset;
            } else {
              var _state$modifiersData$2;
              if (((_state$modifiersData$2 = state.modifiersData.arrow) === null || _state$modifiersData$2 === void 0 ? void 0 : _state$modifiersData$2.y) !== undefined) {
                state.modifiersData.arrow.y += cornerOffset;
              }
            }
          }
        }
      });
    }
    return modifiers;
  }, [arrow, cornerAbsoluteOffset, cornerOffset, offsetX, offsetY]);
  var _placement = placement !== null && placement !== void 0 ? placement : getPlacement(alignX, alignY);
  var _usePopper = (0, _reactPopper.usePopper)(target, tooltipRef, {
      strategy: strategy,
      placement: _placement,
      modifiers: modifiers
    }),
    popperStyles = _usePopper.styles,
    attributes = _usePopper.attributes;
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  (0, _useGlobalEventListener.useGlobalEventListener)(document, 'click', isShown && onClose, {
    passive: true
  });
  // NOTE: setting isShown to true used to trigger usePopper().forceUpdate()

  var childRef = isDOMTypeElement(children) ? children.ref : /*#__PURE__*/React.isValidElement(children) ? children.props.getRootRef : null;
  var patchedRef = (0, _useExternRef.useExternRef)(setTarget, childRef);
  var child = /*#__PURE__*/React.isValidElement(children) ? /*#__PURE__*/React.cloneElement(children, (0, _defineProperty2.default)({}, isDOMTypeElement(children) ? 'ref' : 'getRootRef', patchedRef)) : children;
  return /*#__PURE__*/React.createElement(React.Fragment, null, child, isShown && target != null && /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/React.createElement(SimpleTooltip, (0, _extends2.default)({}, restProps, {
    appearance: appearance,
    arrow: arrow,
    ref: function ref(el) {
      return setTooltipRef(el);
    },
    style: {
      arrow: popperStyles.arrow,
      container: popperStyles.popper
    },
    attributes: {
      arrow: (_attributes$arrow = attributes.arrow) !== null && _attributes$arrow !== void 0 ? _attributes$arrow : null,
      container: (_attributes$popper = attributes.popper) !== null && _attributes$popper !== void 0 ? _attributes$popper : null
    }
  })), tooltipContainer));
};
exports.Tooltip = Tooltip;
var styles = {
  "Tooltip--appearance-accent": "vkuiTooltip--appearance-accent",
  "Tooltip--appearance-white": "vkuiTooltip--appearance-white",
  "Tooltip--appearance-black": "vkuiTooltip--appearance-black",
  "Tooltip--appearance-inversion": "vkuiTooltip--appearance-inversion",
  "Tooltip--appearance-neutral": "vkuiTooltip--appearance-neutral"
};
//# sourceMappingURL=Tooltip.js.map