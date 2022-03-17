/*!
* Vuetify v3.0.0-beta.0
* Forged by John Leider
* Released under the MIT License.
*/

import { Fragment, ref, computed, unref, provide, inject, defineComponent as defineComponent$1, getCurrentInstance as getCurrentInstance$1, shallowReactive, toRaw, watchEffect, capitalize, camelize, h, watch, readonly, onBeforeUnmount, onDeactivated, onActivated, reactive, onMounted, createVNode, toRefs, mergeProps, Transition, onBeforeMount, nextTick, withDirectives, vShow, resolveDirective, isRef, toRef, resolveDynamicComponent, TransitionGroup, effectScope, onScopeDispose, warn, toHandlers, Teleport, vModelDynamic, createTextVNode, onBeforeUpdate, vModelText } from 'vue';

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
    const w = sx ? rect.width / sx : el.offsetWidth;
    const h = sy ? rect.height / sy : el.offsetHeight;
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

/* eslint-disable no-console */
// import Vuetify from '../framework'
function createMessage(message, vm, parent) {
  // if (Vuetify.config.silent) return
  if (parent) {
    vm = {
      _isVue: true,
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

  const options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
  let name = options.name || options._componentTag;
  const file = options.__file;

  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/);
    name = match == null ? void 0 : match[1];
  }

  return (name ? `<${classify(name)}>` : `<Anonymous>`) + (file && includeFile !== false ? ` at ${file}` : '');
}

function generateComponentTrace(vm) {
  if (vm._isVue && vm.$parent) {
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

    return '\n\nfound in\n\n' + tree.map((vm, i) => `${i === 0 ? '---> ' : ' '.repeat(5 + i * 2)}${Array.isArray(vm) // eslint-disable-next-line sonarjs/no-nested-template-literals
    ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)` : formatComponentName(vm)}`).join('\n');
  } else {
    return `\n\n(found in ${formatComponentName(vm)})`;
  }
}

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

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
  if (item !== Object(item)) return fallback === undefined ? item : fallback;
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
} // KeyboardEvent.keyCode aliases

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
    const targetProperty = target[key]; // Only continue deep merging if
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
function getUid() {
  return getUid._uid++;
}
getUid._uid = 0;
function flattenFragments(nodes) {
  return nodes.map(node => {
    if (node.type === Fragment) {
      return flattenFragments(node.children);
    } else {
      return node;
    }
  }).flat();
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

const srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]]; // Forward gamma adjust

const srgbForwardTransform = C => C <= 0.0031308 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055; // For converting sRGB to XYZ


const srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]]; // Reverse gamma adjust

const srgbReverseTransform = C => C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;

function fromXYZ$1(xyz) {
  const rgb = Array(3);
  const transform = srgbForwardTransform;
  const matrix = srgbForwardMatrix; // Matrix transform, then gamma adjustment

  for (let i = 0; i < 3; ++i) {
    rgb[i] = Math.round(clamp(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
  } // Rescale back to [0, 255]


  return (rgb[0] << 16) + (rgb[1] << 8) + (rgb[2] << 0);
}
function toXYZ$1(rgb) {
  const xyz = [0, 0, 0];
  const transform = srgbReverseTransform;
  const matrix = srgbReverseMatrix; // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB

  const r = transform((rgb >> 16 & 0xff) / 255);
  const g = transform((rgb >> 8 & 0xff) / 255);
  const b = transform((rgb >> 0 & 0xff) / 255); // Matrix color space transform

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

function isCssColor(color) {
  return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
}
function colorToInt(color) {
  let rgb;

  if (typeof color === 'number') {
    rgb = color;
  } else if (typeof color === 'string') {
    let c = color.startsWith('#') ? color.substring(1) : color;

    if (c.length === 3) {
      c = c.split('').map(char => char + char).join('');
    }

    if (c.length !== 6) {
      consoleWarn(`'${color}' is not a valid rgb color`);
    }

    rgb = parseInt(c, 16);
  } else {
    throw new TypeError(`Colors can only be numbers or strings, recieved ${color == null ? color : color.constructor.name} instead`);
  }

  if (rgb < 0) {
    consoleWarn(`Colors cannot be negative: '${color}'`);
    rgb = 0;
  } else if (rgb > 0xffffff || isNaN(rgb)) {
    consoleWarn(`'${color}' is not a valid rgb color`);
    rgb = 0xffffff;
  }

  return rgb;
}
function intToHex(color) {
  let hexColor = color.toString(16);
  if (hexColor.length < 6) hexColor = '0'.repeat(6 - hexColor.length) + hexColor;
  return '#' + hexColor;
}
/**
 * Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param color HSVA color as an array [0-360, 0-1, 0-1, 0-1]
 */

function HSVAtoRGBA(hsva) {
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
/**
 * Converts RGBA to HSVA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param color RGBA color as an array [0-255, 0-255, 0-255, 0-1]
 */

function RGBAtoHSVA(rgba) {
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
function HSVAtoHSLA(hsva) {
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
function HSLAtoHSVA(hsl) {
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
function RGBAtoCSS(rgba) {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}
function HSVAtoCSS(hsva) {
  return RGBAtoCSS(HSVAtoRGBA(hsva));
}
function RGBAtoHex(rgba) {
  const toHex = v => {
    const h = Math.round(v).toString(16);
    return ('00'.substr(0, 2 - h.length) + h).toUpperCase();
  };

  return `#${[toHex(rgba.r), toHex(rgba.g), toHex(rgba.b), toHex(Math.round(rgba.a * 255))].join('')}`;
}
function HexToRGBA(hex) {
  const rgba = chunk(hex.slice(1), 2).map(c => parseInt(c, 16));
  return {
    r: rgba[0],
    g: rgba[1],
    b: rgba[2],
    a: Math.round(rgba[3] / 255 * 100) / 100
  };
}
function HexToHSVA(hex) {
  const rgb = HexToRGBA(hex);
  return RGBAtoHSVA(rgb);
}
function HSVAtoHex(hsva) {
  return RGBAtoHex(HSVAtoRGBA(hsva));
}
function parseHex(hex) {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }

  hex = hex.replace(/([^0-9a-f])/gi, 'F');

  if (hex.length === 3 || hex.length === 4) {
    hex = hex.split('').map(x => x + x).join('');
  }

  if (hex.length === 6) {
    hex = padEnd(hex, 8, 'F');
  } else {
    hex = padEnd(padEnd(hex, 6), 8, 'F');
  }

  return `#${hex}`.toUpperCase().substr(0, 9);
}
function colorToRGB(color) {
  const int = colorToInt(color);
  return {
    r: (int & 0xFF0000) >> 16,
    g: (int & 0xFF00) >> 8,
    b: int & 0xFF
  };
}
function lighten(value, amount) {
  const lab = fromXYZ(toXYZ$1(value)); // TODO: why this false positive?
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands

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
  const rgb = colorToInt(color);
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

// Utilities

const DefaultsSymbol = Symbol.for('vuetify:defaults');
function createDefaults(options) {
  return ref(options != null ? options : {});
}
function useDefaults() {
  const defaults = inject(DefaultsSymbol);
  if (!defaults) throw new Error('[Vuetify] Could not find defaults instance');
  return defaults;
}
function provideDefaults(defaults, options) {
  const injectedDefaults = useDefaults();
  const providedDefaults = ref(defaults);
  const newDefaults = computed(() => {
    const scoped = unref(options == null ? void 0 : options.scoped);
    const reset = unref(options == null ? void 0 : options.reset);
    const root = unref(options == null ? void 0 : options.root);
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

    return mergeDeep(properties, properties.prev);
  });
  provide(DefaultsSymbol, newDefaults);
  return newDefaults;
}

// Utils

function propIsDefined(vnode, prop) {
  var _vnode$props, _vnode$props2;

  return ((_vnode$props = vnode.props) == null ? void 0 : _vnode$props.hasOwnProperty(prop)) || ((_vnode$props2 = vnode.props) == null ? void 0 : _vnode$props2.hasOwnProperty(toKebabCase(prop)));
}

const defineComponent = function defineComponent(options) {
  var _options$_setup;

  options._setup = (_options$_setup = options._setup) != null ? _options$_setup : options.setup;

  if (!options.name) {
    consoleWarn('The component is missing an explicit name, unable to generate default prop value');
    return options;
  }

  if (options._setup) {
    options.setup = function setup(props, ctx) {
      const vm = getCurrentInstance$1();
      const defaults = useDefaults();

      const _props = shallowReactive({ ...toRaw(props)
      });

      watchEffect(() => {
        const globalDefaults = defaults.value.global;
        const componentDefaults = defaults.value[options.name];

        for (const prop of Object.keys(props)) {
          let newVal;

          if (propIsDefined(vm.vnode, prop)) {
            newVal = props[prop];
          } else {
            var _ref, _componentDefaults$pr;

            newVal = (_ref = (_componentDefaults$pr = componentDefaults == null ? void 0 : componentDefaults[prop]) != null ? _componentDefaults$pr : globalDefaults == null ? void 0 : globalDefaults[prop]) != null ? _ref : props[prop];
          }

          if (_props[prop] !== newVal) {
            _props[prop] = newVal;
          }
        }
      });
      return options._setup(_props, ctx);
    };
  }

  return options;
};
function genericComponent() {
  let exposeDefaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return options => (exposeDefaults ? defineComponent : defineComponent$1)(options);
}

function createSimpleFunctional(klass) {
  let tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  let name = arguments.length > 2 ? arguments[2] : undefined;
  return defineComponent({
    name: name != null ? name : capitalize(camelize(klass.replace(/__/g, '-'))),
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

        return h(props.tag, {
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
    while (node.parentNode) node = node.parentNode; // The root parent is the document if the node is attached to the DOM


    if (node !== document) return null;
    return document;
  }

  const root = node.getRootNode(); // The composed root node is the document if the node is attached to the DOM

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
  const vm = getCurrentInstance$1();

  if (!vm) {
    throw new Error(`[Vuetify] ${name} ${message || 'must be called from inside a setup function'}`);
  }

  return vm;
}
function getCurrentInstanceName() {
  var _getCurrentInstance$t;

  let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'composables';
  return toKebabCase((_getCurrentInstance$t = getCurrentInstance(name).type) == null ? void 0 : _getCurrentInstance$t.name);
}

function getScrollParent(el) {
  while (el) {
    if (hasScrollbar(el)) return el;
    el = el.parentElement;
  }

  return document.scrollingElement;
}
function getScrollParents(el) {
  const elements = [];

  while (el) {
    if (hasScrollbar(el)) elements.push(el);
    el = el.parentElement;
  }

  return elements;
}
function hasScrollbar(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  const style = window.getComputedStyle(el);
  return style.overflowY === 'scroll' || style.overflowY === 'auto' && el.scrollHeight > el.clientHeight;
}

const IS_NODE = typeof process !== 'undefined';
const IN_BROWSER = typeof window !== 'undefined';
IS_NODE && process.env.DEBUG === 'true';
IS_NODE && process.env.NODE_ENV === 'production';
const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window;
const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0);
const SUPPORTS_FOCUS_VISIBLE = IN_BROWSER && CSS.supports('selector(:focus-visible)');

function isFixedPosition(el) {
  while (el) {
    if (window.getComputedStyle(el).position === 'fixed') {
      return true;
    }

    el = el.offsetParent;
  }

  return false;
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
        obj[prop] = { ...definition,
          default: defaults[prop]
        };
      } else {
        obj[prop] = definition;
      }

      if (source) {
        obj[prop].source = source;
      }

      return obj;
    }, {});
  };
}

// Utilities

function useRender(render) {
  const vm = getCurrentInstance('useRender');
  vm.render = render;
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
const revBG = 0.62; // For Clamping and Scaling Values

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
  const Rtxt = ((text >> 16 & 0xff) / 255) ** mainTRC;
  const Gtxt = ((text >> 8 & 0xff) / 255) ** mainTRC;
  const Btxt = ((text >> 0 & 0xff) / 255) ** mainTRC;
  const Rbg = ((background >> 16 & 0xff) / 255) ** mainTRC;
  const Gbg = ((background >> 8 & 0xff) / 255) ** mainTRC;
  const Bbg = ((background >> 0 & 0xff) / 255) ** mainTRC; // Apply the standard coefficients and sum to Y

  let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
  let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco; // Soft clamp Y when near black.
  // Now clamping all colors to prevent crossover errors

  if (Ytxt <= blkThrs) Ytxt += (blkThrs - Ytxt) ** blkClmp;
  if (Ybg <= blkThrs) Ybg += (blkThrs - Ybg) ** blkClmp; // Return 0 Early for extremely low ∆Y (lint trap #1)

  if (Math.abs(Ybg - Ytxt) < deltaYmin) return 0.0; // SAPC CONTRAST

  let outputContrast; // For weighted final values

  if (Ybg > Ytxt) {
    // For normal polarity, black text on white
    // Calculate the SAPC contrast value and scale
    const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW; // NEW! SAPC SmoothScale™
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
        'kbd-background-color': '#212529',
        'kbd-color': '#FFFFFF',
        'code-background-color': '#C2C2C2'
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
        'kbd-background-color': '#212529',
        'kbd-color': '#FFFFFF',
        'code-background-color': '#B7B7B7'
      }
    }
  }
};

const parseThemeOptions = function () {
  var _options$themes;

  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultThemeOptions;
  if (!options) return { ...defaultThemeOptions,
    isDisabled: true
  };
  const themes = Object.entries((_options$themes = options.themes) != null ? _options$themes : {}).reduce((obj, _ref) => {
    var _defaultThemeOptions$, _defaultThemeOptions$2;

    let [key, theme] = _ref;
    const defaultTheme = theme.dark ? (_defaultThemeOptions$ = defaultThemeOptions.themes) == null ? void 0 : _defaultThemeOptions$.dark : (_defaultThemeOptions$2 = defaultThemeOptions.themes) == null ? void 0 : _defaultThemeOptions$2.light;
    obj[key] = mergeDeep(defaultTheme, theme);
    return obj;
  }, {});
  return mergeDeep(defaultThemeOptions, { ...options,
    themes
  });
}; // Composables


