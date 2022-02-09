import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "onClose", "opened"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import FixedLayout from "../FixedLayout/FixedLayout";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { ViewWidth } from "../AdaptivityProvider/AdaptivityContext";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useDOM } from "../../lib/dom";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { useTimeout } from "../../hooks/useTimeout";
import { usePlatform } from "../../hooks/usePlatform";
import "./PanelHeaderContext.css";
export var PanelHeaderContext = function PanelHeaderContext(_ref) {
  var children = _ref.children,
      onClose = _ref.onClose,
      _ref$opened = _ref.opened,
      opened = _ref$opened === void 0 ? false : _ref$opened,
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
      viewWidth = _useAdaptivity.viewWidth;

  var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
  var elementRef = React.useRef(null);
  useIsomorphicLayoutEffect(function () {
    opened && setVisible(true);
  }, [opened]); // start closing on outer click

  useGlobalEventListener(document, "click", isDesktop && opened && !closing && function (event) {
    if (elementRef.current && !elementRef.current.contains(event.target)) {
      onClose();
    }
  }); // fallback onAnimationEnd when animationend not supported

  var onAnimationEnd = function onAnimationEnd() {
    return setVisible(false);
  };

  var animationFallback = useTimeout(onAnimationEnd, 200);
  React.useEffect(function () {
    return closing ? animationFallback.set() : animationFallback.clear();
  }, [animationFallback, closing]);
  return createScopedElement(FixedLayout, _extends({}, restProps, {
    vkuiClass: classNames(getClassName("PanelHeaderContext", platform), {
      "PanelHeaderContext--opened": opened,
      "PanelHeaderContext--closing": closing,
      "PanelHeaderContext--desktop": isDesktop
    }),
    vertical: "top"
  }), createScopedElement("div", {
    vkuiClass: "PanelHeaderContext__in",
    ref: elementRef,
    onAnimationEnd: closing ? onAnimationEnd : undefined
  }, createScopedElement("div", {
    vkuiClass: "PanelHeaderContext__content"
  }, visible && children)), !isDesktop && visible && createScopedElement("div", {
    onClick: onClose,
    vkuiClass: "PanelHeaderContext__fade"
  }));
};
//# sourceMappingURL=PanelHeaderContext.js.map