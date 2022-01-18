import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';
export function useEnsuredControl(props, options) {
  var isControlled = props.hasOwnProperty('value');

  var _React$useState = React.useState(options.defaultValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      localValue = _React$useState2[0],
      setLocalValue = _React$useState2[1];

  var onChange = React.useCallback(function (e) {
    !isControlled && setLocalValue(e.target.value);
    props.onChange && props.onChange(e);
  }, [props.onChange]);
  return [isControlled ? props.value : localValue, onChange];
}
//# sourceMappingURL=useEnsuredControl.js.map