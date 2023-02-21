import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["type", "align", "getRef", "className", "getRootRef", "style", "before", "after", "status"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { SizeType } from '../../lib/adaptivity';
import { FormField } from '../FormField/FormField';
import "./Input.module.css";
var sizeYClassNames = _defineProperty({
  none: "vkuiInput--sizeY-none"
}, SizeType.COMPACT, "vkuiInput--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Input
 */
export var Input = function Input(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'text' : _ref$type,
    align = _ref.align,
    getRef = _ref.getRef,
    className = _ref.className,
    getRootRef = _ref.getRootRef,
    style = _ref.style,
    before = _ref.before,
    after = _ref.after,
    status = _ref.status,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  return /*#__PURE__*/React.createElement(FormField, {
    style: style,
    className: classNames("vkuiInput", align && styles["Input--align-".concat(align)], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], before && "vkuiInput--hasBefore", after && "vkuiInput--hasAfter", className),
    getRootRef: getRootRef,
    before: before,
    after: after,
    disabled: restProps.disabled,
    status: status
  }, /*#__PURE__*/React.createElement("input", _extends({}, restProps, {
    type: type,
    className: "vkuiInput__el",
    ref: getRef
  })));
};
var styles = {
  "Input--align-center": "vkuiInput--align-center",
  "Input--align-right": "vkuiInput--align-right",
  "Input--align-left": "vkuiInput--align-left"
};
//# sourceMappingURL=Input.js.map