import { TargetConnector } from '../../internals';
import { DropTargetMonitor } from '../../types';
import { DropTargetHookSpec } from '../types';
export declare function useRegisteredDropTarget<O, R, P>(spec: DropTargetHookSpec<O, R, P>, monitor: DropTargetMonitor<O, R>, connector: TargetConnector): void;
