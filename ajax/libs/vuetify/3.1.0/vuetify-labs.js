(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vuetify = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

  // Types

  function getNestedValue(obj, path, fallback) {
    const last = path.length - 1;
    if (last < 0) return obj === undefined ? fallback : obj;
    for (let i = 0; i < last; i++) {
      if (obj == null) {
        return fallback;
      }
      obj = obj[path[i]];
    }
    if (obj == null) return fallback;
    return obj[path[last]] === undefined ? fallback : obj[path[last]];
  }
  function deepEqual(a, b) {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
      // If the values are Date, compare them as timestamps
      return false;
    }
    if (a !== Object(a) || b !== Object(b)) {
      // If the values aren't objects, they were already checked for equality
      return false;
    }
    const props = Object.keys(a);
    if (props.length !== Object.keys(b).length) {
      // Different number of props, don't bother to check
      return false;
    }
    return props.every(p => deepEqual(a[p], b[p]));
  }
  function getObjectValueByPath(obj, path, fallback) {
    // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
    if (obj == null || !path || typeof path !== 'string') return fallback;
    if (obj[path] !== undefined) return obj[path];
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, ''); // strip a leading dot
    return getNestedValue(obj, path.split('.'), fallback);
  }
  function getPropertyFromItem(item, property, fallback) {
    if (property == null) return item === undefined ? fallback : item;
    if (item !== Object(item)) {
      if (typeof property !== 'function') return fallback;
      const value = property(item, fallback);
      return typeof value === 'undefined' ? fallback : value;
    }
    if (typeof property === 'string') return getObjectValueByPath(item, property, fallback);
    if (Array.isArray(property)) return getNestedValue(item, property, fallback);
    if (typeof property !== 'function') return fallback;
    const value = property(item, fallback);
    return typeof value === 'undefined' ? fallback : value;
  }
  function createRange(length) {
    let start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Array.from({
      length
    }, (v, k) => start + k);
  }
  function convertToUnit(str) {
    let unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';
    if (str == null || str === '') {
      return undefined;
    } else if (isNaN(+str)) {
      return String(str);
    } else if (!isFinite(+str)) {
      return undefined;
    } else {
      return `${Number(str)}${unit}`;
    }
  }
  function isObject(obj) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  }
  function isComponentInstance(obj) {
    return obj == null ? void 0 : obj.$el;
  }

  // KeyboardEvent.keyCode aliases
  const keyCodes = Object.freeze({
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    del: 46,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34,
    shift: 16
  });
  Object.freeze({
    enter: 'Enter',
    tab: 'Tab',
    delete: 'Delete',
    esc: 'Escape',
    space: 'Space',
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    end: 'End',
    home: 'Home',
    del: 'Delete',
    backspace: 'Backspace',
    insert: 'Insert',
    pageup: 'PageUp',
    pagedown: 'PageDown',
    shift: 'Shift'
  });
  function pick(obj, paths) {
    const found = Object.create(null);
    const rest = Object.create(null);
    for (const key in obj) {
      if (paths.some(path => path instanceof RegExp ? path.test(key) : path === key)) {
        found[key] = obj[key];
      } else {
        rest[key] = obj[key];
      }
    }
    return [found, rest];
  }
  function omit(obj, exclude) {
    const clone = {
      ...obj
    };
    exclude.forEach(prop => delete clone[prop]);
    return clone;
  }

  /**
   * Filter attributes that should be applied to
   * the root element of a an input component. Remaining
   * attributes should be passed to the <input> element inside.
   */
  function filterInputAttrs(attrs) {
    return pick(attrs, ['class', 'style', 'id', /^data-/]);
  }
  function wrapInArray(v) {
    return v == null ? [] : Array.isArray(v) ? v : [v];
  }
  function clamp(value) {
    let min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Math.max(min, Math.min(max, value));
  }
  function mergeDeep() {
    let source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let arrayFn = arguments.length > 2 ? arguments[2] : undefined;
    const out = {};
    for (const key in source) {
      out[key] = source[key];
    }
    for (const key in target) {
      const sourceProperty = source[key];
      const targetProperty = target[key];

      // Only continue deep merging if
      // both properties are objects
      if (isObject(sourceProperty) && isObject(targetProperty)) {
        out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
        continue;
      }
      if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
        out[key] = arrayFn(sourceProperty, targetProperty);
        continue;
      }
      out[key] = targetProperty;
    }
    return out;
  }
  function toKebabCase() {
    let str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return str.replace(/[^a-z]/gi, '-').replace(/\B([A-Z])/g, '-$1').toLowerCase();
  }
  function findChildrenWithProvide(key, vnode) {
    if (!vnode || typeof vnode !== 'object') return [];
    if (Array.isArray(vnode)) {
      return vnode.map(child => findChildrenWithProvide(key, child)).flat(1);
    } else if (Array.isArray(vnode.children)) {
      return vnode.children.map(child => findChildrenWithProvide(key, child)).flat(1);
    } else if (vnode.component) {
      if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key)) {
        return [vnode.component];
      } else if (vnode.component.subTree) {
        return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
      }
    }
    return [];
  }

  // Only allow a single return type

  function destructComputed(getter) {
    const refs = vue.reactive({});
    const base = vue.computed(getter);
    vue.watchEffect(() => {
      for (const key in base.value) {
        refs[key] = base.value[key];
      }
    }, {
      flush: 'sync'
    });
    return vue.toRefs(refs);
  }

  /** Array.includes but value can be any type */
  function includes(arr, val) {
    return arr.includes(val);
  }
  const onRE = /^on[^a-z]/;
  const isOn = key => onRE.test(key);
  const EventProp = [Function, Array];
  function hasEvent(props, name) {
    name = 'on' + vue.capitalize(name);
    return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`]);
  }
  function callEvent(handler) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    if (Array.isArray(handler)) {
      for (const h of handler) {
        h(...args);
      }
    } else if (typeof handler === 'function') {
      handler(...args);
    }
  }

  const block = ['top', 'bottom'];
  const inline = ['start', 'end', 'left', 'right'];
  /** Parse a raw anchor string into an object */
  function parseAnchor(anchor, isRtl) {
    let [side, align] = anchor.split(' ');
    if (!align) {
      align = includes(block, side) ? 'start' : includes(inline, side) ? 'top' : 'center';
    }
    return {
      side: toPhysical(side, isRtl),
      align: toPhysical(align, isRtl)
    };
  }
  function toPhysical(str, isRtl) {
    if (str === 'start') return isRtl ? 'right' : 'left';
    if (str === 'end') return isRtl ? 'left' : 'right';
    return str;
  }
  function flipSide(anchor) {
    return {
      side: {
        center: 'center',
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      }[anchor.side],
      align: anchor.align
    };
  }
  function flipAlign(anchor) {
    return {
      side: anchor.side,
      align: {
        center: 'center',
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      }[anchor.align]
    };
  }
  function flipCorner(anchor) {
    return {
      side: anchor.align,
      align: anchor.side
    };
  }
  function getAxis(anchor) {
    return includes(block, anchor.side) ? 'y' : 'x';
  }

  class Box {
    constructor(_ref) {
      let {
        x,
        y,
        width,
        height
      } = _ref;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    get top() {
      return this.y;
    }
    get bottom() {
      return this.y + this.height;
    }
    get left() {
      return this.x;
    }
    get right() {
      return this.x + this.width;
    }
  }
  function getOverflow(a, b) {
    return {
      x: {
        before: Math.max(0, b.left - a.left),
        after: Math.max(0, a.right - b.right)
      },
      y: {
        before: Math.max(0, b.top - a.top),
        after: Math.max(0, a.bottom - b.bottom)
      }
    };
  }

  /** @see https://stackoverflow.com/a/57876601/2074736 */
  function nullifyTransforms(el) {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const tx = style.transform;
    if (tx) {
      let ta, sx, sy, dx, dy;
      if (tx.startsWith('matrix3d(')) {
        ta = tx.slice(9, -1).split(/, /);
        sx = +ta[0];
        sy = +ta[5];
        dx = +ta[12];
        dy = +ta[13];
      } else if (tx.startsWith('matrix(')) {
        ta = tx.slice(7, -1).split(/, /);
        sx = +ta[0];
        sy = +ta[3];
        dx = +ta[4];
        dy = +ta[5];
      } else {
        return new Box(rect);
      }
      const to = style.transformOrigin;
      const x = rect.x - dx - (1 - sx) * parseFloat(to);
      const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(' ') + 1));
      const w = sx ? rect.width / sx : el.offsetWidth + 1;
      const h = sy ? rect.height / sy : el.offsetHeight + 1;
      return new Box({
        x,
        y,
        width: w,
        height: h
      });
    } else {
      return new Box(rect);
    }
  }
  function animate(el, keyframes, options) {
    if (typeof el.animate === 'undefined') return {
      finished: Promise.resolve()
    };
    const animation = el.animate(keyframes, options);
    if (typeof animation.finished === 'undefined') {
      animation.finished = new Promise(resolve => {
        animation.onfinish = () => {
          resolve(animation);
        };
      });
    }
    return animation;
  }

  /* eslint-disable no-console */
  // import Vuetify from '../framework'

  function createMessage(message, vm, parent) {
    // if (Vuetify.config.silent) return

    if (parent) {
      vm = {
        __isVue: true,
        $parent: parent,
        $options: vm
      };
    }
    if (vm) {
      // Only show each message once per instance
      vm.$_alreadyWarned = vm.$_alreadyWarned || [];
      if (vm.$_alreadyWarned.includes(message)) return;
      vm.$_alreadyWarned.push(message);
    }
    return `[Vuetify] ${message}` + (vm ? generateComponentTrace(vm) : '');
  }
  function consoleWarn(message, vm, parent) {
    const newMessage = createMessage(message, vm, parent);
    newMessage != null && console.warn(newMessage);
  }
  function consoleError(message, vm, parent) {
    const newMessage = createMessage(message, vm, parent);
    newMessage != null && console.error(newMessage);
  }

  /**
   * Shamelessly stolen from vuejs/vue/blob/dev/src/core/util/debug.js
   */

  const classifyRE = /(?:^|[-_])(\w)/g;
  const classify = str => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
  function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    const options = typeof vm === 'function' && vm.cid != null ? vm.options : vm.__isVue ? vm.$options || vm.constructor.options : vm || {};
    let name = options.name || options._componentTag;
    const file = options.__file;
    if (!name && file) {
      const match = file.match(/([^/\\]+)\.vue$/);
      name = match == null ? void 0 : match[1];
    }
    return (name ? `<${classify(name)}>` : `<Anonymous>`) + (file && includeFile !== false ? ` at ${file}` : '');
  }
  function generateComponentTrace(vm) {
    if (vm.__isVue && vm.$parent) {
      const tree = [];
      let currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          const last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree.map((vm, i) => `${i === 0 ? '---> ' : ' '.repeat(5 + i * 2)}${Array.isArray(vm)
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)` : formatComponentName(vm)}`).join('\n');
    } else {
      return `\n\n(found in ${formatComponentName(vm)})`;
    }
  }

  // Utilities

  // Types

  function isCssColor(color) {
    return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
  }

  // Utilities
  function getCurrentInstance(name, message) {
    const vm = vue.getCurrentInstance();
    if (!vm) {
      throw new Error(`[Vuetify] ${name} ${message || 'must be called from inside a setup function'}`);
    }
    return vm;
  }
  function getCurrentInstanceName() {
    let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'composables';
    const vm = getCurrentInstance(name).type;
    return toKebabCase((vm == null ? void 0 : vm.aliasName) || (vm == null ? void 0 : vm.name));
  }
  let _uid = 0;
  let _map = new WeakMap();
  function getUid() {
    const vm = getCurrentInstance('getUid');
    if (_map.has(vm)) return _map.get(vm);else {
      const uid = _uid++;
      _map.set(vm, uid);
      return uid;
    }
  }
  getUid.reset = () => {
    _uid = 0;
    _map = new WeakMap();
  };

  function injectSelf(key) {
    const {
      provides
    } = getCurrentInstance('injectSelf');
    if (provides && key in provides) {
      // TS doesn't allow symbol as index type
      return provides[key];
    }
  }

  // Utilities

  // Types

  const DefaultsSymbol = Symbol.for('vuetify:defaults');
  function useDefaults() {
    const defaults = vue.inject(DefaultsSymbol);
    if (!defaults) throw new Error('[Vuetify] Could not find defaults instance');
    return defaults;
  }
  function provideDefaults(defaults, options) {
    const injectedDefaults = useDefaults();
    const providedDefaults = vue.ref(defaults);
    const newDefaults = vue.computed(() => {
      const scoped = vue.unref(options == null ? void 0 : options.scoped);
      const reset = vue.unref(options == null ? void 0 : options.reset);
      const root = vue.unref(options == null ? void 0 : options.root);
      let properties = mergeDeep(providedDefaults.value, {
        prev: injectedDefaults.value
      });
      if (scoped) return properties;
      if (reset || root) {
        const len = Number(reset || Infinity);
        for (let i = 0; i <= len; i++) {
          if (!properties.prev) break;
          properties = properties.prev;
        }
        return properties;
      }
      return mergeDeep(properties.prev, properties);
    });
    vue.provide(DefaultsSymbol, newDefaults);
    return newDefaults;
  }

  function useToggleScope(source, cb) {
    let scope;
    vue.watch(source, active => {
      if (active && !scope) {
        scope = vue.effectScope();
        scope.run(cb);
      } else if (!active) {
        var _scope;
        (_scope = scope) == null ? void 0 : _scope.stop();
        scope = undefined;
      }
    }, {
      immediate: true
    });
    vue.onScopeDispose(() => {
      var _scope2;
      (_scope2 = scope) == null ? void 0 : _scope2.stop();
    });
  }

  /**
   * Creates a factory function for props definitions.
   * This is used to define props in a composable then override
   * default values in an implementing component.
   *
   * @example Simplified signature
   * (props: Props) => (defaults?: Record<keyof props, any>) => Props
   *
   * @example Usage
   * const makeProps = propsFactory({
   *   foo: String,
   * })
   *
   * defineComponent({
   *   props: {
   *     ...makeProps({
   *       foo: 'a',
   *     }),
   *   },
   *   setup (props) {
   *     // would be "string | undefined", now "string" because a default has been provided
   *     props.foo
   *   },
   * }
   */

  function propsFactory(props, source) {
    return defaults => {
      return Object.keys(props).reduce((obj, prop) => {
        const isObjectDefinition = typeof props[prop] === 'object' && props[prop] != null && !Array.isArray(props[prop]);
        const definition = isObjectDefinition ? props[prop] : {
          type: props[prop]
        };
        if (defaults && prop in defaults) {
          obj[prop] = {
            ...definition,
            default: defaults[prop]
          };
        } else {
          obj[prop] = definition;
        }
        if (source && !obj[prop].source) {
          obj[prop].source = source;
        }
        return obj;
      }, {});
    };
  }

  // Utils
  function propIsDefined(vnode, prop) {
    var _vnode$props, _vnode$props2;
    return ((_vnode$props = vnode.props) == null ? void 0 : _vnode$props.hasOwnProperty(prop)) || ((_vnode$props2 = vnode.props) == null ? void 0 : _vnode$props2.hasOwnProperty(toKebabCase(prop)));
  }
  const defineComponent = function defineComponent(options) {
    options._setup = options._setup ?? options.setup;
    if (!options.name) {
      consoleWarn('The component is missing an explicit name, unable to generate default prop value');
      return options;
    }
    if (options._setup) {
      options.props = options.props ?? {};
      options.props = propsFactory(options.props, toKebabCase(options.name))();
      options.props._as = String;
      options.setup = function setup(props, ctx) {
        const vm = vue.getCurrentInstance();
        const defaults = useDefaults();
        const _subcomponentDefaults = vue.shallowRef();
        const _props = vue.shallowReactive({
          ...vue.toRaw(props)
        });
        vue.watchEffect(() => {
          const globalDefaults = defaults.value.global;
          const componentDefaults = defaults.value[props._as ?? options.name];
          if (componentDefaults) {
            const subComponents = Object.entries(componentDefaults).filter(_ref => {
              let [key] = _ref;
              return key.startsWith(key[0].toUpperCase());
            });
            if (subComponents.length) _subcomponentDefaults.value = Object.fromEntries(subComponents);
          }
          for (const prop of Object.keys(props)) {
            let newVal = props[prop];
            if (!propIsDefined(vm.vnode, prop)) {
              newVal = (componentDefaults == null ? void 0 : componentDefaults[prop]) ?? (globalDefaults == null ? void 0 : globalDefaults[prop]) ?? props[prop];
            }
            if (_props[prop] !== newVal) {
              _props[prop] = newVal;
            }
          }
        });
        const setupBindings = options._setup(_props, ctx);
        useToggleScope(_subcomponentDefaults, () => {
          var _injectSelf;
          provideDefaults(mergeDeep(((_injectSelf = injectSelf(DefaultsSymbol)) == null ? void 0 : _injectSelf.value) ?? {}, _subcomponentDefaults.value));
        });
        return setupBindings;
      };
    }
    return options;
  };
  function genericComponent() {
    let exposeDefaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return options => (exposeDefaults ? defineComponent : vue.defineComponent)(options);
  }
  function defineFunctionalComponent(props, render) {
    render.props = props;
    return render;
  }

  function createSimpleFunctional(klass) {
    let tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    let name = arguments.length > 2 ? arguments[2] : undefined;
    return defineComponent({
      name: name ?? vue.capitalize(vue.camelize(klass.replace(/__/g, '-'))),
      props: {
        tag: {
          type: String,
          default: tag
        }
      },
      setup(props, _ref) {
        let {
          slots
        } = _ref;
        return () => {
          var _slots$default;
          return vue.h(props.tag, {
            class: klass
          }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
        };
      }
    });
  }

  /**
   * Returns:
   *  - 'null' if the node is not attached to the DOM
   *  - the root node (HTMLDocument | ShadowRoot) otherwise
   */
  function attachedRoot(node) {
    /* istanbul ignore next */
    if (typeof node.getRootNode !== 'function') {
      // Shadow DOM not supported (IE11), lets find the root of this node
      while (node.parentNode) node = node.parentNode;

      // The root parent is the document if the node is attached to the DOM
      if (node !== document) return null;
      return document;
    }
    const root = node.getRootNode();

    // The composed root node is the document if the node is attached to the DOM
    if (root !== document && root.getRootNode({
      composed: true
    }) !== document) return null;
    return root;
  }

  const standardEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';
  const deceleratedEasing = 'cubic-bezier(0.0, 0, 0.2, 1)'; // Entering
  const acceleratedEasing = 'cubic-bezier(0.4, 0, 1, 1)'; // Leaving

  function getScrollParent(el) {
    while (el) {
      if (hasScrollbar(el)) return el;
      el = el.parentElement;
    }
    return document.scrollingElement;
  }
  function getScrollParents(el, stopAt) {
    const elements = [];
    if (stopAt && el && !stopAt.contains(el)) return elements;
    while (el) {
      if (hasScrollbar(el)) elements.push(el);
      if (el === stopAt) break;
      el = el.parentElement;
    }
    return elements;
  }
  function hasScrollbar(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
    const style = window.getComputedStyle(el);
    return style.overflowY === 'scroll' || style.overflowY === 'auto' && el.scrollHeight > el.clientHeight;
  }

  const IN_BROWSER = typeof window !== 'undefined';
  const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window;
  const SUPPORTS_FOCUS_VISIBLE = IN_BROWSER && typeof CSS !== 'undefined' && CSS.supports('selector(:focus-visible)');

  function isFixedPosition(el) {
    while (el) {
      if (window.getComputedStyle(el).position === 'fixed') {
        return true;
      }
      el = el.offsetParent;
    }
    return false;
  }

  // Utilities

  // Types

  function useRender(render) {
    const vm = getCurrentInstance('useRender');
    vm.render = render;
  }

  // Utilities

  // Types

  const allowedDensities = [null, 'default', 'comfortable', 'compact'];

  // typeof allowedDensities[number] evalutes to any
  // when generating api types for whatever reason.

  // Composables
  const makeDensityProps = propsFactory({
    density: {
      type: String,
      default: 'default',
      validator: v => allowedDensities.includes(v)
    }
  }, 'density');
  function useDensity(props) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
    const densityClasses = vue.computed(() => {
      return `${name}--density-${props.density}`;
    });
    return {
      densityClasses
    };
  }

  // Utilities

  // Types

  // Composables
  const makeTagProps = propsFactory({
    tag: {
      type: String,
      default: 'div'
    }
  }, 'tag');

  // Utilities

  // Types

  const ThemeSymbol = Symbol.for('vuetify:theme');
  const makeThemeProps = propsFactory({
    theme: String
  }, 'theme');
  function provideTheme(props) {
    getCurrentInstance('provideTheme');
    const theme = vue.inject(ThemeSymbol, null);
    if (!theme) throw new Error('Could not find Vuetify theme injection');
    const name = vue.computed(() => {
      return props.theme ?? (theme == null ? void 0 : theme.name.value);
    });
    const themeClasses = vue.computed(() => theme.isDisabled ? undefined : `v-theme--${name.value}`);
    const newTheme = {
      ...theme,
      name,
      themeClasses
    };
    vue.provide(ThemeSymbol, newTheme);
    return newTheme;
  }

  const VTable = defineComponent({
    name: 'VTable',
    props: {
      fixedHeader: Boolean,
      fixedFooter: Boolean,
      height: [Number, String],
      hover: Boolean,
      ...makeDensityProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        densityClasses
      } = useDensity(props);
      useRender(() => {
        var _slots$top, _slots$wrapper, _slots$bottom;
        return vue.createVNode(props.tag, {
          "class": ['v-table', {
            'v-table--fixed-height': !!props.height,
            'v-table--fixed-header': props.fixedHeader,
            'v-table--fixed-footer': props.fixedFooter,
            'v-table--has-top': !!slots.top,
            'v-table--has-bottom': !!slots.bottom,
            'v-table--hover': props.hover
          }, themeClasses.value, densityClasses.value]
        }, {
          default: () => [(_slots$top = slots.top) == null ? void 0 : _slots$top.call(slots), slots.default ? vue.createVNode("div", {
            "class": "v-table__wrapper",
            "style": {
              height: convertToUnit(props.height)
            }
          }, [vue.createVNode("table", null, [slots.default()])]) : (_slots$wrapper = slots.wrapper) == null ? void 0 : _slots$wrapper.call(slots), (_slots$bottom = slots.bottom) == null ? void 0 : _slots$bottom.call(slots)]
        });
      });
      return {};
    }
  });

  // Utilities

  // Types

  function createCssTransition(name) {
    let origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top center 0';
    let mode = arguments.length > 2 ? arguments[2] : undefined;
    return defineComponent({
      name,
      props: {
        group: Boolean,
        hideOnLeave: Boolean,
        leaveAbsolute: Boolean,
        mode: {
          type: String,
          default: mode
        },
        origin: {
          type: String,
          default: origin
        }
      },
      setup(props, _ref) {
        let {
          slots
        } = _ref;
        return () => {
          const tag = props.group ? vue.TransitionGroup : vue.Transition;
          return vue.h(tag, {
            name,
            mode: props.mode,
            onBeforeEnter(el) {
              el.style.transformOrigin = props.origin;
            },
            onLeave(el) {
              if (props.leaveAbsolute) {
                const {
                  offsetTop,
                  offsetLeft,
                  offsetWidth,
                  offsetHeight
                } = el;
                el._transitionInitialStyles = {
                  position: el.style.position,
                  top: el.style.top,
                  left: el.style.left,
                  width: el.style.width,
                  height: el.style.height
                };
                el.style.position = 'absolute';
                el.style.top = `${offsetTop}px`;
                el.style.left = `${offsetLeft}px`;
                el.style.width = `${offsetWidth}px`;
                el.style.height = `${offsetHeight}px`;
              }
              if (props.hideOnLeave) {
                el.style.setProperty('display', 'none', 'important');
              }
            },
            onAfterLeave(el) {
              if (props.leaveAbsolute && el != null && el._transitionInitialStyles) {
                const {
                  position,
                  top,
                  left,
                  width,
                  height
                } = el._transitionInitialStyles;
                delete el._transitionInitialStyles;
                el.style.position = position || '';
                el.style.top = top || '';
                el.style.left = left || '';
                el.style.width = width || '';
                el.style.height = height || '';
              }
            }
          }, slots.default);
        };
      }
    });
  }
  function createJavascriptTransition(name, functions) {
    let mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'in-out';
    return defineComponent({
      name,
      props: {
        mode: {
          type: String,
          default: mode
        }
      },
      setup(props, _ref2) {
        let {
          slots
        } = _ref2;
        return () => {
          return vue.h(vue.Transition, {
            name,
            // mode: props.mode, // TODO: vuejs/vue-next#3104
            ...functions
          }, slots.default);
        };
      }
    });
  }

  // Utilities
  function ExpandTransitionGenerator () {
    let expandedParentClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const sizeProperty = x ? 'width' : 'height';
    const offsetProperty = vue.camelize(`offset-${sizeProperty}`);
    return {
      onBeforeEnter(el) {
        el._parent = el.parentNode;
        el._initialStyle = {
          transition: el.style.transition,
          overflow: el.style.overflow,
          [sizeProperty]: el.style[sizeProperty]
        };
      },
      onEnter(el) {
        const initialStyle = el._initialStyle;
        el.style.setProperty('transition', 'none', 'important');
        // Hide overflow to account for collapsed margins in the calculated height
        el.style.overflow = 'hidden';
        const offset = `${el[offsetProperty]}px`;
        el.style[sizeProperty] = '0';
        void el.offsetHeight; // force reflow

        el.style.transition = initialStyle.transition;
        if (expandedParentClass && el._parent) {
          el._parent.classList.add(expandedParentClass);
        }
        requestAnimationFrame(() => {
          el.style[sizeProperty] = offset;
        });
      },
      onAfterEnter: resetStyles,
      onEnterCancelled: resetStyles,
      onLeave(el) {
        el._initialStyle = {
          transition: '',
          overflow: el.style.overflow,
          [sizeProperty]: el.style[sizeProperty]
        };
        el.style.overflow = 'hidden';
        el.style[sizeProperty] = `${el[offsetProperty]}px`;
        void el.offsetHeight; // force reflow

        requestAnimationFrame(() => el.style[sizeProperty] = '0');
      },
      onAfterLeave,
      onLeaveCancelled: onAfterLeave
    };
    function onAfterLeave(el) {
      if (expandedParentClass && el._parent) {
        el._parent.classList.remove(expandedParentClass);
      }
      resetStyles(el);
    }
    function resetStyles(el) {
      const size = el._initialStyle[sizeProperty];
      el.style.overflow = el._initialStyle.overflow;
      if (size != null) el.style[sizeProperty] = size;
      delete el._initialStyle;
    }
  }

  const VDialogTransition = defineComponent({
    name: 'VDialogTransition',
    props: {
      target: Object
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const functions = {
        onBeforeEnter(el) {
          el.style.pointerEvents = 'none';
          el.style.visibility = 'hidden';
        },
        async onEnter(el, done) {
          var _getChildren;
          await new Promise(resolve => requestAnimationFrame(resolve));
          await new Promise(resolve => requestAnimationFrame(resolve));
          el.style.visibility = '';
          const {
            x,
            y,
            sx,
            sy,
            speed
          } = getDimensions(props.target, el);
          const animation = animate(el, [{
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }, {
            transform: ''
          }], {
            duration: 225 * speed,
            easing: deceleratedEasing
          });
          (_getChildren = getChildren(el)) == null ? void 0 : _getChildren.forEach(el => {
            animate(el, [{
              opacity: 0
            }, {
              opacity: 0,
              offset: 0.33
            }, {
              opacity: 1
            }], {
              duration: 225 * 2 * speed,
              easing: standardEasing
            });
          });
          animation.finished.then(() => done());
        },
        onAfterEnter(el) {
          el.style.removeProperty('pointer-events');
        },
        onBeforeLeave(el) {
          el.style.pointerEvents = 'none';
        },
        async onLeave(el, done) {
          var _getChildren2;
          await new Promise(resolve => requestAnimationFrame(resolve));
          const {
            x,
            y,
            sx,
            sy,
            speed
          } = getDimensions(props.target, el);
          const animation = animate(el, [{
            transform: ''
          }, {
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }], {
            duration: 125 * speed,
            easing: acceleratedEasing
          });
          animation.finished.then(() => done());
          (_getChildren2 = getChildren(el)) == null ? void 0 : _getChildren2.forEach(el => {
            animate(el, [{}, {
              opacity: 0,
              offset: 0.2
            }, {
              opacity: 0
            }], {
              duration: 125 * 2 * speed,
              easing: standardEasing
            });
          });
        },
        onAfterLeave(el) {
          el.style.removeProperty('pointer-events');
        }
      };
      return () => {
        return props.target ? vue.createVNode(vue.Transition, vue.mergeProps({
          "name": "dialog-transition"
        }, functions, {
          "css": false
        }), slots) : vue.createVNode(vue.Transition, {
          "name": "dialog-transition"
        }, slots);
      };
    }
  });

  /** Animatable children (card, sheet, list) */
  function getChildren(el) {
    var _el$querySelector;
    const els = (_el$querySelector = el.querySelector(':scope > .v-card, :scope > .v-sheet, :scope > .v-list')) == null ? void 0 : _el$querySelector.children;
    return els && [...els];
  }
  function getDimensions(target, el) {
    const targetBox = target.getBoundingClientRect();
    const elBox = nullifyTransforms(el);
    const [originX, originY] = getComputedStyle(el).transformOrigin.split(' ').map(v => parseFloat(v));
    const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue('--v-overlay-anchor-origin').split(' ');
    let offsetX = targetBox.left + targetBox.width / 2;
    if (anchorSide === 'left' || anchorOffset === 'left') {
      offsetX -= targetBox.width / 2;
    } else if (anchorSide === 'right' || anchorOffset === 'right') {
      offsetX += targetBox.width / 2;
    }
    let offsetY = targetBox.top + targetBox.height / 2;
    if (anchorSide === 'top' || anchorOffset === 'top') {
      offsetY -= targetBox.height / 2;
    } else if (anchorSide === 'bottom' || anchorOffset === 'bottom') {
      offsetY += targetBox.height / 2;
    }
    const tsx = targetBox.width / elBox.width;
    const tsy = targetBox.height / elBox.height;
    const maxs = Math.max(1, tsx, tsy);
    const sx = tsx / maxs || 0;
    const sy = tsy / maxs || 0;

    // Animate elements larger than 12% of the screen area up to 1.5x slower
    const asa = elBox.width * elBox.height / (window.innerWidth * window.innerHeight);
    const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
    return {
      x: offsetX - (originX + elBox.left),
      y: offsetY - (originY + elBox.top),
      sx,
      sy,
      speed
    };
  }

  // Component specific transitions
  createCssTransition('fab-transition', 'center center', 'out-in');

  // Generic transitions
  createCssTransition('dialog-bottom-transition');
  createCssTransition('dialog-top-transition');
  createCssTransition('fade-transition');
  createCssTransition('scale-transition');
  createCssTransition('scroll-x-transition');
  createCssTransition('scroll-x-reverse-transition');
  createCssTransition('scroll-y-transition');
  createCssTransition('scroll-y-reverse-transition');
  createCssTransition('slide-x-transition');
  createCssTransition('slide-x-reverse-transition');
  const VSlideYTransition = createCssTransition('slide-y-transition');
  createCssTransition('slide-y-reverse-transition');

  // Javascript transitions
  const VExpandTransition = createJavascriptTransition('expand-transition', ExpandTransitionGenerator());
  const VExpandXTransition = createJavascriptTransition('expand-x-transition', ExpandTransitionGenerator('', true));

  // Utilities

  // Types

  const makeTransitionProps = propsFactory({
    transition: {
      type: [Boolean, String, Object],
      default: 'fade-transition',
      validator: val => val !== true
    }
  }, 'transition');
  const MaybeTransition = (props, _ref) => {
    let {
      slots
    } = _ref;
    const {
      transition,
      ...rest
    } = props;
    const {
      component = vue.Transition,
      ...customProps
    } = typeof transition === 'object' ? transition : {};
    return vue.h(component, vue.mergeProps(typeof transition === 'string' ? {
      name: transition
    } : customProps, rest), slots);
  };

  // Utilities

  // Types

  // Composables
  function useColor(colors) {
    return destructComputed(() => {
      const classes = [];
      const styles = {};
      if (colors.value.background) {
        if (isCssColor(colors.value.background)) {
          styles.backgroundColor = colors.value.background;
        } else {
          classes.push(`bg-${colors.value.background}`);
        }
      }
      if (colors.value.text) {
        if (isCssColor(colors.value.text)) {
          styles.color = colors.value.text;
          styles.caretColor = colors.value.text;
        } else {
          classes.push(`text-${colors.value.text}`);
        }
      }
      return {
        colorClasses: classes,
        colorStyles: styles
      };
    });
  }
  function useTextColor(props, name) {
    const colors = vue.computed(() => ({
      text: vue.isRef(props) ? props.value : name ? props[name] : null
    }));
    const {
      colorClasses: textColorClasses,
      colorStyles: textColorStyles
    } = useColor(colors);
    return {
      textColorClasses,
      textColorStyles
    };
  }
  function useBackgroundColor(props, name) {
    const colors = vue.computed(() => ({
      background: vue.isRef(props) ? props.value : name ? props[name] : null
    }));
    const {
      colorClasses: backgroundColorClasses,
      colorStyles: backgroundColorStyles
    } = useColor(colors);
    return {
      backgroundColorClasses,
      backgroundColorStyles
    };
  }

  // Types

  const VMessages = defineComponent({
    name: 'VMessages',
    props: {
      active: Boolean,
      color: String,
      messages: {
        type: [Array, String],
        default: () => []
      },
      ...makeTransitionProps({
        transition: {
          component: VSlideYTransition,
          leaveAbsolute: true,
          group: true
        }
      })
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const messages = vue.computed(() => wrapInArray(props.messages));
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.computed(() => props.color));
      useRender(() => vue.createVNode(MaybeTransition, {
        "transition": props.transition,
        "tag": "div",
        "class": ['v-messages', textColorClasses.value],
        "style": textColorStyles.value
      }, {
        default: () => [props.active && messages.value.map((message, i) => vue.createVNode("div", {
          "class": "v-messages__message",
          "key": `${i}-${messages.value}`
        }, [slots.message ? slots.message({
          message
        }) : message]))]
      }));
      return {};
    }
  });

  // Types

  const IconValue = [String, Function, Object];
  const IconSymbol = Symbol.for('vuetify:icons');
  const makeIconProps = propsFactory({
    icon: {
      type: IconValue
    },
    // Could not remove this and use makeTagProps, types complained because it is not required
    tag: {
      type: String,
      required: true
    }
  }, 'icon');
  const VComponentIcon = defineComponent({
    name: 'VComponentIcon',
    props: makeIconProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        var _slots$default;
        return vue.createVNode(props.tag, null, {
          default: () => [props.icon ? vue.createVNode(props.icon, null, null) : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
        });
      };
    }
  });
  defineComponent({
    name: 'VSvgIcon',
    inheritAttrs: false,
    props: makeIconProps(),
    setup(props, _ref2) {
      let {
        attrs
      } = _ref2;
      return () => {
        return vue.createVNode(props.tag, vue.mergeProps(attrs, {
          "style": null
        }), {
          default: () => [vue.createVNode("svg", {
            "class": "v-icon__svg",
            "xmlns": "http://www.w3.org/2000/svg",
            "viewBox": "0 0 24 24",
            "role": "img",
            "aria-hidden": "true"
          }, [vue.createVNode("path", {
            "d": props.icon
          }, null)])]
        });
      };
    }
  });
  defineComponent({
    name: 'VLigatureIcon',
    props: makeIconProps(),
    setup(props) {
      return () => {
        return vue.createVNode(props.tag, null, {
          default: () => [props.icon]
        });
      };
    }
  });
  defineComponent({
    name: 'VClassIcon',
    props: makeIconProps(),
    setup(props) {
      return () => {
        return vue.createVNode(props.tag, {
          "class": props.icon
        }, null);
      };
    }
  });
  const useIcon = props => {
    const icons = vue.inject(IconSymbol);
    if (!icons) throw new Error('Missing Vuetify Icons provide!');
    const iconData = vue.computed(() => {
      const iconAlias = vue.isRef(props) ? props.value : props.icon;
      if (!iconAlias) return {
        component: VComponentIcon
      };
      let icon = iconAlias;
      if (typeof icon === 'string') {
        icon = icon.trim();
        if (icon.startsWith('$')) {
          var _icons$aliases;
          icon = (_icons$aliases = icons.aliases) == null ? void 0 : _icons$aliases[icon.slice(1)];
        }
      }
      if (!icon) throw new Error(`Could not find aliased icon "${iconAlias}"`);
      if (typeof icon !== 'string') {
        return {
          component: VComponentIcon,
          icon
        };
      }
      const iconSetName = Object.keys(icons.sets).find(setName => typeof icon === 'string' && icon.startsWith(`${setName}:`));
      const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
      const iconSet = icons.sets[iconSetName ?? icons.defaultSet];
      return {
        component: iconSet.component,
        icon: iconName
      };
    });
    return {
      iconData
    };
  };

  // Utilities

  // Types

  // Composables
  function useProxiedModel(props, prop, defaultValue) {
    let transformIn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : v => v;
    let transformOut = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : v => v;
    const vm = getCurrentInstance('useProxiedModel');
    const internal = vue.ref(props[prop] !== undefined ? props[prop] : defaultValue);
    const kebabProp = toKebabCase(prop);
    const checkKebab = kebabProp !== prop;
    const isControlled = checkKebab ? vue.computed(() => {
      var _vm$vnode$props, _vm$vnode$props2, _vm$vnode$props3, _vm$vnode$props4;
      void props[prop];
      return !!(((_vm$vnode$props = vm.vnode.props) != null && _vm$vnode$props.hasOwnProperty(prop) || (_vm$vnode$props2 = vm.vnode.props) != null && _vm$vnode$props2.hasOwnProperty(kebabProp)) && ((_vm$vnode$props3 = vm.vnode.props) != null && _vm$vnode$props3.hasOwnProperty(`onUpdate:${prop}`) || (_vm$vnode$props4 = vm.vnode.props) != null && _vm$vnode$props4.hasOwnProperty(`onUpdate:${kebabProp}`)));
    }) : vue.computed(() => {
      var _vm$vnode$props5, _vm$vnode$props6;
      void props[prop];
      return !!((_vm$vnode$props5 = vm.vnode.props) != null && _vm$vnode$props5.hasOwnProperty(prop) && (_vm$vnode$props6 = vm.vnode.props) != null && _vm$vnode$props6.hasOwnProperty(`onUpdate:${prop}`));
    });
    useToggleScope(() => !isControlled.value, () => {
      vue.watch(() => props[prop], val => {
        internal.value = val;
      });
    });
    const model = vue.computed({
      get() {
        return transformIn(isControlled.value ? props[prop] : internal.value);
      },
      set(value) {
        const newValue = transformOut(value);
        if ((isControlled.value ? props[prop] : internal.value) === newValue || transformIn(isControlled.value ? props[prop] : internal.value) === value) {
          return;
        }
        internal.value = newValue;
        vm == null ? void 0 : vm.emit(`update:${prop}`, newValue);
      }
    });
    Object.defineProperty(model, 'externalValue', {
      get: () => isControlled.value ? props[prop] : internal.value
    });
    return model;
  }

  // Utilities

  // Types

  const FormKey = Symbol.for('vuetify:form');
  function useForm() {
    return vue.inject(FormKey, null);
  }

  // Components

  // Types

  // Composables
  const makeFocusProps = propsFactory({
    focused: Boolean
  }, 'focus');
  function useFocus(props) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
    const isFocused = useProxiedModel(props, 'focused');
    const focusClasses = vue.computed(() => {
      return {
        [`${name}--focused`]: isFocused.value
      };
    });
    function focus() {
      isFocused.value = true;
    }
    function blur() {
      isFocused.value = false;
    }
    return {
      focusClasses,
      isFocused,
      focus,
      blur
    };
  }

  // Composables

  // Types

  const makeValidationProps = propsFactory({
    disabled: Boolean,
    error: Boolean,
    errorMessages: {
      type: [Array, String],
      default: () => []
    },
    maxErrors: {
      type: [Number, String],
      default: 1
    },
    name: String,
    label: String,
    readonly: Boolean,
    rules: {
      type: Array,
      default: () => []
    },
    modelValue: null,
    validateOn: String,
    validationValue: null,
    ...makeFocusProps()
  }, 'validation');
  function useValidation(props) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
    let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getUid();
    const model = useProxiedModel(props, 'modelValue');
    const validationModel = vue.computed(() => props.validationValue === undefined ? model.value : props.validationValue);
    const form = useForm();
    const internalErrorMessages = vue.ref([]);
    const isPristine = vue.ref(true);
    const isDirty = vue.computed(() => !!(wrapInArray(model.value === '' ? null : model.value).length || wrapInArray(validationModel.value === '' ? null : validationModel.value).length));
    const isDisabled = vue.computed(() => !!(props.disabled || form != null && form.isDisabled.value));
    const isReadonly = vue.computed(() => !!(props.readonly || form != null && form.isReadonly.value));
    const errorMessages = vue.computed(() => {
      return props.errorMessages.length ? wrapInArray(props.errorMessages).slice(0, Math.max(0, +props.maxErrors)) : internalErrorMessages.value;
    });
    const isValid = vue.computed(() => {
      if (props.error || errorMessages.value.length) return false;
      if (!props.rules.length) return true;
      return isPristine.value ? null : true;
    });
    const isValidating = vue.ref(false);
    const validationClasses = vue.computed(() => {
      return {
        [`${name}--error`]: isValid.value === false,
        [`${name}--dirty`]: isDirty.value,
        [`${name}--disabled`]: isDisabled.value,
        [`${name}--readonly`]: isReadonly.value
      };
    });
    const uid = vue.computed(() => props.name ?? vue.unref(id));
    vue.onBeforeMount(() => {
      form == null ? void 0 : form.register({
        id: uid.value,
        validate,
        reset,
        resetValidation
      });
    });
    vue.onBeforeUnmount(() => {
      form == null ? void 0 : form.unregister(uid.value);
    });
    const validateOn = vue.computed(() => props.validateOn || (form == null ? void 0 : form.validateOn.value) || 'input');

    // Set initial valid state, for inputs that might not have rules
    vue.onMounted(() => form == null ? void 0 : form.update(uid.value, isValid.value, errorMessages.value));
    useToggleScope(() => validateOn.value === 'input', () => {
      vue.watch(validationModel, () => {
        if (validationModel.value != null) {
          validate();
        } else if (props.focused) {
          const unwatch = vue.watch(() => props.focused, val => {
            if (!val) validate();
            unwatch();
          });
        }
      });
    });
    useToggleScope(() => validateOn.value === 'blur', () => {
      vue.watch(() => props.focused, val => {
        if (!val) validate();
      });
    });
    vue.watch(isValid, () => {
      form == null ? void 0 : form.update(uid.value, isValid.value, errorMessages.value);
    });
    function reset() {
      resetValidation();
      model.value = null;
    }
    function resetValidation() {
      isPristine.value = true;
      internalErrorMessages.value = [];
    }
    async function validate() {
      const results = [];
      isValidating.value = true;
      for (const rule of props.rules) {
        if (results.length >= (props.maxErrors ?? 1)) {
          break;
        }
        const handler = typeof rule === 'function' ? rule : () => rule;
        const result = await handler(validationModel.value);
        if (result === true) continue;
        if (typeof result !== 'string') {
          // eslint-disable-next-line no-console
          console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        results.push(result);
      }
      internalErrorMessages.value = results;
      isValidating.value = false;
      isPristine.value = false;
      return internalErrorMessages.value;
    }
    return {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses
    };
  }

  // Utilities

  // Types
  const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large'];
  // Composables
  const makeSizeProps = propsFactory({
    size: {
      type: [String, Number],
      default: 'default'
    }
  }, 'size');
  function useSize(props) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
    return destructComputed(() => {
      let sizeClasses;
      let sizeStyles;
      if (includes(predefinedSizes, props.size)) {
        sizeClasses = `${name}--size-${props.size}`;
      } else if (props.size) {
        sizeStyles = {
          width: convertToUnit(props.size),
          height: convertToUnit(props.size)
        };
      }
      return {
        sizeClasses,
        sizeStyles
      };
    });
  }

  // Types

  const makeVIconProps = propsFactory({
    color: String,
    start: Boolean,
    end: Boolean,
    icon: IconValue,
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'i'
    }),
    ...makeThemeProps()
  }, 'v-icon');
  const VIcon = defineComponent({
    name: 'VIcon',
    props: makeVIconProps(),
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      let slotIcon;
      if (slots.default) {
        slotIcon = vue.computed(() => {
          var _slots$default, _slot$filter$;
          const slot = (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
          if (!slot) return;
          return (_slot$filter$ = slot.filter(node => node.type === vue.Text && node.children && typeof node.children === 'string')[0]) == null ? void 0 : _slot$filter$.children;
        });
      }
      const {
        themeClasses
      } = provideTheme(props);
      const {
        iconData
      } = useIcon(slotIcon || props);
      const {
        sizeClasses
      } = useSize(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, 'color'));
      useRender(() => {
        var _slots$default2;
        return vue.createVNode(iconData.value.component, {
          "tag": props.tag,
          "icon": iconData.value.icon,
          "class": ['v-icon', 'notranslate', themeClasses.value, sizeClasses.value, textColorClasses.value, {
            'v-icon--clickable': !!attrs.onClick,
            'v-icon--start': props.start,
            'v-icon--end': props.end
          }],
          "style": [!sizeClasses.value ? {
            fontSize: convertToUnit(props.size),
            height: convertToUnit(props.size),
            width: convertToUnit(props.size)
          } : undefined, textColorStyles.value],
          "role": attrs.onClick ? 'button' : undefined,
          "aria-hidden": !attrs.onClick
        }, {
          default: () => [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]
        });
      });
      return {};
    }
  });

  const LocaleSymbol = Symbol.for('vuetify:locale');
  function useLocale() {
    const locale = vue.inject(LocaleSymbol);
    if (!locale) throw new Error('[Vuetify] Could not find injected locale instance');
    return locale;
  }
  function useRtl() {
    const locale = vue.inject(LocaleSymbol);
    if (!locale) throw new Error('[Vuetify] Could not find injected rtl instance');
    return {
      isRtl: locale.isRtl,
      rtlClasses: locale.rtlClasses
    };
  }

  function useInputIcon(props) {
    const {
      t
    } = useLocale();
    function InputIcon(_ref) {
      let {
        name
      } = _ref;
      const localeKey = {
        prepend: 'prependAction',
        prependInner: 'prependAction',
        append: 'appendAction',
        appendInner: 'appendAction',
        clear: 'clear'
      }[name];
      const listener = props[`onClick:${name}`];
      const label = listener && localeKey ? t(`$vuetify.input.${localeKey}`, props.label ?? '') : undefined;
      return vue.createVNode(VIcon, {
        "icon": props[`${name}Icon`],
        "aria-label": label,
        "onClick": listener
      }, null);
    }
    return {
      InputIcon
    };
  }

  const makeVInputProps = propsFactory({
    id: String,
    appendIcon: IconValue,
    prependIcon: IconValue,
    hideDetails: [Boolean, String],
    messages: {
      type: [Array, String],
      default: () => []
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: v => ['horizontal', 'vertical'].includes(v)
    },
    'onClick:prepend': EventProp,
    'onClick:append': EventProp,
    ...makeDensityProps(),
    ...makeValidationProps()
  }, 'v-input');
  const VInput = genericComponent()({
    name: 'VInput',
    props: {
      ...makeVInputProps()
    },
    emits: {
      'update:modelValue': val => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots,
        emit
      } = _ref;
      const {
        densityClasses
      } = useDensity(props);
      const {
        InputIcon
      } = useInputIcon(props);
      const uid = getUid();
      const id = vue.computed(() => props.id || `input-${uid}`);
      const {
        errorMessages,
        isDirty,
        isDisabled,
        isReadonly,
        isPristine,
        isValid,
        isValidating,
        reset,
        resetValidation,
        validate,
        validationClasses
      } = useValidation(props, 'v-input', id);
      const slotProps = vue.computed(() => ({
        id,
        isDirty,
        isDisabled,
        isReadonly,
        isPristine,
        isValid,
        isValidating,
        reset,
        resetValidation,
        validate
      }));
      useRender(() => {
        var _props$messages, _slots$prepend, _slots$default, _slots$append, _slots$details;
        const hasPrepend = !!(slots.prepend || props.prependIcon);
        const hasAppend = !!(slots.append || props.appendIcon);
        const hasMessages = !!((_props$messages = props.messages) != null && _props$messages.length || errorMessages.value.length);
        const hasDetails = !props.hideDetails || props.hideDetails === 'auto' && (hasMessages || !!slots.details);
        return vue.createVNode("div", {
          "class": ['v-input', `v-input--${props.direction}`, densityClasses.value, validationClasses.value]
        }, [hasPrepend && vue.createVNode("div", {
          "key": "prepend",
          "class": "v-input__prepend"
        }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps.value), props.prependIcon && vue.createVNode(InputIcon, {
          "key": "prepend-icon",
          "name": "prepend"
        }, null)]), slots.default && vue.createVNode("div", {
          "class": "v-input__control"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value)]), hasAppend && vue.createVNode("div", {
          "key": "append",
          "class": "v-input__append"
        }, [props.appendIcon && vue.createVNode(InputIcon, {
          "key": "append-icon",
          "name": "append"
        }, null), (_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, slotProps.value)]), hasDetails && vue.createVNode("div", {
          "class": "v-input__details"
        }, [vue.createVNode(VMessages, {
          "active": hasMessages,
          "messages": errorMessages.value.length > 0 ? errorMessages.value : props.messages
        }, {
          message: slots.message
        }), (_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps.value)])]);
      });
      return {
        reset,
        resetValidation,
        validate
      };
    }
  });
  function filterInputProps(props) {
    const keys = Object.keys(VInput.props).filter(k => !isOn(k));
    return pick(props, keys);
  }

  const VLabel = defineComponent({
    name: 'VLabel',
    props: {
      text: String,
      clickable: Boolean,
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => {
        var _slots$default;
        return vue.createVNode("label", {
          "class": ['v-label', {
            'v-label--clickable': props.clickable
          }]
        }, [props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
      });
      return {};
    }
  });

  // Types

  const VSelectionControlGroupSymbol = Symbol.for('vuetify:selection-control-group');
  const makeSelectionControlGroupProps = propsFactory({
    color: String,
    disabled: Boolean,
    error: Boolean,
    id: String,
    inline: Boolean,
    falseIcon: IconValue,
    trueIcon: IconValue,
    ripple: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: null
    },
    name: String,
    readonly: Boolean,
    modelValue: null,
    type: String,
    valueComparator: {
      type: Function,
      default: deepEqual
    },
    ...makeThemeProps(),
    ...makeDensityProps()
  }, 'v-selection-control-group');
  defineComponent({
    name: 'VSelectionControlGroup',
    props: {
      defaultsTarget: {
        type: String,
        default: 'VSelectionControl'
      },
      ...makeSelectionControlGroupProps()
    },
    emits: {
      'update:modelValue': val => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const modelValue = useProxiedModel(props, 'modelValue');
      const uid = getUid();
      const id = vue.computed(() => props.id || `v-selection-control-group-${uid}`);
      const name = vue.computed(() => props.name || id.value);
      const updateHandlers = new Set();
      vue.provide(VSelectionControlGroupSymbol, {
        modelValue,
        forceUpdate: () => {
          updateHandlers.forEach(fn => fn());
        },
        onForceUpdate: cb => {
          updateHandlers.add(cb);
          vue.onScopeDispose(() => {
            updateHandlers.delete(cb);
          });
        }
      });
      provideDefaults({
        [props.defaultsTarget]: {
          color: vue.toRef(props, 'color'),
          disabled: vue.toRef(props, 'disabled'),
          density: vue.toRef(props, 'density'),
          error: vue.toRef(props, 'error'),
          inline: vue.toRef(props, 'inline'),
          modelValue,
          multiple: vue.computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
          name,
          falseIcon: vue.toRef(props, 'falseIcon'),
          trueIcon: vue.toRef(props, 'trueIcon'),
          readonly: vue.toRef(props, 'readonly'),
          ripple: vue.toRef(props, 'ripple'),
          type: vue.toRef(props, 'type'),
          valueComparator: vue.toRef(props, 'valueComparator')
        }
      });
      useRender(() => {
        var _slots$default;
        return vue.createVNode("div", {
          "class": ['v-selection-control-group', {
            'v-selection-control-group--inline': props.inline
          }],
          "role": props.type === 'radio' ? 'radiogroup' : undefined
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
      });
      return {};
    }
  });

  // Styles

  // Types

  const stopSymbol = Symbol('rippleStop');
  const DELAY_RIPPLE = 80;
  function transform(el, value) {
    el.style.transform = value;
    el.style.webkitTransform = value;
  }
  function opacity(el, value) {
    el.style.opacity = `calc(${value} * var(--v-theme-overlay-multiplier))`;
  }
  function isTouchEvent(e) {
    return e.constructor.name === 'TouchEvent';
  }
  function isKeyboardEvent(e) {
    return e.constructor.name === 'KeyboardEvent';
  }
  const calculate = function (e, el) {
    var _el$_ripple;
    let value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let localX = 0;
    let localY = 0;
    if (!isKeyboardEvent(e)) {
      const offset = el.getBoundingClientRect();
      const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
      localX = target.clientX - offset.left;
      localY = target.clientY - offset.top;
    }
    let radius = 0;
    let scale = 0.3;
    if ((_el$_ripple = el._ripple) != null && _el$_ripple.circle) {
      scale = 0.15;
      radius = el.clientWidth / 2;
      radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
    } else {
      radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
    }
    const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
    const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
    const x = value.center ? centerX : `${localX - radius}px`;
    const y = value.center ? centerY : `${localY - radius}px`;
    return {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    };
  };
  const ripples = {
    /* eslint-disable max-statements */
    show(e, el) {
      var _el$_ripple2;
      let value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!(el != null && (_el$_ripple2 = el._ripple) != null && _el$_ripple2.enabled)) {
        return;
      }
      const container = document.createElement('span');
      const animation = document.createElement('span');
      container.appendChild(animation);
      container.className = 'v-ripple__container';
      if (value.class) {
        container.className += ` ${value.class}`;
      }
      const {
        radius,
        scale,
        x,
        y,
        centerX,
        centerY
      } = calculate(e, el, value);
      const size = `${radius * 2}px`;
      animation.className = 'v-ripple__animation';
      animation.style.width = size;
      animation.style.height = size;
      el.appendChild(container);
      const computed = window.getComputedStyle(el);
      if (computed && computed.position === 'static') {
        el.style.position = 'relative';
        el.dataset.previousPosition = 'static';
      }
      animation.classList.add('v-ripple__animation--enter');
      animation.classList.add('v-ripple__animation--visible');
      transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
      opacity(animation, 0);
      animation.dataset.activated = String(performance.now());
      setTimeout(() => {
        animation.classList.remove('v-ripple__animation--enter');
        animation.classList.add('v-ripple__animation--in');
        transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
        opacity(animation, 0.08);
      }, 0);
    },
    hide(el) {
      var _el$_ripple3;
      if (!(el != null && (_el$_ripple3 = el._ripple) != null && _el$_ripple3.enabled)) return;
      const ripples = el.getElementsByClassName('v-ripple__animation');
      if (ripples.length === 0) return;
      const animation = ripples[ripples.length - 1];
      if (animation.dataset.isHiding) return;else animation.dataset.isHiding = 'true';
      const diff = performance.now() - Number(animation.dataset.activated);
      const delay = Math.max(250 - diff, 0);
      setTimeout(() => {
        animation.classList.remove('v-ripple__animation--in');
        animation.classList.add('v-ripple__animation--out');
        opacity(animation, 0);
        setTimeout(() => {
          const ripples = el.getElementsByClassName('v-ripple__animation');
          if (ripples.length === 1 && el.dataset.previousPosition) {
            el.style.position = el.dataset.previousPosition;
            delete el.dataset.previousPosition;
          }
          animation.parentNode && el.removeChild(animation.parentNode);
        }, 300);
      }, delay);
    }
  };
  function isRippleEnabled(value) {
    return typeof value === 'undefined' || !!value;
  }
  function rippleShow(e) {
    const value = {};
    const element = e.currentTarget;
    if (!(element != null && element._ripple) || element._ripple.touched || e[stopSymbol]) return;

    // Don't allow the event to trigger ripples on any other elements
    e[stopSymbol] = true;
    if (isTouchEvent(e)) {
      element._ripple.touched = true;
      element._ripple.isTouch = true;
    } else {
      // It's possible for touch events to fire
      // as mouse events on Android/iOS, this
      // will skip the event call if it has
      // already been registered as touch
      if (element._ripple.isTouch) return;
    }
    value.center = element._ripple.centered || isKeyboardEvent(e);
    if (element._ripple.class) {
      value.class = element._ripple.class;
    }
    if (isTouchEvent(e)) {
      // already queued that shows or hides the ripple
      if (element._ripple.showTimerCommit) return;
      element._ripple.showTimerCommit = () => {
        ripples.show(e, element, value);
      };
      element._ripple.showTimer = window.setTimeout(() => {
        var _element$_ripple;
        if (element != null && (_element$_ripple = element._ripple) != null && _element$_ripple.showTimerCommit) {
          element._ripple.showTimerCommit();
          element._ripple.showTimerCommit = null;
        }
      }, DELAY_RIPPLE);
    } else {
      ripples.show(e, element, value);
    }
  }
  function rippleStop(e) {
    e[stopSymbol] = true;
  }
  function rippleHide(e) {
    const element = e.currentTarget;
    if (!element || !element._ripple) return;
    window.clearTimeout(element._ripple.showTimer);

    // The touch interaction occurs before the show timer is triggered.
    // We still want to show ripple effect.
    if (e.type === 'touchend' && element._ripple.showTimerCommit) {
      element._ripple.showTimerCommit();
      element._ripple.showTimerCommit = null;

      // re-queue ripple hiding
      element._ripple.showTimer = window.setTimeout(() => {
        rippleHide(e);
      });
      return;
    }
    window.setTimeout(() => {
      if (element._ripple) {
        element._ripple.touched = false;
      }
    });
    ripples.hide(element);
  }
  function rippleCancelShow(e) {
    const element = e.currentTarget;
    if (!element || !element._ripple) return;
    if (element._ripple.showTimerCommit) {
      element._ripple.showTimerCommit = null;
    }
    window.clearTimeout(element._ripple.showTimer);
  }
  let keyboardRipple = false;
  function keyboardRippleShow(e) {
    if (!keyboardRipple && (e.keyCode === keyCodes.enter || e.keyCode === keyCodes.space)) {
      keyboardRipple = true;
      rippleShow(e);
    }
  }
  function keyboardRippleHide(e) {
    keyboardRipple = false;
    rippleHide(e);
  }
  function focusRippleHide(e) {
    if (keyboardRipple) {
      keyboardRipple = false;
      rippleHide(e);
    }
  }
  function updateRipple(el, binding, wasEnabled) {
    const {
      value,
      modifiers
    } = binding;
    const enabled = isRippleEnabled(value);
    if (!enabled) {
      ripples.hide(el);
    }
    el._ripple = el._ripple ?? {};
    el._ripple.enabled = enabled;
    el._ripple.centered = modifiers.center;
    el._ripple.circle = modifiers.circle;
    if (isObject(value) && value.class) {
      el._ripple.class = value.class;
    }
    if (enabled && !wasEnabled) {
      if (modifiers.stop) {
        el.addEventListener('touchstart', rippleStop, {
          passive: true
        });
        el.addEventListener('mousedown', rippleStop);
        return;
      }
      el.addEventListener('touchstart', rippleShow, {
        passive: true
      });
      el.addEventListener('touchend', rippleHide, {
        passive: true
      });
      el.addEventListener('touchmove', rippleCancelShow, {
        passive: true
      });
      el.addEventListener('touchcancel', rippleHide);
      el.addEventListener('mousedown', rippleShow);
      el.addEventListener('mouseup', rippleHide);
      el.addEventListener('mouseleave', rippleHide);
      el.addEventListener('keydown', keyboardRippleShow);
      el.addEventListener('keyup', keyboardRippleHide);
      el.addEventListener('blur', focusRippleHide);

      // Anchor tags can be dragged, causes other hides to fail - #1537
      el.addEventListener('dragstart', rippleHide, {
        passive: true
      });
    } else if (!enabled && wasEnabled) {
      removeListeners(el);
    }
  }
  function removeListeners(el) {
    el.removeEventListener('mousedown', rippleShow);
    el.removeEventListener('touchstart', rippleShow);
    el.removeEventListener('touchend', rippleHide);
    el.removeEventListener('touchmove', rippleCancelShow);
    el.removeEventListener('touchcancel', rippleHide);
    el.removeEventListener('mouseup', rippleHide);
    el.removeEventListener('mouseleave', rippleHide);
    el.removeEventListener('keydown', keyboardRippleShow);
    el.removeEventListener('keyup', keyboardRippleHide);
    el.removeEventListener('dragstart', rippleHide);
    el.removeEventListener('blur', focusRippleHide);
  }
  function mounted$1(el, binding) {
    updateRipple(el, binding, false);
  }
  function unmounted$1(el) {
    delete el._ripple;
    removeListeners(el);
  }
  function updated(el, binding) {
    if (binding.value === binding.oldValue) {
      return;
    }
    const wasEnabled = isRippleEnabled(binding.oldValue);
    updateRipple(el, binding, wasEnabled);
  }
  const Ripple = {
    mounted: mounted$1,
    unmounted: unmounted$1,
    updated
  };

  // Types

  const makeSelectionControlProps = propsFactory({
    label: String,
    trueValue: null,
    falseValue: null,
    value: null,
    ...makeSelectionControlGroupProps()
  }, 'v-selection-control');
  function useSelectionControl(props) {
    const group = vue.inject(VSelectionControlGroupSymbol, undefined);
    const {
      densityClasses
    } = useDensity(props);
    const modelValue = useProxiedModel(props, 'modelValue');
    const trueValue = vue.computed(() => props.trueValue !== undefined ? props.trueValue : props.value !== undefined ? props.value : true);
    const falseValue = vue.computed(() => props.falseValue !== undefined ? props.falseValue : false);
    const isMultiple = vue.computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
    const model = vue.computed({
      get() {
        const val = group ? group.modelValue.value : modelValue.value;
        return isMultiple.value ? val.some(v => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
      },
      set(val) {
        if (props.readonly) return;
        const currentValue = val ? trueValue.value : falseValue.value;
        let newVal = currentValue;
        if (isMultiple.value) {
          newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter(item => !props.valueComparator(item, trueValue.value));
        }
        if (group) {
          group.modelValue.value = newVal;
        } else {
          modelValue.value = newVal;
        }
      }
    });
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(vue.computed(() => {
      return model.value && !props.error && !props.disabled ? props.color : undefined;
    }));
    const icon = vue.computed(() => model.value ? props.trueIcon : props.falseIcon);
    return {
      group,
      densityClasses,
      trueValue,
      falseValue,
      model,
      textColorClasses,
      textColorStyles,
      icon
    };
  }
  const VSelectionControl = genericComponent()({
    name: 'VSelectionControl',
    directives: {
      Ripple
    },
    inheritAttrs: false,
    props: makeSelectionControlProps(),
    emits: {
      'update:modelValue': val => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        group,
        densityClasses,
        icon,
        model,
        textColorClasses,
        textColorStyles,
        trueValue
      } = useSelectionControl(props);
      const uid = getUid();
      const id = vue.computed(() => props.id || `input-${uid}`);
      const isFocused = vue.ref(false);
      const isFocusVisible = vue.ref(false);
      const input = vue.ref();
      group == null ? void 0 : group.onForceUpdate(() => {
        if (input.value) {
          input.value.checked = model.value;
        }
      });
      function onFocus(e) {
        isFocused.value = true;
        if (!SUPPORTS_FOCUS_VISIBLE || SUPPORTS_FOCUS_VISIBLE && e.target.matches(':focus-visible')) {
          isFocusVisible.value = true;
        }
      }
      function onBlur() {
        isFocused.value = false;
        isFocusVisible.value = false;
      }
      function onInput(e) {
        if (props.readonly && group) {
          vue.nextTick(() => group.forceUpdate());
        }
        model.value = e.target.checked;
      }
      useRender(() => {
        var _slots$default, _slots$input;
        const label = slots.label ? slots.label({
          label: props.label,
          props: {
            for: id.value
          }
        }) : props.label;
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        return vue.createVNode("div", vue.mergeProps({
          "class": ['v-selection-control', {
            'v-selection-control--dirty': model.value,
            'v-selection-control--disabled': props.disabled,
            'v-selection-control--error': props.error,
            'v-selection-control--focused': isFocused.value,
            'v-selection-control--focus-visible': isFocusVisible.value,
            'v-selection-control--inline': props.inline
          }, densityClasses.value]
        }, rootAttrs), [vue.createVNode("div", {
          "class": ['v-selection-control__wrapper', textColorClasses.value],
          "style": textColorStyles.value
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), vue.withDirectives(vue.createVNode("div", {
          "class": ['v-selection-control__input']
        }, [icon.value && vue.createVNode(VIcon, {
          "key": "icon",
          "icon": icon.value
        }, null), vue.createVNode("input", vue.mergeProps({
          "ref": input,
          "checked": model.value,
          "disabled": props.disabled,
          "id": id.value,
          "onBlur": onBlur,
          "onFocus": onFocus,
          "onInput": onInput,
          "aria-disabled": props.readonly,
          "type": props.type,
          "value": trueValue.value,
          "name": props.name,
          "aria-checked": props.type === 'checkbox' ? model.value : undefined
        }, inputAttrs), null), (_slots$input = slots.input) == null ? void 0 : _slots$input.call(slots, {
          model,
          textColorClasses,
          textColorStyles,
          props: {
            onFocus,
            onBlur,
            id: id.value
          }
        })]), [[vue.resolveDirective("ripple"), props.ripple && [!props.disabled && !props.readonly, null, ['center', 'circle']]]])]), label && vue.createVNode(VLabel, {
          "for": id.value,
          "clickable": true
        }, {
          default: () => [label]
        })]);
      });
      return {
        isFocused,
        input
      };
    }
  });

  // Types

  const makeVCheckboxBtnProps = propsFactory({
    indeterminate: Boolean,
    indeterminateIcon: {
      type: IconValue,
      default: '$checkboxIndeterminate'
    },
    ...makeSelectionControlProps({
      falseIcon: '$checkboxOff',
      trueIcon: '$checkboxOn'
    })
  }, 'v-checkbox-btn');
  const VCheckboxBtn = defineComponent({
    name: 'VCheckboxBtn',
    props: makeVCheckboxBtnProps(),
    emits: {
      'update:modelValue': value => true,
      'update:indeterminate': val => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const indeterminate = useProxiedModel(props, 'indeterminate');
      const model = useProxiedModel(props, 'modelValue');
      function onChange(v) {
        if (indeterminate.value) {
          indeterminate.value = false;
        }
      }
      const falseIcon = vue.computed(() => {
        return props.indeterminate ? props.indeterminateIcon : props.falseIcon;
      });
      const trueIcon = vue.computed(() => {
        return props.indeterminate ? props.indeterminateIcon : props.trueIcon;
      });
      useRender(() => vue.createVNode(VSelectionControl, vue.mergeProps(props, {
        "modelValue": model.value,
        "onUpdate:modelValue": [$event => model.value = $event, onChange],
        "class": "v-checkbox-btn",
        "type": "checkbox",
        "inline": true,
        "falseIcon": falseIcon.value,
        "trueIcon": trueIcon.value,
        "aria-checked": props.indeterminate ? 'mixed' : undefined
      }), slots));
      return {};
    }
  });

  const VDataTableColumn = defineFunctionalComponent({
    align: {
      type: String,
      default: 'start'
    },
    fixed: Boolean,
    fixedOffset: [Number, String],
    height: [Number, String],
    lastFixed: Boolean,
    noPadding: Boolean,
    tag: String,
    width: [Number, String]
  }, (props, _ref) => {
    var _slots$default;
    let {
      slots,
      attrs
    } = _ref;
    const Tag = props.tag ?? 'td';
    return vue.createVNode(Tag, vue.mergeProps({
      "class": ['v-data-table__td', {
        'v-data-table-column--fixed': props.fixed,
        'v-data-table-column--last-fixed': props.lastFixed,
        'v-data-table-column--no-padding': props.noPadding
      }, `v-data-table-column--align-${props.align}`],
      "style": {
        height: convertToUnit(props.height),
        width: convertToUnit(props.width),
        left: convertToUnit(props.fixedOffset || null)
      }
    }, attrs), {
      default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
    });
  });

  // Utilities

  // Types

  // Composables
  const makeRoundedProps = propsFactory({
    rounded: {
      type: [Boolean, Number, String],
      default: undefined
    }
  }, 'rounded');
  function useRounded(props) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
    const roundedClasses = vue.computed(() => {
      const rounded = vue.isRef(props) ? props.value : props.rounded;
      const classes = [];
      if (rounded === true || rounded === '') {
        classes.push(`${name}--rounded`);
      } else if (typeof rounded === 'string' || rounded === 0) {
        for (const value of String(rounded).split(' ')) {
          classes.push(`rounded-${value}`);
        }
      }
      return classes;
    });
    return {
      roundedClasses
    };
  }

  // Utilities
  function useIntersectionObserver(callback) {
    const intersectionRef = vue.ref();
    const isIntersecting = vue.ref(false);
    if (SUPPORTS_INTERSECTION) {
      const observer = new IntersectionObserver(entries => {
        callback == null ? void 0 : callback(entries, observer);
        isIntersecting.value = !!entries.find(entry => entry.isIntersecting);
      });
      vue.onBeforeUnmount(() => {
        observer.disconnect();
      });
      vue.watch(intersectionRef, (newValue, oldValue) => {
        if (oldValue) {
          observer.unobserve(oldValue);
          isIntersecting.value = false;
        }
        if (newValue) observer.observe(newValue);
      }, {
        flush: 'post'
      });
    }
    return {
      intersectionRef,
      isIntersecting
    };
  }

  const VProgressLinear = defineComponent({
    name: 'VProgressLinear',
    props: {
      active: {
        type: Boolean,
        default: true
      },
      bgColor: String,
      bgOpacity: [Number, String],
      bufferValue: {
        type: [Number, String],
        default: 0
      },
      clickable: Boolean,
      color: String,
      height: {
        type: [Number, String],
        default: 4
      },
      indeterminate: Boolean,
      max: {
        type: [Number, String],
        default: 100
      },
      modelValue: {
        type: [Number, String],
        default: 0
      },
      reverse: Boolean,
      stream: Boolean,
      striped: Boolean,
      roundedBar: Boolean,
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    emits: {
      'update:modelValue': value => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const progress = useProxiedModel(props, 'modelValue');
      const {
        isRtl
      } = useRtl();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(props, 'color');
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.computed(() => props.bgColor || props.color));
      const {
        backgroundColorClasses: barColorClasses,
        backgroundColorStyles: barColorStyles
      } = useBackgroundColor(props, 'color');
      const {
        roundedClasses
      } = useRounded(props);
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver();
      const max = vue.computed(() => parseInt(props.max, 10));
      const height = vue.computed(() => parseInt(props.height, 10));
      const normalizedBuffer = vue.computed(() => parseFloat(props.bufferValue) / max.value * 100);
      const normalizedValue = vue.computed(() => parseFloat(progress.value) / max.value * 100);
      const isReversed = vue.computed(() => isRtl.value !== props.reverse);
      const transition = vue.computed(() => props.indeterminate ? 'fade-transition' : 'slide-x-transition');
      const opacity = vue.computed(() => {
        return props.bgOpacity == null ? props.bgOpacity : parseFloat(props.bgOpacity);
      });
      function handleClick(e) {
        if (!intersectionRef.value) return;
        const {
          left,
          right,
          width
        } = intersectionRef.value.getBoundingClientRect();
        const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
        progress.value = Math.round(value / width * max.value);
      }
      useRender(() => vue.createVNode(props.tag, {
        "ref": intersectionRef,
        "class": ['v-progress-linear', {
          'v-progress-linear--active': props.active && isIntersecting.value,
          'v-progress-linear--reverse': isReversed.value,
          'v-progress-linear--rounded': props.rounded,
          'v-progress-linear--rounded-bar': props.roundedBar,
          'v-progress-linear--striped': props.striped
        }, roundedClasses.value, themeClasses.value],
        "style": {
          height: props.active ? convertToUnit(height.value) : 0,
          '--v-progress-linear-height': convertToUnit(height.value)
        },
        "role": "progressbar",
        "aria-hidden": props.active ? 'false' : 'true',
        "aria-valuemin": "0",
        "aria-valuemax": props.max,
        "aria-valuenow": props.indeterminate ? undefined : normalizedValue.value,
        "onClick": props.clickable && handleClick
      }, {
        default: () => [props.stream && vue.createVNode("div", {
          "key": "stream",
          "class": ['v-progress-linear__stream', textColorClasses.value],
          "style": {
            ...textColorStyles.value,
            [isReversed.value ? 'left' : 'right']: convertToUnit(-height.value),
            borderTop: `${convertToUnit(height.value / 2)} dotted`,
            opacity: opacity.value,
            top: `calc(50% - ${convertToUnit(height.value / 4)})`,
            width: convertToUnit(100 - normalizedBuffer.value, '%'),
            '--v-progress-linear-stream-to': convertToUnit(height.value * (isReversed.value ? 1 : -1))
          }
        }, null), vue.createVNode("div", {
          "class": ['v-progress-linear__background', backgroundColorClasses.value],
          "style": [backgroundColorStyles.value, {
            opacity: opacity.value,
            width: convertToUnit(!props.stream ? 100 : normalizedBuffer.value, '%')
          }]
        }, null), vue.createVNode(vue.Transition, {
          "name": transition.value
        }, {
          default: () => [!props.indeterminate ? vue.createVNode("div", {
            "class": ['v-progress-linear__determinate', barColorClasses.value],
            "style": [barColorStyles.value, {
              width: convertToUnit(normalizedValue.value, '%')
            }]
          }, null) : vue.createVNode("div", {
            "class": "v-progress-linear__indeterminate"
          }, [['long', 'short'].map(bar => vue.createVNode("div", {
            "key": bar,
            "class": ['v-progress-linear__indeterminate', bar, barColorClasses.value],
            "style": barColorStyles.value
          }, null))])]
        }), slots.default && vue.createVNode("div", {
          "class": "v-progress-linear__content"
        }, [slots.default({
          value: normalizedValue.value,
          buffer: normalizedBuffer.value
        })])]
      }));
      return {};
    }
  });

  // Types

  // Composables
  const makeLoaderProps = propsFactory({
    loading: [Boolean, String]
  }, 'loader');
  function useLoader(props) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
    const loaderClasses = vue.computed(() => ({
      [`${name}--loading`]: props.loading
    }));
    return {
      loaderClasses
    };
  }
  function LoaderSlot(props, _ref) {
    var _slots$default;
    let {
      slots
    } = _ref;
    return vue.createVNode("div", {
      "class": `${props.name}__loader`
    }, [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
      color: props.color,
      isActive: props.active
    })) || vue.createVNode(VProgressLinear, {
      "active": props.active,
      "color": props.color,
      "height": "2",
      "indeterminate": true
    }, null)]);
  }

  // Utilities

  // Types

  const makeDataTableHeaderProps = propsFactory({
    headers: {
      type: Array,
      default: () => []
    }
  }, 'v-data-table-header');
  const VDataTableHeadersSymbol = Symbol.for('vuetify:data-table-headers');
  function createHeaders(props, options) {
    const headers = vue.ref([]);
    const columns = vue.ref([]);
    vue.watch(() => props.headers, () => {
      var _options$groupBy, _options$showSelect, _options$showExpand;
      const wrapped = !props.headers.length ? [] : Array.isArray(props.headers[0]) ? props.headers : [props.headers];
      const flat = wrapped.flatMap((row, index) => row.map(column => ({
        column,
        row: index
      })));
      const rowCount = wrapped.length;
      const defaultHeader = {
        title: '',
        sortable: false
      };
      const defaultActionHeader = {
        ...defaultHeader,
        width: 48
      };
      if (options != null && (_options$groupBy = options.groupBy) != null && _options$groupBy.value.length) {
        const index = flat.findIndex(_ref => {
          let {
            column
          } = _ref;
          return column.key === 'data-table-group';
        });
        if (index < 0) flat.unshift({
          column: {
            ...defaultHeader,
            key: 'data-table-group',
            title: 'Group',
            rowspan: rowCount
          },
          row: 0
        });else flat.splice(index, 1, {
          column: {
            ...defaultHeader,
            ...flat[index].column
          },
          row: flat[index].row
        });
      }
      if (options != null && (_options$showSelect = options.showSelect) != null && _options$showSelect.value) {
        const index = flat.findIndex(_ref2 => {
          let {
            column
          } = _ref2;
          return column.key === 'data-table-select';
        });
        if (index < 0) flat.unshift({
          column: {
            ...defaultActionHeader,
            key: 'data-table-select',
            rowspan: rowCount
          },
          row: 0
        });else flat.splice(index, 1, {
          column: {
            ...defaultActionHeader,
            ...flat[index].column
          },
          row: flat[index].row
        });
      }
      if (options != null && (_options$showExpand = options.showExpand) != null && _options$showExpand.value) {
        const index = flat.findIndex(_ref3 => {
          let {
            column
          } = _ref3;
          return column.key === 'data-table-expand';
        });
        if (index < 0) flat.push({
          column: {
            ...defaultActionHeader,
            key: 'data-table-expand',
            rowspan: rowCount
          },
          row: 0
        });else flat.splice(index, 1, {
          column: {
            ...defaultActionHeader,
            ...flat[index].column
          },
          row: flat[index].row
        });
      }
      const fixedRows = createRange(rowCount).map(() => []);
      const fixedOffsets = createRange(rowCount).fill(0);
      let count = 0;
      flat.forEach(_ref4 => {
        let {
          column,
          row
        } = _ref4;
        const id = column.key ?? `data-table-column-${count++}`;
        for (let i = row; i <= row + (column.rowspan ?? 1) - 1; i++) {
          fixedRows[i].push({
            ...column,
            key: id,
            fixedOffset: fixedOffsets[i],
            sortable: column.sortable ?? !!column.key
          });
          fixedOffsets[i] += column.width ?? 0;
        }
      });
      fixedRows.forEach(row => {
        for (let i = row.length; i--; i >= 0) {
          if (row[i].fixed) {
            row[i].lastFixed = true;
            return;
          }
        }
      });
      const seen = new Set();
      headers.value = fixedRows.map(row => {
        const filtered = [];
        for (const column of row) {
          if (!seen.has(column.key)) {
            seen.add(column.key);
            filtered.push(column);
          }
        }
        return filtered;
      });
      columns.value = fixedRows.at(-1) ?? [];
    }, {
      deep: true,
      immediate: true
    });
    const data = {
      headers,
      columns
    };
    vue.provide(VDataTableHeadersSymbol, data);
    return data;
  }
  function useHeaders() {
    const data = vue.inject(VDataTableHeadersSymbol);
    if (!data) throw new Error('Missing headers!');
    return data;
  }

  // Composables

  // Types

  const makeDataTableSelectProps = propsFactory({
    showSelect: Boolean,
    modelValue: {
      type: Array,
      default: () => []
    }
  }, 'v-data-table-select');
  const VDataTableSelectionSymbol = Symbol.for('vuetify:data-table-selection');
  function createSelection(props, allItems) {
    const selected = useProxiedModel(props, 'modelValue', props.modelValue, v => {
      return new Set(v);
    }, v => {
      return [...v.values()];
    });
    function isSelected(items) {
      return items.every(item => selected.value.has(item.value));
    }
    function isSomeSelected(items) {
      return items.some(item => selected.value.has(item.value));
    }
    function select(items, value) {
      const newSelected = new Set(selected.value);
      for (const item of items) {
        if (value) newSelected.add(item.value);else newSelected.delete(item.value);
      }
      selected.value = newSelected;
    }
    function toggleSelect(item) {
      select([item], !isSelected([item]));
    }
    function selectAll(value) {
      select(allItems.value, value);
    }
    const someSelected = vue.computed(() => selected.value.size > 0);
    const allSelected = vue.computed(() => isSelected(allItems.value));
    const data = {
      toggleSelect,
      select,
      selectAll,
      isSelected,
      isSomeSelected,
      someSelected,
      allSelected
    };
    vue.provide(VDataTableSelectionSymbol, data);
    return data;
  }
  function useSelection() {
    const data = vue.inject(VDataTableSelectionSymbol);
    if (!data) throw new Error('Missing selection!');
    return data;
  }

  // Composables

  // Types

  const makeDataTableSortProps = propsFactory({
    sortBy: {
      type: Array,
      default: () => []
    },
    multiSort: Boolean,
    mustSort: Boolean
  }, 'v-data-table-sort');
  const VDataTableSortSymbol = Symbol.for('vuetify:data-table-sort');
  function createSort(props) {
    const sortBy = useProxiedModel(props, 'sortBy');
    const toggleSort = key => {
      var _sortBy$value;
      let newSortBy = ((_sortBy$value = sortBy.value) == null ? void 0 : _sortBy$value.map(x => ({
        ...x
      }))) ?? [];
      const item = newSortBy.find(x => x.key === key);
      if (!item) {
        if (props.multiSort) newSortBy = [...newSortBy, {
          key,
          order: 'asc'
        }];else newSortBy = [{
          key,
          order: 'asc'
        }];
      } else if (item.order === 'desc') {
        if (props.mustSort) {
          item.order = 'asc';
        } else {
          newSortBy = newSortBy.filter(x => x.key !== key);
        }
      } else {
        item.order = 'desc';
      }
      sortBy.value = newSortBy;
    };
    const data = {
      sortBy,
      toggleSort
    };
    vue.provide(VDataTableSortSymbol, data);
    return data;
  }
  function useSort() {
    const data = vue.inject(VDataTableSortSymbol);
    if (!data) throw new Error('Missing sort!');
    return data;
  }
  function useSortedItems(items, sortBy, columns) {
    // TODO: Put this in separate prop customKeySort to match filter composable?
    const customSorters = vue.computed(() => {
      return columns.value.reduce((obj, item) => {
        if (item.sort) obj[item.key] = item.sort;
        return obj;
      }, {});
    });
    const sortedItems = vue.computed(() => {
      var _sortBy$value2;
      if (!((_sortBy$value2 = sortBy.value) != null && _sortBy$value2.length)) return items.value;
      return sortItems(items.value, sortBy.value, 'en', customSorters.value);
    });
    return {
      sortedItems
    };
  }
  function sortItems(items, sortByItems, locale, customSorters) {
    const stringCollator = new Intl.Collator(locale, {
      sensitivity: 'accent',
      usage: 'sort'
    });
    return [...items].sort((a, b) => {
      for (let i = 0; i < sortByItems.length; i++) {
        const sortKey = sortByItems[i].key;
        const sortOrder = sortByItems[i].order;
        if (sortOrder === false) continue;
        let sortA = getObjectValueByPath(a.raw, sortKey);
        let sortB = getObjectValueByPath(b.raw, sortKey);
        if (sortOrder === 'desc') {
          [sortA, sortB] = [sortB, sortA];
        }
        if (customSorters != null && customSorters[sortKey]) {
          const customResult = customSorters[sortKey](sortA, sortB);
          if (!customResult) continue;
          return customResult;
        }

        // Check if both cannot be evaluated
        if (sortA == null || sortB == null) {
          continue;
        }

        // Dates should be compared numerically
        if (sortA instanceof Date && sortB instanceof Date) {
          return sortA.getTime() - sortB.getTime();
        }
        [sortA, sortB] = [sortA, sortB].map(s => (s || '').toString().toLocaleLowerCase());
        if (sortA !== sortB) {
          if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
          return stringCollator.compare(sortA, sortB);
        }
      }
      return 0;
    });
  }

  // Types

  const VDataTableHeaders = defineComponent({
    name: 'VDataTableHeaders',
    props: {
      color: String,
      sticky: Boolean,
      multiSort: Boolean,
      sortAscIcon: {
        type: IconValue,
        default: '$sortAsc'
      },
      sortDescIcon: {
        type: IconValue,
        default: '$sortDesc'
      },
      ...makeLoaderProps()
    },
    setup(props, _ref) {
      let {
        slots,
        emit
      } = _ref;
      const {
        toggleSort,
        sortBy
      } = useSort();
      const {
        someSelected,
        allSelected,
        selectAll
      } = useSelection();
      const {
        columns,
        headers
      } = useHeaders();
      const {
        loaderClasses
      } = useLoader(props);
      const getFixedStyles = (column, y) => {
        if (!props.sticky && !column.fixed) return null;
        return {
          position: 'sticky',
          zIndex: column.fixed ? 4 : props.sticky ? 3 : undefined,
          // TODO: This needs to account for possible previous fixed columns.
          left: column.fixed ? convertToUnit(column.fixedOffset) : undefined,
          // TODO: This needs to account for possible row/colspan of previous columns
          top: props.sticky ? `calc(var(--v-table-header-height) * ${y})` : undefined
        };
      };
      function getSortIcon(id) {
        const item = sortBy.value.find(item => item.key === id);
        if (!item) return props.sortAscIcon;
        return item.order === 'asc' ? props.sortAscIcon : props.sortDescIcon;
      }
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(props, 'color');
      const VDataTableHeaderCell = _ref2 => {
        let {
          column,
          x,
          y
        } = _ref2;
        const isSorted = !!sortBy.value.find(x => x.key === column.key);
        const noPadding = column.key === 'data-table-select' || column.key === 'data-table-expand';
        return vue.createVNode(VDataTableColumn, {
          "tag": "th",
          "align": column.align,
          "class": ['v-data-table__th', {
            'v-data-table__th--sortable': column.sortable,
            'v-data-table__th--sorted': isSorted
          }, loaderClasses.value],
          "style": {
            width: convertToUnit(column.width),
            minWidth: convertToUnit(column.width),
            ...getFixedStyles(column, y)
          },
          "colspan": column.colspan,
          "rowspan": column.rowspan,
          "onClick": column.sortable ? () => toggleSort(column.key) : undefined,
          "lastFixed": column.lastFixed,
          "noPadding": noPadding
        }, {
          default: () => {
            const slotName = `column.${column.key}`;
            const slotProps = {
              column,
              selectAll
            };
            if (slots[slotName]) return slots[slotName](slotProps);
            if (column.key === 'data-table-select') {
              var _slots$columnDataTa;
              return ((_slots$columnDataTa = slots['column.data-table-select']) == null ? void 0 : _slots$columnDataTa.call(slots, slotProps)) ?? vue.createVNode(VCheckboxBtn, {
                "modelValue": allSelected.value,
                "indeterminate": someSelected.value && !allSelected.value,
                "onUpdate:modelValue": selectAll
              }, null);
            }
            return vue.createVNode("div", {
              "class": "v-data-table-header__content"
            }, [vue.createVNode("span", null, [column.title]), column.sortable && vue.createVNode(VIcon, {
              "key": "icon",
              "class": "v-data-table-header__sort-icon",
              "icon": getSortIcon(column.key)
            }, null), props.multiSort && isSorted && vue.createVNode("div", {
              "key": "badge",
              "class": ['v-data-table-header__sort-badge', ...backgroundColorClasses.value],
              "style": backgroundColorStyles.value
            }, [sortBy.value.findIndex(x => x.key === column.key) + 1])]);
          }
        });
      };
      useRender(() => vue.createVNode(vue.Fragment, null, [headers.value.map((row, y) => vue.createVNode("tr", null, [row.map((column, x) => vue.createVNode(VDataTableHeaderCell, {
        "column": column,
        "x": x,
        "y": y
      }, null))])), props.loading && vue.createVNode("tr", {
        "class": "v-data-table__progress"
      }, [vue.createVNode("th", {
        "colspan": columns.value.length
      }, [vue.createVNode(LoaderSlot, {
        "name": "v-data-table-headers",
        "active": true,
        "color": typeof props.loading === 'boolean' ? undefined : props.loading,
        "indeterminate": true
      }, {
        default: slots.loader
      })])])]));
    }
  });

  // Utilities

  // Types

  // Composables
  const makeBorderProps = propsFactory({
    border: [Boolean, Number, String]
  }, 'border');
  function useBorder(props) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
    const borderClasses = vue.computed(() => {
      const border = vue.isRef(props) ? props.value : props.border;
      const classes = [];
      if (border === true || border === '') {
        classes.push(`${name}--border`);
      } else if (typeof border === 'string' || border === 0) {
        for (const value of String(border).split(' ')) {
          classes.push(`border-${value}`);
        }
      }
      return classes;
    });
    return {
      borderClasses
    };
  }

  // Utilities

  // Types

  // Composables
  const makeElevationProps = propsFactory({
    elevation: {
      type: [Number, String],
      validator(v) {
        const value = parseInt(v);
        return !isNaN(value) && value >= 0 &&
        // Material Design has a maximum elevation of 24
        // https://material.io/design/environment/elevation.html#default-elevations
        value <= 24;
      }
    }
  }, 'elevation');
  function useElevation(props) {
    const elevationClasses = vue.computed(() => {
      const elevation = vue.isRef(props) ? props.value : props.elevation;
      const classes = [];
      if (elevation == null) return classes;
      classes.push(`elevation-${elevation}`);
      return classes;
    });
    return {
      elevationClasses
    };
  }

  // Types

  const allowedVariants$1 = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'];
  function genOverlays(isClickable, name) {
    return vue.createVNode(vue.Fragment, null, [isClickable && vue.createVNode("span", {
      "key": "overlay",
      "class": `${name}__overlay`
    }, null), vue.createVNode("span", {
      "key": "underlay",
      "class": `${name}__underlay`
    }, null)]);
  }
  const makeVariantProps = propsFactory({
    color: String,
    variant: {
      type: String,
      default: 'elevated',
      validator: v => allowedVariants$1.includes(v)
    }
  }, 'variant');
  function useVariant(props) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
    const variantClasses = vue.computed(() => {
      const {
        variant
      } = vue.unref(props);
      return `${name}--variant-${variant}`;
    });
    const {
      colorClasses,
      colorStyles
    } = useColor(vue.computed(() => {
      const {
        variant,
        color
      } = vue.unref(props);
      return {
        [['elevated', 'flat'].includes(variant) ? 'background' : 'text']: color
      };
    }));
    return {
      colorClasses,
      colorStyles,
      variantClasses
    };
  }

  const VBtnGroup = defineComponent({
    name: 'VBtnGroup',
    props: {
      divided: Boolean,
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeElevationProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      provideDefaults({
        VBtn: {
          height: 'auto',
          color: vue.toRef(props, 'color'),
          density: vue.toRef(props, 'density'),
          flat: true,
          variant: vue.toRef(props, 'variant')
        }
      });
      useRender(() => {
        return vue.createVNode(props.tag, {
          "class": ['v-btn-group', {
            'v-btn-group--divided': props.divided
          }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value]
        }, slots);
      });
    }
  });

  // Composables

  // Types

  const makeGroupProps = propsFactory({
    modelValue: {
      type: null,
      default: undefined
    },
    multiple: Boolean,
    mandatory: [Boolean, String],
    max: Number,
    selectedClass: String,
    disabled: Boolean
  }, 'group');
  const makeGroupItemProps = propsFactory({
    value: null,
    disabled: Boolean,
    selectedClass: String
  }, 'group-item');
  function useGroupItem(props, injectKey) {
    let required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    const vm = getCurrentInstance('useGroupItem');
    if (!vm) {
      throw new Error('[Vuetify] useGroupItem composable must be used inside a component setup function');
    }
    const id = getUid();
    vue.provide(Symbol.for(`${injectKey.description}:id`), id);
    const group = vue.inject(injectKey, null);
    if (!group) {
      if (!required) return group;
      throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
    }
    const value = vue.toRef(props, 'value');
    const disabled = vue.computed(() => group.disabled.value || props.disabled);
    group.register({
      id,
      value,
      disabled
    }, vm);
    vue.onBeforeUnmount(() => {
      group.unregister(id);
    });
    const isSelected = vue.computed(() => {
      return group.isSelected(id);
    });
    const selectedClass = vue.computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
    vue.watch(isSelected, value => {
      vm.emit('group:selected', {
        value
      });
    });
    return {
      id,
      isSelected,
      toggle: () => group.select(id, !isSelected.value),
      select: value => group.select(id, value),
      selectedClass,
      value,
      disabled,
      group
    };
  }
  function useGroup(props, injectKey) {
    let isUnmounted = false;
    const items = vue.reactive([]);
    const selected = useProxiedModel(props, 'modelValue', [], v => {
      if (v == null) return [];
      return getIds(items, wrapInArray(v));
    }, v => {
      const arr = getValues(items, v);
      return props.multiple ? arr : arr[0];
    });
    const groupVm = getCurrentInstance('useGroup');
    function register(item, vm) {
      // Is there a better way to fix this typing?
      const unwrapped = item;
      const key = Symbol.for(`${injectKey.description}:id`);
      const children = findChildrenWithProvide(key, groupVm == null ? void 0 : groupVm.vnode);
      const index = children.indexOf(vm);
      if (index > -1) {
        items.splice(index, 0, unwrapped);
      } else {
        items.push(unwrapped);
      }
    }
    function unregister(id) {
      if (isUnmounted) return;

      // TODO: re-evaluate this line's importance in the future
      // should we only modify the model if mandatory is set.
      // selected.value = selected.value.filter(v => v !== id)

      forceMandatoryValue();
      const index = items.findIndex(item => item.id === id);
      items.splice(index, 1);
    }

    // If mandatory and nothing is selected, then select first non-disabled item
    function forceMandatoryValue() {
      const item = items.find(item => !item.disabled);
      if (item && props.mandatory === 'force' && !selected.value.length) {
        selected.value = [item.id];
      }
    }
    vue.onMounted(() => {
      forceMandatoryValue();
    });
    vue.onBeforeUnmount(() => {
      isUnmounted = true;
    });
    function select(id, value) {
      const item = items.find(item => item.id === id);
      if (value && item != null && item.disabled) return;
      if (props.multiple) {
        const internalValue = selected.value.slice();
        const index = internalValue.findIndex(v => v === id);
        const isSelected = ~index;
        value = value ?? !isSelected;

        // We can't remove value if group is
        // mandatory, value already exists,
        // and it is the only value
        if (isSelected && props.mandatory && internalValue.length <= 1) return;

        // We can't add value if it would
        // cause max limit to be exceeded
        if (!isSelected && props.max != null && internalValue.length + 1 > props.max) return;
        if (index < 0 && value) internalValue.push(id);else if (index >= 0 && !value) internalValue.splice(index, 1);
        selected.value = internalValue;
      } else {
        const isSelected = selected.value.includes(id);
        if (props.mandatory && isSelected) return;
        selected.value = value ?? !isSelected ? [id] : [];
      }
    }
    function step(offset) {
      // getting an offset from selected value obviously won't work with multiple values
      if (props.multiple) consoleWarn('This method is not supported when using "multiple" prop');
      if (!selected.value.length) {
        const item = items.find(item => !item.disabled);
        item && (selected.value = [item.id]);
      } else {
        const currentId = selected.value[0];
        const currentIndex = items.findIndex(i => i.id === currentId);
        let newIndex = (currentIndex + offset) % items.length;
        let newItem = items[newIndex];
        while (newItem.disabled && newIndex !== currentIndex) {
          newIndex = (newIndex + offset) % items.length;
          newItem = items[newIndex];
        }
        if (newItem.disabled) return;
        selected.value = [items[newIndex].id];
      }
    }
    const state = {
      register,
      unregister,
      selected,
      select,
      disabled: vue.toRef(props, 'disabled'),
      prev: () => step(items.length - 1),
      next: () => step(1),
      isSelected: id => selected.value.includes(id),
      selectedClass: vue.computed(() => props.selectedClass),
      items: vue.computed(() => items),
      getItemIndex: value => getItemIndex(items, value)
    };
    vue.provide(injectKey, state);
    return state;
  }
  function getItemIndex(items, value) {
    const ids = getIds(items, [value]);
    if (!ids.length) return -1;
    return items.findIndex(item => item.id === ids[0]);
  }
  function getIds(items, modelValue) {
    const ids = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.value != null) {
        if (modelValue.find(value => deepEqual(value, item.value)) != null) {
          ids.push(item.id);
        }
      } else if (modelValue.includes(i)) {
        ids.push(item.id);
      }
    }
    return ids;
  }
  function getValues(items, ids) {
    const values = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (ids.includes(item.id)) {
        values.push(item.value != null ? item.value : i);
      }
    }
    return values;
  }

  // Types

  const VBtnToggleSymbol = Symbol.for('vuetify:v-btn-toggle');
  genericComponent()({
    name: 'VBtnToggle',
    props: makeGroupProps(),
    emits: {
      'update:modelValue': value => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        isSelected,
        next,
        prev,
        select,
        selected
      } = useGroup(props, VBtnToggleSymbol);
      useRender(() => {
        var _slots$default;
        return vue.createVNode(VBtnGroup, {
          "class": "v-btn-toggle"
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isSelected,
            next,
            prev,
            select,
            selected
          })]
        });
      });
      return {
        next,
        prev,
        select
      };
    }
  });

  // Composables

  // Types

  const VDefaultsProvider = vue.defineComponent({
    name: 'VDefaultsProvider',
    props: {
      defaults: Object,
      reset: [Number, String],
      root: Boolean,
      scoped: Boolean
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        defaults,
        reset,
        root,
        scoped
      } = vue.toRefs(props);
      provideDefaults(defaults, {
        reset,
        root,
        scoped
      });
      return () => {
        var _slots$default;
        return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
      };
    }
  });

  // Utilities
  function useResizeObserver(callback) {
    const resizeRef = vue.ref();
    const contentRect = vue.ref();
    if (IN_BROWSER) {
      const observer = new ResizeObserver(entries => {
        callback == null ? void 0 : callback(entries, observer);
        if (!entries.length) return;
        contentRect.value = entries[0].contentRect;
      });
      vue.onBeforeUnmount(() => {
        observer.disconnect();
      });
      vue.watch(resizeRef, (newValue, oldValue) => {
        if (oldValue) {
          observer.unobserve(oldValue);
          contentRect.value = undefined;
        }
        if (newValue) observer.observe(newValue);
      }, {
        flush: 'post'
      });
    }
    return {
      resizeRef,
      contentRect: vue.readonly(contentRect)
    };
  }

  // Types

  const VProgressCircular = defineComponent({
    name: 'VProgressCircular',
    props: {
      bgColor: String,
      color: String,
      indeterminate: [Boolean, String],
      modelValue: {
        type: [Number, String],
        default: 0
      },
      rotate: {
        type: [Number, String],
        default: 0
      },
      width: {
        type: [Number, String],
        default: 4
      },
      ...makeSizeProps(),
      ...makeTagProps({
        tag: 'div'
      }),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const MAGIC_RADIUS_CONSTANT = 20;
      const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
      const root = vue.ref();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, 'color'));
      const {
        textColorClasses: underlayColorClasses,
        textColorStyles: underlayColorStyles
      } = useTextColor(vue.toRef(props, 'bgColor'));
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver();
      const {
        resizeRef,
        contentRect
      } = useResizeObserver();
      const normalizedValue = vue.computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
      const width = vue.computed(() => Number(props.width));
      const size = vue.computed(() => {
        // Get size from element if size prop value is small, large etc
        return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
      });
      const diameter = vue.computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
      const strokeWidth = vue.computed(() => width.value / size.value * diameter.value);
      const strokeDashOffset = vue.computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
      vue.watchEffect(() => {
        intersectionRef.value = root.value;
        resizeRef.value = root.value;
      });
      useRender(() => vue.createVNode(props.tag, {
        "ref": root,
        "class": ['v-progress-circular', {
          'v-progress-circular--indeterminate': !!props.indeterminate,
          'v-progress-circular--visible': isIntersecting.value,
          'v-progress-circular--disable-shrink': props.indeterminate === 'disable-shrink'
        }, themeClasses.value, sizeClasses.value, textColorClasses.value],
        "style": [sizeStyles.value, textColorStyles.value],
        "role": "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": props.indeterminate ? undefined : normalizedValue.value
      }, {
        default: () => [vue.createVNode("svg", {
          "style": {
            transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
          },
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": `0 0 ${diameter.value} ${diameter.value}`
        }, [vue.createVNode("circle", {
          "class": ['v-progress-circular__underlay', underlayColorClasses.value],
          "style": underlayColorStyles.value,
          "fill": "transparent",
          "cx": "50%",
          "cy": "50%",
          "r": MAGIC_RADIUS_CONSTANT,
          "stroke-width": strokeWidth.value,
          "stroke-dasharray": CIRCUMFERENCE,
          "stroke-dashoffset": 0
        }, null), vue.createVNode("circle", {
          "class": "v-progress-circular__overlay",
          "fill": "transparent",
          "cx": "50%",
          "cy": "50%",
          "r": MAGIC_RADIUS_CONSTANT,
          "stroke-width": strokeWidth.value,
          "stroke-dasharray": CIRCUMFERENCE,
          "stroke-dashoffset": strokeDashOffset.value
        }, null)]), slots.default && vue.createVNode("div", {
          "class": "v-progress-circular__content"
        }, [slots.default({
          value: normalizedValue.value
        })])]
      }));
      return {};
    }
  });

  // Utilities

  // Types

  // Composables
  const makeDimensionProps = propsFactory({
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String]
  }, 'dimension');
  function useDimension(props) {
    const dimensionStyles = vue.computed(() => ({
      height: convertToUnit(props.height),
      maxHeight: convertToUnit(props.maxHeight),
      maxWidth: convertToUnit(props.maxWidth),
      minHeight: convertToUnit(props.minHeight),
      minWidth: convertToUnit(props.minWidth),
      width: convertToUnit(props.width)
    }));
    return {
      dimensionStyles
    };
  }

  // Composables

  // Types

  const oppositeMap = {
    center: 'center',
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };
  const makeLocationProps = propsFactory({
    location: String
  }, 'location');
  function useLocation(props) {
    let opposite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let offset = arguments.length > 2 ? arguments[2] : undefined;
    const {
      isRtl
    } = useRtl();
    const locationStyles = vue.computed(() => {
      if (!props.location) return {};
      const {
        side,
        align
      } = parseAnchor(props.location.split(' ').length > 1 ? props.location : `${props.location} center`, isRtl.value);
      function getOffset(side) {
        return offset ? offset(side) : 0;
      }
      const styles = {};
      if (side !== 'center') {
        if (opposite) styles[oppositeMap[side]] = `calc(100% - ${getOffset(side)}px)`;else styles[side] = 0;
      }
      if (align !== 'center') {
        if (opposite) styles[oppositeMap[align]] = `calc(100% - ${getOffset(align)}px)`;else styles[align] = 0;
      } else {
        if (side === 'center') styles.top = styles.left = '50%';else {
          styles[{
            top: 'left',
            bottom: 'left',
            left: 'top',
            right: 'top'
          }[side]] = '50%';
        }
        styles.transform = {
          top: 'translateX(-50%)',
          bottom: 'translateX(-50%)',
          left: 'translateY(-50%)',
          right: 'translateY(-50%)',
          center: 'translate(-50%, -50%)'
        }[side];
      }
      return styles;
    });
    return {
      locationStyles
    };
  }

  // Utilities

  // Types

  const positionValues = ['static', 'relative', 'fixed', 'absolute', 'sticky'];
  // Composables
  const makePositionProps = propsFactory({
    position: {
      type: String,
      validator: /* istanbul ignore next */v => positionValues.includes(v)
    }
  }, 'position');
  function usePosition(props) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
    const positionClasses = vue.computed(() => {
      return props.position ? `${name}--${props.position}` : undefined;
    });
    return {
      positionClasses
    };
  }

  // Utilities
  function useRouter() {
    var _getCurrentInstance, _getCurrentInstance$p;
    return (_getCurrentInstance = getCurrentInstance('useRouter')) == null ? void 0 : (_getCurrentInstance$p = _getCurrentInstance.proxy) == null ? void 0 : _getCurrentInstance$p.$router;
  }
  function useLink(props, attrs) {
    const RouterLink = vue.resolveDynamicComponent('RouterLink');
    const isLink = vue.computed(() => !!(props.href || props.to));
    const isClickable = vue.computed(() => {
      return (isLink == null ? void 0 : isLink.value) || hasEvent(attrs, 'click') || hasEvent(props, 'click');
    });
    if (typeof RouterLink === 'string') {
      return {
        isLink,
        isClickable,
        href: vue.toRef(props, 'href')
      };
    }
    const link = props.to ? RouterLink.useLink(props) : undefined;
    return {
      isLink,
      isClickable,
      route: link == null ? void 0 : link.route,
      navigate: link == null ? void 0 : link.navigate,
      isActive: link && vue.computed(() => {
        var _link$isExactActive, _link$isActive;
        return props.exact ? (_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value : (_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value;
      }),
      href: vue.computed(() => props.to ? link == null ? void 0 : link.route.value.href : props.href)
    };
  }
  const makeRouterProps = propsFactory({
    href: String,
    replace: Boolean,
    to: [String, Object],
    exact: Boolean
  }, 'router');
  let inTransition = false;
  function useBackButton(router, cb) {
    let popped = false;
    let removeBefore;
    let removeAfter;
    if (IN_BROWSER) {
      vue.nextTick(() => {
        window.addEventListener('popstate', onPopstate);
        removeBefore = router == null ? void 0 : router.beforeEach((to, from, next) => {
          if (!inTransition) {
            setTimeout(() => popped ? cb(next) : next());
          } else {
            popped ? cb(next) : next();
          }
          inTransition = true;
        });
        removeAfter = router == null ? void 0 : router.afterEach(() => {
          inTransition = false;
        });
      });
      vue.onScopeDispose(() => {
        var _removeBefore, _removeAfter;
        window.removeEventListener('popstate', onPopstate);
        (_removeBefore = removeBefore) == null ? void 0 : _removeBefore();
        (_removeAfter = removeAfter) == null ? void 0 : _removeAfter();
      });
    }
    function onPopstate(e) {
      var _e$state;
      if ((_e$state = e.state) != null && _e$state.replaced) return;
      popped = true;
      setTimeout(() => popped = false);
    }
  }

  // Utilities

  // Types

  function useSelectLink(link, select) {
    vue.watch(() => {
      var _link$isActive;
      return (_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value;
    }, isActive => {
      if (link.isLink.value && isActive && select) {
        vue.nextTick(() => {
          select(true);
        });
      }
    }, {
      immediate: true
    });
  }

  // Types

  const VBtn = defineComponent({
    name: 'VBtn',
    directives: {
      Ripple
    },
    props: {
      active: {
        type: Boolean,
        default: undefined
      },
      symbol: {
        type: null,
        default: VBtnToggleSymbol
      },
      flat: Boolean,
      icon: [Boolean, String, Function, Object],
      prependIcon: IconValue,
      appendIcon: IconValue,
      block: Boolean,
      stacked: Boolean,
      ripple: {
        type: Boolean,
        default: true
      },
      ...makeBorderProps(),
      ...makeRoundedProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeGroupItemProps(),
      ...makeLoaderProps(),
      ...makeLocationProps(),
      ...makePositionProps(),
      ...makeRouterProps(),
      ...makeSizeProps(),
      ...makeTagProps({
        tag: 'button'
      }),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: 'elevated'
      })
    },
    emits: {
      'group:selected': val => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        loaderClasses
      } = useLoader(props);
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props);
      const group = useGroupItem(props, props.symbol, false);
      const link = useLink(props, attrs);
      const isActive = vue.computed(() => {
        var _link$isActive;
        return props.active !== false && (props.active || ((_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value) || (group == null ? void 0 : group.isSelected.value));
      });
      const isDisabled = vue.computed(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
      const isElevated = vue.computed(() => {
        return props.variant === 'elevated' && !(props.disabled || props.flat || props.border);
      });
      useSelectLink(link, group == null ? void 0 : group.select);
      useRender(() => {
        var _slots$prepend, _slots$default, _slots$append, _slots$loader;
        const Tag = link.isLink.value ? 'a' : props.tag;
        const hasColor = !group || group.isSelected.value;
        const hasPrepend = !!(props.prependIcon || slots.prepend);
        const hasAppend = !!(props.appendIcon || slots.append);
        const hasIcon = !!(props.icon && props.icon !== true);
        return vue.withDirectives(vue.createVNode(Tag, {
          "type": Tag === 'a' ? undefined : 'button',
          "class": ['v-btn', group == null ? void 0 : group.selectedClass.value, {
            'v-btn--active': isActive.value,
            'v-btn--block': props.block,
            'v-btn--disabled': isDisabled.value,
            'v-btn--elevated': isElevated.value,
            'v-btn--flat': props.flat,
            'v-btn--icon': !!props.icon,
            'v-btn--loading': props.loading,
            'v-btn--stacked': props.stacked
          }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : undefined, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
          "style": [hasColor ? colorStyles.value : undefined, dimensionStyles.value, locationStyles.value, sizeStyles.value],
          "disabled": isDisabled.value || undefined,
          "href": link.href.value,
          "onClick": e => {
            var _link$navigate;
            if (isDisabled.value) return;
            (_link$navigate = link.navigate) == null ? void 0 : _link$navigate.call(link, e);
            group == null ? void 0 : group.toggle();
          }
        }, {
          default: () => [genOverlays(true, 'v-btn'), !props.icon && hasPrepend && vue.createVNode(VDefaultsProvider, {
            "key": "prepend",
            "defaults": {
              VIcon: {
                icon: props.prependIcon
              }
            }
          }, {
            default: () => [vue.createVNode("span", {
              "class": "v-btn__prepend"
            }, [((_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)) ?? vue.createVNode(VIcon, null, null)])]
          }), vue.createVNode("span", {
            "class": "v-btn__content",
            "data-no-activator": ""
          }, [vue.createVNode(VDefaultsProvider, {
            "key": "content",
            "defaults": {
              VIcon: {
                icon: hasIcon ? props.icon : undefined
              }
            }
          }, {
            default: () => [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? (hasIcon && vue.createVNode(VIcon, {
              "key": "icon"
            }, null))]
          })]), !props.icon && hasAppend && vue.createVNode(VDefaultsProvider, {
            "key": "append",
            "defaults": {
              VIcon: {
                icon: props.appendIcon
              }
            }
          }, {
            default: () => [vue.createVNode("span", {
              "class": "v-btn__append"
            }, [((_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)) ?? vue.createVNode(VIcon, null, null)])]
          }), !!props.loading && vue.createVNode("span", {
            "key": "loader",
            "class": "v-btn__loader"
          }, [((_slots$loader = slots.loader) == null ? void 0 : _slots$loader.call(slots)) ?? vue.createVNode(VProgressCircular, {
            "color": typeof props.loading === 'boolean' ? undefined : props.loading,
            "indeterminate": true,
            "size": "23",
            "width": "2"
          }, null)])]
        }), [[vue.resolveDirective("ripple"), !isDisabled.value && props.ripple, null]]);
      });
      return {};
    }
  });

  // Utilities

  // Types

  const makeDataTableGroupProps = propsFactory({
    groupBy: {
      type: Array,
      default: () => []
    }
  }, 'data-table-group');
  const VDataTableGroupSymbol = Symbol.for('vuetify:data-table-group');
  function createGroupBy(props, groupBy, sortBy) {
    const opened = vue.ref(new Set());
    const sortByWithGroups = vue.computed(() => {
      return groupBy.value.map(val => ({
        ...val,
        order: val.order ?? false
      })).concat(sortBy.value);
    });
    function toggleGroup(group, value) {
      const open = value == null ? !opened.value.has(group) : value;
      if (open) opened.value.add(group);else opened.value.delete(group);
    }
    function extractRows(items) {
      function dive(group) {
        const arr = [];
        for (const item of group.items) {
          if (item.type === 'item') arr.push(item);else {
            arr.push(...dive(item));
          }
        }
        return arr;
      }
      return dive({
        type: 'group-header',
        items,
        id: 'dummy',
        key: 'dummy',
        value: 'dummy',
        depth: 0
      });
    }

    // onBeforeMount(() => {
    //   for (const key of groupedItems.value.keys()) {
    //     opened.value.add(key)
    //   }
    // })

    const data = {
      sortByWithGroups,
      toggleGroup,
      opened,
      groupBy,
      extractRows
    };
    vue.provide(VDataTableGroupSymbol, data);
    return data;
  }
  function useGroupBy() {
    const data = vue.inject(VDataTableGroupSymbol);
    if (!data) throw new Error('Missing group!');
    return data;
  }
  function groupItemsByProperty(items, groupBy) {
    if (!items.length) return [];
    const groups = new Map();
    for (const item of items) {
      const value = getObjectValueByPath(item.raw, groupBy);
      if (!groups.has(value)) {
        groups.set(value, []);
      }
      groups.get(value).push(item);
    }
    return groups;
  }
  function groupItems(items, groupBy) {
    let depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'root';
    if (!groupBy.length) return [];
    const groupedItems = groupItemsByProperty(items, groupBy[0]);
    const groups = [];
    const rest = groupBy.slice(1);
    groupedItems.forEach((items, value) => {
      const key = groupBy[0];
      const id = `${prefix}_${key}_${value}`;
      groups.push({
        depth,
        id,
        key,
        value,
        items: rest.length ? groupItems(items, rest, depth + 1, id) : items,
        type: 'group-header'
      });
    });
    return groups;
  }
  function flattenItems(items, opened) {
    const flatItems = [];
    for (const item of items) {
      // TODO: make this better
      if (item.type === 'group-header') {
        if (item.value != null) {
          flatItems.push(item);
        }
        if (opened.has(item.id) || item.value == null) {
          flatItems.push(...flattenItems(item.items, opened));
        }
      } else {
        flatItems.push(item);
      }
    }
    return flatItems;
  }
  function useGroupedItems(items, groupBy, opened) {
    const flatItems = vue.computed(() => {
      if (!groupBy.value.length) return items.value;
      const groupedItems = groupItems(items.value, groupBy.value.map(item => item.key));
      return flattenItems(groupedItems, opened.value);
    });
    return {
      flatItems
    };
  }

  // Types

  const VDataTableGroupHeaderRow = defineComponent({
    name: 'VDataTableGroupHeaderRow',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        opened,
        toggleGroup,
        extractRows
      } = useGroupBy();
      const {
        isSelected,
        isSomeSelected,
        select
      } = useSelection();
      const {
        columns
      } = useHeaders();
      const rows = vue.computed(() => {
        return extractRows([props.item]);
      });
      return () => vue.createVNode("tr", {
        "class": "v-data-table-group-header-row",
        "style": {
          '--v-data-table-group-header-row-depth': props.item.depth
        }
      }, [columns.value.map(column => {
        if (column.key === 'data-table-group') {
          var _slots$dataTableGro;
          const icon = opened.value.has(props.item.id) ? '$expand' : '$next';
          const onClick = () => toggleGroup(props.item.id);
          return ((_slots$dataTableGro = slots['data-table-group']) == null ? void 0 : _slots$dataTableGro.call(slots, {
            item: props.item,
            count: rows.value.length,
            props: {
              icon,
              onClick
            }
          })) ?? vue.createVNode(VDataTableColumn, {
            "class": "v-data-table-group-header-row__column"
          }, {
            default: () => [vue.createVNode(VBtn, {
              "size": "small",
              "variant": "text",
              "icon": icon,
              "onClick": onClick
            }, null), vue.createVNode("span", null, [props.item.value]), vue.createVNode("span", null, [vue.createTextVNode("("), rows.value.length, vue.createTextVNode(")")])]
          });
        }
        if (column.key === 'data-table-select') {
          var _slots$dataTableSel;
          const modelValue = isSelected(rows.value);
          const indeterminate = isSomeSelected(rows.value) && !modelValue;
          const selectGroup = v => select(rows.value, v);
          return ((_slots$dataTableSel = slots['data-table-select']) == null ? void 0 : _slots$dataTableSel.call(slots, {
            props: {
              modelValue,
              indeterminate,
              'onUpdate:modelValue': selectGroup
            }
          })) ?? vue.createVNode("td", null, [vue.createVNode(VCheckboxBtn, {
            "modelValue": modelValue,
            "indeterminate": indeterminate,
            "onUpdate:modelValue": selectGroup
          }, null)]);
        }
        return vue.createVNode("td", null, null);
      })]);
    }
  });

  // Utilities

  // Types

  const makeDataTableExpandProps = propsFactory({
    expandOnClick: Boolean,
    showExpand: Boolean,
    expanded: {
      type: Array,
      default: () => []
    }
  }, 'v-data-table-expand');
  const VDataTableExpandedKey = Symbol.for('vuetify:datatable:expanded');
  function createExpanded(props) {
    const expandOnClick = vue.toRef(props, 'expandOnClick');
    const expanded = useProxiedModel(props, 'expanded', props.expanded, v => {
      return new Set(v);
    }, v => {
      return [...v.values()];
    });
    function expand(item, value) {
      const newExpanded = new Set(expanded.value);
      if (!value) {
        newExpanded.delete(item.value);
      } else {
        newExpanded.add(item.value);
      }
      expanded.value = newExpanded;
    }
    function isExpanded(item) {
      return expanded.value.has(item.value);
    }
    function toggleExpand(item) {
      expand(item, !isExpanded(item));
    }
    const data = {
      expand,
      expanded,
      expandOnClick,
      isExpanded,
      toggleExpand
    };
    vue.provide(VDataTableExpandedKey, data);
    return data;
  }
  function useExpanded() {
    const data = vue.inject(VDataTableExpandedKey);
    if (!data) throw new Error('foo');
    return data;
  }

  // Types

  const VDataTableRow = defineComponent({
    name: 'VDataTableRow',
    props: {
      item: Object
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        isSelected,
        toggleSelect
      } = useSelection();
      const {
        isExpanded,
        toggleExpand
      } = useExpanded();
      const {
        columns
      } = useHeaders();
      useRender(() => vue.createVNode("tr", {
        "class": ['v-data-table__tr']
      }, [!columns.value.length && vue.createVNode(VDataTableColumn, {
        "key": "no-data"
      }, slots), props.item && columns.value.map((column, i) => vue.createVNode(VDataTableColumn, {
        "align": column.align,
        "fixed": column.fixed,
        "fixedOffset": column.fixedOffset,
        "lastFixed": column.lastFixed,
        "noPadding": column.key === 'data-table-select' || column.key === 'data-table-expand',
        "width": column.width
      }, {
        default: () => {
          const item = props.item;
          const slotName = `item.${column.key}`;
          const slotProps = {
            item: props.item,
            columns: columns.value,
            isSelected,
            toggleSelect,
            isExpanded,
            toggleExpand
          };
          if (slots[slotName]) return slots[slotName](slotProps);
          if (column.key === 'data-table-select') {
            var _slots$itemDataTabl;
            return ((_slots$itemDataTabl = slots['item.data-table-select']) == null ? void 0 : _slots$itemDataTabl.call(slots, slotProps)) ?? vue.createVNode(VCheckboxBtn, {
              "modelValue": isSelected([item]),
              "onClick": () => toggleSelect(item)
            }, null);
          }
          if (column.key === 'data-table-expand') {
            var _slots$itemDataTabl2;
            return ((_slots$itemDataTabl2 = slots['item.data-table-expand']) == null ? void 0 : _slots$itemDataTabl2.call(slots, slotProps)) ?? vue.createVNode(VBtn, {
              "icon": isExpanded(item) ? '$collapse' : '$expand',
              "size": "small",
              "variant": "text",
              "onClick": () => toggleExpand(item)
            }, null);
          }
          return item.columns[column.key];
        }
      }))]));
    }
  });

  // Types

  const VDataTableRows = defineComponent({
    name: 'VDataTableRows',
    props: {
      loading: [Boolean, String],
      loadingText: {
        type: String,
        default: '$vuetify.dataIterator.loadingText'
      },
      hideNoData: Boolean,
      items: {
        type: Array,
        default: () => []
      },
      noDataText: {
        type: String,
        default: '$vuetify.noDataText'
      },
      rowHeight: Number
    },
    emits: {
      'click:row': (event, value) => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const {
        columns
      } = useHeaders();
      const {
        expanded,
        expand,
        expandOnClick
      } = useExpanded();
      const {
        t
      } = useLocale();
      useRender(() => {
        var _slots$loading, _slots$noData;
        return vue.createVNode(vue.Fragment, null, [props.loading ? ((_slots$loading = slots.loading) == null ? void 0 : _slots$loading.call(slots)) ?? vue.createVNode(VDataTableRow, {
          "class": "v-data-table-rows-no-data",
          "key": "loading"
        }, {
          default: () => [t(props.loadingText)]
        }) : undefined, !props.loading && !props.items.length && !props.hideNoData && (((_slots$noData = slots['no-data']) == null ? void 0 : _slots$noData.call(slots)) ?? vue.createVNode(VDataTableRow, {
          "class": "v-data-table-rows-no-data",
          "key": "no-data"
        }, {
          default: () => [t(props.noDataText)]
        })), props.items.map((item, index) => {
          var _slots$expandedRow;
          if (item.type === 'group-header') {
            return vue.createVNode(VDataTableGroupHeaderRow, {
              "key": `group-header_${item.id}`,
              "item": item
            }, slots);
          }
          return vue.createVNode(vue.Fragment, null, [vue.createVNode(VDataTableRow, {
            "key": `item_${item.value}`,
            "onClick": event => {
              if (expandOnClick.value) {
                expand(item, !expanded.value.has(item.value));
              }
              emit('click:row', event, {
                item
              });
            },
            "item": item
          }, slots), expanded.value.has(item.value) && ((_slots$expandedRow = slots['expanded-row']) == null ? void 0 : _slots$expandedRow.call(slots, {
            item,
            columns: columns.value
          }))]);
        })]);
      });
      return {};
    }
  });

  const VFieldLabel = defineComponent({
    name: 'VFieldLabel',
    props: {
      floating: Boolean
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => vue.createVNode(VLabel, {
        "class": ['v-field-label', {
          'v-field-label--floating': props.floating
        }],
        "aria-hidden": props.floating || undefined
      }, slots));
      return {};
    }
  });

  // Types

  const allowedVariants = ['underlined', 'outlined', 'filled', 'solo', 'plain'];
  const makeVFieldProps = propsFactory({
    appendInnerIcon: IconValue,
    bgColor: String,
    clearable: Boolean,
    clearIcon: {
      type: IconValue,
      default: '$clear'
    },
    active: Boolean,
    color: String,
    dirty: Boolean,
    disabled: Boolean,
    error: Boolean,
    label: String,
    persistentClear: Boolean,
    prependInnerIcon: IconValue,
    reverse: Boolean,
    singleLine: Boolean,
    variant: {
      type: String,
      default: 'filled',
      validator: v => allowedVariants.includes(v)
    },
    'onClick:clear': EventProp,
    'onClick:appendInner': EventProp,
    'onClick:prependInner': EventProp,
    ...makeThemeProps(),
    ...makeLoaderProps()
  }, 'v-field');
  const VField = genericComponent()({
    name: 'VField',
    inheritAttrs: false,
    props: {
      id: String,
      ...makeFocusProps(),
      ...makeVFieldProps()
    },
    emits: {
      'click:control': e => true,
      'update:focused': focused => true,
      'update:modelValue': val => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit,
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        loaderClasses
      } = useLoader(props);
      const {
        focusClasses,
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const {
        InputIcon
      } = useInputIcon(props);
      const isActive = vue.computed(() => props.dirty || props.active);
      const hasLabel = vue.computed(() => !props.singleLine && !!(props.label || slots.label));
      const uid = getUid();
      const id = vue.computed(() => props.id || `input-${uid}`);
      const labelRef = vue.ref();
      const floatingLabelRef = vue.ref();
      const controlRef = vue.ref();
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'bgColor'));
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.computed(() => {
        return isActive.value && isFocused.value && !props.error && !props.disabled ? props.color : undefined;
      }));
      vue.watch(isActive, val => {
        if (hasLabel.value) {
          const el = labelRef.value.$el;
          const targetEl = floatingLabelRef.value.$el;
          const rect = nullifyTransforms(el);
          const targetRect = targetEl.getBoundingClientRect();
          const x = targetRect.x - rect.x;
          const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
          const targetWidth = targetRect.width / 0.75;
          const width = Math.abs(targetWidth - rect.width) > 1 ? {
            maxWidth: convertToUnit(targetWidth)
          } : undefined;
          const style = getComputedStyle(el);
          const targetStyle = getComputedStyle(targetEl);
          const duration = parseFloat(style.transitionDuration) * 1000 || 150;
          const scale = parseFloat(targetStyle.getPropertyValue('--v-field-label-scale'));
          const color = targetStyle.getPropertyValue('color');
          el.style.visibility = 'visible';
          targetEl.style.visibility = 'hidden';
          animate(el, {
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            color,
            ...width
          }, {
            duration,
            easing: standardEasing,
            direction: val ? 'normal' : 'reverse'
          }).finished.then(() => {
            el.style.removeProperty('visibility');
            targetEl.style.removeProperty('visibility');
          });
        }
      }, {
        flush: 'post'
      });
      const slotProps = vue.computed(() => ({
        isActive,
        isFocused,
        controlRef,
        blur,
        focus
      }));
      function onClick(e) {
        if (e.target !== document.activeElement) {
          e.preventDefault();
        }
        emit('click:control', e);
      }
      useRender(() => {
        var _slots$prependInner, _slots$default, _slots$appendInner;
        const isOutlined = props.variant === 'outlined';
        const hasPrepend = slots['prepend-inner'] || props.prependInnerIcon;
        const hasClear = !!(props.clearable || slots.clear);
        const hasAppend = !!(slots['append-inner'] || props.appendInnerIcon || hasClear);
        const label = slots.label ? slots.label({
          label: props.label,
          props: {
            for: id.value
          }
        }) : props.label;
        return vue.createVNode("div", vue.mergeProps({
          "class": ['v-field', {
            'v-field--active': isActive.value,
            'v-field--appended': hasAppend,
            'v-field--disabled': props.disabled,
            'v-field--dirty': props.dirty,
            'v-field--error': props.error,
            'v-field--has-background': !!props.bgColor,
            'v-field--persistent-clear': props.persistentClear,
            'v-field--prepended': hasPrepend,
            'v-field--reverse': props.reverse,
            'v-field--single-line': props.singleLine,
            'v-field--no-label': !label,
            [`v-field--variant-${props.variant}`]: true
          }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value],
          "style": [backgroundColorStyles.value, textColorStyles.value],
          "onClick": onClick
        }, attrs), [vue.createVNode("div", {
          "class": "v-field__overlay"
        }, null), vue.createVNode(LoaderSlot, {
          "name": "v-field",
          "active": !!props.loading,
          "color": props.error ? 'error' : props.color
        }, {
          default: slots.loader
        }), hasPrepend && vue.createVNode("div", {
          "key": "prepend",
          "class": "v-field__prepend-inner"
        }, [props.prependInnerIcon && vue.createVNode(InputIcon, {
          "key": "prepend-icon",
          "name": "prependInner"
        }, null), (_slots$prependInner = slots['prepend-inner']) == null ? void 0 : _slots$prependInner.call(slots, slotProps.value)]), vue.createVNode("div", {
          "class": "v-field__field",
          "data-no-activator": ""
        }, [['solo', 'filled'].includes(props.variant) && hasLabel.value && vue.createVNode(VFieldLabel, {
          "key": "floating-label",
          "ref": floatingLabelRef,
          "class": [textColorClasses.value],
          "floating": true,
          "for": id.value
        }, {
          default: () => [label]
        }), vue.createVNode(VFieldLabel, {
          "ref": labelRef,
          "for": id.value
        }, {
          default: () => [label]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          ...slotProps.value,
          props: {
            id: id.value,
            class: 'v-field__input'
          },
          focus,
          blur
        })]), hasClear && vue.createVNode(VExpandXTransition, {
          "key": "clear"
        }, {
          default: () => [vue.withDirectives(vue.createVNode("div", {
            "class": "v-field__clearable"
          }, [slots.clear ? slots.clear() : vue.createVNode(InputIcon, {
            "name": "clear"
          }, null)]), [[vue.vShow, props.dirty]])]
        }), hasAppend && vue.createVNode("div", {
          "key": "append",
          "class": "v-field__append-inner"
        }, [(_slots$appendInner = slots['append-inner']) == null ? void 0 : _slots$appendInner.call(slots, slotProps.value), props.appendInnerIcon && vue.createVNode(InputIcon, {
          "key": "append-icon",
          "name": "appendInner"
        }, null)]), vue.createVNode("div", {
          "class": ['v-field__outline', textColorClasses.value]
        }, [isOutlined && vue.createVNode(vue.Fragment, null, [vue.createVNode("div", {
          "class": "v-field__outline__start"
        }, null), hasLabel.value && vue.createVNode("div", {
          "class": "v-field__outline__notch"
        }, [vue.createVNode(VFieldLabel, {
          "ref": floatingLabelRef,
          "floating": true,
          "for": id.value
        }, {
          default: () => [label]
        })]), vue.createVNode("div", {
          "class": "v-field__outline__end"
        }, null)]), ['plain', 'underlined'].includes(props.variant) && hasLabel.value && vue.createVNode(VFieldLabel, {
          "ref": floatingLabelRef,
          "floating": true,
          "for": id.value
        }, {
          default: () => [label]
        })])]);
      });
      return {
        controlRef
      };
    }
  });
  // TODO: this is kinda slow, might be better to implicitly inherit props instead
  function filterFieldProps(attrs) {
    const keys = Object.keys(VField.props).filter(k => !isOn(k));
    return pick(attrs, keys);
  }

  const VCounter = defineComponent({
    name: 'VCounter',
    functional: true,
    props: {
      active: Boolean,
      max: [Number, String],
      value: {
        type: [Number, String],
        default: 0
      },
      ...makeTransitionProps({
        transition: {
          component: VSlideYTransition
        }
      })
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const counter = vue.computed(() => {
        return props.max ? `${props.value} / ${props.max}` : String(props.value);
      });
      useRender(() => vue.createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [vue.withDirectives(vue.createVNode("div", {
          "class": "v-counter"
        }, [slots.default ? slots.default({
          counter: counter.value,
          max: props.max,
          value: props.value
        }) : counter.value]), [[vue.vShow, props.active]])]
      }));
      return {};
    }
  });

  // Utils

  // Types

  function mounted(el, binding) {
    if (!SUPPORTS_INTERSECTION) return;
    const modifiers = binding.modifiers || {};
    const value = binding.value;
    const {
      handler,
      options
    } = typeof value === 'object' ? value : {
      handler: value,
      options: {}
    };
    const observer = new IntersectionObserver(function () {
      var _el$_observe;
      let entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      let observer = arguments.length > 1 ? arguments[1] : undefined;
      const _observe = (_el$_observe = el._observe) == null ? void 0 : _el$_observe[binding.instance.$.uid];
      if (!_observe) return; // Just in case, should never fire

      const isIntersecting = entries.some(entry => entry.isIntersecting);

      // If is not quiet or has already been
      // initted, invoke the user callback
      if (handler && (!modifiers.quiet || _observe.init) && (!modifiers.once || isIntersecting || _observe.init)) {
        handler(isIntersecting, entries, observer);
      }
      if (isIntersecting && modifiers.once) unmounted(el, binding);else _observe.init = true;
    }, options);
    el._observe = Object(el._observe);
    el._observe[binding.instance.$.uid] = {
      init: false,
      observer
    };
    observer.observe(el);
  }
  function unmounted(el, binding) {
    var _el$_observe2;
    const observe = (_el$_observe2 = el._observe) == null ? void 0 : _el$_observe2[binding.instance.$.uid];
    if (!observe) return;
    observe.observer.unobserve(el);
    delete el._observe[binding.instance.$.uid];
  }
  const Intersect = {
    mounted,
    unmounted
  };
  var intersect = Intersect;

  const Refs = Symbol('Forwarded refs');

  /** Omit properties starting with P */

  function forwardRefs(target) {
    for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      refs[_key - 1] = arguments[_key];
    }
    target[Refs] = refs;
    return new Proxy(target, {
      get(target, key) {
        if (Reflect.has(target, key)) {
          return Reflect.get(target, key);
        }
        for (const ref of refs) {
          if (ref.value && Reflect.has(ref.value, key)) {
            const val = Reflect.get(ref.value, key);
            return typeof val === 'function' ? val.bind(ref.value) : val;
          }
        }
      },
      getOwnPropertyDescriptor(target, key) {
        const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
        if (descriptor) return descriptor;

        // Skip internal properties
        if (typeof key === 'symbol' || key.startsWith('__')) return;

        // Check each ref's own properties
        for (const ref of refs) {
          if (!ref.value) continue;
          const descriptor = Reflect.getOwnPropertyDescriptor(ref.value, key);
          if (descriptor) return descriptor;
          if ('_' in ref.value && 'setupState' in ref.value._) {
            const descriptor = Reflect.getOwnPropertyDescriptor(ref.value._.setupState, key);
            if (descriptor) return descriptor;
          }
        }
        // Recursive search up each ref's prototype
        for (const ref of refs) {
          let obj = ref.value && Object.getPrototypeOf(ref.value);
          while (obj) {
            const descriptor = Reflect.getOwnPropertyDescriptor(obj, key);
            if (descriptor) return descriptor;
            obj = Object.getPrototypeOf(obj);
          }
        }
        // Call forwarded refs' proxies
        for (const ref of refs) {
          const childRefs = ref.value && ref.value[Refs];
          if (!childRefs) continue;
          const queue = childRefs.slice();
          while (queue.length) {
            const ref = queue.shift();
            const descriptor = Reflect.getOwnPropertyDescriptor(ref.value, key);
            if (descriptor) return descriptor;
            const childRefs = ref.value && ref.value[Refs];
            if (childRefs) queue.push(...childRefs);
          }
        }
        return undefined;
      }
    });
  }

  // Types

  const activeTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'];
  const makeVTextFieldProps = propsFactory({
    autofocus: Boolean,
    counter: [Boolean, Number, String],
    counterValue: Function,
    hint: String,
    persistentHint: Boolean,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text'
    },
    ...makeVInputProps(),
    ...makeVFieldProps()
  }, 'v-text-field');
  const VTextField = genericComponent()({
    name: 'VTextField',
    directives: {
      Intersect: intersect
    },
    inheritAttrs: false,
    props: makeVTextFieldProps(),
    emits: {
      'click:control': e => true,
      'click:input': e => true,
      'update:focused': focused => true,
      'update:modelValue': val => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit,
        slots
      } = _ref;
      const model = useProxiedModel(props, 'modelValue');
      const {
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const counterValue = vue.computed(() => {
        return typeof props.counterValue === 'function' ? props.counterValue(model.value) : (model.value ?? '').toString().length;
      });
      const max = vue.computed(() => {
        if (attrs.maxlength) return attrs.maxlength;
        if (!props.counter || typeof props.counter !== 'number' && typeof props.counter !== 'string') return undefined;
        return props.counter;
      });
      function onIntersect(isIntersecting, entries) {
        var _entries$0$target, _entries$0$target$foc;
        if (!props.autofocus || !isIntersecting) return;
        (_entries$0$target = entries[0].target) == null ? void 0 : (_entries$0$target$foc = _entries$0$target.focus) == null ? void 0 : _entries$0$target$foc.call(_entries$0$target);
      }
      const vInputRef = vue.ref();
      const vFieldRef = vue.ref();
      const inputRef = vue.ref();
      const isActive = vue.computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value);
      const messages = vue.computed(() => {
        return props.messages.length ? props.messages : isFocused.value || props.persistentHint ? props.hint : '';
      });
      function onFocus() {
        if (inputRef.value !== document.activeElement) {
          var _inputRef$value;
          (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.focus();
        }
        if (!isFocused.value) focus();
      }
      function onControlClick(e) {
        onFocus();
        emit('click:control', e);
      }
      function onClear(e) {
        e.stopPropagation();
        onFocus();
        vue.nextTick(() => {
          model.value = null;
          callEvent(props['onClick:clear'], e);
        });
      }
      function onInput(e) {
        model.value = e.target.value;
      }
      useRender(() => {
        const hasCounter = !!(slots.counter || props.counter || props.counterValue);
        const hasDetails = !!(hasCounter || slots.details);
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [{
          modelValue: _,
          ...inputProps
        }] = filterInputProps(props);
        const [fieldProps] = filterFieldProps(props);
        return vue.createVNode(VInput, vue.mergeProps({
          "ref": vInputRef,
          "modelValue": model.value,
          "onUpdate:modelValue": $event => model.value = $event,
          "class": ['v-text-field', {
            'v-text-field--prefixed': props.prefix,
            'v-text-field--suffixed': props.suffix,
            'v-text-field--flush-details': ['plain', 'underlined'].includes(props.variant)
          }],
          "onClick:prepend": props['onClick:prepend'],
          "onClick:append": props['onClick:append']
        }, rootAttrs, inputProps, {
          "focused": isFocused.value,
          "messages": messages.value
        }), {
          ...slots,
          default: _ref2 => {
            let {
              id,
              isDisabled,
              isDirty,
              isReadonly,
              isValid
            } = _ref2;
            return vue.createVNode(VField, vue.mergeProps({
              "ref": vFieldRef,
              "onMousedown": e => {
                if (e.target === inputRef.value) return;
                e.preventDefault();
              },
              "onClick:control": onControlClick,
              "onClick:clear": onClear,
              "onClick:prependInner": props['onClick:prependInner'],
              "onClick:appendInner": props['onClick:appendInner'],
              "role": "textbox"
            }, fieldProps, {
              "id": id.value,
              "active": isActive.value || isDirty.value,
              "dirty": isDirty.value || props.dirty,
              "focused": isFocused.value,
              "error": isValid.value === false
            }), {
              ...slots,
              default: _ref3 => {
                let {
                  props: {
                    class: fieldClass,
                    ...slotProps
                  }
                } = _ref3;
                const inputNode = vue.withDirectives(vue.createVNode("input", vue.mergeProps({
                  "ref": inputRef,
                  "value": model.value,
                  "onInput": onInput,
                  "autofocus": props.autofocus,
                  "readonly": isReadonly.value,
                  "disabled": isDisabled.value,
                  "name": props.name,
                  "placeholder": props.placeholder,
                  "size": 1,
                  "type": props.type,
                  "onFocus": onFocus,
                  "onBlur": blur
                }, slotProps, inputAttrs), null), [[vue.resolveDirective("intersect"), {
                  handler: onIntersect
                }, null, {
                  once: true
                }]]);
                return vue.createVNode(vue.Fragment, null, [props.prefix && vue.createVNode("span", {
                  "class": "v-text-field__prefix"
                }, [props.prefix]), slots.default ? vue.createVNode("div", {
                  "class": fieldClass,
                  "onClick": e => emit('click:input', e),
                  "data-no-activator": ""
                }, [slots.default(), inputNode]) : vue.cloneVNode(inputNode, {
                  class: fieldClass
                }), props.suffix && vue.createVNode("span", {
                  "class": "v-text-field__suffix"
                }, [props.suffix])]);
              }
            });
          },
          details: hasDetails ? slotProps => {
            var _slots$details;
            return vue.createVNode(vue.Fragment, null, [(_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps), hasCounter && vue.createVNode(vue.Fragment, null, [vue.createVNode("span", null, null), vue.createVNode(VCounter, {
              "active": props.persistentCounter || isFocused.value,
              "value": counterValue.value,
              "max": max.value
            }, slots.counter)])]);
          } : undefined
        });
      });
      return forwardRefs({}, vInputRef, vFieldRef, inputRef);
    }
  });
  function filterVTextFieldProps(props) {
    return pick(props, Object.keys(VTextField.props));
  }

  function useAspectStyles(props) {
    return {
      aspectStyles: vue.computed(() => {
        const ratio = Number(props.aspectRatio);
        return ratio ? {
          paddingBottom: String(1 / ratio * 100) + '%'
        } : undefined;
      })
    };
  }
  const VResponsive = defineComponent({
    name: 'VResponsive',
    props: {
      aspectRatio: [String, Number],
      contentClass: String,
      ...makeDimensionProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        aspectStyles
      } = useAspectStyles(props);
      const {
        dimensionStyles
      } = useDimension(props);
      useRender(() => {
        var _slots$additional;
        return vue.createVNode("div", {
          "class": "v-responsive",
          "style": dimensionStyles.value
        }, [vue.createVNode("div", {
          "class": "v-responsive__sizer",
          "style": aspectStyles.value
        }, null), (_slots$additional = slots.additional) == null ? void 0 : _slots$additional.call(slots), slots.default && vue.createVNode("div", {
          "class": ['v-responsive__content', props.contentClass]
        }, [slots.default()])]);
      });
      return {};
    }
  });

  // Types

  const VImg = defineComponent({
    name: 'VImg',
    directives: {
      intersect
    },
    props: {
      aspectRatio: [String, Number],
      alt: String,
      cover: Boolean,
      eager: Boolean,
      gradient: String,
      lazySrc: String,
      options: {
        type: Object,
        // For more information on types, navigate to:
        // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        default: () => ({
          root: undefined,
          rootMargin: undefined,
          threshold: undefined
        })
      },
      sizes: String,
      src: {
        type: [String, Object],
        default: ''
      },
      srcset: String,
      width: [String, Number],
      ...makeTransitionProps()
    },
    emits: {
      loadstart: event => true,
      load: event => true,
      error: event => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const currentSrc = vue.ref(''); // Set from srcset
      const image = vue.ref();
      const state = vue.ref(props.eager ? 'loading' : 'idle');
      const naturalWidth = vue.ref();
      const naturalHeight = vue.ref();
      const normalisedSrc = vue.computed(() => {
        return props.src && typeof props.src === 'object' ? {
          src: props.src.src,
          srcset: props.srcset || props.src.srcset,
          lazySrc: props.lazySrc || props.src.lazySrc,
          aspect: Number(props.aspectRatio || props.src.aspect || 0)
        } : {
          src: props.src,
          srcset: props.srcset,
          lazySrc: props.lazySrc,
          aspect: Number(props.aspectRatio || 0)
        };
      });
      const aspectRatio = vue.computed(() => {
        return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
      });
      vue.watch(() => props.src, () => {
        init(state.value !== 'idle');
      });
      vue.watch(aspectRatio, (val, oldVal) => {
        if (!val && oldVal && image.value) {
          pollForSize(image.value);
        }
      });

      // TODO: getSrc when window width changes

      vue.onBeforeMount(() => init());
      function init(isIntersecting) {
        if (props.eager && isIntersecting) return;
        if (SUPPORTS_INTERSECTION && !isIntersecting && !props.eager) return;
        state.value = 'loading';
        if (normalisedSrc.value.lazySrc) {
          const lazyImg = new Image();
          lazyImg.src = normalisedSrc.value.lazySrc;
          pollForSize(lazyImg, null);
        }
        if (!normalisedSrc.value.src) return;
        vue.nextTick(() => {
          var _image$value, _image$value2;
          emit('loadstart', ((_image$value = image.value) == null ? void 0 : _image$value.currentSrc) || normalisedSrc.value.src);
          if ((_image$value2 = image.value) != null && _image$value2.complete) {
            if (!image.value.naturalWidth) {
              onError();
            }
            if (state.value === 'error') return;
            if (!aspectRatio.value) pollForSize(image.value, null);
            onLoad();
          } else {
            if (!aspectRatio.value) pollForSize(image.value);
            getSrc();
          }
        });
      }
      function onLoad() {
        var _image$value3;
        getSrc();
        state.value = 'loaded';
        emit('load', ((_image$value3 = image.value) == null ? void 0 : _image$value3.currentSrc) || normalisedSrc.value.src);
      }
      function onError() {
        var _image$value4;
        state.value = 'error';
        emit('error', ((_image$value4 = image.value) == null ? void 0 : _image$value4.currentSrc) || normalisedSrc.value.src);
      }
      function getSrc() {
        const img = image.value;
        if (img) currentSrc.value = img.currentSrc || img.src;
      }
      let timer = -1;
      function pollForSize(img) {
        let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        const poll = () => {
          clearTimeout(timer);
          const {
            naturalHeight: imgHeight,
            naturalWidth: imgWidth
          } = img;
          if (imgHeight || imgWidth) {
            naturalWidth.value = imgWidth;
            naturalHeight.value = imgHeight;
          } else if (!img.complete && state.value === 'loading' && timeout != null) {
            timer = window.setTimeout(poll, timeout);
          } else if (img.currentSrc.endsWith('.svg') || img.currentSrc.startsWith('data:image/svg+xml')) {
            naturalWidth.value = 1;
            naturalHeight.value = 1;
          }
        };
        poll();
      }
      const containClasses = vue.computed(() => ({
        'v-img__img--cover': props.cover,
        'v-img__img--contain': !props.cover
      }));
      const __image = () => {
        var _slots$sources;
        if (!normalisedSrc.value.src || state.value === 'idle') return null;
        const img = vue.createVNode("img", {
          "class": ['v-img__img', containClasses.value],
          "src": normalisedSrc.value.src,
          "srcset": normalisedSrc.value.srcset,
          "alt": "",
          "sizes": props.sizes,
          "ref": image,
          "onLoad": onLoad,
          "onError": onError
        }, null);
        const sources = (_slots$sources = slots.sources) == null ? void 0 : _slots$sources.call(slots);
        return vue.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [vue.withDirectives(sources ? vue.createVNode("picture", {
            "class": "v-img__picture"
          }, [sources, img]) : img, [[vue.vShow, state.value === 'loaded']])]
        });
      };
      const __preloadImage = () => vue.createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [normalisedSrc.value.lazySrc && state.value !== 'loaded' && vue.createVNode("img", {
          "class": ['v-img__img', 'v-img__img--preload', containClasses.value],
          "src": normalisedSrc.value.lazySrc,
          "alt": ""
        }, null)]
      });
      const __placeholder = () => {
        if (!slots.placeholder) return null;
        return vue.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [(state.value === 'loading' || state.value === 'error' && !slots.error) && vue.createVNode("div", {
            "class": "v-img__placeholder"
          }, [slots.placeholder()])]
        });
      };
      const __error = () => {
        if (!slots.error) return null;
        return vue.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [state.value === 'error' && vue.createVNode("div", {
            "class": "v-img__error"
          }, [slots.error()])]
        });
      };
      const __gradient = () => {
        if (!props.gradient) return null;
        return vue.createVNode("div", {
          "class": "v-img__gradient",
          "style": {
            backgroundImage: `linear-gradient(${props.gradient})`
          }
        }, null);
      };
      const isBooted = vue.ref(false);
      {
        const stop = vue.watch(aspectRatio, val => {
          if (val) {
            // Doesn't work with nextTick, idk why
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                isBooted.value = true;
              });
            });
            stop();
          }
        });
      }
      useRender(() => vue.withDirectives(vue.createVNode(VResponsive, {
        "class": ['v-img', {
          'v-img--booting': !isBooted.value
        }],
        "style": {
          width: convertToUnit(props.width === 'auto' ? naturalWidth.value : props.width)
        },
        "aspectRatio": aspectRatio.value,
        "aria-label": props.alt,
        "role": props.alt ? 'img' : undefined
      }, {
        additional: () => vue.createVNode(vue.Fragment, null, [vue.createVNode(__image, null, null), vue.createVNode(__preloadImage, null, null), vue.createVNode(__gradient, null, null), vue.createVNode(__placeholder, null, null), vue.createVNode(__error, null, null)]),
        default: slots.default
      }), [[vue.resolveDirective("intersect"), {
        handler: init,
        options: props.options
      }, null, {
        once: true
      }]]));
      return {
        currentSrc,
        image,
        state,
        naturalWidth,
        naturalHeight
      };
    }
  });

  const makeVAvatarProps = propsFactory({
    start: Boolean,
    end: Boolean,
    icon: IconValue,
    image: String,
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'flat'
    })
  }, 'v-avatar');
  const VAvatar = defineComponent({
    name: 'VAvatar',
    props: makeVAvatarProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props);
      useRender(() => {
        var _slots$default;
        return vue.createVNode(props.tag, {
          "class": ['v-avatar', {
            'v-avatar--start': props.start,
            'v-avatar--end': props.end
          }, themeClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
          "style": [colorStyles.value, sizeStyles.value]
        }, {
          default: () => [props.image ? vue.createVNode(VImg, {
            "key": "image",
            "src": props.image,
            "alt": "",
            "cover": true
          }, null) : props.icon ? vue.createVNode(VIcon, {
            "key": "icon",
            "icon": props.icon
          }, null) : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), genOverlays(false, 'v-avatar')]
        });
      });
      return {};
    }
  });

  // Types

  const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group');
  defineComponent({
    name: 'VChipGroup',
    props: {
      column: Boolean,
      filter: Boolean,
      valueComparator: {
        type: Function,
        default: deepEqual
      },
      ...makeGroupProps({
        selectedClass: 'v-chip--selected'
      }),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: 'tonal'
      })
    },
    emits: {
      'update:modelValue': value => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        isSelected,
        select,
        next,
        prev,
        selected
      } = useGroup(props, VChipGroupSymbol);
      provideDefaults({
        VChip: {
          color: vue.toRef(props, 'color'),
          filter: vue.toRef(props, 'filter'),
          variant: vue.toRef(props, 'variant')
        }
      });
      useRender(() => {
        var _slots$default;
        return vue.createVNode(props.tag, {
          "class": ['v-chip-group', {
            'v-chip-group--column': props.column
          }, themeClasses.value]
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isSelected,
            select,
            next,
            prev,
            selected: selected.value
          })]
        });
      });
      return {};
    }
  });

  const VChip = defineComponent({
    name: 'VChip',
    directives: {
      Ripple
    },
    props: {
      activeClass: String,
      appendAvatar: String,
      appendIcon: IconValue,
      closable: Boolean,
      closeIcon: {
        type: IconValue,
        default: '$delete'
      },
      closeLabel: {
        type: String,
        default: '$vuetify.close'
      },
      draggable: Boolean,
      filter: Boolean,
      filterIcon: {
        type: String,
        default: '$complete'
      },
      label: Boolean,
      link: Boolean,
      pill: Boolean,
      prependAvatar: String,
      prependIcon: IconValue,
      ripple: {
        type: Boolean,
        default: true
      },
      text: String,
      modelValue: {
        type: Boolean,
        default: true
      },
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeElevationProps(),
      ...makeGroupItemProps(),
      ...makeRoundedProps(),
      ...makeRouterProps(),
      ...makeSizeProps(),
      ...makeTagProps({
        tag: 'span'
      }),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: 'tonal'
      })
    },
    emits: {
      'click:close': e => true,
      'update:modelValue': value => true,
      'group:selected': val => true,
      click: e => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit,
        slots
      } = _ref;
      const {
        borderClasses
      } = useBorder(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        sizeClasses
      } = useSize(props);
      const {
        themeClasses
      } = provideTheme(props);
      const isActive = useProxiedModel(props, 'modelValue');
      const group = useGroupItem(props, VChipGroupSymbol, false);
      const link = useLink(props, attrs);
      const isClickable = vue.computed(() => !props.disabled && (!!group || link.isClickable.value || props.link));
      function onCloseClick(e) {
        isActive.value = false;
        emit('click:close', e);
      }
      function onClick(e) {
        var _link$navigate;
        emit('click', e);
        if (!isClickable.value) return;
        (_link$navigate = link.navigate) == null ? void 0 : _link$navigate.call(link, e);
        group == null ? void 0 : group.toggle();
      }
      return () => {
        var _slots$default;
        const Tag = link.isLink.value ? 'a' : props.tag;
        const hasAppend = !!(slots.append || props.appendIcon || props.appendAvatar);
        const hasClose = !!(slots.close || props.closable);
        const hasFilter = !!(slots.filter || props.filter) && group;
        const hasPrepend = !!(slots.prepend || props.prependIcon || props.prependAvatar);
        const hasColor = !group || group.isSelected.value;
        return isActive.value && vue.withDirectives(vue.createVNode(Tag, {
          "class": ['v-chip', {
            'v-chip--disabled': props.disabled,
            'v-chip--label': props.label,
            'v-chip--link': isClickable.value,
            'v-chip--filter': hasFilter,
            'v-chip--pill': props.pill
          }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : undefined, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value],
          "style": [hasColor ? colorStyles.value : undefined],
          "disabled": props.disabled || undefined,
          "draggable": props.draggable,
          "href": link.href.value,
          "onClick": onClick
        }, {
          default: () => [genOverlays(isClickable.value, 'v-chip'), hasFilter && vue.createVNode(VDefaultsProvider, {
            "key": "filter",
            "defaults": {
              VIcon: {
                icon: props.filterIcon
              }
            }
          }, {
            default: () => [vue.createVNode(VExpandXTransition, null, {
              default: () => [vue.withDirectives(vue.createVNode("div", {
                "class": "v-chip__filter"
              }, [slots.filter ? slots.filter() : vue.createVNode(VIcon, null, null)]), [[vue.vShow, group.isSelected.value]])]
            })]
          }), hasPrepend && vue.createVNode(VDefaultsProvider, {
            "key": "prepend",
            "defaults": {
              VAvatar: {
                image: props.prependAvatar
              },
              VIcon: {
                icon: props.prependIcon
              }
            }
          }, {
            default: () => [slots.prepend ? vue.createVNode("div", {
              "class": "v-chip__prepend"
            }, [slots.prepend()]) : props.prependAvatar ? vue.createVNode(VAvatar, {
              "start": true
            }, null) : props.prependIcon ? vue.createVNode(VIcon, {
              "start": true
            }, null) : undefined]
          }), ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isSelected: group == null ? void 0 : group.isSelected.value,
            selectedClass: group == null ? void 0 : group.selectedClass.value,
            select: group == null ? void 0 : group.select,
            toggle: group == null ? void 0 : group.toggle,
            value: group == null ? void 0 : group.value.value,
            disabled: props.disabled
          })) ?? props.text, hasAppend && vue.createVNode(VDefaultsProvider, {
            "key": "append",
            "defaults": {
              VAvatar: {
                image: props.appendAvatar
              },
              VIcon: {
                icon: props.appendIcon
              }
            }
          }, {
            default: () => [slots.append ? vue.createVNode("div", {
              "class": "v-chip__append"
            }, [slots.append()]) : props.appendAvatar ? vue.createVNode(VAvatar, {
              "end": true
            }, null) : props.appendIcon ? vue.createVNode(VIcon, {
              "end": true
            }, null) : undefined]
          }), hasClose && vue.createVNode(VDefaultsProvider, {
            "key": "close",
            "defaults": {
              VIcon: {
                icon: props.closeIcon,
                size: 'x-small'
              }
            }
          }, {
            default: () => [vue.createVNode("div", {
              "class": "v-chip__close",
              "onClick": onCloseClick
            }, [slots.close ? slots.close() : vue.createVNode(VIcon, null, null)])]
          })]
        }), [[vue.resolveDirective("ripple"), isClickable.value && props.ripple, null]]);
      };
    }
  });

  // Types

  const VDivider = defineComponent({
    name: 'VDivider',
    props: {
      color: String,
      inset: Boolean,
      length: [Number, String],
      thickness: [Number, String],
      vertical: Boolean,
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        attrs
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const dividerStyles = vue.computed(() => {
        const styles = {};
        if (props.length) {
          styles[props.vertical ? 'maxHeight' : 'maxWidth'] = convertToUnit(props.length);
        }
        if (props.thickness) {
          styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = convertToUnit(props.thickness);
        }
        return styles;
      });
      useRender(() => vue.createVNode("hr", {
        "class": [{
          'v-divider': true,
          'v-divider--inset': props.inset,
          'v-divider--vertical': props.vertical
        }, themeClasses.value, backgroundColorClasses.value],
        "style": [dividerStyles.value, backgroundColorStyles.value],
        "aria-orientation": !attrs.role || attrs.role === 'separator' ? props.vertical ? 'vertical' : 'horizontal' : undefined,
        "role": `${attrs.role || 'separator'}`
      }, null));
      return {};
    }
  });

  // Utilities

  // List
  const ListKey = Symbol.for('vuetify:list');
  function createList() {
    const parent = vue.inject(ListKey, {
      hasPrepend: vue.ref(false),
      updateHasPrepend: () => null
    });
    const data = {
      hasPrepend: vue.ref(false),
      updateHasPrepend: value => {
        if (value) data.hasPrepend.value = value;
      }
    };
    vue.provide(ListKey, data);
    return parent;
  }
  function useList() {
    return vue.inject(ListKey, null);
  }

  const singleOpenStrategy = {
    open: _ref => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref;
      if (value) {
        const newOpened = new Set();
        newOpened.add(id);
        let parent = parents.get(id);
        while (parent != null) {
          newOpened.add(parent);
          parent = parents.get(parent);
        }
        return newOpened;
      } else {
        opened.delete(id);
        return opened;
      }
    },
    select: () => null
  };
  const multipleOpenStrategy = {
    open: _ref2 => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref2;
      if (value) {
        let parent = parents.get(id);
        opened.add(id);
        while (parent != null && parent !== id) {
          opened.add(parent);
          parent = parents.get(parent);
        }
        return opened;
      } else {
        opened.delete(id);
      }
      return opened;
    },
    select: () => null
  };
  const listOpenStrategy = {
    open: multipleOpenStrategy.open,
    select: _ref3 => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref3;
      if (!value) return opened;
      const path = [];
      let parent = parents.get(id);
      while (parent != null) {
        path.push(parent);
        parent = parents.get(parent);
      }
      return new Set(path);
    }
  };

  /* eslint-disable sonarjs/no-identical-functions */

  const independentSelectStrategy = mandatory => {
    const strategy = {
      select: _ref => {
        let {
          id,
          value,
          selected
        } = _ref;
        // When mandatory and we're trying to deselect when id
        // is the only currently selected item then do nothing
        if (mandatory && !value) {
          const on = Array.from(selected.entries()).reduce((arr, _ref2) => {
            let [key, value] = _ref2;
            return value === 'on' ? [...arr, key] : arr;
          }, []);
          if (on.length === 1 && on[0] === id) return selected;
        }
        selected.set(id, value ? 'on' : 'off');
        return selected;
      },
      in: (v, children, parents) => {
        let map = new Map();
        for (const id of v || []) {
          map = strategy.select({
            id,
            value: true,
            selected: new Map(map),
            children,
            parents
          });
        }
        return map;
      },
      out: v => {
        const arr = [];
        for (const [key, value] of v.entries()) {
          if (value === 'on') arr.push(key);
        }
        return arr;
      }
    };
    return strategy;
  };
  const independentSingleSelectStrategy = mandatory => {
    const parentStrategy = independentSelectStrategy(mandatory);
    const strategy = {
      select: _ref3 => {
        let {
          selected,
          id,
          ...rest
        } = _ref3;
        const singleSelected = selected.has(id) ? new Map([[id, selected.get(id)]]) : new Map();
        return parentStrategy.select({
          ...rest,
          id,
          selected: singleSelected
        });
      },
      in: (v, children, parents) => {
        let map = new Map();
        if (v != null && v.length) {
          map = parentStrategy.in(v.slice(0, 1), children, parents);
        }
        return map;
      },
      out: (v, children, parents) => {
        return parentStrategy.out(v, children, parents);
      }
    };
    return strategy;
  };
  const leafSelectStrategy = mandatory => {
    const parentStrategy = independentSelectStrategy(mandatory);
    const strategy = {
      select: _ref4 => {
        let {
          id,
          selected,
          children,
          ...rest
        } = _ref4;
        if (children.has(id)) return selected;
        return parentStrategy.select({
          id,
          selected,
          children,
          ...rest
        });
      },
      in: parentStrategy.in,
      out: parentStrategy.out
    };
    return strategy;
  };
  const leafSingleSelectStrategy = mandatory => {
    const parentStrategy = independentSingleSelectStrategy(mandatory);
    const strategy = {
      select: _ref5 => {
        let {
          id,
          selected,
          children,
          ...rest
        } = _ref5;
        if (children.has(id)) return selected;
        return parentStrategy.select({
          id,
          selected,
          children,
          ...rest
        });
      },
      in: parentStrategy.in,
      out: parentStrategy.out
    };
    return strategy;
  };
  const classicSelectStrategy = mandatory => {
    const strategy = {
      select: _ref6 => {
        let {
          id,
          value,
          selected,
          children,
          parents
        } = _ref6;
        const original = new Map(selected);
        const items = [id];
        while (items.length) {
          const item = items.shift();
          selected.set(item, value ? 'on' : 'off');
          if (children.has(item)) {
            items.push(...children.get(item));
          }
        }
        let parent = parents.get(id);
        while (parent) {
          const childrenIds = children.get(parent);
          const everySelected = childrenIds.every(cid => selected.get(cid) === 'on');
          const noneSelected = childrenIds.every(cid => !selected.has(cid) || selected.get(cid) === 'off');
          selected.set(parent, everySelected ? 'on' : noneSelected ? 'off' : 'indeterminate');
          parent = parents.get(parent);
        }

        // If mandatory and planned deselect results in no selected
        // items then we can't do it, so return original state
        if (mandatory && !value) {
          const on = Array.from(selected.entries()).reduce((arr, _ref7) => {
            let [key, value] = _ref7;
            return value === 'on' ? [...arr, key] : arr;
          }, []);
          if (on.length === 0) return original;
        }
        return selected;
      },
      in: (v, children, parents) => {
        let map = new Map();
        for (const id of v || []) {
          map = strategy.select({
            id,
            value: true,
            selected: new Map(map),
            children,
            parents
          });
        }
        return map;
      },
      out: (v, children) => {
        const arr = [];
        for (const [key, value] of v.entries()) {
          if (value === 'on' && !children.has(key)) arr.push(key);
        }
        return arr;
      }
    };
    return strategy;
  };

  // Types

  const VNestedSymbol = Symbol.for('vuetify:nested');
  const emptyNested = {
    id: vue.ref(),
    root: {
      register: () => null,
      unregister: () => null,
      parents: vue.ref(new Map()),
      children: vue.ref(new Map()),
      open: () => null,
      openOnSelect: () => null,
      select: () => null,
      opened: vue.ref(new Set()),
      selected: vue.ref(new Map()),
      selectedValues: vue.ref([])
    }
  };
  const makeNestedProps = propsFactory({
    selectStrategy: [String, Function],
    openStrategy: [String, Object],
    opened: Array,
    selected: Array,
    mandatory: Boolean
  }, 'nested');
  const useNested = props => {
    let isUnmounted = false;
    const children = vue.ref(new Map());
    const parents = vue.ref(new Map());
    const opened = useProxiedModel(props, 'opened', props.opened, v => new Set(v), v => [...v.values()]);
    const selectStrategy = vue.computed(() => {
      if (typeof props.selectStrategy === 'object') return props.selectStrategy;
      switch (props.selectStrategy) {
        case 'single-leaf':
          return leafSingleSelectStrategy(props.mandatory);
        case 'leaf':
          return leafSelectStrategy(props.mandatory);
        case 'independent':
          return independentSelectStrategy(props.mandatory);
        case 'single-independent':
          return independentSingleSelectStrategy(props.mandatory);
        case 'classic':
        default:
          return classicSelectStrategy(props.mandatory);
      }
    });
    const openStrategy = vue.computed(() => {
      if (typeof props.openStrategy === 'object') return props.openStrategy;
      switch (props.openStrategy) {
        case 'list':
          return listOpenStrategy;
        case 'single':
          return singleOpenStrategy;
        case 'multiple':
        default:
          return multipleOpenStrategy;
      }
    });
    const selected = useProxiedModel(props, 'selected', props.selected, v => selectStrategy.value.in(v, children.value, parents.value), v => selectStrategy.value.out(v, children.value, parents.value));
    vue.onBeforeUnmount(() => {
      isUnmounted = true;
    });
    function getPath(id) {
      const path = [];
      let parent = id;
      while (parent != null) {
        path.unshift(parent);
        parent = parents.value.get(parent);
      }
      return path;
    }
    const vm = getCurrentInstance('nested');
    const nested = {
      id: vue.ref(),
      root: {
        opened,
        selected,
        selectedValues: vue.computed(() => {
          const arr = [];
          for (const [key, value] of selected.value.entries()) {
            if (value === 'on') arr.push(key);
          }
          return arr;
        }),
        register: (id, parentId, isGroup) => {
          parentId && id !== parentId && parents.value.set(id, parentId);
          isGroup && children.value.set(id, []);
          if (parentId != null) {
            children.value.set(parentId, [...(children.value.get(parentId) || []), id]);
          }
        },
        unregister: id => {
          if (isUnmounted) return;
          children.value.delete(id);
          const parent = parents.value.get(id);
          if (parent) {
            const list = children.value.get(parent) ?? [];
            children.value.set(parent, list.filter(child => child !== id));
          }
          parents.value.delete(id);
          opened.value.delete(id);
        },
        open: (id, value, event) => {
          vm.emit('click:open', {
            id,
            value,
            path: getPath(id),
            event
          });
          const newOpened = openStrategy.value.open({
            id,
            value,
            opened: new Set(opened.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newOpened && (opened.value = newOpened);
        },
        openOnSelect: (id, value, event) => {
          const newOpened = openStrategy.value.select({
            id,
            value,
            selected: new Map(selected.value),
            opened: new Set(opened.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newOpened && (opened.value = newOpened);
        },
        select: (id, value, event) => {
          vm.emit('click:select', {
            id,
            value,
            path: getPath(id),
            event
          });
          const newSelected = selectStrategy.value.select({
            id,
            value,
            selected: new Map(selected.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newSelected && (selected.value = newSelected);
          nested.root.openOnSelect(id, value, event);
        },
        children,
        parents
      }
    };
    vue.provide(VNestedSymbol, nested);
    return nested.root;
  };
  const useNestedItem = (id, isGroup) => {
    const parent = vue.inject(VNestedSymbol, emptyNested);
    const computedId = vue.computed(() => id.value ?? Symbol(getUid()));
    const item = {
      ...parent,
      id: computedId,
      open: (open, e) => parent.root.open(computedId.value, open, e),
      openOnSelect: (open, e) => parent.root.openOnSelect(computedId.value, open, e),
      isOpen: vue.computed(() => parent.root.opened.value.has(computedId.value)),
      parent: vue.computed(() => parent.root.parents.value.get(computedId.value)),
      select: (selected, e) => parent.root.select(computedId.value, selected, e),
      isSelected: vue.computed(() => parent.root.selected.value.get(computedId.value) === 'on'),
      isIndeterminate: vue.computed(() => parent.root.selected.value.get(computedId.value) === 'indeterminate'),
      isLeaf: vue.computed(() => !parent.root.children.value.get(computedId.value)),
      isGroupActivator: parent.isGroupActivator
    };
    !parent.isGroupActivator && parent.root.register(computedId.value, parent.id.value, isGroup);
    vue.onBeforeUnmount(() => {
      !parent.isGroupActivator && parent.root.unregister(computedId.value);
    });
    isGroup && vue.provide(VNestedSymbol, item);
    return item;
  };
  const useNestedGroupActivator = () => {
    const parent = vue.inject(VNestedSymbol, emptyNested);
    vue.provide(VNestedSymbol, {
      ...parent,
      isGroupActivator: true
    });
  };

  // Types

  const VListGroupActivator = defineComponent({
    name: 'VListGroupActivator',
    setup(_, _ref) {
      let {
        slots
      } = _ref;
      useNestedGroupActivator();
      return () => {
        var _slots$default;
        return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
      };
    }
  });
  const makeVListGroupProps = propsFactory({
    activeColor: String,
    color: String,
    collapseIcon: {
      type: IconValue,
      default: '$collapse'
    },
    expandIcon: {
      type: IconValue,
      default: '$expand'
    },
    prependIcon: IconValue,
    appendIcon: IconValue,
    fluid: Boolean,
    subgroup: Boolean,
    value: null,
    ...makeTagProps()
  }, 'v-list-group');
  const VListGroup = genericComponent()({
    name: 'VListGroup',
    props: {
      title: String,
      ...makeVListGroupProps()
    },
    setup(props, _ref2) {
      let {
        slots
      } = _ref2;
      const {
        isOpen,
        open,
        id: _id
      } = useNestedItem(vue.toRef(props, 'value'), true);
      const id = vue.computed(() => `v-list-group--id-${String(_id.value)}`);
      const list = useList();
      function onClick(e) {
        open(!isOpen.value, e);
      }
      const activatorProps = vue.computed(() => ({
        onClick,
        class: 'v-list-group__header',
        id: id.value
      }));
      const toggleIcon = vue.computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
      useRender(() => {
        var _slots$default2;
        return vue.createVNode(props.tag, {
          "class": ['v-list-group', {
            'v-list-group--prepend': list == null ? void 0 : list.hasPrepend.value,
            'v-list-group--fluid': props.fluid,
            'v-list-group--subgroup': props.subgroup,
            'v-list-group--open': isOpen.value
          }]
        }, {
          default: () => [slots.activator && vue.createVNode(VDefaultsProvider, {
            "defaults": {
              VListItem: {
                active: isOpen.value,
                activeColor: props.activeColor,
                color: props.color,
                prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
                appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
                title: props.title,
                value: props.value
              }
            }
          }, {
            default: () => [vue.createVNode(VListGroupActivator, null, {
              default: () => [slots.activator({
                props: activatorProps.value,
                isOpen
              })]
            })]
          }), vue.createVNode(VExpandTransition, null, {
            default: () => [vue.withDirectives(vue.createVNode("div", {
              "class": "v-list-group__items",
              "role": "group",
              "aria-labelledby": id.value
            }, [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]), [[vue.vShow, isOpen.value]])]
          })]
        });
      });
      return {};
    }
  });
  function filterListGroupProps(props) {
    return pick(props, Object.keys(VListGroup.props));
  }

  const VListItemSubtitle = createSimpleFunctional('v-list-item-subtitle');

  const VListItemTitle = createSimpleFunctional('v-list-item-title');

  // Types

  const VListItem = genericComponent()({
    name: 'VListItem',
    directives: {
      Ripple
    },
    props: {
      active: {
        type: Boolean,
        default: undefined
      },
      activeClass: String,
      activeColor: String,
      appendAvatar: String,
      appendIcon: IconValue,
      disabled: Boolean,
      lines: String,
      link: {
        type: Boolean,
        default: undefined
      },
      nav: Boolean,
      prependAvatar: String,
      prependIcon: IconValue,
      subtitle: [String, Number, Boolean],
      title: [String, Number, Boolean],
      value: null,
      onClick: EventProp,
      onClickOnce: EventProp,
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeRoundedProps(),
      ...makeRouterProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: 'text'
      })
    },
    emits: {
      click: e => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots,
        emit
      } = _ref;
      const link = useLink(props, attrs);
      const id = vue.computed(() => props.value ?? link.href.value);
      const {
        select,
        isSelected,
        isIndeterminate,
        isGroupActivator,
        root,
        parent,
        openOnSelect
      } = useNestedItem(id, false);
      const list = useList();
      const isActive = vue.computed(() => {
        var _link$isActive;
        return props.active !== false && (props.active || ((_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value) || isSelected.value);
      });
      const isLink = vue.computed(() => props.link !== false && link.isLink.value);
      const isClickable = vue.computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || props.value != null && !!list));
      const roundedProps = vue.computed(() => props.rounded || props.nav);
      const variantProps = vue.computed(() => ({
        color: isActive.value ? props.activeColor ?? props.color : props.color,
        variant: props.variant
      }));
      vue.watch(() => {
        var _link$isActive2;
        return (_link$isActive2 = link.isActive) == null ? void 0 : _link$isActive2.value;
      }, val => {
        if (val && parent.value != null) {
          root.open(parent.value, true);
        }
        if (val) {
          openOnSelect(val);
        }
      }, {
        immediate: true
      });
      const {
        themeClasses
      } = provideTheme(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(variantProps);
      const {
        densityClasses
      } = useDensity(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(roundedProps);
      const lineClasses = vue.computed(() => props.lines ? `v-list-item--${props.lines}-line` : undefined);
      const slotProps = vue.computed(() => ({
        isActive: isActive.value,
        select,
        isSelected: isSelected.value,
        isIndeterminate: isIndeterminate.value
      }));
      function onClick(e) {
        var _link$navigate;
        emit('click', e);
        if (isGroupActivator || !isClickable.value) return;
        (_link$navigate = link.navigate) == null ? void 0 : _link$navigate.call(link, e);
        props.value != null && select(!isSelected.value, e);
      }
      function onKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      }
      useRender(() => {
        var _slots$prepend, _slots$title, _slots$subtitle, _slots$default, _slots$append;
        const Tag = isLink.value ? 'a' : props.tag;
        const hasColor = !list || isSelected.value || isActive.value;
        const hasTitle = slots.title || props.title;
        const hasSubtitle = slots.subtitle || props.subtitle;
        const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
        const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
        list == null ? void 0 : list.updateHasPrepend(hasPrepend);
        return vue.withDirectives(vue.createVNode(Tag, {
          "class": ['v-list-item', {
            'v-list-item--active': isActive.value,
            'v-list-item--disabled': props.disabled,
            'v-list-item--link': isClickable.value,
            'v-list-item--nav': props.nav,
            'v-list-item--prepend': !hasPrepend && (list == null ? void 0 : list.hasPrepend.value),
            [`${props.activeClass}`]: props.activeClass && isActive.value
          }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : undefined, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value],
          "style": [hasColor ? colorStyles.value : undefined, dimensionStyles.value],
          "href": link.href.value,
          "tabindex": isClickable.value ? 0 : undefined,
          "onClick": onClick,
          "onKeydown": isClickable.value && !isLink.value && onKeyDown
        }, {
          default: () => [genOverlays(isClickable.value || isActive.value, 'v-list-item'), hasPrepend && vue.createVNode(VDefaultsProvider, {
            "key": "prepend",
            "defaults": {
              VAvatar: {
                density: props.density,
                image: props.prependAvatar
              },
              VIcon: {
                density: props.density,
                icon: props.prependIcon
              },
              VListItemAction: {
                start: true
              }
            }
          }, {
            default: () => [vue.createVNode("div", {
              "class": "v-list-item__prepend"
            }, [props.prependAvatar && vue.createVNode(VAvatar, {
              "key": "prepend-avatar"
            }, null), props.prependIcon && vue.createVNode(VIcon, {
              "key": "prepend-icon"
            }, null), (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps.value)])]
          }), vue.createVNode("div", {
            "class": "v-list-item__content",
            "data-no-activator": ""
          }, [hasTitle && vue.createVNode(VListItemTitle, {
            "key": "title"
          }, {
            default: () => [((_slots$title = slots.title) == null ? void 0 : _slots$title.call(slots, {
              title: props.title
            })) ?? props.title]
          }), hasSubtitle && vue.createVNode(VListItemSubtitle, {
            "key": "subtitle"
          }, {
            default: () => [((_slots$subtitle = slots.subtitle) == null ? void 0 : _slots$subtitle.call(slots, {
              subtitle: props.subtitle
            })) ?? props.subtitle]
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value)]), hasAppend && vue.createVNode(VDefaultsProvider, {
            "key": "append",
            "defaults": {
              VAvatar: {
                density: props.density,
                image: props.appendAvatar
              },
              VIcon: {
                density: props.density,
                icon: props.appendIcon
              },
              VListItemAction: {
                end: true
              }
            }
          }, {
            default: () => [vue.createVNode("div", {
              "class": "v-list-item__append"
            }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, slotProps.value), props.appendIcon && vue.createVNode(VIcon, {
              "key": "append-icon"
            }, null), props.appendAvatar && vue.createVNode(VAvatar, {
              "key": "append-avatar"
            }, null)])]
          })]
        }), [[vue.resolveDirective("ripple"), isClickable.value]]);
      });
      return {};
    }
  });

  const VListSubheader = defineComponent({
    name: 'VListSubheader',
    props: {
      color: String,
      inset: Boolean,
      sticky: Boolean,
      title: String,
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, 'color'));
      useRender(() => {
        var _slots$default;
        const hasText = !!(slots.default || props.title);
        return vue.createVNode(props.tag, {
          "class": ['v-list-subheader', {
            'v-list-subheader--inset': props.inset,
            'v-list-subheader--sticky': props.sticky
          }, textColorClasses.value],
          "style": {
            textColorStyles
          }
        }, {
          default: () => [hasText && vue.createVNode("div", {
            "class": "v-list-subheader__text"
          }, [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? props.title])]
        });
      });
      return {};
    }
  });

  // Types

  const VListChildren = genericComponent()({
    name: 'VListChildren',
    props: {
      items: Array
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      createList();
      return () => {
        var _slots$default, _props$items;
        return ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? ((_props$items = props.items) == null ? void 0 : _props$items.map(_ref2 => {
          let {
            children,
            props: itemProps,
            type,
            raw: item
          } = _ref2;
          if (type === 'divider') {
            var _slots$divider;
            return ((_slots$divider = slots.divider) == null ? void 0 : _slots$divider.call(slots, {
              props: itemProps
            })) ?? vue.createVNode(VDivider, itemProps, null);
          }
          if (type === 'subheader') {
            var _slots$subheader;
            return ((_slots$subheader = slots.subheader) == null ? void 0 : _slots$subheader.call(slots, {
              props: itemProps
            })) ?? vue.createVNode(VListSubheader, itemProps, {
              default: slots.subheader
            });
          }
          const slotsWithItem = {
            subtitle: slots.subtitle ? slotProps => {
              var _slots$subtitle;
              return (_slots$subtitle = slots.subtitle) == null ? void 0 : _slots$subtitle.call(slots, {
                ...slotProps,
                item
              });
            } : undefined,
            prepend: slots.prepend ? slotProps => {
              var _slots$prepend;
              return (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, {
                ...slotProps,
                item
              });
            } : undefined,
            append: slots.append ? slotProps => {
              var _slots$append;
              return (_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, {
                ...slotProps,
                item
              });
            } : undefined,
            default: slots.default ? slotProps => {
              var _slots$default2;
              return (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots, {
                ...slotProps,
                item
              });
            } : undefined,
            title: slots.title ? slotProps => {
              var _slots$title;
              return (_slots$title = slots.title) == null ? void 0 : _slots$title.call(slots, {
                ...slotProps,
                item
              });
            } : undefined
          };
          const [listGroupProps, _1] = filterListGroupProps(itemProps);
          return children ? vue.createVNode(VListGroup, vue.mergeProps({
            "value": itemProps == null ? void 0 : itemProps.value
          }, listGroupProps), {
            activator: _ref3 => {
              let {
                props: activatorProps
              } = _ref3;
              return slots.header ? slots.header({
                ...itemProps,
                ...activatorProps
              }) : vue.createVNode(VListItem, vue.mergeProps(itemProps, activatorProps), slotsWithItem);
            },
            default: () => vue.createVNode(VListChildren, {
              "items": children
            }, slots)
          }) : slots.item ? slots.item(itemProps) : vue.createVNode(VListItem, itemProps, slotsWithItem);
        }));
      };
    }
  });

  // Utilities

  // Types

  // Composables
  const makeItemsProps = propsFactory({
    items: {
      type: Array,
      default: () => []
    },
    itemTitle: {
      type: [String, Array, Function],
      default: 'title'
    },
    itemValue: {
      type: [String, Array, Function],
      default: 'value'
    },
    itemChildren: {
      type: [Boolean, String, Array, Function],
      default: 'children'
    },
    itemProps: {
      type: [Boolean, String, Array, Function],
      default: 'props'
    },
    returnObject: Boolean
  }, 'item');
  function transformItem$1(props, item) {
    const title = getPropertyFromItem(item, props.itemTitle, item);
    const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue, title);
    const children = getPropertyFromItem(item, props.itemChildren);
    const itemProps = props.itemProps === true ? typeof item === 'object' && item != null && !Array.isArray(item) ? 'children' in item ? pick(item, ['children'])[1] : item : undefined : getPropertyFromItem(item, props.itemProps);
    const _props = {
      title,
      value,
      ...itemProps
    };
    return {
      title: String(_props.title ?? ''),
      value: _props.value,
      props: _props,
      children: Array.isArray(children) ? transformItems$1(props, children) : undefined,
      raw: item
    };
  }
  function transformItems$1(props, items) {
    const array = [];
    for (const item of items) {
      array.push(transformItem$1(props, item));
    }
    return array;
  }
  function useItems(props) {
    const items = vue.computed(() => transformItems$1(props, props.items));
    function transformIn(value) {
      return value.map(item => transformItem$1(props, item));
    }
    function transformOut(value) {
      return value.map(_ref => {
        let {
          props
        } = _ref;
        return props.value;
      });
    }
    return {
      items,
      transformIn,
      transformOut
    };
  }

  // Types

  function transformItem(props, item) {
    const type = getPropertyFromItem(item, props.itemType, 'item');
    const title = typeof item === 'string' ? item : getPropertyFromItem(item, props.itemTitle);
    const value = getPropertyFromItem(item, props.itemValue, undefined);
    const children = getPropertyFromItem(item, props.itemChildren);
    const itemProps = props.itemProps === true ? pick(item, ['children'])[1] : getPropertyFromItem(item, props.itemProps);
    const _props = {
      title,
      value,
      ...itemProps
    };
    return {
      type,
      title: _props.title,
      value: _props.value,
      props: _props,
      children: type === 'item' && children ? transformItems(props, children) : undefined,
      raw: item
    };
  }
  function transformItems(props, items) {
    const array = [];
    for (const item of items) {
      array.push(transformItem(props, item));
    }
    return array;
  }
  function useListItems(props) {
    const items = vue.computed(() => transformItems(props, props.items));
    return {
      items
    };
  }
  const VList = genericComponent()({
    name: 'VList',
    props: {
      activeColor: String,
      activeClass: String,
      bgColor: String,
      disabled: Boolean,
      lines: {
        type: [Boolean, String],
        default: 'one'
      },
      nav: Boolean,
      ...makeNestedProps({
        selectStrategy: 'single-leaf',
        openStrategy: 'list'
      }),
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      itemType: {
        type: String,
        default: 'type'
      },
      ...makeItemsProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: 'text'
      })
    },
    emits: {
      'update:selected': val => true,
      'update:opened': val => true,
      'click:open': value => true,
      'click:select': value => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        items
      } = useListItems(props);
      const {
        themeClasses
      } = provideTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'bgColor'));
      const {
        borderClasses
      } = useBorder(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        open,
        select
      } = useNested(props);
      const lineClasses = vue.computed(() => props.lines ? `v-list--${props.lines}-line` : undefined);
      const activeColor = vue.toRef(props, 'activeColor');
      const color = vue.toRef(props, 'color');
      createList();
      provideDefaults({
        VListGroup: {
          activeColor,
          color
        },
        VListItem: {
          activeClass: vue.toRef(props, 'activeClass'),
          activeColor,
          color,
          density: vue.toRef(props, 'density'),
          disabled: vue.toRef(props, 'disabled'),
          lines: vue.toRef(props, 'lines'),
          nav: vue.toRef(props, 'nav'),
          variant: vue.toRef(props, 'variant')
        }
      });
      const isFocused = vue.ref(false);
      const contentRef = vue.ref();
      function onFocusin(e) {
        isFocused.value = true;
      }
      function onFocusout(e) {
        isFocused.value = false;
      }
      function onFocus(e) {
        var _contentRef$value;
        if (!isFocused.value && !(e.relatedTarget && (_contentRef$value = contentRef.value) != null && _contentRef$value.contains(e.relatedTarget))) focus();
      }
      function onKeydown(e) {
        if (!contentRef.value) return;
        if (e.key === 'ArrowDown') {
          focus('next');
        } else if (e.key === 'ArrowUp') {
          focus('prev');
        } else if (e.key === 'Home') {
          focus('first');
        } else if (e.key === 'End') {
          focus('last');
        } else {
          return;
        }
        e.preventDefault();
      }
      function focus(location) {
        if (!contentRef.value) return;
        const focusable = [...contentRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(el => !el.hasAttribute('disabled'));
        const idx = focusable.indexOf(document.activeElement);
        if (!location) {
          if (!contentRef.value.contains(document.activeElement)) {
            var _focusable$;
            (_focusable$ = focusable[0]) == null ? void 0 : _focusable$.focus();
          }
        } else if (location === 'first') {
          var _focusable$2;
          (_focusable$2 = focusable[0]) == null ? void 0 : _focusable$2.focus();
        } else if (location === 'last') {
          var _focusable$at;
          (_focusable$at = focusable.at(-1)) == null ? void 0 : _focusable$at.focus();
        } else {
          let el;
          let idxx = idx;
          const inc = location === 'next' ? 1 : -1;
          do {
            idxx += inc;
            el = focusable[idxx];
          } while ((!el || el.offsetParent == null) && idxx < focusable.length && idxx >= 0);
          if (el) el.focus();else focus(location === 'next' ? 'first' : 'last');
        }
      }
      useRender(() => {
        return vue.createVNode(props.tag, {
          "ref": contentRef,
          "class": ['v-list', {
            'v-list--disabled': props.disabled,
            'v-list--nav': props.nav
          }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value],
          "style": [backgroundColorStyles.value, dimensionStyles.value],
          "role": "listbox",
          "aria-activedescendant": undefined,
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onFocus": onFocus,
          "onKeydown": onKeydown
        }, {
          default: () => [vue.createVNode(VListChildren, {
            "items": items.value
          }, slots)]
        });
      });
      return {
        open,
        select,
        focus
      };
    }
  });

  // Utilities

  // Types

  // Composables
  const makeDelayProps = propsFactory({
    closeDelay: [Number, String],
    openDelay: [Number, String]
  }, 'delay');
  function useDelay(props, cb) {
    const delays = {};
    const runDelayFactory = prop => () => {
      // istanbul ignore next
      if (!IN_BROWSER) return Promise.resolve(true);
      const active = prop === 'openDelay';
      delays.closeDelay && window.clearTimeout(delays.closeDelay);
      delete delays.closeDelay;
      delays.openDelay && window.clearTimeout(delays.openDelay);
      delete delays.openDelay;
      return new Promise(resolve => {
        const delay = parseInt(props[prop] ?? 0, 10);
        delays[prop] = window.setTimeout(() => {
          cb == null ? void 0 : cb(active);
          resolve(active);
        }, delay);
      });
    };
    return {
      runCloseDelay: runDelayFactory('closeDelay'),
      runOpenDelay: runDelayFactory('openDelay')
    };
  }

  const VMenuSymbol = Symbol.for('vuetify:v-menu');

  // Composables

  // Types

  const makeActivatorProps = propsFactory({
    activator: [String, Object],
    activatorProps: {
      type: Object,
      default: () => ({})
    },
    openOnClick: {
      type: Boolean,
      default: undefined
    },
    openOnHover: Boolean,
    openOnFocus: {
      type: Boolean,
      default: undefined
    },
    closeOnContentClick: Boolean,
    ...makeDelayProps()
  }, 'v-overlay-activator');
  function useActivator(props, _ref) {
    let {
      isActive,
      isTop
    } = _ref;
    const activatorEl = vue.ref();
    let isHovered = false;
    let isFocused = false;
    let firstEnter = true;
    const openOnFocus = vue.computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
    const openOnClick = vue.computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, value => {
      if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
        if (isActive.value !== value) {
          firstEnter = true;
        }
        isActive.value = value;
      }
    });
    const availableEvents = {
      click: e => {
        e.stopPropagation();
        activatorEl.value = e.currentTarget || e.target;
        isActive.value = !isActive.value;
      },
      mouseenter: e => {
        isHovered = true;
        activatorEl.value = e.currentTarget || e.target;
        runOpenDelay();
      },
      mouseleave: e => {
        isHovered = false;
        runCloseDelay();
      },
      focus: e => {
        if (SUPPORTS_FOCUS_VISIBLE && !e.target.matches(':focus-visible')) return;
        isFocused = true;
        e.stopPropagation();
        activatorEl.value = e.currentTarget || e.target;
        runOpenDelay();
      },
      blur: e => {
        isFocused = false;
        e.stopPropagation();
        runCloseDelay();
      }
    };
    const activatorEvents = vue.computed(() => {
      const events = {};
      if (openOnClick.value) {
        events.click = availableEvents.click;
      }
      if (props.openOnHover) {
        events.mouseenter = availableEvents.mouseenter;
        events.mouseleave = availableEvents.mouseleave;
      }
      if (openOnFocus.value) {
        events.focus = availableEvents.focus;
        events.blur = availableEvents.blur;
      }
      return events;
    });
    const contentEvents = vue.computed(() => {
      const events = {};
      if (props.openOnHover) {
        events.mouseenter = () => {
          isHovered = true;
          runOpenDelay();
        };
        events.mouseleave = () => {
          isHovered = false;
          runCloseDelay();
        };
      }
      if (props.closeOnContentClick) {
        const menu = vue.inject(VMenuSymbol, null);
        events.click = () => {
          isActive.value = false;
          menu == null ? void 0 : menu.closeParents();
        };
      }
      return events;
    });
    const scrimEvents = vue.computed(() => {
      const events = {};
      if (props.openOnHover) {
        events.mouseenter = () => {
          if (firstEnter) {
            isHovered = true;
            firstEnter = false;
            runOpenDelay();
          }
        };
        events.mouseleave = () => {
          isHovered = false;
          runCloseDelay();
        };
      }
      return events;
    });
    vue.watch(isTop, val => {
      if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered))) {
        isActive.value = false;
      }
    });
    const activatorRef = vue.ref();
    vue.watchEffect(() => {
      if (!activatorRef.value) return;
      vue.nextTick(() => {
        const activator = activatorRef.value;
        activatorEl.value = isComponentInstance(activator) ? activator.$el : activator;
      });
    });
    const vm = getCurrentInstance('useActivator');
    let scope;
    vue.watch(() => !!props.activator, val => {
      if (val && IN_BROWSER) {
        scope = vue.effectScope();
        scope.run(() => {
          _useActivator(props, vm, {
            activatorEl,
            activatorEvents
          });
        });
      } else if (scope) {
        scope.stop();
      }
    }, {
      flush: 'post',
      immediate: true
    });
    vue.onScopeDispose(() => {
      var _scope;
      (_scope = scope) == null ? void 0 : _scope.stop();
    });
    return {
      activatorEl,
      activatorRef,
      activatorEvents,
      contentEvents,
      scrimEvents
    };
  }
  function _useActivator(props, vm, _ref2) {
    let {
      activatorEl,
      activatorEvents
    } = _ref2;
    vue.watch(() => props.activator, (val, oldVal) => {
      if (oldVal && val !== oldVal) {
        const activator = getActivator(oldVal);
        activator && unbindActivatorProps(activator);
      }
      if (val) {
        vue.nextTick(() => bindActivatorProps());
      }
    }, {
      immediate: true
    });
    vue.watch(() => props.activatorProps, () => {
      bindActivatorProps();
    });
    vue.onScopeDispose(() => {
      unbindActivatorProps();
    });
    function bindActivatorProps() {
      let el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getActivator();
      let _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : props.activatorProps;
      if (!el) return;
      Object.entries(activatorEvents.value).forEach(_ref3 => {
        let [name, cb] = _ref3;
        el.addEventListener(name, cb);
      });
      Object.keys(_props).forEach(k => {
        if (_props[k] == null) {
          el.removeAttribute(k);
        } else {
          el.setAttribute(k, _props[k]);
        }
      });
    }
    function unbindActivatorProps() {
      let el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getActivator();
      let _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : props.activatorProps;
      if (!el) return;
      Object.entries(activatorEvents.value).forEach(_ref4 => {
        let [name, cb] = _ref4;
        el.removeEventListener(name, cb);
      });
      Object.keys(_props).forEach(k => {
        el.removeAttribute(k);
      });
    }
    function getActivator() {
      var _activator;
      let selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.activator;
      let activator;
      if (selector) {
        if (selector === 'parent') {
          var _vm$proxy, _vm$proxy$$el;
          let el = vm == null ? void 0 : (_vm$proxy = vm.proxy) == null ? void 0 : (_vm$proxy$$el = _vm$proxy.$el) == null ? void 0 : _vm$proxy$$el.parentNode;
          while (el.hasAttribute('data-no-activator')) {
            el = el.parentNode;
          }
          activator = el;
        } else if (typeof selector === 'string') {
          // Selector
          activator = document.querySelector(selector);
        } else if ('$el' in selector) {
          // Component (ref)
          activator = selector.$el;
        } else {
          // HTMLElement | Element
          activator = selector;
        }
      }

      // The activator should only be a valid element (Ignore comments and text nodes)
      activatorEl.value = ((_activator = activator) == null ? void 0 : _activator.nodeType) === Node.ELEMENT_NODE ? activator : null;
      return activatorEl.value;
    }
  }

  // Utilities
  const makeLazyProps = propsFactory({
    eager: Boolean
  }, 'lazy');
  function useLazy(props, active) {
    const isBooted = vue.ref(false);
    const hasContent = vue.computed(() => isBooted.value || props.eager || active.value);
    vue.watch(active, () => isBooted.value = true);
    function onAfterLeave() {
      if (!props.eager) isBooted.value = false;
    }
    return {
      isBooted,
      hasContent,
      onAfterLeave
    };
  }

  /** Convert a point in local space to viewport space */
  function elementToViewport(point, offset) {
    return {
      x: point.x + offset.x,
      y: point.y + offset.y
    };
  }

  /** Get the difference between two points */
  function getOffset(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    };
  }

  /** Convert an anchor object to a point in local space */
  function anchorToPoint(anchor, box) {
    if (anchor.side === 'top' || anchor.side === 'bottom') {
      const {
        side,
        align
      } = anchor;
      const x = align === 'left' ? 0 : align === 'center' ? box.width / 2 : align === 'right' ? box.width : align;
      const y = side === 'top' ? 0 : side === 'bottom' ? box.height : side;
      return elementToViewport({
        x,
        y
      }, box);
    } else if (anchor.side === 'left' || anchor.side === 'right') {
      const {
        side,
        align
      } = anchor;
      const x = side === 'left' ? 0 : side === 'right' ? box.width : side;
      const y = align === 'top' ? 0 : align === 'center' ? box.height / 2 : align === 'bottom' ? box.height : align;
      return elementToViewport({
        x,
        y
      }, box);
    }
    return elementToViewport({
      x: box.width / 2,
      y: box.height / 2
    }, box);
  }

  // Utilities

  // Types

  const locationStrategies = {
    static: staticLocationStrategy,
    // specific viewport position, usually centered
    connected: connectedLocationStrategy // connected to a certain element
  };

  const makeLocationStrategyProps = propsFactory({
    locationStrategy: {
      type: [String, Function],
      default: 'static',
      validator: val => typeof val === 'function' || val in locationStrategies
    },
    location: {
      type: String,
      default: 'bottom'
    },
    origin: {
      type: String,
      default: 'auto'
    },
    offset: [Number, String, Array]
  }, 'v-overlay-location-strategies');
  function useLocationStrategies(props, data) {
    const contentStyles = vue.ref({});
    const updateLocation = vue.ref();
    let scope;
    vue.watchEffect(async () => {
      var _scope;
      (_scope = scope) == null ? void 0 : _scope.stop();
      updateLocation.value = undefined;
      if (!(IN_BROWSER && data.isActive.value && props.locationStrategy)) return;
      scope = vue.effectScope();
      if (!(props.locationStrategy === 'connected')) {
        await vue.nextTick();
      }
      scope.run(() => {
        if (typeof props.locationStrategy === 'function') {
          var _props$locationStrate;
          updateLocation.value = (_props$locationStrate = props.locationStrategy(data, props, contentStyles)) == null ? void 0 : _props$locationStrate.updateLocation;
        } else {
          var _locationStrategies$p;
          updateLocation.value = (_locationStrategies$p = locationStrategies[props.locationStrategy](data, props, contentStyles)) == null ? void 0 : _locationStrategies$p.updateLocation;
        }
      });
    });
    IN_BROWSER && window.addEventListener('resize', onResize, {
      passive: true
    });
    vue.onScopeDispose(() => {
      var _scope2;
      IN_BROWSER && window.removeEventListener('resize', onResize);
      updateLocation.value = undefined;
      (_scope2 = scope) == null ? void 0 : _scope2.stop();
    });
    function onResize(e) {
      var _updateLocation$value;
      (_updateLocation$value = updateLocation.value) == null ? void 0 : _updateLocation$value.call(updateLocation, e);
    }
    return {
      contentStyles,
      updateLocation
    };
  }
  function staticLocationStrategy() {
    // TODO
  }

  /** Get size of element ignoring max-width/max-height */
  function getIntrinsicSize(el) {
    // const scrollables = new Map<Element, [number, number]>()
    // el.querySelectorAll('*').forEach(el => {
    //   const x = el.scrollLeft
    //   const y = el.scrollTop
    //   if (x || y) {
    //     scrollables.set(el, [x, y])
    //   }
    // })

    // const initialMaxWidth = el.style.maxWidth
    // const initialMaxHeight = el.style.maxHeight
    // el.style.removeProperty('max-width')
    // el.style.removeProperty('max-height')

    /* eslint-disable-next-line sonarjs/prefer-immediate-return */
    const contentBox = nullifyTransforms(el);
    contentBox.x -= parseFloat(el.style.left || 0);
    contentBox.y -= parseFloat(el.style.top || 0);

    // el.style.maxWidth = initialMaxWidth
    // el.style.maxHeight = initialMaxHeight
    // scrollables.forEach((position, el) => {
    //   el.scrollTo(...position)
    // })

    return contentBox;
  }
  function connectedLocationStrategy(data, props, contentStyles) {
    const activatorFixed = isFixedPosition(data.activatorEl.value);
    if (activatorFixed) {
      Object.assign(contentStyles.value, {
        position: 'fixed'
      });
    }
    const {
      preferredAnchor,
      preferredOrigin
    } = destructComputed(() => {
      const parsedAnchor = parseAnchor(props.location, data.isRtl.value);
      const parsedOrigin = props.origin === 'overlap' ? parsedAnchor : props.origin === 'auto' ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);

      // Some combinations of props may produce an invalid origin
      if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
        return {
          preferredAnchor: flipCorner(parsedAnchor),
          preferredOrigin: flipCorner(parsedOrigin)
        };
      } else {
        return {
          preferredAnchor: parsedAnchor,
          preferredOrigin: parsedOrigin
        };
      }
    });
    const [minWidth, minHeight, maxWidth, maxHeight] = ['minWidth', 'minHeight', 'maxWidth', 'maxHeight'].map(key => {
      return vue.computed(() => {
        const val = parseFloat(props[key]);
        return isNaN(val) ? Infinity : val;
      });
    });
    const offset = vue.computed(() => {
      if (Array.isArray(props.offset)) {
        return props.offset;
      }
      if (typeof props.offset === 'string') {
        const offset = props.offset.split(' ').map(parseFloat);
        if (offset.length < 2) offset.push(0);
        return offset;
      }
      return typeof props.offset === 'number' ? [props.offset, 0] : [0, 0];
    });
    let observe = false;
    const observer = new ResizeObserver(() => {
      if (observe) updateLocation();
    });
    vue.watch([data.activatorEl, data.contentEl], (_ref, _ref2) => {
      let [newActivatorEl, newContentEl] = _ref;
      let [oldActivatorEl, oldContentEl] = _ref2;
      if (oldActivatorEl) observer.unobserve(oldActivatorEl);
      if (newActivatorEl) observer.observe(newActivatorEl);
      if (oldContentEl) observer.unobserve(oldContentEl);
      if (newContentEl) observer.observe(newContentEl);
    }, {
      immediate: true
    });
    vue.onScopeDispose(() => {
      observer.disconnect();
    });

    // eslint-disable-next-line max-statements
    function updateLocation() {
      observe = false;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => observe = true);
      });
      if (!data.activatorEl.value || !data.contentEl.value) return;
      const targetBox = data.activatorEl.value.getBoundingClientRect();
      const contentBox = getIntrinsicSize(data.contentEl.value);
      const scrollParents = getScrollParents(data.contentEl.value);
      const viewportMargin = 12;
      if (!scrollParents.length) {
        scrollParents.push(document.documentElement);
        if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
          contentBox.x += parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-x') || 0);
          contentBox.y += parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-y') || 0);
        }
      }
      const viewport = scrollParents.reduce((box, el) => {
        const rect = el.getBoundingClientRect();
        const scrollBox = new Box({
          x: el === document.documentElement ? 0 : rect.x,
          y: el === document.documentElement ? 0 : rect.y,
          width: el.clientWidth,
          height: el.clientHeight
        });
        if (box) {
          return new Box({
            x: Math.max(box.left, scrollBox.left),
            y: Math.max(box.top, scrollBox.top),
            width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
            height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
          });
        }
        return scrollBox;
      }, undefined);
      viewport.x += viewportMargin;
      viewport.y += viewportMargin;
      viewport.width -= viewportMargin * 2;
      viewport.height -= viewportMargin * 2;
      let placement = {
        anchor: preferredAnchor.value,
        origin: preferredOrigin.value
      };
      function checkOverflow(_placement) {
        const box = new Box(contentBox);
        const targetPoint = anchorToPoint(_placement.anchor, targetBox);
        const contentPoint = anchorToPoint(_placement.origin, box);
        let {
          x,
          y
        } = getOffset(targetPoint, contentPoint);
        switch (_placement.anchor.side) {
          case 'top':
            y -= offset.value[0];
            break;
          case 'bottom':
            y += offset.value[0];
            break;
          case 'left':
            x -= offset.value[0];
            break;
          case 'right':
            x += offset.value[0];
            break;
        }
        switch (_placement.anchor.align) {
          case 'top':
            y -= offset.value[1];
            break;
          case 'bottom':
            y += offset.value[1];
            break;
          case 'left':
            x -= offset.value[1];
            break;
          case 'right':
            x += offset.value[1];
            break;
        }
        box.x += x;
        box.y += y;
        box.width = Math.min(box.width, maxWidth.value);
        box.height = Math.min(box.height, maxHeight.value);
        const overflows = getOverflow(box, viewport);
        return {
          overflows,
          x,
          y
        };
      }
      let x = 0;
      let y = 0;
      const available = {
        x: 0,
        y: 0
      };
      const flipped = {
        x: false,
        y: false
      };
      let resets = -1;
      while (true) {
        if (resets++ > 10) {
          consoleError('Infinite loop detected in connectedLocationStrategy');
          break;
        }
        const {
          x: _x,
          y: _y,
          overflows
        } = checkOverflow(placement);
        x += _x;
        y += _y;
        contentBox.x += _x;
        contentBox.y += _y;

        // flip
        {
          const axis = getAxis(placement.anchor);
          const hasOverflowX = overflows.x.before || overflows.x.after;
          const hasOverflowY = overflows.y.before || overflows.y.after;
          let reset = false;
          ['x', 'y'].forEach(key => {
            if (key === 'x' && hasOverflowX && !flipped.x || key === 'y' && hasOverflowY && !flipped.y) {
              const newPlacement = {
                anchor: {
                  ...placement.anchor
                },
                origin: {
                  ...placement.origin
                }
              };
              const flip = key === 'x' ? axis === 'y' ? flipAlign : flipSide : axis === 'y' ? flipSide : flipAlign;
              newPlacement.anchor = flip(newPlacement.anchor);
              newPlacement.origin = flip(newPlacement.origin);
              const {
                overflows: newOverflows
              } = checkOverflow(newPlacement);
              if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
                placement = newPlacement;
                reset = flipped[key] = true;
              }
            }
          });
          if (reset) continue;
        }

        // shift
        if (overflows.x.before) {
          x += overflows.x.before;
          contentBox.x += overflows.x.before;
        }
        if (overflows.x.after) {
          x -= overflows.x.after;
          contentBox.x -= overflows.x.after;
        }
        if (overflows.y.before) {
          y += overflows.y.before;
          contentBox.y += overflows.y.before;
        }
        if (overflows.y.after) {
          y -= overflows.y.after;
          contentBox.y -= overflows.y.after;
        }

        // size
        {
          const overflows = getOverflow(contentBox, viewport);
          available.x = viewport.width - overflows.x.before - overflows.x.after;
          available.y = viewport.height - overflows.y.before - overflows.y.after;
          x += overflows.x.before;
          contentBox.x += overflows.x.before;
          y += overflows.y.before;
          contentBox.y += overflows.y.before;
        }
        break;
      }
      const axis = getAxis(placement.anchor);
      Object.assign(contentStyles.value, {
        '--v-overlay-anchor-origin': `${placement.anchor.side} ${placement.anchor.align}`,
        transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
        // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
        top: convertToUnit(pixelRound(y)),
        left: convertToUnit(pixelRound(x)),
        minWidth: convertToUnit(axis === 'y' ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
        maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
        maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
      });
    }
    vue.watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation(), {
      immediate: !activatorFixed
    });
    if (activatorFixed) vue.nextTick(() => updateLocation());
    requestAnimationFrame(() => {
      if (contentStyles.value.maxHeight) updateLocation();
    });
    return {
      updateLocation
    };
  }
  function pixelRound(val) {
    return Math.round(val * devicePixelRatio) / devicePixelRatio;
  }
  function pixelCeil(val) {
    return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
  }

  let clean = true;
  const frames = [];

  /**
   * Schedule a task to run in an animation frame on its own
   * This is useful for heavy tasks that may cause jank if all ran together
   */
  function requestNewFrame(cb) {
    if (!clean || frames.length) {
      frames.push(cb);
      run();
    } else {
      clean = false;
      cb();
      run();
    }
  }
  let raf = -1;
  function run() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const frame = frames.shift();
      if (frame) frame();
      if (frames.length) run();else clean = true;
    });
  }

  // Utilities

  // Types

  const scrollStrategies = {
    none: null,
    close: closeScrollStrategy,
    block: blockScrollStrategy,
    reposition: repositionScrollStrategy
  };
  const makeScrollStrategyProps = propsFactory({
    scrollStrategy: {
      type: [String, Function],
      default: 'block',
      validator: val => typeof val === 'function' || val in scrollStrategies
    }
  }, 'v-overlay-scroll-strategies');
  function useScrollStrategies(props, data) {
    if (!IN_BROWSER) return;
    let scope;
    vue.watchEffect(async () => {
      var _scope;
      (_scope = scope) == null ? void 0 : _scope.stop();
      if (!(data.isActive.value && props.scrollStrategy)) return;
      scope = vue.effectScope();
      await vue.nextTick();
      scope.run(() => {
        if (typeof props.scrollStrategy === 'function') {
          props.scrollStrategy(data, props);
        } else {
          var _scrollStrategies$pro;
          (_scrollStrategies$pro = scrollStrategies[props.scrollStrategy]) == null ? void 0 : _scrollStrategies$pro.call(scrollStrategies, data, props);
        }
      });
    });
    vue.onScopeDispose(() => {
      var _scope2;
      (_scope2 = scope) == null ? void 0 : _scope2.stop();
    });
  }
  function closeScrollStrategy(data) {
    function onScroll(e) {
      data.isActive.value = false;
    }
    bindScroll(data.activatorEl.value ?? data.contentEl.value, onScroll);
  }
  function blockScrollStrategy(data, props) {
    var _data$root$value;
    const offsetParent = (_data$root$value = data.root.value) == null ? void 0 : _data$root$value.offsetParent;
    const scrollElements = [...new Set([...getScrollParents(data.activatorEl.value, props.contained ? offsetParent : undefined), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : undefined)])].filter(el => !el.classList.contains('v-overlay-scroll-blocked'));
    const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
    const scrollableParent = (el => hasScrollbar(el) && el)(offsetParent || document.documentElement);
    if (scrollableParent) {
      data.root.value.classList.add('v-overlay--scroll-blocked');
    }
    scrollElements.forEach((el, i) => {
      el.style.setProperty('--v-body-scroll-x', convertToUnit(-el.scrollLeft));
      el.style.setProperty('--v-body-scroll-y', convertToUnit(-el.scrollTop));
      el.style.setProperty('--v-scrollbar-offset', convertToUnit(scrollbarWidth));
      el.classList.add('v-overlay-scroll-blocked');
    });
    vue.onScopeDispose(() => {
      scrollElements.forEach((el, i) => {
        const x = parseFloat(el.style.getPropertyValue('--v-body-scroll-x'));
        const y = parseFloat(el.style.getPropertyValue('--v-body-scroll-y'));
        el.style.removeProperty('--v-body-scroll-x');
        el.style.removeProperty('--v-body-scroll-y');
        el.style.removeProperty('--v-scrollbar-offset');
        el.classList.remove('v-overlay-scroll-blocked');
        el.scrollLeft = -x;
        el.scrollTop = -y;
      });
      if (scrollableParent) {
        data.root.value.classList.remove('v-overlay--scroll-blocked');
      }
    });
  }
  function repositionScrollStrategy(data) {
    let slow = false;
    let raf = -1;
    function update(e) {
      requestNewFrame(() => {
        var _data$updateLocation$, _data$updateLocation;
        const start = performance.now();
        (_data$updateLocation$ = (_data$updateLocation = data.updateLocation).value) == null ? void 0 : _data$updateLocation$.call(_data$updateLocation, e);
        const time = performance.now() - start;
        slow = time / (1000 / 60) > 2;
      });
    }
    bindScroll(data.activatorEl.value ?? data.contentEl.value, e => {
      if (slow) {
        // If the position calculation is slow,
        // defer updates until scrolling is finished.
        // Browsers usually fire one scroll event per frame so
        // we just wait until we've got two frames without an event
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          raf = requestAnimationFrame(() => {
            update(e);
          });
        });
      } else {
        update(e);
      }
    });
  }

  /** @private */
  function bindScroll(el, onScroll) {
    const scrollElements = [document, ...getScrollParents(el)];
    scrollElements.forEach(el => {
      el.addEventListener('scroll', onScroll, {
        passive: true
      });
    });
    vue.onScopeDispose(() => {
      scrollElements.forEach(el => {
        el.removeEventListener('scroll', onScroll);
      });
    });
  }

  // Utilities

  // Types

  const DisplaySymbol = Symbol.for('vuetify:display');
  function useDisplay() {
    const display = vue.inject(DisplaySymbol);
    if (!display) throw new Error('Could not find Vuetify display injection');
    return display;
  }

  // Utilities
  function useHydration() {
    if (!IN_BROWSER) return vue.ref(false);
    const {
      ssr
    } = useDisplay();
    if (ssr) {
      const isMounted = vue.ref(false);
      vue.onMounted(() => {
        isMounted.value = true;
      });
      return isMounted;
    } else {
      return vue.ref(true);
    }
  }

  function useScopeId() {
    const vm = getCurrentInstance('useScopeId');
    const scopeId = vm.vnode.scopeId;
    return {
      scopeId: scopeId ? {
        [scopeId]: ''
      } : undefined
    };
  }

  // Types

  const StackSymbol = Symbol.for('vuetify:stack');
  const globalStack = vue.reactive([]);
  function useStack(isActive, zIndex, disableGlobalStack) {
    const vm = getCurrentInstance('useStack');
    const createStackEntry = !disableGlobalStack;
    const parent = vue.inject(StackSymbol, undefined);
    const stack = vue.reactive({
      activeChildren: new Set()
    });
    vue.provide(StackSymbol, stack);
    const _zIndex = vue.ref(+zIndex.value);
    useToggleScope(isActive, () => {
      var _globalStack$at;
      const lastZIndex = (_globalStack$at = globalStack.at(-1)) == null ? void 0 : _globalStack$at[1];
      _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value;
      if (createStackEntry) {
        globalStack.push([vm.uid, _zIndex.value]);
      }
      parent == null ? void 0 : parent.activeChildren.add(vm.uid);
      vue.onScopeDispose(() => {
        if (createStackEntry) {
          const idx = globalStack.findIndex(v => v[0] === vm.uid);
          globalStack.splice(idx, 1);
        }
        parent == null ? void 0 : parent.activeChildren.delete(vm.uid);
      });
    });
    const globalTop = vue.ref(true);
    if (createStackEntry) {
      vue.watchEffect(() => {
        var _globalStack$at2;
        const _isTop = ((_globalStack$at2 = globalStack.at(-1)) == null ? void 0 : _globalStack$at2[0]) === vm.uid;
        setTimeout(() => globalTop.value = _isTop);
      });
    }
    const localTop = vue.computed(() => !stack.activeChildren.size);
    return {
      globalTop: vue.readonly(globalTop),
      localTop,
      stackStyles: vue.computed(() => ({
        zIndex: _zIndex.value
      }))
    };
  }

  // Utilities

  // Types

  function useTeleport(target) {
    const teleportTarget = vue.computed(() => {
      const _target = target.value;
      if (_target === true || !IN_BROWSER) return undefined;
      const targetElement = _target === false ? document.body : typeof _target === 'string' ? document.querySelector(_target) : _target;
      if (targetElement == null) {
        vue.warn(`Unable to locate target ${_target}`);
        return undefined;
      }
      if (!useTeleport.cache.has(targetElement)) {
        const el = document.createElement('div');
        el.className = 'v-overlay-container';
        targetElement.appendChild(el);
        useTeleport.cache.set(targetElement, el);
      }
      return useTeleport.cache.get(targetElement);
    });
    return {
      teleportTarget
    };
  }
  useTeleport.cache = new WeakMap();

  function defaultConditional() {
    return true;
  }
  function checkEvent(e, el, binding) {
    // The include element callbacks below can be expensive
    // so we should avoid calling them when we're not active.
    // Explicitly check for false to allow fallback compatibility
    // with non-toggleable components
    if (!e || checkIsActive(e, binding) === false) return false;

    // If we're clicking inside the shadowroot, then the app root doesn't get the same
    // level of introspection as to _what_ we're clicking. We want to check to see if
    // our target is the shadowroot parent container, and if it is, ignore.
    const root = attachedRoot(el);
    if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot && root.host === e.target) return false;

    // Check if additional elements were passed to be included in check
    // (click must be outside all included elements, if any)
    const elements = (typeof binding.value === 'object' && binding.value.include || (() => []))();
    // Add the root element for the component this directive was defined on
    elements.push(el);

    // Check if it's a click outside our elements, and then if our callback returns true.
    // Non-toggleable components should take action in their callback and return falsy.
    // Toggleable can return true if it wants to deactivate.
    // Note that, because we're in the capture phase, this callback will occur before
    // the bubbling click event on any outside elements.
    return !elements.some(el => el == null ? void 0 : el.contains(e.target));
  }
  function checkIsActive(e, binding) {
    const isActive = typeof binding.value === 'object' && binding.value.closeConditional || defaultConditional;
    return isActive(e);
  }
  function directive(e, el, binding) {
    const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler;
    el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
      checkIsActive(e, binding) && handler && handler(e);
    }, 0);
  }
  function handleShadow(el, callback) {
    const root = attachedRoot(el);
    callback(document);
    if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot) {
      callback(root);
    }
  }
  const ClickOutside = {
    // [data-app] may not be found
    // if using bind, inserted makes
    // sure that the root element is
    // available, iOS does not support
    // clicks on body
    mounted(el, binding) {
      const onClick = e => directive(e, el, binding);
      const onMousedown = e => {
        el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
      };
      handleShadow(el, app => {
        app.addEventListener('click', onClick, true);
        app.addEventListener('mousedown', onMousedown, true);
      });
      if (!el._clickOutside) {
        el._clickOutside = {
          lastMousedownWasOutside: true
        };
      }
      el._clickOutside[binding.instance.$.uid] = {
        onClick,
        onMousedown
      };
    },
    unmounted(el, binding) {
      if (!el._clickOutside) return;
      handleShadow(el, app => {
        var _el$_clickOutside;
        if (!app || !((_el$_clickOutside = el._clickOutside) != null && _el$_clickOutside[binding.instance.$.uid])) return;
        const {
          onClick,
          onMousedown
        } = el._clickOutside[binding.instance.$.uid];
        app.removeEventListener('click', onClick, true);
        app.removeEventListener('mousedown', onMousedown, true);
      });
      delete el._clickOutside[binding.instance.$.uid];
    }
  };

  // Types

  function Scrim(props) {
    const {
      modelValue,
      color,
      ...rest
    } = props;
    return vue.createVNode(vue.Transition, {
      "name": "fade-transition",
      "appear": true
    }, {
      default: () => [props.modelValue && vue.createVNode("div", vue.mergeProps({
        "class": ['v-overlay__scrim', props.color.backgroundColorClasses.value],
        "style": props.color.backgroundColorStyles.value
      }, rest), null)]
    });
  }
  const makeVOverlayProps = propsFactory({
    absolute: Boolean,
    attach: [Boolean, String, Object],
    closeOnBack: {
      type: Boolean,
      default: true
    },
    contained: Boolean,
    contentClass: null,
    contentProps: null,
    disabled: Boolean,
    noClickAnimation: Boolean,
    modelValue: Boolean,
    persistent: Boolean,
    scrim: {
      type: [String, Boolean],
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 2000
    },
    ...makeActivatorProps(),
    ...makeDimensionProps(),
    ...makeLazyProps(),
    ...makeLocationStrategyProps(),
    ...makeScrollStrategyProps(),
    ...makeThemeProps(),
    ...makeTransitionProps()
  }, 'v-overlay');
  const VOverlay = genericComponent()({
    name: 'VOverlay',
    directives: {
      ClickOutside
    },
    inheritAttrs: false,
    props: {
      _disableGlobalStack: Boolean,
      ...makeVOverlayProps()
    },
    emits: {
      'click:outside': e => true,
      'update:modelValue': value => true,
      afterLeave: () => true
    },
    setup(props, _ref) {
      let {
        slots,
        attrs,
        emit
      } = _ref;
      const model = useProxiedModel(props, 'modelValue');
      const isActive = vue.computed({
        get: () => model.value,
        set: v => {
          if (!(v && props.disabled)) model.value = v;
        }
      });
      const {
        teleportTarget
      } = useTeleport(vue.computed(() => props.attach || props.contained));
      const {
        themeClasses
      } = provideTheme(props);
      const {
        rtlClasses,
        isRtl
      } = useRtl();
      const {
        hasContent,
        onAfterLeave
      } = useLazy(props, isActive);
      const scrimColor = useBackgroundColor(vue.computed(() => {
        return typeof props.scrim === 'string' ? props.scrim : null;
      }));
      const {
        globalTop,
        localTop,
        stackStyles
      } = useStack(isActive, vue.toRef(props, 'zIndex'), props._disableGlobalStack);
      const {
        activatorEl,
        activatorRef,
        activatorEvents,
        contentEvents,
        scrimEvents
      } = useActivator(props, {
        isActive,
        isTop: localTop
      });
      const {
        dimensionStyles
      } = useDimension(props);
      const isMounted = useHydration();
      const {
        scopeId
      } = useScopeId();
      vue.watch(() => props.disabled, v => {
        if (v) isActive.value = false;
      });
      const root = vue.ref();
      const contentEl = vue.ref();
      const {
        contentStyles,
        updateLocation
      } = useLocationStrategies(props, {
        isRtl,
        contentEl,
        activatorEl,
        isActive
      });
      useScrollStrategies(props, {
        root,
        contentEl,
        activatorEl,
        isActive,
        updateLocation
      });
      function onClickOutside(e) {
        emit('click:outside', e);
        if (!props.persistent) isActive.value = false;else animateClick();
      }
      function closeConditional() {
        return isActive.value && globalTop.value;
      }
      IN_BROWSER && vue.watch(isActive, val => {
        if (val) {
          window.addEventListener('keydown', onKeydown);
        } else {
          window.removeEventListener('keydown', onKeydown);
        }
      }, {
        immediate: true
      });
      function onKeydown(e) {
        if (e.key === 'Escape' && globalTop.value) {
          if (!props.persistent) {
            isActive.value = false;
          } else animateClick();
        }
      }
      const router = useRouter();
      useToggleScope(() => props.closeOnBack, () => {
        useBackButton(router, next => {
          if (globalTop.value && isActive.value) {
            next(false);
            if (!props.persistent) isActive.value = false;else animateClick();
          } else {
            next();
          }
        });
      });
      const top = vue.ref();
      vue.watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, val => {
        if (val) {
          const scrollParent = getScrollParent(root.value);
          if (scrollParent && scrollParent !== document.scrollingElement) {
            top.value = scrollParent.scrollTop;
          }
        }
      });

      // Add a quick "bounce" animation to the content
      function animateClick() {
        if (props.noClickAnimation) return;
        contentEl.value && animate(contentEl.value, [{
          transformOrigin: 'center'
        }, {
          transform: 'scale(1.03)'
        }, {
          transformOrigin: 'center'
        }], {
          duration: 150,
          easing: standardEasing
        });
      }
      useRender(() => {
        var _slots$activator, _slots$default;
        return vue.createVNode(vue.Fragment, null, [(_slots$activator = slots.activator) == null ? void 0 : _slots$activator.call(slots, {
          isActive: isActive.value,
          props: vue.mergeProps({
            ref: activatorRef
          }, vue.toHandlers(activatorEvents.value), props.activatorProps)
        }), isMounted.value && vue.createVNode(vue.Teleport, {
          "disabled": !teleportTarget.value,
          "to": teleportTarget.value
        }, {
          default: () => [hasContent.value && vue.createVNode("div", vue.mergeProps({
            "class": ['v-overlay', {
              'v-overlay--absolute': props.absolute || props.contained,
              'v-overlay--active': isActive.value,
              'v-overlay--contained': props.contained
            }, themeClasses.value, rtlClasses.value],
            "style": [stackStyles.value, {
              top: convertToUnit(top.value)
            }],
            "ref": root
          }, scopeId, attrs), [vue.createVNode(Scrim, vue.mergeProps({
            "color": scrimColor,
            "modelValue": isActive.value && !!props.scrim
          }, vue.toHandlers(scrimEvents.value)), null), vue.createVNode(MaybeTransition, {
            "appear": true,
            "persisted": true,
            "transition": props.transition,
            "target": activatorEl.value,
            "onAfterLeave": () => {
              onAfterLeave();
              emit('afterLeave');
            }
          }, {
            default: () => [vue.withDirectives(vue.createVNode("div", vue.mergeProps({
              "ref": contentEl,
              "class": ['v-overlay__content', props.contentClass],
              "style": [dimensionStyles.value, contentStyles.value]
            }, vue.toHandlers(contentEvents.value), props.contentProps), [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
              isActive
            })]), [[vue.vShow, isActive.value], [vue.resolveDirective("click-outside"), {
              handler: onClickOutside,
              closeConditional,
              include: () => [activatorEl.value]
            }]])]
          })])]
        })]);
      });
      return {
        activatorEl,
        animateClick,
        contentEl,
        globalTop,
        localTop,
        updateLocation
      };
    }
  });
  function filterVOverlayProps(props) {
    return pick(props, Object.keys(VOverlay.props));
  }

  // Types

  const VMenu = genericComponent()({
    name: 'VMenu',
    props: {
      // TODO
      // disableKeys: Boolean,
      id: String,
      ...omit(makeVOverlayProps({
        closeDelay: 250,
        closeOnContentClick: true,
        locationStrategy: 'connected',
        openDelay: 300,
        scrim: false,
        scrollStrategy: 'reposition',
        transition: {
          component: VDialogTransition
        }
      }), ['absolute'])
    },
    emits: {
      'update:modelValue': value => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const isActive = useProxiedModel(props, 'modelValue');
      const {
        scopeId
      } = useScopeId();
      const uid = getUid();
      const id = vue.computed(() => props.id || `v-menu-${uid}`);
      const overlay = vue.ref();
      const parent = vue.inject(VMenuSymbol, null);
      let openChildren = 0;
      vue.provide(VMenuSymbol, {
        register() {
          ++openChildren;
        },
        unregister() {
          --openChildren;
        },
        closeParents() {
          setTimeout(() => {
            if (!openChildren) {
              isActive.value = false;
              parent == null ? void 0 : parent.closeParents();
            }
          }, 40);
        }
      });
      vue.watch(isActive, val => {
        val ? parent == null ? void 0 : parent.register() : parent == null ? void 0 : parent.unregister();
      });
      function onClickOutside() {
        parent == null ? void 0 : parent.closeParents();
      }
      useRender(() => {
        const [overlayProps] = filterVOverlayProps(props);
        return vue.createVNode(VOverlay, vue.mergeProps({
          "ref": overlay,
          "class": ['v-menu']
        }, overlayProps, {
          "modelValue": isActive.value,
          "onUpdate:modelValue": $event => isActive.value = $event,
          "absolute": true,
          "activatorProps": vue.mergeProps({
            'aria-haspopup': 'menu',
            'aria-expanded': String(isActive.value),
            'aria-owns': id.value
          }, props.activatorProps),
          "onClick:outside": onClickOutside
        }, scopeId), {
          activator: slots.activator,
          default: function () {
            var _slots$default;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return vue.createVNode(VDefaultsProvider, {
              "root": true
            }, {
              default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, ...args)]
            });
          }
        });
      });
      return forwardRefs({
        id
      }, overlay);
    }
  });

  // Types

  const makeSelectProps = propsFactory({
    chips: Boolean,
    closableChips: Boolean,
    eager: Boolean,
    hideNoData: Boolean,
    hideSelected: Boolean,
    menu: Boolean,
    menuIcon: {
      type: IconValue,
      default: '$dropdown'
    },
    menuProps: {
      type: Object
    },
    multiple: Boolean,
    noDataText: {
      type: String,
      default: '$vuetify.noDataText'
    },
    openOnClear: Boolean,
    valueComparator: {
      type: Function,
      default: deepEqual
    },
    ...makeItemsProps({
      itemChildren: false
    })
  }, 'v-select');
  const VSelect = genericComponent()({
    name: 'VSelect',
    props: {
      ...makeSelectProps(),
      ...omit(makeVTextFieldProps({
        modelValue: null
      }), ['validationValue', 'dirty', 'appendInnerIcon']),
      ...makeTransitionProps({
        transition: {
          component: VDialogTransition
        }
      })
    },
    emits: {
      'update:modelValue': val => true,
      'update:menu': val => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const vTextFieldRef = vue.ref();
      const menu = useProxiedModel(props, 'menu');
      const {
        items,
        transformIn,
        transformOut
      } = useItems(props);
      const model = useProxiedModel(props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const selections = vue.computed(() => {
        return model.value.map(v => {
          return items.value.find(item => props.valueComparator(item.value, v.value)) || v;
        });
      });
      const selected = vue.computed(() => selections.value.map(selection => selection.props.value));
      const listRef = vue.ref();
      function onClear(e) {
        model.value = [];
        if (props.openOnClear) {
          menu.value = true;
        }
      }
      function onClickControl() {
        if (props.hideNoData && !items.value.length || props.readonly) return;
        menu.value = !menu.value;
      }
      function onKeydown(e) {
        if (props.readonly) return;
        if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
          e.preventDefault();
          menu.value = true;
        }
        if (['Escape', 'Tab'].includes(e.key)) {
          menu.value = false;
        }
        if (e.key === 'ArrowDown') {
          var _listRef$value;
          (_listRef$value = listRef.value) == null ? void 0 : _listRef$value.focus('next');
        } else if (e.key === 'ArrowUp') {
          var _listRef$value2;
          e.preventDefault();
          (_listRef$value2 = listRef.value) == null ? void 0 : _listRef$value2.focus('prev');
        } else if (e.key === 'Home') {
          var _listRef$value3;
          e.preventDefault();
          (_listRef$value3 = listRef.value) == null ? void 0 : _listRef$value3.focus('first');
        } else if (e.key === 'End') {
          var _listRef$value4;
          e.preventDefault();
          (_listRef$value4 = listRef.value) == null ? void 0 : _listRef$value4.focus('last');
        }
      }
      function select(item) {
        if (props.multiple) {
          const index = selected.value.findIndex(selection => selection === item.value);
          if (index === -1) {
            model.value = [...model.value, item];
          } else {
            const value = [...model.value];
            value.splice(index, 1);
            model.value = value;
          }
        } else {
          model.value = [item];
          menu.value = false;
        }
      }
      function onBlur(e) {
        var _listRef$value5;
        if (!((_listRef$value5 = listRef.value) != null && _listRef$value5.$el.contains(e.relatedTarget))) {
          menu.value = false;
        }
      }
      function onFocusout(e) {
        if (e.relatedTarget == null) {
          var _vTextFieldRef$value;
          (_vTextFieldRef$value = vTextFieldRef.value) == null ? void 0 : _vTextFieldRef$value.focus();
        }
      }
      useRender(() => {
        const hasChips = !!(props.chips || slots.chip);
        const [textFieldProps] = filterVTextFieldProps(props);
        return vue.createVNode(VTextField, vue.mergeProps({
          "ref": vTextFieldRef
        }, textFieldProps, {
          "modelValue": model.value.map(v => v.props.value).join(', '),
          "onUpdate:modelValue": v => {
            if (v == null) model.value = [];
          },
          "validationValue": model.externalValue,
          "dirty": model.value.length > 0,
          "class": ['v-select', {
            'v-select--active-menu': menu.value,
            'v-select--chips': !!props.chips,
            [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true,
            'v-select--selected': model.value.length
          }],
          "appendInnerIcon": props.menuIcon,
          "readonly": true,
          "onClick:clear": onClear,
          "onClick:control": onClickControl,
          "onBlur": onBlur,
          "onKeydown": onKeydown
        }), {
          ...slots,
          default: () => {
            var _slots$noData, _slots$prependItem, _slots$appendItem;
            return vue.createVNode(vue.Fragment, null, [vue.createVNode(VMenu, vue.mergeProps({
              "modelValue": menu.value,
              "onUpdate:modelValue": $event => menu.value = $event,
              "activator": "parent",
              "contentClass": "v-select__content",
              "eager": props.eager,
              "openOnClick": false,
              "closeOnContentClick": false,
              "transition": props.transition
            }, props.menuProps), {
              default: () => [vue.createVNode(VList, {
                "ref": listRef,
                "selected": selected.value,
                "selectStrategy": props.multiple ? 'independent' : 'single-independent',
                "onMousedown": e => e.preventDefault(),
                "onFocusout": onFocusout
              }, {
                default: () => [!items.value.length && !props.hideNoData && (((_slots$noData = slots['no-data']) == null ? void 0 : _slots$noData.call(slots)) ?? vue.createVNode(VListItem, {
                  "title": t(props.noDataText)
                }, null)), (_slots$prependItem = slots['prepend-item']) == null ? void 0 : _slots$prependItem.call(slots), items.value.map((item, index) => {
                  if (slots.item) {
                    var _slots$item;
                    return (_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, {
                      item,
                      index,
                      props: vue.mergeProps(item.props, {
                        onClick: () => select(item)
                      })
                    });
                  }
                  return vue.createVNode(VListItem, vue.mergeProps({
                    "key": index
                  }, item.props, {
                    "onClick": () => select(item)
                  }), {
                    prepend: _ref2 => {
                      let {
                        isSelected
                      } = _ref2;
                      return props.multiple && !props.hideSelected ? vue.createVNode(VCheckboxBtn, {
                        "modelValue": isSelected,
                        "ripple": false
                      }, null) : undefined;
                    }
                  });
                }), (_slots$appendItem = slots['append-item']) == null ? void 0 : _slots$appendItem.call(slots)]
              })]
            }), selections.value.map((item, index) => {
              function onChipClose(e) {
                e.stopPropagation();
                e.preventDefault();
                select(item);
              }
              const slotProps = {
                'onClick:close': onChipClose,
                modelValue: true,
                'onUpdate:modelValue': undefined
              };
              return vue.createVNode("div", {
                "key": item.value,
                "class": "v-select__selection"
              }, [hasChips ? vue.createVNode(VDefaultsProvider, {
                "defaults": {
                  VChip: {
                    closable: props.closableChips,
                    size: 'small',
                    text: item.title
                  }
                }
              }, {
                default: () => [slots.chip ? slots.chip({
                  item,
                  index,
                  props: slotProps
                }) : vue.createVNode(VChip, slotProps, null)]
              }) : slots.selection ? slots.selection({
                item,
                index
              }) : vue.createVNode("span", {
                "class": "v-select__selection-text"
              }, [item.title, props.multiple && index < selections.value.length - 1 && vue.createVNode("span", {
                "class": "v-select__selection-comma"
              }, [vue.createTextVNode(",")])])]);
            })]);
          }
        });
      });
      return forwardRefs({
        menu,
        select
      }, vTextFieldRef);
    }
  });

  // Composables

  // Types

  const makeDataTablePaginateProps = propsFactory({
    page: {
      type: [Number, String],
      default: 1
    },
    itemsPerPage: {
      type: [Number, String],
      default: 10
    }
  }, 'v-data-table-paginate');
  const VDataTablePaginationSymbol = Symbol.for('vuetify:data-table-pagination');
  function createPagination(props, items) {
    const page = useProxiedModel(props, 'page', undefined, value => +(value ?? 1));
    const itemsPerPage = useProxiedModel(props, 'itemsPerPage', undefined, value => +(value ?? 10));
    const itemsLength = vue.computed(() => +(props.itemsLength ?? items.value.length));
    const startIndex = vue.computed(() => {
      if (itemsPerPage.value === -1) return 0;
      return itemsPerPage.value * (page.value - 1);
    });
    const stopIndex = vue.computed(() => {
      if (itemsPerPage.value === -1) return itemsLength.value;
      return Math.min(itemsLength.value, startIndex.value + itemsPerPage.value);
    });
    const pageCount = vue.computed(() => {
      if (itemsPerPage.value === -1) return 1;
      return Math.ceil(itemsLength.value / itemsPerPage.value);
    });
    vue.watchEffect(() => {
      if (startIndex.value > itemsLength.value) {
        page.value = 1;
      }
    });
    const data = {
      page,
      itemsPerPage,
      startIndex,
      stopIndex,
      pageCount,
      itemsLength
    };
    vue.provide(VDataTablePaginationSymbol, data);
    return data;
  }
  function usePagination() {
    const data = vue.inject(VDataTablePaginationSymbol);
    if (!data) throw new Error('Missing pagination!');
    return data;
  }
  function usePaginatedItems(items, startIndex, stopIndex, itemsPerPage) {
    const paginatedItems = vue.computed(() => {
      if (itemsPerPage.value <= 0) return items.value;
      return items.value.slice(startIndex.value, stopIndex.value);
    });
    return {
      paginatedItems
    };
  }

  // Types

  const VDataTableFooter = defineComponent({
    name: 'VDataTableFooter',
    props: {
      prevIcon: {
        type: String,
        default: '$prev'
      },
      nextIcon: {
        type: String,
        default: '$next'
      },
      firstIcon: {
        type: String,
        default: '$first'
      },
      lastIcon: {
        type: String,
        default: '$last'
      },
      itemsPerPageOptions: {
        type: Array,
        default: () => [{
          value: 10,
          title: '10'
        }, {
          value: 25,
          title: '25'
        }, {
          value: 50,
          title: '50'
        }, {
          value: 100,
          title: '100'
        }, {
          value: -1,
          title: 'All'
        }]
      },
      showCurrentPage: Boolean
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        page,
        pageCount,
        startIndex,
        stopIndex,
        itemsLength,
        itemsPerPage
      } = usePagination();
      return () => {
        var _slots$prepend;
        return vue.createVNode("div", {
          "class": "v-data-table-footer"
        }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots), vue.createVNode("div", {
          "class": "v-data-table-footer__items-per-page"
        }, [vue.createVNode("span", null, [vue.createTextVNode("Items per page:")]), vue.createVNode(VSelect, {
          "items": props.itemsPerPageOptions,
          "modelValue": itemsPerPage.value,
          "onUpdate:modelValue": v => itemsPerPage.value = Number(v),
          "density": "compact",
          "variant": "outlined",
          "hide-details": true
        }, null)]), vue.createVNode("div", {
          "class": "v-data-table-footer__info"
        }, [vue.createVNode("div", null, [(startIndex.value ?? -1) + 1, vue.createTextVNode(" - "), stopIndex.value ?? 0, vue.createTextVNode(" of "), itemsLength.value ?? 0])]), vue.createVNode("div", {
          "class": "v-data-table-footer__pagination"
        }, [vue.createVNode(VBtn, {
          "icon": props.firstIcon,
          "variant": "plain",
          "onClick": () => page.value = 1,
          "disabled": page.value === 1
        }, null), vue.createVNode(VBtn, {
          "icon": props.prevIcon,
          "variant": "plain",
          "onClick": () => page.value = Math.max(1, page.value - 1),
          "disabled": page.value === 1
        }, null), props.showCurrentPage && vue.createVNode("div", {
          "key": "page"
        }, [vue.createTextVNode("page.value")]), vue.createVNode(VBtn, {
          "icon": props.nextIcon,
          "variant": "plain",
          "onClick": () => page.value = Math.min(pageCount.value, page.value + 1),
          "disabled": page.value === pageCount.value
        }, null), vue.createVNode(VBtn, {
          "icon": props.lastIcon,
          "variant": "plain",
          "onClick": () => page.value = pageCount.value,
          "disabled": page.value === pageCount.value
        }, null)])]);
      };
    }
  });

  // Composables

  // Types

  const makeDataTableItemProps = propsFactory({
    // TODO: Worth it to make specific datatable implementation
    // without title, children?
    ...makeItemsProps({
      itemValue: 'id'
    })
  }, 'v-data-table-item');
  function useDataTableItems(props, columns) {
    const {
      items
    } = useItems(props);
    const dataTableItems = vue.computed(() => items.value.map(item => {
      return {
        ...item,
        type: 'item',
        columns: columns.value.reduce((obj, column) => {
          obj[column.key] = getPropertyFromItem(item.raw, column.value ?? column.key);
          return obj;
        }, {})
      };
    }));
    return {
      items: dataTableItems
    };
  }

  // Utilities

  // Types

  function useOptions(_ref) {
    let {
      page,
      itemsPerPage,
      sortBy,
      startIndex,
      stopIndex,
      pageCount
    } = _ref;
    const vm = getCurrentInstance('VDataTable');
    const options = vue.computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      startIndex: startIndex.value,
      stopIndex: stopIndex.value,
      pageCount: pageCount.value,
      sortBy: sortBy.value
    }));

    // Reset page when sorting changes
    vue.watch(sortBy, () => {
      page.value = 1;
    }, {
      deep: true
    });

    // Reset page when items-per-page changes
    vue.watch(itemsPerPage, () => {
      page.value = 1;
    });
    let oldOptions = null;
    vue.watch(options, () => {
      if (deepEqual(oldOptions, options.value)) return;
      vm.emit('update:options', options.value);
      oldOptions = options.value;
    }, {
      deep: true,
      immediate: true
    });
  }

  /* eslint-disable max-statements */

  // Types

  // Composables
  const defaultFilter = (value, query, item) => {
    if (value == null || query == null) return -1;
    return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase());
  };
  const makeFilterProps = propsFactory({
    customFilter: Function,
    customKeyFilter: Object,
    filterKeys: [Array, String],
    filterMode: {
      type: String,
      default: 'intersection'
    },
    noFilter: Boolean
  }, 'filter');
  function filterItems(items, query, options) {
    const array = [];
    // always ensure we fall back to a functioning filter
    const filter = (options == null ? void 0 : options.default) ?? defaultFilter;
    const keys = options != null && options.filterKeys ? wrapInArray(options.filterKeys) : false;
    const customFiltersLength = Object.keys((options == null ? void 0 : options.customKeyFilter) ?? {}).length;
    if (!(items != null && items.length)) return array;
    loop: for (let i = 0; i < items.length; i++) {
      const item = items[i].raw;
      const customMatches = {};
      const defaultMatches = {};
      let match = -1;
      if (query && !(options != null && options.noFilter)) {
        if (typeof item === 'object') {
          const filterKeys = keys || Object.keys(item);
          for (const key of filterKeys) {
            var _options$customKeyFil;
            const value = getPropertyFromItem(item, key, item);
            const keyFilter = options == null ? void 0 : (_options$customKeyFil = options.customKeyFilter) == null ? void 0 : _options$customKeyFil[key];
            match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
            if (match !== -1 && match !== false) {
              if (keyFilter) customMatches[key] = match;else defaultMatches[key] = match;
            } else if ((options == null ? void 0 : options.filterMode) === 'every') {
              continue loop;
            }
          }
        } else {
          match = filter(item, query, item);
          if (match !== -1 && match !== false) {
            defaultMatches.title = match;
          }
        }
        const defaultMatchesLength = Object.keys(defaultMatches).length;
        const customMatchesLength = Object.keys(customMatches).length;
        if (!defaultMatchesLength && !customMatchesLength) continue;
        if ((options == null ? void 0 : options.filterMode) === 'union' && customMatchesLength !== customFiltersLength && !defaultMatchesLength) continue;
        if ((options == null ? void 0 : options.filterMode) === 'intersection' && (customMatchesLength !== customFiltersLength || !defaultMatchesLength)) continue;
      }
      array.push({
        index: i,
        matches: {
          ...defaultMatches,
          ...customMatches
        }
      });
    }
    return array;
  }
  function useFilter(props, items, query) {
    const strQuery = vue.computed(() => typeof (query == null ? void 0 : query.value) !== 'string' && typeof (query == null ? void 0 : query.value) !== 'number' ? '' : String(query.value));
    const filteredItems = vue.ref([]);
    const filteredMatches = vue.ref(new Map());
    vue.watchEffect(() => {
      filteredItems.value = [];
      filteredMatches.value = new Map();
      const transformedItems = vue.unref(items);
      const results = filterItems(transformedItems, strQuery.value, {
        customKeyFilter: props.customKeyFilter,
        default: props.customFilter,
        filterKeys: props.filterKeys,
        filterMode: props.filterMode,
        noFilter: props.noFilter
      });
      results.forEach(_ref => {
        let {
          index,
          matches
        } = _ref;
        const item = transformedItems[index];
        filteredItems.value.push(item);
        filteredMatches.value.set(item.value, matches);
      });
    });
    function getMatches(item) {
      return filteredMatches.value.get(item.value);
    }
    return {
      filteredItems,
      filteredMatches,
      getMatches
    };
  }

  // Types

  const makeVDataTableProps = propsFactory({
    ...makeDataTableItemProps(),
    ...makeDataTableHeaderProps(),
    hideNoData: Boolean,
    noDataText: {
      type: String,
      default: '$vuetify.noDataText'
    },
    height: [String, Number],
    width: [String, Number],
    fixedHeader: Boolean,
    fixedFooter: Boolean
  }, 'v-data-table');
  const VDataTable = defineComponent({
    name: 'VDataTable',
    props: {
      search: String,
      ...makeVDataTableProps(),
      ...makeDataTableExpandProps(),
      ...makeDataTableGroupProps(),
      ...makeDataTableSelectProps(),
      ...makeDataTableSortProps(),
      ...makeDataTablePaginateProps(),
      ...makeFilterProps()
    },
    emits: {
      'update:modelValue': value => true,
      'update:page': value => true,
      'update:itemsPerPage': value => true,
      'update:sortBy': value => true,
      'update:options': value => true,
      'update:groupBy': value => true,
      'update:expanded': value => true,
      'click:row': (event, value) => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const groupBy = useProxiedModel(props, 'groupBy');
      const {
        columns
      } = createHeaders(props, {
        groupBy,
        showSelect: vue.toRef(props, 'showSelect'),
        showExpand: vue.toRef(props, 'showExpand')
      });
      const {
        items
      } = useDataTableItems(props, columns);
      const {
        filteredItems
      } = useFilter(props, items, vue.toRef(props, 'search'));
      const {
        sortBy
      } = createSort(props);
      const {
        sortByWithGroups,
        opened,
        extractRows
      } = createGroupBy(props, groupBy, sortBy);
      const {
        sortedItems
      } = useSortedItems(filteredItems, sortByWithGroups, columns);
      const {
        flatItems
      } = useGroupedItems(sortedItems, groupBy, opened);
      const {
        page,
        itemsPerPage,
        startIndex,
        stopIndex,
        pageCount
      } = createPagination(props, flatItems);
      const {
        paginatedItems
      } = usePaginatedItems(flatItems, startIndex, stopIndex, itemsPerPage);
      const paginatedItemsWithoutGroups = vue.computed(() => extractRows(paginatedItems.value));
      createSelection(props, paginatedItemsWithoutGroups);
      createExpanded(props);
      useOptions({
        page,
        itemsPerPage,
        sortBy,
        pageCount,
        startIndex,
        stopIndex
      });
      provideDefaults({
        VDataTableRows: {
          hideNoData: vue.toRef(props, 'hideNoData'),
          noDataText: vue.toRef(props, 'noDataText')
        }
      });
      useRender(() => vue.createVNode(VTable, {
        "class": ['v-data-table', {
          'v-data-table--show-select': props.showSelect
        }],
        "fixedHeader": props.fixedHeader,
        "fixedFooter": props.fixedFooter,
        "height": props.height
      }, {
        top: slots.top,
        default: slots.default ? slots.default() : () => {
          var _slots$colgroup, _slots$thead, _slots$tbody, _slots$tfoot;
          return vue.createVNode(vue.Fragment, null, [(_slots$colgroup = slots.colgroup) == null ? void 0 : _slots$colgroup.call(slots, {
            columns
          }), vue.createVNode("thead", null, [slots.headers ? slots.headers() : vue.createVNode(VDataTableHeaders, {
            "sticky": props.fixedHeader,
            "multiSort": props.multiSort
          }, slots)]), (_slots$thead = slots.thead) == null ? void 0 : _slots$thead.call(slots), vue.createVNode("tbody", null, [slots.body ? slots.body() : vue.createVNode(VDataTableRows, {
            "items": paginatedItems.value,
            "onClick:row": (event, value) => emit('click:row', event, value)
          }, slots)]), (_slots$tbody = slots.tbody) == null ? void 0 : _slots$tbody.call(slots), (_slots$tfoot = slots.tfoot) == null ? void 0 : _slots$tfoot.call(slots)]);
        },
        bottom: slots.bottom ? slots.bottom() : () => vue.createVNode(VDataTableFooter, null, {
          prepend: slots['footer.prepend']
        })
      }));
      return {};
    }
  });

  // Utilities

  // Types

  const makeDataTableVirtualProps = propsFactory({
    visibleItems: {
      type: [String, Number],
      default: 20
    },
    itemHeight: {
      type: [String, Number],
      default: 52
    }
  }, 'virtual');
  const UP$1 = -1;
  const DOWN$1 = 1;

  // TODO: Replace this with composable from v-virtual-scroll
  function useVirtual(props, items) {
    const startIndex = vue.ref(0);
    const itemHeight = vue.computed(() => parseInt(props.itemHeight, 10));
    const visibleItems = vue.computed(() => parseInt(props.visibleItems, 10));
    const containerRef = vue.ref();
    const isScrolling = vue.ref(false);
    function calculateOffset(index) {
      return index * itemHeight.value;
    }
    function calculateMidPointIndex(scrollTop) {
      let start = 0;
      let end = items.value.length;
      while (start <= end) {
        const middle = start + Math.floor((end - start) / 2);
        const middleOffset = calculateOffset(middle);
        if (middleOffset === scrollTop) {
          return middle;
        } else if (middleOffset < scrollTop) {
          start = middle + 1;
        } else if (middleOffset > scrollTop) {
          end = middle - 1;
        }
      }
      return start;
    }
    let lastScrollTop = 0;
    let scrollTimeout;
    function handleScroll() {
      if (!containerRef.value) return;
      isScrolling.value = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling.value = false;
      }, 100);
      const scrollTop = containerRef.value.scrollTop;
      const direction = scrollTop < lastScrollTop ? UP$1 : DOWN$1;
      const midPointIndex = calculateMidPointIndex(scrollTop);
      const buffer = Math.round(visibleItems.value / 3);
      if (direction === UP$1 && midPointIndex <= startIndex.value) {
        startIndex.value = Math.max(midPointIndex - buffer, 0);
      } else if (direction === DOWN$1 && midPointIndex >= startIndex.value + buffer * 2) {
        startIndex.value = Math.min(Math.max(0, midPointIndex - buffer), items.value.length - visibleItems.value);
      }
      lastScrollTop = containerRef.value.scrollTop;
    }
    const stopIndex = vue.computed(() => Math.min(items.value.length, startIndex.value + visibleItems.value));
    const paddingTop = vue.computed(() => calculateOffset(startIndex.value));
    const paddingBottom = vue.computed(() => calculateOffset(items.value.length) - calculateOffset(stopIndex.value));
    return {
      startIndex,
      stopIndex,
      paddingTop,
      paddingBottom,
      handleScroll,
      containerRef,
      itemHeight,
      isScrolling
    };
  }

  // Types

  const VDataTableVirtual = defineComponent({
    name: 'VDataTableVirtual',
    props: {
      search: String,
      ...makeVDataTableProps(),
      ...makeVDataTableProps(),
      ...makeDataTableGroupProps(),
      ...makeDataTableExpandProps(),
      ...makeDataTableHeaderProps(),
      ...makeDataTableItemProps(),
      ...makeDataTableSelectProps(),
      ...makeDataTableSortProps(),
      ...makeDataTableVirtualProps(),
      ...makeFilterProps()
    },
    emits: {
      'update:modelValue': value => true,
      'update:sortBy': value => true,
      'update:options': value => true,
      'update:groupBy': value => true,
      'update:expanded': value => true,
      'click:row': (event, value) => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const groupBy = useProxiedModel(props, 'groupBy');
      const {
        columns
      } = createHeaders(props, {
        groupBy,
        showSelect: vue.toRef(props, 'showSelect'),
        showExpand: vue.toRef(props, 'showExpand')
      });
      const {
        items
      } = useDataTableItems(props, columns);
      const {
        filteredItems
      } = useFilter(props, items, vue.toRef(props, 'search'));
      const {
        sortBy
      } = createSort(props);
      const {
        sortByWithGroups,
        opened,
        extractRows
      } = createGroupBy(props, groupBy, sortBy);
      const {
        sortedItems
      } = useSortedItems(filteredItems, sortByWithGroups, columns);
      const {
        flatItems
      } = useGroupedItems(sortedItems, groupBy, opened);
      const allRows = vue.computed(() => extractRows(flatItems.value));
      createSelection(props, allRows);
      createExpanded(props);
      const {
        containerRef,
        paddingTop,
        paddingBottom,
        startIndex,
        stopIndex,
        itemHeight,
        handleScroll
      } = useVirtual(props, flatItems);
      const visibleItems = vue.computed(() => {
        return flatItems.value.slice(startIndex.value, stopIndex.value);
      });
      useOptions({
        sortBy,
        page: vue.ref(1),
        startIndex: vue.ref(0),
        stopIndex: vue.computed(() => flatItems.value.length - 1),
        pageCount: vue.ref(1),
        itemsPerPage: vue.ref(-1)
      });
      provideDefaults({
        VDataTableRows: {
          hideNoData: vue.toRef(props, 'hideNoData'),
          noDataText: vue.toRef(props, 'noDataText')
        }
      });
      useRender(() => vue.createVNode(VTable, {
        "class": "v-data-table",
        "style": {
          '--v-table-row-height': convertToUnit(itemHeight.value)
        },
        "height": props.height,
        "fixedHeader": props.fixedHeader
      }, {
        top: slots.top,
        wrapper: () => vue.createVNode("div", {
          "ref": containerRef,
          "onScroll": handleScroll,
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [vue.createVNode("table", null, [vue.createVNode("thead", null, [vue.createVNode(VDataTableHeaders, {
          "sticky": props.fixedHeader,
          "multiSort": props.multiSort
        }, slots)]), vue.createVNode("tbody", null, [vue.createVNode("tr", {
          "style": {
            height: convertToUnit(paddingTop.value),
            border: 0
          }
        }, [vue.createVNode("td", {
          "colspan": columns.value.length,
          "style": {
            height: convertToUnit(paddingTop.value),
            border: 0
          }
        }, null)]), vue.createVNode(VDataTableRows, {
          "items": visibleItems.value,
          "onClick:row": (event, value) => emit('click:row', event, value)
        }, slots), vue.createVNode("tr", {
          "style": {
            height: convertToUnit(paddingBottom.value),
            border: 0
          }
        }, [vue.createVNode("td", {
          "colspan": columns.value.length,
          "style": {
            height: convertToUnit(paddingBottom.value),
            border: 0
          }
        }, null)])])])]),
        bottom: slots.bottom
      }));
    }
  });

  // Types

  const VDataTableServer = defineComponent({
    name: 'VDataTableServer',
    props: {
      color: String,
      loading: [Boolean, String],
      loadingText: {
        type: String,
        default: '$vuetify.dataIterator.loadingText'
      },
      itemsLength: [Number, String],
      ...makeVDataTableProps(),
      ...makeDataTableExpandProps(),
      ...makeDataTableHeaderProps(),
      ...makeDataTableItemProps(),
      ...makeDataTableSelectProps(),
      ...makeDataTableSortProps(),
      ...makeDataTablePaginateProps()
    },
    emits: {
      'update:modelValue': value => true,
      'update:page': page => true,
      'update:itemsPerPage': page => true,
      'update:sortBy': sortBy => true,
      'update:options': options => true,
      'update:expanded': options => true,
      'click:row': (event, value) => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      createExpanded(props);
      const {
        columns
      } = createHeaders(props, {
        showSelect: vue.toRef(props, 'showSelect'),
        showExpand: vue.toRef(props, 'showExpand')
      });
      const {
        items
      } = useDataTableItems(props, columns);
      const {
        sortBy,
        toggleSort
      } = createSort(props);
      const {
        page,
        itemsPerPage,
        startIndex,
        stopIndex,
        pageCount
      } = createPagination(props, items);
      createSelection(props, items);
      useOptions({
        page,
        itemsPerPage,
        sortBy,
        startIndex,
        stopIndex,
        pageCount
      });
      vue.provide('v-data-table', {
        toggleSort,
        sortBy
      });
      provideDefaults({
        VDataTableRows: {
          hideNoData: vue.toRef(props, 'hideNoData'),
          noDataText: vue.toRef(props, 'noDataText'),
          loading: vue.toRef(props, 'loading'),
          loadingText: vue.toRef(props, 'loadingText')
        }
      });
      useRender(() => vue.createVNode(VTable, {
        "class": ['v-data-table', {
          'v-data-table--loading': props.loading
        }],
        "fixedHeader": props.fixedHeader,
        "fixedFooter": props.fixedFooter,
        "height": props.height
      }, {
        top: slots.top,
        default: slots.default ? slots.default() : () => {
          var _slots$thead, _slots$tbody, _slots$tfoot;
          return vue.createVNode(vue.Fragment, null, [vue.createVNode("thead", {
            "class": "v-data-table__thead",
            "role": "rowgroup"
          }, [slots.headers ? slots.headers() : vue.createVNode(VDataTableHeaders, {
            "sticky": props.fixedHeader,
            "loading": props.loading,
            "color": props.color
          }, null)]), (_slots$thead = slots.thead) == null ? void 0 : _slots$thead.call(slots), vue.createVNode("tbody", {
            "class": "v-data-table__tbody",
            "role": "rowgroup"
          }, [slots.body ? slots.body() : vue.createVNode(VDataTableRows, {
            "items": items.value,
            "onClick:row": (event, value) => emit('click:row', event, value)
          }, slots)]), (_slots$tbody = slots.tbody) == null ? void 0 : _slots$tbody.call(slots), (_slots$tfoot = slots.tfoot) == null ? void 0 : _slots$tfoot.call(slots)]);
        },
        bottom: slots.bottom ? slots.bottom() : () => vue.createVNode(VDataTableFooter, null, {
          prepend: slots['footer.prepend']
        })
      }));
    }
  });

  const VVirtualScrollItem = defineComponent({
    name: 'VVirtualScrollItem',
    props: {
      dynamicHeight: Boolean
    },
    emits: {
      'update:height': height => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const {
        resizeRef
      } = useResizeObserver(entries => {
        if (!entries.length) return;
        const contentRect = entries[0].contentRect;
        emit('update:height', contentRect.height);
      });
      useRender(() => {
        var _slots$default;
        return vue.createVNode("div", {
          "ref": props.dynamicHeight ? resizeRef : undefined,
          "class": "v-virtual-scroll__item"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
      });
    }
  });

  // Types

  const UP = -1;
  const DOWN = 1;
  const VVirtualScroll = genericComponent()({
    name: 'VVirtualScroll',
    props: {
      items: {
        type: Array,
        default: () => []
      },
      itemKey: {
        type: String,
        default: 'value'
      },
      itemHeight: [Number, String],
      visibleItems: {
        type: [Number, String],
        default: 30
      },
      ...makeDimensionProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const first = vue.ref(0);
      const baseItemHeight = vue.ref(props.itemHeight);
      const itemHeight = vue.computed({
        get: () => parseInt(baseItemHeight.value ?? 0, 10),
        set(val) {
          baseItemHeight.value = val;
        }
      });
      const visibleItems = vue.computed(() => parseInt(props.visibleItems, 10));
      const rootEl = vue.ref();
      const ids = new Map(props.items.map((item, index) => [getPropertyFromItem(item, props.itemKey, item), index]));
      const sizes = createRange(props.items.length).map(() => itemHeight.value);
      function handleItemResize(item, height) {
        const index = ids.get(getPropertyFromItem(item, props.itemKey, item));
        if (!index) return;
        sizes[index] = height;
        if (!itemHeight.value) itemHeight.value = height;
      }
      function calculateOffset(index) {
        return sizes.slice(0, index).reduce((curr, value) => curr + (value || itemHeight.value), 0);
      }
      function calculateMidPointIndex(scrollTop) {
        let start = 0;
        let end = props.items.length;
        while (start <= end) {
          const middle = start + Math.floor((end - start) / 2);
          const middleOffset = calculateOffset(middle);
          if (middleOffset === scrollTop) {
            return middle;
          } else if (middleOffset < scrollTop) {
            start = middle + 1;
          } else if (middleOffset > scrollTop) {
            end = middle - 1;
          }
        }
        return start;
      }
      let lastScrollTop = 0;
      function handleScroll() {
        if (!rootEl.value) return;
        const scrollTop = rootEl.value.scrollTop;
        const direction = scrollTop < lastScrollTop ? UP : DOWN;
        const midPointIndex = calculateMidPointIndex(scrollTop);
        const buffer = Math.round(visibleItems.value / 3);
        if (direction === UP && midPointIndex <= first.value) {
          first.value = Math.max(midPointIndex - buffer, 0);
        } else if (direction === DOWN && midPointIndex >= first.value + buffer * 2) {
          first.value = Math.min(Math.max(0, midPointIndex - buffer), props.items.length - visibleItems.value);
        }
        lastScrollTop = rootEl.value.scrollTop;
      }
      const last = vue.computed(() => Math.min(props.items.length, first.value + visibleItems.value));
      const computedItems = vue.computed(() => props.items.slice(first.value, last.value));
      const paddingTop = vue.computed(() => calculateOffset(first.value));
      const paddingBottom = vue.computed(() => calculateOffset(props.items.length) - calculateOffset(last.value));
      const {
        dimensionStyles
      } = useDimension(props);
      useRender(() => vue.createVNode("div", {
        "ref": rootEl,
        "class": "v-virtual-scroll",
        "onScroll": handleScroll,
        "style": dimensionStyles.value
      }, [vue.createVNode("div", {
        "class": "v-virtual-scroll__container",
        "style": {
          paddingTop: convertToUnit(paddingTop.value),
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, [computedItems.value.map((item, index) => {
        var _slots$default;
        return vue.createVNode(VVirtualScrollItem, {
          "key": index,
          "dynamicHeight": !props.itemHeight,
          "onUpdate:height": height => handleItemResize(item, height)
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            item,
            index: index + first.value
          })]
        });
      })])]));
    }
  });

  var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    VDataTable: VDataTable,
    VDataTableRows: VDataTableRows,
    VDataTableRow: VDataTableRow,
    VDataTableVirtual: VDataTableVirtual,
    VDataTableServer: VDataTableServer,
    VVirtualScroll: VVirtualScroll
  });

  exports.components = components;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
