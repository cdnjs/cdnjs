"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DndContext = void 0;

var _react = require("react");

/**
 * Create the React Context
 */
var DndContext = (0, _react.createContext)({
  dragDropManager: undefined
});
exports.DndContext = DndContext;