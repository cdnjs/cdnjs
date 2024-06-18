import { useConfigProvider } from '../components/ConfigProvider/ConfigProviderContext';
import { DEFAULT_APPEARANCE } from '../lib/appearance';
export function useAppearance() {
    const { appearance } = useConfigProvider();
    return appearance ?? DEFAULT_APPEARANCE;
}

//# sourceMappingURL=useAppearance.js.map