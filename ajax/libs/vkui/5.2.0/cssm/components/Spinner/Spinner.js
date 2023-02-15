import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "aria-label", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Icon24Spinner, Icon32Spinner, Icon44Spinner, Icon16Spinner } from '@vkontakte/icons';
import "./Spinner.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */
export var Spinner = /*#__PURE__*/React.memo(function (_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'regular' : _ref$size,
    _ref$ariaLabel = _ref['aria-label'],
    ariaLabel = _ref$ariaLabel === void 0 ? 'Загружается...' : _ref$ariaLabel,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var SpinnerIcon = {
    small: Icon16Spinner,
    regular: Icon24Spinner,
    medium: Icon32Spinner,
    large: Icon44Spinner
  }[size];
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "status",
    "aria-label": ariaLabel
  }, restProps, {
    className: classNames("vkuiSpinner", className)
  }), /*#__PURE__*/React.createElement(SpinnerIcon, {
    className: "vkuiSpinner__self"
  }));
});
Spinner.displayName = 'Spinner';
//# sourceMappingURL=Spinner.js.map