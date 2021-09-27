import { DragDropMonitor, DragSource, Identifier } from 'dnd-core';
import { Connector } from '../../internals';
import { DragSourceMonitor } from '../../types';
import { DragSourceHookSpec } from '../types';
export declare class DragSourceImpl<O, R, P> implements DragSource {
    spec: DragSourceHookSpec<O, R, P>;
    private monitor;
    private connector;
    constructor(spec: DragSourceHookSpec<O, R, P>, monitor: DragSourceMonitor<O, R>, connector: Connector);
    beginDrag(): NonNullable<O> | null;
    canDrag(): boolean;
    isDragging(globalMonitor: DragDropMonitor, target: Identifier): boolean;
    endDrag(): void;
}
