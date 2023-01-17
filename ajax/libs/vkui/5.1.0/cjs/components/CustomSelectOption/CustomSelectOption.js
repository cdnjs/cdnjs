"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomSelectOption = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _Paragraph = require("../Typography/Paragraph/Paragraph");
var _Footnote = require("../Typography/Footnote/Footnote");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _warnOnce = require("../../lib/warnOnce");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["children", "hierarchy", "hovered", "selected", "before", "after", "option", "description", "disabled", "style", "className"];
var warn = (0, _warnOnce.warnOnce)('CustomSelectOption');

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
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var title = typeof children === 'string' ? children : undefined;
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var style = React.useMemo(function () {
    return hierarchy > 0 ? (0, _objectSpread2.default)({
      '--vkui_internal--custom_select_option_hierarchy_level': hierarchy
    }, styleProp) : styleProp;
  }, [hierarchy, styleProp]);
  if (!!option && process.env.NODE_ENV === 'development') {
    // TODO v6.0.0. Удалить св-во `option`
    warn('Свойство option было добавлено по ошибке и будет удалено в v6.0.0.');
  }
  return /*#__PURE__*/React.createElement(_Paragraph.Paragraph, (0, _extends2.default)({}, restProps, {
    Component: "div",
    role: "option",
    title: title,
    "aria-disabled": disabled,
    "aria-selected": selected,
    className: (0, _vkjs.classNames)("vkuiCustomSelectOption", (0, _getSizeYClassName.getSizeYClassName)("vkuiCustomSelectOption", sizeY), hovered && !disabled && "vkuiCustomSelectOption--hover",
    // Note: пустой класс
    selected && "vkuiCustomSelectOption--selected", disabled && "vkuiCustomSelectOption--disabled", hierarchy > 0 && "vkuiCustomSelectOption--hierarchy", className),
    style: style
  }), (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectOption__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectOption__main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectOption__children"
  }, children), (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiCustomSelectOption__description"
  }, description)), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectOption__after"
  }, (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectOption__afterIn"
  }, after), selected && /*#__PURE__*/React.createElement(_icons.Icon16Done, {
    className: "vkuiCustomSelectOption__selectedIcon"
  })));
};
exports.CustomSelectOption = CustomSelectOption;
//# sourceMappingURL=CustomSelectOption.js.map