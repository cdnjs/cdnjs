import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["onChange", "disabled"];
import * as React from 'react';
export function useEnsuredControl(_ref) {
  var onChangeProp = _ref.onChange,
    disabled = _ref.disabled,
    props = _objectWithoutProperties(_ref, _excluded);
  var _useCustomEnsuredCont = useCustomEnsuredControl(props),
    _useCustomEnsuredCont2 = _slicedToArray(_useCustomEnsuredCont, 2),
    value = _useCustomEnsuredCont2[0],
    onChangeValue = _useCustomEnsuredCont2[1];
  var onChange = React.useCallback(function (e) {
    if (disabled) {
      return;
    }
    onChangeValue(e.target.value);
    onChangeProp && onChangeProp(e);
  }, [onChangeValue, onChangeProp, disabled]);
  return [value, onChange];
}
export function useCustomEnsuredControl(_ref2) {
  var disabled = _ref2.disabled,
    onChangeProp = _ref2.onChange,
    defaultValue = _ref2.defaultValue,
    value = _ref2.value;
  var isControlled = value !== undefined;
  var _React$useState = React.useState(defaultValue),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    localValue = _React$useState2[0],
    setLocalValue = _React$useState2[1];
  var onChange = React.useCallback(function (v) {
    if (disabled) {
      return;
    }
    !isControlled && setLocalValue(v);
    onChangeProp && onChangeProp(v);
  }, [disabled, isControlled, onChangeProp]);
  return [isControlled ? value : localValue, onChange];
}
//# sourceMappingURL=useEnsuredControl.js.map