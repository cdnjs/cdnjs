"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");

var _reactPopper = require("react-popper");

var _TooltipContainer = require("./TooltipContainer");

var _useExternRef = require("../../hooks/useExternRef");

var _dom = require("../../lib/dom");

var _warnOnce = require("../../lib/warnOnce");

var _utils = require("../../lib/utils");

var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");

var _excluded = ["children", "isShown", "offsetX", "offsetY", "alignX", "alignY", "onClose", "cornerOffset", "cornerAbsoluteOffset"];

var isDOMTypeElement = function isDOMTypeElement(element) {
  return /*#__PURE__*/React.isValidElement(element) && typeof element.type === "string";
};

var baseClassName = (0, _getClassName.getClassName)("Tooltip");
var warn = (0, _warnOnce.warnOnce)("Tooltip");
var IS_DEV = process.env.NODE_ENV === "development";
var SimpleTooltip = /*#__PURE__*/React.forwardRef(function SimpleTooltip(_ref, ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "accent" : _ref$mode,
      header = _ref.header,
      text = _ref.text,
      arrowRef = _ref.arrowRef,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      attributes = _ref.attributes;
  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)(baseClassName, "Tooltip--".concat(mode))
  }, (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    vkuiClass: "Tooltip__container",
    ref: ref,
    style: style.container
  }, attributes === null || attributes === void 0 ? void 0 : attributes.container), (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    vkuiClass: "Tooltip__corner",
    style: style.arrow
  }, attributes === null || attributes === void 0 ? void 0 : attributes.arrow, {
    ref: arrowRef
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Tooltip__content"
  }, header && (0, _jsxRuntime.createScopedElement)(_Subhead.default, {
    weight: "1",
    vkuiClass: "Tooltip__title"
  }, header), text && (0, _jsxRuntime.createScopedElement)(_Subhead.default, {
    vkuiClass: "Tooltip__text"
  }, text))));
});

function mapAlignX(x) {
  switch (x) {
    case "left":
      return "start";

    case "right":
      return "end";

    default:
      return "";
  }
}

function getPlacement(alignX, alignY) {
  return [alignY || "bottom", mapAlignX(alignX || "left")].filter(function (p) {
    return !!p;
  }).join("-");
}

function isVerticalPlacement(placement) {
  return placement.startsWith("top") || placement.startsWith("bottom");
}

var Tooltip = function Tooltip(_ref2) {
  var _attributes$arrow, _attributes$popper;

  var children = _ref2.children,
      _isShown = _ref2.isShown,
      _ref2$offsetX = _ref2.offsetX,
      offsetX = _ref2$offsetX === void 0 ? 0 : _ref2$offsetX,
      _ref2$offsetY = _ref2.offsetY,
      offsetY = _ref2$offsetY === void 0 ? 15 : _ref2$offsetY,
      alignX = _ref2.alignX,
      alignY = _ref2.alignY,
      onClose = _ref2.onClose,
      _ref2$cornerOffset = _ref2.cornerOffset,
      cornerOffset = _ref2$cornerOffset === void 0 ? 0 : _ref2$cornerOffset,
      cornerAbsoluteOffset = _ref2.cornerAbsoluteOffset,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);

  var _useNavTransition = (0, _NavTransitionContext.useNavTransition)(),
      entering = _useNavTransition.entering;

  var isShown = _isShown && !entering;

  var _React$useState = React.useState(null),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      tooltipRef = _React$useState2[0],
      setTooltipRef = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      tooltipArrowRef = _React$useState4[0],
      setTooltipArrowRef = _React$useState4[1];

  var _React$useState5 = React.useState(),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      target = _React$useState6[0],
      setTarget = _React$useState6[1];

  if (IS_DEV) {
    var multiChildren = React.Children.count(children) > 1; // Empty children is a noop

    var primitiveChild = (0, _utils.hasReactNode)(children) && (0, _typeof2.default)(children) !== "object";
    (multiChildren || primitiveChild) && warn(["children must be a single React element, got", multiChildren && "multiple", primitiveChild && JSON.stringify(children)].filter(Boolean).join(" "));
  }
  /* eslint-disable no-restricted-properties */

  /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion*/


  var tooltipContainer = React.useMemo(function () {
    return target === null || target === void 0 ? void 0 : target.closest("[".concat(_TooltipContainer.tooltipContainerAttr, "]"));
  }, [target]);
  var strategy = React.useMemo(function () {
    return (target === null || target === void 0 ? void 0 : target.style.position) === "fixed" ? "fixed" : "absolute";
  }, [target]);
  /* eslint-enable @typescript-eslint/no-unnecessary-type-assertion*/

  /* eslint-enable no-restricted-properties */

  if (IS_DEV && target && !tooltipContainer) {
    throw new Error("Use TooltipContainer for Tooltip outside Panel (see docs)");
  }

  var arrowOffsetModiifer = React.useMemo(function () {
    return {
      name: "arrowOffset",
      enabled: true,
      phase: "main",
      fn: function fn(_ref3) {
        var state = _ref3.state;

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
    };
  }, [cornerOffset, cornerAbsoluteOffset]);
  var placement = getPlacement(alignX, alignY);

  var _usePopper = (0, _reactPopper.usePopper)(target, tooltipRef, {
    strategy: strategy,
    placement: placement,
    modifiers: [{
      name: "offset",
      options: {
        offset: [offsetX, offsetY]
      }
    }, {
      name: "arrow",
      options: {
        element: tooltipArrowRef,
        padding: 14
      }
    }, {
      name: "preventOverflow"
    }, {
      name: "flip"
    }, arrowOffsetModiifer]
  }),
      styles = _usePopper.styles,
      attributes = _usePopper.attributes;

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  (0, _useGlobalEventListener.useGlobalEventListener)(document, "click", isShown && onClose, {
    passive: true
  }); // NOTE: setting isShown to true used to trigger usePopper().forceUpdate()

  var childRef = /*#__PURE__*/React.isValidElement(children) && (isDOMTypeElement(children) ? children.ref : children.props.getRootRef);
  var patchedRef = (0, _useExternRef.useExternRef)(setTarget, childRef);
  var child = /*#__PURE__*/React.isValidElement(children) ? /*#__PURE__*/React.cloneElement(children, (0, _defineProperty2.default)({}, isDOMTypeElement(children) ? "ref" : "getRootRef", patchedRef)) : children;
  return (0, _jsxRuntime.createScopedElement)(React.Fragment, null, child, isShown && target != null && /*#__PURE__*/_reactDom.default.createPortal((0, _jsxRuntime.createScopedElement)(SimpleTooltip, (0, _extends2.default)({}, restProps, {
    ref: function ref(el) {
      return setTooltipRef(el);
    },
    arrowRef: function arrowRef(el) {
      return setTooltipArrowRef(el);
    },
    style: {
      arrow: styles.arrow,
      container: styles.popper
    },
    attributes: {
      arrow: (_attributes$arrow = attributes.arrow) !== null && _attributes$arrow !== void 0 ? _attributes$arrow : null,
      container: (_attributes$popper = attributes.popper) !== null && _attributes$popper !== void 0 ? _attributes$popper : null
    }
  })), tooltipContainer));
};

Tooltip.defaultProps = {
  offsetX: 0,
  offsetY: 15,
  cornerOffset: 0,
  isShown: true,
  mode: "accent"
}; // eslint-disable-next-line import/no-default-export

var _default = Tooltip;
exports.default = _default;
//# sourceMappingURL=Tooltip.js.map