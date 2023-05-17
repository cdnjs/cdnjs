import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "style", "before", "inlineAfter", "after", "value", "onChange", "getRootRef", "getRef", "onHeightChange", "shadow"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Headline } from "../Typography/Headline/Headline";
import { usePlatform } from "../../hooks/usePlatform";
import { useExternRef } from "../../hooks/useExternRef";
import { hasReactNode, isFunction } from "../../lib/utils";
import { classNames } from "../../lib/classNames";
import { IOS } from "../../lib/platform";
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
  return createScopedElement("div", {
    ref: getRootRef,
    vkuiClass: classNames("WriteBar", platform === IOS && "WriteBar--ios", shadow && "WriteBar--shadow"),
    className: className,
    style: style
  }, createScopedElement("div", {
    vkuiClass: "WriteBar__form"
  }, hasReactNode(before) && createScopedElement("div", {
    vkuiClass: "WriteBar__before"
  }, before), createScopedElement("div", {
    vkuiClass: "WriteBar__formIn"
  }, createScopedElement(Headline, _extends({}, restProps, {
    Component: "textarea",
    vkuiClass: "WriteBar__textarea",
    onChange: onTextareaChange,
    getRootRef: textareaRef,
    value: value
  })), hasReactNode(inlineAfter) && createScopedElement("div", {
    vkuiClass: "WriteBar__inlineAfter"
  }, inlineAfter)), hasReactNode(after) && createScopedElement("div", {
    vkuiClass: "WriteBar__after"
  }, after)));
};
//# sourceMappingURL=WriteBar.js.map