"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabbar = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["children", "shadow", "itemsLayout"];

/**
 * @see https://vkcom.github.io/VKUI/#/Tabbar
 */
var Tabbar = function Tabbar(_ref) {
  var children = _ref.children,
      _ref$shadow = _ref.shadow,
      shadow = _ref$shadow === void 0 ? true : _ref$shadow,
      itemsLayout = _ref.itemsLayout,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var getItemsLayout = function getItemsLayout() {
    switch (itemsLayout) {
      case "horizontal":
      case "vertical":
        return itemsLayout;

      default:
        return React.Children.count(children) > 2 ? "vertical" : "horizontal";
    }
  };

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Tabbar", platform), "Tabbar--l-".concat(getItemsLayout()), {
      "Tabbar--shadow": shadow
    })
  }, restProps), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Tabbar__in"
  }, children));
};

exports.Tabbar = Tabbar;
//# sourceMappingURL=Tabbar.js.map