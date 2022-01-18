import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "style", "before", "inlineAfter", "after", "value", "onChange", "getRootRef", "getRef", "onHeightChange"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { usePlatform } from "../../hooks/usePlatform";
import { useExternRef } from "../../hooks/useExternRef";
import { hasReactNode, isFunction } from "../../lib/utils";
import { useDOM } from "../../lib/dom";
import { getClassName } from "../../helpers/getClassName";
import "./WriteBar.css";
export var WriteBar = function WriteBar(props) {
  var platform = usePlatform();

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
      restProps = _objectWithoutProperties(props, _excluded);

  var isControlledOutside = value != null;

  var _useDOM = useDOM(),
      window = _useDOM.window;

  var textareaRef = useExternRef(getRef);
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

    if (isFunction(onHeightChange)) {
      onHeightChange();
    }
  };

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
  }, [value]);
  return createScopedElement("div", {
    ref: getRootRef,
    vkuiClass: getClassName('WriteBar', platform),
    className: className,
    style: style
  }, createScopedElement("form", {
    vkuiClass: "WriteBar__form",
    onSubmit: function onSubmit(e) {
      return e.preventDefault();
    }
  }, hasReactNode(before) && createScopedElement("div", {
    vkuiClass: "WriteBar__before"
  }, before), createScopedElement("div", {
    vkuiClass: "WriteBar__formIn"
  }, createScopedElement("textarea", _extends({}, restProps, {
    vkuiClass: "WriteBar__textarea",
    onChange: onTextareaChange,
    ref: textareaRef,
    value: value
  })), hasReactNode(inlineAfter) && createScopedElement("div", {
    vkuiClass: "WriteBar__inlineAfter"
  }, inlineAfter)), hasReactNode(after) && createScopedElement("div", {
    vkuiClass: "WriteBar__after"
  }, after)));
};
//# sourceMappingURL=WriteBar.js.map