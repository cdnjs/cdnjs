"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DndContext = void 0;
const react_1 = require("react");
/**
 * Create the React Context
 */
exports.DndContext = (0, react_1.createContext)({
    dragDropManager: undefined,
});
