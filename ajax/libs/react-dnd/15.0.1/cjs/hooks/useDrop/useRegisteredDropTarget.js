"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRegisteredDropTarget = void 0;
const internals_1 = require("../../internals");
const useDragDropManager_1 = require("../useDragDropManager");
const useIsomorphicLayoutEffect_1 = require("../useIsomorphicLayoutEffect");
const useAccept_1 = require("./useAccept");
const useDropTarget_1 = require("./useDropTarget");
function useRegisteredDropTarget(spec, monitor, connector) {
    const manager = (0, useDragDropManager_1.useDragDropManager)();
    const dropTarget = (0, useDropTarget_1.useDropTarget)(spec, monitor);
    const accept = (0, useAccept_1.useAccept)(spec);
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(function registerDropTarget() {
        const [handlerId, unregister] = (0, internals_1.registerTarget)(accept, dropTarget, manager);
        monitor.receiveHandlerId(handlerId);
        connector.receiveHandlerId(handlerId);
        return unregister;
    }, [
        manager,
        monitor,
        dropTarget,
        connector,
        accept.map((a) => a.toString()).join('|'),
    ]);
}
exports.useRegisteredDropTarget = useRegisteredDropTarget;
