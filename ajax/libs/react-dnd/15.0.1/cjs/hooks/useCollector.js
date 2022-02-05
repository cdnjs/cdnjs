"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCollector = void 0;
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const react_1 = require("react");
const useIsomorphicLayoutEffect_1 = require("./useIsomorphicLayoutEffect");
/**
 *
 * @param monitor The monitor to collect state from
 * @param collect The collecting function
 * @param onUpdate A method to invoke when updates occur
 */
function useCollector(monitor, collect, onUpdate) {
    const [collected, setCollected] = (0, react_1.useState)(() => collect(monitor));
    const updateCollected = (0, react_1.useCallback)(() => {
        const nextValue = collect(monitor);
        // This needs to be a deep-equality check because some monitor-collected values
        // include XYCoord objects that may be equivalent, but do not have instance equality.
        if (!(0, fast_deep_equal_1.default)(collected, nextValue)) {
            setCollected(nextValue);
            if (onUpdate) {
                onUpdate();
            }
        }
    }, [collected, monitor, onUpdate]);
    // update the collected properties after react renders.
    // Note that the "Dustbin Stress Test" fails if this is not
    // done when the component updates
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(updateCollected);
    return [collected, updateCollected];
}
exports.useCollector = useCollector;
