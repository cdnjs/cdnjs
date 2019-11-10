(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.shave = factory());
}(this, (function () { 'use strict';

/* global document, window */
function shaver(target, maxHeight, opts) {
  if (!maxHeight) throw Error('maxHeight is required');
  var el = target;
  var character = opts && opts.character || '…';
  var classname = opts && opts.classname || 'js-shave';
  var spaces = true;
  if (opts && opts.spaces === false) spaces = false;
  var charHtml = '<span class="js-shave-char">' + character + '</span>';
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
  if (words.length < 2) return;

  // Temporarily remove any CSS height for text height calculation
  var heightStyle = el.style.height;
  el.style.height = 'auto';
  var maxHeightStyle = el.style.maxHeight;
  el.style.maxHeight = 'none';

  // If already short enough, we're done
  if (el.offsetHeight <= maxHeight) {
    el.style.height = heightStyle;
    el.style.maxHeight = maxHeightStyle;
    return;
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

  el.style.height = heightStyle;
  el.style.maxHeight = maxHeightStyle;
}

/* global document, window */
function shave(target, maxHeight, opts) {
  var els = document.querySelectorAll(target);
  for (var i = 0; i < els.length; i += 1) {
    var el = els[i];
    shaver(el, maxHeight, opts);
  }
}

return shave;

})));
