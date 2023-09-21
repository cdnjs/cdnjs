/**
 * svelte-range-slider-pips ~ 2.2.3
 * Multi-Thumb, Accessible, Beautiful Range Slider with Pips
 * © MPL-2.0 ~ Simon Goellner <simey.me@gmail.com> ~ 20/9/2023
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.RangeSliderPips = factory());
}(this, (function () { 'use strict';

    function noop() { }
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
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
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
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.wholeText !== data)
            text.data = data;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
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

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function tick_spring(ctx, last_value, current_value, target_value) {
        if (typeof current_value === 'number' || is_date(current_value)) {
            // @ts-ignore
            const delta = target_value - current_value;
            // @ts-ignore
            const velocity = (current_value - last_value) / (ctx.dt || 1 / 60); // guard div by 0
            const spring = ctx.opts.stiffness * delta;
            const damper = ctx.opts.damping * velocity;
            const acceleration = (spring - damper) * ctx.inv_mass;
            const d = (velocity + acceleration) * ctx.dt;
            if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
                return target_value; // settled
            }
            else {
                ctx.settled = false; // signal loop to keep ticking
                // @ts-ignore
                return is_date(current_value) ?
                    new Date(current_value.getTime() + d) : current_value + d;
            }
        }
        else if (Array.isArray(current_value)) {
            // @ts-ignore
            return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
        }
        else if (typeof current_value === 'object') {
            const next_value = {};
            for (const k in current_value) {
                // @ts-ignore
                next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
            }
            // @ts-ignore
            return next_value;
        }
        else {
            throw new Error(`Cannot spring ${typeof current_value} values`);
        }
    }
    function spring(value, opts = {}) {
        const store = writable(value);
        const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
        let last_time;
        let task;
        let current_token;
        let last_value = value;
        let target_value = value;
        let inv_mass = 1;
        let inv_mass_recovery_rate = 0;
        let cancel_task = false;
        function set(new_value, opts = {}) {
            target_value = new_value;
            const token = current_token = {};
            if (value == null || opts.hard || (spring.stiffness >= 1 && spring.damping >= 1)) {
                cancel_task = true; // cancel any running animation
                last_time = now();
                last_value = new_value;
                store.set(value = target_value);
                return Promise.resolve();
            }
            else if (opts.soft) {
                const rate = opts.soft === true ? .5 : +opts.soft;
                inv_mass_recovery_rate = 1 / (rate * 60);
                inv_mass = 0; // infinite mass, unaffected by spring forces
            }
            if (!task) {
                last_time = now();
                cancel_task = false;
                task = loop(now => {
                    if (cancel_task) {
                        cancel_task = false;
                        task = null;
                        return false;
                    }
                    inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
                    const ctx = {
                        inv_mass,
                        opts: spring,
                        settled: true,
                        dt: (now - last_time) * 60 / 1000
                    };
                    const next_value = tick_spring(ctx, last_value, value, target_value);
                    last_time = now;
                    last_value = value;
                    store.set(value = next_value);
                    if (ctx.settled) {
                        task = null;
                    }
                    return !ctx.settled;
                });
            }
            return new Promise(fulfil => {
                task.promise.then(() => {
                    if (token === current_token)
                        fulfil();
                });
            });
        }
        const spring = {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe,
            stiffness,
            damping,
            precision
        };
        return spring;
    }

    /* src/RangePips.svelte generated by Svelte v3.49.0 */

    function add_css(target) {
    	append_styles(target, "svelte-19a3n3k", ".rangeSlider{--pip:var(--range-pip, lightslategray);--pip-text:var(--range-pip-text, var(--pip));--pip-active:var(--range-pip-active, darkslategrey);--pip-active-text:var(--range-pip-active-text, var(--pip-active));--pip-hover:var(--range-pip-hover, darkslategrey);--pip-hover-text:var(--range-pip-hover-text, var(--pip-hover));--pip-in-range:var(--range-pip-in-range, var(--pip-active));--pip-in-range-text:var(--range-pip-in-range-text, var(--pip-active-text))}.rangePips{position:absolute;height:1em;left:0;right:0;bottom:-1em}.rangePips.vertical{height:auto;width:1em;left:100%;right:auto;top:0;bottom:0}.rangePips .pip{height:0.4em;position:absolute;top:0.25em;width:1px;white-space:nowrap}.rangePips.vertical .pip{height:1px;width:0.4em;left:0.25em;top:auto;bottom:auto}.rangePips .pipVal{position:absolute;top:0.4em;transform:translate(-50%, 25%)}.rangePips.vertical .pipVal{position:absolute;top:0;left:0.4em;transform:translate(25%, -50%)}.rangePips .pip{transition:all 0.15s ease}.rangePips .pipVal{transition:all 0.15s ease, font-weight 0s linear}.rangePips .pip{color:lightslategray;color:var(--pip-text);background-color:lightslategray;background-color:var(--pip)}.rangePips .pip.selected{color:darkslategrey;color:var(--pip-active-text);background-color:darkslategrey;background-color:var(--pip-active)}.rangePips.hoverable:not(.disabled) .pip:hover{color:darkslategrey;color:var(--pip-hover-text);background-color:darkslategrey;background-color:var(--pip-hover)}.rangePips .pip.in-range{color:darkslategrey;color:var(--pip-in-range-text);background-color:darkslategrey;background-color:var(--pip-in-range)}.rangePips .pip.selected{height:0.75em}.rangePips.vertical .pip.selected{height:1px;width:0.75em}.rangePips .pip.selected .pipVal{font-weight:bold;top:0.75em}.rangePips.vertical .pip.selected .pipVal{top:0;left:0.75em}.rangePips.hoverable:not(.disabled) .pip:not(.selected):hover{transition:none}.rangePips.hoverable:not(.disabled) .pip:not(.selected):hover .pipVal{transition:none;font-weight:bold}");
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[37] = list[i];
    	child_ctx[39] = i;
    	return child_ctx;
    }

    // (202:2) {#if ( all && first !== false ) || first }
    function create_if_block_9(ctx) {
    	let span;
    	let span_style_value;
    	let mounted;
    	let dispose;
    	let if_block = (/*all*/ ctx[6] === 'label' || /*first*/ ctx[7] === 'label') && create_if_block_10(ctx);

    	return {
    		c() {
    			span = element("span");
    			if (if_block) if_block.c();
    			attr(span, "class", "pip first");
    			attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[14] + ": 0%;"));
    			toggle_class(span, "selected", /*isSelected*/ ctx[18](/*min*/ ctx[0]));
    			toggle_class(span, "in-range", /*inRange*/ ctx[17](/*min*/ ctx[0]));
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			if (if_block) if_block.m(span, null);

    			if (!mounted) {
    				dispose = [
    					listen(span, "pointerdown", /*pointerdown_handler*/ ctx[30]),
    					listen(span, "pointerup", /*pointerup_handler*/ ctx[31])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (/*all*/ ctx[6] === 'label' || /*first*/ ctx[7] === 'label') {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_10(ctx);
    					if_block.c();
    					if_block.m(span, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty[0] & /*orientationStart*/ 16384 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[14] + ": 0%;"))) {
    				attr(span, "style", span_style_value);
    			}

    			if (dirty[0] & /*isSelected, min*/ 262145) {
    				toggle_class(span, "selected", /*isSelected*/ ctx[18](/*min*/ ctx[0]));
    			}

    			if (dirty[0] & /*inRange, min*/ 131073) {
    				toggle_class(span, "in-range", /*inRange*/ ctx[17](/*min*/ ctx[0]));
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    // (211:6) {#if all === 'label' || first === 'label'}
    function create_if_block_10(ctx) {
    	let span;
    	let t_value = /*formatter*/ ctx[12](/*fixFloat*/ ctx[16](/*min*/ ctx[0]), 0, 0) + "";
    	let t;
    	let if_block0 = /*prefix*/ ctx[10] && create_if_block_12(ctx);
    	let if_block1 = /*suffix*/ ctx[11] && create_if_block_11(ctx);

    	return {
    		c() {
    			span = element("span");
    			if (if_block0) if_block0.c();
    			t = text(t_value);
    			if (if_block1) if_block1.c();
    			attr(span, "class", "pipVal");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			if (if_block0) if_block0.m(span, null);
    			append(span, t);
    			if (if_block1) if_block1.m(span, null);
    		},
    		p(ctx, dirty) {
    			if (/*prefix*/ ctx[10]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_12(ctx);
    					if_block0.c();
    					if_block0.m(span, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty[0] & /*formatter, fixFloat, min*/ 69633 && t_value !== (t_value = /*formatter*/ ctx[12](/*fixFloat*/ ctx[16](/*min*/ ctx[0]), 0, 0) + "")) set_data(t, t_value);

    			if (/*suffix*/ ctx[11]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_11(ctx);
    					if_block1.c();
    					if_block1.m(span, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};
    }

    // (213:10) {#if prefix}
    function create_if_block_12(ctx) {
    	let span;
    	let t;

    	return {
    		c() {
    			span = element("span");
    			t = text(/*prefix*/ ctx[10]);
    			attr(span, "class", "pipVal-prefix");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*prefix*/ 1024) set_data(t, /*prefix*/ ctx[10]);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (213:100) {#if suffix}
    function create_if_block_11(ctx) {
    	let span;
    	let t;

    	return {
    		c() {
    			span = element("span");
    			t = text(/*suffix*/ ctx[11]);
    			attr(span, "class", "pipVal-suffix");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*suffix*/ 2048) set_data(t, /*suffix*/ ctx[11]);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (219:2) {#if ( all && rest !== false ) || rest}
    function create_if_block_4(ctx) {
    	let each_1_anchor;
    	let each_value = Array(/*pipCount*/ ctx[20] + 1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
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
    		p(ctx, dirty) {
    			if (dirty[0] & /*orientationStart, percentOf, pipVal, isSelected, inRange, labelDown, labelUp, suffix, formatter, prefix, all, rest, min, max, pipCount*/ 8314435) {
    				each_value = Array(/*pipCount*/ ctx[20] + 1);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
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
    		d(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach(each_1_anchor);
    		}
    	};
    }

    // (221:6) {#if pipVal(i) !== min && pipVal(i) !== max}
    function create_if_block_5(ctx) {
    	let span;
    	let t;
    	let span_style_value;
    	let mounted;
    	let dispose;
    	let if_block = (/*all*/ ctx[6] === 'label' || /*rest*/ ctx[9] === 'label') && create_if_block_6(ctx);

    	function pointerup_handler_1(...args) {
    		return /*pointerup_handler_1*/ ctx[33](/*i*/ ctx[39], ...args);
    	}

    	return {
    		c() {
    			span = element("span");
    			if (if_block) if_block.c();
    			t = space();
    			attr(span, "class", "pip");
    			attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[14] + ": " + /*percentOf*/ ctx[15](/*pipVal*/ ctx[19](/*i*/ ctx[39])) + "%;"));
    			toggle_class(span, "selected", /*isSelected*/ ctx[18](/*pipVal*/ ctx[19](/*i*/ ctx[39])));
    			toggle_class(span, "in-range", /*inRange*/ ctx[17](/*pipVal*/ ctx[19](/*i*/ ctx[39])));
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			if (if_block) if_block.m(span, null);
    			append(span, t);

    			if (!mounted) {
    				dispose = [
    					listen(span, "pointerdown", /*pointerdown_handler_1*/ ctx[32]),
    					listen(span, "pointerup", pointerup_handler_1)
    				];

    				mounted = true;
    			}
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (/*all*/ ctx[6] === 'label' || /*rest*/ ctx[9] === 'label') {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_6(ctx);
    					if_block.c();
    					if_block.m(span, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty[0] & /*orientationStart, percentOf, pipVal*/ 573440 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[14] + ": " + /*percentOf*/ ctx[15](/*pipVal*/ ctx[19](/*i*/ ctx[39])) + "%;"))) {
    				attr(span, "style", span_style_value);
    			}

    			if (dirty[0] & /*isSelected, pipVal*/ 786432) {
    				toggle_class(span, "selected", /*isSelected*/ ctx[18](/*pipVal*/ ctx[19](/*i*/ ctx[39])));
    			}

    			if (dirty[0] & /*inRange, pipVal*/ 655360) {
    				toggle_class(span, "in-range", /*inRange*/ ctx[17](/*pipVal*/ ctx[19](/*i*/ ctx[39])));
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    // (230:10) {#if all === 'label' || rest === 'label'}
    function create_if_block_6(ctx) {
    	let span;
    	let t_value = /*formatter*/ ctx[12](/*pipVal*/ ctx[19](/*i*/ ctx[39]), /*i*/ ctx[39], /*percentOf*/ ctx[15](/*pipVal*/ ctx[19](/*i*/ ctx[39]))) + "";
    	let t;
    	let if_block0 = /*prefix*/ ctx[10] && create_if_block_8(ctx);
    	let if_block1 = /*suffix*/ ctx[11] && create_if_block_7(ctx);

    	return {
    		c() {
    			span = element("span");
    			if (if_block0) if_block0.c();
    			t = text(t_value);
    			if (if_block1) if_block1.c();
    			attr(span, "class", "pipVal");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			if (if_block0) if_block0.m(span, null);
    			append(span, t);
    			if (if_block1) if_block1.m(span, null);
    		},
    		p(ctx, dirty) {
    			if (/*prefix*/ ctx[10]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_8(ctx);
    					if_block0.c();
    					if_block0.m(span, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty[0] & /*formatter, pipVal, percentOf*/ 561152 && t_value !== (t_value = /*formatter*/ ctx[12](/*pipVal*/ ctx[19](/*i*/ ctx[39]), /*i*/ ctx[39], /*percentOf*/ ctx[15](/*pipVal*/ ctx[19](/*i*/ ctx[39]))) + "")) set_data(t, t_value);

    			if (/*suffix*/ ctx[11]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_7(ctx);
    					if_block1.c();
    					if_block1.m(span, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};
    }

    // (232:14) {#if prefix}
    function create_if_block_8(ctx) {
    	let span;
    	let t;

    	return {
    		c() {
    			span = element("span");
    			t = text(/*prefix*/ ctx[10]);
    			attr(span, "class", "pipVal-prefix");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*prefix*/ 1024) set_data(t, /*prefix*/ ctx[10]);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (232:119) {#if suffix}
    function create_if_block_7(ctx) {
    	let span;
    	let t;

    	return {
    		c() {
    			span = element("span");
    			t = text(/*suffix*/ ctx[11]);
    			attr(span, "class", "pipVal-suffix");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*suffix*/ 2048) set_data(t, /*suffix*/ ctx[11]);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (220:4) {#each Array(pipCount + 1) as _, i}
    function create_each_block(ctx) {
    	let show_if = /*pipVal*/ ctx[19](/*i*/ ctx[39]) !== /*min*/ ctx[0] && /*pipVal*/ ctx[19](/*i*/ ctx[39]) !== /*max*/ ctx[1];
    	let if_block_anchor;
    	let if_block = show_if && create_if_block_5(ctx);

    	return {
    		c() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*pipVal, min, max*/ 524291) show_if = /*pipVal*/ ctx[19](/*i*/ ctx[39]) !== /*min*/ ctx[0] && /*pipVal*/ ctx[19](/*i*/ ctx[39]) !== /*max*/ ctx[1];

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_5(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    // (240:2) {#if ( all && last !== false ) || last}
    function create_if_block(ctx) {
    	let span;
    	let span_style_value;
    	let mounted;
    	let dispose;
    	let if_block = (/*all*/ ctx[6] === 'label' || /*last*/ ctx[8] === 'label') && create_if_block_1(ctx);

    	return {
    		c() {
    			span = element("span");
    			if (if_block) if_block.c();
    			attr(span, "class", "pip last");
    			attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[14] + ": 100%;"));
    			toggle_class(span, "selected", /*isSelected*/ ctx[18](/*max*/ ctx[1]));
    			toggle_class(span, "in-range", /*inRange*/ ctx[17](/*max*/ ctx[1]));
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			if (if_block) if_block.m(span, null);

    			if (!mounted) {
    				dispose = [
    					listen(span, "pointerdown", /*pointerdown_handler_2*/ ctx[34]),
    					listen(span, "pointerup", /*pointerup_handler_2*/ ctx[35])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (/*all*/ ctx[6] === 'label' || /*last*/ ctx[8] === 'label') {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(span, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty[0] & /*orientationStart*/ 16384 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[14] + ": 100%;"))) {
    				attr(span, "style", span_style_value);
    			}

    			if (dirty[0] & /*isSelected, max*/ 262146) {
    				toggle_class(span, "selected", /*isSelected*/ ctx[18](/*max*/ ctx[1]));
    			}

    			if (dirty[0] & /*inRange, max*/ 131074) {
    				toggle_class(span, "in-range", /*inRange*/ ctx[17](/*max*/ ctx[1]));
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    // (249:6) {#if all === 'label' || last === 'label'}
    function create_if_block_1(ctx) {
    	let span;
    	let t_value = /*formatter*/ ctx[12](/*fixFloat*/ ctx[16](/*max*/ ctx[1]), /*pipCount*/ ctx[20], 100) + "";
    	let t;
    	let if_block0 = /*prefix*/ ctx[10] && create_if_block_3(ctx);
    	let if_block1 = /*suffix*/ ctx[11] && create_if_block_2(ctx);

    	return {
    		c() {
    			span = element("span");
    			if (if_block0) if_block0.c();
    			t = text(t_value);
    			if (if_block1) if_block1.c();
    			attr(span, "class", "pipVal");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			if (if_block0) if_block0.m(span, null);
    			append(span, t);
    			if (if_block1) if_block1.m(span, null);
    		},
    		p(ctx, dirty) {
    			if (/*prefix*/ ctx[10]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					if_block0.m(span, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty[0] & /*formatter, fixFloat, max, pipCount*/ 1118210 && t_value !== (t_value = /*formatter*/ ctx[12](/*fixFloat*/ ctx[16](/*max*/ ctx[1]), /*pipCount*/ ctx[20], 100) + "")) set_data(t, t_value);

    			if (/*suffix*/ ctx[11]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					if_block1.m(span, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};
    }

    // (251:10) {#if prefix}
    function create_if_block_3(ctx) {
    	let span;
    	let t;

    	return {
    		c() {
    			span = element("span");
    			t = text(/*prefix*/ ctx[10]);
    			attr(span, "class", "pipVal-prefix");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*prefix*/ 1024) set_data(t, /*prefix*/ ctx[10]);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (251:109) {#if suffix}
    function create_if_block_2(ctx) {
    	let span;
    	let t;

    	return {
    		c() {
    			span = element("span");
    			t = text(/*suffix*/ ctx[11]);
    			attr(span, "class", "pipVal-suffix");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*suffix*/ 2048) set_data(t, /*suffix*/ ctx[11]);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    function create_fragment(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let if_block0 = (/*all*/ ctx[6] && /*first*/ ctx[7] !== false || /*first*/ ctx[7]) && create_if_block_9(ctx);
    	let if_block1 = (/*all*/ ctx[6] && /*rest*/ ctx[9] !== false || /*rest*/ ctx[9]) && create_if_block_4(ctx);
    	let if_block2 = (/*all*/ ctx[6] && /*last*/ ctx[8] !== false || /*last*/ ctx[8]) && create_if_block(ctx);

    	return {
    		c() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			attr(div, "class", "rangePips");
    			toggle_class(div, "disabled", /*disabled*/ ctx[5]);
    			toggle_class(div, "hoverable", /*hoverable*/ ctx[4]);
    			toggle_class(div, "vertical", /*vertical*/ ctx[2]);
    			toggle_class(div, "reversed", /*reversed*/ ctx[3]);
    			toggle_class(div, "focus", /*focus*/ ctx[13]);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append(div, t0);
    			if (if_block1) if_block1.m(div, null);
    			append(div, t1);
    			if (if_block2) if_block2.m(div, null);
    		},
    		p(ctx, dirty) {
    			if (/*all*/ ctx[6] && /*first*/ ctx[7] !== false || /*first*/ ctx[7]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_9(ctx);
    					if_block0.c();
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*all*/ ctx[6] && /*rest*/ ctx[9] !== false || /*rest*/ ctx[9]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_4(ctx);
    					if_block1.c();
    					if_block1.m(div, t1);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*all*/ ctx[6] && /*last*/ ctx[8] !== false || /*last*/ ctx[8]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block(ctx);
    					if_block2.c();
    					if_block2.m(div, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (dirty[0] & /*disabled*/ 32) {
    				toggle_class(div, "disabled", /*disabled*/ ctx[5]);
    			}

    			if (dirty[0] & /*hoverable*/ 16) {
    				toggle_class(div, "hoverable", /*hoverable*/ ctx[4]);
    			}

    			if (dirty[0] & /*vertical*/ 4) {
    				toggle_class(div, "vertical", /*vertical*/ ctx[2]);
    			}

    			if (dirty[0] & /*reversed*/ 8) {
    				toggle_class(div, "reversed", /*reversed*/ ctx[3]);
    			}

    			if (dirty[0] & /*focus*/ 8192) {
    				toggle_class(div, "focus", /*focus*/ ctx[13]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let pipStep;
    	let pipCount;
    	let pipVal;
    	let isSelected;
    	let inRange;
    	let { range = false } = $$props;
    	let { min = 0 } = $$props;
    	let { max = 100 } = $$props;
    	let { step = 1 } = $$props;
    	let { values = [(max + min) / 2] } = $$props;
    	let { vertical = false } = $$props;
    	let { reversed = false } = $$props;
    	let { hoverable = true } = $$props;
    	let { disabled = false } = $$props;
    	let { pipstep = undefined } = $$props;
    	let { all = true } = $$props;
    	let { first = undefined } = $$props;
    	let { last = undefined } = $$props;
    	let { rest = undefined } = $$props;
    	let { prefix = "" } = $$props;
    	let { suffix = "" } = $$props;
    	let { formatter = (v, i) => v } = $$props;
    	let { focus = undefined } = $$props;
    	let { orientationStart = undefined } = $$props;
    	let { percentOf = undefined } = $$props;
    	let { moveHandle = undefined } = $$props;
    	let { fixFloat = undefined } = $$props;
    	let { normalisedClient = undefined } = $$props;
    	let clientStart;

    	/**
     * function to run when the user clicks on a label
     * we store the original client position so we can check if the user has moved the mouse/finger
     * @param {event} e the event from browser
     **/
    	function labelDown(e) {
    		e = normalisedClient(e);
    		clientStart = { x: e.clientX, y: e.clientY };
    	}

    	/**
     * function to run when the user releases the mouse/finger
     * we check if the user has moved the mouse/finger, if not we "click" the label
     * and move the handle it to the label position
     * @param {number} val the value of the label
     * @param {event} e the event from browser
     */
    	function labelUp(val, e) {
    		e = normalisedClient(e);

    		if (!disabled) {
    			const distanceMoved = Math.sqrt(Math.pow(clientStart.x - e.clientX, 2) + Math.pow(clientStart.y - e.clientY, 2));

    			if (clientStart && distanceMoved <= 5) {
    				moveHandle(undefined, val);
    			}
    		}
    	}

    	const pointerdown_handler = e => {
    		labelDown(e);
    	};

    	const pointerup_handler = e => {
    		labelUp(pipVal(min), e);
    	};

    	const pointerdown_handler_1 = e => {
    		labelDown(e);
    	};

    	const pointerup_handler_1 = (i, e) => {
    		labelUp(pipVal(i), e);
    	};

    	const pointerdown_handler_2 = e => {
    		labelDown(e);
    	};

    	const pointerup_handler_2 = e => {
    		labelUp(pipVal(max), e);
    	};

    	$$self.$$set = $$props => {
    		if ('range' in $$props) $$invalidate(23, range = $$props.range);
    		if ('min' in $$props) $$invalidate(0, min = $$props.min);
    		if ('max' in $$props) $$invalidate(1, max = $$props.max);
    		if ('step' in $$props) $$invalidate(24, step = $$props.step);
    		if ('values' in $$props) $$invalidate(25, values = $$props.values);
    		if ('vertical' in $$props) $$invalidate(2, vertical = $$props.vertical);
    		if ('reversed' in $$props) $$invalidate(3, reversed = $$props.reversed);
    		if ('hoverable' in $$props) $$invalidate(4, hoverable = $$props.hoverable);
    		if ('disabled' in $$props) $$invalidate(5, disabled = $$props.disabled);
    		if ('pipstep' in $$props) $$invalidate(26, pipstep = $$props.pipstep);
    		if ('all' in $$props) $$invalidate(6, all = $$props.all);
    		if ('first' in $$props) $$invalidate(7, first = $$props.first);
    		if ('last' in $$props) $$invalidate(8, last = $$props.last);
    		if ('rest' in $$props) $$invalidate(9, rest = $$props.rest);
    		if ('prefix' in $$props) $$invalidate(10, prefix = $$props.prefix);
    		if ('suffix' in $$props) $$invalidate(11, suffix = $$props.suffix);
    		if ('formatter' in $$props) $$invalidate(12, formatter = $$props.formatter);
    		if ('focus' in $$props) $$invalidate(13, focus = $$props.focus);
    		if ('orientationStart' in $$props) $$invalidate(14, orientationStart = $$props.orientationStart);
    		if ('percentOf' in $$props) $$invalidate(15, percentOf = $$props.percentOf);
    		if ('moveHandle' in $$props) $$invalidate(27, moveHandle = $$props.moveHandle);
    		if ('fixFloat' in $$props) $$invalidate(16, fixFloat = $$props.fixFloat);
    		if ('normalisedClient' in $$props) $$invalidate(28, normalisedClient = $$props.normalisedClient);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*pipstep, max, min, step, vertical*/ 83886087) {
    			 $$invalidate(29, pipStep = pipstep || ((max - min) / step >= (vertical ? 50 : 100)
    			? (max - min) / (vertical ? 10 : 20)
    			: 1));
    		}

    		if ($$self.$$.dirty[0] & /*max, min, step, pipStep*/ 553648131) {
    			 $$invalidate(20, pipCount = parseInt((max - min) / (step * pipStep), 10));
    		}

    		if ($$self.$$.dirty[0] & /*fixFloat, min, step, pipStep*/ 553713665) {
    			 $$invalidate(19, pipVal = function (val) {
    				return fixFloat(min + val * step * pipStep);
    			});
    		}

    		if ($$self.$$.dirty[0] & /*values, fixFloat*/ 33619968) {
    			 $$invalidate(18, isSelected = function (val) {
    				return values.some(v => fixFloat(v) === fixFloat(val));
    			});
    		}

    		if ($$self.$$.dirty[0] & /*range, values*/ 41943040) {
    			 $$invalidate(17, inRange = function (val) {
    				if (range === "min") {
    					return values[0] > val;
    				} else if (range === "max") {
    					return values[0] < val;
    				} else if (range) {
    					return values[0] < val && values[1] > val;
    				}
    			});
    		}
    	};

    	return [
    		min,
    		max,
    		vertical,
    		reversed,
    		hoverable,
    		disabled,
    		all,
    		first,
    		last,
    		rest,
    		prefix,
    		suffix,
    		formatter,
    		focus,
    		orientationStart,
    		percentOf,
    		fixFloat,
    		inRange,
    		isSelected,
    		pipVal,
    		pipCount,
    		labelDown,
    		labelUp,
    		range,
    		step,
    		values,
    		pipstep,
    		moveHandle,
    		normalisedClient,
    		pipStep,
    		pointerdown_handler,
    		pointerup_handler,
    		pointerdown_handler_1,
    		pointerup_handler_1,
    		pointerdown_handler_2,
    		pointerup_handler_2
    	];
    }

    class RangePips extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(
    			this,
    			options,
    			instance,
    			create_fragment,
    			safe_not_equal,
    			{
    				range: 23,
    				min: 0,
    				max: 1,
    				step: 24,
    				values: 25,
    				vertical: 2,
    				reversed: 3,
    				hoverable: 4,
    				disabled: 5,
    				pipstep: 26,
    				all: 6,
    				first: 7,
    				last: 8,
    				rest: 9,
    				prefix: 10,
    				suffix: 11,
    				formatter: 12,
    				focus: 13,
    				orientationStart: 14,
    				percentOf: 15,
    				moveHandle: 27,
    				fixFloat: 16,
    				normalisedClient: 28
    			},
    			add_css,
    			[-1, -1]
    		);
    	}
    }

    /* src/RangeSlider.svelte generated by Svelte v3.49.0 */

    function add_css$1(target) {
    	append_styles(target, "svelte-ryi37q", ".rangeSlider{--slider:var(--range-slider, #d7dada);--handle-inactive:var(--range-handle-inactive, #99a2a2);--handle:var(--range-handle, #838de7);--handle-focus:var(--range-handle-focus, #4a40d4);--handle-border:var(--range-handle-border, var(--handle));--range-inactive:var(--range-range-inactive, var(--handle-inactive));--range:var(--range-range, var(--handle-focus));--float-inactive:var(--range-float-inactive, var(--handle-inactive));--float:var(--range-float, var(--handle-focus));--float-text:var(--range-float-text, white)}.rangeSlider{position:relative;border-radius:100px;height:0.5em;margin:1em;transition:opacity 0.2s ease;user-select:none}.rangeSlider *{user-select:none}.rangeSlider.pips{margin-bottom:1.8em}.rangeSlider.pip-labels{margin-bottom:2.8em}.rangeSlider.vertical{display:inline-block;border-radius:100px;width:0.5em;min-height:200px}.rangeSlider.vertical.pips{margin-right:1.8em;margin-bottom:1em}.rangeSlider.vertical.pip-labels{margin-right:2.8em;margin-bottom:1em}.rangeSlider .rangeHandle{position:absolute;display:block;height:1.4em;width:1.4em;top:0.25em;bottom:auto;transform:translateY(-50%) translateX(-50%);z-index:2}.rangeSlider.reversed .rangeHandle{transform:translateY(-50%) translateX(50%)}.rangeSlider.vertical .rangeHandle{left:0.25em;top:auto;transform:translateY(50%) translateX(-50%)}.rangeSlider.vertical.reversed .rangeHandle{transform:translateY(-50%) translateX(-50%)}.rangeSlider .rangeNub,.rangeSlider .rangeHandle:before{position:absolute;left:0;top:0;display:block;border-radius:10em;height:100%;width:100%;transition:box-shadow 0.2s ease}.rangeSlider .rangeHandle:before{content:\"\";left:1px;top:1px;bottom:1px;right:1px;height:auto;width:auto;box-shadow:0 0 0 0px var(--handle-border);opacity:0}.rangeSlider.hoverable:not(.disabled) .rangeHandle:hover:before{box-shadow:0 0 0 8px var(--handle-border);opacity:0.2}.rangeSlider.hoverable:not(.disabled) .rangeHandle.press:before,.rangeSlider.hoverable:not(.disabled) .rangeHandle.press:hover:before{box-shadow:0 0 0 12px var(--handle-border);opacity:0.4}.rangeSlider.range:not(.min):not(.max) .rangeNub{border-radius:10em 10em 10em 1.6em}.rangeSlider.range .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(-135deg)}.rangeSlider.range .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(45deg)}.rangeSlider.range.reversed .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(45deg)}.rangeSlider.range.reversed .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(-135deg)}.rangeSlider.range.vertical .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(135deg)}.rangeSlider.range.vertical .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(-45deg)}.rangeSlider.range.vertical.reversed .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(-45deg)}.rangeSlider.range.vertical.reversed .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(135deg)}.rangeSlider .rangeFloat{display:block;position:absolute;left:50%;top:-0.5em;transform:translate(-50%, -100%);font-size:1em;text-align:center;opacity:0;pointer-events:none;white-space:nowrap;transition:all 0.2s ease;font-size:0.9em;padding:0.2em 0.4em;border-radius:0.2em}.rangeSlider .rangeHandle.active .rangeFloat,.rangeSlider.hoverable .rangeHandle:hover .rangeFloat{opacity:1;top:-0.2em;transform:translate(-50%, -100%)}.rangeSlider .rangeBar{position:absolute;display:block;transition:background 0.2s ease;border-radius:1em;height:0.5em;top:0;user-select:none;z-index:1}.rangeSlider.vertical .rangeBar{width:0.5em;height:auto}.rangeSlider{background-color:#d7dada;background-color:var(--slider)}.rangeSlider .rangeBar{background-color:#99a2a2;background-color:var(--range-inactive)}.rangeSlider.focus .rangeBar{background-color:#838de7;background-color:var(--range)}.rangeSlider .rangeNub{background-color:#99a2a2;background-color:var(--handle-inactive)}.rangeSlider.focus .rangeNub{background-color:#838de7;background-color:var(--handle)}.rangeSlider .rangeHandle.active .rangeNub{background-color:#4a40d4;background-color:var(--handle-focus)}.rangeSlider .rangeFloat{color:white;color:var(--float-text);background-color:#99a2a2;background-color:var(--float-inactive)}.rangeSlider.focus .rangeFloat{background-color:#4a40d4;background-color:var(--float)}.rangeSlider.disabled{opacity:0.5}.rangeSlider.disabled .rangeNub{background-color:#d7dada;background-color:var(--slider)}");
    }

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[65] = list[i];
    	child_ctx[67] = i;
    	return child_ctx;
    }

    // (842:6) {#if float}
    function create_if_block_2$1(ctx) {
    	let span;
    	let t_value = /*handleFormatter*/ ctx[21](/*value*/ ctx[65], /*index*/ ctx[67], /*percentOf*/ ctx[24](/*value*/ ctx[65])) + "";
    	let t;
    	let if_block0 = /*prefix*/ ctx[18] && create_if_block_4$1(ctx);
    	let if_block1 = /*suffix*/ ctx[19] && create_if_block_3$1(ctx);

    	return {
    		c() {
    			span = element("span");
    			if (if_block0) if_block0.c();
    			t = text(t_value);
    			if (if_block1) if_block1.c();
    			attr(span, "class", "rangeFloat");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			if (if_block0) if_block0.m(span, null);
    			append(span, t);
    			if (if_block1) if_block1.m(span, null);
    		},
    		p(ctx, dirty) {
    			if (/*prefix*/ ctx[18]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_4$1(ctx);
    					if_block0.c();
    					if_block0.m(span, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty[0] & /*handleFormatter, values, percentOf*/ 18874369 && t_value !== (t_value = /*handleFormatter*/ ctx[21](/*value*/ ctx[65], /*index*/ ctx[67], /*percentOf*/ ctx[24](/*value*/ ctx[65])) + "")) set_data(t, t_value);

    			if (/*suffix*/ ctx[19]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_3$1(ctx);
    					if_block1.c();
    					if_block1.m(span, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};
    }

    // (844:10) {#if prefix}
    function create_if_block_4$1(ctx) {
    	let span;
    	let t;

    	return {
    		c() {
    			span = element("span");
    			t = text(/*prefix*/ ctx[18]);
    			attr(span, "class", "rangeFloat-prefix");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*prefix*/ 262144) set_data(t, /*prefix*/ ctx[18]);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (844:121) {#if suffix}
    function create_if_block_3$1(ctx) {
    	let span;
    	let t;

    	return {
    		c() {
    			span = element("span");
    			t = text(/*suffix*/ ctx[19]);
    			attr(span, "class", "rangeFloat-suffix");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*suffix*/ 524288) set_data(t, /*suffix*/ ctx[19]);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (820:2) {#each values as value, index}
    function create_each_block$1(ctx) {
    	let span1;
    	let span0;
    	let t;
    	let span1_data_handle_value;
    	let span1_style_value;
    	let span1_aria_label_value;
    	let span1_aria_valuemin_value;
    	let span1_aria_valuemax_value;
    	let span1_aria_valuenow_value;
    	let span1_aria_valuetext_value;
    	let span1_aria_orientation_value;
    	let span1_tabindex_value;
    	let mounted;
    	let dispose;
    	let if_block = /*float*/ ctx[7] && create_if_block_2$1(ctx);

    	return {
    		c() {
    			span1 = element("span");
    			span0 = element("span");
    			t = space();
    			if (if_block) if_block.c();
    			attr(span0, "class", "rangeNub");
    			attr(span1, "role", "slider");
    			attr(span1, "class", "rangeHandle");
    			attr(span1, "data-handle", span1_data_handle_value = /*index*/ ctx[67]);
    			attr(span1, "style", span1_style_value = "" + (/*orientationStart*/ ctx[29] + ": " + /*$springPositions*/ ctx[30][/*index*/ ctx[67]] + "%; z-index: " + (/*activeHandle*/ ctx[27] === /*index*/ ctx[67] ? 3 : 2) + ";"));
    			attr(span1, "aria-label", span1_aria_label_value = /*ariaLabels*/ ctx[22][/*index*/ ctx[67]]);

    			attr(span1, "aria-valuemin", span1_aria_valuemin_value = /*range*/ ctx[2] === true && /*index*/ ctx[67] === 1
    			? /*values*/ ctx[0][0]
    			: /*min*/ ctx[3]);

    			attr(span1, "aria-valuemax", span1_aria_valuemax_value = /*range*/ ctx[2] === true && /*index*/ ctx[67] === 0
    			? /*values*/ ctx[0][1]
    			: /*max*/ ctx[4]);

    			attr(span1, "aria-valuenow", span1_aria_valuenow_value = /*value*/ ctx[65]);
    			attr(span1, "aria-valuetext", span1_aria_valuetext_value = "" + (/*prefix*/ ctx[18] + /*handleFormatter*/ ctx[21](/*value*/ ctx[65], /*index*/ ctx[67], /*percentOf*/ ctx[24](/*value*/ ctx[65])) + /*suffix*/ ctx[19]));
    			attr(span1, "aria-orientation", span1_aria_orientation_value = /*vertical*/ ctx[6] ? 'vertical' : 'horizontal');
    			attr(span1, "aria-disabled", /*disabled*/ ctx[10]);
    			attr(span1, "disabled", /*disabled*/ ctx[10]);
    			attr(span1, "tabindex", span1_tabindex_value = /*disabled*/ ctx[10] ? -1 : 0);
    			toggle_class(span1, "active", /*focus*/ ctx[25] && /*activeHandle*/ ctx[27] === /*index*/ ctx[67]);
    			toggle_class(span1, "press", /*handlePressed*/ ctx[26] && /*activeHandle*/ ctx[27] === /*index*/ ctx[67]);
    		},
    		m(target, anchor) {
    			insert(target, span1, anchor);
    			append(span1, span0);
    			append(span1, t);
    			if (if_block) if_block.m(span1, null);

    			if (!mounted) {
    				dispose = [
    					listen(span1, "blur", /*sliderBlurHandle*/ ctx[35]),
    					listen(span1, "focus", /*sliderFocusHandle*/ ctx[36]),
    					listen(span1, "keydown", /*sliderKeydown*/ ctx[37])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (/*float*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2$1(ctx);
    					if_block.c();
    					if_block.m(span1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty[0] & /*orientationStart, $springPositions, activeHandle*/ 1744830464 && span1_style_value !== (span1_style_value = "" + (/*orientationStart*/ ctx[29] + ": " + /*$springPositions*/ ctx[30][/*index*/ ctx[67]] + "%; z-index: " + (/*activeHandle*/ ctx[27] === /*index*/ ctx[67] ? 3 : 2) + ";"))) {
    				attr(span1, "style", span1_style_value);
    			}

    			if (dirty[0] & /*ariaLabels*/ 4194304 && span1_aria_label_value !== (span1_aria_label_value = /*ariaLabels*/ ctx[22][/*index*/ ctx[67]])) {
    				attr(span1, "aria-label", span1_aria_label_value);
    			}

    			if (dirty[0] & /*range, values, min*/ 13 && span1_aria_valuemin_value !== (span1_aria_valuemin_value = /*range*/ ctx[2] === true && /*index*/ ctx[67] === 1
    			? /*values*/ ctx[0][0]
    			: /*min*/ ctx[3])) {
    				attr(span1, "aria-valuemin", span1_aria_valuemin_value);
    			}

    			if (dirty[0] & /*range, values, max*/ 21 && span1_aria_valuemax_value !== (span1_aria_valuemax_value = /*range*/ ctx[2] === true && /*index*/ ctx[67] === 0
    			? /*values*/ ctx[0][1]
    			: /*max*/ ctx[4])) {
    				attr(span1, "aria-valuemax", span1_aria_valuemax_value);
    			}

    			if (dirty[0] & /*values*/ 1 && span1_aria_valuenow_value !== (span1_aria_valuenow_value = /*value*/ ctx[65])) {
    				attr(span1, "aria-valuenow", span1_aria_valuenow_value);
    			}

    			if (dirty[0] & /*prefix, handleFormatter, values, percentOf, suffix*/ 19660801 && span1_aria_valuetext_value !== (span1_aria_valuetext_value = "" + (/*prefix*/ ctx[18] + /*handleFormatter*/ ctx[21](/*value*/ ctx[65], /*index*/ ctx[67], /*percentOf*/ ctx[24](/*value*/ ctx[65])) + /*suffix*/ ctx[19]))) {
    				attr(span1, "aria-valuetext", span1_aria_valuetext_value);
    			}

    			if (dirty[0] & /*vertical*/ 64 && span1_aria_orientation_value !== (span1_aria_orientation_value = /*vertical*/ ctx[6] ? 'vertical' : 'horizontal')) {
    				attr(span1, "aria-orientation", span1_aria_orientation_value);
    			}

    			if (dirty[0] & /*disabled*/ 1024) {
    				attr(span1, "aria-disabled", /*disabled*/ ctx[10]);
    			}

    			if (dirty[0] & /*disabled*/ 1024) {
    				attr(span1, "disabled", /*disabled*/ ctx[10]);
    			}

    			if (dirty[0] & /*disabled*/ 1024 && span1_tabindex_value !== (span1_tabindex_value = /*disabled*/ ctx[10] ? -1 : 0)) {
    				attr(span1, "tabindex", span1_tabindex_value);
    			}

    			if (dirty[0] & /*focus, activeHandle*/ 167772160) {
    				toggle_class(span1, "active", /*focus*/ ctx[25] && /*activeHandle*/ ctx[27] === /*index*/ ctx[67]);
    			}

    			if (dirty[0] & /*handlePressed, activeHandle*/ 201326592) {
    				toggle_class(span1, "press", /*handlePressed*/ ctx[26] && /*activeHandle*/ ctx[27] === /*index*/ ctx[67]);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span1);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    // (849:2) {#if range}
    function create_if_block_1$1(ctx) {
    	let span;
    	let span_style_value;

    	return {
    		c() {
    			span = element("span");
    			attr(span, "class", "rangeBar");
    			attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[29] + ": " + /*rangeStart*/ ctx[33](/*$springPositions*/ ctx[30]) + "%; " + /*orientationEnd*/ ctx[28] + ": " + /*rangeEnd*/ ctx[34](/*$springPositions*/ ctx[30]) + "%;"));
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*orientationStart, $springPositions, orientationEnd*/ 1879048192 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[29] + ": " + /*rangeStart*/ ctx[33](/*$springPositions*/ ctx[30]) + "%; " + /*orientationEnd*/ ctx[28] + ": " + /*rangeEnd*/ ctx[34](/*$springPositions*/ ctx[30]) + "%;"))) {
    				attr(span, "style", span_style_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (855:2) {#if pips}
    function create_if_block$1(ctx) {
    	let rangepips;
    	let current;

    	rangepips = new RangePips({
    			props: {
    				values: /*values*/ ctx[0],
    				min: /*min*/ ctx[3],
    				max: /*max*/ ctx[4],
    				step: /*step*/ ctx[5],
    				range: /*range*/ ctx[2],
    				vertical: /*vertical*/ ctx[6],
    				reversed: /*reversed*/ ctx[8],
    				orientationStart: /*orientationStart*/ ctx[29],
    				hoverable: /*hoverable*/ ctx[9],
    				disabled: /*disabled*/ ctx[10],
    				all: /*all*/ ctx[13],
    				first: /*first*/ ctx[14],
    				last: /*last*/ ctx[15],
    				rest: /*rest*/ ctx[16],
    				pipstep: /*pipstep*/ ctx[12],
    				prefix: /*prefix*/ ctx[18],
    				suffix: /*suffix*/ ctx[19],
    				formatter: /*formatter*/ ctx[20],
    				focus: /*focus*/ ctx[25],
    				percentOf: /*percentOf*/ ctx[24],
    				moveHandle: /*moveHandle*/ ctx[32],
    				fixFloat: /*fixFloat*/ ctx[31],
    				normalisedClient
    			}
    		});

    	return {
    		c() {
    			create_component(rangepips.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(rangepips, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const rangepips_changes = {};
    			if (dirty[0] & /*values*/ 1) rangepips_changes.values = /*values*/ ctx[0];
    			if (dirty[0] & /*min*/ 8) rangepips_changes.min = /*min*/ ctx[3];
    			if (dirty[0] & /*max*/ 16) rangepips_changes.max = /*max*/ ctx[4];
    			if (dirty[0] & /*step*/ 32) rangepips_changes.step = /*step*/ ctx[5];
    			if (dirty[0] & /*range*/ 4) rangepips_changes.range = /*range*/ ctx[2];
    			if (dirty[0] & /*vertical*/ 64) rangepips_changes.vertical = /*vertical*/ ctx[6];
    			if (dirty[0] & /*reversed*/ 256) rangepips_changes.reversed = /*reversed*/ ctx[8];
    			if (dirty[0] & /*orientationStart*/ 536870912) rangepips_changes.orientationStart = /*orientationStart*/ ctx[29];
    			if (dirty[0] & /*hoverable*/ 512) rangepips_changes.hoverable = /*hoverable*/ ctx[9];
    			if (dirty[0] & /*disabled*/ 1024) rangepips_changes.disabled = /*disabled*/ ctx[10];
    			if (dirty[0] & /*all*/ 8192) rangepips_changes.all = /*all*/ ctx[13];
    			if (dirty[0] & /*first*/ 16384) rangepips_changes.first = /*first*/ ctx[14];
    			if (dirty[0] & /*last*/ 32768) rangepips_changes.last = /*last*/ ctx[15];
    			if (dirty[0] & /*rest*/ 65536) rangepips_changes.rest = /*rest*/ ctx[16];
    			if (dirty[0] & /*pipstep*/ 4096) rangepips_changes.pipstep = /*pipstep*/ ctx[12];
    			if (dirty[0] & /*prefix*/ 262144) rangepips_changes.prefix = /*prefix*/ ctx[18];
    			if (dirty[0] & /*suffix*/ 524288) rangepips_changes.suffix = /*suffix*/ ctx[19];
    			if (dirty[0] & /*formatter*/ 1048576) rangepips_changes.formatter = /*formatter*/ ctx[20];
    			if (dirty[0] & /*focus*/ 33554432) rangepips_changes.focus = /*focus*/ ctx[25];
    			if (dirty[0] & /*percentOf*/ 16777216) rangepips_changes.percentOf = /*percentOf*/ ctx[24];
    			rangepips.$set(rangepips_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(rangepips.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(rangepips.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(rangepips, detaching);
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*values*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	let if_block0 = /*range*/ ctx[2] && create_if_block_1$1(ctx);
    	let if_block1 = /*pips*/ ctx[11] && create_if_block$1(ctx);

    	return {
    		c() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			attr(div, "id", /*id*/ ctx[17]);
    			attr(div, "class", "rangeSlider");
    			toggle_class(div, "range", /*range*/ ctx[2]);
    			toggle_class(div, "disabled", /*disabled*/ ctx[10]);
    			toggle_class(div, "hoverable", /*hoverable*/ ctx[9]);
    			toggle_class(div, "vertical", /*vertical*/ ctx[6]);
    			toggle_class(div, "reversed", /*reversed*/ ctx[8]);
    			toggle_class(div, "focus", /*focus*/ ctx[25]);
    			toggle_class(div, "min", /*range*/ ctx[2] === 'min');
    			toggle_class(div, "max", /*range*/ ctx[2] === 'max');
    			toggle_class(div, "pips", /*pips*/ ctx[11]);
    			toggle_class(div, "pip-labels", /*all*/ ctx[13] === 'label' || /*first*/ ctx[14] === 'label' || /*last*/ ctx[15] === 'label' || /*rest*/ ctx[16] === 'label');
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append(div, t0);
    			if (if_block0) if_block0.m(div, null);
    			append(div, t1);
    			if (if_block1) if_block1.m(div, null);
    			/*div_binding*/ ctx[51](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen(window, "mousedown", /*bodyInteractStart*/ ctx[40]),
    					listen(window, "touchstart", /*bodyInteractStart*/ ctx[40]),
    					listen(window, "mousemove", /*bodyInteract*/ ctx[41]),
    					listen(window, "touchmove", /*bodyInteract*/ ctx[41]),
    					listen(window, "mouseup", /*bodyMouseUp*/ ctx[42]),
    					listen(window, "touchend", /*bodyTouchEnd*/ ctx[43]),
    					listen(window, "keydown", /*bodyKeyDown*/ ctx[44]),
    					listen(div, "mousedown", /*sliderInteractStart*/ ctx[38]),
    					listen(div, "mouseup", /*sliderInteractEnd*/ ctx[39]),
    					listen(div, "touchstart", prevent_default(/*sliderInteractStart*/ ctx[38])),
    					listen(div, "touchend", prevent_default(/*sliderInteractEnd*/ ctx[39]))
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*orientationStart, $springPositions, activeHandle, ariaLabels, range, values, min, max, prefix, handleFormatter, percentOf, suffix, vertical, disabled, focus, handlePressed, float*/ 1869350109 | dirty[1] & /*sliderBlurHandle, sliderFocusHandle, sliderKeydown*/ 112) {
    				each_value = /*values*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (/*range*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					if_block0.m(div, t1);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*pips*/ ctx[11]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*pips*/ 2048) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*id*/ 131072) {
    				attr(div, "id", /*id*/ ctx[17]);
    			}

    			if (dirty[0] & /*range*/ 4) {
    				toggle_class(div, "range", /*range*/ ctx[2]);
    			}

    			if (dirty[0] & /*disabled*/ 1024) {
    				toggle_class(div, "disabled", /*disabled*/ ctx[10]);
    			}

    			if (dirty[0] & /*hoverable*/ 512) {
    				toggle_class(div, "hoverable", /*hoverable*/ ctx[9]);
    			}

    			if (dirty[0] & /*vertical*/ 64) {
    				toggle_class(div, "vertical", /*vertical*/ ctx[6]);
    			}

    			if (dirty[0] & /*reversed*/ 256) {
    				toggle_class(div, "reversed", /*reversed*/ ctx[8]);
    			}

    			if (dirty[0] & /*focus*/ 33554432) {
    				toggle_class(div, "focus", /*focus*/ ctx[25]);
    			}

    			if (dirty[0] & /*range*/ 4) {
    				toggle_class(div, "min", /*range*/ ctx[2] === 'min');
    			}

    			if (dirty[0] & /*range*/ 4) {
    				toggle_class(div, "max", /*range*/ ctx[2] === 'max');
    			}

    			if (dirty[0] & /*pips*/ 2048) {
    				toggle_class(div, "pips", /*pips*/ ctx[11]);
    			}

    			if (dirty[0] & /*all, first, last, rest*/ 122880) {
    				toggle_class(div, "pip-labels", /*all*/ ctx[13] === 'label' || /*first*/ ctx[14] === 'label' || /*last*/ ctx[15] === 'label' || /*rest*/ ctx[16] === 'label');
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_each(each_blocks, detaching);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			/*div_binding*/ ctx[51](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function index(el) {
    	if (!el) return -1;
    	var i = 0;

    	while (el = el.previousElementSibling) {
    		i++;
    	}

    	return i;
    }

    /**
     * normalise a mouse or touch event to return the
     * client (x/y) object for that event
     * @param {event} e a mouse/touch event to normalise
     * @returns {object} normalised event client object (x,y)
     **/
    function normalisedClient(e) {
    	if (e.type.includes("touch")) {
    		return e.touches[0] || e.changedTouches[0];
    	} else {
    		return e;
    	}
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let percentOf;
    	let clampValue;
    	let alignValueToStep;
    	let orientationStart;
    	let orientationEnd;

    	let $springPositions,
    		$$unsubscribe_springPositions = noop,
    		$$subscribe_springPositions = () => ($$unsubscribe_springPositions(), $$unsubscribe_springPositions = subscribe(springPositions, $$value => $$invalidate(30, $springPositions = $$value)), springPositions);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_springPositions());
    	let { slider = undefined } = $$props;
    	let { range = false } = $$props;
    	let { pushy = false } = $$props;
    	let { min = 0 } = $$props;
    	let { max = 100 } = $$props;
    	let { step = 1 } = $$props;
    	let { values = [(max + min) / 2] } = $$props;
    	let { vertical = false } = $$props;
    	let { float = false } = $$props;
    	let { reversed = false } = $$props;
    	let { hoverable = true } = $$props;
    	let { disabled = false } = $$props;
    	let { pips = false } = $$props;
    	let { pipstep = undefined } = $$props;
    	let { all = undefined } = $$props;
    	let { first = undefined } = $$props;
    	let { last = undefined } = $$props;
    	let { rest = undefined } = $$props;
    	let { id = undefined } = $$props;
    	let { prefix = "" } = $$props;
    	let { suffix = "" } = $$props;
    	let { formatter = (v, i, p) => v } = $$props;
    	let { handleFormatter = formatter } = $$props;
    	let { ariaLabels = [] } = $$props;
    	let { precision = 2 } = $$props;
    	let { springValues = { stiffness: 0.15, damping: 0.4 } } = $$props;

    	// prepare dispatched events
    	const dispatch = createEventDispatcher();

    	// state management
    	let valueLength = 0;

    	let focus = false;
    	let handleActivated = false;
    	let handlePressed = false;
    	let keyboardActive = false;
    	let activeHandle = values.length - 1;
    	let startValue;
    	let previousValue;

    	// copy the initial values in to a spring function which
    	// will update every time the values array is modified
    	let springPositions;

    	/**
     * make sure the value is coerced to a float value
     * @param {number} v the value to fix
     * @return {number} a float version of the input
     **/
    	const fixFloat = v => parseFloat((+v).toFixed(precision));

    	/**
     * check if an element is a handle on the slider
     * @param {object} el dom object reference we want to check
     * @returns {boolean}
     **/
    	function targetIsHandle(el) {
    		const handles = slider.querySelectorAll(".handle");
    		const isHandle = Array.prototype.includes.call(handles, el);
    		const isChild = Array.prototype.some.call(handles, e => e.contains(el));
    		return isHandle || isChild;
    	}

    	/**
     * trim the values array based on whether the property
     * for 'range' is 'min', 'max', or truthy. This is because we
     * do not want more than one handle for a min/max range, and we do
     * not want more than two handles for a true range.
     * @param {array} values the input values for the rangeSlider
     * @return {array} the range array for creating a rangeSlider
     **/
    	function trimRange(values) {
    		if (range === "min" || range === "max") {
    			return values.slice(0, 1);
    		} else if (range) {
    			return values.slice(0, 2);
    		} else {
    			return values;
    		}
    	}

    	/**
     * helper to return the slider dimensions for finding
     * the closest handle to user interaction
     * @return {object} the range slider DOM client rect
     **/
    	function getSliderDimensions() {
    		return slider.getBoundingClientRect();
    	}

    	/**
     * helper to return closest handle to user interaction
     * @param {object} clientPos the client{x,y} positions to check against
     * @return {number} the index of the closest handle to clientPos
     **/
    	function getClosestHandle(clientPos) {
    		// first make sure we have the latest dimensions
    		// of the slider, as it may have changed size
    		const dims = getSliderDimensions();

    		// calculate the interaction position, percent and value
    		let handlePos = 0;

    		let handlePercent = 0;
    		let handleVal = 0;

    		if (vertical) {
    			handlePos = clientPos.clientY - dims.top;
    			handlePercent = handlePos / dims.height * 100;
    			handlePercent = reversed ? handlePercent : 100 - handlePercent;
    		} else {
    			handlePos = clientPos.clientX - dims.left;
    			handlePercent = handlePos / dims.width * 100;
    			handlePercent = reversed ? 100 - handlePercent : handlePercent;
    		}

    		handleVal = (max - min) / 100 * handlePercent + min;
    		let closest;

    		// if we have a range, and the handles are at the same
    		// position, we want a simple check if the interaction
    		// value is greater than return the second handle
    		if (range === true && values[0] === values[1]) {
    			if (handleVal > values[1]) {
    				return 1;
    			} else {
    				return 0;
    			}
    		} else // we sort the handles values, and return the first one closest
    		// to the interaction value
    		{
    			closest = values.indexOf([...values].sort((a, b) => Math.abs(handleVal - a) - Math.abs(handleVal - b))[0]); // if there are multiple handles, and not a range, then
    		}

    		return closest;
    	}

    	/**
     * take the interaction position on the slider, convert
     * it to a value on the range, and then send that value
     * through to the moveHandle() method to set the active
     * handle's position
     * @param {object} clientPos the client{x,y} of the interaction
     **/
    	function handleInteract(clientPos) {
    		// first make sure we have the latest dimensions
    		// of the slider, as it may have changed size
    		const dims = getSliderDimensions();

    		// calculate the interaction position, percent and value
    		let handlePos = 0;

    		let handlePercent = 0;
    		let handleVal = 0;

    		if (vertical) {
    			handlePos = clientPos.clientY - dims.top;
    			handlePercent = handlePos / dims.height * 100;
    			handlePercent = reversed ? handlePercent : 100 - handlePercent;
    		} else {
    			handlePos = clientPos.clientX - dims.left;
    			handlePercent = handlePos / dims.width * 100;
    			handlePercent = reversed ? 100 - handlePercent : handlePercent;
    		}

    		handleVal = (max - min) / 100 * handlePercent + min;

    		// move handle to the value
    		moveHandle(activeHandle, handleVal);
    	}

    	/**
     * move a handle to a specific value, respecting the clamp/align rules
     * @param {number} index the index of the handle we want to move
     * @param {number} value the value to move the handle to
     * @return {number} the value that was moved to (after alignment/clamping)
     **/
    	function moveHandle(index, value) {
    		// align & clamp the value so we're not doing extra
    		// calculation on an out-of-range value down below
    		value = alignValueToStep(value);

    		// use the active handle if handle index is not provided
    		if (typeof index === 'undefined') {
    			index = activeHandle;
    		}

    		// if this is a range slider perform special checks
    		if (range) {
    			// restrict the handles of a range-slider from
    			// going past one-another unless "pushy" is true
    			if (index === 0 && value > values[1]) {
    				if (pushy) {
    					$$invalidate(0, values[1] = value, values);
    				} else {
    					value = values[1];
    				}
    			} else if (index === 1 && value < values[0]) {
    				if (pushy) {
    					$$invalidate(0, values[0] = value, values);
    				} else {
    					value = values[0];
    				}
    			}
    		}

    		// if the value has changed, update it
    		if (values[index] !== value) {
    			$$invalidate(0, values[index] = value, values);
    		}

    		// fire the change event when the handle moves,
    		// and store the previous value for the next time
    		if (previousValue !== value) {
    			eChange();
    			previousValue = value;
    		}

    		return value;
    	}

    	/**
     * helper to find the beginning range value for use with css style
     * @param {array} values the input values for the rangeSlider
     * @return {number} the beginning of the range
     **/
    	function rangeStart(values) {
    		if (range === "min") {
    			return 0;
    		} else {
    			return values[0];
    		}
    	}

    	/**
     * helper to find the ending range value for use with css style
     * @param {array} values the input values for the rangeSlider
     * @return {number} the end of the range
     **/
    	function rangeEnd(values) {
    		if (range === "max") {
    			return 0;
    		} else if (range === "min") {
    			return 100 - values[0];
    		} else {
    			return 100 - values[1];
    		}
    	}

    	/**
     * when the user has unfocussed (blurred) from the
     * slider, deactivate all handles
     * @param {event} e the event from browser
     **/
    	function sliderBlurHandle(e) {
    		if (keyboardActive) {
    			$$invalidate(25, focus = false);
    			handleActivated = false;
    			$$invalidate(26, handlePressed = false);
    		}
    	}

    	/**
     * when the user focusses the handle of a slider
     * set it to be active
     * @param {event} e the event from browser
     **/
    	function sliderFocusHandle(e) {
    		if (!disabled) {
    			$$invalidate(27, activeHandle = index(e.target));
    			$$invalidate(25, focus = true);
    		}
    	}

    	/**
     * handle the keyboard accessible features by checking the
     * input type, and modfier key then moving handle by appropriate amount
     * @param {event} e the event from browser
     **/
    	function sliderKeydown(e) {
    		if (!disabled) {
    			const handle = index(e.target);
    			let jump = e.ctrlKey || e.metaKey || e.shiftKey ? step * 10 : step;
    			let prevent = false;

    			switch (e.key) {
    				case "PageDown":
    					jump *= 10;
    				case "ArrowRight":
    				case "ArrowUp":
    					moveHandle(handle, values[handle] + jump);
    					prevent = true;
    					break;
    				case "PageUp":
    					jump *= 10;
    				case "ArrowLeft":
    				case "ArrowDown":
    					moveHandle(handle, values[handle] - jump);
    					prevent = true;
    					break;
    				case "Home":
    					moveHandle(handle, min);
    					prevent = true;
    					break;
    				case "End":
    					moveHandle(handle, max);
    					prevent = true;
    					break;
    			}

    			if (prevent) {
    				e.preventDefault();
    				e.stopPropagation();
    			}
    		}
    	}

    	/**
     * function to run when the user touches
     * down on the slider element anywhere
     * @param {event} e the event from browser
     **/
    	function sliderInteractStart(e) {
    		if (!disabled) {
    			const el = e.target;
    			const clientPos = normalisedClient(e);

    			// set the closest handle as active
    			$$invalidate(25, focus = true);

    			handleActivated = true;
    			$$invalidate(26, handlePressed = true);
    			$$invalidate(27, activeHandle = getClosestHandle(clientPos));

    			// fire the start event
    			startValue = previousValue = alignValueToStep(values[activeHandle]);

    			eStart();

    			// for touch devices we want the handle to instantly
    			// move to the position touched for more responsive feeling
    			if (e.type === "touchstart" && !el.matches(".pipVal")) {
    				handleInteract(clientPos);
    			}
    		}
    	}

    	/**
     * function to run when the user stops touching
     * down on the slider element anywhere
     * @param {event} e the event from browser
     **/
    	function sliderInteractEnd(e) {
    		// fire the stop event for touch devices
    		if (e.type === "touchend") {
    			eStop();
    		}

    		$$invalidate(26, handlePressed = false);
    	}

    	/**
     * unfocus the slider if the user clicked off of
     * it, somewhere else on the screen
     * @param {event} e the event from browser
     **/
    	function bodyInteractStart(e) {
    		keyboardActive = false;

    		if (focus && e.target !== slider && !slider.contains(e.target)) {
    			$$invalidate(25, focus = false);
    		}
    	}

    	/**
     * send the clientX through to handle the interaction
     * whenever the user moves acros screen while active
     * @param {event} e the event from browser
     **/
    	function bodyInteract(e) {
    		if (!disabled) {
    			if (handleActivated) {
    				handleInteract(normalisedClient(e));
    			}
    		}
    	}

    	/**
     * if user triggers mouseup on the body while
     * a handle is active (without moving) then we
     * trigger an interact event there
     * @param {event} e the event from browser
     **/
    	function bodyMouseUp(e) {
    		if (!disabled) {
    			const el = e.target;

    			// this only works if a handle is active, which can
    			// only happen if there was sliderInteractStart triggered
    			// on the slider, already
    			if (handleActivated) {
    				if (el === slider || slider.contains(el)) {
    					$$invalidate(25, focus = true);

    					// don't trigger interact if the target is a handle (no need) or
    					// if the target is a label (we want to move to that value from rangePips)
    					if (!targetIsHandle(el) && !el.matches(".pipVal")) {
    						handleInteract(normalisedClient(e));
    					}
    				}

    				// fire the stop event for mouse device
    				// when the body is triggered with an active handle
    				eStop();
    			}
    		}

    		handleActivated = false;
    		$$invalidate(26, handlePressed = false);
    	}

    	/**
     * if user triggers touchend on the body then we
     * defocus the slider completely
     * @param {event} e the event from browser
     **/
    	function bodyTouchEnd(e) {
    		handleActivated = false;
    		$$invalidate(26, handlePressed = false);
    	}

    	function bodyKeyDown(e) {
    		if (!disabled) {
    			if (e.target === slider || slider.contains(e.target)) {
    				keyboardActive = true;
    			}
    		}
    	}

    	function eStart() {
    		!disabled && dispatch("start", {
    			activeHandle,
    			value: startValue,
    			values: values.map(v => alignValueToStep(v))
    		});
    	}

    	function eStop() {
    		!disabled && dispatch("stop", {
    			activeHandle,
    			startValue,
    			value: values[activeHandle],
    			values: values.map(v => alignValueToStep(v))
    		});
    	}

    	function eChange() {
    		!disabled && dispatch("change", {
    			activeHandle,
    			startValue,
    			previousValue: typeof previousValue === "undefined"
    			? startValue
    			: previousValue,
    			value: values[activeHandle],
    			values: values.map(v => alignValueToStep(v))
    		});
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			slider = $$value;
    			$$invalidate(1, slider);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('slider' in $$props) $$invalidate(1, slider = $$props.slider);
    		if ('range' in $$props) $$invalidate(2, range = $$props.range);
    		if ('pushy' in $$props) $$invalidate(45, pushy = $$props.pushy);
    		if ('min' in $$props) $$invalidate(3, min = $$props.min);
    		if ('max' in $$props) $$invalidate(4, max = $$props.max);
    		if ('step' in $$props) $$invalidate(5, step = $$props.step);
    		if ('values' in $$props) $$invalidate(0, values = $$props.values);
    		if ('vertical' in $$props) $$invalidate(6, vertical = $$props.vertical);
    		if ('float' in $$props) $$invalidate(7, float = $$props.float);
    		if ('reversed' in $$props) $$invalidate(8, reversed = $$props.reversed);
    		if ('hoverable' in $$props) $$invalidate(9, hoverable = $$props.hoverable);
    		if ('disabled' in $$props) $$invalidate(10, disabled = $$props.disabled);
    		if ('pips' in $$props) $$invalidate(11, pips = $$props.pips);
    		if ('pipstep' in $$props) $$invalidate(12, pipstep = $$props.pipstep);
    		if ('all' in $$props) $$invalidate(13, all = $$props.all);
    		if ('first' in $$props) $$invalidate(14, first = $$props.first);
    		if ('last' in $$props) $$invalidate(15, last = $$props.last);
    		if ('rest' in $$props) $$invalidate(16, rest = $$props.rest);
    		if ('id' in $$props) $$invalidate(17, id = $$props.id);
    		if ('prefix' in $$props) $$invalidate(18, prefix = $$props.prefix);
    		if ('suffix' in $$props) $$invalidate(19, suffix = $$props.suffix);
    		if ('formatter' in $$props) $$invalidate(20, formatter = $$props.formatter);
    		if ('handleFormatter' in $$props) $$invalidate(21, handleFormatter = $$props.handleFormatter);
    		if ('ariaLabels' in $$props) $$invalidate(22, ariaLabels = $$props.ariaLabels);
    		if ('precision' in $$props) $$invalidate(46, precision = $$props.precision);
    		if ('springValues' in $$props) $$invalidate(47, springValues = $$props.springValues);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*min, max*/ 24) {
    			/**
     * clamp a value from the range so that it always
     * falls within the min/max values
     * @param {number} val the value to clamp
     * @return {number} the value after it's been clamped
     **/
    			 $$invalidate(50, clampValue = function (val) {
    				// return the min/max if outside of that range
    				return val <= min ? min : val >= max ? max : val;
    			});
    		}

    		if ($$self.$$.dirty[0] & /*min, max, step*/ 56 | $$self.$$.dirty[1] & /*clampValue*/ 524288) {
    			/**
     * align the value with the steps so that it
     * always sits on the closest (above/below) step
     * @param {number} val the value to align
     * @return {number} the value after it's been aligned
     **/
    			 $$invalidate(49, alignValueToStep = function (val) {
    				// sanity check for performance
    				if (val <= min) {
    					return fixFloat(min);
    				} else if (val >= max) {
    					return fixFloat(max);
    				} else {
    					val = fixFloat(val);
    				}

    				// find the middle-point between steps
    				// and see if the value is closer to the
    				// next step, or previous step
    				let remainder = (val - min) % step;

    				let aligned = val - remainder;

    				if (Math.abs(remainder) * 2 >= step) {
    					aligned += remainder > 0 ? step : -step;
    				}

    				// make sure the value is within acceptable limits
    				aligned = clampValue(aligned);

    				// make sure the returned value is set to the precision desired
    				// this is also because javascript often returns weird floats
    				// when dealing with odd numbers and percentages
    				return fixFloat(aligned);
    			});
    		}

    		if ($$self.$$.dirty[0] & /*min, max*/ 24) {
    			/**
     * take in a value, and then calculate that value's percentage
     * of the overall range (min-max);
     * @param {number} val the value we're getting percent for
     * @return {number} the percentage value
     **/
    			 $$invalidate(24, percentOf = function (val) {
    				let perc = (val - min) / (max - min) * 100;

    				if (isNaN(perc) || perc <= 0) {
    					return 0;
    				} else if (perc >= 100) {
    					return 100;
    				} else {
    					return fixFloat(perc);
    				}
    			});
    		}

    		if ($$self.$$.dirty[0] & /*values, max, min, percentOf, springPositions, ariaLabels*/ 29360153 | $$self.$$.dirty[1] & /*alignValueToStep, valueLength, springValues*/ 458752) {
    			 {
    				// check that "values" is an array, or set it as array
    				// to prevent any errors in springs, or range trimming
    				if (!Array.isArray(values)) {
    					$$invalidate(0, values = [(max + min) / 2]);
    					console.error("'values' prop should be an Array (https://github.com/simeydotme/svelte-range-slider-pips#slider-props)");
    				}

    				// trim the range so it remains as a min/max (only 2 handles)
    				// and also align the handles to the steps
    				const trimmedAlignedValues = trimRange(values.map(v => alignValueToStep(v)));

    				if (!(values.length === trimmedAlignedValues.length) || !values.every((element, index) => fixFloat(element) === trimmedAlignedValues[index])) {
    					$$invalidate(0, values = trimmedAlignedValues);
    				}

    				// check if the valueLength (length of values[]) has changed,
    				// because if so we need to re-seed the spring function with the
    				// new values array.
    				if (valueLength !== values.length) {
    					// set the initial spring values when the slider initialises,
    					// or when values array length has changed
    					$$subscribe_springPositions($$invalidate(23, springPositions = spring(values.map(v => percentOf(v)), springValues)));
    				} else {
    					// update the value of the spring function for animated handles
    					// whenever the values has updated
    					springPositions.set(values.map(v => percentOf(v)));
    				}

    				// set the valueLength for the next check
    				$$invalidate(48, valueLength = values.length);

    				if (values.length > 1 && !Array.isArray(ariaLabels)) {
    					console.warn(`'ariaLabels' prop should be an Array (https://github.com/simeydotme/svelte-range-slider-pips#slider-props)`);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*vertical, reversed*/ 320) {
    			/**
     * the orientation of the handles/pips based on the
     * input values of vertical and reversed
     **/
    			 $$invalidate(29, orientationStart = vertical
    			? reversed ? 'top' : 'bottom'
    			: reversed ? 'right' : 'left');
    		}

    		if ($$self.$$.dirty[0] & /*vertical, reversed*/ 320) {
    			 $$invalidate(28, orientationEnd = vertical
    			? reversed ? 'bottom' : 'top'
    			: reversed ? 'left' : 'right');
    		}
    	};

    	return [
    		values,
    		slider,
    		range,
    		min,
    		max,
    		step,
    		vertical,
    		float,
    		reversed,
    		hoverable,
    		disabled,
    		pips,
    		pipstep,
    		all,
    		first,
    		last,
    		rest,
    		id,
    		prefix,
    		suffix,
    		formatter,
    		handleFormatter,
    		ariaLabels,
    		springPositions,
    		percentOf,
    		focus,
    		handlePressed,
    		activeHandle,
    		orientationEnd,
    		orientationStart,
    		$springPositions,
    		fixFloat,
    		moveHandle,
    		rangeStart,
    		rangeEnd,
    		sliderBlurHandle,
    		sliderFocusHandle,
    		sliderKeydown,
    		sliderInteractStart,
    		sliderInteractEnd,
    		bodyInteractStart,
    		bodyInteract,
    		bodyMouseUp,
    		bodyTouchEnd,
    		bodyKeyDown,
    		pushy,
    		precision,
    		springValues,
    		valueLength,
    		alignValueToStep,
    		clampValue,
    		div_binding
    	];
    }

    class RangeSlider extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(
    			this,
    			options,
    			instance$1,
    			create_fragment$1,
    			safe_not_equal,
    			{
    				slider: 1,
    				range: 2,
    				pushy: 45,
    				min: 3,
    				max: 4,
    				step: 5,
    				values: 0,
    				vertical: 6,
    				float: 7,
    				reversed: 8,
    				hoverable: 9,
    				disabled: 10,
    				pips: 11,
    				pipstep: 12,
    				all: 13,
    				first: 14,
    				last: 15,
    				rest: 16,
    				id: 17,
    				prefix: 18,
    				suffix: 19,
    				formatter: 20,
    				handleFormatter: 21,
    				ariaLabels: 22,
    				precision: 46,
    				springValues: 47
    			},
    			add_css$1,
    			[-1, -1, -1]
    		);
    	}
    }

    return RangeSlider;

})));
