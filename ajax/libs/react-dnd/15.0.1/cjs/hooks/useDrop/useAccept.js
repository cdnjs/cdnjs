"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAccept = void 0;
const invariant_1 = require("@react-dnd/invariant");
const react_1 = require("react");
/**
 * Internal utility hook to get an array-version of spec.accept.
 * The main utility here is that we aren't creating a new array on every render if a non-array spec.accept is passed in.
 * @param spec
 */
function useAccept(spec) {
    const { accept } = spec;
    return (0, react_1.useMemo)(() => {
        (0, invariant_1.invariant)(spec.accept != null, 'accept must be defined');
        return Array.isArray(accept) ? accept : [accept];
    }, [accept]);
}
exports.useAccept = useAccept;
