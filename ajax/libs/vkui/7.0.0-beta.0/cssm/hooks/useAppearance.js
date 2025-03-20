import { useConfigProvider } from "../components/ConfigProvider/ConfigProviderContext.js";
import { DEFAULT_APPEARANCE } from "../lib/appearance/index.js";
export function useAppearance() {
    const { appearance } = useConfigProvider();
    return appearance ?? DEFAULT_APPEARANCE;
}

//# sourceMappingURL=useAppearance.js.map