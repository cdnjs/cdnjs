import { DropTargetMonitor } from '../../types';
import { DragObjectWithType, DropTargetHookSpec } from '../types';
import { DropTargetImpl } from './DropTargetImpl';
export declare function useDropTarget<O extends DragObjectWithType, R, P>(spec: DropTargetHookSpec<O, R, P>, monitor: DropTargetMonitor): DropTargetImpl<O, R, P>;
