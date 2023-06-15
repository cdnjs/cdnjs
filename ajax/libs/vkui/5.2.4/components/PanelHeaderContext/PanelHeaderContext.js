import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["children", "onClose", "opened", "className"];
var _sizeXClassNames;
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { SizeType } from '../../lib/adaptivity';
import { useDOM } from '../../lib/dom';
import { Platform } from '../../lib/platform';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { FixedLayout } from '../FixedLayout/FixedLayout';
var sizeXClassNames = (_sizeXClassNames = {
  none: "vkuiPanelHeaderContext--sizeX-none"
}, _defineProperty(_sizeXClassNames, SizeType.COMPACT, "vkuiPanelHeaderContext--sizeX-compact"), _defineProperty(_sizeXClassNames, SizeType.REGULAR, "vkuiPanelHeaderContext--sizeX-regular"), _sizeXClassNames);
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContext
 */
export var PanelHeaderContext = function PanelHeaderContext(_ref) {
  var children = _ref.children,
    onClose = _ref.onClose,
    _ref$opened = _ref.opened,
    opened = _ref$opened === void 0 ? false : _ref$opened,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useDOM = useDOM(),
    document = _useDOM.document;
  var platform = usePlatform();
  var _React$useState = React.useState(opened),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visible = _React$useState2[0],
    setVisible = _React$useState2[1];
  var closing = visible && !opened;
  var _useAdaptivity = useAdaptivity(),
    _useAdaptivity$sizeX = _useAdaptivity.sizeX,
    sizeX = _useAdaptivity$sizeX === void 0 ? 'none' : _useAdaptivity$sizeX;
  var elementRef = React.useRef(null);
  useIsomorphicLayoutEffect(function () {
    opened && setVisible(true);
  }, [opened]);
  useScrollLock(platform !== Platform.VKCOM && opened);

  // start closing on outer click
  useGlobalEventListener(document, 'click', opened && !closing && function (event) {
    if (elementRef.current && !elementRef.current.contains(event.target)) {
      event.stopPropagation();
      onClose();
    }
  }, {
    capture: true
  });

  // fallback onAnimationEnd when animationend not supported
  var onAnimationEnd = function onAnimationEnd() {
    return setVisible(false);
  };
  var animationFallback = useTimeout(onAnimationEnd, 200);
  React.useEffect(function () {
    return closing ? animationFallback.set() : animationFallback.clear();
  }, [animationFallback, closing]);
  return /*#__PURE__*/React.createElement(FixedLayout, _extends({}, restProps, {
    className: classNames("vkuiPanelHeaderContext", platform === Platform.IOS && "vkuiPanelHeaderContext--ios", opened && "vkuiPanelHeaderContext--opened", closing && "vkuiPanelHeaderContext--closing", sizeXClassNames[sizeX], "vkuiPanelHeaderContext--rounded", className),
    vertical: "top"
  }), visible && /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(event) {
      event.stopPropagation();
      onClose();
    },
    className: "vkuiPanelHeaderContext__fade"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContext__in",
    ref: elementRef,
    onAnimationEnd: closing ? onAnimationEnd : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiPanelHeaderContext__content"
  }, visible && children)));
};
//# sourceMappingURL=PanelHeaderContext.js.map