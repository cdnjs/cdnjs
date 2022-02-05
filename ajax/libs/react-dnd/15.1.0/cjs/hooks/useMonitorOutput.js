"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useMonitorOutput = useMonitorOutput;
var _useIsomorphicLayoutEffectJs = require("./useIsomorphicLayoutEffect.js");
var _useCollectorJs = require("./useCollector.js");
function useMonitorOutput(monitor, collect, onCollect) {
    const [collected, updateCollected] = (0, _useCollectorJs).useCollector(monitor, collect, onCollect);
    (0, _useIsomorphicLayoutEffectJs).useIsomorphicLayoutEffect(function subscribeToMonitorStateChange() {
        const handlerId = monitor.getHandlerId();
        if (handlerId == null) {
            return;
        }
        return monitor.subscribeToStateChange(updateCollected, {
            handlerIds: [
                handlerId
            ]
        });
    }, [
        monitor,
        updateCollected
    ]);
    return collected;
}

//# sourceMappingURL=useMonitorOutput.js.map