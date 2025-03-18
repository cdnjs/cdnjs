import { U as UserConfig, P as Plugin } from './types-D9a5isOA.mjs';
import { D as DesignSystem } from './resolve-config-4MvviLnr.mjs';

type Config = UserConfig;
type CompileOptions = {
    loadPlugin?: (path: string) => Promise<Plugin>;
    loadConfig?: (path: string) => Promise<UserConfig>;
};
declare function compile(css: string, opts?: CompileOptions): Promise<{
    globs: {
        origin?: string;
        pattern: string;
    }[];
    build(candidates: string[]): string;
}>;
declare function __unstable__loadDesignSystem(css: string, opts?: CompileOptions): Promise<DesignSystem>;
declare function postcssPluginWarning(): void;

export { type Config, __unstable__loadDesignSystem, compile, postcssPluginWarning as default };