function createTheme(app, options) {
  const head = app._context.provides.usehead;
  const parsedOptions = parseThemeOptions(options);
  const styleEl = ref();
  const current = ref(parsedOptions.defaultTheme);
  const themes = ref(parsedOptions.themes);
  const variations = ref(parsedOptions.variations);
  const computedThemes = computed(() => {
    return Object.entries(themes.value).reduce((obj, _ref2) => {
      var _parsedOptions$variat;

      let [name, original] = _ref2;
      const theme = { ...original,
        colors: { ...original.colors,
          ...((_parsedOptions$variat = parsedOptions.variations.colors) != null ? _parsedOptions$variat : []).reduce((obj, color) => {
            return { ...obj,
              ...genColorVariations(color, original.colors[color])
            };
          }, {})
        }
      };

      for (const color of Object.keys(theme.colors)) {
        if (/on-[a-z]/.test(color) || theme.colors[`on-${color}`]) continue;
        const onColor = `on-${color}`;
        const colorVal = colorToInt(theme.colors[color]);
        const blackContrast = Math.abs(APCAcontrast(0, colorVal));
        const whiteContrast = Math.abs(APCAcontrast(0xffffff, colorVal)); // TODO: warn about poor color selections
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

      obj[name] = theme;
      return obj;
    }, {});
  });

  function genColorVariations(name, color) {
    const obj = {};

    for (const variation of ['lighten', 'darken']) {
      const fn = variation === 'lighten' ? lighten : darken;

      for (const amount of createRange(variations.value[variation], 1)) {
        obj[`${name}-${variation}-${amount}`] = intToHex(fn(colorToInt(color), amount));
      }
    }

    return obj;
  }

  const styles = computed(() => {
    const lines = [];

    for (const themeName of Object.keys(computedThemes.value)) {
      const variables = computedThemes.value[themeName].variables;
      lines.push(...createCssClass(`.v-theme--${themeName}`, [...genCssVariables(themeName), ...Object.keys(variables).map(key => {
        const value = variables[key];
        const color = typeof value === 'string' && value.startsWith('#') ? colorToRGB(value) : undefined;
        const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined;
        return `--v-${key}: ${rgb != null ? rgb : value}`;
      })]));
    }

    const colors = new Set(Object.values(computedThemes.value).flatMap(theme => Object.keys(theme.colors)));

    for (const key of colors) {
      if (/on-[a-z]/.test(key)) {
        lines.push(...createCssClass(`.${key}`, [`color: rgb(var(--v-theme-${key})) !important`]));
      } else {
        lines.push(...createCssClass(`.bg-${key}`, [`--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`, `background: rgb(var(--v-theme-${key})) !important`, `color: rgb(var(--v-theme-on-${key})) !important`]), ...createCssClass(`.text-${key}`, [`color: rgb(var(--v-theme-${key})) !important`]), ...createCssClass(`.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]));
      }
    }

    return lines.map((str, i) => i === 0 ? str : `    ${str}`).join('');
  });

  function genCssVariables(name) {
    const theme = computedThemes.value[name];
    if (!theme) throw new Error(`Could not find theme ${name}`);
    const lightOverlay = theme.dark ? 2 : 1;
    const darkOverlay = theme.dark ? 1 : 2;
    const variables = [];

    for (const [key, value] of Object.entries(theme.colors)) {
      const rgb = colorToRGB(value);
      variables.push(`--v-theme-${key}: ${rgb.r},${rgb.g},${rgb.b}`);

      if (!key.startsWith('on-')) {
        variables.push(`--v-theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`);
      }
    }

    return variables;
  }

  function createCssClass(selector, content) {
    return [`${selector} {\n`, ...content.map(line => `  ${line};\n`), '}\n'];
  }

  if (head) {
    head.addHeadObjs(computed(() => ({
      style: [{
        children: styles.value,
        type: 'text/css',
        id: 'vuetify-theme-stylesheet'
      }]
    })));

    if (IN_BROWSER) {
      watchEffect(() => head.updateDOM());
    }
  } else {
    watch(themes, updateStyles, {
      deep: true,
      immediate: true
    });

    function updateStyles() {
      if (parsedOptions.isDisabled) return;
      genStyleElement();
      if (styleEl.value) styleEl.value.innerHTML = styles.value;
    }

    function genStyleElement() {
      if (typeof document === 'undefined' || styleEl.value) return;
      const el = document.createElement('style');
      el.type = 'text/css';
      el.id = 'vuetify-theme-stylesheet';
      styleEl.value = el;
      document.head.appendChild(styleEl.value);
    }
  }

  return {
    isDisabled: parsedOptions.isDisabled,
    themes: computedThemes,
    setTheme: (key, theme) => themes.value[key] = theme,
    getTheme: key => computedThemes.value[key],
    current,
    themeClasses: computed(() => parsedOptions.isDisabled ? undefined : `v-theme--${current.value}`),
    styles
  };
}
function provideTheme(props) {
  getCurrentInstance('provideTheme');
  const theme = inject(ThemeSymbol, null);
  if (!theme) throw new Error('Could not find Vuetify theme injection');
  const current = computed(() => {
    var _props$theme;

    return (_props$theme = props.theme) != null ? _props$theme : theme == null ? void 0 : theme.current.value;
  });
  const themeClasses = computed(() => theme.isDisabled ? undefined : `v-theme--${current.value}`);
  const newTheme = { ...theme,
    current,
    themeClasses
  };
  provide(ThemeSymbol, newTheme);
  return newTheme;
}
function useTheme() {
  getCurrentInstance('useTheme');
  const theme = inject(ThemeSymbol, null);
  if (!theme) throw new Error('Could not find Vuetify theme injection');
  return theme;
}

// Utilities
function useResizeObserver(callback) {
  const resizeRef = ref();
  const contentRect = ref();
  const contentBoxSize = ref();
  const borderBoxSize = ref();

  if (IN_BROWSER) {
    const observer = new ResizeObserver(entries => {
      callback == null ? void 0 : callback(entries, observer);
      if (!entries.length) return;
      contentRect.value = entries[0].contentRect;
      contentBoxSize.value = entries[0].contentBoxSize[0];
      borderBoxSize.value = entries[0].borderBoxSize[0];
    });
    onBeforeUnmount(() => {
      observer.disconnect();
    });
    watch(resizeRef, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(oldValue);
        contentRect.value = undefined;
        contentBoxSize.value = undefined;
        borderBoxSize.value = undefined;
      }

      if (newValue) observer.observe(newValue);
    }, {
      flush: 'post'
    });
  }

  return {
    resizeRef,
    contentRect: readonly(contentRect),
    contentBoxSize: readonly(contentBoxSize),
    borderBoxSize: readonly(borderBoxSize)
  };
}

// Composables

const VuetifyLayoutKey = Symbol.for('vuetify:layout');
const ROOT_ZINDEX$1 = 1000;
const makeLayoutProps = propsFactory({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, 'layout'); // Composables

const makeLayoutItemProps = propsFactory({
  name: {
    type: String
  },
  priority: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, 'layout-item');
function useLayout() {
  const layout = inject(VuetifyLayoutKey);
  if (!layout) throw new Error('Could not find injected Vuetify layout');
  return layout;
}
function useLayoutItem(options) {
  var _options$id;

  const layout = inject(VuetifyLayoutKey);
  if (!layout) throw new Error('Could not find injected Vuetify layout');
  const id = (_options$id = options.id) != null ? _options$id : `layout-item-${getUid()}`;
  const vm = getCurrentInstance('useLayoutItem');
  const isKeptAlive = ref(false);
  onDeactivated(() => isKeptAlive.value = true);
  onActivated(() => isKeptAlive.value = false);
  const {
    layoutItemStyles,
    layoutItemScrimStyles
  } = layout.register(vm, { ...options,
    active: computed(() => isKeptAlive.value ? false : options.active.value),
    id
  });
  onBeforeUnmount(() => layout.unregister(id));
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
    layer: { ...previousLayer
    }
  }];

  for (const id of layout) {
    const position = positions.get(id);
    const amount = layoutSizes.get(id);
    const active = activeItems.get(id);
    if (!position || !amount || !active) continue;
    const layer = { ...previousLayer,
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
  const parentLayout = inject(VuetifyLayoutKey, null);
  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX$1);
  const registered = ref([]);
  const positions = reactive(new Map());
  const layoutSizes = reactive(new Map());
  const priorities = reactive(new Map());
  const activeItems = reactive(new Map());
  const disabledTransitions = reactive(new Map());
  const {
    resizeRef,
    contentRect: layoutRect
  } = useResizeObserver();
  const computedOverlaps = computed(() => {
    var _props$overlaps;

    const map = new Map();
    const overlaps = (_props$overlaps = props.overlaps) != null ? _props$overlaps : [];

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
  const layers = computed(() => {
    const uniquePriorities = [...new Set([...priorities.values()].map(p => p.value))].sort((a, b) => a - b);
    const layout = [];

    for (const p of uniquePriorities) {
      const items = registered.value.filter(id => {
        var _priorities$get;

        return ((_priorities$get = priorities.get(id)) == null ? void 0 : _priorities$get.value) === p;
      });
      layout.push(...items);
    }

    return generateLayers(layout, positions, layoutSizes, activeItems);
  });
  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some(ref => ref.value);
  });
  const mainStyles = computed(() => {
    const layer = layers.value[layers.value.length - 1].layer;
    return {
      position: 'relative',
      paddingLeft: convertToUnit(layer.left),
      paddingRight: convertToUnit(layer.right),
      paddingTop: convertToUnit(layer.top),
      paddingBottom: convertToUnit(layer.bottom),
      ...(transitionsEnabled.value ? undefined : {
        transition: 'none'
      })
    };
  });
  const items = computed(() => {
    return layers.value.slice(1).map((_ref, index) => {
      let {
        id
      } = _ref;
      const {
        layer
      } = layers.value[index];
      const size = layoutSizes.get(id);
      return {
        id,
        ...layer,
        size: Number(size.value)
      };
    });
  });

  const getLayoutItem = id => {
    return items.value.find(item => item.id === id);
  };

  const rootVm = getCurrentInstance('createLayout');
  const isMounted = ref(false);
  onMounted(() => {
    isMounted.value = true;
  });
  provide(VuetifyLayoutKey, {
    register: (vm, _ref2) => {
      let {
        id,
        priority,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute
      } = _ref2;
      priorities.set(id, priority);
      positions.set(id, position);
      layoutSizes.set(id, layoutSize);
      activeItems.set(id, active);
      disableTransitions && disabledTransitions.set(id, disableTransitions);
      const instances = findChildrenWithProvide(VuetifyLayoutKey, rootVm == null ? void 0 : rootVm.vnode);
      const instanceIndex = instances.indexOf(vm);
      if (instanceIndex > -1) registered.value.splice(instanceIndex, 0, id);else registered.value.push(id);
      const index = computed(() => items.value.findIndex(i => i.id === id));
      const zIndex = computed(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
      const layoutItemStyles = computed(() => {
        const isHorizontal = position.value === 'left' || position.value === 'right';
        const isOppositeHorizontal = position.value === 'right';
        const isOppositeVertical = position.value === 'bottom';
        const styles = {
          [position.value]: 0,
          zIndex: zIndex.value,
          transform: `translate${isHorizontal ? 'X' : 'Y'}(${(active.value ? 0 : -110) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}%)`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX$1 ? 'absolute' : 'fixed',
          ...(transitionsEnabled.value ? undefined : {
            transition: 'none'
          })
        };
        if (!isMounted.value) return styles;
        if (index.value < 0) throw new Error(`Layout item "${id}" is missing`);
        const item = items.value[index.value];
        if (!item) throw new Error(`Could not find layout item "${id}`);
        const overlap = computedOverlaps.value.get(id);

        if (overlap) {
          item[overlap.position] += overlap.amount;
        }

        return { ...styles,
          height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : `${elementSize.value}px`,
          marginLeft: isOppositeHorizontal ? undefined : `${item.left}px`,
          marginRight: isOppositeHorizontal ? `${item.right}px` : undefined,
          marginTop: position.value !== 'bottom' ? `${item.top}px` : undefined,
          marginBottom: position.value !== 'top' ? `${item.bottom}px` : undefined,
          width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : `${elementSize.value}px`
        };
      });
      const layoutItemScrimStyles = computed(() => ({
        zIndex: zIndex.value - 1,
        position: rootZIndex.value === ROOT_ZINDEX$1 ? 'fixed' : 'absolute'
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
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex
  });
  const layoutClasses = computed(() => ['v-layout', {
    'v-layout--full-height': props.fullHeight
  }]);
  const layoutStyles = computed(() => ({
    zIndex: rootZIndex.value
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
      page: 'Goto Page {0}',
      currentPage: 'Page {0}, Current Page',
      first: 'First page',
      last: 'Last page'
    }
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  }
};

const rtl = {
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
  fa: false,
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

const RtlSymbol = Symbol.for('vuetify:rtl');
function createRtl(localeScope, options) {
  var _options$rtl, _options$defaultRtl;

  return createRtlScope({
    rtl: { ...rtl,
      ...((_options$rtl = options == null ? void 0 : options.rtl) != null ? _options$rtl : {})
    },
    isRtl: ref((_options$defaultRtl = options == null ? void 0 : options.defaultRtl) != null ? _options$defaultRtl : false),
    rtlClasses: ref('')
  }, localeScope);
}
function createRtlScope(currentScope, localeScope, options) {
  const isRtl = computed(() => {
    if (typeof (options == null ? void 0 : options.rtl) === 'boolean') return options.rtl;

    if (localeScope.current.value && currentScope.rtl.hasOwnProperty(localeScope.current.value)) {
      return currentScope.rtl[localeScope.current.value];
    }

    return currentScope.isRtl.value;
  });
  return {
    isRtl,
    rtl: currentScope.rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`)
  };
}
function provideRtl(props, localeScope) {
  const currentScope = inject(RtlSymbol);
  if (!currentScope) throw new Error('[Vuetify] Could not find injected rtl instance');
  const newScope = createRtlScope(currentScope, localeScope, props);
  provide(RtlSymbol, newScope);
  return newScope;
}
function useRtl() {
  const currentScope = inject(RtlSymbol);
  if (!currentScope) throw new Error('[Vuetify] Could not find injected rtl instance');
  return currentScope;
}

const VApp = defineComponent({
  name: 'VApp',
  props: { ...makeLayoutProps({
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
    useRender(() => {
      var _slots$default;

      return createVNode("div", {
        "ref": layoutRef,
        "class": ['v-application', theme.themeClasses.value, layoutClasses.value, rtlClasses.value],
        "style": layoutStyles.value,
        "data-app": "true"
      }, [createVNode("div", {
        "class": "v-application__wrap"
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]);
    });
    return {
      getLayoutItem,
      items,
      theme
    };
  }

});

// Composables

const VDefaultsProvider = defineComponent$1({
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
    } = toRefs(props);
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
  const dimensionStyles = computed(() => ({
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
    aspectStyles: computed(() => {
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
      dimensionStyles
    } = useDimension(props);
    const {
      aspectStyles
    } = useAspectStyles(props);
    return () => {
      var _slots$additional;

      return createVNode("div", {
        "class": "v-responsive",
        "style": dimensionStyles.value
      }, [createVNode("div", {
        "class": "v-responsive__sizer",
        "style": aspectStyles.value
      }, null), (_slots$additional = slots.additional) == null ? void 0 : _slots$additional.call(slots), slots.default && createVNode("div", {
        "class": ['v-responsive__content', props.contentClass]
      }, [slots.default()])]);
    };
  }

});

// Utils

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
    var _el$_observe;

    let entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let observer = arguments.length > 1 ? arguments[1] : undefined;

    const _observe = (_el$_observe = el._observe) == null ? void 0 : _el$_observe[binding.instance.$.uid];

    if (!_observe) return; // Just in case, should never fire

    const isIntersecting = entries.some(entry => entry.isIntersecting); // If is not quiet or has already been
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
  var _el$_observe2;

  const observe = (_el$_observe2 = el._observe) == null ? void 0 : _el$_observe2[binding.instance.$.uid];
  if (!observe) return;
  observe.observer.unobserve(el);
  delete el._observe[binding.instance.$.uid];
}

const Intersect = {
  mounted: mounted$5,
  unmounted: unmounted$5
};

// Utilities

const makeTransitionProps = propsFactory({
  transition: {
    type: [Boolean, String, Object],
    default: 'fade-transition',
    validator: val => val !== true
  }
}, 'transition');
const MaybeTransition = (props, _ref) => {
  var _slots$default;

  let {
    slots
  } = _ref;
  const {
    transition,
    ...rest
  } = props;
  if (!transition || typeof transition === 'boolean') return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
  const {
    component = Transition,
    ...customProps
  } = typeof transition === 'object' ? transition : {};
  return h(component, mergeProps(typeof transition === 'string' ? {
    name: transition
  } : customProps, rest), slots);
};

const VImg = defineComponent({
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
    ...makeTransitionProps()
  },
  emits: ['loadstart', 'load', 'error'],

  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const currentSrc = ref(''); // Set from srcset

    const image = ref();
    const state = ref(props.eager ? 'loading' : 'idle');
    const naturalWidth = ref();
    const naturalHeight = ref();
    const normalisedSrc = computed(() => {
      return props.src && typeof props.src === 'object' ? {
        src: props.src.src,
        srcset: props.srcset || props.src.srcset,
        lazySrc: props.lazySrc || props.src.lazySrc,
        aspect: Number(props.aspectRatio || props.src.aspect)
      } : {
        src: props.src,
        srcset: props.srcset,
        lazySrc: props.lazySrc,
        aspect: Number(props.aspectRatio || 0)
      };
    });
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
    });
    watch(() => props.src, () => {
      init(state.value !== 'idle');
    }); // TODO: getSrc when window width changes

    onBeforeMount(() => init());

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
      nextTick(() => {
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

    function pollForSize(img) {
      let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

      const poll = () => {
        const {
          naturalHeight: imgHeight,
          naturalWidth: imgWidth
        } = img;

        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === 'loading' && timeout != null) {
          setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith('.svg') || img.currentSrc.startsWith('data:image/svg+xml')) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };

      poll();
    }

    const containClasses = computed(() => ({
      'v-img__img--cover': props.cover,
      'v-img__img--contain': !props.cover
    }));

    const __image = computed(() => {
      var _slots$sources;

      if (!normalisedSrc.value.src || state.value === 'idle') return;
      const img = h('img', {
        class: ['v-img__img', containClasses.value],
        src: normalisedSrc.value.src,
        srcset: normalisedSrc.value.srcset,
        sizes: props.sizes,
        ref: image,
        onLoad,
        onError
      });
      const sources = (_slots$sources = slots.sources) == null ? void 0 : _slots$sources.call(slots);
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [withDirectives(sources ? createVNode("picture", {
          "class": "v-img__picture"
        }, [sources, img]) : img, [[vShow, state.value === 'loaded']])]
      });
    });

    const __preloadImage = computed(() => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [normalisedSrc.value.lazySrc && state.value !== 'loaded' && createVNode("img", {
        "class": ['v-img__img', 'v-img__img--preload', containClasses.value],
        "src": normalisedSrc.value.lazySrc,
        "alt": ""
      }, null)]
    }));

    const __placeholder = computed(() => {
      if (!slots.placeholder) return;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(state.value === 'loading' || state.value === 'error' && !slots.error) && createVNode("div", {
          "class": "v-img__placeholder"
        }, [slots.placeholder()])]
      });
    });

    const __error = computed(() => {
      if (!slots.error) return;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [state.value === 'error' && createVNode("div", {
          "class": "v-img__error"
        }, [slots.error()])]
      });
    });

    const __gradient = computed(() => {
      if (!props.gradient) return;
      return createVNode("div", {
        "class": "v-img__gradient",
        "style": {
          backgroundImage: `linear-gradient(${props.gradient})`
        }
      }, null);
    });

    const isBooted = ref(false);
    {
      const stop = watch(aspectRatio, val => {
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
    useRender(() => withDirectives(createVNode(VResponsive, {
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
      additional: () => [__image.value, __preloadImage.value, __gradient.value, __placeholder.value, __error.value],
      default: slots.default
    }), [[resolveDirective("intersect"), {
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

// Composables
const makeTagProps = propsFactory({
  tag: {
    type: String,
    default: 'div'
  }
}, 'tag');

const VToolbarTitle = genericComponent()({
  name: 'VToolbarTitle',
  props: {
    text: String,
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _slots$default;

      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": "v-toolbar-title"
      }, {
        default: () => [hasText && createVNode("div", {
          "class": "v-toolbar-title__placeholder"
        }, [slots.text ? slots.text() : props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]
      });
    });
    return {};
  }

});

// Utilities

// Composables
const makeBorderProps = propsFactory({
  border: [Boolean, Number, String]
}, 'border');
function useBorder(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const borderClasses = computed(() => {
    const classes = [];

    if (props.border != null && props.border !== false) {
      classes.push(`${name}--border`);
    }

    if (typeof props.border === 'string' && props.border !== '' || props.border === 0) {
      for (const value of String(props.border).split(' ')) {
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

// Composables
const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],

    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }

  }
}, 'elevation');
function useElevation(props) {
  const elevationClasses = computed(() => {
    const elevation = isRef(props) ? props.value : props.elevation;
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

// Composables
const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: undefined
  }
}, 'rounded');
function useRounded(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const roundedClasses = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded;
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

// Composables
function useColor(colors) {
  const backgroundIsCssColor = computed(() => isCssColor(colors.value.background));
  const textIsCssColor = computed(() => isCssColor(colors.value.text));
  const colorClasses = computed(() => {
    const classes = [];

    if (colors.value.background && !backgroundIsCssColor.value) {
      classes.push(`bg-${colors.value.background}`);
    }

    if (colors.value.text && !textIsCssColor.value) {
      classes.push(`text-${colors.value.text}`);
    }

    return classes;
  });
  const colorStyles = computed(() => {
    const styles = {};

    if (colors.value.background && backgroundIsCssColor.value) {
      styles.backgroundColor = colors.value.background;
    }

    if (colors.value.text && textIsCssColor.value) {
      styles.color = colors.value.text;
      styles.caretColor = colors.value.text;
    }

    return styles;
  });
  return {
    colorClasses,
    colorStyles
  };
}
function useTextColor(props, name) {
  const colors = computed(() => ({
    text: isRef(props) ? props.value : name ? props[name] : null
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
  const colors = computed(() => ({
    background: isRef(props) ? props.value : name ? props[name] : null
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

function useForwardRef(target) {
  for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    refs[_key - 1] = arguments[_key];
  }

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

      for (const ref of refs) {
        if (!ref.value) continue;
        const descriptor = Reflect.getOwnPropertyDescriptor(ref.value, key);
        if (descriptor) return descriptor;
      }

      for (const ref of refs) {
        const obj = ref.value && Object.getPrototypeOf(ref.value);
        if (!obj) continue;
        const descriptor = Reflect.getOwnPropertyDescriptor(obj, key);
        if (descriptor) return descriptor;
      }

      return undefined;
    }

  });
}

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
    default: 56
  },
  image: String,
  title: String,
  ...makeBorderProps(),
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
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
    const contentHeight = computed(() => Number(props.height) + (props.density === 'prominent' ? Number(props.height) : 0) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0));
    provideDefaults({
      VBtn: {
        flat: true,
        variant: 'text'
      },
      VTextField: {
        hideDetails: true
      }
    }, {
      scoped: true
    });
    useRender(() => {
      var _slots$image, _slots$prepend, _slots$default, _slots$append, _slots$extension;

      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const isExtended = !!(props.extended || slots.extension);
      return createVNode(props.tag, {
        "class": ['v-toolbar', {
          'v-toolbar--absolute': props.absolute,
          'v-toolbar--collapse': props.collapse,
          'v-toolbar--flat': props.flat,
          'v-toolbar--floating': props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value],
        "style": [backgroundColorStyles.value]
      }, {
        default: () => [hasImage && createVNode("div", {
          "class": "v-toolbar__image"
        }, [createVNode(VDefaultsProvider, {
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          },
          "scoped": true
        }, {
          default: () => [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots) : createVNode(VImg, null, null)]
        })]), createVNode("div", {
          "class": "v-toolbar__content",
          "style": {
            height: convertToUnit(contentHeight.value)
          }
        }, [slots.prepend && createVNode("div", {
          "class": "v-toolbar__prepend"
        }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)]), hasTitle && createVNode(VToolbarTitle, {
          "text": props.title
        }, {
          text: slots.title
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.append && createVNode("div", {
          "class": "v-toolbar__append"
        }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)])]), isExtended && createVNode("div", {
          "class": "v-toolbar__extension",
          "style": {
            height: convertToUnit(props.extensionHeight)
          }
        }, [(_slots$extension = slots.extension) == null ? void 0 : _slots$extension.call(slots)])]
      });
    });
    return useForwardRef({
      contentHeight
    });
  }

});
function filterToolbarProps(props) {
  var _VToolbar$props;

  return pick(props, Object.keys((_VToolbar$props = VToolbar == null ? void 0 : VToolbar.props) != null ? _VToolbar$props : {}));
}

// Utilities

// Composables
function useProxiedModel(props, prop, defaultValue) {
  let transformIn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : v => v;
  let transformOut = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : v => v;
  const vm = getCurrentInstance('useProxiedModel');
  const propIsDefined = computed(() => {
    var _vm$vnode$props, _vm$vnode$props2;

    return !!(typeof props[prop] !== 'undefined' && (vm != null && (_vm$vnode$props = vm.vnode.props) != null && _vm$vnode$props.hasOwnProperty(prop) || vm != null && (_vm$vnode$props2 = vm.vnode.props) != null && _vm$vnode$props2.hasOwnProperty(toKebabCase(prop))));
  });
  const internal = ref(transformIn(props[prop]));
  return computed({
    get() {
      if (propIsDefined.value) return transformIn(props[prop]);else return internal.value;
    },

    set(newValue) {
      if ((propIsDefined.value ? transformIn(props[prop]) : internal.value) === newValue) {
        return;
      }

      internal.value = newValue;
      vm == null ? void 0 : vm.emit(`update:${prop}`, transformOut(newValue));
    }

  });
}

const VAppBar = defineComponent({
  name: 'VAppBar',
  props: {
    // TODO: Implement scrolling techniques
    // hideOnScroll: Boolean
    // invertedScroll: Boolean
    // collapseOnScroll: Boolean
    // elevateOnScroll: Boolean
    // shrinkOnScroll: Boolean
    // fadeImageOnScroll: Boolean
    modelValue: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'top',
      validator: value => ['top', 'bottom'].includes(value)
    },
    ...makeVToolbarProps(),
    ...makeLayoutItemProps(),
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
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, 'modelValue');
    const height = computed(() => {
      var _vToolbarRef$value;

      return (_vToolbarRef$value = vToolbarRef.value) == null ? void 0 : _vToolbarRef$value.contentHeight;
    });
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      priority: computed(() => parseInt(props.priority, 10)),
      position: toRef(props, 'position'),
      layoutSize: height,
      elementSize: height,
      active: isActive,
      absolute: toRef(props, 'absolute')
    });
    return () => {
      const [toolbarProps] = filterToolbarProps(props);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ['v-app-bar', {
          'v-app-bar--bottom': props.position === 'bottom'
        }],
        "style": layoutItemStyles.value
      }, toolbarProps), slots);
    };
  }

});

// Utilities

const allowedDensities = [null, 'default', 'comfortable', 'compact'];
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
  const densityClasses = computed(() => {
    return `${name}--density-${props.density}`;
  });
  return {
    densityClasses
  };
}

const allowedVariants$2 = ['outlined', 'plain', 'text', 'contained', 'contained-flat', 'contained-text'];
function genOverlays(isClickable, name) {
  return createVNode(Fragment, null, [isClickable && createVNode("div", {
    "class": `${name}__overlay`
  }, null), createVNode("div", {
    "class": `${name}__underlay`
  }, null)]);
}
const makeVariantProps = propsFactory({
  color: String,
  textColor: String,
  variant: {
    type: String,
    default: 'contained',
    validator: v => allowedVariants$2.includes(v)
  }
}, 'variant');
function useVariant(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const variantClasses = computed(() => {
    const {
      variant
    } = unref(props);
    return `${name}--variant-${variant}`;
  });
  const {
    colorClasses,
    colorStyles
  } = useColor(computed(() => {
    const {
      textColor,
      variant,
      color
    } = unref(props);
    return {
      text: textColor,
      [['contained', 'contained-flat'].includes(variant) ? 'background' : 'text']: color
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
        color: toRef(props, 'color'),
        density: toRef(props, 'density'),
        flat: true,
        variant: toRef(props, 'variant')
      }
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": ['v-btn-group', {
          'v-btn-group--divided': props.divided
        }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value]
      }, slots);
    });
  }

});

// Composables

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
  provide(Symbol.for(`${injectKey.description}:id`), id);
  const group = inject(injectKey, null);

  if (!group) {
    if (!required) return group;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
  }

  const value = toRef(props, 'value');
  const disabled = computed(() => group.disabled.value || props.disabled);
  group.register({
    id,
    value,
    disabled
  }, vm);
  onBeforeUnmount(() => {
    group.unregister(id);
  });
  const isSelected = computed(() => {
    return group.isSelected(id);
  });
  const selectedClass = computed(() => {
    var _group$selectedClass$;

    return isSelected.value && ((_group$selectedClass$ = group.selectedClass.value) != null ? _group$selectedClass$ : props.selectedClass);
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
  const items = reactive([]);
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
    if (isUnmounted) return; // TODO: re-evaluate this line's importance in the future
    // should we only modify the model if mandatory is set.
    // selected.value = selected.value.filter(v => v !== id)

    forceMandatoryValue();
    const index = items.findIndex(item => item.id === id);
    items.splice(index, 1);
  } // If mandatory and nothing is selected, then select first non-disabled item


  function forceMandatoryValue() {
    const item = items.find(item => !item.disabled);

    if (item && props.mandatory === 'force' && !selected.value.length) {
      selected.value = [item.id];
    }
  }

  onMounted(() => {
    forceMandatoryValue();
  });
  onBeforeUnmount(() => {
    isUnmounted = true;
  });

  function select(id, value) {
    const item = items.find(item => item.id === id);
    if (value && item != null && item.disabled) return;

    if (props.multiple) {
      var _value;

      const internalValue = selected.value.slice();
      const index = internalValue.findIndex(v => v === id);
      const isSelected = ~index;
      value = (_value = value) != null ? _value : !isSelected; // We can't remove value if group is
      // mandatory, value already exists,
      // and it is the only value

      if (isSelected && props.mandatory && internalValue.length <= 1) return; // We can't add value if it would
      // cause max limit to be exceeded

      if (!isSelected && props.max != null && internalValue.length + 1 > props.max) return;
      if (index < 0 && value) internalValue.push(id);else if (index >= 0 && !value) internalValue.splice(index, 1);
      selected.value = internalValue;
    } else {
      var _value2;

      const isSelected = selected.value.includes(id);
      if (props.mandatory && isSelected) return;
      selected.value = ((_value2 = value) != null ? _value2 : !isSelected) ? [id] : [];
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
    disabled: toRef(props, 'disabled'),
    prev: () => step(items.length - 1),
    next: () => step(1),
    isSelected: id => selected.value.includes(id),
    selectedClass: computed(() => props.selectedClass),
    items: computed(() => items)
  };
  provide(injectKey, state);
  return state;
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

const VBtnToggleSymbol = Symbol.for('vuetify:v-btn-toggle');
const VBtnToggle = genericComponent()({
  name: 'VBtnToggle',
  props: makeGroupProps({
    selectedClass: 'v-btn--selected'
  }),
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

      return createVNode(VBtnGroup, {
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

// Utilities

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
  const sizeClasses = computed(() => {
    return predefinedSizes.includes(props.size) ? `${name}--size-${props.size}` : null;
  });
  const sizeStyles = computed(() => {
    return !predefinedSizes.includes(props.size) && props.size ? {
      width: convertToUnit(props.size),
      height: convertToUnit(props.size)
    } : null;
  });
  return {
    sizeClasses,
    sizeStyles
  };
}

const IconSymbol = Symbol.for('vuetify:icons');
const makeIconProps = propsFactory({
  icon: {
    type: [String, Object],
    required: true
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

  setup(props) {
    return () => {
      return createVNode(props.tag, null, {
        default: () => [createVNode(props.icon, null, null)]
      });
    };
  }

});
const VSvgIcon = defineComponent({
  name: 'VSvgIcon',
  inheritAttrs: false,
  props: makeIconProps(),

  setup(props, _ref) {
    let {
      attrs
    } = _ref;
    return () => {
      return createVNode(props.tag, mergeProps(attrs, {
        "style": null
      }), {
        default: () => [createVNode("svg", {
          "class": "v-icon__svg",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 24 24",
          "role": "img",
          "aria-hidden": "true"
        }, [createVNode("path", {
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
      return createVNode(props.tag, null, {
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
      return createVNode(props.tag, {
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
}; // Composables

const useIcon = props => {
  const icons = inject(IconSymbol);
  if (!icons) throw new Error('Missing Vuetify Icons provide!');
  const iconData = computed(() => {
    const iconAlias = isRef(props) ? props.value : props.icon;
    if (!iconAlias) throw new Error('Icon value is undefined or null');
    let icon = iconAlias;

    if (typeof iconAlias === 'string' && iconAlias.includes('$')) {
      var _icons$aliases;

      icon = (_icons$aliases = icons.aliases) == null ? void 0 : _icons$aliases[iconAlias.slice(iconAlias.indexOf('$') + 1)];
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
    const iconSet = icons.sets[iconSetName != null ? iconSetName : icons.defaultSet];
    return {
      component: iconSet.component,
      icon: iconName
    };
  });
  return {
    iconData
  };
};

const VIcon = defineComponent({
  name: 'VIcon',
  props: {
    color: String,
    left: Boolean,
    right: Boolean,
    icon: {
      type: [String, Object]
    },
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'i'
    }),
    ...makeThemeProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    let slotIcon;

    if (slots.default) {
      slotIcon = computed(() => {
        var _slots$default, _flattenFragments$fil;

        const slot = (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
        if (!slot) return;
        return (_flattenFragments$fil = flattenFragments(slot).filter(node => node.children && typeof node.children === 'string')[0]) == null ? void 0 : _flattenFragments$fil.children;
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
    } = useTextColor(toRef(props, 'color'));
    return () => {
      return createVNode(iconData.value.component, {
        "tag": props.tag,
        "icon": iconData.value.icon,
        "class": ['v-icon', 'notranslate', sizeClasses.value, textColorClasses.value, themeClasses.value, {
          'v-icon--left': props.left,
          'v-icon--right': props.right
        }],
        "style": [!sizeClasses.value ? {
          fontSize: convertToUnit(props.size),
          width: convertToUnit(props.size),
          height: convertToUnit(props.size)
        } : undefined, textColorStyles.value],
        "aria-hidden": "true"
      }, null);
    };
  }

});

// Utilities

const positionValues = ['static', 'relative', 'fixed', 'absolute', 'sticky'];
// Composables
const makePositionProps = propsFactory({
  absolute: Boolean,
  bottom: [Boolean, Number, String],
  fixed: Boolean,
  left: [Boolean, Number, String],
  position: {
    type: String,
    validator:
    /* istanbul ignore next */
    v => positionValues.includes(v)
  },
  right: [Boolean, Number, String],
  top: [Boolean, Number, String]
}, 'position');
function usePosition(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const targets = ['top', 'right', 'bottom', 'left'];
  const positionClasses = computed(() => {
    if (props.fixed) return `${name}--fixed`;
    if (props.absolute) return `${name}--absolute`;
    return props.position ? `position-${props.position}` : undefined;
  });
  const positionStyles = computed(() => {
    const styles = {};

    for (const target of targets) {
      const prop = props[target];
      if (prop == null || prop === false) continue;
      styles[target] = convertToUnit(prop === true ? '0' : String(prop));
    }

    return styles;
  });
  return {
    positionClasses,
    positionStyles
  };
}

// Utilities
function useRouter() {
  var _getCurrentInstance, _getCurrentInstance$p;

  return (_getCurrentInstance = getCurrentInstance('useRouter')) == null ? void 0 : (_getCurrentInstance$p = _getCurrentInstance.proxy) == null ? void 0 : _getCurrentInstance$p.$router;
}
function useLink(props, attrs) {
  const RouterLink = resolveDynamicComponent('RouterLink');
  const isLink = computed(() => !!(props.href || props.to));
  const isClickable = computed(() => {
    return (isLink == null ? void 0 : isLink.value) || !!(attrs.onClick || attrs.onClickOnce);
  });

  if (typeof RouterLink === 'string') {
    return {
      isLink,
      isClickable,
      href: toRef(props, 'href')
    };
  }

  const link = props.to ? RouterLink.useLink(props) : undefined;
  return { ...link,
    isLink,
    isClickable,
    href: computed(() => props.to ? link == null ? void 0 : link.route.value.href : props.href)
  };
}
const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object]
}, 'router');
function useBackButton(cb) {
  const router = useRouter();
  let popped = false;
  let removeGuard;
  onMounted(() => {
    window.addEventListener('popstate', onPopstate);
    removeGuard = router == null ? void 0 : router.beforeEach((to, from, next) => {
      setTimeout(() => popped ? cb(next) : next());
    });
  });
  onBeforeUnmount(() => {
    var _removeGuard;

    window.removeEventListener('popstate', onPopstate);
    (_removeGuard = removeGuard) == null ? void 0 : _removeGuard();
  });

  function onPopstate(e) {
    var _e$state;

    if ((_e$state = e.state) != null && _e$state.replaced) return;
    popped = true;
    setTimeout(() => popped = false);
  }
}

// Styles

const rippleStop = Symbol('rippleStop');
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
  if (!(element != null && element._ripple) || element._ripple.touched || e[rippleStop]) return; // Don't allow the event to trigger ripples on any other elements

  e[rippleStop] = true;

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

function rippleHide(e) {
  const element = e.currentTarget;
  if (!element || !element._ripple) return;
  window.clearTimeout(element._ripple.showTimer); // The touch interaction occurs before the show timer is triggered.
  // We still want to show ripple effect.

  if (e.type === 'touchend' && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit();

    element._ripple.showTimerCommit = null; // re-queue ripple hiding

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
  var _el$_ripple4;

  const {
    value,
    modifiers
  } = binding;
  const enabled = isRippleEnabled(value);

  if (!enabled) {
    ripples.hide(el);
  }

  el._ripple = (_el$_ripple4 = el._ripple) != null ? _el$_ripple4 : {};
  el._ripple.enabled = enabled;
  el._ripple.centered = modifiers.center;
  el._ripple.circle = modifiers.circle;

  if (isObject(value) && value.class) {
    el._ripple.class = value.class;
  }

  if (enabled && !wasEnabled) {
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
    el.addEventListener('blur', focusRippleHide); // Anchor tags can be dragged, causes other hides to fail - #1537

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

const VBtn = defineComponent({
  name: 'VBtn',
  directives: {
    Ripple
  },
  props: {
    flat: Boolean,
    icon: [Boolean, String],
    prependIcon: String,
    appendIcon: String,
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
    ...makePositionProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'button'
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'contained'
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
      positionClasses,
      positionStyles
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const group = useGroupItem(props, VBtnToggleSymbol, false);
    const link = useLink(props, attrs);
    const isDisabled = computed(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
    const isElevated = computed(() => {
      return props.variant === 'contained' && !(props.disabled || props.flat || props.border);
    });
    return () => {
      var _link$isExactActive, _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasColor = !group || group.isSelected.value;
      return withDirectives(createVNode(Tag, {
        "type": Tag === 'a' ? undefined : 'button',
        "class": ['v-btn', group == null ? void 0 : group.selectedClass.value, {
          'v-btn--active': (_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value,
          'v-btn--block': props.block,
          'v-btn--disabled': isDisabled.value,
          'v-btn--elevated': isElevated.value,
          'v-btn--flat': props.flat,
          'v-btn--icon': !!props.icon,
          'v-btn--stacked': props.stacked
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : undefined, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
        "style": [hasColor ? colorStyles.value : undefined, dimensionStyles.value, positionStyles.value],
        "disabled": isDisabled.value || undefined,
        "href": link.href.value,
        "onClick": isDisabled.value || link.navigate || (group == null ? void 0 : group.toggle)
      }, {
        default: () => [genOverlays(true, 'v-btn'), !props.icon && props.prependIcon && createVNode(VIcon, {
          "class": "v-btn__icon",
          "icon": props.prependIcon,
          "left": !props.stacked
        }, null), typeof props.icon === 'boolean' ? (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots) : createVNode(VIcon, {
          "class": "v-btn__icon",
          "icon": props.icon,
          "size": props.size
        }, null), !props.icon && props.appendIcon && createVNode(VIcon, {
          "class": "v-btn__icon",
          "icon": props.appendIcon,
          "right": !props.stacked
        }, null)]
      }), [[resolveDirective("ripple"), !isDisabled.value && props.ripple, null]]);
    };
  }

});

const VAppBarNavIcon = defineComponent({
  name: 'VAppBarNavIcon',
  props: {
    icon: {
      type: String,
      default: '$menu'
    }
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      var _slots$default;

      return createVNode(VBtn, {
        "class": "v-app-bar-nav-icon",
        "icon": props.icon
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      });
    };
  }

});

// Composables
const VToolbarItems = defineComponent({
  name: 'VToolbarItems',
  props: { ...makeVariantProps({
      variant: 'contained-text'
    })
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        color: toRef(props, 'color'),
        textColor: toRef(props, 'textColor'),
        variant: toRef(props, 'variant')
      }
    });
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
    };
  }

});

const VAppBarTitle = defineComponent({ ...VToolbarTitle,
  name: 'VAppBarTitle',

  setup(_, _ref) {
    let {
      slots
    } = _ref;
    return () => createVNode(VToolbarTitle, {
      "class": "v-app-bar-title"
    }, slots);
  }

});

const VAlertTitle = createSimpleFunctional('v-alert-title');

const allowedTypes = ['success', 'info', 'warning', 'error'];
const VAlert = defineComponent({
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
      type: String,
      default: '$close'
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close'
    },
    icon: {
      type: [Boolean, String],
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
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'contained-flat'
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
    const icon = computed(() => {
      var _props$icon;

      if (props.icon === false) return undefined;
      if (!props.type) return props.icon;
      return (_props$icon = props.icon) != null ? _props$icon : `$${props.type}`;
    });
    const variantProps = computed(() => {
      var _props$color;

      return {
        color: (_props$color = props.color) != null ? _props$color : props.type,
        textColor: props.textColor,
        variant: props.variant
      };
    });
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
      positionClasses,
      positionStyles
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, 'borderColor'));

    function onCloseClick(e) {
      isActive.value = false;
    }

    return () => {
      var _slots$default;

      const hasClose = !!(slots.close || props.closable);
      const hasPrepend = !!(slots.prepend || icon.value);
      const hasTitle = !!(slots.title || props.title);
      return isActive.value && createVNode(props.tag, {
        "class": ['v-alert', props.border && {
          'v-alert--border': !!props.border,
          [`v-alert--border-${props.border === true ? 'start' : props.border}`]: true
        }, {
          'v-alert--prominent': props.prominent
        }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value, positionStyles.value],
        "role": "alert"
      }, {
        default: () => [genOverlays(false, 'v-alert'), props.border && createVNode("div", {
          "class": ['v-alert__border', textColorClasses.value],
          "style": textColorStyles.value
        }, null), hasPrepend && createVNode("div", {
          "class": "v-alert__prepend"
        }, [slots.prepend ? slots.prepend() : createVNode(VIcon, {
          "icon": icon.value,
          "size": props.prominent ? 'large' : 'default'
        }, null)]), createVNode("div", {
          "class": "v-alert__content"
        }, [hasTitle && createVNode(VAlertTitle, null, {
          default: () => [slots.title ? slots.title() : props.title]
        }), slots.text ? slots.text() : props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.append && createVNode("div", {
          "class": "v-alert__append"
        }, [slots.append()]), hasClose && createVNode("div", {
          "class": "v-alert__close",
          "onClick": onCloseClick
        }, [slots.close ? slots.close() : createVNode(VIcon, {
          "icon": props.closeIcon,
          "size": "small"
        }, null)])]
      });
    };
  }

});

const VAvatar = defineComponent({
  name: 'VAvatar',
  props: {
    color: String,
    left: Boolean,
    right: Boolean,
    icon: String,
    image: String,
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
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

      return createVNode(props.tag, {
        "class": ['v-avatar', {
          'v-avatar--left': props.left,
          'v-avatar--right': props.right
        }, backgroundColorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value],
        "style": [backgroundColorStyles.value, sizeStyles.value]
      }, {
        default: () => [props.image ? createVNode(VImg, {
          "src": props.image,
          "alt": ""
        }, null) : props.icon ? createVNode(VIcon, {
          "icon": props.icon
        }, null) : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      });
    });
    return {};
  }

});

const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group');
const VChipGroup = defineComponent({
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
      variant: 'contained-text'
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
        color: toRef(props, 'color'),
        filter: toRef(props, 'filter'),
        variant: toRef(props, 'variant')
      }
    });
    return () => {
      var _slots$default;

      return createVNode(props.tag, {
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
    };
  }

});

// Utilities

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
        const tag = props.group ? TransitionGroup : Transition;
        return h(tag, {
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
        return h(Transition, {
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
  const offsetProperty = camelize(`offset-${sizeProperty}`);
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
      el.style.setProperty('transition', 'none', 'important'); // Hide overflow to account for collapsed margins in the calculated height

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
      },

      async onEnter(el, done) {
        await new Promise(resolve => requestAnimationFrame(resolve));
        const {
          x,
          y
        } = getDimensions(props.target, el);
        const animation = el.animate([{
          transform: `translate(${x}px, ${y}px) scale(0.1)`,
          opacity: 0
        }, {
          transform: ''
        }], {
          duration: 225,
          easing: deceleratedEasing
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
          y
        } = getDimensions(props.target, el);
        const animation = el.animate([{
          transform: ''
        }, {
          transform: `translate(${x}px, ${y}px) scale(0.1)`,
          opacity: 0
        }], {
          duration: 125,
          easing: acceleratedEasing
        });
        animation.finished.then(() => done());
      },

      onAfterLeave(el) {
        el.style.removeProperty('pointer-events');
      }

    };
    return () => {
      return props.target ? createVNode(Transition, mergeProps({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots) : createVNode(Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }

});

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

  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top)
  };
}

const VCarouselTransition = createCssTransition('carousel-transition');
const VCarouselReverseTransition = createCssTransition('carousel-reverse-transition');
const VTabTransition = createCssTransition('tab-transition');
const VTabReverseTransition = createCssTransition('tab-reverse-transition');
const VMenuTransition = createCssTransition('menu-transition');
const VFabTransition = createCssTransition('fab-transition', 'center center', 'out-in'); // Generic transitions

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
const VSlideYReverseTransition = createCssTransition('slide-y-reverse-transition'); // Javascript transitions

const VExpandTransition = createJavascriptTransition('expand-transition', ExpandTransitionGenerator());
const VExpandXTransition = createJavascriptTransition('expand-x-transition', ExpandTransitionGenerator('', true));

const VChip = defineComponent({
  name: 'VChip',
  directives: {
    Ripple
  },
  props: {
    activeClass: String,
    appendAvatar: String,
    appendIcon: String,
    closable: Boolean,
    closeIcon: {
      type: String,
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
    prependIcon: String,
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
      variant: 'contained-text'
    })
  },
  emits: {
    'click:close': e => true,
    'update:active': value => true,
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
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
      elevationClasses
    } = useElevation(props);
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      densityClasses
    } = useDensity(props);
    const link = useLink(props, attrs);

    function onCloseClick(e) {
      isActive.value = false;
      emit('click:close', e);
    }

    return () => {
      var _slots$default, _slots$default2;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasAppend = !!(slots.append || props.appendIcon || props.appendAvatar);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrepend = !!(slots.prepend || props.prependIcon || props.prependAvatar);
      const hasColor = !group || group.isSelected.value;
      const isClickable = !props.disabled && (!!group || link.isClickable.value || props.link);
      const onClickFunc = props.link ? props.link : group == null ? void 0 : group.toggle;
      return isActive.value && withDirectives(createVNode(Tag, {
        "class": ['v-chip', {
          'v-chip--disabled': props.disabled,
          'v-chip--label': props.label,
          'v-chip--link': isClickable,
          'v-chip--pill': props.pill
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : undefined, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value],
        "style": [hasColor ? colorStyles.value : undefined],
        "disabled": props.disabled || undefined,
        "draggable": props.draggable,
        "href": link.href.value,
        "onClick": isClickable && onClickFunc
      }, {
        default: () => [genOverlays(isClickable, 'v-chip'), hasFilter && createVNode(VExpandXTransition, null, {
          default: () => [withDirectives(createVNode("div", {
            "class": "v-chip__filter"
          }, [slots.filter ? slots.filter() : createVNode(VIcon, {
            "icon": props.filterIcon
          }, null)]), [[vShow, group.isSelected.value]])]
        }), hasPrepend && createVNode("div", {
          "class": "v-chip__prepend"
        }, [slots.prepend ? slots.prepend() : createVNode(VAvatar, {
          "icon": props.prependIcon,
          "image": props.prependAvatar,
          "size": props.size
        }, null)]), (_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots, {
          isSelected: group == null ? void 0 : group.isSelected.value,
          selectedClass: group == null ? void 0 : group.selectedClass.value,
          select: group == null ? void 0 : group.select,
          toggle: group == null ? void 0 : group.toggle,
          value: group == null ? void 0 : group.value.value,
          disabled: props.disabled
        })) != null ? _slots$default : props.text, hasAppend && createVNode("div", {
          "class": "v-chip__append"
        }, [slots.append ? slots.append() : createVNode(VAvatar, {
          "icon": props.appendIcon,
          "image": props.appendAvatar,
          "size": props.size
        }, null)]), hasClose && createVNode("div", {
          "class": "v-chip__close",
          "onClick": onCloseClick
        }, [slots.close ? slots.close({
          props: {
            onClick: onCloseClick
          }
        }) : createVNode(VIcon, {
          "icon": props.closeIcon,
          "size": "x-small"
        }, null)])]
      }), [[resolveDirective("ripple"), isClickable && props.ripple, null]]);
    };
  }

});

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
    } = useBackgroundColor(toRef(props, 'color'));
    const dividerStyles = computed(() => {
      const styles = {};

      if (props.length) {
        styles[props.vertical ? 'maxHeight' : 'maxWidth'] = convertToUnit(props.length);
      }

      if (props.thickness) {
        styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = convertToUnit(props.thickness);
      }

      return styles;
    });
    return () => {
      return createVNode("hr", {
        "class": [{
          'v-divider': true,
          'v-divider--inset': props.inset,
          'v-divider--vertical': props.vertical
        }, themeClasses.value, backgroundColorClasses.value],
        "style": [dividerStyles.value, backgroundColorStyles.value],
        "aria-orientation": !attrs.role || attrs.role === 'separator' ? props.vertical ? 'vertical' : 'horizontal' : undefined,
        "role": `${attrs.role || 'separator'}`
      }, null);
    };
  }

});

// Utilities

const ListKey = Symbol.for('vuetify:list');
function createList() {
  const parent = inject(ListKey, {
    hasPrepend: ref(false),
    updateHasPrepend: () => null
  });
  const data = {
    hasPrepend: ref(false),
    updateHasPrepend: value => {
      if (value) data.hasPrepend.value = value;
    }
  };
  provide(ListKey, data);
  return parent;
}
function useList() {
  return inject(ListKey, null);
}

const singleOpenStrategy = _ref => {
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
};
const multipleOpenStrategy = _ref2 => {
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
};

const independentSelectStrategy = {
  select: _ref => {
    let {
      id,
      value,
      mandatory,
      selected
    } = _ref;
    selected.set(id, value ? 'on' : mandatory && !Array.from(selected.entries()).find(_ref2 => {
      let [key, value] = _ref2;
      return value === 'on' && key !== id;
    }) ? 'on' : 'off');
    return selected;
  },
  in: (v, children, parents) => {
    let map = new Map();

    for (const id of v || []) {
      map = independentSelectStrategy.select({
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
const independentSingleSelectStrategy = {
  select: _ref3 => {
    let {
      id,
      value,
      ...rest
    } = _ref3;
    return independentSelectStrategy.select({ ...rest,
      id,
      value,
      selected: new Map()
    });
  },
  in: (v, children, parents) => {
    let map = new Map();

    if (v != null && v.length) {
      map = independentSelectStrategy.in(v.slice(0, 1), children, parents);
    }

    return map;
  },
  out: (v, children, parents) => {
    return independentSelectStrategy.out(v, children, parents);
  }
};
const leafSelectStrategy = function () {
  let single = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  const strategy = {
    select: _ref4 => {
      let {
        id,
        value,
        selected,
        children
      } = _ref4;
      if (children.has(id)) return selected;
      if (single) return new Map([[id, value ? 'on' : 'off']]);
      selected.set(id, value ? 'on' : 'off');
      return selected;
    },
    in: (v, children, parents) => {
      let map = new Map();

      for (const id of v != null ? v : []) {
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
    out: independentSelectStrategy.out
  };
  return strategy;
};
const classicSelectStrategy = {
  select: _ref5 => {
    let {
      id,
      value,
      selected,
      children,
      parents
    } = _ref5;
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

    return selected;
  },
  in: (v, children, parents) => {
    let map = new Map();

    for (const id of v || []) {
      map = classicSelectStrategy.select({
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

const VNestedSymbol = Symbol.for('vuetify:nested');
const emptyNested = {
  id: ref(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: ref(new Map()),
    children: ref(new Map()),
    open: () => null,
    select: () => null,
    opened: ref(new Set()),
    selected: ref(new Map()),
    selectedValues: ref([])
  }
};
const makeNestedProps = propsFactory({
  selectStrategy: [String, Function],
  openStrategy: [String, Function],
  opened: Array,
  selected: Array,
  mandatory: Boolean
}, 'nested');
const useNested = props => {
  let isUnmounted = false;
  const children = ref(new Map());
  const parents = ref(new Map());
  const opened = useProxiedModel(props, 'opened', props.opened, v => new Set(v), v => [...v.values()]);
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === 'object') return props.selectStrategy;

    switch (props.selectStrategy) {
      case 'single-leaf':
        return leafSelectStrategy(true);

      case 'leaf':
        return leafSelectStrategy();

      case 'independent':
        return independentSelectStrategy;

      case 'single-independent':
        return independentSingleSelectStrategy;

      case 'classic':
      default:
        return classicSelectStrategy;
    }
  });
  const openStrategy = computed(() => {
    if (typeof props.openStrategy === 'function') return props.openStrategy;

    switch (props.openStrategy) {
      case 'single':
        return singleOpenStrategy;

      case 'multiple':
      default:
        return multipleOpenStrategy;
    }
  });
  const selected = useProxiedModel(props, 'selected', props.selected, v => selectStrategy.value.in(v, children.value, parents.value), v => selectStrategy.value.out(v, children.value, parents.value));
  onBeforeUnmount(() => {
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
    id: ref(),
    root: {
      opened,
      selected,
      selectedValues: computed(() => {
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
          var _children$value$get;

          const list = (_children$value$get = children.value.get(parent)) != null ? _children$value$get : [];
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
        const newOpened = openStrategy.value({
          id,
          value,
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
          event,
          mandatory: props.mandatory
        });
        newSelected && (selected.value = newSelected);
      },
      children,
      parents
    }
  };
  provide(VNestedSymbol, nested);
  return nested.root;
};
const useNestedItem = (id, isGroup) => {
  const parent = inject(VNestedSymbol, emptyNested);
  const computedId = computed(() => {
    var _id$value;

    return (_id$value = id.value) != null ? _id$value : getUid().toString();
  });
  const item = { ...parent,
    id: computedId,
    open: (open, e) => parent.root.open(computedId.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    select: (selected, e) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(computedId.value) === 'on'),
    isIndeterminate: computed(() => parent.root.selected.value.get(computedId.value) === 'indeterminate'),
    isLeaf: computed(() => !parent.root.children.value.get(computedId.value))
  };
  !parent.skipRegister && parent.root.register(computedId.value, parent.id.value, isGroup);
  onBeforeUnmount(() => {
    !parent.skipRegister && parent.root.unregister(computedId.value);
  });
  isGroup && provide(VNestedSymbol, item);
  return item;
};
const useNestedGroupActivator = () => {
  const parent = inject(VNestedSymbol, emptyNested);
  provide(VNestedSymbol, { ...parent,
    skipRegister: true
  });
};

const VListGroupActivator = defineComponent$1({
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
const VListGroup = genericComponent()({
  name: 'VListGroup',
  props: {
    collapseIcon: {
      type: String,
      default: '$collapse'
    },
    expandIcon: {
      type: String,
      default: '$expand'
    },
    value: null,
    ...makeTagProps()
  },

  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    const {
      isOpen,
      open
    } = useNestedItem(toRef(props, 'value'), true);
    const list = useList();

    const onClick = e => {
      open(!isOpen.value, e);
    };

    const activatorProps = computed(() => ({
      onClick,
      appendIcon: isOpen.value ? props.collapseIcon : props.expandIcon,
      class: 'v-list-group__header'
    }));
    return () => {
      var _slots$default2;

      return createVNode(props.tag, {
        "class": ['v-list-group', {
          'v-list-group--prepend': list == null ? void 0 : list.hasPrepend.value
        }]
      }, {
        default: () => [slots.activator && createVNode(VListGroupActivator, null, {
          default: () => [slots.activator({
            props: activatorProps.value
          })]
        }), createVNode(VExpandTransition, null, {
          default: () => [withDirectives(createVNode("div", {
            "class": "v-list-group__items"
          }, [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]), [[vShow, isOpen.value]])]
        })]
      });
    };
  }

});

const VListItemAvatar = defineComponent({
  name: 'VListItemAvatar',
  props: {
    left: Boolean,
    right: Boolean,
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      return createVNode(props.tag, {
        "class": ['v-list-item-avatar', {
          'v-list-item-avatar--start': props.left,
          'v-list-item-avatar--end': props.right
        }]
      }, slots);
    };
  }

});

const VListItemHeader = createSimpleFunctional('v-list-item-header');

const VListItemSubtitle = createSimpleFunctional('v-list-item-subtitle');

const VListItemTitle = createSimpleFunctional('v-list-item-title');

const VListItem = genericComponent()({
  name: 'VListItem',
  directives: {
    Ripple
  },
  props: {
    active: Boolean,
    activeColor: String,
    activeClass: String,
    appendAvatar: String,
    appendIcon: String,
    disabled: Boolean,
    link: Boolean,
    prependAvatar: String,
    prependIcon: String,
    subtitle: String,
    title: String,
    value: null,
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

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const link = useLink(props, attrs);
    const id = computed(() => {
      var _props$value;

      return (_props$value = props.value) != null ? _props$value : link.href.value;
    });
    const {
      select,
      isSelected,
      root,
      parent
    } = useNestedItem(id, false);
    const list = useList();
    const isActive = computed(() => {
      var _link$isExactActive;

      return props.active || ((_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value) || isSelected.value;
    });
    const variantProps = computed(() => {
      var _props$activeColor;

      const activeColor = (_props$activeColor = props.activeColor) != null ? _props$activeColor : props.color;
      return {
        color: isActive.value ? activeColor : props.color,
        textColor: props.textColor,
        variant: props.variant
      };
    });
    onMounted(() => {
      var _link$isExactActive2;

      if ((_link$isExactActive2 = link.isExactActive) != null && _link$isExactActive2.value && parent.value != null) {
        root.open(parent.value, true);
      }
    });
    watch(() => {
      var _link$isExactActive3;

      return (_link$isExactActive3 = link.isExactActive) == null ? void 0 : _link$isExactActive3.value;
    }, val => {
      if (val && parent.value != null) {
        root.open(parent.value, true);
      }
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
    } = useRounded(props);
    const slotProps = computed(() => ({
      isActive: isActive.value,
      select,
      isSelected: isSelected.value
    }));
    useRender(() => {
      var _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasTitle = slots.title || props.title;
      const hasSubtitle = slots.subtitle || props.subtitle;
      const hasHeader = !!(hasTitle || hasSubtitle);
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const isClickable = !props.disabled && (link.isClickable.value || props.link || props.value != null);
      list == null ? void 0 : list.updateHasPrepend(hasPrepend);
      return withDirectives(createVNode(Tag, {
        "class": ['v-list-item', {
          'v-list-item--active': isActive.value,
          'v-list-item--disabled': props.disabled,
          'v-list-item--link': isClickable,
          'v-list-item--prepend': !hasPrepend && (list == null ? void 0 : list.hasPrepend.value),
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value],
        "href": link.href.value,
        "tabindex": isClickable ? 0 : undefined,
        "onClick": isClickable && (e => {
          var _link$navigate;

          (_link$navigate = link.navigate) == null ? void 0 : _link$navigate.call(link, e);
          select(!isSelected.value, e);
        })
      }, {
        default: () => [genOverlays(isClickable || isActive.value, 'v-list-item'), hasPrepend && (slots.prepend ? slots.prepend(slotProps.value) : createVNode(VListItemAvatar, {
          "left": true
        }, {
          default: () => [createVNode(VAvatar, {
            "density": props.density,
            "icon": props.prependIcon,
            "image": props.prependAvatar
          }, null)]
        })), hasHeader && createVNode(VListItemHeader, null, {
          default: () => [hasTitle && createVNode(VListItemTitle, null, {
            default: () => [slots.title ? slots.title({
              title: props.title
            }) : props.title]
          }), hasSubtitle && createVNode(VListItemSubtitle, null, {
            default: () => [slots.subtitle ? slots.subtitle({
              subtitle: props.subtitle
            }) : props.subtitle]
          })]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value), hasAppend && (slots.append ? slots.append(slotProps.value) : createVNode(VListItemAvatar, {
          "right": true
        }, {
          default: () => [createVNode(VAvatar, {
            "density": props.density,
            "icon": props.appendIcon,
            "image": props.appendAvatar
          }, null)]
        }))]
      }), [[resolveDirective("ripple"), isClickable]]);
    });
  }

});

const VListSubheader = defineComponent({
  name: 'VListSubheader',
  props: {
    color: String,
    inset: Boolean,
    sticky: Boolean,
    text: String,
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, 'color'));
    return () => {
      var _slots$default, _slots$default2;

      const hasText = !!(slots.default || props.text);
      return createVNode(props.tag, {
        "class": ['v-list-subheader', {
          'v-list-subheader--inset': props.inset,
          'v-list-subheader--sticky': props.sticky
        }, textColorClasses.value],
        "style": {
          textColorStyles
        }
      }, {
        default: () => [hasText && createVNode("div", {
          "class": "v-list-subheader__text"
        }, [(_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)) != null ? _slots$default : props.text])]
      });
    };
  }

});

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
      var _slots$default, _slots$default2, _props$items;

      return (_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)) != null ? _slots$default : (_props$items = props.items) == null ? void 0 : _props$items.map(_ref2 => {
        let {
          children,
          props: itemProps,
          type
        } = _ref2;
        if (type === 'divider') return createVNode(VDivider, itemProps, null);
        if (type === 'subheader') return createVNode(VListSubheader, itemProps, slots);
        return children ? createVNode(VListGroup, {
          "value": itemProps == null ? void 0 : itemProps.value
        }, {
          activator: _ref3 => {
            let {
              props: activatorProps
            } = _ref3;
            return slots.header ? slots.header({ ...itemProps,
              ...activatorProps
            }) : createVNode(VListItem, mergeProps(itemProps, activatorProps), null);
          },
          default: () => createVNode(VListChildren, {
            "items": children
          }, slots)
        }) : slots.item ? slots.item(itemProps) : createVNode(VListItem, itemProps, slots);
      });
    };
  }

});

const parseItems$1 = items => {
  if (!items) return undefined;
  return items.map(item => {
    if (typeof item === 'string') return {
      type: 'item',
      value: item,
      title: item
    };
    const {
      $type,
      $children,
      ...props
    } = item;
    if ($type === 'subheader') return {
      type: 'subheader',
      props
    };
    if ($type === 'divider') return {
      type: 'divider',
      props
    };
    return {
      type: 'item',
      props,
      children: parseItems$1($children)
    };
  });
};

const VList = genericComponent()({
  name: 'VList',
  props: {
    color: String,
    disabled: Boolean,
    lines: {
      type: String,
      default: 'one'
    },
    nav: Boolean,
    items: Array,
    ...makeNestedProps({
      selectStrategy: 'single-leaf',
      openStrategy: 'multiple'
    }),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
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
    const items = computed(() => parseItems$1(props.items));
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
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
    createList();
    useRender(() => {
      return createVNode(props.tag, {
        "class": ['v-list', {
          'v-list--disabled': props.disabled,
          'v-list--nav': props.nav,
          [`v-list--${props.lines}-line`]: true
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, dimensionStyles.value]
      }, {
        default: () => [createVNode(VListChildren, {
          "items": items.value
        }, {
          default: slots.default,
          item: slots.item,
          title: slots.title,
          subtitle: slots.subtitle,
          header: slots.header
        })]
      });
    });
    return {
      open,
      select
    };
  }

});

const VListImg = createSimpleFunctional('v-list-img');

const VListItemMedia = defineComponent({
  name: 'VListItemMedia',
  props: {
    left: Boolean,
    right: Boolean,
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      return createVNode(props.tag, {
        "class": ['v-list-item-media', {
          'v-list-item-media--start': props.left,
          'v-list-item-media--end': props.right
        }]
      }, slots);
    };
  }

});

// Utilities

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
      var _props$prop;

      const delay = parseInt((_props$prop = props[prop]) != null ? _props$prop : 0, 10);
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

// Utilities

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
  ...makeDelayProps()
});
function useActivator(props, isActive) {
  const activatorEl = ref();
  let isHovered = false;
  let isFocused = false;
  const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
  const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
  const {
    runOpenDelay,
    runCloseDelay
  } = useDelay(props, value => {
    if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused)) {
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
  const activatorEvents = computed(() => {
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
  const activatorRef = ref();
  watchEffect(() => {
    if (!activatorRef.value) return;
    nextTick(() => {
      const activator = activatorRef.value;
      activatorEl.value = isComponentInstance(activator) ? activator.$el : activator;
    });
  });
  let scope;
  watch(() => !!props.activator, val => {
    if (val && IN_BROWSER) {
      scope = effectScope();
      scope.run(() => {
        _useActivator(props, {
          activatorEl,
          activatorRef,
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
  return {
    activatorEl,
    activatorRef,
    activatorEvents
  };
}

function _useActivator(props, _ref) {
  let {
    activatorEl,
    activatorEvents
  } = _ref;
  watch(() => props.activator, (val, oldVal) => {
    if (oldVal && val !== oldVal) {
      const activator = getActivator(oldVal);
      activator && unbindActivatorProps(activator);
    }

    if (val) {
      nextTick(() => bindActivatorProps());
    }
  }, {
    immediate: true
  });
  watch(() => props.activatorProps, () => {
    bindActivatorProps();
  });
  onScopeDispose(() => {
    unbindActivatorProps();
  });

  function bindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getActivator();

    let _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : props.activatorProps;

    if (!el) return;
    Object.entries(activatorEvents.value).forEach(_ref2 => {
      let [name, cb] = _ref2;
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
    Object.entries(activatorEvents.value).forEach(_ref3 => {
      let [name, cb] = _ref3;
      el.removeEventListener(name, cb);
    });
    Object.keys(_props).forEach(k => {
      el.removeAttribute(k);
    });
  }

  const vm = getCurrentInstance('useActivator');

  function getActivator() {
    var _activator;

    let selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.activator;
    let activator;

    if (selector) {
      if (selector === 'parent') {
        var _vm$proxy, _vm$proxy$$el;

        activator = vm == null ? void 0 : (_vm$proxy = vm.proxy) == null ? void 0 : (_vm$proxy$$el = _vm$proxy.$el) == null ? void 0 : _vm$proxy$$el.parentNode;
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
    } // The activator should only be a valid element (Ignore comments and text nodes)


    activatorEl.value = ((_activator = activator) == null ? void 0 : _activator.nodeType) === Node.ELEMENT_NODE ? activator : null;
    return activatorEl.value;
  }
}

/** Parse a raw anchor string into an object */
function parseAnchor(anchor) {
  let [side, align] = anchor.split(' ');

  if (!align) {
    align = side === 'top' || side === 'bottom' ? 'start' : side === 'start' || side === 'end' ? 'top' : 'center';
  }

  return {
    side,
    align
  };
}
/** Get an anchor directly opposite, with the same alignment */

function oppositeAnchor(anchor) {
  return {
    side: {
      center: 'center',
      top: 'bottom',
      bottom: 'top',
      start: 'end',
      end: 'start'
    }[anchor.side],
    align: anchor.align
  };
}
/** Convert start/end into left/right */

function physicalAnchor(anchor, el) {
  var _map$side, _map$align;

  const {
    side,
    align
  } = anchor;
  const {
    direction
  } = window.getComputedStyle(el);
  const map = direction === 'ltr' ? {
    start: 'left',
    end: 'right'
  } : {
    start: 'right',
    end: 'left'
  };
  return ((_map$side = map[side]) != null ? _map$side : side) + ' ' + ((_map$align = map[align]) != null ? _map$align : align);
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
    const x = align === 'start' ? 0 : align === 'center' ? box.width / 2 : align === 'end' ? box.width : align;
    const y = side === 'top' ? 0 : side === 'bottom' ? box.height : side;
    return elementToViewport({
      x,
      y
    }, box);
  } else if (anchor.side === 'start' || anchor.side === 'end') {
    const {
      side,
      align
    } = anchor;
    const x = side === 'start' ? 0 : side === 'end' ? box.width : side;
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
const positionStrategies = {
  static: staticPositionStrategy,
  // specific viewport position, usually centered
  connected: connectedPositionStrategy // connected to a certain element

};
const makePositionStrategyProps = propsFactory({
  positionStrategy: {
    type: [String, Function],
    default: 'static',
    validator: val => typeof val === 'function' || val in positionStrategies
  },
  anchor: {
    type: String,
    default: 'bottom'
  },
  origin: {
    type: String,
    default: 'auto'
  },
  offset: [Number, String]
});
function usePositionStrategies(props, data) {
  const contentStyles = ref({});
  const updatePosition = ref();
  let scope;
  watchEffect(async () => {
    var _scope;

    (_scope = scope) == null ? void 0 : _scope.stop();
    updatePosition.value = undefined;
    if (!(IN_BROWSER && data.isActive.value && props.positionStrategy)) return;
    scope = effectScope();
    await nextTick();
    scope.run(() => {
      if (typeof props.positionStrategy === 'function') {
        var _props$positionStrate;

        updatePosition.value = (_props$positionStrate = props.positionStrategy(data, props, contentStyles)) == null ? void 0 : _props$positionStrate.updatePosition;
      } else {
        var _positionStrategies$p;

        updatePosition.value = (_positionStrategies$p = positionStrategies[props.positionStrategy](data, props, contentStyles)) == null ? void 0 : _positionStrategies$p.updatePosition;
      }
    });
  });
  IN_BROWSER && window.addEventListener('resize', onResize, {
    passive: true
  });
  onScopeDispose(() => {
    var _scope2;

    IN_BROWSER && window.removeEventListener('resize', onResize);
    updatePosition.value = undefined;
    (_scope2 = scope) == null ? void 0 : _scope2.stop();
  });

  function onResize(e) {
    var _updatePosition$value;

    (_updatePosition$value = updatePosition.value) == null ? void 0 : _updatePosition$value.call(updatePosition, e);
  }

  return {
    contentStyles,
    updatePosition
  };
}

function staticPositionStrategy() {// TODO
}

function connectedPositionStrategy(data, props, contentStyles) {
  const activatorFixed = isFixedPosition(data.activatorEl.value);

  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: 'fixed'
    });
  }

  const preferredAnchor = computed(() => parseAnchor(props.anchor));
  const preferredOrigin = computed(() => props.origin === 'overlap' ? preferredAnchor.value : props.origin === 'auto' ? oppositeAnchor(preferredAnchor.value) : parseAnchor(props.origin));
  const doesOverlap = computed(() => {
    return preferredAnchor.value.side === preferredOrigin.value.side;
  });
  const configuredMaxHeight = computed(() => {
    const val = parseFloat(props.maxHeight);
    return isNaN(val) ? Infinity : val;
  });
  const configuredMinWidth = computed(() => {
    const val = parseFloat(props.minWidth);
    return isNaN(val) ? Infinity : val;
  });
  let observe = false;

  if (IN_BROWSER) {
    const observer = new ResizeObserver(() => {
      if (observe) updatePosition();
    });
    observer.observe(data.activatorEl.value);
    observer.observe(data.contentEl.value);
    onScopeDispose(() => {
      observer.disconnect();
    });
  } // eslint-disable-next-line max-statements


  function updatePosition() {
    observe = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => observe = true);
    });
    const targetBox = data.activatorEl.value.getBoundingClientRect(); // TODO: offset shouldn't affect width

    if (props.offset) {
      targetBox.x -= +props.offset;
      targetBox.y -= +props.offset;
      targetBox.width += +props.offset * 2;
      targetBox.height += +props.offset * 2;
    }

    const scrollParent = getScrollParent(data.contentEl.value);
    const viewportWidth = scrollParent.clientWidth;
    const viewportHeight = Math.min(scrollParent.clientHeight, window.innerHeight);
    let contentBox;
    {
      const scrollables = new Map();
      data.contentEl.value.querySelectorAll('*').forEach(el => {
        const x = el.scrollLeft;
        const y = el.scrollTop;

        if (x || y) {
          scrollables.set(el, [x, y]);
        }
      });
      const initialMaxWidth = data.contentEl.value.style.maxWidth;
      const initialMaxHeight = data.contentEl.value.style.maxHeight;
      data.contentEl.value.style.removeProperty('max-width');
      data.contentEl.value.style.removeProperty('max-height');
      contentBox = nullifyTransforms(data.contentEl.value);
      contentBox.x -= parseFloat(data.contentEl.value.style.left) || 0;
      contentBox.y -= parseFloat(data.contentEl.value.style.top) || 0;
      data.contentEl.value.style.maxWidth = initialMaxWidth;
      data.contentEl.value.style.maxHeight = initialMaxHeight;
      scrollables.forEach((position, el) => {
        el.scrollTo(...position);
      });
    }
    const contentHeight = Math.min(configuredMaxHeight.value, contentBox.height);
    const viewportMargin = 12;
    const freeSpace = {
      top: targetBox.top - viewportMargin,
      bottom: viewportHeight - targetBox.bottom - viewportMargin,
      left: targetBox.left - viewportMargin,
      right: viewportWidth - targetBox.right - viewportMargin
    };
    const fitsY = preferredAnchor.value.side === 'bottom' && contentHeight <= freeSpace.bottom || preferredAnchor.value.side === 'top' && contentHeight <= freeSpace.top;
    const anchor = fitsY ? preferredAnchor.value : preferredAnchor.value.side === 'bottom' && freeSpace.top > freeSpace.bottom || preferredAnchor.value.side === 'top' && freeSpace.bottom > freeSpace.top ? oppositeAnchor(preferredAnchor.value) : preferredAnchor.value;
    const origin = fitsY ? preferredOrigin.value : oppositeAnchor(anchor);
    const canFill = doesOverlap.value || ['center', 'top', 'bottom'].includes(anchor.side);
    const maxWidth = canFill ? Math.min(viewportWidth, Math.max(targetBox.width, viewportWidth - viewportMargin * 2)) : anchor.side === 'end' ? freeSpace.right : anchor.side === 'start' ? freeSpace.left : null;
    const minWidth = Math.min(configuredMinWidth.value, maxWidth, targetBox.width);
    const maxHeight = fitsY ? configuredMaxHeight.value : Math.min(configuredMaxHeight.value, Math.floor(anchor.side === 'top' ? freeSpace.top : freeSpace.bottom));
    const targetPoint = anchorToPoint(anchor, targetBox);
    const contentPoint = anchorToPoint(origin, new Box({ ...contentBox,
      height: Math.min(contentHeight, maxHeight)
    }));
    const {
      x,
      y
    } = getOffset$1(targetPoint, contentPoint);
    Object.assign(contentStyles.value, {
      '--v-overlay-anchor-origin': physicalAnchor(anchor, data.activatorEl.value),
      top: convertToUnit(Math.round(y)),
      left: convertToUnit(Math.round(x)),
      // TODO: right for origin="end", rtl
      transformOrigin: physicalAnchor(origin, data.activatorEl.value),
      minWidth: convertToUnit(minWidth),
      maxWidth: convertToUnit(maxWidth),
      maxHeight: convertToUnit(maxHeight)
    });
  }

  watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset], () => updatePosition(), {
    immediate: !activatorFixed
  });
  if (activatorFixed) nextTick(() => updatePosition());
  requestAnimationFrame(() => {
    if (contentStyles.value.maxHeight) updatePosition();
  });
  return {
    updatePosition
  };
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

const scrollStrategies = {
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
});
function useScrollStrategies(props, data) {
  if (!IN_BROWSER) return;
  let scope;
  watchEffect(async () => {
    var _scope;

    (_scope = scope) == null ? void 0 : _scope.stop();
    if (!(data.isActive.value && props.scrollStrategy)) return;
    scope = effectScope();
    await nextTick();
    scope.run(() => {
      if (typeof props.scrollStrategy === 'function') {
        props.scrollStrategy(data);
      } else {
        var _scrollStrategies$pro;

        (_scrollStrategies$pro = scrollStrategies[props.scrollStrategy]) == null ? void 0 : _scrollStrategies$pro.call(scrollStrategies, data);
      }
    });
  });
}

function closeScrollStrategy(data) {
  var _data$activatorEl$val;

  function onScroll(e) {
    data.isActive.value = false;
  }

  bindScroll((_data$activatorEl$val = data.activatorEl.value) != null ? _data$activatorEl$val : data.contentEl.value, onScroll);
}

function blockScrollStrategy(data) {
  var _data$root$value;

  const scrollElements = [...new Set([...getScrollParents(data.activatorEl.value), ...getScrollParents(data.contentEl.value)])].filter(el => !el.classList.contains('v-overlay-scroll-blocked'));
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;

  const scrollableParent = (el => hasScrollbar(el) && el)(((_data$root$value = data.root.value) == null ? void 0 : _data$root$value.offsetParent) || document.documentElement);

  if (scrollableParent) {
    data.root.value.classList.add('v-overlay--scroll-blocked');
  }

  scrollElements.forEach((el, i) => {
    el.style.setProperty('--v-scrollbar-offset', convertToUnit(scrollbarWidth));
    el.classList.add('v-overlay-scroll-blocked');
  });
  onScopeDispose(() => {
    scrollElements.forEach((el, i) => {
      el.style.removeProperty('--v-scrollbar-offset');
      el.classList.remove('v-overlay-scroll-blocked');
    });

    if (scrollableParent) {
      data.root.value.classList.remove('v-overlay--scroll-blocked');
    }
  });
}

function repositionScrollStrategy(data) {
  var _data$activatorEl$val2;

  let slow = false;
  let raf = -1;

  function update(e) {
    requestNewFrame(() => {
      var _data$updatePosition$, _data$updatePosition;

      const start = performance.now();
      (_data$updatePosition$ = (_data$updatePosition = data.updatePosition).value) == null ? void 0 : _data$updatePosition$.call(_data$updatePosition, e);
      const time = performance.now() - start;
      slow = time / (1000 / 60) > 2;
    });
  }

  bindScroll((_data$activatorEl$val2 = data.activatorEl.value) != null ? _data$activatorEl$val2 : data.contentEl.value, e => {
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
  onScopeDispose(() => {
    scrollElements.forEach(el => {
      el.removeEventListener('scroll', onScroll);
    });
  });
}

// Utilities

function useTeleport(target) {
  const teleportTarget = computed(() => {
    const _target = target.value;
    if (_target === true || !IN_BROWSER) return undefined;
    const targetElement = _target === false ? document.body : typeof _target === 'string' ? document.querySelector(_target) : _target;

    if (targetElement == null) {
      warn(`Unable to locate target ${_target}`);
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

// Utilities
const makeLazyProps = propsFactory({
  eager: Boolean
}, 'lazy');
function useLazy(props, active) {
  const isBooted = ref(false);
  const hasContent = computed(() => isBooted.value || props.eager || active.value);
  watch(active, () => isBooted.value = true);

  function onAfterLeave() {
    if (!props.eager) isBooted.value = false;
  }

  return {
    isBooted,
    hasContent,
    onAfterLeave
  };
}

const stack = ref([]);
function useStack(isActive) {
  const vm = getCurrentInstance('useStack');
  let scope;
  watch(isActive, val => {
    if (val) {
      scope = effectScope();
      scope.run(() => {
        stack.value.push(vm);
        onScopeDispose(() => {
          const idx = stack.value.indexOf(vm);
          stack.value.splice(idx, 1);
        });
      });
    } else {
      var _scope;

      (_scope = scope) == null ? void 0 : _scope.stop();
    }
  }, {
    immediate: true
  });
  const isTop = computed(() => {
    return toRaw(stack.value[stack.value.length - 1]) === vm;
  });
  return {
    isTop
  };
}

// Utilities

const VuetifyOverlayKey = Symbol.for('vuetify:overlay');
const ROOT_ZINDEX = 2000;
function useOverlay(isActive) {
  const {
    zIndex,
    overlays
  } = inject(VuetifyOverlayKey, {
    zIndex: ref(ROOT_ZINDEX),
    overlays: ref([])
  });
  const id = getUid();
  watch(isActive, value => {
    if (value) {
      overlays.value.push(id);
    } else {
      overlays.value = overlays.value.filter(x => x !== id);
    }
  }, {
    immediate: true
  });
  const overlayZIndex = computed(() => zIndex.value + overlays.value.indexOf(id) + 1);
  return {
    overlayZIndex
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
  if (!e || checkIsActive(e, binding) === false) return false; // If we're clicking inside the shadowroot, then the app root doesn't get the same
  // level of introspection as to _what_ we're clicking. We want to check to see if
  // our target is the shadowroot parent container, and if it is, ignore.

  const root = attachedRoot(el);
  if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot && root.host === e.target) return false; // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)

  const elements = (typeof binding.value === 'object' && binding.value.include || (() => []))(); // Add the root element for the component this directive was defined on


  elements.push(el); // Check if it's a click outside our elements, and then if our callback returns true.
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

function Scrim(props) {
  const {
    modelValue,
    color,
    ...rest
  } = props;
  return createVNode(Transition, {
    "name": "fade-transition",
    "appear": true
  }, {
    default: () => [props.modelValue && createVNode("div", mergeProps({
      "class": ['v-overlay__scrim', props.color.backgroundColorClasses.value],
      "style": props.color.backgroundColorStyles.value
    }, rest), null)]
  });
}

const VOverlay = genericComponent()({
  name: 'VOverlay',
  directives: {
    ClickOutside
  },
  inheritAttrs: false,
  props: {
    absolute: Boolean,
    attach: [Boolean, String, Object],
    contained: Boolean,
    contentClass: null,
    noClickAnimation: Boolean,
    modelValue: Boolean,
    persistent: Boolean,
    scrim: {
      type: [String, Boolean],
      default: true
    },
    ...makeActivatorProps(),
    ...makeDimensionProps(),
    ...makePositionStrategyProps(),
    ...makeScrollStrategyProps(),
    ...makeThemeProps(),
    ...makeTransitionProps(),
    ...makeLazyProps()
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
    const isActive = useProxiedModel(props, 'modelValue');
    const {
      teleportTarget
    } = useTeleport(computed(() => props.attach || props.contained));
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, isActive);
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null;
    }));
    const {
      activatorEl,
      activatorRef,
      activatorEvents
    } = useActivator(props, isActive);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      isTop
    } = useStack(isActive);
    const root = ref();
    const contentEl = ref();
    const {
      contentStyles,
      updatePosition
    } = usePositionStrategies(props, {
      contentEl,
      activatorEl,
      isActive
    });
    useScrollStrategies(props, {
      root,
      contentEl,
      activatorEl,
      isActive,
      updatePosition
    });

    function onClickOutside(e) {
      emit('click:outside', e);
      if (!props.persistent) isActive.value = false;else animateClick();
    }

    function closeConditional() {
      return isActive.value && isTop.value;
    }

    IN_BROWSER && watch(isActive, val => {
      if (val) {
        window.addEventListener('keydown', onKeydown);
      } else {
        window.removeEventListener('keydown', onKeydown);
      }
    }, {
      immediate: true
    });

    function onKeydown(e) {
      if (e.key === 'Escape' && isTop.value) {
        if (!props.persistent) {
          isActive.value = false;
        } else animateClick();
      }
    }

    useBackButton(next => {
      if (isTop.value && isActive.value) {
        next(false);
        if (!props.persistent) isActive.value = false;else animateClick();
      } else {
        next();
      }
    });
    const top = ref();
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, val => {
      if (val) {
        const scrollParent = getScrollParent(root.value);

        if (scrollParent && scrollParent !== document.scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    }); // Add a quick "bounce" animation to the content

    function animateClick() {
      var _contentEl$value;

      if (props.noClickAnimation) return;
      (_contentEl$value = contentEl.value) == null ? void 0 : _contentEl$value.animate([{
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

    const {
      overlayZIndex
    } = useOverlay(isActive);
    useRender(() => {
      var _slots$activator, _slots$default;

      return createVNode(Fragment, null, [(_slots$activator = slots.activator) == null ? void 0 : _slots$activator.call(slots, {
        isActive: isActive.value,
        props: mergeProps({
          ref: activatorRef
        }, toHandlers(activatorEvents.value), props.activatorProps)
      }), IN_BROWSER && createVNode(Teleport, {
        "disabled": !teleportTarget.value,
        "to": teleportTarget.value
      }, {
        default: () => [hasContent.value && createVNode("div", mergeProps({
          "class": ['v-overlay', {
            'v-overlay--absolute': props.absolute || props.contained,
            'v-overlay--active': isActive.value,
            'v-overlay--contained': props.contained
          }, themeClasses.value, rtlClasses.value],
          "style": {
            top: convertToUnit(top.value),
            zIndex: overlayZIndex.value
          },
          "ref": root
        }, attrs), [createVNode(Scrim, {
          "color": scrimColor,
          "modelValue": isActive.value && !!props.scrim
        }, null), createVNode(MaybeTransition, {
          "appear": true,
          "persisted": true,
          "transition": props.transition,
          "target": activatorEl.value,
          "onAfterLeave": () => {
            onAfterLeave();
            emit('afterLeave');
          }
        }, {
          default: () => [withDirectives(createVNode("div", {
            "ref": contentEl,
            "class": ['v-overlay__content', props.contentClass],
            "style": [dimensionStyles.value, contentStyles.value]
          }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isActive
          })]), [[vShow, isActive.value], [resolveDirective("click-outside"), {
            handler: onClickOutside,
            closeConditional,
            include: () => [activatorEl.value]
          }]])]
        })])]
      })]);
    });
    return {
      animateClick,
      contentEl,
      activatorEl
    };
  }

});

const VMenu = genericComponent()({
  name: 'VMenu',
  inheritAttrs: false,
  props: {
    // TODO
    // closeOnClick: {
    //   type: Boolean,
    //   default: true,
    // },
    // closeOnContentClick: {
    //   type: Boolean,
    //   default: true,
    // },
    disableKeys: Boolean,
    modelValue: Boolean,
    id: String,
    ...makeTransitionProps({
      transition: {
        component: VDialogTransition
      }
    })
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    const uid = getUid();
    const id = computed(() => props.id || `v-menu-${uid}`);
    return () => {
      return createVNode(VOverlay, mergeProps({
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "class": ['v-menu'],
        "transition": props.transition,
        "absolute": true,
        "positionStrategy": "connected",
        "scrollStrategy": "reposition",
        "scrim": false,
        "activatorProps": {
          'aria-haspopup': 'menu',
          'aria-expanded': String(isActive.value),
          'aria-owns': id.value
        }
      }, attrs), {
        default: slots.default,
        activator: slots.activator
      });
    };
  }

});

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
    const messages = computed(() => wrapInArray(props.messages));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed(() => props.color));
    return () => createVNode(MaybeTransition, {
      "transition": props.transition,
      "tag": "div",
      "class": ['v-messages', textColorClasses.value],
      "style": textColorStyles.value
    }, {
      default: () => [props.active && messages.value.map((message, i) => createVNode("div", {
        "class": "v-messages__message",
        "key": `${i}-${messages.value}`
      }, [slots.message ? slots.message({
        message
      }) : message]))]
    });
  }

});

// Utilities

const FormKey = Symbol.for('vuetify:form');
const makeFormProps = propsFactory({
  disabled: Boolean,
  fastFail: Boolean,
  lazyValidation: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  }
});
function createForm(props) {
  const model = useProxiedModel(props, 'modelValue');
  const isDisabled = computed(() => props.disabled);
  const isReadonly = computed(() => props.readonly);
  const isValidating = ref(false);
  const items = ref([]);
  const errorMessages = ref([]);

  async function validate() {
    const results = [];
    let valid = true;
    errorMessages.value = [];
    model.value = null;
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

    errorMessages.value = results;
    model.value = valid;
    isValidating.value = false;
    return {
      valid,
      errorMessages: errorMessages.value
    };
  }

  function reset() {
    items.value.forEach(item => item.reset());
    model.value = null;
  }

  function resetValidation() {
    items.value.forEach(item => item.resetValidation());
    errorMessages.value = [];
    model.value = null;
  }

  provide(FormKey, {
    register: (id, validate, reset, resetValidation) => {
      if (items.value.some(item => item.id === id)) {
        consoleWarn(`Duplicate input name "${id}"`);
      }

      items.value.push({
        id,
        validate,
        reset,
        resetValidation
      });
    },
    unregister: id => {
      items.value = items.value.filter(item => {
        return item.id !== id;
      });
    },
    isDisabled,
    isReadonly,
    isValidating,
    items
  });
  return {
    errorMessages,
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
  return inject(FormKey, null);
}

// Composables

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
  readonly: Boolean,
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null
});
function useValidation(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const model = useProxiedModel(props, 'modelValue');
  const form = useForm();
  const internalErrorMessages = ref([]);
  const isPristine = ref(true);
  const isDirty = computed(() => wrapInArray(model.value || []).length > 0);
  const isDisabled = computed(() => !!(props.disabled || form != null && form.isDisabled.value));
  const isReadonly = computed(() => !!(props.readonly || form != null && form.isReadonly.value));
  const errorMessages = computed(() => {
    return props.errorMessages.length ? wrapInArray(props.errorMessages) : internalErrorMessages.value;
  });
  const isValid = computed(() => {
    if (props.error || errorMessages.value.length) return false;
    return isPristine.value ? null : true;
  });
  const isValidating = ref(false);
  const validationClasses = computed(() => {
    return {
      [`${name}--error`]: isValid.value === false,
      [`${name}--dirty`]: isDirty.value,
      [`${name}--disabled`]: isDisabled.value,
      [`${name}--readonly`]: isReadonly.value
    };
  });
  const uid = computed(() => {
    var _props$name;

    return (_props$name = props.name) != null ? _props$name : getUid();
  });
  onBeforeMount(() => {
    form == null ? void 0 : form.register(uid.value, validate, reset, resetValidation);
  });
  onBeforeUnmount(() => {
    form == null ? void 0 : form.unregister(uid.value);
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
      if (results.length >= (props.maxErrors || 1)) {
        break;
      }

      const handler = typeof rule === 'function' ? rule : () => rule;
      const result = await handler(model.value);
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
  appendIcon: String,
  prependIcon: String,
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
  ...makeDensityProps(),
  ...makeValidationProps()
});
const VInput = genericComponent()({
  name: 'VInput',
  props: { ...makeVInputProps()
  },
  emits: {
    'click:prepend': e => true,
    'click:append': e => true,
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const {
      densityClasses
    } = useDensity(props);
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
    } = useValidation(props);
    const uid = getUid();
    const id = computed(() => props.id || `input-${uid}`);
    const slotProps = computed(() => ({
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
      const hasDetails = !props.hideDetails || props.hideDetails === 'auto' && hasMessages;
      return createVNode("div", {
        "class": ['v-input', `v-input--${props.direction}`, densityClasses.value, validationClasses.value]
      }, [hasPrepend && createVNode("div", {
        "class": "v-input__prepend"
      }, [slots == null ? void 0 : (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps.value), props.prependIcon && createVNode(VIcon, {
        "onClick": e => emit('click:prepend', e),
        "icon": props.prependIcon
      }, null)]), slots.default && createVNode("div", {
        "class": "v-input__control"
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value)]), hasAppend && createVNode("div", {
        "class": "v-input__append"
      }, [slots == null ? void 0 : (_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, slotProps.value), props.appendIcon && createVNode(VIcon, {
        "onClick": e => emit('click:append', e),
        "icon": props.appendIcon
      }, null)]), hasDetails && createVNode("div", {
        "class": "v-input__details"
      }, [createVNode(VMessages, {
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
  return pick(props, Object.keys(VInput.props));
}

const VLabel = defineComponent({
  name: 'VLabel',
  props: {
    text: String,
    ...makeThemeProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      var _slots$default;

      return createVNode("label", {
        "class": "v-label"
      }, [props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    };
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
    return () => {
      return createVNode(VLabel, {
        "class": ['v-field-label', {
          'v-field-label--floating': props.floating
        }],
        "aria-hidden": props.floating || undefined
      }, slots);
    };
  }

});

// Utilities
function useIntersectionObserver(callback) {
  const intersectionRef = ref();
  const isIntersecting = ref(false);

  if (SUPPORTS_INTERSECTION) {
    const observer = new IntersectionObserver(entries => {
      callback == null ? void 0 : callback(entries, observer);
      isIntersecting.value = !!entries.find(entry => entry.isIntersecting);
    });
    onBeforeUnmount(() => {
      observer.disconnect();
    });
    watch(intersectionRef, (newValue, oldValue) => {
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
    } = useBackgroundColor(computed(() => props.bgColor || props.color));
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
    const max = computed(() => parseInt(props.max, 10));
    const height = computed(() => parseInt(props.height, 10));
    const normalizedBuffer = computed(() => parseFloat(props.bufferValue) / max.value * 100);
    const normalizedValue = computed(() => parseFloat(progress.value) / max.value * 100);
    const isReversed = computed(() => isRtl.value !== props.reverse);
    const transition = computed(() => props.indeterminate ? 'fade-transition' : 'slide-x-transition');
    const opacity = computed(() => {
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

    return () => createVNode(props.tag, {
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
      "aria-valuemin": "0",
      "aria-valuemax": props.max,
      "aria-valuenow": props.indeterminate ? undefined : normalizedValue.value,
      "onClick": props.clickable && handleClick
    }, {
      default: () => [props.stream && createVNode("div", {
        "class": ['v-progress-linear__stream', textColorClasses.value],
        "style": { ...textColorStyles.value,
          [isReversed.value ? 'left' : 'right']: convertToUnit(-height.value),
          borderTop: `${convertToUnit(height.value / 2)} dotted`,
          opacity: opacity.value,
          top: `calc(50% - ${convertToUnit(height.value / 4)})`,
          width: convertToUnit(100 - normalizedBuffer.value, '%'),
          '--v-progress-linear-stream-to': convertToUnit(height.value * (isReversed.value ? 1 : -1))
        }
      }, null), createVNode("div", {
        "class": ['v-progress-linear__background', backgroundColorClasses.value],
        "style": [backgroundColorStyles.value, {
          opacity: opacity.value,
          width: convertToUnit(!props.stream ? 100 : normalizedBuffer.value, '%')
        }]
      }, null), createVNode(Transition, {
        "name": transition.value
      }, {
        default: () => [!props.indeterminate ? createVNode("div", {
          "class": ['v-progress-linear__determinate', barColorClasses.value],
          "style": [barColorStyles.value, {
            width: convertToUnit(normalizedValue.value, '%')
          }]
        }, null) : createVNode("div", {
          "class": "v-progress-linear__indeterminate"
        }, [['long', 'short'].map(bar => createVNode("div", {
          "key": bar,
          "class": ['v-progress-linear__indeterminate', bar, barColorClasses.value],
          "style": barColorStyles.value
        }, null))])]
      }), slots.default && createVNode("div", {
        "class": "v-progress-linear__content"
      }, [slots.default({
        value: normalizedValue.value,
        buffer: normalizedBuffer.value
      })])]
    });
  }

});

// Composables
const makeLoaderProps = propsFactory({
  loading: Boolean
}, 'loader');
function useLoader(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const loaderClasses = computed(() => ({
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
  return createVNode("div", {
    "class": `${props.name}__loader`
  }, [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
    color: props.color,
    isActive: props.active
  })) || createVNode(VProgressLinear, {
    "active": props.active,
    "color": props.color,
    "height": "2",
    "indeterminate": true
  }, null)]);
}

// Components

// Composables
const makeFocusProps = propsFactory({
  focused: Boolean
}, 'focus');
function useFocus(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const isFocused = useProxiedModel(props, 'focused');
  const focusClasses = computed(() => {
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

const allowedVariants$1 = ['underlined', 'outlined', 'filled', 'contained', 'plain'];
const makeVFieldProps = propsFactory({
  appendInnerIcon: String,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: String,
    default: '$clear'
  },
  active: Boolean,
  color: String,
  dirty: Boolean,
  disabled: Boolean,
  error: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: String,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: 'filled',
    validator: v => allowedVariants$1.includes(v)
  },
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
    'click:clear': e => true,
    'click:prepend-inner': e => true,
    'click:append-inner': e => true,
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
    const isActive = computed(() => props.dirty || props.active);
    const hasLabel = computed(() => !props.singleLine && !!(props.label || slots.label));
    const uid = getUid();
    const id = computed(() => props.id || `input-${uid}`);
    const labelRef = ref();
    const floatingLabelRef = ref();
    const controlRef = ref();
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'bgColor'));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed(() => {
      return isActive.value && isFocused.value && !props.error && !props.disabled ? props.color : undefined;
    }));
    watch(isActive, val => {
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
        const duration = parseFloat(getComputedStyle(el).transitionDuration) * 1000;
        const scale = parseFloat(getComputedStyle(targetEl).getPropertyValue('--v-field-label-scale'));
        el.style.visibility = 'visible';
        targetEl.style.visibility = 'hidden';
        el.animate([{
          transform: 'translate(0)'
        }, {
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          ...width
        }], {
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
    const slotProps = computed(() => ({
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
      const hasPrepend = slots.prependInner || props.prependInnerIcon;
      const hasClear = !!(props.clearable || slots.clear);
      const hasAppend = !!(slots.appendInner || props.appendInnerIcon || hasClear);
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return createVNode("div", mergeProps({
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
          [`v-field--variant-${props.variant}`]: true
        }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value],
        "style": [backgroundColorStyles.value, textColorStyles.value],
        "onClick": onClick
      }, attrs), [createVNode("div", {
        "class": "v-field__overlay"
      }, null), createVNode(LoaderSlot, {
        "name": "v-field",
        "active": props.loading,
        "color": props.error ? 'error' : props.color
      }, {
        default: slots.loader
      }), hasPrepend && createVNode("div", {
        "class": "v-field__prepend-inner"
      }, [props.prependInnerIcon && createVNode(VIcon, {
        "onClick": e => emit('click:prepend-inner', e),
        "icon": props.prependInnerIcon
      }, null), slots == null ? void 0 : (_slots$prependInner = slots.prependInner) == null ? void 0 : _slots$prependInner.call(slots, slotProps.value)]), createVNode("div", {
        "class": "v-field__field"
      }, [['contained', 'filled'].includes(props.variant) && hasLabel.value && createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "class": [textColorClasses.value],
        "floating": true
      }, {
        default: () => [label]
      }), createVNode(VFieldLabel, {
        "ref": labelRef,
        "for": id.value
      }, {
        default: () => [label]
      }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, { ...slotProps.value,
        props: {
          id: id.value,
          class: 'v-field__input'
        },
        focus,
        blur
      })]), hasClear && createVNode(VExpandXTransition, null, {
        default: () => [withDirectives(createVNode("div", {
          "class": "v-field__clearable"
        }, [slots.clear ? slots.clear() : createVNode(VIcon, {
          "onClick": e => emit('click:clear', e),
          "icon": props.clearIcon
        }, null)]), [[vShow, props.dirty]])]
      }), hasAppend && createVNode("div", {
        "class": "v-field__append-inner"
      }, [slots == null ? void 0 : (_slots$appendInner = slots.appendInner) == null ? void 0 : _slots$appendInner.call(slots, slotProps.value), props.appendInnerIcon && createVNode(VIcon, {
        "onClick": e => emit('click:append-inner', e),
        "icon": props.appendInnerIcon
      }, null)]), createVNode("div", {
        "class": ['v-field__outline', textColorClasses.value]
      }, [isOutlined && createVNode(Fragment, null, [createVNode("div", {
        "class": "v-field__outline__start"
      }, null), hasLabel.value && createVNode("div", {
        "class": "v-field__outline__notch"
      }, [createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true
      }, {
        default: () => [label]
      })]), createVNode("div", {
        "class": "v-field__outline__end"
      }, null)]), ['plain', 'underlined'].includes(props.variant) && hasLabel.value && createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true
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
  return pick(attrs, Object.keys(VField.props));
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
    const counter = computed(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value);
    });
    return () => {
      return createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": "v-counter"
        }, [slots.default ? slots.default({
          counter: counter.value,
          max: props.max,
          value: props.value
        }) : counter.value]), [[vShow, props.active]])]
      });
    };
  }

});

const activeTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'];
const VTextField = genericComponent()({
  name: 'VTextField',
  directives: {
    Intersect
  },
  inheritAttrs: false,
  props: {
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
  },
  emits: {
    'click:append': e => true,
    'click:append-inner': e => true,
    'click:clear': e => true,
    'click:control': e => true,
    'click:input': e => true,
    'click:prepend': e => true,
    'click:prepend-inner': e => true,
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const counterValue = computed(() => {
      var _model$value;

      return typeof props.counterValue === 'function' ? props.counterValue(model.value) : ((_model$value = model.value) != null ? _model$value : '').toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== 'number' && typeof props.counter !== 'string') return undefined;
      return props.counter;
    });

    function onIntersect(isIntersecting, entries) {
      var _entries$0$target, _entries$0$target$foc;

      if (!props.autofocus || !isIntersecting) return;
      (_entries$0$target = entries[0].target) == null ? void 0 : (_entries$0$target$foc = _entries$0$target.focus) == null ? void 0 : _entries$0$target$foc.call(_entries$0$target);
    }

    const vInputRef = ref();
    const vFieldRef = ref();
    const isFocused = ref(false);
    const inputRef = ref();
    const isActive = computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value);
    const messages = computed(() => {
      return props.messages.length ? props.messages : isFocused.value || props.persistentHint ? props.hint : '';
    });

    function onFocus() {
      if (inputRef.value !== document.activeElement) {
        var _inputRef$value;

        (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.focus();
      }

      if (!isFocused.value) isFocused.value = true;
    }

    function onControlClick(e) {
      onFocus();
      emit('click:control', e);
    }

    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = '';
        emit('click:clear', e);
      });
    }

    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _,
        ...inputProps
      }] = filterInputProps(props);
      const [fieldProps] = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-text-field', {
          'v-text-field--persistent-placeholder': props.persistentPlaceholder,
          'v-text-field--prefixed': props.prefix,
          'v-text-field--suffixed': props.suffix,
          'v-text-field--flush-details': ['plain', 'underlined'].includes(props.variant)
        }],
        "onClick:prepend": e => emit('click:prepend', e),
        "onClick:append": e => emit('click:append', e)
      }, rootAttrs, inputProps, {
        "messages": messages.value
      }), { ...slots,
        default: _ref2 => {
          let {
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "onMousedown": e => {
              if (e.target === inputRef.value) return;
              e.preventDefault();
            },
            "onClick:control": onControlClick,
            "onClick:clear": onClear,
            "onClick:prependInner": e => emit('click:prepend-inner', e),
            "onClick:appendInner": e => emit('click:append-inner', e),
            "role": "textbox"
          }, fieldProps, {
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), { ...slots,
            default: _ref3 => {
              var _slots$default;

              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), createVNode("div", {
                "class": fieldClass,
                "onClick": e => emit('click:input', e)
              }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), withDirectives(createVNode("input", mergeProps({
                "ref": inputRef,
                "onUpdate:modelValue": $event => model.value = $event,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "size": 1,
                "type": props.type,
                "onFocus": onFocus,
                "onBlur": () => isFocused.value = false
              }, slotProps, inputAttrs), null), [[vModelDynamic, model.value], [resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]])]), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasCounter ? () => createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
          "active": props.persistentCounter || isFocused.value,
          "value": counterValue.value,
          "max": max.value
        }, slots.counter)]) : undefined
      });
    });
    return useForwardRef({}, vInputRef, vFieldRef, inputRef);
  }

});

const LocaleAdapterSymbol = Symbol.for('vuetify:locale-adapter');
const VuetifyLocaleSymbol = Symbol.for('vuetify:locale');
function provideLocale(props) {
  const adapter = inject(LocaleAdapterSymbol);
  if (!adapter) throw new Error('[Vuetify] Could not find injected locale adapter');
  return adapter.createScope(props);
}
function useLocale() {
  const adapter = inject(LocaleAdapterSymbol);
  if (!adapter) throw new Error('[Vuetify] Could not find injected locale adapter');
  return adapter.getScope();
}

function isLocaleAdapter(x) {
  return !!x && x.hasOwnProperty('getScope') && x.hasOwnProperty('createScope') && x.hasOwnProperty('createRoot');
}

function createLocaleAdapter(app, options) {
  const adapter = isLocaleAdapter(options) ? options : createDefaultLocaleAdapter(options);
  const rootInstance = adapter.createRoot(app);
  return {
    adapter,
    rootInstance
  };
}
const LANG_PREFIX = '$vuetify.';

const replace = (str, params) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    /* istanbul ignore next */
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

function createDefaultLocaleAdapter(options) {
  const createScope = options => {
    const current = ref(options.current);
    const fallback = ref(options.fallback);
    const messages = ref(options.messages);
    return {
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback)
    };
  };

  return {
    createRoot: app => {
      var _options$defaultLocal, _options$fallbackLoca, _options$messages;

      const rootScope = createScope({
        current: (_options$defaultLocal = options == null ? void 0 : options.defaultLocale) != null ? _options$defaultLocal : 'en',
        fallback: (_options$fallbackLoca = options == null ? void 0 : options.fallbackLocale) != null ? _options$fallbackLoca : 'en',
        messages: (_options$messages = options == null ? void 0 : options.messages) != null ? _options$messages : {
          en
        }
      });
      app.provide(VuetifyLocaleSymbol, rootScope);
      return rootScope;
    },
    getScope: () => {
      const currentScope = inject(VuetifyLocaleSymbol);
      if (!currentScope) throw new Error('[Vuetify] Could not find injected locale instance');
      return currentScope;
    },
    createScope: options => {
      const currentScope = inject(VuetifyLocaleSymbol);
      if (!currentScope) throw new Error('[Vuetify] Could not find injected locale instance');
      const newScope = createScope({
        current: computed(() => {
          var _options$locale;

          return (_options$locale = options == null ? void 0 : options.locale) != null ? _options$locale : currentScope.current.value;
        }),
        fallback: computed(() => {
          var _options$locale2;

          return (_options$locale2 = options == null ? void 0 : options.locale) != null ? _options$locale2 : currentScope.fallback.value;
        }),
        messages: computed(() => {
          var _options$messages2;

          return (_options$messages2 = options == null ? void 0 : options.messages) != null ? _options$messages2 : currentScope.messages.value;
        })
      });
      provide(VuetifyLocaleSymbol, newScope);
      return newScope;
    }
  };
}

function genItem(item) {
  var _ref;

  return {
    title: String((_ref = typeof item === 'object' ? item.title : item) != null ? _ref : ''),
    value: typeof item === 'object' ? item.value : item
  };
}
const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  menuIcon: {
    type: String,
    default: '$dropdown'
  },
  modelValue: {
    type: [Number, String, Array],
    default: () => []
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText'
  },
  openOnClear: Boolean
}, 'select');
const VSelect = genericComponent()({
  name: 'VSelect',
  props: { ...makeSelectProps(),
    ...makeTransitionProps({
      transition: 'scale-transition'
    })
  },
  emits: {
    'update:modelValue': val => true
  },

  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const activator = ref();
    const menu = ref(false);
    const items = computed(() => props.items.map(genItem));
    const model = useProxiedModel(props, 'modelValue', [], v => wrapInArray(v), v => props.multiple ? v : v[0]);
    const selections = computed(() => {
      const array = [];
      let index = 0;

      for (const unwrapped of model.value) {
        const item = genItem(unwrapped);
        const found = array.find(selection => selection.value === item.value);

        if (found == null) {
          array.push({ ...item,
            index
          });
          index++;
        }
      }

      return array;
    });
    const selected = computed(() => selections.value.map(selection => selection.value));

    function onClear(e) {
      model.value = [];

      if (props.openOnClear) {
        menu.value = true;
      }
    }

    function onClickControl() {
      if (props.hideNoData && !items.value.length) return;
      menu.value = true;
    }

    function onKeydown(e) {
      if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
        menu.value = true;
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false;
      }
    }

    function select(item) {
      if (props.multiple) {
        const index = selections.value.findIndex(selection => selection.value === item.value);

        if (index === -1) {
          model.value.push(item.value);
        } else {
          model.value = selected.value.filter(selection => selection !== item.value);
        }
      } else {
        model.value = [item.value];
        menu.value = false;
      }
    }

    watch(() => vTextFieldRef.value, val => {
      activator.value = val.$el.querySelector('.v-input__control');
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      return createVNode(VTextField, {
        "ref": vTextFieldRef,
        "class": ['v-select', {
          'v-select--active-menu': menu.value,
          'v-select--chips': !!props.chips,
          [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true
        }],
        "appendInnerIcon": props.menuIcon,
        "readonly": true,
        "onClick:clear": onClear,
        "onClick:input": onClickControl,
        "onClick:control": onClickControl,
        "onBlur": () => menu.value = false,
        "modelValue": model.value.join(', '),
        "onKeydown": onKeydown
      }, { ...slots,
        default: () => createVNode(Fragment, null, [activator.value && createVNode(VMenu, {
          "modelValue": menu.value,
          "onUpdate:modelValue": $event => menu.value = $event,
          "activator": activator.value,
          "contentClass": "v-select__content",
          "eager": props.eager,
          "openOnClick": false,
          "transition": props.transition
        }, {
          default: () => [createVNode(VList, {
            "selected": selected.value,
            "selectStrategy": props.multiple ? 'independent' : 'single-independent'
          }, {
            default: () => [!items.value.length && !props.hideNoData && createVNode(VListItem, {
              "title": t(props.noDataText)
            }, null), items.value.map(item => createVNode(VListItem, {
              "title": item.title,
              "value": item.value,
              "onMousedown": e => e.preventDefault(),
              "onClick": () => select(item)
            }, null))]
          })]
        }), selections.value.map((selection, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(selection);
          }

          const slotProps = {
            'onClick:close': onChipClose,
            modelValue: true
          };
          return createVNode("div", {
            "class": "v-select__selection"
          }, [hasChips && createVNode(VDefaultsProvider, {
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: 'small',
                text: selection.title
              }
            }
          }, {
            default: () => [slots.chip ? slots.chip({
              props: slotProps,
              selection
            }) : createVNode(VChip, slotProps, null)]
          }), !hasChips && (slots.selection ? slots.selection({
            selection
          }) : createVNode("span", {
            "class": "v-select__selection-text"
          }, [selection.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
            "class": "v-select__selection-comma"
          }, [createTextVNode(",")])]))]);
        })])
      });
    });
    return useForwardRef({}, vTextFieldRef);
  }

});

/* eslint-disable max-statements */

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
  var _options$default, _options$customKeyFil;

  const array = []; // always ensure we fall back to a functioning filter

  const filter = (_options$default = options == null ? void 0 : options.default) != null ? _options$default : defaultFilter;
  const keys = options != null && options.filterKeys ? wrapInArray(options.filterKeys) : false;
  const customFiltersLength = Object.keys((_options$customKeyFil = options == null ? void 0 : options.customKeyFilter) != null ? _options$customKeyFil : {}).length;
  if (!(items != null && items.length)) return array;

  loop: for (const item of items) {
    const customMatches = {};
    const defaultMatches = {};
    let match = -1;

    if (query && typeof item === 'object' && !(options != null && options.noFilter)) {
      const filterKeys = keys || Object.keys(item);

      for (const key of filterKeys) {
        var _options$customKeyFil2;

        const value = getPropertyFromItem(item, key, item);
        const keyFilter = options == null ? void 0 : (_options$customKeyFil2 = options.customKeyFilter) == null ? void 0 : _options$customKeyFil2[key];
        match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);

        if (match !== -1 && match !== false) {
          if (keyFilter) customMatches[key] = match;else defaultMatches[key] = match;
        } else if ((options == null ? void 0 : options.filterMode) === 'every') {
          continue loop;
        }
      }

      const defaultMatchesLength = Object.keys(defaultMatches).length;
      const customMatchesLength = Object.keys(customMatches).length;
      if (!defaultMatchesLength && !customMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === 'union' && customMatchesLength !== customFiltersLength && !defaultMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === 'intersection' && (customMatchesLength !== customFiltersLength || !defaultMatchesLength)) continue;
    }

    array.push({
      item,
      matches: { ...defaultMatches,
        ...customMatches
      }
    });
  }

  return array;
}
function useFilter(props, items, query) {
  const strQuery = computed(() => typeof (query == null ? void 0 : query.value) !== 'string' && typeof (query == null ? void 0 : query.value) !== 'number' ? '' : String(query.value));
  const filteredItems = computed(() => {
    return filterItems(unref(items), strQuery.value, {
      customKeyFilter: props.customKeyFilter,
      default: props.customFilter,
      filterKeys: props.filterKeys,
      filterMode: props.filterMode,
      noFilter: props.noFilter
    });
  });
  return {
    filteredItems
  };
}

function highlightResult$1(text, matches, length) {
  if (Array.isArray(matches)) throw new Error('Multiple matches is not implemented');
  return typeof matches === 'number' && ~matches ? createVNode(Fragment, null, [createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(0, matches)]), createVNode("span", {
    "class": "v-autocomplete__mask"
  }, [text.substr(matches, length)]), createVNode("span", {
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
    ...makeTransitionProps({
      transition: false
    })
  },
  emits: {
    'click:clear': e => true,
    'update:search': val => true,
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const activator = ref();
    const isFocused = ref(false);
    const isPristine = ref(true);
    const menu = ref(false);
    const items = computed(() => props.items.map(genItem));
    const search = useProxiedModel(props, 'search', '');
    const model = useProxiedModel(props, 'modelValue', [], v => wrapInArray(v || []), v => props.multiple ? v : v[0]);
    const {
      filteredItems
    } = useFilter(props, items, computed(() => isPristine.value ? undefined : search.value));
    const selections = computed(() => {
      const array = [];
      let index = 0;

      for (const unwrapped of model.value) {
        const item = genItem(unwrapped);
        const found = array.find(selection => selection.value === item.value);

        if (found == null) {
          array.push({ ...item,
            index
          });
          index++;
        }
      }

      return array;
    });
    const selected = computed(() => selections.value.map(selection => selection.value));

    function onClear(e) {
      model.value = [];

      if (props.openOnClear) {
        menu.value = true;
      }

      search.value = '';
    }

    function onClickControl() {
      if (props.hideNoData && !filteredItems.value.length) return;
      menu.value = true;
    }

    function onKeydown(e) {
      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true;
      }

      if (['Escape'].includes(e.key)) {
        menu.value = false;
      }

      if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
        isPristine.value = true;
      }
    }

    function onAfterLeave() {
      if (isFocused.value) isPristine.value = true;
    }

    const isSelecting = ref(false);

    function select(item) {
      if (props.multiple) {
        const index = selections.value.findIndex(selection => selection.value === item.value);

        if (index === -1) {
          model.value.push(item.value);
        } else {
          model.value = selected.value.filter(selection => selection !== item.value);
        }
      } else {
        model.value = [item.value];
        isSelecting.value = true;
        search.value = item.title;
        menu.value = false;
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      }
    }

    watch(() => vTextFieldRef.value, val => {
      activator.value = val.$el.querySelector('.v-input__control');
    });
    watch(isFocused, val => {
      if (val) {
        var _model$value;

        isSelecting.value = true;
        search.value = props.multiple ? '' : String((_model$value = model.value) != null ? _model$value : '');
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      } else {
        menu.value = false;
        search.value = '';
      }
    });
    watch(search, val => {
      if (!isFocused.value || isSelecting.value) return;
      if (val) menu.value = true;
      isPristine.value = !val;
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      return createVNode(VTextField, {
        "ref": vTextFieldRef,
        "modelValue": search.value,
        "onUpdate:modelValue": $event => search.value = $event,
        "class": ['v-autocomplete', {
          'v-autocomplete--active-menu': menu.value,
          'v-autocomplete--chips': !!props.chips,
          [`v-autocomplete--${props.multiple ? 'multiple' : 'single'}`]: true
        }],
        "appendInnerIcon": props.menuIcon,
        "dirty": selected.value.length > 0,
        "onClick:clear": onClear,
        "onClick:control": onClickControl,
        "onClick:input": onClickControl,
        "onFocus": () => isFocused.value = true,
        "onBlur": () => isFocused.value = false,
        "onKeydown": onKeydown
      }, { ...slots,
        default: () => createVNode(Fragment, null, [activator.value && createVNode(VMenu, {
          "modelValue": menu.value,
          "onUpdate:modelValue": $event => menu.value = $event,
          "activator": activator.value,
          "contentClass": "v-autocomplete__content",
          "eager": props.eager,
          "openOnClick": false,
          "transition": props.transition,
          "onAfterLeave": onAfterLeave
        }, {
          default: () => [createVNode(VList, {
            "selected": selected.value,
            "selectStrategy": props.multiple ? 'independent' : 'single-independent'
          }, {
            default: () => [!filteredItems.value.length && !props.hideNoData && createVNode(VListItem, {
              "title": t(props.noDataText)
            }, null), filteredItems.value.map(_ref2 => {
              let {
                item,
                matches
              } = _ref2;
              return createVNode(VListItem, {
                "value": item.value,
                "onMousedown": e => e.preventDefault(),
                "onClick": () => select(item)
              }, {
                title: () => {
                  var _search$value$length, _search$value;

                  return isPristine.value ? item.title : highlightResult$1(item.title, matches.title, (_search$value$length = (_search$value = search.value) == null ? void 0 : _search$value.length) != null ? _search$value$length : 0);
                }
              });
            })]
          })]
        }), selections.value.map((selection, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(selection);
          }

          const slotProps = {
            'onClick:close': onChipClose,
            modelValue: true
          };
          return createVNode("div", {
            "class": "v-autocomplete__selection"
          }, [hasChips && createVNode(VDefaultsProvider, {
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: 'small',
                text: selection.title
              }
            }
          }, {
            default: () => [slots.chip ? slots.chip({
              props: slotProps,
              selection
            }) : createVNode(VChip, slotProps, null)]
          }), !hasChips && (slots.selection ? slots.selection({
            selection
          }) : createVNode("span", {
            "class": "v-autocomplete__selection-text"
          }, [selection.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
            "class": "v-autocomplete__selection-comma"
          }, [createTextVNode(",")])]))]);
        })])
      });
    });
    return useForwardRef({
      filteredItems
    }, vTextFieldRef);
  }

});

const VBadge = defineComponent({
  name: 'VBadge',
  inheritAttrs: false,
  props: {
    bordered: Boolean,
    color: String,
    content: [Number, String],
    dot: Boolean,
    floating: Boolean,
    icon: String,
    inline: Boolean,
    label: {
      type: String,
      default: '$vuetify.badge'
    },
    location: {
      type: String,
      default: 'top-end',
      validator: value => {
        const [vertical, horizontal] = (value != null ? value : '').split('-');
        return ['top', 'bottom'].includes(vertical) && ['start', 'end'].includes(horizontal);
      }
    },
    max: [Number, String],
    modelValue: {
      type: Boolean,
      default: true
    },
    offsetX: [Number, String],
    offsetY: [Number, String],
    textColor: String,
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
    } = useBackgroundColor(toRef(props, 'color'));
    const {
      isRtl
    } = useRtl();
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, 'textColor'));
    const {
      themeClasses
    } = useTheme();
    const position = computed(() => {
      return props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
    });

    function calculatePosition(offset) {
      return `calc(100% - ${convertToUnit(position.value + parseInt(offset != null ? offset : 0, 10))})`;
    }

    const locationStyles = computed(() => {
      var _props$location;

      const [vertical, horizontal] = ((_props$location = props.location) != null ? _props$location : '').split('-');
      const styles = {
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        top: 'auto'
      };

      if (!props.inline) {
        const isRight = isRtl.value && horizontal === 'end' || !isRtl.value && horizontal === 'start';
        styles[isRight ? 'right' : 'left'] = calculatePosition(props.offsetX);
        styles[vertical === 'top' ? 'bottom' : 'top'] = calculatePosition(props.offsetY);
      }

      return styles;
    });
    return () => {
      var _ctx$slots$default, _ctx$slots, _ctx$slots$badge, _ctx$slots2;

      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= props.max ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pick(ctx.attrs, ['aria-atomic', 'aria-label', 'aria-live', 'role', 'title']);
      return createVNode(props.tag, mergeProps({
        "class": ['v-badge', {
          'v-badge--bordered': props.bordered,
          'v-badge--dot': props.dot,
          'v-badge--floating': props.floating,
          'v-badge--inline': props.inline
        }]
      }, attrs), {
        default: () => [createVNode("div", {
          "class": "v-badge__wrapper"
        }, [(_ctx$slots$default = (_ctx$slots = ctx.slots).default) == null ? void 0 : _ctx$slots$default.call(_ctx$slots), createVNode(MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [withDirectives(createVNode("span", mergeProps({
            "class": ['v-badge__badge', backgroundColorClasses.value, roundedClasses.value, textColorClasses.value, themeClasses.value],
            "style": [backgroundColorStyles.value, locationStyles.value, textColorStyles.value],
            "aria-atomic": "true",
            "aria-label": t(props.label, value),
            "aria-live": "polite",
            "role": "status"
          }, badgeAttrs), [props.dot ? undefined : ctx.slots.badge ? (_ctx$slots$badge = (_ctx$slots2 = ctx.slots).badge) == null ? void 0 : _ctx$slots$badge.call(_ctx$slots2) : props.icon ? createVNode(VIcon, {
            "icon": props.icon
          }, null) : createVNode("span", {
            "class": "v-badge__content"
          }, [content])]), [[vShow, props.modelValue]])]
        })])]
      });
    };
  }

});

const VBannerActions = createSimpleFunctional('v-banner-actions');

const VBannerText = createSimpleFunctional('v-banner-text');

// Utilities

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
}; // Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081


function getClientWidth() {
  return IN_BROWSER ? Math.max(document.documentElement.clientWidth, window.innerWidth) : 0; // SSR
}

function getClientHeight() {
  return IN_BROWSER ? Math.max(document.documentElement.clientHeight, window.innerHeight) : 0; // SSR
}

function getPlatform() {
  const userAgent = IN_BROWSER ? window.navigator.userAgent : 'ssr';

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
  const ssr = match(/ssr/i);
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
    ssr
  };
}

function createDisplay(options) {
  const {
    thresholds,
    mobileBreakpoint
  } = parseDisplayOptions(options);
  const height = ref(getClientHeight());
  const platform = getPlatform();
  const state = reactive({});
  const width = ref(getClientWidth());

  function onResize() {
    height.value = getClientHeight();
    width.value = getClientWidth();
  } // eslint-disable-next-line max-statements


  watchEffect(() => {
    const xs = width.value < thresholds.sm;
    const sm = width.value < thresholds.md && !xs;
    const md = width.value < thresholds.lg && !(sm || xs);
    const lg = width.value < thresholds.xl && !(md || sm || xs);
    const xl = width.value < thresholds.xxl && !(lg || md || sm || xs);
    const xxl = width.value >= thresholds.xxl;
    const name = xs ? 'xs' : sm ? 'sm' : md ? 'md' : lg ? 'lg' : xl ? 'xl' : 'xxl';
    const breakpointValue = typeof mobileBreakpoint === 'number' ? mobileBreakpoint : thresholds[mobileBreakpoint];
    const mobile = !platform.ssr ? width.value < breakpointValue : platform.android || platform.ios || platform.opera;
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
    state.platform = platform;
    state.thresholds = thresholds;
  });

  if (IN_BROWSER) {
    window.addEventListener('resize', onResize, {
      passive: true
    });
  }

  return toRefs(state);
}
function useDisplay() {
  const display = inject(DisplaySymbol);
  if (!display) throw new Error('Could not find Vuetify display injection');
  return display;
}

const VBanner = defineComponent({
  name: 'VBanner',
  props: {
    avatar: String,
    color: String,
    icon: String,
    lines: String,
    sticky: Boolean,
    text: String,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
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
      themeClasses
    } = provideTheme(props);
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
      mobile
    } = useDisplay();
    const {
      elevationClasses
    } = useElevation(props);
    const {
      positionClasses,
      positionStyles
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    useRender(() => {
      var _slots$default;

      const hasAvatar = !!(props.avatar || props.icon || slots.avatar || slots.icon);
      const hasText = !!(props.text || slots.text);
      const hasContent = hasAvatar || hasText || slots.default;
      return createVNode(props.tag, {
        "class": ['v-banner', {
          'v-banner--mobile': mobile.value,
          'v-banner--sticky': props.sticky,
          [`v-banner--${props.lines}-line`]: true
        }, borderClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, themeClasses.value],
        "style": [dimensionStyles.value, positionStyles.value],
        "role": "banner"
      }, {
        default: () => [hasContent && createVNode("div", {
          "class": "v-banner__content"
        }, [hasAvatar && createVNode(VDefaultsProvider, {
          "defaults": {
            VAvatar: {
              color: props.color,
              density: props.density,
              icon: props.icon,
              image: props.avatar
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-banner__avatar"
          }, [slots.avatar ? slots.avatar() : createVNode(VAvatar, null, null)])]
        }), hasText && createVNode(VBannerText, null, {
          default: () => [slots.text ? slots.text() : props.text]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.actions && createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              color: props.color,
              density: props.density,
              variant: 'text'
            }
          }
        }, {
          default: () => [createVNode(VBannerActions, null, {
            default: slots.actions
          })]
        })]
      });
    });
  }

});

const VBottomNavigation = defineComponent({
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
    ...makeBorderProps(),
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
    } = useBackgroundColor(toRef(props, 'bgColor'));
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const height = computed(() => Number(props.height) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0));
    const isActive = useProxiedModel(props, 'modelValue', props.modelValue);
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      priority: computed(() => parseInt(props.priority, 10)),
      position: computed(() => 'bottom'),
      layoutSize: computed(() => isActive.value ? height.value : 0),
      elementSize: height,
      active: isActive,
      absolute: toRef(props, 'absolute')
    });
    useGroup(props, VBtnToggleSymbol);
    provideDefaults({
      VBtn: {
        color: toRef(props, 'color'),
        density: toRef(props, 'density'),
        stacked: computed(() => props.mode !== 'horizontal'),
        variant: 'text'
      }
    }, {
      scoped: true
    });
    return () => {
      return createVNode(props.tag, {
        "class": ['v-bottom-navigation', {
          'v-bottom-navigation--active': isActive.value,
          'v-bottom-navigation--grow': props.grow,
          'v-bottom-navigation--shift': props.mode === 'shift'
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, {
          height: convertToUnit(height.value),
          transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, '%')})`
        }]
      }, {
        default: () => [slots.default && createVNode("div", {
          "class": "v-bottom-navigation__content"
        }, [slots.default()])]
      });
    };
  }

});

const VBreadcrumbsItem = defineComponent({
  name: 'VBreadcrumbsItem',
  props: {
    active: Boolean,
    activeClass: String,
    activeColor: String,
    color: String,
    disabled: Boolean,
    text: String,
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
    const {
      isExactActive,
      isLink,
      navigate
    } = useLink(props, attrs);
    const isActive = computed(() => props.active || (isExactActive == null ? void 0 : isExactActive.value));
    const color = computed(() => isActive.value ? props.activeColor : props.color);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    useRender(() => {
      const Tag = isLink.value ? 'a' : props.tag;
      const hasText = !!(slots.default || props.text);
      return createVNode(Tag, {
        "class": ['v-breadcrumbs-item', {
          'v-breadcrumbs-item--active': isActive.value,
          'v-breadcrumbs-item--disabled': props.disabled,
          'v-breadcrumbs-item--link': isLink.value,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, textColorClasses.value],
        "style": [textColorStyles.value],
        "aria-current": isActive.value ? 'page' : undefined,
        "onClick": isActive.value && navigate
      }, {
        default: hasText ? () => {
          var _slots$default, _slots$default2;

          return (_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)) != null ? _slots$default : props.text;
        } : undefined
      });
    });
    return {};
  }

});

const VBreadcrumbsDivider = createSimpleFunctional('v-breadcrumbs-divider', 'li');

const VBreadcrumbs = defineComponent({
  name: 'VBreadcrumbs',
  props: {
    activeClass: String,
    bgColor: String,
    color: String,
    disabled: Boolean,
    divider: {
      type: String,
      default: '/'
    },
    icon: String,
    items: {
      type: Array,
      default: () => []
    },
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
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'bgColor'));
    provideDefaults({
      VBreadcrumbsItem: {
        activeClass: toRef(props, 'activeClass'),
        color: toRef(props, 'color'),
        disabled: toRef(props, 'disabled')
      }
    });
    useRender(() => {
      var _slots$default;

      return createVNode(props.tag, {
        "class": ['v-breadcrumbs', backgroundColorClasses.value, densityClasses.value, roundedClasses.value],
        "style": backgroundColorStyles.value
      }, {
        default: () => [props.icon && createVNode(VIcon, {
          "icon": props.icon,
          "left": true
        }, null), props.items.map((item, index, array) => {
          var _slots$divider, _slots$divider2;

          return createVNode(Fragment, null, [createVNode(VBreadcrumbsItem, mergeProps({
            "key": index,
            "disabled": index >= array.length - 1
          }, typeof item === 'string' ? {
            text: item
          } : item), {
            default: slots.text ? () => {
              var _slots$text;

              return (_slots$text = slots.text) == null ? void 0 : _slots$text.call(slots, {
                item,
                index
              });
            } : undefined
          }), index < array.length - 1 && createVNode(VBreadcrumbsDivider, null, {
            default: () => [(_slots$divider = (_slots$divider2 = slots.divider) == null ? void 0 : _slots$divider2.call(slots, {
              item,
              index
            })) != null ? _slots$divider : props.divider]
          })]);
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      });
    });
    return {};
  }

});

const VCardActions = defineComponent$1({
  name: 'VCardActions',

  setup(_, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        variant: 'text'
      }
    });
    useRender(() => {
      var _slots$default;

      return createVNode("div", {
        "class": "v-card-actions"
      }, [slots == null ? void 0 : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {};
  }

});

const VCardAvatar = createSimpleFunctional('v-card-avatar');

const VCardHeader = createSimpleFunctional('v-card-header');

const VCardHeaderText = createSimpleFunctional('v-card-header-text');

const VCardImg = createSimpleFunctional('v-card-img');

const VCardSubtitle = createSimpleFunctional('v-card-subtitle');

const VCardText = createSimpleFunctional('v-card-text');

const VCardTitle = createSimpleFunctional('v-card-title');

const VCard = defineComponent({
  name: 'VCard',
  directives: {
    Ripple
  },
  props: {
    appendAvatar: String,
    appendIcon: String,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    link: Boolean,
    prependAvatar: String,
    prependIcon: String,
    ripple: Boolean,
    subtitle: String,
    text: String,
    title: String,
    ...makeThemeProps(),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeVariantProps({
      variant: 'contained'
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
      positionClasses,
      positionStyles
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const link = useLink(props, attrs);
    return () => {
      var _slots$image, _slots$media, _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasTitle = !!(slots.title || props.title);
      const hasSubtitle = !!(slots.subtitle || props.subtitle);
      const hasHeaderText = hasTitle || hasSubtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const hasImage = !!(slots.image || props.image);
      const hasHeader = hasHeaderText || hasPrepend || hasAppend;
      const hasText = !!(slots.text || props.text);
      const isClickable = !props.disabled && (link.isClickable.value || props.link);
      return withDirectives(createVNode(Tag, {
        "class": ['v-card', {
          'v-card--disabled': props.disabled,
          'v-card--flat': props.flat,
          'v-card--hover': props.hover && !(props.disabled || props.flat),
          'v-card--link': isClickable
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value, positionStyles.value],
        "href": link.href.value,
        "onClick": isClickable && link.navigate
      }, {
        default: () => [genOverlays(isClickable, 'v-card'), hasImage && createVNode(VDefaultsProvider, {
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, {
          default: () => [createVNode(VCardImg, null, {
            default: () => [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots) : createVNode(VImg, {
              "alt": ""
            }, null)]
          })]
        }), (_slots$media = slots.media) == null ? void 0 : _slots$media.call(slots), hasHeader && createVNode(VCardHeader, null, {
          default: () => [hasPrepend && createVNode(VDefaultsProvider, {
            "defaults": {
              VAvatar: {
                density: props.density,
                icon: props.prependIcon,
                image: props.prependAvatar
              }
            }
          }, {
            default: () => [createVNode(VCardAvatar, null, {
              default: () => [slots.prepend ? slots.prepend() : createVNode(VAvatar, null, null)]
            })]
          }), hasHeaderText && createVNode(VCardHeaderText, null, {
            default: () => [hasTitle && createVNode(VCardTitle, null, {
              default: () => [slots.title ? slots.title() : props.title]
            }), hasSubtitle && createVNode(VCardSubtitle, null, {
              default: () => [slots.subtitle ? slots.subtitle() : props.subtitle]
            })]
          }), hasAppend && createVNode(VDefaultsProvider, {
            "defaults": {
              VAvatar: {
                density: props.density,
                icon: props.appendIcon,
                image: props.appendAvatar
              }
            }
          }, {
            default: () => [createVNode(VCardAvatar, null, {
              default: () => [slots.append ? slots.append() : createVNode(VAvatar, null, null)]
            })]
          })]
        }), hasText && createVNode(VCardText, null, {
          default: () => [slots.text ? slots.text() : props.text]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.actions && createVNode(VCardActions, null, {
          default: slots.actions
        })]
      }), [[resolveDirective("ripple"), isClickable]]);
    };
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
  var _wrapper$start;

  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  (_wrapper$start = wrapper.start) == null ? void 0 : _wrapper$start.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}

function touchend(event, wrapper) {
  var _wrapper$end;

  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  (_wrapper$end = wrapper.end) == null ? void 0 : _wrapper$end.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}

function touchmove(event, wrapper) {
  var _wrapper$move;

  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  (_wrapper$move = wrapper.move) == null ? void 0 : _wrapper$move.call(wrapper, {
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
  var _value$options, _binding$instance, _target$_touchHandler;

  const value = binding.value;
  const target = value != null && value.parent ? el.parentElement : el;
  const options = (_value$options = value == null ? void 0 : value.options) != null ? _value$options : {
    passive: true
  };
  const uid = (_binding$instance = binding.instance) == null ? void 0 : _binding$instance.$.uid; // TODO: use custom uid generator

  if (!target || !uid) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = (_target$_touchHandler = target._touchHandlers) != null ? _target$_touchHandler : Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach(eventName => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}

function unmounted$3(el, binding) {
  var _binding$value, _binding$instance2;

  const target = (_binding$value = binding.value) != null && _binding$value.parent ? el.parentElement : el;
  const uid = (_binding$instance2 = binding.instance) == null ? void 0 : _binding$instance2.$.uid;
  if (!(target != null && target._touchHandlers) || !uid) return;
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

const VWindowSymbol = Symbol.for('vuetify:v-window');
const VWindowGroupSymbol = Symbol.for('vuetify:v-window-group');
const VWindow = genericComponent()({
  name: 'VWindow',
  directives: {
    Touch
  },
  props: {
    continuous: Boolean,
    nextIcon: {
      type: [Boolean, String],
      default: '$next'
    },
    prevIcon: {
      type: [Boolean, String],
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
    ...makeTagProps(),
    ...makeThemeProps()
  },
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
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = ref(false);
    const transition = computed(() => {
      const axis = props.direction === 'vertical' ? 'y' : 'x';
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? '-reverse' : '';
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = ref(0);
    const transitionHeight = ref(undefined);
    const activeIndex = computed(() => {
      return group.items.value.findIndex(item => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
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
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);

    function prev() {
      canMoveBack.value && group.prev();
    }

    function next() {
      canMoveForward.value && group.next();
    }

    provideDefaults({
      VBtn: {
        variant: 'text'
      }
    }, {
      scoped: true
    });
    const arrows = computed(() => {
      const arrows = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? 'right' : 'left'}`,
        onClick: group.prev,
        ariaLabel: t('$vuetify.carousel.prev')
      };
      arrows.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? 'left' : 'right'}`,
        onClick: group.next,
        ariaLabel: t('$vuetify.carousel.next')
      };
      arrows.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createVNode("div", null, null));
      return arrows;
    });
    const touchOptions = computed(() => {
      if (props.touch === false) return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        end: _ref2 => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        },
        start: _ref3 => {
          let {
            originalEvent
          } = _ref3;
          originalEvent.stopPropagation();
        }
      };
      return { ...options,
        ...(props.touch === true ? {} : props.touch)
      };
    });
    useRender(() => {
      var _slots$default, _slots$additional;

      return withDirectives(createVNode(props.tag, {
        "ref": rootRef,
        "class": ['v-window', {
          'v-window--show-arrows-on-hover': props.showArrows === 'hover'
        }, themeClasses.value]
      }, {
        default: () => [createVNode("div", {
          "class": "v-window__container",
          "style": {
            height: transitionHeight.value
          }
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          group
        }), props.showArrows !== false && createVNode("div", {
          "class": "v-window__controls"
        }, [arrows.value])]), (_slots$additional = slots.additional) == null ? void 0 : _slots$additional.call(slots, {
          group
        })]
      }), [[resolveDirective("touch"), touchOptions.value]]);
    });
    return {
      group
    };
  }

});

const VWindowItem = defineComponent({
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
    ...makeLazyProps(),
    ...makeGroupItemProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    if (!window || !groupItem) throw new Error('[Vuetify] VWindowItem must be used inside VWindow');
    const isTransitioning = ref(false);
    const hasTransition = computed(() => window.isReversed.value ? props.reverseTransition !== false : props.transition !== false);

    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      } // Finalize transition state.


      isTransitioning.value = false;

      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1; // Remove container height if we are out of transition.

        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = undefined;
        }
      }
    }

    function onBeforeTransition() {
      if (isTransitioning.value || !window) {
        return;
      } // Initialize transition state here.


      isTransitioning.value = true;

      if (window.transitionCount.value === 0) {
        var _window$rootRef$value;

        // Set initial height for height transition.
        window.transitionHeight.value = convertToUnit((_window$rootRef$value = window.rootRef.value) == null ? void 0 : _window$rootRef$value.clientHeight);
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

      nextTick(() => {
        // Do not set height if no transition or cancelled.
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        } // Set transition target height.


        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }

    const transition = computed(() => {
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
    return () => {
      return createVNode(MaybeTransition, {
        "transition": transition.value
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": ['v-window-item', groupItem.selectedClass.value]
        }, [slots.default && hasContent.value && slots.default()]), [[vShow, groupItem.isSelected.value]])]
      });
    };
  }

});

const VCarousel = defineComponent({
  name: 'VCarousel',
  props: {
    color: String,
    cycle: Boolean,
    delimiterIcon: {
      type: String,
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
      validator: value => value > 0
    },
    modelValue: null,
    progress: [Boolean, String],
    showArrows: {
      type: [Boolean, String],
      default: true,
      validator: v => typeof v === 'boolean' || v === 'hover'
    },
    verticalDelimiters: [Boolean, String]
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
    const windowRef = ref();
    let slideTimeout = -1;
    watch(model, restartTimeout);
    watch(() => props.interval, restartTimeout);
    watch(() => props.cycle, val => {
      if (val) restartTimeout();else window.clearTimeout(slideTimeout);
    });
    onMounted(startTimeout);

    function startTimeout() {
      if (!props.cycle || !windowRef.value) return;
      slideTimeout = window.setTimeout(windowRef.value.group.next, +props.interval > 0 ? +props.interval : 6000);
    }

    function restartTimeout() {
      window.clearTimeout(slideTimeout);
      window.requestAnimationFrame(startTimeout);
    }

    useRender(() => createVNode(VWindow, {
      "ref": windowRef,
      "modelValue": model.value,
      "onUpdate:modelValue": $event => model.value = $event,
      "class": ['v-carousel', {
        'v-carousel--hide-delimiter-background': props.hideDelimiterBackground,
        'v-carousel--vertical-delimiters': props.verticalDelimiters
      }],
      "style": {
        height: convertToUnit(props.height)
      },
      "continuous": true,
      "showArrows": props.showArrows,
      "mandatory": "force"
    }, {
      default: slots.default,
      additional: _ref2 => {
        let {
          group
        } = _ref2;
        return createVNode(Fragment, null, [!props.hideDelimiters && createVNode("div", {
          "class": "v-carousel__controls",
          "style": {
            left: props.verticalDelimiters === 'left' && props.verticalDelimiters ? 0 : 'auto',
            right: props.verticalDelimiters === 'right' ? 0 : 'auto'
          }
        }, [group.items.value.length > 0 && createVNode(VDefaultsProvider, {
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
          default: () => [group.items.value.map(item => {
            const props = {
              'aria-label': t('$vuetify.carousel.ariaLabel.delimiter'),
              class: [group.isSelected(item.id) && 'v-btn--selected'],
              onClick: () => group.select(item.id, true)
            };
            return slots.item ? slots.item({
              props,
              item
            }) : createVNode(VBtn, mergeProps(item, props), null);
          })]
        })]), props.progress && createVNode(VProgressLinear, {
          "class": "v-carousel__progress",
          "color": typeof props.progress === 'string' ? props.progress : undefined,
          "modelValue": (+model.value + 1) / group.items.value.length * 100
        }, null)]);
      },
      prev: slots.prev,
      next: slots.next
    }));
  }

});

const VCarouselItem = defineComponent({
  name: 'VCarouselItem',
  inheritAttrs: false,
  props: {
    value: null
  },

  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    useRender(() => createVNode(VWindowItem, {
      "class": "v-carousel-item",
      "value": props.value
    }, {
      default: () => [createVNode(VImg, attrs, slots)]
    }));
  }

});

const VSelectionControlGroupSymbol = Symbol.for('vuetify:selection-control-group');
const VSelectionControlGroup = defineComponent$1({
  name: 'VSelectionControlGroup',
  props: {
    disabled: Boolean,
    id: String,
    inline: Boolean,
    name: String,
    falseIcon: String,
    trueIcon: String,
    multiple: {
      type: Boolean,
      default: null
    },
    readonly: Boolean,
    type: String,
    modelValue: null
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
    const id = computed(() => props.id || `v-selection-control-group-${uid}`);
    const name = computed(() => props.name || id.value);
    provide(VSelectionControlGroupSymbol, {
      disabled: toRef(props, 'disabled'),
      inline: toRef(props, 'inline'),
      modelValue,
      multiple: computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
      name,
      falseIcon: toRef(props, 'falseIcon'),
      trueIcon: toRef(props, 'trueIcon'),
      readonly: toRef(props, 'readonly'),
      type: toRef(props, 'type')
    });
    useRender(() => {
      var _slots$default;

      return createVNode("div", {
        "class": "v-selection-control-group",
        "aria-labelled-by": props.type === 'radio' ? id.value : undefined,
        "role": props.type === 'radio' ? 'radiogroup' : undefined
      }, [slots == null ? void 0 : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {};
  }

});

const makeSelectionControlProps = propsFactory({
  color: String,
  disabled: Boolean,
  error: Boolean,
  id: String,
  inline: Boolean,
  label: String,
  falseIcon: String,
  trueIcon: String,
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
  trueValue: null,
  falseValue: null,
  modelValue: null,
  type: String,
  value: null,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeThemeProps(),
  ...makeDensityProps()
});
function useSelectionControl(props) {
  const group = inject(VSelectionControlGroupSymbol, undefined);
  const {
    densityClasses
  } = useDensity(props);
  const modelValue = useProxiedModel(props, 'modelValue');
  const trueValue = computed(() => props.trueValue !== undefined ? props.trueValue : props.value !== undefined ? props.value : true);
  const falseValue = computed(() => props.falseValue !== undefined ? props.falseValue : false);
  const isMultiple = computed(() => (group == null ? void 0 : group.multiple.value) || !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
  const model = computed({
    get() {
      const val = group ? group.modelValue.value : modelValue.value;
      return isMultiple.value ? val.some(v => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
    },

    set(val) {
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
  } = useTextColor(computed(() => {
    return model.value && !props.error && !props.disabled ? props.color : undefined;
  }));
  const icon = computed(() => {
    var _group$trueIcon$value, _group$falseIcon$valu;

    return model.value ? (_group$trueIcon$value = group == null ? void 0 : group.trueIcon.value) != null ? _group$trueIcon$value : props.trueIcon : (_group$falseIcon$valu = group == null ? void 0 : group.falseIcon.value) != null ? _group$falseIcon$valu : props.falseIcon;
  });
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
      densityClasses,
      group,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      trueValue
    } = useSelectionControl(props);
    const uid = getUid();
    const id = computed(() => props.id || `input-${uid}`);
    const isFocused = ref(false);
    const isFocusVisible = ref(false);
    const input = ref();

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

    useRender(() => {
      var _group$type$value, _slots$default, _group$name$value, _slots$input;

      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      const type = (_group$type$value = group == null ? void 0 : group.type.value) != null ? _group$type$value : props.type;
      return createVNode("div", {
        "class": ['v-selection-control', {
          'v-selection-control--dirty': model.value,
          'v-selection-control--disabled': props.disabled,
          'v-selection-control--error': props.error,
          'v-selection-control--focused': isFocused.value,
          'v-selection-control--focus-visible': isFocusVisible.value,
          'v-selection-control--inline': (group == null ? void 0 : group.inline.value) || props.inline
        }, densityClasses.value]
      }, [createVNode("div", {
        "class": ['v-selection-control__wrapper', textColorClasses.value]
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), withDirectives(createVNode("div", {
        "class": ['v-selection-control__input'],
        "style": textColorStyles.value
      }, [icon.value && createVNode(VIcon, {
        "icon": icon.value
      }, null), withDirectives(createVNode("input", mergeProps({
        "onUpdate:modelValue": $event => model.value = $event,
        "ref": input,
        "disabled": props.disabled,
        "id": id.value,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "readonly": props.readonly,
        "type": type,
        "value": trueValue.value,
        "name": (_group$name$value = group == null ? void 0 : group.name.value) != null ? _group$name$value : props.name,
        "aria-checked": type === 'checkbox' ? model.value : undefined
      }, attrs), null), [[vModelDynamic, model.value]]), (_slots$input = slots.input) == null ? void 0 : _slots$input.call(slots, {
        model,
        textColorClasses,
        props: {
          onFocus,
          onBlur,
          id: id.value
        }
      })]), [[resolveDirective("ripple"), props.ripple && [!props.disabled && !props.readonly, null, ['center', 'circle']]]])]), createVNode(VLabel, {
        "for": id.value
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
function filterControlProps(props) {
  return pick(props, Object.keys(VSelectionControl.props));
}

const VCheckbox = defineComponent({
  name: 'VCheckbox',
  inheritAttrs: false,
  props: {
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$checkboxIndeterminate'
    },
    ...makeVInputProps(),
    ...makeSelectionControlProps(),
    falseIcon: {
      type: String,
      default: '$checkboxOff'
    },
    trueIcon: {
      type: String,
      default: '$checkboxOn'
    }
  },
  emits: {
    'update:indeterminate': val => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, 'indeterminate');
    const falseIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.falseIcon;
    });
    const trueIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.trueIcon;
    });

    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }

    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
      const [inputProps, _1] = filterInputProps(props);
      const [controlProps, _2] = filterControlProps(props);
      return createVNode(VInput, mergeProps({
        "class": "v-checkbox"
      }, inputAttrs, inputProps), { ...slots,
        default: _ref2 => {
          let {
            isDisabled,
            isReadonly
          } = _ref2;
          return createVNode(VSelectionControl, mergeProps(controlProps, {
            "type": "checkbox",
            "onUpdate:modelValue": onChange,
            "falseIcon": falseIcon.value,
            "trueIcon": trueIcon.value,
            "aria-checked": indeterminate.value ? 'mixed' : undefined,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value
          }, controlAttrs), null);
        }
      });
    });
    return {};
  }

});

const VCode = createSimpleFunctional('v-code');

const VSheet = defineComponent({
  name: 'VSheet',
  props: {
    color: String,
    ...makeBorderProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
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
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
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
      positionClasses,
      positionStyles
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    return () => createVNode(props.tag, {
      "class": ['v-sheet', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
      "style": [backgroundColorStyles.value, dimensionStyles.value, positionStyles.value]
    }, slots);
  }

});

/* eslint-disable max-statements */

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
const useSlider = _ref => {
  let {
    props,
    handleSliderMouseUp,
    handleMouseMove,
    getActiveThumb
  } = _ref;
  const {
    isRtl
  } = useRtl();
  const isReversed = computed(() => isRtl.value !== props.reverse);
  const horizontalDirection = computed(() => {
    let hd = isRtl.value ? 'rtl' : 'ltr';

    if (props.reverse) {
      hd = hd === 'rtl' ? 'ltr' : 'rtl';
    }

    return hd;
  });
  const min = computed(() => parseFloat(props.min));
  const max = computed(() => parseFloat(props.max));
  const step = computed(() => props.step > 0 ? parseFloat(props.step) : 0);
  const decimals = computed(() => {
    const trimmedStep = step.value.toString().trim();
    return trimmedStep.includes('.') ? trimmedStep.length - trimmedStep.indexOf('.') - 1 : 0;
  });
  const thumbSize = computed(() => parseInt(props.thumbSize, 10));
  const tickSize = computed(() => parseInt(props.tickSize, 10));
  const trackSize = computed(() => parseInt(props.trackSize, 10));
  const numTicks = computed(() => (max.value - min.value) / step.value);
  const disabled = toRef(props, 'disabled');
  const vertical = computed(() => props.direction === 'vertical');
  const thumbColor = computed(() => {
    var _props$thumbColor;

    return props.error || props.disabled ? undefined : (_props$thumbColor = props.thumbColor) != null ? _props$thumbColor : props.color;
  });
  const trackColor = computed(() => {
    var _props$trackColor;

    return props.error || props.disabled ? undefined : (_props$trackColor = props.trackColor) != null ? _props$trackColor : props.color;
  });
  const trackFillColor = computed(() => {
    var _props$trackFillColor;

    return props.error || props.disabled ? undefined : (_props$trackFillColor = props.trackFillColor) != null ? _props$trackFillColor : props.color;
  });
  const mousePressed = ref(false);
  const startOffset = ref(0);
  const trackContainerRef = ref();
  const activeThumbRef = ref();

  function roundValue(value) {
    if (step.value <= 0) return value;
    const clamped = clamp(value, min.value, max.value);
    const offset = min.value % step.value;
    const newValue = Math.round((clamped - offset) / step.value) * step.value + offset;
    return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value));
  }

  function parseMouseMove(e) {
    var _trackContainerRef$va;

    const vertical = props.direction === 'vertical';
    const start = vertical ? 'top' : 'left';
    const length = vertical ? 'height' : 'width';
    const position = vertical ? 'clientY' : 'clientX';
    const {
      [start]: trackStart,
      [length]: trackLength
    } = (_trackContainerRef$va = trackContainerRef.value) == null ? void 0 : _trackContainerRef$va.$el.getBoundingClientRect();
    const clickOffset = getPosition(e, position); // It is possible for left to be NaN, force to number

    let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0;
    if (vertical || isReversed.value) clickPos = 1 - clickPos;
    return roundValue(min.value + clickPos * (max.value - min.value));
  }

  let thumbMoved = false;

  const handleStop = e => {
    if (!thumbMoved) {
      startOffset.value = 0;
      handleSliderMouseUp(parseMouseMove(e));
    }

    mousePressed.value = false;
    thumbMoved = false;
    startOffset.value = 0;
  };

  const handleStart = e => {
    activeThumbRef.value = getActiveThumb(e);
    if (!activeThumbRef.value) return;
    activeThumbRef.value.focus();
    mousePressed.value = true;

    if (activeThumbRef.value.contains(e.target)) {
      thumbMoved = true;
      startOffset.value = getOffset(e, activeThumbRef.value, props.direction);
    } else {
      startOffset.value = 0;
      handleMouseMove(parseMouseMove(e));
    }
  };

  const moveListenerOptions = {
    passive: true,
    capture: true
  };

  function onMouseMove(e) {
    thumbMoved = true;
    handleMouseMove(parseMouseMove(e));
  }

  function onSliderMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();
    handleStop(e);
    window.removeEventListener('mousemove', onMouseMove, moveListenerOptions);
    window.removeEventListener('mouseup', onSliderMouseUp);
  }

  function onSliderTouchend(e) {
    e.stopPropagation();
    e.preventDefault();
    handleStop(e);
    window.removeEventListener('touchmove', onMouseMove, moveListenerOptions);
    window.removeEventListener('touchend', onSliderTouchend);
  }

  function onSliderTouchstart(e) {
    handleStart(e);
    window.addEventListener('touchmove', onMouseMove, moveListenerOptions);
    window.addEventListener('touchend', onSliderTouchend, {
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

  const parsedTicks = computed(() => {
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
      value: parseInt(key, 10),
      position: position(parseInt(key, 10)),
      label: props.ticks[key]
    }));
  });
  const hasLabels = computed(() => parsedTicks.value.some(_ref2 => {
    let {
      label
    } = _ref2;
    return !!label;
  }));
  const data = {
    activeThumbRef,
    color: toRef(props, 'color'),
    decimals,
    disabled,
    direction: toRef(props, 'direction'),
    elevation: toRef(props, 'elevation'),
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
    readonly: toRef(props, 'readonly'),
    rounded: toRef(props, 'rounded'),
    roundValue,
    showTicks: toRef(props, 'showTicks'),
    startOffset,
    step,
    thumbSize,
    thumbColor,
    thumbLabel: toRef(props, 'thumbLabel'),
    ticks: toRef(props, 'ticks'),
    tickSize,
    trackColor,
    trackContainerRef,
    trackFillColor,
    trackSize,
    vertical
  };
  provide(VSliderSymbol, data);
  return data;
};

const VSliderThumb = defineComponent({
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
    }
  },
  emits: {
    'update:modelValue': v => true
  },

  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const slider = inject(VSliderSymbol);
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
    const multipliers = computed(() => {
      if (step.value) return [1, 2, 3];else return [1, 5, 10];
    });

    function parseKeydown(e, value) {
      if (!relevantKeys.includes(e.key)) return;
      e.preventDefault();

      const _step = step.value || 0.1;

      const steps = (props.max - props.min) / _step;

      if ([left, right, down, up].includes(e.key)) {
        const increase = isReversed.value ? [left, up] : [right, up];
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

    return () => {
      var _slots$thumbLabel, _slots$thumbLabel2;

      const positionPercentage = convertToUnit(vertical.value ? 100 - props.position : props.position, '%');
      const inset = vertical.value ? 'block' : 'inline';
      const {
        elevationClasses
      } = useElevation(computed(() => !disabled.value ? elevation.value : undefined));
      return createVNode("div", {
        "class": ['v-slider-thumb', {
          'v-slider-thumb--focused': props.focused,
          'v-slider-thumb--pressed': props.focused && mousePressed.value
        }],
        "style": {
          [`inset-${inset}-start`]: `calc(${positionPercentage} - var(--v-slider-thumb-size) / 2)`,
          '--v-slider-thumb-size': convertToUnit(thumbSize.value),
          direction: !vertical.value ? horizontalDirection.value : undefined
        },
        "role": "slider",
        "tabindex": disabled.value ? -1 : 0,
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.modelValue,
        "aria-readonly": readonly.value,
        "aria-orientation": direction.value,
        "onKeydown": !readonly.value ? onKeydown : undefined
      }, [createVNode("div", {
        "class": ['v-slider-thumb__surface', textColorClasses.value, elevationClasses.value],
        "style": { ...textColorStyles.value
        }
      }, null), withDirectives(createVNode("div", {
        "class": ['v-slider-thumb__ripple', textColorClasses.value],
        "style": textColorStyles.value
      }, null), [[resolveDirective("ripple"), true, null, {
        circle: true,
        center: true
      }]]), createVNode(VScaleTransition, {
        "origin": "bottom center"
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": "v-slider-thumb__label-container"
        }, [createVNode("div", {
          "class": ['v-slider-thumb__label']
        }, [createVNode("div", null, [(_slots$thumbLabel = (_slots$thumbLabel2 = slots['thumb-label']) == null ? void 0 : _slots$thumbLabel2.call(slots, {
          modelValue: props.modelValue
        })) != null ? _slots$thumbLabel : props.modelValue.toFixed(step.value ? decimals.value : 1)])])]), [[vShow, thumbLabel.value && props.focused || thumbLabel.value === 'always']])]
      })]);
    };
  }

});

const VSliderTrack = defineComponent({
  name: 'VSliderTrack',
  props: {
    start: {
      type: Number,
      required: true
    },
    stop: {
      type: Number,
      required: true
    }
  },
  emits: {},

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slider = inject(VSliderSymbol);
    if (!slider) throw new Error('[Vuetify] v-slider-track must be inside v-slider or v-range-slider');
    const {
      trackColor,
      trackFillColor,
      vertical,
      tickSize,
      showTicks,
      trackSize,
      color,
      rounded,
      parsedTicks,
      horizontalDirection
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
    const startDir = computed(() => `inset-${vertical.value ? 'block-end' : 'inline-start'}`);
    const endDir = computed(() => vertical.value ? 'height' : 'width');
    const backgroundStyles = computed(() => {
      return {
        [startDir.value]: '0%',
        [endDir.value]: '100%'
      };
    });
    const trackFillWidth = computed(() => props.stop - props.start);
    const trackFillStyles = computed(() => {
      return {
        [startDir.value]: convertToUnit(props.start, '%'),
        [endDir.value]: convertToUnit(trackFillWidth.value, '%')
      };
    });
    const computedTicks = computed(() => {
      const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
      return ticks.map((tick, index) => {
        var _slots$tickLabel, _slots$tickLabel2;

        const directionProperty = vertical.value ? 'inset-block-end' : 'margin-inline-start';
        return createVNode("div", {
          "key": tick.value,
          "class": ['v-slider-track__tick', {
            'v-slider-track__tick--filled': tick.position >= props.start && tick.position <= props.stop
          }],
          "style": {
            [directionProperty]: tick.position > 0 && tick.position < 100 && convertToUnit(tick.position, '%')
          }
        }, [(tick.label || slots['tick-label']) && createVNode("div", {
          "class": "v-slider-track__tick-label"
        }, [(_slots$tickLabel = (_slots$tickLabel2 = slots['tick-label']) == null ? void 0 : _slots$tickLabel2.call(slots, {
          tick,
          index
        })) != null ? _slots$tickLabel : tick.label])]);
      });
    });
    return () => {
      return createVNode("div", {
        "class": ['v-slider-track', roundedClasses.value],
        "style": {
          '--v-slider-track-size': convertToUnit(trackSize.value),
          '--v-slider-tick-size': convertToUnit(tickSize.value),
          direction: !vertical.value ? horizontalDirection.value : undefined
        }
      }, [createVNode("div", {
        "class": ['v-slider-track__background', trackColorClasses.value, {
          'v-slider-track__background--opacity': !!color.value || !trackFillColor.value
        }],
        "style": { ...backgroundStyles.value,
          ...trackColorStyles.value
        }
      }, null), createVNode("div", {
        "class": ['v-slider-track__fill', trackFillColorClasses.value],
        "style": { ...trackFillStyles.value,
          ...trackFillColorStyles.value
        }
      }, null), showTicks.value && createVNode("div", {
        "class": ['v-slider-track__ticks', {
          'v-slider-track__ticks--always-show': showTicks.value === 'always'
        }]
      }, [computedTicks.value])]);
    };
  }

});

const VSlider = defineComponent({
  name: 'VSlider',
  props: { ...makeFocusProps(),
    ...makeSliderProps(),
    ...makeVInputProps(),
    modelValue: {
      type: [Number, String],
      default: 0
    }
  },
  emits: {
    'update:focused': value => true,
    'update:modelValue': v => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const thumbContainerRef = ref();
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
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleSliderMouseUp: newValue => model.value = roundValue(newValue),
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleMouseMove: newValue => model.value = roundValue(newValue),
      getActiveThumb: () => {
        var _thumbContainerRef$va;

        return (_thumbContainerRef$va = thumbContainerRef.value) == null ? void 0 : _thumbContainerRef$va.$el;
      }
    });
    const model = useProxiedModel(props, 'modelValue', undefined, v => {
      const value = typeof v === 'string' ? parseFloat(v) : v == null ? min.value : v;
      return roundValue(value);
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStop = computed(() => position(model.value));
    return () => {
      const [inputProps, _] = filterInputProps(props);
      return createVNode(VInput, mergeProps({
        "class": ['v-slider', {
          'v-slider--has-labels': !!slots['tick-label'] || hasLabels.value,
          'v-slider--focused': isFocused.value,
          'v-slider--pressed': mousePressed.value,
          'v-slider--disabled': props.disabled
        }]
      }, inputProps, {
        "focused": isFocused.value
      }), { ...slots,
        default: _ref2 => {
          let {
            id
          } = _ref2;
          return createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly.value ? onSliderMousedown : undefined,
            "onTouchstartPassive": !readonly.value ? onSliderTouchstart : undefined
          }, [createVNode("input", {
            "id": id.value,
            "name": props.name || id.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": 0,
            "stop": trackStop.value
          }, {
            'tick-label': slots['tick-label']
          }), createVNode(VSliderThumb, {
            "ref": thumbContainerRef,
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
    };
  }

});

var _rgba$inputs;

function has(obj, key) {
  return key.every(k => obj.hasOwnProperty(k));
}

function parseColor(color) {
  var _hsva$a;

  if (!color) return null;
  let hsva = null;

  if (typeof color === 'string') {
    const hex = parseHex(color);
    hsva = HexToHSVA(hex);
  }

  if (typeof color === 'object') {
    if (has(color, ['r', 'g', 'b'])) {
      hsva = RGBAtoHSVA(color);
    } else if (has(color, ['h', 's', 'l'])) {
      hsva = HSLAtoHSVA(color);
    } else if (has(color, ['h', 's', 'v'])) {
      hsva = color;
    }
  }

  return hsva != null ? { ...hsva,
    a: (_hsva$a = hsva.a) != null ? _hsva$a : 1
  } : null;
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
    const hex = HSVAtoHex(color);
    if (color.a === 1) return hex.slice(0, 7);else return hex;
  }

  if (typeof input === 'object') {
    let converted;
    if (has(input, ['r', 'g', 'b'])) converted = HSVAtoRGBA(color);else if (has(input, ['h', 's', 'l'])) converted = HSVAtoHSLA(color);else if (has(input, ['h', 's', 'v'])) converted = color;
    return stripAlpha(converted, !has(input, ['a']));
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
    getColor: (c, v) => ({ ...c,
      r: Number(v)
    })
  }, {
    label: 'G',
    max: 255,
    step: 1,
    getValue: c => Math.round(c.g),
    getColor: (c, v) => ({ ...c,
      g: Number(v)
    })
  }, {
    label: 'B',
    max: 255,
    step: 1,
    getValue: c => Math.round(c.b),
    getColor: (c, v) => ({ ...c,
      b: Number(v)
    })
  }, {
    label: 'A',
    max: 1,
    step: 0.01,
    getValue: c => Math.round(c.a * 100) / 100,
    getColor: (c, v) => ({ ...c,
      a: Number(v)
    })
  }],
  to: HSVAtoRGBA,
  from: RGBAtoHSVA
};
const rgb = { ...rgba,
  inputs: (_rgba$inputs = rgba.inputs) == null ? void 0 : _rgba$inputs.slice(0, 3)
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
    getColor: (c, v) => ({ ...c,
      h: Number(v)
    })
  }, {
    label: 'S',
    max: 1,
    step: 0.01,
    getValue: c => Math.round(c.s * 100) / 100,
    getColor: (c, v) => ({ ...c,
      s: Number(v)
    })
  }, {
    label: 'L',
    max: 1,
    step: 0.01,
    getValue: c => Math.round(c.l * 100) / 100,
    getColor: (c, v) => ({ ...c,
      l: Number(v)
    })
  }, {
    label: 'A',
    max: 1,
    step: 0.01,
    getValue: c => Math.round(c.a * 100) / 100,
    getColor: (c, v) => ({ ...c,
      a: Number(v)
    })
  }],
  to: HSVAtoHSLA,
  from: HSLAtoHSVA
};
const hsl = { ...hsla,
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
  to: HSVAtoHex,
  from: HexToHSVA
};
const hex = { ...hexa,
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

const VColorPickerPreview = defineComponent({
  name: 'VColorPickerPreview',
  props: {
    color: {
      type: Object
    },
    disabled: Boolean,
    hideAlpha: Boolean
  },
  emits: {
    'update:color': color => true
  },

  setup(props, _ref) {
    let {
      emit
    } = _ref;
    return () => {
      var _props$color, _props$color2, _props$color4;

      return createVNode("div", {
        "class": ['v-color-picker-preview', {
          'v-color-picker-preview--hide-alpha': props.hideAlpha
        }]
      }, [createVNode("div", {
        "class": "v-color-picker-preview__dot"
      }, [createVNode("div", {
        "style": {
          background: HSVAtoCSS((_props$color = props.color) != null ? _props$color : nullColor)
        }
      }, null)]), createVNode("div", {
        "class": "v-color-picker-preview__sliders"
      }, [createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__hue",
        "modelValue": (_props$color2 = props.color) == null ? void 0 : _props$color2.h,
        "onUpdate:modelValue": h => {
          var _props$color3;

          return emit('update:color', { ...((_props$color3 = props.color) != null ? _props$color3 : nullColor),
            h
          });
        },
        "step": 0,
        "min": 0,
        "max": 360,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null), !props.hideAlpha && createVNode(VSlider, {
        "class": "v-color-picker-preview__track v-color-picker-preview__alpha",
        "modelValue": (_props$color4 = props.color) == null ? void 0 : _props$color4.a,
        "onUpdate:modelValue": a => {
          var _props$color5;

          return emit('update:color', { ...((_props$color5 = props.color) != null ? _props$color5 : nullColor),
            a
          });
        },
        "step": 0,
        "min": 0,
        "max": 1,
        "disabled": props.disabled,
        "thumbSize": 14,
        "trackSize": 8,
        "trackFillColor": "white",
        "hideDetails": true
      }, null)])]);
    };
  }

});

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
    }
  },
  emits: {
    'update:color': color => true,
    'update:position': hue => true
  },

  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const isInteracting = ref(false);
    const isOutsideUpdate = ref(false);
    const dotPosition = ref({
      x: 0,
      y: 0
    });
    const dotStyles = computed(() => {
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
    const canvasRef = ref();

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

    watch(dotPosition, () => {
      var _props$color$h, _props$color, _props$color$a, _props$color2;

      if (isOutsideUpdate.value) {
        isOutsideUpdate.value = false;
        return;
      }

      if (!canvasRef.value) return;
      const {
        width,
        height
      } = canvasRef.value.getBoundingClientRect();
      const {
        x,
        y
      } = dotPosition.value;
      emit('update:color', {
        h: (_props$color$h = (_props$color = props.color) == null ? void 0 : _props$color.h) != null ? _props$color$h : 0,
        s: clamp(x, 0, width) / width,
        v: 1 - clamp(y, 0, height) / height,
        a: (_props$color$a = (_props$color2 = props.color) == null ? void 0 : _props$color2.a) != null ? _props$color$a : 1
      });
    });

    function updateCanvas() {
      var _props$color$h2, _props$color3;

      if (!canvasRef.value) return;
      const canvas = canvasRef.value;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      saturationGradient.addColorStop(0, 'hsla(0, 0%, 100%, 1)'); // white

      saturationGradient.addColorStop(1, `hsla(${(_props$color$h2 = (_props$color3 = props.color) == null ? void 0 : _props$color3.h) != null ? _props$color$h2 : 0}, 100%, 50%, 1)`);
      ctx.fillStyle = saturationGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      valueGradient.addColorStop(0, 'hsla(0, 0%, 100%, 0)'); // transparent

      valueGradient.addColorStop(1, 'hsla(0, 0%, 0%, 1)'); // black

      ctx.fillStyle = valueGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    watch(() => {
      var _props$color4;

      return (_props$color4 = props.color) == null ? void 0 : _props$color4.h;
    }, updateCanvas, {
      immediate: true
    });
    watch(() => props.color, () => {
      if (isInteracting.value) {
        isInteracting.value = false;
        return;
      }

      if (!props.color) return;
      isOutsideUpdate.value = true;
      dotPosition.value = {
        x: props.color.s * parseInt(props.width, 10),
        y: (1 - props.color.v) * parseInt(props.height, 10)
      };
    }, {
      deep: true,
      immediate: true
    });
    onMounted(() => updateCanvas());
    return () => createVNode("div", {
      "class": "v-color-picker-canvas",
      "style": {
        width: convertToUnit(props.width),
        height: convertToUnit(props.height)
      },
      "onClick": handleClick,
      "onMousedown": handleMouseDown,
      "onTouchstart": handleMouseDown
    }, [createVNode("canvas", {
      "ref": canvasRef,
      "width": props.width,
      "height": props.height
    }, null), createVNode("div", {
      "class": ['v-color-picker-canvas__dot', {
        'v-color-picker-canvas__dot--disabled': props.disabled
      }],
      "style": dotStyles.value
    }, null)]);
  }

});

const VColorPickerInput = _ref => {
  let {
    label,
    ...rest
  } = _ref;
  return createVNode("div", {
    "class": "v-color-picker-edit__input"
  }, [createVNode("input", rest, null), createVNode("span", null, [label])]);
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
    }
  },
  emits: {
    'update:color': color => true,
    'update:mode': mode => true
  },

  setup(props, _ref2) {
    let {
      emit
    } = _ref2;
    const enabledModes = computed(() => {
      return props.modes.map(key => ({ ...modes[key],
        name: key
      }));
    });
    const inputs = computed(() => {
      var _mode$inputs;

      const mode = enabledModes.value.find(m => m.name === props.mode);
      if (!mode) return [];
      const color = props.color ? mode.to(props.color) : {};
      return (_mode$inputs = mode.inputs) == null ? void 0 : _mode$inputs.map(_ref3 => {
        let {
          getValue,
          getColor,
          ...inputProps
        } = _ref3;
        return { ...mode.inputProps,
          ...inputProps,
          disabled: props.disabled,
          value: getValue(color),
          onChange: e => {
            const target = e.target;
            if (!target) return;
            emit('update:color', mode.from(getColor(color, target.value)));
          }
        };
      });
    });
    return () => {
      var _inputs$value;

      return createVNode("div", {
        "class": "v-color-picker-edit"
      }, [(_inputs$value = inputs.value) == null ? void 0 : _inputs$value.map(props => createVNode(VColorPickerInput, props, null)), enabledModes.value.length > 1 && createVNode(VBtn, {
        "icon": "$unfold",
        "size": "x-small",
        "variant": "plain",
        "onClick": () => {
          const mi = enabledModes.value.findIndex(m => m.name === props.mode);
          emit('update:mode', enabledModes.value[(mi + 1) % enabledModes.value.length].name);
        }
      }, null)]);
    };
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
  transparent: 'transparent'
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
    maxHeight: [Number, String]
  },
  emits: {
    'update:color': color => true
  },

  setup(props, _ref) {
    let {
      emit
    } = _ref;
    return () => createVNode("div", {
      "class": "v-color-picker-swatches",
      "style": {
        maxHeight: convertToUnit(props.maxHeight)
      }
    }, [createVNode("div", null, [props.swatches.map(swatch => createVNode("div", {
      "class": "v-color-picker-swatches__swatch"
    }, [swatch.map(color => {
      const hsva = parseColor(color);
      return createVNode("div", {
        "class": "v-color-picker-swatches__color",
        "onClick": () => hsva && emit('update:color', hsva)
      }, [createVNode("div", {
        "style": {
          background: color
        }
      }, [props.color && deepEqual(props.color, hsva) ? createVNode(VIcon, {
        "size": "x-small",
        "icon": "$success",
        "color": getContrast(color, '#FFFFFF') > 2 ? 'white' : 'black'
      }, null) : undefined])]);
    })]))])]);
  }

});

