import { useConfigProvider } from "../components/ConfigProvider/ConfigProviderContext";
export function useAppearance() {
    var appearance = useConfigProvider().appearance;
    return appearance !== null && appearance !== void 0 ? appearance : "light";
}

//# sourceMappingURL=useAppearance.js.map