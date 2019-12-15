(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var defaults = {
  el: document.documentElement,
  win: window,
  attribute: 'data-scrolldir',
  dir: 'down'
};
var el = void 0;
var win = void 0;
var attribute = void 0;
var dir = void 0; // 'up' or 'down'
var body = document.body;
var historyLength = 32; // Ticks to keep in history.
var historyMaxAge = 512; // History data time-to-live (ms).
var thresholdPixels = 64; // Ignore moves smaller than this.
var history = Array(historyLength);
var e = void 0; // last scroll event
var pivot = void 0; // "high-water mark"
var pivotTime = 0;

function tick() {
  var y = win.scrollY || win.pageYOffset;
  var t = e.timeStamp;
  var furthest = dir === 'down' ? Math.max : Math.min;

  // Apply bounds to handle rubber banding
  var yMax = body.offsetHeight - win.innerHeight;
  y = Math.max(0, y);
  y = Math.min(yMax, y);

  // Update history
  history.unshift({ y: y, t: t });
  history.pop();

  // Are we continuing in the same direction?
  if (y === furthest(pivot, y)) {
    // Update "high-water mark" for current direction
    pivotTime = t;
    pivot = y;
    return;
  }
  // else we have backed off high-water mark

  // Apply max age to find current reference point
  var cutoffTime = t - historyMaxAge;
  if (cutoffTime > pivotTime) {
    pivot = y;
    for (var i = 0; i < historyLength; i += 1) {
      if (!history[i] || history[i].t < cutoffTime) break;
      pivot = furthest(pivot, history[i].y);
    }
  }

  // Have we exceeded threshold?
  if (Math.abs(y - pivot) > thresholdPixels) {
    pivot = y;
    pivotTime = t;
    dir = dir === 'down' ? 'up' : 'down';
    el.setAttribute(attribute, dir);
  }
}

function handler(event) {
  e = event;
  return win.requestAnimationFrame(tick);
}

function scrollDir(opts) {
  el = opts && opts.el || defaults.el;
  win = opts && opts.win || defaults.win;
  attribute = opts && opts.attribute || defaults.attribute;
  dir = opts && opts.direction || defaults.dir;

  // If opts.off, turn it off
  // - set html[data-scrolldir="off"]
  // - remove the event listener
  if (opts && opts.off === true) {
    el.setAttribute(attribute, 'off');
    return win.removeEventListener('scroll', handler);
  }

  // else, turn it on
  // - set html[data-scrolldir="down"]
  // - add the event listener
  pivot = win.scrollY || win.pageYOffset;
  el.setAttribute(attribute, dir);
  return win.addEventListener('scroll', handler);
}

scrollDir();

})));