const VColorPicker = defineComponent({
  name: 'VColorPicker',
  inheritAttrs: false,
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
    width: {
      type: [Number, String],
      default: 300
    },
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeThemeProps()
  },
  emits: {
    'update:modelValue': color => true,
    'update:mode': mode => true
  },

  setup(props) {
    const mode = useProxiedModel(props, 'mode');
    const lastPickedColor = ref(null);
    const currentColor = useProxiedModel(props, 'modelValue', undefined, v => {
      let c = parseColor(v);
      if (!c) return null;

      if (lastPickedColor.value) {
        c = { ...c,
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

    onMounted(() => {
      if (!props.modes.includes(mode.value)) mode.value = props.modes[0];
    });
    return () => {
      var _currentColor$value;

      return createVNode(VSheet, {
        "rounded": props.rounded,
        "elevation": props.elevation,
        "theme": props.theme,
        "class": ['v-color-picker'],
        "style": {
          '--v-color-picker-color-hsv': HSVAtoCSS({ ...((_currentColor$value = currentColor.value) != null ? _currentColor$value : nullColor),
            a: 1
          })
        },
        "maxWidth": props.width
      }, {
        default: () => [!props.hideCanvas && createVNode(VColorPickerCanvas, {
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "disabled": props.disabled,
          "dotSize": props.dotSize,
          "width": props.width,
          "height": props.canvasHeight
        }, null), (!props.hideSliders || !props.hideInputs) && createVNode("div", {
          "class": "v-color-picker__controls"
        }, [!props.hideSliders && createVNode(VColorPickerPreview, {
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "hideAlpha": !mode.value.endsWith('a'),
          "disabled": props.disabled
        }, null), !props.hideInputs && createVNode(VColorPickerEdit, {
          "modes": props.modes,
          "mode": mode.value,
          "onUpdate:mode": m => mode.value = m,
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "disabled": props.disabled
        }, null)]), props.showSwatches && createVNode(VColorPickerSwatches, {
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "maxHeight": props.swatchesMaxHeight,
          "swatches": props.swatches,
          "disabled": props.disabled
        }, null)]
      });
    };
  }

});

function highlightResult(text, matches, length) {
  if (Array.isArray(matches)) throw new Error('Multiple matches is not implemented');
  return typeof matches === 'number' && ~matches ? createVNode(Fragment, null, [createVNode("span", {
    "class": "v-combobox__unmask"
  }, [text.substr(0, matches)]), createVNode("span", {
    "class": "v-combobox__mask"
  }, [text.substr(matches, length)]), createVNode("span", {
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
      hideNoData: true
    }),
    ...makeTransitionProps({
      transition: false
    })
  },
  emits: {
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const activator = ref();
    const isFocused = ref(false);
    const isPristine = ref(true);
    const menu = ref(false);
    const selectionIndex = ref(-1);
    const color = computed(() => {
      var _vTextFieldRef$value;

      return (_vTextFieldRef$value = vTextFieldRef.value) == null ? void 0 : _vTextFieldRef$value.color;
    });
    const items = computed(() => props.items.map(genItem));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    const model = useProxiedModel(props, 'modelValue', [], v => wrapInArray(v || []), v => props.multiple ? v : v[0]);

    const _search = ref('');

    const search = computed({
      get: () => props.multiple ? _search.value : genItem(model.value[0]).value,
      set: val => {
        var _props$delimiters;

        if (props.multiple) {
          _search.value = val;
        } else {
          model.value = [val];
        }

        if (val && props.multiple && (_props$delimiters = props.delimiters) != null && _props$delimiters.length) {
          const values = val.split(new RegExp(`(?:${props.delimiters.join('|')})+`));

          if (values.length > 1) {
            values.forEach(v => {
              v = v.trim();
              if (v) select({
                value: v
              });
            });
            _search.value = '';
          }
        }

        if (!val) selectionIndex.value = -1;
        if (isFocused.value) menu.value = true;
        isPristine.value = !val;
      }
    });
    const {
      filteredItems
    } = useFilter(props, items, computed(() => isPristine.value ? undefined : search.value));
    const selections = computed(() => {
      const array = [];
      let index = 0;

      for (const unwrapped of model.value) {
        const item = genItem(unwrapped);
        const found = array.find(selection => selection.value === item.value);

        if (found == null) {
          array.push({ ...item,
            index,
            selected: index === selectionIndex.value
          });
          index++;
        }
      }

      return array;
    });
    const selected = computed(() => selections.value.map(selection => selection.value));
    const selection = computed(() => selections.value[selectionIndex.value]);

    function onClear(e) {
      model.value = [];

      if (props.openOnClear) {
        menu.value = true;
      }
    }

    function onClickControl() {
      if (props.hideNoData && !filteredItems.value.length) return;
      menu.value = true;
    }

    function onKeydown(e) {
      const selectionStart = vTextFieldRef.value.selectionStart;
      const length = selected.value.length;
      if (selectionIndex.value > -1) e.preventDefault();

      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true;
      }

      if (['Escape'].includes(e.key)) {
        menu.value = false;
      }

      if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
        isPristine.value = true;
      }

      if (!props.multiple) return;

      if (['Backspace', 'Delete'].includes(e.key)) {
        if (selectionIndex.value < 0) {
          if (e.key === 'Backspace' && !search.value) {
            selectionIndex.value = length - 1;
          }

          return;
        }

        select(selection.value);
        nextTick(() => !selection.value && (selectionIndex.value = length - 2));
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

      if (e.key === 'Enter') {
        select({
          value: search.value
        });
        search.value = '';
      }
    }

    function onAfterLeave() {
      if (isFocused.value) isPristine.value = true;
    }

    function select(item) {
      if (props.multiple) {
        const index = selections.value.findIndex(selection => selection.value === item.value);

        if (index === -1) {
          model.value.push(item.value);
        } else {
          model.value = selected.value.filter(selection => selection !== item.value);
        }

        search.value = '';
      } else {
        search.value = item.title; // watch for search watcher to trigger

        nextTick(() => {
          menu.value = false;
          isPristine.value = true;
        });
      }
    }

    watch(() => vTextFieldRef.value, val => {
      activator.value = val.$el.querySelector('.v-input__control');
    });
    watch(filteredItems, val => {
      if (!val.length && props.hideNoData) menu.value = false;
    });
    watch(isFocused, val => {
      if (val) {
        selectionIndex.value = -1;
      } else {
        menu.value = false;
        if (!props.multiple || !search.value) return;
        model.value.push(search.value);
        search.value = '';
      }
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      return createVNode(VTextField, {
        "ref": vTextFieldRef,
        "modelValue": search.value,
        "onUpdate:modelValue": $event => search.value = $event,
        "class": ['v-combobox', {
          'v-combobox--active-menu': menu.value,
          'v-combobox--chips': !!props.chips,
          'v-combobox--selecting-index': selectionIndex.value > -1,
          [`v-combobox--${props.multiple ? 'multiple' : 'single'}`]: true
        }],
        "appendInnerIcon": props.items.length ? props.menuIcon : undefined,
        "dirty": selected.value.length > 0,
        "onClick:clear": onClear,
        "onClick:control": onClickControl,
        "onClick:input": onClickControl,
        "onFocus": () => isFocused.value = true,
        "onBlur": () => isFocused.value = false,
        "onKeydown": onKeydown
      }, { ...slots,
        default: () => createVNode(Fragment, null, [activator.value && createVNode(VMenu, {
          "modelValue": menu.value,
          "onUpdate:modelValue": $event => menu.value = $event,
          "activator": activator.value,
          "contentClass": "v-combobox__content",
          "eager": props.eager,
          "openOnClick": false,
          "transition": props.transition,
          "onAfterLeave": onAfterLeave
        }, {
          default: () => [createVNode(VList, {
            "selected": selected.value,
            "selectStrategy": props.multiple ? 'independent' : 'single-independent'
          }, {
            default: () => [!filteredItems.value.length && !props.hideNoData && createVNode(VListItem, {
              "title": t(props.noDataText)
            }, null), filteredItems.value.map(_ref2 => {
              let {
                item,
                matches
              } = _ref2;
              return createVNode(VListItem, {
                "value": item.value,
                "onMousedown": e => e.preventDefault(),
                "onClick": () => select(item)
              }, {
                title: () => {
                  var _search$value$length, _search$value;

                  return isPristine.value ? item.title : highlightResult(item.title, matches.title, (_search$value$length = (_search$value = search.value) == null ? void 0 : _search$value.length) != null ? _search$value$length : 0);
                }
              });
            })]
          })]
        }), selections.value.map((selection, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(selection);
          }

          const slotProps = {
            'onClick:close': onChipClose,
            modelValue: true
          };
          return createVNode("div", {
            "class": ['v-combobox__selection', selection.selected && ['v-combobox__selection--selected', textColorClasses.value]],
            "style": selection.selected ? textColorStyles.value : {}
          }, [hasChips && createVNode(VDefaultsProvider, {
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: 'small',
                text: selection.title
              }
            }
          }, {
            default: () => [slots.chip ? slots.chip({
              props: slotProps,
              selection
            }) : createVNode(VChip, slotProps, null)]
          }), !hasChips && (slots.selection ? slots.selection({
            selection
          }) : createVNode("span", {
            "class": "v-combobox__selection-text"
          }, [selection.title, props.multiple && index < selections.value.length - 1 && createVNode("span", {
            "class": "v-combobox__selection-comma"
          }, [createTextVNode(",")])]))]);
        })])
      });
    });
    return useForwardRef({
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

const VDialog = genericComponent()({
  name: 'VDialog',
  inheritAttrs: false,
  props: {
    fullscreen: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    modelValue: Boolean,
    ...makeDimensionProps({
      width: 'auto'
    }),
    ...makeTransitionProps({
      transition: {
        component: VDialogTransition
      }
    })
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    const {
      dimensionStyles
    } = useDimension(props);
    const overlay = ref();

    function onFocusin(e) {
      var _overlay$value;

      const before = e.relatedTarget;
      const after = e.target;

      if (before !== after && (_overlay$value = overlay.value) != null && _overlay$value.contentEl && // It isn't the document or the dialog body
      ![document, overlay.value.contentEl].includes(after) && // It isn't inside the dialog body
      !overlay.value.contentEl.contains(after) // We're the topmost dialog
      // TODO: this.activeZIndex >= this.getMaxZIndex() &&
      // It isn't inside a dependent element (like a menu)
      // TODO: !this.getOpenDependentElements().some(el => el.contains(target))
      // So we must have focused something outside the dialog and its children
      ) {
        const focusable = [...overlay.value.contentEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(el => !el.hasAttribute('disabled'));
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
      watch(() => isActive.value && props.retainFocus, val => {
        val ? document.addEventListener('focusin', onFocusin) : document.removeEventListener('focusin', onFocusin);
      }, {
        immediate: true
      });
    }

    watch(isActive, async val => {
      await nextTick();

      if (val) {
        var _contentEl;

        (_contentEl = overlay.value.contentEl) == null ? void 0 : _contentEl.focus({
          preventScroll: true
        });
      } else {
        var _activatorEl;

        (_activatorEl = overlay.value.activatorEl) == null ? void 0 : _activatorEl.focus({
          preventScroll: true
        });
      }
    });
    return () => {
      return createVNode(VOverlay, mergeProps({
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "class": ['v-dialog', {
          'v-dialog--fullscreen': props.fullscreen
        }],
        "style": dimensionStyles.value,
        "transition": props.transition,
        "ref": overlay,
        "aria-role": "dialog",
        "aria-modal": "true",
        "activatorProps": {
          'aria-haspopup': 'dialog',
          'aria-expanded': String(isActive.value)
        }
      }, attrs), {
        default: slots.default,
        activator: slots.activator
      });
    };
  }

});

const VExpansionPanelSymbol = Symbol.for('vuetify:v-expansion-panel');
const allowedVariants = ['default', 'accordion', 'inset', 'popout'];
const VExpansionPanels = defineComponent({
  name: 'VExpansionPanels',
  props: {
    color: String,
    variant: {
      type: String,
      default: 'default',
      validator: v => allowedVariants.includes(v)
    },
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
    const variantClass = computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
    provideDefaults({
      VExpansionPanel: {
        color: toRef(props, 'color')
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ['v-expansion-panels', themeClasses.value, variantClass.value]
    }, slots));
    return {};
  }

});

const makeVExpansionPanelTitleProps = propsFactory({
  color: String,
  expandIcon: {
    type: String,
    default: '$expand'
  },
  collapseIcon: {
    type: String,
    default: '$collapse'
  },
  hideActions: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: false
  }
});
const VExpansionPanelTitle = defineComponent({
  name: 'VExpansionPanelTitle',
  directives: {
    Ripple
  },
  props: { ...makeVExpansionPanelTitleProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel');
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, 'color');
    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon
    }));
    useRender(() => {
      var _slots$default;

      return withDirectives(createVNode("button", {
        "class": ['v-expansion-panel-title', {
          'v-expansion-panel-title--active': expansionPanel.isSelected.value
        }, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "type": "button",
        "tabindex": expansionPanel.disabled.value ? -1 : undefined,
        "disabled": expansionPanel.disabled.value,
        "aria-expanded": expansionPanel.isSelected.value,
        "onClick": expansionPanel.toggle
      }, [createVNode("div", {
        "class": "v-expansion-panel-title__overlay"
      }, null), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value), !props.hideActions && createVNode("div", {
        "class": "v-expansion-panel-title__icon"
      }, [slots.actions ? slots.actions(slotProps.value) : createVNode(VIcon, {
        "icon": expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon
      }, null)])]), [[resolveDirective("ripple"), props.ripple]]);
    });
    return {};
  }

});

const VExpansionPanelText = defineComponent({
  name: 'VExpansionPanelText',
  props: { ...makeLazyProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel');
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, expansionPanel.isSelected);
    useRender(() => {
      var _slots$default;

      return createVNode(VExpandTransition, {
        "onAfterLeave": onAfterLeave
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": "v-expansion-panel-text"
        }, [slots.default && hasContent.value && createVNode("div", {
          "class": "v-expansion-panel-text__wrapper"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]), [[vShow, expansionPanel.isSelected.value]])]
      });
    });
    return {};
  }

});

