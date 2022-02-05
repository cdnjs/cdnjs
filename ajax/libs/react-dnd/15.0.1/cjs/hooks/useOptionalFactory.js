"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOptionalFactory = void 0;
const react_1 = require("react");
function useOptionalFactory(arg, deps) {
    const memoDeps = [...(deps || [])];
    if (deps == null && typeof arg !== 'function') {
        memoDeps.push(arg);
    }
    return (0, react_1.useMemo)(() => {
        return typeof arg === 'function' ? arg() : arg;
    }, memoDeps);
}
exports.useOptionalFactory = useOptionalFactory;
