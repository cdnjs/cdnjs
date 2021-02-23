"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDropTargetMonitor = useDropTargetMonitor;

var _react = require("react");

var _internals = require("../../internals");

function useDropTargetMonitor(manager) {
  var monitor = (0, _react.useMemo)(function () {
    return new _internals.DropTargetMonitorImpl(manager);
  }, [manager]);
  var connector = (0, _react.useMemo)(function () {
    return new _internals.TargetConnector(manager.getBackend());
  }, [manager]);
  return [monitor, connector];
}