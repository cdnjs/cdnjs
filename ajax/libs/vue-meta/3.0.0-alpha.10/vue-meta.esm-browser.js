/**
 * vue-meta v3.0.0-alpha.10
 * (c) 2022
 * - Pim (@pimlie)
 * - All the amazing contributors
 * @license MIT
 */

import { markRaw, h, getCurrentInstance, isProxy, watch, inject, defineComponent, reactive, onUnmounted, Teleport, Comment, computed } from 'vue';

const resolveOption = (predicament, initialValue) => (options, contexts) => {
    let resolvedIndex = -1;
    contexts.reduce((acc, context, index) => {
        const retval = predicament(acc, context);
        if (retval !== acc) {
            resolvedIndex = index;
            return retval;
        }
        return acc;
    }, initialValue);
    if (resolvedIndex > -1) {
        return options[resolvedIndex];
    }
};

const setup = (context) => {
    let depth = 0;
    if (context.vm) {
        let { vm } = context;
        do {
            if (vm.parent) {
                depth++;
                vm = vm.parent;
            }
        } while (vm && vm.parent && vm !== vm.root);
    }
    context.depth = depth;
};
const resolve = resolveOption((currentValue, context) => {
    const { depth } = context;
    if (!currentValue || depth > currentValue) {
        return depth;
    }
    return currentValue;
});

var defaultResolver = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setup: setup,
  resolve: resolve
});

const defaultConfig = {
    body: {
        tag: 'script',
        to: 'body'
    },
    base: {
        valueAttribute: 'href'
    },
    charset: {
        tag: 'meta',
        nameless: true,
        valueAttribute: 'charset'
    },
    description: {
        tag: 'meta'
    },
    og: {
        group: true,
        namespacedAttribute: true,
        tag: 'meta',
        keyAttribute: 'property'
    },
    twitter: {
        group: true,
        namespacedAttribute: true,
        tag: 'meta'
    },
    htmlAttrs: {
        attributesFor: 'html'
    },
    headAttrs: {
        attributesFor: 'head'
    },
    bodyAttrs: {
        attributesFor: 'body'
    }
};

/*
 * This is a fixed config for real HTML tags
 */
const tags = {
    title: {
        attributes: false
    },
    base: {
        contentAsAttribute: true,
        attributes: ['href', 'target']
    },
    meta: {
        contentAsAttribute: true,
        keyAttribute: 'name',
        attributes: ['content', 'name', 'http-equiv', 'charset']
    },
    link: {
        contentAsAttribute: true,
        attributes: [
            'href',
            'crossorigin',
            'rel',
            'media',
            'integrity',
            'hreflang',
            'type',
            'referrerpolicy',
            'sizes',
            'imagesrcset',
            'imagesizes',
            'as',
            'color'
        ]
    },
    style: {
        attributes: ['media']
    },
    script: {
        attributes: [
            'src',
            'type',
            'nomodule',
            'async',
            'defer',
            'crossorigin',
            'integrity',
            'referrerpolicy'
        ]
    },
    noscript: {
        attributes: false
    }
};

