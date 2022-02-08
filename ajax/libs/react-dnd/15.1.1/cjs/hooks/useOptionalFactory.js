"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useOptionalFactory = useOptionalFactory;
var _react = require("react");
function useOptionalFactory(arg, deps) {
    const memoDeps = [
        ...deps || []
    ];
    if (deps == null && typeof arg !== 'function') {
        memoDeps.push(arg);
    }
    return (0, _react).useMemo(()=>{
        return typeof arg === 'function' ? arg() : arg;
    }, memoDeps);
}

//# sourceMappingURL=useOptionalFactory.js.map