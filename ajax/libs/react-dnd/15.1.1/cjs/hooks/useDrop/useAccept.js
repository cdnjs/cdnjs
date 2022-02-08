"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useAccept = useAccept;
var _invariant = require("@react-dnd/invariant");
var _react = require("react");
function useAccept(spec) {
    const { accept  } = spec;
    return (0, _react).useMemo(()=>{
        (0, _invariant).invariant(spec.accept != null, 'accept must be defined');
        return Array.isArray(accept) ? accept : [
            accept
        ];
    }, [
        accept
    ]);
}

//# sourceMappingURL=useAccept.js.map