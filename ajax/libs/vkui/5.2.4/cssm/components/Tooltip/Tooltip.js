import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "isShown", "offsetX", "offsetY", "alignX", "alignY", "onClose", "cornerOffset", "cornerAbsoluteOffset", "appearance", "arrow", "placement", "text", "header", "className"];
import * as React from 'react';
import ReactDOM from 'react-dom';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { useDOM } from '../../lib/dom';
import { arrowMiddleware, autoPlacementMiddleware, autoUpdateFloatingElement, checkIsNotAutoPlacement, convertFloatingDataToReactCSSProperties, flipMiddleware, getAutoPlacementAlign, offsetMiddleware, shiftMiddleware, useFloating } from '../../lib/floating';
import { warnOnce } from '../../lib/warnOnce';
import { useNavTransition } from '../NavTransitionContext/NavTransitionContext';
import { PopperArrow } from '../PopperArrow/PopperArrow';
import { Subhead } from '../Typography/Subhead/Subhead';
import { tooltipContainerAttr } from './TooltipContainer';
import "./Tooltip.module.css";
/**
 * Перебиваем `ref`.
 *
 * В оригинальном `React.DOMElement` задаётся `React.LegacyRef<T>`, в котором есть `string`.
 * Когда как `{ ref: "string" }` уже давно депрекейтнут.
 */
var isDOMTypeElement = function isDOMTypeElement(element) {
  return /*#__PURE__*/React.isValidElement(element) && typeof element.type === 'string';
};
var warn = warnOnce('Tooltip');
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
export var Tooltip = function Tooltip(_ref) {
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  var arrowRef = React.useRef(null);
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    target = _React$useState2[0],
    setTarget = _React$useState2[1];
  /* eslint-disable no-restricted-properties */
  var tooltipContainer = React.useMemo(function () {
    return target === null || target === void 0 ? void 0 : target.closest("[".concat(tooltipContainerAttr, "]"));
  }, [target]);
  var _useNavTransition = useNavTransition(),
    entering = _useNavTransition.entering;
  var isShown = isShownProp && tooltipContainer && !entering;
  var placement = placementProp || getDefaultPlacement(alignX, alignY);
  var isNotAutoPlacement = checkIsNotAutoPlacement(placement);
  if (process.env.NODE_ENV === 'development') {
    var multiChildren = React.Children.count(children) > 1;
    // Empty children is a noop
    var primitiveChild = hasReactNode(children) && _typeof(children) !== 'object';
    (multiChildren || primitiveChild) && warn(['children должен быть одним React элементом, получено', multiChildren && 'несколько', primitiveChild && JSON.stringify(children)].filter(Boolean).join(' '), 'error');
  }
  var floatingPositionStrategy = React.useMemo(function () {
    return (target === null || target === void 0 ? void 0 : target.style.position) === 'fixed' ? 'fixed' : 'absolute';
  }, [target]);
  if (process.env.NODE_ENV === 'development' && target && !tooltipContainer) {
    throw new Error('Use TooltipContainer for Tooltip outside Panel (see docs)');
  }
  var memoizedMiddlewares = React.useMemo(function () {
    var middlewares = [offsetMiddleware({
      crossAxis: offsetX,
      mainAxis: offsetY
    })];

    // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
    if (isNotAutoPlacement) {
      middlewares.push(flipMiddleware());
    } else {
      middlewares.push(autoPlacementMiddleware({
        alignment: placement ? getAutoPlacementAlign(placement) : null
      }));
    }
    middlewares.push(shiftMiddleware());

    // см. https://floating-ui.com/docs/arrow#order
    if (arrow) {
      middlewares.push(arrowMiddleware({
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
  var _useFloating = useFloating({
      strategy: floatingPositionStrategy,
      placement: isNotAutoPlacement ? placement : undefined,
      middleware: memoizedMiddlewares,
      whileElementsMounted: autoUpdateFloatingElement
    }),
    floatingDataX = _useFloating.x,
    floatingDataY = _useFloating.y,
    resolvedPlacement = _useFloating.placement,
    refs = _useFloating.refs,
    arrowCoords = _useFloating.middlewareData.arrow;
  var _useDOM = useDOM(),
    document = _useDOM.document;
  useGlobalEventListener(document, 'click', isShown && onClose, {
    capture: true,
    passive: true
  });
  var childRef = isDOMTypeElement(children) ? children.ref : /*#__PURE__*/React.isValidElement(children) ? children.props.getRootRef : null;
  var patchedRef = useExternRef(setTarget, refs.setReference, childRef);
  var child = /*#__PURE__*/React.isValidElement(children) ? /*#__PURE__*/React.cloneElement(children, _defineProperty({}, isDOMTypeElement(children) ? 'ref' : 'getRootRef', patchedRef)) : children;
  return /*#__PURE__*/React.createElement(React.Fragment, null, child, isShown && target != null && /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiTooltip", stylesAppearance[appearance], className)
  }), /*#__PURE__*/React.createElement("div", {
    ref: refs.setFloating,
    style: convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY)
  }, arrow && /*#__PURE__*/React.createElement(PopperArrow, {
    coords: arrowCoords,
    placement: resolvedPlacement,
    arrowClassName: "vkuiTooltip__arrow",
    getRootRef: arrowRef
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiTooltip__content"
  }, header && /*#__PURE__*/React.createElement(Subhead, {
    weight: "2",
    className: "vkuiTooltip__title"
  }, header), text && /*#__PURE__*/React.createElement(Subhead, {
    className: "vkuiTooltip__text"
  }, text)))), tooltipContainer));
};
//# sourceMappingURL=Tooltip.js.map