const VExpansionPanel = defineComponent({
  name: 'VExpansionPanel',
  props: {
    title: String,
    text: String,
    bgColor: String,
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLazyProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeVExpansionPanelTitleProps()
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
    const isDisabled = computed(() => (groupItem == null ? void 0 : groupItem.disabled.value) || props.disabled);
    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id);
      return !groupItem.isSelected.value && groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === 1);
    });
    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id);
      return !groupItem.isSelected.value && groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === -1);
    });
    provide(VExpansionPanelSymbol, groupItem);
    useRender(() => {
      var _slots$default;

      const hasText = !!(slots.text || props.text);
      const hasTitle = !!(slots.title || props.title);
      return createVNode(props.tag, {
        "class": ['v-expansion-panel', {
          'v-expansion-panel--active': groupItem.isSelected.value,
          'v-expansion-panel--before-active': isBeforeSelected.value,
          'v-expansion-panel--after-active': isAfterSelected.value,
          'v-expansion-panel--disabled': isDisabled.value
        }, roundedClasses.value, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "aria-expanded": groupItem.isSelected.value
      }, {
        default: () => [createVNode("div", {
          "class": ['v-expansion-panel__shadow', ...elevationClasses.value]
        }, null), hasTitle && createVNode(VExpansionPanelTitle, {
          "collapseIcon": props.collapseIcon,
          "color": props.color,
          "expandIcon": props.expandIcon,
          "hideActions": props.hideActions,
          "ripple": props.ripple
        }, {
          default: () => [slots.title ? slots.title() : props.title]
        }), hasText && createVNode(VExpansionPanelText, {
          "eager": props.eager
        }, {
          default: () => [slots.text ? slots.text() : props.text]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      });
    });
    return {};
  }

});

const VFileInput = defineComponent({
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
    hint: String,
    persistentHint: Boolean,
    placeholder: String,
    showSize: {
      type: [Boolean, Number],
      default: false,
      validator: v => {
        return typeof v === 'boolean' || [1000, 1024].includes(v);
      }
    },
    ...makeVInputProps(),
    prependIcon: {
      type: String,
      default: '$file'
    },
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
    'click:clear': e => true,
    'click:control': e => true,
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
    const base = computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined);
    const totalBytes = computed(() => {
      var _model$value;

      return ((_model$value = model.value) != null ? _model$value : []).reduce((bytes, _ref2) => {
        let {
          size = 0
        } = _ref2;
        return bytes + size;
      }, 0);
    });
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));
    const fileNames = computed(() => {
      var _model$value2;

      return ((_model$value2 = model.value) != null ? _model$value2 : []).map(file => {
        const {
          name = '',
          size = 0
        } = file;
        return !props.showSize ? name : `${name} (${humanReadableFileSize(size, base.value)})`;
      });
    });
    const counterValue = computed(() => {
      var _model$value$length, _model$value3;

      const fileCount = (_model$value$length = (_model$value3 = model.value) == null ? void 0 : _model$value3.length) != null ? _model$value$length : 0;
      if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value);else return t(props.counterString, fileCount);
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const isFocused = ref(false);
    const inputRef = ref();
    const messages = computed(() => {
      return props.messages.length ? props.messages : props.persistentHint ? props.hint : '';
    });

    function onFocus() {
      if (inputRef.value !== document.activeElement) {
        var _inputRef$value;

        (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.focus();
      }

      if (!isFocused.value) {
        isFocused.value = true;
      }
    }

    function onControlClick(e) {
      var _inputRef$value2;

      (_inputRef$value2 = inputRef.value) == null ? void 0 : _inputRef$value2.click();
      emit('click:control', e);
    }

    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = [];

        if (inputRef != null && inputRef.value) {
          inputRef.value.value = '';
        }

        emit('click:clear', e);
      });
    }

    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || counterValue.value);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _,
        ...inputProps
      }] = filterInputProps(props);
      const [fieldProps] = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": "v-file-input"
      }, rootAttrs, inputProps, {
        "onClick:prepend": onControlClick,
        "messages": messages.value
      }), { ...slots,
        default: _ref3 => {
          let {
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref3;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "prepend-icon": props.prependIcon,
            "onClick:control": onControlClick,
            "onClick:clear": onClear
          }, fieldProps, {
            "active": isDirty.value || isFocused.value,
            "dirty": isDirty.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), { ...slots,
            default: _ref4 => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref4;
              return createVNode(Fragment, null, [createVNode("input", mergeProps({
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
                  var _target$files;

                  if (!e.target) return;
                  const target = e.target;
                  model.value = [...((_target$files = target.files) != null ? _target$files : [])];
                },
                "onFocus": onFocus,
                "onBlur": () => isFocused.value = false
              }, slotProps, inputAttrs), null), model.value.length > 0 && createVNode("div", {
                "class": fieldClass
              }, [slots.selection ? slots.selection({
                fileNames: fileNames.value,
                totalBytes: totalBytes.value,
                totalBytesReadable: totalBytesReadable.value
              }) : props.chips ? fileNames.value.map(text => createVNode(VChip, {
                "key": text,
                "size": "small",
                "color": props.color
              }, {
                default: () => [text]
              })) : fileNames.value.join(', ')])]);
            }
          });
        },
        details: hasCounter ? () => createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
          "value": counterValue.value
        }, slots.counter)]) : undefined
      });
    });
    return useForwardRef({}, vInputRef, vFieldRef, inputRef);
  }

});

