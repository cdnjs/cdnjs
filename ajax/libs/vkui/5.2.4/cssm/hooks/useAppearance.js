import { useConfigProvider } from '../components/ConfigProvider/ConfigProviderContext';
export function useAppearance() {
  var _useConfigProvider = useConfigProvider(),
    appearance = _useConfigProvider.appearance;
  return appearance !== null && appearance !== void 0 ? appearance : 'light';
}
//# sourceMappingURL=useAppearance.js.map