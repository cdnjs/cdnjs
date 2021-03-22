"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDropTarget = useDropTarget;

var _react = require("react");

var _DropTargetImpl = require("./DropTargetImpl");

function useDropTarget(spec, monitor) {
  var dropTarget = (0, _react.useMemo)(function () {
    return new _DropTargetImpl.DropTargetImpl(spec, monitor);
  }, [monitor]);
  (0, _react.useEffect)(function () {
    dropTarget.spec = spec;
  }, [spec]);
  return dropTarget;
}