const VFooter = defineComponent({
  name: 'VFooter',
  props: {
    color: String,
    ...makeBorderProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
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
    } = useBackgroundColor(toRef(props, 'color'));
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
      positionClasses,
      positionStyles
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    return () => createVNode(props.tag, {
      "class": ['v-footer', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
      "style": [backgroundColorStyles, dimensionStyles.value, positionStyles.value]
    }, slots);
  }

});

const VForm = defineComponent({
  name: 'VForm',
  props: { ...makeFormProps()
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
    const formRef = ref();

    function onReset(e) {
      e.preventDefault();
      form.reset();
    }

    function onSubmit(e) {
      e.preventDefault();
      form.validate().then(_ref2 => {
        let {
          valid
        } = _ref2;

        if (valid) {
          emit('submit', e);
        }
      });
    }

    useRender(() => {
      var _slots$default;

      return createVNode("form", {
        "ref": formRef,
        "class": "v-form",
        "novalidate": true,
        "onReset": onReset,
        "onSubmit": onSubmit
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, form)]);
    });
    return form;
  }

});

const VContainer = defineComponent({
  name: 'VContainer',
  props: {
    fluid: {
      type: Boolean,
      default: false
    },
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => createVNode(props.tag, {
      "class": ['v-container', {
        'v-container--fluid': props.fluid
      }]
    }, slots);
  }

});

