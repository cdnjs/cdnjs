"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _useAdaptivity2 = require("../../../hooks/useAdaptivity");
var _vkjs = require("@vkontakte/vkjs");
var _warnOnce = require("../../../lib/warnOnce");
var _getSizeYClassName = require("../../../helpers/getSizeYClassName");
var _excluded = ["className", "children", "weight", "Component", "getRootRef"];
var warn = (0, _warnOnce.warnOnce)('Text');
/**
 * @see https://vkcom.github.io/VKUI/#/Text
 */
var Text = function Text(_ref) {
  var className = _ref.className,
    children = _ref.children,
    weight = _ref.weight,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'span' : _ref$Component,
    getRootRef = _ref.getRootRef,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  if (process.env.NODE_ENV === 'development' && typeof Component !== 'string' && getRootRef) {
    warn("\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E \"getRootRef\" \u043C\u043E\u0436\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0441 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430\u043C\u0438 DOM", 'error');
  }
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    className: (0, _vkjs.classNames)(className, "vkuiText", (0, _getSizeYClassName.getSizeYClassName)("vkuiText", sizeY), weight && styles["Text--weight-".concat(weight)])
  }), children);
};
exports.Text = Text;
var styles = {
  "Text--weight-1": "vkuiText--weight-1",
  "Text--weight-2": "vkuiText--weight-2",
  "Text--weight-3": "vkuiText--weight-3"
};
//# sourceMappingURL=Text.js.map