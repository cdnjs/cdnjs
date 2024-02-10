'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8b2e54ad.js');
var FormElementMixin = require('./FormElementMixin-193a88b8.js');
var helpers = require('./helpers.js');
var config = require('./config-8cfb5a4a.js');
var DropdownItem = require('./DropdownItem-422f8c34.js');
var Input = require('./Input-e5a72d97.js');
var Field = require('./Field-4557b10c.js');
var Select = require('./Select-2b3879bc.js');
var Icon = require('./Icon-78961800.js');
var plugins = require('./plugins-7f41b028.js');
var Tooltip = require('./Tooltip-c1df7ee3.js');

var colorChannels = ['red', 'green', 'blue', 'alpha'];
var colorsNammed = {
  transparent: '#00000000',
  black: '#000000',
  silver: '#c0c0c0',
  gray: '#808080',
  white: '#ffffff',
  maroon: '#800000',
  red: '#ff0000',
  purple: '#800080',
  fuchsia: '#ff00ff',
  green: '#008000',
  lime: '#00ff00',
  olive: '#808000',
  yellow: '#ffff00',
  navy: '#000080',
  blue: '#0000ff',
  teal: '#008080',
  aqua: '#00ffff',
  orange: '#ffa500',
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  blanchedalmond: '#ffebcd',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  oldlace: '#fdf5e6',
  olivedrab: '#6b8e23',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  whitesmoke: '#f5f5f5',
  yellowgreen: '#9acd32',
  rebeccapurple: '#663399'
};
var ColorTypeError = /*#__PURE__*/function (_Error) {
  _rollupPluginBabelHelpers._inherits(ColorTypeError, _Error);
  var _super = _rollupPluginBabelHelpers._createSuper(ColorTypeError);
  function ColorTypeError() {
    _rollupPluginBabelHelpers._classCallCheck(this, ColorTypeError);
    return _super.call(this, 'ColorTypeError: type must be hex(a), rgb(a) or hsl(a)');
  }
  return _rollupPluginBabelHelpers._createClass(ColorTypeError);
}( /*#__PURE__*/_rollupPluginBabelHelpers._wrapNativeSuper(Error));
var Color = /*#__PURE__*/function (_Symbol$toString) {
  function Color() {
    var _this = this;
    _rollupPluginBabelHelpers._classCallCheck(this, Color);
    if (arguments.length > 0) {
      return Color.parse.apply(Color, arguments);
    }
    this.$channels = new Uint8Array(colorChannels.length);
    colorChannels.forEach(function (channel, index) {
      Object.defineProperty(_this, channel, {
        get: function get() {
          return _this.$channels[index];
        },
        set: function set(byte) {
          if (!Number.isNaN(byte / 1)) {
            _this.$channels[index] = Math.min(255, Math.max(0, byte));
          }
        },
        enumerable: true,
        configurable: true
      });
    })
    // Required for observability
    ;
    ['hue', 'saturation', 'lightness'].forEach(function (name) {
      var capitalizedName = name.replace(/^./, function (m) {
        return m.toUpperCase();
      });
      Object.defineProperty(_this, name, {
        get: function get() {
          return _this["get".concat(capitalizedName)]();
        },
        set: function set(value) {
          if (!Number.isNaN(value / 1)) {
            _this["set".concat(capitalizedName)](value);
          }
        },
        enumerable: true,
        configurable: true
      });
    });
  }
  _rollupPluginBabelHelpers._createClass(Color, [{
    key: "getHue",
    value: function getHue() {
      var _Array$from$map = Array.from(this.$channels).map(function (c) {
          return c / 255;
        }),
        _Array$from$map2 = _rollupPluginBabelHelpers._slicedToArray(_Array$from$map, 3),
        red = _Array$from$map2[0],
        green = _Array$from$map2[1],
        blue = _Array$from$map2[2];
      var _ref = [Math.min(red, green, blue), Math.max(red, green, blue)],
        min = _ref[0],
        max = _ref[1];
      var delta = max - min;
      var hue = 0;
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
  }, {
    key: "setHue",
    value: function setHue(value) {
      var color = Color.fromHSL(value, this.saturation, this.lightness, this.alpha / 255);
      for (var i = 0; i < this.$channels.length; i++) {
        this.$channels[i] = Number(color.$channels[i]);
      }
    }
  }, {
    key: "getSaturation",
    value: function getSaturation() {
      var _Array$from$map3 = Array.from(this.$channels).map(function (c) {
          return c / 255;
        }),
        _Array$from$map4 = _rollupPluginBabelHelpers._slicedToArray(_Array$from$map3, 3),
        red = _Array$from$map4[0],
        green = _Array$from$map4[1],
        blue = _Array$from$map4[2];
      var _ref2 = [Math.min(red, green, blue), Math.max(red, green, blue)],
        min = _ref2[0],
        max = _ref2[1];
      var delta = max - min;
      return delta !== 0 ? Math.round(delta / (1 - Math.abs(2 * this.lightness - 1)) * 100) / 100 : 0;
    }
  }, {
    key: "setSaturation",
    value: function setSaturation(value) {
      var _this2 = this;
      var color = Color.fromHSL(this.hue, value, this.lightness, this.alpha / 255);
      colorChannels.forEach(function (_, i) {
        return _this2.$channels[i] = color.$channels[i];
      });
    }
  }, {
    key: "getLightness",
    value: function getLightness() {
      var _Array$from$map5 = Array.from(this.$channels).map(function (c) {
          return c / 255;
        }),
        _Array$from$map6 = _rollupPluginBabelHelpers._slicedToArray(_Array$from$map5, 3),
        red = _Array$from$map6[0],
        green = _Array$from$map6[1],
        blue = _Array$from$map6[2];
      var _ref3 = [Math.min(red, green, blue), Math.max(red, green, blue)],
        min = _ref3[0],
        max = _ref3[1];
      return Math.round((max + min) / 2 * 100) / 100;
    }
  }, {
    key: "setLightness",
    value: function setLightness(value) {
      var _this3 = this;
      var color = Color.fromHSL(this.hue, this.lightness, value, this.alpha / 255);
      colorChannels.forEach(function (_, i) {
        return _this3.$channels[i] = color.$channels[i];
      });
    }
  }, {
    key: "clone",
    value: function clone() {
      var _this4 = this;
      var color = new Color();
      colorChannels.forEach(function (_, i) {
        return color.$channels[i] = _this4.$channels[i];
      });
      return color;
    }
  }, {
    key: "toString",
    value: function toString() {
      var _this5 = this;
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hex';
      switch (String(type).toLowerCase()) {
        case 'hex':
          return '#' + colorChannels.slice(0, 3).map(function (channel) {
            return _this5[channel].toString(16).padStart(2, '0');
          }).join('');
        case 'hexa':
          return '#' + colorChannels.map(function (channel) {
            return _this5[channel].toString(16).padStart(2, '0');
          }).join('');
        case 'rgb':
          return "rgb(".concat(this.red, ", ").concat(this.green, ", ").concat(this.blue, ")");
        case 'rgba':
          return "rgba(".concat(this.red, ", ").concat(this.green, ", ").concat(this.blue, ", ").concat(Math.round(this.alpha / 2.55) / 100, ")");
        case 'hsl':
          return "hsl(".concat(Math.round(this.hue), "deg, ").concat(Math.round(this.saturation * 100), "%, ").concat(Math.round(this.lightness * 100), "%)");
        case 'hsla':
          return "hsla(".concat(Math.round(this.hue), "deg, ").concat(Math.round(this.saturation * 100), "%, ").concat(Math.round(this.lightness * 100), "%, ").concat(Math.round(this.alpha / 2.55) / 100, ")");
        default:
          throw new ColorTypeError();
      }
    }
  }, {
    key: _Symbol$toString,
    get: function get() {
      return this.toString('hex');
    }
  }], [{
    key: "parse",
    value: function parse() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (_rollupPluginBabelHelpers._typeof(args[0]) === 'object') {
        return Color.parseObject(args[0]);
      } else if (args.every(function (arg) {
        return !Number.isNaN(arg / 1);
      })) {
        var color = new Color();
        if (args.length > 3) {
          color.red = args[0];
          color.green = args[1];
          color.blue = args[2];
          if (args[3]) {
            color.alpha = args[3];
          }
        } else if (args.length === 1) {
          var index = Number(args[0]);
          return Color.parseIndex(index, index > Math.pow(2, 24) ? 3 : 4);
        }
      } else if (typeof args[0] === 'string') {
        var match = null;
        if (typeof colorsNammed[args[0].toLowerCase()] === 'string') {
          return Color.parseHex(colorsNammed[args[0].toLowerCase()]);
        } else if ((match = args[0].match(/^(#|&h|0x)?(([a-f0-9]{3,4}){1,2})$/i)) !== null) {
          return Color.parseHex(match[2]);
        } else if ((match = args[0].match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(\s*,\s*(\d*\.?\d+))?\s*\)$/i)) !== null) {
          var channels = [match[1], match[2], match[3], typeof match[5] !== 'undefined' ? match[5] : 1];
          return Color.fromRGB.apply(Color, _rollupPluginBabelHelpers._toConsumableArray(channels.map(function (value) {
            return Number(value);
          })));
        } else if (args[0].match(/^(h(sl|wb)a?|lab|color|cmyk)\(/i)) {
          throw new Error('Color expression not implemented yet');
        }
      }
      throw new Error('Invalid color expression');
    }
  }, {
    key: "parseObject",
    value: function parseObject(object) {
      var color = new Color();
      if (object === null || _rollupPluginBabelHelpers._typeof(object) !== 'object') {
        return color;
      }
      if (Color.isColor(object)) {
        return object.clone();
      }
      colorChannels.forEach(function (channel) {
        if (!Number.isNaN(object[channel])) {
          color[channel] = object[channel];
        }
      });
      return color;
    }
  }, {
    key: "parseHex",
    value: function parseHex(hex) {
      if (typeof hex !== 'string') {
        throw new Error('Hex expression must be a string');
      }
      hex = hex.trim().replace(/^(0x|&h|#)/i, '');
      if (hex.length === 3 || hex.length === 4) {
        hex = hex.split('').map(function (c) {
          return c.repeat(2);
        }).join('');
      }
      if (!(hex.length === 6 || hex.length === 8)) {
        throw new Error('Incorrect Hex expression length');
      }
      var chans = hex.split(/(..)/).filter(function (value) {
        return value;
      }).map(function (value) {
        return Number.parseInt(value, 16);
      });
      if (typeof chans[3] === 'number') {
        chans[3] /= 255;
      }
      return Color.fromRGB.apply(Color, _rollupPluginBabelHelpers._toConsumableArray(chans));
    }
  }, {
    key: "parseIndex",
    value: function parseIndex(value) {
      var channels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
      var color = new Color();
      for (var i = 0; i < 4; i++) {
        color[colorChannels[i]] = value >> (channels - i) * 8 && 0xff;
      }
      return color;
    }
  }, {
    key: "fromRGB",
    value: function fromRGB(red, green, blue) {
      var alpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      if ([red, green, blue, alpha].some(function (arg) {
        return Number.isNaN(arg / 1);
      })) {
        throw new Error('Invalid arguments');
      }
      alpha *= 255;
      var color = new Color();
      [red, green, blue, alpha].forEach(function (value, index) {
        color[colorChannels[index]] = value;
      });
      return color;
    }
  }, {
    key: "fromHSL",
    value: function fromHSL(hue, saturation, lightness) {
      var alpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      if ([hue, saturation, lightness, alpha].some(function (arg) {
        return Number.isNaN(arg);
      })) {
        throw new Error('Invalid arguments');
      }
      while (hue < 0 && hue !== -Infinity) hue += 360;
      hue = hue % 360;
      saturation = Math.max(0, Math.min(1, saturation));
      lightness = Math.max(0, Math.min(1, lightness));
      alpha = Math.max(0, Math.min(1, alpha));
      var c = (1 - Math.abs(2 * lightness - 1)) * saturation;
      var x = c * (1 - Math.abs(hue / 60 % 2 - 1));
      var m = lightness - c / 2;
      var _ref4 = hue < 60 ? [c, x, 0] : hue < 120 ? [x, c, 0] : hue < 180 ? [0, c, x] : hue < 240 ? [0, x, c] : hue < 300 ? [x, 0, c] : [c, 0, x],
        _ref5 = _rollupPluginBabelHelpers._slicedToArray(_ref4, 3),
        r = _ref5[0],
        g = _ref5[1],
        b = _ref5[2];
      return Color.fromRGB((r + m) * 255, (g + m) * 255, (b + m) * 255, alpha);
    }
  }, {
    key: "isColor",
    value: function isColor(arg) {
      return arg instanceof Color;
    }
  }]);
  return Color;
}(Symbol.toString);
var Color$1 = Color;

//
var cos30 = 0.86602540378;
var sin30 = 0.5;
var id = 0;
var script$3 = {
  name: 'BColorpickerHSLRepresentationTriangle',
  props: {
    value: {
      type: Object,
      required: true,
      validator: function validator(value) {
        return typeof value.hue === 'number' && typeof value.saturation === 'number' && typeof value.lightness === 'number';
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
  data: function data() {
    return {
      id: id++,
      hue: this.value.hue,
      saturation: this.value.saturation,
      lightness: this.value.lightness,
      captureMouse: false,
      captureType: 'hue',
      clientOffset: {
        cx: -1,
        cy: -1,
        width: 0,
        height: 0
      },
      cos30: cos30,
      sin30: sin30,
      debounce: 0
    };
  },
  computed: {
    viewBox: function viewBox() {
      var size = this.size;
      return "0 0 ".concat(size, " ").concat(size);
    },
    internalRadius: function internalRadius() {
      return this.size / 2 - this.thickness;
    },
    haloPath: function haloPath() {
      var size = this.size,
        thickness = this.thickness;
      var radius = size / 2 - 2; // 2px padding
      var thicknessRadius = radius - thickness;
      var center = size / 2;
      return "M".concat(center - radius, " ").concat(center, "a").concat(radius, "  ").concat(radius, "  0 1 1 ").concat(2 * radius, " 0") + "h".concat(-thickness) + "a".concat(-thicknessRadius, "  ").concat(thicknessRadius, "  0 1 0 ").concat(-2 * thicknessRadius, " 0") + "a".concat(thicknessRadius, "  ").concat(thicknessRadius, "  0 1 0 ").concat(2 * thicknessRadius, " 0") + "h".concat(thickness) + "a".concat(radius, "  ").concat(radius, "  0 1 1 ").concat(-2 * radius, " 0z");
    },
    trianglePath: function trianglePath() {
      var size = this.size,
        thickness = this.thickness;
      var radius = size - 4;
      var thicknessRadius = (radius - 2 * thickness) / 2;
      return "M0 ".concat(-thicknessRadius) + "L".concat(cos30 * thicknessRadius, " ").concat(sin30 * thicknessRadius) + "H".concat(-cos30 * thicknessRadius, "z");
    }
  },
  watch: {
    captureMouse: function captureMouse(newValue, oldValue) {
      if (oldValue === false && newValue !== false) {
        var rect = this.$el.getBoundingClientRect();
        // Caching offset
        this.clientOffset.cx = rect.x + rect.width / 2;
        this.clientOffset.cy = rect.y + rect.height / 2;
        this.clientOffset.width = rect.width;
        this.clientOffset.height = rect.height;
      }
    },
    value: {
      deep: true,
      handler: function handler(newColor) {
        var _this = this;
        var hue = newColor.hue,
          saturation = newColor.saturation,
          lightness = newColor.lightness;
        window.clearTimeout(this.debounce);
        this.debounce = window.setTimeout(function () {
          if (lightness >= 0.03 && lightness <= 0.97 && saturation > 0) {
            _this.hue = hue;
          }
          _this.saturation = saturation;
          _this.lightness = lightness;
        }, 200);
      }
    }
  },
  methods: {
    increaseHue: function increaseHue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.hue = (this.hue + value) % 360;
    },
    decreaseHue: function decreaseHue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.hue = (360 + this.hue - value) % 360;
    },
    increaseSaturation: function increaseSaturation() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      this.saturation = Math.min(1, Math.max(0, this.saturation + value));
      this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness));
    },
    decreaseSaturation: function decreaseSaturation() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      this.saturation = Math.min(1, Math.max(0, this.saturation - value));
      this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness));
    },
    increaseLightness: function increaseLightness() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness + value));
    },
    decreaseLightness: function decreaseLightness() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness - value));
    },
    hueKeyPress: function hueKeyPress(event) {
      var handled = false;
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          this.increaseHue();
          handled = true;
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          this.decreaseHue();
          handled = true;
          break;
        case 'Home':
          this.increaseHue(360 - this.hue);
          handled = true;
          break;
        case 'End':
          this.decreaseHue(this.hue);
          handled = true;
          break;
        case 'PageUp':
          this.increaseHue(60 - this.hue % 60);
          handled = true;
          break;
        case 'PageDown':
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
    slKeyPress: function slKeyPress(event) {
      var handled = false;
      switch (event.key) {
        case 'ArrowRight':
          this.decreaseLightness();
          handled = true;
          break;
        case 'ArrowUp':
          this.increaseSaturation();
          handled = true;
          break;
        case 'ArrowLeft':
          this.increaseLightness();
          handled = true;
          break;
        case 'ArrowDown':
          this.decreaseSaturation();
          handled = true;
          break;
        case 'Home':
          this.increaseLightness(1 - this.lightness);
          handled = true;
          break;
        case 'End':
          this.decreaseLightness(this.lightness);
          handled = true;
          break;
        case 'PageUp':
          this.increaseSaturation(1 - this.saturation);
          handled = true;
          break;
        case 'PageDown':
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
    clickHue: function clickHue(event) {
      this.startMouseCapture(event);
      this.trackMouse(event);
      this.stopMouseCapture(event);
      this.$refs.hueCursor.focus();
    },
    clickSL: function clickSL(event) {
      this.startMouseCapture(event);
      this.trackMouse(event);
      this.stopMouseCapture(event);
      this.$refs.slCursor.focus();
    },
    trackMouse: function trackMouse(event) {
      if (this.captureMouse === false) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      var mouseX = 0,
        mouseY = 0;
      if (typeof event.touches !== 'undefined' && event.touches.length) {
        var _ref = [event.touches[0].clientX, event.touches[0].clientY];
        mouseX = _ref[0];
        mouseY = _ref[1];
      } else {
        var _ref2 = [event.clientX, event.clientY];
        mouseX = _ref2[0];
        mouseY = _ref2[1];
      }
      var angle = Math.atan2(mouseY - this.clientOffset.cy, mouseX - this.clientOffset.cx);
      if (this.captureType === 'sl') {
        var d = Math.sqrt(Math.pow(mouseX - this.clientOffset.cx, 2) + Math.pow(mouseY - this.clientOffset.cy, 2));
        var ratio = this.size / this.clientOffset.width;
        var dx = d * Math.cos(angle - this.hue / 180 * Math.PI) * ratio;
        var dy = d * Math.sin(angle - this.hue / 180 * Math.PI) * ratio;
        var radius = this.internalRadius;
        var saturation = 1 - (Math.min(radius * sin30, Math.max(-radius, dy)) + radius) / (radius + radius * sin30);
        var lightness = (Math.min(radius * cos30 * (1 - saturation), Math.max(-radius * cos30 * (1 - saturation), dx)) + radius * cos30) / (radius * 2 * cos30);
        this.saturation = Math.round(saturation * 1000) / 1000;
        this.lightness = 1 - Math.round(lightness * 1000) / 1000;
      } else {
        this.hue = Math.round(angle / Math.PI * 180 + 90) % 360;
      }
      this.emitColor();
    },
    startMouseCapture: function startMouseCapture(event) {
      event.stopPropagation();
      this.captureMouse = true;
      if (event.target.closest('.colorpicker-triangle-slider-sl') !== null) {
        this.captureType = 'sl';
      } else {
        this.captureType = 'hue';
      }
    },
    stopMouseCapture: function stopMouseCapture(event) {
      if (this.captureMouse !== false) {
        event.preventDefault();
        event.stopPropagation();
        this.$refs[this.captureType === 'sl' ? 'slCursor' : 'hueCursor'].focus();
      }
      this.captureMouse = false;
    },
    emitColor: function emitColor() {
      var hue = this.hue,
        saturation = this.saturation,
        lightness = this.lightness;
      this.$emit('input', Color$1.fromHSL(hue, saturation, lightness));
      window.clearTimeout(this.debounce);
    }
  },
  mounted: function mounted() {
    window.addEventListener('mousemove', this.trackMouse);
    window.addEventListener('touchmove', this.trackMouse, {
      passive: false
    });
    window.addEventListener('mouseup', this.stopMouseCapture);
    window.addEventListener('touchend', this.stopMouseCapture);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('mousemove', this.trackMouse);
    window.removeEventListener('touchmove', this.trackMouse);
    window.removeEventListener('mouseup', this.stopMouseCapture);
    window.removeEventListener('touchend', this.stopMouseCapture);
    clearTimeout(this.debounce);
  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"b-colorpicker-triangle",attrs:{"viewBox":_vm.viewBox}},[_c('defs',[_c('linearGradient',{attrs:{"id":("cp-triangle-gradient-ligthness-" + _vm.id),"x1":"0","y1":"0","x2":"1","y2":"0"}},[_c('stop',{attrs:{"offset":"0%","stop-color":"#fff"}}),_c('stop',{attrs:{"offset":"100%","stop-color":"#000"}})],1),_c('linearGradient',{attrs:{"id":("cp-triangle-gradient-saturation-" + _vm.id),"x1":"0","y1":"0","x2":"0","y2":"1"}},[_c('stop',{attrs:{"offset":"0%","stop-color":("hsl(" + _vm.hue + "deg, 100%, 50%)"),"stop-opacity":"1"}}),_c('stop',{attrs:{"offset":"100%","stop-color":("hsl(" + _vm.hue + "deg, 100%, 50%)"),"stop-opacity":"0"}})],1),_c('clipPath',{attrs:{"id":("cp-triangle-clip-" + _vm.id)}},[_c('path',{attrs:{"d":_vm.haloPath}})])],1),_c('g',{staticClass:"colorpicker-triangle-slider-hue"},[_c('foreignObject',{attrs:{"x":0,"y":0,"width":_vm.size,"height":_vm.size,"clip-path":("url(#cp-triangle-clip-" + _vm.id + ")")}},[_c('div',{staticClass:"colorpicker-triangle-hue",on:{"click":_vm.clickHue,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}})]),_c('g',{style:(("transform: rotate(" + _vm.hue + "deg)"))},[_c('foreignObject',{attrs:{"x":_vm.size / 2 - 4,"y":0,"width":"8","height":_vm.thickness + 4}},[_c('div',{ref:"hueCursor",staticClass:"hue-range-thumb",style:(("background-color: hsl(" + _vm.hue + "deg, 100%, 50%)")),attrs:{"role":"slider","tabindex":"0","aria-label":"Hue","aria-valuemin":"0","aria-valuenow":_vm.hue,"aria-valuemax":"360"},on:{"click":_vm.clickHue,"keydown":_vm.hueKeyPress,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}})])],1)],1),_c('g',{staticClass:"colorpicker-triangle-slider-sl",style:(("transform: rotate(" + _vm.hue + "deg) translate(50%, 50%)")),attrs:{"role":"graphics-datagroup","aria-datascales":"lightness, saturation"}},[_c('path',{attrs:{"d":_vm.trianglePath,"fill":("url(#cp-triangle-gradient-ligthness-" + _vm.id + ")")}}),_c('path',{staticStyle:{"mix-blend-mode":"overlay"},attrs:{"d":_vm.trianglePath,"fill":("url(#cp-triangle-gradient-saturation-" + _vm.id + ")")},on:{"click":_vm.clickSL,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}}),_c('foreignObject',{attrs:{"x":((_vm.internalRadius - 3) * _vm.cos30) * (-_vm.lightness + 0.5) * 2 - 6,"y":-_vm.internalRadius + (1 - _vm.saturation) * (_vm.internalRadius - 3) * 1.5 - 3,"width":"12","height":"12"}},[_c('div',{ref:"slCursor",staticClass:"sl-range-thumb",style:({
                    backgroundColor: ("hsl(" + _vm.hue + "deg, " + (_vm.saturation * 100) + "%, " + (_vm.lightness * 100) + "%)")
                }),attrs:{"tabindex":"0","aria-datavalues":((_vm.saturation * 100) + "%, " + (_vm.lightness * 100) + "%")},on:{"click":_vm.clickSL,"keydown":_vm.slKeyPress,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}})])],1)])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/plugins.normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

  var ColorpickerHSLRepresentationTriangle = __vue_component__$3;

var _templateObject, _templateObject2, _templateObject3;
var precision = function precision(strs) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  var tmp = [];
  strs.forEach(function (str, i) {
    tmp.push(str);
    if (values[i]) {
      tmp.push(Number.isNaN(values[i] / 1) ? values[i] : Math.round(values * 10) / 10);
    }
  });
  return tmp.join('');
};
var script$2 = {
  name: 'BColorpickerHSLRepresentationSquare',
  props: {
    value: {
      type: Object,
      required: true,
      validator: function validator(value) {
        return typeof value.hue === 'number' && typeof value.saturation === 'number' && typeof value.lightness === 'number';
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
  data: function data() {
    return {
      hue: this.value.hue,
      saturation: this.value.saturation,
      lightness: this.value.lightness,
      captureMouse: false,
      captureType: 'hue',
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
    hueThumbStyle: function hueThumbStyle() {
      var hue = this.hue,
        size = this.size,
        thickness = this.thickness;
      var side = size - thickness;
      var offset = size / 2;
      var angle = (hue + 720 + 90) % 360 / 180 * Math.PI;
      var ciq = 1 / Math.cos(Math.PI / 4);
      var _x$y = {
          x: -Math.min(1, Math.max(-1, ciq * Math.cos(angle))) / 2 * side + offset,
          y: -Math.min(1, Math.max(-1, ciq * Math.sin(angle))) / 2 * side + offset
        },
        x = _x$y.x,
        y = _x$y.y;
      return {
        background: "hsl(".concat(hue, "deg, 100%, 50%)"),
        left: precision(_templateObject || (_templateObject = _rollupPluginBabelHelpers._taggedTemplateLiteral(["", "px"])), x),
        top: precision(_templateObject2 || (_templateObject2 = _rollupPluginBabelHelpers._taggedTemplateLiteral(["", "px"])), y),
        width: precision(_templateObject3 || (_templateObject3 = _rollupPluginBabelHelpers._taggedTemplateLiteral(["", "px"])), thickness - 2)
      };
    },
    slThumbStyle: function slThumbStyle() {
      var hue = this.hue,
        saturation = this.saturation,
        lightness = this.lightness;
      saturation = Math.max(0, Math.min(1, saturation));
      lightness = Math.max(0, Math.min(1, lightness));
      return {
        background: "hsl(".concat(hue, "deg, ").concat(saturation * 100, "%, ").concat(lightness * 100, "%)"),
        left: "".concat(saturation * 100, "%"),
        top: "".concat((1 - lightness) * 100, "%")
      };
    },
    SLBackground: function SLBackground() {
      var hue = this.hue;
      return "linear-gradient(90deg, hsl(".concat(hue, "deg, 0%, 50%), hsl(").concat(hue, "deg, 100%, 50%))");
    }
  },
  watch: {
    captureMouse: function captureMouse(newValue, oldValue) {
      if (oldValue === false && newValue !== false) {
        var rect = this.$el.getBoundingClientRect();
        // Caching offset
        this.clientOffset.cx = rect.x + rect.width / 2;
        this.clientOffset.cy = rect.y + rect.height / 2;
        this.clientOffset.width = rect.width;
        this.clientOffset.height = rect.height;
      }
    },
    value: {
      deep: true,
      handler: function handler(newColor) {
        var _this = this;
        var hue = newColor.hue,
          saturation = newColor.saturation,
          lightness = newColor.lightness;
        window.clearTimeout(this.debounce);
        this.debounce = window.setTimeout(function () {
          _this.hue = hue;
          _this.saturation = saturation;
          _this.lightness = lightness;
        }, 200);
      }
    }
  },
  methods: {
    increaseHue: function increaseHue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.hue = (this.hue + value) % 360;
    },
    decreaseHue: function decreaseHue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.hue = (360 + this.hue - value) % 360;
    },
    increaseSaturation: function increaseSaturation() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      this.saturation = Math.min(1, Math.max(0, this.saturation + value));
      this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness));
    },
    decreaseSaturation: function decreaseSaturation() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      this.saturation = Math.min(1, Math.max(0, this.saturation - value));
      this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness));
    },
    increaseLightness: function increaseLightness() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness + value));
    },
    decreaseLightness: function decreaseLightness() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      this.lightness = Math.min(0.5 + (1 - this.saturation) * 0.5, Math.max(0.5 - (1 - this.saturation) * 0.5, this.lightness - value));
    },
    hueKeyPress: function hueKeyPress(event) {
      var handled = false;
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          this.increaseHue();
          handled = true;
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          this.decreaseHue();
          handled = true;
          break;
        case 'Home':
          this.increaseHue(360 - this.hue);
          handled = true;
          break;
        case 'End':
          this.decreaseHue(this.hue);
          handled = true;
          break;
        case 'PageUp':
          this.increaseHue(60 - this.hue % 60);
          handled = true;
          break;
        case 'PageDown':
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
    slKeyPress: function slKeyPress(event) {
      var handled = false;
      switch (event.key) {
        case 'ArrowRight':
          this.increaseSaturation();
          handled = true;
          break;
        case 'ArrowUp':
          this.increaseLightness();
          handled = true;
          break;
        case 'ArrowLeft':
          this.decreaseSaturation();
          handled = true;
          break;
        case 'ArrowDown':
          this.decreaseLightness();
          handled = true;
          break;
        case 'Home':
          this.increaseLightness(1 - this.lightness);
          handled = true;
          break;
        case 'End':
          this.decreaseLightness(this.lightness);
          handled = true;
          break;
        case 'PageUp':
          this.increaseSaturation(1 - this.saturation);
          handled = true;
          break;
        case 'PageDown':
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
    startMouseCapture: function startMouseCapture(event) {
      event.stopPropagation();
      this.captureMouse = true;
      if (event.target.closest('.colorpicker-square-slider-sl') !== null) {
        this.captureType = 'sl';
      } else {
        this.captureType = 'hue';
      }
    },
    stopMouseCapture: function stopMouseCapture(event) {
      if (this.captureMouse !== false) {
        event.preventDefault();
        event.stopPropagation();
        this.$refs[this.captureType === 'sl' ? 'slCursor' : 'hueCursor'].focus();
      }
      this.captureMouse = false;
    },
    clickHue: function clickHue(event) {
      this.startMouseCapture(event);
      this.trackMouse(event);
      this.stopMouseCapture(event);
      this.$refs.hueCursor.focus();
    },
    clickSL: function clickSL(event) {
      this.startMouseCapture(event);
      this.trackMouse(event);
      this.stopMouseCapture(event);
      this.$refs.slCursor.focus();
    },
    trackMouse: function trackMouse(event) {
      if (this.captureMouse === false) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      var mouseX = 0,
        mouseY = 0;
      if (typeof event.touches !== 'undefined' && event.touches.length) {
        var _ref = [event.touches[0].clientX, event.touches[0].clientY];
        mouseX = _ref[0];
        mouseY = _ref[1];
      } else {
        var _ref2 = [event.clientX, event.clientY];
        mouseX = _ref2[0];
        mouseY = _ref2[1];
      }
      var angle = Math.atan2(mouseY - this.clientOffset.cy, mouseX - this.clientOffset.cx);
      if (this.captureType === 'sl') {
        var saturation = (mouseX - this.clientOffset.cx) / (this.clientOffset.width - this.thickness * 2) + 0.5;
        var lightness = (mouseY - this.clientOffset.cy) / (this.clientOffset.height - this.thickness * 2) + 0.5;
        this.saturation = Math.round(Math.min(1, Math.max(0, saturation)) * 1000) / 1000;
        this.lightness = 1 - Math.round(Math.min(1, Math.max(0, lightness)) * 1000) / 1000;
      } else {
        this.hue = Math.round(angle / Math.PI * 180 + 90) % 360;
      }
      this.emitColor();
    },
    emitColor: function emitColor() {
      var hue = this.hue,
        saturation = this.saturation,
        lightness = this.lightness;
      this.$emit('input', Color$1.fromHSL(hue, saturation, lightness));
      window.clearTimeout(this.debounce);
    }
  },
  mounted: function mounted() {
    window.addEventListener('mousemove', this.trackMouse);
    window.addEventListener('touchmove', this.trackMouse, {
      passive: false
    });
    window.addEventListener('mouseup', this.stopMouseCapture);
    window.addEventListener('touchend', this.stopMouseCapture);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('mousemove', this.trackMouse);
    window.removeEventListener('touchmove', this.trackMouse);
    window.removeEventListener('mouseup', this.stopMouseCapture);
    window.removeEventListener('touchend', this.stopMouseCapture);
    clearTimeout(this.debounce);
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-colorpicker-square",style:({ width: (_vm.size + "px") })},[_c('div',{staticClass:"colorpicker-square-slider-hue",on:{"click":_vm.clickHue,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}},[_c('div',{ref:"hueCursor",staticClass:"hue-range-thumb",style:(_vm.hueThumbStyle),attrs:{"role":"slider","tabindex":"0","aria-label":"Hue","aria-valuemin":"0","aria-valuemax":"359"}})]),_c('div',{staticClass:"colorpicker-square-slider-sl",style:({
            background: _vm.SLBackground,
            margin: (_vm.thickness + "px")
        }),attrs:{"aria-datascales":"lightness, saturation"},on:{"click":_vm.clickSL,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}},[_c('div',{ref:"slCursor",staticClass:"sl-range-thumb",style:(_vm.slThumbStyle),attrs:{"role":"slider","tabindex":"0","aria-datavalues":((_vm.saturation * 100) + "%, " + (_vm.lightness * 100) + "%")},on:{"click":_vm.clickSL,"keydown":_vm.slKeyPress,"mousedown":function($event){$event.preventDefault();return _vm.startMouseCapture($event)},"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}})])])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/plugins.normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

  var ColorpickerHSLRepresentationSquare = __vue_component__$2;

var script$1 = {
  name: 'BColorpickerAlphaSlider',
  components: _rollupPluginBabelHelpers._defineProperty({}, Tooltip.Tooltip.name, Tooltip.Tooltip),
  props: {
    value: {
      type: Number,
      validator: function validator(value) {
        return value >= 0 && value < 256;
      }
    },
    color: [String, Object]
  },
  data: function data() {
    var color = Color$1.parse(this.color);
    color.alpha = 0;
    return {
      startColor: color.toString('hex'),
      endColor: color.toString('hexa'),
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
    style: function style() {
      return {
        backgroundImage: "linear-gradient(90deg, ".concat(this.startColor, " 0%, ").concat(this.endColor, " 100%),\n                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7),\n                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7)"),
        backgroundSize: '100% 100%, 1em 1em, 1em 1em',
        backgroundPosition: '0 0, .5em .5em, 0 0'
      };
    }
  },
  watch: {
    value: function value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.percent = Math.round((1 - newValue / 255) * 100);
      }
    },
    color: function color(newColor) {
      var color = Color$1.parse(newColor);
      color.alpha = 0;
      this.startColor = color.toString('hex');
      this.endColor = color.toString('hexa');
    },
    captureMouse: function captureMouse(newValue, oldValue) {
      if (oldValue === false && newValue !== false) {
        var rect = this.$el.getBoundingClientRect();
        // Caching offset
        this.clientOffset.cx = rect.x + rect.width / 2;
        this.clientOffset.cy = rect.y + rect.height / 2;
        this.clientOffset.width = rect.width;
        this.clientOffset.height = rect.height;
      }
    }
  },
  methods: {
    increaseAlpha: function increaseAlpha() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.percent = Math.max(0, Math.min(100, this.percent + value));
    },
    decreaseAlpha: function decreaseAlpha() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      this.increaseAlpha(-value);
    },
    alphaKeyPress: function alphaKeyPress(event) {
      var handled = false;
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          this.increaseAlpha();
          handled = true;
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          this.decreaseAlpha();
          handled = true;
          break;
        case 'Home':
          this.decreaseAlpha(this.percent);
          handled = true;
          break;
        case 'End':
          this.increaseAlpha(100 - this.percent);
          handled = true;
          break;
        case 'PageUp':
          this.increaseAlpha(10 - this.percent % 10);
          handled = true;
          break;
        case 'PageDown':
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
    clickAlpha: function clickAlpha(event) {
      this.startMouseCapture(event);
      this.trackMouse(event);
      this.stopMouseCapture(event);
      this.$refs.alphaCursor.focus();
    },
    startMouseCapture: function startMouseCapture(event) {
      event.stopPropagation();
      this.captureMouse = true;
    },
    trackMouse: function trackMouse(event) {
      if (this.captureMouse === false) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      var _ref = [0, 0],
        mouseX = _ref[0];
      if (typeof event.touches !== 'undefined' && event.touches.length) {
        var _ref2 = [event.touches[0].clientX];
        mouseX = _ref2[0];
      } else {
        var _ref3 = [event.clientX];
        mouseX = _ref3[0];
      }
      var ratio = 0.5 + (this.clientOffset.cx - mouseX) / this.clientOffset.width;
      this.percent = Math.round(100 - Math.max(0, Math.min(1, ratio)) * 100);
      this.emitAlpha();
    },
    stopMouseCapture: function stopMouseCapture(event) {
      if (this.captureMouse !== false) {
        event.preventDefault();
        event.stopPropagation();
        this.$refs.alphaCursor.focus();
      }
      this.captureMouse = false;
    },
    emitAlpha: function emitAlpha() {
      this.$emit('input', (1 - this.percent / 100) * 255);
    }
  },
  mounted: function mounted() {
    window.addEventListener('mousemove', this.trackMouse);
    window.addEventListener('touchmove', this.trackMouse, {
      passive: false
    });
    window.addEventListener('mouseup', this.stopMouseCapture);
    window.addEventListener('touchend', this.stopMouseCapture);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('mousemove', this.trackMouse);
    window.removeEventListener('touchmove', this.trackMouse);
    window.removeEventListener('mouseup', this.stopMouseCapture);
    window.removeEventListener('touchend', this.stopMouseCapture);
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-colorpicker-alpha-slider",style:(_vm.style),on:{"click":_vm.clickAlpha,"keydown":_vm.alphaKeyPress,"mousedown":_vm.startMouseCapture,"touchstart":function($event){$event.preventDefault();return _vm.startMouseCapture($event)}}},[_c('div',{ref:"alphaCursor",staticClass:"alpha-range-thumb",style:({ left: (_vm.percent + "%") }),attrs:{"role":"slider","tabindex":"0","aria-label":"Tranparency","aria-valuemin":"0","aria-valuenow":_vm.percent,"aria-valuemax":"100"}},[_c('b-tooltip',{attrs:{"label":(_vm.percent + "%"),"always":_vm.captureMouse}})],1)])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/plugins.normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

  var ColorpickerAlphaSlider = __vue_component__$1;

var defaultColorFormatter = function defaultColorFormatter(color, vm) {
  if (color.alpha < 1) {
    return color.toString('hexa');
  } else {
    return color.toString('hex');
  }
};
var defaultColorParser = function defaultColorParser(color, vm) {
  return Color$1.parse(color);
};
var script = {
  name: 'BColorpicker',
  components: _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._defineProperty({}, ColorpickerHSLRepresentationTriangle.name, ColorpickerHSLRepresentationTriangle), ColorpickerHSLRepresentationSquare.name, ColorpickerHSLRepresentationSquare), ColorpickerAlphaSlider.name, ColorpickerAlphaSlider), Input.Input.name, Input.Input), Field.Field.name, Field.Field), Select.Select.name, Select.Select), Icon.Icon.name, Icon.Icon), DropdownItem.Dropdown.name, DropdownItem.Dropdown), DropdownItem.DropdownItem.name, DropdownItem.DropdownItem),
  mixins: [FormElementMixin.FormElementMixin],
  inheritAttrs: false,
  provide: function provide() {
    return {
      $colorpicker: this
    };
  },
  props: {
    value: {
      type: [String, Object],
      validator: function validator(value) {
        return typeof value === 'string' || _rollupPluginBabelHelpers._typeof(value) === 'object' && typeof value.red === 'number' && typeof value.green === 'number' && typeof value.blue === 'number';
      }
    },
    representation: {
      type: String,
      default: 'triangle',
      value: function value(_value) {
        return ['triangle', 'square'].some(function (r) {
          return r === _value;
        });
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
      default: function _default(color, vm) {
        if (typeof config.config.defaultColorFormatter === 'function') {
          return config.config.defaultColorFormatter(color);
        } else {
          return defaultColorFormatter(color);
        }
      }
    },
    colorParser: {
      type: Function,
      default: function _default(color, vm) {
        if (typeof config.config.defaultColorParser === 'function') {
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
      default: function _default() {
        return config.config.defaultDatepickerMobileModal;
      }
    },
    focusable: {
      type: Boolean,
      default: true
    },
    trapFocus: {
      type: Boolean,
      default: function _default() {
        return config.config.defaultTrapFocus;
      }
    },
    appendToBody: Boolean
  },
  data: function data() {
    return {
      color: this.parseColor(this.value)
    };
  },
  computed: {
    computedValue: {
      set: function set(value) {
        this.color = this.parseColor(value);
      },
      get: function get() {
        return this.color;
      }
    },
    background: function background() {
      if (this.alpha) {
        return "linear-gradient(\n                    45deg,\n                    ".concat(this.computedValue.toString('hex'), " 50%,\n                    ").concat(this.computedValue.toString('hexa'), " 50%\n                )");
      } else {
        var hex = this.computedValue.toString('hex');
        return "linear-gradient(\n                    45deg,\n                    ".concat(hex, " 50%,\n                    ").concat(hex, " 50%\n                )");
      }
    },
    triggerStyle: function triggerStyle() {
      var _this$computedValue = this.computedValue,
        red = _this$computedValue.red,
        green = _this$computedValue.green,
        blue = _this$computedValue.blue;
      var light = red * 0.299 + green * 0.587 + blue * 0.114 > 186;
      return {
        backgroundColor: '#ffffff',
        backgroundImage: "\n                    ".concat(this.background, ",\n                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7),\n                    linear-gradient(45deg, #c7c7c7 25%, transparent 25%, transparent 75%, #c7c7c7 75%, #c7c7c7)\n                "),
        backgroundSize: '100% 100%, 16px 16px, 16px 16px',
        backgroundPosition: '0 0, 8px 8px, 0 0',
        color: light ? '#000000' : '#FFFFFF',
        textShadow: "0 0 2px ".concat(light ? '#FFFFFFAA' : '#000000AA')
      };
    },
    isMobile: function isMobile() {
      return this.mobileNative && helpers.isMobile.any();
    },
    ariaRole: function ariaRole() {
      if (!this.inline) {
        return 'dialog';
      }
    }
  },
  watch: {
    value: function value(_value2) {
      this.computedValue = new Color$1(_value2);
    }
  },
  methods: {
    parseColor: function parseColor(color) {
      try {
        return this.colorParser(color);
      } catch (e) {
        return new Color$1();
      }
    },
    updateColor: function updateColor(value) {
      value.alpha = this.computedValue.alpha;
      this.computedValue = value;
      this.$emit('input', value);
    },
    updateAlpha: function updateAlpha(alpha) {
      this.computedValue.alpha = alpha;
      this.$emit('input', this.computedValue);
    },
    updateRGB: function updateRGB() {
      this.$emit('input', this.computedValue);
    },
    /*
     * Format color into string
     */
    formatValue: function formatValue(value) {
      return value ? this.colorFormatter(value, this) : null;
    },
    /*
     * Toggle datepicker
     */
    togglePicker: function togglePicker(active) {
      if (this.$refs.dropdown) {
        var isActive = typeof active === 'boolean' ? active : !this.$refs.dropdown.isActive;
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
    handleOnFocus: function handleOnFocus(event) {
      this.onFocus(event);
      if (this.openOnFocus) {
        this.togglePicker(true);
      }
    },
    /*
     * Toggle dropdown
     */
    toggle: function toggle() {
      if (this.mobileNative && this.isMobile) {
        var input = this.$refs.input.$refs.input;
        input.focus();
        input.click();
        return;
      }
      this.$refs.dropdown.toggle();
    },
    /*
     * Avoid dropdown toggle when is already visible
     */
    onInputClick: function onInputClick(event) {
      if (this.$refs.dropdown.isActive) {
        event.stopPropagation();
      }
    },
    /**
     * Keypress event that is bound to the document.
     */
    keyPress: function keyPress(_ref) {
      var key = _ref.key;
      if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === 'Escape' || key === 'Esc')) {
        this.togglePicker(false);
      }
    },
    /**
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange: function onActiveChange(value) {
      if (!value) {
        this.onBlur();
      }
      /*
       * Emit 'active-change' when on dropdown active state change
       */
      this.$emit('active-change', value);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"colorpicker control",class:[_vm.size, {'is-expanded': _vm.expanded}]},[(!_vm.isMobile || _vm.inline)?_c('b-dropdown',{ref:"dropdown",attrs:{"position":_vm.position,"expanded":_vm.expanded,"disabled":_vm.disabled,"inline":_vm.inline,"mobile-modal":_vm.mobileModal,"trap-focus":_vm.trapFocus,"aria-role":_vm.ariaRole,"append-to-body":_vm.appendToBody,"append-to-body-copy-parent":""},on:{"active-change":_vm.onActiveChange},scopedSlots:_vm._u([(!_vm.inline)?{key:"trigger",fn:function(){return [_vm._t("trigger",[_c('b-button',{style:(_vm.triggerStyle),attrs:{"expanded":_vm.expanded,"disabled":_vm.disabled}},[_c('span',{staticClass:"color-name"},[_vm._v(_vm._s(_vm.colorFormatter(_vm.computedValue)))])])])]},proxy:true}:null],null,true)},[_c('b-dropdown-item',{class:{'dropdown-horizontal-colorpicker': _vm.horizontalColorPicker},attrs:{"disabled":_vm.disabled,"focusable":_vm.focusable,"custom":""}},[_c('div',[_c('header',{staticClass:"colorpicker-header"},[(_vm.$slots.header !== undefined && _vm.$slots.header.length)?[_vm._t("header")]:_vm._e()],2),_c('div',{staticClass:"colorpicker-content"},[(_vm.representation === 'square')?_c('b-colorpicker-h-s-l-representation-square',{attrs:{"value":_vm.computedValue},on:{"input":_vm.updateColor}}):_c('b-colorpicker-h-s-l-representation-triangle',{attrs:{"value":_vm.computedValue},on:{"input":_vm.updateColor}})],1)]),_c('footer',{staticClass:"colorpicker-footer"},[(_vm.alpha)?_c('b-colorpicker-alpha-slider',{attrs:{"value":_vm.computedValue.alpha,"color":_vm.computedValue},on:{"input":_vm.updateAlpha}}):_vm._e(),_vm._t("footer",[_c('b-field',{staticClass:"colorpicker-fields",attrs:{"grouped":""}},[_c('b-field',{attrs:{"horizontal":"","label":"R"}},[_c('b-input',{attrs:{"type":"number","size":"is-small","aria-label":"Red"},on:{"input":_vm.updateRGB},model:{value:(_vm.computedValue.red),callback:function ($$v) {_vm.$set(_vm.computedValue, "red", _vm._n($$v));},expression:"computedValue.red"}})],1),_c('b-field',{attrs:{"horizontal":"","label":"G"}},[_c('b-input',{attrs:{"type":"number","size":"is-small","aria-label":"Green"},on:{"input":_vm.updateRGB},model:{value:(_vm.computedValue.green),callback:function ($$v) {_vm.$set(_vm.computedValue, "green", _vm._n($$v));},expression:"computedValue.green"}})],1),_c('b-field',{attrs:{"horizontal":"","label":"B"}},[_c('b-input',{attrs:{"type":"number","size":"is-small","aria-label":"Blue"},on:{"input":_vm.updateRGB},model:{value:(_vm.computedValue.blue),callback:function ($$v) {_vm.$set(_vm.computedValue, "blue", _vm._n($$v));},expression:"computedValue.blue"}})],1)],1)],{"color":_vm.computedValue})],2)])],1):_vm._e()],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/plugins.normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

  var Colorpicker = __vue_component__;

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Colorpicker);
  }
};
plugins.use(Plugin);

exports.Color = Color$1;
exports.Colorpicker = Colorpicker;
exports.Plugin = Plugin;