// Styles

const breakpoints$1 = ['sm', 'md', 'lg', 'xl', 'xxl']; // no xs

const breakpointProps = (() => {
  return breakpoints$1.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();

const offsetProps = (() => {
  return breakpoints$1.reduce((props, val) => {
    props['offset' + capitalize(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const orderProps = (() => {
  return breakpoints$1.reduce((props, val) => {
    props['order' + capitalize(val)] = {
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
  } // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <v-col sm></v-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.


  if (type === 'col' && (val === '' || val === true)) {
    // .v-col-md
    return className.toLowerCase();
  } // .order-md-6


  className += `-${val}`;
  return className.toLowerCase();
}

const VCol = defineComponent({
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
      validator: str => ['auto', 'start', 'end', 'center', 'baseline', 'stretch'].includes(str)
    },
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = []; // Loop through `col`, `offset`, `order` breakpoint props

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
    return () => {
      var _slots$default;

      return h(props.tag, {
        class: classes.value
      }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
    };
  }

});

// Styles

const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl']; // no xs

const ALIGNMENT = ['start', 'end', 'center'];

function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    props[prefix + capitalize(val)] = def();
    return props;
  }, {});
}

const alignValidator = str => [...ALIGNMENT, 'baseline', 'stretch'].includes(str);

const alignProps = makeRowProps('align', () => ({
  type: String,
  default: null,
  validator: alignValidator
}));

const justifyValidator = str => [...ALIGNMENT, 'space-between', 'space-around'].includes(str);

const justifyProps = makeRowProps('justify', () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));

const alignContentValidator = str => [...ALIGNMENT, 'space-between', 'space-around', 'stretch'].includes(str);

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
  } // .align-items-sm-center


  className += `-${val}`;
  return className.toLowerCase();
}

const VRow = defineComponent({
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
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = []; // Loop through `align`, `justify`, `alignContent` breakpoint props

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
    return () => {
      var _slots$default;

      return h(props.tag, {
        class: ['v-row', classes.value]
      }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
    };
  }

});

const VSpacer = createSimpleFunctional('flex-grow-1', 'div', 'VSpacer');

// Composables
const VHover = defineComponent({
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
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        isHovering: isHovering.value,
        props: {
          onMouseenter: runOpenDelay,
          onMouseleave: runCloseDelay
        }
      });
    };
  }

});

