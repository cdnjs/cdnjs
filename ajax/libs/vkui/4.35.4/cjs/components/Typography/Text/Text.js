"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _useAdaptivity2 = require("../../../hooks/useAdaptivity");

var _classNames = require("../../../lib/classNames");

var _warnOnce = require("../../../lib/warnOnce");

var _excluded = ["children", "weight", "Component", "getRootRef"];
var warn = (0, _warnOnce.warnOnce)("Text");
/**
 * @see https://vkcom.github.io/VKUI/#/Text
 */

var Text = function Text(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "span" : _ref$Component,
      getRootRef = _ref.getRootRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  if (process.env.NODE_ENV === "development" && typeof Component !== "string" && getRootRef) {
    warn("\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E \"getRootRef\" \u043C\u043E\u0436\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0441 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430\u043C\u0438 DOM", "error");
  }

  if (process.env.NODE_ENV === "development" && weight && ["semibold", "medium", "regular"].includes(weight)) {
    warn("\u041D\u0430\u0447\u0435\u0440\u0442\u0430\u043D\u0438\u0435 weight=\"".concat(weight, "\" \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u043E \u0438 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u0432 5.0.0. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \"1\", \"2\" \u0438 \"3\""));
  }

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)("Text", // TODO v5.0.0 перевести на новую адаптивность
    "Text--sizeY-".concat(sizeY), weight && "Text--w-".concat(weight))
  }), children);
};

exports.Text = Text;
//# sourceMappingURL=Text.js.map