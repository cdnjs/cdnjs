(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.hanabi = factory());
}(this, (function () { 'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$1 = createCommonjsModule(function (module) {
'use strict';

var comment = module.exports = function () {
	return new RegExp('(?:' + comment.line().source + ')|(?:' + comment.block().source + ')', 'gm');
};

comment.line = function () {
	return /(?:^|\s)\/\/(.+?)$/gm;
};

comment.block = function () {
	return /\/\*([\S\s]*?)\*\//gm;
};
});

var defaultColors = ['23AC69', '91C132', 'F19726', 'E8552D', '1AAB8E', 'E1147F', '2980C1', '1BA1E6', '9FA0A0', 'F19726', 'E30B20', 'E30B20', 'A3338B'];

var index = function (input, ref) {
  if ( ref === void 0 ) ref = {};
  var colors = ref.colors; if ( colors === void 0 ) colors = defaultColors;

  var index = 0;
  var cache = {};
  var wordRe = /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/;
  var leftAngleRe = /</;

  var re = new RegExp(("(" + (wordRe.source) + "|" + (leftAngleRe.source) + ")|(" + (index$1().source) + ")"), 'gmi');
  return input
  .replace(re, function (m, word, cm) {
    if (cm) {
      return toComment(cm)
    }

    if (word === '<') {
      return '&lt;'
    }
    var color;
    if (cache[word]) {
      color = cache[word];
    } else {
      color = colors[index];
      cache[word] = color;
    }

    var out = "<span style=\"color: #" + color + "\">" + word + "</span>";
    index = ++index % colors.length;
    return out
  })
};

function toComment(cm) {
  return ("<span style=\"color: slategray\">" + cm + "</span>")
}

return index;

})));
