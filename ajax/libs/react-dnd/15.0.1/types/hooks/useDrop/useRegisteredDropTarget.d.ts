import { TargetConnector } from '../../internals';
import type { DropTargetMonitor } from '../../types';
import type { DropTargetHookSpec } from '../types';
export declare function useRegisteredDropTarget<O, R, P>(spec: DropTargetHookSpec<O, R, P>, monitor: DropTargetMonitor<O, R>, connector: TargetConnector): void;
