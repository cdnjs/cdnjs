import { a as PluginFn, C as Config, b as PluginWithConfig, c as PluginWithOptions } from './types-D9a5isOA.mjs';
import './resolve-config-4MvviLnr.mjs';

declare function createPlugin(handler: PluginFn, config?: Partial<Config>): PluginWithConfig;
declare namespace createPlugin {
    var withOptions: <T>(pluginFunction: (options?: T) => PluginFn, configFunction?: (options?: T) => Partial<Config>) => PluginWithOptions<T>;
}

export { createPlugin as default };
