"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormControl;

var React = _interopRequireWildcard(require("react"));

var _FormControlContext = _interopRequireDefault(require("./FormControlContext"));

function useFormControl() {
  return React.useContext(_FormControlContext.default);
}