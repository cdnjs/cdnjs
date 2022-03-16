"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _icons = require("@vkontakte/icons");

var _platform = require("../../lib/platform");

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _Title = _interopRequireDefault(require("../Typography/Title/Title"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _excluded = ["badge", "before", "indicator", "children", "after", "description", "expandable", "multiline", "sizeY"];

var SimpleCellTypography = function SimpleCellTypography(props) {
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var platform = (0, _usePlatform.usePlatform)();

  if (sizeY === _withAdaptivity.SizeType.COMPACT) {
    return (0, _jsxRuntime.createScopedElement)(_Text.default, (0, _extends2.default)({
      Component: "span",
      weight: "regular"
    }, props));
  } else if (platform === _platform.ANDROID) {
    return (0, _jsxRuntime.createScopedElement)(_Headline.default, (0, _extends2.default)({
      Component: "span",
      weight: "regular"
    }, props));
  } else {
    return (0, _jsxRuntime.createScopedElement)(_Title.default, (0, _extends2.default)({
      Component: "span",
      level: "3",
      weight: "3"
    }, props));
  }
};

var SimpleCell = function SimpleCell(_ref) {
  var badge = _ref.badge,
      before = _ref.before,
      indicator = _ref.indicator,
      children = _ref.children,
      after = _ref.after,
      description = _ref.description,
      expandable = _ref.expandable,
      multiline = _ref.multiline,
      sizeY = _ref.sizeY,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var hasAfter = (0, _utils.hasReactNode)(after) || expandable && platform === _platform.IOS;

  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("SimpleCell", platform), {
      "SimpleCell--exp": expandable,
      "SimpleCell--mult": multiline
    }, "SimpleCell--sizeY-".concat(sizeY))
  }), before, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCell__main"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCell__content"
  }, (0, _jsxRuntime.createScopedElement)(SimpleCellTypography, {
    vkuiClass: "SimpleCell__children"
  }, children), (0, _utils.hasReactNode)(badge) && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "SimpleCell__badge"
  }, badge)), description && (0, _jsxRuntime.createScopedElement)(_Subhead.default, {
    Component: "span",
    vkuiClass: "SimpleCell__description"
  }, description)), (0, _utils.hasReactNode)(indicator) && (0, _jsxRuntime.createScopedElement)(SimpleCellTypography, {
    Component: "span",
    vkuiClass: "SimpleCell__indicator"
  }, indicator), hasAfter && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCell__after"
  }, after, expandable && platform === _platform.IOS && (0, _jsxRuntime.createScopedElement)(_icons.Icon24Chevron, null)));
}; // eslint-disable-next-line import/no-default-export


var _default = (0, _withAdaptivity.withAdaptivity)(SimpleCell, {
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=SimpleCell.js.map