import { useRegisteredDragSource } from './useRegisteredDragSource.mjs';
import { useOptionalFactory } from '../useOptionalFactory.mjs';
import { useDragSourceMonitor } from './useDragSourceMonitor.mjs';
import { useDragSourceConnector } from './useDragSourceConnector.mjs';
import { useCollectedProps } from '../useCollectedProps.mjs';
import { useConnectDragPreview, useConnectDragSource } from './connectors.mjs';
import { invariant } from '@react-dnd/invariant';
/**
 * useDragSource hook
 * @param sourceSpec The drag source specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */ export function useDrag(specArg, deps) {
    const spec = useOptionalFactory(specArg, deps);
    invariant(!spec.begin, `useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)`);
    const monitor = useDragSourceMonitor();
    const connector = useDragSourceConnector(spec.options, spec.previewOptions);
    useRegisteredDragSource(spec, monitor, connector);
    return [
        useCollectedProps(spec.collect, monitor, connector),
        useConnectDragSource(connector),
        useConnectDragPreview(connector), 
    ];
}

//# sourceMappingURL=useDrag.mjs.map