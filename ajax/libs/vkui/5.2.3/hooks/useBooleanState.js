import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';
export var useBooleanState = function useBooleanState() {
  var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var _React$useState = React.useState(defaultValue),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    value = _React$useState2[0],
    setValue = _React$useState2[1];
  var setTrue = React.useCallback(function () {
    setValue(true);
  }, []);
  var setFalse = React.useCallback(function () {
    setValue(false);
  }, []);
  var toggle = React.useCallback(function () {
    setValue(!value);
  }, [value]);
  return {
    value: value,
    setTrue: setTrue,
    setFalse: setFalse,
    toggle: toggle
  };
};
//# sourceMappingURL=useBooleanState.js.map