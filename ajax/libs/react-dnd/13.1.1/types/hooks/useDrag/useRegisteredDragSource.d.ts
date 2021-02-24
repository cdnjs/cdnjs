import { DragSourceMonitor } from '../../types';
import { SourceConnector } from '../../internals';
import { DragObjectWithType, DragSourceHookSpec } from '../types';
export declare function useRegisteredDragSource<O extends DragObjectWithType, R, P>(spec: DragSourceHookSpec<O, R, P>, monitor: DragSourceMonitor, connector: SourceConnector): void;
