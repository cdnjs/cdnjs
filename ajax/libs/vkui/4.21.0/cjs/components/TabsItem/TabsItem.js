"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _classNames = require("../../lib/classNames");

var _platform = require("../../lib/platform");

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _Tabs = require("../Tabs/Tabs");

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _excluded = ["children", "selected", "after"];

var TabsItem = function TabsItem(_ref) {
  var children = _ref.children,
      selected = _ref.selected,
      after = _ref.after,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var mode = React.useContext(_Tabs.TabsModeContext);
  var TypographyComponent = mode === 'buttons' || mode === 'segmented' ? _Subhead.default : _Headline.default;

  if (platform === _platform.VKCOM) {
    TypographyComponent = _Text.default;
  }

  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('TabsItem', platform), {
      'TabsItem--selected': selected
    }),
    hasActive: mode === 'segmented',
    activeMode: "TabsItem--active",
    focusVisibleMode: mode === 'segmented' ? 'outside' : 'inside'
  }), (0, _jsxRuntime.createScopedElement)(TypographyComponent, {
    Component: "span",
    vkuiClass: "TabsItem__in",
    weight: "medium"
  }, children), (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "TabsItem__after"
  }, after));
};

TabsItem.defaultProps = {
  selected: false
};
var _default = TabsItem;
exports.default = _default;
//# sourceMappingURL=TabsItem.js.map