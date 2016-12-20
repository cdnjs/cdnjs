(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.shave = factory());
}(this, (function () { 'use strict';

function shave(target, maxHeight, opts) {
  if (!maxHeight) throw Error('maxHeight is required');
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];

  var defaults = {
    character: '…',
    classname: 'js-shave',
    spaces: true
  };
  var character = opts && opts.character || defaults.character;
  var classname = opts && opts.classname || defaults.classname;
  var spaces = opts && opts.spaces === false ? false : defaults.spaces;
  var charHtml = '<span class="js-shave-char">' + character + '</span>';

  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    var span = el.querySelector('.' + classname);

    // If element text has already been shaved
    if (span) {
      // Remove the ellipsis to recapture the original text
      el.removeChild(el.querySelector('.js-shave-char'));
      el.textContent = el.textContent; // nuke span, recombine text
    }

    // If already short enough, we're done
    if (el.offsetHeight < maxHeight) continue;

    var fullText = el.textContent;
    var words = spaces ? fullText.split(' ') : fullText;

    // If 0 or 1 words, we're done
    if (words.length < 2) continue;

    // Binary search for number of words which can fit in allotted height
    var max = words.length - 1;
    var min = 0;
    var pivot = void 0;
    while (min < max) {
      pivot = min + max + 1 >> 1;
      el.textContent = spaces ? words.slice(0, pivot).join(' ') : words.slice(0, pivot);
      el.insertAdjacentHTML('beforeend', charHtml);
      if (el.offsetHeight > maxHeight) max = spaces ? pivot - 1 : pivot - 2;else min = pivot;
    }

    el.textContent = spaces ? words.slice(0, max).join(' ') : words.slice(0, max);
    el.insertAdjacentHTML('beforeend', charHtml);
    var diff = spaces ? words.slice(max + 1).join(' ') : words.slice(max);

    el.insertAdjacentHTML('beforeend', '<span class="' + classname + '" style="display:none;">' + diff + '</span>');
  }
}

var plugin = window.$ || window.jQuery || window.Zepto;
if (plugin) {
  plugin.fn.extend({
    shave: function shaveFunc(maxHeight, opts) {
      return shave(this, maxHeight, opts);
    }
  });
}

return shave;

})));