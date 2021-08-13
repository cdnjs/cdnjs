"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDragSourceConnector = useDragSourceConnector;

var _react = require("react");

var _internals = require("../../internals");

var _useDragDropManager = require("../useDragDropManager");

var _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");

function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
  var manager = (0, _useDragDropManager.useDragDropManager)();
  var connector = (0, _react.useMemo)(function () {
    return new _internals.SourceConnector(manager.getBackend());
  }, [manager]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    connector.dragSourceOptions = dragSourceOptions || null;
    connector.reconnect();
    return function () {
      return connector.disconnectDragSource();
    };
  }, [connector, dragSourceOptions]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    connector.dragPreviewOptions = dragPreviewOptions || null;
    connector.reconnect();
    return function () {
      return connector.disconnectDragPreview();
    };
  }, [connector, dragPreviewOptions]);
  return connector;
}