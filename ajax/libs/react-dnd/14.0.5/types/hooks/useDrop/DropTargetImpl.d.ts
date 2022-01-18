import { DropTarget } from 'dnd-core';
import { DropTargetMonitor } from '../../types';
import { DropTargetHookSpec } from '../types';
export declare class DropTargetImpl<O, R, P> implements DropTarget {
    spec: DropTargetHookSpec<O, R, P>;
    private monitor;
    constructor(spec: DropTargetHookSpec<O, R, P>, monitor: DropTargetMonitor<O, R>);
    canDrop(): boolean;
    hover(): void;
    drop(): R | undefined;
}
