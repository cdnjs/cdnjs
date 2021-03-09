import { useRegisteredDragSource } from './useRegisteredDragSource';
import { useOptionalFactory } from '../useOptionalFactory';
import { useDragSourceMonitor } from './useDragSourceMonitor';
import { useDragSourceConnector } from './useDragSourceConnector';
import { useCollectedProps } from '../useCollectedProps';
import { useConnectDragPreview, useConnectDragSource } from './connectors';
/**
 * useDragSource hook
 * @param sourceSpec The drag source specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */

export function useDrag(specArg, deps) {
  var spec = useOptionalFactory(specArg, deps);
  var monitor = useDragSourceMonitor();
  var connector = useDragSourceConnector(spec.options, spec.previewOptions);
  useRegisteredDragSource(spec, monitor, connector);
  return [useCollectedProps(spec.collect, monitor, connector), useConnectDragSource(connector), useConnectDragPreview(connector)];
}