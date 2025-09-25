import { useConfigProvider } from "../components/ConfigProvider/ConfigProviderContext.js";
export function usePlatform() {
    const { platform } = useConfigProvider();
    return platform;
}

//# sourceMappingURL=usePlatform.js.map