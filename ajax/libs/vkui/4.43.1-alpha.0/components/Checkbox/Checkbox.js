import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "className", "style", "getRootRef", "getRef", "description", "indeterminate", "defaultIndeterminate", "sizeY", "hoverMode", "activeMode", "hasHover", "hasActive", "focusVisibleMode", "onChange"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { ACTIVE_EFFECT_DELAY, Tappable } from "../Tappable/Tappable";
import { classNames } from "../../lib/classNames";
import { IOS, VKCOM } from "../../lib/platform";
import { Icon20CheckBoxOn, Icon20CheckBoxOff, Icon24CheckBoxOn, Icon24CheckBoxOff, Icon20CheckBoxIndetermanate } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import { Text } from "../Typography/Text/Text";
import { hasReactNode } from "../../lib/utils";
import { Caption } from "../Typography/Caption/Caption";
import { useExternRef } from "../../hooks/useExternRef";
import { VisuallyHiddenInput } from "../VisuallyHiddenInput/VisuallyHiddenInput";
import { warnOnce } from "../../lib/warnOnce";
var warn = warnOnce("Checkbox");

/**
 * @see https://vkcom.github.io/VKUI/#/Checkbox
 */
export var Checkbox = function Checkbox(_ref) {
  var children = _ref.children,
    className = _ref.className,
    style = _ref.style,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    description = _ref.description,
    indeterminate = _ref.indeterminate,
    defaultIndeterminate = _ref.defaultIndeterminate,
    sizeY = _ref.sizeY,
    hoverMode = _ref.hoverMode,
    activeMode = _ref.activeMode,
    hasHover = _ref.hasHover,
    hasActive = _ref.hasActive,
    focusVisibleMode = _ref.focusVisibleMode,
    onChange = _ref.onChange,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var inputRef = useExternRef(getRef);
  var platform = usePlatform();
  React.useEffect(function () {
    var indeterminateValue = indeterminate === undefined ? defaultIndeterminate : indeterminate;
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminateValue);
    }
  }, [defaultIndeterminate, indeterminate, inputRef]);
  var handleChange = React.useCallback(function (event) {
    if (defaultIndeterminate !== undefined && indeterminate === undefined && restProps.checked === undefined && inputRef.current) {
      inputRef.current.indeterminate = false;
    }
    if (indeterminate !== undefined && inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
    onChange && onChange(event);
  }, [defaultIndeterminate, indeterminate, restProps.checked, onChange, inputRef]);
  if (process.env.NODE_ENV === "development") {
    if (defaultIndeterminate && restProps.defaultChecked) {
      warn("defaultIndeterminate и defaultChecked не могут быть true одновременно", "error");
    }
    if (indeterminate && restProps.checked) {
      warn("indeterminate и checked не могут быть true одновременно", "error");
    }
    if (restProps.defaultChecked && restProps.checked) {
      warn("defaultChecked и checked не могут быть true одновременно", "error");
    }
  }
  return createScopedElement(Tappable, {
    Component: "label",
    vkuiClass: classNames("Checkbox", "Checkbox--sizeY-".concat(sizeY), !(hasReactNode(children) || hasReactNode(description)) && "Checkbox--simple"),
    className: className,
    style: style,
    disabled: restProps.disabled,
    activeEffectDelay: platform === IOS ? 100 : ACTIVE_EFFECT_DELAY,
    getRootRef: getRootRef,
    hoverMode: hoverMode,
    activeMode: activeMode,
    hasHover: hasHover,
    hasActive: hasActive,
    focusVisibleMode: focusVisibleMode
  }, createScopedElement(VisuallyHiddenInput, _extends({}, restProps, {
    onChange: handleChange,
    type: "checkbox",
    vkuiClass: "Checkbox__input",
    getRef: inputRef
  })), createScopedElement("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--on"
  }, sizeY === SizeType.COMPACT || platform === VKCOM ? createScopedElement(Icon20CheckBoxOn, {
    "aria-hidden": true
  }) : createScopedElement(Icon24CheckBoxOn, {
    "aria-hidden": true
  })), createScopedElement("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--off"
  }, sizeY === SizeType.COMPACT || platform === VKCOM ? createScopedElement(Icon20CheckBoxOff, {
    "aria-hidden": true
  }) : createScopedElement(Icon24CheckBoxOff, {
    "aria-hidden": true
  })), createScopedElement("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--indeterminate"
  }, createScopedElement(Icon20CheckBoxIndetermanate, {
    "aria-hidden": true,
    width: sizeY === SizeType.COMPACT || platform === VKCOM ? 20 : 24,
    height: sizeY === SizeType.COMPACT || platform === VKCOM ? 20 : 24
  })), createScopedElement(Text, {
    vkuiClass: "Checkbox__content",
    Component: "div"
  }, createScopedElement("div", {
    vkuiClass: "Checkbox__children"
  }, children), hasReactNode(description) && createScopedElement(Caption, {
    vkuiClass: "Checkbox__description"
  }, description)));
};

// eslint-disable-next-line import/no-default-export
export default withAdaptivity(Checkbox, {
  sizeY: true
});
//# sourceMappingURL=Checkbox.js.map