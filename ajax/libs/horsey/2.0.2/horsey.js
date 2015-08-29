!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.horsey=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var bullseye = require('bullseye');
var fuzzysearch = require('fuzzysearch');
var KEY_ENTER = 13;
var KEY_ESC = 27;
var KEY_UP = 38;
var KEY_DOWN = 40;

function horsey (el, options) {
  var o = options || {};
  var parent = o.appendTo || document.body;
  var render = o.render || defaultRenderer;
  var getText = o.getText || defaultGetText;
  var getValue = o.getValue || defaultGetValue;
  var set = o.set || defaultSetter;
  var form = o.form;
  var suggestions = o.suggestions;
  var filter = o.filter || defaultFilter;
  var ul = tag('ul', 'sey-list');
  var selection = null;
  var oneload = once(loading);
  var eye;
  var deferredFiltering = defer(filtering);

  if (o.autoHideOnBlur === void 0) { o.autoHideOnBlur = true; }
  if (o.autoHideOnClick === void 0) { o.autoHideOnClick = true; }
  if (o.autoShowOnUpDown === void 0) { o.autoShowOnUpDown = el.tagName === 'INPUT'; }

  parent.appendChild(ul);
  el.setAttribute('autocomplete', 'off');

  if (Array.isArray(suggestions)) {
    loaded(suggestions);
  } else if (typeof suggestions === 'function') {
    crossvent.add(el, 'focus', oneload);
  }

  inputEvents();
  eye = bullseye(ul, el, { caret: el.tagName === 'TEXTAREA' });

  return {
    add: add,
    clear: clear,
    show: show,
    hide: hide,
    destroy: destroy,
    refreshPosition: eye.refresh,
    defaultRenderer: defaultRenderer,
    defaultGetText: defaultGetText,
    defaultGetValue: defaultGetValue,
    defaultSetter: defaultSetter,
    defaultFilter: defaultFilter
  };

  function loading () {
    crossvent.remove(el, 'focus', oneload);
    suggestions(loaded);
  }

  function loaded (suggestions) {
    suggestions.forEach(add);
  }

  function clear () {
    while (ul.lastChild) {
      ul.removeChild(ul.lastChild);
    }
  }

  function add (suggestion) {
    var li = tag('li', 'sey-item');
    render(li, suggestion);
    crossvent.add(li, 'click', select);
    crossvent.add(li, 'horsey-filter', filterItem);
    ul.appendChild(li);
    return li;

    function select () {
      set(getValue(suggestion));
      hide();
      el.focus();
      crossvent.fabricate(el, 'horsey-selected');
    }

    function filterItem () {
      var value = el.value;
      if (filter(value, suggestion)) {
        li.className = li.className.replace(/ sey-hide/g, '');
      } else if (!hidden(li)) {
        li.className += ' sey-hide';
        if (selection === li) {
          unselect();
        }
      }
    }
  }

  function visible () {
    return ul.className.indexOf('sey-show') !== -1;
  }

  function hidden (li) {
    return li.className.indexOf('sey-hide') !== -1;
  }

  function show () {
    if (!visible()) {
      ul.className += ' sey-show';
      eye.refresh();
      crossvent.fabricate(el, 'horsey-show');
    }
  }

  function select (el) {
    unselect();
    if (el) {
      selection = el;
      selection.className += ' sey-selected';
    }
  }

  function unselect () {
    if (selection) {
      selection.className = selection.className.replace(/ sey-selected/g, '');
      selection = null;
    }
  }

  function move (up, moves) {
    var total = ul.children.length;
    if (total < moves) {
      unselect();
      return;
    }
    if (total === 0) {
      return;
    }
    var first = up ? 'lastChild' : 'firstChild';
    var next = up ? 'previousSibling' : 'nextSibling';
    var el = selection && selection[next] || ul[first];

    select(el);

    if (hidden(el)) {
      move(up, moves ? moves + 1 : 1);
    }
  }

  function hide () {
    ul.className = ul.className.replace(/ sey-show/g, '');
    unselect();
    crossvent.fabricate(el, 'horsey-hide');
  }

  function keydown (e) {
    var shown = visible();
    var which = e.which || e.keyCode;
    if (which === KEY_DOWN) {
      if (o.autoShowOnUpDown) {
        show();
      }
      if (shown) {
        move();
        stop(e);
      }
    } else if (which === KEY_UP) {
      if (o.autoShowOnUpDown) {
        show();
      }
      if (shown) {
        move(true);
        stop(e);
      }
    } else if (shown) {
      if (which === KEY_ENTER) {
        if (selection) {
          crossvent.fabricate(selection, 'click');
        } else {
          hide();
        }
        stop(e);
      } else if (which === KEY_ESC) {
        hide();
        stop(e);
      }
    }
  }

  function stop (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function filtering () {
    if (!visible()) {
      return;
    }
    var li = ul.firstChild;
    while (li) {
      crossvent.fabricate(li, 'horsey-filter');
      li = li.nextSibling;
    }
    if (!selection) {
      move();
    }
    if (!selection) {
      hide();
    }
  }

  function deferredKeydown (e) {
    var which = e.which || e.keyCode;
    if (which === KEY_ENTER) {
      return;
    }
    deferredFiltering();
  }

  function deferredShow (e) {
    var which = e.which || e.keyCode;
    if (which === KEY_ENTER) {
      return;
    }
    setTimeout(show, 0);
  }

  function horseyEventTarget (e) {
    var target = e.target;
    if (target === el) {
      return true;
    }
    while (target) {
      if (target === ul) {
        return true;
      }
      target = target.parentNode;
    }
  }

  function hideOnBlur (e) {
    if (horseyEventTarget(e)) {
      return;
    }
    hide();
  }

  function hideOnClick (e) {
    if (horseyEventTarget(e)) {
      return;
    }
    hide();
  }

  function inputEvents (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](el, 'keypress', deferredShow);
    crossvent[op](el, 'keypress', deferredFiltering);
    crossvent[op](el, 'paste', deferredFiltering);
    crossvent[op](el, 'keydown', deferredKeydown);
    crossvent[op](el, 'keydown', keydown);
    if (o.autoHideOnBlur) { crossvent[op](document.documentElement, 'focus', hideOnBlur, true); }
    if (o.autoHideOnClick) { crossvent[op](document, 'click', hideOnClick); }
    if (form) { crossvent[op](form, 'submit', hide); }
  }

  function destroy () {
    inputEvents(true);
    eye.destroy();
    if (parent.contains(ul)) { parent.removeChild(ul); }
    crossvent.remove(el, 'focus', oneload);
  }

  function defaultSetter (value) {
    el.value = value;
  }

  function defaultRenderer (li, suggestion) {
    li.innerText = li.textContent = getText(suggestion);
  }

  function defaultFilter (q, suggestion) {
    var text = getText(suggestion) || '';
    var value = getValue(suggestion) || '';
    return fuzzysearch(q, text.toLowerCase()) || fuzzysearch(q, value.toLowerCase());
  }
}

