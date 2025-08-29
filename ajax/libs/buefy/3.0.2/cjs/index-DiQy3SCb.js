'use strict';

var vue = require('vue');
var FormElementMixin = require('./FormElementMixin-DavX4iOv.js');
var helpers = require('./helpers.js');
var config = require('./config-DR826Ki2.js');
var Button = require('./Button-Cq7yqI8p.js');
var Dropdown = require('./Dropdown-DtpKU9qf.js');
var DropdownItem = require('./DropdownItem-IMOKyRGV.js');
var Input = require('./Input-BcloGeZ3.js');
var Field = require('./Field-19ZCJFF8.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var Tooltip = require('./Tooltip-Cgighv0j.js');
var plugins = require('./plugins-DbyYGVpp.js');

var __defProp = Object.defineProperty;
var __pow = Math.pow;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
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
    __publicField(this, "$channels");
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

const cos30 = 0.86602540378;
const sin30 = 0.5;
let id = 0;
var _sfc_main$3 = vue.defineComponent({
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

const _hoisted_1$3 = ["viewBox"];
const _hoisted_2$1 = ["id"];
const _hoisted_3$1 = /* @__PURE__ */ vue.createElementVNode(
  "stop",
  {
    offset: "0%",
    "stop-color": "#fff"
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_4$1 = /* @__PURE__ */ vue.createElementVNode(
  "stop",
  {
    offset: "100%",
    "stop-color": "#000"
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_5 = [
  _hoisted_3$1,
  _hoisted_4$1
];
const _hoisted_6 = ["id"];
const _hoisted_7 = ["stop-color"];
const _hoisted_8 = ["stop-color"];
const _hoisted_9 = ["id"];
const _hoisted_10 = ["d"];
const _hoisted_11 = { class: "colorpicker-triangle-slider-hue" };
const _hoisted_12 = ["width", "height", "clip-path"];
const _hoisted_13 = ["x", "height"];
const _hoisted_14 = ["aria-valuenow"];
const _hoisted_15 = ["d", "fill"];
const _hoisted_16 = ["d", "fill"];
const _hoisted_17 = ["x", "y"];
const _hoisted_18 = ["aria-datavalues"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    viewBox: _ctx.viewBox,
    class: "b-colorpicker-triangle"
  }, [
    vue.createElementVNode("defs", null, [
      vue.createElementVNode("linearGradient", {
        id: `cp-triangle-gradient-ligthness-${_ctx.id}`,
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "0"
      }, [..._hoisted_5], 8, _hoisted_2$1),
      vue.createElementVNode("linearGradient", {
        id: `cp-triangle-gradient-saturation-${_ctx.id}`,
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1"
      }, [
        vue.createElementVNode("stop", {
          offset: "0%",
          "stop-color": `hsl(${_ctx.hue}deg, 100%, 50%)`,
          "stop-opacity": "1"
        }, null, 8, _hoisted_7),
        vue.createElementVNode("stop", {
          offset: "100%",
          "stop-color": `hsl(${_ctx.hue}deg, 100%, 50%)`,
          "stop-opacity": "0"
        }, null, 8, _hoisted_8)
      ], 8, _hoisted_6),
      vue.createElementVNode("clipPath", {
        id: `cp-triangle-clip-${_ctx.id}`
      }, [
        vue.createElementVNode("path", { d: _ctx.haloPath }, null, 8, _hoisted_10)
      ], 8, _hoisted_9)
    ]),
    vue.createElementVNode("g", _hoisted_11, [
      (vue.openBlock(), vue.createElementBlock("foreignObject", {
        x: 0,
        y: 0,
        width: _ctx.size,
        height: _ctx.size,
        "clip-path": `url(#cp-triangle-clip-${_ctx.id})`
      }, [
        vue.createElementVNode(
          "div",
          {
            class: "colorpicker-triangle-hue",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickHue && _ctx.clickHue(...args)),
            onMousedown: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
            onTouchstart: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
          },
          null,
          32
          /* NEED_HYDRATION */
        )
      ], 8, _hoisted_12)),
      vue.createElementVNode(
        "g",
        {
          style: vue.normalizeStyle(`transform: rotate(${_ctx.hue}deg)`)
        },
        [
          (vue.openBlock(), vue.createElementBlock("foreignObject", {
            x: _ctx.size / 2 - 4,
            y: 0,
            width: "8",
            height: _ctx.thickness + 4
          }, [
            vue.createElementVNode("div", {
              ref: "hueCursor",
              class: "hue-range-thumb",
              style: vue.normalizeStyle(`background-color: hsl(${_ctx.hue}deg, 100%, 50%)`),
              role: "slider",
              tabindex: "0",
              "aria-label": "Hue",
              "aria-valuemin": "0",
              "aria-valuenow": _ctx.hue,
              "aria-valuemax": "360",
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.clickHue && _ctx.clickHue(...args)),
              onKeydown: _cache[4] || (_cache[4] = (...args) => _ctx.hueKeyPress && _ctx.hueKeyPress(...args)),
              onMousedown: _cache[5] || (_cache[5] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
              onTouchstart: _cache[6] || (_cache[6] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
            }, null, 44, _hoisted_14)
          ], 8, _hoisted_13))
        ],
        4
        /* STYLE */
      )
    ]),
    vue.createElementVNode(
      "g",
      {
        class: "colorpicker-triangle-slider-sl",
        style: vue.normalizeStyle(`transform: rotate(${_ctx.hue}deg) translate(50%, 50%)`),
        role: "graphics-datagroup",
        "aria-datascales": "lightness, saturation"
      },
      [
        vue.createElementVNode("path", {
          d: _ctx.trianglePath,
          fill: `url(#cp-triangle-gradient-ligthness-${_ctx.id})`
        }, null, 8, _hoisted_15),
        vue.createElementVNode("path", {
          d: _ctx.trianglePath,
          fill: `url(#cp-triangle-gradient-saturation-${_ctx.id})`,
          style: { "mix-blend-mode": "overlay" },
          onClick: _cache[7] || (_cache[7] = (...args) => _ctx.clickSL && _ctx.clickSL(...args)),
          onMousedown: _cache[8] || (_cache[8] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
          onTouchstart: _cache[9] || (_cache[9] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
        }, null, 40, _hoisted_16),
        (vue.openBlock(), vue.createElementBlock("foreignObject", {
          x: (_ctx.internalRadius - 3) * _ctx.cos30 * (-_ctx.lightness + 0.5) * 2 - 6,
          y: -_ctx.internalRadius + (1 - _ctx.saturation) * (_ctx.internalRadius - 3) * 1.5 - 3,
          width: "12",
          height: "12"
        }, [
          vue.createElementVNode("div", {
            ref: "slCursor",
            class: "sl-range-thumb",
            style: vue.normalizeStyle({
              backgroundColor: `hsl(${_ctx.hue}deg, ${_ctx.saturation * 100}%, ${_ctx.lightness * 100}%)`
            }),
            tabindex: "0",
            "aria-datavalues": `${_ctx.saturation * 100}%, ${_ctx.lightness * 100}%`,
            onClick: _cache[10] || (_cache[10] = (...args) => _ctx.clickSL && _ctx.clickSL(...args)),
            onKeydown: _cache[11] || (_cache[11] = (...args) => _ctx.slKeyPress && _ctx.slKeyPress(...args)),
            onMousedown: _cache[12] || (_cache[12] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
            onTouchstart: _cache[13] || (_cache[13] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
          }, null, 44, _hoisted_18)
        ], 8, _hoisted_17))
      ],
      4
      /* STYLE */
    )
  ], 8, _hoisted_1$3);
}
var BColorpickerHSLRepresentationTriangle = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);

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
var _sfc_main$2 = vue.defineComponent({
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

const _hoisted_1$2 = ["aria-datavalues"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: "b-colorpicker-square",
      style: vue.normalizeStyle({ width: `${_ctx.size}px` })
    },
    [
      vue.createElementVNode(
        "div",
        {
          class: "colorpicker-square-slider-hue",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickHue && _ctx.clickHue(...args)),
          onMousedown: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
          onTouchstart: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
        },
        [
          vue.createElementVNode(
            "div",
            {
              ref: "hueCursor",
              role: "slider",
              class: "hue-range-thumb",
              tabindex: "0",
              "aria-label": "Hue",
              "aria-valuemin": "0",
              "aria-valuemax": "359",
              style: vue.normalizeStyle(_ctx.hueThumbStyle)
            },
            null,
            4
            /* STYLE */
          )
        ],
        32
        /* NEED_HYDRATION */
      ),
      vue.createElementVNode(
        "div",
        {
          class: "colorpicker-square-slider-sl",
          style: vue.normalizeStyle({
            background: _ctx.SLBackground,
            margin: `${_ctx.thickness}px`
          }),
          "aria-datascales": "lightness, saturation",
          onClick: _cache[7] || (_cache[7] = (...args) => _ctx.clickSL && _ctx.clickSL(...args)),
          onMousedown: _cache[8] || (_cache[8] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
          onTouchstart: _cache[9] || (_cache[9] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
        },
        [
          vue.createElementVNode("div", {
            ref: "slCursor",
            role: "slider",
            class: "sl-range-thumb",
            tabindex: "0",
            "aria-datavalues": `${_ctx.saturation * 100}%, ${_ctx.lightness * 100}%`,
            style: vue.normalizeStyle(_ctx.slThumbStyle),
            onClick: _cache[3] || (_cache[3] = (...args) => _ctx.clickSL && _ctx.clickSL(...args)),
            onKeydown: _cache[4] || (_cache[4] = (...args) => _ctx.slKeyPress && _ctx.slKeyPress(...args)),
            onMousedown: _cache[5] || (_cache[5] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"])),
            onTouchstart: _cache[6] || (_cache[6] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
          }, null, 44, _hoisted_1$2)
        ],
        36
        /* STYLE, NEED_HYDRATION */
      )
    ],
    4
    /* STYLE */
  );
}
var BColorpickerHSLRepresentationSquare = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

var _sfc_main$1 = vue.defineComponent({
  name: "BColorpickerAlphaSlider",
  components: {
    BTooltip: Tooltip.Tooltip
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

const _hoisted_1$1 = ["aria-valuenow"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_tooltip = vue.resolveComponent("b-tooltip");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: "b-colorpicker-alpha-slider",
      style: vue.normalizeStyle(_ctx.style),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickAlpha && _ctx.clickAlpha(...args)),
      onKeydown: _cache[1] || (_cache[1] = (...args) => _ctx.alphaKeyPress && _ctx.alphaKeyPress(...args)),
      onMousedown: _cache[2] || (_cache[2] = (...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args)),
      onTouchstart: _cache[3] || (_cache[3] = vue.withModifiers((...args) => _ctx.startMouseCapture && _ctx.startMouseCapture(...args), ["prevent"]))
    },
    [
      vue.createElementVNode("div", {
        ref: "alphaCursor",
        role: "slider",
        class: "alpha-range-thumb",
        tabindex: "0",
        "aria-label": "Tranparency",
        "aria-valuemin": "0",
        "aria-valuenow": _ctx.percent,
        "aria-valuemax": "100",
        style: vue.normalizeStyle({ left: `${_ctx.percent}%` })
      }, [
        vue.createVNode(_component_b_tooltip, {
          label: `${_ctx.percent}%`,
          always: _ctx.captureMouse,
          position: "is-top"
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("   ")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["label", "always"])
      ], 12, _hoisted_1$1)
    ],
    36
    /* STYLE, NEED_HYDRATION */
  );
}
var BColorpickerAlphaSlider = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

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
var _sfc_main = vue.defineComponent({
  name: "BColorpicker",
  components: {
    BColorpickerHSLRepresentationTriangle,
    BColorpickerHSLRepresentationSquare,
    BColorpickerAlphaSlider,
    BInput: Input.BInput,
    BField: Field.Field,
    BButton: Button.BButton,
    BDropdown: Dropdown.BDropdown,
    BDropdownItem: DropdownItem.BDropdownItem
  },
  mixins: [FormElementMixin.FormElementMixin],
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
        if (typeof config.config.defaultColorFormatter === "function") {
          return config.config.defaultColorFormatter(color);
        } else {
          return defaultColorFormatter(color);
        }
      }
    },
    colorParser: {
      type: Function,
      default: (color, vm) => {
        if (typeof config.config.defaultColorParser === "function") {
          return config.config.defaultColorParser(color);
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
      default: () => config.config.defaultDatepickerMobileModal
    },
    focusable: {
      type: Boolean,
      default: true
    },
    trapFocus: {
      type: Boolean,
      default: () => config.config.defaultTrapFocus
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
      return this.mobileNative && helpers.isMobile.any();
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

const _hoisted_1 = { class: "color-name" };
const _hoisted_2 = { class: "colorpicker-header" };
const _hoisted_3 = { class: "colorpicker-content" };
const _hoisted_4 = { class: "colorpicker-footer" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_button = vue.resolveComponent("b-button");
  const _component_b_colorpicker_h_s_l_representation_square = vue.resolveComponent("b-colorpicker-h-s-l-representation-square");
  const _component_b_colorpicker_h_s_l_representation_triangle = vue.resolveComponent("b-colorpicker-h-s-l-representation-triangle");
  const _component_b_colorpicker_alpha_slider = vue.resolveComponent("b-colorpicker-alpha-slider");
  const _component_b_input = vue.resolveComponent("b-input");
  const _component_b_field = vue.resolveComponent("b-field");
  const _component_b_dropdown_item = vue.resolveComponent("b-dropdown-item");
  const _component_b_dropdown = vue.resolveComponent("b-dropdown");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(["colorpicker control", [_ctx.size, { "is-expanded": _ctx.expanded }]])
    },
    [
      !_ctx.isMobile || _ctx.inline ? (vue.openBlock(), vue.createBlock(_component_b_dropdown, {
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
      }, vue.createSlots({
        default: vue.withCtx(() => [
          vue.createVNode(_component_b_dropdown_item, {
            disabled: _ctx.disabled,
            focusable: _ctx.focusable,
            custom: "",
            class: vue.normalizeClass({ "dropdown-horizontal-colorpicker": _ctx.horizontalColorPicker })
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", null, [
                vue.createElementVNode("header", _hoisted_2, [
                  _ctx.$slots.header !== void 0 && _ctx.$slots.header.length ? vue.renderSlot(_ctx.$slots, "header", { key: 0 }) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode("div", _hoisted_3, [
                  _ctx.representation === "square" ? (vue.openBlock(), vue.createBlock(_component_b_colorpicker_h_s_l_representation_square, {
                    key: 0,
                    value: _ctx.computedValue,
                    onInput: _ctx.updateColor
                  }, null, 8, ["value", "onInput"])) : (vue.openBlock(), vue.createBlock(_component_b_colorpicker_h_s_l_representation_triangle, {
                    key: 1,
                    value: _ctx.computedValue,
                    onInput: _ctx.updateColor
                  }, null, 8, ["value", "onInput"]))
                ])
              ]),
              vue.createElementVNode("footer", _hoisted_4, [
                _ctx.alpha ? (vue.openBlock(), vue.createBlock(_component_b_colorpicker_alpha_slider, {
                  key: 0,
                  value: _ctx.computedValue.alpha,
                  onInput: _ctx.updateAlpha,
                  color: _ctx.computedValue
                }, null, 8, ["value", "onInput", "color"])) : vue.createCommentVNode("v-if", true),
                vue.renderSlot(_ctx.$slots, "footer", { color: _ctx.computedValue }, () => [
                  vue.createVNode(_component_b_field, {
                    class: "colorpicker-fields",
                    grouped: ""
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_b_field, {
                        horizontal: "",
                        label: "R"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_b_input, {
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
                      vue.createVNode(_component_b_field, {
                        horizontal: "",
                        label: "G"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_b_input, {
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
                      vue.createVNode(_component_b_field, {
                        horizontal: "",
                        label: "B"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_b_input, {
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
          fn: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "trigger", {}, () => [
              vue.createVNode(_component_b_button, {
                style: vue.normalizeStyle(_ctx.triggerStyle),
                expanded: _ctx.expanded,
                disabled: _ctx.disabled
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode(
                    "span",
                    _hoisted_1,
                    vue.toDisplayString(_ctx.colorFormatter(_ctx.computedValue)),
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
      ]), 1032, ["position", "expanded", "disabled", "inline", "mobile-modal", "trap-focus", "aria-role", "append-to-body", "onActiveChange"])) : vue.createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
var Colorpicker = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Colorpicker);
  }
};

exports.Color = Color;
exports.Colorpicker = Colorpicker;
exports.Plugin = Plugin;
