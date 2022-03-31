"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDropTarget = useDropTarget;
var _react = require("react");
var _dropTargetImplJs = require("./DropTargetImpl.js");
function useDropTarget(spec, monitor) {
    const dropTarget = (0, _react).useMemo(()=>new _dropTargetImplJs.DropTargetImpl(spec, monitor)
    , [
        monitor
    ]);
    (0, _react).useEffect(()=>{
        dropTarget.spec = spec;
    }, [
        spec
    ]);
    return dropTarget;
}

//# sourceMappingURL=useDropTarget.js.map