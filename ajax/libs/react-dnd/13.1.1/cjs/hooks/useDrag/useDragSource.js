"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDragSource = useDragSource;

var _react = require("react");

var _DragSourceImpl = require("./DragSourceImpl");

function useDragSource(spec, monitor, connector) {
  var handler = (0, _react.useMemo)(function () {
    return new _DragSourceImpl.DragSourceImpl(spec, monitor, connector);
  }, [monitor, connector]);
  (0, _react.useEffect)(function () {
    handler.spec = spec;
  }, [spec]);
  return handler;
}