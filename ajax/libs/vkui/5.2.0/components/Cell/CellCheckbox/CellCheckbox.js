import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "style"];
import * as React from 'react';
import { Icon24CheckBoxOff, Icon24CheckBoxOn, Icon24CheckCircleOff, Icon24CheckCircleOn } from '@vkontakte/icons';
import { getPlatformClassName } from '../../../helpers/getPlatformClassName';
import { usePlatform } from '../../../hooks/usePlatform';
import { classNames } from '@vkontakte/vkjs';
import { Platform } from '../../../lib/platform';
import { VisuallyHiddenInput } from '../../VisuallyHiddenInput/VisuallyHiddenInput';
export var CellCheckbox = function CellCheckbox(_ref) {
  var className = _ref.className,
    style = _ref.style,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var IconOff = platform === Platform.IOS || platform === Platform.VKCOM ? Icon24CheckCircleOff : Icon24CheckBoxOff;
  var IconOn = platform === Platform.IOS || platform === Platform.VKCOM ? Icon24CheckCircleOn : Icon24CheckBoxOn;
  return /*#__PURE__*/React.createElement("span", {
    className: classNames("vkuiCellCheckbox", getPlatformClassName("vkuiCellCheckbox", platform), className),
    style: style
  }, /*#__PURE__*/React.createElement(VisuallyHiddenInput, _extends({
    className: "vkuiCellCheckbox__input",
    type: "checkbox"
  }, restProps)), /*#__PURE__*/React.createElement("span", {
    className: classNames("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--off"),
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement(IconOff, null)), /*#__PURE__*/React.createElement("span", {
    className: classNames("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--on"),
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement(IconOn, null)));
};
//# sourceMappingURL=CellCheckbox.js.map