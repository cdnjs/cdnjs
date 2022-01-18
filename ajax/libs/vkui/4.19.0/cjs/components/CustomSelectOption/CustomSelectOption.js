"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _icons = require("@vkontakte/icons");

var _classNames = require("../../lib/classNames");

var _utils = require("../../lib/utils");

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _warnOnce = require("../../lib/warnOnce");

var _excluded = ["children", "hovered", "selected", "before", "after", "option", "description", "disabled"];
var warn = (0, _warnOnce.warnOnce)('CustomSelectOption');

var CustomSelectOption = function CustomSelectOption(_ref) {
  var children = _ref.children,
      hovered = _ref.hovered,
      selected = _ref.selected,
      before = _ref.before,
      after = _ref.after,
      option = _ref.option,
      description = _ref.description,
      disabled = _ref.disabled,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var title = typeof children === 'string' ? children : null;

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  if (!!option && process.env.NODE_ENV === 'development') {
    warn('Свойство option было добавлено по ошибке будет и удалено в 5.0.0');
  }

  return (0, _jsxRuntime.createScopedElement)(_Text.default, (0, _extends2.default)({}, restProps, {
    Component: "div",
    weight: "regular",
    role: "option",
    title: title,
    "aria-disabled": disabled,
    "aria-selected": selected,
    vkuiClass: (0, _classNames.classNames)('CustomSelectOption', "CustomSelectOption--sizeY-".concat(sizeY), {
      'CustomSelectOption--hover': hovered && !disabled,
      'CustomSelectOption--selected': selected,
      'CustomSelectOption--disabled': disabled
    })
  }), (0, _utils.hasReactNode)(before) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CustomSelectOption__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CustomSelectOption__main"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CustomSelectOption__children"
  }, children), (0, _utils.hasReactNode)(description) && (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    level: "1",
    weight: "regular",
    vkuiClass: "CustomSelectOption__description"
  }, description)), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CustomSelectOption__after"
  }, (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("div", {
    className: "CustomSelectOption__afterIn"
  }, after), selected && (0, _jsxRuntime.createScopedElement)(_icons.Icon16Done, {
    vkuiClass: "CustomSelectOption__selectedIcon"
  })));
};

var _default = CustomSelectOption;
exports.default = _default;
//# sourceMappingURL=CustomSelectOption.js.map