import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["selectType", "children"],
    _excluded2 = ["children", "options", "popupDirection", "renderOption"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { NativeSelect } from "../NativeSelect/NativeSelect";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import { getMouseClassName } from "../../helpers/getMouseClassName";

/**
 * @see https://vkcom.github.io/VKUI/#/SelectTypography
 */
export var SelectTypography = function SelectTypography(_ref) {
  var _ref$selectType = _ref.selectType,
      selectType = _ref$selectType === void 0 ? "default" : _ref$selectType,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  return createScopedElement("span", _extends({
    vkuiClass: classNames(getClassName("SelectTypography", platform), getSizeYClassName("SelectTypography", sizeY), "SelectTypography--selectType-".concat(selectType))
  }, restProps), children);
};
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */

export var Select = function Select(_ref2) {
  var children = _ref2.children,
      _ref2$options = _ref2.options,
      options = _ref2$options === void 0 ? [] : _ref2$options,
      popupDirection = _ref2.popupDirection,
      renderOption = _ref2.renderOption,
      props = _objectWithoutProperties(_ref2, _excluded2);

  var _useAdaptivity2 = useAdaptivity(),
      hasMouse = _useAdaptivity2.hasMouse;

  return createScopedElement(React.Fragment, null, (hasMouse === undefined || hasMouse === true) && createScopedElement(CustomSelect, _extends({
    vkuiClass: classNames("Select__custom", getMouseClassName("Select__custom", hasMouse)),
    options: options,
    popupDirection: popupDirection,
    renderOption: renderOption
  }, props)), (hasMouse === undefined || hasMouse === false) && createScopedElement(NativeSelect, _extends({
    vkuiClass: classNames("Select__native", getMouseClassName("Select__native", hasMouse))
  }, props), options.map(function (_ref3) {
    var label = _ref3.label,
        value = _ref3.value;
    return createScopedElement("option", {
      value: value,
      key: "".concat(value)
    }, label);
  })));
};
//# sourceMappingURL=Select.js.map