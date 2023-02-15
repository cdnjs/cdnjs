"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigProviderOverride = ConfigProviderOverride;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _ConfigProviderContext = require("./ConfigProviderContext");
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _excluded = ["children"];
/**
 * Компонент предназначен для перебивания одного из значений контекста
 */
function ConfigProviderOverride(_ref) {
  var children = _ref.children,
    contextValue = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var parentConfig = (0, _ConfigProviderContext.useConfigProvider)();
  var configContext = (0, _useObjectMemo.useObjectMemo)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, parentConfig), contextValue));
  return /*#__PURE__*/_react.default.createElement(_ConfigProviderContext.ConfigProviderContext.Provider, {
    value: configContext
  }, children);
}
//# sourceMappingURL=ConfigProviderOverride.js.map