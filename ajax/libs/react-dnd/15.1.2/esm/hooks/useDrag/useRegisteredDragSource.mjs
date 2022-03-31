import { registerSource } from '../../internals/index.mjs';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect.mjs';
import { useDragSource } from './useDragSource.mjs';
import { useDragDropManager } from '../useDragDropManager.mjs';
import { useDragType } from './useDragType.mjs';
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
    }, [
        manager,
        monitor,
        connector,
        handler,
        itemType
    ]);
}

//# sourceMappingURL=useRegisteredDragSource.mjs.map