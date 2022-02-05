"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.useMonitorOutput = useMonitorOutput;
var _useIsomorphicLayoutEffect = require("./useIsomorphicLayoutEffect");
var _useCollector = require("./useCollector");
function useMonitorOutput(monitor, collect, onCollect) {
    const [collected, updateCollected] = (0, _useCollector).useCollector(monitor, collect, onCollect);
    (0, _useIsomorphicLayoutEffect).useIsomorphicLayoutEffect(function subscribeToMonitorStateChange() {
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