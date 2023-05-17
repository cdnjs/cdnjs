"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteBar = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Headline = require("../Typography/Headline/Headline");
var _usePlatform = require("../../hooks/usePlatform");
var _useExternRef = require("../../hooks/useExternRef");
var _utils = require("../../lib/utils");
var _classNames = require("../../lib/classNames");
var _platform = require("../../lib/platform");
var _excluded = ["className", "style", "before", "inlineAfter", "after", "value", "onChange", "getRootRef", "getRef", "onHeightChange", "shadow"];
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBar
 */
var WriteBar = function WriteBar(_ref) {
  var className = _ref.className,
    style = _ref.style,
    before = _ref.before,
    inlineAfter = _ref.inlineAfter,
    after = _ref.after,
    value = _ref.value,
    onChange = _ref.onChange,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    onHeightChange = _ref.onHeightChange,
    _ref$shadow = _ref.shadow,
    shadow = _ref$shadow === void 0 ? false : _ref$shadow,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var isControlledOutside = value != null;
  var textareaRef = (0, _useExternRef.useExternRef)(getRef);
  var currentScrollHeight = React.useRef();
  var resize = React.useCallback(function () {
    var textareaEl = textareaRef.current;
    if (!textareaEl) {
      return;
    }
    if (textareaEl.offsetParent) {
      textareaEl.style.height = "";
      textareaEl.style.height = "".concat(textareaEl.scrollHeight, "px");
      if (textareaEl.scrollHeight !== currentScrollHeight.current && onHeightChange) {
        onHeightChange();
        currentScrollHeight.current = textareaEl.scrollHeight;
      }
    }
  }, [onHeightChange, textareaRef]);
  var onTextareaChange = function onTextareaChange(event) {
    if ((0, _utils.isFunction)(onChange)) {
      onChange(event);
    }
    if (!isControlledOutside) {
      resize();
    }
  };
  React.useEffect(function () {
    resize();
  }, [resize, value]);
  return (0, _jsxRuntime.createScopedElement)("div", {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)("WriteBar", platform === _platform.IOS && "WriteBar--ios", shadow && "WriteBar--shadow"),
    className: className,
    style: style
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "WriteBar__form"
  }, (0, _utils.hasReactNode)(before) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "WriteBar__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "WriteBar__formIn"
  }, (0, _jsxRuntime.createScopedElement)(_Headline.Headline, (0, _extends2.default)({}, restProps, {
    Component: "textarea",
    vkuiClass: "WriteBar__textarea",
    onChange: onTextareaChange,
    getRootRef: textareaRef,
    value: value
  })), (0, _utils.hasReactNode)(inlineAfter) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "WriteBar__inlineAfter"
  }, inlineAfter)), (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "WriteBar__after"
  }, after)));
};
exports.WriteBar = WriteBar;
//# sourceMappingURL=WriteBar.js.map