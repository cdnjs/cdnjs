"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDrag = void 0;
const useRegisteredDragSource_1 = require("./useRegisteredDragSource");
const useOptionalFactory_1 = require("../useOptionalFactory");
const useDragSourceMonitor_1 = require("./useDragSourceMonitor");
const useDragSourceConnector_1 = require("./useDragSourceConnector");
const useCollectedProps_1 = require("../useCollectedProps");
const connectors_1 = require("./connectors");
const invariant_1 = require("@react-dnd/invariant");
/**
 * useDragSource hook
 * @param sourceSpec The drag source specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
function useDrag(specArg, deps) {
    const spec = (0, useOptionalFactory_1.useOptionalFactory)(specArg, deps);
    (0, invariant_1.invariant)(!spec.begin, `useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)`);
    const monitor = (0, useDragSourceMonitor_1.useDragSourceMonitor)();
    const connector = (0, useDragSourceConnector_1.useDragSourceConnector)(spec.options, spec.previewOptions);
    (0, useRegisteredDragSource_1.useRegisteredDragSource)(spec, monitor, connector);
    return [
        (0, useCollectedProps_1.useCollectedProps)(spec.collect, monitor, connector),
        (0, connectors_1.useConnectDragSource)(connector),
        (0, connectors_1.useConnectDragPreview)(connector),
    ];
}
exports.useDrag = useDrag;
