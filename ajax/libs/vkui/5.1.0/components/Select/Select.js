import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["selectType", "children", "className"],
  _excluded2 = ["children", "options", "popupDirection", "renderOption", "className"];
import * as React from 'react';
import { NativeSelect } from '../NativeSelect/NativeSelect';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { usePlatform } from '../../hooks/usePlatform';
import { classNames } from '@vkontakte/vkjs';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
/**
 * @see https://vkcom.github.io/VKUI/#/SelectTypography
 */
export var SelectTypography = function SelectTypography(_ref) {
  var _ref$selectType = _ref.selectType,
    selectType = _ref$selectType === void 0 ? 'default' : _ref$selectType,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classNames("vkuiSelectTypography", getPlatformClassName("vkuiSelectTypography", platform), getSizeYClassName("vkuiSelectTypography", sizeY), styles["SelectTypography--selectType-".concat(selectType)], className)
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
    className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded2);
  var hasPointer = useAdaptivityHasPointer();
  return /*#__PURE__*/React.createElement(React.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/React.createElement(CustomSelect, _extends({
    className: classNames("vkuiSelect__custom", className),
    options: options,
    popupDirection: popupDirection,
    renderOption: renderOption
  }, props)), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/React.createElement(NativeSelect, _extends({
    className: classNames("vkuiSelect__native", className)
  }, props), options.map(function (_ref3) {
    var label = _ref3.label,
      value = _ref3.value;
    return /*#__PURE__*/React.createElement("option", {
      value: value,
      key: "".concat(value)
    }, label);
  })));
};
var styles = {
  "SelectTypography--selectType-accent": "vkuiSelectTypography--selectType-accent",
  "SelectTypography--selectType-default": "vkuiSelectTypography--selectType-default",
  "SelectTypography--selectType-plain": "vkuiSelectTypography--selectType-plain"
};
//# sourceMappingURL=Select.js.map