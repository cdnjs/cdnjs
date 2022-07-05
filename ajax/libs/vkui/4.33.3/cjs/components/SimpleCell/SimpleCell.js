"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleCell = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _Tappable = require("../Tappable/Tappable");

var _icons = require("@vkontakte/icons");

var _platform = require("../../lib/platform");

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _Title = require("../Typography/Title/Title");

var _Text = require("../Typography/Text/Text");

var _Subhead = require("../Typography/Subhead/Subhead");

var _Headline = require("../Typography/Headline/Headline");

var _excluded = ["badge", "before", "indicator", "children", "after", "description", "expandable", "multiline", "sizeY"];

var SimpleCellTypography = function SimpleCellTypography(props) {
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var platform = (0, _usePlatform.usePlatform)();

  if (sizeY === _withAdaptivity.SizeType.COMPACT) {
    return (0, _jsxRuntime.createScopedElement)(_Text.Text, props);
  } else if (platform === _platform.ANDROID) {
    return (0, _jsxRuntime.createScopedElement)(_Headline.Headline, (0, _extends2.default)({
      Component: "span",
      weight: "3"
    }, props));
  } else {
    return (0, _jsxRuntime.createScopedElement)(_Title.Title, (0, _extends2.default)({
      Component: "span",
      level: "3",
      weight: "3"
    }, props));
  }
};

var SimpleCellComponent = function SimpleCellComponent(_ref) {
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

  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
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
  }, badge)), description && (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, {
    Component: "span",
    vkuiClass: "SimpleCell__description"
  }, description)), (0, _utils.hasReactNode)(indicator) && (0, _jsxRuntime.createScopedElement)(SimpleCellTypography, {
    Component: "span",
    vkuiClass: "SimpleCell__indicator"
  }, indicator), hasAfter && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCell__after"
  }, after, expandable && platform === _platform.IOS && (0, _jsxRuntime.createScopedElement)(_icons.Icon24Chevron, null)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */


var SimpleCell = (0, _withAdaptivity.withAdaptivity)(SimpleCellComponent, {
  sizeY: true
});
exports.SimpleCell = SimpleCell;
//# sourceMappingURL=SimpleCell.js.map