"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDrop = void 0;
const useRegisteredDropTarget_1 = require("./useRegisteredDropTarget");
const useOptionalFactory_1 = require("../useOptionalFactory");
const useDropTargetMonitor_1 = require("./useDropTargetMonitor");
const useDropTargetConnector_1 = require("./useDropTargetConnector");
const useCollectedProps_1 = require("../useCollectedProps");
const connectors_1 = require("./connectors");
/**
 * useDropTarget Hook
 * @param spec The drop target specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
function useDrop(specArg, deps) {
    const spec = (0, useOptionalFactory_1.useOptionalFactory)(specArg, deps);
    const monitor = (0, useDropTargetMonitor_1.useDropTargetMonitor)();
    const connector = (0, useDropTargetConnector_1.useDropTargetConnector)(spec.options);
    (0, useRegisteredDropTarget_1.useRegisteredDropTarget)(spec, monitor, connector);
    return [
        (0, useCollectedProps_1.useCollectedProps)(spec.collect, monitor, connector),
        (0, connectors_1.useConnectDropTarget)(connector),
    ];
}
exports.useDrop = useDrop;
