import { useConfigProvider } from "../components/ConfigProvider/ConfigProviderContext.js";
export function useLocale() {
    const { locale } = useConfigProvider();
    return locale;
}

//# sourceMappingURL=useLocale.js.map