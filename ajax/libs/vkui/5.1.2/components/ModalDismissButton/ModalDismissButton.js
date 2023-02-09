import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["aria-label", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Icon20Cancel } from '@vkontakte/icons';
import { Tappable } from '../Tappable/Tappable';
/**
 * @see https://vkcom.github.io/VKUI/#/ModalDismissButton
 */
export var ModalDismissButton = function ModalDismissButton(_ref) {
  var _ref$ariaLabel = _ref['aria-label'],
    ariaLabel = _ref$ariaLabel === void 0 ? 'Закрыть' : _ref$ariaLabel,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Tappable, _extends({
    className: classNames("vkuiModalDismissButton", className)
  }, restProps, {
    "aria-label": ariaLabel,
    activeMode: "vkuiModalDismissButton--active",
    hoverMode: "vkuiModalDismissButton--hover"
  }), /*#__PURE__*/React.createElement(Icon20Cancel, null));
};
//# sourceMappingURL=ModalDismissButton.js.map