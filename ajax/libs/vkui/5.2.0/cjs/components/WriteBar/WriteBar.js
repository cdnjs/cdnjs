"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteBar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Headline = require("../Typography/Headline/Headline");
var _usePlatform = require("../../hooks/usePlatform");
var _useExternRef = require("../../hooks/useExternRef");
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _useEnsuredControl3 = require("../../hooks/useEnsuredControl");
var _excluded = ["className", "style", "before", "inlineAfter", "after", "getRootRef", "getRef", "onHeightChange", "shadow", "defaultValue"];
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBar
 */
var WriteBar = function WriteBar(_ref) {
  var className = _ref.className,
    style = _ref.style,
    before = _ref.before,
    inlineAfter = _ref.inlineAfter,
    after = _ref.after,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    onHeightChange = _ref.onHeightChange,
    _ref$shadow = _ref.shadow,
    shadow = _ref$shadow === void 0 ? false : _ref$shadow,
    defaultValue = _ref.defaultValue,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useEnsuredControl = (0, _useEnsuredControl3.useEnsuredControl)((0, _objectSpread2.default)({
      defaultValue: defaultValue
    }, restProps)),
    _useEnsuredControl2 = (0, _slicedToArray2.default)(_useEnsuredControl, 2),
    value = _useEnsuredControl2[0],
    onChange = _useEnsuredControl2[1];
  var textareaRef = (0, _useExternRef.useExternRef)(getRef);
  var currentScrollHeight = React.useRef();
  var resize = React.useCallback(function () {
    var textareaEl = textareaRef.current;
    if (!textareaEl) {
      return;
    }
    if (textareaEl.offsetParent) {
      textareaEl.style.height = '';
      textareaEl.style.height = "".concat(textareaEl.scrollHeight, "px");
      if (textareaEl.scrollHeight !== currentScrollHeight.current && onHeightChange) {
        onHeightChange();
        currentScrollHeight.current = textareaEl.scrollHeight;
      }
    }
  }, [onHeightChange, textareaRef]);
  React.useEffect(resize, [resize, value]);
  return /*#__PURE__*/React.createElement("div", {
    ref: getRootRef,
    className: (0, _vkjs.classNames)("vkuiWriteBar", platform === _platform.Platform.IOS && "vkuiWriteBar--ios", shadow && "vkuiWriteBar--shadow", className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__form"
  }, (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__formIn"
  }, /*#__PURE__*/React.createElement(_Headline.Headline, (0, _extends2.default)({}, restProps, {
    Component: "textarea",
    className: "vkuiWriteBar__textarea",
    onChange: onChange,
    getRootRef: textareaRef,
    value: value
  })), (0, _vkjs.hasReactNode)(inlineAfter) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__inlineAfter"
  }, inlineAfter)), (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__after"
  }, after)));
};
exports.WriteBar = WriteBar;
//# sourceMappingURL=WriteBar.js.map