'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
})();

var Scrollbear = function (window, document) {
  var run;
  function start() {
    var target = arguments.length <= 0 || arguments[0] === undefined ? document.body : arguments[0];
    var changedItem = arguments.length <= 1 || arguments[1] === undefined ? target.querySelectorAll('img') : arguments[1];

    var unloadItems = ([].concat(_toConsumableArray(changedItem)) || []).map(function (img) {
      return { dom: img, calculatedHeight: 0 };
    });
    var oldHeight = [].concat(_toConsumableArray(target.childNodes)).reduce(accumulateHeight, 0);

    run = true;
    // use closure to share the scope
    var frame = function frame() {
      if (!run) return;
      window.requestAnimationFrame(frame);

      var newHeight = [].concat(_toConsumableArray(target.childNodes)).reduce(accumulateHeight, 0);
      // save the normal scroll position
      var scroll = getScroll(target);
      // container height change, means there's a image loaded
      if (isHeightChange(oldHeight, newHeight)) {
        // get loaded image, then determine if it's above the viewport
        if (getLoadedItems(unloadItems).filter(function (item) {
          return item.dom.offsetTop < scroll;
        }).map(markLoadedItems).length > 0) {
          // mark that part of item height is already be calculated
          // unloadItems = markLoadedItems(unloadItems)
          // return to normal scroll position, avoid the page jump
          // there's only part we set the value of style, avoid sync layout threashing
          returnScroll(target, scroll + (newHeight - oldHeight));
        }
      }
      oldHeight = newHeight;
    };
    return window.requestAnimationFrame(frame);
  }
  function stop() {
    run = false;
  }
  function assign(target, prop, value) {
    target[prop] = value;
    return target;
  }
  function accumulateHeight(total, content) {
    return total + (content.offsetHeight || 0);
  }
  function isHeightChange(oldHeight, newHeight) {
    return oldHeight !== newHeight;
  }
  function getScroll(target) {
    return target.scrollTop || window.scrollY;
  }
  function returnScroll(target, pos) {
    // document's scrollTop is undefined, and body will not scroll
    // in these cases, we will scroll the whole window
    if (typeof target.scrollTop === 'undefined' || target === document.body) window.scrollTo(0, pos);else target.scrollTop = pos;
  }
  function markLoadedItems(item) {
    return assign(item, 'calculatedHeight', item.dom.offsetHeight);
  }
  function getLoadedItems(items) {
    return items.filter(function (item) {
      return item.dom.offsetHeight > item.calculatedHeight;
    });
  }
  // Public APIs
  return {
    start: start,
    stop: stop
  };
}(window, document);

if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') module.exports = Scrollbear;else if (typeof define === 'function' && typeof define.amd !== 'undefined') define(function () {
  return Scrollbear;
});else window.Scrollbear = Scrollbear;