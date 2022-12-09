"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheetItem = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _classNames = require("../../lib/classNames");
var _Tappable = require("../Tappable/Tappable");
var _usePlatform = require("../../hooks/usePlatform");
var _utils = require("../../lib/utils");
var _platform = require("../../lib/platform");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Text = require("../Typography/Text/Text");
var _icons = require("@vkontakte/icons");
var _ActionSheetContext = require("../ActionSheet/ActionSheetContext");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _excluded = ["children", "autoclose", "mode", "meta", "subtitle", "before", "selectable", "value", "name", "checked", "defaultChecked", "onChange", "onClick", "sizeY", "onImmediateClick", "multiline", "iconChecked"];
var ActionSheetItemComponent = function ActionSheetItemComponent(_ref) {
  var children = _ref.children,
    autoclose = _ref.autoclose,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "default" : _ref$mode,
    meta = _ref.meta,
    subtitle = _ref.subtitle,
    before = _ref.before,
    selectable = _ref.selectable,
    value = _ref.value,
    name = _ref.name,
    checked = _ref.checked,
    defaultChecked = _ref.defaultChecked,
    onChange = _ref.onChange,
    onClick = _ref.onClick,
    sizeY = _ref.sizeY,
    onImmediateClick = _ref.onImmediateClick,
    _ref$multiline = _ref.multiline,
    multiline = _ref$multiline === void 0 ? false : _ref$multiline,
    _ref$iconChecked = _ref.iconChecked,
    iconChecked = _ref$iconChecked === void 0 ? (0, _jsxRuntime.createScopedElement)(_icons.Icon24CheckCircleOn, {
      "aria-hidden": true
    }) : _ref$iconChecked,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _React$useContext = React.useContext(_ActionSheetContext.ActionSheetContext),
    _React$useContext$onI = _React$useContext.onItemClick,
    onItemClick = _React$useContext$onI === void 0 ? function () {
      return _utils.noop;
    } : _React$useContext$onI,
    isDesktop = _React$useContext.isDesktop;
  var Component = restProps.href ? "a" : "div";
  if (selectable) {
    Component = "label";
  }
  var isRich = (0, _utils.hasReactNode)(subtitle) || (0, _utils.hasReactNode)(meta) || selectable;
  var isCentered = !isRich && !(0, _utils.hasReactNode)(before) && platform === _platform.Platform.IOS;
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    onClick: selectable ? onClick : onItemClick(onClick, onImmediateClick, Boolean(autoclose)),
    activeMode: platform === _platform.Platform.IOS ? "ActionSheetItem--active" : undefined,
    vkuiClass: (0, _classNames.classNames)("ActionSheetItem", platform === _platform.Platform.IOS && "ActionSheetItem--ios", "ActionSheetItem--".concat(mode), "ActionSheetItem--sizeY-".concat(sizeY), isRich && "ActionSheetItem--rich", isDesktop && "ActionSheetItem--desktop"),
    Component: Component
  }), (0, _utils.hasReactNode)(before) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ActionSheetItem__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)("ActionSheetItem__container", !multiline && "ActionSheetItem--ellipsis")
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)("ActionSheetItem__content", isCentered && "ActionSheetItem--centered")
  }, (0, _jsxRuntime.createScopedElement)(_Text.Text, {
    weight: mode === "cancel" ? "2" : undefined,
    vkuiClass: "ActionSheetItem__children"
  }, children), (0, _utils.hasReactNode)(meta) && (0, _jsxRuntime.createScopedElement)(_Text.Text, {
    vkuiClass: "ActionSheetItem__meta"
  }, meta)), (0, _utils.hasReactNode)(subtitle) && (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, {
    vkuiClass: "ActionSheetItem__subtitle"
  }, subtitle)), selectable && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ActionSheetItem__after"
  }, (0, _jsxRuntime.createScopedElement)("input", {
    type: "radio",
    vkuiClass: "ActionSheetItem__radio",
    name: name,
    value: value,
    onChange: onChange,
    onClick: onItemClick(_utils.noop, _utils.noop, Boolean(autoclose)),
    defaultChecked: defaultChecked,
    checked: checked,
    disabled: restProps.disabled
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ActionSheetItem__marker"
  }, iconChecked)));
};

/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */
var ActionSheetItem = (0, _withAdaptivity.withAdaptivity)(ActionSheetItemComponent, {
  sizeY: true
});
exports.ActionSheetItem = ActionSheetItem;
//# sourceMappingURL=ActionSheetItem.js.map