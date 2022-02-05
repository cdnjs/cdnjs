"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDropTarget = void 0;
const react_1 = require("react");
const DropTargetImpl_1 = require("./DropTargetImpl");
function useDropTarget(spec, monitor) {
    const dropTarget = (0, react_1.useMemo)(() => new DropTargetImpl_1.DropTargetImpl(spec, monitor), [monitor]);
    (0, react_1.useEffect)(() => {
        dropTarget.spec = spec;
    }, [spec]);
    return dropTarget;
}
exports.useDropTarget = useDropTarget;
