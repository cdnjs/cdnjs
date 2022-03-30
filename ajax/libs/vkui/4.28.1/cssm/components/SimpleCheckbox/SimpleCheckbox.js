import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "style", "getRootRef", "getRef", "indeterminate", "defaultIndeterminate", "onChange"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import Tappable, { ACTIVE_EFFECT_DELAY } from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { IOS, VKCOM } from "../../lib/platform";
import { Icon20CheckBoxOn, Icon20CheckBoxOff, Icon24CheckBoxOn, Icon24CheckBoxOff, Icon20CheckBoxIndetermanate } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useExternRef } from "../../hooks/useExternRef";
import { SizeType } from "../../hoc/withAdaptivity";
import { warnOnce } from "../../lib/warnOnce";
import "./SimpleCheckbox.css";
var warn = warnOnce("SimpleCheckbox");
var IS_DEV = process.env.NODE_ENV === "development";
export var SimpleCheckbox = function SimpleCheckbox(props) {
  var className = props.className,
      style = props.style,
      getRootRef = props.getRootRef,
      getRef = props.getRef,
      indeterminate = props.indeterminate,
      defaultIndeterminate = props.defaultIndeterminate,
      onChange = props.onChange,
      restProps = _objectWithoutProperties(props, _excluded);

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var platform = usePlatform();
  var inputRef = useExternRef(getRef);
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

  if (IS_DEV) {
    if (defaultIndeterminate && restProps.defaultChecked) {
      warn("defaultIndeterminate and defaultChecked cannot be true at the same time");
    }

    if (indeterminate && restProps.checked) {
      warn("indeterminate and checked cannot be true at the same time");
    }
  }

  return createScopedElement(Tappable, {
    Component: "label",
    vkuiClass: classNames(getClassName("SimpleCheckbox", platform), "SimpleCheckbox--sizeY-".concat(sizeY)),
    className: className,
    style: style,
    disabled: restProps.disabled,
    activeMode: platform === VKCOM ? "SimpleCheckbox--active" : "background",
    hoverMode: platform === VKCOM ? "SimpleCheckbox--hover" : "background",
    activeEffectDelay: platform === IOS ? 100 : ACTIVE_EFFECT_DELAY,
    getRootRef: getRootRef
  }, createScopedElement("input", _extends({}, restProps, {
    onChange: handleChange,
    type: "checkbox",
    vkuiClass: "SimpleCheckbox__input",
    ref: inputRef
  })), createScopedElement("div", {
    vkuiClass: "SimpleCheckbox__container"
  }, createScopedElement("div", {
    vkuiClass: "SimpleCheckbox__icon SimpleCheckbox__icon--on"
  }, sizeY === SizeType.COMPACT || platform === VKCOM ? createScopedElement(Icon20CheckBoxOn, null) : createScopedElement(Icon24CheckBoxOn, null)), createScopedElement("div", {
    vkuiClass: "SimpleCheckbox__icon SimpleCheckbox__icon--off"
  }, sizeY === SizeType.COMPACT || platform === VKCOM ? createScopedElement(Icon20CheckBoxOff, null) : createScopedElement(Icon24CheckBoxOff, null)), createScopedElement("div", {
    vkuiClass: "SimpleCheckbox__icon SimpleCheckbox__icon--indeterminate"
  }, createScopedElement(Icon20CheckBoxIndetermanate, {
    width: sizeY === SizeType.COMPACT || platform === VKCOM ? 20 : 24,
    height: sizeY === SizeType.COMPACT || platform === VKCOM ? 20 : 24
  }))), platform === VKCOM && createScopedElement("div", {
    "aria-hidden": true,
    vkuiClass: "SimpleCheckbox__activeShadow"
  }), platform === VKCOM && createScopedElement("div", {
    "aria-hidden": true,
    vkuiClass: "SimpleCheckbox__hoverShadow"
  }));
};
//# sourceMappingURL=SimpleCheckbox.js.map