"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDragType = void 0;
const invariant_1 = require("@react-dnd/invariant");
const react_1 = require("react");
function useDragType(spec) {
    return (0, react_1.useMemo)(() => {
        const result = spec.type;
        (0, invariant_1.invariant)(result != null, 'spec.type must be defined');
        return result;
    }, [spec]);
}
exports.useDragType = useDragType;
