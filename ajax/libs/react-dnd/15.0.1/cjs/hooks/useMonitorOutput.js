"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMonitorOutput = void 0;
const useIsomorphicLayoutEffect_1 = require("./useIsomorphicLayoutEffect");
const useCollector_1 = require("./useCollector");
function useMonitorOutput(monitor, collect, onCollect) {
    const [collected, updateCollected] = (0, useCollector_1.useCollector)(monitor, collect, onCollect);
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(function subscribeToMonitorStateChange() {
        const handlerId = monitor.getHandlerId();
        if (handlerId == null) {
            return;
        }
        return monitor.subscribeToStateChange(updateCollected, {
            handlerIds: [handlerId],
        });
    }, [monitor, updateCollected]);
    return collected;
}
exports.useMonitorOutput = useMonitorOutput;
