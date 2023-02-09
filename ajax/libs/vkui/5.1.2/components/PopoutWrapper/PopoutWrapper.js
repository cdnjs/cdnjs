import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["alignY", "alignX", "closing", "hasMask", "fixed", "children", "onClick", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { useTimeout } from '../../hooks/useTimeout';
import { usePlatform } from '../../hooks/usePlatform';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { useDOM } from '../../lib/dom';
/**
 * @see https://vkcom.github.io/VKUI/#/PopoutWrapper
 */
export var PopoutWrapper = function PopoutWrapper(_ref) {
  var _ref$alignY = _ref.alignY,
    alignY = _ref$alignY === void 0 ? 'center' : _ref$alignY,
    _ref$alignX = _ref.alignX,
    alignX = _ref$alignX === void 0 ? 'center' : _ref$alignX,
    _ref$closing = _ref.closing,
    closing = _ref$closing === void 0 ? false : _ref$closing,
    _ref$hasMask = _ref.hasMask,
    hasMask = _ref$hasMask === void 0 ? true : _ref$hasMask,
    _ref$fixed = _ref.fixed,
    fixed = _ref$fixed === void 0 ? true : _ref$fixed,
    children = _ref.children,
    onClick = _ref.onClick,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _React$useState = React.useState(!hasMask),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    opened = _React$useState2[0],
    setOpened = _React$useState2[1];
  var elRef = React.useRef(null);
  var onFadeInEnd = function onFadeInEnd(e) {
    if (!e || e.animationName === 'vkui-animation-full-fade-in') {
      setOpened(true);
    }
  };
  var animationFinishFallback = useTimeout(onFadeInEnd, platform === Platform.IOS ? 300 : 200);
  React.useEffect(function () {
    !opened && animationFinishFallback.set();
  }, [animationFinishFallback, opened]);
  var _useDOM = useDOM(),
    window = _useDOM.window;
  useGlobalEventListener(window, 'touchmove', function (e) {
    return e.preventDefault();
  }, {
    passive: false
  });
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiPopoutWrapper", styles["PopoutWrapper--alignY-".concat(alignY)], styles["PopoutWrapper--alignX-".concat(alignX)], closing && "vkuiPopoutWrapper--closing", opened && "vkuiPopoutWrapper--opened", fixed && "vkuiPopoutWrapper--fixed", hasMask && "vkuiPopoutWrapper--masked", className),
    onAnimationEnd: opened ? undefined : onFadeInEnd,
    ref: elRef
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopoutWrapper__container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopoutWrapper__overlay",
    onClick: onClick
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopoutWrapper__content"
  }, children)));
};
var styles = {
  "PopoutWrapper--alignY-center": "vkuiPopoutWrapper--alignY-center",
  "PopoutWrapper--alignY-bottom": "vkuiPopoutWrapper--alignY-bottom",
  "PopoutWrapper--alignY-top": "vkuiPopoutWrapper--alignY-top",
  "PopoutWrapper--alignX-center": "vkuiPopoutWrapper--alignX-center",
  "PopoutWrapper--alignX-left": "vkuiPopoutWrapper--alignX-left",
  "PopoutWrapper--alignX-right": "vkuiPopoutWrapper--alignX-right"
};
//# sourceMappingURL=PopoutWrapper.js.map