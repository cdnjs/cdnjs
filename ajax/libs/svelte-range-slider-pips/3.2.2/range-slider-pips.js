/**
 * svelte-range-slider-pips ~ 3.2.2
 * Multi-Thumb, Accessible, Beautiful Range Slider with Pips
 * Project home: https://simeydotme.github.io/svelte-range-slider-pips/
 * © 2025 Simon Goellner <simey.me@gmail.com> ~ MPL-2.0 License
 * Published: 23/2/2025
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.RangeSliderPips = factory());
})(this, (function () { 'use strict';

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
	 * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
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
			}

			async connectedCallback() {
				this.$$cn = true;
				if (!this.$$c) {
					// We wait one tick to let possible child slot elements be created/mounted
					await Promise.resolve();
					if (!this.$$cn) {
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
					if (!this.$$cn) {
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
		if (extend) {
			// @ts-expect-error - assigning here is fine
			Class = extend(Class);
		}
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
	 * align the value with the steps so that it
	 * always sits on the closest (above/below) step
	 * @param {number} value the value to align
	 * @param {number} min the minimum value
	 * @param {number} max the maximum value
	 * @param {number} step the step value
	 * @param {number} precision the number of decimal places to fix to
	 * @return {number} the value after it's been aligned
	 **/
	const alignValueToStep = function (value, min, max, step, precision = 2, limits = null) {
	    // if limits are provided, clamp the value between the limits
	    // if no limits are provided, clamp the value between the min and max
	    value = clampValue(value, limits?.[0] ?? min, limits?.[1] ?? max);
	    // find the middle-point between steps
	    // and see if the value is closer to the
	    // next step, or previous step
	    let remainder = (value - min) % step;
	    let aligned = value - remainder;
	    if (Math.abs(remainder) * 2 >= step) {
	        aligned += remainder > 0 ? step : -step;
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
	 * @param value the value to check if is in the range
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

	/* src/lib/components/RangePips.svelte generated by Svelte v4.2.9 */

	function add_css$1(target) {
		append_styles(target, "svelte-1k57hry", ".rangePips{--pip:var(--range-pip, lightslategray);--pip-text:var(--range-pip-text, var(--pip));--pip-active:var(--range-pip-active, darkslategrey);--pip-active-text:var(--range-pip-active-text, var(--pip-active));--pip-hover:var(--range-pip-hover, darkslategrey);--pip-hover-text:var(--range-pip-hover-text, var(--pip-hover));--pip-in-range:var(--range-pip-in-range, var(--pip-active));--pip-in-range-text:var(--range-pip-in-range-text, var(--pip-active-text));--pip-out-of-limit:var(--range-pip-out-of-limit, #aebecf);--pip-out-of-limit-text:var(--range-pip-out-of-limit-text, var(--pip-out-of-limit))}.rangePips{position:absolute;height:1em;left:0;right:0;bottom:-1em;font-variant-numeric:tabular-nums}.rangePips.vertical{height:auto;width:1em;left:100%;right:auto;top:0;bottom:0}.rangePips .pip{height:0.4em;position:absolute;top:0.25em;width:1px;white-space:nowrap}.rangePips.vertical .pip{height:1px;width:0.4em;left:0.25em;top:auto;bottom:auto}.rangePips .pipVal{position:absolute;top:0.4em;transform:translate(-50%, 25%);display:inline-flex}.rangePips.vertical .pipVal{position:absolute;top:0;left:0.4em;transform:translate(25%, -50%)}.rangePips .pip{transition:all 0.15s ease}.rangePips .pipVal{transition:all 0.15s ease,\n      font-weight 0s linear}.rangePips .pip{color:lightslategray;color:var(--pip-text);background-color:lightslategray;background-color:var(--pip)}.rangePips .pip.selected{color:darkslategrey;color:var(--pip-active-text);background-color:darkslategrey;background-color:var(--pip-active)}.rangePips.hoverable:not(.disabled) .pip:not(.out-of-limit):hover{color:darkslategrey;color:var(--pip-hover-text);background-color:darkslategrey;background-color:var(--pip-hover)}.rangePips .pip.in-range{color:darkslategrey;color:var(--pip-in-range-text);background-color:darkslategrey;background-color:var(--pip-in-range)}.rangePips .pip.out-of-limit{color:#aebecf;color:var(--pip-out-of-limit-text);background-color:#aebecf;background-color:var(--pip-out-of-limit)}.rangePips .pip.selected{height:0.75em}.rangePips.vertical .pip.selected{height:1px;width:0.75em}.rangePips .pip.selected .pipVal{font-weight:bold;top:0.75em}.rangePips.vertical .pip.selected .pipVal{top:0;left:0.75em}.rangePips.hoverable:not(.disabled) .pip:not(.selected):not(.out-of-limit):hover{transition:none}\n      .rangePips.hoverable:not(.disabled) .pip:not(.selected):not(.out-of-limit):hover .pipVal\n    {transition:none;font-weight:bold}");
	}

	function get_each_context$1(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[38] = list[i];
		child_ctx[41] = i;
		const constants_0 = getValueFromIndex(/*i*/ child_ctx[41], /*min*/ child_ctx[1], /*max*/ child_ctx[2], /*pipStep*/ child_ctx[20], /*step*/ child_ctx[3], /*precision*/ child_ctx[17]);
		child_ctx[39] = constants_0;
		return child_ctx;
	}

	// (65:2) {#if (all && first !== false) || first}
	function create_if_block_9(ctx) {
		let span;
		let span_style_value;
		let span_data_val_value;
		let mounted;
		let dispose;
		let if_block = (/*all*/ ctx[10] === 'label' || /*first*/ ctx[11] === 'label') && create_if_block_10(ctx);

		return {
			c() {
				span = element("span");
				if (if_block) if_block.c();
				attr(span, "class", "pip first");
				attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[19] + ": 0%;"));
				attr(span, "data-val", span_data_val_value = coerceFloat(/*min*/ ctx[1], /*precision*/ ctx[17]));
				toggle_class(span, "selected", isSelected(/*min*/ ctx[1], /*values*/ ctx[4], /*precision*/ ctx[17]));
				toggle_class(span, "in-range", isInRange(/*min*/ ctx[1], /*values*/ ctx[4], /*range*/ ctx[0]));
				toggle_class(span, "out-of-limit", isOutOfLimit(/*min*/ ctx[1], /*limits*/ ctx[9]));
			},
			m(target, anchor) {
				insert(target, span, anchor);
				if (if_block) if_block.m(span, null);

				if (!mounted) {
					dispose = [
						listen(span, "pointerdown", /*pointerdown_handler*/ ctx[31]),
						listen(span, "pointerup", /*pointerup_handler*/ ctx[32])
					];

					mounted = true;
				}
			},
			p(ctx, dirty) {
				if (/*all*/ ctx[10] === 'label' || /*first*/ ctx[11] === 'label') {
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

				if (dirty[0] & /*orientationStart*/ 524288 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[19] + ": 0%;"))) {
					attr(span, "style", span_style_value);
				}

				if (dirty[0] & /*min, precision*/ 131074 && span_data_val_value !== (span_data_val_value = coerceFloat(/*min*/ ctx[1], /*precision*/ ctx[17]))) {
					attr(span, "data-val", span_data_val_value);
				}

				if (dirty[0] & /*min, values, precision*/ 131090) {
					toggle_class(span, "selected", isSelected(/*min*/ ctx[1], /*values*/ ctx[4], /*precision*/ ctx[17]));
				}

				if (dirty[0] & /*min, values, range*/ 19) {
					toggle_class(span, "in-range", isInRange(/*min*/ ctx[1], /*values*/ ctx[4], /*range*/ ctx[0]));
				}

				if (dirty[0] & /*min, limits*/ 514) {
					toggle_class(span, "out-of-limit", isOutOfLimit(/*min*/ ctx[1], /*limits*/ ctx[9]));
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

	// (80:6) {#if all === 'label' || first === 'label'}
	function create_if_block_10(ctx) {
		let span;
		let t0;
		let html_tag;
		let raw_value = /*formatter*/ ctx[16](coerceFloat(/*min*/ ctx[1], /*precision*/ ctx[17]), 0, 0) + "";
		let t1;
		let if_block0 = /*prefix*/ ctx[14] && create_if_block_12(ctx);
		let if_block1 = /*suffix*/ ctx[15] && create_if_block_11(ctx);

		return {
			c() {
				span = element("span");
				if (if_block0) if_block0.c();
				t0 = space();
				html_tag = new HtmlTag(false);
				t1 = space();
				if (if_block1) if_block1.c();
				html_tag.a = t1;
				attr(span, "class", "pipVal");
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
				if (detaching) {
					detach(span);
				}

				if (if_block0) if_block0.d();
				if (if_block1) if_block1.d();
			}
		};
	}

	// (82:10) {#if prefix}
	function create_if_block_12(ctx) {
		let span;
		let t;

		return {
			c() {
				span = element("span");
				t = text(/*prefix*/ ctx[14]);
				attr(span, "class", "pipVal-prefix");
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

	// (84:10) {#if suffix}
	function create_if_block_11(ctx) {
		let span;
		let t;

		return {
			c() {
				span = element("span");
				t = text(/*suffix*/ ctx[15]);
				attr(span, "class", "pipVal-suffix");
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

	// (90:2) {#if (all && rest !== false) || rest}
	function create_if_block_4$1(ctx) {
		let each_1_anchor;
		let each_value = ensure_array_like(Array(/*pipCount*/ ctx[21] + 1));
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
				if (dirty[0] & /*orientationStart, min, max, pipStep, step, precision, values, range, limits, labelDown, labelUp, suffix, formatter, prefix, all, rest, pipCount*/ 16508447) {
					each_value = ensure_array_like(Array(/*pipCount*/ ctx[21] + 1));
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

	// (93:6) {#if val !== min && val !== max}
	function create_if_block_5$1(ctx) {
		let span;
		let t;
		let span_style_value;
		let span_data_val_value;
		let mounted;
		let dispose;
		let if_block = (/*all*/ ctx[10] === 'label' || /*rest*/ ctx[13] === 'label') && create_if_block_6(ctx);

		function pointerup_handler_1(...args) {
			return /*pointerup_handler_1*/ ctx[34](/*val*/ ctx[39], ...args);
		}

		return {
			c() {
				span = element("span");
				if (if_block) if_block.c();
				t = space();
				attr(span, "class", "pip");
				attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[19] + ": " + valueAsPercent(/*val*/ ctx[39], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[17]) + "%;"));
				attr(span, "data-val", span_data_val_value = /*val*/ ctx[39]);
				toggle_class(span, "selected", isSelected(/*val*/ ctx[39], /*values*/ ctx[4], /*precision*/ ctx[17]));
				toggle_class(span, "in-range", isInRange(/*val*/ ctx[39], /*values*/ ctx[4], /*range*/ ctx[0]));
				toggle_class(span, "out-of-limit", isOutOfLimit(/*val*/ ctx[39], /*limits*/ ctx[9]));
			},
			m(target, anchor) {
				insert(target, span, anchor);
				if (if_block) if_block.m(span, null);
				append(span, t);

				if (!mounted) {
					dispose = [
						listen(span, "pointerdown", /*pointerdown_handler_1*/ ctx[33]),
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
						if_block = create_if_block_6(ctx);
						if_block.c();
						if_block.m(span, t);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}

				if (dirty[0] & /*orientationStart, min, max, pipStep, step, precision*/ 1703950 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[19] + ": " + valueAsPercent(/*val*/ ctx[39], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[17]) + "%;"))) {
					attr(span, "style", span_style_value);
				}

				if (dirty[0] & /*min, max, pipStep, step, precision*/ 1179662 && span_data_val_value !== (span_data_val_value = /*val*/ ctx[39])) {
					attr(span, "data-val", span_data_val_value);
				}

				if (dirty[0] & /*min, max, pipStep, step, precision, values*/ 1179678) {
					toggle_class(span, "selected", isSelected(/*val*/ ctx[39], /*values*/ ctx[4], /*precision*/ ctx[17]));
				}

				if (dirty[0] & /*min, max, pipStep, step, precision, values, range*/ 1179679) {
					toggle_class(span, "in-range", isInRange(/*val*/ ctx[39], /*values*/ ctx[4], /*range*/ ctx[0]));
				}

				if (dirty[0] & /*min, max, pipStep, step, precision, limits*/ 1180174) {
					toggle_class(span, "out-of-limit", isOutOfLimit(/*val*/ ctx[39], /*limits*/ ctx[9]));
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

	// (108:10) {#if all === 'label' || rest === 'label'}
	function create_if_block_6(ctx) {
		let span;
		let t0;
		let html_tag;
		let raw_value = /*formatter*/ ctx[16](/*val*/ ctx[39], /*i*/ ctx[41], valueAsPercent(/*val*/ ctx[39], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[17])) + "";
		let t1;
		let if_block0 = create_if_block_8(ctx);
		let if_block1 = create_if_block_7(ctx);

		return {
			c() {
				span = element("span");
				if (if_block0) if_block0.c();
				t0 = space();
				html_tag = new HtmlTag(false);
				t1 = space();
				if (if_block1) if_block1.c();
				html_tag.a = t1;
				attr(span, "class", "pipVal");
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
						if_block0 = create_if_block_8(ctx);
						if_block0.c();
						if_block0.m(span, t0);
					}
				}

				if (dirty[0] & /*formatter, min, max, pipStep, step, precision*/ 1245198 && raw_value !== (raw_value = /*formatter*/ ctx[16](/*val*/ ctx[39], /*i*/ ctx[41], valueAsPercent(/*val*/ ctx[39], /*min*/ ctx[1], /*max*/ ctx[2], /*precision*/ ctx[17])) + "")) html_tag.p(raw_value);

				{
					if (if_block1) {
						if_block1.p(ctx, dirty);
					} else {
						if_block1 = create_if_block_7(ctx);
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

	// (110:14) {#if true || prefix}
	function create_if_block_8(ctx) {
		let span;
		let t;

		return {
			c() {
				span = element("span");
				t = text(/*prefix*/ ctx[14]);
				attr(span, "class", "pipVal-prefix");
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

	// (112:14) {#if true || suffix}
	function create_if_block_7(ctx) {
		let span;
		let t;

		return {
			c() {
				span = element("span");
				t = text(/*suffix*/ ctx[15]);
				attr(span, "class", "pipVal-suffix");
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

	// (91:4) {#each Array(pipCount + 1) as _, i}
	function create_each_block$1(ctx) {
		let if_block_anchor;
		let if_block = /*val*/ ctx[39] !== /*min*/ ctx[1] && /*val*/ ctx[39] !== /*max*/ ctx[2] && create_if_block_5$1(ctx);

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
				if (/*val*/ ctx[39] !== /*min*/ ctx[1] && /*val*/ ctx[39] !== /*max*/ ctx[2]) {
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

	// (120:2) {#if (all && last !== false) || last}
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
				attr(span, "class", "pip last");
				attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[19] + ": 100%;"));
				attr(span, "data-val", span_data_val_value = coerceFloat(/*max*/ ctx[2], /*precision*/ ctx[17]));
				toggle_class(span, "selected", isSelected(/*max*/ ctx[2], /*values*/ ctx[4], /*precision*/ ctx[17]));
				toggle_class(span, "in-range", isInRange(/*max*/ ctx[2], /*values*/ ctx[4], /*range*/ ctx[0]));
				toggle_class(span, "out-of-limit", isOutOfLimit(/*max*/ ctx[2], /*limits*/ ctx[9]));
			},
			m(target, anchor) {
				insert(target, span, anchor);
				if (if_block) if_block.m(span, null);

				if (!mounted) {
					dispose = [
						listen(span, "pointerdown", /*pointerdown_handler_2*/ ctx[35]),
						listen(span, "pointerup", /*pointerup_handler_2*/ ctx[36])
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

				if (dirty[0] & /*max, values, precision*/ 131092) {
					toggle_class(span, "selected", isSelected(/*max*/ ctx[2], /*values*/ ctx[4], /*precision*/ ctx[17]));
				}

				if (dirty[0] & /*max, values, range*/ 21) {
					toggle_class(span, "in-range", isInRange(/*max*/ ctx[2], /*values*/ ctx[4], /*range*/ ctx[0]));
				}

				if (dirty[0] & /*max, limits*/ 516) {
					toggle_class(span, "out-of-limit", isOutOfLimit(/*max*/ ctx[2], /*limits*/ ctx[9]));
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

	// (135:6) {#if all === 'label' || last === 'label'}
	function create_if_block_1$1(ctx) {
		let span;
		let t0;
		let html_tag;
		let raw_value = /*formatter*/ ctx[16](coerceFloat(/*max*/ ctx[2], /*precision*/ ctx[17]), /*pipCount*/ ctx[21], 100) + "";
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
				attr(span, "class", "pipVal");
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

				if (dirty[0] & /*formatter, max, precision, pipCount*/ 2293764 && raw_value !== (raw_value = /*formatter*/ ctx[16](coerceFloat(/*max*/ ctx[2], /*precision*/ ctx[17]), /*pipCount*/ ctx[21], 100) + "")) html_tag.p(raw_value);

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

	// (137:10) {#if prefix}
	function create_if_block_3$1(ctx) {
		let span;
		let t;

		return {
			c() {
				span = element("span");
				t = text(/*prefix*/ ctx[14]);
				attr(span, "class", "pipVal-prefix");
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

	// (139:10) {#if suffix}
	function create_if_block_2$1(ctx) {
		let span;
		let t;

		return {
			c() {
				span = element("span");
				t = text(/*suffix*/ ctx[15]);
				attr(span, "class", "pipVal-suffix");
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
		let if_block0 = (/*all*/ ctx[10] && /*first*/ ctx[11] !== false || /*first*/ ctx[11]) && create_if_block_9(ctx);
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
				toggle_class(div, "disabled", /*disabled*/ ctx[8]);
				toggle_class(div, "hoverable", /*hoverable*/ ctx[7]);
				toggle_class(div, "vertical", /*vertical*/ ctx[5]);
				toggle_class(div, "reversed", /*reversed*/ ctx[6]);
				toggle_class(div, "focus", /*focus*/ ctx[18]);
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
						if_block0 = create_if_block_9(ctx);
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
					toggle_class(div, "disabled", /*disabled*/ ctx[8]);
				}

				if (dirty[0] & /*hoverable*/ 128) {
					toggle_class(div, "hoverable", /*hoverable*/ ctx[7]);
				}

				if (dirty[0] & /*vertical*/ 32) {
					toggle_class(div, "vertical", /*vertical*/ ctx[5]);
				}

				if (dirty[0] & /*reversed*/ 64) {
					toggle_class(div, "reversed", /*reversed*/ ctx[6]);
				}

				if (dirty[0] & /*focus*/ 262144) {
					toggle_class(div, "focus", /*focus*/ ctx[18]);
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

	function instance$1($$self, $$props, $$invalidate) {
		let stepMax;
		let tooManyPips;
		let stepDivisor;
		let reducedSteps;
		let pipStep;
		let pipCount;
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
				$$invalidate(30, stepMax = vertical ? 50 : 100);
			}

			if ($$self.$$.dirty[0] & /*max, min, step, stepMax*/ 1073741838) {
				$$invalidate(28, tooManyPips = (max - min) / step >= stepMax);
			}

			if ($$self.$$.dirty[0] & /*vertical*/ 32) {
				$$invalidate(29, stepDivisor = vertical ? 10 : 20);
			}

			if ($$self.$$.dirty[0] & /*max, min, stepDivisor*/ 536870918) {
				$$invalidate(27, reducedSteps = (max - min) / stepDivisor);
			}

			if ($$self.$$.dirty[0] & /*pipstep, tooManyPips, reducedSteps*/ 436207616) {
				$$invalidate(20, pipStep = pipstep ?? (tooManyPips ? reducedSteps : 1));
			}

			if ($$self.$$.dirty[0] & /*max, min, step, pipStep*/ 1048590) {
				$$invalidate(21, pipCount = Math.floor((max - min) / (step * pipStep)));
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
			pipStep,
			pipCount,
			labelDown,
			labelUp,
			value,
			pipstep,
			moveHandle,
			reducedSteps,
			tooManyPips,
			stepDivisor,
			stepMax,
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

	/* src/lib/components/RangeSlider.svelte generated by Svelte v4.2.9 */

	function add_css(target) {
		append_styles(target, "svelte-1ezhk3z", ".rangeSlider{--slider:var(--range-slider, #d7dada);--handle-inactive:var(--range-handle-inactive, #99a2a2);--handle:var(--range-handle, #838de7);--handle-focus:var(--range-handle-focus, #4a40d4);--handle-border:var(--range-handle-border, var(--handle));--range-inactive:var(--range-range-inactive, var(--handle-inactive));--range:var(--range-range, var(--handle-focus));--range-limit:var(--range-range-limit, #b9c2c2);--float-inactive:var(--range-float-inactive, var(--handle-inactive));--float:var(--range-float, var(--handle-focus));--float-text:var(--range-float-text, white)}.rangeSlider{position:relative;border-radius:100px;height:0.5em;margin:1em;transition:opacity 0.2s ease;user-select:none}.rangeSlider *{user-select:none}.rangeSlider.pips{margin-bottom:1.8em}.rangeSlider.pip-labels{margin-bottom:2.8em}.rangeSlider.vertical{display:inline-block;border-radius:100px;width:0.5em;min-height:200px}.rangeSlider.vertical.pips{margin-right:1.8em;margin-bottom:1em}.rangeSlider.vertical.pip-labels{margin-right:2.8em;margin-bottom:1em}.rangeSlider .rangeHandle{position:absolute;display:block;height:1.4em;width:1.4em;top:0.25em;bottom:auto;transform:translateY(-50%) translateX(-50%);z-index:2}.rangeSlider.reversed .rangeHandle{transform:translateY(-50%) translateX(50%)}.rangeSlider.vertical .rangeHandle{left:0.25em;top:auto;transform:translateY(50%) translateX(-50%)}.rangeSlider.vertical.reversed .rangeHandle{transform:translateY(-50%) translateX(-50%)}.rangeSlider .rangeNub,.rangeSlider .rangeHandle:before{position:absolute;left:0;top:0;display:block;border-radius:10em;height:100%;width:100%;transition:box-shadow 0.2s ease}.rangeSlider .rangeHandle:before{content:'';left:1px;top:1px;bottom:1px;right:1px;height:auto;width:auto;box-shadow:0 0 0 0px var(--handle-border);opacity:0}.rangeSlider.hoverable:not(.disabled) .rangeHandle:hover:before{box-shadow:0 0 0 8px var(--handle-border);opacity:0.2}.rangeSlider.hoverable:not(.disabled) .rangeHandle.press:before,.rangeSlider.hoverable:not(.disabled) .rangeHandle.press:hover:before{box-shadow:0 0 0 12px var(--handle-border);opacity:0.4}.rangeSlider.range:not(.min):not(.max) .rangeNub{border-radius:10em 10em 10em 1.6em}.rangeSlider.range .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(-135deg)}.rangeSlider.range .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(45deg)}.rangeSlider.range.reversed .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(45deg)}.rangeSlider.range.reversed .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(-135deg)}.rangeSlider.range.vertical .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(135deg)}.rangeSlider.range.vertical .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(-45deg)}.rangeSlider.range.vertical.reversed .rangeHandle:nth-of-type(1) .rangeNub{transform:rotate(-45deg)}.rangeSlider.range.vertical.reversed .rangeHandle:nth-of-type(2) .rangeNub{transform:rotate(135deg)}.rangeSlider .rangeFloat{display:block;position:absolute;left:50%;top:-0.5em;transform:translate(-50%, -100%);font-size:1em;text-align:center;opacity:0;pointer-events:none;white-space:nowrap;transition:all 0.2s ease;font-size:0.9em;padding:0.2em 0.4em;border-radius:0.2em}.rangeSlider .rangeHandle.active .rangeFloat,.rangeSlider.hoverable .rangeHandle:hover .rangeFloat{opacity:1;top:-0.2em;transform:translate(-50%, -100%)}.rangeSlider .rangeBar,.rangeSlider .rangeLimit{position:absolute;display:block;transition:background 0.2s ease;border-radius:1em;height:0.5em;top:0;user-select:none;z-index:1}.rangeSlider.vertical .rangeBar,.rangeSlider.vertical .rangeLimit{width:0.5em;height:auto}.rangeSlider{background-color:#d7dada;background-color:var(--slider)}.rangeSlider .rangeBar{background-color:#99a2a2;background-color:var(--range-inactive)}.rangeSlider.focus .rangeBar{background-color:#838de7;background-color:var(--range)}.rangeSlider .rangeLimit{background-color:#99a2a280;background-color:var(--range-limit)}.rangeSlider .rangeNub{background-color:#99a2a2;background-color:var(--handle-inactive)}.rangeSlider.focus .rangeNub{background-color:#838de7;background-color:var(--handle)}.rangeSlider .rangeHandle.active .rangeNub{background-color:#4a40d4;background-color:var(--handle-focus)}.rangeSlider .rangeFloat{color:white;color:var(--float-text);background-color:#99a2a2;background-color:var(--float-inactive)}.rangeSlider.focus .rangeFloat{background-color:#4a40d4;background-color:var(--float)}.rangeSlider.disabled{opacity:0.5}.rangeSlider.disabled .rangeNub{background-color:#d7dada;background-color:var(--slider)}");
	}

	function get_each_context(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[1] = list[i];
		child_ctx[71] = i;

		const constants_0 = `z-index: ${/*activeHandle*/ child_ctx[29] === /*index*/ child_ctx[71]
	? 3
	: 2};`;

		child_ctx[68] = constants_0;
		const constants_1 = `${/*orientationStart*/ child_ctx[31]}: ${/*$springPositions*/ child_ctx[32][/*index*/ child_ctx[71]]}%;`;
		child_ctx[69] = constants_1;
		return child_ctx;
	}

	function get_if_ctx(ctx) {
		const child_ctx = ctx.slice();
		const constants_0 = valueAsPercent(/*value*/ child_ctx[1], /*min*/ child_ctx[4], /*max*/ child_ctx[5], /*precision*/ child_ctx[25]);
		child_ctx[72] = constants_0;
		const constants_1 = /*handleFormatter*/ child_ctx[23](/*value*/ child_ctx[1], /*index*/ child_ctx[71], /*percent*/ child_ctx[72]);
		child_ctx[73] = constants_1;
		return child_ctx;
	}

	// (579:6) {#if float}
	function create_if_block_3(ctx) {
		let span;
		let if_block0_anchor;
		let html_tag;
		let raw_value = /*formattedValue*/ ctx[73] + "";
		let html_anchor;
		let if_block0 = /*prefix*/ ctx[20] && create_if_block_5(ctx);
		let if_block1 = /*suffix*/ ctx[21] && create_if_block_4(ctx);

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
				if (/*prefix*/ ctx[20]) {
					if (if_block0) {
						if_block0.p(ctx, dirty);
					} else {
						if_block0 = create_if_block_5(ctx);
						if_block0.c();
						if_block0.m(span, if_block0_anchor);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (dirty[0] & /*handleFormatter, values, min, max, precision*/ 41943089 && raw_value !== (raw_value = /*formattedValue*/ ctx[73] + "")) html_tag.p(raw_value);

				if (/*suffix*/ ctx[21]) {
					if (if_block1) {
						if_block1.p(ctx, dirty);
					} else {
						if_block1 = create_if_block_4(ctx);
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

	// (583:10) {#if prefix}
	function create_if_block_5(ctx) {
		let span;
		let t;

		return {
			c() {
				span = element("span");
				t = text(/*prefix*/ ctx[20]);
				attr(span, "class", "rangeFloat-prefix");
			},
			m(target, anchor) {
				insert(target, span, anchor);
				append(span, t);
			},
			p(ctx, dirty) {
				if (dirty[0] & /*prefix*/ 1048576) set_data(t, /*prefix*/ ctx[20]);
			},
			d(detaching) {
				if (detaching) {
					detach(span);
				}
			}
		};
	}

	// (584:40) {#if suffix}
	function create_if_block_4(ctx) {
		let span;
		let t;

		return {
			c() {
				span = element("span");
				t = text(/*suffix*/ ctx[21]);
				attr(span, "class", "rangeFloat-suffix");
			},
			m(target, anchor) {
				insert(target, span, anchor);
				append(span, t);
			},
			p(ctx, dirty) {
				if (dirty[0] & /*suffix*/ 2097152) set_data(t, /*suffix*/ ctx[21]);
			},
			d(detaching) {
				if (detaching) {
					detach(span);
				}
			}
		};
	}

	// (556:2) {#each values as value, index}
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
		let if_block = /*float*/ ctx[8] && create_if_block_3(get_if_ctx(ctx));

		return {
			c() {
				span1 = element("span");
				span0 = element("span");
				t = space();
				if (if_block) if_block.c();
				attr(span0, "class", "rangeNub");
				attr(span1, "role", "slider");
				attr(span1, "class", "rangeHandle");
				attr(span1, "data-handle", /*index*/ ctx[71]);
				attr(span1, "style", span1_style_value = "" + (/*handlePos*/ ctx[69] + " " + /*zindex*/ ctx[68]));
				attr(span1, "aria-label", span1_aria_label_value = /*ariaLabels*/ ctx[24][/*index*/ ctx[71]]);

				attr(span1, "aria-valuemin", span1_aria_valuemin_value = /*range*/ ctx[3] === true && /*index*/ ctx[71] === 1
				? /*values*/ ctx[0][0]
				: /*min*/ ctx[4]);

				attr(span1, "aria-valuemax", span1_aria_valuemax_value = /*range*/ ctx[3] === true && /*index*/ ctx[71] === 0
				? /*values*/ ctx[0][1]
				: /*max*/ ctx[5]);

				attr(span1, "aria-valuenow", span1_aria_valuenow_value = /*value*/ ctx[1]);
				attr(span1, "aria-valuetext", span1_aria_valuetext_value = /*ariaLabelFormatter*/ ctx[46](/*value*/ ctx[1], /*index*/ ctx[71]));
				attr(span1, "aria-orientation", span1_aria_orientation_value = /*vertical*/ ctx[7] ? 'vertical' : 'horizontal');
				attr(span1, "aria-disabled", /*disabled*/ ctx[11]);
				attr(span1, "tabindex", span1_tabindex_value = /*disabled*/ ctx[11] ? -1 : 0);
				toggle_class(span1, "active", /*focus*/ ctx[27] && /*activeHandle*/ ctx[29] === /*index*/ ctx[71]);
				toggle_class(span1, "press", /*handlePressed*/ ctx[28] && /*activeHandle*/ ctx[29] === /*index*/ ctx[71]);
			},
			m(target, anchor) {
				insert(target, span1, anchor);
				append(span1, span0);
				append(span1, t);
				if (if_block) if_block.m(span1, null);

				if (!mounted) {
					dispose = [
						listen(span1, "blur", /*sliderBlurHandle*/ ctx[36]),
						listen(span1, "focus", /*sliderFocusHandle*/ ctx[37]),
						listen(span1, "keydown", /*sliderKeydown*/ ctx[38])
					];

					mounted = true;
				}
			},
			p(ctx, dirty) {
				if (/*float*/ ctx[8]) {
					if (if_block) {
						if_block.p(get_if_ctx(ctx), dirty);
					} else {
						if_block = create_if_block_3(get_if_ctx(ctx));
						if_block.c();
						if_block.m(span1, null);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}

				if (dirty[0] & /*activeHandle*/ 536870912 | dirty[1] & /*orientationStart, $springPositions*/ 3 && span1_style_value !== (span1_style_value = "" + (/*handlePos*/ ctx[69] + " " + /*zindex*/ ctx[68]))) {
					attr(span1, "style", span1_style_value);
				}

				if (dirty[0] & /*ariaLabels*/ 16777216 && span1_aria_label_value !== (span1_aria_label_value = /*ariaLabels*/ ctx[24][/*index*/ ctx[71]])) {
					attr(span1, "aria-label", span1_aria_label_value);
				}

				if (dirty[0] & /*range, values, min*/ 25 && span1_aria_valuemin_value !== (span1_aria_valuemin_value = /*range*/ ctx[3] === true && /*index*/ ctx[71] === 1
				? /*values*/ ctx[0][0]
				: /*min*/ ctx[4])) {
					attr(span1, "aria-valuemin", span1_aria_valuemin_value);
				}

				if (dirty[0] & /*range, values, max*/ 41 && span1_aria_valuemax_value !== (span1_aria_valuemax_value = /*range*/ ctx[3] === true && /*index*/ ctx[71] === 0
				? /*values*/ ctx[0][1]
				: /*max*/ ctx[5])) {
					attr(span1, "aria-valuemax", span1_aria_valuemax_value);
				}

				if (dirty[0] & /*values*/ 1 && span1_aria_valuenow_value !== (span1_aria_valuenow_value = /*value*/ ctx[1])) {
					attr(span1, "aria-valuenow", span1_aria_valuenow_value);
				}

				if (dirty[0] & /*values*/ 1 && span1_aria_valuetext_value !== (span1_aria_valuetext_value = /*ariaLabelFormatter*/ ctx[46](/*value*/ ctx[1], /*index*/ ctx[71]))) {
					attr(span1, "aria-valuetext", span1_aria_valuetext_value);
				}

				if (dirty[0] & /*vertical*/ 128 && span1_aria_orientation_value !== (span1_aria_orientation_value = /*vertical*/ ctx[7] ? 'vertical' : 'horizontal')) {
					attr(span1, "aria-orientation", span1_aria_orientation_value);
				}

				if (dirty[0] & /*disabled*/ 2048) {
					attr(span1, "aria-disabled", /*disabled*/ ctx[11]);
				}

				if (dirty[0] & /*disabled*/ 2048 && span1_tabindex_value !== (span1_tabindex_value = /*disabled*/ ctx[11] ? -1 : 0)) {
					attr(span1, "tabindex", span1_tabindex_value);
				}

				if (dirty[0] & /*focus, activeHandle*/ 671088640) {
					toggle_class(span1, "active", /*focus*/ ctx[27] && /*activeHandle*/ ctx[29] === /*index*/ ctx[71]);
				}

				if (dirty[0] & /*handlePressed, activeHandle*/ 805306368) {
					toggle_class(span1, "press", /*handlePressed*/ ctx[28] && /*activeHandle*/ ctx[29] === /*index*/ ctx[71]);
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

	// (590:2) {#if limits}
	function create_if_block_2(ctx) {
		let span;
		let span_style_value;

		return {
			c() {
				span = element("span");
				attr(span, "class", "rangeLimit");
				attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[31] + ": " + valueAsPercent(/*limits*/ ctx[12][0], /*min*/ ctx[4], /*max*/ ctx[5], /*precision*/ ctx[25]) + "%; " + /*orientationEnd*/ ctx[30] + ": " + (100 - valueAsPercent(/*limits*/ ctx[12][1], /*min*/ ctx[4], /*max*/ ctx[5], /*precision*/ ctx[25])) + "%;"));
			},
			m(target, anchor) {
				insert(target, span, anchor);
			},
			p(ctx, dirty) {
				if (dirty[0] & /*limits, min, max, precision, orientationEnd*/ 1107300400 | dirty[1] & /*orientationStart*/ 1 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[31] + ": " + valueAsPercent(/*limits*/ ctx[12][0], /*min*/ ctx[4], /*max*/ ctx[5], /*precision*/ ctx[25]) + "%; " + /*orientationEnd*/ ctx[30] + ": " + (100 - valueAsPercent(/*limits*/ ctx[12][1], /*min*/ ctx[4], /*max*/ ctx[5], /*precision*/ ctx[25])) + "%;"))) {
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

	// (597:2) {#if range}
	function create_if_block_1(ctx) {
		let span;
		let span_style_value;

		return {
			c() {
				span = element("span");
				attr(span, "class", "rangeBar");
				attr(span, "style", span_style_value = "" + (/*orientationStart*/ ctx[31] + ": " + /*rangeStart*/ ctx[34](/*$springPositions*/ ctx[32]) + "%; " + /*orientationEnd*/ ctx[30] + ": " + /*rangeEnd*/ ctx[35](/*$springPositions*/ ctx[32]) + "%;"));
			},
			m(target, anchor) {
				insert(target, span, anchor);
			},
			p(ctx, dirty) {
				if (dirty[0] & /*orientationEnd*/ 1073741824 | dirty[1] & /*orientationStart, $springPositions*/ 3 && span_style_value !== (span_style_value = "" + (/*orientationStart*/ ctx[31] + ": " + /*rangeStart*/ ctx[34](/*$springPositions*/ ctx[32]) + "%; " + /*orientationEnd*/ ctx[30] + ": " + /*rangeEnd*/ ctx[35](/*$springPositions*/ ctx[32]) + "%;"))) {
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

	// (604:2) {#if pips}
	function create_if_block(ctx) {
		let rangepips;
		let current;

		rangepips = new RangePips({
				props: {
					values: /*values*/ ctx[0],
					min: /*min*/ ctx[4],
					max: /*max*/ ctx[5],
					step: /*step*/ ctx[6],
					range: /*range*/ ctx[3],
					vertical: /*vertical*/ ctx[7],
					reversed: /*reversed*/ ctx[9],
					orientationStart: /*orientationStart*/ ctx[31],
					hoverable: /*hoverable*/ ctx[10],
					disabled: /*disabled*/ ctx[11],
					limits: /*limits*/ ctx[12],
					all: /*all*/ ctx[15],
					first: /*first*/ ctx[16],
					last: /*last*/ ctx[17],
					rest: /*rest*/ ctx[18],
					pipstep: /*pipstep*/ ctx[14],
					prefix: /*prefix*/ ctx[20],
					suffix: /*suffix*/ ctx[21],
					formatter: /*formatter*/ ctx[22],
					precision: /*precision*/ ctx[25],
					focus: /*focus*/ ctx[27],
					moveHandle: /*moveHandle*/ ctx[33]
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
				if (dirty[0] & /*min*/ 16) rangepips_changes.min = /*min*/ ctx[4];
				if (dirty[0] & /*max*/ 32) rangepips_changes.max = /*max*/ ctx[5];
				if (dirty[0] & /*step*/ 64) rangepips_changes.step = /*step*/ ctx[6];
				if (dirty[0] & /*range*/ 8) rangepips_changes.range = /*range*/ ctx[3];
				if (dirty[0] & /*vertical*/ 128) rangepips_changes.vertical = /*vertical*/ ctx[7];
				if (dirty[0] & /*reversed*/ 512) rangepips_changes.reversed = /*reversed*/ ctx[9];
				if (dirty[1] & /*orientationStart*/ 1) rangepips_changes.orientationStart = /*orientationStart*/ ctx[31];
				if (dirty[0] & /*hoverable*/ 1024) rangepips_changes.hoverable = /*hoverable*/ ctx[10];
				if (dirty[0] & /*disabled*/ 2048) rangepips_changes.disabled = /*disabled*/ ctx[11];
				if (dirty[0] & /*limits*/ 4096) rangepips_changes.limits = /*limits*/ ctx[12];
				if (dirty[0] & /*all*/ 32768) rangepips_changes.all = /*all*/ ctx[15];
				if (dirty[0] & /*first*/ 65536) rangepips_changes.first = /*first*/ ctx[16];
				if (dirty[0] & /*last*/ 131072) rangepips_changes.last = /*last*/ ctx[17];
				if (dirty[0] & /*rest*/ 262144) rangepips_changes.rest = /*rest*/ ctx[18];
				if (dirty[0] & /*pipstep*/ 16384) rangepips_changes.pipstep = /*pipstep*/ ctx[14];
				if (dirty[0] & /*prefix*/ 1048576) rangepips_changes.prefix = /*prefix*/ ctx[20];
				if (dirty[0] & /*suffix*/ 2097152) rangepips_changes.suffix = /*suffix*/ ctx[21];
				if (dirty[0] & /*formatter*/ 4194304) rangepips_changes.formatter = /*formatter*/ ctx[22];
				if (dirty[0] & /*precision*/ 33554432) rangepips_changes.precision = /*precision*/ ctx[25];
				if (dirty[0] & /*focus*/ 134217728) rangepips_changes.focus = /*focus*/ ctx[27];
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
		let current;
		let mounted;
		let dispose;
		let each_value = ensure_array_like(/*values*/ ctx[0]);
		let each_blocks = [];

		for (let i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
		}

		let if_block0 = /*limits*/ ctx[12] && create_if_block_2(ctx);
		let if_block1 = /*range*/ ctx[3] && create_if_block_1(ctx);
		let if_block2 = /*pips*/ ctx[13] && create_if_block(ctx);

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
				attr(div, "id", /*id*/ ctx[19]);
				attr(div, "role", "none");
				attr(div, "class", "rangeSlider");
				toggle_class(div, "range", /*range*/ ctx[3]);
				toggle_class(div, "disabled", /*disabled*/ ctx[11]);
				toggle_class(div, "hoverable", /*hoverable*/ ctx[10]);
				toggle_class(div, "vertical", /*vertical*/ ctx[7]);
				toggle_class(div, "reversed", /*reversed*/ ctx[9]);
				toggle_class(div, "focus", /*focus*/ ctx[27]);
				toggle_class(div, "min", /*range*/ ctx[3] === 'min');
				toggle_class(div, "max", /*range*/ ctx[3] === 'max');
				toggle_class(div, "pips", /*pips*/ ctx[13]);
				toggle_class(div, "pip-labels", /*all*/ ctx[15] === 'label' || /*first*/ ctx[16] === 'label' || /*last*/ ctx[17] === 'label' || /*rest*/ ctx[18] === 'label');
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
				/*div_binding*/ ctx[50](div);
				current = true;

				if (!mounted) {
					dispose = [
						listen(window, "mousedown", /*bodyInteractStart*/ ctx[41]),
						listen(window, "touchstart", /*bodyInteractStart*/ ctx[41]),
						listen(window, "mousemove", /*bodyInteract*/ ctx[42]),
						listen(window, "touchmove", /*bodyInteract*/ ctx[42]),
						listen(window, "mouseup", /*bodyMouseUp*/ ctx[43]),
						listen(window, "touchend", /*bodyTouchEnd*/ ctx[44]),
						listen(window, "keydown", /*bodyKeyDown*/ ctx[45]),
						listen(div, "mousedown", /*sliderInteractStart*/ ctx[39]),
						listen(div, "mouseup", /*sliderInteractEnd*/ ctx[40]),
						listen(div, "touchstart", prevent_default(/*sliderInteractStart*/ ctx[39])),
						listen(div, "touchend", prevent_default(/*sliderInteractEnd*/ ctx[40]))
					];

					mounted = true;
				}
			},
			p(ctx, dirty) {
				if (dirty[0] & /*activeHandle, ariaLabels, range, values, min, max, vertical, disabled, focus, handlePressed, suffix, handleFormatter, precision, prefix, float*/ 1001392569 | dirty[1] & /*orientationStart, $springPositions, ariaLabelFormatter, sliderBlurHandle, sliderFocusHandle, sliderKeydown*/ 32995) {
					each_value = ensure_array_like(/*values*/ ctx[0]);
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

				if (/*limits*/ ctx[12]) {
					if (if_block0) {
						if_block0.p(ctx, dirty);
					} else {
						if_block0 = create_if_block_2(ctx);
						if_block0.c();
						if_block0.m(div, t1);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (/*range*/ ctx[3]) {
					if (if_block1) {
						if_block1.p(ctx, dirty);
					} else {
						if_block1 = create_if_block_1(ctx);
						if_block1.c();
						if_block1.m(div, t2);
					}
				} else if (if_block1) {
					if_block1.d(1);
					if_block1 = null;
				}

				if (/*pips*/ ctx[13]) {
					if (if_block2) {
						if_block2.p(ctx, dirty);

						if (dirty[0] & /*pips*/ 8192) {
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

				if (!current || dirty[0] & /*id*/ 524288) {
					attr(div, "id", /*id*/ ctx[19]);
				}

				if (!current || dirty[0] & /*range*/ 8) {
					toggle_class(div, "range", /*range*/ ctx[3]);
				}

				if (!current || dirty[0] & /*disabled*/ 2048) {
					toggle_class(div, "disabled", /*disabled*/ ctx[11]);
				}

				if (!current || dirty[0] & /*hoverable*/ 1024) {
					toggle_class(div, "hoverable", /*hoverable*/ ctx[10]);
				}

				if (!current || dirty[0] & /*vertical*/ 128) {
					toggle_class(div, "vertical", /*vertical*/ ctx[7]);
				}

				if (!current || dirty[0] & /*reversed*/ 512) {
					toggle_class(div, "reversed", /*reversed*/ ctx[9]);
				}

				if (!current || dirty[0] & /*focus*/ 134217728) {
					toggle_class(div, "focus", /*focus*/ ctx[27]);
				}

				if (!current || dirty[0] & /*range*/ 8) {
					toggle_class(div, "min", /*range*/ ctx[3] === 'min');
				}

				if (!current || dirty[0] & /*range*/ 8) {
					toggle_class(div, "max", /*range*/ ctx[3] === 'max');
				}

				if (!current || dirty[0] & /*pips*/ 8192) {
					toggle_class(div, "pips", /*pips*/ ctx[13]);
				}

				if (!current || dirty[0] & /*all, first, last, rest*/ 491520) {
					toggle_class(div, "pip-labels", /*all*/ ctx[15] === 'label' || /*first*/ ctx[16] === 'label' || /*last*/ ctx[17] === 'label' || /*rest*/ ctx[18] === 'label');
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
				/*div_binding*/ ctx[50](null);
				mounted = false;
				run_all(dispose);
			}
		};
	}

	function instance($$self, $$props, $$invalidate) {
		let orientationStart;
		let orientationEnd;

		let $springPositions,
			$$unsubscribe_springPositions = noop,
			$$subscribe_springPositions = () => ($$unsubscribe_springPositions(), $$unsubscribe_springPositions = subscribe(springPositions, $$value => $$invalidate(32, $springPositions = $$value)), springPositions);

		$$self.$$.on_destroy.push(() => $$unsubscribe_springPositions());
		let { slider = undefined } = $$props;
		let { range = false } = $$props;
		let { pushy = false } = $$props;
		let { min = 0 } = $$props;
		let { max = 100 } = $$props;
		let { step = 1 } = $$props;
		let { values = [(max + min) / 2] } = $$props;
		let { value = values[0] } = $$props;
		let { vertical = false } = $$props;
		let { float = false } = $$props;
		let { reversed = false } = $$props;
		let { hoverable = true } = $$props;
		let { disabled = false } = $$props;
		let { limits = null } = $$props;
		let { pips = false } = $$props;
		let { pipstep = undefined } = $$props;
		let { all = true } = $$props;
		let { first = undefined } = $$props;
		let { last = undefined } = $$props;
		let { rest = undefined } = $$props;
		let { id = undefined } = $$props;
		let { prefix = '' } = $$props;
		let { suffix = '' } = $$props;
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

		// check that "values" is an array, or set it as array
		const updateValues = () => {
			checkValuesIsArray();

			// sync values with value
			if (values[0] !== value) {
				$$invalidate(0, values[0] = value, values);
			}
		};

		// check that "value" is a number, or set it as the average
		const updateValue = () => {
			checkValueIsNumber();

			// sync value with values
			if (value !== values[0]) {
				$$invalidate(1, value = values[0]);
			}
		};

		const checkValueIsNumber = () => {
			if (typeof value !== 'number') {
				$$invalidate(1, value = (max + min) / 2);
				console.error("'value' prop should be a Number");
			}
		};

		const checkValuesIsArray = () => {
			if (!Array.isArray(values)) {
				$$invalidate(0, values = [value]);
				console.error("'values' prop should be an Array");
			}
		};

		const checkAriaLabels = () => {
			if (values.length > 1 && !Array.isArray(ariaLabels)) {
				console.warn(`'ariaLabels' prop should be an Array`);
			}
		};

		// fixup the value/values at render
		checkValueIsNumber();

		checkValuesIsArray();

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
	 * trim the values array based on whether the property
	 * for 'range' is 'min', 'max', or truthy. This is because we
	 * do not want more than one handle for a min/max range, and we do
	 * not want more than two handles for a true range.
	 * @param {array} values the input values for the rangeSlider
	 * @return {array} the range array for creating a rangeSlider
	 **/
		function trimRange(values) {
			if (range === 'min' || range === 'max') {
				return values.slice(0, 1);
			} else if (range) {
				return values.slice(0, 2);
			} else {
				return values;
			}
		}

		/**
	 * helper to return closest handle to user interaction
	 * @param {object} clientPos the client {x,y} positions to check against
	 * @return {number} the index of the closest handle to clientPos
	 **/
		function getClosestHandle(clientPos) {
			if (!slider) return 0;

			// first make sure we have the latest dimensions
			// of the slider, as it may have changed size
			const dims = slider.getBoundingClientRect();

			// calculate the interaction position, percent and value
			let handlePos = 0;

			let handlePercent = 0;
			let handleVal = 0;

			if (vertical) {
				handlePos = clientPos.y - dims.top;
				handlePercent = handlePos / dims.height * 100;
				handlePercent = reversed ? handlePercent : 100 - handlePercent;
			} else {
				handlePos = clientPos.x - dims.left;
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
				closest = values.indexOf(
					[...values].sort((a, b) => Math.abs(handleVal - a) - Math.abs(handleVal - b))[0]
				);
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
			if (!slider) return;

			// first make sure we have the latest dimensions
			// of the slider, as it may have changed size
			const dims = slider.getBoundingClientRect();

			// calculate the interaction position, percent and value
			let handlePos = 0;

			let handlePercent = 0;
			let handleVal = 0;

			if (vertical) {
				handlePos = clientPos.y - dims.top;
				handlePercent = handlePos / dims.height * 100;
				handlePercent = reversed ? handlePercent : 100 - handlePercent;
			} else {
				handlePos = clientPos.x - dims.left;
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
			value = alignValueToStep(value, min, max, step, precision, limits);

			// use the active handle if handle index is not provided
			if (index === null) {
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
			if (range === 'min') {
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
			if (range === 'max') {
				return 0;
			} else if (range === 'min') {
				return 100 - values[0];
			} else {
				return 100 - values[1];
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
				$$invalidate(27, focus = false);
				handleActivated = false;
				$$invalidate(28, handlePressed = false);
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
				$$invalidate(29, activeHandle = elementIndex(target));
				$$invalidate(27, focus = true);
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
					jump = clampValue((max - min) / step / 100, coerceFloat(jump, precision), coerceFloat((max - min) / 100, precision));
				} else if (event.shiftKey) {
					// ~ 10%
					jump = clampValue(
						(max - min) / step / 10,
						coerceFloat(jump, precision),
						coerceFloat((max - min) / 10, precision)
					);
				}

				switch (event.key) {
					case 'PageDown':
						jump *= 10;
					case 'ArrowRight':
					case 'ArrowUp':
						moveHandle(handle, values[handle] + coerceFloat(jump, precision));
						prevent = true;
						break;
					case 'PageUp':
						jump *= 10;
					case 'ArrowLeft':
					case 'ArrowDown':
						moveHandle(handle, values[handle] - coerceFloat(jump, precision));
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
				$$invalidate(27, focus = true);

				handleActivated = true;
				$$invalidate(28, handlePressed = true);
				$$invalidate(29, activeHandle = getClosestHandle(clientPos));

				// fire the start event
				startValue = previousValue = alignValueToStep(values[activeHandle], min, max, step, precision, limits);

				eStart();

				// for touch devices we want the handle to instantly
				// move to the position touched for more responsive feeling
				if (event.type === 'touchstart' && !target.matches('.pipVal')) {
					handleInteract(clientPos);
				}
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

			$$invalidate(28, handlePressed = false);
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
				$$invalidate(27, focus = false);
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
						$$invalidate(27, focus = true);

						// don't trigger interact if the target is a handle (no need) or
						// if the target is a label (we want to move to that value from rangePips)
						if (!targetIsHandle(target) && !target.matches('.pipVal')) {
							handleInteract(normalisedClient(event));
						}
					}

					// fire the stop event for mouse device
					// when the body is triggered with an active handle
					eStop();
				}
			}

			handleActivated = false;
			$$invalidate(28, handlePressed = false);
		}

		/**
	 * if user triggers touchend on the body then we
	 * defocus the slider completely
	 * @param {event} event the event from browser
	 **/
		function bodyTouchEnd(event) {
			handleActivated = false;
			$$invalidate(28, handlePressed = false);
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
			!disabled && dispatch('start', {
				activeHandle,
				value: startValue,
				values: values.map(v => alignValueToStep(v, min, max, step, precision, limits))
			});
		}

		function eStop() {
			!disabled && dispatch('stop', {
				activeHandle,
				startValue,
				value: values[activeHandle],
				values: values.map(v => alignValueToStep(v, min, max, step, precision, limits))
			});
		}

		function eChange() {
			!disabled && dispatch('change', {
				activeHandle,
				startValue,
				previousValue: typeof previousValue === 'undefined'
				? startValue
				: previousValue,
				value: values[activeHandle],
				values: values.map(v => alignValueToStep(v, min, max, step, precision, limits))
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
				$$invalidate(2, slider);
			});
		}

		$$self.$$set = $$props => {
			if ('slider' in $$props) $$invalidate(2, slider = $$props.slider);
			if ('range' in $$props) $$invalidate(3, range = $$props.range);
			if ('pushy' in $$props) $$invalidate(47, pushy = $$props.pushy);
			if ('min' in $$props) $$invalidate(4, min = $$props.min);
			if ('max' in $$props) $$invalidate(5, max = $$props.max);
			if ('step' in $$props) $$invalidate(6, step = $$props.step);
			if ('values' in $$props) $$invalidate(0, values = $$props.values);
			if ('value' in $$props) $$invalidate(1, value = $$props.value);
			if ('vertical' in $$props) $$invalidate(7, vertical = $$props.vertical);
			if ('float' in $$props) $$invalidate(8, float = $$props.float);
			if ('reversed' in $$props) $$invalidate(9, reversed = $$props.reversed);
			if ('hoverable' in $$props) $$invalidate(10, hoverable = $$props.hoverable);
			if ('disabled' in $$props) $$invalidate(11, disabled = $$props.disabled);
			if ('limits' in $$props) $$invalidate(12, limits = $$props.limits);
			if ('pips' in $$props) $$invalidate(13, pips = $$props.pips);
			if ('pipstep' in $$props) $$invalidate(14, pipstep = $$props.pipstep);
			if ('all' in $$props) $$invalidate(15, all = $$props.all);
			if ('first' in $$props) $$invalidate(16, first = $$props.first);
			if ('last' in $$props) $$invalidate(17, last = $$props.last);
			if ('rest' in $$props) $$invalidate(18, rest = $$props.rest);
			if ('id' in $$props) $$invalidate(19, id = $$props.id);
			if ('prefix' in $$props) $$invalidate(20, prefix = $$props.prefix);
			if ('suffix' in $$props) $$invalidate(21, suffix = $$props.suffix);
			if ('formatter' in $$props) $$invalidate(22, formatter = $$props.formatter);
			if ('handleFormatter' in $$props) $$invalidate(23, handleFormatter = $$props.handleFormatter);
			if ('ariaLabels' in $$props) $$invalidate(24, ariaLabels = $$props.ariaLabels);
			if ('precision' in $$props) $$invalidate(25, precision = $$props.precision);
			if ('springValues' in $$props) $$invalidate(48, springValues = $$props.springValues);
		};

		$$self.$$.update = () => {
			if ($$self.$$.dirty[0] & /*value*/ 2) {
				// keep value and values in sync with each other
				(updateValues());
			}

			if ($$self.$$.dirty[0] & /*values, min, max, step, precision, limits, springPositions*/ 100667505 | $$self.$$.dirty[1] & /*valueLength, springValues*/ 393216) {
				{
					// trim the range so it remains as a min/max (only 2 handles)
					// and also align the handles to the steps
					const trimmedAlignedValues = trimRange(values.map(v => alignValueToStep(v, min, max, step, precision, limits)));

					if (!(values.length === trimmedAlignedValues.length) || !values.every((element, index) => coerceFloat(element, precision) === trimmedAlignedValues[index])) {
						$$invalidate(0, values = trimmedAlignedValues);
					}

					// check if the valueLength (length of values[]) has changed,
					// because if so we need to re-seed the spring function with the
					// new values array.
					if (valueLength !== values.length) {
						// set the initial spring values when the slider initialises,
						// or when values array length has changed
						$$subscribe_springPositions($$invalidate(26, springPositions = spring(values.map(v => valueAsPercent(v, min, max)), springValues)));
					} else {
						// update the value of the spring function for animated handles
						// whenever the values has updated
						springPositions.set(values.map(v => valueAsPercent(v, min, max)));
					}

					// set the valueLength for the next check
					$$invalidate(49, valueLength = values.length);
				}
			}

			if ($$self.$$.dirty[0] & /*values*/ 1) {
				(updateValue());
			}

			if ($$self.$$.dirty[0] & /*ariaLabels*/ 16777216) {
				(checkAriaLabels());
			}

			if ($$self.$$.dirty[0] & /*vertical, reversed*/ 640) {
				/**
	 * the orientation of the handles/pips based on the
	 * input values of vertical and reversed
	 **/
				$$invalidate(31, orientationStart = vertical
				? reversed ? 'top' : 'bottom'
				: reversed ? 'right' : 'left');
			}

			if ($$self.$$.dirty[0] & /*vertical, reversed*/ 640) {
				$$invalidate(30, orientationEnd = vertical
				? reversed ? 'bottom' : 'top'
				: reversed ? 'left' : 'right');
			}
		};

		return [
			values,
			value,
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
			limits,
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
			precision,
			springPositions,
			focus,
			handlePressed,
			activeHandle,
			orientationEnd,
			orientationStart,
			$springPositions,
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
			ariaLabelFormatter,
			pushy,
			springValues,
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
					slider: 2,
					range: 3,
					pushy: 47,
					min: 4,
					max: 5,
					step: 6,
					values: 0,
					value: 1,
					vertical: 7,
					float: 8,
					reversed: 9,
					hoverable: 10,
					disabled: 11,
					limits: 12,
					pips: 13,
					pipstep: 14,
					all: 15,
					first: 16,
					last: 17,
					rest: 18,
					id: 19,
					prefix: 20,
					suffix: 21,
					formatter: 22,
					handleFormatter: 23,
					ariaLabels: 24,
					precision: 25,
					springValues: 48
				},
				add_css,
				[-1, -1, -1]
			);
		}

		get slider() {
			return this.$$.ctx[2];
		}

		set slider(slider) {
			this.$$set({ slider });
			flush();
		}

		get range() {
			return this.$$.ctx[3];
		}

		set range(range) {
			this.$$set({ range });
			flush();
		}

		get pushy() {
			return this.$$.ctx[47];
		}

		set pushy(pushy) {
			this.$$set({ pushy });
			flush();
		}

		get min() {
			return this.$$.ctx[4];
		}

		set min(min) {
			this.$$set({ min });
			flush();
		}

		get max() {
			return this.$$.ctx[5];
		}

		set max(max) {
			this.$$set({ max });
			flush();
		}

		get step() {
			return this.$$.ctx[6];
		}

		set step(step) {
			this.$$set({ step });
			flush();
		}

		get values() {
			return this.$$.ctx[0];
		}

		set values(values) {
			this.$$set({ values });
			flush();
		}

		get value() {
			return this.$$.ctx[1];
		}

		set value(value) {
			this.$$set({ value });
			flush();
		}

		get vertical() {
			return this.$$.ctx[7];
		}

		set vertical(vertical) {
			this.$$set({ vertical });
			flush();
		}

		get float() {
			return this.$$.ctx[8];
		}

		set float(float) {
			this.$$set({ float });
			flush();
		}

		get reversed() {
			return this.$$.ctx[9];
		}

		set reversed(reversed) {
			this.$$set({ reversed });
			flush();
		}

		get hoverable() {
			return this.$$.ctx[10];
		}

		set hoverable(hoverable) {
			this.$$set({ hoverable });
			flush();
		}

		get disabled() {
			return this.$$.ctx[11];
		}

		set disabled(disabled) {
			this.$$set({ disabled });
			flush();
		}

		get limits() {
			return this.$$.ctx[12];
		}

		set limits(limits) {
			this.$$set({ limits });
			flush();
		}

		get pips() {
			return this.$$.ctx[13];
		}

		set pips(pips) {
			this.$$set({ pips });
			flush();
		}

		get pipstep() {
			return this.$$.ctx[14];
		}

		set pipstep(pipstep) {
			this.$$set({ pipstep });
			flush();
		}

		get all() {
			return this.$$.ctx[15];
		}

		set all(all) {
			this.$$set({ all });
			flush();
		}

		get first() {
			return this.$$.ctx[16];
		}

		set first(first) {
			this.$$set({ first });
			flush();
		}

		get last() {
			return this.$$.ctx[17];
		}

		set last(last) {
			this.$$set({ last });
			flush();
		}

		get rest() {
			return this.$$.ctx[18];
		}

		set rest(rest) {
			this.$$set({ rest });
			flush();
		}

		get id() {
			return this.$$.ctx[19];
		}

		set id(id) {
			this.$$set({ id });
			flush();
		}

		get prefix() {
			return this.$$.ctx[20];
		}

		set prefix(prefix) {
			this.$$set({ prefix });
			flush();
		}

		get suffix() {
			return this.$$.ctx[21];
		}

		set suffix(suffix) {
			this.$$set({ suffix });
			flush();
		}

		get formatter() {
			return this.$$.ctx[22];
		}

		set formatter(formatter) {
			this.$$set({ formatter });
			flush();
		}

		get handleFormatter() {
			return this.$$.ctx[23];
		}

		set handleFormatter(handleFormatter) {
			this.$$set({ handleFormatter });
			flush();
		}

		get ariaLabels() {
			return this.$$.ctx[24];
		}

		set ariaLabels(ariaLabels) {
			this.$$set({ ariaLabels });
			flush();
		}

		get precision() {
			return this.$$.ctx[25];
		}

		set precision(precision) {
			this.$$set({ precision });
			flush();
		}

		get springValues() {
			return this.$$.ctx[48];
		}

		set springValues(springValues) {
			this.$$set({ springValues });
			flush();
		}
	}

	create_custom_element(RangeSlider, {"slider":{},"range":{"type":"Boolean"},"pushy":{"type":"Boolean"},"min":{},"max":{},"step":{},"values":{},"value":{},"vertical":{"type":"Boolean"},"float":{"type":"Boolean"},"reversed":{"type":"Boolean"},"hoverable":{"type":"Boolean"},"disabled":{"type":"Boolean"},"limits":{},"pips":{"type":"Boolean"},"pipstep":{},"all":{"type":"Boolean"},"first":{},"last":{},"rest":{},"id":{},"prefix":{},"suffix":{},"formatter":{},"handleFormatter":{},"ariaLabels":{},"precision":{},"springValues":{}}, [], [], true);

	return RangeSlider;

}));
