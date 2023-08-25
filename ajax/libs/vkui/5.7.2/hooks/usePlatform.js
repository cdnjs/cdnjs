import { useConfigProvider } from "../components/ConfigProvider/ConfigProviderContext";
export function usePlatform() {
    var platform = useConfigProvider().platform;
    return platform;
}

//# sourceMappingURL=usePlatform.js.map