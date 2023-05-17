import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
var _excluded = ["action", "onItemClick"],
  _excluded2 = ["actions", "actionsLayout", "children", "className", "style", "text", "header", "onClose", "dismissLabel"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Tappable } from "../Tappable/Tappable";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper";
import { classNames } from "../../lib/classNames";
import { VKCOM, IOS } from "../../lib/platform";
import { ViewWidth } from "../../hoc/withAdaptivity";
import { Button } from "../Button/Button";
import { hasReactNode, stopPropagation } from "../../lib/utils";
import { Title } from "../Typography/Title/Title";
import { Caption } from "../Typography/Caption/Caption";
import { Text } from "../Typography/Text/Text";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import { useScrollLock } from "../AppRoot/ScrollContext";
import { useWaitTransitionFinish } from "../../hooks/useWaitTransitionFinish";
import { usePlatform } from "../../hooks/usePlatform";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import "./Alert.css";
var AlertHeader = function AlertHeader(props) {
  var platform = usePlatform();
  switch (platform) {
    case IOS:
      return createScopedElement(Title, _extends({
        vkuiClass: "Alert__header",
        weight: "1",
        level: "3"
      }, props));
    default:
      return createScopedElement(Title, _extends({
        vkuiClass: "Alert__header",
        weight: "2",
        level: "2"
      }, props));
  }
};
var AlertText = function AlertText(props) {
  var platform = usePlatform();
  switch (platform) {
    case VKCOM:
      return createScopedElement(Caption, _extends({
        vkuiClass: "Alert__text"
      }, props));
    case IOS:
      return createScopedElement(Caption, _extends({
        vkuiClass: "Alert__text",
        level: "2"
      }, props));
    default:
      return createScopedElement(Text, _extends({
        Component: "span",
        vkuiClass: "Alert__text",
        weight: "3"
      }, props));
  }
};
var AlertAction = function AlertAction(_ref) {
  var action = _ref.action,
    onItemClick = _ref.onItemClick,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    viewWidth = _useAdaptivity.viewWidth;
  var handleItemClick = React.useCallback(function () {
    return onItemClick(action);
  }, [onItemClick, action]);
  if (platform === IOS) {
    var _action$Component = action.Component,
      Component = _action$Component === void 0 ? "button" : _action$Component;
    return createScopedElement(Tappable, _extends({
      Component: action.href ? "a" : Component,
      vkuiClass: classNames("Alert__action", "Alert__action--".concat(action.mode)),
      onClick: handleItemClick,
      href: action.href,
      target: action.target
    }, restProps), action.title);
  }
  var mode = "tertiary";

  // TODO v5.0.0 поправить под новую адаптивность
  if (viewWidth === ViewWidth.DESKTOP && action.mode === "destructive") {
    mode = "destructive";
  }
  if (platform === VKCOM) {
    mode = action.mode === "cancel" ? "secondary" : "primary";
  }
  return createScopedElement(Button, {
    vkuiClass: classNames("Alert__button", "Alert__button--".concat(action.mode)),
    mode: mode,
    size: "m",
    onClick: handleItemClick,
    Component: action.Component,
    href: action.href,
    target: action.target
  }, action.title);
};

/**
 * @see https://vkcom.github.io/VKUI/#/Alert
 */
export var Alert = function Alert(_ref2) {
  var _ref2$actions = _ref2.actions,
    actions = _ref2$actions === void 0 ? [] : _ref2$actions,
    _ref2$actionsLayout = _ref2.actionsLayout,
    actionsLayout = _ref2$actionsLayout === void 0 ? "horizontal" : _ref2$actionsLayout,
    children = _ref2.children,
    className = _ref2.className,
    style = _ref2.style,
    text = _ref2.text,
    header = _ref2.header,
    onClose = _ref2.onClose,
    _ref2$dismissLabel = _ref2.dismissLabel,
    dismissLabel = _ref2$dismissLabel === void 0 ? "Закрыть предупреждение" : _ref2$dismissLabel,
    restProps = _objectWithoutProperties(_ref2, _excluded2);
  var platform = usePlatform();
  var _useAdaptivity2 = useAdaptivity(),
    viewWidth = _useAdaptivity2.viewWidth;
  var _useWaitTransitionFin = useWaitTransitionFinish(),
    waitTransitionFinish = _useWaitTransitionFin.waitTransitionFinish;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    closing = _React$useState2[0],
    setClosing = _React$useState2[1];
  var elementRef = React.useRef(null);
  var resolvedActionsLayout = platform === VKCOM ? "horizontal" : actionsLayout;
  var canShowCloseButton = platform !== IOS && viewWidth >= ViewWidth.SMALL_TABLET;
  var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET; // TODO v5.0.0 поправить под новую адаптивность

  var timeout = platform === IOS ? 300 : 200;
  var close = React.useCallback(function () {
    setClosing(true);
    waitTransitionFinish(elementRef.current, function (e) {
      if (!e || e.propertyName === "opacity") {
        onClose && onClose();
      }
    }, timeout);
  }, [elementRef, waitTransitionFinish, onClose, timeout]);
  var onItemClick = React.useCallback(function (item) {
    var action = item.action,
      autoclose = item.autoclose;
    if (autoclose) {
      setClosing(true);
      waitTransitionFinish(elementRef.current, function (e) {
        if (!e || e.propertyName === "opacity") {
          onClose && onClose();
          action && action();
        }
      }, timeout);
    } else {
      action && action();
    }
  }, [elementRef, waitTransitionFinish, onClose, timeout]);
  useScrollLock();
  return createScopedElement(PopoutWrapper, {
    className: className,
    closing: closing,
    style: style,
    onClick: close
  }, createScopedElement(FocusTrap, _extends({}, restProps, {
    getRootRef: elementRef,
    onClick: stopPropagation,
    onClose: close,
    timeout: timeout,
    vkuiClass: classNames("Alert", platform === IOS && "Alert--ios", platform === VKCOM && "Alert--vkcom", resolvedActionsLayout === "vertical" ? "Alert--v" : "Alert--h", closing && "Alert--closing", isDesktop && "Alert--desktop"),
    role: "alertdialog",
    "aria-modal": true,
    "aria-labelledby": "vkui--alert--title",
    "aria-describedby": "vkui--alert--desc"
  }), createScopedElement("div", {
    vkuiClass: "Alert__content"
  }, hasReactNode(header) && createScopedElement(AlertHeader, {
    id: "vkui--alert--title"
  }, header), hasReactNode(text) && createScopedElement(AlertText, {
    id: "vkui--alert--desc"
  }, text), children), createScopedElement("div", {
    vkuiClass: "Alert__actions"
  }, actions.map(function (action, i) {
    return createScopedElement(AlertAction, {
      key: i,
      action: action,
      onItemClick: onItemClick
    });
  })), canShowCloseButton && createScopedElement(ModalDismissButton, {
    onClick: close,
    "aria-label": dismissLabel
  })));
};
//# sourceMappingURL=Alert.js.map