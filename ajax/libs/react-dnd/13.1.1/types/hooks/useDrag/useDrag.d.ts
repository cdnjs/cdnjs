import { ConnectDragSource, ConnectDragPreview } from '../../types';
import { DragSourceHookSpec, DragObjectWithType, FactoryOrInstance } from '../types';
/**
 * useDragSource hook
 * @param sourceSpec The drag source specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
export declare function useDrag<DragObject extends DragObjectWithType, DropResult, CollectedProps>(specArg: FactoryOrInstance<DragSourceHookSpec<DragObject, DropResult, CollectedProps>>, deps?: unknown[]): [CollectedProps, ConnectDragSource, ConnectDragPreview];