function defaultGetValue (suggestion) {
  return typeof suggestion === 'string' ? suggestion : suggestion.value;
}

function defaultGetText (suggestion) {
  return typeof suggestion === 'string' ? suggestion : suggestion.text;
}

function tag (type, className) {
  var el = document.createElement(type);
  el.className = className;
  return el;
}

function once (fn) {
  var disposed;
  function disposable () {
    if (disposed) { return; }
    disposed = true;
    (fn || noop).apply(null, arguments);
  }
  return disposable;
}

function defer (fn) {
  return function () {
    setTimeout(fn, 0);
  };
}

function noop () {}

module.exports = horsey;

},{"bullseye":2,"crossvent":6,"fuzzysearch":7}],2:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var throttle = require('./throttle');
var tailormade = require('./tailormade');

function bullseye (el, target, options) {
  var o = options || {};
  var destroyed = false;
  var throttledPosition = throttle(position, 30);
  var tailor = o.caret && tailormade(target, { update: update, positions: ['start'] });

  position();

  if (o.tracking !== false) {
    crossvent.add(window, 'resize', throttledPosition);
  }

  return {
    refresh: position,
    destroy: destroy
  };

  function update (readings) {
    throttledPosition(readings);
  }

  function position (readings) {
    if (destroyed) {
      throw new Error('Bullseye can\'t refresh after being destroyed. Create another instance instead.');
    }
    if (tailor && !readings) {
      tailor.refresh(); return;
    }
    var bounds = target.getBoundingClientRect();
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (readings) {
      el.style.top = bounds.top + scrollTop + readings.start.y + 20 + 'px';
      el.style.left = bounds.left + readings.start.x + 'px';
    } else {
      el.style.top  = bounds.top + scrollTop + target.offsetHeight + 'px';
      el.style.left = bounds.left + 'px';
    }
  }

  function destroy () {
    if (tailor) { tailor.destroy(); }
    crossvent.remove(window, 'resize', throttledPosition);
    destroyed = true;
  }
}

