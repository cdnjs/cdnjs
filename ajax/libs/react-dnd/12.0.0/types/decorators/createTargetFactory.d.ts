import { RefObject } from 'react';
import { DropTarget } from 'dnd-core';
import { DropTargetMonitor } from '../types';
import { DropTargetSpec } from './types';
export interface Target extends DropTarget {
    receiveProps(props: any): void;
    receiveMonitor(monitor: any): void;
}
export declare function createTargetFactory<Props>(spec: DropTargetSpec<Props>): (monitor: DropTargetMonitor, ref: RefObject<any>) => Target;
