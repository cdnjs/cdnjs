import { ImmerState, Patch } from "../internal";
/** Plugin utilities */
declare const plugins: {
    Patches?: {
        generatePatches_(state: ImmerState, basePath: PatchPath, patches: Patch[], inversePatches: Patch[]): void;
        generateReplacementPatches_(base: any, replacement: any, patches: Patch[], inversePatches: Patch[]): void;
        applyPatches_<T>(draft: T, patches: Patch[]): T;
    };
};
declare type Plugins = typeof plugins;
export declare function getPlugin<K extends keyof Plugins>(pluginKey: K): Exclude<Plugins[K], undefined>;
export declare function loadPlugin<K extends keyof Plugins>(pluginKey: K, implementation: Plugins[K]): void;
/** Patches plugin */
export declare type PatchPath = (string | number)[];
export {};
//# sourceMappingURL=plugins.d.ts.map