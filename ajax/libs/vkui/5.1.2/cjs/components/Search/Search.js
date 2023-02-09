"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _icons = require("@vkontakte/icons");
var _platform = require("../../lib/platform");
var _Touch = require("../Touch/Touch");
var _Title = require("../Typography/Title/Title");
var _Headline = require("../Typography/Headline/Headline");
var _useExternRef = require("../../hooks/useExternRef");
var _useEnsuredControl3 = require("../../hooks/useEnsuredControl");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["children"],
  _excluded2 = ["before", "className", "defaultValue", "placeholder", "after", "getRef", "icon", "onIconClick", "style", "autoComplete", "onChange", "value"];
var SearchPlaceholderTypography = function SearchPlaceholderTypography(_ref) {
  var children = _ref.children,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  switch (platform) {
    case _platform.Platform.IOS:
      return /*#__PURE__*/React.createElement(_Title.Title, (0, _extends2.default)({}, restProps, {
        level: "3",
        weight: "3"
      }), children);
    default:
      return /*#__PURE__*/React.createElement(_Headline.Headline, (0, _extends2.default)({}, restProps, {
        weight: "3"
      }), children);
  }
};
/**
 * @see https://vkcom.github.io/VKUI/#/Search
 */
var Search = function Search(_ref2) {
  var _ref2$before = _ref2.before,
    before = _ref2$before === void 0 ? /*#__PURE__*/React.createElement(_icons.Icon16SearchOutline, null) : _ref2$before,
    className = _ref2.className,
    _ref2$defaultValue = _ref2.defaultValue,
    defaultValue = _ref2$defaultValue === void 0 ? '' : _ref2$defaultValue,
    _ref2$placeholder = _ref2.placeholder,
    placeholder = _ref2$placeholder === void 0 ? 'Поиск' : _ref2$placeholder,
    _ref2$after = _ref2.after,
    after = _ref2$after === void 0 ? 'Отмена' : _ref2$after,
    getRef = _ref2.getRef,
    icon = _ref2.icon,
    _ref2$onIconClick = _ref2.onIconClick,
    onIconClick = _ref2$onIconClick === void 0 ? _vkjs.noop : _ref2$onIconClick,
    style = _ref2.style,
    _ref2$autoComplete = _ref2.autoComplete,
    autoComplete = _ref2$autoComplete === void 0 ? 'off' : _ref2$autoComplete,
    onChangeProp = _ref2.onChange,
    valueProp = _ref2.value,
    inputProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var inputRef = (0, _useExternRef.useExternRef)(getRef);
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    isFocused = _React$useState2[0],
    setFocused = _React$useState2[1];
  var _useEnsuredControl = (0, _useEnsuredControl3.useEnsuredControl)({
      defaultValue: defaultValue,
      onChange: onChangeProp,
      value: valueProp
    }),
    _useEnsuredControl2 = (0, _slicedToArray2.default)(_useEnsuredControl, 2),
    value = _useEnsuredControl2[0],
    onChange = _useEnsuredControl2[1];
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var platform = (0, _usePlatform.usePlatform)();
  var onFocus = function onFocus(e) {
    setFocused(true);
    inputProps.onFocus && inputProps.onFocus(e);
  };
  var onBlur = function onBlur(e) {
    setFocused(false);
    inputProps.onBlur && inputProps.onBlur(e);
  };
  var onCancel = React.useCallback(function () {
    var _Object$getOwnPropert, _inputRef$current;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    var nativeInputValueSetter = (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.set;
    nativeInputValueSetter === null || nativeInputValueSetter === void 0 ? void 0 : nativeInputValueSetter.call(inputRef.current, '');
    var ev2 = new Event('input', {
      bubbles: true
    });
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.dispatchEvent(ev2);
  }, [inputRef]);
  var onIconClickStart = React.useCallback(function (e) {
    return onIconClick(e.originalEvent);
  }, [onIconClick]);
  var onIconCancelClickStart = React.useCallback(function (e) {
    var _inputRef$current2;
    e.originalEvent.preventDefault();
    (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.focus();
    onCancel();
  }, [inputRef, onCancel]);
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)("vkuiSearch", platform === _platform.Platform.IOS && "vkuiSearch--ios", (0, _getSizeYClassName.getSizeYClassName)("vkuiSearch", sizeY), isFocused && "vkuiSearch--focused", value && "vkuiSearch--has-value", after && "vkuiSearch--has-after", icon && "vkuiSearch--has-icon", className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiSearch__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiSearch__width"
  }), /*#__PURE__*/React.createElement("label", {
    className: "vkuiSearch__control"
  }, /*#__PURE__*/React.createElement("input", (0, _extends2.default)({
    type: "search"
  }, inputProps, {
    autoComplete: autoComplete,
    ref: inputRef,
    className: "vkuiSearch__input",
    onFocus: onFocus,
    onBlur: onBlur,
    onChange: onChange,
    value: value
  })), platform === _platform.Platform.IOS && after && /*#__PURE__*/React.createElement("div", {
    className: "vkuiSearch__after-width"
  }, after), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSearch__placeholder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiSearch__placeholder-in"
  }, before, /*#__PURE__*/React.createElement(SearchPlaceholderTypography, {
    className: "vkuiSearch__placeholder-text"
  }, placeholder)), isFocused && platform === _platform.Platform.IOS && after && /*#__PURE__*/React.createElement("div", {
    className: "vkuiSearch__after-width"
  }, after))), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSearch__after"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiSearch__icons"
  }, icon && /*#__PURE__*/React.createElement(_Touch.Touch, {
    onStart: onIconClickStart,
    className: "vkuiSearch__icon"
  }, icon), !!value && /*#__PURE__*/React.createElement(_Touch.Touch, {
    onStart: onIconCancelClickStart,
    onClick: onCancel,
    className: "vkuiSearch__icon"
  }, platform === _platform.Platform.IOS ? /*#__PURE__*/React.createElement(_icons.Icon16Clear, null) : /*#__PURE__*/React.createElement(_icons.Icon24Cancel, null))), platform === _platform.Platform.IOS && after && /*#__PURE__*/React.createElement("div", {
    className: "vkuiSearch__after-in",
    onClick: onCancel
  }, after))));
};
exports.Search = Search;
//# sourceMappingURL=Search.js.map