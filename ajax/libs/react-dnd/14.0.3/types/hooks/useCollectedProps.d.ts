import { Connector } from '../internals';
import { HandlerManager, MonitorEventEmitter } from '../types';
export declare function useCollectedProps<Collected, Monitor extends HandlerManager>(collector: ((monitor: Monitor) => Collected) | undefined, monitor: Monitor & MonitorEventEmitter, connector: Connector): Collected;
