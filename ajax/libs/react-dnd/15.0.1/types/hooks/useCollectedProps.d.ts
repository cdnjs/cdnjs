import type { Connector } from '../internals';
import type { HandlerManager, MonitorEventEmitter } from '../types';
export declare function useCollectedProps<Collected, Monitor extends HandlerManager>(collector: ((monitor: Monitor) => Collected) | undefined, monitor: Monitor & MonitorEventEmitter, connector: Connector): Collected;
