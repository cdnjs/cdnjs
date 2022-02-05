"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDragSource = void 0;
const react_1 = require("react");
const DragSourceImpl_1 = require("./DragSourceImpl");
function useDragSource(spec, monitor, connector) {
    const handler = (0, react_1.useMemo)(() => new DragSourceImpl_1.DragSourceImpl(spec, monitor, connector), [monitor, connector]);
    (0, react_1.useEffect)(() => {
        handler.spec = spec;
    }, [spec]);
    return handler;
}
exports.useDragSource = useDragSource;
