import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "options", "popupDirection", "renderOption", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { NativeSelect } from '../NativeSelect/NativeSelect';
import "./Select.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */
export var Select = function Select(_ref) {
  var children = _ref.children,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    popupDirection = _ref.popupDirection,
    renderOption = _ref.renderOption,
    className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded);
  var hasPointer = useAdaptivityHasPointer();
  return /*#__PURE__*/React.createElement(React.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/React.createElement(CustomSelect, _extends({
    className: classNames("vkuiSelect__custom", className),
    options: options,
    popupDirection: popupDirection,
    renderOption: renderOption
  }, props)), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/React.createElement(NativeSelect, _extends({
    className: classNames("vkuiSelect__native", className)
  }, props), options.map(function (_ref2) {
    var label = _ref2.label,
      value = _ref2.value;
    return /*#__PURE__*/React.createElement("option", {
      value: value,
      key: "".concat(value)
    }, label);
  })));
};
//# sourceMappingURL=Select.js.map