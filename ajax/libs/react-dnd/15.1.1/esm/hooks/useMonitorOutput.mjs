import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect.mjs';
import { useCollector } from './useCollector.mjs';
export function useMonitorOutput(monitor, collect, onCollect) {
    const [collected, updateCollected] = useCollector(monitor, collect, onCollect);
    useIsomorphicLayoutEffect(function subscribeToMonitorStateChange() {
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

//# sourceMappingURL=useMonitorOutput.mjs.map