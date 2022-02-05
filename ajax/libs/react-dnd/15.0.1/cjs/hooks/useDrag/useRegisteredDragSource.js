"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRegisteredDragSource = void 0;
const internals_1 = require("../../internals");
const useIsomorphicLayoutEffect_1 = require("../useIsomorphicLayoutEffect");
const useDragSource_1 = require("./useDragSource");
const useDragDropManager_1 = require("../useDragDropManager");
const useDragType_1 = require("./useDragType");
function useRegisteredDragSource(spec, monitor, connector) {
    const manager = (0, useDragDropManager_1.useDragDropManager)();
    const handler = (0, useDragSource_1.useDragSource)(spec, monitor, connector);
    const itemType = (0, useDragType_1.useDragType)(spec);
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(function registerDragSource() {
        if (itemType != null) {
            const [handlerId, unregister] = (0, internals_1.registerSource)(itemType, handler, manager);
            monitor.receiveHandlerId(handlerId);
            connector.receiveHandlerId(handlerId);
            return unregister;
        }
        return;
    }, [manager, monitor, connector, handler, itemType]);
}
exports.useRegisteredDragSource = useRegisteredDragSource;
