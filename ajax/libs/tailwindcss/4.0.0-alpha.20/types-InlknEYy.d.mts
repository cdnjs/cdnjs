interface PluginUtils {
    theme(keypath: string, defaultValue?: any): any;
}

type ResolvableTo<T> = T | ((utils: PluginUtils) => T);
interface UserConfig {
    theme?: ThemeConfig;
}
type ThemeValue = ResolvableTo<Record<string, unknown>> | null | undefined;
type ThemeConfig = Record<string, ThemeValue> & {
    extend?: Record<string, ThemeValue>;
};

export type { ThemeValue as T, UserConfig as U };
