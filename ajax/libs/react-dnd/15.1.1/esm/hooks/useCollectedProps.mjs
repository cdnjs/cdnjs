import { useMonitorOutput } from './useMonitorOutput.mjs';
export function useCollectedProps(collector, monitor, connector) {
    return useMonitorOutput(monitor, collector || (()=>({})
    ), ()=>connector.reconnect()
    );
}

//# sourceMappingURL=useCollectedProps.mjs.map