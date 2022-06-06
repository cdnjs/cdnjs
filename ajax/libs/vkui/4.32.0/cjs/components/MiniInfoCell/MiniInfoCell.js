"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniInfoCell = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames2 = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _Text = require("../Typography/Text/Text");

var _Tappable = _interopRequireDefault(require("../../components/Tappable/Tappable"));

var _utils = require("../../lib/utils");

var _excluded = ["before", "after", "mode", "textWrap", "textLevel", "children"];

/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */
var MiniInfoCell = function MiniInfoCell(props) {
  var _classNames;

  var platform = (0, _usePlatform.usePlatform)();
  var before = props.before,
      after = props.after,
      mode = props.mode,
      textWrap = props.textWrap,
      textLevel = props.textLevel,
      children = props.children,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var isClickable = !!restProps.onClick;
  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({
    Component: "div",
    disabled: !isClickable,
    role: isClickable ? "button" : undefined
  }, restProps, {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: (0, _classNames2.classNames)((0, _getClassName.getClassName)("MiniInfoCell", platform), (_classNames = {}, (0, _defineProperty2.default)(_classNames, "MiniInfoCell--md-".concat(mode), mode !== "base"), (0, _defineProperty2.default)(_classNames, "MiniInfoCell--wr-".concat(textWrap), textWrap !== "nowrap"), _classNames), "MiniInfoCell--lvl-".concat(textLevel))
  }), (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "MiniInfoCell__icon"
  }, before), (0, _jsxRuntime.createScopedElement)(_Text.Text, {
    vkuiClass: "MiniInfoCell__content",
    weight: mode === "more" ? "2" : undefined
  }, children), (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "MiniInfoCell__after"
  }, after));
};

exports.MiniInfoCell = MiniInfoCell;
MiniInfoCell.defaultProps = {
  mode: "base",
  textWrap: "nowrap",
  textLevel: "secondary"
};
//# sourceMappingURL=MiniInfoCell.js.map