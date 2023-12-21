import { useConfigProvider } from '../components/ConfigProvider/ConfigProviderContext';
export function useAppearance() {
    const { appearance } = useConfigProvider();
    return appearance !== null && appearance !== void 0 ? appearance : 'light';
}

//# sourceMappingURL=useAppearance.js.map