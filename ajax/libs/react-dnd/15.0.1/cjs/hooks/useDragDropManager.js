"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDragDropManager = void 0;
const react_1 = require("react");
const invariant_1 = require("@react-dnd/invariant");
const core_1 = require("../core");
/**
 * A hook to retrieve the DragDropManager from Context
 */
function useDragDropManager() {
    const { dragDropManager } = (0, react_1.useContext)(core_1.DndContext);
    (0, invariant_1.invariant)(dragDropManager != null, 'Expected drag drop context');
    return dragDropManager;
}
exports.useDragDropManager = useDragDropManager;
