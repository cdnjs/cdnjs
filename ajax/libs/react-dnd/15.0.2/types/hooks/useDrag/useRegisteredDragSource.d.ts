import type { DragSourceMonitor } from '../../types';
import { SourceConnector } from '../../internals';
import type { DragSourceHookSpec } from '../types';
export declare function useRegisteredDragSource<O, R, P>(spec: DragSourceHookSpec<O, R, P>, monitor: DragSourceMonitor<O, R>, connector: SourceConnector): void;
