"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDragType = useDragType;

var _invariant = require("@react-dnd/invariant");

var _react = require("react");

function useDragType(spec) {
  return (0, _react.useMemo)(function () {
    var _ref, _spec$type, _spec$item;

    var result = (_ref = (_spec$type = spec.type) !== null && _spec$type !== void 0 ? _spec$type : (_spec$item = spec.item) === null || _spec$item === void 0 ? void 0 : _spec$item.type) !== null && _ref !== void 0 ? _ref : null;
    (0, _invariant.invariant)(result != null, 'spec.type or spec.item.type must be defined');
    return result;
  }, [spec]);
}