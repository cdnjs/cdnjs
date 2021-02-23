"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDragSourceMonitor = useDragSourceMonitor;

var _react = require("react");

var _internals = require("../../internals");

function useDragSourceMonitor(manager) {
  var monitor = (0, _react.useMemo)(function () {
    return new _internals.DragSourceMonitorImpl(manager);
  }, [manager]);
  var connector = (0, _react.useMemo)(function () {
    return new _internals.SourceConnector(manager.getBackend());
  }, [manager]);
  return [monitor, connector];
}