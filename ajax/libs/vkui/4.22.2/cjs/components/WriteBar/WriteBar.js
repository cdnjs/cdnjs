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

var _usePlatform = require("../../hooks/usePlatform");

var _useExternRef = require("../../hooks/useExternRef");

var _utils = require("../../lib/utils");

var _dom = require("../../lib/dom");

var _getClassName = require("../../helpers/getClassName");

var _excluded = ["className", "style", "before", "inlineAfter", "after", "value", "onChange", "getRootRef", "getRef", "onHeightChange"];

var WriteBar = function WriteBar(props) {
  var platform = (0, _usePlatform.usePlatform)();
  var className = props.className,
      style = props.style,
      before = props.before,
      inlineAfter = props.inlineAfter,
      after = props.after,
      value = props.value,
      onChange = props.onChange,
      getRootRef = props.getRootRef,
      getRef = props.getRef,
      onHeightChange = props.onHeightChange,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var isControlledOutside = value != null;

  var _useDOM = (0, _dom.useDOM)(),
      window = _useDOM.window;

  var textareaRef = (0, _useExternRef.useExternRef)(getRef);
  var textareaMinHeightRef = React.useRef(null);

  var resize = function resize() {
    var textareaEl = textareaRef.current;

    if (!textareaEl) {
      return;
    }

    var offsetHeight = textareaEl.offsetHeight,
        scrollHeight = textareaEl.scrollHeight;
    var style = window.getComputedStyle(textareaEl);
    var paddingTop = parseInt(style.paddingTop);
    var paddingBottom = parseInt(style.paddingBottom);

    if (textareaMinHeightRef.current === null) {
      textareaMinHeightRef.current = offsetHeight;
    }

    var diff = paddingTop + paddingBottom + 10;

    if (scrollHeight + diff <= offsetHeight) {
      diff = 0;
    }

    textareaEl.style.height = '0px';
    var height = textareaEl.scrollHeight - diff / 4;
    textareaEl.style.height = String(Math.max(height, textareaMinHeightRef.current)) + 'px';

    if ((0, _utils.isFunction)(onHeightChange)) {
      onHeightChange();
    }
  };

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
  }, [value]);
  return (0, _jsxRuntime.createScopedElement)("div", {
    ref: getRootRef,
    vkuiClass: (0, _getClassName.getClassName)('WriteBar', platform),
    className: className,
    style: style
  }, (0, _jsxRuntime.createScopedElement)("form", {
    vkuiClass: "WriteBar__form",
    onSubmit: function onSubmit(e) {
      return e.preventDefault();
    }
  }, (0, _utils.hasReactNode)(before) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "WriteBar__before"
  }, before), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "WriteBar__formIn"
  }, (0, _jsxRuntime.createScopedElement)("textarea", (0, _extends2.default)({}, restProps, {
    vkuiClass: "WriteBar__textarea",
    onChange: onTextareaChange,
    ref: textareaRef,
    value: value
  })), (0, _utils.hasReactNode)(inlineAfter) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "WriteBar__inlineAfter"
  }, inlineAfter)), (0, _utils.hasReactNode)(after) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "WriteBar__after"
  }, after)));
};

exports.WriteBar = WriteBar;
//# sourceMappingURL=WriteBar.js.map