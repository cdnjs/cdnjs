import type { Connector } from '../../internals';
import type { DragSourceMonitor } from '../../types';
import type { DragSourceHookSpec } from '../types';
import { DragSourceImpl } from './DragSourceImpl';
export declare function useDragSource<O, R, P>(spec: DragSourceHookSpec<O, R, P>, monitor: DragSourceMonitor<O, R>, connector: Connector): DragSourceImpl<O, R, P>;
