(function(context) {

  /**
   * Defines an available color.
   *
   * @typedef {Object} ColorSpec
   * @property {string=} name A name for the color, e.g., 'red'
   * @property {string} source The hex-based color string, e.g., '#FF0'
   * @property {RGB} rgb The {@link RGB} color values
   */

  /**
   * Describes a matched color.
   *
   * @typedef {Object} ColorMatch
   * @property {string} name The name of the matched color, e.g., 'red'
   * @property {string} value The hex-based color string, e.g., '#FF0'
   */

  /**
   * Provides the RGB breakdown of a color.
   *
   * @typedef {Object} RGB
   * @property {number} r The red component, from 0 to 255
   * @property {number} g The green component, from 0 to 255
   * @property {number} b The blue component, from 0 to 255
   */

  /**
   * Gets the nearest color, from the given list of {@link ColorSpec} objects
   * (which defaults to {@link nearestColor.DEFAULT_COLORS}).
   *
   * Probably you wouldn't call this method directly. Instead you'd get a custom
   * color matcher by calling {@link nearestColor.from}.
   *
   * @public
   * @param {string} hex The hex-based color string, e.g., '#FF0'
   * @param {Array.<ColorSpec>=} colors An optional list of available colors
   *     (defaults to {@link nearestColor.DEFAULT_COLORS})
   * @return {ColorMatch|string} If the colors in the provided list had names,
   *     then a {@link ColorMatch} object with the name and (hex) value of the
   *     nearest color from the list. Otherwise, simply the hex value.
   *
   * @example
   * nearestColor('#f11'); // => '#f00'
   * nearestColor('#f88'); // => '#f80'
   * nearestColor('#ffe'); // => '#ff0'
   * nearestColor('#efe'); // => '#ff0'
   * nearestColor('#abc'); // => '#808'
   * nearestColor('red');  // => '#f00'
   * nearestColor('foo');  // => null
   */
  function nearestColor(hex, colors) {
    var needle = parseColor(hex),
        distance,
        minDistance = Infinity,
        rgb,
        value;

    if (!needle) {
      return null;
    }

    colors || (colors = nearestColor.DEFAULT_COLORS);

    for (var i = 0; i < colors.length; ++i) {
      rgb = colors[i].rgb;

      distance = Math.sqrt(
        Math.pow(needle.r - rgb.r, 2) +
        Math.pow(needle.g - rgb.g, 2) +
        Math.pow(needle.b - rgb.b, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        value = colors[i];
      }
    }

    return value.name ?
      { name: value.name, value: value.source } :
      value.source;
  }

  /**
   * Provides a matcher to find the nearest color based on the provided list of
   * available colors.
   *
   * @public
   * @param {Array.<string>|Object} availableColors An array of hex-based color
   *     strings, or an object mapping color *names* to hex values.
   * @return {function(string):ColorMatch|string} A function with the same
   *     behavior as {@link nearestColor}, but with the list of colors predefined.
   *
   * @example
   * var colors = {
   *   'maroon': '#800',
   *   'light yellow': '#ffe',
   *   'pale blue': '#def'
   * };
   *
   * var bgColors = [
   *   '#eee',
   *   '#444'
   * ];
   *
   * var getColor = nearestColor.from(colors);
   * var getBGColor = getColor.from(bgColors);
   * var getAnyColor = nearestColor.from(colors).or(bgColors);
   *
   * getColor('#f00');
   * // => { name: 'maroon', value: '#800' }
   *
   * getBGColor('#fff'); // => '#eee'
   * getBGColor('#000'); // => '#444'
   *
   * getAnyColor('#f00'); // => { name: 'maroon', value: '#800' }
   * getAnyColor('#888'); // => '#444'
   */
  nearestColor.from = function from(availableColors) {
    var colors = mapColors(availableColors),
        nearestColorBase = nearestColor;

    var matcher = function nearestColor(hex) {
      return nearestColorBase(hex, colors);
    };

    // Keep the 'from' method, to support changing the list of available colors
    // multiple times without needing to keep a reference to the original
    // nearestColor function.
    matcher.from = from;

    // Also provide a way to combine multiple color lists.
    matcher.or = function or(alternateColors) {
      var extendedColors = colors.concat(mapColors(alternateColors));
      return nearestColor.from(extendedColors);
    };

    return matcher;
  };

  /**
   * Given either an array or object of colors, returns an array of
   * {@link ColorSpec} objects (with {@link RGB} values).
   *
   * @private
   * @param {Array.<string>|Object} colors An array of hex-based color strings, or
   *     an object mapping color *names* to hex values.
   * @return {Array.<ColorSpec>} An array of {@link ColorSpec} objects
   *     representing the same colors passed in.
   */
  function mapColors(colors) {
    if (colors instanceof Array) {
      return colors.map(function(color) {
        if (color.rgb) {
          return color;
        }

        return {
          source: color,
          rgb: parseColor(color)
        };
      });
    }

    var result = [];
    for (var name in colors) {
      result.push({
        name: name,
        source: colors[name],
        rgb: parseColor(colors[name])
      });
    }
    return result;
  };

  /**
   * Parses a color from a string.
   *
   * @private
   * @param {string} source
   * @return {RGB}
   *
   * @example
   * parseColor('#f00');              // => { r: 255, g: 0, b: 0 }
   * parseColor('#04fbc8');           // => { r: 4, g: 251, b: 200 }
   * parseColor('#FF0');              // => { r: 255, g: 255, b: 0 }
   * parseColor('rgb(3, 10, 100)');   // => { r: 3, g: 10, b: 100 }
   * parseColor('rgb(50%, 0%, 50%)'); // => { r: 128, g: 0, b: 128 }
   * parseColor('aqua');              // => { r: 0, g: 255, b: 255 }
   */
  function parseColor(source) {
    var red, green, blue;

    if (source in nearestColor.STANDARD_COLORS) {
      return parseColor(nearestColor.STANDARD_COLORS[source]);
    }

    var hexMatch = source.match(/^#((?:[0-9a-f]{3}){1,2})$/i);
    if (hexMatch) {
      hexMatch = hexMatch[1];

      if (hexMatch.length === 3) {
        hexMatch = [
          hexMatch.charAt(0) + hexMatch.charAt(0),
          hexMatch.charAt(1) + hexMatch.charAt(1),
          hexMatch.charAt(2) + hexMatch.charAt(2)
        ];

      } else {
        hexMatch = [
          hexMatch.substring(0, 2),
          hexMatch.substring(2, 4),
          hexMatch.substring(4, 6)
        ];
      }

      red = parseInt(hexMatch[0], 16);
      green = parseInt(hexMatch[1], 16);
      blue = parseInt(hexMatch[2], 16);

      return { r: red, g: green, b: blue };
    }

    var rgbMatch = source.match(/^rgb\(\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)\s*\)$/i);
    if (rgbMatch) {
      red = parseComponentValue(rgbMatch[1]);
      green = parseComponentValue(rgbMatch[2]);
      blue = parseComponentValue(rgbMatch[3]);

      return { r: red, g: green, b: blue };
    }

    return null;
  }

  /**
   * Parses a value between 0-255 from a string.
   *
   * @private
   * @param {string} string
   * @return {number}
   *
   * @example
   * parseComponentValue('100');  // => 100
   * parseComponentValue('100%'); // => 255
   * parseComponentValue('50%');  // => 128
   */
  function parseComponentValue(string) {
    if (string.charAt(string.length - 1) === '%') {
      return Math.round(parseInt(string, 10) * 255 / 100);
    }

    return Number(string);
  }

  /**
   * A map from the names of standard CSS colors to their hex values.
   */
  nearestColor.STANDARD_COLORS = {
    aqua: '#0ff',
    black: '#000',
    blue: '#00f',
    fuchsia: '#f0f',
    gray: '#808080',
    green: '#008000',
    lime: '#0f0',
    maroon: '#800000',
    navy: '#000080',
    olive: '#808000',
    orange: '#ffa500',
    purple: '#800080',
    red: '#f00',
    silver: '#c0c0c0',
    teal: '#008080',
    white: '#fff',
    yellow: '#ff0'
  };

  /**
   * Default colors. Comprises the colors of the rainbox (good ol' ROY G. BIV).
   * This list will be used for calls to {@nearestColor} that don't specify a list
   * of available colors to match.
   */
  nearestColor.DEFAULT_COLORS = mapColors([
    '#f00', // r
    '#f80', // o
    '#ff0', // y
    '#0f0', // g
    '#00f', // b
    '#008', // i
    '#808'  // v
  ]);

  nearestColor.VERSION = '0.3.1';

  if (typeof module === 'object' && module && module.exports) {
    module.exports = nearestColor;
  } else {
    context.nearestColor = nearestColor;
  }

}(this));
