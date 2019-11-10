(function() {
  var colors = {
    aqua:    '#7fdbff',
    blue:    '#0074d9',
    lime:    '#01ff70',
    navy:    '#001f3f',
    teal:    '#39cccc',
    olive:   '#3d9970',
    green:   '#2ecc40',
    red:     '#ff4136',
    maroon:  '#85144b',
    orange:  '#ff851b',
    purple:  '#b10dc9',
    yellow:  '#ffdc00',
    fuchsia: '#f012be',
    gray:    '#aaaaaa',
    white:   '#ffffff',
    black:   '#111111',
    silver:  '#dddddd'
  };

  if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = colors;
  } else {
    window.colors = colors;
  }
})();
