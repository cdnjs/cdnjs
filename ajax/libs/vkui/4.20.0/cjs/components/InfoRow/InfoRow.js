"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _utils = require("../../lib/utils");

var _excluded = ["header", "children"];

var InfoRow = function InfoRow(_ref) {
  var header = _ref.header,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_Headline.default, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _getClassName.getClassName)('InfoRow', platform),
    weight: "regular"
  }), (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Subhead.default, {
    Component: "span",
    vkuiClass: "InfoRow__header",
    weight: "regular"
  }, header), children);
};

var _default = InfoRow;
exports.default = _default;
//# sourceMappingURL=InfoRow.js.map