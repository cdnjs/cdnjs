import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "className", "style", "getRootRef", "getRef", "description", "indeterminate", "defaultIndeterminate", "onChange"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { ACTIVE_EFFECT_DELAY, Tappable } from "../Tappable/Tappable";
import { classNames } from "../../lib/classNames";
import { Platform } from "../../lib/platform";
import { Icon20CheckBoxOn, Icon24CheckBoxOn, Icon20CheckBoxOff, Icon24CheckBoxOff, Icon20CheckBoxIndetermanate } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import { Footnote } from "../Typography/Footnote/Footnote";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useExternRef } from "../../hooks/useExternRef";
import { SizeYConditionalRender } from "../SizeYConditionalRender/SizeYConditionalRender";
import { VisuallyHiddenInput } from "../VisuallyHiddenInput/VisuallyHiddenInput";
import { warnOnce } from "../../lib/warnOnce";
import "./Checkbox.css";
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
      onChange = _ref.onChange,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var inputRef = useExternRef(getRef);
  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

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
    vkuiClass: classNames("Checkbox", platform === Platform.VKCOM && "Checkbox--vkcom", getSizeYClassName("Checkbox", sizeY), !(hasReactNode(children) || hasReactNode(description)) && "Checkbox--simple"),
    className: className,
    style: style,
    disabled: restProps.disabled,
    activeEffectDelay: platform === Platform.IOS ? 100 : ACTIVE_EFFECT_DELAY,
    getRootRef: getRootRef
  }, createScopedElement(VisuallyHiddenInput, _extends({}, restProps, {
    onChange: handleChange,
    type: "checkbox",
    vkuiClass: "Checkbox__input",
    getRef: inputRef
  })), createScopedElement("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--on"
  }, platform === Platform.VKCOM ? createScopedElement(Icon20CheckBoxOn, {
    "aria-hidden": true
  }) : createScopedElement(SizeYConditionalRender, {
    compact: createScopedElement(Icon20CheckBoxOn, {
      "aria-hidden": true
    }),
    regular: createScopedElement(Icon24CheckBoxOn, {
      "aria-hidden": true
    })
  })), createScopedElement("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--off"
  }, platform === Platform.VKCOM ? createScopedElement(Icon20CheckBoxOff, {
    "aria-hidden": true
  }) : createScopedElement(SizeYConditionalRender, {
    compact: createScopedElement(Icon20CheckBoxOff, {
      "aria-hidden": true
    }),
    regular: createScopedElement(Icon24CheckBoxOff, {
      "aria-hidden": true
    })
  })), createScopedElement("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--indeterminate"
  }, platform === Platform.VKCOM ? createScopedElement(Icon20CheckBoxIndetermanate, {
    "aria-hidden": true,
    width: 20,
    height: 20
  }) : createScopedElement(SizeYConditionalRender, {
    compact: createScopedElement(Icon20CheckBoxIndetermanate, {
      "aria-hidden": true,
      width: 20,
      height: 20
    }),
    regular: createScopedElement(Icon20CheckBoxIndetermanate, {
      "aria-hidden": true,
      width: 24,
      height: 24
    })
  })), createScopedElement("div", {
    vkuiClass: "Checkbox__content"
  }, createScopedElement("div", {
    vkuiClass: "Checkbox__children"
  }, children), hasReactNode(description) && createScopedElement(Footnote, {
    vkuiClass: "Checkbox__description"
  }, description)));
}; // eslint-disable-next-line import/no-default-export

export default Checkbox;
//# sourceMappingURL=Checkbox.js.map