"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheetItem = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _vkjs = require("@vkontakte/vkjs");
var _Tappable = require("../Tappable/Tappable");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Text = require("../Typography/Text/Text");
var _icons = require("@vkontakte/icons");
var _ActionSheetContext = require("../ActionSheet/ActionSheetContext");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _excluded = ["children", "autoClose", "mode", "meta", "subtitle", "before", "selectable", "value", "name", "checked", "defaultChecked", "onChange", "onClick", "onImmediateClick", "multiline", "iconChecked", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */
var ActionSheetItem = function ActionSheetItem(_ref) {
  var children = _ref.children,
    autoClose = _ref.autoClose,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'default' : _ref$mode,
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
    onImmediateClick = _ref.onImmediateClick,
    _ref$multiline = _ref.multiline,
    multiline = _ref$multiline === void 0 ? false : _ref$multiline,
    iconCheckedProp = _ref.iconChecked,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _React$useContext = React.useContext(_ActionSheetContext.ActionSheetContext),
    _React$useContext$onI = _React$useContext.onItemClick,
    onItemClick = _React$useContext$onI === void 0 ? function () {
      return _vkjs.noop;
    } : _React$useContext$onI,
    isDesktop = _React$useContext.isDesktop;
  var _useAdaptivityWithJSM = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(),
    sizeY = _useAdaptivityWithJSM.sizeY;
  var iconChecked = iconCheckedProp || (sizeY === _adaptivity.SizeType.COMPACT ? /*#__PURE__*/React.createElement(_icons.Icon20CheckCircleOn, null) : /*#__PURE__*/React.createElement(_icons.Icon24CheckCircleOn, null));
  var Component = restProps.href ? 'a' : 'div';
  if (selectable) {
    Component = 'label';
  }
  var isRich = subtitle || meta || selectable;
  var isCentered = !isRich && !before && platform === _platform.Platform.IOS;
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    onClick: selectable ? onClick : onItemClick(onClick, onImmediateClick, Boolean(autoClose)),
    activeMode: platform === _platform.Platform.IOS ? "vkuiActionSheetItem--active" : undefined,
    className: (0, _vkjs.classNames)("vkuiActionSheetItem", platform === _platform.Platform.IOS && "vkuiActionSheetItem--ios", styles["ActionSheetItem--mode-".concat(mode)], (0, _getSizeYClassName.getSizeYClassName)("vkuiActionSheetItem", sizeY), isRich && "vkuiActionSheetItem--rich", isDesktop && "vkuiActionSheetItem--desktop", className),
    Component: Component
  }), before && /*#__PURE__*/React.createElement("div", {
    className: "vkuiActionSheetItem__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)("vkuiActionSheetItem__container", !multiline && "vkuiActionSheetItem--ellipsis")
  }, /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)("vkuiActionSheetItem__content", isCentered && "vkuiActionSheetItem--centered")
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    weight: mode === 'cancel' ? '2' : undefined,
    className: "vkuiActionSheetItem__children"
  }, children), meta && /*#__PURE__*/React.createElement(_Text.Text, {
    className: "vkuiActionSheetItem__meta"
  }, meta)), subtitle && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
    className: "vkuiActionSheetItem__subtitle"
  }, subtitle)), selectable && /*#__PURE__*/React.createElement("div", {
    className: "vkuiActionSheetItem__after"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    className: "vkuiActionSheetItem__radio",
    name: name,
    value: value,
    onChange: onChange,
    onClick: onItemClick(_vkjs.noop, _vkjs.noop, Boolean(autoClose)),
    defaultChecked: defaultChecked,
    checked: checked,
    disabled: restProps.disabled
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiActionSheetItem__marker"
  }, iconChecked)));
};
exports.ActionSheetItem = ActionSheetItem;
var styles = {
  "ActionSheetItem--mode-destructive": "vkuiActionSheetItem--mode-destructive",
  "ActionSheetItem--mode-cancel": "vkuiActionSheetItem--mode-cancel",
  "ActionSheetItem--mode-default": "vkuiActionSheetItem--mode-default"
};
//# sourceMappingURL=ActionSheetItem.js.map