import { useEffect } from 'react';
import { useDragDropManager } from './useDragDropManager';
import { useCollector } from './useCollector';
/**
 * useDragLayer Hook
 * @param collector The property collector
 */
export function useDragLayer(collect) {
    const dragDropManager = useDragDropManager();
    const monitor = dragDropManager.getMonitor();
    const [collected, updateCollected] = useCollector(monitor, collect);
    useEffect(() => monitor.subscribeToOffsetChange(updateCollected));
    useEffect(() => monitor.subscribeToStateChange(updateCollected));
    return collected;
}