function getTagConfigItem(tagOrName, key) {
    for (const name of tagOrName) {
        const tag = tags[name];
        if (name && tag) {
            return tag[key];
        }
    }
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
Object.freeze({})
    ;
Object.freeze([]) ;
const isArray = Array.isArray;
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
const isObject = (val) => val !== null && typeof val === 'object';
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === '[object Object]';

// https://github.com/microsoft/TypeScript/issues/1863
const IS_PROXY = Symbol('kIsProxy');
const PROXY_SOURCES = Symbol('kProxySources');
const PROXY_TARGET = Symbol('kProxyTarget');
const RESOLVE_CONTEXT = Symbol('kResolveContext');

// See: https://github.com/vuejs/vue-next/blob/08b4e8815da4e8911058ccbab986bea6365c3352/packages/compiler-ssr/src/transforms/ssrTransformComponent.ts
function clone(v) {
    if (isArray(v)) {
        return v.map(clone);
    }
    if (isObject(v)) {
        const res = {};
        for (const key in v) {
            // never clone the context
            if (key === 'context') {
                res[key] = v[key];
            }
            else {
                res[key] = clone(v[key]);
            }
        }
        return res;
    }
    return v;
}

const pluck = (collection, key, callback) => {
    const plucked = [];
    for (const row of collection) {
        if (row && key in row) {
            plucked.push(row[key]);
            if (callback) {
                callback(row);
            }
        }
    }
    return plucked;
};

const allKeys = (source, ...sources) => {
    const keys = source ? Object.keys(source) : [];
    if (sources) {
        for (const source of sources) {
            if (!source || !isObject(source)) {
                continue;
            }
            for (const key in source) {
                if (!keys.includes(key)) {
                    keys.push(key);
                }
            }
        }
    }
    // TODO: add check for consistent types for each key (dev only)
    return keys;
};
const recompute = (context, path = [], target, sources) => {
    const setTargetAndSources = !target && !sources;
    if (setTargetAndSources) {
        ({ active: target, sources } = context);
        if (path.length) {
            for (let i = 0; i < path.length; i++) {
                const seg = path[i];
                if (!target || !target[seg]) {
                    {
                        // eslint-disable-next-line no-console
                        console.error(`recompute: segment ${seg} not found on target`, path, target);
                    }
                    return;
                }
                target = target[seg];
                sources = sources.map(source => source[seg]).filter(Boolean);
            }
        }
    }
    if (!target || !sources) {
        return;
    }
    const keys = allKeys(...sources);
    // Clean up properties that dont exists anymore
    const targetKeys = Object.keys(target);
    for (const key of targetKeys) {
        if (!keys.includes(key)) {
            delete target[key];
        }
    }
    for (const key of keys) {
        // This assumes consistent types usages for keys across sources
        // @ts-ignore
        let isObject = false;
        for (let i = 0; i < sources.length; i++) {
            const source = sources[i];
            if (source && key in source && source[key] !== undefined) {
                isObject = isPlainObject(source[key]);
                break;
            }
        }
        if (isObject) {
            if (!target[key]) {
                target[key] = {};
            }
            const keySources = [];
            for (const source of sources) {
                if (key in source) {
                    // @ts-ignore
                    keySources.push(source[key]);
                }
            }
            recompute(context, [...path, key], target[key], keySources);
            continue;
        }
        // Ensure the target is an array if source is an array and target is empty
        // @ts-ignore
        if (!target[key] && isArray(sources[0][key])) {
            target[key] = [];
        }
        const keyContexts = [];
        const keySources = pluck(sources, key, source => keyContexts.push(source[RESOLVE_CONTEXT]));
        let resolved = context.resolve(keySources, keyContexts, target[key], key, path);
        if (isPlainObject(resolved)) {
            resolved = clone(resolved);
        }
        target[key] = resolved;
    }
};

const createProxy = (context, target, resolveContext, pathSegments = []) => {
    const handler = createHandler(context, resolveContext, pathSegments);
    const proxy = markRaw(new Proxy(target, handler));
    if (!pathSegments.length && context.sources) {
        context.sources.push(proxy);
    }
    return proxy;
};
const createHandler = (context, resolveContext, pathSegments = []) => ({
    get: (target, key, receiver) => {
        if (key === IS_PROXY) {
            return true;
        }
        if (key === PROXY_SOURCES) {
            return context.sources;
        }
        if (key === PROXY_TARGET) {
            return target;
        }
        if (key === RESOLVE_CONTEXT) {
            return resolveContext;
        }
        let value = Reflect.get(target, key, receiver);
        if (!isObject(value)) {
            return value;
        }
        // Also return a merge proxy for nested objects
        if (!value[IS_PROXY]) {
            const keyPath = [...pathSegments, key];
            value = createProxy(context, value, resolveContext, keyPath);
            Reflect.set(target, key, value);
        }
        return value;
    },
    set: (target, key, value) => {
        const success = Reflect.set(target, key, value);
        // console.warn(success, 'PROXY SET\nkey:', key, '\nvalue:', value, '\npath:', pathSegments, '\ntarget:', isArray(target), target, '\ncontext:\n', context)
        if (success) {
            const isArrayItem = isArray(target);
            let hasArrayParent = false;
            let { sources: proxies, active } = context;
            let activeSegmentKey;
            let index = 0;
            for (const segment of pathSegments) {
                proxies = pluck(proxies, segment);
                if (isArrayItem && index === pathSegments.length - 1) {
                    activeSegmentKey = segment;
                    break;
                }
                if (isArray(active)) {
                    hasArrayParent = true;
                }
                active = active[segment];
                index++;
            }
            if (hasArrayParent) {
                // TODO: fix that we dont have to recompute the full merged object
                // we should only have to recompute the branch that has changed
                // but there is an issue here with supporting both arrays of strings
                // as collections (parent vs parent of parent we need to trigger the
                // update from)
                recompute(context);
                return success;
            }
            else if (isPlainObject(value)) {
                // if an object was assigned to this key make sure to recompute all
                // of its individual properies
                recompute(context, pathSegments);
                return success;
            }
            let keyContexts = [];
            let keySources;
            if (isArrayItem) {
                keySources = proxies;
                keyContexts = proxies.map(proxy => proxy[RESOLVE_CONTEXT]);
            }
            else {
                keySources = pluck(proxies, key, proxy => keyContexts.push(proxy[RESOLVE_CONTEXT]));
            }
            let resolved = context.resolve(keySources, keyContexts, active, key, pathSegments);
            // Ensure to clone if value is an object, cause sources is an array of
            // the sourceProxies and not the sources so we could trigger an endless loop when
            // updating a prop on an obj as the prop on the active object refers to
            // a prop on a proxy
            if (isPlainObject(resolved)) {
                resolved = clone(resolved);
            }
            // console.log('SET VALUE', isArrayItem, key, '\nresolved:\n', resolved, '\nsources:\n', context.sources, '\nactive:\n', active, Object.keys(active))
            if (isArrayItem && activeSegmentKey) {
                active[activeSegmentKey] = resolved;
            }
            else {
                active[key] = resolved;
            }
        }
        //    console.log('CONTEXT.ACTIVE', context.active, '\nparent:\n', target)
        return success;
    },
    deleteProperty: (target, key) => {
        const success = Reflect.deleteProperty(target, key);
        // console.warn('PROXY DELETE\nkey:', key, '\npath:', pathSegments, '\nparent:', isArray(target), target)
        if (success) {
            const isArrayItem = isArray(target);
            let activeSegmentKey;
            let proxies = context.sources;
            let active = context.active;
            let index = 0;
            for (const segment of pathSegments) {
                // @ts-ignore
                proxies = proxies.map(proxy => proxy && proxy[segment]);
                if (isArrayItem && index === pathSegments.length - 1) {
                    activeSegmentKey = segment;
                    break;
                }
                active = active[segment];
                index++;
            }
            // Check if the key still exists in one of the sourceProxies,
            // if so resolve the new value, if not remove the key
            if (proxies.some(proxy => proxy && (key in proxy))) {
                let keyContexts = [];
                let keySources;
                if (isArrayItem) {
                    keySources = proxies;
                    keyContexts = proxies.map(proxy => proxy[RESOLVE_CONTEXT]);
                }
                else {
                    keySources = pluck(proxies, key, proxy => keyContexts.push(proxy[RESOLVE_CONTEXT]));
                }
                let resolved = context.resolve(keySources, keyContexts, active, key, pathSegments);
                if (isPlainObject(resolved)) {
                    resolved = clone(resolved);
                }
                // console.log('SET VALUE', resolved)
                if (isArrayItem && activeSegmentKey) {
                    active[activeSegmentKey] = resolved;
                }
                else {
                    active[key] = resolved;
                }
            }
            else {
                delete active[key];
            }
        }
        return success;
    }
});

const createMergedObject = (resolve, active) => {
    const sources = [];
    const context = {
        active,
        resolve,
        sources
    };
    const compute = () => recompute(context);
    return {
        context,
        compute,
        addSource: (source, resolveContext, recompute = false) => {
            const proxy = createProxy(context, source, resolveContext || {});
            if (recompute) {
                compute();
            }
            return proxy;
        },
        delSource: (sourceOrProxy, recompute = true) => {
            const index = sources.findIndex(source => source === sourceOrProxy || source[PROXY_TARGET] === sourceOrProxy);
            if (index > -1) {
                sources.splice(index, 1);
                if (recompute) {
                    compute();
                }
                return true;
            }
            return false;
        }
    };
};

const cachedElements = {};
function renderMeta(context, key, data, config) {
    // console.info('renderMeta', key, data, config)
    if ('attributesFor' in config) {
        return renderAttributes(context, key, data, config);
    }
    if ('group' in config) {
        return renderGroup(context, key, data, config);
    }
    return renderTag(context, key, data, config);
}
function renderGroup(context, key, data, config) {
    // console.info('renderGroup', key, data, config)
    if (isArray(data)) {
        {
            // eslint-disable-next-line no-console
            console.warn('Specifying an array for group properties isnt supported');
        }
        // config.attributes = getConfigKey([key, config.tag], 'attributes', config)
        return [];
    }
    return Object.keys(data)
        .map((childKey) => {
        const groupConfig = {
            group: key,
            data
        };
        if (config.namespaced) {
            groupConfig.tagNamespace = config.namespaced === true ? key : config.namespaced;
        }
        else if (config.namespacedAttribute) {
            const namespace = config.namespacedAttribute === true ? key : config.namespacedAttribute;
            groupConfig.fullName = `${namespace}:${childKey}`;
            groupConfig.slotName = `${namespace}(${childKey})`;
        }
        return renderTag(context, key, data[childKey], config, groupConfig);
    })
        .filter(Boolean)
        .flat();
}
function renderTag(context, key, data, config = {}, groupConfig) {
    // console.info('renderTag', key, data, config, groupConfig)
    const contentAttributes = ['content', 'json', 'rawContent'];
    const getTagConfig = (key) => getTagConfigItem([tag, config.tag], key);
    if (isArray(data)) {
        return data
            .map((child) => {
            return renderTag(context, key, child, config, groupConfig);
        })
            .filter(Boolean)
            .flat();
    }
    const { tag = config.tag || key } = data;
    let content = '';
    let hasChilds = false;
    let isRaw = false;
    if (isString(data)) {
        content = data;
    }
    else if (data.children && isArray(data.children)) {
        hasChilds = true;
        content = data.children.map((child) => {
            const data = renderTag(context, key, child, config, groupConfig);
            if (isArray(data)) {
                return data.map(({ vnode }) => vnode);
            }
            return data && data.vnode;
        });
    }
    else {
        let i = 0;
        for (const contentAttribute of contentAttributes) {
            if (!content && data[contentAttribute]) {
                if (i === 1) {
                    content = JSON.stringify(data[contentAttribute]);
                }
                else {
                    content = data[contentAttribute];
                }
                isRaw = i > 1;
                break;
            }
            i++;
        }
    }
    const fullName = (groupConfig && groupConfig.fullName) || key;
    const slotName = (groupConfig && groupConfig.slotName) || key;
    let { attrs: attributes } = data;
    if (!attributes && typeof data === 'object') {
        attributes = { ...data };
        delete attributes.tag;
        delete attributes.children;
        delete attributes.to;
        // cleanup all content attributes
        for (const attr of contentAttributes) {
            delete attributes[attr];
        }
    }
    else if (!attributes) {
        attributes = {};
    }
    if (hasChilds) {
        content = getSlotContent(context, slotName, content, data);
    }
    else {
        const contentAsAttribute = !!getTagConfig('contentAsAttribute');
        let { valueAttribute } = config;
        if (!valueAttribute && contentAsAttribute) {
            const [tagAttribute] = getTagConfig('attributes');
            valueAttribute = isString(contentAsAttribute) ? contentAsAttribute : tagAttribute;
        }
        if (!valueAttribute) {
            content = getSlotContent(context, slotName, content, data);
        }
        else {
            const { nameless } = config;
            if (!nameless) {
                const keyAttribute = config.keyAttribute || getTagConfig('keyAttribute');
                if (keyAttribute) {
                    attributes[keyAttribute] = fullName;
                }
            }
            attributes[valueAttribute] = getSlotContent(context, slotName, attributes[valueAttribute] || content, groupConfig);
            content = '';
        }
    }
    const finalTag = groupConfig && groupConfig.tagNamespace
        ? `${groupConfig.tagNamespace}:${tag}`
        : tag;
    if (finalTag === 'title' && !context.isSSR) {
        document.title = content;
        return;
    }
    // console.info('FINAL TAG', finalTag)
    // console.log('      ATTRIBUTES', attributes)
    // console.log('      CONTENT', content)
    // console.log(data, attributes, config)
    if (isRaw && content) {
        attributes.innerHTML = content;
    }
    // Ignore empty string content
    const vnode = h(finalTag, attributes, content || undefined);
    return {
        to: data.to,
        vnode
    };
}
function renderAttributes(context, key, data, config) {
    // console.info('renderAttributes', key, data, config)
    const { attributesFor } = config;
    if (!attributesFor || !data) {
        return;
    }
    if (context.isSSR) {
        // render attributes in a placeholder vnode so Vue
        // will render the string for us
        return {
            to: '',
            vnode: h(`ssr-${attributesFor}`, data)
        };
    }
    if (!cachedElements[attributesFor]) {
        const [el, el2] = Array.from(document.querySelectorAll(attributesFor));
        if (!el) {
            // eslint-disable-next-line no-console
            console.error('Could not find element for selector', attributesFor, ', won\'t render attributes');
            return;
        }
        if (el2) {
            // eslint-disable-next-line no-console
            console.warn('Found multiple elements for selector', attributesFor);
        }
        cachedElements[attributesFor] = {
            el,
            attrs: []
        };
    }
    const { el, attrs } = cachedElements[attributesFor];
    for (const attr in data) {
        let content = getSlotContent(context, `${key}(${attr})`, data[attr], data);
        if (isArray(content)) {
            content = content.join(',');
        }
        el.setAttribute(attr, content || '');
        if (!attrs.includes(attr)) {
            attrs.push(attr);
        }
    }
    const attrsToRemove = attrs.filter(attr => !data[attr]);
    for (const attr of attrsToRemove) {
        el.removeAttribute(attr);
    }
}
function getSlotContent({ metainfo, slots }, slotName, content, groupConfig) {
    const slot = slots && slots[slotName];
    if (!slot || !isFunction(slot)) {
        return content;
    }
    const slotScopeProps = {
        content,
        metainfo
    };
    if (groupConfig && groupConfig.group) {
        const { group, data } = groupConfig;
        slotScopeProps[group] = data;
    }
    const slotContent = slot(slotScopeProps);
    if (slotContent && slotContent.length) {
        const { children } = slotContent[0];
        return children ? children.toString() : '';
    }
    return content;
}

const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const PolySymbol = (name) => 
// vm = vue meta
hasSymbol
    ? Symbol('[vue-meta]: ' + name )
    : ('[vue-meta]: ' ) + name;
const metaActiveKey = /*#__PURE__*/ PolySymbol('meta_active' );

/**
 * Apply the differences between newSource & oldSource to target
 */
function applyDifference(target, newSource, oldSource) {
    for (const key in newSource) {
        if (!(key in oldSource)) {
            target[key] = newSource[key];
            continue;
        }
        if (isObject(target[key])) {
            applyDifference(target[key], newSource[key], oldSource[key]);
            continue;
        }
        if (newSource[key] !== oldSource[key]) {
            target[key] = newSource[key];
        }
    }
    for (const key in oldSource) {
        if (!newSource || !(key in newSource)) {
            delete target[key];
        }
    }
}

function getCurrentManager(vm) {
    if (!vm) {
        vm = getCurrentInstance() || undefined;
    }
    if (!vm) {
        return undefined;
    }
    return vm.appContext.config.globalProperties.$metaManager;
}
function useMeta(source, manager) {
    const vm = getCurrentInstance() || undefined;
    if (!manager && vm) {
        manager = getCurrentManager(vm);
    }
    if (!manager) {
        throw new Error('No manager or current instance');
    }
    if (isProxy(source)) {
        watch(source, (newSource, oldSource) => {
            applyDifference(metaProxy.meta, newSource, oldSource);
        });
        source = source.value;
    }
    const metaProxy = manager.addMeta(source, vm);
    return metaProxy;
}
function useActiveMeta() {
    return inject(metaActiveKey);
}

const MetainfoImpl = defineComponent({
    name: 'Metainfo',
    inheritAttrs: false,
    setup(_, { slots }) {
        return () => {
            const manager = getCurrentManager();
            if (!manager) {
                return;
            }
            return manager.render({ slots });
        };
    }
});
const Metainfo = MetainfoImpl;

const ssrAttribute = 'data-vm-ssr';
function addVnode(isSSR, teleports, to, vnodes) {
    const nodes = (isArray(vnodes) ? vnodes : [vnodes]);
    if (!isSSR) {
        // Comments shouldnt have any use on the client as they are not reactive anyway
        nodes.forEach((vnode, idx) => {
            if (vnode.type === Comment) {
                nodes.splice(idx, 1);
            }
        });
        // only add ssrAttribute's for real meta tags
    }
    else if (!to.endsWith('Attrs')) {
        nodes.forEach((vnode) => {
            if (!vnode.props) {
                vnode.props = {};
            }
            vnode.props[ssrAttribute] = true;
        });
    }
    if (!teleports[to]) {
        teleports[to] = [];
    }
    teleports[to].push(...nodes);
}
const createMetaManager = (isSSR = false, config, resolver) => MetaManager.create(isSSR, config || defaultConfig, resolver || defaultResolver);
class MetaManager {
    isSSR = false;
    config;
    target;
    resolver;
    ssrCleanedUp = false;
    constructor(isSSR, config, target, resolver) {
        this.isSSR = isSSR;
        this.config = config;
        this.target = target;
        if (resolver && 'setup' in resolver && isFunction(resolver.setup)) {
            this.resolver = resolver;
        }
    }
    static create = (isSSR, config, resolver) => {
        const resolve = (options, contexts, active, key, pathSegments) => {
            if (isFunction(resolver)) {
                return resolver(options, contexts, active, key, pathSegments);
            }
            return resolver.resolve(options, contexts, active, key, pathSegments);
        };
        const active = reactive({});
        const mergedObject = createMergedObject(resolve, active);
        // TODO: validate resolver
        const manager = new MetaManager(isSSR, config, mergedObject, resolver);
        return manager;
    };
    install(app) {
        app.component('Metainfo', Metainfo);
        app.config.globalProperties.$metaManager = this;
        app.provide(metaActiveKey, this.target.context.active);
    }
    addMeta(metadata, vm) {
        if (!vm) {
            vm = getCurrentInstance() || undefined;
        }
        const metaGuards = ({
            removed: []
        });
        const resolveContext = { vm };
        const { resolver } = this;
        if (resolver && resolver.setup) {
            resolver.setup(resolveContext);
        }
        // TODO: optimize initial compute (once)
        const meta = this.target.addSource(metadata, resolveContext, true);
        const onRemoved = (removeGuard) => metaGuards.removed.push(removeGuard);
        const unmount = (ignoreGuards) => this.unmount(!!ignoreGuards, meta, metaGuards, vm);
        if (vm) {
            onUnmounted(unmount);
        }
        return {
            meta,
            onRemoved,
            unmount
        };
    }
    unmount(ignoreGuards, meta, metaGuards, vm) {
        if (vm) {
            const { $el } = vm.proxy;
            // Wait for element to be removed from DOM
            if ($el && $el.offsetParent) {
                let observer = new MutationObserver((records) => {
                    for (const { removedNodes } of records) {
                        if (!removedNodes) {
                            continue;
                        }
                        removedNodes.forEach((el) => {
                            if (el === $el && observer) {
                                observer.disconnect();
                                observer = undefined;
                                this.reallyUnmount(ignoreGuards, meta, metaGuards);
                            }
                        });
                    }
                });
                observer.observe($el.parentNode, { childList: true });
                return;
            }
        }
        this.reallyUnmount(ignoreGuards, meta, metaGuards);
    }
    async reallyUnmount(ignoreGuards, meta, metaGuards) {
        this.target.delSource(meta);
        if (!ignoreGuards && metaGuards) {
            await Promise.all(metaGuards.removed.map(removeGuard => removeGuard()));
        }
    }
    render({ slots } = {}) {
        const active = this.target.context.active;
        // TODO: clean this method
        const { isSSR } = this;
        // cleanup ssr tags if not yet done
        if (!isSSR && !this.ssrCleanedUp) {
            this.ssrCleanedUp = true;
            const cleanUpSSR = () => {
                const ssrTags = document.querySelectorAll(`[${ssrAttribute}]`);
                if (ssrTags && ssrTags.length) {
                    ssrTags.forEach(el => el.parentNode && el.parentNode.removeChild(el));
                }
            };
            if (document.readyState === 'loading') {
                // Listen for DOM loaded because tags in the body couldnt
                // have loaded yet once the manager does it first render
                // (preferable there should only be one meta render on hydration)
                window.addEventListener('DOMContentLoaded', cleanUpSSR, { once: true });
            }
            else {
                cleanUpSSR();
            }
        }
        const teleports = {};
        for (const key in active) {
            const config = this.config[key] || {};
            let renderedNodes = renderMeta({ isSSR, metainfo: active, slots }, key, active[key], config);
            if (!renderedNodes) {
                continue;
            }
            if (!isArray(renderedNodes)) {
                renderedNodes = [renderedNodes];
            }
            let defaultTo = key !== 'base' && active[key].to;
            if (!defaultTo && 'to' in config) {
                defaultTo = config.to;
            }
            if (!defaultTo && 'attributesFor' in config) {
                defaultTo = key;
            }
            for (const { to, vnode } of renderedNodes) {
                addVnode(this.isSSR, teleports, to || defaultTo || 'head', vnode);
            }
        }
        if (slots) {
            for (const slotName in slots) {
                const tagName = slotName === 'default' ? 'head' : slotName;
                // Only teleport the contents of head/body slots
                if (tagName !== 'head' && tagName !== 'body') {
                    continue;
                }
                const slot = slots[slotName];
                if (isFunction(slot)) {
                    addVnode(this.isSSR, teleports, tagName, slot({ metainfo: active }));
                }
            }
        }
        return Object.keys(teleports).map((to) => {
            const teleport = teleports[to];
            return h(Teleport, { to }, teleport);
        });
    }
}

const defaultOptions = {
    keyName: 'metaInfo'
};
const createMixin = options => ({
    created() {
        const instance = getCurrentInstance();
        if (!instance?.type || !(options.keyName in instance.type)) {
            return;
        }
        const metaInfo = instance.type[options.keyName];
        if (isFunction(metaInfo)) {
            const computedMetaInfo = computed(metaInfo.bind(this));
            useMeta(computedMetaInfo);
        }
        else {
            useMeta(metaInfo);
        }
    }
});
const install = (app, _options = {}) => {
    const options = Object.assign({}, defaultOptions, _options);
    app.mixin(createMixin(options));
};

export { createMetaManager, defaultResolver as deepestResolver, defaultConfig, getCurrentManager, install as plugin, resolveOption, useActiveMeta, useMeta };
