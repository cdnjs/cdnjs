"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _dom = require("../../lib/dom");
var _floating = require("../../lib/floating");
var _warnOnce = require("../../lib/warnOnce");
var _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
var _PopperArrow = require("../PopperArrow/PopperArrow");
var _Subhead = require("../Typography/Subhead/Subhead");
var _TooltipContainer = require("./TooltipContainer");
var _excluded = ["children", "isShown", "offsetX", "offsetY", "alignX", "alignY", "onClose", "cornerOffset", "cornerAbsoluteOffset", "appearance", "arrow", "placement", "text", "header", "className"];
var isDOMTypeElement = function isDOMTypeElement(element) {
  return /*#__PURE__*/React.isValidElement(element) && typeof element.type === 'string';
};
var warn = (0, _warnOnce.warnOnce)('Tooltip');
var stylesAppearance = {
  accent: "vkuiTooltip--appearance-accent",
  neutral: "vkuiTooltip--appearance-neutral",
  white: "vkuiTooltip--appearance-white",
  black: "vkuiTooltip--appearance-black",
  inversion: "vkuiTooltip--appearance-inversion"
};
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
function getDefaultPlacement(alignX, alignY) {
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
var Tooltip = function Tooltip(_ref) {
  var children = _ref.children,
    _ref$isShown = _ref.isShown,
    isShownProp = _ref$isShown === void 0 ? true : _ref$isShown,
    _ref$offsetX = _ref.offsetX,
    offsetX = _ref$offsetX === void 0 ? 0 : _ref$offsetX,
    _ref$offsetY = _ref.offsetY,
    offsetY = _ref$offsetY === void 0 ? 15 : _ref$offsetY,
    alignX = _ref.alignX,
    alignY = _ref.alignY,
    onClose = _ref.onClose,
    _ref$cornerOffset = _ref.cornerOffset,
    cornerOffset = _ref$cornerOffset === void 0 ? 0 : _ref$cornerOffset,
    cornerAbsoluteOffset = _ref.cornerAbsoluteOffset,
    _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? 'accent' : _ref$appearance,
    _ref$arrow = _ref.arrow,
    arrow = _ref$arrow === void 0 ? true : _ref$arrow,
    placementProp = _ref.placement,
    text = _ref.text,
    header = _ref.header,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var arrowRef = React.useRef(null);
  var _React$useState = React.useState(null),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    target = _React$useState2[0],
    setTarget = _React$useState2[1];
  /* eslint-disable no-restricted-properties */
  var tooltipContainer = React.useMemo(function () {
    return target === null || target === void 0 ? void 0 : target.closest("[".concat(_TooltipContainer.tooltipContainerAttr, "]"));
  }, [target]);
  var _useNavTransition = (0, _NavTransitionContext.useNavTransition)(),
    entering = _useNavTransition.entering;
  var isShown = isShownProp && tooltipContainer && !entering;
  var placement = placementProp || getDefaultPlacement(alignX, alignY);
  var isNotAutoPlacement = (0, _floating.checkIsNotAutoPlacement)(placement);
  if (process.env.NODE_ENV === 'development') {
    var multiChildren = React.Children.count(children) > 1;
    // Empty children is a noop
    var primitiveChild = (0, _vkjs.hasReactNode)(children) && (0, _typeof2.default)(children) !== 'object';
    (multiChildren || primitiveChild) && warn(['children должен быть одним React элементом, получено', multiChildren && 'несколько', primitiveChild && JSON.stringify(children)].filter(Boolean).join(' '), 'error');
  }
  var floatingPositionStrategy = React.useMemo(function () {
    return (target === null || target === void 0 ? void 0 : target.style.position) === 'fixed' ? 'fixed' : 'absolute';
  }, [target]);
  if (process.env.NODE_ENV === 'development' && target && !tooltipContainer) {
    throw new Error('Use TooltipContainer for Tooltip outside Panel (see docs)');
  }
  var memoizedMiddlewares = React.useMemo(function () {
    var middlewares = [(0, _floating.offsetMiddleware)({
      crossAxis: offsetX,
      mainAxis: offsetY
    })];

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
        name: 'arrowOffset',
        fn: function fn(_ref2) {
          var placement = _ref2.placement,
            middlewareData = _ref2.middlewareData;
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
  }, [arrow, cornerAbsoluteOffset, cornerOffset, offsetX, offsetY, placement, isNotAutoPlacement]);
  var _useFloating = (0, _floating.useFloating)({
      strategy: floatingPositionStrategy,
      placement: isNotAutoPlacement ? placement : undefined,
      middleware: memoizedMiddlewares,
      whileElementsMounted: _floating.autoUpdateFloatingElement
    }),
    floatingDataX = _useFloating.x,
    floatingDataY = _useFloating.y,
    resolvedPlacement = _useFloating.placement,
    refs = _useFloating.refs,
    arrowCoords = _useFloating.middlewareData.arrow;
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  (0, _useGlobalEventListener.useGlobalEventListener)(document, 'click', isShown && onClose, {
    capture: true,
    passive: true
  });
  var childRef = isDOMTypeElement(children) ? children.ref : /*#__PURE__*/React.isValidElement(children) ? children.props.getRootRef : null;
  var patchedRef = (0, _useExternRef.useExternRef)(setTarget, refs.setReference, childRef);
  var child = /*#__PURE__*/React.isValidElement(children) ? /*#__PURE__*/React.cloneElement(children, (0, _defineProperty2.default)({}, isDOMTypeElement(children) ? 'ref' : 'getRootRef', patchedRef)) : children;
  return /*#__PURE__*/React.createElement(React.Fragment, null, child, isShown && target != null && /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiTooltip", stylesAppearance[appearance], className)
  }), /*#__PURE__*/React.createElement("div", {
    ref: refs.setFloating,
    style: (0, _floating.convertFloatingDataToReactCSSProperties)(floatingPositionStrategy, floatingDataX, floatingDataY)
  }, arrow && /*#__PURE__*/React.createElement(_PopperArrow.PopperArrow, {
    coords: arrowCoords,
    placement: resolvedPlacement,
    arrowClassName: "vkuiTooltip__arrow",
    getRootRef: arrowRef
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiTooltip__content"
  }, header && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
    weight: "2",
    className: "vkuiTooltip__title"
  }, header), text && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
    className: "vkuiTooltip__text"
  }, text)))), tooltipContainer));
};
exports.Tooltip = Tooltip;
//# sourceMappingURL=Tooltip.js.map