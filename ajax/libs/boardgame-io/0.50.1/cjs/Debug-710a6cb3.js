'use strict';

var turnOrder = require('./turn-order-4ab12333.js');
var reducer = require('./reducer-6f7cf6b0.js');
var flatted = require('flatted');
var ai = require('./ai-e933e60d.js');

function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function null_to_empty(value) {
    return value == null ? '' : value;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_empty_stylesheet(node) {
    const style_element = element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    select.selectedIndex = -1; // no option should be selected
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
const managed_styles = new Map();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
        rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        managed_styles.forEach(info => {
            const { stylesheet } = info;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            info.rules = {};
        });
        managed_styles.clear();
    });
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
    return context;
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while (flushidx < dirty_components.length) {
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            started = true;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = (program.b - t);
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}
function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
    };
}
function crossfade(_a) {
    var { fallback } = _a, defaults = __rest(_a, ["fallback"]);
    const to_receive = new Map();
    const to_send = new Map();
    function crossfade(from, node, params) {
        const { delay = 0, duration = d => Math.sqrt(d) * 30, easing = cubicOut } = assign(assign({}, defaults), params);
        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt(dx * dx + dy * dy);
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const opacity = +style.opacity;
        return {
            delay,
            duration: is_function(duration) ? duration(d) : duration,
            easing,
            css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
        };
    }
    function transition(items, counterparts, intro) {
        return (node, params) => {
            items.set(params.key, {
                rect: node.getBoundingClientRect()
            });
            return () => {
                if (counterparts.has(params.key)) {
                    const { rect } = counterparts.get(params.key);
                    counterparts.delete(params.key);
                    return crossfade(rect, node, params);
                }
                // if the node is disappearing altogether
                // (i.e. wasn't claimed by the other list)
                // then we need to supply an outro
                items.delete(params.key);
                return fallback && fallback(node, params, intro);
            };
        };
    }
    return [
        transition(to_send, to_receive, false),
        transition(to_receive, to_send, true)
    ];
}

/* node_modules/svelte-icons/components/IconBase.svelte generated by Svelte v3.49.0 */

function add_css(target) {
	append_styles(target, "svelte-c8tyih", "svg.svelte-c8tyih{stroke:currentColor;fill:currentColor;stroke-width:0;width:100%;height:auto;max-height:100%}");
}

// (18:2) {#if title}
function create_if_block(ctx) {
	let title_1;
	let t;

	return {
		c() {
			title_1 = svg_element("title");
			t = text(/*title*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, title_1, anchor);
			append(title_1, t);
		},
		p(ctx, dirty) {
			if (dirty & /*title*/ 1) set_data(t, /*title*/ ctx[0]);
		},
		d(detaching) {
			if (detaching) detach(title_1);
		}
	};
}

function create_fragment(ctx) {
	let svg;
	let if_block_anchor;
	let current;
	let if_block = /*title*/ ctx[0] && create_if_block(ctx);
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	return {
		c() {
			svg = svg_element("svg");
			if (if_block) if_block.c();
			if_block_anchor = empty();
			if (default_slot) default_slot.c();
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "viewBox", /*viewBox*/ ctx[1]);
			attr(svg, "class", "svelte-c8tyih");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			if (if_block) if_block.m(svg, null);
			append(svg, if_block_anchor);

			if (default_slot) {
				default_slot.m(svg, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (/*title*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(svg, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*viewBox*/ 2) {
				attr(svg, "viewBox", /*viewBox*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svg);
			if (if_block) if_block.d();
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { title = null } = $$props;
	let { viewBox } = $$props;

	$$self.$$set = $$props => {
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('viewBox' in $$props) $$invalidate(1, viewBox = $$props.viewBox);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	return [title, viewBox, $$scope, slots];
}

class IconBase extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { title: 0, viewBox: 1 }, add_css);
	}
}

/* node_modules/svelte-icons/fa/FaChevronRight.svelte generated by Svelte v3.49.0 */

function create_default_slot(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "d", "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$1(ctx) {
	let iconbase;
	let current;
	const iconbase_spread_levels = [{ viewBox: "0 0 320 512" }, /*$$props*/ ctx[0]];

	let iconbase_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	for (let i = 0; i < iconbase_spread_levels.length; i += 1) {
		iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
	}

	iconbase = new IconBase({ props: iconbase_props });

	return {
		c() {
			create_component(iconbase.$$.fragment);
		},
		m(target, anchor) {
			mount_component(iconbase, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const iconbase_changes = (dirty & /*$$props*/ 1)
			? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(/*$$props*/ ctx[0])])
			: {};

			if (dirty & /*$$scope*/ 2) {
				iconbase_changes.$$scope = { dirty, ctx };
			}

			iconbase.$set(iconbase_changes);
		},
		i(local) {
			if (current) return;
			transition_in(iconbase.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(iconbase.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(iconbase, detaching);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	$$self.$$set = $$new_props => {
		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
	};

	$$props = exclude_internal_props($$props);
	return [$$props];
}

class FaChevronRight extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
	}
}

/* src/client/debug/Menu.svelte generated by Svelte v3.49.0 */

function add_css$1(target) {
	append_styles(target, "svelte-1xg9v5h", ".menu.svelte-1xg9v5h{display:flex;margin-top:43px;flex-direction:row-reverse;border:1px solid #ccc;border-radius:5px 5px 0 0;height:25px;line-height:25px;margin-right:-500px;transform-origin:bottom right;transform:rotate(-90deg) translate(0, -500px)}.menu-item.svelte-1xg9v5h{line-height:25px;cursor:pointer;border:0;background:#fefefe;color:#555;padding-left:15px;padding-right:15px;text-align:center}.menu-item.svelte-1xg9v5h:first-child{border-radius:0 5px 0 0}.menu-item.svelte-1xg9v5h:last-child{border-radius:5px 0 0 0}.menu-item.active.svelte-1xg9v5h{cursor:default;font-weight:bold;background:#ddd;color:#555}.menu-item.svelte-1xg9v5h:hover,.menu-item.svelte-1xg9v5h:focus{background:#eee;color:#555}");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i][0];
	child_ctx[5] = list[i][1].label;
	return child_ctx;
}

// (57:2) {#each Object.entries(panes) as [key, {label}
function create_each_block(ctx) {
	let button;
	let t0_value = /*label*/ ctx[5] + "";
	let t0;
	let t1;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[3](/*key*/ ctx[4]);
	}

	return {
		c() {
			button = element("button");
			t0 = text(t0_value);
			t1 = space();
			attr(button, "class", "menu-item svelte-1xg9v5h");
			toggle_class(button, "active", /*pane*/ ctx[0] == /*key*/ ctx[4]);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t0);
			append(button, t1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*panes*/ 2 && t0_value !== (t0_value = /*label*/ ctx[5] + "")) set_data(t0, t0_value);

			if (dirty & /*pane, Object, panes*/ 3) {
				toggle_class(button, "active", /*pane*/ ctx[0] == /*key*/ ctx[4]);
			}
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$2(ctx) {
	let nav;
	let each_value = Object.entries(/*panes*/ ctx[1]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			nav = element("nav");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(nav, "class", "menu svelte-1xg9v5h");
		},
		m(target, anchor) {
			insert(target, nav, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(nav, null);
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*pane, Object, panes, dispatch*/ 7) {
				each_value = Object.entries(/*panes*/ ctx[1]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(nav, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(nav);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let { pane } = $$props;
	let { panes } = $$props;
	const dispatch = createEventDispatcher();
	const click_handler = key => dispatch('change', key);

	$$self.$$set = $$props => {
		if ('pane' in $$props) $$invalidate(0, pane = $$props.pane);
		if ('panes' in $$props) $$invalidate(1, panes = $$props.panes);
	};

	return [pane, panes, dispatch, click_handler];
}

class Menu extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { pane: 0, panes: 1 }, add_css$1);
	}
}

var contextKey = {};

/* node_modules/svelte-json-tree-auto/src/JSONArrow.svelte generated by Svelte v3.49.0 */

function add_css$2(target) {
	append_styles(target, "svelte-1vyml86", ".container.svelte-1vyml86{display:inline-block;cursor:pointer;transform:translate(calc(0px - var(--li-identation)), -50%);position:absolute;top:50%;padding-right:100%}.arrow.svelte-1vyml86{transform-origin:25% 50%;position:relative;line-height:1.1em;font-size:0.75em;margin-left:0;transition:150ms;color:var(--arrow-sign);user-select:none;font-family:'Courier New', Courier, monospace}.expanded.svelte-1vyml86{transform:rotateZ(90deg) translateX(-3px)}");
}

function create_fragment$3(ctx) {
	let div1;
	let div0;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			div0.textContent = `${'\u25B6'}`;
			attr(div0, "class", "arrow svelte-1vyml86");
			toggle_class(div0, "expanded", /*expanded*/ ctx[0]);
			attr(div1, "class", "container svelte-1vyml86");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);

			if (!mounted) {
				dispose = listen(div1, "click", /*click_handler*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*expanded*/ 1) {
				toggle_class(div0, "expanded", /*expanded*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
			mounted = false;
			dispose();
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let { expanded } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
	};

	return [expanded, click_handler];
}

class JSONArrow extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { expanded: 0 }, add_css$2);
	}
}

/* node_modules/svelte-json-tree-auto/src/JSONKey.svelte generated by Svelte v3.49.0 */

function add_css$3(target) {
	append_styles(target, "svelte-1vlbacg", "label.svelte-1vlbacg{display:inline-block;color:var(--label-color);padding:0}.spaced.svelte-1vlbacg{padding-right:var(--li-colon-space)}");
}

// (16:0) {#if showKey && key}
function create_if_block$1(ctx) {
	let label;
	let span;
	let t0;
	let t1;
	let mounted;
	let dispose;

	return {
		c() {
			label = element("label");
			span = element("span");
			t0 = text(/*key*/ ctx[0]);
			t1 = text(/*colon*/ ctx[2]);
			attr(label, "class", "svelte-1vlbacg");
			toggle_class(label, "spaced", /*isParentExpanded*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, label, anchor);
			append(label, span);
			append(span, t0);
			append(span, t1);

			if (!mounted) {
				dispose = listen(label, "click", /*click_handler*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*key*/ 1) set_data(t0, /*key*/ ctx[0]);
			if (dirty & /*colon*/ 4) set_data(t1, /*colon*/ ctx[2]);

			if (dirty & /*isParentExpanded*/ 2) {
				toggle_class(label, "spaced", /*isParentExpanded*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(label);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$4(ctx) {
	let if_block_anchor;
	let if_block = /*showKey*/ ctx[3] && /*key*/ ctx[0] && create_if_block$1(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (/*showKey*/ ctx[3] && /*key*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let showKey;
	let { key, isParentExpanded, isParentArray = false, colon = ':' } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ('colon' in $$props) $$invalidate(2, colon = $$props.colon);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isParentExpanded, isParentArray, key*/ 19) {
			 $$invalidate(3, showKey = isParentExpanded || !isParentArray || key != +key);
		}
	};

	return [key, isParentExpanded, colon, showKey, isParentArray, click_handler];
}

class JSONKey extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$4,
			create_fragment$4,
			safe_not_equal,
			{
				key: 0,
				isParentExpanded: 1,
				isParentArray: 4,
				colon: 2
			},
			add_css$3
		);
	}
}

/* node_modules/svelte-json-tree-auto/src/JSONNested.svelte generated by Svelte v3.49.0 */

function add_css$4(target) {
	append_styles(target, "svelte-rwxv37", "label.svelte-rwxv37{display:inline-block}.indent.svelte-rwxv37{padding-left:var(--li-identation)}.collapse.svelte-rwxv37{--li-display:inline;display:inline;font-style:italic}.comma.svelte-rwxv37{margin-left:-0.5em;margin-right:0.5em}label.svelte-rwxv37{position:relative}");
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	child_ctx[20] = i;
	return child_ctx;
}

// (57:4) {#if expandable && isParentExpanded}
function create_if_block_3(ctx) {
	let jsonarrow;
	let current;
	jsonarrow = new JSONArrow({ props: { expanded: /*expanded*/ ctx[0] } });
	jsonarrow.$on("click", /*toggleExpand*/ ctx[15]);

	return {
		c() {
			create_component(jsonarrow.$$.fragment);
		},
		m(target, anchor) {
			mount_component(jsonarrow, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const jsonarrow_changes = {};
			if (dirty & /*expanded*/ 1) jsonarrow_changes.expanded = /*expanded*/ ctx[0];
			jsonarrow.$set(jsonarrow_changes);
		},
		i(local) {
			if (current) return;
			transition_in(jsonarrow.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(jsonarrow.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(jsonarrow, detaching);
		}
	};
}

// (75:4) {:else}
function create_else_block(ctx) {
	let span;

	return {
		c() {
			span = element("span");
			span.textContent = "…";
		},
		m(target, anchor) {
			insert(target, span, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (63:4) {#if isParentExpanded}
function create_if_block$2(ctx) {
	let ul;
	let t;
	let current;
	let mounted;
	let dispose;
	let each_value = /*slicedKeys*/ ctx[13];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block = /*slicedKeys*/ ctx[13].length < /*previewKeys*/ ctx[7].length && create_if_block_1();

	return {
		c() {
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			if (if_block) if_block.c();
			attr(ul, "class", "svelte-rwxv37");
			toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append(ul, t);
			if (if_block) if_block.m(ul, null);
			current = true;

			if (!mounted) {
				dispose = listen(ul, "click", /*expand*/ ctx[16]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*expanded, previewKeys, getKey, slicedKeys, isArray, getValue, getPreviewValue*/ 10129) {
				each_value = /*slicedKeys*/ ctx[13];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, t);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (/*slicedKeys*/ ctx[13].length < /*previewKeys*/ ctx[7].length) {
				if (if_block) ; else {
					if_block = create_if_block_1();
					if_block.c();
					if_block.m(ul, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*expanded*/ 1) {
				toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(ul);
			destroy_each(each_blocks, detaching);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

// (67:10) {#if !expanded && index < previewKeys.length - 1}
function create_if_block_2(ctx) {
	let span;

	return {
		c() {
			span = element("span");
			span.textContent = ",";
			attr(span, "class", "comma svelte-rwxv37");
		},
		m(target, anchor) {
			insert(target, span, anchor);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (65:8) {#each slicedKeys as key, index}
function create_each_block$1(ctx) {
	let jsonnode;
	let t;
	let if_block_anchor;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: /*getKey*/ ctx[8](/*key*/ ctx[12]),
				isParentExpanded: /*expanded*/ ctx[0],
				isParentArray: /*isArray*/ ctx[4],
				value: /*expanded*/ ctx[0]
				? /*getValue*/ ctx[9](/*key*/ ctx[12])
				: /*getPreviewValue*/ ctx[10](/*key*/ ctx[12])
			}
		});

	let if_block = !/*expanded*/ ctx[0] && /*index*/ ctx[20] < /*previewKeys*/ ctx[7].length - 1 && create_if_block_2();

	return {
		c() {
			create_component(jsonnode.$$.fragment);
			t = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			mount_component(jsonnode, target, anchor);
			insert(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const jsonnode_changes = {};
			if (dirty & /*getKey, slicedKeys*/ 8448) jsonnode_changes.key = /*getKey*/ ctx[8](/*key*/ ctx[12]);
			if (dirty & /*expanded*/ 1) jsonnode_changes.isParentExpanded = /*expanded*/ ctx[0];
			if (dirty & /*isArray*/ 16) jsonnode_changes.isParentArray = /*isArray*/ ctx[4];

			if (dirty & /*expanded, getValue, slicedKeys, getPreviewValue*/ 9729) jsonnode_changes.value = /*expanded*/ ctx[0]
			? /*getValue*/ ctx[9](/*key*/ ctx[12])
			: /*getPreviewValue*/ ctx[10](/*key*/ ctx[12]);

			jsonnode.$set(jsonnode_changes);

			if (!/*expanded*/ ctx[0] && /*index*/ ctx[20] < /*previewKeys*/ ctx[7].length - 1) {
				if (if_block) ; else {
					if_block = create_if_block_2();
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(jsonnode.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(jsonnode.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(jsonnode, detaching);
			if (detaching) detach(t);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (71:8) {#if slicedKeys.length < previewKeys.length }
function create_if_block_1(ctx) {
	let span;

	return {
		c() {
			span = element("span");
			span.textContent = "…";
		},
		m(target, anchor) {
			insert(target, span, anchor);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

function create_fragment$5(ctx) {
	let li;
	let label_1;
	let t0;
	let jsonkey;
	let t1;
	let span1;
	let span0;
	let t2;
	let t3;
	let t4;
	let current_block_type_index;
	let if_block1;
	let t5;
	let span2;
	let t6;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*expandable*/ ctx[11] && /*isParentExpanded*/ ctx[2] && create_if_block_3(ctx);

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[12],
				colon: /*context*/ ctx[14].colon,
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3]
			}
		});

	jsonkey.$on("click", /*toggleExpand*/ ctx[15]);
	const if_block_creators = [create_if_block$2, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*isParentExpanded*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			li = element("li");
			label_1 = element("label");
			if (if_block0) if_block0.c();
			t0 = space();
			create_component(jsonkey.$$.fragment);
			t1 = space();
			span1 = element("span");
			span0 = element("span");
			t2 = text(/*label*/ ctx[1]);
			t3 = text(/*bracketOpen*/ ctx[5]);
			t4 = space();
			if_block1.c();
			t5 = space();
			span2 = element("span");
			t6 = text(/*bracketClose*/ ctx[6]);
			attr(label_1, "class", "svelte-rwxv37");
			attr(li, "class", "svelte-rwxv37");
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, label_1);
			if (if_block0) if_block0.m(label_1, null);
			append(label_1, t0);
			mount_component(jsonkey, label_1, null);
			append(label_1, t1);
			append(label_1, span1);
			append(span1, span0);
			append(span0, t2);
			append(span1, t3);
			append(li, t4);
			if_blocks[current_block_type_index].m(li, null);
			append(li, t5);
			append(li, span2);
			append(span2, t6);
			current = true;

			if (!mounted) {
				dispose = listen(span1, "click", /*toggleExpand*/ ctx[15]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*expandable*/ ctx[11] && /*isParentExpanded*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*expandable, isParentExpanded*/ 2052) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(label_1, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const jsonkey_changes = {};
			if (dirty & /*key*/ 4096) jsonkey_changes.key = /*key*/ ctx[12];
			if (dirty & /*isParentExpanded*/ 4) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[3];
			jsonkey.$set(jsonkey_changes);
			if (!current || dirty & /*label*/ 2) set_data(t2, /*label*/ ctx[1]);
			if (!current || dirty & /*bracketOpen*/ 32) set_data(t3, /*bracketOpen*/ ctx[5]);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				transition_in(if_block1, 1);
				if_block1.m(li, t5);
			}

			if (!current || dirty & /*bracketClose*/ 64) set_data(t6, /*bracketClose*/ ctx[6]);

			if (dirty & /*isParentExpanded*/ 4) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(jsonkey.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(jsonkey.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			if (if_block0) if_block0.d();
			destroy_component(jsonkey);
			if_blocks[current_block_type_index].d();
			mounted = false;
			dispose();
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let slicedKeys;
	let { key, keys, colon = ':', label = '', isParentExpanded, isParentArray, isArray = false, bracketOpen, bracketClose } = $$props;
	let { previewKeys = keys } = $$props;
	let { getKey = key => key } = $$props;
	let { getValue = key => key } = $$props;
	let { getPreviewValue = getValue } = $$props;
	let { expanded = false, expandable = true } = $$props;
	const context = getContext(contextKey);
	setContext(contextKey, { ...context, colon });

	function toggleExpand() {
		$$invalidate(0, expanded = !expanded);
	}

	function expand() {
		$$invalidate(0, expanded = true);
	}

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(12, key = $$props.key);
		if ('keys' in $$props) $$invalidate(17, keys = $$props.keys);
		if ('colon' in $$props) $$invalidate(18, colon = $$props.colon);
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ('isArray' in $$props) $$invalidate(4, isArray = $$props.isArray);
		if ('bracketOpen' in $$props) $$invalidate(5, bracketOpen = $$props.bracketOpen);
		if ('bracketClose' in $$props) $$invalidate(6, bracketClose = $$props.bracketClose);
		if ('previewKeys' in $$props) $$invalidate(7, previewKeys = $$props.previewKeys);
		if ('getKey' in $$props) $$invalidate(8, getKey = $$props.getKey);
		if ('getValue' in $$props) $$invalidate(9, getValue = $$props.getValue);
		if ('getPreviewValue' in $$props) $$invalidate(10, getPreviewValue = $$props.getPreviewValue);
		if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
		if ('expandable' in $$props) $$invalidate(11, expandable = $$props.expandable);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isParentExpanded*/ 4) {
			 if (!isParentExpanded) {
				$$invalidate(0, expanded = false);
			}
		}

		if ($$self.$$.dirty & /*expanded, keys, previewKeys*/ 131201) {
			 $$invalidate(13, slicedKeys = expanded ? keys : previewKeys.slice(0, 5));
		}
	};

	return [
		expanded,
		label,
		isParentExpanded,
		isParentArray,
		isArray,
		bracketOpen,
		bracketClose,
		previewKeys,
		getKey,
		getValue,
		getPreviewValue,
		expandable,
		key,
		slicedKeys,
		context,
		toggleExpand,
		expand,
		keys,
		colon
	];
}

class JSONNested extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$5,
			create_fragment$5,
			safe_not_equal,
			{
				key: 12,
				keys: 17,
				colon: 18,
				label: 1,
				isParentExpanded: 2,
				isParentArray: 3,
				isArray: 4,
				bracketOpen: 5,
				bracketClose: 6,
				previewKeys: 7,
				getKey: 8,
				getValue: 9,
				getPreviewValue: 10,
				expanded: 0,
				expandable: 11
			},
			add_css$4
		);
	}
}

/* node_modules/svelte-json-tree-auto/src/JSONObjectNode.svelte generated by Svelte v3.49.0 */

function create_fragment$6(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[5],
				previewKeys: /*keys*/ ctx[5],
				getValue: /*getValue*/ ctx[6],
				label: "" + (/*nodeType*/ ctx[3] + " "),
				bracketOpen: '{',
				bracketClose: '}'
			}
		});

	return {
		c() {
			create_component(jsonnested.$$.fragment);
		},
		m(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 32) jsonnested_changes.keys = /*keys*/ ctx[5];
			if (dirty & /*keys*/ 32) jsonnested_changes.previewKeys = /*keys*/ ctx[5];
			if (dirty & /*nodeType*/ 8) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + " ");
			jsonnested.$set(jsonnested_changes);
		},
		i(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let keys;
	let { key, value, isParentExpanded, isParentArray, nodeType } = $$props;
	let { expanded = true } = $$props;

	function getValue(key) {
		return value[key];
	}

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(7, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
		if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 128) {
			 $$invalidate(5, keys = Object.getOwnPropertyNames(value));
		}
	};

	return [
		key,
		isParentExpanded,
		isParentArray,
		nodeType,
		expanded,
		keys,
		getValue,
		value
	];
}

class JSONObjectNode extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
			key: 0,
			value: 7,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3,
			expanded: 4
		});
	}
}

/* node_modules/svelte-json-tree-auto/src/JSONArrayNode.svelte generated by Svelte v3.49.0 */

function create_fragment$7(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				isArray: true,
				keys: /*keys*/ ctx[5],
				previewKeys: /*previewKeys*/ ctx[6],
				getValue: /*getValue*/ ctx[7],
				label: "Array(" + /*value*/ ctx[1].length + ")",
				bracketOpen: "[",
				bracketClose: "]"
			}
		});

	return {
		c() {
			create_component(jsonnested.$$.fragment);
		},
		m(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[3];
			if (dirty & /*keys*/ 32) jsonnested_changes.keys = /*keys*/ ctx[5];
			if (dirty & /*previewKeys*/ 64) jsonnested_changes.previewKeys = /*previewKeys*/ ctx[6];
			if (dirty & /*value*/ 2) jsonnested_changes.label = "Array(" + /*value*/ ctx[1].length + ")";
			jsonnested.$set(jsonnested_changes);
		},
		i(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	let keys;
	let previewKeys;
	let { key, value, isParentExpanded, isParentArray } = $$props;
	let { expanded = JSON.stringify(value).length < 1024 } = $$props;
	const filteredKey = new Set(['length']);

	function getValue(key) {
		return value[key];
	}

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 2) {
			 $$invalidate(5, keys = Object.getOwnPropertyNames(value));
		}

		if ($$self.$$.dirty & /*keys*/ 32) {
			 $$invalidate(6, previewKeys = keys.filter(key => !filteredKey.has(key)));
		}
	};

	return [
		key,
		value,
		isParentExpanded,
		isParentArray,
		expanded,
		keys,
		previewKeys,
		getValue
	];
}

class JSONArrayNode extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3,
			expanded: 4
		});
	}
}

/* node_modules/svelte-json-tree-auto/src/JSONIterableArrayNode.svelte generated by Svelte v3.49.0 */

function create_fragment$8(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[4],
				getKey,
				getValue,
				isArray: true,
				label: "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")"),
				bracketOpen: '{',
				bracketClose: '}'
			}
		});

	return {
		c() {
			create_component(jsonnested.$$.fragment);
		},
		m(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 16) jsonnested_changes.keys = /*keys*/ ctx[4];
			if (dirty & /*nodeType, keys*/ 24) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")");
			jsonnested.$set(jsonnested_changes);
		},
		i(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};
}

function getKey(key) {
	return String(key[0]);
}

function getValue(key) {
	return key[1];
}

function instance$8($$self, $$props, $$invalidate) {
	let { key, value, isParentExpanded, isParentArray, nodeType } = $$props;
	let keys = [];

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(5, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 32) {
			 {
				let result = [];
				let i = 0;

				for (const entry of value) {
					result.push([i++, entry]);
				}

				$$invalidate(4, keys = result);
			}
		}
	};

	return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableArrayNode extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
			key: 0,
			value: 5,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3
		});
	}
}

class MapEntry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

/* node_modules/svelte-json-tree-auto/src/JSONIterableMapNode.svelte generated by Svelte v3.49.0 */

function create_fragment$9(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				key: /*key*/ ctx[0],
				isParentExpanded: /*isParentExpanded*/ ctx[1],
				isParentArray: /*isParentArray*/ ctx[2],
				keys: /*keys*/ ctx[4],
				getKey: getKey$1,
				getValue: getValue$1,
				label: "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")"),
				colon: "",
				bracketOpen: '{',
				bracketClose: '}'
			}
		});

	return {
		c() {
			create_component(jsonnested.$$.fragment);
		},
		m(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*key*/ 1) jsonnested_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 2) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[1];
			if (dirty & /*isParentArray*/ 4) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[2];
			if (dirty & /*keys*/ 16) jsonnested_changes.keys = /*keys*/ ctx[4];
			if (dirty & /*nodeType, keys*/ 24) jsonnested_changes.label = "" + (/*nodeType*/ ctx[3] + "(" + /*keys*/ ctx[4].length + ")");
			jsonnested.$set(jsonnested_changes);
		},
		i(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};
}

function getKey$1(entry) {
	return entry[0];
}

function getValue$1(entry) {
	return entry[1];
}

function instance$9($$self, $$props, $$invalidate) {
	let { key, value, isParentExpanded, isParentArray, nodeType } = $$props;
	let keys = [];

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(5, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 32) {
			 {
				let result = [];
				let i = 0;

				for (const entry of value) {
					result.push([i++, new MapEntry(entry[0], entry[1])]);
				}

				$$invalidate(4, keys = result);
			}
		}
	};

	return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableMapNode extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
			key: 0,
			value: 5,
			isParentExpanded: 1,
			isParentArray: 2,
			nodeType: 3
		});
	}
}

/* node_modules/svelte-json-tree-auto/src/JSONMapEntryNode.svelte generated by Svelte v3.49.0 */

function create_fragment$a(ctx) {
	let jsonnested;
	let current;

	jsonnested = new JSONNested({
			props: {
				expanded: /*expanded*/ ctx[4],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				key: /*isParentExpanded*/ ctx[2]
				? String(/*key*/ ctx[0])
				: /*value*/ ctx[1].key,
				keys: /*keys*/ ctx[5],
				getValue: /*getValue*/ ctx[6],
				label: /*isParentExpanded*/ ctx[2] ? 'Entry ' : '=> ',
				bracketOpen: '{',
				bracketClose: '}'
			}
		});

	return {
		c() {
			create_component(jsonnested.$$.fragment);
		},
		m(target, anchor) {
			mount_component(jsonnested, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const jsonnested_changes = {};
			if (dirty & /*expanded*/ 16) jsonnested_changes.expanded = /*expanded*/ ctx[4];
			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) jsonnested_changes.isParentArray = /*isParentArray*/ ctx[3];

			if (dirty & /*isParentExpanded, key, value*/ 7) jsonnested_changes.key = /*isParentExpanded*/ ctx[2]
			? String(/*key*/ ctx[0])
			: /*value*/ ctx[1].key;

			if (dirty & /*isParentExpanded*/ 4) jsonnested_changes.label = /*isParentExpanded*/ ctx[2] ? 'Entry ' : '=> ';
			jsonnested.$set(jsonnested_changes);
		},
		i(local) {
			if (current) return;
			transition_in(jsonnested.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(jsonnested.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(jsonnested, detaching);
		}
	};
}

function instance$a($$self, $$props, $$invalidate) {
	let { key, value, isParentExpanded, isParentArray } = $$props;
	let { expanded = false } = $$props;
	const keys = ['key', 'value'];

	function getValue(key) {
		return value[key];
	}

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
		if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
	};

	return [key, value, isParentExpanded, isParentArray, expanded, keys, getValue];
}

class JSONMapEntryNode extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$a, create_fragment$a, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3,
			expanded: 4
		});
	}
}