const VItemGroupSymbol = Symbol.for('vuetify:v-item-group');
const VItemGroup = defineComponent({
  name: 'VItemGroup',
  props: { ...makeGroupProps({
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
    return () => {
      var _slots$default;

      return createVNode(props.tag, {
        "class": ['v-item-group', themeClasses.value]
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })]
      });
    };
  }

});

// Composables

const VItem = genericComponent()({
  name: 'VItem',
  props: makeGroupItemProps(),

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
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        isSelected: isSelected.value,
        selectedClass: selectedClass.value,
        select,
        toggle,
        value: value.value,
        disabled: disabled.value
      });
    };
  }

});

const VKbd = createSimpleFunctional('v-kbd');

const VLayout = defineComponent({
  name: 'VLayout',
  props: makeLayoutProps(),

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
    useRender(() => {
      var _slots$default;

      return createVNode("div", {
        "ref": layoutRef,
        "class": layoutClasses.value,
        "style": layoutStyles.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    });
    return {
      getLayoutItem,
      items
    };
  }

});

const VLayoutItem = defineComponent({
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
      priority: computed(() => parseInt(props.priority, 10)),
      position: toRef(props, 'position'),
      elementSize: toRef(props, 'size'),
      layoutSize: toRef(props, 'size'),
      active: toRef(props, 'modelValue'),
      absolute: toRef(props, 'absolute')
    });
    return () => {
      var _slots$default;

      return createVNode("div", {
        "class": ['v-layout-item'],
        "style": layoutItemStyles.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    };
  }

});

const VLazy = defineComponent({
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

    return () => {
      var _slots$default;

      return withDirectives(createVNode(props.tag, {
        "class": "v-lazy",
        "style": dimensionStyles.value
      }, {
        default: () => [isActive.value && createVNode(MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
        })]
      }), [[resolveDirective("intersect"), onIntersect, props.options]]);
    };
  }

});

const VLocaleProvider = defineComponent({
  name: 'VLocaleProvider',
  props: {
    locale: String,
    fallbackLocale: String,
    messages: Object,
    rtl: {
      type: Boolean,
      default: undefined
    }
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const localeInstance = provideLocale(props);
    const {
      rtlClasses
    } = provideRtl(props, localeInstance);
    return () => {
      var _slots$default;

      return createVNode("div", {
        "class": ['v-locale-provider', rtlClasses.value]
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]);
    };
  }

});

// Utilities

function useSsrBoot() {
  const isBooted = ref(false);
  onMounted(() => {
    window.requestAnimationFrame(() => {
      isBooted.value = true;
    });
  });
  const ssrBootStyles = computed(() => !isBooted.value ? {
    transition: 'none !important'
  } : undefined);
  return {
    ssrBootStyles
  };
}

const VMain = defineComponent({
  name: 'VMain',
  props: makeTagProps({
    tag: 'main'
  }),

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
    return () => {
      var _slots$default;

      return createVNode(props.tag, {
        "class": "v-main",
        "style": [mainStyles.value, ssrBootStyles.value]
      }, {
        default: () => [createVNode("div", {
          "class": "v-main__wrap"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]
      });
    };
  }

});

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
  } // if (samples[1].t > samples[0].t) {
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
  } // Guaranteed to have at least 3 points here
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
      var _touches$touch$identi;

      const samples = (_touches$touch$identi = touches[touch.identifier]) != null ? _touches$touch$identi : touches[touch.identifier] = new CircularBuffer(HISTORY);
      samples.push([e.timeStamp, touch]);
    });
  }

  function endTouch(e) {
    Array.from(e.changedTouches).forEach(touch => {
      delete touches[touch.identifier];
    });
  }

  function getVelocity(id) {
    var _touches$id;

    const samples = (_touches$id = touches[id]) == null ? void 0 : _touches$id.values().reverse();

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

function useTouch(_ref) {
  let {
    isActive,
    isTemporary,
    width,
    touchless,
    position
  } = _ref;
  onMounted(() => {
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
  onBeforeUnmount(() => {
    window.removeEventListener('touchstart', onTouchstart);
    window.removeEventListener('touchmove', onTouchmove);
    window.removeEventListener('touchend', onTouchend);
  });
  const isHorizontal = computed(() => position.value !== 'bottom');
  const {
    addMovement,
    endTouch,
    getVelocity
  } = useVelocity();
  let maybeDragging = false;
  const isDragging = ref(false);
  const dragProgress = ref(0);
  const offset = ref(0);
  let start;

  function getOffset(pos, active) {
    return (position.value === 'left' ? pos : position.value === 'right' ? document.documentElement.clientWidth - pos : position.value === 'bottom' ? document.documentElement.clientHeight - pos : oops()) - (active ? width.value : 0);
  }

  function getProgress(pos) {
    let limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const progress = position.value === 'left' ? (pos - offset.value) / width.value : position.value === 'right' ? (document.documentElement.clientWidth - pos - offset.value) / width.value : position.value === 'bottom' ? (document.documentElement.clientHeight - pos - offset.value) / width.value : oops();
    return limit ? Math.max(0, Math.min(1, progress)) : progress;
  }

  function onTouchstart(e) {
    if (touchless.value) return;
    const touchX = e.changedTouches[0].clientX;
    const touchY = e.changedTouches[0].clientY;
    const touchZone = 25;
    const inTouchZone = position.value === 'left' ? touchX < touchZone : position.value === 'right' ? touchX > document.documentElement.clientWidth - touchZone : position.value === 'bottom' ? touchY > document.documentElement.clientHeight - touchZone : oops();
    const inElement = isActive.value && (position.value === 'left' ? touchX < width.value : position.value === 'right' ? touchX > document.documentElement.clientWidth - width.value : position.value === 'bottom' ? touchY > document.documentElement.clientHeight - width.value : oops());

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
        bottom: 'up'
      }[position.value] || oops());
    } else {
      isActive.value = dragProgress.value > 0.5;
    }
  }

  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === 'left' ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === 'right' ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === 'bottom' ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
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

const VNavigationDrawer = defineComponent({
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
    rail: Boolean,
    railWidth: {
      type: [Number, String],
      default: 72
    },
    image: String,
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 256
    },
    position: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right', 'bottom'].includes(value)
    },
    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: 'nav'
    }),
    ...makeThemeProps()
  },
  emits: {
    'update:modelValue': val => true
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
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
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
    const isActive = useProxiedModel(props, 'modelValue');
    const isHovering = ref(false);
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));

    if (!props.disableResizeWatcher) {
      watch(isTemporary, val => !props.permanent && (isActive.value = !val));
    }

    if (!props.disableRouteWatcher && router) {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    }

    watch(() => props.permanent, val => {
      if (val) isActive.value = true;
    });
    onBeforeMount(() => {
      if (props.modelValue != null || isTemporary.value) return;
      isActive.value = props.permanent || !mobile.value;
    });
    const rootEl = ref();
    const {
      isDragging,
      dragProgress,
      dragStyles
    } = useTouch({
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, 'touchless'),
      position: toRef(props, 'position')
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutRect,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      priority: computed(() => parseInt(props.priority, 10)),
      position: toRef(props, 'position'),
      layoutSize,
      elementSize: width,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: toRef(props, 'absolute')
    });
    const scrimStyles = computed(() => ({ ...(isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: 'none'
      } : undefined),
      ...(layoutRect.value ? {
        left: convertToUnit(layoutRect.value.left),
        right: convertToUnit(layoutRect.value.right),
        top: convertToUnit(layoutRect.value.top),
        bottom: convertToUnit(layoutRect.value.bottom)
      } : undefined),
      ...layoutItemScrimStyles.value
    }));
    return () => {
      var _slots$image, _slots$prepend, _slots$default, _slots$append;

      const hasImage = slots.image || props.image;
      return createVNode(Fragment, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": () => isHovering.value = true,
        "onMouseleave": () => isHovering.value = false,
        "class": ['v-navigation-drawer', {
          'v-navigation-drawer--bottom': props.position === 'bottom',
          'v-navigation-drawer--end': props.position === 'right',
          'v-navigation-drawer--expand-on-hover': props.expandOnHover,
          'v-navigation-drawer--floating': props.floating,
          'v-navigation-drawer--is-hovering': isHovering.value,
          'v-navigation-drawer--rail': props.rail,
          'v-navigation-drawer--start': props.position === 'left',
          'v-navigation-drawer--temporary': isTemporary.value,
          'v-navigation-drawer--active': isActive.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, dragStyles.value]
      }, attrs), {
        default: () => [hasImage && createVNode("div", {
          "class": "v-navigation-drawer__img"
        }, [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots, {
          image: props.image
        }) : createVNode("img", {
          "src": props.image,
          "alt": ""
        }, null)]), slots.prepend && createVNode("div", {
          "class": "v-navigation-drawer__prepend"
        }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)]), createVNode("div", {
          "class": "v-navigation-drawer__content"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.append && createVNode("div", {
          "class": "v-navigation-drawer__append"
        }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)])]
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && createVNode("div", {
          "class": "v-navigation-drawer__scrim",
          "style": scrimStyles.value,
          "onClick": () => isActive.value = false
        }, null)]
      })]);
    };
  }

});

// Utilities
function useHydration(callback) {
  var _vm$root, _vm$root$appContext, _vm$root$appContext$a;

  if (!IN_BROWSER) return;
  const vm = getCurrentInstance('useHydration');
  const rootEl = vm == null ? void 0 : (_vm$root = vm.root) == null ? void 0 : (_vm$root$appContext = _vm$root.appContext) == null ? void 0 : (_vm$root$appContext$a = _vm$root$appContext.app) == null ? void 0 : _vm$root$appContext$a._container;
  return rootEl != null && rootEl.__vue_app__ ? callback() : onMounted(callback);
}

// Composables
const VNoSsr = defineComponent({
  name: 'VNoSsr',

  setup(_, _ref) {
    let {
      slots
    } = _ref;
    const show = ref(false);
    useHydration(() => show.value = true);
    return () => {
      var _slots$default;

      return show.value && ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
    };
  }

});

// Imports
function useRefs() {
  const refs = ref([]);
  onBeforeUpdate(() => refs.value = []);

  function updateRef(e, i) {
    refs.value[i] = e;
  }

  return {
    refs,
    updateRef
  };
}

const VPagination = defineComponent({
  name: 'VPagination',
  props: {
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
      type: String,
      default: '$first'
    },
    prevIcon: {
      type: String,
      default: '$prev'
    },
    nextIcon: {
      type: String,
      default: '$next'
    },
    lastIcon: {
      type: String,
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
    ...makeRoundedProps(),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
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
    const maxButtons = ref(-1);
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
      const itemWidth = firstItem.getBoundingClientRect().width + 10;
      maxButtons.value = Math.max(0, Math.floor((totalWidth - 96) / itemWidth));
    });
    const length = computed(() => parseInt(props.length, 10));
    const start = computed(() => parseInt(props.start, 10));
    const totalVisible = computed(() => {
      var _props$totalVisible;

      if (props.totalVisible) return Math.min(parseInt((_props$totalVisible = props.totalVisible) != null ? _props$totalVisible : '', 10), length.value);else if (maxButtons.value >= 0) return maxButtons.value;
      return length.value;
    });
    const range = computed(() => {
      if (length.value <= 0) return [];

      if (totalVisible.value <= 3) {
        return [Math.min(Math.max(start.value, page.value), start.value + length.value)];
      }

      if (props.length <= totalVisible.value) {
        return createRange(length.value, start.value);
      }

      const middle = Math.ceil(totalVisible.value / 2);
      const left = middle;
      const right = length.value - middle;

      if (page.value < left) {
        return [...createRange(Math.max(1, totalVisible.value - 2), start.value), props.ellipsis, length.value];
      } else if (page.value > right) {
        const rangeLength = totalVisible.value - 2;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 4);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    }); // TODO: 'first' | 'prev' | 'next' | 'last' does not work here?

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
      VBtn: {
        border: toRef(props, 'border'),
        density: toRef(props, 'density'),
        size: toRef(props, 'size'),
        variant: toRef(props, 'variant')
      }
    });
    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref = e => updateRef(e, index);

        if (typeof item === 'string') {
          return {
            isActive: false,
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
            page: n(item),
            props: {
              ref,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || props.length < 2,
              elevation: props.elevation,
              rounded: props.rounded,
              color: isActive ? props.color : undefined,
              ariaCurrent: isActive,
              ariaLabel: t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, index + 1),
              onClick: e => setValue(e, item)
            }
          };
        }
      });
    });
    const controls = computed(() => {
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
      var _refs$value$currentIn;

      const currentIndex = page.value - start.value;
      (_refs$value$currentIn = refs.value[currentIndex]) == null ? void 0 : _refs$value$currentIn.$el.focus();
    }

    function onKeydown(e) {
      if (e.key === keyValues.left && !props.disabled && page.value > props.start) {
        page.value = page.value - 1;
        nextTick(updateFocus);
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        nextTick(updateFocus);
      }
    }

    return () => createVNode(props.tag, {
      "ref": resizeRef,
      "class": ['v-pagination', themeClasses.value],
      "role": "navigation",
      "aria-label": t(props.ariaLabel),
      "onKeydown": onKeydown,
      "data-test": "v-pagination-root"
    }, {
      default: () => [createVNode("ul", {
        "class": "v-pagination__list"
      }, [props.showFirstLastPage && createVNode("li", {
        "class": "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [slots.first ? slots.first(controls.value.first) : createVNode(VBtn, controls.value.first, null)]), createVNode("li", {
        "class": "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [slots.prev ? slots.prev(controls.value.prev) : createVNode(VBtn, controls.value.prev, null)]), items.value.map((item, index) => createVNode("li", {
        "key": `${index}_${item.page}`,
        "class": ['v-pagination__item', {
          'v-pagination__item--is-active': item.isActive
        }],
        "data-test": "v-pagination-item"
      }, [slots.item ? slots.item(item) : createVNode(VBtn, item.props, {
        default: () => [item.page]
      })])), createVNode("li", {
        "class": "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [slots.next ? slots.next(controls.value.next) : createVNode(VBtn, controls.value.next, null)]), props.showFirstLastPage && createVNode("li", {
        "class": "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [slots.last ? slots.last(controls.value.last) : createVNode(VBtn, controls.value.last, null)])])]
    });
  }

});

function floor(val) {
  return Math.floor(Math.abs(val)) * Math.sign(val);
}

const VParallax = defineComponent({
  name: 'VParallax',
  props: {
    scale: {
      type: [Number, String],
      default: 1.3
    }
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const root = ref();
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    watchEffect(() => {
      var _root$value;

      intersectionRef.value = (_root$value = root.value) == null ? void 0 : _root$value.$el;
    });
    let scrollParent;
    watch(isIntersecting, val => {
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
    onBeforeUnmount(() => {
      var _scrollParent;

      (_scrollParent = scrollParent) == null ? void 0 : _scrollParent.removeEventListener('scroll', onScroll);
    });
    let frame = -1;

    function onScroll() {
      if (!isIntersecting.value) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        var _root$value2, _scrollParent$clientH, _scrollParent$scrollT;

        const el = ((_root$value2 = root.value) == null ? void 0 : _root$value2.$el).querySelector('.v-img__img');
        if (!el) return;
        const rect = intersectionRef.value.getBoundingClientRect();
        const scrollHeight = (_scrollParent$clientH = scrollParent.clientHeight) != null ? _scrollParent$clientH : window.innerHeight;
        const scrollPos = (_scrollParent$scrollT = scrollParent.scrollTop) != null ? _scrollParent$scrollT : window.scrollY;
        const top = rect.top + scrollPos;
        const progress = (scrollPos + scrollHeight - top) / (rect.height + scrollHeight);
        const translate = floor((rect.height * +props.scale - rect.height) * (-progress + 0.5));
        el.style.setProperty('transform', `translateY(${translate}px) scale(${props.scale})`);
      });
    }

    return () => createVNode(VImg, {
      "class": ['v-parallax', {
        'v-parallax--active': isIntersecting.value
      }],
      "ref": root,
      "cover": true,
      "onLoadstart": onScroll,
      "onLoad": onScroll
    }, slots);
  }

});

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
    const root = ref();
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
    } = useTextColor(toRef(props, 'color'));
    const {
      textColorClasses: underlayColorClasses,
      textColorStyles: underlayColorStyles
    } = useTextColor(toRef(props, 'bgColor'));
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const normalizedValue = computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
    const width = computed(() => Number(props.width));
    const size = computed(() => {
      // Get size from element if size prop value is small, large etc
      return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
    });
    const diameter = computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
    const strokeWidth = computed(() => width.value / size.value * diameter.value);
    const strokeDashOffset = computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
    watchEffect(() => {
      intersectionRef.value = root.value;
      resizeRef.value = root.value;
    });
    return () => createVNode(props.tag, {
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
      default: () => [createVNode("svg", {
        "style": {
          transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
        },
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": `0 0 ${diameter.value} ${diameter.value}`
      }, [createVNode("circle", {
        "class": ['v-progress-circular__underlay', underlayColorClasses.value],
        "style": underlayColorStyles.value,
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": 0
      }, null), createVNode("circle", {
        "class": "v-progress-circular__overlay",
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": strokeDashOffset.value
      }, null)]), slots.default && createVNode("div", {
        "class": "v-progress-circular__content"
      }, [slots.default({
        value: normalizedValue.value
      })])]
    });
  }

});

const VRadio = defineComponent$1({
  name: 'VRadio',
  props: {
    falseIcon: {
      type: String,
      default: '$radioOff'
    },
    trueIcon: {
      type: String,
      default: '$radioOn'
    }
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VSelectionControl, {
      "class": "v-radio",
      "trueIcon": props.trueIcon,
      "falseIcon": props.falseIcon,
      "type": "radio"
    }, slots));
    return {};
  }

});

const VRadioGroup = defineComponent$1({
  name: 'VRadioGroup',
  inheritAttrs: false,
  props: {
    height: {
      type: [Number, String],
      default: 'auto'
    },
    ...makeVInputProps(),
    ...makeSelectionControlProps(),
    trueIcon: {
      type: String,
      default: '$radioOn'
    },
    falseIcon: {
      type: String,
      default: '$radioOff'
    },
    type: {
      type: String,
      default: 'radio'
    }
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const uid = getUid();
    const id = computed(() => props.id || `radio-group-${uid}`);
    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
      const [inputProps, _1] = filterInputProps(props);
      const [controlProps, _2] = filterControlProps(props);
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return createVNode(VInput, mergeProps({
        "class": "v-radio-group"
      }, inputAttrs, inputProps), { ...slots,
        default: _ref2 => {
          let {
            isDisabled,
            isReadonly
          } = _ref2;
          return createVNode(Fragment, null, [label && createVNode(VLabel, {
            "for": id.value
          }, {
            default: () => [label]
          }), createVNode(VSelectionControlGroup, mergeProps(controlProps, {
            "id": id.value,
            "trueIcon": props.trueIcon,
            "falseIcon": props.falseIcon,
            "type": props.type,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value
          }, controlAttrs), slots)]);
        }
      });
    });
    return {};
  }

});

const VRangeSlider = defineComponent$1({
  name: 'VRangeSlider',
  props: { ...makeFocusProps(),
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
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const startThumbRef = ref();
    const stopThumbRef = ref();
    const inputRef = ref();

    function getActiveThumb(e) {
      if (!startThumbRef.value || !stopThumbRef.value) return;
      const startOffset = getOffset(e, startThumbRef.value.$el, props.direction);
      const stopOffset = getOffset(e, stopThumbRef.value.$el, props.direction);
      const a = Math.abs(startOffset);
      const b = Math.abs(stopOffset);
      return a < b || a === b && startOffset < 0 ? startThumbRef.value.$el : stopThumbRef.value.$el;
    }

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
      activeThumbRef
    } = useSlider({
      /* eslint-disable @typescript-eslint/no-use-before-define */
      props,
      handleSliderMouseUp: newValue => {
        var _startThumbRef$value;

        model.value = activeThumbRef.value === ((_startThumbRef$value = startThumbRef.value) == null ? void 0 : _startThumbRef$value.$el) ? [newValue, model.value[1]] : [model.value[0], newValue];
      },
      handleMouseMove: newValue => {
        var _startThumbRef$value3;

        const [start, stop] = model.value;

        if (!props.strict && start === stop && start !== min.value) {
          var _stopThumbRef$value, _startThumbRef$value2, _activeThumbRef$value;

          activeThumbRef.value = newValue > start ? (_stopThumbRef$value = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value.$el : (_startThumbRef$value2 = startThumbRef.value) == null ? void 0 : _startThumbRef$value2.$el;
          (_activeThumbRef$value = activeThumbRef.value) == null ? void 0 : _activeThumbRef$value.focus();
        }

        if (activeThumbRef.value === ((_startThumbRef$value3 = startThumbRef.value) == null ? void 0 : _startThumbRef$value3.$el)) {
          model.value = [Math.min(newValue, stop), stop];
        } else {
          model.value = [start, Math.max(start, newValue)];
        }
      },
      getActiveThumb
      /* eslint-enable @typescript-eslint/no-use-before-define */

    });
    const model = useProxiedModel(props, 'modelValue', undefined, arr => {
      if (!arr || !arr.length) return [0, 0];
      return arr.map(value => roundValue(value));
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStart = computed(() => position(model.value[0]));
    const trackStop = computed(() => position(model.value[1]));
    return () => {
      const [inputProps, _] = filterInputProps(props);
      return createVNode(VInput, mergeProps({
        "class": ['v-slider', 'v-range-slider', {
          'v-slider--has-labels': !!slots['tick-label'] || hasLabels.value,
          'v-slider--focused': isFocused.value,
          'v-slider--pressed': mousePressed.value,
          'v-slider--disabled': props.disabled
        }],
        "ref": inputRef
      }, inputProps, {
        "focused": isFocused.value
      }), { ...slots,
        default: _ref2 => {
          var _startThumbRef$value4, _stopThumbRef$value4;

          let {
            id
          } = _ref2;
          return createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": onSliderMousedown,
            "onTouchstartPassive": onSliderTouchstart
          }, [createVNode("input", {
            "id": `${id.value}_start`,
            "name": props.name || id.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value[0]
          }, null), createVNode("input", {
            "id": `${id.value}_stop`,
            "name": props.name || id.value,
            "disabled": props.disabled,
            "readonly": props.readonly,
            "tabindex": "-1",
            "value": model.value[1]
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": trackStart.value,
            "stop": trackStop.value
          }, {
            'tick-label': slots['tick-label']
          }), createVNode(VSliderThumb, {
            "ref": startThumbRef,
            "focused": isFocused && activeThumbRef.value === ((_startThumbRef$value4 = startThumbRef.value) == null ? void 0 : _startThumbRef$value4.$el),
            "modelValue": model.value[0],
            "onUpdate:modelValue": v => model.value = [v, model.value[1]],
            "onFocus": e => {
              var _startThumbRef$value5, _stopThumbRef$value2;

              focus();
              activeThumbRef.value = (_startThumbRef$value5 = startThumbRef.value) == null ? void 0 : _startThumbRef$value5.$el; // Make sure second thumb is focused if
              // the thumbs are on top of each other
              // and they are both at minimum value
              // but only if focused from outside.

              if (model.value[0] === model.value[1] && model.value[1] === min.value && e.relatedTarget !== ((_stopThumbRef$value2 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value2.$el)) {
                var _startThumbRef$value6, _stopThumbRef$value3;

                (_startThumbRef$value6 = startThumbRef.value) == null ? void 0 : _startThumbRef$value6.$el.blur();
                (_stopThumbRef$value3 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value3.$el.focus();
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
          }), createVNode(VSliderThumb, {
            "ref": stopThumbRef,
            "focused": isFocused && activeThumbRef.value === ((_stopThumbRef$value4 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value4.$el),
            "modelValue": model.value[1],
            "onUpdate:modelValue": v => model.value = [model.value[0], v],
            "onFocus": e => {
              var _stopThumbRef$value5, _startThumbRef$value7;

              focus();
              activeThumbRef.value = (_stopThumbRef$value5 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value5.$el; // Make sure first thumb is focused if
              // the thumbs are on top of each other
              // and they are both at maximum value
              // but only if focused from outside.

              if (model.value[0] === model.value[1] && model.value[0] === max.value && e.relatedTarget !== ((_startThumbRef$value7 = startThumbRef.value) == null ? void 0 : _startThumbRef$value7.$el)) {
                var _stopThumbRef$value6, _startThumbRef$value8;

                (_stopThumbRef$value6 = stopThumbRef.value) == null ? void 0 : _stopThumbRef$value6.$el.blur();
                (_startThumbRef$value8 = startThumbRef.value) == null ? void 0 : _startThumbRef$value8.$el.focus();
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
    };
  }

});

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
      type: String,
      default: '$ratingEmpty'
    },
    fullIcon: {
      type: String,
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
      type: Number,
      default: 0
    },
    itemLabels: Array,
    itemLabelPosition: {
      type: String,
      default: 'top',
      validator: v => ['top', 'bottom'].includes(v)
    },
    ripple: Boolean,
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
    const range = computed(() => createRange(Number(props.length), 1));
    const increments = computed(() => range.value.flatMap(v => props.halfIncrements ? [v - 0.5, v] : [v]));
    const hoverIndex = ref(-1);
    const focusIndex = ref(-1);
    const firstRef = ref();
    let isClicking = false;
    const itemState = computed(() => increments.value.map(value => {
      var _props$activeColor;

      const isHovering = props.hover && hoverIndex.value > -1;
      const isFilled = rating.value >= value;
      const isHovered = hoverIndex.value >= value;
      const isFullIcon = isHovering ? isHovered : isFilled;
      const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
      const activeColor = (_props$activeColor = props.activeColor) != null ? _props$activeColor : props.color;
      const color = isFilled || isHovered ? activeColor : props.color;
      return {
        isFilled,
        isHovered,
        icon,
        color
      };
    }));
    const eventState = computed(() => [0, ...increments.value].map(value => {
      function onMouseenter() {
        hoverIndex.value = value;
      }

      function onMouseleave() {
        hoverIndex.value = -1;
      }

      function onFocus() {
        if (value === 0 && rating.value === 0) {
          var _firstRef$value;

          (_firstRef$value = firstRef.value) == null ? void 0 : _firstRef$value.focus();
        } else {
          focusIndex.value = value;
        }
      }

      function onBlur() {
        if (!isClicking) focusIndex.value = -1;
      }

      function onClick() {
        if (props.disabled || props.readonly) return;
        rating.value = rating.value === value && props.clearable ? 0 : value;
      }

      return {
        onMouseenter: props.hover ? onMouseenter : undefined,
        onMouseleave: props.hover ? onMouseleave : undefined,
        onFocus,
        onBlur,
        onClick
      };
    }));

    function onMousedown() {
      isClicking = true;
    }

    function onMouseup() {
      isClicking = false;
    }

    const name = computed(() => {
      var _props$name;

      return (_props$name = props.name) != null ? _props$name : `v-rating-${getUid()}`;
    });

    function VRatingItem(_ref2) {
      var _itemState$value$inde, _itemState$value$inde2;

      let {
        value,
        index,
        showStar = true
      } = _ref2;
      const {
        onMouseenter,
        onMouseleave,
        onFocus,
        onBlur,
        onClick
      } = eventState.value[index + 1];
      const id = `${name.value}-${String(value).replace('.', '-')}`;
      const btnProps = {
        color: (_itemState$value$inde = itemState.value[index]) == null ? void 0 : _itemState$value$inde.color,
        density: props.density,
        disabled: props.disabled,
        icon: (_itemState$value$inde2 = itemState.value[index]) == null ? void 0 : _itemState$value$inde2.icon,
        ripple: props.ripple,
        size: props.size,
        tag: 'span',
        variant: 'plain'
      };
      return createVNode(Fragment, null, [createVNode("label", {
        "for": id,
        "class": {
          'v-rating__item--half': props.halfIncrements && value % 1 > 0,
          'v-rating__item--full': props.halfIncrements && value % 1 === 0
        },
        "onMousedown": onMousedown,
        "onMouseup": onMouseup,
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave
      }, [createVNode("span", {
        "class": "v-rating__hidden"
      }, [t(props.itemAriaLabel, value, props.length)]), !showStar ? undefined : slots.item ? slots.item({ ...itemState.value[index],
        props: btnProps,
        value,
        index
      }) : createVNode(VBtn, btnProps, null)]), createVNode("input", {
        "class": "v-rating__hidden",
        "name": name.value,
        "id": id,
        "type": "radio",
        "value": value,
        "checked": rating.value === value,
        "onClick": onClick,
        "onFocus": onFocus,
        "onBlur": onBlur,
        "ref": index === 0 ? firstRef : undefined,
        "readonly": props.readonly,
        "disabled": props.disabled
      }, null)]);
    }

    return () => {
      var _props$itemLabels;

      const hasLabels = !!((_props$itemLabels = props.itemLabels) != null && _props$itemLabels.length) || slots['item-label'];
      return createVNode(props.tag, {
        "class": ['v-rating', {
          'v-rating--hover': props.hover,
          'v-rating--readonly': props.readonly
        }, themeClasses.value]
      }, {
        default: () => [createVNode(VRatingItem, {
          "value": 0,
          "index": -1,
          "showStar": false
        }, null), range.value.map((value, i) => {
          var _props$itemLabels2, _props$itemLabels3;

          return createVNode("div", {
            "class": "v-rating__wrapper"
          }, [!hasLabels ? undefined : slots['item-label'] ? slots['item-label']({
            value,
            index: i,
            label: (_props$itemLabels2 = props.itemLabels) == null ? void 0 : _props$itemLabels2[i]
          }) : (_props$itemLabels3 = props.itemLabels) != null && _props$itemLabels3[i] ? createVNode("span", null, [props.itemLabels[i]]) : createVNode("span", null, [createTextVNode("\xA0")]), createVNode("div", {
            "class": ['v-rating__item', {
              'v-rating__item--focused': Math.ceil(focusIndex.value) === value
            }]
          }, [props.halfIncrements ? createVNode(Fragment, null, [createVNode(VRatingItem, {
            "value": value - 0.5,
            "index": i * 2
          }, null), createVNode(VRatingItem, {
            "value": value,
            "index": i * 2 + 1
          }, null)]) : createVNode(VRatingItem, {
            "value": value,
            "index": i
          }, null)])]);
        })]
      });
    };
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
  const adjustedOffsetStart = isRtl ? contentSize - offsetStart - clientSize : offsetStart;

  if (isRtl) {
    currentScrollOffset = -currentScrollOffset;
  }

  const totalSize = containerSize + currentScrollOffset;
  const itemOffset = clientSize + adjustedOffsetStart;
  const additionalOffset = clientSize * 0.4;

  if (adjustedOffsetStart <= currentScrollOffset) {
    currentScrollOffset = Math.max(adjustedOffsetStart - additionalOffset, 0);
  } else if (totalSize <= itemOffset) {
    currentScrollOffset = Math.min(currentScrollOffset - (totalSize - itemOffset - additionalOffset), contentSize - containerSize);
  }

  return isRtl ? -currentScrollOffset : currentScrollOffset;
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

  if (isRtl) {
    const offsetCentered = contentSize - offsetStart - clientSize / 2 - containerSize / 2;
    return -Math.min(contentSize - containerSize, Math.max(0, offsetCentered));
  } else {
    const offsetCentered = offsetStart + clientSize / 2 - containerSize / 2;
    return Math.min(contentSize - containerSize, Math.max(0, offsetCentered));
  }
}

const VSlideGroupSymbol = Symbol.for('vuetify:v-slide-group');
const VSlideGroup = defineComponent({
  name: 'VSlideGroup',
  props: {
    activeClass: {
      type: String,
      default: 'v-slide-item--active'
    },
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
      type: String,
      default: '$next'
    },
    prevIcon: {
      type: String,
      default: '$prev'
    },
    showArrows: {
      type: [Boolean, String],
      validator: v => typeof v === 'boolean' || ['always', 'desktop', 'mobile'].includes(v)
    },
    ...makeTagProps(),
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
      isRtl
    } = useRtl();
    const {
      mobile
    } = useDisplay();
    const group = useGroup(props, props.symbol);
    const isOverflowing = ref(false);
    const scrollOffset = ref(0);
    const containerSize = ref(0);
    const contentSize = ref(0);
    const isHorizontal = computed(() => props.direction === 'horizontal');
    const {
      resizeRef: containerRef,
      contentRect: containerRect
    } = useResizeObserver();
    const contentRef = ref();
    watchEffect(() => {
      if (!containerRect.value || !contentRef.value) return;
      const sizeProperty = isHorizontal.value ? 'width' : 'height';
      containerSize.value = containerRect.value[sizeProperty];
      contentSize.value = contentRef.value.getBoundingClientRect()[sizeProperty];
      isOverflowing.value = containerSize.value + 1 < contentSize.value;
    });
    watch(group.selected, selected => {
      if (!selected.length || !contentRef.value) return;
      const index = group.items.value.findIndex(item => item.id === selected[selected.length - 1]); // TODO: Is this too naive? Should we store element references in group composable?

      const selectedElement = contentRef.value.children[index];

      if (index === 0 || !isOverflowing.value) {
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
    });
    const disableTransition = ref(false);
    let startTouch = 0;
    let startOffset = 0;

    function onTouchstart(e) {
      const sizeProperty = isHorizontal.value ? 'clientX' : 'clientY';
      startOffset = scrollOffset.value;
      startTouch = e.touches[0][sizeProperty];
      disableTransition.value = true;
    }

    function onTouchmove(e) {
      if (!isOverflowing.value) return;
      const sizeProperty = isHorizontal.value ? 'clientX' : 'clientY';
      scrollOffset.value = startOffset + startTouch - e.touches[0][sizeProperty];
    }

    function onTouchend(e) {
      const maxScrollOffset = contentSize.value - containerSize.value;

      if (isRtl.value) {
        if (scrollOffset.value > 0 || !isOverflowing.value) {
          scrollOffset.value = 0;
        } else if (scrollOffset.value <= -maxScrollOffset) {
          scrollOffset.value = -maxScrollOffset;
        }
      } else {
        if (scrollOffset.value < 0 || !isOverflowing.value) {
          scrollOffset.value = 0;
        } else if (scrollOffset.value >= maxScrollOffset) {
          scrollOffset.value = maxScrollOffset;
        }
      }

      disableTransition.value = false;
    }

    function onScroll() {
      containerRef.value && (containerRef.value.scrollLeft = 0);
    }

    const isFocused = ref(false);

    function onFocusin(e) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.value) return; // Focused element is likely to be the root of an item, so a
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
      var _contentRef$value;

      if (!isFocused.value && !(e.relatedTarget && (_contentRef$value = contentRef.value) != null && _contentRef$value.contains(e.relatedTarget))) focus();
    }

    function onKeydown(e) {
      if (!contentRef.value) return;

      if (e.key === (isHorizontal.value ? 'ArrowRight' : 'ArrowDown')) {
        focus('next');
      } else if (e.key === (isHorizontal.value ? 'ArrowLeft' : 'ArrowUp')) {
        focus('prev');
      } else if (e.key === 'Home') {
        focus('first');
      } else if (e.key === 'End') {
        focus('last');
      }
    }

    function focus(location) {
      if (!contentRef.value) return;

      if (!location) {
        var _focusable$;

        contentRef.value.querySelector('[tabindex]');
        const focusable = [...contentRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(el => !el.hasAttribute('disabled'));
        (_focusable$ = focusable[0]) == null ? void 0 : _focusable$.focus();
      } else if (location === 'next') {
        var _contentRef$value$que;

        const el = (_contentRef$value$que = contentRef.value.querySelector(':focus')) == null ? void 0 : _contentRef$value$que.nextElementSibling;
        if (el) el.focus();else focus('first');
      } else if (location === 'prev') {
        var _contentRef$value$que2;

        const el = (_contentRef$value$que2 = contentRef.value.querySelector(':focus')) == null ? void 0 : _contentRef$value$que2.previousElementSibling;
        if (el) el.focus();else focus('last');
      } else if (location === 'first') {
        var _contentRef$value$fir;

        (_contentRef$value$fir = contentRef.value.firstElementChild) == null ? void 0 : _contentRef$value$fir.focus();
      } else if (location === 'last') {
        var _contentRef$value$las;

        (_contentRef$value$las = contentRef.value.lastElementChild) == null ? void 0 : _contentRef$value$las.focus();
      }
    }

    function scrollTo(location) {
      const sign = isRtl.value ? -1 : 1;
      const newAbosluteOffset = sign * scrollOffset.value + (location === 'prev' ? -1 : 1) * containerSize.value;
      scrollOffset.value = sign * clamp(newAbosluteOffset, 0, contentSize.value - containerSize.value);
    }

    const contentStyles = computed(() => {
      const scrollAmount = scrollOffset.value <= 0 ? bias(-scrollOffset.value) : scrollOffset.value > contentSize.value - containerSize.value ? -(contentSize.value - containerSize.value) + bias(contentSize.value - containerSize.value - scrollOffset.value) : -scrollOffset.value;
      return {
        transform: `translate${isHorizontal.value ? 'X' : 'Y'}(${scrollAmount}px)`,
        transition: disableTransition.value ? 'none' : '',
        willChange: disableTransition.value ? 'transform' : ''
      };
    });
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        // Always show arrows on desktop & mobile
        case 'always':
          return true;
        // Always show arrows on desktop

        case 'desktop':
          return mobile.value;
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
    const hasPrev = computed(() => {
      return hasAffixes.value && scrollOffset.value > 0;
    });
    const hasNext = computed(() => {
      if (!hasAffixes.value) return false; // Check one scroll ahead to know the width of right-most item

      return contentSize.value > Math.abs(scrollOffset.value) + containerSize.value;
    });
    useRender(() => {
      var _slots$prev, _slots$prev2, _slots$default, _slots$next, _slots$next2;

      return createVNode(props.tag, {
        "class": ['v-slide-group', {
          'v-slide-group--vertical': !isHorizontal.value,
          'v-slide-group--has-affixes': hasAffixes.value,
          'v-slide-group--is-overflowing': isOverflowing.value
        }],
        "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
        "onFocus": onFocus
      }, {
        default: () => [hasAffixes.value && createVNode("div", {
          "class": ['v-slide-group__prev', {
            'v-slide-group__prev--disabled': !hasPrev.value
          }],
          "onClick": () => scrollTo('prev')
        }, [(_slots$prev = (_slots$prev2 = slots.prev) == null ? void 0 : _slots$prev2.call(slots, slotProps.value)) != null ? _slots$prev : createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": props.prevIcon
          }, null)]
        })]), createVNode("div", {
          "ref": containerRef,
          "class": "v-slide-group__container",
          "onScroll": onScroll
        }, [createVNode("div", {
          "ref": contentRef,
          "class": "v-slide-group__content",
          "style": contentStyles.value,
          "onTouchstartPassive": onTouchstart,
          "onTouchmovePassive": onTouchmove,
          "onTouchendPassive": onTouchend,
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onKeydown": onKeydown
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value)])]), hasAffixes.value && createVNode("div", {
          "class": ['v-slide-group__next', {
            'v-slide-group__next--disabled': !hasNext.value
          }],
          "onClick": () => scrollTo('next')
        }, [(_slots$next = (_slots$next2 = slots.next) == null ? void 0 : _slots$next2.call(slots, slotProps.value)) != null ? _slots$next : createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": props.nextIcon
          }, null)]
        })])]
      });
    });
    return {
      selected: group.selected,
      scrollTo,
      scrollOffset,
      focus
    };
  }

});

