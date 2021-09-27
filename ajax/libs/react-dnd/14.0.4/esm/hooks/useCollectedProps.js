import { useMonitorOutput } from './useMonitorOutput';
export function useCollectedProps(collector, monitor, connector) {
  return useMonitorOutput(monitor, collector || function () {
    return {};
  }, function () {
    return connector.reconnect();
  });
}