/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
import { Fragment, Comment, Text, Static, defineComponent, h, resolveComponent, createElementBlock, openBlock, normalizeClass, createBlock, renderSlot, createCommentVNode, createTextVNode, toDisplayString, withCtx, createVNode, renderList, resolveDynamicComponent, mergeProps, withDirectives, vModelDynamic, vModelText, withKeys, withModifiers, Transition, createElementVNode, normalizeStyle, vShow, normalizeProps, guardReactiveProps, vModelCheckbox, resolveDirective, createSlots, vModelSelect, toHandlers, createApp, vModelRadio, toHandlerKey, camelize, toRaw } from 'vue';

var __defProp$d = Object.defineProperty;
var __pow = Math.pow;
var __defNormalProp$d = (obj, key, value) => key in obj ? __defProp$d(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$6 = (obj, key, value) => __defNormalProp$d(obj, key + "" , value);
const colorChannels = ["red", "green", "blue", "alpha"];
const colorsNammed = {
  transparent: "#00000000",
  black: "#000000",
  silver: "#c0c0c0",
  gray: "#808080",
  white: "#ffffff",
  maroon: "#800000",
  red: "#ff0000",
  purple: "#800080",
  fuchsia: "#ff00ff",
  green: "#008000",
  lime: "#00ff00",
  olive: "#808000",
  yellow: "#ffff00",
  navy: "#000080",
  blue: "#0000ff",
  teal: "#008080",
  aqua: "#00ffff",
  orange: "#ffa500",
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  blanchedalmond: "#ffebcd",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  oldlace: "#fdf5e6",
  olivedrab: "#6b8e23",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  whitesmoke: "#f5f5f5",
  yellowgreen: "#9acd32",
  rebeccapurple: "#663399"
};
class ColorTypeError extends Error {
  constructor() {
    super("ColorTypeError: type must be hex(a), rgb(a) or hsl(a)");
  }
}
class Color {
  // Since getters and setters for the color channels, e.g., "alpha", are
  // dynamically defined with `Object.defineProperty` in the constructor, we
  // cannot write property declarations inside the class body. Instead, we
  // augment the `Color` class with an ambient module declared in `color.ts`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...args) {
    // @ts-expect-error - TypeScript failed to inter the initialization of this property
    __publicField$6(this, "$channels");
    if (args.length > 0) {
      return Color.parse(...args);
    }
    this.$channels = new Uint8Array(colorChannels.length);
  }
  get red() {
    return this.$channels[0];
  }
  set red(byte) {
    if (!Number.isNaN(byte / 1)) {
      this.$channels[0] = Math.min(255, Math.max(0, byte));
    }
  }
  get green() {
    return this.$channels[1];
  }
  set green(byte) {
    if (!Number.isNaN(byte / 1)) {
      this.$channels[1] = Math.min(255, Math.max(0, byte));
    }
  }
  get blue() {
    return this.$channels[2];
  }
  set blue(byte) {
    if (!Number.isNaN(byte / 1)) {
      this.$channels[2] = Math.min(255, Math.max(0, byte));
    }
  }
  get alpha() {
    return this.$channels[3];
  }
  set alpha(byte) {
    if (!Number.isNaN(byte / 1)) {
      this.$channels[3] = Math.min(255, Math.max(0, byte));
    }
  }
  get hue() {
    return this.getHue();
  }
  set hue(value) {
    if (!Number.isNaN(value / 1)) {
      this.setHue(value);
    }
  }
  get saturation() {
    return this.getSaturation();
  }
  set saturation(value) {
    if (!Number.isNaN(value / 1)) {
      this.setSaturation(value);
    }
  }
  get lightness() {
    return this.getLightness();
  }
  set lightness(value) {
    if (!Number.isNaN(value / 1)) {
      this.setLightness(value);
    }
  }
  getHue() {
    const [red, green, blue] = Array.from(this.$channels).map((c) => c / 255);
    const [min, max] = [Math.min(red, green, blue), Math.max(red, green, blue)];
    const delta = max - min;
    let hue = 0;
    if (delta === 0) {
      return hue;
    }
    if (red === max) {
      hue = (green - blue) / delta % 6;
    } else if (green === max) {
      hue = (blue - red) / delta + 2;
    } else {
      hue = (red - green) / delta + 4;
    }
    hue *= 60;
    while (hue !== -Infinity && hue < 0) hue += 360;
    return Math.round(hue % 360);
  }
  setHue(value) {
    const color = Color.fromHSL(value, this.saturation, this.lightness, this.alpha / 255);
    for (let i = 0; i < this.$channels.length; i++) {
      this.$channels[i] = Number(color.$channels[i]);
    }
  }
  getSaturation() {
    const [red, green, blue] = Array.from(this.$channels).map((c) => c / 255);
    const [min, max] = [Math.min(red, green, blue), Math.max(red, green, blue)];
    const delta = max - min;
    return delta !== 0 ? Math.round(delta / (1 - Math.abs(2 * this.lightness - 1)) * 100) / 100 : 0;
  }
  setSaturation(value) {
    const color = Color.fromHSL(this.hue, value, this.lightness, this.alpha / 255);
    colorChannels.forEach((_, i) => this.$channels[i] = color.$channels[i]);
  }
  getLightness() {
    const [red, green, blue] = Array.from(this.$channels).map((c) => c / 255);
    const [min, max] = [Math.min(red, green, blue), Math.max(red, green, blue)];
    return Math.round((max + min) / 2 * 100) / 100;
  }
  setLightness(value) {
    const color = Color.fromHSL(this.hue, this.lightness, value, this.alpha / 255);
    colorChannels.forEach((_, i) => this.$channels[i] = color.$channels[i]);
  }
  clone() {
    const color = new Color();
    colorChannels.forEach((_, i) => color.$channels[i] = this.$channels[i]);
    return color;
  }
  toString(type = "hex") {
    switch (String(type).toLowerCase()) {
      case "hex":
        return "#" + colorChannels.slice(0, 3).map((channel) => this[channel].toString(16).padStart(2, "0")).join("");
      case "hexa":
        return "#" + colorChannels.map((channel) => this[channel].toString(16).padStart(2, "0")).join("");
      case "rgb":
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
      case "rgba":
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${Math.round(this.alpha / 2.55) / 100})`;
      case "hsl":
        return `hsl(${Math.round(this.hue)}deg, ${Math.round(this.saturation * 100)}%, ${Math.round(this.lightness * 100)}%)`;
      case "hsla":
        return `hsla(${Math.round(this.hue)}deg, ${Math.round(this.saturation * 100)}%, ${Math.round(this.lightness * 100)}%, ${Math.round(this.alpha / 2.55) / 100})`;
      default:
        throw new ColorTypeError();
    }
  }
  get [Symbol.toStringTag]() {
    return this.toString("hex");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static parse(...args) {
    if (typeof args[0] === "object") {
      return Color.parseObject(args[0]);
    } else if (args.every((arg) => !Number.isNaN(arg / 1))) {
      const color = new Color();
      if (args.length > 3) {
        color.red = args[0];
        color.green = args[1];
        color.blue = args[2];
        if (args[3]) {
          color.alpha = args[3];
        }
      } else if (args.length === 1) {
        const index = Number(args[0]);
        return Color.parseIndex(index, index > __pow(2, 24) ? 3 : 4);
      }
    } else if (typeof args[0] === "string") {
      let match = null;
      if (typeof colorsNammed[args[0].toLowerCase()] === "string") {
        return Color.parseHex(colorsNammed[args[0].toLowerCase()]);
      } else if ((match = args[0].match(/^(#|&h|0x)?(([a-f0-9]{3,4}){1,2})$/i)) !== null) {
        return Color.parseHex(match[2]);
      } else if ((match = args[0].match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(\s*,\s*(\d*\.?\d+))?\s*\)$/i)) !== null) {
        const channels = [
          match[1],
          match[2],
          match[3],
          typeof match[5] !== "undefined" ? match[5] : 1
        ];
        return Color.fromRGB(...channels.map((value) => Number(value)));
      } else if (args[0].match(/^(h(sl|wb)a?|lab|color|cmyk)\(/i)) {
        throw new Error("Color expression not implemented yet");
      }
    }
    throw new Error("Invalid color expression");
  }
  static parseObject(object) {
    const color = new Color();
    if (object === null || typeof object !== "object") {
      return color;
    }
    if (Color.isColor(object)) {
      return object.clone();
    }
    colorChannels.forEach((channel) => {
      if (!Number.isNaN(object[channel])) {
        color[channel] = object[channel];
      }
    });
    return color;
  }
  static parseHex(hex) {
    if (typeof hex !== "string") {
      throw new Error("Hex expression must be a string");
    }
    hex = hex.trim().replace(/^(0x|&h|#)/i, "");
    if (hex.length === 3 || hex.length === 4) {
      hex = hex.split("").map((c) => c.repeat(2)).join("");
    }
    if (!(hex.length === 6 || hex.length === 8)) {
      throw new Error("Incorrect Hex expression length");
    }
    const chans = hex.split(/(..)/).filter((value) => value).map((value) => Number.parseInt(value, 16));
    if (typeof chans[3] === "number") {
      chans[3] /= 255;
    }
    return Color.fromRGB(...chans);
  }
  static parseIndex(value, channels = 3) {
    const color = new Color();
    for (let i = 0; i < 4; i++) {
      color[colorChannels[i]] = value >> (channels - i) * 8 && 255;
    }
    return color;
  }
  static fromRGB(red, green, blue, alpha = 1) {
    if ([red, green, blue, alpha].some((arg) => Number.isNaN(arg / 1))) {
      throw new Error("Invalid arguments");
    }
    alpha *= 255;
    const color = new Color();
    [red, green, blue, alpha].forEach((value, index) => {
      color[colorChannels[index]] = value;
    });
    return color;
  }
  static fromHSL(hue, saturation, lightness, alpha = 1) {
    if ([hue, saturation, lightness, alpha].some((arg) => Number.isNaN(arg))) {
      throw new Error("Invalid arguments");
    }
    while (hue < 0 && hue !== -Infinity) hue += 360;
    hue = hue % 360;
    saturation = Math.max(0, Math.min(1, saturation));
    lightness = Math.max(0, Math.min(1, lightness));
    alpha = Math.max(0, Math.min(1, alpha));
    const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = c * (1 - Math.abs(hue / 60 % 2 - 1));
    const m = lightness - c / 2;
    const [r, g, b] = hue < 60 ? [c, x, 0] : hue < 120 ? [x, c, 0] : hue < 180 ? [0, c, x] : hue < 240 ? [0, x, c] : hue < 300 ? [x, 0, c] : [c, 0, x];
    return Color.fromRGB((r + m) * 255, (g + m) * 255, (b + m) * 255, alpha);
  }
  static isColor(arg) {
    return arg instanceof Color;
  }
}

const NOTICE_POSITIONS = [
  "is-top-right",
  "is-top",
  "is-top-left",
  "is-bottom-right",
  "is-bottom",
  "is-bottom-left"
];
let config = {
  defaultContainerElement: null,
  defaultIconPack: "mdi",
  defaultIconComponent: null,
  defaultIconPrev: "chevron-left",
  defaultIconNext: "chevron-right",
  defaultLocale: void 0,
  defaultDialogConfirmText: null,
  defaultDialogCancelText: null,
  defaultSnackbarDuration: 3500,
  defaultSnackbarPosition: null,
  defaultToastDuration: 2e3,
  defaultToastPosition: null,
  defaultNotificationDuration: 2e3,
  defaultNotificationPosition: null,
  defaultTooltipType: "is-primary",
  defaultTooltipDelay: null,
  defaultTooltipCloseDelay: null,
  defaultSidebarDelay: null,
  defaultInputAutocomplete: "on",
  defaultDateFormatter: null,
  defaultDateParser: null,
  defaultDateCreator: null,
  defaultTimeCreator: null,
  defaultDayNames: null,
  defaultMonthNames: null,
  defaultFirstDayOfWeek: null,
  defaultUnselectableDaysOfWeek: null,
  defaultTimeFormatter: null,
  defaultTimeParser: null,
  defaultDatetimeFormatter: null,
  defaultDatetimeParser: null,
  defaultDatetimeCreator: null,
  defaultClockpickerHoursLabel: null,
  defaultClockpickerMinutesLabel: null,
  defaultColorFormatter: null,
  defaultColorParser: null,
  defaultModalCanCancel: ["escape", "x", "outside", "button"],
  defaultModalScroll: null,
  defaultDatepickerMobileNative: true,
  defaultTimepickerMobileNative: true,
  defaultTimepickerMobileModal: true,
  defaultNoticeQueue: true,
  defaultInputHasCounter: true,
  defaultCompatFallthrough: true,
  defaultTaginputHasCounter: true,
  defaultUseHtml5Validation: true,
  defaultDropdownMobileModal: true,
  defaultFieldLabelPosition: null,
  defaultDatepickerYearsRange: [-100, 10],
  defaultDatepickerNearbyMonthDays: true,
  defaultDatepickerNearbySelectableMonthDays: false,
  defaultDatepickerShowWeekNumber: false,
  defaultDatepickerWeekNumberClickable: false,
  defaultDatepickerMobileModal: true,
  defaultTrapFocus: true,
  defaultAutoFocus: true,
  defaultButtonRounded: false,
  defaultSwitchRounded: true,
  defaultCarouselInterval: 3500,
  defaultTabsExpanded: false,
  defaultTabsAnimated: true,
  defaultTabsType: null,
  defaultStatusIcon: true,
  defaultProgrammaticPromise: false,
  defaultLinkTags: [
    "a",
    "button",
    "input",
    "router-link",
    "nuxt-link",
    "n-link",
    "RouterLink",
    "NuxtLink",
    "NLink"
  ],
  defaultImageWebpFallback: null,
  defaultImageLazy: true,
  defaultImageResponsive: true,
  defaultImageRatio: null,
  defaultImageSrcsetFormatter: null,
  defaultBreadcrumbTag: "a",
  defaultBreadcrumbAlign: "is-left",
  defaultBreadcrumbSeparator: "",
  defaultBreadcrumbSize: "is-medium",
  customIconPacks: null
};
const setOptions = (options) => {
  config = options;
};

var __defProp$c = Object.defineProperty;
var __getOwnPropSymbols$d = Object.getOwnPropertySymbols;
var __hasOwnProp$d = Object.prototype.hasOwnProperty;
var __propIsEnum$d = Object.prototype.propertyIsEnumerable;
var __defNormalProp$c = (obj, key, value) => key in obj ? __defProp$c(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$c = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$d.call(b, prop))
      __defNormalProp$c(a, prop, b[prop]);
  if (__getOwnPropSymbols$d)
    for (var prop of __getOwnPropSymbols$d(b)) {
      if (__propIsEnum$d.call(b, prop))
        __defNormalProp$c(a, prop, b[prop]);
    }
  return a;
};
function signPoly(value) {
  if (value < 0) return -1;
  return value > 0 ? 1 : 0;
}
const sign = Math.sign || signPoly;
function hasFlag(val, flag) {
  return (val & flag) === flag;
}
function mod(n, mod2) {
  return (n % mod2 + mod2) % mod2;
}
function bound(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
function getValueByPath(obj, path) {
  return path.split(".").reduce((o, i) => o ? o[i] : null, obj);
}
function indexOf(array, obj, fn) {
  if (!array) return -1;
  if (!fn || typeof fn !== "function") return array.indexOf(obj);
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i], obj)) {
      return i;
    }
  }
  return -1;
}
const isObject = (item) => typeof item === "object" && !Array.isArray(item);
const mergeFn = (target, source, deep = false) => {
  if (deep || !Object.assign) {
    const isDeep = (prop) => isObject(source[prop]) && target !== null && Object.prototype.hasOwnProperty.call(target, prop) && isObject(target[prop]);
    const replaced = Object.getOwnPropertyNames(source).map((prop) => ({
      [prop]: isDeep(prop) ? mergeFn(target[prop], source[prop] || {}, deep) : source[prop]
    })).reduce(
      (a, b) => __spreadValues$c(__spreadValues$c({}, a), b),
      // eslint-disable-next-line no-use-before-define
      {}
    );
    return __spreadValues$c(__spreadValues$c({}, target), replaced);
  } else {
    return Object.assign(target, source);
  }
};
const merge = mergeFn;
const isMobile = {
  Android: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return typeof window !== "undefined" && (window.navigator.userAgent.match(/iPhone|iPad|iPod/i) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  },
  Opera: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return typeof window !== "undefined" && window.navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};
function removeElement(el) {
  if (typeof el.remove !== "undefined") {
    el.remove();
  } else if (typeof el.parentNode !== "undefined" && el.parentNode !== null) {
    el.parentNode.removeChild(el);
  }
}
function createAbsoluteElement(el) {
  const root = document.createElement("div");
  root.style.position = "absolute";
  root.style.left = "0px";
  root.style.top = "0px";
  root.style.width = "100%";
  const wrapper = document.createElement("div");
  root.appendChild(wrapper);
  wrapper.appendChild(el);
  document.body.appendChild(root);
  return root;
}
function isVueComponent(c) {
  return c != null && c.$ != null && c.$.vnode != null;
}
function escapeRegExpChars(value) {
  if (!value) return value;
  return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function removeDiacriticsFromString(value) {
  if (!value) return value;
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function multiColumnSort(inputArray, sortingPriority) {
  const array = JSON.parse(JSON.stringify(inputArray));
  const fieldSorter = (fields) => (a, b) => fields.map((o) => {
    const { field, order, customSort } = o;
    if (typeof customSort === "function") {
      return customSort(a, b, order !== "desc");
    } else {
      const aValue = getValueByPath(a, field);
      const bValue = getValueByPath(b, field);
      const ord = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return order === "desc" ? -ord : ord;
    }
  }).reduce((p, n) => p || n, 0);
  return array.sort(fieldSorter(sortingPriority));
}
function createNewEvent(eventName) {
  let event;
  if (typeof Event === "function") {
    event = new Event(eventName);
  } else {
    event = document.createEvent("Event");
    event.initEvent(eventName, true, true);
  }
  return event;
}
function toCssWidth(width) {
  return width === void 0 ? null : isNaN(+width) ? `${width}` : width + "px";
}
function getMonthNames(locale, format = "long") {
  const dates = [];
  for (let i = 0; i < 12; i++) {
    dates.push(new Date(2e3, i, 15));
  }
  const dtf = new Intl.DateTimeFormat(locale, {
    month: format
  });
  return dates.map((d) => dtf.format(d));
}
function getWeekdayNames(locale, format = "narrow") {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const dt = new Date(2e3, 0, i + 1);
    dates[dt.getDay()] = dt;
  }
  const dtf = new Intl.DateTimeFormat(locale, { weekday: format });
  return dates.map((d) => dtf.format(d));
}
function matchWithGroups(pattern, str) {
  const matches = str.match(pattern);
  const groupNames = pattern.toString().match(/<(.+?)>/g);
  if (groupNames == null) {
    throw new RangeError("pattern must contain at least one group");
  }
  return groupNames.map((group) => {
    const groupMatches = group.match(/<(.+)>/);
    return groupMatches[1];
  }).reduce((acc, curr, index) => {
    if (matches && matches.length > index) {
      acc[curr] = matches[index + 1];
    } else {
      acc[curr] = null;
    }
    return acc;
  }, {});
}
function isWebpSupported() {
  return new Promise((resolve) => {
    const image = new Image();
    image.onerror = () => resolve(false);
    image.onload = () => resolve(image.width === 1);
    image.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
  }).catch(() => false);
}
function isCustomElement(vm) {
  return vm.$root != null && "shadowRoot" in vm.$root.$options;
}
const isDefined = (d) => d !== void 0;
const isNil = (value) => value === null || value === void 0;
function isFragment(vnode) {
  return vnode.type === Fragment;
}
function isTag(vnode) {
  return vnode.type !== Comment && vnode.type !== Text && vnode.type !== Static;
}
function getComponentFromVNode(vnode) {
  if (!vnode) {
    return void 0;
  }
  const { component } = vnode;
  if (!component) {
    return void 0;
  }
  return component.exposed && component.exposeProxy || component.proxy;
}
function copyAppContext(src, dest) {
  const { _context: srcContext } = src;
  const { _context: destContext } = dest;
  destContext.config = srcContext.config;
  destContext.mixins = srcContext.mixins;
  destContext.components = srcContext.components;
  destContext.directives = srcContext.directives;
  destContext.provides = srcContext.provides;
  destContext.optionsCache = srcContext.optionsCache;
  destContext.propsCache = srcContext.propsCache;
  destContext.emitsCache = srcContext.emitsCache;
  if ("__VUE_I18N_SYMBOL__" in src) {
    dest.__VUE_I18N_SYMBOL__ = src.__VUE_I18N_SYMBOL__;
  }
}
const translateTouchAsDragEvent = (event, options) => {
  const { type, target } = options;
  let translateX = 0;
  let translateY = 0;
  if (target != null && target !== event.target) {
    const baseRect = event.target.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    translateX = targetRect.left - baseRect.left;
    translateY = targetRect.top - baseRect.top;
  }
  const touch = event.touches[0] || event.changedTouches[0];
  return new DragEvent(type, {
    dataTransfer: new DataTransfer(),
    bubbles: true,
    screenX: touch.screenX,
    screenY: touch.screenY,
    clientX: touch.clientX + translateX,
    clientY: touch.clientY + translateY,
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
    altKey: event.altKey,
    metaKey: event.metaKey
  });
};

var ConfigComponent = {
  getOptions() {
    return config;
  },
  setOptions(options) {
    setOptions(merge(config, options, true));
  }
};

var __getOwnPropSymbols$c = Object.getOwnPropertySymbols;
var __hasOwnProp$c = Object.prototype.hasOwnProperty;
var __propIsEnum$c = Object.prototype.propertyIsEnumerable;
var __objRest$3 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$c.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$c)
    for (var prop of __getOwnPropSymbols$c(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$c.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var CompatFallthroughMixin = defineComponent({
  inheritAttrs: false,
  props: {
    compatFallthrough: {
      type: Boolean,
      default: () => config.defaultCompatFallthrough
    }
  },
  computed: {
    rootAttrs() {
      return this.compatFallthrough ? {
        class: this.$attrs.class,
        style: this.$attrs.style,
        id: this.$attrs.id
      } : {};
    },
    fallthroughAttrs() {
      if (this.compatFallthrough) {
        const _a = this.$attrs, { style: _1, class: _2, id: _3 } = _a, rest = __objRest$3(_a, ["style", "class", "id"]);
        return rest;
      } else {
        return this.$attrs;
      }
    }
  }
});

var _sfc_main$S = defineComponent({
  name: "BFieldBody",
  inject: {
    parent: {
      from: "BField",
      default: null
    }
  },
  props: {
    message: {
      type: [String, Array]
    },
    type: {
      type: [String, Object]
    }
  },
  render() {
    let first = true;
    let children = typeof this.$slots.default === "function" ? this.$slots.default() : this.$slots.default;
    if (children != null && children.length === 1 && children[0].type === Fragment) {
      children = children[0].children;
    }
    return h(
      "div",
      { class: "field-body" },
      {
        default: () => {
          return children != null && children.map((element) => {
            if (element.type === Comment || element.type === Text) {
              return element;
            }
            let message;
            if (first) {
              message = this.message;
              first = false;
            }
            const parentField = this.parent;
            return h(
              // parentField.$.type is supposed to be BField
              // it falls back to `resolveComponent('b-field')`
              // but won't work unless `BField` is globally registered
              // should not be a problem as long as `BFieldBody` is properly used
              parentField ? parentField.$.type : resolveComponent("b-field"),
              {
                type: this.type,
                message
              },
              () => element
            );
          });
        }
      }
    );
  }
});

const Field$1 = defineComponent({
  name: "BField",
  components: { BFieldBody: _sfc_main$S },
  provide() {
    return {
      BField: this
    };
  },
  inject: {
    parent: {
      from: "BField",
      default: false
    }
  },
  // Used internally only when using Field in Field
  props: {
    type: {
      type: [String, Object],
      default: void 0
    },
    label: String,
    labelFor: String,
    message: {
      type: [String, Array, Object],
      default: void 0
    },
    grouped: Boolean,
    groupMultiline: Boolean,
    position: String,
    expanded: Boolean,
    horizontal: Boolean,
    addons: {
      type: Boolean,
      default: true
    },
    customClass: String,
    labelPosition: {
      type: String,
      default: () => {
        return config.defaultFieldLabelPosition;
      }
    }
  },
  data() {
    return {
      newType: this.type,
      newMessage: this.message,
      fieldLabelSize: null,
      numberInputClasses: [],
      _isField: true
      // Used internally by Input and Select
    };
  },
  computed: {
    rootClasses() {
      return [
        {
          "is-expanded": this.expanded,
          "is-horizontal": this.horizontal,
          "is-floating-in-label": this.hasLabel && !this.horizontal && this.labelPosition === "inside",
          "is-floating-label": this.hasLabel && !this.horizontal && this.labelPosition === "on-border"
        },
        this.numberInputClasses
      ];
    },
    innerFieldClasses() {
      return [
        this.fieldType(),
        this.newPosition,
        {
          "is-grouped-multiline": this.groupMultiline
        }
      ];
    },
    hasInnerField() {
      return this.grouped || this.groupMultiline || this.hasAddons();
    },
    /*
    * Correct Bulma class for the side of the addon or group.
    *
    * This is not kept like the others (is-small, etc.),
    * because since 'has-addons' is set automatically it
    * doesn't make sense to teach users what addons are exactly.
    */
    newPosition() {
      if (this.position === void 0) return;
      const position = this.position.split("-");
      if (position.length < 1) return;
      const prefix = this.grouped ? "is-grouped-" : "has-addons-";
      if (this.position) return prefix + position[1];
      return void 0;
    },
    /*
    * Formatted message in case it's an array
    * (each element is separated by <br> tag)
    */
    formattedMessage() {
      const parentField = this.parent;
      if (parentField && parentField.hasInnerField) {
        return "";
      }
      if (typeof this.newMessage === "string") {
        return [this.newMessage];
      }
      const messages = [];
      if (Array.isArray(this.newMessage)) {
        this.newMessage.forEach((message) => {
          if (typeof message === "string") {
            messages.push(message);
          } else {
            for (const key in message) {
              if (message[key]) {
                messages.push(key);
              }
            }
          }
        });
      } else {
        for (const key in this.newMessage) {
          if (this.newMessage[key]) {
            messages.push(key);
          }
        }
      }
      return messages.filter((m) => !!m);
    },
    hasLabel() {
      return this.label || this.$slots.label;
    },
    hasMessage() {
      const parentField = this.parent;
      return (!parentField || !parentField.hasInnerField) && this.newMessage || this.$slots.message;
    }
  },
  watch: {
    /*
    * Set internal type when prop change.
    */
    type(value) {
      this.newType = value;
    },
    /*
    * Set internal message when prop change.
    */
    message(value) {
      if (JSON.stringify(value) !== JSON.stringify(this.newMessage)) {
        this.newMessage = value;
      }
    },
    /*
    * Set parent message if we use Field in Field.
    */
    newMessage(value) {
      const parentField = this.parent;
      if (parentField && parentField.hasInnerField) {
        if (!parentField.type) {
          parentField.newType = this.newType;
        }
        if (!parentField.message) {
          parentField.newMessage = value;
        }
      }
    }
  },
  methods: {
    /*
    * Field has addons if there are more than one slot
    * (element / component) in the Field.
    * Or is grouped when prop is set.
    * Is a method to be called when component re-render.
    */
    fieldType() {
      if (this.grouped) return "is-grouped";
      if (this.hasAddons()) return "has-addons";
    },
    hasAddons() {
      let renderedNode = 0;
      if (this.$slots.default) {
        renderedNode = this.$slots.default().reduce((i, node) => isTag(node) ? i + 1 : i, 0);
      }
      return renderedNode > 1 && this.addons && !this.horizontal;
    },
    // called by a number input if it is a direct child.
    wrapNumberinput({ controlsPosition, size }) {
      const classes = ["has-numberinput"];
      if (controlsPosition) {
        classes.push(`has-numberinput-${controlsPosition}`);
      }
      if (size) {
        classes.push(`has-numberinput-${size}`);
      }
      this.numberInputClasses = classes;
    }
  },
  mounted() {
    if (this.horizontal) {
      const elements = this.$el.querySelectorAll(".input, .select, .button, .textarea, .b-slider");
      if (elements.length > 0) {
        this.fieldLabelSize = "is-normal";
      }
    }
  }
});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _hoisted_1$T = ["for"];
const _hoisted_2$J = ["for"];
const _hoisted_3$u = {
  key: 3,
  class: "field-body"
};
function _sfc_render$10(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_field_body = resolveComponent("b-field-body");
  const _component_b_field = resolveComponent("b-field");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["field", _ctx.rootClasses])
    },
    [
      _ctx.horizontal ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(["field-label", [_ctx.customClass, _ctx.fieldLabelSize]])
        },
        [
          _ctx.hasLabel ? (openBlock(), createElementBlock("label", {
            key: 0,
            for: _ctx.labelFor,
            class: normalizeClass([_ctx.customClass, "label"])
          }, [
            _ctx.$slots.label ? renderSlot(_ctx.$slots, "label", { key: 0 }) : (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createTextVNode(
                  toDisplayString(_ctx.label),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ], 10, _hoisted_1$T)) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      )) : (openBlock(), createElementBlock(
        Fragment,
        { key: 1 },
        [
          _ctx.hasLabel ? (openBlock(), createElementBlock("label", {
            key: 0,
            for: _ctx.labelFor,
            class: normalizeClass([_ctx.customClass, "label"])
          }, [
            _ctx.$slots.label ? renderSlot(_ctx.$slots, "label", { key: 0 }) : (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createTextVNode(
                  toDisplayString(_ctx.label),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ], 10, _hoisted_2$J)) : createCommentVNode("v-if", true)
        ],
        64
        /* STABLE_FRAGMENT */
      )),
      _ctx.horizontal ? (openBlock(), createBlock(_component_b_field_body, {
        key: 2,
        message: _ctx.newMessage ? _ctx.formattedMessage : "",
        type: _ctx.newType
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["message", "type"])) : _ctx.hasInnerField ? (openBlock(), createElementBlock("div", _hoisted_3$u, [
        createVNode(_component_b_field, {
          addons: false,
          type: _ctx.type,
          class: normalizeClass(_ctx.innerFieldClasses)
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["type", "class"])
      ])) : renderSlot(_ctx.$slots, "default", { key: 4 }),
      _ctx.hasMessage && !_ctx.horizontal ? (openBlock(), createElementBlock(
        "p",
        {
          key: 5,
          class: normalizeClass(["help", _ctx.newType])
        },
        [
          _ctx.$slots.message ? renderSlot(_ctx.$slots, "message", {
            key: 0,
            messages: _ctx.formattedMessage
          }) : (openBlock(true), createElementBlock(
            Fragment,
            { key: 1 },
            renderList(_ctx.formattedMessage, (mess, i) => {
              return openBlock(), createElementBlock(
                Fragment,
                null,
                [
                  createTextVNode(
                    toDisplayString(mess) + " ",
                    1
                    /* TEXT */
                  ),
                  i + 1 < _ctx.formattedMessage.length ? (openBlock(), createElementBlock("br", { key: i })) : createCommentVNode("v-if", true)
                ],
                64
                /* STABLE_FRAGMENT */
              );
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
var Field = /* @__PURE__ */ _export_sfc(Field$1, [["render", _sfc_render$10]]);

const FormElementMixin = defineComponent({
  props: {
    size: String,
    expanded: Boolean,
    loading: Boolean,
    rounded: Boolean,
    icon: String,
    iconPack: String,
    maxlength: [Number, String],
    useHtml5Validation: {
      type: Boolean,
      default: () => config.defaultUseHtml5Validation
    },
    validationMessage: String,
    locale: {
      type: [String, Array],
      default: () => {
        return config.defaultLocale;
      }
    },
    statusIcon: {
      type: Boolean,
      default: () => {
        return config.defaultStatusIcon;
      }
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blur: (event) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focus: (event) => true
  },
  data() {
    return {
      isValid: true,
      isFocused: false,
      newIconPack: this.iconPack || config.defaultIconPack,
      // host component must override this
      _elementRef: ""
    };
  },
  computed: {
    /*
     * Find parent Field, max 3 levels deep.
     */
    parentField() {
      let parent = this.$parent;
      for (let i = 0; i < 3; i++) {
        if (parent && !parent.$data._isField) {
          parent = parent.$parent;
        }
      }
      return parent;
    },
    /*
     * Get the type prop from parent if it's a Field.
     */
    statusType() {
      const { newType } = this.parentField || {};
      if (!newType) return;
      if (typeof newType === "string") {
        return newType;
      } else {
        for (const key in newType) {
          if (newType[key]) {
            return key;
          }
        }
      }
      return void 0;
    },
    /*
     * Get the message prop from parent if it's a Field.
     */
    statusMessage() {
      if (!this.parentField) return;
      return this.parentField.newMessage || this.parentField.$slots.message;
    },
    /*
     * Fix icon size for inputs, large was too big
     */
    iconSize() {
      switch (this.size) {
        case "is-small":
          return this.size;
        case "is-medium":
          return;
        case "is-large":
          return this.newIconPack === "mdi" ? "is-medium" : "";
      }
      return void 0;
    }
  },
  methods: {
    /*
     * Focus method that work dynamically depending on the component.
     */
    focus() {
      const el = this.getElement();
      if (el === void 0) return;
      this.$nextTick(() => {
        if (el) el.focus();
      });
    },
    onBlur($event) {
      this.isFocused = false;
      this.$emit("blur", $event);
      this.checkHtml5Validity();
    },
    onFocus($event) {
      this.isFocused = true;
      this.$emit("focus", $event);
    },
    getElement() {
      let el = this.$refs[this.$data._elementRef];
      while (el != null && typeof el === "object" && "$refs" in el) {
        const form = el;
        el = form.$refs[form.$data._elementRef];
      }
      return el;
    },
    setInvalid() {
      const type = "is-danger";
      const message = this.validationMessage || this.getElement().validationMessage;
      this.setValidity(type, message);
    },
    setValidity(type, message) {
      this.$nextTick(() => {
        if (this.parentField) {
          if (!this.parentField.type) {
            this.parentField.newType = type;
          }
          if (!this.parentField.message) {
            this.parentField.newMessage = message;
          }
        }
      });
    },
    /*
     * Check HTML5 validation, set isValid property.
     * If validation fail, send 'is-danger' type,
     * and error message to parent if it's a Field.
     */
    checkHtml5Validity() {
      if (!this.useHtml5Validation) {
        return false;
      }
      const el = this.getElement();
      if (el == null) {
        return false;
      }
      if (!el.checkValidity()) {
        this.setInvalid();
        this.isValid = false;
      } else {
        this.setValidity(null, null);
        this.isValid = true;
      }
      return this.isValid;
    }
  }
});

const mdiIcons = {
  sizes: {
    default: "mdi-24px",
    "is-small": null,
    "is-medium": "mdi-36px",
    "is-large": "mdi-48px"
  },
  iconPrefix: "mdi-"
};
const faIcons = () => {
  const faIconPrefix = config && config.defaultIconComponent ? "" : "fa-";
  return {
    sizes: {
      default: null,
      "is-small": null,
      "is-medium": faIconPrefix + "lg",
      "is-large": faIconPrefix + "2x"
    },
    iconPrefix: faIconPrefix,
    internalIcons: {
      information: "info-circle",
      alert: "exclamation-triangle",
      "alert-circle": "exclamation-circle",
      "chevron-right": "angle-right",
      "chevron-left": "angle-left",
      "chevron-down": "angle-down",
      "eye-off": "eye-slash",
      "menu-down": "caret-down",
      "menu-up": "caret-up",
      "close-circle": "times-circle"
    }
  };
};
const getIcons = () => {
  let icons = {
    mdi: mdiIcons,
    fa: faIcons(),
    fas: faIcons(),
    far: faIcons(),
    fad: faIcons(),
    fab: faIcons(),
    fal: faIcons(),
    "fa-solid": faIcons(),
    "fa-regular": faIcons(),
    "fa-light": faIcons(),
    "fa-thin": faIcons(),
    "fa-duotone": faIcons(),
    "fa-brands": faIcons()
  };
  if (config && config.customIconPacks) {
    icons = merge(icons, config.customIconPacks, true);
  }
  return icons;
};

var _sfc_main$R = defineComponent({
  name: "BIcon",
  props: {
    type: [String, Object],
    component: String,
    pack: String,
    icon: {
      type: String,
      required: true
    },
    size: String,
    customSize: String,
    customClass: String,
    both: Boolean
    // This is used internally to show both MDI and FA icon
  },
  computed: {
    iconConfig() {
      const allIcons = getIcons();
      return allIcons[this.newPack];
    },
    iconPrefix() {
      if (this.iconConfig && this.iconConfig.iconPrefix) {
        return this.iconConfig.iconPrefix;
      }
      return "";
    },
    /*
    * Internal icon name based on the pack.
    * If pack is 'fa', gets the equivalent FA icon name of the MDI,
    * internal icons are always MDI.
    */
    newIcon() {
      return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`;
    },
    newPack() {
      return this.pack || config.defaultIconPack;
    },
    newType() {
      if (!this.type) return;
      let splitType = [];
      if (typeof this.type === "string") {
        splitType = this.type.split("-");
      } else {
        for (const key in this.type) {
          if (this.type[key]) {
            splitType = key.split("-");
            break;
          }
        }
      }
      if (splitType.length <= 1) return;
      const [, ...type] = splitType;
      return `has-text-${type.join("-")}`;
    },
    newCustomSize() {
      return this.customSize || this.customSizeByPack;
    },
    customSizeByPack() {
      if (this.iconConfig && this.iconConfig.sizes) {
        if (this.size && this.iconConfig.sizes[this.size] !== void 0) {
          return this.iconConfig.sizes[this.size];
        } else if (this.iconConfig.sizes.default) {
          return this.iconConfig.sizes.default;
        }
      }
      return null;
    },
    useIconComponent() {
      return this.component || config.defaultIconComponent;
    }
  },
  methods: {
    /*
    * Equivalent icon name of the MDI.
    */
    getEquivalentIconOf(value) {
      if (!this.both) {
        return value;
      }
      if (this.iconConfig == null) {
        return value;
      }
      const maybeInternal = this.iconConfig;
      if (maybeInternal && maybeInternal.internalIcons && maybeInternal.internalIcons[value]) {
        return maybeInternal.internalIcons[value];
      }
      return value;
    }
  }
});

function _sfc_render$$(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "span",
    {
      class: normalizeClass(["icon", [_ctx.newType, _ctx.size]])
    },
    [
      !_ctx.useIconComponent ? (openBlock(), createElementBlock(
        "i",
        {
          key: 0,
          class: normalizeClass([_ctx.newPack, _ctx.newIcon, _ctx.newCustomSize, _ctx.customClass])
        },
        null,
        2
        /* CLASS */
      )) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.useIconComponent), {
        key: 1,
        icon: [_ctx.newPack, _ctx.newIcon],
        size: _ctx.newCustomSize,
        class: normalizeClass([_ctx.customClass])
      }, null, 8, ["icon", "size", "class"]))
    ],
    2
    /* CLASS */
  );
}
var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$$]]);

var _sfc_main$Q = defineComponent({
  name: "BInput",
  components: { BIcon },
  mixins: [CompatFallthroughMixin, FormElementMixin],
  props: {
    modelValue: {
      type: [Number, String]
    },
    type: {
      type: String,
      default: "text"
    },
    lazy: {
      type: Boolean,
      default: false
    },
    passwordReveal: Boolean,
    iconClickable: Boolean,
    hasCounter: {
      type: Boolean,
      default: () => config.defaultInputHasCounter
    },
    customClass: {
      type: String,
      default: ""
    },
    iconRight: String,
    iconRightClickable: Boolean,
    iconRightType: String,
    // Native options to use in HTML5 validation
    autocomplete: String
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "icon-click": (event) => true,
    "icon-right-click": (event) => true,
    "update:modelValue": (value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newValue: this.modelValue,
      newType: this.type,
      newAutocomplete: this.autocomplete || config.defaultInputAutocomplete,
      isPasswordVisible: false,
      _elementRef: this.type === "textarea" ? "textarea" : "input"
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit("update:modelValue", value);
      }
    },
    rootClasses() {
      return [
        this.iconPosition,
        this.size,
        {
          "is-expanded": this.expanded,
          "is-loading": this.loading,
          "is-clearfix": !this.hasMessage
        }
      ];
    },
    inputClasses() {
      return [
        this.statusType,
        this.size,
        { "is-rounded": this.rounded }
      ];
    },
    hasIconRight() {
      return this.passwordReveal || this.loading || this.statusIcon && this.statusTypeIcon || this.iconRight;
    },
    rightIcon() {
      if (this.passwordReveal) {
        return this.passwordVisibleIcon;
      } else if (this.iconRight) {
        return this.iconRight;
      }
      return this.statusTypeIcon;
    },
    rightIconType() {
      if (this.passwordReveal) {
        return "is-primary";
      } else if (this.iconRight) {
        return this.iconRightType || void 0;
      }
      return this.statusType;
    },
    /*
    * Position of the icon or if it's both sides.
    */
    iconPosition() {
      let iconClasses = "";
      if (this.icon) {
        iconClasses += "has-icons-left ";
      }
      if (this.hasIconRight) {
        iconClasses += "has-icons-right";
      }
      return iconClasses;
    },
    /*
    * Icon name (MDI) based on the type.
    */
    statusTypeIcon() {
      switch (this.statusType) {
        case "is-success":
          return "check";
        case "is-danger":
          return "alert-circle";
        case "is-info":
          return "information";
        case "is-warning":
          return "alert";
        default:
          return void 0;
      }
    },
    /*
    * Check if have any message prop from parent if it's a Field.
    */
    hasMessage() {
      return !!this.statusMessage;
    },
    /*
    * Current password-reveal icon name.
    */
    passwordVisibleIcon() {
      return !this.isPasswordVisible ? "eye" : "eye-off";
    },
    /*
    * Get value length
    */
    valueLength() {
      if (typeof this.computedValue === "string") {
        return Array.from(this.computedValue).length;
      } else if (typeof this.computedValue === "number") {
        return this.computedValue.toString().length;
      }
      return 0;
    }
  },
  watch: {
    /*
    * When v-model is changed:
    *   1. Set internal value.
    *   2. Validate it if the value came from outside;
    *      i.e., not equal to computedValue
    */
    modelValue(value) {
      const fromOutside = this.computedValue != value;
      this.newValue = value;
      if (fromOutside) {
        this.$nextTick(() => {
          !this.isValid && this.checkHtml5Validity();
        });
      }
    },
    type(type) {
      this.newType = type;
    }
  },
  methods: {
    /*
    * Toggle the visibility of a password-reveal input
    * by changing the type and focus the input right away.
    */
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.newType = this.isPasswordVisible ? "text" : "password";
      this.$nextTick(() => {
        this.focus();
      });
    },
    iconClick(emit, event) {
      this.$emit(emit, event);
      this.$nextTick(() => {
        this.focus();
      });
    },
    rightIconClick(event) {
      if (this.passwordReveal) {
        this.togglePasswordVisibility();
      } else if (this.iconRightClickable) {
        this.iconClick("icon-right-click", event);
      }
    },
    onInput() {
      if (!this.lazy) {
        this.revalidate();
      }
    },
    onChange() {
      if (this.lazy) {
        this.revalidate();
      }
    },
    revalidate() {
      !this.isValid && this.checkHtml5Validity();
    }
  }
});

const _hoisted_1$S = ["type", "autocomplete", "maxlength"];
const _hoisted_2$I = ["maxlength"];
const _hoisted_3$t = ["type", "autocomplete", "maxlength"];
const _hoisted_4$l = ["maxlength"];
function _sfc_render$_(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["control", _ctx.rootClasses]
    }, _ctx.rootAttrs),
    [
      _ctx.lazy ? (openBlock(), createElementBlock(
        Fragment,
        { key: 0 },
        [
          _ctx.type !== "textarea" ? withDirectives((openBlock(), createElementBlock("input", mergeProps({
            key: 0,
            ref: "input",
            class: ["input", [_ctx.inputClasses, _ctx.customClass]],
            type: _ctx.newType,
            autocomplete: _ctx.newAutocomplete,
            maxlength: _ctx.maxlength,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event)
          }, _ctx.fallthroughAttrs, {
            onInput: _cache[1] || (_cache[1] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
            onChange: _cache[2] || (_cache[2] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
            onBlur: _cache[3] || (_cache[3] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
            onFocus: _cache[4] || (_cache[4] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
          }), null, 16, _hoisted_1$S)), [
            [
              vModelDynamic,
              _ctx.computedValue,
              void 0,
              { lazy: true }
            ]
          ]) : withDirectives((openBlock(), createElementBlock("textarea", mergeProps({
            key: 1,
            ref: "textarea",
            class: ["textarea", [_ctx.inputClasses, _ctx.customClass]],
            maxlength: _ctx.maxlength,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.computedValue = $event)
          }, _ctx.fallthroughAttrs, {
            onInput: _cache[6] || (_cache[6] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
            onChange: _cache[7] || (_cache[7] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
            onBlur: _cache[8] || (_cache[8] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
            onFocus: _cache[9] || (_cache[9] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
          }), null, 16, _hoisted_2$I)), [
            [
              vModelText,
              _ctx.computedValue,
              void 0,
              { lazy: true }
            ]
          ])
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (openBlock(), createElementBlock(
        Fragment,
        { key: 1 },
        [
          _ctx.type !== "textarea" ? withDirectives((openBlock(), createElementBlock("input", mergeProps({
            key: 0,
            ref: "input",
            class: ["input", [_ctx.inputClasses, _ctx.customClass]],
            type: _ctx.newType,
            autocomplete: _ctx.newAutocomplete,
            maxlength: _ctx.maxlength,
            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.computedValue = $event)
          }, _ctx.fallthroughAttrs, {
            onInput: _cache[11] || (_cache[11] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
            onChange: _cache[12] || (_cache[12] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
            onBlur: _cache[13] || (_cache[13] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
            onFocus: _cache[14] || (_cache[14] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
          }), null, 16, _hoisted_3$t)), [
            [vModelDynamic, _ctx.computedValue]
          ]) : withDirectives((openBlock(), createElementBlock("textarea", mergeProps({
            key: 1,
            ref: "textarea",
            class: ["textarea", [_ctx.inputClasses, _ctx.customClass]],
            maxlength: _ctx.maxlength,
            "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => _ctx.computedValue = $event)
          }, _ctx.fallthroughAttrs, {
            onInput: _cache[16] || (_cache[16] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
            onChange: _cache[17] || (_cache[17] = (...args) => _ctx.onChange && _ctx.onChange(...args)),
            onBlur: _cache[18] || (_cache[18] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
            onFocus: _cache[19] || (_cache[19] = (...args) => _ctx.onFocus && _ctx.onFocus(...args))
          }), null, 16, _hoisted_4$l)), [
            [vModelText, _ctx.computedValue]
          ])
        ],
        64
        /* STABLE_FRAGMENT */
      )),
      _ctx.icon ? (openBlock(), createBlock(_component_b_icon, {
        key: 2,
        class: normalizeClass(["is-left", { "is-clickable": _ctx.iconClickable }]),
        icon: _ctx.icon,
        pack: _ctx.iconPack,
        size: _ctx.iconSize,
        onClick: _cache[20] || (_cache[20] = ($event) => _ctx.iconClick("icon-click", $event))
      }, null, 8, ["class", "icon", "pack", "size"])) : createCommentVNode("v-if", true),
      !_ctx.loading && _ctx.hasIconRight && _ctx.rightIcon ? (openBlock(), createBlock(_component_b_icon, {
        key: 3,
        class: normalizeClass(["is-right", { "is-clickable": _ctx.passwordReveal || _ctx.iconRightClickable }]),
        icon: _ctx.rightIcon,
        pack: _ctx.iconPack,
        size: _ctx.iconSize,
        type: _ctx.rightIconType,
        both: "",
        onClick: _ctx.rightIconClick
      }, null, 8, ["class", "icon", "pack", "size", "type", "onClick"])) : createCommentVNode("v-if", true),
      _ctx.maxlength && _ctx.hasCounter && _ctx.type !== "number" ? (openBlock(), createElementBlock(
        "small",
        {
          key: 4,
          class: normalizeClass(["help counter", { "is-invisible": !_ctx.isFocused }])
        },
        toDisplayString(_ctx.valueLength) + " / " + toDisplayString(_ctx.maxlength),
        3
        /* TEXT, CLASS */
      )) : createCommentVNode("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var BInput = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$_]]);

var _sfc_main$P = defineComponent({
  name: "BAutocomplete",
  components: { BInput },
  mixins: [CompatFallthroughMixin, FormElementMixin],
  props: {
    modelValue: [Number, String, null],
    data: {
      type: Array,
      default: () => []
    },
    field: {
      type: String,
      default: "value"
    },
    keepFirst: Boolean,
    clearOnSelect: Boolean,
    openOnFocus: Boolean,
    customFormatter: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Function
    },
    checkInfiniteScroll: Boolean,
    keepOpen: Boolean,
    selectOnClickOutside: Boolean,
    clearable: Boolean,
    maxHeight: [String, Number],
    dropdownPosition: {
      type: String,
      default: "auto"
    },
    groupField: String,
    groupOptions: String,
    iconRight: String,
    iconRightClickable: Boolean,
    appendToBody: Boolean,
    type: {
      type: String,
      default: "text"
    },
    confirmKeys: {
      type: Array,
      default: () => ["Tab", "Enter"]
    },
    selectableHeader: Boolean,
    selectableFooter: Boolean,
    // Native options to use in HTML5 validation
    autocomplete: String
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
    active: (active) => true,
    blur: (event) => true,
    focus: (event) => true,
    "icon-click": (event) => true,
    "icon-right-click": (event) => true,
    "infinite-scroll": () => true,
    select: (selected, event) => true,
    "select-footer": (event) => true,
    "select-header": (event) => true,
    typing: (value) => true,
    "update:modelValue": (value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selected: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hovered: null,
      headerHovered: null,
      footerHovered: null,
      isActive: false,
      newValue: this.modelValue,
      newAutocomplete: this.autocomplete || "off",
      ariaAutocomplete: this.keepFirst ? "both" : "list",
      isListInViewportVertically: true,
      hasFocus: false,
      style: {},
      _isAutocomplete: true,
      _elementRef: "input",
      _bodyEl: void 0,
      // Used to append to body
      timeOutID: void 0
    };
  },
  computed: {
    computedData() {
      const { groupField, groupOptions } = this;
      if (groupField) {
        if (groupOptions) {
          const newData = [];
          this.data.forEach((option) => {
            const group = getValueByPath(option, groupField);
            const items = getValueByPath(option, groupOptions);
            newData.push({ group, items });
          });
          return newData;
        } else {
          const tmp = {};
          this.data.forEach((option) => {
            const group = getValueByPath(option, groupField);
            if (!tmp[group]) tmp[group] = [];
            tmp[group].push(option);
          });
          const newData = [];
          Object.keys(tmp).forEach((group) => {
            newData.push({ group, items: tmp[group] });
          });
          return newData;
        }
      }
      return [{ items: this.data }];
    },
    isEmpty() {
      if (!this.computedData) return true;
      return !this.computedData.some(
        (element) => element.items && element.items.length
      );
    },
    /*
     * White-listed items to not close when clicked.
     * Add input, dropdown and all children.
     */
    whiteList() {
      var _a;
      this.computedData;
      const whiteList = [];
      whiteList.push(this.$refs.input.$el.querySelector("input"));
      whiteList.push(this.$refs.dropdown);
      if (this.$refs.dropdown != null) {
        const children = this.$refs.dropdown.querySelectorAll("*");
        for (const child of children) {
          whiteList.push(child);
        }
      }
      if (((_a = this.$parent) == null ? void 0 : _a.$data)._isTaginput) {
        whiteList.push(this.$parent.$el);
        const tagInputChildren = this.$parent.$el.querySelectorAll("*");
        for (const tagInputChild of tagInputChildren) {
          whiteList.push(tagInputChild);
        }
      }
      return whiteList;
    },
    /*
     * Check if exists default slot
     */
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    /*
     * Check if exists group slot
     */
    hasGroupSlot() {
      return !!this.$slots.group;
    },
    /*
     * Check if exists "empty" slot
     */
    hasEmptySlot() {
      return !!this.$slots.empty;
    },
    /*
     * Check if exists "header" slot
     */
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    /*
     * Check if exists "footer" slot
     */
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
    /*
     * Apply dropdownPosition property
     */
    isOpenedTop() {
      return this.dropdownPosition === "top" || this.dropdownPosition === "auto" && !this.isListInViewportVertically;
    },
    newIconRight() {
      if (this.clearable && this.newValue) {
        return "close-circle";
      }
      return this.iconRight;
    },
    newIconRightClickable() {
      if (this.clearable) {
        return true;
      }
      return this.iconRightClickable;
    },
    contentStyle() {
      return {
        maxHeight: toCssWidth(this.maxHeight) || void 0
      };
    }
  },
  watch: {
    /*
     * When dropdown is toggled, check the visibility to know when
     * to open upwards.
     */
    isActive(active) {
      if (this.dropdownPosition === "auto") {
        if (active) {
          this.calcDropdownInViewportVertical();
        } else {
          this.timeOutID = setTimeout(() => {
            this.calcDropdownInViewportVertical();
          }, 100);
        }
      }
      this.$nextTick(() => {
        this.$emit("active", active);
      });
    },
    /*
     * When checkInfiniteScroll property changes scroll event should be removed or added
     */
    checkInfiniteScroll(checkInfiniteScroll) {
      if (!this.$refs.dropdown) return;
      const list = this.$refs.dropdown.querySelector(
        ".dropdown-content"
      );
      if (!list) return;
      if (checkInfiniteScroll === true) {
        list.addEventListener(
          "scroll",
          this.checkIfReachedTheEndOfScroll
        );
        return;
      }
      list.removeEventListener(
        "scroll",
        this.checkIfReachedTheEndOfScroll
      );
    },
    /*
     * When updating input's value
     *   1. Emit changes
     *   2. If value isn't the same as selected, set null
     *   3. Close dropdown if value is clear or else open it
     */
    newValue(value) {
      this.$emit("update:modelValue", value);
      const currentValue = this.getValue(this.selected);
      if (currentValue !== void 0 && currentValue !== null && currentValue !== value) {
        this.setSelected(null, false);
      }
      if (this.hasFocus && (!this.openOnFocus || value !== "")) {
        this.isActive = value !== "" && value !== void 0 && value !== null;
      }
    },
    /*
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue(value) {
      this.newValue = value;
    },
    keepFirst(value) {
      this.ariaAutocomplete = value ? "both" : "list";
    },
    /*
     * Select first option if "keep-first
     */
    data() {
      if (this.keepFirst) {
        this.$nextTick(() => {
          if (this.isActive) {
            this.selectFirstOption(this.computedData);
          } else {
            this.setHovered(null);
          }
        });
      } else {
        if (this.hovered) {
          const hoveredValue = this.getValue(this.hovered);
          const data = this.computedData.map((d) => d.items).reduce((a, b) => [...a, ...b], []);
          if (!data.some((d) => this.getValue(d) === hoveredValue)) {
            this.setHovered(null);
          }
        }
      }
    },
    /*
     * When appendToBody property changes, handle the transition properly
     */
    appendToBody(newValue, oldValue) {
      if (newValue && !oldValue) {
        if (this.isActive && this.$refs.dropdown && !this.$data._bodyEl) {
          this.$data._bodyEl = createAbsoluteElement(
            this.$refs.dropdown
          );
          this.updateAppendToBody();
        }
      } else if (!newValue && oldValue) {
        if (this.$data._bodyEl) {
          removeElement(this.$data._bodyEl);
          this.$data._bodyEl = void 0;
        }
      }
    }
  },
  methods: {
    /*
     * Set which option is currently hovered.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setHovered(option) {
      if (option === void 0) return;
      this.hovered = option;
    },
    /*
     * Set which option is currently selected, update v-model,
     * update input value and close dropdown.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelected(option, closeDropdown = true, event) {
      if (option === void 0) return;
      this.selected = option;
      this.$emit("select", this.selected, event);
      if (this.selected !== null) {
        if (this.clearOnSelect) {
          this.newValue = "";
        } else {
          this.newValue = this.getValue(this.selected);
        }
        this.setHovered(null);
      }
      closeDropdown && this.$nextTick(() => {
        this.isActive = false;
      });
      this.checkValidity();
    },
    /*
     * Select first option
     */
    selectFirstOption(computedData) {
      this.$nextTick(() => {
        const nonEmptyElements = computedData.filter(
          (element) => element.items && element.items.length
        );
        if (nonEmptyElements.length) {
          const option = nonEmptyElements[0].items[0];
          this.setHovered(option);
        } else {
          this.setHovered(null);
        }
      });
    },
    /*
     * Find index of hovered item in data array by comparing display values
     * instead of object references. This fixes the bug with computed data
     * where proxy objects cause indexOf to fail.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findHoveredIndex(data) {
      if (this.hovered === null || this.hovered === void 0) {
        return -1;
      }
      const exactIndex = data.indexOf(this.hovered);
      if (exactIndex !== -1) {
        return exactIndex;
      }
      const hoveredValue = this.getValue(this.hovered);
      if (hoveredValue === null || hoveredValue === void 0) {
        return -1;
      }
      return data.findIndex((item) => {
        if (item === null || item === void 0) {
          return hoveredValue === null || hoveredValue === void 0;
        }
        return this.getValue(item) === hoveredValue;
      });
    },
    keydown(event) {
      const { key } = event;
      if (key === "Enter") event.preventDefault();
      if (key === "Escape" || key === "Tab") {
        this.isActive = false;
      }
      if (this.confirmKeys.indexOf(key) >= 0) {
        if (key === ",") event.preventDefault();
        const closeDropdown = !this.keepOpen || key === "Tab";
        if (this.hovered === null) {
          this.checkIfHeaderOrFooterSelected(
            event,
            null,
            closeDropdown
          );
          return;
        }
        this.setSelected(this.hovered, closeDropdown, event);
      }
    },
    selectHeaderOrFoterByClick(event, origin) {
      this.checkIfHeaderOrFooterSelected(event, { origin });
    },
    /*
     * Check if header or footer was selected.
     */
    checkIfHeaderOrFooterSelected(event, triggerClick, closeDropdown = true) {
      if (this.selectableHeader && (this.headerHovered || triggerClick && triggerClick.origin === "header")) {
        this.$emit("select-header", event);
        this.headerHovered = false;
        if (triggerClick) this.setHovered(null);
        if (closeDropdown) this.isActive = false;
      }
      if (this.selectableFooter && (this.footerHovered || triggerClick && triggerClick.origin === "footer")) {
        this.$emit("select-footer", event);
        this.footerHovered = false;
        if (triggerClick) this.setHovered(null);
        if (closeDropdown) this.isActive = false;
      }
    },
    /*
     * Close dropdown if clicked outside.
     */
    clickedOutside(event) {
      const target = isCustomElement(this) ? event.composedPath()[0] : event.target;
      if (!this.hasFocus && this.whiteList.indexOf(target) < 0) {
        if (this.keepFirst && this.hovered && this.selectOnClickOutside) {
          this.setSelected(this.hovered, true);
        } else {
          this.isActive = false;
        }
      }
    },
    /*
     * Return display text for the input.
     * If object, get value from path, or else just the value.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getValue(option) {
      if (option === null) return;
      if (typeof this.customFormatter !== "undefined") {
        return this.customFormatter(option);
      }
      return typeof option === "object" ? getValueByPath(option, this.field) : option;
    },
    /*
     * Check if the scroll list inside the dropdown
     * reached it's end.
     */
    checkIfReachedTheEndOfScroll() {
      const list = this.$refs.dropdown.querySelector(
        ".dropdown-content"
      );
      const footerHeight = this.hasFooterSlot ? list.querySelectorAll("div.dropdown-footer")[0].clientHeight : 0;
      if (list.clientHeight !== list.scrollHeight && list.scrollTop + list.parentElement.clientHeight + footerHeight >= list.scrollHeight) {
        this.$emit("infinite-scroll");
      }
    },
    /*
     * Calculate if the dropdown is vertically visible when activated,
     * otherwise it is openened upwards.
     */
    calcDropdownInViewportVertical() {
      this.$nextTick(() => {
        var _a;
        if (this.$refs.dropdown == null) return;
        const rect = this.$refs.dropdown.getBoundingClientRect();
        this.isListInViewportVertically = rect.top >= 0 && rect.bottom <= ((window == null ? void 0 : window.innerHeight) || ((_a = document == null ? void 0 : document.documentElement) == null ? void 0 : _a.clientHeight));
        if (this.appendToBody) {
          this.updateAppendToBody();
        }
      });
    },
    /*
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
     */
    keyArrows(direction) {
      const sum = direction === "down" ? 1 : -1;
      if (this.isActive) {
        const data = this.computedData.map((d) => d.items).reduce((a, b) => [...a, ...b], []);
        if (this.hasHeaderSlot && this.selectableHeader) {
          data.unshift(void 0);
        }
        if (this.hasFooterSlot && this.selectableFooter) {
          data.push(void 0);
        }
        let index;
        if (this.headerHovered) {
          index = 0 + sum;
        } else if (this.footerHovered) {
          index = data.length - 1 + sum;
        } else {
          index = this.findHoveredIndex(data) + sum;
        }
        index = index > data.length - 1 ? data.length - 1 : index;
        index = index < 0 ? 0 : index;
        this.footerHovered = false;
        this.headerHovered = false;
        this.setHovered(data[index] !== void 0 ? data[index] : null);
        if (this.hasFooterSlot && this.selectableFooter && index === data.length - 1) {
          this.footerHovered = true;
        }
        if (this.hasHeaderSlot && this.selectableHeader && index === 0) {
          this.headerHovered = true;
        }
        const list = this.$refs.dropdown.querySelector(
          ".dropdown-content"
        );
        let querySelectorText = "a.dropdown-item:not(.is-disabled)";
        if (this.hasHeaderSlot && this.selectableHeader) {
          querySelectorText += ",div.dropdown-header";
        }
        if (this.hasFooterSlot && this.selectableFooter) {
          querySelectorText += ",div.dropdown-footer";
        }
        const element = list.querySelectorAll(querySelectorText)[index];
        if (!element) return;
        const visMin = list.scrollTop;
        const visMax = list.scrollTop + list.clientHeight - element.clientHeight;
        if (element.offsetTop < visMin) {
          list.scrollTop = element.offsetTop;
        } else if (element.offsetTop >= visMax) {
          list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
        }
      } else {
        this.isActive = true;
      }
    },
    /*
     * Focus listener.
     * If value is the same as selected, select all text.
     */
    focused(event) {
      if (this.getValue(this.selected) === this.newValue) {
        this.$el.querySelector("input").select();
      }
      if (this.openOnFocus) {
        this.isActive = true;
        if (this.keepFirst) {
          this.selectFirstOption(this.computedData);
        }
      }
      this.hasFocus = true;
      this.$emit("focus", event);
    },
    /*
     * Blur listener.
     */
    onBlur(event) {
      this.hasFocus = false;
      this.$emit("blur", event);
    },
    onInput() {
      const currentValue = this.getValue(this.selected);
      if (currentValue !== void 0 && currentValue !== null && currentValue === this.newValue) {
        return;
      }
      this.$emit("typing", this.newValue);
      this.checkValidity();
    },
    rightIconClick(event) {
      if (this.clearable) {
        this.newValue = "";
        this.setSelected(null, false);
        if (this.openOnFocus) {
          this.$refs.input.$el.focus();
        }
      } else {
        this.$emit("icon-right-click", event);
      }
    },
    checkValidity() {
      if (this.useHtml5Validation) {
        this.$nextTick(() => {
          this.checkHtml5Validity();
        });
      }
    },
    updateAppendToBody() {
      const dropdownMenu = this.$refs.dropdown;
      const trigger = this.$parent.$data._isTaginput ? this.$parent.$el : this.$refs.input.$el;
      if (dropdownMenu && trigger) {
        if (!this.$data._bodyEl) {
          this.$data._bodyEl = createAbsoluteElement(dropdownMenu);
        }
        const root = this.$data._bodyEl;
        root.classList.forEach((item) => root.classList.remove(item));
        root.classList.add("autocomplete");
        root.classList.add("control");
        if (this.expanded) {
          root.classList.add("is-expanded");
        }
        const rect = trigger.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        if (!this.isOpenedTop) {
          top += trigger.clientHeight;
        } else {
          top -= dropdownMenu.clientHeight;
        }
        this.style = {
          position: "absolute",
          top: `${top}px`,
          left: `${left}px`,
          width: `${trigger.clientWidth}px`,
          maxWidth: `${trigger.clientWidth}px`,
          zIndex: "99"
        };
      }
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
      if (this.dropdownPosition === "auto") {
        window.addEventListener(
          "resize",
          this.calcDropdownInViewportVertical
        );
      }
      if (this.appendToBody) {
        window.addEventListener(
          "scroll",
          this.calcDropdownInViewportVertical
        );
      }
    }
  },
  mounted() {
    if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector(".dropdown-content")) {
      const list = this.$refs.dropdown.querySelector(
        ".dropdown-content"
      );
      list.addEventListener("scroll", this.checkIfReachedTheEndOfScroll);
    }
    if (this.appendToBody) {
      this.$data._bodyEl = createAbsoluteElement(
        this.$refs.dropdown
      );
      this.updateAppendToBody();
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
      if (this.dropdownPosition === "auto") {
        window.removeEventListener(
          "resize",
          this.calcDropdownInViewportVertical
        );
      }
      if (this.appendToBody) {
        window.removeEventListener(
          "scroll",
          this.calcDropdownInViewportVertical
        );
      }
    }
    if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector(".dropdown-content")) {
      const list = this.$refs.dropdown.querySelector(
        ".dropdown-content"
      );
      list.removeEventListener(
        "scroll",
        this.checkIfReachedTheEndOfScroll
      );
    }
    if (this.appendToBody && this.$data._bodyEl) {
      removeElement(this.$data._bodyEl);
    }
    clearTimeout(this.timeOutID);
  }
});

const _hoisted_1$R = {
  key: 1,
  class: "has-text-weight-bold"
};
const _hoisted_2$H = ["onClick"];
const _hoisted_3$s = { key: 1 };
const _hoisted_4$k = {
  key: 1,
  class: "dropdown-item is-disabled"
};
function _sfc_render$Z(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = resolveComponent("b-input");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["autocomplete control", { "is-expanded": _ctx.expanded }]
    }, _ctx.rootAttrs),
    [
      createVNode(_component_b_input, mergeProps({
        modelValue: _ctx.newValue,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.newValue = $event),
        ref: "input",
        type: _ctx.type,
        size: _ctx.size,
        loading: _ctx.loading,
        rounded: _ctx.rounded,
        icon: _ctx.icon,
        "icon-right": _ctx.newIconRight,
        "icon-right-clickable": _ctx.newIconRightClickable,
        "icon-pack": _ctx.iconPack,
        maxlength: _ctx.maxlength,
        autocomplete: _ctx.newAutocomplete,
        "use-html5-validation": false,
        "aria-autocomplete": _ctx.ariaAutocomplete
      }, _ctx.fallthroughAttrs, {
        "onUpdate:modelValue": _ctx.onInput,
        onFocus: _ctx.focused,
        onBlur: _ctx.onBlur,
        onKeydown: [
          _ctx.keydown,
          _cache[1] || (_cache[1] = withKeys(withModifiers(($event) => _ctx.keyArrows("up"), ["prevent"]), ["up"])),
          _cache[2] || (_cache[2] = withKeys(withModifiers(($event) => _ctx.keyArrows("down"), ["prevent"]), ["down"]))
        ],
        onIconRightClick: _ctx.rightIconClick,
        onIconClick: _cache[3] || (_cache[3] = (event) => _ctx.$emit("icon-click", event))
      }), null, 16, ["modelValue", "type", "size", "loading", "rounded", "icon", "icon-right", "icon-right-clickable", "icon-pack", "maxlength", "autocomplete", "aria-autocomplete", "onUpdate:modelValue", "onFocus", "onBlur", "onKeydown", "onIconRightClick"]),
      createVNode(Transition, {
        name: "fade",
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode(
            "div",
            {
              class: normalizeClass(["dropdown dropdown-menu", { "is-opened-top": _ctx.isOpenedTop && !_ctx.appendToBody }]),
              style: normalizeStyle(_ctx.style),
              ref: "dropdown"
            },
            [
              withDirectives(createElementVNode(
                "div",
                {
                  class: "dropdown-content",
                  style: normalizeStyle(_ctx.contentStyle)
                },
                [
                  _ctx.hasHeaderSlot ? (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: normalizeClass(["dropdown-item dropdown-header", { "is-hovered": _ctx.headerHovered }]),
                      role: "button",
                      tabindex: "0",
                      onClick: _cache[4] || (_cache[4] = ($event) => _ctx.selectHeaderOrFoterByClick($event, "header"))
                    },
                    [
                      renderSlot(_ctx.$slots, "header")
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true),
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(_ctx.computedData, (element, groupindex) => {
                      return openBlock(), createElementBlock(
                        Fragment,
                        null,
                        [
                          element.group ? (openBlock(), createElementBlock("div", {
                            key: groupindex + "group",
                            class: "dropdown-item"
                          }, [
                            _ctx.hasGroupSlot ? renderSlot(_ctx.$slots, "group", {
                              key: 0,
                              group: element.group,
                              index: groupindex
                            }) : (openBlock(), createElementBlock(
                              "span",
                              _hoisted_1$R,
                              toDisplayString(element.group),
                              1
                              /* TEXT */
                            ))
                          ])) : createCommentVNode("v-if", true),
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(element.items, (option, index) => {
                              return openBlock(), createElementBlock("a", {
                                key: groupindex + ":" + index,
                                class: normalizeClass(["dropdown-item", { "is-hovered": option === _ctx.hovered }]),
                                role: "button",
                                tabindex: "0",
                                onClick: withModifiers(($event) => _ctx.setSelected(option, !_ctx.keepOpen, $event), ["stop"])
                              }, [
                                _ctx.hasDefaultSlot ? renderSlot(_ctx.$slots, "default", {
                                  key: 0,
                                  option,
                                  index
                                }) : (openBlock(), createElementBlock(
                                  "span",
                                  _hoisted_3$s,
                                  toDisplayString(_ctx.getValue(option)),
                                  1
                                  /* TEXT */
                                ))
                              ], 10, _hoisted_2$H);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      );
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  )),
                  _ctx.isEmpty && _ctx.hasEmptySlot ? (openBlock(), createElementBlock("div", _hoisted_4$k, [
                    renderSlot(_ctx.$slots, "empty")
                  ])) : createCommentVNode("v-if", true),
                  _ctx.hasFooterSlot ? (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 2,
                      class: normalizeClass(["dropdown-item dropdown-footer", { "is-hovered": _ctx.footerHovered }]),
                      role: "button",
                      tabindex: "0",
                      onClick: _cache[5] || (_cache[5] = ($event) => _ctx.selectHeaderOrFoterByClick($event, "footer"))
                    },
                    [
                      renderSlot(_ctx.$slots, "footer")
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true)
                ],
                4
                /* STYLE */
              ), [
                [vShow, _ctx.isActive]
              ])
            ],
            6
            /* CLASS, STYLE */
          ), [
            [vShow, _ctx.isActive && (!_ctx.isEmpty || _ctx.hasEmptySlot || _ctx.hasHeaderSlot || _ctx.hasFooterSlot)]
          ])
        ]),
        _: 3
        /* FORWARDED */
      })
    ],
    16
    /* FULL_PROPS */
  );
}
var BAutocomplete = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$Z]]);

const registerComponent = (Vue, component, name) => {
  const componentName = name || component.name;
  if (componentName == null) {
    throw new Error("Buefy.registerComponent: missing component name");
  }
  Vue.component(componentName, component);
};
const registerComponentProgrammatic = (Vue, property, component) => {
  if (!Vue.config.globalProperties.$buefy) Vue.config.globalProperties.$buefy = {};
  Vue.config.globalProperties.$buefy[property] = component;
};

const Plugin$F = {
  install(Vue) {
    registerComponent(Vue, BAutocomplete);
  }
};

var _sfc_main$O = defineComponent({
  name: "BBreadcrumb",
  props: {
    align: {
      type: String,
      default: () => {
        return config.defaultBreadcrumbAlign;
      }
    },
    separator: {
      type: String,
      default: () => {
        return config.defaultBreadcrumbSeparator;
      }
    },
    size: {
      type: String,
      default: () => {
        return config.defaultBreadcrumbSize;
      }
    }
  },
  computed: {
    breadcrumbClasses() {
      return ["breadcrumb", this.align, this.separator, this.size];
    }
  }
});

function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "nav",
    {
      class: normalizeClass(_ctx.breadcrumbClasses)
    },
    [
      createElementVNode("ul", null, [
        renderSlot(_ctx.$slots, "default")
      ])
    ],
    2
    /* CLASS */
  );
}
var Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$Y]]);

var _sfc_main$N = defineComponent({
  name: "BBreadcrumbItem",
  mixins: [CompatFallthroughMixin],
  props: {
    tag: {
      type: [String, Object],
      default: () => {
        return config.defaultBreadcrumbTag;
      }
    },
    active: Boolean
  }
});

function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "li",
    mergeProps({
      class: { "is-active": _ctx.active }
    }, _ctx.rootAttrs),
    [
      (openBlock(), createBlock(
        resolveDynamicComponent(_ctx.tag),
        normalizeProps(guardReactiveProps(_ctx.fallthroughAttrs)),
        {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
          /* FORWARDED */
        },
        16
        /* FULL_PROPS */
      ))
    ],
    16
    /* FULL_PROPS */
  );
}
var BreadcrumbItem = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$X]]);

const Plugin$E = {
  install(Vue) {
    registerComponent(Vue, Breadcrumb);
    registerComponent(Vue, BreadcrumbItem);
  }
};

const NATIVE_TYPES = [
  "button",
  "submit",
  "reset"
];
var _sfc_main$M = defineComponent({
  name: "BButton",
  components: { BIcon },
  inheritAttrs: false,
  props: {
    type: [String, Object],
    size: String,
    label: String,
    iconPack: String,
    iconLeft: String,
    iconRight: String,
    rounded: {
      type: Boolean,
      default: () => {
        return config.defaultButtonRounded;
      }
    },
    loading: Boolean,
    outlined: Boolean,
    expanded: Boolean,
    inverted: Boolean,
    focused: Boolean,
    active: Boolean,
    hovered: Boolean,
    selected: Boolean,
    nativeType: {
      type: String,
      default: "button",
      validator: (value) => {
        return NATIVE_TYPES.indexOf(value) >= 0;
      }
    },
    tag: {
      type: [String, Object],
      default: "button",
      validator: (value) => {
        return typeof value === "object" || config.defaultLinkTags.indexOf(value) >= 0;
      }
    }
  },
  computed: {
    computedTag() {
      if (this.$attrs.disabled !== void 0 && this.$attrs.disabled !== false) {
        return "button";
      }
      return this.tag;
    },
    iconSize() {
      if (!this.size || this.size === "is-medium") {
        return "is-small";
      } else if (this.size === "is-large") {
        return "is-medium";
      }
      return this.size;
    }
  }
});

const _hoisted_1$Q = { key: 1 };
const _hoisted_2$G = { key: 2 };
function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.computedTag), mergeProps({ class: "button" }, _ctx.$attrs, {
    type: typeof _ctx.computedTag === "string" && ["button", "input"].includes(_ctx.computedTag) ? _ctx.nativeType : void 0,
    class: [_ctx.size, _ctx.type, {
      "is-rounded": _ctx.rounded,
      "is-loading": _ctx.loading,
      "is-outlined": _ctx.outlined,
      "is-fullwidth": _ctx.expanded,
      "is-inverted": _ctx.inverted,
      "is-focused": _ctx.focused,
      "is-active": _ctx.active,
      "is-hovered": _ctx.hovered,
      "is-selected": _ctx.selected
    }]
  }), {
    default: withCtx(() => [
      _ctx.iconLeft ? (openBlock(), createBlock(_component_b_icon, {
        key: 0,
        pack: _ctx.iconPack,
        icon: _ctx.iconLeft,
        size: _ctx.iconSize
      }, null, 8, ["pack", "icon", "size"])) : createCommentVNode("v-if", true),
      _ctx.label ? (openBlock(), createElementBlock(
        "span",
        _hoisted_1$Q,
        toDisplayString(_ctx.label),
        1
        /* TEXT */
      )) : _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_2$G, [
        renderSlot(_ctx.$slots, "default")
      ])) : createCommentVNode("v-if", true),
      _ctx.iconRight ? (openBlock(), createBlock(_component_b_icon, {
        key: 3,
        pack: _ctx.iconPack,
        icon: _ctx.iconRight,
        size: _ctx.iconSize
      }, null, 8, ["pack", "icon", "size"])) : createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["type", "class"]);
}
var BButton = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$W]]);

const Plugin$D = {
  install(Vue) {
    registerComponent(Vue, BButton);
  }
};

var __defProp$b = Object.defineProperty;
var __getOwnPropSymbols$b = Object.getOwnPropertySymbols;
var __hasOwnProp$b = Object.prototype.hasOwnProperty;
var __propIsEnum$b = Object.prototype.propertyIsEnumerable;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$b = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$b.call(b, prop))
      __defNormalProp$b(a, prop, b[prop]);
  if (__getOwnPropSymbols$b)
    for (var prop of __getOwnPropSymbols$b(b)) {
      if (__propIsEnum$b.call(b, prop))
        __defNormalProp$b(a, prop, b[prop]);
    }
  return a;
};
const items = 1;
const sorted$1 = 3;
const Sorted$1 = sorted$1;
var ProviderParentMixin = (itemName, flags) => {
  const mixin = {
    provide() {
      return {
        ["b" + itemName]: this
      };
    }
  };
  if (hasFlag(flags, items)) {
    mixin.data = function() {
      return __spreadValues$b({
        childItems: []
      }, hasFlag(flags, sorted$1) ? { nextIndex: 0 } : {});
    };
    mixin.methods = {
      _registerItem(item) {
        if (hasFlag(flags, sorted$1)) {
          item.dynamicIndex = this.nextIndex;
          ++this.nextIndex;
        }
        this.childItems.push(item);
      },
      _unregisterItem(item) {
        this.childItems = this.childItems.filter((i) => i.uniqueValue !== item.uniqueValue);
      }
    };
    if (hasFlag(flags, sorted$1)) {
      mixin.computed = {
        /*
         * When items are added/removed sort them according to their position
         */
        sortedItems() {
          return this.childItems.slice().sort((i1, i2) => {
            return i1.index - i2.index;
          });
        }
      };
    }
  }
  return mixin;
};

var _sfc_main$L = defineComponent({
  name: "BCarousel",
  components: {
    BIcon
  },
  mixins: [ProviderParentMixin("carousel", Sorted$1)],
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    animated: {
      type: String,
      default: "slide"
    },
    interval: Number,
    hasDrag: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    pauseHover: {
      type: Boolean,
      default: true
    },
    pauseInfo: {
      type: Boolean,
      default: true
    },
    pauseInfoType: {
      type: String,
      default: "is-white"
    },
    pauseText: {
      type: String,
      default: "Pause"
    },
    arrow: {
      type: Boolean,
      default: true
    },
    arrowHover: {
      type: Boolean,
      default: true
    },
    repeat: {
      type: Boolean,
      default: true
    },
    iconPack: String,
    iconSize: String,
    iconPrev: {
      type: String,
      default: () => {
        return config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: () => {
        return config.defaultIconNext;
      }
    },
    indicator: {
      type: Boolean,
      default: true
    },
    indicatorBackground: Boolean,
    indicatorCustom: Boolean,
    indicatorCustomSize: {
      type: String,
      default: "is-small"
    },
    indicatorInside: {
      type: Boolean,
      default: true
    },
    indicatorMode: {
      type: String,
      default: "click"
    },
    indicatorPosition: {
      type: String,
      default: "is-bottom"
    },
    indicatorStyle: {
      type: String,
      default: "is-dots"
    },
    overlay: Boolean,
    progress: Boolean,
    progressType: {
      type: String,
      default: "is-primary"
    },
    withCarouselList: Boolean
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    change: (_index) => true,
    click: () => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      transition: "next",
      activeChild: this.modelValue || 0,
      isPause: false,
      dragX: false,
      timer: void 0
    };
  },
  computed: {
    indicatorClasses() {
      return [
        {
          "has-background": this.indicatorBackground,
          "has-custom": this.indicatorCustom,
          "is-inside": this.indicatorInside
        },
        this.indicatorCustom && this.indicatorCustomSize,
        this.indicatorInside && this.indicatorPosition
      ];
    },
    // checking arrows
    hasPrev() {
      return this.repeat || this.activeChild !== 0;
    },
    hasNext() {
      return this.repeat || this.activeChild < this.childItems.length - 1;
    },
    activeChildIndex() {
      const item = this.sortedItems[this.activeChild];
      return item != null ? item.index : void 0;
    }
  },
  watch: {
    /*
     * When v-model is changed set the new active item.
     */
    modelValue(value) {
      this.changeActive(value);
    },
    /*
     * When carousel-items are updated, set active one.
     */
    sortedItems(items) {
      if (this.activeChild >= items.length && this.activeChild > 0) {
        this.changeActive(this.activeChild - 1);
      }
    },
    /*
     *  When autoplay is changed, start or pause timer accordingly
     */
    autoplay(status) {
      status ? this.startTimer() : this.pauseTimer();
    },
    /*
     *  Since the timer can get paused at the end, if repeat is changed we need to restart it
     */
    repeat(status) {
      if (status) {
        this.startTimer();
      }
    }
  },
  methods: {
    startTimer() {
      if (!this.autoplay || this.timer) return;
      this.isPause = false;
      this.timer = setInterval(() => {
        if (!this.repeat && this.activeChild >= this.childItems.length - 1) {
          this.pauseTimer();
        } else {
          this.next();
        }
      }, this.interval || config.defaultCarouselInterval);
    },
    pauseTimer() {
      this.isPause = true;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = void 0;
      }
    },
    restartTimer() {
      this.pauseTimer();
      this.startTimer();
    },
    checkPause() {
      if (this.pauseHover && this.autoplay) {
        this.pauseTimer();
      }
    },
    /*
     * Change the active item and emit change event.
     * action only for animated slide, there true = next, false = prev
     */
    changeActive(newIndex, direction = 0) {
      if (this.activeChild === newIndex || isNaN(newIndex)) return;
      direction = direction || newIndex - this.activeChild;
      newIndex = this.repeat ? mod(newIndex, this.childItems.length) : bound(newIndex, 0, this.childItems.length - 1);
      this.transition = direction > 0 ? "prev" : "next";
      this.activeChild = newIndex;
      if (newIndex !== this.modelValue) {
        this.$emit("update:modelValue", newIndex);
      }
      this.restartTimer();
      this.$emit("change", newIndex);
    },
    // Indicator trigger when change active item.
    modeChange(trigger, value) {
      if (this.indicatorMode === trigger) {
        return this.changeActive(value);
      }
    },
    prev() {
      this.changeActive(this.activeChild - 1, -1);
    },
    next() {
      this.changeActive(this.activeChild + 1, 1);
    },
    // handle drag event
    dragStart(event) {
      if (!this.hasDrag || !event.target.draggable) return;
      const touches = event.touches;
      this.dragX = touches ? event.changedTouches[0].pageX : event.pageX;
      if (touches) {
        this.pauseTimer();
      } else {
        event.preventDefault();
      }
    },
    dragEnd(event) {
      if (this.dragX === false) return;
      const touches = event.touches;
      const detected = touches ? event.changedTouches[0].pageX : event.pageX;
      const diffX = detected - this.dragX;
      if (Math.abs(diffX) > 30) {
        if (diffX < 0) {
          this.next();
        } else {
          this.prev();
        }
      } else {
        event.target.click();
        this.sortedItems[this.activeChild].$emit("click");
        this.$emit("click");
      }
      if (touches) {
        this.startTimer();
      }
      this.dragX = false;
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    this.pauseTimer();
  }
});

const _hoisted_1$P = ["value", "max"];
const _hoisted_2$F = {
  key: 1,
  class: "carousel-pause"
};
const _hoisted_3$r = ["onMouseover", "onClick"];
function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["carousel", { "is-overlay": _ctx.overlay }]),
      onMouseenter: _cache[4] || (_cache[4] = (...args) => _ctx.checkPause && _ctx.checkPause(...args)),
      onMouseleave: _cache[5] || (_cache[5] = (...args) => _ctx.startTimer && _ctx.startTimer(...args))
    },
    [
      _ctx.progress ? (openBlock(), createElementBlock("progress", {
        key: 0,
        class: normalizeClass(["progress", _ctx.progressType]),
        value: _ctx.activeChild,
        max: _ctx.childItems.length - 1
      }, toDisplayString(_ctx.childItems.length - 1), 11, _hoisted_1$P)) : createCommentVNode("v-if", true),
      createElementVNode(
        "div",
        {
          class: "carousel-items",
          onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.dragStart && _ctx.dragStart(...args)),
          onMouseup: _cache[1] || (_cache[1] = (...args) => _ctx.dragEnd && _ctx.dragEnd(...args)),
          onTouchstart: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.dragStart && _ctx.dragStart(...args), ["stop"])),
          onTouchend: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.dragEnd && _ctx.dragEnd(...args), ["stop"]))
        },
        [
          renderSlot(_ctx.$slots, "default"),
          _ctx.arrow ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(["carousel-arrow", { "is-hovered": _ctx.arrowHover }])
            },
            [
              withDirectives(createVNode(_component_b_icon, {
                class: "has-icons-left",
                onClick: _ctx.prev,
                pack: _ctx.iconPack,
                icon: _ctx.iconPrev,
                size: _ctx.iconSize,
                both: ""
              }, null, 8, ["onClick", "pack", "icon", "size"]), [
                [vShow, _ctx.hasPrev]
              ]),
              withDirectives(createVNode(_component_b_icon, {
                class: "has-icons-right",
                onClick: _ctx.next,
                pack: _ctx.iconPack,
                icon: _ctx.iconNext,
                size: _ctx.iconSize,
                both: ""
              }, null, 8, ["onClick", "pack", "icon", "size"]), [
                [vShow, _ctx.hasNext]
              ])
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ],
        32
        /* NEED_HYDRATION */
      ),
      _ctx.autoplay && _ctx.pauseHover && _ctx.pauseInfo && _ctx.isPause ? (openBlock(), createElementBlock("div", _hoisted_2$F, [
        createElementVNode(
          "span",
          {
            class: normalizeClass(["tag", _ctx.pauseInfoType])
          },
          toDisplayString(_ctx.pauseText),
          3
          /* TEXT, CLASS */
        )
      ])) : createCommentVNode("v-if", true),
      _ctx.withCarouselList && !_ctx.indicator ? renderSlot(_ctx.$slots, "list", {
        key: 2,
        active: _ctx.activeChild,
        switch: _ctx.changeActive
      }) : createCommentVNode("v-if", true),
      _ctx.indicator ? (openBlock(), createElementBlock(
        "div",
        {
          key: 3,
          class: normalizeClass(["carousel-indicator", _ctx.indicatorClasses])
        },
        [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.sortedItems, (item, index) => {
              return openBlock(), createElementBlock("a", {
                class: normalizeClass(["indicator-item", { "is-active": item.isActive }]),
                onMouseover: ($event) => _ctx.modeChange("hover", index),
                onClick: ($event) => _ctx.modeChange("click", index),
                key: item.uniqueValue
              }, [
                renderSlot(_ctx.$slots, "indicators", { i: index }, () => [
                  createElementVNode(
                    "span",
                    {
                      class: normalizeClass(["indicator-style", _ctx.indicatorStyle])
                    },
                    null,
                    2
                    /* CLASS */
                  )
                ])
              ], 42, _hoisted_3$r);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true),
      _ctx.overlay ? renderSlot(_ctx.$slots, "overlay", { key: 4 }) : createCommentVNode("v-if", true)
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
var Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$V]]);

var __defProp$a = Object.defineProperty;
var __defProps$7 = Object.defineProperties;
var __getOwnPropDescs$7 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
var __hasOwnProp$a = Object.prototype.hasOwnProperty;
var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$a = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$a.call(b, prop))
      __defNormalProp$a(a, prop, b[prop]);
  if (__getOwnPropSymbols$a)
    for (var prop of __getOwnPropSymbols$a(b)) {
      if (__propIsEnum$a.call(b, prop))
        __defNormalProp$a(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$7 = (a, b) => __defProps$7(a, __getOwnPropDescs$7(b));
const sorted = 1;
const optional = 2;
const Sorted = sorted;
var InjectedChildMixin = (parentItemName, flags) => {
  const mixin = {
    // FIXME: initializing `parent` with an empty string does not make
    // sense at all, but some code supposes that `parent` is non-null.
    // so I leave it as is for now.
    inject: { parent: { from: "b" + parentItemName, default: "" } },
    props: {
      // if `value` is non-null, it must be unique among all the siblings.
      // see `uniqueValue`
      value: {
        type: String,
        default: null
      }
    },
    computed: {
      // `ProviderParentMixin` uses `uniqueValue` computed value to
      // identify the child in its `childItems` collection.
      // so the value must be unique among all the siblings.
      // falls back to the `uid` internal field to ensure uniqueness.
      uniqueValue() {
        return this.value != null ? this.value : this.$.uid;
      }
    },
    created() {
      if (!this.parent) {
        if (!hasFlag(flags, optional)) {
          throw new Error("You should wrap " + this.$options.name + " in a " + parentItemName);
        }
      } else if (this.parent._registerItem) {
        this.parent._registerItem(this);
      }
    },
    beforeUnmount() {
      if (this.parent && this.parent._unregisterItem) {
        this.parent._unregisterItem(this);
      }
    }
  };
  if (hasFlag(flags, sorted)) {
    mixin.props = __spreadProps$7(__spreadValues$a({}, mixin.props), {
      order: {
        type: Number,
        required: false
      }
    });
    mixin.data = () => {
      return {
        dynamicIndex: void 0
      };
    };
    mixin.computed = __spreadProps$7(__spreadValues$a({}, mixin.computed), {
      index() {
        return this.order != null ? this.order : this.dynamicIndex;
      }
    });
  }
  return mixin;
};

var _sfc_main$K = defineComponent({
  name: "BCarouselItem",
  mixins: [InjectedChildMixin("carousel", Sorted)],
  data() {
    return {
      transitionName: null
    };
  },
  computed: {
    transition() {
      if (this.parent.animated === "fade") {
        return "fade";
      } else if (this.parent.transition) {
        return "slide-" + this.parent.transition;
      } else {
        return void 0;
      }
    },
    isActive() {
      return this.parent.activeChildIndex === this.index;
    }
  }
});

const _hoisted_1$O = { class: "carousel-item" };
function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    name: _ctx.transition,
    persisted: ""
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode(
        "div",
        _hoisted_1$O,
        [
          renderSlot(_ctx.$slots, "default")
        ],
        512
        /* NEED_PATCH */
      ), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
var CarouselItem = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$U]]);

var __defProp$9 = Object.defineProperty;
var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$9 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$9.call(b, prop))
      __defNormalProp$9(a, prop, b[prop]);
  if (__getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(b)) {
      if (__propIsEnum$9.call(b, prop))
        __defNormalProp$9(a, prop, b[prop]);
    }
  return a;
};
const BULMA_KNOWN_RATIO = [
  "square",
  "1by1",
  "5by4",
  "4by3",
  "3by2",
  "5by3",
  "16by9",
  "b2y1",
  "3by1",
  "4by5",
  "3by4",
  "2by3",
  "3by5",
  "9by16",
  "1by2",
  "1by3"
];
function isBulmaKnownRatio(value) {
  return BULMA_KNOWN_RATIO.indexOf(value) !== -1;
}
var _sfc_main$J = defineComponent({
  name: "BImage",
  props: {
    src: String,
    alt: String,
    srcFallback: String,
    webpFallback: {
      type: String,
      default: () => {
        return config.defaultImageWebpFallback;
      }
    },
    lazy: {
      type: Boolean,
      default: () => {
        return config.defaultImageLazy;
      }
    },
    responsive: {
      type: Boolean,
      default: () => {
        return config.defaultImageResponsive;
      }
    },
    ratio: {
      type: String,
      default: () => {
        return config.defaultImageRatio;
      }
    },
    placeholder: String,
    srcset: String,
    srcsetSizes: Array,
    srcsetFormatter: {
      type: Function,
      default: (src, size, vm) => {
        if (typeof config.defaultImageSrcsetFormatter === "function") {
          return config.defaultImageSrcsetFormatter(src, size);
        } else {
          return vm.formatSrcset(src, size);
        }
      }
    },
    rounded: {
      type: Boolean,
      default: false
    },
    captionFirst: {
      type: Boolean,
      default: false
    },
    customClass: String
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    load: (event, src) => true,
    error: (event, src) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      clientWidth: 0,
      webpSupportVerified: false,
      webpSupported: false,
      useNativeLazy: false,
      observer: null,
      inViewPort: false,
      loaded: false,
      failed: false
    };
  },
  computed: {
    ratioPattern() {
      return /([0-9]+)by([0-9]+)/;
    },
    hasRatio() {
      return this.ratio != null && this.ratioPattern.test(this.ratio);
    },
    figureClasses() {
      const classes = { image: this.responsive };
      if (this.hasRatio && isBulmaKnownRatio(this.ratio)) {
        classes[`is-${this.ratio}`] = true;
      }
      return classes;
    },
    figureStyles() {
      if (this.hasRatio && !isBulmaKnownRatio(this.ratio)) {
        const ratioValues = this.ratioPattern.exec(this.ratio);
        return {
          paddingTop: `${+ratioValues[2] / +ratioValues[1] * 100}%`
        };
      }
      return void 0;
    },
    imgClasses() {
      return __spreadValues$9({
        "is-rounded": this.rounded,
        "has-ratio": this.hasRatio
      }, this.customClass ? { [this.customClass]: !!this.customClass } : {});
    },
    srcExt() {
      return this.getExt(this.src);
    },
    isWepb() {
      return this.srcExt === "webp";
    },
    computedSrc() {
      let src = this.src;
      if (this.failed && this.srcFallback) {
        src = this.srcFallback;
      }
      if (!this.webpSupported && this.isWepb && this.webpFallback) {
        if (this.webpFallback.startsWith(".")) {
          return src.replace(/\.webp/gi, `${this.webpFallback}`);
        }
        return this.webpFallback;
      }
      return src;
    },
    computedWidth() {
      if (this.responsive && this.clientWidth > 0) {
        return this.clientWidth;
      }
      return void 0;
    },
    computedNativeLazy() {
      if (this.lazy && this.useNativeLazy) {
        return "lazy";
      }
      return void 0;
    },
    isDisplayed() {
      return (this.webpSupportVerified || !this.isWepb) && (!this.lazy || this.useNativeLazy || this.inViewPort);
    },
    placeholderExt() {
      if (this.placeholder) {
        return this.getExt(this.placeholder);
      }
      return void 0;
    },
    isPlaceholderWepb() {
      if (this.placeholder) {
        return this.placeholderExt === "webp";
      }
      return false;
    },
    computedPlaceholder() {
      if (!this.webpSupported && this.isPlaceholderWepb && this.webpFallback && this.webpFallback.startsWith(".")) {
        return this.placeholder.replace(/\.webp/gi, `${this.webpFallback}`);
      }
      return this.placeholder;
    },
    isPlaceholderDisplayed() {
      return !this.loaded && (this.$slots.placeholder || this.placeholder && (this.webpSupportVerified || !this.isPlaceholderWepb));
    },
    computedSrcset() {
      if (this.srcset) {
        if (!this.webpSupported && this.isWepb && this.webpFallback && this.webpFallback.startsWith(".")) {
          return this.srcset.replace(/\.webp/gi, `${this.webpFallback}`);
        }
        return this.srcset;
      }
      if (this.srcsetSizes && Array.isArray(this.srcsetSizes) && this.srcsetSizes.length > 0) {
        return this.srcsetSizes.map((size) => {
          return `${this.srcsetFormatter(this.computedSrc, size, this)} ${size}w`;
        }).join(",");
      }
      return void 0;
    },
    computedSizes() {
      if (this.computedSrcset && this.computedWidth) {
        return `${this.computedWidth}px`;
      }
      return void 0;
    },
    isCaptionFirst() {
      return this.$slots.caption && this.captionFirst;
    },
    isCaptionLast() {
      return this.$slots.caption && !this.captionFirst;
    }
  },
  methods: {
    getExt(filename, clean = true) {
      if (filename) {
        const noParam = clean ? filename.split("?")[0] : filename;
        return noParam.split(".").pop();
      }
      return "";
    },
    setWidth() {
      this.clientWidth = this.$el.clientWidth;
    },
    formatSrcset(src, size) {
      const ext = this.getExt(src, false);
      const name = src.split(".").slice(0, -1).join(".");
      return `${name}-${size}.${ext}`;
    },
    onLoad(event) {
      this.loaded = true;
      this.emitSrc(event, (src) => this.$emit("load", event, src));
    },
    onError(event) {
      this.emitSrc(event, (src) => this.$emit("error", event, src));
      if (!this.failed) {
        this.failed = true;
      }
    },
    emitSrc(event, emit) {
      const target = event.target;
      emit(target.currentSrc || target.src || this.computedSrc);
    }
  },
  created() {
    if (this.isWepb) {
      isWebpSupported().then((supported) => {
        this.webpSupportVerified = true;
        this.webpSupported = supported;
      });
    }
    if (this.lazy) {
      const nativeLazySupported = typeof window !== "undefined" && "HTMLImageElement" in window && "loading" in HTMLImageElement.prototype;
      const intersectionObserverSupported = typeof window !== "undefined" && "IntersectionObserver" in window;
      if (!nativeLazySupported && intersectionObserverSupported) {
        this.observer = new IntersectionObserver((events) => {
          const { target, isIntersecting } = events[0];
          if (isIntersecting && !this.inViewPort) {
            this.inViewPort = true;
            this.observer.unobserve(target);
          }
        });
      } else {
        this.useNativeLazy = true;
      }
    }
  },
  mounted() {
    if (this.lazy && this.observer) {
      this.observer.observe(this.$el);
    }
    this.setWidth();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.setWidth);
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.setWidth);
    }
  }
});

const _hoisted_1$N = { key: 0 };
const _hoisted_2$E = ["srcset", "src", "alt", "width", "sizes", "loading"];
const _hoisted_3$q = ["src", "alt"];
const _hoisted_4$j = { key: 1 };
function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "figure",
    {
      class: normalizeClass(["b-image-wrapper", _ctx.figureClasses]),
      style: normalizeStyle(_ctx.figureStyles)
    },
    [
      _ctx.isCaptionFirst ? (openBlock(), createElementBlock("figcaption", _hoisted_1$N, [
        renderSlot(_ctx.$slots, "caption")
      ])) : createCommentVNode("v-if", true),
      createVNode(Transition, { name: "fade" }, {
        default: withCtx(() => [
          _ctx.isDisplayed ? (openBlock(), createElementBlock("img", {
            key: 0,
            srcset: _ctx.computedSrcset,
            src: _ctx.computedSrc,
            alt: _ctx.alt,
            class: normalizeClass(_ctx.imgClasses),
            width: _ctx.computedWidth,
            sizes: _ctx.computedSizes,
            loading: _ctx.computedNativeLazy,
            onLoad: _cache[0] || (_cache[0] = (...args) => _ctx.onLoad && _ctx.onLoad(...args)),
            onError: _cache[1] || (_cache[1] = (...args) => _ctx.onError && _ctx.onError(...args))
          }, null, 42, _hoisted_2$E)) : createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(Transition, { name: "fade" }, {
        default: withCtx(() => [
          _ctx.isPlaceholderDisplayed ? renderSlot(_ctx.$slots, "placeholder", { key: 0 }, () => [
            createElementVNode("img", {
              src: _ctx.computedPlaceholder,
              alt: _ctx.alt,
              class: normalizeClass([_ctx.imgClasses, "placeholder"])
            }, null, 10, _hoisted_3$q)
          ]) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }),
      _ctx.isCaptionLast ? (openBlock(), createElementBlock("figcaption", _hoisted_4$j, [
        renderSlot(_ctx.$slots, "caption")
      ])) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
var Image$1 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$T]]);

var __defProp$8 = Object.defineProperty;
var __getOwnPropSymbols$8 = Object.getOwnPropertySymbols;
var __hasOwnProp$8 = Object.prototype.hasOwnProperty;
var __propIsEnum$8 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$8 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$8.call(b, prop))
      __defNormalProp$8(a, prop, b[prop]);
  if (__getOwnPropSymbols$8)
    for (var prop of __getOwnPropSymbols$8(b)) {
      if (__propIsEnum$8.call(b, prop))
        __defNormalProp$8(a, prop, b[prop]);
    }
  return a;
};
var _sfc_main$I = defineComponent({
  name: "BCarouselList",
  components: {
    BIcon,
    BImage: Image$1
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Number,
      default: 0
    },
    scrollValue: {
      type: Number,
      default: 0
    },
    hasDrag: {
      type: Boolean,
      default: true
    },
    hasGrayscale: Boolean,
    hasOpacity: Boolean,
    repeat: Boolean,
    itemsToShow: {
      type: Number,
      default: 4
    },
    itemsToList: {
      type: Number,
      default: 1
    },
    asIndicator: Boolean,
    arrow: {
      type: Boolean,
      default: true
    },
    arrowHover: {
      type: Boolean,
      default: true
    },
    iconPack: String,
    iconSize: String,
    iconPrev: {
      type: String,
      default: () => {
        return config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: () => {
        return config.defaultIconNext;
      }
    },
    breakpoints: {
      type: Object,
      default: () => ({})
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    switch: (_value) => true,
    "update:modelValue": (_value) => true,
    "updated:scroll": (_index) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      activeItem: this.modelValue,
      scrollIndex: this.asIndicator ? this.scrollValue : this.modelValue,
      delta: 0,
      dragX: false,
      hold: 0,
      windowWidth: 0,
      touch: false,
      observer: null,
      refresh_: 0
    };
  },
  computed: {
    dragging() {
      return this.dragX !== false;
    },
    listClass() {
      return [
        {
          "has-grayscale": this.settings.hasGrayscale,
          "has-opacity": this.settings.hasOpacity,
          "is-dragging": this.dragging
        }
      ];
    },
    itemStyle() {
      return `width: ${this.itemWidth}px;`;
    },
    translation() {
      return -bound(
        this.delta + this.scrollIndex * this.itemWidth,
        0,
        (this.data.length - this.settings.itemsToShow) * this.itemWidth
      );
    },
    total() {
      return this.data.length - this.settings.itemsToShow;
    },
    hasPrev() {
      return this.settings.repeat || this.scrollIndex > 0;
    },
    hasNext() {
      return this.settings.repeat || this.scrollIndex < this.total;
    },
    breakpointKeys() {
      return Object.keys(this.breakpoints).sort((a, b) => +b - +a);
    },
    settings() {
      const breakpoint = this.breakpointKeys.filter((breakpoint2) => {
        if (this.windowWidth >= +breakpoint2) {
          return true;
        } else {
          return false;
        }
      })[0];
      if (breakpoint) {
        return __spreadValues$8(__spreadValues$8({}, this.$props), this.breakpoints[+breakpoint]);
      }
      return this.$props;
    },
    itemWidth() {
      if (this.windowWidth) {
        this.refresh_;
        const rect = this.$el.getBoundingClientRect();
        return rect.width / this.settings.itemsToShow;
      }
      return 0;
    }
  },
  watch: {
    /*
     * When v-model is changed set the new active item.
     */
    modelValue(value) {
      this.switchTo(this.asIndicator ? value - (this.itemsToShow - 3) / 2 : value);
      if (this.activeItem !== value) {
        this.activeItem = bound(value, 0, this.data.length - 1);
      }
    },
    scrollValue(value) {
      this.switchTo(value);
    }
  },
  methods: {
    resized() {
      this.windowWidth = window.innerWidth;
    },
    switchTo(newIndex) {
      if (newIndex === this.scrollIndex || isNaN(newIndex)) {
        return;
      }
      if (this.settings.repeat) {
        newIndex = mod(newIndex, this.total + 1);
      }
      newIndex = bound(newIndex, 0, this.total);
      this.scrollIndex = newIndex;
      if (!this.asIndicator && this.modelValue !== newIndex) {
        this.$emit("update:modelValue", newIndex);
      } else if (this.scrollIndex !== newIndex) {
        this.$emit("updated:scroll", newIndex);
      }
    },
    next() {
      this.switchTo(this.scrollIndex + this.settings.itemsToList);
    },
    prev() {
      this.switchTo(this.scrollIndex - this.settings.itemsToList);
    },
    checkAsIndicator(value, event) {
      if (!this.asIndicator) return;
      const dragEndX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
      if (this.hold - Date.now() > 2e3 || Math.abs(+this.dragX - dragEndX) > 10) return;
      this.dragX = false;
      this.hold = 0;
      event.preventDefault();
      this.activeItem = value;
      this.$emit("switch", value);
    },
    // handle drag event
    dragStart(event) {
      if (this.dragging || !this.settings.hasDrag || event.button !== 0 && event.type !== "touchstart") return;
      this.hold = Date.now();
      this.touch = !!event.touches;
      this.dragX = this.touch ? event.touches[0].clientX : event.clientX;
      window.addEventListener(this.touch ? "touchmove" : "mousemove", this.dragMove);
      window.addEventListener(this.touch ? "touchend" : "mouseup", this.dragEnd);
    },
    dragMove(event) {
      if (!this.dragging) return;
      const dragEndX = event.touches ? (event.changedTouches[0] || event.touches[0]).clientX : event.clientX;
      this.delta = +this.dragX - dragEndX;
      if (!event.touches) {
        event.preventDefault();
      }
    },
    dragEnd() {
      if (!this.dragging && !this.hold) return;
      if (this.hold) {
        const signCheck = sign(this.delta);
        const results = Math.round(Math.abs(this.delta / this.itemWidth) + 0.15);
        this.switchTo(this.scrollIndex + signCheck * results);
      }
      this.delta = 0;
      this.dragX = false;
      window.removeEventListener(this.touch ? "touchmove" : "mousemove", this.dragMove);
      window.removeEventListener(this.touch ? "touchend" : "mouseup", this.dragEnd);
    },
    refresh() {
      this.$nextTick(() => {
        this.refresh_++;
      });
    }
  },
  mounted() {
    if (typeof window !== "undefined") {
      if (window.ResizeObserver) {
        this.observer = new ResizeObserver(this.refresh);
        this.observer.observe(this.$el);
      }
      window.addEventListener("resize", this.resized);
      document.addEventListener("animationend", this.refresh);
      document.addEventListener("transitionend", this.refresh);
      document.addEventListener("transitionstart", this.refresh);
      this.resized();
    }
    if (this.$attrs.config) {
      throw new Error("The config prop was removed, you need to use v-bind instead");
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      if (window.ResizeObserver) {
        this.observer.disconnect();
      }
      window.removeEventListener("resize", this.resized);
      document.removeEventListener("animationend", this.refresh);
      document.removeEventListener("transitionend", this.refresh);
      document.removeEventListener("transitionstart", this.refresh);
      this.dragEnd();
    }
  }
});

const _hoisted_1$M = ["onMouseup", "onTouchend"];
function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_image = resolveComponent("b-image");
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["carousel-list", { "has-shadow": _ctx.scrollIndex > 0 }]),
      onMousedown: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.dragStart && _ctx.dragStart(...args), ["prevent"])),
      onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx.dragStart && _ctx.dragStart(...args))
    },
    [
      createElementVNode(
        "div",
        {
          class: normalizeClass(["carousel-slides", _ctx.listClass]),
          style: normalizeStyle("transform:translateX(" + _ctx.translation + "px)")
        },
        [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.data, (list, index) => {
              return openBlock(), createElementBlock("div", {
                class: normalizeClass(["carousel-slide", { "is-active": _ctx.asIndicator ? _ctx.activeItem === index : _ctx.scrollIndex === index }]),
                onMouseup: ($event) => _ctx.checkAsIndicator(index, $event),
                onTouchend: ($event) => _ctx.checkAsIndicator(index, $event),
                key: index,
                style: normalizeStyle(_ctx.itemStyle)
              }, [
                renderSlot(_ctx.$slots, "item", mergeProps({
                  index,
                  active: _ctx.activeItem,
                  scroll: _ctx.scrollIndex
                }, list, { list }), () => [
                  createVNode(_component_b_image, mergeProps({
                    src: list.image
                  }, list), null, 16, ["src"])
                ])
              ], 46, _hoisted_1$M);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        6
        /* CLASS, STYLE */
      ),
      _ctx.arrow ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(["carousel-arrow", { "is-hovered": _ctx.settings.arrowHover }])
        },
        [
          withDirectives(createVNode(_component_b_icon, {
            class: "has-icons-left",
            onClick: withModifiers(_ctx.prev, ["prevent"]),
            pack: _ctx.settings.iconPack,
            icon: _ctx.settings.iconPrev,
            size: _ctx.settings.iconSize,
            both: ""
          }, null, 8, ["onClick", "pack", "icon", "size"]), [
            [vShow, _ctx.hasPrev]
          ]),
          withDirectives(createVNode(_component_b_icon, {
            class: "has-icons-right",
            onClick: withModifiers(_ctx.next, ["prevent"]),
            pack: _ctx.settings.iconPack,
            icon: _ctx.settings.iconNext,
            size: _ctx.settings.iconSize,
            both: ""
          }, null, 8, ["onClick", "pack", "icon", "size"]), [
            [vShow, _ctx.hasNext]
          ])
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
var CarouselList = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$S]]);

const Plugin$C = {
  install(Vue) {
    registerComponent(Vue, Carousel);
    registerComponent(Vue, CarouselItem);
    registerComponent(Vue, CarouselList);
  }
};

var CheckRadioMixin = defineComponent({
  props: {
    modelValue: [String, Number, Boolean, Function, Object, Array],
    nativeValue: [String, Number, Boolean, Function, Object, Array],
    type: String,
    disabled: Boolean,
    required: Boolean,
    name: String,
    size: String
  },
  emits: {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    "update:modelValue": (value) => true
  },
  data() {
    return {
      newValue: this.modelValue
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(value) {
        this.newValue = value;
        this.$emit("update:modelValue", value);
      }
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    },
    requiredOrUndefined() {
      return this.required || void 0;
    }
  },
  watch: {
    /*
    * When v-model change, set internal value.
    */
    modelValue(value) {
      this.newValue = value;
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    }
  }
});

var _sfc_main$H = defineComponent({
  name: "BCheckbox",
  mixins: [CheckRadioMixin],
  props: {
    indeterminate: Boolean,
    ariaLabelledby: String,
    trueValue: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: false
    },
    autocomplete: {
      type: String,
      default: "on"
    },
    inputId: {
      type: String,
      default: ""
    }
  }
});

const _hoisted_1$L = ["disabled"];
const _hoisted_2$D = ["id", ".indeterminate", "autocomplete", "disabled", "required", "name", "value", "true-value", "false-value", "aria-labelledby"];
const _hoisted_3$p = ["id"];
function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["b-checkbox checkbox", [_ctx.size, { "is-disabled": _ctx.disabled }]]),
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
    onKeydown: [
      _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"])),
      _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["space"]))
    ]
  }, [
    createCommentVNode(" Checkbox needs to listen for a space event instead of a just a\n             click and enter event so that that using the keyboard spacebar will also\n             trigger the checkbox change in the b-table "),
    withDirectives(createElementVNode("input", {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
      id: _ctx.inputId,
      ".indeterminate": _ctx.indeterminate,
      type: "checkbox",
      ref: "input",
      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
      }, ["stop"])),
      autocomplete: _ctx.autocomplete,
      disabled: _ctx.disabledOrUndefined,
      required: _ctx.requiredOrUndefined,
      name: _ctx.name,
      value: _ctx.nativeValue,
      "true-value": _ctx.trueValue,
      "false-value": _ctx.falseValue,
      "aria-labelledby": _ctx.ariaLabelledby
    }, null, 40, _hoisted_2$D), [
      [vModelCheckbox, _ctx.computedValue]
    ]),
    createElementVNode(
      "span",
      {
        class: normalizeClass(["check", _ctx.type])
      },
      null,
      2
      /* CLASS */
    ),
    createElementVNode("span", {
      id: _ctx.ariaLabelledby,
      class: "control-label"
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 8, _hoisted_3$p)
  ], 42, _hoisted_1$L);
}
var BCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$R]]);

var _sfc_main$G = defineComponent({
  name: "BCheckboxButton",
  mixins: [CheckRadioMixin],
  props: {
    type: {
      type: String,
      default: "is-primary"
    },
    expanded: Boolean
  },
  data() {
    return {
      isFocused: false
    };
  },
  computed: {
    checked() {
      if (Array.isArray(this.newValue)) {
        return this.newValue.indexOf(this.nativeValue) >= 0;
      }
      return this.newValue === this.nativeValue;
    }
  }
});

const _hoisted_1$K = ["disabled"];
const _hoisted_2$C = ["disabled", "required", "name", "value"];
function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["control", { "is-expanded": _ctx.expanded }])
    },
    [
      createElementVNode("label", {
        class: normalizeClass(["b-checkbox checkbox button", [_ctx.checked ? _ctx.type : null, _ctx.size, {
          "is-disabled": _ctx.disabled,
          "is-focused": _ctx.isFocused
        }]]),
        ref: "label",
        disabled: _ctx.disabledOrUndefined,
        onClick: _cache[4] || (_cache[4] = (...args) => _ctx.focus && _ctx.focus(...args)),
        onKeydown: _cache[5] || (_cache[5] = withKeys(withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
      }, [
        renderSlot(_ctx.$slots, "default"),
        withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
          type: "checkbox",
          ref: "input",
          onClick: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["stop"])),
          disabled: _ctx.disabledOrUndefined,
          required: _ctx.requiredOrUndefined,
          name: _ctx.name,
          value: _ctx.nativeValue,
          onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.isFocused = true),
          onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.isFocused = false)
        }, null, 40, _hoisted_2$C), [
          [vModelCheckbox, _ctx.computedValue]
        ])
      ], 42, _hoisted_1$K)
    ],
    2
    /* CLASS */
  );
}
var CheckboxButton = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$Q]]);

const Plugin$B = {
  install(Vue) {
    registerComponent(Vue, BCheckbox);
    registerComponent(Vue, CheckboxButton);
  }
};

const COLLAPSE_POSITIONS = ["is-top", "is-bottom"];
var _sfc_main$F = defineComponent({
  name: "BCollapse",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    animation: {
      type: String,
      default: "fade"
    },
    ariaId: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "is-top",
      validator(value) {
        return COLLAPSE_POSITIONS.indexOf(value) > -1;
      }
    }
  },
  emits: {
    close: () => true,
    open: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (_value) => true
  },
  data() {
    return {
      isOpen: this.modelValue
    };
  },
  watch: {
    modelValue(value) {
      this.isOpen = value;
    }
  },
  methods: {
    /*
    * Toggle and emit events
    */
    toggle() {
      this.isOpen = !this.isOpen;
      this.$emit("update:modelValue", this.isOpen);
      this.isOpen ? this.$emit("open") : this.$emit("close");
    }
  },
  render() {
    const trigger = h(
      "div",
      {
        class: "collapse-trigger",
        onClick: this.toggle
      },
      this.$slots.trigger ? this.$slots.trigger({ open: this.isOpen }) : void 0
    );
    const content = withDirectives(
      h(
        Transition,
        { name: this.animation },
        () => [
          h(
            "div",
            {
              class: "collapse-content",
              id: this.ariaId
            },
            this.$slots
          )
        ]
      ),
      [[vShow, this.isOpen]]
    );
    return h(
      "div",
      { class: "collapse" },
      this.position === "is-top" ? [trigger, content] : [content, trigger]
    );
  }
});

const Plugin$A = {
  install(Vue) {
    registerComponent(Vue, _sfc_main$F);
  }
};

const findFocusable = (element, programmatic = false) => {
  if (!element) {
    return null;
  }
  if (programmatic) {
    return element.querySelectorAll('*[tabindex="-1"]');
  }
  return element.querySelectorAll(`a[href]:not([tabindex="-1"]),
                                     area[href],
                                     input:not([disabled]),
                                     select:not([disabled]),
                                     textarea:not([disabled]),
                                     button:not([disabled]),
                                     iframe,
                                     object,
                                     embed,
                                     *[tabindex]:not([tabindex="-1"]),
                                     *[contenteditable]`);
};
let onKeyDown;
const beforeMount$1 = (el, { value = true }) => {
  if (value) {
    let focusable = findFocusable(el);
    let focusableProg = findFocusable(el, true);
    if (focusable && focusable.length > 0) {
      onKeyDown = (event) => {
        focusable = findFocusable(el);
        focusableProg = findFocusable(el, true);
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        if (event.target === firstFocusable && event.shiftKey && event.key === "Tab") {
          event.preventDefault();
          lastFocusable.focus();
        } else if ((event.target === lastFocusable || Array.from(focusableProg).indexOf(event.target) >= 0) && !event.shiftKey && event.key === "Tab") {
          event.preventDefault();
          firstFocusable.focus();
        }
      };
      el.addEventListener("keydown", onKeyDown);
    }
  }
};
const unmounted$1 = (el) => {
  el.removeEventListener("keydown", onKeyDown);
};
const directive$1 = {
  beforeMount: beforeMount$1,
  unmounted: unmounted$1
};

const DEFAULT_CLOSE_OPTIONS = ["escape", "outside"];
const DROPDOWN_INJECTION_KEY = Symbol("bdropdown");
var _sfc_main$E = defineComponent({
  name: "BDropdown",
  directives: {
    trapFocus: directive$1
  },
  provide() {
    return {
      [DROPDOWN_INJECTION_KEY]: this
    };
  },
  props: {
    modelValue: {
      type: [
        String,
        Number,
        Boolean,
        Object,
        Array,
        Function
      ],
      default: null
    },
    disabled: Boolean,
    inline: Boolean,
    scrollable: Boolean,
    maxHeight: {
      type: [String, Number],
      default: 200
    },
    position: {
      type: String,
      validator(value) {
        return [
          "is-top-right",
          "is-top-left",
          "is-bottom-left",
          "is-bottom-right"
        ].indexOf(value) > -1;
      }
    },
    triggers: {
      type: Array,
      default: () => ["click"]
    },
    mobileModal: {
      type: Boolean,
      default: () => {
        return config.defaultDropdownMobileModal;
      }
    },
    ariaRole: {
      type: String,
      validator(value) {
        return [
          "menu",
          "list",
          "dialog"
        ].indexOf(value) > -1;
      },
      default: null
    },
    animation: {
      type: String,
      default: "fade"
    },
    multiple: Boolean,
    trapFocus: {
      type: Boolean,
      default: () => {
        return config.defaultTrapFocus;
      }
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    canClose: {
      type: [Array, Boolean],
      default: true
    },
    expanded: Boolean,
    appendToBody: Boolean,
    appendToBodyCopyParent: Boolean,
    triggerTabindex: {
      type: Number,
      default: 0
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "active-change": (_isActive) => true,
    change: (_selected) => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      selected: this.modelValue,
      style: {},
      isActive: false,
      isHoverable: false,
      maybeTap: false,
      isTouchEnabled: false,
      _bodyEl: void 0,
      // Used to append to body
      timeOutID: void 0,
      timeOutID2: void 0
    };
  },
  computed: {
    rootClasses() {
      return [this.position, {
        "is-disabled": this.disabled,
        "is-hoverable": this.hoverable,
        "is-inline": this.inline,
        "is-active": this.isActive || this.inline,
        "is-mobile-modal": this.isMobileModal,
        "is-expanded": this.expanded,
        "is-touch-enabled": this.isTouchEnabled
      }];
    },
    isMobileModal() {
      return this.mobileModal && !this.inline;
    },
    cancelOptions() {
      return typeof this.canClose === "boolean" ? this.canClose ? DEFAULT_CLOSE_OPTIONS : [] : this.canClose;
    },
    contentStyle() {
      var _a;
      return {
        maxHeight: this.scrollable ? (_a = toCssWidth(this.maxHeight)) != null ? _a : void 0 : void 0,
        overflow: this.scrollable ? "auto" : void 0
      };
    },
    hoverable() {
      return this.triggers.indexOf("hover") >= 0;
    }
  },
  watch: {
    /*
    * When v-model is changed set the new selected item.
    */
    modelValue(value) {
      this.selected = value;
    },
    /*
    * Emit event when isActive value is changed.
    *
    * Also resets `isTouchEnabled` when it turns inactive.
    */
    isActive(value) {
      this.$emit("active-change", value);
      if (!value) {
        this.timeOutID = setTimeout(() => {
          if (!this.isActive) {
            this.isTouchEnabled = false;
          }
        }, 250);
      }
      this.handleScroll();
      if (this.appendToBody) {
        this.$nextTick(() => {
          this.updateAppendToBody();
        });
      }
    },
    isHoverable(value) {
      if (this.hoverable) {
        this.$emit("active-change", value);
      }
    }
  },
  methods: {
    handleScroll() {
      if (typeof window === "undefined") return;
      if (this.isMobileModal) {
        if (this.isActive) {
          document.documentElement.classList.add("is-clipped-touch");
        } else {
          document.documentElement.classList.remove("is-clipped-touch");
        }
      }
    },
    /*
     * Click listener from DropdownItem.
     *   1. Set new selected item.
     *   2. Emit input event to update the user v-model.
     *   3. Close the dropdown.
     */
    selectItem(value) {
      if (this.multiple) {
        if (this.selected) {
          const selected = this.selected;
          if (selected.indexOf(value) === -1) {
            this.selected = [...selected, value];
          } else {
            this.selected = selected.filter((val) => val !== value);
          }
        } else {
          this.selected = [value];
        }
        this.$emit("change", this.selected);
      } else {
        if (this.selected !== value) {
          this.selected = value;
          this.$emit("change", this.selected);
        }
      }
      this.$emit("update:modelValue", this.selected);
      if (!this.multiple) {
        this.isActive = !this.closeOnClick;
        if (this.hoverable && this.closeOnClick) {
          this.isHoverable = false;
        }
      }
    },
    /*
    * White-listed items to not close when clicked.
    */
    isInWhiteList(el) {
      if (el === this.$refs.dropdownMenu) return true;
      if (el === this.$refs.trigger) return true;
      if (this.$refs.dropdownMenu != null) {
        const children = this.$refs.dropdownMenu.querySelectorAll("*");
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }
      if (this.$refs.trigger != null) {
        const children = this.$refs.trigger.querySelectorAll("*");
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }
      return false;
    },
    /*
    * Close dropdown if clicked outside.
    */
    clickedOutside(event) {
      if (this.cancelOptions.indexOf("outside") < 0) return;
      if (this.inline) return;
      const target = isCustomElement(this) ? event.composedPath()[0] : event.target;
      if (!this.isInWhiteList(target)) this.isActive = false;
    },
    /*
     * Keypress event that is bound to the document
     */
    keyPress({ key }) {
      if (this.isActive && (key === "Escape" || key === "Esc")) {
        if (this.cancelOptions.indexOf("escape") < 0) return;
        this.isActive = false;
      }
    },
    onClick() {
      if (this.triggers.indexOf("hover") !== -1) return;
      if (this.triggers.indexOf("click") < 0) return;
      this.toggle();
    },
    onContextMenu() {
      if (this.triggers.indexOf("contextmenu") < 0) return;
      this.toggle();
    },
    onHover() {
      if (this.triggers.indexOf("hover") < 0) return;
      if (this.isTouchEnabled) return;
      this.isHoverable = true;
    },
    // takes care of touch-enabled devices
    // - does nothing if hover trigger is disabled
    // - suppresses hover trigger by setting isTouchEnabled
    // - handles only a tap; i.e., touchstart on the trigger immediately
    //   folowed by touchend
    onTouchStart() {
      this.maybeTap = true;
    },
    onTouchMove() {
      this.maybeTap = false;
    },
    onTouchEnd(e) {
      if (this.triggers.indexOf("hover") === -1) return;
      if (!this.maybeTap) return;
      e.preventDefault();
      this.maybeTap = false;
      this.isTouchEnabled = true;
      this.toggle();
    },
    onFocus() {
      if (this.triggers.indexOf("focus") < 0) return;
      this.toggle();
    },
    /*
    * Toggle dropdown if it's not disabled.
    */
    toggle() {
      if (this.disabled) return;
      if (!this.isActive) {
        this.timeOutID2 = setTimeout(() => {
          const value = !this.isActive;
          this.isActive = value;
        });
      } else {
        this.isActive = !this.isActive;
      }
    },
    updateAppendToBody() {
      const dropdown = this.$refs.dropdown;
      const dropdownMenu = this.$refs.dropdownMenu;
      const trigger = this.$refs.trigger;
      if (dropdownMenu && trigger) {
        const dropdownWrapper = this.$data._bodyEl.children[0];
        dropdownWrapper.classList.forEach((item) => dropdownWrapper.classList.remove(item));
        dropdownWrapper.classList.add("dropdown");
        dropdownWrapper.classList.add("dropdown-menu-animation");
        this.rootClasses.forEach((item) => {
          if (item && typeof item === "object") {
            for (const key in item) {
              if (item[key]) {
                dropdownWrapper.classList.add(key);
              }
            }
          }
        });
        if (this.appendToBodyCopyParent) {
          const parentNode = this.$refs.dropdown.parentNode;
          const parent = this.$data._bodyEl;
          parent.classList.forEach((item) => parent.classList.remove(item));
          parentNode.classList.forEach((item) => {
            parent.classList.add(item);
          });
        }
        const rect = trigger.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        let left = rect.left + window.scrollX;
        if (!this.position || this.position.indexOf("bottom") >= 0) {
          top += trigger.clientHeight;
        } else {
          top -= dropdownMenu.clientHeight;
        }
        if (this.position && this.position.indexOf("left") >= 0) {
          left -= dropdownMenu.clientWidth - trigger.clientWidth;
        }
        this.style = {
          position: "absolute",
          top: `${top}px`,
          left: `${left}px`,
          zIndex: "99",
          width: this.expanded ? `${dropdown.offsetWidth}px` : void 0
        };
      }
    }
  },
  mounted() {
    if (this.appendToBody) {
      this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdownMenu);
      this.updateAppendToBody();
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
      document.removeEventListener("keyup", this.keyPress);
    }
    if (this.appendToBody) {
      removeElement(this.$data._bodyEl);
    }
    clearTimeout(this.timeOutID);
    clearTimeout(this.timeOutID2);
  }
});

const _hoisted_1$J = ["tabindex"];
const _hoisted_2$B = ["aria-hidden"];
const _hoisted_3$o = ["aria-hidden"];
const _hoisted_4$i = ["role", "aria-modal"];
function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["dropdown dropdown-menu-animation", _ctx.rootClasses]),
      ref: "dropdown",
      onMouseleave: _cache[7] || (_cache[7] = ($event) => _ctx.isHoverable = false)
    },
    [
      !_ctx.inline ? (openBlock(), createElementBlock("div", {
        key: 0,
        tabindex: _ctx.disabled ? void 0 : _ctx.triggerTabindex,
        ref: "trigger",
        class: "dropdown-trigger",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
        onContextmenu: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.onContextMenu && _ctx.onContextMenu(...args), ["prevent"])),
        onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.onHover && _ctx.onHover(...args)),
        onFocusCapture: _cache[3] || (_cache[3] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
        onTouchstart: _cache[4] || (_cache[4] = (...args) => _ctx.onTouchStart && _ctx.onTouchStart(...args)),
        onTouchmove: _cache[5] || (_cache[5] = (...args) => _ctx.onTouchMove && _ctx.onTouchMove(...args)),
        onTouchend: _cache[6] || (_cache[6] = (...args) => _ctx.onTouchEnd && _ctx.onTouchEnd(...args)),
        "aria-haspopup": "true"
      }, [
        renderSlot(_ctx.$slots, "trigger", { active: _ctx.isActive })
      ], 40, _hoisted_1$J)) : createCommentVNode("v-if", true),
      createVNode(Transition, { name: _ctx.animation }, {
        default: withCtx(() => [
          _ctx.isMobileModal ? withDirectives((openBlock(), createElementBlock("div", {
            key: 0,
            class: "background",
            "aria-hidden": !_ctx.isActive
          }, null, 8, _hoisted_2$B)), [
            [vShow, _ctx.isActive]
          ]) : createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["name"]),
      createVNode(Transition, {
        name: _ctx.animation,
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives((openBlock(), createElementBlock("div", {
            ref: "dropdownMenu",
            class: "dropdown-menu",
            style: normalizeStyle(_ctx.style),
            "aria-hidden": !_ctx.isActive
          }, [
            createElementVNode("div", {
              class: "dropdown-content",
              role: _ctx.ariaRole,
              "aria-modal": !_ctx.inline,
              style: normalizeStyle(_ctx.contentStyle)
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 12, _hoisted_4$i)
          ], 12, _hoisted_3$o)), [
            [vShow, !_ctx.disabled && (_ctx.isActive || _ctx.isHoverable) || _ctx.inline],
            [_directive_trap_focus, _ctx.trapFocus]
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"])
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
var BDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$P]]);

var _sfc_main$D = defineComponent({
  name: "BDropdownItem",
  inject: {
    parent: {
      from: DROPDOWN_INJECTION_KEY,
      default: void 0
    }
  },
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null
    },
    separator: Boolean,
    disabled: Boolean,
    custom: Boolean,
    focusable: {
      type: Boolean,
      default: true
    },
    paddingless: Boolean,
    hasLink: Boolean,
    ariaRole: {
      type: String,
      default: ""
    }
  },
  emits: {
    click: () => true
  },
  computed: {
    anchorClasses() {
      return {
        "is-disabled": this.parent.disabled || this.disabled,
        "is-paddingless": this.paddingless,
        "is-active": this.isActive
      };
    },
    itemClasses() {
      return {
        "dropdown-item": !this.hasLink,
        "is-disabled": this.disabled,
        "is-paddingless": this.paddingless,
        "is-active": this.isActive,
        "has-link": this.hasLink
      };
    },
    ariaRoleItem() {
      return this.ariaRole === "menuitem" || this.ariaRole === "listitem" ? this.ariaRole : void 0;
    },
    isClickable() {
      return !this.parent.disabled && !this.separator && !this.disabled && !this.custom;
    },
    isActive() {
      if (this.parent.selected === null) return false;
      if (this.parent.multiple) {
        return this.parent.selected.indexOf(this.value) >= 0;
      }
      return this.value === this.parent.selected;
    },
    isFocusable() {
      return this.hasLink ? false : this.focusable;
    }
  },
  methods: {
    /*
    * Click listener, select the item.
    */
    selectItem() {
      if (!this.isClickable) return;
      this.parent.selectItem(this.value);
      this.$emit("click");
    }
  }
});

const _hoisted_1$I = {
  key: 0,
  class: "dropdown-divider"
};
const _hoisted_2$A = ["role", "tabindex"];
const _hoisted_3$n = ["role", "tabindex"];
function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.separator ? (openBlock(), createElementBlock("hr", _hoisted_1$I)) : !_ctx.custom && !_ctx.hasLink ? (openBlock(), createElementBlock("a", {
    key: 1,
    class: normalizeClass(["dropdown-item", _ctx.anchorClasses]),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.selectItem && _ctx.selectItem(...args)),
    role: _ctx.ariaRoleItem,
    tabindex: _ctx.isFocusable ? 0 : void 0
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_2$A)) : (openBlock(), createElementBlock("div", {
    key: 2,
    class: normalizeClass(_ctx.itemClasses),
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.selectItem && _ctx.selectItem(...args)),
    role: _ctx.ariaRoleItem,
    tabindex: _ctx.isFocusable ? 0 : void 0
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_3$n));
}
var BDropdownItem = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$O]]);

const Plugin$z = {
  install(Vue) {
    registerComponent(Vue, BDropdown);
    registerComponent(Vue, BDropdownItem);
  }
};

const Plugin$y = {
  install(Vue) {
    registerComponent(Vue, BInput);
  }
};

const AM$1 = "AM";
const PM$1 = "PM";
const HOUR_FORMAT_24 = "24";
const HOUR_FORMAT_12 = "12";
const defaultTimeFormatter = (date, vm) => {
  return vm.dtf.format(date);
};
const defaultTimeParser = (timeString, vm) => {
  if (timeString) {
    let d = null;
    if (vm.computedValue && !isNaN(vm.computedValue.valueOf())) {
      d = new Date(vm.computedValue);
    } else {
      d = vm.timeCreator();
      d.setMilliseconds(0);
    }
    if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === "function") {
      const formatRegex = vm.dtf.formatToParts(d).map((part) => {
        if (part.type === "literal") {
          return part.value.replace(/ /g, "\\s?");
        } else if (part.type === "dayPeriod") {
          return `((?!=<${part.type}>)(${vm.amString}|${vm.pmString}|${AM$1}|${PM$1}|${AM$1.toLowerCase()}|${PM$1.toLowerCase()})?)`;
        }
        return `((?!=<${part.type}>)\\d+)`;
      }).join("");
      const timeGroups = matchWithGroups(formatRegex, timeString);
      timeGroups.hour = timeGroups.hour ? parseInt(timeGroups.hour + "", 10) : null;
      timeGroups.minute = timeGroups.minute ? parseInt(timeGroups.minute + "", 10) : null;
      timeGroups.second = timeGroups.second ? parseInt(timeGroups.second + "", 10) : null;
      if (timeGroups.hour && timeGroups.hour >= 0 && timeGroups.hour < 24 && timeGroups.minute && timeGroups.minute >= 0 && timeGroups.minute < 59) {
        const dayPeriod = timeGroups.dayPeriod;
        if (dayPeriod && (dayPeriod.toLowerCase() === vm.pmString.toLowerCase() || dayPeriod.toLowerCase() === PM$1.toLowerCase()) && timeGroups.hour < 12) {
          timeGroups.hour += 12;
        }
        d.setHours(timeGroups.hour);
        d.setMinutes(timeGroups.minute);
        d.setSeconds(timeGroups.second || 0);
        return d;
      }
    }
    let am = false;
    if (vm.hourFormat === HOUR_FORMAT_12) {
      const dateString12 = timeString.split(" ");
      timeString = dateString12[0];
      am = dateString12[1] === vm.amString || dateString12[1] === AM$1;
    }
    const time = timeString.split(":");
    let hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);
    const seconds = vm.enableSeconds ? parseInt(time[2], 10) : 0;
    if (isNaN(hours) || hours < 0 || hours > 23 || vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12) || isNaN(minutes) || minutes < 0 || minutes > 59) {
      return null;
    }
    d.setSeconds(seconds);
    d.setMinutes(minutes);
    if (vm.hourFormat === HOUR_FORMAT_12) {
      if (am && hours === 12) {
        hours = 0;
      } else if (!am && hours !== 12) {
        hours += 12;
      }
    }
    d.setHours(hours);
    return new Date(d.getTime());
  }
  return null;
};
var TimepickerMixin = defineComponent({
  mixins: [CompatFallthroughMixin, FormElementMixin],
  props: {
    modelValue: [Date, null],
    inline: Boolean,
    minTime: [Date, null],
    maxTime: [Date, null],
    placeholder: String,
    editable: Boolean,
    disabled: Boolean,
    hourFormat: {
      type: String,
      validator: (value) => {
        return value === HOUR_FORMAT_24 || value === HOUR_FORMAT_12;
      }
    },
    incrementHours: {
      type: Number,
      default: 1
    },
    incrementMinutes: {
      type: Number,
      default: 1
    },
    incrementSeconds: {
      type: Number,
      default: 1
    },
    timeFormatter: {
      type: Function,
      default: (date, vm) => {
        if (typeof config.defaultTimeFormatter === "function") {
          return config.defaultTimeFormatter(date);
        } else {
          return defaultTimeFormatter(date, vm);
        }
      }
    },
    timeParser: {
      type: Function,
      default: (date, vm) => {
        if (typeof config.defaultTimeParser === "function") {
          return config.defaultTimeParser(date);
        } else {
          return defaultTimeParser(date, vm);
        }
      }
    },
    mobileNative: {
      type: Boolean,
      default: () => config.defaultTimepickerMobileNative
    },
    mobileModal: {
      type: Boolean,
      default: () => config.defaultTimepickerMobileModal
    },
    timeCreator: {
      type: Function,
      default: () => {
        if (typeof config.defaultTimeCreator === "function") {
          return config.defaultTimeCreator();
        } else {
          return /* @__PURE__ */ new Date();
        }
      }
    },
    position: String,
    unselectableTimes: Array,
    openOnFocus: Boolean,
    enableSeconds: Boolean,
    defaultMinutes: Number,
    defaultSeconds: Number,
    focusable: {
      type: Boolean,
      default: true
    },
    tzOffset: {
      type: Number,
      default: 0
    },
    appendToBody: Boolean,
    resetOnMeridianChange: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (_value) => true
  },
  data() {
    return {
      dateSelected: this.modelValue,
      hoursSelected: null,
      minutesSelected: null,
      secondsSelected: null,
      meridienSelected: null,
      _elementRef: "input",
      AM: AM$1,
      PM: PM$1,
      HOUR_FORMAT_24,
      HOUR_FORMAT_12
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.dateSelected;
      },
      set(value) {
        this.dateSelected = value;
        this.$emit("update:modelValue", this.dateSelected);
      }
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: "numeric",
        minute: "numeric",
        second: this.enableSeconds ? "numeric" : void 0
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: this.localeOptions.hour || "numeric",
        minute: this.localeOptions.minute || "numeric",
        second: this.enableSeconds ? this.localeOptions.second || "numeric" : void 0,
        // Fixes 12 hour display github.com/buefy/buefy/issues/3418
        hourCycle: !this.isHourFormat24 ? "h12" : "h23"
      });
    },
    newHourFormat() {
      return this.hourFormat || (this.localeOptions.hour12 ? HOUR_FORMAT_12 : HOUR_FORMAT_24);
    },
    sampleTime() {
      const d = this.timeCreator();
      d.setHours(10);
      d.setSeconds(0);
      d.setMinutes(0);
      d.setMilliseconds(0);
      return d;
    },
    hourLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        const d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "hour");
        if (literal) {
          return literal.value;
        }
      }
      return ":";
    },
    minuteLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        const d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "minute");
        if (literal) {
          return literal.value;
        }
      }
      return ":";
    },
    secondLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        const d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "second");
        if (literal) {
          return literal.value;
        }
      }
      return void 0;
    },
    amString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        const d = this.sampleTime;
        d.setHours(10);
        const dayPeriod = this.dtf.formatToParts(d).find((part) => part.type === "dayPeriod");
        if (dayPeriod) {
          return dayPeriod.value;
        }
      }
      return AM$1;
    },
    pmString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        const d = this.sampleTime;
        d.setHours(20);
        const dayPeriod = this.dtf.formatToParts(d).find((part) => part.type === "dayPeriod");
        if (dayPeriod) {
          return dayPeriod.value;
        }
      }
      return PM$1;
    },
    hours() {
      if (!this.incrementHours || this.incrementHours < 1) throw new Error("Hour increment cannot be null or less than 1.");
      const hours = [];
      const numberOfHours = this.isHourFormat24 ? 24 : 12;
      for (let i = 0; i < numberOfHours; i += this.incrementHours) {
        let value = i;
        let label = value;
        if (!this.isHourFormat24) {
          value = i + 1;
          label = value;
          if (this.meridienSelected === this.amString) {
            if (value === 12) {
              value = 0;
            }
          } else if (this.meridienSelected === this.pmString) {
            if (value !== 12) {
              value += 12;
            }
          }
        }
        hours.push({
          label: this.formatNumber(label),
          value
        });
      }
      return hours;
    },
    minutes() {
      if (!this.incrementMinutes || this.incrementMinutes < 1) throw new Error("Minute increment cannot be null or less than 1.");
      const minutes = [];
      for (let i = 0; i < 60; i += this.incrementMinutes) {
        minutes.push({
          label: this.formatNumber(i, true),
          value: i
        });
      }
      return minutes;
    },
    seconds() {
      if (!this.incrementSeconds || this.incrementSeconds < 1) throw new Error("Second increment cannot be null or less than 1.");
      const seconds = [];
      for (let i = 0; i < 60; i += this.incrementSeconds) {
        seconds.push({
          label: this.formatNumber(i, true),
          value: i
        });
      }
      return seconds;
    },
    meridiens() {
      return [this.amString, this.pmString];
    },
    isMobile() {
      return this.mobileNative && isMobile.any();
    },
    isHourFormat24() {
      return this.newHourFormat === HOUR_FORMAT_24;
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    hourFormat() {
      if (this.hoursSelected !== null) {
        this.meridienSelected = this.hoursSelected >= 12 ? this.pmString : this.amString;
      }
    },
    locale() {
      if (!this.modelValue) {
        this.meridienSelected = this.amString;
      }
    },
    /*
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue: {
      handler(value) {
        this.updateInternalState(value);
        !this.isValid && this.$refs.input.checkHtml5Validity();
      },
      immediate: true
    }
  },
  methods: {
    onMeridienChange(value) {
      if (this.hoursSelected !== null && this.resetOnMeridianChange) {
        this.hoursSelected = null;
        this.minutesSelected = null;
        this.secondsSelected = null;
        this.computedValue = null;
      } else if (this.hoursSelected !== null) {
        if (value === this.pmString) {
          this.hoursSelected += 12;
        } else if (value === this.amString) {
          this.hoursSelected -= 12;
        }
      }
      this.updateDateSelected(
        this.hoursSelected,
        this.minutesSelected,
        this.enableSeconds ? this.secondsSelected : 0,
        value
      );
    },
    onHoursChange(value) {
      if (!this.minutesSelected && typeof this.defaultMinutes !== "undefined") {
        this.minutesSelected = this.defaultMinutes;
      }
      if (!this.secondsSelected && typeof this.defaultSeconds !== "undefined") {
        this.secondsSelected = this.defaultSeconds;
      }
      this.updateDateSelected(
        parseInt(`${value}`, 10),
        this.minutesSelected,
        this.enableSeconds ? this.secondsSelected : 0,
        this.meridienSelected
      );
    },
    onMinutesChange(value) {
      if (!this.secondsSelected && this.defaultSeconds) {
        this.secondsSelected = this.defaultSeconds;
      }
      this.updateDateSelected(
        this.hoursSelected,
        parseInt(`${value}`, 10),
        this.enableSeconds ? this.secondsSelected : 0,
        this.meridienSelected
      );
    },
    onSecondsChange(value) {
      this.updateDateSelected(
        this.hoursSelected,
        this.minutesSelected,
        parseInt(`${value}`, 10),
        this.meridienSelected
      );
    },
    updateDateSelected(hours, minutes, seconds, meridiens) {
      if (hours != null && minutes != null && (!this.isHourFormat24 && meridiens !== null || this.isHourFormat24)) {
        let time = null;
        if (this.computedValue && !isNaN(this.computedValue.valueOf())) {
          time = new Date(this.computedValue);
        } else {
          time = this.timeCreator();
          time.setMilliseconds(0);
        }
        time.setHours(hours);
        time.setMinutes(minutes);
        time.setSeconds(seconds);
        if (!isNaN(time.getTime())) this.computedValue = new Date(time.getTime());
      }
    },
    updateInternalState(value) {
      if (value) {
        this.hoursSelected = value.getHours();
        this.minutesSelected = value.getMinutes();
        this.secondsSelected = value.getSeconds();
        this.meridienSelected = value.getHours() >= 12 ? this.pmString : this.amString;
      } else {
        this.hoursSelected = null;
        this.minutesSelected = null;
        this.secondsSelected = null;
        this.meridienSelected = this.amString;
      }
      this.dateSelected = value;
    },
    isHourDisabled(hour) {
      let disabled = false;
      if (this.minTime) {
        const minHours = this.minTime.getHours();
        const noMinutesAvailable = this.minutes.every((minute) => {
          return this.isMinuteDisabledForHour(hour, minute.value);
        });
        disabled = hour < minHours || noMinutesAvailable;
      }
      if (this.maxTime) {
        if (!disabled) {
          const maxHours = this.maxTime.getHours();
          disabled = hour > maxHours;
        }
      }
      if (this.unselectableTimes) {
        if (!disabled) {
          const unselectable = this.unselectableTimes.filter((time) => {
            if (this.enableSeconds && this.secondsSelected !== null) {
              return time.getHours() === hour && time.getMinutes() === this.minutesSelected && time.getSeconds() === this.secondsSelected;
            } else if (this.minutesSelected !== null) {
              return time.getHours() === hour && time.getMinutes() === this.minutesSelected;
            }
            return false;
          });
          if (unselectable.length > 0) {
            disabled = true;
          } else {
            disabled = this.minutes.every((minute) => {
              return this.unselectableTimes.filter((time) => {
                return time.getHours() === hour && time.getMinutes() === minute.value;
              }).length > 0;
            });
          }
        }
      }
      return disabled;
    },
    isMinuteDisabledForHour(hour, minute) {
      let disabled = false;
      if (this.minTime) {
        const minHours = this.minTime.getHours();
        const minMinutes = this.minTime.getMinutes();
        disabled = hour === minHours && minute < minMinutes;
      }
      if (this.maxTime) {
        if (!disabled) {
          const maxHours = this.maxTime.getHours();
          const maxMinutes = this.maxTime.getMinutes();
          disabled = hour === maxHours && minute > maxMinutes;
        }
      }
      return disabled;
    },
    isMinuteDisabled(minute) {
      let disabled = false;
      if (this.hoursSelected !== null) {
        if (this.isHourDisabled(this.hoursSelected)) {
          disabled = true;
        } else {
          disabled = this.isMinuteDisabledForHour(this.hoursSelected, minute);
        }
        if (this.unselectableTimes) {
          if (!disabled) {
            const unselectable = this.unselectableTimes.filter((time) => {
              if (this.enableSeconds && this.secondsSelected !== null) {
                return time.getHours() === this.hoursSelected && time.getMinutes() === minute && time.getSeconds() === this.secondsSelected;
              } else {
                return time.getHours() === this.hoursSelected && time.getMinutes() === minute;
              }
            });
            disabled = unselectable.length > 0;
          }
        }
      }
      return disabled;
    },
    isSecondDisabled(second) {
      let disabled = false;
      if (this.minutesSelected !== null) {
        if (this.isMinuteDisabled(this.minutesSelected)) {
          disabled = true;
        } else {
          if (this.minTime) {
            const minHours = this.minTime.getHours();
            const minMinutes = this.minTime.getMinutes();
            const minSeconds = this.minTime.getSeconds();
            disabled = this.hoursSelected === minHours && this.minutesSelected === minMinutes && second < minSeconds;
          }
          if (this.maxTime) {
            if (!disabled) {
              const maxHours = this.maxTime.getHours();
              const maxMinutes = this.maxTime.getMinutes();
              const maxSeconds = this.maxTime.getSeconds();
              disabled = this.hoursSelected === maxHours && this.minutesSelected === maxMinutes && second > maxSeconds;
            }
          }
        }
        if (this.unselectableTimes) {
          if (!disabled) {
            const unselectable = this.unselectableTimes.filter((time) => {
              return time.getHours() === this.hoursSelected && time.getMinutes() === this.minutesSelected && time.getSeconds() === second;
            });
            disabled = unselectable.length > 0;
          }
        }
      }
      return disabled;
    },
    /*
     * Parse string into date
     */
    onChange(value) {
      const date = this.timeParser(value, this);
      this.updateInternalState(date);
      if (date && !isNaN(date.valueOf())) {
        this.computedValue = date;
      } else {
        this.computedValue = null;
        this.$refs.input.newValue = this.computedValue;
      }
    },
    /*
     * Toggle timepicker
     */
    toggle(active) {
      if (this.$refs.dropdown) {
        this.$refs.dropdown.isActive = typeof active === "boolean" ? active : !this.$refs.dropdown.isActive;
      }
    },
    /*
     * Close timepicker
     */
    close() {
      this.toggle(false);
    },
    /*
     * Call default onFocus method and show timepicker
     */
    handleOnFocus() {
      this.onFocus();
      if (this.openOnFocus) {
        this.toggle(true);
      }
    },
    /*
     * Format date into string 'HH-MM-SS'
     */
    formatHHMMSS(value) {
      const date = new Date(value);
      if (value && !isNaN(date.valueOf())) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return this.formatNumber(hours, true) + ":" + this.formatNumber(minutes, true) + ":" + this.formatNumber(seconds, true);
      }
      return "";
    },
    /*
     * Parse time from string
     */
    onChangeNativePicker(event) {
      const date = event.target.value;
      if (date) {
        let time = null;
        if (this.computedValue && !isNaN(this.computedValue.valueOf())) {
          time = new Date(this.computedValue);
        } else {
          time = /* @__PURE__ */ new Date();
          time.setMilliseconds(0);
        }
        const t = date.split(":");
        time.setHours(parseInt(t[0], 10));
        time.setMinutes(parseInt(t[1], 10));
        time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
        this.computedValue = new Date(time.getTime());
      } else {
        this.computedValue = null;
      }
    },
    formatNumber(value, prependZero) {
      return this.isHourFormat24 || prependZero ? this.pad(value) : `${value}`;
    },
    pad(value) {
      return (value < 10 ? "0" : "") + value;
    },
    /*
     * Format date into string
     */
    formatValue(date) {
      if (date && !isNaN(date.valueOf())) {
        return this.timeFormatter(date, this);
      } else {
        return null;
      }
    },
    /*
     * Keypress event that is bound to the document.
     */
    keyPress({ key }) {
      if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === "Escape" || key === "Esc")) {
        this.toggle(false);
      }
    },
    /*
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange(value) {
      if (!value) {
        this.onBlur();
      }
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmounted() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  }
});

const indicatorSize = 40;
const paddingInner = 5;
var _sfc_main$C = defineComponent({
  name: "BClockpickerFace",
  props: {
    pickerSize: Number,
    min: Number,
    max: Number,
    double: Boolean,
    value: Number,
    faceNumbers: Array,
    disabledValues: Function
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    change: (_value) => true,
    input: (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      isDragging: false,
      inputValue: this.value,
      prevAngle: 720
    };
  },
  computed: {
    /*
    * How many number indicators are shown on the face
    */
    count() {
      return this.max - this.min + 1;
    },
    /*
    * How many number indicators are shown per ring on the face
    */
    countPerRing() {
      return this.double ? this.count / 2 : this.count;
    },
    /*
    * Radius of the clock face
    */
    radius() {
      return this.pickerSize / 2;
    },
    /*
    * Radius of the outer ring of number indicators
    */
    outerRadius() {
      return this.radius - paddingInner - indicatorSize / 2;
    },
    /*
    * Radius of the inner ring of number indicators
    */
    innerRadius() {
      return Math.max(
        this.outerRadius * 0.6,
        this.outerRadius - paddingInner - indicatorSize
      );
    },
    /*
    * The angle for each selectable value
    * For hours this ends up being 30 degrees, for minutes 6 degrees
    */
    degreesPerUnit() {
      return 360 / this.countPerRing;
    },
    /*
    * Used for calculating x/y grid location based on degrees
    */
    degrees() {
      return this.degreesPerUnit * Math.PI / 180;
    },
    /*
    * Calculates the angle the clock hand should be rotated for the
    * selected value
    */
    handRotateAngle() {
      let currentAngle = this.prevAngle;
      while (currentAngle < 0) currentAngle += 360;
      const targetAngle = this.calcHandAngle(this.displayedValue);
      const degreesDiff = this.shortestDistanceDegrees(currentAngle, targetAngle);
      const angle = this.prevAngle + degreesDiff;
      return angle;
    },
    /*
    * Determines how long the selector hand is based on if the
    * selected value is located along the outer or inner ring
    */
    handScale() {
      return this.calcHandScale(this.displayedValue);
    },
    handStyle() {
      return {
        transform: `rotate(${this.handRotateAngle}deg) scaleY(${this.handScale})`,
        transition: ".3s cubic-bezier(.25,.8,.50,1)"
      };
    },
    /*
    * The value the hand should be pointing at
    */
    displayedValue() {
      return this.inputValue == null ? this.min : this.inputValue;
    }
  },
  watch: {
    value(value) {
      if (value !== this.inputValue) {
        this.prevAngle = this.handRotateAngle;
      }
      this.inputValue = value;
    }
  },
  methods: {
    isDisabled(value) {
      return this.disabledValues && this.disabledValues(value);
    },
    /*
    * Calculates the distance between two points
    */
    euclidean(p0, p1) {
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      return Math.sqrt(dx * dx + dy * dy);
    },
    shortestDistanceDegrees(start, stop) {
      const modDiff = (stop - start) % 360;
      const shortestDistance = 180 - Math.abs(Math.abs(modDiff) - 180);
      return (modDiff + 360) % 360 < 180 ? shortestDistance * 1 : shortestDistance * -1;
    },
    /*
    * Calculates the angle of the line from the center point
    * to the given point.
    */
    coordToAngle(center, p1) {
      const value = 2 * Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x);
      return Math.abs(value * 180 / Math.PI);
    },
    /*
    * Generates the inline style translate() property for a
    * number indicator, which determines it's location on the
    * clock face
    */
    getNumberTranslate(value) {
      const { x, y } = this.getNumberCoords(value);
      return `translate(${x}px, ${y}px)`;
    },
    /*
    * Calculates the coordinates on the clock face for a number
    * indicator value
    */
    getNumberCoords(value) {
      const radius = this.isInnerRing(value) ? this.innerRadius : this.outerRadius;
      return {
        x: Math.round(radius * Math.sin((value - this.min) * this.degrees)),
        y: Math.round(-radius * Math.cos((value - this.min) * this.degrees))
      };
    },
    getFaceNumberClasses(num) {
      return {
        active: num.value === this.displayedValue,
        disabled: this.isDisabled(num.value)
      };
    },
    /*
    * Determines if a value resides on the inner ring
    */
    isInnerRing(value) {
      return this.double && value - this.min >= this.countPerRing;
    },
    calcHandAngle(value) {
      let angle = this.degreesPerUnit * (value - this.min);
      if (this.isInnerRing(value)) angle -= 360;
      return angle;
    },
    calcHandScale(value) {
      return this.isInnerRing(value) ? this.innerRadius / this.outerRadius : 1;
    },
    onMouseDown(e) {
      e.preventDefault();
      this.isDragging = true;
      this.onDragMove(e);
    },
    onMouseUp() {
      this.isDragging = false;
      if (!this.isDisabled(this.inputValue)) {
        this.$emit("change", this.inputValue);
      }
    },
    onDragMove(e) {
      e.preventDefault();
      if (!this.isDragging && e.type !== "click") return;
      const { width, top, left } = this.$refs.clock.getBoundingClientRect();
      const { clientX, clientY } = "touches" in e ? e.touches[0] : e;
      const center = { x: width / 2, y: -width / 2 };
      const coords = { x: clientX - left, y: top - clientY };
      const handAngle = Math.round(this.coordToAngle(center, coords) + 360) % 360;
      const insideClick = this.double && this.euclidean(center, coords) < (this.outerRadius + this.innerRadius) / 2 - 16;
      let value = Math.round(handAngle / this.degreesPerUnit) + this.min + (insideClick ? this.countPerRing : 0);
      if (handAngle >= 360 - this.degreesPerUnit / 2) {
        value = insideClick ? this.max : this.min;
      }
      this.update(value);
    },
    update(value) {
      if (this.inputValue !== value && !this.isDisabled(value)) {
        this.prevAngle = this.handRotateAngle;
        this.inputValue = value;
        this.$emit("input", value);
      }
    }
  }
});

const _hoisted_1$H = {
  class: "b-clockpicker-face-outer-ring",
  ref: "clock"
};
function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: "b-clockpicker-face",
      onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.onMouseDown && _ctx.onMouseDown(...args)),
      onMouseup: _cache[1] || (_cache[1] = (...args) => _ctx.onMouseUp && _ctx.onMouseUp(...args)),
      onMousemove: _cache[2] || (_cache[2] = (...args) => _ctx.onDragMove && _ctx.onDragMove(...args)),
      onTouchstart: _cache[3] || (_cache[3] = (...args) => _ctx.onMouseDown && _ctx.onMouseDown(...args)),
      onTouchend: _cache[4] || (_cache[4] = (...args) => _ctx.onMouseUp && _ctx.onMouseUp(...args)),
      onTouchmove: _cache[5] || (_cache[5] = (...args) => _ctx.onDragMove && _ctx.onDragMove(...args))
    },
    [
      createElementVNode(
        "div",
        _hoisted_1$H,
        [
          createElementVNode(
            "div",
            {
              class: "b-clockpicker-face-hand",
              style: normalizeStyle(_ctx.handStyle)
            },
            null,
            4
            /* STYLE */
          ),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.faceNumbers, (num, index) => {
              return openBlock(), createElementBlock(
                "span",
                {
                  key: index,
                  class: normalizeClass(["b-clockpicker-face-number", _ctx.getFaceNumberClasses(num)]),
                  style: normalizeStyle({ transform: _ctx.getNumberTranslate(num.value) })
                },
                [
                  createElementVNode(
                    "span",
                    null,
                    toDisplayString(num.label),
                    1
                    /* TEXT */
                  )
                ],
                6
                /* CLASS, STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        512
        /* NEED_PATCH */
      )
    ],
    32
    /* NEED_HYDRATION */
  );
}
var BClockpickerFace = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$N]]);

const outerPadding = 12;
var _sfc_main$B = defineComponent({
  name: "BClockpicker",
  components: {
    BClockpickerFace,
    BInput,
    BDropdown
  },
  mixins: [TimepickerMixin],
  props: {
    pickerSize: {
      type: Number,
      default: 290
    },
    incrementMinutes: {
      type: Number,
      default: 5
    },
    type: {
      type: String,
      default: "is-primary"
    },
    hoursLabel: {
      type: String,
      default: () => config.defaultClockpickerHoursLabel || "Hours"
    },
    minutesLabel: {
      type: String,
      default: () => config.defaultClockpickerMinutesLabel || "Min"
    }
  },
  data() {
    return {
      isSelectingHour: true,
      isDragging: false,
      _isClockpicker: true
    };
  },
  computed: {
    hoursDisplay() {
      if (this.hoursSelected == null) return "--";
      if (this.isHourFormat24) return this.pad(this.hoursSelected);
      let display = this.hoursSelected;
      if (this.meridienSelected === this.pmString) {
        display -= 12;
      }
      if (display === 0) display = 12;
      return display;
    },
    minutesDisplay() {
      return this.minutesSelected == null ? "--" : this.pad(this.minutesSelected);
    },
    minFaceValue() {
      return this.isSelectingHour && !this.isHourFormat24 && this.meridienSelected === this.pmString ? 12 : 0;
    },
    maxFaceValue() {
      return this.isSelectingHour ? !this.isHourFormat24 && this.meridienSelected === this.amString ? 11 : 23 : 59;
    },
    faceSize() {
      return this.pickerSize - outerPadding * 2;
    },
    faceDisabledValues() {
      return this.isSelectingHour ? this.isHourDisabled : this.isMinuteDisabled;
    }
  },
  methods: {
    onClockInput(value) {
      if (this.isSelectingHour) {
        this.hoursSelected = value;
        this.onHoursChange(value);
      } else {
        this.minutesSelected = value;
        this.onMinutesChange(value);
      }
    },
    onClockChange() {
      if (this.isSelectingHour) {
        this.isSelectingHour = !this.isSelectingHour;
      } else {
        this.toggle(false);
      }
    },
    /*
     * Toggle clockpicker
     */
    toggle(active) {
      if (this.$refs.dropdown) {
        const dropdown = this.$refs.dropdown;
        dropdown.isActive = active != null ? active : !dropdown.isActive;
        if (dropdown.isActive) {
          this.isSelectingHour = true;
        }
      }
    },
    onMeridienClick(value) {
      if (this.meridienSelected !== value) {
        this.meridienSelected = value;
        this.onMeridienChange(value);
      }
    },
    /*
     * Avoid dropdown toggle when is already visible
     */
    onInputClick(event) {
      if (this.$refs.dropdown.isActive) {
        event.stopPropagation();
      }
    }
  }
});

const _hoisted_1$G = ["disabled"];
const _hoisted_2$z = {
  key: 0,
  class: "card-header"
};
const _hoisted_3$m = { class: "b-clockpicker-header card-header-title" };
const _hoisted_4$h = { class: "b-clockpicker-time" };
const _hoisted_5$b = {
  key: 0,
  class: "b-clockpicker-period"
};
const _hoisted_6$9 = { class: "card-content" };
const _hoisted_7$8 = {
  key: 0,
  class: "b-clockpicker-time"
};
const _hoisted_8$7 = {
  key: 1,
  class: "b-clockpicker-period"
};
const _hoisted_9$5 = {
  key: 1,
  class: "b-clockpicker-footer card-footer"
};
function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = resolveComponent("b-input");
  const _component_b_clockpicker_face = resolveComponent("b-clockpicker-face");
  const _component_b_dropdown = resolveComponent("b-dropdown");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["b-clockpicker control", [_ctx.size, _ctx.type, { "is-expanded": _ctx.expanded }]]
    }, _ctx.rootAttrs),
    [
      !_ctx.isMobile || _ctx.inline ? (openBlock(), createBlock(_component_b_dropdown, {
        key: 0,
        ref: "dropdown",
        position: _ctx.position,
        disabled: _ctx.disabledOrUndefined,
        inline: _ctx.inline,
        "mobile-modal": _ctx.mobileModal,
        "append-to-body": _ctx.appendToBody,
        "append-to-body-copy-parent": "",
        onActiveChange: _ctx.onActiveChange
      }, createSlots({
        default: withCtx(() => [
          createElementVNode("div", {
            class: "card",
            disabled: _ctx.disabledOrUndefined,
            custom: ""
          }, [
            _ctx.inline ? (openBlock(), createElementBlock("header", _hoisted_2$z, [
              createElementVNode("div", _hoisted_3$m, [
                createElementVNode("div", _hoisted_4$h, [
                  createElementVNode(
                    "span",
                    {
                      class: normalizeClass(["b-clockpicker-btn", { active: _ctx.isSelectingHour }]),
                      onClick: _cache[3] || (_cache[3] = ($event) => _ctx.isSelectingHour = true)
                    },
                    toDisplayString(_ctx.hoursDisplay),
                    3
                    /* TEXT, CLASS */
                  ),
                  createElementVNode(
                    "span",
                    null,
                    toDisplayString(_ctx.hourLiteral),
                    1
                    /* TEXT */
                  ),
                  createElementVNode(
                    "span",
                    {
                      class: normalizeClass(["b-clockpicker-btn", { active: !_ctx.isSelectingHour }]),
                      onClick: _cache[4] || (_cache[4] = ($event) => _ctx.isSelectingHour = false)
                    },
                    toDisplayString(_ctx.minutesDisplay),
                    3
                    /* TEXT, CLASS */
                  )
                ]),
                !_ctx.isHourFormat24 ? (openBlock(), createElementBlock("div", _hoisted_5$b, [
                  createElementVNode(
                    "div",
                    {
                      class: normalizeClass(["b-clockpicker-btn", {
                        active: _ctx.meridienSelected === _ctx.amString || _ctx.meridienSelected === _ctx.AM
                      }]),
                      onClick: _cache[5] || (_cache[5] = ($event) => _ctx.onMeridienClick(_ctx.amString))
                    },
                    toDisplayString(_ctx.amString),
                    3
                    /* TEXT, CLASS */
                  ),
                  createElementVNode(
                    "div",
                    {
                      class: normalizeClass(["b-clockpicker-btn", {
                        active: _ctx.meridienSelected === _ctx.pmString || _ctx.meridienSelected === _ctx.PM
                      }]),
                      onClick: _cache[6] || (_cache[6] = ($event) => _ctx.onMeridienClick(_ctx.pmString))
                    },
                    toDisplayString(_ctx.pmString),
                    3
                    /* TEXT, CLASS */
                  )
                ])) : createCommentVNode("v-if", true)
              ])
            ])) : createCommentVNode("v-if", true),
            createElementVNode("div", _hoisted_6$9, [
              createElementVNode(
                "div",
                {
                  class: "b-clockpicker-body",
                  style: normalizeStyle({ width: _ctx.faceSize + "px", height: _ctx.faceSize + "px" })
                },
                [
                  !_ctx.inline ? (openBlock(), createElementBlock("div", _hoisted_7$8, [
                    createElementVNode(
                      "div",
                      {
                        class: normalizeClass(["b-clockpicker-btn", { active: _ctx.isSelectingHour }]),
                        onClick: _cache[7] || (_cache[7] = ($event) => _ctx.isSelectingHour = true)
                      },
                      toDisplayString(_ctx.hoursLabel),
                      3
                      /* TEXT, CLASS */
                    ),
                    createElementVNode(
                      "span",
                      {
                        class: normalizeClass(["b-clockpicker-btn", { active: !_ctx.isSelectingHour }]),
                        onClick: _cache[8] || (_cache[8] = ($event) => _ctx.isSelectingHour = false)
                      },
                      toDisplayString(_ctx.minutesLabel),
                      3
                      /* TEXT, CLASS */
                    )
                  ])) : createCommentVNode("v-if", true),
                  !_ctx.isHourFormat24 && !_ctx.inline ? (openBlock(), createElementBlock("div", _hoisted_8$7, [
                    createElementVNode(
                      "div",
                      {
                        class: normalizeClass(["b-clockpicker-btn", {
                          active: _ctx.meridienSelected === _ctx.amString || _ctx.meridienSelected === _ctx.AM
                        }]),
                        onClick: _cache[9] || (_cache[9] = ($event) => _ctx.onMeridienClick(_ctx.amString))
                      },
                      toDisplayString(_ctx.amString),
                      3
                      /* TEXT, CLASS */
                    ),
                    createElementVNode(
                      "div",
                      {
                        class: normalizeClass(["b-clockpicker-btn", {
                          active: _ctx.meridienSelected === _ctx.pmString || _ctx.meridienSelected === _ctx.PM
                        }]),
                        onClick: _cache[10] || (_cache[10] = ($event) => _ctx.onMeridienClick(_ctx.pmString))
                      },
                      toDisplayString(_ctx.pmString),
                      3
                      /* TEXT, CLASS */
                    )
                  ])) : createCommentVNode("v-if", true),
                  createVNode(_component_b_clockpicker_face, {
                    ref: "clockpickerFace",
                    "picker-size": _ctx.faceSize,
                    min: _ctx.minFaceValue,
                    max: _ctx.maxFaceValue,
                    "face-numbers": _ctx.isSelectingHour ? _ctx.hours : _ctx.minutes,
                    "disabled-values": _ctx.faceDisabledValues,
                    double: _ctx.isSelectingHour && _ctx.isHourFormat24,
                    value: _ctx.isSelectingHour ? _ctx.hoursSelected ?? void 0 : _ctx.minutesSelected ?? void 0,
                    onInput: _ctx.onClockInput,
                    onChange: _ctx.onClockChange
                  }, null, 8, ["picker-size", "min", "max", "face-numbers", "disabled-values", "double", "value", "onInput", "onChange"])
                ],
                4
                /* STYLE */
              )
            ]),
            _ctx.$slots.default !== void 0 && _ctx.$slots.default([]).length ? (openBlock(), createElementBlock("footer", _hoisted_9$5, [
              renderSlot(_ctx.$slots, "default")
            ])) : createCommentVNode("v-if", true)
          ], 8, _hoisted_1$G)
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        !_ctx.inline ? {
          name: "trigger",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "trigger", {}, () => [
              createVNode(_component_b_input, mergeProps({
                ref: "input",
                autocomplete: "off",
                "model-value": _ctx.formatValue(_ctx.computedValue),
                placeholder: _ctx.placeholder,
                size: _ctx.size,
                icon: _ctx.icon,
                "icon-pack": _ctx.iconPack,
                loading: _ctx.loading,
                disabled: _ctx.disabledOrUndefined,
                readonly: !_ctx.editable,
                rounded: _ctx.rounded
              }, _ctx.fallthroughAttrs, {
                "use-html5-validation": _ctx.useHtml5Validation,
                onClick: _ctx.onInputClick,
                onKeyup: _cache[0] || (_cache[0] = withKeys(($event) => _ctx.toggle(true), ["enter"])),
                onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onChange($event.target.value)),
                onFocus: _ctx.handleOnFocus,
                onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.checkHtml5Validity())
              }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "loading", "disabled", "readonly", "rounded", "use-html5-validation", "onClick", "onFocus"])
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["position", "disabled", "inline", "mobile-modal", "append-to-body", "onActiveChange"])) : (openBlock(), createBlock(_component_b_input, mergeProps({
        key: 1,
        ref: "input",
        type: "time",
        autocomplete: "off",
        "model-value": _ctx.formatHHMMSS(_ctx.computedValue),
        placeholder: _ctx.placeholder,
        size: _ctx.size,
        icon: _ctx.icon,
        "icon-pack": _ctx.iconPack,
        loading: _ctx.loading,
        max: _ctx.formatHHMMSS(_ctx.maxTime),
        min: _ctx.formatHHMMSS(_ctx.minTime),
        disabled: _ctx.disabledOrUndefined,
        readonly: false
      }, _ctx.fallthroughAttrs, {
        "use-html5-validation": _ctx.useHtml5Validation,
        onClick: _cache[11] || (_cache[11] = withModifiers(($event) => _ctx.toggle(true), ["stop"])),
        onKeyup: _cache[12] || (_cache[12] = withKeys(($event) => _ctx.toggle(true), ["enter"])),
        onChange: _ctx.onChangeNativePicker,
        onFocus: _ctx.handleOnFocus,
        onBlur: _cache[13] || (_cache[13] = ($event) => _ctx.onBlur() && _ctx.checkHtml5Validity())
      }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "loading", "max", "min", "disabled", "use-html5-validation", "onChange", "onFocus"]))
    ],
    16
    /* FULL_PROPS */
  );
}
var Clockpicker = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$M]]);

const Plugin$x = {
  install(Vue) {
    registerComponent(Vue, Clockpicker);
  }
};

const cos30 = 0.86602540378;
const sin30 = 0.5;
let id = 0;
var _sfc_main$A = defineComponent({
  name: "BColorpickerHSLRepresentationTriangle",
  props: {
    value: {
      type: Object,
      required: true,
      validator(value) {
        return typeof value.hue === "number" && typeof value.saturation === "number" && typeof value.lightness === "number";
      }
    },
    size: {
      type: Number,
      default: 200
    },
    thickness: {
      type: Number,
      default: 20
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: (_value) => true
  },
  data() {
    return {
      id: id++,
      hue: this.value.hue,
      saturation: this.value.saturation,
      lightness: this.value.lightness,
      captureMouse: false,
      captureType: "hue",
      clientOffset: {
        cx: -1,
        cy: -1,
        width: 0,
        height: 0
      },
      cos30,
      sin30,
      debounce: 0
    };
  },
  computed: {
    viewBox() {
      const { size } = this;
      return `0 0 ${size} ${size}`;
    },
    internalRadius() {
      return this.size / 2 - this.thickness;
    },
    haloPath() {
      const { size, thickness } = this;
      const radius = size / 2 - 2;
      const thicknessRadius = radius - thickness;
      const center = size / 2;
      return `M${center - radius} ${center}a${radius}  ${radius}  0 1 1 ${2 * radius} 0h${-thickness}a${-thicknessRadius}  ${thicknessRadius}  0 1 0 ${ -2 * thicknessRadius} 0a${thicknessRadius}  ${thicknessRadius}  0 1 0 ${2 * thicknessRadius} 0h${thickness}a${radius}  ${radius}  0 1 1 ${ -2 * radius} 0z`;
    },
    trianglePath() {
      const { size, thickness } = this;
      const radius = size - 4;
      const thicknessRadius = (radius - 2 * thickness) / 2;
      return `M0 ${-thicknessRadius}L${cos30 * thicknessRadius} ${sin30 * thicknessRadius}H${ -0.86602540378 * thicknessRadius}z`;
    }
  },
  watch: {
    captureMouse(newValue, oldValue) {
      if (oldValue === false && newValue !== false) {
        const rect = this.$el.getBoundingClientRect();
        this.clientOffset.cx = rect.x + rect.width / 2;
        this.clientOffset.cy = rect.y + rect.height / 2;
        this.clientOffset.width = rect.width;
        this.clientOffset.height = rect.height;
      }
    },
    value: {
      deep: true,
      handler(newColor) {
        const { hue, saturation, lightness } = newColor;
        window.clearTimeout(this.debounce);
        this.debounce = window.setTimeout(() => {
          if (lightness >= 0.03 && lightness <= 0.97 && saturation > 0) {
            this.hue = hue;
          }
          this.saturation = saturation;
          this.lightness = lightness;
        }, 200);
      }
    }
  },
  methods: {
    increaseHue(value = 1) {
      this.hue = (this.hue + value) % 360;
    },
    decreaseHue(value = 1) {
      this.hue = (360 + this.hue - value) % 360;
    },
    increaseSaturation(value = 0.01) {
      this.saturation = Math.min(1, Math.max(0, this.saturation + value));
      this.lightness = Math.min(
        0.5 + (1 - this.saturation) * 0.5,
        Math.max(
          0.5 - (1 - this.saturation) * 0.5,
          this.lightness
        )
      );
    },
    decreaseSaturation(value = 0.01) {
      this.saturation = Math.min(1, Math.max(0, this.saturation - value));
      this.lightness = Math.min(
        0.5 + (1 - this.saturation) * 0.5,
        Math.max(
          0.5 - (1 - this.saturation) * 0.5,
          this.lightness
        )
      );
    },
    increaseLightness(value = 0.01) {
      this.lightness = Math.min(
        0.5 + (1 - this.saturation) * 0.5,
        Math.max(
          0.5 - (1 - this.saturation) * 0.5,
          this.lightness + value
        )
      );
    },
    decreaseLightness(value = 0.01) {
      this.lightness = Math.min(
        0.5 + (1 - this.saturation) * 0.5,
        Math.max(
          0.5 - (1 - this.saturation) * 0.5,
          this.lightness - value
        )
      );
    },
    hueKeyPress(event) {
      let handled = false;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          this.increaseHue();
          handled = true;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          this.decreaseHue();
          handled = true;
          break;
        case "Home":
          this.increaseHue(360 - this.hue);
          handled = true;
          break;
        case "End":
          this.decreaseHue(this.hue);
          handled = true;
          break;
        case "PageUp":
          this.increaseHue(60 - this.hue % 60);
          handled = true;
          break;
        case "PageDown":
          this.decreaseHue(60 + this.hue % 60);
          handled = true;
          break;
      }
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
        this.emitColor();
      }
    },
    slKeyPress(event) {
      let handled = false;
      switch (event.key) {
        case "ArrowRight":
          this.decreaseLightness();
          handled = true;
          break;
        case "ArrowUp":
          this.increaseSaturation();
          handled = true;
          break;
        case "ArrowLeft":
          this.increaseLightness();
          handled = true;
          break;
        case "ArrowDown":
          this.decreaseSaturation();
          handled = true;
          break;
        case "Home":
          this.increaseLightness(1 - this.lightness);
          handled = true;
          break;
        case "End":
          this.decreaseLightness(this.lightness);
          handled = true;
          break;
        case "PageUp":
          this.increaseSaturation(1 - this.saturation);
          handled = true;
          break;
        case "PageDown":
          this.decreaseSaturation(this.saturation);
          handled = true;
          break;
      }
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
        this.emitColor();
      }
    },
    clickHue(event) {
      this.startMouseCapture(event);
      this.trackMouse(event);
      this.stopMouseCapture(event);
      this.$refs.hueCursor.focus();
    },
    clickSL(event) {
      this.startMouseCapture(event);
      this.trackMouse(event);
      this.stopMouseCapture(event);
      this.$refs.slCursor.focus();
    },
    trackMouse(event) {
      if (this.captureMouse === false) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const touches = event.touches;
      let [mouseX, mouseY] = [0, 0];
      if (typeof touches !== "undefined" && touches.length) {
        [mouseX, mouseY] = [touches[0].clientX, touches[0].clientY];
      } else {
        [mouseX, mouseY] = [event.clientX, event.clientY];
      }
      const angle = Math.atan2(
        mouseY - this.clientOffset.cy,
        mouseX - this.clientOffset.cx
      );
      if (this.captureType === "sl") {
        const d = Math.sqrt(
          Math.pow(mouseX - this.clientOffset.cx, 2) + Math.pow(mouseY - this.clientOffset.cy, 2)
        );
        const ratio = this.size / this.clientOffset.width;
        const dx = d * Math.cos(angle - this.hue / 180 * Math.PI) * ratio;
        const dy = d * Math.sin(angle - this.hue / 180 * Math.PI) * ratio;
        const radius = this.internalRadius;
        const saturation = 1 - (Math.min(
          radius * sin30,
          Math.max(
            -radius,
            dy
          )
        ) + radius) / (radius + radius * sin30);
        const lightness = (Math.min(
          radius * cos30 * (1 - saturation),
          Math.max(
            -radius * cos30 * (1 - saturation),
            dx
          )
        ) + radius * cos30) / (radius * 2 * cos30);
        this.saturation = Math.round(saturation * 1e3) / 1e3;
        this.lightness = 1 - Math.round(lightness * 1e3) / 1e3;
      } else {
        this.hue = Math.round(angle / Math.PI * 180 + 90) % 360;
      }
      this.emitColor();
    },
    startMouseCapture(event) {
      event.stopPropagation();
      this.captureMouse = true;
      if (event.target.closest(".colorpicker-triangle-slider-sl") !== null) {
        this.captureType = "sl";
      } else {
        this.captureType = "hue";
      }
    },
    stopMouseCapture(event) {
      if (this.captureMouse !== false) {
        event.preventDefault();
        event.stopPropagation();
        this.$refs[this.captureType === "sl" ? "slCursor" : "hueCursor"].focus();
      }
      this.captureMouse = false;
    },
    emitColor() {
      const { hue, saturation, lightness } = this;
      this.$emit("input", Color.fromHSL(hue, saturation, lightness));
      window.clearTimeout(this.debounce);
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.trackMouse);
    window.addEventListener("touchmove", this.trackMouse, { passive: false });
    window.addEventListener("mouseup", this.stopMouseCapture);
    window.addEventListener("touchend", this.stopMouseCapture);
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.trackMouse);
    window.removeEventListener("touchmove", this.trackMouse);
    window.removeEventListener("mouseup", this.stopMouseCapture);
    window.removeEventListener("touchend", this.stopMouseCapture);
    clearTimeout(this.debounce);
  }
});

const _hoisted_1$F = ["viewBox"];
const _hoisted_2$y = ["id"];
const _hoisted_3$l = /* @__PURE__ */ createElementVNode(
  "stop",
  {
    offset: "0%",
    "stop-color": "#fff"
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_4$g = /* @__PURE__ */ createElementVNode(
  "stop",
  {
    offset: "100%",
    "stop-color": "#000"
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_5$a = [
  _hoisted_3$l,
  _hoisted_4$g
];
const _hoisted_6$8 = ["id"];
const _hoisted_7$7 = ["stop-color"];
const _hoisted_8$6 = ["stop-color"];
const _hoisted_9$4 = ["id"];
const _hoisted_10$3 = ["d"];
const _hoisted_11$3 = { class: "colorpicker-triangle-slider-hue" };
const _hoisted_12$3 = ["width", "height", "clip-path"];
const _hoisted_13$2 = ["x", "height"];
const _hoisted_14$1 = ["aria-valuenow"];
const _hoisted_15$1 = ["d", "fill"];
const _hoisted_16$1 = ["d", "fill"];
const _hoisted_17$1 = ["x", "y"];
const _hoisted_18$1 = ["aria-datavalues"];
function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", {
    viewBox: _ctx.viewBox,
    class: "b-colorpicker-triangle"
  }, [
    createElementVNode("defs", null, [
      createElementVNode("linearGradient", {
        id: `cp-triangle-gradient-ligthness-${_ctx.id}`,
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "0"
      }, [..._hoisted_5$a], 8, _hoisted_2$y),
      createElementVNode("linearGradient", {
        id: `cp-triangle-gradient-saturation-${_ctx.id}`,
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1"
      }, [
        createElementVNode("stop", {
          offset: "0%",
          "stop-color": `hsl(${_ctx.hue}deg, 100%, 50%)`,
          "stop-opacity": "1"
        }, null, 8, _hoisted_7$7),
        createElementVNode("stop", {
          offset: "100%",
          "stop-color": `hsl(${_ctx.hue}deg, 100%, 50%)`,
          "stop-opacity": "0"
        }, null, 8, _hoisted_8$6)
      ], 8, _hoisted_6$8),
      createElementVNode("clipPath", {
        id: `cp-triangle-clip-${_ctx.id}`
      }, [
        createElementVNode("path", { d: _ctx.haloPath }, null, 8, _hoisted_10$3)
      ], 8, _hoisted_9$4)
    ]),
    createElementVNode("g", _hoisted_11$3, [
      (openBlock(), createElementBlock("foreignObject", {
        x: 0,
        y: 0,
        width: _ctx.size,
        height: _ctx.size,
        "clip-path": `url(#cp-triangle-clip-${_ctx.id})`
      }, [
        createElementVNode(
          "div",
          {
            class: "colorpicker-triangle-hue",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickHue && _ctx.clickHue(...args)),
            onMousedown: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
            onTouchstart: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
          },
          null,
          32
          /* NEED_HYDRATION */
        )
      ], 8, _hoisted_12$3)),
      createElementVNode(
        "g",
        {
          style: normalizeStyle(`transform: rotate(${_ctx.hue}deg)`)
        },
        [
          (openBlock(), createElementBlock("foreignObject", {
            x: _ctx.size / 2 - 4,
            y: 0,
            width: "8",
            height: _ctx.thickness + 4
          }, [
            createElementVNode("div", {
              ref: "hueCursor",
              class: "hue-range-thumb",
              style: normalizeStyle(`background-color: hsl(${_ctx.hue}deg, 100%, 50%)`),
              role: "slider",
              tabindex: "0",
              "aria-label": "Hue",
              "aria-valuemin": "0",
              "aria-valuenow": _ctx.hue,
              "aria-valuemax": "360",
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.clickHue && _ctx.clickHue(...args)),
              onKeydown: _cache[4] || (_cache[4] = (...args) => _ctx.hueKeyPress && _ctx.hueKeyPress(...args)),
              onMousedown: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
              onTouchstart: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
            }, null, 44, _hoisted_14$1)
          ], 8, _hoisted_13$2))
        ],
        4
        /* STYLE */
      )
    ]),
    createElementVNode(
      "g",
      {
        class: "colorpicker-triangle-slider-sl",
        style: normalizeStyle(`transform: rotate(${_ctx.hue}deg) translate(50%, 50%)`),
        role: "graphics-datagroup",
        "aria-datascales": "lightness, saturation"
      },
      [
        createElementVNode("path", {
          d: _ctx.trianglePath,
          fill: `url(#cp-triangle-gradient-ligthness-${_ctx.id})`
        }, null, 8, _hoisted_15$1),
        createElementVNode("path", {
          d: _ctx.trianglePath,
          fill: `url(#cp-triangle-gradient-saturation-${_ctx.id})`,
          style: { "mix-blend-mode": "overlay" },
          onClick: _cache[7] || (_cache[7] = (...args) => _ctx.clickSL && _ctx.clickSL(...args)),
          onMousedown: _cache[8] || (_cache[8] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
          onTouchstart: _cache[9] || (_cache[9] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
        }, null, 40, _hoisted_16$1),
        (openBlock(), createElementBlock("foreignObject", {
          x: (_ctx.internalRadius - 3) * _ctx.cos30 * (-_ctx.lightness + 0.5) * 2 - 6,
          y: -_ctx.internalRadius + (1 - _ctx.saturation) * (_ctx.internalRadius - 3) * 1.5 - 3,
          width: "12",
          height: "12"
        }, [
          createElementVNode("div", {
            ref: "slCursor",
            class: "sl-range-thumb",
            style: normalizeStyle({
              backgroundColor: `hsl(${_ctx.hue}deg, ${_ctx.saturation * 100}%, ${_ctx.lightness * 100}%)`
            }),
            tabindex: "0",
            "aria-datavalues": `${_ctx.saturation * 100}%, ${_ctx.lightness * 100}%`,
            onClick: _cache[10] || (_cache[10] = (...args) => _ctx.clickSL && _ctx.clickSL(...args)),
            onKeydown: _cache[11] || (_cache[11] = (...args) => _ctx.slKeyPress && _ctx.slKeyPress(...args)),
            onMousedown: _cache[12] || (_cache[12] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
            onTouchstart: _cache[13] || (_cache[13] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
          }, null, 44, _hoisted_18$1)
        ], 8, _hoisted_17$1))
      ],
      4
      /* STYLE */
    )
  ], 8, _hoisted_1$F);
}
var BColorpickerHSLRepresentationTriangle = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$L]]);

const precision = (strs, ...values) => {
  const tmp = [];
  strs.forEach((str, i) => {
    tmp.push(str);
    const value = values[i];
    if (value) {
      tmp.push(
        Number.isNaN(+value / 1) ? value : Math.round(+value * 10) / 10
      );
    }
  });
  return tmp.join("");
};
var _sfc_main$z = defineComponent({
  name: "BColorpickerHSLRepresentationSquare",
  props: {
    value: {
      type: Object,
      required: true,
      validator(value) {
        return typeof value.hue === "number" && typeof value.saturation === "number" && typeof value.lightness === "number";
      }
    },
    size: {
      type: Number,
      default: 200
    },
    thickness: {
      type: Number,
      default: 20
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: (_value) => true
  },
  data() {
    return {
      hue: this.value.hue,
      saturation: this.value.saturation,
      lightness: this.value.lightness,
      captureMouse: false,
      captureType: "hue",
      clientOffset: {
        cx: -1,
        cy: -1,
        width: 0,
        height: 0
      },
      debounce: 0
    };
  },
  computed: {
    hueThumbStyle() {
      const { hue, size, thickness } = this;
      const side = size - thickness;
      const offset = size / 2;
      const angle = (hue + 720 + 90) % 360 / 180 * Math.PI;
      const ciq = 1 / Math.cos(Math.PI / 4);
      const { x, y } = {
        x: -Math.min(1, Math.max(-1, ciq * Math.cos(angle))) / 2 * side + offset,
        y: -Math.min(1, Math.max(-1, ciq * Math.sin(angle))) / 2 * side + offset
      };
      return {
        background: `hsl(${hue}deg, 100%, 50%)`,
        left: precision`${x}px`,
        top: precision`${y}px`,
        width: precision`${thickness - 2}px`
      };
    },
    slThumbStyle() {
      let { hue, saturation, lightness } = this;
      saturation = Math.max(0, Math.min(1, saturation));
      lightness = Math.max(0, Math.min(1, lightness));
      return {
        background: `hsl(${hue}deg, ${saturation * 100}%, ${lightness * 100}%)`,
        left: `${saturation * 100}%`,
        top: `${(1 - lightness) * 100}%`
      };
    },
    SLBackground() {
      const { hue } = this;
      return `linear-gradient(90deg, hsl(${hue}deg, 0%, 50%), hsl(${hue}deg, 100%, 50%))`;
    }
  },
  watch: {
    captureMouse(newValue, oldValue) {
      if (oldValue === false && newValue !== false) {
        const rect = this.$el.getBoundingClientRect();
        this.clientOffset.cx = rect.x + rect.width / 2;
        this.clientOffset.cy = rect.y + rect.height / 2;
        this.clientOffset.width = rect.width;
        this.clientOffset.height = rect.height;
      }
    },
    value: {
      deep: true,
      handler(newColor) {
        const { hue, saturation, lightness } = newColor;
        window.clearTimeout(this.debounce);
        this.debounce = window.setTimeout(() => {
          this.hue = hue;
          this.saturation = saturation;
          this.lightness = lightness;
        }, 200);
      }
    }
  },
  methods: {
    increaseHue(value = 1) {
      this.hue = (this.hue + value) % 360;
    },
    decreaseHue(value = 1) {
      this.hue = (360 + this.hue - value) % 360;
    },
    increaseSaturation(value = 0.01) {
      this.saturation = Math.min(1, Math.max(0, this.saturation + value));
      this.lightness = Math.min(
        0.5 + (1 - this.saturation) * 0.5,
        Math.max(
          0.5 - (1 - this.saturation) * 0.5,
          this.lightness
        )
      );
    },
    decreaseSaturation(value = 0.01) {
      this.saturation = Math.min(1, Math.max(0, this.saturation - value));
      this.lightness = Math.min(
        0.5 + (1 - this.saturation) * 0.5,
        Math.max(
          0.5 - (1 - this.saturation) * 0.5,
          this.lightness
        )
      );
    },
    increaseLightness(value = 0.01) {
      this.lightness = Math.min(
        0.5 + (1 - this.saturation) * 0.5,
        Math.max(
          0.5 - (1 - this.saturation) * 0.5,
          this.lightness + value
        )
      );
    },
    decreaseLightness(value = 0.01) {
      this.lightness = Math.min(
        0.5 + (1 - this.saturation) * 0.5,
        Math.max(
          0.5 - (1 - this.saturation) * 0.5,
          this.lightness - value
        )
      );
    },
    hueKeyPress(event) {
      let handled = false;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          this.increaseHue();
          handled = true;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          this.decreaseHue();
          handled = true;
          break;
        case "Home":
          this.increaseHue(360 - this.hue);
          handled = true;
          break;
        case "End":
          this.decreaseHue(this.hue);
          handled = true;
          break;
        case "PageUp":
          this.increaseHue(60 - this.hue % 60);
          handled = true;
          break;
        case "PageDown":
          this.decreaseHue(60 + this.hue % 60);
          handled = true;
          break;
      }
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
        this.emitColor();
      }
    },
    slKeyPress(event) {
      let handled = false;
      switch (event.key) {
        case "ArrowRight":
          this.increaseSaturation();
          handled = true;
          break;
        case "ArrowUp":
          this.increaseLightness();
          handled = true;
          break;
        case "ArrowLeft":
          this.decreaseSaturation();
          handled = true;
          break;
        case "ArrowDown":
          this.decreaseLightness();
          handled = true;
          break;
        case "Home":
          this.increaseLightness(1 - this.lightness);
          handled = true;
          break;
        case "End":
          this.decreaseLightness(this.lightness);
          handled = true;
          break;
        case "PageUp":
          this.increaseSaturation(1 - this.saturation);
          handled = true;
          break;
        case "PageDown":
          this.decreaseSaturation(this.saturation);
          handled = true;
          break;
      }
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
        this.emitColor();
      }
    },
    startMouseCapture(event) {
      event.stopPropagation();
      this.captureMouse = true;
      if (event.target.closest(".colorpicker-square-slider-sl") !== null) {
        this.captureType = "sl";
      } else {
        this.captureType = "hue";
      }
    },
    stopMouseCapture(event) {
      if (this.captureMouse !== false) {
        event.preventDefault();
        event.stopPropagation();
        this.$refs[this.captureType === "sl" ? "slCursor" : "hueCursor"].focus();
      }
      this.captureMouse = false;
    },
    clickHue(event) {
      this.startMouseCapture(event);
      this.trackMouse(event);
      this.stopMouseCapture(event);
      this.$refs.hueCursor.focus();
    },
    clickSL(event) {
      this.startMouseCapture(event);
      this.trackMouse(event);
      this.stopMouseCapture(event);
      this.$refs.slCursor.focus();
    },
    trackMouse(event) {
      if (this.captureMouse === false) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const touches = event.touches;
      let [mouseX, mouseY] = [0, 0];
      if (typeof touches !== "undefined" && touches.length) {
        [mouseX, mouseY] = [touches[0].clientX, touches[0].clientY];
      } else {
        [mouseX, mouseY] = [event.clientX, event.clientY];
      }
      const angle = Math.atan2(
        mouseY - this.clientOffset.cy,
        mouseX - this.clientOffset.cx
      );
      if (this.captureType === "sl") {
        const saturation = (mouseX - this.clientOffset.cx) / (this.clientOffset.width - this.thickness * 2) + 0.5;
        const lightness = (mouseY - this.clientOffset.cy) / (this.clientOffset.height - this.thickness * 2) + 0.5;
        this.saturation = Math.round(Math.min(1, Math.max(0, saturation)) * 1e3) / 1e3;
        this.lightness = 1 - Math.round(Math.min(1, Math.max(0, lightness)) * 1e3) / 1e3;
      } else {
        this.hue = Math.round(angle / Math.PI * 180 + 90) % 360;
      }
      this.emitColor();
    },
    emitColor() {
      const { hue, saturation, lightness } = this;
      this.$emit("input", Color.fromHSL(hue, saturation, lightness));
      window.clearTimeout(this.debounce);
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.trackMouse);
    window.addEventListener("touchmove", this.trackMouse, { passive: false });
    window.addEventListener("mouseup", this.stopMouseCapture);
    window.addEventListener("touchend", this.stopMouseCapture);
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.trackMouse);
    window.removeEventListener("touchmove", this.trackMouse);
    window.removeEventListener("mouseup", this.stopMouseCapture);
    window.removeEventListener("touchend", this.stopMouseCapture);
    clearTimeout(this.debounce);
  }
});

const _hoisted_1$E = ["aria-datavalues"];
function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: "b-colorpicker-square",
      style: normalizeStyle({ width: `${_ctx.size}px` })
    },
    [
      createElementVNode(
        "div",
        {
          class: "colorpicker-square-slider-hue",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickHue && _ctx.clickHue(...args)),
          onMousedown: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
          onTouchstart: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
        },
        [
          createElementVNode(
            "div",
            {
              ref: "hueCursor",
              role: "slider",
              class: "hue-range-thumb",
              tabindex: "0",
              "aria-label": "Hue",
              "aria-valuemin": "0",
              "aria-valuemax": "359",
              style: normalizeStyle(_ctx.hueThumbStyle)
            },
            null,
            4
            /* STYLE */
          )
        ],
        32
        /* NEED_HYDRATION */
      ),
      createElementVNode(
        "div",
        {
          class: "colorpicker-square-slider-sl",
          style: normalizeStyle({
            background: _ctx.SLBackground,
            margin: `${_ctx.thickness}px`
          }),
          "aria-datascales": "lightness, saturation",
          onClick: _cache[7] || (_cache[7] = (...args) => _ctx.clickSL && _ctx.clickSL(...args)),
          onMousedown: _cache[8] || (_cache[8] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
          onTouchstart: _cache[9] || (_cache[9] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
        },
        [
          createElementVNode("div", {
            ref: "slCursor",
            role: "slider",
            class: "sl-range-thumb",
            tabindex: "0",
            "aria-datavalues": `${_ctx.saturation * 100}%, ${_ctx.lightness * 100}%`,
            style: normalizeStyle(_ctx.slThumbStyle),
            onClick: _cache[3] || (_cache[3] = (...args) => _ctx.clickSL && _ctx.clickSL(...args)),
            onKeydown: _cache[4] || (_cache[4] = (...args) => _ctx.slKeyPress && _ctx.slKeyPress(...args)),
            onMousedown: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
            onTouchstart: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
          }, null, 44, _hoisted_1$E)
        ],
        36
        /* STYLE, NEED_HYDRATION */
      )
    ],
    4
    /* STYLE */
  );
}
var BColorpickerHSLRepresentationSquare = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$K]]);

const TOOLTIP_POSITIONS = ["is-auto", "is-top", "is-bottom", "is-left", "is-right"];
var _sfc_main$y = defineComponent({
  name: "BTooltip",
  props: {
    active: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: () => config.defaultTooltipType
    },
    label: String,
    delay: {
      type: Number,
      default: () => config.defaultTooltipDelay
    },
    closeDelay: {
      type: Number,
      default: () => config.defaultTooltipCloseDelay
    },
    position: {
      type: String,
      default: "is-auto",
      validator(value) {
        return TOOLTIP_POSITIONS.indexOf(value) > -1;
      }
    },
    triggers: {
      type: Array,
      default: () => ["hover"]
    },
    always: Boolean,
    square: Boolean,
    dashed: Boolean,
    multilined: Boolean,
    size: {
      type: String,
      default: "is-medium"
    },
    appendToBody: Boolean,
    animated: {
      type: Boolean,
      default: true
    },
    animation: {
      type: String,
      default: "fade"
    },
    contentClass: String,
    autoClose: {
      type: [Array, Boolean],
      default: true
    }
  },
  emits: {
    close: () => true,
    open: () => true
  },
  data() {
    return {
      isActive: false,
      triggerStyle: {},
      timer: void 0,
      _bodyEl: void 0,
      // Used to append to body
      resizeObserver: void 0,
      resizeListener: void 0,
      timeOutID: void 0,
      controller: void 0,
      dynamicPosition: void 0
      // Computed once opened
    };
  },
  computed: {
    rootClasses() {
      return ["b-tooltip", this.type, this.dynamicPosition, this.size, {
        "is-square": this.square,
        "is-always": this.always,
        "is-multiline": this.multilined,
        "is-dashed": this.dashed
      }];
    },
    newAnimation() {
      return this.animated ? this.animation : void 0;
    }
  },
  watch: {
    isActive() {
      this.isActive ? this.$emit("open") : this.$emit("close");
      if (this.appendToBody) {
        this.updateAppendToBody();
      }
    }
  },
  methods: {
    computePosition() {
      if (this.position !== "is-auto") return this.position;
      const trigger = this.$refs.trigger;
      const bounds = trigger.getBoundingClientRect();
      const dt = bounds.top;
      const db = window.innerHeight - bounds.bottom;
      const dl = bounds.left;
      const dr = window.innerWidth - bounds.right;
      const min = Math.min(dt, db, dl, dr);
      if (min === dt) {
        return "is-bottom";
      } else if (min === db) {
        return "is-top";
      } else if (min === dl) {
        return "is-right";
      } else {
        return "is-left";
      }
    },
    updateAppendToBody() {
      const tooltip = this.$refs.tooltip;
      const trigger = this.$refs.trigger;
      if (tooltip && trigger) {
        const tooltipEl = this.$data._bodyEl.children[0];
        tooltipEl.classList.forEach((item) => tooltipEl.classList.remove(item));
        this.rootClasses.forEach((item) => {
          if (typeof item === "object") {
            const record = item;
            for (const key in record) {
              if (record[key]) {
                tooltipEl.classList.add(key);
              }
            }
          } else {
            tooltipEl.classList.add(item);
          }
        });
        const rect = trigger.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        tooltipEl.style.position = "absolute";
        this.dynamicPosition = this.computePosition();
        switch (this.dynamicPosition) {
          case "is-top":
            tooltipEl.style.width = `${trigger.clientWidth}px`;
            tooltipEl.style.height = "0px";
            tooltipEl.style.top = "0px";
            tooltipEl.style.left = "0px";
            break;
          case "is-bottom":
            tooltipEl.style.width = `${trigger.clientWidth}px`;
            tooltipEl.style.height = "0px";
            tooltipEl.style.top = `${trigger.clientHeight}px`;
            tooltipEl.style.left = "0px";
            break;
          case "is-left":
            tooltipEl.style.width = "0px";
            tooltipEl.style.height = `${trigger.clientHeight}px`;
            tooltipEl.style.top = "0px";
            tooltipEl.style.left = "0px";
            break;
          case "is-right":
            tooltipEl.style.width = "0px";
            tooltipEl.style.height = `${trigger.clientHeight}px`;
            tooltipEl.style.top = "0px";
            tooltipEl.style.left = `${trigger.clientWidth}px`;
            break;
        }
        const wrapper = this.$data._bodyEl;
        wrapper.style.position = "absolute";
        wrapper.style.top = `${top}px`;
        wrapper.style.left = `${left}px`;
        wrapper.style.width = "0px";
        wrapper.style.zIndex = this.isActive || this.always ? "99" : "-1";
        this.triggerStyle = {
          zIndex: this.isActive || this.always ? "100" : void 0
        };
      }
    },
    onClick() {
      if (this.triggers.indexOf("click") < 0) return;
      this.$nextTick(() => {
        this.timeOutID = setTimeout(() => this.open());
      });
    },
    onHover() {
      if (this.triggers.indexOf("hover") < 0) return;
      this.open();
    },
    onContextMenu(e) {
      if (this.triggers.indexOf("contextmenu") < 0) return;
      e.preventDefault();
      this.open();
    },
    onFocus() {
      if (this.triggers.indexOf("focus") < 0) return;
      this.open();
    },
    open() {
      this.dynamicPosition = this.computePosition();
      if (this.delay) {
        this.timer = setTimeout(() => {
          this.isActive = true;
          this.timer = void 0;
        }, this.delay);
      } else {
        this.isActive = true;
      }
    },
    close() {
      if (typeof this.autoClose === "boolean") {
        if (this.autoClose && this.timer) clearTimeout(this.timer);
        if (this.closeDelay) {
          this.timer = setTimeout(() => {
            this.isActive = !this.autoClose;
            this.timer = void 0;
          }, this.closeDelay);
        } else {
          this.isActive = !this.autoClose;
        }
      }
    },
    /*
    * Close tooltip if clicked outside.
    */
    clickedOutside(event) {
      if (this.isActive) {
        if (Array.isArray(this.autoClose)) {
          if (this.autoClose.includes("outside")) {
            if (!this.isInWhiteList(event.target)) {
              this.isActive = false;
              return;
            }
          }
          if (this.autoClose.includes("inside")) {
            if (this.isInWhiteList(event.target)) this.isActive = false;
          }
        }
      }
    },
    /*
     * Keypress event that is bound to the document
     */
    keyPress({ key }) {
      if (this.isActive && (key === "Escape" || key === "Esc")) {
        if (Array.isArray(this.autoClose)) {
          if (this.autoClose.indexOf("escape") >= 0) this.isActive = false;
        }
      }
    },
    /*
    * White-listed items to not close when clicked.
    */
    isInWhiteList(el) {
      if (el === this.$refs.content) return true;
      if (this.$refs.content != null) {
        const children = this.$refs.content.querySelectorAll("*");
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }
      return false;
    }
  },
  mounted() {
    if (this.appendToBody && typeof window !== "undefined") {
      this.controller = new window.AbortController();
      this.$data._bodyEl = createAbsoluteElement(this.$refs.content);
      this.updateAppendToBody();
      const animation = this.$el.closest(".animation-content");
      if (animation != null) {
        const listener = () => {
          this.updateAppendToBody();
          animation.removeEventListener("transitionend", listener);
        };
        animation.addEventListener("transitionend", listener, {
          signal: this.controller.signal
        });
      }
      this.resizeListener = () => this.updateAppendToBody();
      window.addEventListener("resize", this.resizeListener);
      this.resizeObserver = new ResizeObserver(this.resizeListener);
      if (this.$el.parentNode != null && this.$el.parentNode.nodeType === Node.ELEMENT_NODE) {
        this.resizeObserver.observe(this.$el.parentNode);
      }
    }
    if (this.always) {
      this.dynamicPosition = this.computePosition();
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
      document.removeEventListener("keyup", this.keyPress);
    }
    if (this.resizeListener != null) {
      window.removeEventListener("resize", this.resizeListener);
    }
    if (this.resizeObserver != null) {
      this.resizeObserver.disconnect();
    }
    if (this.appendToBody) {
      removeElement(this.$data._bodyEl);
    }
    if (this.controller != null) {
      this.controller.abort();
    }
    clearTimeout(this.timer);
    clearTimeout(this.timeOutID);
  }
});

function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      ref: "tooltip",
      class: normalizeClass(_ctx.rootClasses)
    },
    [
      createVNode(Transition, {
        name: _ctx.newAnimation,
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode(
            "div",
            {
              ref: "content",
              class: normalizeClass(["tooltip-content", _ctx.contentClass])
            },
            [
              _ctx.label ? (openBlock(), createElementBlock(
                Fragment,
                { key: 0 },
                [
                  createTextVNode(
                    toDisplayString(_ctx.label),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 1 }) : createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          ), [
            [vShow, _ctx.active && (_ctx.isActive || _ctx.always)]
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]),
      createElementVNode(
        "div",
        {
          ref: "trigger",
          class: "tooltip-trigger",
          style: normalizeStyle(_ctx.triggerStyle),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
          onContextmenu: _cache[1] || (_cache[1] = (...args) => _ctx.onContextMenu && _ctx.onContextMenu(...args)),
          onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.onHover && _ctx.onHover(...args)),
          onFocusCapture: _cache[3] || (_cache[3] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
          onBlurCapture: _cache[4] || (_cache[4] = (...args) => _ctx.close && _ctx.close(...args)),
          onMouseleave: _cache[5] || (_cache[5] = (...args) => _ctx.close && _ctx.close(...args))
        },
        [
          renderSlot(_ctx.$slots, "default", { ref: "slot" })
        ],
        36
        /* STYLE, NEED_HYDRATION */
      )
    ],
    2
    /* CLASS */
  );
}
var Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$J]]);

var _sfc_main$x = defineComponent({
  name: "BColorpickerAlphaSlider",
  components: {
    BTooltip: Tooltip
  },
  props: {
    value: {
      type: Number,
      validator: (value) => value >= 0 && value < 256
    },
    color: [String, Object]
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: (_value) => true
  },
  data() {
    const color = Color.parse(this.color);
    color.alpha = 0;
    return {
      startColor: color.toString("hex"),
      endColor: color.toString("hexa"),
      percent: Math.round((1 - this.value / 255) * 100),
      captureMouse: false,
      clientOffset: {
        cx: -1,
        cy: -1,
        width: 0,
        height: 0
      }
    };
  },
  computed: {
    style() {
      return {
        backgroundImage: `linear-gradient(90deg, ${this.startColor} 0%, ${this.endColor} 100%),
                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7),
                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7)`,
        backgroundSize: "100% 100%, 1em 1em, 1em 1em",
        backgroundPosition: "0 0, .5em .5em, 0 0"
      };
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.percent = Math.round((1 - newValue / 255) * 100);
      }
    },
    color(newColor) {
      const color = Color.parse(newColor);
      color.alpha = 0;
      this.startColor = color.toString("hex");
      this.endColor = color.toString("hexa");
    },
    captureMouse(newValue, oldValue) {
      if (oldValue === false && newValue !== false) {
        const rect = this.$el.getBoundingClientRect();
        this.clientOffset.cx = rect.x + rect.width / 2;
        this.clientOffset.cy = rect.y + rect.height / 2;
        this.clientOffset.width = rect.width;
        this.clientOffset.height = rect.height;
      }
    }
  },
  methods: {
    increaseAlpha(value = 1) {
      this.percent = Math.max(0, Math.min(100, this.percent + value));
    },
    decreaseAlpha(value = 0.01) {
      this.increaseAlpha(-value);
    },
    alphaKeyPress(event) {
      let handled = false;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          this.increaseAlpha();
          handled = true;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          this.decreaseAlpha();
          handled = true;
          break;
        case "Home":
          this.decreaseAlpha(this.percent);
          handled = true;
          break;
        case "End":
          this.increaseAlpha(100 - this.percent);
          handled = true;
          break;
        case "PageUp":
          this.increaseAlpha(10 - this.percent % 10);
          handled = true;
          break;
        case "PageDown":
          this.decreaseAlpha(this.percent % 10);
          handled = true;
          break;
      }
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
        this.emitAlpha();
      }
    },
    clickAlpha(event) {
      this.startMouseCapture(event);
      this.trackMouse(event);
      this.stopMouseCapture(event);
      this.$refs.alphaCursor.focus();
    },
    startMouseCapture(event) {
      event.stopPropagation();
      this.captureMouse = true;
    },
    trackMouse(event) {
      if (this.captureMouse === false) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      let [mouseX] = [0, 0];
      const touches = event.touches;
      if (typeof touches !== "undefined" && touches.length) {
        [mouseX] = [touches[0].clientX];
      } else {
        [mouseX] = [event.clientX];
      }
      const ratio = 0.5 + (this.clientOffset.cx - mouseX) / this.clientOffset.width;
      this.percent = Math.round(100 - Math.max(0, Math.min(1, ratio)) * 100);
      this.emitAlpha();
    },
    stopMouseCapture(event) {
      if (this.captureMouse !== false) {
        event.preventDefault();
        event.stopPropagation();
        this.$refs.alphaCursor.focus();
      }
      this.captureMouse = false;
    },
    emitAlpha() {
      this.$emit("input", (1 - this.percent / 100) * 255);
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.trackMouse);
    window.addEventListener("touchmove", this.trackMouse, { passive: false });
    window.addEventListener("mouseup", this.stopMouseCapture);
    window.addEventListener("touchend", this.stopMouseCapture);
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.trackMouse);
    window.removeEventListener("touchmove", this.trackMouse);
    window.removeEventListener("mouseup", this.stopMouseCapture);
    window.removeEventListener("touchend", this.stopMouseCapture);
  }
});

const _hoisted_1$D = ["aria-valuenow"];
function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_tooltip = resolveComponent("b-tooltip");
  return openBlock(), createElementBlock(
    "div",
    {
      class: "b-colorpicker-alpha-slider",
      style: normalizeStyle(_ctx.style),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickAlpha && _ctx.clickAlpha(...args)),
      onKeydown: _cache[1] || (_cache[1] = (...args) => _ctx.alphaKeyPress && _ctx.alphaKeyPress(...args)),
      onMousedown: _cache[2] || (_cache[2] = (...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args)),
      onTouchstart: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
    },
    [
      createElementVNode("div", {
        ref: "alphaCursor",
        role: "slider",
        class: "alpha-range-thumb",
        tabindex: "0",
        "aria-label": "Tranparency",
        "aria-valuemin": "0",
        "aria-valuenow": _ctx.percent,
        "aria-valuemax": "100",
        style: normalizeStyle({ left: `${_ctx.percent}%` })
      }, [
        createVNode(_component_b_tooltip, {
          label: `${_ctx.percent}%`,
          always: _ctx.captureMouse,
          position: "is-top"
        }, {
          default: withCtx(() => [
            createTextVNode("   ")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["label", "always"])
      ], 12, _hoisted_1$D)
    ],
    36
    /* STYLE, NEED_HYDRATION */
  );
}
var BColorpickerAlphaSlider = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$I]]);

const defaultColorFormatter = (color) => {
  if (color.alpha < 1) {
    return color.toString("hexa");
  } else {
    return color.toString("hex");
  }
};
const defaultColorParser = (color) => {
  return Color.parse(color);
};
var _sfc_main$w = defineComponent({
  name: "BColorpicker",
  components: {
    BColorpickerHSLRepresentationTriangle,
    BColorpickerHSLRepresentationSquare,
    BColorpickerAlphaSlider,
    BInput,
    BField: Field,
    BButton,
    BDropdown,
    BDropdownItem
  },
  mixins: [FormElementMixin],
  inheritAttrs: false,
  provide() {
    return {
      $colorpicker: this
    };
  },
  props: {
    modelValue: {
      type: [String, Object],
      validator(value) {
        return typeof value === "string" || typeof value === "object" && typeof value.red === "number" && typeof value.green === "number" && typeof value.blue === "number";
      }
    },
    mobileNative: {
      type: Boolean,
      default: false
    },
    representation: {
      type: String,
      default: "triangle",
      value(value) {
        return ["triangle", "square"].some((r) => r === value);
      }
    },
    inline: Boolean,
    disabled: Boolean,
    horizontalColorPicker: {
      type: Boolean,
      default: false
    },
    colorFormatter: {
      type: Function,
      default: (color, vm) => {
        if (typeof config.defaultColorFormatter === "function") {
          return config.defaultColorFormatter(color);
        } else {
          return defaultColorFormatter(color);
        }
      }
    },
    colorParser: {
      type: Function,
      default: (color, vm) => {
        if (typeof config.defaultColorParser === "function") {
          return config.defaultColorParser(color);
        } else {
          return defaultColorParser(color);
        }
      }
    },
    alpha: {
      type: Boolean,
      default: false
    },
    expanded: Boolean,
    position: String,
    mobileModal: {
      type: Boolean,
      default: () => config.defaultDatepickerMobileModal
    },
    focusable: {
      type: Boolean,
      default: true
    },
    trapFocus: {
      type: Boolean,
      default: () => config.defaultTrapFocus
    },
    openOnFocus: Boolean,
    closeOnClick: Boolean,
    appendToBody: Boolean
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "active-change": (_active) => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      color: this.parseColor(this.modelValue)
    };
  },
  computed: {
    computedValue: {
      set(value) {
        this.color = this.parseColor(value);
      },
      get() {
        return this.color;
      }
    },
    background() {
      if (this.alpha) {
        return `linear-gradient(
                    45deg,
                    ${this.computedValue.toString("hex")} 50%,
                    ${this.computedValue.toString("hexa")} 50%
                )`;
      } else {
        const hex = this.computedValue.toString("hex");
        return `linear-gradient(
                    45deg,
                    ${hex} 50%,
                    ${hex} 50%
                )`;
      }
    },
    triggerStyle() {
      const { red, green, blue } = this.computedValue;
      const light = red * 0.299 + green * 0.587 + blue * 0.114 > 186;
      return {
        backgroundColor: "#ffffff",
        backgroundImage: `
                    ${this.background},
                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7),
                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7)
                `,
        backgroundSize: "100% 100%, 16px 16px, 16px 16px",
        backgroundPosition: "0 0, 8px 8px, 0 0",
        color: light ? "#000000" : "#FFFFFF",
        textShadow: `0 0 2px ${light ? "#FFFFFFAA" : "#000000AA"}`
      };
    },
    isMobile() {
      return this.mobileNative && isMobile.any();
    },
    ariaRole() {
      if (!this.inline) {
        return "dialog";
      } else {
        return void 0;
      }
    }
  },
  watch: {
    modelValue(value) {
      this.computedValue = new Color(value);
    }
  },
  methods: {
    parseColor(color) {
      try {
        return this.colorParser(color);
      } catch (e) {
        return new Color();
      }
    },
    updateColor(value) {
      value.alpha = this.computedValue.alpha;
      this.computedValue = value;
      this.$emit("update:modelValue", value);
    },
    updateAlpha(alpha) {
      this.computedValue.alpha = alpha;
      this.$emit("update:modelValue", this.computedValue);
    },
    updateRGB() {
      this.$emit("update:modelValue", this.computedValue);
    },
    /*
     * Format color into string
     */
    formatValue(value) {
      return value ? this.colorFormatter(value, this) : null;
    },
    /*
     * Toggle datepicker
     */
    togglePicker(active) {
      if (this.$refs.dropdown) {
        const isActive = typeof active === "boolean" ? active : !this.$refs.dropdown.isActive;
        if (isActive) {
          this.$refs.dropdown.isActive = isActive;
        } else if (this.closeOnClick) {
          this.$refs.dropdown.isActive = isActive;
        }
      }
    },
    /*
     * Call default onFocus method and show datepicker
     */
    handleOnFocus(event) {
      this.onFocus(event);
      if (this.openOnFocus) {
        this.togglePicker(true);
      }
    },
    /*
     * Toggle dropdown
     */
    // I decided to comment out the following unused method until we come
    // back to deal with the `open-on-focus` and `close-on-click` props
    /*
    toggle() {
        if (this.mobileNative && this.isMobile) {
            const input = this.$refs.input.$refs.input
            input.focus()
            input.click()
            return
        }
        (this.$refs.dropdown as BDropdownInstance).toggle()
    }, */
    /*
     * Avoid dropdown toggle when is already visible
     */
    onInputClick(event) {
      if (this.$refs.dropdown.isActive) {
        event.stopPropagation();
      }
    },
    /*
     * Keypress event that is bound to the document.
     */
    keyPress({ key }) {
      const dropdown = this.$refs.dropdown;
      if (dropdown && dropdown.isActive && (key === "Escape" || key === "Esc")) {
        this.togglePicker(false);
      }
    },
    /*
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange(value) {
      if (!value) {
        this.onBlur();
      }
      this.$emit("active-change", value);
    }
  }
});

const _hoisted_1$C = { class: "color-name" };
const _hoisted_2$x = { class: "colorpicker-header" };
const _hoisted_3$k = { class: "colorpicker-content" };
const _hoisted_4$f = { class: "colorpicker-footer" };
function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_button = resolveComponent("b-button");
  const _component_b_colorpicker_h_s_l_representation_square = resolveComponent("b-colorpicker-h-s-l-representation-square");
  const _component_b_colorpicker_h_s_l_representation_triangle = resolveComponent("b-colorpicker-h-s-l-representation-triangle");
  const _component_b_colorpicker_alpha_slider = resolveComponent("b-colorpicker-alpha-slider");
  const _component_b_input = resolveComponent("b-input");
  const _component_b_field = resolveComponent("b-field");
  const _component_b_dropdown_item = resolveComponent("b-dropdown-item");
  const _component_b_dropdown = resolveComponent("b-dropdown");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["colorpicker control", [_ctx.size, { "is-expanded": _ctx.expanded }]])
    },
    [
      !_ctx.isMobile || _ctx.inline ? (openBlock(), createBlock(_component_b_dropdown, {
        key: 0,
        ref: "dropdown",
        position: _ctx.position,
        expanded: _ctx.expanded,
        disabled: _ctx.disabled,
        inline: _ctx.inline,
        "mobile-modal": _ctx.mobileModal,
        "trap-focus": _ctx.trapFocus,
        "aria-role": _ctx.ariaRole,
        "append-to-body": _ctx.appendToBody,
        "append-to-body-copy-parent": "",
        onActiveChange: _ctx.onActiveChange
      }, createSlots({
        default: withCtx(() => [
          createVNode(_component_b_dropdown_item, {
            disabled: _ctx.disabled,
            focusable: _ctx.focusable,
            custom: "",
            class: normalizeClass({ "dropdown-horizontal-colorpicker": _ctx.horizontalColorPicker })
          }, {
            default: withCtx(() => [
              createElementVNode("div", null, [
                createElementVNode("header", _hoisted_2$x, [
                  _ctx.$slots.header !== void 0 && _ctx.$slots.header.length ? renderSlot(_ctx.$slots, "header", { key: 0 }) : createCommentVNode("v-if", true)
                ]),
                createElementVNode("div", _hoisted_3$k, [
                  _ctx.representation === "square" ? (openBlock(), createBlock(_component_b_colorpicker_h_s_l_representation_square, {
                    key: 0,
                    value: _ctx.computedValue,
                    onInput: _ctx.updateColor
                  }, null, 8, ["value", "onInput"])) : (openBlock(), createBlock(_component_b_colorpicker_h_s_l_representation_triangle, {
                    key: 1,
                    value: _ctx.computedValue,
                    onInput: _ctx.updateColor
                  }, null, 8, ["value", "onInput"]))
                ])
              ]),
              createElementVNode("footer", _hoisted_4$f, [
                _ctx.alpha ? (openBlock(), createBlock(_component_b_colorpicker_alpha_slider, {
                  key: 0,
                  value: _ctx.computedValue.alpha,
                  onInput: _ctx.updateAlpha,
                  color: _ctx.computedValue
                }, null, 8, ["value", "onInput", "color"])) : createCommentVNode("v-if", true),
                renderSlot(_ctx.$slots, "footer", { color: _ctx.computedValue }, () => [
                  createVNode(_component_b_field, {
                    class: "colorpicker-fields",
                    grouped: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_b_field, {
                        horizontal: "",
                        label: "R"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_b_input, {
                            type: "number",
                            modelValue: _ctx.computedValue.red,
                            "onUpdate:modelValue": [
                              _cache[0] || (_cache[0] = ($event) => _ctx.computedValue.red = $event),
                              _ctx.updateRGB
                            ],
                            modelModifiers: { number: true },
                            size: "is-small",
                            "aria-label": "Red"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(_component_b_field, {
                        horizontal: "",
                        label: "G"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_b_input, {
                            type: "number",
                            modelValue: _ctx.computedValue.green,
                            "onUpdate:modelValue": [
                              _cache[1] || (_cache[1] = ($event) => _ctx.computedValue.green = $event),
                              _ctx.updateRGB
                            ],
                            modelModifiers: { number: true },
                            size: "is-small",
                            "aria-label": "Green"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode(_component_b_field, {
                        horizontal: "",
                        label: "B"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_b_input, {
                            type: "number",
                            modelValue: _ctx.computedValue.blue,
                            "onUpdate:modelValue": [
                              _cache[2] || (_cache[2] = ($event) => _ctx.computedValue.blue = $event),
                              _ctx.updateRGB
                            ],
                            modelModifiers: { number: true },
                            size: "is-small",
                            "aria-label": "Blue"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])
              ])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["disabled", "focusable", "class"])
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        !_ctx.inline ? {
          name: "trigger",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "trigger", {}, () => [
              createVNode(_component_b_button, {
                style: normalizeStyle(_ctx.triggerStyle),
                expanded: _ctx.expanded,
                disabled: _ctx.disabled
              }, {
                default: withCtx(() => [
                  createElementVNode(
                    "span",
                    _hoisted_1$C,
                    toDisplayString(_ctx.colorFormatter(_ctx.computedValue)),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["style", "expanded", "disabled"])
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["position", "expanded", "disabled", "inline", "mobile-modal", "trap-focus", "aria-role", "append-to-body", "onActiveChange"])) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
var Colorpicker = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$H]]);

const Plugin$w = {
  install(Vue) {
    registerComponent(Vue, Colorpicker);
  }
};

var _sfc_main$v = defineComponent({
  name: "BSelect",
  components: {
    BIcon
  },
  mixins: [CompatFallthroughMixin, FormElementMixin],
  props: {
    modelValue: {
      type: [
        String,
        Number,
        Boolean,
        Object,
        Array,
        Function,
        Date,
        null
      ],
      default: null
    },
    placeholder: String,
    multiple: Boolean,
    nativeSize: [String, Number]
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    blur: (_event) => true,
    focus: (_event) => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      selected: this.modelValue,
      _elementRef: "select"
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.selected;
      },
      set(value) {
        this.selected = value;
        this.$emit("update:modelValue", value);
        !this.isValid && this.checkHtml5Validity();
      }
    },
    spanClasses() {
      return [this.size, this.statusType, {
        "is-fullwidth": this.expanded,
        "is-loading": this.loading,
        "is-multiple": this.multiple,
        "is-rounded": this.rounded,
        "is-empty": this.selected === null
      }];
    }
  },
  watch: {
    /*
    * When v-model is changed:
    *   1. Set the selected option.
    *   2. If it's invalid, validate again.
    */
    modelValue(value) {
      this.selected = value;
      !this.isValid && this.checkHtml5Validity();
    }
  }
});

const _hoisted_1$B = ["multiple", "size"];
const _hoisted_2$w = {
  key: 0,
  value: null,
  disabled: "",
  hidden: ""
};
function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["control", { "is-expanded": _ctx.expanded, "has-icons-left": _ctx.icon }]
    }, _ctx.rootAttrs),
    [
      createElementVNode(
        "span",
        {
          class: normalizeClass(["select", _ctx.spanClasses])
        },
        [
          withDirectives(createElementVNode("select", mergeProps({
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
            ref: "select",
            multiple: _ctx.multiple,
            size: _ctx.nativeSize
          }, _ctx.fallthroughAttrs, {
            onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
            onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("focus", $event))
          }), [
            _ctx.placeholder ? (openBlock(), createElementBlock(
              Fragment,
              { key: 0 },
              [
                _ctx.computedValue == null ? (openBlock(), createElementBlock(
                  "option",
                  _hoisted_2$w,
                  toDisplayString(_ctx.placeholder),
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default")
          ], 16, _hoisted_1$B), [
            [vModelSelect, _ctx.computedValue]
          ])
        ],
        2
        /* CLASS */
      ),
      _ctx.icon ? (openBlock(), createBlock(_component_b_icon, {
        key: 0,
        class: "is-left",
        icon: _ctx.icon,
        pack: _ctx.iconPack,
        size: _ctx.iconSize
      }, null, 8, ["icon", "pack", "size"])) : createCommentVNode("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var BSelect = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$G]]);

var _sfc_main$u = defineComponent({
  name: "BDatepickerTableRow",
  inject: {
    $datepicker: { name: "$datepicker", default: false }
  },
  props: {
    selectedDate: {
      type: [Date, Array]
    },
    hoveredDateRange: Array,
    day: {
      type: Number
    },
    week: {
      type: Array,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    minDate: [Date, null],
    maxDate: [Date, null],
    disabled: Boolean,
    unselectableDates: [Array, Function, null],
    unselectableDaysOfWeek: [Array, null],
    selectableDates: [Array, Function, null],
    events: Array,
    indicators: String,
    dateCreator: Function,
    nearbyMonthDays: Boolean,
    nearbySelectableMonthDays: Boolean,
    showWeekNumber: Boolean,
    weekNumberClickable: Boolean,
    range: Boolean,
    multiple: Boolean,
    rulesForFirstWeek: Number,
    firstDayOfWeek: [Number, null]
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "change-focus": (_day) => true,
    rangeHoverEndDate: (_day) => true,
    select: (_day) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  watch: {
    day(day) {
      const refName = `day-${this.month}-${day}`;
      this.$nextTick(() => {
        let cell;
        if (Array.isArray(this.$refs[refName])) {
          cell = this.$refs[refName][0];
        } else {
          cell = this.$refs[refName];
        }
        if (cell) {
          cell.focus();
        }
      });
    }
  },
  methods: {
    firstWeekOffset(year, dow, doy) {
      const fwd = 7 + dow - doy;
      const firstJanuary = new Date(year, 0, fwd);
      const fwdlw = (7 + firstJanuary.getDay() - dow) % 7;
      return -fwdlw + fwd - 1;
    },
    daysInYear(year) {
      return this.isLeapYear(year) ? 366 : 365;
    },
    isLeapYear(year) {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },
    getSetDayOfYear(input) {
      return Math.round((+input - +new Date(input.getFullYear(), 0, 1)) / 864e5) + 1;
    },
    weeksInYear(year, dow, doy) {
      const weekOffset = this.firstWeekOffset(year, dow, doy);
      const weekOffsetNext = this.firstWeekOffset(year + 1, dow, doy);
      return (this.daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    },
    getWeekNumber(mom) {
      const dow = this.firstDayOfWeek;
      const doy = this.rulesForFirstWeek;
      const weekOffset = this.firstWeekOffset(mom.getFullYear(), dow, doy);
      const week = Math.floor((this.getSetDayOfYear(mom) - weekOffset - 1) / 7) + 1;
      let resWeek;
      let resYear;
      if (week < 1) {
        resYear = mom.getFullYear() - 1;
        resWeek = week + this.weeksInYear(resYear, dow, doy);
      } else if (week > this.weeksInYear(mom.getFullYear(), dow, doy)) {
        resWeek = week - this.weeksInYear(mom.getFullYear(), dow, doy);
        resYear = mom.getFullYear() + 1;
      } else {
        resYear = mom.getFullYear();
        resWeek = week;
      }
      return { week: resWeek, year: resYear };
    },
    clickWeekNumber(weekData) {
      if (this.weekNumberClickable) {
        this.$datepicker.$emit("week-number-click", weekData.week, weekData.year);
      }
    },
    /*
     * Check that selected day is within earliest/latest params and
     * is within this month
     */
    selectableDate(day) {
      const validity = [];
      if (this.minDate) {
        validity.push(day >= this.minDate);
      }
      if (this.maxDate) {
        validity.push(day <= this.maxDate);
      }
      if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
        validity.push(day.getMonth() === this.month);
      }
      if (this.selectableDates) {
        if (typeof this.selectableDates === "function") {
          if (this.selectableDates(day)) {
            return true;
          } else {
            validity.push(false);
          }
        } else {
          for (let i = 0; i < this.selectableDates.length; i++) {
            const enabledDate = this.selectableDates[i];
            if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
              return true;
            } else {
              validity.push(false);
            }
          }
        }
      }
      if (this.unselectableDates) {
        if (typeof this.unselectableDates === "function") {
          validity.push(!this.unselectableDates(day));
        } else {
          for (let i = 0; i < this.unselectableDates.length; i++) {
            const disabledDate = this.unselectableDates[i];
            validity.push(
              day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth()
            );
          }
        }
      }
      if (this.unselectableDaysOfWeek) {
        for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
          const dayOfWeek = this.unselectableDaysOfWeek[i];
          validity.push(day.getDay() !== dayOfWeek);
        }
      }
      return validity.indexOf(false) < 0;
    },
    /*
    * Emit select event with chosen date as payload
    */
    emitChosenDate(day) {
      if (this.disabled) return;
      if (this.selectableDate(day)) {
        this.$emit("select", day);
      }
    },
    // TODO: return undefined instead of boolean if no events
    eventsDateMatch(day) {
      if (!this.events || !this.events.length) return false;
      const dayEvents = [];
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].date.getDay() === day.getDay()) {
          dayEvents.push(this.events[i]);
        }
      }
      if (!dayEvents.length) {
        return false;
      }
      return dayEvents;
    },
    /*
    * Build classObject for cell using validations
    */
    classObject(day) {
      function dateMatch(dateOne, dateTwo, multiple) {
        if (!dateOne || !dateTwo || multiple) {
          return false;
        }
        if (Array.isArray(dateTwo)) {
          return dateTwo.some((date) => dateOne.getDate() === date.getDate() && dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
        }
        return dateOne.getDate() === dateTwo.getDate() && dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
      }
      function dateWithin(dateOne, dates, multiple) {
        if (!Array.isArray(dates) || multiple) {
          return false;
        }
        return dateOne > dates[0] && dateOne < dates[1];
      }
      return {
        "is-selected": dateMatch(day, this.selectedDate) || dateWithin(day, this.selectedDate, this.multiple),
        "is-first-selected": dateMatch(
          day,
          Array.isArray(this.selectedDate) ? this.selectedDate[0] : void 0,
          this.multiple
        ),
        "is-within-selected": dateWithin(day, this.selectedDate, this.multiple),
        "is-last-selected": dateMatch(
          day,
          Array.isArray(this.selectedDate) ? this.selectedDate[1] : void 0,
          this.multiple
        ),
        "is-within-hovered-range": this.hoveredDateRange && this.hoveredDateRange.length === 2 && (dateMatch(day, this.hoveredDateRange) || dateWithin(day, this.hoveredDateRange)),
        "is-first-hovered": dateMatch(
          day,
          Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[0] : void 0
        ),
        "is-within-hovered": dateWithin(day, this.hoveredDateRange),
        "is-last-hovered": dateMatch(
          day,
          Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[1] : void 0
        ),
        "is-today": dateMatch(day, this.dateCreator()),
        "is-selectable": this.selectableDate(day) && !this.disabled,
        "is-unselectable": !this.selectableDate(day) || this.disabled,
        "is-invisible": !this.nearbyMonthDays && day.getMonth() !== this.month,
        "is-nearby": this.nearbySelectableMonthDays && day.getMonth() !== this.month,
        "has-event": this.eventsDateMatch(day),
        [this.indicators]: this.eventsDateMatch(day)
      };
    },
    setRangeHoverEndDate(day) {
      if (this.range) {
        this.$emit("rangeHoverEndDate", day);
      }
    },
    manageKeydown(event, weekDay) {
      const { key } = event;
      let preventDefault = true;
      switch (key) {
        case "Tab": {
          preventDefault = false;
          break;
        }
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
          this.emitChosenDate(weekDay);
          break;
        }
        case "ArrowLeft":
        case "Left": {
          this.changeFocus(weekDay, -1);
          break;
        }
        case "ArrowRight":
        case "Right": {
          this.changeFocus(weekDay, 1);
          break;
        }
        case "ArrowUp":
        case "Up": {
          this.changeFocus(weekDay, -7);
          break;
        }
        case "ArrowDown":
        case "Down": {
          this.changeFocus(weekDay, 7);
          break;
        }
      }
      if (preventDefault) {
        event.preventDefault();
      }
    },
    changeFocus(day, inc) {
      const nextDay = new Date(day.getTime());
      nextDay.setDate(day.getDate() + inc);
      while ((!this.minDate || nextDay > this.minDate) && (!this.maxDate || nextDay < this.maxDate) && !this.selectableDate(nextDay)) {
        nextDay.setDate(nextDay.getDate() + Math.sign(inc));
      }
      this.setRangeHoverEndDate(nextDay);
      this.$emit("change-focus", nextDay);
    }
  }
});

const _hoisted_1$A = { class: "datepicker-row" };
const _hoisted_2$v = ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"];
const _hoisted_3$j = {
  key: 0,
  class: "events"
};
const _hoisted_4$e = {
  key: 0,
  class: "events"
};
function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      createCommentVNode(" eslint-disable max-len "),
      createElementVNode("div", _hoisted_1$A, [
        _ctx.showWeekNumber ? (openBlock(), createElementBlock(
          "a",
          {
            key: 0,
            class: normalizeClass(["datepicker-cell is-week-number", { "is-clickable": _ctx.weekNumberClickable }]),
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.clickWeekNumber(_ctx.getWeekNumber(_ctx.week[6])), ["prevent"]))
          },
          [
            createElementVNode(
              "span",
              null,
              toDisplayString(_ctx.getWeekNumber(_ctx.week[6]).week),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true),
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.week, (weekDay, index) => {
            return openBlock(), createElementBlock(
              Fragment,
              { key: index },
              [
                _ctx.selectableDate(weekDay) && !_ctx.disabled ? (openBlock(), createElementBlock("a", {
                  key: 0,
                  ref_for: true,
                  ref: `day-${weekDay.getMonth()}-${weekDay.getDate()}`,
                  class: normalizeClass([_ctx.classObject(weekDay), "datepicker-cell"]),
                  role: "button",
                  href: "#",
                  disabled: _ctx.disabled || void 0,
                  onClick: withModifiers(($event) => _ctx.emitChosenDate(weekDay), ["prevent"]),
                  onMouseenter: ($event) => _ctx.setRangeHoverEndDate(weekDay),
                  onKeydown: ($event) => _ctx.manageKeydown($event, weekDay),
                  tabindex: _ctx.day === weekDay.getDate() && _ctx.month === weekDay.getMonth() ? void 0 : -1
                }, [
                  createElementVNode(
                    "span",
                    null,
                    toDisplayString(weekDay.getDate()),
                    1
                    /* TEXT */
                  ),
                  _ctx.eventsDateMatch(weekDay) ? (openBlock(), createElementBlock("div", _hoisted_3$j, [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(_ctx.eventsDateMatch(weekDay), (event, evIdx) => {
                        return openBlock(), createElementBlock(
                          "div",
                          {
                            class: normalizeClass(["event", event.type]),
                            key: evIdx
                          },
                          null,
                          2
                          /* CLASS */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])) : createCommentVNode("v-if", true)
                ], 42, _hoisted_2$v)) : (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 1,
                    class: normalizeClass([_ctx.classObject(weekDay), "datepicker-cell"])
                  },
                  [
                    createElementVNode(
                      "span",
                      null,
                      toDisplayString(weekDay.getDate()),
                      1
                      /* TEXT */
                    ),
                    _ctx.eventsDateMatch(weekDay) ? (openBlock(), createElementBlock("div", _hoisted_4$e, [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.eventsDateMatch(weekDay), (event, evIdx) => {
                          return openBlock(), createElementBlock(
                            "div",
                            {
                              class: normalizeClass(["event", event.type]),
                              key: evIdx
                            },
                            null,
                            2
                            /* CLASS */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])) : createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                ))
              ],
              64
              /* STABLE_FRAGMENT */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      createCommentVNode(" eslint-enable max-len ")
    ],
    2112
    /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}
var BDatepickerTableRow = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$F]]);

var _sfc_main$t = defineComponent({
  name: "BDatepickerTable",
  components: {
    BDatepickerTableRow
  },
  props: {
    modelValue: {
      type: [Date, Array, null]
    },
    dayNames: [Array, null],
    monthNames: [Array, null],
    firstDayOfWeek: [Number, null],
    events: Array,
    indicators: String,
    minDate: [Date, null],
    maxDate: [Date, null],
    focused: Object,
    disabled: Boolean,
    dateCreator: Function,
    unselectableDates: [Array, Function, null],
    unselectableDaysOfWeek: [Array, null],
    selectableDates: [Array, Function, null],
    nearbyMonthDays: Boolean,
    nearbySelectableMonthDays: Boolean,
    showWeekNumber: Boolean,
    weekNumberClickable: Boolean,
    rulesForFirstWeek: Number,
    range: Boolean,
    multiple: Boolean
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "range-end": (_date) => true,
    "range-start": (_date) => true,
    "update:focused": (_focused) => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      selectedBeginDate: void 0,
      selectedEndDate: void 0,
      hoveredEndDate: void 0
    };
  },
  computed: {
    multipleSelectedDates: {
      get() {
        return this.multiple && this.modelValue ? this.modelValue : [];
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    },
    visibleDayNames() {
      const visibleDayNames = [];
      let index = this.firstDayOfWeek;
      while (visibleDayNames.length < this.dayNames.length) {
        const currentDayName = this.dayNames[index % this.dayNames.length];
        visibleDayNames.push(currentDayName);
        index++;
      }
      if (this.showWeekNumber) visibleDayNames.unshift("");
      return visibleDayNames;
    },
    hasEvents() {
      return this.events && this.events.length;
    },
    /*
    * Return array of all events in the specified month
    */
    eventsInThisMonth() {
      if (!this.events) return [];
      const monthEvents = [];
      for (let i = 0; i < this.events.length; i++) {
        let event = this.events[i];
        if (!Object.prototype.hasOwnProperty.call(event, "date")) {
          event = { date: event, type: "is-primary" };
        }
        if (!Object.prototype.hasOwnProperty.call(event, "type")) {
          event.type = "is-primary";
        }
        if (event.date.getMonth() === this.focused.month && event.date.getFullYear() === this.focused.year) {
          monthEvents.push(event);
        }
      }
      return monthEvents;
    },
    /*
    * Return array of all weeks in the specified month
    */
    weeksInThisMonth() {
      this.validateFocusedDay();
      const month = this.focused.month;
      const year = this.focused.year;
      const weeksInThisMonth = [];
      let startingDay = 1;
      while (weeksInThisMonth.length < 6) {
        const newWeek = this.weekBuilder(startingDay, month, year);
        weeksInThisMonth.push(newWeek);
        startingDay += 7;
      }
      return weeksInThisMonth;
    },
    hoveredDateRange() {
      var _a, _b;
      if (!this.range) {
        return [];
      }
      if (!isNaN((_b = (_a = this.selectedEndDate) == null ? void 0 : _a.valueOf()) != null ? _b : NaN)) {
        return [];
      }
      if (this.hoveredEndDate < this.selectedBeginDate) {
        return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined);
      }
      return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined);
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  methods: {
    /*
    * Emit input event with selected date as payload for v-model in parent
    */
    updateSelectedDate(date) {
      if (!this.range && !this.multiple) {
        this.$emit("update:modelValue", date);
      } else if (this.range) {
        this.handleSelectRangeDate(date);
      } else if (this.multiple) {
        this.handleSelectMultipleDates(date);
      }
    },
    /*
    * If both begin and end dates are set, reset the end date and set the begin date.
    * If only begin date is selected, emit an array of the begin date and the new date.
    * If not set, only set the begin date.
    */
    handleSelectRangeDate(date) {
      if (this.selectedBeginDate && this.selectedEndDate) {
        this.selectedBeginDate = date;
        this.selectedEndDate = void 0;
        this.$emit("range-start", date);
      } else if (this.selectedBeginDate && !this.selectedEndDate) {
        if (this.selectedBeginDate > date) {
          this.selectedEndDate = this.selectedBeginDate;
          this.selectedBeginDate = date;
        } else {
          this.selectedEndDate = date;
        }
        this.$emit("range-end", date);
        this.$emit("update:modelValue", [this.selectedBeginDate, this.selectedEndDate]);
      } else {
        this.selectedBeginDate = date;
        this.$emit("range-start", date);
      }
    },
    /*
    * If selected date already exists list of selected dates, remove it from the list
    * Otherwise, add date to list of selected dates
    */
    handleSelectMultipleDates(date) {
      const multipleSelect = this.multipleSelectedDates.filter(
        (selectedDate) => selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth()
      );
      if (multipleSelect.length) {
        this.multipleSelectedDates = this.multipleSelectedDates.filter(
          (selectedDate) => selectedDate.getDate() !== date.getDate() || selectedDate.getFullYear() !== date.getFullYear() || selectedDate.getMonth() !== date.getMonth()
        );
      } else {
        this.multipleSelectedDates = [...this.multipleSelectedDates, date];
      }
    },
    /*
     * Return array of all days in the week that the startingDate is within
     */
    weekBuilder(startingDate, month, year) {
      const thisMonth = new Date(year, month);
      const thisWeek = [];
      const dayOfWeek = new Date(year, month, startingDate).getDay();
      const end = dayOfWeek >= this.firstDayOfWeek ? dayOfWeek - this.firstDayOfWeek : 7 - this.firstDayOfWeek + dayOfWeek;
      let daysAgo = 1;
      for (let i = 0; i < end; i++) {
        thisWeek.unshift(
          new Date(
            thisMonth.getFullYear(),
            thisMonth.getMonth(),
            startingDate - daysAgo
          )
        );
        daysAgo++;
      }
      thisWeek.push(new Date(year, month, startingDate));
      let daysForward = 1;
      while (thisWeek.length < 7) {
        thisWeek.push(new Date(year, month, startingDate + daysForward));
        daysForward++;
      }
      return thisWeek;
    },
    validateFocusedDay() {
      const focusedDate = new Date(this.focused.year, this.focused.month, this.focused.day);
      if (this.selectableDate(focusedDate)) return;
      let day = 0;
      const monthDays = new Date(this.focused.year, this.focused.month + 1, 0).getDate();
      let firstFocusable = null;
      while (!firstFocusable && ++day < monthDays) {
        const date = new Date(this.focused.year, this.focused.month, day);
        if (this.selectableDate(date)) {
          firstFocusable = focusedDate;
          const focused = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
          };
          this.$emit("update:focused", focused);
        }
      }
    },
    /*
     * Check that selected day is within earliest/latest params and
     * is within this month
     */
    selectableDate(day) {
      const validity = [];
      if (this.minDate) {
        validity.push(day >= this.minDate);
      }
      if (this.maxDate) {
        validity.push(day <= this.maxDate);
      }
      if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
        validity.push(day.getMonth() === this.focused.month);
      }
      if (this.selectableDates) {
        if (typeof this.selectableDates === "function") {
          if (this.selectableDates(day)) {
            return true;
          } else {
            validity.push(false);
          }
        } else {
          for (let i = 0; i < this.selectableDates.length; i++) {
            const enabledDate = this.selectableDates[i];
            if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
              return true;
            } else {
              validity.push(false);
            }
          }
        }
      }
      if (this.unselectableDates) {
        if (typeof this.unselectableDates === "function") {
          validity.push(!this.unselectableDates(day));
        } else {
          for (let i = 0; i < this.unselectableDates.length; i++) {
            const disabledDate = this.unselectableDates[i];
            validity.push(
              day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth()
            );
          }
        }
      }
      if (this.unselectableDaysOfWeek) {
        for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
          const dayOfWeek = this.unselectableDaysOfWeek[i];
          validity.push(day.getDay() !== dayOfWeek);
        }
      }
      return validity.indexOf(false) < 0;
    },
    eventsInThisWeek(week) {
      return this.eventsInThisMonth.filter((event) => {
        const stripped = new Date(Date.parse(event.date + ""));
        stripped.setHours(0, 0, 0, 0);
        const timed = stripped.getTime();
        return week.some((weekDate) => weekDate.getTime() === timed);
      });
    },
    setRangeHoverEndDate(day) {
      this.hoveredEndDate = day;
    },
    changeFocus(day) {
      const focused = {
        day: day.getDate(),
        month: day.getMonth(),
        year: day.getFullYear()
      };
      this.$emit("update:focused", focused);
    }
  }
});

const _hoisted_1$z = { class: "datepicker-table" };
const _hoisted_2$u = { class: "datepicker-header" };
function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_datepicker_table_row = resolveComponent("b-datepicker-table-row");
  return openBlock(), createElementBlock("section", _hoisted_1$z, [
    createElementVNode("header", _hoisted_2$u, [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.visibleDayNames, (day, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "datepicker-cell"
          }, [
            createElementVNode(
              "span",
              null,
              toDisplayString(day),
              1
              /* TEXT */
            )
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]),
    createElementVNode(
      "div",
      {
        class: normalizeClass(["datepicker-body", { "has-events": _ctx.hasEvents }])
      },
      [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.weeksInThisMonth, (week, index) => {
            return openBlock(), createBlock(_component_b_datepicker_table_row, {
              key: index,
              "selected-date": _ctx.modelValue ?? void 0,
              day: _ctx.focused.day,
              week,
              month: _ctx.focused.month,
              "min-date": _ctx.minDate,
              "max-date": _ctx.maxDate,
              disabled: _ctx.disabledOrUndefined,
              "unselectable-dates": _ctx.unselectableDates,
              "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
              "selectable-dates": _ctx.selectableDates,
              events: _ctx.eventsInThisWeek(week),
              indicators: _ctx.indicators,
              "date-creator": _ctx.dateCreator,
              "nearby-month-days": _ctx.nearbyMonthDays,
              "nearby-selectable-month-days": _ctx.nearbySelectableMonthDays,
              "show-week-number": _ctx.showWeekNumber,
              "week-number-clickable": _ctx.weekNumberClickable,
              "first-day-of-week": _ctx.firstDayOfWeek,
              "rules-for-first-week": _ctx.rulesForFirstWeek,
              range: _ctx.range,
              "hovered-date-range": _ctx.hoveredDateRange,
              onSelect: _ctx.updateSelectedDate,
              onRangeHoverEndDate: _ctx.setRangeHoverEndDate,
              multiple: _ctx.multiple,
              onChangeFocus: _ctx.changeFocus
            }, null, 8, ["selected-date", "day", "week", "month", "min-date", "max-date", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "first-day-of-week", "rules-for-first-week", "range", "hovered-date-range", "onSelect", "onRangeHoverEndDate", "multiple", "onChangeFocus"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      2
      /* CLASS */
    )
  ]);
}
var BDatepickerTable = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$E]]);

var _sfc_main$s = defineComponent({
  name: "BDatepickerMonth",
  props: {
    modelValue: {
      type: [Date, Array, null]
    },
    monthNames: [Array, null],
    events: Array,
    indicators: String,
    minDate: [Date, null],
    maxDate: [Date, null],
    focused: Object,
    disabled: Boolean,
    dateCreator: Function,
    unselectableDates: [Array, Function, null],
    unselectableDaysOfWeek: [Array, null],
    selectableDates: [Array, Function, null],
    range: Boolean,
    multiple: Boolean
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "change-focus": (_date) => true,
    "range-end": (_date) => true,
    "range-start": (_date) => true,
    "update:modelValue": (_date) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      selectedBeginDate: void 0,
      selectedEndDate: void 0,
      hoveredEndDate: void 0,
      multipleSelectedDates: this.multiple && this.modelValue ? this.modelValue : []
    };
  },
  computed: {
    hasEvents() {
      return this.events && this.events.length;
    },
    /*
    * Return array of all events in the specified month
    */
    eventsInThisYear() {
      if (!this.events) return [];
      const yearEvents = [];
      for (let i = 0; i < this.events.length; i++) {
        let event = this.events[i];
        if (!Object.prototype.hasOwnProperty.call(event, "date")) {
          event = { date: event, type: "is-primary" };
        }
        if (!Object.prototype.hasOwnProperty.call(event, "type")) {
          event.type = "is-primary";
        }
        if (event.date.getFullYear() === this.focused.year) {
          yearEvents.push(event);
        }
      }
      return yearEvents;
    },
    monthDates() {
      const year = this.focused.year;
      const months = [];
      for (let i = 0; i < 12; i++) {
        const d = new Date(year, i, 1);
        d.setHours(0, 0, 0, 0);
        months.push(d);
      }
      return months;
    },
    focusedMonth() {
      return this.focused.month;
    },
    hoveredDateRange() {
      var _a, _b;
      if (!this.range) {
        return [];
      }
      if (!isNaN((_b = (_a = this.selectedEndDate) == null ? void 0 : _a.valueOf()) != null ? _b : NaN)) {
        return [];
      }
      if (this.hoveredEndDate < this.selectedBeginDate) {
        return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined);
      }
      return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined);
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    focusedMonth(month) {
      const refName = `month-${month}`;
      this.$nextTick(() => {
        let cell;
        if (Array.isArray(this.$refs[refName])) {
          cell = this.$refs[refName][0];
        } else {
          cell = this.$refs[refName];
        }
        if (cell) {
          cell.focus();
        }
      });
    }
  },
  methods: {
    selectMultipleDates(date) {
      const multipleSelect = this.multipleSelectedDates.filter(
        (selectedDate) => selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear() && selectedDate.getMonth() === date.getMonth()
      );
      if (multipleSelect.length) {
        this.multipleSelectedDates = this.multipleSelectedDates.filter(
          (selectedDate) => selectedDate.getDate() !== date.getDate() || selectedDate.getFullYear() !== date.getFullYear() || selectedDate.getMonth() !== date.getMonth()
        );
      } else {
        this.multipleSelectedDates.push(date);
      }
      this.$emit("update:modelValue", this.multipleSelectedDates);
    },
    selectableDate(day) {
      const validity = [];
      if (this.minDate) {
        validity.push(day >= this.minDate);
      }
      if (this.maxDate) {
        validity.push(day <= this.maxDate);
      }
      validity.push(day.getFullYear() === this.focused.year);
      if (this.selectableDates) {
        if (typeof this.selectableDates === "function") {
          if (this.selectableDates(day)) {
            return true;
          } else {
            validity.push(false);
          }
        } else {
          for (let i = 0; i < this.selectableDates.length; i++) {
            const enabledDate = this.selectableDates[i];
            if (day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
              return true;
            } else {
              validity.push(false);
            }
          }
        }
      }
      if (this.unselectableDates) {
        if (typeof this.unselectableDates === "function") {
          validity.push(!this.unselectableDates(day));
        } else {
          for (let i = 0; i < this.unselectableDates.length; i++) {
            const disabledDate = this.unselectableDates[i];
            validity.push(
              day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth()
            );
          }
        }
      }
      if (this.unselectableDaysOfWeek) {
        for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
          const dayOfWeek = this.unselectableDaysOfWeek[i];
          validity.push(day.getDay() !== dayOfWeek);
        }
      }
      return validity.indexOf(false) < 0;
    },
    // TODO: return undefined instead of false if no events
    eventsDateMatch(day) {
      if (!this.eventsInThisYear.length) return false;
      const monthEvents = [];
      for (let i = 0; i < this.eventsInThisYear.length; i++) {
        if (this.eventsInThisYear[i].date.getMonth() === day.getMonth()) {
          monthEvents.push(this.events[i]);
        }
      }
      if (!monthEvents.length) {
        return false;
      }
      return monthEvents;
    },
    /*
    * Build classObject for cell using validations
    */
    classObject(day) {
      function dateMatch(dateOne, dateTwo, multiple) {
        if (!dateOne || !dateTwo || multiple) {
          return false;
        }
        if (Array.isArray(dateTwo)) {
          return dateTwo.some((date) => dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
        }
        return dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
      }
      function dateWithin(dateOne, dates, multiple) {
        if (!Array.isArray(dates) || multiple) {
          return false;
        }
        return dateOne > dates[0] && dateOne < dates[1];
      }
      function dateMultipleSelected(dateOne, dates, multiple) {
        if (!Array.isArray(dates) || !multiple) {
          return false;
        }
        return dates.some((date) => dateOne.getDate() === date.getDate() && dateOne.getFullYear() === date.getFullYear() && dateOne.getMonth() === date.getMonth());
      }
      return {
        "is-selected": dateMatch(day, this.modelValue, this.multiple) || dateWithin(day, this.modelValue, this.multiple) || dateMultipleSelected(day, this.multipleSelectedDates, this.multiple),
        "is-first-selected": dateMatch(
          day,
          Array.isArray(this.modelValue) ? this.modelValue[0] : void 0,
          this.multiple
        ),
        "is-within-selected": dateWithin(day, this.modelValue, this.multiple),
        "is-last-selected": dateMatch(
          day,
          Array.isArray(this.modelValue) ? this.modelValue[1] : void 0,
          this.multiple
        ),
        "is-within-hovered-range": this.hoveredDateRange && this.hoveredDateRange.length === 2 && (dateMatch(day, this.hoveredDateRange) || dateWithin(day, this.hoveredDateRange)),
        "is-first-hovered": dateMatch(
          day,
          Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[0] : void 0
        ),
        "is-within-hovered": dateWithin(day, this.hoveredDateRange),
        "is-last-hovered": dateMatch(
          day,
          Array.isArray(this.hoveredDateRange) ? this.hoveredDateRange[1] : void 0
        ),
        "is-today": dateMatch(day, this.dateCreator()),
        "is-selectable": this.selectableDate(day) && !this.disabled,
        "is-unselectable": !this.selectableDate(day) || this.disabled
      };
    },
    manageKeydown({ key }, date) {
      switch (key) {
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
          this.updateSelectedDate(date);
          break;
        }
        case "ArrowLeft":
        case "Left": {
          this.changeFocus(date, -1);
          break;
        }
        case "ArrowRight":
        case "Right": {
          this.changeFocus(date, 1);
          break;
        }
        case "ArrowUp":
        case "Up": {
          this.changeFocus(date, -3);
          break;
        }
        case "ArrowDown":
        case "Down": {
          this.changeFocus(date, 3);
          break;
        }
      }
    },
    /*
    * Emit input event with selected date as payload for v-model in parent
    */
    updateSelectedDate(date) {
      if (!this.range && !this.multiple) {
        this.emitChosenDate(date);
      } else if (this.range) {
        this.handleSelectRangeDate(date);
      } else if (this.multiple) {
        this.selectMultipleDates(date);
      }
    },
    /*
     * Emit select event with chosen date as payload
     */
    emitChosenDate(day) {
      if (this.disabled) return;
      if (!this.multiple) {
        if (this.selectableDate(day)) {
          this.$emit("update:modelValue", day);
        }
      } else {
        this.selectMultipleDates(day);
      }
    },
    /*
    * If both begin and end dates are set, reset the end date and set the begin date.
    * If only begin date is selected, emit an array of the begin date and the new date.
    * If not set, only set the begin date.
    */
    handleSelectRangeDate(date) {
      if (this.disabled) return;
      if (this.selectedBeginDate && this.selectedEndDate) {
        this.selectedBeginDate = date;
        this.selectedEndDate = void 0;
        this.$emit("range-start", date);
      } else if (this.selectedBeginDate && !this.selectedEndDate) {
        if (this.selectedBeginDate > date) {
          this.selectedEndDate = this.selectedBeginDate;
          this.selectedBeginDate = date;
        } else {
          this.selectedEndDate = date;
        }
        this.$emit("range-end", date);
        this.$emit("update:modelValue", [this.selectedBeginDate, this.selectedEndDate]);
      } else {
        this.selectedBeginDate = date;
        this.$emit("range-start", date);
      }
    },
    setRangeHoverEndDate(day) {
      if (this.range) {
        this.hoveredEndDate = day;
      }
    },
    changeFocus(month, inc) {
      const nextMonth = month;
      nextMonth.setMonth(month.getMonth() + inc);
      this.$emit("change-focus", nextMonth);
    }
  }
});

const _hoisted_1$y = { class: "datepicker-table" };
const _hoisted_2$t = { class: "datepicker-months" };
const _hoisted_3$i = ["disabled", "onClick", "onMouseenter", "onKeydown", "tabindex"];
const _hoisted_4$d = {
  key: 0,
  class: "events"
};
function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", _hoisted_1$y, [
    createElementVNode(
      "div",
      {
        class: normalizeClass(["datepicker-body", { "has-events": _ctx.hasEvents }])
      },
      [
        createElementVNode("div", _hoisted_2$t, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.monthDates, (date, index) => {
              return openBlock(), createElementBlock(
                Fragment,
                { key: index },
                [
                  _ctx.selectableDate(date) && !_ctx.disabled ? (openBlock(), createElementBlock("a", {
                    key: 0,
                    ref_for: true,
                    ref: `month-${date.getMonth()}`,
                    class: normalizeClass([[
                      _ctx.classObject(date),
                      { "has-event": _ctx.eventsDateMatch(date) },
                      _ctx.indicators
                    ], "datepicker-cell"]),
                    role: "button",
                    href: "#",
                    disabled: _ctx.disabledOrUndefined,
                    onClick: withModifiers(($event) => _ctx.updateSelectedDate(date), ["prevent"]),
                    onMouseenter: ($event) => _ctx.setRangeHoverEndDate(date),
                    onKeydown: withModifiers(($event) => _ctx.manageKeydown($event, date), ["prevent"]),
                    tabindex: _ctx.focused.month === date.getMonth() ? void 0 : -1
                  }, [
                    createTextVNode(
                      toDisplayString(_ctx.monthNames[date.getMonth()]) + " ",
                      1
                      /* TEXT */
                    ),
                    _ctx.eventsDateMatch(date) ? (openBlock(), createElementBlock("div", _hoisted_4$d, [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.eventsDateMatch(date), (event, evIdx) => {
                          return openBlock(), createElementBlock(
                            "div",
                            {
                              class: normalizeClass(["event", event.type]),
                              key: evIdx
                            },
                            null,
                            2
                            /* CLASS */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])) : createCommentVNode("v-if", true)
                  ], 42, _hoisted_3$i)) : (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 1,
                      class: normalizeClass([_ctx.classObject(date), "datepicker-cell"])
                    },
                    toDisplayString(_ctx.monthNames[date.getMonth()]),
                    3
                    /* TEXT, CLASS */
                  ))
                ],
                64
                /* STABLE_FRAGMENT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ],
      2
      /* CLASS */
    )
  ]);
}
var BDatepickerMonth = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$D]]);

const defaultDateFormatter = (date, vm) => {
  const targetDates = Array.isArray(date) ? date : [date];
  const dates = targetDates.map((date2) => {
    const d = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), 12);
    return !vm.isTypeMonth ? vm.dtf.format(d) : vm.dtfMonth.format(d);
  });
  return !vm.multiple ? dates.join(" - ") : dates.join(", ");
};
const defaultDateParser = (date, vm) => {
  if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === "function") {
    const formatRegex = (vm.isTypeMonth ? vm.dtfMonth : vm.dtf).formatToParts(new Date(2e3, 11, 25)).map((part) => {
      if (part.type === "literal") {
        return part.value;
      }
      return `((?!=<${part.type}>)\\d+)`;
    }).join("");
    const dateGroups = matchWithGroups(formatRegex, date);
    if (dateGroups.year && dateGroups.year.length === 4 && dateGroups.month && +dateGroups.month <= 12) {
      if (vm.isTypeMonth) return new Date(+dateGroups.year, +dateGroups.month - 1);
      else if (dateGroups.day && +dateGroups.day <= 31) {
        return new Date(+dateGroups.year, +dateGroups.month - 1, +dateGroups.day, 12);
      }
    }
  }
  if (!vm.isTypeMonth) return new Date(Date.parse(date));
  if (date) {
    const s = date.split("/");
    const year = s[0].length === 4 ? s[0] : s[1];
    const month = s[0].length === 2 ? s[0] : s[1];
    if (year && month) {
      return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1, 0, 0, 0, 0);
    }
  }
  return null;
};
var _sfc_main$r = defineComponent({
  name: "BDatepicker",
  components: {
    BDatepickerTable,
    BDatepickerMonth,
    BInput,
    BField: Field,
    BSelect,
    BIcon,
    BDropdown,
    BDropdownItem
  },
  mixins: [CompatFallthroughMixin, FormElementMixin],
  provide() {
    return {
      $datepicker: this
    };
  },
  props: {
    modelValue: {
      type: [Date, Array, null]
    },
    dayNames: {
      type: [Array, null],
      default: () => {
        if (!Array.isArray(config.defaultDayNames)) {
          return void 0;
        }
        return config.defaultDayNames;
      }
    },
    monthNames: {
      type: [Array, null],
      default: () => {
        if (!Array.isArray(config.defaultMonthNames)) {
          return void 0;
        }
        return config.defaultMonthNames;
      }
    },
    firstDayOfWeek: {
      type: Number,
      default: () => {
        if (typeof config.defaultFirstDayOfWeek === "number") {
          return config.defaultFirstDayOfWeek;
        } else {
          return 0;
        }
      }
    },
    inline: Boolean,
    minDate: [Date, null],
    maxDate: [Date, null],
    focusedDate: Date,
    placeholder: String,
    editable: Boolean,
    disabled: Boolean,
    horizontalTimePicker: Boolean,
    unselectableDates: [Array, Function],
    unselectableDaysOfWeek: {
      type: [Array, null],
      default: () => config.defaultUnselectableDaysOfWeek
    },
    selectableDates: [Array, Function],
    dateFormatter: {
      type: Function,
      default: (date, vm) => {
        if (typeof config.defaultDateFormatter === "function") {
          return config.defaultDateFormatter(date);
        } else {
          return defaultDateFormatter(date, vm);
        }
      }
    },
    dateParser: {
      type: Function,
      default: (date, vm) => {
        if (typeof config.defaultDateParser === "function") {
          return config.defaultDateParser(date);
        } else {
          return defaultDateParser(date, vm);
        }
      }
    },
    dateCreator: {
      type: Function,
      default: () => {
        if (typeof config.defaultDateCreator === "function") {
          return config.defaultDateCreator();
        } else {
          return /* @__PURE__ */ new Date();
        }
      }
    },
    mobileNative: {
      type: Boolean,
      default: () => config.defaultDatepickerMobileNative
    },
    position: String,
    iconRight: String,
    iconRightClickable: Boolean,
    events: Array,
    indicators: {
      type: String,
      default: "dots"
    },
    openOnFocus: Boolean,
    iconPrev: {
      type: String,
      default: () => config.defaultIconPrev
    },
    iconNext: {
      type: String,
      default: () => config.defaultIconNext
    },
    yearsRange: {
      type: Array,
      default: () => config.defaultDatepickerYearsRange
    },
    type: {
      type: String,
      validator: (value) => {
        return [
          "month"
        ].indexOf(value) >= 0;
      }
    },
    nearbyMonthDays: {
      type: Boolean,
      default: () => config.defaultDatepickerNearbyMonthDays
    },
    nearbySelectableMonthDays: {
      type: Boolean,
      default: () => config.defaultDatepickerNearbySelectableMonthDays
    },
    showWeekNumber: {
      type: Boolean,
      default: () => config.defaultDatepickerShowWeekNumber
    },
    weekNumberClickable: {
      type: Boolean,
      default: () => config.defaultDatepickerWeekNumberClickable
    },
    rulesForFirstWeek: {
      type: Number,
      default: () => 4
    },
    range: {
      type: Boolean,
      default: false
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    mobileModal: {
      type: Boolean,
      default: () => config.defaultDatepickerMobileModal
    },
    focusable: {
      type: Boolean,
      default: true
    },
    trapFocus: {
      type: Boolean,
      default: () => config.defaultTrapFocus
    },
    appendToBody: Boolean,
    ariaNextLabel: String,
    ariaPreviousLabel: String
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "active-change": (_active) => true,
    "change-month": (_month) => true,
    "change-year": (_year) => true,
    "icon-right-click": (_event) => true,
    "range-end": (_date) => true,
    "range-start": (_date) => true,
    "update:modelValue": (_value) => true,
    "week-number-click": (_week, _year) => true
    // emitted by `DatepickerTableRow`
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    const focusedDate = (Array.isArray(this.modelValue) ? this.modelValue[0] : this.modelValue) || this.focusedDate || this.dateCreator();
    if (!this.modelValue && this.maxDate && this.maxDate.getFullYear() < focusedDate.getFullYear()) {
      focusedDate.setFullYear(this.maxDate.getFullYear());
    }
    return {
      dateSelected: this.modelValue,
      focusedDateData: {
        day: focusedDate.getDate(),
        month: focusedDate.getMonth(),
        year: focusedDate.getFullYear()
      },
      _elementRef: "input",
      _isDatepicker: true
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.dateSelected;
      },
      set(value) {
        this.updateInternalState(value);
        if (!this.multiple) this.togglePicker(false);
        this.$emit("update:modelValue", value);
        if (this.useHtml5Validation) {
          this.$nextTick(() => {
            this.checkHtml5Validity();
          });
        }
      }
    },
    formattedValue() {
      return this.formatValue(this.computedValue);
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        year: "numeric",
        month: "numeric"
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(this.locale);
    },
    dtfMonth() {
      return new Intl.DateTimeFormat(this.locale, {
        year: this.localeOptions.year || "numeric",
        month: this.localeOptions.month || "2-digit"
      });
    },
    newMonthNames() {
      if (Array.isArray(this.monthNames)) {
        return this.monthNames;
      }
      return getMonthNames(this.locale);
    },
    newDayNames() {
      if (Array.isArray(this.dayNames)) {
        return this.dayNames;
      }
      return getWeekdayNames(this.locale);
    },
    listOfMonths() {
      let minMonth = 0;
      let maxMonth = 12;
      if (this.minDate && this.focusedDateData.year === this.minDate.getFullYear()) {
        minMonth = this.minDate.getMonth();
      }
      if (this.maxDate && this.focusedDateData.year === this.maxDate.getFullYear()) {
        maxMonth = this.maxDate.getMonth();
      }
      return this.newMonthNames.map((name, index) => {
        return {
          name,
          index,
          disabled: index < minMonth || index > maxMonth
        };
      });
    },
    /*
     * Returns an array of years for the year dropdown. If earliest/latest
     * dates are set by props, range of years will fall within those dates.
     */
    listOfYears() {
      let latestYear = this.focusedDateData.year + this.yearsRange[1];
      if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
        latestYear = Math.max(this.maxDate.getFullYear(), this.focusedDateData.year);
      }
      let earliestYear = this.focusedDateData.year + this.yearsRange[0];
      if (this.minDate && this.minDate.getFullYear() > earliestYear) {
        earliestYear = Math.min(this.minDate.getFullYear(), this.focusedDateData.year);
      }
      const arrayOfYears = [];
      for (let i = earliestYear; i <= latestYear; i++) {
        arrayOfYears.push(i);
      }
      return arrayOfYears.reverse();
    },
    showPrev() {
      if (!this.minDate) return false;
      if (this.isTypeMonth) {
        return this.focusedDateData.year <= this.minDate.getFullYear();
      }
      const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
      const date = new Date(this.minDate.getFullYear(), this.minDate.getMonth());
      return dateToCheck <= date;
    },
    showNext() {
      if (!this.maxDate) return false;
      if (this.isTypeMonth) {
        return this.focusedDateData.year >= this.maxDate.getFullYear();
      }
      const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
      const date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());
      return dateToCheck >= date;
    },
    isMobile() {
      return this.mobileNative && isMobile.any();
    },
    isTypeMonth() {
      return this.type === "month";
    },
    ariaRole() {
      if (!this.inline) {
        return "dialog";
      } else {
        return void 0;
      }
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    /*
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue(value) {
      this.updateInternalState(value);
      if (!this.multiple) this.togglePicker(false);
    },
    focusedDate(value) {
      if (value) {
        this.focusedDateData = {
          day: value.getDate(),
          month: value.getMonth(),
          year: value.getFullYear()
        };
      }
    },
    /*
     * Emit input event on month and/or year change
     */
    "focusedDateData.month"(value) {
      this.$emit("change-month", value);
    },
    "focusedDateData.year"(value) {
      this.$emit("change-year", value);
    }
  },
  methods: {
    /*
     * Parse string into date
     */
    onChange(value) {
      const date = this.dateParser(value, this);
      if (date && (!isNaN(date.valueOf()) || Array.isArray(date) && date.length === 2 && !isNaN(date[0]) && !isNaN(date[1]))) {
        this.computedValue = date;
      } else {
        this.computedValue = null;
        if (this.$refs.input) {
          this.$refs.input.newValue = this.computedValue;
        }
      }
    },
    /*
     * Format date into string
     */
    formatValue(value) {
      if (Array.isArray(value)) {
        const isArrayWithValidDates = Array.isArray(value) && value.every((v) => {
          var _a;
          return !isNaN((_a = v == null ? void 0 : v.valueOf()) != null ? _a : NaN);
        });
        return isArrayWithValidDates ? this.dateFormatter([...value], this) : null;
      }
      return value && !isNaN(value.valueOf()) ? this.dateFormatter(value, this) : null;
    },
    /*
     * Either decrement month by 1 if not January or decrement year by 1
     * and set month to 11 (December) or decrement year when 'month'
     */
    prev() {
      if (this.disabled) return;
      if (this.isTypeMonth) {
        this.focusedDateData.year -= 1;
      } else {
        if (this.focusedDateData.month > 0) {
          this.focusedDateData.month -= 1;
        } else {
          this.focusedDateData.month = 11;
          this.focusedDateData.year -= 1;
        }
      }
    },
    /*
     * Either increment month by 1 if not December or increment year by 1
     * and set month to 0 (January) or increment year when 'month'
     */
    next() {
      if (this.disabled) return;
      if (this.isTypeMonth) {
        this.focusedDateData.year += 1;
      } else {
        if (this.focusedDateData.month < 11) {
          this.focusedDateData.month += 1;
        } else {
          this.focusedDateData.month = 0;
          this.focusedDateData.year += 1;
        }
      }
    },
    formatNative(value) {
      return this.isTypeMonth ? this.formatYYYYMM(value) : this.formatYYYYMMDD(value);
    },
    /*
     * Format date into string 'YYYY-MM-DD'
     */
    formatYYYYMMDD(value) {
      const date = new Date(value);
      if (value && !isNaN(date.valueOf())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + "-" + ((month < 10 ? "0" : "") + month) + "-" + ((day < 10 ? "0" : "") + day);
      }
      return "";
    },
    /*
     * Format date into string 'YYYY-MM'
     */
    formatYYYYMM(value) {
      const date = new Date(value);
      if (value && !isNaN(date.valueOf())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return year + "-" + ((month < 10 ? "0" : "") + month);
      }
      return "";
    },
    /*
     * Parse date from string
     */
    onChangeNativePicker(event) {
      const date = event.target.value;
      const s = date ? date.split("-") : [];
      if (s.length === 3) {
        const year = parseInt(s[0], 10);
        const month = parseInt(s[1]) - 1;
        const day = parseInt(s[2]);
        this.computedValue = new Date(year, month, day);
      } else {
        this.computedValue = null;
      }
    },
    updateInternalState(value) {
      if (this.dateSelected === value) return;
      const isArray = Array.isArray(value);
      const currentDate = isArray ? !value.length ? this.dateCreator() : value[value.length - 1] : !value ? this.dateCreator() : value;
      if (!isArray || this.dateSelected && value.length > this.dateSelected.length) {
        this.focusedDateData = {
          day: currentDate.getDate(),
          month: currentDate.getMonth(),
          year: currentDate.getFullYear()
        };
      }
      this.dateSelected = value;
    },
    /*
     * Toggle datepicker
     */
    togglePicker(active) {
      if (this.$refs.dropdown) {
        const isActive = typeof active === "boolean" ? active : !this.$refs.dropdown.isActive;
        if (isActive) {
          this.$refs.dropdown.isActive = isActive;
        } else if (this.closeOnClick) {
          this.$refs.dropdown.isActive = isActive;
        }
      }
    },
    /*
     * Call default onFocus method and show datepicker
     */
    handleOnFocus(event) {
      this.onFocus(event);
      if (this.openOnFocus) {
        this.togglePicker(true);
      }
    },
    /*
     * Toggle dropdown
     */
    toggle() {
      if (this.mobileNative && this.isMobile) {
        const input = this.$refs.input.$refs.input;
        input.focus();
        input.click();
        return;
      }
      this.$refs.dropdown.toggle();
    },
    /*
     * Avoid dropdown toggle when is already visible
     */
    onInputClick(event) {
      if (this.$refs.dropdown.isActive) {
        event.stopPropagation();
      }
    },
    /*
     * Keypress event that is bound to the document.
     */
    keyPress({ key }) {
      if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === "Escape" || key === "Esc")) {
        this.togglePicker(false);
      }
    },
    /*
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange(value) {
      if (!value) {
        this.onBlur();
      }
      this.$emit("active-change", value);
    },
    changeFocus(day) {
      this.focusedDateData = {
        day: day.getDate(),
        month: day.getMonth(),
        year: day.getFullYear()
      };
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  }
});

const _hoisted_1$x = { class: "datepicker-header" };
const _hoisted_2$s = ["disabled", "aria-label"];
const _hoisted_3$h = ["disabled", "aria-label"];
const _hoisted_4$c = { class: "pagination-list" };
const _hoisted_5$9 = ["value", "disabled"];
const _hoisted_6$7 = ["value"];
const _hoisted_7$6 = { key: 1 };
function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = resolveComponent("b-input");
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_select = resolveComponent("b-select");
  const _component_b_field = resolveComponent("b-field");
  const _component_b_datepicker_table = resolveComponent("b-datepicker-table");
  const _component_b_datepicker_month = resolveComponent("b-datepicker-month");
  const _component_b_dropdown_item = resolveComponent("b-dropdown-item");
  const _component_b_dropdown = resolveComponent("b-dropdown");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["datepicker control", [_ctx.size, { "is-expanded": _ctx.expanded }]]
    }, _ctx.rootAttrs),
    [
      !_ctx.isMobile || _ctx.inline ? (openBlock(), createBlock(_component_b_dropdown, {
        key: 0,
        ref: "dropdown",
        position: _ctx.position,
        disabled: _ctx.disabledOrUndefined,
        inline: _ctx.inline,
        "mobile-modal": _ctx.mobileModal,
        "trap-focus": _ctx.trapFocus,
        "aria-role": _ctx.ariaRole,
        "append-to-body": _ctx.appendToBody,
        "append-to-body-copy-parent": "",
        onActiveChange: _ctx.onActiveChange,
        "trigger-tabindex": -1
      }, createSlots({
        default: withCtx(() => [
          createVNode(_component_b_dropdown_item, {
            disabled: _ctx.disabledOrUndefined,
            focusable: _ctx.focusable,
            custom: "",
            class: normalizeClass({ "dropdown-horizontal-timepicker": _ctx.horizontalTimePicker })
          }, {
            default: withCtx(() => [
              createElementVNode("div", null, [
                createElementVNode("header", _hoisted_1$x, [
                  _ctx.$slots.header !== void 0 && _ctx.$slots.header([]).length ? renderSlot(_ctx.$slots, "header", { key: 0 }) : (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 1,
                      class: normalizeClass(["pagination field is-centered", _ctx.size])
                    },
                    [
                      withDirectives(createElementVNode("a", {
                        class: "pagination-previous",
                        role: "button",
                        href: "#",
                        disabled: _ctx.disabledOrUndefined,
                        "aria-label": _ctx.ariaPreviousLabel,
                        onClick: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"])),
                        onKeydown: [
                          _cache[4] || (_cache[4] = withKeys(withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"]), ["enter"])),
                          _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => _ctx.prev && _ctx.prev(...args), ["prevent"]), ["space"]))
                        ]
                      }, [
                        createVNode(_component_b_icon, {
                          icon: _ctx.iconPrev,
                          pack: _ctx.iconPack,
                          both: "",
                          type: "is-primary is-clickable"
                        }, null, 8, ["icon", "pack"])
                      ], 40, _hoisted_2$s), [
                        [vShow, !_ctx.showPrev && !_ctx.disabled]
                      ]),
                      withDirectives(createElementVNode("a", {
                        class: "pagination-next",
                        role: "button",
                        href: "#",
                        disabled: _ctx.disabledOrUndefined,
                        "aria-label": _ctx.ariaNextLabel,
                        onClick: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"])),
                        onKeydown: [
                          _cache[7] || (_cache[7] = withKeys(withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"]), ["enter"])),
                          _cache[8] || (_cache[8] = withKeys(withModifiers((...args) => _ctx.next && _ctx.next(...args), ["prevent"]), ["space"]))
                        ]
                      }, [
                        createVNode(_component_b_icon, {
                          icon: _ctx.iconNext,
                          pack: _ctx.iconPack,
                          both: "",
                          type: "is-primary is-clickable"
                        }, null, 8, ["icon", "pack"])
                      ], 40, _hoisted_3$h), [
                        [vShow, !_ctx.showNext && !_ctx.disabled]
                      ]),
                      createElementVNode("div", _hoisted_4$c, [
                        createVNode(_component_b_field, null, {
                          default: withCtx(() => [
                            !_ctx.isTypeMonth ? (openBlock(), createBlock(_component_b_select, {
                              key: 0,
                              modelValue: _ctx.focusedDateData.month,
                              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.focusedDateData.month = $event),
                              disabled: _ctx.disabledOrUndefined,
                              size: _ctx.size
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(_ctx.listOfMonths, (month) => {
                                    return openBlock(), createElementBlock("option", {
                                      value: month.index,
                                      key: month.name,
                                      disabled: month.disabled || void 0
                                    }, toDisplayString(month.name), 9, _hoisted_5$9);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["modelValue", "disabled", "size"])) : createCommentVNode("v-if", true),
                            createVNode(_component_b_select, {
                              modelValue: _ctx.focusedDateData.year,
                              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.focusedDateData.year = $event),
                              disabled: _ctx.disabledOrUndefined,
                              size: _ctx.size
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(_ctx.listOfYears, (year) => {
                                    return openBlock(), createElementBlock("option", {
                                      value: year,
                                      key: year
                                    }, toDisplayString(year), 9, _hoisted_6$7);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["modelValue", "disabled", "size"])
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ])
                    ],
                    2
                    /* CLASS */
                  ))
                ]),
                !_ctx.isTypeMonth ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: normalizeClass(["datepicker-content", { "content-horizontal-timepicker": _ctx.horizontalTimePicker }])
                  },
                  [
                    createVNode(_component_b_datepicker_table, {
                      modelValue: _ctx.computedValue,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.computedValue = $event),
                      "day-names": _ctx.newDayNames,
                      "month-names": _ctx.newMonthNames,
                      "first-day-of-week": _ctx.firstDayOfWeek,
                      "rules-for-first-week": _ctx.rulesForFirstWeek,
                      "min-date": _ctx.minDate,
                      "max-date": _ctx.maxDate,
                      focused: _ctx.focusedDateData,
                      disabled: _ctx.disabledOrUndefined,
                      "unselectable-dates": _ctx.unselectableDates,
                      "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
                      "selectable-dates": _ctx.selectableDates,
                      events: _ctx.events,
                      indicators: _ctx.indicators,
                      "date-creator": _ctx.dateCreator,
                      "type-month": _ctx.isTypeMonth,
                      "nearby-month-days": _ctx.nearbyMonthDays,
                      "nearby-selectable-month-days": _ctx.nearbySelectableMonthDays,
                      "show-week-number": _ctx.showWeekNumber,
                      "week-number-clickable": _ctx.weekNumberClickable,
                      range: _ctx.range,
                      multiple: _ctx.multiple,
                      onRangeStart: _cache[12] || (_cache[12] = (date) => _ctx.$emit("range-start", date)),
                      onRangeEnd: _cache[13] || (_cache[13] = (date) => _ctx.$emit("range-end", date)),
                      onClose: _cache[14] || (_cache[14] = ($event) => _ctx.togglePicker(false)),
                      "onUpdate:focused": _cache[15] || (_cache[15] = ($event) => _ctx.focusedDateData = $event)
                    }, null, 8, ["modelValue", "day-names", "month-names", "first-day-of-week", "rules-for-first-week", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "type-month", "nearby-month-days", "nearby-selectable-month-days", "show-week-number", "week-number-clickable", "range", "multiple"])
                  ],
                  2
                  /* CLASS */
                )) : (openBlock(), createElementBlock("div", _hoisted_7$6, [
                  createVNode(_component_b_datepicker_month, {
                    modelValue: _ctx.computedValue,
                    "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => _ctx.computedValue = $event),
                    "month-names": _ctx.newMonthNames,
                    "min-date": _ctx.minDate,
                    "max-date": _ctx.maxDate,
                    focused: _ctx.focusedDateData,
                    disabled: _ctx.disabledOrUndefined,
                    "unselectable-dates": _ctx.unselectableDates,
                    "unselectable-days-of-week": _ctx.unselectableDaysOfWeek,
                    "selectable-dates": _ctx.selectableDates,
                    events: _ctx.events,
                    indicators: _ctx.indicators,
                    "date-creator": _ctx.dateCreator,
                    range: _ctx.range,
                    multiple: _ctx.multiple,
                    onRangeStart: _cache[17] || (_cache[17] = (date) => _ctx.$emit("range-start", date)),
                    onRangeEnd: _cache[18] || (_cache[18] = (date) => _ctx.$emit("range-end", date)),
                    onClose: _cache[19] || (_cache[19] = ($event) => _ctx.togglePicker(false)),
                    onChangeFocus: _ctx.changeFocus,
                    "onUpdate:focused": _cache[20] || (_cache[20] = ($event) => _ctx.focusedDateData = $event)
                  }, null, 8, ["modelValue", "month-names", "min-date", "max-date", "focused", "disabled", "unselectable-dates", "unselectable-days-of-week", "selectable-dates", "events", "indicators", "date-creator", "range", "multiple", "onChangeFocus"])
                ]))
              ]),
              _ctx.$slots.default !== void 0 && _ctx.$slots.default([]).length ? (openBlock(), createElementBlock(
                "footer",
                {
                  key: 0,
                  class: normalizeClass(["datepicker-footer", { "footer-horizontal-timepicker": _ctx.horizontalTimePicker }])
                },
                [
                  renderSlot(_ctx.$slots, "default")
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["disabled", "focusable", "class"])
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        !_ctx.inline ? {
          name: "trigger",
          fn: withCtx((props) => [
            renderSlot(_ctx.$slots, "trigger", normalizeProps(guardReactiveProps(props)), () => [
              createVNode(_component_b_input, mergeProps({
                ref: "input",
                autocomplete: "off",
                "model-value": _ctx.formattedValue,
                placeholder: _ctx.placeholder,
                size: _ctx.size,
                icon: _ctx.icon,
                "icon-right": _ctx.iconRight,
                "icon-right-clickable": _ctx.iconRightClickable,
                "icon-pack": _ctx.iconPack,
                rounded: _ctx.rounded,
                loading: _ctx.loading,
                disabled: _ctx.disabledOrUndefined,
                readonly: !_ctx.editable
              }, _ctx.fallthroughAttrs, {
                "use-html5-validation": false,
                onClick: _ctx.onInputClick,
                onIconRightClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("icon-right-click", $event)),
                onKeyup: _cache[1] || (_cache[1] = withKeys(($event) => _ctx.togglePicker(true), ["enter"])),
                onChange: _cache[2] || (_cache[2] = ($event) => _ctx.onChange($event.target.value)),
                onFocus: _ctx.handleOnFocus
              }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-right", "icon-right-clickable", "icon-pack", "rounded", "loading", "disabled", "readonly", "onClick", "onFocus"])
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["position", "disabled", "inline", "mobile-modal", "trap-focus", "aria-role", "append-to-body", "onActiveChange"])) : (openBlock(), createBlock(_component_b_input, mergeProps({
        key: 1,
        ref: "input",
        type: !_ctx.isTypeMonth ? "date" : "month",
        autocomplete: "off",
        "model-value": _ctx.formatNative(_ctx.computedValue),
        placeholder: _ctx.placeholder,
        size: _ctx.size,
        icon: _ctx.icon,
        "icon-pack": _ctx.iconPack,
        rounded: _ctx.rounded,
        loading: _ctx.loading,
        max: _ctx.formatNative(_ctx.maxDate),
        min: _ctx.formatNative(_ctx.minDate),
        disabled: _ctx.disabledOrUndefined,
        readonly: false
      }, _ctx.fallthroughAttrs, {
        "use-html5-validation": false,
        onChange: _ctx.onChangeNativePicker,
        onFocus: _ctx.onFocus,
        onBlur: _ctx.onBlur
      }), null, 16, ["type", "model-value", "placeholder", "size", "icon", "icon-pack", "rounded", "loading", "max", "min", "disabled", "onChange", "onFocus", "onBlur"]))
    ],
    16
    /* FULL_PROPS */
  );
}
var BDatepicker = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$C]]);

const Plugin$v = {
  install(Vue) {
    registerComponent(Vue, BDatepicker);
  }
};

var _sfc_main$q = defineComponent({
  name: "BTimepicker",
  components: {
    BInput,
    BField: Field,
    BSelect,
    BDropdown,
    BDropdownItem
  },
  mixins: [TimepickerMixin],
  data() {
    return {
      _isTimepicker: true
    };
  },
  computed: {
    nativeStep() {
      if (this.enableSeconds) {
        return "1";
      } else {
        return void 0;
      }
    }
  }
});

const _hoisted_1$w = ["value", "disabled"];
const _hoisted_2$r = { class: "control is-colon" };
const _hoisted_3$g = ["value", "disabled"];
const _hoisted_4$b = { class: "control is-colon" };
const _hoisted_5$8 = ["value", "disabled"];
const _hoisted_6$6 = { class: "control is-colon" };
const _hoisted_7$5 = ["value"];
const _hoisted_8$5 = {
  key: 0,
  class: "timepicker-footer"
};
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = resolveComponent("b-input");
  const _component_b_select = resolveComponent("b-select");
  const _component_b_field = resolveComponent("b-field");
  const _component_b_dropdown_item = resolveComponent("b-dropdown-item");
  const _component_b_dropdown = resolveComponent("b-dropdown");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["timepicker control", [_ctx.size, { "is-expanded": _ctx.expanded }]]
    }, _ctx.rootAttrs),
    [
      !_ctx.isMobile || _ctx.inline ? (openBlock(), createBlock(_component_b_dropdown, {
        key: 0,
        ref: "dropdown",
        position: _ctx.position,
        disabled: _ctx.disabledOrUndefined,
        inline: _ctx.inline,
        "mobile-modal": _ctx.mobileModal,
        "append-to-body": _ctx.appendToBody,
        "append-to-body-copy-parent": "",
        onActiveChange: _ctx.onActiveChange
      }, createSlots({
        default: withCtx(() => [
          createVNode(_component_b_dropdown_item, {
            disabled: _ctx.disabledOrUndefined,
            focusable: _ctx.focusable,
            custom: ""
          }, {
            default: withCtx(() => [
              createVNode(_component_b_field, {
                grouped: "",
                position: "is-centered"
              }, {
                default: withCtx(() => [
                  createVNode(_component_b_select, {
                    modelValue: _ctx.hoursSelected,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.hoursSelected = $event),
                    onChange: _cache[3] || (_cache[3] = ($event) => _ctx.onHoursChange($event.target.value)),
                    disabled: _ctx.disabledOrUndefined,
                    placeholder: "00"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.hours, (hour) => {
                          return openBlock(), createElementBlock("option", {
                            value: hour.value,
                            key: hour.value,
                            disabled: _ctx.isHourDisabled(hour.value) || void 0
                          }, toDisplayString(hour.label), 9, _hoisted_1$w);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "disabled"]),
                  createElementVNode(
                    "span",
                    _hoisted_2$r,
                    toDisplayString(_ctx.hourLiteral),
                    1
                    /* TEXT */
                  ),
                  createVNode(_component_b_select, {
                    modelValue: _ctx.minutesSelected,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.minutesSelected = $event),
                    onChange: _cache[5] || (_cache[5] = ($event) => _ctx.onMinutesChange($event.target.value)),
                    disabled: _ctx.disabledOrUndefined,
                    placeholder: "00"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.minutes, (minute) => {
                          return openBlock(), createElementBlock("option", {
                            value: minute.value,
                            key: minute.value,
                            disabled: _ctx.isMinuteDisabled(minute.value) || void 0
                          }, toDisplayString(minute.label), 9, _hoisted_3$g);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "disabled"]),
                  _ctx.enableSeconds ? (openBlock(), createElementBlock(
                    Fragment,
                    { key: 0 },
                    [
                      createElementVNode(
                        "span",
                        _hoisted_4$b,
                        toDisplayString(_ctx.minuteLiteral),
                        1
                        /* TEXT */
                      ),
                      createVNode(_component_b_select, {
                        modelValue: _ctx.secondsSelected,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.secondsSelected = $event),
                        onChange: _cache[7] || (_cache[7] = ($event) => _ctx.onSecondsChange($event.target.value)),
                        disabled: _ctx.disabledOrUndefined,
                        placeholder: "00"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(_ctx.seconds, (second) => {
                              return openBlock(), createElementBlock("option", {
                                value: second.value,
                                key: second.value,
                                disabled: _ctx.isSecondDisabled(second.value) || void 0
                              }, toDisplayString(second.label), 9, _hoisted_5$8);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["modelValue", "disabled"]),
                      createElementVNode(
                        "span",
                        _hoisted_6$6,
                        toDisplayString(_ctx.secondLiteral),
                        1
                        /* TEXT */
                      )
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : createCommentVNode("v-if", true),
                  !_ctx.isHourFormat24 ? (openBlock(), createBlock(_component_b_select, {
                    key: 1,
                    modelValue: _ctx.meridienSelected,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.meridienSelected = $event),
                    onChange: _cache[9] || (_cache[9] = ($event) => _ctx.onMeridienChange($event.target.value)),
                    disabled: _ctx.disabledOrUndefined
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.meridiens, (meridien) => {
                          return openBlock(), createElementBlock("option", {
                            value: meridien,
                            key: meridien
                          }, toDisplayString(meridien), 9, _hoisted_7$5);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "disabled"])) : createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              }),
              _ctx.$slots.default !== void 0 ? (openBlock(), createElementBlock("footer", _hoisted_8$5, [
                renderSlot(_ctx.$slots, "default")
              ])) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["disabled", "focusable"])
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        !_ctx.inline ? {
          name: "trigger",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "trigger", {}, () => [
              createVNode(_component_b_input, mergeProps({
                ref: "input",
                autocomplete: "off",
                "model-value": _ctx.formatValue(_ctx.computedValue),
                placeholder: _ctx.placeholder,
                size: _ctx.size,
                icon: _ctx.icon,
                "icon-pack": _ctx.iconPack,
                loading: _ctx.loading,
                disabled: _ctx.disabledOrUndefined,
                readonly: !_ctx.editable || void 0,
                rounded: _ctx.rounded
              }, _ctx.fallthroughAttrs, {
                "use-html5-validation": _ctx.useHtml5Validation,
                onKeyup: _cache[0] || (_cache[0] = withKeys(($event) => _ctx.toggle(true), ["enter"])),
                onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onChange($event.target.value)),
                onFocus: _ctx.handleOnFocus
              }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "loading", "disabled", "readonly", "rounded", "use-html5-validation", "onFocus"])
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["position", "disabled", "inline", "mobile-modal", "append-to-body", "onActiveChange"])) : (openBlock(), createBlock(_component_b_input, mergeProps({
        key: 1,
        ref: "input",
        type: "time",
        step: _ctx.nativeStep,
        autocomplete: "off",
        "model-value": _ctx.formatHHMMSS(_ctx.computedValue),
        placeholder: _ctx.placeholder,
        size: _ctx.size,
        icon: _ctx.icon,
        "icon-pack": _ctx.iconPack,
        rounded: _ctx.rounded,
        loading: _ctx.loading,
        max: _ctx.formatHHMMSS(_ctx.maxTime),
        min: _ctx.formatHHMMSS(_ctx.minTime),
        disabled: _ctx.disabledOrUndefined,
        readonly: false
      }, _ctx.fallthroughAttrs, {
        "use-html5-validation": _ctx.useHtml5Validation,
        onChange: _cache[10] || (_cache[10] = ($event) => _ctx.onChange($event.target.value)),
        onFocus: _ctx.handleOnFocus,
        onBlur: _cache[11] || (_cache[11] = ($event) => _ctx.onBlur() && _ctx.checkHtml5Validity())
      }), null, 16, ["step", "model-value", "placeholder", "size", "icon", "icon-pack", "rounded", "loading", "max", "min", "disabled", "use-html5-validation", "onFocus"]))
    ],
    16
    /* FULL_PROPS */
  );
}
var Timepicker = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$B]]);

const AM = "AM";
const PM = "PM";
var _sfc_main$p = defineComponent({
  name: "BDatetimepicker",
  components: {
    BDatepicker,
    BInput,
    BTimepicker: Timepicker
  },
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Date, null]
    },
    editable: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    horizontalTimePicker: Boolean,
    disabled: Boolean,
    firstDayOfWeek: {
      type: Number,
      default: () => {
        if (typeof config.defaultFirstDayOfWeek === "number") {
          return config.defaultFirstDayOfWeek;
        } else {
          return 0;
        }
      }
    },
    rulesForFirstWeek: {
      type: Number,
      default: () => 4
    },
    icon: String,
    iconRight: String,
    iconRightClickable: Boolean,
    iconPack: String,
    inline: Boolean,
    openOnFocus: Boolean,
    position: String,
    mobileNative: {
      type: Boolean,
      default: true
    },
    minDatetime: Date,
    maxDatetime: Date,
    nearbyMonthDays: {
      type: Boolean,
      default: config.defaultDatepickerNearbyMonthDays
    },
    datetimeFormatter: {
      type: Function
    },
    datetimeParser: {
      type: Function
    },
    datetimeCreator: {
      type: Function,
      default: (date) => {
        if (typeof config.defaultDatetimeCreator === "function") {
          return config.defaultDatetimeCreator(date);
        } else {
          return date;
        }
      }
    },
    datepicker: Object,
    timepicker: Object,
    tzOffset: {
      type: Number,
      default: 0
    },
    focusable: {
      type: Boolean,
      default: true
    },
    appendToBody: Boolean
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "active-change": (_active) => true,
    "change-month": (_month) => true,
    "change-year": (_year) => true,
    "icon-right-click": () => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newValue: this.adjustValue(this.modelValue)
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        if (value) {
          let val = new Date(value.getTime());
          if (this.newValue) {
            if ((value.getDate() !== this.newValue.getDate() || value.getMonth() !== this.newValue.getMonth() || value.getFullYear() !== this.newValue.getFullYear()) && value.getHours() === 0 && value.getMinutes() === 0 && value.getSeconds() === 0) {
              val.setHours(
                this.newValue.getHours(),
                this.newValue.getMinutes(),
                this.newValue.getSeconds(),
                0
              );
            }
          } else {
            val = this.datetimeCreator(value);
          }
          if (this.minDatetime && val < this.adjustValue(this.minDatetime)) {
            val = this.adjustValue(this.minDatetime);
          } else if (this.maxDatetime && val > this.adjustValue(this.maxDatetime)) {
            val = this.adjustValue(this.maxDatetime);
          }
          this.newValue = new Date(val.getTime());
        } else {
          this.newValue = this.adjustValue(value);
        }
        const adjustedValue = this.adjustValue(this.newValue, true);
        this.$emit("update:modelValue", adjustedValue);
      }
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: this.enableSeconds() ? "numeric" : void 0
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(this.locale, {
        year: this.localeOptions.year || "numeric",
        month: this.localeOptions.month || "numeric",
        day: this.localeOptions.day || "numeric",
        hour: this.localeOptions.hour || "numeric",
        minute: this.localeOptions.minute || "numeric",
        second: this.enableSeconds() ? this.localeOptions.second || "numeric" : void 0,
        hourCycle: !this.isHourFormat24() ? "h12" : "h23"
      });
    },
    isMobileNative() {
      return this.mobileNative && this.tzOffset === 0;
    },
    isMobile() {
      return this.isMobileNative && isMobile.any();
    },
    minDate() {
      if (!this.minDatetime) {
        return this.datepicker ? this.adjustValue(this.datepicker.minDate) : null;
      }
      const adjMinDatetime = this.adjustValue(this.minDatetime);
      return new Date(
        adjMinDatetime.getFullYear(),
        adjMinDatetime.getMonth(),
        adjMinDatetime.getDate(),
        0,
        0,
        0,
        0
      );
    },
    maxDate() {
      if (!this.maxDatetime) {
        return this.datepicker ? this.adjustValue(this.datepicker.maxDate) : null;
      }
      const adjMaxDatetime = this.adjustValue(this.maxDatetime);
      return new Date(
        adjMaxDatetime.getFullYear(),
        adjMaxDatetime.getMonth(),
        adjMaxDatetime.getDate(),
        0,
        0,
        0,
        0
      );
    },
    minTime() {
      if (!this.minDatetime || (this.newValue === null || typeof this.newValue === "undefined")) {
        return this.timepicker ? this.adjustValue(this.timepicker.minTime) : null;
      }
      const adjMinDatetime = this.adjustValue(this.minDatetime);
      if (adjMinDatetime.getFullYear() === this.newValue.getFullYear() && adjMinDatetime.getMonth() === this.newValue.getMonth() && adjMinDatetime.getDate() === this.newValue.getDate()) {
        return adjMinDatetime;
      }
      return void 0;
    },
    maxTime() {
      if (!this.maxDatetime || (this.newValue === null || typeof this.newValue === "undefined")) {
        return this.timepicker ? this.adjustValue(this.timepicker.maxTime) : null;
      }
      const adjMaxDatetime = this.adjustValue(this.maxDatetime);
      if (adjMaxDatetime.getFullYear() === this.newValue.getFullYear() && adjMaxDatetime.getMonth() === this.newValue.getMonth() && adjMaxDatetime.getDate() === this.newValue.getDate()) {
        return adjMaxDatetime;
      }
      return void 0;
    },
    datepickerSize() {
      return this.datepicker && this.datepicker.size ? this.datepicker.size : this.size;
    },
    timepickerSize() {
      return this.timepicker && this.timepicker.size ? this.timepicker.size : this.size;
    },
    timepickerDisabled() {
      return this.timepicker && this.timepicker.disabled ? this.timepicker.disabled : this.disabled;
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    modelValue() {
      this.newValue = this.adjustValue(this.modelValue);
    },
    tzOffset() {
      this.newValue = this.adjustValue(this.modelValue);
    }
  },
  methods: {
    enableSeconds() {
      if (this.$refs.timepicker) {
        return this.$refs.timepicker.enableSeconds;
      }
      return false;
    },
    isHourFormat24() {
      if (this.$refs.timepicker) {
        return this.$refs.timepicker.isHourFormat24;
      }
      return !this.localeOptions.hour12;
    },
    adjustValue(value, reverse = false) {
      if (!value) return value;
      if (reverse) {
        return new Date(value.getTime() - this.tzOffset * 6e4);
      } else {
        return new Date(value.getTime() + this.tzOffset * 6e4);
      }
    },
    defaultDatetimeParser(date) {
      if (typeof this.datetimeParser === "function") {
        return this.datetimeParser(date);
      } else if (typeof config.defaultDatetimeParser === "function") {
        return config.defaultDatetimeParser(date);
      } else {
        if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
          const dayPeriods = [AM, PM, AM.toLowerCase(), PM.toLowerCase()];
          if (this.$refs.timepicker) {
            dayPeriods.push(this.$refs.timepicker.amString);
            dayPeriods.push(this.$refs.timepicker.pmString);
          }
          const parts = this.dtf.formatToParts(/* @__PURE__ */ new Date());
          const formatRegex = parts.map((part, idx) => {
            if (part.type === "literal") {
              if (idx + 1 < parts.length && parts[idx + 1].type === "hour") {
                return "[^\\d]+";
              }
              return part.value.replace(/ /g, "\\s?");
            } else if (part.type === "dayPeriod") {
              return `((?!=<${part.type}>)(${dayPeriods.join("|")})?)`;
            }
            return `((?!=<${part.type}>)\\d+)`;
          }).join("");
          const datetimeGroups = matchWithGroups(formatRegex, date);
          if (datetimeGroups.year && datetimeGroups.year.length === 4 && datetimeGroups.month && +datetimeGroups.month <= 12 && datetimeGroups.day && +datetimeGroups.day <= 31 && datetimeGroups.hour && +datetimeGroups.hour >= 0 && +datetimeGroups.hour < 24 && datetimeGroups.minute && +datetimeGroups.minute >= 0 && +datetimeGroups.minute <= 59) {
            const d = new Date(
              +datetimeGroups.year,
              +datetimeGroups.month - 1,
              +datetimeGroups.day,
              +datetimeGroups.hour,
              +datetimeGroups.minute,
              +(datetimeGroups.second || 0)
            );
            return d;
          }
        }
        return new Date(Date.parse(date));
      }
    },
    defaultDatetimeFormatter(date) {
      date = date;
      if (typeof this.datetimeFormatter === "function") {
        return this.datetimeFormatter(date);
      } else if (typeof config.defaultDatetimeFormatter === "function") {
        return config.defaultDatetimeFormatter(date);
      } else {
        return this.dtf.format(date);
      }
    },
    /*
    * Parse date from string
    */
    onChangeNativePicker(event) {
      const date = event.target.value;
      const s = date ? date.split(/\D/) : [];
      if (s.length >= 5) {
        const year = parseInt(s[0], 10);
        const month = parseInt(s[1], 10) - 1;
        const day = parseInt(s[2], 10);
        const hours = parseInt(s[3], 10);
        const minutes = parseInt(s[4], 10);
        this.computedValue = new Date(year, month, day, hours, minutes);
      } else {
        this.computedValue = null;
      }
    },
    /*
     * Emit 'active-change' on datepicker active state change
     */
    onActiveChange(value) {
      this.$emit("active-change", value);
    },
    formatNative(value) {
      const date = new Date(value);
      if (value && !isNaN(date.valueOf())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return year + "-" + ((month < 10 ? "0" : "") + month) + "-" + ((day < 10 ? "0" : "") + day) + "T" + ((hours < 10 ? "0" : "") + hours) + ":" + ((minutes < 10 ? "0" : "") + minutes) + ":" + ((seconds < 10 ? "0" : "") + seconds);
      }
      return "";
    },
    toggle() {
      this.$refs.datepicker.toggle();
    }
  },
  mounted() {
    if (!this.isMobile || this.inline) {
      if (this.newValue) {
        this.$refs.datepicker.$forceUpdate();
      }
    }
  }
});

const _hoisted_1$v = { class: "level is-mobile" };
const _hoisted_2$q = {
  key: 0,
  class: "level-item has-text-centered"
};
const _hoisted_3$f = { class: "level-item has-text-centered" };
const _hoisted_4$a = {
  key: 1,
  class: "level-item has-text-centered"
};
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_timepicker = resolveComponent("b-timepicker");
  const _component_b_datepicker = resolveComponent("b-datepicker");
  const _component_b_input = resolveComponent("b-input");
  return !_ctx.isMobile || _ctx.inline ? (openBlock(), createBlock(_component_b_datepicker, mergeProps({
    key: 0,
    ref: "datepicker",
    modelValue: _ctx.computedValue,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.computedValue = $event)
  }, _ctx.datepicker, {
    rounded: _ctx.rounded,
    "open-on-focus": _ctx.openOnFocus,
    position: _ctx.position,
    loading: _ctx.loading,
    inline: _ctx.inline,
    editable: _ctx.editable,
    expanded: _ctx.expanded,
    "close-on-click": false,
    "first-day-of-week": _ctx.firstDayOfWeek,
    "rules-for-first-week": _ctx.rulesForFirstWeek,
    "date-formatter": _ctx.defaultDatetimeFormatter,
    "date-parser": _ctx.defaultDatetimeParser,
    "min-date": _ctx.minDate,
    "max-date": _ctx.maxDate,
    "nearby-month-days": _ctx.nearbyMonthDays,
    icon: _ctx.icon,
    "icon-right": _ctx.iconRight,
    "icon-right-clickable": _ctx.iconRightClickable,
    "icon-pack": _ctx.iconPack,
    size: _ctx.datepickerSize,
    placeholder: _ctx.placeholder,
    "horizontal-time-picker": _ctx.horizontalTimePicker,
    range: false,
    disabled: _ctx.disabledOrUndefined,
    "mobile-native": _ctx.isMobileNative,
    locale: _ctx.locale,
    focusable: _ctx.focusable,
    "append-to-body": _ctx.appendToBody,
    onFocus: _ctx.onFocus,
    onBlur: _ctx.onBlur,
    onActiveChange: _ctx.onActiveChange,
    onIconRightClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("icon-right-click")),
    onChangeMonth: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("change-month", $event)),
    onChangeYear: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("change-year", $event))
  }), {
    default: withCtx(() => [
      createElementVNode("nav", _hoisted_1$v, [
        _ctx.$slots.left !== void 0 ? (openBlock(), createElementBlock("div", _hoisted_2$q, [
          renderSlot(_ctx.$slots, "left")
        ])) : createCommentVNode("v-if", true),
        createElementVNode("div", _hoisted_3$f, [
          createVNode(_component_b_timepicker, mergeProps({ ref: "timepicker" }, _ctx.timepicker, {
            modelValue: _ctx.computedValue,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
            inline: "",
            editable: _ctx.editable,
            "min-time": _ctx.minTime,
            "max-time": _ctx.maxTime,
            size: _ctx.timepickerSize,
            disabled: _ctx.timepickerDisabled || void 0,
            focusable: _ctx.focusable,
            "mobile-native": _ctx.isMobileNative,
            locale: _ctx.locale
          }), null, 16, ["modelValue", "editable", "min-time", "max-time", "size", "disabled", "focusable", "mobile-native", "locale"])
        ]),
        _ctx.$slots.right !== void 0 ? (openBlock(), createElementBlock("div", _hoisted_4$a, [
          renderSlot(_ctx.$slots, "right")
        ])) : createCommentVNode("v-if", true)
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["modelValue", "rounded", "open-on-focus", "position", "loading", "inline", "editable", "expanded", "first-day-of-week", "rules-for-first-week", "date-formatter", "date-parser", "min-date", "max-date", "nearby-month-days", "icon", "icon-right", "icon-right-clickable", "icon-pack", "size", "placeholder", "horizontal-time-picker", "disabled", "mobile-native", "locale", "focusable", "append-to-body", "onFocus", "onBlur", "onActiveChange"])) : (openBlock(), createBlock(_component_b_input, mergeProps({
    key: 1,
    ref: "input",
    type: "datetime-local",
    autocomplete: "off",
    "model-value": _ctx.formatNative(_ctx.computedValue),
    placeholder: _ctx.placeholder,
    size: _ctx.size,
    icon: _ctx.icon,
    "icon-pack": _ctx.iconPack,
    rounded: _ctx.rounded,
    loading: _ctx.loading,
    max: _ctx.formatNative(_ctx.maxDate),
    min: _ctx.formatNative(_ctx.minDate),
    disabled: _ctx.disabledOrUndefined,
    readonly: false
  }, _ctx.$attrs, {
    "use-html5-validation": _ctx.useHtml5Validation,
    onChange: _ctx.onChangeNativePicker,
    onFocus: _ctx.onFocus,
    onBlur: _ctx.onBlur
  }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "rounded", "loading", "max", "min", "disabled", "use-html5-validation", "onChange", "onFocus", "onBlur"]));
}
var Datetimepicker = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$A]]);

const Plugin$u = {
  install(Vue) {
    registerComponent(Vue, Datetimepicker);
  }
};

const MODAL_SCROLLS = ["clip", "keep"];
const MODAL_ARIA_ROLES = ["dialog", "alertdialog"];
const Modal$1 = defineComponent({
  name: "BModal",
  directives: {
    trapFocus: directive$1
  },
  props: {
    modelValue: Boolean,
    component: [Object, Function, String],
    content: {
      type: [String, Object, Array]
    },
    programmatic: Boolean,
    props: Object,
    events: {
      type: Object,
      default() {
        return {};
      }
    },
    width: {
      type: [String, Number],
      default: 960
    },
    hasModalCard: Boolean,
    animation: {
      type: String,
      default: "zoom-out"
    },
    canCancel: {
      type: [Array, Boolean],
      default: () => {
        return config.defaultModalCanCancel;
      }
    },
    cancelCallback: {
      type: Function,
      default: () => {
      }
    },
    scroll: {
      type: String,
      default: () => {
        return config.defaultModalScroll ? config.defaultModalScroll : "clip";
      },
      validator: (value) => {
        return MODAL_SCROLLS.indexOf(value) >= 0;
      }
    },
    fullScreen: Boolean,
    trapFocus: {
      type: Boolean,
      default: () => {
        return config.defaultTrapFocus;
      }
    },
    autoFocus: {
      type: Boolean,
      default: () => {
        return config.defaultAutoFocus;
      }
    },
    customClass: String,
    customContentClass: [String, Array, Object],
    ariaRole: {
      type: String,
      validator: (value) => {
        return MODAL_ARIA_ROLES.indexOf(value) >= 0;
      }
    },
    ariaModal: Boolean,
    ariaLabel: {
      type: String,
      validator: (value) => {
        return Boolean(value);
      }
    },
    closeButtonAriaLabel: {
      type: String,
      default: "close"
    },
    destroyOnHide: {
      type: Boolean,
      default: true
    },
    renderOnMounted: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    "after-enter": () => true,
    "after-leave": () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cancel: (method) => true,
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (active) => true
  },
  data() {
    return {
      isActive: this.modelValue || false,
      savedScrollTop: null,
      newWidth: typeof this.width === "number" ? this.width + "px" : this.width,
      animating: !this.modelValue,
      destroyed: !(this.modelValue || this.renderOnMounted)
    };
  },
  computed: {
    cancelOptions() {
      return typeof this.canCancel === "boolean" ? this.canCancel ? config.defaultModalCanCancel : [] : this.canCancel;
    },
    showX() {
      return this.cancelOptions.indexOf("x") >= 0;
    },
    customStyle() {
      if (!this.fullScreen) {
        return { maxWidth: this.newWidth };
      }
      return null;
    }
  },
  watch: {
    modelValue(value) {
      this.isActive = value;
    },
    isActive(value) {
      if (value) this.destroyed = false;
      this.handleScroll();
      this.$nextTick(() => {
        if (value && this.$el && this.$el.focus && this.autoFocus) {
          this.$el.focus();
        }
      });
    }
  },
  methods: {
    handleScroll() {
      if (typeof window === "undefined") return;
      if (this.scroll === "clip") {
        if (this.isActive) {
          document.documentElement.classList.add("is-clipped");
        } else {
          document.documentElement.classList.remove("is-clipped");
        }
        return;
      }
      this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
      if (this.isActive) {
        document.body.classList.add("is-noscroll");
      } else {
        document.body.classList.remove("is-noscroll");
      }
      if (this.isActive) {
        document.body.style.top = `-${this.savedScrollTop}px`;
        return;
      }
      document.documentElement.scrollTop = this.savedScrollTop;
      document.body.style.top = "";
      this.savedScrollTop = null;
    },
    /*
    * Close the Modal if canCancel and call the cancelCallback prop (function).
    */
    cancel(method) {
      if (this.cancelOptions.indexOf(method) < 0) return;
      this.$emit("cancel", method);
      this.cancelCallback.apply(null, [method]);
      this.close();
    },
    /*
    * Call the cancelCallback prop (function).
    * Emit events, and destroy modal if it's programmatic.
    */
    close() {
      this.$emit("close");
      this.$emit("update:modelValue", false);
      if (this.programmatic) {
        this.isActive = false;
        setTimeout(() => {
          removeElement(this.$el);
        }, 150);
      }
    },
    /*
    * Keypress event that is bound to the document.
    */
    keyPress({ key }) {
      if (this.isActive && (key === "Escape" || key === "Esc")) this.cancel("escape");
    },
    /*
    * Transition after-enter hook
    */
    afterEnter() {
      this.animating = false;
      this.$emit("after-enter");
    },
    /*
    * Transition before-leave hook
    */
    beforeLeave() {
      this.animating = true;
    },
    /*
    * Transition after-leave hook
    */
    afterLeave() {
      if (this.destroyOnHide) {
        this.destroyed = true;
      }
      this.$emit("after-leave");
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  mounted() {
    if (this.programmatic) {
      document.body.appendChild(this.$el);
      this.isActive = true;
    } else if (this.isActive) this.handleScroll();
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
      document.documentElement.classList.remove("is-clipped");
      const savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
      document.body.classList.remove("is-noscroll");
      document.documentElement.scrollTop = savedScrollTop;
      document.body.style.top = "";
    }
  }
});

const _hoisted_1$u = ["role", "aria-label", "aria-modal"];
const _hoisted_2$p = ["innerHTML"];
const _hoisted_3$e = ["aria-label"];
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createBlock(Transition, {
    name: _ctx.animation,
    onAfterEnter: _ctx.afterEnter,
    onBeforeLeave: _ctx.beforeLeave,
    onAfterLeave: _ctx.afterLeave
  }, {
    default: withCtx(() => [
      !_ctx.destroyed ? withDirectives((openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["modal is-active", [{ "is-full-screen": _ctx.fullScreen }, _ctx.customClass]]),
        tabindex: "-1",
        role: _ctx.ariaRole,
        "aria-label": _ctx.ariaLabel,
        "aria-modal": _ctx.ariaModal || void 0
      }, [
        createElementVNode("div", {
          class: "modal-background",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.cancel("outside"))
        }),
        createElementVNode(
          "div",
          {
            class: normalizeClass(["animation-content", [{ "modal-content": !_ctx.hasModalCard }, _ctx.customContentClass]]),
            style: normalizeStyle(_ctx.customStyle)
          },
          [
            _ctx.component ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.component), mergeProps({ key: 0 }, _ctx.props, toHandlers(_ctx.events), {
              "can-cancel": _ctx.canCancel,
              onClose: _ctx.close
            }), null, 16, ["can-cancel", "onClose"])) : _ctx.content ? (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                createElementVNode("div", { innerHTML: _ctx.content }, null, 8, _hoisted_2$p)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : renderSlot(_ctx.$slots, "default", {
              key: 2,
              canCancel: _ctx.canCancel,
              close: _ctx.close
            })
          ],
          6
          /* CLASS, STYLE */
        ),
        _ctx.showX ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          class: "modal-close is-large",
          "aria-label": _ctx.closeButtonAriaLabel,
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.cancel("x"))
        }, null, 8, _hoisted_3$e)), [
          [vShow, !_ctx.animating]
        ]) : createCommentVNode("v-if", true)
      ], 10, _hoisted_1$u)), [
        [vShow, _ctx.isActive],
        [_directive_trap_focus, _ctx.trapFocus]
      ]) : createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]);
}
var Modal = /* @__PURE__ */ _export_sfc(Modal$1, [["render", _sfc_render$z]]);

var __defProp$7 = Object.defineProperty;
var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols;
var __hasOwnProp$7 = Object.prototype.hasOwnProperty;
var __propIsEnum$7 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$7 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$7.call(b, prop))
      __defNormalProp$7(a, prop, b[prop]);
  if (__getOwnPropSymbols$7)
    for (var prop of __getOwnPropSymbols$7(b)) {
      if (__propIsEnum$7.call(b, prop))
        __defNormalProp$7(a, prop, b[prop]);
    }
  return a;
};
const Dialog$1 = defineComponent({
  name: "BDialog",
  components: {
    BIcon,
    BButton
  },
  directives: {
    trapFocus: directive$1
  },
  extends: Modal,
  props: {
    title: String,
    message: [String, Array],
    icon: String,
    iconPack: String,
    hasIcon: Boolean,
    type: {
      type: String,
      default: "is-primary"
    },
    size: String,
    confirmText: {
      type: String,
      default: () => {
        return config.defaultDialogConfirmText ? config.defaultDialogConfirmText : "OK";
      }
    },
    cancelText: {
      type: String,
      default: () => {
        return config.defaultDialogCancelText ? config.defaultDialogCancelText : "Cancel";
      }
    },
    hasInput: Boolean,
    // Used internally to know if it's prompt
    inputAttrs: {
      type: Object,
      default: () => ({})
    },
    confirmCallback: {
      // I was not able to figure out how to specify the "self" type here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Function,
      default: () => {
      }
    },
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    container: {
      type: String,
      default: () => {
        return config.defaultContainerElement;
      }
    },
    focusOn: {
      type: String,
      default: "confirm"
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
    // second parameter is the dialog instance but typed any
    // because I was not able to figure out how to specify the "self" type here
    confirm: (value, dialog) => true
    /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
  },
  data() {
    const prompt = this.hasInput ? this.inputAttrs.value || "" : "";
    return {
      prompt,
      isActive: false,
      validationMessage: "",
      isCompositing: false,
      isLoading: false
    };
  },
  computed: {
    // `safeInputAttrs` is a shallow copy of `inputAttrs` except for `value`
    // `value` should not be specified to `v-bind` of the input element
    // because it inhibits `v-model` of the input on Vue 3
    safeInputAttrs() {
      const attrs = __spreadValues$7({}, this.inputAttrs);
      delete attrs.value;
      if (typeof attrs.required === "undefined") {
        attrs.required = true;
      }
      return attrs;
    },
    dialogClass() {
      return [this.size, {
        "has-custom-container": this.container !== null
      }];
    },
    /*
    * Icon name (MDI) based on the type.
    */
    iconByType() {
      switch (this.type) {
        case "is-info":
          return "information";
        case "is-success":
          return "check-circle";
        case "is-warning":
          return "alert";
        case "is-danger":
          return "alert-circle";
        default:
          return null;
      }
    },
    showCancel() {
      return this.cancelOptions.indexOf("button") >= 0;
    }
  },
  methods: {
    /*
    * If it's a prompt Dialog, validate the input.
    * Call the confirmCallback prop (function) and close the Dialog.
    */
    confirm() {
      const input = this.$refs.input;
      if (input != null) {
        if (this.isCompositing) return;
        if (!input.checkValidity()) {
          this.validationMessage = input.validationMessage;
          this.$nextTick(() => input.select());
          return;
        }
      }
      this.$emit("confirm", this.prompt, this);
      this.confirmCallback(this.prompt, this);
      if (this.closeOnConfirm) this.close();
    },
    /*
    * Close the Dialog.
    */
    close() {
      this.isActive = false;
      this.isLoading = false;
      setTimeout(() => {
        removeElement(this.$el);
      }, 150);
    },
    /*
    * Start the Loading.
    */
    startLoading() {
      this.isLoading = true;
    },
    /*
    * Cancel the Loading.
    */
    cancelLoading() {
      this.isLoading = false;
    }
  },
  beforeMount() {
    if (typeof window !== "undefined") {
      this.$nextTick(() => {
        const container = document.querySelector(this.container) || document.body;
        container.appendChild(this.$el);
      });
    }
  },
  mounted() {
    this.isActive = true;
    this.$nextTick(() => {
      if (this.hasInput) {
        this.$refs.input.focus();
      } else if (this.focusOn === "cancel" && this.showCancel) {
        this.$refs.cancelButton.$el.focus();
      } else {
        this.$refs.confirmButton.$el.focus();
      }
    });
  }
});

const _hoisted_1$t = ["role", "aria-modal"];
const _hoisted_2$o = { class: "modal-card animation-content" };
const _hoisted_3$d = {
  key: 0,
  class: "modal-card-head"
};
const _hoisted_4$9 = { class: "modal-card-title" };
const _hoisted_5$7 = { class: "media" };
const _hoisted_6$5 = {
  key: 0,
  class: "media-left"
};
const _hoisted_7$4 = { class: "media-content" };
const _hoisted_8$4 = ["innerHTML"];
const _hoisted_9$3 = {
  key: 0,
  class: "field"
};
const _hoisted_10$2 = { class: "control" };
const _hoisted_11$2 = { class: "help is-danger" };
const _hoisted_12$2 = { class: "modal-card-foot" };
const _hoisted_13$1 = { class: "buttons" };
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_button = resolveComponent("b-button");
  const _directive_trap_focus = resolveDirective("trap-focus");
  return openBlock(), createBlock(Transition, { name: _ctx.animation }, {
    default: withCtx(() => [
      _ctx.isActive ? withDirectives((openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["dialog modal is-active", _ctx.dialogClass]),
        role: _ctx.ariaRole,
        "aria-modal": _ctx.ariaModal
      }, [
        createElementVNode("div", {
          class: "modal-background",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.cancel("outside"))
        }),
        createElementVNode("div", _hoisted_2$o, [
          _ctx.title ? (openBlock(), createElementBlock("header", _hoisted_3$d, [
            createElementVNode(
              "p",
              _hoisted_4$9,
              toDisplayString(_ctx.title),
              1
              /* TEXT */
            )
          ])) : createCommentVNode("v-if", true),
          createElementVNode(
            "section",
            {
              class: normalizeClass(["modal-card-body", { "is-titleless": !_ctx.title, "is-flex": _ctx.hasIcon }])
            },
            [
              createElementVNode("div", _hoisted_5$7, [
                _ctx.hasIcon && (_ctx.icon || _ctx.iconByType) ? (openBlock(), createElementBlock("div", _hoisted_6$5, [
                  createVNode(_component_b_icon, {
                    icon: _ctx.icon ? _ctx.icon : _ctx.iconByType,
                    pack: _ctx.iconPack,
                    type: _ctx.type,
                    both: !_ctx.icon,
                    size: "is-large"
                  }, null, 8, ["icon", "pack", "type", "both"])
                ])) : createCommentVNode("v-if", true),
                createElementVNode("div", _hoisted_7$4, [
                  createElementVNode("p", null, [
                    _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(
                      Fragment,
                      { key: 1 },
                      [
                        createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                        createElementVNode("div", { innerHTML: _ctx.message }, null, 8, _hoisted_8$4)
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ]),
                  _ctx.hasInput ? (openBlock(), createElementBlock("div", _hoisted_9$3, [
                    createElementVNode("div", _hoisted_10$2, [
                      withDirectives(createElementVNode(
                        "input",
                        mergeProps({
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.prompt = $event),
                          class: ["input", { "is-danger": _ctx.validationMessage }],
                          ref: "input"
                        }, _ctx.safeInputAttrs, {
                          onCompositionstart: _cache[2] || (_cache[2] = ($event) => _ctx.isCompositing = true),
                          onCompositionend: _cache[3] || (_cache[3] = ($event) => _ctx.isCompositing = false),
                          onKeydown: _cache[4] || (_cache[4] = withKeys((...args) => _ctx.confirm && _ctx.confirm(...args), ["enter"]))
                        }),
                        null,
                        16
                        /* FULL_PROPS */
                      ), [
                        [vModelDynamic, _ctx.prompt]
                      ])
                    ]),
                    createElementVNode(
                      "p",
                      _hoisted_11$2,
                      toDisplayString(_ctx.validationMessage),
                      1
                      /* TEXT */
                    )
                  ])) : createCommentVNode("v-if", true)
                ])
              ])
            ],
            2
            /* CLASS */
          ),
          createElementVNode("footer", _hoisted_12$2, [
            createElementVNode("div", _hoisted_13$1, [
              _ctx.showCancel ? (openBlock(), createBlock(_component_b_button, {
                key: 0,
                ref: "cancelButton",
                disabled: _ctx.isLoading,
                onClick: _cache[5] || (_cache[5] = ($event) => _ctx.cancel("button"))
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(_ctx.cancelText),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["disabled"])) : createCommentVNode("v-if", true),
              createVNode(_component_b_button, {
                type: _ctx.type,
                ref: "confirmButton",
                loading: _ctx.isLoading,
                onClick: _ctx.confirm
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(_ctx.confirmText),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["type", "loading", "onClick"])
            ])
          ])
        ])
      ], 10, _hoisted_1$t)), [
        [_directive_trap_focus, _ctx.trapFocus]
      ]) : createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
var Dialog = /* @__PURE__ */ _export_sfc(Dialog$1, [["render", _sfc_render$y]]);

var __defProp$6 = Object.defineProperty;
var __defProps$6 = Object.defineProperties;
var __getOwnPropDescs$6 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$6.call(b, prop))
      __defNormalProp$6(a, prop, b[prop]);
  if (__getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(b)) {
      if (__propIsEnum$6.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$6 = (a, b) => __defProps$6(a, __getOwnPropDescs$6(b));
var __publicField$5 = (obj, key, value) => __defNormalProp$6(obj, key + "" , value);
function open(propsData, app) {
  let slot;
  if (Array.isArray(propsData.message)) {
    slot = propsData.message;
    delete propsData.message;
  }
  function createDialog(onConfirm, onCancel) {
    const container = document.createElement("div");
    const vueInstance = createApp({
      data() {
        return {
          dialogVNode: null
        };
      },
      methods: {
        close() {
          const dialog = getComponentFromVNode(this.dialogVNode);
          if (dialog) {
            dialog.close();
          }
        },
        startLoading() {
          const dialog = getComponentFromVNode(this.dialogVNode);
          if (dialog) {
            dialog.startLoading();
          }
        },
        cancelLoading() {
          const dialog = getComponentFromVNode(this.dialogVNode);
          if (dialog) {
            dialog.cancelLoading();
          }
        }
      },
      render() {
        this.dialogVNode = h(
          Dialog,
          __spreadProps$6(__spreadValues$6({}, propsData), {
            // intentionally overrides propsData.onConfirm
            // to prevent propsData.onConfirm from receiving a "confirm" event
            onConfirm: (value) => {
              if (onConfirm != null) {
                onConfirm(value);
              }
            },
            // intentionally override propsData.onCancel
            // to prevent propsData.onCancel from receiving a "cancel" event
            onCancel: (method) => {
              if (onCancel != null) {
                onCancel(method);
              }
              vueInstance.unmount();
            },
            confirmCallback: (value, dialog) => {
              if (propsData.onConfirm != null) {
                propsData.onConfirm(value, dialog);
              }
            },
            cancelCallback: (method) => {
              if (propsData.onCancel != null) {
                propsData.onCancel(method);
              }
            }
          }),
          slot ? { default: () => slot } : void 0
        );
        return this.dialogVNode;
      }
    });
    if (app) {
      copyAppContext(app, vueInstance);
    }
    return vueInstance.mount(container);
  }
  if (!config.defaultProgrammaticPromise) {
    return createDialog();
  } else {
    return new Promise((resolve) => {
      const dialog = createDialog(
        (event) => resolve({ result: event || true, dialog }),
        () => resolve({ result: false, dialog })
      );
    });
  }
}
class DialogProgrammatic {
  constructor(app) {
    __publicField$5(this, "app");
    this.app = app;
  }
  alert(params) {
    let newParams;
    if (typeof params === "string") {
      newParams = {
        message: params
      };
    } else {
      newParams = params;
    }
    newParams = __spreadValues$6({
      canCancel: false
    }, newParams);
    return open(newParams, this.app);
  }
  confirm(params) {
    return open(params, this.app);
  }
  prompt(params) {
    return open(__spreadValues$6({ hasInput: true }, params), this.app);
  }
}
const Plugin$t = {
  install(Vue) {
    registerComponent(Vue, Dialog);
    registerComponentProgrammatic(Vue, "dialog", new DialogProgrammatic(Vue));
  }
};

const Plugin$s = {
  install(Vue) {
    registerComponent(Vue, Field);
  }
};

const Plugin$r = {
  install(Vue) {
    registerComponent(Vue, BIcon);
  }
};

const Plugin$q = {
  install(Vue) {
    registerComponent(Vue, Image$1);
  }
};

const isSSR = typeof window === "undefined";
const HTMLElement = isSSR ? Object : window.HTMLElement;
const File = isSSR ? Object : window.File;

const Loading = defineComponent({
  name: "BLoading",
  props: {
    modelValue: Boolean,
    programmatic: Boolean,
    container: [Object, Function, HTMLElement],
    isFullPage: {
      type: Boolean,
      default: true
    },
    animation: {
      type: String,
      default: "fade"
    },
    canCancel: {
      type: Boolean,
      default: false
    },
    onCancel: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Function,
      default: () => {
      }
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    close: () => true,
    "update:is-full-page": (_flag) => true,
    "update:modelValue": (_flag) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      isActive: this.modelValue || false,
      displayInFullPage: this.isFullPage
    };
  },
  watch: {
    modelValue(value) {
      this.isActive = value;
    },
    isFullPage(value) {
      this.displayInFullPage = value;
    }
  },
  methods: {
    /*
    * Close the Modal if canCancel.
    */
    cancel() {
      if (!this.canCancel || !this.isActive) return;
      this.close();
    },
    /*
    * Emit events, and destroy modal if it's programmatic.
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    close(...args) {
      this.onCancel.apply(null, args);
      this.$emit("close");
      this.$emit("update:modelValue", false);
      if (this.programmatic) {
        this.isActive = false;
        setTimeout(() => {
          removeElement(this.$el);
        }, 150);
      }
    },
    /*
    * Keypress event that is bound to the document.
    */
    keyPress({ key }) {
      if (key === "Escape" || key === "Esc") this.cancel();
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  mounted() {
    if (this.programmatic) {
      if (!this.container) {
        document.body.appendChild(this.$el);
      } else {
        this.displayInFullPage = false;
        this.$emit("update:is-full-page", false);
        this.container.appendChild(this.$el);
      }
      this.isActive = true;
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  }
});

const _hoisted_1$s = /* @__PURE__ */ createElementVNode(
  "div",
  { class: "loading-icon" },
  null,
  -1
  /* HOISTED */
);
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: _ctx.animation }, {
    default: withCtx(() => [
      _ctx.isActive ? withDirectives((openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(["loading-overlay is-active", { "is-full-page": _ctx.displayInFullPage }])
        },
        [
          createElementVNode("div", {
            class: "loading-background",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.cancel && _ctx.cancel(...args))
          }),
          renderSlot(_ctx.$slots, "default", {}, () => [
            _hoisted_1$s
          ])
        ],
        2
        /* CLASS */
      )), [
        [vShow, _ctx.isActive]
      ]) : createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
var BLoading = /* @__PURE__ */ _export_sfc(Loading, [["render", _sfc_render$x]]);

var __defProp$5 = Object.defineProperty;
var __defProps$5 = Object.defineProperties;
var __getOwnPropDescs$5 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$5 = (a, b) => __defProps$5(a, __getOwnPropDescs$5(b));
var __publicField$4 = (obj, key, value) => __defNormalProp$5(obj, key + "" , value);
class LoadingProgrammatic {
  constructor(app) {
    __publicField$4(this, "app");
    this.app = app;
  }
  open(params) {
    const propsData = params;
    const container = document.createElement("div");
    const vueInstance = createApp({
      data() {
        return {
          loadingVNode: null
        };
      },
      methods: {
        close() {
          const loading = getComponentFromVNode(this.loadingVNode);
          if (loading) {
            loading.close();
          }
        }
      },
      render() {
        this.loadingVNode = h(
          BLoading,
          __spreadProps$5(__spreadValues$5({}, propsData), {
            programmatic: true,
            onClose(...args) {
              if (propsData.onClose) {
                propsData.onClose(...args);
              }
              setTimeout(() => {
                vueInstance.unmount();
              }, 150);
            }
          })
        );
        return this.loadingVNode;
      }
    });
    if (this.app) {
      copyAppContext(this.app, vueInstance);
    }
    return vueInstance.mount(container);
  }
}
const Plugin$p = {
  install(Vue) {
    registerComponent(Vue, BLoading);
    registerComponentProgrammatic(Vue, "loading", new LoadingProgrammatic(Vue));
  }
};

var MenuItemContainerMixin = defineComponent({
  provide() {
    return {
      BMenuItemContainer: this
    };
  },
  data() {
    return {
      menuItems: []
    };
  },
  methods: {
    appendMenuItem(item) {
      this.menuItems.push(item);
    },
    removeMenuItem(item) {
      const index = this.menuItems.indexOf(item);
      if (index !== -1) {
        this.menuItems.splice(index, 1);
      }
    }
  }
});

var _sfc_main$o = defineComponent({
  name: "BMenu",
  mixins: [MenuItemContainerMixin],
  props: {
    accordion: {
      type: Boolean,
      default: true
    },
    activable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      _isMenu: true
      // Used by MenuItem
    };
  }
});

const _hoisted_1$r = { class: "menu" };
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", null, [
    createElementVNode("div", _hoisted_1$r, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var Menu = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$w]]);

var _sfc_main$n = defineComponent({
  name: "BMenuList",
  components: {
    BIcon
  },
  props: {
    label: String,
    icon: String,
    iconPack: String,
    ariaRole: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "is-small"
    }
  }
});

const _hoisted_1$q = {
  key: 0,
  class: "menu-label"
};
const _hoisted_2$n = ["role"];
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      _ctx.label || _ctx.$slots.label ? (openBlock(), createElementBlock("p", _hoisted_1$q, [
        _ctx.label ? (openBlock(), createElementBlock(
          Fragment,
          { key: 0 },
          [
            _ctx.icon ? (openBlock(), createElementBlock(
              Fragment,
              { key: 0 },
              [
                createVNode(_component_b_icon, {
                  icon: _ctx.icon,
                  pack: _ctx.iconPack,
                  size: _ctx.size
                }, null, 8, ["icon", "pack", "size"]),
                createElementVNode(
                  "span",
                  null,
                  toDisplayString(_ctx.label),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createTextVNode(
                  toDisplayString(_ctx.label),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ],
          64
          /* STABLE_FRAGMENT */
        )) : renderSlot(_ctx.$slots, "label", { key: 1 })
      ])) : createCommentVNode("v-if", true),
      createElementVNode("ul", {
        class: "menu-list",
        role: _ctx.ariaRole === "menu" ? _ctx.ariaRole : void 0
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, _hoisted_2$n)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
var MenuList = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$v]]);

var _sfc_main$m = defineComponent({
  name: "BMenuItem",
  components: {
    BIcon
  },
  mixins: [CompatFallthroughMixin, MenuItemContainerMixin],
  inject: {
    parent: {
      from: "BMenuItemContainer",
      default: null
    }
  },
  // deprecated, to replace with default 'value' in the next breaking change
  props: {
    label: String,
    modelValue: Boolean,
    expanded: Boolean,
    disabled: Boolean,
    iconPack: String,
    icon: String,
    animation: {
      type: String,
      default: "slide"
    },
    tag: {
      type: [String, Object],
      default: "a",
      validator: (value) => {
        return typeof value === "object" || config.defaultLinkTags.indexOf(value) >= 0;
      }
    },
    ariaRole: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "is-small"
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "update:modelValue": (_isActive) => true,
    "update:expanded": (_isExpanded) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newActive: this.modelValue,
      newExpanded: this.expanded
    };
  },
  computed: {
    ariaRoleMenu() {
      return this.ariaRole === "menuitem" ? this.ariaRole : void 0;
    }
  },
  watch: {
    modelValue(value) {
      this.newActive = value;
    },
    expanded(value) {
      this.newExpanded = value;
    }
  },
  methods: {
    onClick() {
      if (this.disabled) return;
      const menu = this.getMenu();
      this.reset(this.parent, menu);
      this.newExpanded = this.$props.expanded || !this.newExpanded;
      this.$emit("update:expanded", this.newExpanded);
      if (menu && menu.activable) {
        this.newActive = true;
        this.$emit("update:modelValue", this.newActive);
      }
    },
    reset(parent, menu) {
      if (parent == null) {
        return;
      }
      parent.menuItems.forEach((item) => {
        if (item !== this) {
          this.reset(item, menu);
          if (!parent.$data._isMenu || parent.$data._isMenu && parent.accordion) {
            item.newExpanded = false;
            item.$emit("update:expanded", item.newExpanded);
          }
          if (menu && menu.activable) {
            item.newActive = false;
            item.$emit("update:modelValue", item.newActive);
          }
        }
      });
    },
    getMenu() {
      let parent = this.parent;
      while (parent && !parent.$data._isMenu) {
        parent = parent.parent;
      }
      return parent;
    }
  },
  mounted() {
    if (this.parent) {
      this.parent.appendMenuItem(this);
    }
  },
  beforeUnmount() {
    if (this.parent) {
      this.parent.removeMenuItem(this);
    }
  }
});

const _hoisted_1$p = ["role"];
const _hoisted_2$m = { key: 1 };
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock("li", mergeProps({ role: _ctx.ariaRoleMenu }, _ctx.rootAttrs), [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps(_ctx.fallthroughAttrs, {
      class: {
        "is-active": _ctx.newActive,
        "is-expanded": _ctx.newExpanded,
        "is-disabled": _ctx.disabled,
        "icon-text": _ctx.icon
      },
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.onClick())
    }), {
      default: withCtx(() => [
        _ctx.icon ? (openBlock(), createBlock(_component_b_icon, {
          key: 0,
          icon: _ctx.icon,
          pack: _ctx.iconPack,
          size: _ctx.size
        }, null, 8, ["icon", "pack", "size"])) : createCommentVNode("v-if", true),
        _ctx.label ? (openBlock(), createElementBlock(
          "span",
          _hoisted_2$m,
          toDisplayString(_ctx.label),
          1
          /* TEXT */
        )) : renderSlot(_ctx.$slots, "label", {
          key: 2,
          expanded: _ctx.newExpanded,
          active: _ctx.newActive
        })
      ]),
      _: 3
      /* FORWARDED */
    }, 16, ["class"])),
    createCommentVNode(" sub menu items "),
    _ctx.$slots.default ? (openBlock(), createBlock(Transition, {
      key: 0,
      name: _ctx.animation,
      persisted: ""
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode(
          "ul",
          null,
          [
            renderSlot(_ctx.$slots, "default")
          ],
          512
          /* NEED_PATCH */
        ), [
          [vShow, _ctx.newExpanded]
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"])) : createCommentVNode("v-if", true)
  ], 16, _hoisted_1$p);
}
var MenuItem = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$u]]);

const Plugin$o = {
  install(Vue) {
    registerComponent(Vue, Menu);
    registerComponent(Vue, MenuList, "BMenuList");
    registerComponent(Vue, MenuItem);
  }
};

var MessageMixin = defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    title: String,
    closable: {
      type: Boolean,
      default: true
    },
    message: String,
    type: String,
    hasIcon: Boolean,
    size: String,
    icon: String,
    iconPack: String,
    iconSize: String,
    autoClose: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2e3
    },
    progressBar: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    click: () => true,
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (value) => true
  },
  data() {
    return {
      isActive: this.modelValue,
      remainingTime: this.duration / 1e3,
      // in seconds
      newIconSize: this.iconSize || this.size || "is-large",
      timer: void 0
    };
  },
  computed: {
    /*
     * Icon name (MDI) based on type.
     */
    computedIcon() {
      if (this.icon) {
        return this.icon;
      }
      switch (this.type) {
        case "is-info":
          return "information";
        case "is-success":
          return "check-circle";
        case "is-warning":
          return "alert";
        case "is-danger":
          return "alert-circle";
        default:
          return null;
      }
    }
  },
  watch: {
    modelValue(value) {
      this.isActive = value;
    },
    isActive(value) {
      if (value) {
        this.setAutoClose();
        this.setDurationProgress();
      } else {
        if (this.timer) {
          clearTimeout(this.timer);
        }
      }
    }
  },
  methods: {
    /*
     * Close the Message and emit events.
     */
    close() {
      this.isActive = false;
      this.resetDurationProgress();
      this.$emit("close");
      this.$emit("update:modelValue", false);
    },
    click() {
      this.$emit("click");
    },
    /*
     * Set timer to auto close message
     */
    setAutoClose() {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          if (this.isActive) {
            this.close();
          }
        }, this.duration);
      }
    },
    setDurationProgress() {
      if (this.progressBar || this.autoClose) {
        this.$buefy.globalNoticeInterval = setInterval(() => {
          if (this.remainingTime !== 0) {
            this.remainingTime -= 1;
          } else {
            this.resetDurationProgress();
          }
        }, 1e3);
      }
    },
    resetDurationProgress() {
      setTimeout(() => {
        this.remainingTime = this.duration / 1e3;
        clearInterval(this.$buefy.globalNoticeInterval);
      }, 100);
    }
  },
  mounted() {
    this.setAutoClose();
  }
});

const PROGRESS_INJECTION_KEY = Symbol("bprogress");
const Progress$1 = defineComponent({
  name: "BProgress",
  provide() {
    return {
      [PROGRESS_INJECTION_KEY]: this
    };
  },
  props: {
    type: {
      type: [String, Object],
      default: "is-darkgrey"
    },
    size: {
      type: String
    },
    rounded: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      default: void 0
    },
    max: {
      type: Number,
      default: 100
    },
    showValue: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: "raw",
      validator: (value) => {
        return [
          "raw",
          "percent"
        ].indexOf(value) >= 0;
      }
    },
    precision: {
      type: Number,
      default: 2
    },
    keepTrailingZeroes: {
      type: Boolean,
      default: false
    },
    locale: {
      type: [String, Array],
      default: () => {
        return config.defaultLocale;
      },
      validator: (value) => {
        if (Array.isArray(value)) {
          return value.every((item) => typeof item === "string");
        }
        return typeof value === "string";
      }
    }
  },
  computed: {
    isIndeterminate() {
      return this.value === void 0 || this.value === null;
    },
    newType() {
      return [
        this.size,
        this.type,
        {
          "is-more-than-half": this.value && this.value > this.max / 2
        }
      ];
    },
    newValue() {
      return this.calculateValue(this.value);
    },
    isNative() {
      return this.$slots.bar === void 0;
    },
    wrapperClasses() {
      return {
        "is-not-native": !this.isNative,
        [this.size === void 0 ? "" : this.size]: typeof this.size === "string" && !this.isNative
      };
    }
  },
  watch: {
    /*
     * When value is changed back to undefined, value of native progress get reset to 0.
     * Need to add and remove the value attribute to have the indeterminate or not.
     */
    isIndeterminate(indeterminate) {
      this.$nextTick(() => {
        if (this.$refs.progress) {
          if (indeterminate) {
            this.$refs.progress.removeAttribute("value");
          } else {
            this.$refs.progress.setAttribute("value", this.value.toString());
          }
        }
      });
    }
  },
  methods: {
    calculateValue(value) {
      if (value === void 0 || value === null || isNaN(value)) {
        return void 0;
      }
      const minimumFractionDigits = this.keepTrailingZeroes ? this.precision : 0;
      const maximumFractionDigits = this.precision;
      if (this.format === "percent") {
        return new Intl.NumberFormat(
          this.locale,
          {
            style: "percent",
            minimumFractionDigits,
            maximumFractionDigits
          }
        ).format(value / this.max);
      }
      return new Intl.NumberFormat(
        this.locale,
        {
          minimumFractionDigits,
          maximumFractionDigits
        }
      ).format(value);
    }
  }
});

const _hoisted_1$o = ["max", "value"];
const _hoisted_2$l = {
  key: 2,
  class: "progress-value"
};
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["progress-wrapper", [_ctx.wrapperClasses, { "is-squared": !_ctx.rounded }]])
    },
    [
      _ctx.isNative ? (openBlock(), createElementBlock("progress", {
        key: 0,
        ref: "progress",
        class: normalizeClass(["progress", [_ctx.newType, { "is-squared": !_ctx.rounded }]]),
        max: _ctx.max,
        value: _ctx.value
      }, toDisplayString(_ctx.newValue), 11, _hoisted_1$o)) : renderSlot(_ctx.$slots, "bar", { key: 1 }),
      _ctx.isNative && _ctx.showValue ? (openBlock(), createElementBlock("p", _hoisted_2$l, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(
            toDisplayString(_ctx.newValue),
            1
            /* TEXT */
          )
        ])
      ])) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
var Progress = /* @__PURE__ */ _export_sfc(Progress$1, [["render", _sfc_render$t]]);

const Message$1 = defineComponent({
  name: "BMessage",
  components: {
    BIcon,
    BProgress: Progress
  },
  mixins: [MessageMixin],
  props: {
    ariaCloseLabel: String
  }
});

const _hoisted_1$n = {
  key: 0,
  class: "message-header"
};
const _hoisted_2$k = { key: 0 };
const _hoisted_3$c = { key: 1 };
const _hoisted_4$8 = ["aria-label"];
const _hoisted_5$6 = {
  key: 1,
  class: "message-body"
};
const _hoisted_6$4 = { class: "media" };
const _hoisted_7$3 = {
  key: 0,
  class: "media-left"
};
const _hoisted_8$3 = { class: "media-content" };
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_progress = resolveComponent("b-progress");
  return openBlock(), createBlock(Transition, {
    name: "fade",
    persisted: ""
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode(
        "article",
        {
          class: normalizeClass(["message", [_ctx.type, _ctx.size]])
        },
        [
          _ctx.$slots.header || _ctx.title ? (openBlock(), createElementBlock("header", _hoisted_1$n, [
            _ctx.$slots.header ? (openBlock(), createElementBlock("div", _hoisted_2$k, [
              renderSlot(_ctx.$slots, "header")
            ])) : _ctx.title ? (openBlock(), createElementBlock(
              "p",
              _hoisted_3$c,
              toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            _ctx.closable ? (openBlock(), createElementBlock("button", {
              key: 2,
              type: "button",
              class: "delete",
              onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
              "aria-label": _ctx.ariaCloseLabel
            }, null, 8, _hoisted_4$8)) : createCommentVNode("v-if", true)
          ])) : createCommentVNode("v-if", true),
          _ctx.$slots.default ? (openBlock(), createElementBlock("section", _hoisted_5$6, [
            createElementVNode("div", _hoisted_6$4, [
              _ctx.computedIcon && _ctx.hasIcon ? (openBlock(), createElementBlock("div", _hoisted_7$3, [
                createVNode(_component_b_icon, {
                  icon: _ctx.computedIcon,
                  pack: _ctx.iconPack,
                  class: normalizeClass(_ctx.type),
                  both: "",
                  size: _ctx.newIconSize
                }, null, 8, ["icon", "pack", "class", "size"])
              ])) : createCommentVNode("v-if", true),
              createElementVNode("div", _hoisted_8$3, [
                renderSlot(_ctx.$slots, "default")
              ])
            ])
          ])) : createCommentVNode("v-if", true),
          _ctx.progressBar ? (openBlock(), createBlock(_component_b_progress, {
            key: 2,
            class: "auto-close-progress",
            value: _ctx.remainingTime - 1,
            max: _ctx.duration / 1e3 - 1,
            type: _ctx.type,
            rounded: false
          }, null, 8, ["value", "max", "type"])) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3
    /* FORWARDED */
  });
}
var Message = /* @__PURE__ */ _export_sfc(Message$1, [["render", _sfc_render$s]]);

const Plugin$n = {
  install(Vue) {
    registerComponent(Vue, Message);
  }
};

var __defProp$4 = Object.defineProperty;
var __defProps$4 = Object.defineProperties;
var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$4 = (a, b) => __defProps$4(a, __getOwnPropDescs$4(b));
var __publicField$3 = (obj, key, value) => __defNormalProp$4(obj, key + "" , value);
class ModalProgrammatic {
  constructor(app) {
    __publicField$3(this, "app");
    this.app = app;
  }
  open(params) {
    if (typeof params === "string") {
      params = {
        content: params
      };
    }
    let slot;
    if (Array.isArray(params.content)) {
      slot = params.content;
      delete params.content;
    }
    const propsData = params;
    const container = document.createElement("div");
    const vueInstance = createApp({
      data() {
        return {
          modalVNode: null
        };
      },
      methods: {
        close() {
          const modal = getComponentFromVNode(this.modalVNode);
          if (modal) {
            modal.close();
          }
        }
      },
      render() {
        this.modalVNode = h(
          Modal,
          __spreadProps$4(__spreadValues$4({}, propsData), {
            programmatic: true,
            onClose: () => {
              vueInstance.unmount();
            },
            // intentionally overrides propsData.onCancel
            // to prevent propsData.onCancel from receiving a "cancel" event
            onCancel: () => {
            },
            cancelCallback: (method) => {
              if (propsData.onCancel != null) {
                propsData.onCancel(method);
              }
            }
          }),
          slot ? { default: () => slot } : void 0
        );
        return this.modalVNode;
      }
    });
    if (this.app) {
      copyAppContext(this.app, vueInstance);
    }
    return vueInstance.mount(container);
  }
}
const Plugin$m = {
  install(Vue) {
    registerComponent(Vue, Modal);
    registerComponentProgrammatic(Vue, "modal", new ModalProgrammatic(Vue));
  }
};

const Notification$1 = defineComponent({
  name: "BNotification",
  components: {
    BIcon,
    // directly registers Progress
    // in case Notification is programmatically opened
    BProgress: Progress
  },
  mixins: [MessageMixin],
  props: {
    position: String,
    ariaCloseLabel: String,
    animation: {
      type: String,
      default: "fade"
    }
  }
});

const _hoisted_1$m = ["aria-label"];
const _hoisted_2$j = {
  key: 1,
  class: "media"
};
const _hoisted_3$b = {
  key: 0,
  class: "media-left"
};
const _hoisted_4$7 = { class: "media-content" };
const _hoisted_5$5 = ["innerHTML"];
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_progress = resolveComponent("b-progress");
  return openBlock(), createBlock(Transition, {
    name: _ctx.animation,
    persisted: ""
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode(
        "article",
        {
          class: normalizeClass(["notification", [_ctx.type, _ctx.position]]),
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.click && _ctx.click(...args))
        },
        [
          _ctx.closable ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "delete",
            type: "button",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
            "aria-label": _ctx.ariaCloseLabel
          }, null, 8, _hoisted_1$m)) : createCommentVNode("v-if", true),
          _ctx.$slots.default || _ctx.message ? (openBlock(), createElementBlock("div", _hoisted_2$j, [
            _ctx.computedIcon && _ctx.hasIcon ? (openBlock(), createElementBlock("div", _hoisted_3$b, [
              createVNode(_component_b_icon, {
                icon: _ctx.computedIcon,
                pack: _ctx.iconPack,
                size: _ctx.newIconSize,
                both: "",
                "aria-hidden": ""
              }, null, 8, ["icon", "pack", "size"])
            ])) : createCommentVNode("v-if", true),
            createElementVNode("div", _hoisted_4$7, [
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(
                Fragment,
                { key: 1 },
                [
                  createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                  createElementVNode("p", {
                    class: "text",
                    innerHTML: _ctx.message
                  }, null, 8, _hoisted_5$5)
                ],
                64
                /* STABLE_FRAGMENT */
              ))
            ])
          ])) : createCommentVNode("v-if", true),
          _ctx.progressBar ? (openBlock(), createBlock(_component_b_progress, {
            key: 2,
            class: "auto-close-progress",
            value: _ctx.remainingTime - 1,
            max: _ctx.duration / 1e3 - 1,
            type: _ctx.type,
            rounded: false
          }, null, 8, ["value", "max", "type"])) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
var Notification = /* @__PURE__ */ _export_sfc(Notification$1, [["render", _sfc_render$r]]);

var NoticeMixin = defineComponent({
  props: {
    type: {
      type: String,
      default: "is-dark"
    },
    message: [String, Array],
    duration: Number,
    queue: {
      type: Boolean,
      default: void 0
    },
    indefinite: {
      type: Boolean,
      default: false
    },
    pauseOnHover: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "is-top",
      validator(value) {
        return NOTICE_POSITIONS.indexOf(value) > -1;
      }
    },
    container: String
  },
  emits: {
    click: () => true,
    close: () => true
  },
  data() {
    return {
      isActive: false,
      isPaused: false,
      parentTop: null,
      parentBottom: null,
      newContainer: this.container || config.defaultContainerElement,
      timer: void 0,
      // host container should override `newDuration`
      newDuration: this.duration || 0
    };
  },
  computed: {
    correctParent() {
      switch (this.position) {
        case "is-top-right":
        case "is-top":
        case "is-top-left":
          return this.parentTop;
        case "is-bottom-right":
        case "is-bottom":
        case "is-bottom-left":
          return this.parentBottom;
        default: {
          const exhaustiveCheck = this.position;
          throw new RangeError(`invalid position: ${exhaustiveCheck}`);
        }
      }
    },
    transition() {
      switch (this.position) {
        case "is-top-right":
        case "is-top":
        case "is-top-left":
          return {
            enter: "fadeInDown",
            leave: "fadeOut"
          };
        case "is-bottom-right":
        case "is-bottom":
        case "is-bottom-left":
          return {
            enter: "fadeInUp",
            leave: "fadeOut"
          };
        default: {
          const exhaustiveCheck = this.position;
          throw new RangeError(`invalid position: ${exhaustiveCheck}`);
        }
      }
    }
  },
  methods: {
    pause() {
      if (this.pauseOnHover && !this.indefinite) {
        this.isPaused = true;
        clearInterval(this.$buefy.globalNoticeInterval);
      }
    },
    removePause() {
      if (this.pauseOnHover && !this.indefinite) {
        this.isPaused = false;
        this.close();
      }
    },
    shouldQueue() {
      const queue = this.queue !== void 0 ? this.queue : config.defaultNoticeQueue;
      if (!queue) return false;
      return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
    },
    click() {
      this.$emit("click");
    },
    close() {
      if (!this.isPaused) {
        clearTimeout(this.timer);
        this.isActive = false;
        this.$emit("close");
        setTimeout(() => {
          removeElement(this.$el);
        }, 150);
      }
    },
    timeoutCallback() {
      return this.close();
    },
    showNotice() {
      if (this.shouldQueue()) this.correctParent.innerHTML = "";
      this.correctParent.insertAdjacentElement("afterbegin", this.$el);
      this.isActive = true;
      if (!this.indefinite) {
        this.timer = setTimeout(() => this.timeoutCallback(), this.newDuration);
      }
    },
    setupContainer() {
      this.parentTop = document.querySelector((this.newContainer ? this.newContainer : "body") + ">.notices.is-top");
      this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : "body") + ">.notices.is-bottom");
      if (this.parentTop && this.parentBottom) return;
      if (!this.parentTop) {
        this.parentTop = document.createElement("div");
        this.parentTop.className = "notices is-top";
      }
      if (!this.parentBottom) {
        this.parentBottom = document.createElement("div");
        this.parentBottom.className = "notices is-bottom";
      }
      const container = document.querySelector(this.newContainer) || document.body;
      container.appendChild(this.parentTop);
      container.appendChild(this.parentBottom);
      if (this.newContainer) {
        this.parentTop.classList.add("has-custom-container");
        this.parentBottom.classList.add("has-custom-container");
      }
    }
  },
  beforeMount() {
    this.setupContainer();
  },
  mounted() {
    this.showNotice();
  }
});

const NotificationNotice$1 = defineComponent({
  name: "BNotificationNotice",
  components: { BNotification: Notification },
  mixins: [NoticeMixin],
  data() {
    return {
      newDuration: this.duration || config.defaultNotificationDuration
    };
  },
  emits: {
    close: () => true
  },
  methods: {
    close() {
      if (!this.isPaused) {
        clearTimeout(this.timer);
        this.$refs.notification.isActive = false;
        this.$emit("close");
        setTimeout(() => {
          removeElement(this.$el);
        }, 150);
      }
    }
  }
});

function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_notification = resolveComponent("b-notification");
  return _ctx.$slots.default != null ? (openBlock(), createBlock(_component_b_notification, mergeProps({
    key: 0,
    ref: "notification",
    position: _ctx.position,
    "model-value": _ctx.isActive,
    type: _ctx.type,
    message: _ctx.message,
    duration: _ctx.duration
  }, _ctx.$attrs, {
    onClick: _ctx.click,
    onClose: _ctx.close,
    onMouseenter: _ctx.pause,
    onMouseleave: _ctx.removePause
  }), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["position", "model-value", "type", "message", "duration", "onClick", "onClose", "onMouseenter", "onMouseleave"])) : (openBlock(), createBlock(_component_b_notification, mergeProps({
    key: 1,
    ref: "notification",
    position: _ctx.position,
    "model-value": _ctx.isActive,
    type: _ctx.type,
    message: _ctx.message,
    duration: _ctx.duration
  }, _ctx.$attrs, {
    onClick: _ctx.click,
    onClose: _ctx.close,
    onMouseenter: _ctx.pause,
    onMouseleave: _ctx.removePause
  }), null, 16, ["position", "model-value", "type", "message", "duration", "onClick", "onClose", "onMouseenter", "onMouseleave"]));
}
var NotificationNotice = /* @__PURE__ */ _export_sfc(NotificationNotice$1, [["render", _sfc_render$q]]);

var __defProp$3 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$3.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$3.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField$2 = (obj, key, value) => __defNormalProp$3(obj, key + "" , value);
class NotificationProgrammatic {
  constructor(app) {
    __publicField$2(this, "app");
    this.app = app;
  }
  open(params) {
    if (typeof params === "string") {
      params = {
        message: params
      };
    }
    let slot;
    let _a = params, { message } = _a, restParams = __objRest$2(_a, ["message"]);
    if (typeof message !== "string") {
      slot = message;
      message = void 0;
    }
    const propsData = __spreadValues$3({
      position: config.defaultNotificationPosition || "is-top-right",
      message
    }, restParams);
    const container = document.createElement("div");
    const vueInstance = createApp({
      data() {
        return {
          noticeVNode: null
        };
      },
      methods: {
        close() {
          const notice = getComponentFromVNode(this.noticeVNode);
          if (notice) {
            notice.close();
          }
        }
      },
      render() {
        this.noticeVNode = h(
          NotificationNotice,
          __spreadProps$3(__spreadValues$3({}, propsData), {
            onClose: () => {
              if (propsData.onClose != null) {
                propsData.onClose();
              }
              setTimeout(() => {
                vueInstance.unmount();
              }, 150);
            }
          }),
          slot != null ? { default: () => slot } : void 0
        );
        return this.noticeVNode;
      }
    });
    if (this.app) {
      copyAppContext(this.app, vueInstance);
    } else {
      vueInstance.config.globalProperties.$buefy = {};
    }
    return vueInstance.mount(container);
  }
}
const Plugin$l = {
  install(Vue) {
    registerComponent(Vue, Notification);
    registerComponentProgrammatic(Vue, "notification", new NotificationProgrammatic(Vue));
  }
};

var _sfc_main$l = defineComponent({
  name: "NavbarBurger",
  props: {
    isOpened: {
      type: Boolean,
      default: false
    }
  }
});

const _hoisted_1$l = ["aria-expanded"];
const _hoisted_2$i = /* @__PURE__ */ createElementVNode(
  "span",
  { "aria-hidden": "true" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_3$a = /* @__PURE__ */ createElementVNode(
  "span",
  { "aria-hidden": "true" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_4$6 = /* @__PURE__ */ createElementVNode(
  "span",
  { "aria-hidden": "true" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_5$4 = /* @__PURE__ */ createElementVNode(
  "span",
  { "aria-hidden": "true" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_6$3 = [
  _hoisted_2$i,
  _hoisted_3$a,
  _hoisted_4$6,
  _hoisted_5$4
];
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("a", mergeProps({
    role: "button",
    class: ["navbar-burger burger", { "is-active": _ctx.isOpened }],
    "aria-label": "menu",
    "aria-expanded": _ctx.isOpened || void 0
  }, _ctx.$attrs, { tabindex: "0" }), [..._hoisted_6$3], 16, _hoisted_1$l);
}
var NavbarBurger = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$p]]);

const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
const events = isTouch ? ["touchstart", "click"] : ["click"];
const instances = [];
function processArgs(bindingValue) {
  const isFunction = typeof bindingValue === "function";
  if (!isFunction && typeof bindingValue !== "object") {
    throw new Error(`v-click-outside: Binding value should be a function or an object, ${typeof bindingValue} given`);
  }
  return {
    handler: isFunction ? bindingValue : bindingValue.handler,
    middleware: !isFunction && bindingValue.middleware || ((isClickOutside) => !!isClickOutside),
    events: !isFunction && bindingValue.events || events
  };
}
function onEvent({ el, event, handler, middleware }) {
  const isClickOutside = event.target !== el && !el.contains(event.target);
  if (!isClickOutside || !middleware(event, el)) {
    return;
  }
  handler(event, el);
}
function toggleEventListeners({ eventHandlers }, action) {
  eventHandlers.forEach(({ event, handler }) => {
    document[`${action}EventListener`](event, handler);
  });
}
function beforeMount(el, { value }) {
  const { handler, middleware, events: events2 } = processArgs(value);
  const instance = {
    el,
    eventHandlers: events2.map((eventName) => ({
      event: eventName,
      handler: (event) => onEvent({ event, el, handler, middleware })
    }))
  };
  toggleEventListeners(instance, "add");
  instances.push(instance);
}
function updated(el, { value }) {
  const { handler, middleware, events: events2 } = processArgs(value);
  const instance = instances.filter((instance2) => instance2.el === el)[0];
  toggleEventListeners(instance, "remove");
  instance.eventHandlers = events2.map((eventName) => ({
    event: eventName,
    handler: (event) => onEvent({ event, el, handler, middleware })
  }));
  toggleEventListeners(instance, "add");
}
function unmounted(el) {
  const instance = instances.filter((instance2) => instance2.el === el)[0];
  toggleEventListeners(instance, "remove");
}
const directive = {
  beforeMount,
  updated,
  unmounted
};

const FIXED_TOP_CLASS = "is-fixed-top";
const BODY_FIXED_TOP_CLASS = "has-navbar-fixed-top";
const BODY_SPACED_FIXED_TOP_CLASS = "has-spaced-navbar-fixed-top";
const FIXED_BOTTOM_CLASS = "is-fixed-bottom";
const BODY_FIXED_BOTTOM_CLASS = "has-navbar-fixed-bottom";
const BODY_SPACED_FIXED_BOTTOM_CLASS = "has-spaced-navbar-fixed-bottom";
const BODY_CENTERED_CLASS = "has-navbar-centered";
const isFilled = (str) => !!str;
var _sfc_main$k = defineComponent({
  name: "BNavbar",
  components: {
    NavbarBurger
  },
  directives: {
    clickOutside: directive
  },
  props: {
    type: [String, Object],
    transparent: {
      type: Boolean,
      default: false
    },
    fixedTop: {
      type: Boolean,
      default: false
    },
    fixedBottom: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    },
    wrapperClass: {
      type: [String, Array, Object]
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    mobileBurger: {
      type: Boolean,
      default: true
    },
    spaced: Boolean,
    shadow: Boolean
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (_value) => true
  },
  data() {
    return {
      internalIsActive: this.modelValue,
      _isNavBar: true
      // Used internally by NavbarItem
    };
  },
  computed: {
    isOpened() {
      return this.internalIsActive;
    },
    computedClasses() {
      return [
        this.type,
        {
          [FIXED_TOP_CLASS]: this.fixedTop,
          [FIXED_BOTTOM_CLASS]: this.fixedBottom,
          [BODY_CENTERED_CLASS]: this.centered,
          "is-spaced": this.spaced,
          "has-shadow": this.shadow,
          "is-transparent": this.transparent
        }
      ];
    }
  },
  watch: {
    modelValue: {
      handler(active) {
        this.internalIsActive = active;
      },
      immediate: true
    },
    fixedTop(isSet) {
      this.setBodyFixedTopClass(isSet);
    },
    bottomTop(isSet) {
      this.setBodyFixedBottomClass(isSet);
    }
  },
  methods: {
    toggleActive() {
      this.internalIsActive = !this.internalIsActive;
      this.emitUpdateParentEvent();
    },
    closeMenu() {
      if (this.closeOnClick && this.internalIsActive) {
        this.internalIsActive = false;
        this.emitUpdateParentEvent();
      }
    },
    emitUpdateParentEvent() {
      this.$emit("update:modelValue", this.internalIsActive);
    },
    setBodyClass(className) {
      if (typeof window !== "undefined") {
        document.body.classList.add(className);
      }
    },
    removeBodyClass(className) {
      if (typeof window !== "undefined") {
        document.body.classList.remove(className);
      }
    },
    checkIfFixedPropertiesAreColliding() {
      const areColliding = this.fixedTop && this.fixedBottom;
      if (areColliding) {
        throw new Error("You should choose if the BNavbar is fixed bottom or fixed top, but not both");
      }
    },
    genNavbar() {
      const navBarSlots = [
        this.genNavbarBrandNode(),
        this.genNavbarSlotsNode()
      ];
      if (!isFilled(this.wrapperClass)) {
        return this.genNavbarSlots(navBarSlots);
      }
      const navWrapper = h(
        "div",
        { class: this.wrapperClass },
        navBarSlots
      );
      return this.genNavbarSlots([navWrapper]);
    },
    genNavbarSlots(slots) {
      const vnode = h(
        "nav",
        {
          class: ["navbar", this.computedClasses],
          role: "navigation",
          "aria-label": "main navigation"
        },
        slots
      );
      return withDirectives(vnode, [
        [resolveDirective("click-outside"), this.closeMenu]
      ]);
    },
    genNavbarBrandNode() {
      const children = this.$slots.brand != null ? [this.$slots.brand(), this.genBurgerNode()] : this.genBurgerNode();
      return h(
        "div",
        { class: "navbar-brand" },
        children
      );
    },
    genBurgerNode() {
      if (this.mobileBurger) {
        const defaultBurgerNode = h(
          resolveComponent("navbar-burger"),
          {
            isOpened: this.isOpened,
            onClick: this.toggleActive,
            onKeyup: (event) => {
              if (event.keyCode !== 13) return;
              this.toggleActive();
            }
          }
        );
        const hasBurgerSlot = !!this.$slots.burger;
        return hasBurgerSlot ? this.$slots.burger({
          isOpened: this.isOpened,
          toggleActive: this.toggleActive
        }) : defaultBurgerNode;
      }
    },
    genNavbarSlotsNode() {
      return h(
        "div",
        { class: ["navbar-menu", { "is-active": this.isOpened }] },
        [
          this.genMenuPosition("start"),
          this.genMenuPosition("end")
        ]
      );
    },
    genMenuPosition(positionName) {
      return h(
        "div",
        { class: `navbar-${positionName}` },
        this.$slots[positionName] != null ? this.$slots[positionName]() : []
      );
    },
    setBodyFixedTopClass(isSet) {
      this.checkIfFixedPropertiesAreColliding();
      if (isSet) {
        this.setBodyClass(BODY_FIXED_TOP_CLASS);
        this.spaced && this.setBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
      } else {
        this.removeBodyClass(BODY_FIXED_TOP_CLASS);
        this.removeBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
      }
    },
    setBodyFixedBottomClass(isSet) {
      this.checkIfFixedPropertiesAreColliding();
      if (isSet) {
        this.setBodyClass(BODY_FIXED_BOTTOM_CLASS);
        this.spaced && this.setBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
      } else {
        this.removeBodyClass(BODY_FIXED_BOTTOM_CLASS);
        this.removeBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
      }
    }
  },
  beforeMount() {
    this.fixedTop && this.setBodyFixedTopClass(true);
    this.fixedBottom && this.setBodyFixedBottomClass(true);
  },
  beforeUnmount() {
    if (this.fixedTop) {
      const className = this.spaced ? BODY_SPACED_FIXED_TOP_CLASS : BODY_FIXED_TOP_CLASS;
      this.removeBodyClass(className);
    } else if (this.fixedBottom) {
      const className = this.spaced ? BODY_SPACED_FIXED_BOTTOM_CLASS : BODY_FIXED_BOTTOM_CLASS;
      this.removeBodyClass(className);
    }
  },
  render() {
    return this.genNavbar();
  }
});

const clickableWhiteList = ["div", "span", "input"];
var _sfc_main$j = defineComponent({
  name: "BNavbarItem",
  inheritAttrs: false,
  props: {
    tag: {
      type: [String, Object],
      default: "a"
    },
    active: Boolean
  },
  methods: {
    /*
     * Keypress event that is bound to the document
     */
    keyPress({ key }) {
      if (key === "Escape" || key === "Esc") {
        this.closeMenuRecursive(this, ["NavBar"]);
      }
    },
    /*
     * Close parent if clicked outside.
     */
    handleClickEvent(event) {
      const isOnWhiteList = clickableWhiteList.some((item) => item === event.target.localName);
      if (!isOnWhiteList) {
        const parent = this.closeMenuRecursive(this, ["NavbarDropdown", "NavBar"]);
        if (parent && parent.$data._isNavbarDropdown) this.closeMenuRecursive(parent, ["NavBar"]);
      }
    },
    /*
     * Close parent recursively
     */
    closeMenuRecursive(current, targetComponents) {
      const parent = current.$parent;
      if (!parent) return null;
      const foundItem = targetComponents.reduce((acc, item) => {
        if (parent.$data[`_is${item}`]) {
          parent.closeMenu();
          return parent;
        }
        return acc;
      }, null);
      return foundItem || this.closeMenuRecursive(parent, targetComponents);
    }
  },
  mounted() {
    if (typeof window !== "undefined") {
      this.$el.addEventListener("click", this.handleClickEvent);
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      this.$el.removeEventListener("click", this.handleClickEvent);
      document.removeEventListener("keyup", this.keyPress);
    }
  }
});

function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
    class: ["navbar-item", {
      "is-active": _ctx.active
    }]
  }, _ctx.$attrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["class"]);
}
var NavbarItem = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$o]]);

var _sfc_main$i = defineComponent({
  name: "BNavbarDropdown",
  directives: {
    clickOutside: directive
  },
  mixins: [CompatFallthroughMixin],
  props: {
    label: String,
    hoverable: Boolean,
    active: Boolean,
    right: Boolean,
    arrowless: Boolean,
    boxed: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    collapsible: Boolean,
    tag: {
      type: [String, Object],
      default: "a"
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "active-change": (_active) => true
  },
  data() {
    return {
      newActive: this.active,
      isHoverable: this.hoverable,
      _isNavbarDropdown: true
      // Used internally by NavbarItem
    };
  },
  watch: {
    active(value) {
      this.newActive = value;
    },
    newActive(value) {
      this.$emit("active-change", value);
    }
  },
  methods: {
    toggleMenu() {
      this.newActive = !this.newActive;
    },
    showMenu() {
      this.newActive = true;
    },
    /*
    * See naming convetion of navbaritem
    */
    closeMenu() {
      this.newActive = !this.closeOnClick;
      if (this.hoverable && this.closeOnClick) {
        this.isHoverable = false;
      }
    },
    checkHoverable() {
      if (this.hoverable) {
        this.isHoverable = true;
      }
    }
  }
});

function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_click_outside = resolveDirective("click-outside");
  return withDirectives((openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["navbar-item has-dropdown", {
        "is-hoverable": _ctx.isHoverable,
        "is-active": _ctx.newActive
      }],
      onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.checkHoverable && _ctx.checkHoverable(...args))
    }, _ctx.rootAttrs),
    [
      (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
        class: ["navbar-link", {
          "is-arrowless": _ctx.arrowless,
          "is-active": _ctx.newActive && _ctx.collapsible
        }]
      }, _ctx.fallthroughAttrs, {
        "aria-haspopup": "true",
        onClick: withModifiers(_ctx.toggleMenu, ["prevent"]),
        onKeyup: withKeys(_ctx.toggleMenu, ["enter"]),
        tabindex: "0"
      }), {
        default: withCtx(() => [
          _ctx.label ? (openBlock(), createElementBlock(
            Fragment,
            { key: 0 },
            [
              createTextVNode(
                toDisplayString(_ctx.label),
                1
                /* TEXT */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : renderSlot(_ctx.$slots, "label", { key: 1 })
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["class", "onClick", "onKeyup"])),
      createElementVNode(
        "div",
        {
          class: normalizeClass(["navbar-dropdown", {
            "is-right": _ctx.right,
            "is-boxed": _ctx.boxed,
            "is-hidden-touch": _ctx.collapsible && !_ctx.newActive
          }])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )
    ],
    16
    /* FULL_PROPS */
  )), [
    [_directive_click_outside, _ctx.closeMenu]
  ]);
}
var NavbarDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$n]]);

const Plugin$k = {
  install(Vue) {
    registerComponent(Vue, _sfc_main$k);
    registerComponent(Vue, NavbarItem);
    registerComponent(Vue, NavbarDropdown);
  }
};

const CONTROLS_ALIGNMENTS = ["left", "right", "center"];
var _sfc_main$h = defineComponent({
  name: "BNumberinput",
  components: {
    BIcon,
    BInput
  },
  mixins: [CompatFallthroughMixin, FormElementMixin],
  inject: {
    field: {
      from: "BField",
      default: false
    }
  },
  props: {
    modelValue: [Number, null],
    min: {
      type: [Number, String]
    },
    max: [Number, String],
    step: [Number, String],
    minStep: [Number, String],
    exponential: [Boolean, Number],
    disabled: Boolean,
    type: {
      type: String,
      default: "is-primary"
    },
    editable: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: true
    },
    controlsAlignment: {
      type: String,
      default: "center",
      validator: (value) => {
        return CONTROLS_ALIGNMENTS.indexOf(value) >= 0;
      }
    },
    controlsRounded: {
      type: Boolean,
      default: false
    },
    controlsPosition: String,
    placeholder: [Number, String],
    ariaMinusLabel: String,
    ariaPlusLabel: String,
    longPress: {
      type: Boolean,
      default: true
    },
    // Native options to use in HTML5 validation
    autocomplete: String
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    blur: (_event) => true,
    focus: (_event) => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newValue: this.modelValue,
      newStep: this.step || 1,
      newMinStep: this.minStep,
      timesPressed: 1,
      _elementRef: "input",
      _$intervalRef: void 0
    };
  },
  computed: {
    computedValue: {
      // getter has to include `string` in the return type so that the
      // setter can accept `string`
      get() {
        return this.newValue;
      },
      set(value) {
        let newValue = Number(value) === 0 ? 0 : Number(value) || null;
        if (value === "" || value === void 0 || value === null) {
          newValue = null;
        }
        this.newValue = newValue;
        if (newValue === null) {
          this.$emit("update:modelValue", newValue);
        } else if (!isNaN(newValue)) {
          this.$emit("update:modelValue", Number(newValue));
        }
        this.$nextTick(() => {
          if (this.$refs.input) {
            this.$refs.input.checkHtml5Validity();
          }
        });
      }
    },
    controlsLeft() {
      if (this.controls && this.controlsAlignment !== "right") {
        return this.controlsAlignment === "left" ? ["minus", "plus"] : ["minus"];
      }
      return [];
    },
    controlsRight() {
      if (this.controls && this.controlsAlignment !== "left") {
        return this.controlsAlignment === "right" ? ["minus", "plus"] : ["plus"];
      }
      return [];
    },
    fieldClasses() {
      return [
        { "has-addons": this.controlsPosition === "compact" },
        { "is-grouped": this.controlsPosition !== "compact" },
        { "is-expanded": this.expanded }
      ];
    },
    buttonClasses() {
      return [this.type, this.size, { "is-rounded": this.controlsRounded }];
    },
    minNumber() {
      return typeof this.min === "string" ? parseFloat(this.min) : this.min;
    },
    maxNumber() {
      return typeof this.max === "string" ? parseFloat(this.max) : this.max;
    },
    stepNumber() {
      if (this.newStep === "any") {
        return 1;
      }
      return typeof this.newStep === "string" ? parseFloat(this.newStep) : this.newStep;
    },
    minStepNumber() {
      if (this.newStep === "any" && typeof this.newMinStep === "undefined") {
        return "any";
      }
      const step = typeof this.newMinStep !== "undefined" ? this.newMinStep : this.newStep;
      return typeof step === "string" ? parseFloat(step) : step;
    },
    disabledMin() {
      return +this.computedValue - this.stepNumber < this.minNumber;
    },
    disabledMax() {
      return +this.computedValue + this.stepNumber > this.maxNumber;
    },
    stepDecimals() {
      const step = this.minStepNumber.toString();
      const index = step.indexOf(".");
      if (index >= 0) {
        return step.substring(index + 1).length;
      }
      return 0;
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    /*
     * When v-model is changed:
     *   1. Set internal value.
     */
    modelValue: {
      immediate: true,
      handler(value) {
        this.newValue = value;
      }
    },
    step(value) {
      this.newStep = value;
    },
    minStep(value) {
      this.newMinStep = value;
    }
  },
  methods: {
    isDisabled(control) {
      return this.disabled || (control === "plus" ? this.disabledMax : this.disabledMin);
    },
    decrement() {
      if (this.computedValue === null || typeof this.computedValue === "undefined") {
        if (this.maxNumber !== null && typeof this.maxNumber !== "undefined") {
          this.computedValue = this.maxNumber;
          return;
        }
        this.computedValue = 0;
      }
      if (typeof this.minNumber === "undefined" || +this.computedValue - this.stepNumber >= this.minNumber) {
        const value = +this.computedValue - this.stepNumber;
        this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
      }
    },
    increment() {
      if (this.computedValue === null || typeof this.computedValue === "undefined" || +this.computedValue < this.minNumber) {
        if (this.minNumber !== null && typeof this.minNumber !== "undefined") {
          this.computedValue = this.minNumber;
          return;
        }
        this.computedValue = 0;
      }
      if (typeof this.maxNumber === "undefined" || +this.computedValue + this.stepNumber <= this.maxNumber) {
        const value = +this.computedValue + this.stepNumber;
        this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
      }
    },
    onControlClick(event, inc) {
      if (event.detail !== 0 || event.type !== "click") return;
      if (inc) this.increment();
      else this.decrement();
    },
    longPressTick(inc) {
      if (inc) this.increment();
      else this.decrement();
      if (!this.longPress) return;
      this._$intervalRef = setTimeout(() => {
        this.longPressTick(inc);
      }, this.exponential ? 250 / (+this.exponential * this.timesPressed++) : 250);
    },
    onStartLongPress(event, inc) {
      if (event.button !== 0 && event.type !== "touchstart") return;
      clearTimeout(this._$intervalRef);
      this.longPressTick(inc);
    },
    onStopLongPress() {
      if (!this._$intervalRef) return;
      this.timesPressed = 1;
      clearTimeout(this._$intervalRef);
      this._$intervalRef = void 0;
    }
  },
  mounted() {
    if (this.field === this.$parent) {
      this.$parent.wrapNumberinput({
        controlsPosition: this.controlsPosition,
        size: this.size
      });
    }
  },
  beforeUnmount() {
    clearTimeout(this._$intervalRef);
  }
});

const _hoisted_1$k = ["disabled", "aria-label", "onMousedown", "onTouchstart", "onClick"];
const _hoisted_2$h = ["disabled", "aria-label", "onMousedown", "onTouchstart", "onClick"];
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_input = resolveComponent("b-input");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["b-numberinput field", _ctx.fieldClasses]
    }, _ctx.rootAttrs),
    [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.controlsLeft, (control) => {
          return openBlock(), createElementBlock(
            "p",
            {
              key: control,
              class: normalizeClass(["control", control]),
              onMouseup: _cache[0] || (_cache[0] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args))
            },
            [
              createElementVNode("button", {
                type: "button",
                class: normalizeClass(["button", _ctx.buttonClasses]),
                disabled: _ctx.isDisabled(control) || void 0,
                "aria-label": control === "plus" ? _ctx.ariaPlusLabel : _ctx.ariaMinusLabel,
                onMousedown: ($event) => !_ctx.isDisabled(control) && _ctx.onStartLongPress($event, control === "plus"),
                onTouchstart: withModifiers(($event) => !_ctx.isDisabled(control) && _ctx.onStartLongPress($event, control === "plus"), ["prevent"]),
                onClick: ($event) => !_ctx.isDisabled(control) && _ctx.onControlClick($event, control === "plus")
              }, [
                createVNode(_component_b_icon, {
                  both: "",
                  icon: control,
                  pack: _ctx.iconPack,
                  size: _ctx.iconSize
                }, null, 8, ["icon", "pack", "size"])
              ], 42, _hoisted_1$k)
            ],
            34
            /* CLASS, NEED_HYDRATION */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      createVNode(_component_b_input, mergeProps({
        type: "number",
        ref: "input",
        modelValue: _ctx.computedValue,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.computedValue = $event)
      }, _ctx.fallthroughAttrs, {
        step: _ctx.minStepNumber,
        max: _ctx.max,
        min: _ctx.min,
        size: _ctx.size,
        disabled: _ctx.disabledOrUndefined,
        readonly: !_ctx.editable,
        loading: _ctx.loading,
        rounded: _ctx.rounded,
        icon: _ctx.icon,
        "icon-pack": _ctx.iconPack,
        autocomplete: _ctx.autocomplete,
        expanded: _ctx.expanded,
        placeholder: _ctx.placeholder,
        "use-html5-validation": _ctx.useHtml5Validation,
        onFocus: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("focus", $event)),
        onBlur: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("blur", $event))
      }), null, 16, ["modelValue", "step", "max", "min", "size", "disabled", "readonly", "loading", "rounded", "icon", "icon-pack", "autocomplete", "expanded", "placeholder", "use-html5-validation"]),
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.controlsRight, (control) => {
          return openBlock(), createElementBlock(
            "p",
            {
              key: control,
              class: normalizeClass(["control", control]),
              onMouseup: _cache[7] || (_cache[7] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onMouseleave: _cache[8] || (_cache[8] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onTouchend: _cache[9] || (_cache[9] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args)),
              onTouchcancel: _cache[10] || (_cache[10] = (...args) => _ctx.onStopLongPress && _ctx.onStopLongPress(...args))
            },
            [
              createElementVNode("button", {
                type: "button",
                class: normalizeClass(["button", _ctx.buttonClasses]),
                disabled: _ctx.isDisabled(control) || void 0,
                "aria-label": control === "plus" ? _ctx.ariaPlusLabel : _ctx.ariaMinusLabel,
                onMousedown: ($event) => !_ctx.isDisabled(control) && _ctx.onStartLongPress($event, control === "plus"),
                onTouchstart: withModifiers(($event) => !_ctx.isDisabled(control) && _ctx.onStartLongPress($event, control === "plus"), ["prevent"]),
                onClick: ($event) => !_ctx.isDisabled(control) && _ctx.onControlClick($event, control === "plus")
              }, [
                createVNode(_component_b_icon, {
                  both: "",
                  icon: control,
                  pack: _ctx.iconPack,
                  size: _ctx.iconSize
                }, null, 8, ["icon", "pack", "size"])
              ], 42, _hoisted_2$h)
            ],
            34
            /* CLASS, NEED_HYDRATION */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    16
    /* FULL_PROPS */
  );
}
var Numberinput = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$m]]);

const Plugin$j = {
  install(Vue) {
    registerComponent(Vue, Numberinput);
  }
};

var _sfc_main$g = defineComponent({
  name: "BPaginationButton",
  props: {
    page: {
      type: Object,
      required: true
    },
    tag: {
      type: [String, Object],
      default: "a",
      validator: (value) => {
        return typeof value === "object" || config.defaultLinkTags.indexOf(value) >= 0;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    href() {
      if (this.tag === "a") {
        return "#";
      } else {
        return void 0;
      }
    },
    isDisabled() {
      return this.disabled || this.page.disabled;
    },
    disabledOrUndefined() {
      return this.isDisabled || void 0;
    }
  }
});

function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
    role: "button",
    href: _ctx.href,
    disabled: _ctx.disabledOrUndefined,
    class: ["pagination-link", { "is-current": _ctx.page.isCurrent, [_ctx.page.class]: true }]
  }, _ctx.$attrs, {
    onClick: withModifiers(_ctx.page.click, ["prevent"]),
    "aria-label": _ctx.page["aria-label"],
    "aria-current": _ctx.page.isCurrent || void 0
  }), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(
          toDisplayString(_ctx.page.number),
          1
          /* TEXT */
        )
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["href", "disabled", "class", "onClick", "aria-label", "aria-current"]);
}
var PaginationButton = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$l]]);

function debounce(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = function() {
      timeout = void 0;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

var _sfc_main$f = defineComponent({
  name: "BPagination",
  components: {
    BIcon,
    BPaginationButton: PaginationButton
  },
  props: {
    total: [Number, String],
    perPage: {
      type: [Number, String],
      default: 20
    },
    modelValue: {
      type: [Number, String],
      default: 1
    },
    rangeBefore: {
      type: [Number, String],
      default: 1
    },
    rangeAfter: {
      type: [Number, String],
      default: 1
    },
    size: String,
    simple: Boolean,
    rounded: Boolean,
    order: String,
    iconPack: String,
    iconPrev: {
      type: String,
      default: () => {
        return config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: () => {
        return config.defaultIconNext;
      }
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    pageInput: {
      type: Boolean,
      default: false
    },
    pageInputPosition: String,
    debouncePageInput: [Number, String]
  },
  data() {
    return {
      inputValue: this.modelValue,
      debounceHandlePageInput: void 0
    };
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    change: (_num) => true,
    "update:modelValue": (_num) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  computed: {
    rootClasses() {
      return [
        this.order,
        this.size,
        this.pageInputPosition,
        {
          "is-simple": this.simple,
          "is-rounded": this.rounded,
          "has-input": this.pageInput
        }
      ];
    },
    beforeCurrent() {
      return parseInt(this.rangeBefore + "");
    },
    afterCurrent() {
      return parseInt(this.rangeAfter + "");
    },
    /*
    * Total page size (count).
    */
    pageCount() {
      return Math.ceil(+this.total / +this.perPage);
    },
    /*
    * First item of the page (count).
    */
    firstItem() {
      const firstItem = +this.modelValue * +this.perPage - +this.perPage + 1;
      return firstItem >= 0 ? firstItem : 0;
    },
    /*
    * Check if previous button is available.
    */
    hasPrev() {
      return +this.modelValue > 1;
    },
    /*
     * Check if first page button should be visible.
    */
    hasFirst() {
      return +this.modelValue >= 2 + this.beforeCurrent;
    },
    /*
    * Check if first ellipsis should be visible.
    */
    hasFirstEllipsis() {
      return +this.modelValue >= this.beforeCurrent + 4;
    },
    /*
    * Check if last page button should be visible.
    */
    hasLast() {
      return +this.modelValue <= this.pageCount - (1 + this.afterCurrent);
    },
    /*
    * Check if last ellipsis should be visible.
    */
    hasLastEllipsis() {
      return +this.modelValue < this.pageCount - (2 + this.afterCurrent);
    },
    /*
    * Check if next button is available.
    */
    hasNext() {
      return +this.modelValue < this.pageCount;
    },
    /*
    * Get near pages, 1 before and 1 after the current.
    * Also add the click event to the array.
    */
    pagesInRange() {
      if (this.simple) return;
      let left = Math.max(1, +this.modelValue - this.beforeCurrent);
      if (left - 1 === 2) {
        left--;
      }
      let right = Math.min(+this.modelValue + this.afterCurrent, this.pageCount);
      if (this.pageCount - right === 2) {
        right++;
      }
      const pages = [];
      for (let i = left; i <= right; i++) {
        pages.push(this.getPage(i));
      }
      return pages;
    }
  },
  watch: {
    /*
    * If current page is trying to be greater than page count, set to last.
    */
    pageCount(value) {
      if (this.modelValue > value) this.last();
    },
    modelValue(value) {
      this.inputValue = value;
    },
    debouncePageInput: {
      handler(value) {
        this.debounceHandlePageInput = debounce(
          this.handleOnInputPageChange,
          value
        );
      },
      immediate: true
    }
  },
  methods: {
    /*
    * Previous button click listener.
    */
    prev(event) {
      this.changePage(+this.modelValue - 1, event);
    },
    /*
     * Next button click listener.
    */
    next(event) {
      this.changePage(+this.modelValue + 1, event);
    },
    /*
     * First button click listener.
    */
    first(event) {
      this.changePage(1, event);
    },
    /*
    * Last button click listener.
    */
    last(event) {
      this.changePage(this.pageCount, event);
    },
    changePage(num, event) {
      if (this.modelValue === num || num < 1 || num > this.pageCount) return;
      this.$emit("update:modelValue", num);
      this.$emit("change", num);
      if (event && event.target) {
        this.$nextTick(() => event.target.focus());
      }
    },
    getPage(num, options = {}) {
      return {
        number: num,
        isCurrent: this.modelValue === num,
        click: (event) => this.changePage(num, event),
        input: (event, inputNum) => this.changePage(+inputNum, event),
        disabled: options.disabled || false,
        class: options.class || "",
        "aria-label": options["aria-label"] || this.getAriaPageLabel(num, this.modelValue === num)
      };
    },
    /*
    * Get text for aria-label according to page number.
    */
    getAriaPageLabel(pageNumber, isCurrent) {
      if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
        return this.ariaPageLabel + " " + pageNumber + ".";
      } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
        return this.ariaCurrentLabel + ", " + this.ariaPageLabel + " " + pageNumber + ".";
      }
      return null;
    },
    handleOnInputPageChange(event) {
      this.getPage(+this.inputValue).input(event, this.inputValue);
    },
    handleOnInputDebounce(event) {
      if (this.debouncePageInput) {
        this.debounceHandlePageInput(event);
      } else {
        this.handleOnInputPageChange(event);
      }
    },
    handleOnKeyPress(event) {
      const ASCIICode = event.which || event.keyCode;
      if (ASCIICode >= 48 && ASCIICode <= 57) {
        return true;
      } else {
        return event.preventDefault();
      }
    },
    handleAllowableInputPageRange(event) {
      const target = event.target;
      if (+target.value > 0 && +target.value <= this.pageCount) {
        this.handleOnInputValue(event);
      } else {
        this.inputValue = 1;
        this.inputValue = "";
      }
    },
    handleOnInputValue(event) {
      const inputValue = +event.target.value;
      this.inputValue = inputValue;
      if (Number.isInteger(this.inputValue)) {
        this.handleOnInputDebounce(event);
      } else {
        this.inputValue = this.modelValue;
      }
    }
  }
});

const _hoisted_1$j = { class: "control pagination-input" };
const _hoisted_2$g = ["value", "size", "maxlength"];
const _hoisted_3$9 = {
  key: 4,
  class: "info"
};
const _hoisted_4$5 = {
  key: 5,
  class: "pagination-list"
};
const _hoisted_5$3 = { key: 0 };
const _hoisted_6$2 = { key: 1 };
const _hoisted_7$2 = /* @__PURE__ */ createElementVNode(
  "span",
  { class: "pagination-ellipsis" },
  "…",
  -1
  /* HOISTED */
);
const _hoisted_8$2 = [
  _hoisted_7$2
];
const _hoisted_9$2 = { key: 2 };
const _hoisted_10$1 = /* @__PURE__ */ createElementVNode(
  "span",
  { class: "pagination-ellipsis" },
  "…",
  -1
  /* HOISTED */
);
const _hoisted_11$1 = [
  _hoisted_10$1
];
const _hoisted_12$1 = { key: 3 };
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  const _component_BPaginationButton = resolveComponent("BPaginationButton");
  return openBlock(), createElementBlock(
    "nav",
    {
      class: normalizeClass(["pagination", _ctx.rootClasses])
    },
    [
      _ctx.$slots.previous ? renderSlot(_ctx.$slots, "previous", {
        key: 0,
        page: _ctx.getPage(+_ctx.modelValue - 1, {
          disabled: !_ctx.hasPrev,
          class: "pagination-previous",
          "aria-label": _ctx.ariaPreviousLabel
        })
      }, () => [
        createVNode(_component_b_icon, {
          icon: _ctx.iconPrev,
          pack: _ctx.iconPack,
          both: "",
          "aria-hidden": "true"
        }, null, 8, ["icon", "pack"])
      ]) : (openBlock(), createBlock(_component_BPaginationButton, {
        key: 1,
        class: "pagination-previous",
        disabled: !_ctx.hasPrev,
        page: _ctx.getPage(+_ctx.modelValue - 1),
        "aria-label": _ctx.ariaPreviousLabel
      }, {
        default: withCtx(() => [
          createVNode(_component_b_icon, {
            icon: _ctx.iconPrev,
            pack: _ctx.iconPack,
            both: "",
            "aria-hidden": "true"
          }, null, 8, ["icon", "pack"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "page", "aria-label"])),
      _ctx.$slots.next ? renderSlot(_ctx.$slots, "next", {
        key: 2,
        page: _ctx.getPage(+_ctx.modelValue + 1, {
          disabled: !_ctx.hasNext,
          class: "pagination-next",
          "aria-label": _ctx.ariaNextLabel
        })
      }, () => [
        createVNode(_component_b_icon, {
          icon: _ctx.iconNext,
          pack: _ctx.iconPack,
          both: "",
          "aria-hidden": "true"
        }, null, 8, ["icon", "pack"])
      ]) : (openBlock(), createBlock(_component_BPaginationButton, {
        key: 3,
        class: "pagination-next",
        disabled: !_ctx.hasNext,
        page: _ctx.getPage(+_ctx.modelValue + 1),
        "aria-label": _ctx.ariaNextLabel
      }, {
        default: withCtx(() => [
          createVNode(_component_b_icon, {
            icon: _ctx.iconNext,
            pack: _ctx.iconPack,
            both: "",
            "aria-hidden": "true"
          }, null, 8, ["icon", "pack"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled", "page", "aria-label"])),
      createElementVNode("div", _hoisted_1$j, [
        _ctx.pageInput ? (openBlock(), createElementBlock("input", {
          key: 0,
          class: "input",
          value: _ctx.inputValue,
          onInput: _cache[0] || (_cache[0] = (...args) => _ctx.handleAllowableInputPageRange && _ctx.handleAllowableInputPageRange(...args)),
          onKeypress: _cache[1] || (_cache[1] = (...args) => _ctx.handleOnKeyPress && _ctx.handleOnKeyPress(...args)),
          size: _ctx.pageCount.toString().length,
          maxlength: _ctx.pageCount.toString().length
        }, null, 40, _hoisted_2$g)) : createCommentVNode("v-if", true)
      ]),
      _ctx.simple ? (openBlock(), createElementBlock("small", _hoisted_3$9, [
        _ctx.perPage == 1 ? (openBlock(), createElementBlock(
          Fragment,
          { key: 0 },
          [
            createTextVNode(
              toDisplayString(_ctx.firstItem) + " / " + toDisplayString(_ctx.total),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : (openBlock(), createElementBlock(
          Fragment,
          { key: 1 },
          [
            createTextVNode(
              toDisplayString(_ctx.firstItem) + "-" + toDisplayString(Math.min(+_ctx.modelValue * +_ctx.perPage, +_ctx.total)) + " / " + toDisplayString(_ctx.total),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ])) : (openBlock(), createElementBlock("ul", _hoisted_4$5, [
        createCommentVNode("First"),
        _ctx.hasFirst ? (openBlock(), createElementBlock("li", _hoisted_5$3, [
          _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", {
            key: 0,
            page: _ctx.getPage(1)
          }) : (openBlock(), createBlock(_component_BPaginationButton, {
            key: 1,
            page: _ctx.getPage(1)
          }, null, 8, ["page"]))
        ])) : createCommentVNode("v-if", true),
        _ctx.hasFirstEllipsis ? (openBlock(), createElementBlock("li", _hoisted_6$2, [..._hoisted_8$2])) : createCommentVNode("v-if", true),
        createCommentVNode("Pages"),
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.pagesInRange, (page) => {
            return openBlock(), createElementBlock("li", {
              key: page.number
            }, [
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", {
                key: 0,
                page
              }) : (openBlock(), createBlock(_component_BPaginationButton, {
                key: 1,
                page
              }, null, 8, ["page"]))
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        createCommentVNode("Last"),
        _ctx.hasLastEllipsis ? (openBlock(), createElementBlock("li", _hoisted_9$2, [..._hoisted_11$1])) : createCommentVNode("v-if", true),
        _ctx.hasLast ? (openBlock(), createElementBlock("li", _hoisted_12$1, [
          _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", {
            key: 0,
            page: _ctx.getPage(_ctx.pageCount)
          }) : (openBlock(), createBlock(_component_BPaginationButton, {
            key: 1,
            page: _ctx.getPage(_ctx.pageCount)
          }, null, 8, ["page"]))
        ])) : createCommentVNode("v-if", true)
      ]))
    ],
    2
    /* CLASS */
  );
}
var BPagination = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$k]]);

const Plugin$i = {
  install(Vue) {
    registerComponent(Vue, BPagination);
    registerComponent(Vue, PaginationButton);
  }
};

const ProgressBar$1 = defineComponent({
  name: "BProgressBar",
  inject: {
    parent: {
      from: PROGRESS_INJECTION_KEY,
      default: void 0
    }
  },
  props: {
    type: {
      type: [String],
      default: void 0
    },
    value: {
      type: Number,
      default: void 0
    },
    showValue: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    parentProgress() {
      return this.parent;
    },
    newType() {
      return [
        this.parentProgress.size,
        this.type || this.parentProgress.type
      ];
    },
    newShowValue() {
      return this.showValue || this.parentProgress.showValue;
    },
    newValue() {
      return this.parentProgress.calculateValue(this.value);
    },
    barWidth() {
      return `${(this.value === void 0 ? 0 : this.value) * 100 / this.parentProgress.max}%`;
    }
  }
});

const _hoisted_1$i = ["aria-valuenow", "aria-valuemax"];
const _hoisted_2$f = {
  key: 0,
  class: "progress-value"
};
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["progress-bar", _ctx.newType]),
    role: "progressbar",
    "aria-valuenow": _ctx.value,
    "aria-valuemax": _ctx.parentProgress.max,
    "aria-valuemin": "0",
    style: normalizeStyle({ width: _ctx.barWidth })
  }, [
    _ctx.newShowValue ? (openBlock(), createElementBlock("p", _hoisted_2$f, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(
          toDisplayString(_ctx.newValue),
          1
          /* TEXT */
        )
      ])
    ])) : createCommentVNode("v-if", true)
  ], 14, _hoisted_1$i);
}
var ProgressBar = /* @__PURE__ */ _export_sfc(ProgressBar$1, [["render", _sfc_render$j]]);

const Plugin$h = {
  install(Vue) {
    registerComponent(Vue, Progress);
    registerComponent(Vue, ProgressBar);
  }
};

const Radio$1 = defineComponent({
  name: "BRadio",
  mixins: [CheckRadioMixin]
});

const _hoisted_1$h = ["disabled"];
const _hoisted_2$e = ["disabled", "required", "name", "value"];
const _hoisted_3$8 = { class: "control-label" };
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["b-radio radio", [_ctx.size, { "is-disabled": _ctx.disabled }]]),
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
    onKeydown: _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
  }, [
    withDirectives(createElementVNode("input", {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
      type: "radio",
      ref: "input",
      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
      }, ["stop"])),
      disabled: _ctx.disabledOrUndefined,
      required: _ctx.requiredOrUndefined,
      name: _ctx.name,
      value: _ctx.nativeValue
    }, null, 8, _hoisted_2$e), [
      [vModelRadio, _ctx.computedValue]
    ]),
    createElementVNode(
      "span",
      {
        class: normalizeClass(["check", _ctx.type])
      },
      null,
      2
      /* CLASS */
    ),
    createElementVNode("span", _hoisted_3$8, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 42, _hoisted_1$h);
}
var Radio = /* @__PURE__ */ _export_sfc(Radio$1, [["render", _sfc_render$i]]);

const RadioButon = defineComponent({
  name: "BRadioButton",
  mixins: [CheckRadioMixin],
  props: {
    type: {
      type: String,
      default: "is-primary"
    },
    expanded: Boolean
  },
  data() {
    return {
      isFocused: false
    };
  },
  computed: {
    isSelected() {
      return this.newValue === this.nativeValue;
    },
    labelClass() {
      return [
        this.isSelected ? this.type : null,
        this.size,
        {
          "is-selected": this.isSelected,
          "is-disabled": this.disabled,
          "is-focused": this.isFocused
        }
      ];
    }
  }
});

const _hoisted_1$g = ["disabled"];
const _hoisted_2$d = ["disabled", "required", "name", "value"];
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["control", { "is-expanded": _ctx.expanded }])
    },
    [
      createElementVNode("label", {
        class: normalizeClass(["b-radio radio button", _ctx.labelClass]),
        ref: "label",
        disabled: _ctx.disabledOrUndefined,
        onClick: _cache[4] || (_cache[4] = (...args) => _ctx.focus && _ctx.focus(...args)),
        onKeydown: _cache[5] || (_cache[5] = withKeys(withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
      }, [
        renderSlot(_ctx.$slots, "default"),
        withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
          type: "radio",
          ref: "input",
          onClick: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["stop"])),
          disabled: _ctx.disabledOrUndefined,
          required: _ctx.requiredOrUndefined,
          name: _ctx.name,
          value: _ctx.nativeValue,
          onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.isFocused = true),
          onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.isFocused = false)
        }, null, 40, _hoisted_2$d), [
          [vModelRadio, _ctx.computedValue]
        ])
      ], 42, _hoisted_1$g)
    ],
    2
    /* CLASS */
  );
}
var RadioButton = /* @__PURE__ */ _export_sfc(RadioButon, [["render", _sfc_render$h]]);

const Plugin$g = {
  install(Vue) {
    registerComponent(Vue, Radio);
    registerComponent(Vue, RadioButton);
  }
};

const Rate$1 = defineComponent({
  name: "BRate",
  components: {
    BIcon
  },
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    icon: {
      type: String,
      default: "star"
    },
    iconPack: String,
    size: String,
    spaced: Boolean,
    rtl: Boolean,
    disabled: Boolean,
    showScore: Boolean,
    showText: Boolean,
    customText: String,
    texts: Array,
    locale: {
      type: [String, Array],
      default: () => {
        return config.defaultLocale;
      }
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    change: (newValue) => true,
    "update:modelValue": (newValue) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newValue: this.modelValue,
      hoverValue: 0
    };
  },
  computed: {
    halfStyle() {
      return `width:${this.valueDecimal}%`;
    },
    showMe() {
      let result = "";
      if (this.showScore) {
        result = this.disabled ? this.modelValue.toString() : this.newValue.toString();
        if (Number(result) === 0) {
          result = "";
        } else {
          result = new Intl.NumberFormat(this.locale).format(this.modelValue);
        }
      } else if (this.showText && this.texts) {
        result = this.texts[Math.ceil(this.newValue) - 1];
      }
      return result;
    },
    valueDecimal() {
      return this.modelValue * 100 - Math.floor(this.modelValue) * 100;
    }
  },
  watch: {
    // When v-model is changed set the new value.
    modelValue(value) {
      this.newValue = value;
    }
  },
  methods: {
    resetNewValue() {
      if (this.disabled) return;
      this.hoverValue = 0;
    },
    previewRate(index, event) {
      if (this.disabled) return;
      this.hoverValue = index;
      event.stopPropagation();
    },
    confirmValue(index) {
      if (this.disabled) return;
      this.newValue = index;
      this.$emit("change", this.newValue);
      this.$emit("update:modelValue", this.newValue);
    },
    checkHalf(index) {
      const showWhenDisabled = this.disabled && this.valueDecimal > 0 && index - 1 < this.modelValue && index > this.modelValue;
      return showWhenDisabled;
    },
    rateClass(index) {
      let output = "";
      const currentValue = this.hoverValue !== 0 ? this.hoverValue : this.newValue;
      if (index <= currentValue) {
        output = "set-on";
      } else if (this.disabled && Math.ceil(this.modelValue) === index) {
        output = "set-half";
      }
      return output;
    }
  }
});

const _hoisted_1$f = ["onMousemove", "onClick"];
const _hoisted_2$c = { key: 0 };
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["rate", { "is-disabled": _ctx.disabled, "is-spaced": _ctx.spaced, "is-rtl": _ctx.rtl }])
    },
    [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.max, (item, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["rate-item", _ctx.rateClass(item)]),
            key: index,
            onMousemove: ($event) => _ctx.previewRate(item, $event),
            onMouseleave: _cache[0] || (_cache[0] = (...args) => _ctx.resetNewValue && _ctx.resetNewValue(...args)),
            onClick: withModifiers(($event) => _ctx.confirmValue(item), ["prevent"])
          }, [
            createVNode(_component_b_icon, {
              pack: _ctx.iconPack,
              icon: _ctx.icon,
              size: _ctx.size
            }, null, 8, ["pack", "icon", "size"]),
            _ctx.checkHalf(item) ? (openBlock(), createBlock(_component_b_icon, {
              key: 0,
              class: "is-half",
              pack: _ctx.iconPack,
              icon: _ctx.icon,
              size: _ctx.size,
              style: normalizeStyle(_ctx.halfStyle)
            }, null, 8, ["pack", "icon", "size", "style"])) : createCommentVNode("v-if", true)
          ], 42, _hoisted_1$f);
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      _ctx.showText || _ctx.showScore || _ctx.customText ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(["rate-text", _ctx.size])
        },
        [
          createElementVNode(
            "span",
            null,
            toDisplayString(_ctx.showMe),
            1
            /* TEXT */
          ),
          _ctx.customText && !_ctx.showText ? (openBlock(), createElementBlock(
            "span",
            _hoisted_2$c,
            toDisplayString(_ctx.customText),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
var Rate = /* @__PURE__ */ _export_sfc(Rate$1, [["render", _sfc_render$g]]);

const Plugin$f = {
  install(Vue) {
    registerComponent(Vue, Rate);
  }
};

const Plugin$e = {
  install(Vue) {
    registerComponent(Vue, BSelect);
  }
};

const SKELETON_POSITIONS = ["", "is-centered", "is-right"];
const BSkeleton = (props) => {
  if (!props.active) return;
  const items = [];
  const width = props.width;
  const height = props.height;
  for (let i = 0; i < props.count; i++) {
    items.push(h("div", {
      class: [
        "b-skeleton-item",
        { "is-rounded": props.rounded }
      ],
      key: i,
      style: {
        height: height === void 0 ? null : isNaN(+height) ? height : height + "px",
        width: width === void 0 ? null : isNaN(+width) ? width : width + "px",
        borderRadius: props.circle ? "50%" : null
      }
    }));
  }
  return h(
    "div",
    {
      class: [
        "b-skeleton",
        props.size,
        props.position,
        { "is-animated": props.animated }
      ]
    },
    items
  );
};
BSkeleton.props = {
  active: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: true
  },
  width: [Number, String],
  height: [Number, String],
  circle: Boolean,
  rounded: {
    type: Boolean,
    default: true
  },
  count: {
    type: Number,
    default: 1
  },
  position: {
    type: String,
    default: "",
    validator(value) {
      return SKELETON_POSITIONS.indexOf(value) > -1;
    }
  },
  size: String
};

const Plugin$d = {
  install(Vue) {
    registerComponent(Vue, BSkeleton, "BSkeleton");
  }
};

const SIDEBAR_POSITIONS = ["fixed", "absolute", "static"];
const SCROLL_BEHAVIORS = ["clip", "keep"];
var _sfc_main$e = defineComponent({
  name: "BSidebar",
  props: {
    modelValue: Boolean,
    type: [String, Object],
    overlay: Boolean,
    position: {
      type: String,
      default: "fixed",
      validator: (value) => {
        return SIDEBAR_POSITIONS.indexOf(value) >= 0;
      }
    },
    fullheight: Boolean,
    fullwidth: Boolean,
    right: Boolean,
    mobile: {
      type: String
    },
    reduce: Boolean,
    expandOnHover: Boolean,
    expandOnHoverFixed: Boolean,
    delay: {
      type: [Number, null],
      default: () => config.defaultSidebarDelay
    },
    canCancel: {
      type: [Array, Boolean],
      default: () => ["escape", "outside"]
    },
    onCancel: {
      type: Function,
      default: () => {
      }
    },
    scroll: {
      type: String,
      default: () => {
        return config.defaultModalScroll ? config.defaultModalScroll : "clip";
      },
      validator: (value) => {
        return SCROLL_BEHAVIORS.indexOf(value) >= 0;
      }
    }
  },
  emits: {
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (_value) => true
  },
  data() {
    return {
      isOpen: this.modelValue,
      isDelayOver: false,
      transitionName: void 0,
      animating: true,
      savedScrollTop: null,
      hasLeaved: false,
      timer: void 0
    };
  },
  computed: {
    rootClasses() {
      return [this.type, {
        "is-fixed": this.isFixed,
        "is-static": this.isStatic,
        "is-absolute": this.isAbsolute,
        "is-fullheight": this.fullheight,
        "is-fullwidth": this.fullwidth,
        "is-right": this.right,
        "is-mini": this.reduce && !this.isDelayOver,
        "is-mini-expand": this.expandOnHover || this.isDelayOver,
        "is-mini-expand-fixed": this.expandOnHover && this.expandOnHoverFixed || this.isDelayOver,
        "is-mini-delayed": this.delay !== null,
        "is-mini-mobile": this.mobile === "reduce",
        "is-hidden-mobile": this.mobile === "hide",
        "is-fullwidth-mobile": this.mobile === "fullwidth"
      }];
    },
    cancelOptions() {
      return typeof this.canCancel === "boolean" ? this.canCancel ? ["escape", "outside"] : [] : this.canCancel;
    },
    isStatic() {
      return this.position === "static";
    },
    isFixed() {
      return this.position === "fixed";
    },
    isAbsolute() {
      return this.position === "absolute";
    }
  },
  watch: {
    modelValue: {
      handler(value) {
        this.isOpen = value;
        if (this.overlay) {
          this.handleScroll();
        }
        const open = this.right ? !value : value;
        this.transitionName = !open ? "slide-prev" : "slide-next";
      },
      immediate: true
    }
  },
  methods: {
    /*
    * Keypress event that is bound to the document.
    */
    keyPress({ key }) {
      if (this.isFixed) {
        if (this.isOpen && (key === "Escape" || key === "Esc")) this.cancel("escape");
      }
    },
    /*
    * Close the Sidebar if canCancel and call the onCancel prop (function).
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cancel(method, ...args) {
      if (this.cancelOptions.indexOf(method) < 0) return;
      if (this.isStatic) return;
      this.onCancel.call(null, method, ...args);
      this.close();
    },
    /*
    * Call the onCancel prop (function) and emit events
    */
    close() {
      this.isOpen = false;
      this.$emit("close");
      this.$emit("update:modelValue", false);
    },
    /*
     * Close fixed sidebar if clicked outside.
     */
    clickedOutside(event) {
      if (!this.isFixed || !this.isOpen || this.animating) {
        return;
      }
      if (!event.composedPath().includes(this.$refs.sidebarContent)) {
        this.cancel("outside");
      }
    },
    /*
    * Transition before-enter hook
    */
    beforeEnter() {
      this.animating = true;
    },
    /*
    * Transition after-leave hook
    */
    afterEnter() {
      this.animating = false;
    },
    handleScroll() {
      if (typeof window === "undefined") return;
      if (this.scroll === "clip") {
        if (this.modelValue) {
          document.documentElement.classList.add("is-clipped");
        } else {
          document.documentElement.classList.remove("is-clipped");
        }
        return;
      }
      this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
      if (this.modelValue) {
        document.body.classList.add("is-noscroll");
      } else {
        document.body.classList.remove("is-noscroll");
      }
      if (this.modelValue) {
        document.body.style.top = `-${this.savedScrollTop}px`;
        return;
      }
      document.documentElement.scrollTop = this.savedScrollTop;
      document.body.style.top = "";
      this.savedScrollTop = null;
    },
    onHover() {
      if (this.delay) {
        this.hasLeaved = false;
        this.timer = setTimeout(() => {
          if (!this.hasLeaved) {
            this.isDelayOver = true;
          }
          this.timer = void 0;
        }, this.delay);
      } else {
        this.isDelayOver = false;
      }
    },
    onHoverLeave() {
      this.hasLeaved = true;
      this.timer = void 0;
      this.isDelayOver = false;
    },
    /*
     * Close sidebar if close button is clicked.
     */
    clickedCloseButton() {
      if (this.isFixed) {
        if (this.isOpen && this.fullwidth) {
          this.cancel("outside");
        }
      }
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
      document.addEventListener("click", this.clickedOutside);
    }
  },
  mounted() {
    if (typeof window !== "undefined") {
      if (this.isFixed) {
        document.body.appendChild(this.$el);
      }
    }
    if (this.overlay && this.modelValue) {
      this.handleScroll();
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
      document.removeEventListener("click", this.clickedOutside);
      if (this.overlay) {
        document.documentElement.classList.remove("is-clipped");
        const savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
        document.body.classList.remove("is-noscroll");
        document.documentElement.scrollTop = savedScrollTop;
        document.body.style.top = "";
      }
    }
    if (this.isFixed) {
      removeElement(this.$el);
    }
    clearTimeout(this.timer);
  }
});

const _hoisted_1$e = { class: "b-sidebar" };
const _hoisted_2$b = {
  key: 0,
  class: "sidebar-background"
};
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$e, [
    _ctx.overlay && _ctx.isOpen ? (openBlock(), createElementBlock("div", _hoisted_2$b)) : createCommentVNode("v-if", true),
    createVNode(Transition, {
      name: _ctx.transitionName,
      onBeforeEnter: _ctx.beforeEnter,
      onAfterEnter: _ctx.afterEnter,
      persisted: ""
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode(
          "div",
          {
            ref: "sidebarContent",
            class: normalizeClass(["sidebar-content navbar", _ctx.rootClasses]),
            onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.onHover && _ctx.onHover(...args)),
            onMouseleave: _cache[2] || (_cache[2] = (...args) => _ctx.onHoverLeave && _ctx.onHoverLeave(...args))
          },
          [
            _ctx.fullwidth ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickedCloseButton && _ctx.clickedCloseButton(...args)),
              class: "modal-close is-large sidebar-close",
              "aria-label": "Close"
            })) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default")
          ],
          34
          /* CLASS, NEED_HYDRATION */
        ), [
          [vShow, _ctx.isOpen]
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name", "onBeforeEnter", "onAfterEnter"])
  ]);
}
var Sidebar = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$f]]);

const Plugin$c = {
  install(Vue) {
    registerComponent(Vue, Sidebar);
  }
};

const DISPLAY_FORMATS = ["raw", "percent"];

var _sfc_main$d = defineComponent({
  name: "BSliderThumb",
  components: {
    BTooltip: Tooltip
  },
  mixins: [CompatFallthroughMixin],
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ""
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    indicator: {
      type: Boolean,
      default: false
    },
    customFormatter: Function,
    format: {
      type: String,
      default: "raw",
      validator: (value) => {
        return DISPLAY_FORMATS.indexOf(value) >= 0;
      }
    },
    locale: {
      type: [String, Array],
      default: () => {
        return config.defaultLocale;
      }
    },
    tooltipAlways: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    dragend: () => true,
    dragstart: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (_value) => true
  },
  data() {
    return {
      isFocused: false,
      dragging: false,
      startX: 0,
      startPosition: 0,
      newPosition: null,
      oldValue: this.modelValue
    };
  },
  computed: {
    parent() {
      return this.$parent;
    },
    disabled() {
      return this.parent.disabled;
    },
    max() {
      return this.parent.max;
    },
    min() {
      return this.parent.min;
    },
    step() {
      return this.parent.step;
    },
    precision() {
      return this.parent.precision;
    },
    currentPosition() {
      return `${(this.modelValue - this.min) / (this.max - this.min) * 100}%`;
    },
    wrapperStyle() {
      return { left: this.currentPosition };
    },
    formattedValue() {
      if (typeof this.customFormatter !== "undefined") {
        return this.customFormatter(this.modelValue);
      }
      if (this.format === "percent") {
        return new Intl.NumberFormat(
          this.locale,
          {
            style: "percent"
          }
        ).format((this.modelValue - this.min) / (this.max - this.min));
      }
      return new Intl.NumberFormat(this.locale).format(this.modelValue);
    }
  },
  methods: {
    onFocus() {
      this.isFocused = true;
    },
    onBlur() {
      this.isFocused = false;
    },
    onButtonDown(event) {
      if (this.disabled) return;
      event.preventDefault();
      this.onDragStart(event);
      if (typeof window !== "undefined") {
        document.addEventListener("mousemove", this.onDragging);
        document.addEventListener("touchmove", this.onDragging);
        document.addEventListener("mouseup", this.onDragEnd);
        document.addEventListener("touchend", this.onDragEnd);
        document.addEventListener("contextmenu", this.onDragEnd);
      }
    },
    onLeftKeyDown() {
      if (this.disabled || this.modelValue === this.min) return;
      this.newPosition = parseFloat(this.currentPosition) - this.step / (this.max - this.min) * 100;
      this.setPosition(this.newPosition);
      this.parent.emitValue("change");
    },
    onRightKeyDown() {
      if (this.disabled || this.modelValue === this.max) return;
      this.newPosition = parseFloat(this.currentPosition) + this.step / (this.max - this.min) * 100;
      this.setPosition(this.newPosition);
      this.parent.emitValue("change");
    },
    onHomeKeyDown() {
      if (this.disabled || this.modelValue === this.min) return;
      this.newPosition = 0;
      this.setPosition(this.newPosition);
      this.parent.emitValue("change");
    },
    onEndKeyDown() {
      if (this.disabled || this.modelValue === this.max) return;
      this.newPosition = 100;
      this.setPosition(this.newPosition);
      this.parent.emitValue("change");
    },
    onDragStart(event) {
      this.dragging = true;
      this.$emit("dragstart");
      this.startX = event.type === "touchstart" ? event.touches[0].clientX : event.clientX;
      this.startPosition = parseFloat(this.currentPosition);
      this.newPosition = this.startPosition;
    },
    onDragging(event) {
      if (this.dragging) {
        const clientX = event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
        const diff = (clientX - this.startX) / this.parent.sliderSize() * 100;
        this.newPosition = this.startPosition + diff;
        this.setPosition(this.newPosition);
      }
    },
    onDragEnd() {
      this.dragging = false;
      this.$emit("dragend");
      if (this.modelValue !== this.oldValue) {
        this.parent.emitValue("change");
      }
      this.setPosition(this.newPosition);
      if (typeof window !== "undefined") {
        document.removeEventListener("mousemove", this.onDragging);
        document.removeEventListener("touchmove", this.onDragging);
        document.removeEventListener("mouseup", this.onDragEnd);
        document.removeEventListener("touchend", this.onDragEnd);
        document.removeEventListener("contextmenu", this.onDragEnd);
      }
    },
    setPosition(percent) {
      if (percent === null || isNaN(percent)) return;
      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }
      const stepLength = 100 / ((this.max - this.min) / this.step);
      const steps = Math.round(percent / stepLength);
      let value = steps * stepLength / 100 * (this.max - this.min) + this.min;
      value = parseFloat(value.toFixed(this.precision));
      this.$emit("update:modelValue", value);
      if (!this.dragging && value !== this.oldValue) {
        this.oldValue = value;
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener("mousemove", this.onDragging);
    document.removeEventListener("touchmove", this.onDragging);
    document.removeEventListener("mouseup", this.onDragEnd);
    document.removeEventListener("touchend", this.onDragEnd);
    document.removeEventListener("contextmenu", this.onDragEnd);
  }
});

const _hoisted_1$d = ["tabindex"];
const _hoisted_2$a = { key: 0 };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_tooltip = resolveComponent("b-tooltip");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["b-slider-thumb-wrapper", { "is-dragging": _ctx.dragging, "has-indicator": _ctx.indicator }],
      style: _ctx.wrapperStyle
    }, _ctx.rootAttrs),
    [
      createVNode(_component_b_tooltip, {
        label: _ctx.formattedValue,
        type: _ctx.type,
        always: _ctx.dragging || _ctx.isFocused || _ctx.tooltipAlways,
        active: !_ctx.disabled && _ctx.tooltip
      }, {
        default: withCtx(() => [
          createElementVNode("div", mergeProps({
            class: "b-slider-thumb",
            tabindex: _ctx.disabled ? void 0 : 0
          }, _ctx.fallthroughAttrs, {
            onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.onButtonDown && _ctx.onButtonDown(...args)),
            onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx.onButtonDown && _ctx.onButtonDown(...args)),
            onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
            onBlur: _cache[3] || (_cache[3] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
            onKeydown: [
              _cache[4] || (_cache[4] = withKeys(withModifiers((...args) => _ctx.onLeftKeyDown && _ctx.onLeftKeyDown(...args), ["prevent"]), ["left"])),
              _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => _ctx.onRightKeyDown && _ctx.onRightKeyDown(...args), ["prevent"]), ["right"])),
              _cache[6] || (_cache[6] = withKeys(withModifiers((...args) => _ctx.onLeftKeyDown && _ctx.onLeftKeyDown(...args), ["prevent"]), ["down"])),
              _cache[7] || (_cache[7] = withKeys(withModifiers((...args) => _ctx.onRightKeyDown && _ctx.onRightKeyDown(...args), ["prevent"]), ["up"])),
              _cache[8] || (_cache[8] = withKeys(withModifiers((...args) => _ctx.onHomeKeyDown && _ctx.onHomeKeyDown(...args), ["prevent"]), ["home"])),
              _cache[9] || (_cache[9] = withKeys(withModifiers((...args) => _ctx.onEndKeyDown && _ctx.onEndKeyDown(...args), ["prevent"]), ["end"]))
            ]
          }), [
            _ctx.indicator ? (openBlock(), createElementBlock(
              "span",
              _hoisted_2$a,
              toDisplayString(_ctx.formattedValue),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true)
          ], 16, _hoisted_1$d)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["label", "type", "always", "active"])
    ],
    16
    /* FULL_PROPS */
  );
}
var BSliderThumb = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$e]]);

var _sfc_main$c = defineComponent({
  name: "BSliderTick",
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    parent() {
      return this.$parent;
    },
    position() {
      const pos = (this.value - this.parent.min) / (this.parent.max - this.parent.min) * 100;
      return pos >= 0 && pos <= 100 ? pos : 0;
    },
    hidden() {
      return this.value === this.parent.min || this.value === this.parent.max;
    }
  },
  methods: {
    getTickStyle(position) {
      return { left: position + "%" };
    }
  },
  created() {
    if (!this.parent.$data._isSlider) {
      throw new Error("You should wrap bSliderTick on a bSlider");
    }
  }
});

const _hoisted_1$c = {
  key: 0,
  class: "b-slider-tick-label"
};
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["b-slider-tick", { "is-tick-hidden": _ctx.hidden }]),
      style: normalizeStyle(_ctx.getTickStyle(_ctx.position))
    },
    [
      _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_1$c, [
        renderSlot(_ctx.$slots, "default")
      ])) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
var SliderTick = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$d]]);

var _sfc_main$b = defineComponent({
  name: "BSlider",
  components: {
    BSliderThumb,
    BSliderTick: SliderTick
  },
  props: {
    modelValue: {
      type: [Number, Array],
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: "is-primary"
    },
    size: String,
    ticks: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    tooltipType: String,
    rounded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    customFormatter: Function,
    ariaLabel: [String, Array],
    biggerSliderFocus: {
      type: Boolean,
      default: false
    },
    indicator: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: "raw",
      validator: (value) => {
        return DISPLAY_FORMATS.indexOf(value) >= 0;
      }
    },
    locale: {
      type: [String, Array],
      default: () => {
        return config.defaultLocale;
      }
    },
    tooltipAlways: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    change: (_value) => true,
    dragend: () => true,
    dragging: (_value) => true,
    dragstart: () => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      value1: void 0,
      value2: void 0,
      // internal is used to update value1 and value2 with a single shot.
      // internal is also used to stop unnecessary propagation of update.
      internal: {
        value1: void 0,
        value2: void 0
      },
      dragging: false,
      isRange: false,
      isThumbReversed: false,
      isTrackClickDisabled: false,
      _isSlider: true,
      // Used by Thumb and Tick
      timeOutID: void 0
    };
  },
  computed: {
    newTooltipType() {
      return this.tooltipType ? this.tooltipType : this.type;
    },
    tickValues() {
      if (!this.ticks || this.min > this.max || this.step === 0) return [];
      const result = [];
      for (let i = this.min + this.step; i < this.max; i = i + this.step) {
        result.push(i);
      }
      return result;
    },
    minValue() {
      return Math.min(this.value1, this.value2);
    },
    maxValue() {
      return Math.max(this.value1, this.value2);
    },
    barSize() {
      return this.isRange ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%` : `${100 * (this.value1 - this.min) / (this.max - this.min)}%`;
    },
    barStart() {
      return this.isRange ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%` : "0%";
    },
    precision() {
      const precisions = [this.min, this.max, this.step].map((item) => {
        const decimal = ("" + item).split(".")[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max(...precisions);
    },
    barStyle() {
      return {
        width: this.barSize,
        left: this.barStart
      };
    },
    rootClasses() {
      return {
        "is-rounded": this.rounded,
        "is-dragging": this.dragging,
        "is-disabled": this.disabled,
        "slider-focus": this.biggerSliderFocus
      };
    }
  },
  watch: {
    /*
    * When v-model is changed set the new active step.
    */
    modelValue(value) {
      this.setValues(value);
    },
    internal({ value1, value2 }) {
      this.value1 = value1;
      this.value2 = value2;
    },
    value1(newValue) {
      if (this.internal.value1 !== newValue) {
        this.onInternalValueUpdate();
      }
    },
    value2(newValue) {
      if (this.internal.value2 !== newValue) {
        this.onInternalValueUpdate();
      }
    },
    min() {
      this.setValues(this.modelValue);
    },
    max() {
      this.setValues(this.modelValue);
    }
  },
  methods: {
    setValues(newValue) {
      if (this.min > this.max) {
        return;
      }
      if (Array.isArray(newValue)) {
        this.isRange = true;
        const smallValue = typeof newValue[0] !== "number" || isNaN(newValue[0]) ? this.min : bound(newValue[0], this.min, this.max);
        const largeValue = typeof newValue[1] !== "number" || isNaN(newValue[1]) ? this.max : bound(newValue[1], this.min, this.max);
        this.internal = {
          value1: this.isThumbReversed ? largeValue : smallValue,
          value2: this.isThumbReversed ? smallValue : largeValue
        };
      } else {
        this.isRange = false;
        this.internal = {
          value1: isNaN(newValue) ? this.min : bound(newValue, this.min, this.max),
          value2: void 0
        };
      }
    },
    onInternalValueUpdate() {
      if (this.isRange) {
        this.isThumbReversed = this.value1 > this.value2;
      }
      if (!this.lazy || !this.dragging) {
        this.emitValue("update:modelValue");
      }
      if (this.dragging) {
        this.emitValue("dragging");
      }
    },
    sliderSize() {
      return this.$refs.slider.getBoundingClientRect().width;
    },
    onSliderClick(event) {
      if (this.disabled || this.isTrackClickDisabled) return;
      const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
      const percent = (event.clientX - sliderOffsetLeft) / this.sliderSize() * 100;
      const targetValue = this.min + percent * (this.max - this.min) / 100;
      const diffFirst = Math.abs(targetValue - this.value1);
      if (!this.isRange) {
        if (diffFirst < this.step / 2) return;
        this.$refs.button1.setPosition(percent);
      } else {
        const diffSecond = Math.abs(targetValue - this.value2);
        if (diffFirst <= diffSecond) {
          if (diffFirst < this.step / 2) return;
          this.$refs.button1.setPosition(percent);
        } else {
          if (diffSecond < this.step / 2) return;
          this.$refs.button2.setPosition(percent);
        }
      }
      this.emitValue("change");
    },
    onDragStart() {
      this.dragging = true;
      this.$emit("dragstart");
    },
    onDragEnd() {
      this.isTrackClickDisabled = true;
      this.timeOutID = setTimeout(() => {
        this.isTrackClickDisabled = false;
      }, 0);
      this.dragging = false;
      this.$emit("dragend");
      if (this.lazy) {
        this.emitValue("update:modelValue");
      }
    },
    emitValue(type) {
      const emittedValue = this.isRange ? [this.minValue, this.maxValue] : this.value1;
      switch (type) {
        case "change":
          this.$emit(type, emittedValue);
          break;
        case "dragging":
          this.$emit(type, emittedValue);
          break;
        case "update:modelValue":
          this.$emit(type, emittedValue);
          break;
      }
    }
  },
  created() {
    this.isThumbReversed = false;
    this.isTrackClickDisabled = false;
    this.setValues(this.modelValue);
  },
  beforeUnmount() {
    clearTimeout(this.timeOutID);
  }
});

const _hoisted_1$b = {
  class: "b-slider-track",
  ref: "slider"
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_slider_tick = resolveComponent("b-slider-tick");
  const _component_b_slider_thumb = resolveComponent("b-slider-thumb");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["b-slider", [_ctx.size, _ctx.type, _ctx.rootClasses]]),
      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onSliderClick && _ctx.onSliderClick(...args))
    },
    [
      createElementVNode(
        "div",
        _hoisted_1$b,
        [
          createElementVNode(
            "div",
            {
              class: "b-slider-fill",
              style: normalizeStyle(_ctx.barStyle)
            },
            null,
            4
            /* STYLE */
          ),
          _ctx.ticks ? (openBlock(true), createElementBlock(
            Fragment,
            { key: 0 },
            renderList(_ctx.tickValues, (val, key) => {
              return openBlock(), createBlock(_component_b_slider_tick, {
                key,
                value: val
              }, null, 8, ["value"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )) : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "default"),
          createVNode(_component_b_slider_thumb, {
            "tooltip-always": _ctx.tooltipAlways,
            modelValue: _ctx.value1,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.value1 = $event),
            type: _ctx.newTooltipType,
            tooltip: _ctx.tooltip,
            "custom-formatter": _ctx.customFormatter,
            indicator: _ctx.indicator,
            format: _ctx.format,
            locale: _ctx.locale,
            ref: "button1",
            role: "slider",
            "aria-valuenow": _ctx.value1,
            "aria-valuemin": _ctx.min,
            "aria-valuemax": _ctx.max,
            "aria-orientation": "horizontal",
            "aria-label": Array.isArray(_ctx.ariaLabel) ? _ctx.ariaLabel[0] : _ctx.ariaLabel,
            "aria-disabled": _ctx.disabled || void 0,
            onDragstart: _ctx.onDragStart,
            onDragend: _ctx.onDragEnd
          }, null, 8, ["tooltip-always", "modelValue", "type", "tooltip", "custom-formatter", "indicator", "format", "locale", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"]),
          _ctx.isRange ? (openBlock(), createBlock(_component_b_slider_thumb, {
            key: 1,
            "tooltip-always": _ctx.tooltipAlways,
            modelValue: _ctx.value2,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.value2 = $event),
            type: _ctx.newTooltipType,
            tooltip: _ctx.tooltip,
            "custom-formatter": _ctx.customFormatter,
            indicator: _ctx.indicator,
            format: _ctx.format,
            locale: _ctx.locale,
            ref: "button2",
            role: "slider",
            "aria-valuenow": _ctx.value2,
            "aria-valuemin": _ctx.min,
            "aria-valuemax": _ctx.max,
            "aria-orientation": "horizontal",
            "aria-label": Array.isArray(_ctx.ariaLabel) ? _ctx.ariaLabel[1] : "",
            "aria-disabled": _ctx.disabled || void 0,
            onDragstart: _ctx.onDragStart,
            onDragend: _ctx.onDragEnd
          }, null, 8, ["tooltip-always", "modelValue", "type", "tooltip", "custom-formatter", "indicator", "format", "locale", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-label", "aria-disabled", "onDragstart", "onDragend"])) : createCommentVNode("v-if", true)
        ],
        512
        /* NEED_PATCH */
      )
    ],
    2
    /* CLASS */
  );
}
var Slider = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$c]]);

const Plugin$b = {
  install(Vue) {
    registerComponent(Vue, Slider);
    registerComponent(Vue, SliderTick);
  }
};

const Snackbar$1 = defineComponent({
  name: "BSnackbar",
  mixins: [NoticeMixin],
  props: {
    actionText: {
      type: String,
      default: "OK"
    },
    onAction: {
      type: Function,
      default: () => {
      }
    },
    cancelText: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      newDuration: this.duration || config.defaultSnackbarDuration
    };
  },
  methods: {
    /*
    * Click listener.
    * Call action prop before closing (from Mixin).
    */
    action() {
      this.onAction();
      this.close();
    }
  }
});

const _hoisted_1$a = ["role"];
const _hoisted_2$9 = ["innerHTML"];
const _hoisted_3$7 = { class: "button" };
const _hoisted_4$4 = { class: "button" };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    "enter-active-class": _ctx.transition.enter,
    "leave-active-class": _ctx.transition.leave,
    persisted: ""
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        class: normalizeClass(["snackbar", [_ctx.type, _ctx.position]]),
        onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.pause && _ctx.pause(...args)),
        onMouseleave: _cache[3] || (_cache[3] = (...args) => _ctx.removePause && _ctx.removePause(...args)),
        role: _ctx.actionText ? "alertdialog" : "alert"
      }, [
        _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(
          Fragment,
          { key: 1 },
          [
            createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
            createElementVNode("div", {
              class: "text",
              innerHTML: _ctx.message
            }, null, 8, _hoisted_2$9)
          ],
          64
          /* STABLE_FRAGMENT */
        )),
        _ctx.cancelText ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: "action is-light is-cancel",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args))
        }, [
          createElementVNode(
            "button",
            _hoisted_3$7,
            toDisplayString(_ctx.cancelText),
            1
            /* TEXT */
          )
        ])) : createCommentVNode("v-if", true),
        _ctx.actionText ? (openBlock(), createElementBlock(
          "div",
          {
            key: 3,
            class: normalizeClass(["action", _ctx.type]),
            onClick: _cache[1] || (_cache[1] = (...args) => _ctx.action && _ctx.action(...args))
          },
          [
            createElementVNode(
              "button",
              _hoisted_4$4,
              toDisplayString(_ctx.actionText),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true)
      ], 42, _hoisted_1$a), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["enter-active-class", "leave-active-class"]);
}
var Snackbar = /* @__PURE__ */ _export_sfc(Snackbar$1, [["render", _sfc_render$b]]);

var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField$1 = (obj, key, value) => __defNormalProp$2(obj, key + "" , value);
class SnackbarProgrammatic {
  // may be undefined in the testing environment
  constructor(app) {
    __publicField$1(this, "app");
    this.app = app;
  }
  open(params) {
    if (typeof params === "string") {
      params = {
        message: params
      };
    }
    let slot;
    let _a = params, { message } = _a, restParams = __objRest$1(_a, ["message"]);
    if (typeof message !== "string") {
      slot = message;
      message = void 0;
    }
    const propsData = __spreadValues$2({
      type: "is-success",
      position: config.defaultSnackbarPosition || "is-bottom-right",
      queue: true,
      message
    }, restParams);
    const container = document.createElement("div");
    const vueInstance = createApp({
      data() {
        return {
          snackbarVNode: null
        };
      },
      methods: {
        close() {
          const snackbar = getComponentFromVNode(this.snackbarVNode);
          if (snackbar) {
            snackbar.close();
          }
        }
      },
      render() {
        this.snackbarVNode = h(
          Snackbar,
          __spreadProps$2(__spreadValues$2({}, propsData), {
            onClose() {
              if (typeof propsData.onClose === "function") {
                propsData.onClose();
              }
              setTimeout(() => {
                vueInstance.unmount();
              }, 150);
            }
          }),
          slot != null ? { default: () => slot } : void 0
        );
        return this.snackbarVNode;
      }
    });
    if (this.app) {
      copyAppContext(this.app, vueInstance);
    } else {
      vueInstance.config.globalProperties.$buefy = {};
    }
    return vueInstance.mount(container);
  }
}
const Plugin$a = {
  install(Vue) {
    registerComponentProgrammatic(Vue, "snackbar", new SnackbarProgrammatic(Vue));
  }
};

var BSlotComponent = defineComponent({
  name: "BSlotComponent",
  props: {
    component: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      default: "default"
    },
    scoped: {
      type: Boolean
    },
    props: {
      type: Object
    },
    tag: {
      type: [String, Object],
      default: "div"
    }
  },
  methods: {
    refresh() {
      this.$forceUpdate();
    }
  },
  render() {
    return h(
      this.tag,
      {},
      this.component.$slots ? this.scoped ? this.component.$slots[this.name](this.props) : this.component.$slots[this.name]() : void 0
    );
  }
});

var TabbedMixin = (cmp) => defineComponent({
  components: {
    BIcon,
    BSlotComponent
  },
  mixins: [ProviderParentMixin(cmp, Sorted$1)],
  props: {
    modelValue: {
      type: [String, Number, null],
      default: void 0
    },
    size: String,
    animated: {
      type: Boolean,
      default: true
    },
    animation: String,
    animateInitially: Boolean,
    vertical: {
      type: Boolean,
      default: false
    },
    position: String,
    destroyOnHide: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (_value) => true
  },
  data() {
    return {
      activeId: this.modelValue,
      // Internal state
      defaultSlots: [],
      contentHeight: 0,
      isTransitioning: false
    };
  },
  computed: {
    activeItem() {
      const childItems = this.childItems;
      return this.activeId === void 0 ? this.items[0] : this.activeId === null ? null : childItems.find((i) => i.uniqueValue === this.activeId);
    },
    items() {
      return this.sortedItems;
    }
  },
  watch: {
    /*
     * When v-model is changed set the new active tab.
     */
    modelValue(value) {
      if (typeof value === "number") {
        value = bound(value, 0, this.items.length - 1);
        this.activeId = this.items[value].uniqueValue;
      } else {
        this.activeId = value;
      }
    },
    /*
     * Sync internal state with external state
     */
    activeId(val, oldValue) {
      const oldTab = oldValue !== void 0 && oldValue !== null ? this.childItems.find((i) => i.uniqueValue === oldValue) : null;
      if (oldTab && this.activeItem) {
        oldTab.deactivate(this.activeItem.index);
        this.activeItem.activate(oldTab.index);
      }
      val = this.activeItem ? typeof this.modelValue === "number" ? this.items.indexOf(this.activeItem) : this.activeItem.uniqueValue : void 0;
      if (val !== this.modelValue) {
        this.$emit("update:modelValue", val);
      }
    }
  },
  methods: {
    /*
    * Child click listener, emit input event and change active child.
    */
    childClick(child) {
      this.activeId = child.uniqueValue;
    },
    getNextItemIdx(fromIdx, skipDisabled = false) {
      let nextItemIdx = null;
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (fromIdx < item.index && (item.visible && (!skipDisabled || skipDisabled && !item.disabled))) {
          nextItemIdx = item.index;
          break;
        }
      }
      return nextItemIdx;
    },
    getPrevItemIdx(fromIdx, skipDisabled = false) {
      let prevItemIdx = null;
      for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i];
        if (item.index < fromIdx && (item.visible && (!skipDisabled || skipDisabled && !item.disabled))) {
          prevItemIdx = item.index;
          break;
        }
      }
      return prevItemIdx;
    }
  },
  mounted() {
    if (typeof this.modelValue === "number") {
      const value = bound(this.modelValue, 0, this.items.length - 1);
      this.activeId = this.items[value].uniqueValue;
    } else {
      this.activeId = this.modelValue;
    }
  }
});

const LABEL_POSITIONS = ["bottom", "right", "left"];
const MOBILE_MODES = ["minimalist", "compact"];
var _sfc_main$a = defineComponent({
  name: "BSteps",
  components: {
    BIcon
  },
  mixins: [TabbedMixin("step")],
  props: {
    type: [String, Object],
    iconPack: String,
    iconPrev: {
      type: String,
      default: () => {
        return config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: () => {
        return config.defaultIconNext;
      }
    },
    hasNavigation: {
      type: Boolean,
      default: true
    },
    labelPosition: {
      type: String,
      validator(value) {
        return LABEL_POSITIONS.indexOf(value) > -1;
      },
      default: "bottom"
    },
    rounded: {
      type: Boolean,
      default: true
    },
    mobileMode: {
      type: String,
      validator(value) {
        return MOBILE_MODES.indexOf(value) > -1;
      },
      default: "minimalist"
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String
  },
  computed: {
    // Override mixin implementation to always have a value
    activeItem() {
      return this.childItems.filter((i) => i.uniqueValue === this.activeId)[0] || this.items[0];
    },
    wrapperClasses() {
      return [
        this.size,
        {
          "is-vertical": this.vertical,
          [this.position]: this.position && this.vertical
        }
      ];
    },
    mainClasses() {
      return [
        this.type,
        {
          "has-label-right": this.labelPosition === "right",
          "has-label-left": this.labelPosition === "left",
          "is-animated": this.animated,
          "is-rounded": this.rounded,
          [`mobile-${this.mobileMode}`]: this.mobileMode !== null
        }
      ];
    },
    /*
     * Check if previous button is available.
     */
    hasPrev() {
      return this.prevItemIdx !== null;
    },
    /*
     * Retrieves the next visible item index
     */
    nextItemIdx() {
      const idx = this.activeItem ? this.activeItem.index : 0;
      return this.getNextItemIdx(idx);
    },
    /*
     * Retrieves the next visible item
     */
    nextItem() {
      let nextItem = null;
      if (this.nextItemIdx !== null) {
        nextItem = this.items.find((i) => i.index === this.nextItemIdx);
      }
      return nextItem;
    },
    /*
    * Retrieves the next visible item index
    */
    prevItemIdx() {
      if (!this.activeItem) {
        return null;
      }
      const idx = this.activeItem.index;
      return this.getPrevItemIdx(idx);
    },
    /*
     * Retrieves the previous visible item
     */
    prevItem() {
      if (!this.activeItem) {
        return null;
      }
      let prevItem = null;
      if (this.prevItemIdx !== null) {
        prevItem = this.items.find((i) => i.index === this.prevItemIdx);
      }
      return prevItem;
    },
    /*
     * Check if next button is available.
     */
    hasNext() {
      return this.nextItemIdx !== null;
    },
    navigationProps() {
      return {
        previous: {
          disabled: !this.hasPrev,
          action: this.prev
        },
        next: {
          disabled: !this.hasNext,
          action: this.next
        }
      };
    }
  },
  methods: {
    /*
     * Return if the step should be clickable or not.
     */
    isItemClickable(stepItem) {
      if (stepItem.clickable === void 0) {
        return stepItem.index < this.activeItem.index;
      }
      return stepItem.clickable;
    },
    /*
     * Previous button click listener.
     */
    prev() {
      if (this.hasPrev) {
        this.activeId = this.prevItem.uniqueValue;
      }
    },
    /*
     * Previous button click listener.
     */
    next() {
      if (this.hasNext) {
        this.activeId = this.nextItem.uniqueValue;
      }
    }
  }
});

const _hoisted_1$9 = { class: "step-items" };
const _hoisted_2$8 = ["onClick"];
const _hoisted_3$6 = { class: "step-marker" };
const _hoisted_4$3 = { key: 1 };
const _hoisted_5$2 = { class: "step-details" };
const _hoisted_6$1 = { class: "step-title" };
const _hoisted_7$1 = {
  key: 0,
  class: "step-navigation"
};
const _hoisted_8$1 = ["disabled", "aria-label"];
const _hoisted_9$1 = ["disabled", "aria-label"];
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["b-steps", _ctx.wrapperClasses])
    },
    [
      createElementVNode(
        "nav",
        {
          class: normalizeClass(["steps", _ctx.mainClasses])
        },
        [
          createElementVNode("ul", _hoisted_1$9, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(_ctx.items, (childItem) => {
                return withDirectives((openBlock(), createElementBlock(
                  "li",
                  {
                    key: childItem.uniqueValue,
                    class: normalizeClass(["step-item", [childItem.type || _ctx.type, childItem.headerClass, {
                      "is-active": childItem.isActive,
                      "is-previous": _ctx.activeItem.index > childItem.index
                    }]])
                  },
                  [
                    createElementVNode("a", {
                      class: normalizeClass(["step-link", { "is-clickable": _ctx.isItemClickable(childItem) }]),
                      onClick: ($event) => _ctx.isItemClickable(childItem) && _ctx.childClick(childItem)
                    }, [
                      createElementVNode("div", _hoisted_3$6, [
                        childItem.icon ? (openBlock(), createBlock(_component_b_icon, {
                          key: 0,
                          icon: childItem.icon,
                          pack: childItem.iconPack,
                          size: _ctx.size
                        }, null, 8, ["icon", "pack", "size"])) : childItem.step ? (openBlock(), createElementBlock(
                          "span",
                          _hoisted_4$3,
                          toDisplayString(childItem.step),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true)
                      ]),
                      createElementVNode("div", _hoisted_5$2, [
                        createElementVNode(
                          "span",
                          _hoisted_6$1,
                          toDisplayString(childItem.label),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 10, _hoisted_2$8)
                  ],
                  2
                  /* CLASS */
                )), [
                  [vShow, childItem.visible]
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ],
        2
        /* CLASS */
      ),
      createElementVNode(
        "section",
        {
          class: normalizeClass(["step-content", { "is-transitioning": _ctx.isTransitioning }])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      renderSlot(_ctx.$slots, "navigation", {
        previous: _ctx.navigationProps.previous,
        next: _ctx.navigationProps.next
      }, () => [
        _ctx.hasNavigation ? (openBlock(), createElementBlock("nav", _hoisted_7$1, [
          createElementVNode("a", {
            role: "button",
            class: "pagination-previous",
            disabled: _ctx.navigationProps.previous.disabled || void 0,
            onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.navigationProps.previous.action && _ctx.navigationProps.previous.action(...args), ["prevent"])),
            "aria-label": _ctx.ariaPreviousLabel
          }, [
            createVNode(_component_b_icon, {
              icon: _ctx.iconPrev,
              pack: _ctx.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8, ["icon", "pack"])
          ], 8, _hoisted_8$1),
          createElementVNode("a", {
            role: "button",
            class: "pagination-next",
            disabled: _ctx.navigationProps.next.disabled || void 0,
            onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.navigationProps.next.action && _ctx.navigationProps.next.action(...args), ["prevent"])),
            "aria-label": _ctx.ariaNextLabel
          }, [
            createVNode(_component_b_icon, {
              icon: _ctx.iconNext,
              pack: _ctx.iconPack,
              both: "",
              "aria-hidden": "true"
            }, null, 8, ["icon", "pack"])
          ], 8, _hoisted_9$1)
        ])) : createCommentVNode("v-if", true)
      ])
    ],
    2
    /* CLASS */
  );
}
var Steps = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);

var TabbedChildMixin = (parentCmp) => defineComponent({
  mixins: [InjectedChildMixin(parentCmp, Sorted)],
  props: {
    label: String,
    icon: String,
    iconPack: String,
    visible: {
      type: Boolean,
      default: true
    },
    headerClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  data() {
    return {
      transitionName: null,
      elementClass: "item",
      elementRole: null
    };
  },
  computed: {
    isActive() {
      return this.parent.activeItem === this;
    }
  },
  methods: {
    /*
     * Activate element, alter animation name based on the index.
     */
    activate(oldIndex) {
      this.transitionName = this.index < oldIndex ? this.parent.vertical ? "slide-down" : "slide-next" : this.parent.vertical ? "slide-up" : "slide-prev";
    },
    /*
     * Deactivate element, alter animation name based on the index.
     */
    deactivate(newIndex) {
      this.transitionName = newIndex < this.index ? this.parent.vertical ? "slide-down" : "slide-next" : this.parent.vertical ? "slide-up" : "slide-prev";
    }
  },
  render() {
    var _a;
    if (this.parent.destroyOnHide) {
      if (!this.isActive || !this.visible) {
        return;
      }
    }
    const vnode = withDirectives(
      h(
        "div",
        {
          // NOTE: possible regression of #3272
          // https://github.com/buefy/buefy/issues/3272
          class: this.elementClass,
          role: this.elementRole,
          id: `${this.uniqueValue}-content`,
          "aria-labelledby": this.elementRole ? `${this.uniqueValue}-label` : null,
          tabindex: this.isActive ? 0 : -1
        },
        this.$slots
      ),
      [[vShow, this.isActive && this.visible]]
    );
    if (this.parent.animated) {
      return h(
        Transition,
        {
          name: (_a = this.parent.animation || this.transitionName) != null ? _a : void 0,
          appear: this.parent.animateInitially === true || void 0,
          onBeforeEnter: () => {
            this.parent.isTransitioning = true;
          },
          onAfterEnter: () => {
            this.parent.isTransitioning = false;
          }
        },
        { default: () => vnode }
      );
    }
    return vnode;
  }
});

var _sfc_main$9 = defineComponent({
  name: "BStepItem",
  mixins: [TabbedChildMixin("step")],
  props: {
    step: [String, Number],
    type: [String, Object],
    clickable: {
      type: Boolean,
      default: void 0
    }
  },
  data() {
    return {
      elementClass: "step-item"
    };
  }
});

const Plugin$9 = {
  install(Vue) {
    registerComponent(Vue, Steps);
    registerComponent(Vue, _sfc_main$9);
  }
};

const Switch$1 = defineComponent({
  name: "BSwitch",
  props: {
    modelValue: [String, Number, Boolean, Function, Object, Array, Date],
    nativeValue: [String, Number, Boolean, Function, Object, Array, Date],
    disabled: Boolean,
    type: String,
    passiveType: String,
    name: String,
    required: Boolean,
    size: String,
    ariaLabelledby: String,
    trueValue: {
      type: [String, Number, Boolean, Function, Object, Array, Date],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean, Function, Object, Array, Date],
      default: false
    },
    rounded: {
      type: Boolean,
      default: () => {
        return config.defaultSwitchRounded;
      }
    },
    outlined: {
      type: Boolean,
      default: false
    },
    leftLabel: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      newValue: this.modelValue,
      isMouseDown: false
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(value) {
        this.newValue = value;
        this.$emit("update:modelValue", value);
      }
    },
    newClass() {
      return [
        this.size,
        {
          "is-disabled": this.disabled,
          "is-rounded": this.rounded,
          "is-outlined": this.outlined,
          "has-left-label": this.leftLabel
        }
      ];
    },
    checkClasses() {
      return [
        { "is-elastic": this.isMouseDown && !this.disabled },
        this.passiveType && `${this.passiveType}-passive`,
        this.type
      ];
    },
    showControlLabel() {
      return !!this.$slots.default;
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    /*
    * When v-model change, set internal value.
    */
    modelValue(value) {
      this.newValue = value;
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    }
  }
});

const _hoisted_1$8 = ["disabled"];
const _hoisted_2$7 = ["disabled", "name", "required", "value", "true-value", "false-value", "aria-labelledby"];
const _hoisted_3$5 = ["id"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["switch", _ctx.newClass]),
    ref: "label",
    disabled: _ctx.disabledOrUndefined,
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.focus && _ctx.focus(...args)),
    onKeydown: _cache[3] || (_cache[3] = withKeys(withModifiers(($event) => _ctx.$refs.label.click(), ["prevent"]), ["enter"])),
    onMousedown: _cache[4] || (_cache[4] = ($event) => _ctx.isMouseDown = true),
    onMouseup: _cache[5] || (_cache[5] = ($event) => _ctx.isMouseDown = false),
    onMouseout: _cache[6] || (_cache[6] = ($event) => _ctx.isMouseDown = false),
    onBlur: _cache[7] || (_cache[7] = ($event) => _ctx.isMouseDown = false)
  }, [
    withDirectives(createElementVNode("input", {
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
      type: "checkbox",
      ref: "input",
      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
      }, ["stop"])),
      disabled: _ctx.disabledOrUndefined,
      name: _ctx.name,
      required: _ctx.required,
      value: _ctx.nativeValue,
      "true-value": _ctx.trueValue,
      "false-value": _ctx.falseValue,
      "aria-labelledby": _ctx.ariaLabelledby
    }, null, 8, _hoisted_2$7), [
      [vModelCheckbox, _ctx.computedValue]
    ]),
    createElementVNode(
      "span",
      {
        class: normalizeClass(["check", _ctx.checkClasses])
      },
      null,
      2
      /* CLASS */
    ),
    _ctx.showControlLabel ? (openBlock(), createElementBlock("span", {
      key: 0,
      id: _ctx.ariaLabelledby,
      class: "control-label"
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 8, _hoisted_3$5)) : createCommentVNode("v-if", true)
  ], 42, _hoisted_1$8);
}
var Switch = /* @__PURE__ */ _export_sfc(Switch$1, [["render", _sfc_render$9]]);

const Plugin$8 = {
  install(Vue) {
    registerComponent(Vue, Switch);
  }
};

var _sfc_main$8 = defineComponent({
  name: "BTableMobileSort",
  components: {
    BSelect,
    BIcon
  },
  props: {
    currentSortColumn: Object,
    sortMultipleData: Array,
    isAsc: Boolean,
    columns: Array,
    placeholder: String,
    iconPack: String,
    sortIcon: {
      type: String,
      default: "arrow-up"
    },
    sortIconSize: {
      type: String,
      default: "is-small"
    },
    sortMultiple: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    removePriority: (_column) => true,
    sort: (_column, _event) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      sortMultipleSelect: null,
      sortMultipleSelectIndex: -1,
      mobileSort: this.currentSortColumn,
      mobileSortIndex: this.columns ? this.columns.indexOf(this.currentSortColumn) : -1,
      defaultEvent: {
        shiftKey: true,
        altKey: true,
        ctrlKey: true
      },
      ignoreSort: false
    };
  },
  computed: {
    showPlaceholder() {
      return !this.columns || !this.columns.some((column) => column === this.mobileSort);
    },
    sortableColumns() {
      return this.columns && this.columns.filter((column) => column.sortable);
    }
  },
  watch: {
    sortMultipleSelect(column) {
      if (this.ignoreSort) {
        this.ignoreSort = false;
      } else {
        this.$emit("sort", column, this.defaultEvent);
      }
    },
    sortMultipleSelectIndex(index) {
      if (index !== -1) {
        this.sortMultipleSelect = this.columns[index];
      } else {
        this.sortMultipleSelect = null;
      }
    },
    mobileSort(column) {
      if (this.currentSortColumn === column) return;
      this.$emit("sort", column, this.defaultEvent);
    },
    mobileSortIndex(index) {
      if (index !== -1) {
        this.mobileSort = this.columns[index];
      }
    },
    currentSortColumn(column) {
      this.mobileSort = column;
      this.mobileSortIndex = this.columns ? this.columns.indexOf(column) : -1;
    },
    columns(newColumns) {
      if (this.sortMultiple) {
        this.sortMultipleSelectIndex = newColumns.indexOf(
          this.sortMultipleSelect
        );
      } else {
        this.mobileSortIndex = newColumns.indexOf(this.mobileSort);
      }
    }
  },
  methods: {
    removePriority() {
      this.$emit("removePriority", this.sortMultipleSelect);
      this.ignoreSort = true;
      const remainingFields = this.sortMultipleData.filter((data) => data.field !== this.sortMultipleSelect.field).map((data) => data.field);
      this.sortMultipleSelectIndex = this.columns.findIndex((column) => remainingFields.includes(column.field));
    },
    getSortingObjectOfColumn(column) {
      return this.sortMultipleData.filter((i) => i.field === column.field)[0];
    },
    columnIsDesc(column) {
      const sortingObject = column && this.getSortingObjectOfColumn(column);
      if (sortingObject) {
        return !!(sortingObject.order && sortingObject.order === "desc");
      }
      return true;
    },
    getLabel(column) {
      const sortingObject = this.getSortingObjectOfColumn(column);
      if (sortingObject) {
        return column.label + "(" + (this.sortMultipleData.indexOf(sortingObject) + 1) + ")";
      }
      return column.label;
    },
    sort() {
      this.$emit("sort", this.sortMultiple ? this.sortMultipleSelect : this.mobileSort, this.defaultEvent);
    }
  }
});

const _hoisted_1$7 = { class: "field table-mobile-sort" };
const _hoisted_2$6 = { class: "field has-addons" };
const _hoisted_3$4 = ["value"];
const _hoisted_4$2 = ["value"];
const _hoisted_5$1 = { class: "control" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_select = resolveComponent("b-select");
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    createElementVNode("div", _hoisted_2$6, [
      _ctx.sortMultiple ? (openBlock(), createBlock(_component_b_select, {
        key: 0,
        modelValue: _ctx.sortMultipleSelectIndex,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.sortMultipleSelectIndex = $event),
        expanded: ""
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.sortableColumns, (column, index) => {
              return openBlock(), createElementBlock("option", {
                key: index,
                value: index
              }, [
                createTextVNode(
                  toDisplayString(_ctx.getLabel(column)) + " ",
                  1
                  /* TEXT */
                ),
                _ctx.getSortingObjectOfColumn(column) ? (openBlock(), createElementBlock(
                  Fragment,
                  { key: 0 },
                  [
                    _ctx.columnIsDesc(column) ? (openBlock(), createElementBlock(
                      Fragment,
                      { key: 0 },
                      [
                        createTextVNode(" ↓ ")
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : (openBlock(), createElementBlock(
                      Fragment,
                      { key: 1 },
                      [
                        createTextVNode(" ↑ ")
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : createCommentVNode("v-if", true)
              ], 8, _hoisted_3$4);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])) : (openBlock(), createBlock(_component_b_select, {
        key: 1,
        modelValue: _ctx.mobileSortIndex,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.mobileSortIndex = $event),
        expanded: ""
      }, {
        default: withCtx(() => [
          _ctx.placeholder ? withDirectives((openBlock(), createElementBlock(
            "option",
            {
              key: 0,
              value: {},
              selected: "",
              disabled: "",
              hidden: ""
            },
            toDisplayString(_ctx.placeholder),
            513
            /* TEXT, NEED_PATCH */
          )), [
            [vShow, _ctx.showPlaceholder]
          ]) : createCommentVNode("v-if", true),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.sortableColumns, (column, index) => {
              return openBlock(), createElementBlock("option", {
                key: index,
                value: index
              }, toDisplayString(column.label), 9, _hoisted_4$2);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue"])),
      createElementVNode("div", _hoisted_5$1, [
        _ctx.sortMultiple && _ctx.sortMultipleData.length > 0 ? (openBlock(), createElementBlock(
          Fragment,
          { key: 0 },
          [
            createElementVNode("button", {
              class: "button is-primary",
              onClick: _cache[2] || (_cache[2] = (...args) => _ctx.sort && _ctx.sort(...args))
            }, [
              createVNode(_component_b_icon, {
                class: normalizeClass({ "is-desc": _ctx.columnIsDesc(_ctx.sortMultipleSelect) }),
                icon: _ctx.sortIcon,
                pack: _ctx.iconPack,
                size: _ctx.sortIconSize,
                both: ""
              }, null, 8, ["class", "icon", "pack", "size"])
            ]),
            createElementVNode("button", {
              class: "button is-primary",
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.removePriority && _ctx.removePriority(...args))
            }, [
              createVNode(_component_b_icon, {
                icon: "delete",
                size: _ctx.sortIconSize,
                both: ""
              }, null, 8, ["size"])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        )) : !_ctx.sortMultiple ? (openBlock(), createElementBlock("button", {
          key: 1,
          class: "button is-primary",
          onClick: _cache[4] || (_cache[4] = (...args) => _ctx.sort && _ctx.sort(...args))
        }, [
          withDirectives(createVNode(_component_b_icon, {
            class: normalizeClass({ "is-desc": !_ctx.isAsc }),
            icon: _ctx.sortIcon,
            pack: _ctx.iconPack,
            size: _ctx.sortIconSize,
            both: ""
          }, null, 8, ["class", "icon", "pack", "size"]), [
            [vShow, _ctx.currentSortColumn === _ctx.mobileSort]
          ])
        ])) : createCommentVNode("v-if", true)
      ])
    ])
  ]);
}
var BTableMobileSort = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);

var _sfc_main$7 = defineComponent({
  name: "BTablePagination",
  components: {
    BPagination
  },
  props: {
    paginated: Boolean,
    total: [Number, String],
    perPage: [Number, String],
    currentPage: [Number, String],
    paginationSimple: Boolean,
    paginationSize: String,
    rounded: Boolean,
    iconPack: String,
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    pageInput: Boolean,
    paginationOrder: String,
    pageInputPosition: String,
    debouncePageInput: [Number, String]
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "page-change": (_page) => true,
    "update:currentPage": (_page) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newCurrentPage: this.currentPage
    };
  },
  watch: {
    currentPage(newVal) {
      this.newCurrentPage = newVal;
    }
  },
  methods: {
    /*
    * Paginator change listener.
    */
    pageChanged(page) {
      this.newCurrentPage = page > 0 ? page : 1;
      this.$emit("update:currentPage", this.newCurrentPage);
      this.$emit("page-change", this.newCurrentPage);
    }
  }
});

const _hoisted_1$6 = { class: "top level" };
const _hoisted_2$5 = { class: "level-left" };
const _hoisted_3$3 = { class: "level-right" };
const _hoisted_4$1 = {
  key: 0,
  class: "level-item"
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_pagination = resolveComponent("b-pagination");
  return openBlock(), createElementBlock("div", _hoisted_1$6, [
    createElementVNode("div", _hoisted_2$5, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createElementVNode("div", _hoisted_3$3, [
      _ctx.paginated ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
        createVNode(_component_b_pagination, {
          "icon-pack": _ctx.iconPack,
          total: _ctx.total,
          "per-page": _ctx.perPage,
          simple: _ctx.paginationSimple,
          size: _ctx.paginationSize,
          "model-value": _ctx.newCurrentPage,
          rounded: _ctx.rounded,
          onChange: _ctx.pageChanged,
          "aria-next-label": _ctx.ariaNextLabel,
          "aria-previous-label": _ctx.ariaPreviousLabel,
          "aria-page-label": _ctx.ariaPageLabel,
          "aria-current-label": _ctx.ariaCurrentLabel,
          "page-input": _ctx.pageInput,
          order: _ctx.paginationOrder,
          "page-input-position": _ctx.pageInputPosition,
          "debounce-page-input": _ctx.debouncePageInput
        }, null, 8, ["icon-pack", "total", "per-page", "simple", "size", "model-value", "rounded", "onChange", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label", "page-input", "order", "page-input-position", "debounce-page-input"])
      ])) : createCommentVNode("v-if", true)
    ])
  ]);
}
var BTablePagination = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);

var __defProp$1 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
function mockTableColumn(table, column) {
  const defaultProps = {
    label: void 0,
    customKey: void 0,
    field: void 0,
    meta: void 0,
    width: void 0,
    numeric: void 0,
    centered: void 0,
    searchable: void 0,
    sortable: void 0,
    visible: true,
    subheading: void 0,
    customSort: void 0,
    customSearch: void 0,
    sticky: void 0,
    headerSelectable: void 0,
    headerClass: void 0,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    thAttrs: () => ({}),
    tdAttrs: () => ({})
    /* eslint-enable @typescript-eslint/no-explicit-any */
  };
  return __spreadProps$1(__spreadValues$1(__spreadValues$1({}, defaultProps), column), {
    // data
    newKey: column.customKey || column.label,
    _isTableColumn: true,
    // public computed
    get thClasses() {
      const attrs = this.thAttrs(this);
      const classes = [this.headerClass, {
        "is-sortable": this.sortable,
        "is-sticky": this.sticky,
        "is-unselectable": this.isHeaderUnSelectable
      }];
      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }
      return classes;
    },
    get thStyle() {
      const attrs = this.thAttrs(this);
      const style = [this.style];
      if (attrs && attrs.style) {
        style.push(attrs.style);
      }
      return style;
    },
    get thWrapStyle() {
      return this.style;
    },
    get style() {
      var _a;
      return {
        width: (_a = toCssWidth(this.width)) != null ? _a : void 0
        // null → undefined to satisfy StyleValue
      };
    },
    getRootClasses(row) {
      const attrs = this.tdAttrs(row, this);
      const classes = [this.rootClasses];
      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }
      return classes;
    },
    getRootStyle(row) {
      const attrs = this.tdAttrs(row, this);
      const style = [];
      if (attrs && attrs.style) {
        style.push(attrs.style);
      }
      return style;
    },
    $slots: {
      default: (props) => {
        const vnode = h("span", {
          innerHTML: getValueByPath(props.row, column.field)
        });
        return [vnode];
      }
    },
    // private properties
    get rootClasses() {
      return [this.cellClass, {
        "has-text-right": this.numeric && !this.centered,
        "has-text-centered": this.centered,
        "is-sticky": this.sticky
      }];
    },
    get isHeaderUnSelectable() {
      return !this.headerSelectable && !!this.sortable;
    }
  });
}

const BLANK_COLUMN = {
  thAttrs: () => ({}),
  tdAttrs: () => ({}),
  getRootClasses: () => [],
  getRootStyle: () => void 0,
  $slots: {}
};
var _sfc_main$6 = defineComponent({
  name: "BTable",
  components: {
    BCheckbox,
    BIcon,
    BInput,
    BLoading,
    BSlotComponent,
    BTableMobileSort,
    BTablePagination
  },
  mixins: [CompatFallthroughMixin],
  provide() {
    return {
      $table: this
    };
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    bordered: Boolean,
    striped: Boolean,
    narrowed: Boolean,
    hoverable: Boolean,
    loading: Boolean,
    detailed: Boolean,
    checkable: Boolean,
    headerCheckable: {
      type: Boolean,
      default: true
    },
    checkboxType: {
      type: String,
      default: "is-primary"
    },
    checkboxPosition: {
      type: String,
      default: "left",
      validator: (value) => {
        return [
          "left",
          "right"
        ].indexOf(value) >= 0;
      }
    },
    stickyCheckbox: {
      type: Boolean,
      default: false
    },
    selected: Object,
    isRowSelectable: {
      type: Function,
      default: () => true
    },
    focusable: Boolean,
    customIsChecked: Function,
    isRowCheckable: {
      type: Function,
      default: () => true
    },
    checkedRows: {
      type: Array,
      default: () => []
    },
    mobileCards: {
      type: Boolean,
      default: true
    },
    defaultSort: [String, Array],
    defaultSortDirection: {
      type: String,
      default: "asc"
    },
    sortIcon: {
      type: String,
      default: "arrow-up"
    },
    sortIconSize: {
      type: String,
      default: "is-small"
    },
    sortMultiple: {
      type: Boolean,
      default: false
    },
    sortMultipleData: {
      type: Array,
      default: () => []
    },
    sortMultipleKey: {
      type: String,
      default: null
    },
    paginated: Boolean,
    currentPage: {
      type: Number,
      default: 1
    },
    perPage: {
      type: [Number, String],
      default: 20
    },
    showDetailIcon: {
      type: Boolean,
      default: true
    },
    detailIcon: {
      type: String,
      default: "chevron-right"
    },
    paginationPosition: {
      type: String,
      default: "bottom",
      validator: (value) => {
        return [
          "bottom",
          "top",
          "both"
        ].indexOf(value) >= 0;
      }
    },
    paginationRounded: Boolean,
    backendSorting: Boolean,
    backendFiltering: Boolean,
    rowClass: {
      type: Function,
      default: () => ""
    },
    openedDetailed: {
      type: Array,
      default: () => []
    },
    hasDetailedVisible: {
      type: Function,
      default: () => true
    },
    detailKey: {
      type: String,
      default: ""
    },
    detailTransition: {
      type: String,
      default: ""
    },
    customDetailRow: {
      type: Boolean,
      default: false
    },
    backendPagination: Boolean,
    total: {
      type: [Number, String],
      default: 0
    },
    iconPack: String,
    mobileSortPlaceholder: String,
    customRowKey: String,
    draggable: {
      type: Boolean,
      default: false
    },
    draggableColumn: {
      type: Boolean,
      default: false
    },
    scrollable: Boolean,
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    stickyHeader: Boolean,
    height: [Number, String],
    filtersEvent: {
      type: String,
      default: ""
    },
    cardLayout: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    },
    debounceSearch: Number,
    caption: String,
    showCaption: {
      type: Boolean,
      default: true
    },
    pageInput: {
      type: Boolean,
      default: false
    },
    paginationOrder: String,
    pageInputPosition: String,
    debouncePageInput: [Number, String]
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    cellclick: (_row, _column, _rowIndex, _colIndex) => true,
    check: (_checkedRows, _row) => true,
    "check-all": (_rows) => true,
    click: (_row) => true,
    columndragend: (_event) => true,
    columndragleave: (_event) => true,
    columndragover: (_event) => true,
    columndragstart: (_event) => true,
    columndrop: (_event) => true,
    contextmenu: (_row, _event) => true,
    dblclick: (_row) => true,
    "details-close": (_row) => true,
    "details-open": (_row) => true,
    dragend: (_event) => true,
    dragleave: (_event) => true,
    dragover: (_event) => true,
    dragstart: (_event) => true,
    drop: (_event) => true,
    "filters-change": (_value) => true,
    "page-change": (_page) => true,
    select: (_new, _old) => true,
    sort: (_field, _order, _event) => true,
    "sorting-priority-removed": (_field) => true,
    "update:checkedRows": (_rows) => true,
    "update:currentPage": (_page) => true,
    "update:openedDetailed": (_rows) => true,
    "update:selected": (_row) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      sortMultipleDataLocal: [],
      getValueByPath,
      visibleDetailRows: this.openedDetailed,
      newData: this.data,
      newDataTotal: this.backendPagination ? this.total : this.data.length,
      newCheckedRows: [...this.checkedRows],
      lastCheckedRowIndex: null,
      newCurrentPage: this.currentPage,
      currentSortColumn: {},
      isAsc: true,
      filters: {},
      defaultSlots: [],
      firstTimeSort: true,
      // Used by first time initSort
      isDraggingRow: false,
      isDraggingColumn: false,
      debouncedHandleFiltersChange: void 0,
      // for touch-enabled devices
      _selectedRow: null,
      mayBeTouchDragging: false,
      touchDragoverTarget: null,
      _draggedCellEl: void 0,
      draggedCellContent: ""
    };
  },
  computed: {
    sortMultipleDataComputed() {
      return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal;
    },
    tableClasses() {
      return {
        "is-bordered": this.bordered,
        "is-striped": this.striped,
        "is-narrow": this.narrowed,
        "is-hoverable": (this.hoverable || this.focusable) && this.visibleData.length
      };
    },
    tableWrapperClasses() {
      return {
        "has-mobile-cards": this.mobileCards,
        "has-sticky-header": this.stickyHeader,
        "is-card-list": this.cardLayout,
        "table-container": this.isScrollable
      };
    },
    tableStyle() {
      return {
        height: toCssWidth(this.height)
      };
    },
    touchDraggedCellClasses() {
      return {
        "has-mobile-cards": this.mobileCards
      };
    },
    /*
    * Splitted data based on the pagination.
    */
    visibleData() {
      if (!this.paginated) return this.newData;
      const currentPage = this.newCurrentPage;
      const perPage = +this.perPage;
      if (this.newData.length <= perPage) {
        return this.newData;
      } else {
        const start = (currentPage - 1) * perPage;
        const end = parseInt(start + "", 10) + parseInt(perPage + "", 10);
        return this.newData.slice(start, end);
      }
    },
    visibleColumns() {
      if (!this.newColumns) return this.newColumns;
      return this.newColumns.filter((column) => {
        return column.visible || column.visible === void 0;
      });
    },
    /*
    * Check if all rows in the page are checked.
    */
    isAllChecked() {
      const validVisibleData = this.visibleData.filter(
        (row) => this.isRowCheckable(row)
      );
      if (validVisibleData.length === 0) return false;
      const isAllChecked = validVisibleData.some((currentVisibleRow) => {
        return indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0;
      });
      return !isAllChecked;
    },
    /*
    * Check if all rows in the page are checkable.
    */
    isAllUncheckable() {
      const validVisibleData = this.visibleData.filter(
        (row) => this.isRowCheckable(row)
      );
      return validVisibleData.length === 0;
    },
    /*
    * Check if has any sortable column.
    */
    hasSortablenewColumns() {
      return this.newColumns.some((column) => {
        return column.sortable;
      });
    },
    /*
    * Check if has any searchable column.
    */
    hasSearchablenewColumns() {
      return this.newColumns.some((column) => {
        return column.searchable;
      });
    },
    /*
    * Check if has any column using subheading.
    */
    hasCustomSubheadings() {
      if (this.$slots && this.$slots.subheading) return true;
      return this.newColumns.some((column) => {
        return column.subheading || column.$slots.subheading;
      });
    },
    /*
    * Return total column count based if it's checkable or expanded
    */
    columnCount() {
      let count = this.visibleColumns.length;
      count += this.checkable ? 1 : 0;
      count += this.detailed && this.showDetailIcon ? 1 : 0;
      return count;
    },
    /*
    * return if detailed row tabled
    * will be with chevron column & icon or not
    */
    showDetailRowIcon() {
      return this.detailed && this.showDetailIcon;
    },
    /*
    * return if scrollable table
    */
    isScrollable() {
      if (this.scrollable) return true;
      if (!this.newColumns) return false;
      return this.newColumns.some((column) => {
        return column.sticky;
      });
    },
    newColumns() {
      if (this.columns && this.columns.length) {
        return this.columns.map((column) => {
          return mockTableColumn(this, column);
        });
      }
      return this.defaultSlots;
    },
    canDragRow() {
      return this.draggable && !this.isDraggingColumn;
    },
    canDragColumn() {
      return this.draggableColumn && !this.isDraggingRow;
    }
  },
  watch: {
    /*
    * When data prop change:
    *   1. Update internal value.
    *   2. Filter data if it's not backend-filtered.
    *   3. Sort again if it's not backend-sorted.
    *   4. Set new total if it's not backend-paginated.
    */
    data(value) {
      this.newData = value;
      if (!this.backendFiltering) {
        this.newData = value.filter(
          (row) => this.isRowFiltered(row)
        );
      }
      if (!this.backendSorting) {
        this.sort(this.currentSortColumn, true);
      }
      if (!this.backendPagination) {
        this.newDataTotal = this.newData.length;
      }
    },
    /*
    * When Pagination total change, update internal total
    * only if it's backend-paginated.
    */
    total(newTotal) {
      if (!this.backendPagination) return;
      this.newDataTotal = newTotal;
    },
    currentPage(newVal) {
      this.newCurrentPage = newVal;
    },
    newCurrentPage(newVal) {
      this.$emit("update:currentPage", newVal);
    },
    /*
    * When checkedRows prop change, update internal value without
    * mutating original data.
    */
    checkedRows(rows) {
      this.newCheckedRows = [...rows];
    },
    debounceSearch: {
      handler(value) {
        this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value);
      },
      immediate: true
    },
    filters: {
      handler(value) {
        if (this.debounceSearch) {
          this.debouncedHandleFiltersChange(value);
        } else {
          this.handleFiltersChange(value);
        }
      },
      deep: true
    },
    /*
    * When the user wants to control the detailed rows via props.
    * Or wants to open the details of certain row with the router for example.
    */
    openedDetailed(expandedRows) {
      this.visibleDetailRows = expandedRows;
    }
  },
  methods: {
    onFiltersEvent(event) {
      this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters });
    },
    handleFiltersChange(value) {
      if (this.backendFiltering) {
        this.$emit("filters-change", value);
      } else {
        this.newData = this.data.filter(
          (row) => this.isRowFiltered(row)
        );
        if (!this.backendPagination) {
          this.newDataTotal = this.newData.length;
        }
        if (!this.backendSorting) {
          if (this.sortMultiple && this.sortMultipleDataLocal && this.sortMultipleDataLocal.length > 0) {
            this.doSortMultiColumn();
          } else if (Object.keys(this.currentSortColumn).length > 0) {
            this.doSortSingleColumn(this.currentSortColumn);
          }
        }
      }
    },
    findIndexOfSortData(column) {
      const sortObj = this.sortMultipleDataComputed.filter((i) => i.field === column.field)[0];
      return this.sortMultipleDataComputed.indexOf(sortObj) + 1;
    },
    removeSortingPriority(column) {
      if (this.backendSorting) {
        this.$emit("sorting-priority-removed", column.field);
      } else {
        this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(
          (priority) => priority.field !== column.field
        );
        if (this.sortMultipleDataLocal.length === 0) {
          this.resetMultiSorting();
        } else {
          this.newData = multiColumnSort(this.newData, this.sortMultipleDataLocal);
        }
      }
    },
    resetMultiSorting() {
      this.sortMultipleDataLocal = [];
      this.currentSortColumn = BLANK_COLUMN;
      this.newData = this.data;
    },
    /*
    * Sort an array by key without mutating original data.
    * Call the user sort function if it was passed.
    */
    sortBy(array, key, fn, isAsc) {
      let sorted = [];
      if (fn && typeof fn === "function") {
        sorted = [...array].sort((a, b) => fn(a, b, isAsc));
      } else {
        sorted = [...array].sort((a, b) => {
          let newA = getValueByPath(a, key);
          let newB = getValueByPath(b, key);
          if (typeof newA === "boolean" && typeof newB === "boolean") {
            return isAsc ? +newA - +newB : +newB - +newA;
          }
          if (!isNil(newB) && isNil(newA)) return isAsc ? 1 : -1;
          if (!isNil(newA) && isNil(newB)) return isAsc ? -1 : 1;
          if (newA === newB) return 0;
          newA = typeof newA === "string" ? newA.toUpperCase() : newA;
          newB = typeof newB === "string" ? newB.toUpperCase() : newB;
          return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
        });
      }
      return sorted;
    },
    sortMultiColumn(column) {
      this.currentSortColumn = BLANK_COLUMN;
      if (!this.backendSorting) {
        const existingPriority = this.sortMultipleDataLocal.filter((i) => i.field === column.field)[0];
        if (existingPriority) {
          existingPriority.order = existingPriority.order === "desc" ? "asc" : "desc";
        } else {
          this.sortMultipleDataLocal.push({
            field: column.field,
            order: this.isAsc ? "asc" : "desc",
            customSort: column.customSort
          });
        }
        this.doSortMultiColumn();
      }
    },
    doSortMultiColumn() {
      this.newData = multiColumnSort(this.newData, this.sortMultipleDataLocal);
    },
    /*
    * Sort the column.
    * Toggle current direction on column if it's sortable
    * and not just updating the prop.
    */
    sort(column, updatingData = false, event = null) {
      if (!column || !column.sortable) return;
      if (
        // if backend sorting is enabled, just emit the sort press like usual
        // if the correct key combination isnt pressed, sort like usual
        !this.backendSorting && this.sortMultiple && (this.sortMultipleKey && event[this.sortMultipleKey] || !this.sortMultipleKey)
      ) {
        if (updatingData) {
          this.doSortMultiColumn();
        } else {
          this.sortMultiColumn(column);
        }
      } else {
        if (this.sortMultiple) {
          this.sortMultipleDataLocal = [];
        }
        if (!updatingData) {
          this.isAsc = toRaw(column) === toRaw(this.currentSortColumn) ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== "desc";
        }
        if (!this.firstTimeSort) {
          this.$emit("sort", column.field, this.isAsc ? "asc" : "desc", event);
        }
        if (!this.backendSorting) {
          this.doSortSingleColumn(column);
        }
        this.currentSortColumn = column;
      }
    },
    doSortSingleColumn(column) {
      this.newData = this.sortBy(
        this.newData,
        column.field,
        column.customSort,
        this.isAsc
      );
    },
    isRowSelected(row, selected) {
      if (!selected) {
        return false;
      }
      if (this.customRowKey) {
        return row[this.customRowKey] === selected[this.customRowKey];
      }
      return row === selected;
    },
    /*
    * Check if the row is checked (is added to the array).
    */
    isRowChecked(row) {
      return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0;
    },
    /*
    * Remove a checked row from the array.
    */
    removeCheckedRow(row) {
      const index = indexOf(this.newCheckedRows, row, this.customIsChecked);
      if (index >= 0) {
        this.newCheckedRows.splice(index, 1);
      }
    },
    /*
    * Header checkbox click listener.
    * Add or remove all rows in current page.
    */
    checkAll() {
      const isAllChecked = this.isAllChecked;
      this.visibleData.forEach((currentRow) => {
        if (this.isRowCheckable(currentRow)) {
          this.removeCheckedRow(currentRow);
        }
        if (!isAllChecked) {
          if (this.isRowCheckable(currentRow)) {
            this.newCheckedRows.push(currentRow);
          }
        }
      });
      this.$emit("check", this.newCheckedRows);
      this.$emit("check-all", this.newCheckedRows);
      this.$emit("update:checkedRows", this.newCheckedRows);
    },
    /*
    * Row checkbox click listener.
    */
    checkRow(row, index, event) {
      if (!this.isRowCheckable(row)) return;
      const lastIndex = this.lastCheckedRowIndex;
      this.lastCheckedRowIndex = index;
      if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
        this.shiftCheckRow(row, index, lastIndex);
      } else if (!this.isRowChecked(row)) {
        this.newCheckedRows.push(row);
      } else {
        this.removeCheckedRow(row);
      }
      this.$emit("check", this.newCheckedRows, row);
      this.$emit("update:checkedRows", this.newCheckedRows);
    },
    /*
     * Check row when shift is pressed.
     */
    shiftCheckRow(row, index, lastCheckedRowIndex) {
      const subset = this.visibleData.slice(
        Math.min(index, lastCheckedRowIndex),
        Math.max(index, lastCheckedRowIndex) + 1
      );
      const shouldCheck = !this.isRowChecked(row);
      subset.forEach((item) => {
        this.removeCheckedRow(item);
        if (shouldCheck && this.isRowCheckable(item)) {
          this.newCheckedRows.push(item);
        }
      });
    },
    /*
    * Row click listener.
    * Emit all necessary events.
    */
    selectRow(row) {
      this.$emit("click", row);
      this._selectedRow = row;
      if (this.selected === row) return;
      if (!this.isRowSelectable(row)) return;
      this.$emit("select", row, this.selected);
      this.$emit("update:selected", row);
    },
    /*
    * Toggle to show/hide details slot
    */
    toggleDetails(obj) {
      const found = this.isVisibleDetailRow(obj);
      if (found) {
        this.closeDetailRow(obj);
        this.$emit("details-close", obj);
      } else {
        this.openDetailRow(obj);
        this.$emit("details-open", obj);
      }
      this.$emit("update:openedDetailed", this.visibleDetailRows);
    },
    openDetailRow(obj) {
      const index = this.handleDetailKey(obj);
      this.visibleDetailRows.push(index);
    },
    closeDetailRow(obj) {
      const index = this.handleDetailKey(obj);
      const i = this.visibleDetailRows.indexOf(index);
      if (i >= 0) {
        this.visibleDetailRows.splice(i, 1);
      }
    },
    isVisibleDetailRow(obj) {
      const index = this.handleDetailKey(obj);
      return this.visibleDetailRows.indexOf(index) >= 0;
    },
    isActiveDetailRow(row) {
      return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row);
    },
    isActiveCustomDetailRow(row) {
      return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row);
    },
    isRowFiltered(row) {
      for (const key in this.filters) {
        if (!this.filters[key]) continue;
        const input = this.filters[key];
        const column = this.newColumns.filter((c) => c.field === key)[0];
        if (column && column.customSearch && typeof column.customSearch === "function") {
          if (!column.customSearch(row, input)) return false;
        } else {
          const value = this.getValueByPath(row, key);
          if (value == null) return false;
          if (Number.isInteger(value)) {
            if (value !== Number(input)) return false;
          } else {
            const re = new RegExp(escapeRegExpChars(input + ""), "i");
            if (Array.isArray(value)) {
              const valid = value.some(
                (val) => re.test(removeDiacriticsFromString(val)) || re.test(val)
              );
              if (!valid) return false;
            } else {
              if (!re.test(removeDiacriticsFromString(value)) && !re.test(value)) {
                return false;
              }
            }
          }
        }
      }
      return true;
    },
    /*
    * When the detailKey is defined we use the object[detailKey] as index.
    * If not, use the object reference by default.
    */
    handleDetailKey(index) {
      const key = this.detailKey;
      return !key.length || !index ? index : index[key];
    },
    checkPredefinedDetailedRows() {
      const defaultExpandedRowsDefined = this.openedDetailed.length > 0;
      if (defaultExpandedRowsDefined && !this.detailKey.length) {
        throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"');
      }
    },
    /*
    * Call initSort only first time (For example async data).
    */
    checkSort() {
      if (this.newColumns.length && this.firstTimeSort) {
        this.initSort();
        this.firstTimeSort = false;
      } else if (this.newColumns.length) {
        if (toRaw(this.currentSortColumn) !== BLANK_COLUMN) {
          for (let i = 0; i < this.newColumns.length; i++) {
            if (this.newColumns[i].field === this.currentSortColumn.field) {
              this.currentSortColumn = this.newColumns[i];
              break;
            }
          }
        }
      }
    },
    /*
    * Check if footer slot has custom content.
    *
    * Assumes that `$slots.footer` is specified.
    */
    hasCustomFooterSlot() {
      var _a;
      const footer = this.$slots.footer();
      if (footer.length > 1) return true;
      if (isFragment(footer[0])) return true;
      const tag = (_a = footer[0].el) == null ? void 0 : _a.tag;
      if (tag !== "th" && tag !== "td") return false;
      return true;
    },
    /*
    * Check if bottom-left slot exists.
    */
    hasBottomLeftSlot() {
      return typeof this.$slots["bottom-left"] !== "undefined";
    },
    /*
    * Table arrow keys listener, change selection.
    */
    pressedArrow(pos) {
      if (!this.visibleData.length) return;
      let index = this.visibleData.indexOf(this.selected) + pos;
      index = index < 0 ? 0 : index > this.visibleData.length - 1 ? this.visibleData.length - 1 : index;
      const row = this.visibleData[index];
      if (!this.isRowSelectable(row)) {
        let newIndex = null;
        if (pos > 0) {
          for (let i = index; i < this.visibleData.length && newIndex === null; i++) {
            if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
          }
        } else {
          for (let i = index; i >= 0 && newIndex === null; i--) {
            if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
          }
        }
        if (newIndex >= 0) {
          this.selectRow(this.visibleData[newIndex]);
        }
      } else {
        this.selectRow(row);
      }
    },
    /*
    * Focus table element if has selected prop.
    */
    focus() {
      if (!this.focusable) return;
      this.$el.querySelector("table").focus();
    },
    /*
    * Initial sorted column based on the default-sort prop.
    */
    initSort() {
      if (this.sortMultiple && this.sortMultipleData) {
        this.sortMultipleData.forEach((column) => {
          this.sortMultiColumn(column);
        });
      } else {
        if (!this.defaultSort) return;
        let sortField = "";
        let sortDirection = this.defaultSortDirection;
        if (Array.isArray(this.defaultSort)) {
          sortField = this.defaultSort[0];
          if (this.defaultSort[1]) {
            sortDirection = this.defaultSort[1];
          }
        } else {
          sortField = this.defaultSort;
        }
        const sortColumn = this.newColumns.filter(
          (column) => column.field === sortField
        )[0];
        if (sortColumn) {
          this.isAsc = sortDirection.toLowerCase() !== "desc";
          this.sort(sortColumn, true);
        }
      }
    },
    /*
    * Emits drag start event (row)
    */
    handleDragStart(event, row, index) {
      if (!this.canDragRow) return;
      this.isDraggingRow = true;
      this.$emit("dragstart", { event, row, index });
    },
    /*
    * Emits drag leave event (row)
    */
    handleDragEnd(event, row, index) {
      if (!this.canDragRow) return;
      this.isDraggingRow = false;
      this.$emit("dragend", { event, row, index });
    },
    /*
    * Emits drop event (row)
    */
    handleDrop(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit("drop", { event, row, index });
    },
    /*
    * Emits drag over event (row)
    */
    handleDragOver(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit("dragover", { event, row, index });
    },
    /*
    * Emits drag leave event (row)
    */
    handleDragLeave(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit("dragleave", { event, row, index });
    },
    // this method is for "mouseenter", and "mouseleave" events.
    // the original idea of this method was introduced by the PR
    // https://github.com/buefy/buefy/pull/2150
    // to address some performance issues related to these events.
    // I am not sure whether the justification made at the PR is still
    // relevant to Vue 3.
    // btw, this function was made by the PR https://github.com/buefy/buefy/pull/3236
    emitEventForRow(eventName, event, row) {
      const listener = this.$attrs[toHandlerKey(eventName)] || this.$attrs[toHandlerKey(camelize(eventName))];
      return listener != null ? this.$emit(eventName, row, event) : null;
    },
    /*
    * Emits drag start event (column)
    */
    handleColumnDragStart(event, column, index) {
      if (!this.canDragColumn) return;
      this.isDraggingColumn = true;
      this.$emit("columndragstart", { event, column, index });
    },
    /*
    * Emits drag leave event (column)
    */
    handleColumnDragEnd(event, column, index) {
      if (!this.canDragColumn) return;
      this.isDraggingColumn = false;
      this.$emit("columndragend", { event, column, index });
    },
    /*
    * Emits drop event (column)
    */
    handleColumnDrop(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit("columndrop", { event, column, index });
    },
    /*
    * Emits drag over event (column)
    */
    handleColumnDragOver(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit("columndragover", { event, column, index });
    },
    /*
    * Emits drag leave event (column)
    */
    handleColumnDragLeave(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit("columndragleave", { event, column, index });
    },
    /*
    * Starts monitoring drag-by-touch events (row on touch-enabled devices)
    */
    handleTouchStart(event, row) {
      if (!this.canDragRow) return;
      if (this.isDraggingColumn) return;
      if (this._selectedRow !== row) return;
      event.preventDefault();
      this.mayBeTouchDragging = true;
    },
    /*
    * Emits dragover and dragleave events (row on touch-enabled devices)
    *
    * Emits also dragstart if this is the first touchmove after touchstart.
    */
    handleTouchMove(event) {
      if (!this.canDragRow) return;
      if (!this.mayBeTouchDragging) return;
      if (!this.isDraggingRow) {
        const eventTarget = event.target;
        const tr = eventTarget.closest("tr");
        this.draggedCellContent = tr ? `<table class="table"><tr>${tr.innerHTML}</tr></table>` : eventTarget.innerHTML;
        this.$refs.draggedCell.style.width = tr ? `${tr.offsetWidth}px` : `${eventTarget.offsetWidth}px`;
        eventTarget.dispatchEvent(translateTouchAsDragEvent(event, {
          type: "dragstart"
        }));
      }
      const touch = event.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target != null) {
        if (target !== this.touchDragoverTarget) {
          if (this.touchDragoverTarget != null) {
            this.touchDragoverTarget.dispatchEvent(
              translateTouchAsDragEvent(event, {
                type: "dragleave",
                target: this.touchDragoverTarget
              })
            );
          }
          this.touchDragoverTarget = target;
          target.dispatchEvent(
            translateTouchAsDragEvent(event, {
              type: "dragover",
              target
            })
          );
        }
      } else if (this.touchDragoverTarget != null) {
        this.touchDragoverTarget.dispatchEvent(
          translateTouchAsDragEvent(event, {
            type: "dragleave",
            target: this.touchDragoverTarget
          })
        );
        this.touchDragoverTarget = null;
      }
      this.updateDraggedCell(touch);
    },
    /*
    * Emits drop and dragend events (row on touch-enabled devices)
    */
    handleTouchEnd(event) {
      if (!this.canDragRow) return;
      if (this.isDraggingRow) {
        const touch = event.changedTouches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target != null) {
          target.dispatchEvent(translateTouchAsDragEvent(event, {
            type: "drop",
            target
          }));
        }
        event.target.dispatchEvent(translateTouchAsDragEvent(event, {
          type: "dragend"
        }));
        this._selectedRow = null;
      }
      this.mayBeTouchDragging = false;
    },
    /*
    * Starts monitoring drag-by-touch events (column on touch-enabled devices)
    */
    handleColumnTouchStart(event) {
      if (!this.canDragColumn) return;
      if (this.isDraggingRow) return;
      event.preventDefault();
      this.mayBeTouchDragging = true;
    },
    /*
    * Emits dragover and dragleave events (column on touch-enabled devices)
    *
    * Also emits dragstart if this is the first touchmove after touchstart.
    */
    handleColumnTouchMove(event) {
      if (!this.canDragColumn) return;
      if (!this.mayBeTouchDragging) return;
      if (!this.isDraggingColumn) {
        const eventTarget = event.target;
        this.draggedCellContent = eventTarget.innerHTML;
        this.$refs.draggedCell.style.width = `${eventTarget.offsetWidth}px`;
        eventTarget.dispatchEvent(translateTouchAsDragEvent(event, {
          type: "dragstart"
        }));
      }
      const touch = event.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target != null) {
        if (target !== this.touchDragoverTarget) {
          if (this.touchDragoverTarget != null) {
            this.touchDragoverTarget.dispatchEvent(
              translateTouchAsDragEvent(event, {
                type: "dragleave",
                target: this.touchDragoverTarget
              })
            );
          }
          this.touchDragoverTarget = target;
          target.dispatchEvent(
            translateTouchAsDragEvent(event, {
              type: "dragover",
              target
            })
          );
        }
      } else if (this.touchDragoverTarget != null) {
        this.touchDragoverTarget.dispatchEvent(
          translateTouchAsDragEvent(event, {
            type: "dragleave",
            target: this.touchDragoverTarget
          })
        );
        this.touchDragoverTarget = null;
      }
      this.updateDraggedCell(touch);
    },
    /*
    * Emits drop and dragend events (column on touch-enabled devices)
    */
    handleColumnTouchEnd(event) {
      if (!this.canDragColumn) return;
      if (this.isDraggingColumn) {
        const touch = event.changedTouches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target != null) {
          target.dispatchEvent(translateTouchAsDragEvent(event, {
            type: "drop",
            target
          }));
        }
        event.target.dispatchEvent(translateTouchAsDragEvent(event, {
          type: "dragend"
        }));
      }
      this.mayBeTouchDragging = false;
    },
    updateDraggedCell({ clientX, clientY }) {
      const cellRect = this.$refs.draggedCell.getBoundingClientRect();
      const top = clientY + window.scrollY - cellRect.height / 2;
      const left = clientX + window.scrollX - cellRect.width / 2;
      this.$refs.draggedCell.style.top = `calc(${top}px)`;
      this.$refs.draggedCell.style.left = `calc(${left}px)`;
    },
    _registerTableColumn(column) {
      if (column._isTableColumn) {
        this.defaultSlots.push(column);
      }
    },
    _unregisterTableColumn(column) {
      const index = this.defaultSlots.indexOf(column);
      if (index !== -1) {
        this.defaultSlots.splice(index, 1);
      }
    }
  },
  mounted() {
    this.checkPredefinedDetailedRows();
    this.checkSort();
    const prepareDraggedCell = (isDraggable) => {
      if (isDraggable && this.$data._draggedCellEl == null) {
        this.$data._draggedCellEl = createAbsoluteElement(this.$refs.draggedCell);
      }
    };
    this.$watch("draggable", prepareDraggedCell, { immediate: true });
    this.$watch("draggableColumn", prepareDraggedCell, { immediate: true });
  },
  beforeUnmount() {
    if (this.$data._draggedCellEl) {
      removeElement(this.$data._draggedCellEl);
    }
  }
});

const _hoisted_1$5 = ["tabindex"];
const _hoisted_2$4 = { key: 1 };
const _hoisted_3$2 = {
  key: 0,
  width: "40px"
};
const _hoisted_4 = ["onClick", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave"];
const _hoisted_5 = {
  key: 0,
  class: "multi-sort-icons"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  key: 0,
  class: "is-subheading"
};
const _hoisted_8 = {
  key: 0,
  width: "40px"
};
const _hoisted_9 = { key: 1 };
const _hoisted_10 = { key: 2 };
const _hoisted_11 = { key: 1 };
const _hoisted_12 = {
  key: 0,
  width: "40px"
};
const _hoisted_13 = { key: 1 };
const _hoisted_14 = { key: 2 };
const _hoisted_15 = ["onClick", "onDblclick", "onMouseenter", "onMouseleave", "onContextmenu", "draggable", "onDragstart", "onDragend", "onDrop", "onDragover", "onDragleave", "onTouchstart"];
const _hoisted_16 = {
  key: 0,
  class: "chevron-cell"
};
const _hoisted_17 = ["onClick"];
const _hoisted_18 = {
  key: 0,
  class: "detail"
};
const _hoisted_19 = ["colspan"];
const _hoisted_20 = { class: "detail-container" };
const _hoisted_21 = {
  key: 0,
  class: "is-empty"
};
const _hoisted_22 = ["colspan"];
const _hoisted_23 = { key: 2 };
const _hoisted_24 = { class: "table-footer" };
const _hoisted_25 = ["colspan"];
const _hoisted_26 = ["innerHTML"];
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_table_mobile_sort = resolveComponent("b-table-mobile-sort");
  const _component_b_table_pagination = resolveComponent("b-table-pagination");
  const _component_b_checkbox = resolveComponent("b-checkbox");
  const _component_b_slot_component = resolveComponent("b-slot-component");
  const _component_b_icon = resolveComponent("b-icon");
  const _component_b_input = resolveComponent("b-input");
  const _component_b_loading = resolveComponent("b-loading");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({ class: "b-table" }, _ctx.rootAttrs),
    [
      renderSlot(_ctx.$slots, "default"),
      _ctx.mobileCards && _ctx.hasSortablenewColumns ? (openBlock(), createBlock(_component_b_table_mobile_sort, {
        key: 0,
        "current-sort-column": _ctx.currentSortColumn,
        "sort-multiple": _ctx.sortMultiple,
        "sort-multiple-data": _ctx.sortMultipleDataComputed,
        "is-asc": _ctx.isAsc,
        columns: _ctx.newColumns,
        placeholder: _ctx.mobileSortPlaceholder,
        "icon-pack": _ctx.iconPack,
        "sort-icon": _ctx.sortIcon,
        "sort-icon-size": _ctx.sortIconSize,
        onSort: _cache[0] || (_cache[0] = (column, event) => _ctx.sort(column, null, event)),
        onRemovePriority: _cache[1] || (_cache[1] = (column) => _ctx.removeSortingPriority(column))
      }, null, 8, ["current-sort-column", "sort-multiple", "sort-multiple-data", "is-asc", "columns", "placeholder", "icon-pack", "sort-icon", "sort-icon-size"])) : createCommentVNode("v-if", true),
      _ctx.paginated && (_ctx.paginationPosition === "top" || _ctx.paginationPosition === "both") ? renderSlot(_ctx.$slots, "pagination", { key: 1 }, () => [
        createVNode(_component_b_table_pagination, mergeProps(_ctx.fallthroughAttrs, {
          "per-page": _ctx.perPage,
          paginated: _ctx.paginated,
          rounded: _ctx.paginationRounded,
          "icon-pack": _ctx.iconPack,
          total: _ctx.newDataTotal,
          "current-page": _ctx.newCurrentPage,
          "onUpdate:currentPage": _cache[2] || (_cache[2] = ($event) => _ctx.newCurrentPage = $event),
          "aria-next-label": _ctx.ariaNextLabel,
          "aria-previous-label": _ctx.ariaPreviousLabel,
          "aria-page-label": _ctx.ariaPageLabel,
          "aria-current-label": _ctx.ariaCurrentLabel,
          onPageChange: _cache[3] || (_cache[3] = (event) => _ctx.$emit("page-change", event)),
          "page-input": _ctx.pageInput,
          "pagination-order": _ctx.paginationOrder,
          "page-input-position": _ctx.pageInputPosition,
          "debounce-page-input": _ctx.debouncePageInput
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "top-left")
          ]),
          _: 3
          /* FORWARDED */
        }, 16, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label", "page-input", "pagination-order", "page-input-position", "debounce-page-input"])
      ]) : createCommentVNode("v-if", true),
      createElementVNode(
        "div",
        {
          class: normalizeClass(["table-wrapper", _ctx.tableWrapperClasses]),
          style: normalizeStyle(_ctx.tableStyle)
        },
        [
          createElementVNode("table", {
            class: normalizeClass(["table", _ctx.tableClasses]),
            tabindex: !_ctx.focusable ? void 0 : 0,
            onKeydown: [
              _cache[9] || (_cache[9] = withKeys(withModifiers(($event) => _ctx.pressedArrow(-1), ["self", "prevent"]), ["up"])),
              _cache[10] || (_cache[10] = withKeys(withModifiers(($event) => _ctx.pressedArrow(1), ["self", "prevent"]), ["down"]))
            ]
          }, [
            _ctx.caption ? withDirectives((openBlock(), createElementBlock(
              "caption",
              { key: 0 },
              toDisplayString(_ctx.caption),
              513
              /* TEXT, NEED_PATCH */
            )), [
              [vShow, _ctx.showCaption]
            ]) : createCommentVNode("v-if", true),
            _ctx.newColumns.length && _ctx.showHeader ? (openBlock(), createElementBlock("thead", _hoisted_2$4, [
              createElementVNode("tr", null, [
                _ctx.showDetailRowIcon ? (openBlock(), createElementBlock("th", _hoisted_3$2)) : createCommentVNode("v-if", true),
                _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock(
                  "th",
                  {
                    key: 1,
                    class: normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                  },
                  [
                    _ctx.headerCheckable ? renderSlot(_ctx.$slots, "check-all", {
                      key: 0,
                      isAllChecked: _ctx.isAllChecked,
                      isAllUncheckable: _ctx.isAllUncheckable,
                      checkAll: _ctx.checkAll
                    }, () => [
                      createVNode(_component_b_checkbox, {
                        autocomplete: "off",
                        "model-value": _ctx.isAllChecked,
                        type: _ctx.checkboxType,
                        disabled: _ctx.isAllUncheckable,
                        onChange: _ctx.checkAll
                      }, null, 8, ["model-value", "type", "disabled", "onChange"])
                    ]) : createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )) : createCommentVNode("v-if", true),
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.visibleColumns, (column, index) => {
                    return openBlock(), createElementBlock("th", mergeProps({
                      key: column.newKey + ":" + index + "header"
                    }, column.thAttrs(column), {
                      class: [column.thClasses, {
                        "is-current-sort": !_ctx.sortMultiple && _ctx.currentSortColumn === column
                      }],
                      style: column.thStyle,
                      onClick: withModifiers(($event) => _ctx.sort(column, null, $event), ["stop"]),
                      draggable: _ctx.canDragColumn,
                      onDragstart: ($event) => _ctx.handleColumnDragStart($event, column, index),
                      onDragend: ($event) => _ctx.handleColumnDragEnd($event, column, index),
                      onDrop: ($event) => _ctx.handleColumnDrop($event, column, index),
                      onDragover: ($event) => _ctx.handleColumnDragOver($event, column, index),
                      onDragleave: ($event) => _ctx.handleColumnDragLeave($event, column, index),
                      onTouchstart: _cache[4] || (_cache[4] = ($event) => _ctx.handleColumnTouchStart($event)),
                      onTouchmove: _cache[5] || (_cache[5] = ($event) => _ctx.handleColumnTouchMove($event)),
                      onTouchend: _cache[6] || (_cache[6] = ($event) => _ctx.handleColumnTouchEnd($event))
                    }), [
                      createElementVNode(
                        "div",
                        {
                          class: normalizeClass(["th-wrap is-relative", {
                            "is-numeric": column.numeric,
                            "is-centered": column.centered
                          }]),
                          style: normalizeStyle(column.thWrapStyle)
                        },
                        [
                          column.$slots.header ? (openBlock(), createBlock(_component_b_slot_component, {
                            key: 0,
                            component: column,
                            scoped: "",
                            name: "header",
                            tag: "span",
                            props: { column, index }
                          }, null, 8, ["component", "props"])) : (openBlock(), createElementBlock(
                            Fragment,
                            { key: 1 },
                            [
                              createTextVNode(
                                toDisplayString(column.label) + " ",
                                1
                                /* TEXT */
                              ),
                              _ctx.sortMultiple && _ctx.sortMultipleDataComputed && _ctx.sortMultipleDataComputed.length > 0 && _ctx.sortMultipleDataComputed.filter((i) => i.field === column.field).length > 0 ? (openBlock(), createElementBlock("span", _hoisted_5, [
                                createVNode(_component_b_icon, {
                                  icon: _ctx.sortIcon,
                                  pack: _ctx.iconPack,
                                  both: "",
                                  size: _ctx.sortIconSize,
                                  class: normalizeClass({
                                    "is-desc": _ctx.sortMultipleDataComputed.filter((i) => i.field === column.field)[0].order === "desc"
                                  })
                                }, null, 8, ["icon", "pack", "size", "class"]),
                                createTextVNode(
                                  " " + toDisplayString(_ctx.findIndexOfSortData(column)) + " ",
                                  1
                                  /* TEXT */
                                ),
                                createElementVNode("button", {
                                  class: "delete is-small multi-sort-cancel-icon",
                                  type: "button",
                                  onClick: withModifiers(($event) => _ctx.removeSortingPriority(column), ["stop"])
                                }, null, 8, _hoisted_6)
                              ])) : (openBlock(), createBlock(_component_b_icon, {
                                key: 1,
                                icon: _ctx.sortIcon,
                                pack: _ctx.iconPack,
                                both: "",
                                size: _ctx.sortIconSize,
                                class: normalizeClass(["sort-icon", {
                                  "is-desc": !_ctx.isAsc,
                                  "is-invisible": _ctx.currentSortColumn !== column
                                }])
                              }, null, 8, ["icon", "pack", "size", "class"]))
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          ))
                        ],
                        6
                        /* CLASS, STYLE */
                      )
                    ], 16, _hoisted_4);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock(
                  "th",
                  {
                    key: 2,
                    class: normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                  },
                  [
                    _ctx.headerCheckable ? renderSlot(_ctx.$slots, "check-all", {
                      key: 0,
                      isAllChecked: _ctx.isAllChecked,
                      isAllUncheckable: _ctx.isAllUncheckable,
                      checkAll: _ctx.checkAll
                    }, () => [
                      createVNode(_component_b_checkbox, {
                        autocomplete: "off",
                        "model-value": _ctx.isAllChecked,
                        type: _ctx.checkboxType,
                        disabled: _ctx.isAllUncheckable,
                        onChange: _ctx.checkAll
                      }, null, 8, ["model-value", "type", "disabled", "onChange"])
                    ]) : createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )) : createCommentVNode("v-if", true)
              ]),
              _ctx.hasCustomSubheadings ? (openBlock(), createElementBlock("tr", _hoisted_7, [
                _ctx.showDetailRowIcon ? (openBlock(), createElementBlock("th", _hoisted_8)) : createCommentVNode("v-if", true),
                _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock("th", _hoisted_9)) : createCommentVNode("v-if", true),
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.visibleColumns, (column, index) => {
                    return openBlock(), createElementBlock(
                      "th",
                      {
                        key: column.newKey + ":" + index + "subheading",
                        style: normalizeStyle(column.style)
                      },
                      [
                        createElementVNode(
                          "div",
                          {
                            class: normalizeClass(["th-wrap", {
                              "is-numeric": column.numeric,
                              "is-centered": column.centered
                            }]),
                            style: normalizeStyle(column.thWrapStyle)
                          },
                          [
                            column.$slots.subheading ? (openBlock(), createBlock(_component_b_slot_component, {
                              key: 0,
                              component: column,
                              scoped: "",
                              name: "subheading",
                              tag: "span",
                              props: { column, index }
                            }, null, 8, ["component", "props"])) : (openBlock(), createElementBlock(
                              Fragment,
                              { key: 1 },
                              [
                                createTextVNode(
                                  toDisplayString(column.subheading),
                                  1
                                  /* TEXT */
                                )
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            ))
                          ],
                          6
                          /* CLASS, STYLE */
                        )
                      ],
                      4
                      /* STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock("th", _hoisted_10)) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true),
              _ctx.hasSearchablenewColumns ? (openBlock(), createElementBlock("tr", _hoisted_11, [
                _ctx.showDetailRowIcon ? (openBlock(), createElementBlock("th", _hoisted_12)) : createCommentVNode("v-if", true),
                _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock("th", _hoisted_13)) : createCommentVNode("v-if", true),
                (openBlock(true), createElementBlock(
                  Fragment,
                  null,
                  renderList(_ctx.visibleColumns, (column, index) => {
                    return openBlock(), createElementBlock(
                      "th",
                      mergeProps({
                        key: column.newKey + ":" + index + "searchable"
                      }, column.thAttrs(column), {
                        style: column.thStyle,
                        class: { "is-sticky": column.sticky }
                      }),
                      [
                        createElementVNode(
                          "div",
                          {
                            class: "th-wrap",
                            style: normalizeStyle(column.thWrapStyle)
                          },
                          [
                            column.searchable ? (openBlock(), createElementBlock(
                              Fragment,
                              { key: 0 },
                              [
                                column.$slots.searchable ? (openBlock(), createBlock(_component_b_slot_component, {
                                  key: 0,
                                  component: column,
                                  scoped: true,
                                  name: "searchable",
                                  tag: "span",
                                  props: { column, filters: _ctx.filters }
                                }, null, 8, ["component", "props"])) : (openBlock(), createBlock(_component_b_input, mergeProps({
                                  key: 1,
                                  [toHandlerKey(_ctx.filtersEvent)]: _ctx.onFiltersEvent
                                }, {
                                  modelValue: _ctx.filters[column.field],
                                  "onUpdate:modelValue": ($event) => _ctx.filters[column.field] = $event,
                                  type: column.numeric ? "number" : "text"
                                }), null, 16, ["modelValue", "onUpdate:modelValue", "type"]))
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            )) : createCommentVNode("v-if", true)
                          ],
                          4
                          /* STYLE */
                        )
                      ],
                      16
                      /* FULL_PROPS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock("th", _hoisted_14)) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true)
            ])) : createCommentVNode("v-if", true),
            createElementVNode("tbody", null, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(_ctx.visibleData, (row, index) => {
                  return openBlock(), createElementBlock(
                    Fragment,
                    {
                      key: _ctx.customRowKey ? row[_ctx.customRowKey] : index
                    },
                    [
                      createElementVNode("tr", {
                        class: normalizeClass([_ctx.rowClass(row, index), {
                          "is-selected": _ctx.isRowSelected(row, _ctx.selected),
                          "is-checked": _ctx.isRowChecked(row)
                        }]),
                        onClick: ($event) => _ctx.selectRow(row),
                        onDblclick: ($event) => _ctx.$emit("dblclick", row),
                        onMouseenter: ($event) => _ctx.emitEventForRow("mouseenter", $event, row),
                        onMouseleave: ($event) => _ctx.emitEventForRow("mouseleave", $event, row),
                        onContextmenu: ($event) => _ctx.$emit("contextmenu", row, $event),
                        draggable: _ctx.canDragRow,
                        onDragstart: ($event) => _ctx.handleDragStart($event, row, index),
                        onDragend: ($event) => _ctx.handleDragEnd($event, row, index),
                        onDrop: ($event) => _ctx.handleDrop($event, row, index),
                        onDragover: ($event) => _ctx.handleDragOver($event, row, index),
                        onDragleave: ($event) => _ctx.handleDragLeave($event, row, index),
                        onTouchstart: ($event) => _ctx.handleTouchStart($event, row),
                        onTouchmove: _cache[7] || (_cache[7] = ($event) => _ctx.handleTouchMove($event)),
                        onTouchend: _cache[8] || (_cache[8] = ($event) => _ctx.handleTouchEnd($event))
                      }, [
                        _ctx.showDetailRowIcon ? (openBlock(), createElementBlock("td", _hoisted_16, [
                          _ctx.hasDetailedVisible(row) ? (openBlock(), createElementBlock("a", {
                            key: 0,
                            role: "button",
                            onClick: withModifiers(($event) => _ctx.toggleDetails(row), ["stop"])
                          }, [
                            createVNode(_component_b_icon, {
                              icon: _ctx.detailIcon,
                              pack: _ctx.iconPack,
                              both: "",
                              class: normalizeClass({ "is-expanded": _ctx.isVisibleDetailRow(row) })
                            }, null, 8, ["icon", "pack", "class"])
                          ], 8, _hoisted_17)) : createCommentVNode("v-if", true)
                        ])) : createCommentVNode("v-if", true),
                        _ctx.checkable && _ctx.checkboxPosition === "left" ? (openBlock(), createElementBlock(
                          "td",
                          {
                            key: 1,
                            class: normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                          },
                          [
                            createVNode(_component_b_checkbox, {
                              autocomplete: "off",
                              "model-value": _ctx.isRowChecked(row),
                              type: _ctx.checkboxType,
                              disabled: !_ctx.isRowCheckable(row),
                              onClick: withModifiers(($event) => _ctx.checkRow(row, index, $event), ["prevent", "stop"])
                            }, null, 8, ["model-value", "type", "disabled", "onClick"])
                          ],
                          2
                          /* CLASS */
                        )) : createCommentVNode("v-if", true),
                        (openBlock(true), createElementBlock(
                          Fragment,
                          null,
                          renderList(_ctx.visibleColumns, (column, colindex) => {
                            return openBlock(), createElementBlock(
                              Fragment,
                              {
                                key: column.newKey + ":" + index + ":" + colindex
                              },
                              [
                                column.$slots.default ? (openBlock(), createBlock(_component_b_slot_component, mergeProps({
                                  key: 0,
                                  component: column
                                }, column.tdAttrs(row, column), {
                                  scoped: "",
                                  name: "default",
                                  tag: "td",
                                  class: column.getRootClasses(row),
                                  style: column.getRootStyle(row),
                                  "data-label": column.label,
                                  props: {
                                    row,
                                    column,
                                    index,
                                    colindex,
                                    toggleDetails: _ctx.toggleDetails,
                                    isActiveDetailRow: _ctx.isActiveDetailRow
                                  },
                                  onClick: ($event) => _ctx.$emit("cellclick", row, column, index, colindex)
                                }), null, 16, ["component", "class", "style", "data-label", "props", "onClick"])) : createCommentVNode("v-if", true)
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        )),
                        _ctx.checkable && _ctx.checkboxPosition === "right" ? (openBlock(), createElementBlock(
                          "td",
                          {
                            key: 2,
                            class: normalizeClass(["checkbox-cell", { "is-sticky": _ctx.stickyCheckbox }])
                          },
                          [
                            createVNode(_component_b_checkbox, {
                              autocomplete: "off",
                              "model-value": _ctx.isRowChecked(row),
                              type: _ctx.checkboxType,
                              disabled: !_ctx.isRowCheckable(row),
                              onClick: withModifiers(($event) => _ctx.checkRow(row, index, $event), ["prevent", "stop"])
                            }, null, 8, ["model-value", "type", "disabled", "onClick"])
                          ],
                          2
                          /* CLASS */
                        )) : createCommentVNode("v-if", true)
                      ], 42, _hoisted_15),
                      createVNode(Transition, { name: _ctx.detailTransition }, {
                        default: withCtx(() => [
                          _ctx.isActiveDetailRow(row) ? (openBlock(), createElementBlock("tr", _hoisted_18, [
                            createElementVNode("td", { colspan: _ctx.columnCount }, [
                              createElementVNode("div", _hoisted_20, [
                                renderSlot(_ctx.$slots, "detail", {
                                  row,
                                  index
                                })
                              ])
                            ], 8, _hoisted_19)
                          ])) : createCommentVNode("v-if", true)
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["name"]),
                      _ctx.isActiveCustomDetailRow(row) ? renderSlot(_ctx.$slots, "detail", {
                        key: 0,
                        row,
                        index
                      }) : createCommentVNode("v-if", true)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              !_ctx.visibleData.length ? (openBlock(), createElementBlock("tr", _hoisted_21, [
                createElementVNode("td", { colspan: _ctx.columnCount }, [
                  renderSlot(_ctx.$slots, "empty")
                ], 8, _hoisted_22)
              ])) : createCommentVNode("v-if", true)
            ]),
            _ctx.$slots.footer !== void 0 ? (openBlock(), createElementBlock("tfoot", _hoisted_23, [
              createElementVNode("tr", _hoisted_24, [
                _ctx.hasCustomFooterSlot() ? renderSlot(_ctx.$slots, "footer", { key: 0 }) : (openBlock(), createElementBlock("th", {
                  key: 1,
                  colspan: _ctx.columnCount
                }, [
                  renderSlot(_ctx.$slots, "footer")
                ], 8, _hoisted_25))
              ])
            ])) : createCommentVNode("v-if", true)
          ], 42, _hoisted_1$5),
          _ctx.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
            createVNode(_component_b_loading, {
              "is-full-page": false,
              "model-value": _ctx.loading
            }, null, 8, ["model-value"])
          ]) : createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      ),
      _ctx.checkable && _ctx.hasBottomLeftSlot() || _ctx.paginated && (_ctx.paginationPosition === "bottom" || _ctx.paginationPosition === "both") ? renderSlot(_ctx.$slots, "pagination", { key: 2 }, () => [
        createVNode(_component_b_table_pagination, mergeProps(_ctx.fallthroughAttrs, {
          "per-page": _ctx.perPage,
          paginated: _ctx.paginated,
          rounded: _ctx.paginationRounded,
          "icon-pack": _ctx.iconPack,
          total: _ctx.newDataTotal,
          "current-page": _ctx.newCurrentPage,
          "onUpdate:currentPage": _cache[11] || (_cache[11] = ($event) => _ctx.newCurrentPage = $event),
          "aria-next-label": _ctx.ariaNextLabel,
          "aria-previous-label": _ctx.ariaPreviousLabel,
          "aria-page-label": _ctx.ariaPageLabel,
          "aria-current-label": _ctx.ariaCurrentLabel,
          onPageChange: _cache[12] || (_cache[12] = (event) => _ctx.$emit("page-change", event)),
          "page-input": _ctx.pageInput,
          "pagination-order": _ctx.paginationOrder,
          "page-input-position": _ctx.pageInputPosition,
          "debounce-page-input": _ctx.debouncePageInput
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "bottom-left")
          ]),
          _: 3
          /* FORWARDED */
        }, 16, ["per-page", "paginated", "rounded", "icon-pack", "total", "current-page", "aria-next-label", "aria-previous-label", "aria-page-label", "aria-current-label", "page-input", "pagination-order", "page-input-position", "debounce-page-input"])
      ]) : createCommentVNode("v-if", true),
      createCommentVNode(" eslint-disable vue/no-v-html "),
      withDirectives(createElementVNode("div", {
        ref: "draggedCell",
        class: normalizeClass(["touch-dragged-cell", _ctx.touchDraggedCellClasses]),
        innerHTML: _ctx.draggedCellContent
      }, null, 10, _hoisted_26), [
        [vShow, _ctx.mayBeTouchDragging && (_ctx.isDraggingRow || _ctx.isDraggingColumn)]
      ]),
      createCommentVNode(" eslint-enable vue/no-v-html ")
    ],
    16
    /* FULL_PROPS */
  );
}
var Table = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);

var _sfc_main$5 = defineComponent({
  name: "BTableColumn",
  inject: {
    $table: { name: "$table", default: false }
  },
  props: {
    label: String,
    customKey: [String, Number],
    field: String,
    meta: [String, Number, Boolean, Function, Object, Array],
    width: [Number, String],
    numeric: Boolean,
    centered: Boolean,
    searchable: Boolean,
    sortable: Boolean,
    visible: {
      type: Boolean,
      default: true
    },
    subheading: [String, Number],
    customSort: Function,
    customSearch: Function,
    sticky: Boolean,
    headerSelectable: Boolean,
    headerClass: String,
    cellClass: String,
    thAttrs: {
      type: Function,
      default: () => ({})
    },
    tdAttrs: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      newKey: this.customKey || this.label,
      _isTableColumn: true
    };
  },
  computed: {
    thClasses() {
      const attrs = this.thAttrs(this);
      const classes = [this.headerClass, {
        "is-sortable": this.sortable,
        "is-sticky": this.sticky,
        "is-unselectable": this.isHeaderUnSelectable
      }];
      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }
      return classes;
    },
    thStyle() {
      const attrs = this.thAttrs(this);
      const style = [this.style];
      if (attrs && attrs.style) {
        style.push(attrs.style);
      }
      return style;
    },
    thWrapStyle() {
      const width = toCssWidth(this.width);
      if (width != null && !width.trim().endsWith("%")) {
        return { width };
      } else {
        return {};
      }
    },
    rootClasses() {
      return [this.cellClass, {
        "has-text-right": this.numeric && !this.centered,
        "has-text-centered": this.centered,
        "is-sticky": this.sticky
      }];
    },
    style() {
      var _a;
      return {
        width: (_a = toCssWidth(this.width)) != null ? _a : void 0
        // null → undefined to satisfy StyleValue
      };
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    /*
     * Return if column header is un-selectable
     */
    isHeaderUnSelectable() {
      return !this.headerSelectable && this.sortable;
    }
  },
  methods: {
    getRootClasses(row) {
      const attrs = this.tdAttrs(row, this);
      const classes = [this.rootClasses];
      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }
      return classes;
    },
    getRootStyle(row) {
      const attrs = this.tdAttrs(row, this);
      const style = [];
      if (attrs && attrs.style) {
        style.push(attrs.style);
      }
      return style;
    }
  },
  created() {
    if (!this.$table) {
      throw new Error("You should wrap bTableColumn on a bTable");
    }
    this.$table._registerTableColumn(this);
  },
  beforeUnmount() {
    this.$table._unregisterTableColumn(this);
  },
  render() {
    return null;
  }
});

const Plugin$7 = {
  install(Vue) {
    registerComponent(Vue, Table);
    registerComponent(Vue, _sfc_main$5);
  }
};

var _sfc_main$4 = defineComponent({
  name: "BTabs",
  components: {
    BIcon,
    BSlotComponent
  },
  mixins: [TabbedMixin("tab")],
  props: {
    expanded: {
      type: Boolean,
      default: () => {
        return config.defaultTabsExpanded;
      }
    },
    type: {
      type: [String, Object],
      default: () => {
        return config.defaultTabsType;
      }
    },
    animated: {
      type: Boolean,
      default: () => {
        return config.defaultTabsAnimated;
      }
    },
    multiline: Boolean
  },
  data() {
    return {
      currentFocus: null
    };
  },
  computed: {
    mainClasses() {
      return {
        "is-fullwidth": this.expanded,
        "is-vertical": this.vertical,
        "is-multiline": this.multiline,
        [this.position]: this.position && this.vertical
      };
    },
    navClasses() {
      return [
        this.type,
        this.size,
        {
          [this.position]: this.position && !this.vertical,
          "is-fullwidth": this.expanded,
          "is-toggle": this.type === "is-toggle-rounded"
        }
      ];
    }
  },
  methods: {
    giveFocusToTab(tab) {
      if (Array.isArray(tab)) {
        tab = tab[0];
        if (tab == null) {
          return;
        }
      }
      if (tab.$el && tab.$el.focus) {
        tab.$el.focus();
      } else if (tab.focus) {
        tab.focus();
      }
    },
    manageTablistKeydown(event) {
      const { key } = event;
      switch (key) {
        case (this.vertical ? "ArrowUp" : "ArrowLeft"):
        case (this.vertical ? "Up" : "Left"): {
          let prevIdx = this.getPrevItemIdx(this.currentFocus, true);
          if (prevIdx === null) {
            prevIdx = this.getPrevItemIdx(Infinity, true);
          }
          const prevItem = this.items.find((i) => i.index === prevIdx);
          if (prevItem && this.$refs[`tabLink${prevIdx}`] && !prevItem.disabled) {
            this.giveFocusToTab(this.$refs[`tabLink${prevIdx}`]);
          }
          event.preventDefault();
          break;
        }
        case (this.vertical ? "ArrowDown" : "ArrowRight"):
        case (this.vertical ? "Down" : "Right"): {
          let nextIdx = this.getNextItemIdx(this.currentFocus, true);
          if (nextIdx === null) {
            nextIdx = this.getNextItemIdx(-1, true);
          }
          const nextItem = this.items.find((i) => i.index === nextIdx);
          if (nextItem && this.$refs[`tabLink${nextIdx}`] && !nextItem.disabled) {
            this.giveFocusToTab(this.$refs[`tabLink${nextIdx}`]);
          }
          event.preventDefault();
          break;
        }
      }
    },
    manageTabKeydown(event, childItem) {
      const { key } = event;
      switch (key) {
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
          this.childClick(childItem);
          event.preventDefault();
          break;
        }
      }
    }
  }
});

const _hoisted_1$4 = ["aria-orientation"];
const _hoisted_2$3 = ["aria-controls", "aria-selected"];
const _hoisted_3$1 = ["id", "tabindex", "onFocus", "onClick", "onKeydown"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_slot_component = resolveComponent("b-slot-component");
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["b-tabs", _ctx.mainClasses])
    },
    [
      createElementVNode(
        "nav",
        {
          class: normalizeClass(["tabs", _ctx.navClasses]),
          onKeydown: _cache[0] || (_cache[0] = (...args) => _ctx.manageTablistKeydown && _ctx.manageTablistKeydown(...args))
        },
        [
          renderSlot(_ctx.$slots, "start"),
          createElementVNode("ul", {
            "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
            role: "tablist"
          }, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(_ctx.items, (childItem) => {
                return withDirectives((openBlock(), createElementBlock("li", {
                  key: childItem.uniqueValue,
                  class: normalizeClass([childItem.headerClass, {
                    "is-active": childItem.isActive,
                    "is-disabled": childItem.disabled
                  }]),
                  role: "tab",
                  "aria-controls": `${childItem.uniqueValue}-content`,
                  "aria-selected": `${childItem.isActive}`
                }, [
                  childItem.$slots.header ? (openBlock(), createBlock(_component_b_slot_component, {
                    key: 0,
                    ref_for: true,
                    ref: `tabLink${childItem.index}`,
                    component: childItem,
                    name: "header",
                    tag: "a",
                    id: `${childItem.uniqueValue}-label`,
                    tabindex: childItem.isActive ? 0 : -1,
                    onFocus: ($event) => _ctx.currentFocus = childItem.index,
                    onClick: ($event) => _ctx.childClick(childItem),
                    onKeydown: ($event) => _ctx.manageTabKeydown($event, childItem)
                  }, null, 8, ["component", "id", "tabindex", "onFocus", "onClick", "onKeydown"])) : (openBlock(), createElementBlock("a", {
                    key: 1,
                    ref_for: true,
                    ref: `tabLink${childItem.index}`,
                    id: `${childItem.uniqueValue}-label`,
                    tabindex: childItem.isActive ? 0 : -1,
                    onFocus: ($event) => _ctx.currentFocus = childItem.index,
                    onClick: ($event) => _ctx.childClick(childItem),
                    onKeydown: ($event) => _ctx.manageTabKeydown($event, childItem)
                  }, [
                    childItem.icon ? (openBlock(), createBlock(_component_b_icon, {
                      key: 0,
                      icon: childItem.icon,
                      pack: childItem.iconPack,
                      size: _ctx.size
                    }, null, 8, ["icon", "pack", "size"])) : createCommentVNode("v-if", true),
                    createElementVNode(
                      "span",
                      null,
                      toDisplayString(childItem.label),
                      1
                      /* TEXT */
                    )
                  ], 40, _hoisted_3$1))
                ], 10, _hoisted_2$3)), [
                  [vShow, childItem.visible]
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 8, _hoisted_1$4),
          renderSlot(_ctx.$slots, "end")
        ],
        34
        /* CLASS, NEED_HYDRATION */
      ),
      createElementVNode(
        "section",
        {
          class: normalizeClass(["tab-content", { "is-transitioning": _ctx.isTransitioning }])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )
    ],
    2
    /* CLASS */
  );
}
var Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$5]]);

var _sfc_main$3 = defineComponent({
  name: "BTabItem",
  mixins: [TabbedChildMixin("tab")],
  props: {
    disabled: Boolean
  },
  data() {
    return {
      elementClass: "tab-item",
      elementRole: "tabpanel"
    };
  }
});

const Plugin$6 = {
  install(Vue) {
    registerComponent(Vue, Tabs);
    registerComponent(Vue, _sfc_main$3);
  }
};

var _sfc_main$2 = defineComponent({
  name: "BTag",
  components: { BIcon },
  props: {
    attached: Boolean,
    closable: Boolean,
    type: [String, Object],
    size: String,
    rounded: Boolean,
    disabled: Boolean,
    ellipsis: Boolean,
    tabstop: {
      type: Boolean,
      default: true
    },
    ariaCloseLabel: String,
    icon: String,
    iconType: String,
    iconPack: String,
    closeType: String,
    closeIcon: String,
    closeIconPack: String,
    closeIconType: String
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    click: (_) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    close: (_) => true
  },
  computed: {
    // setting a boolean attribute `false` does not remove it on Vue 3.
    // `null` or `undefined` has to be given to remove it.
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  methods: {
    /*
    * Emit close event when delete button is clicked
    * or delete key is pressed.
    */
    close(event) {
      if (this.disabled) return;
      this.$emit("close", event);
    },
    /*
    * Emit click event when tag is clicked.
    */
    click(event) {
      if (this.disabled) return;
      this.$emit("click", event);
    }
  }
});

const _hoisted_1$3 = {
  key: 0,
  class: "tags has-addons inline-tags"
};
const _hoisted_2$2 = ["aria-label", "tabindex", "disabled"];
const _hoisted_3 = ["aria-label", "disabled", "tabindex"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return _ctx.attached && _ctx.closable ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
    createElementVNode(
      "span",
      {
        class: normalizeClass(["tag", [_ctx.type, _ctx.size, { "is-rounded": _ctx.rounded }]])
      },
      [
        _ctx.icon ? (openBlock(), createBlock(_component_b_icon, {
          key: 0,
          icon: _ctx.icon,
          size: _ctx.size,
          type: _ctx.iconType,
          pack: _ctx.iconPack
        }, null, 8, ["icon", "size", "type", "pack"])) : createCommentVNode("v-if", true),
        createElementVNode(
          "span",
          {
            class: normalizeClass({ "has-ellipsis": _ctx.ellipsis }),
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.click && _ctx.click(...args))
          },
          [
            renderSlot(_ctx.$slots, "default")
          ],
          2
          /* CLASS */
        )
      ],
      2
      /* CLASS */
    ),
    createElementVNode("a", {
      class: normalizeClass(["tag", [
        _ctx.size,
        _ctx.closeType,
        { "is-rounded": _ctx.rounded },
        _ctx.closeIcon ? "has-delete-icon" : "is-delete"
      ]]),
      role: "button",
      "aria-label": _ctx.ariaCloseLabel,
      tabindex: _ctx.tabstop ? 0 : void 0,
      disabled: _ctx.disabledOrUndefined,
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.close && _ctx.close(...args)),
      onKeyup: _cache[2] || (_cache[2] = withKeys(withModifiers((...args) => _ctx.close && _ctx.close(...args), ["prevent"]), ["delete"]))
    }, [
      _ctx.closeIcon ? (openBlock(), createBlock(_component_b_icon, {
        key: 0,
        "custom-class": "",
        icon: _ctx.closeIcon,
        size: _ctx.size,
        type: _ctx.closeIconType,
        pack: _ctx.closeIconPack
      }, null, 8, ["icon", "size", "type", "pack"])) : createCommentVNode("v-if", true)
    ], 42, _hoisted_2$2)
  ])) : (openBlock(), createElementBlock(
    "span",
    {
      key: 1,
      class: normalizeClass(["tag", [_ctx.type, _ctx.size, { "is-rounded": _ctx.rounded }]])
    },
    [
      _ctx.icon ? (openBlock(), createBlock(_component_b_icon, {
        key: 0,
        icon: _ctx.icon,
        size: _ctx.size,
        type: _ctx.iconType,
        pack: _ctx.iconPack
      }, null, 8, ["icon", "size", "type", "pack"])) : createCommentVNode("v-if", true),
      createElementVNode(
        "span",
        {
          class: normalizeClass({ "has-ellipsis": _ctx.ellipsis }),
          onClick: _cache[3] || (_cache[3] = (...args) => _ctx.click && _ctx.click(...args))
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      _ctx.closable ? (openBlock(), createElementBlock("a", {
        key: 1,
        role: "button",
        "aria-label": _ctx.ariaCloseLabel,
        class: normalizeClass(["delete is-small", _ctx.closeType]),
        disabled: _ctx.disabledOrUndefined,
        tabindex: _ctx.tabstop ? 0 : void 0,
        onClick: _cache[4] || (_cache[4] = (...args) => _ctx.close && _ctx.close(...args)),
        onKeyup: _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => _ctx.close && _ctx.close(...args), ["prevent"]), ["delete"]))
      }, null, 42, _hoisted_3)) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  ));
}
var BTag = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$4]]);

var _sfc_main$1 = defineComponent({
  name: "BTaglist",
  props: {
    attached: Boolean
  }
});

function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["tags", { "has-addons": _ctx.attached }])
    },
    [
      renderSlot(_ctx.$slots, "default")
    ],
    2
    /* CLASS */
  );
}
var Taglist = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$3]]);

const Plugin$5 = {
  install(Vue) {
    registerComponent(Vue, BTag);
    registerComponent(Vue, Taglist);
  }
};

var _sfc_main = defineComponent({
  name: "BTaginput",
  components: {
    BAutocomplete,
    BTag
  },
  mixins: [CompatFallthroughMixin, FormElementMixin],
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    type: String,
    closeType: String,
    attached: {
      type: Boolean,
      default: false
    },
    maxtags: Number,
    hasCounter: {
      type: Boolean,
      default: () => config.defaultTaginputHasCounter
    },
    field: {
      type: String,
      default: "value"
    },
    autocomplete: Boolean,
    groupField: String,
    groupOptions: String,
    nativeAutocomplete: String,
    openOnFocus: Boolean,
    keepOpen: {
      type: Boolean,
      default: true
    },
    keepFirst: Boolean,
    disabled: Boolean,
    ellipsis: Boolean,
    closable: {
      type: Boolean,
      default: true
    },
    ariaCloseLabel: String,
    confirmKeys: {
      type: Array,
      default: () => [",", "Tab", "Enter"]
    },
    removeOnKeys: {
      type: Array,
      default: () => ["Backspace"]
    },
    allowNew: Boolean,
    onPasteSeparators: {
      type: Array,
      default: () => [","]
    },
    beforeAdding: {
      type: Function,
      default: () => true
    },
    allowDuplicates: {
      type: Boolean,
      default: false
    },
    checkInfiniteScroll: {
      type: Boolean,
      default: false
    },
    createTag: {
      type: Function,
      default: (tag) => tag
    },
    appendToBody: Boolean
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    add: (tag) => true,
    "infinite-scroll": () => true,
    remove: (tag) => true,
    typing: (value) => true,
    "update:modelValue": (tags) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      tags: Array.isArray(this.modelValue) ? this.modelValue.slice(0) : this.modelValue || [],
      newTag: "",
      isComposing: false,
      _elementRef: "autocomplete",
      _isTaginput: true,
      requestID: null
    };
  },
  computed: {
    rootClasses() {
      return {
        "is-expanded": this.expanded
      };
    },
    containerClasses() {
      return {
        "is-focused": this.isFocused,
        "is-focusable": this.hasInput
      };
    },
    valueLength() {
      return this.newTag.trim().length;
    },
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    hasEmptySlot() {
      return !!this.$slots.empty;
    },
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
    /*
     * Show the input field if a maxtags hasn't been set or reached.
     */
    hasInput() {
      return this.maxtags == null || this.maxtags === 1 || this.tagsLength < this.maxtags;
    },
    tagsLength() {
      return this.tags.length;
    },
    /*
     * If Taginput has onPasteSeparators prop,
     * returning new RegExp used to split pasted string.
     */
    separatorsAsRegExp() {
      const sep = this.onPasteSeparators;
      return sep.length ? new RegExp(sep.map((s) => {
        return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : null;
      }).join("|"), "g") : null;
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    /*
     * When v-model is changed set internal value.
     */
    modelValue(value) {
      this.tags = Array.isArray(value) ? value.slice(0) : value || [];
    },
    hasInput() {
      if (!this.hasInput) this.onBlur();
    }
  },
  methods: {
    addTag(tag) {
      const tagToAdd = tag || this.newTag.trim();
      if (tagToAdd) {
        if (!this.autocomplete) {
          const reg = this.separatorsAsRegExp;
          if (reg && tagToAdd.match(reg)) {
            tagToAdd.split(reg).map((t) => t.trim()).filter((t) => t.length !== 0).map(this.addTag);
            return;
          }
        }
        const add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true;
        if (add && this.beforeAdding(tagToAdd)) {
          if (this.maxtags === 1) {
            this.tags = [];
          }
          this.tags.push(this.createTag(tagToAdd));
          this.$emit("update:modelValue", this.tags);
          this.$emit("add", tagToAdd);
        }
        this.requestID = requestAnimationFrame(() => {
          this.newTag = "";
          this.$emit("typing", "");
        });
      }
    },
    getNormalizedTagText(tag) {
      if (typeof tag === "object") {
        tag = getValueByPath(tag, this.field);
      }
      return `${tag}`;
    },
    customOnBlur(event) {
      if (!this.autocomplete) this.addTag();
      this.onBlur(event);
    },
    onSelect(option) {
      if (!option) return;
      this.addTag(option);
      this.$nextTick(() => {
        this.newTag = "";
      });
    },
    removeTag(index, event) {
      const tag = this.tags.splice(index, 1)[0];
      this.$emit("update:modelValue", this.tags);
      this.$emit("remove", tag);
      if (event) event.stopPropagation();
      if (this.openOnFocus && this.$refs.autocomplete) {
        this.$refs.autocomplete.focus();
      }
      return tag;
    },
    removeLastTag() {
      if (this.tagsLength > 0) {
        this.removeTag(this.tagsLength - 1);
      }
    },
    keydown(event) {
      const { key } = event;
      if (this.removeOnKeys.indexOf(key) !== -1 && !this.newTag.length) {
        this.removeLastTag();
      }
      if (this.autocomplete && !this.allowNew) return;
      if (this.confirmKeys.indexOf(key) >= 0) {
        if (key !== "Tab") event.preventDefault();
        if (key === "Enter" && this.isComposing) return;
        this.addTag();
      }
    },
    onTyping(event) {
      this.$emit("typing", typeof event === "number" ? event : event == null ? void 0 : event.trim());
    },
    emitInfiniteScroll() {
      this.$emit("infinite-scroll");
    }
  },
  beforeUnmount() {
    cancelAnimationFrame(this.requestID);
  }
});

const _hoisted_1$2 = ["disabled"];
const _hoisted_2$1 = {
  key: 0,
  class: "help counter"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_tag = resolveComponent("b-tag");
  const _component_b_autocomplete = resolveComponent("b-autocomplete");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["taginput control", _ctx.rootClasses]
    }, _ctx.rootAttrs),
    [
      createElementVNode("div", {
        class: normalizeClass(["taginput-container input", [_ctx.statusType, _ctx.size, _ctx.containerClasses]]),
        disabled: _ctx.disabledOrUndefined,
        onClick: _cache[3] || (_cache[3] = ($event) => _ctx.hasInput && _ctx.focus())
      }, [
        renderSlot(_ctx.$slots, "selected", { tags: _ctx.tags }, () => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.tags, (tag, index) => {
              return openBlock(), createBlock(_component_b_tag, {
                key: _ctx.getNormalizedTagText(tag) + index,
                type: _ctx.type,
                "close-type": _ctx.closeType,
                size: _ctx.size,
                rounded: _ctx.rounded,
                attached: _ctx.attached,
                tabstop: false,
                disabled: _ctx.disabledOrUndefined,
                ellipsis: _ctx.ellipsis,
                closable: _ctx.closable,
                "aria-close-label": _ctx.ariaCloseLabel,
                title: _ctx.ellipsis && _ctx.getNormalizedTagText(tag),
                onClose: ($event) => _ctx.removeTag(index, $event)
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "tag", { tag }, () => [
                    createTextVNode(
                      toDisplayString(_ctx.getNormalizedTagText(tag)),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["type", "close-type", "size", "rounded", "attached", "disabled", "ellipsis", "closable", "aria-close-label", "title", "onClose"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _ctx.hasInput ? (openBlock(), createBlock(_component_b_autocomplete, mergeProps({
          key: 0,
          ref: "autocomplete",
          modelValue: _ctx.newTag,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.newTag = $event)
        }, _ctx.fallthroughAttrs, {
          data: _ctx.data,
          field: _ctx.field,
          icon: _ctx.icon,
          "icon-pack": _ctx.iconPack,
          maxlength: _ctx.maxlength,
          "has-counter": false,
          size: _ctx.size,
          disabled: _ctx.disabledOrUndefined,
          loading: _ctx.loading,
          autocomplete: _ctx.nativeAutocomplete,
          "open-on-focus": _ctx.openOnFocus,
          "keep-open": _ctx.keepOpen,
          "keep-first": _ctx.keepFirst,
          "group-field": _ctx.groupField,
          "group-options": _ctx.groupOptions,
          "use-html5-validation": _ctx.useHtml5Validation,
          "check-infinite-scroll": _ctx.checkInfiniteScroll,
          "append-to-body": _ctx.appendToBody,
          "confirm-keys": _ctx.confirmKeys,
          onTyping: _ctx.onTyping,
          onFocus: _ctx.onFocus,
          onBlur: _ctx.customOnBlur,
          onKeydown: _ctx.keydown,
          onCompositionstart: _cache[1] || (_cache[1] = ($event) => _ctx.isComposing = true),
          onCompositionend: _cache[2] || (_cache[2] = ($event) => _ctx.isComposing = false),
          onSelect: _ctx.onSelect,
          onInfiniteScroll: _ctx.emitInfiniteScroll
        }), createSlots({
          _: 2
          /* DYNAMIC */
        }, [
          _ctx.hasHeaderSlot ? {
            name: "header",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "header")
            ]),
            key: "0"
          } : void 0,
          _ctx.hasDefaultSlot ? {
            name: "default",
            fn: withCtx((props) => [
              renderSlot(_ctx.$slots, "default", {
                option: props.option,
                index: props.index
              })
            ]),
            key: "1"
          } : void 0,
          _ctx.hasEmptySlot ? {
            name: "empty",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "empty")
            ]),
            key: "2"
          } : void 0,
          _ctx.hasFooterSlot ? {
            name: "footer",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "footer")
            ]),
            key: "3"
          } : void 0
        ]), 1040, ["modelValue", "data", "field", "icon", "icon-pack", "maxlength", "size", "disabled", "loading", "autocomplete", "open-on-focus", "keep-open", "keep-first", "group-field", "group-options", "use-html5-validation", "check-infinite-scroll", "append-to-body", "confirm-keys", "onTyping", "onFocus", "onBlur", "onKeydown", "onSelect", "onInfiniteScroll"])) : createCommentVNode("v-if", true)
      ], 10, _hoisted_1$2),
      _ctx.hasCounter && (_ctx.maxtags || _ctx.maxlength) ? (openBlock(), createElementBlock("small", _hoisted_2$1, [
        _ctx.maxlength && _ctx.valueLength > 0 ? (openBlock(), createElementBlock(
          Fragment,
          { key: 0 },
          [
            createTextVNode(
              toDisplayString(_ctx.valueLength) + " / " + toDisplayString(_ctx.maxlength),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : _ctx.maxtags ? (openBlock(), createElementBlock(
          Fragment,
          { key: 1 },
          [
            createTextVNode(
              toDisplayString(_ctx.tagsLength) + " / " + toDisplayString(_ctx.maxtags),
              1
              /* TEXT */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : createCommentVNode("v-if", true)
      ])) : createCommentVNode("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var Taginput = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render$2]]);

const Plugin$4 = {
  install(Vue) {
    registerComponent(Vue, Taginput);
  }
};

const Plugin$3 = {
  install(Vue) {
    registerComponent(Vue, Timepicker);
  }
};

const Toast$1 = defineComponent({
  name: "BToast",
  mixins: [NoticeMixin],
  data() {
    return {
      newDuration: this.duration || config.defaultToastDuration
    };
  }
});

const _hoisted_1$1 = ["aria-hidden"];
const _hoisted_2 = ["innerHTML"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    "enter-active-class": _ctx.transition.enter,
    "leave-active-class": _ctx.transition.leave,
    persisted: ""
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.pause && _ctx.pause(...args)),
        onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.removePause && _ctx.removePause(...args)),
        class: normalizeClass(["toast", [_ctx.type, _ctx.position]]),
        "aria-hidden": !_ctx.isActive,
        role: "alert"
      }, [
        _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(
          Fragment,
          { key: 1 },
          [
            createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
            createElementVNode("div", { innerHTML: _ctx.message }, null, 8, _hoisted_2)
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ], 42, _hoisted_1$1), [
        [vShow, _ctx.isActive]
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["enter-active-class", "leave-active-class"]);
}
var Toast = /* @__PURE__ */ _export_sfc(Toast$1, [["render", _sfc_render$1]]);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class ToastProgrammatic {
  constructor(app) {
    __publicField(this, "app");
    this.app = app;
  }
  open(params) {
    if (typeof params === "string") {
      params = {
        message: params
      };
    }
    let slot;
    let _a = params, { message } = _a, restParams = __objRest(_a, ["message"]);
    if (typeof message !== "string") {
      slot = message;
      message = void 0;
    }
    const propsData = __spreadValues({
      position: config.defaultToastPosition || "is-top",
      message
    }, restParams);
    const container = document.createElement("div");
    const vueInstance = createApp({
      data() {
        return {
          toastVNode: null
        };
      },
      methods: {
        close() {
          const toast = getComponentFromVNode(this.toastVNode);
          if (toast) {
            toast.close();
          }
        }
      },
      render() {
        this.toastVNode = h(
          Toast,
          __spreadProps(__spreadValues({}, propsData), {
            // On Vue 3, $destroy is no longer available.
            // A toast has to be unmounted manually.
            onClose: () => {
              if (typeof propsData.onClose === "function") {
                propsData.onClose();
              }
              setTimeout(() => {
                vueInstance.unmount();
              }, 150);
            }
          }),
          slot != null ? { default: () => slot } : void 0
        );
        return this.toastVNode;
      }
    });
    if (this.app) {
      copyAppContext(this.app, vueInstance);
    } else {
      vueInstance.config.globalProperties.$buefy = {};
    }
    return vueInstance.mount(container);
  }
}
const Plugin$2 = {
  install(Vue) {
    registerComponentProgrammatic(Vue, "toast", new ToastProgrammatic(Vue));
  }
};

const Plugin$1 = {
  install(Vue) {
    registerComponent(Vue, Tooltip);
  }
};

const Upload$1 = defineComponent({
  name: "BUpload",
  mixins: [CompatFallthroughMixin, FormElementMixin],
  props: {
    modelValue: {
      type: [Object, Function, File, Array]
    },
    multiple: Boolean,
    disabled: Boolean,
    accept: String,
    dragDrop: Boolean,
    type: {
      type: String,
      default: "is-primary"
    },
    native: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    invalid: () => true,
    "update:modelValue": (newValue) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newValue: this.modelValue,
      dragDropFocus: false,
      _elementRef: "input"
    };
  },
  computed: {
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    modelValue(value) {
      this.newValue = value;
      if (!value || Array.isArray(value) && value.length === 0) {
        this.$refs.input.value = "";
      }
      !this.isValid && !this.dragDrop && this.checkHtml5Validity();
    }
  },
  methods: {
    onFileChange(event) {
      var _a, _b;
      if (this.disabled || this.loading) return;
      if (this.dragDrop) this.updateDragDropFocus(false);
      const value = (_b = (_a = event.target.files) != null ? _a : event.dataTransfer.files) != null ? _b : [];
      if (value.length === 0) {
        if (!this.newValue) return;
        if (this.native) this.newValue = null;
      } else if (!this.multiple) {
        if (this.dragDrop && value.length !== 1) return;
        else {
          const file = value[0];
          if (this.checkType(file)) this.newValue = file;
          else if (this.newValue) {
            this.newValue = null;
            this.clearInput();
          } else {
            this.clearInput();
            this.checkHtml5Validity();
            return;
          }
        }
      } else {
        let newValues = false;
        if (this.native || !this.newValue) {
          this.newValue = [];
          newValues = true;
        }
        for (let i = 0; i < value.length; i++) {
          const file = value[i];
          if (this.checkType(file) && Array.isArray(this.newValue)) {
            this.newValue.push(file);
            newValues = true;
          }
        }
        if (!newValues) return;
      }
      this.$emit("update:modelValue", this.newValue);
      !this.dragDrop && this.checkHtml5Validity();
    },
    clearInput() {
      this.$refs.input.value = "";
    },
    updateDragDropFocus(focus) {
      if (!this.disabled && !this.loading) {
        this.dragDropFocus = focus;
      }
    },
    checkType(file) {
      if (!this.accept) return true;
      const types = this.accept.split(",");
      if (types.length === 0) return true;
      let valid = false;
      for (let i = 0; i < types.length && !valid; i++) {
        const type = types[i].trim();
        if (type) {
          if (type.substring(0, 1) === ".") {
            const extension = file.name.toLowerCase().slice(-type.length);
            if (extension === type.toLowerCase()) {
              valid = true;
            }
          } else {
            if (file.type.match(type)) {
              valid = true;
            }
          }
        }
      }
      if (!valid) this.$emit("invalid");
      return valid;
    }
  }
});

const _hoisted_1 = ["multiple", "accept", "disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "label",
    mergeProps({ class: "upload control" }, _ctx.rootAttrs, {
      class: [{ "is-expanded": _ctx.expanded, "is-rounded": _ctx.rounded }]
    }),
    [
      !_ctx.dragDrop ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createElementBlock(
        "div",
        {
          key: 1,
          class: normalizeClass(["upload-draggable", [_ctx.type, {
            "is-loading": _ctx.loading,
            "is-disabled": _ctx.disabled,
            "is-hovered": _ctx.dragDropFocus,
            "is-expanded": _ctx.expanded
          }]]),
          onDragover: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.updateDragDropFocus(true), ["prevent"])),
          onDragleave: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.updateDragDropFocus(false), ["prevent"])),
          onDragenter: _cache[2] || (_cache[2] = withModifiers(($event) => _ctx.updateDragDropFocus(true), ["prevent"])),
          onDrop: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.onFileChange && _ctx.onFileChange(...args), ["prevent"]))
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        34
        /* CLASS, NEED_HYDRATION */
      )),
      createElementVNode("input", mergeProps({
        ref: "input",
        type: "file"
      }, _ctx.fallthroughAttrs, {
        multiple: _ctx.multiple,
        accept: _ctx.accept,
        disabled: _ctx.disabledOrUndefined,
        onChange: _cache[4] || (_cache[4] = (...args) => _ctx.onFileChange && _ctx.onFileChange(...args))
      }), null, 16, _hoisted_1)
    ],
    16
    /* FULL_PROPS */
  );
}
var Upload = /* @__PURE__ */ _export_sfc(Upload$1, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Upload);
  }
};

const allComponents = [
  Plugin$F,
  Plugin$E,
  Plugin$D,
  Plugin$C,
  Plugin$B,
  Plugin$x,
  Plugin$A,
  Plugin$w,
  Plugin$v,
  Plugin$u,
  Plugin$t,
  Plugin$z,
  Plugin$s,
  Plugin$r,
  Plugin$q,
  Plugin$y,
  Plugin$p,
  Plugin$o,
  Plugin$n,
  Plugin$m,
  Plugin$k,
  Plugin$l,
  Plugin$j,
  Plugin$i,
  Plugin$h,
  Plugin$g,
  Plugin$f,
  Plugin$e,
  Plugin$d,
  Plugin$c,
  Plugin$b,
  Plugin$a,
  Plugin$9,
  Plugin$8,
  Plugin$7,
  Plugin$6,
  Plugin$5,
  Plugin$4,
  Plugin$3,
  Plugin$2,
  Plugin$1,
  Plugin
];

const Buefy = {
  install(Vue, options = {}) {
    setOptions(merge(config, options, true));
    allComponents.forEach((component) => Vue.use(component));
    registerComponentProgrammatic(Vue, "config", ConfigComponent);
    Vue.config.globalProperties.$buefy.globalNoticeInterval = void 0;
  }
};

export { Plugin$F as Autocomplete, BAutocomplete, Breadcrumb as BBreadcrumb, BreadcrumbItem as BBreadcrumbItem, BButton, Carousel as BCarousel, CarouselItem as BCarouselItem, CarouselList as BCarouselList, BCheckbox, CheckboxButton as BCheckboxButton, Clockpicker as BClockpicker, _sfc_main$F as BCollapse, Colorpicker as BColorpicker, BDatepicker, Datetimepicker as BDatetimepicker, Dialog as BDialog, BDropdown, BDropdownItem, Field as BField, BIcon, Image$1 as BImage, BInput, BLoading, Menu as BMenu, MenuItem as BMenuItem, MenuList as BMenuList, Message as BMessage, Modal as BModal, _sfc_main$k as BNavbar, NavbarDropdown as BNavbarDropdown, NavbarItem as BNavbarItem, Notification as BNotification, Numberinput as BNumberinput, BPagination, PaginationButton as BPaginationButton, Progress as BProgress, ProgressBar as BProgressBar, Radio as BRadio, RadioButton as BRadioButton, Rate as BRate, BSelect, Sidebar as BSidebar, BSkeleton, Slider as BSlider, SliderTick as BSliderTick, Snackbar as BSnackbar, _sfc_main$9 as BStepItem, Steps as BSteps, Switch as BSwitch, _sfc_main$3 as BTabItem, Table as BTable, _sfc_main$5 as BTableColumn, Tabs as BTabs, BTag, Taginput as BTaginput, Taglist as BTaglist, Timepicker as BTimepicker, Toast as BToast, Tooltip as BTooltip, Upload as BUpload, Plugin$E as Breadcrumb, Plugin$D as Button, Plugin$C as Carousel, Plugin$B as Checkbox, Plugin$x as Clockpicker, Plugin$A as Collapse, Color, Plugin$w as Colorpicker, ConfigComponent as ConfigProgrammatic, Plugin$v as Datepicker, Plugin$u as Datetimepicker, Plugin$t as Dialog, DialogProgrammatic, Plugin$z as Dropdown, Plugin$s as Field, Plugin$r as Icon, Plugin$q as Image, Plugin$y as Input, Plugin$p as Loading, LoadingProgrammatic, Plugin$o as Menu, Plugin$n as Message, Plugin$m as Modal, ModalProgrammatic, Plugin$k as Navbar, Plugin$l as Notification, NotificationProgrammatic, Plugin$j as Numberinput, Plugin$i as Pagination, Plugin$h as Progress, Plugin$g as Radio, Plugin$f as Rate, Plugin$e as Select, Plugin$c as Sidebar, Plugin$d as Skeleton, Plugin$b as Slider, Plugin$a as Snackbar, SnackbarProgrammatic, Plugin$9 as Steps, Plugin$8 as Switch, Plugin$7 as Table, Plugin$6 as Tabs, Plugin$5 as Tag, Plugin$4 as Taginput, Plugin$3 as Timepicker, Plugin$2 as Toast, ToastProgrammatic, Plugin$1 as Tooltip, Plugin as Upload, bound, copyAppContext, createAbsoluteElement, createNewEvent, Buefy as default, escapeRegExpChars, getComponentFromVNode, getMonthNames, getValueByPath, getWeekdayNames, hasFlag, indexOf, isCustomElement, isDefined, isFragment, isMobile, isNil, isTag, isVueComponent, isWebpSupported, matchWithGroups, merge, mod, multiColumnSort, removeDiacriticsFromString, removeElement, sign, toCssWidth, translateTouchAsDragEvent };
