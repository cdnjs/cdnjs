import { registerTarget } from '../../internals/index.mjs';
import { useDragDropManager } from '../useDragDropManager.mjs';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect.mjs';
import { useAccept } from './useAccept.mjs';
import { useDropTarget } from './useDropTarget.mjs';
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
        accept.map((a)=>a.toString()
        ).join('|'), 
    ]);
}

//# sourceMappingURL=useRegisteredDropTarget.mjs.map