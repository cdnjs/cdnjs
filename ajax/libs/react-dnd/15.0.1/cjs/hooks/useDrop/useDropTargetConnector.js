"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDropTargetConnector = void 0;
const react_1 = require("react");
const internals_1 = require("../../internals");
const useDragDropManager_1 = require("../useDragDropManager");
const useIsomorphicLayoutEffect_1 = require("../useIsomorphicLayoutEffect");
function useDropTargetConnector(options) {
    const manager = (0, useDragDropManager_1.useDragDropManager)();
    const connector = (0, react_1.useMemo)(() => new internals_1.TargetConnector(manager.getBackend()), [manager]);
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(() => {
        connector.dropTargetOptions = options || null;
        connector.reconnect();
        return () => connector.disconnectDropTarget();
    }, [options]);
    return connector;
}
exports.useDropTargetConnector = useDropTargetConnector;
