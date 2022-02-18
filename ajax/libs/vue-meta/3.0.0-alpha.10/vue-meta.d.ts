/**
 * vue-meta v3.0.0-alpha.10
 * (c) 2022
 * - Pim (@pimlie)
 * - All the amazing contributors
 * @license MIT
 */

/// <reference path="../ssr/index.d.ts" />
      
import { App, ComponentInternalInstance, Slots, VNode, ComponentOptionsMixin } from 'vue';

declare const IS_PROXY: unique symbol;
declare const PROXY_SOURCES: unique symbol;
declare const PROXY_TARGET: unique symbol;
declare const RESOLVE_CONTEXT: unique symbol;

interface ResolveContext {
}
declare type MergeSource<T extends Object> = {
    [K in keyof T]: T[K];
} & {
    [IS_PROXY]: boolean;
    [PROXY_SOURCES]: MergeSource<T>[];
    [PROXY_TARGET]: MergeSource<T>;
    [RESOLVE_CONTEXT]: ResolveContext;
};
declare type MergedObjectValue = boolean | number | string | MergedObject | any;
declare type MergedObject = {
    [key: string]: MergedObjectValue;
};
declare type PathSegments = Array<string>;
interface ResolveMethod<T = any, U = ResolveContext> {
    (options: Array<T>, contexts: Array<U>, active: MergedObjectValue, key: string | number | symbol, pathSegments: PathSegments): MergedObjectValue;
}
declare type MergeContext<T> = {
    resolve: ResolveMethod;
    active: MergedObject;
    sources: MergeSource<T>[];
};
declare type MergedObjectBuilder<T> = {
    context: MergeContext<T>;
    compute: () => void;
    addSource: (source: T, resolveContext?: ResolveContext, recompute?: Boolean) => any;
    delSource: (sourceOrProxy: T | MergeSource<T>, recompute?: boolean) => boolean;
};

declare type CreateMetaManagerMethod = (isSSR: boolean, config: MetaConfig, resolver: MetaResolver | ResolveMethod) => MetaManager;
declare const createMetaManager: (isSSR?: boolean, config?: MetaConfig | undefined, resolver?: MetaResolver | undefined) => MetaManager;
declare class MetaManager {
    isSSR: boolean;
    config: MetaConfig;
    target: MergedObjectBuilder<MetaSource>;
    resolver?: MetaResolver;
    ssrCleanedUp: boolean;
    constructor(isSSR: boolean, config: MetaConfig, target: MergedObjectBuilder<MetaSource>, resolver: MetaResolver | ResolveMethod);
    static create: CreateMetaManagerMethod;
    install(app: App): void;
    addMeta(metadata: MetaSource, vm?: ComponentInternalInstance): MetaProxy;
    private unmount;
    private reallyUnmount;
    render({ slots }?: {
        slots?: Slots;
    }): VNode[];
}

interface AttributeProperty {
    [key: string]: string | string[];
}
interface MetaDataProperty {
    vmid?: string;
    once?: boolean;
    skip?: boolean;
    body?: boolean;
    pbody?: boolean;
    [key: string]: any;
}
interface MetaPropertyCharset extends MetaDataProperty {
    charset: string;
}
interface MetaPropertyEquiv extends MetaDataProperty {
    httpEquiv: string;
    content: string;
}
interface MetaPropertyTrueEquiv extends MetaDataProperty {
    'http-equiv': string;
    content: string;
}
interface MetaPropertyName extends MetaDataProperty {
    name: string;
    content: string;
}
interface MetaPropertyMicrodata extends MetaDataProperty {
    itemprop: string;
    content: string;
}
interface MetaPropertyProperty extends MetaDataProperty {
    property: string;
    content: string;
}
interface LinkPropertyBase extends MetaDataProperty {
    rel: string;
    crossOrigin?: string | null;
    media?: string;
    nonce?: string;
    referrerPolicy?: string;
    rev?: string;
    type?: string;
}
interface LinkPropertyHref extends LinkPropertyBase {
    href?: string;
    hreflang?: string;
    callback?: void;
}
interface LinkPropertyHrefCallback extends LinkPropertyBase {
    vmid: string;
    href?: string;
    hreflang?: string;
}
interface StyleProperty extends MetaDataProperty {
    cssText: string;
    media?: string;
    nonce?: string;
    type?: string;
}
interface ScriptPropertyBase extends MetaDataProperty {
    type?: string;
    charset?: string;
    async?: boolean;
    defer?: boolean;
    crossOrigin?: string;
    nonce?: string;
}
interface ScriptPropertyText extends ScriptPropertyBase {
    innerHTML: string;
}
interface ScriptPropertySrc extends ScriptPropertyBase {
    src: string;
    callback?: void;
}
interface ScriptPropertySrcCallback extends ScriptPropertyBase {
    vmid: string;
}
declare type JsonVal = string | number | boolean | JsonObj | JsonObj[] | null;
interface JsonObj {
    [key: string]: JsonVal | JsonVal[];
}
interface ScriptPropertyJson extends ScriptPropertyBase {
    json: JsonObj;
}
interface NoScriptProperty extends MetaDataProperty {
    innerHTML: string;
}
interface ComponentMetaInfo {
    title?: string;
    htmlAttrs?: AttributeProperty;
    headAttrs?: AttributeProperty;
    bodyAttrs?: AttributeProperty;
    base?: {
        target: string;
        href: string;
    };
    meta?: (MetaPropertyCharset | MetaPropertyEquiv | MetaPropertyTrueEquiv | MetaPropertyName | MetaPropertyMicrodata | MetaPropertyProperty)[];
    link?: (LinkPropertyBase | LinkPropertyHref | LinkPropertyHrefCallback)[];
    style?: StyleProperty[];
    script?: (ScriptPropertyText | ScriptPropertySrc | ScriptPropertySrcCallback | ScriptPropertyJson)[];
    noscript?: NoScriptProperty[];
}
declare type ComponentOptionsMetaInfo = ComponentMetaInfo | ((this: ComponentOptionsMixin) => ComponentMetaInfo);

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

