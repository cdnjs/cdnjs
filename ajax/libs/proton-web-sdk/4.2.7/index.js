/**
 * Proton Web SDK v4.2.7
 * undefined
 *
 * @license
 * MIT License
 * 
 * Copyright (c) 2020 jafri
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import ProtonLinkBrowserTransport from '@proton/browser-transport';
import ProtonLink from '@proton/link';
import { JsonRpc } from '@proton/js';

/******************************************************************************
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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const CustomStyleOptionsToVarsMap = new Map([
    ['modalBackgroundColor', 'proton-wallet-modal-bgcolor'],
    ['logoBackgroundColor', 'proton-wallet-color-bglogo'],
    ['optionBackgroundColor', 'proton-wallet-option-bg'],
    ['optionFontColor', 'proton-wallet-option-font'],
    ['primaryFontColor', 'proton-wallet-color-font-primary'],
    ['secondaryFontColor', 'proton-wallet-color-font-secondary'],
    ['linkColor', 'proton-wallet-color-link'],
]);

function noop() { }
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
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
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
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
function self(fn) {
    return function (event) {
        // @ts-ignore
        if (event.target === this)
            fn.call(this, event);
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

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

/* src/views/Header.svelte generated by Svelte v3.49.0 */

const file$3 = "src/views/Header.svelte";

function add_css$3(target) {
	append_styles(target, "svelte-m77c1p", ".wallet-selector-connect-header{display:flex;flex-direction:column;align-items:center}.wallet-selector-logo{width:100px;height:100px;background:var(--proton-wallet-color-bglogo, var(--color-logo-bgdefault))}.wallet-selector-logo.is-rounded{width:120px;height:120px;padding:10px;margin-bottom:10px;border:1px solid rgba(161, 165, 176, 0.23);border-radius:50%}.wallet-selector-title{font-size:16px;font-family:\"Circular Std Book\", sans-serif;line-height:24px;color:var(--proton-wallet-color-font-primary, var(--color-font-primary));text-align:center}.wallet-selector-subtitle{font-size:16px;font-family:\"Circular Std Book\", sans-serif;line-height:24px;color:var(--proton-wallet-color-font-secondary, var(--color-font-secondary));text-align:center}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFFSSwrQkFBQSxBQUFBLENBQUEsQUFDRSxPQUFBLENBQUEsSUFBQSxDQUNBLGNBQUEsQ0FBQSxNQUFBLENBQ0EsV0FBQSxDQUFBLE1BQUEsQUNrQk4sQ0FBQSxBRGZJLHFCQUFBLEFBQUEsQ0FBQSxBQUNFLEtBQUEsQ0FBQSxLQUFBLENBQ0EsTUFBQSxDQUFBLEtBQUEsQ0FDQSxVQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLDRCQUFBLENBQUEsQUNpQk4sQ0FBQSxBRFpNLGdDQUFBLEFBQUEsQ0FBQSxBQUNFLEtBQUEsQ0FBQSxLQUFBLENBQ0EsTUFBQSxDQUFBLEtBQUEsQ0FDQSxPQUFBLENBQUEsSUFBQSxDQUNBLGFBQUEsQ0FBQSxJQUFBLENBQ0EsTUFBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FDQSxhQUFBLENBQUEsR0FBQSxBQ2NSLENBQUEsQURWSSxzQkFBQSxBQUFBLENBQUEsQUFDRSxTQUFBLENBQUEsSUFBQSxDQUNBLFdBQUEsQ0FBQSxtQkFBQSxDQUFBLENBQUEsVUFBQSxDQUNBLFdBQUEsQ0FBQSxJQUFBLENBQ0EsS0FBQSxDQUFBLElBQUEsa0NBQUEsQ0FBQSwwQkFBQSxDQUFBLENBQ0EsVUFBQSxDQUFBLE1BQUEsQUNZTixDQUFBLEFEVEkseUJBQUEsQUFBQSxDQUFBLEFBQ0UsU0FBQSxDQUFBLElBQUEsQ0FDQSxXQUFBLENBQUEsbUJBQUEsQ0FBQSxDQUFBLFVBQUEsQ0FDQSxXQUFBLENBQUEsSUFBQSxDQUNBLEtBQUEsQ0FBQSxJQUFBLG9DQUFBLENBQUEsNEJBQUEsQ0FBQSxDQUlBLFVBQUEsQ0FBQSxNQUFBLEFDUU4sQ0FjQSIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJmaWxlOi8vL1VzZXJzL2phZnJpL1dvcmsvcHJvdG9uL3Byb3Rvbi13ZWItc2RrL3BhY2thZ2VzL3Byb3Rvbi13ZWItc2RrL3NyYy92aWV3cy9IZWFkZXIuc3ZlbHRlIiwiSGVhZGVyLnN2ZWx0ZSJdfQ== */");
}

// (8:2) {#if logo}
function create_if_block_2(ctx) {
	let img;
	let img_src_value;

	const block = {
		c: function create() {
			img = element("img");
			attr_dev(img, "class", "wallet-selector-logo");
			if (!src_url_equal(img.src, img_src_value = /*logo*/ ctx[1])) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "app-logo");
			toggle_class(img, "is-rounded", /*isLogoRound*/ ctx[0]);
			add_location(img, file$3, 8, 4, 194);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*logo*/ 2 && !src_url_equal(img.src, img_src_value = /*logo*/ ctx[1])) {
				attr_dev(img, "src", img_src_value);
			}

			if (dirty & /*isLogoRound*/ 1) {
				toggle_class(img, "is-rounded", /*isLogoRound*/ ctx[0]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(8:2) {#if logo}",
		ctx
	});

	return block;
}

// (15:2) {#if title}
function create_if_block_1(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text(/*title*/ ctx[2]);
			attr_dev(span, "class", "wallet-selector-title");
			add_location(span, file$3, 14, 13, 334);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(15:2) {#if title}",
		ctx
	});

	return block;
}

