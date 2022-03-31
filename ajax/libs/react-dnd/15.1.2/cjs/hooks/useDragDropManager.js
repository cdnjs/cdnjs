"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDragDropManager = useDragDropManager;
var _react = require("react");
var _invariant = require("@react-dnd/invariant");
var _indexJs = require("../core/index.js");
function useDragDropManager() {
    const { dragDropManager  } = (0, _react).useContext(_indexJs.DndContext);
    (0, _invariant).invariant(dragDropManager != null, 'Expected drag drop context');
    return dragDropManager;
}

//# sourceMappingURL=useDragDropManager.js.map