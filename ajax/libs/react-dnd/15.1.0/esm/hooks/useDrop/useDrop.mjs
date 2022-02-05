import { useRegisteredDropTarget } from './useRegisteredDropTarget.mjs';
import { useOptionalFactory } from '../useOptionalFactory.mjs';
import { useDropTargetMonitor } from './useDropTargetMonitor.mjs';
import { useDropTargetConnector } from './useDropTargetConnector.mjs';
import { useCollectedProps } from '../useCollectedProps.mjs';
import { useConnectDropTarget } from './connectors.mjs';
/**
 * useDropTarget Hook
 * @param spec The drop target specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */ export function useDrop(specArg, deps) {
    const spec = useOptionalFactory(specArg, deps);
    const monitor = useDropTargetMonitor();
    const connector = useDropTargetConnector(spec.options);
    useRegisteredDropTarget(spec, monitor, connector);
    return [
        useCollectedProps(spec.collect, monitor, connector),
        useConnectDropTarget(connector), 
    ];
}

//# sourceMappingURL=useDrop.mjs.map