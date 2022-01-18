import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["alignY", "alignX", "closing", "hasMask", "fixed", "children", "onClick"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { IOS } from "../../lib/platform";
import { useTimeout } from "../../hooks/useTimeout";
import { usePlatform } from "../../hooks/usePlatform";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { useDOM } from "../../lib/dom";
import "./PopoutWrapper.css";
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
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _React$useState = React.useState(!hasMask),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      opened = _React$useState2[0],
      setOpened = _React$useState2[1];

  var elRef = React.useRef();

  var onFadeInEnd = function onFadeInEnd(e) {
    if (!e || e.animationName === 'vkui-animation-full-fade-in') {
      setOpened(true);
    }
  };

  var animationFinishFallback = useTimeout(onFadeInEnd, platform === IOS ? 300 : 200);
  React.useEffect(function () {
    !opened && animationFinishFallback.set();
  }, []);

  var _useDOM = useDOM(),
      window = _useDOM.window;

  useGlobalEventListener(window, 'touchmove', function (e) {
    return e.preventDefault();
  }, {
    passive: false
  });
  var baseClassNames = getClassName('PopoutWrapper', platform);
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(baseClassNames, "PopoutWrapper--v-".concat(alignY), "PopoutWrapper--h-".concat(alignX), {
      'PopoutWrapper--closing': closing,
      'PopoutWrapper--opened': opened,
      'PopoutWrapper--fixed': fixed,
      'PopoutWrapper--masked': hasMask
    }),
    onAnimationEnd: opened ? null : onFadeInEnd,
    ref: elRef
  }), createScopedElement("div", {
    vkuiClass: "PopoutWrapper__container"
  }, createScopedElement("div", {
    vkuiClass: "PopoutWrapper__overlay",
    onClick: onClick
  }), createScopedElement("div", {
    vkuiClass: "PopoutWrapper__content"
  }, children)));
};
//# sourceMappingURL=PopoutWrapper.js.map