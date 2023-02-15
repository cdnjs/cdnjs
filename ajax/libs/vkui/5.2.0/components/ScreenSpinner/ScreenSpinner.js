import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["style", "className", "state", "size", "aria-label", "onClick"];
import * as React from 'react';
import { Spinner } from '../Spinner/Spinner';
import { Icon24Cancel } from '@vkontakte/icons';
import { Icon48DoneOutline } from './Icon48DoneOutline';
import { Icon48CancelCircle } from './Icon48CancelCircle';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { classNames } from '@vkontakte/vkjs';
/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */
export var ScreenSpinner = function ScreenSpinner(_ref) {
  var style = _ref.style,
    className = _ref.className,
    _ref$state = _ref.state,
    state = _ref$state === void 0 ? 'loading' : _ref$state,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'large' : _ref$size,
    _ref$ariaLabel = _ref['aria-label'],
    ariaLabel = _ref$ariaLabel === void 0 ? 'Пожалуйста, подождите...' : _ref$ariaLabel,
    onClick = _ref.onClick,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var hideSpinner = state === 'done' || state === 'error';
  var Icon = {
    loading: function loading() {
      return null;
    },
    cancelable: Icon24Cancel,
    done: Icon48DoneOutline,
    error: Icon48CancelCircle
  }[state];
  useScrollLock();
  return /*#__PURE__*/React.createElement(PopoutWrapper, {
    hasMask: false,
    className: classNames("vkuiScreenSpinner", hideSpinner && "vkuiScreenSpinner--hideSpinner", styles["ScreenSpinner--state-".concat(state)], className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiScreenSpinner__container",
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Spinner, _extends({
    className: "vkuiScreenSpinner__spinner",
    size: size,
    "aria-label": ariaLabel
  }, restProps)), /*#__PURE__*/React.createElement("div", {
    className: "vkuiScreenSpinner__icon"
  }, /*#__PURE__*/React.createElement(Icon, null))));
};
var styles = {
  "ScreenSpinner--state-cancelable": "vkuiScreenSpinner--state-cancelable",
  "ScreenSpinner--state-done": "vkuiScreenSpinner--state-done",
  "ScreenSpinner--state-loading": "vkuiScreenSpinner--state-loading",
  "ScreenSpinner--state-error": "vkuiScreenSpinner--state-error"
};
//# sourceMappingURL=ScreenSpinner.js.map