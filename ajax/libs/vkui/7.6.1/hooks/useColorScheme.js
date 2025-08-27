import { useConfigProvider } from "../components/ConfigProvider/ConfigProviderContext.js";
import { DEFAULT_COLOR_SCHEME } from "../lib/colorScheme/index.js";
export function useColorScheme() {
    const { colorScheme } = useConfigProvider();
    return colorScheme !== null && colorScheme !== void 0 ? colorScheme : DEFAULT_COLOR_SCHEME;
}

//# sourceMappingURL=useColorScheme.js.map