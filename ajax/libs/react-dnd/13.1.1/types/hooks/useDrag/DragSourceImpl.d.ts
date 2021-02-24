import { DragDropMonitor, DragSource, Identifier } from 'dnd-core';
import { Connector } from '../../internals';
import { DragSourceMonitor } from '../../types';
import { DragObjectWithType, DragSourceHookSpec } from '../types';
export declare class DragSourceImpl<O extends DragObjectWithType, R, P> implements DragSource {
    spec: DragSourceHookSpec<O, R, P>;
    private monitor;
    private connector;
    constructor(spec: DragSourceHookSpec<O, R, P>, monitor: DragSourceMonitor, connector: Connector);
    beginDrag(): void | {};
    canDrag(): boolean;
    isDragging(globalMonitor: DragDropMonitor, target: Identifier): boolean;
    endDrag(): void;
}
