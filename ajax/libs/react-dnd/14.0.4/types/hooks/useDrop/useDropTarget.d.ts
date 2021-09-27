import { DropTargetMonitor } from '../../types';
import { DropTargetHookSpec } from '../types';
import { DropTargetImpl } from './DropTargetImpl';
export declare function useDropTarget<O, R, P>(spec: DropTargetHookSpec<O, R, P>, monitor: DropTargetMonitor<O, R>): DropTargetImpl<O, R, P>;
