import { useConfigProvider } from '../components/ConfigProvider/ConfigProviderContext';
export function useAppearance() {
    const { appearance } = useConfigProvider();
    return appearance ?? 'light';
}

//# sourceMappingURL=useAppearance.js.map