!function(global, factory) {
    'object' == typeof exports && 'undefined' != typeof module ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
}(this, function(exports) {
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
        this.key = attributes && attributes.key;
    }
    function extend(obj, props) {
        if (props) for (var i in props) if (void 0 !== props[i]) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        return extend({}, obj);
    }
    function memoize(fn) {
        var mem = {};
        return function(k) {
            return mem[k] || (mem[k] = fn(k));
        };
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function toArray(obj, offset) {
        return [].slice.call(obj, offset);
    }
    function isFunction(obj) {
        return 'function' == typeof obj;
    }
    function isString(obj) {
        return 'string' == typeof obj;
    }
    function empty(x) {
        return void 0 === x || null === x;
    }
    function falsey(value) {
        return value === !1 || empty(value);
    }
    function styleObjToCss(s) {
        var str = '';
        for (var prop in s) {
            var val = s[prop];
            if (!empty(val)) {
                if (str) str += ' ';
                str += jsToCss(prop);
                str += ': ';
                str += val;
                if ('number' == typeof val && !NON_DIMENSION_PROPS[prop]) str += 'px';
                str += ';';
            }
        }
        return str;
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function optionsHook(name, a) {
        return hook(options, name, a);
    }
    function hook(obj, name, a, b, c) {
        if (obj[name]) return obj[name](a, b, c);
    }
    function deepHook(obj, type) {
        do hook(obj, type); while (obj = obj._component);
    }
    function h(nodeName, attributes, firstChild) {
        var children, arr, lastSimple, len = arguments.length;
        if (len > 2) {
            var type = typeof firstChild;
            if (3 === len && 'object' !== type && 'function' !== type) {
                if (!falsey(firstChild)) children = [ String(firstChild) ];
            } else {
                children = [];
                for (var i = 2; i < len; i++) {
                    var _p = arguments[i];
                    if (!falsey(_p)) {
                        if (_p.join) arr = _p; else (arr = SHARED_TEMP_ARRAY)[0] = _p;
                        for (var j = 0; j < arr.length; j++) {
                            var child = arr[j], simple = !(falsey(child) || isFunction(child) || child instanceof VNode);
                            if (simple && !isString(child)) child = String(child);
                            if (simple && lastSimple) children[children.length - 1] += child; else if (!falsey(child)) children.push(child);
                            lastSimple = simple;
                        }
                    } else ;
                }
            }
        } else if (attributes && attributes.children) return h(nodeName, attributes, attributes.children);
        if (attributes) {
            if (attributes.children) delete attributes.children;
            if (!isFunction(nodeName)) {
                if ('className' in attributes) {
                    attributes['class'] = attributes.className;
                    delete attributes.className;
                }
                lastSimple = attributes['class'];
                if (lastSimple && !isString(lastSimple)) attributes['class'] = hashToClassName(lastSimple);
                lastSimple = attributes.style;
                if (lastSimple && !isString(lastSimple)) attributes.style = styleObjToCss(lastSimple);
            }
        }
        var p = new VNode(nodeName, attributes || void 0, children);
        optionsHook('vnode', p);
        return p;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? toArray(arguments, 2) : vnode.children);
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.'), p0 = path[0], len = path.length;
        return function(e) {
            var _component$setState;
            var v, i, t = e && e.currentTarget || this, s = component.state, obj = s;
            if (isString(eventPath)) {
                v = delve(e, eventPath);
                if (empty(v) && (t = t._component)) v = delve(t, eventPath);
            } else v = (t.nodeName + t.type).match(/^input(check|rad)/i) ? t.checked : t.value;
            if (isFunction(v)) v = v.call(t);
            if (len > 1) {
                for (i = 0; i < len - 1; i++) obj = obj[path[i]] || (obj[path[i]] = {});
                obj[path[i]] = v;
                v = s[p0];
            }
            component.setState((_component$setState = {}, _component$setState[p0] = v, _component$setState));
        };
    }
    function enqueueRender(component) {
        if (1 === items.push(component)) (options.debounceRendering || setImmediate)(rerender);
    }
    function rerender() {
        if (items.length) {
            var p, currentItems = items;
            items = itemsOffline;
            itemsOffline = currentItems;
            while (p = currentItems.pop()) if (p._dirty) renderComponent(p);
        }
    }
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY) || EMPTY_BASE;
    }
    function ensureNodeData(node, data) {
        return node[ATTR_KEY] || (node[ATTR_KEY] = data || {});
    }
    function getNodeType(node) {
        if (node instanceof Text) return 3;
        if (node instanceof Element) return 1; else return 0;
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function setAccessor(node, name, value, isSvg) {
        ensureNodeData(node)[name] = value;
        if ('key' !== name && 'children' !== name) if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) node.style.cssText = value || ''; else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html;
        } else if ('type' !== name && !isSvg && name in node) {
            setProperty(node, name, empty(value) ? '' : value);
            if (falsey(value)) node.removeAttribute(name);
        } else if ('o' === name[0] && 'n' === name[1]) {
            var l = node._listeners || (node._listeners = {});
            name = toLowerCase(name.substring(2));
            if (!l[name]) node.addEventListener(name, eventProxy); else if (!value) node.removeEventListener(name, eventProxy);
            l[name] = value;
        } else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (falsey(value)) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](optionsHook('event', e) || e);
    }
    function getRawNodeAttributes(node) {
        var attrs = {};
        for (var i = node.attributes.length; i--; ) attrs[node.attributes[i].name] = node.attributes[i].value;
        return attrs;
    }
    function isSameNodeType(node, vnode) {
        if (isString(vnode)) return 3 === getNodeType(node);
        var nodeName = vnode.nodeName, type = typeof nodeName;
        if ('string' === type) return isNamedNode(node, nodeName);
        if ('function' === type) return node._componentConstructor === nodeName || isFunctionalComponent(vnode); else ;
    }
    function isNamedNode(node, nodeName) {
        return (node.normalizedNodeName || toLowerCase(node.nodeName)) === toLowerCase(nodeName);
    }
    function getNodeProps(vnode) {
        var defaultProps = vnode.nodeName.defaultProps, props = clone(defaultProps || vnode.attributes);
        if (defaultProps) extend(props, vnode.attributes);
        if (vnode.children) props.children = vnode.children;
        return props;
    }
    function collectNode(node) {
        cleanNode(node);
        var name = toLowerCase(node.nodeName), list = nodes[name];
        if (list) list.push(node); else nodes[name] = [ node ];
    }
    function createNode(nodeName, isSvg) {
        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        ensureNodeData(node);
        node.normalizedNodeName = name;
        return node;
    }
    function cleanNode(node) {
        removeNode(node);
        if (3 !== getNodeType(node)) {
            ensureNodeData(node, getRawNodeAttributes(node));
            node._component = node._componentConstructor = null;
        }
    }
    function diff(dom, vnode, context, mountAll, unmountChildrenOnly) {
        var originalAttributes = vnode.attributes;
        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
        if (isString(vnode)) {
            if (dom) {
                if (3 === getNodeType(dom)) {
                    if (dom.nodeValue !== vnode) dom.nodeValue = vnode;
                    return dom;
                }
                if (!unmountChildrenOnly) collectNode(dom);
            }
            return document.createTextNode(vnode);
        }
        var svgMode, out = dom, nodeName = vnode.nodeName;
        if (isFunction(nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
        if (!isString(nodeName)) nodeName = String(nodeName);
        svgMode = 'svg' === toLowerCase(nodeName);
        if (svgMode) SVG_MODE = !0;
        if (!dom) out = createNode(nodeName, SVG_MODE); else if (!isNamedNode(dom, nodeName)) {
            out = createNode(nodeName, SVG_MODE);
            while (dom.firstChild) out.appendChild(dom.firstChild);
            if (!unmountChildrenOnly) recollectNodeTree(dom);
        }
        diffNode(out, vnode.children, context, mountAll);
        diffAttributes(out, vnode.attributes);
        if (originalAttributes && originalAttributes.ref) (out[ATTR_KEY].ref = originalAttributes.ref)(out);
        if (svgMode) SVG_MODE = !1;
        return out;
    }
    function diffNode(dom, vchildren, context, mountAll) {
        var firstChild = dom.firstChild;
        if (vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && firstChild instanceof Text && 1 === dom.childNodes.length) firstChild.nodeValue = vchildren[0]; else if (vchildren || firstChild) innerDiffNode(dom, vchildren, context, mountAll);
    }
    function getKey(child) {
        var c = child._component;
        if (c) return c.__key;
        var data = child[ATTR_KEY];
        if (data) return data.key; else ;
    }
    function innerDiffNode(dom, vchildren, context, mountAll) {
        var children, keyed, originalChildren = dom.childNodes, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0;
        if (len) {
            children = [];
            for (var i = 0; i < len; i++) {
                var child = originalChildren[i], key = getKey(child);
                if (key || 0 === key) {
                    if (!keyedLen++) keyed = {};
                    keyed[key] = child;
                } else children[childrenLen++] = child;
            }
        }
        if (vchildren) for (var i = 0; i < vchildren.length; i++) {
            var vchild = vchildren[i], child = void 0;
            if (keyedLen && vchild.attributes) {
                var key = vchild.key;
                if (!empty(key) && key in keyed) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            }
            if (!child && min < childrenLen) for (var j = min; j < childrenLen; j++) {
                var _c = children[j];
                if (_c && isSameNodeType(_c, vchild)) {
                    child = _c;
                    children[j] = void 0;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = diff(child, vchild, context, mountAll);
            var c = (mountAll || child.parentNode !== dom) && child._component;
            if (c) deepHook(c, 'componentWillMount');
            var next = originalChildren[i];
            if (next !== child) if (next) dom.insertBefore(child, next); else dom.appendChild(child);
            if (c) deepHook(c, 'componentDidMount');
        }
        if (keyedLen) for (var i in keyed) if (keyed[i]) children[min = childrenLen++] = keyed[i];
        if (min < childrenLen) removeOrphanedChildren(children);
    }
    function removeOrphanedChildren(children, unmountOnly) {
        for (var i = children.length; i--; ) {
            var child = children[i];
            if (child) recollectNodeTree(child, unmountOnly);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var attrs = node[ATTR_KEY];
        if (attrs) hook(attrs, 'ref', null);
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly); else {
            if (!unmountOnly) {
                if (1 !== getNodeType(node)) {
                    removeNode(node);
                    return;
                }
                collectNode(node);
            }
            var c = node.childNodes;
            if (c && c.length) removeOrphanedChildren(c, unmountOnly);
        }
    }
    function diffAttributes(dom, attrs) {
        var old = dom[ATTR_KEY] || getRawNodeAttributes(dom);
        for (var _name in old) if (!(attrs && _name in attrs)) setAccessor(dom, _name, null, SVG_MODE);
        if (attrs) for (var _name2 in attrs) if (!(_name2 in old) || attrs[_name2] != ('value' === _name2 || 'selected' === _name2 || 'checked' === _name2 ? dom[_name2] : old[_name2])) setAccessor(dom, _name2, attrs[_name2], SVG_MODE);
    }
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list) list.push(component); else components[name] = [ component ];
    }
    function createComponent(Ctor, props, context, fresh) {
        var inst = new Ctor(props, context), list = !fresh && components[Ctor.name];
        if (list) for (var i = 0; i < list.length; i++) if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].base;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function triggerComponentRender(component) {
        if (!component._dirty) {
            component._dirty = !0;
            enqueueRender(component);
        }
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        var d = component._disableRendering === !0;
        component._disableRendering = !0;
        if (component.__ref = props.ref) delete props.ref;
        if (component.__key = props.key) delete props.key;
        if (!empty(component.base)) hook(component, 'componentWillReceiveProps', props, context);
        if (context && context !== component.context) {
            if (!component.prevContext) component.prevContext = component.context;
            component.context = context;
        }
        if (!component.prevProps) component.prevProps = component.props;
        component.props = props;
        component._disableRendering = d;
        if (opts !== NO_RENDER) if (opts === SYNC_RENDER || options.syncComponentUpdates !== !1) renderComponent(component, SYNC_RENDER, mountAll); else triggerComponentRender(component);
        hook(component, '__ref', component);
    }
    function renderComponent(component, opts, mountAll) {
        if (!component._disableRendering) {
            var skip, rendered, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, initialBase = isUpdate || component.nextBase, initialComponent = initialBase && initialBase._component;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (opts !== FORCE_RENDER && hook(component, 'shouldComponentUpdate', props, state, context) === !1) skip = !0; else hook(component, 'componentWillUpdate', props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                rendered = hook(component, 'render', props, state, context);
                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if (isFunction(childComponent) && childComponent.prototype.render) {
                    var inst = component._component, childProps = getNodeProps(rendered);
                    if (inst && inst.constructor === childComponent) setComponentProps(inst, childProps, SYNC_RENDER, context); else {
                        toUnmount = inst;
                        inst = createComponent(childComponent, childProps, context, !1);
                        inst._parentComponent = component;
                        component._component = inst;
                        if (isUpdate) deepHook(inst, 'componentWillMount');
                        setComponentProps(inst, childProps, NO_RENDER, context);
                        renderComponent(inst, SYNC_RENDER);
                        if (isUpdate) deepHook(inst, 'componentDidMount');
                    }
                    base = inst.base;
                } else {
                    var cbase = initialBase;
                    toUnmount = component._component;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || opts === SYNC_RENDER) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered || EMPTY_BASE, context, mountAll || !isUpdate, !0);
                    }
                }
                if (initialBase && base !== initialBase) {
                    var p = initialBase.parentNode;
                    if (p && base !== p) p.replaceChild(base, initialBase);
                    if (!toUnmount && initialComponent === component) {
                        initialBase._component = null;
                        recollectNodeTree(initialBase);
                    }
                }
                if (toUnmount) unmountComponent(toUnmount, !0);
                component.base = base;
                if (base) {
                    var componentRef = component, t = component;
                    while (t = t._parentComponent) componentRef = t;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
                if (isUpdate) hook(component, 'componentDidUpdate', previousProps, previousState, previousContext);
            }
            var fn, cb = component._renderCallbacks;
            if (cb) while (fn = cb.pop()) fn.call(component);
            return rendered;
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner;
        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
        if (isOwner && (!mountAll || c._component)) {
            setComponentProps(c, getNodeProps(vnode), SYNC_RENDER, context, mountAll);
            dom = c.base;
        } else {
            if (c && !isDirectOwner) {
                unmountComponent(c, !0);
                dom = oldDom = null;
            }
            dom = createComponentFromVNode(vnode, dom, context, mountAll);
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function createComponentFromVNode(vnode, dom, context, mountAll) {
        var props = getNodeProps(vnode);
        var component = createComponent(vnode.nodeName, props, context, !!dom);
        if (dom) component.nextBase = dom;
        setComponentProps(component, props, SYNC_RENDER, context, mountAll);
        return component.base;
    }
    function unmountComponent(component, remove) {
        hook(component, '__ref', null);
        hook(component, 'componentWillUnmount');
        var inner = component._component;
        if (inner) {
            unmountComponent(inner, remove);
            remove = !1;
        }
        var base = component.base;
        if (base) {
            if (remove !== !1) removeNode(base);
            removeOrphanedChildren(base.childNodes, !0);
        }
        if (remove) {
            component._parentComponent = null;
            collectComponent(component);
        }
        hook(component, 'componentDidUnmount');
    }
    function Component(props, context) {
        this._dirty = !0;
        this._disableRendering = !1;
        this.prevState = this.prevProps = this.prevContext = this.base = this.nextBase = this._parentComponent = this._component = this.__ref = this.__key = this._linkedStates = this._renderCallbacks = null;
        this.context = context || {};
        this.props = props;
        this.state = hook(this, 'getInitialState') || {};
    }
    function render(vnode, parent, merge) {
        var existing = merge && merge._component && merge._componentConstructor === vnode.nodeName, built = diff(merge, vnode, {}, !1), c = !existing && built._component;
        if (c) deepHook(c, 'componentWillMount');
        if (built.parentNode !== parent) parent.appendChild(built);
        if (c) deepHook(c, 'componentDidMount');
        return built;
    }
    var NO_RENDER = 0;
    var SYNC_RENDER = 1;
    var FORCE_RENDER = 2;
    var EMPTY = {};
    var EMPTY_BASE = '';
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol['for']('preactattr') : '__preactattr_';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var jsToCss = memoize(function(s) {
        return toLowerCase(s.replace(/([A-Z])/g, '-$1'));
    });
    var toLowerCase = memoize(function(s) {
        return s.toLowerCase();
    });
    var resolved = 'undefined' != typeof Promise && Promise.resolve();
    var setImmediate = resolved ? function(f) {
        resolved.then(f);
    } : setTimeout;
    var options = {
        vnode: empty
    };
    var SHARED_TEMP_ARRAY = [];
    var items = [];
    var itemsOffline = [];
    var nodes = {};
    var SVG_MODE = !1;
    var components = {};
    extend(Component.prototype, {
        linkState: function(key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {}), cacheKey = key + '|' + eventPath;
            return c[cacheKey] || (c[cacheKey] = createLinkedState(this, key, eventPath));
        },
        setState: function(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            triggerComponentRender(this);
        },
        forceUpdate: function() {
            renderComponent(this, FORCE_RENDER);
        },
        render: function() {
            return null;
        }
    });
    exports.h = h;
    exports.cloneElement = cloneElement;
    exports.Component = Component;
    exports.render = render;
    exports.rerender = rerender;
    exports.options = options;
});
//# sourceMappingURL=preact.js.map