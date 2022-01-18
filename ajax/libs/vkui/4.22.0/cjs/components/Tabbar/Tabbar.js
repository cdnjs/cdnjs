"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["children", "shadow", "itemsLayout"];

var Tabbar = function Tabbar(props) {
  var children = props.children,
      shadow = props.shadow,
      itemsLayout = props.itemsLayout,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var getItemsLayout = function getItemsLayout() {
    switch (itemsLayout) {
      case 'horizontal':
      case 'vertical':
        return itemsLayout;

      default:
        return React.Children.count(children) > 2 ? 'vertical' : 'horizontal';
    }
  };

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Tabbar', platform), "Tabbar--l-".concat(getItemsLayout()), {
      'Tabbar--shadow': shadow
    })
  }, restProps), children);
};

Tabbar.defaultProps = {
  shadow: true
};
var _default = Tabbar;
exports.default = _default;
//# sourceMappingURL=Tabbar.js.map