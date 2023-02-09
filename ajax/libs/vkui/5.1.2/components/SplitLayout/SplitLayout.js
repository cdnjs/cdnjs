import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["popout", "modal", "header", "children", "getRootRef", "getRef", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { PopoutRoot } from '../PopoutRoot/PopoutRoot';
import { usePlatform } from '../../hooks/usePlatform';
/**
 * @see https://vkcom.github.io/VKUI/#/SplitLayout
 */
export var SplitLayout = function SplitLayout(_ref) {
  var popout = _ref.popout,
    modal = _ref.modal,
    header = _ref.header,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  return /*#__PURE__*/React.createElement(PopoutRoot, {
    className: classNames("vkuiSplitLayout", platform === Platform.IOS && "vkuiSplitLayout--ios"),
    popout: popout,
    modal: modal,
    getRootRef: getRootRef
  }, header, /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    ref: getRef,
    className: classNames("vkuiSplitLayout__inner", !!header && "vkuiSplitLayout__inner--header", className)
  }), children));
};
//# sourceMappingURL=SplitLayout.js.map