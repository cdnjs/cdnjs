"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubnavigationButton = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _utils = require("../../lib/utils");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _icons = require("@vkontakte/icons");

var _usePlatform = require("../../hooks/usePlatform");

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _excluded = ["textLevel"],
    _excluded2 = ["size", "selected", "textLevel", "before", "after", "expandable", "children"];

var SubnavigationButtonTypography = function SubnavigationButtonTypography(_ref) {
  var textLevel = _ref.textLevel,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  if (textLevel === 1) {
    return (0, _jsxRuntime.createScopedElement)(_Subhead.default, (0, _extends2.default)({
      weight: "regular"
    }, restProps));
  }

  return (0, _jsxRuntime.createScopedElement)(_Caption.default, (0, _extends2.default)({
    level: textLevel === 2 ? '1' : '2',
    weight: "regular"
  }, restProps));
};

var SubnavigationButton = function SubnavigationButton(props) {
  var platform = (0, _usePlatform.usePlatform)();
  var size = props.size,
      selected = props.selected,
      textLevel = props.textLevel,
      before = props.before,
      after = props.after,
      expandable = props.expandable,
      children = props.children,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded2);
  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({}, restProps, {
    hasActive: false,
    focusVisibleMode: "outside",
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('SubnavigationButton', platform), "SubnavigationButton--".concat(size), {
      'SubnavigationButton--selected': selected
    }),
    "aria-label": (0, _utils.getTitleFromChildren)(children)
  }), (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "SubnavigationButton__in"
  }, (0, _utils.hasReactNode)(before) && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "SubnavigationButton__before"
  }, before), (0, _jsxRuntime.createScopedElement)(SubnavigationButtonTypography, {
    textLevel: textLevel,
    vkuiClass: "SubnavigationButton__label",
    Component: "span"
  }, children), (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "SubnavigationButton__after"
  }, after), expandable && (0, _jsxRuntime.createScopedElement)(_icons.Icon16Dropdown, {
    vkuiClass: "SubnavigationButton__expandableIcon"
  })));
};

exports.SubnavigationButton = SubnavigationButton;
SubnavigationButton.defaultProps = {
  size: 'm',
  textLevel: 1
};
//# sourceMappingURL=SubnavigationButton.js.map