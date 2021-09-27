import { RefObject } from 'react';
import { DropTarget } from 'dnd-core';
import { DropTargetMonitor } from '../types';
import { DropTargetSpec } from './types';
export interface Target extends DropTarget {
    receiveProps(props: any): void;
    receiveMonitor(monitor: any): void;
}
export declare function createTargetFactory<Props, DragObject, DropResult>(spec: DropTargetSpec<Props, DragObject, DropResult>): (monitor: DropTargetMonitor<DragObject, DropResult>, ref: RefObject<any>) => Target;
