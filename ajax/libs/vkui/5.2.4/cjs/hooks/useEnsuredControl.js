"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCustomEnsuredControl = useCustomEnsuredControl;
exports.useEnsuredControl = useEnsuredControl;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _excluded = ["onChange", "disabled"];
function useEnsuredControl(_ref) {
  var onChangeProp = _ref.onChange,
    disabled = _ref.disabled,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useCustomEnsuredCont = useCustomEnsuredControl(props),
    _useCustomEnsuredCont2 = (0, _slicedToArray2.default)(_useCustomEnsuredCont, 2),
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
function useCustomEnsuredControl(_ref2) {
  var disabled = _ref2.disabled,
    onChangeProp = _ref2.onChange,
    defaultValue = _ref2.defaultValue,
    value = _ref2.value;
  var isControlled = value !== undefined;
  var _React$useState = React.useState(defaultValue),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
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