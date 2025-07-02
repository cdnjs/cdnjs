/**
 * svelte-range-slider-pips ~ 4.0.5
 * Multi-Thumb, Accessible, Beautiful Range Slider with Pips
 * Project home: https://simeydotme.github.io/svelte-range-slider-pips/
 * © 2025 Simon Goellner <simey.me@gmail.com> ~ MPL-2.0 License
 * Published: 26/6/2025
 */
/** @returns {void} */
function noop() {}

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
function is_function(thing) {
	return typeof thing === 'function';
}

/** @returns {boolean} */
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

/** @returns {boolean} */
function is_empty(obj) {
	return Object.keys(obj).length === 0;
}

function subscribe(store, ...callbacks) {
	if (store == null) {
		for (const callback of callbacks) {
			callback(undefined);
		}
		return noop;
	}
	const unsub = store.subscribe(...callbacks);
	return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

const is_client = typeof window !== 'undefined';

/** @type {() => number} */
let now = is_client ? () => window.performance.now() : () => Date.now();

let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;

const tasks = new Set();

/**
 * @param {number} now
 * @returns {void}
 */
function run_tasks(now) {
	tasks.forEach((task) => {
		if (!task.c(now)) {
			tasks.delete(task);
			task.f();
		}
	});
	if (tasks.size !== 0) raf(run_tasks);
}

/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 * @param {import('./private.js').TaskCallback} callback
 * @returns {import('./private.js').Task}
 */
function loop(callback) {
	/** @type {import('./private.js').TaskEntry} */
	let task;
	if (tasks.size === 0) raf(run_tasks);
	return {
		promise: new Promise((fulfill) => {
			tasks.add((task = { c: callback, f: fulfill }));
		}),
		abort() {
			tasks.delete(task);
		}
	};
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append(target, node) {
	target.appendChild(node);
}

/**
 * @param {Node} target
 * @param {string} style_sheet_id
 * @param {string} styles
 * @returns {void}
 */
function append_styles(target, style_sheet_id, styles) {
	const append_styles_to = get_root_for_style(target);
	if (!append_styles_to.getElementById(style_sheet_id)) {
		const style = element('style');
		style.id = style_sheet_id;
		style.textContent = styles;
		append_stylesheet(append_styles_to, style);
	}
}

/**
 * @param {Node} node
 * @returns {ShadowRoot | Document}
 */
function get_root_for_style(node) {
	if (!node) return document;
	const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
	if (root && /** @type {ShadowRoot} */ (root).host) {
		return /** @type {ShadowRoot} */ (root);
	}
	return node.ownerDocument;
}

/**
 * @param {ShadowRoot | Document} node
 * @param {HTMLStyleElement} style
 * @returns {CSSStyleSheet}
 */
function append_stylesheet(node, style) {
	append(/** @type {Document} */ (node).head || node, style);
	return style.sheet;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert(target, node, anchor) {
	target.insertBefore(node, anchor || null);
}

/**
 * @param {Node} node
 * @returns {void}
 */
function detach(node) {
	if (node.parentNode) {
		node.parentNode.removeChild(node);
	}
}

/**
 * @returns {void} */
function destroy_each(iterations, detaching) {
	for (let i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d(detaching);
	}
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @returns {HTMLElementTagNameMap[K]}
 */
function element(name) {
	return document.createElement(name);
}

/**
 * @template {keyof SVGElementTagNameMap} K
 * @param {K} name
 * @returns {SVGElement}
 */
function svg_element(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

/**
 * @param {string} data
 * @returns {Text}
 */
function text(data) {
	return document.createTextNode(data);
}

/**
 * @returns {Text} */
function space() {
	return text(' ');
}

/**
 * @returns {Text} */
function empty() {
	return text('');
}

/**
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @returns {() => void}
 */
function listen(node, event, handler, options) {
	node.addEventListener(event, handler, options);
	return () => node.removeEventListener(event, handler, options);
}

/**
 * @returns {(event: any) => any} */
function prevent_default(fn) {
	return function (event) {
		event.preventDefault();
		// @ts-ignore
		return fn.call(this, event);
	};
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr(node, attribute, value) {
	if (value == null) node.removeAttribute(attribute);
	else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

/**
 * @param {Element} element
 * @returns {ChildNode[]}
 */
function children(element) {
	return Array.from(element.childNodes);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data(text, data) {
	data = '' + data;
	if (text.data === data) return;
	text.data = /** @type {string} */ (data);
}

/**
 * @returns {void} */
function toggle_class(element, name, toggle) {
	// The `!!` is required because an `undefined` flag means flipping the current state.
	element.classList.toggle(name, !!toggle);
}

/**
 * @template T
 * @param {string} type
 * @param {T} [detail]
 * @param {{ bubbles?: boolean, cancelable?: boolean }} [options]
 * @returns {CustomEvent<T>}
 */
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	return new CustomEvent(type, { detail, bubbles, cancelable });
}
/** */
class HtmlTag {
	/**
	 * @private
	 * @default false
	 */
	is_svg = false;
	/** parent for creating node */
	e = undefined;
	/** html tag nodes */
	n = undefined;
	/** target */
	t = undefined;
	/** anchor */
	a = undefined;
	constructor(is_svg = false) {
		this.is_svg = is_svg;
		this.e = this.n = null;
	}

	/**
	 * @param {string} html
	 * @returns {void}
	 */
	c(html) {
		this.h(html);
	}

	/**
	 * @param {string} html
	 * @param {HTMLElement | SVGElement} target
	 * @param {HTMLElement | SVGElement} anchor
	 * @returns {void}
	 */
	m(html, target, anchor = null) {
		if (!this.e) {
			if (this.is_svg)
				this.e = svg_element(/** @type {keyof SVGElementTagNameMap} */ (target.nodeName));
			/** #7364  target for <template> may be provided as #document-fragment(11) */ else
				this.e = element(
					/** @type {keyof HTMLElementTagNameMap} */ (
						target.nodeType === 11 ? 'TEMPLATE' : target.nodeName
					)
				);
			this.t =
				target.tagName !== 'TEMPLATE'
					? target
					: /** @type {HTMLTemplateElement} */ (target).content;
			this.c(html);
		}
		this.i(anchor);
	}

	/**
	 * @param {string} html
	 * @returns {void}
	 */
	h(html) {
		this.e.innerHTML = html;
		this.n = Array.from(
			this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes
		);
	}

	/**
	 * @returns {void} */
	i(anchor) {
		for (let i = 0; i < this.n.length; i += 1) {
			insert(this.t, this.n[i], anchor);
		}
	}

	/**
	 * @param {string} html
	 * @returns {void}
	 */
	p(html) {
		this.d();
		this.h(html);
		this.i(this.a);
	}

	/**
	 * @returns {void} */
	d() {
		this.n.forEach(detach);
	}
}

/**
 * @param {HTMLElement} element
 * @returns {{}}
 */
function get_custom_elements_slots(element) {
	const result = {};
	element.childNodes.forEach(
		/** @param {Element} node */ (node) => {
			result[node.slot || 'default'] = true;
		}
	);
	return result;
}

/**
 * @typedef {Node & {
 * 	claim_order?: number;
 * 	hydrate_init?: true;
 * 	actual_end_child?: NodeEx;
 * 	childNodes: NodeListOf<NodeEx>;
 * }} NodeEx
 */

/** @typedef {ChildNode & NodeEx} ChildNodeEx */

/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

/**
 * @typedef {ChildNodeEx[] & {
 * 	claim_info?: {
 * 		last_index: number;
 * 		total_claimed: number;
 * 	};
 * }} ChildNodeArray
 */

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

function get_current_component() {
	if (!current_component) throw new Error('Function called outside component initialization');
	return current_component;
}

/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
 *
 * `onMount` does not run inside a [server-side component](https://svelte.dev/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs/svelte#onmount
 * @template T
 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
 * @returns {void}
 */
function onMount(fn) {
	get_current_component().$$.on_mount.push(fn);
}

/**
 * Creates an event dispatcher that can be used to dispatch [component events](https://svelte.dev/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * The event dispatcher can be typed to narrow the allowed event names and the type of the `detail` argument:
 * ```ts
 * const dispatch = createEventDispatcher<{
 *  loaded: never; // does not take a detail argument
 *  change: string; // takes a detail argument of type string, which is required
 *  optional: number | null; // takes an optional detail argument of type number
 * }>();
 * ```
 *
 * https://svelte.dev/docs/svelte#createeventdispatcher
 * @template {Record<string, any>} [EventMap=any]
 * @returns {import('./public.js').EventDispatcher<EventMap>}
 */
function createEventDispatcher() {
	const component = get_current_component();
	return (type, detail, { cancelable = false } = {}) => {
		const callbacks = component.$$.callbacks[type];
		if (callbacks) {
			// TODO are there situations where events could be dispatched
			// in a server (non-DOM) environment?
			const event = custom_event(/** @type {string} */ (type), detail, { cancelable });
			callbacks.slice().forEach((fn) => {
				fn.call(component, event);
			});
			return !event.defaultPrevented;
		}
		return true;
	};
}

const dirty_components = [];
const binding_callbacks = [];

let render_callbacks = [];

const flush_callbacks = [];

const resolved_promise = /* @__PURE__ */ Promise.resolve();

let update_scheduled = false;

/** @returns {void} */
function schedule_update() {
	if (!update_scheduled) {
		update_scheduled = true;
		resolved_promise.then(flush);
	}
}

/** @returns {void} */
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

/** @returns {void} */
function flush() {
	// Do not reenter flush while dirty components are updated, as this can
	// result in an infinite loop. Instead, let the inner flush handle it.
	// Reentrancy is ok afterwards for bindings etc.
	if (flushidx !== 0) {
		return;
	}
	const saved_component = current_component;
	do {
		// first, call beforeUpdate functions
		// and update components
		try {
			while (flushidx < dirty_components.length) {
				const component = dirty_components[flushidx];
				flushidx++;
				set_current_component(component);
				update(component.$$);
			}
		} catch (e) {
			// reset dirty state to not end up in a deadlocked state and then rethrow
			dirty_components.length = 0;
			flushidx = 0;
			throw e;
		}
		set_current_component(null);
		dirty_components.length = 0;
		flushidx = 0;
		while (binding_callbacks.length) binding_callbacks.pop()();
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

/** @returns {void} */
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

/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 * @param {Function[]} fns
 * @returns {void}
 */
function flush_render_callbacks(fns) {
	const filtered = [];
	const targets = [];
	render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
	targets.forEach((c) => c());
	render_callbacks = filtered;
}

const outroing = new Set();

/**
 * @type {Outro}
 */
let outros;

/**
 * @returns {void} */
function group_outros() {
	outros = {
		r: 0,
		c: [],
		p: outros // parent group
	};
}

/**
 * @returns {void} */
function check_outros() {
	if (!outros.r) {
		run_all(outros.c);
	}
	outros = outros.p;
}

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} [local]
 * @returns {void}
 */
function transition_in(block, local) {
	if (block && block.i) {
		outroing.delete(block);
		block.i(local);
	}
}

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} local
 * @param {0 | 1} [detach]
 * @param {() => void} [callback]
 * @returns {void}
 */
function transition_out(block, local, detach, callback) {
	if (block && block.o) {
		if (outroing.has(block)) return;
		outroing.add(block);
		outros.c.push(() => {
			outroing.delete(block);
			if (callback) {
				if (detach) block.d(1);
				callback();
			}
		});
		block.o(local);
	} else if (callback) {
		callback();
	}
}

/** @typedef {1} INTRO */
/** @typedef {0} OUTRO */
/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

/**
 * @typedef {Object} Outro
 * @property {number} r
 * @property {Function[]} c
 * @property {Object} p
 */

/**
 * @typedef {Object} PendingProgram
 * @property {number} start
 * @property {INTRO|OUTRO} b
 * @property {Outro} [group]
 */

/**
 * @typedef {Object} Program
 * @property {number} a
 * @property {INTRO|OUTRO} b
 * @property {1|-1} d
 * @property {number} duration
 * @property {number} start
 * @property {number} end
 * @property {Outro} [group]
 */

// general each functions:

function ensure_array_like(array_like_or_iterator) {
	return array_like_or_iterator?.length !== undefined
		? array_like_or_iterator
		: Array.from(array_like_or_iterator);
}

/** @returns {void} */
function create_component(block) {
	block && block.c();
}

/** @returns {void} */
function mount_component(component, target, anchor) {
	const { fragment, after_update } = component.$$;
	fragment && fragment.m(target, anchor);
	// onMount happens before the initial afterUpdate
	add_render_callback(() => {
		const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
		// if the component was destroyed immediately
		// it will update the `$$.on_destroy` reference to `null`.
		// the destructured on_destroy may still reference to the old array
		if (component.$$.on_destroy) {
			component.$$.on_destroy.push(...new_on_destroy);
		} else {
			// Edge case - component was destroyed immediately,
			// most likely as a result of a binding initialising
			run_all(new_on_destroy);
		}
		component.$$.on_mount = [];
	});
	after_update.forEach(add_render_callback);
}

/** @returns {void} */
function destroy_component(component, detaching) {
	const $$ = component.$$;
	if ($$.fragment !== null) {
		flush_render_callbacks($$.after_update);
		run_all($$.on_destroy);
		$$.fragment && $$.fragment.d(detaching);
		// TODO null out other refs, including component.$$ (but need to
		// preserve final state?)
		$$.on_destroy = $$.fragment = null;
		$$.ctx = [];
	}
}

/** @returns {void} */
function make_dirty(component, i) {
	if (component.$$.dirty[0] === -1) {
		dirty_components.push(component);
		schedule_update();
		component.$$.dirty.fill(0);
	}
	component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
}

// TODO: Document the other params
/**
 * @param {SvelteComponent} component
 * @param {import('./public.js').ComponentConstructorOptions} options
 *
 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
 * This will be the `add_css` function from the compiled component.
 *
 * @returns {void}
 */
function init(
	component,
	options,
	instance,
	create_fragment,
	not_equal,
	props,
	append_styles = null,
	dirty = [-1]
) {
	const parent_component = current_component;
	set_current_component(component);
	/** @type {import('./private.js').T$$} */
	const $$ = (component.$$ = {
		fragment: null,
		ctx: [],
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
	});
	append_styles && append_styles($$.root);
	let ready = false;
	$$.ctx = instance
		? instance(component, options.props || {}, (i, ret, ...rest) => {
				const value = rest.length ? rest[0] : ret;
				if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
					if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
					if (ready) make_dirty(component, i);
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
			// TODO: what is the correct type here?
			// @ts-expect-error
			const nodes = children(options.target);
			$$.fragment && $$.fragment.l(nodes);
			nodes.forEach(detach);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.c();
		}
		if (options.intro) transition_in(component.$$.fragment);
		mount_component(component, options.target, options.anchor);
		flush();
	}
	set_current_component(parent_component);
}

let SvelteElement;

if (typeof HTMLElement === 'function') {
	SvelteElement = class extends HTMLElement {
		/** The Svelte component constructor */
		$$ctor;
		/** Slots */
		$$s;
		/** The Svelte component instance */
		$$c;
		/** Whether or not the custom element is connected */
		$$cn = false;
		/** Component props data */
		$$d = {};
		/** `true` if currently in the process of reflecting component props back to attributes */
		$$r = false;
		/** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
		$$p_d = {};
		/** @type {Record<string, Function[]>} Event listeners */
		$$l = {};
		/** @type {Map<Function, Function>} Event listener unsubscribe functions */
		$$l_u = new Map();

		constructor($$componentCtor, $$slots, use_shadow_dom) {
			super();
			this.$$ctor = $$componentCtor;
			this.$$s = $$slots;
			if (use_shadow_dom) {
				this.attachShadow({ mode: 'open' });
			}
		}

		addEventListener(type, listener, options) {
			// We can't determine upfront if the event is a custom event or not, so we have to
			// listen to both. If someone uses a custom event with the same name as a regular
			// browser event, this fires twice - we can't avoid that.
			this.$$l[type] = this.$$l[type] || [];
			this.$$l[type].push(listener);
			if (this.$$c) {
				const unsub = this.$$c.$on(type, listener);
				this.$$l_u.set(listener, unsub);
			}
			super.addEventListener(type, listener, options);
		}

		removeEventListener(type, listener, options) {
			super.removeEventListener(type, listener, options);
			if (this.$$c) {
				const unsub = this.$$l_u.get(listener);
				if (unsub) {
					unsub();
					this.$$l_u.delete(listener);
				}
			}
			if (this.$$l[type]) {
				const idx = this.$$l[type].indexOf(listener);
				if (idx >= 0) {
					this.$$l[type].splice(idx, 1);
				}
			}
		}

		async connectedCallback() {
			this.$$cn = true;
			if (!this.$$c) {
				// We wait one tick to let possible child slot elements be created/mounted
				await Promise.resolve();
				if (!this.$$cn || this.$$c) {
					return;
				}
				function create_slot(name) {
					return () => {
						let node;
						const obj = {
							c: function create() {
								node = element('slot');
								if (name !== 'default') {
									attr(node, 'name', name);
								}
							},
							/**
							 * @param {HTMLElement} target
							 * @param {HTMLElement} [anchor]
							 */
							m: function mount(target, anchor) {
								insert(target, node, anchor);
							},
							d: function destroy(detaching) {
								if (detaching) {
									detach(node);
								}
							}
						};
						return obj;
					};
				}
				const $$slots = {};
				const existing_slots = get_custom_elements_slots(this);
				for (const name of this.$$s) {
					if (name in existing_slots) {
						$$slots[name] = [create_slot(name)];
					}
				}
				for (const attribute of this.attributes) {
					// this.$$data takes precedence over this.attributes
					const name = this.$$g_p(attribute.name);
					if (!(name in this.$$d)) {
						this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, 'toProp');
					}
				}
				// Port over props that were set programmatically before ce was initialized
				for (const key in this.$$p_d) {
					if (!(key in this.$$d) && this[key] !== undefined) {
						this.$$d[key] = this[key]; // don't transform, these were set through JavaScript
						delete this[key]; // remove the property that shadows the getter/setter
					}
				}
				this.$$c = new this.$$ctor({
					target: this.shadowRoot || this,
					props: {
						...this.$$d,
						$$slots,
						$$scope: {
							ctx: []
						}
					}
				});

				// Reflect component props as attributes
				const reflect_attributes = () => {
					this.$$r = true;
					for (const key in this.$$p_d) {
						this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
						if (this.$$p_d[key].reflect) {
							const attribute_value = get_custom_element_value(
								key,
								this.$$d[key],
								this.$$p_d,
								'toAttribute'
							);
							if (attribute_value == null) {
								this.removeAttribute(this.$$p_d[key].attribute || key);
							} else {
								this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
							}
						}
					}
					this.$$r = false;
				};
				this.$$c.$$.after_update.push(reflect_attributes);
				reflect_attributes(); // once initially because after_update is added too late for first render

				for (const type in this.$$l) {
					for (const listener of this.$$l[type]) {
						const unsub = this.$$c.$on(type, listener);
						this.$$l_u.set(listener, unsub);
					}
				}
				this.$$l = {};
			}
		}

		// We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
		// and setting attributes through setAttribute etc, this is helpful
		attributeChangedCallback(attr, _oldValue, newValue) {
			if (this.$$r) return;
			attr = this.$$g_p(attr);
			this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, 'toProp');
			this.$$c?.$set({ [attr]: this.$$d[attr] });
		}

		disconnectedCallback() {
			this.$$cn = false;
			// In a microtask, because this could be a move within the DOM
			Promise.resolve().then(() => {
				if (!this.$$cn && this.$$c) {
					this.$$c.$destroy();
					this.$$c = undefined;
				}
			});
		}

		$$g_p(attribute_name) {
			return (
				Object.keys(this.$$p_d).find(
					(key) =>
						this.$$p_d[key].attribute === attribute_name ||
						(!this.$$p_d[key].attribute && key.toLowerCase() === attribute_name)
				) || attribute_name
			);
		}
	};
}

/**
 * @param {string} prop
 * @param {any} value
 * @param {Record<string, CustomElementPropDefinition>} props_definition
 * @param {'toAttribute' | 'toProp'} [transform]
 */
function get_custom_element_value(prop, value, props_definition, transform) {
	const type = props_definition[prop]?.type;
	value = type === 'Boolean' && typeof value !== 'boolean' ? value != null : value;
	if (!transform || !props_definition[prop]) {
		return value;
	} else if (transform === 'toAttribute') {
		switch (type) {
			case 'Object':
			case 'Array':
				return value == null ? null : JSON.stringify(value);
			case 'Boolean':
				return value ? '' : null;
			case 'Number':
				return value == null ? null : value;
			default:
				return value;
		}
	} else {
		switch (type) {
			case 'Object':
			case 'Array':
				return value && JSON.parse(value);
			case 'Boolean':
				return value; // conversion already handled above
			case 'Number':
				return value != null ? +value : value;
			default:
				return value;
		}
	}
}

/**
 * @internal
 *
 * Turn a Svelte component into a custom element.
 * @param {import('./public.js').ComponentType} Component  A Svelte component constructor
 * @param {Record<string, CustomElementPropDefinition>} props_definition  The props to observe
 * @param {string[]} slots  The slots to create
 * @param {string[]} accessors  Other accessors besides the ones for props the component has
 * @param {boolean} use_shadow_dom  Whether to use shadow DOM
 * @param {(ce: new () => HTMLElement) => new () => HTMLElement} [extend]
 */
function create_custom_element(
	Component,
	props_definition,
	slots,
	accessors,
	use_shadow_dom,
	extend
) {
	let Class = class extends SvelteElement {
		constructor() {
			super(Component, slots, use_shadow_dom);
			this.$$p_d = props_definition;
		}
		static get observedAttributes() {
			return Object.keys(props_definition).map((key) =>
				(props_definition[key].attribute || key).toLowerCase()
			);
		}
	};
	Object.keys(props_definition).forEach((prop) => {
		Object.defineProperty(Class.prototype, prop, {
			get() {
				return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
			},
			set(value) {
				value = get_custom_element_value(prop, value, props_definition);
				this.$$d[prop] = value;
				this.$$c?.$set({ [prop]: value });
			}
		});
	});
	accessors.forEach((accessor) => {
		Object.defineProperty(Class.prototype, accessor, {
			get() {
				return this.$$c?.[accessor];
			}
		});
	});
	Component.element = /** @type {any} */ (Class);
	return Class;
}

/**
 * Base class for Svelte components. Used when dev=false.
 *
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 */
class SvelteComponent {
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$ = undefined;
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$set = undefined;

	/** @returns {void} */
	$destroy() {
		destroy_component(this, 1);
		this.$destroy = noop;
	}

	/**
	 * @template {Extract<keyof Events, string>} K
	 * @param {K} type
	 * @param {((e: Events[K]) => void) | null | undefined} callback
	 * @returns {() => void}
	 */
	$on(type, callback) {
		if (!is_function(callback)) {
			return noop;
		}
		const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
		callbacks.push(callback);
		return () => {
			const index = callbacks.indexOf(callback);
			if (index !== -1) callbacks.splice(index, 1);
		};
	}

	/**
	 * @param {Partial<Props>} props
	 * @returns {void}
	 */
	$set(props) {
		if (this.$$set && !is_empty(props)) {
			this.$$.skip_bound = true;
			this.$$set(props);
			this.$$.skip_bound = false;
		}
	}
}

/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */

// generated during release, do not modify

const PUBLIC_VERSION = '4';

if (typeof window !== 'undefined')
	// @ts-ignore
	(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

const subscriber_queue = [];

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 *
 * https://svelte.dev/docs/svelte-store#writable
 * @template T
 * @param {T} [value] initial value
 * @param {import('./public.js').StartStopNotifier<T>} [start]
 * @returns {import('./public.js').Writable<T>}
 */
function writable(value, start = noop) {
	/** @type {import('./public.js').Unsubscriber} */
	let stop;
	/** @type {Set<import('./private.js').SubscribeInvalidateTuple<T>>} */
	const subscribers = new Set();
	/** @param {T} new_value
	 * @returns {void}
	 */
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				// store is ready
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

	/**
	 * @param {import('./public.js').Updater<T>} fn
	 * @returns {void}
	 */
	function update(fn) {
		set(fn(value));
	}

	/**
	 * @param {import('./public.js').Subscriber<T>} run
	 * @param {import('./private.js').Invalidator<T>} [invalidate]
	 * @returns {import('./public.js').Unsubscriber}
	 */
	function subscribe(run, invalidate = noop) {
		/** @type {import('./private.js').SubscribeInvalidateTuple<T>} */
		const subscriber = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set, update) || noop;
		}
		run(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe };
}

/**
 * @param {any} obj
 * @returns {boolean}
 */
function is_date(obj) {
	return Object.prototype.toString.call(obj) === '[object Date]';
}

/**
 * @template T
 * @param {import('./private.js').TickContext<T>} ctx
 * @param {T} last_value
 * @param {T} current_value
 * @param {T} target_value
 * @returns {T}
 */
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
		} else {
			ctx.settled = false; // signal loop to keep ticking
			// @ts-ignore
			return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
		}
	} else if (Array.isArray(current_value)) {
		// @ts-ignore
		return current_value.map((_, i) =>
			tick_spring(ctx, last_value[i], current_value[i], target_value[i])
		);
	} else if (typeof current_value === 'object') {
		const next_value = {};
		for (const k in current_value) {
			// @ts-ignore
			next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
		}
		// @ts-ignore
		return next_value;
	} else {
		throw new Error(`Cannot spring ${typeof current_value} values`);
	}
}

/**
 * The spring function in Svelte creates a store whose value is animated, with a motion that simulates the behavior of a spring. This means when the value changes, instead of transitioning at a steady rate, it "bounces" like a spring would, depending on the physics parameters provided. This adds a level of realism to the transitions and can enhance the user experience.
 *
 * https://svelte.dev/docs/svelte-motion#spring
 * @template [T=any]
 * @param {T} [value]
 * @param {import('./private.js').SpringOpts} [opts]
 * @returns {import('./public.js').Spring<T>}
 */
function spring(value, opts = {}) {
	const store = writable(value);
	const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
	/** @type {number} */
	let last_time;
	/** @type {import('../internal/private.js').Task} */
	let task;
	/** @type {object} */
	let current_token;
	/** @type {T} */
	let last_value = value;
	/** @type {T} */
	let target_value = value;
	let inv_mass = 1;
	let inv_mass_recovery_rate = 0;
	let cancel_task = false;
	/**
	 * @param {T} new_value
	 * @param {import('./private.js').SpringUpdateOpts} opts
	 * @returns {Promise<void>}
	 */
	function set(new_value, opts = {}) {
		target_value = new_value;
		const token = (current_token = {});
		if (value == null || opts.hard || (spring.stiffness >= 1 && spring.damping >= 1)) {
			cancel_task = true; // cancel any running animation
			last_time = now();
			last_value = new_value;
			store.set((value = target_value));
			return Promise.resolve();
		} else if (opts.soft) {
			const rate = opts.soft === true ? 0.5 : +opts.soft;
			inv_mass_recovery_rate = 1 / (rate * 60);
			inv_mass = 0; // infinite mass, unaffected by spring forces
		}
		if (!task) {
			last_time = now();
			cancel_task = false;
			task = loop((now) => {
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
					dt: ((now - last_time) * 60) / 1000
				};
				const next_value = tick_spring(ctx, last_value, value, target_value);
				last_time = now;
				last_value = value;
				store.set((value = next_value));
				if (ctx.settled) {
					task = null;
				}
				return !ctx.settled;
			});
		}
		return new Promise((fulfil) => {
			task.promise.then(() => {
				if (token === current_token) fulfil();
			});
		});
	}
	/** @type {import('./public.js').Spring<T>} */
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

/**
 * check if the value is a finite number
 * @param value the value to check
 * @returns true if the value is a finite number
 */
function isFiniteNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
}
/**
 * make sure the value is coerced to a float value
 * @param {number|string} value the value to fix
 * @param {number} precision the number of decimal places to fix to
 * @return {number} a float version of the input
 **/
const coerceFloat = (value, precision = 2) => {
    return parseFloat((+value).toFixed(precision));
};
/**
 * clamp a value from a range so that it always
 * falls within the min/max values
 * @param {number} value the value to clamp
 * @param {number} min the minimum value
 * @param {number} max the maximum value
 * @return {number} the value after it's been clamped
 **/
const clampValue = function (value, min, max) {
    // return the min/max if outside of that range
    return value <= min ? min : value >= max ? max : value;
};
/**
 * take in a value, and then calculate that value's percentage
 * of the overall range (min-max);
 * @param {number} value the value we're getting percent for
 * @param {number} min the minimum value
 * @param {number} max the maximum value
 * @param {number} precision the number of decimal places to fix to (default 2)
 * @return {number} the percentage value
 **/
const valueAsPercent = function (value, min, max, precision = 2) {
    let percent = ((value - min) / (max - min)) * 100;
    if (isNaN(percent) || percent <= 0) {
        return 0;
    }
    else if (percent >= 100) {
        return 100;
    }
    else {
        return coerceFloat(percent, precision);
    }
};
/**
 * convert a percentage to a value
 * @param {number} percent the percentage to convert
 * @param {number} min the minimum value
 * @param {number} max the maximum value
 * @return {number} the value after it's been converted
 **/
const percentAsValue = function (percent, min, max) {
    return ((max - min) / 100) * percent + min;
};
/**
 * align the value with the steps so that it
 * always sits on the closest (above/below) step
 * @param {number} value the value to align
 * @param {number} min the minimum value
 * @param {number} max the maximum value
 * @param {number} step the step value
 * @param {number} precision the number of decimal places to fix to
 * @param {number[]} limits the limits to check against
 * @return {number} the value after it's been aligned
 **/
const constrainAndAlignValue = function (value, min, max, step, precision = 2, limits = null) {
    value = isFiniteNumber(value) ? value : limits?.[0] ?? min;
    // if limits are provided, clamp the value between the limits
    // if no limits are provided, clamp the value between the min and max
    // before we start aligning the value
    if (value <= (limits?.[0] ?? min) || value >= (limits?.[1] ?? max)) {
        return (value = clampValue(value, limits?.[0] ?? min, limits?.[1] ?? max));
    }
    // find the middle-point between steps
    // and see if the value is closer to the
    // next step, or previous step
    let remainder = (value - min) % step;
    let aligned = value - remainder;
    if (Math.abs(remainder) * 2 >= step) {
        aligned += remainder > 0 ? step : -step;
    }
    else if (value >= max - remainder) {
        aligned = max;
    }
    // make sure the value is within acceptable limits
    aligned = clampValue(aligned, limits?.[0] ?? min, limits?.[1] ?? max);
    // make sure the returned value is set to the precision desired
    // this is also because javascript often returns weird floats
    // when dealing with odd numbers and percentages
    return coerceFloat(aligned, precision);
};
/**
 * helper to take a string of html and return only the text
 * @param {string} possibleHtml the string that may contain html
 * @return {string} the text from the input
 */
const pureText = (possibleHtml = '') => {
    return `${possibleHtml}`.replace(/<[^>]*>/g, '');
};
/**
 * normalise a mouse or touch event to return the
 * client (x/y) object for that event
 * @param {event} event a mouse/touch event to normalise
 * @returns {object} normalised event client object (x,y)
 **/
const normalisedClient = (event) => {
    const { clientX, clientY } = 'touches' in event ? event.touches[0] || event.changedTouches[0] : event;
    return { x: clientX, y: clientY };
};
/**
 * helper func to get the index of an element in it's DOM container
 * @param {Element} el dom object reference we want the index of
 * @returns {number} the index of the input element
 **/
const elementIndex = (el) => {
    if (!el)
        return -1;
    var i = 0;
    while ((el = el.previousElementSibling)) {
        i++;
    }
    return i;
};
/**
 * helper to check if the given value is inside the range
 * @param value the value to check
 * @param range the range of values to check against
 * @param type the type of range to check against
 * @returns {boolean} true if the value is in the range
 */
const isInRange = (value, range, type) => {
    if (type === 'min') {
        // if the range is 'min', then we're checking if the value is above the min value
        return range[0] > value;
    }
    else if (type === 'max') {
        // if the range is 'max', then we're checking if the value is below the max value
        return range[0] < value;
    }
    else if (type) {
        // if the range is a boolean of true, then we're checking if the value is in the range
        return range[0] < value && range[1] > value;
    }
};
/**
 * helper to check if the given value is outside of the limits
 * @param value the value to check
 * @param limits the limits to check against
 * @returns {boolean} true if the value is out of the limits
 */
const isOutOfLimit = (value, limits) => {
    if (!limits)
        return false;
    return value < limits[0] || value > limits[1];
};
/**
 * helper to check if the given value is selected
 * @param value the value to check if is selected
 * @param values the values to check against
 * @param precision the precision to check against
 * @returns {boolean} true if the value is selected
 */
const isSelected = (value, values, precision = 2) => {
    return values.some((v) => coerceFloat(v, precision) === coerceFloat(value, precision));
};
/**
 * helper to return the value of a pip based on the index, and the min/max values,
 * and the step of the range slider
 * @param index  the index of the pip
 * @param min  the minimum value of the range slider
 * @param max the maximum value of the range slider
 * @param pipStep the step of the pips
 * @param step the step of the range slider
 * @param precision the precision to check against
 * @returns {number} the value of the pip
 */
const getValueFromIndex = (index, min, max, pipStep, step, precision = 2) => {
    return coerceFloat(min + index * step * pipStep, precision);
};
/**
 * Calculate pointer position, percentage and value for a slider interaction
 * @param clientPos The normalized client position (x,y)
 * @param dims The slider's bounding rectangle dimensions
 * @param vertical Whether the slider is vertical
 * @param reversed Whether the slider is reversed
 * @param min The minimum value of the slider
 * @param max The maximum value of the slider
 * @returns Object containing pointer position, percentage and value
 */
const calculatePointerValues = (slider, clientPos, vertical, reversed, min, max) => {
    // first make sure we have the latest dimensions
    // of the slider, as it may have changed size
    const dims = slider.getBoundingClientRect();
    // calculate the interaction position, percent and value
    let pointerPos = 0;
    let pointerPercent = 0;
    let pointerVal = 0;
    if (vertical) {
        pointerPos = clientPos.y - dims.top;
        pointerPercent = (pointerPos / dims.height) * 100;
        pointerPercent = reversed ? pointerPercent : 100 - pointerPercent;
    }
    else {
        pointerPos = clientPos.x - dims.left;
        pointerPercent = (pointerPos / dims.width) * 100;
        pointerPercent = reversed ? 100 - pointerPercent : pointerPercent;
    }
    pointerVal = percentAsValue(pointerPercent, min, max);
    return { pointerVal, pointerPercent };
};

/* src/lib/components/RangePips.svelte generated by Svelte v4.2.20 */

function add_css$1(target) {
	append_styles(target, "svelte-it72d8", ".rangePips{--pip:var(--range-pip, var(--slider-base));--pip-text:var(--range-pip-text, var(--pip));--pip-active:var(--range-pip-active, var(--slider-fg));--pip-active-text:var(--range-pip-active-text, var(--pip-active));--pip-hover:var(--range-pip-hover, var(--slider-fg));--pip-hover-text:var(--range-pip-hover-text, var(--pip-hover));--pip-in-range:var(--range-pip-in-range, var(--pip-active));--pip-in-range-text:var(--range-pip-in-range-text, var(--pip-active-text));--pip-out-of-limit:var(--range-pip-out-of-limit, var(--slider-base-100));--pip-out-of-limit-text:var(--range-pip-out-of-limit-text, var(--pip-out-of-limit))}.rangePips{position:absolute;transform:translate3d(0, 0, 0.001px);height:1em;left:0;right:0;bottom:-1em;font-variant-numeric:tabular-nums}.rangePips.rsVertical{height:auto;width:1em;left:100%;right:auto;top:0;bottom:0}.rangePips .rsPip{height:0.4em;position:absolute;top:0.25em;width:1px;white-space:nowrap;transform:translate3d(0, 0, 0.001px)}.rangePips.rsVertical .rsPip{height:1px;width:0.4em;left:0.25em;top:auto;bottom:auto}.rangePips .rsPipVal{position:absolute;top:0.4em;transform:translate(-50%, 25%);display:inline-flex}.rangePips.rsVertical .rsPipVal{position:absolute;top:0;left:0.4em;transform:translate(25%, -50%)}.rangePips .rsPip{transition:all 0.15s ease}.rangePips .rsPipVal{transition:all 0.15s ease,\n      font-weight 0s linear}.rangePips .rsPip{color:var(--pip-text);background-color:var(--pip)}.rangePips .rsPip.rsSelected{color:var(--pip-active-text);background-color:var(--pip-active)}.rangePips.rsHoverable:not(.rsDisabled) .rsPip:not(.rsOutOfLimit):hover{color:var(--pip-hover-text);background-color:var(--pip-hover)}.rangePips .rsPip.rsInRange{color:var(--pip-in-range-text);background-color:var(--pip-in-range)}.rangePips .rsPip.rsOutOfLimit{color:var(--pip-out-of-limit-text);background-color:var(--pip-out-of-limit)}.rangePips .rsPip.rsSelected{height:0.75em}.rangePips.rsVertical .rsPip.rsSelected{height:1px;width:0.75em}.rangePips .rsPip.rsSelected .rsPipVal{font-weight:bold;top:0.75em}.rangePips.rsVertical .rsPip.rsSelected .rsPipVal{top:0;left:0.75em}.rangePips.rsHoverable:not(.rsDisabled) .rsPip:not(.rsSelected):not(.rsOutOfLimit):hover{transition:none}.rangePips.rsHoverable:not(.rsDisabled) .rsPip:not(.rsSelected):not(.rsOutOfLimit):hover .rsPipVal{transition:none;font-weight:bold}");
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[36] = list[i];
	child_ctx[39] = i;
	const constants_0 = getValueFromIndex(/*i*/ child_ctx[39], /*min*/ child_ctx[1], /*max*/ child_ctx[2], /*finalPipStep*/ child_ctx[21], /*step*/ child_ctx[3], /*precision*/ child_ctx[17]);
	child_ctx[37] = constants_0;
	return child_ctx;
}

// (90:2) {#if (all && first !== false) || first}
function create_if_block_9$1(ctx) {
	let span;
	let span_style_value;
	let span_data_val_value;
	let mounted;
	let dispose;
	let if_block = (/*all*/ ctx[10] === 'label' || /*first*/ ctx[11] === 'label') && create_if_block_10$1(ctx);

	return {
		c() {
			span = element("span");
			if (if_block) if_block.c();
			attr(span, "class", "rsPip rsPip--first");
			attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[19] + ": 0%;"));
			attr(span, "data-val", span_data_val_value = coerceFloat(/*min*/ ctx[1], /*precision*/ ctx[17]));
			attr(span, "data-index", 0);
			toggle_class(span, "rsSelected", isSelected(/*min*/ ctx[1], /*values*/ ctx[4], /*precision*/ ctx[17]));
			toggle_class(span, "rsInRange", isInRange(/*min*/ ctx[1], /*values*/ ctx[4], /*range*/ ctx[0]));
			toggle_class(span, "rsOutOfLimit", isOutOfLimit(/*min*/ ctx[1], /*limits*/ ctx[9]));
		},
		m(target, anchor) {
			insert(target, span, anchor);
			if (if_block) if_block.m(span, null);

			if (!mounted) {
				dispose = [
					listen(span, "pointerdown", /*pointerdown_handler*/ ctx[29]),
					listen(span, "pointerup", /*pointerup_handler*/ ctx[30])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*all*/ ctx[10] === 'label' || /*first*/ ctx[11] === 'label') {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_10$1(ctx);
					if_block.c();
					if_block.m(span, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*orientationStart*/ 524288 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[19] + ": 0%;"))) {
				attr(span, "style", span_style_value);
			}

			if (dirty[0] & /*min, precision*/ 131074 && span_data_val_value !== (span_data_val_value = coerceFloat(/*min*/ ctx[1], /*precision*/ ctx[17]))) {
				attr(span, "data-val", span_data_val_value);
			}

			if (dirty[0] & /*min, values, precision*/ 131090) {
				toggle_class(span, "rsSelected", isSelected(/*min*/ ctx[1], /*values*/ ctx[4], /*precision*/ ctx[17]));
			}

			if (dirty[0] & /*min, values, range*/ 19) {
				toggle_class(span, "rsInRange", isInRange(/*min*/ ctx[1], /*values*/ ctx[4], /*range*/ ctx[0]));
			}

			if (dirty[0] & /*min, limits*/ 514) {
				toggle_class(span, "rsOutOfLimit", isOutOfLimit(/*min*/ ctx[1], /*limits*/ ctx[9]));
			}
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}

			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (106:6) {#if all === 'label' || first === 'label'}
function create_if_block_10$1(ctx) {
	let span;
	let t0;
	let html_tag;
	let raw_value = /*formatter*/ ctx[16](coerceFloat(/*min*/ ctx[1], /*precision*/ ctx[17]), 0, 0) + "";
	let t1;
	let if_block0 = /*prefix*/ ctx[14] && create_if_block_12(ctx);
	let if_block1 = /*suffix*/ ctx[15] && create_if_block_11$1(ctx);

	return {
		c() {
			span = element("span");
			if (if_block0) if_block0.c();
			t0 = space();
			html_tag = new HtmlTag(false);
			t1 = space();
			if (if_block1) if_block1.c();
			html_tag.a = t1;
			attr(span, "class", "rsPipVal");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			if (if_block0) if_block0.m(span, null);
			append(span, t0);
			html_tag.m(raw_value, span);
			append(span, t1);
			if (if_block1) if_block1.m(span, null);
		},
		p(ctx, dirty) {
			if (/*prefix*/ ctx[14]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_12(ctx);
					if_block0.c();
					if_block0.m(span, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*formatter, min, precision*/ 196610 && raw_value !== (raw_value = /*formatter*/ ctx[16](coerceFloat(/*min*/ ctx[1], /*precision*/ ctx[17]), 0, 0) + "")) html_tag.p(raw_value);

			if (/*suffix*/ ctx[15]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_11$1(ctx);
					if_block1.c();
					if_block1.m(span, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

// (108:10) {#if prefix}
function create_if_block_12(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*prefix*/ ctx[14]);
			attr(span, "class", "rsPipValPrefix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefix*/ 16384) set_data(t, /*prefix*/ ctx[14]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (110:10) {#if suffix}
function create_if_block_11$1(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*suffix*/ ctx[15]);
			attr(span, "class", "rsPipValSuffix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*suffix*/ 32768) set_data(t, /*suffix*/ ctx[15]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (116:2) {#if (all && rest !== false) || rest}
function create_if_block_4$1(ctx) {
	let each_1_anchor;
	let each_value = ensure_array_like(Array(/*pipCount*/ ctx[20]));
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
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
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*orientationStart, min, max, finalPipStep, step, precision, values, range, limits, labelDown, labelUp, suffix, formatter, prefix, all, rest, pipCount*/ 16508447) {
				each_value = ensure_array_like(Array(/*pipCount*/ ctx[20]));
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
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
			if (detaching) {
				detach(each_1_anchor);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

// (119:6) {#if val > min && val < max}
function create_if_block_5$1(ctx) {
	let span;
	let t;
	let span_style_value;
	let span_data_val_value;
	let mounted;
	let dispose;
	let if_block = (/*all*/ ctx[10] === 'label' || /*rest*/ ctx[13] === 'label') && create_if_block_6$1(ctx);

	function pointerup_handler_1(...args) {
		return /*pointerup_handler_1*/ ctx[32](/*val*/ ctx[37], ...args);
	}

	return {
		c() {
			span = element("span");
			if (if_block) if_block.c();
			t = space();
			attr(span, "class", "rsPip");
			attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[19] + ": " + valueAsPercent(/*val*/ ctx[37], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[17]) + "%;"));
			attr(span, "data-val", span_data_val_value = /*val*/ ctx[37]);
			attr(span, "data-index", /*i*/ ctx[39]);
			toggle_class(span, "rsSelected", isSelected(/*val*/ ctx[37], /*values*/ ctx[4], /*precision*/ ctx[17]));
			toggle_class(span, "rsInRange", isInRange(/*val*/ ctx[37], /*values*/ ctx[4], /*range*/ ctx[0]));
			toggle_class(span, "rsOutOfLimit", isOutOfLimit(/*val*/ ctx[37], /*limits*/ ctx[9]));
		},
		m(target, anchor) {
			insert(target, span, anchor);
			if (if_block) if_block.m(span, null);
			append(span, t);

			if (!mounted) {
				dispose = [
					listen(span, "pointerdown", /*pointerdown_handler_1*/ ctx[31]),
					listen(span, "pointerup", pointerup_handler_1)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (/*all*/ ctx[10] === 'label' || /*rest*/ ctx[13] === 'label') {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_6$1(ctx);
					if_block.c();
					if_block.m(span, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*orientationStart, min, max, finalPipStep, step, precision*/ 2752526 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[19] + ": " + valueAsPercent(/*val*/ ctx[37], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[17]) + "%;"))) {
				attr(span, "style", span_style_value);
			}

			if (dirty[0] & /*min, max, finalPipStep, step, precision*/ 2228238 && span_data_val_value !== (span_data_val_value = /*val*/ ctx[37])) {
				attr(span, "data-val", span_data_val_value);
			}

			if (dirty[0] & /*min, max, finalPipStep, step, precision, values*/ 2228254) {
				toggle_class(span, "rsSelected", isSelected(/*val*/ ctx[37], /*values*/ ctx[4], /*precision*/ ctx[17]));
			}

			if (dirty[0] & /*min, max, finalPipStep, step, precision, values, range*/ 2228255) {
				toggle_class(span, "rsInRange", isInRange(/*val*/ ctx[37], /*values*/ ctx[4], /*range*/ ctx[0]));
			}

			if (dirty[0] & /*min, max, finalPipStep, step, precision, limits*/ 2228750) {
				toggle_class(span, "rsOutOfLimit", isOutOfLimit(/*val*/ ctx[37], /*limits*/ ctx[9]));
			}
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}

			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (135:10) {#if all === 'label' || rest === 'label'}
function create_if_block_6$1(ctx) {
	let span;
	let t0;
	let html_tag;
	let raw_value = /*formatter*/ ctx[16](/*val*/ ctx[37], /*i*/ ctx[39], valueAsPercent(/*val*/ ctx[37], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[17])) + "";
	let t1;
	let if_block0 = create_if_block_8$1(ctx);
	let if_block1 = create_if_block_7$1(ctx);

	return {
		c() {
			span = element("span");
			if (if_block0) if_block0.c();
			t0 = space();
			html_tag = new HtmlTag(false);
			t1 = space();
			if (if_block1) if_block1.c();
			html_tag.a = t1;
			attr(span, "class", "rsPipVal");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			if (if_block0) if_block0.m(span, null);
			append(span, t0);
			html_tag.m(raw_value, span);
			append(span, t1);
			if (if_block1) if_block1.m(span, null);
		},
		p(ctx, dirty) {
			{
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_8$1(ctx);
					if_block0.c();
					if_block0.m(span, t0);
				}
			}

			if (dirty[0] & /*formatter, min, max, finalPipStep, step, precision*/ 2293774 && raw_value !== (raw_value = /*formatter*/ ctx[16](/*val*/ ctx[37], /*i*/ ctx[39], valueAsPercent(/*val*/ ctx[37], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[17])) + "")) html_tag.p(raw_value);

			{
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_7$1(ctx);
					if_block1.c();
					if_block1.m(span, null);
				}
			}
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

// (137:14) {#if true || prefix}
function create_if_block_8$1(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*prefix*/ ctx[14]);
			attr(span, "class", "rsPipValPrefix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefix*/ 16384) set_data(t, /*prefix*/ ctx[14]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (139:14) {#if true || suffix}
function create_if_block_7$1(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*suffix*/ ctx[15]);
			attr(span, "class", "rsPipValSuffix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*suffix*/ 32768) set_data(t, /*suffix*/ ctx[15]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (117:4) {#each Array(pipCount) as _, i}
function create_each_block$1(ctx) {
	let if_block_anchor;
	let if_block = /*val*/ ctx[37] > /*min*/ ctx[1] && /*val*/ ctx[37] < /*max*/ ctx[2] && create_if_block_5$1(ctx);

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
			if (/*val*/ ctx[37] > /*min*/ ctx[1] && /*val*/ ctx[37] < /*max*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_5$1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(if_block_anchor);
			}

			if (if_block) if_block.d(detaching);
		}
	};
}

// (147:2) {#if (all && last !== false) || last}
function create_if_block$1(ctx) {
	let span;
	let span_style_value;
	let span_data_val_value;
	let mounted;
	let dispose;
	let if_block = (/*all*/ ctx[10] === 'label' || /*last*/ ctx[12] === 'label') && create_if_block_1$1(ctx);

	return {
		c() {
			span = element("span");
			if (if_block) if_block.c();
			attr(span, "class", "rsPip rsPip--last");
			attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[19] + ": 100%;"));
			attr(span, "data-val", span_data_val_value = coerceFloat(/*max*/ ctx[2], /*precision*/ ctx[17]));
			attr(span, "data-index", /*pipCount*/ ctx[20]);
			toggle_class(span, "rsSelected", isSelected(/*max*/ ctx[2], /*values*/ ctx[4], /*precision*/ ctx[17]));
			toggle_class(span, "rsInRange", isInRange(/*max*/ ctx[2], /*values*/ ctx[4], /*range*/ ctx[0]));
			toggle_class(span, "rsOutOfLimit", isOutOfLimit(/*max*/ ctx[2], /*limits*/ ctx[9]));
		},
		m(target, anchor) {
			insert(target, span, anchor);
			if (if_block) if_block.m(span, null);

			if (!mounted) {
				dispose = [
					listen(span, "pointerdown", /*pointerdown_handler_2*/ ctx[33]),
					listen(span, "pointerup", /*pointerup_handler_2*/ ctx[34])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*all*/ ctx[10] === 'label' || /*last*/ ctx[12] === 'label') {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1$1(ctx);
					if_block.c();
					if_block.m(span, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*orientationStart*/ 524288 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[19] + ": 100%;"))) {
				attr(span, "style", span_style_value);
			}

			if (dirty[0] & /*max, precision*/ 131076 && span_data_val_value !== (span_data_val_value = coerceFloat(/*max*/ ctx[2], /*precision*/ ctx[17]))) {
				attr(span, "data-val", span_data_val_value);
			}

			if (dirty[0] & /*pipCount*/ 1048576) {
				attr(span, "data-index", /*pipCount*/ ctx[20]);
			}

			if (dirty[0] & /*max, values, precision*/ 131092) {
				toggle_class(span, "rsSelected", isSelected(/*max*/ ctx[2], /*values*/ ctx[4], /*precision*/ ctx[17]));
			}

			if (dirty[0] & /*max, values, range*/ 21) {
				toggle_class(span, "rsInRange", isInRange(/*max*/ ctx[2], /*values*/ ctx[4], /*range*/ ctx[0]));
			}

			if (dirty[0] & /*max, limits*/ 516) {
				toggle_class(span, "rsOutOfLimit", isOutOfLimit(/*max*/ ctx[2], /*limits*/ ctx[9]));
			}
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}

			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (163:6) {#if all === 'label' || last === 'label'}
function create_if_block_1$1(ctx) {
	let span;
	let t0;
	let html_tag;
	let raw_value = /*formatter*/ ctx[16](coerceFloat(/*max*/ ctx[2], /*precision*/ ctx[17]), /*pipCount*/ ctx[20], 100) + "";
	let t1;
	let if_block0 = /*prefix*/ ctx[14] && create_if_block_3$1(ctx);
	let if_block1 = /*suffix*/ ctx[15] && create_if_block_2$1(ctx);

	return {
		c() {
			span = element("span");
			if (if_block0) if_block0.c();
			t0 = space();
			html_tag = new HtmlTag(false);
			t1 = space();
			if (if_block1) if_block1.c();
			html_tag.a = t1;
			attr(span, "class", "rsPipVal");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			if (if_block0) if_block0.m(span, null);
			append(span, t0);
			html_tag.m(raw_value, span);
			append(span, t1);
			if (if_block1) if_block1.m(span, null);
		},
		p(ctx, dirty) {
			if (/*prefix*/ ctx[14]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_3$1(ctx);
					if_block0.c();
					if_block0.m(span, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*formatter, max, precision, pipCount*/ 1245188 && raw_value !== (raw_value = /*formatter*/ ctx[16](coerceFloat(/*max*/ ctx[2], /*precision*/ ctx[17]), /*pipCount*/ ctx[20], 100) + "")) html_tag.p(raw_value);

			if (/*suffix*/ ctx[15]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2$1(ctx);
					if_block1.c();
					if_block1.m(span, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

// (165:10) {#if prefix}
function create_if_block_3$1(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*prefix*/ ctx[14]);
			attr(span, "class", "rsPipValPrefix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefix*/ 16384) set_data(t, /*prefix*/ ctx[14]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (167:10) {#if suffix}
function create_if_block_2$1(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*suffix*/ ctx[15]);
			attr(span, "class", "rsPipValSuffix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*suffix*/ 32768) set_data(t, /*suffix*/ ctx[15]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

function create_fragment$1(ctx) {
	let div;
	let t0;
	let t1;
	let if_block0 = (/*all*/ ctx[10] && /*first*/ ctx[11] !== false || /*first*/ ctx[11]) && create_if_block_9$1(ctx);
	let if_block1 = (/*all*/ ctx[10] && /*rest*/ ctx[13] !== false || /*rest*/ ctx[13]) && create_if_block_4$1(ctx);
	let if_block2 = (/*all*/ ctx[10] && /*last*/ ctx[12] !== false || /*last*/ ctx[12]) && create_if_block$1(ctx);

	return {
		c() {
			div = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if (if_block2) if_block2.c();
			attr(div, "class", "rangePips");
			toggle_class(div, "rsDisabled", /*disabled*/ ctx[8]);
			toggle_class(div, "rsHoverable", /*hoverable*/ ctx[7]);
			toggle_class(div, "rsVertical", /*vertical*/ ctx[5]);
			toggle_class(div, "rsReversed", /*reversed*/ ctx[6]);
			toggle_class(div, "rsFocus", /*focus*/ ctx[18]);
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
			if (/*all*/ ctx[10] && /*first*/ ctx[11] !== false || /*first*/ ctx[11]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_9$1(ctx);
					if_block0.c();
					if_block0.m(div, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*all*/ ctx[10] && /*rest*/ ctx[13] !== false || /*rest*/ ctx[13]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_4$1(ctx);
					if_block1.c();
					if_block1.m(div, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*all*/ ctx[10] && /*last*/ ctx[12] !== false || /*last*/ ctx[12]) {
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

			if (dirty[0] & /*disabled*/ 256) {
				toggle_class(div, "rsDisabled", /*disabled*/ ctx[8]);
			}

			if (dirty[0] & /*hoverable*/ 128) {
				toggle_class(div, "rsHoverable", /*hoverable*/ ctx[7]);
			}

			if (dirty[0] & /*vertical*/ 32) {
				toggle_class(div, "rsVertical", /*vertical*/ ctx[5]);
			}

			if (dirty[0] & /*reversed*/ 64) {
				toggle_class(div, "rsReversed", /*reversed*/ ctx[6]);
			}

			if (dirty[0] & /*focus*/ 262144) {
				toggle_class(div, "rsFocus", /*focus*/ ctx[18]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
		}
	};
}

const limitPipCount = 500;

function instance$1($$self, $$props, $$invalidate) {
	let stepMax;
	let tooManySteps;
	let { range = false } = $$props;
	let { min = 0 } = $$props;
	let { max = 100 } = $$props;
	let { step = 1 } = $$props;
	let { value = (max + min) / 2 } = $$props;
	let { values = [value] } = $$props;
	let { vertical = false } = $$props;
	let { reversed = false } = $$props;
	let { hoverable = true } = $$props;
	let { disabled = false } = $$props;
	let { limits = null } = $$props;
	let { pipstep = undefined } = $$props;
	let { all = true } = $$props;
	let { first = undefined } = $$props;
	let { last = undefined } = $$props;
	let { rest = undefined } = $$props;
	let { prefix = '' } = $$props;
	let { suffix = '' } = $$props;
	let { formatter = (v, i, p) => v } = $$props;
	let { precision = 2 } = $$props;
	let { focus } = $$props;
	let { orientationStart } = $$props;
	let { moveHandle } = $$props;
	let clientStart = null;

	// track the number of pips we're actually going to render
	let pipCount = 0;

	// track the final pipstep we're going to use
	let finalPipStep = 1;

	/**
 * function to run when the user clicks on a label
 * we store the original client position so we can check if the user has moved the mouse/finger
 * @param {event} event the event from browser
 **/
	function labelDown(event) {
		clientStart = normalisedClient(event);
	}

	/**
 * function to run when the user releases the mouse/finger
 * we check if the user has moved the mouse/finger, if not we "click" the label
 * and move the handle it to the label position
 * @param {number} pipValue the value of the label
 * @param {event} e the event from browser
 */
	function labelUp(pipValue, event) {
		const clientEnd = normalisedClient(event);

		if (!disabled && clientStart) {
			const distanceMoved = Math.sqrt(Math.pow(clientStart.x - clientEnd.x, 2) + Math.pow(clientStart.y - clientEnd.y, 2));

			if (distanceMoved <= 5) {
				moveHandle(null, pipValue);
			}

			clientStart = null;
		}
	}

	const pointerdown_handler = e => {
		labelDown(e);
	};

	const pointerup_handler = e => {
		labelUp(min, e);
	};

	const pointerdown_handler_1 = e => {
		labelDown(e);
	};

	const pointerup_handler_1 = (val, e) => {
		labelUp(val, e);
	};

	const pointerdown_handler_2 = e => {
		labelDown(e);
	};

	const pointerup_handler_2 = e => {
		labelUp(max, e);
	};

	$$self.$$set = $$props => {
		if ('range' in $$props) $$invalidate(0, range = $$props.range);
		if ('min' in $$props) $$invalidate(1, min = $$props.min);
		if ('max' in $$props) $$invalidate(2, max = $$props.max);
		if ('step' in $$props) $$invalidate(3, step = $$props.step);
		if ('value' in $$props) $$invalidate(24, value = $$props.value);
		if ('values' in $$props) $$invalidate(4, values = $$props.values);
		if ('vertical' in $$props) $$invalidate(5, vertical = $$props.vertical);
		if ('reversed' in $$props) $$invalidate(6, reversed = $$props.reversed);
		if ('hoverable' in $$props) $$invalidate(7, hoverable = $$props.hoverable);
		if ('disabled' in $$props) $$invalidate(8, disabled = $$props.disabled);
		if ('limits' in $$props) $$invalidate(9, limits = $$props.limits);
		if ('pipstep' in $$props) $$invalidate(25, pipstep = $$props.pipstep);
		if ('all' in $$props) $$invalidate(10, all = $$props.all);
		if ('first' in $$props) $$invalidate(11, first = $$props.first);
		if ('last' in $$props) $$invalidate(12, last = $$props.last);
		if ('rest' in $$props) $$invalidate(13, rest = $$props.rest);
		if ('prefix' in $$props) $$invalidate(14, prefix = $$props.prefix);
		if ('suffix' in $$props) $$invalidate(15, suffix = $$props.suffix);
		if ('formatter' in $$props) $$invalidate(16, formatter = $$props.formatter);
		if ('precision' in $$props) $$invalidate(17, precision = $$props.precision);
		if ('focus' in $$props) $$invalidate(18, focus = $$props.focus);
		if ('orientationStart' in $$props) $$invalidate(19, orientationStart = $$props.orientationStart);
		if ('moveHandle' in $$props) $$invalidate(26, moveHandle = $$props.moveHandle);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*vertical*/ 32) {
			// by default we would like to show maximum of 50 pips vertically and 100 horizontally
			$$invalidate(27, stepMax = vertical ? 50 : 100);
		}

		if ($$self.$$.dirty[0] & /*max, min, step, stepMax*/ 134217742) {
			// track if the amount of steps calculated is greater than the max we'd like to show
			$$invalidate(28, tooManySteps = (max - min) / step >= stepMax);
		}

		if ($$self.$$.dirty[0] & /*pipstep, tooManySteps, max, min, stepMax, step, finalPipStep, pipCount*/ 439353358) {
			{
				// if no pipstep is provided, we use a sensible default (respecting the stepMax check)
				$$invalidate(21, finalPipStep = pipstep ?? (tooManySteps ? (max - min) / (stepMax / 5) : 1));

				$$invalidate(20, pipCount = Math.ceil((max - min) / (step * finalPipStep)));

				// there's no way a browser can render over thousands of pips without performance issues,
				// so we should limit and warn the user if they're trying to render too many
				if (pipCount > limitPipCount) {
					console.warn('RangePips: You are trying to render too many pips. This will cause performance issues. Try increasing the "pipstep" prop to reduce the number of pips shown.');

					// start increasing the finalPipStep until we get a pipCount below limitPipCount
					while (pipCount >= limitPipCount) {
						$$invalidate(21, finalPipStep = finalPipStep + finalPipStep);
						$$invalidate(20, pipCount = Math.ceil((max - min) / (step * finalPipStep)));
					}
				}
			}
		}
	};

	return [
		range,
		min,
		max,
		step,
		values,
		vertical,
		reversed,
		hoverable,
		disabled,
		limits,
		all,
		first,
		last,
		rest,
		prefix,
		suffix,
		formatter,
		precision,
		focus,
		orientationStart,
		pipCount,
		finalPipStep,
		labelDown,
		labelUp,
		value,
		pipstep,
		moveHandle,
		stepMax,
		tooManySteps,
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
			instance$1,
			create_fragment$1,
			safe_not_equal,
			{
				range: 0,
				min: 1,
				max: 2,
				step: 3,
				value: 24,
				values: 4,
				vertical: 5,
				reversed: 6,
				hoverable: 7,
				disabled: 8,
				limits: 9,
				pipstep: 25,
				all: 10,
				first: 11,
				last: 12,
				rest: 13,
				prefix: 14,
				suffix: 15,
				formatter: 16,
				precision: 17,
				focus: 18,
				orientationStart: 19,
				moveHandle: 26
			},
			add_css$1,
			[-1, -1]
		);
	}

	get range() {
		return this.$$.ctx[0];
	}

	set range(range) {
		this.$$set({ range });
		flush();
	}

	get min() {
		return this.$$.ctx[1];
	}

	set min(min) {
		this.$$set({ min });
		flush();
	}

	get max() {
		return this.$$.ctx[2];
	}

	set max(max) {
		this.$$set({ max });
		flush();
	}

	get step() {
		return this.$$.ctx[3];
	}

	set step(step) {
		this.$$set({ step });
		flush();
	}

	get value() {
		return this.$$.ctx[24];
	}

	set value(value) {
		this.$$set({ value });
		flush();
	}

	get values() {
		return this.$$.ctx[4];
	}

	set values(values) {
		this.$$set({ values });
		flush();
	}

	get vertical() {
		return this.$$.ctx[5];
	}

	set vertical(vertical) {
		this.$$set({ vertical });
		flush();
	}

	get reversed() {
		return this.$$.ctx[6];
	}

	set reversed(reversed) {
		this.$$set({ reversed });
		flush();
	}

	get hoverable() {
		return this.$$.ctx[7];
	}

	set hoverable(hoverable) {
		this.$$set({ hoverable });
		flush();
	}

	get disabled() {
		return this.$$.ctx[8];
	}

	set disabled(disabled) {
		this.$$set({ disabled });
		flush();
	}

	get limits() {
		return this.$$.ctx[9];
	}

	set limits(limits) {
		this.$$set({ limits });
		flush();
	}

	get pipstep() {
		return this.$$.ctx[25];
	}

	set pipstep(pipstep) {
		this.$$set({ pipstep });
		flush();
	}

	get all() {
		return this.$$.ctx[10];
	}

	set all(all) {
		this.$$set({ all });
		flush();
	}

	get first() {
		return this.$$.ctx[11];
	}

	set first(first) {
		this.$$set({ first });
		flush();
	}

	get last() {
		return this.$$.ctx[12];
	}

	set last(last) {
		this.$$set({ last });
		flush();
	}

	get rest() {
		return this.$$.ctx[13];
	}

	set rest(rest) {
		this.$$set({ rest });
		flush();
	}

	get prefix() {
		return this.$$.ctx[14];
	}

	set prefix(prefix) {
		this.$$set({ prefix });
		flush();
	}

	get suffix() {
		return this.$$.ctx[15];
	}

	set suffix(suffix) {
		this.$$set({ suffix });
		flush();
	}

	get formatter() {
		return this.$$.ctx[16];
	}

	set formatter(formatter) {
		this.$$set({ formatter });
		flush();
	}

	get precision() {
		return this.$$.ctx[17];
	}

	set precision(precision) {
		this.$$set({ precision });
		flush();
	}

	get focus() {
		return this.$$.ctx[18];
	}

	set focus(focus) {
		this.$$set({ focus });
		flush();
	}

	get orientationStart() {
		return this.$$.ctx[19];
	}

	set orientationStart(orientationStart) {
		this.$$set({ orientationStart });
		flush();
	}

	get moveHandle() {
		return this.$$.ctx[26];
	}

	set moveHandle(moveHandle) {
		this.$$set({ moveHandle });
		flush();
	}
}

create_custom_element(RangePips, {"range":{"type":"Boolean"},"min":{},"max":{},"step":{},"value":{},"values":{},"vertical":{"type":"Boolean"},"reversed":{"type":"Boolean"},"hoverable":{"type":"Boolean"},"disabled":{"type":"Boolean"},"limits":{},"pipstep":{},"all":{"type":"Boolean"},"first":{},"last":{},"rest":{},"prefix":{},"suffix":{},"formatter":{},"precision":{},"focus":{},"orientationStart":{},"moveHandle":{}}, [], [], true);

/* src/lib/components/RangeSlider.svelte generated by Svelte v4.2.20 */

function add_css(target) {
	append_styles(target, "svelte-t40ln7", "@layer base{.rangeSlider{--slider-accent:#4a40d4;--slider-accent-100:#838de7;--slider-base:#99a2a2;--slider-base-100:#b9c2c2;--slider-bg:#d7dada;--slider-fg:#3f3e4f;--slider-dark-accent:#6070fc;--slider-dark-accent-100:#7a7fab;--slider-dark-base:#82809f;--slider-dark-base-100:#595868;--slider-dark-bg:#3f3e4f;--slider-dark-fg:#d7dada;--slider:var(--range-slider, var(--slider-bg));--handle-inactive:var(--range-handle-inactive, var(--slider-base));--handle:var(--range-handle, var(--slider-accent-100));--handle-focus:var(--range-handle-focus, var(--slider-accent));--handle-border:var(--range-handle-border, var(--handle));--range-inactive:var(--range-range-inactive, var(--handle-inactive));--range:var(--range-range, var(--handle-focus));--range-limit:var(--range-range-limit, var(--slider-base-100));--range-hover:var(--range-range-hover, var(--handle-border));--range-press:var(--range-range-press, var(--handle-border));--float-inactive:var(--range-float-inactive, var(--handle-inactive));--float:var(--range-float, var(--handle-focus));--float-text:var(--range-float-text, white)}.rangeSlider.rsDark{--slider-accent:var(--slider-dark-accent);--slider-accent-100:var(--slider-dark-accent-100);--slider-base:var(--slider-dark-base);--slider-base-100:var(--slider-dark-base-100);--slider-bg:var(--slider-dark-bg);--slider-fg:var(--slider-dark-fg)}@media(prefers-color-scheme: dark){.rangeSlider.rsAutoDark{--slider-accent:var(--slider-dark-accent);--slider-accent-100:var(--slider-dark-accent-100);--slider-base:var(--slider-dark-base);--slider-base-100:var(--slider-dark-base-100);--slider-bg:var(--slider-dark-bg);--slider-fg:var(--slider-dark-fg)}}}.rangeSlider{position:relative;border-radius:100px;height:0.5em;margin:1em;transition:opacity 0.2s ease;user-select:none;overflow:visible}.rangeSlider *{user-select:none}.rangeSlider.rsPips{margin-bottom:1.8em}.rangeSlider.rsPipLabels{margin-bottom:2.8em}.rangeSlider.rsVertical{display:inline-block;border-radius:100px;width:0.5em;min-height:200px}.rangeSlider.rsVertical.rsPips{margin-right:1.8em;margin-bottom:1em}.rangeSlider.rsVertical.rsPipLabels{margin-right:2.8em;margin-bottom:1em}.rangeSlider .rangeHandle{position:absolute;display:block;height:1.4em;width:1.4em;top:0.25em;bottom:auto;transform:translateY(-50%) translateX(-50%);translate:calc(var(--slider-length) * (var(--handle-pos) / 100) * 1px) 0;z-index:2}.rangeSlider.rsReversed .rangeHandle{transform:translateY(-50%) translateX(-50%);translate:calc((var(--slider-length) * 1px) - (var(--slider-length) * (var(--handle-pos) / 100) * 1px)) 0}.rangeSlider.rsVertical .rangeHandle{left:0.25em;top:auto;transform:translateY(-50%) translateX(-50%);translate:0 calc(var(--slider-length) * (1 - var(--handle-pos) / 100) * 1px)}.rangeSlider.rsVertical.rsReversed .rangeHandle{transform:translateY(-50%) translateX(-50%);translate:0 calc((var(--slider-length) * 1px) - (var(--slider-length) * (1 - var(--handle-pos) / 100) * 1px))}.rangeSlider .rangeNub,.rangeSlider .rangeHandle::before{position:absolute;left:0;top:0;display:block;border-radius:10em;height:100%;width:100%;transition:background 0.2s ease,\n      box-shadow 0.2s ease}.rangeSlider .rangeHandle::before{content:'';left:1px;top:1px;bottom:1px;right:1px;height:auto;width:auto;box-shadow:0 0 0 0px var(--handle-border);opacity:0;transition:opacity 0.2s ease,\n      box-shadow 0.2s ease}.rangeSlider.rsHoverable:not(.rsDisabled) .rangeHandle:hover::before{box-shadow:0 0 0 8px var(--handle-border);opacity:0.2}.rangeSlider.rsHoverable:not(.rsDisabled) .rangeHandle.rsPress::before,.rangeSlider.rsHoverable:not(.rsDisabled) .rangeHandle.rsPress:hover::before{box-shadow:0 0 0 12px var(--handle-border);opacity:0.4}.rangeSlider.rsRange:not(.rsMin):not(.rsMax) .rangeNub{border-radius:10em 10em 10em 1.6em}.rangeSlider.rsRange .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(-135deg)}.rangeSlider.rsRange .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(45deg)}.rangeSlider.rsRange.rsReversed .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(45deg)}.rangeSlider.rsRange.rsReversed .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(-135deg)}.rangeSlider.rsRange.rsVertical .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(135deg)}.rangeSlider.rsRange.rsVertical .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(-45deg)}.rangeSlider.rsRange.rsVertical.rsReversed .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(-45deg)}.rangeSlider.rsRange.rsVertical.rsReversed .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(135deg)}.rangeSlider .rangeFloat{display:block;position:absolute;left:50%;bottom:1.75em;font-size:1em;text-align:center;pointer-events:none;white-space:nowrap;font-size:0.9em;line-height:1;padding:0.33em 0.5em 0.5em;border-radius:0.5em;z-index:3;opacity:0;translate:-50% -50% 0.01px;scale:1;transform-origin:center;transition:all 0.22s cubic-bezier(0.33, 1, 0.68, 1)}.rangeSlider .rangeHandle.rsActive .rangeFloat,.rangeSlider.rsHoverable .rangeHandle:hover .rangeFloat,.rangeSlider.rsHoverable .rangeBar:hover .rangeFloat,.rangeSlider.rsFocus .rangeBar .rangeFloat{opacity:1;scale:1;translate:-50% 0% 0.01px}.rangeSlider .rangeBar .rangeFloat{bottom:0.875em;z-index:2}.rangeSlider.rsVertical .rangeFloat{top:50%;bottom:auto;left:auto;right:1.75em;translate:-50% -50% 0.01px}.rangeSlider.rsVertical .rangeHandle.rsActive .rangeFloat,.rangeSlider.rsVertical.rsHoverable .rangeHandle:hover .rangeFloat,.rangeSlider.rsVertical.rsHoverable .rangeBar:hover .rangeFloat,.rangeSlider.rsVertical.rsFocus .rangeBar .rangeFloat{translate:0% -50% 0.01px}.rangeSlider.rsVertical .rangeBar .rangeFloat{right:0.875em}.rangeSlider .rangeBar,.rangeSlider .rangeLimit,.rangeSlider.rsDrag .rangeBar::before{position:absolute;display:block;transition:background 0.2s ease;border-radius:1em;height:0.5em;top:0;user-select:none;z-index:1}.rangeSlider.rsVertical .rangeBar,.rangeSlider.rsVertical .rangeLimit,.rangeSlider.rsVertical.rsDrag .rangeBar::before{width:0.5em;height:auto}.rangeSlider .rangeBar{translate:calc((var(--slider-length) * (var(--range-start) / 100) * 1px)) 0;width:calc(var(--slider-length) * (var(--range-size) / 100 * 1px))}.rangeSlider.rsReversed .rangeBar{translate:calc((var(--slider-length) * 1px) - (var(--slider-length) * (var(--range-end) / 100) * 1px)) 0}.rangeSlider.rsVertical .rangeBar{translate:0 calc((var(--slider-length) * 1px) - (var(--slider-length) * (var(--range-end) / 100) * 1px));height:calc(var(--slider-length) * (var(--range-size) / 100 * 1px))}.rangeSlider.rsVertical.rsReversed .rangeBar{translate:0 calc((var(--slider-length) * (var(--range-start) / 100) * 1px))}.rangeSlider.rsDrag .rangeBar::before{content:'';inset:0;top:-0.5em;bottom:-0.5em;height:auto;background-color:var(--range-hover);opacity:0;scale:1 0.5;transition:opacity 0.2s ease,\n      scale 0.2s ease}.rangeSlider.rsVertical.rsDrag .rangeBar::before{inset:0;left:-0.5em;right:-0.5em;width:auto}.rangeSlider.rsHoverable:not(.rsDisabled).rsDrag .rangeBar:hover::before{opacity:0.2;scale:1 1}.rangeSlider.rsHoverable:not(.rsDisabled).rsDrag .rangeBar.rsPress::before{opacity:0.4;scale:1 1.25}.rangeSlider.rsVertical.rsHoverable:not(.rsDisabled).rsDrag .rangeBar.rsPress::before{scale:1.25 1}.rangeSlider{background-color:var(--slider)}.rangeSlider .rangeBar{background-color:var(--range-inactive)}.rangeSlider.rsFocus .rangeBar{background-color:var(--range)}.rangeSlider .rangeLimit{background-color:var(--range-limit)}.rangeSlider .rangeNub{background-color:var(--handle-inactive)}.rangeSlider.rsFocus .rangeNub{background-color:var(--handle)}.rangeSlider .rangeHandle.rsActive .rangeNub{background-color:var(--handle-focus)}.rangeSlider .rangeFloat{color:var(--float-text);background-color:var(--float-inactive)}.rangeSlider.rsFocus .rangeFloat{background-color:var(--float)}.rangeSlider.rsDisabled{opacity:0.5}.rangeSlider.rsDisabled .rangeNub{background-color:var(--handle-inactive)}.rangeSlider .rangeBar,.rangeSlider .rangeHandle{transition:opacity 0.2s ease}");
}

function get_else_ctx(ctx) {
	const child_ctx = ctx.slice();

	const constants_0 = /*reversed*/ child_ctx[16]
	? [/*values*/ child_ctx[3][1], /*values*/ child_ctx[3][0]]
	: [/*values*/ child_ctx[3][0], /*values*/ child_ctx[3][1]];

	child_ctx[31] = constants_0[0];
	child_ctx[98] = constants_0[1];
	return child_ctx;
}

function get_if_ctx(ctx) {
	const child_ctx = ctx.slice();
	const constants_0 = /*rangeStartPercent*/ child_ctx[44](/*$springPositions*/ child_ctx[42]);
	child_ctx[94] = constants_0;
	const constants_1 = /*rangeEndPercent*/ child_ctx[45](/*$springPositions*/ child_ctx[42]);
	child_ctx[95] = constants_1;
	const constants_2 = /*rangeEnd*/ child_ctx[95] - /*rangeStart*/ child_ctx[94];
	child_ctx[96] = constants_2;
	const constants_3 = /*isMounted*/ child_ctx[32] ? `` : `opacity: 0; `;
	child_ctx[97] = constants_3;
	return child_ctx;
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[101] = i;

	const constants_0 = /*focus*/ child_ctx[33] && /*activeHandle*/ child_ctx[36] === /*index*/ child_ctx[101]
	? `z-index: 3; `
	: ``;

	child_ctx[99] = constants_0;
	const constants_1 = /*isMounted*/ child_ctx[32] ? `` : `opacity: 0; `;
	child_ctx[97] = constants_1;
	return child_ctx;
}

function get_if_ctx_1(ctx) {
	const child_ctx = ctx.slice();
	const constants_0 = valueAsPercent(/*value*/ child_ctx[8], /*min*/ child_ctx[1], /*max*/ child_ctx[2], /*precision*/ child_ctx[9]);
	child_ctx[102] = constants_0;
	const constants_1 = /*handleFormatter*/ child_ctx[5](/*value*/ child_ctx[8], /*index*/ child_ctx[101], /*percent*/ child_ctx[102]);
	child_ctx[103] = constants_1;
	return child_ctx;
}

// (802:6) {#if float}
function create_if_block_9(ctx) {
	let span;
	let if_block0_anchor;
	let html_tag;
	let raw_value = /*formattedValue*/ ctx[103] + "";
	let html_anchor;
	let if_block0 = /*prefix*/ ctx[25] && create_if_block_11(ctx);
	let if_block1 = /*suffix*/ ctx[26] && create_if_block_10(ctx);

	return {
		c() {
			span = element("span");
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			html_tag = new HtmlTag(false);
			html_anchor = empty();
			if (if_block1) if_block1.c();
			html_tag.a = html_anchor;
			attr(span, "class", "rangeFloat");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			if (if_block0) if_block0.m(span, null);
			append(span, if_block0_anchor);
			html_tag.m(raw_value, span);
			append(span, html_anchor);
			if (if_block1) if_block1.m(span, null);
		},
		p(ctx, dirty) {
			if (/*prefix*/ ctx[25]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_11(ctx);
					if_block0.c();
					if_block0.m(span, if_block0_anchor);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*handleFormatter, values, min, max, precision*/ 558 && raw_value !== (raw_value = /*formattedValue*/ ctx[103] + "")) html_tag.p(raw_value);

			if (/*suffix*/ ctx[26]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_10(ctx);
					if_block1.c();
					if_block1.m(span, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

// (806:10) {#if prefix}
function create_if_block_11(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*prefix*/ ctx[25]);
			attr(span, "class", "rangeFloatPrefix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefix*/ 33554432) set_data(t, /*prefix*/ ctx[25]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (806:95) {#if suffix}
function create_if_block_10(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*suffix*/ ctx[26]);
			attr(span, "class", "rangeFloatSuffix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*suffix*/ 67108864) set_data(t, /*suffix*/ ctx[26]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (779:2) {#each values as value, index}
function create_each_block(ctx) {
	let span1;
	let span0;
	let t;
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
	let if_block = /*float*/ ctx[14] && create_if_block_9(get_if_ctx_1(ctx));

	return {
		c() {
			span1 = element("span");
			span0 = element("span");
			t = space();
			if (if_block) if_block.c();
			attr(span0, "class", "rangeNub");
			attr(span1, "role", "slider");
			attr(span1, "class", "rangeHandle");
			attr(span1, "data-handle", /*index*/ ctx[101]);
			attr(span1, "style", span1_style_value = `--handle-pos: ${/*$springPositions*/ ctx[42][/*index*/ ctx[101]]};${/*zindex*/ ctx[99]}${/*mountOpacity*/ ctx[97]}`);
			attr(span1, "aria-label", span1_aria_label_value = /*ariaLabels*/ ctx[7][/*index*/ ctx[101]]);

			attr(span1, "aria-valuemin", span1_aria_valuemin_value = /*range*/ ctx[10] === true && /*index*/ ctx[101] === 1
			? /*values*/ ctx[3][0]
			: /*min*/ ctx[1]);

			attr(span1, "aria-valuemax", span1_aria_valuemax_value = /*range*/ ctx[10] === true && /*index*/ ctx[101] === 0
			? /*values*/ ctx[3][1]
			: /*max*/ ctx[2]);

			attr(span1, "aria-valuenow", span1_aria_valuenow_value = /*value*/ ctx[8]);
			attr(span1, "aria-valuetext", span1_aria_valuetext_value = /*ariaLabelFormatter*/ ctx[56](/*value*/ ctx[8], /*index*/ ctx[101]));
			attr(span1, "aria-orientation", span1_aria_orientation_value = /*vertical*/ ctx[13] ? 'vertical' : 'horizontal');
			attr(span1, "aria-disabled", /*disabled*/ ctx[18]);
			attr(span1, "tabindex", span1_tabindex_value = /*disabled*/ ctx[18] ? -1 : 0);
			toggle_class(span1, "rsActive", /*focus*/ ctx[33] && /*activeHandle*/ ctx[36] === /*index*/ ctx[101]);
			toggle_class(span1, "rsPress", /*handlePressed*/ ctx[34] && /*activeHandle*/ ctx[36] === /*index*/ ctx[101]);
		},
		m(target, anchor) {
			insert(target, span1, anchor);
			append(span1, span0);
			append(span1, t);
			if (if_block) if_block.m(span1, null);

			if (!mounted) {
				dispose = [
					listen(span1, "blur", /*sliderBlurHandle*/ ctx[46]),
					listen(span1, "focus", /*sliderFocusHandle*/ ctx[47]),
					listen(span1, "keydown", /*sliderKeydown*/ ctx[48])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*float*/ ctx[14]) {
				if (if_block) {
					if_block.p(get_if_ctx_1(ctx), dirty);
				} else {
					if_block = create_if_block_9(get_if_ctx_1(ctx));
					if_block.c();
					if_block.m(span1, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[1] & /*$springPositions, focus, activeHandle, isMounted*/ 2086 && span1_style_value !== (span1_style_value = `--handle-pos: ${/*$springPositions*/ ctx[42][/*index*/ ctx[101]]};${/*zindex*/ ctx[99]}${/*mountOpacity*/ ctx[97]}`)) {
				attr(span1, "style", span1_style_value);
			}

			if (dirty[0] & /*ariaLabels*/ 128 && span1_aria_label_value !== (span1_aria_label_value = /*ariaLabels*/ ctx[7][/*index*/ ctx[101]])) {
				attr(span1, "aria-label", span1_aria_label_value);
			}

			if (dirty[0] & /*range, values, min*/ 1034 && span1_aria_valuemin_value !== (span1_aria_valuemin_value = /*range*/ ctx[10] === true && /*index*/ ctx[101] === 1
			? /*values*/ ctx[3][0]
			: /*min*/ ctx[1])) {
				attr(span1, "aria-valuemin", span1_aria_valuemin_value);
			}

			if (dirty[0] & /*range, values, max*/ 1036 && span1_aria_valuemax_value !== (span1_aria_valuemax_value = /*range*/ ctx[10] === true && /*index*/ ctx[101] === 0
			? /*values*/ ctx[3][1]
			: /*max*/ ctx[2])) {
				attr(span1, "aria-valuemax", span1_aria_valuemax_value);
			}

			if (dirty[0] & /*values*/ 8 && span1_aria_valuenow_value !== (span1_aria_valuenow_value = /*value*/ ctx[8])) {
				attr(span1, "aria-valuenow", span1_aria_valuenow_value);
			}

			if (dirty[0] & /*values*/ 8 && span1_aria_valuetext_value !== (span1_aria_valuetext_value = /*ariaLabelFormatter*/ ctx[56](/*value*/ ctx[8], /*index*/ ctx[101]))) {
				attr(span1, "aria-valuetext", span1_aria_valuetext_value);
			}

			if (dirty[0] & /*vertical*/ 8192 && span1_aria_orientation_value !== (span1_aria_orientation_value = /*vertical*/ ctx[13] ? 'vertical' : 'horizontal')) {
				attr(span1, "aria-orientation", span1_aria_orientation_value);
			}

			if (dirty[0] & /*disabled*/ 262144) {
				attr(span1, "aria-disabled", /*disabled*/ ctx[18]);
			}

			if (dirty[0] & /*disabled*/ 262144 && span1_tabindex_value !== (span1_tabindex_value = /*disabled*/ ctx[18] ? -1 : 0)) {
				attr(span1, "tabindex", span1_tabindex_value);
			}

			if (dirty[1] & /*focus, activeHandle*/ 36) {
				toggle_class(span1, "rsActive", /*focus*/ ctx[33] && /*activeHandle*/ ctx[36] === /*index*/ ctx[101]);
			}

			if (dirty[1] & /*handlePressed, activeHandle*/ 40) {
				toggle_class(span1, "rsPress", /*handlePressed*/ ctx[34] && /*activeHandle*/ ctx[36] === /*index*/ ctx[101]);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(span1);
			}

			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (813:2) {#if limits}
function create_if_block_8(ctx) {
	let span;
	let span_style_value;

	return {
		c() {
			span = element("span");
			attr(span, "class", "rangeLimit");
			attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[40] + ": " + valueAsPercent(/*limits*/ ctx[19][0], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[9]) + "%; " + /*orientationEnd*/ ctx[39] + ": " + (100 - valueAsPercent(/*limits*/ ctx[19][1], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[9])) + "%;"));
		},
		m(target, anchor) {
			insert(target, span, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*limits, min, max, precision*/ 524806 | dirty[1] & /*orientationStart, orientationEnd*/ 768 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[40] + ": " + valueAsPercent(/*limits*/ ctx[19][0], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[9]) + "%; " + /*orientationEnd*/ ctx[39] + ": " + (100 - valueAsPercent(/*limits*/ ctx[19][1], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[9])) + "%;"))) {
				attr(span, "style", span_style_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (820:2) {#if hasRange}
function create_if_block_1(ctx) {
	let span;
	let span_style_value;
	let if_block = /*rangeFloat*/ ctx[15] && create_if_block_2(ctx);

	return {
		c() {
			span = element("span");
			if (if_block) if_block.c();
			attr(span, "class", "rangeBar");
			attr(span, "style", span_style_value = `--range-start:${/*rangeStart*/ ctx[94]};--range-end:${/*rangeEnd*/ ctx[95]};--range-size:${/*rangeSize*/ ctx[96]};${/*mountOpacity*/ ctx[97]};`);
			toggle_class(span, "rsPress", /*rangePressed*/ ctx[35]);
		},
		m(target, anchor) {
			insert(target, span, anchor);
			if (if_block) if_block.m(span, null);
		},
		p(ctx, dirty) {
			if (/*rangeFloat*/ ctx[15]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					if_block.m(span, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[1] & /*$springPositions, isMounted*/ 2050 && span_style_value !== (span_style_value = `--range-start:${/*rangeStart*/ ctx[94]};--range-end:${/*rangeEnd*/ ctx[95]};--range-size:${/*rangeSize*/ ctx[96]};${/*mountOpacity*/ ctx[97]};`)) {
				attr(span, "style", span_style_value);
			}

			if (dirty[1] & /*rangePressed*/ 16) {
				toggle_class(span, "rsPress", /*rangePressed*/ ctx[35]);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}

			if (if_block) if_block.d();
		}
	};
}

// (830:6) {#if rangeFloat}
function create_if_block_2(ctx) {
	let span;

	function select_block_type(ctx, dirty) {
		if (/*rangeFormatter*/ ctx[6]) return create_if_block_3;
		return create_else_block;
	}

	function select_block_ctx(ctx, type) {
		if (type === create_else_block) return get_else_ctx(ctx);
		return ctx;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(select_block_ctx(ctx, current_block_type));

	return {
		c() {
			span = element("span");
			if_block.c();
			attr(span, "class", "rangeFloat");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			if_block.m(span, null);
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(select_block_ctx(ctx, current_block_type), dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(select_block_ctx(ctx, current_block_type));

				if (if_block) {
					if_block.c();
					if_block.m(span, null);
				}
			}
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}

			if_block.d();
		}
	};
}

// (839:10) {:else}
function create_else_block(ctx) {
	let if_block0_anchor;
	let html_tag;
	let raw0_value = /*first*/ ctx[31] + "";
	let html_anchor;
	let t0;
	let t1_value = ' ' + "";
	let t1;
	let t2;
	let t3_value = ' ' + "";
	let t3;
	let t4;
	let if_block2_anchor;
	let html_tag_1;
	let raw1_value = /*second*/ ctx[98] + "";
	let html_anchor_1;
	let if_block3_anchor;
	let if_block0 = /*prefix*/ ctx[25] && create_if_block_7(ctx);
	let if_block1 = /*suffix*/ ctx[26] && create_if_block_6(ctx);
	let if_block2 = /*prefix*/ ctx[25] && create_if_block_5(ctx);
	let if_block3 = /*suffix*/ ctx[26] && create_if_block_4(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			html_tag = new HtmlTag(false);
			html_anchor = empty();
			if (if_block1) if_block1.c();
			t0 = space();
			t1 = text(t1_value);
			t2 = text("-");
			t3 = text(t3_value);
			t4 = space();
			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
			html_tag_1 = new HtmlTag(false);
			html_anchor_1 = empty();
			if (if_block3) if_block3.c();
			if_block3_anchor = empty();
			html_tag.a = html_anchor;
			html_tag_1.a = html_anchor_1;
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, if_block0_anchor, anchor);
			html_tag.m(raw0_value, target, anchor);
			insert(target, html_anchor, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, t0, anchor);
			insert(target, t1, anchor);
			insert(target, t2, anchor);
			insert(target, t3, anchor);
			insert(target, t4, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert(target, if_block2_anchor, anchor);
			html_tag_1.m(raw1_value, target, anchor);
			insert(target, html_anchor_1, anchor);
			if (if_block3) if_block3.m(target, anchor);
			insert(target, if_block3_anchor, anchor);
		},
		p(ctx, dirty) {
			if (/*prefix*/ ctx[25]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_7(ctx);
					if_block0.c();
					if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*reversed, values*/ 65544 && raw0_value !== (raw0_value = /*first*/ ctx[31] + "")) html_tag.p(raw0_value);

			if (/*suffix*/ ctx[26]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_6(ctx);
					if_block1.c();
					if_block1.m(t0.parentNode, t0);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*prefix*/ ctx[25]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_5(ctx);
					if_block2.c();
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty[0] & /*reversed, values*/ 65544 && raw1_value !== (raw1_value = /*second*/ ctx[98] + "")) html_tag_1.p(raw1_value);

			if (/*suffix*/ ctx[26]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_4(ctx);
					if_block3.c();
					if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(if_block0_anchor);
				detach(html_anchor);
				html_tag.d();
				detach(t0);
				detach(t1);
				detach(t2);
				detach(t3);
				detach(t4);
				detach(if_block2_anchor);
				detach(html_anchor_1);
				html_tag_1.d();
				detach(if_block3_anchor);
			}

			if (if_block0) if_block0.d(detaching);
			if (if_block1) if_block1.d(detaching);
			if (if_block2) if_block2.d(detaching);
			if (if_block3) if_block3.d(detaching);
		}
	};
}

// (832:10) {#if rangeFormatter}
function create_if_block_3(ctx) {
	let html_tag;
	let raw_value = /*rangeFormatter*/ ctx[6](/*values*/ ctx[3][0], /*values*/ ctx[3][1], valueAsPercent(/*values*/ ctx[3][0], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[9]), valueAsPercent(/*values*/ ctx[3][1], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[9])) + "";
	let html_anchor;

	return {
		c() {
			html_tag = new HtmlTag(false);
			html_anchor = empty();
			html_tag.a = html_anchor;
		},
		m(target, anchor) {
			html_tag.m(raw_value, target, anchor);
			insert(target, html_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*rangeFormatter, values, min, max, precision*/ 590 && raw_value !== (raw_value = /*rangeFormatter*/ ctx[6](/*values*/ ctx[3][0], /*values*/ ctx[3][1], valueAsPercent(/*values*/ ctx[3][0], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[9]), valueAsPercent(/*values*/ ctx[3][1], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[9])) + "")) html_tag.p(raw_value);
		},
		d(detaching) {
			if (detaching) {
				detach(html_anchor);
				html_tag.d();
			}
		}
	};
}

// (841:12) {#if prefix}
function create_if_block_7(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*prefix*/ ctx[25]);
			attr(span, "class", "rangeFloatPrefix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefix*/ 33554432) set_data(t, /*prefix*/ ctx[25]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (841:88) {#if suffix}
function create_if_block_6(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*suffix*/ ctx[26]);
			attr(span, "class", "rangeFloatSuffix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*suffix*/ 67108864) set_data(t, /*suffix*/ ctx[26]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (845:12) {#if prefix}
function create_if_block_5(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*prefix*/ ctx[25]);
			attr(span, "class", "rangeFloatPrefix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefix*/ 33554432) set_data(t, /*prefix*/ ctx[25]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (845:89) {#if suffix}
function create_if_block_4(ctx) {
	let span;
	let t;

	return {
		c() {
			span = element("span");
			t = text(/*suffix*/ ctx[26]);
			attr(span, "class", "rangeFloatSuffix");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*suffix*/ 67108864) set_data(t, /*suffix*/ ctx[26]);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (853:2) {#if pips}
function create_if_block(ctx) {
	let rangepips;
	let current;

	rangepips = new RangePips({
			props: {
				values: /*values*/ ctx[3],
				min: /*min*/ ctx[1],
				max: /*max*/ ctx[2],
				step: /*step*/ ctx[12],
				range: /*range*/ ctx[10],
				vertical: /*vertical*/ ctx[13],
				reversed: /*reversed*/ ctx[16],
				orientationStart: /*orientationStart*/ ctx[40],
				hoverable: /*hoverable*/ ctx[17],
				disabled: /*disabled*/ ctx[18],
				limits: /*limits*/ ctx[19],
				all: /*all*/ ctx[22],
				first: /*first*/ ctx[31],
				last: /*last*/ ctx[23],
				rest: /*rest*/ ctx[24],
				pipstep: /*pipstep*/ ctx[21],
				prefix: /*prefix*/ ctx[25],
				suffix: /*suffix*/ ctx[26],
				formatter: /*formatter*/ ctx[4],
				precision: /*precision*/ ctx[9],
				focus: /*focus*/ ctx[33],
				moveHandle: /*moveHandle*/ ctx[43]
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
			if (dirty[0] & /*values*/ 8) rangepips_changes.values = /*values*/ ctx[3];
			if (dirty[0] & /*min*/ 2) rangepips_changes.min = /*min*/ ctx[1];
			if (dirty[0] & /*max*/ 4) rangepips_changes.max = /*max*/ ctx[2];
			if (dirty[0] & /*step*/ 4096) rangepips_changes.step = /*step*/ ctx[12];
			if (dirty[0] & /*range*/ 1024) rangepips_changes.range = /*range*/ ctx[10];
			if (dirty[0] & /*vertical*/ 8192) rangepips_changes.vertical = /*vertical*/ ctx[13];
			if (dirty[0] & /*reversed*/ 65536) rangepips_changes.reversed = /*reversed*/ ctx[16];
			if (dirty[1] & /*orientationStart*/ 512) rangepips_changes.orientationStart = /*orientationStart*/ ctx[40];
			if (dirty[0] & /*hoverable*/ 131072) rangepips_changes.hoverable = /*hoverable*/ ctx[17];
			if (dirty[0] & /*disabled*/ 262144) rangepips_changes.disabled = /*disabled*/ ctx[18];
			if (dirty[0] & /*limits*/ 524288) rangepips_changes.limits = /*limits*/ ctx[19];
			if (dirty[0] & /*all*/ 4194304) rangepips_changes.all = /*all*/ ctx[22];
			if (dirty[1] & /*first*/ 1) rangepips_changes.first = /*first*/ ctx[31];
			if (dirty[0] & /*last*/ 8388608) rangepips_changes.last = /*last*/ ctx[23];
			if (dirty[0] & /*rest*/ 16777216) rangepips_changes.rest = /*rest*/ ctx[24];
			if (dirty[0] & /*pipstep*/ 2097152) rangepips_changes.pipstep = /*pipstep*/ ctx[21];
			if (dirty[0] & /*prefix*/ 33554432) rangepips_changes.prefix = /*prefix*/ ctx[25];
			if (dirty[0] & /*suffix*/ 67108864) rangepips_changes.suffix = /*suffix*/ ctx[26];
			if (dirty[0] & /*formatter*/ 16) rangepips_changes.formatter = /*formatter*/ ctx[4];
			if (dirty[0] & /*precision*/ 512) rangepips_changes.precision = /*precision*/ ctx[9];
			if (dirty[1] & /*focus*/ 4) rangepips_changes.focus = /*focus*/ ctx[33];
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

function create_fragment(ctx) {
	let div;
	let t0;
	let t1;
	let t2;
	let div_class_value;
	let div_style_value;
	let current;
	let mounted;
	let dispose;
	let each_value = ensure_array_like(/*values*/ ctx[3]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let if_block0 = /*limits*/ ctx[19] && create_if_block_8(ctx);
	let if_block1 = /*hasRange*/ ctx[41] && create_if_block_1(get_if_ctx(ctx));
	let if_block2 = /*pips*/ ctx[20] && create_if_block(ctx);

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
			t2 = space();
			if (if_block2) if_block2.c();
			attr(div, "id", /*id*/ ctx[27]);
			attr(div, "role", "none");
			attr(div, "class", div_class_value = "rangeSlider " + /*classes*/ ctx[28]);
			attr(div, "style", div_style_value = `--slider-length: ${/*sliderSize*/ ctx[37]};${/*style*/ ctx[29] ?? ''}`);
			toggle_class(div, "rsDark", /*darkmode*/ ctx[30] === 'force');
			toggle_class(div, "rsAutoDark", /*darkmode*/ ctx[30] === 'auto');
			toggle_class(div, "rsRange", /*hasRange*/ ctx[41]);
			toggle_class(div, "rsDrag", /*hasRange*/ ctx[41] && /*draggy*/ ctx[11]);
			toggle_class(div, "rsMin", /*hasRange*/ ctx[41] && /*range*/ ctx[10] === 'min');
			toggle_class(div, "rsMax", /*hasRange*/ ctx[41] && /*range*/ ctx[10] === 'max');
			toggle_class(div, "rsDisabled", /*disabled*/ ctx[18]);
			toggle_class(div, "rsHoverable", /*hoverable*/ ctx[17]);
			toggle_class(div, "rsVertical", /*vertical*/ ctx[13]);
			toggle_class(div, "rsReversed", /*reversed*/ ctx[16]);
			toggle_class(div, "rsFocus", /*focus*/ ctx[33]);
			toggle_class(div, "rsPips", /*pips*/ ctx[20]);
			toggle_class(div, "rsPipLabels", /*all*/ ctx[22] === 'label' || /*first*/ ctx[31] === 'label' || /*last*/ ctx[23] === 'label' || /*rest*/ ctx[24] === 'label');
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div, null);
				}
			}

			append(div, t0);
			if (if_block0) if_block0.m(div, null);
			append(div, t1);
			if (if_block1) if_block1.m(div, null);
			append(div, t2);
			if (if_block2) if_block2.m(div, null);
			/*div_binding*/ ctx[63](div);
			current = true;

			if (!mounted) {
				dispose = [
					listen(window, "mousedown", /*bodyInteractStart*/ ctx[51]),
					listen(window, "touchstart", /*bodyInteractStart*/ ctx[51]),
					listen(window, "mousemove", /*bodyInteract*/ ctx[52]),
					listen(window, "touchmove", /*bodyInteract*/ ctx[52]),
					listen(window, "mouseup", /*bodyMouseUp*/ ctx[53]),
					listen(window, "touchend", /*bodyTouchEnd*/ ctx[54]),
					listen(window, "keydown", /*bodyKeyDown*/ ctx[55]),
					listen(div, "mousedown", /*sliderInteractStart*/ ctx[49]),
					listen(div, "mouseup", /*sliderInteractEnd*/ ctx[50]),
					listen(div, "touchstart", prevent_default(/*sliderInteractStart*/ ctx[49])),
					listen(div, "touchend", prevent_default(/*sliderInteractEnd*/ ctx[50]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*ariaLabels, range, values, min, max, vertical, disabled, suffix, handleFormatter, precision, prefix, float*/ 100951726 | dirty[1] & /*$springPositions, focus, activeHandle, isMounted, ariaLabelFormatter, handlePressed, sliderBlurHandle, sliderFocusHandle, sliderKeydown*/ 33785902) {
				each_value = ensure_array_like(/*values*/ ctx[3]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, t0);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*limits*/ ctx[19]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_8(ctx);
					if_block0.c();
					if_block0.m(div, t1);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*hasRange*/ ctx[41]) {
				if (if_block1) {
					if_block1.p(get_if_ctx(ctx), dirty);
				} else {
					if_block1 = create_if_block_1(get_if_ctx(ctx));
					if_block1.c();
					if_block1.m(div, t2);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*pips*/ ctx[20]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty[0] & /*pips*/ 1048576) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div, null);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (!current || dirty[0] & /*id*/ 134217728) {
				attr(div, "id", /*id*/ ctx[27]);
			}

			if (!current || dirty[0] & /*classes*/ 268435456 && div_class_value !== (div_class_value = "rangeSlider " + /*classes*/ ctx[28])) {
				attr(div, "class", div_class_value);
			}

			if (!current || dirty[0] & /*style*/ 536870912 | dirty[1] & /*sliderSize*/ 64 && div_style_value !== (div_style_value = `--slider-length: ${/*sliderSize*/ ctx[37]};${/*style*/ ctx[29] ?? ''}`)) {
				attr(div, "style", div_style_value);
			}

			if (!current || dirty[0] & /*classes, darkmode*/ 1342177280) {
				toggle_class(div, "rsDark", /*darkmode*/ ctx[30] === 'force');
			}

			if (!current || dirty[0] & /*classes, darkmode*/ 1342177280) {
				toggle_class(div, "rsAutoDark", /*darkmode*/ ctx[30] === 'auto');
			}

			if (!current || dirty[0] & /*classes*/ 268435456 | dirty[1] & /*hasRange*/ 1024) {
				toggle_class(div, "rsRange", /*hasRange*/ ctx[41]);
			}

			if (!current || dirty[0] & /*classes, draggy*/ 268437504 | dirty[1] & /*hasRange*/ 1024) {
				toggle_class(div, "rsDrag", /*hasRange*/ ctx[41] && /*draggy*/ ctx[11]);
			}

			if (!current || dirty[0] & /*classes, range*/ 268436480 | dirty[1] & /*hasRange*/ 1024) {
				toggle_class(div, "rsMin", /*hasRange*/ ctx[41] && /*range*/ ctx[10] === 'min');
			}

			if (!current || dirty[0] & /*classes, range*/ 268436480 | dirty[1] & /*hasRange*/ 1024) {
				toggle_class(div, "rsMax", /*hasRange*/ ctx[41] && /*range*/ ctx[10] === 'max');
			}

			if (!current || dirty[0] & /*classes, disabled*/ 268697600) {
				toggle_class(div, "rsDisabled", /*disabled*/ ctx[18]);
			}

			if (!current || dirty[0] & /*classes, hoverable*/ 268566528) {
				toggle_class(div, "rsHoverable", /*hoverable*/ ctx[17]);
			}

			if (!current || dirty[0] & /*classes, vertical*/ 268443648) {
				toggle_class(div, "rsVertical", /*vertical*/ ctx[13]);
			}

			if (!current || dirty[0] & /*classes, reversed*/ 268500992) {
				toggle_class(div, "rsReversed", /*reversed*/ ctx[16]);
			}

			if (!current || dirty[0] & /*classes*/ 268435456 | dirty[1] & /*focus*/ 4) {
				toggle_class(div, "rsFocus", /*focus*/ ctx[33]);
			}

			if (!current || dirty[0] & /*classes, pips*/ 269484032) {
				toggle_class(div, "rsPips", /*pips*/ ctx[20]);
			}

			if (!current || dirty[0] & /*classes, all, last, rest*/ 297795584 | dirty[1] & /*first*/ 1) {
				toggle_class(div, "rsPipLabels", /*all*/ ctx[22] === 'label' || /*first*/ ctx[31] === 'label' || /*last*/ ctx[23] === 'label' || /*rest*/ ctx[24] === 'label');
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			destroy_each(each_blocks, detaching);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			/*div_binding*/ ctx[63](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

/**
 * trim the values array based on whether the property
 * for 'range' is 'min', 'max', or truthy. This is because we
 * do not want more than one handle for a min/max range, and we do
 * not want more than two handles for a true range.
 * @param {array} values the input values for the rangeSlider
 * @param {boolean | 'min' | 'max'} range the range property of the rangeSlider
 * @return {array} the range array for creating a rangeSlider
 **/
function trimRange(values, range) {
	if (range === 'min' || range === 'max') {
		return values.slice(0, 1);
	} else if (range) {
		return values.slice(0, 2);
	} else {
		return values;
	}
}

function instance($$self, $$props, $$invalidate) {
	let hasRange;
	let orientationStart;
	let orientationEnd;

	let $springPositions,
		$$unsubscribe_springPositions = noop,
		$$subscribe_springPositions = () => ($$unsubscribe_springPositions(), $$unsubscribe_springPositions = subscribe(springPositions, $$value => $$invalidate(42, $springPositions = $$value)), springPositions);

	$$self.$$.on_destroy.push(() => $$unsubscribe_springPositions());
	let { slider = undefined } = $$props;
	let { precision = 2 } = $$props;
	let { range = false } = $$props;
	let { pushy = false } = $$props;
	let { draggy = false } = $$props;
	let { min = 0 } = $$props;
	let { max = 100 } = $$props;
	let { step = 1 } = $$props;
	let { values = [coerceFloat((max + min) / 2, precision)] } = $$props;
	let { value = values[0] } = $$props;
	let { vertical = false } = $$props;
	let { float = false } = $$props;
	let { rangeFloat = false } = $$props;
	let { reversed = false } = $$props;
	let { hoverable = true } = $$props;
	let { disabled = false } = $$props;
	let { limits = null } = $$props;
	let { rangeGapMin = 0 } = $$props;
	let { rangeGapMax = Infinity } = $$props;
	let { pips = false } = $$props;
	let { pipstep = undefined } = $$props;
	let { all = true } = $$props;
	let { first = undefined } = $$props;
	let { last = undefined } = $$props;
	let { rest = undefined } = $$props;
	let { prefix = '' } = $$props;
	let { suffix = '' } = $$props;
	let { formatter = (v, i, p) => v } = $$props;
	let { handleFormatter = formatter } = $$props;
	let { rangeFormatter = null } = $$props;
	let { ariaLabels = [] } = $$props;
	let { id = undefined } = $$props;
	let { class: classes = '' } = $$props;
	let { style = undefined } = $$props;
	let { darkmode = false } = $$props;
	let { springValues = { stiffness: 0.15, damping: 0.4 } } = $$props;
	let { spring: spring$1 = true } = $$props;

	// prepare dispatched events
	const dispatch = createEventDispatcher();

	// loading
	let isMounted = false;

	// state management
	let valueLength = 0;

	let focus = false;
	let handleActivated = false;
	let handlePressed = false;
	let rangeActivated = false;
	let rangePressed = false;
	let rangeDistancesFromPointer = [1, 1];
	let keyboardActive = false;
	let activeHandle = -1;
	let startValues = [];
	let previousValues = [];
	let sliderSize = 0;

	// copy the initial values in to a spring function which
	// will update every time the values array is modified
	let springPositions;

	// check that "values" is an array, or set it as array
	const updateValues = () => {
		checkValuesIsArray();

		// sync values with value
		if (values[0] !== value) {
			$$invalidate(3, values[0] = value, values);
		}
	};

	// check that "value" is a number, or set it as the first value in the values array
	const updateValue = () => {
		checkValueIsNumber();

		// sync value with values
		if (value !== values[0]) {
			$$invalidate(8, value = values[0]);
		}
	};

	const checkMinMax = () => {
		if (!isFiniteNumber(min)) {
			$$invalidate(1, min = 0);
			console.error("'min' prop must be a valid finite number");
		}

		if (!isFiniteNumber(max)) {
			$$invalidate(2, max = 100);
			console.error("'max' prop must be a valid finite number");
		}

		if (min >= max) {
			$$invalidate(1, min = 0);
			$$invalidate(2, max = 100);
			console.error("'min' prop should be less than 'max'");
		}

		$$invalidate(1, min = coerceFloat(min, precision));
		$$invalidate(2, max = coerceFloat(max, precision));
	};

	const checkValueIsNumber = () => {
		if (!isFiniteNumber(value)) {
			$$invalidate(8, value = (max + min) / 2);
			console.error("'value' prop should be a Number");
		}
	};

	const checkValuesIsArray = () => {
		if (!Array.isArray(values)) {
			$$invalidate(3, values = [value]);
			console.error("'values' prop should be an Array");
		} else if (values.some(v => !isFiniteNumber(v))) {
			$$invalidate(3, values = values.map(v => isFiniteNumber(v) ? v : (max + min) / 2));
			console.error("'values' prop should be an Array of Numbers");
		}
	};

	const checkAriaLabels = () => {
		if (values.length > 1 && !Array.isArray(ariaLabels)) {
			$$invalidate(7, ariaLabels = []);
			console.warn(`'ariaLabels' prop should be an Array`);
		}
	};

	const checkValuesAgainstRangeGaps = () => {
		// first, align the values to the step
		$$invalidate(3, values = values.map(v => constrainAndAlignValue(v, min, max, step, precision, limits)));

		// rangeGaps should be positive
		if (rangeGapMin < 0) $$invalidate(57, rangeGapMin = 0);

		if (rangeGapMax < 0) $$invalidate(58, rangeGapMax = Infinity);

		// rangeGapMin must be less than rangeGapMax
		if (rangeGapMin > rangeGapMax) $$invalidate(57, rangeGapMin = rangeGapMax);

		// then, check the values against the range gaps
		if (rangeGapMax < Infinity) {
			const gapMax = constrainAndAlignValue(values[0] + rangeGapMax, min, max, step, precision, limits);

			if (values[1] > gapMax) {
				$$invalidate(3, values[1] = gapMax, values);
			}
		}

		if (rangeGapMin > 0) {
			const gapMin = constrainAndAlignValue(values[0] + rangeGapMin, min, max, step, precision, limits);

			if (values[1] < gapMin) {
				$$invalidate(3, values[1] = gapMin, values);
			}
		}
	};

	const checkFormatters = () => {
		if (formatter === null || formatter === undefined) {
			console.error('formatter must be a function');
			$$invalidate(4, formatter = (v, i, p) => v);
		}

		if (handleFormatter === null || handleFormatter === undefined) {
			console.error('handleFormatter must be a function');
			$$invalidate(5, handleFormatter = formatter);
		}

		if (rangeFormatter === undefined) {
			console.error('rangeFormatter must be a function, or null');
			$$invalidate(6, rangeFormatter = null);
		}
	};

	// fixup the value/values at render
	checkMinMax();

	checkValueIsNumber();
	checkValuesIsArray();
	checkValuesAgainstRangeGaps();
	checkFormatters();

	/**
 * create a spring function to animate the handles
 * @param values the values to animate
 */
	const createSpring = values => {
		$$subscribe_springPositions($$invalidate(38, springPositions = spring(values.map(v => valueAsPercent(v, min, max)), springValues)));
	};

	/**
 * update the spring function to animate the handles
 * @param values the values to animate
 */
	const updateSpring = values => {
		requestAnimationFrame(() => {
			springPositions.set(values.map(v => valueAsPercent(v, min, max)), { hard: !spring$1 });
		});
	};

	/**
 * update the spring values
 */
	const updateSpringValues = () => {
		if (springPositions) {
			$$subscribe_springPositions($$invalidate(38, springPositions.stiffness = springValues.stiffness ?? 0.15, springPositions));
			$$subscribe_springPositions($$invalidate(38, springPositions.damping = springValues.damping ?? 0.4, springPositions));
		}
	};

	/**
 * observe slider element size changes using ResizeObserver
 * to update dimensions and recalculate handle positions
 **/
	function updateSliderSize(slider) {
		return requestAnimationFrame(() => {
			if (slider) {
				const dims = slider.getBoundingClientRect();
				$$invalidate(37, sliderSize = vertical ? dims.height : dims.width);
			}
		});
	}

	let resizeObserver;
	let rafId;

	onMount(() => {
		if (slider) {
			resizeObserver = new ResizeObserver(entries => {
					if (rafId) {
						cancelAnimationFrame(rafId);
					}

					rafId = updateSliderSize(entries[0].target);
				});

			resizeObserver.observe(slider);

			setTimeout(
				() => {
					$$invalidate(32, isMounted = true);
				},
				16
			);
		}

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			resizeObserver?.disconnect?.();
			$$invalidate(32, isMounted = false);
		};
	});

	/**
 * check if an element is a handle on the slider
 * @param {object} el dom object reference we want to check
 * @returns {boolean}
 **/
	function targetIsHandle(el) {
		if (!slider) return false;
		const handles = slider.querySelectorAll('.handle');
		const isHandle = Array.prototype.includes.call(handles, el);
		const isChild = Array.prototype.some.call(handles, e => e.contains(el));
		return isHandle || isChild;
	}

	/**
 * helper to return closest handle to user interaction
 * @param {object} clientPos the client {x,y} positions to check against
 * @return {number} the index of the closest handle to clientPos
 **/
	function getClosestHandle(clientPos) {
		if (!slider) return 0;

		// get the location of the interaction on the slider as a value
		const { pointerVal: clickedVal } = calculatePointerValues(slider, clientPos, vertical, reversed, min, max);

		let closest = 0;

		if (range === true && values[0] === values[1]) {
			// if we have a range, and the handles are at the same
			// position, we want a simple check if the interaction
			// value is greater than return the second handle
			if (clickedVal > values[1]) {
				closest = 1;
			} else {
				closest = 0;
			}
		} else {
			// if there are multiple handles, and not a range, then
			// we sort the handles values, and return the first one closest
			// to the interaction value
			closest = values.indexOf([...values].sort((a, b) => Math.abs(clickedVal - a) - Math.abs(clickedVal - b))[0]);
		}

		return closest;
	}

	/**
 * take the interaction position on the slider, convert
 * it to a value on the range, and then send that value
 * through to the moveHandle() method to set the active
 * handle's position
 * @param {object} clientPos the client {x,y} of the interaction
 **/
	function handleInteract(clientPos) {
		if (!slider || !handleActivated) return;

		// get the location of the interaction on the slider as a value
		const { pointerVal: handleVal } = calculatePointerValues(slider, clientPos, vertical, reversed, min, max);

		// move handle to the value
		moveHandle(activeHandle, handleVal);
	}

	/**
 * save the distance between the handles and the interaction position
 * when the user first starts dragging the range
 * @param {object} clientPos the client {x,y} of the interaction
 */
	function getRangeDistancesOnInteractionStart(clientPos) {
		if (!slider || !draggy || !rangeActivated || range === 'min' || range === 'max') return;

		// get the location of the interaction on the slider as a value
		const { pointerVal } = calculatePointerValues(slider, clientPos, vertical, reversed, min, max);

		// store the distances for later use
		rangeDistancesFromPointer = [values[0] - pointerVal, values[1] - pointerVal];
	}

	/**
 * take the interaction position on the slider, get the values of each handle
 * then calculate the distance between the handles and the interaction position
 * so when the user moves the range, each handle moves in the corresponding direction
 * at the original distance from the interaction position
 * @param {object} clientPos the client {x,y} of the interaction
 */
	function rangeInteract(clientPos) {
		if (!slider || !draggy || !rangeActivated || range === 'min' || range === 'max') return;

		// get the location of the interaction on the slider as a value
		const { pointerVal } = calculatePointerValues(slider, clientPos, vertical, reversed, min, max);

		// if dragging the range, we dont want to 'activate' a handle
		$$invalidate(36, activeHandle = -1);

		// move the handles
		moveHandle(0, pointerVal + rangeDistancesFromPointer[0], false);

		moveHandle(1, pointerVal + rangeDistancesFromPointer[1], true);
	}

	/**
 * move a handle to a specific value, respecting the clamp/align rules
 * @param {number} index the index of the handle we want to move
 * @param {number} value the value to move the handle to
 * @param {boolean} fireEvent whether to fire the change event
 * @return {number} the value that was moved to (after alignment/clamping)
 **/
	function moveHandle(index, value, fireEvent = true) {
		// align & clamp the value so we're not doing extra
		// calculation on an out-of-range value down below
		value = constrainAndAlignValue(value, min, max, step, precision, limits);

		// use the active handle if handle index is not provided
		if (index === null) {
			index = activeHandle;
		}

		// if this is a range slider perform special checks
		if (range === true) {
			// restrict the handles of a range-slider from
			// going past one-another unless "pushy" is true
			if (index === 0) {
				if (value > values[1] - rangeGapMin) {
					if (pushy && value <= (limits?.[1] ?? max) - rangeGapMin) {
						$$invalidate(3, values[1] = value + rangeGapMin, values);
					} else {
						value = values[1] - rangeGapMin;
					}
				} else if (value < values[1] - rangeGapMax) {
					if (pushy) {
						$$invalidate(3, values[1] = value + rangeGapMax, values);
					} else {
						value = values[1] - rangeGapMax;
					}
				}
			} else if (index === 1) {
				if (value < values[0] + rangeGapMin) {
					if (pushy && value >= (limits?.[0] ?? min) + rangeGapMin) {
						$$invalidate(3, values[0] = value - rangeGapMin, values);
					} else {
						value = values[0] + rangeGapMin;
					}
				} else if (value > values[0] + rangeGapMax) {
					if (pushy) {
						$$invalidate(3, values[0] = value - rangeGapMax, values);
					} else {
						value = values[0] + rangeGapMax;
					}
				}
			}
		}

		// if the value has changed, update it
		if (values[index] !== value) {
			$$invalidate(3, values[index] = constrainAndAlignValue(value, min, max, step, precision, limits), values);
		}

		if (fireEvent) {
			fireChangeEvent(values);
		}

		return value;
	}

	/**
 *
 */
	function fireChangeEvent(values) {
		// Check if any value has changed by comparing each element
		const hasChanged = previousValues.some((prev, index) => {
			return prev !== values[index];
		});

		if (hasChanged) {
			eChange();
			previousValues = [...values];
		}
	}

	/**
 * helper to find the beginning range value for use with css style
 * @param {array} values the input values for the rangeSlider
 * @return {number} the beginning of the range as a percentage of the total range
 **/
	function rangeStartPercent(values) {
		if (range === 'min') {
			return 0;
		} else {
			return values[0];
		}
	}

	/**
 * helper to find the ending range value for use with css style
 * @param {array} values the input values for the rangeSlider
 * @return {number} the end of the range as a percentage of the total range
 **/
	function rangeEndPercent(values) {
		if (range === 'max') {
			return 100;
		} else if (range === 'min') {
			return values[0];
		} else {
			return values[1];
		}
	}

	/**
 * when the user has unfocussed (blurred) from the
 * slider, deactivate all handles
 * @param {FocusEvent} event the event from browser
 **/
	function sliderBlurHandle(event) {
		event.target;

		if (keyboardActive) {
			$$invalidate(33, focus = false);
			handleActivated = false;
			$$invalidate(34, handlePressed = false);
			rangeActivated = false;
			$$invalidate(35, rangePressed = false);
		}
	}

	/**
 * when the user focusses the handle of a slider
 * set it to be active
 * @param {FocusEvent} event the event from browser
 **/
	function sliderFocusHandle(event) {
		const target = event.target;

		if (!disabled) {
			$$invalidate(36, activeHandle = elementIndex(target));
			$$invalidate(33, focus = true);
		}
	}

	/**
 * handle the keyboard accessible features by checking the
 * input type, and modfier key then moving handle by appropriate amount
 * @param {KeyboardEvent} event the event from browser
 **/
	function sliderKeydown(event) {
		if (!disabled) {
			let prevent = false;
			const handle = elementIndex(event.target);
			let jump = step;

			if (event.ctrlKey || event.metaKey) {
				// Move by 1% of the total range, but ensure it's aligned to step
				const onePercent = (max - min) / 100;

				jump = Math.max(step, Math.round(onePercent / step) * step);
			} else if (event.shiftKey || event.key === 'PageUp' || event.key === 'PageDown') {
				// Move by 10% of the total range, but ensure it's aligned to step
				const tenPercent = (max - min) / 10;

				jump = Math.max(step, Math.round(tenPercent / step) * step);
			}

			switch (event.key) {
				case 'PageUp':
				case 'ArrowRight':
				case 'ArrowUp':
					moveHandle(handle, values[handle] + jump);
					prevent = true;
					break;
				case 'PageDown':
				case 'ArrowLeft':
				case 'ArrowDown':
					moveHandle(handle, values[handle] - jump);
					prevent = true;
					break;
				case 'Home':
					moveHandle(handle, min);
					prevent = true;
					break;
				case 'End':
					moveHandle(handle, max);
					prevent = true;
					break;
			}

			if (prevent) {
				event.preventDefault();
				event.stopPropagation();
			}
		}
	}

	/**
 * function to run when the user touches
 * down on the slider element anywhere
 * @param {MouseEvent | TouchEvent} event the event from browser
 **/
	function sliderInteractStart(event) {
		if (!disabled) {
			const target = event.target;
			const clientPos = normalisedClient(event);

			// set the closest handle as active
			$$invalidate(33, focus = true);

			if (target.matches('.rangeBar') && range === true && draggy) {
				handleActivated = false;
				$$invalidate(34, handlePressed = false);
				$$invalidate(36, activeHandle = -1);
				rangeActivated = true;
				$$invalidate(35, rangePressed = true);
				getRangeDistancesOnInteractionStart(clientPos);
			} else {
				handleActivated = true;
				$$invalidate(34, handlePressed = true);
				$$invalidate(36, activeHandle = getClosestHandle(clientPos));

				// for touch devices we want the handle to instantly
				// move to the position touched for more responsive feeling
				if (event.type === 'touchstart' && !target.matches('.rsPipVal')) {
					handleInteract(clientPos);
				}
			}

			// fire the start event
			startValues = values.map(v => constrainAndAlignValue(v, min, max, step, precision, limits));

			previousValues = [...startValues];
			eStart();
		}
	}

	/**
 * function to run when the user stops touching
 * down on the slider element anywhere
 * @param {event} e the event from browser
 **/
	function sliderInteractEnd(event) {
		// fire the stop event for touch devices
		if (event.type === 'touchend') {
			eStop();
		}

		$$invalidate(34, handlePressed = false);
		$$invalidate(35, rangePressed = false);
	}

	/**
 * unfocus the slider if the user clicked off of
 * it, somewhere else on the screen
 * @param {MouseEvent | TouchEvent} event the event from browser
 **/
	function bodyInteractStart(event) {
		const target = event.target;
		keyboardActive = false;

		if (slider && focus && target !== slider && !slider.contains(target)) {
			$$invalidate(33, focus = false);
		}
	}

	/**
 * send the clientX through to handle the interaction
 * whenever the user moves acros screen while active
 * @param {MouseEvent | TouchEvent} event the event from browser
 **/
	function bodyInteract(event) {
		if (!disabled) {
			if (handleActivated) {
				handleInteract(normalisedClient(event));
			} else if (rangeActivated) {
				rangeInteract(normalisedClient(event));
			}
		}
	}

	/**
 * if user triggers mouseup on the body while
 * a handle is active (without moving) then we
 * trigger an interact event there
 * @param {event} event the event from browser
 **/
	function bodyMouseUp(event) {
		if (!disabled) {
			const target = event.target;

			// this only works if a handle is active, which can
			// only happen if there was sliderInteractStart triggered
			// on the slider, already
			if (handleActivated) {
				if (slider && (target === slider || slider.contains(target))) {
					$$invalidate(33, focus = true);

					// don't trigger interact if the target is a handle (no need) or
					// if the target is a label (we want to move to that value from rangePips)
					if (!targetIsHandle(target) && !target.matches('.rsPipVal')) {
						handleInteract(normalisedClient(event));
					}
				}
			}

			if (handleActivated || rangeActivated) {
				// fire the stop event for mouse device
				// when the body is triggered with an active handle/range
				eStop();
			}
		}

		handleActivated = false;
		$$invalidate(34, handlePressed = false);
		rangeActivated = false;
		$$invalidate(35, rangePressed = false);
	}

	/**
 * if user triggers touchend on the body then we
 * defocus the slider completely
 * @param {event} event the event from browser
 **/
	function bodyTouchEnd(event) {
		handleActivated = false;
		$$invalidate(34, handlePressed = false);
		rangeActivated = false;
		$$invalidate(35, rangePressed = false);
	}

	function bodyKeyDown(event) {
		const target = event.target;

		if (!disabled && slider) {
			if (target === slider || slider.contains(target)) {
				keyboardActive = true;
			}
		}
	}

	function eStart() {
		if (disabled) return;

		dispatch('start', {
			activeHandle,
			value: startValues[activeHandle],
			values: startValues
		});
	}

	function eStop() {
		if (disabled) return;
		const startValue = rangeActivated ? startValues : startValues[activeHandle];

		dispatch('stop', {
			activeHandle,
			startValue,
			value: values[activeHandle],
			values: values.map(v => constrainAndAlignValue(v, min, max, step, precision, limits))
		});
	}

	function eChange() {
		if (disabled) return;
		const startValue = rangeActivated ? startValues : startValues[activeHandle];

		const previousValue = typeof previousValues === 'undefined'
		? startValue
		: rangeActivated
			? previousValues
			: previousValues[activeHandle];

		dispatch('change', {
			activeHandle,
			startValue,
			previousValue,
			value: values[activeHandle],
			values: values.map(v => constrainAndAlignValue(v, min, max, step, precision, limits))
		});
	}

	function ariaLabelFormatter(value, index) {
		const percent = valueAsPercent(value, min, max, precision);
		const formattedValue = handleFormatter(value, index, percent);
		const textLabel = pureText(String(formattedValue));
		return `${prefix}${textLabel}${suffix}`;
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			slider = $$value;
			$$invalidate(0, slider);
		});
	}

	$$self.$$set = $$props => {
		if ('slider' in $$props) $$invalidate(0, slider = $$props.slider);
		if ('precision' in $$props) $$invalidate(9, precision = $$props.precision);
		if ('range' in $$props) $$invalidate(10, range = $$props.range);
		if ('pushy' in $$props) $$invalidate(59, pushy = $$props.pushy);
		if ('draggy' in $$props) $$invalidate(11, draggy = $$props.draggy);
		if ('min' in $$props) $$invalidate(1, min = $$props.min);
		if ('max' in $$props) $$invalidate(2, max = $$props.max);
		if ('step' in $$props) $$invalidate(12, step = $$props.step);
		if ('values' in $$props) $$invalidate(3, values = $$props.values);
		if ('value' in $$props) $$invalidate(8, value = $$props.value);
		if ('vertical' in $$props) $$invalidate(13, vertical = $$props.vertical);
		if ('float' in $$props) $$invalidate(14, float = $$props.float);
		if ('rangeFloat' in $$props) $$invalidate(15, rangeFloat = $$props.rangeFloat);
		if ('reversed' in $$props) $$invalidate(16, reversed = $$props.reversed);
		if ('hoverable' in $$props) $$invalidate(17, hoverable = $$props.hoverable);
		if ('disabled' in $$props) $$invalidate(18, disabled = $$props.disabled);
		if ('limits' in $$props) $$invalidate(19, limits = $$props.limits);
		if ('rangeGapMin' in $$props) $$invalidate(57, rangeGapMin = $$props.rangeGapMin);
		if ('rangeGapMax' in $$props) $$invalidate(58, rangeGapMax = $$props.rangeGapMax);
		if ('pips' in $$props) $$invalidate(20, pips = $$props.pips);
		if ('pipstep' in $$props) $$invalidate(21, pipstep = $$props.pipstep);
		if ('all' in $$props) $$invalidate(22, all = $$props.all);
		if ('first' in $$props) $$invalidate(31, first = $$props.first);
		if ('last' in $$props) $$invalidate(23, last = $$props.last);
		if ('rest' in $$props) $$invalidate(24, rest = $$props.rest);
		if ('prefix' in $$props) $$invalidate(25, prefix = $$props.prefix);
		if ('suffix' in $$props) $$invalidate(26, suffix = $$props.suffix);
		if ('formatter' in $$props) $$invalidate(4, formatter = $$props.formatter);
		if ('handleFormatter' in $$props) $$invalidate(5, handleFormatter = $$props.handleFormatter);
		if ('rangeFormatter' in $$props) $$invalidate(6, rangeFormatter = $$props.rangeFormatter);
		if ('ariaLabels' in $$props) $$invalidate(7, ariaLabels = $$props.ariaLabels);
		if ('id' in $$props) $$invalidate(27, id = $$props.id);
		if ('class' in $$props) $$invalidate(28, classes = $$props.class);
		if ('style' in $$props) $$invalidate(29, style = $$props.style);
		if ('darkmode' in $$props) $$invalidate(30, darkmode = $$props.darkmode);
		if ('springValues' in $$props) $$invalidate(60, springValues = $$props.springValues);
		if ('spring' in $$props) $$invalidate(61, spring$1 = $$props.spring);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*value*/ 256) {
			// keep value and values in sync with each other
			(updateValues());
		}

		if ($$self.$$.dirty[0] & /*range, min, max, step, precision, limits, slider, values, value*/ 530191 | $$self.$$.dirty[2] & /*valueLength*/ 1) {
			((uValues, uValue) => {
				// if a range, then trim so it remains as a min/max (only 2 handles)
				const trimmedValues = trimRange(uValues, range);

				// and also align the handles to the steps/limits
				const trimmedAlignedValues = trimmedValues.map(v => constrainAndAlignValue(v, min, max, step, precision, limits));

				// update the values if they needed to be fixed
				if (!(uValues.length === trimmedAlignedValues.length) || !uValues.every((item, i) => coerceFloat(item, precision) === trimmedAlignedValues[i])) {
					uValues = trimmedAlignedValues;
				}

				// When the values array length changes, we must recreate the spring function
				// because the spring store is bound to a specific array length. Attempting to
				// update a spring with a different array size would cause errors or unexpected
				// behavior. For existing arrays, we update the spring values for smooth animations.
				if (valueLength !== uValues.length) {
					// create spring if there's no spring yet, or length changed
					createSpring(uValues);
				} else if (slider) {
					// only update the spring values if the slider is mounted
					updateSpring(uValues);
				}

				// update the external values
				$$invalidate(3, values = uValues);

				// set the valueLength for the next check
				$$invalidate(62, valueLength = uValues.length);
			})(values);
		}

		if ($$self.$$.dirty[0] & /*values*/ 8) {
			(updateValue());
		}

		if ($$self.$$.dirty[0] & /*ariaLabels*/ 128) {
			(checkAriaLabels());
		}

		if ($$self.$$.dirty[0] & /*min*/ 2) {
			(checkMinMax());
		}

		if ($$self.$$.dirty[0] & /*max*/ 4) {
			(checkMinMax());
		}

		if ($$self.$$.dirty[1] & /*rangeGapMin*/ 67108864) {
			(checkValuesAgainstRangeGaps());
		}

		if ($$self.$$.dirty[1] & /*rangeGapMax*/ 134217728) {
			(checkValuesAgainstRangeGaps());
		}

		if ($$self.$$.dirty[0] & /*formatter*/ 16) {
			(checkFormatters());
		}

		if ($$self.$$.dirty[0] & /*handleFormatter*/ 32) {
			(checkFormatters());
		}

		if ($$self.$$.dirty[0] & /*rangeFormatter*/ 64) {
			(checkFormatters());
		}

		if ($$self.$$.dirty[1] & /*springValues*/ 536870912) {
			(updateSpringValues());
		}

		if ($$self.$$.dirty[0] & /*range, values*/ 1032) {
			$$invalidate(41, hasRange = range === true && values.length === 2 || (range === 'min' || range === 'max') && values.length === 1);
		}

		if ($$self.$$.dirty[0] & /*vertical, reversed*/ 73728) {
			/**
 * the orientation of the handles/pips based on the
 * input values of vertical and reversed
 **/
			$$invalidate(40, orientationStart = vertical
			? reversed ? 'top' : 'bottom'
			: reversed ? 'right' : 'left');
		}

		if ($$self.$$.dirty[0] & /*vertical, reversed*/ 73728) {
			$$invalidate(39, orientationEnd = vertical
			? reversed ? 'bottom' : 'top'
			: reversed ? 'left' : 'right');
		}
	};

	return [
		slider,
		min,
		max,
		values,
		formatter,
		handleFormatter,
		rangeFormatter,
		ariaLabels,
		value,
		precision,
		range,
		draggy,
		step,
		vertical,
		float,
		rangeFloat,
		reversed,
		hoverable,
		disabled,
		limits,
		pips,
		pipstep,
		all,
		last,
		rest,
		prefix,
		suffix,
		id,
		classes,
		style,
		darkmode,
		first,
		isMounted,
		focus,
		handlePressed,
		rangePressed,
		activeHandle,
		sliderSize,
		springPositions,
		orientationEnd,
		orientationStart,
		hasRange,
		$springPositions,
		moveHandle,
		rangeStartPercent,
		rangeEndPercent,
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
		ariaLabelFormatter,
		rangeGapMin,
		rangeGapMax,
		pushy,
		springValues,
		spring$1,
		valueLength,
		div_binding
	];
}

class RangeSlider extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				slider: 0,
				precision: 9,
				range: 10,
				pushy: 59,
				draggy: 11,
				min: 1,
				max: 2,
				step: 12,
				values: 3,
				value: 8,
				vertical: 13,
				float: 14,
				rangeFloat: 15,
				reversed: 16,
				hoverable: 17,
				disabled: 18,
				limits: 19,
				rangeGapMin: 57,
				rangeGapMax: 58,
				pips: 20,
				pipstep: 21,
				all: 22,
				first: 31,
				last: 23,
				rest: 24,
				prefix: 25,
				suffix: 26,
				formatter: 4,
				handleFormatter: 5,
				rangeFormatter: 6,
				ariaLabels: 7,
				id: 27,
				class: 28,
				style: 29,
				darkmode: 30,
				springValues: 60,
				spring: 61
			},
			add_css,
			[-1, -1, -1, -1]
		);
	}

	get slider() {
		return this.$$.ctx[0];
	}

	set slider(slider) {
		this.$$set({ slider });
		flush();
	}

	get precision() {
		return this.$$.ctx[9];
	}

	set precision(precision) {
		this.$$set({ precision });
		flush();
	}

	get range() {
		return this.$$.ctx[10];
	}

	set range(range) {
		this.$$set({ range });
		flush();
	}

	get pushy() {
		return this.$$.ctx[59];
	}

	set pushy(pushy) {
		this.$$set({ pushy });
		flush();
	}

	get draggy() {
		return this.$$.ctx[11];
	}

	set draggy(draggy) {
		this.$$set({ draggy });
		flush();
	}

	get min() {
		return this.$$.ctx[1];
	}

	set min(min) {
		this.$$set({ min });
		flush();
	}

	get max() {
		return this.$$.ctx[2];
	}

	set max(max) {
		this.$$set({ max });
		flush();
	}

	get step() {
		return this.$$.ctx[12];
	}

	set step(step) {
		this.$$set({ step });
		flush();
	}

	get values() {
		return this.$$.ctx[3];
	}

	set values(values) {
		this.$$set({ values });
		flush();
	}

	get value() {
		return this.$$.ctx[8];
	}

	set value(value) {
		this.$$set({ value });
		flush();
	}

	get vertical() {
		return this.$$.ctx[13];
	}

	set vertical(vertical) {
		this.$$set({ vertical });
		flush();
	}

	get float() {
		return this.$$.ctx[14];
	}

	set float(float) {
		this.$$set({ float });
		flush();
	}

	get rangeFloat() {
		return this.$$.ctx[15];
	}

	set rangeFloat(rangeFloat) {
		this.$$set({ rangeFloat });
		flush();
	}

	get reversed() {
		return this.$$.ctx[16];
	}

	set reversed(reversed) {
		this.$$set({ reversed });
		flush();
	}

	get hoverable() {
		return this.$$.ctx[17];
	}

	set hoverable(hoverable) {
		this.$$set({ hoverable });
		flush();
	}

	get disabled() {
		return this.$$.ctx[18];
	}

	set disabled(disabled) {
		this.$$set({ disabled });
		flush();
	}

	get limits() {
		return this.$$.ctx[19];
	}

	set limits(limits) {
		this.$$set({ limits });
		flush();
	}

	get rangeGapMin() {
		return this.$$.ctx[57];
	}

	set rangeGapMin(rangeGapMin) {
		this.$$set({ rangeGapMin });
		flush();
	}

	get rangeGapMax() {
		return this.$$.ctx[58];
	}

	set rangeGapMax(rangeGapMax) {
		this.$$set({ rangeGapMax });
		flush();
	}

	get pips() {
		return this.$$.ctx[20];
	}

	set pips(pips) {
		this.$$set({ pips });
		flush();
	}

	get pipstep() {
		return this.$$.ctx[21];
	}

	set pipstep(pipstep) {
		this.$$set({ pipstep });
		flush();
	}

	get all() {
		return this.$$.ctx[22];
	}

	set all(all) {
		this.$$set({ all });
		flush();
	}

	get first() {
		return this.$$.ctx[31];
	}

	set first(first) {
		this.$$set({ first });
		flush();
	}

	get last() {
		return this.$$.ctx[23];
	}

	set last(last) {
		this.$$set({ last });
		flush();
	}

	get rest() {
		return this.$$.ctx[24];
	}

	set rest(rest) {
		this.$$set({ rest });
		flush();
	}

	get prefix() {
		return this.$$.ctx[25];
	}

	set prefix(prefix) {
		this.$$set({ prefix });
		flush();
	}

	get suffix() {
		return this.$$.ctx[26];
	}

	set suffix(suffix) {
		this.$$set({ suffix });
		flush();
	}

	get formatter() {
		return this.$$.ctx[4];
	}

	set formatter(formatter) {
		this.$$set({ formatter });
		flush();
	}

	get handleFormatter() {
		return this.$$.ctx[5];
	}

	set handleFormatter(handleFormatter) {
		this.$$set({ handleFormatter });
		flush();
	}

	get rangeFormatter() {
		return this.$$.ctx[6];
	}

	set rangeFormatter(rangeFormatter) {
		this.$$set({ rangeFormatter });
		flush();
	}

	get ariaLabels() {
		return this.$$.ctx[7];
	}

	set ariaLabels(ariaLabels) {
		this.$$set({ ariaLabels });
		flush();
	}

	get id() {
		return this.$$.ctx[27];
	}

	set id(id) {
		this.$$set({ id });
		flush();
	}

	get class() {
		return this.$$.ctx[28];
	}

	set class(classes) {
		this.$$set({ class: classes });
		flush();
	}

	get style() {
		return this.$$.ctx[29];
	}

	set style(style) {
		this.$$set({ style });
		flush();
	}

	get darkmode() {
		return this.$$.ctx[30];
	}

	set darkmode(darkmode) {
		this.$$set({ darkmode });
		flush();
	}

	get springValues() {
		return this.$$.ctx[60];
	}

	set springValues(springValues) {
		this.$$set({ springValues });
		flush();
	}

	get spring() {
		return this.$$.ctx[61];
	}

	set spring(spring) {
		this.$$set({ spring });
		flush();
	}
}

create_custom_element(RangeSlider, {"slider":{},"precision":{},"range":{"type":"Boolean"},"pushy":{"type":"Boolean"},"draggy":{"type":"Boolean"},"min":{},"max":{},"step":{},"values":{},"value":{},"vertical":{"type":"Boolean"},"float":{"type":"Boolean"},"rangeFloat":{"type":"Boolean"},"reversed":{"type":"Boolean"},"hoverable":{"type":"Boolean"},"disabled":{"type":"Boolean"},"limits":{},"rangeGapMin":{},"rangeGapMax":{},"pips":{"type":"Boolean"},"pipstep":{},"all":{"type":"Boolean"},"first":{},"last":{},"rest":{},"prefix":{},"suffix":{},"formatter":{},"handleFormatter":{},"rangeFormatter":{},"ariaLabels":{},"id":{},"class":{},"style":{},"darkmode":{"type":"Boolean"},"springValues":{},"spring":{"type":"Boolean"}}, [], [], true);

export { RangeSlider as default };
