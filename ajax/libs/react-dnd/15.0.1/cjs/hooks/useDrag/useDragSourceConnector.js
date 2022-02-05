"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDragSourceConnector = void 0;
const react_1 = require("react");
const internals_1 = require("../../internals");
const useDragDropManager_1 = require("../useDragDropManager");
const useIsomorphicLayoutEffect_1 = require("../useIsomorphicLayoutEffect");
function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
    const manager = (0, useDragDropManager_1.useDragDropManager)();
    const connector = (0, react_1.useMemo)(() => new internals_1.SourceConnector(manager.getBackend()), [manager]);
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(() => {
        connector.dragSourceOptions = dragSourceOptions || null;
        connector.reconnect();
        return () => connector.disconnectDragSource();
    }, [connector, dragSourceOptions]);
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(() => {
        connector.dragPreviewOptions = dragPreviewOptions || null;
        connector.reconnect();
        return () => connector.disconnectDragPreview();
    }, [connector, dragPreviewOptions]);
    return connector;
}
exports.useDragSourceConnector = useDragSourceConnector;
