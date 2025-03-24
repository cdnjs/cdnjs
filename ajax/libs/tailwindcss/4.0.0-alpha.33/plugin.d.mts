import { a as PluginFn, C as Config, b as PluginWithConfig, c as PluginWithOptions } from './types-1Gt9iRen.mjs';
import './resolve-config-Oupdq5Vo.mjs';
import './colors.mjs';

declare function createPlugin(handler: PluginFn, config?: Partial<Config>): PluginWithConfig;
declare namespace createPlugin {
    var withOptions: <T>(pluginFunction: (options?: T) => PluginFn, configFunction?: (options?: T) => Partial<Config>) => PluginWithOptions<T>;
}

export { createPlugin as default };
