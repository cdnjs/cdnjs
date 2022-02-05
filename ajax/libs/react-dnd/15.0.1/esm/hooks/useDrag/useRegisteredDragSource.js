import { registerSource } from '../../internals';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { useDragSource } from './useDragSource';
import { useDragDropManager } from '../useDragDropManager';
import { useDragType } from './useDragType';
export function useRegisteredDragSource(spec, monitor, connector) {
    const manager = useDragDropManager();
    const handler = useDragSource(spec, monitor, connector);
    const itemType = useDragType(spec);
    useIsomorphicLayoutEffect(function registerDragSource() {
        if (itemType != null) {
            const [handlerId, unregister] = registerSource(itemType, handler, manager);
            monitor.receiveHandlerId(handlerId);
            connector.receiveHandlerId(handlerId);
            return unregister;
        }
        return;
    }, [manager, monitor, connector, handler, itemType]);
}
