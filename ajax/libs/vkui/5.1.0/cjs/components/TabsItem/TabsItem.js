"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsItem = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Tappable = require("../Tappable/Tappable");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _Tabs = require("../Tabs/Tabs");
var _Headline = require("../Typography/Headline/Headline");
var _Subhead = require("../Typography/Subhead/Subhead");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _warnOnce = require("../../lib/warnOnce");
var _excluded = ["before", "children", "status", "after", "selected", "className", "role", "tabIndex"];
var warn = (0, _warnOnce.warnOnce)('TabsItem');

/**
 * @see https://vkcom.github.io/VKUI/#/TabsItem
 */
var TabsItem = function TabsItem(_ref) {
  var before = _ref.before,
    children = _ref.children,
    status = _ref.status,
    after = _ref.after,
    _ref$selected = _ref.selected,
    selected = _ref$selected === void 0 ? false : _ref$selected,
    className = _ref.className,
    _ref$role = _ref.role,
    role = _ref$role === void 0 ? 'tab' : _ref$role,
    tabIndexProp = _ref.tabIndex,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var _React$useContext = React.useContext(_Tabs.TabsModeContext),
    mode = _React$useContext.mode,
    withGaps = _React$useContext.withGaps;
  var statusComponent = null;
  var isTabFlow = role === 'tab';
  if (status) {
    statusComponent = typeof status === 'number' ? /*#__PURE__*/React.createElement(_Subhead.Subhead, {
      Component: "span",
      className: (0, _vkjs.classNames)("vkuiTabsItem__status", "vkuiTabsItem__status--count"),
      weight: "2"
    }, status) : /*#__PURE__*/React.createElement("span", {
      className: "vkuiTabsItem__status"
    }, status);
  }
  if (process.env.NODE_ENV === 'development' && isTabFlow) {
    if (!restProps['aria-controls']) {
      warn("\u041F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 \u0432 \"aria-controls\" id \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C\u043E\u0433\u043E \u0431\u043B\u043E\u043A\u0430", 'warn');
    } else if (!restProps['id']) {
      warn("\u041F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 \"id\" \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0443 \u0434\u043B\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0432 \"aria-labelledby\" \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C\u043E\u0433\u043E \u0431\u043B\u043E\u043A\u0430", 'warn');
    }
  }
  var tabIndex = tabIndexProp;
  if (isTabFlow && tabIndex === undefined) {
    tabIndex = selected ? 0 : -1;
  }
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiTabsItem", mode && styles["TabsItem--mode-".concat(mode)], selected && "vkuiTabsItem--selected", (0, _getSizeYClassName.getSizeYClassName)("vkuiTabsItem", sizeY), withGaps && "vkuiTabsItem--withGaps", className),
    hoverMode: "vkuiTabsItem--hover",
    activeMode: "vkuiTabsItem--active",
    focusVisibleMode: "inside",
    hasActive: false,
    role: role,
    "aria-selected": selected,
    tabIndex: tabIndex
  }), before && /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabsItem__before"
  }, before), /*#__PURE__*/React.createElement(_Headline.Headline, {
    Component: "span",
    className: "vkuiTabsItem__label",
    level: mode === 'default' ? '1' : '2',
    weight: "2"
  }, children), statusComponent, after && /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabsItem__after"
  }, after), mode === 'default' && /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabsItem__underline",
    "aria-hidden": true,
    "data-selected": selected
  }));
};
exports.TabsItem = TabsItem;
var styles = {
  "TabsItem--mode-default": "vkuiTabsItem--mode-default",
  "TabsItem--mode-accent": "vkuiTabsItem--mode-accent",
  "TabsItem--mode-secondary": "vkuiTabsItem--mode-secondary"
};
//# sourceMappingURL=TabsItem.js.map