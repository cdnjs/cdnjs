import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "style", "before", "inlineAfter", "after", "getRootRef", "getRef", "onHeightChange", "shadow", "defaultValue"];
import * as React from 'react';
import { Headline } from '../Typography/Headline/Headline';
import { usePlatform } from '../../hooks/usePlatform';
import { useExternRef } from '../../hooks/useExternRef';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { useEnsuredControl } from '../../hooks/useEnsuredControl';
import "./WriteBar.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/WriteBar
 */
export var WriteBar = function WriteBar(_ref) {
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useEnsuredControl = useEnsuredControl(_objectSpread({
      defaultValue: defaultValue
    }, restProps)),
    _useEnsuredControl2 = _slicedToArray(_useEnsuredControl, 2),
    value = _useEnsuredControl2[0],
    onChange = _useEnsuredControl2[1];
  var textareaRef = useExternRef(getRef);
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
    className: classNames("vkuiWriteBar", platform === Platform.IOS && "vkuiWriteBar--ios", shadow && "vkuiWriteBar--shadow", className),
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
    onChange: onChange,
    getRootRef: textareaRef,
    value: value
  })), hasReactNode(inlineAfter) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__inlineAfter"
  }, inlineAfter)), hasReactNode(after) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiWriteBar__after"
  }, after)));
};
//# sourceMappingURL=WriteBar.js.map