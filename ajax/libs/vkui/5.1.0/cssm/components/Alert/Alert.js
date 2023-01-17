import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
var _excluded = ["action", "onItemClick"],
  _excluded2 = ["Component", "title", "action", "autoClose", "mode"],
  _excluded3 = ["actions", "actionsLayout", "children", "className", "style", "text", "header", "onClose", "dismissLabel"];
import * as React from 'react';
import { Tappable } from '../Tappable/Tappable';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { Button } from '../Button/Button';
import { stopPropagation } from '../../lib/utils';
import { Title } from '../Typography/Title/Title';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Text } from '../Typography/Text/Text';
import { ModalDismissButton } from '../ModalDismissButton/ModalDismissButton';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { useWaitTransitionFinish } from '../../hooks/useWaitTransitionFinish';
import { usePlatform } from '../../hooks/usePlatform';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import "./Alert.module.css";
var AlertHeader = function AlertHeader(props) {
  var platform = usePlatform();
  switch (platform) {
    case Platform.IOS:
      return /*#__PURE__*/React.createElement(Title, _extends({
        className: "vkuiAlert__header",
        weight: "1",
        level: "3"
      }, props));
    default:
      return /*#__PURE__*/React.createElement(Title, _extends({
        className: "vkuiAlert__header",
        weight: "2",
        level: "2"
      }, props));
  }
};
var AlertText = function AlertText(props) {
  var platform = usePlatform();
  switch (platform) {
    case Platform.VKCOM:
      return /*#__PURE__*/React.createElement(Footnote, _extends({
        className: "vkuiAlert__text"
      }, props));
    case Platform.IOS:
      return /*#__PURE__*/React.createElement(Caption, _extends({
        className: "vkuiAlert__text"
      }, props));
    default:
      return /*#__PURE__*/React.createElement(Text, _extends({
        Component: "span",
        className: "vkuiAlert__text",
        weight: "3"
      }, props));
  }
};
var AlertAction = function AlertAction(_ref) {
  var action = _ref.action,
    onItemClick = _ref.onItemClick,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var handleItemClick = React.useCallback(function () {
    return onItemClick(action);
  }, [onItemClick, action]);
  if (platform === Platform.IOS) {
    var _action$Component = action.Component,
      Component = _action$Component === void 0 ? 'button' : _action$Component,
      title = action.title,
      actionProp = action.action,
      autoClose = action.autoClose,
      _mode = action.mode,
      restActionProps = _objectWithoutProperties(action, _excluded2);
    return /*#__PURE__*/React.createElement(Tappable, _extends({
      Component: restActionProps.href ? 'a' : Component,
      className: classNames("vkuiAlert__action", styles["Alert__action--mode-".concat(_mode)]),
      onClick: handleItemClick
    }, restActionProps, restProps), title);
  }
  var mode = 'tertiary';
  if (platform === Platform.VKCOM) {
    mode = action.mode === 'cancel' ? 'secondary' : 'primary';
  }
  return /*#__PURE__*/React.createElement(Button, {
    className: classNames("vkuiAlert__button", styles["Alert__button--mode-".concat(action.mode)]),
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
    actionsLayout = _ref2$actionsLayout === void 0 ? 'horizontal' : _ref2$actionsLayout,
    children = _ref2.children,
    className = _ref2.className,
    style = _ref2.style,
    text = _ref2.text,
    header = _ref2.header,
    onClose = _ref2.onClose,
    _ref2$dismissLabel = _ref2.dismissLabel,
    dismissLabel = _ref2$dismissLabel === void 0 ? 'Закрыть предупреждение' : _ref2$dismissLabel,
    restProps = _objectWithoutProperties(_ref2, _excluded3);
  var platform = usePlatform();
  var _useAdaptivityWithJSM = useAdaptivityWithJSMediaQueries(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  var _useWaitTransitionFin = useWaitTransitionFinish(),
    waitTransitionFinish = _useWaitTransitionFin.waitTransitionFinish;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    closing = _React$useState2[0],
    setClosing = _React$useState2[1];
  var elementRef = React.useRef(null);
  var resolvedActionsLayout = platform === Platform.VKCOM ? 'horizontal' : actionsLayout;
  var timeout = platform === Platform.IOS ? 300 : 200;
  var close = React.useCallback(function () {
    setClosing(true);
    waitTransitionFinish(elementRef.current, function (e) {
      if (!e || e.propertyName === 'opacity') {
        onClose();
      }
    }, timeout);
  }, [elementRef, waitTransitionFinish, onClose, timeout]);
  var onItemClick = React.useCallback(function (item) {
    var action = item.action,
      autoClose = item.autoClose;
    if (autoClose) {
      setClosing(true);
      waitTransitionFinish(elementRef.current, function (e) {
        if (!e || e.propertyName === 'opacity') {
          onClose();
          action && action();
        }
      }, timeout);
    } else {
      action && action();
    }
  }, [elementRef, waitTransitionFinish, onClose, timeout]);
  useScrollLock();
  return /*#__PURE__*/React.createElement(PopoutWrapper, {
    className: className,
    closing: closing,
    style: style,
    onClick: close
  }, /*#__PURE__*/React.createElement(FocusTrap, _extends({}, restProps, {
    getRootRef: elementRef,
    onClick: stopPropagation,
    onClose: close,
    timeout: timeout,
    className: classNames("vkuiAlert", platform === Platform.IOS && "vkuiAlert--ios", platform === Platform.VKCOM && "vkuiAlert--vkcom", resolvedActionsLayout === 'vertical' ? "vkuiAlert--v" : "vkuiAlert--h", closing && "vkuiAlert--closing", isDesktop && "vkuiAlert--desktop"),
    role: "alertdialog",
    "aria-modal": true,
    "aria-labelledby": "vkui--alert--title",
    "aria-describedby": "vkui--alert--desc"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiAlert__content"
  }, hasReactNode(header) && /*#__PURE__*/React.createElement(AlertHeader, {
    id: "vkui--alert--title"
  }, header), hasReactNode(text) && /*#__PURE__*/React.createElement(AlertText, {
    id: "vkui--alert--desc"
  }, text), children), /*#__PURE__*/React.createElement("div", {
    className: "vkuiAlert__actions"
  }, actions.map(function (action, i) {
    return /*#__PURE__*/React.createElement(AlertAction, {
      key: i,
      action: action,
      onItemClick: onItemClick
    });
  })), isDesktop && /*#__PURE__*/React.createElement(ModalDismissButton, {
    onClick: close,
    "aria-label": dismissLabel
  })));
};
var styles = {
  "Alert__action--mode-cancel": "vkuiAlert__action--mode-cancel",
  "Alert__action--mode-destructive": "vkuiAlert__action--mode-destructive",
  "Alert__action--mode-default": "vkuiAlert__action--mode-default",
  "Alert__button--mode-cancel": "vkuiAlert__button--mode-cancel",
  "Alert__button--mode-default": "vkuiAlert__button--mode-default",
  "Alert__button--mode-destructive": "vkuiAlert__button--mode-destructive"
};
//# sourceMappingURL=Alert.js.map