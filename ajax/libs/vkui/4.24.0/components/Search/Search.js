import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["before", "className", "defaultValue", "placeholder", "after", "getRef", "platform", "icon", "onIconClick", "style"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { withPlatform } from "../../hoc/withPlatform";
import { getClassName } from "../../helpers/getClassName";
import { Icon16SearchOutline, Icon16Clear, Icon24Cancel } from "@vkontakte/icons";
import { IOS, VKCOM } from "../../lib/platform";
import { Touch } from "../Touch/Touch";
import { noop } from "../../lib/utils";
import Text from "../Typography/Text/Text";
import Title from "../Typography/Title/Title";
import Separator from "../Separator/Separator";
import { useExternRef } from "../../hooks/useExternRef";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";

var Search = function Search(_ref) {
  var before = _ref.before,
      className = _ref.className,
      defaultValue = _ref.defaultValue,
      placeholder = _ref.placeholder,
      after = _ref.after,
      getRef = _ref.getRef,
      platform = _ref.platform,
      icon = _ref.icon,
      _ref$onIconClick = _ref.onIconClick,
      onIconClick = _ref$onIconClick === void 0 ? noop : _ref$onIconClick,
      style = _ref.style,
      inputProps = _objectWithoutProperties(_ref, _excluded);

  var inputRef = useExternRef(getRef);

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isFocused = _React$useState2[0],
      setFocused = _React$useState2[1];

  var _useEnsuredControl = useEnsuredControl(inputProps, {
    defaultValue: defaultValue
  }),
      _useEnsuredControl2 = _slicedToArray(_useEnsuredControl, 2),
      value = _useEnsuredControl2[0],
      onChange = _useEnsuredControl2[1];

  var onFocus = function onFocus(e) {
    setFocused(true);
    inputProps.onFocus && inputProps.onFocus(e);
  };

  var onBlur = function onBlur(e) {
    setFocused(false);
    inputProps.onBlur && inputProps.onBlur(e);
  };

  var onCancel = function onCancel() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(inputRef.current, "");
    var ev2 = new Event("input", {
      bubbles: true
    });
    inputRef.current.dispatchEvent(ev2);
  };

  var onIconClickStart = React.useCallback(function (e) {
    return onIconClick(e.originalEvent);
  }, [onIconClick]);
  var onIconCancelClickStart = React.useCallback(function (e) {
    e.originalEvent.preventDefault();
    inputRef.current.focus();
    onCancel();
  }, [onCancel]);
  return createScopedElement("div", {
    vkuiClass: classNames(getClassName("Search", platform), {
      "Search--focused": isFocused,
      "Search--has-value": !!value,
      "Search--has-after": !!after,
      "Search--has-icon": !!icon
    }),
    className: className,
    style: style
  }, createScopedElement("div", {
    vkuiClass: "Search__in"
  }, createScopedElement("div", {
    vkuiClass: "Search__width"
  }), createScopedElement("label", {
    vkuiClass: "Search__control"
  }, createScopedElement("input", _extends({
    type: "search"
  }, inputProps, {
    ref: inputRef,
    vkuiClass: "Search__input",
    onFocus: onFocus,
    onBlur: onBlur,
    onChange: onChange,
    value: value
  })), platform === IOS && after && createScopedElement("div", {
    vkuiClass: "Search__after-width"
  }, after), createScopedElement("div", {
    vkuiClass: "Search__placeholder"
  }, createScopedElement("div", {
    vkuiClass: "Search__placeholder-in"
  }, before, platform === VKCOM ? createScopedElement(Text, {
    vkuiClass: "Search__placeholder-text",
    weight: "regular"
  }, placeholder) : createScopedElement(Title, {
    vkuiClass: "Search__placeholder-text",
    level: "3",
    weight: "regular"
  }, placeholder)), isFocused && platform === IOS && after && createScopedElement("div", {
    vkuiClass: "Search__after-width"
  }, after))), createScopedElement("div", {
    vkuiClass: "Search__after",
    onClick: onCancel
  }, createScopedElement("div", {
    vkuiClass: "Search__icons"
  }, icon && createScopedElement(Touch, {
    onStart: onIconClickStart,
    vkuiClass: "Search__icon"
  }, icon), !!value && createScopedElement(Touch, {
    onStart: onIconCancelClickStart,
    vkuiClass: "Search__icon"
  }, platform === IOS ? createScopedElement(Icon16Clear, null) : createScopedElement(Icon24Cancel, null))), platform === IOS && after && createScopedElement("div", {
    vkuiClass: "Search__after-in"
  }, after))), platform === VKCOM && createScopedElement(Separator, {
    vkuiClass: "Search__separator",
    wide: true
  }));
};

Search.defaultProps = {
  autoComplete: "off",
  defaultValue: "",
  placeholder: "Поиск",
  after: "Отмена",
  before: createScopedElement(Icon16SearchOutline, null)
};
export default withPlatform(Search);
//# sourceMappingURL=Search.js.map