import { useConfigProvider } from '../components/ConfigProvider/ConfigProviderContext';
export function usePlatform() {
    const { platform } = useConfigProvider();
    return platform;
}

//# sourceMappingURL=usePlatform.js.map