import { DropTarget } from 'dnd-core';
import { DropTargetMonitor } from '../../types';
import { DragObjectWithType, DropTargetHookSpec } from '../types';
export declare class DropTargetImpl<O extends DragObjectWithType, R, P> implements DropTarget {
    spec: DropTargetHookSpec<O, R, P>;
    private monitor;
    constructor(spec: DropTargetHookSpec<O, R, P>, monitor: DropTargetMonitor);
    canDrop(): boolean;
    hover(): void;
    drop(): R | undefined;
}
