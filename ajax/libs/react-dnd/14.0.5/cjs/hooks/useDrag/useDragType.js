"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDragType = useDragType;

var _invariant = require("@react-dnd/invariant");

var _react = require("react");

function useDragType(spec) {
  return (0, _react.useMemo)(function () {
    var result = spec.type;
    (0, _invariant.invariant)(result != null, 'spec.type must be defined');
    return result;
  }, [spec]);
}