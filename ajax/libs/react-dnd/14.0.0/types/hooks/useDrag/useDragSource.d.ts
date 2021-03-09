import { Connector } from '../../internals';
import { DragSourceMonitor } from '../../types';
import { DragSourceHookSpec } from '../types';
import { DragSourceImpl } from './DragSourceImpl';
export declare function useDragSource<O, R, P>(spec: DragSourceHookSpec<O, R, P>, monitor: DragSourceMonitor<O, R>, connector: Connector): DragSourceImpl<O, R, P>;
