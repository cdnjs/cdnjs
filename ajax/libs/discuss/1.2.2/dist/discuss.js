
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var discuss = (function () {
  'use strict';

  // const GIF = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAA'
  var GIF = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACAD';
  var PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4';
  var index = {
    GIF: GIF,
    PNG: PNG
  };

  function noop() { }
  function assign(tar, src) {
      // @ts-ignore
      for (const k in src)
          tar[k] = src[k];
      return tar;
  }
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
  function validate_store(store, name) {
      if (store != null && typeof store.subscribe !== 'function') {
          throw new Error(`'${name}' is not a store with a 'subscribe' method`);
      }
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
      return style.sheet;
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
  function attr(node, attribute, value) {
      if (value == null)
          node.removeAttribute(attribute);
      else if (node.getAttribute(attribute) !== value)
          node.setAttribute(attribute, value);
  }
  function set_svg_attributes(node, attributes) {
      for (const key in attributes) {
          attr(node, key, attributes[key]);
      }
  }
  function children(element) {
      return Array.from(element.childNodes);
  }
  function set_input_value(input, value) {
      input.value = value == null ? '' : value;
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
  /**
   * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
   * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
   * it can be called from an external module).
   *
   * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
   *
   * https://svelte.dev/docs#run-time-svelte-onmount
   */
  function onMount(fn) {
      get_current_component().$$.on_mount.push(fn);
  }
  /**
   * Schedules a callback to run immediately after the component has been updated.
   *
   * The first time the callback runs will be after the initial `onMount`
   */
  function afterUpdate(fn) {
      get_current_component().$$.after_update.push(fn);
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
   * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
   */
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
  function tick() {
      schedule_update();
      return resolved_promise;
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

  const globals = (typeof window !== 'undefined'
      ? window
      : typeof globalThis !== 'undefined'
          ? globalThis
          : global);

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
  function create_component(block) {
      block && block.c();
  }
  function mount_component(component, target, anchor, customElement) {
      const { fragment, after_update } = component.$$;
      fragment && fragment.m(target, anchor);
      if (!customElement) {
          // onMount happens before the initial afterUpdate
          add_render_callback(() => {
              const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
              // if the component was destroyed immediately
              // it will update the `$$.on_destroy` reference to `null`.
              // the destructured on_destroy may still reference to the old array
              if (component.$$.on_destroy) {
                  component.$$.on_destroy.push(...new_on_destroy);
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
  function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
      const parent_component = current_component;
      set_current_component(component);
      const $$ = component.$$ = {
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
          if (!is_function(callback)) {
              return noop;
          }
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
      document.dispatchEvent(custom_event(type, Object.assign({ version: '3.52.0' }, detail), { bubbles: true }));
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
  function prop_dev(node, property, value) {
      node[property] = value;
      dispatch_dev('SvelteDOMSetProperty', { node, property, value });
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
  function construct_svelte_component_dev(component, props) {
      const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
      try {
          const instance = new component(props);
          if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
              throw new Error(error_message);
          }
          return instance;
      }
      catch (err) {
          const { message } = err;
          if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
              throw new Error(error_message);
          }
          else {
              throw err;
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

  /**
   * Completely random generation of unique strings
   * @param {Number} size Generate the length of a random string
   * @default 10
   * @returns {String} Randomly generated string
   */
  function unique(size) {
    size = size || 10;

    var r = function r() {
      return Math.random().toString(36).slice(2);
    };

    var result = r();

    while (result.length < size) {
      result += r();
    }

    return result.slice(0, size);
  }

  /**
   * is Element
   * @param {*} el value
   * @returns {Boolean}
   */
  function isElement(el) {
    return el instanceof Element;
  }
  /**
   * is String
   * @param {*} val value
   * @returns {Boolean}
   */

  function isString(val) {
    return typeof val === 'string';
  }
  /**
   * Creating element
   * @param {String} name Element Name
   * @param {String} className Element className
   * @returns {HTMLElement}
   */

  function createElement(name, className) {
    var dom = document.createElement(name);
    if (className) dom.className = className;
    return dom;
  }
  /**
   * Creates svg element
   * @param {String} name Element Name
   * @param {Object} obj Objects of key-value pairs
   * @returns {SVGElement}
   */

  function createSVG(name, obj) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', name);

    for (var key in obj) {
      el.setAttribute(key, obj[key]);
    }

    return el;
  }
  /**
   * Creates close SVG
   * @returns {SVGElement} closeSVG
   */

  function createCloseSVG() {
    var closeSVG = createSVG('svg', {
      width: '16px',
      height: '16px',
      stroke: 'currentColor',
      viewBox: '0 0 16 16',
      'stroke-linecap': 'round'
    });
    var line1 = createSVG('line', {
      x1: -7,
      y1: -7,
      x2: 6,
      y2: 6,
      transform: 'translate(8.5 8.5)'
    });
    var line2 = createSVG('line', {
      x1: 6,
      y1: -7,
      x2: -7,
      y2: 6,
      transform: 'translate(8.5 8.5)'
    });
    closeSVG.appendChild(line1);
    closeSVG.appendChild(line2);
    return closeSVG;
  }
  /**
   * Set the position of the message
   * @param {Array} instances All instances of message
   * @param {Element} startIndex Start index to begin traversal
   */

  function setPosition(instances) {
    var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (startIndex < -1) return;
    var prevOffset = 0;

    for (var i = startIndex; i < instances.length; i++) {
      var el = instances[i];
      if (!el) continue;
      var prev = instances[i - 1];

      if (prev) {
        prevOffset = parseInt(prev.style.top) + parseInt(prev.offsetHeight);
      }

      el.style.zIndex = el._msg.zIndex + i;
      el.style.top = el._msg.offset + prevOffset + 'px';
    }
  }

  var styles = "._msg{left:50%;color:#909399;font-size:14px;width:300px;padding:16px 17px;position:fixed;line-height:1;letter-spacing:1px;word-wrap:break-word;word-break:break-all;border-radius:6px;border:1px solid #edf2fc;background-color:#edf2fc;transform:translateX(-50%);transition:opacity 0.3s,transform 0.5s,top 0.5s;}._msg p{margin:0;font-size:14px;padding-right:16px;}._msg svg{top:50%;right:15px;cursor:pointer;position:absolute;transform:translateY(-50%);}._msg-opacity{opacity:0;transform:translate(-50%,-100%);}._msg-success{background-color:#e1f3d8;border-color:#e1f3d8;color:#67c23a;}._msg-warn{background-color:#fdfce6;border-color:#fdfce6;color:#e6a23c;}._msg-error{background-color:#fef0f0;border-color:#fef0f0;color:#f56c6c;}";

  var OPACITY = '_msg-opacity';
  var instances = [];
  var typeMap = ['info', 'success', 'warn', 'error'];
  var style = createElement('style');
  style.textContent = styles;
  document.head.appendChild(style);
  msg$1.zIndex = 1; // eslint-disable-next-line max-statements

  function msg$1(options) {
    if (isString(options)) options = {
      text: options
    };

    var _Object$assign = Object.assign({
      type: typeMap[0],
      text: '',
      offset: 20,
      duration: 3e3
    }, options),
        text = _Object$assign.text,
        type = _Object$assign.type,
        zIndex = _Object$assign.zIndex,
        offset = _Object$assign.offset,
        duration = _Object$assign.duration,
        customClass = _Object$assign.customClass,
        html = _Object$assign.html,
        showClose = _Object$assign.showClose,
        onClose = _Object$assign.onClose,
        appendTo = _Object$assign.appendTo;

    var el = createElement('div', "_msg _msg-".concat(type, " ").concat(OPACITY, " ").concat(customClass || ''));
    el.id = unique();
    el._msg = {};
    el._msg.zIndex = zIndex || msg$1.zIndex;
    el._msg.offset = offset;
    instances.push(el); // 淡入

    setTimeout(function () {
      el.classList.remove(OPACITY);
    }, 100); // 持续时间大于0才会销毁，反之永不销毁
    // (可通过点击关闭按钮 或 调用destroyAll函数来销毁)

    if (duration) {
      el._msg.t = setTimeout(function () {
        destroy(el, onClose);
      }, duration); // 鼠标悬停取消销毁

      el.onmouseenter = function () {
        clearTimeout(el._msg.t);
      }; // 鼠标离开后，开始计时销毁


      el.onmouseleave = function () {
        el._msg.t = setTimeout(function () {
          destroy(el, onClose);
        }, duration);
      };
    }

    var p = createElement('p');
    el.appendChild(p);
    if (html) p.innerHTML = text;else p.innerText = text; // 是否显示关闭按钮

    if (showClose || !duration
    /* 如果持续时小于等于0，则强制显示关闭按钮 */
    ) {
      var closeSVG = createCloseSVG();

      closeSVG.onclick = function () {
        clearTimeout(el._msg.t);
        el.onmouseenter = el.onmouseleave = closeSVG.onclick = null;
        destroy(el, onClose);
      };

      el.appendChild(closeSVG);
    }

    var _appendTo;

    if (isElement(appendTo)) _appendTo = appendTo;else if (isString(appendTo)) _appendTo = document.querySelector(appendTo);
    if (!isElement(_appendTo)) _appendTo = document.body;

    _appendTo.appendChild(el);

    setPosition(instances);
  }

  var _loop = function _loop(i) {
    msg$1[typeMap[i]] = function (options) {
      if (isString(options)) {
        options = {
          text: options,
          type: typeMap[i]
        };
      } else {
        options.type = typeMap[i];
      }

      msg$1(options);
    };
  };

  for (var i in typeMap) {
    _loop(i);
  }

  msg$1.destroyAll = function () {
    var _loop2 = function _loop2(_i) {
      var el = instances[_i];
      clearTimeout(el._msg.t); // 等待淡出动画结束后删除

      el.classList.add(OPACITY);
      setTimeout(function () {
        el.parentElement.removeChild(el);
      }, 400);
    };

    for (var _i = 0; _i < instances.length; _i++) {
      _loop2(_i);
    }

    instances.length = 0;
  };
  /**
   * Destroy message
   * @param {Element} el Messages that need to be destroyed
   * @param {Function} onClose Before close callback function
   */


  function destroy(el, onClose) {
    var index = instances.findIndex(function (_el) {
      return _el.id === el.id;
    });
    instances.splice(index, 1);
    setPosition(instances, index);
    if (typeof onClose === 'function') onClose(); // 等待淡出动画结束后删除

    el.classList.add(OPACITY);
    setTimeout(function () {
      el.parentElement.removeChild(el);
    }, 400);
  }

  // 图片懒加载
  function lazyload () {
    const imgLazyLoad = document.querySelectorAll('img[d-src]');
    imgLazyLoad.forEach((target) => {
      const io = new IntersectionObserver((entries, Observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('d-src');
            img.setAttribute('src', src);
            Observer.disconnect();
          }
        });
      });
      io.observe(target);
    });
  }

  function massage(options) {
    const all = [...document.body.querySelectorAll('*')].map((el) => +window.getComputedStyle(el).zIndex || 0);
    options.zIndex = Math.max(...all) + 1;
    msg$1(options);
  }

  const options = writable({});
  const msg = writable(massage);
  const lazy = writable(lazyload);

  /* src\client\view\global.svelte generated by Svelte v3.52.0 */

  function add_css$4(target) {
  	append_styles(target, "svelte-19e5lik", ":root{--D-main-Color:#f4645f;--D-stick-Color:#ff81aa;--D-Height-Color:rgba(128, 128, 128, 0.8);--D-Centre-Color:rgba(128, 128, 128, 0.5);--D-Low-Color:rgba(128, 128, 128, 0.2)}#Discuss *{box-sizing:border-box}#Discuss [disabled],#Discuss [disabled]:hover{opacity:0.5;cursor:not-allowed;cursor:no-drop}.D-zIndex{z-index:-1 !important}.D-svg{display:flex;width:inherit;height:inherit}.D-loading-comments{display:flex;margin:60px 0;justify-content:center}.D-loading-comments svg{width:auto;height:50px}.D-link{color:#00c4b6;text-decoration:none}.D-ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.D-btn{display:flex;align-items:center;justify-content:center;opacity:0.9;outline:none;line-height:1;width:auto;height:28px;cursor:pointer;text-align:center;font-weight:600;padding:6px;font-size:14px;color:#606266;border:1px solid #dcdfe6;background:#fff;transition:0.1s;border-radius:4px;box-sizing:border-box;white-space:nowrap;user-select:none}.D-select-none{user-select:none}.D-btn:hover{opacity:1}.D-btn-main{color:#fff;border-color:var(--D-main-Color);background-color:var(--D-main-Color)}#Discuss .D-disabled-click{cursor:not-allowed;cursor:no-drop}.D-disabled,.D-disabled:hover{opacity:0.5}#Discuss .D-comment-emot{width:32px;height:auto;margin:-1px 1px 0;vertical-align:middle}.D-loading-svg{animation:D-rotate-animation 0.8s linear infinite}.D-zoom{animation:D-zoom-animation 0.3s forwards}.D-shrink{animation:D-shrink-animation 0.5s forwards}@keyframes D-rotate-animation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes D-zoom-animation{0%{opacity:0;transform:scale(0.7)}100%{opacity:1;visibility:visible;transform:scale(1)}}@keyframes D-shrink-animation{0%{opacity:1;transform:scale(1)}100%{opacity:0;visibility:hidden;transform:scale(0.7)}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFBeUIsS0FBQSxBQUFBLENBQUEsbXZEQXlKekIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiZ2xvYmFsLnN2ZWx0ZSJdfQ== */");
  }

  function create_fragment$9(ctx) {
  	const block = {
  		c: noop,
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: noop,
  		p: noop,
  		i: noop,
  		o: noop,
  		d: noop
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment$9.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  function instance$9($$self, $$props) {
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots('Global', slots, []);
  	const writable_props = [];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Global> was created with unknown prop '${key}'`);
  	});

  	return [];
  }

  class Global extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, {}, add_css$4);

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "Global",
  			options,
  			id: create_fragment$9.name
  		});
  	}
  }

  var nick$1 = "昵称";
  var mail$1 = "邮箱";
  var site$1 = "网址";
  var content$1 = "评论你的想法~";
  var cancel$1 = "取消";
  var preview$1 = "预览";
  var send$1 = "发送";
  var comment$1 = "条评论";
  var master$1 = "博主";
  var stick$1 = "置顶";
  var reply$1 = "回复";
  var timeAgo$2 = {
  	now: "刚刚",
  	minutes: "分钟前",
  	hours: "小时前",
  	days: "天前"
  };
  var pleaseLogin$1 = "请登录后再使用管理员邮箱评论";
  var sendError$1 = "评论失败~";
  var more$1 = "更多评论";
  var moreCommentsChild$1 = "展开剩余的$counter条回复评论";
  var notComments$1 = "没有评论";
  var commentsAudit$1 = "您的评论可能需要通过审核后才能显示";
  var commentsError$1 = "获取评论失败~";
  var settingMsg$1 = "正在加载管理面板...";
  var refreshMsg$1 = "正在刷新评论...";
  var admin$1 = {
  	login: {
  		login: "登录",
  		close: "关闭",
  		username: "用户名",
  		password: "密码",
  		msg: "自动登录中...",
  		loginError: "用户名或密码错误"
  	},
  	manage: {
  		comment: {
  			msg: "自动获取评论中...",
  			text: "评论管理",
  			save: "保存",
  			time: "时间",
  			path: "路径",
  			total: "共",
  			bar: "条",
  			page: "页",
  			search: {
  				text: "搜索",
  				close: "关闭",
  				title: "搜索评论",
  				options: {
  					all: "全部",
  					ip: "IP",
  					nick: "昵称",
  					mail: "邮箱",
  					site: "网址",
  					content: "内容",
  					path: "路径"
  				}
  			},
  			batch: {
  				operateMsg: "至少选择一条评论",
  				operate: {
  					"default": "默认",
  					accept: "通过",
  					audit: "审核",
  					spam: "垃圾",
  					"delete": "删除"
  				}
  			},
  			operate: {
  				stick: "置顶",
  				accept: "通过",
  				audit: "审核",
  				edit: "编辑",
  				spam: "垃圾",
  				"delete": "删除"
  			},
  			options: {
  				current: "当前页",
  				accept: "已通过",
  				audit: "待审核",
  				spam: "垃圾",
  				master: "我的"
  			}
  		},
  		config: {
  			msg: "自动获取配置中...",
  			error: "获取配置失败",
  			text: "配置管理",
  			save: "保存",
  			passwordError: "密码不一致",
  			settings: {
  				basic: {
  					name: "基本配置",
  					user: {
  						title: "用户名",
  						desc: "登录用户名",
  						ph: "名称"
  					},
  					mail: {
  						title: "管理员邮箱",
  						desc: "确认管理员身份",
  						ph: "mail@example.com"
  					},
  					domain: {
  						title: "安全域名",
  						desc: "限制其他第三方网站请求进行拦截(多个使用逗号分隔)",
  						ph: "example.com,www.example.com"
  					},
  					headers: {
  						title: "请求头优先级",
  						desc: "为确保获取的用户IP的真实性(多个使用逗号分隔)",
  						ph: "headers.cf-connecting-ip"
  					}
  				},
  				commentHandle: {
  					name: "评论处理",
  					count: {
  						title: "评论数",
  						desc: "每次获取多少条评论",
  						ph: 6
  					},
  					word: {
  						title: "字数限制",
  						desc: "评论内容,昵称,邮箱,网址 (以英文逗号分割，只输入一个0代表所有不限制)",
  						ph: 0
  					},
  					limit: {
  						title: "限制",
  						desc: "限制10分钟内，每个IP能评论多少条",
  						ph: 0
  					},
  					limitAll: {
  						title: "限制所有人",
  						desc: "限制所有人10分钟内，所有IP能评论多少条",
  						ph: 0
  					},
  					cdn: {
  						title: "头像CDN",
  						desc: "评论头像CDN地址",
  						ph: "https://cn.gravatar.com/avatar/"
  					},
  					akismet: {
  						title: "Akismet",
  						desc: "垃圾评论检测处理",
  						ph: "Akismet Key"
  					}
  				},
  				mail: {
  					name: "邮件提醒",
  					site: {
  						title: "网站地址",
  						desc: "邮件内快速跳转到网站评论区",
  						ph: "https://blog.example.com"
  					},
  					server: {
  						title: "服务端地址",
  						desc: "评论系统服务端地址(与客户端的serverURLs一致)",
  						ph: "https://server-discuss.example.com"
  					},
  					host: {
  						title: "服务商主机",
  						desc: "例如: 腾讯企业主机",
  						ph: "smtp.exmail.qq.com"
  					},
  					port: {
  						title: "服务商主机端口",
  						desc: "例如: 腾讯企业主机端口",
  						ph: 465
  					},
  					from: {
  						title: "发件人",
  						ph: "例如: server@example.com"
  					},
  					accept: {
  						title: "授权码或密码",
  						desc: "每个服务商各有不同"
  					},
  					Msubject: {
  						title: "邮件标题(管理员)",
  						desc: "管理员收到的评论邮件标题",
  						ph: "您在「Discuss 官网」上有新的评论啦！"
  					},
  					Rsubject: {
  						title: "邮件标题(评论者)",
  						desc: "其他人收到的评论标题",
  						ph: "您在「Discuss 官网」上有新的评论回复啦！"
  					},
  					Mtemplate: {
  						title: "邮件模板(管理员)",
  						desc: "管理员收到的评论邮件模板"
  					},
  					Rtemplate: {
  						title: "邮件模板(评论者)",
  						desc: "其他人收到的评论模板"
  					}
  				},
  				password: {
  					name: "修改密码",
  					pwd: "新密码",
  					cfm: "确认密码"
  				}
  			}
  		}
  	}
  };
  var cn = {
  	nick: nick$1,
  	mail: mail$1,
  	site: site$1,
  	content: content$1,
  	cancel: cancel$1,
  	preview: preview$1,
  	send: send$1,
  	comment: comment$1,
  	master: master$1,
  	stick: stick$1,
  	reply: reply$1,
  	timeAgo: timeAgo$2,
  	pleaseLogin: pleaseLogin$1,
  	sendError: sendError$1,
  	more: more$1,
  	moreCommentsChild: moreCommentsChild$1,
  	notComments: notComments$1,
  	commentsAudit: commentsAudit$1,
  	commentsError: commentsError$1,
  	settingMsg: settingMsg$1,
  	refreshMsg: refreshMsg$1,
  	admin: admin$1
  };

  var nick = "Nick";
  var mail = "Mail";
  var site = "Site";
  var content = "Comment your thoughts~";
  var cancel = "Cancel";
  var preview = "Preview";
  var send = "Send";
  var comment = "Comments";
  var master = "Admin";
  var stick = "Top";
  var reply = "Reply";
  var timeAgo$1 = {
  	now: "Just now",
  	minutes: "Minutes ago",
  	hours: "Hours ago",
  	days: "Days ago"
  };
  var pleaseLogin = "Please log in and then use the admin email to comment";
  var sendError = "Comment failed~";
  var more = "More";
  var moreCommentsChild = "Expand the remaining $counter reply comments";
  var notComments = "Not Comments";
  var commentsAudit = "Your comment may need to be moderated before it can be displayed";
  var commentsError = "Failed to get comments~";
  var settingMsg = "Loading admin panel...";
  var refreshMsg = "Refreshing comments...";
  var admin = {
  	login: {
  		login: "Sign in",
  		close: "Close",
  		username: "Username",
  		password: "Password",
  		msg: "Automatic login in progress...",
  		loginError: "User name or password error"
  	},
  	manage: {
  		comment: {
  			msg: "Get comments automatically...",
  			text: "Comments",
  			save: "Save",
  			time: "Time",
  			path: "Path",
  			total: "",
  			bar: "entries",
  			page: "Page",
  			search: {
  				text: "Search",
  				close: "Close",
  				title: "Search Comments",
  				options: {
  					all: "All",
  					ip: "IP",
  					nick: "Nick",
  					mail: "Mail",
  					site: "Site",
  					content: "Content",
  					path: "Path"
  				}
  			},
  			batch: {
  				operateMsg: "Select at least one comment",
  				operate: {
  					"default": "Default",
  					accept: "Accept",
  					audit: "Audit",
  					spam: "Spam",
  					"delete": "Delete"
  				}
  			},
  			operate: {
  				stick: "Top",
  				accept: "Accept",
  				audit: "Audit",
  				edit: "Edit",
  				spam: "Spam",
  				"delete": "Delete"
  			},
  			options: {
  				current: "Current page",
  				accept: "Passed",
  				audit: "Pending review",
  				spam: "Spam",
  				master: "Mine"
  			}
  		},
  		config: {
  			msg: "Automatic get configuration...",
  			error: "Failed to get configuration",
  			text: "Configuration",
  			save: "Save",
  			passwordError: "Inconsistent passwords",
  			settings: {
  				basic: {
  					name: "Basic",
  					user: {
  						title: "Username",
  						desc: "Login Username",
  						ph: "Name"
  					},
  					mail: {
  						title: "Administrator Email",
  						desc: "Confirm administrator identity",
  						ph: "mail@example.com"
  					},
  					domain: {
  						title: "Secure Domain",
  						desc: "Restrict other third-party website requests from being blocked (multiple comma-separated)",
  						ph: "example.com,www.example.com"
  					},
  					headers: {
  						title: "Request header priority",
  						desc: "To ensure that the acquired user IPs are authentic (use commas to separate multiple ones)",
  						ph: "headers.cf-connecting-ip"
  					}
  				},
  				commentHandle: {
  					name: "Comments",
  					count: {
  						title: "Comment Count",
  						desc: "How many comments to get at a time",
  						ph: 6
  					},
  					word: {
  						title: "Word limit",
  						desc: "Comment content, nickname, email, website (split by English comma, enter only a 0 for all unrestricted)",
  						ph: 0
  					},
  					limit: {
  						title: "Limit",
  						desc: "Limit how many comments an IP can make in 10 minutes",
  						ph: 0
  					},
  					limitAll: {
  						title: "Limit all people",
  						desc: "Limit all people within 10 minutes, all IP can comment on how many",
  						ph: 0
  					},
  					cdn: {
  						title: "Avatar CDN",
  						desc: "Comment avatar CDN address",
  						ph: "https://cn.gravatar.com/avatar/"
  					},
  					akismet: {
  						title: "Akismet",
  						desc: "Spam comment detection and processing",
  						ph: "Akismet Key"
  					}
  				},
  				mail: {
  					name: "Email Alerts",
  					site: {
  						title: "Website address",
  						desc: "Quick jump to the comment section of the website within the email",
  						ph: "https://blog.example.com"
  					},
  					server: {
  						title: "Server side address",
  						desc: "Comment system server address (same as the client's serverURLs)",
  						ph: "https://server-discuss.example.com"
  					},
  					host: {
  						title: "Service Provider Hosting",
  						desc: "For example: Tencent Enterprise Hosting",
  						ph: "smtp.exmail.qq.com"
  					},
  					port: {
  						title: "Service Provider Hosting Port",
  						desc: "Example: Tencent Enterprise Hosting Port",
  						ph: 465
  					},
  					from: {
  						title: "Sender",
  						ph: "Example: server@example.com"
  					},
  					accept: {
  						title: "Authorization code or password",
  						desc: "Each service provider is different"
  					},
  					Msubject: {
  						title: "Mail Title(Administrator)",
  						desc: "Title of the comment email received by the administrator",
  						ph: "You have a new review on \"Discuss Official Website\"!"
  					},
  					Rsubject: {
  						title: "Mail title (commenter)",
  						desc: "Title of comments received by others",
  						ph: "You have a new comment on \"Discuss Official Website\"!"
  					},
  					Mtemplate: {
  						title: "Email Template (Administrator)",
  						desc: "Template for comment emails received by administrators"
  					},
  					Rtemplate: {
  						title: "Email Template (Commenter)",
  						desc: "Template for comments received by others"
  					}
  				},
  				password: {
  					name: "Password",
  					pwd: "New Password",
  					cfm: "Confirm Password"
  				}
  			}
  		}
  	}
  };
  var en = {
  	nick: nick,
  	mail: mail,
  	site: site,
  	content: content,
  	cancel: cancel,
  	preview: preview,
  	send: send,
  	comment: comment,
  	master: master,
  	stick: stick,
  	reply: reply,
  	timeAgo: timeAgo$1,
  	pleaseLogin: pleaseLogin,
  	sendError: sendError,
  	more: more,
  	moreCommentsChild: moreCommentsChild,
  	notComments: notComments,
  	commentsAudit: commentsAudit,
  	commentsError: commentsError,
  	settingMsg: settingMsg,
  	refreshMsg: refreshMsg,
  	admin: admin
  };

  const nullish = (v) => (v !== null && v !== void 0 ? v : '');

  let language;

  function setLanguage(lang) {
    if (lang === 'en') language = en;
    else language = cn;
  }

  /**
   * 动态获取对象属性值
   * @param {*} obj
   * @param {*} str
   * @returns
   */
  function translate(key) {
    key = key.replace(/\[(\w+)\]/g, '.$1'); // 处理数组下标
    let arr = key.split('.');
    let obj = { ...language };
    for (let i of arr) obj = nullish(obj[i]);

    return obj
  }

  function isJSON(t) {
    try {
      return JSON.parse(t)
    } catch (error) {
      return t
    }
  }

  var request = (options) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method || 'POST', options.url, true);
      if (options.method === 'GET') xhr.send();
      else xhr.send(JSON.stringify(options.data));
      xhr.onreadystatechange = () => {
        try {
          if (xhr.readyState === 4) {
            const isSuccess = xhr.status >= 200 && xhr.status < 300;
            if (isSuccess) resolve(isJSON(xhr.responseText));
            else reject(xhr);
          }
        } catch (error) {
          reject(error);
        }
      };
    })
  };

  var version = "1.2.1";

  const key = [
    '3d眼镜',
    'EDG',
    'LPL',
    'beluga',
    '不好意思',
    '不服吗',
    '亲亲',
    '伞兵',
    '倚墙笑',
    '值得肯定',
    '偷偷看',
    '傻笑',
    '再见',
    '出家人',
    '击剑',
    '加班',
    '勉强笑',
    '危险',
    '发红包',
    '吃手',
    '吃瓜',
    '吐血',
    '吵架',
    '呦吼',
    '呲牙笑',
    '哈士奇',
    '哈士奇失去意识',
    '哈士奇失望',
    '哭泣',
    '唱歌',
    '喜欢',
    '嘿哈',
    '大笑',
    '失去信号',
    '失望',
    '头秃',
    '奋斗',
    '好奇',
    '好的',
    '害羞',
    '小丑',
    '小偷',
    '尬笑',
    '尴尬',
    '应援',
    '开心',
    '引起不适',
    '微笑',
    '思考',
    '恶心',
    '恶魔',
    '恶魔恐惧',
    '惊吓',
    '惊吓白眼',
    '惊讶',
    '惬意',
    '感动',
    '愤怒',
    '我看好你',
    '手机相机',
    '打咩',
    '打牌',
    '托腮',
    '扶额',
    '抠鼻',
    '抬眼镜',
    '拜托',
    '捂嘴笑',
    '捂脸',
    '擦汗',
    '放鞭炮',
    '敬礼',
    '整理发型',
    '斗鸡眼',
    '智慧的眼神',
    '月饼',
    '有没有搞错',
    '正确',
    '没招',
    '波吉',
    '泪奔',
    '流汗微笑',
    '流鼻涕',
    '深思',
    '滑稽',
    '滑稽吃瓜',
    '滑稽喝水',
    '滑稽奶茶',
    '滑稽柠檬',
    '滑稽狂汗',
    '滑稽被子',
    '烦恼',
    '熊熊',
    '熊猫',
    '熊猫唱歌',
    '熊猫喜欢',
    '熊猫失望',
    '熊猫意外',
    '熬夜',
    '爆炸',
    '牛年进宝',
    '狂热',
    '狗头',
    '狗头围脖',
    '狗头失望',
    '狗头意外',
    '狗头胖次',
    '狗头花',
    '狗头草',
    '猪头',
    '猪头意外',
    '生病',
    '电话',
    '疑问',
    '疼痛',
    '痛哭',
    '看穿一切',
    '眩晕',
    '睡觉',
    '禁言',
    '笑哭',
    '纠结',
    '绿帽',
    '缺牙笑',
    '翻白眼',
    '老虎意外',
    '耍酷',
    '胡子',
    '菜狗',
    '菜狗花',
    '蒙面滑稽',
    '虎年进宝',
    '被打',
    '裂开',
    '警告',
    '读书',
    '财神红包',
    '超爱',
    '这是啥',
    '送福',
    '送花',
    '错误',
    '阴险',
    '难以置信',
    '面具',
    '饥渴',
    '鬼脸',
    '黑线',
    '鼓掌'
  ];

  var emotFn = (emotCDN) => {
    emotCDN = (emotCDN || `https://lib.baomitu.com/discuss/${version}`).replace(/\/$/, '') + '/assets/emot/';
    const items = {};
    for (const i of key) items[i] = emotCDN + i + '.png';
    return {
      '😀': {
        type: 'text',
        items: {
          'grinning face': '😀',
          'grinning face with big eyes': '😃',
          'grinning face with smiling eyes': '😄',
          'beaming face with smiling eyes': '😁',
          'grinning squinting face': '😆',
          'grinning face with sweat': '😅',
          'rolling on the floor laughing': '🤣',
          'face with tears of joy': '😂',
          'slightly smiling face': '🙂',
          'upside down face': '🙃',
          'winking face': '😉',
          'smiling face with smiling eyes': '😊',
          'smiling face with halo': '😇',
          'smiling face with hearts': '🥰',
          'smiling face with heart eyes': '😍',
          'star struck': '🤩',
          'face blowing a kiss': '😘',
          'kissing face': '😗',
          'smiling face': '☺️',
          'kissing face with closed eyes': '😚',
          'kissing face with smiling eyes': '😙',
          'face savoring food': '😋',
          'face with tongue': '😛',
          'winking face with tongue': '😜',
          'zany face': '🤪',
          'squinting face with tongue': '😝',
          'money mouth face': '🤑',
          'hugging face': '🤗',
          'face with hand over mouth': '🤭',
          'shushing face': '🤫',
          'thinking face': '🤔',
          'zipper mouth face': '🤐',
          'face with raised eyebrow': '🤨',
          'neutral face': '😐',
          'expressionless face': '😑',
          'face without mouth': '😶',
          'smirking face': '😏',
          'unamused face': '😒',
          'face with rolling eyes': '🙄',
          'grimacing face': '😬',
          'lying face': '🤥',
          'relieved face': '😌',
          'pensive face': '😔',
          'sleepy face': '😪',
          'drooling face': '🤤',
          'sleeping face': '😴',
          'face with medical mask': '😷',
          'face with thermometer': '🤒',
          'face with head bandage': '🤕',
          'nauseated face': '🤢',
          'face vomiting': '🤮',
          'sneezing face': '🤧',
          'hot face': '🥵',
          'cold face': '🥶',
          'woozy face': '🥴',
          'dizzy face': '😵',
          'exploding head': '🤯',
          'cowboy hat face': '🤠',
          'partying face': '🥳',
          'smiling face with sunglasses': '😎',
          'nerd face': '🤓',
          'face with monocle': '🧐',
          'confused face': '😕',
          'worried face': '😟',
          'slightly frowning face': '🙁',
          'frowning face': '☹️',
          'face with open mouth': '😮',
          'hushed face': '😯',
          'astonished face': '😲',
          'flushed face': '😳',
          'pleading face': '🥺',
          'frowning face with open mouth': '😦',
          'anguished face': '😧',
          'fearful face': '😨',
          'anxious face with sweat': '😰',
          'sad but relieved face': '😥',
          'crying face': '😢',
          'loudly crying face': '😭',
          'face screaming in fear': '😱',
          'confounded face': '😖',
          'persevering face': '😣',
          'disappointed face': '😞',
          'downcast face with sweat': '😓',
          'weary face': '😩',
          'tired face': '😫',
          'yawning face': '🥱',
          'face with steam from nose': '😤',
          'pouting face': '😡',
          'angry face': '😠',
          'face with symbols on mouth': '🤬',
          'smiling face with horns': '😈',
          'angry face with horns': '👿',
          skull: '💀',
          'skull and crossbones': '☠️',
          'pile of poo': '💩',
          'clown face': '🤡',
          ogre: '👹',
          goblin: '👺',
          ghost: '👻',
          alien: '👽',
          'alien monster': '👾',
          robot: '🤖',
          'grinning cat': '😺',
          'grinning cat with smiling eyes': '😸',
          'cat with tears of joy': '😹',
          'smiling cat with heart eyes': '😻',
          'cat with wry smile': '😼',
          'kissing cat': '😽',
          'weary cat': '🙀',
          'crying cat': '😿',
          'pouting cat': '😾',
          'see no evil monkey': '🙈',
          'hear no evil monkey': '🙉',
          'speak no evil monkey': '🙊'
        }
      },
      [`<img src=${items['鼓掌']}>`]: {
        type: 'image',
        items
      }
    }
  };

  /* assets\svg\Emotion.svg.rollup-plugin.svelte generated by Svelte v3.52.0 */

  const file$8 = "assets\\svg\\Emotion.svg.rollup-plugin.svelte";

  function create_fragment$8(ctx) {
  	let svg;
  	let path;

  	let svg_levels = [
  		{ class: "D-emotion-svg D-svg" },
  		{ width: "24" },
  		{ height: "24" },
  		{ fill: "currentColor" },
  		/*$$props*/ ctx[0]
  	];

  	let svg_data = {};

  	for (let i = 0; i < svg_levels.length; i += 1) {
  		svg_data = assign(svg_data, svg_levels[i]);
  	}

  	const block = {
  		c: function create() {
  			svg = svg_element("svg");
  			path = svg_element("path");
  			attr_dev(path, "d", "M7.523 13.5h8.954c-.228 2.47-2.145 4-4.477 4-2.332 0-4.25-1.53-4.477-4zM12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm0-1.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm-3-8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z");
  			add_location(path, file$8, 0, 90, 90);
  			set_svg_attributes(svg, svg_data);
  			add_location(svg, file$8, 0, 0, 0);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, svg, anchor);
  			append_dev(svg, path);
  		},
  		p: function update(ctx, [dirty]) {
  			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
  				{ class: "D-emotion-svg D-svg" },
  				{ width: "24" },
  				{ height: "24" },
  				{ fill: "currentColor" },
  				dirty & /*$$props*/ 1 && /*$$props*/ ctx[0]
  			]));
  		},
  		i: noop,
  		o: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(svg);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment$8.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  function instance$8($$self, $$props, $$invalidate) {
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots('Emotion_svg_rollup_plugin', slots, []);

  	$$self.$$set = $$new_props => {
  		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  	};

  	$$self.$inject_state = $$new_props => {
  		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$props = exclude_internal_props($$props);
  	return [$$props];
  }

  class Emotion_svg_rollup_plugin extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, {});

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "Emotion_svg_rollup_plugin",
  			options,
  			id: create_fragment$8.name
  		});
  	}
  }

  /* assets\svg\Loading.svg.rollup-plugin.svelte generated by Svelte v3.52.0 */

  const file$7 = "assets\\svg\\Loading.svg.rollup-plugin.svelte";

  function create_fragment$7(ctx) {
  	let svg;
  	let circle;

  	let svg_levels = [
  		{ class: "D-loading-svg D-svg" },
  		{ viewBox: "0 0 100 100" },
  		/*$$props*/ ctx[0]
  	];

  	let svg_data = {};

  	for (let i = 0; i < svg_levels.length; i += 1) {
  		svg_data = assign(svg_data, svg_levels[i]);
  	}

  	const block = {
  		c: function create() {
  			svg = svg_element("svg");
  			circle = svg_element("circle");
  			attr_dev(circle, "cx", "50");
  			attr_dev(circle, "cy", "50");
  			attr_dev(circle, "fill", "none");
  			attr_dev(circle, "stroke", "currentColor");
  			attr_dev(circle, "stroke-width", "8");
  			attr_dev(circle, "r", "40");
  			attr_dev(circle, "stroke-linecap", "round");
  			attr_dev(circle, "stroke-dasharray", "128 120");
  			add_location(circle, file$7, 0, 69, 69);
  			set_svg_attributes(svg, svg_data);
  			add_location(svg, file$7, 0, 0, 0);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, svg, anchor);
  			append_dev(svg, circle);
  		},
  		p: function update(ctx, [dirty]) {
  			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
  				{ class: "D-loading-svg D-svg" },
  				{ viewBox: "0 0 100 100" },
  				dirty & /*$$props*/ 1 && /*$$props*/ ctx[0]
  			]));
  		},
  		i: noop,
  		o: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(svg);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment$7.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  function instance$7($$self, $$props, $$invalidate) {
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots('Loading_svg_rollup_plugin', slots, []);

  	$$self.$$set = $$new_props => {
  		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  	};

  	$$self.$inject_state = $$new_props => {
  		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$props = exclude_internal_props($$props);
  	return [$$props];
  }

  class Loading_svg_rollup_plugin extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, {});

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "Loading_svg_rollup_plugin",
  			options,
  			id: create_fragment$7.name
  		});
  	}
  }

  /* assets\svg\Setting.svg.rollup-plugin.svelte generated by Svelte v3.52.0 */

  const file$6 = "assets\\svg\\Setting.svg.rollup-plugin.svelte";

  function create_fragment$6(ctx) {
  	let svg;
  	let path;

  	let svg_levels = [
  		{ class: "D-settings-svg D-svg" },
  		{ width: "24" },
  		{ height: "24" },
  		{ fill: "currentColor" },
  		{ viewBox: "0 0 512 512" },
  		/*$$props*/ ctx[0]
  	];

  	let svg_data = {};

  	for (let i = 0; i < svg_levels.length; i += 1) {
  		svg_data = assign(svg_data, svg_levels[i]);
  	}

  	const block = {
  		c: function create() {
  			svg = svg_element("svg");
  			path = svg_element("path");
  			attr_dev(path, "d", "m487.4 315.7-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z");
  			add_location(path, file$6, 0, 113, 113);
  			set_svg_attributes(svg, svg_data);
  			add_location(svg, file$6, 0, 0, 0);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, svg, anchor);
  			append_dev(svg, path);
  		},
  		p: function update(ctx, [dirty]) {
  			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
  				{ class: "D-settings-svg D-svg" },
  				{ width: "24" },
  				{ height: "24" },
  				{ fill: "currentColor" },
  				{ viewBox: "0 0 512 512" },
  				dirty & /*$$props*/ 1 && /*$$props*/ ctx[0]
  			]));
  		},
  		i: noop,
  		o: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(svg);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment$6.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  function instance$6($$self, $$props, $$invalidate) {
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots('Setting_svg_rollup_plugin', slots, []);

  	$$self.$$set = $$new_props => {
  		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  	};

  	$$self.$inject_state = $$new_props => {
  		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$props = exclude_internal_props($$props);
  	return [$$props];
  }

  class Setting_svg_rollup_plugin extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, {});

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "Setting_svg_rollup_plugin",
  			options,
  			id: create_fragment$6.name
  		});
  	}
  }

  /* assets\svg\Refresh.svg.rollup-plugin.svelte generated by Svelte v3.52.0 */

  const file$5 = "assets\\svg\\Refresh.svg.rollup-plugin.svelte";

  function create_fragment$5(ctx) {
  	let svg;
  	let path;

  	let svg_levels = [
  		{ class: "D-refresh-svg D-svg" },
  		{ viewBox: "0 0 1024 1024" },
  		{ width: "16" },
  		{ height: "16" },
  		{ fill: "currentColor" },
  		{ stroke: "currentColor" },
  		{ "stroke-width": "26" },
  		/*$$props*/ ctx[0]
  	];

  	let svg_data = {};

  	for (let i = 0; i < svg_levels.length; i += 1) {
  		svg_data = assign(svg_data, svg_levels[i]);
  	}

  	const block = {
  		c: function create() {
  			svg = svg_element("svg");
  			path = svg_element("path");
  			attr_dev(path, "d", "M960 416V192l-73.056 73.056a447.712 447.712 0 0 0-373.6-201.088C265.92 63.968 65.312 264.544 65.312 512S265.92 960.032 513.344 960.032a448.064 448.064 0 0 0 415.232-279.488 38.368 38.368 0 1 0-71.136-28.896 371.36 371.36 0 0 1-344.096 231.584c-205.024 0-371.232-166.208-371.232-371.232S308.32 140.768 513.344 140.768c132.448 0 251.936 70.08 318.016 179.84L736 416h224z");
  			add_location(path, file$5, 0, 154, 154);
  			set_svg_attributes(svg, svg_data);
  			add_location(svg, file$5, 0, 0, 0);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, svg, anchor);
  			append_dev(svg, path);
  		},
  		p: function update(ctx, [dirty]) {
  			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
  				{ class: "D-refresh-svg D-svg" },
  				{ viewBox: "0 0 1024 1024" },
  				{ width: "16" },
  				{ height: "16" },
  				{ fill: "currentColor" },
  				{ stroke: "currentColor" },
  				{ "stroke-width": "26" },
  				dirty & /*$$props*/ 1 && /*$$props*/ ctx[0]
  			]));
  		},
  		i: noop,
  		o: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(svg);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment$5.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  function instance$5($$self, $$props, $$invalidate) {
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots('Refresh_svg_rollup_plugin', slots, []);

  	$$self.$$set = $$new_props => {
  		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  	};

  	$$self.$inject_state = $$new_props => {
  		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$props = exclude_internal_props($$props);
  	return [$$props];
  }

  class Refresh_svg_rollup_plugin extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, {});

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "Refresh_svg_rollup_plugin",
  			options,
  			id: create_fragment$5.name
  		});
  	}
  }

  /* src\client\view\submit.svelte generated by Svelte v3.52.0 */

  const { Object: Object_1$1, console: console_1$1 } = globals;
  const file$4 = "src\\client\\view\\submit.svelte";

  function add_css$3(target) {
  	append_styles(target, "svelte-1v6b913", ".D-submit.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{margin:10px 0;padding:10px;border-radius:8px;border:solid 1px var(--D-Centre-Color)}.D-submit.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913:hover{border-color:var(--D-Height-Color)}.D-submit.svelte-1v6b913 .D-input .D-error.svelte-1v6b913.svelte-1v6b913{border-radius:6px;border-color:var(--D-main-Color);background:rgba(244, 100, 95, 0.1)}.D-input.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{position:relative}.D-input.svelte-1v6b913 input.svelte-1v6b913.svelte-1v6b913{padding:6px;width:calc((100% - 1rem) / 3);outline:none;border-bottom:dashed 1px var(--D-Centre-Color)}.D-input.svelte-1v6b913 input.svelte-1v6b913+input.svelte-1v6b913{margin-left:0.5rem}.D-input.svelte-1v6b913 .svelte-1v6b913.svelte-1v6b913{color:currentColor;border:none;background:transparent;box-sizing:border-box}.D-input.svelte-1v6b913 .svelte-1v6b913.svelte-1v6b913:focus{border-radius:8px;background:rgba(153, 153, 153, 0.08)}.D-input.svelte-1v6b913 .svelte-1v6b913.svelte-1v6b913:hover{border-color:var(--D-Height-Color);transition:all 0.5s}.D-input.svelte-1v6b913 .D-input-content.svelte-1v6b913.svelte-1v6b913{margin:10px 0 0;resize:vertical;width:100%;min-height:140px;max-height:400px;outline:none;font-family:inherit;transition:none}.D-input.svelte-1v6b913 .D-text-number.svelte-1v6b913.svelte-1v6b913{position:absolute;color:#999;right:14px;bottom:6px;font-size:12px}.D-input.svelte-1v6b913 .D-text-number-illegal.svelte-1v6b913.svelte-1v6b913{color:red}.D-input.svelte-1v6b913 .D-error.svelte-1v6b913.svelte-1v6b913{border-radius:6px;border-color:var(--D-main-Color);background:rgba(244, 100, 95, 0.1)}.D-actions.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{margin:10px 0 0}.D-actions.svelte-1v6b913 .D-actions-left.svelte-1v6b913.svelte-1v6b913{display:flex}.D-actions.svelte-1v6b913 .D-actions-right.svelte-1v6b913.svelte-1v6b913{display:flex;align-items:center}.D-actions.svelte-1v6b913 .D-actions-right .D-btn.svelte-1v6b913.svelte-1v6b913{margin-left:4px}.D-actions.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913,.D-emot-btn.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913,.D-setting-btn.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913,.D-refresh-btn.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{position:relative;display:flex;align-items:center;justify-content:space-between}.D-setting-btn.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913,.D-refresh-btn.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{width:18px;cursor:pointer;margin-left:6px}.D-send.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{display:flex;align-items:center;justify-content:center}.D-emot.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{top:30px;width:100%;margin-top:10px;border:1px solid var(--D-Low-Color);border-radius:4px}.D-emot-items.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{display:none;height:180px;min-height:100px;max-height:200px;resize:vertical;padding:10px;margin:0;overflow-x:hidden;user-select:none}.D-emot-items-active.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{display:block}.D-emot-item.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{font-size:20px;list-style-type:none;padding:5px 10px;border-radius:5px;display:inline-block;line-height:14px;margin:0 10px 12px 0;cursor:pointer;transition:0.3s}.D-emot-item.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913:hover{background:var(--D-Low-Color);box-shadow:0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)}.D-emot-packages.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{padding:0;font-size:0;border-top:solid 1px var(--D-Low-Color)}.D-emot-packages.svelte-1v6b913 span.svelte-1v6b913.svelte-1v6b913{display:inline-block;line-height:30px;font-size:14px;padding:0 10px;cursor:pointer}.D-emot-packages.svelte-1v6b913 span.svelte-1v6b913 img{width:20px;position:relative;top:5px}.D-emot-packages.svelte-1v6b913 span.svelte-1v6b913.svelte-1v6b913:nth-child(1){border-radius:0 0 0 3px}.D-emot-package-active.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{background:var(--D-Low-Color)}.D-preview.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{padding:10px;overflow-x:auto;min-height:1.375rem;margin:10px 0;border:1px solid #dcdfe6;border-radius:4px}@media screen and (max-width: 500px){.D-input.svelte-1v6b913.svelte-1v6b913.svelte-1v6b913{display:flex;flex-direction:column}.D-input.svelte-1v6b913 input.svelte-1v6b913.svelte-1v6b913{width:100%}.D-input.svelte-1v6b913 input.svelte-1v6b913+input.svelte-1v6b913{margin-top:4px;margin-left:0}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWl0LnN2ZWx0ZSIsIm1hcHBpbmdzIjoiZzJJQWdsQkEiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsic3VibWl0LnN2ZWx0ZSJdfQ== */");
  }

  function get_each_context$1(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[42] = list[i][0];
  	child_ctx[43] = list[i][1];
  	child_ctx[45] = i;
  	return child_ctx;
  }

  function get_each_context_1(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[42] = list[i][0];
  	child_ctx[43] = list[i][1];
  	child_ctx[45] = i;
  	return child_ctx;
  }

  function get_each_context_2(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[47] = list[i][0];
  	child_ctx[48] = list[i][1];
  	return child_ctx;
  }

  function get_each_context_3(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[51] = list[i];
  	child_ctx[52] = list;
  	child_ctx[53] = i;
  	return child_ctx;
  }

  // (291:4) {#each inputs as i}
  function create_each_block_3(ctx) {
  	let input;
  	let input_class_value;
  	let mounted;
  	let dispose;

  	function input_input_handler() {
  		/*input_input_handler*/ ctx[22].call(input, /*i*/ ctx[51]);
  	}

  	function input_handler(...args) {
  		return /*input_handler*/ ctx[23](/*i*/ ctx[51], ...args);
  	}

  	const block = {
  		c: function create() {
  			input = element("input");
  			attr_dev(input, "class", input_class_value = "" + (null_to_empty(/*metas*/ ctx[9][/*i*/ ctx[51].key].is ? '' : 'D-error') + " svelte-1v6b913"));
  			attr_dev(input, "name", /*i*/ ctx[51].key);
  			attr_dev(input, "placeholder", /*i*/ ctx[51].locale);
  			add_location(input, file$4, 291, 6, 7452);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, input, anchor);
  			set_input_value(input, /*metas*/ ctx[9][/*i*/ ctx[51].key].value);

  			if (!mounted) {
  				dispose = [
  					listen_dev(input, "input", input_input_handler),
  					listen_dev(input, "input", input_handler, false, false, false),
  					listen_dev(input, "input", /*onInput*/ ctx[16], false, false, false)
  				];

  				mounted = true;
  			}
  		},
  		p: function update(new_ctx, dirty) {
  			ctx = new_ctx;

  			if (dirty[0] & /*metas*/ 512 && input_class_value !== (input_class_value = "" + (null_to_empty(/*metas*/ ctx[9][/*i*/ ctx[51].key].is ? '' : 'D-error') + " svelte-1v6b913"))) {
  				attr_dev(input, "class", input_class_value);
  			}

  			if (dirty[0] & /*metas, inputs*/ 16896 && input.value !== /*metas*/ ctx[9][/*i*/ ctx[51].key].value) {
  				set_input_value(input, /*metas*/ ctx[9][/*i*/ ctx[51].key].value);
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(input);
  			mounted = false;
  			run_all(dispose);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_each_block_3.name,
  		type: "each",
  		source: "(291:4) {#each inputs as i}",
  		ctx
  	});

  	return block;
  }

  // (309:4) {#if wordLimitContent}
  function create_if_block_6$1(ctx) {
  	let span;
  	let t0;
  	let t1;
  	let if_block = /*wordLimitContent*/ ctx[10] && create_if_block_7(ctx);

  	const block = {
  		c: function create() {
  			span = element("span");
  			t0 = text(/*limitContentLen*/ ctx[11]);
  			t1 = space();
  			if (if_block) if_block.c();
  			attr_dev(span, "class", "D-text-number svelte-1v6b913");
  			add_location(span, file$4, 309, 6, 7962);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, span, anchor);
  			append_dev(span, t0);
  			append_dev(span, t1);
  			if (if_block) if_block.m(span, null);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty[0] & /*limitContentLen*/ 2048) set_data_dev(t0, /*limitContentLen*/ ctx[11]);

  			if (/*wordLimitContent*/ ctx[10]) {
  				if (if_block) {
  					if_block.p(ctx, dirty);
  				} else {
  					if_block = create_if_block_7(ctx);
  					if_block.c();
  					if_block.m(span, null);
  				}
  			} else if (if_block) {
  				if_block.d(1);
  				if_block = null;
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(span);
  			if (if_block) if_block.d();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_6$1.name,
  		type: "if",
  		source: "(309:4) {#if wordLimitContent}",
  		ctx
  	});

  	return block;
  }

  // (312:8) {#if wordLimitContent}
  function create_if_block_7(ctx) {
  	let span;
  	let t_value = '/ ' + /*wordLimitContent*/ ctx[10] + "";
  	let t;
  	let span_class_value;

  	const block = {
  		c: function create() {
  			span = element("span");
  			t = text(t_value);
  			attr_dev(span, "class", span_class_value = "" + (null_to_empty(/*limitContentLen*/ ctx[11] > /*wordLimitContent*/ ctx[10] && 'D-text-number-illegal') + " svelte-1v6b913"));
  			add_location(span, file$4, 312, 10, 8058);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, span, anchor);
  			append_dev(span, t);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty[0] & /*wordLimitContent*/ 1024 && t_value !== (t_value = '/ ' + /*wordLimitContent*/ ctx[10] + "")) set_data_dev(t, t_value);

  			if (dirty[0] & /*limitContentLen, wordLimitContent*/ 3072 && span_class_value !== (span_class_value = "" + (null_to_empty(/*limitContentLen*/ ctx[11] > /*wordLimitContent*/ ctx[10] && 'D-text-number-illegal') + " svelte-1v6b913"))) {
  				attr_dev(span, "class", span_class_value);
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(span);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_7.name,
  		type: "if",
  		source: "(312:8) {#if wordLimitContent}",
  		ctx
  	});

  	return block;
  }

  // (324:6) {#if !cancel}
  function create_if_block_5$1(ctx) {
  	let div0;
  	let setting;
  	let t;
  	let div1;
  	let refresh;
  	let current;
  	let mounted;
  	let dispose;
  	setting = new Setting_svg_rollup_plugin({ $$inline: true });
  	refresh = new Refresh_svg_rollup_plugin({ $$inline: true });

  	const block = {
  		c: function create() {
  			div0 = element("div");
  			create_component(setting.$$.fragment);
  			t = space();
  			div1 = element("div");
  			create_component(refresh.$$.fragment);
  			attr_dev(div0, "class", "D-setting-btn svelte-1v6b913");
  			add_location(div0, file$4, 325, 8, 8544);
  			attr_dev(div1, "class", "D-refresh-btn svelte-1v6b913");
  			add_location(div1, file$4, 327, 8, 8701);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div0, anchor);
  			mount_component(setting, div0, null);
  			insert_dev(target, t, anchor);
  			insert_dev(target, div1, anchor);
  			mount_component(refresh, div1, null);
  			current = true;

  			if (!mounted) {
  				dispose = [
  					listen_dev(div0, "click", /*click_handler_1*/ ctx[27], false, false, false),
  					listen_dev(div1, "click", /*click_handler_2*/ ctx[28], false, false, false)
  				];

  				mounted = true;
  			}
  		},
  		p: noop,
  		i: function intro(local) {
  			if (current) return;
  			transition_in(setting.$$.fragment, local);
  			transition_in(refresh.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(setting.$$.fragment, local);
  			transition_out(refresh.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div0);
  			destroy_component(setting);
  			if (detaching) detach_dev(t);
  			if (detaching) detach_dev(div1);
  			destroy_component(refresh);
  			mounted = false;
  			run_all(dispose);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_5$1.name,
  		type: "if",
  		source: "(324:6) {#if !cancel}",
  		ctx
  	});

  	return block;
  }

  // (334:6) {#if cancel}
  function create_if_block_4$1(ctx) {
  	let button;
  	let mounted;
  	let dispose;

  	const block = {
  		c: function create() {
  			button = element("button");
  			button.textContent = `${translate('cancel')}`;
  			attr_dev(button, "class", "D-cancel D-btn D-btn-main svelte-1v6b913");
  			add_location(button, file$4, 334, 8, 8890);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, button, anchor);

  			if (!mounted) {
  				dispose = listen_dev(button, "click", /*click_handler_3*/ ctx[29], false, false, false);
  				mounted = true;
  			}
  		},
  		p: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(button);
  			mounted = false;
  			dispose();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_4$1.name,
  		type: "if",
  		source: "(334:6) {#if cancel}",
  		ctx
  	});

  	return block;
  }

  // (347:8) {:else}
  function create_else_block_1(ctx) {
  	let t_value = translate('send') + "";
  	let t;

  	const block = {
  		c: function create() {
  			t = text(t_value);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, t, anchor);
  		},
  		p: noop,
  		i: noop,
  		o: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(t);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_else_block_1.name,
  		type: "else",
  		source: "(347:8) {:else}",
  		ctx
  	});

  	return block;
  }

  // (345:8) {#if isSend && isLegal}
  function create_if_block_3$1(ctx) {
  	let loading;
  	let current;
  	loading = new Loading_svg_rollup_plugin({ $$inline: true });

  	const block = {
  		c: function create() {
  			create_component(loading.$$.fragment);
  		},
  		m: function mount(target, anchor) {
  			mount_component(loading, target, anchor);
  			current = true;
  		},
  		p: noop,
  		i: function intro(local) {
  			if (current) return;
  			transition_in(loading.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(loading.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			destroy_component(loading, detaching);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_3$1.name,
  		type: "if",
  		source: "(345:8) {#if isSend && isLegal}",
  		ctx
  	});

  	return block;
  }

  // (353:2) {#if isPreview}
  function create_if_block_2$3(ctx) {
  	let div;

  	const block = {
  		c: function create() {
  			div = element("div");
  			attr_dev(div, "class", "D-preview svelte-1v6b913");
  			add_location(div, file$4, 353, 4, 9497);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div, anchor);
  			div.innerHTML = /*contentHTML*/ ctx[1];
  		},
  		p: function update(ctx, dirty) {
  			if (dirty[0] & /*contentHTML*/ 2) div.innerHTML = /*contentHTML*/ ctx[1];		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_2$3.name,
  		type: "if",
  		source: "(353:2) {#if isPreview}",
  		ctx
  	});

  	return block;
  }

  // (356:2) {#if isEmot}
  function create_if_block$3(ctx) {
  	let div1;
  	let t;
  	let div0;
  	let each_value_1 = Object.entries(/*emotMaps*/ ctx[4]);
  	validate_each_argument(each_value_1);
  	let each_blocks_1 = [];

  	for (let i = 0; i < each_value_1.length; i += 1) {
  		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  	}

  	let each_value = Object.entries(/*emotMaps*/ ctx[4]);
  	validate_each_argument(each_value);
  	let each_blocks = [];

  	for (let i = 0; i < each_value.length; i += 1) {
  		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  	}

  	const block = {
  		c: function create() {
  			div1 = element("div");

  			for (let i = 0; i < each_blocks_1.length; i += 1) {
  				each_blocks_1[i].c();
  			}

  			t = space();
  			div0 = element("div");

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			attr_dev(div0, "class", "D-emot-packages svelte-1v6b913");
  			add_location(div0, file$4, 372, 6, 10291);
  			attr_dev(div1, "class", "D-emot svelte-1v6b913");
  			add_location(div1, file$4, 356, 4, 9573);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div1, anchor);

  			for (let i = 0; i < each_blocks_1.length; i += 1) {
  				each_blocks_1[i].m(div1, null);
  			}

  			append_dev(div1, t);
  			append_dev(div1, div0);

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(div0, null);
  			}
  		},
  		p: function update(ctx, dirty) {
  			if (dirty[0] & /*emotIndex, emotMaps, onClickEmot, D*/ 135192) {
  				each_value_1 = Object.entries(/*emotMaps*/ ctx[4]);
  				validate_each_argument(each_value_1);
  				let i;

  				for (i = 0; i < each_value_1.length; i += 1) {
  					const child_ctx = get_each_context_1(ctx, each_value_1, i);

  					if (each_blocks_1[i]) {
  						each_blocks_1[i].p(child_ctx, dirty);
  					} else {
  						each_blocks_1[i] = create_each_block_1(child_ctx);
  						each_blocks_1[i].c();
  						each_blocks_1[i].m(div1, t);
  					}
  				}

  				for (; i < each_blocks_1.length; i += 1) {
  					each_blocks_1[i].d(1);
  				}

  				each_blocks_1.length = each_value_1.length;
  			}

  			if (dirty[0] & /*emotIndex, emotMaps*/ 24) {
  				each_value = Object.entries(/*emotMaps*/ ctx[4]);
  				validate_each_argument(each_value);
  				let i;

  				for (i = 0; i < each_value.length; i += 1) {
  					const child_ctx = get_each_context$1(ctx, each_value, i);

  					if (each_blocks[i]) {
  						each_blocks[i].p(child_ctx, dirty);
  					} else {
  						each_blocks[i] = create_each_block$1(child_ctx);
  						each_blocks[i].c();
  						each_blocks[i].m(div0, null);
  					}
  				}

  				for (; i < each_blocks.length; i += 1) {
  					each_blocks[i].d(1);
  				}

  				each_blocks.length = each_value.length;
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div1);
  			destroy_each(each_blocks_1, detaching);
  			destroy_each(each_blocks, detaching);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block$3.name,
  		type: "if",
  		source: "(356:2) {#if isEmot}",
  		ctx
  	});

  	return block;
  }

  // (365:14) {:else}
  function create_else_block$2(ctx) {
  	let img;
  	let img_src_value;
  	let img_d_src_value;
  	let img_alt_value;
  	let img_title_value;

  	const block = {
  		c: function create() {
  			img = element("img");
  			attr_dev(img, "class", "D-comment-emot");
  			if (!src_url_equal(img.src, img_src_value = /*D*/ ctx[12].imgLoading)) attr_dev(img, "src", img_src_value);
  			attr_dev(img, "d-src", img_d_src_value = /*iValue*/ ctx[48]);
  			attr_dev(img, "alt", img_alt_value = /*iKey*/ ctx[47]);
  			attr_dev(img, "title", img_title_value = /*iKey*/ ctx[47]);
  			add_location(img, file$4, 365, 16, 10111);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, img, anchor);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty[0] & /*emotMaps*/ 16 && img_d_src_value !== (img_d_src_value = /*iValue*/ ctx[48])) {
  				attr_dev(img, "d-src", img_d_src_value);
  			}

  			if (dirty[0] & /*emotMaps*/ 16 && img_alt_value !== (img_alt_value = /*iKey*/ ctx[47])) {
  				attr_dev(img, "alt", img_alt_value);
  			}

  			if (dirty[0] & /*emotMaps*/ 16 && img_title_value !== (img_title_value = /*iKey*/ ctx[47])) {
  				attr_dev(img, "title", img_title_value);
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(img);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_else_block$2.name,
  		type: "else",
  		source: "(365:14) {:else}",
  		ctx
  	});

  	return block;
  }

  // (363:14) {#if emotValue.type === 'text'}
  function create_if_block_1$3(ctx) {
  	let span;
  	let t_value = /*iValue*/ ctx[48] + "";
  	let t;
  	let span_title_value;

  	const block = {
  		c: function create() {
  			span = element("span");
  			t = text(t_value);
  			attr_dev(span, "title", span_title_value = /*iKey*/ ctx[47]);
  			add_location(span, file$4, 363, 16, 10038);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, span, anchor);
  			append_dev(span, t);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty[0] & /*emotMaps*/ 16 && t_value !== (t_value = /*iValue*/ ctx[48] + "")) set_data_dev(t, t_value);

  			if (dirty[0] & /*emotMaps*/ 16 && span_title_value !== (span_title_value = /*iKey*/ ctx[47])) {
  				attr_dev(span, "title", span_title_value);
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(span);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_1$3.name,
  		type: "if",
  		source: "(363:14) {#if emotValue.type === 'text'}",
  		ctx
  	});

  	return block;
  }

  // (360:10) {#each Object.entries(emotValue.items) as [iKey, iValue]}
  function create_each_block_2(ctx) {
  	let li;
  	let mounted;
  	let dispose;

  	function select_block_type_1(ctx, dirty) {
  		if (/*emotValue*/ ctx[43].type === 'text') return create_if_block_1$3;
  		return create_else_block$2;
  	}

  	let current_block_type = select_block_type_1(ctx);
  	let if_block = current_block_type(ctx);

  	const block = {
  		c: function create() {
  			li = element("li");
  			if_block.c();
  			attr_dev(li, "class", "D-emot-item svelte-1v6b913");
  			add_location(li, file$4, 361, 12, 9898);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, li, anchor);
  			if_block.m(li, null);

  			if (!mounted) {
  				dispose = listen_dev(
  					li,
  					"click",
  					function () {
  						if (is_function(/*onClickEmot*/ ctx[17](/*iKey*/ ctx[47], /*iValue*/ ctx[48], /*emotValue*/ ctx[43].type))) /*onClickEmot*/ ctx[17](/*iKey*/ ctx[47], /*iValue*/ ctx[48], /*emotValue*/ ctx[43].type).apply(this, arguments);
  					},
  					false,
  					false,
  					false
  				);

  				mounted = true;
  			}
  		},
  		p: function update(new_ctx, dirty) {
  			ctx = new_ctx;

  			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
  				if_block.p(ctx, dirty);
  			} else {
  				if_block.d(1);
  				if_block = current_block_type(ctx);

  				if (if_block) {
  					if_block.c();
  					if_block.m(li, null);
  				}
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(li);
  			if_block.d();
  			mounted = false;
  			dispose();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_each_block_2.name,
  		type: "each",
  		source: "(360:10) {#each Object.entries(emotValue.items) as [iKey, iValue]}",
  		ctx
  	});

  	return block;
  }

  // (358:6) {#each Object.entries(emotMaps) as [emotKey, emotValue], index}
  function create_each_block_1(ctx) {
  	let ul;
  	let ul_class_value;
  	let each_value_2 = Object.entries(/*emotValue*/ ctx[43].items);
  	validate_each_argument(each_value_2);
  	let each_blocks = [];

  	for (let i = 0; i < each_value_2.length; i += 1) {
  		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  	}

  	const block = {
  		c: function create() {
  			ul = element("ul");

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			attr_dev(ul, "class", ul_class_value = "D-emot-items " + (/*index*/ ctx[45] === /*emotIndex*/ ctx[3]
  			? 'D-emot-items-active'
  			: '') + " svelte-1v6b913");

  			add_location(ul, file$4, 358, 8, 9672);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, ul, anchor);

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(ul, null);
  			}
  		},
  		p: function update(ctx, dirty) {
  			if (dirty[0] & /*onClickEmot, emotMaps, D*/ 135184) {
  				each_value_2 = Object.entries(/*emotValue*/ ctx[43].items);
  				validate_each_argument(each_value_2);
  				let i;

  				for (i = 0; i < each_value_2.length; i += 1) {
  					const child_ctx = get_each_context_2(ctx, each_value_2, i);

  					if (each_blocks[i]) {
  						each_blocks[i].p(child_ctx, dirty);
  					} else {
  						each_blocks[i] = create_each_block_2(child_ctx);
  						each_blocks[i].c();
  						each_blocks[i].m(ul, null);
  					}
  				}

  				for (; i < each_blocks.length; i += 1) {
  					each_blocks[i].d(1);
  				}

  				each_blocks.length = each_value_2.length;
  			}

  			if (dirty[0] & /*emotIndex*/ 8 && ul_class_value !== (ul_class_value = "D-emot-items " + (/*index*/ ctx[45] === /*emotIndex*/ ctx[3]
  			? 'D-emot-items-active'
  			: '') + " svelte-1v6b913")) {
  				attr_dev(ul, "class", ul_class_value);
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(ul);
  			destroy_each(each_blocks, detaching);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_each_block_1.name,
  		type: "each",
  		source: "(358:6) {#each Object.entries(emotMaps) as [emotKey, emotValue], index}",
  		ctx
  	});

  	return block;
  }

  // (374:8) {#each Object.entries(emotMaps) as [emotKey, emotValue], index}
  function create_each_block$1(ctx) {
  	let span;
  	let raw_value = /*emotKey*/ ctx[42] + "";
  	let span_class_value;
  	let mounted;
  	let dispose;

  	function click_handler_4() {
  		return /*click_handler_4*/ ctx[30](/*index*/ ctx[45]);
  	}

  	const block = {
  		c: function create() {
  			span = element("span");

  			attr_dev(span, "class", span_class_value = "" + (null_to_empty(/*index*/ ctx[45] === /*emotIndex*/ ctx[3]
  			? 'D-emot-package-active'
  			: '') + " svelte-1v6b913"));

  			add_location(span, file$4, 375, 10, 10470);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, span, anchor);
  			span.innerHTML = raw_value;

  			if (!mounted) {
  				dispose = listen_dev(span, "click", click_handler_4, false, false, false);
  				mounted = true;
  			}
  		},
  		p: function update(new_ctx, dirty) {
  			ctx = new_ctx;
  			if (dirty[0] & /*emotMaps*/ 16 && raw_value !== (raw_value = /*emotKey*/ ctx[42] + "")) span.innerHTML = raw_value;
  			if (dirty[0] & /*emotIndex*/ 8 && span_class_value !== (span_class_value = "" + (null_to_empty(/*index*/ ctx[45] === /*emotIndex*/ ctx[3]
  			? 'D-emot-package-active'
  			: '') + " svelte-1v6b913"))) {
  				attr_dev(span, "class", span_class_value);
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(span);
  			mounted = false;
  			dispose();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_each_block$1.name,
  		type: "each",
  		source: "(374:8) {#each Object.entries(emotMaps) as [emotKey, emotValue], index}",
  		ctx
  	});

  	return block;
  }

  function create_fragment$4(ctx) {
  	let div5;
  	let div0;
  	let t0;
  	let textarea;
  	let textarea_class_value;
  	let t1;
  	let t2;
  	let div4;
  	let div2;
  	let div1;
  	let emotion;
  	let t3;
  	let t4;
  	let div3;
  	let t5;
  	let button0;
  	let t6_value = translate('preview') + "";
  	let t6;
  	let button0_class_value;
  	let button1;
  	let current_block_type_index;
  	let if_block3;
  	let button1_disabled_value;
  	let t7;
  	let t8;
  	let current;
  	let mounted;
  	let dispose;
  	let each_value_3 = /*inputs*/ ctx[14];
  	validate_each_argument(each_value_3);
  	let each_blocks = [];

  	for (let i = 0; i < each_value_3.length; i += 1) {
  		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  	}

  	let if_block0 = /*wordLimitContent*/ ctx[10] && create_if_block_6$1(ctx);
  	emotion = new Emotion_svg_rollup_plugin({ $$inline: true });
  	let if_block1 = !/*cancel*/ ctx[0] && create_if_block_5$1(ctx);
  	let if_block2 = /*cancel*/ ctx[0] && create_if_block_4$1(ctx);
  	const if_block_creators = [create_if_block_3$1, create_else_block_1];
  	const if_blocks = [];

  	function select_block_type(ctx, dirty) {
  		if (/*isSend*/ ctx[7] && /*isLegal*/ ctx[8]) return 0;
  		return 1;
  	}

  	current_block_type_index = select_block_type(ctx);
  	if_block3 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  	let if_block4 = /*isPreview*/ ctx[6] && create_if_block_2$3(ctx);
  	let if_block5 = /*isEmot*/ ctx[2] && create_if_block$3(ctx);

  	const block = {
  		c: function create() {
  			div5 = element("div");
  			div0 = element("div");

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			t0 = space();
  			textarea = element("textarea");
  			t1 = space();
  			if (if_block0) if_block0.c();
  			t2 = space();
  			div4 = element("div");
  			div2 = element("div");
  			div1 = element("div");
  			create_component(emotion.$$.fragment);
  			t3 = space();
  			if (if_block1) if_block1.c();
  			t4 = space();
  			div3 = element("div");
  			if (if_block2) if_block2.c();
  			t5 = space();
  			button0 = element("button");
  			t6 = text(t6_value);
  			button1 = element("button");
  			if_block3.c();
  			t7 = space();
  			if (if_block4) if_block4.c();
  			t8 = space();
  			if (if_block5) if_block5.c();
  			attr_dev(textarea, "name", contentStr);
  			attr_dev(textarea, "class", textarea_class_value = "D-input-content " + (/*metas*/ ctx[9].content.is ? '' : 'D-error') + " svelte-1v6b913");
  			attr_dev(textarea, "placeholder", /*D*/ ctx[12].ph);
  			add_location(textarea, file$4, 300, 4, 7703);
  			attr_dev(div0, "class", "D-input svelte-1v6b913");
  			add_location(div0, file$4, 289, 2, 7400);
  			attr_dev(div1, "class", "D-emot-btn svelte-1v6b913");
  			add_location(div1, file$4, 320, 6, 8357);
  			attr_dev(div2, "class", "D-actions-left svelte-1v6b913");
  			add_location(div2, file$4, 318, 4, 8259);
  			attr_dev(button0, "class", button0_class_value = "D-cancel D-btn D-btn-main " + (/* 没有内容则禁用预览按钮 */ !/*metas*/ ctx[9].content.value.length && 'D-disabled') + " svelte-1v6b913");
  			add_location(button0, file$4, 339, 6, 9046);
  			attr_dev(button1, "class", "D-send D-btn D-btn-main svelte-1v6b913");
  			button1.disabled = button1_disabled_value = /*isSend*/ ctx[7] || !/*isLegal*/ ctx[8];
  			add_location(button1, file$4, 343, 7, 9236);
  			attr_dev(div3, "class", "D-actions-right svelte-1v6b913");
  			add_location(div3, file$4, 331, 4, 8813);
  			attr_dev(div4, "class", "D-actions D-select-none svelte-1v6b913");
  			add_location(div4, file$4, 317, 2, 8217);
  			attr_dev(div5, "class", "D-submit svelte-1v6b913");
  			add_location(div5, file$4, 288, 0, 7375);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div5, anchor);
  			append_dev(div5, div0);

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(div0, null);
  			}

  			append_dev(div0, t0);
  			append_dev(div0, textarea);
  			set_input_value(textarea, /*metas*/ ctx[9].content.value);
  			/*textarea_binding*/ ctx[25](textarea);
  			append_dev(div0, t1);
  			if (if_block0) if_block0.m(div0, null);
  			append_dev(div5, t2);
  			append_dev(div5, div4);
  			append_dev(div4, div2);
  			append_dev(div2, div1);
  			mount_component(emotion, div1, null);
  			append_dev(div2, t3);
  			if (if_block1) if_block1.m(div2, null);
  			append_dev(div4, t4);
  			append_dev(div4, div3);
  			if (if_block2) if_block2.m(div3, null);
  			append_dev(div3, t5);
  			append_dev(div3, button0);
  			append_dev(button0, t6);
  			append_dev(div3, button1);
  			if_blocks[current_block_type_index].m(button1, null);
  			append_dev(div5, t7);
  			if (if_block4) if_block4.m(div5, null);
  			append_dev(div5, t8);
  			if (if_block5) if_block5.m(div5, null);
  			current = true;

  			if (!mounted) {
  				dispose = [
  					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[24]),
  					listen_dev(textarea, "input", /*onInput*/ ctx[16], false, false, false),
  					listen_dev(div1, "click", /*click_handler*/ ctx[26], false, false, false),
  					listen_dev(button0, "click", /*onPreview*/ ctx[15], false, false, false),
  					listen_dev(button1, "click", /*onSend*/ ctx[18], false, false, false)
  				];

  				mounted = true;
  			}
  		},
  		p: function update(ctx, dirty) {
  			if (dirty[0] & /*metas, inputs, onInput*/ 82432) {
  				each_value_3 = /*inputs*/ ctx[14];
  				validate_each_argument(each_value_3);
  				let i;

  				for (i = 0; i < each_value_3.length; i += 1) {
  					const child_ctx = get_each_context_3(ctx, each_value_3, i);

  					if (each_blocks[i]) {
  						each_blocks[i].p(child_ctx, dirty);
  					} else {
  						each_blocks[i] = create_each_block_3(child_ctx);
  						each_blocks[i].c();
  						each_blocks[i].m(div0, t0);
  					}
  				}

  				for (; i < each_blocks.length; i += 1) {
  					each_blocks[i].d(1);
  				}

  				each_blocks.length = each_value_3.length;
  			}

  			if (!current || dirty[0] & /*metas*/ 512 && textarea_class_value !== (textarea_class_value = "D-input-content " + (/*metas*/ ctx[9].content.is ? '' : 'D-error') + " svelte-1v6b913")) {
  				attr_dev(textarea, "class", textarea_class_value);
  			}

  			if (dirty[0] & /*metas*/ 512) {
  				set_input_value(textarea, /*metas*/ ctx[9].content.value);
  			}

  			if (/*wordLimitContent*/ ctx[10]) {
  				if (if_block0) {
  					if_block0.p(ctx, dirty);
  				} else {
  					if_block0 = create_if_block_6$1(ctx);
  					if_block0.c();
  					if_block0.m(div0, null);
  				}
  			} else if (if_block0) {
  				if_block0.d(1);
  				if_block0 = null;
  			}

  			if (!/*cancel*/ ctx[0]) {
  				if (if_block1) {
  					if_block1.p(ctx, dirty);

  					if (dirty[0] & /*cancel*/ 1) {
  						transition_in(if_block1, 1);
  					}
  				} else {
  					if_block1 = create_if_block_5$1(ctx);
  					if_block1.c();
  					transition_in(if_block1, 1);
  					if_block1.m(div2, null);
  				}
  			} else if (if_block1) {
  				group_outros();

  				transition_out(if_block1, 1, 1, () => {
  					if_block1 = null;
  				});

  				check_outros();
  			}

  			if (/*cancel*/ ctx[0]) {
  				if (if_block2) {
  					if_block2.p(ctx, dirty);
  				} else {
  					if_block2 = create_if_block_4$1(ctx);
  					if_block2.c();
  					if_block2.m(div3, t5);
  				}
  			} else if (if_block2) {
  				if_block2.d(1);
  				if_block2 = null;
  			}

  			if (!current || dirty[0] & /*metas*/ 512 && button0_class_value !== (button0_class_value = "D-cancel D-btn D-btn-main " + (/* 没有内容则禁用预览按钮 */ !/*metas*/ ctx[9].content.value.length && 'D-disabled') + " svelte-1v6b913")) {
  				attr_dev(button0, "class", button0_class_value);
  			}

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
  				if_block3 = if_blocks[current_block_type_index];

  				if (!if_block3) {
  					if_block3 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  					if_block3.c();
  				} else {
  					if_block3.p(ctx, dirty);
  				}

  				transition_in(if_block3, 1);
  				if_block3.m(button1, null);
  			}

  			if (!current || dirty[0] & /*isSend, isLegal*/ 384 && button1_disabled_value !== (button1_disabled_value = /*isSend*/ ctx[7] || !/*isLegal*/ ctx[8])) {
  				prop_dev(button1, "disabled", button1_disabled_value);
  			}

  			if (/*isPreview*/ ctx[6]) {
  				if (if_block4) {
  					if_block4.p(ctx, dirty);
  				} else {
  					if_block4 = create_if_block_2$3(ctx);
  					if_block4.c();
  					if_block4.m(div5, t8);
  				}
  			} else if (if_block4) {
  				if_block4.d(1);
  				if_block4 = null;
  			}

  			if (/*isEmot*/ ctx[2]) {
  				if (if_block5) {
  					if_block5.p(ctx, dirty);
  				} else {
  					if_block5 = create_if_block$3(ctx);
  					if_block5.c();
  					if_block5.m(div5, null);
  				}
  			} else if (if_block5) {
  				if_block5.d(1);
  				if_block5 = null;
  			}
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(emotion.$$.fragment, local);
  			transition_in(if_block1);
  			transition_in(if_block3);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(emotion.$$.fragment, local);
  			transition_out(if_block1);
  			transition_out(if_block3);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div5);
  			destroy_each(each_blocks, detaching);
  			/*textarea_binding*/ ctx[25](null);
  			if (if_block0) if_block0.d();
  			destroy_component(emotion);
  			if (if_block1) if_block1.d();
  			if (if_block2) if_block2.d();
  			if_blocks[current_block_type_index].d();
  			if (if_block4) if_block4.d();
  			if (if_block5) if_block5.d();
  			mounted = false;
  			run_all(dispose);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment$4.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  const textStr = 'text';
  const nickStr = 'nick';
  const mailStr = 'mail';
  const siteStr = 'site';
  const contentStr = 'content';
  const mailReg = /^\w+([-.]\w+)*@\w+([-.]\w+)*(\.[a-z]{2,5})+$/;

  function isUrl(str) {
  	try {
  		const url = new URL(str);

  		if ((/^https?:\/\//).test(str) && (/([A-Za-z\d]{1,30}\.)+[A-Za-z\d]{2,5}$/).test(url.hostname)) {
  			return true;
  		}
  	} catch(error) {
  		
  	} // eslint-disable-next-line no-empty

  	return false;
  }

  function instance$4($$self, $$props, $$invalidate) {
  	let $msg;
  	let $lazy;
  	let $options;
  	validate_store(msg, 'msg');
  	component_subscribe($$self, msg, $$value => $$invalidate(33, $msg = $$value));
  	validate_store(lazy, 'lazy');
  	component_subscribe($$self, lazy, $$value => $$invalidate(34, $lazy = $$value));
  	validate_store(options, 'options');
  	component_subscribe($$self, options, $$value => $$invalidate(35, $options = $$value));
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots('Submit', slots, []);
  	let D = $options;
  	const dispatch = createEventDispatcher();
  	let { cancel = false, pid = '', rid = '', wordLimit = { nick: 0, mail: 0, site: 0, content: 0 } } = $$props;

  	// svelte变量
  	let storage = localStorage.discuss;

  	let isEmot = false;
  	let emotIndex = 0;
  	let emotMaps = {};
  	let emotAll = {};
  	let textareaDOM;
  	let isPreview = false;
  	let isSend = false;
  	let isLegal = false;

  	const inputs = [
  		{
  			key: nickStr,
  			locale: translate(nickStr),
  			type: textStr
  		},
  		{
  			key: mailStr,
  			locale: translate(mailStr),
  			type: 'e' + mailStr
  		},
  		{
  			key: siteStr,
  			locale: translate(siteStr),
  			type: textStr
  		}
  	];

  	let metas = {
  		nick: { value: '', is: false },
  		mail: { value: '', is: false },
  		site: { value: '', is: true },
  		content: { value: '', is: false }
  	};

  	let contentHTML = '';
  	let wordLimitContent = wordLimit.content;
  	let limitContentLen;

  	onMount(() => {
  		initInfo();
  		getEmot();
  		onInput();
  	});

  	afterUpdate(() => {
  		metasChange();
  		$lazy();
  	});

  	function initInfo() {
  		try {
  			storage = JSON.parse(storage) || {};

  			for (const [k, v] of Object.entries(storage)) {
  				$$invalidate(9, metas[k].value = v || '', metas);
  			}
  		} catch(error) {
  			storage = {};
  		}
  	}

  	async function getEmot() {
  		const emot = D.emotMaps;

  		if ((/\.json$/).test(emot)) {
  			$$invalidate(4, emotMaps = await request({ url: emot, method: 'GET' }));
  		} else if (!emot) {
  			$$invalidate(4, emotMaps = emotFn(D.emotCDN));
  		} else {
  			$$invalidate(4, emotMaps = emot);
  		}

  		getEmotAll();
  	}

  	function getEmotAll() {
  		try {
  			for (const e in emotMaps) {
  				const type = emotMaps[e].type;
  				if (type === textStr) continue;
  				const items = emotMaps[e].items;
  				emotAll = { ...emotAll, ...items };
  			}
  		} catch(error) {
  			// eslint-disable-next-line no-console
  			console.log(error);
  		}
  	}

  	function parseEmot() {
  		let content = metas.content.value;
  		const emots = [];

  		content.replace(/\[(.*?)\]/g, ($0, $1) => {
  			emots.push($1);
  		});

  		for (const emot of emots) {
  			const link = emotAll[emot];
  			if (!link) continue;
  			const img = `<img class='D-comment-emot' src='${link}' alt='${emot}'/>`;
  			content = content.replace(`[${emot}]`, img);
  		}

  		$$invalidate(1, contentHTML = content);
  	}

  	function saveInfo() {
  		for (const [k, v] of Object.entries(metas)) {
  			storage[k] = v.value.trim();
  		}

  		localStorage.discuss = JSON.stringify(storage);

  		// 重新解析表情
  		parseEmot();
  	}

  	function onPreview() {
  		$$invalidate(6, isPreview = !isPreview);
  	}

  	function onInput() {
  		saveInfo();
  		metasChange();
  	}

  	/**
   * @param {String} key 表情名(描述)
   * @param {String} value 表情值(内容或地址)
   * @param {String} type 表情类型(text or image)
   */
  	function onClickEmot(key, value, type) {
  		const content = metas.content.value;

  		// 获取输入框光标位置
  		let cursorStart = textareaDOM.selectionStart;

  		let cursorEnd = textareaDOM.selectionEnd;
  		const Start = content.substring(0, cursorStart);
  		const Ent = content.substring(cursorEnd);
  		let range;
  		textareaDOM.focus();

  		if (type === textStr) {
  			$$invalidate(9, metas.content.value = `${Start}${value}${Ent}`, metas);
  			range = (Start + value).length;
  		} else {
  			$$invalidate(9, metas.content.value = `${Start}[${key}]${Ent}`, metas);
  			range = (Start + key).length + 2;
  		}

  		// 重新保存
  		saveInfo();

  		tick().then(() => {
  			textareaDOM.setSelectionRange(range, range);
  		});
  	}

  	// eslint-disable-next-line max-statements
  	function metasChange() {
  		try {
  			const { nick, mail, site, content } = metas;
  			const { nick: nickWord, mail: mailWord, site: siteWord, content: contentWord } = wordLimit;
  			const nickLen = nick.value.length;
  			const mailLen = mail.value.length;
  			const siteLen = site.value.length;

  			// 昵称
  			if (nickWord === 0 && nickLen > 1 || nickLen > 1 && nickLen <= nickWord) {
  				nick.is = true;
  			} else {
  				nick.is = false;
  			}

  			// 邮箱
  			if (mailWord === 0 && mailReg.test(mail.value) || mailLen <= mailWord && mailReg.test(mail.value)) {
  				mail.is = true;
  			} else {
  				mail.is = false;
  			}

  			// 网站
  			if (siteLen === 0 && siteWord === 0 || isUrl(site.value) && (siteLen <= siteWord || siteWord === 0)) {
  				if (siteLen) site.value = new URL(site.value).origin;
  				site.is = true;
  			} else {
  				site.is = false;
  			}

  			// 内容
  			const dom = new DOMParser().parseFromString(contentHTML, 'text/html');

  			const textContent = dom.body.textContent.length + dom.querySelectorAll('img').length;

  			if (contentWord === 0 && textContent > 1 || textContent > 1 && textContent <= contentWord) {
  				content.is = true;
  			} else {
  				content.is = false;
  			}

  			$$invalidate(9, metas);
  			$$invalidate(8, isLegal = nick.is && mail.is && site.is && content.is);
  		} catch(error) {
  			// eslint-disable-next-line no-console
  			console.error(error);
  		}
  	}

  	// eslint-disable-next-line max-statements
  	async function onSend() {
  		try {
  			if (!isSend && !isLegal) return;

  			const comment = {
  				type: 'COMMIT_COMMENT',
  				nick: metas.nick.value,
  				mail: metas.mail.value,
  				site: metas.site.value,
  				content: contentHTML,
  				path: D.path,
  				pid,
  				rid
  			};

  			$$invalidate(7, isSend = true);
  			const token = localStorage.DToken;
  			if (token) comment.token = token;
  			const result = await request({ url: D.serverURLs, data: comment });

  			if (!result.data && result.msg.includes('login')) {
  				$msg({
  					type: 'error',
  					text: translate('pleaseLogin')
  				});
  			}

  			if (Array.isArray(result.data)) {
  				if (!result.data.length) $msg({
  					type: 'success',
  					duration: 5000,
  					text: translate('commentsAudit')
  				});

  				dispatch('submitComment', { comment: result.data, pid });
  				$$invalidate(9, metas.content.value = '', metas);
  				saveInfo();
  				$$invalidate(6, isPreview = false);
  			}
  		} catch(error) {
  			// eslint-disable-next-line no-console
  			console.error('Comment failure:', error);

  			$msg({
  				type: 'error',
  				text: translate('sendError')
  			});
  		} finally {
  			$$invalidate(7, isSend = false);
  		}
  	}

  	const writable_props = ['cancel', 'pid', 'rid', 'wordLimit'];

  	Object_1$1.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Submit> was created with unknown prop '${key}'`);
  	});

  	function input_input_handler(i) {
  		metas[i.key].value = this.value;
  		$$invalidate(9, metas);
  	}

  	const input_handler = (i, e) => e.target.type = i.type;

  	function textarea_input_handler() {
  		metas.content.value = this.value;
  		$$invalidate(9, metas);
  	}

  	function textarea_binding($$value) {
  		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
  			textareaDOM = $$value;
  			$$invalidate(5, textareaDOM);
  		});
  	}

  	const click_handler = () => $$invalidate(2, isEmot = !isEmot);
  	const click_handler_1 = () => dispatch('onSetting');
  	const click_handler_2 = () => dispatch('onRefresh');
  	const click_handler_3 = () => dispatch('onCancel', true);
  	const click_handler_4 = index => $$invalidate(3, emotIndex = index);

  	$$self.$$set = $$props => {
  		if ('cancel' in $$props) $$invalidate(0, cancel = $$props.cancel);
  		if ('pid' in $$props) $$invalidate(19, pid = $$props.pid);
  		if ('rid' in $$props) $$invalidate(20, rid = $$props.rid);
  		if ('wordLimit' in $$props) $$invalidate(21, wordLimit = $$props.wordLimit);
  	};

  	$$self.$capture_state = () => ({
  		onMount,
  		afterUpdate,
  		createEventDispatcher,
  		tick,
  		options,
  		msg,
  		lazy,
  		request,
  		emotFn,
  		Emotion: Emotion_svg_rollup_plugin,
  		Loading: Loading_svg_rollup_plugin,
  		Setting: Setting_svg_rollup_plugin,
  		Refresh: Refresh_svg_rollup_plugin,
  		translate,
  		D,
  		dispatch,
  		cancel,
  		pid,
  		rid,
  		wordLimit,
  		textStr,
  		nickStr,
  		mailStr,
  		siteStr,
  		contentStr,
  		mailReg,
  		isUrl,
  		storage,
  		isEmot,
  		emotIndex,
  		emotMaps,
  		emotAll,
  		textareaDOM,
  		isPreview,
  		isSend,
  		isLegal,
  		inputs,
  		metas,
  		contentHTML,
  		wordLimitContent,
  		limitContentLen,
  		initInfo,
  		getEmot,
  		getEmotAll,
  		parseEmot,
  		saveInfo,
  		onPreview,
  		onInput,
  		onClickEmot,
  		metasChange,
  		onSend,
  		$msg,
  		$lazy,
  		$options
  	});

  	$$self.$inject_state = $$props => {
  		if ('D' in $$props) $$invalidate(12, D = $$props.D);
  		if ('cancel' in $$props) $$invalidate(0, cancel = $$props.cancel);
  		if ('pid' in $$props) $$invalidate(19, pid = $$props.pid);
  		if ('rid' in $$props) $$invalidate(20, rid = $$props.rid);
  		if ('wordLimit' in $$props) $$invalidate(21, wordLimit = $$props.wordLimit);
  		if ('storage' in $$props) storage = $$props.storage;
  		if ('isEmot' in $$props) $$invalidate(2, isEmot = $$props.isEmot);
  		if ('emotIndex' in $$props) $$invalidate(3, emotIndex = $$props.emotIndex);
  		if ('emotMaps' in $$props) $$invalidate(4, emotMaps = $$props.emotMaps);
  		if ('emotAll' in $$props) emotAll = $$props.emotAll;
  		if ('textareaDOM' in $$props) $$invalidate(5, textareaDOM = $$props.textareaDOM);
  		if ('isPreview' in $$props) $$invalidate(6, isPreview = $$props.isPreview);
  		if ('isSend' in $$props) $$invalidate(7, isSend = $$props.isSend);
  		if ('isLegal' in $$props) $$invalidate(8, isLegal = $$props.isLegal);
  		if ('metas' in $$props) $$invalidate(9, metas = $$props.metas);
  		if ('contentHTML' in $$props) $$invalidate(1, contentHTML = $$props.contentHTML);
  		if ('wordLimitContent' in $$props) $$invalidate(10, wordLimitContent = $$props.wordLimitContent);
  		if ('limitContentLen' in $$props) $$invalidate(11, limitContentLen = $$props.limitContentLen);
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$self.$$.update = () => {
  		if ($$self.$$.dirty[0] & /*wordLimit, contentHTML*/ 2097154) {
  			{
  				$$invalidate(10, wordLimitContent = wordLimit.content);
  				const dom = new DOMParser().parseFromString(contentHTML, 'text/html');
  				$$invalidate(11, limitContentLen = dom.body.textContent.length + dom.body.querySelectorAll('img').length);
  			}
  		}
  	};

  	return [
  		cancel,
  		contentHTML,
  		isEmot,
  		emotIndex,
  		emotMaps,
  		textareaDOM,
  		isPreview,
  		isSend,
  		isLegal,
  		metas,
  		wordLimitContent,
  		limitContentLen,
  		D,
  		dispatch,
  		inputs,
  		onPreview,
  		onInput,
  		onClickEmot,
  		onSend,
  		pid,
  		rid,
  		wordLimit,
  		input_input_handler,
  		input_handler,
  		textarea_input_handler,
  		textarea_binding,
  		click_handler,
  		click_handler_1,
  		click_handler_2,
  		click_handler_3,
  		click_handler_4
  	];
  }

  class Submit extends SvelteComponentDev {
  	constructor(options) {
  		super(options);

  		init$1(
  			this,
  			options,
  			instance$4,
  			create_fragment$4,
  			safe_not_equal,
  			{
  				cancel: 0,
  				pid: 19,
  				rid: 20,
  				wordLimit: 21
  			},
  			add_css$3,
  			[-1, -1]
  		);

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "Submit",
  			options,
  			id: create_fragment$4.name
  		});
  	}

  	get cancel() {
  		throw new Error("<Submit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set cancel(value) {
  		throw new Error("<Submit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	get pid() {
  		throw new Error("<Submit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set pid(value) {
  		throw new Error("<Submit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	get rid() {
  		throw new Error("<Submit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set rid(value) {
  		throw new Error("<Submit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	get wordLimit() {
  		throw new Error("<Submit>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set wordLimit(value) {
  		throw new Error("<Submit>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}
  }

  // padStart 如果长度达不到指定长度(2)使用指定字符(0)填充到内容前面(padEnd填充到后面)
  // 日期格式化
  function Format(timestamp) {
    const time = new Date(timestamp);
    const year = time.getFullYear();
    const month = (time.getMonth() + 1).toString().padStart(2, 0);
    const date = time.getDate().toString().padStart(2, 0);
    return `${year}-${month}-${date}`
  }

  function timeAgo(timestamp) {
    const diffValue = Date.now() - timestamp;

    const minute = 1000 * 60; // 60000ms
    const hour = minute * 60; // 3600000ms
    const day = hour * 24; // 86400000ms

    const intDay = parseInt(diffValue / day);
    const intHour = parseInt(diffValue / hour);
    const intMinute = parseInt(diffValue / minute);

    const { now, minutes, hours, days } = translate('timeAgo');

    if (intMinute === 0) return now
    else if (intMinute < 64) return intMinute + minutes
    else if (intHour < 24) return intHour + hours
    else if (intDay < 7) return intDay + days
    else return Format(timestamp)
  }

  /* src\client\view\comment.svelte generated by Svelte v3.52.0 */
  const file$3 = "src\\client\\view\\comment.svelte";

  function add_css$2(target) {
  	append_styles(target, "svelte-73dzgt", ".D-comments-count span.svelte-73dzgt.svelte-73dzgt{margin-right:4px;font-size:22px;font-weight:bold}.D-comments.svelte-73dzgt.svelte-73dzgt{margin-top:20px;position:relative;padding:15px;border-radius:10px;border:solid 1px var(--D-Low-Color)}.D-comments.svelte-73dzgt.svelte-73dzgt:hover{border-color:rgba(144, 147, 153, 0.7);transition:all 0.8s}.D-comments.svelte-73dzgt:hover>.D-reply.svelte-73dzgt{opacity:1}.D-comment.svelte-73dzgt.svelte-73dzgt{display:flex}.D-comments-child .D-comments.svelte-73dzgt.svelte-73dzgt{margin:0;border:0;border-radius:0;margin-left:40px;padding-top:15px;border-top:dashed 1px var(--D-Low-Color)}.D-comments-child .D-avatar.svelte-73dzgt.svelte-73dzgt{width:32px;height:32px}.D-comments-child .D-reply.svelte-73dzgt.svelte-73dzgt{right:0}.D-comments-child-more.svelte-73dzgt.svelte-73dzgt{cursor:pointer;color:#818181;margin-left:40px;padding-left:30px;font-size:12px;position:relative}.D-comments-child-more.svelte-73dzgt.svelte-73dzgt::after{content:\"\";top:50%;left:0;width:26px;height:1px;position:absolute;background:rgba(129, 129, 129, 0.5)}.D-comments-child-more.svelte-73dzgt svg.svelte-73dzgt{width:13px;height:13px;fill:currentColor;vertical-align:middle}.D-headers.svelte-73dzgt.svelte-73dzgt{display:flex;align-items:center}.D-heads.svelte-73dzgt.svelte-73dzgt{display:flex;flex-direction:column}.D-avatar.svelte-73dzgt.svelte-73dzgt{width:40px;height:40px;margin-right:10px;border-radius:50%}.D-nick.svelte-73dzgt.svelte-73dzgt{color:inherit;font-weight:600;text-decoration:none}.D-tag.svelte-73dzgt.svelte-73dzgt{padding:2px 4px;color:#fff;margin-left:5px;font-size:12px;border-radius:3px}.D-master.svelte-73dzgt.svelte-73dzgt{background:#ffa51e}.D-stick.svelte-73dzgt.svelte-73dzgt{background:var(--D-stick-Color)}time.D-time.svelte-73dzgt.svelte-73dzgt{color:#bbb;font-size:0.75rem}.D-content.svelte-73dzgt.svelte-73dzgt{margin:10px 0;font-size:0.9rem;white-space:pre-wrap;word-break:break-all}.D-content.svelte-73dzgt p{display:inline}.D-content.svelte-73dzgt img{width:100%}.D-reply.svelte-73dzgt.svelte-73dzgt{position:absolute;opacity:0;right:15px;top:15px;padding:6px 10px;color:#fff;font-size:13px;text-align:center;cursor:pointer;background-color:var(--D-main-Color);border:none;border-radius:8px;transition:all 0.3s ease-out}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5zdmVsdGUiLCJtYXBwaW5ncyI6IkFBOEhrQixpQkFBQSxBQUFBLENBQUEsSUFBQSw0QkFBQSxDQUFBLHVyRUFrSmxCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbImNvbW1lbnQuc3ZlbHRlIl19 */");
  }

  function get_each_context(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[13] = list[i];
  	child_ctx[14] = list;
  	child_ctx[15] = i;
  	return child_ctx;
  }

  // (61:14) {:else}
  function create_else_block$1(ctx) {
  	let span;
  	let t_value = /*comment*/ ctx[13].nick + "";
  	let t;

  	const block = {
  		c: function create() {
  			span = element("span");
  			t = text(t_value);
  			attr_dev(span, "class", "D-nick svelte-73dzgt");
  			add_location(span, file$3, 61, 16, 1569);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, span, anchor);
  			append_dev(span, t);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty & /*comments*/ 1 && t_value !== (t_value = /*comment*/ ctx[13].nick + "")) set_data_dev(t, t_value);
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(span);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_else_block$1.name,
  		type: "else",
  		source: "(61:14) {:else}",
  		ctx
  	});

  	return block;
  }

  // (58:14) {#if comment.site}
  function create_if_block_6(ctx) {
  	let a;
  	let t_value = /*comment*/ ctx[13].nick + "";
  	let t;
  	let a_href_value;

  	const block = {
  		c: function create() {
  			a = element("a");
  			t = text(t_value);
  			attr_dev(a, "class", "D-nick svelte-73dzgt");
  			attr_dev(a, "href", a_href_value = /*comment*/ ctx[13].site);
  			attr_dev(a, "target", "_blank");
  			add_location(a, file$3, 59, 16, 1458);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, a, anchor);
  			append_dev(a, t);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty & /*comments*/ 1 && t_value !== (t_value = /*comment*/ ctx[13].nick + "")) set_data_dev(t, t_value);

  			if (dirty & /*comments*/ 1 && a_href_value !== (a_href_value = /*comment*/ ctx[13].site)) {
  				attr_dev(a, "href", a_href_value);
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(a);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_6.name,
  		type: "if",
  		source: "(58:14) {#if comment.site}",
  		ctx
  	});

  	return block;
  }

  // (64:14) {#if comment.master}
  function create_if_block_5(ctx) {
  	let span;

  	const block = {
  		c: function create() {
  			span = element("span");
  			span.textContent = `${/*D*/ ctx[5].master}`;
  			attr_dev(span, "class", "D-master D-tag svelte-73dzgt");
  			add_location(span, file$3, 64, 16, 1683);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, span, anchor);
  		},
  		p: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(span);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_5.name,
  		type: "if",
  		source: "(64:14) {#if comment.master}",
  		ctx
  	});

  	return block;
  }

  // (67:14) {#if comment.stick}
  function create_if_block_4(ctx) {
  	let span;

  	const block = {
  		c: function create() {
  			span = element("span");
  			span.textContent = `${/*D*/ ctx[5].stick}`;
  			attr_dev(span, "class", "D-stick D-tag svelte-73dzgt");
  			add_location(span, file$3, 67, 16, 1800);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, span, anchor);
  		},
  		p: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(span);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_4.name,
  		type: "if",
  		source: "(67:14) {#if comment.stick}",
  		ctx
  	});

  	return block;
  }

  // (75:10) {#if comment.pid}
  function create_if_block_3(ctx) {
  	let a;
  	let strong;
  	let t0;
  	let t1_value = /*comment*/ ctx[13].rnick + "";
  	let t1;
  	let t2;
  	let a_href_value;
  	let t3;

  	const block = {
  		c: function create() {
  			a = element("a");
  			strong = element("strong");
  			t0 = text("@");
  			t1 = text(t1_value);
  			t2 = text(":");
  			t3 = space();
  			add_location(strong, file$3, 75, 37, 2077);
  			attr_dev(a, "href", a_href_value = "#" + /*comment*/ ctx[13].pid);
  			add_location(a, file$3, 75, 12, 2052);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, a, anchor);
  			append_dev(a, strong);
  			append_dev(strong, t0);
  			append_dev(strong, t1);
  			append_dev(strong, t2);
  			insert_dev(target, t3, anchor);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty & /*comments*/ 1 && t1_value !== (t1_value = /*comment*/ ctx[13].rnick + "")) set_data_dev(t1, t1_value);

  			if (dirty & /*comments*/ 1 && a_href_value !== (a_href_value = "#" + /*comment*/ ctx[13].pid)) {
  				attr_dev(a, "href", a_href_value);
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(a);
  			if (detaching) detach_dev(t3);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_3.name,
  		type: "if",
  		source: "(75:10) {#if comment.pid}",
  		ctx
  	});

  	return block;
  }

  // (86:4) {#if replying === comment.id}
  function create_if_block_2$2(ctx) {
  	let submit;
  	let current;

  	submit = new Submit({
  			props: {
  				cancel: true,
  				pid: /*pid*/ ctx[3],
  				rid: /*rid*/ ctx[4],
  				wordLimit: /*wordLimit*/ ctx[2]
  			},
  			$$inline: true
  		});

  	submit.$on("onCancel", /*onReply*/ ctx[6]);
  	submit.$on("submitComment", /*submitComment*/ ctx[7]);

  	const block = {
  		c: function create() {
  			create_component(submit.$$.fragment);
  		},
  		m: function mount(target, anchor) {
  			mount_component(submit, target, anchor);
  			current = true;
  		},
  		p: function update(ctx, dirty) {
  			const submit_changes = {};
  			if (dirty & /*pid*/ 8) submit_changes.pid = /*pid*/ ctx[3];
  			if (dirty & /*rid*/ 16) submit_changes.rid = /*rid*/ ctx[4];
  			if (dirty & /*wordLimit*/ 4) submit_changes.wordLimit = /*wordLimit*/ ctx[2];
  			submit.$set(submit_changes);
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(submit.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(submit.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			destroy_component(submit, detaching);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_2$2.name,
  		type: "if",
  		source: "(86:4) {#if replying === comment.id}",
  		ctx
  	});

  	return block;
  }

  // (89:4) {#if comment.replys && comment.replys.length}
  function create_if_block$2(ctx) {
  	let div;
  	let comment;
  	let t;
  	let current;

  	comment = new Comment({
  			props: {
  				comments: /*comment*/ ctx[13].isMore
  				? /*comment*/ ctx[13].replys
  				: /*comment*/ ctx[13].replys.slice(0, 3),
  				replying: /*replying*/ ctx[1],
  				wordLimit: /*wordLimit*/ ctx[2]
  			},
  			$$inline: true
  		});

  	comment.$on("onReply", /*onReply_handler*/ ctx[8]);
  	comment.$on("submitComment", /*submitComment*/ ctx[7]);
  	let if_block = !/*comment*/ ctx[13].isMore && /*comment*/ ctx[13].replys.length > 3 && create_if_block_1$2(ctx);

  	const block = {
  		c: function create() {
  			div = element("div");
  			create_component(comment.$$.fragment);
  			t = space();
  			if (if_block) if_block.c();
  			attr_dev(div, "class", "D-comments-child");
  			add_location(div, file$3, 89, 6, 2731);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div, anchor);
  			mount_component(comment, div, null);
  			append_dev(div, t);
  			if (if_block) if_block.m(div, null);
  			current = true;
  		},
  		p: function update(ctx, dirty) {
  			const comment_changes = {};

  			if (dirty & /*comments*/ 1) comment_changes.comments = /*comment*/ ctx[13].isMore
  			? /*comment*/ ctx[13].replys
  			: /*comment*/ ctx[13].replys.slice(0, 3);

  			if (dirty & /*replying*/ 2) comment_changes.replying = /*replying*/ ctx[1];
  			if (dirty & /*wordLimit*/ 4) comment_changes.wordLimit = /*wordLimit*/ ctx[2];
  			comment.$set(comment_changes);

  			if (!/*comment*/ ctx[13].isMore && /*comment*/ ctx[13].replys.length > 3) {
  				if (if_block) {
  					if_block.p(ctx, dirty);
  				} else {
  					if_block = create_if_block_1$2(ctx);
  					if_block.c();
  					if_block.m(div, null);
  				}
  			} else if (if_block) {
  				if_block.d(1);
  				if_block = null;
  			}
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(comment.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(comment.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div);
  			destroy_component(comment);
  			if (if_block) if_block.d();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block$2.name,
  		type: "if",
  		source: "(89:4) {#if comment.replys && comment.replys.length}",
  		ctx
  	});

  	return block;
  }

  // (106:8) {#if !comment.isMore && comment.replys.length > 3}
  function create_if_block_1$2(ctx) {
  	let div;
  	let t0_value = translate('moreCommentsChild').replace('$counter', /*comment*/ ctx[13].replys.length - 3) + "";
  	let t0;
  	let t1;
  	let svg;
  	let path;
  	let mounted;
  	let dispose;

  	function click_handler() {
  		return /*click_handler*/ ctx[9](/*comment*/ ctx[13], /*each_value*/ ctx[14], /*comment_index*/ ctx[15]);
  	}

  	const block = {
  		c: function create() {
  			div = element("div");
  			t0 = text(t0_value);
  			t1 = space();
  			svg = svg_element("svg");
  			path = svg_element("path");
  			attr_dev(path, "d", "M10.291 4.163a.466.466 0 00-.707 0L6.437 7.659 3.291 4.163a.465.465 0 00-.707 0 .6.6 0 000 .785l3.5 3.89c.094.103.22.162.353.162.133 0 .26-.059.354-.163l3.5-3.889a.6.6 0 000-.785z");
  			add_location(path, file$3, 115, 15, 3762);
  			attr_dev(svg, "viewBox", "0 0 13 13");
  			attr_dev(svg, "class", "svelte-73dzgt");
  			add_location(svg, file$3, 114, 12, 3722);
  			attr_dev(div, "class", "D-comments-child-more svelte-73dzgt");
  			add_location(div, file$3, 107, 10, 3478);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div, anchor);
  			append_dev(div, t0);
  			append_dev(div, t1);
  			append_dev(div, svg);
  			append_dev(svg, path);

  			if (!mounted) {
  				dispose = listen_dev(div, "click", click_handler, false, false, false);
  				mounted = true;
  			}
  		},
  		p: function update(new_ctx, dirty) {
  			ctx = new_ctx;
  			if (dirty & /*comments*/ 1 && t0_value !== (t0_value = translate('moreCommentsChild').replace('$counter', /*comment*/ ctx[13].replys.length - 3) + "")) set_data_dev(t0, t0_value);
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div);
  			mounted = false;
  			dispose();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_1$2.name,
  		type: "if",
  		source: "(106:8) {#if !comment.isMore && comment.replys.length > 3}",
  		ctx
  	});

  	return block;
  }

  // (50:0) {#each comments as comment}
  function create_each_block(ctx) {
  	let div6;
  	let div5;
  	let img;
  	let img_src_value;
  	let img_d_src_value;
  	let img_alt_value;
  	let t0;
  	let div4;
  	let div2;
  	let div1;
  	let div0;
  	let t1;
  	let t2;
  	let t3;
  	let time;
  	let t4_value = timeAgo(/*comment*/ ctx[13].time) + "";
  	let t4;
  	let t5;
  	let div3;
  	let span;
  	let raw_value = /*comment*/ ctx[13].content + "";
  	let t6;
  	let button;
  	let t8;
  	let t9;
  	let t10;
  	let div6_id_value;
  	let current;
  	let mounted;
  	let dispose;

  	function select_block_type(ctx, dirty) {
  		if (/*comment*/ ctx[13].site) return create_if_block_6;
  		return create_else_block$1;
  	}

  	let current_block_type = select_block_type(ctx);
  	let if_block0 = current_block_type(ctx);
  	let if_block1 = /*comment*/ ctx[13].master && create_if_block_5(ctx);
  	let if_block2 = /*comment*/ ctx[13].stick && create_if_block_4(ctx);
  	let if_block3 = /*comment*/ ctx[13].pid && create_if_block_3(ctx);
  	let if_block4 = /*replying*/ ctx[1] === /*comment*/ ctx[13].id && create_if_block_2$2(ctx);
  	let if_block5 = /*comment*/ ctx[13].replys && /*comment*/ ctx[13].replys.length && create_if_block$2(ctx);

  	const block = {
  		c: function create() {
  			div6 = element("div");
  			div5 = element("div");
  			img = element("img");
  			t0 = space();
  			div4 = element("div");
  			div2 = element("div");
  			div1 = element("div");
  			div0 = element("div");
  			if_block0.c();
  			t1 = space();
  			if (if_block1) if_block1.c();
  			t2 = space();
  			if (if_block2) if_block2.c();
  			t3 = space();
  			time = element("time");
  			t4 = text(t4_value);
  			t5 = space();
  			div3 = element("div");
  			if (if_block3) if_block3.c();
  			span = element("span");
  			t6 = space();
  			button = element("button");
  			button.textContent = `${translate('reply')}`;
  			t8 = space();
  			if (if_block4) if_block4.c();
  			t9 = space();
  			if (if_block5) if_block5.c();
  			t10 = space();
  			attr_dev(img, "class", "D-avatar svelte-73dzgt");
  			if (!src_url_equal(img.src, img_src_value = /*D*/ ctx[5].imgLoading)) attr_dev(img, "src", img_src_value);
  			attr_dev(img, "d-src", img_d_src_value = /*comment*/ ctx[13].avatar);
  			attr_dev(img, "alt", img_alt_value = /*comment*/ ctx[13].nick);
  			add_location(img, file$3, 52, 6, 1121);
  			attr_dev(div0, "class", "D-head");
  			add_location(div0, file$3, 56, 12, 1318);
  			attr_dev(time, "class", "D-time svelte-73dzgt");
  			add_location(time, file$3, 70, 12, 1896);
  			attr_dev(div1, "class", "D-heads svelte-73dzgt");
  			add_location(div1, file$3, 55, 10, 1284);
  			attr_dev(div2, "class", "D-headers svelte-73dzgt");
  			add_location(div2, file$3, 54, 8, 1250);
  			attr_dev(span, "class", "svelte-73dzgt");
  			add_location(span, file$3, 76, 15, 2132);
  			attr_dev(div3, "class", "D-content svelte-73dzgt");
  			add_location(div3, file$3, 73, 8, 1988);
  			attr_dev(div4, "class", "D-comment-main");
  			add_location(div4, file$3, 53, 6, 1213);
  			attr_dev(div5, "class", "D-comment svelte-73dzgt");
  			add_location(div5, file$3, 51, 4, 1091);
  			attr_dev(button, "class", "D-reply svelte-73dzgt");
  			add_location(button, file$3, 84, 4, 2423);
  			attr_dev(div6, "class", "D-comments svelte-73dzgt");
  			attr_dev(div6, "id", div6_id_value = /*comment*/ ctx[13].id);
  			add_location(div6, file$3, 50, 2, 1046);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div6, anchor);
  			append_dev(div6, div5);
  			append_dev(div5, img);
  			append_dev(div5, t0);
  			append_dev(div5, div4);
  			append_dev(div4, div2);
  			append_dev(div2, div1);
  			append_dev(div1, div0);
  			if_block0.m(div0, null);
  			append_dev(div0, t1);
  			if (if_block1) if_block1.m(div0, null);
  			append_dev(div0, t2);
  			if (if_block2) if_block2.m(div0, null);
  			append_dev(div1, t3);
  			append_dev(div1, time);
  			append_dev(time, t4);
  			append_dev(div4, t5);
  			append_dev(div4, div3);
  			if (if_block3) if_block3.m(div3, null);
  			append_dev(div3, span);
  			span.innerHTML = raw_value;
  			append_dev(div6, t6);
  			append_dev(div6, button);
  			append_dev(div6, t8);
  			if (if_block4) if_block4.m(div6, null);
  			append_dev(div6, t9);
  			if (if_block5) if_block5.m(div6, null);
  			append_dev(div6, t10);
  			current = true;

  			if (!mounted) {
  				dispose = listen_dev(
  					button,
  					"click",
  					function () {
  						if (is_function(/*onReply*/ ctx[6](/*comment*/ ctx[13].id, /*comment*/ ctx[13].pid))) /*onReply*/ ctx[6](/*comment*/ ctx[13].id, /*comment*/ ctx[13].pid).apply(this, arguments);
  					},
  					false,
  					false,
  					false
  				);

  				mounted = true;
  			}
  		},
  		p: function update(new_ctx, dirty) {
  			ctx = new_ctx;

  			if (!current || dirty & /*comments*/ 1 && img_d_src_value !== (img_d_src_value = /*comment*/ ctx[13].avatar)) {
  				attr_dev(img, "d-src", img_d_src_value);
  			}

  			if (!current || dirty & /*comments*/ 1 && img_alt_value !== (img_alt_value = /*comment*/ ctx[13].nick)) {
  				attr_dev(img, "alt", img_alt_value);
  			}

  			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
  				if_block0.p(ctx, dirty);
  			} else {
  				if_block0.d(1);
  				if_block0 = current_block_type(ctx);

  				if (if_block0) {
  					if_block0.c();
  					if_block0.m(div0, t1);
  				}
  			}

  			if (/*comment*/ ctx[13].master) {
  				if (if_block1) {
  					if_block1.p(ctx, dirty);
  				} else {
  					if_block1 = create_if_block_5(ctx);
  					if_block1.c();
  					if_block1.m(div0, t2);
  				}
  			} else if (if_block1) {
  				if_block1.d(1);
  				if_block1 = null;
  			}

  			if (/*comment*/ ctx[13].stick) {
  				if (if_block2) {
  					if_block2.p(ctx, dirty);
  				} else {
  					if_block2 = create_if_block_4(ctx);
  					if_block2.c();
  					if_block2.m(div0, null);
  				}
  			} else if (if_block2) {
  				if_block2.d(1);
  				if_block2 = null;
  			}

  			if ((!current || dirty & /*comments*/ 1) && t4_value !== (t4_value = timeAgo(/*comment*/ ctx[13].time) + "")) set_data_dev(t4, t4_value);

  			if (/*comment*/ ctx[13].pid) {
  				if (if_block3) {
  					if_block3.p(ctx, dirty);
  				} else {
  					if_block3 = create_if_block_3(ctx);
  					if_block3.c();
  					if_block3.m(div3, span);
  				}
  			} else if (if_block3) {
  				if_block3.d(1);
  				if_block3 = null;
  			}

  			if ((!current || dirty & /*comments*/ 1) && raw_value !== (raw_value = /*comment*/ ctx[13].content + "")) span.innerHTML = raw_value;
  			if (/*replying*/ ctx[1] === /*comment*/ ctx[13].id) {
  				if (if_block4) {
  					if_block4.p(ctx, dirty);

  					if (dirty & /*replying, comments*/ 3) {
  						transition_in(if_block4, 1);
  					}
  				} else {
  					if_block4 = create_if_block_2$2(ctx);
  					if_block4.c();
  					transition_in(if_block4, 1);
  					if_block4.m(div6, t9);
  				}
  			} else if (if_block4) {
  				group_outros();

  				transition_out(if_block4, 1, 1, () => {
  					if_block4 = null;
  				});

  				check_outros();
  			}

  			if (/*comment*/ ctx[13].replys && /*comment*/ ctx[13].replys.length) {
  				if (if_block5) {
  					if_block5.p(ctx, dirty);

  					if (dirty & /*comments*/ 1) {
  						transition_in(if_block5, 1);
  					}
  				} else {
  					if_block5 = create_if_block$2(ctx);
  					if_block5.c();
  					transition_in(if_block5, 1);
  					if_block5.m(div6, t10);
  				}
  			} else if (if_block5) {
  				group_outros();

  				transition_out(if_block5, 1, 1, () => {
  					if_block5 = null;
  				});

  				check_outros();
  			}

  			if (!current || dirty & /*comments*/ 1 && div6_id_value !== (div6_id_value = /*comment*/ ctx[13].id)) {
  				attr_dev(div6, "id", div6_id_value);
  			}
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(if_block4);
  			transition_in(if_block5);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(if_block4);
  			transition_out(if_block5);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div6);
  			if_block0.d();
  			if (if_block1) if_block1.d();
  			if (if_block2) if_block2.d();
  			if (if_block3) if_block3.d();
  			if (if_block4) if_block4.d();
  			if (if_block5) if_block5.d();
  			mounted = false;
  			dispose();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_each_block.name,
  		type: "each",
  		source: "(50:0) {#each comments as comment}",
  		ctx
  	});

  	return block;
  }

  function create_fragment$3(ctx) {
  	let each_1_anchor;
  	let current;
  	let each_value = /*comments*/ ctx[0];
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
  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			each_1_anchor = empty();
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(target, anchor);
  			}

  			insert_dev(target, each_1_anchor, anchor);
  			current = true;
  		},
  		p: function update(ctx, [dirty]) {
  			if (dirty & /*comments, translate, replying, wordLimit, submitComment, pid, rid, onReply, timeAgo, D*/ 255) {
  				each_value = /*comments*/ ctx[0];
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
  						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
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
  			destroy_each(each_blocks, detaching);
  			if (detaching) detach_dev(each_1_anchor);
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
  	let $lazy;
  	let $options;
  	validate_store(lazy, 'lazy');
  	component_subscribe($$self, lazy, $$value => $$invalidate(10, $lazy = $$value));
  	validate_store(options, 'options');
  	component_subscribe($$self, options, $$value => $$invalidate(11, $options = $$value));
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots('Comment', slots, []);
  	let { comments = [] } = $$props;
  	let { replying = [] } = $$props;
  	let { wordLimit = { nick: 0, mail: 0, site: 0, content: 0 } } = $$props;
  	let D = $options;
  	const dispatch = createEventDispatcher();

  	onMount(() => {
  		$lazy();
  	});

  	afterUpdate(() => {
  		$lazy();
  	});

  	// svelte 变量
  	let pid = '', rid = '';

  	// 参数说明，请看html回复按钮部分的注释
  	function onReply(id, pID) {
  		// 此处主要区分是(父)根评论还是子评论
  		$$invalidate(3, pid = pID || id);

  		$$invalidate(4, rid = id);

  		// 将id发送给父组件，由父组件统一修改，保证replying的唯一性
  		dispatch('onReply', id);
  	}

  	/**
   * 1. 当前组件的submit子组件发送评论后
   * 2. 接收并发送到comments.vue根组件统一处理，并渲染
   * 3. 再此递归自身将其发送到comments.vue根组件统一处理，并渲染
   */
  	function submitComment(event) {
  		const { comment, pid } = event.detail;
  		dispatch('submitComment', { comment, pid });
  	}

  	const writable_props = ['comments', 'replying', 'wordLimit'];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Comment> was created with unknown prop '${key}'`);
  	});

  	function onReply_handler(event) {
  		bubble.call(this, $$self, event);
  	}

  	const click_handler = (comment, each_value, comment_index) => {
  		$$invalidate(0, each_value[comment_index].isMore = true, comments);
  	};

  	$$self.$$set = $$props => {
  		if ('comments' in $$props) $$invalidate(0, comments = $$props.comments);
  		if ('replying' in $$props) $$invalidate(1, replying = $$props.replying);
  		if ('wordLimit' in $$props) $$invalidate(2, wordLimit = $$props.wordLimit);
  	};

  	$$self.$capture_state = () => ({
  		onMount,
  		afterUpdate,
  		createEventDispatcher,
  		Submit,
  		options,
  		lazy,
  		translate,
  		timeAgo,
  		comments,
  		replying,
  		wordLimit,
  		D,
  		dispatch,
  		pid,
  		rid,
  		onReply,
  		submitComment,
  		$lazy,
  		$options
  	});

  	$$self.$inject_state = $$props => {
  		if ('comments' in $$props) $$invalidate(0, comments = $$props.comments);
  		if ('replying' in $$props) $$invalidate(1, replying = $$props.replying);
  		if ('wordLimit' in $$props) $$invalidate(2, wordLimit = $$props.wordLimit);
  		if ('D' in $$props) $$invalidate(5, D = $$props.D);
  		if ('pid' in $$props) $$invalidate(3, pid = $$props.pid);
  		if ('rid' in $$props) $$invalidate(4, rid = $$props.rid);
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	return [
  		comments,
  		replying,
  		wordLimit,
  		pid,
  		rid,
  		D,
  		onReply,
  		submitComment,
  		onReply_handler,
  		click_handler
  	];
  }

  class Comment extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, { comments: 0, replying: 1, wordLimit: 2 }, add_css$2);

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "Comment",
  			options,
  			id: create_fragment$3.name
  		});
  	}

  	get comments() {
  		throw new Error("<Comment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set comments(value) {
  		throw new Error("<Comment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	get replying() {
  		throw new Error("<Comment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set replying(value) {
  		throw new Error("<Comment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	get wordLimit() {
  		throw new Error("<Comment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set wordLimit(value) {
  		throw new Error("<Comment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}
  }

  /* src\client\view\comments.svelte generated by Svelte v3.52.0 */

  const { Error: Error_1, console: console_1 } = globals;
  const file$2 = "src\\client\\view\\comments.svelte";

  function add_css$1(target) {
  	append_styles(target, "svelte-9s94zw", ".D-comments-headers.svelte-9s94zw{display:flex;justify-content:space-between}.D-more.svelte-9s94zw{display:flex;justify-content:center;margin:16px 0 10px}.D-more-button.svelte-9s94zw{opacity:0.8;width:auto;min-width:80px;height:36px;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:8px 16px;line-height:20px;font-weight:600;font-size:12px;border-radius:12px;background-color:var(--D-main-Color)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudHMuc3ZlbHRlIiwibWFwcGluZ3MiOiJBQXFIa0IsbUJBQUEsY0FBQSxDQUFBLDZaQTZCbEIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiY29tbWVudHMuc3ZlbHRlIl19 */");
  }

  // (92:4) {#if counts}
  function create_if_block_2$1(ctx) {
  	let div;
  	let t0;
  	let t1;
  	let t2_value = translate('comment') + "";
  	let t2;

  	const block = {
  		c: function create() {
  			div = element("div");
  			t0 = text(/*counts*/ ctx[2]);
  			t1 = space();
  			t2 = text(t2_value);
  			attr_dev(div, "class", "D-comments-count");
  			add_location(div, file$2, 92, 6, 2176);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div, anchor);
  			append_dev(div, t0);
  			append_dev(div, t1);
  			append_dev(div, t2);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty & /*counts*/ 4) set_data_dev(t0, /*counts*/ ctx[2]);
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_2$1.name,
  		type: "if",
  		source: "(92:4) {#if counts}",
  		ctx
  	});

  	return block;
  }

  // (105:2) {#if showMore}
  function create_if_block$1(ctx) {
  	let div;
  	let button;
  	let current_block_type_index;
  	let if_block;
  	let current;
  	let mounted;
  	let dispose;
  	const if_block_creators = [create_if_block_1$1, create_else_block];
  	const if_blocks = [];

  	function select_block_type(ctx, dirty) {
  		if (/*loading*/ ctx[4]) return 0;
  		return 1;
  	}

  	current_block_type_index = select_block_type(ctx);
  	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

  	const block = {
  		c: function create() {
  			div = element("div");
  			button = element("button");
  			if_block.c();
  			attr_dev(button, "class", "D-more-button svelte-9s94zw");
  			button.disabled = /*moerDisabled*/ ctx[1];
  			add_location(button, file$2, 106, 6, 2532);
  			attr_dev(div, "class", "D-more svelte-9s94zw");
  			add_location(div, file$2, 105, 4, 2504);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div, anchor);
  			append_dev(div, button);
  			if_blocks[current_block_type_index].m(button, null);
  			current = true;

  			if (!mounted) {
  				dispose = listen_dev(button, "click", /*onMoreComment*/ ctx[7], false, false, false);
  				mounted = true;
  			}
  		},
  		p: function update(ctx, dirty) {
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

  			if (!current || dirty & /*moerDisabled*/ 2) {
  				prop_dev(button, "disabled", /*moerDisabled*/ ctx[1]);
  			}
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(if_block);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(if_block);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div);
  			if_blocks[current_block_type_index].d();
  			mounted = false;
  			dispose();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block$1.name,
  		type: "if",
  		source: "(105:2) {#if showMore}",
  		ctx
  	});

  	return block;
  }

  // (110:8) {:else}
  function create_else_block(ctx) {
  	let t_value = translate('more') + "";
  	let t;

  	const block = {
  		c: function create() {
  			t = text(t_value);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, t, anchor);
  		},
  		p: noop,
  		i: noop,
  		o: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(t);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_else_block.name,
  		type: "else",
  		source: "(110:8) {:else}",
  		ctx
  	});

  	return block;
  }

  // (108:9) {#if loading}
  function create_if_block_1$1(ctx) {
  	let loading_1;
  	let current;
  	loading_1 = new Loading_svg_rollup_plugin({ $$inline: true });

  	const block = {
  		c: function create() {
  			create_component(loading_1.$$.fragment);
  		},
  		m: function mount(target, anchor) {
  			mount_component(loading_1, target, anchor);
  			current = true;
  		},
  		p: noop,
  		i: function intro(local) {
  			if (current) return;
  			transition_in(loading_1.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(loading_1.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			destroy_component(loading_1, detaching);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_1$1.name,
  		type: "if",
  		source: "(108:9) {#if loading}",
  		ctx
  	});

  	return block;
  }

  function create_fragment$2(ctx) {
  	let div2;
  	let div0;
  	let t0;
  	let div1;
  	let comment_1;
  	let t1;
  	let current;
  	let if_block0 = /*counts*/ ctx[2] && create_if_block_2$1(ctx);

  	comment_1 = new Comment({
  			props: {
  				comments: /*comments*/ ctx[0],
  				replying: /*replying*/ ctx[5],
  				wordLimit: /*wordLimit*/ ctx[6]
  			},
  			$$inline: true
  		});

  	comment_1.$on("onReply", /*onReply_handler*/ ctx[10]);
  	comment_1.$on("submitComment", /*submitComment*/ ctx[8]);
  	let if_block1 = /*showMore*/ ctx[3] && create_if_block$1(ctx);

  	const block = {
  		c: function create() {
  			div2 = element("div");
  			div0 = element("div");
  			if (if_block0) if_block0.c();
  			t0 = space();
  			div1 = element("div");
  			create_component(comment_1.$$.fragment);
  			t1 = space();
  			if (if_block1) if_block1.c();
  			attr_dev(div0, "class", "D-comments-headers svelte-9s94zw");
  			add_location(div0, file$2, 90, 2, 2118);
  			attr_dev(div1, "class", "D-comments-list");
  			add_location(div1, file$2, 95, 2, 2268);
  			attr_dev(div2, "class", "D-comments-wrap");
  			add_location(div2, file$2, 89, 0, 2085);
  		},
  		l: function claim(nodes) {
  			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div2, anchor);
  			append_dev(div2, div0);
  			if (if_block0) if_block0.m(div0, null);
  			append_dev(div2, t0);
  			append_dev(div2, div1);
  			mount_component(comment_1, div1, null);
  			append_dev(div2, t1);
  			if (if_block1) if_block1.m(div2, null);
  			current = true;
  		},
  		p: function update(ctx, [dirty]) {
  			if (/*counts*/ ctx[2]) {
  				if (if_block0) {
  					if_block0.p(ctx, dirty);
  				} else {
  					if_block0 = create_if_block_2$1(ctx);
  					if_block0.c();
  					if_block0.m(div0, null);
  				}
  			} else if (if_block0) {
  				if_block0.d(1);
  				if_block0 = null;
  			}

  			const comment_1_changes = {};
  			if (dirty & /*comments*/ 1) comment_1_changes.comments = /*comments*/ ctx[0];
  			if (dirty & /*replying*/ 32) comment_1_changes.replying = /*replying*/ ctx[5];
  			if (dirty & /*wordLimit*/ 64) comment_1_changes.wordLimit = /*wordLimit*/ ctx[6];
  			comment_1.$set(comment_1_changes);

  			if (/*showMore*/ ctx[3]) {
  				if (if_block1) {
  					if_block1.p(ctx, dirty);

  					if (dirty & /*showMore*/ 8) {
  						transition_in(if_block1, 1);
  					}
  				} else {
  					if_block1 = create_if_block$1(ctx);
  					if_block1.c();
  					transition_in(if_block1, 1);
  					if_block1.m(div2, null);
  				}
  			} else if (if_block1) {
  				group_outros();

  				transition_out(if_block1, 1, 1, () => {
  					if_block1 = null;
  				});

  				check_outros();
  			}
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(comment_1.$$.fragment, local);
  			transition_in(if_block1);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(comment_1.$$.fragment, local);
  			transition_out(if_block1);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div2);
  			if (if_block0) if_block0.d();
  			destroy_component(comment_1);
  			if (if_block1) if_block1.d();
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

  function instance$2($$self, $$props, $$invalidate) {
  	let $msg;
  	let $lazy;
  	let $options;
  	validate_store(msg, 'msg');
  	component_subscribe($$self, msg, $$value => $$invalidate(13, $msg = $$value));
  	validate_store(lazy, 'lazy');
  	component_subscribe($$self, lazy, $$value => $$invalidate(14, $lazy = $$value));
  	validate_store(options, 'options');
  	component_subscribe($$self, options, $$value => $$invalidate(15, $options = $$value));
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots('Comments', slots, []);
  	let D = $options;
  	const dispatch = createEventDispatcher();
  	let { comment = [] } = $$props;

  	// svelte 变量
  	let moerDisabled = false,
  		comments = [],
  		counts = 0,
  		pageNo = 1,
  		pageCount = 1,
  		showMore = false,
  		loading = false,
  		replying = '',
  		wordLimit;

  	onMount(() => {
  		GetComment();
  	});

  	afterUpdate(() => {
  		$lazy();
  	});

  	async function GetComment() {
  		try {
  			const { data, msg } = await request({
  				url: D.serverURLs,
  				data: {
  					type: 'GET_COMMENT',
  					path: D.path,
  					pageNo
  				}
  			});

  			if (!data) throw new Error(msg);
  			$$invalidate(2, counts = data.counts);
  			pageCount = data.pageCount;
  			$$invalidate(0, comments = [...comments, ...data.comments]);
  			$$invalidate(6, wordLimit = data.wordNumber);
  			dispatch('onComment', comments.length);
  			dispatch('wordLimit', data.wordNumber);
  		} catch(error) {
  			// eslint-disable-next-line
  			console.error('Request failed', error);

  			$msg({
  				type: 'error',
  				time: 1500,
  				text: translate('commentsError')
  			});

  			dispatch('onCommentError');
  		}

  		// 页码大于当前页显示‘更多评论’按钮
  		$$invalidate(3, showMore = pageCount > pageNo ? true : false);
  	}

  	async function onMoreComment() {
  		$$invalidate(1, moerDisabled = true);
  		$$invalidate(4, loading = true);

  		if (pageNo < pageCount) {
  			pageNo++;
  			await GetComment();
  			$$invalidate(1, moerDisabled = false);
  			$$invalidate(4, loading = false);
  		}
  	}

  	function submitComment(event) {
  		for (const item of comments) {
  			if (item.id === event.detail.pid) {
  				item.replys = [...event.detail.comment, ...item.replys || []];
  				break;
  			}
  		}

  		// 由于这是Svelte的特性，引用类型需要重新给自身赋值才会触发双向绑定
  		($$invalidate(0, comments), $$invalidate(9, comment));
  	}

  	const writable_props = ['comment'];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Comments> was created with unknown prop '${key}'`);
  	});

  	const onReply_handler = ({ detail }) => $$invalidate(5, replying = detail);

  	$$self.$$set = $$props => {
  		if ('comment' in $$props) $$invalidate(9, comment = $$props.comment);
  	};

  	$$self.$capture_state = () => ({
  		onMount,
  		afterUpdate,
  		createEventDispatcher,
  		options,
  		msg,
  		lazy,
  		Comment,
  		request,
  		translate,
  		Loading: Loading_svg_rollup_plugin,
  		D,
  		dispatch,
  		comment,
  		moerDisabled,
  		comments,
  		counts,
  		pageNo,
  		pageCount,
  		showMore,
  		loading,
  		replying,
  		wordLimit,
  		GetComment,
  		onMoreComment,
  		submitComment,
  		$msg,
  		$lazy,
  		$options
  	});

  	$$self.$inject_state = $$props => {
  		if ('D' in $$props) D = $$props.D;
  		if ('comment' in $$props) $$invalidate(9, comment = $$props.comment);
  		if ('moerDisabled' in $$props) $$invalidate(1, moerDisabled = $$props.moerDisabled);
  		if ('comments' in $$props) $$invalidate(0, comments = $$props.comments);
  		if ('counts' in $$props) $$invalidate(2, counts = $$props.counts);
  		if ('pageNo' in $$props) pageNo = $$props.pageNo;
  		if ('pageCount' in $$props) pageCount = $$props.pageCount;
  		if ('showMore' in $$props) $$invalidate(3, showMore = $$props.showMore);
  		if ('loading' in $$props) $$invalidate(4, loading = $$props.loading);
  		if ('replying' in $$props) $$invalidate(5, replying = $$props.replying);
  		if ('wordLimit' in $$props) $$invalidate(6, wordLimit = $$props.wordLimit);
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$self.$$.update = () => {
  		if ($$self.$$.dirty & /*comment, comments*/ 513) {
  			// 相当于vue中的watch
  			{
  				$$invalidate(0, comments = [...comment, ...comments]);
  			}
  		}
  	};

  	return [
  		comments,
  		moerDisabled,
  		counts,
  		showMore,
  		loading,
  		replying,
  		wordLimit,
  		onMoreComment,
  		submitComment,
  		comment,
  		onReply_handler
  	];
  }

  class Comments extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, { comment: 9 }, add_css$1);

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "Comments",
  			options,
  			id: create_fragment$2.name
  		});
  	}

  	get comment() {
  		throw new Error_1("<Comments>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set comment(value) {
  		throw new Error_1("<Comments>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}
  }

  /* src\client\view\footer.svelte generated by Svelte v3.52.0 */
  const file$1 = "src\\client\\view\\footer.svelte";

  function add_css(target) {
  	append_styles(target, "svelte-1u1ezql", ".D-footer.svelte-1u1ezql{text-align:right;font-size:0.75em;margin-top:1em}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLnN2ZWx0ZSIsIm1hcHBpbmdzIjoiQUFpQ0UsU0FBUyxlQUFDLENBQUEsQUFDUixVQUFVLENBQUUsS0FBSyxDQUNqQixTQUFTLENBQUUsTUFBTSxDQUNqQixVQUFVLENBQUUsR0FBRyxBQUNqQixDQUFBIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbImZvb3Rlci5zdmVsdGUiXX0= */");
  }

  function create_fragment$1(ctx) {
  	let div;
  	let t0;
  	let strong;
  	let a;
  	let t2;
  	let t3;

  	const block = {
  		c: function create() {
  			div = element("div");
  			t0 = text("Powered by ");
  			strong = element("strong");
  			a = element("a");
  			a.textContent = "Discuss";
  			t2 = text(" v");
  			t3 = text(version);
  			attr_dev(a, "href", "https://Discuss.js.org");
  			attr_dev(a, "target", "_blank");
  			add_location(a, file$1, 29, 21, 665);
  			add_location(strong, file$1, 29, 13, 657);
  			attr_dev(div, "class", "D-footer svelte-1u1ezql");
  			add_location(div, file$1, 27, 0, 565);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div, anchor);
  			append_dev(div, t0);
  			append_dev(div, strong);
  			append_dev(strong, a);
  			append_dev(div, t2);
  			append_dev(div, t3);
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
  		id: create_fragment$1.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  function instance$1($$self, $$props, $$invalidate) {
  	let $options;
  	validate_store(options, 'options');
  	component_subscribe($$self, options, $$value => $$invalidate(0, $options = $$value));
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots('Footer', slots, []);
  	let D = $options;

  	onMount(() => {
  		VisitStat();
  	});

  	async function VisitStat() {
  		const counterEle = document.getElementById('Discuss-Visitors');
  		if (!counterEle) return;

  		const options = {
  			url: D.serverURLs,
  			data: { type: 'COUNTER', path: D.path }
  		};

  		const { data } = await request(options);
  		if (data) counterEle.innerText = data;
  	}

  	const writable_props = [];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
  	});

  	$$self.$capture_state = () => ({
  		onMount,
  		version,
  		options,
  		request,
  		D,
  		VisitStat,
  		$options
  	});

  	$$self.$inject_state = $$props => {
  		if ('D' in $$props) D = $$props.D;
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	return [];
  }

  class Footer extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, {}, add_css);

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "Footer",
  			options,
  			id: create_fragment$1.name
  		});
  	}
  }

  const str = 'D-zIndex';

  /**
   * 让 admin 显示在最顶层
   * @param {String} flag open or close
   */
  function zIndex (flag) {
    const adminWrap = document.querySelector('.D-admin-wrap');
    const all = [...document.body.querySelectorAll('*:not(._msg)')];
    all.forEach((el) => {
      if (adminWrap.contains(el)) return
      const zIndex = window.getComputedStyle(el).zIndex;
      if (flag === 'close') return el.classList.remove(str)

      if (flag === 'open' && zIndex > 0) el.classList.add(str);
    });

    let body,
      el = document.querySelector('#Discuss');

    while (body !== 'BODY') {
      el = el.parentElement;
      body = el.nodeName;
      if (el.classList.contains(str)) el.classList.remove(str);
    }
  }

  let scriptUrl;
  if (document.currentScript) scriptUrl = document.currentScript.src;
  if (!scriptUrl) {
    const scripts = document.getElementsByTagName('script');
    if (scripts.length) scriptUrl = scripts[scripts.length - 1].src;
  }
  if (!scriptUrl) throw new Error('Automatic publicPath is not supported in this browser')
  scriptUrl = scriptUrl
    .replace(/#.*$/, '') // 去除锚点
    .replace(/\?.*$/, '') // 去除参数
    .replace(/\/[^/]+$/, '/'); // 去除文件名

  window.DChunk = [];
  const map = { admin: 'discuss.admin.js' };
  const loadScript = (chunk, callback) => {
    if (window.DChunk.includes(chunk)) return callback()
    window.DChunk.push(chunk);
    const script = document.createElement('script');
    script.src = scriptUrl + map[chunk];
    script.onload = () => {
      script.onload = null;
      callback();
      script.parentNode && script.parentNode.removeChild(script);
    };
    document.head.appendChild(script);
  };

  /* src\client\view\main.svelte generated by Svelte v3.52.0 */

  const { Object: Object_1 } = globals;
  const file = "src\\client\\view\\main.svelte";

  // (73:2) {#if isLoading}
  function create_if_block_2(ctx) {
  	let comments;
  	let current;

  	comments = new Comments({
  			props: { comment: /*comment*/ ctx[3] },
  			$$inline: true
  		});

  	comments.$on("onComment", /*onComment*/ ctx[7]);
  	comments.$on("wordLimit", /*wordLimitFn*/ ctx[9]);
  	comments.$on("onCommentError", /*onCommentError*/ ctx[8]);

  	const block = {
  		c: function create() {
  			create_component(comments.$$.fragment);
  		},
  		m: function mount(target, anchor) {
  			mount_component(comments, target, anchor);
  			current = true;
  		},
  		p: function update(ctx, dirty) {
  			const comments_changes = {};
  			if (dirty & /*comment*/ 8) comments_changes.comment = /*comment*/ ctx[3];
  			comments.$set(comments_changes);
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(comments.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(comments.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			destroy_component(comments, detaching);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_2.name,
  		type: "if",
  		source: "(73:2) {#if isLoading}",
  		ctx
  	});

  	return block;
  }

  // (79:28) 
  function create_if_block_1(ctx) {
  	let t_value = translate('notComments') + "";
  	let t;

  	const block = {
  		c: function create() {
  			t = text(t_value);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, t, anchor);
  		},
  		p: noop,
  		i: noop,
  		o: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(t);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_1.name,
  		type: "if",
  		source: "(79:28) ",
  		ctx
  	});

  	return block;
  }

  // (77:4) {#if isRefreshComments}
  function create_if_block(ctx) {
  	let iconloading;
  	let current;
  	iconloading = new Loading_svg_rollup_plugin({ $$inline: true });

  	const block = {
  		c: function create() {
  			create_component(iconloading.$$.fragment);
  		},
  		m: function mount(target, anchor) {
  			mount_component(iconloading, target, anchor);
  			current = true;
  		},
  		p: noop,
  		i: function intro(local) {
  			if (current) return;
  			transition_in(iconloading.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(iconloading.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			destroy_component(iconloading, detaching);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block.name,
  		type: "if",
  		source: "(77:4) {#if isRefreshComments}",
  		ctx
  	});

  	return block;
  }

  function create_fragment(ctx) {
  	let switch_instance;
  	let t0;
  	let div2;
  	let div0;
  	let t1;
  	let submit;
  	let t2;
  	let t3;
  	let div1;
  	let current_block_type_index;
  	let if_block1;
  	let div1_style_value;
  	let t4;
  	let footer;
  	let current;
  	var switch_value = Global;

  	function switch_props(ctx) {
  		return { $$inline: true };
  	}

  	if (switch_value) {
  		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
  	}

  	submit = new Submit({
  			props: { wordLimit: /*wordLimit*/ ctx[4] },
  			$$inline: true
  		});

  	submit.$on("onRefresh", /*onRefresh*/ ctx[6]);
  	submit.$on("onSetting", /*onSetting*/ ctx[5]);
  	submit.$on("submitComment", /*submitComment*/ ctx[10]);
  	let if_block0 = /*isLoading*/ ctx[0] && create_if_block_2(ctx);
  	const if_block_creators = [create_if_block, create_if_block_1];
  	const if_blocks = [];

  	function select_block_type(ctx, dirty) {
  		if (/*isRefreshComments*/ ctx[1]) return 0;
  		if (/*isNotComments*/ ctx[2]) return 1;
  		return -1;
  	}

  	if (~(current_block_type_index = select_block_type(ctx))) {
  		if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  	}

  	footer = new Footer({ $$inline: true });

  	const block = {
  		c: function create() {
  			if (switch_instance) create_component(switch_instance.$$.fragment);
  			t0 = space();
  			div2 = element("div");
  			div0 = element("div");
  			t1 = space();
  			create_component(submit.$$.fragment);
  			t2 = space();
  			if (if_block0) if_block0.c();
  			t3 = space();
  			div1 = element("div");
  			if (if_block1) if_block1.c();
  			t4 = space();
  			create_component(footer.$$.fragment);
  			attr_dev(div0, "class", "D-admin-wrap");
  			add_location(div0, file, 70, 2, 1710);
  			attr_dev(div1, "class", "D-loading-comments");

  			attr_dev(div1, "style", div1_style_value = /*isRefreshComments*/ ctx[1] || /*isNotComments*/ ctx[2]
  			? ''
  			: 'margin:0');

  			add_location(div1, file, 75, 2, 1989);
  			attr_dev(div2, "id", "Discuss");
  			attr_dev(div2, "class", "Discuss");
  			add_location(div2, file, 69, 0, 1673);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			if (switch_instance) mount_component(switch_instance, target, anchor);
  			insert_dev(target, t0, anchor);
  			insert_dev(target, div2, anchor);
  			append_dev(div2, div0);
  			append_dev(div2, t1);
  			mount_component(submit, div2, null);
  			append_dev(div2, t2);
  			if (if_block0) if_block0.m(div2, null);
  			append_dev(div2, t3);
  			append_dev(div2, div1);

  			if (~current_block_type_index) {
  				if_blocks[current_block_type_index].m(div1, null);
  			}

  			append_dev(div2, t4);
  			mount_component(footer, div2, null);
  			current = true;
  		},
  		p: function update(ctx, [dirty]) {
  			if (switch_value !== (switch_value = Global)) {
  				if (switch_instance) {
  					group_outros();
  					const old_component = switch_instance;

  					transition_out(old_component.$$.fragment, 1, 0, () => {
  						destroy_component(old_component, 1);
  					});

  					check_outros();
  				}

  				if (switch_value) {
  					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
  					create_component(switch_instance.$$.fragment);
  					transition_in(switch_instance.$$.fragment, 1);
  					mount_component(switch_instance, t0.parentNode, t0);
  				} else {
  					switch_instance = null;
  				}
  			}

  			const submit_changes = {};
  			if (dirty & /*wordLimit*/ 16) submit_changes.wordLimit = /*wordLimit*/ ctx[4];
  			submit.$set(submit_changes);

  			if (/*isLoading*/ ctx[0]) {
  				if (if_block0) {
  					if_block0.p(ctx, dirty);

  					if (dirty & /*isLoading*/ 1) {
  						transition_in(if_block0, 1);
  					}
  				} else {
  					if_block0 = create_if_block_2(ctx);
  					if_block0.c();
  					transition_in(if_block0, 1);
  					if_block0.m(div2, t3);
  				}
  			} else if (if_block0) {
  				group_outros();

  				transition_out(if_block0, 1, 1, () => {
  					if_block0 = null;
  				});

  				check_outros();
  			}

  			let previous_block_index = current_block_type_index;
  			current_block_type_index = select_block_type(ctx);

  			if (current_block_type_index === previous_block_index) {
  				if (~current_block_type_index) {
  					if_blocks[current_block_type_index].p(ctx, dirty);
  				}
  			} else {
  				if (if_block1) {
  					group_outros();

  					transition_out(if_blocks[previous_block_index], 1, 1, () => {
  						if_blocks[previous_block_index] = null;
  					});

  					check_outros();
  				}

  				if (~current_block_type_index) {
  					if_block1 = if_blocks[current_block_type_index];

  					if (!if_block1) {
  						if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  						if_block1.c();
  					} else {
  						if_block1.p(ctx, dirty);
  					}

  					transition_in(if_block1, 1);
  					if_block1.m(div1, null);
  				} else {
  					if_block1 = null;
  				}
  			}

  			if (!current || dirty & /*isRefreshComments, isNotComments*/ 6 && div1_style_value !== (div1_style_value = /*isRefreshComments*/ ctx[1] || /*isNotComments*/ ctx[2]
  			? ''
  			: 'margin:0')) {
  				attr_dev(div1, "style", div1_style_value);
  			}
  		},
  		i: function intro(local) {
  			if (current) return;
  			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
  			transition_in(submit.$$.fragment, local);
  			transition_in(if_block0);
  			transition_in(if_block1);
  			transition_in(footer.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
  			transition_out(submit.$$.fragment, local);
  			transition_out(if_block0);
  			transition_out(if_block1);
  			transition_out(footer.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (switch_instance) destroy_component(switch_instance, detaching);
  			if (detaching) detach_dev(t0);
  			if (detaching) detach_dev(div2);
  			destroy_component(submit);
  			if (if_block0) if_block0.d();

  			if (~current_block_type_index) {
  				if_blocks[current_block_type_index].d();
  			}

  			destroy_component(footer);
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
  	let $msg;
  	let $options;
  	validate_store(msg, 'msg');
  	component_subscribe($$self, msg, $$value => $$invalidate(12, $msg = $$value));
  	validate_store(options, 'options');
  	component_subscribe($$self, options, $$value => $$invalidate(13, $options = $$value));
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots('Main', slots, []);
  	let isLoading = true;
  	let isRefreshComments = true;
  	let isNotComments = false;
  	let comment = [];
  	let app, wordLimit;

  	function initAdmin() {
  		zIndex('open');

  		app = window.discussAdmin.init({
  			...$options,
  			el: '.D-admin-wrap',
  			show: true
  		});
  	}

  	function onSetting() {
  		if (window.discussAdmin) {
  			initAdmin();
  		} else {
  			$msg({ text: translate('settingMsg') });
  			loadScript('admin', initAdmin);
  		}

  		// 此处用于再次打开评论管理面板
  		if (app) {
  			for (const fun of app.$$.ctx) {
  				if (Object.prototype.toString.call(fun) === '[object Object]' && typeof fun.onOpenAdmin === 'function') {
  					fun.onOpenAdmin('open');
  				}
  			}
  		}
  	}

  	function onRefresh() {
  		$msg({
  			time: 1500,
  			text: translate('refreshMsg')
  		});

  		$$invalidate(0, isLoading = !isLoading);
  		$$invalidate(1, isRefreshComments = true);

  		// 当刷新评论时，清空当前组件的评论缓存
  		$$invalidate(3, comment = []);

  		setTimeout(
  			() => {
  				$$invalidate(0, isLoading = !isLoading);
  			},
  			1000
  		);
  	}

  	function onComment({ detail }) {
  		if (!detail) $$invalidate(2, isNotComments = true);
  		$$invalidate(1, isRefreshComments = false);
  	}

  	function onCommentError() {
  		onComment({});
  	}

  	function wordLimitFn({ detail }) {
  		$$invalidate(4, wordLimit = detail);
  	}

  	function submitComment(event) {
  		$$invalidate(3, comment = event.detail.comment);
  	}

  	const writable_props = [];

  	Object_1.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main> was created with unknown prop '${key}'`);
  	});

  	$$self.$capture_state = () => ({
  		options,
  		msg,
  		global: Global,
  		translate,
  		Submit,
  		Comments,
  		Footer,
  		IconLoading: Loading_svg_rollup_plugin,
  		zIndex,
  		loadScript,
  		isLoading,
  		isRefreshComments,
  		isNotComments,
  		comment,
  		app,
  		wordLimit,
  		initAdmin,
  		onSetting,
  		onRefresh,
  		onComment,
  		onCommentError,
  		wordLimitFn,
  		submitComment,
  		$msg,
  		$options
  	});

  	$$self.$inject_state = $$props => {
  		if ('isLoading' in $$props) $$invalidate(0, isLoading = $$props.isLoading);
  		if ('isRefreshComments' in $$props) $$invalidate(1, isRefreshComments = $$props.isRefreshComments);
  		if ('isNotComments' in $$props) $$invalidate(2, isNotComments = $$props.isNotComments);
  		if ('comment' in $$props) $$invalidate(3, comment = $$props.comment);
  		if ('app' in $$props) app = $$props.app;
  		if ('wordLimit' in $$props) $$invalidate(4, wordLimit = $$props.wordLimit);
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	return [
  		isLoading,
  		isRefreshComments,
  		isNotComments,
  		comment,
  		wordLimit,
  		onSetting,
  		onRefresh,
  		onComment,
  		onCommentError,
  		wordLimitFn,
  		submitComment
  	];
  }

  class Main extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init$1(this, options, instance, create_fragment, safe_not_equal, {});

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "Main",
  			options,
  			id: create_fragment.name
  		});
  	}
  }

  /**
   * 访问量统计
   * @param {String} url 请求地址
   * @param {String} path 请求路径
   */
  async function VisitStat$1(url, path) {
    if (!url || !path) throw new Error('"url" or "path" cannot be empty')

    const options = {
      url,
      method: 'post',
      data: {
        type: 'COUNTER',
        path
      }
    };

    const { data } = await request(options);

    return data
  }

  /**
   * 获取最新评论
   * @param {String} url 请求地址
   * @param {Boolean} reply 是否请求回复评论 默认: true
   * @returns {Array}
   */
  async function RecentComment$1(url, reply) {
    if (!url) throw new Error('"url" cannot be empty')
    const options = {
      url,
      method: 'post',
      data: {
        type: 'RECENT_COMMENT',
        reply
      }
    };

    const { data } = await request(options);

    return data
  }

  /**
   * 请求评论数量(一般用于首页显示某篇文章有多少条评论)
   * @param {String} url 请求地址
   * @param {Array} paths 请求的标识符(网站path)
   * @param {Boolean} reply 是否请求回复评论 默认: true
   * @returns {Array}
   */
  async function CommentCount$1(url, paths, reply) {
    if (!url || !paths) throw new Error('"url" or "paths" cannot be empty')
    const options = {
      url,
      method: 'post',
      data: {
        type: 'COMMENT_COUNT',
        paths,
        reply
      }
    };

    const { data } = await request(options);
    return data
  }

  let app;
  function init(opt) {
    window.DLoad = false;
    opt = opt || {};
    setLanguage(opt.lang);
    const defaultOptions = {
      master: translate('master'),
      stick: translate('stick'),
      ph: translate('content'),
      path: location.pathname,
      visitStat: true,
      imgLoading: index.GIF
    };

    options.set(Object.assign(defaultOptions, opt));

    app && app.$destroy();
    app = new Main({
      target: document.querySelector(opt.el)
    });
    // 设置主色
    if (opt.color) {
      const style = document.createElement('style');
      style.textContent = `:root{--D-main-Color:${opt.color}}`;
      document.head.appendChild(style);
    }
  }

  /* eslint-disable no-console */
  function warn(fun) {
    console.warn('Disucss:', `"${fun}" will be removed in a future version, please use "get${fun}" instead.`);
  }
  async function VisitStat(...params) {
    warn('VisitStat');
    return await VisitStat$1(...params)
  }
  async function RecentComment(...params) {
    warn('RecentComment');
    return await RecentComment$1(...params)
  }
  async function CommentCount(...params) {
    warn('CommentCount');
    return await CommentCount$1(...params)
  }
  /* eslint-enable no-console */

  var main = window.Discuss = {
    init,
    getVisitStat: VisitStat$1,
    getRecentComment: RecentComment$1,
    getCommentCount: CommentCount$1,
    VisitStat,
    RecentComment,
    CommentCount
  };

  return main;

})();
//# sourceMappingURL=discuss.js.map
