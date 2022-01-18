"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDropTargetConnector = useDropTargetConnector;

var _react = require("react");

var _internals = require("../../internals");

var _useDragDropManager = require("../useDragDropManager");

var _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");

function useDropTargetConnector(options) {
  var manager = (0, _useDragDropManager.useDragDropManager)();
  var connector = (0, _react.useMemo)(function () {
    return new _internals.TargetConnector(manager.getBackend());
  }, [manager]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    connector.dropTargetOptions = options || null;
    connector.reconnect();
    return function () {
      return connector.disconnectDropTarget();
    };
  }, [options]);
  return connector;
}