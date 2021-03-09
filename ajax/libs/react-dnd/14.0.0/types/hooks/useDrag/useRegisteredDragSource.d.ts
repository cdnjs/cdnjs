import { DragSourceMonitor } from '../../types';
import { SourceConnector } from '../../internals';
import { DragSourceHookSpec } from '../types';
export declare function useRegisteredDragSource<O, R, P>(spec: DragSourceHookSpec<O, R, P>, monitor: DragSourceMonitor<O, R>, connector: SourceConnector): void;