declare type Modify<T, R> = Omit<T, keyof R> & R;
declare type Truthy<T> = T extends undefined | void | null | false | 0 | '' ? never : T;
declare type ExcludesFalsy = <T>(x: T) => x is Truthy<T>;
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
declare type MetaGuardRemoved = () => void | Promise<void>;
/**
 * Return value of the useMeta api
 */
declare type MetaProxy = {
    meta: MetaSourceProxy;
    onRemoved: (removeGuard: MetaGuardRemoved) => void;
    unmount: (ignoreGuards?: boolean) => void;
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
    vm?: ComponentInternalInstance;
};
declare type MetaResolveSetup = (context: MetaResolveContext) => void;
declare type MetaResolver = {
    setup?: MetaResolveSetup;
    resolve: ResolveMethod;
};
declare type MetaResolverSetup = Required<MetaResolver>;
/**
 * @internal
 */
declare type MetaTeleports = {
    [key: string]: Array<VNode>;
};
/**
 * @internal
 */
interface MetaGuards {
    removed: Array<MetaGuardRemoved>;
}
/**
 * @internal
 */
interface MetaRenderContext {
    isSSR: boolean;
    metainfo: MetaActive;
    slots?: Slots;
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
        $metaGuards: MetaGuards;
    }
    interface ComponentCustomOptions {
        metaInfo?: ComponentOptionsMetaInfo;
    }
}

declare const setup: MetaResolveSetup;
declare const resolve: ResolveMethod<any, ResolveContext>;

declare const deepest_d_setup: typeof setup;
declare const deepest_d_resolve: typeof resolve;
declare namespace deepest_d {
  export {
    deepest_d_setup as setup,
    deepest_d_resolve as resolve,
  };
}

declare const defaultConfig: MetaConfig;

declare type PluginOptions = {
    keyName: string;
};
declare const install: (app: App, _options?: Partial<PluginOptions>) => void;

interface ResolveOptionPredicament<T, U> {
    (currentValue: T | undefined, context: U): T;
}
declare const resolveOption: <T, U = ResolveContext>(predicament: ResolveOptionPredicament<T, U>, initialValue?: T | undefined) => ResolveMethod<any, U>;

declare function getCurrentManager(vm?: ComponentInternalInstance): MetaManager | undefined;
declare function useMeta(source: MetaSource, manager?: MetaManager): MetaProxy;
declare function useActiveMeta(): MetaActive;

export { ExcludesFalsy, MetaActive, MetaConfig, MetaConfigSection, MetaConfigSectionAttribute, MetaConfigSectionGroup, MetaConfigSectionKey, MetaConfigSectionTag, MetaGroupConfig, MetaGuardRemoved, MetaGuards, MetaProxy, MetaRenderContext, MetaRendered, MetaRenderedNode, MetaResolveContext, MetaResolveSetup, MetaResolver, MetaResolverSetup, MetaSource, MetaSourceProxy, MetaTagConfig, MetaTagConfigKey, MetaTagName, MetaTagsConfig, MetaTeleports, Modify, SlotScopeProperties, TODO, Truthy, createMetaManager, deepest_d as deepestResolver, defaultConfig, getCurrentManager, install as plugin, resolveOption, useActiveMeta, useMeta };
