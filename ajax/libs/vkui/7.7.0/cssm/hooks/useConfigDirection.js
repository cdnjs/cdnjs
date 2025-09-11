import { useConfigProvider } from "../components/ConfigProvider/ConfigProviderContext.js";
export function useConfigDirection() {
    const { direction } = useConfigProvider();
    return direction || 'ltr';
}

//# sourceMappingURL=useConfigDirection.js.map