// (16:2) {#if subtitle}
function create_if_block$1(ctx) {
	let span;
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text(/*subtitle*/ ctx[3]);
			attr_dev(span, "class", "wallet-selector-subtitle");
			add_location(span, file$3, 15, 16, 406);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*subtitle*/ 8) set_data_dev(t, /*subtitle*/ ctx[3]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(16:2) {#if subtitle}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let div;
	let t0;
	let t1;
	let if_block0 = /*logo*/ ctx[1] && create_if_block_2(ctx);
	let if_block1 = /*title*/ ctx[2] && create_if_block_1(ctx);
	let if_block2 = /*subtitle*/ ctx[3] && create_if_block$1(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if (if_block2) if_block2.c();
			attr_dev(div, "class", "wallet-selector-connect-header");
			add_location(div, file$3, 6, 0, 132);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append_dev(div, t0);
			if (if_block1) if_block1.m(div, null);
			append_dev(div, t1);
			if (if_block2) if_block2.m(div, null);
		},
		p: function update(ctx, [dirty]) {
			if (/*logo*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					if_block0.m(div, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*title*/ ctx[2]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					if_block1.m(div, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*subtitle*/ ctx[3]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block$1(ctx);
					if_block2.c();
					if_block2.m(div, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Header', slots, []);
	let { isLogoRound = false } = $$props;
	let { logo = '' } = $$props;
	let { title = '' } = $$props;
	let { subtitle = '' } = $$props;
	const writable_props = ['isLogoRound', 'logo', 'title', 'subtitle'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('isLogoRound' in $$props) $$invalidate(0, isLogoRound = $$props.isLogoRound);
		if ('logo' in $$props) $$invalidate(1, logo = $$props.logo);
		if ('title' in $$props) $$invalidate(2, title = $$props.title);
		if ('subtitle' in $$props) $$invalidate(3, subtitle = $$props.subtitle);
	};

	$$self.$capture_state = () => ({ isLogoRound, logo, title, subtitle });

	$$self.$inject_state = $$props => {
		if ('isLogoRound' in $$props) $$invalidate(0, isLogoRound = $$props.isLogoRound);
		if ('logo' in $$props) $$invalidate(1, logo = $$props.logo);
		if ('title' in $$props) $$invalidate(2, title = $$props.title);
		if ('subtitle' in $$props) $$invalidate(3, subtitle = $$props.subtitle);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [isLogoRound, logo, title, subtitle];
}

class Header extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance$3,
			create_fragment$3,
			safe_not_equal,
			{
				isLogoRound: 0,
				logo: 1,
				title: 2,
				subtitle: 3
			},
			add_css$3
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Header",
			options,
			id: create_fragment$3.name
		});
	}

	get isLogoRound() {
		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isLogoRound(value) {
		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get logo() {
		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set logo(value) {
		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get subtitle() {
		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set subtitle(value) {
		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/views/Footer.svelte generated by Svelte v3.49.0 */

const file$2 = "src/views/Footer.svelte";

function add_css$2(target) {
	append_styles(target, "svelte-6pib6l", ".wallet-selector-footnote{margin-top:5px;display:flex;justify-content:space-between;position:relative;font-family:\"Circular Std Book\", sans-serif;font-size:16px;text-align:center;color:white !important;height:50px;width:360px}.wallet-selector-footnote a{color:#ffffff !important;width:170px}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9vdGVyLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFDRSx5QkFBQSxBQUFBLENBQUEsQUFDRSxVQUFBLENBQUEsR0FBQSxDQUNBLE9BQUEsQ0FBQSxJQUFBLENBQ0EsZUFBQSxDQUFBLGFBQUEsQ0FDQSxRQUFBLENBQUEsUUFBQSxDQUNBLFdBQUEsQ0FBQSxtQkFBQSxDQUFBLENBQUEsVUFBQSxDQUNBLFNBQUEsQ0FBQSxJQUFBLENBQ0EsVUFBQSxDQUFBLE1BQUEsQ0FDQSxLQUFBLENBQUEsS0FBQSxDQUFBLFVBQUEsQ0FFQSxNQUFBLENBQUEsSUFBQSxDQUNBLEtBQUEsQ0FBQSxLQUFBLEFDc0JKLENBQUEsQURwQkkseUJBQUEsQUFBQSxDQUFBLEFBQUEsQ0FBQSxBQUFBLENBQUEsQUFDRSxLQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsQ0FDQSxLQUFBLENBQUEsS0FBQSxBQ3NCTixDQUlBIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbImZpbGU6Ly8vVXNlcnMvamFmcmkvV29yay9wcm90b24vcHJvdG9uLXdlYi1zZGsvcGFja2FnZXMvcHJvdG9uLXdlYi1zZGsvc3JjL3ZpZXdzL0Zvb3Rlci5zdmVsdGUiLCJGb290ZXIuc3ZlbHRlIl19 */");
}

function create_fragment$2(ctx) {
	let div;
	let a0;
	let img0;
	let img0_src_value;
	let t;
	let a1;
	let img1;
	let img1_src_value;

	const block = {
		c: function create() {
			div = element("div");
			a0 = element("a");
			img0 = element("img");
			t = space();
			a1 = element("a");
			img1 = element("img");
			attr_dev(img0, "alt", "Download on the App Store");
			if (!src_url_equal(img0.src, img0_src_value = "https://proton.org/static/719169dd7ea5089ae32be4dcae845078/DownloadApple.svg")) attr_dev(img0, "src", img0_src_value);
			add_location(img0, file$2, 6, 4, 151);
			attr_dev(a0, "href", "https://apps.apple.com/us/app/webauth-com/id1594500069");
			attr_dev(a0, "id", "iOS");
			attr_dev(a0, "target", "_blank");
			add_location(a0, file$2, 1, 2, 41);
			attr_dev(img1, "alt", "Get it on Google Play");
			if (!src_url_equal(img1.src, img1_src_value = "https://proton.org/static/b36e63520d1db11b0ce4989b73866ae0/DownloadGoogleEN.svg")) attr_dev(img1, "src", img1_src_value);
			add_location(img1, file$2, 16, 4, 427);
			attr_dev(a1, "href", "https://play.google.com/store/apps/details?id=com.metallicus.webauth");
			attr_dev(a1, "id", "Android");
			attr_dev(a1, "target", "_blank");
			add_location(a1, file$2, 11, 2, 299);
			attr_dev(div, "class", "wallet-selector-footnote");
			add_location(div, file$2, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, a0);
			append_dev(a0, img0);
			append_dev(div, t);
			append_dev(div, a1);
			append_dev(a1, img1);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Footer', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
	});

	return [];
}

class Footer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {}, add_css$2);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Footer",
			options,
			id: create_fragment$2.name
		});
	}
}

/* src/views/Wallet.svelte generated by Svelte v3.49.0 */
const file$1 = "src/views/Wallet.svelte";

function add_css$1(target) {
	append_styles(target, "svelte-1fb7dp3", ".wallet-selector-wallet{background:var(--proton-wallet-option-bg, var(--color-option-bg));display:flex;align-items:center;padding:20px 20px 20px 16px;border:1px solid rgba(161, 165, 176, 0.23)}.wallet-selector-wallet:hover{cursor:pointer}.wallet-selector-wallet:hover .wallet-selector-right-arrow{background-image:url(\"data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 1)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E\")}.wallet-selector-wallet+.wallet-selector-wallet{margin-top:8px}.wallet-selector-logo{width:40px;height:40px;background-repeat:no-repeat;background-position:50%;background-size:30px}.wallet-selector-logo--proton{background-image:url(\"data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='mobile-android-alt' style='color: %23752EEB;' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='currentColor' d='M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-64 452c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v8zm64-80c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z'%3E%3C/path%3E%3C/svg%3E\");background-size:20px}.wallet-selector-logo--webauth{background-image:url(\"data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='browser' style='color: %23752EEB;' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='currentColor' d='M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM48 92c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V92zm416 334c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V168h416v258zm0-310c0 6.6-5.4 12-12 12H172c-6.6 0-12-5.4-12-12V92c0-6.6 5.4-12 12-12h280c6.6 0 12 5.4 12 12v24z'%3E%3C/path%3E%3C/svg%3E\")}.wallet-selector-logo--anchor{background-image:url(\"data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='desktop' style='color: %23752EEB;' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='currentColor' d='M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z'%3E%3C/path%3E%3C/svg%3E\")}.wallet-selector-wallet-name{font-family:\"Circular Std Book\", sans-serif;font-size:16px;line-height:24px;color:var(--proton-wallet-option-font, var(--color-option-font));margin-left:20px}.wallet-selector-right-arrow{background-image:url(\"data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 0.7)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E\");width:10px;height:20px;background-size:10px;background-repeat:no-repeat;background-position:50%;margin-left:auto}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFFSSx1QkFBQSxBQUFBLENBQUEsQUFDRSxVQUFBLENBQUEsSUFBQSx5QkFBQSxDQUFBLHVCQUFBLENBQUEsQ0FDQSxPQUFBLENBQUEsSUFBQSxDQUNBLFdBQUEsQ0FBQSxNQUFBLENBQ0EsT0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FDQSxNQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxBQ3NCTixDQUFBLEFEcEJNLDZCQUFBLEFBQUEsQ0FBQSxBQUNFLE1BQUEsQ0FBQSxPQUFBLEFDc0JSLENBQUEsQURwQlEsNkJBQUEsQUFBQSxDQUFBLEFBQUEsNEJBQUEsQUFBQSxDQUFBLEFBQ0UsZ0JBQUEsQ0FBQSxJQUFBLDhqQkFBQSxDQUFBLEFDc0JWLENBQUEsQURsQk0sdUJBQUEsQUFBQSxDQUFBLHVCQUFBLEFBQUEsQ0FBQSxBQUNFLFVBQUEsQ0FBQSxHQUFBLEFDb0JSLENBQUEsQURoQkkscUJBQUEsQUFBQSxDQUFBLEFBQ0UsS0FBQSxDQUFBLElBQUEsQ0FDQSxNQUFBLENBQUEsSUFBQSxDQUNBLGlCQUFBLENBQUEsU0FBQSxDQUNBLG1CQUFBLENBQUEsR0FBQSxDQUNBLGVBQUEsQ0FBQSxJQUFBLEFDa0JOLENBQUEsQURoQk0sNkJBQUEsQUFBQSxDQUFBLEFBQ0UsZ0JBQUEsQ0FBQSxJQUFBLHFqQkFBQSxDQUFBLENBQ0EsZUFBQSxDQUFBLElBQUEsQUNrQlIsQ0FBQSxBRGZNLDhCQUFBLEFBQUEsQ0FBQSxBQUNFLGdCQUFBLENBQUEsSUFBQSxtbUJBQUEsQ0FBQSxBQ2lCUixDQUFBLEFEZE0sNkJBQUEsQUFBQSxDQUFBLEFBQ0UsZ0JBQUEsQ0FBQSxJQUFBLG1lQUFBLENBQUEsQUNnQlIsQ0FBQSxBRFpJLDRCQUFBLEFBQUEsQ0FBQSxBQUNFLFdBQUEsQ0FBQSxtQkFBQSxDQUFBLENBQUEsVUFBQSxDQUNBLFNBQUEsQ0FBQSxJQUFBLENBQ0EsV0FBQSxDQUFBLElBQUEsQ0FDQSxLQUFBLENBQUEsSUFBQSwyQkFBQSxDQUFBLHlCQUFBLENBQUEsQ0FDQSxXQUFBLENBQUEsSUFBQSxBQ2NOLENBQUEsQURYSSw0QkFBQSxBQUFBLENBQUEsQUFDRSxnQkFBQSxDQUFBLElBQUEsZ2tCQUFBLENBQUEsQ0FDQSxLQUFBLENBQUEsSUFBQSxDQUNBLE1BQUEsQ0FBQSxJQUFBLENBQ0EsZUFBQSxDQUFBLElBQUEsQ0FDQSxpQkFBQSxDQUFBLFNBQUEsQ0FDQSxtQkFBQSxDQUFBLEdBQUEsQ0FDQSxXQUFBLENBQUEsSUFBQSxBQ2FOLENBYUEiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiZmlsZTovLy9Vc2Vycy9qYWZyaS9Xb3JrL3Byb3Rvbi9wcm90b24td2ViLXNkay9wYWNrYWdlcy9wcm90b24td2ViLXNkay9zcmMvdmlld3MvV2FsbGV0LnN2ZWx0ZSIsIldhbGxldC5zdmVsdGUiXX0= */");
}

function create_fragment$1(ctx) {
	let li;
	let div0;
	let div0_class_value;
	let t0;
	let span;
	let t1_value = /*wallet*/ ctx[0].value + "";
	let t1;
	let t2;
	let div1;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			li = element("li");
			div0 = element("div");
			t0 = space();
			span = element("span");
			t1 = text(t1_value);
			t2 = space();
			div1 = element("div");
			attr_dev(div0, "class", div0_class_value = "wallet-selector-logo" + /*walletTypeClass*/ ctx[1]);
			add_location(div0, file$1, 12, 2, 391);
			attr_dev(span, "class", "wallet-selector-wallet-name");
			add_location(span, file$1, 13, 2, 447);
			attr_dev(div1, "class", "wallet-selector-right-arrow");
			add_location(div1, file$1, 14, 2, 513);
			attr_dev(li, "class", "wallet-selector-wallet");
			add_location(li, file$1, 11, 0, 313);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, div0);
			append_dev(li, t0);
			append_dev(li, span);
			append_dev(span, t1);
			append_dev(li, t2);
			append_dev(li, div1);

			if (!mounted) {
				dispose = listen_dev(li, "click", stop_propagation(/*selectWallet*/ ctx[2]), false, false, true);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*walletTypeClass*/ 2 && div0_class_value !== (div0_class_value = "wallet-selector-logo" + /*walletTypeClass*/ ctx[1])) {
				attr_dev(div0, "class", div0_class_value);
			}

			if (dirty & /*wallet*/ 1 && t1_value !== (t1_value = /*wallet*/ ctx[0].value + "")) set_data_dev(t1, t1_value);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let walletTypeClass;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Wallet', slots, []);
	const dispatch = createEventDispatcher();
	let { wallet } = $$props;

	function selectWallet() {
		dispatch('select-wallet', { walletName: wallet.key });
	}

	const writable_props = ['wallet'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Wallet> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('wallet' in $$props) $$invalidate(0, wallet = $$props.wallet);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		dispatch,
		wallet,
		selectWallet,
		walletTypeClass
	});

	$$self.$inject_state = $$props => {
		if ('wallet' in $$props) $$invalidate(0, wallet = $$props.wallet);
		if ('walletTypeClass' in $$props) $$invalidate(1, walletTypeClass = $$props.walletTypeClass);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*wallet*/ 1) {
			$$invalidate(1, walletTypeClass = ` wallet-selector-logo--${wallet.key.toLowerCase()}`);
		}
	};

	return [wallet, walletTypeClass, selectWallet];
}

class Wallet extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { wallet: 0 }, add_css$1);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Wallet",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*wallet*/ ctx[0] === undefined && !('wallet' in props)) {
			console.warn("<Wallet> was created without expected prop 'wallet'");
		}
	}

	get wallet() {
		throw new Error("<Wallet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set wallet(value) {
		throw new Error("<Wallet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/views/Dialog.svelte generated by Svelte v3.49.0 */
const file = "src/views/Dialog.svelte";

function add_css(target) {
	append_styles(target, "svelte-18oz4ly", ".wallet-selector{--color-font-primary:black;--color-font-secondary:#a1a5b0;--color-link:#00aaef;--color-bgdefault:#ffffff;--color-logo-bgdefault:transparent;--color-option-bg:transparent;--color-option-font:#000531;font-family:\"Circular Std Book\", -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;font-size:13px;background:rgba(0, 0, 0, 0.65);position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:2147483647;display:none;align-items:center;justify-content:center}.wallet-selector *{box-sizing:border-box;line-height:1}.wallet-selector-active{display:flex;flex-direction:column}.wallet-selector-inner{background:var(--proton-wallet-modal-bgcolor, var(--color-bgdefault));color:white;margin:20px 20px 13px 20px;padding-top:50px;border-radius:10px;box-shadow:0px -10px 50px rgba(0, 0, 0, 0.5) !important;width:360px;transition-property:all;transition-duration:0.5s;transition-timing-function:ease-in-out;position:relative}.wallet-selector-close{display:block;position:absolute;top:16px;right:16px;width:28px;height:28px;background-image:url(\"data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.66 10.987L6 7.327l-3.66 3.66A1.035 1.035 0 11.876 9.523l3.66-3.66-3.66-3.66A1.035 1.035 0 012.34.737L6 4.398 9.66.739a1.035 1.035 0 111.464 1.464l-3.66 3.66 3.66 3.661a1.035 1.035 0 11-1.464 1.464z' fill='rgba(161, 165, 176, 0.7)' fill-rule='nonzero'/%3E%3C/svg%3E\");background-size:14px;background-repeat:no-repeat;background-position:50%;cursor:pointer;transition:background-image 0.2s ease}.wallet-selector-close:hover{background-image:url(\"data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.66 10.987L6 7.327l-3.66 3.66A1.035 1.035 0 11.876 9.523l3.66-3.66-3.66-3.66A1.035 1.035 0 012.34.737L6 4.398 9.66.739a1.035 1.035 0 111.464 1.464l-3.66 3.66 3.66 3.661a1.035 1.035 0 11-1.464 1.464z' fill='rgba(161, 165, 176, 1)' fill-rule='nonzero'/%3E%3C/svg%3E\");transition:background-image 0.2s ease}.wallet-selector-connect{padding:0px 20px;border-radius:10px;border-top-left-radius:0;border-top-right-radius:0;background:var(--proton-wallet-modal-bgcolor, var(--color-bgdefault))}.wallet-selector-connect-body{margin-top:35px}.wallet-selector-wallet-list{margin:0px;padding:0px;list-style:none}.wallet-selector-tos-agreement{font-family:\"Circular Std Book\", sans-serif;font-size:12px;line-height:16px;text-align:center;margin-top:35px;margin-bottom:30px;color:var(--proton-wallet-color-font-secondary, var(--color-font-secondary))}.wallet-selector-tos-link{color:var(--proton-wallet-color-link, var(--color-link));text-decoration:none}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlhbG9nLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFDRSxnQkFBQSxBQUFBLENBQUEsQUFDRSxvQkFBQSxDQUFBLEtBQUEsQ0FDQSxzQkFBQSxDQUFBLE9BQUEsQ0FDQSxZQUFBLENBQUEsT0FBQSxDQUNBLGlCQUFBLENBQUEsT0FBQSxDQUNBLHNCQUFBLENBQUEsV0FBQSxDQUNBLGlCQUFBLENBQUEsV0FBQSxDQUNBLG1CQUFBLENBQUEsT0FBQSxDQUVBLFdBQUEsQ0FBQSxtQkFBQSxDQUFBLENBQUEsYUFBQSxDQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsa0JBQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLGdCQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxVQUFBLENBR0EsU0FBQSxDQUFBLElBQUEsQ0FDQSxVQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FDQSxRQUFBLENBQUEsS0FBQSxDQUNBLEdBQUEsQ0FBQSxHQUFBLENBQ0EsSUFBQSxDQUFBLEdBQUEsQ0FDQSxLQUFBLENBQUEsSUFBQSxDQUNBLE1BQUEsQ0FBQSxJQUFBLENBQ0EsT0FBQSxDQUFBLFVBQUEsQ0FDQSxPQUFBLENBQUEsSUFBQSxDQUNBLFdBQUEsQ0FBQSxNQUFBLENBQ0EsZUFBQSxDQUFBLE1BQUEsQUNtREosQ0FBQSxBRGpESSxnQkFBQSxBQUFBLENBQUEsQUFBQSxDQUFBLEFBQUEsQ0FBQSxBQUNFLFVBQUEsQ0FBQSxVQUFBLENBQ0EsV0FBQSxDQUFBLENBQUEsQ0FHRix1QkFBQSxBQUFBLENBQUEsQUFDRSxPQUFBLENBQUEsSUFBQSxDQUNBLGNBQUEsQ0FBQSxNQUFBLEFDa0ROLENBQUEsQUQvQ0ksc0JBQUEsQUFBQSxDQUFBLEFBQ0UsVUFBQSxDQUFBLElBQUEsNkJBQUEsQ0FBQSx1QkFBQSxDQUFBLENBQ0EsS0FBQSxDQUFBLEtBQUEsQ0FDQSxNQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUNBLFdBQUEsQ0FBQSxJQUFBLENBQ0EsYUFBQSxDQUFBLElBQUEsQ0FDQSxVQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLENBQ0EsS0FBQSxDQUFBLEtBQUEsQ0FDQSxtQkFBQSxDQUFBLEdBQUEsQ0FDQSxtQkFBQSxDQUFBLElBQUEsQ0FDQSwwQkFBQSxDQUFBLFdBQUEsQ0FDQSxRQUFBLENBQUEsUUFBQSxBQ2lETixDQUFBLEFEOUNJLHNCQUFBLEFBQUEsQ0FBQSxBQUNFLE9BQUEsQ0FBQSxLQUFBLENBQ0EsUUFBQSxDQUFBLFFBQUEsQ0FDQSxHQUFBLENBQUEsSUFBQSxDQUNBLEtBQUEsQ0FBQSxJQUFBLENBQ0EsS0FBQSxDQUFBLElBQUEsQ0FDQSxNQUFBLENBQUEsSUFBQSxDQUNBLGdCQUFBLENBQUEsSUFBQSw4V0FBQSxDQUFBLENBQ0EsZUFBQSxDQUFBLElBQUEsQ0FDQSxpQkFBQSxDQUFBLFNBQUEsQ0FDQSxtQkFBQSxDQUFBLEdBQUEsQ0FDQSxNQUFBLENBQUEsT0FBQSxDQUNBLFVBQUEsQ0FBQSxnQkFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEFDZ0ROLENBQUEsQUQ5Q00sNEJBQUEsQUFBQSxDQUFBLEFBQ0UsZ0JBQUEsQ0FBQSxJQUFBLDRXQUFBLENBQUEsQ0FDQSxVQUFBLENBQUEsZ0JBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxBQ2dEUixDQUFBLEFENUNJLHdCQUFBLEFBQUEsQ0FBQSxBQUNFLE9BQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUNBLGFBQUEsQ0FBQSxJQUFBLENBQ0Esc0JBQUEsQ0FBQSxDQUFBLENBQ0EsdUJBQUEsQ0FBQSxDQUFBLENBQ0EsVUFBQSxDQUFBLElBQUEsNkJBQUEsQ0FBQSx1QkFBQSxDQUFBLEFDOENOLENBQUEsQUQ1Q00sNkJBQUEsQUFBQSxDQUFBLEFBQ0UsVUFBQSxDQUFBLElBQUEsQUM4Q1IsQ0FBQSxBRDFDSSw0QkFBQSxBQUFBLENBQUEsQUFDRSxNQUFBLENBQUEsR0FBQSxDQUNBLE9BQUEsQ0FBQSxHQUFBLENBQ0EsVUFBQSxDQUFBLElBQUEsQUM0Q04sQ0FBQSxBRHpDSSw4QkFBQSxBQUFBLENBQUEsQUFDRSxXQUFBLENBQUEsbUJBQUEsQ0FBQSxDQUFBLFVBQUEsQ0FDQSxTQUFBLENBQUEsSUFBQSxDQUNBLFdBQUEsQ0FBQSxJQUFBLENBQ0EsVUFBQSxDQUFBLE1BQUEsQ0FDQSxVQUFBLENBQUEsSUFBQSxDQUNBLGFBQUEsQ0FBQSxJQUFBLENBQ0EsS0FBQSxDQUFBLElBQUEsb0NBQUEsQ0FBQSw0QkFBQSxDQUFBLEFDMkNOLENBQUEsQURyQ0kseUJBQUEsQUFBQSxDQUFBLEFBQ0UsS0FBQSxDQUFBLElBQUEsMEJBQUEsQ0FBQSxrQkFBQSxDQUFBLENBQ0EsZUFBQSxDQUFBLElBQUEsQUN1Q04sQ0FrQkEiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiZmlsZTovLy9Vc2Vycy9qYWZyaS9Xb3JrL3Byb3Rvbi9wcm90b24td2ViLXNkay9wYWNrYWdlcy9wcm90b24td2ViLXNkay9zcmMvdmlld3MvRGlhbG9nLnN2ZWx0ZSIsIkRpYWxvZy5zdmVsdGUiXX0= */");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i];
	return child_ctx;
}

// (28:8) {#if wallets && wallets.length}
function create_if_block(ctx) {
	let ul;
	let current;
	let each_value = /*wallets*/ ctx[5];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(ul, "class", "wallet-selector-wallet-list");
			add_location(ul, file, 28, 10, 825);
		},
		m: function mount(target, anchor) {
			insert_dev(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*wallets*/ 32) {
				each_value = /*wallets*/ ctx[5];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(ul);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(28:8) {#if wallets && wallets.length}",
		ctx
	});

	return block;
}

// (30:12) {#each wallets as wallet}
function create_each_block(ctx) {
	let wallet;
	let current;

	wallet = new Wallet({
			props: { wallet: /*wallet*/ ctx[9] },
			$$inline: true
		});

	wallet.$on("select-wallet", /*select_wallet_handler*/ ctx[7]);

	const block = {
		c: function create() {
			create_component(wallet.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(wallet, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const wallet_changes = {};
			if (dirty & /*wallets*/ 32) wallet_changes.wallet = /*wallet*/ ctx[9];
			wallet.$set(wallet_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(wallet.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(wallet.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(wallet, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(30:12) {#each wallets as wallet}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div4;
	let div3;
	let div1;
	let header;
	let t0;
	let div0;
	let t1;
	let p;
	let t2;
	let a;
	let t4;
	let div2;
	let t5;
	let footer;
	let current;
	let mounted;
	let dispose;

	header = new Header({
			props: {
				title: /*title*/ ctx[1],
				subtitle: /*subtitle*/ ctx[2],
				logo: /*appLogo*/ ctx[3],
				isLogoRound: /*hasRoundedLogo*/ ctx[4]
			},
			$$inline: true
		});

	let if_block = /*wallets*/ ctx[5] && /*wallets*/ ctx[5].length && create_if_block(ctx);
	footer = new Footer({ $$inline: true });

	const block = {
		c: function create() {
			div4 = element("div");
			div3 = element("div");
			div1 = element("div");
			create_component(header.$$.fragment);
			t0 = space();
			div0 = element("div");
			if (if_block) if_block.c();
			t1 = space();
			p = element("p");
			t2 = text("By connecting, I accept Proton's ");
			a = element("a");
			a.textContent = "Terms of Service";
			t4 = space();
			div2 = element("div");
			t5 = space();
			create_component(footer.$$.fragment);
			attr_dev(a, "class", "wallet-selector-tos-link");
			attr_dev(a, "href", "https://protonchain.com/terms");
			attr_dev(a, "target", "_blank");
			add_location(a, file, 35, 43, 1098);
			attr_dev(p, "class", "wallet-selector-tos-agreement");
			add_location(p, file, 34, 8, 1013);
			attr_dev(div0, "class", "wallet-selector-connect-body");
			add_location(div0, file, 26, 6, 732);
			attr_dev(div1, "class", "wallet-selector-connect");
			add_location(div1, file, 23, 4, 607);
			attr_dev(div2, "class", "wallet-selector-close");
			add_location(div2, file, 43, 4, 1296);
			attr_dev(div3, "class", "wallet-selector-inner");
			add_location(div3, file, 22, 2, 567);
			attr_dev(div4, "class", "wallet-selector");
			toggle_class(div4, "wallet-selector-active", /*show*/ ctx[0]);
			add_location(div4, file, 17, 0, 454);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div4, anchor);
			append_dev(div4, div3);
			append_dev(div3, div1);
			mount_component(header, div1, null);
			append_dev(div1, t0);
			append_dev(div1, div0);
			if (if_block) if_block.m(div0, null);
			append_dev(div0, t1);
			append_dev(div0, p);
			append_dev(p, t2);
			append_dev(p, a);
			append_dev(div3, t4);
			append_dev(div3, div2);
			append_dev(div4, t5);
			mount_component(footer, div4, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(div2, "click", /*close*/ ctx[6], false, false, false),
					listen_dev(div4, "click", self(stop_propagation(/*close*/ ctx[6])), false, false, true)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			const header_changes = {};
			if (dirty & /*title*/ 2) header_changes.title = /*title*/ ctx[1];
			if (dirty & /*subtitle*/ 4) header_changes.subtitle = /*subtitle*/ ctx[2];
			if (dirty & /*appLogo*/ 8) header_changes.logo = /*appLogo*/ ctx[3];
			if (dirty & /*hasRoundedLogo*/ 16) header_changes.isLogoRound = /*hasRoundedLogo*/ ctx[4];
			header.$set(header_changes);

			if (/*wallets*/ ctx[5] && /*wallets*/ ctx[5].length) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*wallets*/ 32) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div0, t1);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*show*/ 1) {
				toggle_class(div4, "wallet-selector-active", /*show*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(if_block);
			transition_in(footer.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(header.$$.fragment, local);
			transition_out(if_block);
			transition_out(footer.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div4);
			destroy_component(header);
			if (if_block) if_block.d();
			destroy_component(footer);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog', slots, []);
	const dispatch = createEventDispatcher();
	let { title = '' } = $$props;
	let { subtitle = '' } = $$props;
	let { show = false } = $$props;
	let { appLogo = '' } = $$props;
	let { hasRoundedLogo = false } = $$props;
	let { wallets = [] } = $$props;

	function close() {
		$$invalidate(0, show = false);
		dispatch('close');
	}

	const writable_props = ['title', 'subtitle', 'show', 'appLogo', 'hasRoundedLogo', 'wallets'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dialog> was created with unknown prop '${key}'`);
	});

	function select_wallet_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('title' in $$props) $$invalidate(1, title = $$props.title);
		if ('subtitle' in $$props) $$invalidate(2, subtitle = $$props.subtitle);
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('appLogo' in $$props) $$invalidate(3, appLogo = $$props.appLogo);
		if ('hasRoundedLogo' in $$props) $$invalidate(4, hasRoundedLogo = $$props.hasRoundedLogo);
		if ('wallets' in $$props) $$invalidate(5, wallets = $$props.wallets);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		Header,
		Footer,
		Wallet,
		dispatch,
		title,
		subtitle,
		show,
		appLogo,
		hasRoundedLogo,
		wallets,
		close
	});

	$$self.$inject_state = $$props => {
		if ('title' in $$props) $$invalidate(1, title = $$props.title);
		if ('subtitle' in $$props) $$invalidate(2, subtitle = $$props.subtitle);
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('appLogo' in $$props) $$invalidate(3, appLogo = $$props.appLogo);
		if ('hasRoundedLogo' in $$props) $$invalidate(4, hasRoundedLogo = $$props.hasRoundedLogo);
		if ('wallets' in $$props) $$invalidate(5, wallets = $$props.wallets);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		show,
		title,
		subtitle,
		appLogo,
		hasRoundedLogo,
		wallets,
		close,
		select_wallet_handler
	];
}

class Dialog extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				title: 1,
				subtitle: 2,
				show: 0,
				appLogo: 3,
				hasRoundedLogo: 4,
				wallets: 5
			},
			add_css
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog",
			options,
			id: create_fragment.name
		});
	}

	get title() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get subtitle() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set subtitle(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get show() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get appLogo() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set appLogo(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hasRoundedLogo() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hasRoundedLogo(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get wallets() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set wallets(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

class WalletTypeSelector {
    constructor(name, logo, customStyleOptions) {
        this.hasRoundedLogo = false;
        this.fontAdded = false;
        this.appLogo = logo;
        this.appName = name || 'app';
        this.customStyleOptions = customStyleOptions;
    }
    /**
     * Only Proton and Anchor are available
     */
    displayWalletSelector(enabledWalletTypes) {
        return new Promise((resolve, reject) => {
            this.setUpSelectorContainer(reject);
            const props = {
                title: 'Connect Wallet',
                subtitle: `To start using ${this.appName}`,
                hasRoundedLogo: this.hasRoundedLogo,
                wallets: enabledWalletTypes,
                appLogo: this.appLogo || null,
            };
            if (this.Widget) {
                this.Widget.$on('select-wallet', (event) => {
                    if (event.detail.walletName) {
                        this.hideSelector();
                        resolve(event.detail.walletName);
                    }
                });
                this.Widget.$set(props);
            }
            this.showSelector();
        });
    }
    destroy() {
        this.hideSelector();
        if (this.Widget) {
            this.Widget.$destroy();
        }
        if (this.widgetHolder) {
            this.widgetHolder.remove();
        }
    }
    hideSelector() {
        if (this.Widget) {
            this.Widget.$set({
                show: false,
                appLogo: '',
                hasRoundedLogo: false,
                title: '',
                subtitle: '',
                wallets: []
            });
        }
    }
    showSelector() {
        if (this.Widget) {
            this.Widget.$set({ show: true });
        }
    }
    setUpSelectorContainer(reject) {
        this.addFont();
        if (!this.Widget) {
            this.widgetHolder = document.createElement('div');
            document.body.appendChild(this.widgetHolder);
            this.Widget = new Dialog({
                target: this.widgetHolder
            });
            if (this.customStyleOptions) {
                const options = this.customStyleOptions;
                Object.keys(options).forEach((key) => {
                    if (key === 'isLogoRound') {
                        this.hasRoundedLogo = !!options.isLogoRound;
                    }
                    else {
                        const cssVar = CustomStyleOptionsToVarsMap.get(key);
                        if (cssVar && options[key] && this.widgetHolder) {
                            this.widgetHolder.style.setProperty(`--${cssVar}`, options[key]);
                        }
                    }
                });
            }
            this.Widget.$on('close', () => {
                this.hideSelector();
                reject('no wallet selected');
            });
        }
    }
    addFont() {
        const fontToAdd = 'https://fonts.cdnfonts.com/css/circular-std-book';
        if (!this.fontAdded) {
            const alreadyExists = Array.from(document.styleSheets).some((item) => item.href === fontToAdd);
            if (!alreadyExists) {
                const font = document.createElement('link');
                font.href = fontToAdd;
                font.rel = 'stylesheet';
                document.head.appendChild(font);
            }
            this.fontAdded = true;
        }
    }
}

const OPEN_SETTINGS = 'menubar=1,resizable=1,width=400,height=600';
class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
        });
    }
}
// Need to keep outside class since it messes with reactivity like Vuex
let _childWindow = null;
class ProtonWebLink {
    constructor(options) {
        this.scheme = options.scheme;
        this.client = typeof options.client === 'string' ? new JsonRpc(options.client) : options.client;
        this.storage = options.storage;
        this.testUrl = options.testUrl;
        this.transport = options.transport;
        setInterval(() => this.closeChild(), 500);
        window.addEventListener('message', (event) => this.onEvent(event), false);
    }
    get childWindow() {
        return _childWindow;
    }
    set childWindow(window) {
        _childWindow = window;
    }
    childUrl(path) {
        const base = this.testUrl
            ? this.testUrl
            : this.scheme === 'proton'
                ? 'https://webauth.com'
                : 'https://testnet.webauth.com';
        return `${base}${path}`;
    }
    closeChild(force = false) {
        if (this.childWindow) {
            if (force) {
                this.childWindow.close();
            }
            if (force || this.childWindow.closed) {
                this.childWindow = null;
            }
        }
    }
    createSession(auth) {
        return {
            auth,
            transact: (args, options) => __awaiter(this, void 0, void 0, function* () {
                if (this.deferredLogin) {
                    this.closeChild(true);
                    this.deferredLogin.reject('Trying to login');
                    this.deferredLogin = undefined;
                }
                this.deferredTransact = {
                    deferral: new Deferred(),
                    transaction: args.transaction || { actions: args.actions },
                    params: options,
                    waitingForOpen: true
                };
                this.childWindow = window.open(this.childUrl('/auth'), '_blank', OPEN_SETTINGS);
                try {
                    const res = yield this.deferredTransact.deferral.promise;
                    return res;
                }
                catch (error) {
                    if (this.transport.onFailure) {
                        this.transport.onFailure(undefined, error);
                    }
                    throw error;
                }
            }),
            link: {
                walletType: 'webauth',
                client: this.client
            }
        };
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.deferredTransact) {
                this.closeChild(true);
                this.deferredTransact.deferral.reject('Trying to login');
                this.deferredTransact = undefined;
            }
            this.childWindow = window.open(this.childUrl('/login'), '_blank', OPEN_SETTINGS);
            this.deferredLogin = new Deferred();
            try {
                this.storage.write('wallet-type', 'webauth');
                const auth = yield this.deferredLogin.promise;
                return {
                    session: this.createSession(auth)
                };
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    }
    restoreSession(/* requestAccount */ _, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createSession(auth);
        });
    }
    removeSession(appIdentifier, auth, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.storage) {
                throw new Error('Unable to remove session: No storage adapter configured');
            }
            if (yield this.storage.read('wallet-type')) {
                this.storage.remove('wallet-type');
            }
            if (yield this.storage.read('user-auth')) {
                this.storage.remove('user-auth');
            }
            return {
                appIdentifier,
                auth,
                chainId
            };
        });
    }
    onEvent(e) {
        return __awaiter(this, void 0, void 0, function* () {
            if (e.origin.indexOf('https://webauth.com') !== -1 &&
                e.origin.indexOf('https://testnet.webauth.com') !== -1) {
                return;
            }
            let eventData;
            try {
                eventData = JSON.parse(e.data);
            }
            catch (e) {
                return;
            }
            try {
                const { type, data, error } = eventData;
                if (!type) {
                    return;
                }
                // Ready to receive transaction
                if (type === 'isReady') {
                    if (this.deferredTransact && this.deferredTransact.waitingForOpen) {
                        this.deferredTransact.waitingForOpen = false;
                        this.childWindow.postMessage(JSON.stringify({
                            type: 'transaction',
                            data: {
                                transaction: this.deferredTransact.transaction,
                                params: this.deferredTransact.params
                            }
                        }), '*');
                    }
                }
                // Close child
                else if (type === 'close') {
                    this.closeChild(true);
                    if (this.deferredTransact) {
                        this.deferredTransact.deferral.reject('Closed');
                    }
                    else if (this.deferredLogin) {
                        this.deferredLogin.reject('Closed');
                    }
                }
                // TX Success
                else if (type === 'transactionSuccess') {
                    this.closeChild(true);
                    if (this.deferredTransact) {
                        if (error) {
                            this.deferredTransact.deferral.reject(error && error.json ? error.json : error);
                        }
                        else {
                            this.deferredTransact.deferral.resolve(data);
                        }
                        this.deferredTransact = undefined;
                    }
                }
                // Login success
                else if (type === 'loginSuccess') {
                    this.closeChild(true);
                    if (this.deferredLogin) {
                        this.deferredLogin.resolve(data);
                        this.deferredLogin = undefined;
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}

class Storage {
    constructor(keyPrefix) {
        this.keyPrefix = keyPrefix;
    }
    write(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.setItem(this.storageKey(key), data);
        });
    }
    read(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return localStorage.getItem(this.storageKey(key));
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.removeItem(this.storageKey(key));
        });
    }
    storageKey(key) {
        return `${this.keyPrefix}-${key}`;
    }
}

const WALLET_TYPES = [
    { key: 'proton', value: 'Mobile' },
    { key: 'webauth', value: 'Browser' },
    { key: 'anchor', value: 'Desktop' },
];

let walletSelector;
const ConnectWallet = ({ linkOptions, transportOptions = {}, selectorOptions = {} }) => __awaiter(void 0, void 0, void 0, function* () {
    // Add RPC
    const rpc = new JsonRpc(linkOptions.endpoints);
    linkOptions.client = rpc;
    // Add Chain ID
    if (!linkOptions.chainId) {
        const info = yield rpc.get_info();
        linkOptions.chainId = info.chain_id;
    }
    // Add storage
    if (!linkOptions.storage) {
        linkOptions.storage = new Storage(linkOptions.storagePrefix || 'proton-storage');
    }
    return login({ selectorOptions, linkOptions, transportOptions }).finally(() => {
        if (walletSelector) {
            walletSelector.destroy();
            walletSelector = undefined;
        }
    });
});
const login = (loginOptions) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Initialize link and session
    let session;
    let link;
    let loginResult;
    if (!walletSelector) {
        walletSelector = new WalletTypeSelector(loginOptions.selectorOptions.appName, loginOptions.selectorOptions.appLogo, loginOptions.selectorOptions.customStyleOptions);
    }
    // Determine wallet type from storage or selector modal
    let walletType = loginOptions.selectorOptions ? loginOptions.selectorOptions.walletType : undefined;
    if (!walletType) {
        if (loginOptions.linkOptions.restoreSession) {
            walletType = yield loginOptions.linkOptions.storage.read('wallet-type');
        }
        else {
            const enabledWalletTypes = loginOptions.selectorOptions.enabledWalletTypes
                ? WALLET_TYPES.filter(wallet => loginOptions.selectorOptions.enabledWalletTypes && loginOptions.selectorOptions.enabledWalletTypes.includes(wallet.key))
                : WALLET_TYPES;
            try {
                walletType = yield walletSelector.displayWalletSelector(enabledWalletTypes);
            }
            catch (e) {
                console.log('CANCEL', e);
                return {
                    error: e
                };
            }
        }
    }
    if (!walletType) {
        return {
            error: new Error('Wallet Type Unavailable: No wallet provided')
        };
    }
    // Determine chain
    let chain = 'proton';
    if (loginOptions.linkOptions.chainId === '71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd') {
        chain = 'proton-test';
    }
    // Set scheme
    let scheme = 'proton';
    if (walletType === 'anchor') {
        scheme = 'esr';
    }
    else if (chain === 'proton-test') {
        scheme = 'proton-dev';
    }
    const options = Object.assign(Object.assign({}, loginOptions.linkOptions), { scheme, transport: new ProtonLinkBrowserTransport(Object.assign(Object.assign({}, loginOptions.transportOptions), { walletType })), walletType, chains: [] });
    // Create link
    if (walletType === 'webauth') {
        link = new ProtonWebLink(options);
    }
    else {
        link = new ProtonLink(options);
    }
    // Session from login
    if (!loginOptions.linkOptions.restoreSession) {
        let backToSelector = false;
        document.addEventListener('backToSelector', () => { backToSelector = true; });
        try {
            loginResult = yield link.login(((_a = loginOptions.transportOptions) === null || _a === void 0 ? void 0 : _a.requestAccount) || '');
            session = loginResult.session;
            const stringAuth = JSON.stringify({
                actor: loginResult.session.auth.actor.toString(),
                permission: loginResult.session.auth.permission.toString(),
            });
            loginOptions.linkOptions.storage.write('user-auth', stringAuth);
        }
        catch (e) {
            console.error('restoreSession Error:');
            console.error(e);
            if (backToSelector) {
                document.removeEventListener('backToSelector', () => { backToSelector = true; });
                return login(Object.assign(Object.assign({}, loginOptions), { repeat: true }));
            }
            else {
                return {
                    error: e
                };
            }
        }
        // Session from restore
    }
    else {
        const stringifiedUserAuth = yield loginOptions.linkOptions.storage.read('user-auth');
        const parsedUserAuth = stringifiedUserAuth ? JSON.parse(stringifiedUserAuth) : {};
        const savedUserAuth = Object.keys(parsedUserAuth).length > 0 ? parsedUserAuth : null;
        if (savedUserAuth) {
            session = (yield link.restoreSession(loginOptions.transportOptions.requestAccount || '', savedUserAuth));
            // Could not restore
            if (!session) {
                // clean storage to remove unexpected side effects if session restore fails
                loginOptions.linkOptions.storage.remove('wallet-type');
                loginOptions.linkOptions.storage.remove('user-auth');
                return {
                    link: undefined,
                    session: undefined,
                    loginResult: undefined,
                };
            }
        }
    }
    if (session && session.auth) {
        session.auth = {
            actor: session.auth.actor.toString(),
            permission: session.auth.permission.toString(),
        };
        session.publicKey = session.publicKey ? session.publicKey.toString() : undefined;
    }
    return {
        session,
        link,
        loginResult
    };
});

export { ConnectWallet as default };
//# sourceMappingURL=index.js.map
