"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDrag = useDrag;

var _useRegisteredDragSource = require("./useRegisteredDragSource");

var _useOptionalFactory = require("../useOptionalFactory");

var _useDragSourceMonitor = require("./useDragSourceMonitor");

var _useDragSourceConnector = require("./useDragSourceConnector");

var _useCollectedProps = require("../useCollectedProps");

var _connectors = require("./connectors");

/**
 * useDragSource hook
 * @param sourceSpec The drag source specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
function useDrag(specArg, deps) {
  var spec = (0, _useOptionalFactory.useOptionalFactory)(specArg, deps);
  var monitor = (0, _useDragSourceMonitor.useDragSourceMonitor)();
  var connector = (0, _useDragSourceConnector.useDragSourceConnector)(spec.options, spec.previewOptions);
  (0, _useRegisteredDragSource.useRegisteredDragSource)(spec, monitor, connector);
  return [(0, _useCollectedProps.useCollectedProps)(spec.collect, monitor, connector), (0, _connectors.useConnectDragSource)(connector), (0, _connectors.useConnectDragPreview)(connector)];
}