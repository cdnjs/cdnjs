/**
  scrolldir - Vertical scroll direction in CSS
  @version v1.5.0
  @link https://github.com/dollarshaveclub/scrolldir.git
  @author Patrick Fisher <patrick@pwfisher.com>
  @license MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.scrollDir = factory());
}(this, function () { 'use strict';

  var attribute = 'data-scrolldir';
  var dir = 'down'; // 'up' or 'down'

  var thresholdPixels = 64; // Ignore moves smaller than this.

  var el = document.documentElement;
  var win = window;
  var body = document.body;
  var historyLength = 32; // Ticks to keep in history.

  var historyMaxAge = 512; // History data time-to-live (ms).

  var history = Array(historyLength);
  var e; // last scroll event

  var pivot; // "high-water mark"

  var pivotTime = 0;

  function tick() {
    var y = win.scrollY || win.pageYOffset;
    var t = e.timeStamp;
    var furthest = dir === 'down' ? Math.max : Math.min; // Apply bounds to handle rubber banding

    var yMax = body.scrollHeight - win.innerHeight;
    y = Math.max(0, y);
    y = Math.min(yMax, y); // Update history

    history.unshift({
      y: y,
      t: t
    });
    history.pop(); // Are we continuing in the same direction?

    if (y === furthest(pivot, y)) {
      // Update "high-water mark" for current direction
      pivotTime = t;
      pivot = y;
      return;
    } // else we have backed off high-water mark
    // Apply max age to find current reference point


    var cutoffTime = t - historyMaxAge;

    if (cutoffTime > pivotTime) {
      pivot = y;

      for (var i = 0; i < historyLength; i += 1) {
        if (!history[i] || history[i].t < cutoffTime) break;
        pivot = furthest(pivot, history[i].y);
      }
    } // Have we exceeded threshold?


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
    if (opts) {
      if (opts.attribute) attribute = opts.attribute;
      if (opts.el) el = opts.el;
      if (opts.win) win = opts.win;
      if (opts.dir) dir = opts.dir;
      if (opts.thresholdPixels) thresholdPixels = opts.thresholdPixels; // If opts.off, turn it off
      // - set html[data-scrolldir="off"]
      // - remove the event listener

      if (opts.off === true) {
        el.setAttribute(attribute, 'off');
        return win.removeEventListener('scroll', handler);
      }
    } // else, turn it on
    // - set html[data-scrolldir="down"]
    // - add the event listener


    pivot = win.scrollY || win.pageYOffset;
    el.setAttribute(attribute, dir);
    return win.addEventListener('scroll', handler);
  }

  return scrollDir;

}));
