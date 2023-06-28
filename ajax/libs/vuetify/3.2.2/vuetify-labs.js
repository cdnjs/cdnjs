/*!
* Vuetify v3.2.2
* Forged by John Leider
* Released under the MIT License.
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vuetify = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

  const IN_BROWSER = typeof window !== 'undefined';
  const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window;
  const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0);
  const SUPPORTS_FOCUS_VISIBLE = IN_BROWSER && typeof CSS !== 'undefined' && typeof CSS.supports !== 'undefined' && CSS.supports('selector(:focus-visible)');

  // Utilities
  function useResizeObserver(callback) {
    const resizeRef = vue.ref();
    const contentRect = vue.ref();
    if (IN_BROWSER) {
      const observer = new ResizeObserver(entries => {
        callback?.(entries, observer);
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

  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
  function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

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
    return obj?.$el;
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
  const keyValues = Object.freeze({
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
  function keys(o) {
    return Object.keys(o);
  }
  function pick(obj, paths, exclude) {
    const found = Object.create(null);
    const rest = Object.create(null);
    for (const key in obj) {
      if (paths.some(path => path instanceof RegExp ? path.test(key) : path === key) && !exclude?.some(path => path === key)) {
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
  function getDecimals(value) {
    const trimmedStr = value.toString().trim();
    return trimmedStr.includes('.') ? trimmedStr.length - trimmedStr.indexOf('.') - 1 : 0;
  }
  function padEnd(str, length) {
    let char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
    return str + char.repeat(Math.max(0, length - str.length));
  }
  function chunk(str) {
    let size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    const chunked = [];
    let index = 0;
    while (index < str.length) {
      chunked.push(str.substr(index, size));
      index += size;
    }
    return chunked;
  }
  function humanReadableFileSize(bytes) {
    let base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
    if (bytes < base) {
      return `${bytes} B`;
    }
    const prefix = base === 1024 ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
    let unit = -1;
    while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
      bytes /= base;
      ++unit;
    }
    return `${bytes.toFixed(1)} ${prefix[unit]}B`;
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
    if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str);
    const kebab = str.replace(/[^a-z]/gi, '-').replace(/\B([A-Z])/g, '-$1').toLowerCase();
    toKebabCase.cache.set(str, kebab);
    return kebab;
  }
  toKebabCase.cache = new Map();
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
  var _arr = /*#__PURE__*/new WeakMap();
  var _pointer = /*#__PURE__*/new WeakMap();
  class CircularBuffer {
    constructor(size) {
      _classPrivateFieldInitSpec(this, _arr, {
        writable: true,
        value: []
      });
      _classPrivateFieldInitSpec(this, _pointer, {
        writable: true,
        value: 0
      });
      this.size = size;
    }
    push(val) {
      _classPrivateFieldGet(this, _arr)[_classPrivateFieldGet(this, _pointer)] = val;
      _classPrivateFieldSet(this, _pointer, (_classPrivateFieldGet(this, _pointer) + 1) % this.size);
    }
    values() {
      return _classPrivateFieldGet(this, _arr).slice(_classPrivateFieldGet(this, _pointer)).concat(_classPrivateFieldGet(this, _arr).slice(0, _classPrivateFieldGet(this, _pointer)));
    }
  }
  function getEventCoordinates(e) {
    if ('touches' in e) {
      return {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      };
    }
    return {
      clientX: e.clientX,
      clientY: e.clientY
    };
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
  const EventProp = () => [Function, Array];
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
  function focusableChildren(el) {
    const targets = ['button', '[href]', 'input:not([type="hidden"])', 'select', 'textarea', '[tabindex]'].map(s => `${s}:not([tabindex="-1"]):not([disabled])`).join(', ');
    return [...el.querySelectorAll(targets)];
  }
  function focusChild(el, location) {
    const focusable = focusableChildren(el);
    const idx = focusable.indexOf(document.activeElement);
    if (!location) {
      if (!el.contains(document.activeElement)) {
        focusable[0]?.focus();
      }
    } else if (location === 'first') {
      focusable[0]?.focus();
    } else if (location === 'last') {
      focusable.at(-1)?.focus();
    } else {
      let _el;
      let idxx = idx;
      const inc = location === 'next' ? 1 : -1;
      do {
        idxx += inc;
        _el = focusable[idxx];
      } while ((!_el || _el.offsetParent == null) && idxx < focusable.length && idxx >= 0);
      if (_el) _el.focus();else focusChild(el, location === 'next' ? 'first' : 'last');
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
    let animation;
    try {
      animation = el.animate(keyframes, options);
    } catch (err) {
      return {
        finished: Promise.resolve()
      };
    }
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
      name = match?.[1];
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

  // For converting XYZ to sRGB
  const srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]];

  // Forward gamma adjust
  const srgbForwardTransform = C => C <= 0.0031308 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055;

  // For converting sRGB to XYZ
  const srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];

  // Reverse gamma adjust
  const srgbReverseTransform = C => C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;
  function fromXYZ$1(xyz) {
    const rgb = Array(3);
    const transform = srgbForwardTransform;
    const matrix = srgbForwardMatrix;

    // Matrix transform, then gamma adjustment
    for (let i = 0; i < 3; ++i) {
      // Rescale back to [0, 255]
      rgb[i] = Math.round(clamp(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
    }
    return {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2]
    };
  }
  function toXYZ$1(_ref) {
    let {
      r,
      g,
      b
    } = _ref;
    const xyz = [0, 0, 0];
    const transform = srgbReverseTransform;
    const matrix = srgbReverseMatrix;

    // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB
    r = transform(r / 255);
    g = transform(g / 255);
    b = transform(b / 255);

    // Matrix color space transform
    for (let i = 0; i < 3; ++i) {
      xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
    }
    return xyz;
  }

  const delta = 0.20689655172413793; // 6÷29

  const cielabForwardTransform = t => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
  const cielabReverseTransform = t => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
  function fromXYZ(xyz) {
    const transform = cielabForwardTransform;
    const transformedY = transform(xyz[1]);
    return [116 * transformedY - 16, 500 * (transform(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform(xyz[2] / 1.08883))];
  }
  function toXYZ(lab) {
    const transform = cielabReverseTransform;
    const Ln = (lab[0] + 16) / 116;
    return [transform(Ln + lab[1] / 500) * 0.95047, transform(Ln), transform(Ln - lab[2] / 200) * 1.08883];
  }

  // Utilities

  // Types

  function isCssColor(color) {
    return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
  }
  function parseColor$1(color) {
    if (typeof color === 'number') {
      if (isNaN(color) || color < 0 || color > 0xFFFFFF) {
        // int can't have opacity
        consoleWarn(`'${color}' is not a valid hex color`);
      }
      return {
        r: (color & 0xFF0000) >> 16,
        g: (color & 0xFF00) >> 8,
        b: color & 0xFF
      };
    } else if (typeof color === 'string') {
      let hex = color.startsWith('#') ? color.slice(1) : color;
      if ([3, 4].includes(hex.length)) {
        hex = hex.split('').map(char => char + char).join('');
      } else if (![6, 8].includes(hex.length)) {
        consoleWarn(`'${color}' is not a valid hex(a) color`);
      }
      const int = parseInt(hex, 16);
      if (isNaN(int) || int < 0 || int > 0xFFFFFFFF) {
        consoleWarn(`'${color}' is not a valid hex(a) color`);
      }
      return HexToRGB(hex);
    } else {
      throw new TypeError(`Colors can only be numbers or strings, recieved ${color == null ? color : color.constructor.name} instead`);
    }
  }

  /** Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV */
  function HSVtoRGB(hsva) {
    const {
      h,
      s,
      v,
      a
    } = hsva;
    const f = n => {
      const k = (n + h / 60) % 6;
      return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    };
    const rgb = [f(5), f(3), f(1)].map(v => Math.round(v * 255));
    return {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
      a
    };
  }

  /** Converts RGBA to HSVA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV */
  function RGBtoHSV(rgba) {
    if (!rgba) return {
      h: 0,
      s: 1,
      v: 1,
      a: 1
    };
    const r = rgba.r / 255;
    const g = rgba.g / 255;
    const b = rgba.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    if (max !== min) {
      if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
      } else if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
      } else if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
      }
    }
    if (h < 0) h = h + 360;
    const s = max === 0 ? 0 : (max - min) / max;
    const hsv = [h, s, max];
    return {
      h: hsv[0],
      s: hsv[1],
      v: hsv[2],
      a: rgba.a
    };
  }
  function HSVtoHSL(hsva) {
    const {
      h,
      s,
      v,
      a
    } = hsva;
    const l = v - v * s / 2;
    const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l);
    return {
      h,
      s: sprime,
      l,
      a
    };
  }
  function HSLtoHSV(hsl) {
    const {
      h,
      s,
      l,
      a
    } = hsl;
    const v = l + s * Math.min(l, 1 - l);
    const sprime = v === 0 ? 0 : 2 - 2 * l / v;
    return {
      h,
      s: sprime,
      v,
      a
    };
  }
  function RGBtoCSS(_ref) {
    let {
      r,
      g,
      b,
      a
    } = _ref;
    return a === undefined ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  function HSVtoCSS(hsva) {
    return RGBtoCSS(HSVtoRGB(hsva));
  }
  function toHex(v) {
    const h = Math.round(v).toString(16);
    return ('00'.substr(0, 2 - h.length) + h).toUpperCase();
  }
  function RGBtoHex(_ref2) {
    let {
      r,
      g,
      b,
      a
    } = _ref2;
    return `#${[toHex(r), toHex(g), toHex(b), a !== undefined ? toHex(Math.round(a * 255)) : ''].join('')}`;
  }
  function HexToRGB(hex) {
    hex = parseHex(hex);
    let [r, g, b, a] = chunk(hex, 2).map(c => parseInt(c, 16));
    a = a === undefined ? a : a / 255;
    return {
      r,
      g,
      b,
      a
    };
  }
  function HexToHSV(hex) {
    const rgb = HexToRGB(hex);
    return RGBtoHSV(rgb);
  }
  function HSVtoHex(hsva) {
    return RGBtoHex(HSVtoRGB(hsva));
  }
  function parseHex(hex) {
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
    }
    hex = hex.replace(/([^0-9a-f])/gi, 'F');
    if (hex.length === 3 || hex.length === 4) {
      hex = hex.split('').map(x => x + x).join('');
    }
    if (hex.length !== 6) {
      hex = padEnd(padEnd(hex, 6), 8, 'F');
    }
    return hex;
  }
  function lighten(value, amount) {
    const lab = fromXYZ(toXYZ$1(value));
    lab[0] = lab[0] + amount * 10;
    return fromXYZ$1(toXYZ(lab));
  }
  function darken(value, amount) {
    const lab = fromXYZ(toXYZ$1(value));
    lab[0] = lab[0] - amount * 10;
    return fromXYZ$1(toXYZ(lab));
  }

  /**
   * Calculate the relative luminance of a given color
   * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
   */
  function getLuma(color) {
    const rgb = parseColor$1(color);
    return toXYZ$1(rgb)[1];
  }

  /**
   * Returns the contrast ratio (1-21) between two colors.
   * @see https://www.w3.org/TR/WCAG20/#contrast-ratiodef
   */
  function getContrast(first, second) {
    const l1 = getLuma(first);
    const l2 = getLuma(second);
    const light = Math.max(l1, l2);
    const dark = Math.min(l1, l2);
    return (light + 0.05) / (dark + 0.05);
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

  // Utilities

  // Types

  // Composables
  const makeComponentProps = propsFactory({
    class: [String, Array],
    style: {
      type: [String, Array, Object],
      default: null
    }
  }, 'component');

  function useToggleScope(source, fn) {
    let scope;
    function start() {
      scope = vue.effectScope();
      scope.run(() => fn.length ? fn(() => {
        scope?.stop();
        start();
      }) : fn());
    }
    vue.watch(source, active => {
      if (active && !scope) {
        start();
      } else if (!active) {
        scope?.stop();
        scope = undefined;
      }
    }, {
      immediate: true
    });
    vue.onScopeDispose(() => {
      scope?.stop();
    });
  }

  // Composables

  // Types

  const DefaultsSymbol = Symbol.for('vuetify:defaults');
  function createDefaults(options) {
    return vue.ref(options);
  }
  function injectDefaults() {
    const defaults = vue.inject(DefaultsSymbol);
    if (!defaults) throw new Error('[Vuetify] Could not find defaults instance');
    return defaults;
  }
  function provideDefaults(defaults, options) {
    const injectedDefaults = injectDefaults();
    const providedDefaults = vue.ref(defaults);
    const newDefaults = vue.computed(() => {
      const disabled = vue.unref(options?.disabled);
      if (disabled) return injectedDefaults.value;
      const scoped = vue.unref(options?.scoped);
      const reset = vue.unref(options?.reset);
      const root = vue.unref(options?.root);
      let properties = mergeDeep(providedDefaults.value, {
        prev: injectedDefaults.value
      });
      if (scoped) return properties;
      if (reset || root) {
        const len = Number(reset || Infinity);
        for (let i = 0; i <= len; i++) {
          if (!properties || !('prev' in properties)) {
            break;
          }
          properties = properties.prev;
        }
        return properties;
      }
      return properties.prev ? mergeDeep(properties.prev, properties) : properties;
    });
    vue.provide(DefaultsSymbol, newDefaults);
    return newDefaults;
  }
  function propIsDefined(vnode, prop) {
    return typeof vnode.props?.[prop] !== 'undefined' || typeof vnode.props?.[toKebabCase(prop)] !== 'undefined';
  }
  function internalUseDefaults() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let name = arguments.length > 1 ? arguments[1] : undefined;
    let defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : injectDefaults();
    const vm = getCurrentInstance('useDefaults');
    name = name ?? vm.type.name ?? vm.type.__name;
    if (!name) {
      throw new Error('[Vuetify] Could not determine component name');
    }
    const componentDefaults = vue.computed(() => defaults.value?.[props._as ?? name]);
    const _props = new Proxy(props, {
      get(target, prop) {
        const propValue = Reflect.get(target, prop);
        if (prop === 'class' || prop === 'style') {
          return [componentDefaults.value?.[prop], propValue].filter(v => v != null);
        } else if (typeof prop === 'string' && !propIsDefined(vm.vnode, prop)) {
          return componentDefaults.value?.[prop] ?? defaults.value?.global?.[prop] ?? propValue;
        }
        return propValue;
      }
    });
    const _subcomponentDefaults = vue.shallowRef();
    vue.watchEffect(() => {
      if (componentDefaults.value) {
        const subComponents = Object.entries(componentDefaults.value).filter(_ref => {
          let [key] = _ref;
          return key.startsWith(key[0].toUpperCase());
        });
        if (subComponents.length) _subcomponentDefaults.value = Object.fromEntries(subComponents);
      }
    });
    function provideSubDefaults() {
      // If subcomponent defaults are provided, override any
      // subcomponents provided by the component's setup function.
      // This uses injectSelf so must be done after the original setup to work.
      useToggleScope(_subcomponentDefaults, () => {
        provideDefaults(mergeDeep(injectSelf(DefaultsSymbol)?.value ?? {}, _subcomponentDefaults.value));
      });
    }
    return {
      props: _props,
      provideSubDefaults
    };
  }
  function useDefaults() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let name = arguments.length > 1 ? arguments[1] : undefined;
    const {
      props: _props,
      provideSubDefaults
    } = internalUseDefaults(props, name);
    provideSubDefaults();
    return _props;
  }

  // Utils

  // Types

  // Implementation
  function defineComponent(options) {
    options._setup = options._setup ?? options.setup;
    if (!options.name) {
      consoleWarn('The component is missing an explicit name, unable to generate default prop value');
      return options;
    }
    if (options._setup) {
      options.props = propsFactory(options.props ?? {}, toKebabCase(options.name))();
      const propKeys = Object.keys(options.props);
      options.filterProps = function filterProps(props) {
        return pick(props, propKeys, ['class', 'style']);
      };
      options.props._as = String;
      options.setup = function setup(props, ctx) {
        const defaults = injectDefaults();

        // Skip props proxy if defaults are not provided
        if (!defaults.value) return options._setup(props, ctx);
        const {
          props: _props,
          provideSubDefaults
        } = internalUseDefaults(props, props._as ?? options.name, defaults);
        const setupBindings = options._setup(_props, ctx);
        provideSubDefaults();
        return setupBindings;
      };
    }
    return options;
  }
  // Implementation
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
    return genericComponent()({
      name: name ?? vue.capitalize(vue.camelize(klass.replace(/__/g, '-'))),
      props: {
        tag: {
          type: String,
          default: tag
        },
        ...makeComponentProps()
      },
      setup(props, _ref) {
        let {
          slots
        } = _ref;
        return () => {
          return vue.h(props.tag, {
            class: [klass, props.class],
            style: props.style
          }, slots.default?.());
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
    return toKebabCase(vm?.aliasName || vm?.name);
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

  function injectSelf(key) {
    const {
      provides
    } = getCurrentInstance('injectSelf');
    if (provides && key in provides) {
      // TS doesn't allow symbol as index type
      return provides[key];
    }
  }

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

  // Composables

  // Types

  const VuetifyLayoutKey = Symbol.for('vuetify:layout');
  const VuetifyLayoutItemKey = Symbol.for('vuetify:layout-item');
  const ROOT_ZINDEX = 1000;
  const makeLayoutProps = propsFactory({
    overlaps: {
      type: Array,
      default: () => []
    },
    fullHeight: Boolean
  }, 'layout');

  // Composables
  const makeLayoutItemProps = propsFactory({
    name: {
      type: String
    },
    order: {
      type: [Number, String],
      default: 0
    },
    absolute: Boolean
  }, 'layout-item');
  function useLayout() {
    const layout = vue.inject(VuetifyLayoutKey);
    if (!layout) throw new Error('[Vuetify] Could not find injected layout');
    return {
      getLayoutItem: layout.getLayoutItem,
      mainRect: layout.mainRect,
      mainStyles: layout.mainStyles
    };
  }
  function useLayoutItem(options) {
    const layout = vue.inject(VuetifyLayoutKey);
    if (!layout) throw new Error('[Vuetify] Could not find injected layout');
    const id = options.id ?? `layout-item-${getUid()}`;
    const vm = getCurrentInstance('useLayoutItem');
    vue.provide(VuetifyLayoutItemKey, {
      id
    });
    const isKeptAlive = vue.ref(false);
    vue.onDeactivated(() => isKeptAlive.value = true);
    vue.onActivated(() => isKeptAlive.value = false);
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = layout.register(vm, {
      ...options,
      active: vue.computed(() => isKeptAlive.value ? false : options.active.value),
      id
    });
    vue.onBeforeUnmount(() => layout.unregister(id));
    return {
      layoutItemStyles,
      layoutRect: layout.layoutRect,
      layoutItemScrimStyles
    };
  }
  const generateLayers = (layout, positions, layoutSizes, activeItems) => {
    let previousLayer = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
    const layers = [{
      id: '',
      layer: {
        ...previousLayer
      }
    }];
    for (const id of layout) {
      const position = positions.get(id);
      const amount = layoutSizes.get(id);
      const active = activeItems.get(id);
      if (!position || !amount || !active) continue;
      const layer = {
        ...previousLayer,
        [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
      };
      layers.push({
        id,
        layer
      });
      previousLayer = layer;
    }
    return layers;
  };
  function createLayout(props) {
    const parentLayout = vue.inject(VuetifyLayoutKey, null);
    const rootZIndex = vue.computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
    const registered = vue.ref([]);
    const positions = vue.reactive(new Map());
    const layoutSizes = vue.reactive(new Map());
    const priorities = vue.reactive(new Map());
    const activeItems = vue.reactive(new Map());
    const disabledTransitions = vue.reactive(new Map());
    const {
      resizeRef,
      contentRect: layoutRect
    } = useResizeObserver();
    const computedOverlaps = vue.computed(() => {
      const map = new Map();
      const overlaps = props.overlaps ?? [];
      for (const overlap of overlaps.filter(item => item.includes(':'))) {
        const [top, bottom] = overlap.split(':');
        if (!registered.value.includes(top) || !registered.value.includes(bottom)) continue;
        const topPosition = positions.get(top);
        const bottomPosition = positions.get(bottom);
        const topAmount = layoutSizes.get(top);
        const bottomAmount = layoutSizes.get(bottom);
        if (!topPosition || !bottomPosition || !topAmount || !bottomAmount) continue;
        map.set(bottom, {
          position: topPosition.value,
          amount: parseInt(topAmount.value, 10)
        });
        map.set(top, {
          position: bottomPosition.value,
          amount: -parseInt(bottomAmount.value, 10)
        });
      }
      return map;
    });
    const layers = vue.computed(() => {
      const uniquePriorities = [...new Set([...priorities.values()].map(p => p.value))].sort((a, b) => a - b);
      const layout = [];
      for (const p of uniquePriorities) {
        const items = registered.value.filter(id => priorities.get(id)?.value === p);
        layout.push(...items);
      }
      return generateLayers(layout, positions, layoutSizes, activeItems);
    });
    const transitionsEnabled = vue.computed(() => {
      return !Array.from(disabledTransitions.values()).some(ref => ref.value);
    });
    const mainRect = vue.computed(() => {
      return layers.value[layers.value.length - 1].layer;
    });
    const mainStyles = vue.computed(() => {
      return {
        '--v-layout-left': convertToUnit(mainRect.value.left),
        '--v-layout-right': convertToUnit(mainRect.value.right),
        '--v-layout-top': convertToUnit(mainRect.value.top),
        '--v-layout-bottom': convertToUnit(mainRect.value.bottom),
        ...(transitionsEnabled.value ? undefined : {
          transition: 'none'
        })
      };
    });
    const items = vue.computed(() => {
      return layers.value.slice(1).map((_ref, index) => {
        let {
          id
        } = _ref;
        const {
          layer
        } = layers.value[index];
        const size = layoutSizes.get(id);
        const position = positions.get(id);
        return {
          id,
          ...layer,
          size: Number(size.value),
          position: position.value
        };
      });
    });
    const getLayoutItem = id => {
      return items.value.find(item => item.id === id);
    };
    const rootVm = getCurrentInstance('createLayout');
    const isMounted = vue.ref(false);
    vue.onMounted(() => {
      isMounted.value = true;
    });
    vue.provide(VuetifyLayoutKey, {
      register: (vm, _ref2) => {
        let {
          id,
          order,
          position,
          layoutSize,
          elementSize,
          active,
          disableTransitions,
          absolute
        } = _ref2;
        priorities.set(id, order);
        positions.set(id, position);
        layoutSizes.set(id, layoutSize);
        activeItems.set(id, active);
        disableTransitions && disabledTransitions.set(id, disableTransitions);
        const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm?.vnode);
        const instanceIndex = instances.indexOf(vm);
        if (instanceIndex > -1) registered.value.splice(instanceIndex, 0, id);else registered.value.push(id);
        const index = vue.computed(() => items.value.findIndex(i => i.id === id));
        const zIndex = vue.computed(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
        const layoutItemStyles = vue.computed(() => {
          const isHorizontal = position.value === 'left' || position.value === 'right';
          const isOppositeHorizontal = position.value === 'right';
          const isOppositeVertical = position.value === 'bottom';
          const styles = {
            [position.value]: 0,
            zIndex: zIndex.value,
            transform: `translate${isHorizontal ? 'X' : 'Y'}(${(active.value ? 0 : -110) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}%)`,
            position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? 'absolute' : 'fixed',
            ...(transitionsEnabled.value ? undefined : {
              transition: 'none'
            })
          };
          if (!isMounted.value) return styles;
          const item = items.value[index.value];
          if (!item) throw new Error(`[Vuetify] Could not find layout item "${id}"`);
          const overlap = computedOverlaps.value.get(id);
          if (overlap) {
            item[overlap.position] += overlap.amount;
          }
          return {
            ...styles,
            height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : undefined,
            left: isOppositeHorizontal ? undefined : `${item.left}px`,
            right: isOppositeHorizontal ? `${item.right}px` : undefined,
            top: position.value !== 'bottom' ? `${item.top}px` : undefined,
            bottom: position.value !== 'top' ? `${item.bottom}px` : undefined,
            width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : undefined
          };
        });
        const layoutItemScrimStyles = vue.computed(() => ({
          zIndex: zIndex.value - 1
        }));
        return {
          layoutItemStyles,
          layoutItemScrimStyles,
          zIndex
        };
      },
      unregister: id => {
        priorities.delete(id);
        positions.delete(id);
        layoutSizes.delete(id);
        activeItems.delete(id);
        disabledTransitions.delete(id);
        registered.value = registered.value.filter(v => v !== id);
      },
      mainRect,
      mainStyles,
      getLayoutItem,
      items,
      layoutRect,
      rootZIndex
    });
    const layoutClasses = vue.computed(() => ['v-layout', {
      'v-layout--full-height': props.fullHeight
    }]);
    const layoutStyles = vue.computed(() => ({
      zIndex: rootZIndex.value,
      position: parentLayout ? 'relative' : undefined,
      overflow: parentLayout ? 'hidden' : undefined
    }));
    return {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRect,
      layoutRef: resizeRef
    };
  }

  /**
   * WCAG 3.0 APCA perceptual contrast algorithm from https://github.com/Myndex/SAPC-APCA
   * @licence https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
   * @see https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup
   */

  // MAGICAL NUMBERS

  // sRGB Conversion to Relative Luminance (Y)

  // Transfer Curve (aka "Gamma") for sRGB linearization
  // Simple power curve vs piecewise described in docs
  // Essentially, 2.4 best models actual display
  // characteristics in combination with the total method
  const mainTRC = 2.4;
  const Rco = 0.2126729; // sRGB Red Coefficient (from matrix)
  const Gco = 0.7151522; // sRGB Green Coefficient (from matrix)
  const Bco = 0.0721750; // sRGB Blue Coefficient (from matrix)

  // For Finding Raw SAPC Contrast from Relative Luminance (Y)

  // Constants for SAPC Power Curve Exponents
  // One pair for normal text, and one for reverse
  // These are the "beating heart" of SAPC
  const normBG = 0.55;
  const normTXT = 0.58;
  const revTXT = 0.57;
  const revBG = 0.62;

  // For Clamping and Scaling Values

  const blkThrs = 0.03; // Level that triggers the soft black clamp
  const blkClmp = 1.45; // Exponent for the soft black clamp curve
  const deltaYmin = 0.0005; // Lint trap
  const scaleBoW = 1.25; // Scaling for dark text on light
  const scaleWoB = 1.25; // Scaling for light text on dark
  const loConThresh = 0.078; // Threshold for new simple offset scale
  const loConFactor = 12.82051282051282; // = 1/0.078,
  const loConOffset = 0.06; // The simple offset
  const loClip = 0.001; // Output clip (lint trap #2)

  function APCAcontrast(text, background) {
    // Linearize sRGB
    const Rtxt = (text.r / 255) ** mainTRC;
    const Gtxt = (text.g / 255) ** mainTRC;
    const Btxt = (text.b / 255) ** mainTRC;
    const Rbg = (background.r / 255) ** mainTRC;
    const Gbg = (background.g / 255) ** mainTRC;
    const Bbg = (background.b / 255) ** mainTRC;

    // Apply the standard coefficients and sum to Y
    let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
    let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;

    // Soft clamp Y when near black.
    // Now clamping all colors to prevent crossover errors
    if (Ytxt <= blkThrs) Ytxt += (blkThrs - Ytxt) ** blkClmp;
    if (Ybg <= blkThrs) Ybg += (blkThrs - Ybg) ** blkClmp;

    // Return 0 Early for extremely low ∆Y (lint trap #1)
    if (Math.abs(Ybg - Ytxt) < deltaYmin) return 0.0;

    // SAPC CONTRAST

    let outputContrast; // For weighted final values
    if (Ybg > Ytxt) {
      // For normal polarity, black text on white
      // Calculate the SAPC contrast value and scale

      const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;

      // NEW! SAPC SmoothScale™
      // Low Contrast Smooth Scale Rollout to prevent polarity reversal
      // and also a low clip for very low contrasts (lint trap #2)
      // much of this is for very low contrasts, less than 10
      // therefore for most reversing needs, only loConOffset is important
      outputContrast = SAPC < loClip ? 0.0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
    } else {
      // For reverse polarity, light text on dark
      // WoB should always return negative value.

      const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
      outputContrast = SAPC > -loClip ? 0.0 : SAPC > -loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
    }
    return outputContrast * 100;
  }

  // Utilities

  // Types

  const ThemeSymbol = Symbol.for('vuetify:theme');
  const makeThemeProps = propsFactory({
    theme: String
  }, 'theme');
  const defaultThemeOptions = {
    defaultTheme: 'light',
    variations: {
      colors: [],
      lighten: 0,
      darken: 0
    },
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          'surface-variant': '#424242',
          'on-surface-variant': '#EEEEEE',
          primary: '#6200EE',
          'primary-darken-1': '#3700B3',
          secondary: '#03DAC6',
          'secondary-darken-1': '#018786',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        },
        variables: {
          'border-color': '#000000',
          'border-opacity': 0.12,
          'high-emphasis-opacity': 0.87,
          'medium-emphasis-opacity': 0.60,
          'disabled-opacity': 0.38,
          'idle-opacity': 0.04,
          'hover-opacity': 0.04,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'activated-opacity': 0.12,
          'pressed-opacity': 0.12,
          'dragged-opacity': 0.08,
          'theme-kbd': '#212529',
          'theme-on-kbd': '#FFFFFF',
          'theme-code': '#F5F5F5',
          'theme-on-code': '#000000'
        }
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#212121',
          'surface-variant': '#BDBDBD',
          'on-surface-variant': '#424242',
          primary: '#BB86FC',
          'primary-darken-1': '#3700B3',
          secondary: '#03DAC5',
          'secondary-darken-1': '#03DAC5',
          error: '#CF6679',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        },
        variables: {
          'border-color': '#FFFFFF',
          'border-opacity': 0.12,
          'high-emphasis-opacity': 0.87,
          'medium-emphasis-opacity': 0.60,
          'disabled-opacity': 0.38,
          'idle-opacity': 0.10,
          'hover-opacity': 0.04,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'activated-opacity': 0.12,
          'pressed-opacity': 0.16,
          'dragged-opacity': 0.08,
          'theme-kbd': '#212529',
          'theme-on-kbd': '#FFFFFF',
          'theme-code': '#343434',
          'theme-on-code': '#CCCCCC'
        }
      }
    }
  };
  function parseThemeOptions() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultThemeOptions;
    if (!options) return {
      ...defaultThemeOptions,
      isDisabled: true
    };
    const themes = {};
    for (const [key, theme] of Object.entries(options.themes ?? {})) {
      const defaultTheme = theme.dark || key === 'dark' ? defaultThemeOptions.themes?.dark : defaultThemeOptions.themes?.light;
      themes[key] = mergeDeep(defaultTheme, theme);
    }
    return mergeDeep(defaultThemeOptions, {
      ...options,
      themes
    });
  }

  // Composables
  function createTheme(options) {
    const parsedOptions = vue.reactive(parseThemeOptions(options));
    const name = vue.ref(parsedOptions.defaultTheme);
    const themes = vue.ref(parsedOptions.themes);
    const computedThemes = vue.computed(() => {
      const acc = {};
      for (const [name, original] of Object.entries(themes.value)) {
        const theme = acc[name] = {
          ...original,
          colors: {
            ...original.colors
          }
        };
        if (parsedOptions.variations) {
          for (const name of parsedOptions.variations.colors) {
            const color = theme.colors[name];
            if (!color) continue;
            for (const variation of ['lighten', 'darken']) {
              const fn = variation === 'lighten' ? lighten : darken;
              for (const amount of createRange(parsedOptions.variations[variation], 1)) {
                theme.colors[`${name}-${variation}-${amount}`] = RGBtoHex(fn(parseColor$1(color), amount));
              }
            }
          }
        }
        for (const color of Object.keys(theme.colors)) {
          if (/^on-[a-z]/.test(color) || theme.colors[`on-${color}`]) continue;
          const onColor = `on-${color}`;
          const colorVal = parseColor$1(theme.colors[color]);
          const blackContrast = Math.abs(APCAcontrast(parseColor$1(0), colorVal));
          const whiteContrast = Math.abs(APCAcontrast(parseColor$1(0xffffff), colorVal));

          // TODO: warn about poor color selections
          // const contrastAsText = Math.abs(APCAcontrast(colorVal, colorToInt(theme.colors.background)))
          // const minContrast = Math.max(blackContrast, whiteContrast)
          // if (minContrast < 60) {
          //   consoleInfo(`${key} theme color ${color} has poor contrast (${minContrast.toFixed()}%)`)
          // } else if (contrastAsText < 60 && !['background', 'surface'].includes(color)) {
          //   consoleInfo(`${key} theme color ${color} has poor contrast as text (${contrastAsText.toFixed()}%)`)
          // }

          // Prefer white text if both have an acceptable contrast ratio
          theme.colors[onColor] = whiteContrast > Math.min(blackContrast, 50) ? '#fff' : '#000';
        }
      }
      return acc;
    });
    const current = vue.computed(() => computedThemes.value[name.value]);
    const styles = vue.computed(() => {
      const lines = [];
      if (current.value.dark) {
        createCssClass(lines, ':root', ['color-scheme: dark']);
      }
      createCssClass(lines, ':root', genCssVariables(current.value));
      for (const [themeName, theme] of Object.entries(computedThemes.value)) {
        createCssClass(lines, `.v-theme--${themeName}`, [`color-scheme: ${theme.dark ? 'dark' : 'normal'}`, ...genCssVariables(theme)]);
      }
      const bgLines = [];
      const fgLines = [];
      const colors = new Set(Object.values(computedThemes.value).flatMap(theme => Object.keys(theme.colors)));
      for (const key of colors) {
        if (/^on-[a-z]/.test(key)) {
          createCssClass(fgLines, `.${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
        } else {
          createCssClass(bgLines, `.bg-${key}`, [`--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${key})) !important`, `color: rgb(var(--v-theme-on-${key})) !important`]);
          createCssClass(fgLines, `.text-${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
          createCssClass(fgLines, `.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]);
        }
      }
      lines.push(...bgLines, ...fgLines);
      return lines.map((str, i) => i === 0 ? str : `    ${str}`).join('');
    });
    function getHead() {
      return {
        style: [{
          children: styles.value,
          id: 'vuetify-theme-stylesheet',
          nonce: parsedOptions.cspNonce || false
        }]
      };
    }
    function install(app) {
      const head = app._context.provides.usehead;
      if (head) {
        if (head.push) {
          const entry = head.push(getHead);
          vue.watch(styles, () => {
            entry.patch(getHead);
          });
        } else {
          if (IN_BROWSER) {
            head.addHeadObjs(vue.computed(getHead));
            vue.watchEffect(() => head.updateDOM());
          } else {
            head.addHeadObjs(getHead());
          }
        }
      } else {
        let styleEl = IN_BROWSER ? document.getElementById('vuetify-theme-stylesheet') : null;
        vue.watch(styles, updateStyles, {
          immediate: true
        });
        function updateStyles() {
          if (parsedOptions.isDisabled) return;
          if (typeof document !== 'undefined' && !styleEl) {
            const el = document.createElement('style');
            el.type = 'text/css';
            el.id = 'vuetify-theme-stylesheet';
            if (parsedOptions.cspNonce) el.setAttribute('nonce', parsedOptions.cspNonce);
            styleEl = el;
            document.head.appendChild(styleEl);
          }
          if (styleEl) styleEl.innerHTML = styles.value;
        }
      }
    }
    const themeClasses = vue.computed(() => parsedOptions.isDisabled ? undefined : `v-theme--${name.value}`);
    return {
      install,
      isDisabled: parsedOptions.isDisabled,
      name,
      themes,
      current,
      computedThemes,
      themeClasses,
      styles,
      global: {
        name,
        current
      }
    };
  }
  function provideTheme(props) {
    getCurrentInstance('provideTheme');
    const theme = vue.inject(ThemeSymbol, null);
    if (!theme) throw new Error('Could not find Vuetify theme injection');
    const name = vue.computed(() => {
      return props.theme ?? theme?.name.value;
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
  function useTheme() {
    getCurrentInstance('useTheme');
    const theme = vue.inject(ThemeSymbol, null);
    if (!theme) throw new Error('Could not find Vuetify theme injection');
    return theme;
  }
  function createCssClass(lines, selector, content) {
    lines.push(`${selector} {\n`, ...content.map(line => `  ${line};\n`), '}\n');
  }
  function genCssVariables(theme) {
    const lightOverlay = theme.dark ? 2 : 1;
    const darkOverlay = theme.dark ? 1 : 2;
    const variables = [];
    for (const [key, value] of Object.entries(theme.colors)) {
      const rgb = parseColor$1(value);
      variables.push(`--v-theme-${key}: ${rgb.r},${rgb.g},${rgb.b}`);
      if (!key.startsWith('on-')) {
        variables.push(`--v-theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`);
      }
    }
    for (const [key, value] of Object.entries(theme.variables)) {
      const color = typeof value === 'string' && value.startsWith('#') ? parseColor$1(value) : undefined;
      const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined;
      variables.push(`--v-${key}: ${rgb ?? value}`);
    }
    return variables;
  }

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
      void props[prop];
      return !!((vm.vnode.props?.hasOwnProperty(prop) || vm.vnode.props?.hasOwnProperty(kebabProp)) && (vm.vnode.props?.hasOwnProperty(`onUpdate:${prop}`) || vm.vnode.props?.hasOwnProperty(`onUpdate:${kebabProp}`)));
    }) : vue.computed(() => {
      void props[prop];
      return !!(vm.vnode.props?.hasOwnProperty(prop) && vm.vnode.props?.hasOwnProperty(`onUpdate:${prop}`));
    });
    useToggleScope(() => !isControlled.value, () => {
      vue.watch(() => props[prop], val => {
        internal.value = val;
      });
    });
    const model = vue.computed({
      get() {
        const externalValue = props[prop];
        return transformIn(isControlled.value ? externalValue : internal.value);
      },
      set(internalValue) {
        const newValue = transformOut(internalValue);
        const value = vue.toRaw(isControlled.value ? props[prop] : internal.value);
        if (value === newValue || transformIn(value) === internalValue) {
          return;
        }
        internal.value = newValue;
        vm?.emit(`update:${prop}`, newValue);
      }
    });
    Object.defineProperty(model, 'externalValue', {
      get: () => isControlled.value ? props[prop] : internal.value
    });
    return model;
  }

  var en = {
    badge: 'Badge',
    close: 'Close',
    dataIterator: {
      noResultsText: 'No matching records found',
      loadingText: 'Loading items...'
    },
    dataTable: {
      itemsPerPageText: 'Rows per page:',
      ariaLabel: {
        sortDescending: 'Sorted descending.',
        sortAscending: 'Sorted ascending.',
        sortNone: 'Not sorted.',
        activateNone: 'Activate to remove sorting.',
        activateDescending: 'Activate to sort descending.',
        activateAscending: 'Activate to sort ascending.'
      },
      sortBy: 'Sort by'
    },
    dataFooter: {
      itemsPerPageText: 'Items per page:',
      itemsPerPageAll: 'All',
      nextPage: 'Next page',
      prevPage: 'Previous page',
      firstPage: 'First page',
      lastPage: 'Last page',
      pageText: '{0}-{1} of {2}'
    },
    datePicker: {
      itemsSelected: '{0} selected',
      nextMonthAriaLabel: 'Next month',
      nextYearAriaLabel: 'Next year',
      prevMonthAriaLabel: 'Previous month',
      prevYearAriaLabel: 'Previous year'
    },
    noDataText: 'No data available',
    carousel: {
      prev: 'Previous visual',
      next: 'Next visual',
      ariaLabel: {
        delimiter: 'Carousel slide {0} of {1}'
      }
    },
    calendar: {
      moreEvents: '{0} more'
    },
    input: {
      clear: 'Clear {0}',
      prependAction: '{0} prepended action',
      appendAction: '{0} appended action'
    },
    fileInput: {
      counter: '{0} files',
      counterSize: '{0} files ({1} in total)'
    },
    timePicker: {
      am: 'AM',
      pm: 'PM'
    },
    pagination: {
      ariaLabel: {
        root: 'Pagination Navigation',
        next: 'Next page',
        previous: 'Previous page',
        page: 'Go to page {0}',
        currentPage: 'Page {0}, Current page',
        first: 'First page',
        last: 'Last page'
      }
    },
    rating: {
      ariaLabel: {
        item: 'Rating {0} of {1}'
      }
    },
    loading: 'Loading...',
    infiniteScroll: {
      loadMore: 'Load more',
      empty: 'No more'
    }
  };

  const LANG_PREFIX = '$vuetify.';
  const replace = (str, params) => {
    return str.replace(/\{(\d+)\}/g, (match, index) => {
      return String(params[+index]);
    });
  };
  const createTranslateFunction = (current, fallback, messages) => {
    return function (key) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      if (!key.startsWith(LANG_PREFIX)) {
        return replace(key, params);
      }
      const shortKey = key.replace(LANG_PREFIX, '');
      const currentLocale = current.value && messages.value[current.value];
      const fallbackLocale = fallback.value && messages.value[fallback.value];
      let str = getObjectValueByPath(currentLocale, shortKey, null);
      if (!str) {
        consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
        str = getObjectValueByPath(fallbackLocale, shortKey, null);
      }
      if (!str) {
        consoleError(`Translation key "${key}" not found in fallback`);
        str = key;
      }
      if (typeof str !== 'string') {
        consoleError(`Translation key "${key}" has a non-string value`);
        str = key;
      }
      return replace(str, params);
    };
  };
  function createNumberFunction(current, fallback) {
    return (value, options) => {
      const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);
      return numberFormat.format(value);
    };
  }
  function useProvided(props, prop, provided) {
    const internal = useProxiedModel(props, prop, props[prop] ?? provided.value);

    // TODO: Remove when defaultValue works
    internal.value = props[prop] ?? provided.value;
    vue.watch(provided, v => {
      if (props[prop] == null) {
        internal.value = provided.value;
      }
    });
    return internal;
  }
  function createProvideFunction(state) {
    return props => {
      const current = useProvided(props, 'locale', state.current);
      const fallback = useProvided(props, 'fallback', state.fallback);
      const messages = useProvided(props, 'messages', state.messages);
      return {
        name: 'vuetify',
        current,
        fallback,
        messages,
        t: createTranslateFunction(current, fallback, messages),
        n: createNumberFunction(current, fallback),
        provide: createProvideFunction({
          current,
          fallback,
          messages
        })
      };
    };
  }
  function createVuetifyAdapter(options) {
    const current = vue.ref(options?.locale ?? 'en');
    const fallback = vue.ref(options?.fallback ?? 'en');
    const messages = vue.ref({
      en,
      ...options?.messages
    });
    return {
      name: 'vuetify',
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback),
      provide: createProvideFunction({
        current,
        fallback,
        messages
      })
    };
  }

  const defaultRtl = {
    af: false,
    ar: true,
    bg: false,
    ca: false,
    ckb: false,
    cs: false,
    de: false,
    el: false,
    en: false,
    es: false,
    et: false,
    fa: true,
    fi: false,
    fr: false,
    hr: false,
    hu: false,
    he: true,
    id: false,
    it: false,
    ja: false,
    ko: false,
    lv: false,
    lt: false,
    nl: false,
    no: false,
    pl: false,
    pt: false,
    ro: false,
    ru: false,
    sk: false,
    sl: false,
    srCyrl: false,
    srLatn: false,
    sv: false,
    th: false,
    tr: false,
    az: false,
    uk: false,
    vi: false,
    zhHans: false,
    zhHant: false
  };

  const LocaleSymbol = Symbol.for('vuetify:locale');
  function isLocaleInstance(obj) {
    return obj.name != null;
  }
  function createLocale(options) {
    const i18n = options?.adapter && isLocaleInstance(options?.adapter) ? options?.adapter : createVuetifyAdapter(options);
    const rtl = createRtl(i18n, options);
    return {
      ...i18n,
      ...rtl
    };
  }
  function useLocale() {
    const locale = vue.inject(LocaleSymbol);
    if (!locale) throw new Error('[Vuetify] Could not find injected locale instance');
    return locale;
  }
  function provideLocale(props) {
    const locale = vue.inject(LocaleSymbol);
    if (!locale) throw new Error('[Vuetify] Could not find injected locale instance');
    const i18n = locale.provide(props);
    const rtl = provideRtl(i18n, locale.rtl, props);
    const data = {
      ...i18n,
      ...rtl
    };
    vue.provide(LocaleSymbol, data);
    return data;
  }
  function createRtl(i18n, options) {
    const rtl = vue.ref(options?.rtl ?? defaultRtl);
    const isRtl = vue.computed(() => rtl.value[i18n.current.value] ?? false);
    return {
      isRtl,
      rtl,
      rtlClasses: vue.computed(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`)
    };
  }
  function provideRtl(locale, rtl, props) {
    const isRtl = vue.computed(() => props.rtl ?? rtl.value[locale.current.value] ?? false);
    return {
      isRtl,
      rtl,
      rtlClasses: vue.computed(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`)
    };
  }
  function useRtl() {
    const locale = vue.inject(LocaleSymbol);
    if (!locale) throw new Error('[Vuetify] Could not find injected rtl instance');
    return {
      isRtl: locale.isRtl,
      rtlClasses: locale.rtlClasses
    };
  }

  const VApp = genericComponent()({
    name: 'VApp',
    props: {
      ...makeComponentProps(),
      ...makeLayoutProps({
        fullHeight: true
      }),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const theme = provideTheme(props);
      const {
        layoutClasses,
        layoutStyles,
        getLayoutItem,
        items,
        layoutRef
      } = createLayout(props);
      const {
        rtlClasses
      } = useRtl();
      useRender(() => vue.createVNode("div", {
        "ref": layoutRef,
        "class": ['v-application', theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class],
        "style": [layoutStyles.value, props.style]
      }, [vue.createVNode("div", {
        "class": "v-application__wrap"
      }, [slots.default?.()])]));
      return {
        getLayoutItem,
        items,
        theme
      };
    }
  });

  // Composables

  // Types

  const VDefaultsProvider = genericComponent(false)({
    name: 'VDefaultsProvider',
    props: {
      defaults: Object,
      disabled: Boolean,
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
        disabled,
        reset,
        root,
        scoped
      } = vue.toRefs(props);
      provideDefaults(defaults, {
        reset,
        root,
        scoped,
        disabled
      });
      return () => slots.default?.();
    }
  });

  // Utilities

  // Types

  function createCssTransition(name) {
    let origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'center center';
    let mode = arguments.length > 2 ? arguments[2] : undefined;
    return genericComponent()({
      name,
      props: {
        disabled: Boolean,
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
        const functions = {
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
            if (props.leaveAbsolute && el?._transitionInitialStyles) {
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
        };
        return () => {
          const tag = props.group ? vue.TransitionGroup : vue.Transition;
          return vue.h(tag, {
            name: props.disabled ? '' : name,
            css: !props.disabled,
            ...(props.group ? undefined : {
              mode: props.mode
            }),
            ...(props.disabled ? {} : functions)
          }, slots.default);
        };
      }
    });
  }
  function createJavascriptTransition(name, functions) {
    let mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'in-out';
    return genericComponent()({
      name,
      props: {
        mode: {
          type: String,
          default: mode
        },
        disabled: Boolean
      },
      setup(props, _ref2) {
        let {
          slots
        } = _ref2;
        return () => {
          return vue.h(vue.Transition, {
            name: props.disabled ? '' : name,
            css: !props.disabled,
            // mode: props.mode, // TODO: vuejs/vue-next#3104
            ...(props.disabled ? {} : functions)
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

  // Types

  const VDialogTransition = genericComponent()({
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
          }, {}], {
            duration: 225 * speed,
            easing: deceleratedEasing
          });
          getChildren(el)?.forEach(el => {
            animate(el, [{
              opacity: 0
            }, {
              opacity: 0,
              offset: 0.33
            }, {}], {
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
          await new Promise(resolve => requestAnimationFrame(resolve));
          const {
            x,
            y,
            sx,
            sy,
            speed
          } = getDimensions(props.target, el);
          const animation = animate(el, [{}, {
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }], {
            duration: 125 * speed,
            easing: acceleratedEasing
          });
          animation.finished.then(() => done());
          getChildren(el)?.forEach(el => {
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
    const els = el.querySelector(':scope > .v-card, :scope > .v-sheet, :scope > .v-list')?.children;
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
  const VFabTransition = createCssTransition('fab-transition', 'center center', 'out-in');

  // Generic transitions
  const VDialogBottomTransition = createCssTransition('dialog-bottom-transition');
  const VDialogTopTransition = createCssTransition('dialog-top-transition');
  const VFadeTransition = createCssTransition('fade-transition');
  const VScaleTransition = createCssTransition('scale-transition');
  const VScrollXTransition = createCssTransition('scroll-x-transition');
  const VScrollXReverseTransition = createCssTransition('scroll-x-reverse-transition');
  const VScrollYTransition = createCssTransition('scroll-y-transition');
  const VScrollYReverseTransition = createCssTransition('scroll-y-reverse-transition');
  const VSlideXTransition = createCssTransition('slide-x-transition');
  const VSlideXReverseTransition = createCssTransition('slide-x-reverse-transition');
  const VSlideYTransition = createCssTransition('slide-y-transition');
  const VSlideYReverseTransition = createCssTransition('slide-y-reverse-transition');

  // Javascript transitions
  const VExpandTransition = createJavascriptTransition('expand-transition', ExpandTransitionGenerator());
  const VExpandXTransition = createJavascriptTransition('expand-x-transition', ExpandTransitionGenerator('', true));

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
  const VResponsive = genericComponent()({
    name: 'VResponsive',
    props: {
      aspectRatio: [String, Number],
      contentClass: String,
      ...makeComponentProps(),
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
      useRender(() => vue.createVNode("div", {
        "class": ['v-responsive', props.class],
        "style": [dimensionStyles.value, props.style]
      }, [vue.createVNode("div", {
        "class": "v-responsive__sizer",
        "style": aspectStyles.value
      }, null), slots.additional?.(), slots.default && vue.createVNode("div", {
        "class": ['v-responsive__content', props.contentClass]
      }, [slots.default()])]));
      return {};
    }
  });

  // Utils

  // Types

  function mounted$5(el, binding) {
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
      let entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      let observer = arguments.length > 1 ? arguments[1] : undefined;
      const _observe = el._observe?.[binding.instance.$.uid];
      if (!_observe) return; // Just in case, should never fire

      const isIntersecting = entries.some(entry => entry.isIntersecting);

      // If is not quiet or has already been
      // initted, invoke the user callback
      if (handler && (!modifiers.quiet || _observe.init) && (!modifiers.once || isIntersecting || _observe.init)) {
        handler(isIntersecting, entries, observer);
      }
      if (isIntersecting && modifiers.once) unmounted$5(el, binding);else _observe.init = true;
    }, options);
    el._observe = Object(el._observe);
    el._observe[binding.instance.$.uid] = {
      init: false,
      observer
    };
    observer.observe(el);
  }
  function unmounted$5(el, binding) {
    const observe = el._observe?.[binding.instance.$.uid];
    if (!observe) return;
    observe.observer.unobserve(el);
    delete el._observe[binding.instance.$.uid];
  }
  const Intersect = {
    mounted: mounted$5,
    unmounted: unmounted$5
  };

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

  // Types

  const VImg = genericComponent()({
    name: 'VImg',
    directives: {
      intersect: Intersect
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
      ...makeComponentProps(),
      ...makeTransitionProps()
    },
    emits: {
      loadstart: value => true,
      load: value => true,
      error: value => true
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
          emit('loadstart', image.value?.currentSrc || normalisedSrc.value.src);
          if (image.value?.complete) {
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
        getSrc();
        state.value = 'loaded';
        emit('load', image.value?.currentSrc || normalisedSrc.value.src);
      }
      function onError() {
        state.value = 'error';
        emit('error', image.value?.currentSrc || normalisedSrc.value.src);
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
        if (!normalisedSrc.value.src || state.value === 'idle') return null;
        const img = vue.createVNode("img", {
          "class": ['v-img__img', containClasses.value],
          "src": normalisedSrc.value.src,
          "srcset": normalisedSrc.value.srcset,
          "alt": props.alt,
          "sizes": props.sizes,
          "ref": image,
          "onLoad": onLoad,
          "onError": onError
        }, null);
        const sources = slots.sources?.();
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
          "alt": props.alt
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
        }, props.class],
        "style": [{
          width: convertToUnit(props.width === 'auto' ? naturalWidth.value : props.width)
        }, props.style],
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

  // Utilities

  // Types

  // Composables
  const makeTagProps = propsFactory({
    tag: {
      type: String,
      default: 'div'
    }
  }, 'tag');

  const makeVToolbarTitleProps = propsFactory({
    text: String,
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'v-toolbar-title');
  const VToolbarTitle = genericComponent()({
    name: 'VToolbarTitle',
    props: makeVToolbarTitleProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => {
        const hasText = !!(slots.default || slots.text || props.text);
        return vue.createVNode(props.tag, {
          "class": ['v-toolbar-title', props.class],
          "style": props.style
        }, {
          default: () => [hasText && vue.createVNode("div", {
            "class": "v-toolbar-title__placeholder"
          }, [slots.text ? slots.text() : props.text, slots.default?.()])]
        });
      });
      return {};
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

  const allowedDensities$1 = [null, 'prominent', 'default', 'comfortable', 'compact'];
  const makeVToolbarProps = propsFactory({
    absolute: Boolean,
    collapse: Boolean,
    color: String,
    density: {
      type: String,
      default: 'default',
      validator: v => allowedDensities$1.includes(v)
    },
    extended: Boolean,
    extensionHeight: {
      type: [Number, String],
      default: 48
    },
    flat: Boolean,
    floating: Boolean,
    height: {
      type: [Number, String],
      default: 64
    },
    image: String,
    title: String,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: 'header'
    }),
    ...makeThemeProps()
  }, 'v-toolbar');
  const VToolbar = genericComponent()({
    name: 'VToolbar',
    props: makeVToolbarProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const {
        borderClasses
      } = useBorder(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        themeClasses
      } = provideTheme(props);
      const isExtended = vue.ref(!!(props.extended || slots.extension?.()));
      const contentHeight = vue.computed(() => parseInt(Number(props.height) + (props.density === 'prominent' ? Number(props.height) : 0) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0), 10));
      const extensionHeight = vue.computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === 'prominent' ? Number(props.extensionHeight) : 0) - (props.density === 'comfortable' ? 4 : 0) - (props.density === 'compact' ? 8 : 0), 10) : 0);
      provideDefaults({
        VBtn: {
          variant: 'text'
        }
      });
      useRender(() => {
        const hasTitle = !!(props.title || slots.title);
        const hasImage = !!(slots.image || props.image);
        const extension = slots.extension?.();
        isExtended.value = !!(props.extended || extension);
        return vue.createVNode(props.tag, {
          "class": ['v-toolbar', {
            'v-toolbar--absolute': props.absolute,
            'v-toolbar--collapse': props.collapse,
            'v-toolbar--flat': props.flat,
            'v-toolbar--floating': props.floating,
            [`v-toolbar--density-${props.density}`]: true
          }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, props.class],
          "style": [backgroundColorStyles.value, props.style]
        }, {
          default: () => [hasImage && vue.createVNode("div", {
            "key": "image",
            "class": "v-toolbar__image"
          }, [!slots.image ? vue.createVNode(VImg, {
            "key": "image-img",
            "cover": true,
            "src": props.image
          }, null) : vue.createVNode(VDefaultsProvider, {
            "key": "image-defaults",
            "disabled": !props.image,
            "defaults": {
              VImg: {
                cover: true,
                src: props.image
              }
            }
          }, slots.image)]), vue.createVNode(VDefaultsProvider, {
            "defaults": {
              VTabs: {
                height: convertToUnit(contentHeight.value)
              }
            }
          }, {
            default: () => [vue.createVNode("div", {
              "class": "v-toolbar__content",
              "style": {
                height: convertToUnit(contentHeight.value)
              }
            }, [slots.prepend && vue.createVNode("div", {
              "class": "v-toolbar__prepend"
            }, [slots.prepend?.()]), hasTitle && vue.createVNode(VToolbarTitle, {
              "key": "title",
              "text": props.title
            }, {
              text: slots.title
            }), slots.default?.(), slots.append && vue.createVNode("div", {
              "class": "v-toolbar__append"
            }, [slots.append?.()])])]
          }), vue.createVNode(VDefaultsProvider, {
            "defaults": {
              VTabs: {
                height: convertToUnit(extensionHeight.value)
              }
            }
          }, {
            default: () => [vue.createVNode(VExpandTransition, null, {
              default: () => [isExtended.value && vue.createVNode("div", {
                "class": "v-toolbar__extension",
                "style": {
                  height: convertToUnit(extensionHeight.value)
                }
              }, [extension])]
            })]
          })]
        });
      });
      return {
        contentHeight,
        extensionHeight
      };
    }
  });

  // Utilities

  // Types

  // Composables
  const makeScrollProps = propsFactory({
    scrollTarget: {
      type: String
    },
    scrollThreshold: {
      type: [String, Number],
      default: 300
    }
  }, 'scroll');
  function useScroll(props) {
    let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      canScroll
    } = args;
    let previousScroll = 0;
    const target = vue.ref(null);
    const currentScroll = vue.ref(0);
    const savedScroll = vue.ref(0);
    const currentThreshold = vue.ref(0);
    const isScrollActive = vue.ref(false);
    const isScrollingUp = vue.ref(false);
    const scrollThreshold = vue.computed(() => {
      return Number(props.scrollThreshold);
    });

    /**
     * 1: at top
     * 0: at threshold
     */
    const scrollRatio = vue.computed(() => {
      return clamp((scrollThreshold.value - currentScroll.value) / scrollThreshold.value || 0);
    });
    const onScroll = () => {
      const targetEl = target.value;
      if (!targetEl || canScroll && !canScroll.value) return;
      previousScroll = currentScroll.value;
      currentScroll.value = 'window' in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
      isScrollingUp.value = currentScroll.value < previousScroll;
      currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value);
    };
    vue.watch(isScrollingUp, () => {
      savedScroll.value = savedScroll.value || currentScroll.value;
    });
    vue.watch(isScrollActive, () => {
      savedScroll.value = 0;
    });
    vue.onMounted(() => {
      vue.watch(() => props.scrollTarget, scrollTarget => {
        const newTarget = scrollTarget ? document.querySelector(scrollTarget) : window;
        if (!newTarget) {
          consoleWarn(`Unable to locate element with identifier ${scrollTarget}`, vue.getCurrentInstance());
          return;
        }
        if (newTarget === target.value) return;
        target.value?.removeEventListener('scroll', onScroll);
        target.value = newTarget;
        target.value.addEventListener('scroll', onScroll, {
          passive: true
        });
      }, {
        immediate: true
      });
    });
    vue.onBeforeUnmount(() => {
      target.value?.removeEventListener('scroll', onScroll);
    });

    // Do we need this? If yes - seems that
    // there's no need to expose onScroll
    canScroll && vue.watch(canScroll, onScroll, {
      immediate: true
    });
    return {
      scrollThreshold,
      currentScroll,
      currentThreshold,
      isScrollActive,
      scrollRatio,
      // required only for testing
      // probably can be removed
      // later (2 chars chlng)
      isScrollingUp,
      savedScroll
    };
  }

  // Utilities

  // Composables
  function useSsrBoot() {
    const isBooted = vue.ref(false);
    vue.onMounted(() => {
      window.requestAnimationFrame(() => {
        isBooted.value = true;
      });
    });
    const ssrBootStyles = vue.computed(() => !isBooted.value ? {
      transition: 'none !important'
    } : undefined);
    return {
      ssrBootStyles,
      isBooted: vue.readonly(isBooted)
    };
  }

  // Types

  const VAppBar = genericComponent()({
    name: 'VAppBar',
    props: {
      scrollBehavior: String,
      modelValue: {
        type: Boolean,
        default: true
      },
      location: {
        type: String,
        default: 'top',
        validator: value => ['top', 'bottom'].includes(value)
      },
      ...makeVToolbarProps(),
      ...makeLayoutItemProps(),
      ...makeScrollProps(),
      height: {
        type: [Number, String],
        default: 64
      }
    },
    emits: {
      'update:modelValue': value => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const vToolbarRef = vue.ref();
      const isActive = useProxiedModel(props, 'modelValue');
      const scrollBehavior = vue.computed(() => {
        const behavior = new Set(props.scrollBehavior?.split(' ') ?? []);
        return {
          hide: behavior.has('hide'),
          // fullyHide: behavior.has('fully-hide'),
          inverted: behavior.has('inverted'),
          collapse: behavior.has('collapse'),
          elevate: behavior.has('elevate'),
          fadeImage: behavior.has('fade-image')
          // shrink: behavior.has('shrink'),
        };
      });

      const canScroll = vue.computed(() => {
        const behavior = scrollBehavior.value;
        return behavior.hide ||
        // behavior.fullyHide ||
        behavior.inverted || behavior.collapse || behavior.elevate || behavior.fadeImage ||
        // behavior.shrink ||
        !isActive.value;
      });
      const {
        currentScroll,
        scrollThreshold,
        isScrollingUp,
        scrollRatio
      } = useScroll(props, {
        canScroll
      });
      const isCollapsed = vue.computed(() => props.collapse || scrollBehavior.value.collapse && (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0));
      const isFlat = vue.computed(() => props.flat || scrollBehavior.value.elevate && (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0));
      const opacity = vue.computed(() => scrollBehavior.value.fadeImage ? scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value : undefined);
      const height = vue.computed(() => {
        if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0;
        const height = vToolbarRef.value?.contentHeight ?? 0;
        const extensionHeight = vToolbarRef.value?.extensionHeight ?? 0;
        return height + extensionHeight;
      });
      function setActive() {
        if (scrollBehavior.value.hide) {
          if (scrollBehavior.value.inverted) {
            isActive.value = currentScroll.value > scrollThreshold.value;
          } else {
            isActive.value = isScrollingUp.value || currentScroll.value < scrollThreshold.value;
          }
        } else {
          isActive.value = true;
        }
      }
      vue.watch(currentScroll, setActive, {
        immediate: true
      });
      vue.watch(scrollBehavior, setActive);
      const {
        ssrBootStyles
      } = useSsrBoot();
      const {
        layoutItemStyles
      } = useLayoutItem({
        id: props.name,
        order: vue.computed(() => parseInt(props.order, 10)),
        position: vue.toRef(props, 'location'),
        layoutSize: height,
        elementSize: vue.ref(undefined),
        active: isActive,
        absolute: vue.toRef(props, 'absolute')
      });
      useRender(() => {
        const [toolbarProps] = VToolbar.filterProps(props);
        return vue.createVNode(VToolbar, vue.mergeProps({
          "ref": vToolbarRef,
          "class": ['v-app-bar', {
            'v-app-bar--bottom': props.location === 'bottom'
          }, props.class],
          "style": [{
            ...layoutItemStyles.value,
            '--v-toolbar-image-opacity': opacity.value,
            height: undefined,
            ...ssrBootStyles.value
          }, props.style]
        }, toolbarProps, {
          "collapse": isCollapsed.value,
          "flat": isFlat.value
        }), slots);
      });
      return {};
    }
  });

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

  // Types

  const allowedVariants$2 = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'];
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
      validator: v => allowedVariants$2.includes(v)
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

  const makeVBtnGroupProps = propsFactory({
    divided: Boolean,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps()
  }, 'v-btn-group');
  const VBtnGroup = genericComponent()({
    name: 'VBtnGroup',
    props: makeVBtnGroupProps(),
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
          }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, props.class],
          "style": props.style
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
      const children = findChildrenWithProvide(key, groupVm?.vnode);
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
      if (value && item?.disabled) return;
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
  const VBtnToggle = genericComponent()({
    name: 'VBtnToggle',
    props: {
      ...makeVBtnGroupProps(),
      ...makeGroupProps()
    },
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
        const [btnGroupProps] = VBtnGroup.filterProps(props);
        return vue.createVNode(VBtnGroup, vue.mergeProps({
          "class": ['v-btn-toggle', props.class]
        }, btnGroupProps, {
          "style": props.style
        }), {
          default: () => [slots.default?.({
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

  // Utilities

  // Types

  const aliases = {
    collapse: 'mdi-chevron-up',
    complete: 'mdi-check',
    cancel: 'mdi-close-circle',
    close: 'mdi-close',
    delete: 'mdi-close-circle',
    // delete (e.g. v-chip close)
    clear: 'mdi-close-circle',
    success: 'mdi-check-circle',
    info: 'mdi-information',
    warning: 'mdi-alert-circle',
    error: 'mdi-close-circle',
    prev: 'mdi-chevron-left',
    next: 'mdi-chevron-right',
    checkboxOn: 'mdi-checkbox-marked',
    checkboxOff: 'mdi-checkbox-blank-outline',
    checkboxIndeterminate: 'mdi-minus-box',
    delimiter: 'mdi-circle',
    // for carousel
    sortAsc: 'mdi-arrow-up',
    sortDesc: 'mdi-arrow-down',
    expand: 'mdi-chevron-down',
    menu: 'mdi-menu',
    subgroup: 'mdi-menu-down',
    dropdown: 'mdi-menu-down',
    radioOn: 'mdi-radiobox-marked',
    radioOff: 'mdi-radiobox-blank',
    edit: 'mdi-pencil',
    ratingEmpty: 'mdi-star-outline',
    ratingFull: 'mdi-star',
    ratingHalf: 'mdi-star-half-full',
    loading: 'mdi-cached',
    first: 'mdi-page-first',
    last: 'mdi-page-last',
    unfold: 'mdi-unfold-more-horizontal',
    file: 'mdi-paperclip',
    plus: 'mdi-plus',
    minus: 'mdi-minus'
  };
  const mdi = {
    // Not using mergeProps here, functional components merge props by default (?)
    component: props => vue.h(VClassIcon, {
      ...props,
      class: 'mdi'
    })
  };

  // Types

  const IconValue = [String, Function, Object, Array];
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
  const VComponentIcon = genericComponent()({
    name: 'VComponentIcon',
    props: makeIconProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        const Icon = props.icon;
        return vue.createVNode(props.tag, null, {
          default: () => [props.icon ? vue.createVNode(Icon, null, null) : slots.default?.()]
        });
      };
    }
  });
  const VSvgIcon = defineComponent({
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
          }, [Array.isArray(props.icon) ? props.icon.map(path => Array.isArray(path) ? vue.createVNode("path", {
            "d": path[0],
            "fill-opacity": path[1]
          }, null) : vue.createVNode("path", {
            "d": path
          }, null)) : vue.createVNode("path", {
            "d": props.icon
          }, null)])]
        });
      };
    }
  });
  const VLigatureIcon = defineComponent({
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
  const VClassIcon = defineComponent({
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
  const defaultSets = {
    svg: {
      component: VSvgIcon
    },
    class: {
      component: VClassIcon
    }
  };

  // Composables
  function createIcons(options) {
    return mergeDeep({
      defaultSet: 'mdi',
      sets: {
        ...defaultSets,
        mdi
      },
      aliases
    }, options);
  }
  const useIcon = props => {
    const icons = vue.inject(IconSymbol);
    if (!icons) throw new Error('Missing Vuetify Icons provide!');
    const iconData = vue.computed(() => {
      const iconAlias = vue.unref(props);
      if (!iconAlias) return {
        component: VComponentIcon
      };
      let icon = iconAlias;
      if (typeof icon === 'string') {
        icon = icon.trim();
        if (icon.startsWith('$')) {
          icon = icons.aliases?.[icon.slice(1)];
        }
      }
      if (!icon) throw new Error(`Could not find aliased icon "${iconAlias}"`);
      if (Array.isArray(icon)) {
        return {
          component: VSvgIcon,
          icon
        };
      } else if (typeof icon !== 'string') {
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

  const makeVIconProps = propsFactory({
    color: String,
    start: Boolean,
    end: Boolean,
    icon: IconValue,
    ...makeComponentProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'i'
    }),
    ...makeThemeProps()
  }, 'v-icon');
  const VIcon = genericComponent()({
    name: 'VIcon',
    props: makeVIconProps(),
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const slotIcon = vue.ref();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        iconData
      } = useIcon(vue.computed(() => slotIcon.value || props.icon));
      const {
        sizeClasses
      } = useSize(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, 'color'));
      useRender(() => {
        const slotValue = slots.default?.();
        if (slotValue) {
          slotIcon.value = slotValue.filter(node => node.type === vue.Text && node.children && typeof node.children === 'string')[0]?.children;
        }
        return vue.createVNode(iconData.value.component, {
          "tag": props.tag,
          "icon": iconData.value.icon,
          "class": ['v-icon', 'notranslate', themeClasses.value, sizeClasses.value, textColorClasses.value, {
            'v-icon--clickable': !!attrs.onClick,
            'v-icon--start': props.start,
            'v-icon--end': props.end
          }, props.class],
          "style": [!sizeClasses.value ? {
            fontSize: convertToUnit(props.size),
            height: convertToUnit(props.size),
            width: convertToUnit(props.size)
          } : undefined, textColorStyles.value, props.style],
          "role": attrs.onClick ? 'button' : undefined,
          "aria-hidden": !attrs.onClick
        }, {
          default: () => [slotValue]
        });
      });
      return {};
    }
  });

  // Utilities
  function useIntersectionObserver(callback, options) {
    const intersectionRef = vue.ref();
    const isIntersecting = vue.ref(false);
    if (SUPPORTS_INTERSECTION) {
      const observer = new IntersectionObserver(entries => {
        callback?.(entries, observer);
        isIntersecting.value = !!entries.find(entry => entry.isIntersecting);
      }, options);
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

  // Types

  const VProgressCircular = genericComponent()({
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
      ...makeComponentProps(),
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
        }, themeClasses.value, sizeClasses.value, textColorClasses.value, props.class],
        "style": [sizeStyles.value, textColorStyles.value, props.style],
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

  // Styles

  // Types

  const stopSymbol = Symbol('rippleStop');
  const DELAY_RIPPLE = 80;
  function transform(el, value) {
    el.style.transform = value;
    el.style.webkitTransform = value;
  }
  function isTouchEvent(e) {
    return e.constructor.name === 'TouchEvent';
  }
  function isKeyboardEvent(e) {
    return e.constructor.name === 'KeyboardEvent';
  }
  const calculate = function (e, el) {
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
    if (el._ripple?.circle) {
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
      let value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!el?._ripple?.enabled) {
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
      animation.dataset.activated = String(performance.now());
      setTimeout(() => {
        animation.classList.remove('v-ripple__animation--enter');
        animation.classList.add('v-ripple__animation--in');
        transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
      }, 0);
    },
    hide(el) {
      if (!el?._ripple?.enabled) return;
      const ripples = el.getElementsByClassName('v-ripple__animation');
      if (ripples.length === 0) return;
      const animation = ripples[ripples.length - 1];
      if (animation.dataset.isHiding) return;else animation.dataset.isHiding = 'true';
      const diff = performance.now() - Number(animation.dataset.activated);
      const delay = Math.max(250 - diff, 0);
      setTimeout(() => {
        animation.classList.remove('v-ripple__animation--in');
        animation.classList.add('v-ripple__animation--out');
        setTimeout(() => {
          const ripples = el.getElementsByClassName('v-ripple__animation');
          if (ripples.length === 1 && el.dataset.previousPosition) {
            el.style.position = el.dataset.previousPosition;
            delete el.dataset.previousPosition;
          }
          if (animation.parentNode?.parentNode === el) el.removeChild(animation.parentNode);
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
    if (!element?._ripple || element._ripple.touched || e[stopSymbol]) return;

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
        if (element?._ripple?.showTimerCommit) {
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
    if (!element?._ripple) return;
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
    if (!element?._ripple) return;
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
  function mounted$4(el, binding) {
    updateRipple(el, binding, false);
  }
  function unmounted$4(el) {
    delete el._ripple;
    removeListeners(el);
  }
  function updated$1(el, binding) {
    if (binding.value === binding.oldValue) {
      return;
    }
    const wasEnabled = isRippleEnabled(binding.oldValue);
    updateRipple(el, binding, wasEnabled);
  }
  const Ripple = {
    mounted: mounted$4,
    unmounted: unmounted$4,
    updated: updated$1
  };

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

  const VProgressLinear = genericComponent()({
    name: 'VProgressLinear',
    props: {
      absolute: Boolean,
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
      ...makeComponentProps(),
      ...makeLocationProps({
        location: 'top'
      }),
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
        locationStyles
      } = useLocation(props);
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
          'v-progress-linear--absolute': props.absolute,
          'v-progress-linear--active': props.active && isIntersecting.value,
          'v-progress-linear--reverse': isReversed.value,
          'v-progress-linear--rounded': props.rounded,
          'v-progress-linear--rounded-bar': props.roundedBar,
          'v-progress-linear--striped': props.striped
        }, roundedClasses.value, themeClasses.value, props.class],
        "style": [{
          bottom: props.location === 'bottom' ? 0 : undefined,
          top: props.location === 'top' ? 0 : undefined,
          height: props.active ? convertToUnit(height.value) : 0,
          '--v-progress-linear-height': convertToUnit(height.value),
          ...locationStyles.value
        }, props.style],
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
    let {
      slots
    } = _ref;
    return vue.createVNode("div", {
      "class": `${props.name}__loader`
    }, [slots.default?.({
      color: props.color,
      isActive: props.active
    }) || vue.createVNode(VProgressLinear, {
      "active": props.active,
      "color": props.color,
      "height": "2",
      "indeterminate": true
    }, null)]);
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
    return getCurrentInstance('useRouter')?.proxy?.$router;
  }
  function useLink(props, attrs) {
    const RouterLink = vue.resolveDynamicComponent('RouterLink');
    const isLink = vue.computed(() => !!(props.href || props.to));
    const isClickable = vue.computed(() => {
      return isLink?.value || hasEvent(attrs, 'click') || hasEvent(props, 'click');
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
      route: link?.route,
      navigate: link?.navigate,
      isActive: link && vue.computed(() => props.exact ? link.isExactActive?.value : link.isActive?.value),
      href: vue.computed(() => props.to ? link?.route.value.href : props.href)
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
        removeBefore = router?.beforeEach((to, from, next) => {
          if (!inTransition) {
            setTimeout(() => popped ? cb(next) : next());
          } else {
            popped ? cb(next) : next();
          }
          inTransition = true;
        });
        removeAfter = router?.afterEach(() => {
          inTransition = false;
        });
      });
      vue.onScopeDispose(() => {
        window.removeEventListener('popstate', onPopstate);
        removeBefore?.();
        removeAfter?.();
      });
    }
    function onPopstate(e) {
      if (e.state?.replaced) return;
      popped = true;
      setTimeout(() => popped = false);
    }
  }

  // Utilities

  // Types

  function useSelectLink(link, select) {
    vue.watch(() => link.isActive?.value, isActive => {
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

  const makeVBtnProps = propsFactory({
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
    text: String,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLoaderProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'button'
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'elevated'
    })
  }, 'v-btn');
  const VBtn = genericComponent()({
    name: 'VBtn',
    directives: {
      Ripple
    },
    props: makeVBtnProps(),
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
        if (props.active !== undefined) {
          return props.active;
        }
        if (link.isLink.value) {
          return link.isActive?.value;
        }
        return group?.isSelected.value;
      });
      const isDisabled = vue.computed(() => group?.disabled.value || props.disabled);
      const isElevated = vue.computed(() => {
        return props.variant === 'elevated' && !(props.disabled || props.flat || props.border);
      });
      const valueAttr = vue.computed(() => {
        if (props.value === undefined) return undefined;
        return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
      });
      function onClick(e) {
        if (isDisabled.value) return;
        link.navigate?.(e);
        group?.toggle();
      }
      useSelectLink(link, group?.select);
      useRender(() => {
        const Tag = link.isLink.value ? 'a' : props.tag;
        const hasPrepend = !!(props.prependIcon || slots.prepend);
        const hasAppend = !!(props.appendIcon || slots.append);
        const hasIcon = !!(props.icon && props.icon !== true);
        const hasColor = group?.isSelected.value && (!link.isLink.value || link.isActive?.value) || !group || link.isActive?.value;
        return vue.withDirectives(vue.createVNode(Tag, {
          "type": Tag === 'a' ? undefined : 'button',
          "class": ['v-btn', group?.selectedClass.value, {
            'v-btn--active': isActive.value,
            'v-btn--block': props.block,
            'v-btn--disabled': isDisabled.value,
            'v-btn--elevated': isElevated.value,
            'v-btn--flat': props.flat,
            'v-btn--icon': !!props.icon,
            'v-btn--loading': props.loading,
            'v-btn--stacked': props.stacked
          }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : undefined, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
          "style": [hasColor ? colorStyles.value : undefined, dimensionStyles.value, locationStyles.value, sizeStyles.value, props.style],
          "disabled": isDisabled.value || undefined,
          "href": link.href.value,
          "onClick": onClick,
          "value": valueAttr.value
        }, {
          default: () => [genOverlays(true, 'v-btn'), !props.icon && hasPrepend && vue.createVNode("span", {
            "key": "prepend",
            "class": "v-btn__prepend"
          }, [!slots.prepend ? vue.createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon
          }, null) : vue.createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !props.prependIcon,
            "defaults": {
              VIcon: {
                icon: props.prependIcon
              }
            }
          }, slots.prepend)]), vue.createVNode("span", {
            "class": "v-btn__content",
            "data-no-activator": ""
          }, [!slots.default && hasIcon ? vue.createVNode(VIcon, {
            "key": "content-icon",
            "icon": props.icon
          }, null) : vue.createVNode(VDefaultsProvider, {
            "key": "content-defaults",
            "disabled": !hasIcon,
            "defaults": {
              VIcon: {
                icon: props.icon
              }
            }
          }, {
            default: () => [slots.default?.() ?? props.text]
          })]), !props.icon && hasAppend && vue.createVNode("span", {
            "key": "append",
            "class": "v-btn__append"
          }, [!slots.append ? vue.createVNode(VIcon, {
            "key": "append-icon",
            "icon": props.appendIcon
          }, null) : vue.createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !props.appendIcon,
            "defaults": {
              VIcon: {
                icon: props.appendIcon
              }
            }
          }, slots.append)]), !!props.loading && vue.createVNode("span", {
            "key": "loader",
            "class": "v-btn__loader"
          }, [slots.loader?.() ?? vue.createVNode(VProgressCircular, {
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

  // Types

  const VAppBarNavIcon = genericComponent()({
    name: 'VAppBarNavIcon',
    props: makeVBtnProps({
      icon: '$menu',
      variant: 'text'
    }),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => vue.createVNode(VBtn, vue.mergeProps(props, {
        "class": ['v-app-bar-nav-icon']
      }), slots));
      return {};
    }
  });

  const VToolbarItems = genericComponent()({
    name: 'VToolbarItems',
    props: {
      ...makeComponentProps(),
      ...makeVariantProps({
        variant: 'text'
      })
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      provideDefaults({
        VBtn: {
          color: vue.toRef(props, 'color'),
          height: 'inherit',
          variant: vue.toRef(props, 'variant')
        }
      });
      useRender(() => vue.createVNode("div", {
        "class": ['v-toolbar-items', props.class],
        "style": props.style
      }, [slots.default?.()]));
      return {};
    }
  });

  // Types

  const VAppBarTitle = genericComponent()({
    name: 'VAppBarTitle',
    props: makeVToolbarTitleProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => vue.createVNode(VToolbarTitle, vue.mergeProps(props, {
        "class": "v-app-bar-title"
      }), slots));
      return {};
    }
  });

  // Utilities
  const VAlertTitle = createSimpleFunctional('v-alert-title');

  // Types

  const allowedTypes = ['success', 'info', 'warning', 'error'];
  const VAlert = genericComponent()({
    name: 'VAlert',
    props: {
      border: {
        type: [Boolean, String],
        validator: val => {
          return typeof val === 'boolean' || ['top', 'end', 'bottom', 'start'].includes(val);
        }
      },
      borderColor: String,
      closable: Boolean,
      closeIcon: {
        type: IconValue,
        default: '$close'
      },
      closeLabel: {
        type: String,
        default: '$vuetify.close'
      },
      icon: {
        type: [Boolean, String, Function, Object],
        default: null
      },
      modelValue: {
        type: Boolean,
        default: true
      },
      prominent: Boolean,
      title: String,
      text: String,
      type: {
        type: String,
        validator: val => allowedTypes.includes(val)
      },
      ...makeComponentProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeLocationProps(),
      ...makePositionProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: 'flat'
      })
    },
    emits: {
      'click:close': e => true,
      'update:modelValue': value => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const isActive = useProxiedModel(props, 'modelValue');
      const icon = vue.computed(() => {
        if (props.icon === false) return undefined;
        if (!props.type) return props.icon;
        return props.icon ?? `$${props.type}`;
      });
      const variantProps = vue.computed(() => ({
        color: props.color ?? props.type,
        variant: props.variant
      }));
      const {
        themeClasses
      } = provideTheme(props);
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
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, 'borderColor'));
      const {
        t
      } = useLocale();
      const closeProps = vue.computed(() => ({
        'aria-label': t(props.closeLabel),
        onClick(e) {
          isActive.value = false;
          emit('click:close', e);
        }
      }));
      return () => {
        const hasPrepend = !!(slots.prepend || icon.value);
        const hasTitle = !!(slots.title || props.title);
        const hasText = !!(props.text || slots.text);
        const hasClose = !!(slots.close || props.closable);
        return isActive.value && vue.createVNode(props.tag, {
          "class": ['v-alert', props.border && {
            'v-alert--border': !!props.border,
            [`v-alert--border-${props.border === true ? 'start' : props.border}`]: true
          }, {
            'v-alert--prominent': props.prominent
          }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class],
          "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, props.style],
          "role": "alert"
        }, {
          default: () => [genOverlays(false, 'v-alert'), props.border && vue.createVNode("div", {
            "key": "border",
            "class": ['v-alert__border', textColorClasses.value],
            "style": textColorStyles.value
          }, null), hasPrepend && vue.createVNode("div", {
            "key": "prepend",
            "class": "v-alert__prepend"
          }, [!slots.prepend ? vue.createVNode(VIcon, {
            "key": "prepend-icon",
            "density": props.density,
            "icon": icon.value,
            "size": props.prominent ? 44 : 28
          }, null) : vue.createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !icon.value,
            "defaults": {
              VIcon: {
                density: props.density,
                icon: icon.value,
                size: props.prominent ? 44 : 28
              }
            }
          }, slots.prepend)]), vue.createVNode("div", {
            "class": "v-alert__content"
          }, [hasTitle && vue.createVNode(VAlertTitle, {
            "key": "title"
          }, {
            default: () => [slots.title?.() ?? props.title]
          }), hasText && (slots.text?.() ?? props.text), slots.default?.()]), slots.append && vue.createVNode("div", {
            "key": "append",
            "class": "v-alert__append"
          }, [slots.append()]), hasClose && vue.createVNode("div", {
            "key": "close",
            "class": "v-alert__close"
          }, [!slots.close ? vue.createVNode(VBtn, vue.mergeProps({
            "key": "close-btn",
            "icon": props.closeIcon,
            "size": "x-small",
            "variant": "text"
          }, closeProps.value), null) : vue.createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VBtn: {
                icon: props.closeIcon,
                size: 'x-small',
                variant: 'text'
              }
            }
          }, {
            default: () => [slots.close?.({
              props: closeProps.value
            })]
          })])]
        });
      };
    }
  });

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

  const VLabel = genericComponent()({
    name: 'VLabel',
    props: {
      text: String,
      clickable: Boolean,
      ...makeComponentProps(),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => vue.createVNode("label", {
        "class": ['v-label', {
          'v-label--clickable': props.clickable
        }, props.class],
        "style": props.style
      }, [props.text, slots.default?.()]));
      return {};
    }
  });

  const VFieldLabel = genericComponent()({
    name: 'VFieldLabel',
    props: {
      floating: Boolean,
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => vue.createVNode(VLabel, {
        "class": ['v-field-label', {
          'v-field-label--floating': props.floating
        }, props.class],
        "style": props.style,
        "aria-hidden": props.floating || undefined
      }, slots));
      return {};
    }
  });

  // Components

  // Types

  // Composables
  const makeFocusProps = propsFactory({
    focused: Boolean,
    'onUpdate:focused': EventProp()
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

  // Types

  const allowedVariants$1 = ['underlined', 'outlined', 'filled', 'solo', 'solo-inverted', 'solo-filled', 'plain'];
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
    baseColor: String,
    dirty: Boolean,
    disabled: Boolean,
    error: Boolean,
    flat: Boolean,
    label: String,
    persistentClear: Boolean,
    prependInnerIcon: IconValue,
    reverse: Boolean,
    singleLine: Boolean,
    variant: {
      type: String,
      default: 'filled',
      validator: v => allowedVariants$1.includes(v)
    },
    'onClick:clear': EventProp(),
    'onClick:appendInner': EventProp(),
    'onClick:prependInner': EventProp(),
    ...makeComponentProps(),
    ...makeLoaderProps(),
    ...makeRoundedProps(),
    ...makeThemeProps()
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
      const {
        roundedClasses
      } = useRounded(props);
      const isActive = vue.computed(() => props.dirty || props.active);
      const hasLabel = vue.computed(() => !props.singleLine && !!(props.label || slots.label));
      const uid = getUid();
      const id = vue.computed(() => props.id || `input-${uid}`);
      const messagesId = vue.computed(() => `${id.value}-messages`);
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
        return props.error || props.disabled ? undefined : isActive.value && isFocused.value ? props.color : props.baseColor;
      }));
      vue.watch(isActive, val => {
        if (hasLabel.value) {
          const el = labelRef.value.$el;
          const targetEl = floatingLabelRef.value.$el;
          requestAnimationFrame(() => {
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
      }
      useRender(() => {
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
            'v-field--flat': props.flat,
            'v-field--has-background': !!props.bgColor,
            'v-field--persistent-clear': props.persistentClear,
            'v-field--prepended': hasPrepend,
            'v-field--reverse': props.reverse,
            'v-field--single-line': props.singleLine,
            'v-field--no-label': !label,
            [`v-field--variant-${props.variant}`]: true
          }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value, roundedClasses.value, props.class],
          "style": [backgroundColorStyles.value, textColorStyles.value, props.style],
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
        }, null), slots['prepend-inner']?.(slotProps.value)]), vue.createVNode("div", {
          "class": "v-field__field",
          "data-no-activator": ""
        }, [['filled', 'solo', 'solo-inverted', 'solo-filled'].includes(props.variant) && hasLabel.value && vue.createVNode(VFieldLabel, {
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
        }), slots.default?.({
          ...slotProps.value,
          props: {
            id: id.value,
            class: 'v-field__input',
            'aria-describedby': messagesId.value
          },
          focus,
          blur
        })]), hasClear && vue.createVNode(VExpandXTransition, {
          "key": "clear"
        }, {
          default: () => [vue.withDirectives(vue.createVNode("div", {
            "class": "v-field__clearable",
            "onMousedown": e => {
              e.preventDefault();
              e.stopPropagation();
            }
          }, [slots.clear ? slots.clear() : vue.createVNode(InputIcon, {
            "name": "clear"
          }, null)]), [[vue.vShow, props.dirty]])]
        }), hasAppend && vue.createVNode("div", {
          "key": "append",
          "class": "v-field__append-inner"
        }, [slots['append-inner']?.(slotProps.value), props.appendInnerIcon && vue.createVNode(InputIcon, {
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
    const keys = Object.keys(VField.props).filter(k => !isOn(k) && k !== 'class' && k !== 'style');
    return pick(attrs, keys);
  }

  // Types

  const VMessages = genericComponent()({
    name: 'VMessages',
    props: {
      active: Boolean,
      color: String,
      messages: {
        type: [Array, String],
        default: () => []
      },
      ...makeComponentProps(),
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
        "class": ['v-messages', textColorClasses.value, props.class],
        "style": [textColorStyles.value, props.style],
        "role": "alert",
        "aria-live": "polite"
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

  // Utilities

  // Types

  const FormKey = Symbol.for('vuetify:form');
  const makeFormProps = propsFactory({
    disabled: Boolean,
    fastFail: Boolean,
    readonly: Boolean,
    modelValue: {
      type: Boolean,
      default: null
    },
    validateOn: {
      type: String,
      default: 'input'
    }
  }, 'form');
  function createForm(props) {
    const model = useProxiedModel(props, 'modelValue');
    const isDisabled = vue.computed(() => props.disabled);
    const isReadonly = vue.computed(() => props.readonly);
    const isValidating = vue.ref(false);
    const items = vue.ref([]);
    const errors = vue.ref([]);
    async function validate() {
      const results = [];
      let valid = true;
      errors.value = [];
      isValidating.value = true;
      for (const item of items.value) {
        const itemErrorMessages = await item.validate();
        if (itemErrorMessages.length > 0) {
          valid = false;
          results.push({
            id: item.id,
            errorMessages: itemErrorMessages
          });
        }
        if (!valid && props.fastFail) break;
      }
      errors.value = results;
      isValidating.value = false;
      return {
        valid,
        errors: errors.value
      };
    }
    function reset() {
      items.value.forEach(item => item.reset());
      model.value = null;
    }
    function resetValidation() {
      items.value.forEach(item => item.resetValidation());
      errors.value = [];
      model.value = null;
    }
    vue.watch(items, () => {
      let valid = 0;
      let invalid = 0;
      const results = [];
      for (const item of items.value) {
        if (item.isValid === false) {
          invalid++;
          results.push({
            id: item.id,
            errorMessages: item.errorMessages
          });
        } else if (item.isValid === true) valid++;
      }
      errors.value = results;
      model.value = invalid > 0 ? false : valid === items.value.length ? true : null;
    }, {
      deep: true
    });
    vue.provide(FormKey, {
      register: _ref => {
        let {
          id,
          validate,
          reset,
          resetValidation
        } = _ref;
        if (items.value.some(item => item.id === id)) {
          consoleWarn(`Duplicate input name "${id}"`);
        }
        items.value.push({
          id,
          validate,
          reset,
          resetValidation,
          isValid: null,
          errorMessages: []
        });
      },
      unregister: id => {
        items.value = items.value.filter(item => {
          return item.id !== id;
        });
      },
      update: (id, isValid, errorMessages) => {
        const found = items.value.find(item => item.id === id);
        if (!found) return;
        found.isValid = isValid;
        found.errorMessages = errorMessages;
      },
      isDisabled,
      isReadonly,
      isValidating,
      items,
      validateOn: vue.toRef(props, 'validateOn')
    });
    return {
      errors,
      isDisabled,
      isReadonly,
      isValidating,
      items,
      validate,
      reset,
      resetValidation
    };
  }
  function useForm() {
    return vue.inject(FormKey, null);
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
    const isDisabled = vue.computed(() => !!(props.disabled || form?.isDisabled.value));
    const isReadonly = vue.computed(() => !!(props.readonly || form?.isReadonly.value));
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
      form?.register({
        id: uid.value,
        validate,
        reset,
        resetValidation
      });
    });
    vue.onBeforeUnmount(() => {
      form?.unregister(uid.value);
    });
    const validateOn = vue.computed(() => props.validateOn || form?.validateOn.value || 'input');

    // Set initial valid state, for inputs that might not have rules
    vue.onMounted(() => form?.update(uid.value, isValid.value, errorMessages.value));
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
      form?.update(uid.value, isValid.value, errorMessages.value);
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
        if (results.length >= +(props.maxErrors ?? 1)) {
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

  const makeVInputProps = propsFactory({
    id: String,
    appendIcon: IconValue,
    prependIcon: IconValue,
    hideDetails: [Boolean, String],
    hint: String,
    persistentHint: Boolean,
    messages: {
      type: [Array, String],
      default: () => []
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: v => ['horizontal', 'vertical'].includes(v)
    },
    'onClick:prepend': EventProp(),
    'onClick:append': EventProp(),
    ...makeComponentProps(),
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
      const messagesId = vue.computed(() => `${id.value}-messages`);
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
        messagesId,
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
      const messages = vue.computed(() => {
        if (errorMessages.value.length > 0) {
          return errorMessages.value;
        } else if (props.hint && (props.persistentHint || props.focused)) {
          return props.hint;
        } else {
          return props.messages;
        }
      });
      useRender(() => {
        const hasPrepend = !!(slots.prepend || props.prependIcon);
        const hasAppend = !!(slots.append || props.appendIcon);
        const hasMessages = messages.value.length > 0;
        const hasDetails = !props.hideDetails || props.hideDetails === 'auto' && (hasMessages || !!slots.details);
        return vue.createVNode("div", {
          "class": ['v-input', `v-input--${props.direction}`, densityClasses.value, validationClasses.value, props.class],
          "style": props.style
        }, [hasPrepend && vue.createVNode("div", {
          "key": "prepend",
          "class": "v-input__prepend"
        }, [slots.prepend?.(slotProps.value), props.prependIcon && vue.createVNode(InputIcon, {
          "key": "prepend-icon",
          "name": "prepend"
        }, null)]), slots.default && vue.createVNode("div", {
          "class": "v-input__control"
        }, [slots.default?.(slotProps.value)]), hasAppend && vue.createVNode("div", {
          "key": "append",
          "class": "v-input__append"
        }, [props.appendIcon && vue.createVNode(InputIcon, {
          "key": "append-icon",
          "name": "append"
        }, null), slots.append?.(slotProps.value)]), hasDetails && vue.createVNode("div", {
          "class": "v-input__details"
        }, [vue.createVNode(VMessages, {
          "id": messagesId.value,
          "active": hasMessages,
          "messages": messages.value
        }, {
          message: slots.message
        }), slots.details?.(slotProps.value)])]);
      });
      return {
        reset,
        resetValidation,
        validate
      };
    }
  });

  const VCounter = genericComponent()({
    name: 'VCounter',
    functional: true,
    props: {
      active: Boolean,
      max: [Number, String],
      value: {
        type: [Number, String],
        default: 0
      },
      ...makeComponentProps(),
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
          "class": ['v-counter', props.class],
          "style": props.style
        }, [slots.default ? slots.default({
          counter: counter.value,
          max: props.max,
          value: props.value
        }) : counter.value]), [[vue.vShow, props.active]])]
      }));
      return {};
    }
  });

  const Refs = Symbol('Forwarded refs');

  /** Omit properties starting with P */

  function getDescriptor(obj, key) {
    let currentObj = obj;
    while (currentObj) {
      const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key);
      if (descriptor) return descriptor;
      currentObj = Object.getPrototypeOf(currentObj);
    }
    return undefined;
  }
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

        // Skip internal properties
        if (typeof key === 'symbol' || key.startsWith('__')) return;
        for (const ref of refs) {
          if (ref.value && Reflect.has(ref.value, key)) {
            const val = Reflect.get(ref.value, key);
            return typeof val === 'function' ? val.bind(ref.value) : val;
          }
        }
      },
      has(target, key) {
        if (Reflect.has(target, key)) {
          return true;
        }

        // Skip internal properties
        if (typeof key === 'symbol' || key.startsWith('__')) return false;
        for (const ref of refs) {
          if (ref.value && Reflect.has(ref.value, key)) {
            return true;
          }
        }
        return false;
      },
      getOwnPropertyDescriptor(target, key) {
        const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
        if (descriptor) return descriptor;

        // Skip internal properties
        if (typeof key === 'symbol' || key.startsWith('__')) return;

        // Check each ref's own properties
        for (const ref of refs) {
          if (!ref.value) continue;
          const descriptor = getDescriptor(ref.value, key) ?? ('_' in ref.value ? getDescriptor(ref.value._?.setupState, key) : undefined);
          if (descriptor) return descriptor;
        }

        // Recursive search up each ref's prototype
        for (const ref of refs) {
          const childRefs = ref.value && ref.value[Refs];
          if (!childRefs) continue;
          const queue = childRefs.slice();
          while (queue.length) {
            const ref = queue.shift();
            const descriptor = getDescriptor(ref.value, key);
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
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text'
    },
    modelModifiers: Object,
    ...makeVInputProps(),
    ...makeVFieldProps()
  }, 'v-text-field');
  const VTextField = genericComponent()({
    name: 'VTextField',
    directives: {
      Intersect
    },
    inheritAttrs: false,
    props: makeVTextFieldProps(),
    emits: {
      'click:control': e => true,
      'mousedown:control': e => true,
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
        if (!props.autofocus || !isIntersecting) return;
        entries[0].target?.focus?.();
      }
      const vInputRef = vue.ref();
      const vFieldRef = vue.ref();
      const inputRef = vue.ref();
      const isActive = vue.computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active);
      function onFocus() {
        if (inputRef.value !== document.activeElement) {
          inputRef.value?.focus();
        }
        if (!isFocused.value) focus();
      }
      function onControlMousedown(e) {
        emit('mousedown:control', e);
        if (e.target === inputRef.value) return;
        onFocus();
        e.preventDefault();
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
        const el = e.target;
        model.value = el.value;
        if (props.modelModifiers?.trim && ['text', 'search', 'password', 'tel', 'url'].includes(props.type)) {
          const caretPosition = [el.selectionStart, el.selectionEnd];
          vue.nextTick(() => {
            el.selectionStart = caretPosition[0];
            el.selectionEnd = caretPosition[1];
          });
        }
      }
      useRender(() => {
        const hasCounter = !!(slots.counter || props.counter || props.counterValue);
        const hasDetails = !!(hasCounter || slots.details);
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [{
          modelValue: _,
          ...inputProps
        }] = VInput.filterProps(props);
        const [fieldProps] = filterFieldProps(props);
        return vue.createVNode(VInput, vue.mergeProps({
          "ref": vInputRef,
          "modelValue": model.value,
          "onUpdate:modelValue": $event => model.value = $event,
          "class": ['v-text-field', {
            'v-text-field--prefixed': props.prefix,
            'v-text-field--suffixed': props.suffix,
            'v-text-field--flush-details': ['plain', 'underlined'].includes(props.variant)
          }, props.class],
          "style": props.style
        }, rootAttrs, inputProps, {
          "focused": isFocused.value
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
              "onMousedown": onControlMousedown,
              "onClick": onControlClick,
              "onClick:clear": onClear,
              "onClick:prependInner": props['onClick:prependInner'],
              "onClick:appendInner": props['onClick:appendInner'],
              "role": "textbox"
            }, fieldProps, {
              "id": id.value,
              "active": isActive.value || isDirty.value,
              "dirty": isDirty.value || props.dirty,
              "disabled": isDisabled.value,
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
                  "data-no-activator": ""
                }, [slots.default(), inputNode]) : vue.cloneVNode(inputNode, {
                  class: fieldClass
                }), props.suffix && vue.createVNode("span", {
                  "class": "v-text-field__suffix"
                }, [props.suffix])]);
              }
            });
          },
          details: hasDetails ? slotProps => vue.createVNode(vue.Fragment, null, [slots.details?.(slotProps), hasCounter && vue.createVNode(vue.Fragment, null, [vue.createVNode("span", null, null), vue.createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value
          }, slots.counter)])]) : undefined
        });
      });
      return forwardRefs({}, vInputRef, vFieldRef, inputRef);
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
  const VSelectionControlGroup = genericComponent()({
    name: 'VSelectionControlGroup',
    props: {
      defaultsTarget: {
        type: String,
        default: 'VSelectionControl'
      },
      ...makeComponentProps(),
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
      useRender(() => vue.createVNode("div", {
        "class": ['v-selection-control-group', {
          'v-selection-control-group--inline': props.inline
        }, props.class],
        "style": props.style,
        "role": props.type === 'radio' ? 'radiogroup' : undefined
      }, [slots.default?.()]));
      return {};
    }
  });

  // Types

  const makeSelectionControlProps = propsFactory({
    label: String,
    trueValue: null,
    falseValue: null,
    value: null,
    ...makeComponentProps(),
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
      group?.onForceUpdate(() => {
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
          }, densityClasses.value, props.class]
        }, rootAttrs, {
          "style": props.style
        }), [vue.createVNode("div", {
          "class": ['v-selection-control__wrapper', textColorClasses.value],
          "style": textColorStyles.value
        }, [slots.default?.(), vue.withDirectives(vue.createVNode("div", {
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
        }, inputAttrs), null), slots.input?.({
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
  const VCheckboxBtn = genericComponent()({
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
        "class": ['v-checkbox-btn', props.class],
        "style": props.style,
        "type": "checkbox",
        "falseIcon": falseIcon.value,
        "trueIcon": trueIcon.value,
        "aria-checked": props.indeterminate ? 'mixed' : undefined
      }), slots));
      return {};
    }
  });

  // Types

  const VCheckbox = genericComponent()({
    name: 'VCheckbox',
    inheritAttrs: false,
    props: {
      ...makeVInputProps(),
      ...omit(makeVCheckboxBtnProps(), ['inline'])
    },
    emits: {
      'update:focused': focused => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const uid = getUid();
      const id = vue.computed(() => props.id || `checkbox-${uid}`);
      useRender(() => {
        const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
        const [inputProps, _1] = VInput.filterProps(props);
        const [checkboxProps, _2] = VCheckboxBtn.filterProps(props);
        return vue.createVNode(VInput, vue.mergeProps({
          "class": ['v-checkbox', props.class]
        }, inputAttrs, inputProps, {
          "id": id.value,
          "focused": isFocused.value,
          "style": props.style
        }), {
          ...slots,
          default: _ref2 => {
            let {
              id,
              messagesId,
              isDisabled,
              isReadonly
            } = _ref2;
            return vue.createVNode(VCheckboxBtn, vue.mergeProps(checkboxProps, {
              "id": id.value,
              "aria-describedby": messagesId.value,
              "disabled": isDisabled.value,
              "readonly": isReadonly.value
            }, controlAttrs, {
              "onFocus": focus,
              "onBlur": blur
            }), slots);
          }
        });
      });
      return {};
    }
  });

  const makeVAvatarProps = propsFactory({
    start: Boolean,
    end: Boolean,
    icon: IconValue,
    image: String,
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'flat'
    })
  }, 'v-avatar');
  const VAvatar = genericComponent()({
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
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-avatar', {
          'v-avatar--start': props.start,
          'v-avatar--end': props.end
        }, themeClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, sizeStyles.value, props.style]
      }, {
        default: () => [props.image ? vue.createVNode(VImg, {
          "key": "image",
          "src": props.image,
          "alt": "",
          "cover": true
        }, null) : props.icon ? vue.createVNode(VIcon, {
          "key": "icon",
          "icon": props.icon
        }, null) : slots.default?.(), genOverlays(false, 'v-avatar')]
      }));
      return {};
    }
  });

  // Types

  const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group');
  const VChipGroup = genericComponent()({
    name: 'VChipGroup',
    props: {
      column: Boolean,
      filter: Boolean,
      valueComparator: {
        type: Function,
        default: deepEqual
      },
      ...makeComponentProps(),
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
          disabled: vue.toRef(props, 'disabled'),
          filter: vue.toRef(props, 'filter'),
          variant: vue.toRef(props, 'variant')
        }
      });
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-chip-group', {
          'v-chip-group--column': props.column
        }, themeClasses.value, props.class],
        "style": props.style
      }, {
        default: () => [slots.default?.({
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })]
      }));
      return {};
    }
  });

  const VChip = genericComponent()({
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
      link: {
        type: Boolean,
        default: undefined
      },
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
      onClick: EventProp(),
      onClickOnce: EventProp(),
      ...makeBorderProps(),
      ...makeComponentProps(),
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
        t
      } = useLocale();
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
      const isLink = vue.computed(() => props.link !== false && link.isLink.value);
      const isClickable = vue.computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
      const closeProps = vue.computed(() => ({
        'aria-label': t(props.closeLabel),
        onClick(e) {
          isActive.value = false;
          emit('click:close', e);
        }
      }));
      function onClick(e) {
        emit('click', e);
        if (!isClickable.value) return;
        link.navigate?.(e);
        group?.toggle();
      }
      function onKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      }
      return () => {
        const Tag = link.isLink.value ? 'a' : props.tag;
        const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
        const hasAppend = !!(hasAppendMedia || slots.append);
        const hasClose = !!(slots.close || props.closable);
        const hasFilter = !!(slots.filter || props.filter) && group;
        const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
        const hasPrepend = !!(hasPrependMedia || slots.prepend);
        const hasColor = !group || group.isSelected.value;
        return isActive.value && vue.withDirectives(vue.createVNode(Tag, {
          "class": ['v-chip', {
            'v-chip--disabled': props.disabled,
            'v-chip--label': props.label,
            'v-chip--link': isClickable.value,
            'v-chip--filter': hasFilter,
            'v-chip--pill': props.pill
          }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : undefined, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group?.selectedClass.value, props.class],
          "style": [hasColor ? colorStyles.value : undefined, props.style],
          "disabled": props.disabled || undefined,
          "draggable": props.draggable,
          "href": link.href.value,
          "tabindex": isClickable.value ? 0 : undefined,
          "onClick": onClick,
          "onKeydown": isClickable.value && !isLink.value && onKeyDown
        }, {
          default: () => [genOverlays(isClickable.value, 'v-chip'), hasFilter && vue.createVNode(VExpandXTransition, {
            "key": "filter"
          }, {
            default: () => [vue.withDirectives(vue.createVNode("div", {
              "class": "v-chip__filter"
            }, [!slots.filter ? vue.createVNode(VIcon, {
              "key": "filter-icon",
              "icon": props.filterIcon
            }, null) : vue.withDirectives(vue.createVNode(VDefaultsProvider, {
              "key": "filter-defaults",
              "disabled": !props.filterIcon,
              "defaults": {
                VIcon: {
                  icon: props.filterIcon
                }
              }
            }, null), [[vue.resolveDirective("slot"), slots.filter, "default"]])]), [[vue.vShow, group.isSelected.value]])]
          }), hasPrepend && vue.createVNode("div", {
            "key": "prepend",
            "class": "v-chip__prepend"
          }, [!slots.prepend ? vue.createVNode(vue.Fragment, null, [props.prependIcon && vue.createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon,
            "start": true
          }, null), props.prependAvatar && vue.createVNode(VAvatar, {
            "key": "prepend-avatar",
            "image": props.prependAvatar,
            "start": true
          }, null)]) : vue.createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                image: props.prependAvatar,
                start: true
              },
              VIcon: {
                icon: props.prependIcon,
                start: true
              }
            }
          }, slots.prepend)]), slots.default?.({
            isSelected: group?.isSelected.value,
            selectedClass: group?.selectedClass.value,
            select: group?.select,
            toggle: group?.toggle,
            value: group?.value.value,
            disabled: props.disabled
          }) ?? props.text, hasAppend && vue.createVNode("div", {
            "key": "append",
            "class": "v-chip__append"
          }, [!slots.append ? vue.createVNode(vue.Fragment, null, [props.appendIcon && vue.createVNode(VIcon, {
            "key": "append-icon",
            "end": true,
            "icon": props.appendIcon
          }, null), props.appendAvatar && vue.createVNode(VAvatar, {
            "key": "append-avatar",
            "end": true,
            "image": props.appendAvatar
          }, null)]) : vue.createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
            "defaults": {
              VAvatar: {
                end: true,
                image: props.appendAvatar
              },
              VIcon: {
                end: true,
                icon: props.appendIcon
              }
            }
          }, slots.append)]), hasClose && vue.createVNode("div", vue.mergeProps({
            "key": "close",
            "class": "v-chip__close"
          }, closeProps.value), [!slots.close ? vue.createVNode(VIcon, {
            "key": "close-icon",
            "icon": props.closeIcon,
            "size": "x-small"
          }, null) : vue.createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VIcon: {
                icon: props.closeIcon,
                size: 'x-small'
              }
            }
          }, slots.close)])]
        }), [[vue.resolveDirective("ripple"), isClickable.value && props.ripple, null]]);
      };
    }
  });

  const VDivider = genericComponent()({
    name: 'VDivider',
    props: {
      color: String,
      inset: Boolean,
      length: [Number, String],
      thickness: [Number, String],
      vertical: Boolean,
      ...makeComponentProps(),
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
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, 'color'));
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
        }, themeClasses.value, textColorClasses.value, props.class],
        "style": [dividerStyles.value, textColorStyles.value, props.style],
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
        id = vue.toRaw(id);

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
        id = vue.toRaw(id);
        const singleSelected = selected.has(id) ? new Map([[id, selected.get(id)]]) : new Map();
        return parentStrategy.select({
          ...rest,
          id,
          selected: singleSelected
        });
      },
      in: (v, children, parents) => {
        let map = new Map();
        if (v?.length) {
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
        id = vue.toRaw(id);
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
        id = vue.toRaw(id);
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
        id = vue.toRaw(id);
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
    const uidSymbol = Symbol(getUid());
    const computedId = vue.computed(() => id.value ?? uidSymbol);
    const item = {
      ...parent,
      id: computedId,
      open: (open, e) => parent.root.open(computedId.value, open, e),
      openOnSelect: (open, e) => parent.root.openOnSelect(computedId.value, open, e),
      isOpen: vue.computed(() => parent.root.opened.value.has(computedId.value)),
      parent: vue.computed(() => parent.root.parents.value.get(computedId.value)),
      select: (selected, e) => parent.root.select(computedId.value, selected, e),
      isSelected: vue.computed(() => parent.root.selected.value.get(vue.toRaw(computedId.value)) === 'on'),
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

  const VListGroupActivator = defineComponent({
    name: 'VListGroupActivator',
    setup(_, _ref) {
      let {
        slots
      } = _ref;
      useNestedGroupActivator();
      return () => slots.default?.();
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
    ...makeComponentProps(),
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
      const {
        isBooted
      } = useSsrBoot();
      function onClick(e) {
        open(!isOpen.value, e);
      }
      const activatorProps = vue.computed(() => ({
        onClick,
        class: 'v-list-group__header',
        id: id.value
      }));
      const toggleIcon = vue.computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
      const activatorDefaults = vue.computed(() => ({
        VListItem: {
          active: isOpen.value,
          activeColor: props.activeColor,
          color: props.color,
          prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
          appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
          title: props.title,
          value: props.value
        }
      }));
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-list-group', {
          'v-list-group--prepend': list?.hasPrepend.value,
          'v-list-group--fluid': props.fluid,
          'v-list-group--subgroup': props.subgroup,
          'v-list-group--open': isOpen.value
        }, props.class],
        "style": props.style
      }, {
        default: () => [slots.activator && vue.createVNode(VDefaultsProvider, {
          "defaults": activatorDefaults.value
        }, {
          default: () => [vue.createVNode(VListGroupActivator, null, {
            default: () => [slots.activator({
              props: activatorProps.value,
              isOpen: isOpen.value
            })]
          })]
        }), vue.createVNode(MaybeTransition, {
          "transition": {
            component: VExpandTransition
          },
          "disabled": !isBooted.value
        }, {
          default: () => [vue.withDirectives(vue.createVNode("div", {
            "class": "v-list-group__items",
            "role": "group",
            "aria-labelledby": id.value
          }, [slots.default?.()]), [[vue.vShow, isOpen.value]])]
        })]
      }));
      return {};
    }
  });

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
      ripple: {
        type: Boolean,
        default: true
      },
      subtitle: [String, Number, Boolean],
      title: [String, Number, Boolean],
      value: null,
      onClick: EventProp(),
      onClickOnce: EventProp(),
      ...makeBorderProps(),
      ...makeComponentProps(),
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
      const isActive = vue.computed(() => props.active !== false && (props.active || link.isActive?.value || isSelected.value));
      const isLink = vue.computed(() => props.link !== false && link.isLink.value);
      const isClickable = vue.computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || props.value != null && !!list));
      const roundedProps = vue.computed(() => props.rounded || props.nav);
      const variantProps = vue.computed(() => ({
        color: isActive.value ? props.activeColor ?? props.color : props.color,
        variant: props.variant
      }));
      vue.watch(() => link.isActive?.value, val => {
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
        emit('click', e);
        if (isGroupActivator || !isClickable.value) return;
        link.navigate?.(e);
        props.value != null && select(!isSelected.value, e);
      }
      function onKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      }
      useRender(() => {
        const Tag = isLink.value ? 'a' : props.tag;
        const hasColor = !list || isSelected.value || isActive.value;
        const hasTitle = slots.title || props.title;
        const hasSubtitle = slots.subtitle || props.subtitle;
        const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
        const hasAppend = !!(hasAppendMedia || slots.append);
        const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
        const hasPrepend = !!(hasPrependMedia || slots.prepend);
        list?.updateHasPrepend(hasPrepend);
        return vue.withDirectives(vue.createVNode(Tag, {
          "class": ['v-list-item', {
            'v-list-item--active': isActive.value,
            'v-list-item--disabled': props.disabled,
            'v-list-item--link': isClickable.value,
            'v-list-item--nav': props.nav,
            'v-list-item--prepend': !hasPrepend && list?.hasPrepend.value,
            [`${props.activeClass}`]: props.activeClass && isActive.value
          }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : undefined, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value, props.class],
          "style": [hasColor ? colorStyles.value : undefined, dimensionStyles.value, props.style],
          "href": link.href.value,
          "tabindex": isClickable.value ? 0 : undefined,
          "onClick": onClick,
          "onKeydown": isClickable.value && !isLink.value && onKeyDown
        }, {
          default: () => [genOverlays(isClickable.value || isActive.value, 'v-list-item'), hasPrepend && vue.createVNode("div", {
            "key": "prepend",
            "class": "v-list-item__prepend"
          }, [!slots.prepend ? vue.createVNode(vue.Fragment, null, [props.prependAvatar && vue.createVNode(VAvatar, {
            "key": "prepend-avatar",
            "density": props.density,
            "image": props.prependAvatar
          }, null), props.prependIcon && vue.createVNode(VIcon, {
            "key": "prepend-icon",
            "density": props.density,
            "icon": props.prependIcon
          }, null)]) : vue.createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
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
            default: () => [slots.prepend?.(slotProps.value)]
          })]), vue.createVNode("div", {
            "class": "v-list-item__content",
            "data-no-activator": ""
          }, [hasTitle && vue.createVNode(VListItemTitle, {
            "key": "title"
          }, {
            default: () => [slots.title?.({
              title: props.title
            }) ?? props.title]
          }), hasSubtitle && vue.createVNode(VListItemSubtitle, {
            "key": "subtitle"
          }, {
            default: () => [slots.subtitle?.({
              subtitle: props.subtitle
            }) ?? props.subtitle]
          }), slots.default?.(slotProps.value)]), hasAppend && vue.createVNode("div", {
            "key": "append",
            "class": "v-list-item__append"
          }, [!slots.append ? vue.createVNode(vue.Fragment, null, [props.appendIcon && vue.createVNode(VIcon, {
            "key": "append-icon",
            "density": props.density,
            "icon": props.appendIcon
          }, null), props.appendAvatar && vue.createVNode(VAvatar, {
            "key": "append-avatar",
            "density": props.density,
            "image": props.appendAvatar
          }, null)]) : vue.createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
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
            default: () => [slots.append?.(slotProps.value)]
          })])]
        }), [[vue.resolveDirective("ripple"), isClickable.value && props.ripple]]);
      });
      return {};
    }
  });

  const VListSubheader = genericComponent()({
    name: 'VListSubheader',
    props: {
      color: String,
      inset: Boolean,
      sticky: Boolean,
      title: String,
      ...makeComponentProps(),
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
        const hasText = !!(slots.default || props.title);
        return vue.createVNode(props.tag, {
          "class": ['v-list-subheader', {
            'v-list-subheader--inset': props.inset,
            'v-list-subheader--sticky': props.sticky
          }, textColorClasses.value, props.class],
          "style": [{
            textColorStyles
          }, props.style]
        }, {
          default: () => [hasText && vue.createVNode("div", {
            "class": "v-list-subheader__text"
          }, [slots.default?.() ?? props.title])]
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
      return () => slots.default?.() ?? props.items?.map(_ref2 => {
        let {
          children,
          props: itemProps,
          type,
          raw: item
        } = _ref2;
        if (type === 'divider') {
          return slots.divider?.({
            props: itemProps
          }) ?? vue.createVNode(VDivider, itemProps, null);
        }
        if (type === 'subheader') {
          return slots.subheader?.({
            props: itemProps
          }) ?? vue.createVNode(VListSubheader, itemProps, {
            default: slots.subheader
          });
        }
        const slotsWithItem = {
          subtitle: slots.subtitle ? slotProps => slots.subtitle?.({
            ...slotProps,
            item
          }) : undefined,
          prepend: slots.prepend ? slotProps => slots.prepend?.({
            ...slotProps,
            item
          }) : undefined,
          append: slots.append ? slotProps => slots.append?.({
            ...slotProps,
            item
          }) : undefined,
          default: slots.default ? slotProps => slots.default?.({
            ...slotProps,
            item
          }) : undefined,
          title: slots.title ? slotProps => slots.title?.({
            ...slotProps,
            item
          }) : undefined
        };
        const [listGroupProps, _1] = VListGroup.filterProps(itemProps);
        return children ? vue.createVNode(VListGroup, vue.mergeProps({
          "value": itemProps?.value
        }, listGroupProps), {
          activator: _ref3 => {
            let {
              props: activatorProps
            } = _ref3;
            return slots.header ? slots.header({
              props: {
                ...itemProps,
                ...activatorProps
              }
            }) : vue.createVNode(VListItem, vue.mergeProps(itemProps, activatorProps), slotsWithItem);
          },
          default: () => vue.createVNode(VListChildren, {
            "items": children
          }, slots)
        }) : slots.item ? slots.item(itemProps) : vue.createVNode(VListItem, itemProps, slotsWithItem);
      });
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
      return value.map(v => {
        const existingItem = items.value.find(item => deepEqual(v, item.value));
        // Nullish existingItem means value is a custom input value from combobox
        // In this case, use transformItem to create an InternalItem based on value
        return existingItem ?? transformItem$1(props, v);
      });
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

  function isPrimitive(value) {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
  }
  function transformItem(props, item) {
    const type = getPropertyFromItem(item, props.itemType, 'item');
    const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle);
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
      ...makeComponentProps(),
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
        if (!isFocused.value && !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget))) focus();
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
        if (contentRef.value) {
          return focusChild(contentRef.value, location);
        }
      }
      useRender(() => {
        return vue.createVNode(props.tag, {
          "ref": contentRef,
          "class": ['v-list', {
            'v-list--disabled': props.disabled,
            'v-list--nav': props.nav
          }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, props.class],
          "style": [backgroundColorStyles.value, dimensionStyles.value, props.style],
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

  const VListImg = createSimpleFunctional('v-list-img');

  const VListItemAction = genericComponent()({
    name: 'VListItemAction',
    props: {
      start: Boolean,
      end: Boolean,
      ...makeComponentProps(),
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-list-item-action', {
          'v-list-item-action--start': props.start,
          'v-list-item-action--end': props.end
        }, props.class],
        "style": props.style
      }, slots));
      return {};
    }
  });

  const VListItemMedia = genericComponent()({
    name: 'VListItemMedia',
    props: {
      start: Boolean,
      end: Boolean,
      ...makeComponentProps(),
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => {
        return vue.createVNode(props.tag, {
          "class": ['v-list-item-media', {
            'v-list-item-media--start': props.start,
            'v-list-item-media--end': props.end
          }, props.class],
          "style": props.style
        }, slots);
      });
      return {};
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
          cb?.(active);
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
        if (e.sourceCapabilities?.firesTouchEvents) return;
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
          menu?.closeParents();
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
      scope?.stop();
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
      let selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.activator;
      let activator;
      if (selector) {
        if (selector === 'parent') {
          let el = vm?.proxy?.$el?.parentNode;
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
      activatorEl.value = activator?.nodeType === Node.ELEMENT_NODE ? activator : null;
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
  function getOffset$1(a, b) {
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
    if (IN_BROWSER) {
      useToggleScope(() => !!(data.isActive.value && props.locationStrategy), reset => {
        vue.watch(() => props.locationStrategy, reset);
        vue.onScopeDispose(() => {
          updateLocation.value = undefined;
        });
        if (typeof props.locationStrategy === 'function') {
          updateLocation.value = props.locationStrategy(data, props, contentStyles)?.updateLocation;
        } else {
          updateLocation.value = locationStrategies[props.locationStrategy](data, props, contentStyles)?.updateLocation;
        }
      });
      window.addEventListener('resize', onResize, {
        passive: true
      });
      vue.onScopeDispose(() => {
        window.removeEventListener('resize', onResize);
        updateLocation.value = undefined;
      });
    }
    function onResize(e) {
      updateLocation.value?.(e);
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
  function getIntrinsicSize(el, isRtl) {
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
    if (isRtl) {
      contentBox.x += parseFloat(el.style.right || 0);
    } else {
      contentBox.x -= parseFloat(el.style.left || 0);
    }
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
      const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value);
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
        } = getOffset$1(targetPoint, contentPoint);
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
        left: data.isRtl.value ? undefined : convertToUnit(pixelRound(x)),
        right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : undefined,
        minWidth: convertToUnit(axis === 'y' ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
        maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
        maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
      });
      return {
        available,
        contentBox
      };
    }
    vue.watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation());
    vue.nextTick(() => {
      const result = updateLocation();

      // TODO: overflowing content should only require a single updateLocation call
      // Icky hack to make sure the content is positioned consistently
      if (!result) return;
      const {
        available,
        contentBox
      } = result;
      if (contentBox.height > available.y) {
        requestAnimationFrame(() => {
          updateLocation();
          requestAnimationFrame(() => {
            updateLocation();
          });
        });
      }
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
      scope?.stop();
      if (!(data.isActive.value && props.scrollStrategy)) return;
      scope = vue.effectScope();
      await vue.nextTick();
      scope.active && scope.run(() => {
        if (typeof props.scrollStrategy === 'function') {
          props.scrollStrategy(data, props, scope);
        } else {
          scrollStrategies[props.scrollStrategy]?.(data, props, scope);
        }
      });
    });
    vue.onScopeDispose(() => {
      scope?.stop();
    });
  }
  function closeScrollStrategy(data) {
    function onScroll(e) {
      data.isActive.value = false;
    }
    bindScroll(data.activatorEl.value ?? data.contentEl.value, onScroll);
  }
  function blockScrollStrategy(data, props) {
    const offsetParent = data.root.value?.offsetParent;
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
  function repositionScrollStrategy(data, props, scope) {
    let slow = false;
    let raf = -1;
    let ric = -1;
    function update(e) {
      requestNewFrame(() => {
        const start = performance.now();
        data.updateLocation.value?.(e);
        const time = performance.now() - start;
        slow = time / (1000 / 60) > 2;
      });
    }
    ric = (typeof requestIdleCallback === 'undefined' ? cb => cb() : requestIdleCallback)(() => {
      scope.run(() => {
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
      });
    });
    vue.onScopeDispose(() => {
      typeof cancelIdleCallback !== 'undefined' && cancelIdleCallback(ric);
      cancelAnimationFrame(raf);
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

  const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl']; // no xs

  const DisplaySymbol = Symbol.for('vuetify:display');
  const defaultDisplayOptions = {
    mobileBreakpoint: 'lg',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2560
    }
  };
  const parseDisplayOptions = function () {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultDisplayOptions;
    return mergeDeep(defaultDisplayOptions, options);
  };
  function getClientWidth(isHydrate) {
    return IN_BROWSER && !isHydrate ? window.innerWidth : 0;
  }
  function getClientHeight(isHydrate) {
    return IN_BROWSER && !isHydrate ? window.innerHeight : 0;
  }
  function getPlatform(isHydrate) {
    const userAgent = IN_BROWSER && !isHydrate ? window.navigator.userAgent : 'ssr';
    function match(regexp) {
      return Boolean(userAgent.match(regexp));
    }
    const android = match(/android/i);
    const ios = match(/iphone|ipad|ipod/i);
    const cordova = match(/cordova/i);
    const electron = match(/electron/i);
    const chrome = match(/chrome/i);
    const edge = match(/edge/i);
    const firefox = match(/firefox/i);
    const opera = match(/opera/i);
    const win = match(/win/i);
    const mac = match(/mac/i);
    const linux = match(/linux/i);
    return {
      android,
      ios,
      cordova,
      electron,
      chrome,
      edge,
      firefox,
      opera,
      win,
      mac,
      linux,
      touch: SUPPORTS_TOUCH,
      ssr: userAgent === 'ssr'
    };
  }
  function createDisplay(options, ssr) {
    const {
      thresholds,
      mobileBreakpoint
    } = parseDisplayOptions(options);
    const height = vue.ref(getClientHeight(ssr));
    const platform = vue.shallowRef(getPlatform(ssr));
    const state = vue.reactive({});
    const width = vue.ref(getClientWidth(ssr));
    function updateSize() {
      height.value = getClientHeight();
      width.value = getClientWidth();
    }
    function update() {
      updateSize();
      platform.value = getPlatform();
    }

    // eslint-disable-next-line max-statements
    vue.watchEffect(() => {
      const xs = width.value < thresholds.sm;
      const sm = width.value < thresholds.md && !xs;
      const md = width.value < thresholds.lg && !(sm || xs);
      const lg = width.value < thresholds.xl && !(md || sm || xs);
      const xl = width.value < thresholds.xxl && !(lg || md || sm || xs);
      const xxl = width.value >= thresholds.xxl;
      const name = xs ? 'xs' : sm ? 'sm' : md ? 'md' : lg ? 'lg' : xl ? 'xl' : 'xxl';
      const breakpointValue = typeof mobileBreakpoint === 'number' ? mobileBreakpoint : thresholds[mobileBreakpoint];
      const mobile = width.value < breakpointValue;
      state.xs = xs;
      state.sm = sm;
      state.md = md;
      state.lg = lg;
      state.xl = xl;
      state.xxl = xxl;
      state.smAndUp = !xs;
      state.mdAndUp = !(xs || sm);
      state.lgAndUp = !(xs || sm || md);
      state.xlAndUp = !(xs || sm || md || lg);
      state.smAndDown = !(md || lg || xl || xxl);
      state.mdAndDown = !(lg || xl || xxl);
      state.lgAndDown = !(xl || xxl);
      state.xlAndDown = !xxl;
      state.name = name;
      state.height = height.value;
      state.width = width.value;
      state.mobile = mobile;
      state.mobileBreakpoint = mobileBreakpoint;
      state.platform = platform.value;
      state.thresholds = thresholds;
    });
    if (IN_BROWSER) {
      window.addEventListener('resize', updateSize, {
        passive: true
      });
    }
    return {
      ...vue.toRefs(state),
      update,
      ssr: !!ssr
    };
  }
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
      const lastZIndex = globalStack.at(-1)?.[1];
      _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value;
      if (createStackEntry) {
        globalStack.push([vm.uid, _zIndex.value]);
      }
      parent?.activeChildren.add(vm.uid);
      vue.onScopeDispose(() => {
        if (createStackEntry) {
          const idx = vue.toRaw(globalStack).findIndex(v => v[0] === vm.uid);
          globalStack.splice(idx, 1);
        }
        parent?.activeChildren.delete(vm.uid);
      });
    });
    const globalTop = vue.ref(true);
    if (createStackEntry) {
      vue.watchEffect(() => {
        const _isTop = globalStack.at(-1)?.[0] === vm.uid;
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
      let container = targetElement.querySelector(':scope > .v-overlay-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'v-overlay-container';
        targetElement.appendChild(container);
      }
      return container;
    });
    return {
      teleportTarget
    };
  }

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
    return !elements.some(el => el?.contains(e.target));
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
        if (!app || !el._clickOutside?.[binding.instance.$.uid]) return;
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
    ...makeComponentProps(),
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
      useRender(() => vue.createVNode(vue.Fragment, null, [slots.activator?.({
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
          }, themeClasses.value, rtlClasses.value, props.class],
          "style": [stackStyles.value, {
            top: convertToUnit(top.value)
          }, props.style],
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
          }, vue.toHandlers(contentEvents.value), props.contentProps), [slots.default?.({
            isActive
          })]), [[vue.vShow, isActive.value], [vue.resolveDirective("click-outside"), {
            handler: onClickOutside,
            closeConditional,
            include: () => [activatorEl.value]
          }]])]
        })])]
      })]));
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
      const openChildren = vue.ref(0);
      vue.provide(VMenuSymbol, {
        register() {
          ++openChildren.value;
        },
        unregister() {
          --openChildren.value;
        },
        closeParents() {
          setTimeout(() => {
            if (!openChildren.value) {
              isActive.value = false;
              parent?.closeParents();
            }
          }, 40);
        }
      });
      vue.watch(isActive, val => {
        val ? parent?.register() : parent?.unregister();
      });
      function onClickOutside() {
        parent?.closeParents();
      }
      const activatorProps = vue.computed(() => vue.mergeProps({
        'aria-haspopup': 'menu',
        'aria-expanded': String(isActive.value),
        'aria-owns': id.value
      }, props.activatorProps));
      useRender(() => {
        const [overlayProps] = VOverlay.filterProps(props);
        return vue.createVNode(VOverlay, vue.mergeProps({
          "ref": overlay,
          "class": ['v-menu', props.class],
          "style": props.style
        }, overlayProps, {
          "modelValue": isActive.value,
          "onUpdate:modelValue": $event => isActive.value = $event,
          "absolute": true,
          "activatorProps": activatorProps.value,
          "onClick:outside": onClickOutside
        }, scopeId), {
          activator: slots.activator,
          default: function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return vue.createVNode(VDefaultsProvider, {
              "root": true
            }, {
              default: () => [slots.default?.(...args)]
            });
          }
        });
      });
      return forwardRefs({
        id,
        ΨopenChildren: openChildren
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
      'update:focused': focused => true,
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
      const vMenuRef = vue.ref();
      const _menu = useProxiedModel(props, 'menu');
      const menu = vue.computed({
        get: () => _menu.value,
        set: v => {
          if (_menu.value && !v && vMenuRef.value?.ΨopenChildren) return;
          _menu.value = v;
        }
      });
      const {
        items,
        transformIn,
        transformOut
      } = useItems(props);
      const model = useProxiedModel(props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const form = useForm();
      const selections = vue.computed(() => {
        return model.value.map(v => {
          return items.value.find(item => props.valueComparator(item.value, v.value)) || v;
        });
      });
      const selected = vue.computed(() => selections.value.map(selection => selection.props.value));
      const isFocused = vue.ref(false);
      let keyboardLookupPrefix = '';
      let keyboardLookupLastTime;
      const displayItems = vue.computed(() => {
        if (props.hideSelected) {
          return items.value.filter(item => !selections.value.some(s => s === item));
        }
        return items.value;
      });
      const listRef = vue.ref();
      function onClear(e) {
        if (props.openOnClear) {
          menu.value = true;
        }
      }
      function onMousedownControl() {
        if (props.hideNoData && !items.value.length || props.readonly || form?.isReadonly.value) return;
        menu.value = !menu.value;
      }
      function onKeydown(e) {
        if (props.readonly || form?.isReadonly.value) return;
        if (['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
          e.preventDefault();
        }
        if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
          menu.value = true;
        }
        if (['Escape', 'Tab'].includes(e.key)) {
          menu.value = false;
        }
        if (e.key === 'ArrowDown') {
          listRef.value?.focus('next');
        } else if (e.key === 'ArrowUp') {
          listRef.value?.focus('prev');
        } else if (e.key === 'Home') {
          listRef.value?.focus('first');
        } else if (e.key === 'End') {
          listRef.value?.focus('last');
        }

        // html select hotkeys
        const KEYBOARD_LOOKUP_THRESHOLD = 1000; // milliseconds

        function checkPrintable(e) {
          const isPrintableChar = e.key.length === 1;
          const noModifier = !e.ctrlKey && !e.metaKey && !e.altKey;
          return isPrintableChar && noModifier;
        }
        if (props.multiple || !checkPrintable(e)) return;
        const now = performance.now();
        if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
          keyboardLookupPrefix = '';
        }
        keyboardLookupPrefix += e.key.toLowerCase();
        keyboardLookupLastTime = now;
        const item = items.value.find(item => item.title.toLowerCase().startsWith(keyboardLookupPrefix));
        if (item !== undefined) {
          model.value = [item];
        }
      }
      function select(item) {
        if (props.multiple) {
          const index = selected.value.findIndex(selection => props.valueComparator(selection, item.value));
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
        if (!listRef.value?.$el.contains(e.relatedTarget)) {
          menu.value = false;
        }
      }
      function onFocusin(e) {
        isFocused.value = true;
      }
      function onFocusout(e) {
        if (e.relatedTarget == null) {
          vTextFieldRef.value?.focus();
        }
      }
      useRender(() => {
        const hasChips = !!(props.chips || slots.chip);
        const hasList = !!(!props.hideNoData || displayItems.value.length || slots.prepend || slots.append || slots['no-data']);
        const isDirty = model.value.length > 0;
        const [textFieldProps] = VTextField.filterProps(props);
        const placeholder = isDirty || !isFocused.value && props.label && !props.persistentPlaceholder ? undefined : props.placeholder;
        return vue.createVNode(VTextField, vue.mergeProps({
          "ref": vTextFieldRef
        }, textFieldProps, {
          "modelValue": model.value.map(v => v.props.value).join(', '),
          "onUpdate:modelValue": v => {
            if (v == null) model.value = [];
          },
          "focused": isFocused.value,
          "onUpdate:focused": $event => isFocused.value = $event,
          "validationValue": model.externalValue,
          "dirty": isDirty,
          "class": ['v-select', {
            'v-select--active-menu': menu.value,
            'v-select--chips': !!props.chips,
            [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true,
            'v-select--selected': model.value.length
          }, props.class],
          "style": props.style,
          "appendInnerIcon": props.menuIcon,
          "readonly": true,
          "placeholder": placeholder,
          "onClick:clear": onClear,
          "onMousedown:control": onMousedownControl,
          "onBlur": onBlur,
          "onKeydown": onKeydown
        }), {
          ...slots,
          default: () => vue.createVNode(vue.Fragment, null, [vue.createVNode(VMenu, vue.mergeProps({
            "ref": vMenuRef,
            "modelValue": menu.value,
            "onUpdate:modelValue": $event => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-select__content",
            "eager": props.eager,
            "maxHeight": 310,
            "openOnClick": false,
            "closeOnContentClick": false,
            "transition": props.transition
          }, props.menuProps), {
            default: () => [hasList && vue.createVNode(VList, {
              "ref": listRef,
              "selected": selected.value,
              "selectStrategy": props.multiple ? 'independent' : 'single-independent',
              "onMousedown": e => e.preventDefault(),
              "onFocusin": onFocusin,
              "onFocusout": onFocusout
            }, {
              default: () => [!displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? vue.createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), slots['prepend-item']?.(), displayItems.value.map((item, index) => {
                if (slots.item) {
                  return slots.item?.({
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
                    return vue.createVNode(vue.Fragment, null, [props.multiple && !props.hideSelected ? vue.createVNode(VCheckboxBtn, {
                      "modelValue": isSelected,
                      "ripple": false,
                      "tabindex": "-1"
                    }, null) : undefined, item.props.prependIcon && vue.createVNode(VIcon, {
                      "icon": item.props.prependIcon
                    }, null)]);
                  }
                });
              }), slots['append-item']?.()]
            })]
          }), selections.value.map((item, index) => {
            function onChipClose(e) {
              e.stopPropagation();
              e.preventDefault();
              select(item);
            }
            const slotProps = {
              'onClick:close': onChipClose,
              onMousedown(e) {
                e.preventDefault();
                e.stopPropagation();
              },
              modelValue: true,
              'onUpdate:modelValue': undefined
            };
            return vue.createVNode("div", {
              "key": item.value,
              "class": "v-select__selection"
            }, [hasChips ? !slots.chip ? vue.createVNode(VChip, vue.mergeProps({
              "key": "chip",
              "closable": props.closableChips,
              "size": "small",
              "text": item.title
            }, slotProps), null) : vue.createVNode(VDefaultsProvider, {
              "key": "chip-defaults",
              "defaults": {
                VChip: {
                  closable: props.closableChips,
                  size: 'small',
                  text: item.title
                }
              }
            }, {
              default: () => [slots.chip?.({
                item,
                index,
                props: slotProps
              })]
            }) : slots.selection?.({
              item,
              index
            }) ?? vue.createVNode("span", {
              "class": "v-select__selection-text"
            }, [item.title, props.multiple && index < selections.value.length - 1 && vue.createVNode("span", {
              "class": "v-select__selection-comma"
            }, [vue.createTextVNode(",")])])]);
          })])
        });
      });
      return forwardRefs({
        isFocused,
        menu,
        select
      }, vTextFieldRef);
    }
  });

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
    const filter = options?.default ?? defaultFilter;
    const keys = options?.filterKeys ? wrapInArray(options.filterKeys) : false;
    const customFiltersLength = Object.keys(options?.customKeyFilter ?? {}).length;
    if (!items?.length) return array;
    loop: for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const customMatches = {};
      const defaultMatches = {};
      let match = -1;
      if (query && !options?.noFilter) {
        if (typeof item === 'object') {
          const filterKeys = keys || Object.keys(item);
          for (const key of filterKeys) {
            const value = getPropertyFromItem(item, key, item);
            const keyFilter = options?.customKeyFilter?.[key];
            match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
            if (match !== -1 && match !== false) {
              if (keyFilter) customMatches[key] = match;else defaultMatches[key] = match;
            } else if (options?.filterMode === 'every') {
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
        if (options?.filterMode === 'union' && customMatchesLength !== customFiltersLength && !defaultMatchesLength) continue;
        if (options?.filterMode === 'intersection' && (customMatchesLength !== customFiltersLength || !defaultMatchesLength)) continue;
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
  function useFilter(props, items, query, options) {
    const strQuery = vue.computed(() => typeof query?.value !== 'string' && typeof query?.value !== 'number' ? '' : String(query.value));
    const filteredItems = vue.ref([]);
    const filteredMatches = vue.ref(new Map());
    vue.watchEffect(() => {
      filteredItems.value = [];
      filteredMatches.value = new Map();
      const transformedItems = vue.unref(items);
      const results = filterItems(transformedItems, strQuery.value, {
        customKeyFilter: props.customKeyFilter,
        default: props.customFilter,
        filterKeys: vue.unref(options?.filterKeys) ?? props.filterKeys,
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

  function highlightResult$1(text, matches, length) {
    if (matches == null) return text;
    if (Array.isArray(matches)) throw new Error('Multiple matches is not implemented');
    return typeof matches === 'number' && ~matches ? vue.createVNode(vue.Fragment, null, [vue.createVNode("span", {
      "class": "v-autocomplete__unmask"
    }, [text.substr(0, matches)]), vue.createVNode("span", {
      "class": "v-autocomplete__mask"
    }, [text.substr(matches, length)]), vue.createVNode("span", {
      "class": "v-autocomplete__unmask"
    }, [text.substr(matches + length)])]) : text;
  }
  const VAutocomplete = genericComponent()({
    name: 'VAutocomplete',
    props: {
      // TODO: implement post keyboard support
      // autoSelectFirst: Boolean,
      search: String,
      ...makeFilterProps({
        filterKeys: ['title']
      }),
      ...makeSelectProps(),
      ...omit(makeVTextFieldProps({
        modelValue: null
      }), ['validationValue', 'dirty', 'appendInnerIcon']),
      ...makeTransitionProps({
        transition: false
      })
    },
    emits: {
      'update:focused': focused => true,
      'update:search': val => true,
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
      const isFocused = vue.ref(false);
      const isPristine = vue.ref(true);
      const vMenuRef = vue.ref();
      const _menu = useProxiedModel(props, 'menu');
      const menu = vue.computed({
        get: () => _menu.value,
        set: v => {
          if (_menu.value && !v && vMenuRef.value?.ΨopenChildren) return;
          _menu.value = v;
        }
      });
      const selectionIndex = vue.ref(-1);
      const color = vue.computed(() => vTextFieldRef.value?.color);
      const {
        items,
        transformIn,
        transformOut
      } = useItems(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(color);
      const search = useProxiedModel(props, 'search', '');
      const model = useProxiedModel(props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const form = useForm();
      const {
        filteredItems,
        getMatches
      } = useFilter(props, items, vue.computed(() => isPristine.value ? undefined : search.value));
      const selections = vue.computed(() => {
        return model.value.map(v => {
          return items.value.find(item => props.valueComparator(item.value, v.value)) || v;
        });
      });
      const displayItems = vue.computed(() => {
        if (props.hideSelected) {
          return filteredItems.value.filter(filteredItem => !selections.value.some(s => s.value === filteredItem.value));
        }
        return filteredItems.value;
      });
      const selected = vue.computed(() => selections.value.map(selection => selection.props.value));
      const selection = vue.computed(() => selections.value[selectionIndex.value]);
      const listRef = vue.ref();
      function onClear(e) {
        if (props.openOnClear) {
          menu.value = true;
        }
        search.value = '';
      }
      function onMousedownControl() {
        if (props.hideNoData && !items.value.length || props.readonly || form?.isReadonly.value) return;
        menu.value = true;
      }
      function onKeydown(e) {
        if (props.readonly || form?.isReadonly.value) return;
        const selectionStart = vTextFieldRef.value.selectionStart;
        const length = selected.value.length;
        if (selectionIndex.value > -1 || ['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
          e.preventDefault();
        }
        if (['Enter', 'ArrowDown'].includes(e.key)) {
          menu.value = true;
        }
        if (['Escape'].includes(e.key)) {
          menu.value = false;
        }
        if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
          isPristine.value = true;
        }
        if (e.key === 'ArrowDown') {
          listRef.value?.focus('next');
        } else if (e.key === 'ArrowUp') {
          listRef.value?.focus('prev');
        }
        if (!props.multiple) return;
        if (['Backspace', 'Delete'].includes(e.key)) {
          if (selectionIndex.value < 0) {
            if (e.key === 'Backspace' && !search.value) {
              selectionIndex.value = length - 1;
            }
            return;
          }
          const originalSelectionIndex = selectionIndex.value;
          if (selection.value) select(selection.value);
          selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
        }
        if (e.key === 'ArrowLeft') {
          if (selectionIndex.value < 0 && selectionStart > 0) return;
          const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
          if (selections.value[prev]) {
            selectionIndex.value = prev;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange(search.value?.length, search.value?.length);
          }
        }
        if (e.key === 'ArrowRight') {
          if (selectionIndex.value < 0) return;
          const next = selectionIndex.value + 1;
          if (selections.value[next]) {
            selectionIndex.value = next;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange(0, 0);
          }
        }
      }
      function onInput(e) {
        search.value = e.target.value;
      }
      function onAfterLeave() {
        if (isFocused.value) isPristine.value = true;
      }
      function onFocusin(e) {
        isFocused.value = true;
      }
      function onFocusout(e) {
        if (e.relatedTarget == null) {
          vTextFieldRef.value?.focus();
        }
      }
      const isSelecting = vue.ref(false);
      function select(item) {
        if (props.multiple) {
          const index = selected.value.findIndex(selection => props.valueComparator(selection, item.value));
          if (index === -1) {
            model.value = [...model.value, item];
          } else {
            const value = [...model.value];
            value.splice(index, 1);
            model.value = value;
          }
        } else {
          model.value = [item];
          isSelecting.value = true;
          if (!slots.selection) {
            search.value = item.title;
          }
          menu.value = false;
          isPristine.value = true;
          vue.nextTick(() => isSelecting.value = false);
        }
      }
      vue.watch(isFocused, val => {
        if (val) {
          isSelecting.value = true;
          search.value = props.multiple || !!slots.selection ? '' : String(selections.value.at(-1)?.props.title ?? '');
          isPristine.value = true;
          vue.nextTick(() => isSelecting.value = false);
        } else {
          if (!props.multiple && !search.value) model.value = [];
          menu.value = false;
          search.value = '';
        }
      });
      vue.watch(search, val => {
        if (!isFocused.value || isSelecting.value) return;
        if (val) menu.value = true;
        isPristine.value = !val;
      });
      useRender(() => {
        const hasChips = !!(props.chips || slots.chip);
        const hasList = !!(!props.hideNoData || displayItems.value.length || slots.prepend || slots.append || slots['no-data']);
        const isDirty = model.value.length > 0;
        const [textFieldProps] = VTextField.filterProps(props);
        return vue.createVNode(VTextField, vue.mergeProps({
          "ref": vTextFieldRef
        }, textFieldProps, {
          "modelValue": search.value,
          "onUpdate:modelValue": v => {
            if (v == null) model.value = [];
          },
          "focused": isFocused.value,
          "onUpdate:focused": $event => isFocused.value = $event,
          "validationValue": model.externalValue,
          "dirty": isDirty,
          "onInput": onInput,
          "class": ['v-autocomplete', {
            'v-autocomplete--active-menu': menu.value,
            'v-autocomplete--chips': !!props.chips,
            'v-autocomplete--selecting-index': selectionIndex.value > -1,
            [`v-autocomplete--${props.multiple ? 'multiple' : 'single'}`]: true,
            'v-autocomplete--selection-slot': !!slots.selection
          }, props.class],
          "style": props.style,
          "appendInnerIcon": props.menuIcon,
          "readonly": props.readonly,
          "placeholder": isDirty ? undefined : props.placeholder,
          "onClick:clear": onClear,
          "onMousedown:control": onMousedownControl,
          "onKeydown": onKeydown
        }), {
          ...slots,
          default: () => vue.createVNode(vue.Fragment, null, [vue.createVNode(VMenu, vue.mergeProps({
            "ref": vMenuRef,
            "modelValue": menu.value,
            "onUpdate:modelValue": $event => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-autocomplete__content",
            "eager": props.eager,
            "maxHeight": 310,
            "openOnClick": false,
            "closeOnContentClick": false,
            "transition": props.transition,
            "onAfterLeave": onAfterLeave
          }, props.menuProps), {
            default: () => [hasList && vue.createVNode(VList, {
              "ref": listRef,
              "selected": selected.value,
              "selectStrategy": props.multiple ? 'independent' : 'single-independent',
              "onMousedown": e => e.preventDefault(),
              "onFocusin": onFocusin,
              "onFocusout": onFocusout
            }, {
              default: () => [!displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? vue.createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), slots['prepend-item']?.(), displayItems.value.map(item => slots.item?.({
                item,
                props: vue.mergeProps(item.props, {
                  onClick: () => select(item)
                })
              }) ?? vue.createVNode(VListItem, vue.mergeProps({
                "key": item.value
              }, item.props, {
                "onClick": () => select(item)
              }), {
                prepend: _ref2 => {
                  let {
                    isSelected
                  } = _ref2;
                  return vue.createVNode(vue.Fragment, null, [props.multiple && !props.hideSelected ? vue.createVNode(VCheckboxBtn, {
                    "modelValue": isSelected,
                    "ripple": false,
                    "tabindex": "-1"
                  }, null) : undefined, item.props.prependIcon && vue.createVNode(VIcon, {
                    "icon": item.props.prependIcon
                  }, null)]);
                },
                title: () => {
                  return isPristine.value ? item.title : highlightResult$1(item.title, getMatches(item)?.title, search.value?.length ?? 0);
                }
              })), slots['append-item']?.()]
            })]
          }), selections.value.map((item, index) => {
            function onChipClose(e) {
              e.stopPropagation();
              e.preventDefault();
              select(item);
            }
            const slotProps = {
              'onClick:close': onChipClose,
              onMousedown(e) {
                e.preventDefault();
                e.stopPropagation();
              },
              modelValue: true,
              'onUpdate:modelValue': undefined
            };
            return vue.createVNode("div", {
              "key": item.value,
              "class": ['v-autocomplete__selection', index === selectionIndex.value && ['v-autocomplete__selection--selected', textColorClasses.value]],
              "style": index === selectionIndex.value ? textColorStyles.value : {}
            }, [hasChips ? !slots.chip ? vue.createVNode(VChip, vue.mergeProps({
              "key": "chip",
              "closable": props.closableChips,
              "size": "small",
              "text": item.title
            }, slotProps), null) : vue.createVNode(VDefaultsProvider, {
              "key": "chip-defaults",
              "defaults": {
                VChip: {
                  closable: props.closableChips,
                  size: 'small',
                  text: item.title
                }
              }
            }, {
              default: () => [slots.chip?.({
                item,
                index,
                props: slotProps
              })]
            }) : slots.selection?.({
              item,
              index
            }) ?? vue.createVNode("span", {
              "class": "v-autocomplete__selection-text"
            }, [item.title, props.multiple && index < selections.value.length - 1 && vue.createVNode("span", {
              "class": "v-autocomplete__selection-comma"
            }, [vue.createTextVNode(",")])])]);
          })])
        });
      });
      return forwardRefs({
        isFocused,
        isPristine,
        menu,
        search,
        filteredItems,
        select
      }, vTextFieldRef);
    }
  });

  const VBadge = genericComponent()({
    name: 'VBadge',
    inheritAttrs: false,
    props: {
      bordered: Boolean,
      color: String,
      content: [Number, String],
      dot: Boolean,
      floating: Boolean,
      icon: IconValue,
      inline: Boolean,
      label: {
        type: String,
        default: '$vuetify.badge'
      },
      max: [Number, String],
      modelValue: {
        type: Boolean,
        default: true
      },
      offsetX: [Number, String],
      offsetY: [Number, String],
      textColor: String,
      ...makeComponentProps(),
      ...makeLocationProps({
        location: 'top end'
      }),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeTransitionProps({
        transition: 'scale-rotate-transition'
      })
    },
    setup(props, ctx) {
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const {
        roundedClasses
      } = useRounded(props);
      const {
        t
      } = useLocale();
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, 'textColor'));
      const {
        themeClasses
      } = useTheme();
      const {
        locationStyles
      } = useLocation(props, true, side => {
        const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
        return base + (['top', 'bottom'].includes(side) ? +(props.offsetY ?? 0) : ['left', 'right'].includes(side) ? +(props.offsetX ?? 0) : 0);
      });
      useRender(() => {
        const value = Number(props.content);
        const content = !props.max || isNaN(value) ? props.content : value <= +props.max ? value : `${props.max}+`;
        const [badgeAttrs, attrs] = pick(ctx.attrs, ['aria-atomic', 'aria-label', 'aria-live', 'role', 'title']);
        return vue.createVNode(props.tag, vue.mergeProps({
          "class": ['v-badge', {
            'v-badge--bordered': props.bordered,
            'v-badge--dot': props.dot,
            'v-badge--floating': props.floating,
            'v-badge--inline': props.inline
          }, props.class]
        }, attrs, {
          "style": props.style
        }), {
          default: () => [vue.createVNode("div", {
            "class": "v-badge__wrapper"
          }, [ctx.slots.default?.(), vue.createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => [vue.withDirectives(vue.createVNode("span", vue.mergeProps({
              "class": ['v-badge__badge', themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
              "style": [backgroundColorStyles.value, textColorStyles.value, props.inline ? {} : locationStyles.value],
              "aria-atomic": "true",
              "aria-label": t(props.label, value),
              "aria-live": "polite",
              "role": "status"
            }, badgeAttrs), [props.dot ? undefined : ctx.slots.badge ? ctx.slots.badge?.() : props.icon ? vue.createVNode(VIcon, {
              "icon": props.icon
            }, null) : content]), [[vue.vShow, props.modelValue]])]
          })])]
        });
      });
      return {};
    }
  });

  const VBannerActions = genericComponent()({
    name: 'VBannerActions',
    props: {
      color: String,
      density: String,
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      provideDefaults({
        VBtn: {
          color: props.color,
          density: props.density,
          variant: 'text'
        }
      });
      useRender(() => vue.createVNode("div", {
        "class": ['v-banner-actions', props.class],
        "style": props.style
      }, [slots.default?.()]));
      return {};
    }
  });

  const VBannerText = createSimpleFunctional('v-banner-text');

  // Types

  const VBanner = genericComponent()({
    name: 'VBanner',
    props: {
      avatar: String,
      color: String,
      icon: IconValue,
      lines: String,
      stacked: Boolean,
      sticky: Boolean,
      text: String,
      ...makeBorderProps(),
      ...makeComponentProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeLocationProps(),
      ...makePositionProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        borderClasses
      } = useBorder(props);
      const {
        densityClasses
      } = useDensity(props);
      const {
        mobile
      } = useDisplay();
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
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
        themeClasses
      } = provideTheme(props);
      const color = vue.toRef(props, 'color');
      const density = vue.toRef(props, 'density');
      provideDefaults({
        VBannerActions: {
          color,
          density
        }
      });
      useRender(() => {
        const hasText = !!(props.text || slots.text);
        const hasPrependMedia = !!(props.avatar || props.icon);
        const hasPrepend = !!(hasPrependMedia || slots.prepend);
        return vue.createVNode(props.tag, {
          "class": ['v-banner', {
            'v-banner--stacked': props.stacked || mobile.value,
            'v-banner--sticky': props.sticky,
            [`v-banner--${props.lines}-line`]: !!props.lines
          }, borderClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, themeClasses.value, props.class],
          "style": [dimensionStyles.value, locationStyles.value, props.style],
          "role": "banner"
        }, {
          default: () => [hasPrepend && vue.createVNode("div", {
            "key": "prepend",
            "class": "v-banner__prepend"
          }, [!slots.prepend ? vue.createVNode(VAvatar, {
            "key": "prepend-avatar",
            "color": color.value,
            "density": density.value,
            "icon": props.icon,
            "image": props.avatar
          }, null) : vue.createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                color: color.value,
                density: density.value,
                icon: props.icon,
                image: props.avatar
              }
            }
          }, slots.prepend)]), vue.createVNode("div", {
            "class": "v-banner__content"
          }, [hasText && vue.createVNode(VBannerText, {
            "key": "text"
          }, {
            default: () => [slots.text?.() ?? props.text]
          }), slots.default?.()]), slots.actions && vue.createVNode(VBannerActions, {
            "key": "actions"
          }, slots.actions)]
        });
      });
    }
  });

  const VBottomNavigation = genericComponent()({
    name: 'VBottomNavigation',
    props: {
      bgColor: String,
      color: String,
      grow: Boolean,
      mode: {
        type: String,
        validator: v => !v || ['horizontal', 'shift'].includes(v)
      },
      height: {
        type: [Number, String],
        default: 56
      },
      active: {
        type: Boolean,
        default: true
      },
      ...makeBorderProps(),
      ...makeComponentProps(),
      ...makeDensityProps(),
      ...makeElevationProps(),
      ...makeRoundedProps(),
      ...makeLayoutItemProps({
        name: 'bottom-navigation'
      }),
      ...makeTagProps({
        tag: 'header'
      }),
      ...makeGroupProps({
        modelValue: true,
        selectedClass: 'v-btn--selected'
      }),
      ...makeThemeProps()
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
      } = useTheme();
      const {
        borderClasses
      } = useBorder(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'bgColor'));
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
        ssrBootStyles
      } = useSsrBoot();
      const height = vue.computed(() => Number(props.height) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0));
      const isActive = vue.toRef(props, 'active');
      const {
        layoutItemStyles
      } = useLayoutItem({
        id: props.name,
        order: vue.computed(() => parseInt(props.order, 10)),
        position: vue.computed(() => 'bottom'),
        layoutSize: vue.computed(() => isActive.value ? height.value : 0),
        elementSize: height,
        active: isActive,
        absolute: vue.toRef(props, 'absolute')
      });
      useGroup(props, VBtnToggleSymbol);
      provideDefaults({
        VBtn: {
          color: vue.toRef(props, 'color'),
          density: vue.toRef(props, 'density'),
          stacked: vue.computed(() => props.mode !== 'horizontal'),
          variant: 'text'
        }
      }, {
        scoped: true
      });
      useRender(() => {
        return vue.createVNode(props.tag, {
          "class": ['v-bottom-navigation', {
            'v-bottom-navigation--active': isActive.value,
            'v-bottom-navigation--grow': props.grow,
            'v-bottom-navigation--shift': props.mode === 'shift'
          }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, props.class],
          "style": [backgroundColorStyles.value, layoutItemStyles.value, {
            height: convertToUnit(height.value),
            transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, '%')})`
          }, ssrBootStyles.value, props.style]
        }, {
          default: () => [slots.default && vue.createVNode("div", {
            "class": "v-bottom-navigation__content"
          }, [slots.default()])]
        });
      });
      return {};
    }
  });

  const VBreadcrumbsDivider = genericComponent()({
    name: 'VBreadcrumbsDivider',
    props: {
      divider: [Number, String],
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => vue.createVNode("li", {
        "class": ['v-breadcrumbs-divider', props.class],
        "style": props.style
      }, [slots?.default?.() ?? props.divider]));
      return {};
    }
  });

  const VBreadcrumbsItem = genericComponent()({
    name: 'VBreadcrumbsItem',
    props: {
      active: Boolean,
      activeClass: String,
      activeColor: String,
      color: String,
      disabled: Boolean,
      title: String,
      ...makeComponentProps(),
      ...makeRouterProps(),
      ...makeTagProps({
        tag: 'li'
      })
    },
    setup(props, _ref) {
      let {
        slots,
        attrs
      } = _ref;
      const link = useLink(props, attrs);
      const isActive = vue.computed(() => props.active || link.isActive?.value);
      const color = vue.computed(() => isActive.value ? props.activeColor : props.color);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(color);
      useRender(() => {
        const Tag = link.isLink.value ? 'a' : props.tag;
        return vue.createVNode(Tag, {
          "class": ['v-breadcrumbs-item', {
            'v-breadcrumbs-item--active': isActive.value,
            'v-breadcrumbs-item--disabled': props.disabled,
            'v-breadcrumbs-item--link': link.isLink.value,
            [`${props.activeClass}`]: isActive.value && props.activeClass
          }, textColorClasses.value, props.class],
          "style": [textColorStyles.value, props.style],
          "href": link.href.value,
          "aria-current": isActive.value ? 'page' : undefined,
          "onClick": link.navigate
        }, {
          default: () => [slots.default?.() ?? props.title]
        });
      });
      return {};
    }
  });

  // Types

  const VBreadcrumbs = genericComponent()({
    name: 'VBreadcrumbs',
    props: {
      activeClass: String,
      activeColor: String,
      bgColor: String,
      color: String,
      disabled: Boolean,
      divider: {
        type: String,
        default: '/'
      },
      icon: IconValue,
      items: {
        type: Array,
        default: () => []
      },
      ...makeComponentProps(),
      ...makeDensityProps(),
      ...makeRoundedProps(),
      ...makeTagProps({
        tag: 'ul'
      })
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'bgColor'));
      const {
        densityClasses
      } = useDensity(props);
      const {
        roundedClasses
      } = useRounded(props);
      provideDefaults({
        VBreadcrumbsDivider: {
          divider: vue.toRef(props, 'divider')
        },
        VBreadcrumbsItem: {
          activeClass: vue.toRef(props, 'activeClass'),
          activeColor: vue.toRef(props, 'activeColor'),
          color: vue.toRef(props, 'color'),
          disabled: vue.toRef(props, 'disabled')
        }
      });
      const items = vue.computed(() => props.items.map(item => {
        return typeof item === 'string' ? {
          item: {
            title: item
          },
          raw: item
        } : {
          item,
          raw: item
        };
      }));
      useRender(() => {
        const hasPrepend = !!(slots.prepend || props.icon);
        return vue.createVNode(props.tag, {
          "class": ['v-breadcrumbs', backgroundColorClasses.value, densityClasses.value, roundedClasses.value, props.class],
          "style": [backgroundColorStyles.value, props.style]
        }, {
          default: () => [hasPrepend && vue.createVNode("div", {
            "key": "prepend",
            "class": "v-breadcrumbs__prepend"
          }, [!slots.prepend ? vue.createVNode(VIcon, {
            "key": "prepend-icon",
            "start": true,
            "icon": props.icon
          }, null) : vue.createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !props.icon,
            "defaults": {
              VIcon: {
                icon: props.icon,
                start: true
              }
            }
          }, slots.prepend)]), items.value.map((_ref2, index, array) => {
            let {
              item,
              raw
            } = _ref2;
            return vue.createVNode(vue.Fragment, null, [vue.createVNode(VBreadcrumbsItem, vue.mergeProps({
              "key": item.title,
              "disabled": index >= array.length - 1
            }, item), {
              default: slots.title ? () => slots.title?.({
                item: raw,
                index
              }) : undefined
            }), index < array.length - 1 && vue.createVNode(VBreadcrumbsDivider, null, {
              default: slots.divider ? () => slots.divider?.({
                item: raw,
                index
              }) : undefined
            })]);
          }), slots.default?.()]
        });
      });
      return {};
    }
  });

  const VCardActions = genericComponent()({
    name: 'VCardActions',
    props: makeComponentProps(),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      provideDefaults({
        VBtn: {
          variant: 'text'
        }
      });
      useRender(() => vue.createVNode("div", {
        "class": ['v-card-actions', props.class],
        "style": props.style
      }, [slots.default?.()]));
      return {};
    }
  });

  const VCardSubtitle = createSimpleFunctional('v-card-subtitle');

  const VCardTitle = createSimpleFunctional('v-card-title');

  const VCardItem = genericComponent()({
    name: 'VCardItem',
    props: {
      appendAvatar: String,
      appendIcon: IconValue,
      prependAvatar: String,
      prependIcon: IconValue,
      subtitle: String,
      title: String,
      ...makeComponentProps(),
      ...makeDensityProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => {
        const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
        const hasPrepend = !!(hasPrependMedia || slots.prepend);
        const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
        const hasAppend = !!(hasAppendMedia || slots.append);
        const hasTitle = !!(props.title || slots.title);
        const hasSubtitle = !!(props.subtitle || slots.subtitle);
        return vue.createVNode("div", {
          "class": ['v-card-item', props.class],
          "style": props.style
        }, [hasPrepend && vue.createVNode("div", {
          "key": "prepend",
          "class": "v-card-item__prepend"
        }, [!slots.prepend ? hasPrependMedia && vue.createVNode(VAvatar, {
          "key": "prepend-avatar",
          "density": props.density,
          "icon": props.prependIcon,
          "image": props.prependAvatar
        }, null) : vue.createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !hasPrependMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              icon: props.prependIcon,
              image: props.prependAvatar
            }
          }
        }, slots.prepend)]), vue.createVNode("div", {
          "class": "v-card-item__content"
        }, [hasTitle && vue.createVNode(VCardTitle, {
          "key": "title"
        }, {
          default: () => [slots.title?.() ?? props.title]
        }), hasSubtitle && vue.createVNode(VCardSubtitle, {
          "key": "subtitle"
        }, {
          default: () => [slots.subtitle?.() ?? props.subtitle]
        }), slots.default?.()]), hasAppend && vue.createVNode("div", {
          "key": "append",
          "class": "v-card-item__append"
        }, [!slots.append ? hasAppendMedia && vue.createVNode(VAvatar, {
          "key": "append-avatar",
          "density": props.density,
          "icon": props.appendIcon,
          "image": props.appendAvatar
        }, null) : vue.createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "disabled": !hasAppendMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              icon: props.appendIcon,
              image: props.appendAvatar
            }
          }
        }, slots.append)])]);
      });
      return {};
    }
  });

  const VCardText = createSimpleFunctional('v-card-text');

  // Types

  const VCard = genericComponent()({
    name: 'VCard',
    directives: {
      Ripple
    },
    props: {
      appendAvatar: String,
      appendIcon: IconValue,
      disabled: Boolean,
      flat: Boolean,
      hover: Boolean,
      image: String,
      link: {
        type: Boolean,
        default: undefined
      },
      prependAvatar: String,
      prependIcon: IconValue,
      ripple: {
        type: Boolean,
        default: true
      },
      subtitle: String,
      text: String,
      title: String,
      ...makeBorderProps(),
      ...makeComponentProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeLoaderProps(),
      ...makeLocationProps(),
      ...makePositionProps(),
      ...makeRoundedProps(),
      ...makeRouterProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: 'elevated'
      })
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
      const link = useLink(props, attrs);
      const isLink = vue.computed(() => props.link !== false && link.isLink.value);
      const isClickable = vue.computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value));
      useRender(() => {
        const Tag = isLink.value ? 'a' : props.tag;
        const hasTitle = !!(slots.title || props.title);
        const hasSubtitle = !!(slots.subtitle || props.subtitle);
        const hasHeader = hasTitle || hasSubtitle;
        const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
        const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
        const hasImage = !!(slots.image || props.image);
        const hasCardItem = hasHeader || hasPrepend || hasAppend;
        const hasText = !!(slots.text || props.text);
        return vue.withDirectives(vue.createVNode(Tag, {
          "class": ['v-card', {
            'v-card--disabled': props.disabled,
            'v-card--flat': props.flat,
            'v-card--hover': props.hover && !(props.disabled || props.flat),
            'v-card--link': isClickable.value
          }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class],
          "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, props.style],
          "href": link.href.value,
          "onClick": isClickable.value && link.navigate,
          "tabindex": props.disabled ? -1 : undefined
        }, {
          default: () => [hasImage && vue.createVNode("div", {
            "key": "image",
            "class": "v-card__image"
          }, [!slots.image ? vue.createVNode(VImg, {
            "key": "image-img",
            "cover": true,
            "src": props.image
          }, null) : vue.createVNode(VDefaultsProvider, {
            "key": "image-defaults",
            "disabled": !props.image,
            "defaults": {
              VImg: {
                cover: true,
                src: props.image
              }
            }
          }, slots.image)]), vue.createVNode(LoaderSlot, {
            "name": "v-card",
            "active": !!props.loading,
            "color": typeof props.loading === 'boolean' ? undefined : props.loading
          }, {
            default: slots.loader
          }), hasCardItem && vue.createVNode(VCardItem, {
            "key": "item",
            "prependAvatar": props.prependAvatar,
            "prependIcon": props.prependIcon,
            "title": props.title,
            "subtitle": props.subtitle,
            "appendAvatar": props.appendAvatar,
            "appendIcon": props.appendIcon
          }, {
            default: slots.item,
            prepend: slots.prepend,
            title: slots.title,
            subtitle: slots.subtitle,
            append: slots.append
          }), hasText && vue.createVNode(VCardText, {
            "key": "text"
          }, {
            default: () => [slots.text?.() ?? props.text]
          }), slots.default?.(), slots.actions && vue.createVNode(VCardActions, null, {
            default: slots.actions
          }), genOverlays(isClickable.value, 'v-card')]
        }), [[vue.resolveDirective("ripple"), isClickable.value && props.ripple]]);
      });
      return {};
    }
  });

  // Types
  const handleGesture = wrapper => {
    const {
      touchstartX,
      touchendX,
      touchstartY,
      touchendY
    } = wrapper;
    const dirRatio = 0.5;
    const minDistance = 16;
    wrapper.offsetX = touchendX - touchstartX;
    wrapper.offsetY = touchendY - touchstartY;
    if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
      wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
      wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
    }
    if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
      wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
      wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
    }
  };
  function touchstart(event, wrapper) {
    const touch = event.changedTouches[0];
    wrapper.touchstartX = touch.clientX;
    wrapper.touchstartY = touch.clientY;
    wrapper.start?.({
      originalEvent: event,
      ...wrapper
    });
  }
  function touchend(event, wrapper) {
    const touch = event.changedTouches[0];
    wrapper.touchendX = touch.clientX;
    wrapper.touchendY = touch.clientY;
    wrapper.end?.({
      originalEvent: event,
      ...wrapper
    });
    handleGesture(wrapper);
  }
  function touchmove(event, wrapper) {
    const touch = event.changedTouches[0];
    wrapper.touchmoveX = touch.clientX;
    wrapper.touchmoveY = touch.clientY;
    wrapper.move?.({
      originalEvent: event,
      ...wrapper
    });
  }
  function createHandlers() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const wrapper = {
      touchstartX: 0,
      touchstartY: 0,
      touchendX: 0,
      touchendY: 0,
      touchmoveX: 0,
      touchmoveY: 0,
      offsetX: 0,
      offsetY: 0,
      left: value.left,
      right: value.right,
      up: value.up,
      down: value.down,
      start: value.start,
      move: value.move,
      end: value.end
    };
    return {
      touchstart: e => touchstart(e, wrapper),
      touchend: e => touchend(e, wrapper),
      touchmove: e => touchmove(e, wrapper)
    };
  }
  function mounted$3(el, binding) {
    const value = binding.value;
    const target = value?.parent ? el.parentElement : el;
    const options = value?.options ?? {
      passive: true
    };
    const uid = binding.instance?.$.uid; // TODO: use custom uid generator

    if (!target || !uid) return;
    const handlers = createHandlers(binding.value);
    target._touchHandlers = target._touchHandlers ?? Object.create(null);
    target._touchHandlers[uid] = handlers;
    keys(handlers).forEach(eventName => {
      target.addEventListener(eventName, handlers[eventName], options);
    });
  }
  function unmounted$3(el, binding) {
    const target = binding.value?.parent ? el.parentElement : el;
    const uid = binding.instance?.$.uid;
    if (!target?._touchHandlers || !uid) return;
    const handlers = target._touchHandlers[uid];
    keys(handlers).forEach(eventName => {
      target.removeEventListener(eventName, handlers[eventName]);
    });
    delete target._touchHandlers[uid];
  }
  const Touch = {
    mounted: mounted$3,
    unmounted: unmounted$3
  };

  // Types

  const VWindowSymbol = Symbol.for('vuetify:v-window');
  const VWindowGroupSymbol = Symbol.for('vuetify:v-window-group');
  const makeVWindowProps = propsFactory({
    continuous: Boolean,
    nextIcon: {
      type: [Boolean, String, Function, Object],
      default: '$next'
    },
    prevIcon: {
      type: [Boolean, String, Function, Object],
      default: '$prev'
    },
    reverse: Boolean,
    showArrows: {
      type: [Boolean, String],
      validator: v => typeof v === 'boolean' || v === 'hover'
    },
    touch: {
      type: [Object, Boolean],
      default: undefined
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    modelValue: null,
    disabled: Boolean,
    selectedClass: {
      type: String,
      default: 'v-window-item--active'
    },
    // TODO: mandatory should probably not be exposed but do this for now
    mandatory: {
      default: 'force'
    },
    ...makeComponentProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, 'v-window');
  const VWindow = genericComponent()({
    name: 'VWindow',
    directives: {
      Touch
    },
    props: makeVWindowProps(),
    emits: {
      'update:modelValue': v => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        isRtl
      } = useRtl();
      const {
        t
      } = useLocale();
      const group = useGroup(props, VWindowGroupSymbol);
      const rootRef = vue.ref();
      const isRtlReverse = vue.computed(() => isRtl.value ? !props.reverse : props.reverse);
      const isReversed = vue.ref(false);
      const transition = vue.computed(() => {
        const axis = props.direction === 'vertical' ? 'y' : 'x';
        const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
        const direction = reverse ? '-reverse' : '';
        return `v-window-${axis}${direction}-transition`;
      });
      const transitionCount = vue.ref(0);
      const transitionHeight = vue.ref(undefined);
      const activeIndex = vue.computed(() => {
        return group.items.value.findIndex(item => group.selected.value.includes(item.id));
      });
      vue.watch(activeIndex, (newVal, oldVal) => {
        const itemsLength = group.items.value.length;
        const lastIndex = itemsLength - 1;
        if (itemsLength <= 2) {
          isReversed.value = newVal < oldVal;
        } else if (newVal === lastIndex && oldVal === 0) {
          isReversed.value = true;
        } else if (newVal === 0 && oldVal === lastIndex) {
          isReversed.value = false;
        } else {
          isReversed.value = newVal < oldVal;
        }
      });
      vue.provide(VWindowSymbol, {
        transition,
        isReversed,
        transitionCount,
        transitionHeight,
        rootRef
      });
      const canMoveBack = vue.computed(() => props.continuous || activeIndex.value !== 0);
      const canMoveForward = vue.computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
      function prev() {
        canMoveBack.value && group.prev();
      }
      function next() {
        canMoveForward.value && group.next();
      }
      const arrows = vue.computed(() => {
        const arrows = [];
        const prevProps = {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          class: `v-window__${isRtlReverse.value ? 'right' : 'left'}`,
          onClick: group.prev,
          ariaLabel: t('$vuetify.carousel.prev')
        };
        arrows.push(canMoveBack.value ? slots.prev ? slots.prev({
          props: prevProps
        }) : vue.createVNode(VBtn, prevProps, null) : vue.createVNode("div", null, null));
        const nextProps = {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          class: `v-window__${isRtlReverse.value ? 'left' : 'right'}`,
          onClick: group.next,
          ariaLabel: t('$vuetify.carousel.next')
        };
        arrows.push(canMoveForward.value ? slots.next ? slots.next({
          props: nextProps
        }) : vue.createVNode(VBtn, nextProps, null) : vue.createVNode("div", null, null));
        return arrows;
      });
      const touchOptions = vue.computed(() => {
        if (props.touch === false) return props.touch;
        const options = {
          left: () => {
            isRtlReverse.value ? prev() : next();
          },
          right: () => {
            isRtlReverse.value ? next() : prev();
          },
          start: _ref2 => {
            let {
              originalEvent
            } = _ref2;
            originalEvent.stopPropagation();
          }
        };
        return {
          ...options,
          ...(props.touch === true ? {} : props.touch)
        };
      });
      useRender(() => vue.withDirectives(vue.createVNode(props.tag, {
        "ref": rootRef,
        "class": ['v-window', {
          'v-window--show-arrows-on-hover': props.showArrows === 'hover'
        }, themeClasses.value, props.class],
        "style": props.style
      }, {
        default: () => [vue.createVNode("div", {
          "class": "v-window__container",
          "style": {
            height: transitionHeight.value
          }
        }, [slots.default?.({
          group
        }), props.showArrows !== false && vue.createVNode("div", {
          "class": "v-window__controls"
        }, [arrows.value])]), slots.additional?.({
          group
        })]
      }), [[vue.resolveDirective("touch"), touchOptions.value]]));
      return {
        group
      };
    }
  });

  // Types

  const VCarousel = genericComponent()({
    name: 'VCarousel',
    props: {
      color: String,
      cycle: Boolean,
      delimiterIcon: {
        type: IconValue,
        default: '$delimiter'
      },
      height: {
        type: [Number, String],
        default: 500
      },
      hideDelimiters: Boolean,
      hideDelimiterBackground: Boolean,
      interval: {
        type: [Number, String],
        default: 6000,
        validator: value => Number(value) > 0
      },
      progress: [Boolean, String],
      verticalDelimiters: [Boolean, String],
      ...makeVWindowProps({
        continuous: true,
        mandatory: 'force',
        showArrows: true
      })
    },
    emits: {
      'update:modelValue': val => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const model = useProxiedModel(props, 'modelValue');
      const {
        t
      } = useLocale();
      const windowRef = vue.ref();
      let slideTimeout = -1;
      vue.watch(model, restartTimeout);
      vue.watch(() => props.interval, restartTimeout);
      vue.watch(() => props.cycle, val => {
        if (val) restartTimeout();else window.clearTimeout(slideTimeout);
      });
      vue.onMounted(startTimeout);
      function startTimeout() {
        if (!props.cycle || !windowRef.value) return;
        slideTimeout = window.setTimeout(windowRef.value.group.next, +props.interval > 0 ? +props.interval : 6000);
      }
      function restartTimeout() {
        window.clearTimeout(slideTimeout);
        window.requestAnimationFrame(startTimeout);
      }
      useRender(() => vue.createVNode(VWindow, {
        "ref": windowRef,
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-carousel', {
          'v-carousel--hide-delimiter-background': props.hideDelimiterBackground,
          'v-carousel--vertical-delimiters': props.verticalDelimiters
        }, props.class],
        "style": [{
          height: convertToUnit(props.height)
        }, props.style],
        "continuous": true,
        "mandatory": "force",
        "showArrows": props.showArrows
      }, {
        default: slots.default,
        additional: _ref2 => {
          let {
            group
          } = _ref2;
          return vue.createVNode(vue.Fragment, null, [!props.hideDelimiters && vue.createVNode("div", {
            "class": "v-carousel__controls",
            "style": {
              left: props.verticalDelimiters === 'left' && props.verticalDelimiters ? 0 : 'auto',
              right: props.verticalDelimiters === 'right' ? 0 : 'auto'
            }
          }, [group.items.value.length > 0 && vue.createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                color: props.color,
                icon: props.delimiterIcon,
                size: 'x-small',
                variant: 'text'
              }
            },
            "scoped": true
          }, {
            default: () => [group.items.value.map((item, index) => {
              const props = {
                id: `carousel-item-${item.id}`,
                'aria-label': t('$vuetify.carousel.ariaLabel.delimiter', index + 1, group.items.value.length),
                class: [group.isSelected(item.id) && 'v-btn--active'],
                onClick: () => group.select(item.id, true)
              };
              return slots.item ? slots.item({
                props,
                item
              }) : vue.createVNode(VBtn, vue.mergeProps(item, props), null);
            })]
          })]), props.progress && vue.createVNode(VProgressLinear, {
            "class": "v-carousel__progress",
            "color": typeof props.progress === 'string' ? props.progress : undefined,
            "modelValue": (group.getItemIndex(model.value) + 1) / group.items.value.length * 100
          }, null)]);
        },
        prev: slots.prev,
        next: slots.next
      }));
      return {};
    }
  });

  const VWindowItem = genericComponent()({
    name: 'VWindowItem',
    directives: {
      Touch
    },
    props: {
      reverseTransition: {
        type: [Boolean, String],
        default: undefined
      },
      transition: {
        type: [Boolean, String],
        default: undefined
      },
      ...makeComponentProps(),
      ...makeGroupItemProps(),
      ...makeLazyProps()
    },
    emits: {
      'group:selected': val => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const window = vue.inject(VWindowSymbol);
      const groupItem = useGroupItem(props, VWindowGroupSymbol);
      const {
        isBooted
      } = useSsrBoot();
      if (!window || !groupItem) throw new Error('[Vuetify] VWindowItem must be used inside VWindow');
      const isTransitioning = vue.ref(false);
      const hasTransition = vue.computed(() => window.isReversed.value ? props.reverseTransition !== false : props.transition !== false);
      function onAfterTransition() {
        if (!isTransitioning.value || !window) {
          return;
        }

        // Finalize transition state.
        isTransitioning.value = false;
        if (window.transitionCount.value > 0) {
          window.transitionCount.value -= 1;

          // Remove container height if we are out of transition.
          if (window.transitionCount.value === 0) {
            window.transitionHeight.value = undefined;
          }
        }
      }
      function onBeforeTransition() {
        if (isTransitioning.value || !window) {
          return;
        }

        // Initialize transition state here.
        isTransitioning.value = true;
        if (window.transitionCount.value === 0) {
          // Set initial height for height transition.
          window.transitionHeight.value = convertToUnit(window.rootRef.value?.clientHeight);
        }
        window.transitionCount.value += 1;
      }
      function onTransitionCancelled() {
        onAfterTransition(); // This should have the same path as normal transition end.
      }

      function onEnterTransition(el) {
        if (!isTransitioning.value) {
          return;
        }
        vue.nextTick(() => {
          // Do not set height if no transition or cancelled.
          if (!hasTransition.value || !isTransitioning.value || !window) {
            return;
          }

          // Set transition target height.
          window.transitionHeight.value = convertToUnit(el.clientHeight);
        });
      }
      const transition = vue.computed(() => {
        const name = window.isReversed.value ? props.reverseTransition : props.transition;
        return !hasTransition.value ? false : {
          name: typeof name !== 'string' ? window.transition.value : name,
          onBeforeEnter: onBeforeTransition,
          onAfterEnter: onAfterTransition,
          onEnterCancelled: onTransitionCancelled,
          onBeforeLeave: onBeforeTransition,
          onAfterLeave: onAfterTransition,
          onLeaveCancelled: onTransitionCancelled,
          onEnter: onEnterTransition
        };
      });
      const {
        hasContent
      } = useLazy(props, groupItem.isSelected);
      useRender(() => vue.createVNode(MaybeTransition, {
        "transition": transition.value,
        "disabled": !isBooted.value
      }, {
        default: () => [vue.withDirectives(vue.createVNode("div", {
          "class": ['v-window-item', groupItem.selectedClass.value, props.class],
          "style": props.style
        }, [hasContent.value && slots.default?.()]), [[vue.vShow, groupItem.isSelected.value]])]
      }));
      return {};
    }
  });

  // Types

  const VCarouselItem = genericComponent()({
    name: 'VCarouselItem',
    inheritAttrs: false,
    props: {
      value: null,
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots,
        attrs
      } = _ref;
      useRender(() => vue.createVNode(VWindowItem, {
        "class": ['v-carousel-item', props.class],
        "style": props.style,
        "value": props.value
      }, {
        default: () => [vue.createVNode(VImg, attrs, slots)]
      }));
    }
  });

  const VCode = createSimpleFunctional('v-code');

  const makeVSheetProps = propsFactory({
    color: String,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, 'v-sheet');
  const VSheet = genericComponent()({
    name: 'VSheet',
    props: {
      ...makeVSheetProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const {
        borderClasses
      } = useBorder(props);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        roundedClasses
      } = useRounded(props);
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-sheet', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style]
      }, slots));
      return {};
    }
  });

  // Types

  const VColorPickerCanvas = defineComponent({
    name: 'VColorPickerCanvas',
    props: {
      color: {
        type: Object
      },
      disabled: Boolean,
      dotSize: {
        type: [Number, String],
        default: 10
      },
      height: {
        type: [Number, String],
        default: 150
      },
      width: {
        type: [Number, String],
        default: 300
      },
      ...makeComponentProps()
    },
    emits: {
      'update:color': color => true,
      'update:position': hue => true
    },
    setup(props, _ref) {
      let {
        emit
      } = _ref;
      const isInteracting = vue.ref(false);
      const isOutsideUpdate = vue.ref(false);
      const dotPosition = vue.ref({
        x: 0,
        y: 0
      });
      const dotStyles = vue.computed(() => {
        const {
          x,
          y
        } = dotPosition.value;
        const radius = parseInt(props.dotSize, 10) / 2;
        return {
          width: convertToUnit(props.dotSize),
          height: convertToUnit(props.dotSize),
          transform: `translate(${convertToUnit(x - radius)}, ${convertToUnit(y - radius)})`
        };
      });
      const canvasRef = vue.ref();
      const canvasWidth = vue.ref(parseFloat(props.width));
      const canvasHeight = vue.ref(parseFloat(props.height));
      const {
        resizeRef
      } = useResizeObserver(entries => {
        if (!resizeRef.value?.offsetParent) return;
        const {
          width,
          height
        } = entries[0].contentRect;
        canvasWidth.value = width;
        canvasHeight.value = height;
      });
      function updateDotPosition(x, y, rect) {
        const {
          left,
          top,
          width,
          height
        } = rect;
        dotPosition.value = {
          x: clamp(x - left, 0, width),
          y: clamp(y - top, 0, height)
        };
      }
      function handleClick(e) {
        if (props.disabled || !canvasRef.value) return;
        updateDotPosition(e.clientX, e.clientY, canvasRef.value.getBoundingClientRect());
      }
      function handleMouseDown(e) {
        // To prevent selection while moving cursor
        e.preventDefault();
        if (props.disabled) return;
        isInteracting.value = true;
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('touchend', handleMouseUp);
      }
      function handleMouseMove(e) {
        if (props.disabled || !canvasRef.value) return;
        isInteracting.value = true;
        const coords = getEventCoordinates(e);
        updateDotPosition(coords.clientX, coords.clientY, canvasRef.value.getBoundingClientRect());
      }
      function handleMouseUp() {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
      }
      vue.watch(dotPosition, () => {
        if (isOutsideUpdate.value) {
          isOutsideUpdate.value = false;
          return;
        }
        if (!canvasRef.value) return;
        const {
          x,
          y
        } = dotPosition.value;
        emit('update:color', {
          h: props.color?.h ?? 0,
          s: clamp(x, 0, canvasWidth.value) / canvasWidth.value,
          v: 1 - clamp(y, 0, canvasHeight.value) / canvasHeight.value,
          a: props.color?.a ?? 1
        });
      });
      function updateCanvas() {
        if (!canvasRef.value) return;
        const canvas = canvasRef.value;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        saturationGradient.addColorStop(0, 'hsla(0, 0%, 100%, 1)'); // white
        saturationGradient.addColorStop(1, `hsla(${props.color?.h ?? 0}, 100%, 50%, 1)`);
        ctx.fillStyle = saturationGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        valueGradient.addColorStop(0, 'hsla(0, 0%, 100%, 0)'); // transparent
        valueGradient.addColorStop(1, 'hsla(0, 0%, 0%, 1)'); // black
        ctx.fillStyle = valueGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      vue.watch(() => props.color?.h, updateCanvas, {
        immediate: true
      });
      vue.watch(() => [canvasWidth.value, canvasHeight.value], (newVal, oldVal) => {
        updateCanvas();
        dotPosition.value = {
          x: dotPosition.value.x * newVal[0] / oldVal[0],
          y: dotPosition.value.y * newVal[1] / oldVal[1]
        };
      }, {
        flush: 'post'
      });
      vue.watch(() => props.color, () => {
        if (isInteracting.value) {
          isInteracting.value = false;
          return;
        }
        isOutsideUpdate.value = true;
        dotPosition.value = props.color ? {
          x: props.color.s * canvasWidth.value,
          y: (1 - props.color.v) * canvasHeight.value
        } : {
          x: 0,
          y: 0
        };
      }, {
        deep: true,
        immediate: true
      });
      vue.onMounted(() => updateCanvas());
      useRender(() => vue.createVNode("div", {
        "ref": resizeRef,
        "class": ['v-color-picker-canvas', props.class],
        "style": props.style,
        "onClick": handleClick,
        "onMousedown": handleMouseDown,
        "onTouchstart": handleMouseDown
      }, [vue.createVNode("canvas", {
        "ref": canvasRef,
        "width": canvasWidth.value,
        "height": canvasHeight.value
      }, null), props.color && vue.createVNode("div", {
        "class": ['v-color-picker-canvas__dot', {
          'v-color-picker-canvas__dot--disabled': props.disabled
        }],
        "style": dotStyles.value
      }, null)]));
      return {};
    }
  });

  // Utilities

  // Types

  function has(obj, key) {
    return key.every(k => obj.hasOwnProperty(k));
  }
  function parseColor(color) {
    if (!color) return null;
    let hsva = null;
    if (typeof color === 'string') {
      const hex = parseHex(color);
      hsva = HexToHSV(hex);
    }
    if (typeof color === 'object') {
      if (has(color, ['r', 'g', 'b'])) {
        hsva = RGBtoHSV(color);
      } else if (has(color, ['h', 's', 'l'])) {
        hsva = HSLtoHSV(color);
      } else if (has(color, ['h', 's', 'v'])) {
        hsva = color;
      }
    }
    return hsva;
  }
  function stripAlpha(color, stripAlpha) {
    if (stripAlpha) {
      const {
        a,
        ...rest
      } = color;
      return rest;
    }
    return color;
  }
  function extractColor(color, input) {
    if (input == null || typeof input === 'string') {
      const hex = HSVtoHex(color);
      if (color.a === 1) return hex.slice(0, 7);else return hex;
    }
    if (typeof input === 'object') {
      let converted;
      if (has(input, ['r', 'g', 'b'])) converted = HSVtoRGB(color);else if (has(input, ['h', 's', 'l'])) converted = HSVtoHSL(color);else if (has(input, ['h', 's', 'v'])) converted = color;
      return stripAlpha(converted, !has(input, ['a']) && color.a === 1);
    }
    return color;
  }
  const nullColor = {
    h: 0,
    s: 0,
    v: 1,
    a: 1
  };
  const rgba = {
    inputProps: {
      type: 'number',
      min: 0
    },
    inputs: [{
      label: 'R',
      max: 255,
      step: 1,
      getValue: c => Math.round(c.r),
      getColor: (c, v) => ({
        ...c,
        r: Number(v)
      })
    }, {
      label: 'G',
      max: 255,
      step: 1,
      getValue: c => Math.round(c.g),
      getColor: (c, v) => ({
        ...c,
        g: Number(v)
      })
    }, {
      label: 'B',
      max: 255,
      step: 1,
      getValue: c => Math.round(c.b),
      getColor: (c, v) => ({
        ...c,
        b: Number(v)
      })
    }, {
      label: 'A',
      max: 1,
      step: 0.01,
      getValue: _ref => {
        let {
          a
        } = _ref;
        return a ? Math.round(a * 100) / 100 : 1;
      },
      getColor: (c, v) => ({
        ...c,
        a: Number(v)
      })
    }],
    to: HSVtoRGB,
    from: RGBtoHSV
  };
  const rgb = {
    ...rgba,
    inputs: rgba.inputs?.slice(0, 3)
  };
  const hsla = {
    inputProps: {
      type: 'number',
      min: 0
    },
    inputs: [{
      label: 'H',
      max: 360,
      step: 1,
      getValue: c => Math.round(c.h),
      getColor: (c, v) => ({
        ...c,
        h: Number(v)
      })
    }, {
      label: 'S',
      max: 1,
      step: 0.01,
      getValue: c => Math.round(c.s * 100) / 100,
      getColor: (c, v) => ({
        ...c,
        s: Number(v)
      })
    }, {
      label: 'L',
      max: 1,
      step: 0.01,
      getValue: c => Math.round(c.l * 100) / 100,
      getColor: (c, v) => ({
        ...c,
        l: Number(v)
      })
    }, {
      label: 'A',
      max: 1,
      step: 0.01,
      getValue: _ref2 => {
        let {
          a
        } = _ref2;
        return a ? Math.round(a * 100) / 100 : 1;
      },
      getColor: (c, v) => ({
        ...c,
        a: Number(v)
      })
    }],
    to: HSVtoHSL,
    from: HSLtoHSV
  };
  const hsl = {
    ...hsla,
    inputs: hsla.inputs.slice(0, 3)
  };
  const hexa = {
    inputProps: {
      type: 'text'
    },
    inputs: [{
      label: 'HEXA',
      getValue: c => c,
      getColor: (c, v) => v
    }],
    to: HSVtoHex,
    from: HexToHSV
  };
  const hex = {
    ...hexa,
    inputs: [{
      label: 'HEX',
      getValue: c => c.slice(0, 7),
      getColor: (c, v) => v
    }]
  };
  const modes = {
    rgb,
    rgba,
    hsl,
    hsla,
    hex,
    hexa
  };

  // Types

  const VColorPickerInput = _ref => {
    let {
      label,
      ...rest
    } = _ref;
    return vue.createVNode("div", {
      "class": "v-color-picker-edit__input"
    }, [vue.createVNode("input", rest, null), vue.createVNode("span", null, [label])]);
  };
  const VColorPickerEdit = defineComponent({
    name: 'VColorPickerEdit',
    props: {
      color: Object,
      disabled: Boolean,
      mode: {
        type: String,
        default: 'rgba',
        validator: v => Object.keys(modes).includes(v)
      },
      modes: {
        type: Array,
        default: () => Object.keys(modes),
        validator: v => Array.isArray(v) && v.every(m => Object.keys(modes).includes(m))
      },
      ...makeComponentProps()
    },
    emits: {
      'update:color': color => true,
      'update:mode': mode => true
    },
    setup(props, _ref2) {
      let {
        emit
      } = _ref2;
      const enabledModes = vue.computed(() => {
        return props.modes.map(key => ({
          ...modes[key],
          name: key
        }));
      });
      const inputs = vue.computed(() => {
        const mode = enabledModes.value.find(m => m.name === props.mode);
        if (!mode) return [];
        const color = props.color ? mode.to(props.color) : null;
        return mode.inputs?.map(_ref3 => {
          let {
            getValue,
            getColor,
            ...inputProps
          } = _ref3;
          return {
            ...mode.inputProps,
            ...inputProps,
            disabled: props.disabled,
            value: color && getValue(color),
            onChange: e => {
              const target = e.target;
              if (!target) return;
              emit('update:color', mode.from(getColor(color ?? nullColor, target.value)));
            }
          };
        });
      });
      useRender(() => vue.createVNode("div", {
        "class": ['v-color-picker-edit', props.class],
        "style": props.style
      }, [inputs.value?.map(props => vue.createVNode(VColorPickerInput, props, null)), enabledModes.value.length > 1 && vue.createVNode(VBtn, {
        "icon": "$unfold",
        "size": "x-small",
        "variant": "plain",
        "onClick": () => {
          const mi = enabledModes.value.findIndex(m => m.name === props.mode);
          emit('update:mode', enabledModes.value[(mi + 1) % enabledModes.value.length].name);
        }
      }, null)]));
      return {};
    }
  });

  /* eslint-disable max-statements */

  // Types

  const VSliderSymbol = Symbol.for('vuetify:v-slider');
  function getOffset(e, el, direction) {
    const vertical = direction === 'vertical';
    const rect = el.getBoundingClientRect();
    const touch = 'touches' in e ? e.touches[0] : e;
    return vertical ? touch.clientY - (rect.top + rect.height / 2) : touch.clientX - (rect.left + rect.width / 2);
  }
  function getPosition(e, position) {
    if ('touches' in e && e.touches.length) return e.touches[0][position];else if ('changedTouches' in e && e.changedTouches.length) return e.changedTouches[0][position];else return e[position];
  }
  const makeSliderProps = propsFactory({
    disabled: Boolean,
    error: Boolean,
    readonly: Boolean,
    max: {
      type: [Number, String],
      default: 100
    },
    min: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: [Number, String],
      default: 0
    },
    thumbColor: String,
    thumbLabel: {
      type: [Boolean, String],
      default: undefined,
      validator: v => typeof v === 'boolean' || v === 'always'
    },
    thumbSize: {
      type: [Number, String],
      default: 20
    },
    showTicks: {
      type: [Boolean, String],
      default: false,
      validator: v => typeof v === 'boolean' || v === 'always'
    },
    ticks: {
      type: [Array, Object]
    },
    tickSize: {
      type: [Number, String],
      default: 2
    },
    color: String,
    trackColor: String,
    trackFillColor: String,
    trackSize: {
      type: [Number, String],
      default: 4
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: v => ['vertical', 'horizontal'].includes(v)
    },
    reverse: Boolean,
    ...makeRoundedProps(),
    ...makeElevationProps({
      elevation: 2
    })
  }, 'slider');
  const useSteps = props => {
    const min = vue.computed(() => parseFloat(props.min));
    const max = vue.computed(() => parseFloat(props.max));
    const step = vue.computed(() => +props.step > 0 ? parseFloat(props.step) : 0);
    const decimals = vue.computed(() => Math.max(getDecimals(step.value), getDecimals(min.value)));
    function roundValue(value) {
      if (step.value <= 0) return value;
      const clamped = clamp(value, min.value, max.value);
      const offset = min.value % step.value;
      const newValue = Math.round((clamped - offset) / step.value) * step.value + offset;
      return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value));
    }
    return {
      min,
      max,
      step,
      decimals,
      roundValue
    };
  };
  const useSlider = _ref => {
    let {
      props,
      steps,
      onSliderStart,
      onSliderMove,
      onSliderEnd,
      getActiveThumb
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const isReversed = vue.toRef(props, 'reverse');
    const horizontalDirection = vue.computed(() => {
      let hd = isRtl.value ? 'rtl' : 'ltr';
      if (props.reverse) {
        hd = hd === 'rtl' ? 'ltr' : 'rtl';
      }
      return hd;
    });
    const {
      min,
      max,
      step,
      decimals,
      roundValue
    } = steps;
    const thumbSize = vue.computed(() => parseInt(props.thumbSize, 10));
    const tickSize = vue.computed(() => parseInt(props.tickSize, 10));
    const trackSize = vue.computed(() => parseInt(props.trackSize, 10));
    const numTicks = vue.computed(() => (max.value - min.value) / step.value);
    const disabled = vue.toRef(props, 'disabled');
    const vertical = vue.computed(() => props.direction === 'vertical');
    const thumbColor = vue.computed(() => props.error || props.disabled ? undefined : props.thumbColor ?? props.color);
    const trackColor = vue.computed(() => props.error || props.disabled ? undefined : props.trackColor ?? props.color);
    const trackFillColor = vue.computed(() => props.error || props.disabled ? undefined : props.trackFillColor ?? props.color);
    const mousePressed = vue.ref(false);
    const startOffset = vue.ref(0);
    const trackContainerRef = vue.ref();
    const activeThumbRef = vue.ref();
    function parseMouseMove(e) {
      const vertical = props.direction === 'vertical';
      const start = vertical ? 'top' : 'left';
      const length = vertical ? 'height' : 'width';
      const position = vertical ? 'clientY' : 'clientX';
      const {
        [start]: trackStart,
        [length]: trackLength
      } = trackContainerRef.value?.$el.getBoundingClientRect();
      const clickOffset = getPosition(e, position);

      // It is possible for left to be NaN, force to number
      let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0;
      if (vertical || horizontalDirection.value === 'rtl') clickPos = 1 - clickPos;
      return roundValue(min.value + clickPos * (max.value - min.value));
    }
    const handleStop = e => {
      onSliderEnd({
        value: parseMouseMove(e)
      });
      mousePressed.value = false;
      startOffset.value = 0;
    };
    const handleStart = e => {
      activeThumbRef.value = getActiveThumb(e);
      if (!activeThumbRef.value) return;
      activeThumbRef.value.focus();
      mousePressed.value = true;
      if (activeThumbRef.value.contains(e.target)) {
        startOffset.value = getOffset(e, activeThumbRef.value, props.direction);
      } else {
        startOffset.value = 0;
        onSliderMove({
          value: parseMouseMove(e)
        });
      }
      onSliderStart({
        value: parseMouseMove(e)
      });
    };
    const moveListenerOptions = {
      passive: true,
      capture: true
    };
    function onMouseMove(e) {
      onSliderMove({
        value: parseMouseMove(e)
      });
    }
    function onSliderMouseUp(e) {
      e.stopPropagation();
      e.preventDefault();
      handleStop(e);
      window.removeEventListener('mousemove', onMouseMove, moveListenerOptions);
      window.removeEventListener('mouseup', onSliderMouseUp);
    }
    function onSliderTouchend(e) {
      handleStop(e);
      window.removeEventListener('touchmove', onMouseMove, moveListenerOptions);
      e.target?.removeEventListener('touchend', onSliderTouchend);
    }
    function onSliderTouchstart(e) {
      handleStart(e);
      window.addEventListener('touchmove', onMouseMove, moveListenerOptions);
      e.target?.addEventListener('touchend', onSliderTouchend, {
        passive: false
      });
    }
    function onSliderMousedown(e) {
      e.preventDefault();
      handleStart(e);
      window.addEventListener('mousemove', onMouseMove, moveListenerOptions);
      window.addEventListener('mouseup', onSliderMouseUp, {
        passive: false
      });
    }
    const position = val => {
      const percentage = (val - min.value) / (max.value - min.value) * 100;
      return clamp(isNaN(percentage) ? 0 : percentage, 0, 100);
    };
    const showTicks = vue.toRef(props, 'showTicks');
    const parsedTicks = vue.computed(() => {
      if (!showTicks.value) return [];
      if (!props.ticks) {
        return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map(t => {
          const value = min.value + t * step.value;
          return {
            value,
            position: position(value)
          };
        }) : [];
      }
      if (Array.isArray(props.ticks)) return props.ticks.map(t => ({
        value: t,
        position: position(t),
        label: t.toString()
      }));
      return Object.keys(props.ticks).map(key => ({
        value: parseFloat(key),
        position: position(parseFloat(key)),
        label: props.ticks[key]
      }));
    });
    const hasLabels = vue.computed(() => parsedTicks.value.some(_ref2 => {
      let {
        label
      } = _ref2;
      return !!label;
    }));
    const data = {
      activeThumbRef,
      color: vue.toRef(props, 'color'),
      decimals,
      disabled,
      direction: vue.toRef(props, 'direction'),
      elevation: vue.toRef(props, 'elevation'),
      hasLabels,
      horizontalDirection,
      isReversed,
      min,
      max,
      mousePressed,
      numTicks,
      onSliderMousedown,
      onSliderTouchstart,
      parsedTicks,
      parseMouseMove,
      position,
      readonly: vue.toRef(props, 'readonly'),
      rounded: vue.toRef(props, 'rounded'),
      roundValue,
      showTicks,
      startOffset,
      step,
      thumbSize,
      thumbColor,
      thumbLabel: vue.toRef(props, 'thumbLabel'),
      ticks: vue.toRef(props, 'ticks'),
      tickSize,
      trackColor,
      trackContainerRef,
      trackFillColor,
      trackSize,
      vertical
    };
    vue.provide(VSliderSymbol, data);
    return data;
  };

  const VSliderThumb = genericComponent()({
    name: 'VSliderThumb',
    directives: {
      Ripple
    },
    props: {
      focused: Boolean,
      max: {
        type: Number,
        required: true
      },
      min: {
        type: Number,
        required: true
      },
      modelValue: {
        type: Number,
        required: true
      },
      position: {
        type: Number,
        required: true
      },
      ripple: {
        type: Boolean,
        default: true
      },
      ...makeComponentProps()
    },
    emits: {
      'update:modelValue': v => true
    },
    setup(props, _ref) {
      let {
        slots,
        emit
      } = _ref;
      const slider = vue.inject(VSliderSymbol);
      if (!slider) throw new Error('[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider');
      const {
        thumbColor,
        step,
        vertical,
        disabled,
        thumbSize,
        thumbLabel,
        direction,
        readonly,
        elevation,
        isReversed,
        horizontalDirection,
        mousePressed,
        decimals
      } = slider;
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(thumbColor);
      const {
        pageup,
        pagedown,
        end,
        home,
        left,
        right,
        down,
        up
      } = keyValues;
      const relevantKeys = [pageup, pagedown, end, home, left, right, down, up];
      const multipliers = vue.computed(() => {
        if (step.value) return [1, 2, 3];else return [1, 5, 10];
      });
      function parseKeydown(e, value) {
        if (!relevantKeys.includes(e.key)) return;
        e.preventDefault();
        const _step = step.value || 0.1;
        const steps = (props.max - props.min) / _step;
        if ([left, right, down, up].includes(e.key)) {
          const increase = horizontalDirection.value === 'rtl' ? [left, up] : [right, up];
          const direction = increase.includes(e.key) ? 1 : -1;
          const multiplier = e.shiftKey ? 2 : e.ctrlKey ? 1 : 0;
          value = value + direction * _step * multipliers.value[multiplier];
        } else if (e.key === home) {
          value = props.min;
        } else if (e.key === end) {
          value = props.max;
        } else {
          const direction = e.key === pagedown ? 1 : -1;
          value = value - direction * _step * (steps > 100 ? steps / 10 : 10);
        }
        return Math.max(props.min, Math.min(props.max, value));
      }
      function onKeydown(e) {
        const newValue = parseKeydown(e, props.modelValue);
        newValue != null && emit('update:modelValue', newValue);
      }
      useRender(() => {
        const positionPercentage = convertToUnit(vertical.value || isReversed.value ? 100 - props.position : props.position, '%');
        const {
          elevationClasses
        } = useElevation(vue.computed(() => !disabled.value ? elevation.value : undefined));
        return vue.createVNode("div", {
          "class": ['v-slider-thumb', {
            'v-slider-thumb--focused': props.focused,
            'v-slider-thumb--pressed': props.focused && mousePressed.value
          }, props.class],
          "style": [{
            '--v-slider-thumb-position': positionPercentage,
            '--v-slider-thumb-size': convertToUnit(thumbSize.value)
          }, props.style],
          "role": "slider",
          "tabindex": disabled.value ? -1 : 0,
          "aria-valuemin": props.min,
          "aria-valuemax": props.max,
          "aria-valuenow": props.modelValue,
          "aria-readonly": readonly.value,
          "aria-orientation": direction.value,
          "onKeydown": !readonly.value ? onKeydown : undefined
        }, [vue.createVNode("div", {
          "class": ['v-slider-thumb__surface', textColorClasses.value, elevationClasses.value],
          "style": {
            ...textColorStyles.value
          }
        }, null), vue.withDirectives(vue.createVNode("div", {
          "class": ['v-slider-thumb__ripple', textColorClasses.value],
          "style": textColorStyles.value
        }, null), [[vue.resolveDirective("ripple"), props.ripple, null, {
          circle: true,
          center: true
        }]]), vue.createVNode(VScaleTransition, {
          "origin": "bottom center"
        }, {
          default: () => [vue.withDirectives(vue.createVNode("div", {
            "class": "v-slider-thumb__label-container"
          }, [vue.createVNode("div", {
            "class": ['v-slider-thumb__label']
          }, [vue.createVNode("div", null, [slots['thumb-label']?.({
            modelValue: props.modelValue
          }) ?? props.modelValue.toFixed(step.value ? decimals.value : 1)])])]), [[vue.vShow, thumbLabel.value && props.focused || thumbLabel.value === 'always']])]
        })]);
      });
      return {};
    }
  });

  const VSliderTrack = genericComponent()({
    name: 'VSliderTrack',
    props: {
      start: {
        type: Number,
        required: true
      },
      stop: {
        type: Number,
        required: true
      },
      ...makeComponentProps()
    },
    emits: {},
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const slider = vue.inject(VSliderSymbol);
      if (!slider) throw new Error('[Vuetify] v-slider-track must be inside v-slider or v-range-slider');
      const {
        color,
        horizontalDirection,
        parsedTicks,
        rounded,
        showTicks,
        tickSize,
        trackColor,
        trackFillColor,
        trackSize,
        vertical,
        min,
        max
      } = slider;
      const {
        roundedClasses
      } = useRounded(rounded);
      const {
        backgroundColorClasses: trackFillColorClasses,
        backgroundColorStyles: trackFillColorStyles
      } = useBackgroundColor(trackFillColor);
      const {
        backgroundColorClasses: trackColorClasses,
        backgroundColorStyles: trackColorStyles
      } = useBackgroundColor(trackColor);
      const startDir = vue.computed(() => `inset-${vertical.value ? 'block-end' : 'inline-start'}`);
      const endDir = vue.computed(() => vertical.value ? 'height' : 'width');
      const backgroundStyles = vue.computed(() => {
        return {
          [startDir.value]: '0%',
          [endDir.value]: '100%'
        };
      });
      const trackFillWidth = vue.computed(() => props.stop - props.start);
      const trackFillStyles = vue.computed(() => {
        return {
          [startDir.value]: convertToUnit(props.start, '%'),
          [endDir.value]: convertToUnit(trackFillWidth.value, '%')
        };
      });
      const computedTicks = vue.computed(() => {
        if (!showTicks.value) return [];
        const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
        return ticks.map((tick, index) => {
          const directionProperty = vertical.value ? 'bottom' : 'margin-inline-start';
          const directionValue = tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, '%') : undefined;
          return vue.createVNode("div", {
            "key": tick.value,
            "class": ['v-slider-track__tick', {
              'v-slider-track__tick--filled': tick.position >= props.start && tick.position <= props.stop,
              'v-slider-track__tick--first': tick.value === min.value,
              'v-slider-track__tick--last': tick.value === max.value
            }],
            "style": {
              [directionProperty]: directionValue
            }
          }, [(tick.label || slots['tick-label']) && vue.createVNode("div", {
            "class": "v-slider-track__tick-label"
          }, [slots['tick-label']?.({
            tick,
            index
          }) ?? tick.label])]);
        });
      });
      useRender(() => {
        return vue.createVNode("div", {
          "class": ['v-slider-track', roundedClasses.value, props.class],
          "style": [{
            '--v-slider-track-size': convertToUnit(trackSize.value),
            '--v-slider-tick-size': convertToUnit(tickSize.value),
            direction: !vertical.value ? horizontalDirection.value : undefined
          }, props.style]
        }, [vue.createVNode("div", {
          "class": ['v-slider-track__background', trackColorClasses.value, {
            'v-slider-track__background--opacity': !!color.value || !trackFillColor.value
          }],
          "style": {
            ...backgroundStyles.value,
            ...trackColorStyles.value
          }
        }, null), vue.createVNode("div", {
          "class": ['v-slider-track__fill', trackFillColorClasses.value],
          "style": {
            ...trackFillStyles.value,
            ...trackFillColorStyles.value
          }
        }, null), showTicks.value && vue.createVNode("div", {
          "class": ['v-slider-track__ticks', {
            'v-slider-track__ticks--always-show': showTicks.value === 'always'
          }]
        }, [computedTicks.value])]);
      });
      return {};
    }
  });

  // Types

  const VSlider = genericComponent()({
    name: 'VSlider',
    props: {
      ...makeFocusProps(),
      ...makeSliderProps(),
      ...makeVInputProps(),
      modelValue: {
        type: [Number, String],
        default: 0
      }
    },
    emits: {
      'update:focused': value => true,
      'update:modelValue': v => true,
      start: value => true,
      end: value => true
    },
    setup(props, _ref) {
      let {
        slots,
        emit
      } = _ref;
      const thumbContainerRef = vue.ref();
      const steps = useSteps(props);
      const model = useProxiedModel(props, 'modelValue', undefined, v => {
        const value = typeof v === 'string' ? parseFloat(v) : v == null ? steps.min.value : v;
        return steps.roundValue(value);
      });
      const {
        min,
        max,
        mousePressed,
        roundValue,
        onSliderMousedown,
        onSliderTouchstart,
        trackContainerRef,
        position,
        hasLabels,
        readonly
      } = useSlider({
        props,
        steps,
        onSliderStart: () => {
          emit('start', model.value);
        },
        onSliderEnd: _ref2 => {
          let {
            value
          } = _ref2;
          const roundedValue = roundValue(value);
          model.value = roundedValue;
          emit('end', roundedValue);
        },
        onSliderMove: _ref3 => {
          let {
            value
          } = _ref3;
          return model.value = roundValue(value);
        },
        getActiveThumb: () => thumbContainerRef.value?.$el
      });
      const {
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const trackStop = vue.computed(() => position(model.value));
      useRender(() => {
        const [inputProps, _] = VInput.filterProps(props);
        const hasPrepend = !!(props.label || slots.label || slots.prepend);
        return vue.createVNode(VInput, vue.mergeProps({
          "class": ['v-slider', {
            'v-slider--has-labels': !!slots['tick-label'] || hasLabels.value,
            'v-slider--focused': isFocused.value,
            'v-slider--pressed': mousePressed.value,
            'v-slider--disabled': props.disabled
          }, props.class],
          "style": props.style
        }, inputProps, {
          "focused": isFocused.value
        }), {
          ...slots,
          prepend: hasPrepend ? slotProps => vue.createVNode(vue.Fragment, null, [slots.label?.(slotProps) ?? props.label ? vue.createVNode(VLabel, {
            "id": slotProps.id.value,
            "class": "v-slider__label",
            "text": props.label
          }, null) : undefined, slots.prepend?.(slotProps)]) : undefined,
          default: _ref4 => {
            let {
              id,
              messagesId
            } = _ref4;
            return vue.createVNode("div", {
              "class": "v-slider__container",
              "onMousedown": !readonly.value ? onSliderMousedown : undefined,
              "onTouchstartPassive": !readonly.value ? onSliderTouchstart : undefined
            }, [vue.createVNode("input", {
              "id": id.value,
              "name": props.name || id.value,
              "disabled": props.disabled,
              "readonly": props.readonly,
              "tabindex": "-1",
              "value": model.value
            }, null), vue.createVNode(VSliderTrack, {
              "ref": trackContainerRef,
              "start": 0,
              "stop": trackStop.value
            }, {
              'tick-label': slots['tick-label']
            }), vue.createVNode(VSliderThumb, {
              "ref": thumbContainerRef,
              "aria-describedby": messagesId.value,
              "focused": isFocused.value,
              "min": min.value,
              "max": max.value,
              "modelValue": model.value,
              "onUpdate:modelValue": v => model.value = v,
              "position": trackStop.value,
              "elevation": props.elevation,
              "onFocus": focus,
              "onBlur": blur
            }, {
              'thumb-label': slots['thumb-label']
            })]);
          }
        });
      });
      return {};
    }
  });

  // Types

  const VColorPickerPreview = defineComponent({
    name: 'VColorPickerPreview',
    props: {
      color: {
        type: Object
      },
      disabled: Boolean,
      hideAlpha: Boolean,
      ...makeComponentProps()
    },
    emits: {
      'update:color': color => true
    },
    setup(props, _ref) {
      let {
        emit
      } = _ref;
      useRender(() => vue.createVNode("div", {
        "class": ['v-color-picker-preview', {
          'v-color-picker-preview--hide-alpha': props.hideAlpha
        }, props.class],
        "style": props.style
      }, [vue.createVNode("div", {
        "class": "v-color-picker-preview__dot"
      }, [vue.createVNode("div", {
        "style": {
          background: HSVtoCSS(props.color ?? nullColor)
        }
      }, null)]), vue.createVNode("div", {
        "class": "v-color-picker-preview__sliders"
      }, [vue.createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__hue",
        "modelValue": props.color?.h,
        "onUpdate:modelValue": h => emit('update:color', {
          ...(props.color ?? nullColor),
          h
        }),
        "step": 0,
        "min": 0,
        "max": 360,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null), !props.hideAlpha && vue.createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__alpha",
        "modelValue": props.color?.a ?? 1,
        "onUpdate:modelValue": a => emit('update:color', {
          ...(props.color ?? nullColor),
          a
        }),
        "step": 1 / 256,
        "min": 0,
        "max": 1,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null)])]));
      return {};
    }
  });

  const red = Object.freeze({
    base: '#f44336',
    lighten5: '#ffebee',
    lighten4: '#ffcdd2',
    lighten3: '#ef9a9a',
    lighten2: '#e57373',
    lighten1: '#ef5350',
    darken1: '#e53935',
    darken2: '#d32f2f',
    darken3: '#c62828',
    darken4: '#b71c1c',
    accent1: '#ff8a80',
    accent2: '#ff5252',
    accent3: '#ff1744',
    accent4: '#d50000'
  });
  const pink = Object.freeze({
    base: '#e91e63',
    lighten5: '#fce4ec',
    lighten4: '#f8bbd0',
    lighten3: '#f48fb1',
    lighten2: '#f06292',
    lighten1: '#ec407a',
    darken1: '#d81b60',
    darken2: '#c2185b',
    darken3: '#ad1457',
    darken4: '#880e4f',
    accent1: '#ff80ab',
    accent2: '#ff4081',
    accent3: '#f50057',
    accent4: '#c51162'
  });
  const purple = Object.freeze({
    base: '#9c27b0',
    lighten5: '#f3e5f5',
    lighten4: '#e1bee7',
    lighten3: '#ce93d8',
    lighten2: '#ba68c8',
    lighten1: '#ab47bc',
    darken1: '#8e24aa',
    darken2: '#7b1fa2',
    darken3: '#6a1b9a',
    darken4: '#4a148c',
    accent1: '#ea80fc',
    accent2: '#e040fb',
    accent3: '#d500f9',
    accent4: '#aa00ff'
  });
  const deepPurple = Object.freeze({
    base: '#673ab7',
    lighten5: '#ede7f6',
    lighten4: '#d1c4e9',
    lighten3: '#b39ddb',
    lighten2: '#9575cd',
    lighten1: '#7e57c2',
    darken1: '#5e35b1',
    darken2: '#512da8',
    darken3: '#4527a0',
    darken4: '#311b92',
    accent1: '#b388ff',
    accent2: '#7c4dff',
    accent3: '#651fff',
    accent4: '#6200ea'
  });
  const indigo = Object.freeze({
    base: '#3f51b5',
    lighten5: '#e8eaf6',
    lighten4: '#c5cae9',
    lighten3: '#9fa8da',
    lighten2: '#7986cb',
    lighten1: '#5c6bc0',
    darken1: '#3949ab',
    darken2: '#303f9f',
    darken3: '#283593',
    darken4: '#1a237e',
    accent1: '#8c9eff',
    accent2: '#536dfe',
    accent3: '#3d5afe',
    accent4: '#304ffe'
  });
  const blue = Object.freeze({
    base: '#2196f3',
    lighten5: '#e3f2fd',
    lighten4: '#bbdefb',
    lighten3: '#90caf9',
    lighten2: '#64b5f6',
    lighten1: '#42a5f5',
    darken1: '#1e88e5',
    darken2: '#1976d2',
    darken3: '#1565c0',
    darken4: '#0d47a1',
    accent1: '#82b1ff',
    accent2: '#448aff',
    accent3: '#2979ff',
    accent4: '#2962ff'
  });
  const lightBlue = Object.freeze({
    base: '#03a9f4',
    lighten5: '#e1f5fe',
    lighten4: '#b3e5fc',
    lighten3: '#81d4fa',
    lighten2: '#4fc3f7',
    lighten1: '#29b6f6',
    darken1: '#039be5',
    darken2: '#0288d1',
    darken3: '#0277bd',
    darken4: '#01579b',
    accent1: '#80d8ff',
    accent2: '#40c4ff',
    accent3: '#00b0ff',
    accent4: '#0091ea'
  });
  const cyan = Object.freeze({
    base: '#00bcd4',
    lighten5: '#e0f7fa',
    lighten4: '#b2ebf2',
    lighten3: '#80deea',
    lighten2: '#4dd0e1',
    lighten1: '#26c6da',
    darken1: '#00acc1',
    darken2: '#0097a7',
    darken3: '#00838f',
    darken4: '#006064',
    accent1: '#84ffff',
    accent2: '#18ffff',
    accent3: '#00e5ff',
    accent4: '#00b8d4'
  });
  const teal = Object.freeze({
    base: '#009688',
    lighten5: '#e0f2f1',
    lighten4: '#b2dfdb',
    lighten3: '#80cbc4',
    lighten2: '#4db6ac',
    lighten1: '#26a69a',
    darken1: '#00897b',
    darken2: '#00796b',
    darken3: '#00695c',
    darken4: '#004d40',
    accent1: '#a7ffeb',
    accent2: '#64ffda',
    accent3: '#1de9b6',
    accent4: '#00bfa5'
  });
  const green = Object.freeze({
    base: '#4caf50',
    lighten5: '#e8f5e9',
    lighten4: '#c8e6c9',
    lighten3: '#a5d6a7',
    lighten2: '#81c784',
    lighten1: '#66bb6a',
    darken1: '#43a047',
    darken2: '#388e3c',
    darken3: '#2e7d32',
    darken4: '#1b5e20',
    accent1: '#b9f6ca',
    accent2: '#69f0ae',
    accent3: '#00e676',
    accent4: '#00c853'
  });
  const lightGreen = Object.freeze({
    base: '#8bc34a',
    lighten5: '#f1f8e9',
    lighten4: '#dcedc8',
    lighten3: '#c5e1a5',
    lighten2: '#aed581',
    lighten1: '#9ccc65',
    darken1: '#7cb342',
    darken2: '#689f38',
    darken3: '#558b2f',
    darken4: '#33691e',
    accent1: '#ccff90',
    accent2: '#b2ff59',
    accent3: '#76ff03',
    accent4: '#64dd17'
  });
  const lime = Object.freeze({
    base: '#cddc39',
    lighten5: '#f9fbe7',
    lighten4: '#f0f4c3',
    lighten3: '#e6ee9c',
    lighten2: '#dce775',
    lighten1: '#d4e157',
    darken1: '#c0ca33',
    darken2: '#afb42b',
    darken3: '#9e9d24',
    darken4: '#827717',
    accent1: '#f4ff81',
    accent2: '#eeff41',
    accent3: '#c6ff00',
    accent4: '#aeea00'
  });
  const yellow = Object.freeze({
    base: '#ffeb3b',
    lighten5: '#fffde7',
    lighten4: '#fff9c4',
    lighten3: '#fff59d',
    lighten2: '#fff176',
    lighten1: '#ffee58',
    darken1: '#fdd835',
    darken2: '#fbc02d',
    darken3: '#f9a825',
    darken4: '#f57f17',
    accent1: '#ffff8d',
    accent2: '#ffff00',
    accent3: '#ffea00',
    accent4: '#ffd600'
  });
  const amber = Object.freeze({
    base: '#ffc107',
    lighten5: '#fff8e1',
    lighten4: '#ffecb3',
    lighten3: '#ffe082',
    lighten2: '#ffd54f',
    lighten1: '#ffca28',
    darken1: '#ffb300',
    darken2: '#ffa000',
    darken3: '#ff8f00',
    darken4: '#ff6f00',
    accent1: '#ffe57f',
    accent2: '#ffd740',
    accent3: '#ffc400',
    accent4: '#ffab00'
  });
  const orange = Object.freeze({
    base: '#ff9800',
    lighten5: '#fff3e0',
    lighten4: '#ffe0b2',
    lighten3: '#ffcc80',
    lighten2: '#ffb74d',
    lighten1: '#ffa726',
    darken1: '#fb8c00',
    darken2: '#f57c00',
    darken3: '#ef6c00',
    darken4: '#e65100',
    accent1: '#ffd180',
    accent2: '#ffab40',
    accent3: '#ff9100',
    accent4: '#ff6d00'
  });
  const deepOrange = Object.freeze({
    base: '#ff5722',
    lighten5: '#fbe9e7',
    lighten4: '#ffccbc',
    lighten3: '#ffab91',
    lighten2: '#ff8a65',
    lighten1: '#ff7043',
    darken1: '#f4511e',
    darken2: '#e64a19',
    darken3: '#d84315',
    darken4: '#bf360c',
    accent1: '#ff9e80',
    accent2: '#ff6e40',
    accent3: '#ff3d00',
    accent4: '#dd2c00'
  });
  const brown = Object.freeze({
    base: '#795548',
    lighten5: '#efebe9',
    lighten4: '#d7ccc8',
    lighten3: '#bcaaa4',
    lighten2: '#a1887f',
    lighten1: '#8d6e63',
    darken1: '#6d4c41',
    darken2: '#5d4037',
    darken3: '#4e342e',
    darken4: '#3e2723'
  });
  const blueGrey = Object.freeze({
    base: '#607d8b',
    lighten5: '#eceff1',
    lighten4: '#cfd8dc',
    lighten3: '#b0bec5',
    lighten2: '#90a4ae',
    lighten1: '#78909c',
    darken1: '#546e7a',
    darken2: '#455a64',
    darken3: '#37474f',
    darken4: '#263238'
  });
  const grey = Object.freeze({
    base: '#9e9e9e',
    lighten5: '#fafafa',
    lighten4: '#f5f5f5',
    lighten3: '#eeeeee',
    lighten2: '#e0e0e0',
    lighten1: '#bdbdbd',
    darken1: '#757575',
    darken2: '#616161',
    darken3: '#424242',
    darken4: '#212121'
  });
  const shades = Object.freeze({
    black: '#000000',
    white: '#ffffff',
    transparent: '#ffffff00'
  });
  var colors = Object.freeze({
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    deepOrange,
    brown,
    blueGrey,
    grey,
    shades
  });

  // Types

  function parseDefaultColors(colors) {
    return Object.keys(colors).map(key => {
      const color = colors[key];
      return color.base ? [color.base, color.darken4, color.darken3, color.darken2, color.darken1, color.lighten1, color.lighten2, color.lighten3, color.lighten4, color.lighten5] : [color.black, color.white, color.transparent];
    });
  }
  const VColorPickerSwatches = defineComponent({
    name: 'VColorPickerSwatches',
    props: {
      swatches: {
        type: Array,
        default: () => parseDefaultColors(colors)
      },
      disabled: Boolean,
      color: Object,
      maxHeight: [Number, String],
      ...makeComponentProps()
    },
    emits: {
      'update:color': color => true
    },
    setup(props, _ref) {
      let {
        emit
      } = _ref;
      useRender(() => vue.createVNode("div", {
        "class": ['v-color-picker-swatches', props.class],
        "style": [{
          maxHeight: convertToUnit(props.maxHeight)
        }, props.style]
      }, [vue.createVNode("div", null, [props.swatches.map(swatch => vue.createVNode("div", {
        "class": "v-color-picker-swatches__swatch"
      }, [swatch.map(color => {
        const hsva = parseColor(color);
        return vue.createVNode("div", {
          "class": "v-color-picker-swatches__color",
          "onClick": () => hsva && emit('update:color', hsva)
        }, [vue.createVNode("div", {
          "style": {
            background: color
          }
        }, [props.color && deepEqual(props.color, hsva) ? vue.createVNode(VIcon, {
          "size": "x-small",
          "icon": "$success",
          "color": getContrast(color, '#FFFFFF') > 2 ? 'white' : 'black'
        }, null) : undefined])]);
      })]))])]));
      return {};
    }
  });

  // Types

  const VColorPicker = defineComponent({
    name: 'VColorPicker',
    props: {
      canvasHeight: {
        type: [String, Number],
        default: 150
      },
      disabled: Boolean,
      dotSize: {
        type: [Number, String],
        default: 10
      },
      hideCanvas: Boolean,
      hideSliders: Boolean,
      hideInputs: Boolean,
      mode: {
        type: String,
        default: 'rgba',
        validator: v => Object.keys(modes).includes(v)
      },
      modes: {
        type: Array,
        default: () => Object.keys(modes),
        validator: v => Array.isArray(v) && v.every(m => Object.keys(modes).includes(m))
      },
      showSwatches: Boolean,
      swatches: Array,
      swatchesMaxHeight: {
        type: [Number, String],
        default: 150
      },
      modelValue: {
        type: [Object, String]
      },
      ...omit(makeVSheetProps({
        width: 300
      }), ['height', 'location', 'minHeight', 'maxHeight', 'minWidth', 'maxWidth'])
    },
    emits: {
      'update:modelValue': color => true,
      'update:mode': mode => true
    },
    setup(props) {
      const mode = useProxiedModel(props, 'mode');
      const lastPickedColor = vue.ref(null);
      const currentColor = useProxiedModel(props, 'modelValue', undefined, v => {
        let c = parseColor(v);
        if (!c) return null;
        if (lastPickedColor.value) {
          c = {
            ...c,
            h: lastPickedColor.value.h
          };
          lastPickedColor.value = null;
        }
        return c;
      }, v => {
        if (!v) return null;
        return extractColor(v, props.modelValue);
      });
      const updateColor = hsva => {
        currentColor.value = hsva;
        lastPickedColor.value = hsva;
      };
      vue.onMounted(() => {
        if (!props.modes.includes(mode.value)) mode.value = props.modes[0];
      });
      provideDefaults({
        VSlider: {
          color: undefined,
          trackColor: undefined,
          trackFillColor: undefined
        }
      });
      useRender(() => {
        const [sheetProps] = VSheet.filterProps(props);
        return vue.createVNode(VSheet, vue.mergeProps({
          "rounded": props.rounded,
          "elevation": props.elevation,
          "theme": props.theme,
          "class": ['v-color-picker', props.class],
          "style": [{
            '--v-color-picker-color-hsv': HSVtoCSS({
              ...(currentColor.value ?? nullColor),
              a: 1
            })
          }, props.style]
        }, sheetProps, {
          "maxWidth": props.width
        }), {
          default: () => [!props.hideCanvas && vue.createVNode(VColorPickerCanvas, {
            "key": "canvas",
            "color": currentColor.value,
            "onUpdate:color": updateColor,
            "disabled": props.disabled,
            "dotSize": props.dotSize,
            "width": props.width,
            "height": props.canvasHeight
          }, null), (!props.hideSliders || !props.hideInputs) && vue.createVNode("div", {
            "key": "controls",
            "class": "v-color-picker__controls"
          }, [!props.hideSliders && vue.createVNode(VColorPickerPreview, {
            "key": "preview",
            "color": currentColor.value,
            "onUpdate:color": updateColor,
            "hideAlpha": !mode.value.endsWith('a'),
            "disabled": props.disabled
          }, null), !props.hideInputs && vue.createVNode(VColorPickerEdit, {
            "key": "edit",
            "modes": props.modes,
            "mode": mode.value,
            "onUpdate:mode": m => mode.value = m,
            "color": currentColor.value,
            "onUpdate:color": updateColor,
            "disabled": props.disabled
          }, null)]), props.showSwatches && vue.createVNode(VColorPickerSwatches, {
            "key": "swatches",
            "color": currentColor.value,
            "onUpdate:color": updateColor,
            "maxHeight": props.swatchesMaxHeight,
            "swatches": props.swatches,
            "disabled": props.disabled
          }, null)]
        });
      });
      return {};
    }
  });

  // Types

  function highlightResult(text, matches, length) {
    if (matches == null) return text;
    if (Array.isArray(matches)) throw new Error('Multiple matches is not implemented');
    return typeof matches === 'number' && ~matches ? vue.createVNode(vue.Fragment, null, [vue.createVNode("span", {
      "class": "v-combobox__unmask"
    }, [text.substr(0, matches)]), vue.createVNode("span", {
      "class": "v-combobox__mask"
    }, [text.substr(matches, length)]), vue.createVNode("span", {
      "class": "v-combobox__unmask"
    }, [text.substr(matches + length)])]) : text;
  }
  const VCombobox = genericComponent()({
    name: 'VCombobox',
    props: {
      // TODO: implement post keyboard support
      // autoSelectFirst: Boolean,
      delimiters: Array,
      ...makeFilterProps({
        filterKeys: ['title']
      }),
      ...makeSelectProps({
        hideNoData: true,
        returnObject: true
      }),
      ...omit(makeVTextFieldProps({
        modelValue: null
      }), ['validationValue', 'dirty', 'appendInnerIcon']),
      ...makeTransitionProps({
        transition: false
      })
    },
    emits: {
      'update:focused': focused => true,
      'update:modelValue': val => true,
      'update:search': val => true,
      'update:menu': val => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const vTextFieldRef = vue.ref();
      const isFocused = vue.ref(false);
      const isPristine = vue.ref(true);
      const vMenuRef = vue.ref();
      const _menu = useProxiedModel(props, 'menu');
      const menu = vue.computed({
        get: () => _menu.value,
        set: v => {
          if (_menu.value && !v && vMenuRef.value?.ΨopenChildren) return;
          _menu.value = v;
        }
      });
      const selectionIndex = vue.ref(-1);
      let cleared = false;
      const color = vue.computed(() => vTextFieldRef.value?.color);
      const {
        items,
        transformIn,
        transformOut
      } = useItems(props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(color);
      const model = useProxiedModel(props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const form = useForm();
      const _search = vue.ref(!props.multiple ? model.value[0]?.title ?? '' : '');
      const search = vue.computed({
        get: () => {
          return _search.value;
        },
        set: val => {
          _search.value = val;
          if (!props.multiple) {
            model.value = [transformItem$1(props, val)];
          }
          if (val && props.multiple && props.delimiters?.length) {
            const values = val.split(new RegExp(`(?:${props.delimiters.join('|')})+`));
            if (values.length > 1) {
              values.forEach(v => {
                v = v.trim();
                if (v) select(transformItem$1(props, v));
              });
              _search.value = '';
            }
          }
          if (!val) selectionIndex.value = -1;
          isPristine.value = !val;
        }
      });
      vue.watch(_search, value => {
        if (cleared) {
          // wait for clear to finish, VTextField sets _search to null
          // then search computed triggers and updates _search to ''
          vue.nextTick(() => cleared = false);
        } else if (isFocused.value && !menu.value) {
          menu.value = true;
        }
        emit('update:search', value);
      });
      vue.watch(model, value => {
        if (!props.multiple) {
          _search.value = value[0]?.title ?? '';
        }
      });
      const {
        filteredItems,
        getMatches
      } = useFilter(props, items, vue.computed(() => isPristine.value ? undefined : search.value));
      const selections = vue.computed(() => {
        return model.value.map(v => {
          return items.value.find(item => props.valueComparator(item.value, v.value)) || v;
        });
      });
      const displayItems = vue.computed(() => {
        if (props.hideSelected) {
          return filteredItems.value.filter(filteredItem => !selections.value.some(s => s.value === filteredItem.value));
        }
        return filteredItems.value;
      });
      const selected = vue.computed(() => selections.value.map(selection => selection.props.value));
      const selection = vue.computed(() => selections.value[selectionIndex.value]);
      const listRef = vue.ref();
      function onClear(e) {
        cleared = true;
        if (props.openOnClear) {
          menu.value = true;
        }
      }
      function onMousedownControl() {
        if (props.hideNoData && !items.value.length || props.readonly || form?.isReadonly.value) return;
        menu.value = true;
      }
      function onKeydown(e) {
        if (props.readonly || form?.isReadonly.value) return;
        const selectionStart = vTextFieldRef.value.selectionStart;
        const length = selected.value.length;
        if (selectionIndex.value > -1 || ['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
          e.preventDefault();
        }
        if (['Enter', 'ArrowDown'].includes(e.key)) {
          menu.value = true;
        }
        if (['Escape'].includes(e.key)) {
          menu.value = false;
        }
        if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
          isPristine.value = true;
        }
        if (e.key === 'ArrowDown') {
          listRef.value?.focus('next');
        } else if (e.key === 'ArrowUp') {
          listRef.value?.focus('prev');
        }
        if (!props.multiple) return;
        if (['Backspace', 'Delete'].includes(e.key)) {
          if (selectionIndex.value < 0) {
            if (e.key === 'Backspace' && !search.value) {
              selectionIndex.value = length - 1;
            }
            return;
          }
          const originalSelectionIndex = selectionIndex.value;
          if (selection.value) select(selection.value);
          selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
        }
        if (e.key === 'ArrowLeft') {
          if (selectionIndex.value < 0 && selectionStart > 0) return;
          const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
          if (selections.value[prev]) {
            selectionIndex.value = prev;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange(search.value.length, search.value.length);
          }
        }
        if (e.key === 'ArrowRight') {
          if (selectionIndex.value < 0) return;
          const next = selectionIndex.value + 1;
          if (selections.value[next]) {
            selectionIndex.value = next;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange(0, 0);
          }
        }
        if (e.key === 'Enter' && search.value) {
          select(transformItem$1(props, search.value));
          search.value = '';
        }
      }
      function onAfterLeave() {
        if (isFocused.value) isPristine.value = true;
      }
      function select(item) {
        if (props.multiple) {
          const index = selected.value.findIndex(selection => props.valueComparator(selection, item.value));
          if (index === -1) {
            model.value = [...model.value, item];
          } else {
            const value = [...model.value];
            value.splice(index, 1);
            model.value = value;
          }
          search.value = '';
        } else {
          model.value = [item];
          _search.value = item.title;

          // watch for search watcher to trigger
          vue.nextTick(() => {
            menu.value = false;
            isPristine.value = true;
          });
        }
      }
      function onFocusin(e) {
        isFocused.value = true;
      }
      function onFocusout(e) {
        if (e.relatedTarget == null) {
          vTextFieldRef.value?.focus();
        }
      }
      vue.watch(filteredItems, val => {
        if (!val.length && props.hideNoData) menu.value = false;
      });
      vue.watch(isFocused, val => {
        if (val) {
          selectionIndex.value = -1;
        } else {
          menu.value = false;
          if (!props.multiple || !search.value) return;
          model.value = [...model.value, transformItem$1(props, search.value)];
          search.value = '';
        }
      });
      useRender(() => {
        const hasChips = !!(props.chips || slots.chip);
        const hasList = !!(!props.hideNoData || displayItems.value.length || slots.prepend || slots.append || slots['no-data']);
        const isDirty = model.value.length > 0;
        const [textFieldProps] = VTextField.filterProps(props);
        return vue.createVNode(VTextField, vue.mergeProps({
          "ref": vTextFieldRef
        }, textFieldProps, {
          "modelValue": search.value,
          "onUpdate:modelValue": [$event => search.value = $event, v => {
            if (v == null) model.value = [];
          }],
          "focused": isFocused.value,
          "onUpdate:focused": $event => isFocused.value = $event,
          "validationValue": model.externalValue,
          "dirty": isDirty,
          "class": ['v-combobox', {
            'v-combobox--active-menu': menu.value,
            'v-combobox--chips': !!props.chips,
            'v-combobox--selecting-index': selectionIndex.value > -1,
            [`v-combobox--${props.multiple ? 'multiple' : 'single'}`]: true
          }, props.class],
          "style": props.style,
          "appendInnerIcon": props.items.length ? props.menuIcon : undefined,
          "readonly": props.readonly,
          "placeholder": isDirty ? undefined : props.placeholder,
          "onClick:clear": onClear,
          "onMousedown:control": onMousedownControl,
          "onKeydown": onKeydown
        }), {
          ...slots,
          default: () => vue.createVNode(vue.Fragment, null, [vue.createVNode(VMenu, vue.mergeProps({
            "ref": vMenuRef,
            "modelValue": menu.value,
            "onUpdate:modelValue": $event => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-combobox__content",
            "eager": props.eager,
            "maxHeight": 310,
            "openOnClick": false,
            "closeOnContentClick": false,
            "transition": props.transition,
            "onAfterLeave": onAfterLeave
          }, props.menuProps), {
            default: () => [hasList && vue.createVNode(VList, {
              "ref": listRef,
              "selected": selected.value,
              "selectStrategy": props.multiple ? 'independent' : 'single-independent',
              "onMousedown": e => e.preventDefault(),
              "onFocusin": onFocusin,
              "onFocusout": onFocusout
            }, {
              default: () => [!displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? vue.createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), slots['prepend-item']?.(), displayItems.value.map(item => slots.item?.({
                item,
                props: vue.mergeProps(item.props, {
                  onClick: () => select(item)
                })
              }) ?? vue.createVNode(VListItem, vue.mergeProps({
                "key": item.value
              }, item.props, {
                "onClick": () => select(item)
              }), {
                prepend: _ref2 => {
                  let {
                    isSelected
                  } = _ref2;
                  return vue.createVNode(vue.Fragment, null, [props.multiple && !props.hideSelected ? vue.createVNode(VCheckboxBtn, {
                    "modelValue": isSelected,
                    "ripple": false,
                    "tabindex": "-1"
                  }, null) : undefined, item.props.prependIcon && vue.createVNode(VIcon, {
                    "icon": item.props.prependIcon
                  }, null)]);
                },
                title: () => {
                  return isPristine.value ? item.title : highlightResult(item.title, getMatches(item)?.title, search.value?.length ?? 0);
                }
              })), slots['append-item']?.()]
            })]
          }), selections.value.map((item, index) => {
            function onChipClose(e) {
              e.stopPropagation();
              e.preventDefault();
              select(item);
            }
            const slotProps = {
              'onClick:close': onChipClose,
              onMousedown(e) {
                e.preventDefault();
                e.stopPropagation();
              },
              modelValue: true,
              'onUpdate:modelValue': undefined
            };
            return vue.createVNode("div", {
              "key": item.value,
              "class": ['v-combobox__selection', index === selectionIndex.value && ['v-combobox__selection--selected', textColorClasses.value]],
              "style": index === selectionIndex.value ? textColorStyles.value : {}
            }, [hasChips ? !slots.chip ? vue.createVNode(VChip, vue.mergeProps({
              "key": "chip",
              "closable": props.closableChips,
              "size": "small",
              "text": item.title
            }, slotProps), null) : vue.createVNode(VDefaultsProvider, {
              "key": "chip-defaults",
              "defaults": {
                VChip: {
                  closable: props.closableChips,
                  size: 'small',
                  text: item.title
                }
              }
            }, {
              default: () => [slots.chip?.({
                item,
                index,
                props: slotProps
              })]
            }) : slots.selection?.({
              item,
              index
            }) ?? vue.createVNode("span", {
              "class": "v-combobox__selection-text"
            }, [item.title, props.multiple && index < selections.value.length - 1 && vue.createVNode("span", {
              "class": "v-combobox__selection-comma"
            }, [vue.createTextVNode(",")])])]);
          })])
        });
      });
      return forwardRefs({
        isFocused,
        isPristine,
        menu,
        search,
        selectionIndex,
        filteredItems,
        select
      }, vTextFieldRef);
    }
  });

  // Types

  const VDialog = genericComponent()({
    name: 'VDialog',
    props: {
      fullscreen: Boolean,
      retainFocus: {
        type: Boolean,
        default: true
      },
      scrollable: Boolean,
      ...makeVOverlayProps({
        origin: 'center center',
        scrollStrategy: 'block',
        transition: {
          component: VDialogTransition
        },
        zIndex: 2400
      })
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
      const overlay = vue.ref();
      function onFocusin(e) {
        const before = e.relatedTarget;
        const after = e.target;
        if (before !== after && overlay.value?.contentEl &&
        // We're the topmost dialog
        overlay.value?.globalTop &&
        // It isn't the document or the dialog body
        ![document, overlay.value.contentEl].includes(after) &&
        // It isn't inside the dialog body
        !overlay.value.contentEl.contains(after)) {
          const focusable = focusableChildren(overlay.value.contentEl);
          if (!focusable.length) return;
          const firstElement = focusable[0];
          const lastElement = focusable[focusable.length - 1];
          if (before === firstElement) {
            lastElement.focus();
          } else {
            firstElement.focus();
          }
        }
      }
      if (IN_BROWSER) {
        vue.watch(() => isActive.value && props.retainFocus, val => {
          val ? document.addEventListener('focusin', onFocusin) : document.removeEventListener('focusin', onFocusin);
        }, {
          immediate: true
        });
      }
      vue.watch(isActive, async val => {
        await vue.nextTick();
        if (val) {
          overlay.value.contentEl?.focus({
            preventScroll: true
          });
        } else {
          overlay.value.activatorEl?.focus({
            preventScroll: true
          });
        }
      });
      const activatorProps = vue.computed(() => vue.mergeProps({
        'aria-haspopup': 'dialog',
        'aria-expanded': String(isActive.value)
      }, props.activatorProps));
      useRender(() => {
        const [overlayProps] = VOverlay.filterProps(props);
        return vue.createVNode(VOverlay, vue.mergeProps({
          "ref": overlay,
          "class": ['v-dialog', {
            'v-dialog--fullscreen': props.fullscreen,
            'v-dialog--scrollable': props.scrollable
          }, props.class],
          "style": props.style
        }, overlayProps, {
          "modelValue": isActive.value,
          "onUpdate:modelValue": $event => isActive.value = $event,
          "aria-modal": "true",
          "activatorProps": activatorProps.value,
          "role": "dialog"
        }, scopeId), {
          activator: slots.activator,
          default: function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return vue.createVNode(VDefaultsProvider, {
              "root": true
            }, {
              default: () => [slots.default?.(...args)]
            });
          }
        });
      });
      return forwardRefs({}, overlay);
    }
  });

  // Types

  const VExpansionPanelSymbol = Symbol.for('vuetify:v-expansion-panel');
  const allowedVariants = ['default', 'accordion', 'inset', 'popout'];
  const VExpansionPanels = genericComponent()({
    name: 'VExpansionPanels',
    props: {
      color: String,
      variant: {
        type: String,
        default: 'default',
        validator: v => allowedVariants.includes(v)
      },
      readonly: Boolean,
      ...makeComponentProps(),
      ...makeGroupProps(),
      ...makeTagProps(),
      ...makeThemeProps()
    },
    emits: {
      'update:modelValue': val => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useGroup(props, VExpansionPanelSymbol);
      const {
        themeClasses
      } = provideTheme(props);
      const variantClass = vue.computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
      provideDefaults({
        VExpansionPanel: {
          color: vue.toRef(props, 'color')
        },
        VExpansionPanelTitle: {
          readonly: vue.toRef(props, 'readonly')
        }
      });
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-expansion-panels', themeClasses.value, variantClass.value, props.class],
        "style": props.style
      }, slots));
      return {};
    }
  });

  const makeVExpansionPanelTitleProps = propsFactory({
    color: String,
    expandIcon: {
      type: IconValue,
      default: '$expand'
    },
    collapseIcon: {
      type: IconValue,
      default: '$collapse'
    },
    hideActions: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false
    },
    readonly: Boolean
  }, 'v-expansion-panel-title');
  const VExpansionPanelTitle = genericComponent()({
    name: 'VExpansionPanelTitle',
    directives: {
      Ripple
    },
    props: {
      ...makeComponentProps(),
      ...makeVExpansionPanelTitleProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const expansionPanel = vue.inject(VExpansionPanelSymbol);
      if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel');
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(props, 'color');
      const slotProps = vue.computed(() => ({
        collapseIcon: props.collapseIcon,
        disabled: expansionPanel.disabled.value,
        expanded: expansionPanel.isSelected.value,
        expandIcon: props.expandIcon,
        readonly: props.readonly
      }));
      useRender(() => vue.withDirectives(vue.createVNode("button", {
        "class": ['v-expansion-panel-title', {
          'v-expansion-panel-title--active': expansionPanel.isSelected.value
        }, backgroundColorClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style],
        "type": "button",
        "tabindex": expansionPanel.disabled.value ? -1 : undefined,
        "disabled": expansionPanel.disabled.value,
        "aria-expanded": expansionPanel.isSelected.value,
        "onClick": !props.readonly ? expansionPanel.toggle : undefined
      }, [vue.createVNode("span", {
        "class": "v-expansion-panel-title__overlay"
      }, null), slots.default?.(slotProps.value), !props.hideActions && vue.createVNode("span", {
        "class": "v-expansion-panel-title__icon"
      }, [slots.actions ? slots.actions(slotProps.value) : vue.createVNode(VIcon, {
        "icon": expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon
      }, null)])]), [[vue.resolveDirective("ripple"), props.ripple]]));
      return {};
    }
  });

  const VExpansionPanelText = genericComponent()({
    name: 'VExpansionPanelText',
    props: {
      ...makeComponentProps(),
      ...makeLazyProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const expansionPanel = vue.inject(VExpansionPanelSymbol);
      if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel');
      const {
        hasContent,
        onAfterLeave
      } = useLazy(props, expansionPanel.isSelected);
      useRender(() => vue.createVNode(VExpandTransition, {
        "onAfterLeave": onAfterLeave
      }, {
        default: () => [vue.withDirectives(vue.createVNode("div", {
          "class": ['v-expansion-panel-text', props.class],
          "style": props.style
        }, [slots.default && hasContent.value && vue.createVNode("div", {
          "class": "v-expansion-panel-text__wrapper"
        }, [slots.default?.()])]), [[vue.vShow, expansionPanel.isSelected.value]])]
      }));
      return {};
    }
  });

  const VExpansionPanel = genericComponent()({
    name: 'VExpansionPanel',
    props: {
      title: String,
      text: String,
      bgColor: String,
      ...makeComponentProps(),
      ...makeElevationProps(),
      ...makeGroupItemProps(),
      ...makeLazyProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeVExpansionPanelTitleProps()
    },
    emits: {
      'group:selected': val => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const groupItem = useGroupItem(props, VExpansionPanelSymbol);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(props, 'bgColor');
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const isDisabled = vue.computed(() => groupItem?.disabled.value || props.disabled);
      const selectedIndices = vue.computed(() => groupItem.group.items.value.reduce((arr, item, index) => {
        if (groupItem.group.selected.value.includes(item.id)) arr.push(index);
        return arr;
      }, []));
      const isBeforeSelected = vue.computed(() => {
        const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id);
        return !groupItem.isSelected.value && selectedIndices.value.some(selectedIndex => selectedIndex - index === 1);
      });
      const isAfterSelected = vue.computed(() => {
        const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id);
        return !groupItem.isSelected.value && selectedIndices.value.some(selectedIndex => selectedIndex - index === -1);
      });
      vue.provide(VExpansionPanelSymbol, groupItem);
      useRender(() => {
        const hasText = !!(slots.text || props.text);
        const hasTitle = !!(slots.title || props.title);
        return vue.createVNode(props.tag, {
          "class": ['v-expansion-panel', {
            'v-expansion-panel--active': groupItem.isSelected.value,
            'v-expansion-panel--before-active': isBeforeSelected.value,
            'v-expansion-panel--after-active': isAfterSelected.value,
            'v-expansion-panel--disabled': isDisabled.value
          }, roundedClasses.value, backgroundColorClasses.value, props.class],
          "style": [backgroundColorStyles.value, props.style],
          "aria-expanded": groupItem.isSelected.value
        }, {
          default: () => [vue.createVNode("div", {
            "class": ['v-expansion-panel__shadow', ...elevationClasses.value]
          }, null), hasTitle && vue.createVNode(VExpansionPanelTitle, {
            "key": "title",
            "collapseIcon": props.collapseIcon,
            "color": props.color,
            "expandIcon": props.expandIcon,
            "hideActions": props.hideActions,
            "ripple": props.ripple
          }, {
            default: () => [slots.title ? slots.title() : props.title]
          }), hasText && vue.createVNode(VExpansionPanelText, {
            "key": "text",
            "eager": props.eager
          }, {
            default: () => [slots.text ? slots.text() : props.text]
          }), slots.default?.()]
        });
      });
      return {};
    }
  });

  // Types

  const VFileInput = genericComponent()({
    name: 'VFileInput',
    inheritAttrs: false,
    props: {
      chips: Boolean,
      counter: Boolean,
      counterSizeString: {
        type: String,
        default: '$vuetify.fileInput.counterSize'
      },
      counterString: {
        type: String,
        default: '$vuetify.fileInput.counter'
      },
      multiple: Boolean,
      showSize: {
        type: [Boolean, Number],
        default: false,
        validator: v => {
          return typeof v === 'boolean' || [1000, 1024].includes(v);
        }
      },
      ...makeVInputProps({
        prependIcon: '$file'
      }),
      modelValue: {
        type: Array,
        default: () => [],
        validator: val => {
          return wrapInArray(val).every(v => v != null && typeof v === 'object');
        }
      },
      ...makeVFieldProps({
        clearable: true
      })
    },
    emits: {
      'click:control': e => true,
      'mousedown:control': e => true,
      'update:focused': focused => true,
      'update:modelValue': files => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit,
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const model = useProxiedModel(props, 'modelValue');
      const {
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const base = vue.computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined);
      const totalBytes = vue.computed(() => (model.value ?? []).reduce((bytes, _ref2) => {
        let {
          size = 0
        } = _ref2;
        return bytes + size;
      }, 0));
      const totalBytesReadable = vue.computed(() => humanReadableFileSize(totalBytes.value, base.value));
      const fileNames = vue.computed(() => (model.value ?? []).map(file => {
        const {
          name = '',
          size = 0
        } = file;
        return !props.showSize ? name : `${name} (${humanReadableFileSize(size, base.value)})`;
      }));
      const counterValue = vue.computed(() => {
        const fileCount = model.value?.length ?? 0;
        if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value);else return t(props.counterString, fileCount);
      });
      const vInputRef = vue.ref();
      const vFieldRef = vue.ref();
      const inputRef = vue.ref();
      const isActive = vue.computed(() => isFocused.value || props.active);
      function onFocus() {
        if (inputRef.value !== document.activeElement) {
          inputRef.value?.focus();
        }
        if (!isFocused.value) focus();
      }
      function onClickPrepend(e) {
        onControlClick(e);
      }
      function onControlMousedown(e) {
        emit('mousedown:control', e);
      }
      function onControlClick(e) {
        inputRef.value?.click();
        emit('click:control', e);
      }
      function onClear(e) {
        e.stopPropagation();
        onFocus();
        vue.nextTick(() => {
          model.value = [];
          callEvent(props['onClick:clear'], e);
        });
      }
      vue.watch(model, newValue => {
        const hasModelReset = !Array.isArray(newValue) || !newValue.length;
        if (hasModelReset && inputRef.value) {
          inputRef.value.value = '';
        }
      });
      useRender(() => {
        const hasCounter = !!(slots.counter || props.counter);
        const hasDetails = !!(hasCounter || slots.details);
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [{
          modelValue: _,
          ...inputProps
        }] = VInput.filterProps(props);
        const [fieldProps] = filterFieldProps(props);
        return vue.createVNode(VInput, vue.mergeProps({
          "ref": vInputRef,
          "modelValue": model.value,
          "onUpdate:modelValue": $event => model.value = $event,
          "class": ['v-file-input', props.class],
          "style": props.style,
          "onClick:prepend": onClickPrepend
        }, rootAttrs, inputProps, {
          "focused": isFocused.value
        }), {
          ...slots,
          default: _ref3 => {
            let {
              id,
              isDisabled,
              isDirty,
              isReadonly,
              isValid
            } = _ref3;
            return vue.createVNode(VField, vue.mergeProps({
              "ref": vFieldRef,
              "prepend-icon": props.prependIcon,
              "onMousedown": onControlMousedown,
              "onClick": onControlClick,
              "onClick:clear": onClear,
              "onClick:prependInner": props['onClick:prependInner'],
              "onClick:appendInner": props['onClick:appendInner']
            }, fieldProps, {
              "id": id.value,
              "active": isActive.value || isDirty.value,
              "dirty": isDirty.value,
              "disabled": isDisabled.value,
              "focused": isFocused.value,
              "error": isValid.value === false
            }), {
              ...slots,
              default: _ref4 => {
                let {
                  props: {
                    class: fieldClass,
                    ...slotProps
                  }
                } = _ref4;
                return vue.createVNode(vue.Fragment, null, [vue.createVNode("input", vue.mergeProps({
                  "ref": inputRef,
                  "type": "file",
                  "readonly": isReadonly.value,
                  "disabled": isDisabled.value,
                  "multiple": props.multiple,
                  "name": props.name,
                  "onClick": e => {
                    e.stopPropagation();
                    onFocus();
                  },
                  "onChange": e => {
                    if (!e.target) return;
                    const target = e.target;
                    model.value = [...(target.files ?? [])];
                  },
                  "onFocus": onFocus,
                  "onBlur": blur
                }, slotProps, inputAttrs), null), vue.createVNode("div", {
                  "class": fieldClass
                }, [!!model.value?.length && (slots.selection ? slots.selection({
                  fileNames: fileNames.value,
                  totalBytes: totalBytes.value,
                  totalBytesReadable: totalBytesReadable.value
                }) : props.chips ? fileNames.value.map(text => vue.createVNode(VChip, {
                  "key": text,
                  "size": "small",
                  "color": props.color
                }, {
                  default: () => [text]
                })) : fileNames.value.join(', '))])]);
              }
            });
          },
          details: hasDetails ? slotProps => vue.createVNode(vue.Fragment, null, [slots.details?.(slotProps), hasCounter && vue.createVNode(vue.Fragment, null, [vue.createVNode("span", null, null), vue.createVNode(VCounter, {
            "active": !!model.value?.length,
            "value": counterValue.value
          }, slots.counter)])]) : undefined
        });
      });
      return forwardRefs({}, vInputRef, vFieldRef, inputRef);
    }
  });

  const VFooter = genericComponent()({
    name: 'VFooter',
    props: {
      app: Boolean,
      color: String,
      height: {
        type: [Number, String],
        default: 'auto'
      },
      ...makeBorderProps(),
      ...makeComponentProps(),
      ...makeElevationProps(),
      ...makeLayoutItemProps(),
      ...makeRoundedProps(),
      ...makeTagProps({
        tag: 'footer'
      }),
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
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const {
        borderClasses
      } = useBorder(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const autoHeight = vue.ref(32);
      const {
        resizeRef
      } = useResizeObserver(entries => {
        if (!entries.length) return;
        autoHeight.value = entries[0].target.clientHeight;
      });
      const height = vue.computed(() => props.height === 'auto' ? autoHeight.value : parseInt(props.height, 10));
      const {
        layoutItemStyles
      } = useLayoutItem({
        id: props.name,
        order: vue.computed(() => parseInt(props.order, 10)),
        position: vue.computed(() => 'bottom'),
        layoutSize: height,
        elementSize: vue.computed(() => props.height === 'auto' ? undefined : height.value),
        active: vue.computed(() => props.app),
        absolute: vue.toRef(props, 'absolute')
      });
      useRender(() => vue.createVNode(props.tag, {
        "ref": resizeRef,
        "class": ['v-footer', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.app ? layoutItemStyles.value : undefined, props.style]
      }, slots));
      return {};
    }
  });

  // Types

  const VForm = genericComponent()({
    name: 'VForm',
    props: {
      ...makeComponentProps(),
      ...makeFormProps()
    },
    emits: {
      'update:modelValue': val => true,
      submit: e => true
    },
    setup(props, _ref) {
      let {
        slots,
        emit
      } = _ref;
      const form = createForm(props);
      const formRef = vue.ref();
      function onReset(e) {
        e.preventDefault();
        form.reset();
      }
      function onSubmit(_e) {
        const e = _e;
        const ready = form.validate();
        e.then = ready.then.bind(ready);
        e.catch = ready.catch.bind(ready);
        e.finally = ready.finally.bind(ready);
        emit('submit', e);
        if (!e.defaultPrevented) {
          ready.then(_ref2 => {
            let {
              valid
            } = _ref2;
            if (valid) {
              formRef.value?.submit();
            }
          });
        }
        e.preventDefault();
      }
      useRender(() => vue.createVNode("form", {
        "ref": formRef,
        "class": ['v-form', props.class],
        "style": props.style,
        "novalidate": true,
        "onReset": onReset,
        "onSubmit": onSubmit
      }, [slots.default?.(form)]));
      return forwardRefs(form, formRef);
    }
  });

  const VContainer = genericComponent()({
    name: 'VContainer',
    props: {
      fluid: {
        type: Boolean,
        default: false
      },
      ...makeComponentProps(),
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-container', {
          'v-container--fluid': props.fluid
        }, props.class],
        "style": props.style
      }, slots));
      return {};
    }
  });

  // Styles

  // Types

  const breakpointProps = (() => {
    return breakpoints.reduce((props, val) => {
      props[val] = {
        type: [Boolean, String, Number],
        default: false
      };
      return props;
    }, {});
  })();
  const offsetProps = (() => {
    return breakpoints.reduce((props, val) => {
      const offsetKey = 'offset' + vue.capitalize(val);
      props[offsetKey] = {
        type: [String, Number],
        default: null
      };
      return props;
    }, {});
  })();
  const orderProps = (() => {
    return breakpoints.reduce((props, val) => {
      const orderKey = 'order' + vue.capitalize(val);
      props[orderKey] = {
        type: [String, Number],
        default: null
      };
      return props;
    }, {});
  })();
  const propMap$1 = {
    col: Object.keys(breakpointProps),
    offset: Object.keys(offsetProps),
    order: Object.keys(orderProps)
  };
  function breakpointClass$1(type, prop, val) {
    let className = type;
    if (val == null || val === false) {
      return undefined;
    }
    if (prop) {
      const breakpoint = prop.replace(type, '');
      className += `-${breakpoint}`;
    }
    if (type === 'col') {
      className = 'v-' + className;
    }
    // Handling the boolean style prop when accepting [Boolean, String, Number]
    // means Vue will not convert <v-col sm></v-col> to sm: true for us.
    // Since the default is false, an empty string indicates the prop's presence.
    if (type === 'col' && (val === '' || val === true)) {
      // .v-col-md
      return className.toLowerCase();
    }
    // .order-md-6
    className += `-${val}`;
    return className.toLowerCase();
  }
  const ALIGN_SELF_VALUES = ['auto', 'start', 'end', 'center', 'baseline', 'stretch'];
  const VCol = genericComponent()({
    name: 'VCol',
    props: {
      cols: {
        type: [Boolean, String, Number],
        default: false
      },
      ...breakpointProps,
      offset: {
        type: [String, Number],
        default: null
      },
      ...offsetProps,
      order: {
        type: [String, Number],
        default: null
      },
      ...orderProps,
      alignSelf: {
        type: String,
        default: null,
        validator: str => ALIGN_SELF_VALUES.includes(str)
      },
      ...makeComponentProps(),
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const classes = vue.computed(() => {
        const classList = [];

        // Loop through `col`, `offset`, `order` breakpoint props
        let type;
        for (type in propMap$1) {
          propMap$1[type].forEach(prop => {
            const value = props[prop];
            const className = breakpointClass$1(type, prop, value);
            if (className) classList.push(className);
          });
        }
        const hasColClasses = classList.some(className => className.startsWith('v-col-'));
        classList.push({
          // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
          'v-col': !hasColClasses || !props.cols,
          [`v-col-${props.cols}`]: props.cols,
          [`offset-${props.offset}`]: props.offset,
          [`order-${props.order}`]: props.order,
          [`align-self-${props.alignSelf}`]: props.alignSelf
        });
        return classList;
      });
      return () => vue.h(props.tag, {
        class: [classes.value, props.class],
        style: props.style
      }, slots.default?.());
    }
  });

  // Styles

  // Types

  const ALIGNMENT = ['start', 'end', 'center'];
  const SPACE = ['space-between', 'space-around', 'space-evenly'];
  function makeRowProps(prefix, def) {
    return breakpoints.reduce((props, val) => {
      const prefixKey = prefix + vue.capitalize(val);
      props[prefixKey] = def();
      return props;
    }, {});
  }
  const ALIGN_VALUES = [...ALIGNMENT, 'baseline', 'stretch'];
  const alignValidator = str => ALIGN_VALUES.includes(str);
  const alignProps = makeRowProps('align', () => ({
    type: String,
    default: null,
    validator: alignValidator
  }));
  const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
  const justifyValidator = str => JUSTIFY_VALUES.includes(str);
  const justifyProps = makeRowProps('justify', () => ({
    type: String,
    default: null,
    validator: justifyValidator
  }));
  const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, 'stretch'];
  const alignContentValidator = str => ALIGN_CONTENT_VALUES.includes(str);
  const alignContentProps = makeRowProps('alignContent', () => ({
    type: String,
    default: null,
    validator: alignContentValidator
  }));
  const propMap = {
    align: Object.keys(alignProps),
    justify: Object.keys(justifyProps),
    alignContent: Object.keys(alignContentProps)
  };
  const classMap = {
    align: 'align',
    justify: 'justify',
    alignContent: 'align-content'
  };
  function breakpointClass(type, prop, val) {
    let className = classMap[type];
    if (val == null) {
      return undefined;
    }
    if (prop) {
      // alignSm -> Sm
      const breakpoint = prop.replace(type, '');
      className += `-${breakpoint}`;
    }
    // .align-items-sm-center
    className += `-${val}`;
    return className.toLowerCase();
  }
  const VRow = genericComponent()({
    name: 'VRow',
    props: {
      dense: Boolean,
      noGutters: Boolean,
      align: {
        type: String,
        default: null,
        validator: alignValidator
      },
      ...alignProps,
      justify: {
        type: String,
        default: null,
        validator: justifyValidator
      },
      ...justifyProps,
      alignContent: {
        type: String,
        default: null,
        validator: alignContentValidator
      },
      ...alignContentProps,
      ...makeComponentProps(),
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const classes = vue.computed(() => {
        const classList = [];

        // Loop through `align`, `justify`, `alignContent` breakpoint props
        let type;
        for (type in propMap) {
          propMap[type].forEach(prop => {
            const value = props[prop];
            const className = breakpointClass(type, prop, value);
            if (className) classList.push(className);
          });
        }
        classList.push({
          'v-row--no-gutters': props.noGutters,
          'v-row--dense': props.dense,
          [`align-${props.align}`]: props.align,
          [`justify-${props.justify}`]: props.justify,
          [`align-content-${props.alignContent}`]: props.alignContent
        });
        return classList;
      });
      return () => vue.h(props.tag, {
        class: ['v-row', classes.value, props.class],
        style: props.style
      }, slots.default?.());
    }
  });

  const VSpacer = createSimpleFunctional('flex-grow-1', 'div', 'VSpacer');

  // Composables
  const VHover = genericComponent()({
    name: 'VHover',
    props: {
      disabled: Boolean,
      modelValue: {
        type: Boolean,
        default: undefined
      },
      ...makeDelayProps()
    },
    emits: {
      'update:modelValue': value => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const isHovering = useProxiedModel(props, 'modelValue');
      const {
        runOpenDelay,
        runCloseDelay
      } = useDelay(props, value => !props.disabled && (isHovering.value = value));
      return () => slots.default?.({
        isHovering: isHovering.value,
        props: {
          onMouseenter: runOpenDelay,
          onMouseleave: runCloseDelay
        }
      });
    }
  });

  const VItemGroupSymbol = Symbol.for('vuetify:v-item-group');
  const VItemGroup = genericComponent()({
    name: 'VItemGroup',
    props: {
      ...makeComponentProps(),
      ...makeGroupProps({
        selectedClass: 'v-item--selected'
      }),
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
      const {
        themeClasses
      } = provideTheme(props);
      const {
        isSelected,
        select,
        next,
        prev,
        selected
      } = useGroup(props, VItemGroupSymbol);
      return () => vue.createVNode(props.tag, {
        "class": ['v-item-group', themeClasses.value, props.class],
        "style": props.style
      }, {
        default: () => [slots.default?.({
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })]
      });
    }
  });

  // Composables

  // Types

  const VItem = genericComponent()({
    name: 'VItem',
    props: makeGroupItemProps(),
    emits: {
      'group:selected': val => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        isSelected,
        select,
        toggle,
        selectedClass,
        value,
        disabled
      } = useGroupItem(props, VItemGroupSymbol);
      return () => slots.default?.({
        isSelected: isSelected.value,
        selectedClass: selectedClass.value,
        select,
        toggle,
        value: value.value,
        disabled: disabled.value
      });
    }
  });

  const VKbd = createSimpleFunctional('v-kbd');

  const VLayout = genericComponent()({
    name: 'VLayout',
    props: {
      ...makeComponentProps(),
      ...makeLayoutProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        layoutClasses,
        layoutStyles,
        getLayoutItem,
        items,
        layoutRef
      } = createLayout(props);
      useRender(() => vue.createVNode("div", {
        "ref": layoutRef,
        "class": [layoutClasses.value, props.class],
        "style": [layoutStyles.value, props.style]
      }, [slots.default?.()]));
      return {
        getLayoutItem,
        items
      };
    }
  });

  // Types

  const VLayoutItem = genericComponent()({
    name: 'VLayoutItem',
    props: {
      position: {
        type: String,
        required: true
      },
      size: {
        type: [Number, String],
        default: 300
      },
      modelValue: Boolean,
      ...makeComponentProps(),
      ...makeLayoutItemProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        layoutItemStyles
      } = useLayoutItem({
        id: props.name,
        order: vue.computed(() => parseInt(props.order, 10)),
        position: vue.toRef(props, 'position'),
        elementSize: vue.toRef(props, 'size'),
        layoutSize: vue.toRef(props, 'size'),
        active: vue.toRef(props, 'modelValue'),
        absolute: vue.toRef(props, 'absolute')
      });
      return () => vue.createVNode("div", {
        "class": ['v-layout-item', props.class],
        "style": [layoutItemStyles.value, props.style]
      }, [slots.default?.()]);
    }
  });

  // Types

  const VLazy = genericComponent()({
    name: 'VLazy',
    directives: {
      intersect: Intersect
    },
    props: {
      modelValue: Boolean,
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
      ...makeComponentProps(),
      ...makeDimensionProps(),
      ...makeTagProps(),
      ...makeTransitionProps({
        transition: 'fade-transition'
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
        dimensionStyles
      } = useDimension(props);
      const isActive = useProxiedModel(props, 'modelValue');
      function onIntersect(isIntersecting) {
        if (isActive.value) return;
        isActive.value = isIntersecting;
      }
      useRender(() => vue.withDirectives(vue.createVNode(props.tag, {
        "class": ['v-lazy', props.class],
        "style": [dimensionStyles.value, props.style]
      }, {
        default: () => [isActive.value && vue.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [slots.default?.()]
        })]
      }), [[vue.resolveDirective("intersect"), {
        handler: onIntersect,
        options: props.options
      }, null]]));
      return {};
    }
  });

  const VLocaleProvider = genericComponent()({
    name: 'VLocaleProvider',
    props: {
      locale: String,
      fallbackLocale: String,
      messages: Object,
      rtl: {
        type: Boolean,
        default: undefined
      },
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        rtlClasses
      } = provideLocale(props);
      useRender(() => vue.createVNode("div", {
        "class": ['v-locale-provider', rtlClasses.value, props.class],
        "style": props.style
      }, [slots.default?.()]));
      return {};
    }
  });

  const VMain = genericComponent()({
    name: 'VMain',
    props: {
      scrollable: Boolean,
      ...makeComponentProps(),
      ...makeTagProps({
        tag: 'main'
      })
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        mainStyles
      } = useLayout();
      const {
        ssrBootStyles
      } = useSsrBoot();
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-main', {
          'v-main--scrollable': props.scrollable
        }, props.class],
        "style": [mainStyles.value, ssrBootStyles.value, props.style]
      }, {
        default: () => [props.scrollable ? vue.createVNode("div", {
          "class": "v-main__scroller"
        }, [slots.default?.()]) : slots.default?.()]
      }));
      return {};
    }
  });

  function useSticky(_ref) {
    let {
      rootEl,
      isSticky,
      layoutItemStyles
    } = _ref;
    const isStuck = vue.ref(false);
    const stuckPosition = vue.ref(0);
    const stickyStyles = vue.computed(() => {
      const side = typeof isStuck.value === 'boolean' ? 'top' : isStuck.value;
      return [isSticky.value ? {
        top: 'auto',
        bottom: 'auto',
        height: undefined
      } : undefined, isStuck.value ? {
        [side]: convertToUnit(stuckPosition.value)
      } : {
        top: layoutItemStyles.value.top
      }];
    });
    vue.onMounted(() => {
      vue.watch(isSticky, val => {
        if (val) {
          window.addEventListener('scroll', onScroll, {
            passive: true
          });
        } else {
          window.removeEventListener('scroll', onScroll);
        }
      }, {
        immediate: true
      });
    });
    vue.onBeforeUnmount(() => {
      document.removeEventListener('scroll', onScroll);
    });
    let lastScrollTop = 0;
    function onScroll() {
      const direction = lastScrollTop > window.scrollY ? 'up' : 'down';
      const rect = rootEl.value.getBoundingClientRect();
      const layoutTop = parseFloat(layoutItemStyles.value.top ?? 0);
      const top = window.scrollY - Math.max(0, stuckPosition.value - layoutTop);
      const bottom = rect.height + Math.max(stuckPosition.value, layoutTop) - window.scrollY - window.innerHeight;
      if (rect.height < window.innerHeight - layoutTop) {
        isStuck.value = 'top';
        stuckPosition.value = layoutTop;
      } else if (direction === 'up' && isStuck.value === 'bottom' || direction === 'down' && isStuck.value === 'top') {
        stuckPosition.value = window.scrollY + rect.top;
        isStuck.value = true;
      } else if (direction === 'down' && bottom <= 0) {
        stuckPosition.value = 0;
        isStuck.value = 'bottom';
      } else if (direction === 'up' && top <= 0) {
        stuckPosition.value = rect.top + top;
        isStuck.value = 'top';
      }
      lastScrollTop = window.scrollY;
    }
    return {
      isStuck,
      stickyStyles
    };
  }

  const HORIZON = 100; // ms
  const HISTORY = 20; // number of samples to keep

  /** @see https://android.googlesource.com/platform/frameworks/native/+/master/libs/input/VelocityTracker.cpp */
  function kineticEnergyToVelocity(work) {
    const sqrt2 = 1.41421356237;
    return (work < 0 ? -1.0 : 1.0) * Math.sqrt(Math.abs(work)) * sqrt2;
  }

  /**
   * Returns pointer velocity in px/s
   */
  function calculateImpulseVelocity(samples) {
    // The input should be in reversed time order (most recent sample at index i=0)
    if (samples.length < 2) {
      // if 0 or 1 points, velocity is zero
      return 0;
    }
    // if (samples[1].t > samples[0].t) {
    //   // Algorithm will still work, but not perfectly
    //   consoleWarn('Samples provided to calculateImpulseVelocity in the wrong order')
    // }
    if (samples.length === 2) {
      // if 2 points, basic linear calculation
      if (samples[1].t === samples[0].t) {
        // consoleWarn(`Events have identical time stamps t=${samples[0].t}, setting velocity = 0`)
        return 0;
      }
      return (samples[1].d - samples[0].d) / (samples[1].t - samples[0].t);
    }
    // Guaranteed to have at least 3 points here
    // start with the oldest sample and go forward in time
    let work = 0;
    for (let i = samples.length - 1; i > 0; i--) {
      if (samples[i].t === samples[i - 1].t) {
        // consoleWarn(`Events have identical time stamps t=${samples[i].t}, skipping sample`)
        continue;
      }
      const vprev = kineticEnergyToVelocity(work); // v[i-1]
      const vcurr = (samples[i].d - samples[i - 1].d) / (samples[i].t - samples[i - 1].t); // v[i]
      work += (vcurr - vprev) * Math.abs(vcurr);
      if (i === samples.length - 1) {
        work *= 0.5;
      }
    }
    return kineticEnergyToVelocity(work) * 1000;
  }
  function useVelocity() {
    const touches = {};
    function addMovement(e) {
      Array.from(e.changedTouches).forEach(touch => {
        const samples = touches[touch.identifier] ?? (touches[touch.identifier] = new CircularBuffer(HISTORY));
        samples.push([e.timeStamp, touch]);
      });
    }
    function endTouch(e) {
      Array.from(e.changedTouches).forEach(touch => {
        delete touches[touch.identifier];
      });
    }
    function getVelocity(id) {
      const samples = touches[id]?.values().reverse();
      if (!samples) {
        throw new Error(`No samples for touch id ${id}`);
      }
      const newest = samples[0];
      const x = [];
      const y = [];
      for (const val of samples) {
        if (newest[0] - val[0] > HORIZON) break;
        x.push({
          t: val[0],
          d: val[1].clientX
        });
        y.push({
          t: val[0],
          d: val[1].clientY
        });
      }
      return {
        x: calculateImpulseVelocity(x),
        y: calculateImpulseVelocity(y),
        get direction() {
          const {
            x,
            y
          } = this;
          const [absX, absY] = [Math.abs(x), Math.abs(y)];
          return absX > absY && x >= 0 ? 'right' : absX > absY && x <= 0 ? 'left' : absY > absX && y >= 0 ? 'down' : absY > absX && y <= 0 ? 'up' : oops$1();
        }
      };
    }
    return {
      addMovement,
      endTouch,
      getVelocity
    };
  }
  function oops$1() {
    throw new Error();
  }

  // Composables

  // Types

  function useTouch(_ref) {
    let {
      isActive,
      isTemporary,
      width,
      touchless,
      position
    } = _ref;
    vue.onMounted(() => {
      window.addEventListener('touchstart', onTouchstart, {
        passive: true
      });
      window.addEventListener('touchmove', onTouchmove, {
        passive: false
      });
      window.addEventListener('touchend', onTouchend, {
        passive: true
      });
    });
    vue.onBeforeUnmount(() => {
      window.removeEventListener('touchstart', onTouchstart);
      window.removeEventListener('touchmove', onTouchmove);
      window.removeEventListener('touchend', onTouchend);
    });
    const isHorizontal = vue.computed(() => ['left', 'right'].includes(position.value));
    const {
      addMovement,
      endTouch,
      getVelocity
    } = useVelocity();
    let maybeDragging = false;
    const isDragging = vue.ref(false);
    const dragProgress = vue.ref(0);
    const offset = vue.ref(0);
    let start;
    function getOffset(pos, active) {
      return (position.value === 'left' ? pos : position.value === 'right' ? document.documentElement.clientWidth - pos : position.value === 'top' ? pos : position.value === 'bottom' ? document.documentElement.clientHeight - pos : oops()) - (active ? width.value : 0);
    }
    function getProgress(pos) {
      let limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      const progress = position.value === 'left' ? (pos - offset.value) / width.value : position.value === 'right' ? (document.documentElement.clientWidth - pos - offset.value) / width.value : position.value === 'top' ? (pos - offset.value) / width.value : position.value === 'bottom' ? (document.documentElement.clientHeight - pos - offset.value) / width.value : oops();
      return limit ? Math.max(0, Math.min(1, progress)) : progress;
    }
    function onTouchstart(e) {
      if (touchless.value) return;
      const touchX = e.changedTouches[0].clientX;
      const touchY = e.changedTouches[0].clientY;
      const touchZone = 25;
      const inTouchZone = position.value === 'left' ? touchX < touchZone : position.value === 'right' ? touchX > document.documentElement.clientWidth - touchZone : position.value === 'top' ? touchY < touchZone : position.value === 'bottom' ? touchY > document.documentElement.clientHeight - touchZone : oops();
      const inElement = isActive.value && (position.value === 'left' ? touchX < width.value : position.value === 'right' ? touchX > document.documentElement.clientWidth - width.value : position.value === 'top' ? touchY < width.value : position.value === 'bottom' ? touchY > document.documentElement.clientHeight - width.value : oops());
      if (inTouchZone || inElement || isActive.value && isTemporary.value) {
        maybeDragging = true;
        start = [touchX, touchY];
        offset.value = getOffset(isHorizontal.value ? touchX : touchY, isActive.value);
        dragProgress.value = getProgress(isHorizontal.value ? touchX : touchY);
        endTouch(e);
        addMovement(e);
      }
    }
    function onTouchmove(e) {
      const touchX = e.changedTouches[0].clientX;
      const touchY = e.changedTouches[0].clientY;
      if (maybeDragging) {
        if (!e.cancelable) {
          maybeDragging = false;
          return;
        }
        const dx = Math.abs(touchX - start[0]);
        const dy = Math.abs(touchY - start[1]);
        const thresholdMet = isHorizontal.value ? dx > dy && dx > 3 : dy > dx && dy > 3;
        if (thresholdMet) {
          isDragging.value = true;
          maybeDragging = false;
        } else if ((isHorizontal.value ? dy : dx) > 3) {
          maybeDragging = false;
        }
      }
      if (!isDragging.value) return;
      e.preventDefault();
      addMovement(e);
      const progress = getProgress(isHorizontal.value ? touchX : touchY, false);
      dragProgress.value = Math.max(0, Math.min(1, progress));
      if (progress > 1) {
        offset.value = getOffset(isHorizontal.value ? touchX : touchY, true);
      } else if (progress < 0) {
        offset.value = getOffset(isHorizontal.value ? touchX : touchY, false);
      }
    }
    function onTouchend(e) {
      maybeDragging = false;
      if (!isDragging.value) return;
      addMovement(e);
      isDragging.value = false;
      const velocity = getVelocity(e.changedTouches[0].identifier);
      const vx = Math.abs(velocity.x);
      const vy = Math.abs(velocity.y);
      const thresholdMet = isHorizontal.value ? vx > vy && vx > 400 : vy > vx && vy > 3;
      if (thresholdMet) {
        isActive.value = velocity.direction === ({
          left: 'right',
          right: 'left',
          top: 'down',
          bottom: 'up'
        }[position.value] || oops());
      } else {
        isActive.value = dragProgress.value > 0.5;
      }
    }
    const dragStyles = vue.computed(() => {
      return isDragging.value ? {
        transform: position.value === 'left' ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === 'right' ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === 'top' ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === 'bottom' ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
        transition: 'none'
      } : undefined;
    });
    return {
      isDragging,
      dragProgress,
      dragStyles
    };
  }
  function oops() {
    throw new Error();
  }

  // Types

  const locations = ['start', 'end', 'left', 'right', 'top', 'bottom'];
  const VNavigationDrawer = genericComponent()({
    name: 'VNavigationDrawer',
    props: {
      color: String,
      disableResizeWatcher: Boolean,
      disableRouteWatcher: Boolean,
      expandOnHover: Boolean,
      floating: Boolean,
      modelValue: {
        type: Boolean,
        default: null
      },
      permanent: Boolean,
      rail: {
        type: Boolean,
        default: null
      },
      railWidth: {
        type: [Number, String],
        default: 56
      },
      scrim: {
        type: [String, Boolean],
        default: true
      },
      image: String,
      temporary: Boolean,
      touchless: Boolean,
      width: {
        type: [Number, String],
        default: 256
      },
      location: {
        type: String,
        default: 'start',
        validator: value => locations.includes(value)
      },
      sticky: Boolean,
      ...makeBorderProps(),
      ...makeComponentProps(),
      ...makeElevationProps(),
      ...makeLayoutItemProps(),
      ...makeRoundedProps(),
      ...makeTagProps({
        tag: 'nav'
      }),
      ...makeThemeProps()
    },
    emits: {
      'update:modelValue': val => true,
      'update:rail': val => true
    },
    setup(props, _ref) {
      let {
        attrs,
        emit,
        slots
      } = _ref;
      const {
        isRtl
      } = useRtl();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        borderClasses
      } = useBorder(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const {
        elevationClasses
      } = useElevation(props);
      const {
        mobile
      } = useDisplay();
      const {
        roundedClasses
      } = useRounded(props);
      const router = useRouter();
      const isActive = useProxiedModel(props, 'modelValue', null, v => !!v);
      const {
        ssrBootStyles
      } = useSsrBoot();
      const rootEl = vue.ref();
      const isHovering = vue.ref(false);
      const width = vue.computed(() => {
        return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
      });
      const location = vue.computed(() => {
        return toPhysical(props.location, isRtl.value);
      });
      const isTemporary = vue.computed(() => !props.permanent && (mobile.value || props.temporary));
      const isSticky = vue.computed(() => props.sticky && !isTemporary.value && location.value !== 'bottom');
      if (props.expandOnHover && props.rail != null) {
        vue.watch(isHovering, val => emit('update:rail', !val));
      }
      if (!props.disableResizeWatcher) {
        vue.watch(isTemporary, val => !props.permanent && vue.nextTick(() => isActive.value = !val));
      }
      if (!props.disableRouteWatcher && router) {
        vue.watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
      }
      vue.watch(() => props.permanent, val => {
        if (val) isActive.value = true;
      });
      vue.onBeforeMount(() => {
        if (props.modelValue != null || isTemporary.value) return;
        isActive.value = props.permanent || !mobile.value;
      });
      const {
        isDragging,
        dragProgress,
        dragStyles
      } = useTouch({
        isActive,
        isTemporary,
        width,
        touchless: vue.toRef(props, 'touchless'),
        position: location
      });
      const layoutSize = vue.computed(() => {
        const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
        return isDragging.value ? size * dragProgress.value : size;
      });
      const {
        layoutItemStyles,
        layoutItemScrimStyles
      } = useLayoutItem({
        id: props.name,
        order: vue.computed(() => parseInt(props.order, 10)),
        position: location,
        layoutSize,
        elementSize: width,
        active: vue.computed(() => isActive.value || isDragging.value),
        disableTransitions: vue.computed(() => isDragging.value),
        absolute: vue.computed(() =>
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== 'string')
      });
      const {
        isStuck,
        stickyStyles
      } = useSticky({
        rootEl,
        isSticky,
        layoutItemStyles
      });
      const scrimColor = useBackgroundColor(vue.computed(() => {
        return typeof props.scrim === 'string' ? props.scrim : null;
      }));
      const scrimStyles = vue.computed(() => ({
        ...(isDragging.value ? {
          opacity: dragProgress.value * 0.2,
          transition: 'none'
        } : undefined),
        ...layoutItemScrimStyles.value
      }));
      provideDefaults({
        VList: {
          bgColor: 'transparent'
        }
      });
      function onMouseenter() {
        isHovering.value = true;
      }
      function onMouseleave() {
        isHovering.value = false;
      }
      useRender(() => {
        const hasImage = slots.image || props.image;
        return vue.createVNode(vue.Fragment, null, [vue.createVNode(props.tag, vue.mergeProps({
          "ref": rootEl,
          "onMouseenter": onMouseenter,
          "onMouseleave": onMouseleave,
          "class": ['v-navigation-drawer', `v-navigation-drawer--${location.value}`, {
            'v-navigation-drawer--expand-on-hover': props.expandOnHover,
            'v-navigation-drawer--floating': props.floating,
            'v-navigation-drawer--is-hovering': isHovering.value,
            'v-navigation-drawer--rail': props.rail,
            'v-navigation-drawer--temporary': isTemporary.value,
            'v-navigation-drawer--active': isActive.value,
            'v-navigation-drawer--sticky': isSticky.value
          }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class],
          "style": [backgroundColorStyles.value, layoutItemStyles.value, dragStyles.value, ssrBootStyles.value, stickyStyles.value, props.style]
        }, attrs), {
          default: () => [hasImage && vue.createVNode("div", {
            "key": "image",
            "class": "v-navigation-drawer__img"
          }, [slots.image ? slots.image?.({
            image: props.image
          }) : vue.createVNode("img", {
            "src": props.image,
            "alt": ""
          }, null)]), slots.prepend && vue.createVNode("div", {
            "class": "v-navigation-drawer__prepend"
          }, [slots.prepend?.()]), vue.createVNode("div", {
            "class": "v-navigation-drawer__content"
          }, [slots.default?.()]), slots.append && vue.createVNode("div", {
            "class": "v-navigation-drawer__append"
          }, [slots.append?.()])]
        }), vue.createVNode(vue.Transition, {
          "name": "fade-transition"
        }, {
          default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && vue.createVNode("div", {
            "class": ['v-navigation-drawer__scrim', scrimColor.backgroundColorClasses.value],
            "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
            "onClick": () => isActive.value = false
          }, null)]
        })]);
      });
      return {
        isStuck
      };
    }
  });

  // Composables
  const VNoSsr = defineComponent({
    name: 'VNoSsr',
    setup(_, _ref) {
      let {
        slots
      } = _ref;
      const show = useHydration();
      return () => show.value && slots.default?.();
    }
  });

  // Imports
  function useRefs() {
    const refs = vue.ref([]);
    vue.onBeforeUpdate(() => refs.value = []);
    function updateRef(e, i) {
      refs.value[i] = e;
    }
    return {
      refs,
      updateRef
    };
  }

  // Types

  const VPagination = genericComponent()({
    name: 'VPagination',
    props: {
      activeColor: String,
      start: {
        type: [Number, String],
        default: 1
      },
      modelValue: {
        type: Number,
        default: props => props.start
      },
      disabled: Boolean,
      length: {
        type: [Number, String],
        default: 1,
        validator: val => val % 1 === 0
      },
      totalVisible: [Number, String],
      firstIcon: {
        type: IconValue,
        default: '$first'
      },
      prevIcon: {
        type: IconValue,
        default: '$prev'
      },
      nextIcon: {
        type: IconValue,
        default: '$next'
      },
      lastIcon: {
        type: IconValue,
        default: '$last'
      },
      ariaLabel: {
        type: String,
        default: '$vuetify.pagination.ariaLabel.root'
      },
      pageAriaLabel: {
        type: String,
        default: '$vuetify.pagination.ariaLabel.page'
      },
      currentPageAriaLabel: {
        type: String,
        default: '$vuetify.pagination.ariaLabel.currentPage'
      },
      firstAriaLabel: {
        type: String,
        default: '$vuetify.pagination.ariaLabel.first'
      },
      previousAriaLabel: {
        type: String,
        default: '$vuetify.pagination.ariaLabel.previous'
      },
      nextAriaLabel: {
        type: String,
        default: '$vuetify.pagination.ariaLabel.next'
      },
      lastAriaLabel: {
        type: String,
        default: '$vuetify.pagination.ariaLabel.last'
      },
      ellipsis: {
        type: String,
        default: '...'
      },
      showFirstLastPage: Boolean,
      ...makeBorderProps(),
      ...makeComponentProps(),
      ...makeDensityProps(),
      ...makeElevationProps(),
      ...makeRoundedProps(),
      ...makeSizeProps(),
      ...makeTagProps({
        tag: 'nav'
      }),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: 'text'
      })
    },
    emits: {
      'update:modelValue': value => true,
      first: value => true,
      prev: value => true,
      next: value => true,
      last: value => true
    },
    setup(props, _ref) {
      let {
        slots,
        emit
      } = _ref;
      const page = useProxiedModel(props, 'modelValue');
      const {
        t,
        n
      } = useLocale();
      const {
        isRtl
      } = useRtl();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        width
      } = useDisplay();
      const maxButtons = vue.ref(-1);
      provideDefaults(undefined, {
        scoped: true
      });
      const {
        resizeRef
      } = useResizeObserver(entries => {
        if (!entries.length) return;
        const {
          target,
          contentRect
        } = entries[0];
        const firstItem = target.querySelector('.v-pagination__list > *');
        if (!firstItem) return;
        const totalWidth = contentRect.width;
        const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight) * 2;
        maxButtons.value = getMax(totalWidth, itemWidth);
      });
      const length = vue.computed(() => parseInt(props.length, 10));
      const start = vue.computed(() => parseInt(props.start, 10));
      const totalVisible = vue.computed(() => {
        if (props.totalVisible) return parseInt(props.totalVisible, 10);else if (maxButtons.value >= 0) return maxButtons.value;
        return getMax(width.value, 58);
      });
      function getMax(totalWidth, itemWidth) {
        const minButtons = props.showFirstLastPage ? 5 : 3;
        return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        +((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)));
      }
      const range = vue.computed(() => {
        if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return [];
        if (totalVisible.value <= 1) return [page.value];
        if (length.value <= totalVisible.value) {
          return createRange(length.value, start.value);
        }
        const even = totalVisible.value % 2 === 0;
        const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
        const left = even ? middle : middle + 1;
        const right = length.value - middle;
        if (left - page.value >= 0) {
          return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
        } else if (page.value - right >= (even ? 1 : 0)) {
          const rangeLength = totalVisible.value - 1;
          const rangeStart = length.value - rangeLength + start.value;
          return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
        } else {
          const rangeLength = Math.max(1, totalVisible.value - 3);
          const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
          return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
        }
      });

      // TODO: 'first' | 'prev' | 'next' | 'last' does not work here?
      function setValue(e, value, event) {
        e.preventDefault();
        page.value = value;
        event && emit(event, value);
      }
      const {
        refs,
        updateRef
      } = useRefs();
      provideDefaults({
        VPaginationBtn: {
          color: vue.toRef(props, 'color'),
          border: vue.toRef(props, 'border'),
          density: vue.toRef(props, 'density'),
          size: vue.toRef(props, 'size'),
          variant: vue.toRef(props, 'variant'),
          rounded: vue.toRef(props, 'rounded'),
          elevation: vue.toRef(props, 'elevation')
        }
      });
      const items = vue.computed(() => {
        return range.value.map((item, index) => {
          const ref = e => updateRef(e, index);
          if (typeof item === 'string') {
            return {
              isActive: false,
              key: `ellipsis-${index}`,
              page: item,
              props: {
                ref,
                ellipsis: true,
                icon: true,
                disabled: true
              }
            };
          } else {
            const isActive = item === page.value;
            return {
              isActive,
              key: item,
              page: n(item),
              props: {
                ref,
                ellipsis: false,
                icon: true,
                disabled: !!props.disabled || +props.length < 2,
                color: isActive ? props.activeColor : props.color,
                ariaCurrent: isActive,
                ariaLabel: t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
                onClick: e => setValue(e, item)
              }
            };
          }
        });
      });
      const controls = vue.computed(() => {
        const prevDisabled = !!props.disabled || page.value <= start.value;
        const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
        return {
          first: props.showFirstLastPage ? {
            icon: isRtl.value ? props.lastIcon : props.firstIcon,
            onClick: e => setValue(e, start.value, 'first'),
            disabled: prevDisabled,
            ariaLabel: t(props.firstAriaLabel),
            ariaDisabled: prevDisabled
          } : undefined,
          prev: {
            icon: isRtl.value ? props.nextIcon : props.prevIcon,
            onClick: e => setValue(e, page.value - 1, 'prev'),
            disabled: prevDisabled,
            ariaLabel: t(props.previousAriaLabel),
            ariaDisabled: prevDisabled
          },
          next: {
            icon: isRtl.value ? props.prevIcon : props.nextIcon,
            onClick: e => setValue(e, page.value + 1, 'next'),
            disabled: nextDisabled,
            ariaLabel: t(props.nextAriaLabel),
            ariaDisabled: nextDisabled
          },
          last: props.showFirstLastPage ? {
            icon: isRtl.value ? props.firstIcon : props.lastIcon,
            onClick: e => setValue(e, start.value + length.value - 1, 'last'),
            disabled: nextDisabled,
            ariaLabel: t(props.lastAriaLabel),
            ariaDisabled: nextDisabled
          } : undefined
        };
      });
      function updateFocus() {
        const currentIndex = page.value - start.value;
        refs.value[currentIndex]?.$el.focus();
      }
      function onKeydown(e) {
        if (e.key === keyValues.left && !props.disabled && page.value > +props.start) {
          page.value = page.value - 1;
          vue.nextTick(updateFocus);
        } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
          page.value = page.value + 1;
          vue.nextTick(updateFocus);
        }
      }
      useRender(() => vue.createVNode(props.tag, {
        "ref": resizeRef,
        "class": ['v-pagination', themeClasses.value, props.class],
        "style": props.style,
        "role": "navigation",
        "aria-label": t(props.ariaLabel),
        "onKeydown": onKeydown,
        "data-test": "v-pagination-root"
      }, {
        default: () => [vue.createVNode("ul", {
          "class": "v-pagination__list"
        }, [props.showFirstLastPage && vue.createVNode("li", {
          "key": "first",
          "class": "v-pagination__first",
          "data-test": "v-pagination-first"
        }, [slots.first ? slots.first(controls.value.first) : vue.createVNode(VBtn, vue.mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.first), null)]), vue.createVNode("li", {
          "key": "prev",
          "class": "v-pagination__prev",
          "data-test": "v-pagination-prev"
        }, [slots.prev ? slots.prev(controls.value.prev) : vue.createVNode(VBtn, vue.mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.prev), null)]), items.value.map((item, index) => vue.createVNode("li", {
          "key": item.key,
          "class": ['v-pagination__item', {
            'v-pagination__item--is-active': item.isActive
          }],
          "data-test": "v-pagination-item"
        }, [slots.item ? slots.item(item) : vue.createVNode(VBtn, vue.mergeProps({
          "_as": "VPaginationBtn"
        }, item.props), {
          default: () => [item.page]
        })])), vue.createVNode("li", {
          "key": "next",
          "class": "v-pagination__next",
          "data-test": "v-pagination-next"
        }, [slots.next ? slots.next(controls.value.next) : vue.createVNode(VBtn, vue.mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.next), null)]), props.showFirstLastPage && vue.createVNode("li", {
          "key": "last",
          "class": "v-pagination__last",
          "data-test": "v-pagination-last"
        }, [slots.last ? slots.last(controls.value.last) : vue.createVNode(VBtn, vue.mergeProps({
          "_as": "VPaginationBtn"
        }, controls.value.last), null)])])]
      }));
      return {};
    }
  });

  // Types

  function floor(val) {
    return Math.floor(Math.abs(val)) * Math.sign(val);
  }
  const VParallax = genericComponent()({
    name: 'VParallax',
    props: {
      scale: {
        type: [Number, String],
        default: 0.5
      },
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver();
      const {
        resizeRef,
        contentRect
      } = useResizeObserver();
      const {
        height: displayHeight
      } = useDisplay();
      const root = vue.ref();
      vue.watchEffect(() => {
        intersectionRef.value = resizeRef.value = root.value?.$el;
      });
      let scrollParent;
      vue.watch(isIntersecting, val => {
        if (val) {
          scrollParent = getScrollParent(intersectionRef.value);
          scrollParent = scrollParent === document.scrollingElement ? document : scrollParent;
          scrollParent.addEventListener('scroll', onScroll, {
            passive: true
          });
          onScroll();
        } else {
          scrollParent.removeEventListener('scroll', onScroll);
        }
      });
      vue.onBeforeUnmount(() => {
        scrollParent?.removeEventListener('scroll', onScroll);
      });
      vue.watch(displayHeight, onScroll);
      vue.watch(() => contentRect.value?.height, onScroll);
      const scale = vue.computed(() => {
        return 1 - clamp(+props.scale);
      });
      let frame = -1;
      function onScroll() {
        if (!isIntersecting.value) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const el = (root.value?.$el).querySelector('.v-img__img');
          if (!el) return;
          const scrollHeight = scrollParent instanceof Document ? document.documentElement.clientHeight : scrollParent.clientHeight;
          const scrollPos = scrollParent instanceof Document ? window.scrollY : scrollParent.scrollTop;
          const top = intersectionRef.value.getBoundingClientRect().top + scrollPos;
          const height = contentRect.value.height;
          const center = top + (height - scrollHeight) / 2;
          const translate = floor((scrollPos - center) * scale.value);
          const sizeScale = Math.max(1, (scale.value * (scrollHeight - height) + height) / height);
          el.style.setProperty('transform', `translateY(${translate}px) scale(${sizeScale})`);
        });
      }
      useRender(() => vue.createVNode(VImg, {
        "class": ['v-parallax', {
          'v-parallax--active': isIntersecting.value
        }, props.class],
        "style": props.style,
        "ref": root,
        "cover": true,
        "onLoadstart": onScroll,
        "onLoad": onScroll
      }, slots));
      return {};
    }
  });

  // Types

  const VRadio = genericComponent()({
    name: 'VRadio',
    props: {
      ...makeSelectionControlProps({
        falseIcon: '$radioOff',
        trueIcon: '$radioOn'
      })
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => vue.createVNode(VSelectionControl, vue.mergeProps(props, {
        "class": ['v-radio', props.class],
        "style": props.style,
        "type": "radio"
      }), slots));
      return {};
    }
  });

  // Types

  const VRadioGroup = genericComponent()({
    name: 'VRadioGroup',
    inheritAttrs: false,
    props: {
      height: {
        type: [Number, String],
        default: 'auto'
      },
      ...makeVInputProps(),
      ...omit(makeSelectionControlGroupProps(), ['multiple']),
      trueIcon: {
        type: IconValue,
        default: '$radioOn'
      },
      falseIcon: {
        type: IconValue,
        default: '$radioOff'
      },
      type: {
        type: String,
        default: 'radio'
      }
    },
    emits: {
      'update:modelValue': val => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const uid = getUid();
      const id = vue.computed(() => props.id || `radio-group-${uid}`);
      const model = useProxiedModel(props, 'modelValue');
      useRender(() => {
        const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
        const [inputProps, _1] = VInput.filterProps(props);
        const [controlProps, _2] = VSelectionControl.filterProps(props);
        const label = slots.label ? slots.label({
          label: props.label,
          props: {
            for: id.value
          }
        }) : props.label;
        return vue.createVNode(VInput, vue.mergeProps({
          "class": ['v-radio-group', props.class],
          "style": props.style
        }, inputAttrs, inputProps, {
          "modelValue": model.value,
          "onUpdate:modelValue": $event => model.value = $event,
          "id": id.value
        }), {
          ...slots,
          default: _ref2 => {
            let {
              id,
              messagesId,
              isDisabled,
              isReadonly
            } = _ref2;
            return vue.createVNode(vue.Fragment, null, [label && vue.createVNode(VLabel, {
              "id": id.value
            }, {
              default: () => [label]
            }), vue.createVNode(VSelectionControlGroup, vue.mergeProps(controlProps, {
              "id": id.value,
              "aria-describedby": messagesId.value,
              "defaultsTarget": "VRadio",
              "trueIcon": props.trueIcon,
              "falseIcon": props.falseIcon,
              "type": props.type,
              "disabled": isDisabled.value,
              "readonly": isReadonly.value,
              "aria-labelledby": label ? id.value : undefined,
              "multiple": false
            }, controlAttrs, {
              "modelValue": model.value,
              "onUpdate:modelValue": $event => model.value = $event
            }), slots)]);
          }
        });
      });
      return {};
    }
  });

  // Types

  const VRangeSlider = genericComponent()({
    name: 'VRangeSlider',
    props: {
      ...makeFocusProps(),
      ...makeVInputProps(),
      ...makeSliderProps(),
      strict: Boolean,
      modelValue: {
        type: Array,
        default: () => [0, 0]
      }
    },
    emits: {
      'update:focused': value => true,
      'update:modelValue': value => true,
      end: value => true,
      start: value => true
    },
    setup(props, _ref) {
      let {
        slots,
        emit
      } = _ref;
      const startThumbRef = vue.ref();
      const stopThumbRef = vue.ref();
      const inputRef = vue.ref();
      function getActiveThumb(e) {
        if (!startThumbRef.value || !stopThumbRef.value) return;
        const startOffset = getOffset(e, startThumbRef.value.$el, props.direction);
        const stopOffset = getOffset(e, stopThumbRef.value.$el, props.direction);
        const a = Math.abs(startOffset);
        const b = Math.abs(stopOffset);
        return a < b || a === b && startOffset < 0 ? startThumbRef.value.$el : stopThumbRef.value.$el;
      }
      const steps = useSteps(props);
      const model = useProxiedModel(props, 'modelValue', undefined, arr => {
        if (!arr?.length) return [0, 0];
        return arr.map(value => steps.roundValue(value));
      });
      const {
        activeThumbRef,
        hasLabels,
        max,
        min,
        mousePressed,
        onSliderMousedown,
        onSliderTouchstart,
        position,
        trackContainerRef
      } = useSlider({
        props,
        steps,
        onSliderStart: () => {
          emit('start', model.value);
        },
        onSliderEnd: _ref2 => {
          let {
            value
          } = _ref2;
          const newValue = activeThumbRef.value === startThumbRef.value?.$el ? [value, model.value[1]] : [model.value[0], value];
          model.value = newValue;
          emit('end', newValue);
        },
        onSliderMove: _ref3 => {
          let {
            value
          } = _ref3;
          const [start, stop] = model.value;
          if (!props.strict && start === stop && start !== min.value) {
            activeThumbRef.value = value > start ? stopThumbRef.value?.$el : startThumbRef.value?.$el;
            activeThumbRef.value?.focus();
          }
          if (activeThumbRef.value === startThumbRef.value?.$el) {
            model.value = [Math.min(value, stop), stop];
          } else {
            model.value = [start, Math.max(start, value)];
          }
        },
        getActiveThumb
      });
      const {
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const trackStart = vue.computed(() => position(model.value[0]));
      const trackStop = vue.computed(() => position(model.value[1]));
      useRender(() => {
        const [inputProps, _] = VInput.filterProps(props);
        const hasPrepend = !!(props.label || slots.label || slots.prepend);
        return vue.createVNode(VInput, vue.mergeProps({
          "class": ['v-slider', 'v-range-slider', {
            'v-slider--has-labels': !!slots['tick-label'] || hasLabels.value,
            'v-slider--focused': isFocused.value,
            'v-slider--pressed': mousePressed.value,
            'v-slider--disabled': props.disabled
          }, props.class],
          "style": props.style,
          "ref": inputRef
        }, inputProps, {
          "focused": isFocused.value
        }), {
          ...slots,
          prepend: hasPrepend ? slotProps => vue.createVNode(vue.Fragment, null, [slots.label?.(slotProps) ?? props.label ? vue.createVNode(VLabel, {
            "class": "v-slider__label",
            "text": props.label
          }, null) : undefined, slots.prepend?.(slotProps)]) : undefined,
          default: _ref4 => {
            let {
              id,
              messagesId
            } = _ref4;
            return vue.createVNode("div", {
              "class": "v-slider__container",
              "onMousedown": onSliderMousedown,
              "onTouchstartPassive": onSliderTouchstart
            }, [vue.createVNode("input", {
              "id": `${id.value}_start`,
              "name": props.name || id.value,
              "disabled": props.disabled,
              "readonly": props.readonly,
              "tabindex": "-1",
              "value": model.value[0]
            }, null), vue.createVNode("input", {
              "id": `${id.value}_stop`,
              "name": props.name || id.value,
              "disabled": props.disabled,
              "readonly": props.readonly,
              "tabindex": "-1",
              "value": model.value[1]
            }, null), vue.createVNode(VSliderTrack, {
              "ref": trackContainerRef,
              "start": trackStart.value,
              "stop": trackStop.value
            }, {
              'tick-label': slots['tick-label']
            }), vue.createVNode(VSliderThumb, {
              "ref": startThumbRef,
              "aria-describedby": messagesId.value,
              "focused": isFocused && activeThumbRef.value === startThumbRef.value?.$el,
              "modelValue": model.value[0],
              "onUpdate:modelValue": v => model.value = [v, model.value[1]],
              "onFocus": e => {
                focus();
                activeThumbRef.value = startThumbRef.value?.$el;

                // Make sure second thumb is focused if
                // the thumbs are on top of each other
                // and they are both at minimum value
                // but only if focused from outside.
                if (model.value[0] === model.value[1] && model.value[1] === min.value && e.relatedTarget !== stopThumbRef.value?.$el) {
                  startThumbRef.value?.$el.blur();
                  stopThumbRef.value?.$el.focus();
                }
              },
              "onBlur": () => {
                blur();
                activeThumbRef.value = undefined;
              },
              "min": min.value,
              "max": model.value[1],
              "position": trackStart.value
            }, {
              'thumb-label': slots['thumb-label']
            }), vue.createVNode(VSliderThumb, {
              "ref": stopThumbRef,
              "aria-describedby": messagesId.value,
              "focused": isFocused && activeThumbRef.value === stopThumbRef.value?.$el,
              "modelValue": model.value[1],
              "onUpdate:modelValue": v => model.value = [model.value[0], v],
              "onFocus": e => {
                focus();
                activeThumbRef.value = stopThumbRef.value?.$el;

                // Make sure first thumb is focused if
                // the thumbs are on top of each other
                // and they are both at maximum value
                // but only if focused from outside.
                if (model.value[0] === model.value[1] && model.value[0] === max.value && e.relatedTarget !== startThumbRef.value?.$el) {
                  stopThumbRef.value?.$el.blur();
                  startThumbRef.value?.$el.focus();
                }
              },
              "onBlur": () => {
                blur();
                activeThumbRef.value = undefined;
              },
              "min": model.value[0],
              "max": max.value,
              "position": trackStop.value
            }, {
              'thumb-label': slots['thumb-label']
            })]);
          }
        });
      });
      return {};
    }
  });

  // Types

  const VRating = genericComponent()({
    name: 'VRating',
    props: {
      name: String,
      itemAriaLabel: {
        type: String,
        default: '$vuetify.rating.ariaLabel.item'
      },
      activeColor: String,
      color: String,
      clearable: Boolean,
      disabled: Boolean,
      emptyIcon: {
        type: IconValue,
        default: '$ratingEmpty'
      },
      fullIcon: {
        type: IconValue,
        default: '$ratingFull'
      },
      halfIncrements: Boolean,
      hover: Boolean,
      length: {
        type: [Number, String],
        default: 5
      },
      readonly: Boolean,
      modelValue: {
        type: [Number, String],
        default: 0
      },
      itemLabels: Array,
      itemLabelPosition: {
        type: String,
        default: 'top',
        validator: v => ['top', 'bottom'].includes(v)
      },
      ripple: Boolean,
      ...makeComponentProps(),
      ...makeDensityProps(),
      ...makeSizeProps(),
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
      const {
        t
      } = useLocale();
      const {
        themeClasses
      } = provideTheme(props);
      const rating = useProxiedModel(props, 'modelValue');
      const normalizedValue = vue.computed(() => clamp(parseFloat(rating.value), 0, +props.length));
      const range = vue.computed(() => createRange(Number(props.length), 1));
      const increments = vue.computed(() => range.value.flatMap(v => props.halfIncrements ? [v - 0.5, v] : [v]));
      const hoverIndex = vue.ref(-1);
      const itemState = vue.computed(() => increments.value.map(value => {
        const isHovering = props.hover && hoverIndex.value > -1;
        const isFilled = normalizedValue.value >= value;
        const isHovered = hoverIndex.value >= value;
        const isFullIcon = isHovering ? isHovered : isFilled;
        const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
        const activeColor = props.activeColor ?? props.color;
        const color = isFilled || isHovered ? activeColor : props.color;
        return {
          isFilled,
          isHovered,
          icon,
          color
        };
      }));
      const eventState = vue.computed(() => [0, ...increments.value].map(value => {
        function onMouseenter() {
          hoverIndex.value = value;
        }
        function onMouseleave() {
          hoverIndex.value = -1;
        }
        function onClick() {
          if (props.disabled || props.readonly) return;
          rating.value = normalizedValue.value === value && props.clearable ? 0 : value;
        }
        return {
          onMouseenter: props.hover ? onMouseenter : undefined,
          onMouseleave: props.hover ? onMouseleave : undefined,
          onClick
        };
      }));
      const name = vue.computed(() => props.name ?? `v-rating-${getUid()}`);
      function VRatingItem(_ref2) {
        let {
          value,
          index,
          showStar = true
        } = _ref2;
        const {
          onMouseenter,
          onMouseleave,
          onClick
        } = eventState.value[index + 1];
        const id = `${name.value}-${String(value).replace('.', '-')}`;
        const btnProps = {
          color: itemState.value[index]?.color,
          density: props.density,
          disabled: props.disabled,
          icon: itemState.value[index]?.icon,
          ripple: props.ripple,
          size: props.size,
          variant: 'plain'
        };
        return vue.createVNode(vue.Fragment, null, [vue.createVNode("label", {
          "for": id,
          "class": {
            'v-rating__item--half': props.halfIncrements && value % 1 > 0,
            'v-rating__item--full': props.halfIncrements && value % 1 === 0
          },
          "onMouseenter": onMouseenter,
          "onMouseleave": onMouseleave,
          "onClick": onClick
        }, [vue.createVNode("span", {
          "class": "v-rating__hidden"
        }, [t(props.itemAriaLabel, value, props.length)]), !showStar ? undefined : slots.item ? slots.item({
          ...itemState.value[index],
          props: btnProps,
          value,
          index,
          rating: normalizedValue.value
        }) : vue.createVNode(VBtn, btnProps, null)]), vue.createVNode("input", {
          "class": "v-rating__hidden",
          "name": name.value,
          "id": id,
          "type": "radio",
          "value": value,
          "checked": normalizedValue.value === value,
          "tabindex": -1,
          "readonly": props.readonly,
          "disabled": props.disabled
        }, null)]);
      }
      function createLabel(labelProps) {
        if (slots['item-label']) return slots['item-label'](labelProps);
        if (labelProps.label) return vue.createVNode("span", null, [labelProps.label]);
        return vue.createVNode("span", null, [vue.createTextVNode("\xA0")]);
      }
      useRender(() => {
        const hasLabels = !!props.itemLabels?.length || slots['item-label'];
        return vue.createVNode(props.tag, {
          "class": ['v-rating', {
            'v-rating--hover': props.hover,
            'v-rating--readonly': props.readonly
          }, themeClasses.value, props.class],
          "style": props.style
        }, {
          default: () => [vue.createVNode(VRatingItem, {
            "value": 0,
            "index": -1,
            "showStar": false
          }, null), range.value.map((value, i) => vue.createVNode("div", {
            "class": "v-rating__wrapper"
          }, [hasLabels && props.itemLabelPosition === 'top' ? createLabel({
            value,
            index: i,
            label: props.itemLabels?.[i]
          }) : undefined, vue.createVNode("div", {
            "class": "v-rating__item"
          }, [props.halfIncrements ? vue.createVNode(vue.Fragment, null, [vue.createVNode(VRatingItem, {
            "value": value - 0.5,
            "index": i * 2
          }, null), vue.createVNode(VRatingItem, {
            "value": value,
            "index": i * 2 + 1
          }, null)]) : vue.createVNode(VRatingItem, {
            "value": value,
            "index": i
          }, null)]), hasLabels && props.itemLabelPosition === 'bottom' ? createLabel({
            value,
            index: i,
            label: props.itemLabels?.[i]
          }) : undefined]))]
        });
      });
      return {};
    }
  });

  function bias(val) {
    const c = 0.501;
    const x = Math.abs(val);
    return Math.sign(val) * (x / ((1 / c - 2) * (1 - x) + 1));
  }
  function calculateUpdatedOffset(_ref) {
    let {
      selectedElement,
      containerSize,
      contentSize,
      isRtl,
      currentScrollOffset,
      isHorizontal
    } = _ref;
    const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
    const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
    const adjustedOffsetStart = isRtl && isHorizontal ? contentSize - offsetStart - clientSize : offsetStart;
    const totalSize = containerSize + currentScrollOffset;
    const itemOffset = clientSize + adjustedOffsetStart;
    const additionalOffset = clientSize * 0.4;
    if (adjustedOffsetStart <= currentScrollOffset) {
      currentScrollOffset = Math.max(adjustedOffsetStart - additionalOffset, 0);
    } else if (totalSize <= itemOffset) {
      currentScrollOffset = Math.min(currentScrollOffset - (totalSize - itemOffset - additionalOffset), contentSize - containerSize);
    }
    return currentScrollOffset;
  }
  function calculateCenteredOffset(_ref2) {
    let {
      selectedElement,
      containerSize,
      contentSize,
      isRtl,
      isHorizontal
    } = _ref2;
    const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight;
    const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop;
    const offsetCentered = isRtl && isHorizontal ? contentSize - offsetStart - clientSize / 2 - containerSize / 2 : offsetStart + clientSize / 2 - containerSize / 2;
    return Math.min(contentSize - containerSize, Math.max(0, offsetCentered));
  }

  // Types

  const VSlideGroupSymbol = Symbol.for('vuetify:v-slide-group');
  const makeVSlideGroupProps = propsFactory({
    centerActive: Boolean,
    direction: {
      type: String,
      default: 'horizontal'
    },
    symbol: {
      type: null,
      default: VSlideGroupSymbol
    },
    nextIcon: {
      type: IconValue,
      default: '$next'
    },
    prevIcon: {
      type: IconValue,
      default: '$prev'
    },
    showArrows: {
      type: [Boolean, String],
      validator: v => typeof v === 'boolean' || ['always', 'desktop', 'mobile'].includes(v)
    },
    ...makeComponentProps(),
    ...makeTagProps(),
    ...makeGroupProps({
      selectedClass: 'v-slide-group-item--active'
    })
  }, 'v-slide-group');
  const VSlideGroup = genericComponent()({
    name: 'VSlideGroup',
    props: makeVSlideGroupProps(),
    emits: {
      'update:modelValue': value => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        isRtl
      } = useRtl();
      const {
        mobile
      } = useDisplay();
      const group = useGroup(props, props.symbol);
      const isOverflowing = vue.ref(false);
      const scrollOffset = vue.ref(0);
      const containerSize = vue.ref(0);
      const contentSize = vue.ref(0);
      const isHorizontal = vue.computed(() => props.direction === 'horizontal');
      const {
        resizeRef: containerRef,
        contentRect: containerRect
      } = useResizeObserver();
      const {
        resizeRef: contentRef,
        contentRect
      } = useResizeObserver();
      const firstSelectedIndex = vue.computed(() => {
        if (!group.selected.value.length) return -1;
        return group.items.value.findIndex(item => item.id === group.selected.value[0]);
      });
      const lastSelectedIndex = vue.computed(() => {
        if (!group.selected.value.length) return -1;
        return group.items.value.findIndex(item => item.id === group.selected.value[group.selected.value.length - 1]);
      });
      if (IN_BROWSER) {
        let frame = -1;
        vue.watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            if (containerRect.value && contentRect.value) {
              const sizeProperty = isHorizontal.value ? 'width' : 'height';
              containerSize.value = containerRect.value[sizeProperty];
              contentSize.value = contentRect.value[sizeProperty];
              isOverflowing.value = containerSize.value + 1 < contentSize.value;
            }
            if (firstSelectedIndex.value >= 0 && contentRef.value) {
              // TODO: Is this too naive? Should we store element references in group composable?
              const selectedElement = contentRef.value.children[lastSelectedIndex.value];
              if (firstSelectedIndex.value === 0 || !isOverflowing.value) {
                scrollOffset.value = 0;
              } else if (props.centerActive) {
                scrollOffset.value = calculateCenteredOffset({
                  selectedElement,
                  containerSize: containerSize.value,
                  contentSize: contentSize.value,
                  isRtl: isRtl.value,
                  isHorizontal: isHorizontal.value
                });
              } else if (isOverflowing.value) {
                scrollOffset.value = calculateUpdatedOffset({
                  selectedElement,
                  containerSize: containerSize.value,
                  contentSize: contentSize.value,
                  isRtl: isRtl.value,
                  currentScrollOffset: scrollOffset.value,
                  isHorizontal: isHorizontal.value
                });
              }
            }
          });
        });
      }
      const disableTransition = vue.ref(false);
      let startTouch = 0;
      let startOffset = 0;
      function onTouchstart(e) {
        const sizeProperty = isHorizontal.value ? 'clientX' : 'clientY';
        const sign = isRtl.value && isHorizontal.value ? -1 : 1;
        startOffset = sign * scrollOffset.value;
        startTouch = e.touches[0][sizeProperty];
        disableTransition.value = true;
      }
      function onTouchmove(e) {
        if (!isOverflowing.value) return;
        const sizeProperty = isHorizontal.value ? 'clientX' : 'clientY';
        const sign = isRtl.value && isHorizontal.value ? -1 : 1;
        scrollOffset.value = sign * (startOffset + startTouch - e.touches[0][sizeProperty]);
      }
      function onTouchend(e) {
        const maxScrollOffset = contentSize.value - containerSize.value;
        if (scrollOffset.value < 0 || !isOverflowing.value) {
          scrollOffset.value = 0;
        } else if (scrollOffset.value >= maxScrollOffset) {
          scrollOffset.value = maxScrollOffset;
        }
        disableTransition.value = false;
      }
      function onScroll() {
        if (!containerRef.value) return;
        containerRef.value[isHorizontal.value ? 'scrollLeft' : 'scrollTop'] = 0;
      }
      const isFocused = vue.ref(false);
      function onFocusin(e) {
        isFocused.value = true;
        if (!isOverflowing.value || !contentRef.value) return;

        // Focused element is likely to be the root of an item, so a
        // breadth-first search will probably find it in the first iteration
        for (const el of e.composedPath()) {
          for (const item of contentRef.value.children) {
            if (item === el) {
              scrollOffset.value = calculateUpdatedOffset({
                selectedElement: item,
                containerSize: containerSize.value,
                contentSize: contentSize.value,
                isRtl: isRtl.value,
                currentScrollOffset: scrollOffset.value,
                isHorizontal: isHorizontal.value
              });
              return;
            }
          }
        }
      }
      function onFocusout(e) {
        isFocused.value = false;
      }
      function onFocus(e) {
        if (!isFocused.value && !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget))) focus();
      }
      function onKeydown(e) {
        if (!contentRef.value) return;
        if (isHorizontal.value) {
          if (e.key === 'ArrowRight') {
            focus(isRtl.value ? 'prev' : 'next');
          } else if (e.key === 'ArrowLeft') {
            focus(isRtl.value ? 'next' : 'prev');
          }
        } else {
          if (e.key === 'ArrowDown') {
            focus('next');
          } else if (e.key === 'ArrowUp') {
            focus('prev');
          }
        }
        if (e.key === 'Home') {
          focus('first');
        } else if (e.key === 'End') {
          focus('last');
        }
      }
      function focus(location) {
        if (!contentRef.value) return;
        if (!location) {
          const focusable = focusableChildren(contentRef.value);
          focusable[0]?.focus();
        } else if (location === 'next') {
          const el = contentRef.value.querySelector(':focus')?.nextElementSibling;
          if (el) el.focus();else focus('first');
        } else if (location === 'prev') {
          const el = contentRef.value.querySelector(':focus')?.previousElementSibling;
          if (el) el.focus();else focus('last');
        } else if (location === 'first') {
          contentRef.value.firstElementChild?.focus();
        } else if (location === 'last') {
          contentRef.value.lastElementChild?.focus();
        }
      }
      function scrollTo(location) {
        const newAbsoluteOffset = scrollOffset.value + (location === 'prev' ? -1 : 1) * containerSize.value;
        scrollOffset.value = clamp(newAbsoluteOffset, 0, contentSize.value - containerSize.value);
      }
      const contentStyles = vue.computed(() => {
        // This adds friction when scrolling the 'wrong' way when at max offset
        let scrollAmount = scrollOffset.value > contentSize.value - containerSize.value ? -(contentSize.value - containerSize.value) + bias(contentSize.value - containerSize.value - scrollOffset.value) : -scrollOffset.value;

        // This adds friction when scrolling the 'wrong' way when at min offset
        if (scrollOffset.value <= 0) {
          scrollAmount = bias(-scrollOffset.value);
        }
        const sign = isRtl.value && isHorizontal.value ? -1 : 1;
        return {
          transform: `translate${isHorizontal.value ? 'X' : 'Y'}(${sign * scrollAmount}px)`,
          transition: disableTransition.value ? 'none' : '',
          willChange: disableTransition.value ? 'transform' : ''
        };
      });
      const slotProps = vue.computed(() => ({
        next: group.next,
        prev: group.prev,
        select: group.select,
        isSelected: group.isSelected
      }));
      const hasAffixes = vue.computed(() => {
        switch (props.showArrows) {
          // Always show arrows on desktop & mobile
          case 'always':
            return true;

          // Always show arrows on desktop
          case 'desktop':
            return !mobile.value;

          // Show arrows on mobile when overflowing.
          // This matches the default 2.2 behavior
          case true:
            return isOverflowing.value || Math.abs(scrollOffset.value) > 0;

          // Always show on mobile
          case 'mobile':
            return mobile.value || isOverflowing.value || Math.abs(scrollOffset.value) > 0;

          // https://material.io/components/tabs#scrollable-tabs
          // Always show arrows when
          // overflowed on desktop
          default:
            return !mobile.value && (isOverflowing.value || Math.abs(scrollOffset.value) > 0);
        }
      });
      const hasPrev = vue.computed(() => {
        return Math.abs(scrollOffset.value) > 0;
      });
      const hasNext = vue.computed(() => {
        // Check one scroll ahead to know the width of right-most item
        return contentSize.value > Math.abs(scrollOffset.value) + containerSize.value;
      });
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-slide-group', {
          'v-slide-group--vertical': !isHorizontal.value,
          'v-slide-group--has-affixes': hasAffixes.value,
          'v-slide-group--is-overflowing': isOverflowing.value
        }, props.class],
        "style": props.style,
        "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
        "onFocus": onFocus
      }, {
        default: () => [hasAffixes.value && vue.createVNode("div", {
          "key": "prev",
          "class": ['v-slide-group__prev', {
            'v-slide-group__prev--disabled': !hasPrev.value
          }],
          "onClick": () => scrollTo('prev')
        }, [slots.prev?.(slotProps.value) ?? vue.createVNode(VFadeTransition, null, {
          default: () => [vue.createVNode(VIcon, {
            "icon": isRtl.value ? props.nextIcon : props.prevIcon
          }, null)]
        })]), vue.createVNode("div", {
          "key": "container",
          "ref": containerRef,
          "class": "v-slide-group__container",
          "onScroll": onScroll
        }, [vue.createVNode("div", {
          "ref": contentRef,
          "class": "v-slide-group__content",
          "style": contentStyles.value,
          "onTouchstartPassive": onTouchstart,
          "onTouchmovePassive": onTouchmove,
          "onTouchendPassive": onTouchend,
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onKeydown": onKeydown
        }, [slots.default?.(slotProps.value)])]), hasAffixes.value && vue.createVNode("div", {
          "key": "next",
          "class": ['v-slide-group__next', {
            'v-slide-group__next--disabled': !hasNext.value
          }],
          "onClick": () => scrollTo('next')
        }, [slots.next?.(slotProps.value) ?? vue.createVNode(VFadeTransition, null, {
          default: () => [vue.createVNode(VIcon, {
            "icon": isRtl.value ? props.prevIcon : props.nextIcon
          }, null)]
        })])]
      }));
      return {
        selected: group.selected,
        scrollTo,
        scrollOffset,
        focus
      };
    }
  });

  // Composables

  // Types

  const VSlideGroupItem = genericComponent()({
    name: 'VSlideGroupItem',
    props: {
      ...makeGroupItemProps()
    },
    emits: {
      'group:selected': val => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const slideGroupItem = useGroupItem(props, VSlideGroupSymbol);
      return () => slots.default?.({
        isSelected: slideGroupItem.isSelected.value,
        select: slideGroupItem.select,
        toggle: slideGroupItem.toggle,
        selectedClass: slideGroupItem.selectedClass.value
      });
    }
  });

  const VSnackbar = genericComponent()({
    name: 'VSnackbar',
    props: {
      multiLine: Boolean,
      timeout: {
        type: [Number, String],
        default: 5000
      },
      vertical: Boolean,
      ...makeLocationProps({
        location: 'bottom'
      }),
      ...makePositionProps(),
      ...makeRoundedProps(),
      ...makeVariantProps(),
      ...makeThemeProps(),
      ...omit(makeVOverlayProps({
        transition: 'v-snackbar-transition'
      }), ['persistent', 'noClickAnimation', 'scrim', 'scrollStrategy'])
    },
    emits: {
      'update:modelValue': v => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const isActive = useProxiedModel(props, 'modelValue');
      const {
        locationStyles
      } = useLocation(props);
      const {
        positionClasses
      } = usePosition(props);
      const {
        scopeId
      } = useScopeId();
      const {
        themeClasses
      } = provideTheme(props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props);
      const {
        roundedClasses
      } = useRounded(props);
      const overlay = vue.ref();
      vue.watch(isActive, startTimeout);
      vue.watch(() => props.timeout, startTimeout);
      vue.onMounted(() => {
        if (isActive.value) startTimeout();
      });
      let activeTimeout = -1;
      function startTimeout() {
        window.clearTimeout(activeTimeout);
        const timeout = Number(props.timeout);
        if (!isActive.value || timeout === -1) return;
        activeTimeout = window.setTimeout(() => {
          isActive.value = false;
        }, timeout);
      }
      function onPointerenter() {
        window.clearTimeout(activeTimeout);
      }
      useRender(() => {
        const [overlayProps] = VOverlay.filterProps(props);
        return vue.createVNode(VOverlay, vue.mergeProps({
          "ref": overlay,
          "class": ['v-snackbar', {
            'v-snackbar--active': isActive.value,
            'v-snackbar--multi-line': props.multiLine && !props.vertical,
            'v-snackbar--vertical': props.vertical
          }, positionClasses.value, props.class],
          "style": props.style
        }, overlayProps, {
          "modelValue": isActive.value,
          "onUpdate:modelValue": $event => isActive.value = $event,
          "contentProps": vue.mergeProps({
            class: ['v-snackbar__wrapper', themeClasses.value, colorClasses.value, roundedClasses.value, variantClasses.value],
            style: [locationStyles.value, colorStyles.value],
            onPointerenter,
            onPointerleave: startTimeout
          }, overlayProps.contentProps),
          "persistent": true,
          "noClickAnimation": true,
          "scrim": false,
          "scrollStrategy": "none",
          "_disableGlobalStack": true
        }, scopeId), {
          default: () => [genOverlays(false, 'v-snackbar'), slots.default && vue.createVNode("div", {
            "class": "v-snackbar__content",
            "role": "status",
            "aria-live": "polite"
          }, [slots.default()]), slots.actions && vue.createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                variant: 'text',
                ripple: false
              }
            }
          }, {
            default: () => [vue.createVNode("div", {
              "class": "v-snackbar__actions"
            }, [slots.actions()])]
          })],
          activator: slots.activator
        });
      });
      return forwardRefs({}, overlay);
    }
  });

  // Types

  const VSwitch = genericComponent()({
    name: 'VSwitch',
    inheritAttrs: false,
    props: {
      indeterminate: Boolean,
      inset: Boolean,
      flat: Boolean,
      loading: {
        type: [Boolean, String],
        default: false
      },
      ...makeVInputProps(),
      ...makeSelectionControlProps()
    },
    emits: {
      'update:focused': focused => true,
      'update:modelValue': () => true,
      'update:indeterminate': val => true
    },
    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const indeterminate = useProxiedModel(props, 'indeterminate');
      const model = useProxiedModel(props, 'modelValue');
      const {
        loaderClasses
      } = useLoader(props);
      const {
        isFocused,
        focus,
        blur
      } = useFocus(props);
      const loaderColor = vue.computed(() => {
        return typeof props.loading === 'string' && props.loading !== '' ? props.loading : props.color;
      });
      const uid = getUid();
      const id = vue.computed(() => props.id || `switch-${uid}`);
      function onChange() {
        if (indeterminate.value) {
          indeterminate.value = false;
        }
      }
      useRender(() => {
        const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
        const [inputProps, _1] = VInput.filterProps(props);
        const [controlProps, _2] = VSelectionControl.filterProps(props);
        const control = vue.ref();
        function onClick(e) {
          e.stopPropagation();
          e.preventDefault();
          control.value?.input?.click();
        }
        return vue.createVNode(VInput, vue.mergeProps({
          "class": ['v-switch', {
            'v-switch--inset': props.inset
          }, {
            'v-switch--indeterminate': indeterminate.value
          }, loaderClasses.value, props.class],
          "style": props.style
        }, inputAttrs, inputProps, {
          "id": id.value,
          "focused": isFocused.value
        }), {
          ...slots,
          default: _ref2 => {
            let {
              id,
              messagesId,
              isDisabled,
              isReadonly,
              isValid
            } = _ref2;
            return vue.createVNode(VSelectionControl, vue.mergeProps({
              "ref": control
            }, controlProps, {
              "modelValue": model.value,
              "onUpdate:modelValue": [$event => model.value = $event, onChange],
              "id": id.value,
              "aria-describedby": messagesId.value,
              "type": "checkbox",
              "aria-checked": indeterminate.value ? 'mixed' : undefined,
              "disabled": isDisabled.value,
              "readonly": isReadonly.value,
              "onFocus": focus,
              "onBlur": blur
            }, controlAttrs), {
              ...slots,
              default: () => vue.createVNode("div", {
                "class": "v-switch__track",
                "onClick": onClick
              }, null),
              input: _ref3 => {
                let {
                  textColorClasses,
                  textColorStyles
                } = _ref3;
                return vue.createVNode("div", {
                  "class": ['v-switch__thumb', textColorClasses.value],
                  "style": textColorStyles.value
                }, [props.loading && vue.createVNode(LoaderSlot, {
                  "name": "v-switch",
                  "active": true,
                  "color": isValid.value === false ? undefined : loaderColor.value
                }, {
                  default: slotProps => slots.loader ? slots.loader(slotProps) : vue.createVNode(VProgressCircular, {
                    "active": slotProps.isActive,
                    "color": slotProps.color,
                    "indeterminate": true,
                    "size": "16",
                    "width": "2"
                  }, null)
                })]);
              }
            });
          }
        });
      });
      return {};
    }
  });

  const VSystemBar = genericComponent()({
    name: 'VSystemBar',
    props: {
      color: String,
      height: [Number, String],
      window: Boolean,
      ...makeComponentProps(),
      ...makeElevationProps(),
      ...makeLayoutItemProps(),
      ...makeRoundedProps(),
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
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props);
      const {
        ssrBootStyles
      } = useSsrBoot();
      const height = vue.computed(() => props.height ?? (props.window ? 32 : 24));
      const {
        layoutItemStyles
      } = useLayoutItem({
        id: props.name,
        order: vue.computed(() => parseInt(props.order, 10)),
        position: vue.ref('top'),
        layoutSize: height,
        elementSize: height,
        active: vue.computed(() => true),
        absolute: vue.toRef(props, 'absolute')
      });
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-system-bar', {
          'v-system-bar--window': props.window
        }, themeClasses.value, backgroundColorClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value, props.style]
      }, slots));
      return {};
    }
  });

  const VTabsSymbol = Symbol.for('vuetify:v-tabs');

  const VTab = genericComponent()({
    name: 'VTab',
    props: {
      fixed: Boolean,
      sliderColor: String,
      hideSlider: Boolean,
      direction: {
        type: String,
        default: 'horizontal'
      },
      ...omit(makeVBtnProps({
        selectedClass: 'v-tab--selected',
        variant: 'text'
      }), ['active', 'block', 'flat', 'location', 'position', 'symbol'])
    },
    setup(props, _ref) {
      let {
        slots,
        attrs
      } = _ref;
      const {
        textColorClasses: sliderColorClasses,
        textColorStyles: sliderColorStyles
      } = useTextColor(props, 'sliderColor');
      const isHorizontal = vue.computed(() => props.direction === 'horizontal');
      const isSelected = vue.ref(false);
      const rootEl = vue.ref();
      const sliderEl = vue.ref();
      function updateSlider(_ref2) {
        let {
          value
        } = _ref2;
        isSelected.value = value;
        if (value) {
          const prevEl = rootEl.value?.$el.parentElement?.querySelector('.v-tab--selected .v-tab__slider');
          const nextEl = sliderEl.value;
          if (!prevEl || !nextEl) return;
          const color = getComputedStyle(prevEl).color;
          const prevBox = prevEl.getBoundingClientRect();
          const nextBox = nextEl.getBoundingClientRect();
          const xy = isHorizontal.value ? 'x' : 'y';
          const XY = isHorizontal.value ? 'X' : 'Y';
          const rightBottom = isHorizontal.value ? 'right' : 'bottom';
          const widthHeight = isHorizontal.value ? 'width' : 'height';
          const prevPos = prevBox[xy];
          const nextPos = nextBox[xy];
          const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
          const origin = Math.sign(delta) > 0 ? isHorizontal.value ? 'right' : 'bottom' : Math.sign(delta) < 0 ? isHorizontal.value ? 'left' : 'top' : 'center';
          const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
          const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]);
          const initialScale = prevBox[widthHeight] / nextBox[widthHeight];
          const sigma = 1.5;
          animate(nextEl, {
            backgroundColor: [color, ''],
            transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, ''],
            transformOrigin: Array(3).fill(origin)
          }, {
            duration: 225,
            easing: standardEasing
          });
        }
      }
      useRender(() => {
        const [btnProps] = VBtn.filterProps(props);
        return vue.createVNode(VBtn, vue.mergeProps({
          "symbol": VTabsSymbol,
          "ref": rootEl,
          "class": ['v-tab', props.class],
          "style": props.style,
          "tabindex": isSelected.value ? 0 : -1,
          "role": "tab",
          "aria-selected": String(isSelected.value),
          "active": false,
          "block": props.fixed,
          "maxWidth": props.fixed ? 300 : undefined,
          "rounded": 0
        }, btnProps, attrs, {
          "onGroup:selected": updateSlider
        }), {
          default: () => [slots.default?.() ?? props.text, !props.hideSlider && vue.createVNode("div", {
            "ref": sliderEl,
            "class": ['v-tab__slider', sliderColorClasses.value],
            "style": sliderColorStyles.value
          }, null)]
        });
      });
      return {};
    }
  });

  function parseItems(items) {
    if (!items) return [];
    return items.map(item => {
      if (typeof item === 'string') return {
        title: item,
        value: item
      };
      return item;
    });
  }
  const VTabs = genericComponent()({
    name: 'VTabs',
    props: {
      alignTabs: {
        type: String,
        default: 'start'
      },
      color: String,
      fixedTabs: Boolean,
      items: {
        type: Array,
        default: () => []
      },
      stacked: Boolean,
      bgColor: String,
      grow: Boolean,
      height: {
        type: [Number, String],
        default: undefined
      },
      hideSlider: Boolean,
      sliderColor: String,
      ...makeVSlideGroupProps({
        mandatory: 'force'
      }),
      ...makeDensityProps(),
      ...makeTagProps()
    },
    emits: {
      'update:modelValue': v => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const model = useProxiedModel(props, 'modelValue');
      const parsedItems = vue.computed(() => parseItems(props.items));
      const {
        densityClasses
      } = useDensity(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'bgColor'));
      provideDefaults({
        VTab: {
          color: vue.toRef(props, 'color'),
          direction: vue.toRef(props, 'direction'),
          stacked: vue.toRef(props, 'stacked'),
          fixed: vue.toRef(props, 'fixedTabs'),
          sliderColor: vue.toRef(props, 'sliderColor'),
          hideSlider: vue.toRef(props, 'hideSlider')
        }
      });
      useRender(() => {
        const [slideGroupProps] = VSlideGroup.filterProps(props);
        return vue.createVNode(VSlideGroup, vue.mergeProps(slideGroupProps, {
          "modelValue": model.value,
          "onUpdate:modelValue": $event => model.value = $event,
          "class": ['v-tabs', `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
            'v-tabs--fixed-tabs': props.fixedTabs,
            'v-tabs--grow': props.grow,
            'v-tabs--stacked': props.stacked
          }, densityClasses.value, backgroundColorClasses.value, props.class],
          "style": [{
            '--v-tabs-height': convertToUnit(props.height)
          }, backgroundColorStyles.value, props.style],
          "role": "tablist",
          "symbol": VTabsSymbol
        }), {
          default: () => [slots.default ? slots.default() : parsedItems.value.map(item => vue.createVNode(VTab, vue.mergeProps(item, {
            "key": item.title
          }), null))]
        });
      });
      return {};
    }
  });

  const VTable = genericComponent()({
    name: 'VTable',
    props: {
      fixedHeader: Boolean,
      fixedFooter: Boolean,
      height: [Number, String],
      hover: Boolean,
      ...makeComponentProps(),
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
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-table', {
          'v-table--fixed-height': !!props.height,
          'v-table--fixed-header': props.fixedHeader,
          'v-table--fixed-footer': props.fixedFooter,
          'v-table--has-top': !!slots.top,
          'v-table--has-bottom': !!slots.bottom,
          'v-table--hover': props.hover
        }, themeClasses.value, densityClasses.value, props.class],
        "style": props.style
      }, {
        default: () => [slots.top?.(), slots.default ? vue.createVNode("div", {
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [vue.createVNode("table", null, [slots.default()])]) : slots.wrapper?.(), slots.bottom?.()]
      }));
      return {};
    }
  });

  // Types

  const VTextarea = genericComponent()({
    name: 'VTextarea',
    directives: {
      Intersect
    },
    inheritAttrs: false,
    props: {
      autoGrow: Boolean,
      autofocus: Boolean,
      counter: [Boolean, Number, String],
      counterValue: Function,
      prefix: String,
      placeholder: String,
      persistentPlaceholder: Boolean,
      persistentCounter: Boolean,
      noResize: Boolean,
      rows: {
        type: [Number, String],
        default: 5,
        validator: v => !isNaN(parseFloat(v))
      },
      maxRows: {
        type: [Number, String],
        validator: v => !isNaN(parseFloat(v))
      },
      suffix: String,
      modelModifiers: Object,
      ...makeVInputProps(),
      ...makeVFieldProps()
    },
    emits: {
      'click:control': e => true,
      'mousedown:control': e => true,
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
        return typeof props.counterValue === 'function' ? props.counterValue(model.value) : (model.value || '').toString().length;
      });
      const max = vue.computed(() => {
        if (attrs.maxlength) return attrs.maxlength;
        if (!props.counter || typeof props.counter !== 'number' && typeof props.counter !== 'string') return undefined;
        return props.counter;
      });
      function onIntersect(isIntersecting, entries) {
        if (!props.autofocus || !isIntersecting) return;
        entries[0].target?.focus?.();
      }
      const vInputRef = vue.ref();
      const vFieldRef = vue.ref();
      const controlHeight = vue.ref('');
      const textareaRef = vue.ref();
      const isActive = vue.computed(() => props.persistentPlaceholder || isFocused.value || props.active);
      function onFocus() {
        if (textareaRef.value !== document.activeElement) {
          textareaRef.value?.focus();
        }
        if (!isFocused.value) focus();
      }
      function onControlClick(e) {
        onFocus();
        emit('click:control', e);
      }
      function onControlMousedown(e) {
        emit('mousedown:control', e);
      }
      function onClear(e) {
        e.stopPropagation();
        onFocus();
        vue.nextTick(() => {
          model.value = '';
          callEvent(props['onClick:clear'], e);
        });
      }
      function onInput(e) {
        const el = e.target;
        model.value = el.value;
        if (props.modelModifiers?.trim) {
          const caretPosition = [el.selectionStart, el.selectionEnd];
          vue.nextTick(() => {
            el.selectionStart = caretPosition[0];
            el.selectionEnd = caretPosition[1];
          });
        }
      }
      const sizerRef = vue.ref();
      function calculateInputHeight() {
        if (!props.autoGrow) return;
        vue.nextTick(() => {
          if (!sizerRef.value || !vFieldRef.value) return;
          const style = getComputedStyle(sizerRef.value);
          const fieldStyle = getComputedStyle(vFieldRef.value.$el);
          const padding = parseFloat(style.getPropertyValue('--v-field-padding-top')) + parseFloat(style.getPropertyValue('--v-input-padding-top')) + parseFloat(style.getPropertyValue('--v-field-padding-bottom'));
          const height = sizerRef.value.scrollHeight;
          const lineHeight = parseFloat(style.lineHeight);
          const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue('--v-input-control-height')));
          const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
          controlHeight.value = convertToUnit(clamp(height ?? 0, minHeight, maxHeight));
        });
      }
      vue.onMounted(calculateInputHeight);
      vue.watch(model, calculateInputHeight);
      vue.watch(() => props.rows, calculateInputHeight);
      vue.watch(() => props.maxRows, calculateInputHeight);
      vue.watch(() => props.density, calculateInputHeight);
      let observer;
      vue.watch(sizerRef, val => {
        if (val) {
          observer = new ResizeObserver(calculateInputHeight);
          observer.observe(sizerRef.value);
        } else {
          observer?.disconnect();
        }
      });
      vue.onBeforeUnmount(() => {
        observer?.disconnect();
      });
      useRender(() => {
        const hasCounter = !!(slots.counter || props.counter || props.counterValue);
        const hasDetails = !!(hasCounter || slots.details);
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [{
          modelValue: _,
          ...inputProps
        }] = VInput.filterProps(props);
        const [fieldProps] = filterFieldProps(props);
        return vue.createVNode(VInput, vue.mergeProps({
          "ref": vInputRef,
          "modelValue": model.value,
          "onUpdate:modelValue": $event => model.value = $event,
          "class": ['v-textarea v-text-field', {
            'v-textarea--prefixed': props.prefix,
            'v-textarea--suffixed': props.suffix,
            'v-text-field--prefixed': props.prefix,
            'v-text-field--suffixed': props.suffix,
            'v-textarea--auto-grow': props.autoGrow,
            'v-textarea--no-resize': props.noResize || props.autoGrow,
            'v-text-field--flush-details': ['plain', 'underlined'].includes(props.variant)
          }, props.class],
          "style": props.style
        }, rootAttrs, inputProps, {
          "focused": isFocused.value
        }), {
          ...slots,
          default: _ref2 => {
            let {
              isDisabled,
              isDirty,
              isReadonly,
              isValid
            } = _ref2;
            return vue.createVNode(VField, vue.mergeProps({
              "ref": vFieldRef,
              "style": {
                '--v-textarea-control-height': controlHeight.value
              },
              "onClick": onControlClick,
              "onMousedown": onControlMousedown,
              "onClick:clear": onClear,
              "onClick:prependInner": props['onClick:prependInner'],
              "onClick:appendInner": props['onClick:appendInner'],
              "role": "textbox"
            }, fieldProps, {
              "active": isActive.value || isDirty.value,
              "dirty": isDirty.value || props.dirty,
              "disabled": isDisabled.value,
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
                return vue.createVNode(vue.Fragment, null, [props.prefix && vue.createVNode("span", {
                  "class": "v-text-field__prefix"
                }, [props.prefix]), vue.withDirectives(vue.createVNode("textarea", vue.mergeProps({
                  "ref": textareaRef,
                  "class": fieldClass,
                  "value": model.value,
                  "onInput": onInput,
                  "autofocus": props.autofocus,
                  "readonly": isReadonly.value,
                  "disabled": isDisabled.value,
                  "placeholder": props.placeholder,
                  "rows": props.rows,
                  "name": props.name,
                  "onFocus": onFocus,
                  "onBlur": blur
                }, slotProps, inputAttrs), null), [[vue.resolveDirective("intersect"), {
                  handler: onIntersect
                }, null, {
                  once: true
                }]]), props.autoGrow && vue.withDirectives(vue.createVNode("textarea", {
                  "class": [fieldClass, 'v-textarea__sizer'],
                  "onUpdate:modelValue": $event => model.value = $event,
                  "ref": sizerRef,
                  "readonly": true,
                  "aria-hidden": "true"
                }, null), [[vue.vModelText, model.value]]), props.suffix && vue.createVNode("span", {
                  "class": "v-text-field__suffix"
                }, [props.suffix])]);
              }
            });
          },
          details: hasDetails ? slotProps => vue.createVNode(vue.Fragment, null, [slots.details?.(slotProps), hasCounter && vue.createVNode(vue.Fragment, null, [vue.createVNode("span", null, null), vue.createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value
          }, slots.counter)])]) : undefined
        });
      });
      return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
    }
  });

  const VThemeProvider = genericComponent()({
    name: 'VThemeProvider',
    props: {
      withBackground: Boolean,
      ...makeComponentProps(),
      ...makeThemeProps(),
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = provideTheme(props);
      return () => {
        if (!props.withBackground) return slots.default?.();
        return vue.createVNode(props.tag, {
          "class": ['v-theme-provider', themeClasses.value, props.class],
          "style": props.style
        }, {
          default: () => [slots.default?.()]
        });
      };
    }
  });

  // Types

  const VTimeline = genericComponent()({
    name: 'VTimeline',
    props: {
      align: {
        type: String,
        default: 'center',
        validator: v => ['center', 'start'].includes(v)
      },
      direction: {
        type: String,
        default: 'vertical',
        validator: v => ['vertical', 'horizontal'].includes(v)
      },
      justify: {
        type: String,
        default: 'auto',
        validator: v => ['auto', 'center'].includes(v)
      },
      side: {
        type: String,
        validator: v => v == null || ['start', 'end'].includes(v)
      },
      lineInset: {
        type: [String, Number],
        default: 0
      },
      lineThickness: {
        type: [String, Number],
        default: 2
      },
      lineColor: String,
      truncateLine: {
        type: String,
        validator: v => ['start', 'end', 'both'].includes(v)
      },
      ...makeComponentProps(),
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
      provideDefaults({
        VTimelineDivider: {
          lineColor: vue.toRef(props, 'lineColor')
        },
        VTimelineItem: {
          density: vue.toRef(props, 'density'),
          lineInset: vue.toRef(props, 'lineInset')
        }
      });
      const sideClasses = vue.computed(() => {
        const side = props.side ? props.side : props.density !== 'default' ? 'end' : null;
        return side && `v-timeline--side-${side}`;
      });
      const truncateClasses = vue.computed(() => {
        const classes = ['v-timeline--truncate-line-start', 'v-timeline--truncate-line-end'];
        switch (props.truncateLine) {
          case 'both':
            return classes;
          case 'start':
            return classes[0];
          case 'end':
            return classes[1];
          default:
            return null;
        }
      });
      useRender(() => vue.createVNode(props.tag, {
        "class": ['v-timeline', `v-timeline--${props.direction}`, `v-timeline--align-${props.align}`, `v-timeline--justify-${props.justify}`, truncateClasses.value, {
          'v-timeline--inset-line': !!props.lineInset
        }, themeClasses.value, densityClasses.value, sideClasses.value, props.class],
        "style": [{
          '--v-timeline-line-thickness': convertToUnit(props.lineThickness)
        }, props.style]
      }, slots));
      return {};
    }
  });

  const VTimelineDivider = genericComponent()({
    name: 'VTimelineDivider',
    props: {
      dotColor: String,
      fillDot: Boolean,
      hideDot: Boolean,
      icon: IconValue,
      iconColor: String,
      lineColor: String,
      ...makeComponentProps(),
      ...makeRoundedProps(),
      ...makeSizeProps(),
      ...makeElevationProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props, 'v-timeline-divider__dot');
      const {
        backgroundColorStyles,
        backgroundColorClasses
      } = useBackgroundColor(vue.toRef(props, 'dotColor'));
      const {
        roundedClasses
      } = useRounded(props, 'v-timeline-divider__dot');
      const {
        elevationClasses
      } = useElevation(props);
      const {
        backgroundColorClasses: lineColorClasses,
        backgroundColorStyles: lineColorStyles
      } = useBackgroundColor(vue.toRef(props, 'lineColor'));
      useRender(() => vue.createVNode("div", {
        "class": ['v-timeline-divider', {
          'v-timeline-divider--fill-dot': props.fillDot
        }, props.class],
        "style": props.style
      }, [vue.createVNode("div", {
        "class": ['v-timeline-divider__before', lineColorClasses.value],
        "style": lineColorStyles.value
      }, null), !props.hideDot && vue.createVNode("div", {
        "key": "dot",
        "class": ['v-timeline-divider__dot', elevationClasses.value, roundedClasses.value, sizeClasses.value],
        "style": sizeStyles.value
      }, [vue.createVNode("div", {
        "class": ['v-timeline-divider__inner-dot', backgroundColorClasses.value, roundedClasses.value],
        "style": backgroundColorStyles.value
      }, [!slots.default ? vue.createVNode(VIcon, {
        "key": "icon",
        "color": props.iconColor,
        "icon": props.icon,
        "size": props.size
      }, null) : vue.createVNode(VDefaultsProvider, {
        "key": "icon-defaults",
        "disabled": !props.icon,
        "defaults": {
          VIcon: {
            color: props.iconColor,
            icon: props.icon,
            size: props.size
          }
        }
      }, slots.default)])]), vue.createVNode("div", {
        "class": ['v-timeline-divider__after', lineColorClasses.value],
        "style": lineColorStyles.value
      }, null)]));
      return {};
    }
  });

  // Types

  const VTimelineItem = genericComponent()({
    name: 'VTimelineItem',
    props: {
      density: String,
      dotColor: String,
      fillDot: Boolean,
      hideDot: Boolean,
      hideOpposite: {
        type: Boolean,
        default: undefined
      },
      icon: IconValue,
      iconColor: String,
      lineInset: [Number, String],
      ...makeComponentProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeRoundedProps(),
      ...makeSizeProps(),
      ...makeTagProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        dimensionStyles
      } = useDimension(props);
      const dotSize = vue.ref(0);
      const dotRef = vue.ref();
      vue.watch(dotRef, newValue => {
        if (!newValue) return;
        dotSize.value = newValue.$el.querySelector('.v-timeline-divider__dot')?.getBoundingClientRect().width ?? 0;
      }, {
        flush: 'post'
      });
      useRender(() => vue.createVNode("div", {
        "class": ['v-timeline-item', {
          'v-timeline-item--fill-dot': props.fillDot
        }, props.class],
        "style": [{
          '--v-timeline-dot-size': convertToUnit(dotSize.value),
          '--v-timeline-line-inset': props.lineInset ? `calc(var(--v-timeline-dot-size) / 2 + ${convertToUnit(props.lineInset)})` : convertToUnit(0)
        }, props.style]
      }, [vue.createVNode("div", {
        "class": "v-timeline-item__body",
        "style": dimensionStyles.value
      }, [slots.default?.()]), vue.createVNode(VTimelineDivider, {
        "ref": dotRef,
        "hideDot": props.hideDot,
        "icon": props.icon,
        "iconColor": props.iconColor,
        "size": props.size,
        "elevation": props.elevation,
        "dotColor": props.dotColor,
        "fillDot": props.fillDot,
        "rounded": props.rounded
      }, {
        default: slots.icon
      }), props.density !== 'compact' && vue.createVNode("div", {
        "class": "v-timeline-item__opposite"
      }, [!props.hideOpposite && slots.opposite?.()])]));
      return {};
    }
  });

  // Types

  const VTooltip = genericComponent()({
    name: 'VTooltip',
    props: {
      id: String,
      text: String,
      ...omit(makeVOverlayProps({
        closeOnBack: false,
        location: 'end',
        locationStrategy: 'connected',
        eager: true,
        minWidth: 0,
        offset: 10,
        openOnClick: false,
        openOnHover: true,
        origin: 'auto',
        scrim: false,
        scrollStrategy: 'reposition',
        transition: false
      }), ['absolute', 'persistent'])
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
      const id = vue.computed(() => props.id || `v-tooltip-${uid}`);
      const overlay = vue.ref();
      const location = vue.computed(() => {
        return props.location.split(' ').length > 1 ? props.location : props.location + ' center';
      });
      const origin = vue.computed(() => {
        return props.origin === 'auto' || props.origin === 'overlap' || props.origin.split(' ').length > 1 || props.location.split(' ').length > 1 ? props.origin : props.origin + ' center';
      });
      const transition = vue.computed(() => {
        if (props.transition) return props.transition;
        return isActive.value ? 'scale-transition' : 'fade-transition';
      });
      const activatorProps = vue.computed(() => vue.mergeProps({
        'aria-describedby': id.value
      }, props.activatorProps));
      useRender(() => {
        const [overlayProps] = VOverlay.filterProps(props);
        return vue.createVNode(VOverlay, vue.mergeProps({
          "ref": overlay,
          "class": ['v-tooltip', props.class],
          "style": props.style,
          "id": id.value
        }, overlayProps, {
          "modelValue": isActive.value,
          "onUpdate:modelValue": $event => isActive.value = $event,
          "transition": transition.value,
          "absolute": true,
          "location": location.value,
          "origin": origin.value,
          "persistent": true,
          "role": "tooltip",
          "activatorProps": activatorProps.value,
          "_disableGlobalStack": true
        }, scopeId), {
          activator: slots.activator,
          default: function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return slots.default?.(...args) ?? props.text;
          }
        });
      });
      return forwardRefs({}, overlay);
    }
  });

  // Composables
  const VValidation = genericComponent()({
    name: 'VValidation',
    props: {
      ...makeValidationProps()
    },
    emits: {
      'update:modelValue': val => true
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const validation = useValidation(props, 'validation');
      return () => slots.default?.(validation);
    }
  });

  const VVirtualScrollItem = genericComponent()({
    name: 'VVirtualScrollItem',
    props: {
      dynamicHeight: Boolean,
      ...makeComponentProps()
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
        resizeRef,
        contentRect
      } = useResizeObserver();
      useToggleScope(() => props.dynamicHeight, () => {
        vue.watch(() => contentRect.value?.height, height => {
          if (height != null) emit('update:height', height);
        });
      });
      function updateHeight() {
        if (props.dynamicHeight && contentRect.value) {
          emit('update:height', contentRect.value.height);
        }
      }
      vue.onUpdated(updateHeight);
      useRender(() => vue.createVNode("div", {
        "ref": props.dynamicHeight ? resizeRef : undefined,
        "class": ['v-virtual-scroll__item', props.class],
        "style": props.style
      }, [slots.default?.()]));
    }
  });

  // Types

  const UP$1 = -1;
  const DOWN$1 = 1;
  const VVirtualScroll = genericComponent()({
    name: 'VVirtualScroll',
    props: {
      items: {
        type: Array,
        default: () => []
      },
      itemHeight: [Number, String],
      ...makeComponentProps(),
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
      const rootEl = vue.ref();
      const {
        resizeRef,
        contentRect
      } = useResizeObserver();
      vue.watchEffect(() => {
        resizeRef.value = rootEl.value;
      });
      const display = useDisplay();
      const sizeMap = new Map();
      let sizes = createRange(props.items.length).map(() => itemHeight.value);
      const visibleItems = vue.computed(() => {
        return Math.max(12, Math.ceil((contentRect.value?.height ?? display.height.value) / itemHeight.value * 1.7 + 1));
      });
      function handleItemResize(index, height) {
        itemHeight.value = Math.max(itemHeight.value, height);
        sizes[index] = height;
        sizeMap.set(props.items[index], height);
      }
      function calculateOffset(index) {
        return sizes.slice(0, index).reduce((curr, value) => curr + (value || itemHeight.value), 0);
      }
      function calculateMidPointIndex(scrollTop) {
        const end = props.items.length;
        let middle = 0;
        let middleOffset = 0;
        while (middleOffset < scrollTop && middle < end) {
          middleOffset += sizes[middle++] || itemHeight.value;
        }
        return middle - 1;
      }
      let lastScrollTop = 0;
      function handleScroll() {
        if (!rootEl.value || !contentRect.value) return;
        const height = contentRect.value.height;
        const scrollTop = rootEl.value.scrollTop;
        const direction = scrollTop < lastScrollTop ? UP$1 : DOWN$1;
        const midPointIndex = calculateMidPointIndex(scrollTop + height / 2);
        const buffer = Math.round(visibleItems.value / 3);
        if (direction === UP$1 && midPointIndex <= first.value + buffer * 2 - 1) {
          first.value = clamp(midPointIndex - buffer, 0, props.items.length);
        } else if (direction === DOWN$1 && midPointIndex >= first.value + buffer * 2 - 1) {
          first.value = clamp(midPointIndex - buffer, 0, props.items.length - visibleItems.value);
        }
        lastScrollTop = rootEl.value.scrollTop;
      }
      function scrollToIndex(index) {
        if (!rootEl.value) return;
        const offset = calculateOffset(index);
        rootEl.value.scrollTop = offset;
      }
      const items = vue.computed(() => props.items.map((item, index) => ({
        raw: item,
        index
      })));
      const last = vue.computed(() => Math.min(props.items.length, first.value + visibleItems.value));
      const computedItems = vue.computed(() => items.value.slice(first.value, last.value));
      const paddingTop = vue.computed(() => calculateOffset(first.value));
      const paddingBottom = vue.computed(() => calculateOffset(props.items.length) - calculateOffset(last.value));
      const {
        dimensionStyles
      } = useDimension(props);
      vue.onMounted(() => {
        if (!itemHeight.value) {
          // If itemHeight prop is not set, then calculate an estimated height from the average of inital items
          itemHeight.value = sizes.slice(first.value, last.value).reduce((curr, height) => curr + height, 0) / visibleItems.value;
        }
      });
      vue.watch(() => props.items.length, () => {
        sizes = createRange(props.items.length).map(() => itemHeight.value);
        sizeMap.forEach((height, item) => {
          const index = props.items.indexOf(item);
          if (index === -1) {
            sizeMap.delete(item);
          } else {
            sizes[index] = height;
          }
        });
      });
      useRender(() => vue.createVNode("div", {
        "ref": rootEl,
        "class": ['v-virtual-scroll', props.class],
        "onScroll": handleScroll,
        "style": [dimensionStyles.value, props.style]
      }, [vue.createVNode("div", {
        "class": "v-virtual-scroll__container",
        "style": {
          paddingTop: convertToUnit(paddingTop.value),
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, [computedItems.value.map(item => vue.createVNode(VVirtualScrollItem, {
        "key": item.index,
        "dynamicHeight": !props.itemHeight,
        "onUpdate:height": height => handleItemResize(item.index, height)
      }, {
        default: () => [slots.default?.({
          item: item.raw,
          index: item.index
        })]
      }))])]));
      return {
        scrollToIndex
      };
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
      default: () => [slots.default?.()]
    });
  });

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
      if (options?.groupBy?.value.length) {
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
      if (options?.showSelect?.value) {
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
      if (options?.showExpand?.value) {
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
  function provideSelection(props, allItems) {
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
    const mustSort = vue.toRef(props, 'mustSort');
    const multiSort = vue.toRef(props, 'multiSort');
    return {
      sortBy,
      mustSort,
      multiSort
    };
  }
  function provideSort(options) {
    const {
      sortBy,
      mustSort,
      multiSort,
      page
    } = options;
    const toggleSort = key => {
      let newSortBy = sortBy.value.map(x => ({
        ...x
      })) ?? [];
      const item = newSortBy.find(x => x.key === key);
      if (!item) {
        if (multiSort.value) newSortBy = [...newSortBy, {
          key,
          order: 'asc'
        }];else newSortBy = [{
          key,
          order: 'asc'
        }];
      } else if (item.order === 'desc') {
        if (mustSort.value) {
          item.order = 'asc';
        } else {
          newSortBy = newSortBy.filter(x => x.key !== key);
        }
      } else {
        item.order = 'desc';
      }
      sortBy.value = newSortBy;
      if (page) page.value = 1;
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
      if (!sortBy.value.length) return items.value;
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
        if (customSorters?.[sortKey]) {
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

  const VDataTableHeaders = genericComponent()({
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
      const slotProps = vue.computed(() => ({
        headers: headers.value,
        columns: columns.value,
        toggleSort,
        sortBy: sortBy.value,
        someSelected: someSelected.value,
        allSelected: allSelected.value,
        selectAll,
        getSortIcon,
        getFixedStyles
      }));
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
            const columnSlotName = `column.${column.key}`;
            const columnSlotProps = {
              column,
              selectAll
            };
            if (slots[columnSlotName]) return slots[columnSlotName](columnSlotProps);
            if (column.key === 'data-table-select') {
              return slots['column.data-table-select']?.(columnSlotProps) ?? vue.createVNode(VCheckboxBtn, {
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
      useRender(() => {
        return vue.createVNode(vue.Fragment, null, [slots.headers ? slots.headers(slotProps.value) : headers.value.map((row, y) => vue.createVNode("tr", null, [row.map((column, x) => vue.createVNode(VDataTableHeaderCell, {
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
        })])])]);
      });
    }
  });

  // Utilities
  const makeDataTableGroupProps = propsFactory({
    groupBy: {
      type: Array,
      default: () => []
    }
  }, 'data-table-group');
  const VDataTableGroupSymbol = Symbol.for('vuetify:data-table-group');
  function createGroupBy(props) {
    const groupBy = useProxiedModel(props, 'groupBy');
    return {
      groupBy
    };
  }
  function provideGroupBy(options) {
    const {
      groupBy,
      sortBy
    } = options;
    const opened = vue.ref(new Set());
    const sortByWithGroups = vue.computed(() => {
      return groupBy.value.map(val => ({
        ...val,
        order: val.order ?? false
      })).concat(sortBy.value);
    });
    function isGroupOpen(group) {
      return opened.value.has(group.id);
    }
    function toggleGroup(group) {
      const newOpened = new Set(opened.value);
      if (!isGroupOpen(group)) newOpened.add(group.id);else newOpened.delete(group.id);
      opened.value = newOpened;
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
      extractRows,
      isGroupOpen
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

  const VDataTableGroupHeaderRow = genericComponent()({
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
        isGroupOpen,
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
          const icon = isGroupOpen(props.item) ? '$expand' : '$next';
          const onClick = () => toggleGroup(props.item);
          return slots['data-table-group']?.({
            item: props.item,
            count: rows.value.length,
            props: {
              icon,
              onClick
            }
          }) ?? vue.createVNode(VDataTableColumn, {
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
          const modelValue = isSelected(rows.value);
          const indeterminate = isSomeSelected(rows.value) && !modelValue;
          const selectGroup = v => select(rows.value, v);
          return slots['data-table-select']?.({
            props: {
              modelValue,
              indeterminate,
              'onUpdate:modelValue': selectGroup
            }
          }) ?? vue.createVNode("td", null, [vue.createVNode(VCheckboxBtn, {
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
  function provideExpanded(props) {
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
      index: Number,
      item: Object,
      onClick: Function
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
        "class": ['v-data-table__tr', {
          'v-data-table__tr--clickable': !!props.onClick
        }],
        "onClick": props.onClick
      }, [props.item && columns.value.map((column, i) => vue.createVNode(VDataTableColumn, {
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
            index: props.index,
            item: props.item,
            columns: columns.value,
            isSelected,
            toggleSelect,
            isExpanded,
            toggleExpand
          };
          if (slots[slotName]) return slots[slotName](slotProps);
          if (column.key === 'data-table-select') {
            return slots['item.data-table-select']?.(slotProps) ?? vue.createVNode(VCheckboxBtn, {
              "modelValue": isSelected([item]),
              "onClick": vue.withModifiers(() => toggleSelect(item), ['stop'])
            }, null);
          }
          if (column.key === 'data-table-expand') {
            return slots['item.data-table-expand']?.(slotProps) ?? vue.createVNode(VBtn, {
              "icon": isExpanded(item) ? '$collapse' : '$expand',
              "size": "small",
              "variant": "text",
              "onClick": vue.withModifiers(() => toggleExpand(item), ['stop'])
            }, null);
          }
          return getPropertyFromItem(item.columns, column.key);
        }
      }))]));
    }
  });

  // Types

  const VDataTableRows = genericComponent()({
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
      rowHeight: Number,
      'onClick:row': Function
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
        expandOnClick,
        toggleExpand,
        isExpanded
      } = useExpanded();
      const {
        isSelected,
        toggleSelect
      } = useSelection();
      const {
        toggleGroup,
        isGroupOpen
      } = useGroupBy();
      const {
        t
      } = useLocale();
      useRender(() => {
        if (props.loading && slots.loading) {
          return vue.createVNode("tr", {
            "class": "v-data-table-rows-loading",
            "key": "loading"
          }, [vue.createVNode("td", {
            "colspan": columns.value.length
          }, [slots.loading()])]);
        }
        if (!props.loading && !props.items.length && !props.hideNoData) {
          return vue.createVNode("tr", {
            "class": "v-data-table-rows-no-data",
            "key": "no-data"
          }, [vue.createVNode("td", {
            "colspan": columns.value.length
          }, [slots['no-data']?.() ?? t(props.noDataText)])]);
        }
        return vue.createVNode(vue.Fragment, null, [props.items.map((item, index) => {
          if (item.type === 'group-header') {
            return slots['group-header'] ? slots['group-header']({
              index,
              item,
              columns: columns.value,
              isExpanded,
              toggleExpand,
              isSelected,
              toggleSelect,
              toggleGroup,
              isGroupOpen
            }) : vue.createVNode(VDataTableGroupHeaderRow, {
              "key": `group-header_${item.id}`,
              "item": item
            }, slots);
          }
          const slotProps = {
            index,
            item,
            columns: columns.value,
            isExpanded,
            toggleExpand,
            isSelected,
            toggleSelect
          };
          return vue.createVNode(vue.Fragment, null, [slots.item ? slots.item(slotProps) : vue.createVNode(VDataTableRow, {
            "key": `item_${item.value}`,
            "onClick": expandOnClick.value || props['onClick:row'] ? event => {
              if (expandOnClick.value) {
                toggleExpand(item);
              }
              props['onClick:row']?.(event, {
                item
              });
            } : undefined,
            "index": index,
            "item": item
          }, slots), isExpanded(item) && slots['expanded-row']?.(slotProps)]);
        })]);
      });
      return {};
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
  function createPagination(props) {
    const page = useProxiedModel(props, 'page', undefined, value => +(value ?? 1));
    const itemsPerPage = useProxiedModel(props, 'itemsPerPage', undefined, value => +(value ?? 10));
    return {
      page,
      itemsPerPage
    };
  }
  function providePagination(options) {
    const {
      page,
      itemsPerPage,
      itemsLength
    } = options;
    const startIndex = vue.computed(() => {
      if (itemsPerPage.value === -1) return 0;
      return itemsPerPage.value * (page.value - 1);
    });
    const stopIndex = vue.computed(() => {
      if (itemsPerPage.value === -1) return itemsLength.value;
      return Math.min(itemsLength.value, startIndex.value + itemsPerPage.value);
    });
    const pageCount = vue.computed(() => {
      if (itemsPerPage.value === -1 || itemsLength.value === 0) return 1;
      return Math.ceil(itemsLength.value / itemsPerPage.value);
    });
    vue.watchEffect(() => {
      if (page.value > pageCount.value) {
        page.value = pageCount.value;
      }
    });
    function setItemsPerPage(value) {
      itemsPerPage.value = value;
      page.value = 1;
    }
    const data = {
      page,
      itemsPerPage,
      itemsLength,
      startIndex,
      stopIndex,
      pageCount,
      setItemsPerPage
    };
    vue.provide(VDataTablePaginationSymbol, data);
    return data;
  }
  function usePagination() {
    const data = vue.inject(VDataTablePaginationSymbol);
    if (!data) throw new Error('Missing pagination!');
    return data;
  }
  function usePaginatedItems(options) {
    const {
      items,
      startIndex,
      stopIndex,
      itemsPerPage
    } = options;
    const paginatedItems = vue.computed(() => {
      if (itemsPerPage.value <= 0) return items.value;
      return items.value.slice(startIndex.value, stopIndex.value);
    });
    return {
      paginatedItems
    };
  }

  // Types

  const VDataTableFooter = genericComponent()({
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
      itemsPerPageText: {
        type: String,
        default: '$vuetify.dataFooter.itemsPerPageText'
      },
      pageText: {
        type: String,
        default: '$vuetify.dataFooter.pageText'
      },
      firstPageLabel: {
        type: String,
        default: '$vuetify.dataFooter.firstPage'
      },
      prevPageLabel: {
        type: String,
        default: '$vuetify.dataFooter.prevPage'
      },
      nextPageLabel: {
        type: String,
        default: '$vuetify.dataFooter.nextPage'
      },
      lastPageLabel: {
        type: String,
        default: '$vuetify.dataFooter.lastPage'
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
          title: '$vuetify.dataFooter.itemsPerPageAll'
        }]
      },
      showCurrentPage: Boolean
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const {
        page,
        pageCount,
        startIndex,
        stopIndex,
        itemsLength,
        itemsPerPage,
        setItemsPerPage
      } = usePagination();
      const itemsPerPageOptions = vue.computed(() => props.itemsPerPageOptions.map(option => ({
        ...option,
        title: t(option.title)
      })));
      return () => vue.createVNode("div", {
        "class": "v-data-table-footer"
      }, [slots.prepend?.(), vue.createVNode("div", {
        "class": "v-data-table-footer__items-per-page"
      }, [vue.createVNode("span", null, [t(props.itemsPerPageText)]), vue.createVNode(VSelect, {
        "items": itemsPerPageOptions.value,
        "modelValue": itemsPerPage.value,
        "onUpdate:modelValue": v => setItemsPerPage(Number(v)),
        "density": "compact",
        "variant": "outlined",
        "hide-details": true
      }, null)]), vue.createVNode("div", {
        "class": "v-data-table-footer__info"
      }, [vue.createVNode("div", null, [t(props.pageText, !itemsLength.value ? 0 : startIndex.value + 1, stopIndex.value, itemsLength.value)])]), vue.createVNode("div", {
        "class": "v-data-table-footer__pagination"
      }, [vue.createVNode(VBtn, {
        "icon": props.firstIcon,
        "variant": "plain",
        "onClick": () => page.value = 1,
        "disabled": page.value === 1,
        "aria-label": t(props.firstPageLabel)
      }, null), vue.createVNode(VBtn, {
        "icon": props.prevIcon,
        "variant": "plain",
        "onClick": () => page.value = Math.max(1, page.value - 1),
        "disabled": page.value === 1,
        "aria-label": t(props.prevPageLabel)
      }, null), props.showCurrentPage && vue.createVNode("span", {
        "key": "page",
        "class": "v-data-table-footer__page"
      }, [page.value]), vue.createVNode(VBtn, {
        "icon": props.nextIcon,
        "variant": "plain",
        "onClick": () => page.value = Math.min(pageCount.value, page.value + 1),
        "disabled": page.value === pageCount.value,
        "aria-label": t(props.nextPageLabel)
      }, null), vue.createVNode(VBtn, {
        "icon": props.lastIcon,
        "variant": "plain",
        "onClick": () => page.value = pageCount.value,
        "disabled": page.value === pageCount.value,
        "aria-label": t(props.lastPageLabel)
      }, null)])]);
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
  function add(obj, key, value) {
    const path = key.split('.');
    while (path.length > 1) {
      const part = path.shift();
      if (obj[part] == null) {
        obj[part] = {};
      }
      if (typeof obj[part] === 'object') {
        obj = obj[part];
      }
    }
    obj[path[0]] = value;
  }
  function useDataTableItems(props, columns) {
    const {
      items
    } = useItems(props);
    const dataTableItems = vue.computed(() => items.value.map(item => {
      return {
        ...item,
        type: 'item',
        columns: columns.value.reduce((obj, column) => {
          add(obj, column.key, getPropertyFromItem(item.raw, column.value ?? column.key));
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
      groupBy,
      search
    } = _ref;
    const vm = getCurrentInstance('VDataTable');
    const options = vue.computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      groupBy: groupBy.value,
      search: search.value
    }));

    // Reset page when searching
    vue.watch(() => search?.value, () => {
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

  // Types

  const makeVDataTableProps = propsFactory({
    ...makeDataTableItemProps(),
    ...makeDataTableHeaderProps(),
    hideNoData: Boolean,
    hover: Boolean,
    noDataText: {
      type: String,
      default: '$vuetify.noDataText'
    },
    height: [String, Number],
    width: [String, Number],
    fixedHeader: Boolean,
    fixedFooter: Boolean,
    'onClick:row': Function,
    search: String
  }, 'v-data-table');
  const VDataTable = genericComponent()({
    name: 'VDataTable',
    props: {
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
      'update:expanded': value => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const {
        groupBy
      } = createGroupBy(props);
      const {
        sortBy,
        multiSort,
        mustSort
      } = createSort(props);
      const {
        page,
        itemsPerPage
      } = createPagination(props);
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
      const filterKeys = vue.computed(() => columns.value.map(c => 'columns.' + c.key));
      const search = vue.toRef(props, 'search');
      const {
        filteredItems
      } = useFilter(props, items, search, {
        filterKeys
      });
      provideSort({
        sortBy,
        multiSort,
        mustSort,
        page
      });
      const {
        sortByWithGroups,
        opened,
        extractRows
      } = provideGroupBy({
        groupBy,
        sortBy
      });
      const {
        sortedItems
      } = useSortedItems(filteredItems, sortByWithGroups, columns);
      const {
        flatItems
      } = useGroupedItems(sortedItems, groupBy, opened);
      const itemsLength = vue.computed(() => flatItems.value.length);
      const {
        startIndex,
        stopIndex
      } = providePagination({
        page,
        itemsPerPage,
        itemsLength
      });
      const {
        paginatedItems
      } = usePaginatedItems({
        items: flatItems,
        startIndex,
        stopIndex,
        itemsPerPage
      });
      const paginatedItemsWithoutGroups = vue.computed(() => extractRows(paginatedItems.value));
      provideSelection(props, paginatedItemsWithoutGroups);
      provideExpanded(props);
      useOptions({
        page,
        itemsPerPage,
        sortBy,
        groupBy,
        search
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
        "height": props.height,
        "hover": props.hover
      }, {
        top: slots.top,
        default: slots.default ?? (() => vue.createVNode(vue.Fragment, null, [slots.colgroup?.({
          columns
        }), vue.createVNode("thead", null, [vue.createVNode(VDataTableHeaders, {
          "sticky": props.fixedHeader,
          "multiSort": props.multiSort
        }, slots)]), slots.thead?.(), vue.createVNode("tbody", null, [slots.body ? slots.body() : vue.createVNode(VDataTableRows, {
          "items": paginatedItems.value,
          "onClick:row": props['onClick:row']
        }, slots)]), slots.tbody?.(), slots.tfoot?.()])),
        bottom: slots.bottom ?? (() => vue.createVNode(VDataTableFooter, null, {
          prepend: slots['footer.prepend']
        }))
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
  const UP = -1;
  const DOWN = 1;

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
      const direction = scrollTop < lastScrollTop ? UP : DOWN;
      const midPointIndex = calculateMidPointIndex(scrollTop);
      const buffer = Math.round(visibleItems.value / 3);
      if (direction === UP && midPointIndex <= startIndex.value) {
        startIndex.value = Math.max(midPointIndex - buffer, 0);
      } else if (direction === DOWN && midPointIndex >= startIndex.value + buffer * 2) {
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

  const VDataTableVirtual = genericComponent()({
    name: 'VDataTableVirtual',
    props: {
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
      'click:row': (e, value) => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const {
        groupBy
      } = createGroupBy(props);
      const {
        sortBy,
        multiSort,
        mustSort
      } = createSort(props);
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
      const filterKeys = vue.computed(() => columns.value.map(c => 'columns.' + c.key));
      const search = vue.toRef(props, 'search');
      const {
        filteredItems
      } = useFilter(props, items, search, {
        filterKeys
      });
      provideSort({
        sortBy,
        multiSort,
        mustSort
      });
      const {
        sortByWithGroups,
        opened,
        extractRows
      } = provideGroupBy({
        groupBy,
        sortBy
      });
      const {
        sortedItems
      } = useSortedItems(filteredItems, sortByWithGroups, columns);
      const {
        flatItems
      } = useGroupedItems(sortedItems, groupBy, opened);
      const allRows = vue.computed(() => extractRows(flatItems.value));
      provideSelection(props, allRows);
      provideExpanded(props);
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
        itemsPerPage: vue.ref(-1),
        groupBy,
        search
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
        "fixedHeader": props.fixedHeader,
        "fixedFooter": props.fixedFooter,
        "height": props.height,
        "hover": props.hover
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
          "onClick:row": props['onClick:row']
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

  const VDataTableServer = genericComponent()({
    name: 'VDataTableServer',
    props: {
      color: String,
      loading: [Boolean, String],
      loadingText: {
        type: String,
        default: '$vuetify.dataIterator.loadingText'
      },
      itemsLength: {
        type: [Number, String],
        required: true
      },
      ...makeVDataTableProps(),
      ...makeDataTableExpandProps(),
      ...makeDataTableHeaderProps(),
      ...makeDataTableItemProps(),
      ...makeDataTableSelectProps(),
      ...makeDataTableSortProps(),
      ...makeDataTablePaginateProps(),
      ...makeDataTableGroupProps()
    },
    emits: {
      'update:modelValue': value => true,
      'update:page': page => true,
      'update:itemsPerPage': page => true,
      'update:sortBy': sortBy => true,
      'update:options': options => true,
      'update:expanded': options => true,
      'update:groupBy': value => true,
      'click:row': (e, value) => true
    },
    setup(props, _ref) {
      let {
        emit,
        slots
      } = _ref;
      const {
        groupBy
      } = createGroupBy(props);
      const {
        sortBy,
        multiSort,
        mustSort
      } = createSort(props);
      const {
        page,
        itemsPerPage
      } = createPagination(props);
      const itemsLength = vue.computed(() => parseInt(props.itemsLength, 10));
      provideExpanded(props);
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
        toggleSort
      } = provideSort({
        sortBy,
        multiSort,
        mustSort,
        page
      });
      const {
        opened
      } = provideGroupBy({
        groupBy,
        sortBy
      });
      providePagination({
        page,
        itemsPerPage,
        itemsLength
      });
      const {
        flatItems
      } = useGroupedItems(items, groupBy, opened);
      provideSelection(props, items);
      useOptions({
        page,
        itemsPerPage,
        sortBy,
        groupBy,
        search: vue.toRef(props, 'search')
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
        "height": props.height,
        "hover": props.hover
      }, {
        top: slots.top,
        default: slots.default ?? (() => vue.createVNode(vue.Fragment, null, [slots.colgroup?.({
          columns
        }), vue.createVNode("thead", {
          "class": "v-data-table__thead",
          "role": "rowgroup"
        }, [vue.createVNode(VDataTableHeaders, {
          "sticky": props.fixedHeader,
          "loading": props.loading,
          "color": props.color
        }, slots)]), slots.thead?.(), vue.createVNode("tbody", {
          "class": "v-data-table__tbody",
          "role": "rowgroup"
        }, [slots.body ? slots.body() : vue.createVNode(VDataTableRows, {
          "items": flatItems.value,
          "onClick:row": props['onClick:row']
        }, slots)]), slots.tbody?.(), slots.tfoot?.()])),
        bottom: slots.bottom ?? (() => vue.createVNode(VDataTableFooter, null, {
          prepend: slots['footer.prepend']
        }))
      }));
    }
  });

  // Types

  const VInfiniteScrollIntersect = defineComponent({
    name: 'VInfiniteScrollIntersect',
    props: {
      side: {
        type: String,
        required: true
      },
      rootRef: null,
      rootMargin: String
    },
    emits: {
      intersect: side => true
    },
    setup(props, _ref) {
      let {
        emit
      } = _ref;
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver(entries => {}, props.rootMargin ? {
        root: props.rootRef,
        rootMargin: props.rootMargin
      } : undefined);
      vue.watch(isIntersecting, async val => {
        if (val) emit('intersect', props.side);
      });
      useRender(() => vue.createVNode("div", {
        "class": "v-infinite-scroll-intersect",
        "ref": intersectionRef
      }, [vue.createTextVNode("\xA0")]));
      return {};
    }
  });
  const VInfiniteScroll = genericComponent()({
    name: 'VInfiniteScroll',
    props: {
      color: String,
      direction: {
        type: String,
        default: 'vertical',
        validator: v => ['vertical', 'horizontal'].includes(v)
      },
      side: {
        type: String,
        default: 'end',
        validator: v => ['start', 'end', 'both'].includes(v)
      },
      mode: {
        type: String,
        default: 'intersect',
        validator: v => ['intersect', 'manual'].includes(v)
      },
      margin: [Number, String],
      loadMoreText: {
        type: String,
        default: '$vuetify.infiniteScroll.loadMore'
      },
      emptyText: {
        type: String,
        default: '$vuetify.infiniteScroll.empty'
      },
      ...makeDimensionProps()
    },
    emits: {
      load: options => true
    },
    setup(props, _ref2) {
      let {
        slots,
        emit
      } = _ref2;
      const rootEl = vue.ref();
      const startStatus = vue.ref('ok');
      const endStatus = vue.ref('ok');
      const margin = vue.computed(() => convertToUnit(props.margin));
      function setScrollAmount(amount) {
        if (!rootEl.value) return;
        const property = props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
        rootEl.value[property] = amount;
      }
      function getScrollAmount() {
        if (!rootEl.value) return 0;
        const property = props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
        return rootEl.value[property];
      }
      function getScrollSize() {
        if (!rootEl.value) return 0;
        const property = props.direction === 'vertical' ? 'scrollHeight' : 'scrollWidth';
        return rootEl.value[property];
      }
      function getContainerSize() {
        if (!rootEl.value) return 0;
        const property = props.direction === 'vertical' ? 'clientHeight' : 'clientWidth';
        return rootEl.value[property];
      }
      vue.onMounted(() => {
        if (!rootEl.value) return;
        if (props.side === 'start') {
          setScrollAmount(getScrollSize());
        } else if (props.side === 'both') {
          setScrollAmount(getScrollSize() / 2 - getContainerSize() / 2);
        }
      });
      function setStatus(side, status) {
        if (side === 'start') {
          startStatus.value = status;
        } else if (side === 'end') {
          endStatus.value = status;
        }
      }
      function getStatus(side) {
        return side === 'start' ? startStatus.value : endStatus.value;
      }
      let previousScrollSize = 0;
      function handleIntersect(side) {
        const status = getStatus(side);
        if (!rootEl.value || status === 'loading') return;
        previousScrollSize = getScrollSize();
        setStatus(side, 'loading');
        function done(status) {
          setStatus(side, status);
          vue.nextTick(() => {
            if (status === 'ok' && side === 'start') {
              setScrollAmount(getScrollSize() - previousScrollSize + getScrollAmount());
            }
          });
        }
        emit('load', {
          side,
          done
        });
      }
      const {
        t
      } = useLocale();
      function renderSide(side, status) {
        if (props.side !== side && props.side !== 'both') return;
        const onClick = () => handleIntersect(side);
        const slotProps = {
          side,
          props: {
            onClick,
            color: props.color
          }
        };
        if (status === 'error') return slots.error?.(slotProps);
        if (status === 'empty') return slots.empty?.(slotProps) ?? vue.createVNode("div", null, [t(props.emptyText)]);
        if (props.mode === 'manual') {
          if (status === 'loading') {
            return slots.loading?.(slotProps) ?? vue.createVNode(VProgressCircular, {
              "indeterminate": true,
              "color": props.color
            }, null);
          }
          return slots['load-more']?.(slotProps) ?? vue.createVNode(VBtn, {
            "variant": "outlined",
            "color": props.color,
            "onClick": onClick
          }, {
            default: () => [t(props.loadMoreText)]
          });
        }
        return slots.loading?.(slotProps) ?? vue.createVNode(VProgressCircular, {
          "indeterminate": true,
          "color": props.color
        }, null);
      }
      const {
        dimensionStyles
      } = useDimension(props);
      useRender(() => {
        const hasStartIntersect = props.side === 'start' || props.side === 'both';
        const hasEndIntersect = props.side === 'end' || props.side === 'both';
        const intersectMode = props.mode === 'intersect';
        return vue.createVNode("div", {
          "ref": rootEl,
          "class": ['v-infinite-scroll', `v-infinite-scroll--${props.direction}`, {
            'v-infinite-scroll--start': hasStartIntersect,
            'v-infinite-scroll--end': hasEndIntersect
          }],
          "style": dimensionStyles.value
        }, [vue.createVNode("div", {
          "class": "v-infinite-scroll__side"
        }, [renderSide('start', startStatus.value)]), rootEl.value && hasStartIntersect && intersectMode && vue.createVNode(VInfiniteScrollIntersect, {
          "key": "start",
          "side": "start",
          "onIntersect": handleIntersect,
          "rootRef": rootEl.value,
          "rootMargin": margin.value
        }, null), slots.default?.(), rootEl.value && hasEndIntersect && intersectMode && vue.createVNode(VInfiniteScrollIntersect, {
          "key": "end",
          "side": "end",
          "onIntersect": handleIntersect,
          "rootRef": rootEl.value,
          "rootMargin": margin.value
        }, null), vue.createVNode("div", {
          "class": "v-infinite-scroll__side"
        }, [renderSide('end', endStatus.value)])]);
      });
    }
  });

  // Types

  const rootTypes = {
    actions: 'button@2',
    article: 'heading, paragraph',
    avatar: 'avatar',
    button: 'button',
    card: 'image, heading',
    'card-avatar': 'image, list-item-avatar',
    chip: 'chip',
    'date-picker': 'list-item, heading, divider, date-picker-options, date-picker-days, actions',
    'date-picker-options': 'text, avatar@2',
    'date-picker-days': 'avatar@28',
    divider: 'divider',
    heading: 'heading',
    image: 'image',
    'list-item': 'text',
    'list-item-avatar': 'avatar, text',
    'list-item-two-line': 'sentences',
    'list-item-avatar-two-line': 'avatar, sentences',
    'list-item-three-line': 'paragraph',
    'list-item-avatar-three-line': 'avatar, paragraph',
    paragraph: 'text@3',
    sentences: 'text@2',
    subtitle: 'text',
    table: 'table-heading, table-thead, table-tbody, table-tfoot',
    'table-heading': 'chip, text',
    'table-thead': 'heading@6',
    'table-tbody': 'table-row-divider@6',
    'table-row-divider': 'table-row, divider',
    'table-row': 'text@6',
    'table-tfoot': 'text@2, avatar@2',
    text: 'text'
  };
  function genBone(type) {
    let children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return vue.createVNode("div", {
      "class": ['v-skeleton-loader__bone', `v-skeleton-loader__${type}`]
    }, [children]);
  }
  function genBones(bone) {
    // e.g. 'text@3'
    const [type, length] = bone.split('@');

    // Generate a length array based upon
    // value after @ in the bone string
    return Array.from({
      length
    }).map(() => genStructure(type));
  }
  function genStructure(type) {
    let children = [];
    if (!type) return children;

    // TODO: figure out a better way to type this
    const bone = rootTypes[type];

    // End of recursion, do nothing
    /* eslint-disable-next-line no-empty, brace-style */
    if (type === bone) ;
    // Array of values - e.g. 'heading, paragraph, text@2'
    else if (type.includes(',')) return mapBones(type);
    // Array of values - e.g. 'paragraph@4'
    else if (type.includes('@')) return genBones(type);
    // Array of values - e.g. 'card@2'
    else if (bone.includes(',')) children = mapBones(bone);
    // Array of values - e.g. 'list-item@2'
    else if (bone.includes('@')) children = genBones(bone);
    // Single value - e.g. 'card-heading'
    else if (bone) children.push(genStructure(bone));
    return [genBone(type, children)];
  }
  function mapBones(bones) {
    // Remove spaces and return array of structures
    return bones.replace(/\s/g, '').split(',').map(genStructure);
  }
  const VSkeletonLoader = genericComponent()({
    name: 'VSkeletonLoader',
    props: {
      boilerplate: Boolean,
      color: String,
      loading: Boolean,
      loadingText: {
        type: String,
        default: '$vuetify.loading'
      },
      type: {
        type: [String, Array],
        default: 'image'
      },
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makeThemeProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        themeClasses
      } = provideTheme(props);
      const {
        t
      } = useLocale();
      const items = vue.computed(() => genStructure(wrapInArray(props.type).join(',')));
      useRender(() => {
        const isLoading = !slots.default || props.loading;
        return vue.createVNode("div", {
          "class": ['v-skeleton-loader', {
            'v-skeleton-loader--boilerplate': props.boilerplate
          }, themeClasses.value, backgroundColorClasses.value, elevationClasses.value],
          "style": [backgroundColorStyles.value, isLoading ? dimensionStyles.value : {}],
          "aria-busy": !props.boilerplate ? isLoading : undefined,
          "aria-live": !props.boilerplate ? 'polite' : undefined,
          "aria-label": !props.boilerplate ? t(props.loadingText) : undefined,
          "role": !props.boilerplate ? 'alert' : undefined
        }, [isLoading ? items.value : slots.default?.()]);
      });
      return {};
    }
  });

  var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    VAlert: VAlert,
    VAlertTitle: VAlertTitle,
    VApp: VApp,
    VAppBar: VAppBar,
    VAppBarNavIcon: VAppBarNavIcon,
    VAppBarTitle: VAppBarTitle,
    VAutocomplete: VAutocomplete,
    VAvatar: VAvatar,
    VBadge: VBadge,
    VBanner: VBanner,
    VBannerActions: VBannerActions,
    VBannerText: VBannerText,
    VBottomNavigation: VBottomNavigation,
    VBreadcrumbs: VBreadcrumbs,
    VBreadcrumbsDivider: VBreadcrumbsDivider,
    VBreadcrumbsItem: VBreadcrumbsItem,
    VBtn: VBtn,
    VBtnGroup: VBtnGroup,
    VBtnToggle: VBtnToggle,
    VCard: VCard,
    VCardActions: VCardActions,
    VCardItem: VCardItem,
    VCardSubtitle: VCardSubtitle,
    VCardText: VCardText,
    VCardTitle: VCardTitle,
    VCarousel: VCarousel,
    VCarouselItem: VCarouselItem,
    VCheckbox: VCheckbox,
    VCheckboxBtn: VCheckboxBtn,
    VChip: VChip,
    VChipGroup: VChipGroup,
    VClassIcon: VClassIcon,
    VCode: VCode,
    VCol: VCol,
    VColorPicker: VColorPicker,
    VCombobox: VCombobox,
    VComponentIcon: VComponentIcon,
    VContainer: VContainer,
    VCounter: VCounter,
    VDataTable: VDataTable,
    VDataTableFooter: VDataTableFooter,
    VDataTableRow: VDataTableRow,
    VDataTableRows: VDataTableRows,
    VDataTableServer: VDataTableServer,
    VDataTableVirtual: VDataTableVirtual,
    VDefaultsProvider: VDefaultsProvider,
    VDialog: VDialog,
    VDialogBottomTransition: VDialogBottomTransition,
    VDialogTopTransition: VDialogTopTransition,
    VDialogTransition: VDialogTransition,
    VDivider: VDivider,
    VExpandTransition: VExpandTransition,
    VExpandXTransition: VExpandXTransition,
    VExpansionPanel: VExpansionPanel,
    VExpansionPanelText: VExpansionPanelText,
    VExpansionPanelTitle: VExpansionPanelTitle,
    VExpansionPanels: VExpansionPanels,
    VFabTransition: VFabTransition,
    VFadeTransition: VFadeTransition,
    VField: VField,
    VFieldLabel: VFieldLabel,
    VFileInput: VFileInput,
    VFooter: VFooter,
    VForm: VForm,
    VHover: VHover,
    VIcon: VIcon,
    VImg: VImg,
    VInfiniteScroll: VInfiniteScroll,
    VInput: VInput,
    VItem: VItem,
    VItemGroup: VItemGroup,
    VKbd: VKbd,
    VLabel: VLabel,
    VLayout: VLayout,
    VLayoutItem: VLayoutItem,
    VLazy: VLazy,
    VLigatureIcon: VLigatureIcon,
    VList: VList,
    VListGroup: VListGroup,
    VListImg: VListImg,
    VListItem: VListItem,
    VListItemAction: VListItemAction,
    VListItemMedia: VListItemMedia,
    VListItemSubtitle: VListItemSubtitle,
    VListItemTitle: VListItemTitle,
    VListSubheader: VListSubheader,
    VLocaleProvider: VLocaleProvider,
    VMain: VMain,
    VMenu: VMenu,
    VMessages: VMessages,
    VNavigationDrawer: VNavigationDrawer,
    VNoSsr: VNoSsr,
    VOverlay: VOverlay,
    VPagination: VPagination,
    VParallax: VParallax,
    VProgressCircular: VProgressCircular,
    VProgressLinear: VProgressLinear,
    VRadio: VRadio,
    VRadioGroup: VRadioGroup,
    VRangeSlider: VRangeSlider,
    VRating: VRating,
    VResponsive: VResponsive,
    VRow: VRow,
    VScaleTransition: VScaleTransition,
    VScrollXReverseTransition: VScrollXReverseTransition,
    VScrollXTransition: VScrollXTransition,
    VScrollYReverseTransition: VScrollYReverseTransition,
    VScrollYTransition: VScrollYTransition,
    VSelect: VSelect,
    VSelectionControl: VSelectionControl,
    VSelectionControlGroup: VSelectionControlGroup,
    VSheet: VSheet,
    VSkeletonLoader: VSkeletonLoader,
    VSlideGroup: VSlideGroup,
    VSlideGroupItem: VSlideGroupItem,
    VSlideXReverseTransition: VSlideXReverseTransition,
    VSlideXTransition: VSlideXTransition,
    VSlideYReverseTransition: VSlideYReverseTransition,
    VSlideYTransition: VSlideYTransition,
    VSlider: VSlider,
    VSnackbar: VSnackbar,
    VSpacer: VSpacer,
    VSvgIcon: VSvgIcon,
    VSwitch: VSwitch,
    VSystemBar: VSystemBar,
    VTab: VTab,
    VTable: VTable,
    VTabs: VTabs,
    VTextField: VTextField,
    VTextarea: VTextarea,
    VThemeProvider: VThemeProvider,
    VTimeline: VTimeline,
    VTimelineItem: VTimelineItem,
    VToolbar: VToolbar,
    VToolbarItems: VToolbarItems,
    VToolbarTitle: VToolbarTitle,
    VTooltip: VTooltip,
    VValidation: VValidation,
    VVirtualScroll: VVirtualScroll,
    VWindow: VWindow,
    VWindowItem: VWindowItem
  });

  // Types

  function mounted$2(el, binding) {
    const modifiers = binding.modifiers || {};
    const value = binding.value;
    const {
      once,
      immediate,
      ...modifierKeys
    } = modifiers;
    const defaultValue = !Object.keys(modifierKeys).length;
    const {
      handler,
      options
    } = typeof value === 'object' ? value : {
      handler: value,
      options: {
        attributes: modifierKeys?.attr ?? defaultValue,
        characterData: modifierKeys?.char ?? defaultValue,
        childList: modifierKeys?.child ?? defaultValue,
        subtree: modifierKeys?.sub ?? defaultValue
      }
    };
    const observer = new MutationObserver(function () {
      let mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      let observer = arguments.length > 1 ? arguments[1] : undefined;
      handler?.(mutations, observer);
      if (once) unmounted$2(el, binding);
    });
    if (immediate) handler?.([], observer);
    el._mutate = Object(el._mutate);
    el._mutate[binding.instance.$.uid] = {
      observer
    };
    observer.observe(el, options);
  }
  function unmounted$2(el, binding) {
    if (!el._mutate?.[binding.instance.$.uid]) return;
    el._mutate[binding.instance.$.uid].observer.disconnect();
    delete el._mutate[binding.instance.$.uid];
  }
  const Mutate = {
    mounted: mounted$2,
    unmounted: unmounted$2
  };

  function mounted$1(el, binding) {
    const handler = binding.value;
    const options = {
      passive: !binding.modifiers?.active
    };
    window.addEventListener('resize', handler, options);
    el._onResize = Object(el._onResize);
    el._onResize[binding.instance.$.uid] = {
      handler,
      options
    };
    if (!binding.modifiers?.quiet) {
      handler();
    }
  }
  function unmounted$1(el, binding) {
    if (!el._onResize?.[binding.instance.$.uid]) return;
    const {
      handler,
      options
    } = el._onResize[binding.instance.$.uid];
    window.removeEventListener('resize', handler, options);
    delete el._onResize[binding.instance.$.uid];
  }
  const Resize = {
    mounted: mounted$1,
    unmounted: unmounted$1
  };

  function mounted(el, binding) {
    const {
      self = false
    } = binding.modifiers ?? {};
    const value = binding.value;
    const options = typeof value === 'object' && value.options || {
      passive: true
    };
    const handler = typeof value === 'function' || 'handleEvent' in value ? value : value.handler;
    const target = self ? el : binding.arg ? document.querySelector(binding.arg) : window;
    if (!target) return;
    target.addEventListener('scroll', handler, options);
    el._onScroll = Object(el._onScroll);
    el._onScroll[binding.instance.$.uid] = {
      handler,
      options,
      // Don't reference self
      target: self ? undefined : target
    };
  }
  function unmounted(el, binding) {
    if (!el._onScroll?.[binding.instance.$.uid]) return;
    const {
      handler,
      options,
      target = el
    } = el._onScroll[binding.instance.$.uid];
    target.removeEventListener('scroll', handler, options);
    delete el._onScroll[binding.instance.$.uid];
  }
  function updated(el, binding) {
    if (binding.value === binding.oldValue) return;
    unmounted(el, binding);
    mounted(el, binding);
  }
  const Scroll = {
    mounted,
    unmounted,
    updated
  };

  var directives = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ClickOutside: ClickOutside,
    Intersect: Intersect,
    Mutate: Mutate,
    Resize: Resize,
    Ripple: Ripple,
    Scroll: Scroll,
    Touch: Touch
  });

  // Utilities

  // Types

  function getWeekArray(date) {
    let currentWeek = [];
    const weeks = [];
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      currentWeek.push(null);
    }
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);

      // Add the day to the current week
      currentWeek.push(day);

      // If the current week has 7 days, add it to the weeks array and start a new week
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    for (let i = currentWeek.length; i < 7; i++) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
    return weeks;
  }
  function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }
  function date(value) {
    if (value == null) return null;
    if (value instanceof Date) return value;
    if (typeof value === 'string') {
      const parsed = Date.parse(value);
      if (!isNaN(parsed)) return new Date(parsed);
    }
    return null;
  }
  const firstDay = {
    '001': 1,
    AD: 1,
    AE: 6,
    AF: 6,
    AG: 0,
    AI: 1,
    AL: 1,
    AM: 1,
    AN: 1,
    AR: 1,
    AS: 0,
    AT: 1,
    AU: 0,
    AX: 1,
    AZ: 1,
    BA: 1,
    BD: 0,
    BE: 1,
    BG: 1,
    BH: 6,
    BM: 1,
    BN: 1,
    BR: 0,
    BS: 0,
    BT: 0,
    BW: 0,
    BY: 1,
    BZ: 0,
    CA: 0,
    CH: 1,
    CL: 1,
    CM: 1,
    CN: 0,
    CO: 0,
    CR: 1,
    CY: 1,
    CZ: 1,
    DE: 1,
    DJ: 6,
    DK: 1,
    DM: 0,
    DO: 0,
    DZ: 6,
    EC: 1,
    EE: 1,
    EG: 6,
    ES: 1,
    ET: 0,
    FI: 1,
    FJ: 1,
    FO: 1,
    FR: 1,
    GB: 1,
    'GB-alt-variant': 0,
    GE: 1,
    GF: 1,
    GP: 1,
    GR: 1,
    GT: 0,
    GU: 0,
    HK: 0,
    HN: 0,
    HR: 1,
    HU: 1,
    ID: 0,
    IE: 1,
    IL: 0,
    IN: 0,
    IQ: 6,
    IR: 6,
    IS: 1,
    IT: 1,
    JM: 0,
    JO: 6,
    JP: 0,
    KE: 0,
    KG: 1,
    KH: 0,
    KR: 0,
    KW: 6,
    KZ: 1,
    LA: 0,
    LB: 1,
    LI: 1,
    LK: 1,
    LT: 1,
    LU: 1,
    LV: 1,
    LY: 6,
    MC: 1,
    MD: 1,
    ME: 1,
    MH: 0,
    MK: 1,
    MM: 0,
    MN: 1,
    MO: 0,
    MQ: 1,
    MT: 0,
    MV: 5,
    MX: 0,
    MY: 1,
    MZ: 0,
    NI: 0,
    NL: 1,
    NO: 1,
    NP: 0,
    NZ: 1,
    OM: 6,
    PA: 0,
    PE: 0,
    PH: 0,
    PK: 0,
    PL: 1,
    PR: 0,
    PT: 0,
    PY: 0,
    QA: 6,
    RE: 1,
    RO: 1,
    RS: 1,
    RU: 1,
    SA: 0,
    SD: 6,
    SE: 1,
    SG: 0,
    SI: 1,
    SK: 1,
    SM: 1,
    SV: 0,
    SY: 6,
    TH: 0,
    TJ: 1,
    TM: 1,
    TR: 1,
    TT: 0,
    TW: 0,
    UA: 1,
    UM: 0,
    US: 0,
    UY: 1,
    UZ: 1,
    VA: 1,
    VE: 0,
    VI: 0,
    VN: 1,
    WS: 0,
    XK: 1,
    YE: 0,
    ZA: 0,
    ZW: 0
  };
  const sundayJanuarySecond2000 = new Date(2000, 0, 2);
  function getWeekdays(locale) {
    const daysFromSunday = firstDay[locale.slice(-2).toUpperCase()];
    return createRange(7).map(i => {
      const weekday = new Date(sundayJanuarySecond2000);
      weekday.setDate(sundayJanuarySecond2000.getDate() + daysFromSunday + i);
      return new Intl.DateTimeFormat(locale, {
        weekday: 'long'
      }).format(weekday);
    });
  }
  function format(value, formatString, locale) {
    const date = new Date(value);
    let options = {};
    switch (formatString) {
      case 'fullDateWithWeekday':
        options = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        };
        break;
      case 'normalDateWithWeekday':
        options = {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        };
        break;
      case 'keyboardDate':
        options = {};
        break;
      case 'monthAndDate':
        options = {
          month: 'long',
          day: 'numeric'
        };
        break;
      case 'monthAndYear':
        options = {
          month: 'long',
          year: 'numeric'
        };
        break;
      default:
        options = {
          timeZone: 'UTC',
          timeZoneName: 'short'
        };
    }
    return new Intl.DateTimeFormat(locale, options).format(date);
  }
  function addDays(date, amount) {
    const d = new Date(date);
    d.setDate(d.getDate() + amount);
    return d;
  }
  function addMonths(date, amount) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + amount);
    return d;
  }
  function getYear(date) {
    return date.getFullYear();
  }
  function getMonth(date) {
    return date.getMonth();
  }
  function startOfYear(date) {
    return new Date(date.getFullYear(), 0, 1);
  }
  function endOfYear(date) {
    return new Date(date.getFullYear(), 11, 31);
  }
  function getMondayOfFirstWeekOfYear(year) {
    return new Date(year, 0, 1);
  }

  // https://stackoverflow.com/questions/274861/how-do-i-calculate-the-week-number-given-a-date/275024#275024
  function getWeek(date) {
    let year = date.getFullYear();
    let d1w1 = getMondayOfFirstWeekOfYear(year);
    if (date < d1w1) {
      year = year - 1;
      d1w1 = getMondayOfFirstWeekOfYear(year);
    } else {
      const tv = getMondayOfFirstWeekOfYear(year + 1);
      if (date >= tv) {
        year = year + 1;
        d1w1 = tv;
      }
    }
    const diffTime = Math.abs(date.getTime() - d1w1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7) + 1;
  }
  function isWithinRange(date, range) {
    return isAfter(date, range[0]) && isBefore(date, range[1]);
  }
  function isValid(date) {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
  }
  function isAfter(date, comparing) {
    return date.getTime() > comparing.getTime();
  }
  function isBefore(date, comparing) {
    return date.getTime() < comparing.getTime();
  }
  function isEqual(date, comparing) {
    return date.getTime() === comparing.getTime();
  }
  function isSameDay(date, comparing) {
    return date.getDate() === comparing.getDate() && date.getMonth() === comparing.getMonth() && date.getFullYear() === comparing.getFullYear();
  }
  function isSameMonth(date, comparing) {
    return date.getMonth() === comparing.getMonth() && date.getFullYear() === comparing.getFullYear();
  }
  function getDiff(date, comparing, unit) {
    const d = new Date(date);
    const c = new Date(comparing);
    if (unit === 'month') {
      return d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12;
    }
    return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24));
  }
  function setYear(date, year) {
    const d = new Date(date);
    d.setFullYear(year);
    return d;
  }
  class VuetifyDateAdapter {
    constructor() {
      let locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
      this.locale = locale;
    }
    date(value) {
      return date(value);
    }
    addDays(date, amount) {
      return addDays(date, amount);
    }
    addMonths(date, amount) {
      return addMonths(date, amount);
    }
    getWeekArray(date) {
      return getWeekArray(date);
    }
    startOfMonth(date) {
      return startOfMonth(date);
    }
    endOfMonth(date) {
      return endOfMonth(date);
    }
    format(date, formatString) {
      return format(date, formatString, this.locale);
    }
    isEqual(date, comparing) {
      return isEqual(date, comparing);
    }
    isValid(date) {
      return isValid(date);
    }
    isWithinRange(date, range) {
      return isWithinRange(date, range);
    }
    isAfter(date, comparing) {
      return isAfter(date, comparing);
    }
    isSameDay(date, comparing) {
      return isSameDay(date, comparing);
    }
    isSameMonth(date, comparing) {
      return isSameMonth(date, comparing);
    }
    setYear(date, year) {
      return setYear(date, year);
    }
    getDiff(date, comparing, unit) {
      return getDiff(date, comparing, unit);
    }
    getWeek(date) {
      return getWeek(date);
    }
    getWeekdays() {
      return getWeekdays(this.locale);
    }
    getYear(date) {
      return getYear(date);
    }
    getMonth(date) {
      return getMonth(date);
    }
    startOfYear(date) {
      return startOfYear(date);
    }
    endOfYear(date) {
      return endOfYear(date);
    }
  }

  // Composables

  // Types

  const DateAdapterSymbol = Symbol.for('vuetify:date-adapter');
  function createDate(options) {
    return options ?? {
      adapter: VuetifyDateAdapter
    };
  }

  // Composables
  function createVuetify$1() {
    let vuetify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      blueprint,
      ...rest
    } = vuetify;
    const options = mergeDeep(blueprint, rest);
    const {
      aliases = {},
      components = {},
      directives = {}
    } = options;
    const defaults = createDefaults(options.defaults);
    const display = createDisplay(options.display, options.ssr);
    const theme = createTheme(options.theme);
    const icons = createIcons(options.icons);
    const locale = createLocale(options.locale);
    const date = createDate(options.date);
    const install = app => {
      for (const key in directives) {
        app.directive(key, directives[key]);
      }
      for (const key in components) {
        app.component(key, components[key]);
      }
      for (const key in aliases) {
        app.component(key, defineComponent({
          ...aliases[key],
          name: key,
          aliasName: aliases[key].name
        }));
      }
      theme.install(app);
      app.provide(DefaultsSymbol, defaults);
      app.provide(DisplaySymbol, display);
      app.provide(ThemeSymbol, theme);
      app.provide(IconSymbol, icons);
      app.provide(LocaleSymbol, locale);
      app.provide(DateAdapterSymbol, date);
      if (IN_BROWSER && options.ssr) {
        if (app.$nuxt) {
          app.$nuxt.hook('app:suspense:resolve', () => {
            display.update();
          });
        } else {
          const {
            mount
          } = app;
          app.mount = function () {
            const vm = mount(...arguments);
            vue.nextTick(() => display.update());
            app.mount = mount;
            return vm;
          };
        }
      }
      getUid.reset();
      if (typeof __VUE_OPTIONS_API__ !== 'boolean' || __VUE_OPTIONS_API__) {
        app.mixin({
          computed: {
            $vuetify() {
              return vue.reactive({
                defaults: inject.call(this, DefaultsSymbol),
                display: inject.call(this, DisplaySymbol),
                theme: inject.call(this, ThemeSymbol),
                icons: inject.call(this, IconSymbol),
                locale: inject.call(this, LocaleSymbol),
                date: inject.call(this, DateAdapterSymbol)
              });
            }
          }
        });
      }
    };
    return {
      install,
      defaults,
      display,
      theme,
      icons,
      locale,
      date
    };
  }
  const version$1 = "3.2.2";
  createVuetify$1.version = version$1;

  // Vue's inject() can only be used in setup
  function inject(key) {
    const vm = this.$;
    const provides = vm.parent?.provides ?? vm.vnode.appContext?.provides;
    if (provides && key in provides) {
      return provides[key];
    }
  }

  const version = "3.2.2";

  const createVuetify = function () {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return createVuetify$1({
      components,
      directives,
      ...options
    });
  };

  exports.components = components;
  exports.createVuetify = createVuetify;
  exports.directives = directives;
  exports.useDefaults = useDefaults;
  exports.useDisplay = useDisplay;
  exports.useLayout = useLayout;
  exports.useLocale = useLocale;
  exports.useRtl = useRtl;
  exports.useTheme = useTheme;
  exports.version = version;

}));
