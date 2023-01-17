import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "shadow", "mode", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import "./Tabbar.module.css";
var getItemsLayoutClassName = function getItemsLayoutClassName(itemsLayout, children) {
  switch (itemsLayout) {
    case 'horizontal':
      return "vkuiTabbar--layout-horizontal";
    case 'vertical':
      return "vkuiTabbar--layout-vertical";
    default:
      return React.Children.count(children) > 2 ? getItemsLayoutClassName('vertical', []) : getItemsLayoutClassName('horizontal', []);
  }
};

/**
 * @see https://vkcom.github.io/VKUI/#/Tabbar
 */
export var Tabbar = function Tabbar(_ref) {
  var children = _ref.children,
    _ref$shadow = _ref.shadow,
    shadow = _ref$shadow === void 0 ? true : _ref$shadow,
    mode = _ref.mode,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames("vkuiTabbar", platform === Platform.IOS && "vkuiTabbar--ios", getItemsLayoutClassName(mode, children), shadow && "vkuiTabbar--shadow", className)
  }, restProps), /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabbar__in"
  }, children));
};
//# sourceMappingURL=Tabbar.js.map