(function(f){var g;if(typeof window!=='undefined'){g=window}else if(typeof self!=='undefined'){g=self}g.lazyload=f()})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
module.exports = lazyload;

var inViewport = require('in-viewport');
var lazyAttrs = ['data-src'];

global.lzld = lazyload();

// Provide libs using getAttribute early to get the good src
// and not the fake data-src
replaceGetAttribute('Image');
replaceGetAttribute('IFrame');

function registerLazyAttr(attr) {
  if (indexOf.call(lazyAttrs, attr) === -1) {
    lazyAttrs.push(attr);
  }
}

function lazyload(opts) {
  opts = merge({
    'offset': 333,
    'src': 'data-src',
    'container': false
  }, opts || {});

  if (typeof opts.src === 'string') {
    registerLazyAttr(opts.src);
  }

  var elts = [];

  function show(elt) {
    var src = findRealSrc(elt);

    if (src) {
      elt.src = src;
    }

    elt['data-lzled'] = true;
    elts[indexOf.call(elts, elt)] = null;
  }

  function findRealSrc(elt) {
    if (typeof opts.src === 'function') {
      return opts.src(elt);
    }

    return elt.getAttribute(opts.src);
  }

  function register(elt) {
    // unsubscribe onload
    // needed by IE < 9, otherwise we get another onload when changing the src
    elt.onload = null;
    elt.removeAttribute('onload');

    // https://github.com/vvo/lazyload/issues/62
    elt.onerror = null;
    elt.removeAttribute('onerror');

    if (indexOf.call(elts, elt) === -1) {
      inViewport(elt, opts, show);
    }
  }

  return register;
}

function replaceGetAttribute(elementName) {
  var fullname = 'HTML' + elementName + 'Element';
  if (fullname in global === false) {
    return;
  }

  var original = global[fullname].prototype.getAttribute;
  global[fullname].prototype.getAttribute = function(name) {
    if (name === 'src') {
      var realSrc;
      for (var i = 0, max = lazyAttrs.length; i < max; i++) {
        realSrc = original.call(this, lazyAttrs[i]);
        if (realSrc) {
          break;
        }
      }

      return realSrc || original.call(this, name);
    }

    // our own lazyloader will go through theses lines
    // because we use getAttribute(opts.src)
    return original.call(this, name);
  };
}

function merge(defaults, opts) {
  for (var name in defaults) {
    if (opts[name] === undefined) {
      opts[name] = defaults[name];
    }
  }

  return opts;
}

// http://webreflection.blogspot.fr/2011/06/partial-polyfills.html
function indexOf(value) {
  for (var i = this.length; i-- && this[i] !== value;) {}
  return i;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"in-viewport":2}],2:[function(require,module,exports){
(function (global){
module.exports = inViewport;

var instances = [];

function inViewport(elt, params, cb) {
  var opts = {
    container: global.document.body,
    offset: 0
  };

  if (params === undefined || typeof params === 'function') {
    cb = params;
    params = {};
  }

  var container = opts.container = params.container || opts.container;
  var offset = opts.offset = params.offset || opts.offset;

  for (var i = 0; i < instances.length; i++) {
    if (instances[i].container === container) {
      return instances[i].isInViewport(elt, offset, cb);
    }
  }

  return instances[
    instances.push(createInViewport(container)) - 1
  ].isInViewport(elt, offset, cb);
}

function addEvent(el, type, fn) {
  if (el.attachEvent) {
    el.attachEvent('on' + type, fn);
  } else {
    el.addEventListener(type, fn, false);
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);

    function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }
  };
}

// https://github.com/jquery/sizzle/blob/3136f48b90e3edc84cbaaa6f6f7734ef03775a07/sizzle.js#L708
var contains = global.document.documentElement.compareDocumentPosition ?
  function (a, b) {
    return !!(a.compareDocumentPosition(b) & 16);
  } :
  global.document.documentElement.contains ?
    function (a, b) {
      return a !== b && ( a.contains ? a.contains(b) : false );
    } :
    function (a, b) {
      while (b = b.parentNode) {
        if (b === a) {
          return true;
        }
      }
      return false;
    };

function createInViewport(container) {
  var watches = [];
  var watching = [];

  var scrollContainer = container === global.document.body ? global : container;
  var debouncedCheck = debounce(checkElements, 15);

  addEvent(scrollContainer, 'scroll', debouncedCheck);


  if (scrollContainer === global) {
    addEvent(global, 'resize', debouncedCheck);
  }

  if (typeof global.MutationObserver === 'function') {
    observeDOM(watching, container, debouncedCheck);
  }

  function isInViewport(elt, offset, cb) {
    var visible = isVisible(elt, offset);
    if (visible) {
      if (cb) {
        watching.splice(indexOf.call(watching, elt), 1);
        cb(elt);
      }
      return true;
    } else {
      if (cb) {
        setTimeout(addWatch(elt, offset, cb), 0);
      }
      return false;
    }
  }

  function isVisible(elt, offset) {
    if (!contains(global.document.documentElement, elt) || !contains(global.document.documentElement, container)) {
      return false;
    }

    // Check if the element is visible 
    // cf: https://github.com/jquery/jquery/blob/740e190223d19a114d5373758127285d14d6b71e/src/css/hiddenVisibleSelectors.js
    if (!elt.offsetWidth || !elt.offsetHeight) {
      return false;
    }

    var eltRect = elt.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();

    var pos = {
      left: eltRect.left,
      top: eltRect.top
    };

    var viewport = {
      width: offset,
      height: offset
    };

    if (container === global.document.body) {
      viewport.width += global.document.documentElement.clientWidth;
      viewport.height += global.document.documentElement.clientHeight;

      // We update body rect computing because
      // when you have relative/absolute childs, you get bad compute
      // we need to create a new Object, because it's read only
      containerRect = {
        bottom: container.scrollHeight,
        top: 0,
        left: 0,
        right: container.scrollWidth
      };
    } else {
      pos.left -= containerRect.left;
      pos.top -= containerRect.top;
      viewport.width += container.clientWidth;
      viewport.height += container.clientHeight;
    }

    var visible =
      // 1. They must overlap
      !(
        eltRect.right < containerRect.left ||
        eltRect.left > containerRect.right ||
        eltRect.bottom < containerRect.top ||
        eltRect.top > containerRect.bottom
      ) && (
        // 2. They must be visible in the viewport
        pos.top <= viewport.height &&
        pos.left <= viewport.width
      );

    return visible;
  }

  function addWatch(elt, offset, cb) {
    if (indexOf.call(watching, elt) === -1) {
      watching.push(elt);
    }

    return function () {
      watches.push(function () {
        isInViewport(elt, offset, cb);
      });
    };
  }

  function checkElements() {
    var cb;
    while (cb = watches.shift()) {
      cb();
    }
  }

  return {
    container: container,
    isInViewport: isInViewport
  };
}

function indexOf(value) {
  for (var i = this.length; i-- && this[i] !== value;) {}
  return i;
}

function observeDOM(elements, container, cb) {
  var observer = new MutationObserver(watch);
  var filter = Array.prototype.filter;

  observer.observe(container, {
    childList: true,
    subtree: true
  });

  function watch(mutations) {
    // some new DOM nodes where previously watched
    // we should check their positions
    if (mutations.some(knownNodes) === true) {
      setTimeout(cb, 0);
    }
  }

  function isWatched(node) {
    return indexOf.call(elements, node) !== -1;
  }

  function knownNodes(mutation) {
    return filter.call(mutation.addedNodes, isWatched).length > 0;
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});