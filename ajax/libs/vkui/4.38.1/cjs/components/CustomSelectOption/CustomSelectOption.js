"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomSelectOption = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _icons = require("@vkontakte/icons");

var _classNames = require("../../lib/classNames");

var _utils = require("../../lib/utils");

var _Paragraph = require("../Typography/Paragraph/Paragraph");

var _Caption = require("../Typography/Caption/Caption");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _warnOnce = require("../../lib/warnOnce");

var _excluded = ["children", "hierarchy", "hovered", "selected", "before", "after", "option", "description", "disabled", "style"];
var warn = (0, _warnOnce.warnOnce)("CustomSelectOption");
/**
 * @see https://vkcom.github.io/VKUI/#/CustomSelectOption
 */

var CustomSelectOption = function CustomSelectOption(_ref) {
  var children = _ref.children,
      _ref$hierarchy = _ref.hierarchy,
      hierarchy = _ref$hierarchy === void 0 ? 0 : _ref$hierarchy,
      hovered = _ref.hovered,
      selected = _ref.selected,
      before = _ref.before,
      after = _ref.after,
      option = _ref.option,
      description = _ref.description,
      disabled = _ref.disabled,
      styleProp = _ref.style,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var title = typeof children === "string" ? children : undefined;

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var style = React.useMemo(function () {
    return hierarchy > 0 ? (0, _objectSpread2.default)({
      "--custom-select-option-hierarchy-level": hierarchy
    }, styleProp) : styleProp;
  }, [hierarchy, styleProp]);

  if (!!option && process.env.NODE_ENV === "development") {
    warn("Свойство option было добавлено по ошибке и будет удалено в 5.0.0.");
  }

  return (0, _jsxRuntime.createScopedElement)(_Paragraph.Paragraph, (0, _extends2.default)({}, restProps, {
    Component: "div",
    role: "option",
    title: title,
    "aria-disabled": disabled,
    "aria-selected": selected,
    vkuiClass: (0, _classNames.classNames)("CustomSelectOption", "CustomSelectOption--sizeY-".concat(sizeY), hovered && !disabled && "CustomSelectOption--hover", selected && "CustomSelectOption--selected", // Note: пустой класс
    disabled && "CustomSelectOption--disabled", hierarchy > 0 && "CustomSelectOption--hierarchy"),
    style: style
  }), (0, _utils.hasReactNode)(before) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CustomSelectOption__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CustomSelectOption__main"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CustomSelectOption__children"
  }, children), (0, _utils.hasReactNode)(description) && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    vkuiClass: "CustomSelectOption__description"
  }, description)), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CustomSelectOption__after"
  }, (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CustomSelectOption__afterIn"
  }, after), selected && (0, _jsxRuntime.createScopedElement)(_icons.Icon16Done, {
    vkuiClass: "CustomSelectOption__selectedIcon"
  })));
};

exports.CustomSelectOption = CustomSelectOption;
//# sourceMappingURL=CustomSelectOption.js.map