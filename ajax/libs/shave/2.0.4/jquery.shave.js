(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function shave(target, maxHeight) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!maxHeight) throw Error('maxHeight is required');
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;

  var character = opts.character || '…';
  var classname = opts.classname || 'js-shave';
  var spaces = opts.spaces || false;
  var charHtml = '<span class="js-shave-char">' + character + '</span>';

  if (!('length' in els)) els = [els];
  for (var i = 0; i < els.length; i += 1) {
    var el = els[i];
    var styles = el.style;
    var span = el.querySelector('.' + classname);
    var textProp = el.textContent === undefined ? 'innerText' : 'textContent';

    // If element text has already been shaved
    if (span) {
      // Remove the ellipsis to recapture the original text
      el.removeChild(el.querySelector('.js-shave-char'));
      el[textProp] = el[textProp]; // nuke span, recombine text
    }

    var fullText = el[textProp];
    var words = spaces ? fullText.split(' ') : fullText;

    // If 0 or 1 words, we're done
    if (words.length < 2) continue;

    // Temporarily remove any CSS height for text height calculation
    var heightStyle = styles.height;
    styles.height = 'auto';
    var maxHeightStyle = styles.maxHeight;
    styles.maxHeight = 'none';

    // If already short enough, we're done
    if (el.offsetHeight <= maxHeight) {
      styles.height = heightStyle;
      styles.maxHeight = maxHeightStyle;
      continue;
    }

    // Binary search for number of words which can fit in allotted height
    var max = words.length - 1;
    var min = 0;
    var pivot = void 0;
    while (min < max) {
      pivot = min + max + 1 >> 1; // eslint-disable-line no-bitwise
      el[textProp] = spaces ? words.slice(0, pivot).join(' ') : words.slice(0, pivot);
      el.insertAdjacentHTML('beforeend', charHtml);
      if (el.offsetHeight > maxHeight) max = spaces ? pivot - 1 : pivot - 2;else min = pivot;
    }

    el[textProp] = spaces ? words.slice(0, max).join(' ') : words.slice(0, max);
    el.insertAdjacentHTML('beforeend', charHtml);
    var diff = spaces ? words.slice(max).join(' ') : words.slice(max);

    el.insertAdjacentHTML('beforeend', '<span class="' + classname + '" style="display:none;">' + diff + '</span>');

    styles.height = heightStyle;
    styles.maxHeight = maxHeightStyle;
  }
}

/* global window */
if (typeof window !== 'undefined') {
  var plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.shave = function shavePlugin(maxHeight, opts) {
      shave(this, maxHeight, opts);
      return this;
    };
  }
}

})));
