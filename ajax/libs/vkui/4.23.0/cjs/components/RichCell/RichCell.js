"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _utils = require("../../lib/utils");

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _excluded = ["children", "text", "caption", "before", "after", "bottom", "actions", "multiline", "sizeY"];

var RichCell = function RichCell(_ref) {
  var children = _ref.children,
      text = _ref.text,
      caption = _ref.caption,
      before = _ref.before,
      after = _ref.after,
      bottom = _ref.bottom,
      actions = _ref.actions,
      multiline = _ref.multiline,
      sizeY = _ref.sizeY,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('RichCell', platform), {
      'RichCell--mult': multiline
    }, "RichCell--sizeY-".concat(sizeY))
  }), before, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__in"
  }, after, (0, _jsxRuntime.createScopedElement)(_Text.default, {
    weight: "medium",
    vkuiClass: "RichCell__content"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__children"
  }, children), (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__after"
  }, after)), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(_Text.default, {
    weight: "regular",
    vkuiClass: "RichCell__text"
  }, text), (0, _utils.hasReactNode)(caption) && (0, _jsxRuntime.createScopedElement)(_Subhead.default, {
    Component: "span",
    weight: "regular",
    vkuiClass: "RichCell__caption"
  }, caption), ((0, _utils.hasReactNode)(bottom) || (0, _utils.hasReactNode)(actions)) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__bottom"
  }, bottom, (0, _utils.hasReactNode)(actions) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "RichCell__actions"
  }, actions))));
};

var _default = (0, _withAdaptivity.withAdaptivity)(RichCell, {
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=RichCell.js.map