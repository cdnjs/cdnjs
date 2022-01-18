"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEnsuredControl = useEnsuredControl;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

function useEnsuredControl(props, options) {
  var isControlled = props.hasOwnProperty('value');

  var _React$useState = React.useState(options.defaultValue),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      localValue = _React$useState2[0],
      setLocalValue = _React$useState2[1];

  var onChange = React.useCallback(function (e) {
    !isControlled && setLocalValue(e.target.value);
    props.onChange && props.onChange(e);
  }, [props.onChange]);
  return [isControlled ? props.value : localValue, onChange];
}
//# sourceMappingURL=useEnsuredControl.js.map