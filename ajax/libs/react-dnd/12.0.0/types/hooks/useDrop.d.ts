import { ConnectDropTarget } from '../types';
import { DropTargetHookSpec, DragObjectWithType } from './types';
/**
 * useDropTarget Hook
 * @param spec The drop target specification
 */
export declare function useDrop<DragObject extends DragObjectWithType, DropResult, CollectedProps>(spec: DropTargetHookSpec<DragObject, DropResult, CollectedProps>): [CollectedProps, ConnectDropTarget];
