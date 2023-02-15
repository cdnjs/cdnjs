import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["type", "align", "getRef", "className", "getRootRef", "style", "before", "after", "status"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { FormField } from '../FormField/FormField';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import { useAdaptivity } from '../../hooks/useAdaptivity';
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
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(FormField, {
    style: style,
    className: classNames("vkuiInput", align && styles["Input--align-".concat(align)], getSizeYClassName("vkuiInput", sizeY), before && "vkuiInput--hasBefore", after && "vkuiInput--hasAfter", className),
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