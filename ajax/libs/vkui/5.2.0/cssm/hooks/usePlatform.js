import { useConfigProvider } from '../components/ConfigProvider/ConfigProviderContext';
export function usePlatform() {
  var _useConfigProvider = useConfigProvider(),
    platform = _useConfigProvider.platform;
  return platform;
}
//# sourceMappingURL=usePlatform.js.map