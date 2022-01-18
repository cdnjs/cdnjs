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

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _Title = _interopRequireDefault(require("../Typography/Title/Title"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _platform = require("../../lib/platform");

var _icons = require("@vkontakte/icons");

var _ActionSheetContext = require("../ActionSheet/ActionSheetContext");

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _excluded = ["children", "autoclose", "mode", "meta", "subtitle", "before", "selectable", "value", "name", "checked", "defaultChecked", "onChange", "onClick", "sizeY"];

var ActionSheetItem = function ActionSheetItem(_ref) {
  var children = _ref.children,
      autoclose = _ref.autoclose,
      mode = _ref.mode,
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
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useContext = React.useContext(_ActionSheetContext.ActionSheetContext),
      _React$useContext$onI = _React$useContext.onItemClick,
      onItemClick = _React$useContext$onI === void 0 ? function () {
    return _utils.noop;
  } : _React$useContext$onI,
      isDesktop = _React$useContext.isDesktop;

  var Component = restProps.href ? 'a' : 'div';

  if (selectable) {
    Component = 'label';
  }

  var isCompact = (0, _utils.hasReactNode)(subtitle) || (0, _utils.hasReactNode)(meta) || selectable;
  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({}, restProps, {
    onClick: selectable ? onClick : onItemClick(onClick, autoclose),
    activeMode: "ActionSheetItem--active",
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('ActionSheetItem', platform), "ActionSheetItem--".concat(mode), "ActionSheetItem--sizeY-".concat(sizeY), {
      'ActionSheetItem--compact': isCompact,
      'ActionSheetItem--desktop': isDesktop,
      'ActionSheetItem--withSubtitle': (0, _utils.hasReactNode)(subtitle)
    }),
    Component: Component
  }), (0, _utils.hasReactNode)(before) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ActionSheetItem__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ActionSheetItem__container"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ActionSheetItem__content"
  }, sizeY === _withAdaptivity.SizeType.COMPACT ? (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _jsxRuntime.createScopedElement)(_Text.default, {
    weight: mode === 'cancel' ? 'medium' : 'regular',
    vkuiClass: "ActionSheetItem__children"
  }, children), (0, _utils.hasReactNode)(meta) && (0, _jsxRuntime.createScopedElement)(_Text.default, {
    weight: "regular",
    vkuiClass: "ActionSheetItem__meta"
  }, meta)) : (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _jsxRuntime.createScopedElement)(_Title.default, {
    weight: mode === 'cancel' ? 'medium' : 'regular',
    level: isCompact || (0, _utils.hasReactNode)(before) || platform === _platform.ANDROID ? '3' : '2',
    vkuiClass: "ActionSheetItem__children"
  }, children), (0, _utils.hasReactNode)(meta) && (0, _jsxRuntime.createScopedElement)(_Title.default, {
    weight: "regular",
    level: isCompact || (0, _utils.hasReactNode)(before) || platform === _platform.ANDROID ? '3' : '2',
    vkuiClass: "ActionSheetItem__meta"
  }, meta))), (0, _utils.hasReactNode)(subtitle) && (sizeY === _withAdaptivity.SizeType.COMPACT ? (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    weight: "regular",
    vkuiClass: "ActionSheetItem__subtitle",
    level: "1"
  }, subtitle) : (0, _jsxRuntime.createScopedElement)(_Subhead.default, {
    weight: "regular",
    vkuiClass: "ActionSheetItem__subtitle"
  }, subtitle))), selectable && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ActionSheetItem__after"
  }, (0, _jsxRuntime.createScopedElement)("input", {
    type: "radio",
    vkuiClass: "ActionSheetItem__radio",
    name: name,
    value: value,
    onChange: onChange,
    onClick: onItemClick(_utils.noop, autoclose),
    defaultChecked: defaultChecked,
    checked: checked,
    disabled: restProps.disabled
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ActionSheetItem__marker"
  }, platform === _platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(_icons.Icon24Done, null) : (0, _jsxRuntime.createScopedElement)(_icons.Icon16Done, null))));
};

ActionSheetItem.defaultProps = {
  mode: 'default'
};

var _default = (0, _withAdaptivity.withAdaptivity)(ActionSheetItem, {
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=ActionSheetItem.js.map