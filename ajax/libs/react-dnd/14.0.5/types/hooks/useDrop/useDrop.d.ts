import { ConnectDropTarget } from '../../types';
import { DropTargetHookSpec, FactoryOrInstance } from '../types';
/**
 * useDropTarget Hook
 * @param spec The drop target specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
export declare function useDrop<DragObject, DropResult, CollectedProps>(specArg: FactoryOrInstance<DropTargetHookSpec<DragObject, DropResult, CollectedProps>>, deps?: unknown[]): [CollectedProps, ConnectDropTarget];
