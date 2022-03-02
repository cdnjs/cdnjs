import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["platform", "children"],
    _excluded2 = ["before", "className", "defaultValue", "placeholder", "after", "getRef", "platform", "icon", "onIconClick", "style"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { withPlatform } from "../../hoc/withPlatform";
import { getClassName } from "../../helpers/getClassName";
import { Icon16SearchOutline, Icon16Clear, Icon24Cancel } from "@vkontakte/icons";
import { IOS, VKCOM, ANDROID } from "../../lib/platform";
import { Touch } from "../Touch/Touch";
import { noop } from "../../lib/utils";
import Text from "../Typography/Text/Text";
import Title from "../Typography/Title/Title";
import Headline from "../Typography/Headline/Headline";
import Separator from "../Separator/Separator";
import { useExternRef } from "../../hooks/useExternRef";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";
import "./Search.css";

var SearchPlaceholderTypography = function SearchPlaceholderTypography(_ref) {
  var platform = _ref.platform,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  switch (platform) {
    case IOS:
      return createScopedElement(Title, _extends({}, restProps, {
        level: "3",
        weight: "3"
      }), children);

    case VKCOM:
      return createScopedElement(Text, _extends({}, restProps, {
        weight: "regular"
      }), children);

    case ANDROID:
    default:
      return createScopedElement(Headline, _extends({}, restProps, {
        weight: "regular"
      }), children);
  }
};

var Search = function Search(_ref2) {
  var before = _ref2.before,
      className = _ref2.className,
      defaultValue = _ref2.defaultValue,
      placeholder = _ref2.placeholder,
      after = _ref2.after,
      getRef = _ref2.getRef,
      platform = _ref2.platform,
      icon = _ref2.icon,
      _ref2$onIconClick = _ref2.onIconClick,
      onIconClick = _ref2$onIconClick === void 0 ? noop : _ref2$onIconClick,
      style = _ref2.style,
      inputProps = _objectWithoutProperties(_ref2, _excluded2);

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

  var onCancel = React.useCallback(function () {
    var _Object$getOwnPropert, _inputRef$current;

    // eslint-disable-next-line @typescript-eslint/unbound-method
    var nativeInputValueSetter = (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.set;
    nativeInputValueSetter === null || nativeInputValueSetter === void 0 ? void 0 : nativeInputValueSetter.call(inputRef.current, "");
    var ev2 = new Event("input", {
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
  }, before, createScopedElement(SearchPlaceholderTypography, {
    vkuiClass: "Search__placeholder-text",
    platform: platform
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
}; // eslint-disable-next-line import/no-default-export

export default withPlatform(Search);
//# sourceMappingURL=Search.js.map