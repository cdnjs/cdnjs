import { ComponentInternalInstance, App, Slots, VNode } from 'vue';
import { SSRContext } from '@vue/server-renderer';

declare type MergedObjectValue = boolean | number | string | MergedObject | any;
declare type MergedObject = {
    [key: string]: MergedObjectValue;
};
declare type PathSegments = Array<string>;
declare type ResolveContext = {};
declare type ResolveMethod = (options: Array<any>, contexts: Array<ResolveContext>, active: MergedObjectValue, key: string | number | symbol, pathSegments: PathSegments) => MergedObjectValue;

declare type MetaConfigSectionKey = 'tag' | 'to' | 'keyAttribute' | 'valueAttribute' | 'nameless' | 'group' | 'namespaced' | 'namespacedAttribute' | 'attributesFor';
interface MetaConfigSectionTag {
    tag?: string;
    to?: string;
    keyAttribute?: string;
    valueAttribute?: string;
    nameless?: boolean;
}
declare type MetaConfigSectionGroup = {
    group: boolean;
    namespaced?: boolean;
    namespacedAttribute?: boolean;
};
declare type MetaConfigSectionAttribute = {
    attributesFor: string;
};
declare type MetaConfigSection = MetaConfigSectionGroup | MetaConfigSectionTag | MetaConfigSectionAttribute;
interface MetaConfig {
    [key: string]: MetaConfigSection;
}
declare type MetaTagConfigKey = 'keyAttribute' | 'contentAsAttribute' | 'attributes';
interface MetaTagConfig {
    keyAttribute?: string;
    contentAsAttribute?: boolean | string;
    attributes: boolean | Array<string>;
}
declare type MetaTagName = 'title' | 'base' | 'meta' | 'link' | 'style' | 'script' | 'noscript';
declare type MetaTagsConfig = {
    [key in MetaTagName]: MetaTagConfig;
};

declare type TODO = any;
/**
 * Proxied meta source for tracking changes and updating the active meta daa
 */
interface MetaSourceProxy extends MergedObject {
}
/**
 * Metainfo data source input by the user through the useMeta fn
 */
declare type MetaSource = {
    [key: string]: TODO;
};
/**
 * Return value of the useMeta api
 */
declare type MetaProxy = {
    meta: MetaSourceProxy;
    unmount: Function | false;
};
/**
 * The active/aggregated meta data currently rendered
 */
interface MetaActive {
    [key: string]: TODO;
}
/**
 * Context passed to the meta resolvers
 */
declare type MetaResolveContext = ResolveContext & {
    vm: ComponentInternalInstance | undefined;
};
declare type MetaResolveSetup = (context: MetaResolveContext) => void;
declare type MetaResolver = {
    setup?: MetaResolveSetup;
    resolve: ResolveMethod;
};
/**
 * The meta manager
 */
declare type MetaManager = {
    readonly config: MetaConfig;
    install(app: App): void;
    addMeta(source: MetaSource, vm?: ComponentInternalInstance): MetaProxy;
    render(ctx?: {
        slots?: Slots;
    }): Array<VNode>;
};
/**
 * @internal
 */
declare type MetaTeleports = {
    [key: string]: Array<VNode>;
};
/**
 * @internal
 */
interface MetaRenderContext {
    slots?: Slots;
    metainfo: MetaActive;
}
/**
 * @internal
 */
interface MetaGroupConfig {
    group: string;
    data: Array<TODO> | TODO;
    tagNamespace?: string;
    fullName?: string;
    slotName?: string;
}
/**
 * @internal
 */
interface SlotScopeProperties {
    content: string;
    metainfo: MetaActive;
    [key: string]: any;
}
/**
 * @internal
 */
declare type MetaRenderedNode = {
    vnode: VNode;
    to?: string;
};
/**
 * @internal
 */
declare type MetaRendered = Array<MetaRenderedNode>;
declare module '@vue/runtime-core' {
    interface ComponentInternalInstance {
        $metaManager: MetaManager;
    }
}

declare type MergeResolveContextDeepest = MetaResolveContext & {
    depth: number;
};
declare function setup(context: MergeResolveContextDeepest): void;
declare const resolve: ResolveMethod;

declare const deepest_d_setup: typeof setup;
declare const deepest_d_resolve: typeof resolve;
declare namespace deepest_d {
  export {
    deepest_d_setup as setup,
    deepest_d_resolve as resolve,
  };
}

declare const defaultConfig: MetaConfig;

declare function createMetaManager(config: MetaConfig, resolver: MetaResolver | ResolveMethod): MetaManager;

declare type ResolveOptionReducer = (accumulator: any, context: ResolveContext) => ResolveMethod;
declare const resolveOption: (predicament: ResolveOptionReducer) => ResolveMethod;

declare function renderToStringWithMeta(app: App): Promise<[string, SSRContext]>;

declare function getCurrentManager(vm?: ComponentInternalInstance): MetaManager | undefined;
declare function useMeta(source: MetaSource, manager?: MetaManager): MetaProxy;
declare function useActiveMeta(): MetaActive;

export { MetaActive, MetaConfig, MetaConfigSection, MetaConfigSectionAttribute, MetaConfigSectionGroup, MetaConfigSectionKey, MetaConfigSectionTag, MetaGroupConfig, MetaManager, MetaProxy, MetaRenderContext, MetaRendered, MetaRenderedNode, MetaResolveContext, MetaResolveSetup, MetaResolver, MetaSource, MetaSourceProxy, MetaTagConfig, MetaTagConfigKey, MetaTagName, MetaTagsConfig, MetaTeleports, SlotScopeProperties, TODO, createMetaManager, deepest_d as deepestResolver, defaultConfig, getCurrentManager, renderToStringWithMeta, resolveOption, useActiveMeta, useMeta };
