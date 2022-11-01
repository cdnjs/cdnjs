import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "style", "before", "inlineAfter", "after", "value", "onChange", "getRootRef", "getRef", "onHeightChange", "shadow"];
import * as React from "react";
import { Headline } from "../Typography/Headline/Headline";
import { usePlatform } from "../../hooks/usePlatform";
import { useExternRef } from "../../hooks/useExternRef";
import { hasReactNode, isFunction } from "../../lib/utils";
import { classNamesString } from "../../lib/classNames";
import { Platform } from "../../lib/platform";
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBar
 */
export var WriteBar = function WriteBar(_ref) {
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var isControlledOutside = value != null;
  var textareaRef = useExternRef(getRef);
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
    if (isFunction(onChange)) {
      onChange(event);
    }
    if (!isControlledOutside) {
      resize();
    }
  };
  React.useEffect(function () {
    resize();
  }, [resize, value]);
  return /*#__PURE__*/React.createElement("div", {
    ref: getRootRef,
    className: classNamesString("vkuiWriteBar", platform === Platform.IOS && "vkuiWriteBar--ios", shadow && "vkuiWriteBar--shadow", className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__form"
  }, hasReactNode(before) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__formIn"
  }, /*#__PURE__*/React.createElement(Headline, _extends({}, restProps, {
    Component: "textarea",
    className: "vkuiWriteBar__textarea",
    onChange: onTextareaChange,
    getRootRef: textareaRef,
    value: value
  })), hasReactNode(inlineAfter) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__inlineAfter"
  }, inlineAfter)), hasReactNode(after) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__after"
  }, after)));
};
//# sourceMappingURL=WriteBar.js.map