/* node_modules/svelte-json-tree-auto/src/JSONValueNode.svelte generated by Svelte v3.49.0 */

function add_css$5(target) {
	append_styles(target, "svelte-3bjyvl", "li.svelte-3bjyvl{user-select:text;word-wrap:break-word;word-break:break-all}.indent.svelte-3bjyvl{padding-left:var(--li-identation)}.String.svelte-3bjyvl{color:var(--string-color)}.Date.svelte-3bjyvl{color:var(--date-color)}.Number.svelte-3bjyvl{color:var(--number-color)}.Boolean.svelte-3bjyvl{color:var(--boolean-color)}.Null.svelte-3bjyvl{color:var(--null-color)}.Undefined.svelte-3bjyvl{color:var(--undefined-color)}.Function.svelte-3bjyvl{color:var(--function-color);font-style:italic}.Symbol.svelte-3bjyvl{color:var(--symbol-color)}");
}

function create_fragment$b(ctx) {
	let li;
	let jsonkey;
	let t0;
	let span;

	let t1_value = (/*valueGetter*/ ctx[2]
	? /*valueGetter*/ ctx[2](/*value*/ ctx[1])
	: /*value*/ ctx[1]) + "";

	let t1;
	let span_class_value;
	let current;

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[0],
				colon: /*colon*/ ctx[6],
				isParentExpanded: /*isParentExpanded*/ ctx[3],
				isParentArray: /*isParentArray*/ ctx[4]
			}
		});

	return {
		c() {
			li = element("li");
			create_component(jsonkey.$$.fragment);
			t0 = space();
			span = element("span");
			t1 = text(t1_value);
			attr(span, "class", span_class_value = "" + (null_to_empty(/*nodeType*/ ctx[5]) + " svelte-3bjyvl"));
			attr(li, "class", "svelte-3bjyvl");
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, li, anchor);
			mount_component(jsonkey, li, null);
			append(li, t0);
			append(li, span);
			append(span, t1);
			current = true;
		},
		p(ctx, [dirty]) {
			const jsonkey_changes = {};
			if (dirty & /*key*/ 1) jsonkey_changes.key = /*key*/ ctx[0];
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			if (dirty & /*isParentArray*/ 16) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[4];
			jsonkey.$set(jsonkey_changes);

			if ((!current || dirty & /*valueGetter, value*/ 6) && t1_value !== (t1_value = (/*valueGetter*/ ctx[2]
			? /*valueGetter*/ ctx[2](/*value*/ ctx[1])
			: /*value*/ ctx[1]) + "")) set_data(t1, t1_value);

			if (!current || dirty & /*nodeType*/ 32 && span_class_value !== (span_class_value = "" + (null_to_empty(/*nodeType*/ ctx[5]) + " svelte-3bjyvl"))) {
				attr(span, "class", span_class_value);
			}

			if (dirty & /*isParentExpanded*/ 8) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(jsonkey.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(jsonkey.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(jsonkey);
		}
	};
}

function instance$b($$self, $$props, $$invalidate) {
	let { key, value, valueGetter = null, isParentExpanded, isParentArray, nodeType } = $$props;
	const { colon } = getContext(contextKey);

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('valueGetter' in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
		if ('isParentExpanded' in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ('nodeType' in $$props) $$invalidate(5, nodeType = $$props.nodeType);
	};

	return [key, value, valueGetter, isParentExpanded, isParentArray, nodeType, colon];
}

class JSONValueNode extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$b,
			create_fragment$b,
			safe_not_equal,
			{
				key: 0,
				value: 1,
				valueGetter: 2,
				isParentExpanded: 3,
				isParentArray: 4,
				nodeType: 5
			},
			add_css$5
		);
	}
}

/* node_modules/svelte-json-tree-auto/src/ErrorNode.svelte generated by Svelte v3.49.0 */

function add_css$6(target) {
	append_styles(target, "svelte-1ca3gb2", "li.svelte-1ca3gb2{user-select:text;word-wrap:break-word;word-break:break-all}.indent.svelte-1ca3gb2{padding-left:var(--li-identation)}.collapse.svelte-1ca3gb2{--li-display:inline;display:inline;font-style:italic}");
}

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[10] = i;
	return child_ctx;
}

