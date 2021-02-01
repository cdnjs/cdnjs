'use strict';

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

const NAMESPACE = 'ionicons';

let scopeId;
let hostTagName;
let isSvgMode = false;
let queuePending = false;
const win = typeof window !== 'undefined' ? window : {};
const doc = win.document || { head: {} };
const plt = {
    $flags$: 0,
    $resourcesUrl$: '',
    jmp: h => h(),
    raf: h => requestAnimationFrame(h),
    ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
    rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
    ce: (eventName, opts) => new CustomEvent(eventName, opts),
};
const promiseResolve = (v) => Promise.resolve(v);
const supportsConstructibleStylesheets =  /*@__PURE__*/ (() => {
        try {
            new CSSStyleSheet();
            return typeof (new CSSStyleSheet()).replace === 'function';
        }
        catch (e) { }
        return false;
    })()
    ;
const HYDRATED_CSS = '{visibility:hidden}.hydrated{visibility:inherit}';
const createTime = (fnName, tagName = '') => {
    {
        return () => {
            return;
        };
    }
};
const uniqueTime = (key, measureText) => {
    {
        return () => {
            return;
        };
    }
};
const rootAppliedStyles = new WeakMap();
const registerStyle = (scopeId, cssText, allowCS) => {
    let style = styles.get(scopeId);
    if (supportsConstructibleStylesheets && allowCS) {
        style = (style || new CSSStyleSheet());
        style.replace(cssText);
    }
    else {
        style = cssText;
    }
    styles.set(scopeId, style);
};
const addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
    let scopeId = getScopeId(cmpMeta);
    let style = styles.get(scopeId);
    // if an element is NOT connected then getRootNode() will return the wrong root node
    // so the fallback is to always use the document for the root node in those cases
    styleContainerNode = styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : doc;
    if (style) {
        if (typeof style === 'string') {
            styleContainerNode = styleContainerNode.head || styleContainerNode;
            let appliedStyles = rootAppliedStyles.get(styleContainerNode);
            let styleElm;
            if (!appliedStyles) {
                rootAppliedStyles.set(styleContainerNode, (appliedStyles = new Set()));
            }
            if (!appliedStyles.has(scopeId)) {
                {
                    {
                        styleElm = doc.createElement('style');
                        styleElm.innerHTML = style;
                    }
                    styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
                }
                if (appliedStyles) {
                    appliedStyles.add(scopeId);
                }
            }
        }
        else if ( !styleContainerNode.adoptedStyleSheets.includes(style)) {
            styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
        }
    }
    return scopeId;
};
const attachStyles = (hostRef) => {
    const cmpMeta = hostRef.$cmpMeta$;
    const elm = hostRef.$hostElement$;
    const flags = cmpMeta.$flags$;
    const endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
    const scopeId = addStyle( elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta);
    if ( flags & 10 /* needsScopedEncapsulation */) {
        // only required when we're NOT using native shadow dom (slot)
        // or this browser doesn't support native shadow dom
        // and this host element was NOT created with SSR
        // let's pick out the inner content for slot projection
        // create a node to represent where the original
        // content was first placed, which is useful later on
        // DOM WRITE!!
        elm['s-sc'] = scopeId;
        elm.classList.add(scopeId + '-h');
    }
    endAttachStyles();
};
const getScopeId = (cmp, mode) => 'sc-' + ( cmp.$tagName$);
/**
 * Default style mode id
 */
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
const EMPTY_OBJ = {};
const isDef = (v) => v != null;
const isComplexType = (o) => {
    // https://jsperf.com/typeof-fn-object/5
    o = typeof o;
    return o === 'object' || o === 'function';
};
/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
// const stack: any[] = [];
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
const h = (nodeName, vnodeData, ...children) => {
    let child = null;
    let simple = false;
    let lastSimple = false;
    let vNodeChildren = [];
    const walk = (c) => {
        for (let i = 0; i < c.length; i++) {
            child = c[i];
            if (Array.isArray(child)) {
                walk(child);
            }
            else if (child != null && typeof child !== 'boolean') {
                if ((simple = typeof nodeName !== 'function' && !isComplexType(child))) {
                    child = String(child);
                }
                if (simple && lastSimple) {
                    // If the previous child was simple (string), we merge both
                    vNodeChildren[vNodeChildren.length - 1].$text$ += child;
                }
                else {
                    // Append a new vNode, if it's text, we create a text vNode
                    vNodeChildren.push(simple ? newVNode(null, child) : child);
                }
                lastSimple = simple;
            }
        }
    };
    walk(children);
    if (vnodeData) {
        {
            const classData = vnodeData.className || vnodeData.class;
            if (classData) {
                vnodeData.class =
                    typeof classData !== 'object'
                        ? classData
                        : Object.keys(classData)
                            .filter(k => classData[k])
                            .join(' ');
            }
        }
    }
    const vnode = newVNode(nodeName, null);
    vnode.$attrs$ = vnodeData;
    if (vNodeChildren.length > 0) {
        vnode.$children$ = vNodeChildren;
    }
    return vnode;
};
const newVNode = (tag, text) => {
    const vnode = {
        $flags$: 0,
        $tag$: tag,
        $text$: text,
        $elm$: null,
        $children$: null,
    };
    {
        vnode.$attrs$ = null;
    }
    return vnode;
};
const Host = {};
const isHost = (node) => node && node.$tag$ === Host;
/**
 * Production setAccessor() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
    if (oldValue !== newValue) {
        let isProp = isMemberInElement(elm, memberName);
        let ln = memberName.toLowerCase();
        if ( memberName === 'class') {
            const classList = elm.classList;
            const oldClasses = parseClassList(oldValue);
            const newClasses = parseClassList(newValue);
            classList.remove(...oldClasses.filter(c => c && !newClasses.includes(c)));
            classList.add(...newClasses.filter(c => c && !oldClasses.includes(c)));
        }
        else {
            // Set property if it exists and it's not a SVG
            const isComplex = isComplexType(newValue);
            if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
                try {
                    if (!elm.tagName.includes('-')) {
                        let n = newValue == null ? '' : newValue;
                        // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                        if (memberName === 'list') {
                            isProp = false;
                            // tslint:disable-next-line: triple-equals
                        }
                        else if (oldValue == null || elm[memberName] != n) {
                            elm[memberName] = n;
                        }
                    }
                    else {
                        elm[memberName] = newValue;
                    }
                }
                catch (e) { }
            }
            if (newValue == null || newValue === false) {
                if (newValue !== false || elm.getAttribute(memberName) === '') {
                    {
                        elm.removeAttribute(memberName);
                    }
                }
            }
            else if ((!isProp || flags & 4 /* isHost */ || isSvg) && !isComplex) {
                newValue = newValue === true ? '' : newValue;
                {
                    elm.setAttribute(memberName, newValue);
                }
            }
        }
    }
};
const parseClassListRegex = /\s/;
const parseClassList = (value) => (!value ? [] : value.split(parseClassListRegex));
const updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    const elm = newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
    const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
    const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
    {
        // remove attributes no longer present on the vnode by setting them to undefined
        for (memberName in oldVnodeAttrs) {
            if (!(memberName in newVnodeAttrs)) {
                setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
            }
        }
    }
    // add new & update changed attributes
    for (memberName in newVnodeAttrs) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
    }
};
const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
    // tslint:disable-next-line: prefer-const
    let newVNode = newParentVNode.$children$[childIndex];
    let i = 0;
    let elm;
    let childNode;
    if ( newVNode.$text$ !== null) {
        // create text node
        elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
    }
    else {
        // create element
        elm = newVNode.$elm$ = ( doc.createElement( newVNode.$tag$));
        // add css classes, attrs, props, listeners, etc.
        {
            updateElement(null, newVNode, isSvgMode);
        }
        if ( isDef(scopeId) && elm['s-si'] !== scopeId) {
            // if there is a scopeId and this is the initial render
            // then let's add the scopeId as a css class
            elm.classList.add((elm['s-si'] = scopeId));
        }
        if (newVNode.$children$) {
            for (i = 0; i < newVNode.$children$.length; ++i) {
                // create the node
                childNode = createElm(oldParentVNode, newVNode, i);
                // return node could have been null
                if (childNode) {
                    // append our new node
                    elm.appendChild(childNode);
                }
            }
        }
    }
    return elm;
};
const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
    let containerElm = ( parentElm);
    let childNode;
    if ( containerElm.shadowRoot && containerElm.tagName === hostTagName) {
        containerElm = containerElm.shadowRoot;
    }
    for (; startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
            childNode = createElm(null, parentVNode, startIdx);
            if (childNode) {
                vnodes[startIdx].$elm$ = childNode;
                containerElm.insertBefore(childNode,  before);
            }
        }
    }
};
const removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
    for (; startIdx <= endIdx; ++startIdx) {
        if ((vnode = vnodes[startIdx])) {
            elm = vnode.$elm$;
            // remove the vnode's element from the dom
            elm.remove();
        }
    }
};
const updateChildren = (parentElm, oldCh, newVNode, newCh) => {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let node;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            // Vnode might have been moved left
            oldStartVnode = oldCh[++oldStartIdx];
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newStartVnode)) {
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (isSameVnode(oldEndVnode, newEndVnode)) {
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            patch(oldStartVnode, newEndVnode);
            parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            patch(oldEndVnode, newStartVnode);
            parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            {
                // new element
                node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx);
                newStartVnode = newCh[++newStartIdx];
            }
            if (node) {
                {
                    oldStartVnode.$elm$.parentNode.insertBefore(node, oldStartVnode.$elm$);
                }
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode, newCh, newStartIdx, newEndIdx);
    }
    else if ( newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
};
const isSameVnode = (vnode1, vnode2) => {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (vnode1.$tag$ === vnode2.$tag$) {
        return true;
    }
    return false;
};
const patch = (oldVNode, newVNode) => {
    const elm = (newVNode.$elm$ = oldVNode.$elm$);
    const oldChildren = oldVNode.$children$;
    const newChildren = newVNode.$children$;
    const text = newVNode.$text$;
    if ( text === null) {
        // element node
        {
            {
                // either this is the first render of an element OR it's an update
                // AND we already know it's possible it could have changed
                // this updates the element's css classes, attrs, props, listeners, etc.
                updateElement(oldVNode, newVNode, isSvgMode);
            }
        }
        if ( oldChildren !== null && newChildren !== null) {
            // looks like there's child vnodes for both the old and new vnodes
            updateChildren(elm, oldChildren, newVNode, newChildren);
        }
        else if (newChildren !== null) {
            // no old child vnodes, but there are new child vnodes to add
            if ( oldVNode.$text$ !== null) {
                // the old vnode was text, so be sure to clear it out
                elm.textContent = '';
            }
            // add the new vnode children
            addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        }
        else if ( oldChildren !== null) {
            // no new child vnodes, but there are old child vnodes to remove
            removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
    }
    else if ( oldVNode.$text$ !== text) {
        // update the text content for the text only vnode
        // and also only if the text is different than before
        elm.data = text;
    }
};
const renderVdom = (hostRef, renderFnResults) => {
    const hostElm = hostRef.$hostElement$;
    const cmpMeta = hostRef.$cmpMeta$;
    const oldVNode = hostRef.$vnode$ || newVNode(null, null);
    const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
    hostTagName = hostElm.tagName;
    if ( cmpMeta.$attrsToReflect$) {
        rootVnode.$attrs$ = rootVnode.$attrs$ || {};
        cmpMeta.$attrsToReflect$.map(([propName, attribute]) => (rootVnode.$attrs$[attribute] = hostElm[propName]));
    }
    rootVnode.$tag$ = null;
    rootVnode.$flags$ |= 4 /* isHost */;
    hostRef.$vnode$ = rootVnode;
    rootVnode.$elm$ = oldVNode.$elm$ = ( hostElm.shadowRoot || hostElm );
    {
        scopeId = hostElm['s-sc'];
    }
    // synchronous patch
    patch(oldVNode, rootVnode);
};
const getElement = (ref) => ( getHostRef(ref).$hostElement$ );
const emitEvent = (elm, name, opts) => {
    const ev = plt.ce(name, opts);
    elm.dispatchEvent(ev);
    return ev;
};
const attachToAncestor = (hostRef, ancestorComponent) => {
    if ( ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent['s-p']) {
        ancestorComponent['s-p'].push(new Promise(r => (hostRef.$onRenderResolve$ = r)));
    }
};
const scheduleUpdate = (hostRef, isInitialLoad) => {
    {
        hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
    }
    if ( hostRef.$flags$ & 4 /* isWaitingForChildren */) {
        hostRef.$flags$ |= 512 /* needsRerender */;
        return;
    }
    attachToAncestor(hostRef, hostRef.$ancestorComponent$);
    // there is no ancestor component or the ancestor component
    // has already fired off its lifecycle update then
    // fire off the initial update
    const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
    return  writeTask(dispatch) ;
};
const dispatchHooks = (hostRef, isInitialLoad) => {
    const endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$);
    const instance =  hostRef.$lazyInstance$ ;
    let promise;
    endSchedule();
    return then(promise, () => updateComponent(hostRef, instance, isInitialLoad));
};
const updateComponent = async (hostRef, instance, isInitialLoad) => {
    // updateComponent
    const elm = hostRef.$hostElement$;
    const endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$);
    const rc = elm['s-rc'];
    if ( isInitialLoad) {
        // DOM WRITE!
        attachStyles(hostRef);
    }
    const endRender = createTime('render', hostRef.$cmpMeta$.$tagName$);
    {
        callRender(hostRef, instance);
    }
    if ( rc) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        rc.map(cb => cb());
        elm['s-rc'] = undefined;
    }
    endRender();
    endUpdate();
    {
        const childrenPromises = elm['s-p'];
        const postUpdate = () => postUpdateComponent(hostRef);
        if (childrenPromises.length === 0) {
            postUpdate();
        }
        else {
            Promise.all(childrenPromises).then(postUpdate);
            hostRef.$flags$ |= 4 /* isWaitingForChildren */;
            childrenPromises.length = 0;
        }
    }
};
const callRender = (hostRef, instance, elm) => {
    try {
        instance =  instance.render() ;
        {
            hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
        }
        {
            hostRef.$flags$ |= 2 /* hasRendered */;
        }
        {
            {
                // looks like we've got child nodes to render into this host element
                // or we need to update the css class/attrs on the host element
                // DOM WRITE!
                {
                    renderVdom(hostRef, instance);
                }
            }
        }
    }
    catch (e) {
        consoleError(e, hostRef.$hostElement$);
    }
    return null;
};
const postUpdateComponent = (hostRef) => {
    const tagName = hostRef.$cmpMeta$.$tagName$;
    const elm = hostRef.$hostElement$;
    const endPostUpdate = createTime('postUpdate', tagName);
    const ancestorComponent = hostRef.$ancestorComponent$;
    if (!(hostRef.$flags$ & 64 /* hasLoadedComponent */)) {
        hostRef.$flags$ |= 64 /* hasLoadedComponent */;
        {
            // DOM WRITE!
            addHydratedFlag(elm);
        }
        endPostUpdate();
        {
            hostRef.$onReadyResolve$(elm);
            if (!ancestorComponent) {
                appDidLoad();
            }
        }
    }
    else {
        endPostUpdate();
    }
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    {
        if (hostRef.$onRenderResolve$) {
            hostRef.$onRenderResolve$();
            hostRef.$onRenderResolve$ = undefined;
        }
        if (hostRef.$flags$ & 512 /* needsRerender */) {
            nextTick(() => scheduleUpdate(hostRef, false));
        }
        hostRef.$flags$ &= ~(4 /* isWaitingForChildren */ | 512 /* needsRerender */);
    }
    // ( •_•)
    // ( •_•)>⌐■-■
    // (⌐■_■)
};
const appDidLoad = (who) => {
    // on appload
    // we have finish the first big initial render
    {
        addHydratedFlag(doc.documentElement);
    }
    nextTick(() => emitEvent(win, 'appload', { detail: { namespace: NAMESPACE } }));
};
const safeCall = (instance, method, arg) => {
    if (instance && instance[method]) {
        try {
            return instance[method](arg);
        }
        catch (e) {
            consoleError(e);
        }
    }
    return undefined;
};
const then = (promise, thenFn) => {
    return promise && promise.then ? promise.then(thenFn) : thenFn();
};
const addHydratedFlag = (elm) => ( elm.classList.add('hydrated') );
const parsePropertyValue = (propValue, propType) => {
    // ensure this value is of the correct prop type
    if (propValue != null && !isComplexType(propValue)) {
        if ( propType & 4 /* Boolean */) {
            // per the HTML spec, any string value means it is a boolean true value
            // but we'll cheat here and say that the string "false" is the boolean false
            return propValue === 'false' ? false : propValue === '' || !!propValue;
        }
        if ( propType & 1 /* String */) {
            // could have been passed as a number or boolean
            // but we still want it as a string
            return String(propValue);
        }
        // redundant return here for better minification
        return propValue;
    }
    // not sure exactly what type we want
    // so no need to change to a different type
    return propValue;
};
const getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
const setValue = (ref, propName, newVal, cmpMeta) => {
    // check our new property value against our internal value
    const hostRef = getHostRef(ref);
    const elm =  hostRef.$hostElement$ ;
    const oldVal = hostRef.$instanceValues$.get(propName);
    const flags = hostRef.$flags$;
    const instance =  hostRef.$lazyInstance$ ;
    newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
    if (( !(flags & 8 /* isConstructingInstance */) || oldVal === undefined) && newVal !== oldVal) {
        // gadzooks! the property's value has changed!!
        // set our new value!
        hostRef.$instanceValues$.set(propName, newVal);
        if ( instance) {
            // get an array of method names of watch functions to call
            if ( cmpMeta.$watchers$ && flags & 128 /* isWatchReady */) {
                const watchMethods = cmpMeta.$watchers$[propName];
                if (watchMethods) {
                    // this instance is watching for when this property changed
                    watchMethods.map(watchMethodName => {
                        try {
                            // fire off each of the watch methods that are watching this property
                            instance[watchMethodName](newVal, oldVal, propName);
                        }
                        catch (e) {
                            consoleError(e, elm);
                        }
                    });
                }
            }
            if ( (flags & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
                // looks like this value actually changed, so we've got work to do!
                // but only if we've already rendered, otherwise just chill out
                // queue that we need to do an update, but don't worry about queuing
                // up millions cuz this function ensures it only runs once
                scheduleUpdate(hostRef, false);
            }
        }
    }
};
const proxyComponent = (Cstr, cmpMeta, flags) => {
    if ( cmpMeta.$members$) {
        if ( Cstr.watchers) {
            cmpMeta.$watchers$ = Cstr.watchers;
        }
        // It's better to have a const than two Object.entries()
        const members = Object.entries(cmpMeta.$members$);
        const prototype = Cstr.prototype;
        members.map(([memberName, [memberFlags]]) => {
            if ( (memberFlags & 31 /* Prop */ || (( flags & 2 /* proxyState */) && memberFlags & 32 /* State */))) {
                // proxyComponent - prop
                Object.defineProperty(prototype, memberName, {
                    get() {
                        // proxyComponent, get value
                        return getValue(this, memberName);
                    },
                    set(newValue) {
                        // proxyComponent, set value
                        setValue(this, memberName, newValue, cmpMeta);
                    },
                    configurable: true,
                    enumerable: true,
                });
            }
        });
        if ( ( flags & 1 /* isElementConstructor */)) {
            const attrNameToPropName = new Map();
            prototype.attributeChangedCallback = function (attrName, _oldValue, newValue) {
                plt.jmp(() => {
                    const propName = attrNameToPropName.get(attrName);
                    this[propName] = newValue === null && typeof this[propName] === 'boolean' ? false : newValue;
                });
            };
            // create an array of attributes to observe
            // and also create a map of html attribute name to js property name
            Cstr.observedAttributes = members
                .filter(([_, m]) => m[0] & 15 /* HasAttribute */) // filter to only keep props that should match attributes
                .map(([propName, m]) => {
                const attrName = m[1] || propName;
                attrNameToPropName.set(attrName, propName);
                if ( m[0] & 512 /* ReflectAttr */) {
                    cmpMeta.$attrsToReflect$.push([propName, attrName]);
                }
                return attrName;
            });
        }
    }
    return Cstr;
};
const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
    // initializeComponent
    if ( (hostRef.$flags$ & 32 /* hasInitializedComponent */) === 0) {
        {
            // we haven't initialized this element yet
            hostRef.$flags$ |= 32 /* hasInitializedComponent */;
            // lazy loaded components
            // request the component's implementation to be
            // wired up with the host element
            Cstr = loadModule(cmpMeta);
            if (Cstr.then) {
                // Await creates a micro-task avoid if possible
                const endLoad = uniqueTime();
                Cstr = await Cstr;
                endLoad();
            }
            if ( !Cstr.isProxied) {
                // we'eve never proxied this Constructor before
                // let's add the getters/setters to its prototype before
                // the first time we create an instance of the implementation
                {
                    cmpMeta.$watchers$ = Cstr.watchers;
                }
                proxyComponent(Cstr, cmpMeta, 2 /* proxyState */);
                Cstr.isProxied = true;
            }
            const endNewInstance = createTime('createInstance', cmpMeta.$tagName$);
            // ok, time to construct the instance
            // but let's keep track of when we start and stop
            // so that the getters/setters don't incorrectly step on data
            {
                hostRef.$flags$ |= 8 /* isConstructingInstance */;
            }
            // construct the lazy-loaded component implementation
            // passing the hostRef is very important during
            // construction in order to directly wire together the
            // host element and the lazy-loaded instance
            try {
                new Cstr(hostRef);
            }
            catch (e) {
                consoleError(e);
            }
            {
                hostRef.$flags$ &= ~8 /* isConstructingInstance */;
            }
            {
                hostRef.$flags$ |= 128 /* isWatchReady */;
            }
            endNewInstance();
            fireConnectedCallback(hostRef.$lazyInstance$);
        }
        if ( Cstr.style) {
            // this component has styles but we haven't registered them yet
            let style = Cstr.style;
            const scopeId = getScopeId(cmpMeta);
            if (!styles.has(scopeId)) {
                const endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);
                registerStyle(scopeId, style, !!(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */));
                endRegisterStyles();
            }
        }
    }
    // we've successfully created a lazy instance
    const ancestorComponent = hostRef.$ancestorComponent$;
    const schedule = () => scheduleUpdate(hostRef, true);
    if ( ancestorComponent && ancestorComponent['s-rc']) {
        // this is the intial load and this component it has an ancestor component
        // but the ancestor component has NOT fired its will update lifecycle yet
        // so let's just cool our jets and wait for the ancestor to continue first
        // this will get fired off when the ancestor component
        // finally gets around to rendering its lazy self
        // fire off the initial update
        ancestorComponent['s-rc'].push(schedule);
    }
    else {
        schedule();
    }
};
const fireConnectedCallback = (instance) => {
    {
        safeCall(instance, 'connectedCallback');
    }
};
const connectedCallback = (elm) => {
    if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
        const hostRef = getHostRef(elm);
        const cmpMeta = hostRef.$cmpMeta$;
        const endConnected = createTime('connectedCallback', cmpMeta.$tagName$);
        if (!(hostRef.$flags$ & 1 /* hasConnected */)) {
            // first time this component has connected
            hostRef.$flags$ |= 1 /* hasConnected */;
            {
                // find the first ancestor component (if there is one) and register
                // this component as one of the actively loading child components for its ancestor
                let ancestorComponent = elm;
                while ((ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host)) {
                    // climb up the ancestors looking for the first
                    // component that hasn't finished its lifecycle update yet
                    if (
                        ancestorComponent['s-p']) {
                        // we found this components first ancestor component
                        // keep a reference to this component's ancestor component
                        attachToAncestor(hostRef, (hostRef.$ancestorComponent$ = ancestorComponent));
                        break;
                    }
                }
            }
            // Lazy properties
            // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
            if ( cmpMeta.$members$) {
                Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
                    if (memberFlags & 31 /* Prop */ && elm.hasOwnProperty(memberName)) {
                        const value = elm[memberName];
                        delete elm[memberName];
                        elm[memberName] = value;
                    }
                });
            }
            {
                initializeComponent(elm, hostRef, cmpMeta);
            }
        }
        else {
            // fire off connectedCallback() on component instance
            fireConnectedCallback(hostRef.$lazyInstance$);
        }
        endConnected();
    }
};
const disconnectedCallback = (elm) => {
    if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
        const hostRef = getHostRef(elm);
        const instance =  hostRef.$lazyInstance$ ;
        {
            safeCall(instance, 'disconnectedCallback');
        }
    }
};
const bootstrapLazy = (lazyBundles, options = {}) => {
    const endBootstrap = createTime();
    const cmpTags = [];
    const exclude = options.exclude || [];
    const customElements = win.customElements;
    const head = doc.head;
    const metaCharset = /*@__PURE__*/ head.querySelector('meta[charset]');
    const visibilityStyle = /*@__PURE__*/ doc.createElement('style');
    const deferredConnectedCallbacks = [];
    let appLoadFallback;
    let isBootstrapping = true;
    Object.assign(plt, options);
    plt.$resourcesUrl$ = new URL(options.resourcesUrl || './', doc.baseURI).href;
    lazyBundles.map(lazyBundle => lazyBundle[1].map(compactMeta => {
        const cmpMeta = {
            $flags$: compactMeta[0],
            $tagName$: compactMeta[1],
            $members$: compactMeta[2],
            $listeners$: compactMeta[3],
        };
        {
            cmpMeta.$members$ = compactMeta[2];
        }
        {
            cmpMeta.$attrsToReflect$ = [];
        }
        {
            cmpMeta.$watchers$ = {};
        }
        const tagName =  cmpMeta.$tagName$;
        const HostElement = class extends HTMLElement {
            // StencilLazyHost
            constructor(self) {
                // @ts-ignore
                super(self);
                self = this;
                registerHost(self, cmpMeta);
                if ( cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
                    // this component is using shadow dom
                    // and this browser supports shadow dom
                    // add the read-only property "shadowRoot" to the host element
                    // adding the shadow root build conditionals to minimize runtime
                    {
                        {
                            self.attachShadow({ mode: 'open' });
                        }
                    }
                }
            }
            connectedCallback() {
                if (appLoadFallback) {
                    clearTimeout(appLoadFallback);
                    appLoadFallback = null;
                }
                if (isBootstrapping) {
                    // connectedCallback will be processed once all components have been registered
                    deferredConnectedCallbacks.push(this);
                }
                else {
                    plt.jmp(() => connectedCallback(this));
                }
            }
            disconnectedCallback() {
                plt.jmp(() => disconnectedCallback(this));
            }
            componentOnReady() {
                return getHostRef(this).$onReadyPromise$;
            }
        };
        cmpMeta.$lazyBundleId$ = lazyBundle[0];
        if (!exclude.includes(tagName) && !customElements.get(tagName)) {
            cmpTags.push(tagName);
            customElements.define(tagName, proxyComponent(HostElement, cmpMeta, 1 /* isElementConstructor */));
        }
    }));
    {
        visibilityStyle.innerHTML = cmpTags + HYDRATED_CSS;
        visibilityStyle.setAttribute('data-styles', '');
        head.insertBefore(visibilityStyle, metaCharset ? metaCharset.nextSibling : head.firstChild);
    }
    // Process deferred connectedCallbacks now all components have been registered
    isBootstrapping = false;
    if (deferredConnectedCallbacks.length) {
        deferredConnectedCallbacks.map(host => host.connectedCallback());
    }
    else {
        {
            plt.jmp(() => (appLoadFallback = setTimeout(appDidLoad, 30)));
        }
    }
    // Fallback appLoad event
    endBootstrap();
};
const getAssetPath = (path) => {
    const assetUrl = new URL(path, plt.$resourcesUrl$);
    return assetUrl.origin !== win.location.origin ? assetUrl.href : assetUrl.pathname;
};
const hostRefs = new WeakMap();
const getHostRef = (ref) => hostRefs.get(ref);
const registerInstance = (lazyInstance, hostRef) => hostRefs.set((hostRef.$lazyInstance$ = lazyInstance), hostRef);
const registerHost = (elm, cmpMeta) => {
    const hostRef = {
        $flags$: 0,
        $hostElement$: elm,
        $cmpMeta$: cmpMeta,
        $instanceValues$: new Map(),
    };
    {
        hostRef.$onReadyPromise$ = new Promise(r => (hostRef.$onReadyResolve$ = r));
        elm['s-p'] = [];
        elm['s-rc'] = [];
    }
    return hostRefs.set(elm, hostRef);
};
const isMemberInElement = (elm, memberName) => memberName in elm;
const consoleError = (e, el) => ( 0, console.error)(e, el);
const cmpModules = /*@__PURE__*/ new Map();
const loadModule = (cmpMeta, hostRef, hmrVersionId) => {
    // loadModuleImport
    const exportName = cmpMeta.$tagName$.replace(/-/g, '_');
    const bundleId = cmpMeta.$lazyBundleId$;
    const module =  cmpModules.get(bundleId) ;
    if (module) {
        return module[exportName];
    }
    return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(
    /* webpackInclude: /\.entry\.js$/ */
    /* webpackExclude: /\.system\.entry\.js$/ */
    /* webpackMode: "lazy" */
    `./${bundleId}.entry.js${ ''}`)); }).then(importedModule => {
        {
            cmpModules.set(bundleId, importedModule);
        }
        return importedModule[exportName];
    }, consoleError);
};
const styles = new Map();
const queueDomReads = [];
const queueDomWrites = [];
const queueTask = (queue, write) => (cb) => {
    queue.push(cb);
    if (!queuePending) {
        queuePending = true;
        if (write && plt.$flags$ & 4 /* queueSync */) {
            nextTick(flush);
        }
        else {
            plt.raf(flush);
        }
    }
};
const consume = (queue) => {
    for (let i = 0; i < queue.length; i++) {
        try {
            queue[i](performance.now());
        }
        catch (e) {
            consoleError(e);
        }
    }
    queue.length = 0;
};
const flush = () => {
    // always force a bunch of medium callbacks to run, but still have
    // a throttle on how many can run in a certain time
    // DOM READS!!!
    consume(queueDomReads);
    // DOM WRITES!!!
    {
        consume(queueDomWrites);
        if ((queuePending = queueDomReads.length > 0)) {
            // still more to do yet, but we've run out of time
            // let's let this thing cool off and try again in the next tick
            plt.raf(flush);
        }
    }
};
const nextTick = /*@__PURE__*/ (cb) => promiseResolve().then(cb);
const writeTask = /*@__PURE__*/ queueTask(queueDomWrites, true);

exports.Host = Host;
exports.bootstrapLazy = bootstrapLazy;
exports.getAssetPath = getAssetPath;
exports.getElement = getElement;
exports.h = h;
exports.promiseResolve = promiseResolve;
exports.registerInstance = registerInstance;
