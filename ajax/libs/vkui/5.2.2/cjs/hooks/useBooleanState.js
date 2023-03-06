"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBooleanState = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var useBooleanState = function useBooleanState() {
  var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var _React$useState = React.useState(defaultValue),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
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
exports.useBooleanState = useBooleanState;
//# sourceMappingURL=useBooleanState.js.map