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
    position(readings);
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
    unbound();

    function unbound () {
      clearTimeout(timer);
      timer = null;
      var next = last + boundary;
      var now = Date.now();
      if (now > next) {
        last = now;
        fn();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJob3JzZXkuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvYnVsbHNleWUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL3NlbGwvc2VsbC5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS90YWlsb3JtYWRlLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL3Rocm90dGxlLmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2Z1enp5c2VhcmNoL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBidWxsc2V5ZSA9IHJlcXVpcmUoJ2J1bGxzZXllJyk7XG52YXIgZnV6enlzZWFyY2ggPSByZXF1aXJlKCdmdXp6eXNlYXJjaCcpO1xudmFyIEtFWV9FTlRFUiA9IDEzO1xudmFyIEtFWV9FU0MgPSAyNztcbnZhciBLRVlfVVAgPSAzODtcbnZhciBLRVlfRE9XTiA9IDQwO1xuXG5mdW5jdGlvbiBob3JzZXkgKGVsLCBvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHBhcmVudCA9IG8uYXBwZW5kVG8gfHwgZG9jdW1lbnQuYm9keTtcbiAgdmFyIHJlbmRlciA9IG8ucmVuZGVyIHx8IGRlZmF1bHRSZW5kZXJlcjtcbiAgdmFyIGdldFRleHQgPSBvLmdldFRleHQgfHwgZGVmYXVsdEdldFRleHQ7XG4gIHZhciBnZXRWYWx1ZSA9IG8uZ2V0VmFsdWUgfHwgZGVmYXVsdEdldFZhbHVlO1xuICB2YXIgc2V0ID0gby5zZXQgfHwgZGVmYXVsdFNldHRlcjtcbiAgdmFyIGZvcm0gPSBvLmZvcm07XG4gIHZhciBzdWdnZXN0aW9ucyA9IG8uc3VnZ2VzdGlvbnM7XG4gIHZhciBmaWx0ZXIgPSBvLmZpbHRlciB8fCBkZWZhdWx0RmlsdGVyO1xuICB2YXIgdWwgPSB0YWcoJ3VsJywgJ3NleS1saXN0Jyk7XG4gIHZhciBzZWxlY3Rpb24gPSBudWxsO1xuICB2YXIgb25lbG9hZCA9IG9uY2UobG9hZGluZyk7XG4gIHZhciBleWU7XG4gIHZhciBkZWZlcnJlZEZpbHRlcmluZyA9IGRlZmVyKGZpbHRlcmluZyk7XG5cbiAgaWYgKG8uYXV0b0hpZGVPbkJsdXIgPT09IHZvaWQgMCkgeyBvLmF1dG9IaWRlT25CbHVyID0gdHJ1ZTsgfVxuICBpZiAoby5hdXRvSGlkZU9uQ2xpY2sgPT09IHZvaWQgMCkgeyBvLmF1dG9IaWRlT25DbGljayA9IHRydWU7IH1cbiAgaWYgKG8uYXV0b1Nob3dPblVwRG93biA9PT0gdm9pZCAwKSB7IG8uYXV0b1Nob3dPblVwRG93biA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCc7IH1cblxuICBwYXJlbnQuYXBwZW5kQ2hpbGQodWwpO1xuICBlbC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdvZmYnKTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShzdWdnZXN0aW9ucykpIHtcbiAgICBsb2FkZWQoc3VnZ2VzdGlvbnMpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzdWdnZXN0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNyb3NzdmVudC5hZGQoZWwsICdmb2N1cycsIG9uZWxvYWQpO1xuICB9XG5cbiAgaW5wdXRFdmVudHMoKTtcbiAgZXllID0gYnVsbHNleWUodWwsIGVsLCB7IGNhcmV0OiBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnIH0pO1xuXG4gIHJldHVybiB7XG4gICAgYWRkOiBhZGQsXG4gICAgY2xlYXI6IGNsZWFyLFxuICAgIHNob3c6IHNob3csXG4gICAgaGlkZTogaGlkZSxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHJlZnJlc2hQb3NpdGlvbjogZXllLnJlZnJlc2gsXG4gICAgZGVmYXVsdFJlbmRlcmVyOiBkZWZhdWx0UmVuZGVyZXIsXG4gICAgZGVmYXVsdEdldFRleHQ6IGRlZmF1bHRHZXRUZXh0LFxuICAgIGRlZmF1bHRHZXRWYWx1ZTogZGVmYXVsdEdldFZhbHVlLFxuICAgIGRlZmF1bHRTZXR0ZXI6IGRlZmF1bHRTZXR0ZXIsXG4gICAgZGVmYXVsdEZpbHRlcjogZGVmYXVsdEZpbHRlclxuICB9O1xuXG4gIGZ1bmN0aW9uIGxvYWRpbmcgKCkge1xuICAgIGNyb3NzdmVudC5yZW1vdmUoZWwsICdmb2N1cycsIG9uZWxvYWQpO1xuICAgIHN1Z2dlc3Rpb25zKGxvYWRlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkZWQgKHN1Z2dlc3Rpb25zKSB7XG4gICAgc3VnZ2VzdGlvbnMuZm9yRWFjaChhZGQpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgIHdoaWxlICh1bC5sYXN0Q2hpbGQpIHtcbiAgICAgIHVsLnJlbW92ZUNoaWxkKHVsLmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkIChzdWdnZXN0aW9uKSB7XG4gICAgdmFyIGxpID0gdGFnKCdsaScsICdzZXktaXRlbScpO1xuICAgIHJlbmRlcihsaSwgc3VnZ2VzdGlvbik7XG4gICAgY3Jvc3N2ZW50LmFkZChsaSwgJ2NsaWNrJywgc2VsZWN0KTtcbiAgICBjcm9zc3ZlbnQuYWRkKGxpLCAnaG9yc2V5LWZpbHRlcicsIGZpbHRlckl0ZW0pO1xuICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgICByZXR1cm4gbGk7XG5cbiAgICBmdW5jdGlvbiBzZWxlY3QgKCkge1xuICAgICAgc2V0KGdldFZhbHVlKHN1Z2dlc3Rpb24pKTtcbiAgICAgIGhpZGUoKTtcbiAgICAgIGVsLmZvY3VzKCk7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGVsLCAnaG9yc2V5LXNlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVySXRlbSAoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBlbC52YWx1ZTtcbiAgICAgIGlmIChmaWx0ZXIodmFsdWUsIHN1Z2dlc3Rpb24pKSB7XG4gICAgICAgIGxpLmNsYXNzTmFtZSA9IGxpLmNsYXNzTmFtZS5yZXBsYWNlKC8gc2V5LWhpZGUvZywgJycpO1xuICAgICAgfSBlbHNlIGlmICghaGlkZGVuKGxpKSkge1xuICAgICAgICBsaS5jbGFzc05hbWUgKz0gJyBzZXktaGlkZSc7XG4gICAgICAgIGlmIChzZWxlY3Rpb24gPT09IGxpKSB7XG4gICAgICAgICAgdW5zZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZpc2libGUgKCkge1xuICAgIHJldHVybiB1bC5jbGFzc05hbWUuaW5kZXhPZignc2V5LXNob3cnKSAhPT0gLTE7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRkZW4gKGxpKSB7XG4gICAgcmV0dXJuIGxpLmNsYXNzTmFtZS5pbmRleE9mKCdzZXktaGlkZScpICE9PSAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3cgKCkge1xuICAgIGlmICghdmlzaWJsZSgpKSB7XG4gICAgICB1bC5jbGFzc05hbWUgKz0gJyBzZXktc2hvdyc7XG4gICAgICBleWUucmVmcmVzaCgpO1xuICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShlbCwgJ2hvcnNleS1zaG93Jyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0IChlbCkge1xuICAgIHVuc2VsZWN0KCk7XG4gICAgaWYgKGVsKSB7XG4gICAgICBzZWxlY3Rpb24gPSBlbDtcbiAgICAgIHNlbGVjdGlvbi5jbGFzc05hbWUgKz0gJyBzZXktc2VsZWN0ZWQnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVuc2VsZWN0ICgpIHtcbiAgICBpZiAoc2VsZWN0aW9uKSB7XG4gICAgICBzZWxlY3Rpb24uY2xhc3NOYW1lID0gc2VsZWN0aW9uLmNsYXNzTmFtZS5yZXBsYWNlKC8gc2V5LXNlbGVjdGVkL2csICcnKTtcbiAgICAgIHNlbGVjdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbW92ZSAodXAsIG1vdmVzKSB7XG4gICAgdmFyIHRvdGFsID0gdWwuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIGlmICh0b3RhbCA8IG1vdmVzKSB7XG4gICAgICB1bnNlbGVjdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodG90YWwgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGZpcnN0ID0gdXAgPyAnbGFzdENoaWxkJyA6ICdmaXJzdENoaWxkJztcbiAgICB2YXIgbmV4dCA9IHVwID8gJ3ByZXZpb3VzU2libGluZycgOiAnbmV4dFNpYmxpbmcnO1xuICAgIHZhciBlbCA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb25bbmV4dF0gfHwgdWxbZmlyc3RdO1xuXG4gICAgc2VsZWN0KGVsKTtcblxuICAgIGlmIChoaWRkZW4oZWwpKSB7XG4gICAgICBtb3ZlKHVwLCBtb3ZlcyA/IG1vdmVzICsgMSA6IDEpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGUgKCkge1xuICAgIHVsLmNsYXNzTmFtZSA9IHVsLmNsYXNzTmFtZS5yZXBsYWNlKC8gc2V5LXNob3cvZywgJycpO1xuICAgIHVuc2VsZWN0KCk7XG4gICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShlbCwgJ2hvcnNleS1oaWRlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBrZXlkb3duIChlKSB7XG4gICAgdmFyIHNob3duID0gdmlzaWJsZSgpO1xuICAgIHZhciB3aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmICh3aGljaCA9PT0gS0VZX0RPV04pIHtcbiAgICAgIGlmIChvLmF1dG9TaG93T25VcERvd24pIHtcbiAgICAgICAgc2hvdygpO1xuICAgICAgfVxuICAgICAgaWYgKHNob3duKSB7XG4gICAgICAgIG1vdmUoKTtcbiAgICAgICAgc3RvcChlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHdoaWNoID09PSBLRVlfVVApIHtcbiAgICAgIGlmIChvLmF1dG9TaG93T25VcERvd24pIHtcbiAgICAgICAgc2hvdygpO1xuICAgICAgfVxuICAgICAgaWYgKHNob3duKSB7XG4gICAgICAgIG1vdmUodHJ1ZSk7XG4gICAgICAgIHN0b3AoZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzaG93bikge1xuICAgICAgaWYgKHdoaWNoID09PSBLRVlfRU5URVIpIHtcbiAgICAgICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoc2VsZWN0aW9uLCAnY2xpY2snKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RvcChlKTtcbiAgICAgIH0gZWxzZSBpZiAod2hpY2ggPT09IEtFWV9FU0MpIHtcbiAgICAgICAgaGlkZSgpO1xuICAgICAgICBzdG9wKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AgKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlcmluZyAoKSB7XG4gICAgaWYgKCF2aXNpYmxlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGxpID0gdWwuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAobGkpIHtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUobGksICdob3JzZXktZmlsdGVyJyk7XG4gICAgICBsaSA9IGxpLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGlvbikge1xuICAgICAgbW92ZSgpO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGlvbikge1xuICAgICAgaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmVycmVkS2V5ZG93biAoZSkge1xuICAgIHZhciB3aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmICh3aGljaCA9PT0gS0VZX0VOVEVSKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlZmVycmVkRmlsdGVyaW5nKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWZlcnJlZFNob3cgKGUpIHtcbiAgICB2YXIgd2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAod2hpY2ggPT09IEtFWV9FTlRFUikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KHNob3csIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gaG9yc2V5RXZlbnRUYXJnZXQgKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldCA9PT0gZWwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB3aGlsZSAodGFyZ2V0KSB7XG4gICAgICBpZiAodGFyZ2V0ID09PSB1bCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVPbkJsdXIgKGUpIHtcbiAgICBpZiAoaG9yc2V5RXZlbnRUYXJnZXQoZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZU9uQ2xpY2sgKGUpIHtcbiAgICBpZiAoaG9yc2V5RXZlbnRUYXJnZXQoZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5wdXRFdmVudHMgKHJlbW92ZSkge1xuICAgIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleXByZXNzJywgZGVmZXJyZWRTaG93KTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAna2V5cHJlc3MnLCBkZWZlcnJlZEZpbHRlcmluZyk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ3Bhc3RlJywgZGVmZXJyZWRGaWx0ZXJpbmcpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXlkb3duJywgZGVmZXJyZWRLZXlkb3duKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAna2V5ZG93bicsIGtleWRvd24pO1xuICAgIGlmIChvLmF1dG9IaWRlT25CbHVyKSB7IGNyb3NzdmVudFtvcF0oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnZm9jdXMnLCBoaWRlT25CbHVyLCB0cnVlKTsgfVxuICAgIGlmIChvLmF1dG9IaWRlT25DbGljaykgeyBjcm9zc3ZlbnRbb3BdKGRvY3VtZW50LCAnY2xpY2snLCBoaWRlT25DbGljayk7IH1cbiAgICBpZiAoZm9ybSkgeyBjcm9zc3ZlbnRbb3BdKGZvcm0sICdzdWJtaXQnLCBoaWRlKTsgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgaW5wdXRFdmVudHModHJ1ZSk7XG4gICAgZXllLmRlc3Ryb3koKTtcbiAgICBpZiAocGFyZW50LmNvbnRhaW5zKHVsKSkgeyBwYXJlbnQucmVtb3ZlQ2hpbGQodWwpOyB9XG4gICAgY3Jvc3N2ZW50LnJlbW92ZShlbCwgJ2ZvY3VzJywgb25lbG9hZCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWZhdWx0U2V0dGVyICh2YWx1ZSkge1xuICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBkZWZhdWx0UmVuZGVyZXIgKGxpLCBzdWdnZXN0aW9uKSB7XG4gICAgbGkuaW5uZXJUZXh0ID0gbGkudGV4dENvbnRlbnQgPSBnZXRUZXh0KHN1Z2dlc3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdEZpbHRlciAocSwgc3VnZ2VzdGlvbikge1xuICAgIHZhciB0ZXh0ID0gZ2V0VGV4dChzdWdnZXN0aW9uKSB8fCAnJztcbiAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShzdWdnZXN0aW9uKSB8fCAnJztcbiAgICByZXR1cm4gZnV6enlzZWFyY2gocSwgdGV4dC50b0xvd2VyQ2FzZSgpKSB8fCBmdXp6eXNlYXJjaChxLCB2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0VmFsdWUgKHN1Z2dlc3Rpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiBzdWdnZXN0aW9uID09PSAnc3RyaW5nJyA/IHN1Z2dlc3Rpb24gOiBzdWdnZXN0aW9uLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0VGV4dCAoc3VnZ2VzdGlvbikge1xuICByZXR1cm4gdHlwZW9mIHN1Z2dlc3Rpb24gPT09ICdzdHJpbmcnID8gc3VnZ2VzdGlvbiA6IHN1Z2dlc3Rpb24udGV4dDtcbn1cblxuZnVuY3Rpb24gdGFnICh0eXBlLCBjbGFzc05hbWUpIHtcbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICByZXR1cm4gZWw7XG59XG5cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBkaXNwb3NlZDtcbiAgZnVuY3Rpb24gZGlzcG9zYWJsZSAoKSB7XG4gICAgaWYgKGRpc3Bvc2VkKSB7IHJldHVybjsgfVxuICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAoZm4gfHwgbm9vcCkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgfVxuICByZXR1cm4gZGlzcG9zYWJsZTtcbn1cblxuZnVuY3Rpb24gZGVmZXIgKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dChmbiwgMCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxubW9kdWxlLmV4cG9ydHMgPSBob3JzZXk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciB0aHJvdHRsZSA9IHJlcXVpcmUoJy4vdGhyb3R0bGUnKTtcbnZhciB0YWlsb3JtYWRlID0gcmVxdWlyZSgnLi90YWlsb3JtYWRlJyk7XG5cbmZ1bmN0aW9uIGJ1bGxzZXllIChlbCwgdGFyZ2V0LCBvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGRlc3Ryb3llZCA9IGZhbHNlO1xuICB2YXIgdGhyb3R0bGVkUG9zaXRpb24gPSB0aHJvdHRsZShwb3NpdGlvbiwgMzApO1xuICB2YXIgdGFpbG9yID0gby5jYXJldCAmJiB0YWlsb3JtYWRlKHRhcmdldCwgeyB1cGRhdGU6IHVwZGF0ZSwgcG9zaXRpb25zOiBbJ3N0YXJ0J10gfSk7XG5cbiAgcG9zaXRpb24oKTtcblxuICBpZiAoby50cmFja2luZyAhPT0gZmFsc2UpIHtcbiAgICBjcm9zc3ZlbnQuYWRkKHdpbmRvdywgJ3Jlc2l6ZScsIHRocm90dGxlZFBvc2l0aW9uKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVmcmVzaDogcG9zaXRpb24sXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZSAocmVhZGluZ3MpIHtcbiAgICBwb3NpdGlvbihyZWFkaW5ncyk7XG4gIH1cblxuICBmdW5jdGlvbiBwb3NpdGlvbiAocmVhZGluZ3MpIHtcbiAgICBpZiAoZGVzdHJveWVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1bGxzZXllIGNhblxcJ3QgcmVmcmVzaCBhZnRlciBiZWluZyBkZXN0cm95ZWQuIENyZWF0ZSBhbm90aGVyIGluc3RhbmNlIGluc3RlYWQuJyk7XG4gICAgfVxuICAgIGlmICh0YWlsb3IgJiYgIXJlYWRpbmdzKSB7XG4gICAgICB0YWlsb3IucmVmcmVzaCgpOyByZXR1cm47XG4gICAgfVxuICAgIHZhciBib3VuZHMgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIHNjcm9sbFRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKHJlYWRpbmdzKSB7XG4gICAgICBlbC5zdHlsZS50b3AgPSBib3VuZHMudG9wICsgc2Nyb2xsVG9wICsgcmVhZGluZ3Muc3RhcnQueSArIDIwICsgJ3B4JztcbiAgICAgIGVsLnN0eWxlLmxlZnQgPSBib3VuZHMubGVmdCArIHJlYWRpbmdzLnN0YXJ0LnggKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZS50b3AgID0gYm91bmRzLnRvcCArIHNjcm9sbFRvcCArIHRhcmdldC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgZWwuc3R5bGUubGVmdCA9IGJvdW5kcy5sZWZ0ICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBpZiAodGFpbG9yKSB7IHRhaWxvci5kZXN0cm95KCk7IH1cbiAgICBjcm9zc3ZlbnQucmVtb3ZlKHdpbmRvdywgJ3Jlc2l6ZScsIHRocm90dGxlZFBvc2l0aW9uKTtcbiAgICBkZXN0cm95ZWQgPSB0cnVlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVsbHNleWU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXQgPSBlYXN5R2V0O1xudmFyIHNldCA9IGVhc3lTZXQ7XG5cbmlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XG4gIGdldCA9IGhhcmRHZXQ7XG4gIHNldCA9IGhhcmRTZXQ7XG59XG5cbmZ1bmN0aW9uIGVhc3lHZXQgKGVsKSB7XG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IGVsLnNlbGVjdGlvblN0YXJ0LFxuICAgIGVuZDogZWwuc2VsZWN0aW9uRW5kXG4gIH07XG59XG5cbmZ1bmN0aW9uIGhhcmRHZXQgKGVsKSB7XG4gIHZhciBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBpZiAoYWN0aXZlICE9PSBlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gIH1cblxuICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIGJvb2ttYXJrID0gcmFuZ2UuZ2V0Qm9va21hcmsoKTtcbiAgdmFyIG9yaWdpbmFsID0gZWwudmFsdWU7XG4gIHZhciBtYXJrZXIgPSBnZXRVbmlxdWVNYXJrZXIob3JpZ2luYWwpO1xuICB2YXIgcGFyZW50ID0gcmFuZ2UucGFyZW50RWxlbWVudCgpO1xuICBpZiAocGFyZW50ID09PSBudWxsIHx8ICFpbnB1dHMocGFyZW50KSkge1xuICAgIHJldHVybiByZXN1bHQoMCwgMCk7XG4gIH1cbiAgcmFuZ2UudGV4dCA9IG1hcmtlciArIHJhbmdlLnRleHQgKyBtYXJrZXI7XG5cbiAgdmFyIGNvbnRlbnRzID0gZWwudmFsdWU7XG5cbiAgZWwudmFsdWUgPSBvcmlnaW5hbDtcbiAgcmFuZ2UubW92ZVRvQm9va21hcmsoYm9va21hcmspO1xuICByYW5nZS5zZWxlY3QoKTtcblxuICByZXR1cm4gcmVzdWx0KGNvbnRlbnRzLmluZGV4T2YobWFya2VyKSwgY29udGVudHMubGFzdEluZGV4T2YobWFya2VyKSAtIG1hcmtlci5sZW5ndGgpO1xuXG4gIGZ1bmN0aW9uIHJlc3VsdCAoc3RhcnQsIGVuZCkge1xuICAgIGlmIChhY3RpdmUgIT09IGVsKSB7IC8vIGRvbid0IGRpc3J1cHQgcHJlLWV4aXN0aW5nIHN0YXRlXG4gICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgIGFjdGl2ZS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuYmx1cigpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VW5pcXVlTWFya2VyIChjb250ZW50cykge1xuICB2YXIgbWFya2VyO1xuICBkbyB7XG4gICAgbWFya2VyID0gJ0BAbWFya2VyLicgKyBNYXRoLnJhbmRvbSgpICogbmV3IERhdGUoKTtcbiAgfSB3aGlsZSAoY29udGVudHMuaW5kZXhPZihtYXJrZXIpICE9PSAtMSk7XG4gIHJldHVybiBtYXJrZXI7XG59XG5cbmZ1bmN0aW9uIGlucHV0cyAoZWwpIHtcbiAgcmV0dXJuICgoZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbC50eXBlID09PSAndGV4dCcpIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScpO1xufVxuXG5mdW5jdGlvbiBlYXN5U2V0IChlbCwgcCkge1xuICBlbC5zZWxlY3Rpb25TdGFydCA9IHBhcnNlKGVsLCBwLnN0YXJ0KTtcbiAgZWwuc2VsZWN0aW9uRW5kID0gcGFyc2UoZWwsIHAuZW5kKTtcbn1cblxuZnVuY3Rpb24gaGFyZFNldCAoZWwsIHApIHtcbiAgdmFyIHJhbmdlID0gZWwuY3JlYXRlVGV4dFJhbmdlKCk7XG5cbiAgaWYgKHAuc3RhcnQgPT09ICdlbmQnICYmIHAuZW5kID09PSAnZW5kJykge1xuICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBwYXJzZShlbCwgcC5lbmQpKTtcbiAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIHBhcnNlKGVsLCBwLnN0YXJ0KSk7XG4gICAgcmFuZ2Uuc2VsZWN0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2UgKGVsLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09ICdlbmQnID8gZWwudmFsdWUubGVuZ3RoIDogdmFsdWUgfHwgMDtcbn1cblxuZnVuY3Rpb24gc2VsbCAoZWwsIHApIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICBzZXQoZWwsIHApO1xuICB9XG4gIHJldHVybiBnZXQoZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzZWxsID0gcmVxdWlyZSgnc2VsbCcpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIHRocm90dGxlID0gcmVxdWlyZSgnLi90aHJvdHRsZScpO1xudmFyIHByb3BzID0gW1xuICAnZGlyZWN0aW9uJyxcbiAgJ2JveFNpemluZycsXG4gICd3aWR0aCcsXG4gICdoZWlnaHQnLFxuICAnb3ZlcmZsb3dYJyxcbiAgJ292ZXJmbG93WScsXG4gICdib3JkZXJUb3BXaWR0aCcsXG4gICdib3JkZXJSaWdodFdpZHRoJyxcbiAgJ2JvcmRlckJvdHRvbVdpZHRoJyxcbiAgJ2JvcmRlckxlZnRXaWR0aCcsXG4gICdwYWRkaW5nVG9wJyxcbiAgJ3BhZGRpbmdSaWdodCcsXG4gICdwYWRkaW5nQm90dG9tJyxcbiAgJ3BhZGRpbmdMZWZ0JyxcbiAgJ2ZvbnRTdHlsZScsXG4gICdmb250VmFyaWFudCcsXG4gICdmb250V2VpZ2h0JyxcbiAgJ2ZvbnRTdHJldGNoJyxcbiAgJ2ZvbnRTaXplJyxcbiAgJ2ZvbnRTaXplQWRqdXN0JyxcbiAgJ2xpbmVIZWlnaHQnLFxuICAnZm9udEZhbWlseScsXG4gICd0ZXh0QWxpZ24nLFxuICAndGV4dFRyYW5zZm9ybScsXG4gICd0ZXh0SW5kZW50JyxcbiAgJ3RleHREZWNvcmF0aW9uJyxcbiAgJ2xldHRlclNwYWNpbmcnLFxuICAnd29yZFNwYWNpbmcnXG5dO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGZmID0gd2luZG93Lm1veklubmVyU2NyZWVuWCAhPT0gbnVsbCAmJiB3aW5kb3cubW96SW5uZXJTY3JlZW5YICE9PSB2b2lkIDA7XG5cbmZ1bmN0aW9uIHRhaWxvcm1hZGUgKGVsLCBvcHRpb25zKSB7XG4gIHZhciB0aHJvdHRsZWRSZWZyZXNoID0gdGhyb3R0bGUocmVmcmVzaCwgMzApO1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIGlmIChvLnBvc2l0aW9ucyA9PT0gdm9pZCAwKSB7IG8ucG9zaXRpb25zID0gWydzdGFydCcsICdlbmQnLCAnYWxsJ107IH1cblxuICBiaW5kKCk7XG5cbiAgcmV0dXJuIHtcbiAgICByZWZyZXNoOiB0aHJvdHRsZWRSZWZyZXNoLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfTtcblxuICBmdW5jdGlvbiByZWZyZXNoICgpIHtcbiAgICB2YXIgcCA9IHNlbGwoZWwpO1xuICAgIHZhciBjb250ZXh0ID0gcHJlcGFyZSgpO1xuICAgIHZhciByZWFkaW5ncyA9IHt9O1xuXG4gICAgaWYgKG8ucG9zaXRpb25zLmluZGV4T2YoJ3N0YXJ0JykgIT09IC0xKSB7IGFkZCgnc3RhcnQnLCBwLnN0YXJ0KTsgfVxuICAgIGlmIChvLnBvc2l0aW9ucy5pbmRleE9mKCdlbmQnKSAhPT0gLTEpIHsgYWRkKCdlbmQnLCBwLmVuZCk7IH1cbiAgICBpZiAoby5wb3NpdGlvbnMuaW5kZXhPZignYWxsJykgIT09IC0xKSB7IGFkZCgnYWxsJywgZWwudmFsdWUubGVuZ3RoKTsgfVxuXG4gICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoY29udGV4dC5taXJyb3IpO1xuICAgIG8udXBkYXRlKHJlYWRpbmdzKTtcblxuICAgIGZ1bmN0aW9uIGFkZCAobmFtZSwgcCkge1xuICAgICAgcmVhZGluZ3NbbmFtZV0gPSBjb29yZHMoY29udGV4dCwgcCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJlcGFyZSAoKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsKSA6IGVsLmN1cnJlbnRTdHlsZTtcbiAgICB2YXIgbWlycm9yID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBzdHlsZSA9IG1pcnJvci5zdHlsZTtcblxuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKG1pcnJvcik7XG5cbiAgICBpZiAoZWwudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7XG4gICAgfVxuICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnO1xuICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgcHJvcHMuZm9yRWFjaChjb3B5KTtcblxuICAgIGlmIChmZikge1xuICAgICAgc3R5bGUud2lkdGggPSBwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyICsgJ3B4JztcbiAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKSB7XG4gICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICByZXR1cm4geyBtaXJyb3I6IG1pcnJvciwgY29tcHV0ZWQ6IGNvbXB1dGVkIH07XG5cbiAgICBmdW5jdGlvbiBjb3B5IChwcm9wKSB7XG4gICAgICBzdHlsZVtwcm9wXSA9IGNvbXB1dGVkW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvb3JkcyAoY29udGV4dCwgcCkge1xuICAgIHZhciByZXN0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB2YXIgbWlycm9yID0gY29udGV4dC5taXJyb3I7XG4gICAgdmFyIGNvbXB1dGVkID0gY29udGV4dC5jb21wdXRlZDtcblxuICAgIG1pcnJvci50ZXh0Q29udGVudCA9IGVsLnZhbHVlLnN1YnN0cmluZygwLCBwKTtcblxuICAgIGlmIChlbC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICBtaXJyb3IudGV4dENvbnRlbnQgPSBtaXJyb3IudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICdcXHUwMGEwJyk7XG4gICAgfVxuXG4gICAgcmVzdC50ZXh0Q29udGVudCA9IGVsLnZhbHVlLnN1YnN0cmluZyhwKSB8fCAnLic7XG4gICAgbWlycm9yLmFwcGVuZENoaWxkKHJlc3QpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHJlc3Qub2Zmc2V0TGVmdCArIHBhcnNlSW50KGNvbXB1dGVkWydib3JkZXJMZWZ0V2lkdGgnXSksXG4gICAgICB5OiByZXN0Lm9mZnNldFRvcCArIHBhcnNlSW50KGNvbXB1dGVkWydib3JkZXJUb3BXaWR0aCddKVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXlkb3duJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleXVwJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2lucHV0JywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ3Bhc3RlJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2NoYW5nZScsIHRocm90dGxlZFJlZnJlc2gpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgYmluZCh0cnVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhaWxvcm1hZGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHRocm90dGxlIChmbiwgYm91bmRhcnkpIHtcbiAgdmFyIGxhc3QgPSAtSW5maW5pdHk7XG4gIHZhciB0aW1lcjtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJvdW5jZWQgKCkge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1bmJvdW5kKCk7XG5cbiAgICBmdW5jdGlvbiB1bmJvdW5kICgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICB2YXIgbmV4dCA9IGxhc3QgKyBib3VuZGFyeTtcbiAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgaWYgKG5vdyA+IG5leHQpIHtcbiAgICAgICAgbGFzdCA9IG5vdztcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCh1bmJvdW5kLCBuZXh0IC0gbm93KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBhZGRFdmVudCA9IGFkZEV2ZW50RWFzeTtcbnZhciByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50RWFzeTtcbnZhciBoYXJkQ2FjaGUgPSBbXTtcblxuaWYgKCFnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICBhZGRFdmVudCA9IGFkZEV2ZW50SGFyZDtcbiAgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEhhcmQ7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50RWFzeSAoZWwsIHR5cGUsIGZuLCBjYXB0dXJpbmcpIHtcbiAgcmV0dXJuIGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGNhcHR1cmluZyk7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50SGFyZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBlbC5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgd3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCB1bndyYXAoZWwsIHR5cGUsIGZuKSk7XG59XG5cbmZ1bmN0aW9uIGZhYnJpY2F0ZUV2ZW50IChlbCwgdHlwZSkge1xuICB2YXIgZTtcbiAgaWYgKGRvYy5jcmVhdGVFdmVudCkge1xuICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZS5pbml0RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICBlID0gZG9jLmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgZWwuZmlyZUV2ZW50KCdvbicgKyB0eXBlLCBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwcGVyRmFjdG9yeSAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwcGVyIChvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSBvcmlnaW5hbEV2ZW50IHx8IGdsb2JhbC5ldmVudDtcbiAgICBlLnRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0ICA9IGUucHJldmVudERlZmF1bHQgIHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGZuLmNhbGwoZWwsIGUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIHdyYXBwZXIgPSB1bndyYXAoZWwsIHR5cGUsIGZuKSB8fCB3cmFwcGVyRmFjdG9yeShlbCwgdHlwZSwgZm4pO1xuICBoYXJkQ2FjaGUucHVzaCh7XG4gICAgd3JhcHBlcjogd3JhcHBlcixcbiAgICBlbGVtZW50OiBlbCxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGZuOiBmblxuICB9KTtcbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIHVud3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpID0gZmluZChlbCwgdHlwZSwgZm4pO1xuICBpZiAoaSkge1xuICAgIHZhciB3cmFwcGVyID0gaGFyZENhY2hlW2ldLndyYXBwZXI7XG4gICAgaGFyZENhY2hlLnNwbGljZShpLCAxKTsgLy8gZnJlZSB1cCBhIHRhZCBvZiBtZW1vcnlcbiAgICByZXR1cm4gd3JhcHBlcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGksIGl0ZW07XG4gIGZvciAoaSA9IDA7IGkgPCBoYXJkQ2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBpdGVtID0gaGFyZENhY2hlW2ldO1xuICAgIGlmIChpdGVtLmVsZW1lbnQgPT09IGVsICYmIGl0ZW0udHlwZSA9PT0gdHlwZSAmJiBpdGVtLmZuID09PSBmbikge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZEV2ZW50LFxuICByZW1vdmU6IHJlbW92ZUV2ZW50LFxuICBmYWJyaWNhdGU6IGZhYnJpY2F0ZUV2ZW50XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBmdXp6eXNlYXJjaCAobmVlZGxlLCBoYXlzdGFjaykge1xuICB2YXIgdGxlbiA9IGhheXN0YWNrLmxlbmd0aDtcbiAgdmFyIHFsZW4gPSBuZWVkbGUubGVuZ3RoO1xuICBpZiAocWxlbiA+IHRsZW4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHFsZW4gPT09IHRsZW4pIHtcbiAgICByZXR1cm4gbmVlZGxlID09PSBoYXlzdGFjaztcbiAgfVxuICBvdXRlcjogZm9yICh2YXIgaSA9IDAsIGogPSAwOyBpIDwgcWxlbjsgaSsrKSB7XG4gICAgdmFyIG5jaCA9IG5lZWRsZS5jaGFyQ29kZUF0KGkpO1xuICAgIHdoaWxlIChqIDwgdGxlbikge1xuICAgICAgaWYgKGhheXN0YWNrLmNoYXJDb2RlQXQoaisrKSA9PT0gbmNoKSB7XG4gICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnV6enlzZWFyY2g7XG4iXX0=
