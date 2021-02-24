import { invariant } from '@react-dnd/invariant';
import { useRegisteredDropTarget } from './useRegisteredDropTarget';
import { useOptionalFactory } from '../useOptionalFactory';
import { useDropTargetMonitor } from './useDropTargetMonitor';
import { useDropTargetConnector } from './useDropTargetConnector';
import { useCollectedProps } from '../useCollectedProps';
import { useConnectDropTarget } from './connectors';
/**
 * useDropTarget Hook
 * @param spec The drop target specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */

export function useDrop(specArg, deps) {
  var spec = useOptionalFactory(specArg, deps);
  invariant(spec.accept != null, 'accept must be defined');
  var monitor = useDropTargetMonitor();
  var connector = useDropTargetConnector(spec.options);
  useRegisteredDropTarget(spec, monitor, connector);
  return [useCollectedProps(spec.collect, monitor, connector), useConnectDropTarget(connector)];
}