import { ImmerState, Patch, Drafted, ImmerBaseState, AnyMap, AnySet, ArchType } from "../internal";
/** Plugin utilities */
declare const plugins: {
    Patches?: {
        generatePatches_(state: ImmerState, basePath: PatchPath, patches: Patch[], inversePatches: Patch[]): void;
        generateReplacementPatches_(base: any, replacement: any, patches: Patch[], inversePatches: Patch[]): void;
        applyPatches_<T>(draft: T, patches: Patch[]): T;
    };
    MapSet?: {
        proxyMap_<T extends AnyMap>(target: T, parent?: ImmerState): T;
        proxySet_<T extends AnySet>(target: T, parent?: ImmerState): T;
    };
};
declare type Plugins = typeof plugins;
export declare function getPlugin<K extends keyof Plugins>(pluginKey: K): Exclude<Plugins[K], undefined>;
export declare function loadPlugin<K extends keyof Plugins>(pluginKey: K, implementation: Plugins[K]): void;
/** Map / Set plugin */
export interface MapState extends ImmerBaseState {
    type_: ArchType.Map;
    copy_: AnyMap | undefined;
    assigned_: Map<any, boolean> | undefined;
    base_: AnyMap;
    revoked_: boolean;
    draft_: Drafted<AnyMap, MapState>;
}
export interface SetState extends ImmerBaseState {
    type_: ArchType.Set;
    copy_: AnySet | undefined;
    base_: AnySet;
    drafts_: Map<any, Drafted>;
    revoked_: boolean;
    draft_: Drafted<AnySet, SetState>;
}
/** Patches plugin */
export declare type PatchPath = (string | number)[];
export {};
//# sourceMappingURL=plugins.d.ts.map