module.exports = bullseye;

},{"./tailormade":4,"./throttle":5,"crossvent":6}],3:[function(require,module,exports){
'use strict';

var get = easyGet;
var set = easySet;

if (document.selection && document.selection.createRange) {
  get = hardGet;
  set = hardSet;
}

function easyGet (el) {
  return {
    start: el.selectionStart,
    end: el.selectionEnd
  };
}

function hardGet (el) {
  var active = document.activeElement;
  if (active !== el) {
    el.focus();
  }

  var range = document.selection.createRange();
  var bookmark = range.getBookmark();
  var original = el.value;
  var marker = getUniqueMarker(original);
  var parent = range.parentElement();
  if (parent === null || !inputs(parent)) {
    return result(0, 0);
  }
  range.text = marker + range.text + marker;

  var contents = el.value;

  el.value = original;
  range.moveToBookmark(bookmark);
  range.select();

  return result(contents.indexOf(marker), contents.lastIndexOf(marker) - marker.length);

  function result (start, end) {
    if (active !== el) { // don't disrupt pre-existing state
      if (active) {
        active.focus();
      } else {
        el.blur();
      }
    }
    return { start: start, end: end };
  }
}

function getUniqueMarker (contents) {
  var marker;
  do {
    marker = '@@marker.' + Math.random() * new Date();
  } while (contents.indexOf(marker) !== -1);
  return marker;
}

function inputs (el) {
  return ((el.tagName === 'INPUT' && el.type === 'text') || el.tagName === 'TEXTAREA');
}

function easySet (el, p) {
  el.selectionStart = parse(el, p.start);
  el.selectionEnd = parse(el, p.end);
}

function hardSet (el, p) {
  var range = el.createTextRange();

  if (p.start === 'end' && p.end === 'end') {
    range.collapse(false);
    range.select();
  } else {
    range.collapse(true);
    range.moveEnd('character', parse(el, p.end));
    range.moveStart('character', parse(el, p.start));
    range.select();
  }
}

function parse (el, value) {
  return value === 'end' ? el.value.length : value || 0;
}

function sell (el, p) {
  if (arguments.length === 2) {
    set(el, p);
  }
  return get(el);
}

module.exports = sell;

},{}],4:[function(require,module,exports){
'use strict';

var sell = require('sell');
var crossvent = require('crossvent');
var throttle = require('./throttle');
var props = [
  'direction',
  'boxSizing',
  'width',
  'height',
  'overflowX',
  'overflowY',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',
  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration',
  'letterSpacing',
  'wordSpacing'
];
var doc = document;
var ff = window.mozInnerScreenX !== null && window.mozInnerScreenX !== void 0;

function tailormade (el, options) {
  var throttledRefresh = throttle(refresh, 30);
  var o = options || {};
  if (o.positions === void 0) { o.positions = ['start', 'end', 'all']; }

  bind();

  return {
    refresh: throttledRefresh,
    destroy: destroy
  };

  function refresh () {
    var p = sell(el);
    var context = prepare();
    var readings = {};

    if (o.positions.indexOf('start') !== -1) { add('start', p.start); }
    if (o.positions.indexOf('end') !== -1) { add('end', p.end); }
    if (o.positions.indexOf('all') !== -1) { add('all', el.value.length); }

    doc.body.removeChild(context.mirror);
    o.update(readings);

    function add (name, p) {
      readings[name] = coords(context, p);
    }
  }

  function prepare () {
    var computed = window.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
    var mirror = doc.createElement('div');
    var style = mirror.style;

    doc.body.appendChild(mirror);

    if (el.tagName !== 'INPUT') {
      style.wordWrap = 'break-word';
    }
    style.whiteSpace = 'pre-wrap';
    style.position = 'absolute';
    style.visibility = 'hidden';
    props.forEach(copy);

    if (ff) {
      style.width = parseInt(computed.width) - 2 + 'px';
      if (el.scrollHeight > parseInt(computed.height)) {
        style.overflowY = 'scroll';
      }
    } else {
      style.overflow = 'hidden';
    }
    return { mirror: mirror, computed: computed };

    function copy (prop) {
      style[prop] = computed[prop];
    }
  }

  function coords (context, p) {
    var rest = doc.createElement('span');
    var mirror = context.mirror;
    var computed = context.computed;

    mirror.textContent = el.value.substring(0, p);

    if (el.tagName === 'INPUT') {
      mirror.textContent = mirror.textContent.replace(/\s/g, '\u00a0');
    }

    rest.textContent = el.value.substring(p) || '.';
    mirror.appendChild(rest);

    return {
      x: rest.offsetLeft + parseInt(computed['borderLeftWidth']),
      y: rest.offsetTop + parseInt(computed['borderTopWidth'])
    };
  }

  function bind (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](el, 'keydown', throttledRefresh);
    crossvent[op](el, 'keyup', throttledRefresh);
    crossvent[op](el, 'input', throttledRefresh);
    crossvent[op](el, 'paste', throttledRefresh);
    crossvent[op](el, 'change', throttledRefresh);
  }

  function destroy () {
    bind(true);
  }
}

module.exports = tailormade;

},{"./throttle":5,"crossvent":6,"sell":3}],5:[function(require,module,exports){
'use strict';

function throttle (fn, boundary) {
  var last = -Infinity;
  var timer;
  return function bounced () {
    if (timer) {
      return;
    }
    var args = arguments;
    unbound();

    function unbound () {
      clearTimeout(timer);
      timer = null;
      var next = last + boundary;
      var now = Date.now();
      if (now > next) {
        last = now;
        fn.apply(this, args);
      } else {
        timer = setTimeout(unbound, next - now);
      }
    }
  };
}

module.exports = throttle;

},{}],6:[function(require,module,exports){
(function (global){
'use strict';

var doc = document;
var addEvent = addEventEasy;
var removeEvent = removeEventEasy;
var hardCache = [];

if (!global.addEventListener) {
  addEvent = addEventHard;
  removeEvent = removeEventHard;
}

function addEventEasy (el, type, fn, capturing) {
  return el.addEventListener(type, fn, capturing);
}

function addEventHard (el, type, fn) {
  return el.attachEvent('on' + type, wrap(el, type, fn));
}

function removeEventEasy (el, type, fn, capturing) {
  return el.removeEventListener(type, fn, capturing);
}

function removeEventHard (el, type, fn) {
  return el.detachEvent('on' + type, unwrap(el, type, fn));
}

function fabricateEvent (el, type) {
  var e;
  if (doc.createEvent) {
    e = doc.createEvent('Event');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  } else if (doc.createEventObject) {
    e = doc.createEventObject();
    el.fireEvent('on' + type, e);
  }
}

function wrapperFactory (el, type, fn) {
  return function wrapper (originalEvent) {
    var e = originalEvent || global.event;
    e.target = e.target || e.srcElement;
    e.preventDefault  = e.preventDefault  || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    fn.call(el, e);
  };
}

function wrap (el, type, fn) {
  var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
  hardCache.push({
    wrapper: wrapper,
    element: el,
    type: type,
    fn: fn
  });
  return wrapper;
}

function unwrap (el, type, fn) {
  var i = find(el, type, fn);
  if (i) {
    var wrapper = hardCache[i].wrapper;
    hardCache.splice(i, 1); // free up a tad of memory
    return wrapper;
  }
}

function find (el, type, fn) {
  var i, item;
  for (i = 0; i < hardCache.length; i++) {
    item = hardCache[i];
    if (item.element === el && item.type === type && item.fn === fn) {
      return i;
    }
  }
}

module.exports = {
  add: addEvent,
  remove: removeEvent,
  fabricate: fabricateEvent
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],7:[function(require,module,exports){
'use strict';

function fuzzysearch (needle, haystack) {
  var tlen = haystack.length;
  var qlen = needle.length;
  if (qlen > tlen) {
    return false;
  }
  if (qlen === tlen) {
    return needle === haystack;
  }
  outer: for (var i = 0, j = 0; i < qlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < tlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}

module.exports = fuzzysearch;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJob3JzZXkuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvYnVsbHNleWUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL3NlbGwvc2VsbC5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS90YWlsb3JtYWRlLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL3Rocm90dGxlLmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2Z1enp5c2VhcmNoL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGJ1bGxzZXllID0gcmVxdWlyZSgnYnVsbHNleWUnKTtcbnZhciBmdXp6eXNlYXJjaCA9IHJlcXVpcmUoJ2Z1enp5c2VhcmNoJyk7XG52YXIgS0VZX0VOVEVSID0gMTM7XG52YXIgS0VZX0VTQyA9IDI3O1xudmFyIEtFWV9VUCA9IDM4O1xudmFyIEtFWV9ET1dOID0gNDA7XG5cbmZ1bmN0aW9uIGhvcnNleSAoZWwsIG9wdGlvbnMpIHtcbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgcGFyZW50ID0gby5hcHBlbmRUbyB8fCBkb2N1bWVudC5ib2R5O1xuICB2YXIgcmVuZGVyID0gby5yZW5kZXIgfHwgZGVmYXVsdFJlbmRlcmVyO1xuICB2YXIgZ2V0VGV4dCA9IG8uZ2V0VGV4dCB8fCBkZWZhdWx0R2V0VGV4dDtcbiAgdmFyIGdldFZhbHVlID0gby5nZXRWYWx1ZSB8fCBkZWZhdWx0R2V0VmFsdWU7XG4gIHZhciBzZXQgPSBvLnNldCB8fCBkZWZhdWx0U2V0dGVyO1xuICB2YXIgZm9ybSA9IG8uZm9ybTtcbiAgdmFyIHN1Z2dlc3Rpb25zID0gby5zdWdnZXN0aW9ucztcbiAgdmFyIGZpbHRlciA9IG8uZmlsdGVyIHx8IGRlZmF1bHRGaWx0ZXI7XG4gIHZhciB1bCA9IHRhZygndWwnLCAnc2V5LWxpc3QnKTtcbiAgdmFyIHNlbGVjdGlvbiA9IG51bGw7XG4gIHZhciBvbmVsb2FkID0gb25jZShsb2FkaW5nKTtcbiAgdmFyIGV5ZTtcbiAgdmFyIGRlZmVycmVkRmlsdGVyaW5nID0gZGVmZXIoZmlsdGVyaW5nKTtcblxuICBpZiAoby5hdXRvSGlkZU9uQmx1ciA9PT0gdm9pZCAwKSB7IG8uYXV0b0hpZGVPbkJsdXIgPSB0cnVlOyB9XG4gIGlmIChvLmF1dG9IaWRlT25DbGljayA9PT0gdm9pZCAwKSB7IG8uYXV0b0hpZGVPbkNsaWNrID0gdHJ1ZTsgfVxuICBpZiAoby5hdXRvU2hvd09uVXBEb3duID09PSB2b2lkIDApIHsgby5hdXRvU2hvd09uVXBEb3duID0gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJzsgfVxuXG4gIHBhcmVudC5hcHBlbmRDaGlsZCh1bCk7XG4gIGVsLnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHN1Z2dlc3Rpb25zKSkge1xuICAgIGxvYWRlZChzdWdnZXN0aW9ucyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHN1Z2dlc3Rpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ2ZvY3VzJywgb25lbG9hZCk7XG4gIH1cblxuICBpbnB1dEV2ZW50cygpO1xuICBleWUgPSBidWxsc2V5ZSh1bCwgZWwsIHsgY2FyZXQ6IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBhZGQ6IGFkZCxcbiAgICBjbGVhcjogY2xlYXIsXG4gICAgc2hvdzogc2hvdyxcbiAgICBoaWRlOiBoaWRlLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgcmVmcmVzaFBvc2l0aW9uOiBleWUucmVmcmVzaCxcbiAgICBkZWZhdWx0UmVuZGVyZXI6IGRlZmF1bHRSZW5kZXJlcixcbiAgICBkZWZhdWx0R2V0VGV4dDogZGVmYXVsdEdldFRleHQsXG4gICAgZGVmYXVsdEdldFZhbHVlOiBkZWZhdWx0R2V0VmFsdWUsXG4gICAgZGVmYXVsdFNldHRlcjogZGVmYXVsdFNldHRlcixcbiAgICBkZWZhdWx0RmlsdGVyOiBkZWZhdWx0RmlsdGVyXG4gIH07XG5cbiAgZnVuY3Rpb24gbG9hZGluZyAoKSB7XG4gICAgY3Jvc3N2ZW50LnJlbW92ZShlbCwgJ2ZvY3VzJywgb25lbG9hZCk7XG4gICAgc3VnZ2VzdGlvbnMobG9hZGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRlZCAoc3VnZ2VzdGlvbnMpIHtcbiAgICBzdWdnZXN0aW9ucy5mb3JFYWNoKGFkZCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgd2hpbGUgKHVsLmxhc3RDaGlsZCkge1xuICAgICAgdWwucmVtb3ZlQ2hpbGQodWwubGFzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGQgKHN1Z2dlc3Rpb24pIHtcbiAgICB2YXIgbGkgPSB0YWcoJ2xpJywgJ3NleS1pdGVtJyk7XG4gICAgcmVuZGVyKGxpLCBzdWdnZXN0aW9uKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGxpLCAnY2xpY2snLCBzZWxlY3QpO1xuICAgIGNyb3NzdmVudC5hZGQobGksICdob3JzZXktZmlsdGVyJywgZmlsdGVySXRlbSk7XG4gICAgdWwuYXBwZW5kQ2hpbGQobGkpO1xuICAgIHJldHVybiBsaTtcblxuICAgIGZ1bmN0aW9uIHNlbGVjdCAoKSB7XG4gICAgICBzZXQoZ2V0VmFsdWUoc3VnZ2VzdGlvbikpO1xuICAgICAgaGlkZSgpO1xuICAgICAgZWwuZm9jdXMoKTtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoZWwsICdob3JzZXktc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJJdGVtICgpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGVsLnZhbHVlO1xuICAgICAgaWYgKGZpbHRlcih2YWx1ZSwgc3VnZ2VzdGlvbikpIHtcbiAgICAgICAgbGkuY2xhc3NOYW1lID0gbGkuY2xhc3NOYW1lLnJlcGxhY2UoLyBzZXktaGlkZS9nLCAnJyk7XG4gICAgICB9IGVsc2UgaWYgKCFoaWRkZW4obGkpKSB7XG4gICAgICAgIGxpLmNsYXNzTmFtZSArPSAnIHNleS1oaWRlJztcbiAgICAgICAgaWYgKHNlbGVjdGlvbiA9PT0gbGkpIHtcbiAgICAgICAgICB1bnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdmlzaWJsZSAoKSB7XG4gICAgcmV0dXJuIHVsLmNsYXNzTmFtZS5pbmRleE9mKCdzZXktc2hvdycpICE9PSAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGRlbiAobGkpIHtcbiAgICByZXR1cm4gbGkuY2xhc3NOYW1lLmluZGV4T2YoJ3NleS1oaWRlJykgIT09IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdyAoKSB7XG4gICAgaWYgKCF2aXNpYmxlKCkpIHtcbiAgICAgIHVsLmNsYXNzTmFtZSArPSAnIHNleS1zaG93JztcbiAgICAgIGV5ZS5yZWZyZXNoKCk7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGVsLCAnaG9yc2V5LXNob3cnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3QgKGVsKSB7XG4gICAgdW5zZWxlY3QoKTtcbiAgICBpZiAoZWwpIHtcbiAgICAgIHNlbGVjdGlvbiA9IGVsO1xuICAgICAgc2VsZWN0aW9uLmNsYXNzTmFtZSArPSAnIHNleS1zZWxlY3RlZCc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdW5zZWxlY3QgKCkge1xuICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgIHNlbGVjdGlvbi5jbGFzc05hbWUgPSBzZWxlY3Rpb24uY2xhc3NOYW1lLnJlcGxhY2UoLyBzZXktc2VsZWN0ZWQvZywgJycpO1xuICAgICAgc2VsZWN0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlICh1cCwgbW92ZXMpIHtcbiAgICB2YXIgdG90YWwgPSB1bC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgaWYgKHRvdGFsIDwgbW92ZXMpIHtcbiAgICAgIHVuc2VsZWN0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0b3RhbCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZmlyc3QgPSB1cCA/ICdsYXN0Q2hpbGQnIDogJ2ZpcnN0Q2hpbGQnO1xuICAgIHZhciBuZXh0ID0gdXAgPyAncHJldmlvdXNTaWJsaW5nJyA6ICduZXh0U2libGluZyc7XG4gICAgdmFyIGVsID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbltuZXh0XSB8fCB1bFtmaXJzdF07XG5cbiAgICBzZWxlY3QoZWwpO1xuXG4gICAgaWYgKGhpZGRlbihlbCkpIHtcbiAgICAgIG1vdmUodXAsIG1vdmVzID8gbW92ZXMgKyAxIDogMSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZSAoKSB7XG4gICAgdWwuY2xhc3NOYW1lID0gdWwuY2xhc3NOYW1lLnJlcGxhY2UoLyBzZXktc2hvdy9nLCAnJyk7XG4gICAgdW5zZWxlY3QoKTtcbiAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGVsLCAnaG9yc2V5LWhpZGUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGtleWRvd24gKGUpIHtcbiAgICB2YXIgc2hvd24gPSB2aXNpYmxlKCk7XG4gICAgdmFyIHdoaWNoID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYgKHdoaWNoID09PSBLRVlfRE9XTikge1xuICAgICAgaWYgKG8uYXV0b1Nob3dPblVwRG93bikge1xuICAgICAgICBzaG93KCk7XG4gICAgICB9XG4gICAgICBpZiAoc2hvd24pIHtcbiAgICAgICAgbW92ZSgpO1xuICAgICAgICBzdG9wKGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAod2hpY2ggPT09IEtFWV9VUCkge1xuICAgICAgaWYgKG8uYXV0b1Nob3dPblVwRG93bikge1xuICAgICAgICBzaG93KCk7XG4gICAgICB9XG4gICAgICBpZiAoc2hvd24pIHtcbiAgICAgICAgbW92ZSh0cnVlKTtcbiAgICAgICAgc3RvcChlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNob3duKSB7XG4gICAgICBpZiAod2hpY2ggPT09IEtFWV9FTlRFUikge1xuICAgICAgICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShzZWxlY3Rpb24sICdjbGljaycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzdG9wKGUpO1xuICAgICAgfSBlbHNlIGlmICh3aGljaCA9PT0gS0VZX0VTQykge1xuICAgICAgICBoaWRlKCk7XG4gICAgICAgIHN0b3AoZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyaW5nICgpIHtcbiAgICBpZiAoIXZpc2libGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbGkgPSB1bC5maXJzdENoaWxkO1xuICAgIHdoaWxlIChsaSkge1xuICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShsaSwgJ2hvcnNleS1maWx0ZXInKTtcbiAgICAgIGxpID0gbGkubmV4dFNpYmxpbmc7XG4gICAgfVxuICAgIGlmICghc2VsZWN0aW9uKSB7XG4gICAgICBtb3ZlKCk7XG4gICAgfVxuICAgIGlmICghc2VsZWN0aW9uKSB7XG4gICAgICBoaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVmZXJyZWRLZXlkb3duIChlKSB7XG4gICAgdmFyIHdoaWNoID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYgKHdoaWNoID09PSBLRVlfRU5URVIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVmZXJyZWRGaWx0ZXJpbmcoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmVycmVkU2hvdyAoZSkge1xuICAgIHZhciB3aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmICh3aGljaCA9PT0gS0VZX0VOVEVSKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldFRpbWVvdXQoc2hvdywgMCk7XG4gIH1cblxuICBmdW5jdGlvbiBob3JzZXlFdmVudFRhcmdldCAoZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0ID09PSBlbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHdoaWxlICh0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZU9uQmx1ciAoZSkge1xuICAgIGlmIChob3JzZXlFdmVudFRhcmdldChlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoaWRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlT25DbGljayAoZSkge1xuICAgIGlmIChob3JzZXlFdmVudFRhcmdldChlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoaWRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbnB1dEV2ZW50cyAocmVtb3ZlKSB7XG4gICAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAna2V5cHJlc3MnLCBkZWZlcnJlZFNob3cpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXlwcmVzcycsIGRlZmVycmVkRmlsdGVyaW5nKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAncGFzdGUnLCBkZWZlcnJlZEZpbHRlcmluZyk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleWRvd24nLCBkZWZlcnJlZEtleWRvd24pO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXlkb3duJywga2V5ZG93bik7XG4gICAgaWYgKG8uYXV0b0hpZGVPbkJsdXIpIHsgY3Jvc3N2ZW50W29wXShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdmb2N1cycsIGhpZGVPbkJsdXIsIHRydWUpOyB9XG4gICAgaWYgKG8uYXV0b0hpZGVPbkNsaWNrKSB7IGNyb3NzdmVudFtvcF0oZG9jdW1lbnQsICdjbGljaycsIGhpZGVPbkNsaWNrKTsgfVxuICAgIGlmIChmb3JtKSB7IGNyb3NzdmVudFtvcF0oZm9ybSwgJ3N1Ym1pdCcsIGhpZGUpOyB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBpbnB1dEV2ZW50cyh0cnVlKTtcbiAgICBleWUuZGVzdHJveSgpO1xuICAgIGlmIChwYXJlbnQuY29udGFpbnModWwpKSB7IHBhcmVudC5yZW1vdmVDaGlsZCh1bCk7IH1cbiAgICBjcm9zc3ZlbnQucmVtb3ZlKGVsLCAnZm9jdXMnLCBvbmVsb2FkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmF1bHRTZXR0ZXIgKHZhbHVlKSB7XG4gICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmF1bHRSZW5kZXJlciAobGksIHN1Z2dlc3Rpb24pIHtcbiAgICBsaS5pbm5lclRleHQgPSBsaS50ZXh0Q29udGVudCA9IGdldFRleHQoc3VnZ2VzdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBkZWZhdWx0RmlsdGVyIChxLCBzdWdnZXN0aW9uKSB7XG4gICAgdmFyIHRleHQgPSBnZXRUZXh0KHN1Z2dlc3Rpb24pIHx8ICcnO1xuICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKHN1Z2dlc3Rpb24pIHx8ICcnO1xuICAgIHJldHVybiBmdXp6eXNlYXJjaChxLCB0ZXh0LnRvTG93ZXJDYXNlKCkpIHx8IGZ1enp5c2VhcmNoKHEsIHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXRWYWx1ZSAoc3VnZ2VzdGlvbikge1xuICByZXR1cm4gdHlwZW9mIHN1Z2dlc3Rpb24gPT09ICdzdHJpbmcnID8gc3VnZ2VzdGlvbiA6IHN1Z2dlc3Rpb24udmFsdWU7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXRUZXh0IChzdWdnZXN0aW9uKSB7XG4gIHJldHVybiB0eXBlb2Ygc3VnZ2VzdGlvbiA9PT0gJ3N0cmluZycgPyBzdWdnZXN0aW9uIDogc3VnZ2VzdGlvbi50ZXh0O1xufVxuXG5mdW5jdGlvbiB0YWcgKHR5cGUsIGNsYXNzTmFtZSkge1xuICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBlbC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gIHJldHVybiBlbDtcbn1cblxuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGRpc3Bvc2VkO1xuICBmdW5jdGlvbiBkaXNwb3NhYmxlICgpIHtcbiAgICBpZiAoZGlzcG9zZWQpIHsgcmV0dXJuOyB9XG4gICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgIChmbiB8fCBub29wKS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICB9XG4gIHJldHVybiBkaXNwb3NhYmxlO1xufVxuXG5mdW5jdGlvbiBkZWZlciAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhvcnNleTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIHRocm90dGxlID0gcmVxdWlyZSgnLi90aHJvdHRsZScpO1xudmFyIHRhaWxvcm1hZGUgPSByZXF1aXJlKCcuL3RhaWxvcm1hZGUnKTtcblxuZnVuY3Rpb24gYnVsbHNleWUgKGVsLCB0YXJnZXQsIG9wdGlvbnMpIHtcbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgZGVzdHJveWVkID0gZmFsc2U7XG4gIHZhciB0aHJvdHRsZWRQb3NpdGlvbiA9IHRocm90dGxlKHBvc2l0aW9uLCAzMCk7XG4gIHZhciB0YWlsb3IgPSBvLmNhcmV0ICYmIHRhaWxvcm1hZGUodGFyZ2V0LCB7IHVwZGF0ZTogdXBkYXRlLCBwb3NpdGlvbnM6IFsnc3RhcnQnXSB9KTtcblxuICBwb3NpdGlvbigpO1xuXG4gIGlmIChvLnRyYWNraW5nICE9PSBmYWxzZSkge1xuICAgIGNyb3NzdmVudC5hZGQod2luZG93LCAncmVzaXplJywgdGhyb3R0bGVkUG9zaXRpb24pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZWZyZXNoOiBwb3NpdGlvbixcbiAgICBkZXN0cm95OiBkZXN0cm95XG4gIH07XG5cbiAgZnVuY3Rpb24gdXBkYXRlIChyZWFkaW5ncykge1xuICAgIHRocm90dGxlZFBvc2l0aW9uKHJlYWRpbmdzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvc2l0aW9uIChyZWFkaW5ncykge1xuICAgIGlmIChkZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQnVsbHNleWUgY2FuXFwndCByZWZyZXNoIGFmdGVyIGJlaW5nIGRlc3Ryb3llZC4gQ3JlYXRlIGFub3RoZXIgaW5zdGFuY2UgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgaWYgKHRhaWxvciAmJiAhcmVhZGluZ3MpIHtcbiAgICAgIHRhaWxvci5yZWZyZXNoKCk7IHJldHVybjtcbiAgICB9XG4gICAgdmFyIGJvdW5kcyA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB2YXIgc2Nyb2xsVG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAocmVhZGluZ3MpIHtcbiAgICAgIGVsLnN0eWxlLnRvcCA9IGJvdW5kcy50b3AgKyBzY3JvbGxUb3AgKyByZWFkaW5ncy5zdGFydC55ICsgMjAgKyAncHgnO1xuICAgICAgZWwuc3R5bGUubGVmdCA9IGJvdW5kcy5sZWZ0ICsgcmVhZGluZ3Muc3RhcnQueCArICdweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlLnRvcCAgPSBib3VuZHMudG9wICsgc2Nyb2xsVG9wICsgdGFyZ2V0Lm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICBlbC5zdHlsZS5sZWZ0ID0gYm91bmRzLmxlZnQgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0YWlsb3IpIHsgdGFpbG9yLmRlc3Ryb3koKTsgfVxuICAgIGNyb3NzdmVudC5yZW1vdmUod2luZG93LCAncmVzaXplJywgdGhyb3R0bGVkUG9zaXRpb24pO1xuICAgIGRlc3Ryb3llZCA9IHRydWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWxsc2V5ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldCA9IGVhc3lHZXQ7XG52YXIgc2V0ID0gZWFzeVNldDtcblxuaWYgKGRvY3VtZW50LnNlbGVjdGlvbiAmJiBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UpIHtcbiAgZ2V0ID0gaGFyZEdldDtcbiAgc2V0ID0gaGFyZFNldDtcbn1cblxuZnVuY3Rpb24gZWFzeUdldCAoZWwpIHtcbiAgcmV0dXJuIHtcbiAgICBzdGFydDogZWwuc2VsZWN0aW9uU3RhcnQsXG4gICAgZW5kOiBlbC5zZWxlY3Rpb25FbmRcbiAgfTtcbn1cblxuZnVuY3Rpb24gaGFyZEdldCAoZWwpIHtcbiAgdmFyIGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIGlmIChhY3RpdmUgIT09IGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxuXG4gIHZhciByYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICB2YXIgYm9va21hcmsgPSByYW5nZS5nZXRCb29rbWFyaygpO1xuICB2YXIgb3JpZ2luYWwgPSBlbC52YWx1ZTtcbiAgdmFyIG1hcmtlciA9IGdldFVuaXF1ZU1hcmtlcihvcmlnaW5hbCk7XG4gIHZhciBwYXJlbnQgPSByYW5nZS5wYXJlbnRFbGVtZW50KCk7XG4gIGlmIChwYXJlbnQgPT09IG51bGwgfHwgIWlucHV0cyhwYXJlbnQpKSB7XG4gICAgcmV0dXJuIHJlc3VsdCgwLCAwKTtcbiAgfVxuICByYW5nZS50ZXh0ID0gbWFya2VyICsgcmFuZ2UudGV4dCArIG1hcmtlcjtcblxuICB2YXIgY29udGVudHMgPSBlbC52YWx1ZTtcblxuICBlbC52YWx1ZSA9IG9yaWdpbmFsO1xuICByYW5nZS5tb3ZlVG9Cb29rbWFyayhib29rbWFyayk7XG4gIHJhbmdlLnNlbGVjdCgpO1xuXG4gIHJldHVybiByZXN1bHQoY29udGVudHMuaW5kZXhPZihtYXJrZXIpLCBjb250ZW50cy5sYXN0SW5kZXhPZihtYXJrZXIpIC0gbWFya2VyLmxlbmd0aCk7XG5cbiAgZnVuY3Rpb24gcmVzdWx0IChzdGFydCwgZW5kKSB7XG4gICAgaWYgKGFjdGl2ZSAhPT0gZWwpIHsgLy8gZG9uJ3QgZGlzcnVwdCBwcmUtZXhpc3Rpbmcgc3RhdGVcbiAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgYWN0aXZlLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5ibHVyKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRVbmlxdWVNYXJrZXIgKGNvbnRlbnRzKSB7XG4gIHZhciBtYXJrZXI7XG4gIGRvIHtcbiAgICBtYXJrZXIgPSAnQEBtYXJrZXIuJyArIE1hdGgucmFuZG9tKCkgKiBuZXcgRGF0ZSgpO1xuICB9IHdoaWxlIChjb250ZW50cy5pbmRleE9mKG1hcmtlcikgIT09IC0xKTtcbiAgcmV0dXJuIG1hcmtlcjtcbn1cblxuZnVuY3Rpb24gaW5wdXRzIChlbCkge1xuICByZXR1cm4gKChlbC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsLnR5cGUgPT09ICd0ZXh0JykgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJyk7XG59XG5cbmZ1bmN0aW9uIGVhc3lTZXQgKGVsLCBwKSB7XG4gIGVsLnNlbGVjdGlvblN0YXJ0ID0gcGFyc2UoZWwsIHAuc3RhcnQpO1xuICBlbC5zZWxlY3Rpb25FbmQgPSBwYXJzZShlbCwgcC5lbmQpO1xufVxuXG5mdW5jdGlvbiBoYXJkU2V0IChlbCwgcCkge1xuICB2YXIgcmFuZ2UgPSBlbC5jcmVhdGVUZXh0UmFuZ2UoKTtcblxuICBpZiAocC5zdGFydCA9PT0gJ2VuZCcgJiYgcC5lbmQgPT09ICdlbmQnKSB7XG4gICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgIHJhbmdlLnNlbGVjdCgpO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIHBhcnNlKGVsLCBwLmVuZCkpO1xuICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgcGFyc2UoZWwsIHAuc3RhcnQpKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZSAoZWwsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gJ2VuZCcgPyBlbC52YWx1ZS5sZW5ndGggOiB2YWx1ZSB8fCAwO1xufVxuXG5mdW5jdGlvbiBzZWxsIChlbCwgcCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHNldChlbCwgcCk7XG4gIH1cbiAgcmV0dXJuIGdldChlbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNlbGwgPSByZXF1aXJlKCdzZWxsJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgcHJvcHMgPSBbXG4gICdkaXJlY3Rpb24nLFxuICAnYm94U2l6aW5nJyxcbiAgJ3dpZHRoJyxcbiAgJ2hlaWdodCcsXG4gICdvdmVyZmxvd1gnLFxuICAnb3ZlcmZsb3dZJyxcbiAgJ2JvcmRlclRvcFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdCb3R0b20nLFxuICAncGFkZGluZ0xlZnQnLFxuICAnZm9udFN0eWxlJyxcbiAgJ2ZvbnRWYXJpYW50JyxcbiAgJ2ZvbnRXZWlnaHQnLFxuICAnZm9udFN0cmV0Y2gnLFxuICAnZm9udFNpemUnLFxuICAnZm9udFNpemVBZGp1c3QnLFxuICAnbGluZUhlaWdodCcsXG4gICdmb250RmFtaWx5JyxcbiAgJ3RleHRBbGlnbicsXG4gICd0ZXh0VHJhbnNmb3JtJyxcbiAgJ3RleHRJbmRlbnQnLFxuICAndGV4dERlY29yYXRpb24nLFxuICAnbGV0dGVyU3BhY2luZycsXG4gICd3b3JkU3BhY2luZydcbl07XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgZmYgPSB3aW5kb3cubW96SW5uZXJTY3JlZW5YICE9PSBudWxsICYmIHdpbmRvdy5tb3pJbm5lclNjcmVlblggIT09IHZvaWQgMDtcblxuZnVuY3Rpb24gdGFpbG9ybWFkZSAoZWwsIG9wdGlvbnMpIHtcbiAgdmFyIHRocm90dGxlZFJlZnJlc2ggPSB0aHJvdHRsZShyZWZyZXNoLCAzMCk7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKG8ucG9zaXRpb25zID09PSB2b2lkIDApIHsgby5wb3NpdGlvbnMgPSBbJ3N0YXJ0JywgJ2VuZCcsICdhbGwnXTsgfVxuXG4gIGJpbmQoKTtcblxuICByZXR1cm4ge1xuICAgIHJlZnJlc2g6IHRocm90dGxlZFJlZnJlc2gsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xuXG4gIGZ1bmN0aW9uIHJlZnJlc2ggKCkge1xuICAgIHZhciBwID0gc2VsbChlbCk7XG4gICAgdmFyIGNvbnRleHQgPSBwcmVwYXJlKCk7XG4gICAgdmFyIHJlYWRpbmdzID0ge307XG5cbiAgICBpZiAoby5wb3NpdGlvbnMuaW5kZXhPZignc3RhcnQnKSAhPT0gLTEpIHsgYWRkKCdzdGFydCcsIHAuc3RhcnQpOyB9XG4gICAgaWYgKG8ucG9zaXRpb25zLmluZGV4T2YoJ2VuZCcpICE9PSAtMSkgeyBhZGQoJ2VuZCcsIHAuZW5kKTsgfVxuICAgIGlmIChvLnBvc2l0aW9ucy5pbmRleE9mKCdhbGwnKSAhPT0gLTEpIHsgYWRkKCdhbGwnLCBlbC52YWx1ZS5sZW5ndGgpOyB9XG5cbiAgICBkb2MuYm9keS5yZW1vdmVDaGlsZChjb250ZXh0Lm1pcnJvcik7XG4gICAgby51cGRhdGUocmVhZGluZ3MpO1xuXG4gICAgZnVuY3Rpb24gYWRkIChuYW1lLCBwKSB7XG4gICAgICByZWFkaW5nc1tuYW1lXSA9IGNvb3Jkcyhjb250ZXh0LCBwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcmVwYXJlICgpIHtcbiAgICB2YXIgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSA/IGdldENvbXB1dGVkU3R5bGUoZWwpIDogZWwuY3VycmVudFN0eWxlO1xuICAgIHZhciBtaXJyb3IgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIHN0eWxlID0gbWlycm9yLnN0eWxlO1xuXG4gICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQobWlycm9yKTtcblxuICAgIGlmIChlbC50YWdOYW1lICE9PSAnSU5QVVQnKSB7XG4gICAgICBzdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJztcbiAgICB9XG4gICAgc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCc7XG4gICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICBwcm9wcy5mb3JFYWNoKGNvcHkpO1xuXG4gICAgaWYgKGZmKSB7XG4gICAgICBzdHlsZS53aWR0aCA9IHBhcnNlSW50KGNvbXB1dGVkLndpZHRoKSAtIDIgKyAncHgnO1xuICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+IHBhcnNlSW50KGNvbXB1dGVkLmhlaWdodCkpIHtcbiAgICAgICAgc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgfVxuICAgIHJldHVybiB7IG1pcnJvcjogbWlycm9yLCBjb21wdXRlZDogY29tcHV0ZWQgfTtcblxuICAgIGZ1bmN0aW9uIGNvcHkgKHByb3ApIHtcbiAgICAgIHN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY29vcmRzIChjb250ZXh0LCBwKSB7XG4gICAgdmFyIHJlc3QgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHZhciBtaXJyb3IgPSBjb250ZXh0Lm1pcnJvcjtcbiAgICB2YXIgY29tcHV0ZWQgPSBjb250ZXh0LmNvbXB1dGVkO1xuXG4gICAgbWlycm9yLnRleHRDb250ZW50ID0gZWwudmFsdWUuc3Vic3RyaW5nKDAsIHApO1xuXG4gICAgaWYgKGVsLnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgIG1pcnJvci50ZXh0Q29udGVudCA9IG1pcnJvci50ZXh0Q29udGVudC5yZXBsYWNlKC9cXHMvZywgJ1xcdTAwYTAnKTtcbiAgICB9XG5cbiAgICByZXN0LnRleHRDb250ZW50ID0gZWwudmFsdWUuc3Vic3RyaW5nKHApIHx8ICcuJztcbiAgICBtaXJyb3IuYXBwZW5kQ2hpbGQocmVzdCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogcmVzdC5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlckxlZnRXaWR0aCddKSxcbiAgICAgIHk6IHJlc3Qub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlclRvcFdpZHRoJ10pXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmQgKHJlbW92ZSkge1xuICAgIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleWRvd24nLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAna2V5dXAnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAnaW5wdXQnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAncGFzdGUnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAnY2hhbmdlJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBiaW5kKHRydWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGFpbG9ybWFkZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gdGhyb3R0bGUgKGZuLCBib3VuZGFyeSkge1xuICB2YXIgbGFzdCA9IC1JbmZpbml0eTtcbiAgdmFyIHRpbWVyO1xuICByZXR1cm4gZnVuY3Rpb24gYm91bmNlZCAoKSB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHVuYm91bmQoKTtcblxuICAgIGZ1bmN0aW9uIHVuYm91bmQgKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIHZhciBuZXh0ID0gbGFzdCArIGJvdW5kYXJ5O1xuICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICBpZiAobm93ID4gbmV4dCkge1xuICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCh1bmJvdW5kLCBuZXh0IC0gbm93KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBhZGRFdmVudCA9IGFkZEV2ZW50RWFzeTtcbnZhciByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50RWFzeTtcbnZhciBoYXJkQ2FjaGUgPSBbXTtcblxuaWYgKCFnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICBhZGRFdmVudCA9IGFkZEV2ZW50SGFyZDtcbiAgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEhhcmQ7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50RWFzeSAoZWwsIHR5cGUsIGZuLCBjYXB0dXJpbmcpIHtcbiAgcmV0dXJuIGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGNhcHR1cmluZyk7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50SGFyZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBlbC5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgd3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCB1bndyYXAoZWwsIHR5cGUsIGZuKSk7XG59XG5cbmZ1bmN0aW9uIGZhYnJpY2F0ZUV2ZW50IChlbCwgdHlwZSkge1xuICB2YXIgZTtcbiAgaWYgKGRvYy5jcmVhdGVFdmVudCkge1xuICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZS5pbml0RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICBlID0gZG9jLmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgZWwuZmlyZUV2ZW50KCdvbicgKyB0eXBlLCBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwcGVyRmFjdG9yeSAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwcGVyIChvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSBvcmlnaW5hbEV2ZW50IHx8IGdsb2JhbC5ldmVudDtcbiAgICBlLnRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0ICA9IGUucHJldmVudERlZmF1bHQgIHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGZuLmNhbGwoZWwsIGUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIHdyYXBwZXIgPSB1bndyYXAoZWwsIHR5cGUsIGZuKSB8fCB3cmFwcGVyRmFjdG9yeShlbCwgdHlwZSwgZm4pO1xuICBoYXJkQ2FjaGUucHVzaCh7XG4gICAgd3JhcHBlcjogd3JhcHBlcixcbiAgICBlbGVtZW50OiBlbCxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGZuOiBmblxuICB9KTtcbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIHVud3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpID0gZmluZChlbCwgdHlwZSwgZm4pO1xuICBpZiAoaSkge1xuICAgIHZhciB3cmFwcGVyID0gaGFyZENhY2hlW2ldLndyYXBwZXI7XG4gICAgaGFyZENhY2hlLnNwbGljZShpLCAxKTsgLy8gZnJlZSB1cCBhIHRhZCBvZiBtZW1vcnlcbiAgICByZXR1cm4gd3JhcHBlcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGksIGl0ZW07XG4gIGZvciAoaSA9IDA7IGkgPCBoYXJkQ2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBpdGVtID0gaGFyZENhY2hlW2ldO1xuICAgIGlmIChpdGVtLmVsZW1lbnQgPT09IGVsICYmIGl0ZW0udHlwZSA9PT0gdHlwZSAmJiBpdGVtLmZuID09PSBmbikge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZEV2ZW50LFxuICByZW1vdmU6IHJlbW92ZUV2ZW50LFxuICBmYWJyaWNhdGU6IGZhYnJpY2F0ZUV2ZW50XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBmdXp6eXNlYXJjaCAobmVlZGxlLCBoYXlzdGFjaykge1xuICB2YXIgdGxlbiA9IGhheXN0YWNrLmxlbmd0aDtcbiAgdmFyIHFsZW4gPSBuZWVkbGUubGVuZ3RoO1xuICBpZiAocWxlbiA+IHRsZW4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHFsZW4gPT09IHRsZW4pIHtcbiAgICByZXR1cm4gbmVlZGxlID09PSBoYXlzdGFjaztcbiAgfVxuICBvdXRlcjogZm9yICh2YXIgaSA9IDAsIGogPSAwOyBpIDwgcWxlbjsgaSsrKSB7XG4gICAgdmFyIG5jaCA9IG5lZWRsZS5jaGFyQ29kZUF0KGkpO1xuICAgIHdoaWxlIChqIDwgdGxlbikge1xuICAgICAgaWYgKGhheXN0YWNrLmNoYXJDb2RlQXQoaisrKSA9PT0gbmNoKSB7XG4gICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnV6enlzZWFyY2g7XG4iXX0=
