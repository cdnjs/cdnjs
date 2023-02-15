import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "closing", "toggleRef", "className"];
import * as React from 'react';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import { classNames } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { usePlatform } from '../../hooks/usePlatform';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import "./ActionSheet.module.css";
var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};
export var ActionSheetDropdown = function ActionSheetDropdown(_ref) {
  var children = _ref.children,
    closing = _ref.closing,
    toggleRef = _ref.toggleRef,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivityWithJSM = useAdaptivityWithJSMediaQueries(),
    sizeY = _useAdaptivityWithJSM.sizeY;
  var platform = usePlatform();
  return /*#__PURE__*/React.createElement(FocusTrap, _extends({}, restProps, {
    onClick: stopPropagation,
    className: classNames("vkuiActionSheet", platform === Platform.IOS && "vkuiActionSheet--ios", closing && "vkuiActionSheet--closing", getSizeYClassName("vkuiActionSheet", sizeY), className)
  }), children);
};
//# sourceMappingURL=ActionSheetDropdown.js.map