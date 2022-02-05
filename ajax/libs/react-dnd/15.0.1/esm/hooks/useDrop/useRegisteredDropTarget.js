import { registerTarget } from '../../internals';
import { useDragDropManager } from '../useDragDropManager';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { useAccept } from './useAccept';
import { useDropTarget } from './useDropTarget';
export function useRegisteredDropTarget(spec, monitor, connector) {
    const manager = useDragDropManager();
    const dropTarget = useDropTarget(spec, monitor);
    const accept = useAccept(spec);
    useIsomorphicLayoutEffect(function registerDropTarget() {
        const [handlerId, unregister] = registerTarget(accept, dropTarget, manager);
        monitor.receiveHandlerId(handlerId);
        connector.receiveHandlerId(handlerId);
        return unregister;
    }, [
        manager,
        monitor,
        dropTarget,
        connector,
        accept.map((a) => a.toString()).join('|'),
    ]);
}
