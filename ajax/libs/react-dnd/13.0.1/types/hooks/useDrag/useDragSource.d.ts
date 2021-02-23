import { Connector } from '../../internals';
import { DragSourceMonitor } from '../../types';
import { DragObjectWithType, DragSourceHookSpec } from '../types';
import { DragSourceImpl } from './DragSourceImpl';
export declare function useDragSource<O extends DragObjectWithType, R, P>(spec: DragSourceHookSpec<O, R, P>, monitor: DragSourceMonitor, connector: Connector): DragSourceImpl<O, R, P>;
