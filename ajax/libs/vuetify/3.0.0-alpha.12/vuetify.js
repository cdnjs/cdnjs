/*!
* Vuetify v3.0.0-alpha.12
* Forged by John Leider
* Released under the MIT License.
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vuetify = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

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

  // Utilities

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
  function wrapInArray(v) {
    return v == null ? [] : Array.isArray(v) ? v : [v];
  }
  function clamp(value) {
    let min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Math.max(min, Math.min(max, value));
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
    let out = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (const key in source) {
      out[key] = source[key];
    }

    for (const key in target) {
      const sourceProperty = source[key];
      const targetProperty = target[key]; // Only continue deep merging if
      // both properties are objects

      if (isObject(sourceProperty) && isObject(targetProperty)) {
        out[key] = mergeDeep(sourceProperty, targetProperty);
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
      if (node.type === vue.Fragment) {
        return flattenFragments(node.children);
      } else {
        return node;
      }
    }).flat();
  }
  const toKebabCase = str => str.replace(/([A-Z])/g, match => `-${match.toLowerCase()}`);
  function wrapInRef(x) {
    return vue.isRef(x) ? x : vue.ref(x);
  }
  function findChildren(vnode) {
    if (!vnode || typeof vnode !== 'object') {
      return [];
    }

    if (Array.isArray(vnode)) {
      return vnode.map(child => findChildren(child)).filter(v => v).flat(1);
    } else if (Array.isArray(vnode.children)) {
      return vnode.children.map(child => findChildren(child)).filter(v => v).flat(1);
    } else if (vnode.component) {
      var _vnode$component;

      return [vnode.component, ...findChildren((_vnode$component = vnode.component) == null ? void 0 : _vnode$component.subTree)].filter(v => v).flat(1);
    }

    return [];
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

  const DefaultsSymbol = Symbol.for('vuetify:defaults');
  function createDefaults(options) {
    return vue.ref(options != null ? options : {});
  }
  function useDefaults() {
    const defaults = vue.inject(DefaultsSymbol);
    if (!defaults) throw new Error('[Vuetify] Could not find defaults instance');
    return defaults;
  }
  function provideDefaults(props) {
    const defaults = useDefaults();
    const newDefaults = vue.computed(() => mergeDeep(defaults.value, props == null ? void 0 : props.defaults));
    vue.provide(DefaultsSymbol, newDefaults);
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
        const vm = vue.getCurrentInstance();
        const defaults = useDefaults();

        const _props = vue.shallowReactive({ ...vue.toRaw(props)
        });

        vue.watchEffect(() => {
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
    return options => (exposeDefaults ? defineComponent : vue.defineComponent)(options);
  }

  function createSimpleFunctional(klass) {
    let tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    let name = arguments.length > 2 ? arguments[2] : undefined;
    return defineComponent({
      name: name != null ? name : vue.capitalize(vue.camelize(klass.replace(/__/g, '-'))),
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
    const vm = vue.getCurrentInstance();

    if (!vm) {
      throw new Error(`[Vuetify] ${name} ${message || 'must be called from inside a setup function'}`);
    }

    return vm;
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
          'activated-opacity': 0.12,
          'idle-opacity': 0.04,
          'hover-opacity': 0.12,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'dragged-opacity': 0.08,
          'pressed-opacity': 0.16,
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
          'activated-opacity': 0.12,
          'idle-opacity': 0.10,
          'hover-opacity': 0.04,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'dragged-opacity': 0.08,
          'pressed-opacity': 0.16,
          'kbd-background-color': '#212529',
          'kbd-color': '#FFFFFF',
          'code-background-color': '#B7B7B7'
        }
      }
    }
  };

  const parseThemeOptions = function () {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultThemeOptions;
    if (!options) return { ...defaultThemeOptions,
      isDisabled: true
    };
    return mergeDeep(defaultThemeOptions, options);
  }; // Composables


  function createTheme(options) {
    const parsedOptions = parseThemeOptions(options);
    const styleEl = vue.ref();
    const current = vue.ref(parsedOptions.defaultTheme);
    const themes = vue.ref(parsedOptions.themes);
    const variations = vue.ref(parsedOptions.variations);
    const computedThemes = vue.computed(() => {
      return Object.keys(themes.value).reduce((obj, key) => {
        var _parsedOptions$variat;

        const theme = { ...themes.value[key],
          colors: { ...themes.value[key].colors,
            ...((_parsedOptions$variat = parsedOptions.variations.colors) != null ? _parsedOptions$variat : []).reduce((obj, color) => {
              return { ...obj,
                ...genColorVariations(color, themes.value[key].colors[color])
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

        obj[key] = theme;
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

    function genStyleElement() {
      if (typeof document === 'undefined' || styleEl.value) return;
      const el = document.createElement('style');
      el.type = 'text/css';
      el.id = 'vuetify-theme-stylesheet';
      styleEl.value = el;
      document.head.appendChild(styleEl.value);
    }

    function createCssClass(selector, content) {
      return [`${selector} {\n`, ...content.map(line => `  ${line};\n`), '}\n'];
    }

    function updateStyles() {
      if (parsedOptions.isDisabled) return;
      genStyleElement();
      const lines = [];

      for (const themeName of Object.keys(computedThemes.value)) {
        const variables = computedThemes.value[themeName].variables;
        lines.push(...createCssClass(`.v-theme--${themeName}`, [...genCssVariables(themeName), ...Object.keys(variables).map(key => {
          const value = variables[key];
          const color = typeof value === 'string' && value.startsWith('#') ? colorToRGB(value) : undefined;
          const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined;
          return `--v-${key}: ${rgb != null ? rgb : value}`;
        })]));
      } // Assumption is that all theme objects have the same keys, so it doesn't matter which one
      // we use since the values are all css variables.


      const firstTheme = Object.keys(computedThemes.value)[0];

      for (const key of Object.keys(computedThemes.value[firstTheme].colors)) {
        if (/on-[a-z]/.test(key)) {
          lines.push(...createCssClass(`.${key}`, [`color: rgb(var(--v-theme-${key}))`]));
        } else {
          lines.push(...createCssClass(`.bg-${key}`, [`--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`, `background: rgb(var(--v-theme-${key}))`, `color: rgb(var(--v-theme-on-${key}))`]), ...createCssClass(`.text-${key}`, [`color: rgb(var(--v-theme-${key}))`]), ...createCssClass(`.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]));
        }
      }

      if (styleEl.value) styleEl.value.innerHTML = lines.map((str, i) => i === 0 ? str : `    ${str}`).join('');
    }

    vue.watch(themes, updateStyles, {
      deep: true,
      immediate: true
    });
    return {
      isDisabled: parsedOptions.isDisabled,
      themes: computedThemes,
      setTheme: (key, theme) => themes.value[key] = theme,
      getTheme: key => computedThemes.value[key],
      current,
      themeClasses: vue.computed(() => parsedOptions.isDisabled ? undefined : `v-theme--${current.value}`)
    };
  }
  /**
   * Used to either set up and provide a new theme instance, or to pass
   * along the closest available already provided instance.
   */

  function useTheme(props) {
    getCurrentInstance('useTheme');
    const theme = vue.inject(ThemeSymbol, null);
    if (!theme) throw new Error('Could not find Vuetify theme injection');
    const current = vue.computed(() => {
      var _props$theme;

      return (_props$theme = props.theme) != null ? _props$theme : theme == null ? void 0 : theme.current.value;
    });
    const themeClasses = vue.computed(() => theme.isDisabled ? undefined : `v-theme--${current.value}`);
    const newTheme = { ...theme,
      current,
      themeClasses
    };
    vue.provide(ThemeSymbol, newTheme);
    return newTheme;
  }

  // Utilities

  const VuetifyLayoutKey = Symbol.for('vuetify:layout');
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
      type: Number,
      default: 0
    },
    absolute: Boolean
  }, 'layout-item');
  function useLayout() {
    const layout = vue.inject(VuetifyLayoutKey);
    if (!layout) throw new Error('Could not find injected Vuetify layout');
    return layout;
  }
  function useLayoutItem(name, priority, position, layoutSize, elementSize, active) {
    const layout = vue.inject(VuetifyLayoutKey);
    if (!layout) throw new Error('Could not find injected Vuetify layout');
    const id = name != null ? name : `layout-item-${getUid()}`;
    const styles = layout.register(id, priority, position, layoutSize, elementSize, active);
    vue.onBeforeUnmount(() => layout.unregister(id));
    return styles;
  }

  const generateLayers = (layout, registered, positions, layoutSizes, activeItems) => {
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
    const ids = !layout.length ? registered : layout.map(l => l.split(':')[0]).filter(l => registered.includes(l));

    for (const id of ids) {
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
  }; // TODO: Remove undefined from layout and overlaps when vue typing for required: true prop is fixed


  function createLayout(props) {
    const registered = vue.ref([]);
    const positions = new Map();
    const layoutSizes = new Map();
    const priorities = new Map();
    const activeItems = new Map();
    const computedOverlaps = vue.computed(() => {
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
    const layers = vue.computed(() => {
      const entries = [...priorities.entries()];
      const sortedEntries = entries.sort((_ref, _ref2) => {
        let [, a] = _ref;
        let [, b] = _ref2;
        return a.value - b.value;
      }).map(_ref3 => {
        let [id] = _ref3;
        return id;
      });
      return generateLayers(sortedEntries, registered.value, positions, layoutSizes, activeItems);
    });
    const mainStyles = vue.computed(() => {
      const layer = layers.value[layers.value.length - 1].layer;
      return {
        position: 'relative',
        paddingLeft: convertToUnit(layer.left),
        paddingRight: convertToUnit(layer.right),
        paddingTop: convertToUnit(layer.top),
        paddingBottom: convertToUnit(layer.bottom)
      };
    });
    const items = vue.computed(() => {
      return layers.value.slice(1).map((_ref4, index) => {
        let {
          id
        } = _ref4;
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

    vue.provide(VuetifyLayoutKey, {
      register: (id, priority, position, layoutSize, elementSize, active) => {
        priorities.set(id, priority);
        positions.set(id, position);
        layoutSizes.set(id, layoutSize);
        activeItems.set(id, active);
        registered.value.push(id);
        return vue.computed(() => {
          const index = items.value.findIndex(i => i.id === id);
          if (index < 0) throw new Error(`Layout item "${id}" is missing from layout prop`);
          const item = items.value[index];
          if (!item) throw new Error(`Could not find layout item "${id}`);
          const overlap = computedOverlaps.value.get(id);

          if (overlap) {
            item[overlap.position] += overlap.amount;
          }

          const isHorizontal = position.value === 'left' || position.value === 'right';
          const isOppositeHorizontal = position.value === 'right';
          const isOppositeVertical = position.value === 'bottom';
          return {
            [position.value]: 0,
            height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : `${elementSize.value}px`,
            marginLeft: isOppositeHorizontal ? undefined : `${item.left}px`,
            marginRight: isOppositeHorizontal ? `${item.right}px` : undefined,
            marginTop: position.value !== 'bottom' ? `${item.top}px` : undefined,
            marginBottom: position.value !== 'top' ? `${item.bottom}px` : undefined,
            width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : `${elementSize.value}px`,
            zIndex: layers.value.length - index,
            transform: `translate${isHorizontal ? 'X' : 'Y'}(${(active.value ? 0 : -110) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}%)`
          };
        });
      },
      unregister: id => {
        priorities.delete(id);
        positions.delete(id);
        layoutSizes.delete(id);
        activeItems.delete(id);
        registered.value = registered.value.filter(v => v !== id);
      },
      mainStyles,
      getLayoutItem,
      items
    });
    const layoutClasses = vue.computed(() => ['v-layout', {
      'v-layout--full-height': props.fullHeight
    }]);
    return {
      layoutClasses,
      getLayoutItem,
      items
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
      isRtl: vue.ref((_options$defaultRtl = options == null ? void 0 : options.defaultRtl) != null ? _options$defaultRtl : false),
      rtlClasses: vue.ref('')
    }, localeScope);
  }
  function createRtlScope(currentScope, localeScope, options) {
    const isRtl = vue.computed(() => {
      if (typeof (options == null ? void 0 : options.rtl) === 'boolean') return options.rtl;

      if (localeScope.current.value && currentScope.rtl.hasOwnProperty(localeScope.current.value)) {
        return currentScope.rtl[localeScope.current.value];
      }

      return currentScope.isRtl.value;
    });
    return {
      isRtl,
      rtl: currentScope.rtl,
      rtlClasses: vue.computed(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`)
    };
  }
  function provideRtl(props, localeScope) {
    const currentScope = vue.inject(RtlSymbol);
    if (!currentScope) throw new Error('[Vuetify] Could not find injected rtl instance');
    const newScope = createRtlScope(currentScope, localeScope, props);
    vue.provide(RtlSymbol, newScope);
    return newScope;
  }
  function useRtl() {
    const currentScope = vue.inject(RtlSymbol);
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
      const {
        themeClasses
      } = useTheme(props);
      const {
        layoutClasses,
        getLayoutItem,
        items
      } = createLayout(props);
      const {
        rtlClasses
      } = useRtl();
      useRender(() => {
        var _slots$default;

        return vue.createVNode("div", {
          "class": ['v-application', themeClasses.value, layoutClasses.value, rtlClasses.value],
          "data-app": "true"
        }, [vue.createVNode("div", {
          "class": "v-application__wrap"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])], 2);
      });
      return {
        getLayoutItem,
        items
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

        return vue.createVNode("div", {
          "class": "v-responsive",
          "style": dimensionStyles.value
        }, [vue.createVNode("div", {
          "class": "v-responsive__sizer",
          "style": aspectStyles.value
        }, null, 4), (_slots$additional = slots.additional) == null ? void 0 : _slots$additional.call(slots), slots.default && vue.createVNode("div", {
          "class": ['v-responsive__content', props.contentClass]
        }, [slots.default()], 2)], 4);
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
      component = vue.Transition,
      ...customProps
    } = typeof transition === 'object' ? transition : {};
    return vue.h(component, vue.mergeProps(typeof transition === 'string' ? {
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
          aspect: Number(props.aspectRatio || props.src.aspect)
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
      }); // TODO: getSrc when window width changes

      vue.onBeforeMount(() => init());

      function init(isIntersecting) {
        if (props.eager && isIntersecting) return;
        if (SUPPORTS_INTERSECTION && !isIntersecting && !props.eager) return;
        state.value = 'loading';
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

        if (normalisedSrc.value.lazySrc) {
          const lazyImg = new Image();
          lazyImg.src = normalisedSrc.value.lazySrc;
          pollForSize(lazyImg, null);
        }
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

      const containClasses = vue.computed(() => ({
        'v-img__img--cover': props.cover,
        'v-img__img--contain': !props.cover
      }));

      const __image = vue.computed(() => {
        var _slots$sources;

        if (!normalisedSrc.value.src || state.value === 'idle') return;
        const img = vue.h('img', {
          class: ['v-img__img', containClasses.value],
          src: normalisedSrc.value.src,
          srcset: normalisedSrc.value.srcset,
          sizes: props.sizes,
          ref: image,
          onLoad,
          onError
        });
        const sources = (_slots$sources = slots.sources) == null ? void 0 : _slots$sources.call(slots);
        return vue.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [vue.withDirectives(sources ? vue.createVNode("picture", {
            "class": "v-img__picture"
          }, [sources, img]) : img, [[vue.vShow, state.value === 'loaded']])],
          _: 2
        }, 8, ["transition", "appear"]);
      });

      const __preloadImage = vue.computed(() => vue.createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [normalisedSrc.value.lazySrc && state.value !== 'loaded' && vue.createVNode("img", {
          "class": ['v-img__img', 'v-img__img--preload', containClasses.value],
          "src": normalisedSrc.value.lazySrc,
          "alt": ""
        }, null, 10, ["src"])]
      }, 8, ["transition"]));

      const __placeholder = vue.computed(() => {
        if (!slots.placeholder) return;
        return vue.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [(state.value === 'loading' || state.value === 'error' && !slots.error) && vue.createVNode("div", {
            "class": "v-img__placeholder"
          }, [slots.placeholder()])]
        }, 8, ["transition", "appear"]);
      });

      const __error = vue.computed(() => {
        if (!slots.error) return;
        return vue.createVNode(MaybeTransition, {
          "transition": props.transition,
          "appear": true
        }, {
          default: () => [state.value === 'error' && vue.createVNode("div", {
            "class": "v-img__error"
          }, [slots.error()])]
        }, 8, ["transition", "appear"]);
      });

      const __gradient = vue.computed(() => {
        if (!props.gradient) return;
        return vue.createVNode("div", {
          "class": "v-img__gradient",
          "style": {
            backgroundImage: `linear-gradient(${props.gradient})`
          }
        }, null);
      });

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
        additional: () => [__image.value, __preloadImage.value, __gradient.value, __placeholder.value, __error.value],
        default: slots.default
      }, 8, ["class", "style", "aspectRatio", "aria-label", "role"]), [[vue.resolveDirective("intersect"), {
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
  const makeBorderProps = propsFactory({
    border: [Boolean, Number, String]
  }, 'border');
  function useBorder(props, name) {
    const borderClasses = vue.computed(() => {
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

  const allowedDensities = [null, 'default', 'comfortable', 'compact'];
  // Composables
  const makeDensityProps = propsFactory({
    density: {
      type: String,
      default: 'default',
      validator: v => allowedDensities.includes(v)
    }
  }, 'density');
  function useDensity(props, name) {
    const densityClasses = vue.computed(() => {
      return `${name}--density-${props.density}`;
    });
    return {
      densityClasses
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
    const elevationClasses = vue.computed(() => {
      const classes = [];
      if (props.elevation == null) return classes;
      classes.push(`elevation-${props.elevation}`);
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
    },
    tile: Boolean
  }, 'rounded');
  function useRounded(props, name) {
    const roundedClasses = vue.computed(() => {
      const classes = [];

      if (props.tile) {
        classes.push(`${name}--tile`);
      } else if (props.rounded === true || props.rounded === '') {
        classes.push(`${name}--rounded`);
      } else if (typeof props.rounded === 'string' || props.rounded === 0) {
        for (const value of String(props.rounded).split(' ')) {
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
  const makeTagProps = propsFactory({
    tag: {
      type: String,
      default: 'div'
    }
  }, 'tag');

  // Utilities

  // Composables
  function useColor(colors) {
    const backgroundIsCssColor = vue.computed(() => isCssColor(colors.value.background));
    const textIsCssColor = vue.computed(() => isCssColor(colors.value.text));
    const colorClasses = vue.computed(() => {
      const classes = [];

      if (colors.value.background && !backgroundIsCssColor.value) {
        classes.push(`bg-${colors.value.background}`);
      }

      if (colors.value.text && !textIsCssColor.value) {
        classes.push(`text-${colors.value.text}`);
      }

      return classes;
    });
    const colorStyles = vue.computed(() => {
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

  // Utilities

  // Composables
  function useProxiedModel(props, prop, defaultValue) {
    let transformIn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : v => v;
    let transformOut = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : v => v;
    const vm = getCurrentInstance('useProxiedModel');
    const propIsDefined = vue.computed(() => {
      var _vm$vnode$props, _vm$vnode$props2;

      return !!(typeof props[prop] !== 'undefined' && (vm != null && (_vm$vnode$props = vm.vnode.props) != null && _vm$vnode$props.hasOwnProperty(prop) || vm != null && (_vm$vnode$props2 = vm.vnode.props) != null && _vm$vnode$props2.hasOwnProperty(toKebabCase(prop))));
    });
    const internal = vue.ref(transformIn(props[prop]));
    return vue.computed({
      get() {
        if (propIsDefined.value) return transformIn(props[prop]);else return internal.value;
      },

      set(newValue) {
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
      collapse: Boolean,
      color: String,
      flat: Boolean,
      height: {
        type: [Number, String],
        default: 64
      },
      extensionHeight: {
        type: [Number, String],
        default: 48
      },
      floating: Boolean,
      image: String,
      modelValue: {
        type: Boolean,
        default: true
      },
      prominent: Boolean,
      prominentHeight: {
        type: [Number, String],
        default: 128
      },
      position: {
        type: String,
        default: 'top',
        validator: value => ['top', 'bottom'].includes(value)
      },
      ...makeBorderProps(),
      ...makeDensityProps(),
      ...makeElevationProps(),
      ...makeRoundedProps(),
      ...makeLayoutItemProps({
        name: 'app-bar'
      }),
      ...makeTagProps({
        tag: 'header'
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
        borderClasses
      } = useBorder(props, 'v-app-bar');
      const {
        densityClasses
      } = useDensity(props, 'v-app-bar');
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props, 'v-app-bar');
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const isExtended = !!slots.extension;
      const contentHeight = vue.computed(() => Number(props.prominent ? props.prominentHeight : props.height) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0));
      const height = vue.computed(() => contentHeight.value + Number(isExtended ? props.extensionHeight : 0));
      const isActive = useProxiedModel(props, 'modelValue', props.modelValue);
      const layoutStyles = useLayoutItem(props.name, vue.toRef(props, 'priority'), vue.toRef(props, 'position'), height, height, isActive);
      return () => {
        var _slots$img, _slots$default, _slots$extension;

        const hasImage = !!(slots.image || props.image);
        return vue.createVNode(props.tag, {
          "class": ['v-app-bar', {
            'v-app-bar--bottom': props.position === 'bottom',
            'v-app-bar--collapsed': props.collapse,
            'v-app-bar--flat': props.flat,
            'v-app-bar--floating': props.floating,
            'v-app-bar--is-active': isActive.value,
            'v-app-bar--prominent': props.prominent,
            'v-app-bar--absolute': props.absolute
          }, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value],
          "style": [backgroundColorStyles.value, layoutStyles.value]
        }, {
          default: () => [hasImage && vue.createVNode("div", {
            "class": "v-app-bar__image"
          }, [slots.image ? (_slots$img = slots.img) == null ? void 0 : _slots$img.call(slots, {
            src: props.image
          }) : vue.createVNode(VImg, {
            "src": props.image,
            "cover": true
          }, null, 8, ["src", "cover"])]), vue.createVNode("div", {
            "class": "v-app-bar__content",
            "style": {
              height: convertToUnit(contentHeight.value)
            }
          }, [slots.prepend && vue.createVNode("div", {
            "class": "v-app-bar__prepend"
          }, [slots.prepend()]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.append && vue.createVNode("div", {
            "class": "v-app-bar__append"
          }, [slots.append()])], 4), isExtended && vue.createVNode("div", {
            "class": "v-app-bar__extension",
            "style": {
              height: convertToUnit(props.extensionHeight)
            }
          }, [(_slots$extension = slots.extension) == null ? void 0 : _slots$extension.call(slots)], 4)],
          _: 1
        }, 8, ["class", "style"]);
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
  function useSize(props, name) {
    const sizeClasses = vue.computed(() => {
      return predefinedSizes.includes(props.size) ? `${name}--size-${props.size}` : null;
    });
    const sizeStyles = vue.computed(() => {
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
        return vue.createVNode(props.tag, null, {
          default: () => [vue.createVNode(props.icon, null, null)]
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
          }, null, 8, ["d"])])]
        }, 16);
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
        }, null, 8, ["class"]);
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
    const icons = vue.inject(IconSymbol);
    if (!icons) throw new Error('Missing Vuetify Icons provide!');
    const iconData = vue.computed(() => {
      const iconAlias = vue.isRef(props) ? props.value : props.icon;
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
      })
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      let slotIcon;

      if (slots.default) {
        slotIcon = vue.computed(() => {
          var _slots$default, _flattenFragments$fil;

          const slot = (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
          if (!slot) return;
          return (_flattenFragments$fil = flattenFragments(slot).filter(node => node.children && typeof node.children === 'string')[0]) == null ? void 0 : _flattenFragments$fil.children;
        });
      }

      const {
        iconData
      } = useIcon(slotIcon || props);
      const {
        sizeClasses
      } = useSize(props, 'v-icon');
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, 'color'));
      return () => {
        return vue.createVNode(iconData.value.component, {
          "tag": props.tag,
          "icon": iconData.value.icon,
          "class": ['v-icon', 'notranslate', sizeClasses.value, textColorClasses.value, {
            'v-icon--left': props.left,
            'v-icon--right': props.right
          }],
          "style": [!sizeClasses.value ? {
            fontSize: convertToUnit(props.size),
            width: convertToUnit(props.size),
            height: convertToUnit(props.size)
          } : undefined, textColorStyles.value],
          "aria-hidden": "true"
        }, null, 8, ["tag", "icon", "class", "style"]);
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
  function usePosition(props, name) {
    const targets = ['top', 'right', 'bottom', 'left'];
    const positionClasses = vue.computed(() => {
      if (props.fixed) return `${name}--fixed`;
      if (props.absolute) return `${name}--absolute`;
      return props.position ? `position-${props.position}` : undefined;
    });
    const positionStyles = vue.computed(() => {
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
    const RouterLink = vue.resolveDynamicComponent('RouterLink');
    const isLink = vue.computed(() => !!(props.href || props.to));
    const isClickable = vue.computed(() => {
      return (isLink == null ? void 0 : isLink.value) || !!(attrs.onClick || attrs.onClickOnce);
    });

    if (typeof RouterLink === 'string') {
      return {
        isLink,
        isClickable,
        href: vue.toRef(props, 'href')
      };
    }

    const link = props.to ? RouterLink.useLink(props) : undefined;
    return { ...link,
      isLink,
      isClickable,
      href: vue.computed(() => props.to ? link == null ? void 0 : link.route.value.href : props.href)
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
    vue.onMounted(() => {
      window.addEventListener('popstate', onPopstate);
      removeGuard = router == null ? void 0 : router.beforeEach((to, from, next) => {
        setTimeout(() => popped ? cb(next) : next());
      });
    });
    vue.onBeforeUnmount(() => {
      var _removeGuard;

      window.removeEventListener('popstate', onPopstate);
      (_removeGuard = removeGuard) == null ? void 0 : _removeGuard();
    });

    function onPopstate(e) {
      if (e.state.replaced) return;
      popped = true;
      setTimeout(() => popped = false);
    }
  }

  const allowedVariants$2 = ['contained', 'outlined', 'plain', 'text', 'contained-text'];
  function genOverlays(isClickable, name) {
    return vue.createVNode(vue.Fragment, null, [isClickable && vue.createVNode("div", {
      "class": `${name}__overlay`
    }, null), vue.createVNode("div", {
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
  function useVariant(props, name) {
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
        textColor,
        variant,
        color
      } = vue.unref(props);
      return {
        text: textColor,
        [variant === 'contained' ? 'background' : 'text']: color
      };
    }));
    return {
      colorClasses,
      colorStyles,
      variantClasses
    };
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
      disabled: Boolean,
      ripple: {
        type: Boolean,
        default: true
      },
      ...makeBorderProps(),
      ...makeRoundedProps(),
      ...makeDensityProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
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
      } = useTheme(props);
      const {
        borderClasses
      } = useBorder(props, 'v-btn');
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props, 'v-btn');
      const {
        densityClasses
      } = useDensity(props, 'v-btn');
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        positionClasses,
        positionStyles
      } = usePosition(props, 'v-btn');
      const {
        roundedClasses
      } = useRounded(props, 'v-btn');
      const {
        sizeClasses
      } = useSize(props, 'v-btn');
      const link = useLink(props, attrs);
      const isElevated = vue.computed(() => {
        return props.variant === 'contained' && !(props.disabled || props.flat || props.border);
      });
      return () => {
        var _link$isExactActive, _slots$default;

        const Tag = link.isLink.value ? 'a' : props.tag;
        return vue.withDirectives(vue.createVNode(Tag, {
          "type": Tag === 'a' ? undefined : 'button',
          "class": ['v-btn', {
            'v-btn--active': (_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value,
            'v-btn--block': props.block,
            'v-btn--disabled': props.disabled,
            'v-btn--elevated': isElevated.value,
            'v-btn--flat': props.flat,
            'v-btn--icon': !!props.icon,
            'v-btn--stacked': props.stacked
          }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
          "style": [colorStyles.value, dimensionStyles.value, positionStyles.value],
          "disabled": props.disabled || undefined,
          "href": link.href.value,
          "onClick": props.disabled || link.navigate
        }, {
          default: () => [genOverlays(true, 'v-btn'), !props.icon && props.prependIcon && vue.createVNode(VIcon, {
            "class": "v-btn__icon",
            "icon": props.prependIcon,
            "left": !props.stacked
          }, null, 8, ["icon", "left"]), typeof props.icon === 'boolean' ? (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots) : vue.createVNode(VIcon, {
            "class": "v-btn__icon",
            "icon": props.icon,
            "size": props.size
          }, null, 8, ["icon", "size"]), !props.icon && props.appendIcon && vue.createVNode(VIcon, {
            "class": "v-btn__icon",
            "icon": props.appendIcon,
            "right": !props.stacked
          }, null, 8, ["icon", "right"])],
          _: 1
        }, 8, ["type", "class", "style", "disabled", "href", "onClick"]), [[vue.resolveDirective("ripple"), !props.disabled && props.ripple, null]]);
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

        return vue.createVNode(VBtn, {
          "class": "v-app-bar-nav-icon",
          "icon": props.icon
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
        }, 8, ["icon"]);
      };
    }

  });

  const VAppBarTitle = defineComponent({
    name: 'VAppBarTitle',
    props: { ...makeTagProps({
        tag: 'header'
      })
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => vue.createVNode(props.tag, {
        "class": "v-app-bar-title"
      }, {
        default: () => [slots.default && vue.createVNode("div", {
          "class": "v-app-bar-title__placeholder"
        }, [slots.default()])]
      });
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
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const {
        densityClasses
      } = useDensity(props, 'v-avatar');
      const {
        roundedClasses
      } = useRounded(props, 'v-avatar');
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props, 'v-avatar');
      return () => {
        var _slots$default;

        return vue.createVNode(props.tag, {
          "class": ['v-avatar', {
            'v-avatar--left': props.left,
            'v-avatar--right': props.right
          }, backgroundColorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value],
          "style": [backgroundColorStyles.value, sizeStyles.value]
        }, {
          default: () => [props.image && vue.createVNode(VImg, {
            "src": props.image,
            "alt": ""
          }, null, 8, ["src"]), props.icon && !props.image && vue.createVNode(VIcon, {
            "icon": props.icon
          }, null, 8, ["icon"]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
          _: 1
        }, 8, ["class", "style"]);
      };
    }

  });

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
      sticky: Boolean,
      text: String,
      tip: Boolean,
      type: {
        type: String,
        validator: val => allowedTypes.includes(val)
      },
      ...makeDensityProps(),
      ...makeElevationProps(),
      ...makePositionProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
      ...makeThemeProps(),
      ...makeVariantProps()
    },
    emits: {
      'update:modelValue': value => true
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const borderProps = vue.computed(() => ({
        border: props.border === true || props.tip ? 'start' : props.border
      }));
      const isActive = useProxiedModel(props, 'modelValue');
      const icon = vue.computed(() => {
        var _props$icon;

        if (props.icon === false) return undefined;
        if (!props.type) return props.icon;
        return (_props$icon = props.icon) != null ? _props$icon : `$${props.type}`;
      });
      const variantProps = vue.computed(() => {
        var _props$color;

        return {
          color: (_props$color = props.color) != null ? _props$color : props.type,
          textColor: props.textColor,
          variant: props.variant
        };
      });
      const {
        themeClasses
      } = useTheme(props);
      const {
        borderClasses
      } = useBorder(borderProps.value, 'v-alert');
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(variantProps, 'v-alert');
      const {
        densityClasses
      } = useDensity(props, 'v-alert');
      const {
        elevationClasses
      } = useElevation(props);
      const {
        positionClasses,
        positionStyles
      } = usePosition(props, 'v-alert');
      const {
        roundedClasses
      } = useRounded(props, 'v-alert');
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.computed(() => {
        var _props$borderColor;

        return (_props$borderColor = props.borderColor) != null ? _props$borderColor : props.tip ? variantProps.value.color : undefined;
      }));

      function onCloseClick(e) {
        isActive.value = false;
      }

      return () => {
        const hasBorder = !!borderProps.value.border;
        const hasClose = !!(slots.close || props.closable);
        const hasPrepend = !!(slots.prepend || props.icon || props.type);
        const hasText = !!(slots.default || props.text || hasClose);
        return isActive.value && vue.createVNode(props.tag, {
          "class": ['v-alert', {
            [`v-alert--border-${borderProps.value.border}`]: hasBorder,
            'v-alert--prominent': props.prominent,
            'v-alert--tip': props.tip
          }, themeClasses.value, borderClasses.value, !props.tip && colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
          "style": [!props.tip && colorStyles.value, positionStyles.value],
          "role": "alert"
        }, {
          default: () => [hasBorder && vue.createVNode("div", {
            "class": ['v-alert__border', textColorClasses.value],
            "style": textColorStyles.value
          }, null, 6), vue.createVNode("div", {
            "class": "v-alert__underlay"
          }, null), vue.createVNode("div", {
            "class": "v-alert__content"
          }, [hasPrepend && vue.createVNode("div", {
            "class": "v-alert__avatar"
          }, [slots.prepend ? slots.prepend() : vue.createVNode(VAvatar, {
            "class": props.tip && textColorClasses.value,
            "style": props.tip && textColorStyles.value,
            "density": props.density,
            "icon": icon.value
          }, null, 8, ["class", "style", "density", "icon"])]), hasText && vue.createVNode("div", {
            "class": "v-alert__text"
          }, [slots.default ? slots.default() : props.text, hasClose && vue.createVNode("div", {
            "class": "v-alert__close"
          }, [slots.close ? slots.close({
            props: {
              onClick: onCloseClick
            }
          }) : vue.createVNode(VBtn, {
            "density": props.density,
            "icon": props.closeIcon,
            "variant": "text",
            "onClick": onCloseClick
          }, null, 8, ["density", "icon", "onClick"])])])])],
          _: 1
        }, 8, ["class", "style"]);
      };
    }

  });

  const VBadge = defineComponent({
    name: 'VBadge',
    inheritAttrs: false,
    props: {
      bordered: Boolean,
      color: {
        type: String,
        default: 'primary'
      },
      content: String,
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
        default: 'top-right',
        validator: value => {
          const [vertical, horizontal] = (value != null ? value : '').split('-');
          return ['top', 'bottom'].includes(vertical) && ['left', 'right'].includes(horizontal);
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
      } = useRounded(props, 'v-badge');
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, 'textColor'));
      const position = vue.computed(() => {
        return props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      });

      function calculatePosition(offset) {
        return `calc(100% - ${convertToUnit(position.value + parseInt(offset != null ? offset : 0, 10))})`;
      }

      const locationStyles = vue.computed(() => {
        var _props$location;

        const [vertical, horizontal] = ((_props$location = props.location) != null ? _props$location : '').split('-'); // TODO: RTL support

        const styles = {
          bottom: 'auto',
          left: 'auto',
          right: 'auto',
          top: 'auto'
        };

        if (!props.inline) {
          styles[horizontal === 'left' ? 'right' : 'left'] = calculatePosition(props.offsetX);
          styles[vertical === 'top' ? 'bottom' : 'top'] = calculatePosition(props.offsetY);
        }

        return styles;
      });
      return () => {
        var _ctx$slots$default, _ctx$slots, _ctx$slots$badge, _ctx$slots2;

        const value = Number(props.content);
        const content = !props.max || isNaN(value) ? props.content : value <= props.max ? value : `${props.max}+`;
        const [badgeAttrs, attrs] = pick(ctx.attrs, ['aria-atomic', 'aria-label', 'aria-live', 'role', 'title']);
        return vue.createVNode(props.tag, vue.mergeProps({
          "class": ['v-badge', {
            'v-badge--bordered': props.bordered,
            'v-badge--dot': props.dot,
            'v-badge--floating': props.floating,
            'v-badge--inline': props.inline
          }]
        }, attrs), {
          default: () => [vue.createVNode("div", {
            "class": "v-badge__wrapper"
          }, [(_ctx$slots$default = (_ctx$slots = ctx.slots).default) == null ? void 0 : _ctx$slots$default.call(_ctx$slots), vue.createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => [vue.withDirectives(vue.createVNode("span", vue.mergeProps({
              "class": ['v-badge__badge', backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
              "style": [backgroundColorStyles.value, locationStyles.value, textColorStyles.value],
              "aria-atomic": "true",
              "aria-label": "locale string here",
              "aria-live": "polite",
              "role": "status"
            }, badgeAttrs), [props.dot ? undefined : ctx.slots.badge ? (_ctx$slots$badge = (_ctx$slots2 = ctx.slots).badge) == null ? void 0 : _ctx$slots$badge.call(_ctx$slots2) : props.icon ? vue.createVNode(VIcon, {
              "icon": props.icon
            }, null, 8, ["icon"]) : vue.createVNode("span", {
              "class": "v-badge__content"
            }, [content])], 16), [[vue.vShow, props.modelValue]])]
          }, 8, ["transition"])])]
        }, 16, ["class"]);
      };
    }

  });

  const VBannerActions = createSimpleFunctional('v-banner-actions');

  const VBannerAvatar = defineComponent({
    name: 'VBannerAvatar',
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
        return vue.createVNode(props.tag, {
          "class": ['v-banner-avatar', {
            'v-banner-avatar--start': props.left,
            'v-banner-avatar--end': props.right
          }]
        }, slots, 8, ["class"]);
      };
    }

  });

  const VBannerContent = createSimpleFunctional('v-banner-content');

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
    const height = vue.ref(getClientHeight());
    const platform = getPlatform();
    const state = vue.reactive({});
    const width = vue.ref(getClientWidth());

    function onResize() {
      height.value = getClientHeight();
      width.value = getClientWidth();
    } // eslint-disable-next-line max-statements


    vue.watchEffect(() => {
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

    return vue.toRefs(state);
  }
  function useDisplay() {
    const display = vue.inject(DisplaySymbol);
    if (!display) throw new Error('Could not find Vuetify display injection');
    return display;
  }

  const VBanner = defineComponent({
    name: 'VBanner',
    props: {
      avatar: String,
      color: String,
      icon: String,
      lines: {
        type: String,
        default: 'one'
      },
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
      } = useTheme(props);
      const {
        borderClasses
      } = useBorder(props, 'v-banner');
      const {
        densityClasses
      } = useDensity(props, 'v-banner');
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
      } = usePosition(props, 'v-banner');
      const {
        roundedClasses
      } = useRounded(props, 'v-banner');
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, 'color'));
      return () => {
        var _slots$default;

        const hasAvatar = !!(props.avatar || props.icon || slots.avatar || slots.icon);
        const hasText = !!(props.text || slots.text);
        const hasContent = hasAvatar || hasText || slots.default;
        return vue.createVNode(props.tag, {
          "class": ['v-banner', {
            'v-banner--mobile': mobile.value,
            'v-banner--sticky': props.sticky,
            [`v-banner--${props.lines}-line`]: true
          }, borderClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, textColorClasses.value, themeClasses.value],
          "style": [dimensionStyles.value, positionStyles.value, textColorStyles.value],
          "role": "banner"
        }, {
          default: () => [hasContent && vue.createVNode(VBannerContent, null, {
            default: () => [hasAvatar && vue.createVNode(VBannerAvatar, null, {
              default: () => [slots.avatar ? slots.avatar() : vue.createVNode(VAvatar, {
                "density": props.density,
                "icon": props.icon,
                "image": props.avatar
              }, null, 8, ["density", "icon", "image"])]
            }), hasText && vue.createVNode(VBannerText, null, {
              default: () => [slots.text ? slots.text() : props.text]
            }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
            _: 1
          }), slots.actions && vue.createVNode(VBannerActions, null, {
            default: slots.actions
          })],
          _: 1
        }, 8, ["class", "style"]);
      };
    }

  });

  const VBottomNavigation = defineComponent({
    name: 'VBottomNavigation',
    props: {
      bgColor: String,
      color: String,
      grow: Boolean,
      modelValue: {
        type: Boolean,
        default: true
      },
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
      } = useTheme(props);
      const {
        borderClasses
      } = useBorder(props, 'v-bottom-navigation');
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.computed(() => props.bgColor));
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.computed(() => props.color));
      const {
        densityClasses
      } = useDensity(props, 'v-bottom-navigation');
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props, 'v-bottom-navigation');
      const height = vue.computed(() => Number(props.height) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0));
      const isActive = useProxiedModel(props, 'modelValue', props.modelValue);
      const layoutStyles = useLayoutItem(props.name, vue.computed(() => props.priority), vue.computed(() => 'bottom'), vue.computed(() => isActive.value ? height.value : 0), height, isActive);
      return () => {
        return vue.createVNode(props.tag, {
          "class": ['v-bottom-navigation', {
            'v-bottom-navigation--grow': props.grow,
            'v-bottom-navigation--horizontal': props.mode === 'horizontal',
            'v-bottom-navigation--is-active': isActive.value,
            'v-bottom-navigation--shift': props.mode === 'shift',
            'v-bottom-navigation--absolute': props.absolute
          }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, textColorClasses.value],
          "style": [backgroundColorStyles.value, layoutStyles.value, textColorStyles.value, {
            height: convertToUnit(height.value),
            transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, '%')})`
          }]
        }, {
          default: () => [slots.default && vue.createVNode("div", {
            "class": "v-bottom-navigation__content"
          }, [slots.default()])]
        }, 8, ["class", "style"]);
      };
    }

  });

  const VBreadcrumbsSymbol = Symbol.for('vuetify:breadcrumbs');

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
      const breadcrumbs = vue.inject(VBreadcrumbsSymbol);
      if (!breadcrumbs) throw new Error('[Vuetify] Could not find v-breadcrumbs provider');
      const link = useLink(props, attrs);
      const isActive = vue.computed(() => {
        var _link$isExactActive;

        return props.active || ((_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value);
      });
      const color = vue.computed(() => {
        var _props$activeColor;

        if (isActive.value) return (_props$activeColor = props.activeColor) != null ? _props$activeColor : breadcrumbs.color.value;
        return props.color;
      });
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(color);
      return () => {
        var _slots$default;

        const Tag = link.isLink.value ? 'a' : props.tag;
        return vue.createVNode(Tag, {
          "class": ['v-breadcrumbs-item', {
            'v-breadcrumbs-item--active': isActive.value,
            'v-breadcrumbs-item--disabled': props.disabled || breadcrumbs.disabled.value,
            'v-breadcrumbs-item--link': link.isLink.value,
            [`${props.activeClass}`]: isActive.value && props.activeClass
          }, textColorClasses.value],
          "style": [textColorStyles.value],
          "aria-current": isActive.value ? 'page' : undefined,
          "onClick": isActive.value && link.navigate
        }, {
          default: () => [props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
          _: 1
        }, 8, ["class", "style", "aria-current", "onClick"]);
      };
    }

  });

  const VBreadcrumbsDivider = createSimpleFunctional('v-breadcrumbs-divider', 'li');

  const VBreadcrumbs = defineComponent({
    name: 'VBreadcrumbs',
    props: {
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
      } = useDensity(props, 'v-breadcrumbs');
      const {
        roundedClasses
      } = useRounded(props, 'v-breadcrumbs');
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vue.toRef(props, 'color'));
      const items = vue.computed(() => {
        return props.items.map((item, index, array) => ({
          props: {
            disabled: index >= array.length - 1,
            ...(typeof item === 'string' ? {
              text: item
            } : item)
          }
        }));
      });
      vue.provide(VBreadcrumbsSymbol, {
        color: vue.toRef(props, 'color'),
        disabled: vue.toRef(props, 'disabled')
      });
      return () => {
        var _slots$default;

        return vue.createVNode(props.tag, {
          "class": ['v-breadcrumbs', densityClasses.value, roundedClasses.value, textColorClasses.value],
          "style": [textColorStyles.value]
        }, {
          default: () => [props.icon && vue.createVNode(VIcon, {
            "icon": props.icon,
            "left": true
          }, null, 8, ["icon", "left"]), items.value.map((item, index) => {
            var _slots$item;

            return vue.createVNode(vue.Fragment, null, [vue.createVNode(VBreadcrumbsItem, vue.mergeProps({
              "key": index
            }, item.props), {
              default: () => [(_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, { ...item,
                index
              })]
            }, 16), index < props.items.length - 1 && vue.createVNode(VBreadcrumbsDivider, null, {
              default: () => [slots.divider ? slots.divider({ ...item,
                index
              }) : props.divider]
            })]);
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
          _: 1
        }, 8, ["class", "style"]);
      };
    }

  });

  const VBtnGroup = defineComponent({
    name: 'VBtnGroup',
    props: {
      tag: {
        type: String,
        default: 'div'
      }
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        var _slots$default;

        return vue.createVNode(props.tag, {
          "class": "v-btn-group"
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
        });
      };
    }

  });

  const VCardActions = createSimpleFunctional('v-card-actions');

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
      } = useTheme(props);
      const {
        borderClasses
      } = useBorder(props, 'v-card');
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props, 'v-card');
      const {
        densityClasses
      } = useDensity(props, 'v-card');
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        positionClasses,
        positionStyles
      } = usePosition(props, 'v-card');
      const {
        roundedClasses
      } = useRounded(props, 'v-card');
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
        return vue.withDirectives(vue.createVNode(Tag, {
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
          default: () => [genOverlays(isClickable, 'v-card'), hasImage && vue.createVNode(VCardImg, null, {
            default: () => [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots, {
              src: props.image
            }) : vue.createVNode(VImg, {
              "src": props.image,
              "cover": true,
              "alt": ""
            }, null, 8, ["src", "cover"])]
          }), (_slots$media = slots.media) == null ? void 0 : _slots$media.call(slots), hasHeader && vue.createVNode(VCardHeader, null, {
            default: () => [hasPrepend && vue.createVNode(VCardAvatar, null, {
              default: () => [slots.prepend ? slots.prepend() : vue.createVNode(VAvatar, {
                "density": props.density,
                "icon": props.prependIcon,
                "image": props.prependAvatar
              }, null, 8, ["density", "icon", "image"])]
            }), hasHeaderText && vue.createVNode(VCardHeaderText, null, {
              default: () => [hasTitle && vue.createVNode(VCardTitle, null, {
                default: () => [slots.title ? slots.title() : props.title]
              }), vue.createVNode(VCardSubtitle, null, {
                default: () => [slots.subtitle ? slots.subtitle() : props.subtitle]
              })],
              _: 1
            }), hasAppend && vue.createVNode(VCardAvatar, null, {
              default: () => [slots.append ? slots.append() : vue.createVNode(VAvatar, {
                "density": props.density,
                "icon": props.appendIcon,
                "image": props.appendAvatar
              }, null, 8, ["density", "icon", "image"])]
            })],
            _: 1
          }), hasText && vue.createVNode(VCardText, null, {
            default: () => [slots.text ? slots.text() : props.text]
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.actions && vue.createVNode(VCardActions, null, {
            default: slots.actions
          })],
          _: 1
        }, 8, ["class", "style", "href", "onClick"]), [[vue.resolveDirective("ripple"), isClickable]]);
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
        return props.target ? vue.createVNode(vue.Transition, vue.mergeProps({
          "name": "dialog-transition"
        }, functions, {
          "css": false
        }), slots, 16) : vue.createVNode(vue.Transition, {
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

  const VMessages = defineComponent({
    name: 'VMessages',
    props: {
      active: Boolean,
      value: {
        type: [Array, String],
        default: () => []
      },
      ...makeTransitionProps({
        transition: {
          component: VSlideYTransition,
          group: true
        }
      })
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const messages = vue.computed(() => wrapInArray(props.value));
      return () => {
        var _slots$default;

        return vue.createVNode(MaybeTransition, {
          "transition": props.transition,
          "tag": "div",
          "class": "v-messages"
        }, {
          default: () => [messages.value.length > 0 && props.active && messages.value.map((message, i) => vue.createVNode("div", {
            "class": "v-messages__message",
            "key": i
          }, [message])), slots == null ? void 0 : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
          _: 1
        }, 8, ["transition"]);
      };
    }

  });

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
    const vm = getCurrentInstance('createForm');
    const model = useProxiedModel(props, 'modelValue');
    const isDisabled = vue.computed(() => props.disabled);
    const isReadonly = vue.computed(() => props.readonly);
    const isValidating = vue.ref(false);
    const items = vue.ref([]);
    const errorMessages = vue.ref([]);

    async function submit(e) {
      e.preventDefault();
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
      vm == null ? void 0 : vm.emit('submit', e);
    }

    async function reset(e) {
      e.preventDefault();
      items.value.forEach(item => item.reset());
      model.value = null;
      vm == null ? void 0 : vm.emit('reset', e);
    }

    async function resetValidation() {
      items.value.forEach(item => item.resetValidation());
      errorMessages.value = [];
      model.value = null;
      vm == null ? void 0 : vm.emit('resetValidation');
    }

    vue.provide(FormKey, {
      register: (id, validate, reset, resetValidation) => {
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
      submit,
      reset,
      resetValidation
    };
  }
  function useForm() {
    return vue.inject(FormKey, null);
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
    modelValue: {
      type: null,
      default: undefined
    }
  });
  function useValidation(props, name) {
    const form = useForm();
    const errorMessages = vue.ref([]);
    const isPristine = vue.ref(true);
    const isDisabled = vue.computed(() => !!(props.disabled || form != null && form.isDisabled.value));
    const isReadonly = vue.computed(() => !!(props.readonly || form != null && form.isReadonly.value));
    const isValid = vue.computed(() => {
      var _props$errorMessages;

      if (props.error || (_props$errorMessages = props.errorMessages) != null && _props$errorMessages.length || errorMessages.value.length) return false;
      return isPristine.value ? null : true;
    });
    const isValidating = vue.ref(false);
    const validationClasses = vue.computed(() => {
      return {
        [`${name}--error`]: isValid.value === false,
        [`${name}--disabled`]: isDisabled.value,
        [`${name}--readonly`]: isReadonly.value
      };
    });
    const vm = getCurrentInstance('useValidation');
    const uid = vue.computed(() => {
      var _props$name;

      return (_props$name = props.name) != null ? _props$name : getUid();
    });
    vue.onBeforeMount(() => {
      form == null ? void 0 : form.register(uid.value, validate, reset, resetValidation);
    });
    vue.onBeforeUnmount(() => {
      form == null ? void 0 : form.unregister(uid.value);
    });

    function reset() {
      resetValidation();
      vm == null ? void 0 : vm.emit('update:modelValue', null);
    }

    function resetValidation() {
      isPristine.value = true;
      errorMessages.value = [];
    }

    async function validate() {
      const results = [];
      errorMessages.value = [];
      isValidating.value = true;

      for (const rule of props.rules) {
        var _props$modelValue$val, _props$modelValue;

        if (results.length >= (props.maxErrors || 1)) {
          break;
        }

        const handler = typeof rule === 'function' ? rule : () => rule;
        const result = await handler((_props$modelValue$val = props == null ? void 0 : (_props$modelValue = props.modelValue) == null ? void 0 : _props$modelValue.value) != null ? _props$modelValue$val : props.modelValue);
        if (result === true) continue;

        if (typeof result !== 'string') {
          // eslint-disable-next-line no-console
          console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }

        results.push(result);
      }

      errorMessages.value = results;
      isValidating.value = false;
      isPristine.value = false;
      return errorMessages.value;
    }

    return {
      errorMessages,
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
    appendIcon: String,
    prependIcon: String,
    focused: Boolean,
    hideDetails: [Boolean, String],
    hint: String,
    messages: {
      type: [Array, String],
      default: () => []
    },
    persistentHint: Boolean,
    ...makeDensityProps(),
    ...makeValidationProps()
  });
  const VInput = genericComponent()({
    name: 'VInput',
    props: makeVInputProps(),
    emits: {
      'click:prepend': e => true,
      'click:append': e => true
    },

    setup(props, _ref) {
      let {
        slots,
        emit
      } = _ref;
      const {
        densityClasses
      } = useDensity(props, 'v-input');
      const {
        errorMessages,
        isDisabled,
        isReadonly,
        isPristine,
        isValid,
        isValidating,
        reset,
        resetValidation,
        validate,
        validationClasses
      } = useValidation(props, 'v-input');
      const slotProps = vue.computed(() => ({
        isDisabled,
        isReadonly,
        isPristine,
        isValid,
        isValidating,
        reset,
        resetValidation,
        validate
      }));
      return () => {
        var _props$messages, _slots$prepend, _slots$default, _slots$append, _slots$details;

        const hasPrepend = slots.prepend || props.prependIcon;
        const hasAppend = slots.append || props.appendIcon;
        const hasHint = !!(slots.hint || props.hint);
        const hasMessages = !!(slots.messages || (_props$messages = props.messages) != null && _props$messages.length || errorMessages.value.length);
        const hasDetails = !props.hideDetails || props.hideDetails === 'auto' && (hasMessages || hasHint);
        const showMessages = hasMessages || hasHint && (props.persistentHint || props.focused);
        return vue.createVNode("div", {
          "class": ['v-input', densityClasses.value, validationClasses.value]
        }, [hasPrepend && vue.createVNode("div", {
          "class": "v-input__prepend",
          "onClick": e => emit('click:prepend', e)
        }, [slots == null ? void 0 : (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps.value), props.prependIcon && vue.createVNode(VIcon, {
          "icon": props.prependIcon
        }, null, 8, ["icon"])], 8, ["onClick"]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value), hasAppend && vue.createVNode("div", {
          "class": "v-input__append",
          "onClick": e => emit('click:append', e)
        }, [slots == null ? void 0 : (_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, slotProps.value), props.appendIcon && vue.createVNode(VIcon, {
          "icon": props.appendIcon
        }, null, 8, ["icon"])], 8, ["onClick"]), hasDetails && vue.createVNode("div", {
          "class": "v-input__details"
        }, [vue.createVNode(VMessages, {
          "active": showMessages,
          "value": hasMessages ? props.messages : [props.hint]
        }, {
          default: slots.messages
        }, 8, ["active", "value"]), (_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps.value)])], 2);
      };
    }

  });
  function filterInputAttrs(attrs) {
    return pick(attrs, ['class', 'style', 'id', /^data-/]);
  }
  function filterInputProps(attrs) {
    return pick(attrs, Object.keys(VInput.props).map(toKebabCase));
  }

  const VLabel = defineComponent({
    name: 'VLabel',
    props: {
      disabled: Boolean,
      error: Boolean,
      text: String,
      ...makeThemeProps()
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        var _slots$default;

        return vue.createVNode("label", {
          "class": ['v-label', {
            'v-label--disabled': props.disabled,
            'v-label--error': props.error
          }]
        }, [props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 2);
      };
    }

  });

  const VSelectionControlGroupSymbol = Symbol.for('vuetify:selection-control-group');
  const VSelectionControlGroup = vue.defineComponent({
    name: 'VSelectionControlGroup',
    props: {
      disabled: Boolean,
      id: String,
      inline: Boolean,
      name: String,
      offIcon: String,
      onIcon: String,
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
      const id = vue.computed(() => props.id || `v-selection-control-group-${uid}`);
      const name = vue.computed(() => props.name || id.value);
      vue.provide(VSelectionControlGroupSymbol, {
        disabled: vue.toRef(props, 'disabled'),
        inline: vue.toRef(props, 'inline'),
        modelValue,
        multiple: vue.computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
        name,
        offIcon: vue.toRef(props, 'offIcon'),
        onIcon: vue.toRef(props, 'onIcon'),
        readonly: vue.toRef(props, 'readonly'),
        type: vue.toRef(props, 'type')
      });
      useRender(() => {
        var _slots$default;

        return vue.createVNode("div", {
          "class": "v-selection-control-group",
          "aria-labelled-by": props.type === 'radio' ? id.value : undefined,
          "role": props.type === 'radio' ? 'radiogroup' : undefined
        }, [slots == null ? void 0 : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 8, ["aria-labelled-by", "role"]);
      });
      return {};
    }

  });

  const selectionControlProps = {
    color: String,
    disabled: Boolean,
    error: Boolean,
    id: String,
    inline: Boolean,
    label: String,
    offIcon: String,
    onIcon: String,
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
  };
  function useSelectionControl(props) {
    const group = vue.inject(VSelectionControlGroupSymbol, undefined);
    const {
      densityClasses
    } = useDensity(props, 'v-selection-control');
    const modelValue = useProxiedModel(props, 'modelValue');
    const trueValue = vue.computed(() => props.trueValue !== undefined ? props.trueValue : props.value !== undefined ? props.value : true);
    const falseValue = vue.computed(() => props.falseValue !== undefined ? props.falseValue : false);
    const isMultiple = vue.computed(() => (group == null ? void 0 : group.multiple.value) || !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
    const model = vue.computed({
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
    } = useTextColor(vue.computed(() => {
      return model.value && !props.error && !props.disabled ? props.color : undefined;
    }));
    const icon = vue.computed(() => {
      var _group$onIcon$value, _group$offIcon$value;

      return model.value ? (_group$onIcon$value = group == null ? void 0 : group.onIcon.value) != null ? _group$onIcon$value : props.onIcon : (_group$offIcon$value = group == null ? void 0 : group.offIcon.value) != null ? _group$offIcon$value : props.offIcon;
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
    props: selectionControlProps,
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
      const id = vue.computed(() => props.id || `input-${uid}`);
      const isFocused = vue.ref(false);
      const isFocusVisible = vue.ref(false);
      const input = vue.ref();

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
        return vue.createVNode("div", {
          "class": ['v-selection-control', {
            'v-selection-control--dirty': model.value,
            'v-selection-control--disabled': props.disabled,
            'v-selection-control--error': props.error,
            'v-selection-control--focused': isFocused.value,
            'v-selection-control--focus-visible': isFocusVisible.value,
            'v-selection-control--inline': (group == null ? void 0 : group.inline.value) || props.inline
          }, densityClasses.value, textColorClasses.value]
        }, [vue.createVNode("div", {
          "class": "v-selection-control__wrapper"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), vue.withDirectives(vue.createVNode("div", {
          "class": ['v-selection-control__input'],
          "style": textColorStyles.value
        }, [icon.value && vue.createVNode(VIcon, {
          "icon": icon.value
        }, null, 8, ["icon"]), vue.withDirectives(vue.createVNode("input", vue.mergeProps({
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
        }, attrs), null, 16, ["onUpdate:modelValue", "disabled", "id", "onBlur", "onFocus", "readonly", "type", "value", "name", "aria-checked"]), [[vue.vModelDynamic, model.value]]), (_slots$input = slots.input) == null ? void 0 : _slots$input.call(slots, {
          model,
          textColorClasses,
          props: {
            onFocus,
            onBlur,
            id: id.value
          }
        })], 4), [[vue.resolveDirective("ripple"), props.ripple && [!props.disabled && !props.readonly, null, ['center', 'circle']]]])]), vue.createVNode(VLabel, {
          "disabled": props.disabled,
          "error": props.error,
          "for": id.value
        }, {
          default: () => [label],
          _: 2
        }, 8, ["disabled", "error", "for"])], 2);
      });
      return {
        isFocused,
        input
      };
    }

  });

  const VCheckbox = vue.defineComponent({
    name: 'VCheckbox',
    inheritAttrs: false,
    props: {
      indeterminate: Boolean,
      indeterminateIcon: {
        type: String,
        default: '$checkboxIndeterminate'
      },
      offIcon: {
        type: String,
        default: '$checkboxOff'
      },
      onIcon: {
        type: String,
        default: '$checkboxOn'
      },
      modelValue: null
    },
    emits: {
      'update:indeterminate': val => true,
      'update:modelValue': val => true
    },

    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const model = useProxiedModel(props, 'modelValue');
      const indeterminate = useProxiedModel(props, 'indeterminate');
      const offIcon = vue.computed(() => {
        return indeterminate.value ? props.indeterminateIcon : props.offIcon;
      });
      const onIcon = vue.computed(() => {
        return indeterminate.value ? props.indeterminateIcon : props.onIcon;
      });

      function onChange() {
        if (indeterminate.value) {
          indeterminate.value = false;
        }
      }

      useRender(() => {
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [rootProps, inputProps] = filterInputProps(inputAttrs);
        return vue.createVNode(VInput, vue.mergeProps({
          "class": "v-checkbox"
        }, rootAttrs, rootProps), { ...slots,
          default: _ref2 => {
            let {
              isDisabled,
              isReadonly
            } = _ref2;
            return vue.createVNode(VSelectionControl, vue.mergeProps({
              "type": "checkbox",
              "modelValue": model.value,
              "onUpdate:modelValue": [$event => model.value = $event, onChange],
              "disabled": isDisabled.value,
              "readonly": isReadonly.value,
              "offIcon": offIcon.value,
              "onIcon": onIcon.value,
              "aria-checked": indeterminate.value ? 'mixed' : undefined
            }, inputProps), null, 16, ["modelValue", "onUpdate:modelValue", "disabled", "readonly", "offIcon", "onIcon", "aria-checked"]);
          }
        }, 16);
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
      disabled: Boolean,
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
      ...makeRoundedProps(),
      ...makeRouterProps(),
      ...makeSizeProps(),
      ...makeTagProps({
        tag: 'span'
      }),
      ...makeThemeProps(),
      ...makeVariantProps({
        variant: 'contained'
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
      } = useTheme(props);
      const {
        borderClasses
      } = useBorder(props, 'v-chip');
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(props, 'v-chip');
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props, 'v-chip');
      const {
        sizeClasses
      } = useSize(props, 'v-chip');
      const {
        densityClasses
      } = useDensity(props, 'v-chip');
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
        const hasPrepend = !!(slots.prepend || props.prependIcon || props.prependAvatar);
        const isClickable = !props.disabled && (link.isClickable.value || props.link);
        return isActive.value && vue.withDirectives(vue.createVNode(Tag, {
          "class": ['v-chip', {
            'v-chip--disabled': props.disabled,
            'v-chip--label': props.label,
            'v-chip--link': isClickable,
            'v-chip--pill': props.pill
          }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
          "style": [colorStyles.value],
          "disabled": props.disabled || undefined,
          "draggable": props.draggable,
          "href": link.href.value,
          "onClick": isClickable && link.navigate
        }, {
          default: () => [genOverlays(isClickable, 'v-chip'), hasPrepend && vue.createVNode("div", {
            "class": "v-chip__prepend"
          }, [slots.prepend ? slots.prepend() : vue.createVNode(VAvatar, {
            "icon": props.prependIcon,
            "image": props.prependAvatar,
            "size": props.size
          }, null, 8, ["icon", "image", "size"])]), (_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)) != null ? _slots$default : props.text, hasAppend && vue.createVNode("div", {
            "class": "v-chip__append"
          }, [slots.append ? slots.append() : vue.createVNode(VAvatar, {
            "icon": props.appendIcon,
            "image": props.appendAvatar,
            "size": props.size
          }, null, 8, ["icon", "image", "size"])]), hasClose && vue.createVNode("div", {
            "class": "v-chip__close",
            "onClick": onCloseClick
          }, [slots.close ? slots.close({
            props: {
              onClick: onCloseClick
            }
          }) : vue.createVNode(VIcon, {
            "icon": props.closeIcon,
            "size": "x-small"
          }, null, 8, ["icon"])], 8, ["onClick"])],
          _: 1
        }, 8, ["class", "style", "disabled", "draggable", "href", "onClick"]), [[vue.resolveDirective("ripple"), isClickable && props.ripple, null]]);
      };
    }

  });

  const VCode = createSimpleFunctional('v-code');

  const VCounter = vue.defineComponent({
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
      return () => {
        return vue.createVNode(MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [vue.withDirectives(vue.createVNode("div", {
            "class": "v-counter"
          }, [slots.default ? slots.default({
            counter: counter.value,
            max: props.max,
            value: props.value
          }) : counter.value], 512), [[vue.vShow, props.active]])]
        }, 8, ["transition"]);
      };
    }

  });

  const VDefaultsProvider = vue.defineComponent({
    name: 'VDefaultsProvider',
    props: {
      defaults: Object
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      provideDefaults(props);
      return () => {
        var _slots$default;

        return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
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
    const activatorEl = vue.ref();
    let isHovered = false;
    let isFocused = false;
    const openOnFocus = vue.computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
    const openOnClick = vue.computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
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
    let scope;
    vue.watch(() => !!props.activator, val => {
      if (val && IN_BROWSER) {
        scope = vue.effectScope();
        scope.run(() => {
          _useActivator(props, {
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
    return {
      activatorEl,
      activatorEvents
    };
  }

  function _useActivator(props, _ref) {
    let {
      activatorEl,
      activatorEvents
    } = _ref;
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
    const contentStyles = vue.ref({});
    const updatePosition = vue.ref();
    let scope;
    vue.watchEffect(async () => {
      var _scope;

      (_scope = scope) == null ? void 0 : _scope.stop();
      updatePosition.value = undefined;
      if (!(IN_BROWSER && data.isActive.value && props.positionStrategy)) return;
      scope = vue.effectScope();
      await vue.nextTick();
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
    vue.onScopeDispose(() => {
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

    const preferredAnchor = vue.computed(() => parseAnchor(props.anchor));
    const preferredOrigin = vue.computed(() => props.origin === 'overlap' ? preferredAnchor.value : props.origin === 'auto' ? oppositeAnchor(preferredAnchor.value) : parseAnchor(props.origin));
    const doesOverlap = vue.computed(() => {
      return preferredAnchor.value.side === preferredOrigin.value.side;
    });
    const configuredMaxHeight = vue.computed(() => {
      const val = parseFloat(props.maxHeight);
      return isNaN(val) ? Infinity : val;
    });
    const configuredMinWidth = vue.computed(() => {
      const val = parseFloat(props.minWidth);
      return isNaN(val) ? Infinity : val;
    });
    let observe = false;
    const observer = new ResizeObserver(() => {
      if (observe) updatePosition();
    });
    observer.observe(data.activatorEl.value);
    observer.observe(data.contentEl.value);
    vue.onScopeDispose(() => {
      observer.disconnect();
    }); // eslint-disable-next-line max-statements

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
      } = getOffset(targetPoint, contentPoint);
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

    vue.watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset], () => updatePosition(), {
      immediate: !activatorFixed
    });
    if (activatorFixed) vue.nextTick(() => updatePosition());
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
    vue.watchEffect(async () => {
      var _scope;

      (_scope = scope) == null ? void 0 : _scope.stop();
      if (!(data.isActive.value && props.scrollStrategy)) return;
      scope = vue.effectScope();
      await vue.nextTick();
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
    vue.onScopeDispose(() => {
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
    vue.onScopeDispose(() => {
      scrollElements.forEach(el => {
        el.removeEventListener('scroll', onScroll);
      });
    });
  }

  // Utilities

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

  const stack = vue.ref([]);
  function useStack(isActive) {
    const vm = getCurrentInstance('useStack');
    let scope;
    vue.watch(isActive, val => {
      if (val) {
        scope = vue.effectScope();
        scope.run(() => {
          stack.value.push(vm);
          vue.onScopeDispose(() => {
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
    const isTop = vue.computed(() => {
      return vue.toRaw(stack.value[stack.value.length - 1]) === vm;
    });
    return {
      isTop
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
    return vue.createVNode(vue.Transition, {
      "name": "fade-transition",
      "appear": true
    }, {
      default: () => [props.modelValue && vue.createVNode("div", vue.mergeProps({
        "class": ['v-overlay__scrim', props.color.backgroundColorClasses.value],
        "style": props.color.backgroundColorStyles.value
      }, rest), null, 16)]
    }, 8, ["appear"]);
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
      'update:modelValue': value => true
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
      } = useTeleport(vue.computed(() => props.attach || props.contained));
      const {
        themeClasses
      } = useTheme(props);
      const {
        rtlClasses
      } = useRtl();
      const {
        hasContent,
        onAfterLeave
      } = useLazy(props, isActive);
      const scrimColor = useBackgroundColor(vue.computed(() => {
        return typeof props.scrim === 'string' ? props.scrim : null;
      }));
      const {
        activatorEl,
        activatorEvents
      } = useActivator(props, isActive);
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        isTop
      } = useStack(isActive);
      const root = vue.ref();
      const contentEl = vue.ref();
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

      vue.watch(isActive, val => {
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
      const top = vue.ref();
      vue.watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, val => {
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

      useRender(() => {
        var _slots$activator, _slots$default;

        return vue.createVNode(vue.Fragment, null, [(_slots$activator = slots.activator) == null ? void 0 : _slots$activator.call(slots, {
          isActive: isActive.value,
          props: vue.mergeProps({
            modelValue: isActive.value,
            'onUpdate:modelValue': val => isActive.value = val
          }, vue.toHandlers(activatorEvents.value), props.activatorProps)
        }), vue.createVNode(vue.Teleport, {
          "disabled": !teleportTarget.value,
          "to": teleportTarget.value
        }, {
          default: () => [hasContent.value && vue.createVNode("div", vue.mergeProps({
            "class": ['v-overlay', {
              'v-overlay--absolute': props.absolute || props.contained,
              'v-overlay--active': isActive.value,
              'v-overlay--contained': props.contained
            }, themeClasses.value, rtlClasses.value],
            "style": top.value != null ? `top: ${convertToUnit(top.value)}` : undefined,
            "ref": root
          }, attrs), [vue.createVNode(Scrim, {
            "color": scrimColor,
            "modelValue": isActive.value && !!props.scrim
          }, null, 8, ["color", "modelValue"]), vue.createVNode(MaybeTransition, {
            "appear": true,
            "onAfterLeave": onAfterLeave,
            "persisted": true,
            "transition": props.transition,
            "target": activatorEl.value
          }, {
            default: () => [vue.withDirectives(vue.createVNode("div", {
              "ref": contentEl,
              "class": ['v-overlay__content', props.contentClass],
              "style": [dimensionStyles.value, contentStyles.value]
            }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
              isActive
            })], 6), [[vue.vShow, isActive.value], [vue.resolveDirective("click-outside"), {
              handler: onClickOutside,
              closeConditional,
              include: () => [activatorEl.value]
            }]])]
          }, 8, ["appear", "onAfterLeave", "persisted", "transition", "target"])], 16)]
        }, 8, ["disabled", "to"])]);
      });
      return {
        animateClick,
        contentEl,
        activatorEl
      };
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
      const overlay = vue.ref();

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
        vue.watch(() => isActive.value && props.retainFocus, val => {
          val ? document.addEventListener('focusin', onFocusin) : document.removeEventListener('focusin', onFocusin);
        }, {
          immediate: true
        });
      }

      vue.watch(isActive, async val => {
        await vue.nextTick();

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
        return vue.createVNode(VOverlay, vue.mergeProps({
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
        }, 16, ["modelValue", "onUpdate:modelValue", "class", "style", "transition", "activatorProps"]);
      };
    }

  });

  const VDivider = defineComponent({
    name: 'VDivider',
    props: {
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
      } = useTheme(props);
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
      return () => {
        return vue.createVNode("hr", {
          "class": [{
            'v-divider': true,
            'v-divider--inset': props.inset,
            'v-divider--vertical': props.vertical
          }, themeClasses.value],
          "style": dividerStyles.value,
          "aria-orientation": !attrs.role || attrs.role === 'separator' ? props.vertical ? 'vertical' : 'horizontal' : undefined,
          "role": `${attrs.role || 'separator'}`
        }, null, 14, ["aria-orientation"]);
      };
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
    value: {
      type: [Number, Boolean, String, Object],
      default: undefined
    },
    disabled: Boolean,
    selectedClass: String
  }, 'group-item'); // Composables

  function useGroupItem(props, injectKey) {
    const vm = getCurrentInstance('useGroupItem');

    if (!vm) {
      throw new Error('[Vuetify] useGroupItem composable must be used inside a component setup function');
    }

    const group = vue.inject(injectKey, null);

    if (!group) {
      throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
    }

    const id = getUid();
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
    const selectedClass = vue.computed(() => {
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
      const children = findChildren(groupVm == null ? void 0 : groupVm.vnode);
      const instances = children.slice(1) // First one is group component itself
      .filter(cmp => !!cmp.provides[injectKey]); // TODO: Fix in TS 4.4

      const index = instances.indexOf(vm);
      if (index > -1) items.splice(index, 0, unwrapped);else items.push(unwrapped);
    }

    function unregister(id) {
      if (isUnmounted) return;
      selected.value = selected.value.filter(v => v !== id);
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

    vue.onMounted(() => {
      forceMandatoryValue();
    });
    vue.onBeforeUnmount(() => {
      isUnmounted = true;
    });

    function select(id, isSelected) {
      const item = items.find(item => item.id === id);
      if (isSelected && item != null && item.disabled) return;

      if (props.multiple) {
        const internalValue = selected.value.slice();
        const index = internalValue.findIndex(v => v === id); // We can't remove value if group is
        // mandatory, value already exists,
        // and it is the only value

        if (props.mandatory && index > -1 && internalValue.length <= 1) return; // We can't add value if it would
        // cause max limit to be exceeded

        if (props.max != null && index < 0 && internalValue.length + 1 > props.max) return;
        if (index < 0 && isSelected) internalValue.push(id);else if (index >= 0 && !isSelected) internalValue.splice(index, 1);
        selected.value = internalValue;
      } else {
        if (props.mandatory && selected.value.includes(id)) return;
        selected.value = isSelected ? [id] : [];
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
      items: vue.computed(() => items.map(_ref => {
        let {
          id
        } = _ref;
        return id;
      }))
    };
    vue.provide(injectKey, state);
    return state;
  }

  function getIds(items, modelValue) {
    const ids = [];

    for (const item of items) {
      if (item.value != null) {
        if (modelValue.find(value => deepEqual(value, item.value))) {
          ids.push(item.id);
        }
      } else if (modelValue.includes(item.id)) {
        ids.push(item.id);
      }
    }

    return ids;
  }

  function getValues(items, ids) {
    const values = [];

    for (const item of items) {
      if (ids.includes(item.id)) {
        values.push(item.value != null ? item.value : item.id);
      }
    }

    return values;
  }

  const VExpansionPanelSymbol = Symbol.for('vuetify:v-expansion-panel');
  const allowedVariants$1 = ['default', 'accordion', 'inset', 'popout'];
  const VExpansionPanels = defineComponent({
    name: 'VExpansionPanels',
    props: {
      variant: {
        type: String,
        default: 'default',
        validator: v => allowedVariants$1.includes(v)
      },
      ...makeTagProps(),
      ...makeGroupProps(),
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
      } = useTheme(props);
      const variantClass = vue.computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
      return () => {
        var _slots$default;

        return vue.createVNode(props.tag, {
          "class": ['v-expansion-panels', themeClasses.value, variantClass.value]
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
        }, 8, ["class"]);
      };
    }

  });

  const makeVExpansionPanelTitleProps = propsFactory({
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
    },
    color: String
  });
  const VExpansionPanelTitle = defineComponent({
    name: 'VExpansionPanelTitle',
    directives: {
      ripple: Ripple
    },
    props: { ...makeVExpansionPanelTitleProps()
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
        expanded: expansionPanel.isSelected.value,
        disabled: expansionPanel.disabled.value,
        expandIcon: props.expandIcon,
        collapseIcon: props.collapseIcon
      }));
      return () => {
        var _slots$default;

        return vue.withDirectives(vue.createVNode("button", {
          "class": ['v-expansion-panel-title', {
            'v-expansion-panel-title--active': expansionPanel.isSelected.value
          }, backgroundColorClasses.value],
          "style": backgroundColorStyles.value,
          "type": "button",
          "tabindex": expansionPanel.disabled.value ? -1 : undefined,
          "disabled": expansionPanel.disabled.value,
          "aria-expanded": expansionPanel.isSelected.value,
          "onClick": expansionPanel.toggle
        }, [vue.createVNode("div", {
          "class": "v-expansion-panel-title__overlay"
        }, null), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value), !props.hideActions && vue.createVNode("div", {
          "class": "v-expansion-panel-title__icon"
        }, [slots.actions ? slots.actions(slotProps.value) : vue.createVNode(VIcon, {
          "icon": expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon
        }, null, 8, ["icon"])])], 14, ["tabindex", "disabled", "aria-expanded", "onClick"]), [[vue.resolveDirective("ripple"), props.ripple]]);
      };
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
      const expansionPanel = vue.inject(VExpansionPanelSymbol);
      if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel');
      const {
        hasContent,
        onAfterLeave
      } = useLazy(props, expansionPanel.isSelected);
      return () => {
        var _slots$default;

        return vue.createVNode(VExpandTransition, {
          "onAfterLeave": onAfterLeave
        }, {
          default: () => [vue.withDirectives(vue.createVNode("div", {
            "class": ['v-expansion-panel-text']
          }, [slots.default && hasContent.value && vue.createVNode("div", {
            "class": "v-expansion-panel-text__wrapper"
          }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])], 512), [[vue.vShow, expansionPanel.isSelected.value]])]
        }, 8, ["onAfterLeave"]);
      };
    }

  });

  const VExpansionPanel = defineComponent({
    name: 'VExpansionPanel',
    props: {
      title: String,
      text: String,
      bgColor: String,
      ...makeLazyProps(),
      ...makeGroupItemProps(),
      ...makeRoundedProps(),
      ...makeElevationProps(),
      ...makeTagProps(),
      ...makeVExpansionPanelTitleProps()
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const groupItem = useGroupItem(props, VExpansionPanelSymbol);
      const {
        roundedClasses
      } = useRounded(props, 'v-expansion-panel');
      const {
        elevationClasses
      } = useElevation(props);
      vue.provide(VExpansionPanelSymbol, groupItem);
      const isBeforeSelected = vue.computed(() => {
        const index = groupItem.group.items.value.indexOf(groupItem.id);
        return !groupItem.isSelected.value && groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === 1);
      });
      const isAfterSelected = vue.computed(() => {
        const index = groupItem.group.items.value.indexOf(groupItem.id);
        return !groupItem.isSelected.value && groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === -1);
      });
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(props, 'bgColor');
      return () => {
        var _slots$default;

        return vue.createVNode(props.tag, {
          "class": ['v-expansion-panel', {
            'v-expansion-panel--active': groupItem.isSelected.value,
            'v-expansion-panel--before-active': isBeforeSelected.value,
            'v-expansion-panel--after-active': isAfterSelected.value,
            'v-expansion-panel--disabled': groupItem.disabled.value
          }, roundedClasses.value, backgroundColorClasses.value],
          "style": backgroundColorStyles.value,
          "aria-expanded": groupItem.isSelected.value
        }, {
          default: () => [vue.createVNode("div", {
            "class": ['v-expansion-panel__shadow', ...elevationClasses.value]
          }, null, 2), ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) || vue.createVNode(vue.Fragment, null, [vue.createVNode(VExpansionPanelTitle, {
            "expandIcon": props.expandIcon,
            "collapseIcon": props.collapseIcon,
            "color": props.color,
            "hideActions": props.hideActions,
            "ripple": props.ripple
          }, {
            default: () => [slots.title ? slots.title() : props.title]
          }, 8, ["expandIcon", "collapseIcon", "color", "hideActions", "ripple"]), vue.createVNode(VExpansionPanelText, {
            "eager": props.eager
          }, {
            default: () => [slots.text ? slots.text() : props.text]
          }, 8, ["eager"])])],
          _: 1
        }, 8, ["class", "style", "aria-expanded"]);
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
        return vue.createVNode(VLabel, {
          "class": ['v-field-label', {
            'v-field-label--floating': props.floating
          }],
          "aria-hidden": props.floating || undefined
        }, slots, 8, ["class", "aria-hidden"]);
      };
    }

  });

  // Utilities
  function useIntersectionObserver(callback) {
    const intersectionRef = vue.ref();
    const isIntersecting = vue.ref(false);
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
      } = useTheme(props);
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
      } = useRounded(props, 'v-progress-linear');
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver();
      const max = vue.computed(() => parseInt(props.max, 10));
      const height = vue.computed(() => parseInt(props.height, 10));
      const normalizedBuffer = vue.computed(() => Math.round(parseFloat(props.bufferValue) / max.value * 100));
      const normalizedValue = vue.computed(() => Math.round(parseFloat(progress.value) / max.value * 100));
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

      return () => vue.createVNode(props.tag, {
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
        default: () => [props.stream && vue.createVNode("div", {
          "class": ['v-progress-linear__stream', textColorClasses.value],
          "style": { ...textColorStyles.value,
            [isReversed.value ? 'left' : 'right']: convertToUnit(-height.value),
            borderTop: `${convertToUnit(height.value / 2)} dotted`,
            opacity: opacity.value,
            top: `calc(50% - ${convertToUnit(height.value / 4)})`,
            width: convertToUnit(100 - normalizedBuffer.value, '%'),
            '--v-progress-linear-stream-to': convertToUnit(height.value * (isReversed.value ? 1 : -1))
          }
        }, null, 6), vue.createVNode("div", {
          "class": ['v-progress-linear__background', backgroundColorClasses.value],
          "style": [backgroundColorStyles.value, {
            opacity: opacity.value,
            width: convertToUnit(!props.stream ? 100 : normalizedBuffer.value, '%')
          }]
        }, null, 6), vue.createVNode(vue.Transition, {
          "name": transition.value
        }, {
          default: () => [!props.indeterminate ? vue.createVNode("div", {
            "class": ['v-progress-linear__determinate', barColorClasses.value],
            "style": [barColorStyles.value, {
              width: convertToUnit(normalizedValue.value, '%')
            }]
          }, null, 6) : vue.createVNode("div", {
            "class": "v-progress-linear__indeterminate"
          }, [['long', 'short'].map(bar => vue.createVNode("div", {
            "key": bar,
            "class": ['v-progress-linear__indeterminate', bar, barColorClasses.value],
            "style": barColorStyles.value
          }, null, 6))])]
        }, 8, ["name"]), slots.default && vue.createVNode("div", {
          "class": "v-progress-linear__content"
        }, [slots.default({
          value: normalizedValue.value,
          buffer: normalizedBuffer.value
        })])],
        _: 1
      }, 8, ["class", "style", "aria-valuemax", "aria-valuenow", "onClick"]);
    }

  });

  // Composables
  const makeLoaderProps = propsFactory({
    loading: Boolean
  }, 'loader');
  function useLoader(props, name) {
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
    }, null, 8, ["active", "color", "indeterminate"])]);
  }

  const allowedVariants = ['underlined', 'outlined', 'filled', 'contained', 'plain'];
  const makeVFieldProps = propsFactory({
    appendInnerIcon: String,
    bgColor: String,
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: '$clear'
    },
    color: String,
    id: String,
    label: String,
    persistentClear: Boolean,
    prependInnerIcon: String,
    reverse: Boolean,
    singleLine: Boolean,
    variant: {
      type: String,
      default: 'filled',
      validator: v => allowedVariants.includes(v)
    },
    ...makeThemeProps(),
    ...makeLoaderProps(),
    ...makeVInputProps()
  }, 'v-field');
  const VField = genericComponent()({
    name: 'VField',
    inheritAttrs: false,
    props: {
      active: Boolean,
      dirty: Boolean,
      ...makeVFieldProps()
    },
    emits: {
      'click:clear': e => true,
      'click:prepend-inner': e => true,
      'click:append-inner': e => true,
      'click:control': props => true,
      'update:active': active => true,
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
      } = useTheme(props);
      const {
        loaderClasses
      } = useLoader(props, 'v-field');
      const isActive = useProxiedModel(props, 'active');
      const uid = getUid();
      const labelRef = vue.ref();
      const floatingLabelRef = vue.ref();
      const controlRef = vue.ref();
      const inputRef = vue.ref();
      const isFocused = vue.ref(false);
      const id = vue.computed(() => props.id || `input-${uid}`);
      vue.watchEffect(() => isActive.value = isFocused.value || props.dirty);
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
        if (!props.singleLine) {
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

      function focus() {
        isFocused.value = true;
      }

      function blur() {
        isFocused.value = false;
      }

      const slotProps = vue.computed(() => ({
        isActive: isActive.value,
        isDirty: props.dirty,
        isFocused: isFocused.value,
        inputRef,
        controlRef,
        blur,
        focus
      }));

      function onClick(e) {
        if (e.target !== document.activeElement) {
          e.preventDefault();
        }

        emit('click:control', slotProps.value);
      }

      useRender(() => {
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
        const [inputProps, _] = filterInputProps(props);
        return vue.createVNode(VInput, vue.mergeProps({
          "class": ['v-field', {
            'v-field--active': isActive.value,
            'v-field--appended': hasAppend,
            'v-field--dirty': props.dirty,
            'v-field--focused': isFocused.value,
            'v-field--has-background': !!props.bgColor,
            'v-field--persistent-clear': props.persistentClear,
            'v-field--prepended': hasPrepend,
            'v-field--reverse': props.reverse,
            'v-field--single-line': props.singleLine,
            [`v-field--variant-${props.variant}`]: true
          }, themeClasses.value, loaderClasses.value, textColorClasses.value],
          "style": [textColorStyles.value],
          "focused": isFocused.value
        }, inputProps, attrs), {
          prepend: slots.prepend ? props => {
            var _slots$prepend;

            return (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, { ...props,
              ...slotProps.value
            });
          } : undefined,
          append: slots.append ? props => {
            var _slots$append;

            return (_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, { ...props,
              ...slotProps.value
            });
          } : undefined,
          details: slots.details ? props => {
            var _slots$details;

            return (_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, { ...props,
              ...slotProps.value
            });
          } : undefined,
          default: defaultProps => {
            var _slots$prependInner, _slots$default, _slots$appendInner;

            return vue.createVNode("div", {
              "class": ['v-field__control', backgroundColorClasses.value],
              "style": backgroundColorStyles.value,
              "onClick": onClick
            }, [vue.createVNode("div", {
              "class": "v-field__overlay"
            }, null), vue.createVNode(LoaderSlot, {
              "name": "v-field",
              "active": props.loading,
              "color": !defaultProps.isValid.value ? undefined : props.color
            }, {
              default: slots.loader
            }, 8, ["active", "color"]), hasPrepend && vue.createVNode("div", {
              "class": "v-field__prepend-inner",
              "onClick": e => emit('click:prepend-inner', e)
            }, [props.prependInnerIcon && vue.createVNode(VIcon, {
              "icon": props.prependInnerIcon
            }, null, 8, ["icon"]), slots == null ? void 0 : (_slots$prependInner = slots.prependInner) == null ? void 0 : _slots$prependInner.call(slots, defaultProps)], 8, ["onClick"]), vue.createVNode("div", {
              "class": "v-field__field"
            }, [['contained', 'filled'].includes(props.variant) && !props.singleLine && vue.createVNode(VFieldLabel, {
              "ref": floatingLabelRef,
              "floating": true
            }, {
              default: () => [label],
              _: 2
            }, 8, ["floating"]), vue.createVNode(VFieldLabel, {
              "ref": labelRef,
              "for": id.value
            }, {
              default: () => [label],
              _: 2
            }, 8, ["for"]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, { ...slotProps.value,
              ...defaultProps,
              props: {
                id: id.value,
                class: 'v-field__input',
                onFocus: () => isFocused.value = true,
                onBlur: () => isFocused.value = false
              },
              focus,
              blur
            })]), hasClear && vue.createVNode(VExpandXTransition, null, {
              default: () => [vue.withDirectives(vue.createVNode("div", {
                "class": "v-field__clearable",
                "onClick": e => emit('click:clear', e)
              }, [slots.clear ? slots.clear() : vue.createVNode(VIcon, {
                "icon": props.clearIcon
              }, null, 8, ["icon"])], 8, ["onClick"]), [[vue.vShow, props.dirty]])]
            }), hasAppend && vue.createVNode("div", {
              "class": "v-field__append-inner",
              "onClick": e => emit('click:append-inner', e)
            }, [slots == null ? void 0 : (_slots$appendInner = slots.appendInner) == null ? void 0 : _slots$appendInner.call(slots, defaultProps), props.appendInnerIcon && vue.createVNode(VIcon, {
              "icon": props.appendInnerIcon
            }, null, 8, ["icon"])], 8, ["onClick"]), vue.createVNode("div", {
              "class": "v-field__outline"
            }, [isOutlined && vue.createVNode(vue.Fragment, null, [vue.createVNode("div", {
              "class": "v-field__outline__start"
            }, null), vue.createVNode("div", {
              "class": "v-field__outline__notch"
            }, [!props.singleLine && vue.createVNode(VFieldLabel, {
              "ref": floatingLabelRef,
              "floating": true
            }, {
              default: () => [label],
              _: 2
            }, 8, ["floating"])]), vue.createVNode("div", {
              "class": "v-field__outline__end"
            }, null)]), ['plain', 'underlined'].includes(props.variant) && !props.singleLine && vue.createVNode(VFieldLabel, {
              "ref": floatingLabelRef,
              "floating": true
            }, {
              default: () => [label],
              _: 2
            }, 8, ["floating"])])], 14, ["onClick"]);
          }
        }, 16, ["class", "style", "focused"]);
      });
      return {
        inputRef,
        controlRef
      };
    }

  });
  // TODO: this is kinda slow, might be better to implicitly inherit props instead
  function filterFieldProps(attrs) {
    return pick(attrs, Object.keys(VField.props));
  }

  const LocaleAdapterSymbol = Symbol.for('vuetify:locale-adapter');
  const VuetifyLocaleSymbol = Symbol.for('vuetify:locale');
  function provideLocale(props) {
    const adapter = vue.inject(LocaleAdapterSymbol);
    if (!adapter) throw new Error('[Vuetify] Could not find injected locale adapter');
    return adapter.createScope(props);
  }
  function useLocale() {
    const adapter = vue.inject(LocaleAdapterSymbol);
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
      const current = wrapInRef(options.current);
      const fallback = wrapInRef(options.fallback);
      const messages = wrapInRef(options.messages);
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
        const currentScope = vue.inject(VuetifyLocaleSymbol);
        if (!currentScope) throw new Error('[Vuetify] Could not find injected locale instance');
        return currentScope;
      },
      createScope: options => {
        const currentScope = vue.inject(VuetifyLocaleSymbol);
        if (!currentScope) throw new Error('[Vuetify] Could not find injected locale instance');
        const newScope = createScope({
          current: vue.computed(() => {
            var _options$locale;

            return (_options$locale = options == null ? void 0 : options.locale) != null ? _options$locale : currentScope.current.value;
          }),
          fallback: vue.computed(() => {
            var _options$locale2;

            return (_options$locale2 = options == null ? void 0 : options.locale) != null ? _options$locale2 : currentScope.fallback.value;
          }),
          messages: vue.computed(() => {
            var _options$messages2;

            return (_options$messages2 = options == null ? void 0 : options.messages) != null ? _options$messages2 : currentScope.messages.value;
          })
        });
        vue.provide(VuetifyLocaleSymbol, newScope);
        return newScope;
      }
    };
  }

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
      showSize: {
        type: [Boolean, Number],
        default: false,
        validator: v => {
          return typeof v === 'boolean' || [1000, 1024].includes(v);
        }
      },
      ...makeVFieldProps({
        clearable: true
      }),
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
      }
    },
    emits: {
      'update:modelValue': files => true
    },

    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const {
        t
      } = useLocale();
      const model = useProxiedModel(props, 'modelValue');
      const internalDirty = vue.ref(false);
      const isDirty = vue.computed(() => {
        var _model$value;

        return internalDirty.value || !!((_model$value = model.value) != null && _model$value.length);
      });
      const base = vue.computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined);
      const totalBytes = vue.computed(() => {
        var _model$value2;

        return ((_model$value2 = model.value) != null ? _model$value2 : []).reduce((bytes, _ref2) => {
          let {
            size = 0
          } = _ref2;
          return bytes + size;
        }, 0);
      });
      const totalBytesReadable = vue.computed(() => humanReadableFileSize(totalBytes.value, base.value));
      const fileNames = vue.computed(() => {
        var _model$value3;

        return ((_model$value3 = model.value) != null ? _model$value3 : []).map(file => {
          const {
            name = '',
            size = 0
          } = file;
          return !props.showSize ? name : `${name} (${humanReadableFileSize(size, base.value)})`;
        });
      });
      const counterValue = vue.computed(() => {
        var _model$value$length, _model$value4;

        const fileCount = (_model$value$length = (_model$value4 = model.value) == null ? void 0 : _model$value4.length) != null ? _model$value$length : 0;
        if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value);else return t(props.counterString, fileCount);
      });
      const fieldRef = vue.ref();

      function focus() {
        var _fieldRef$value, _fieldRef$value$input;

        (_fieldRef$value = fieldRef.value) == null ? void 0 : (_fieldRef$value$input = _fieldRef$value.inputRef) == null ? void 0 : _fieldRef$value$input.focus();
      }

      function blur() {
        var _fieldRef$value2, _fieldRef$value2$inpu;

        (_fieldRef$value2 = fieldRef.value) == null ? void 0 : (_fieldRef$value2$inpu = _fieldRef$value2.inputRef) == null ? void 0 : _fieldRef$value2$inpu.blur();
      }

      function click() {
        var _fieldRef$value3, _fieldRef$value3$inpu;

        (_fieldRef$value3 = fieldRef.value) == null ? void 0 : (_fieldRef$value3$inpu = _fieldRef$value3.inputRef) == null ? void 0 : _fieldRef$value3$inpu.click();
      }

      useRender(() => {
        const hasCounter = !!(slots.counter || props.counter || counterValue.value);
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [fieldProps, _] = filterFieldProps(props);
        return vue.createVNode(VField, vue.mergeProps({
          "ref": fieldRef,
          "class": "v-file-input",
          "active": isDirty.value,
          "dirty": isDirty.value,
          "prepend-icon": props.prependIcon,
          "onUpdate:active": val => internalDirty.value = val,
          "onClick:control": click,
          "onClick:prepend": click,
          "onClick:clear": e => {
            var _fieldRef$value4, _fieldRef$value4$inpu;

            e.stopPropagation();
            model.value = [];
            if (!((_fieldRef$value4 = fieldRef.value) != null && (_fieldRef$value4$inpu = _fieldRef$value4.inputRef) != null && _fieldRef$value4$inpu.value)) return;
            fieldRef.value.inputRef.value = '';
          }
        }, rootAttrs, fieldProps), { ...slots,
          default: _ref3 => {
            let {
              isActive,
              inputRef,
              props: {
                class: fieldClass,
                ...slotProps
              }
            } = _ref3;
            return vue.createVNode(vue.Fragment, null, [vue.createVNode("input", vue.mergeProps({
              "ref": inputRef,
              "type": "file",
              "disabled": props.disabled,
              "multiple": props.multiple,
              "onClick": e => e.stopPropagation(),
              "onChange": e => {
                var _target$files, _inputRef$value;

                if (!e.target) return;
                const target = e.target;
                model.value = [...((_target$files = target.files) != null ? _target$files : [])];
                if (!isActive) (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.focus();
              }
            }, slotProps, inputAttrs), null, 16, ["disabled", "multiple", "onClick", "onChange"]), isDirty.value && vue.createVNode("div", {
              "class": fieldClass
            }, [slots.selection ? slots.selection({
              fileNames: fileNames.value,
              totalBytes: totalBytes.value,
              totalBytesReadable: totalBytesReadable.value
            }) : props.chips ? fileNames.value.map(text => vue.createVNode(VChip, {
              "key": text,
              "size": "small",
              "color": props.color
            }, {
              default: () => [text],
              _: 2
            }, 8, ["color"])) : fileNames.value.join(', ')], 2)]);
          },
          details: hasCounter ? () => vue.createVNode(vue.Fragment, null, [vue.createVNode("span", null, null), vue.createVNode(VCounter, {
            "value": counterValue.value
          }, slots.counter, 8, ["value"])]) : undefined
        }, 16, ["active", "dirty", "prepend-icon", "onUpdate:active", "onClick:control", "onClick:prepend", "onClick:clear"]);
      });
      return {
        fieldRef,
        focus,
        blur,
        click
      };
    }

  });

  const VFooter = defineComponent({
    name: 'VFooter',
    props: { ...makeBorderProps(),
      ...makeDimensionProps(),
      ...makeElevationProps(),
      ...makePositionProps(),
      ...makeRoundedProps(),
      ...makeTagProps(),
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
      } = useTheme(props);
      const {
        borderClasses
      } = useBorder(props, 'v-footer');
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        positionClasses,
        positionStyles
      } = usePosition(props, 'v-footer');
      const {
        roundedClasses
      } = useRounded(props, 'v-footer');
      return () => vue.createVNode(props.tag, {
        "class": ['v-footer', themeClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
        "style": [dimensionStyles.value, positionStyles.value]
      }, slots, 8, ["class", "style"]);
    }

  });

  const VForm = defineComponent({
    name: 'VForm',
    props: { ...makeFormProps()
    },
    emits: {
      'update:modelValue': val => true,
      resetValidation: () => true,
      reset: e => true,
      submit: e => true
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const form = createForm(props);
      useRender(() => {
        var _slots$default;

        return vue.createVNode("form", {
          "class": "v-form",
          "novalidate": true,
          "onReset": form.reset,
          "onSubmit": form.submit
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, form)], 40, ["novalidate", "onReset", "onSubmit"]);
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
      return () => vue.createVNode(props.tag, {
        "class": ['v-container', {
          'v-container--fluid': props.fluid
        }]
      }, slots, 8, ["class"]);
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
      props['offset' + vue.capitalize(val)] = {
        type: [String, Number],
        default: null
      };
      return props;
    }, {});
  })();

  const orderProps = (() => {
    return breakpoints$1.reduce((props, val) => {
      props['order' + vue.capitalize(val)] = {
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
      const classes = vue.computed(() => {
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

        return vue.h(props.tag, {
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
      props[prefix + vue.capitalize(val)] = def();
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
      const classes = vue.computed(() => {
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

        return vue.h(props.tag, {
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
      const hover = useProxiedModel(props, 'modelValue');
      const {
        runOpenDelay,
        runCloseDelay
      } = useDelay(props, value => !props.disabled && (hover.value = value));
      return () => {
        var _slots$default;

        return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          hover: hover.value,
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
      } = useTheme(props);
      const {
        isSelected,
        select,
        next,
        prev,
        selected
      } = useGroup(props, VItemGroupSymbol);
      return () => {
        var _slots$default;

        return vue.createVNode(props.tag, {
          "class": ['v-item-group', themeClasses.value]
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isSelected,
            select,
            next,
            prev,
            selected: selected.value
          })]
        }, 8, ["class"]);
      };
    }

  });

  // Composables
  const VItem = defineComponent({
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
        getLayoutItem,
        items
      } = createLayout(props);
      useRender(() => {
        var _slots$default;

        return vue.createVNode("div", {
          "class": layoutClasses.value
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 2);
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
      const styles = useLayoutItem(props.name, vue.toRef(props, 'priority'), vue.toRef(props, 'position'), vue.toRef(props, 'size'), vue.toRef(props, 'size'), vue.toRef(props, 'modelValue'));
      return () => {
        var _slots$default;

        return vue.createVNode("div", {
          "class": ['v-layout-item', {
            'v-layout-item--absolute': props.absolute
          }],
          "style": styles.value
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 6);
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

        return vue.withDirectives(vue.createVNode(props.tag, {
          "class": "v-lazy",
          "style": dimensionStyles.value
        }, {
          default: () => [isActive.value && vue.createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
          }, 8, ["transition"])]
        }, 8, ["style"]), [[vue.resolveDirective("intersect"), onIntersect, props.options]]);
      };
    }

  });

  const VListSubheader = defineComponent({
    name: 'VListSubheader',
    props: {
      color: String,
      inset: Boolean,
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
      return () => vue.createVNode(props.tag, {
        "class": ['v-list-subheader', {
          'v-list-subheader--inset': props.inset
        }, textColorClasses.value],
        "style": {
          textColorStyles
        }
      }, {
        default: () => [slots.default && vue.createVNode("div", {
          "class": "v-list-subheader__text"
        }, [slots.default()])]
      }, 8, ["class", "style"]);
    }

  });

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

      while (parent != null) {
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
        selected
      } = _ref;
      selected.set(id, value ? 'on' : 'off');
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
  const leafSelectStrategy = function () {
    let single = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const strategy = {
      select: _ref2 => {
        let {
          id,
          value,
          selected,
          children
        } = _ref2;
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
    select: _ref3 => {
      let {
        id,
        value,
        selected,
        children,
        parents
      } = _ref3;
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

  const classicActiveStrategy = single => {
    return _ref => {
      let {
        id,
        value,
        active
      } = _ref;
      const newActive = single ? new Set() : active;

      if (value) {
        newActive.add(id);
      } else {
        newActive.delete(id);
      }

      return newActive;
    };
  };

  const VNestedSymbol = Symbol.for('vuetify:nested');
  const emptyNested = {
    id: vue.ref(null),
    root: {
      register: () => null,
      unregister: () => null,
      parents: vue.ref(new Map()),
      children: vue.ref(new Map()),
      open: () => null,
      select: () => null,
      opened: vue.ref(new Set()),
      selected: vue.ref(new Map()),
      active: vue.ref(new Set()),
      activate: () => null,
      selectedValues: vue.ref([])
    }
  };
  const makeNestedProps = propsFactory({
    selectStrategy: [String, Function],
    openStrategy: [String, Function],
    activeStrategy: [String, Function],
    opened: Array,
    selected: Array,
    active: Array
  }, 'nested');
  const useNested = props => {
    let isUnmounted = false;
    const children = vue.ref(new Map());
    const parents = vue.ref(new Map());
    const opened = useProxiedModel(props, 'opened', props.opened, v => new Set(v), v => [...v.values()]);
    const active = useProxiedModel(props, 'active', props.active, v => new Set(v), v => [...v.values()]);
    const activeStrategy = vue.computed(() => {
      if (typeof props.activeStrategy === 'object') return props.activeStrategy;

      switch (props.activeStrategy) {
        case 'single':
          return classicActiveStrategy(true);

        case 'multiple':
        default:
          return classicActiveStrategy();
      }
    });
    const selectStrategy = vue.computed(() => {
      if (typeof props.selectStrategy === 'object') return props.selectStrategy;

      switch (props.selectStrategy) {
        case 'single-leaf':
          return leafSelectStrategy(true);

        case 'leaf':
          return leafSelectStrategy();

        case 'independent':
          return independentSelectStrategy;

        case 'classic':
        default:
          return classicSelectStrategy;
      }
    });
    const openStrategy = vue.computed(() => {
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
    vue.onBeforeUnmount(() => {
      isUnmounted = true;
    });
    const nested = {
      id: vue.ref(null),
      root: {
        opened,
        selected,
        active,
        selectedValues: vue.computed(() => {
          const arr = [];

          for (const [key, value] of selected.value.entries()) {
            if (value === 'on') arr.push(key);
          }

          return arr;
        }),
        register: (id, parentId, isGroup) => {
          parentId && parents.value.set(id, parentId);
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
          active.value.delete(id);
          selected.value.delete(id);
        },
        open: (id, value, event) => {
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
          const newSelected = selectStrategy.value.select({
            id,
            value,
            selected: new Map(selected.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newSelected && (selected.value = newSelected);
        },
        activate: (id, value, event) => {
          const newActive = activeStrategy.value({
            id,
            value,
            active: new Set(active.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newActive && (active.value = newActive);
        },
        children,
        parents
      }
    };
    vue.provide(VNestedSymbol, nested);
    return nested.root;
  };
  const useNestedItem = id => {
    const parent = vue.inject(VNestedSymbol, emptyNested);
    const computedId = vue.computed(() => {
      var _id$value;

      return (_id$value = id.value) != null ? _id$value : getUid().toString();
    });
    const item = { ...parent,
      id: computedId,
      parent: vue.computed(() => parent.root.parents.value.get(computedId.value)),
      select: (selected, e) => parent.root.select(computedId.value, selected, e),
      isSelected: vue.computed(() => parent.root.selected.value.get(computedId.value) === 'on'),
      activate: (activated, e) => parent.root.activate(computedId.value, activated, e),
      isActive: vue.computed(() => parent.root.active.value.has(computedId.value))
    };
    parent.root.register(computedId.value, parent.id.value, false);
    vue.onBeforeUnmount(() => {
      parent.root.unregister(computedId.value);
    });
    return item;
  };
  const useNestedGroup = props => {
    const parent = vue.inject(VNestedSymbol, emptyNested);
    const id = vue.computed(() => {
      var _props$value;

      return (_props$value = props.value) != null ? _props$value : getUid().toString();
    });
    const group = { ...parent,
      id,
      open: (open, e) => parent.root.open(id.value, open, e),
      isOpen: vue.computed(() => parent.root.opened.value.has(id.value)),
      isSelected: vue.computed(() => parent.root.selected.value.get(id.value) === 'on'),
      isIndeterminate: vue.computed(() => parent.root.selected.value.get(id.value) === 'indeterminate')
    };
    parent.root.register(id.value, parent.id.value, true);
    vue.onBeforeUnmount(() => {
      parent.root.unregister(id.value);
    });
    vue.provide(VNestedSymbol, group);
    return group;
  };

  const VListGroupItems = defineComponent({
    name: 'VListGroupItems',
    props: {
      open: Boolean,
      items: Array
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const parent = createList();
      const depth = useDepth(parent.hasPrepend);
      return () => {
        return vue.createVNode(VExpandTransition, null, {
          default: () => [vue.withDirectives(vue.createVNode("div", {
            "class": "v-list-group__items",
            "style": {
              '--v-list-depth': depth.value
            }
          }, [vue.createVNode(VListChildren, {
            "items": props.items
          }, slots, 8, ["items"])], 4), [[vue.vShow, props.open]])]
        });
      };
    }

  });
  const VListGroup = genericComponent()({
    name: 'VListGroup',
    props: {
      value: null,
      collapseIcon: {
        type: String,
        default: '$collapse'
      },
      expandIcon: {
        type: String,
        default: '$expand'
      },
      items: Array,
      ...makeTagProps()
    },

    setup(props, _ref2) {
      let {
        slots
      } = _ref2;
      const {
        isOpen,
        open
      } = useNestedGroup(props);
      const list = useList();

      const onClick = e => {
        open(!isOpen.value, e);
      };

      const headerProps = vue.computed(() => ({
        onClick,
        appendIcon: isOpen.value ? props.collapseIcon : props.expandIcon,
        class: 'v-list-group__header'
      }));
      return () => {
        var _slots$header;

        return vue.createVNode(props.tag, {
          "class": ['v-list-group', {
            'v-list-group--prepend': list == null ? void 0 : list.hasPrepend.value
          }]
        }, {
          default: () => [(_slots$header = slots.header) == null ? void 0 : _slots$header.call(slots, headerProps.value), vue.createVNode(VListGroupItems, {
            "items": props.items,
            "open": isOpen.value
          }, slots, 8, ["items", "open"])],
          _: 1
        }, 8, ["class"]);
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
        return vue.createVNode(props.tag, {
          "class": ['v-list-item-avatar', {
            'v-list-item-avatar--start': props.left,
            'v-list-item-avatar--end': props.right
          }]
        }, slots, 8, ["class"]);
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
      var _props$activeColor;

      let {
        attrs,
        slots
      } = _ref;
      const link = useLink(props, attrs);
      const id = vue.computed(() => {
        var _props$value;

        return (_props$value = props.value) != null ? _props$value : link.href.value;
      });
      const {
        activate,
        isActive: isNestedActive,
        select,
        isSelected,
        root,
        parent
      } = useNestedItem(id);
      const list = useList();
      const isActive = vue.computed(() => {
        var _link$isExactActive;

        return props.active || ((_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value) || isNestedActive.value;
      });
      const activeColor = (_props$activeColor = props.activeColor) != null ? _props$activeColor : props.color;
      const variantProps = vue.computed(() => ({
        color: isActive.value ? activeColor : props.color,
        textColor: props.textColor,
        variant: props.variant
      }));
      vue.onMounted(() => {
        var _link$isExactActive2;

        if ((_link$isExactActive2 = link.isExactActive) != null && _link$isExactActive2.value && parent.value != null) {
          root.open(parent.value, true);
        }
      });
      const {
        themeClasses
      } = useTheme(props);
      const {
        borderClasses
      } = useBorder(props, 'v-list-item');
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(variantProps, 'v-list-item');
      const {
        densityClasses
      } = useDensity(props, 'v-list-item');
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props, 'v-list-item');
      const slotProps = vue.computed(() => ({
        isActive: isActive.value,
        activate,
        select,
        isSelected: isSelected.value
      }));
      return () => {
        var _slots$default;

        const Tag = link.isLink.value ? 'a' : props.tag;
        const hasTitle = slots.title || props.title;
        const hasSubtitle = slots.subtitle || props.subtitle;
        const hasHeader = !!(hasTitle || hasSubtitle);
        const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
        const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
        const isClickable = !props.disabled && (link.isClickable.value || props.link || props.value != null);
        list == null ? void 0 : list.updateHasPrepend(hasPrepend);
        return vue.withDirectives(vue.createVNode(Tag, {
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
            props.value != null && activate(!isNestedActive.value, e);
          })
        }, {
          default: () => [genOverlays(isClickable || isActive.value, 'v-list-item'), hasPrepend && (slots.prepend ? slots.prepend(slotProps.value) : vue.createVNode(VListItemAvatar, {
            "left": true
          }, {
            default: () => [vue.createVNode(VAvatar, {
              "density": props.density,
              "icon": props.prependIcon,
              "image": props.prependAvatar
            }, null, 8, ["density", "icon", "image"])]
          }, 8, ["left"])), hasHeader && vue.createVNode(VListItemHeader, null, {
            default: () => [hasTitle && vue.createVNode(VListItemTitle, null, {
              default: () => [slots.title ? slots.title() : props.title]
            }), hasSubtitle && vue.createVNode(VListItemSubtitle, null, {
              default: () => [slots.subtitle ? slots.subtitle() : props.subtitle]
            })],
            _: 1
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value), hasAppend && (slots.append ? slots.append(slotProps.value) : vue.createVNode(VListItemAvatar, {
            "right": true
          }, {
            default: () => [vue.createVNode(VAvatar, {
              "density": props.density,
              "icon": props.appendIcon,
              "image": props.appendAvatar
            }, null, 8, ["density", "icon", "image"])]
          }, 8, ["right"]))],
          _: 1
        }, 8, ["class", "style", "href", "tabindex", "onClick"]), [[vue.resolveDirective("ripple"), isClickable]]);
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
      return () => {
        var _slots$default, _slots$default2, _props$items;

        return (_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)) != null ? _slots$default : (_props$items = props.items) == null ? void 0 : _props$items.map(_ref2 => {
          let {
            children,
            ...item
          } = _ref2;
          const {
            value,
            ...rest
          } = item;
          return children ? vue.createVNode(VListGroup, {
            "value": value,
            "items": children
          }, { ...slots,
            header: headerProps => slots.header ? slots.header({ ...rest,
              ...headerProps
            }) : vue.createVNode(VListItem, vue.mergeProps(rest, headerProps), null, 16)
          }, 8, ["value", "items"]) : slots.item ? slots.item(item) : vue.createVNode(VListItem, item, slots, 16);
        });
      };
    }

  });

  // Depth
  const DepthKey = Symbol.for('vuetify:depth');
  const useDepth = hasPrepend => {
    const parent = vue.inject(DepthKey, vue.ref(-1));
    const depth = vue.computed(() => parent.value + 1 + (hasPrepend != null && hasPrepend.value ? 1 : 0));
    vue.provide(DepthKey, depth);
    return depth;
  }; // List

  const ListKey = Symbol.for('vuetify:list');
  const createList = () => {
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
  };
  const useList = () => {
    return vue.inject(ListKey, null);
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
      subheader: {
        type: [Boolean, String],
        default: false
      },
      items: Array,
      ...makeNestedProps({
        selectStrategy: 'leaf',
        openStrategy: 'multiple',
        activeStrategy: 'single'
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
      'update:active': val => true
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const {
        themeClasses
      } = useTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const {
        borderClasses
      } = useBorder(props, 'v-list');
      const {
        densityClasses
      } = useDensity(props, 'v-list');
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        roundedClasses
      } = useRounded(props, 'v-list');
      const {
        open,
        select,
        activate
      } = useNested(props);
      const depth = useDepth();
      createList();
      useRender(() => {
        const hasHeader = typeof props.subheader === 'string' || slots.subheader;
        return vue.createVNode(props.tag, {
          "class": ['v-list', {
            'v-list--disabled': props.disabled,
            'v-list--nav': props.nav,
            'v-list--subheader': props.subheader,
            'v-list--subheader-sticky': props.subheader === 'sticky',
            [`v-list--${props.lines}-line`]: true
          }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value],
          "style": [backgroundColorStyles.value, dimensionStyles.value, {
            '--v-list-depth': depth.value
          }]
        }, {
          default: () => [hasHeader && (slots.subheader ? slots.subheader() : vue.createVNode(VListSubheader, null, {
            default: () => [props.subheader]
          })), vue.createVNode(VListChildren, {
            "items": props.items
          }, slots, 8, ["items"])],
          _: 1
        }, 8, ["class", "style"]);
      });
      return {
        open,
        select,
        activate
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
        return vue.createVNode(props.tag, {
          "class": ['v-list-item-media', {
            'v-list-item-media--start': props.left,
            'v-list-item-media--end': props.right
          }]
        }, slots, 8, ["class"]);
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

        return vue.createVNode("div", {
          "class": ['v-locale-provider', rtlClasses.value]
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 2);
      };
    }

  });

  // Utilities

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

        return vue.createVNode(props.tag, {
          "class": "v-main",
          "style": [mainStyles.value, ssrBootStyles.value]
        }, {
          default: () => [vue.createVNode("div", {
            "class": "v-main__wrap"
          }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]
        }, 8, ["style"]);
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
      const id = vue.computed(() => props.id || `v-menu-${uid}`);
      return () => {
        return vue.createVNode(VOverlay, vue.mergeProps({
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
        }, 16, ["modelValue", "onUpdate:modelValue", "transition", "absolute", "activatorProps"]);
      };
    }

  });

  const VNavigationDrawer = defineComponent({
    name: 'VNavigationDrawer',
    props: {
      color: String,
      disableResizeWatcher: Boolean,
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
        slots
      } = _ref;
      const {
        themeClasses
      } = useTheme(props);
      const {
        borderClasses
      } = useBorder(props, 'v-navigation-drawer');
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
      } = useRounded(props, 'v-navigation-drawer');
      const isActive = useProxiedModel(props, 'modelValue');
      const isHovering = vue.ref(false);
      const width = vue.computed(() => {
        return props.rail && props.expandOnHover && isHovering.value ? props.width : Number(props.rail ? props.railWidth : props.width);
      });
      const isTemporary = vue.computed(() => !props.permanent && (mobile.value || props.temporary));
      const layoutStyles = useLayoutItem(props.name, vue.toRef(props, 'priority'), vue.toRef(props, 'position'), vue.computed(() => isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value), width, isActive);

      if (!props.disableResizeWatcher) {
        vue.watch(mobile, val => !props.permanent && (isActive.value = !val));
      }

      vue.watch(props, val => {
        if (val.permanent) isActive.value = true;
      });
      vue.onBeforeMount(() => {
        if (props.modelValue != null) return;
        isActive.value = props.permanent || !mobile.value;
      });
      return () => {
        var _slots$image, _slots$prepend, _slots$default, _slots$append;

        const hasImage = slots.image || props.image;
        return vue.createVNode(props.tag, {
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
            'v-navigation-drawer--absolute': props.absolute
          }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value],
          "style": [backgroundColorStyles.value, layoutStyles.value]
        }, {
          default: () => [hasImage && vue.createVNode("div", {
            "class": "v-navigation-drawer__img"
          }, [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots, {
            image: props.image
          }) : vue.createVNode("img", {
            "src": props.image,
            "alt": ""
          }, null, 8, ["src"])]), slots.prepend && vue.createVNode("div", {
            "class": "v-navigation-drawer__prepend"
          }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)]), vue.createVNode("div", {
            "class": "v-navigation-drawer__content"
          }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.append && vue.createVNode("div", {
            "class": "v-navigation-drawer__append"
          }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)])],
          _: 1
        }, 8, ["onMouseenter", "onMouseleave", "class", "style"]);
      };
    }

  });

  // Utilities
  function useHydration(callback) {
    var _vm$root, _vm$root$appContext, _vm$root$appContext$a;

    if (!IN_BROWSER) return;
    const vm = getCurrentInstance('useHydration');
    const rootEl = vm == null ? void 0 : (_vm$root = vm.root) == null ? void 0 : (_vm$root$appContext = _vm$root.appContext) == null ? void 0 : (_vm$root$appContext$a = _vm$root$appContext.app) == null ? void 0 : _vm$root$appContext$a._container;
    return rootEl != null && rootEl.__vue_app__ ? callback() : vue.onMounted(callback);
  }

  // Composables
  const VNoSsr = defineComponent({
    name: 'VNoSsr',

    setup(_, _ref) {
      let {
        slots
      } = _ref;
      const show = vue.ref(false);
      useHydration(() => show.value = true);
      return () => {
        var _slots$default;

        return show.value && ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
      };
    }

  });

  // Components
  const VPaginationBtn = defineComponent({ ...VBtn,
    name: 'VPaginationBtn'
  });

  // Utilities
  function useResizeObserver(callback) {
    const resizeRef = vue.ref();
    const contentRect = vue.ref();
    const contentBoxSize = vue.ref();
    const borderBoxSize = vue.ref();
    const observer = new ResizeObserver(entries => {
      callback == null ? void 0 : callback(entries, observer);
      if (!entries.length) return;
      contentRect.value = entries[0].contentRect;
      contentBoxSize.value = entries[0].contentBoxSize[0];
      borderBoxSize.value = entries[0].borderBoxSize[0];
    });
    vue.onBeforeUnmount(() => {
      observer.disconnect();
    });
    vue.watch(resizeRef, (newValue, oldValue) => {
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
    return {
      resizeRef,
      contentRect: vue.readonly(contentRect),
      contentBoxSize: vue.readonly(contentBoxSize),
      borderBoxSize: vue.readonly(borderBoxSize)
    };
  }

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
      ...makeTagProps({
        tag: 'nav'
      }),
      ...makeElevationProps(),
      ...makeDensityProps(),
      ...makeRoundedProps(),
      ...makeSizeProps(),
      ...makeBorderProps(),
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
      } = useTheme(props);
      const maxButtons = vue.ref(-1);
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
      const length = vue.computed(() => parseInt(props.length, 10));
      const start = vue.computed(() => parseInt(props.start, 10));
      const totalVisible = vue.computed(() => {
        var _props$totalVisible;

        if (props.totalVisible) return Math.min(parseInt((_props$totalVisible = props.totalVisible) != null ? _props$totalVisible : '', 10), length.value);else if (maxButtons.value >= 0) return maxButtons.value;
        return length.value;
      });
      const range = vue.computed(() => {
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
      const items = vue.computed(() => {
        const sharedProps = {
          density: props.density,
          rounded: props.rounded,
          size: props.size
        };
        return range.value.map((item, index) => {
          const ref = e => updateRef(e, index);

          if (typeof item === 'string') {
            return {
              isActive: false,
              page: item,
              props: { ...sharedProps,
                ref,
                ellipsis: true,
                icon: true,
                disabled: true,
                variant: props.variant,
                border: props.border
              }
            };
          } else {
            const isActive = item === page.value;
            return {
              isActive,
              page: n(item),
              props: { ...sharedProps,
                ref,
                ellipsis: false,
                icon: true,
                disabled: !!props.disabled || props.length < 2,
                elevation: props.elevation,
                variant: props.variant,
                border: props.border,
                color: isActive ? props.color : undefined,
                ariaCurrent: isActive,
                ariaLabel: t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, index + 1),
                onClick: e => setValue(e, item)
              }
            };
          }
        });
      });
      const controls = vue.computed(() => {
        const sharedProps = {
          color: undefined,
          density: props.density,
          rounded: props.rounded,
          size: props.size,
          variant: props.variant,
          border: props.border
        };
        const prevDisabled = !!props.disabled || page.value <= start.value;
        const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
        return {
          first: props.showFirstLastPage ? { ...sharedProps,
            icon: isRtl.value ? props.lastIcon : props.firstIcon,
            onClick: e => setValue(e, start.value, 'first'),
            disabled: prevDisabled,
            ariaLabel: t(props.firstAriaLabel),
            ariaDisabled: prevDisabled
          } : undefined,
          prev: { ...sharedProps,
            icon: isRtl.value ? props.nextIcon : props.prevIcon,
            onClick: e => setValue(e, page.value - 1, 'prev'),
            disabled: prevDisabled,
            ariaLabel: t(props.previousAriaLabel),
            ariaDisabled: prevDisabled
          },
          next: { ...sharedProps,
            icon: isRtl.value ? props.prevIcon : props.nextIcon,
            onClick: e => setValue(e, page.value + 1, 'next'),
            disabled: nextDisabled,
            ariaLabel: t(props.nextAriaLabel),
            ariaDisabled: nextDisabled
          },
          last: props.showFirstLastPage ? { ...sharedProps,
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
          vue.nextTick(updateFocus);
        } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
          page.value = page.value + 1;
          vue.nextTick(updateFocus);
        }
      }

      return () => vue.createVNode(props.tag, {
        "ref": resizeRef,
        "class": ['v-pagination', themeClasses.value],
        "role": "navigation",
        "aria-label": t(props.ariaLabel),
        "onKeydown": onKeydown,
        "data-test": "v-pagination-root"
      }, {
        default: () => [vue.createVNode("ul", {
          "class": "v-pagination__list"
        }, [props.showFirstLastPage && vue.createVNode("li", {
          "class": "v-pagination__first",
          "data-test": "v-pagination-first"
        }, [slots.first ? slots.first(controls.value.first) : vue.createVNode(VPaginationBtn, controls.value.first, null, 16)]), vue.createVNode("li", {
          "class": "v-pagination__prev",
          "data-test": "v-pagination-prev"
        }, [slots.prev ? slots.prev(controls.value.prev) : vue.createVNode(VPaginationBtn, controls.value.prev, null, 16)]), items.value.map((item, index) => vue.createVNode("li", {
          "key": `${index}_${item.page}`,
          "class": ['v-pagination__item', {
            'v-pagination__item--is-active': item.isActive
          }],
          "data-test": "v-pagination-item"
        }, [slots.item ? slots.item(item) : vue.createVNode(VPaginationBtn, item.props, {
          default: () => [item.page]
        }, 16)], 2)), vue.createVNode("li", {
          "class": "v-pagination__next",
          "data-test": "v-pagination-next"
        }, [slots.next ? slots.next(controls.value.next) : vue.createVNode(VPaginationBtn, controls.value.next, null, 16)]), props.showFirstLastPage && vue.createVNode("li", {
          "class": "v-pagination__last",
          "data-test": "v-pagination-last"
        }, [slots.last ? slots.last(controls.value.last) : vue.createVNode(VPaginationBtn, controls.value.last, null, 16)])])]
      }, 8, ["class", "aria-label", "onKeydown"]);
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
      const root = vue.ref();
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver();
      vue.watchEffect(() => {
        var _root$value;

        intersectionRef.value = (_root$value = root.value) == null ? void 0 : _root$value.$el;
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

      return () => vue.createVNode(VImg, {
        "class": ['v-parallax', {
          'v-parallax--active': isIntersecting.value
        }],
        "ref": root,
        "cover": true,
        "onLoadstart": onScroll,
        "onLoad": onScroll
      }, slots, 8, ["class", "cover", "onLoadstart", "onLoad"]);
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
      const {
        themeClasses
      } = useTheme(props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props, 'v-progress-circular');
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
      const normalizedValue = vue.computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
      const width = vue.computed(() => Number(props.width));
      const size = vue.computed(() => {
        // Get size from element if size prop value is small, large etc
        return sizeStyles.value ? Number(props.size) : intersectionRef.value ? intersectionRef.value.getBoundingClientRect().width : Math.max(width.value, 32);
      });
      const diameter = vue.computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
      const strokeWidth = vue.computed(() => width.value / size.value * diameter.value);
      const strokeDashOffset = vue.computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
      return () => vue.createVNode(props.tag, {
        "ref": intersectionRef,
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
        }, null, 14, ["r", "stroke-width", "stroke-dasharray"]), vue.createVNode("circle", {
          "class": "v-progress-circular__overlay",
          "fill": "transparent",
          "cx": "50%",
          "cy": "50%",
          "r": MAGIC_RADIUS_CONSTANT,
          "stroke-width": strokeWidth.value,
          "stroke-dasharray": CIRCUMFERENCE,
          "stroke-dashoffset": strokeDashOffset.value
        }, null, 8, ["r", "stroke-width", "stroke-dasharray", "stroke-dashoffset"])]), slots.default && vue.createVNode("div", {
          "class": "v-progress-circular__content"
        }, [slots.default({
          value: normalizedValue.value
        })])],
        _: 1
      }, 8, ["class", "style", "aria-valuenow"]);
    }

  });

  const VRadioGroup = vue.defineComponent({
    name: 'VRadioGroup',
    inheritAttrs: false,
    props: {
      height: {
        type: [Number, String],
        default: 'auto'
      },
      label: String,
      id: String,
      inline: Boolean,
      onIcon: {
        type: String,
        default: '$radioOn'
      },
      offIcon: {
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
      const id = vue.computed(() => props.id || `radio-group-${uid}`);
      useRender(() => {
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [rootProps, inputProps] = filterInputProps(inputAttrs);
        const label = slots.label ? slots.label({
          label: props.label,
          props: {
            for: id.value
          }
        }) : props.label;
        return vue.createVNode(VInput, vue.mergeProps({
          "class": "v-radio-group"
        }, rootAttrs, rootProps), { ...slots,
          default: _ref2 => {
            let {
              isDisabled,
              isReadonly,
              isValid
            } = _ref2;
            return vue.createVNode(vue.Fragment, null, [label && vue.createVNode(VLabel, {
              "disabled": isDisabled.value,
              "error": isValid.value === false,
              "for": id.value
            }, {
              default: () => [label],
              _: 2
            }, 8, ["disabled", "error", "for"]), vue.createVNode(VSelectionControlGroup, vue.mergeProps({
              "id": id.value,
              "disabled": isDisabled.value,
              "onIcon": props.onIcon,
              "offIcon": props.offIcon,
              "type": props.type,
              "readonly": isReadonly.value,
              "inline": props.inline
            }, inputProps), slots, 16, ["id", "disabled", "onIcon", "offIcon", "type", "readonly", "inline"])]);
          }
        }, 16);
      });
      return {};
    }

  });

  const VRadio = vue.defineComponent({
    name: 'VRadio',
    props: {
      offIcon: {
        type: String,
        default: '$radioOff'
      },
      onIcon: {
        type: String,
        default: '$radioOn'
      }
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      useRender(() => vue.createVNode(VSelectionControl, {
        "class": "v-radio",
        "onIcon": props.onIcon,
        "offIcon": props.offIcon,
        "type": "radio"
      }, slots, 8, ["onIcon", "offIcon"]));
      return {};
    }

  });

  const VRating = defineComponent({
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
      } = useTheme(props);
      const rating = useProxiedModel(props, 'modelValue');
      const range = vue.computed(() => createRange(Number(props.length), 1));
      const increments = vue.computed(() => range.value.flatMap(v => props.halfIncrements ? [v - 0.5, v] : [v]));
      const hoverIndex = vue.ref(-1);
      const focusIndex = vue.ref(-1);
      const firstRef = vue.ref();
      let isClicking = false;
      const itemState = vue.computed(() => increments.value.map(value => {
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
      const eventState = vue.computed(() => [0, ...increments.value].map(value => {
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

      const name = vue.computed(() => {
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
        return vue.createVNode(vue.Fragment, null, [vue.createVNode("label", {
          "for": id,
          "class": {
            'v-rating__item--half': props.halfIncrements && value % 1 > 0,
            'v-rating__item--full': props.halfIncrements && value % 1 === 0
          },
          "onMousedown": onMousedown,
          "onMouseup": onMouseup,
          "onMouseenter": onMouseenter,
          "onMouseleave": onMouseleave
        }, [vue.createVNode("span", {
          "class": "v-rating__hidden"
        }, [t(props.itemAriaLabel, value, props.length)]), !showStar ? undefined : slots.item ? slots.item({ ...itemState.value,
          props: btnProps,
          value,
          index
        }) : vue.createVNode(VBtn, btnProps, null, 16)], 42, ["for", "onMousedown", "onMouseup", "onMouseenter", "onMouseleave"]), vue.createVNode("input", {
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
        }, null, 40, ["name", "id", "value", "checked", "onClick", "onFocus", "onBlur", "readonly", "disabled"])]);
      }

      return () => {
        var _props$itemLabels;

        const hasLabels = !!((_props$itemLabels = props.itemLabels) != null && _props$itemLabels.length);
        return vue.createVNode(props.tag, {
          "class": ['v-rating', {
            'v-rating--hover': props.hover,
            'v-rating--readonly': props.readonly
          }, themeClasses.value]
        }, {
          default: () => [vue.createVNode(VRatingItem, {
            "value": 0,
            "index": -1,
            "showStar": false
          }, null, 8, ["index"]), range.value.map((value, i) => {
            var _props$itemLabels2, _props$itemLabels3;

            return vue.createVNode("div", {
              "class": "v-rating__wrapper"
            }, [!hasLabels ? undefined : slots['item-label'] ? slots['item-label']() : (_props$itemLabels2 = props.itemLabels) != null && _props$itemLabels2[i] ? vue.createVNode("span", null, [(_props$itemLabels3 = props.itemLabels) == null ? void 0 : _props$itemLabels3[i]]) : vue.createVNode("span", null, [vue.createTextVNode("\xA0")]), vue.createVNode("div", {
              "class": ['v-rating__item', {
                'v-rating__item--focused': Math.ceil(focusIndex.value) === value
              }]
            }, [props.halfIncrements ? vue.createVNode(vue.Fragment, null, [vue.createVNode(VRatingItem, {
              "value": value - 0.5,
              "index": i * 2
            }, null, 8, ["value", "index"]), vue.createVNode(VRatingItem, {
              "value": value,
              "index": i * 2 + 1
            }, null, 8, ["value", "index"])]) : vue.createVNode(VRatingItem, {
              "value": value,
              "index": i
            }, null, 8, ["value", "index"])], 2)]);
          })],
          _: 1
        }, 8, ["class"]);
      };
    }

  });

  const VSheet = defineComponent({
    name: 'VSheet',
    props: {
      color: {
        type: String,
        default: 'surface'
      },
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
      } = useTheme(props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vue.toRef(props, 'color'));
      const {
        borderClasses
      } = useBorder(props, 'v-sheet');
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        positionClasses,
        positionStyles
      } = usePosition(props, 'v-sheet');
      const {
        roundedClasses
      } = useRounded(props, 'v-sheet');
      return () => vue.createVNode(props.tag, {
        "class": ['v-sheet', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, dimensionStyles.value, positionStyles.value]
      }, slots, 8, ["class", "style"]);
    }

  });

  const VSwitch = vue.defineComponent({
    name: 'VSwitch',
    inheritAttrs: false,
    props: {
      indeterminate: Boolean,
      inset: Boolean,
      loading: [Boolean, String],
      flat: Boolean
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

      function onChange() {
        if (indeterminate.value) {
          indeterminate.value = false;
        }
      }

      useRender(() => {
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [rootProps, inputProps] = filterInputProps(inputAttrs);
        const control = vue.ref();

        function onClick() {
          var _control$value, _control$value$input;

          (_control$value = control.value) == null ? void 0 : (_control$value$input = _control$value.input) == null ? void 0 : _control$value$input.click();
        }

        return vue.createVNode(VInput, vue.mergeProps({
          "class": ['v-switch', {
            'v-switch--indeterminate': indeterminate.value
          }]
        }, rootAttrs, rootProps), { ...slots,
          default: _ref2 => {
            let {
              isDisabled,
              isReadonly
            } = _ref2;
            return vue.createVNode(VSelectionControl, vue.mergeProps({
              "type": "checkbox",
              "disabled": isDisabled.value,
              "readonly": isReadonly.value,
              "onUpdate:modelValue": onChange,
              "aria-checked": indeterminate.value ? 'mixed' : undefined,
              "ref": control
            }, inputProps), {
              default: () => vue.createVNode("div", {
                "class": "v-switch__track",
                "onClick": onClick
              }, null, 8, ["onClick"]),
              input: _ref3 => {
                let {
                  textColorClasses
                } = _ref3;
                return vue.createVNode("div", {
                  "class": ['v-switch__thumb', textColorClasses.value]
                }, null, 2);
              }
            }, 16, ["disabled", "readonly", "onUpdate:modelValue", "aria-checked"]);
          }
        }, 16, ["class"]);
      });
      return {};
    }

  });

  const VSystemBar = defineComponent({
    name: 'VSystemBar',
    props: {
      lightsOut: Boolean,
      window: Boolean,
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
      } = useTheme(props);
      const {
        borderClasses
      } = useBorder(props, 'v-system-bar');
      const {
        dimensionStyles
      } = useDimension(props);
      const {
        elevationClasses
      } = useElevation(props);
      const {
        positionClasses,
        positionStyles
      } = usePosition(props, 'v-system-bar');
      const {
        roundedClasses
      } = useRounded(props, 'v-system-bar');
      return () => vue.createVNode(props.tag, {
        "class": [{
          'v-system-bar': true,
          'v-system-bar--lights-out': props.lightsOut,
          'v-system-bar--window': props.window
        }, themeClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
        "style": [dimensionStyles.value, positionStyles.value]
      }, slots, 8, ["class", "style"]);
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
      } = useTheme(props);
      const {
        densityClasses
      } = useDensity(props, 'v-table');
      return () => {
        var _slots$top, _slots$default, _slots$bottom;

        return vue.createVNode(props.tag, {
          "class": ['v-table', {
            'v-table--fixed-height': !!props.height,
            'v-table--fixed-header': props.fixedHeader,
            'v-table--fixed-footer': props.fixedFooter,
            'v-table--has-top': !!slots.top,
            'v-table--has-bottom': !!slots.bottom
          }, themeClasses.value, densityClasses.value]
        }, {
          default: () => [(_slots$top = slots.top) == null ? void 0 : _slots$top.call(slots), slots.default && vue.createVNode("div", {
            "class": "v-table__wrapper",
            "style": {
              height: convertToUnit(props.height)
            }
          }, [vue.createVNode("table", null, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])], 4), (_slots$bottom = slots.bottom) == null ? void 0 : _slots$bottom.call(slots)],
          _: 1
        }, 8, ["class"]);
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
      ...makeVFieldProps()
    },
    emits: {
      'update:modelValue': val => true
    },

    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const model = useProxiedModel(props, 'modelValue');
      const controlHeight = vue.ref('auto');
      const internalDirty = vue.ref(false);
      const isDirty = vue.computed(() => {
        return internalDirty.value || !!model.value;
      });
      const counterValue = vue.computed(() => {
        return typeof props.counterValue === 'function' ? props.counterValue(model.value) : (model.value || '').toString().length;
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

      const fieldRef = vue.ref();

      function focus() {
        var _fieldRef$value, _fieldRef$value$input;

        (_fieldRef$value = fieldRef.value) == null ? void 0 : (_fieldRef$value$input = _fieldRef$value.inputRef) == null ? void 0 : _fieldRef$value$input.focus();
      }

      function blur() {
        var _fieldRef$value2, _fieldRef$value2$inpu;

        (_fieldRef$value2 = fieldRef.value) == null ? void 0 : (_fieldRef$value2$inpu = _fieldRef$value2.inputRef) == null ? void 0 : _fieldRef$value2$inpu.blur();
      }

      const sizerRef = vue.ref();

      function calculateInputHeight() {
        if (!props.autoGrow) return;
        vue.nextTick(() => {
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

      vue.onMounted(calculateInputHeight);
      vue.watch(model, calculateInputHeight);
      vue.watch(() => props.rows, calculateInputHeight);
      vue.watch(() => props.maxRows, calculateInputHeight);
      let observer;
      vue.watch(sizerRef, val => {
        if (val) {
          observer = new ResizeObserver(calculateInputHeight);
          observer.observe(sizerRef.value);
        } else {
          var _observer;

          (_observer = observer) == null ? void 0 : _observer.disconnect();
        }
      });
      vue.onBeforeUnmount(() => {
        var _observer2;

        (_observer2 = observer) == null ? void 0 : _observer2.disconnect();
      });
      useRender(() => {
        const hasCounter = !!(slots.counter || props.counter || props.counterValue);
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [fieldProps, _] = filterFieldProps(props);
        return vue.createVNode(VField, vue.mergeProps({
          "ref": fieldRef,
          "class": ['v-textarea', {
            'v-textarea--prefixed': props.prefix,
            'v-textarea--suffixed': props.suffix,
            'v-textarea--auto-grow': props.autoGrow,
            'v-textarea--no-resize': props.noResize || props.autoGrow
          }, attrs.class],
          "style": {
            '--v-input-control-height': controlHeight.value
          },
          "active": isDirty.value,
          "onUpdate:active": val => internalDirty.value = val,
          "onClick:control": focus,
          "onClick:clear": e => {
            e.stopPropagation();
            model.value = '';
          },
          "role": "textbox"
        }, rootAttrs, fieldProps), { ...slots,
          default: _ref2 => {
            let {
              isActive,
              isDisabled,
              isReadonly,
              inputRef,
              props: {
                class: fieldClass,
                ...slotProps
              }
            } = _ref2;
            const showPlaceholder = isActive || props.persistentPlaceholder;
            return vue.createVNode(vue.Fragment, null, [props.prefix && vue.createVNode("span", {
              "class": "v-textarea__prefix",
              "style": {
                opacity: showPlaceholder ? undefined : '0'
              }
            }, [props.prefix], 4), vue.withDirectives(vue.createVNode("textarea", vue.mergeProps({
              "class": fieldClass,
              "style": {
                opacity: showPlaceholder ? undefined : '0'
              },
              "onUpdate:modelValue": $event => model.value = $event,
              "ref": inputRef,
              "autofocus": props.autofocus,
              "readonly": isReadonly.value,
              "disabled": isDisabled.value,
              "placeholder": props.placeholder,
              "rows": props.rows
            }, slotProps, inputAttrs), null, 16, ["onUpdate:modelValue", "autofocus", "readonly", "disabled", "placeholder", "rows"]), [[vue.vModelText, model.value], [vue.resolveDirective("intersect"), {
              handler: onIntersect
            }, null, {
              once: true
            }]]), props.autoGrow && vue.withDirectives(vue.createVNode("textarea", {
              "class": [fieldClass, 'v-textarea__sizer'],
              "onUpdate:modelValue": $event => model.value = $event,
              "ref": sizerRef,
              "readonly": true,
              "aria-hidden": "true"
            }, null, 10, ["onUpdate:modelValue", "readonly"]), [[vue.vModelText, model.value]]), props.suffix && vue.createVNode("span", {
              "class": "v-textarea__suffix",
              "style": {
                opacity: showPlaceholder ? undefined : '0'
              }
            }, [props.suffix], 4)]);
          },
          details: hasCounter ? _ref3 => {
            let {
              isFocused
            } = _ref3;
            return vue.createVNode(vue.Fragment, null, [vue.createVNode("span", null, null), vue.createVNode(VCounter, {
              "active": props.persistentCounter || isFocused,
              "value": counterValue.value,
              "max": max.value
            }, slots.counter, 8, ["active", "value", "max"])]);
          } : undefined
        }, 16, ["class", "style", "active", "onUpdate:active", "onClick:control", "onClick:clear"]);
      });
      return {
        fieldRef,
        focus,
        blur
      };
    }

  });

  const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'];
  const VTextField = defineComponent({
    name: 'VTextField',
    directives: {
      Intersect
    },
    inheritAttrs: false,
    props: {
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
      ...makeVFieldProps()
    },
    emits: {
      'update:modelValue': val => true
    },

    setup(props, _ref) {
      let {
        attrs,
        slots
      } = _ref;
      const model = useProxiedModel(props, 'modelValue');
      const internalDirty = vue.ref(false);
      const isDirty = vue.computed(() => {
        return internalDirty.value || !!model.value || dirtyTypes.includes(props.type);
      });
      const counterValue = vue.computed(() => {
        return typeof props.counterValue === 'function' ? props.counterValue(model.value) : (model.value || '').toString().length;
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

      const fieldRef = vue.ref();

      function focus() {
        var _fieldRef$value, _fieldRef$value$input;

        (_fieldRef$value = fieldRef.value) == null ? void 0 : (_fieldRef$value$input = _fieldRef$value.inputRef) == null ? void 0 : _fieldRef$value$input.focus();
      }

      function blur() {
        var _fieldRef$value2, _fieldRef$value2$inpu;

        (_fieldRef$value2 = fieldRef.value) == null ? void 0 : (_fieldRef$value2$inpu = _fieldRef$value2.inputRef) == null ? void 0 : _fieldRef$value2$inpu.blur();
      }

      useRender(() => {
        const hasCounter = !!(slots.counter || props.counter || props.counterValue);
        const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
        const [fieldProps, _] = filterFieldProps(props);
        return vue.createVNode(VField, vue.mergeProps({
          "ref": fieldRef,
          "class": ['v-text-field', {
            'v-text-field--prefixed': props.prefix,
            'v-text-field--suffixed': props.suffix
          }],
          "active": isDirty.value,
          "onUpdate:active": val => internalDirty.value = val,
          "onClick:control": focus,
          "onClick:clear": e => {
            e.stopPropagation();
            model.value = '';
          },
          "role": "textbox"
        }, rootAttrs, fieldProps), { ...slots,
          default: _ref2 => {
            let {
              isActive,
              isDisabled,
              isReadonly,
              inputRef,
              props: {
                class: fieldClass,
                ...slotProps
              }
            } = _ref2;
            const showPlaceholder = isActive || props.persistentPlaceholder;
            return vue.createVNode(vue.Fragment, null, [props.prefix && vue.createVNode("span", {
              "class": "v-text-field__prefix",
              "style": {
                opacity: showPlaceholder ? undefined : '0'
              }
            }, [props.prefix], 4), vue.withDirectives(vue.createVNode("input", vue.mergeProps({
              "class": fieldClass,
              "style": {
                opacity: showPlaceholder ? undefined : '0'
              },
              "onUpdate:modelValue": $event => model.value = $event,
              "ref": inputRef,
              "autofocus": props.autofocus,
              "readonly": isReadonly.value,
              "disabled": isDisabled.value,
              "placeholder": props.placeholder,
              "size": 1,
              "type": props.type
            }, slotProps, inputAttrs), null, 16, ["onUpdate:modelValue", "autofocus", "readonly", "disabled", "placeholder", "type"]), [[vue.vModelDynamic, model.value], [vue.resolveDirective("intersect"), {
              handler: onIntersect
            }, null, {
              once: true
            }]]), props.suffix && vue.createVNode("span", {
              "class": "v-text-field__suffix",
              "style": {
                opacity: showPlaceholder ? undefined : '0'
              }
            }, [props.suffix], 4)]);
          },
          details: hasCounter ? _ref3 => {
            let {
              isFocused
            } = _ref3;
            return vue.createVNode(vue.Fragment, null, [vue.createVNode("span", null, null), vue.createVNode(VCounter, {
              "active": props.persistentCounter || isFocused,
              "value": counterValue.value,
              "max": max.value
            }, slots.counter, 8, ["active", "value", "max"])]);
          } : undefined
        }, 16, ["class", "active", "onUpdate:active", "onClick:control", "onClick:clear"]);
      });
      return {
        fieldRef,
        focus,
        blur
      };
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
      } = useTheme(props);
      return () => {
        var _slots$default, _slots$default2;

        if (!props.withBackground) return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
        return vue.createVNode(props.tag, {
          "class": ['v-theme-provider', themeClasses.value]
        }, {
          default: () => [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]
        }, 8, ["class"]);
      };
    }

  });

  const VTimelineSymbol = Symbol.for('vuetify:timeline');

  const VTimelineDivider = vue.defineComponent({
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
      const timeline = vue.inject(VTimelineSymbol);
      if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider');
      const {
        sizeClasses,
        sizeStyles
      } = useSize(props, 'v-timeline-divider__dot');
      const {
        backgroundColorStyles,
        backgroundColorClasses
      } = useBackgroundColor(vue.toRef(props, 'dotColor'));
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
      return () => vue.createVNode("div", {
        "class": ['v-timeline-divider', {
          'v-timeline-divider--fill-dot': props.fillDot
        }]
      }, [!props.hideDot && vue.createVNode("div", {
        "class": ['v-timeline-divider__dot', roundedClasses.value, sizeClasses.value, elevationClasses.value],
        "style": sizeStyles.value
      }, [vue.createVNode("div", {
        "class": ['v-timeline-divider__inner-dot', roundedClasses.value, backgroundColorClasses.value],
        "style": backgroundColorStyles.value
      }, [slots.default ? slots.default({
        icon: props.icon,
        iconColor: props.iconColor,
        size: props.size
      }) : props.icon ? vue.createVNode(VIcon, {
        "icon": props.icon,
        "color": props.iconColor,
        "size": props.size
      }, null, 8, ["icon", "color", "size"]) : undefined], 6)], 6), vue.createVNode("div", {
        "class": ['v-timeline-divider__line', lineColorClasses.value],
        "style": lineColorStyles.value
      }, null, 6)], 2);
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
      const timeline = vue.inject(VTimelineSymbol);
      if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider');
      const {
        dimensionStyles
      } = useDimension(props);
      const dotSize = vue.ref(0);
      const dotRef = vue.ref();
      vue.watch(dotRef, newValue => {
        var _newValue$$el$querySe, _newValue$$el$querySe2;

        if (!newValue) return;
        dotSize.value = (_newValue$$el$querySe = (_newValue$$el$querySe2 = newValue.$el.querySelector('.v-timeline-divider__dot')) == null ? void 0 : _newValue$$el$querySe2.getBoundingClientRect().width) != null ? _newValue$$el$querySe : 0;
      }, {
        flush: 'post'
      });
      return () => {
        var _slots$default, _slots$opposite;

        return vue.createVNode("div", {
          "class": ['v-timeline-item', {
            'v-timeline-item--fill-dot': props.fillDot
          }],
          "style": {
            '--v-timeline-dot-size': convertToUnit(dotSize.value)
          }
        }, [vue.createVNode("div", {
          "class": "v-timeline-item__body",
          "style": dimensionStyles.value
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 4), vue.createVNode(VTimelineDivider, {
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
        }, 8, ["hideDot", "icon", "iconColor", "size", "elevation", "dotColor", "fillDot", "rounded"]), timeline.density.value !== 'compact' && vue.createVNode("div", {
          "class": "v-timeline-item__opposite"
        }, [!props.hideOpposite && ((_slots$opposite = slots.opposite) == null ? void 0 : _slots$opposite.call(slots))])], 6);
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
      } = useTheme(props);
      const {
        densityClasses
      } = useDensity(props, 'v-timeline');
      vue.provide(VTimelineSymbol, {
        density: vue.toRef(props, 'density'),
        lineColor: vue.toRef(props, 'lineColor')
      });
      const sideClass = vue.computed(() => {
        const side = props.side ? props.side : props.density !== 'default' ? 'end' : null;
        return side && `v-timeline--side-${side}`;
      });
      return () => {
        var _slots$default;

        return vue.createVNode(props.tag, {
          "class": ['v-timeline', `v-timeline--${props.direction}`, {
            'v-timeline--inset-line': !!props.lineInset,
            'v-timeline--truncate-line-end': props.truncateLine === 'end' || props.truncateLine === 'both'
          }, themeClasses.value, densityClasses.value, sideClass.value],
          "style": {
            '--v-timeline-line-thickness': convertToUnit(props.lineThickness),
            '--v-timeline-line-inset': convertToUnit(props.lineInset || undefined)
          }
        }, {
          default: () => [(props.truncateLine === 'none' || props.truncateLine === 'end') && vue.createVNode(VTimelineItem, {
            "hideDot": true
          }, null, 8, ["hideDot"]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
          _: 1
        }, 8, ["class", "style"]);
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
      const id = vue.computed(() => props.id || `v-tooltip-${uid}`);
      const anchor = vue.computed(() => {
        return props.anchor.split(' ').length > 1 ? props.anchor : props.anchor + ' center';
      });
      const origin = vue.computed(() => {
        return props.origin === 'auto' || props.origin === 'overlap' || props.origin.split(' ').length > 1 || props.anchor.split(' ').length > 1 ? props.origin : props.origin + ' center';
      });
      const transition = vue.computed(() => {
        if (props.transition) return props.transition;
        return isActive.value ? 'scale-transition' : 'fade-transition';
      });
      return () => {
        var _slots$default, _slots$default2;

        return vue.createVNode(VOverlay, vue.mergeProps({
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
          default: () => [(_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)) != null ? _slots$default : props.text],
          activator: slots.activator,
          _: 1
        }, 16, ["modelValue", "onUpdate:modelValue", "id", "transition", "absolute", "anchor", "origin", "persistent", "open-on-hover", "eager", "activatorProps"]);
      };
    }

  });

  // Composables
  const VValidation = defineComponent({
    name: 'VValidation',
    props: { ...makeValidationProps()
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
    VAvatar: VAvatar,
    VBadge: VBadge,
    VBanner: VBanner,
    VBannerActions: VBannerActions,
    VBannerAvatar: VBannerAvatar,
    VBannerContent: VBannerContent,
    VBannerText: VBannerText,
    VBottomNavigation: VBottomNavigation,
    VBreadcrumbs: VBreadcrumbs,
    VBreadcrumbsItem: VBreadcrumbsItem,
    VBreadcrumbsDivider: VBreadcrumbsDivider,
    VBtn: VBtn,
    VBtnGroup: VBtnGroup,
    VCard: VCard,
    VCardActions: VCardActions,
    VCardAvatar: VCardAvatar,
    VCardHeader: VCardHeader,
    VCardHeaderText: VCardHeaderText,
    VCardImg: VCardImg,
    VCardSubtitle: VCardSubtitle,
    VCardText: VCardText,
    VCardTitle: VCardTitle,
    VCheckbox: VCheckbox,
    VChip: VChip,
    VCode: VCode,
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
    VPaginationBtn: VPaginationBtn,
    VParallax: VParallax,
    VProgressCircular: VProgressCircular,
    VProgressLinear: VProgressLinear,
    VRadioGroup: VRadioGroup,
    VRadio: VRadio,
    VRating: VRating,
    VResponsive: VResponsive,
    VSelectionControl: VSelectionControl,
    VSelectionControlGroup: VSelectionControlGroup,
    VSheet: VSheet,
    VSwitch: VSwitch,
    VSystemBar: VSystemBar,
    VTable: VTable,
    VTextarea: VTextarea,
    VTextField: VTextField,
    VThemeProvider: VThemeProvider,
    VTimeline: VTimeline,
    VTimelineItem: VTimelineItem,
    VTooltip: VTooltip,
    VValidation: VValidation,
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
  function mounted$3(el, binding) {
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
      if (once) unmounted$3(el, binding);
    });
    if (immediate) handler == null ? void 0 : handler([], observer);
    el._mutate = Object(el._mutate);
    el._mutate[binding.instance.$.uid] = {
      observer
    };
    observer.observe(el, options);
  }

  function unmounted$3(el, binding) {
    var _el$_mutate;

    if (!((_el$_mutate = el._mutate) != null && _el$_mutate[binding.instance.$.uid])) return;

    el._mutate[binding.instance.$.uid].observer.disconnect();

    delete el._mutate[binding.instance.$.uid];
  }

  const Mutate = {
    mounted: mounted$3,
    unmounted: unmounted$3
  };

  function mounted$2(el, binding) {
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

  function unmounted$2(el, binding) {
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
    mounted: mounted$2,
    unmounted: unmounted$2
  };

  function mounted$1(el, binding) {
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

  function unmounted$1(el, binding) {
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
    unmounted$1(el, binding);
    mounted$1(el, binding);
  }

  const Scroll = {
    mounted: mounted$1,
    unmounted: unmounted$1,
    updated
  };

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
    (_wrapper$start = wrapper.start) == null ? void 0 : _wrapper$start.call(wrapper, { ...event,
      ...wrapper
    });
  }

  function touchend(event, wrapper) {
    var _wrapper$end;

    const touch = event.changedTouches[0];
    wrapper.touchendX = touch.clientX;
    wrapper.touchendY = touch.clientY;
    (_wrapper$end = wrapper.end) == null ? void 0 : _wrapper$end.call(wrapper, { ...event,
      ...wrapper
    });
    handleGesture(wrapper);
  }

  function touchmove(event, wrapper) {
    var _wrapper$move;

    const touch = event.changedTouches[0];
    wrapper.touchmoveX = touch.clientX;
    wrapper.touchmoveY = touch.clientY;
    (_wrapper$move = wrapper.move) == null ? void 0 : _wrapper$move.call(wrapper, { ...event,
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

  function mounted(el, binding) {
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

  function unmounted(el, binding) {
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
    mounted,
    unmounted
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
    component: props => vue.h(VClassIcon, { ...props,
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
      app.provide(ThemeSymbol, createTheme(options.theme));
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
            return vue.reactive({
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
  const version = "3.0.0-alpha.12";

  exports.components = components;
  exports.createVuetify = createVuetify;
  exports.directives = directives;
  exports.provideRtl = provideRtl;
  exports.useDisplay = useDisplay;
  exports.useLayout = useLayout;
  exports.useRtl = useRtl;
  exports.useTheme = useTheme;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=vuetify.js.map
