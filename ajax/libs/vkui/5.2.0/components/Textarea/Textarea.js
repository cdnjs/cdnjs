import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["defaultValue", "grow", "style", "onResize", "className", "getRootRef", "getRef", "rows", "maxHeight", "status", "onChange", "value"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { FormField } from '../FormField/FormField';
import { useEnsuredControl } from '../../hooks/useEnsuredControl';
import { useExternRef } from '../../hooks/useExternRef';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
/**
 * @see https://vkcom.github.io/VKUI/#/Textarea
 */
export var Textarea = function Textarea(_ref) {
  var _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? '' : _ref$defaultValue,
    _ref$grow = _ref.grow,
    grow = _ref$grow === void 0 ? true : _ref$grow,
    style = _ref.style,
    onResize = _ref.onResize,
    className = _ref.className,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    _ref$rows = _ref.rows,
    rows = _ref$rows === void 0 ? 2 : _ref$rows,
    maxHeight = _ref.maxHeight,
    status = _ref.status,
    onChangeProp = _ref.onChange,
    valueProp = _ref.value,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useEnsuredControl = useEnsuredControl({
      defaultValue: defaultValue,
      onChange: onChangeProp,
      value: valueProp
    }),
    _useEnsuredControl2 = _slicedToArray(_useEnsuredControl, 2),
    value = _useEnsuredControl2[0],
    onChange = _useEnsuredControl2[1];
  var currentScrollHeight = React.useRef();
  var elementRef = useExternRef(getRef);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;

  // autosize input
  React.useEffect(function () {
    var el = elementRef.current;
    if (grow && el !== null && el !== void 0 && el.offsetParent) {
      el.style.height = '';
      el.style.height = "".concat(el.scrollHeight, "px");
      if (el.scrollHeight !== currentScrollHeight.current && onResize) {
        onResize(el);
        currentScrollHeight.current = el.scrollHeight;
      }
    }
  }, [grow, value, sizeY, elementRef, onResize]);
  return /*#__PURE__*/React.createElement(FormField, {
    className: classNames("vkuiTextarea", getSizeYClassName("vkuiTextarea", sizeY), className),
    style: style,
    getRootRef: getRootRef,
    disabled: restProps.disabled,
    status: status
  }, /*#__PURE__*/React.createElement("textarea", _extends({}, restProps, {
    style: {
      maxHeight: maxHeight
    },
    rows: rows,
    className: "vkuiTextarea__el",
    value: value,
    onChange: onChange,
    ref: elementRef
  })));
};
//# sourceMappingURL=Textarea.js.map