!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.horsey=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var sell = require('sell');
var crossvent = require('crossvent');
var bullseye = require('bullseye');
var fuzzysearch = require('fuzzysearch');
var KEY_ENTER = 13;
var KEY_ESC = 27;
var KEY_UP = 38;
var KEY_DOWN = 40;
var cache = [];
var doc = document;
var docElement = doc.documentElement;

function find (el) {
  var entry;
  var i;
  for (i = 0; i < cache.length; i++) {
    entry = cache[i];
    if (entry.el === el) {
      return entry.api;
    }
  }
  return null;
}

function horsey (el, options) {
  var cached = find(el);
  if (cached) {
    return cached;
  }

  var o = options || {};
  var parent = o.appendTo || doc.body;
  var render = o.render || defaultRenderer;
  var getText = o.getText || defaultGetText;
  var getValue = o.getValue || defaultGetValue;
  var form = o.form;
  var limit = typeof o.limit === 'number' ? o.limit : Infinity;
  var suggestions = o.suggestions;
  var userFilter = o.filter || defaultFilter;
  var userSet = o.set || defaultSetter;
  var ul = tag('ul', 'sey-list');
  var selection = null;
  var oneload = once(loading);
  var eye;
  var deferredFiltering = defer(filtering);
  var attachment = el;
  var textInput;
  var anyInput;
  var ranchorleft;
  var ranchorright;

  if (o.autoHideOnBlur === void 0) { o.autoHideOnBlur = true; }
  if (o.autoHideOnClick === void 0) { o.autoHideOnClick = true; }
  if (o.autoShowOnUpDown === void 0) { o.autoShowOnUpDown = el.tagName === 'INPUT'; }
  if (o.anchor) {
    ranchorleft = new RegExp('^' + o.anchor);
    ranchorright = new RegExp(o.anchor + '$');
  }

  var api = {
    add: add,
    anchor: o.anchor,
    clear: clear,
    show: show,
    hide: hide,
    toggle: toggle,
    destroy: destroy,
    refreshPosition: refreshPosition,
    appendText: appendText,
    appendHTML: appendHTML,
    filterAnchoredText: filterAnchoredText,
    filterAnchoredHTML: filterAnchoredHTML,
    defaultAppendText: appendText,
    defaultFilter: defaultFilter,
    defaultGetText: defaultGetText,
    defaultGetValue: defaultGetValue,
    defaultRenderer: defaultRenderer,
    defaultSetter: defaultSetter,
    retarget: retarget,
    attachment: attachment,
    list: ul,
    suggestions: []
  };
  var entry = { el: el, api: api };

  retarget(el);
  cache.push(entry);
  parent.appendChild(ul);
  el.setAttribute('autocomplete', 'off');

  if (Array.isArray(suggestions)) {
    loaded(suggestions);
  }

  return api;

  function retarget (el) {
    inputEvents(true);
    attachment = api.attachment = el;
    textInput = attachment.tagName === 'INPUT' || attachment.tagName === 'TEXTAREA';
    anyInput = textInput || isEditable(attachment);
    inputEvents();
  }

  function refreshPosition () {
    if (eye) { eye.refresh(); }
  }

  function loading () {
    crossvent.remove(attachment, 'focus', oneload);
    suggestions(loaded);
  }

  function loaded (suggestions) {
    suggestions.forEach(add);
    api.suggestions = suggestions;
  }

  function clear () {
    while (ul.lastChild) {
      ul.removeChild(ul.lastChild);
    }
  }

  function add (suggestion) {
    var li = tag('li', 'sey-item');
    render(li, suggestion);
    crossvent.add(li, 'click', clickedSuggestion);
    crossvent.add(li, 'horsey-filter', filterItem);
    crossvent.add(li, 'horsey-hide', hideItem);
    ul.appendChild(li);
    api.suggestions.push(suggestion);
    return li;

    function clickedSuggestion () {
      var value = getValue(suggestion);
      set(value);
      hide();
      attachment.focus();
      crossvent.fabricate(attachment, 'horsey-selected', value);
    }

    function filterItem () {
      var value = textInput ? el.value : el.innerHTML;
      if (filter(value, suggestion)) {
        li.className = li.className.replace(/ sey-hide/g, '');
      } else {
        crossvent.fabricate(li, 'horsey-hide');
      }
    }

    function hideItem () {
      if (!hidden(li)) {
        li.className += ' sey-hide';
        if (selection === li) {
          unselect();
        }
      }
    }
  }

  function set (value) {
    if (o.anchor) {
      return (isText() ? api.appendText : api.appendHTML)(value);
    }
    userSet(value);
  }

  function filter (value, suggestion) {
    if (o.anchor) {
      var il = (isText() ? api.filterAnchoredText : api.filterAnchoredHTML)(value, suggestion);
      return il ? userFilter(il.input, il.suggestion) : false;
    }
    return userFilter(value, suggestion);
  }

  function isText () { return isInput(attachment); }
  function visible () { return ul.className.indexOf('sey-show') !== -1; }
  function hidden (li) { return li.className.indexOf('sey-hide') !== -1; }

  function show () {
    if (!visible()) {
      ul.className += ' sey-show';
      eye.refresh();
      crossvent.fabricate(attachment, 'horsey-show');
    }
  }

  function toggler (e) {
    var left = e.which === 1 && !e.metaKey && !e.ctrlKey;
    if (left === false) {
      return; // we only care about honest to god left-clicks
    }
    toggle();
  }

  function toggle () {
    if (!visible()) {
      show();
    } else {
      hide();
    }
  }

  function select (suggestion) {
    unselect();
    if (suggestion) {
      selection = suggestion;
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
    var suggestion = selection && selection[next] || ul[first];

    select(suggestion);

    if (hidden(suggestion)) {
      move(up, moves ? moves + 1 : 1);
    }
  }

  function hide () {
    eye.sleep();
    ul.className = ul.className.replace(/ sey-show/g, '');
    unselect();
    crossvent.fabricate(attachment, 'horsey-hide');
  }

  function keydown (e) {
    var shown = visible();
    var which = e.which || e.keyCode;
    if (which === KEY_DOWN) {
      if (anyInput && o.autoShowOnUpDown) {
        show();
      }
      if (shown) {
        move();
        stop(e);
      }
    } else if (which === KEY_UP) {
      if (anyInput && o.autoShowOnUpDown) {
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
    crossvent.fabricate(attachment, 'horsey-filter');
    var li = ul.firstChild;
    var count = 0;
    while (li) {
      if (count >= limit) {
        crossvent.fabricate(li, 'horsey-hide');
      }
      if (count < limit) {
        crossvent.fabricate(li, 'horsey-filter');
        if (li.className.indexOf('sey-hide') === -1) {
          count++;
        }
      }
      li = li.nextSibling;
    }
    if (!selection) {
      move();
    }
    if (!selection) {
      hide();
    }
  }

  function deferredFilteringNoEnter (e) {
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
    if (target === attachment) {
      return true;
    }
    while (target) {
      if (target === ul || target === attachment) {
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
    if (eye) {
      eye.destroy();
      eye = null;
    }
    if (!remove) {
      eye = bullseye(ul, attachment, { caret: anyInput && attachment.tagName !== 'INPUT' });
      if (!visible()) { eye.sleep(); }
    }
    if (typeof suggestions === 'function' && !oneload.used) {
      if (remove || (anyInput && doc.activeElement !== attachment)) {
        crossvent[op](attachment, 'focus', oneload);
      } else {
        oneload();
      }
    }
    if (anyInput) {
      crossvent[op](attachment, 'keypress', deferredShow);
      crossvent[op](attachment, 'keypress', deferredFiltering);
      crossvent[op](attachment, 'keydown', deferredFilteringNoEnter);
      crossvent[op](attachment, 'paste', deferredFiltering);
      crossvent[op](attachment, 'keydown', keydown);
      if (o.autoHideOnBlur) { crossvent[op](docElement, 'focus', hideOnBlur, true); }
    } else {
      crossvent[op](attachment, 'click', toggler);
      crossvent[op](docElement, 'keydown', keydown);
    }
    if (o.autoHideOnClick) { crossvent[op](doc, 'click', hideOnClick); }
    if (form) { crossvent[op](form, 'submit', hide); }
  }

  function destroy () {
    inputEvents(true);
    if (parent.contains(ul)) { parent.removeChild(ul); }
    cache.splice(cache.indexOf(entry), 1);
  }

  function defaultSetter (value) {
    if (textInput) {
      el.value = value;
    } else {
      el.innerHTML = value;
    }
  }

  function defaultRenderer (li, suggestion) {
    li.innerText = li.textContent = getText(suggestion);
  }

  function defaultFilter (q, suggestion) {
    var text = getText(suggestion) || '';
    var value = getValue(suggestion) || '';
    var needle = q.toLowerCase();
    return fuzzysearch(needle, text.toLowerCase()) || fuzzysearch(needle, value.toLowerCase());
  }

  function loopbackToAnchor (text, p) {
    var result = '';
    var anchored = false;
    var start = p.start;
    while (anchored === false && start >= 0) {
      result = text.substr(start - 1, p.start - start + 1);
      anchored = ranchorleft.test(result);
      start--;
    }
    return {
      text: anchored ? result : null,
      start: start
    };
  }

  function filterAnchoredText (q, suggestion) {
    var position = sell(el);
    var input = loopbackToAnchor(q, position).text;
    if (input) {
      return { input: input, suggestion: suggestion };
    }
  }

  function appendText (value) {
    var current = el.value;
    var position = sell(el);
    var input = loopbackToAnchor(current, position);
    var left = current.substr(0, input.start);
    var right = current.substr(input.start + input.text.length + (position.end - position.start));
    var before = left + value + ' ';

    el.value = before + right;
    sell(el, { start: before.length, end: before.length });
  }

  function filterAnchoredHTML () {
    throw new Error('Anchoring in editable elements is disabled by default.');
  }

  function appendHTML () {
    throw new Error('Anchoring in editable elements is disabled by default.');
  }
}

function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'; }

function defaultGetValue (suggestion) {
  return defaultGet('value', suggestion);
}

function defaultGetText (suggestion) {
  return defaultGet('text', suggestion);
}

function defaultGet (type, value) {
  return value && value[type] !== void 0 ? value[type] : value;
}

function tag (type, className) {
  var el = doc.createElement(type);
  el.className = className;
  return el;
}

function once (fn) {
  var disposed;
  function disposable () {
    if (disposed) { return; }
    disposable.used = disposed = true;
    (fn || noop).apply(null, arguments);
  }
  return disposable;
}
function defer (fn) { return function () { setTimeout(fn, 0); }; }
function noop () {}

function isEditable (el) {
  var value = el.getAttribute('contentEditable');
  if (value === 'false') {
    return false;
  }
  if (value === 'true') {
    return true;
  }
  if (el.parentElement) {
    return isEditable(el.parentElement);
  }
  return false;
}

horsey.find = find;
module.exports = horsey;

},{"bullseye":2,"crossvent":12,"fuzzysearch":14,"sell":15}],2:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var throttle = require('./throttle');
var tailormade = require('./tailormade');

function bullseye (el, target, options) {
  var o = options;
  var domTarget = target && target.tagName;

  if (!domTarget && arguments.length === 2) {
    o = target;
  }
  if (!domTarget) {
    target = el;
  }
  if (!o) { o = {}; }

  var destroyed = false;
  var throttledWrite = throttle(write, 30);
  var tailorOptions = { update: o.autoupdateToCaret !== false && update };
  var tailor = o.caret && tailormade(target, tailorOptions);

  write();

  if (o.tracking !== false) {
    crossvent.add(window, 'resize', throttledWrite);
  }

  return {
    read: readNull,
    refresh: write,
    destroy: destroy,
    sleep: sleep
  };

  function sleep () {
    tailorOptions.sleeping = true;
  }

  function readNull () { return read(); }

  function read (readings) {
    var bounds = target.getBoundingClientRect();
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (tailor) {
      readings = tailor.read();
      return {
        x: (readings.absolute ? 0 : bounds.left) + readings.x,
        y: (readings.absolute ? 0 : bounds.top) + scrollTop + readings.y + 20
      };
    }
    return {
      x: bounds.left,
      y: bounds.top + scrollTop
    };
  }

  function update (readings) {
    write(readings);
  }

  function write (readings) {
    if (destroyed) {
      throw new Error('Bullseye can\'t refresh after being destroyed. Create another instance instead.');
    }
    if (tailor && !readings) {
      tailorOptions.sleeping = false;
      tailor.refresh(); return;
    }
    var p = read(readings);
    if (!tailor && target !== el) {
      p.y += target.offsetHeight;
    }
    el.style.left = p.x + 'px';
    el.style.top = p.y + 'px';
  }

  function destroy () {
    if (tailor) { tailor.destroy(); }
    crossvent.remove(window, 'resize', throttledWrite);
    destroyed = true;
  }
}

module.exports = bullseye;

},{"./tailormade":9,"./throttle":10,"crossvent":12}],3:[function(require,module,exports){
(function (global){
'use strict';

var getSelection;
var doc = global.document;
var rangeToTextRange = require('./rangeToTextRange');
var getSelectionRaw = require('./getSelectionRaw');
var getSelectionNullOp = require('./getSelectionNullOp');
var getSelectionSynthetic = require('./getSelectionSynthetic');
var isHost = require('./isHost');
if (isHost.method(global, 'getSelection')) {
  getSelection = getSelectionRaw;
} else if (typeof doc.selection === 'object' && doc.selection) {
  getSelection = getSelectionSynthetic;
} else {
  getSelection = getSelectionNullOp;
}

getSelection.rangeToTextRange = rangeToTextRange;
module.exports = getSelection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS9ub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGdldFNlbGVjdGlvbjtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgcmFuZ2VUb1RleHRSYW5nZSA9IHJlcXVpcmUoJy4vcmFuZ2VUb1RleHRSYW5nZScpO1xudmFyIGdldFNlbGVjdGlvblJhdyA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uUmF3Jyk7XG52YXIgZ2V0U2VsZWN0aW9uTnVsbE9wID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb25OdWxsT3AnKTtcbnZhciBnZXRTZWxlY3Rpb25TeW50aGV0aWMgPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvblN5bnRoZXRpYycpO1xudmFyIGlzSG9zdCA9IHJlcXVpcmUoJy4vaXNIb3N0Jyk7XG5pZiAoaXNIb3N0Lm1ldGhvZChnbG9iYWwsICdnZXRTZWxlY3Rpb24nKSkge1xuICBnZXRTZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb25SYXc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2Muc2VsZWN0aW9uID09PSAnb2JqZWN0JyAmJiBkb2Muc2VsZWN0aW9uKSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvblN5bnRoZXRpYztcbn0gZWxzZSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvbk51bGxPcDtcbn1cblxuZ2V0U2VsZWN0aW9uLnJhbmdlVG9UZXh0UmFuZ2UgPSByYW5nZVRvVGV4dFJhbmdlO1xubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb247XG4iXX0=
},{"./getSelectionNullOp":4,"./getSelectionRaw":5,"./getSelectionSynthetic":6,"./isHost":7,"./rangeToTextRange":8}],4:[function(require,module,exports){
'use strict';

function noop () {}

function getSelectionNullOp () {
  return {
    removeAllRanges: noop,
    addRange: noop
  };
}

module.exports = getSelectionNullOp;

},{}],5:[function(require,module,exports){
(function (global){
'use strict';

function getSelectionRaw () {
  return global.getSelection();
}

module.exports = getSelectionRaw;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS9ub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25SYXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uUmF3ICgpIHtcbiAgcmV0dXJuIGdsb2JhbC5nZXRTZWxlY3Rpb24oKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb25SYXc7XG4iXX0=
},{}],6:[function(require,module,exports){
(function (global){
'use strict';

var rangeToTextRange = require('./rangeToTextRange');
var doc = global.document;
var body = doc.body;
var GetSelectionProto = GetSelection.prototype;

function GetSelection (selection) {
  var self = this;
  var range = selection.createRange();

  this._selection = selection;
  this._ranges = [];

  if (selection.type === 'Control') {
    updateControlSelection(self);
  } else if (isTextRange(range)) {
    updateFromTextRange(self, range);
  } else {
    updateEmptySelection(self);
  }
}

GetSelectionProto.removeAllRanges = function () {
  var textRange;
  try {
    this._selection.empty();
    if (this._selection.type !== 'None') {
      textRange = body.createTextRange();
      textRange.select();
      this._selection.empty();
    }
  } catch (e) {
  }
  updateEmptySelection(this);
};

GetSelectionProto.addRange = function (range) {
  if (this._selection.type === 'Control') {
    addRangeToControlSelection(this, range);
  } else {
    rangeToTextRange(range).select();
    this._ranges[0] = range;
    this.rangeCount = 1;
    this.isCollapsed = this._ranges[0].collapsed;
    updateAnchorAndFocusFromRange(this, range, false);
  }
};

GetSelectionProto.setRanges = function (ranges) {
  this.removeAllRanges();
  var rangeCount = ranges.length;
  if (rangeCount > 1) {
    createControlSelection(this, ranges);
  } else if (rangeCount) {
    this.addRange(ranges[0]);
  }
};

GetSelectionProto.getRangeAt = function (index) {
  if (index < 0 || index >= this.rangeCount) {
    throw new Error('getRangeAt(): index out of bounds');
  } else {
    return this._ranges[index].cloneRange();
  }
};

GetSelectionProto.removeRange = function (range) {
  if (this._selection.type !== 'Control') {
    removeRangeManually(this, range);
    return;
  }
  var controlRange = this._selection.createRange();
  var rangeElement = getSingleElementFromRange(range);
  var newControlRange = body.createControlRange();
  var el;
  var removed = false;
  for (var i = 0, len = controlRange.length; i < len; ++i) {
    el = controlRange.item(i);
    if (el !== rangeElement || removed) {
      newControlRange.add(controlRange.item(i));
    } else {
      removed = true;
    }
  }
  newControlRange.select();
  updateControlSelection(this);
};

GetSelectionProto.eachRange = function (fn, returnValue) {
  var i = 0;
  var len = this._ranges.length;
  for (i = 0; i < len; ++i) {
    if (fn(this.getRangeAt(i))) {
      return returnValue;
    }
  }
};

GetSelectionProto.getAllRanges = function () {
  var ranges = [];
  this.eachRange(function (range) {
    ranges.push(range);
  });
  return ranges;
};

GetSelectionProto.setSingleRange = function (range) {
  this.removeAllRanges();
  this.addRange(range);
};

function createControlSelection (sel, ranges) {
  var controlRange = body.createControlRange();
  for (var i = 0, el, len = ranges.length; i < len; ++i) {
    el = getSingleElementFromRange(ranges[i]);
    try {
      controlRange.add(el);
    } catch (e) {
      throw new Error('setRanges(): Element could not be added to control selection');
    }
  }
  controlRange.select();
  updateControlSelection(sel);
}

function removeRangeManually (sel, range) {
  var ranges = sel.getAllRanges();
  sel.removeAllRanges();
  for (var i = 0, len = ranges.length; i < len; ++i) {
    if (!isSameRange(range, ranges[i])) {
      sel.addRange(ranges[i]);
    }
  }
  if (!sel.rangeCount) {
    updateEmptySelection(sel);
  }
}

function updateAnchorAndFocusFromRange (sel, range) {
  var anchorPrefix = 'start';
  var focusPrefix = 'end';
  sel.anchorNode = range[anchorPrefix + 'Container'];
  sel.anchorOffset = range[anchorPrefix + 'Offset'];
  sel.focusNode = range[focusPrefix + 'Container'];
  sel.focusOffset = range[focusPrefix + 'Offset'];
}

function updateEmptySelection (sel) {
  sel.anchorNode = sel.focusNode = null;
  sel.anchorOffset = sel.focusOffset = 0;
  sel.rangeCount = 0;
  sel.isCollapsed = true;
  sel._ranges.length = 0;
}

function rangeContainsSingleElement (rangeNodes) {
  if (!rangeNodes.length || rangeNodes[0].nodeType !== 1) {
    return false;
  }
  for (var i = 1, len = rangeNodes.length; i < len; ++i) {
    if (!isAncestorOf(rangeNodes[0], rangeNodes[i])) {
      return false;
    }
  }
  return true;
}

function getSingleElementFromRange (range) {
  var nodes = range.getNodes();
  if (!rangeContainsSingleElement(nodes)) {
    throw new Error('getSingleElementFromRange(): range did not consist of a single element');
  }
  return nodes[0];
}

function isTextRange (range) {
  return range && range.text !== void 0;
}

function updateFromTextRange (sel, range) {
  sel._ranges = [range];
  updateAnchorAndFocusFromRange(sel, range, false);
  sel.rangeCount = 1;
  sel.isCollapsed = range.collapsed;
}

function updateControlSelection (sel) {
  sel._ranges.length = 0;
  if (sel._selection.type === 'None') {
    updateEmptySelection(sel);
  } else {
    var controlRange = sel._selection.createRange();
    if (isTextRange(controlRange)) {
      updateFromTextRange(sel, controlRange);
    } else {
      sel.rangeCount = controlRange.length;
      var range;
      for (var i = 0; i < sel.rangeCount; ++i) {
        range = doc.createRange();
        range.selectNode(controlRange.item(i));
        sel._ranges.push(range);
      }
      sel.isCollapsed = sel.rangeCount === 1 && sel._ranges[0].collapsed;
      updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], false);
    }
  }
}

function addRangeToControlSelection (sel, range) {
  var controlRange = sel._selection.createRange();
  var rangeElement = getSingleElementFromRange(range);
  var newControlRange = body.createControlRange();
  for (var i = 0, len = controlRange.length; i < len; ++i) {
    newControlRange.add(controlRange.item(i));
  }
  try {
    newControlRange.add(rangeElement);
  } catch (e) {
    throw new Error('addRange(): Element could not be added to control selection');
  }
  newControlRange.select();
  updateControlSelection(sel);
}

function isSameRange (left, right) {
  return (
    left.startContainer === right.startContainer &&
    left.startOffset === right.startOffset &&
    left.endContainer === right.endContainer &&
    left.endOffset === right.endOffset
  );
}

function isAncestorOf (ancestor, descendant) {
  var node = descendant;
  while (node.parentNode) {
    if (node.parentNode === ancestor) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function getSelection () {
  return new GetSelection(global.document.selection);
}

module.exports = getSelection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS9ub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25TeW50aGV0aWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmdlVG9UZXh0UmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlVG9UZXh0UmFuZ2UnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYm9keSA9IGRvYy5ib2R5O1xudmFyIEdldFNlbGVjdGlvblByb3RvID0gR2V0U2VsZWN0aW9uLnByb3RvdHlwZTtcblxuZnVuY3Rpb24gR2V0U2VsZWN0aW9uIChzZWxlY3Rpb24pIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgcmFuZ2UgPSBzZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcblxuICB0aGlzLl9zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gIHRoaXMuX3JhbmdlcyA9IFtdO1xuXG4gIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ0NvbnRyb2wnKSB7XG4gICAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbihzZWxmKTtcbiAgfSBlbHNlIGlmIChpc1RleHRSYW5nZShyYW5nZSkpIHtcbiAgICB1cGRhdGVGcm9tVGV4dFJhbmdlKHNlbGYsIHJhbmdlKTtcbiAgfSBlbHNlIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWxmKTtcbiAgfVxufVxuXG5HZXRTZWxlY3Rpb25Qcm90by5yZW1vdmVBbGxSYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0UmFuZ2U7XG4gIHRyeSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbi50eXBlICE9PSAnTm9uZScpIHtcbiAgICAgIHRleHRSYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICB0ZXh0UmFuZ2Uuc2VsZWN0KCk7XG4gICAgICB0aGlzLl9zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICB1cGRhdGVFbXB0eVNlbGVjdGlvbih0aGlzKTtcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmFkZFJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSA9PT0gJ0NvbnRyb2wnKSB7XG4gICAgYWRkUmFuZ2VUb0NvbnRyb2xTZWxlY3Rpb24odGhpcywgcmFuZ2UpO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlVG9UZXh0UmFuZ2UocmFuZ2UpLnNlbGVjdCgpO1xuICAgIHRoaXMuX3Jhbmdlc1swXSA9IHJhbmdlO1xuICAgIHRoaXMucmFuZ2VDb3VudCA9IDE7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRoaXMuX3Jhbmdlc1swXS5jb2xsYXBzZWQ7XG4gICAgdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2UodGhpcywgcmFuZ2UsIGZhbHNlKTtcbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uc2V0UmFuZ2VzID0gZnVuY3Rpb24gKHJhbmdlcykge1xuICB0aGlzLnJlbW92ZUFsbFJhbmdlcygpO1xuICB2YXIgcmFuZ2VDb3VudCA9IHJhbmdlcy5sZW5ndGg7XG4gIGlmIChyYW5nZUNvdW50ID4gMSkge1xuICAgIGNyZWF0ZUNvbnRyb2xTZWxlY3Rpb24odGhpcywgcmFuZ2VzKTtcbiAgfSBlbHNlIGlmIChyYW5nZUNvdW50KSB7XG4gICAgdGhpcy5hZGRSYW5nZShyYW5nZXNbMF0pO1xuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5nZXRSYW5nZUF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5yYW5nZUNvdW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRSYW5nZUF0KCk6IGluZGV4IG91dCBvZiBib3VuZHMnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VzW2luZGV4XS5jbG9uZVJhbmdlKCk7XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLnJlbW92ZVJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSAhPT0gJ0NvbnRyb2wnKSB7XG4gICAgcmVtb3ZlUmFuZ2VNYW51YWxseSh0aGlzLCByYW5nZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjb250cm9sUmFuZ2UgPSB0aGlzLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHJhbmdlRWxlbWVudCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2UpO1xuICB2YXIgbmV3Q29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgdmFyIGVsO1xuICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gY29udHJvbFJhbmdlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgZWwgPSBjb250cm9sUmFuZ2UuaXRlbShpKTtcbiAgICBpZiAoZWwgIT09IHJhbmdlRWxlbWVudCB8fCByZW1vdmVkKSB7XG4gICAgICBuZXdDb250cm9sUmFuZ2UuYWRkKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfVxuICB9XG4gIG5ld0NvbnRyb2xSYW5nZS5zZWxlY3QoKTtcbiAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbih0aGlzKTtcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmVhY2hSYW5nZSA9IGZ1bmN0aW9uIChmbiwgcmV0dXJuVmFsdWUpIHtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbGVuID0gdGhpcy5fcmFuZ2VzLmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGZuKHRoaXMuZ2V0UmFuZ2VBdChpKSkpIHtcbiAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmdldEFsbFJhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJhbmdlcyA9IFtdO1xuICB0aGlzLmVhY2hSYW5nZShmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICByYW5nZXMucHVzaChyYW5nZSk7XG4gIH0pO1xuICByZXR1cm4gcmFuZ2VzO1xufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uc2V0U2luZ2xlUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgdGhpcy5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgdGhpcy5hZGRSYW5nZShyYW5nZSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDb250cm9sU2VsZWN0aW9uIChzZWwsIHJhbmdlcykge1xuICB2YXIgY29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGVsLCBsZW4gPSByYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBlbCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2VzW2ldKTtcbiAgICB0cnkge1xuICAgICAgY29udHJvbFJhbmdlLmFkZChlbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRSYW5nZXMoKTogRWxlbWVudCBjb3VsZCBub3QgYmUgYWRkZWQgdG8gY29udHJvbCBzZWxlY3Rpb24nKTtcbiAgICB9XG4gIH1cbiAgY29udHJvbFJhbmdlLnNlbGVjdCgpO1xuICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHNlbCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJhbmdlTWFudWFsbHkgKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIHJhbmdlcyA9IHNlbC5nZXRBbGxSYW5nZXMoKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmFuZ2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKCFpc1NhbWVSYW5nZShyYW5nZSwgcmFuZ2VzW2ldKSkge1xuICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmICghc2VsLnJhbmdlQ291bnQpIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlIChzZWwsIHJhbmdlKSB7XG4gIHZhciBhbmNob3JQcmVmaXggPSAnc3RhcnQnO1xuICB2YXIgZm9jdXNQcmVmaXggPSAnZW5kJztcbiAgc2VsLmFuY2hvck5vZGUgPSByYW5nZVthbmNob3JQcmVmaXggKyAnQ29udGFpbmVyJ107XG4gIHNlbC5hbmNob3JPZmZzZXQgPSByYW5nZVthbmNob3JQcmVmaXggKyAnT2Zmc2V0J107XG4gIHNlbC5mb2N1c05vZGUgPSByYW5nZVtmb2N1c1ByZWZpeCArICdDb250YWluZXInXTtcbiAgc2VsLmZvY3VzT2Zmc2V0ID0gcmFuZ2VbZm9jdXNQcmVmaXggKyAnT2Zmc2V0J107XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUVtcHR5U2VsZWN0aW9uIChzZWwpIHtcbiAgc2VsLmFuY2hvck5vZGUgPSBzZWwuZm9jdXNOb2RlID0gbnVsbDtcbiAgc2VsLmFuY2hvck9mZnNldCA9IHNlbC5mb2N1c09mZnNldCA9IDA7XG4gIHNlbC5yYW5nZUNvdW50ID0gMDtcbiAgc2VsLmlzQ29sbGFwc2VkID0gdHJ1ZTtcbiAgc2VsLl9yYW5nZXMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gcmFuZ2VDb250YWluc1NpbmdsZUVsZW1lbnQgKHJhbmdlTm9kZXMpIHtcbiAgaWYgKCFyYW5nZU5vZGVzLmxlbmd0aCB8fCByYW5nZU5vZGVzWzBdLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAodmFyIGkgPSAxLCBsZW4gPSByYW5nZU5vZGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKCFpc0FuY2VzdG9yT2YocmFuZ2VOb2Rlc1swXSwgcmFuZ2VOb2Rlc1tpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UgKHJhbmdlKSB7XG4gIHZhciBub2RlcyA9IHJhbmdlLmdldE5vZGVzKCk7XG4gIGlmICghcmFuZ2VDb250YWluc1NpbmdsZUVsZW1lbnQobm9kZXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKCk6IHJhbmdlIGRpZCBub3QgY29uc2lzdCBvZiBhIHNpbmdsZSBlbGVtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIG5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBpc1RleHRSYW5nZSAocmFuZ2UpIHtcbiAgcmV0dXJuIHJhbmdlICYmIHJhbmdlLnRleHQgIT09IHZvaWQgMDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRnJvbVRleHRSYW5nZSAoc2VsLCByYW5nZSkge1xuICBzZWwuX3JhbmdlcyA9IFtyYW5nZV07XG4gIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlKHNlbCwgcmFuZ2UsIGZhbHNlKTtcbiAgc2VsLnJhbmdlQ291bnQgPSAxO1xuICBzZWwuaXNDb2xsYXBzZWQgPSByYW5nZS5jb2xsYXBzZWQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24gKHNlbCkge1xuICBzZWwuX3Jhbmdlcy5sZW5ndGggPSAwO1xuICBpZiAoc2VsLl9zZWxlY3Rpb24udHlwZSA9PT0gJ05vbmUnKSB7XG4gICAgdXBkYXRlRW1wdHlTZWxlY3Rpb24oc2VsKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY29udHJvbFJhbmdlID0gc2VsLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICBpZiAoaXNUZXh0UmFuZ2UoY29udHJvbFJhbmdlKSkge1xuICAgICAgdXBkYXRlRnJvbVRleHRSYW5nZShzZWwsIGNvbnRyb2xSYW5nZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbC5yYW5nZUNvdW50ID0gY29udHJvbFJhbmdlLmxlbmd0aDtcbiAgICAgIHZhciByYW5nZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsLnJhbmdlQ291bnQ7ICsraSkge1xuICAgICAgICByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgICAgICAgc2VsLl9yYW5nZXMucHVzaChyYW5nZSk7XG4gICAgICB9XG4gICAgICBzZWwuaXNDb2xsYXBzZWQgPSBzZWwucmFuZ2VDb3VudCA9PT0gMSAmJiBzZWwuX3Jhbmdlc1swXS5jb2xsYXBzZWQ7XG4gICAgICB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZShzZWwsIHNlbC5fcmFuZ2VzW3NlbC5yYW5nZUNvdW50IC0gMV0sIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkUmFuZ2VUb0NvbnRyb2xTZWxlY3Rpb24gKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIGNvbnRyb2xSYW5nZSA9IHNlbC5fc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gIHZhciByYW5nZUVsZW1lbnQgPSBnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKHJhbmdlKTtcbiAgdmFyIG5ld0NvbnRyb2xSYW5nZSA9IGJvZHkuY3JlYXRlQ29udHJvbFJhbmdlKCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjb250cm9sUmFuZ2UubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBuZXdDb250cm9sUmFuZ2UuYWRkKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgfVxuICB0cnkge1xuICAgIG5ld0NvbnRyb2xSYW5nZS5hZGQocmFuZ2VFbGVtZW50KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignYWRkUmFuZ2UoKTogRWxlbWVudCBjb3VsZCBub3QgYmUgYWRkZWQgdG8gY29udHJvbCBzZWxlY3Rpb24nKTtcbiAgfVxuICBuZXdDb250cm9sUmFuZ2Uuc2VsZWN0KCk7XG4gIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24oc2VsKTtcbn1cblxuZnVuY3Rpb24gaXNTYW1lUmFuZ2UgKGxlZnQsIHJpZ2h0KSB7XG4gIHJldHVybiAoXG4gICAgbGVmdC5zdGFydENvbnRhaW5lciA9PT0gcmlnaHQuc3RhcnRDb250YWluZXIgJiZcbiAgICBsZWZ0LnN0YXJ0T2Zmc2V0ID09PSByaWdodC5zdGFydE9mZnNldCAmJlxuICAgIGxlZnQuZW5kQ29udGFpbmVyID09PSByaWdodC5lbmRDb250YWluZXIgJiZcbiAgICBsZWZ0LmVuZE9mZnNldCA9PT0gcmlnaHQuZW5kT2Zmc2V0XG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzQW5jZXN0b3JPZiAoYW5jZXN0b3IsIGRlc2NlbmRhbnQpIHtcbiAgdmFyIG5vZGUgPSBkZXNjZW5kYW50O1xuICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSA9PT0gYW5jZXN0b3IpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBHZXRTZWxlY3Rpb24oZ2xvYmFsLmRvY3VtZW50LnNlbGVjdGlvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uO1xuIl19
},{"./rangeToTextRange":8}],7:[function(require,module,exports){
'use strict';

function isHostMethod (host, prop) {
  var type = typeof host[prop];
  return type === 'function' || !!(type === 'object' && host[prop]) || type === 'unknown';
}

function isHostProperty (host, prop) {
  return typeof host[prop] !== 'undefined';
}

function many (fn) {
  return function areHosted (host, props) {
    var i = props.length;
    while (i--) {
      if (!fn(host, props[i])) {
        return false;
      }
    }
    return true;
  };
}

module.exports = {
  method: isHostMethod,
  methods: many(isHostMethod),
  property: isHostProperty,
  properties: many(isHostProperty)
};

},{}],8:[function(require,module,exports){
(function (global){
'use strict';

var doc = global.document;
var body = doc.body;

function rangeToTextRange (range) {
  if (range.collapsed) {
    return createBoundaryTextRange({ node: range.startContainer, offset: range.startOffset }, true);
  }
  var startRange = createBoundaryTextRange({ node: range.startContainer, offset: range.startOffset }, true);
  var endRange = createBoundaryTextRange({ node: range.endContainer, offset: range.endOffset }, false);
  var textRange = body.createTextRange();
  textRange.setEndPoint('StartToStart', startRange);
  textRange.setEndPoint('EndToEnd', endRange);
  return textRange;
}

function isCharacterDataNode (node) {
  var t = node.nodeType;
  return t === 3 || t === 4 || t === 8 ;
}

function createBoundaryTextRange (p, starting) {
  var bound;
  var parent;
  var offset = p.offset;
  var workingNode;
  var childNodes;
  var range = body.createTextRange();
  var data = isCharacterDataNode(p.node);

  if (data) {
    bound = p.node;
    parent = bound.parentNode;
  } else {
    childNodes = p.node.childNodes;
    bound = offset < childNodes.length ? childNodes[offset] : null;
    parent = p.node;
  }

  workingNode = doc.createElement('span');
  workingNode.innerHTML = '&#feff;';

  if (bound) {
    parent.insertBefore(workingNode, bound);
  } else {
    parent.appendChild(workingNode);
  }

  range.moveToElementText(workingNode);
  range.collapse(!starting);
  parent.removeChild(workingNode);

  if (data) {
    range[starting ? 'moveStart' : 'moveEnd']('character', offset);
  }
  return range;
}

module.exports = rangeToTextRange;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS9ub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9yYW5nZVRvVGV4dFJhbmdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGJvZHkgPSBkb2MuYm9keTtcblxuZnVuY3Rpb24gcmFuZ2VUb1RleHRSYW5nZSAocmFuZ2UpIHtcbiAgaWYgKHJhbmdlLmNvbGxhcHNlZCkge1xuICAgIHJldHVybiBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSh7IG5vZGU6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLCBvZmZzZXQ6IHJhbmdlLnN0YXJ0T2Zmc2V0IH0sIHRydWUpO1xuICB9XG4gIHZhciBzdGFydFJhbmdlID0gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiByYW5nZS5zdGFydENvbnRhaW5lciwgb2Zmc2V0OiByYW5nZS5zdGFydE9mZnNldCB9LCB0cnVlKTtcbiAgdmFyIGVuZFJhbmdlID0gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiByYW5nZS5lbmRDb250YWluZXIsIG9mZnNldDogcmFuZ2UuZW5kT2Zmc2V0IH0sIGZhbHNlKTtcbiAgdmFyIHRleHRSYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gIHRleHRSYW5nZS5zZXRFbmRQb2ludCgnU3RhcnRUb1N0YXJ0Jywgc3RhcnRSYW5nZSk7XG4gIHRleHRSYW5nZS5zZXRFbmRQb2ludCgnRW5kVG9FbmQnLCBlbmRSYW5nZSk7XG4gIHJldHVybiB0ZXh0UmFuZ2U7XG59XG5cbmZ1bmN0aW9uIGlzQ2hhcmFjdGVyRGF0YU5vZGUgKG5vZGUpIHtcbiAgdmFyIHQgPSBub2RlLm5vZGVUeXBlO1xuICByZXR1cm4gdCA9PT0gMyB8fCB0ID09PSA0IHx8IHQgPT09IDggO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSAocCwgc3RhcnRpbmcpIHtcbiAgdmFyIGJvdW5kO1xuICB2YXIgcGFyZW50O1xuICB2YXIgb2Zmc2V0ID0gcC5vZmZzZXQ7XG4gIHZhciB3b3JraW5nTm9kZTtcbiAgdmFyIGNoaWxkTm9kZXM7XG4gIHZhciByYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gIHZhciBkYXRhID0gaXNDaGFyYWN0ZXJEYXRhTm9kZShwLm5vZGUpO1xuXG4gIGlmIChkYXRhKSB7XG4gICAgYm91bmQgPSBwLm5vZGU7XG4gICAgcGFyZW50ID0gYm91bmQucGFyZW50Tm9kZTtcbiAgfSBlbHNlIHtcbiAgICBjaGlsZE5vZGVzID0gcC5ub2RlLmNoaWxkTm9kZXM7XG4gICAgYm91bmQgPSBvZmZzZXQgPCBjaGlsZE5vZGVzLmxlbmd0aCA/IGNoaWxkTm9kZXNbb2Zmc2V0XSA6IG51bGw7XG4gICAgcGFyZW50ID0gcC5ub2RlO1xuICB9XG5cbiAgd29ya2luZ05vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICB3b3JraW5nTm9kZS5pbm5lckhUTUwgPSAnJiNmZWZmOyc7XG5cbiAgaWYgKGJvdW5kKSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZSh3b3JraW5nTm9kZSwgYm91bmQpO1xuICB9IGVsc2Uge1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh3b3JraW5nTm9kZSk7XG4gIH1cblxuICByYW5nZS5tb3ZlVG9FbGVtZW50VGV4dCh3b3JraW5nTm9kZSk7XG4gIHJhbmdlLmNvbGxhcHNlKCFzdGFydGluZyk7XG4gIHBhcmVudC5yZW1vdmVDaGlsZCh3b3JraW5nTm9kZSk7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICByYW5nZVtzdGFydGluZyA/ICdtb3ZlU3RhcnQnIDogJ21vdmVFbmQnXSgnY2hhcmFjdGVyJywgb2Zmc2V0KTtcbiAgfVxuICByZXR1cm4gcmFuZ2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZ2VUb1RleHRSYW5nZTtcbiJdfQ==
},{}],9:[function(require,module,exports){
(function (global){
'use strict';

var sell = require('sell');
var crossvent = require('crossvent');
var getSelection = require('seleccion');
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
var win = global;
var doc = document;
var ff = win.mozInnerScreenX !== null && win.mozInnerScreenX !== void 0;

function tailormade (el, options) {
  var textInput = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
  var throttledRefresh = throttle(refresh, 30);
  var o = options || {};

  bind();

  return {
    read: readPosition,
    refresh: throttledRefresh,
    destroy: destroy
  };

  function noop () {}
  function readPosition () { return (textInput ? coordsText : coordsHTML)(); }

  function refresh () {
    if (o.sleeping) {
      return;
    }
    return (o.update || noop)(readPosition());
  }

  function coordsText () {
    var p = sell(el);
    var context = prepare();
    var readings = readTextCoords(context, p.start);
    doc.body.removeChild(context.mirror);
    return readings;
  }

  function coordsHTML () {
    var sel = getSelection();
    if (sel.rangeCount) {
      var range = sel.getRangeAt(0);
      var needsToWorkAroundNewlineBug = range.startContainer.nodeName === 'P' && range.startOffset === 0;
      if (needsToWorkAroundNewlineBug) {
        return {
          x: range.startContainer.offsetLeft,
          y: range.startContainer.offsetTop,
          absolute: true
        };
      }
      if (range.getClientRects) {
        var rects = range.getClientRects();
        if (rects.length > 0) {
          return {
            x: rects[0].left,
            y: rects[0].top,
            absolute: true
          };
        }
      }
    }
    return { x: 0, y: 0 };
  }

  function readTextCoords (context, p) {
    var rest = doc.createElement('span');
    var mirror = context.mirror;
    var computed = context.computed;

    write(mirror, read(el).substring(0, p));

    if (el.tagName === 'INPUT') {
      mirror.textContent = mirror.textContent.replace(/\s/g, '\u00a0');
    }

    write(rest, read(el).substring(p) || '.');

    mirror.appendChild(rest);

    return {
      x: rest.offsetLeft + parseInt(computed['borderLeftWidth']),
      y: rest.offsetTop + parseInt(computed['borderTopWidth'])
    };
  }

  function read (el) {
    return textInput ? el.value : el.innerHTML;
  }

  function prepare () {
    var computed = win.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
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

  function write (el, value) {
    if (textInput) {
      el.textContent = value;
    } else {
      el.innerHTML = value;
    }
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS90YWlsb3JtYWRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBzZWxsID0gcmVxdWlyZSgnc2VsbCcpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGdldFNlbGVjdGlvbiA9IHJlcXVpcmUoJ3NlbGVjY2lvbicpO1xudmFyIHRocm90dGxlID0gcmVxdWlyZSgnLi90aHJvdHRsZScpO1xudmFyIHByb3BzID0gW1xuICAnZGlyZWN0aW9uJyxcbiAgJ2JveFNpemluZycsXG4gICd3aWR0aCcsXG4gICdoZWlnaHQnLFxuICAnb3ZlcmZsb3dYJyxcbiAgJ292ZXJmbG93WScsXG4gICdib3JkZXJUb3BXaWR0aCcsXG4gICdib3JkZXJSaWdodFdpZHRoJyxcbiAgJ2JvcmRlckJvdHRvbVdpZHRoJyxcbiAgJ2JvcmRlckxlZnRXaWR0aCcsXG4gICdwYWRkaW5nVG9wJyxcbiAgJ3BhZGRpbmdSaWdodCcsXG4gICdwYWRkaW5nQm90dG9tJyxcbiAgJ3BhZGRpbmdMZWZ0JyxcbiAgJ2ZvbnRTdHlsZScsXG4gICdmb250VmFyaWFudCcsXG4gICdmb250V2VpZ2h0JyxcbiAgJ2ZvbnRTdHJldGNoJyxcbiAgJ2ZvbnRTaXplJyxcbiAgJ2ZvbnRTaXplQWRqdXN0JyxcbiAgJ2xpbmVIZWlnaHQnLFxuICAnZm9udEZhbWlseScsXG4gICd0ZXh0QWxpZ24nLFxuICAndGV4dFRyYW5zZm9ybScsXG4gICd0ZXh0SW5kZW50JyxcbiAgJ3RleHREZWNvcmF0aW9uJyxcbiAgJ2xldHRlclNwYWNpbmcnLFxuICAnd29yZFNwYWNpbmcnXG5dO1xudmFyIHdpbiA9IGdsb2JhbDtcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBmZiA9IHdpbi5tb3pJbm5lclNjcmVlblggIT09IG51bGwgJiYgd2luLm1veklubmVyU2NyZWVuWCAhPT0gdm9pZCAwO1xuXG5mdW5jdGlvbiB0YWlsb3JtYWRlIChlbCwgb3B0aW9ucykge1xuICB2YXIgdGV4dElucHV0ID0gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnO1xuICB2YXIgdGhyb3R0bGVkUmVmcmVzaCA9IHRocm90dGxlKHJlZnJlc2gsIDMwKTtcbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuXG4gIGJpbmQoKTtcblxuICByZXR1cm4ge1xuICAgIHJlYWQ6IHJlYWRQb3NpdGlvbixcbiAgICByZWZyZXNoOiB0aHJvdHRsZWRSZWZyZXNoLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfTtcblxuICBmdW5jdGlvbiBub29wICgpIHt9XG4gIGZ1bmN0aW9uIHJlYWRQb3NpdGlvbiAoKSB7IHJldHVybiAodGV4dElucHV0ID8gY29vcmRzVGV4dCA6IGNvb3Jkc0hUTUwpKCk7IH1cblxuICBmdW5jdGlvbiByZWZyZXNoICgpIHtcbiAgICBpZiAoby5zbGVlcGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKG8udXBkYXRlIHx8IG5vb3ApKHJlYWRQb3NpdGlvbigpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvb3Jkc1RleHQgKCkge1xuICAgIHZhciBwID0gc2VsbChlbCk7XG4gICAgdmFyIGNvbnRleHQgPSBwcmVwYXJlKCk7XG4gICAgdmFyIHJlYWRpbmdzID0gcmVhZFRleHRDb29yZHMoY29udGV4dCwgcC5zdGFydCk7XG4gICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoY29udGV4dC5taXJyb3IpO1xuICAgIHJldHVybiByZWFkaW5ncztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvb3Jkc0hUTUwgKCkge1xuICAgIHZhciBzZWwgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICBpZiAoc2VsLnJhbmdlQ291bnQpIHtcbiAgICAgIHZhciByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xuICAgICAgdmFyIG5lZWRzVG9Xb3JrQXJvdW5kTmV3bGluZUJ1ZyA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm5vZGVOYW1lID09PSAnUCcgJiYgcmFuZ2Uuc3RhcnRPZmZzZXQgPT09IDA7XG4gICAgICBpZiAobmVlZHNUb1dvcmtBcm91bmROZXdsaW5lQnVnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogcmFuZ2Uuc3RhcnRDb250YWluZXIub2Zmc2V0TGVmdCxcbiAgICAgICAgICB5OiByYW5nZS5zdGFydENvbnRhaW5lci5vZmZzZXRUb3AsXG4gICAgICAgICAgYWJzb2x1dGU6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChyYW5nZS5nZXRDbGllbnRSZWN0cykge1xuICAgICAgICB2YXIgcmVjdHMgPSByYW5nZS5nZXRDbGllbnRSZWN0cygpO1xuICAgICAgICBpZiAocmVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiByZWN0c1swXS5sZWZ0LFxuICAgICAgICAgICAgeTogcmVjdHNbMF0udG9wLFxuICAgICAgICAgICAgYWJzb2x1dGU6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHg6IDAsIHk6IDAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRUZXh0Q29vcmRzIChjb250ZXh0LCBwKSB7XG4gICAgdmFyIHJlc3QgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHZhciBtaXJyb3IgPSBjb250ZXh0Lm1pcnJvcjtcbiAgICB2YXIgY29tcHV0ZWQgPSBjb250ZXh0LmNvbXB1dGVkO1xuXG4gICAgd3JpdGUobWlycm9yLCByZWFkKGVsKS5zdWJzdHJpbmcoMCwgcCkpO1xuXG4gICAgaWYgKGVsLnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgIG1pcnJvci50ZXh0Q29udGVudCA9IG1pcnJvci50ZXh0Q29udGVudC5yZXBsYWNlKC9cXHMvZywgJ1xcdTAwYTAnKTtcbiAgICB9XG5cbiAgICB3cml0ZShyZXN0LCByZWFkKGVsKS5zdWJzdHJpbmcocCkgfHwgJy4nKTtcblxuICAgIG1pcnJvci5hcHBlbmRDaGlsZChyZXN0KTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiByZXN0Lm9mZnNldExlZnQgKyBwYXJzZUludChjb21wdXRlZFsnYm9yZGVyTGVmdFdpZHRoJ10pLFxuICAgICAgeTogcmVzdC5vZmZzZXRUb3AgKyBwYXJzZUludChjb21wdXRlZFsnYm9yZGVyVG9wV2lkdGgnXSlcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoZWwpIHtcbiAgICByZXR1cm4gdGV4dElucHV0ID8gZWwudmFsdWUgOiBlbC5pbm5lckhUTUw7XG4gIH1cblxuICBmdW5jdGlvbiBwcmVwYXJlICgpIHtcbiAgICB2YXIgY29tcHV0ZWQgPSB3aW4uZ2V0Q29tcHV0ZWRTdHlsZSA/IGdldENvbXB1dGVkU3R5bGUoZWwpIDogZWwuY3VycmVudFN0eWxlO1xuICAgIHZhciBtaXJyb3IgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIHN0eWxlID0gbWlycm9yLnN0eWxlO1xuXG4gICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQobWlycm9yKTtcblxuICAgIGlmIChlbC50YWdOYW1lICE9PSAnSU5QVVQnKSB7XG4gICAgICBzdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJztcbiAgICB9XG4gICAgc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCc7XG4gICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICBwcm9wcy5mb3JFYWNoKGNvcHkpO1xuXG4gICAgaWYgKGZmKSB7XG4gICAgICBzdHlsZS53aWR0aCA9IHBhcnNlSW50KGNvbXB1dGVkLndpZHRoKSAtIDIgKyAncHgnO1xuICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+IHBhcnNlSW50KGNvbXB1dGVkLmhlaWdodCkpIHtcbiAgICAgICAgc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgfVxuICAgIHJldHVybiB7IG1pcnJvcjogbWlycm9yLCBjb21wdXRlZDogY29tcHV0ZWQgfTtcblxuICAgIGZ1bmN0aW9uIGNvcHkgKHByb3ApIHtcbiAgICAgIHN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUgKGVsLCB2YWx1ZSkge1xuICAgIGlmICh0ZXh0SW5wdXQpIHtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmQgKHJlbW92ZSkge1xuICAgIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleWRvd24nLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAna2V5dXAnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAnaW5wdXQnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAncGFzdGUnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAnY2hhbmdlJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBiaW5kKHRydWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGFpbG9ybWFkZTtcbiJdfQ==
},{"./throttle":10,"crossvent":12,"seleccion":3,"sell":15}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
(function (global){

var NativeCustomEvent = global.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

module.exports = useNative() ? NativeCustomEvent :

// IE >= 9
'function' === typeof document.createEvent ? function CustomEvent (type, params) {
  var e = document.createEvent('CustomEvent');
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} :

// IE <= 8
function CustomEvent (type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvbm9kZV9tb2R1bGVzL2N1c3RvbS1ldmVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIlxudmFyIE5hdGl2ZUN1c3RvbUV2ZW50ID0gZ2xvYmFsLkN1c3RvbUV2ZW50O1xuXG5mdW5jdGlvbiB1c2VOYXRpdmUgKCkge1xuICB0cnkge1xuICAgIHZhciBwID0gbmV3IE5hdGl2ZUN1c3RvbUV2ZW50KCdjYXQnLCB7IGRldGFpbDogeyBmb286ICdiYXInIH0gfSk7XG4gICAgcmV0dXJuICAnY2F0JyA9PT0gcC50eXBlICYmICdiYXInID09PSBwLmRldGFpbC5mb287XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ3Jvc3MtYnJvd3NlciBgQ3VzdG9tRXZlbnRgIGNvbnN0cnVjdG9yLlxuICpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudC5DdXN0b21FdmVudFxuICpcbiAqIEBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZU5hdGl2ZSgpID8gTmF0aXZlQ3VzdG9tRXZlbnQgOlxuXG4vLyBJRSA+PSA5XG4nZnVuY3Rpb24nID09PSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRXZlbnQgPyBmdW5jdGlvbiBDdXN0b21FdmVudCAodHlwZSwgcGFyYW1zKSB7XG4gIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gIGlmIChwYXJhbXMpIHtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICB9IGVsc2Uge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgdm9pZCAwKTtcbiAgfVxuICByZXR1cm4gZTtcbn0gOlxuXG4vLyBJRSA8PSA4XG5mdW5jdGlvbiBDdXN0b21FdmVudCAodHlwZSwgcGFyYW1zKSB7XG4gIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgZS50eXBlID0gdHlwZTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuYnViYmxlcyA9IEJvb2xlYW4ocGFyYW1zLmJ1YmJsZXMpO1xuICAgIGUuY2FuY2VsYWJsZSA9IEJvb2xlYW4ocGFyYW1zLmNhbmNlbGFibGUpO1xuICAgIGUuZGV0YWlsID0gcGFyYW1zLmRldGFpbDtcbiAgfSBlbHNlIHtcbiAgICBlLmJ1YmJsZXMgPSBmYWxzZTtcbiAgICBlLmNhbmNlbGFibGUgPSBmYWxzZTtcbiAgICBlLmRldGFpbCA9IHZvaWQgMDtcbiAgfVxuICByZXR1cm4gZTtcbn1cbiJdfQ==
},{}],12:[function(require,module,exports){
(function (global){
'use strict';

var customEvent = require('custom-event');
var eventmap = require('./eventmap');
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

function fabricateEvent (el, type, model) {
  var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
  if (el.dispatchEvent) {
    el.dispatchEvent(e);
  } else {
    el.fireEvent('on' + type, e);
  }
  function makeClassicEvent () {
    var e;
    if (doc.createEvent) {
      e = doc.createEvent('Event');
      e.initEvent(type, true, true);
    } else if (doc.createEventObject) {
      e = doc.createEventObject();
    }
    return e;
  }
  function makeCustomEvent () {
    return new customEvent(type, { detail: model });
  }
}

function wrapperFactory (el, type, fn) {
  return function wrapper (originalEvent) {
    var e = originalEvent || global.event;
    e.target = e.target || e.srcElement;
    e.preventDefault = e.preventDefault || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    e.which = e.which || e.keyCode;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2Nyb3NzdmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBjdXN0b21FdmVudCA9IHJlcXVpcmUoJ2N1c3RvbS1ldmVudCcpO1xudmFyIGV2ZW50bWFwID0gcmVxdWlyZSgnLi9ldmVudG1hcCcpO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGFkZEV2ZW50ID0gYWRkRXZlbnRFYXN5O1xudmFyIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRFYXN5O1xudmFyIGhhcmRDYWNoZSA9IFtdO1xuXG5pZiAoIWdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gIGFkZEV2ZW50ID0gYWRkRXZlbnRIYXJkO1xuICByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50SGFyZDtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHVud3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlLCBtb2RlbCkge1xuICB2YXIgZSA9IGV2ZW50bWFwLmluZGV4T2YodHlwZSkgPT09IC0xID8gbWFrZUN1c3RvbUV2ZW50KCkgOiBtYWtlQ2xhc3NpY0V2ZW50KCk7XG4gIGlmIChlbC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDbGFzc2ljRXZlbnQgKCkge1xuICAgIHZhciBlO1xuICAgIGlmIChkb2MuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ3VzdG9tRXZlbnQgKCkge1xuICAgIHJldHVybiBuZXcgY3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWw6IG1vZGVsIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBmbi5jYWxsKGVsLCBlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciB3cmFwcGVyID0gdW53cmFwKGVsLCB0eXBlLCBmbikgfHwgd3JhcHBlckZhY3RvcnkoZWwsIHR5cGUsIGZuKTtcbiAgaGFyZENhY2hlLnB1c2goe1xuICAgIHdyYXBwZXI6IHdyYXBwZXIsXG4gICAgZWxlbWVudDogZWwsXG4gICAgdHlwZTogdHlwZSxcbiAgICBmbjogZm5cbiAgfSk7XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiB1bndyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSA9IGZpbmQoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgd3JhcHBlciA9IGhhcmRDYWNoZVtpXS53cmFwcGVyO1xuICAgIGhhcmRDYWNoZS5zcGxpY2UoaSwgMSk7IC8vIGZyZWUgdXAgYSB0YWQgb2YgbWVtb3J5XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpLCBpdGVtO1xuICBmb3IgKGkgPSAwOyBpIDwgaGFyZENhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbSA9IGhhcmRDYWNoZVtpXTtcbiAgICBpZiAoaXRlbS5lbGVtZW50ID09PSBlbCAmJiBpdGVtLnR5cGUgPT09IHR5cGUgJiYgaXRlbS5mbiA9PT0gZm4pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRFdmVudCxcbiAgcmVtb3ZlOiByZW1vdmVFdmVudCxcbiAgZmFicmljYXRlOiBmYWJyaWNhdGVFdmVudFxufTtcbiJdfQ==
},{"./eventmap":13,"custom-event":11}],13:[function(require,module,exports){
(function (global){
'use strict';

var eventmap = [];
var eventname = '';
var ron = /^on/;

for (eventname in global) {
  if (ron.test(eventname)) {
    eventmap.push(eventname.slice(2));
  }
}

module.exports = eventmap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2V2ZW50bWFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBldmVudG1hcCA9IFtdO1xudmFyIGV2ZW50bmFtZSA9ICcnO1xudmFyIHJvbiA9IC9eb24vO1xuXG5mb3IgKGV2ZW50bmFtZSBpbiBnbG9iYWwpIHtcbiAgaWYgKHJvbi50ZXN0KGV2ZW50bmFtZSkpIHtcbiAgICBldmVudG1hcC5wdXNoKGV2ZW50bmFtZS5zbGljZSgyKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBldmVudG1hcDtcbiJdfQ==
},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJob3JzZXkuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvYnVsbHNleWUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL3NlbGVjY2lvbi9zcmMvZ2V0U2VsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL25vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvbk51bGxPcC5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS9ub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25SYXcuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL3NlbGVjY2lvbi9zcmMvZ2V0U2VsZWN0aW9uU3ludGhldGljLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL25vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2lzSG9zdC5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS9ub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9yYW5nZVRvVGV4dFJhbmdlLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL3RhaWxvcm1hZGUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvdGhyb3R0bGUuanMiLCJub2RlX21vZHVsZXMvY3Jvc3N2ZW50L25vZGVfbW9kdWxlcy9jdXN0b20tZXZlbnQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY3Jvc3N2ZW50L3NyYy9jcm9zc3ZlbnQuanMiLCJub2RlX21vZHVsZXMvY3Jvc3N2ZW50L3NyYy9ldmVudG1hcC5qcyIsIm5vZGVfbW9kdWxlcy9mdXp6eXNlYXJjaC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zZWxsL3NlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMWZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNlbGwgPSByZXF1aXJlKCdzZWxsJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgYnVsbHNleWUgPSByZXF1aXJlKCdidWxsc2V5ZScpO1xudmFyIGZ1enp5c2VhcmNoID0gcmVxdWlyZSgnZnV6enlzZWFyY2gnKTtcbnZhciBLRVlfRU5URVIgPSAxMztcbnZhciBLRVlfRVNDID0gMjc7XG52YXIgS0VZX1VQID0gMzg7XG52YXIgS0VZX0RPV04gPSA0MDtcbnZhciBjYWNoZSA9IFtdO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGRvY0VsZW1lbnQgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG5mdW5jdGlvbiBmaW5kIChlbCkge1xuICB2YXIgZW50cnk7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAwOyBpIDwgY2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBlbnRyeSA9IGNhY2hlW2ldO1xuICAgIGlmIChlbnRyeS5lbCA9PT0gZWwpIHtcbiAgICAgIHJldHVybiBlbnRyeS5hcGk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBob3JzZXkgKGVsLCBvcHRpb25zKSB7XG4gIHZhciBjYWNoZWQgPSBmaW5kKGVsKTtcbiAgaWYgKGNhY2hlZCkge1xuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cblxuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBwYXJlbnQgPSBvLmFwcGVuZFRvIHx8IGRvYy5ib2R5O1xuICB2YXIgcmVuZGVyID0gby5yZW5kZXIgfHwgZGVmYXVsdFJlbmRlcmVyO1xuICB2YXIgZ2V0VGV4dCA9IG8uZ2V0VGV4dCB8fCBkZWZhdWx0R2V0VGV4dDtcbiAgdmFyIGdldFZhbHVlID0gby5nZXRWYWx1ZSB8fCBkZWZhdWx0R2V0VmFsdWU7XG4gIHZhciBmb3JtID0gby5mb3JtO1xuICB2YXIgbGltaXQgPSB0eXBlb2Ygby5saW1pdCA9PT0gJ251bWJlcicgPyBvLmxpbWl0IDogSW5maW5pdHk7XG4gIHZhciBzdWdnZXN0aW9ucyA9IG8uc3VnZ2VzdGlvbnM7XG4gIHZhciB1c2VyRmlsdGVyID0gby5maWx0ZXIgfHwgZGVmYXVsdEZpbHRlcjtcbiAgdmFyIHVzZXJTZXQgPSBvLnNldCB8fCBkZWZhdWx0U2V0dGVyO1xuICB2YXIgdWwgPSB0YWcoJ3VsJywgJ3NleS1saXN0Jyk7XG4gIHZhciBzZWxlY3Rpb24gPSBudWxsO1xuICB2YXIgb25lbG9hZCA9IG9uY2UobG9hZGluZyk7XG4gIHZhciBleWU7XG4gIHZhciBkZWZlcnJlZEZpbHRlcmluZyA9IGRlZmVyKGZpbHRlcmluZyk7XG4gIHZhciBhdHRhY2htZW50ID0gZWw7XG4gIHZhciB0ZXh0SW5wdXQ7XG4gIHZhciBhbnlJbnB1dDtcbiAgdmFyIHJhbmNob3JsZWZ0O1xuICB2YXIgcmFuY2hvcnJpZ2h0O1xuXG4gIGlmIChvLmF1dG9IaWRlT25CbHVyID09PSB2b2lkIDApIHsgby5hdXRvSGlkZU9uQmx1ciA9IHRydWU7IH1cbiAgaWYgKG8uYXV0b0hpZGVPbkNsaWNrID09PSB2b2lkIDApIHsgby5hdXRvSGlkZU9uQ2xpY2sgPSB0cnVlOyB9XG4gIGlmIChvLmF1dG9TaG93T25VcERvd24gPT09IHZvaWQgMCkgeyBvLmF1dG9TaG93T25VcERvd24gPSBlbC50YWdOYW1lID09PSAnSU5QVVQnOyB9XG4gIGlmIChvLmFuY2hvcikge1xuICAgIHJhbmNob3JsZWZ0ID0gbmV3IFJlZ0V4cCgnXicgKyBvLmFuY2hvcik7XG4gICAgcmFuY2hvcnJpZ2h0ID0gbmV3IFJlZ0V4cChvLmFuY2hvciArICckJyk7XG4gIH1cblxuICB2YXIgYXBpID0ge1xuICAgIGFkZDogYWRkLFxuICAgIGFuY2hvcjogby5hbmNob3IsXG4gICAgY2xlYXI6IGNsZWFyLFxuICAgIHNob3c6IHNob3csXG4gICAgaGlkZTogaGlkZSxcbiAgICB0b2dnbGU6IHRvZ2dsZSxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHJlZnJlc2hQb3NpdGlvbjogcmVmcmVzaFBvc2l0aW9uLFxuICAgIGFwcGVuZFRleHQ6IGFwcGVuZFRleHQsXG4gICAgYXBwZW5kSFRNTDogYXBwZW5kSFRNTCxcbiAgICBmaWx0ZXJBbmNob3JlZFRleHQ6IGZpbHRlckFuY2hvcmVkVGV4dCxcbiAgICBmaWx0ZXJBbmNob3JlZEhUTUw6IGZpbHRlckFuY2hvcmVkSFRNTCxcbiAgICBkZWZhdWx0QXBwZW5kVGV4dDogYXBwZW5kVGV4dCxcbiAgICBkZWZhdWx0RmlsdGVyOiBkZWZhdWx0RmlsdGVyLFxuICAgIGRlZmF1bHRHZXRUZXh0OiBkZWZhdWx0R2V0VGV4dCxcbiAgICBkZWZhdWx0R2V0VmFsdWU6IGRlZmF1bHRHZXRWYWx1ZSxcbiAgICBkZWZhdWx0UmVuZGVyZXI6IGRlZmF1bHRSZW5kZXJlcixcbiAgICBkZWZhdWx0U2V0dGVyOiBkZWZhdWx0U2V0dGVyLFxuICAgIHJldGFyZ2V0OiByZXRhcmdldCxcbiAgICBhdHRhY2htZW50OiBhdHRhY2htZW50LFxuICAgIGxpc3Q6IHVsLFxuICAgIHN1Z2dlc3Rpb25zOiBbXVxuICB9O1xuICB2YXIgZW50cnkgPSB7IGVsOiBlbCwgYXBpOiBhcGkgfTtcblxuICByZXRhcmdldChlbCk7XG4gIGNhY2hlLnB1c2goZW50cnkpO1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQodWwpO1xuICBlbC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdvZmYnKTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShzdWdnZXN0aW9ucykpIHtcbiAgICBsb2FkZWQoc3VnZ2VzdGlvbnMpO1xuICB9XG5cbiAgcmV0dXJuIGFwaTtcblxuICBmdW5jdGlvbiByZXRhcmdldCAoZWwpIHtcbiAgICBpbnB1dEV2ZW50cyh0cnVlKTtcbiAgICBhdHRhY2htZW50ID0gYXBpLmF0dGFjaG1lbnQgPSBlbDtcbiAgICB0ZXh0SW5wdXQgPSBhdHRhY2htZW50LnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgYXR0YWNobWVudC50YWdOYW1lID09PSAnVEVYVEFSRUEnO1xuICAgIGFueUlucHV0ID0gdGV4dElucHV0IHx8IGlzRWRpdGFibGUoYXR0YWNobWVudCk7XG4gICAgaW5wdXRFdmVudHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZnJlc2hQb3NpdGlvbiAoKSB7XG4gICAgaWYgKGV5ZSkgeyBleWUucmVmcmVzaCgpOyB9XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkaW5nICgpIHtcbiAgICBjcm9zc3ZlbnQucmVtb3ZlKGF0dGFjaG1lbnQsICdmb2N1cycsIG9uZWxvYWQpO1xuICAgIHN1Z2dlc3Rpb25zKGxvYWRlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkZWQgKHN1Z2dlc3Rpb25zKSB7XG4gICAgc3VnZ2VzdGlvbnMuZm9yRWFjaChhZGQpO1xuICAgIGFwaS5zdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgIHdoaWxlICh1bC5sYXN0Q2hpbGQpIHtcbiAgICAgIHVsLnJlbW92ZUNoaWxkKHVsLmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkIChzdWdnZXN0aW9uKSB7XG4gICAgdmFyIGxpID0gdGFnKCdsaScsICdzZXktaXRlbScpO1xuICAgIHJlbmRlcihsaSwgc3VnZ2VzdGlvbik7XG4gICAgY3Jvc3N2ZW50LmFkZChsaSwgJ2NsaWNrJywgY2xpY2tlZFN1Z2dlc3Rpb24pO1xuICAgIGNyb3NzdmVudC5hZGQobGksICdob3JzZXktZmlsdGVyJywgZmlsdGVySXRlbSk7XG4gICAgY3Jvc3N2ZW50LmFkZChsaSwgJ2hvcnNleS1oaWRlJywgaGlkZUl0ZW0pO1xuICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgICBhcGkuc3VnZ2VzdGlvbnMucHVzaChzdWdnZXN0aW9uKTtcbiAgICByZXR1cm4gbGk7XG5cbiAgICBmdW5jdGlvbiBjbGlja2VkU3VnZ2VzdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShzdWdnZXN0aW9uKTtcbiAgICAgIHNldCh2YWx1ZSk7XG4gICAgICBoaWRlKCk7XG4gICAgICBhdHRhY2htZW50LmZvY3VzKCk7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGF0dGFjaG1lbnQsICdob3JzZXktc2VsZWN0ZWQnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVySXRlbSAoKSB7XG4gICAgICB2YXIgdmFsdWUgPSB0ZXh0SW5wdXQgPyBlbC52YWx1ZSA6IGVsLmlubmVySFRNTDtcbiAgICAgIGlmIChmaWx0ZXIodmFsdWUsIHN1Z2dlc3Rpb24pKSB7XG4gICAgICAgIGxpLmNsYXNzTmFtZSA9IGxpLmNsYXNzTmFtZS5yZXBsYWNlKC8gc2V5LWhpZGUvZywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShsaSwgJ2hvcnNleS1oaWRlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZUl0ZW0gKCkge1xuICAgICAgaWYgKCFoaWRkZW4obGkpKSB7XG4gICAgICAgIGxpLmNsYXNzTmFtZSArPSAnIHNleS1oaWRlJztcbiAgICAgICAgaWYgKHNlbGVjdGlvbiA9PT0gbGkpIHtcbiAgICAgICAgICB1bnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0ICh2YWx1ZSkge1xuICAgIGlmIChvLmFuY2hvcikge1xuICAgICAgcmV0dXJuIChpc1RleHQoKSA/IGFwaS5hcHBlbmRUZXh0IDogYXBpLmFwcGVuZEhUTUwpKHZhbHVlKTtcbiAgICB9XG4gICAgdXNlclNldCh2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXIgKHZhbHVlLCBzdWdnZXN0aW9uKSB7XG4gICAgaWYgKG8uYW5jaG9yKSB7XG4gICAgICB2YXIgaWwgPSAoaXNUZXh0KCkgPyBhcGkuZmlsdGVyQW5jaG9yZWRUZXh0IDogYXBpLmZpbHRlckFuY2hvcmVkSFRNTCkodmFsdWUsIHN1Z2dlc3Rpb24pO1xuICAgICAgcmV0dXJuIGlsID8gdXNlckZpbHRlcihpbC5pbnB1dCwgaWwuc3VnZ2VzdGlvbikgOiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHVzZXJGaWx0ZXIodmFsdWUsIHN1Z2dlc3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNUZXh0ICgpIHsgcmV0dXJuIGlzSW5wdXQoYXR0YWNobWVudCk7IH1cbiAgZnVuY3Rpb24gdmlzaWJsZSAoKSB7IHJldHVybiB1bC5jbGFzc05hbWUuaW5kZXhPZignc2V5LXNob3cnKSAhPT0gLTE7IH1cbiAgZnVuY3Rpb24gaGlkZGVuIChsaSkgeyByZXR1cm4gbGkuY2xhc3NOYW1lLmluZGV4T2YoJ3NleS1oaWRlJykgIT09IC0xOyB9XG5cbiAgZnVuY3Rpb24gc2hvdyAoKSB7XG4gICAgaWYgKCF2aXNpYmxlKCkpIHtcbiAgICAgIHVsLmNsYXNzTmFtZSArPSAnIHNleS1zaG93JztcbiAgICAgIGV5ZS5yZWZyZXNoKCk7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGF0dGFjaG1lbnQsICdob3JzZXktc2hvdycpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZXIgKGUpIHtcbiAgICB2YXIgbGVmdCA9IGUud2hpY2ggPT09IDEgJiYgIWUubWV0YUtleSAmJiAhZS5jdHJsS2V5O1xuICAgIGlmIChsZWZ0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuOyAvLyB3ZSBvbmx5IGNhcmUgYWJvdXQgaG9uZXN0IHRvIGdvZCBsZWZ0LWNsaWNrc1xuICAgIH1cbiAgICB0b2dnbGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZSAoKSB7XG4gICAgaWYgKCF2aXNpYmxlKCkpIHtcbiAgICAgIHNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdCAoc3VnZ2VzdGlvbikge1xuICAgIHVuc2VsZWN0KCk7XG4gICAgaWYgKHN1Z2dlc3Rpb24pIHtcbiAgICAgIHNlbGVjdGlvbiA9IHN1Z2dlc3Rpb247XG4gICAgICBzZWxlY3Rpb24uY2xhc3NOYW1lICs9ICcgc2V5LXNlbGVjdGVkJztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bnNlbGVjdCAoKSB7XG4gICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgc2VsZWN0aW9uLmNsYXNzTmFtZSA9IHNlbGVjdGlvbi5jbGFzc05hbWUucmVwbGFjZSgvIHNleS1zZWxlY3RlZC9nLCAnJyk7XG4gICAgICBzZWxlY3Rpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUgKHVwLCBtb3Zlcykge1xuICAgIHZhciB0b3RhbCA9IHVsLmNoaWxkcmVuLmxlbmd0aDtcbiAgICBpZiAodG90YWwgPCBtb3Zlcykge1xuICAgICAgdW5zZWxlY3QoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRvdGFsID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBmaXJzdCA9IHVwID8gJ2xhc3RDaGlsZCcgOiAnZmlyc3RDaGlsZCc7XG4gICAgdmFyIG5leHQgPSB1cCA/ICdwcmV2aW91c1NpYmxpbmcnIDogJ25leHRTaWJsaW5nJztcbiAgICB2YXIgc3VnZ2VzdGlvbiA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb25bbmV4dF0gfHwgdWxbZmlyc3RdO1xuXG4gICAgc2VsZWN0KHN1Z2dlc3Rpb24pO1xuXG4gICAgaWYgKGhpZGRlbihzdWdnZXN0aW9uKSkge1xuICAgICAgbW92ZSh1cCwgbW92ZXMgPyBtb3ZlcyArIDEgOiAxKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlICgpIHtcbiAgICBleWUuc2xlZXAoKTtcbiAgICB1bC5jbGFzc05hbWUgPSB1bC5jbGFzc05hbWUucmVwbGFjZSgvIHNleS1zaG93L2csICcnKTtcbiAgICB1bnNlbGVjdCgpO1xuICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoYXR0YWNobWVudCwgJ2hvcnNleS1oaWRlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBrZXlkb3duIChlKSB7XG4gICAgdmFyIHNob3duID0gdmlzaWJsZSgpO1xuICAgIHZhciB3aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmICh3aGljaCA9PT0gS0VZX0RPV04pIHtcbiAgICAgIGlmIChhbnlJbnB1dCAmJiBvLmF1dG9TaG93T25VcERvd24pIHtcbiAgICAgICAgc2hvdygpO1xuICAgICAgfVxuICAgICAgaWYgKHNob3duKSB7XG4gICAgICAgIG1vdmUoKTtcbiAgICAgICAgc3RvcChlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHdoaWNoID09PSBLRVlfVVApIHtcbiAgICAgIGlmIChhbnlJbnB1dCAmJiBvLmF1dG9TaG93T25VcERvd24pIHtcbiAgICAgICAgc2hvdygpO1xuICAgICAgfVxuICAgICAgaWYgKHNob3duKSB7XG4gICAgICAgIG1vdmUodHJ1ZSk7XG4gICAgICAgIHN0b3AoZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzaG93bikge1xuICAgICAgaWYgKHdoaWNoID09PSBLRVlfRU5URVIpIHtcbiAgICAgICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoc2VsZWN0aW9uLCAnY2xpY2snKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RvcChlKTtcbiAgICAgIH0gZWxzZSBpZiAod2hpY2ggPT09IEtFWV9FU0MpIHtcbiAgICAgICAgaGlkZSgpO1xuICAgICAgICBzdG9wKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AgKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlcmluZyAoKSB7XG4gICAgaWYgKCF2aXNpYmxlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShhdHRhY2htZW50LCAnaG9yc2V5LWZpbHRlcicpO1xuICAgIHZhciBsaSA9IHVsLmZpcnN0Q2hpbGQ7XG4gICAgdmFyIGNvdW50ID0gMDtcbiAgICB3aGlsZSAobGkpIHtcbiAgICAgIGlmIChjb3VudCA+PSBsaW1pdCkge1xuICAgICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGxpLCAnaG9yc2V5LWhpZGUnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb3VudCA8IGxpbWl0KSB7XG4gICAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUobGksICdob3JzZXktZmlsdGVyJyk7XG4gICAgICAgIGlmIChsaS5jbGFzc05hbWUuaW5kZXhPZignc2V5LWhpZGUnKSA9PT0gLTEpIHtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaSA9IGxpLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGlvbikge1xuICAgICAgbW92ZSgpO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGlvbikge1xuICAgICAgaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmVycmVkRmlsdGVyaW5nTm9FbnRlciAoZSkge1xuICAgIHZhciB3aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmICh3aGljaCA9PT0gS0VZX0VOVEVSKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlZmVycmVkRmlsdGVyaW5nKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWZlcnJlZFNob3cgKGUpIHtcbiAgICB2YXIgd2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAod2hpY2ggPT09IEtFWV9FTlRFUikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KHNob3csIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gaG9yc2V5RXZlbnRUYXJnZXQgKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldCA9PT0gYXR0YWNobWVudCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHdoaWxlICh0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVsIHx8IHRhcmdldCA9PT0gYXR0YWNobWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVPbkJsdXIgKGUpIHtcbiAgICBpZiAoaG9yc2V5RXZlbnRUYXJnZXQoZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZU9uQ2xpY2sgKGUpIHtcbiAgICBpZiAoaG9yc2V5RXZlbnRUYXJnZXQoZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5wdXRFdmVudHMgKHJlbW92ZSkge1xuICAgIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gICAgaWYgKGV5ZSkge1xuICAgICAgZXllLmRlc3Ryb3koKTtcbiAgICAgIGV5ZSA9IG51bGw7XG4gICAgfVxuICAgIGlmICghcmVtb3ZlKSB7XG4gICAgICBleWUgPSBidWxsc2V5ZSh1bCwgYXR0YWNobWVudCwgeyBjYXJldDogYW55SW5wdXQgJiYgYXR0YWNobWVudC50YWdOYW1lICE9PSAnSU5QVVQnIH0pO1xuICAgICAgaWYgKCF2aXNpYmxlKCkpIHsgZXllLnNsZWVwKCk7IH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzdWdnZXN0aW9ucyA9PT0gJ2Z1bmN0aW9uJyAmJiAhb25lbG9hZC51c2VkKSB7XG4gICAgICBpZiAocmVtb3ZlIHx8IChhbnlJbnB1dCAmJiBkb2MuYWN0aXZlRWxlbWVudCAhPT0gYXR0YWNobWVudCkpIHtcbiAgICAgICAgY3Jvc3N2ZW50W29wXShhdHRhY2htZW50LCAnZm9jdXMnLCBvbmVsb2FkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFueUlucHV0KSB7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdrZXlwcmVzcycsIGRlZmVycmVkU2hvdyk7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdrZXlwcmVzcycsIGRlZmVycmVkRmlsdGVyaW5nKTtcbiAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ2tleWRvd24nLCBkZWZlcnJlZEZpbHRlcmluZ05vRW50ZXIpO1xuICAgICAgY3Jvc3N2ZW50W29wXShhdHRhY2htZW50LCAncGFzdGUnLCBkZWZlcnJlZEZpbHRlcmluZyk7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdrZXlkb3duJywga2V5ZG93bik7XG4gICAgICBpZiAoby5hdXRvSGlkZU9uQmx1cikgeyBjcm9zc3ZlbnRbb3BdKGRvY0VsZW1lbnQsICdmb2N1cycsIGhpZGVPbkJsdXIsIHRydWUpOyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ2NsaWNrJywgdG9nZ2xlcik7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGRvY0VsZW1lbnQsICdrZXlkb3duJywga2V5ZG93bik7XG4gICAgfVxuICAgIGlmIChvLmF1dG9IaWRlT25DbGljaykgeyBjcm9zc3ZlbnRbb3BdKGRvYywgJ2NsaWNrJywgaGlkZU9uQ2xpY2spOyB9XG4gICAgaWYgKGZvcm0pIHsgY3Jvc3N2ZW50W29wXShmb3JtLCAnc3VibWl0JywgaGlkZSk7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGlucHV0RXZlbnRzKHRydWUpO1xuICAgIGlmIChwYXJlbnQuY29udGFpbnModWwpKSB7IHBhcmVudC5yZW1vdmVDaGlsZCh1bCk7IH1cbiAgICBjYWNoZS5zcGxpY2UoY2FjaGUuaW5kZXhPZihlbnRyeSksIDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdFNldHRlciAodmFsdWUpIHtcbiAgICBpZiAodGV4dElucHV0KSB7XG4gICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZWZhdWx0UmVuZGVyZXIgKGxpLCBzdWdnZXN0aW9uKSB7XG4gICAgbGkuaW5uZXJUZXh0ID0gbGkudGV4dENvbnRlbnQgPSBnZXRUZXh0KHN1Z2dlc3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdEZpbHRlciAocSwgc3VnZ2VzdGlvbikge1xuICAgIHZhciB0ZXh0ID0gZ2V0VGV4dChzdWdnZXN0aW9uKSB8fCAnJztcbiAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShzdWdnZXN0aW9uKSB8fCAnJztcbiAgICB2YXIgbmVlZGxlID0gcS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBmdXp6eXNlYXJjaChuZWVkbGUsIHRleHQudG9Mb3dlckNhc2UoKSkgfHwgZnV6enlzZWFyY2gobmVlZGxlLCB2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb3BiYWNrVG9BbmNob3IgKHRleHQsIHApIHtcbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdmFyIGFuY2hvcmVkID0gZmFsc2U7XG4gICAgdmFyIHN0YXJ0ID0gcC5zdGFydDtcbiAgICB3aGlsZSAoYW5jaG9yZWQgPT09IGZhbHNlICYmIHN0YXJ0ID49IDApIHtcbiAgICAgIHJlc3VsdCA9IHRleHQuc3Vic3RyKHN0YXJ0IC0gMSwgcC5zdGFydCAtIHN0YXJ0ICsgMSk7XG4gICAgICBhbmNob3JlZCA9IHJhbmNob3JsZWZ0LnRlc3QocmVzdWx0KTtcbiAgICAgIHN0YXJ0LS07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB0ZXh0OiBhbmNob3JlZCA/IHJlc3VsdCA6IG51bGwsXG4gICAgICBzdGFydDogc3RhcnRcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyQW5jaG9yZWRUZXh0IChxLCBzdWdnZXN0aW9uKSB7XG4gICAgdmFyIHBvc2l0aW9uID0gc2VsbChlbCk7XG4gICAgdmFyIGlucHV0ID0gbG9vcGJhY2tUb0FuY2hvcihxLCBwb3NpdGlvbikudGV4dDtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIHJldHVybiB7IGlucHV0OiBpbnB1dCwgc3VnZ2VzdGlvbjogc3VnZ2VzdGlvbiB9O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGVuZFRleHQgKHZhbHVlKSB7XG4gICAgdmFyIGN1cnJlbnQgPSBlbC52YWx1ZTtcbiAgICB2YXIgcG9zaXRpb24gPSBzZWxsKGVsKTtcbiAgICB2YXIgaW5wdXQgPSBsb29wYmFja1RvQW5jaG9yKGN1cnJlbnQsIHBvc2l0aW9uKTtcbiAgICB2YXIgbGVmdCA9IGN1cnJlbnQuc3Vic3RyKDAsIGlucHV0LnN0YXJ0KTtcbiAgICB2YXIgcmlnaHQgPSBjdXJyZW50LnN1YnN0cihpbnB1dC5zdGFydCArIGlucHV0LnRleHQubGVuZ3RoICsgKHBvc2l0aW9uLmVuZCAtIHBvc2l0aW9uLnN0YXJ0KSk7XG4gICAgdmFyIGJlZm9yZSA9IGxlZnQgKyB2YWx1ZSArICcgJztcblxuICAgIGVsLnZhbHVlID0gYmVmb3JlICsgcmlnaHQ7XG4gICAgc2VsbChlbCwgeyBzdGFydDogYmVmb3JlLmxlbmd0aCwgZW5kOiBiZWZvcmUubGVuZ3RoIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyQW5jaG9yZWRIVE1MICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuY2hvcmluZyBpbiBlZGl0YWJsZSBlbGVtZW50cyBpcyBkaXNhYmxlZCBieSBkZWZhdWx0LicpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwZW5kSFRNTCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBbmNob3JpbmcgaW4gZWRpdGFibGUgZWxlbWVudHMgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0lucHV0IChlbCkgeyByZXR1cm4gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnOyB9XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXRWYWx1ZSAoc3VnZ2VzdGlvbikge1xuICByZXR1cm4gZGVmYXVsdEdldCgndmFsdWUnLCBzdWdnZXN0aW9uKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEdldFRleHQgKHN1Z2dlc3Rpb24pIHtcbiAgcmV0dXJuIGRlZmF1bHRHZXQoJ3RleHQnLCBzdWdnZXN0aW9uKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEdldCAodHlwZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICYmIHZhbHVlW3R5cGVdICE9PSB2b2lkIDAgPyB2YWx1ZVt0eXBlXSA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiB0YWcgKHR5cGUsIGNsYXNzTmFtZSkge1xuICB2YXIgZWwgPSBkb2MuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICByZXR1cm4gZWw7XG59XG5cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBkaXNwb3NlZDtcbiAgZnVuY3Rpb24gZGlzcG9zYWJsZSAoKSB7XG4gICAgaWYgKGRpc3Bvc2VkKSB7IHJldHVybjsgfVxuICAgIGRpc3Bvc2FibGUudXNlZCA9IGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAoZm4gfHwgbm9vcCkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgfVxuICByZXR1cm4gZGlzcG9zYWJsZTtcbn1cbmZ1bmN0aW9uIGRlZmVyIChmbikgeyByZXR1cm4gZnVuY3Rpb24gKCkgeyBzZXRUaW1lb3V0KGZuLCAwKTsgfTsgfVxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG5mdW5jdGlvbiBpc0VkaXRhYmxlIChlbCkge1xuICB2YXIgdmFsdWUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnRFZGl0YWJsZScpO1xuICBpZiAodmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZWwucGFyZW50RWxlbWVudCkge1xuICAgIHJldHVybiBpc0VkaXRhYmxlKGVsLnBhcmVudEVsZW1lbnQpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuaG9yc2V5LmZpbmQgPSBmaW5kO1xubW9kdWxlLmV4cG9ydHMgPSBob3JzZXk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciB0aHJvdHRsZSA9IHJlcXVpcmUoJy4vdGhyb3R0bGUnKTtcbnZhciB0YWlsb3JtYWRlID0gcmVxdWlyZSgnLi90YWlsb3JtYWRlJyk7XG5cbmZ1bmN0aW9uIGJ1bGxzZXllIChlbCwgdGFyZ2V0LCBvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucztcbiAgdmFyIGRvbVRhcmdldCA9IHRhcmdldCAmJiB0YXJnZXQudGFnTmFtZTtcblxuICBpZiAoIWRvbVRhcmdldCAmJiBhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgbyA9IHRhcmdldDtcbiAgfVxuICBpZiAoIWRvbVRhcmdldCkge1xuICAgIHRhcmdldCA9IGVsO1xuICB9XG4gIGlmICghbykgeyBvID0ge307IH1cblxuICB2YXIgZGVzdHJveWVkID0gZmFsc2U7XG4gIHZhciB0aHJvdHRsZWRXcml0ZSA9IHRocm90dGxlKHdyaXRlLCAzMCk7XG4gIHZhciB0YWlsb3JPcHRpb25zID0geyB1cGRhdGU6IG8uYXV0b3VwZGF0ZVRvQ2FyZXQgIT09IGZhbHNlICYmIHVwZGF0ZSB9O1xuICB2YXIgdGFpbG9yID0gby5jYXJldCAmJiB0YWlsb3JtYWRlKHRhcmdldCwgdGFpbG9yT3B0aW9ucyk7XG5cbiAgd3JpdGUoKTtcblxuICBpZiAoby50cmFja2luZyAhPT0gZmFsc2UpIHtcbiAgICBjcm9zc3ZlbnQuYWRkKHdpbmRvdywgJ3Jlc2l6ZScsIHRocm90dGxlZFdyaXRlKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVhZDogcmVhZE51bGwsXG4gICAgcmVmcmVzaDogd3JpdGUsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBzbGVlcDogc2xlZXBcbiAgfTtcblxuICBmdW5jdGlvbiBzbGVlcCAoKSB7XG4gICAgdGFpbG9yT3B0aW9ucy5zbGVlcGluZyA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkTnVsbCAoKSB7IHJldHVybiByZWFkKCk7IH1cblxuICBmdW5jdGlvbiByZWFkIChyZWFkaW5ncykge1xuICAgIHZhciBib3VuZHMgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIHNjcm9sbFRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKHRhaWxvcikge1xuICAgICAgcmVhZGluZ3MgPSB0YWlsb3IucmVhZCgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogKHJlYWRpbmdzLmFic29sdXRlID8gMCA6IGJvdW5kcy5sZWZ0KSArIHJlYWRpbmdzLngsXG4gICAgICAgIHk6IChyZWFkaW5ncy5hYnNvbHV0ZSA/IDAgOiBib3VuZHMudG9wKSArIHNjcm9sbFRvcCArIHJlYWRpbmdzLnkgKyAyMFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGJvdW5kcy5sZWZ0LFxuICAgICAgeTogYm91bmRzLnRvcCArIHNjcm9sbFRvcFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKHJlYWRpbmdzKSB7XG4gICAgd3JpdGUocmVhZGluZ3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUgKHJlYWRpbmdzKSB7XG4gICAgaWYgKGRlc3Ryb3llZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCdWxsc2V5ZSBjYW5cXCd0IHJlZnJlc2ggYWZ0ZXIgYmVpbmcgZGVzdHJveWVkLiBDcmVhdGUgYW5vdGhlciBpbnN0YW5jZSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICBpZiAodGFpbG9yICYmICFyZWFkaW5ncykge1xuICAgICAgdGFpbG9yT3B0aW9ucy5zbGVlcGluZyA9IGZhbHNlO1xuICAgICAgdGFpbG9yLnJlZnJlc2goKTsgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcCA9IHJlYWQocmVhZGluZ3MpO1xuICAgIGlmICghdGFpbG9yICYmIHRhcmdldCAhPT0gZWwpIHtcbiAgICAgIHAueSArPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICBlbC5zdHlsZS5sZWZ0ID0gcC54ICsgJ3B4JztcbiAgICBlbC5zdHlsZS50b3AgPSBwLnkgKyAncHgnO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgaWYgKHRhaWxvcikgeyB0YWlsb3IuZGVzdHJveSgpOyB9XG4gICAgY3Jvc3N2ZW50LnJlbW92ZSh3aW5kb3csICdyZXNpemUnLCB0aHJvdHRsZWRXcml0ZSk7XG4gICAgZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1bGxzZXllO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0U2VsZWN0aW9uO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciByYW5nZVRvVGV4dFJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZVRvVGV4dFJhbmdlJyk7XG52YXIgZ2V0U2VsZWN0aW9uUmF3ID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb25SYXcnKTtcbnZhciBnZXRTZWxlY3Rpb25OdWxsT3AgPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvbk51bGxPcCcpO1xudmFyIGdldFNlbGVjdGlvblN5bnRoZXRpYyA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uU3ludGhldGljJyk7XG52YXIgaXNIb3N0ID0gcmVxdWlyZSgnLi9pc0hvc3QnKTtcbmlmIChpc0hvc3QubWV0aG9kKGdsb2JhbCwgJ2dldFNlbGVjdGlvbicpKSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvblJhdztcbn0gZWxzZSBpZiAodHlwZW9mIGRvYy5zZWxlY3Rpb24gPT09ICdvYmplY3QnICYmIGRvYy5zZWxlY3Rpb24pIHtcbiAgZ2V0U2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uU3ludGhldGljO1xufSBlbHNlIHtcbiAgZ2V0U2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uTnVsbE9wO1xufVxuXG5nZXRTZWxlY3Rpb24ucmFuZ2VUb1RleHRSYW5nZSA9IHJhbmdlVG9UZXh0UmFuZ2U7XG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvbjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWRXeHNjMlY1WlM5dWIyUmxYMjF2WkhWc1pYTXZjMlZzWldOamFXOXVMM055WXk5blpYUlRaV3hsWTNScGIyNHVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJR2RsZEZObGJHVmpkR2x2Ymp0Y2JuWmhjaUJrYjJNZ1BTQm5iRzlpWVd3dVpHOWpkVzFsYm5RN1hHNTJZWElnY21GdVoyVlViMVJsZUhSU1lXNW5aU0E5SUhKbGNYVnBjbVVvSnk0dmNtRnVaMlZVYjFSbGVIUlNZVzVuWlNjcE8xeHVkbUZ5SUdkbGRGTmxiR1ZqZEdsdmJsSmhkeUE5SUhKbGNYVnBjbVVvSnk0dloyVjBVMlZzWldOMGFXOXVVbUYzSnlrN1hHNTJZWElnWjJWMFUyVnNaV04wYVc5dVRuVnNiRTl3SUQwZ2NtVnhkV2x5WlNnbkxpOW5aWFJUWld4bFkzUnBiMjVPZFd4c1QzQW5LVHRjYm5aaGNpQm5aWFJUWld4bFkzUnBiMjVUZVc1MGFHVjBhV01nUFNCeVpYRjFhWEpsS0NjdUwyZGxkRk5sYkdWamRHbHZibE41Ym5Sb1pYUnBZeWNwTzF4dWRtRnlJR2x6U0c5emRDQTlJSEpsY1hWcGNtVW9KeTR2YVhOSWIzTjBKeWs3WEc1cFppQW9hWE5JYjNOMExtMWxkR2h2WkNobmJHOWlZV3dzSUNkblpYUlRaV3hsWTNScGIyNG5LU2tnZTF4dUlDQm5aWFJUWld4bFkzUnBiMjRnUFNCblpYUlRaV3hsWTNScGIyNVNZWGM3WEc1OUlHVnNjMlVnYVdZZ0tIUjVjR1Z2WmlCa2IyTXVjMlZzWldOMGFXOXVJRDA5UFNBbmIySnFaV04wSnlBbUppQmtiMk11YzJWc1pXTjBhVzl1S1NCN1hHNGdJR2RsZEZObGJHVmpkR2x2YmlBOUlHZGxkRk5sYkdWamRHbHZibE41Ym5Sb1pYUnBZenRjYm4wZ1pXeHpaU0I3WEc0Z0lHZGxkRk5sYkdWamRHbHZiaUE5SUdkbGRGTmxiR1ZqZEdsdmJrNTFiR3hQY0R0Y2JuMWNibHh1WjJWMFUyVnNaV04wYVc5dUxuSmhibWRsVkc5VVpYaDBVbUZ1WjJVZ1BTQnlZVzVuWlZSdlZHVjRkRkpoYm1kbE8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm5aWFJUWld4bFkzUnBiMjQ3WEc0aVhYMD0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uTnVsbE9wICgpIHtcbiAgcmV0dXJuIHtcbiAgICByZW1vdmVBbGxSYW5nZXM6IG5vb3AsXG4gICAgYWRkUmFuZ2U6IG5vb3BcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb25OdWxsT3A7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGlvblJhdyAoKSB7XG4gIHJldHVybiBnbG9iYWwuZ2V0U2VsZWN0aW9uKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uUmF3O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpZFd4c2MyVjVaUzl1YjJSbFgyMXZaSFZzWlhNdmMyVnNaV05qYVc5dUwzTnlZeTluWlhSVFpXeGxZM1JwYjI1U1lYY3Vhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVablZ1WTNScGIyNGdaMlYwVTJWc1pXTjBhVzl1VW1GM0lDZ3BJSHRjYmlBZ2NtVjBkWEp1SUdkc2IySmhiQzVuWlhSVFpXeGxZM1JwYjI0b0tUdGNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCblpYUlRaV3hsWTNScGIyNVNZWGM3WEc0aVhYMD0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciByYW5nZVRvVGV4dFJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZVRvVGV4dFJhbmdlJyk7XG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGJvZHkgPSBkb2MuYm9keTtcbnZhciBHZXRTZWxlY3Rpb25Qcm90byA9IEdldFNlbGVjdGlvbi5wcm90b3R5cGU7XG5cbmZ1bmN0aW9uIEdldFNlbGVjdGlvbiAoc2VsZWN0aW9uKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHJhbmdlID0gc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG5cbiAgdGhpcy5fc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuICB0aGlzLl9yYW5nZXMgPSBbXTtcblxuICBpZiAoc2VsZWN0aW9uLnR5cGUgPT09ICdDb250cm9sJykge1xuICAgIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24oc2VsZik7XG4gIH0gZWxzZSBpZiAoaXNUZXh0UmFuZ2UocmFuZ2UpKSB7XG4gICAgdXBkYXRlRnJvbVRleHRSYW5nZShzZWxmLCByYW5nZSk7XG4gIH0gZWxzZSB7XG4gICAgdXBkYXRlRW1wdHlTZWxlY3Rpb24oc2VsZik7XG4gIH1cbn1cblxuR2V0U2VsZWN0aW9uUHJvdG8ucmVtb3ZlQWxsUmFuZ2VzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGV4dFJhbmdlO1xuICB0cnkge1xuICAgIHRoaXMuX3NlbGVjdGlvbi5lbXB0eSgpO1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSAhPT0gJ05vbmUnKSB7XG4gICAgICB0ZXh0UmFuZ2UgPSBib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgdGV4dFJhbmdlLnNlbGVjdCgpO1xuICAgICAgdGhpcy5fc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gIH1cbiAgdXBkYXRlRW1wdHlTZWxlY3Rpb24odGhpcyk7XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5hZGRSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICBpZiAodGhpcy5fc2VsZWN0aW9uLnR5cGUgPT09ICdDb250cm9sJykge1xuICAgIGFkZFJhbmdlVG9Db250cm9sU2VsZWN0aW9uKHRoaXMsIHJhbmdlKTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZVRvVGV4dFJhbmdlKHJhbmdlKS5zZWxlY3QoKTtcbiAgICB0aGlzLl9yYW5nZXNbMF0gPSByYW5nZTtcbiAgICB0aGlzLnJhbmdlQ291bnQgPSAxO1xuICAgIHRoaXMuaXNDb2xsYXBzZWQgPSB0aGlzLl9yYW5nZXNbMF0uY29sbGFwc2VkO1xuICAgIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlKHRoaXMsIHJhbmdlLCBmYWxzZSk7XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLnNldFJhbmdlcyA9IGZ1bmN0aW9uIChyYW5nZXMpIHtcbiAgdGhpcy5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgdmFyIHJhbmdlQ291bnQgPSByYW5nZXMubGVuZ3RoO1xuICBpZiAocmFuZ2VDb3VudCA+IDEpIHtcbiAgICBjcmVhdGVDb250cm9sU2VsZWN0aW9uKHRoaXMsIHJhbmdlcyk7XG4gIH0gZWxzZSBpZiAocmFuZ2VDb3VudCkge1xuICAgIHRoaXMuYWRkUmFuZ2UocmFuZ2VzWzBdKTtcbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uZ2V0UmFuZ2VBdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMucmFuZ2VDb3VudCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2V0UmFuZ2VBdCgpOiBpbmRleCBvdXQgb2YgYm91bmRzJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhbmdlc1tpbmRleF0uY2xvbmVSYW5nZSgpO1xuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5yZW1vdmVSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICBpZiAodGhpcy5fc2VsZWN0aW9uLnR5cGUgIT09ICdDb250cm9sJykge1xuICAgIHJlbW92ZVJhbmdlTWFudWFsbHkodGhpcywgcmFuZ2UpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgY29udHJvbFJhbmdlID0gdGhpcy5fc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gIHZhciByYW5nZUVsZW1lbnQgPSBnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKHJhbmdlKTtcbiAgdmFyIG5ld0NvbnRyb2xSYW5nZSA9IGJvZHkuY3JlYXRlQ29udHJvbFJhbmdlKCk7XG4gIHZhciBlbDtcbiAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvbnRyb2xSYW5nZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGVsID0gY29udHJvbFJhbmdlLml0ZW0oaSk7XG4gICAgaWYgKGVsICE9PSByYW5nZUVsZW1lbnQgfHwgcmVtb3ZlZCkge1xuICAgICAgbmV3Q29udHJvbFJhbmdlLmFkZChjb250cm9sUmFuZ2UuaXRlbShpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBuZXdDb250cm9sUmFuZ2Uuc2VsZWN0KCk7XG4gIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24odGhpcyk7XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5lYWNoUmFuZ2UgPSBmdW5jdGlvbiAoZm4sIHJldHVyblZhbHVlKSB7XG4gIHZhciBpID0gMDtcbiAgdmFyIGxlbiA9IHRoaXMuX3Jhbmdlcy5sZW5ndGg7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChmbih0aGlzLmdldFJhbmdlQXQoaSkpKSB7XG4gICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5nZXRBbGxSYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciByYW5nZXMgPSBbXTtcbiAgdGhpcy5lYWNoUmFuZ2UoZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgcmFuZ2VzLnB1c2gocmFuZ2UpO1xuICB9KTtcbiAgcmV0dXJuIHJhbmdlcztcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLnNldFNpbmdsZVJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIHRoaXMucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHRoaXMuYWRkUmFuZ2UocmFuZ2UpO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ29udHJvbFNlbGVjdGlvbiAoc2VsLCByYW5nZXMpIHtcbiAgdmFyIGNvbnRyb2xSYW5nZSA9IGJvZHkuY3JlYXRlQ29udHJvbFJhbmdlKCk7XG4gIGZvciAodmFyIGkgPSAwLCBlbCwgbGVuID0gcmFuZ2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgZWwgPSBnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKHJhbmdlc1tpXSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnRyb2xSYW5nZS5hZGQoZWwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2V0UmFuZ2VzKCk6IEVsZW1lbnQgY291bGQgbm90IGJlIGFkZGVkIHRvIGNvbnRyb2wgc2VsZWN0aW9uJyk7XG4gICAgfVxuICB9XG4gIGNvbnRyb2xSYW5nZS5zZWxlY3QoKTtcbiAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbihzZWwpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVSYW5nZU1hbnVhbGx5IChzZWwsIHJhbmdlKSB7XG4gIHZhciByYW5nZXMgPSBzZWwuZ2V0QWxsUmFuZ2VzKCk7XG4gIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJhbmdlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICghaXNTYW1lUmFuZ2UocmFuZ2UsIHJhbmdlc1tpXSkpIHtcbiAgICAgIHNlbC5hZGRSYW5nZShyYW5nZXNbaV0pO1xuICAgIH1cbiAgfVxuICBpZiAoIXNlbC5yYW5nZUNvdW50KSB7XG4gICAgdXBkYXRlRW1wdHlTZWxlY3Rpb24oc2VsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZSAoc2VsLCByYW5nZSkge1xuICB2YXIgYW5jaG9yUHJlZml4ID0gJ3N0YXJ0JztcbiAgdmFyIGZvY3VzUHJlZml4ID0gJ2VuZCc7XG4gIHNlbC5hbmNob3JOb2RlID0gcmFuZ2VbYW5jaG9yUHJlZml4ICsgJ0NvbnRhaW5lciddO1xuICBzZWwuYW5jaG9yT2Zmc2V0ID0gcmFuZ2VbYW5jaG9yUHJlZml4ICsgJ09mZnNldCddO1xuICBzZWwuZm9jdXNOb2RlID0gcmFuZ2VbZm9jdXNQcmVmaXggKyAnQ29udGFpbmVyJ107XG4gIHNlbC5mb2N1c09mZnNldCA9IHJhbmdlW2ZvY3VzUHJlZml4ICsgJ09mZnNldCddO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVFbXB0eVNlbGVjdGlvbiAoc2VsKSB7XG4gIHNlbC5hbmNob3JOb2RlID0gc2VsLmZvY3VzTm9kZSA9IG51bGw7XG4gIHNlbC5hbmNob3JPZmZzZXQgPSBzZWwuZm9jdXNPZmZzZXQgPSAwO1xuICBzZWwucmFuZ2VDb3VudCA9IDA7XG4gIHNlbC5pc0NvbGxhcHNlZCA9IHRydWU7XG4gIHNlbC5fcmFuZ2VzLmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIHJhbmdlQ29udGFpbnNTaW5nbGVFbGVtZW50IChyYW5nZU5vZGVzKSB7XG4gIGlmICghcmFuZ2VOb2Rlcy5sZW5ndGggfHwgcmFuZ2VOb2Rlc1swXS5ub2RlVHlwZSAhPT0gMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKHZhciBpID0gMSwgbGVuID0gcmFuZ2VOb2Rlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICghaXNBbmNlc3Rvck9mKHJhbmdlTm9kZXNbMF0sIHJhbmdlTm9kZXNbaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlIChyYW5nZSkge1xuICB2YXIgbm9kZXMgPSByYW5nZS5nZXROb2RlcygpO1xuICBpZiAoIXJhbmdlQ29udGFpbnNTaW5nbGVFbGVtZW50KG5vZGVzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZSgpOiByYW5nZSBkaWQgbm90IGNvbnNpc3Qgb2YgYSBzaW5nbGUgZWxlbWVudCcpO1xuICB9XG4gIHJldHVybiBub2Rlc1swXTtcbn1cblxuZnVuY3Rpb24gaXNUZXh0UmFuZ2UgKHJhbmdlKSB7XG4gIHJldHVybiByYW5nZSAmJiByYW5nZS50ZXh0ICE9PSB2b2lkIDA7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZyb21UZXh0UmFuZ2UgKHNlbCwgcmFuZ2UpIHtcbiAgc2VsLl9yYW5nZXMgPSBbcmFuZ2VdO1xuICB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZShzZWwsIHJhbmdlLCBmYWxzZSk7XG4gIHNlbC5yYW5nZUNvdW50ID0gMTtcbiAgc2VsLmlzQ29sbGFwc2VkID0gcmFuZ2UuY29sbGFwc2VkO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDb250cm9sU2VsZWN0aW9uIChzZWwpIHtcbiAgc2VsLl9yYW5nZXMubGVuZ3RoID0gMDtcbiAgaWYgKHNlbC5fc2VsZWN0aW9uLnR5cGUgPT09ICdOb25lJykge1xuICAgIHVwZGF0ZUVtcHR5U2VsZWN0aW9uKHNlbCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNvbnRyb2xSYW5nZSA9IHNlbC5fc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgaWYgKGlzVGV4dFJhbmdlKGNvbnRyb2xSYW5nZSkpIHtcbiAgICAgIHVwZGF0ZUZyb21UZXh0UmFuZ2Uoc2VsLCBjb250cm9sUmFuZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWwucmFuZ2VDb3VudCA9IGNvbnRyb2xSYW5nZS5sZW5ndGg7XG4gICAgICB2YXIgcmFuZ2U7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbC5yYW5nZUNvdW50OyArK2kpIHtcbiAgICAgICAgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShjb250cm9sUmFuZ2UuaXRlbShpKSk7XG4gICAgICAgIHNlbC5fcmFuZ2VzLnB1c2gocmFuZ2UpO1xuICAgICAgfVxuICAgICAgc2VsLmlzQ29sbGFwc2VkID0gc2VsLnJhbmdlQ291bnQgPT09IDEgJiYgc2VsLl9yYW5nZXNbMF0uY29sbGFwc2VkO1xuICAgICAgdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2Uoc2VsLCBzZWwuX3Jhbmdlc1tzZWwucmFuZ2VDb3VudCAtIDFdLCBmYWxzZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFJhbmdlVG9Db250cm9sU2VsZWN0aW9uIChzZWwsIHJhbmdlKSB7XG4gIHZhciBjb250cm9sUmFuZ2UgPSBzZWwuX3NlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICB2YXIgcmFuZ2VFbGVtZW50ID0gZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZShyYW5nZSk7XG4gIHZhciBuZXdDb250cm9sUmFuZ2UgPSBib2R5LmNyZWF0ZUNvbnRyb2xSYW5nZSgpO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gY29udHJvbFJhbmdlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgbmV3Q29udHJvbFJhbmdlLmFkZChjb250cm9sUmFuZ2UuaXRlbShpKSk7XG4gIH1cbiAgdHJ5IHtcbiAgICBuZXdDb250cm9sUmFuZ2UuYWRkKHJhbmdlRWxlbWVudCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FkZFJhbmdlKCk6IEVsZW1lbnQgY291bGQgbm90IGJlIGFkZGVkIHRvIGNvbnRyb2wgc2VsZWN0aW9uJyk7XG4gIH1cbiAgbmV3Q29udHJvbFJhbmdlLnNlbGVjdCgpO1xuICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHNlbCk7XG59XG5cbmZ1bmN0aW9uIGlzU2FtZVJhbmdlIChsZWZ0LCByaWdodCkge1xuICByZXR1cm4gKFxuICAgIGxlZnQuc3RhcnRDb250YWluZXIgPT09IHJpZ2h0LnN0YXJ0Q29udGFpbmVyICYmXG4gICAgbGVmdC5zdGFydE9mZnNldCA9PT0gcmlnaHQuc3RhcnRPZmZzZXQgJiZcbiAgICBsZWZ0LmVuZENvbnRhaW5lciA9PT0gcmlnaHQuZW5kQ29udGFpbmVyICYmXG4gICAgbGVmdC5lbmRPZmZzZXQgPT09IHJpZ2h0LmVuZE9mZnNldFxuICApO1xufVxuXG5mdW5jdGlvbiBpc0FuY2VzdG9yT2YgKGFuY2VzdG9yLCBkZXNjZW5kYW50KSB7XG4gIHZhciBub2RlID0gZGVzY2VuZGFudDtcbiAgd2hpbGUgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgIGlmIChub2RlLnBhcmVudE5vZGUgPT09IGFuY2VzdG9yKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGlvbiAoKSB7XG4gIHJldHVybiBuZXcgR2V0U2VsZWN0aW9uKGdsb2JhbC5kb2N1bWVudC5zZWxlY3Rpb24pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvbjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWRXeHNjMlY1WlM5dWIyUmxYMjF2WkhWc1pYTXZjMlZzWldOamFXOXVMM055WXk5blpYUlRaV3hsWTNScGIyNVRlVzUwYUdWMGFXTXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhKaGJtZGxWRzlVWlhoMFVtRnVaMlVnUFNCeVpYRjFhWEpsS0NjdUwzSmhibWRsVkc5VVpYaDBVbUZ1WjJVbktUdGNiblpoY2lCa2IyTWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzUyWVhJZ1ltOWtlU0E5SUdSdll5NWliMlI1TzF4dWRtRnlJRWRsZEZObGJHVmpkR2x2YmxCeWIzUnZJRDBnUjJWMFUyVnNaV04wYVc5dUxuQnliM1J2ZEhsd1pUdGNibHh1Wm5WdVkzUnBiMjRnUjJWMFUyVnNaV04wYVc5dUlDaHpaV3hsWTNScGIyNHBJSHRjYmlBZ2RtRnlJSE5sYkdZZ1BTQjBhR2x6TzF4dUlDQjJZWElnY21GdVoyVWdQU0J6Wld4bFkzUnBiMjR1WTNKbFlYUmxVbUZ1WjJVb0tUdGNibHh1SUNCMGFHbHpMbDl6Wld4bFkzUnBiMjRnUFNCelpXeGxZM1JwYjI0N1hHNGdJSFJvYVhNdVgzSmhibWRsY3lBOUlGdGRPMXh1WEc0Z0lHbG1JQ2h6Wld4bFkzUnBiMjR1ZEhsd1pTQTlQVDBnSjBOdmJuUnliMnduS1NCN1hHNGdJQ0FnZFhCa1lYUmxRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpaHpaV3htS1R0Y2JpQWdmU0JsYkhObElHbG1JQ2hwYzFSbGVIUlNZVzVuWlNoeVlXNW5aU2twSUh0Y2JpQWdJQ0IxY0dSaGRHVkdjbTl0VkdWNGRGSmhibWRsS0hObGJHWXNJSEpoYm1kbEtUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjFjR1JoZEdWRmJYQjBlVk5sYkdWamRHbHZiaWh6Wld4bUtUdGNiaUFnZlZ4dWZWeHVYRzVIWlhSVFpXeGxZM1JwYjI1UWNtOTBieTV5WlcxdmRtVkJiR3hTWVc1blpYTWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJSFpoY2lCMFpYaDBVbUZ1WjJVN1hHNGdJSFJ5ZVNCN1hHNGdJQ0FnZEdocGN5NWZjMlZzWldOMGFXOXVMbVZ0Y0hSNUtDazdYRzRnSUNBZ2FXWWdLSFJvYVhNdVgzTmxiR1ZqZEdsdmJpNTBlWEJsSUNFOVBTQW5UbTl1WlNjcElIdGNiaUFnSUNBZ0lIUmxlSFJTWVc1blpTQTlJR0p2WkhrdVkzSmxZWFJsVkdWNGRGSmhibWRsS0NrN1hHNGdJQ0FnSUNCMFpYaDBVbUZ1WjJVdWMyVnNaV04wS0NrN1hHNGdJQ0FnSUNCMGFHbHpMbDl6Wld4bFkzUnBiMjR1Wlcxd2RIa29LVHRjYmlBZ0lDQjlYRzRnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnZlZ4dUlDQjFjR1JoZEdWRmJYQjBlVk5sYkdWamRHbHZiaWgwYUdsektUdGNibjA3WEc1Y2JrZGxkRk5sYkdWamRHbHZibEJ5YjNSdkxtRmtaRkpoYm1kbElEMGdablZ1WTNScGIyNGdLSEpoYm1kbEtTQjdYRzRnSUdsbUlDaDBhR2x6TGw5elpXeGxZM1JwYjI0dWRIbHdaU0E5UFQwZ0owTnZiblJ5YjJ3bktTQjdYRzRnSUNBZ1lXUmtVbUZ1WjJWVWIwTnZiblJ5YjJ4VFpXeGxZM1JwYjI0b2RHaHBjeXdnY21GdVoyVXBPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSEpoYm1kbFZHOVVaWGgwVW1GdVoyVW9jbUZ1WjJVcExuTmxiR1ZqZENncE8xeHVJQ0FnSUhSb2FYTXVYM0poYm1kbGMxc3dYU0E5SUhKaGJtZGxPMXh1SUNBZ0lIUm9hWE11Y21GdVoyVkRiM1Z1ZENBOUlERTdYRzRnSUNBZ2RHaHBjeTVwYzBOdmJHeGhjSE5sWkNBOUlIUm9hWE11WDNKaGJtZGxjMXN3WFM1amIyeHNZWEJ6WldRN1hHNGdJQ0FnZFhCa1lYUmxRVzVqYUc5eVFXNWtSbTlqZFhOR2NtOXRVbUZ1WjJVb2RHaHBjeXdnY21GdVoyVXNJR1poYkhObEtUdGNiaUFnZlZ4dWZUdGNibHh1UjJWMFUyVnNaV04wYVc5dVVISnZkRzh1YzJWMFVtRnVaMlZ6SUQwZ1puVnVZM1JwYjI0Z0tISmhibWRsY3lrZ2UxeHVJQ0IwYUdsekxuSmxiVzkyWlVGc2JGSmhibWRsY3lncE8xeHVJQ0IyWVhJZ2NtRnVaMlZEYjNWdWRDQTlJSEpoYm1kbGN5NXNaVzVuZEdnN1hHNGdJR2xtSUNoeVlXNW5aVU52ZFc1MElENGdNU2tnZTF4dUlDQWdJR055WldGMFpVTnZiblJ5YjJ4VFpXeGxZM1JwYjI0b2RHaHBjeXdnY21GdVoyVnpLVHRjYmlBZ2ZTQmxiSE5sSUdsbUlDaHlZVzVuWlVOdmRXNTBLU0I3WEc0Z0lDQWdkR2hwY3k1aFpHUlNZVzVuWlNoeVlXNW5aWE5iTUYwcE8xeHVJQ0I5WEc1OU8xeHVYRzVIWlhSVFpXeGxZM1JwYjI1UWNtOTBieTVuWlhSU1lXNW5aVUYwSUQwZ1puVnVZM1JwYjI0Z0tHbHVaR1Y0S1NCN1hHNGdJR2xtSUNocGJtUmxlQ0E4SURBZ2ZId2dhVzVrWlhnZ1BqMGdkR2hwY3k1eVlXNW5aVU52ZFc1MEtTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkblpYUlNZVzVuWlVGMEtDazZJR2x1WkdWNElHOTFkQ0J2WmlCaWIzVnVaSE1uS1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NWZjbUZ1WjJWelcybHVaR1Y0WFM1amJHOXVaVkpoYm1kbEtDazdYRzRnSUgxY2JuMDdYRzVjYmtkbGRGTmxiR1ZqZEdsdmJsQnliM1J2TG5KbGJXOTJaVkpoYm1kbElEMGdablZ1WTNScGIyNGdLSEpoYm1kbEtTQjdYRzRnSUdsbUlDaDBhR2x6TGw5elpXeGxZM1JwYjI0dWRIbHdaU0FoUFQwZ0owTnZiblJ5YjJ3bktTQjdYRzRnSUNBZ2NtVnRiM1psVW1GdVoyVk5ZVzUxWVd4c2VTaDBhR2x6TENCeVlXNW5aU2s3WEc0Z0lDQWdjbVYwZFhKdU8xeHVJQ0I5WEc0Z0lIWmhjaUJqYjI1MGNtOXNVbUZ1WjJVZ1BTQjBhR2x6TGw5elpXeGxZM1JwYjI0dVkzSmxZWFJsVW1GdVoyVW9LVHRjYmlBZ2RtRnlJSEpoYm1kbFJXeGxiV1Z1ZENBOUlHZGxkRk5wYm1kc1pVVnNaVzFsYm5SR2NtOXRVbUZ1WjJVb2NtRnVaMlVwTzF4dUlDQjJZWElnYm1WM1EyOXVkSEp2YkZKaGJtZGxJRDBnWW05a2VTNWpjbVZoZEdWRGIyNTBjbTlzVW1GdVoyVW9LVHRjYmlBZ2RtRnlJR1ZzTzF4dUlDQjJZWElnY21WdGIzWmxaQ0E5SUdaaGJITmxPMXh1SUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnYkdWdUlEMGdZMjl1ZEhKdmJGSmhibWRsTG14bGJtZDBhRHNnYVNBOElHeGxianNnS3l0cEtTQjdYRzRnSUNBZ1pXd2dQU0JqYjI1MGNtOXNVbUZ1WjJVdWFYUmxiU2hwS1R0Y2JpQWdJQ0JwWmlBb1pXd2dJVDA5SUhKaGJtZGxSV3hsYldWdWRDQjhmQ0J5WlcxdmRtVmtLU0I3WEc0Z0lDQWdJQ0J1WlhkRGIyNTBjbTlzVW1GdVoyVXVZV1JrS0dOdmJuUnliMnhTWVc1blpTNXBkR1Z0S0drcEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnY21WdGIzWmxaQ0E5SUhSeWRXVTdYRzRnSUNBZ2ZWeHVJQ0I5WEc0Z0lHNWxkME52Ym5SeWIyeFNZVzVuWlM1elpXeGxZM1FvS1R0Y2JpQWdkWEJrWVhSbFEyOXVkSEp2YkZObGJHVmpkR2x2YmloMGFHbHpLVHRjYm4wN1hHNWNia2RsZEZObGJHVmpkR2x2YmxCeWIzUnZMbVZoWTJoU1lXNW5aU0E5SUdaMWJtTjBhVzl1SUNobWJpd2djbVYwZFhKdVZtRnNkV1VwSUh0Y2JpQWdkbUZ5SUdrZ1BTQXdPMXh1SUNCMllYSWdiR1Z1SUQwZ2RHaHBjeTVmY21GdVoyVnpMbXhsYm1kMGFEdGNiaUFnWm05eUlDaHBJRDBnTURzZ2FTQThJR3hsYmpzZ0t5dHBLU0I3WEc0Z0lDQWdhV1lnS0dadUtIUm9hWE11WjJWMFVtRnVaMlZCZENocEtTa3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnlaWFIxY201V1lXeDFaVHRjYmlBZ0lDQjlYRzRnSUgxY2JuMDdYRzVjYmtkbGRGTmxiR1ZqZEdsdmJsQnliM1J2TG1kbGRFRnNiRkpoYm1kbGN5QTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdkbUZ5SUhKaGJtZGxjeUE5SUZ0ZE8xeHVJQ0IwYUdsekxtVmhZMmhTWVc1blpTaG1kVzVqZEdsdmJpQW9jbUZ1WjJVcElIdGNiaUFnSUNCeVlXNW5aWE11Y0hWemFDaHlZVzVuWlNrN1hHNGdJSDBwTzF4dUlDQnlaWFIxY200Z2NtRnVaMlZ6TzF4dWZUdGNibHh1UjJWMFUyVnNaV04wYVc5dVVISnZkRzh1YzJWMFUybHVaMnhsVW1GdVoyVWdQU0JtZFc1amRHbHZiaUFvY21GdVoyVXBJSHRjYmlBZ2RHaHBjeTV5WlcxdmRtVkJiR3hTWVc1blpYTW9LVHRjYmlBZ2RHaHBjeTVoWkdSU1lXNW5aU2h5WVc1blpTazdYRzU5TzF4dVhHNW1kVzVqZEdsdmJpQmpjbVZoZEdWRGIyNTBjbTlzVTJWc1pXTjBhVzl1SUNoelpXd3NJSEpoYm1kbGN5a2dlMXh1SUNCMllYSWdZMjl1ZEhKdmJGSmhibWRsSUQwZ1ltOWtlUzVqY21WaGRHVkRiMjUwY205c1VtRnVaMlVvS1R0Y2JpQWdabTl5SUNoMllYSWdhU0E5SURBc0lHVnNMQ0JzWlc0Z1BTQnlZVzVuWlhNdWJHVnVaM1JvT3lCcElEd2diR1Z1T3lBcksya3BJSHRjYmlBZ0lDQmxiQ0E5SUdkbGRGTnBibWRzWlVWc1pXMWxiblJHY205dFVtRnVaMlVvY21GdVoyVnpXMmxkS1R0Y2JpQWdJQ0IwY25rZ2UxeHVJQ0FnSUNBZ1kyOXVkSEp2YkZKaGJtZGxMbUZrWkNobGJDazdYRzRnSUNBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZHpaWFJTWVc1blpYTW9LVG9nUld4bGJXVnVkQ0JqYjNWc1pDQnViM1FnWW1VZ1lXUmtaV1FnZEc4Z1kyOXVkSEp2YkNCelpXeGxZM1JwYjI0bktUdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ1kyOXVkSEp2YkZKaGJtZGxMbk5sYkdWamRDZ3BPMXh1SUNCMWNHUmhkR1ZEYjI1MGNtOXNVMlZzWldOMGFXOXVLSE5sYkNrN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUhKbGJXOTJaVkpoYm1kbFRXRnVkV0ZzYkhrZ0tITmxiQ3dnY21GdVoyVXBJSHRjYmlBZ2RtRnlJSEpoYm1kbGN5QTlJSE5sYkM1blpYUkJiR3hTWVc1blpYTW9LVHRjYmlBZ2MyVnNMbkpsYlc5MlpVRnNiRkpoYm1kbGN5Z3BPMXh1SUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnYkdWdUlEMGdjbUZ1WjJWekxteGxibWQwYURzZ2FTQThJR3hsYmpzZ0t5dHBLU0I3WEc0Z0lDQWdhV1lnS0NGcGMxTmhiV1ZTWVc1blpTaHlZVzVuWlN3Z2NtRnVaMlZ6VzJsZEtTa2dlMXh1SUNBZ0lDQWdjMlZzTG1Ga1pGSmhibWRsS0hKaGJtZGxjMXRwWFNrN1hHNGdJQ0FnZlZ4dUlDQjlYRzRnSUdsbUlDZ2hjMlZzTG5KaGJtZGxRMjkxYm5RcElIdGNiaUFnSUNCMWNHUmhkR1ZGYlhCMGVWTmxiR1ZqZEdsdmJpaHpaV3dwTzF4dUlDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlIVndaR0YwWlVGdVkyaHZja0Z1WkVadlkzVnpSbkp2YlZKaGJtZGxJQ2h6Wld3c0lISmhibWRsS1NCN1hHNGdJSFpoY2lCaGJtTm9iM0pRY21WbWFYZ2dQU0FuYzNSaGNuUW5PMXh1SUNCMllYSWdabTlqZFhOUWNtVm1hWGdnUFNBblpXNWtKenRjYmlBZ2MyVnNMbUZ1WTJodmNrNXZaR1VnUFNCeVlXNW5aVnRoYm1Ob2IzSlFjbVZtYVhnZ0t5QW5RMjl1ZEdGcGJtVnlKMTA3WEc0Z0lITmxiQzVoYm1Ob2IzSlBabVp6WlhRZ1BTQnlZVzVuWlZ0aGJtTm9iM0pRY21WbWFYZ2dLeUFuVDJabWMyVjBKMTA3WEc0Z0lITmxiQzVtYjJOMWMwNXZaR1VnUFNCeVlXNW5aVnRtYjJOMWMxQnlaV1pwZUNBcklDZERiMjUwWVdsdVpYSW5YVHRjYmlBZ2MyVnNMbVp2WTNWelQyWm1jMlYwSUQwZ2NtRnVaMlZiWm05amRYTlFjbVZtYVhnZ0t5QW5UMlptYzJWMEoxMDdYRzU5WEc1Y2JtWjFibU4wYVc5dUlIVndaR0YwWlVWdGNIUjVVMlZzWldOMGFXOXVJQ2h6Wld3cElIdGNiaUFnYzJWc0xtRnVZMmh2Y2s1dlpHVWdQU0J6Wld3dVptOWpkWE5PYjJSbElEMGdiblZzYkR0Y2JpQWdjMlZzTG1GdVkyaHZjazltWm5ObGRDQTlJSE5sYkM1bWIyTjFjMDltWm5ObGRDQTlJREE3WEc0Z0lITmxiQzV5WVc1blpVTnZkVzUwSUQwZ01EdGNiaUFnYzJWc0xtbHpRMjlzYkdGd2MyVmtJRDBnZEhKMVpUdGNiaUFnYzJWc0xsOXlZVzVuWlhNdWJHVnVaM1JvSUQwZ01EdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2NtRnVaMlZEYjI1MFlXbHVjMU5wYm1kc1pVVnNaVzFsYm5RZ0tISmhibWRsVG05a1pYTXBJSHRjYmlBZ2FXWWdLQ0Z5WVc1blpVNXZaR1Z6TG14bGJtZDBhQ0I4ZkNCeVlXNW5aVTV2WkdWeld6QmRMbTV2WkdWVWVYQmxJQ0U5UFNBeEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNCOVhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBeExDQnNaVzRnUFNCeVlXNW5aVTV2WkdWekxteGxibWQwYURzZ2FTQThJR3hsYmpzZ0t5dHBLU0I3WEc0Z0lDQWdhV1lnS0NGcGMwRnVZMlZ6ZEc5eVQyWW9jbUZ1WjJWT2IyUmxjMXN3WFN3Z2NtRnVaMlZPYjJSbGMxdHBYU2twSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhSeWRXVTdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHZGxkRk5wYm1kc1pVVnNaVzFsYm5SR2NtOXRVbUZ1WjJVZ0tISmhibWRsS1NCN1hHNGdJSFpoY2lCdWIyUmxjeUE5SUhKaGJtZGxMbWRsZEU1dlpHVnpLQ2s3WEc0Z0lHbG1JQ2doY21GdVoyVkRiMjUwWVdsdWMxTnBibWRzWlVWc1pXMWxiblFvYm05a1pYTXBLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZG5aWFJUYVc1bmJHVkZiR1Z0Wlc1MFJuSnZiVkpoYm1kbEtDazZJSEpoYm1kbElHUnBaQ0J1YjNRZ1kyOXVjMmx6ZENCdlppQmhJSE5wYm1kc1pTQmxiR1Z0Wlc1MEp5azdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHNXZaR1Z6V3pCZE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCcGMxUmxlSFJTWVc1blpTQW9jbUZ1WjJVcElIdGNiaUFnY21WMGRYSnVJSEpoYm1kbElDWW1JSEpoYm1kbExuUmxlSFFnSVQwOUlIWnZhV1FnTUR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnZFhCa1lYUmxSbkp2YlZSbGVIUlNZVzVuWlNBb2MyVnNMQ0J5WVc1blpTa2dlMXh1SUNCelpXd3VYM0poYm1kbGN5QTlJRnR5WVc1blpWMDdYRzRnSUhWd1pHRjBaVUZ1WTJodmNrRnVaRVp2WTNWelJuSnZiVkpoYm1kbEtITmxiQ3dnY21GdVoyVXNJR1poYkhObEtUdGNiaUFnYzJWc0xuSmhibWRsUTI5MWJuUWdQU0F4TzF4dUlDQnpaV3d1YVhORGIyeHNZWEJ6WldRZ1BTQnlZVzVuWlM1amIyeHNZWEJ6WldRN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUhWd1pHRjBaVU52Ym5SeWIyeFRaV3hsWTNScGIyNGdLSE5sYkNrZ2UxeHVJQ0J6Wld3dVgzSmhibWRsY3k1c1pXNW5kR2dnUFNBd08xeHVJQ0JwWmlBb2MyVnNMbDl6Wld4bFkzUnBiMjR1ZEhsd1pTQTlQVDBnSjA1dmJtVW5LU0I3WEc0Z0lDQWdkWEJrWVhSbFJXMXdkSGxUWld4bFkzUnBiMjRvYzJWc0tUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjJZWElnWTI5dWRISnZiRkpoYm1kbElEMGdjMlZzTGw5elpXeGxZM1JwYjI0dVkzSmxZWFJsVW1GdVoyVW9LVHRjYmlBZ0lDQnBaaUFvYVhOVVpYaDBVbUZ1WjJVb1kyOXVkSEp2YkZKaGJtZGxLU2tnZTF4dUlDQWdJQ0FnZFhCa1lYUmxSbkp2YlZSbGVIUlNZVzVuWlNoelpXd3NJR052Ym5SeWIyeFNZVzVuWlNrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSE5sYkM1eVlXNW5aVU52ZFc1MElEMGdZMjl1ZEhKdmJGSmhibWRsTG14bGJtZDBhRHRjYmlBZ0lDQWdJSFpoY2lCeVlXNW5aVHRjYmlBZ0lDQWdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnYzJWc0xuSmhibWRsUTI5MWJuUTdJQ3NyYVNrZ2UxeHVJQ0FnSUNBZ0lDQnlZVzVuWlNBOUlHUnZZeTVqY21WaGRHVlNZVzVuWlNncE8xeHVJQ0FnSUNBZ0lDQnlZVzVuWlM1elpXeGxZM1JPYjJSbEtHTnZiblJ5YjJ4U1lXNW5aUzVwZEdWdEtHa3BLVHRjYmlBZ0lDQWdJQ0FnYzJWc0xsOXlZVzVuWlhNdWNIVnphQ2h5WVc1blpTazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnpaV3d1YVhORGIyeHNZWEJ6WldRZ1BTQnpaV3d1Y21GdVoyVkRiM1Z1ZENBOVBUMGdNU0FtSmlCelpXd3VYM0poYm1kbGMxc3dYUzVqYjJ4c1lYQnpaV1E3WEc0Z0lDQWdJQ0IxY0dSaGRHVkJibU5vYjNKQmJtUkdiMk4xYzBaeWIyMVNZVzVuWlNoelpXd3NJSE5sYkM1ZmNtRnVaMlZ6VzNObGJDNXlZVzVuWlVOdmRXNTBJQzBnTVYwc0lHWmhiSE5sS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z1lXUmtVbUZ1WjJWVWIwTnZiblJ5YjJ4VFpXeGxZM1JwYjI0Z0tITmxiQ3dnY21GdVoyVXBJSHRjYmlBZ2RtRnlJR052Ym5SeWIyeFNZVzVuWlNBOUlITmxiQzVmYzJWc1pXTjBhVzl1TG1OeVpXRjBaVkpoYm1kbEtDazdYRzRnSUhaaGNpQnlZVzVuWlVWc1pXMWxiblFnUFNCblpYUlRhVzVuYkdWRmJHVnRaVzUwUm5KdmJWSmhibWRsS0hKaGJtZGxLVHRjYmlBZ2RtRnlJRzVsZDBOdmJuUnliMnhTWVc1blpTQTlJR0p2WkhrdVkzSmxZWFJsUTI5dWRISnZiRkpoYm1kbEtDazdYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdMQ0JzWlc0Z1BTQmpiMjUwY205c1VtRnVaMlV1YkdWdVozUm9PeUJwSUR3Z2JHVnVPeUFySzJrcElIdGNiaUFnSUNCdVpYZERiMjUwY205c1VtRnVaMlV1WVdSa0tHTnZiblJ5YjJ4U1lXNW5aUzVwZEdWdEtHa3BLVHRjYmlBZ2ZWeHVJQ0IwY25rZ2UxeHVJQ0FnSUc1bGQwTnZiblJ5YjJ4U1lXNW5aUzVoWkdRb2NtRnVaMlZGYkdWdFpXNTBLVHRjYmlBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnbllXUmtVbUZ1WjJVb0tUb2dSV3hsYldWdWRDQmpiM1ZzWkNCdWIzUWdZbVVnWVdSa1pXUWdkRzhnWTI5dWRISnZiQ0J6Wld4bFkzUnBiMjRuS1R0Y2JpQWdmVnh1SUNCdVpYZERiMjUwY205c1VtRnVaMlV1YzJWc1pXTjBLQ2s3WEc0Z0lIVndaR0YwWlVOdmJuUnliMnhUWld4bFkzUnBiMjRvYzJWc0tUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2FYTlRZVzFsVW1GdVoyVWdLR3hsWm5Rc0lISnBaMmgwS1NCN1hHNGdJSEpsZEhWeWJpQW9YRzRnSUNBZ2JHVm1kQzV6ZEdGeWRFTnZiblJoYVc1bGNpQTlQVDBnY21sbmFIUXVjM1JoY25SRGIyNTBZV2x1WlhJZ0ppWmNiaUFnSUNCc1pXWjBMbk4wWVhKMFQyWm1jMlYwSUQwOVBTQnlhV2RvZEM1emRHRnlkRTltWm5ObGRDQW1KbHh1SUNBZ0lHeGxablF1Wlc1a1EyOXVkR0ZwYm1WeUlEMDlQU0J5YVdkb2RDNWxibVJEYjI1MFlXbHVaWElnSmlaY2JpQWdJQ0JzWldaMExtVnVaRTltWm5ObGRDQTlQVDBnY21sbmFIUXVaVzVrVDJabWMyVjBYRzRnSUNrN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdselFXNWpaWE4wYjNKUFppQW9ZVzVqWlhOMGIzSXNJR1JsYzJObGJtUmhiblFwSUh0Y2JpQWdkbUZ5SUc1dlpHVWdQU0JrWlhOalpXNWtZVzUwTzF4dUlDQjNhR2xzWlNBb2JtOWtaUzV3WVhKbGJuUk9iMlJsS1NCN1hHNGdJQ0FnYVdZZ0tHNXZaR1V1Y0dGeVpXNTBUbTlrWlNBOVBUMGdZVzVqWlhOMGIzSXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjBjblZsTzF4dUlDQWdJSDFjYmlBZ0lDQnViMlJsSUQwZ2JtOWtaUzV3WVhKbGJuUk9iMlJsTzF4dUlDQjlYRzRnSUhKbGRIVnliaUJtWVd4elpUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1oyVjBVMlZzWldOMGFXOXVJQ2dwSUh0Y2JpQWdjbVYwZFhKdUlHNWxkeUJIWlhSVFpXeGxZM1JwYjI0b1oyeHZZbUZzTG1SdlkzVnRaVzUwTG5ObGJHVmpkR2x2YmlrN1hHNTlYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWjJWMFUyVnNaV04wYVc5dU8xeHVJbDE5IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc0hvc3RNZXRob2QgKGhvc3QsIHByb3ApIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgaG9zdFtwcm9wXTtcbiAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgISEodHlwZSA9PT0gJ29iamVjdCcgJiYgaG9zdFtwcm9wXSkgfHwgdHlwZSA9PT0gJ3Vua25vd24nO1xufVxuXG5mdW5jdGlvbiBpc0hvc3RQcm9wZXJ0eSAoaG9zdCwgcHJvcCkge1xuICByZXR1cm4gdHlwZW9mIGhvc3RbcHJvcF0gIT09ICd1bmRlZmluZWQnO1xufVxuXG5mdW5jdGlvbiBtYW55IChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gYXJlSG9zdGVkIChob3N0LCBwcm9wcykge1xuICAgIHZhciBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmICghZm4oaG9zdCwgcHJvcHNbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRob2Q6IGlzSG9zdE1ldGhvZCxcbiAgbWV0aG9kczogbWFueShpc0hvc3RNZXRob2QpLFxuICBwcm9wZXJ0eTogaXNIb3N0UHJvcGVydHksXG4gIHByb3BlcnRpZXM6IG1hbnkoaXNIb3N0UHJvcGVydHkpXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGJvZHkgPSBkb2MuYm9keTtcblxuZnVuY3Rpb24gcmFuZ2VUb1RleHRSYW5nZSAocmFuZ2UpIHtcbiAgaWYgKHJhbmdlLmNvbGxhcHNlZCkge1xuICAgIHJldHVybiBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSh7IG5vZGU6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLCBvZmZzZXQ6IHJhbmdlLnN0YXJ0T2Zmc2V0IH0sIHRydWUpO1xuICB9XG4gIHZhciBzdGFydFJhbmdlID0gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiByYW5nZS5zdGFydENvbnRhaW5lciwgb2Zmc2V0OiByYW5nZS5zdGFydE9mZnNldCB9LCB0cnVlKTtcbiAgdmFyIGVuZFJhbmdlID0gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiByYW5nZS5lbmRDb250YWluZXIsIG9mZnNldDogcmFuZ2UuZW5kT2Zmc2V0IH0sIGZhbHNlKTtcbiAgdmFyIHRleHRSYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gIHRleHRSYW5nZS5zZXRFbmRQb2ludCgnU3RhcnRUb1N0YXJ0Jywgc3RhcnRSYW5nZSk7XG4gIHRleHRSYW5nZS5zZXRFbmRQb2ludCgnRW5kVG9FbmQnLCBlbmRSYW5nZSk7XG4gIHJldHVybiB0ZXh0UmFuZ2U7XG59XG5cbmZ1bmN0aW9uIGlzQ2hhcmFjdGVyRGF0YU5vZGUgKG5vZGUpIHtcbiAgdmFyIHQgPSBub2RlLm5vZGVUeXBlO1xuICByZXR1cm4gdCA9PT0gMyB8fCB0ID09PSA0IHx8IHQgPT09IDggO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSAocCwgc3RhcnRpbmcpIHtcbiAgdmFyIGJvdW5kO1xuICB2YXIgcGFyZW50O1xuICB2YXIgb2Zmc2V0ID0gcC5vZmZzZXQ7XG4gIHZhciB3b3JraW5nTm9kZTtcbiAgdmFyIGNoaWxkTm9kZXM7XG4gIHZhciByYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gIHZhciBkYXRhID0gaXNDaGFyYWN0ZXJEYXRhTm9kZShwLm5vZGUpO1xuXG4gIGlmIChkYXRhKSB7XG4gICAgYm91bmQgPSBwLm5vZGU7XG4gICAgcGFyZW50ID0gYm91bmQucGFyZW50Tm9kZTtcbiAgfSBlbHNlIHtcbiAgICBjaGlsZE5vZGVzID0gcC5ub2RlLmNoaWxkTm9kZXM7XG4gICAgYm91bmQgPSBvZmZzZXQgPCBjaGlsZE5vZGVzLmxlbmd0aCA/IGNoaWxkTm9kZXNbb2Zmc2V0XSA6IG51bGw7XG4gICAgcGFyZW50ID0gcC5ub2RlO1xuICB9XG5cbiAgd29ya2luZ05vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICB3b3JraW5nTm9kZS5pbm5lckhUTUwgPSAnJiNmZWZmOyc7XG5cbiAgaWYgKGJvdW5kKSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZSh3b3JraW5nTm9kZSwgYm91bmQpO1xuICB9IGVsc2Uge1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh3b3JraW5nTm9kZSk7XG4gIH1cblxuICByYW5nZS5tb3ZlVG9FbGVtZW50VGV4dCh3b3JraW5nTm9kZSk7XG4gIHJhbmdlLmNvbGxhcHNlKCFzdGFydGluZyk7XG4gIHBhcmVudC5yZW1vdmVDaGlsZCh3b3JraW5nTm9kZSk7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICByYW5nZVtzdGFydGluZyA/ICdtb3ZlU3RhcnQnIDogJ21vdmVFbmQnXSgnY2hhcmFjdGVyJywgb2Zmc2V0KTtcbiAgfVxuICByZXR1cm4gcmFuZ2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZ2VUb1RleHRSYW5nZTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWRXeHNjMlY1WlM5dWIyUmxYMjF2WkhWc1pYTXZjMlZzWldOamFXOXVMM055WXk5eVlXNW5aVlJ2VkdWNGRGSmhibWRsTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnWkc5aklEMGdaMnh2WW1Gc0xtUnZZM1Z0Wlc1ME8xeHVkbUZ5SUdKdlpIa2dQU0JrYjJNdVltOWtlVHRjYmx4dVpuVnVZM1JwYjI0Z2NtRnVaMlZVYjFSbGVIUlNZVzVuWlNBb2NtRnVaMlVwSUh0Y2JpQWdhV1lnS0hKaGJtZGxMbU52Ykd4aGNITmxaQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQmpjbVZoZEdWQ2IzVnVaR0Z5ZVZSbGVIUlNZVzVuWlNoN0lHNXZaR1U2SUhKaGJtZGxMbk4wWVhKMFEyOXVkR0ZwYm1WeUxDQnZabVp6WlhRNklISmhibWRsTG5OMFlYSjBUMlptYzJWMElIMHNJSFJ5ZFdVcE8xeHVJQ0I5WEc0Z0lIWmhjaUJ6ZEdGeWRGSmhibWRsSUQwZ1kzSmxZWFJsUW05MWJtUmhjbmxVWlhoMFVtRnVaMlVvZXlCdWIyUmxPaUJ5WVc1blpTNXpkR0Z5ZEVOdmJuUmhhVzVsY2l3Z2IyWm1jMlYwT2lCeVlXNW5aUzV6ZEdGeWRFOW1abk5sZENCOUxDQjBjblZsS1R0Y2JpQWdkbUZ5SUdWdVpGSmhibWRsSUQwZ1kzSmxZWFJsUW05MWJtUmhjbmxVWlhoMFVtRnVaMlVvZXlCdWIyUmxPaUJ5WVc1blpTNWxibVJEYjI1MFlXbHVaWElzSUc5bVpuTmxkRG9nY21GdVoyVXVaVzVrVDJabWMyVjBJSDBzSUdaaGJITmxLVHRjYmlBZ2RtRnlJSFJsZUhSU1lXNW5aU0E5SUdKdlpIa3VZM0psWVhSbFZHVjRkRkpoYm1kbEtDazdYRzRnSUhSbGVIUlNZVzVuWlM1elpYUkZibVJRYjJsdWRDZ25VM1JoY25SVWIxTjBZWEowSnl3Z2MzUmhjblJTWVc1blpTazdYRzRnSUhSbGVIUlNZVzVuWlM1elpYUkZibVJRYjJsdWRDZ25SVzVrVkc5RmJtUW5MQ0JsYm1SU1lXNW5aU2s3WEc0Z0lISmxkSFZ5YmlCMFpYaDBVbUZ1WjJVN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdselEyaGhjbUZqZEdWeVJHRjBZVTV2WkdVZ0tHNXZaR1VwSUh0Y2JpQWdkbUZ5SUhRZ1BTQnViMlJsTG01dlpHVlVlWEJsTzF4dUlDQnlaWFIxY200Z2RDQTlQVDBnTXlCOGZDQjBJRDA5UFNBMElIeDhJSFFnUFQwOUlEZ2dPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmpjbVZoZEdWQ2IzVnVaR0Z5ZVZSbGVIUlNZVzVuWlNBb2NDd2djM1JoY25ScGJtY3BJSHRjYmlBZ2RtRnlJR0p2ZFc1a08xeHVJQ0IyWVhJZ2NHRnlaVzUwTzF4dUlDQjJZWElnYjJabWMyVjBJRDBnY0M1dlptWnpaWFE3WEc0Z0lIWmhjaUIzYjNKcmFXNW5UbTlrWlR0Y2JpQWdkbUZ5SUdOb2FXeGtUbTlrWlhNN1hHNGdJSFpoY2lCeVlXNW5aU0E5SUdKdlpIa3VZM0psWVhSbFZHVjRkRkpoYm1kbEtDazdYRzRnSUhaaGNpQmtZWFJoSUQwZ2FYTkRhR0Z5WVdOMFpYSkVZWFJoVG05a1pTaHdMbTV2WkdVcE8xeHVYRzRnSUdsbUlDaGtZWFJoS1NCN1hHNGdJQ0FnWW05MWJtUWdQU0J3TG01dlpHVTdYRzRnSUNBZ2NHRnlaVzUwSUQwZ1ltOTFibVF1Y0dGeVpXNTBUbTlrWlR0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCamFHbHNaRTV2WkdWeklEMGdjQzV1YjJSbExtTm9hV3hrVG05a1pYTTdYRzRnSUNBZ1ltOTFibVFnUFNCdlptWnpaWFFnUENCamFHbHNaRTV2WkdWekxteGxibWQwYUNBL0lHTm9hV3hrVG05a1pYTmJiMlptYzJWMFhTQTZJRzUxYkd3N1hHNGdJQ0FnY0dGeVpXNTBJRDBnY0M1dWIyUmxPMXh1SUNCOVhHNWNiaUFnZDI5eWEybHVaMDV2WkdVZ1BTQmtiMk11WTNKbFlYUmxSV3hsYldWdWRDZ25jM0JoYmljcE8xeHVJQ0IzYjNKcmFXNW5UbTlrWlM1cGJtNWxja2hVVFV3Z1BTQW5KaU5tWldabU95YzdYRzVjYmlBZ2FXWWdLR0p2ZFc1a0tTQjdYRzRnSUNBZ2NHRnlaVzUwTG1sdWMyVnlkRUpsWm05eVpTaDNiM0pyYVc1blRtOWtaU3dnWW05MWJtUXBPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSEJoY21WdWRDNWhjSEJsYm1SRGFHbHNaQ2gzYjNKcmFXNW5UbTlrWlNrN1hHNGdJSDFjYmx4dUlDQnlZVzVuWlM1dGIzWmxWRzlGYkdWdFpXNTBWR1Y0ZENoM2IzSnJhVzVuVG05a1pTazdYRzRnSUhKaGJtZGxMbU52Ykd4aGNITmxLQ0Z6ZEdGeWRHbHVaeWs3WEc0Z0lIQmhjbVZ1ZEM1eVpXMXZkbVZEYUdsc1pDaDNiM0pyYVc1blRtOWtaU2s3WEc1Y2JpQWdhV1lnS0dSaGRHRXBJSHRjYmlBZ0lDQnlZVzVuWlZ0emRHRnlkR2x1WnlBL0lDZHRiM1psVTNSaGNuUW5JRG9nSjIxdmRtVkZibVFuWFNnblkyaGhjbUZqZEdWeUp5d2diMlptYzJWMEtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtRnVaMlU3WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjbUZ1WjJWVWIxUmxlSFJTWVc1blpUdGNiaUpkZlE9PSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHNlbGwgPSByZXF1aXJlKCdzZWxsJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgZ2V0U2VsZWN0aW9uID0gcmVxdWlyZSgnc2VsZWNjaW9uJyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgcHJvcHMgPSBbXG4gICdkaXJlY3Rpb24nLFxuICAnYm94U2l6aW5nJyxcbiAgJ3dpZHRoJyxcbiAgJ2hlaWdodCcsXG4gICdvdmVyZmxvd1gnLFxuICAnb3ZlcmZsb3dZJyxcbiAgJ2JvcmRlclRvcFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdCb3R0b20nLFxuICAncGFkZGluZ0xlZnQnLFxuICAnZm9udFN0eWxlJyxcbiAgJ2ZvbnRWYXJpYW50JyxcbiAgJ2ZvbnRXZWlnaHQnLFxuICAnZm9udFN0cmV0Y2gnLFxuICAnZm9udFNpemUnLFxuICAnZm9udFNpemVBZGp1c3QnLFxuICAnbGluZUhlaWdodCcsXG4gICdmb250RmFtaWx5JyxcbiAgJ3RleHRBbGlnbicsXG4gICd0ZXh0VHJhbnNmb3JtJyxcbiAgJ3RleHRJbmRlbnQnLFxuICAndGV4dERlY29yYXRpb24nLFxuICAnbGV0dGVyU3BhY2luZycsXG4gICd3b3JkU3BhY2luZydcbl07XG52YXIgd2luID0gZ2xvYmFsO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGZmID0gd2luLm1veklubmVyU2NyZWVuWCAhPT0gbnVsbCAmJiB3aW4ubW96SW5uZXJTY3JlZW5YICE9PSB2b2lkIDA7XG5cbmZ1bmN0aW9uIHRhaWxvcm1hZGUgKGVsLCBvcHRpb25zKSB7XG4gIHZhciB0ZXh0SW5wdXQgPSBlbC50YWdOYW1lID09PSAnSU5QVVQnIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQSc7XG4gIHZhciB0aHJvdHRsZWRSZWZyZXNoID0gdGhyb3R0bGUocmVmcmVzaCwgMzApO1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG5cbiAgYmluZCgpO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZDogcmVhZFBvc2l0aW9uLFxuICAgIHJlZnJlc2g6IHRocm90dGxlZFJlZnJlc2gsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xuXG4gIGZ1bmN0aW9uIG5vb3AgKCkge31cbiAgZnVuY3Rpb24gcmVhZFBvc2l0aW9uICgpIHsgcmV0dXJuICh0ZXh0SW5wdXQgPyBjb29yZHNUZXh0IDogY29vcmRzSFRNTCkoKTsgfVxuXG4gIGZ1bmN0aW9uIHJlZnJlc2ggKCkge1xuICAgIGlmIChvLnNsZWVwaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoby51cGRhdGUgfHwgbm9vcCkocmVhZFBvc2l0aW9uKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29vcmRzVGV4dCAoKSB7XG4gICAgdmFyIHAgPSBzZWxsKGVsKTtcbiAgICB2YXIgY29udGV4dCA9IHByZXBhcmUoKTtcbiAgICB2YXIgcmVhZGluZ3MgPSByZWFkVGV4dENvb3Jkcyhjb250ZXh0LCBwLnN0YXJ0KTtcbiAgICBkb2MuYm9keS5yZW1vdmVDaGlsZChjb250ZXh0Lm1pcnJvcik7XG4gICAgcmV0dXJuIHJlYWRpbmdzO1xuICB9XG5cbiAgZnVuY3Rpb24gY29vcmRzSFRNTCAoKSB7XG4gICAgdmFyIHNlbCA9IGdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWwucmFuZ2VDb3VudCkge1xuICAgICAgdmFyIHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XG4gICAgICB2YXIgbmVlZHNUb1dvcmtBcm91bmROZXdsaW5lQnVnID0gcmFuZ2Uuc3RhcnRDb250YWluZXIubm9kZU5hbWUgPT09ICdQJyAmJiByYW5nZS5zdGFydE9mZnNldCA9PT0gMDtcbiAgICAgIGlmIChuZWVkc1RvV29ya0Fyb3VuZE5ld2xpbmVCdWcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiByYW5nZS5zdGFydENvbnRhaW5lci5vZmZzZXRMZWZ0LFxuICAgICAgICAgIHk6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm9mZnNldFRvcCxcbiAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKHJhbmdlLmdldENsaWVudFJlY3RzKSB7XG4gICAgICAgIHZhciByZWN0cyA9IHJhbmdlLmdldENsaWVudFJlY3RzKCk7XG4gICAgICAgIGlmIChyZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHJlY3RzWzBdLmxlZnQsXG4gICAgICAgICAgICB5OiByZWN0c1swXS50b3AsXG4gICAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgeDogMCwgeTogMCB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFRleHRDb29yZHMgKGNvbnRleHQsIHApIHtcbiAgICB2YXIgcmVzdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdmFyIG1pcnJvciA9IGNvbnRleHQubWlycm9yO1xuICAgIHZhciBjb21wdXRlZCA9IGNvbnRleHQuY29tcHV0ZWQ7XG5cbiAgICB3cml0ZShtaXJyb3IsIHJlYWQoZWwpLnN1YnN0cmluZygwLCBwKSk7XG5cbiAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgbWlycm9yLnRleHRDb250ZW50ID0gbWlycm9yLnRleHRDb250ZW50LnJlcGxhY2UoL1xccy9nLCAnXFx1MDBhMCcpO1xuICAgIH1cblxuICAgIHdyaXRlKHJlc3QsIHJlYWQoZWwpLnN1YnN0cmluZyhwKSB8fCAnLicpO1xuXG4gICAgbWlycm9yLmFwcGVuZENoaWxkKHJlc3QpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHJlc3Qub2Zmc2V0TGVmdCArIHBhcnNlSW50KGNvbXB1dGVkWydib3JkZXJMZWZ0V2lkdGgnXSksXG4gICAgICB5OiByZXN0Lm9mZnNldFRvcCArIHBhcnNlSW50KGNvbXB1dGVkWydib3JkZXJUb3BXaWR0aCddKVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChlbCkge1xuICAgIHJldHVybiB0ZXh0SW5wdXQgPyBlbC52YWx1ZSA6IGVsLmlubmVySFRNTDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXBhcmUgKCkge1xuICAgIHZhciBjb21wdXRlZCA9IHdpbi5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbCkgOiBlbC5jdXJyZW50U3R5bGU7XG4gICAgdmFyIG1pcnJvciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgc3R5bGUgPSBtaXJyb3Iuc3R5bGU7XG5cbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChtaXJyb3IpO1xuXG4gICAgaWYgKGVsLnRhZ05hbWUgIT09ICdJTlBVVCcpIHtcbiAgICAgIHN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnO1xuICAgIH1cbiAgICBzdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJztcbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIHByb3BzLmZvckVhY2goY29weSk7XG5cbiAgICBpZiAoZmYpIHtcbiAgICAgIHN0eWxlLndpZHRoID0gcGFyc2VJbnQoY29tcHV0ZWQud2lkdGgpIC0gMiArICdweCc7XG4gICAgICBpZiAoZWwuc2Nyb2xsSGVpZ2h0ID4gcGFyc2VJbnQoY29tcHV0ZWQuaGVpZ2h0KSkge1xuICAgICAgICBzdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgcmV0dXJuIHsgbWlycm9yOiBtaXJyb3IsIGNvbXB1dGVkOiBjb21wdXRlZCB9O1xuXG4gICAgZnVuY3Rpb24gY29weSAocHJvcCkge1xuICAgICAgc3R5bGVbcHJvcF0gPSBjb21wdXRlZFtwcm9wXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZSAoZWwsIHZhbHVlKSB7XG4gICAgaWYgKHRleHRJbnB1dCkge1xuICAgICAgZWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYmluZCAocmVtb3ZlKSB7XG4gICAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAna2V5ZG93bicsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXl1cCcsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdpbnB1dCcsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdwYXN0ZScsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdjaGFuZ2UnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGJpbmQodHJ1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0YWlsb3JtYWRlO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpZFd4c2MyVjVaUzkwWVdsc2IzSnRZV1JsTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJ6Wld4c0lEMGdjbVZ4ZFdseVpTZ25jMlZzYkNjcE8xeHVkbUZ5SUdOeWIzTnpkbVZ1ZENBOUlISmxjWFZwY21Vb0oyTnliM056ZG1WdWRDY3BPMXh1ZG1GeUlHZGxkRk5sYkdWamRHbHZiaUE5SUhKbGNYVnBjbVVvSjNObGJHVmpZMmx2YmljcE8xeHVkbUZ5SUhSb2NtOTBkR3hsSUQwZ2NtVnhkV2x5WlNnbkxpOTBhSEp2ZEhSc1pTY3BPMXh1ZG1GeUlIQnliM0J6SUQwZ1cxeHVJQ0FuWkdseVpXTjBhVzl1Snl4Y2JpQWdKMkp2ZUZOcGVtbHVaeWNzWEc0Z0lDZDNhV1IwYUNjc1hHNGdJQ2RvWldsbmFIUW5MRnh1SUNBbmIzWmxjbVpzYjNkWUp5eGNiaUFnSjI5MlpYSm1iRzkzV1Njc1hHNGdJQ2RpYjNKa1pYSlViM0JYYVdSMGFDY3NYRzRnSUNkaWIzSmtaWEpTYVdkb2RGZHBaSFJvSnl4Y2JpQWdKMkp2Y21SbGNrSnZkSFJ2YlZkcFpIUm9KeXhjYmlBZ0oySnZjbVJsY2t4bFpuUlhhV1IwYUNjc1hHNGdJQ2R3WVdSa2FXNW5WRzl3Snl4Y2JpQWdKM0JoWkdScGJtZFNhV2RvZENjc1hHNGdJQ2R3WVdSa2FXNW5RbTkwZEc5dEp5eGNiaUFnSjNCaFpHUnBibWRNWldaMEp5eGNiaUFnSjJadmJuUlRkSGxzWlNjc1hHNGdJQ2RtYjI1MFZtRnlhV0Z1ZENjc1hHNGdJQ2RtYjI1MFYyVnBaMmgwSnl4Y2JpQWdKMlp2Ym5SVGRISmxkR05vSnl4Y2JpQWdKMlp2Ym5SVGFYcGxKeXhjYmlBZ0oyWnZiblJUYVhwbFFXUnFkWE4wSnl4Y2JpQWdKMnhwYm1WSVpXbG5hSFFuTEZ4dUlDQW5abTl1ZEVaaGJXbHNlU2NzWEc0Z0lDZDBaWGgwUVd4cFoyNG5MRnh1SUNBbmRHVjRkRlJ5WVc1elptOXliU2NzWEc0Z0lDZDBaWGgwU1c1a1pXNTBKeXhjYmlBZ0ozUmxlSFJFWldOdmNtRjBhVzl1Snl4Y2JpQWdKMnhsZEhSbGNsTndZV05wYm1jbkxGeHVJQ0FuZDI5eVpGTndZV05wYm1jblhHNWRPMXh1ZG1GeUlIZHBiaUE5SUdkc2IySmhiRHRjYm5aaGNpQmtiMk1nUFNCa2IyTjFiV1Z1ZER0Y2JuWmhjaUJtWmlBOUlIZHBiaTV0YjNwSmJtNWxjbE5qY21WbGJsZ2dJVDA5SUc1MWJHd2dKaVlnZDJsdUxtMXZla2x1Ym1WeVUyTnlaV1Z1V0NBaFBUMGdkbTlwWkNBd08xeHVYRzVtZFc1amRHbHZiaUIwWVdsc2IzSnRZV1JsSUNobGJDd2diM0IwYVc5dWN5a2dlMXh1SUNCMllYSWdkR1Y0ZEVsdWNIVjBJRDBnWld3dWRHRm5UbUZ0WlNBOVBUMGdKMGxPVUZWVUp5QjhmQ0JsYkM1MFlXZE9ZVzFsSUQwOVBTQW5WRVZZVkVGU1JVRW5PMXh1SUNCMllYSWdkR2h5YjNSMGJHVmtVbVZtY21WemFDQTlJSFJvY205MGRHeGxLSEpsWm5KbGMyZ3NJRE13S1R0Y2JpQWdkbUZ5SUc4Z1BTQnZjSFJwYjI1eklIeDhJSHQ5TzF4dVhHNGdJR0pwYm1Rb0tUdGNibHh1SUNCeVpYUjFjbTRnZTF4dUlDQWdJSEpsWVdRNklISmxZV1JRYjNOcGRHbHZiaXhjYmlBZ0lDQnlaV1p5WlhOb09pQjBhSEp2ZEhSc1pXUlNaV1p5WlhOb0xGeHVJQ0FnSUdSbGMzUnliM2s2SUdSbGMzUnliM2xjYmlBZ2ZUdGNibHh1SUNCbWRXNWpkR2x2YmlCdWIyOXdJQ2dwSUh0OVhHNGdJR1oxYm1OMGFXOXVJSEpsWVdSUWIzTnBkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQW9kR1Y0ZEVsdWNIVjBJRDhnWTI5dmNtUnpWR1Y0ZENBNklHTnZiM0prYzBoVVRVd3BLQ2s3SUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ5WldaeVpYTm9JQ2dwSUh0Y2JpQWdJQ0JwWmlBb2J5NXpiR1ZsY0dsdVp5a2dlMXh1SUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdLRzh1ZFhCa1lYUmxJSHg4SUc1dmIzQXBLSEpsWVdSUWIzTnBkR2x2YmlncEtUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR052YjNKa2MxUmxlSFFnS0NrZ2UxeHVJQ0FnSUhaaGNpQndJRDBnYzJWc2JDaGxiQ2s3WEc0Z0lDQWdkbUZ5SUdOdmJuUmxlSFFnUFNCd2NtVndZWEpsS0NrN1hHNGdJQ0FnZG1GeUlISmxZV1JwYm1keklEMGdjbVZoWkZSbGVIUkRiMjl5WkhNb1kyOXVkR1Y0ZEN3Z2NDNXpkR0Z5ZENrN1hHNGdJQ0FnWkc5akxtSnZaSGt1Y21WdGIzWmxRMmhwYkdRb1kyOXVkR1Y0ZEM1dGFYSnliM0lwTzF4dUlDQWdJSEpsZEhWeWJpQnlaV0ZrYVc1bmN6dGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR052YjNKa2MwaFVUVXdnS0NrZ2UxeHVJQ0FnSUhaaGNpQnpaV3dnUFNCblpYUlRaV3hsWTNScGIyNG9LVHRjYmlBZ0lDQnBaaUFvYzJWc0xuSmhibWRsUTI5MWJuUXBJSHRjYmlBZ0lDQWdJSFpoY2lCeVlXNW5aU0E5SUhObGJDNW5aWFJTWVc1blpVRjBLREFwTzF4dUlDQWdJQ0FnZG1GeUlHNWxaV1J6Vkc5WGIzSnJRWEp2ZFc1a1RtVjNiR2x1WlVKMVp5QTlJSEpoYm1kbExuTjBZWEowUTI5dWRHRnBibVZ5TG01dlpHVk9ZVzFsSUQwOVBTQW5VQ2NnSmlZZ2NtRnVaMlV1YzNSaGNuUlBabVp6WlhRZ1BUMDlJREE3WEc0Z0lDQWdJQ0JwWmlBb2JtVmxaSE5VYjFkdmNtdEJjbTkxYm1ST1pYZHNhVzVsUW5WbktTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjdYRzRnSUNBZ0lDQWdJQ0FnZURvZ2NtRnVaMlV1YzNSaGNuUkRiMjUwWVdsdVpYSXViMlptYzJWMFRHVm1kQ3hjYmlBZ0lDQWdJQ0FnSUNCNU9pQnlZVzVuWlM1emRHRnlkRU52Ym5SaGFXNWxjaTV2Wm1aelpYUlViM0FzWEc0Z0lDQWdJQ0FnSUNBZ1lXSnpiMngxZEdVNklIUnlkV1ZjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUdsbUlDaHlZVzVuWlM1blpYUkRiR2xsYm5SU1pXTjBjeWtnZTF4dUlDQWdJQ0FnSUNCMllYSWdjbVZqZEhNZ1BTQnlZVzVuWlM1blpYUkRiR2xsYm5SU1pXTjBjeWdwTzF4dUlDQWdJQ0FnSUNCcFppQW9jbVZqZEhNdWJHVnVaM1JvSUQ0Z01Da2dlMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjRPaUJ5WldOMGMxc3dYUzVzWldaMExGeHVJQ0FnSUNBZ0lDQWdJQ0FnZVRvZ2NtVmpkSE5iTUYwdWRHOXdMRnh1SUNBZ0lDQWdJQ0FnSUNBZ1lXSnpiMngxZEdVNklIUnlkV1ZjYmlBZ0lDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGRIVnliaUI3SUhnNklEQXNJSGs2SURBZ2ZUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSEpsWVdSVVpYaDBRMjl2Y21SeklDaGpiMjUwWlhoMExDQndLU0I3WEc0Z0lDQWdkbUZ5SUhKbGMzUWdQU0JrYjJNdVkzSmxZWFJsUld4bGJXVnVkQ2duYzNCaGJpY3BPMXh1SUNBZ0lIWmhjaUJ0YVhKeWIzSWdQU0JqYjI1MFpYaDBMbTFwY25KdmNqdGNiaUFnSUNCMllYSWdZMjl0Y0hWMFpXUWdQU0JqYjI1MFpYaDBMbU52YlhCMWRHVmtPMXh1WEc0Z0lDQWdkM0pwZEdVb2JXbHljbTl5TENCeVpXRmtLR1ZzS1M1emRXSnpkSEpwYm1jb01Dd2djQ2twTzF4dVhHNGdJQ0FnYVdZZ0tHVnNMblJoWjA1aGJXVWdQVDA5SUNkSlRsQlZWQ2NwSUh0Y2JpQWdJQ0FnSUcxcGNuSnZjaTUwWlhoMFEyOXVkR1Z1ZENBOUlHMXBjbkp2Y2k1MFpYaDBRMjl1ZEdWdWRDNXlaWEJzWVdObEtDOWNYSE12Wnl3Z0oxeGNkVEF3WVRBbktUdGNiaUFnSUNCOVhHNWNiaUFnSUNCM2NtbDBaU2h5WlhOMExDQnlaV0ZrS0dWc0tTNXpkV0p6ZEhKcGJtY29jQ2tnZkh3Z0p5NG5LVHRjYmx4dUlDQWdJRzFwY25KdmNpNWhjSEJsYm1SRGFHbHNaQ2h5WlhOMEtUdGNibHh1SUNBZ0lISmxkSFZ5YmlCN1hHNGdJQ0FnSUNCNE9pQnlaWE4wTG05bVpuTmxkRXhsWm5RZ0t5QndZWEp6WlVsdWRDaGpiMjF3ZFhSbFpGc25ZbTl5WkdWeVRHVm1kRmRwWkhSb0oxMHBMRnh1SUNBZ0lDQWdlVG9nY21WemRDNXZabVp6WlhSVWIzQWdLeUJ3WVhKelpVbHVkQ2hqYjIxd2RYUmxaRnNuWW05eVpHVnlWRzl3VjJsa2RHZ25YU2xjYmlBZ0lDQjlPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnY21WaFpDQW9aV3dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdkR1Y0ZEVsdWNIVjBJRDhnWld3dWRtRnNkV1VnT2lCbGJDNXBibTVsY2toVVRVdzdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ3Y21Wd1lYSmxJQ2dwSUh0Y2JpQWdJQ0IyWVhJZ1kyOXRjSFYwWldRZ1BTQjNhVzR1WjJWMFEyOXRjSFYwWldSVGRIbHNaU0EvSUdkbGRFTnZiWEIxZEdWa1UzUjViR1VvWld3cElEb2daV3d1WTNWeWNtVnVkRk4wZVd4bE8xeHVJQ0FnSUhaaGNpQnRhWEp5YjNJZ1BTQmtiMk11WTNKbFlYUmxSV3hsYldWdWRDZ25aR2wySnlrN1hHNGdJQ0FnZG1GeUlITjBlV3hsSUQwZ2JXbHljbTl5TG5OMGVXeGxPMXh1WEc0Z0lDQWdaRzlqTG1KdlpIa3VZWEJ3Wlc1a1EyaHBiR1FvYldseWNtOXlLVHRjYmx4dUlDQWdJR2xtSUNobGJDNTBZV2RPWVcxbElDRTlQU0FuU1U1UVZWUW5LU0I3WEc0Z0lDQWdJQ0J6ZEhsc1pTNTNiM0prVjNKaGNDQTlJQ2RpY21WaGF5MTNiM0prSnp0Y2JpQWdJQ0I5WEc0Z0lDQWdjM1I1YkdVdWQyaHBkR1ZUY0dGalpTQTlJQ2R3Y21VdGQzSmhjQ2M3WEc0Z0lDQWdjM1I1YkdVdWNHOXphWFJwYjI0Z1BTQW5ZV0p6YjJ4MWRHVW5PMXh1SUNBZ0lITjBlV3hsTG5acGMybGlhV3hwZEhrZ1BTQW5hR2xrWkdWdUp6dGNiaUFnSUNCd2NtOXdjeTVtYjNKRllXTm9LR052Y0hrcE8xeHVYRzRnSUNBZ2FXWWdLR1ptS1NCN1hHNGdJQ0FnSUNCemRIbHNaUzUzYVdSMGFDQTlJSEJoY25ObFNXNTBLR052YlhCMWRHVmtMbmRwWkhSb0tTQXRJRElnS3lBbmNIZ25PMXh1SUNBZ0lDQWdhV1lnS0dWc0xuTmpjbTlzYkVobGFXZG9kQ0ErSUhCaGNuTmxTVzUwS0dOdmJYQjFkR1ZrTG1obGFXZG9kQ2twSUh0Y2JpQWdJQ0FnSUNBZ2MzUjViR1V1YjNabGNtWnNiM2RaSUQwZ0ozTmpjbTlzYkNjN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSE4wZVd4bExtOTJaWEptYkc5M0lEMGdKMmhwWkdSbGJpYzdYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGRIVnliaUI3SUcxcGNuSnZjam9nYldseWNtOXlMQ0JqYjIxd2RYUmxaRG9nWTI5dGNIVjBaV1FnZlR0Y2JseHVJQ0FnSUdaMWJtTjBhVzl1SUdOdmNIa2dLSEJ5YjNBcElIdGNiaUFnSUNBZ0lITjBlV3hsVzNCeWIzQmRJRDBnWTI5dGNIVjBaV1JiY0hKdmNGMDdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdkM0pwZEdVZ0tHVnNMQ0IyWVd4MVpTa2dlMXh1SUNBZ0lHbG1JQ2gwWlhoMFNXNXdkWFFwSUh0Y2JpQWdJQ0FnSUdWc0xuUmxlSFJEYjI1MFpXNTBJRDBnZG1Gc2RXVTdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUdWc0xtbHVibVZ5U0ZSTlRDQTlJSFpoYkhWbE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHSnBibVFnS0hKbGJXOTJaU2tnZTF4dUlDQWdJSFpoY2lCdmNDQTlJSEpsYlc5MlpTQS9JQ2R5WlcxdmRtVW5JRG9nSjJGa1pDYzdYRzRnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hsYkN3Z0oydGxlV1J2ZDI0bkxDQjBhSEp2ZEhSc1pXUlNaV1p5WlhOb0tUdGNiaUFnSUNCamNtOXpjM1psYm5SYmIzQmRLR1ZzTENBbmEyVjVkWEFuTENCMGFISnZkSFJzWldSU1pXWnlaWE5vS1R0Y2JpQWdJQ0JqY205emMzWmxiblJiYjNCZEtHVnNMQ0FuYVc1d2RYUW5MQ0IwYUhKdmRIUnNaV1JTWldaeVpYTm9LVHRjYmlBZ0lDQmpjbTl6YzNabGJuUmJiM0JkS0dWc0xDQW5jR0Z6ZEdVbkxDQjBhSEp2ZEhSc1pXUlNaV1p5WlhOb0tUdGNiaUFnSUNCamNtOXpjM1psYm5SYmIzQmRLR1ZzTENBblkyaGhibWRsSnl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmtaWE4wY205NUlDZ3BJSHRjYmlBZ0lDQmlhVzVrS0hSeWRXVXBPMXh1SUNCOVhHNTlYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnZEdGcGJHOXliV0ZrWlR0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB0aHJvdHRsZSAoZm4sIGJvdW5kYXJ5KSB7XG4gIHZhciBsYXN0ID0gLUluZmluaXR5O1xuICB2YXIgdGltZXI7XG4gIHJldHVybiBmdW5jdGlvbiBib3VuY2VkICgpIHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdW5ib3VuZCgpO1xuXG4gICAgZnVuY3Rpb24gdW5ib3VuZCAoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgdmFyIG5leHQgPSBsYXN0ICsgYm91bmRhcnk7XG4gICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIGlmIChub3cgPiBuZXh0KSB7XG4gICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQodW5ib3VuZCwgbmV4dCAtIG5vdyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXG52YXIgTmF0aXZlQ3VzdG9tRXZlbnQgPSBnbG9iYWwuQ3VzdG9tRXZlbnQ7XG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHAgPSBuZXcgTmF0aXZlQ3VzdG9tRXZlbnQoJ2NhdCcsIHsgZGV0YWlsOiB7IGZvbzogJ2JhcicgfSB9KTtcbiAgICByZXR1cm4gICdjYXQnID09PSBwLnR5cGUgJiYgJ2JhcicgPT09IHAuZGV0YWlsLmZvbztcbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcm9zcy1icm93c2VyIGBDdXN0b21FdmVudGAgY29uc3RydWN0b3IuXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50LkN1c3RvbUV2ZW50XG4gKlxuICogQHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdXNlTmF0aXZlKCkgPyBOYXRpdmVDdXN0b21FdmVudCA6XG5cbi8vIElFID49IDlcbidmdW5jdGlvbicgPT09IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFdmVudCA/IGZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gIH0gZWxzZSB7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlLCB2b2lkIDApO1xuICB9XG4gIHJldHVybiBlO1xufSA6XG5cbi8vIElFIDw9IDhcbmZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICBlLnR5cGUgPSB0eXBlO1xuICBpZiAocGFyYW1zKSB7XG4gICAgZS5idWJibGVzID0gQm9vbGVhbihwYXJhbXMuYnViYmxlcyk7XG4gICAgZS5jYW5jZWxhYmxlID0gQm9vbGVhbihwYXJhbXMuY2FuY2VsYWJsZSk7XG4gICAgZS5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICB9IGVsc2Uge1xuICAgIGUuYnViYmxlcyA9IGZhbHNlO1xuICAgIGUuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgIGUuZGV0YWlsID0gdm9pZCAwO1xuICB9XG4gIHJldHVybiBlO1xufVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlqY205emMzWmxiblF2Ym05a1pWOXRiMlIxYkdWekwyTjFjM1J2YlMxbGRtVnVkQzlwYm1SbGVDNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklseHVkbUZ5SUU1aGRHbDJaVU4xYzNSdmJVVjJaVzUwSUQwZ1oyeHZZbUZzTGtOMWMzUnZiVVYyWlc1ME8xeHVYRzVtZFc1amRHbHZiaUIxYzJWT1lYUnBkbVVnS0NrZ2UxeHVJQ0IwY25rZ2UxeHVJQ0FnSUhaaGNpQndJRDBnYm1WM0lFNWhkR2wyWlVOMWMzUnZiVVYyWlc1MEtDZGpZWFFuTENCN0lHUmxkR0ZwYkRvZ2V5Qm1iMjg2SUNkaVlYSW5JSDBnZlNrN1hHNGdJQ0FnY21WMGRYSnVJQ0FuWTJGMEp5QTlQVDBnY0M1MGVYQmxJQ1ltSUNkaVlYSW5JRDA5UFNCd0xtUmxkR0ZwYkM1bWIyODdYRzRnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1ptRnNjMlU3WEc1OVhHNWNiaThxS2x4dUlDb2dRM0p2YzNNdFluSnZkM05sY2lCZ1EzVnpkRzl0UlhabGJuUmdJR052Ym5OMGNuVmpkRzl5TGx4dUlDcGNiaUFxSUdoMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBGUVNTOURkWE4wYjIxRmRtVnVkQzVEZFhOMGIyMUZkbVZ1ZEZ4dUlDcGNiaUFxSUVCd2RXSnNhV05jYmlBcUwxeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSFZ6WlU1aGRHbDJaU2dwSUQ4Z1RtRjBhWFpsUTNWemRHOXRSWFpsYm5RZ09seHVYRzR2THlCSlJTQStQU0E1WEc0blpuVnVZM1JwYjI0bklEMDlQU0IwZVhCbGIyWWdaRzlqZFcxbGJuUXVZM0psWVhSbFJYWmxiblFnUHlCbWRXNWpkR2x2YmlCRGRYTjBiMjFGZG1WdWRDQW9kSGx3WlN3Z2NHRnlZVzF6S1NCN1hHNGdJSFpoY2lCbElEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJYWmxiblFvSjBOMWMzUnZiVVYyWlc1MEp5azdYRzRnSUdsbUlDaHdZWEpoYlhNcElIdGNiaUFnSUNCbExtbHVhWFJEZFhOMGIyMUZkbVZ1ZENoMGVYQmxMQ0J3WVhKaGJYTXVZblZpWW14bGN5d2djR0Z5WVcxekxtTmhibU5sYkdGaWJHVXNJSEJoY21GdGN5NWtaWFJoYVd3cE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHVXVhVzVwZEVOMWMzUnZiVVYyWlc1MEtIUjVjR1VzSUdaaGJITmxMQ0JtWVd4elpTd2dkbTlwWkNBd0tUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1pUdGNibjBnT2x4dVhHNHZMeUJKUlNBOFBTQTRYRzVtZFc1amRHbHZiaUJEZFhOMGIyMUZkbVZ1ZENBb2RIbHdaU3dnY0dGeVlXMXpLU0I3WEc0Z0lIWmhjaUJsSUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUlhabGJuUlBZbXBsWTNRb0tUdGNiaUFnWlM1MGVYQmxJRDBnZEhsd1pUdGNiaUFnYVdZZ0tIQmhjbUZ0Y3lrZ2UxeHVJQ0FnSUdVdVluVmlZbXhsY3lBOUlFSnZiMnhsWVc0b2NHRnlZVzF6TG1KMVltSnNaWE1wTzF4dUlDQWdJR1V1WTJGdVkyVnNZV0pzWlNBOUlFSnZiMnhsWVc0b2NHRnlZVzF6TG1OaGJtTmxiR0ZpYkdVcE8xeHVJQ0FnSUdVdVpHVjBZV2xzSUQwZ2NHRnlZVzF6TG1SbGRHRnBiRHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JsTG1KMVltSnNaWE1nUFNCbVlXeHpaVHRjYmlBZ0lDQmxMbU5oYm1ObGJHRmliR1VnUFNCbVlXeHpaVHRjYmlBZ0lDQmxMbVJsZEdGcGJDQTlJSFp2YVdRZ01EdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1pUdGNibjFjYmlKZGZRPT0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBjdXN0b21FdmVudCA9IHJlcXVpcmUoJ2N1c3RvbS1ldmVudCcpO1xudmFyIGV2ZW50bWFwID0gcmVxdWlyZSgnLi9ldmVudG1hcCcpO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGFkZEV2ZW50ID0gYWRkRXZlbnRFYXN5O1xudmFyIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRFYXN5O1xudmFyIGhhcmRDYWNoZSA9IFtdO1xuXG5pZiAoIWdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gIGFkZEV2ZW50ID0gYWRkRXZlbnRIYXJkO1xuICByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50SGFyZDtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHVud3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlLCBtb2RlbCkge1xuICB2YXIgZSA9IGV2ZW50bWFwLmluZGV4T2YodHlwZSkgPT09IC0xID8gbWFrZUN1c3RvbUV2ZW50KCkgOiBtYWtlQ2xhc3NpY0V2ZW50KCk7XG4gIGlmIChlbC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDbGFzc2ljRXZlbnQgKCkge1xuICAgIHZhciBlO1xuICAgIGlmIChkb2MuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ3VzdG9tRXZlbnQgKCkge1xuICAgIHJldHVybiBuZXcgY3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWw6IG1vZGVsIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBmbi5jYWxsKGVsLCBlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciB3cmFwcGVyID0gdW53cmFwKGVsLCB0eXBlLCBmbikgfHwgd3JhcHBlckZhY3RvcnkoZWwsIHR5cGUsIGZuKTtcbiAgaGFyZENhY2hlLnB1c2goe1xuICAgIHdyYXBwZXI6IHdyYXBwZXIsXG4gICAgZWxlbWVudDogZWwsXG4gICAgdHlwZTogdHlwZSxcbiAgICBmbjogZm5cbiAgfSk7XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiB1bndyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSA9IGZpbmQoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgd3JhcHBlciA9IGhhcmRDYWNoZVtpXS53cmFwcGVyO1xuICAgIGhhcmRDYWNoZS5zcGxpY2UoaSwgMSk7IC8vIGZyZWUgdXAgYSB0YWQgb2YgbWVtb3J5XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpLCBpdGVtO1xuICBmb3IgKGkgPSAwOyBpIDwgaGFyZENhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbSA9IGhhcmRDYWNoZVtpXTtcbiAgICBpZiAoaXRlbS5lbGVtZW50ID09PSBlbCAmJiBpdGVtLnR5cGUgPT09IHR5cGUgJiYgaXRlbS5mbiA9PT0gZm4pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRFdmVudCxcbiAgcmVtb3ZlOiByZW1vdmVFdmVudCxcbiAgZmFicmljYXRlOiBmYWJyaWNhdGVFdmVudFxufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5amNtOXpjM1psYm5RdmMzSmpMMk55YjNOemRtVnVkQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJqZFhOMGIyMUZkbVZ1ZENBOUlISmxjWFZwY21Vb0oyTjFjM1J2YlMxbGRtVnVkQ2NwTzF4dWRtRnlJR1YyWlc1MGJXRndJRDBnY21WeGRXbHlaU2duTGk5bGRtVnVkRzFoY0NjcE8xeHVkbUZ5SUdSdll5QTlJR1J2WTNWdFpXNTBPMXh1ZG1GeUlHRmtaRVYyWlc1MElEMGdZV1JrUlhabGJuUkZZWE41TzF4dWRtRnlJSEpsYlc5MlpVVjJaVzUwSUQwZ2NtVnRiM1psUlhabGJuUkZZWE41TzF4dWRtRnlJR2hoY21SRFlXTm9aU0E5SUZ0ZE8xeHVYRzVwWmlBb0lXZHNiMkpoYkM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S1NCN1hHNGdJR0ZrWkVWMlpXNTBJRDBnWVdSa1JYWmxiblJJWVhKa08xeHVJQ0J5WlcxdmRtVkZkbVZ1ZENBOUlISmxiVzkyWlVWMlpXNTBTR0Z5WkR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWVdSa1JYWmxiblJGWVhONUlDaGxiQ3dnZEhsd1pTd2dabTRzSUdOaGNIUjFjbWx1WnlrZ2UxeHVJQ0J5WlhSMWNtNGdaV3d1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWgwZVhCbExDQm1iaXdnWTJGd2RIVnlhVzVuS1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWVdSa1JYWmxiblJJWVhKa0lDaGxiQ3dnZEhsd1pTd2dabTRwSUh0Y2JpQWdjbVYwZFhKdUlHVnNMbUYwZEdGamFFVjJaVzUwS0NkdmJpY2dLeUIwZVhCbExDQjNjbUZ3S0dWc0xDQjBlWEJsTENCbWJpa3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaVzF2ZG1WRmRtVnVkRVZoYzNrZ0tHVnNMQ0IwZVhCbExDQm1iaXdnWTJGd2RIVnlhVzVuS1NCN1hHNGdJSEpsZEhWeWJpQmxiQzV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0hSNWNHVXNJR1p1TENCallYQjBkWEpwYm1jcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVpXMXZkbVZGZG1WdWRFaGhjbVFnS0dWc0xDQjBlWEJsTENCbWJpa2dlMXh1SUNCeVpYUjFjbTRnWld3dVpHVjBZV05vUlhabGJuUW9KMjl1SnlBcklIUjVjR1VzSUhWdWQzSmhjQ2hsYkN3Z2RIbHdaU3dnWm00cEtUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1ptRmljbWxqWVhSbFJYWmxiblFnS0dWc0xDQjBlWEJsTENCdGIyUmxiQ2tnZTF4dUlDQjJZWElnWlNBOUlHVjJaVzUwYldGd0xtbHVaR1Y0VDJZb2RIbHdaU2tnUFQwOUlDMHhJRDhnYldGclpVTjFjM1J2YlVWMlpXNTBLQ2tnT2lCdFlXdGxRMnhoYzNOcFkwVjJaVzUwS0NrN1hHNGdJR2xtSUNobGJDNWthWE53WVhSamFFVjJaVzUwS1NCN1hHNGdJQ0FnWld3dVpHbHpjR0YwWTJoRmRtVnVkQ2hsS1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCbGJDNW1hWEpsUlhabGJuUW9KMjl1SnlBcklIUjVjR1VzSUdVcE8xeHVJQ0I5WEc0Z0lHWjFibU4wYVc5dUlHMWhhMlZEYkdGemMybGpSWFpsYm5RZ0tDa2dlMXh1SUNBZ0lIWmhjaUJsTzF4dUlDQWdJR2xtSUNoa2IyTXVZM0psWVhSbFJYWmxiblFwSUh0Y2JpQWdJQ0FnSUdVZ1BTQmtiMk11WTNKbFlYUmxSWFpsYm5Rb0owVjJaVzUwSnlrN1hHNGdJQ0FnSUNCbExtbHVhWFJGZG1WdWRDaDBlWEJsTENCMGNuVmxMQ0IwY25WbEtUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHUnZZeTVqY21WaGRHVkZkbVZ1ZEU5aWFtVmpkQ2tnZTF4dUlDQWdJQ0FnWlNBOUlHUnZZeTVqY21WaGRHVkZkbVZ1ZEU5aWFtVmpkQ2dwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1pUdGNiaUFnZlZ4dUlDQm1kVzVqZEdsdmJpQnRZV3RsUTNWemRHOXRSWFpsYm5RZ0tDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCdVpYY2dZM1Z6ZEc5dFJYWmxiblFvZEhsd1pTd2dleUJrWlhSaGFXdzZJRzF2WkdWc0lIMHBPMXh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUhkeVlYQndaWEpHWVdOMGIzSjVJQ2hsYkN3Z2RIbHdaU3dnWm00cElIdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJSGR5WVhCd1pYSWdLRzl5YVdkcGJtRnNSWFpsYm5RcElIdGNiaUFnSUNCMllYSWdaU0E5SUc5eWFXZHBibUZzUlhabGJuUWdmSHdnWjJ4dlltRnNMbVYyWlc1ME8xeHVJQ0FnSUdVdWRHRnlaMlYwSUQwZ1pTNTBZWEpuWlhRZ2ZId2daUzV6Y21ORmJHVnRaVzUwTzF4dUlDQWdJR1V1Y0hKbGRtVnVkRVJsWm1GMWJIUWdQU0JsTG5CeVpYWmxiblJFWldaaGRXeDBJSHg4SUdaMWJtTjBhVzl1SUhCeVpYWmxiblJFWldaaGRXeDBJQ2dwSUhzZ1pTNXlaWFIxY201V1lXeDFaU0E5SUdaaGJITmxPeUI5TzF4dUlDQWdJR1V1YzNSdmNGQnliM0JoWjJGMGFXOXVJRDBnWlM1emRHOXdVSEp2Y0dGbllYUnBiMjRnZkh3Z1puVnVZM1JwYjI0Z2MzUnZjRkJ5YjNCaFoyRjBhVzl1SUNncElIc2daUzVqWVc1alpXeENkV0ppYkdVZ1BTQjBjblZsT3lCOU8xeHVJQ0FnSUdVdWQyaHBZMmdnUFNCbExuZG9hV05vSUh4OElHVXVhMlY1UTI5a1pUdGNiaUFnSUNCbWJpNWpZV3hzS0dWc0xDQmxLVHRjYmlBZ2ZUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2QzSmhjQ0FvWld3c0lIUjVjR1VzSUdadUtTQjdYRzRnSUhaaGNpQjNjbUZ3Y0dWeUlEMGdkVzUzY21Gd0tHVnNMQ0IwZVhCbExDQm1iaWtnZkh3Z2QzSmhjSEJsY2taaFkzUnZjbmtvWld3c0lIUjVjR1VzSUdadUtUdGNiaUFnYUdGeVpFTmhZMmhsTG5CMWMyZ29lMXh1SUNBZ0lIZHlZWEJ3WlhJNklIZHlZWEJ3WlhJc1hHNGdJQ0FnWld4bGJXVnVkRG9nWld3c1hHNGdJQ0FnZEhsd1pUb2dkSGx3WlN4Y2JpQWdJQ0JtYmpvZ1ptNWNiaUFnZlNrN1hHNGdJSEpsZEhWeWJpQjNjbUZ3Y0dWeU8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCMWJuZHlZWEFnS0dWc0xDQjBlWEJsTENCbWJpa2dlMXh1SUNCMllYSWdhU0E5SUdacGJtUW9aV3dzSUhSNWNHVXNJR1p1S1R0Y2JpQWdhV1lnS0drcElIdGNiaUFnSUNCMllYSWdkM0poY0hCbGNpQTlJR2hoY21SRFlXTm9aVnRwWFM1M2NtRndjR1Z5TzF4dUlDQWdJR2hoY21SRFlXTm9aUzV6Y0d4cFkyVW9hU3dnTVNrN0lDOHZJR1p5WldVZ2RYQWdZU0IwWVdRZ2IyWWdiV1Z0YjNKNVhHNGdJQ0FnY21WMGRYSnVJSGR5WVhCd1pYSTdYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWm1sdVpDQW9aV3dzSUhSNWNHVXNJR1p1S1NCN1hHNGdJSFpoY2lCcExDQnBkR1Z0TzF4dUlDQm1iM0lnS0drZ1BTQXdPeUJwSUR3Z2FHRnlaRU5oWTJobExteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdhWFJsYlNBOUlHaGhjbVJEWVdOb1pWdHBYVHRjYmlBZ0lDQnBaaUFvYVhSbGJTNWxiR1Z0Wlc1MElEMDlQU0JsYkNBbUppQnBkR1Z0TG5SNWNHVWdQVDA5SUhSNWNHVWdKaVlnYVhSbGJTNW1iaUE5UFQwZ1ptNHBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnBPMXh1SUNBZ0lIMWNiaUFnZlZ4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHRjYmlBZ1lXUmtPaUJoWkdSRmRtVnVkQ3hjYmlBZ2NtVnRiM1psT2lCeVpXMXZkbVZGZG1WdWRDeGNiaUFnWm1GaWNtbGpZWFJsT2lCbVlXSnlhV05oZEdWRmRtVnVkRnh1ZlR0Y2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXZlbnRtYXAgPSBbXTtcbnZhciBldmVudG5hbWUgPSAnJztcbnZhciByb24gPSAvXm9uLztcblxuZm9yIChldmVudG5hbWUgaW4gZ2xvYmFsKSB7XG4gIGlmIChyb24udGVzdChldmVudG5hbWUpKSB7XG4gICAgZXZlbnRtYXAucHVzaChldmVudG5hbWUuc2xpY2UoMikpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXZlbnRtYXA7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWpjbTl6YzNabGJuUXZjM0pqTDJWMlpXNTBiV0Z3TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJsZG1WdWRHMWhjQ0E5SUZ0ZE8xeHVkbUZ5SUdWMlpXNTBibUZ0WlNBOUlDY25PMXh1ZG1GeUlISnZiaUE5SUM5ZWIyNHZPMXh1WEc1bWIzSWdLR1YyWlc1MGJtRnRaU0JwYmlCbmJHOWlZV3dwSUh0Y2JpQWdhV1lnS0hKdmJpNTBaWE4wS0dWMlpXNTBibUZ0WlNrcElIdGNiaUFnSUNCbGRtVnVkRzFoY0M1d2RYTm9LR1YyWlc1MGJtRnRaUzV6YkdsalpTZ3lLU2s3WEc0Z0lIMWNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbGRtVnVkRzFoY0R0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBmdXp6eXNlYXJjaCAobmVlZGxlLCBoYXlzdGFjaykge1xuICB2YXIgdGxlbiA9IGhheXN0YWNrLmxlbmd0aDtcbiAgdmFyIHFsZW4gPSBuZWVkbGUubGVuZ3RoO1xuICBpZiAocWxlbiA+IHRsZW4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHFsZW4gPT09IHRsZW4pIHtcbiAgICByZXR1cm4gbmVlZGxlID09PSBoYXlzdGFjaztcbiAgfVxuICBvdXRlcjogZm9yICh2YXIgaSA9IDAsIGogPSAwOyBpIDwgcWxlbjsgaSsrKSB7XG4gICAgdmFyIG5jaCA9IG5lZWRsZS5jaGFyQ29kZUF0KGkpO1xuICAgIHdoaWxlIChqIDwgdGxlbikge1xuICAgICAgaWYgKGhheXN0YWNrLmNoYXJDb2RlQXQoaisrKSA9PT0gbmNoKSB7XG4gICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnV6enlzZWFyY2g7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXQgPSBlYXN5R2V0O1xudmFyIHNldCA9IGVhc3lTZXQ7XG5cbmlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XG4gIGdldCA9IGhhcmRHZXQ7XG4gIHNldCA9IGhhcmRTZXQ7XG59XG5cbmZ1bmN0aW9uIGVhc3lHZXQgKGVsKSB7XG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IGVsLnNlbGVjdGlvblN0YXJ0LFxuICAgIGVuZDogZWwuc2VsZWN0aW9uRW5kXG4gIH07XG59XG5cbmZ1bmN0aW9uIGhhcmRHZXQgKGVsKSB7XG4gIHZhciBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBpZiAoYWN0aXZlICE9PSBlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gIH1cblxuICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIGJvb2ttYXJrID0gcmFuZ2UuZ2V0Qm9va21hcmsoKTtcbiAgdmFyIG9yaWdpbmFsID0gZWwudmFsdWU7XG4gIHZhciBtYXJrZXIgPSBnZXRVbmlxdWVNYXJrZXIob3JpZ2luYWwpO1xuICB2YXIgcGFyZW50ID0gcmFuZ2UucGFyZW50RWxlbWVudCgpO1xuICBpZiAocGFyZW50ID09PSBudWxsIHx8ICFpbnB1dHMocGFyZW50KSkge1xuICAgIHJldHVybiByZXN1bHQoMCwgMCk7XG4gIH1cbiAgcmFuZ2UudGV4dCA9IG1hcmtlciArIHJhbmdlLnRleHQgKyBtYXJrZXI7XG5cbiAgdmFyIGNvbnRlbnRzID0gZWwudmFsdWU7XG5cbiAgZWwudmFsdWUgPSBvcmlnaW5hbDtcbiAgcmFuZ2UubW92ZVRvQm9va21hcmsoYm9va21hcmspO1xuICByYW5nZS5zZWxlY3QoKTtcblxuICByZXR1cm4gcmVzdWx0KGNvbnRlbnRzLmluZGV4T2YobWFya2VyKSwgY29udGVudHMubGFzdEluZGV4T2YobWFya2VyKSAtIG1hcmtlci5sZW5ndGgpO1xuXG4gIGZ1bmN0aW9uIHJlc3VsdCAoc3RhcnQsIGVuZCkge1xuICAgIGlmIChhY3RpdmUgIT09IGVsKSB7IC8vIGRvbid0IGRpc3J1cHQgcHJlLWV4aXN0aW5nIHN0YXRlXG4gICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgIGFjdGl2ZS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuYmx1cigpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VW5pcXVlTWFya2VyIChjb250ZW50cykge1xuICB2YXIgbWFya2VyO1xuICBkbyB7XG4gICAgbWFya2VyID0gJ0BAbWFya2VyLicgKyBNYXRoLnJhbmRvbSgpICogbmV3IERhdGUoKTtcbiAgfSB3aGlsZSAoY29udGVudHMuaW5kZXhPZihtYXJrZXIpICE9PSAtMSk7XG4gIHJldHVybiBtYXJrZXI7XG59XG5cbmZ1bmN0aW9uIGlucHV0cyAoZWwpIHtcbiAgcmV0dXJuICgoZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbC50eXBlID09PSAndGV4dCcpIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScpO1xufVxuXG5mdW5jdGlvbiBlYXN5U2V0IChlbCwgcCkge1xuICBlbC5zZWxlY3Rpb25TdGFydCA9IHBhcnNlKGVsLCBwLnN0YXJ0KTtcbiAgZWwuc2VsZWN0aW9uRW5kID0gcGFyc2UoZWwsIHAuZW5kKTtcbn1cblxuZnVuY3Rpb24gaGFyZFNldCAoZWwsIHApIHtcbiAgdmFyIHJhbmdlID0gZWwuY3JlYXRlVGV4dFJhbmdlKCk7XG5cbiAgaWYgKHAuc3RhcnQgPT09ICdlbmQnICYmIHAuZW5kID09PSAnZW5kJykge1xuICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBwYXJzZShlbCwgcC5lbmQpKTtcbiAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIHBhcnNlKGVsLCBwLnN0YXJ0KSk7XG4gICAgcmFuZ2Uuc2VsZWN0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2UgKGVsLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09ICdlbmQnID8gZWwudmFsdWUubGVuZ3RoIDogdmFsdWUgfHwgMDtcbn1cblxuZnVuY3Rpb24gc2VsbCAoZWwsIHApIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICBzZXQoZWwsIHApO1xuICB9XG4gIHJldHVybiBnZXQoZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbGw7XG4iXX0=
