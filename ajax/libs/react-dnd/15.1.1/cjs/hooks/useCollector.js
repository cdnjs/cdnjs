"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useCollector = useCollector;
var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));
var _react = require("react");
var _useIsomorphicLayoutEffectJs = require("./useIsomorphicLayoutEffect.js");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function useCollector(monitor, collect, onUpdate) {
    const [collected, setCollected] = (0, _react).useState(()=>collect(monitor)
    );
    const updateCollected = (0, _react).useCallback(()=>{
        const nextValue = collect(monitor);
        // This needs to be a deep-equality check because some monitor-collected values
        // include XYCoord objects that may be equivalent, but do not have instance equality.
        if (!(0, _fastDeepEqual).default(collected, nextValue)) {
            setCollected(nextValue);
            if (onUpdate) {
                onUpdate();
            }
        }
    }, [
        collected,
        monitor,
        onUpdate
    ]);
    // update the collected properties after react renders.
    // Note that the "Dustbin Stress Test" fails if this is not
    // done when the component updates
    (0, _useIsomorphicLayoutEffectJs).useIsomorphicLayoutEffect(updateCollected);
    return [
        collected,
        updateCollected
    ];
}

//# sourceMappingURL=useCollector.js.map