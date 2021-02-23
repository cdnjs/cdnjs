import { ConnectDropTarget } from '../../types';
import { DropTargetHookSpec, DragObjectWithType } from '../types';
/**
 * useDropTarget Hook
 * @param spec The drop target specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
export declare function useDrop<DragObject extends DragObjectWithType, DropResult, CollectedProps>(specFn: () => DropTargetHookSpec<DragObject, DropResult, CollectedProps>, deps?: unknown[]): [CollectedProps, ConnectDropTarget];
