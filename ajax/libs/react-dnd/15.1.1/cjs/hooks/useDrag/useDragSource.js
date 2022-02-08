"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useDragSource = useDragSource;
var _react = require("react");
var _dragSourceImplJs = require("./DragSourceImpl.js");
function useDragSource(spec, monitor, connector) {
    const handler = (0, _react).useMemo(()=>new _dragSourceImplJs.DragSourceImpl(spec, monitor, connector)
    , [
        monitor,
        connector
    ]);
    (0, _react).useEffect(()=>{
        handler.spec = spec;
    }, [
        spec
    ]);
    return handler;
}

//# sourceMappingURL=useDragSource.js.map