// (40:2) {#if isParentExpanded}
function create_if_block_2$1(ctx) {
	let jsonarrow;
	let current;
	jsonarrow = new JSONArrow({ props: { expanded: /*expanded*/ ctx[0] } });
	jsonarrow.$on("click", /*toggleExpand*/ ctx[7]);

	return {
		c() {
			create_component(jsonarrow.$$.fragment);
		},
		m(target, anchor) {
			mount_component(jsonarrow, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const jsonarrow_changes = {};
			if (dirty & /*expanded*/ 1) jsonarrow_changes.expanded = /*expanded*/ ctx[0];
			jsonarrow.$set(jsonarrow_changes);
		},
		i(local) {
			if (current) return;
			transition_in(jsonarrow.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(jsonarrow.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(jsonarrow, detaching);
		}
	};
}

// (45:2) {#if isParentExpanded}
function create_if_block$3(ctx) {
	let ul;
	let current;
	let if_block = /*expanded*/ ctx[0] && create_if_block_1$1(ctx);

	return {
		c() {
			ul = element("ul");
			if (if_block) if_block.c();
			attr(ul, "class", "svelte-1ca3gb2");
			toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, ul, anchor);
			if (if_block) if_block.m(ul, null);
			current = true;
		},
		p(ctx, dirty) {
			if (/*expanded*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*expanded*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(ul, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*expanded*/ 1) {
				toggle_class(ul, "collapse", !/*expanded*/ ctx[0]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(ul);
			if (if_block) if_block.d();
		}
	};
}

// (47:6) {#if expanded}
function create_if_block_1$1(ctx) {
	let jsonnode;
	let t0;
	let li;
	let jsonkey;
	let t1;
	let span;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: "message",
				value: /*value*/ ctx[2].message
			}
		});

	jsonkey = new JSONKey({
			props: {
				key: "stack",
				colon: ":",
				isParentExpanded: /*isParentExpanded*/ ctx[3]
			}
		});

	let each_value = /*stack*/ ctx[5];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	return {
		c() {
			create_component(jsonnode.$$.fragment);
			t0 = space();
			li = element("li");
			create_component(jsonkey.$$.fragment);
			t1 = space();
			span = element("span");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(li, "class", "svelte-1ca3gb2");
		},
		m(target, anchor) {
			mount_component(jsonnode, target, anchor);
			insert(target, t0, anchor);
			insert(target, li, anchor);
			mount_component(jsonkey, li, null);
			append(li, t1);
			append(li, span);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(span, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			const jsonnode_changes = {};
			if (dirty & /*value*/ 4) jsonnode_changes.value = /*value*/ ctx[2].message;
			jsonnode.$set(jsonnode_changes);
			const jsonkey_changes = {};
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			jsonkey.$set(jsonkey_changes);

			if (dirty & /*stack*/ 32) {
				each_value = /*stack*/ ctx[5];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(span, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i(local) {
			if (current) return;
			transition_in(jsonnode.$$.fragment, local);
			transition_in(jsonkey.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(jsonnode.$$.fragment, local);
			transition_out(jsonkey.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(jsonnode, detaching);
			if (detaching) detach(t0);
			if (detaching) detach(li);
			destroy_component(jsonkey);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (52:12) {#each stack as line, index}
function create_each_block$2(ctx) {
	let span;
	let t_value = /*line*/ ctx[8] + "";
	let t;
	let br;

	return {
		c() {
			span = element("span");
			t = text(t_value);
			br = element("br");
			attr(span, "class", "svelte-1ca3gb2");
			toggle_class(span, "indent", /*index*/ ctx[10] > 0);
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
			insert(target, br, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*stack*/ 32 && t_value !== (t_value = /*line*/ ctx[8] + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(span);
			if (detaching) detach(br);
		}
	};
}

function create_fragment$c(ctx) {
	let li;
	let t0;
	let jsonkey;
	let t1;
	let span;
	let t2;
	let t3_value = (/*expanded*/ ctx[0] ? '' : /*value*/ ctx[2].message) + "";
	let t3;
	let t4;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*isParentExpanded*/ ctx[3] && create_if_block_2$1(ctx);

	jsonkey = new JSONKey({
			props: {
				key: /*key*/ ctx[1],
				colon: /*context*/ ctx[6].colon,
				isParentExpanded: /*isParentExpanded*/ ctx[3],
				isParentArray: /*isParentArray*/ ctx[4]
			}
		});

	let if_block1 = /*isParentExpanded*/ ctx[3] && create_if_block$3(ctx);

	return {
		c() {
			li = element("li");
			if (if_block0) if_block0.c();
			t0 = space();
			create_component(jsonkey.$$.fragment);
			t1 = space();
			span = element("span");
			t2 = text("Error: ");
			t3 = text(t3_value);
			t4 = space();
			if (if_block1) if_block1.c();
			attr(li, "class", "svelte-1ca3gb2");
			toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, li, anchor);
			if (if_block0) if_block0.m(li, null);
			append(li, t0);
			mount_component(jsonkey, li, null);
			append(li, t1);
			append(li, span);
			append(span, t2);
			append(span, t3);
			append(li, t4);
			if (if_block1) if_block1.m(li, null);
			current = true;

			if (!mounted) {
				dispose = listen(span, "click", /*toggleExpand*/ ctx[7]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*isParentExpanded*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*isParentExpanded*/ 8) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2$1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(li, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const jsonkey_changes = {};
			if (dirty & /*key*/ 2) jsonkey_changes.key = /*key*/ ctx[1];
			if (dirty & /*isParentExpanded*/ 8) jsonkey_changes.isParentExpanded = /*isParentExpanded*/ ctx[3];
			if (dirty & /*isParentArray*/ 16) jsonkey_changes.isParentArray = /*isParentArray*/ ctx[4];
			jsonkey.$set(jsonkey_changes);
			if ((!current || dirty & /*expanded, value*/ 5) && t3_value !== (t3_value = (/*expanded*/ ctx[0] ? '' : /*value*/ ctx[2].message) + "")) set_data(t3, t3_value);

			if (/*isParentExpanded*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*isParentExpanded*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$3(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(li, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (dirty & /*isParentExpanded*/ 8) {
				toggle_class(li, "indent", /*isParentExpanded*/ ctx[3]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(jsonkey.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(jsonkey.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			if (if_block0) if_block0.d();
			destroy_component(jsonkey);
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};
}

function instance$c($$self, $$props, $$invalidate) {
	let stack;
	let { key, value, isParentExpanded, isParentArray } = $$props;
	let { expanded = false } = $$props;
	const context = getContext(contextKey);
	setContext(contextKey, { ...context, colon: ':' });

	function toggleExpand() {
		$$invalidate(0, expanded = !expanded);
	}

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(1, key = $$props.key);
		if ('value' in $$props) $$invalidate(2, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
		if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 4) {
			 $$invalidate(5, stack = value.stack.split('\n'));
		}

		if ($$self.$$.dirty & /*isParentExpanded*/ 8) {
			 if (!isParentExpanded) {
				$$invalidate(0, expanded = false);
			}
		}
	};

	return [
		expanded,
		key,
		value,
		isParentExpanded,
		isParentArray,
		stack,
		context,
		toggleExpand
	];
}

class ErrorNode extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$c,
			create_fragment$c,
			safe_not_equal,
			{
				key: 1,
				value: 2,
				isParentExpanded: 3,
				isParentArray: 4,
				expanded: 0
			},
			add_css$6
		);
	}
}

function objType(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  if (type === 'Object') {
    if (typeof obj[Symbol.iterator] === 'function') {
      return 'Iterable';
    }
    return obj.constructor.name;
  }

  return type;
}

/* node_modules/svelte-json-tree-auto/src/JSONNode.svelte generated by Svelte v3.49.0 */

function create_fragment$d(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*componentType*/ ctx[6];

	function switch_props(ctx) {
		return {
			props: {
				key: /*key*/ ctx[0],
				value: /*value*/ ctx[1],
				isParentExpanded: /*isParentExpanded*/ ctx[2],
				isParentArray: /*isParentArray*/ ctx[3],
				nodeType: /*nodeType*/ ctx[4],
				valueGetter: /*valueGetter*/ ctx[5]
			}
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const switch_instance_changes = {};
			if (dirty & /*key*/ 1) switch_instance_changes.key = /*key*/ ctx[0];
			if (dirty & /*value*/ 2) switch_instance_changes.value = /*value*/ ctx[1];
			if (dirty & /*isParentExpanded*/ 4) switch_instance_changes.isParentExpanded = /*isParentExpanded*/ ctx[2];
			if (dirty & /*isParentArray*/ 8) switch_instance_changes.isParentArray = /*isParentArray*/ ctx[3];
			if (dirty & /*nodeType*/ 16) switch_instance_changes.nodeType = /*nodeType*/ ctx[4];
			if (dirty & /*valueGetter*/ 32) switch_instance_changes.valueGetter = /*valueGetter*/ ctx[5];

			if (switch_value !== (switch_value = /*componentType*/ ctx[6])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

function instance$d($$self, $$props, $$invalidate) {
	let nodeType;
	let componentType;
	let valueGetter;
	let { key, value, isParentExpanded, isParentArray } = $$props;

	function getComponent(nodeType) {
		switch (nodeType) {
			case 'Object':
				return JSONObjectNode;
			case 'Error':
				return ErrorNode;
			case 'Array':
				return JSONArrayNode;
			case 'Iterable':
			case 'Map':
			case 'Set':
				return typeof value.set === 'function'
				? JSONIterableMapNode
				: JSONIterableArrayNode;
			case 'MapEntry':
				return JSONMapEntryNode;
			default:
				return JSONValueNode;
		}
	}

	function getValueGetter(nodeType) {
		switch (nodeType) {
			case 'Object':
			case 'Error':
			case 'Array':
			case 'Iterable':
			case 'Map':
			case 'Set':
			case 'MapEntry':
			case 'Number':
				return undefined;
			case 'String':
				return raw => `"${raw}"`;
			case 'Boolean':
				return raw => raw ? 'true' : 'false';
			case 'Date':
				return raw => raw.toISOString();
			case 'Null':
				return () => 'null';
			case 'Undefined':
				return () => 'undefined';
			case 'Function':
			case 'Symbol':
				return raw => raw.toString();
			default:
				return () => `<${nodeType}>`;
		}
	}

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
		if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value*/ 2) {
			 $$invalidate(4, nodeType = objType(value));
		}

		if ($$self.$$.dirty & /*nodeType*/ 16) {
			 $$invalidate(6, componentType = getComponent(nodeType));
		}

		if ($$self.$$.dirty & /*nodeType*/ 16) {
			 $$invalidate(5, valueGetter = getValueGetter(nodeType));
		}
	};

	return [
		key,
		value,
		isParentExpanded,
		isParentArray,
		nodeType,
		valueGetter,
		componentType
	];
}

class JSONNode extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
			key: 0,
			value: 1,
			isParentExpanded: 2,
			isParentArray: 3
		});
	}
}

/* node_modules/svelte-json-tree-auto/src/Root.svelte generated by Svelte v3.49.0 */

function add_css$7(target) {
	append_styles(target, "svelte-773n60", "ul.svelte-773n60{--string-color:var(--json-tree-string-color, #cb3f41);--symbol-color:var(--json-tree-symbol-color, #cb3f41);--boolean-color:var(--json-tree-boolean-color, #112aa7);--function-color:var(--json-tree-function-color, #112aa7);--number-color:var(--json-tree-number-color, #3029cf);--label-color:var(--json-tree-label-color, #871d8f);--arrow-color:var(--json-tree-arrow-color, #727272);--null-color:var(--json-tree-null-color, #8d8d8d);--undefined-color:var(--json-tree-undefined-color, #8d8d8d);--date-color:var(--json-tree-date-color, #8d8d8d);--li-identation:var(--json-tree-li-indentation, 1em);--li-line-height:var(--json-tree-li-line-height, 1.3);--li-colon-space:0.3em;font-size:var(--json-tree-font-size, 12px);font-family:var(--json-tree-font-family, 'Courier New', Courier, monospace)}ul.svelte-773n60 li{line-height:var(--li-line-height);display:var(--li-display, list-item);list-style:none}ul.svelte-773n60,ul.svelte-773n60 ul{padding:0;margin:0}");
}

function create_fragment$e(ctx) {
	let ul;
	let jsonnode;
	let current;

	jsonnode = new JSONNode({
			props: {
				key: /*key*/ ctx[0],
				value: /*value*/ ctx[1],
				isParentExpanded: true,
				isParentArray: false
			}
		});

	return {
		c() {
			ul = element("ul");
			create_component(jsonnode.$$.fragment);
			attr(ul, "class", "svelte-773n60");
		},
		m(target, anchor) {
			insert(target, ul, anchor);
			mount_component(jsonnode, ul, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const jsonnode_changes = {};
			if (dirty & /*key*/ 1) jsonnode_changes.key = /*key*/ ctx[0];
			if (dirty & /*value*/ 2) jsonnode_changes.value = /*value*/ ctx[1];
			jsonnode.$set(jsonnode_changes);
		},
		i(local) {
			if (current) return;
			transition_in(jsonnode.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(jsonnode.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(ul);
			destroy_component(jsonnode);
		}
	};
}

function instance$e($$self, $$props, $$invalidate) {
	setContext(contextKey, {});
	let { key = '', value } = $$props;

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(0, key = $$props.key);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
	};

	return [key, value];
}

class Root extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$e, create_fragment$e, safe_not_equal, { key: 0, value: 1 }, add_css$7);
	}
}

/* src/client/debug/main/ClientSwitcher.svelte generated by Svelte v3.49.0 */

function add_css$8(target) {
	append_styles(target, "svelte-jvfq3i", ".svelte-jvfq3i{box-sizing:border-box}section.switcher.svelte-jvfq3i{position:sticky;bottom:0;transform:translateY(20px);margin:40px -20px 0;border-top:1px solid #999;padding:20px;background:#fff}label.svelte-jvfq3i{display:flex;align-items:baseline;gap:5px;font-weight:bold}select.svelte-jvfq3i{min-width:140px}");
}

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	child_ctx[9] = i;
	return child_ctx;
}

// (42:0) {#if debuggableClients.length > 1}
function create_if_block$4(ctx) {
	let section;
	let label;
	let t;
	let select;
	let mounted;
	let dispose;
	let each_value = /*debuggableClients*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	return {
		c() {
			section = element("section");
			label = element("label");
			t = text("Client\n      \n      ");
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(select, "id", selectId);
			attr(select, "class", "svelte-jvfq3i");
			if (/*selected*/ ctx[2] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[6].call(select));
			attr(label, "class", "svelte-jvfq3i");
			attr(section, "class", "switcher svelte-jvfq3i");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, label);
			append(label, t);
			append(label, select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			select_option(select, /*selected*/ ctx[2]);

			if (!mounted) {
				dispose = [
					listen(select, "change", /*handleSelection*/ ctx[3]),
					listen(select, "change", /*select_change_handler*/ ctx[6])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*debuggableClients, JSON*/ 2) {
				each_value = /*debuggableClients*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*selected*/ 4) {
				select_option(select, /*selected*/ ctx[2]);
			}
		},
		d(detaching) {
			if (detaching) detach(section);
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (48:8) {#each debuggableClients as clientOption, index}
function create_each_block$3(ctx) {
	let option;
	let t0;
	let t1;
	let t2_value = JSON.stringify(/*clientOption*/ ctx[7].playerID) + "";
	let t2;
	let t3;
	let t4_value = JSON.stringify(/*clientOption*/ ctx[7].matchID) + "";
	let t4;
	let t5;
	let t6_value = /*clientOption*/ ctx[7].game.name + "";
	let t6;
	let t7;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t0 = text(/*index*/ ctx[9]);
			t1 = text(" —\n            playerID: ");
			t2 = text(t2_value);
			t3 = text(",\n            matchID: ");
			t4 = text(t4_value);
			t5 = text("\n            (");
			t6 = text(t6_value);
			t7 = text(")\n          ");
			option.__value = option_value_value = /*index*/ ctx[9];
			option.value = option.__value;
			attr(option, "class", "svelte-jvfq3i");
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t0);
			append(option, t1);
			append(option, t2);
			append(option, t3);
			append(option, t4);
			append(option, t5);
			append(option, t6);
			append(option, t7);
		},
		p(ctx, dirty) {
			if (dirty & /*debuggableClients*/ 2 && t2_value !== (t2_value = JSON.stringify(/*clientOption*/ ctx[7].playerID) + "")) set_data(t2, t2_value);
			if (dirty & /*debuggableClients*/ 2 && t4_value !== (t4_value = JSON.stringify(/*clientOption*/ ctx[7].matchID) + "")) set_data(t4, t4_value);
			if (dirty & /*debuggableClients*/ 2 && t6_value !== (t6_value = /*clientOption*/ ctx[7].game.name + "")) set_data(t6, t6_value);
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

function create_fragment$f(ctx) {
	let if_block_anchor;
	let if_block = /*debuggableClients*/ ctx[1].length > 1 && create_if_block$4(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (/*debuggableClients*/ ctx[1].length > 1) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$4(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

const selectId = 'bgio-debug-select-client';

function instance$f($$self, $$props, $$invalidate) {
	let client;
	let debuggableClients;
	let selected;

	let $clientManager,
		$$unsubscribe_clientManager = noop,
		$$subscribe_clientManager = () => ($$unsubscribe_clientManager(), $$unsubscribe_clientManager = subscribe(clientManager, $$value => $$invalidate(5, $clientManager = $$value)), clientManager);

	$$self.$$.on_destroy.push(() => $$unsubscribe_clientManager());
	let { clientManager } = $$props;
	$$subscribe_clientManager();

	const handleSelection = e => {
		// Request to switch to the selected client.
		const selectedClient = debuggableClients[e.target.value];

		clientManager.switchToClient(selectedClient);

		// Maintain focus on the client select menu after switching clients.
		// Necessary because switching clients will usually trigger a mount/unmount.
		const select = document.getElementById(selectId);

		if (select) select.focus();
	};

	function select_change_handler() {
		selected = select_value(this);
		((($$invalidate(2, selected), $$invalidate(1, debuggableClients)), $$invalidate(4, client)), $$invalidate(5, $clientManager));
	}

	$$self.$$set = $$props => {
		if ('clientManager' in $$props) $$subscribe_clientManager($$invalidate(0, clientManager = $$props.clientManager));
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$clientManager*/ 32) {
			 $$invalidate(4, { client, debuggableClients } = $clientManager, client, ($$invalidate(1, debuggableClients), $$invalidate(5, $clientManager)));
		}

		if ($$self.$$.dirty & /*debuggableClients, client*/ 18) {
			 $$invalidate(2, selected = debuggableClients.indexOf(client));
		}
	};

	return [
		clientManager,
		debuggableClients,
		selected,
		handleSelection,
		client,
		$clientManager,
		select_change_handler
	];
}

class ClientSwitcher extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$f, create_fragment$f, safe_not_equal, { clientManager: 0 }, add_css$8);
	}
}

/* src/client/debug/main/Hotkey.svelte generated by Svelte v3.49.0 */

function add_css$9(target) {
	append_styles(target, "svelte-1vfj1mn", ".key.svelte-1vfj1mn.svelte-1vfj1mn{display:flex;flex-direction:row;align-items:center}button.svelte-1vfj1mn.svelte-1vfj1mn{cursor:pointer;min-width:10px;padding-left:5px;padding-right:5px;height:20px;line-height:20px;text-align:center;border:1px solid #ccc;box-shadow:1px 1px 1px #888;background:#eee;color:#444}button.svelte-1vfj1mn.svelte-1vfj1mn:hover{background:#ddd}.key.active.svelte-1vfj1mn button.svelte-1vfj1mn{background:#ddd;border:1px solid #999;box-shadow:none}label.svelte-1vfj1mn.svelte-1vfj1mn{margin-left:10px}");
}

// (78:2) {#if label}
function create_if_block$5(ctx) {
	let label_1;
	let t0;
	let t1;
	let span;
	let t2_value = `(shortcut: ${/*value*/ ctx[0]})` + "";
	let t2;

	return {
		c() {
			label_1 = element("label");
			t0 = text(/*label*/ ctx[1]);
			t1 = space();
			span = element("span");
			t2 = text(t2_value);
			attr(span, "class", "screen-reader-only");
			attr(label_1, "for", /*id*/ ctx[5]);
			attr(label_1, "class", "svelte-1vfj1mn");
		},
		m(target, anchor) {
			insert(target, label_1, anchor);
			append(label_1, t0);
			append(label_1, t1);
			append(label_1, span);
			append(span, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*label*/ 2) set_data(t0, /*label*/ ctx[1]);
			if (dirty & /*value*/ 1 && t2_value !== (t2_value = `(shortcut: ${/*value*/ ctx[0]})` + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) detach(label_1);
		}
	};
}

function create_fragment$g(ctx) {
	let div;
	let button;
	let t0;
	let t1;
	let mounted;
	let dispose;
	let if_block = /*label*/ ctx[1] && create_if_block$5(ctx);

	return {
		c() {
			div = element("div");
			button = element("button");
			t0 = text(/*value*/ ctx[0]);
			t1 = space();
			if (if_block) if_block.c();
			attr(button, "id", /*id*/ ctx[5]);
			button.disabled = /*disable*/ ctx[2];
			attr(button, "class", "svelte-1vfj1mn");
			attr(div, "class", "key svelte-1vfj1mn");
			toggle_class(div, "active", /*active*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, button);
			append(button, t0);
			append(div, t1);
			if (if_block) if_block.m(div, null);

			if (!mounted) {
				dispose = [
					listen(window, "keydown", /*Keypress*/ ctx[7]),
					listen(button, "click", /*Activate*/ ctx[6])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*value*/ 1) set_data(t0, /*value*/ ctx[0]);

			if (dirty & /*disable*/ 4) {
				button.disabled = /*disable*/ ctx[2];
			}

			if (/*label*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$5(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*active*/ 8) {
				toggle_class(div, "active", /*active*/ ctx[3]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$g($$self, $$props, $$invalidate) {
	let $disableHotkeys;
	let { value } = $$props;
	let { onPress = null } = $$props;
	let { label = null } = $$props;
	let { disable = false } = $$props;
	const { disableHotkeys } = getContext('hotkeys');
	component_subscribe($$self, disableHotkeys, value => $$invalidate(9, $disableHotkeys = value));
	let active = false;
	let id = `key-${value}`;

	function Deactivate() {
		$$invalidate(3, active = false);
	}

	function Activate() {
		$$invalidate(3, active = true);
		setTimeout(Deactivate, 200);

		if (onPress) {
			setTimeout(onPress, 1);
		}
	}

	function Keypress(e) {
		if (!$disableHotkeys && !disable && !e.ctrlKey && !e.metaKey && e.key == value) {
			e.preventDefault();
			Activate();
		}
	}

	$$self.$$set = $$props => {
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('onPress' in $$props) $$invalidate(8, onPress = $$props.onPress);
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
		if ('disable' in $$props) $$invalidate(2, disable = $$props.disable);
	};

	return [value, label, disable, active, disableHotkeys, id, Activate, Keypress, onPress];
}

class Hotkey extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$g,
			create_fragment$g,
			safe_not_equal,
			{
				value: 0,
				onPress: 8,
				label: 1,
				disable: 2
			},
			add_css$9
		);
	}
}

/* src/client/debug/main/InteractiveFunction.svelte generated by Svelte v3.49.0 */

function add_css$a(target) {
	append_styles(target, "svelte-1mppqmp", ".move.svelte-1mppqmp{display:flex;flex-direction:row;cursor:pointer;margin-left:10px;color:#666}.move.svelte-1mppqmp:hover{color:#333}.move.active.svelte-1mppqmp{color:#111;font-weight:bold}.arg-field.svelte-1mppqmp{outline:none;font-family:monospace}");
}

function create_fragment$h(ctx) {
	let div;
	let span0;
	let t0;
	let t1;
	let span1;
	let t3;
	let span2;
	let t4;
	let span3;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			span0 = element("span");
			t0 = text(/*name*/ ctx[2]);
			t1 = space();
			span1 = element("span");
			span1.textContent = "(";
			t3 = space();
			span2 = element("span");
			t4 = space();
			span3 = element("span");
			span3.textContent = ")";
			attr(span2, "class", "arg-field svelte-1mppqmp");
			attr(span2, "contenteditable", "");
			attr(div, "class", "move svelte-1mppqmp");
			toggle_class(div, "active", /*active*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, span0);
			append(span0, t0);
			append(div, t1);
			append(div, span1);
			append(div, t3);
			append(div, span2);
			/*span2_binding*/ ctx[6](span2);
			append(div, t4);
			append(div, span3);

			if (!mounted) {
				dispose = [
					listen(span2, "focus", function () {
						if (is_function(/*Activate*/ ctx[0])) /*Activate*/ ctx[0].apply(this, arguments);
					}),
					listen(span2, "blur", function () {
						if (is_function(/*Deactivate*/ ctx[1])) /*Deactivate*/ ctx[1].apply(this, arguments);
					}),
					listen(span2, "keypress", stop_propagation(keypress_handler)),
					listen(span2, "keydown", /*OnKeyDown*/ ctx[5]),
					listen(div, "click", function () {
						if (is_function(/*Activate*/ ctx[0])) /*Activate*/ ctx[0].apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			if (dirty & /*name*/ 4) set_data(t0, /*name*/ ctx[2]);

			if (dirty & /*active*/ 8) {
				toggle_class(div, "active", /*active*/ ctx[3]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			/*span2_binding*/ ctx[6](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

const keypress_handler = () => {
	
};

function instance$h($$self, $$props, $$invalidate) {
	let { Activate } = $$props;
	let { Deactivate } = $$props;
	let { name } = $$props;
	let { active } = $$props;
	let span;
	const dispatch = createEventDispatcher();

	function Submit() {
		try {
			const value = span.innerText;
			let argArray = new Function(`return [${value}]`)();
			dispatch('submit', argArray);
		} catch(error) {
			dispatch('error', error);
		}

		$$invalidate(4, span.innerText = '', span);
	}

	function OnKeyDown(e) {
		if (e.key == 'Enter') {
			e.preventDefault();
			Submit();
		}

		if (e.key == 'Escape') {
			e.preventDefault();
			Deactivate();
		}
	}

	afterUpdate(() => {
		if (active) {
			span.focus();
		} else {
			span.blur();
		}
	});

	function span2_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			span = $$value;
			$$invalidate(4, span);
		});
	}

	$$self.$$set = $$props => {
		if ('Activate' in $$props) $$invalidate(0, Activate = $$props.Activate);
		if ('Deactivate' in $$props) $$invalidate(1, Deactivate = $$props.Deactivate);
		if ('name' in $$props) $$invalidate(2, name = $$props.name);
		if ('active' in $$props) $$invalidate(3, active = $$props.active);
	};

	return [Activate, Deactivate, name, active, span, OnKeyDown, span2_binding];
}

class InteractiveFunction extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$h,
			create_fragment$h,
			safe_not_equal,
			{
				Activate: 0,
				Deactivate: 1,
				name: 2,
				active: 3
			},
			add_css$a
		);
	}
}

/* src/client/debug/main/Move.svelte generated by Svelte v3.49.0 */

function add_css$b(target) {
	append_styles(target, "svelte-smqssc", ".move-error.svelte-smqssc{color:#a00;font-weight:bold}.wrapper.svelte-smqssc{display:flex;flex-direction:row;align-items:center}");
}

// (65:2) {#if error}
function create_if_block$6(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*error*/ ctx[2]);
			attr(span, "class", "move-error svelte-smqssc");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty & /*error*/ 4) set_data(t, /*error*/ ctx[2]);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

function create_fragment$i(ctx) {
	let div1;
	let div0;
	let hotkey;
	let t0;
	let interactivefunction;
	let t1;
	let current;

	hotkey = new Hotkey({
			props: {
				value: /*shortcut*/ ctx[0],
				onPress: /*Activate*/ ctx[4]
			}
		});

	interactivefunction = new InteractiveFunction({
			props: {
				Activate: /*Activate*/ ctx[4],
				Deactivate: /*Deactivate*/ ctx[5],
				name: /*name*/ ctx[1],
				active: /*active*/ ctx[3]
			}
		});

	interactivefunction.$on("submit", /*Submit*/ ctx[6]);
	interactivefunction.$on("error", /*Error*/ ctx[7]);
	let if_block = /*error*/ ctx[2] && create_if_block$6(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			create_component(hotkey.$$.fragment);
			t0 = space();
			create_component(interactivefunction.$$.fragment);
			t1 = space();
			if (if_block) if_block.c();
			attr(div0, "class", "wrapper svelte-smqssc");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			mount_component(hotkey, div0, null);
			append(div0, t0);
			mount_component(interactivefunction, div0, null);
			append(div1, t1);
			if (if_block) if_block.m(div1, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const hotkey_changes = {};
			if (dirty & /*shortcut*/ 1) hotkey_changes.value = /*shortcut*/ ctx[0];
			hotkey.$set(hotkey_changes);
			const interactivefunction_changes = {};
			if (dirty & /*name*/ 2) interactivefunction_changes.name = /*name*/ ctx[1];
			if (dirty & /*active*/ 8) interactivefunction_changes.active = /*active*/ ctx[3];
			interactivefunction.$set(interactivefunction_changes);

			if (/*error*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$6(ctx);
					if_block.c();
					if_block.m(div1, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(hotkey.$$.fragment, local);
			transition_in(interactivefunction.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(hotkey.$$.fragment, local);
			transition_out(interactivefunction.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(hotkey);
			destroy_component(interactivefunction);
			if (if_block) if_block.d();
		}
	};
}

function instance$i($$self, $$props, $$invalidate) {
	let { shortcut } = $$props;
	let { name } = $$props;
	let { fn } = $$props;
	const { disableHotkeys } = getContext('hotkeys');
	let error = '';
	let active = false;

	function Activate() {
		disableHotkeys.set(true);
		$$invalidate(3, active = true);
	}

	function Deactivate() {
		disableHotkeys.set(false);
		$$invalidate(2, error = '');
		$$invalidate(3, active = false);
	}

	function Submit(e) {
		$$invalidate(2, error = '');
		Deactivate();
		fn.apply(this, e.detail);
	}

	function Error(e) {
		$$invalidate(2, error = e.detail);
		turnOrder.error(e.detail);
	}

	$$self.$$set = $$props => {
		if ('shortcut' in $$props) $$invalidate(0, shortcut = $$props.shortcut);
		if ('name' in $$props) $$invalidate(1, name = $$props.name);
		if ('fn' in $$props) $$invalidate(8, fn = $$props.fn);
	};

	return [shortcut, name, error, active, Activate, Deactivate, Submit, Error, fn];
}

class Move extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$i, create_fragment$i, safe_not_equal, { shortcut: 0, name: 1, fn: 8 }, add_css$b);
	}
}

/* src/client/debug/main/Controls.svelte generated by Svelte v3.49.0 */

function add_css$c(target) {
	append_styles(target, "svelte-9hauj9", "ul.svelte-9hauj9{padding-left:0}li.svelte-9hauj9{list-style:none;margin:0;margin-bottom:5px}");
}

function create_fragment$j(ctx) {
	let ul;
	let li0;
	let hotkey0;
	let t0;
	let li1;
	let hotkey1;
	let t1;
	let li2;
	let hotkey2;
	let t2;
	let li3;
	let hotkey3;
	let current;

	hotkey0 = new Hotkey({
			props: {
				value: "1",
				onPress: /*client*/ ctx[0].reset,
				label: "reset"
			}
		});

	hotkey1 = new Hotkey({
			props: {
				value: "2",
				onPress: /*Save*/ ctx[2],
				label: "save"
			}
		});

	hotkey2 = new Hotkey({
			props: {
				value: "3",
				onPress: /*Restore*/ ctx[3],
				label: "restore"
			}
		});

	hotkey3 = new Hotkey({
			props: {
				value: ".",
				onPress: /*ToggleVisibility*/ ctx[1],
				label: "hide"
			}
		});

	return {
		c() {
			ul = element("ul");
			li0 = element("li");
			create_component(hotkey0.$$.fragment);
			t0 = space();
			li1 = element("li");
			create_component(hotkey1.$$.fragment);
			t1 = space();
			li2 = element("li");
			create_component(hotkey2.$$.fragment);
			t2 = space();
			li3 = element("li");
			create_component(hotkey3.$$.fragment);
			attr(li0, "class", "svelte-9hauj9");
			attr(li1, "class", "svelte-9hauj9");
			attr(li2, "class", "svelte-9hauj9");
			attr(li3, "class", "svelte-9hauj9");
			attr(ul, "id", "debug-controls");
			attr(ul, "class", "controls svelte-9hauj9");
		},
		m(target, anchor) {
			insert(target, ul, anchor);
			append(ul, li0);
			mount_component(hotkey0, li0, null);
			append(ul, t0);
			append(ul, li1);
			mount_component(hotkey1, li1, null);
			append(ul, t1);
			append(ul, li2);
			mount_component(hotkey2, li2, null);
			append(ul, t2);
			append(ul, li3);
			mount_component(hotkey3, li3, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const hotkey0_changes = {};
			if (dirty & /*client*/ 1) hotkey0_changes.onPress = /*client*/ ctx[0].reset;
			hotkey0.$set(hotkey0_changes);
			const hotkey3_changes = {};
			if (dirty & /*ToggleVisibility*/ 2) hotkey3_changes.onPress = /*ToggleVisibility*/ ctx[1];
			hotkey3.$set(hotkey3_changes);
		},
		i(local) {
			if (current) return;
			transition_in(hotkey0.$$.fragment, local);
			transition_in(hotkey1.$$.fragment, local);
			transition_in(hotkey2.$$.fragment, local);
			transition_in(hotkey3.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(hotkey0.$$.fragment, local);
			transition_out(hotkey1.$$.fragment, local);
			transition_out(hotkey2.$$.fragment, local);
			transition_out(hotkey3.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(ul);
			destroy_component(hotkey0);
			destroy_component(hotkey1);
			destroy_component(hotkey2);
			destroy_component(hotkey3);
		}
	};
}

function instance$j($$self, $$props, $$invalidate) {
	let { client } = $$props;
	let { ToggleVisibility } = $$props;

	function Save() {
		// get state to persist and overwrite deltalog, _undo, and _redo
		const state = client.getState();

		const json = flatted.stringify({
			...state,
			_undo: [],
			_redo: [],
			deltalog: []
		});

		window.localStorage.setItem('gamestate', json);
		window.localStorage.setItem('initialState', flatted.stringify(client.initialState));
	}

	function Restore() {
		const gamestateJSON = window.localStorage.getItem('gamestate');
		const initialStateJSON = window.localStorage.getItem('initialState');

		if (gamestateJSON !== null && initialStateJSON !== null) {
			const gamestate = flatted.parse(gamestateJSON);
			const initialState = flatted.parse(initialStateJSON);
			client.store.dispatch(turnOrder.sync({ state: gamestate, initialState }));
		}
	}

	$$self.$$set = $$props => {
		if ('client' in $$props) $$invalidate(0, client = $$props.client);
		if ('ToggleVisibility' in $$props) $$invalidate(1, ToggleVisibility = $$props.ToggleVisibility);
	};

	return [client, ToggleVisibility, Save, Restore];
}

class Controls extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$j, create_fragment$j, safe_not_equal, { client: 0, ToggleVisibility: 1 }, add_css$c);
	}
}

/* src/client/debug/main/PlayerInfo.svelte generated by Svelte v3.49.0 */

function add_css$d(target) {
	append_styles(target, "svelte-19aan9p", ".player-box.svelte-19aan9p{display:flex;flex-direction:row}.player.svelte-19aan9p{cursor:pointer;text-align:center;width:30px;height:30px;line-height:30px;background:#eee;border:3px solid #fefefe;box-sizing:content-box;padding:0}.player.current.svelte-19aan9p{background:#555;color:#eee;font-weight:bold}.player.active.svelte-19aan9p{border:3px solid #ff7f50}");
}

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

// (59:2) {#each players as player}
function create_each_block$4(ctx) {
	let button;
	let t0_value = /*player*/ ctx[7] + "";
	let t0;
	let t1;
	let button_aria_label_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[5](/*player*/ ctx[7]);
	}

	return {
		c() {
			button = element("button");
			t0 = text(t0_value);
			t1 = space();
			attr(button, "class", "player svelte-19aan9p");
			attr(button, "aria-label", button_aria_label_value = /*playerLabel*/ ctx[4](/*player*/ ctx[7]));
			toggle_class(button, "current", /*player*/ ctx[7] == /*ctx*/ ctx[0].currentPlayer);
			toggle_class(button, "active", /*player*/ ctx[7] == /*playerID*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t0);
			append(button, t1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*players*/ 4 && t0_value !== (t0_value = /*player*/ ctx[7] + "")) set_data(t0, t0_value);

			if (dirty & /*players*/ 4 && button_aria_label_value !== (button_aria_label_value = /*playerLabel*/ ctx[4](/*player*/ ctx[7]))) {
				attr(button, "aria-label", button_aria_label_value);
			}

			if (dirty & /*players, ctx*/ 5) {
				toggle_class(button, "current", /*player*/ ctx[7] == /*ctx*/ ctx[0].currentPlayer);
			}

			if (dirty & /*players, playerID*/ 6) {
				toggle_class(button, "active", /*player*/ ctx[7] == /*playerID*/ ctx[1]);
			}
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$k(ctx) {
	let div;
	let each_value = /*players*/ ctx[2];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "player-box svelte-19aan9p");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*playerLabel, players, ctx, playerID, OnClick*/ 31) {
				each_value = /*players*/ ctx[2];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$4(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$k($$self, $$props, $$invalidate) {
	let { ctx } = $$props;
	let { playerID } = $$props;
	const dispatch = createEventDispatcher();

	function OnClick(player) {
		if (player == playerID) {
			dispatch("change", { playerID: null });
		} else {
			dispatch("change", { playerID: player });
		}
	}

	function playerLabel(player) {
		const properties = [];
		if (player == ctx.currentPlayer) properties.push('current');
		if (player == playerID) properties.push('active');
		let label = `Player ${player}`;
		if (properties.length) label += ` (${properties.join(', ')})`;
		return label;
	}

	let players;
	const click_handler = player => OnClick(player);

	$$self.$$set = $$props => {
		if ('ctx' in $$props) $$invalidate(0, ctx = $$props.ctx);
		if ('playerID' in $$props) $$invalidate(1, playerID = $$props.playerID);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*ctx*/ 1) {
			 $$invalidate(2, players = ctx
			? [...Array(ctx.numPlayers).keys()].map(i => i.toString())
			: []);
		}
	};

	return [ctx, playerID, players, OnClick, playerLabel, click_handler];
}

class PlayerInfo extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$k, create_fragment$k, safe_not_equal, { ctx: 0, playerID: 1 }, add_css$d);
	}
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
function AssignShortcuts(moveNames, blacklist) {
  var shortcuts = {};
  var taken = {};

  var _iterator = _createForOfIteratorHelper(blacklist),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var c = _step.value;
      taken[c] = true;
    } // Try assigning the first char of each move as the shortcut.

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var t = taken;
  var canUseFirstChar = true;

  for (var name in moveNames) {
    var shortcut = name[0];

    if (t[shortcut]) {
      canUseFirstChar = false;
      break;
    }

    t[shortcut] = true;
    shortcuts[name] = shortcut;
  }

  if (canUseFirstChar) {
    return shortcuts;
  } // If those aren't unique, use a-z.


  t = taken;
  var next = 97;
  shortcuts = {};

  for (var _name in moveNames) {
    var _shortcut = String.fromCharCode(next);

    while (t[_shortcut]) {
      next++;
      _shortcut = String.fromCharCode(next);
    }

    t[_shortcut] = true;
    shortcuts[_name] = _shortcut;
  }

  return shortcuts;
}

/* src/client/debug/main/Main.svelte generated by Svelte v3.49.0 */

function add_css$e(target) {
	append_styles(target, "svelte-146sq5f", ".tree.svelte-146sq5f{--json-tree-font-family:monospace;--json-tree-font-size:14px;--json-tree-null-color:#757575}.label.svelte-146sq5f{margin-bottom:0;text-transform:none}h3.svelte-146sq5f{text-transform:uppercase}ul.svelte-146sq5f{padding-left:0}li.svelte-146sq5f{list-style:none;margin:0;margin-bottom:5px}");
}

function get_each_context$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i][0];
	child_ctx[12] = list[i][1];
	return child_ctx;
}

// (81:4) {#each Object.entries(moves) as [name, fn]}
function create_each_block$5(ctx) {
	let li;
	let move;
	let t;
	let current;

	move = new Move({
			props: {
				shortcut: /*shortcuts*/ ctx[8][/*name*/ ctx[11]],
				fn: /*fn*/ ctx[12],
				name: /*name*/ ctx[11]
			}
		});

	return {
		c() {
			li = element("li");
			create_component(move.$$.fragment);
			t = space();
			attr(li, "class", "svelte-146sq5f");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			mount_component(move, li, null);
			append(li, t);
			current = true;
		},
		p(ctx, dirty) {
			const move_changes = {};
			if (dirty & /*moves*/ 16) move_changes.shortcut = /*shortcuts*/ ctx[8][/*name*/ ctx[11]];
			if (dirty & /*moves*/ 16) move_changes.fn = /*fn*/ ctx[12];
			if (dirty & /*moves*/ 16) move_changes.name = /*name*/ ctx[11];
			move.$set(move_changes);
		},
		i(local) {
			if (current) return;
			transition_in(move.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(move.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(move);
		}
	};
}

// (93:2) {#if ctx.activePlayers && events.endStage}
function create_if_block_2$2(ctx) {
	let li;
	let move;
	let current;

	move = new Move({
			props: {
				name: "endStage",
				shortcut: 7,
				fn: /*events*/ ctx[5].endStage
			}
		});

	return {
		c() {
			li = element("li");
			create_component(move.$$.fragment);
			attr(li, "class", "svelte-146sq5f");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			mount_component(move, li, null);
			current = true;
		},
		p(ctx, dirty) {
			const move_changes = {};
			if (dirty & /*events*/ 32) move_changes.fn = /*events*/ ctx[5].endStage;
			move.$set(move_changes);
		},
		i(local) {
			if (current) return;
			transition_in(move.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(move.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(move);
		}
	};
}

// (98:2) {#if events.endTurn}
function create_if_block_1$2(ctx) {
	let li;
	let move;
	let current;

	move = new Move({
			props: {
				name: "endTurn",
				shortcut: 8,
				fn: /*events*/ ctx[5].endTurn
			}
		});

	return {
		c() {
			li = element("li");
			create_component(move.$$.fragment);
			attr(li, "class", "svelte-146sq5f");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			mount_component(move, li, null);
			current = true;
		},
		p(ctx, dirty) {
			const move_changes = {};
			if (dirty & /*events*/ 32) move_changes.fn = /*events*/ ctx[5].endTurn;
			move.$set(move_changes);
		},
		i(local) {
			if (current) return;
			transition_in(move.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(move.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(move);
		}
	};
}

// (103:2) {#if ctx.phase && events.endPhase}
function create_if_block$7(ctx) {
	let li;
	let move;
	let current;

	move = new Move({
			props: {
				name: "endPhase",
				shortcut: 9,
				fn: /*events*/ ctx[5].endPhase
			}
		});

	return {
		c() {
			li = element("li");
			create_component(move.$$.fragment);
			attr(li, "class", "svelte-146sq5f");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			mount_component(move, li, null);
			current = true;
		},
		p(ctx, dirty) {
			const move_changes = {};
			if (dirty & /*events*/ 32) move_changes.fn = /*events*/ ctx[5].endPhase;
			move.$set(move_changes);
		},
		i(local) {
			if (current) return;
			transition_in(move.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(move.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(move);
		}
	};
}

function create_fragment$l(ctx) {
	let section0;
	let h30;
	let t1;
	let controls;
	let t2;
	let section1;
	let h31;
	let t4;
	let playerinfo;
	let t5;
	let section2;
	let h32;
	let t7;
	let ul0;
	let t8;
	let section3;
	let h33;
	let t10;
	let ul1;
	let t11;
	let t12;
	let t13;
	let section4;
	let h34;
	let t15;
	let jsontree0;
	let t16;
	let section5;
	let h35;
	let t18;
	let jsontree1;
	let t19;
	let clientswitcher;
	let current;

	controls = new Controls({
			props: {
				client: /*client*/ ctx[0],
				ToggleVisibility: /*ToggleVisibility*/ ctx[2]
			}
		});

	playerinfo = new PlayerInfo({
			props: {
				ctx: /*ctx*/ ctx[6],
				playerID: /*playerID*/ ctx[3]
			}
		});

	playerinfo.$on("change", /*change_handler*/ ctx[9]);
	let each_value = Object.entries(/*moves*/ ctx[4]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block0 = /*ctx*/ ctx[6].activePlayers && /*events*/ ctx[5].endStage && create_if_block_2$2(ctx);
	let if_block1 = /*events*/ ctx[5].endTurn && create_if_block_1$2(ctx);
	let if_block2 = /*ctx*/ ctx[6].phase && /*events*/ ctx[5].endPhase && create_if_block$7(ctx);
	jsontree0 = new Root({ props: { value: /*G*/ ctx[7] } });

	jsontree1 = new Root({
			props: { value: SanitizeCtx(/*ctx*/ ctx[6]) }
		});

	clientswitcher = new ClientSwitcher({
			props: { clientManager: /*clientManager*/ ctx[1] }
		});

	return {
		c() {
			section0 = element("section");
			h30 = element("h3");
			h30.textContent = "Controls";
			t1 = space();
			create_component(controls.$$.fragment);
			t2 = space();
			section1 = element("section");
			h31 = element("h3");
			h31.textContent = "Players";
			t4 = space();
			create_component(playerinfo.$$.fragment);
			t5 = space();
			section2 = element("section");
			h32 = element("h3");
			h32.textContent = "Moves";
			t7 = space();
			ul0 = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t8 = space();
			section3 = element("section");
			h33 = element("h3");
			h33.textContent = "Events";
			t10 = space();
			ul1 = element("ul");
			if (if_block0) if_block0.c();
			t11 = space();
			if (if_block1) if_block1.c();
			t12 = space();
			if (if_block2) if_block2.c();
			t13 = space();
			section4 = element("section");
			h34 = element("h3");
			h34.textContent = "G";
			t15 = space();
			create_component(jsontree0.$$.fragment);
			t16 = space();
			section5 = element("section");
			h35 = element("h3");
			h35.textContent = "ctx";
			t18 = space();
			create_component(jsontree1.$$.fragment);
			t19 = space();
			create_component(clientswitcher.$$.fragment);
			attr(h30, "class", "svelte-146sq5f");
			attr(h31, "class", "svelte-146sq5f");
			attr(h32, "class", "svelte-146sq5f");
			attr(ul0, "class", "svelte-146sq5f");
			attr(h33, "class", "svelte-146sq5f");
			attr(ul1, "class", "svelte-146sq5f");
			attr(h34, "class", "label svelte-146sq5f");
			attr(section4, "class", "tree svelte-146sq5f");
			attr(h35, "class", "label svelte-146sq5f");
			attr(section5, "class", "tree svelte-146sq5f");
		},
		m(target, anchor) {
			insert(target, section0, anchor);
			append(section0, h30);
			append(section0, t1);
			mount_component(controls, section0, null);
			insert(target, t2, anchor);
			insert(target, section1, anchor);
			append(section1, h31);
			append(section1, t4);
			mount_component(playerinfo, section1, null);
			insert(target, t5, anchor);
			insert(target, section2, anchor);
			append(section2, h32);
			append(section2, t7);
			append(section2, ul0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul0, null);
			}

			insert(target, t8, anchor);
			insert(target, section3, anchor);
			append(section3, h33);
			append(section3, t10);
			append(section3, ul1);
			if (if_block0) if_block0.m(ul1, null);
			append(ul1, t11);
			if (if_block1) if_block1.m(ul1, null);
			append(ul1, t12);
			if (if_block2) if_block2.m(ul1, null);
			insert(target, t13, anchor);
			insert(target, section4, anchor);
			append(section4, h34);
			append(section4, t15);
			mount_component(jsontree0, section4, null);
			insert(target, t16, anchor);
			insert(target, section5, anchor);
			append(section5, h35);
			append(section5, t18);
			mount_component(jsontree1, section5, null);
			insert(target, t19, anchor);
			mount_component(clientswitcher, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const controls_changes = {};
			if (dirty & /*client*/ 1) controls_changes.client = /*client*/ ctx[0];
			if (dirty & /*ToggleVisibility*/ 4) controls_changes.ToggleVisibility = /*ToggleVisibility*/ ctx[2];
			controls.$set(controls_changes);
			const playerinfo_changes = {};
			if (dirty & /*ctx*/ 64) playerinfo_changes.ctx = /*ctx*/ ctx[6];
			if (dirty & /*playerID*/ 8) playerinfo_changes.playerID = /*playerID*/ ctx[3];
			playerinfo.$set(playerinfo_changes);

			if (dirty & /*shortcuts, Object, moves*/ 272) {
				each_value = Object.entries(/*moves*/ ctx[4]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$5(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$5(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul0, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (/*ctx*/ ctx[6].activePlayers && /*events*/ ctx[5].endStage) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*ctx, events*/ 96) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2$2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(ul1, t11);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*events*/ ctx[5].endTurn) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*events*/ 32) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1$2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(ul1, t12);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (/*ctx*/ ctx[6].phase && /*events*/ ctx[5].endPhase) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*ctx, events*/ 96) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block$7(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(ul1, null);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			const jsontree0_changes = {};
			if (dirty & /*G*/ 128) jsontree0_changes.value = /*G*/ ctx[7];
			jsontree0.$set(jsontree0_changes);
			const jsontree1_changes = {};
			if (dirty & /*ctx*/ 64) jsontree1_changes.value = SanitizeCtx(/*ctx*/ ctx[6]);
			jsontree1.$set(jsontree1_changes);
			const clientswitcher_changes = {};
			if (dirty & /*clientManager*/ 2) clientswitcher_changes.clientManager = /*clientManager*/ ctx[1];
			clientswitcher.$set(clientswitcher_changes);
		},
		i(local) {
			if (current) return;
			transition_in(controls.$$.fragment, local);
			transition_in(playerinfo.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			transition_in(jsontree0.$$.fragment, local);
			transition_in(jsontree1.$$.fragment, local);
			transition_in(clientswitcher.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(controls.$$.fragment, local);
			transition_out(playerinfo.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block2);
			transition_out(jsontree0.$$.fragment, local);
			transition_out(jsontree1.$$.fragment, local);
			transition_out(clientswitcher.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section0);
			destroy_component(controls);
			if (detaching) detach(t2);
			if (detaching) detach(section1);
			destroy_component(playerinfo);
			if (detaching) detach(t5);
			if (detaching) detach(section2);
			destroy_each(each_blocks, detaching);
			if (detaching) detach(t8);
			if (detaching) detach(section3);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (detaching) detach(t13);
			if (detaching) detach(section4);
			destroy_component(jsontree0);
			if (detaching) detach(t16);
			if (detaching) detach(section5);
			destroy_component(jsontree1);
			if (detaching) detach(t19);
			destroy_component(clientswitcher, detaching);
		}
	};
}

function SanitizeCtx(ctx) {
	let r = {};

	for (const key in ctx) {
		if (!key.startsWith('_')) {
			r[key] = ctx[key];
		}
	}

	return r;
}

function instance$l($$self, $$props, $$invalidate) {
	let { client } = $$props;
	let { clientManager } = $$props;
	let { ToggleVisibility } = $$props;
	const shortcuts = AssignShortcuts(client.moves, 'mlia');
	let { playerID, moves, events } = client;
	let ctx = {};
	let G = {};

	const unsubscribe = client.subscribe(state => {
		if (state) $$invalidate(7, { G, ctx } = state, G, $$invalidate(6, ctx));
		$$invalidate(3, { playerID, moves, events } = client, playerID, $$invalidate(4, moves), $$invalidate(5, events));
	});

	onDestroy(unsubscribe);
	const change_handler = e => clientManager.switchPlayerID(e.detail.playerID);

	$$self.$$set = $$props => {
		if ('client' in $$props) $$invalidate(0, client = $$props.client);
		if ('clientManager' in $$props) $$invalidate(1, clientManager = $$props.clientManager);
		if ('ToggleVisibility' in $$props) $$invalidate(2, ToggleVisibility = $$props.ToggleVisibility);
	};

	return [
		client,
		clientManager,
		ToggleVisibility,
		playerID,
		moves,
		events,
		ctx,
		G,
		shortcuts,
		change_handler
	];
}

class Main extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$l,
			create_fragment$l,
			safe_not_equal,
			{
				client: 0,
				clientManager: 1,
				ToggleVisibility: 2
			},
			add_css$e
		);
	}
}

/* src/client/debug/info/Item.svelte generated by Svelte v3.49.0 */

function add_css$f(target) {
	append_styles(target, "svelte-13qih23", ".item.svelte-13qih23.svelte-13qih23{padding:10px}.item.svelte-13qih23.svelte-13qih23:not(:first-child){border-top:1px dashed #aaa}.item.svelte-13qih23 div.svelte-13qih23{float:right;text-align:right}");
}

function create_fragment$m(ctx) {
	let div1;
	let strong;
	let t0;
	let t1;
	let div0;
	let t2_value = JSON.stringify(/*value*/ ctx[1]) + "";
	let t2;

	return {
		c() {
			div1 = element("div");
			strong = element("strong");
			t0 = text(/*name*/ ctx[0]);
			t1 = space();
			div0 = element("div");
			t2 = text(t2_value);
			attr(div0, "class", "svelte-13qih23");
			attr(div1, "class", "item svelte-13qih23");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, strong);
			append(strong, t0);
			append(div1, t1);
			append(div1, div0);
			append(div0, t2);
		},
		p(ctx, [dirty]) {
			if (dirty & /*name*/ 1) set_data(t0, /*name*/ ctx[0]);
			if (dirty & /*value*/ 2 && t2_value !== (t2_value = JSON.stringify(/*value*/ ctx[1]) + "")) set_data(t2, t2_value);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

function instance$m($$self, $$props, $$invalidate) {
	let { name } = $$props;
	let { value } = $$props;

	$$self.$$set = $$props => {
		if ('name' in $$props) $$invalidate(0, name = $$props.name);
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
	};

	return [name, value];
}

class Item extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$m, create_fragment$m, safe_not_equal, { name: 0, value: 1 }, add_css$f);
	}
}

/* src/client/debug/info/Info.svelte generated by Svelte v3.49.0 */

function add_css$g(target) {
	append_styles(target, "svelte-1yzq5o8", ".gameinfo.svelte-1yzq5o8{padding:10px}");
}

// (19:2) {#if client.multiplayer}
function create_if_block$8(ctx) {
	let item;
	let current;

	item = new Item({
			props: {
				name: "isConnected",
				value: /*$client*/ ctx[1].isConnected
			}
		});

	return {
		c() {
			create_component(item.$$.fragment);
		},
		m(target, anchor) {
			mount_component(item, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const item_changes = {};
			if (dirty & /*$client*/ 2) item_changes.value = /*$client*/ ctx[1].isConnected;
			item.$set(item_changes);
		},
		i(local) {
			if (current) return;
			transition_in(item.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(item.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(item, detaching);
		}
	};
}

function create_fragment$n(ctx) {
	let section;
	let item0;
	let t0;
	let item1;
	let t1;
	let item2;
	let t2;
	let current;

	item0 = new Item({
			props: {
				name: "matchID",
				value: /*client*/ ctx[0].matchID
			}
		});

	item1 = new Item({
			props: {
				name: "playerID",
				value: /*client*/ ctx[0].playerID
			}
		});

	item2 = new Item({
			props: {
				name: "isActive",
				value: /*$client*/ ctx[1].isActive
			}
		});

	let if_block = /*client*/ ctx[0].multiplayer && create_if_block$8(ctx);

	return {
		c() {
			section = element("section");
			create_component(item0.$$.fragment);
			t0 = space();
			create_component(item1.$$.fragment);
			t1 = space();
			create_component(item2.$$.fragment);
			t2 = space();
			if (if_block) if_block.c();
			attr(section, "class", "gameinfo svelte-1yzq5o8");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			mount_component(item0, section, null);
			append(section, t0);
			mount_component(item1, section, null);
			append(section, t1);
			mount_component(item2, section, null);
			append(section, t2);
			if (if_block) if_block.m(section, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const item0_changes = {};
			if (dirty & /*client*/ 1) item0_changes.value = /*client*/ ctx[0].matchID;
			item0.$set(item0_changes);
			const item1_changes = {};
			if (dirty & /*client*/ 1) item1_changes.value = /*client*/ ctx[0].playerID;
			item1.$set(item1_changes);
			const item2_changes = {};
			if (dirty & /*$client*/ 2) item2_changes.value = /*$client*/ ctx[1].isActive;
			item2.$set(item2_changes);

			if (/*client*/ ctx[0].multiplayer) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*client*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$8(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(section, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(item0.$$.fragment, local);
			transition_in(item1.$$.fragment, local);
			transition_in(item2.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(item0.$$.fragment, local);
			transition_out(item1.$$.fragment, local);
			transition_out(item2.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section);
			destroy_component(item0);
			destroy_component(item1);
			destroy_component(item2);
			if (if_block) if_block.d();
		}
	};
}

function instance$n($$self, $$props, $$invalidate) {
	let $client,
		$$unsubscribe_client = noop,
		$$subscribe_client = () => ($$unsubscribe_client(), $$unsubscribe_client = subscribe(client, $$value => $$invalidate(1, $client = $$value)), client);

	$$self.$$.on_destroy.push(() => $$unsubscribe_client());
	let { client } = $$props;
	$$subscribe_client();
	let { clientManager } = $$props;
	let { ToggleVisibility } = $$props;

	$$self.$$set = $$props => {
		if ('client' in $$props) $$subscribe_client($$invalidate(0, client = $$props.client));
		if ('clientManager' in $$props) $$invalidate(2, clientManager = $$props.clientManager);
		if ('ToggleVisibility' in $$props) $$invalidate(3, ToggleVisibility = $$props.ToggleVisibility);
	};

	return [client, $client, clientManager, ToggleVisibility];
}

class Info extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$n,
			create_fragment$n,
			safe_not_equal,
			{
				client: 0,
				clientManager: 2,
				ToggleVisibility: 3
			},
			add_css$g
		);
	}
}

/* src/client/debug/log/TurnMarker.svelte generated by Svelte v3.49.0 */

function add_css$h(target) {
	append_styles(target, "svelte-6eza86", ".turn-marker.svelte-6eza86{display:flex;justify-content:center;align-items:center;grid-column:1;background:#555;color:#eee;text-align:center;font-weight:bold;border:1px solid #888}");
}

function create_fragment$o(ctx) {
	let div;
	let t;

	return {
		c() {
			div = element("div");
			t = text(/*turn*/ ctx[0]);
			attr(div, "class", "turn-marker svelte-6eza86");
			attr(div, "style", /*style*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, [dirty]) {
			if (dirty & /*turn*/ 1) set_data(t, /*turn*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$o($$self, $$props, $$invalidate) {
	let { turn } = $$props;
	let { numEvents } = $$props;
	const style = `grid-row: span ${numEvents}`;

	$$self.$$set = $$props => {
		if ('turn' in $$props) $$invalidate(0, turn = $$props.turn);
		if ('numEvents' in $$props) $$invalidate(2, numEvents = $$props.numEvents);
	};

	return [turn, style, numEvents];
}

class TurnMarker extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$o, create_fragment$o, safe_not_equal, { turn: 0, numEvents: 2 }, add_css$h);
	}
}

/* src/client/debug/log/PhaseMarker.svelte generated by Svelte v3.49.0 */

function add_css$i(target) {
	append_styles(target, "svelte-1t4xap", ".phase-marker.svelte-1t4xap{grid-column:3;background:#555;border:1px solid #888;color:#eee;text-align:center;font-weight:bold;padding-top:10px;padding-bottom:10px;text-orientation:sideways;writing-mode:vertical-rl;line-height:30px;width:100%}");
}

function create_fragment$p(ctx) {
	let div;
	let t_value = (/*phase*/ ctx[0] || '') + "";
	let t;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", "phase-marker svelte-1t4xap");
			attr(div, "style", /*style*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, [dirty]) {
			if (dirty & /*phase*/ 1 && t_value !== (t_value = (/*phase*/ ctx[0] || '') + "")) set_data(t, t_value);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$p($$self, $$props, $$invalidate) {
	let { phase } = $$props;
	let { numEvents } = $$props;
	const style = `grid-row: span ${numEvents}`;

	$$self.$$set = $$props => {
		if ('phase' in $$props) $$invalidate(0, phase = $$props.phase);
		if ('numEvents' in $$props) $$invalidate(2, numEvents = $$props.numEvents);
	};

	return [phase, style, numEvents];
}

class PhaseMarker extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$p, create_fragment$p, safe_not_equal, { phase: 0, numEvents: 2 }, add_css$i);
	}
}

/* src/client/debug/log/LogMetadata.svelte generated by Svelte v3.49.0 */

function create_fragment$q(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = `${/*renderedMetadata*/ ctx[0]}`;
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$q($$self, $$props, $$invalidate) {
	let { metadata } = $$props;

	const renderedMetadata = metadata !== undefined
	? JSON.stringify(metadata, null, 4)
	: '';

	$$self.$$set = $$props => {
		if ('metadata' in $$props) $$invalidate(1, metadata = $$props.metadata);
	};

	return [renderedMetadata, metadata];
}

class LogMetadata extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$q, create_fragment$q, safe_not_equal, { metadata: 1 });
	}
}

/* src/client/debug/log/LogEvent.svelte generated by Svelte v3.49.0 */

function add_css$j(target) {
	append_styles(target, "svelte-vajd9z", ".log-event.svelte-vajd9z{grid-column:2;cursor:pointer;overflow:hidden;display:flex;flex-direction:column;justify-content:center;background:#fff;border:1px dotted #ccc;border-left:5px solid #ccc;padding:5px;text-align:center;color:#666;font-size:14px;min-height:25px;line-height:25px}.log-event.svelte-vajd9z:hover,.log-event.svelte-vajd9z:focus{border-style:solid;background:#eee}.log-event.pinned.svelte-vajd9z{border-style:solid;background:#eee;opacity:1}.args.svelte-vajd9z{text-align:left;white-space:pre-wrap}.player0.svelte-vajd9z{border-left-color:#ff851b}.player1.svelte-vajd9z{border-left-color:#7fdbff}.player2.svelte-vajd9z{border-left-color:#0074d9}.player3.svelte-vajd9z{border-left-color:#39cccc}.player4.svelte-vajd9z{border-left-color:#3d9970}.player5.svelte-vajd9z{border-left-color:#2ecc40}.player6.svelte-vajd9z{border-left-color:#01ff70}.player7.svelte-vajd9z{border-left-color:#ffdc00}.player8.svelte-vajd9z{border-left-color:#001f3f}.player9.svelte-vajd9z{border-left-color:#ff4136}.player10.svelte-vajd9z{border-left-color:#85144b}.player11.svelte-vajd9z{border-left-color:#f012be}.player12.svelte-vajd9z{border-left-color:#b10dc9}.player13.svelte-vajd9z{border-left-color:#111111}.player14.svelte-vajd9z{border-left-color:#aaaaaa}.player15.svelte-vajd9z{border-left-color:#dddddd}");
}

// (146:2) {:else}
function create_else_block$1(ctx) {
	let logmetadata;
	let current;
	logmetadata = new LogMetadata({ props: { metadata: /*metadata*/ ctx[2] } });

	return {
		c() {
			create_component(logmetadata.$$.fragment);
		},
		m(target, anchor) {
			mount_component(logmetadata, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const logmetadata_changes = {};
			if (dirty & /*metadata*/ 4) logmetadata_changes.metadata = /*metadata*/ ctx[2];
			logmetadata.$set(logmetadata_changes);
		},
		i(local) {
			if (current) return;
			transition_in(logmetadata.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(logmetadata.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(logmetadata, detaching);
		}
	};
}

// (144:2) {#if metadataComponent}
function create_if_block$9(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*metadataComponent*/ ctx[3];

	function switch_props(ctx) {
		return { props: { metadata: /*metadata*/ ctx[2] } };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty & /*metadata*/ 4) switch_instance_changes.metadata = /*metadata*/ ctx[2];

			if (switch_value !== (switch_value = /*metadataComponent*/ ctx[3])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

function create_fragment$r(ctx) {
	let button;
	let div;
	let t0;
	let t1;
	let t2;
	let t3;
	let t4;
	let current_block_type_index;
	let if_block;
	let button_class_value;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block$9, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*metadataComponent*/ ctx[3]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			button = element("button");
			div = element("div");
			t0 = text(/*actionType*/ ctx[4]);
			t1 = text("(");
			t2 = text(/*renderedArgs*/ ctx[6]);
			t3 = text(")");
			t4 = space();
			if_block.c();
			attr(div, "class", "args svelte-vajd9z");
			attr(button, "class", button_class_value = "log-event player" + /*playerID*/ ctx[7] + " svelte-vajd9z");
			toggle_class(button, "pinned", /*pinned*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, div);
			append(div, t0);
			append(div, t1);
			append(div, t2);
			append(div, t3);
			append(button, t4);
			if_blocks[current_block_type_index].m(button, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button, "click", /*click_handler*/ ctx[9]),
					listen(button, "mouseenter", /*mouseenter_handler*/ ctx[10]),
					listen(button, "focus", /*focus_handler*/ ctx[11]),
					listen(button, "mouseleave", /*mouseleave_handler*/ ctx[12]),
					listen(button, "blur", /*blur_handler*/ ctx[13])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*actionType*/ 16) set_data(t0, /*actionType*/ ctx[4]);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(button, null);
			}

			if (dirty & /*pinned*/ 2) {
				toggle_class(button, "pinned", /*pinned*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			if_blocks[current_block_type_index].d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$r($$self, $$props, $$invalidate) {
	let { logIndex } = $$props;
	let { action } = $$props;
	let { pinned } = $$props;
	let { metadata } = $$props;
	let { metadataComponent } = $$props;
	const dispatch = createEventDispatcher();
	const args = action.payload.args;

	const renderedArgs = Array.isArray(args)
	? args.map(arg => JSON.stringify(arg, null, 2)).join(',')
	: JSON.stringify(args, null, 2) || '';

	const playerID = action.payload.playerID;
	let actionType;

	switch (action.type) {
		case 'UNDO':
			actionType = 'undo';
			break;
		case 'REDO':
			actionType = 'redo';
		case 'GAME_EVENT':
		case 'MAKE_MOVE':
		default:
			actionType = action.payload.type;
			break;
	}

	const click_handler = () => dispatch('click', { logIndex });
	const mouseenter_handler = () => dispatch('mouseenter', { logIndex });
	const focus_handler = () => dispatch('mouseenter', { logIndex });
	const mouseleave_handler = () => dispatch('mouseleave');
	const blur_handler = () => dispatch('mouseleave');

	$$self.$$set = $$props => {
		if ('logIndex' in $$props) $$invalidate(0, logIndex = $$props.logIndex);
		if ('action' in $$props) $$invalidate(8, action = $$props.action);
		if ('pinned' in $$props) $$invalidate(1, pinned = $$props.pinned);
		if ('metadata' in $$props) $$invalidate(2, metadata = $$props.metadata);
		if ('metadataComponent' in $$props) $$invalidate(3, metadataComponent = $$props.metadataComponent);
	};

	return [
		logIndex,
		pinned,
		metadata,
		metadataComponent,
		actionType,
		dispatch,
		renderedArgs,
		playerID,
		action,
		click_handler,
		mouseenter_handler,
		focus_handler,
		mouseleave_handler,
		blur_handler
	];
}

class LogEvent extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$r,
			create_fragment$r,
			safe_not_equal,
			{
				logIndex: 0,
				action: 8,
				pinned: 1,
				metadata: 2,
				metadataComponent: 3
			},
			add_css$j
		);
	}
}

/* node_modules/svelte-icons/fa/FaArrowAltCircleDown.svelte generated by Svelte v3.49.0 */

function create_default_slot$1(ctx) {
	let path;

	return {
		c() {
			path = svg_element("path");
			attr(path, "d", "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z");
		},
		m(target, anchor) {
			insert(target, path, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(path);
		}
	};
}

function create_fragment$s(ctx) {
	let iconbase;
	let current;
	const iconbase_spread_levels = [{ viewBox: "0 0 512 512" }, /*$$props*/ ctx[0]];

	let iconbase_props = {
		$$slots: { default: [create_default_slot$1] },
		$$scope: { ctx }
	};

	for (let i = 0; i < iconbase_spread_levels.length; i += 1) {
		iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
	}

	iconbase = new IconBase({ props: iconbase_props });

	return {
		c() {
			create_component(iconbase.$$.fragment);
		},
		m(target, anchor) {
			mount_component(iconbase, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const iconbase_changes = (dirty & /*$$props*/ 1)
			? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(/*$$props*/ ctx[0])])
			: {};

			if (dirty & /*$$scope*/ 2) {
				iconbase_changes.$$scope = { dirty, ctx };
			}

			iconbase.$set(iconbase_changes);
		},
		i(local) {
			if (current) return;
			transition_in(iconbase.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(iconbase.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(iconbase, detaching);
		}
	};
}

function instance$s($$self, $$props, $$invalidate) {
	$$self.$$set = $$new_props => {
		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
	};

	$$props = exclude_internal_props($$props);
	return [$$props];
}

class FaArrowAltCircleDown extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$s, create_fragment$s, safe_not_equal, {});
	}
}

/* src/client/debug/mcts/Action.svelte generated by Svelte v3.49.0 */

function add_css$k(target) {
	append_styles(target, "svelte-1a7time", "div.svelte-1a7time{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:500px}");
}

function create_fragment$t(ctx) {
	let div;
	let t;

	return {
		c() {
			div = element("div");
			t = text(/*text*/ ctx[0]);
			attr(div, "alt", /*text*/ ctx[0]);
			attr(div, "class", "svelte-1a7time");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, [dirty]) {
			if (dirty & /*text*/ 1) set_data(t, /*text*/ ctx[0]);

			if (dirty & /*text*/ 1) {
				attr(div, "alt", /*text*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$t($$self, $$props, $$invalidate) {
	let { action } = $$props;
	let text;

	$$self.$$set = $$props => {
		if ('action' in $$props) $$invalidate(1, action = $$props.action);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*action*/ 2) {
			 {
				const { type, args } = action.payload;
				const argsFormatted = (args || []).join(',');
				$$invalidate(0, text = `${type}(${argsFormatted})`);
			}
		}
	};

	return [text, action];
}

class Action extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$t, create_fragment$t, safe_not_equal, { action: 1 }, add_css$k);
	}
}

/* src/client/debug/mcts/Table.svelte generated by Svelte v3.49.0 */

function add_css$l(target) {
	append_styles(target, "svelte-ztcwsu", "table.svelte-ztcwsu.svelte-ztcwsu{font-size:12px;border-collapse:collapse;border:1px solid #ddd;padding:0}tr.svelte-ztcwsu.svelte-ztcwsu{cursor:pointer}tr.svelte-ztcwsu:hover td.svelte-ztcwsu{background:#eee}tr.selected.svelte-ztcwsu td.svelte-ztcwsu{background:#eee}td.svelte-ztcwsu.svelte-ztcwsu{padding:10px;height:10px;line-height:10px;font-size:12px;border:none}th.svelte-ztcwsu.svelte-ztcwsu{background:#888;color:#fff;padding:10px;text-align:center}");
}

function get_each_context$6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	child_ctx[12] = i;
	return child_ctx;
}

// (86:2) {#each children as child, i}
function create_each_block$6(ctx) {
	let tr;
	let td0;
	let t0_value = /*child*/ ctx[10].value + "";
	let t0;
	let t1;
	let td1;
	let t2_value = /*child*/ ctx[10].visits + "";
	let t2;
	let t3;
	let td2;
	let action;
	let t4;
	let current;
	let mounted;
	let dispose;

	action = new Action({
			props: { action: /*child*/ ctx[10].parentAction }
		});

	function click_handler() {
		return /*click_handler*/ ctx[6](/*child*/ ctx[10], /*i*/ ctx[12]);
	}

	function mouseout_handler() {
		return /*mouseout_handler*/ ctx[7](/*i*/ ctx[12]);
	}

	function mouseover_handler() {
		return /*mouseover_handler*/ ctx[8](/*child*/ ctx[10], /*i*/ ctx[12]);
	}

	return {
		c() {
			tr = element("tr");
			td0 = element("td");
			t0 = text(t0_value);
			t1 = space();
			td1 = element("td");
			t2 = text(t2_value);
			t3 = space();
			td2 = element("td");
			create_component(action.$$.fragment);
			t4 = space();
			attr(td0, "class", "svelte-ztcwsu");
			attr(td1, "class", "svelte-ztcwsu");
			attr(td2, "class", "svelte-ztcwsu");
			attr(tr, "class", "svelte-ztcwsu");
			toggle_class(tr, "clickable", /*children*/ ctx[1].length > 0);
			toggle_class(tr, "selected", /*i*/ ctx[12] === /*selectedIndex*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			append(tr, td0);
			append(td0, t0);
			append(tr, t1);
			append(tr, td1);
			append(td1, t2);
			append(tr, t3);
			append(tr, td2);
			mount_component(action, td2, null);
			append(tr, t4);
			current = true;

			if (!mounted) {
				dispose = [
					listen(tr, "click", click_handler),
					listen(tr, "mouseout", mouseout_handler),
					listen(tr, "mouseover", mouseover_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*children*/ 2) && t0_value !== (t0_value = /*child*/ ctx[10].value + "")) set_data(t0, t0_value);
			if ((!current || dirty & /*children*/ 2) && t2_value !== (t2_value = /*child*/ ctx[10].visits + "")) set_data(t2, t2_value);
			const action_changes = {};
			if (dirty & /*children*/ 2) action_changes.action = /*child*/ ctx[10].parentAction;
			action.$set(action_changes);

			if (dirty & /*children*/ 2) {
				toggle_class(tr, "clickable", /*children*/ ctx[1].length > 0);
			}

			if (dirty & /*selectedIndex*/ 1) {
				toggle_class(tr, "selected", /*i*/ ctx[12] === /*selectedIndex*/ ctx[0]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(action.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(action.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(tr);
			destroy_component(action);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$u(ctx) {
	let table;
	let thead;
	let t5;
	let tbody;
	let current;
	let each_value = /*children*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			table = element("table");
			thead = element("thead");

			thead.innerHTML = `<th class="svelte-ztcwsu">Value</th> 
    <th class="svelte-ztcwsu">Visits</th> 
    <th class="svelte-ztcwsu">Action</th>`;

			t5 = space();
			tbody = element("tbody");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(table, "class", "svelte-ztcwsu");
		},
		m(target, anchor) {
			insert(target, table, anchor);
			append(table, thead);
			append(table, t5);
			append(table, tbody);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tbody, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*children, selectedIndex, Select, Preview*/ 15) {
				each_value = /*children*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$6(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$6(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(tbody, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(table);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$u($$self, $$props, $$invalidate) {
	let { root } = $$props;
	let { selectedIndex = null } = $$props;
	const dispatch = createEventDispatcher();
	let parents = [];
	let children = [];

	function Select(node, i) {
		dispatch('select', { node, selectedIndex: i });
	}

	function Preview(node, i) {
		if (selectedIndex === null) {
			dispatch('preview', { node });
		}
	}

	const click_handler = (child, i) => Select(child, i);
	const mouseout_handler = i => Preview(null);
	const mouseover_handler = (child, i) => Preview(child);

	$$self.$$set = $$props => {
		if ('root' in $$props) $$invalidate(4, root = $$props.root);
		if ('selectedIndex' in $$props) $$invalidate(0, selectedIndex = $$props.selectedIndex);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*root, parents*/ 48) {
			 {
				let t = root;
				$$invalidate(5, parents = []);

				while (t.parent) {
					const parent = t.parent;
					const { type, args } = t.parentAction.payload;
					const argsFormatted = (args || []).join(',');
					const arrowText = `${type}(${argsFormatted})`;
					parents.push({ parent, arrowText });
					t = parent;
				}

				parents.reverse();
				$$invalidate(1, children = [...root.children].sort((a, b) => a.visits < b.visits ? 1 : -1).slice(0, 50));
			}
		}
	};

	return [
		selectedIndex,
		children,
		Select,
		Preview,
		root,
		parents,
		click_handler,
		mouseout_handler,
		mouseover_handler
	];
}

class Table extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$u, create_fragment$u, safe_not_equal, { root: 4, selectedIndex: 0 }, add_css$l);
	}
}

/* src/client/debug/mcts/MCTS.svelte generated by Svelte v3.49.0 */

function add_css$m(target) {
	append_styles(target, "svelte-1f0amz4", ".visualizer.svelte-1f0amz4{display:flex;flex-direction:column;align-items:center;padding:50px}.preview.svelte-1f0amz4{opacity:0.5}.icon.svelte-1f0amz4{color:#777;width:32px;height:32px;margin-bottom:20px}");
}

function get_each_context$7(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i].node;
	child_ctx[10] = list[i].selectedIndex;
	child_ctx[12] = i;
	return child_ctx;
}

// (50:4) {#if i !== 0}
function create_if_block_2$3(ctx) {
	let div;
	let arrow;
	let current;
	arrow = new FaArrowAltCircleDown({});

	return {
		c() {
			div = element("div");
			create_component(arrow.$$.fragment);
			attr(div, "class", "icon svelte-1f0amz4");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(arrow, div, null);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(arrow.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(arrow.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(arrow);
		}
	};
}

// (61:6) {:else}
function create_else_block$2(ctx) {
	let table;
	let current;

	function select_handler_1(...args) {
		return /*select_handler_1*/ ctx[7](/*i*/ ctx[12], ...args);
	}

	table = new Table({
			props: {
				root: /*node*/ ctx[9],
				selectedIndex: /*selectedIndex*/ ctx[10]
			}
		});

	table.$on("select", select_handler_1);

	return {
		c() {
			create_component(table.$$.fragment);
		},
		m(target, anchor) {
			mount_component(table, target, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const table_changes = {};
			if (dirty & /*nodes*/ 1) table_changes.root = /*node*/ ctx[9];
			if (dirty & /*nodes*/ 1) table_changes.selectedIndex = /*selectedIndex*/ ctx[10];
			table.$set(table_changes);
		},
		i(local) {
			if (current) return;
			transition_in(table.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(table.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(table, detaching);
		}
	};
}

// (57:6) {#if i === nodes.length - 1}
function create_if_block_1$3(ctx) {
	let table;
	let current;

	function select_handler(...args) {
		return /*select_handler*/ ctx[5](/*i*/ ctx[12], ...args);
	}

	function preview_handler(...args) {
		return /*preview_handler*/ ctx[6](/*i*/ ctx[12], ...args);
	}

	table = new Table({ props: { root: /*node*/ ctx[9] } });
	table.$on("select", select_handler);
	table.$on("preview", preview_handler);

	return {
		c() {
			create_component(table.$$.fragment);
		},
		m(target, anchor) {
			mount_component(table, target, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const table_changes = {};
			if (dirty & /*nodes*/ 1) table_changes.root = /*node*/ ctx[9];
			table.$set(table_changes);
		},
		i(local) {
			if (current) return;
			transition_in(table.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(table.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(table, detaching);
		}
	};
}

// (49:2) {#each nodes as { node, selectedIndex }
function create_each_block$7(ctx) {
	let t;
	let section;
	let current_block_type_index;
	let if_block1;
	let current;
	let if_block0 = /*i*/ ctx[12] !== 0 && create_if_block_2$3();
	const if_block_creators = [create_if_block_1$3, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*i*/ ctx[12] === /*nodes*/ ctx[0].length - 1) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t = space();
			section = element("section");
			if_block1.c();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t, anchor);
			insert(target, section, anchor);
			if_blocks[current_block_type_index].m(section, null);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				transition_in(if_block1, 1);
				if_block1.m(section, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t);
			if (detaching) detach(section);
			if_blocks[current_block_type_index].d();
		}
	};
}

// (69:2) {#if preview}
function create_if_block$a(ctx) {
	let div;
	let arrow;
	let t;
	let section;
	let table;
	let current;
	arrow = new FaArrowAltCircleDown({});
	table = new Table({ props: { root: /*preview*/ ctx[1] } });

	return {
		c() {
			div = element("div");
			create_component(arrow.$$.fragment);
			t = space();
			section = element("section");
			create_component(table.$$.fragment);
			attr(div, "class", "icon svelte-1f0amz4");
			attr(section, "class", "preview svelte-1f0amz4");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(arrow, div, null);
			insert(target, t, anchor);
			insert(target, section, anchor);
			mount_component(table, section, null);
			current = true;
		},
		p(ctx, dirty) {
			const table_changes = {};
			if (dirty & /*preview*/ 2) table_changes.root = /*preview*/ ctx[1];
			table.$set(table_changes);
		},
		i(local) {
			if (current) return;
			transition_in(arrow.$$.fragment, local);
			transition_in(table.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(arrow.$$.fragment, local);
			transition_out(table.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(arrow);
			if (detaching) detach(t);
			if (detaching) detach(section);
			destroy_component(table);
		}
	};
}

function create_fragment$v(ctx) {
	let div;
	let t;
	let current;
	let each_value = /*nodes*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block = /*preview*/ ctx[1] && create_if_block$a(ctx);

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			if (if_block) if_block.c();
			attr(div, "class", "visualizer svelte-1f0amz4");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			append(div, t);
			if (if_block) if_block.m(div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*nodes, SelectNode, PreviewNode*/ 13) {
				each_value = /*nodes*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$7(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$7(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, t);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (/*preview*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*preview*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$a(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(if_block);
			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
			if (if_block) if_block.d();
		}
	};
}

function instance$v($$self, $$props, $$invalidate) {
	let { metadata } = $$props;
	let nodes = [];
	let preview = null;

	function SelectNode({ node, selectedIndex }, i) {
		$$invalidate(1, preview = null);
		$$invalidate(0, nodes[i].selectedIndex = selectedIndex, nodes);
		$$invalidate(0, nodes = [...nodes.slice(0, i + 1), { node }]);
	}

	function PreviewNode({ node }, i) {
		$$invalidate(1, preview = node);
	}

	const select_handler = (i, e) => SelectNode(e.detail, i);
	const preview_handler = (i, e) => PreviewNode(e.detail);
	const select_handler_1 = (i, e) => SelectNode(e.detail, i);

	$$self.$$set = $$props => {
		if ('metadata' in $$props) $$invalidate(4, metadata = $$props.metadata);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*metadata*/ 16) {
			 {
				$$invalidate(0, nodes = [{ node: metadata }]);
			}
		}
	};

	return [
		nodes,
		preview,
		SelectNode,
		PreviewNode,
		metadata,
		select_handler,
		preview_handler,
		select_handler_1
	];
}

class MCTS extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$v, create_fragment$v, safe_not_equal, { metadata: 4 }, add_css$m);
	}
}

/* src/client/debug/log/Log.svelte generated by Svelte v3.49.0 */

function add_css$n(target) {
	append_styles(target, "svelte-1pq5e4b", ".gamelog.svelte-1pq5e4b{display:grid;grid-template-columns:30px 1fr 30px;grid-auto-rows:auto;grid-auto-flow:column}");
}

function get_each_context$8(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i].phase;
	child_ctx[18] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i].action;
	child_ctx[20] = list[i].metadata;
	child_ctx[18] = i;
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[22] = list[i].turn;
	child_ctx[18] = i;
	return child_ctx;
}

// (136:4) {#if i in turnBoundaries}
function create_if_block_1$4(ctx) {
	let turnmarker;
	let current;

	turnmarker = new TurnMarker({
			props: {
				turn: /*turn*/ ctx[22],
				numEvents: /*turnBoundaries*/ ctx[3][/*i*/ ctx[18]]
			}
		});

	return {
		c() {
			create_component(turnmarker.$$.fragment);
		},
		m(target, anchor) {
			mount_component(turnmarker, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const turnmarker_changes = {};
			if (dirty & /*renderedLogEntries*/ 2) turnmarker_changes.turn = /*turn*/ ctx[22];
			if (dirty & /*turnBoundaries*/ 8) turnmarker_changes.numEvents = /*turnBoundaries*/ ctx[3][/*i*/ ctx[18]];
			turnmarker.$set(turnmarker_changes);
		},
		i(local) {
			if (current) return;
			transition_in(turnmarker.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(turnmarker.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(turnmarker, detaching);
		}
	};
}

// (135:2) {#each renderedLogEntries as { turn }
function create_each_block_2(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*i*/ ctx[18] in /*turnBoundaries*/ ctx[3] && create_if_block_1$4(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*i*/ ctx[18] in /*turnBoundaries*/ ctx[3]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*turnBoundaries*/ 8) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1$4(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (141:2) {#each renderedLogEntries as { action, metadata }
function create_each_block_1(ctx) {
	let logevent;
	let current;

	logevent = new LogEvent({
			props: {
				pinned: /*i*/ ctx[18] === /*pinned*/ ctx[2],
				logIndex: /*i*/ ctx[18],
				action: /*action*/ ctx[19],
				metadata: /*metadata*/ ctx[20]
			}
		});

	logevent.$on("click", /*OnLogClick*/ ctx[5]);
	logevent.$on("mouseenter", /*OnMouseEnter*/ ctx[6]);
	logevent.$on("mouseleave", /*OnMouseLeave*/ ctx[7]);

	return {
		c() {
			create_component(logevent.$$.fragment);
		},
		m(target, anchor) {
			mount_component(logevent, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const logevent_changes = {};
			if (dirty & /*pinned*/ 4) logevent_changes.pinned = /*i*/ ctx[18] === /*pinned*/ ctx[2];
			if (dirty & /*renderedLogEntries*/ 2) logevent_changes.action = /*action*/ ctx[19];
			if (dirty & /*renderedLogEntries*/ 2) logevent_changes.metadata = /*metadata*/ ctx[20];
			logevent.$set(logevent_changes);
		},
		i(local) {
			if (current) return;
			transition_in(logevent.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(logevent.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(logevent, detaching);
		}
	};
}

// (153:4) {#if i in phaseBoundaries}
function create_if_block$b(ctx) {
	let phasemarker;
	let current;

	phasemarker = new PhaseMarker({
			props: {
				phase: /*phase*/ ctx[16],
				numEvents: /*phaseBoundaries*/ ctx[4][/*i*/ ctx[18]]
			}
		});

	return {
		c() {
			create_component(phasemarker.$$.fragment);
		},
		m(target, anchor) {
			mount_component(phasemarker, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const phasemarker_changes = {};
			if (dirty & /*renderedLogEntries*/ 2) phasemarker_changes.phase = /*phase*/ ctx[16];
			if (dirty & /*phaseBoundaries*/ 16) phasemarker_changes.numEvents = /*phaseBoundaries*/ ctx[4][/*i*/ ctx[18]];
			phasemarker.$set(phasemarker_changes);
		},
		i(local) {
			if (current) return;
			transition_in(phasemarker.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(phasemarker.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(phasemarker, detaching);
		}
	};
}

// (152:2) {#each renderedLogEntries as { phase }
function create_each_block$8(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*i*/ ctx[18] in /*phaseBoundaries*/ ctx[4] && create_if_block$b(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*i*/ ctx[18] in /*phaseBoundaries*/ ctx[4]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*phaseBoundaries*/ 16) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$b(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$w(ctx) {
	let div;
	let t0;
	let t1;
	let current;
	let mounted;
	let dispose;
	let each_value_2 = /*renderedLogEntries*/ ctx[1];
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	const out = i => transition_out(each_blocks_2[i], 1, 1, () => {
		each_blocks_2[i] = null;
	});

	let each_value_1 = /*renderedLogEntries*/ ctx[1];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out_1 = i => transition_out(each_blocks_1[i], 1, 1, () => {
		each_blocks_1[i] = null;
	});

	let each_value = /*renderedLogEntries*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
	}

	const out_2 = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			t0 = space();

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "gamelog svelte-1pq5e4b");
			toggle_class(div, "pinned", /*pinned*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].m(div, null);
			}

			append(div, t0);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div, null);
			}

			append(div, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen(window, "keydown", /*OnKeyDown*/ ctx[8]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*renderedLogEntries, turnBoundaries*/ 10) {
				each_value_2 = /*renderedLogEntries*/ ctx[1];
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
						transition_in(each_blocks_2[i], 1);
					} else {
						each_blocks_2[i] = create_each_block_2(child_ctx);
						each_blocks_2[i].c();
						transition_in(each_blocks_2[i], 1);
						each_blocks_2[i].m(div, t0);
					}
				}

				group_outros();

				for (i = each_value_2.length; i < each_blocks_2.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (dirty & /*pinned, renderedLogEntries, OnLogClick, OnMouseEnter, OnMouseLeave*/ 230) {
				each_value_1 = /*renderedLogEntries*/ ctx[1];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
						transition_in(each_blocks_1[i], 1);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						transition_in(each_blocks_1[i], 1);
						each_blocks_1[i].m(div, t1);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
					out_1(i);
				}

				check_outros();
			}

			if (dirty & /*renderedLogEntries, phaseBoundaries*/ 18) {
				each_value = /*renderedLogEntries*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$8(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$8(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out_2(i);
				}

				check_outros();
			}

			if (dirty & /*pinned*/ 4) {
				toggle_class(div, "pinned", /*pinned*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_2.length; i += 1) {
				transition_in(each_blocks_2[i]);
			}

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks_1[i]);
			}

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks_2 = each_blocks_2.filter(Boolean);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				transition_out(each_blocks_2[i]);
			}

			each_blocks_1 = each_blocks_1.filter(Boolean);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				transition_out(each_blocks_1[i]);
			}

			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks_2, detaching);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

function instance$w($$self, $$props, $$invalidate) {
	let $client,
		$$unsubscribe_client = noop,
		$$subscribe_client = () => ($$unsubscribe_client(), $$unsubscribe_client = subscribe(client, $$value => $$invalidate(10, $client = $$value)), client);

	$$self.$$.on_destroy.push(() => $$unsubscribe_client());
	let { client } = $$props;
	$$subscribe_client();
	const { secondaryPane } = getContext('secondaryPane');
	const reducer$1 = reducer.CreateGameReducer({ game: client.game });
	const initialState = client.getInitialState();
	let { log } = $client;
	let pinned = null;

	function rewind(logIndex) {
		let state = initialState;

		for (let i = 0; i < log.length; i++) {
			const { action, automatic } = log[i];

			if (!automatic) {
				state = reducer$1(state, action);

				if (logIndex == 0) {
					break;
				}

				logIndex--;
			}
		}

		return {
			G: state.G,
			ctx: state.ctx,
			plugins: state.plugins
		};
	}

	function OnLogClick(e) {
		const { logIndex } = e.detail;
		const state = rewind(logIndex);
		const renderedLogEntries = log.filter(e => !e.automatic);
		client.overrideGameState(state);

		if (pinned == logIndex) {
			$$invalidate(2, pinned = null);
			secondaryPane.set(null);
		} else {
			$$invalidate(2, pinned = logIndex);
			const { metadata } = renderedLogEntries[logIndex].action.payload;

			if (metadata) {
				secondaryPane.set({ component: MCTS, metadata });
			}
		}
	}

	function OnMouseEnter(e) {
		const { logIndex } = e.detail;

		if (pinned === null) {
			const state = rewind(logIndex);
			client.overrideGameState(state);
		}
	}

	function OnMouseLeave() {
		if (pinned === null) {
			client.overrideGameState(null);
		}
	}

	function Reset() {
		$$invalidate(2, pinned = null);
		client.overrideGameState(null);
		secondaryPane.set(null);
	}

	onDestroy(Reset);

	function OnKeyDown(e) {
		// ESC.
		if (e.keyCode == 27) {
			Reset();
		}
	}

	let renderedLogEntries;
	let turnBoundaries = {};
	let phaseBoundaries = {};

	$$self.$$set = $$props => {
		if ('client' in $$props) $$subscribe_client($$invalidate(0, client = $$props.client));
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$client, log, renderedLogEntries*/ 1538) {
			 {
				$$invalidate(9, log = $client.log);
				$$invalidate(1, renderedLogEntries = log.filter(e => !e.automatic));
				let eventsInCurrentPhase = 0;
				let eventsInCurrentTurn = 0;
				$$invalidate(3, turnBoundaries = {});
				$$invalidate(4, phaseBoundaries = {});

				for (let i = 0; i < renderedLogEntries.length; i++) {
					const { action, payload, turn, phase } = renderedLogEntries[i];
					eventsInCurrentTurn++;
					eventsInCurrentPhase++;

					if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].turn != turn) {
						$$invalidate(3, turnBoundaries[i] = eventsInCurrentTurn, turnBoundaries);
						eventsInCurrentTurn = 0;
					}

					if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].phase != phase) {
						$$invalidate(4, phaseBoundaries[i] = eventsInCurrentPhase, phaseBoundaries);
						eventsInCurrentPhase = 0;
					}
				}
			}
		}
	};

	return [
		client,
		renderedLogEntries,
		pinned,
		turnBoundaries,
		phaseBoundaries,
		OnLogClick,
		OnMouseEnter,
		OnMouseLeave,
		OnKeyDown,
		log,
		$client
	];
}

class Log extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$w, create_fragment$w, safe_not_equal, { client: 0 }, add_css$n);
	}
}

/* src/client/debug/ai/Options.svelte generated by Svelte v3.49.0 */

function add_css$o(target) {
	append_styles(target, "svelte-1fu900w", "label.svelte-1fu900w{color:#666}.option.svelte-1fu900w{margin-bottom:20px}.value.svelte-1fu900w{font-weight:bold;color:#000}input[type='checkbox'].svelte-1fu900w{vertical-align:middle}");
}

function get_each_context$9(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i][0];
	child_ctx[7] = list[i][1];
	child_ctx[8] = list;
	child_ctx[9] = i;
	return child_ctx;
}

// (44:47) 
function create_if_block_1$5(ctx) {
	let input;
	let input_id_value;
	let mounted;
	let dispose;

	function input_change_handler() {
		/*input_change_handler*/ ctx[5].call(input, /*key*/ ctx[6]);
	}

	return {
		c() {
			input = element("input");
			attr(input, "id", input_id_value = /*makeID*/ ctx[3](/*key*/ ctx[6]));
			attr(input, "type", "checkbox");
			attr(input, "class", "svelte-1fu900w");
		},
		m(target, anchor) {
			insert(target, input, anchor);
			input.checked = /*values*/ ctx[1][/*key*/ ctx[6]];

			if (!mounted) {
				dispose = [
					listen(input, "change", input_change_handler),
					listen(input, "change", /*OnChange*/ ctx[2])
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*bot*/ 1 && input_id_value !== (input_id_value = /*makeID*/ ctx[3](/*key*/ ctx[6]))) {
				attr(input, "id", input_id_value);
			}

			if (dirty & /*values, Object, bot*/ 3) {
				input.checked = /*values*/ ctx[1][/*key*/ ctx[6]];
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (41:4) {#if value.range}
function create_if_block$c(ctx) {
	let span;
	let t0_value = /*values*/ ctx[1][/*key*/ ctx[6]] + "";
	let t0;
	let t1;
	let input;
	let input_id_value;
	let input_min_value;
	let input_max_value;
	let mounted;
	let dispose;

	function input_change_input_handler() {
		/*input_change_input_handler*/ ctx[4].call(input, /*key*/ ctx[6]);
	}

	return {
		c() {
			span = element("span");
			t0 = text(t0_value);
			t1 = space();
			input = element("input");
			attr(span, "class", "value svelte-1fu900w");
			attr(input, "id", input_id_value = /*makeID*/ ctx[3](/*key*/ ctx[6]));
			attr(input, "type", "range");
			attr(input, "min", input_min_value = /*value*/ ctx[7].range.min);
			attr(input, "max", input_max_value = /*value*/ ctx[7].range.max);
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t0);
			insert(target, t1, anchor);
			insert(target, input, anchor);
			set_input_value(input, /*values*/ ctx[1][/*key*/ ctx[6]]);

			if (!mounted) {
				dispose = [
					listen(input, "change", input_change_input_handler),
					listen(input, "input", input_change_input_handler),
					listen(input, "change", /*OnChange*/ ctx[2])
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*values, bot*/ 3 && t0_value !== (t0_value = /*values*/ ctx[1][/*key*/ ctx[6]] + "")) set_data(t0, t0_value);

			if (dirty & /*bot*/ 1 && input_id_value !== (input_id_value = /*makeID*/ ctx[3](/*key*/ ctx[6]))) {
				attr(input, "id", input_id_value);
			}

			if (dirty & /*bot*/ 1 && input_min_value !== (input_min_value = /*value*/ ctx[7].range.min)) {
				attr(input, "min", input_min_value);
			}

			if (dirty & /*bot*/ 1 && input_max_value !== (input_max_value = /*value*/ ctx[7].range.max)) {
				attr(input, "max", input_max_value);
			}

			if (dirty & /*values, Object, bot*/ 3) {
				set_input_value(input, /*values*/ ctx[1][/*key*/ ctx[6]]);
			}
		},
		d(detaching) {
			if (detaching) detach(span);
			if (detaching) detach(t1);
			if (detaching) detach(input);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (37:0) {#each Object.entries(bot.opts()) as [key, value]}
function create_each_block$9(ctx) {
	let div;
	let label;
	let t0_value = /*key*/ ctx[6] + "";
	let t0;
	let label_for_value;
	let t1;
	let t2;

	function select_block_type(ctx, dirty) {
		if (/*value*/ ctx[7].range) return create_if_block$c;
		if (typeof /*value*/ ctx[7].value === 'boolean') return create_if_block_1$5;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type && current_block_type(ctx);

	return {
		c() {
			div = element("div");
			label = element("label");
			t0 = text(t0_value);
			t1 = space();
			if (if_block) if_block.c();
			t2 = space();
			attr(label, "for", label_for_value = /*makeID*/ ctx[3](/*key*/ ctx[6]));
			attr(label, "class", "svelte-1fu900w");
			attr(div, "class", "option svelte-1fu900w");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, label);
			append(label, t0);
			append(div, t1);
			if (if_block) if_block.m(div, null);
			append(div, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*bot*/ 1 && t0_value !== (t0_value = /*key*/ ctx[6] + "")) set_data(t0, t0_value);

			if (dirty & /*bot*/ 1 && label_for_value !== (label_for_value = /*makeID*/ ctx[3](/*key*/ ctx[6]))) {
				attr(label, "for", label_for_value);
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if (if_block) if_block.d(1);
				if_block = current_block_type && current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, t2);
				}
			}
		},
		d(detaching) {
			if (detaching) detach(div);

			if (if_block) {
				if_block.d();
			}
		}
	};
}

function create_fragment$x(ctx) {
	let each_1_anchor;
	let each_value = Object.entries(/*bot*/ ctx[0].opts());
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*makeID, Object, bot, values, OnChange*/ 15) {
				each_value = Object.entries(/*bot*/ ctx[0].opts());
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$9(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$9(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function instance$x($$self, $$props, $$invalidate) {
	let { bot } = $$props;
	let values = {};

	for (let [key, value] of Object.entries(bot.opts())) {
		values[key] = value.value;
	}

	function OnChange() {
		for (let [key, value] of Object.entries(values)) {
			bot.setOpt(key, value);
		}
	}

	const makeID = key => 'ai-option-' + key;

	function input_change_input_handler(key) {
		values[key] = to_number(this.value);
		$$invalidate(1, values);
	}

	function input_change_handler(key) {
		values[key] = this.checked;
		$$invalidate(1, values);
	}

	$$self.$$set = $$props => {
		if ('bot' in $$props) $$invalidate(0, bot = $$props.bot);
	};

	return [
		bot,
		values,
		OnChange,
		makeID,
		input_change_input_handler,
		input_change_handler
	];
}

class Options extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$x, create_fragment$x, safe_not_equal, { bot: 0 }, add_css$o);
	}
}

/* src/client/debug/ai/AI.svelte generated by Svelte v3.49.0 */

function add_css$p(target) {
	append_styles(target, "svelte-fn09gm", "ul.svelte-fn09gm{padding-left:0}li.svelte-fn09gm{list-style:none;margin:0;margin-bottom:5px}h3.svelte-fn09gm{text-transform:uppercase}label.svelte-fn09gm{color:#666}input[type='checkbox'].svelte-fn09gm{vertical-align:middle}");
}

function get_each_context$a(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

// (202:4) {:else}
function create_else_block$3(ctx) {
	let p0;
	let t1;
	let p1;

	return {
		c() {
			p0 = element("p");
			p0.textContent = "No bots available.";
			t1 = space();
			p1 = element("p");

			p1.innerHTML = `Follow the instructions
        <a href="https://boardgame.io/documentation/#/tutorial?id=bots" target="_blank">here</a>
        to set up bots.`;
		},
		m(target, anchor) {
			insert(target, p0, anchor);
			insert(target, t1, anchor);
			insert(target, p1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(p0);
			if (detaching) detach(t1);
			if (detaching) detach(p1);
		}
	};
}

// (200:4) {#if client.multiplayer}
function create_if_block_5(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "The bot debugger is only available in singleplayer mode.";
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (150:2) {#if client.game.ai && !client.multiplayer}
function create_if_block$d(ctx) {
	let section0;
	let h30;
	let t1;
	let ul;
	let li0;
	let hotkey0;
	let t2;
	let li1;
	let hotkey1;
	let t3;
	let li2;
	let hotkey2;
	let t4;
	let section1;
	let h31;
	let t6;
	let select;
	let t7;
	let show_if = Object.keys(/*bot*/ ctx[7].opts()).length;
	let t8;
	let if_block1_anchor;
	let current;
	let mounted;
	let dispose;

	hotkey0 = new Hotkey({
			props: {
				value: "1",
				onPress: /*Reset*/ ctx[13],
				label: "reset"
			}
		});

	hotkey1 = new Hotkey({
			props: {
				value: "2",
				onPress: /*Step*/ ctx[11],
				label: "play"
			}
		});

	hotkey2 = new Hotkey({
			props: {
				value: "3",
				onPress: /*Simulate*/ ctx[12],
				label: "simulate"
			}
		});

	let each_value = Object.keys(/*bots*/ ctx[8]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$a(get_each_context$a(ctx, each_value, i));
	}

	let if_block0 = show_if && create_if_block_4(ctx);
	let if_block1 = (/*botAction*/ ctx[5] || /*iterationCounter*/ ctx[3]) && create_if_block_1$6(ctx);

	return {
		c() {
			section0 = element("section");
			h30 = element("h3");
			h30.textContent = "Controls";
			t1 = space();
			ul = element("ul");
			li0 = element("li");
			create_component(hotkey0.$$.fragment);
			t2 = space();
			li1 = element("li");
			create_component(hotkey1.$$.fragment);
			t3 = space();
			li2 = element("li");
			create_component(hotkey2.$$.fragment);
			t4 = space();
			section1 = element("section");
			h31 = element("h3");
			h31.textContent = "Bot";
			t6 = space();
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t7 = space();
			if (if_block0) if_block0.c();
			t8 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr(h30, "class", "svelte-fn09gm");
			attr(li0, "class", "svelte-fn09gm");
			attr(li1, "class", "svelte-fn09gm");
			attr(li2, "class", "svelte-fn09gm");
			attr(ul, "class", "svelte-fn09gm");
			attr(h31, "class", "svelte-fn09gm");
			if (/*selectedBot*/ ctx[4] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[17].call(select));
		},
		m(target, anchor) {
			insert(target, section0, anchor);
			append(section0, h30);
			append(section0, t1);
			append(section0, ul);
			append(ul, li0);
			mount_component(hotkey0, li0, null);
			append(ul, t2);
			append(ul, li1);
			mount_component(hotkey1, li1, null);
			append(ul, t3);
			append(ul, li2);
			mount_component(hotkey2, li2, null);
			insert(target, t4, anchor);
			insert(target, section1, anchor);
			append(section1, h31);
			append(section1, t6);
			append(section1, select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			select_option(select, /*selectedBot*/ ctx[4]);
			insert(target, t7, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t8, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					listen(select, "change", /*select_change_handler*/ ctx[17]),
					listen(select, "change", /*ChangeBot*/ ctx[10])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*Object, bots*/ 256) {
				each_value = Object.keys(/*bots*/ ctx[8]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$a(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$a(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*selectedBot, Object, bots*/ 272) {
				select_option(select, /*selectedBot*/ ctx[4]);
			}

			if (dirty & /*bot*/ 128) show_if = Object.keys(/*bot*/ ctx[7].opts()).length;

			if (show_if) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*bot*/ 128) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t8.parentNode, t8);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*botAction*/ ctx[5] || /*iterationCounter*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1$6(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(hotkey0.$$.fragment, local);
			transition_in(hotkey1.$$.fragment, local);
			transition_in(hotkey2.$$.fragment, local);
			transition_in(if_block0);
			current = true;
		},
		o(local) {
			transition_out(hotkey0.$$.fragment, local);
			transition_out(hotkey1.$$.fragment, local);
			transition_out(hotkey2.$$.fragment, local);
			transition_out(if_block0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section0);
			destroy_component(hotkey0);
			destroy_component(hotkey1);
			destroy_component(hotkey2);
			if (detaching) detach(t4);
			if (detaching) detach(section1);
			destroy_each(each_blocks, detaching);
			if (detaching) detach(t7);
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t8);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (169:8) {#each Object.keys(bots) as bot}
function create_each_block$a(ctx) {
	let option;
	let t_value = /*bot*/ ctx[7] + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = option_value_value = /*bot*/ ctx[7];
			option.value = option.__value;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (175:4) {#if Object.keys(bot.opts()).length}
function create_if_block_4(ctx) {
	let section;
	let h3;
	let t1;
	let label;
	let t3;
	let input;
	let t4;
	let options;
	let current;
	let mounted;
	let dispose;
	options = new Options({ props: { bot: /*bot*/ ctx[7] } });

	return {
		c() {
			section = element("section");
			h3 = element("h3");
			h3.textContent = "Options";
			t1 = space();
			label = element("label");
			label.textContent = "debug";
			t3 = space();
			input = element("input");
			t4 = space();
			create_component(options.$$.fragment);
			attr(h3, "class", "svelte-fn09gm");
			attr(label, "for", "ai-option-debug");
			attr(label, "class", "svelte-fn09gm");
			attr(input, "id", "ai-option-debug");
			attr(input, "type", "checkbox");
			attr(input, "class", "svelte-fn09gm");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, h3);
			append(section, t1);
			append(section, label);
			append(section, t3);
			append(section, input);
			input.checked = /*debug*/ ctx[1];
			append(section, t4);
			mount_component(options, section, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "change", /*input_change_handler*/ ctx[18]),
					listen(input, "change", /*OnDebug*/ ctx[9])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*debug*/ 2) {
				input.checked = /*debug*/ ctx[1];
			}

			const options_changes = {};
			if (dirty & /*bot*/ 128) options_changes.bot = /*bot*/ ctx[7];
			options.$set(options_changes);
		},
		i(local) {
			if (current) return;
			transition_in(options.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(options.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section);
			destroy_component(options);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (184:4) {#if botAction || iterationCounter}
function create_if_block_1$6(ctx) {
	let section;
	let h3;
	let t1;
	let t2;
	let if_block0 = /*progress*/ ctx[2] && /*progress*/ ctx[2] < 1.0 && create_if_block_3$1(ctx);
	let if_block1 = /*botAction*/ ctx[5] && create_if_block_2$4(ctx);

	return {
		c() {
			section = element("section");
			h3 = element("h3");
			h3.textContent = "Result";
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			attr(h3, "class", "svelte-fn09gm");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, h3);
			append(section, t1);
			if (if_block0) if_block0.m(section, null);
			append(section, t2);
			if (if_block1) if_block1.m(section, null);
		},
		p(ctx, dirty) {
			if (/*progress*/ ctx[2] && /*progress*/ ctx[2] < 1.0) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_3$1(ctx);
					if_block0.c();
					if_block0.m(section, t2);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*botAction*/ ctx[5]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2$4(ctx);
					if_block1.c();
					if_block1.m(section, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		d(detaching) {
			if (detaching) detach(section);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

// (187:6) {#if progress && progress < 1.0}
function create_if_block_3$1(ctx) {
	let progress_1;

	return {
		c() {
			progress_1 = element("progress");
			progress_1.value = /*progress*/ ctx[2];
		},
		m(target, anchor) {
			insert(target, progress_1, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*progress*/ 4) {
				progress_1.value = /*progress*/ ctx[2];
			}
		},
		d(detaching) {
			if (detaching) detach(progress_1);
		}
	};
}

// (191:6) {#if botAction}
function create_if_block_2$4(ctx) {
	let ul;
	let li0;
	let t0;
	let t1;
	let t2;
	let li1;
	let t3;
	let t4_value = JSON.stringify(/*botActionArgs*/ ctx[6]) + "";
	let t4;

	return {
		c() {
			ul = element("ul");
			li0 = element("li");
			t0 = text("Action: ");
			t1 = text(/*botAction*/ ctx[5]);
			t2 = space();
			li1 = element("li");
			t3 = text("Args: ");
			t4 = text(t4_value);
			attr(li0, "class", "svelte-fn09gm");
			attr(li1, "class", "svelte-fn09gm");
			attr(ul, "class", "svelte-fn09gm");
		},
		m(target, anchor) {
			insert(target, ul, anchor);
			append(ul, li0);
			append(li0, t0);
			append(li0, t1);
			append(ul, t2);
			append(ul, li1);
			append(li1, t3);
			append(li1, t4);
		},
		p(ctx, dirty) {
			if (dirty & /*botAction*/ 32) set_data(t1, /*botAction*/ ctx[5]);
			if (dirty & /*botActionArgs*/ 64 && t4_value !== (t4_value = JSON.stringify(/*botActionArgs*/ ctx[6]) + "")) set_data(t4, t4_value);
		},
		d(detaching) {
			if (detaching) detach(ul);
		}
	};
}

function create_fragment$y(ctx) {
	let section;
	let current_block_type_index;
	let if_block;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block$d, create_if_block_5, create_else_block$3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*client*/ ctx[0].game.ai && !/*client*/ ctx[0].multiplayer) return 0;
		if (/*client*/ ctx[0].multiplayer) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			section = element("section");
			if_block.c();
		},
		m(target, anchor) {
			insert(target, section, anchor);
			if_blocks[current_block_type_index].m(section, null);
			current = true;

			if (!mounted) {
				dispose = listen(window, "keydown", /*OnKeyDown*/ ctx[14]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(section, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section);
			if_blocks[current_block_type_index].d();
			mounted = false;
			dispose();
		}
	};
}

function instance$y($$self, $$props, $$invalidate) {
	let { client } = $$props;
	let { clientManager } = $$props;
	let { ToggleVisibility } = $$props;
	const { secondaryPane } = getContext('secondaryPane');
	const bots = { 'MCTS': ai.MCTSBot, 'Random': ai.RandomBot };
	let debug = false;
	let progress = null;
	let iterationCounter = 0;
	let metadata = null;

	const iterationCallback = ({ iterationCounter: c, numIterations, metadata: m }) => {
		$$invalidate(3, iterationCounter = c);
		$$invalidate(2, progress = c / numIterations);
		metadata = m;

		if (debug && metadata) {
			secondaryPane.set({ component: MCTS, metadata });
		}
	};

	function OnDebug() {
		if (debug && metadata) {
			secondaryPane.set({ component: MCTS, metadata });
		} else {
			secondaryPane.set(null);
		}
	}

	let bot;

	if (client.game.ai) {
		bot = new ai.MCTSBot({
				game: client.game,
				enumerate: client.game.ai.enumerate,
				iterationCallback
			});

		bot.setOpt('async', true);
	}

	let selectedBot;
	let botAction;
	let botActionArgs;

	function ChangeBot() {
		const botConstructor = bots[selectedBot];

		$$invalidate(7, bot = new botConstructor({
				game: client.game,
				enumerate: client.game.ai.enumerate,
				iterationCallback
			}));

		bot.setOpt('async', true);
		$$invalidate(5, botAction = null);
		metadata = null;
		secondaryPane.set(null);
		$$invalidate(3, iterationCounter = 0);
	}

	async function Step() {
		$$invalidate(5, botAction = null);
		metadata = null;
		$$invalidate(3, iterationCounter = 0);
		const t = await ai.Step(client, bot);

		if (t) {
			$$invalidate(5, botAction = t.payload.type);
			$$invalidate(6, botActionArgs = t.payload.args);
		}
	}

	function Simulate(iterations = 10000, sleepTimeout = 100) {
		$$invalidate(5, botAction = null);
		metadata = null;
		$$invalidate(3, iterationCounter = 0);

		const step = async () => {
			for (let i = 0; i < iterations; i++) {
				const action = await ai.Step(client, bot);
				if (!action) break;
				await new Promise(resolve => setTimeout(resolve, sleepTimeout));
			}
		};

		return step();
	}

	function Exit() {
		client.overrideGameState(null);
		secondaryPane.set(null);
		$$invalidate(1, debug = false);
	}

	function Reset() {
		client.reset();
		$$invalidate(5, botAction = null);
		metadata = null;
		$$invalidate(3, iterationCounter = 0);
		Exit();
	}

	function OnKeyDown(e) {
		// ESC.
		if (e.keyCode == 27) {
			Exit();
		}
	}

	onDestroy(Exit);

	function select_change_handler() {
		selectedBot = select_value(this);
		$$invalidate(4, selectedBot);
		$$invalidate(8, bots);
	}

	function input_change_handler() {
		debug = this.checked;
		$$invalidate(1, debug);
	}

	$$self.$$set = $$props => {
		if ('client' in $$props) $$invalidate(0, client = $$props.client);
		if ('clientManager' in $$props) $$invalidate(15, clientManager = $$props.clientManager);
		if ('ToggleVisibility' in $$props) $$invalidate(16, ToggleVisibility = $$props.ToggleVisibility);
	};

	return [
		client,
		debug,
		progress,
		iterationCounter,
		selectedBot,
		botAction,
		botActionArgs,
		bot,
		bots,
		OnDebug,
		ChangeBot,
		Step,
		Simulate,
		Reset,
		OnKeyDown,
		clientManager,
		ToggleVisibility,
		select_change_handler,
		input_change_handler
	];
}

class AI extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$y,
			create_fragment$y,
			safe_not_equal,
			{
				client: 0,
				clientManager: 15,
				ToggleVisibility: 16
			},
			add_css$p
		);
	}
}

/* src/client/debug/Debug.svelte generated by Svelte v3.49.0 */

function add_css$q(target) {
	append_styles(target, "svelte-8ymctk", ".debug-panel.svelte-8ymctk.svelte-8ymctk{position:fixed;color:#555;font-family:monospace;right:0;top:0;height:100%;font-size:14px;opacity:0.9;z-index:99999}.panel.svelte-8ymctk.svelte-8ymctk{display:flex;position:relative;flex-direction:row;height:100%}.visibility-toggle.svelte-8ymctk.svelte-8ymctk{position:absolute;box-sizing:border-box;top:7px;border:1px solid #ccc;border-radius:5px;width:48px;height:48px;padding:8px;background:white;color:#555;box-shadow:0 0 5px rgba(0, 0, 0, 0.2)}.visibility-toggle.svelte-8ymctk.svelte-8ymctk:hover,.visibility-toggle.svelte-8ymctk.svelte-8ymctk:focus{background:#eee}.opener.svelte-8ymctk.svelte-8ymctk{right:10px}.closer.svelte-8ymctk.svelte-8ymctk{left:-326px}@keyframes svelte-8ymctk-rotateFromZero{from{transform:rotateZ(0deg)}to{transform:rotateZ(180deg)}}.icon.svelte-8ymctk.svelte-8ymctk{display:flex;height:100%;animation:svelte-8ymctk-rotateFromZero 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s 1\n      normal forwards}.closer.svelte-8ymctk .icon.svelte-8ymctk{animation-direction:reverse}.pane.svelte-8ymctk.svelte-8ymctk{flex-grow:2;overflow-x:hidden;overflow-y:scroll;background:#fefefe;padding:20px;border-left:1px solid #ccc;box-shadow:-1px 0 5px rgba(0, 0, 0, 0.2);box-sizing:border-box;width:280px}.secondary-pane.svelte-8ymctk.svelte-8ymctk{background:#fefefe;overflow-y:scroll}.debug-panel.svelte-8ymctk button,.debug-panel.svelte-8ymctk select{cursor:pointer;font-size:14px;font-family:monospace}.debug-panel.svelte-8ymctk select{background:#eee;border:1px solid #bbb;color:#555;padding:3px;border-radius:3px}.debug-panel.svelte-8ymctk section{margin-bottom:20px}.debug-panel.svelte-8ymctk .screen-reader-only{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}");
}

// (199:2) {:else}
function create_else_block$4(ctx) {
	let div1;
	let t0;
	let menu;
	let t1;
	let div0;
	let switch_instance;
	let t2;
	let div1_transition;
	let current;
	let if_block0 = /*showToggleButton*/ ctx[10] && create_if_block_3$2(ctx);

	menu = new Menu({
			props: {
				panes: /*panes*/ ctx[6],
				pane: /*pane*/ ctx[2]
			}
		});

	menu.$on("change", /*MenuChange*/ ctx[8]);
	var switch_value = /*panes*/ ctx[6][/*pane*/ ctx[2]].component;

	function switch_props(ctx) {
		return {
			props: {
				client: /*client*/ ctx[4],
				clientManager: /*clientManager*/ ctx[0],
				ToggleVisibility: /*ToggleVisibility*/ ctx[9]
			}
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	let if_block1 = /*$secondaryPane*/ ctx[5] && create_if_block_2$5(ctx);

	return {
		c() {
			div1 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			create_component(menu.$$.fragment);
			t1 = space();
			div0 = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			t2 = space();
			if (if_block1) if_block1.c();
			attr(div0, "class", "pane svelte-8ymctk");
			attr(div0, "role", "region");
			attr(div0, "aria-label", /*pane*/ ctx[2]);
			attr(div0, "tabindex", "-1");
			attr(div1, "class", "panel svelte-8ymctk");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			if (if_block0) if_block0.m(div1, null);
			append(div1, t0);
			mount_component(menu, div1, null);
			append(div1, t1);
			append(div1, div0);

			if (switch_instance) {
				mount_component(switch_instance, div0, null);
			}

			/*div0_binding*/ ctx[16](div0);
			append(div1, t2);
			if (if_block1) if_block1.m(div1, null);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (/*showToggleButton*/ ctx[10]) if_block0.p(ctx, dirty);
			const menu_changes = {};
			if (dirty & /*pane*/ 4) menu_changes.pane = /*pane*/ ctx[2];
			menu.$set(menu_changes);
			const switch_instance_changes = {};
			if (dirty & /*client*/ 16) switch_instance_changes.client = /*client*/ ctx[4];
			if (dirty & /*clientManager*/ 1) switch_instance_changes.clientManager = /*clientManager*/ ctx[0];

			if (switch_value !== (switch_value = /*panes*/ ctx[6][/*pane*/ ctx[2]].component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div0, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}

			if (!current || dirty & /*pane*/ 4) {
				attr(div0, "aria-label", /*pane*/ ctx[2]);
			}

			if (/*$secondaryPane*/ ctx[5]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*$secondaryPane*/ 32) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_2$5(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(menu.$$.fragment, local);
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			transition_in(if_block1);

			add_render_callback(() => {
				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, { x: 400, .../*transitionOpts*/ ctx[12] }, true);
				div1_transition.run(1);
			});

			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(menu.$$.fragment, local);
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			transition_out(if_block1);
			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, { x: 400, .../*transitionOpts*/ ctx[12] }, false);
			div1_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (if_block0) if_block0.d();
			destroy_component(menu);
			if (switch_instance) destroy_component(switch_instance);
			/*div0_binding*/ ctx[16](null);
			if (if_block1) if_block1.d();
			if (detaching && div1_transition) div1_transition.end();
		}
	};
}

// (185:2) {#if !visible}
function create_if_block$e(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*showToggleButton*/ ctx[10] && create_if_block_1$7(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*showToggleButton*/ ctx[10]) if_block.p(ctx, dirty);
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (201:6) {#if showToggleButton}
function create_if_block_3$2(ctx) {
	let button;
	let span;
	let chevron;
	let button_intro;
	let button_outro;
	let current;
	let mounted;
	let dispose;
	chevron = new FaChevronRight({});

	return {
		c() {
			button = element("button");
			span = element("span");
			create_component(chevron.$$.fragment);
			attr(span, "class", "icon svelte-8ymctk");
			attr(span, "aria-hidden", "true");
			attr(button, "class", "visibility-toggle closer svelte-8ymctk");
			attr(button, "title", "Hide Debug Panel");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, span);
			mount_component(chevron, span, null);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*ToggleVisibility*/ ctx[9]);
				mounted = true;
			}
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(chevron.$$.fragment, local);

			add_render_callback(() => {
				if (button_outro) button_outro.end(1);
				button_intro = create_in_transition(button, /*receive*/ ctx[14], { key: 'toggle' });
				button_intro.start();
			});

			current = true;
		},
		o(local) {
			transition_out(chevron.$$.fragment, local);
			if (button_intro) button_intro.invalidate();
			button_outro = create_out_transition(button, /*send*/ ctx[13], { key: 'toggle' });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			destroy_component(chevron);
			if (detaching && button_outro) button_outro.end();
			mounted = false;
			dispose();
		}
	};
}

// (229:6) {#if $secondaryPane}
function create_if_block_2$5(ctx) {
	let div;
	let switch_instance;
	let current;
	var switch_value = /*$secondaryPane*/ ctx[5].component;

	function switch_props(ctx) {
		return {
			props: {
				metadata: /*$secondaryPane*/ ctx[5].metadata
			}
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	return {
		c() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr(div, "class", "secondary-pane svelte-8ymctk");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty & /*$secondaryPane*/ 32) switch_instance_changes.metadata = /*$secondaryPane*/ ctx[5].metadata;

			if (switch_value !== (switch_value = /*$secondaryPane*/ ctx[5].component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (switch_instance) destroy_component(switch_instance);
		}
	};
}

// (186:4) {#if showToggleButton}
function create_if_block_1$7(ctx) {
	let button;
	let span;
	let chevron;
	let button_intro;
	let button_outro;
	let current;
	let mounted;
	let dispose;
	chevron = new FaChevronRight({});

	return {
		c() {
			button = element("button");
			span = element("span");
			create_component(chevron.$$.fragment);
			attr(span, "class", "icon svelte-8ymctk");
			attr(span, "aria-hidden", "true");
			attr(button, "class", "visibility-toggle opener svelte-8ymctk");
			attr(button, "title", "Show Debug Panel");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, span);
			mount_component(chevron, span, null);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*ToggleVisibility*/ ctx[9]);
				mounted = true;
			}
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(chevron.$$.fragment, local);

			add_render_callback(() => {
				if (button_outro) button_outro.end(1);
				button_intro = create_in_transition(button, /*receive*/ ctx[14], { key: 'toggle' });
				button_intro.start();
			});

			current = true;
		},
		o(local) {
			transition_out(chevron.$$.fragment, local);
			if (button_intro) button_intro.invalidate();
			button_outro = create_out_transition(button, /*send*/ ctx[13], { key: 'toggle' });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			destroy_component(chevron);
			if (detaching && button_outro) button_outro.end();
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$z(ctx) {
	let section;
	let current_block_type_index;
	let if_block;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block$e, create_else_block$4];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!/*visible*/ ctx[3]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			section = element("section");
			if_block.c();
			attr(section, "aria-label", "boardgame.io Debug Panel");
			attr(section, "class", "debug-panel svelte-8ymctk");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			if_blocks[current_block_type_index].m(section, null);
			current = true;

			if (!mounted) {
				dispose = listen(window, "keypress", /*Keypress*/ ctx[11]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(section, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section);
			if_blocks[current_block_type_index].d();
			mounted = false;
			dispose();
		}
	};
}

function instance$z($$self, $$props, $$invalidate) {
	let client;

	let $clientManager,
		$$unsubscribe_clientManager = noop,
		$$subscribe_clientManager = () => ($$unsubscribe_clientManager(), $$unsubscribe_clientManager = subscribe(clientManager, $$value => $$invalidate(15, $clientManager = $$value)), clientManager);

	let $secondaryPane;
	$$self.$$.on_destroy.push(() => $$unsubscribe_clientManager());
	let { clientManager } = $$props;
	$$subscribe_clientManager();

	const panes = {
		main: {
			label: 'Main',
			shortcut: 'm',
			component: Main
		},
		log: {
			label: 'Log',
			shortcut: 'l',
			component: Log
		},
		info: {
			label: 'Info',
			shortcut: 'i',
			component: Info
		},
		ai: {
			label: 'AI',
			shortcut: 'a',
			component: AI
		}
	};

	const disableHotkeys = writable(false);
	const secondaryPane = writable(null);
	component_subscribe($$self, secondaryPane, value => $$invalidate(5, $secondaryPane = value));
	setContext('hotkeys', { disableHotkeys });
	setContext('secondaryPane', { secondaryPane });
	let paneDiv;
	let pane = 'main';

	function MenuChange(e) {
		$$invalidate(2, pane = e.detail);
		paneDiv.focus();
	}

	// Toggle debugger visibilty
	function ToggleVisibility() {
		$$invalidate(3, visible = !visible);
	}

	const debugOpt = $clientManager.client.debugOpt;
	let visible = !debugOpt || !debugOpt.collapseOnLoad;
	const showToggleButton = !debugOpt || !debugOpt.hideToggleButton;

	function Keypress(e) {
		if (e.key == '.') {
			ToggleVisibility();
			return;
		}

		// Set displayed pane
		if (!visible) return;

		Object.entries(panes).forEach(([key, { shortcut }]) => {
			if (e.key == shortcut) {
				$$invalidate(2, pane = key);
			}
		});
	}

	const transitionOpts = { duration: 150, easing: cubicOut };
	const [send, receive] = crossfade(transitionOpts);

	function div0_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			paneDiv = $$value;
			$$invalidate(1, paneDiv);
		});
	}

	$$self.$$set = $$props => {
		if ('clientManager' in $$props) $$subscribe_clientManager($$invalidate(0, clientManager = $$props.clientManager));
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$clientManager*/ 32768) {
			 $$invalidate(4, client = $clientManager.client);
		}
	};

	return [
		clientManager,
		paneDiv,
		pane,
		visible,
		client,
		$secondaryPane,
		panes,
		secondaryPane,
		MenuChange,
		ToggleVisibility,
		showToggleButton,
		Keypress,
		transitionOpts,
		send,
		receive,
		$clientManager,
		div0_binding
	];
}

class Debug extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$z, create_fragment$z, safe_not_equal, { clientManager: 0 }, add_css$q);
	}
}

exports.Debug = Debug;
exports._classCallCheck = _classCallCheck;
exports._createClass = _createClass;
exports._createSuper = _createSuper;
exports._defineProperty = _defineProperty;
exports._inherits = _inherits;
exports._objectSpread2 = _objectSpread2;
exports._objectWithoutProperties = _objectWithoutProperties;
