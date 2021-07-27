var Color = require('color');

var predefinedColors;

/**
 * Gets the nearest color, from the list supplied by calling setColors.
 *
 * @example
 * var customColors = {
 *   'maroon': '#800',
 *   'light yellow': '#ffe',
 *   'pale blue': '#def'
 * };
 *
 * nearestColor('#f11'); // => '#f00'
 * nearestColor('#f88'); // => '#f80'
 * nearestColor('#ffe'); // => '#ff0'
 * nearestColor('#efe'); // => '#ff0'
 * nearestColor('#abc'); // => '#808'
 *
 * nearestColor('#f00', customColors);
 * // => { name: 'maroon', value: '#800' }
 */
function nearestColor(hex, colors) {
  var needle = Color(hex).rgb(),
      distance,
      minDistance = Infinity,
      rgb,
      value;

  colors = mapColors(colors || nearestColor.DEFAULT_COLORS);

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

function mapColors(colors) {
  if (colors instanceof Array) {
    return colors.map(function(hex) {
      return {
        source: hex,
        rgb: Color(hex).rgb()
      };
    });
  }

  var result = [];
  for (var name in colors) {
    result.push({
      name: name,
      source: colors[name],
      rgb: Color(colors[name]).rgb()
    });
  }
  return result;
};

nearestColor.DEFAULT_COLORS = [
  '#f00', // r
  '#f80', // o
  '#ff0', // y
  '#0f0', // g
  '#00f', // b
  '#008', // i
  '#808'  // v
];

module.exports = nearestColor;
