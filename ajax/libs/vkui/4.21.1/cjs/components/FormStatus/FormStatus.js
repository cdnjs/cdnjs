"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormStatus = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _utils = require("../../lib/utils");

var _excluded = ["mode", "header", "children", "dangerouslySetInnerHTML"];

var FormStatus = function FormStatus(_ref) {
  var mode = _ref.mode,
      header = _ref.header,
      children = _ref.children,
      dangerouslySetInnerHTML = _ref.dangerouslySetInnerHTML,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('FormStatus', platform), "FormStatus--".concat(mode))
  }), (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Headline.default, {
    weight: "medium",
    vkuiClass: "FormStatus__header"
  }, header), dangerouslySetInnerHTML && (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    level: "1",
    weight: "regular",
    dangerouslySetInnerHTML: dangerouslySetInnerHTML
  }), (0, _utils.hasReactNode)(children) && !dangerouslySetInnerHTML && (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    level: "1",
    weight: "regular"
  }, children));
};

exports.FormStatus = FormStatus;
//# sourceMappingURL=FormStatus.js.map