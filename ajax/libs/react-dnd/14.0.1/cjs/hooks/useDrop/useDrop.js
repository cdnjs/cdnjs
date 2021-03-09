"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDrop = useDrop;

var _useRegisteredDropTarget = require("./useRegisteredDropTarget");

var _useOptionalFactory = require("../useOptionalFactory");

var _useDropTargetMonitor = require("./useDropTargetMonitor");

var _useDropTargetConnector = require("./useDropTargetConnector");

var _useCollectedProps = require("../useCollectedProps");

var _connectors = require("./connectors");

/**
 * useDropTarget Hook
 * @param spec The drop target specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
function useDrop(specArg, deps) {
  var spec = (0, _useOptionalFactory.useOptionalFactory)(specArg, deps);
  var monitor = (0, _useDropTargetMonitor.useDropTargetMonitor)();
  var connector = (0, _useDropTargetConnector.useDropTargetConnector)(spec.options);
  (0, _useRegisteredDropTarget.useRegisteredDropTarget)(spec, monitor, connector);
  return [(0, _useCollectedProps.useCollectedProps)(spec.collect, monitor, connector), (0, _connectors.useConnectDropTarget)(connector)];
}