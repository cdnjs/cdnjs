(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.hanabi = factory());
}(this, (function () { 'use strict';

var defaultColors = ['23AC69', '91C132', 'F19726', 'E8552D', '1AAB8E', 'E1147F', '2980C1', '1BA1E6', '9FA0A0', 'F19726', 'E30B20', 'E30B20', 'A3338B'];

var index = function (input, ref) {
  if ( ref === void 0 ) ref = {};
  var colors = ref.colors; if ( colors === void 0 ) colors = defaultColors;

  var index = 0;
  return encode(input)
  .replace(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+|(?:&lt;)/g, function (m) {
    var out = "<span style=\"color: #" + (colors[index]) + "\">" + m + "</span>";
    index = ++index % colors.length;
    return out
  })
};

function encode(input) {
  return input.replace(/</g, '&lt;')
}

return index;

})));