// Composables
const VSlideGroupItem = defineComponent({
  name: 'VSlideGroupItem',
  props: { ...makeGroupItemProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slideGroupItem = useGroupItem(props, VSlideGroupSymbol);
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        isSelected: slideGroupItem.isSelected.value,
        select: slideGroupItem.select
      });
    };
  }

});

const VSnackbar = defineComponent({
  name: 'VSnackbar',
  props: {
    app: Boolean,
    centered: Boolean,
    contentClass: {
      type: String,
      default: ''
    },
    multiLine: Boolean,
    timeout: {
      type: [Number, String],
      default: 5000
    },
    vertical: Boolean,
    modelValue: Boolean,
    ...makePositionProps(),
    ...makeVariantProps(),
    ...makeTransitionProps({
      transition: 'v-snackbar-transition'
    })
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
      positionClasses,
      positionStyles
    } = usePosition(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    watch(isActive, startTimeout);
    watch(() => props.timeout, startTimeout);
    onMounted(() => {
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
      var _slots$default, _slots$actions;

      return createVNode("div", {
        "class": ['v-snackbar', {
          'v-snackbar--active': isActive.value,
          'v-snackbar--bottom': props.bottom || !props.top,
          'v-snackbar--centered': props.centered,
          'v-snackbar--end': props.right,
          'v-snackbar--multi-line': props.multiLine && !props.vertical,
          'v-snackbar--start': props.left,
          'v-snackbar--top': props.top,
          'v-snackbar--vertical': props.vertical
        }, positionClasses.value],
        "style": [colorStyles.value, positionStyles.value]
      }, [createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": ['v-snackbar__wrapper', colorClasses.value, variantClasses.value],
          "onPointerenter": onPointerenter,
          "onPointerleave": startTimeout
        }, [genOverlays(false, 'v-snackbar'), slots.default && createVNode("div", {
          "class": ['v-snackbar__content', props.contentClass],
          "role": "status",
          "aria-live": "polite"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.actions && createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              variant: 'text',
              ripple: false
            }
          }
        }, {
          default: () => [createVNode("div", {
            "class": "v-snackbar__actions"
          }, [(_slots$actions = slots.actions) == null ? void 0 : _slots$actions.call(slots)])]
        })]), [[vShow, isActive.value]])]
      })]);
    });
  }

});

const VSwitch = defineComponent$1({
  name: 'VSwitch',
  inheritAttrs: false,
  props: {
    indeterminate: Boolean,
    inset: Boolean,
    flat: Boolean,
    ...makeLoaderProps(),
    ...makeVInputProps(),
    ...makeSelectionControlProps()
  },
  emits: {
    'update:indeterminate': val => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, 'indeterminate');
    const {
      loaderClasses
    } = useLoader(props);
    const loaderColor = computed(() => {
      return typeof props.loading === 'string' && props.loading !== '' ? props.loading : props.color;
    });

    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }

    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
      const [inputProps, _1] = filterInputProps(props);
      const [controlProps, _2] = filterControlProps(props);
      const control = ref();

      function onClick() {
        var _control$value, _control$value$input;

        (_control$value = control.value) == null ? void 0 : (_control$value$input = _control$value.input) == null ? void 0 : _control$value$input.click();
      }

      return createVNode(VInput, mergeProps({
        "class": ['v-switch', {
          'v-switch--inset': props.inset
        }, {
          'v-switch--indeterminate': indeterminate.value
        }, loaderClasses.value]
      }, inputAttrs, inputProps), { ...slots,
        default: _ref2 => {
          let {
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VSelectionControl, mergeProps({
            "ref": control
          }, controlProps, {
            "type": "checkbox",
            "onUpdate:modelValue": onChange,
            "aria-checked": indeterminate.value ? 'mixed' : undefined,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value
          }, controlAttrs), {
            default: () => createVNode("div", {
              "class": "v-switch__track",
              "onClick": onClick
            }, null),
            input: _ref3 => {
              let {
                textColorClasses
              } = _ref3;
              return createVNode("div", {
                "class": ['v-switch__thumb', textColorClasses.value]
              }, [props.loading && createVNode(LoaderSlot, {
                "name": "v-switch",
                "active": true,
                "color": isValid.value === false ? undefined : loaderColor.value
              }, {
                default: slotProps => slots.loader ? slots.loader(slotProps) : createVNode(VProgressCircular, {
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

const VSystemBar = defineComponent({
  name: 'VSystemBar',
  props: {
    color: String,
    window: Boolean,
    ...makeDimensionProps(),
    ...makeElevationProps(),
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
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      positionClasses,
      positionStyles
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    return () => createVNode(props.tag, {
      "class": ['v-system-bar', {
        'v-system-bar--window': props.window
      }, themeClasses.value, backgroundColorClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
      "style": [backgroundColorStyles.value, dimensionStyles.value, positionStyles.value]
    }, slots);
  }

});

const VTab = defineComponent({
  name: 'VTab',
  props: {
    fixed: Boolean,
    icon: [Boolean, String],
    prependIcon: String,
    appendIcon: String,
    stacked: Boolean,
    title: String,
    ripple: {
      type: Boolean,
      default: true
    },
    color: String,
    sliderColor: String,
    hideSlider: Boolean,
    direction: {
      type: String,
      default: 'horizontal'
    },
    ...makeTagProps(),
    ...makeRouterProps(),
    ...makeGroupItemProps({
      selectedClass: 'v-tab--selected'
    }),
    ...makeThemeProps()
  },

  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      isSelected,
      select,
      selectedClass
    } = useGroupItem(props, VTabsSymbol);
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(props, 'sliderColor');
    const isHorizontal = computed(() => props.direction === 'horizontal');
    provideDefaults({
      VBtn: {
        block: toRef(props, 'fixed'),
        maxWidth: computed(() => props.fixed ? 300 : undefined),
        color: computed(() => isSelected.value ? props.color : undefined),
        variant: 'text',
        rounded: 0
      }
    }, {
      scoped: true
    });
    const rootEl = ref();
    const sliderEl = ref();
    watch(isSelected, isSelected => {
      if (isSelected) {
        var _rootEl$value, _rootEl$value$$el$par;

        const prevEl = (_rootEl$value = rootEl.value) == null ? void 0 : (_rootEl$value$$el$par = _rootEl$value.$el.parentElement) == null ? void 0 : _rootEl$value$$el$par.querySelector('.v-tab--selected .v-tab__slider');
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
        nextEl.animate({
          backgroundColor: [color, ''],
          transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, ''],
          transformOrigin: Array(3).fill(origin)
        }, {
          duration: 225,
          easing: standardEasing
        });
      }
    });
    useRender(() => {
      const [btnProps] = pick(props, ['href', 'to', 'replace', 'icon', 'stacked', 'prependIcon', 'appendIcon', 'ripple', 'theme', 'disabled']);
      return createVNode(VBtn, mergeProps({
        "ref": rootEl,
        "class": ['v-tab', selectedClass.value],
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "onClick": () => !props.disabled && select(!isSelected.value)
      }, btnProps, attrs), {
        default: () => [slots.default ? slots.default() : props.title, !props.hideSlider && createVNode("div", {
          "ref": sliderEl,
          "class": ['v-tab__slider', sliderColorClasses.value],
          "style": sliderColorStyles.value
        }, null)]
      });
    });
    return {
      isSelected
    };
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

const VTabsSymbol = Symbol.for('vuetify:v-tabs');
const VTabs = defineComponent({
  name: 'VTabs',
  props: {
    alignWithTitle: Boolean,
    color: String,
    direction: {
      type: String,
      default: 'horizontal'
    },
    fixedTabs: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    stacked: Boolean,
    backgroundColor: String,
    centered: Boolean,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: undefined
    },
    hideSlider: Boolean,
    optional: Boolean,
    right: Boolean,
    sliderColor: String,
    modelValue: null,
    ...makeDensityProps(),
    ...makeTagProps()
  },
  emits: {
    'update:modelValue': v => true
  },

  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const parsedItems = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'backgroundColor'));
    provideDefaults({
      VTab: {
        color: toRef(props, 'color'),
        direction: toRef(props, 'direction'),
        stacked: toRef(props, 'stacked'),
        fixed: toRef(props, 'fixedTabs'),
        sliderColor: toRef(props, 'sliderColor'),
        hideSlider: toRef(props, 'hideSlider')
      }
    });
    return () => createVNode(VSlideGroup, {
      "class": ['v-tabs', `v-tabs--${props.direction}`, {
        'v-tabs--align-with-title': props.alignWithTitle,
        'v-tabs--centered': props.centered,
        'v-tabs--fixed-tabs': props.fixedTabs,
        'v-tabs--grow': props.grow,
        'v-tabs--right': props.right,
        'v-tabs--stacked': props.stacked
      }, densityClasses.value, backgroundColorClasses.value],
      "style": backgroundColorStyles.value,
      "role": "tablist",
      "symbol": VTabsSymbol,
      "mandatory": "force",
      "direction": props.direction,
      "modelValue": props.modelValue,
      "onUpdate:modelValue": v => emit('update:modelValue', v)
    }, {
      default: () => [slots.default ? slots.default() : parsedItems.value.map(item => createVNode(VTab, mergeProps(item, {
        "key": item.title
      }), null))]
    });
  }

});

const VTable = defineComponent({
  name: 'VTable',
  props: {
    fixedHeader: Boolean,
    fixedFooter: Boolean,
    height: [Number, String],
    ...makeDensityProps(),
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
    const {
      densityClasses
    } = useDensity(props);
    return () => {
      var _slots$top, _slots$default, _slots$bottom;

      return createVNode(props.tag, {
        "class": ['v-table', {
          'v-table--fixed-height': !!props.height,
          'v-table--fixed-header': props.fixedHeader,
          'v-table--fixed-footer': props.fixedFooter,
          'v-table--has-top': !!slots.top,
          'v-table--has-bottom': !!slots.bottom
        }, themeClasses.value, densityClasses.value]
      }, {
        default: () => [(_slots$top = slots.top) == null ? void 0 : _slots$top.call(slots), slots.default && createVNode("div", {
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [createVNode("table", null, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]), (_slots$bottom = slots.bottom) == null ? void 0 : _slots$bottom.call(slots)]
      });
    };
  }

});

const VTextarea = defineComponent({
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
    hint: String,
    persistentHint: Boolean,
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
    ...makeVInputProps(),
    ...makeVFieldProps()
  },
  emits: {
    'click:clear': e => true,
    'click:control': e => true,
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value) : (model.value || '').toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== 'number' && typeof props.counter !== 'string') return undefined;
      return props.counter;
    });

    function onIntersect(isIntersecting, entries) {
      var _entries$0$target, _entries$0$target$foc;

      if (!props.autofocus || !isIntersecting) return;
      (_entries$0$target = entries[0].target) == null ? void 0 : (_entries$0$target$foc = _entries$0$target.focus) == null ? void 0 : _entries$0$target$foc.call(_entries$0$target);
    }

    const vInputRef = ref();
    const vFieldRef = ref();
    const isFocused = ref(false);
    const controlHeight = ref('auto');
    const textareaRef = ref();
    const isActive = computed(() => isFocused.value || props.persistentPlaceholder);
    const messages = computed(() => {
      return props.messages.length ? props.messages : isActive.value || props.persistentHint ? props.hint : '';
    });

    function onFocus() {
      if (textareaRef.value !== document.activeElement) {
        var _textareaRef$value;

        (_textareaRef$value = textareaRef.value) == null ? void 0 : _textareaRef$value.focus();
      }

      if (!isFocused.value) isFocused.value = true;
    }

    function onControlClick(e) {
      onFocus();
      emit('click:control', e);
    }

    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = '';
        emit('click:clear', e);
      });
    }

    const sizerRef = ref();

    function calculateInputHeight() {
      if (!props.autoGrow) return;
      nextTick(() => {
        if (!sizerRef.value) return;
        const style = getComputedStyle(sizerRef.value);
        const padding = parseFloat(style.getPropertyValue('--v-field-padding-top')) + parseFloat(style.getPropertyValue('--v-field-padding-bottom'));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = parseFloat(props.rows) * lineHeight + padding;
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        controlHeight.value = convertToUnit(Math.min(maxHeight, Math.max(minHeight, height != null ? height : 0)));
      });
    }

    onMounted(calculateInputHeight);
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    let observer;
    watch(sizerRef, val => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        var _observer;

        (_observer = observer) == null ? void 0 : _observer.disconnect();
      }
    });
    onBeforeUnmount(() => {
      var _observer2;

      (_observer2 = observer) == null ? void 0 : _observer2.disconnect();
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _,
        ...inputProps
      }] = filterInputProps(props);
      const [fieldProps] = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-textarea', {
          'v-textarea--prefixed': props.prefix,
          'v-textarea--suffixed': props.suffix,
          'v-textarea--auto-grow': props.autoGrow,
          'v-textarea--no-resize': props.noResize || props.autoGrow
        }]
      }, rootAttrs, inputProps, {
        "messages": messages.value
      }), { ...slots,
        default: _ref2 => {
          let {
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "style": {
              '--v-input-control-height': controlHeight.value
            },
            "onClick:control": onControlClick,
            "onClick:clear": onClear,
            "role": "textbox"
          }, fieldProps, {
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), { ...slots,
            default: _ref3 => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "onUpdate:modelValue": $event => model.value = $event,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": props.name,
                "onFocus": onFocus,
                "onBlur": () => isFocused.value = false
              }, slotProps, inputAttrs), null), [[vModelText, model.value], [resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createVNode("textarea", {
                "class": [fieldClass, 'v-textarea__sizer'],
                "onUpdate:modelValue": $event => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasCounter ? () => createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
          "active": props.persistentCounter || isFocused.value,
          "value": counterValue.value,
          "max": max.value
        }, slots.counter)]) : undefined
      });
    });
    return useForwardRef({}, vInputRef, vFieldRef, textareaRef);
  }

});

const VThemeProvider = defineComponent({
  name: 'VThemeProvider',
  props: {
    withBackground: Boolean,
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
      var _slots$default, _slots$default2;

      if (!props.withBackground) return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
      return createVNode(props.tag, {
        "class": ['v-theme-provider', themeClasses.value]
      }, {
        default: () => [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]
      });
    };
  }

});

const VTimelineSymbol = Symbol.for('vuetify:timeline');

const VTimelineDivider = defineComponent$1({
  name: 'VTimelineDivider',
  props: {
    hideDot: Boolean,
    lineColor: String,
    icon: String,
    iconColor: String,
    fillDot: Boolean,
    dotColor: String,
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeElevationProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const timeline = inject(VTimelineSymbol);
    if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider');
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props, 'v-timeline-divider__dot');
    const {
      backgroundColorStyles,
      backgroundColorClasses
    } = useBackgroundColor(toRef(props, 'dotColor'));
    const {
      backgroundColorStyles: lineColorStyles,
      backgroundColorClasses: lineColorClasses
    } = useBackgroundColor(timeline.lineColor);
    const {
      roundedClasses
    } = useRounded(props, 'v-timeline-divider__dot');
    const {
      elevationClasses
    } = useElevation(props);
    return () => createVNode("div", {
      "class": ['v-timeline-divider', {
        'v-timeline-divider--fill-dot': props.fillDot
      }]
    }, [!props.hideDot && createVNode("div", {
      "class": ['v-timeline-divider__dot', roundedClasses.value, sizeClasses.value, elevationClasses.value],
      "style": sizeStyles.value
    }, [createVNode("div", {
      "class": ['v-timeline-divider__inner-dot', roundedClasses.value, backgroundColorClasses.value],
      "style": backgroundColorStyles.value
    }, [slots.default ? slots.default({
      icon: props.icon,
      iconColor: props.iconColor,
      size: props.size
    }) : props.icon ? createVNode(VIcon, {
      "icon": props.icon,
      "color": props.iconColor,
      "size": props.size
    }, null) : undefined])]), createVNode("div", {
      "class": ['v-timeline-divider__line', lineColorClasses.value],
      "style": lineColorStyles.value
    }, null)]);
  }

});

const VTimelineItem = defineComponent({
  name: 'VTimelineItem',
  props: {
    dotColor: String,
    fillDot: Boolean,
    hideDot: Boolean,
    hideOpposite: {
      type: Boolean,
      default: undefined
    },
    icon: String,
    iconColor: String,
    ...makeRoundedProps(),
    ...makeElevationProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeDimensionProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const timeline = inject(VTimelineSymbol);
    if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider');
    const {
      dimensionStyles
    } = useDimension(props);
    const dotSize = ref(0);
    const dotRef = ref();
    watch(dotRef, newValue => {
      var _newValue$$el$querySe, _newValue$$el$querySe2;

      if (!newValue) return;
      dotSize.value = (_newValue$$el$querySe = (_newValue$$el$querySe2 = newValue.$el.querySelector('.v-timeline-divider__dot')) == null ? void 0 : _newValue$$el$querySe2.getBoundingClientRect().width) != null ? _newValue$$el$querySe : 0;
    }, {
      flush: 'post'
    });
    return () => {
      var _slots$default, _slots$opposite;

      return createVNode("div", {
        "class": ['v-timeline-item', {
          'v-timeline-item--fill-dot': props.fillDot
        }],
        "style": {
          '--v-timeline-dot-size': convertToUnit(dotSize.value)
        }
      }, [createVNode("div", {
        "class": "v-timeline-item__body",
        "style": dimensionStyles.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), createVNode(VTimelineDivider, {
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
      }), timeline.density.value !== 'compact' && createVNode("div", {
        "class": "v-timeline-item__opposite"
      }, [!props.hideOpposite && ((_slots$opposite = slots.opposite) == null ? void 0 : _slots$opposite.call(slots))])]);
    };
  }

});

const VTimeline = defineComponent({
  name: 'VTimeline',
  props: {
    direction: {
      type: String,
      default: 'vertical',
      validator: v => ['vertical', 'horizontal'].includes(v)
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
      default: 'start',
      validator: v => ['none', 'start', 'end', 'both'].includes(v)
    },
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
    provide(VTimelineSymbol, {
      density: toRef(props, 'density'),
      lineColor: toRef(props, 'lineColor')
    });
    const sideClass = computed(() => {
      const side = props.side ? props.side : props.density !== 'default' ? 'end' : null;
      return side && `v-timeline--side-${side}`;
    });
    return () => {
      var _slots$default;

      return createVNode(props.tag, {
        "class": ['v-timeline', `v-timeline--${props.direction}`, {
          'v-timeline--inset-line': !!props.lineInset,
          'v-timeline--truncate-line-end': props.truncateLine === 'end' || props.truncateLine === 'both'
        }, themeClasses.value, densityClasses.value, sideClass.value],
        "style": {
          '--v-timeline-line-thickness': convertToUnit(props.lineThickness),
          '--v-timeline-line-inset': convertToUnit(props.lineInset)
        }
      }, {
        default: () => [(props.truncateLine === 'none' || props.truncateLine === 'end') && createVNode(VTimelineItem, {
          "hideDot": true
        }, null), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      });
    };
  }

});

const VTooltip = genericComponent()({
  name: 'VTooltip',
  inheritAttrs: false,
  props: {
    id: String,
    modelValue: Boolean,
    text: String,
    anchor: {
      type: String,
      default: 'end'
    },
    origin: {
      type: String,
      default: 'auto'
    },
    ...makeTransitionProps({
      transition: false
    })
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    const uid = getUid();
    const id = computed(() => props.id || `v-tooltip-${uid}`);
    const anchor = computed(() => {
      return props.anchor.split(' ').length > 1 ? props.anchor : props.anchor + ' center';
    });
    const origin = computed(() => {
      return props.origin === 'auto' || props.origin === 'overlap' || props.origin.split(' ').length > 1 || props.anchor.split(' ').length > 1 ? props.origin : props.origin + ' center';
    });
    const transition = computed(() => {
      if (props.transition) return props.transition;
      return isActive.value ? 'scale-transition' : 'fade-transition';
    });
    return () => {
      return createVNode(VOverlay, mergeProps({
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "class": ['v-tooltip'],
        "id": id.value,
        "transition": transition.value,
        "absolute": true,
        "positionStrategy": "connected",
        "scrollStrategy": "reposition",
        "anchor": anchor.value,
        "origin": origin.value,
        "min-width": 0,
        "offset": 10,
        "scrim": false,
        "persistent": true,
        "open-on-click": false,
        "open-on-hover": true,
        "role": "tooltip",
        "eager": true,
        "activatorProps": {
          'aria-describedby': id.value
        }
      }, attrs), {
        activator: slots.activator,
        default: function () {
          var _slots$default, _slots$default2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return (_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots, ...args)) != null ? _slots$default : props.text;
        }
      });
    };
  }

});

// Composables
const VValidation = defineComponent({
  name: 'VValidation',
  props: { ...makeValidationProps()
  },
  emits: {
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const validation = useValidation(props, 'validation');
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, validation);
    };
  }

});

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  VApp: VApp,
  VAppBar: VAppBar,
  VAppBarNavIcon: VAppBarNavIcon,
  VAppBarTitle: VAppBarTitle,
  VAlert: VAlert,
  VAlertTitle: VAlertTitle,
  VAutocomplete: VAutocomplete,
  VAvatar: VAvatar,
  VBadge: VBadge,
  VBanner: VBanner,
  VBannerActions: VBannerActions,
  VBannerText: VBannerText,
  VBottomNavigation: VBottomNavigation,
  VBreadcrumbs: VBreadcrumbs,
  VBreadcrumbsItem: VBreadcrumbsItem,
  VBreadcrumbsDivider: VBreadcrumbsDivider,
  VBtn: VBtn,
  VBtnGroup: VBtnGroup,
  VBtnToggle: VBtnToggle,
  VCard: VCard,
  VCardActions: VCardActions,
  VCardAvatar: VCardAvatar,
  VCardHeader: VCardHeader,
  VCardHeaderText: VCardHeaderText,
  VCardImg: VCardImg,
  VCardSubtitle: VCardSubtitle,
  VCardText: VCardText,
  VCardTitle: VCardTitle,
  VCarousel: VCarousel,
  VCarouselItem: VCarouselItem,
  VCheckbox: VCheckbox,
  VChip: VChip,
  VChipGroup: VChipGroup,
  VCode: VCode,
  VColorPicker: VColorPicker,
  VCombobox: VCombobox,
  VCounter: VCounter,
  VDefaultsProvider: VDefaultsProvider,
  VDialog: VDialog,
  VDivider: VDivider,
  VExpansionPanels: VExpansionPanels,
  VExpansionPanel: VExpansionPanel,
  VExpansionPanelText: VExpansionPanelText,
  VExpansionPanelTitle: VExpansionPanelTitle,
  VField: VField,
  VFieldLabel: VFieldLabel,
  VFileInput: VFileInput,
  VFooter: VFooter,
  VForm: VForm,
  VContainer: VContainer,
  VCol: VCol,
  VRow: VRow,
  VSpacer: VSpacer,
  VHover: VHover,
  VIcon: VIcon,
  VComponentIcon: VComponentIcon,
  VSvgIcon: VSvgIcon,
  VLigatureIcon: VLigatureIcon,
  VClassIcon: VClassIcon,
  VImg: VImg,
  VInput: VInput,
  VItemGroup: VItemGroup,
  VItem: VItem,
  VKbd: VKbd,
  VLabel: VLabel,
  VLayout: VLayout,
  VLayoutItem: VLayoutItem,
  VLazy: VLazy,
  VList: VList,
  VListSubheader: VListSubheader,
  VListImg: VListImg,
  VListItem: VListItem,
  VListItemAvatar: VListItemAvatar,
  VListItemHeader: VListItemHeader,
  VListItemMedia: VListItemMedia,
  VListItemSubtitle: VListItemSubtitle,
  VListItemTitle: VListItemTitle,
  VListGroup: VListGroup,
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
  VSelect: VSelect,
  VSelectionControl: VSelectionControl,
  VSelectionControlGroup: VSelectionControlGroup,
  VSheet: VSheet,
  VSlideGroupSymbol: VSlideGroupSymbol,
  VSlideGroup: VSlideGroup,
  VSlideGroupItem: VSlideGroupItem,
  VSlider: VSlider,
  VSnackbar: VSnackbar,
  VSwitch: VSwitch,
  VSystemBar: VSystemBar,
  VTabs: VTabs,
  VTab: VTab,
  VTable: VTable,
  VTextarea: VTextarea,
  VTextField: VTextField,
  VThemeProvider: VThemeProvider,
  VTimeline: VTimeline,
  VTimelineItem: VTimelineItem,
  VToolbar: VToolbar,
  VToolbarTitle: VToolbarTitle,
  VToolbarItems: VToolbarItems,
  VTooltip: VTooltip,
  VValidation: VValidation,
  VWindow: VWindow,
  VWindowItem: VWindowItem,
  VDialogTransition: VDialogTransition,
  VCarouselTransition: VCarouselTransition,
  VCarouselReverseTransition: VCarouselReverseTransition,
  VTabTransition: VTabTransition,
  VTabReverseTransition: VTabReverseTransition,
  VMenuTransition: VMenuTransition,
  VFabTransition: VFabTransition,
  VDialogBottomTransition: VDialogBottomTransition,
  VDialogTopTransition: VDialogTopTransition,
  VFadeTransition: VFadeTransition,
  VScaleTransition: VScaleTransition,
  VScrollXTransition: VScrollXTransition,
  VScrollXReverseTransition: VScrollXReverseTransition,
  VScrollYTransition: VScrollYTransition,
  VScrollYReverseTransition: VScrollYReverseTransition,
  VSlideXTransition: VSlideXTransition,
  VSlideXReverseTransition: VSlideXReverseTransition,
  VSlideYTransition: VSlideYTransition,
  VSlideYReverseTransition: VSlideYReverseTransition,
  VExpandTransition: VExpandTransition,
  VExpandXTransition: VExpandXTransition
});

// Types
function mounted$2(el, binding) {
  var _modifierKeys$attr, _modifierKeys$char, _modifierKeys$child, _modifierKeys$sub;

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
      attributes: (_modifierKeys$attr = modifierKeys == null ? void 0 : modifierKeys.attr) != null ? _modifierKeys$attr : defaultValue,
      characterData: (_modifierKeys$char = modifierKeys == null ? void 0 : modifierKeys.char) != null ? _modifierKeys$char : defaultValue,
      childList: (_modifierKeys$child = modifierKeys == null ? void 0 : modifierKeys.child) != null ? _modifierKeys$child : defaultValue,
      subtree: (_modifierKeys$sub = modifierKeys == null ? void 0 : modifierKeys.sub) != null ? _modifierKeys$sub : defaultValue
    }
  };
  const observer = new MutationObserver(function () {
    let mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let observer = arguments.length > 1 ? arguments[1] : undefined;
    handler == null ? void 0 : handler(mutations, observer);
    if (once) unmounted$2(el, binding);
  });
  if (immediate) handler == null ? void 0 : handler([], observer);
  el._mutate = Object(el._mutate);
  el._mutate[binding.instance.$.uid] = {
    observer
  };
  observer.observe(el, options);
}

function unmounted$2(el, binding) {
  var _el$_mutate;

  if (!((_el$_mutate = el._mutate) != null && _el$_mutate[binding.instance.$.uid])) return;

  el._mutate[binding.instance.$.uid].observer.disconnect();

  delete el._mutate[binding.instance.$.uid];
}

const Mutate = {
  mounted: mounted$2,
  unmounted: unmounted$2
};

function mounted$1(el, binding) {
  var _binding$modifiers, _binding$modifiers2;

  const handler = binding.value;
  const options = {
    passive: !((_binding$modifiers = binding.modifiers) != null && _binding$modifiers.active)
  };
  window.addEventListener('resize', handler, options);
  el._onResize = Object(el._onResize);
  el._onResize[binding.instance.$.uid] = {
    handler,
    options
  };

  if (!((_binding$modifiers2 = binding.modifiers) != null && _binding$modifiers2.quiet)) {
    handler();
  }
}

function unmounted$1(el, binding) {
  var _el$_onResize;

  if (!((_el$_onResize = el._onResize) != null && _el$_onResize[binding.instance.$.uid])) return;
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
  var _binding$modifiers;

  const {
    self = false
  } = (_binding$modifiers = binding.modifiers) != null ? _binding$modifiers : {};
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
  var _el$_onScroll;

  if (!((_el$_onScroll = el._onScroll) != null && _el$_onScroll[binding.instance.$.uid])) return;
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
  sort: 'mdi-arrow-up',
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
  component: props => h(VClassIcon, { ...props,
    class: 'mdi'
  })
};

const createVuetify$1 = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  const install = app => {
    const {
      components = {},
      directives = {},
      icons = {}
    } = options;

    for (const key in directives) {
      const directive = directives[key];
      app.directive(key, directive);
    }

    for (const key in components) {
      const component = components[key];
      app.component(key, component);
    }

    app.provide(DefaultsSymbol, createDefaults(options.defaults));
    app.provide(DisplaySymbol, createDisplay(options.display));
    app.provide(ThemeSymbol, createTheme(app, options.theme));
    app.provide(IconSymbol, mergeDeep({
      defaultSet: 'mdi',
      sets: { ...defaultSets,
        mdi
      },
      aliases
    }, icons));
    const {
      adapter,
      rootInstance
    } = createLocaleAdapter(app, options == null ? void 0 : options.locale);
    app.provide(LocaleAdapterSymbol, adapter);
    app.provide(RtlSymbol, createRtl(rootInstance, options == null ? void 0 : options.locale)); // Vue's inject() can only be used in setup

    function inject(key) {
      var _vm$parent$provides, _vm$parent, _vm$vnode$appContext;

      const vm = this.$;
      const provides = (_vm$parent$provides = (_vm$parent = vm.parent) == null ? void 0 : _vm$parent.provides) != null ? _vm$parent$provides : (_vm$vnode$appContext = vm.vnode.appContext) == null ? void 0 : _vm$vnode$appContext.provides;

      if (provides && key in provides) {
        return provides[key];
      }
    }

    app.mixin({
      computed: {
        $vuetify() {
          return reactive({
            defaults: inject.call(this, DefaultsSymbol),
            display: inject.call(this, DisplaySymbol),
            theme: inject.call(this, ThemeSymbol),
            icons: inject.call(this, IconSymbol),
            locale: inject.call(this, LocaleAdapterSymbol),
            rtl: inject.call(this, RtlSymbol)
          });
        }

      }
    });
  };

  return {
    install
  };
};

const createVuetify = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return createVuetify$1({
    components,
    directives,
    ...options
  });
};
const version = "3.0.0-beta.0";

export { components, createVuetify, directives, provideRtl, useDisplay, useLayout, useRtl, useTheme, version };
//# sourceMappingURL=vuetify.esm.js.map
