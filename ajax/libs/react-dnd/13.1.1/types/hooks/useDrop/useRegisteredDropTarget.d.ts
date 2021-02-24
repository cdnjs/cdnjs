import { TargetConnector } from '../../internals';
import { DropTargetMonitor } from '../../types';
import { DragObjectWithType, DropTargetHookSpec } from '../types';
export declare function useRegisteredDropTarget<O extends DragObjectWithType, R, P>(spec: DropTargetHookSpec<O, R, P>, monitor: DropTargetMonitor, connector: TargetConnector): void;
