/*! Buefy v3.0.2 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Colorpicker = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

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

    let config = {
      defaultIconPack: "mdi",
      defaultIconComponent: null,
      defaultLocale: void 0,
      defaultTooltipType: "is-primary",
      defaultTooltipDelay: null,
      defaultTooltipCloseDelay: null,
      defaultInputAutocomplete: "on",
      defaultInputHasCounter: true,
      defaultCompatFallthrough: true,
      defaultUseHtml5Validation: true,
      defaultDropdownMobileModal: true,
      defaultFieldLabelPosition: null,
      defaultDatepickerMobileModal: true,
      defaultTrapFocus: true,
      defaultButtonRounded: false,
      defaultStatusIcon: true,
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
      ]};

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
    function toCssWidth(width) {
      return width === void 0 ? null : isNaN(+width) ? `${width}` : width + "px";
    }
    function isCustomElement(vm) {
      return vm.$root != null && "shadowRoot" in vm.$root.$options;
    }
    function isTag(vnode) {
      return vnode.type !== vue.Comment && vnode.type !== vue.Text && vnode.type !== vue.Static;
    }

    var _sfc_main$a = vue.defineComponent({
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
        if (children != null && children.length === 1 && children[0].type === vue.Fragment) {
          children = children[0].children;
        }
        return vue.h(
          "div",
          { class: "field-body" },
          {
            default: () => {
              return children != null && children.map((element) => {
                if (element.type === vue.Comment || element.type === vue.Text) {
                  return element;
                }
                let message;
                if (first) {
                  message = this.message;
                  first = false;
                }
                const parentField = this.parent;
                return vue.h(
                  // parentField.$.type is supposed to be BField
                  // it falls back to `resolveComponent('b-field')`
                  // but won't work unless `BField` is globally registered
                  // should not be a problem as long as `BFieldBody` is properly used
                  parentField ? parentField.$.type : vue.resolveComponent("b-field"),
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

    const Field = vue.defineComponent({
      name: "BField",
      components: { BFieldBody: _sfc_main$a },
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

    const _hoisted_1$8 = ["for"];
    const _hoisted_2$6 = ["for"];
    const _hoisted_3$5 = {
      key: 3,
      class: "field-body"
    };
    function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_field_body = vue.resolveComponent("b-field-body");
      const _component_b_field = vue.resolveComponent("b-field");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["field", _ctx.rootClasses])
        },
        [
          _ctx.horizontal ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(["field-label", [_ctx.customClass, _ctx.fieldLabelSize]])
            },
            [
              _ctx.hasLabel ? (vue.openBlock(), vue.createElementBlock("label", {
                key: 0,
                for: _ctx.labelFor,
                class: vue.normalizeClass([_ctx.customClass, "label"])
              }, [
                _ctx.$slots.label ? vue.renderSlot(_ctx.$slots, "label", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createTextVNode(
                      vue.toDisplayString(_ctx.label),
                      1
                      /* TEXT */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              ], 10, _hoisted_1$8)) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              _ctx.hasLabel ? (vue.openBlock(), vue.createElementBlock("label", {
                key: 0,
                for: _ctx.labelFor,
                class: vue.normalizeClass([_ctx.customClass, "label"])
              }, [
                _ctx.$slots.label ? vue.renderSlot(_ctx.$slots, "label", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createTextVNode(
                      vue.toDisplayString(_ctx.label),
                      1
                      /* TEXT */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              ], 10, _hoisted_2$6)) : vue.createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          _ctx.horizontal ? (vue.openBlock(), vue.createBlock(_component_b_field_body, {
            key: 2,
            message: _ctx.newMessage ? _ctx.formattedMessage : "",
            type: _ctx.newType
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["message", "type"])) : _ctx.hasInnerField ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$5, [
            vue.createVNode(_component_b_field, {
              addons: false,
              type: _ctx.type,
              class: vue.normalizeClass(_ctx.innerFieldClasses)
            }, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["type", "class"])
          ])) : vue.renderSlot(_ctx.$slots, "default", { key: 4 }),
          _ctx.hasMessage && !_ctx.horizontal ? (vue.openBlock(), vue.createElementBlock(
            "p",
            {
              key: 5,
              class: vue.normalizeClass(["help", _ctx.newType])
            },
            [
              _ctx.$slots.message ? vue.renderSlot(_ctx.$slots, "message", {
                key: 0,
                messages: _ctx.formattedMessage
              }) : (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                vue.renderList(_ctx.formattedMessage, (mess, i) => {
                  return vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    [
                      vue.createTextVNode(
                        vue.toDisplayString(mess) + " ",
                        1
                        /* TEXT */
                      ),
                      i + 1 < _ctx.formattedMessage.length ? (vue.openBlock(), vue.createElementBlock("br", { key: i })) : vue.createCommentVNode("v-if", true)
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
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    }
    var BField = /* @__PURE__ */ _export_sfc(Field, [["render", _sfc_render$a]]);

    const FormElementMixin = vue.defineComponent({
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
      const faIconPrefix = "fa-";
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
      return icons;
    };

    var _sfc_main$9 = vue.defineComponent({
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

    function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        "span",
        {
          class: vue.normalizeClass(["icon", [_ctx.newType, _ctx.size]])
        },
        [
          !_ctx.useIconComponent ? (vue.openBlock(), vue.createElementBlock(
            "i",
            {
              key: 0,
              class: vue.normalizeClass([_ctx.newPack, _ctx.newIcon, _ctx.newCustomSize, _ctx.customClass])
            },
            null,
            2
            /* CLASS */
          )) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.useIconComponent), {
            key: 1,
            icon: [_ctx.newPack, _ctx.newIcon],
            size: _ctx.newCustomSize,
            class: vue.normalizeClass([_ctx.customClass])
          }, null, 8, ["icon", "size", "class"]))
        ],
        2
        /* CLASS */
      );
    }
    var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);

    const NATIVE_TYPES = [
      "button",
      "submit",
      "reset"
    ];
    var _sfc_main$8 = vue.defineComponent({
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

    const _hoisted_1$7 = { key: 1 };
    const _hoisted_2$5 = { key: 2 };
    function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.computedTag), vue.mergeProps({ class: "button" }, _ctx.$attrs, {
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
        default: vue.withCtx(() => [
          _ctx.iconLeft ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 0,
            pack: _ctx.iconPack,
            icon: _ctx.iconLeft,
            size: _ctx.iconSize
          }, null, 8, ["pack", "icon", "size"])) : vue.createCommentVNode("v-if", true),
          _ctx.label ? (vue.openBlock(), vue.createElementBlock(
            "span",
            _hoisted_1$7,
            vue.toDisplayString(_ctx.label),
            1
            /* TEXT */
          )) : _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$5, [
            vue.renderSlot(_ctx.$slots, "default")
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.iconRight ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 3,
            pack: _ctx.iconPack,
            icon: _ctx.iconRight,
            size: _ctx.iconSize
          }, null, 8, ["pack", "icon", "size"])) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["type", "class"]);
    }
    var BButton = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);

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
    const beforeMount = (el, { value = true }) => {
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
    const unmounted = (el) => {
      el.removeEventListener("keydown", onKeyDown);
    };
    const directive = {
      beforeMount,
      unmounted
    };

    const DEFAULT_CLOSE_OPTIONS = ["escape", "outside"];
    const DROPDOWN_INJECTION_KEY = Symbol("bdropdown");
    var _sfc_main$7 = vue.defineComponent({
      name: "BDropdown",
      directives: {
        trapFocus: directive
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

    const _hoisted_1$6 = ["tabindex"];
    const _hoisted_2$4 = ["aria-hidden"];
    const _hoisted_3$4 = ["aria-hidden"];
    const _hoisted_4$3 = ["role", "aria-modal"];
    function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_trap_focus = vue.resolveDirective("trap-focus");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(["dropdown dropdown-menu-animation", _ctx.rootClasses]),
          ref: "dropdown",
          onMouseleave: _cache[7] || (_cache[7] = ($event) => _ctx.isHoverable = false)
        },
        [
          !_ctx.inline ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            tabindex: _ctx.disabled ? void 0 : _ctx.triggerTabindex,
            ref: "trigger",
            class: "dropdown-trigger",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
            onContextmenu: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.onContextMenu && _ctx.onContextMenu(...args), ["prevent"])),
            onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.onHover && _ctx.onHover(...args)),
            onFocusCapture: _cache[3] || (_cache[3] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
            onTouchstart: _cache[4] || (_cache[4] = (...args) => _ctx.onTouchStart && _ctx.onTouchStart(...args)),
            onTouchmove: _cache[5] || (_cache[5] = (...args) => _ctx.onTouchMove && _ctx.onTouchMove(...args)),
            onTouchend: _cache[6] || (_cache[6] = (...args) => _ctx.onTouchEnd && _ctx.onTouchEnd(...args)),
            "aria-haspopup": "true"
          }, [
            vue.renderSlot(_ctx.$slots, "trigger", { active: _ctx.isActive })
          ], 40, _hoisted_1$6)) : vue.createCommentVNode("v-if", true),
          vue.createVNode(vue.Transition, { name: _ctx.animation }, {
            default: vue.withCtx(() => [
              _ctx.isMobileModal ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: "background",
                "aria-hidden": !_ctx.isActive
              }, null, 8, _hoisted_2$4)), [
                [vue.vShow, _ctx.isActive]
              ]) : vue.createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["name"]),
          vue.createVNode(vue.Transition, {
            name: _ctx.animation,
            persisted: ""
          }, {
            default: vue.withCtx(() => [
              vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                ref: "dropdownMenu",
                class: "dropdown-menu",
                style: vue.normalizeStyle(_ctx.style),
                "aria-hidden": !_ctx.isActive
              }, [
                vue.createElementVNode("div", {
                  class: "dropdown-content",
                  role: _ctx.ariaRole,
                  "aria-modal": !_ctx.inline,
                  style: vue.normalizeStyle(_ctx.contentStyle)
                }, [
                  vue.renderSlot(_ctx.$slots, "default")
                ], 12, _hoisted_4$3)
              ], 12, _hoisted_3$4)), [
                [vue.vShow, !_ctx.disabled && (_ctx.isActive || _ctx.isHoverable) || _ctx.inline],
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
    var BDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);

    var _sfc_main$6 = vue.defineComponent({
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

    const _hoisted_1$5 = {
      key: 0,
      class: "dropdown-divider"
    };
    const _hoisted_2$3 = ["role", "tabindex"];
    const _hoisted_3$3 = ["role", "tabindex"];
    function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
      return _ctx.separator ? (vue.openBlock(), vue.createElementBlock("hr", _hoisted_1$5)) : !_ctx.custom && !_ctx.hasLink ? (vue.openBlock(), vue.createElementBlock("a", {
        key: 1,
        class: vue.normalizeClass(["dropdown-item", _ctx.anchorClasses]),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.selectItem && _ctx.selectItem(...args)),
        role: _ctx.ariaRoleItem,
        tabindex: _ctx.isFocusable ? 0 : void 0
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_2$3)) : (vue.openBlock(), vue.createElementBlock("div", {
        key: 2,
        class: vue.normalizeClass(_ctx.itemClasses),
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.selectItem && _ctx.selectItem(...args)),
        role: _ctx.ariaRoleItem,
        tabindex: _ctx.isFocusable ? 0 : void 0
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_3$3));
    }
    var BDropdownItem = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);

    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
    var CompatFallthroughMixin = vue.defineComponent({
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
            const _a = this.$attrs, { style: _1, class: _2, id: _3 } = _a, rest = __objRest(_a, ["style", "class", "id"]);
            return rest;
          } else {
            return this.$attrs;
          }
        }
      }
    });

    var _sfc_main$5 = vue.defineComponent({
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

    const _hoisted_1$4 = ["type", "autocomplete", "maxlength"];
    const _hoisted_2$2 = ["maxlength"];
    const _hoisted_3$2 = ["type", "autocomplete", "maxlength"];
    const _hoisted_4$2 = ["maxlength"];
    function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_b_icon = vue.resolveComponent("b-icon");
      return vue.openBlock(), vue.createElementBlock(
        "div",
        vue.mergeProps({
          class: ["control", _ctx.rootClasses]
        }, _ctx.rootAttrs),
        [
          _ctx.lazy ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              _ctx.type !== "textarea" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
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
              }), null, 16, _hoisted_1$4)), [
                [
                  vue.vModelDynamic,
                  _ctx.computedValue,
                  void 0,
                  { lazy: true }
                ]
              ]) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", vue.mergeProps({
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
              }), null, 16, _hoisted_2$2)), [
                [
                  vue.vModelText,
                  _ctx.computedValue,
                  void 0,
                  { lazy: true }
                ]
              ])
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              _ctx.type !== "textarea" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
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
              }), null, 16, _hoisted_3$2)), [
                [vue.vModelDynamic, _ctx.computedValue]
              ]) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", vue.mergeProps({
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
              }), null, 16, _hoisted_4$2)), [
                [vue.vModelText, _ctx.computedValue]
              ])
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 2,
            class: vue.normalizeClass(["is-left", { "is-clickable": _ctx.iconClickable }]),
            icon: _ctx.icon,
            pack: _ctx.iconPack,
            size: _ctx.iconSize,
            onClick: _cache[20] || (_cache[20] = ($event) => _ctx.iconClick("icon-click", $event))
          }, null, 8, ["class", "icon", "pack", "size"])) : vue.createCommentVNode("v-if", true),
          !_ctx.loading && _ctx.hasIconRight && _ctx.rightIcon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
            key: 3,
            class: vue.normalizeClass(["is-right", { "is-clickable": _ctx.passwordReveal || _ctx.iconRightClickable }]),
            icon: _ctx.rightIcon,
            pack: _ctx.iconPack,
            size: _ctx.iconSize,
            type: _ctx.rightIconType,
            both: "",
            onClick: _ctx.rightIconClick
          }, null, 8, ["class", "icon", "pack", "size", "type", "onClick"])) : vue.createCommentVNode("v-if", true),
          _ctx.maxlength && _ctx.hasCounter && _ctx.type !== "number" ? (vue.openBlock(), vue.createElementBlock(
            "small",
            {
              key: 4,
              class: vue.normalizeClass(["help counter", { "is-invisible": !_ctx.isFocused }])
            },
            vue.toDisplayString(_ctx.valueLength) + " / " + vue.toDisplayString(_ctx.maxlength),
            3
            /* TEXT, CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        16
        /* FULL_PROPS */
      );
    }
    var BInput = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);

    const cos30 = 0.86602540378;
    const sin30 = 0.5;
    let id = 0;
    var _sfc_main$4 = vue.defineComponent({
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
    function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
    var BColorpickerHSLRepresentationTriangle = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);

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
    var _sfc_main$3 = vue.defineComponent({
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
    function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
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
    var BColorpickerHSLRepresentationSquare = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);

    const TOOLTIP_POSITIONS = ["is-auto", "is-top", "is-bottom", "is-left", "is-right"];
    var _sfc_main$2 = vue.defineComponent({
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

    function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          ref: "tooltip",
          class: vue.normalizeClass(_ctx.rootClasses)
        },
        [
          vue.createVNode(vue.Transition, {
            name: _ctx.newAnimation,
            persisted: ""
          }, {
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createElementVNode(
                "div",
                {
                  ref: "content",
                  class: vue.normalizeClass(["tooltip-content", _ctx.contentClass])
                },
                [
                  _ctx.label ? (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    [
                      vue.createTextVNode(
                        vue.toDisplayString(_ctx.label),
                        1
                        /* TEXT */
                      )
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : _ctx.$slots.content ? vue.renderSlot(_ctx.$slots, "content", { key: 1 }) : vue.createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              ), [
                [vue.vShow, _ctx.active && (_ctx.isActive || _ctx.always)]
              ])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["name"]),
          vue.createElementVNode(
            "div",
            {
              ref: "trigger",
              class: "tooltip-trigger",
              style: vue.normalizeStyle(_ctx.triggerStyle),
              onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
              onContextmenu: _cache[1] || (_cache[1] = (...args) => _ctx.onContextMenu && _ctx.onContextMenu(...args)),
              onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.onHover && _ctx.onHover(...args)),
              onFocusCapture: _cache[3] || (_cache[3] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
              onBlurCapture: _cache[4] || (_cache[4] = (...args) => _ctx.close && _ctx.close(...args)),
              onMouseleave: _cache[5] || (_cache[5] = (...args) => _ctx.close && _ctx.close(...args))
            },
            [
              vue.renderSlot(_ctx.$slots, "default", { ref: "slot" })
            ],
            36
            /* STYLE, NEED_HYDRATION */
          )
        ],
        2
        /* CLASS */
      );
    }
    var BTooltip = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);

    var _sfc_main$1 = vue.defineComponent({
      name: "BColorpickerAlphaSlider",
      components: {
        BTooltip
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
    var BColorpickerAlphaSlider = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

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
        BInput,
        BField,
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
            {
              return defaultColorFormatter(color);
            }
          }
        },
        colorParser: {
          type: Function,
          default: (color, vm) => {
            {
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
    var Colorpicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

    const registerComponent = (Vue, component, name) => {
      const componentName = component.name;
      if (componentName == null) {
        throw new Error("Buefy.registerComponent: missing component name");
      }
      Vue.component(componentName, component);
    };

    const Plugin = {
      install(Vue) {
        registerComponent(Vue, Colorpicker);
      }
    };

    exports.BColorpicker = Colorpicker;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
