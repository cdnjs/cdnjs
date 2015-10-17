/**
 * rome - Customizable date (and time) picker. Opt-in UI, no jQuery!
 * @version v2.1.22
 * @link https://github.com/bevacqua/rome
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rome = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./tailormade":11,"./throttle":12,"crossvent":18}],2:[function(require,module,exports){
(function (global){
'use strict';

var getSelection;
var doc = global.document;
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

module.exports = getSelection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./getSelectionNullOp":3,"./getSelectionRaw":4,"./getSelectionSynthetic":5,"./isHost":6}],3:[function(require,module,exports){
'use strict';

function noop () {}

function getSelectionNullOp () {
  return {
    removeAllRanges: noop,
    addRange: noop
  };
}

module.exports = getSelectionNullOp;

},{}],4:[function(require,module,exports){
(function (global){
'use strict';

function getSelectionRaw () {
  return global.getSelection();
}

module.exports = getSelectionRaw;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
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

},{"./rangeToTextRange":7}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
(function (global){
'use strict';

var doc = global.document;
var body = doc.body;

function rangeToTextRange (p) {
  if (p.collapsed) {
    return createBoundaryTextRange({ node: p.startContainer, offset: p.startOffset }, true);
  }
  var startRange = createBoundaryTextRange({ node: p.startContainer, offset: p.startOffset }, true);
  var endRange = createBoundaryTextRange({ node: p.endContainer, offset: p.endOffset }, false);
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

},{}],8:[function(require,module,exports){
'use strict';

var getSelection = require('./getSelection');
var setSelection = require('./setSelection');

module.exports = {
  get: getSelection,
  set: setSelection
};

},{"./getSelection":2,"./setSelection":9}],9:[function(require,module,exports){
(function (global){
'use strict';

var getSelection = require('./getSelection');
var rangeToTextRange = require('./rangeToTextRange');
var doc = global.document;

function setSelection (p) {
  if (doc.createRange) {
    modernSelection();
  } else {
    oldSelection();
  }

  function modernSelection () {
    var sel = getSelection();
    var range = doc.createRange();
    if (!p.startContainer) {
      return;
    }
    if (p.endContainer) {
      range.setEnd(p.endContainer, p.endOffset);
    } else {
      range.setEnd(p.startContainer, p.startOffset);
    }
    range.setStart(p.startContainer, p.startOffset);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function oldSelection () {
    rangeToTextRange(p).select();
  }
}

module.exports = setSelection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./getSelection":2,"./rangeToTextRange":7}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
(function (global){
'use strict';

var sell = require('sell');
var crossvent = require('crossvent');
var seleccion = require('seleccion');
var throttle = require('./throttle');
var getSelection = seleccion.get;
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

},{"./throttle":12,"crossvent":18,"seleccion":8,"sell":10}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
'use strict';

var ticky = require('ticky');

module.exports = function debounce (fn, args, ctx) {
  if (!fn) { return; }
  ticky(function run () {
    fn.apply(ctx || null, args || []);
  });
};

},{"ticky":16}],14:[function(require,module,exports){
'use strict';

var atoa = require('atoa');
var debounce = require('./debounce');

module.exports = function emitter (thing, options) {
  var opts = options || {};
  var evt = {};
  if (thing === undefined) { thing = {}; }
  thing.on = function (type, fn) {
    if (!evt[type]) {
      evt[type] = [fn];
    } else {
      evt[type].push(fn);
    }
    return thing;
  };
  thing.once = function (type, fn) {
    fn._once = true; // thing.off(fn) still works!
    thing.on(type, fn);
    return thing;
  };
  thing.off = function (type, fn) {
    var c = arguments.length;
    if (c === 1) {
      delete evt[type];
    } else if (c === 0) {
      evt = {};
    } else {
      var et = evt[type];
      if (!et) { return thing; }
      et.splice(et.indexOf(fn), 1);
    }
    return thing;
  };
  thing.emit = function () {
    var args = atoa(arguments);
    return thing.emitterSnapshot(args.shift()).apply(this, args);
  };
  thing.emitterSnapshot = function (type) {
    var et = (evt[type] || []).slice(0);
    return function () {
      var args = atoa(arguments);
      var ctx = this || thing;
      if (type === 'error' && opts.throws !== false && !et.length) { throw args.length === 1 ? args[0] : args; }
      et.forEach(function emitter (listen) {
        if (opts.async) { debounce(listen, args, ctx); } else { listen.apply(ctx, args); }
        if (listen._once) { thing.off(type, listen); }
      });
      return thing;
    };
  };
  return thing;
};

},{"./debounce":13,"atoa":15}],15:[function(require,module,exports){
module.exports = function atoa (a, n) { return Array.prototype.slice.call(a, n); }

},{}],16:[function(require,module,exports){
var si = typeof setImmediate === 'function', tick;
if (si) {
  tick = function (fn) { setImmediate(fn); };
} else {
  tick = function (fn) { setTimeout(fn, 0); };
}

module.exports = tick;
},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"./eventmap":19,"custom-event":17}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
'use strict';

var isInput = require('./isInput');
var bindings = {};

function has (source, target) {
  var binding = bindings[source.id];
  return binding && binding[target.id];
}

function insert (source, target) {
  var binding = bindings[source.id];
  if (!binding) {
    binding = bindings[source.id] = {};
  }
  var invalidate = invalidator(target);
  binding[target.id] = invalidate;
  source.on('data', invalidate);
  source.on('destroyed', remove.bind(null, source, target));
}

function remove (source, target) {
  var binding = bindings[source.id];
  if (!binding) {
    return;
  }
  var invalidate = binding[target.id];
  source.off('data', invalidate);
  delete binding[target.id];
}

function invalidator (target) {
  return function invalidate () {
    target.refresh();
  };
}

function add (source, target) {
  if (isInput(target.associated) || has(source, target)) {
    return;
  }
  insert(source, target);
}

module.exports = {
  add: add,
  remove: remove
};

},{"./isInput":30}],21:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var emitter = require('contra/emitter');
var dom = require('./dom');
var text = require('./text');
var parse = require('./parse');
var clone = require('./clone');
var defaults = require('./defaults');
var momentum = require('./momentum');
var classes = require('./classes');
var noop = require('./noop');
var no;

function calendar (calendarOptions) {
  var o;
  var ref;
  var refCal;
  var container;
  var rendered = false;

  // date variables
  var monthOffsetAttribute = 'data-rome-offset';
  var weekdays;
  var weekdayCount;
  var calendarMonths = [];
  var lastYear;
  var lastMonth;
  var lastDay;
  var lastDayElement;
  var datewrapper;
  var back;
  var next;

  // time variables
  var secondsInDay = 60 * 60 * 24;
  var time;
  var timelist;

  var api = emitter({
    associated: calendarOptions.associated
  });

  init();
  setTimeout(ready, 0);

  return api;

  function napi () { return api; }

  function init (initOptions) {
    o = defaults(initOptions || calendarOptions, api);
    if (!container) { container = dom({ className: o.styles.container }); }
    weekdays = o.weekdayFormat;
    weekdayCount = weekdays.length;
    lastMonth = no;
    lastYear = no;
    lastDay = no;
    lastDayElement = no;
    o.appendTo.appendChild(container);

    removeChildren(container);
    rendered = false;
    ref = o.initialValue ? o.initialValue : momentum.moment();
    refCal = ref.clone();

    api.back = subtractMonth;
    api.container = container;
    api.destroyed = false;
    api.destroy = destroy.bind(api, false);
    api.emitValues = emitValues;
    api.getDate = getDate;
    api.getDateString = getDateString;
    api.getMoment = getMoment;
    api.hide = hide;
    api.next = addMonth;
    api.options = changeOptions;
    api.options.reset = resetOptions;
    api.refresh = refresh;
    api.restore = napi;
    api.setValue = setValue;
    api.show = show;

    eventListening();
    ready();

    return api;
  }

  function ready () {
    api.emit('ready', clone(o));
  }

  function destroy (silent) {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    if (o) {
      eventListening(true);
    }

    var destroyed = api.emitterSnapshot('destroyed');
    api.back = noop;
    api.destroyed = true;
    api.destroy = napi;
    api.emitValues = napi;
    api.getDate = noop;
    api.getDateString = noop;
    api.getMoment = noop;
    api.hide = napi;
    api.next = noop;
    api.options = napi;
    api.options.reset = napi;
    api.refresh = napi;
    api.restore = init;
    api.setValue = napi;
    api.show = napi;
    api.off();

    if (silent !== true) {
      destroyed();
    }

    return api;
  }

  function eventListening (remove) {
    var op = remove ? 'remove' : 'add';
    if (o.autoHideOnBlur) { crossvent[op](document.documentElement, 'focus', hideOnBlur, true); }
    if (o.autoHideOnClick) { crossvent[op](document, 'click', hideOnClick); }
  }

  function changeOptions (options) {
    if (arguments.length === 0) {
      return clone(o);
    }
    destroy();
    init(options);
    return api;
  }

  function resetOptions () {
    return changeOptions({ appendTo: o.appendTo });
  }

  function render () {
    if (rendered) {
      return;
    }
    rendered = true;
    renderDates();
    renderTime();
    api.emit('render');
  }

  function renderDates () {
    if (!o.date) {
      return;
    }
    var i;
    calendarMonths = [];

    datewrapper = dom({ className: o.styles.date, parent: container });

    for (i = 0; i < o.monthsInCalendar; i++) {
      renderMonth(i);
    }

    crossvent.add(back, 'click', subtractMonth);
    crossvent.add(next, 'click', addMonth);
    crossvent.add(datewrapper, 'click', pickDay);

    function renderMonth (i) {
      var month = dom({ className: o.styles.month, parent: datewrapper });
      if (i === 0) {
        back = dom({ type: 'button', className: o.styles.back, attributes: { type: 'button' }, parent: month });
      }
      if (i === o.monthsInCalendar -1) {
        next = dom({ type: 'button', className: o.styles.next, attributes: { type: 'button' }, parent: month });
      }
      var label = dom({ className: o.styles.monthLabel, parent: month });
      var date = dom({ type: 'table', className: o.styles.dayTable, parent: month });
      var datehead = dom({ type: 'thead', className: o.styles.dayHead, parent: date });
      var dateheadrow = dom({ type: 'tr', className: o.styles.dayRow, parent: datehead });
      var datebody = dom({ type: 'tbody', className: o.styles.dayBody, parent: date });
      var j;

      for (j = 0; j < weekdayCount; j++) {
        dom({ type: 'th', className: o.styles.dayHeadElem, parent: dateheadrow, text: weekdays[weekday(j)] });
      }

      datebody.setAttribute(monthOffsetAttribute, i);
      calendarMonths.push({
        label: label,
        body: datebody
      });
    }
  }

  function renderTime () {
    if (!o.time || !o.timeInterval) {
      return;
    }
    var timewrapper = dom({ className: o.styles.time, parent: container });
    time = dom({ className: o.styles.selectedTime, parent: timewrapper, text: ref.format(o.timeFormat) });
    crossvent.add(time, 'click', toggleTimeList);
    timelist = dom({ className: o.styles.timeList, parent: timewrapper });
    crossvent.add(timelist, 'click', pickTime);
    var next = momentum.moment('00:00:00', 'HH:mm:ss');
    var latest = next.clone().add(1, 'days');
    while (next.isBefore(latest)) {
      dom({ className: o.styles.timeOption, parent: timelist, text: next.format(o.timeFormat) });
      next.add(o.timeInterval, 'seconds');
    }
  }

  function weekday (index, backwards) {
    var factor = backwards ? -1 : 1;
    var offset = index + o.weekStart * factor;
    if (offset >= weekdayCount || offset < 0) {
      offset += weekdayCount * -factor;
    }
    return offset;
  }

  function displayValidTimesOnly () {
    if (!o.time || !rendered) {
      return;
    }
    var times = timelist.children;
    var length = times.length;
    var date;
    var time;
    var item;
    var i;
    for (i = 0; i < length; i++) {
      item = times[i];
      time = momentum.moment(text(item), o.timeFormat);
      date = setTime(ref.clone(), time);
      item.style.display = isInRange(date, false, o.timeValidator) ? 'block' : 'none';
    }
  }

  function toggleTimeList (show) {
    var display = typeof show === 'boolean' ? show : timelist.style.display === 'none';
    if (display) {
      showTimeList();
    } else {
      hideTimeList();
    }
  }

  function showTimeList () { if (timelist) { timelist.style.display = 'block'; } }
  function hideTimeList () { if (timelist) { timelist.style.display = 'none'; } }
  function showCalendar () { container.style.display = 'inline-block'; api.emit('show'); }
  function hideCalendar () {
    if (container.style.display !== 'none') {
      container.style.display = 'none';
      api.emit('hide');
    }
  }

  function show () {
    render();
    refresh();
    toggleTimeList(!o.date);
    showCalendar();
    return api;
  }

  function hide () {
    hideTimeList();
    setTimeout(hideCalendar, 0);
    return api;
  }

  function hideConditionally () {
    hideTimeList();

    var pos = classes.contains(container, o.styles.positioned);
    if (pos) {
      setTimeout(hideCalendar, 0);
    }
    return api;
  }

  function calendarEventTarget (e) {
    var target = e.target;
    if (target === api.associated) {
      return true;
    }
    while (target) {
      if (target === container) {
        return true;
      }
      target = target.parentNode;
    }
  }

  function hideOnBlur (e) {
    if (calendarEventTarget(e)) {
      return;
    }
    hideConditionally();
  }

  function hideOnClick (e) {
    if (calendarEventTarget(e)) {
      return;
    }
    hideConditionally();
  }

  function subtractMonth () { changeMonth('subtract'); }
  function addMonth () { changeMonth('add'); }
  function changeMonth (op) {
    var bound;
    var direction = op === 'add' ? -1 : 1;
    var offset = o.monthsInCalendar + direction * getMonthOffset(lastDayElement);
    refCal[op](offset, 'months');
    bound = inRange(refCal.clone());
    ref = bound || ref;
    if (bound) { refCal = bound.clone(); }
    update();
    api.emit(op === 'add' ? 'next' : 'back', ref.month());
  }

  function update (silent) {
    updateCalendar();
    updateTime();
    if (silent !== true) { emitValues(); }
    displayValidTimesOnly();
  }

  function updateCalendar () {
    if (!o.date || !rendered) {
      return;
    }
    var y = refCal.year();
    var m = refCal.month();
    var d = refCal.date();
    if (d === lastDay && m === lastMonth && y === lastYear) {
      return;
    }
    var canStay = isDisplayed();
    lastDay = refCal.date();
    lastMonth = refCal.month();
    lastYear = refCal.year();
    if (canStay) { updateCalendarSelection(); return; }
    calendarMonths.forEach(updateMonth);
    renderAllDays();

    function updateMonth (month, i) {
      var offsetCal = refCal.clone().add(i, 'months');
      text(month.label, offsetCal.format(o.monthFormat));
      removeChildren(month.body);
    }
  }

  function updateCalendarSelection () {
    var day = refCal.date() - 1;
    selectDayElement(false);
    calendarMonths.forEach(function (cal) {
      var days;
      if (sameCalendarMonth(cal.date, refCal)) {
        days = cast(cal.body.children).map(aggregate);
        days = Array.prototype.concat.apply([], days).filter(inside);
        selectDayElement(days[day]);
      }
    });

    function cast (like) {
      var dest = [];
      var i;
      for (i = 0; i < like.length; i++) {
        dest.push(like[i]);
      }
      return dest;
    }

    function aggregate (child) {
      return cast(child.children);
    }

    function inside (child) {
      return !classes.contains(child, o.styles.dayPrevMonth) &&
             !classes.contains(child, o.styles.dayNextMonth);
    }
  }

  function isDisplayed () {
    return calendarMonths.some(matches);

    function matches (cal) {
      if (!lastYear) { return false; }
      return sameCalendarMonth(cal.date, refCal);
    }
  }

  function sameCalendarMonth (left, right) {
    return left && right && left.year() === right.year() && left.month() === right.month();
  }

  function updateTime () {
    if (!o.time || !rendered) {
      return;
    }
    text(time, ref.format(o.timeFormat));
  }

  function emitValues () {
    api.emit('data', getDateString());
    api.emit('year', ref.year());
    api.emit('month', ref.month());
    api.emit('day', ref.day());
    api.emit('time', ref.format(o.timeFormat));
    return api;
  }

  function refresh () {
    lastYear = false;
    lastMonth = false;
    lastDay = false;
    update(true);
    return api;
  }

  function setValue (value) {
    var date = parse(value, o.inputFormat);
    if (date === null) {
      return;
    }
    ref = inRange(date) || ref;
    refCal = ref.clone();
    update(true);

    return api;
  }

  function removeChildren (elem, self) {
    while (elem && elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
    if (self === true) {
      elem.parentNode.removeChild(elem);
    }
  }

  function renderAllDays () {
    var i;
    for (i = 0; i < o.monthsInCalendar; i++) {
      renderDays(i);
    }
  }

  function renderDays (offset) {
    var month = calendarMonths[offset];
    var offsetCal = refCal.clone().add(offset, 'months');
    var total = offsetCal.daysInMonth();
    var current = offsetCal.month() !== ref.month() ? -1 : ref.date(); // -1 : 1..31
    var first = offsetCal.clone().date(1);
    var firstDay = weekday(first.day(), true); // 0..6
    var tr = dom({ type: 'tr', className: o.styles.dayRow, parent: month.body });
    var prevMonth = hiddenWhen(offset !== 0, [o.styles.dayBodyElem, o.styles.dayPrevMonth]);
    var nextMonth = hiddenWhen(offset !== o.monthsInCalendar - 1, [o.styles.dayBodyElem, o.styles.dayNextMonth]);
    var disabled = o.styles.dayDisabled;
    var lastDay;

    part({
      base: first.clone().subtract(firstDay, 'days'),
      length: firstDay,
      cell: prevMonth
    });

    part({
      base: first.clone(),
      length: total,
      cell: [o.styles.dayBodyElem],
      selectable: true
    });

    lastDay = first.clone().add(total, 'days');

    part({
      base: lastDay,
      length: weekdayCount - tr.children.length,
      cell: nextMonth
    });

    back.disabled = !isInRangeLeft(first, true);
    next.disabled = !isInRangeRight(lastDay, true);
    month.date = offsetCal.clone();

    function part (data) {
      var i, day, node;
      for (i = 0; i < data.length; i++) {
        if (tr.children.length === weekdayCount) {
          tr = dom({ type: 'tr', className: o.styles.dayRow, parent: month.body });
        }
        day = data.base.clone().add(i, 'days');
        node = dom({
          type: 'td',
          parent: tr,
          text: day.format(o.dayFormat),
          className: validationTest(day, data.cell.join(' ').split(' ')).join(' ')
        });
        if (data.selectable && day.date() === current) {
          selectDayElement(node);
        }
      }
    }

    function validationTest (day, cell) {
      if (!isInRange(day, true, o.dateValidator)) { cell.push(disabled); }
      return cell;
    }

    function hiddenWhen (value, cell) {
      if (value) { cell.push(o.styles.dayConcealed); }
      return cell;
    }
  }

  function isInRange (date, allday, validator) {
    if (!isInRangeLeft(date, allday)) {
      return false;
    }
    if (!isInRangeRight(date, allday)) {
      return false;
    }
    var valid = (validator || Function.prototype).call(api, date.toDate());
    return valid !== false;
  }

  function isInRangeLeft (date, allday) {
    var min = !o.min ? false : (allday ? o.min.clone().startOf('day') : o.min);
    return !min || !date.isBefore(min);
  }

  function isInRangeRight (date, allday) {
    var max = !o.max ? false : (allday ? o.max.clone().endOf('day') : o.max);
    return !max || !date.isAfter(max);
  }

  function inRange (date) {
    if (o.min && date.isBefore(o.min)) {
      return inRange(o.min.clone());
    } else if (o.max && date.isAfter(o.max)) {
      return inRange(o.max.clone());
    }
    var value = date.clone().subtract(1, 'days');
    if (validateTowards(value, date, 'add')) {
      return inTimeRange(value);
    }
    value = date.clone();
    if (validateTowards(value, date, 'subtract')) {
      return inTimeRange(value);
    }
  }

  function inTimeRange (value) {
    var copy = value.clone().subtract(o.timeInterval, 'seconds');
    var times = Math.ceil(secondsInDay / o.timeInterval);
    var i;
    for (i = 0; i < times; i++) {
      copy.add(o.timeInterval, 'seconds');
      if (copy.date() > value.date()) {
        copy.subtract(1, 'days');
      }
      if (o.timeValidator.call(api, copy.toDate()) !== false) {
        return copy;
      }
    }
  }

  function validateTowards (value, date, op) {
    var valid = false;
    while (valid === false) {
      value[op](1, 'days');
      if (value.month() !== date.month()) {
        break;
      }
      valid = o.dateValidator.call(api, value.toDate());
    }
    return valid !== false;
  }

  function pickDay (e) {
    var target = e.target;
    if (classes.contains(target, o.styles.dayDisabled) || !classes.contains(target, o.styles.dayBodyElem)) {
      return;
    }
    var day = parseInt(text(target), 10);
    var prev = classes.contains(target, o.styles.dayPrevMonth);
    var next = classes.contains(target, o.styles.dayNextMonth);
    var offset = getMonthOffset(target) - getMonthOffset(lastDayElement);
    ref.add(offset, 'months');
    if (prev || next) {
      ref.add(prev ? -1 : 1, 'months');
    }
    selectDayElement(target);
    ref.date(day); // must run after setting the month
    setTime(ref, inRange(ref) || ref);
    refCal = ref.clone();
    if (o.autoClose === true) { hideConditionally(); }
    update();
  }

  function selectDayElement (node) {
    if (lastDayElement) {
      classes.remove(lastDayElement, o.styles.selectedDay);
    }
    if (node) {
      classes.add(node, o.styles.selectedDay);
    }
    lastDayElement = node;
  }

  function getMonthOffset (elem) {
    var offset;
    while (elem && elem.getAttribute) {
      offset = elem.getAttribute(monthOffsetAttribute);
      if (typeof offset === 'string') {
        return parseInt(offset, 10);
      }
      elem = elem.parentNode;
    }
    return 0;
  }

  function setTime (to, from) {
    to.hour(from.hour()).minute(from.minute()).second(from.second());
    return to;
  }

  function pickTime (e) {
    var target = e.target;
    if (!classes.contains(target, o.styles.timeOption)) {
      return;
    }
    var value = momentum.moment(text(target), o.timeFormat);
    setTime(ref, value);
    refCal = ref.clone();
    emitValues();
    updateTime();
    if ((!o.date && o.autoClose === true) || o.autoClose === 'time') {
      hideConditionally();
    } else {
      hideTimeList();
    }
  }

  function getDate () {
    return ref.toDate();
  }

  function getDateString (format) {
    return ref.format(format || o.inputFormat);
  }

  function getMoment () {
    return ref.clone();
  }
}

module.exports = calendar;

},{"./classes":22,"./clone":23,"./defaults":25,"./dom":26,"./momentum":31,"./noop":32,"./parse":33,"./text":45,"contra/emitter":14,"crossvent":18}],22:[function(require,module,exports){
'use strict';

var trim = /^\s+|\s+$/g;
var whitespace = /\s+/;

function classes (node) {
  return node.className.replace(trim, '').split(whitespace);
}

function set (node, value) {
  node.className = value.join(' ');
}

function add (node, value) {
  var values = remove(node, value);
  values.push(value);
  set(node, values);
}

function remove (node, value) {
  var values = classes(node);
  var i = values.indexOf(value);
  if (i !== -1) {
    values.splice(i, 1);
    set(node, values);
  }
  return values;
}

function contains (node, value) {
  return classes(node).indexOf(value) !== -1;
}

module.exports = {
  add: add,
  remove: remove,
  contains: contains
};

},{}],23:[function(require,module,exports){
'use strict';

var momentum = require('./momentum');

// naïve implementation, specifically meant to clone `options` objects
function clone (thing) {
  var copy = {};
  var value;

  for (var key in thing) {
    value = thing[key];

    if (!value) {
      copy[key] = value;
    } else if (momentum.isMoment(value)) {
      copy[key] = value.clone();
    } else if (value._isStylesConfiguration) {
      copy[key] = clone(value);
    } else {
      copy[key] = value;
    }
  }

  return copy;
}

module.exports = clone;

},{"./momentum":31}],24:[function(require,module,exports){
'use strict';

var index = require('./index');
var input = require('./input');
var inline = require('./inline');
var isInput = require('./isInput');

function core (elem, options) {
  var cal;
  var existing = index.find(elem);
  if (existing) {
    return existing;
  }

  if (isInput(elem)) {
    cal = input(elem, options);
  } else {
    cal = inline(elem, options);
  }
  index.assign(elem, cal);

  return cal;
}

module.exports = core;

},{"./index":27,"./inline":28,"./input":29,"./isInput":30}],25:[function(require,module,exports){
'use strict';

var parse = require('./parse');
var isInput = require('./isInput');
var momentum = require('./momentum');

function defaults (options, cal) {
  var temp;
  var no;
  var o = options || {};
  if (o.autoHideOnClick === no) { o.autoHideOnClick = true; }
  if (o.autoHideOnBlur === no) { o.autoHideOnBlur = true; }
  if (o.autoClose === no) { o.autoClose = true; }
  if (o.appendTo === no) { o.appendTo = document.body; }
  if (o.appendTo === 'parent') {
    if (isInput(cal.associated)) {
      o.appendTo = cal.associated.parentNode;
    } else {
      throw new Error('Inline calendars must be appended to a parent node explicitly.');
    }
  }
  if (o.invalidate === no) { o.invalidate = true; }
  if (o.required === no) { o.required = false; }
  if (o.date === no) { o.date = true; }
  if (o.time === no) { o.time = true; }
  if (o.date === false && o.time === false) { throw new Error('At least one of `date` or `time` must be `true`.'); }
  if (o.inputFormat === no) {
    if (o.date && o.time) {
      o.inputFormat = 'YYYY-MM-DD HH:mm';
    } else if (o.date) {
      o.inputFormat = 'YYYY-MM-DD';
    } else {
      o.inputFormat = 'HH:mm';
    }
  }
  if (o.initialValue === no) {
    o.initialValue = null;
  } else {
    o.initialValue = parse(o.initialValue, o.inputFormat);
  }
  if (o.min === no) { o.min = null; } else { o.min = parse(o.min, o.inputFormat); }
  if (o.max === no) { o.max = null; } else { o.max = parse(o.max, o.inputFormat); }
  if (o.timeInterval === no) { o.timeInterval = 60 * 30; } // 30 minutes by default
  if (o.min && o.max) {
    if (o.max.isBefore(o.min)) {
      temp = o.max;
      o.max = o.min;
      o.min = temp;
    }
    if (o.date === true) {
      if (o.max.clone().subtract(1, 'days').isBefore(o.min)) {
        throw new Error('`max` must be at least one day after `min`');
      }
    } else if (o.timeInterval * 1000 - o.min % (o.timeInterval * 1000) > o.max - o.min) {
      throw new Error('`min` to `max` range must allow for at least one time option that matches `timeInterval`');
    }
  }
  if (o.dateValidator === no) { o.dateValidator = Function.prototype; }
  if (o.timeValidator === no) { o.timeValidator = Function.prototype; }
  if (o.timeFormat === no) { o.timeFormat = 'HH:mm'; }
  if (o.weekStart === no) { o.weekStart = momentum.moment().weekday(0).day(); }
  if (o.weekdayFormat === no) { o.weekdayFormat = 'min'; }
  if (o.weekdayFormat === 'long') {
    o.weekdayFormat = momentum.moment.weekdays();
  } else if (o.weekdayFormat === 'short') {
    o.weekdayFormat = momentum.moment.weekdaysShort();
  } else if (o.weekdayFormat === 'min') {
    o.weekdayFormat = momentum.moment.weekdaysMin();
  } else if (!Array.isArray(o.weekdayFormat) || o.weekdayFormat.length < 7) {
    throw new Error('`weekdays` must be `min`, `short`, or `long`');
  }
  if (o.monthsInCalendar === no) { o.monthsInCalendar = 1; }
  if (o.monthFormat === no) { o.monthFormat = 'MMMM YYYY'; }
  if (o.dayFormat === no) { o.dayFormat = 'DD'; }
  if (o.styles === no) { o.styles = {}; }

  o.styles._isStylesConfiguration = true;

  var styl = o.styles;
  if (styl.back === no) { styl.back = 'rd-back'; }
  if (styl.container === no) { styl.container = 'rd-container'; }
  if (styl.positioned === no) { styl.positioned = 'rd-container-attachment'; }
  if (styl.date === no) { styl.date = 'rd-date'; }
  if (styl.dayBody === no) { styl.dayBody = 'rd-days-body'; }
  if (styl.dayBodyElem === no) { styl.dayBodyElem = 'rd-day-body'; }
  if (styl.dayPrevMonth === no) { styl.dayPrevMonth = 'rd-day-prev-month'; }
  if (styl.dayNextMonth === no) { styl.dayNextMonth = 'rd-day-next-month'; }
  if (styl.dayDisabled === no) { styl.dayDisabled = 'rd-day-disabled'; }
  if (styl.dayConcealed === no) { styl.dayConcealed = 'rd-day-concealed'; }
  if (styl.dayHead === no) { styl.dayHead = 'rd-days-head'; }
  if (styl.dayHeadElem === no) { styl.dayHeadElem = 'rd-day-head'; }
  if (styl.dayRow === no) { styl.dayRow = 'rd-days-row'; }
  if (styl.dayTable === no) { styl.dayTable = 'rd-days'; }
  if (styl.month === no) { styl.month = 'rd-month'; }
  if (styl.monthLabel === no) { styl.monthLabel = 'rd-month-label'; }
  if (styl.next === no) { styl.next = 'rd-next'; }
  if (styl.selectedDay === no) { styl.selectedDay = 'rd-day-selected'; }
  if (styl.selectedTime === no) { styl.selectedTime = 'rd-time-selected'; }
  if (styl.time === no) { styl.time = 'rd-time'; }
  if (styl.timeList === no) { styl.timeList = 'rd-time-list'; }
  if (styl.timeOption === no) { styl.timeOption = 'rd-time-option'; }

  return o;
}

module.exports = defaults;

},{"./isInput":30,"./momentum":31,"./parse":33}],26:[function(require,module,exports){
'use strict';

function dom (options) {
  var o = options || {};
  if (!o.type) { o.type = 'div'; }
  var elem = document.createElement(o.type);
  if (o.className) { elem.className = o.className; }
  if (o.text) { elem.innerText = elem.textContent = o.text; }
  if (o.attributes) {
    Object.keys(o.attributes).forEach(function(key) {
      elem.setAttribute(key, o.attributes[key]);
    });
  }
  if (o.parent) { o.parent.appendChild(elem); }
  return elem;
}

module.exports = dom;

},{}],27:[function(require,module,exports){
'use strict';
var no;
var ikey = 'data-rome-id';
var index = [];

function find (thing) { // can be a DOM element or a number
  if (typeof thing !== 'number' && thing && thing.getAttribute) {
    return find(thing.getAttribute(ikey));
  }
  var existing = index[thing];
  if (existing !== no) {
    return existing;
  }
  return null;
}

function assign (elem, instance) {
  elem.setAttribute(ikey, instance.id = index.push(instance) - 1);
}

module.exports = {
  find: find,
  assign: assign
};

},{}],28:[function(require,module,exports){
'use strict';

var calendar = require('./calendar');

function inline (elem, calendarOptions) {
  var o = calendarOptions || {};

  o.appendTo = elem;
  o.associated = elem;

  var cal = calendar(o);
  cal.show();
  return cal;
}

module.exports = inline;

},{"./calendar":21}],29:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var bullseye = require('bullseye');
var throttle = require('./throttle');
var clone = require('./clone');
var defaults = require('./defaults');
var calendar = require('./calendar');
var momentum = require('./momentum');
var classes = require('./classes');

function inputCalendar (input, calendarOptions) {
  var o = calendarOptions || {};

  o.associated = input;

  var api = calendar(o);
  var throttledTakeInput = throttle(takeInput, 30);
  var ignoreInvalidation;
  var ignoreShow;
  var eye;

  init(o);

  return api;

  function init (initOptions) {
    o = defaults(initOptions || o, api);

    classes.add(api.container, o.styles.positioned);
    crossvent.add(api.container, 'mousedown', containerMouseDown);
    crossvent.add(api.container, 'click', containerClick);

    api.getDate = unrequire(api.getDate);
    api.getDateString = unrequire(api.getDateString);
    api.getMoment = unrequire(api.getMoment);

    if (o.initialValue) {
      input.value = o.initialValue.format(o.inputFormat);
    }

    eye = bullseye(api.container, input);
    api.on('data', updateInput);
    api.on('show', eye.refresh);

    eventListening();
    throttledTakeInput();
  }

  function destroy () {
    eventListening(true);
    eye.destroy();
    eye = null;
  }

  function eventListening (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](input, 'click', show);
    crossvent[op](input, 'touchend', show);
    crossvent[op](input, 'focusin', show);
    crossvent[op](input, 'change', throttledTakeInput);
    crossvent[op](input, 'keypress', throttledTakeInput);
    crossvent[op](input, 'keydown', throttledTakeInput);
    crossvent[op](input, 'input', throttledTakeInput);
    if (o.invalidate) { crossvent[op](input, 'blur', invalidateInput); }

    if (remove) {
      api.once('ready', init);
      api.off('destroyed', destroy);
    } else {
      api.off('ready', init);
      api.once('destroyed', destroy);
    }
  }

  function containerClick () {
    ignoreShow = true;
    input.focus();
    ignoreShow = false;
  }

  function containerMouseDown () {
    ignoreInvalidation = true;
    setTimeout(unignore, 0);

    function unignore () {
      ignoreInvalidation = false;
    }
  }

  function invalidateInput () {
    if (!ignoreInvalidation && !isEmpty()) {
      api.emitValues();
    }
  }

  function show () {
    if (ignoreShow) {
      return;
    }
    api.show();
  }

  function takeInput () {
    var value = input.value.trim();
    if (isEmpty()) {
      return;
    }
    var date = momentum.moment(value, o.inputFormat, o.strictParse);
    api.setValue(date);
  }

  function updateInput (data) {
    input.value = data;
  }

  function isEmpty () {
    return o.required === false && input.value.trim() === '';
  }

  function unrequire (fn) {
    return function maybe () {
      return isEmpty() ? null : fn.apply(this, arguments);
    };
  }
}

module.exports = inputCalendar;

},{"./calendar":21,"./classes":22,"./clone":23,"./defaults":25,"./momentum":31,"./throttle":46,"bullseye":1,"crossvent":18}],30:[function(require,module,exports){
'use strict';

function isInput (elem) {
  return elem && elem.nodeName && elem.nodeName.toLowerCase() === 'input';
}

module.exports = isInput;

},{}],31:[function(require,module,exports){
'use strict';

function isMoment (value) {
  return value && Object.prototype.hasOwnProperty.call(value, '_isAMomentObject');
}

var api = {
  moment: null,
  isMoment: isMoment
};

module.exports = api;

},{}],32:[function(require,module,exports){
'use strict';

function noop () {}

module.exports = noop;

},{}],33:[function(require,module,exports){
'use strict';

var momentum = require('./momentum');

function raw (date, format) {
  if (typeof date === 'string') {
    return momentum.moment(date, format);
  }
  if (Object.prototype.toString.call(date) === '[object Date]') {
    return momentum.moment(date);
  }
  if (momentum.isMoment(date)) {
    return date.clone();
  }
}

function parse (date, format) {
  var m = raw(date, typeof format === 'string' ? format : null);
  return m && m.isValid() ? m : null;
}

module.exports = parse;

},{"./momentum":31}],34:[function(require,module,exports){
'use strict';

if (!Array.prototype.filter) {
  Array.prototype.filter = function (fn, ctx) {
    var f = [];
    this.forEach(function (v, i, t) {
      if (fn.call(ctx, v, i, t)) { f.push(v); }
    }, ctx);
    return f;
  };
}

},{}],35:[function(require,module,exports){
'use strict';

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fn, ctx) {
    if (this === void 0 || this === null || typeof fn !== 'function') {
      throw new TypeError();
    }
    var t = this;
    var len = t.length;
    for (var i = 0; i < len; i++) {
      if (i in t) { fn.call(ctx, t[i], i, t); }
    }
  };
}

},{}],36:[function(require,module,exports){
'use strict';

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (what, start) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    var length = this.length;
    start = +start || 0;
    if (Math.abs(start) === Infinity) {
      start = 0;
    } else if (start < 0) {
      start += length;
      if (start < 0) { start = 0; }
    }
    for (; start < length; start++) {
      if (this[start] === what) {
        return start;
      }
    }
    return -1;
  };
}

},{}],37:[function(require,module,exports){
'use strict';

Array.isArray || (Array.isArray = function (a) {
  return '' + a !== a && Object.prototype.toString.call(a) === '[object Array]';
});

},{}],38:[function(require,module,exports){
'use strict';

if (!Array.prototype.map) {
  Array.prototype.map = function (fn, ctx) {
    var context, result, i;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var source = Object(this);
    var len = source.length >>> 0;

    if (typeof fn !== 'function') {
      throw new TypeError(fn + ' is not a function');
    }

    if (arguments.length > 1) {
      context = ctx;
    }

    result = new Array(len);
    i = 0;

    while (i < len) {
      if (i in source) {
        result[i] = fn.call(context, source[i], i, source);
      }
      i++;
    }
    return result;
  };
}

},{}],39:[function(require,module,exports){
'use strict';

if (!Array.prototype.some) {
  Array.prototype.some = function (fn, ctx) {
    var context, i;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var source = Object(this);
    var len = source.length >>> 0;

    if (typeof fn !== 'function') {
      throw new TypeError(fn + ' is not a function');
    }

    if (arguments.length > 1) {
      context = ctx;
    }

    i = 0;

    while (i < len) {
      if (i in source) {
        var test = fn.call(context, source[i], i, source);
        if (test) {
          return true;
        }
      }
      i++;
    }
    return false;
  };
}

},{}],40:[function(require,module,exports){
'use strict';

if (!Function.prototype.bind) {
  Function.prototype.bind = function (context) {
    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    var curried = Array.prototype.slice.call(arguments, 1);
    var original = this;
    var NoOp = function () {};
    var bound = function () {
      var ctx = this instanceof NoOp && context ? this : context;
      var args = curried.concat(Array.prototype.slice.call(arguments));
      return original.apply(ctx, args);
    };
    NoOp.prototype = this.prototype;
    bound.prototype = new NoOp();
    return bound;
  };
}

},{}],41:[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
var dontEnums = [
  'toString',
  'toLocaleString',
  'valueOf',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'constructor'
];
var dontEnumsLength = dontEnums.length;

if (!Object.keys) {
  Object.keys = function(obj) {
    if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
      throw new TypeError('Object.keys called on non-object');
    }

    var result = [], prop, i;

    for (prop in obj) {
      if (hasOwn.call(obj, prop)) {
        result.push(prop);
      }
    }

    if (hasDontEnumBug) {
      for (i = 0; i < dontEnumsLength; i++) {
        if (hasOwn.call(obj, dontEnums[i])) {
          result.push(dontEnums[i]);
        }
      }
    }
    return result;
  };
}

},{}],42:[function(require,module,exports){
'use strict';

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

},{}],43:[function(require,module,exports){
'use strict';

// these are only required for IE < 9
// maybe move to IE-specific distro?
require('./polyfills/function.bind');
require('./polyfills/array.foreach');
require('./polyfills/array.map');
require('./polyfills/array.filter');
require('./polyfills/array.isarray');
require('./polyfills/array.indexof');
require('./polyfills/array.some');
require('./polyfills/string.trim');
require('./polyfills/object.keys');

var core = require('./core');
var index = require('./index');
var use = require('./use');

core.use = use.bind(core);
core.find = index.find;
core.val = require('./validators');

module.exports = core;

},{"./core":24,"./index":27,"./polyfills/array.filter":34,"./polyfills/array.foreach":35,"./polyfills/array.indexof":36,"./polyfills/array.isarray":37,"./polyfills/array.map":38,"./polyfills/array.some":39,"./polyfills/function.bind":40,"./polyfills/object.keys":41,"./polyfills/string.trim":42,"./use":47,"./validators":48}],44:[function(require,module,exports){
(function (global){
var rome = require('./rome');
var momentum = require('./momentum');

rome.use(global.moment);

if (momentum.moment === void 0) {
  throw new Error('rome depends on moment.js, you can get it at http://momentjs.com, or you could use the bundled distribution file instead.');
}

module.exports = rome;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./momentum":31,"./rome":43}],45:[function(require,module,exports){
'use strict';

function text (elem, value) {
  if (arguments.length === 2) {
    elem.innerText = elem.textContent = value;
  }
  return elem.innerText || elem.textContent;
}

module.exports = text;

},{}],46:[function(require,module,exports){
'use strict';

module.exports = function throttle (fn, boundary) {
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
      var now = +new Date();
      if (now > next) {
        last = now;
        fn.apply(this, arguments);
      } else {
        timer = setTimeout(unbound, next - now);
      }
    }
  };
};

},{}],47:[function(require,module,exports){
'use strict';

var momentum = require('./momentum');

function use (moment) {
  this.moment = momentum.moment = moment;
}

module.exports = use;

},{"./momentum":31}],48:[function(require,module,exports){
'use strict';

var index = require('./index');
var parse = require('./parse');
var association = require('./association');

function compareBuilder (compare) {
  return function factory (value) {
    var fixed = parse(value);

    return function validate (date) {
      var cal = index.find(value);
      var left = parse(date);
      var right = fixed || cal && cal.getMoment();
      if (!right) {
        return true;
      }
      if (cal) {
        association.add(this, cal);
      }
      return compare(left, right);
    };
  };
}

function rangeBuilder (how, compare) {
  return function factory (start, end) {
    var dates;
    var len = arguments.length;

    if (Array.isArray(start)) {
      dates = start;
    } else {
      if (len === 1) {
        dates = [start];
      } else if (len === 2) {
        dates = [[start, end]];
      }
    }

    return function validate (date) {
      return dates.map(expand.bind(this))[how](compare.bind(this, date));
    };

    function expand (value) {
      var start, end;
      var cal = index.find(value);
      if (cal) {
        start = end = cal.getMoment();
      } else if (Array.isArray(value)) {
        start = value[0]; end = value[1];
      } else {
        start = end = value;
      }
      if (cal) {
        association.add(cal, this);
      }
      return {
        start: parse(start).startOf('day').toDate(),
        end: parse(end).endOf('day').toDate()
      };
    }
  };
}

var afterEq  = compareBuilder(function (left, right) { return left >= right; });
var after    = compareBuilder(function (left, right) { return left  > right; });
var beforeEq = compareBuilder(function (left, right) { return left <= right; });
var before   = compareBuilder(function (left, right) { return left  < right; });

var except   = rangeBuilder('every', function (left, right) { return right.start  > left || right.end  < left; });
var only     = rangeBuilder('some',  function (left, right) { return right.start <= left && right.end >= left; });

module.exports = {
  afterEq: afterEq,
  after: after,
  beforeEq: beforeEq,
  before: before,
  except: except,
  only: only
};

},{"./association":20,"./index":27,"./parse":33}]},{},[44])(44)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvYnVsbHNleWUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL3NlbGVjY2lvbi9zcmMvZ2V0U2VsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL25vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvbk51bGxPcC5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS9ub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25SYXcuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL3NlbGVjY2lvbi9zcmMvZ2V0U2VsZWN0aW9uU3ludGhldGljLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL25vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2lzSG9zdC5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS9ub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9yYW5nZVRvVGV4dFJhbmdlLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL25vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL3NlbGVjY2lvbi5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS9ub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9zZXRTZWxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL3NlbGwvc2VsbC5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS90YWlsb3JtYWRlLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL3Rocm90dGxlLmpzIiwibm9kZV9tb2R1bGVzL2NvbnRyYS9kZWJvdW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9jb250cmEvZW1pdHRlci5qcyIsIm5vZGVfbW9kdWxlcy9jb250cmEvbm9kZV9tb2R1bGVzL2F0b2EvYXRvYS5qcyIsIm5vZGVfbW9kdWxlcy9jb250cmEvbm9kZV9tb2R1bGVzL3RpY2t5L3RpY2t5LWJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvY3Jvc3N2ZW50L25vZGVfbW9kdWxlcy9jdXN0b20tZXZlbnQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY3Jvc3N2ZW50L3NyYy9jcm9zc3ZlbnQuanMiLCJub2RlX21vZHVsZXMvY3Jvc3N2ZW50L3NyYy9ldmVudG1hcC5qcyIsInNyYy9hc3NvY2lhdGlvbi5qcyIsInNyYy9jYWxlbmRhci5qcyIsInNyYy9jbGFzc2VzLmpzIiwic3JjL2Nsb25lLmpzIiwic3JjL2NvcmUuanMiLCJzcmMvZGVmYXVsdHMuanMiLCJzcmMvZG9tLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL2lubGluZS5qcyIsInNyYy9pbnB1dC5qcyIsInNyYy9pc0lucHV0LmpzIiwic3JjL21vbWVudHVtLmpzIiwic3JjL25vb3AuanMiLCJzcmMvcGFyc2UuanMiLCJzcmMvcG9seWZpbGxzL2FycmF5LmZpbHRlci5qcyIsInNyYy9wb2x5ZmlsbHMvYXJyYXkuZm9yZWFjaC5qcyIsInNyYy9wb2x5ZmlsbHMvYXJyYXkuaW5kZXhvZi5qcyIsInNyYy9wb2x5ZmlsbHMvYXJyYXkuaXNhcnJheS5qcyIsInNyYy9wb2x5ZmlsbHMvYXJyYXkubWFwLmpzIiwic3JjL3BvbHlmaWxscy9hcnJheS5zb21lLmpzIiwic3JjL3BvbHlmaWxscy9mdW5jdGlvbi5iaW5kLmpzIiwic3JjL3BvbHlmaWxscy9vYmplY3Qua2V5cy5qcyIsInNyYy9wb2x5ZmlsbHMvc3RyaW5nLnRyaW0uanMiLCJzcmMvcm9tZS5qcyIsInNyYy9yb21lLnN0YW5kYWxvbmUuanMiLCJzcmMvdGV4dC5qcyIsInNyYy90aHJvdHRsZS5qcyIsInNyYy91c2UuanMiLCJzcmMvdmFsaWRhdG9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciB0aHJvdHRsZSA9IHJlcXVpcmUoJy4vdGhyb3R0bGUnKTtcbnZhciB0YWlsb3JtYWRlID0gcmVxdWlyZSgnLi90YWlsb3JtYWRlJyk7XG5cbmZ1bmN0aW9uIGJ1bGxzZXllIChlbCwgdGFyZ2V0LCBvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucztcbiAgdmFyIGRvbVRhcmdldCA9IHRhcmdldCAmJiB0YXJnZXQudGFnTmFtZTtcblxuICBpZiAoIWRvbVRhcmdldCAmJiBhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgbyA9IHRhcmdldDtcbiAgfVxuICBpZiAoIWRvbVRhcmdldCkge1xuICAgIHRhcmdldCA9IGVsO1xuICB9XG4gIGlmICghbykgeyBvID0ge307IH1cblxuICB2YXIgZGVzdHJveWVkID0gZmFsc2U7XG4gIHZhciB0aHJvdHRsZWRXcml0ZSA9IHRocm90dGxlKHdyaXRlLCAzMCk7XG4gIHZhciB0YWlsb3JPcHRpb25zID0geyB1cGRhdGU6IG8uYXV0b3VwZGF0ZVRvQ2FyZXQgIT09IGZhbHNlICYmIHVwZGF0ZSB9O1xuICB2YXIgdGFpbG9yID0gby5jYXJldCAmJiB0YWlsb3JtYWRlKHRhcmdldCwgdGFpbG9yT3B0aW9ucyk7XG5cbiAgd3JpdGUoKTtcblxuICBpZiAoby50cmFja2luZyAhPT0gZmFsc2UpIHtcbiAgICBjcm9zc3ZlbnQuYWRkKHdpbmRvdywgJ3Jlc2l6ZScsIHRocm90dGxlZFdyaXRlKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVhZDogcmVhZE51bGwsXG4gICAgcmVmcmVzaDogd3JpdGUsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBzbGVlcDogc2xlZXBcbiAgfTtcblxuICBmdW5jdGlvbiBzbGVlcCAoKSB7XG4gICAgdGFpbG9yT3B0aW9ucy5zbGVlcGluZyA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkTnVsbCAoKSB7IHJldHVybiByZWFkKCk7IH1cblxuICBmdW5jdGlvbiByZWFkIChyZWFkaW5ncykge1xuICAgIHZhciBib3VuZHMgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIHNjcm9sbFRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKHRhaWxvcikge1xuICAgICAgcmVhZGluZ3MgPSB0YWlsb3IucmVhZCgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogKHJlYWRpbmdzLmFic29sdXRlID8gMCA6IGJvdW5kcy5sZWZ0KSArIHJlYWRpbmdzLngsXG4gICAgICAgIHk6IChyZWFkaW5ncy5hYnNvbHV0ZSA/IDAgOiBib3VuZHMudG9wKSArIHNjcm9sbFRvcCArIHJlYWRpbmdzLnkgKyAyMFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGJvdW5kcy5sZWZ0LFxuICAgICAgeTogYm91bmRzLnRvcCArIHNjcm9sbFRvcFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKHJlYWRpbmdzKSB7XG4gICAgd3JpdGUocmVhZGluZ3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUgKHJlYWRpbmdzKSB7XG4gICAgaWYgKGRlc3Ryb3llZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCdWxsc2V5ZSBjYW5cXCd0IHJlZnJlc2ggYWZ0ZXIgYmVpbmcgZGVzdHJveWVkLiBDcmVhdGUgYW5vdGhlciBpbnN0YW5jZSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICBpZiAodGFpbG9yICYmICFyZWFkaW5ncykge1xuICAgICAgdGFpbG9yT3B0aW9ucy5zbGVlcGluZyA9IGZhbHNlO1xuICAgICAgdGFpbG9yLnJlZnJlc2goKTsgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcCA9IHJlYWQocmVhZGluZ3MpO1xuICAgIGlmICghdGFpbG9yICYmIHRhcmdldCAhPT0gZWwpIHtcbiAgICAgIHAueSArPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICBlbC5zdHlsZS5sZWZ0ID0gcC54ICsgJ3B4JztcbiAgICBlbC5zdHlsZS50b3AgPSBwLnkgKyAncHgnO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgaWYgKHRhaWxvcikgeyB0YWlsb3IuZGVzdHJveSgpOyB9XG4gICAgY3Jvc3N2ZW50LnJlbW92ZSh3aW5kb3csICdyZXNpemUnLCB0aHJvdHRsZWRXcml0ZSk7XG4gICAgZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1bGxzZXllO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0U2VsZWN0aW9uO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBnZXRTZWxlY3Rpb25SYXcgPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvblJhdycpO1xudmFyIGdldFNlbGVjdGlvbk51bGxPcCA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uTnVsbE9wJyk7XG52YXIgZ2V0U2VsZWN0aW9uU3ludGhldGljID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb25TeW50aGV0aWMnKTtcbnZhciBpc0hvc3QgPSByZXF1aXJlKCcuL2lzSG9zdCcpO1xuaWYgKGlzSG9zdC5tZXRob2QoZ2xvYmFsLCAnZ2V0U2VsZWN0aW9uJykpIHtcbiAgZ2V0U2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uUmF3O1xufSBlbHNlIGlmICh0eXBlb2YgZG9jLnNlbGVjdGlvbiA9PT0gJ29iamVjdCcgJiYgZG9jLnNlbGVjdGlvbikge1xuICBnZXRTZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb25TeW50aGV0aWM7XG59IGVsc2Uge1xuICBnZXRTZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb25OdWxsT3A7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBub29wICgpIHt9XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGlvbk51bGxPcCAoKSB7XG4gIHJldHVybiB7XG4gICAgcmVtb3ZlQWxsUmFuZ2VzOiBub29wLFxuICAgIGFkZFJhbmdlOiBub29wXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uTnVsbE9wO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb25SYXcgKCkge1xuICByZXR1cm4gZ2xvYmFsLmdldFNlbGVjdGlvbigpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvblJhdztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmdlVG9UZXh0UmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlVG9UZXh0UmFuZ2UnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYm9keSA9IGRvYy5ib2R5O1xudmFyIEdldFNlbGVjdGlvblByb3RvID0gR2V0U2VsZWN0aW9uLnByb3RvdHlwZTtcblxuZnVuY3Rpb24gR2V0U2VsZWN0aW9uIChzZWxlY3Rpb24pIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgcmFuZ2UgPSBzZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcblxuICB0aGlzLl9zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gIHRoaXMuX3JhbmdlcyA9IFtdO1xuXG4gIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ0NvbnRyb2wnKSB7XG4gICAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbihzZWxmKTtcbiAgfSBlbHNlIGlmIChpc1RleHRSYW5nZShyYW5nZSkpIHtcbiAgICB1cGRhdGVGcm9tVGV4dFJhbmdlKHNlbGYsIHJhbmdlKTtcbiAgfSBlbHNlIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWxmKTtcbiAgfVxufVxuXG5HZXRTZWxlY3Rpb25Qcm90by5yZW1vdmVBbGxSYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0UmFuZ2U7XG4gIHRyeSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbi50eXBlICE9PSAnTm9uZScpIHtcbiAgICAgIHRleHRSYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICB0ZXh0UmFuZ2Uuc2VsZWN0KCk7XG4gICAgICB0aGlzLl9zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICB1cGRhdGVFbXB0eVNlbGVjdGlvbih0aGlzKTtcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmFkZFJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSA9PT0gJ0NvbnRyb2wnKSB7XG4gICAgYWRkUmFuZ2VUb0NvbnRyb2xTZWxlY3Rpb24odGhpcywgcmFuZ2UpO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlVG9UZXh0UmFuZ2UocmFuZ2UpLnNlbGVjdCgpO1xuICAgIHRoaXMuX3Jhbmdlc1swXSA9IHJhbmdlO1xuICAgIHRoaXMucmFuZ2VDb3VudCA9IDE7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRoaXMuX3Jhbmdlc1swXS5jb2xsYXBzZWQ7XG4gICAgdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2UodGhpcywgcmFuZ2UsIGZhbHNlKTtcbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uc2V0UmFuZ2VzID0gZnVuY3Rpb24gKHJhbmdlcykge1xuICB0aGlzLnJlbW92ZUFsbFJhbmdlcygpO1xuICB2YXIgcmFuZ2VDb3VudCA9IHJhbmdlcy5sZW5ndGg7XG4gIGlmIChyYW5nZUNvdW50ID4gMSkge1xuICAgIGNyZWF0ZUNvbnRyb2xTZWxlY3Rpb24odGhpcywgcmFuZ2VzKTtcbiAgfSBlbHNlIGlmIChyYW5nZUNvdW50KSB7XG4gICAgdGhpcy5hZGRSYW5nZShyYW5nZXNbMF0pO1xuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5nZXRSYW5nZUF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5yYW5nZUNvdW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRSYW5nZUF0KCk6IGluZGV4IG91dCBvZiBib3VuZHMnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VzW2luZGV4XS5jbG9uZVJhbmdlKCk7XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLnJlbW92ZVJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSAhPT0gJ0NvbnRyb2wnKSB7XG4gICAgcmVtb3ZlUmFuZ2VNYW51YWxseSh0aGlzLCByYW5nZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjb250cm9sUmFuZ2UgPSB0aGlzLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHJhbmdlRWxlbWVudCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2UpO1xuICB2YXIgbmV3Q29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgdmFyIGVsO1xuICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gY29udHJvbFJhbmdlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgZWwgPSBjb250cm9sUmFuZ2UuaXRlbShpKTtcbiAgICBpZiAoZWwgIT09IHJhbmdlRWxlbWVudCB8fCByZW1vdmVkKSB7XG4gICAgICBuZXdDb250cm9sUmFuZ2UuYWRkKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfVxuICB9XG4gIG5ld0NvbnRyb2xSYW5nZS5zZWxlY3QoKTtcbiAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbih0aGlzKTtcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmVhY2hSYW5nZSA9IGZ1bmN0aW9uIChmbiwgcmV0dXJuVmFsdWUpIHtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbGVuID0gdGhpcy5fcmFuZ2VzLmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGZuKHRoaXMuZ2V0UmFuZ2VBdChpKSkpIHtcbiAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmdldEFsbFJhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJhbmdlcyA9IFtdO1xuICB0aGlzLmVhY2hSYW5nZShmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICByYW5nZXMucHVzaChyYW5nZSk7XG4gIH0pO1xuICByZXR1cm4gcmFuZ2VzO1xufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uc2V0U2luZ2xlUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgdGhpcy5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgdGhpcy5hZGRSYW5nZShyYW5nZSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDb250cm9sU2VsZWN0aW9uIChzZWwsIHJhbmdlcykge1xuICB2YXIgY29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGVsLCBsZW4gPSByYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBlbCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2VzW2ldKTtcbiAgICB0cnkge1xuICAgICAgY29udHJvbFJhbmdlLmFkZChlbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRSYW5nZXMoKTogRWxlbWVudCBjb3VsZCBub3QgYmUgYWRkZWQgdG8gY29udHJvbCBzZWxlY3Rpb24nKTtcbiAgICB9XG4gIH1cbiAgY29udHJvbFJhbmdlLnNlbGVjdCgpO1xuICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHNlbCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJhbmdlTWFudWFsbHkgKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIHJhbmdlcyA9IHNlbC5nZXRBbGxSYW5nZXMoKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmFuZ2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKCFpc1NhbWVSYW5nZShyYW5nZSwgcmFuZ2VzW2ldKSkge1xuICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmICghc2VsLnJhbmdlQ291bnQpIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlIChzZWwsIHJhbmdlKSB7XG4gIHZhciBhbmNob3JQcmVmaXggPSAnc3RhcnQnO1xuICB2YXIgZm9jdXNQcmVmaXggPSAnZW5kJztcbiAgc2VsLmFuY2hvck5vZGUgPSByYW5nZVthbmNob3JQcmVmaXggKyAnQ29udGFpbmVyJ107XG4gIHNlbC5hbmNob3JPZmZzZXQgPSByYW5nZVthbmNob3JQcmVmaXggKyAnT2Zmc2V0J107XG4gIHNlbC5mb2N1c05vZGUgPSByYW5nZVtmb2N1c1ByZWZpeCArICdDb250YWluZXInXTtcbiAgc2VsLmZvY3VzT2Zmc2V0ID0gcmFuZ2VbZm9jdXNQcmVmaXggKyAnT2Zmc2V0J107XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUVtcHR5U2VsZWN0aW9uIChzZWwpIHtcbiAgc2VsLmFuY2hvck5vZGUgPSBzZWwuZm9jdXNOb2RlID0gbnVsbDtcbiAgc2VsLmFuY2hvck9mZnNldCA9IHNlbC5mb2N1c09mZnNldCA9IDA7XG4gIHNlbC5yYW5nZUNvdW50ID0gMDtcbiAgc2VsLmlzQ29sbGFwc2VkID0gdHJ1ZTtcbiAgc2VsLl9yYW5nZXMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gcmFuZ2VDb250YWluc1NpbmdsZUVsZW1lbnQgKHJhbmdlTm9kZXMpIHtcbiAgaWYgKCFyYW5nZU5vZGVzLmxlbmd0aCB8fCByYW5nZU5vZGVzWzBdLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAodmFyIGkgPSAxLCBsZW4gPSByYW5nZU5vZGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKCFpc0FuY2VzdG9yT2YocmFuZ2VOb2Rlc1swXSwgcmFuZ2VOb2Rlc1tpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UgKHJhbmdlKSB7XG4gIHZhciBub2RlcyA9IHJhbmdlLmdldE5vZGVzKCk7XG4gIGlmICghcmFuZ2VDb250YWluc1NpbmdsZUVsZW1lbnQobm9kZXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKCk6IHJhbmdlIGRpZCBub3QgY29uc2lzdCBvZiBhIHNpbmdsZSBlbGVtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIG5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBpc1RleHRSYW5nZSAocmFuZ2UpIHtcbiAgcmV0dXJuIHJhbmdlICYmIHJhbmdlLnRleHQgIT09IHZvaWQgMDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRnJvbVRleHRSYW5nZSAoc2VsLCByYW5nZSkge1xuICBzZWwuX3JhbmdlcyA9IFtyYW5nZV07XG4gIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlKHNlbCwgcmFuZ2UsIGZhbHNlKTtcbiAgc2VsLnJhbmdlQ291bnQgPSAxO1xuICBzZWwuaXNDb2xsYXBzZWQgPSByYW5nZS5jb2xsYXBzZWQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24gKHNlbCkge1xuICBzZWwuX3Jhbmdlcy5sZW5ndGggPSAwO1xuICBpZiAoc2VsLl9zZWxlY3Rpb24udHlwZSA9PT0gJ05vbmUnKSB7XG4gICAgdXBkYXRlRW1wdHlTZWxlY3Rpb24oc2VsKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY29udHJvbFJhbmdlID0gc2VsLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICBpZiAoaXNUZXh0UmFuZ2UoY29udHJvbFJhbmdlKSkge1xuICAgICAgdXBkYXRlRnJvbVRleHRSYW5nZShzZWwsIGNvbnRyb2xSYW5nZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbC5yYW5nZUNvdW50ID0gY29udHJvbFJhbmdlLmxlbmd0aDtcbiAgICAgIHZhciByYW5nZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsLnJhbmdlQ291bnQ7ICsraSkge1xuICAgICAgICByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgICAgICAgc2VsLl9yYW5nZXMucHVzaChyYW5nZSk7XG4gICAgICB9XG4gICAgICBzZWwuaXNDb2xsYXBzZWQgPSBzZWwucmFuZ2VDb3VudCA9PT0gMSAmJiBzZWwuX3Jhbmdlc1swXS5jb2xsYXBzZWQ7XG4gICAgICB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZShzZWwsIHNlbC5fcmFuZ2VzW3NlbC5yYW5nZUNvdW50IC0gMV0sIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkUmFuZ2VUb0NvbnRyb2xTZWxlY3Rpb24gKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIGNvbnRyb2xSYW5nZSA9IHNlbC5fc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gIHZhciByYW5nZUVsZW1lbnQgPSBnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKHJhbmdlKTtcbiAgdmFyIG5ld0NvbnRyb2xSYW5nZSA9IGJvZHkuY3JlYXRlQ29udHJvbFJhbmdlKCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjb250cm9sUmFuZ2UubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBuZXdDb250cm9sUmFuZ2UuYWRkKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgfVxuICB0cnkge1xuICAgIG5ld0NvbnRyb2xSYW5nZS5hZGQocmFuZ2VFbGVtZW50KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignYWRkUmFuZ2UoKTogRWxlbWVudCBjb3VsZCBub3QgYmUgYWRkZWQgdG8gY29udHJvbCBzZWxlY3Rpb24nKTtcbiAgfVxuICBuZXdDb250cm9sUmFuZ2Uuc2VsZWN0KCk7XG4gIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24oc2VsKTtcbn1cblxuZnVuY3Rpb24gaXNTYW1lUmFuZ2UgKGxlZnQsIHJpZ2h0KSB7XG4gIHJldHVybiAoXG4gICAgbGVmdC5zdGFydENvbnRhaW5lciA9PT0gcmlnaHQuc3RhcnRDb250YWluZXIgJiZcbiAgICBsZWZ0LnN0YXJ0T2Zmc2V0ID09PSByaWdodC5zdGFydE9mZnNldCAmJlxuICAgIGxlZnQuZW5kQ29udGFpbmVyID09PSByaWdodC5lbmRDb250YWluZXIgJiZcbiAgICBsZWZ0LmVuZE9mZnNldCA9PT0gcmlnaHQuZW5kT2Zmc2V0XG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzQW5jZXN0b3JPZiAoYW5jZXN0b3IsIGRlc2NlbmRhbnQpIHtcbiAgdmFyIG5vZGUgPSBkZXNjZW5kYW50O1xuICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSA9PT0gYW5jZXN0b3IpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBHZXRTZWxlY3Rpb24oZ2xvYmFsLmRvY3VtZW50LnNlbGVjdGlvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc0hvc3RNZXRob2QgKGhvc3QsIHByb3ApIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgaG9zdFtwcm9wXTtcbiAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgISEodHlwZSA9PT0gJ29iamVjdCcgJiYgaG9zdFtwcm9wXSkgfHwgdHlwZSA9PT0gJ3Vua25vd24nO1xufVxuXG5mdW5jdGlvbiBpc0hvc3RQcm9wZXJ0eSAoaG9zdCwgcHJvcCkge1xuICByZXR1cm4gdHlwZW9mIGhvc3RbcHJvcF0gIT09ICd1bmRlZmluZWQnO1xufVxuXG5mdW5jdGlvbiBtYW55IChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gYXJlSG9zdGVkIChob3N0LCBwcm9wcykge1xuICAgIHZhciBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmICghZm4oaG9zdCwgcHJvcHNbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRob2Q6IGlzSG9zdE1ldGhvZCxcbiAgbWV0aG9kczogbWFueShpc0hvc3RNZXRob2QpLFxuICBwcm9wZXJ0eTogaXNIb3N0UHJvcGVydHksXG4gIHByb3BlcnRpZXM6IG1hbnkoaXNIb3N0UHJvcGVydHkpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGJvZHkgPSBkb2MuYm9keTtcblxuZnVuY3Rpb24gcmFuZ2VUb1RleHRSYW5nZSAocCkge1xuICBpZiAocC5jb2xsYXBzZWQpIHtcbiAgICByZXR1cm4gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiBwLnN0YXJ0Q29udGFpbmVyLCBvZmZzZXQ6IHAuc3RhcnRPZmZzZXQgfSwgdHJ1ZSk7XG4gIH1cbiAgdmFyIHN0YXJ0UmFuZ2UgPSBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSh7IG5vZGU6IHAuc3RhcnRDb250YWluZXIsIG9mZnNldDogcC5zdGFydE9mZnNldCB9LCB0cnVlKTtcbiAgdmFyIGVuZFJhbmdlID0gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiBwLmVuZENvbnRhaW5lciwgb2Zmc2V0OiBwLmVuZE9mZnNldCB9LCBmYWxzZSk7XG4gIHZhciB0ZXh0UmFuZ2UgPSBib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICB0ZXh0UmFuZ2Uuc2V0RW5kUG9pbnQoJ1N0YXJ0VG9TdGFydCcsIHN0YXJ0UmFuZ2UpO1xuICB0ZXh0UmFuZ2Uuc2V0RW5kUG9pbnQoJ0VuZFRvRW5kJywgZW5kUmFuZ2UpO1xuICByZXR1cm4gdGV4dFJhbmdlO1xufVxuXG5mdW5jdGlvbiBpc0NoYXJhY3RlckRhdGFOb2RlIChub2RlKSB7XG4gIHZhciB0ID0gbm9kZS5ub2RlVHlwZTtcbiAgcmV0dXJuIHQgPT09IDMgfHwgdCA9PT0gNCB8fCB0ID09PSA4IDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UgKHAsIHN0YXJ0aW5nKSB7XG4gIHZhciBib3VuZDtcbiAgdmFyIHBhcmVudDtcbiAgdmFyIG9mZnNldCA9IHAub2Zmc2V0O1xuICB2YXIgd29ya2luZ05vZGU7XG4gIHZhciBjaGlsZE5vZGVzO1xuICB2YXIgcmFuZ2UgPSBib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICB2YXIgZGF0YSA9IGlzQ2hhcmFjdGVyRGF0YU5vZGUocC5ub2RlKTtcblxuICBpZiAoZGF0YSkge1xuICAgIGJvdW5kID0gcC5ub2RlO1xuICAgIHBhcmVudCA9IGJvdW5kLnBhcmVudE5vZGU7XG4gIH0gZWxzZSB7XG4gICAgY2hpbGROb2RlcyA9IHAubm9kZS5jaGlsZE5vZGVzO1xuICAgIGJvdW5kID0gb2Zmc2V0IDwgY2hpbGROb2Rlcy5sZW5ndGggPyBjaGlsZE5vZGVzW29mZnNldF0gOiBudWxsO1xuICAgIHBhcmVudCA9IHAubm9kZTtcbiAgfVxuXG4gIHdvcmtpbmdOb2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgd29ya2luZ05vZGUuaW5uZXJIVE1MID0gJyYjZmVmZjsnO1xuXG4gIGlmIChib3VuZCkge1xuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUod29ya2luZ05vZGUsIGJvdW5kKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQod29ya2luZ05vZGUpO1xuICB9XG5cbiAgcmFuZ2UubW92ZVRvRWxlbWVudFRleHQod29ya2luZ05vZGUpO1xuICByYW5nZS5jb2xsYXBzZSghc3RhcnRpbmcpO1xuICBwYXJlbnQucmVtb3ZlQ2hpbGQod29ya2luZ05vZGUpO1xuXG4gIGlmIChkYXRhKSB7XG4gICAgcmFuZ2Vbc3RhcnRpbmcgPyAnbW92ZVN0YXJ0JyA6ICdtb3ZlRW5kJ10oJ2NoYXJhY3RlcicsIG9mZnNldCk7XG4gIH1cbiAgcmV0dXJuIHJhbmdlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmdlVG9UZXh0UmFuZ2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTZWxlY3Rpb24gPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvbicpO1xudmFyIHNldFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vc2V0U2VsZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXQ6IGdldFNlbGVjdGlvbixcbiAgc2V0OiBzZXRTZWxlY3Rpb25cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTZWxlY3Rpb24gPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvbicpO1xudmFyIHJhbmdlVG9UZXh0UmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlVG9UZXh0UmFuZ2UnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG5cbmZ1bmN0aW9uIHNldFNlbGVjdGlvbiAocCkge1xuICBpZiAoZG9jLmNyZWF0ZVJhbmdlKSB7XG4gICAgbW9kZXJuU2VsZWN0aW9uKCk7XG4gIH0gZWxzZSB7XG4gICAgb2xkU2VsZWN0aW9uKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtb2Rlcm5TZWxlY3Rpb24gKCkge1xuICAgIHZhciBzZWwgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICB2YXIgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICBpZiAoIXAuc3RhcnRDb250YWluZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHAuZW5kQ29udGFpbmVyKSB7XG4gICAgICByYW5nZS5zZXRFbmQocC5lbmRDb250YWluZXIsIHAuZW5kT2Zmc2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2Uuc2V0RW5kKHAuc3RhcnRDb250YWluZXIsIHAuc3RhcnRPZmZzZXQpO1xuICAgIH1cbiAgICByYW5nZS5zZXRTdGFydChwLnN0YXJ0Q29udGFpbmVyLCBwLnN0YXJ0T2Zmc2V0KTtcbiAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9sZFNlbGVjdGlvbiAoKSB7XG4gICAgcmFuZ2VUb1RleHRSYW5nZShwKS5zZWxlY3QoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFNlbGVjdGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldCA9IGVhc3lHZXQ7XG52YXIgc2V0ID0gZWFzeVNldDtcblxuaWYgKGRvY3VtZW50LnNlbGVjdGlvbiAmJiBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UpIHtcbiAgZ2V0ID0gaGFyZEdldDtcbiAgc2V0ID0gaGFyZFNldDtcbn1cblxuZnVuY3Rpb24gZWFzeUdldCAoZWwpIHtcbiAgcmV0dXJuIHtcbiAgICBzdGFydDogZWwuc2VsZWN0aW9uU3RhcnQsXG4gICAgZW5kOiBlbC5zZWxlY3Rpb25FbmRcbiAgfTtcbn1cblxuZnVuY3Rpb24gaGFyZEdldCAoZWwpIHtcbiAgdmFyIGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIGlmIChhY3RpdmUgIT09IGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxuXG4gIHZhciByYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICB2YXIgYm9va21hcmsgPSByYW5nZS5nZXRCb29rbWFyaygpO1xuICB2YXIgb3JpZ2luYWwgPSBlbC52YWx1ZTtcbiAgdmFyIG1hcmtlciA9IGdldFVuaXF1ZU1hcmtlcihvcmlnaW5hbCk7XG4gIHZhciBwYXJlbnQgPSByYW5nZS5wYXJlbnRFbGVtZW50KCk7XG4gIGlmIChwYXJlbnQgPT09IG51bGwgfHwgIWlucHV0cyhwYXJlbnQpKSB7XG4gICAgcmV0dXJuIHJlc3VsdCgwLCAwKTtcbiAgfVxuICByYW5nZS50ZXh0ID0gbWFya2VyICsgcmFuZ2UudGV4dCArIG1hcmtlcjtcblxuICB2YXIgY29udGVudHMgPSBlbC52YWx1ZTtcblxuICBlbC52YWx1ZSA9IG9yaWdpbmFsO1xuICByYW5nZS5tb3ZlVG9Cb29rbWFyayhib29rbWFyayk7XG4gIHJhbmdlLnNlbGVjdCgpO1xuXG4gIHJldHVybiByZXN1bHQoY29udGVudHMuaW5kZXhPZihtYXJrZXIpLCBjb250ZW50cy5sYXN0SW5kZXhPZihtYXJrZXIpIC0gbWFya2VyLmxlbmd0aCk7XG5cbiAgZnVuY3Rpb24gcmVzdWx0IChzdGFydCwgZW5kKSB7XG4gICAgaWYgKGFjdGl2ZSAhPT0gZWwpIHsgLy8gZG9uJ3QgZGlzcnVwdCBwcmUtZXhpc3Rpbmcgc3RhdGVcbiAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgYWN0aXZlLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5ibHVyKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRVbmlxdWVNYXJrZXIgKGNvbnRlbnRzKSB7XG4gIHZhciBtYXJrZXI7XG4gIGRvIHtcbiAgICBtYXJrZXIgPSAnQEBtYXJrZXIuJyArIE1hdGgucmFuZG9tKCkgKiBuZXcgRGF0ZSgpO1xuICB9IHdoaWxlIChjb250ZW50cy5pbmRleE9mKG1hcmtlcikgIT09IC0xKTtcbiAgcmV0dXJuIG1hcmtlcjtcbn1cblxuZnVuY3Rpb24gaW5wdXRzIChlbCkge1xuICByZXR1cm4gKChlbC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsLnR5cGUgPT09ICd0ZXh0JykgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJyk7XG59XG5cbmZ1bmN0aW9uIGVhc3lTZXQgKGVsLCBwKSB7XG4gIGVsLnNlbGVjdGlvblN0YXJ0ID0gcGFyc2UoZWwsIHAuc3RhcnQpO1xuICBlbC5zZWxlY3Rpb25FbmQgPSBwYXJzZShlbCwgcC5lbmQpO1xufVxuXG5mdW5jdGlvbiBoYXJkU2V0IChlbCwgcCkge1xuICB2YXIgcmFuZ2UgPSBlbC5jcmVhdGVUZXh0UmFuZ2UoKTtcblxuICBpZiAocC5zdGFydCA9PT0gJ2VuZCcgJiYgcC5lbmQgPT09ICdlbmQnKSB7XG4gICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgIHJhbmdlLnNlbGVjdCgpO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIHBhcnNlKGVsLCBwLmVuZCkpO1xuICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgcGFyc2UoZWwsIHAuc3RhcnQpKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZSAoZWwsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gJ2VuZCcgPyBlbC52YWx1ZS5sZW5ndGggOiB2YWx1ZSB8fCAwO1xufVxuXG5mdW5jdGlvbiBzZWxsIChlbCwgcCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHNldChlbCwgcCk7XG4gIH1cbiAgcmV0dXJuIGdldChlbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNlbGwgPSByZXF1aXJlKCdzZWxsJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgc2VsZWNjaW9uID0gcmVxdWlyZSgnc2VsZWNjaW9uJyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgZ2V0U2VsZWN0aW9uID0gc2VsZWNjaW9uLmdldDtcbnZhciBwcm9wcyA9IFtcbiAgJ2RpcmVjdGlvbicsXG4gICdib3hTaXppbmcnLFxuICAnd2lkdGgnLFxuICAnaGVpZ2h0JyxcbiAgJ292ZXJmbG93WCcsXG4gICdvdmVyZmxvd1knLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICdib3JkZXJCb3R0b21XaWR0aCcsXG4gICdib3JkZXJMZWZ0V2lkdGgnLFxuICAncGFkZGluZ1RvcCcsXG4gICdwYWRkaW5nUmlnaHQnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdwYWRkaW5nTGVmdCcsXG4gICdmb250U3R5bGUnLFxuICAnZm9udFZhcmlhbnQnLFxuICAnZm9udFdlaWdodCcsXG4gICdmb250U3RyZXRjaCcsXG4gICdmb250U2l6ZScsXG4gICdmb250U2l6ZUFkanVzdCcsXG4gICdsaW5lSGVpZ2h0JyxcbiAgJ2ZvbnRGYW1pbHknLFxuICAndGV4dEFsaWduJyxcbiAgJ3RleHRUcmFuc2Zvcm0nLFxuICAndGV4dEluZGVudCcsXG4gICd0ZXh0RGVjb3JhdGlvbicsXG4gICdsZXR0ZXJTcGFjaW5nJyxcbiAgJ3dvcmRTcGFjaW5nJ1xuXTtcbnZhciB3aW4gPSBnbG9iYWw7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgZmYgPSB3aW4ubW96SW5uZXJTY3JlZW5YICE9PSBudWxsICYmIHdpbi5tb3pJbm5lclNjcmVlblggIT09IHZvaWQgMDtcblxuZnVuY3Rpb24gdGFpbG9ybWFkZSAoZWwsIG9wdGlvbnMpIHtcbiAgdmFyIHRleHRJbnB1dCA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJztcbiAgdmFyIHRocm90dGxlZFJlZnJlc2ggPSB0aHJvdHRsZShyZWZyZXNoLCAzMCk7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcblxuICBiaW5kKCk7XG5cbiAgcmV0dXJuIHtcbiAgICByZWFkOiByZWFkUG9zaXRpb24sXG4gICAgcmVmcmVzaDogdGhyb3R0bGVkUmVmcmVzaCxcbiAgICBkZXN0cm95OiBkZXN0cm95XG4gIH07XG5cbiAgZnVuY3Rpb24gbm9vcCAoKSB7fVxuICBmdW5jdGlvbiByZWFkUG9zaXRpb24gKCkgeyByZXR1cm4gKHRleHRJbnB1dCA/IGNvb3Jkc1RleHQgOiBjb29yZHNIVE1MKSgpOyB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAoKSB7XG4gICAgaWYgKG8uc2xlZXBpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChvLnVwZGF0ZSB8fCBub29wKShyZWFkUG9zaXRpb24oKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNUZXh0ICgpIHtcbiAgICB2YXIgcCA9IHNlbGwoZWwpO1xuICAgIHZhciBjb250ZXh0ID0gcHJlcGFyZSgpO1xuICAgIHZhciByZWFkaW5ncyA9IHJlYWRUZXh0Q29vcmRzKGNvbnRleHQsIHAuc3RhcnQpO1xuICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKGNvbnRleHQubWlycm9yKTtcbiAgICByZXR1cm4gcmVhZGluZ3M7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNIVE1MICgpIHtcbiAgICB2YXIgc2VsID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICB2YXIgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgIHZhciBuZWVkc1RvV29ya0Fyb3VuZE5ld2xpbmVCdWcgPSByYW5nZS5zdGFydENvbnRhaW5lci5ub2RlTmFtZSA9PT0gJ1AnICYmIHJhbmdlLnN0YXJ0T2Zmc2V0ID09PSAwO1xuICAgICAgaWYgKG5lZWRzVG9Xb3JrQXJvdW5kTmV3bGluZUJ1Zykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm9mZnNldExlZnQsXG4gICAgICAgICAgeTogcmFuZ2Uuc3RhcnRDb250YWluZXIub2Zmc2V0VG9wLFxuICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAocmFuZ2UuZ2V0Q2xpZW50UmVjdHMpIHtcbiAgICAgICAgdmFyIHJlY3RzID0gcmFuZ2UuZ2V0Q2xpZW50UmVjdHMoKTtcbiAgICAgICAgaWYgKHJlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcmVjdHNbMF0ubGVmdCxcbiAgICAgICAgICAgIHk6IHJlY3RzWzBdLnRvcCxcbiAgICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB4OiAwLCB5OiAwIH07XG4gIH1cblxuICBmdW5jdGlvbiByZWFkVGV4dENvb3JkcyAoY29udGV4dCwgcCkge1xuICAgIHZhciByZXN0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB2YXIgbWlycm9yID0gY29udGV4dC5taXJyb3I7XG4gICAgdmFyIGNvbXB1dGVkID0gY29udGV4dC5jb21wdXRlZDtcblxuICAgIHdyaXRlKG1pcnJvciwgcmVhZChlbCkuc3Vic3RyaW5nKDAsIHApKTtcblxuICAgIGlmIChlbC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICBtaXJyb3IudGV4dENvbnRlbnQgPSBtaXJyb3IudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICdcXHUwMGEwJyk7XG4gICAgfVxuXG4gICAgd3JpdGUocmVzdCwgcmVhZChlbCkuc3Vic3RyaW5nKHApIHx8ICcuJyk7XG5cbiAgICBtaXJyb3IuYXBwZW5kQ2hpbGQocmVzdCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogcmVzdC5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlckxlZnRXaWR0aCddKSxcbiAgICAgIHk6IHJlc3Qub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlclRvcFdpZHRoJ10pXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGVsKSB7XG4gICAgcmV0dXJuIHRleHRJbnB1dCA/IGVsLnZhbHVlIDogZWwuaW5uZXJIVE1MO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlcGFyZSAoKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gd2luLmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsKSA6IGVsLmN1cnJlbnRTdHlsZTtcbiAgICB2YXIgbWlycm9yID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBzdHlsZSA9IG1pcnJvci5zdHlsZTtcblxuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKG1pcnJvcik7XG5cbiAgICBpZiAoZWwudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7XG4gICAgfVxuICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnO1xuICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgcHJvcHMuZm9yRWFjaChjb3B5KTtcblxuICAgIGlmIChmZikge1xuICAgICAgc3R5bGUud2lkdGggPSBwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyICsgJ3B4JztcbiAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKSB7XG4gICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICByZXR1cm4geyBtaXJyb3I6IG1pcnJvciwgY29tcHV0ZWQ6IGNvbXB1dGVkIH07XG5cbiAgICBmdW5jdGlvbiBjb3B5IChwcm9wKSB7XG4gICAgICBzdHlsZVtwcm9wXSA9IGNvbXB1dGVkW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChlbCwgdmFsdWUpIHtcbiAgICBpZiAodGV4dElucHV0KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXlkb3duJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleXVwJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2lucHV0JywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ3Bhc3RlJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2NoYW5nZScsIHRocm90dGxlZFJlZnJlc2gpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgYmluZCh0cnVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhaWxvcm1hZGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHRocm90dGxlIChmbiwgYm91bmRhcnkpIHtcbiAgdmFyIGxhc3QgPSAtSW5maW5pdHk7XG4gIHZhciB0aW1lcjtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJvdW5jZWQgKCkge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1bmJvdW5kKCk7XG5cbiAgICBmdW5jdGlvbiB1bmJvdW5kICgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICB2YXIgbmV4dCA9IGxhc3QgKyBib3VuZGFyeTtcbiAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgaWYgKG5vdyA+IG5leHQpIHtcbiAgICAgICAgbGFzdCA9IG5vdztcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCh1bmJvdW5kLCBuZXh0IC0gbm93KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0aWNreSA9IHJlcXVpcmUoJ3RpY2t5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVib3VuY2UgKGZuLCBhcmdzLCBjdHgpIHtcbiAgaWYgKCFmbikgeyByZXR1cm47IH1cbiAgdGlja3koZnVuY3Rpb24gcnVuICgpIHtcbiAgICBmbi5hcHBseShjdHggfHwgbnVsbCwgYXJncyB8fCBbXSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGF0b2EgPSByZXF1aXJlKCdhdG9hJyk7XG52YXIgZGVib3VuY2UgPSByZXF1aXJlKCcuL2RlYm91bmNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW1pdHRlciAodGhpbmcsIG9wdGlvbnMpIHtcbiAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgZXZ0ID0ge307XG4gIGlmICh0aGluZyA9PT0gdW5kZWZpbmVkKSB7IHRoaW5nID0ge307IH1cbiAgdGhpbmcub24gPSBmdW5jdGlvbiAodHlwZSwgZm4pIHtcbiAgICBpZiAoIWV2dFt0eXBlXSkge1xuICAgICAgZXZ0W3R5cGVdID0gW2ZuXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZ0W3R5cGVdLnB1c2goZm4pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpbmc7XG4gIH07XG4gIHRoaW5nLm9uY2UgPSBmdW5jdGlvbiAodHlwZSwgZm4pIHtcbiAgICBmbi5fb25jZSA9IHRydWU7IC8vIHRoaW5nLm9mZihmbikgc3RpbGwgd29ya3MhXG4gICAgdGhpbmcub24odHlwZSwgZm4pO1xuICAgIHJldHVybiB0aGluZztcbiAgfTtcbiAgdGhpbmcub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGZuKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChjID09PSAxKSB7XG4gICAgICBkZWxldGUgZXZ0W3R5cGVdO1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gMCkge1xuICAgICAgZXZ0ID0ge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBldCA9IGV2dFt0eXBlXTtcbiAgICAgIGlmICghZXQpIHsgcmV0dXJuIHRoaW5nOyB9XG4gICAgICBldC5zcGxpY2UoZXQuaW5kZXhPZihmbiksIDEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpbmc7XG4gIH07XG4gIHRoaW5nLmVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBhdG9hKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHRoaW5nLmVtaXR0ZXJTbmFwc2hvdChhcmdzLnNoaWZ0KCkpLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9O1xuICB0aGluZy5lbWl0dGVyU25hcHNob3QgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgIHZhciBldCA9IChldnRbdHlwZV0gfHwgW10pLnNsaWNlKDApO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYXJncyA9IGF0b2EoYXJndW1lbnRzKTtcbiAgICAgIHZhciBjdHggPSB0aGlzIHx8IHRoaW5nO1xuICAgICAgaWYgKHR5cGUgPT09ICdlcnJvcicgJiYgb3B0cy50aHJvd3MgIT09IGZhbHNlICYmICFldC5sZW5ndGgpIHsgdGhyb3cgYXJncy5sZW5ndGggPT09IDEgPyBhcmdzWzBdIDogYXJnczsgfVxuICAgICAgZXQuZm9yRWFjaChmdW5jdGlvbiBlbWl0dGVyIChsaXN0ZW4pIHtcbiAgICAgICAgaWYgKG9wdHMuYXN5bmMpIHsgZGVib3VuY2UobGlzdGVuLCBhcmdzLCBjdHgpOyB9IGVsc2UgeyBsaXN0ZW4uYXBwbHkoY3R4LCBhcmdzKTsgfVxuICAgICAgICBpZiAobGlzdGVuLl9vbmNlKSB7IHRoaW5nLm9mZih0eXBlLCBsaXN0ZW4pOyB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGluZztcbiAgICB9O1xuICB9O1xuICByZXR1cm4gdGhpbmc7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhdG9hIChhLCBuKSB7IHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhLCBuKTsgfVxuIiwidmFyIHNpID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJywgdGljaztcbmlmIChzaSkge1xuICB0aWNrID0gZnVuY3Rpb24gKGZuKSB7IHNldEltbWVkaWF0ZShmbik7IH07XG59IGVsc2Uge1xuICB0aWNrID0gZnVuY3Rpb24gKGZuKSB7IHNldFRpbWVvdXQoZm4sIDApOyB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRpY2s7IiwiXG52YXIgTmF0aXZlQ3VzdG9tRXZlbnQgPSBnbG9iYWwuQ3VzdG9tRXZlbnQ7XG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHAgPSBuZXcgTmF0aXZlQ3VzdG9tRXZlbnQoJ2NhdCcsIHsgZGV0YWlsOiB7IGZvbzogJ2JhcicgfSB9KTtcbiAgICByZXR1cm4gICdjYXQnID09PSBwLnR5cGUgJiYgJ2JhcicgPT09IHAuZGV0YWlsLmZvbztcbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcm9zcy1icm93c2VyIGBDdXN0b21FdmVudGAgY29uc3RydWN0b3IuXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50LkN1c3RvbUV2ZW50XG4gKlxuICogQHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdXNlTmF0aXZlKCkgPyBOYXRpdmVDdXN0b21FdmVudCA6XG5cbi8vIElFID49IDlcbidmdW5jdGlvbicgPT09IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFdmVudCA/IGZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gIH0gZWxzZSB7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlLCB2b2lkIDApO1xuICB9XG4gIHJldHVybiBlO1xufSA6XG5cbi8vIElFIDw9IDhcbmZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICBlLnR5cGUgPSB0eXBlO1xuICBpZiAocGFyYW1zKSB7XG4gICAgZS5idWJibGVzID0gQm9vbGVhbihwYXJhbXMuYnViYmxlcyk7XG4gICAgZS5jYW5jZWxhYmxlID0gQm9vbGVhbihwYXJhbXMuY2FuY2VsYWJsZSk7XG4gICAgZS5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICB9IGVsc2Uge1xuICAgIGUuYnViYmxlcyA9IGZhbHNlO1xuICAgIGUuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgIGUuZGV0YWlsID0gdm9pZCAwO1xuICB9XG4gIHJldHVybiBlO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3VzdG9tRXZlbnQgPSByZXF1aXJlKCdjdXN0b20tZXZlbnQnKTtcbnZhciBldmVudG1hcCA9IHJlcXVpcmUoJy4vZXZlbnRtYXAnKTtcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBhZGRFdmVudCA9IGFkZEV2ZW50RWFzeTtcbnZhciByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50RWFzeTtcbnZhciBoYXJkQ2FjaGUgPSBbXTtcblxuaWYgKCFnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICBhZGRFdmVudCA9IGFkZEV2ZW50SGFyZDtcbiAgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEhhcmQ7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50RWFzeSAoZWwsIHR5cGUsIGZuLCBjYXB0dXJpbmcpIHtcbiAgcmV0dXJuIGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGNhcHR1cmluZyk7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50SGFyZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBlbC5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgd3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCB1bndyYXAoZWwsIHR5cGUsIGZuKSk7XG59XG5cbmZ1bmN0aW9uIGZhYnJpY2F0ZUV2ZW50IChlbCwgdHlwZSwgbW9kZWwpIHtcbiAgdmFyIGUgPSBldmVudG1hcC5pbmRleE9mKHR5cGUpID09PSAtMSA/IG1ha2VDdXN0b21FdmVudCgpIDogbWFrZUNsYXNzaWNFdmVudCgpO1xuICBpZiAoZWwuZGlzcGF0Y2hFdmVudCkge1xuICAgIGVsLmRpc3BhdGNoRXZlbnQoZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuZmlyZUV2ZW50KCdvbicgKyB0eXBlLCBlKTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ2xhc3NpY0V2ZW50ICgpIHtcbiAgICB2YXIgZTtcbiAgICBpZiAoZG9jLmNyZWF0ZUV2ZW50KSB7XG4gICAgICBlID0gZG9jLmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgZS5pbml0RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIGU7XG4gIH1cbiAgZnVuY3Rpb24gbWFrZUN1c3RvbUV2ZW50ICgpIHtcbiAgICByZXR1cm4gbmV3IGN1c3RvbUV2ZW50KHR5cGUsIHsgZGV0YWlsOiBtb2RlbCB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwcGVyRmFjdG9yeSAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwcGVyIChvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSBvcmlnaW5hbEV2ZW50IHx8IGdsb2JhbC5ldmVudDtcbiAgICBlLnRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0ID0gZS5wcmV2ZW50RGVmYXVsdCB8fCBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdCAoKSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbiA9IGUuc3RvcFByb3BhZ2F0aW9uIHx8IGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbiAoKSB7IGUuY2FuY2VsQnViYmxlID0gdHJ1ZTsgfTtcbiAgICBlLndoaWNoID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgZm4uY2FsbChlbCwgZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgd3JhcHBlciA9IHVud3JhcChlbCwgdHlwZSwgZm4pIHx8IHdyYXBwZXJGYWN0b3J5KGVsLCB0eXBlLCBmbik7XG4gIGhhcmRDYWNoZS5wdXNoKHtcbiAgICB3cmFwcGVyOiB3cmFwcGVyLFxuICAgIGVsZW1lbnQ6IGVsLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgZm46IGZuXG4gIH0pO1xuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuZnVuY3Rpb24gdW53cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGkgPSBmaW5kKGVsLCB0eXBlLCBmbik7XG4gIGlmIChpKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBoYXJkQ2FjaGVbaV0ud3JhcHBlcjtcbiAgICBoYXJkQ2FjaGUuc3BsaWNlKGksIDEpOyAvLyBmcmVlIHVwIGEgdGFkIG9mIG1lbW9yeVxuICAgIHJldHVybiB3cmFwcGVyO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmQgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSwgaXRlbTtcbiAgZm9yIChpID0gMDsgaSA8IGhhcmRDYWNoZS5sZW5ndGg7IGkrKykge1xuICAgIGl0ZW0gPSBoYXJkQ2FjaGVbaV07XG4gICAgaWYgKGl0ZW0uZWxlbWVudCA9PT0gZWwgJiYgaXRlbS50eXBlID09PSB0eXBlICYmIGl0ZW0uZm4gPT09IGZuKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZDogYWRkRXZlbnQsXG4gIHJlbW92ZTogcmVtb3ZlRXZlbnQsXG4gIGZhYnJpY2F0ZTogZmFicmljYXRlRXZlbnRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBldmVudG1hcCA9IFtdO1xudmFyIGV2ZW50bmFtZSA9ICcnO1xudmFyIHJvbiA9IC9eb24vO1xuXG5mb3IgKGV2ZW50bmFtZSBpbiBnbG9iYWwpIHtcbiAgaWYgKHJvbi50ZXN0KGV2ZW50bmFtZSkpIHtcbiAgICBldmVudG1hcC5wdXNoKGV2ZW50bmFtZS5zbGljZSgyKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBldmVudG1hcDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzSW5wdXQgPSByZXF1aXJlKCcuL2lzSW5wdXQnKTtcbnZhciBiaW5kaW5ncyA9IHt9O1xuXG5mdW5jdGlvbiBoYXMgKHNvdXJjZSwgdGFyZ2V0KSB7XG4gIHZhciBiaW5kaW5nID0gYmluZGluZ3Nbc291cmNlLmlkXTtcbiAgcmV0dXJuIGJpbmRpbmcgJiYgYmluZGluZ1t0YXJnZXQuaWRdO1xufVxuXG5mdW5jdGlvbiBpbnNlcnQgKHNvdXJjZSwgdGFyZ2V0KSB7XG4gIHZhciBiaW5kaW5nID0gYmluZGluZ3Nbc291cmNlLmlkXTtcbiAgaWYgKCFiaW5kaW5nKSB7XG4gICAgYmluZGluZyA9IGJpbmRpbmdzW3NvdXJjZS5pZF0gPSB7fTtcbiAgfVxuICB2YXIgaW52YWxpZGF0ZSA9IGludmFsaWRhdG9yKHRhcmdldCk7XG4gIGJpbmRpbmdbdGFyZ2V0LmlkXSA9IGludmFsaWRhdGU7XG4gIHNvdXJjZS5vbignZGF0YScsIGludmFsaWRhdGUpO1xuICBzb3VyY2Uub24oJ2Rlc3Ryb3llZCcsIHJlbW92ZS5iaW5kKG51bGwsIHNvdXJjZSwgdGFyZ2V0KSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAoc291cmNlLCB0YXJnZXQpIHtcbiAgdmFyIGJpbmRpbmcgPSBiaW5kaW5nc1tzb3VyY2UuaWRdO1xuICBpZiAoIWJpbmRpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGludmFsaWRhdGUgPSBiaW5kaW5nW3RhcmdldC5pZF07XG4gIHNvdXJjZS5vZmYoJ2RhdGEnLCBpbnZhbGlkYXRlKTtcbiAgZGVsZXRlIGJpbmRpbmdbdGFyZ2V0LmlkXTtcbn1cblxuZnVuY3Rpb24gaW52YWxpZGF0b3IgKHRhcmdldCkge1xuICByZXR1cm4gZnVuY3Rpb24gaW52YWxpZGF0ZSAoKSB7XG4gICAgdGFyZ2V0LnJlZnJlc2goKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYWRkIChzb3VyY2UsIHRhcmdldCkge1xuICBpZiAoaXNJbnB1dCh0YXJnZXQuYXNzb2NpYXRlZCkgfHwgaGFzKHNvdXJjZSwgdGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpbnNlcnQoc291cmNlLCB0YXJnZXQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGQsXG4gIHJlbW92ZTogcmVtb3ZlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgZW1pdHRlciA9IHJlcXVpcmUoJ2NvbnRyYS9lbWl0dGVyJyk7XG52YXIgZG9tID0gcmVxdWlyZSgnLi9kb20nKTtcbnZhciB0ZXh0ID0gcmVxdWlyZSgnLi90ZXh0Jyk7XG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG52YXIgY2xvbmUgPSByZXF1aXJlKCcuL2Nsb25lJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG52YXIgbW9tZW50dW0gPSByZXF1aXJlKCcuL21vbWVudHVtJyk7XG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vY2xhc3NlcycpO1xudmFyIG5vb3AgPSByZXF1aXJlKCcuL25vb3AnKTtcbnZhciBubztcblxuZnVuY3Rpb24gY2FsZW5kYXIgKGNhbGVuZGFyT3B0aW9ucykge1xuICB2YXIgbztcbiAgdmFyIHJlZjtcbiAgdmFyIHJlZkNhbDtcbiAgdmFyIGNvbnRhaW5lcjtcbiAgdmFyIHJlbmRlcmVkID0gZmFsc2U7XG5cbiAgLy8gZGF0ZSB2YXJpYWJsZXNcbiAgdmFyIG1vbnRoT2Zmc2V0QXR0cmlidXRlID0gJ2RhdGEtcm9tZS1vZmZzZXQnO1xuICB2YXIgd2Vla2RheXM7XG4gIHZhciB3ZWVrZGF5Q291bnQ7XG4gIHZhciBjYWxlbmRhck1vbnRocyA9IFtdO1xuICB2YXIgbGFzdFllYXI7XG4gIHZhciBsYXN0TW9udGg7XG4gIHZhciBsYXN0RGF5O1xuICB2YXIgbGFzdERheUVsZW1lbnQ7XG4gIHZhciBkYXRld3JhcHBlcjtcbiAgdmFyIGJhY2s7XG4gIHZhciBuZXh0O1xuXG4gIC8vIHRpbWUgdmFyaWFibGVzXG4gIHZhciBzZWNvbmRzSW5EYXkgPSA2MCAqIDYwICogMjQ7XG4gIHZhciB0aW1lO1xuICB2YXIgdGltZWxpc3Q7XG5cbiAgdmFyIGFwaSA9IGVtaXR0ZXIoe1xuICAgIGFzc29jaWF0ZWQ6IGNhbGVuZGFyT3B0aW9ucy5hc3NvY2lhdGVkXG4gIH0pO1xuXG4gIGluaXQoKTtcbiAgc2V0VGltZW91dChyZWFkeSwgMCk7XG5cbiAgcmV0dXJuIGFwaTtcblxuICBmdW5jdGlvbiBuYXBpICgpIHsgcmV0dXJuIGFwaTsgfVxuXG4gIGZ1bmN0aW9uIGluaXQgKGluaXRPcHRpb25zKSB7XG4gICAgbyA9IGRlZmF1bHRzKGluaXRPcHRpb25zIHx8IGNhbGVuZGFyT3B0aW9ucywgYXBpKTtcbiAgICBpZiAoIWNvbnRhaW5lcikgeyBjb250YWluZXIgPSBkb20oeyBjbGFzc05hbWU6IG8uc3R5bGVzLmNvbnRhaW5lciB9KTsgfVxuICAgIHdlZWtkYXlzID0gby53ZWVrZGF5Rm9ybWF0O1xuICAgIHdlZWtkYXlDb3VudCA9IHdlZWtkYXlzLmxlbmd0aDtcbiAgICBsYXN0TW9udGggPSBubztcbiAgICBsYXN0WWVhciA9IG5vO1xuICAgIGxhc3REYXkgPSBubztcbiAgICBsYXN0RGF5RWxlbWVudCA9IG5vO1xuICAgIG8uYXBwZW5kVG8uYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIHJlbW92ZUNoaWxkcmVuKGNvbnRhaW5lcik7XG4gICAgcmVuZGVyZWQgPSBmYWxzZTtcbiAgICByZWYgPSBvLmluaXRpYWxWYWx1ZSA/IG8uaW5pdGlhbFZhbHVlIDogbW9tZW50dW0ubW9tZW50KCk7XG4gICAgcmVmQ2FsID0gcmVmLmNsb25lKCk7XG5cbiAgICBhcGkuYmFjayA9IHN1YnRyYWN0TW9udGg7XG4gICAgYXBpLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICBhcGkuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgYXBpLmRlc3Ryb3kgPSBkZXN0cm95LmJpbmQoYXBpLCBmYWxzZSk7XG4gICAgYXBpLmVtaXRWYWx1ZXMgPSBlbWl0VmFsdWVzO1xuICAgIGFwaS5nZXREYXRlID0gZ2V0RGF0ZTtcbiAgICBhcGkuZ2V0RGF0ZVN0cmluZyA9IGdldERhdGVTdHJpbmc7XG4gICAgYXBpLmdldE1vbWVudCA9IGdldE1vbWVudDtcbiAgICBhcGkuaGlkZSA9IGhpZGU7XG4gICAgYXBpLm5leHQgPSBhZGRNb250aDtcbiAgICBhcGkub3B0aW9ucyA9IGNoYW5nZU9wdGlvbnM7XG4gICAgYXBpLm9wdGlvbnMucmVzZXQgPSByZXNldE9wdGlvbnM7XG4gICAgYXBpLnJlZnJlc2ggPSByZWZyZXNoO1xuICAgIGFwaS5yZXN0b3JlID0gbmFwaTtcbiAgICBhcGkuc2V0VmFsdWUgPSBzZXRWYWx1ZTtcbiAgICBhcGkuc2hvdyA9IHNob3c7XG5cbiAgICBldmVudExpc3RlbmluZygpO1xuICAgIHJlYWR5KCk7XG5cbiAgICByZXR1cm4gYXBpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZHkgKCkge1xuICAgIGFwaS5lbWl0KCdyZWFkeScsIGNsb25lKG8pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKHNpbGVudCkge1xuICAgIGlmIChjb250YWluZXIgJiYgY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgaWYgKG8pIHtcbiAgICAgIGV2ZW50TGlzdGVuaW5nKHRydWUpO1xuICAgIH1cblxuICAgIHZhciBkZXN0cm95ZWQgPSBhcGkuZW1pdHRlclNuYXBzaG90KCdkZXN0cm95ZWQnKTtcbiAgICBhcGkuYmFjayA9IG5vb3A7XG4gICAgYXBpLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgYXBpLmRlc3Ryb3kgPSBuYXBpO1xuICAgIGFwaS5lbWl0VmFsdWVzID0gbmFwaTtcbiAgICBhcGkuZ2V0RGF0ZSA9IG5vb3A7XG4gICAgYXBpLmdldERhdGVTdHJpbmcgPSBub29wO1xuICAgIGFwaS5nZXRNb21lbnQgPSBub29wO1xuICAgIGFwaS5oaWRlID0gbmFwaTtcbiAgICBhcGkubmV4dCA9IG5vb3A7XG4gICAgYXBpLm9wdGlvbnMgPSBuYXBpO1xuICAgIGFwaS5vcHRpb25zLnJlc2V0ID0gbmFwaTtcbiAgICBhcGkucmVmcmVzaCA9IG5hcGk7XG4gICAgYXBpLnJlc3RvcmUgPSBpbml0O1xuICAgIGFwaS5zZXRWYWx1ZSA9IG5hcGk7XG4gICAgYXBpLnNob3cgPSBuYXBpO1xuICAgIGFwaS5vZmYoKTtcblxuICAgIGlmIChzaWxlbnQgIT09IHRydWUpIHtcbiAgICAgIGRlc3Ryb3llZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBhcGk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudExpc3RlbmluZyAocmVtb3ZlKSB7XG4gICAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgICBpZiAoby5hdXRvSGlkZU9uQmx1cikgeyBjcm9zc3ZlbnRbb3BdKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ2ZvY3VzJywgaGlkZU9uQmx1ciwgdHJ1ZSk7IH1cbiAgICBpZiAoby5hdXRvSGlkZU9uQ2xpY2spIHsgY3Jvc3N2ZW50W29wXShkb2N1bWVudCwgJ2NsaWNrJywgaGlkZU9uQ2xpY2spOyB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuZ2VPcHRpb25zIChvcHRpb25zKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBjbG9uZShvKTtcbiAgICB9XG4gICAgZGVzdHJveSgpO1xuICAgIGluaXQob3B0aW9ucyk7XG4gICAgcmV0dXJuIGFwaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0T3B0aW9ucyAoKSB7XG4gICAgcmV0dXJuIGNoYW5nZU9wdGlvbnMoeyBhcHBlbmRUbzogby5hcHBlbmRUbyB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlciAoKSB7XG4gICAgaWYgKHJlbmRlcmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbmRlcmVkID0gdHJ1ZTtcbiAgICByZW5kZXJEYXRlcygpO1xuICAgIHJlbmRlclRpbWUoKTtcbiAgICBhcGkuZW1pdCgncmVuZGVyJyk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJEYXRlcyAoKSB7XG4gICAgaWYgKCFvLmRhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGk7XG4gICAgY2FsZW5kYXJNb250aHMgPSBbXTtcblxuICAgIGRhdGV3cmFwcGVyID0gZG9tKHsgY2xhc3NOYW1lOiBvLnN0eWxlcy5kYXRlLCBwYXJlbnQ6IGNvbnRhaW5lciB9KTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBvLm1vbnRoc0luQ2FsZW5kYXI7IGkrKykge1xuICAgICAgcmVuZGVyTW9udGgoaSk7XG4gICAgfVxuXG4gICAgY3Jvc3N2ZW50LmFkZChiYWNrLCAnY2xpY2snLCBzdWJ0cmFjdE1vbnRoKTtcbiAgICBjcm9zc3ZlbnQuYWRkKG5leHQsICdjbGljaycsIGFkZE1vbnRoKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGRhdGV3cmFwcGVyLCAnY2xpY2snLCBwaWNrRGF5KTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlck1vbnRoIChpKSB7XG4gICAgICB2YXIgbW9udGggPSBkb20oeyBjbGFzc05hbWU6IG8uc3R5bGVzLm1vbnRoLCBwYXJlbnQ6IGRhdGV3cmFwcGVyIH0pO1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgYmFjayA9IGRvbSh7IHR5cGU6ICdidXR0b24nLCBjbGFzc05hbWU6IG8uc3R5bGVzLmJhY2ssIGF0dHJpYnV0ZXM6IHsgdHlwZTogJ2J1dHRvbicgfSwgcGFyZW50OiBtb250aCB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChpID09PSBvLm1vbnRoc0luQ2FsZW5kYXIgLTEpIHtcbiAgICAgICAgbmV4dCA9IGRvbSh7IHR5cGU6ICdidXR0b24nLCBjbGFzc05hbWU6IG8uc3R5bGVzLm5leHQsIGF0dHJpYnV0ZXM6IHsgdHlwZTogJ2J1dHRvbicgfSwgcGFyZW50OiBtb250aCB9KTtcbiAgICAgIH1cbiAgICAgIHZhciBsYWJlbCA9IGRvbSh7IGNsYXNzTmFtZTogby5zdHlsZXMubW9udGhMYWJlbCwgcGFyZW50OiBtb250aCB9KTtcbiAgICAgIHZhciBkYXRlID0gZG9tKHsgdHlwZTogJ3RhYmxlJywgY2xhc3NOYW1lOiBvLnN0eWxlcy5kYXlUYWJsZSwgcGFyZW50OiBtb250aCB9KTtcbiAgICAgIHZhciBkYXRlaGVhZCA9IGRvbSh7IHR5cGU6ICd0aGVhZCcsIGNsYXNzTmFtZTogby5zdHlsZXMuZGF5SGVhZCwgcGFyZW50OiBkYXRlIH0pO1xuICAgICAgdmFyIGRhdGVoZWFkcm93ID0gZG9tKHsgdHlwZTogJ3RyJywgY2xhc3NOYW1lOiBvLnN0eWxlcy5kYXlSb3csIHBhcmVudDogZGF0ZWhlYWQgfSk7XG4gICAgICB2YXIgZGF0ZWJvZHkgPSBkb20oeyB0eXBlOiAndGJvZHknLCBjbGFzc05hbWU6IG8uc3R5bGVzLmRheUJvZHksIHBhcmVudDogZGF0ZSB9KTtcbiAgICAgIHZhciBqO1xuXG4gICAgICBmb3IgKGogPSAwOyBqIDwgd2Vla2RheUNvdW50OyBqKyspIHtcbiAgICAgICAgZG9tKHsgdHlwZTogJ3RoJywgY2xhc3NOYW1lOiBvLnN0eWxlcy5kYXlIZWFkRWxlbSwgcGFyZW50OiBkYXRlaGVhZHJvdywgdGV4dDogd2Vla2RheXNbd2Vla2RheShqKV0gfSk7XG4gICAgICB9XG5cbiAgICAgIGRhdGVib2R5LnNldEF0dHJpYnV0ZShtb250aE9mZnNldEF0dHJpYnV0ZSwgaSk7XG4gICAgICBjYWxlbmRhck1vbnRocy5wdXNoKHtcbiAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICBib2R5OiBkYXRlYm9keVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyVGltZSAoKSB7XG4gICAgaWYgKCFvLnRpbWUgfHwgIW8udGltZUludGVydmFsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1ld3JhcHBlciA9IGRvbSh7IGNsYXNzTmFtZTogby5zdHlsZXMudGltZSwgcGFyZW50OiBjb250YWluZXIgfSk7XG4gICAgdGltZSA9IGRvbSh7IGNsYXNzTmFtZTogby5zdHlsZXMuc2VsZWN0ZWRUaW1lLCBwYXJlbnQ6IHRpbWV3cmFwcGVyLCB0ZXh0OiByZWYuZm9ybWF0KG8udGltZUZvcm1hdCkgfSk7XG4gICAgY3Jvc3N2ZW50LmFkZCh0aW1lLCAnY2xpY2snLCB0b2dnbGVUaW1lTGlzdCk7XG4gICAgdGltZWxpc3QgPSBkb20oeyBjbGFzc05hbWU6IG8uc3R5bGVzLnRpbWVMaXN0LCBwYXJlbnQ6IHRpbWV3cmFwcGVyIH0pO1xuICAgIGNyb3NzdmVudC5hZGQodGltZWxpc3QsICdjbGljaycsIHBpY2tUaW1lKTtcbiAgICB2YXIgbmV4dCA9IG1vbWVudHVtLm1vbWVudCgnMDA6MDA6MDAnLCAnSEg6bW06c3MnKTtcbiAgICB2YXIgbGF0ZXN0ID0gbmV4dC5jbG9uZSgpLmFkZCgxLCAnZGF5cycpO1xuICAgIHdoaWxlIChuZXh0LmlzQmVmb3JlKGxhdGVzdCkpIHtcbiAgICAgIGRvbSh7IGNsYXNzTmFtZTogby5zdHlsZXMudGltZU9wdGlvbiwgcGFyZW50OiB0aW1lbGlzdCwgdGV4dDogbmV4dC5mb3JtYXQoby50aW1lRm9ybWF0KSB9KTtcbiAgICAgIG5leHQuYWRkKG8udGltZUludGVydmFsLCAnc2Vjb25kcycpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdlZWtkYXkgKGluZGV4LCBiYWNrd2FyZHMpIHtcbiAgICB2YXIgZmFjdG9yID0gYmFja3dhcmRzID8gLTEgOiAxO1xuICAgIHZhciBvZmZzZXQgPSBpbmRleCArIG8ud2Vla1N0YXJ0ICogZmFjdG9yO1xuICAgIGlmIChvZmZzZXQgPj0gd2Vla2RheUNvdW50IHx8IG9mZnNldCA8IDApIHtcbiAgICAgIG9mZnNldCArPSB3ZWVrZGF5Q291bnQgKiAtZmFjdG9yO1xuICAgIH1cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheVZhbGlkVGltZXNPbmx5ICgpIHtcbiAgICBpZiAoIW8udGltZSB8fCAhcmVuZGVyZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVzID0gdGltZWxpc3QuY2hpbGRyZW47XG4gICAgdmFyIGxlbmd0aCA9IHRpbWVzLmxlbmd0aDtcbiAgICB2YXIgZGF0ZTtcbiAgICB2YXIgdGltZTtcbiAgICB2YXIgaXRlbTtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGl0ZW0gPSB0aW1lc1tpXTtcbiAgICAgIHRpbWUgPSBtb21lbnR1bS5tb21lbnQodGV4dChpdGVtKSwgby50aW1lRm9ybWF0KTtcbiAgICAgIGRhdGUgPSBzZXRUaW1lKHJlZi5jbG9uZSgpLCB0aW1lKTtcbiAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9IGlzSW5SYW5nZShkYXRlLCBmYWxzZSwgby50aW1lVmFsaWRhdG9yKSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlVGltZUxpc3QgKHNob3cpIHtcbiAgICB2YXIgZGlzcGxheSA9IHR5cGVvZiBzaG93ID09PSAnYm9vbGVhbicgPyBzaG93IDogdGltZWxpc3Quc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnO1xuICAgIGlmIChkaXNwbGF5KSB7XG4gICAgICBzaG93VGltZUxpc3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZVRpbWVMaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1RpbWVMaXN0ICgpIHsgaWYgKHRpbWVsaXN0KSB7IHRpbWVsaXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOyB9IH1cbiAgZnVuY3Rpb24gaGlkZVRpbWVMaXN0ICgpIHsgaWYgKHRpbWVsaXN0KSB7IHRpbWVsaXN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IH0gfVxuICBmdW5jdGlvbiBzaG93Q2FsZW5kYXIgKCkgeyBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snOyBhcGkuZW1pdCgnc2hvdycpOyB9XG4gIGZ1bmN0aW9uIGhpZGVDYWxlbmRhciAoKSB7XG4gICAgaWYgKGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgYXBpLmVtaXQoJ2hpZGUnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93ICgpIHtcbiAgICByZW5kZXIoKTtcbiAgICByZWZyZXNoKCk7XG4gICAgdG9nZ2xlVGltZUxpc3QoIW8uZGF0ZSk7XG4gICAgc2hvd0NhbGVuZGFyKCk7XG4gICAgcmV0dXJuIGFwaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGUgKCkge1xuICAgIGhpZGVUaW1lTGlzdCgpO1xuICAgIHNldFRpbWVvdXQoaGlkZUNhbGVuZGFyLCAwKTtcbiAgICByZXR1cm4gYXBpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZUNvbmRpdGlvbmFsbHkgKCkge1xuICAgIGhpZGVUaW1lTGlzdCgpO1xuXG4gICAgdmFyIHBvcyA9IGNsYXNzZXMuY29udGFpbnMoY29udGFpbmVyLCBvLnN0eWxlcy5wb3NpdGlvbmVkKTtcbiAgICBpZiAocG9zKSB7XG4gICAgICBzZXRUaW1lb3V0KGhpZGVDYWxlbmRhciwgMCk7XG4gICAgfVxuICAgIHJldHVybiBhcGk7XG4gIH1cblxuICBmdW5jdGlvbiBjYWxlbmRhckV2ZW50VGFyZ2V0IChlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQgPT09IGFwaS5hc3NvY2lhdGVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgd2hpbGUgKHRhcmdldCkge1xuICAgICAgaWYgKHRhcmdldCA9PT0gY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZU9uQmx1ciAoZSkge1xuICAgIGlmIChjYWxlbmRhckV2ZW50VGFyZ2V0KGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhpZGVDb25kaXRpb25hbGx5KCk7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlT25DbGljayAoZSkge1xuICAgIGlmIChjYWxlbmRhckV2ZW50VGFyZ2V0KGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhpZGVDb25kaXRpb25hbGx5KCk7XG4gIH1cblxuICBmdW5jdGlvbiBzdWJ0cmFjdE1vbnRoICgpIHsgY2hhbmdlTW9udGgoJ3N1YnRyYWN0Jyk7IH1cbiAgZnVuY3Rpb24gYWRkTW9udGggKCkgeyBjaGFuZ2VNb250aCgnYWRkJyk7IH1cbiAgZnVuY3Rpb24gY2hhbmdlTW9udGggKG9wKSB7XG4gICAgdmFyIGJvdW5kO1xuICAgIHZhciBkaXJlY3Rpb24gPSBvcCA9PT0gJ2FkZCcgPyAtMSA6IDE7XG4gICAgdmFyIG9mZnNldCA9IG8ubW9udGhzSW5DYWxlbmRhciArIGRpcmVjdGlvbiAqIGdldE1vbnRoT2Zmc2V0KGxhc3REYXlFbGVtZW50KTtcbiAgICByZWZDYWxbb3BdKG9mZnNldCwgJ21vbnRocycpO1xuICAgIGJvdW5kID0gaW5SYW5nZShyZWZDYWwuY2xvbmUoKSk7XG4gICAgcmVmID0gYm91bmQgfHwgcmVmO1xuICAgIGlmIChib3VuZCkgeyByZWZDYWwgPSBib3VuZC5jbG9uZSgpOyB9XG4gICAgdXBkYXRlKCk7XG4gICAgYXBpLmVtaXQob3AgPT09ICdhZGQnID8gJ25leHQnIDogJ2JhY2snLCByZWYubW9udGgoKSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKHNpbGVudCkge1xuICAgIHVwZGF0ZUNhbGVuZGFyKCk7XG4gICAgdXBkYXRlVGltZSgpO1xuICAgIGlmIChzaWxlbnQgIT09IHRydWUpIHsgZW1pdFZhbHVlcygpOyB9XG4gICAgZGlzcGxheVZhbGlkVGltZXNPbmx5KCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDYWxlbmRhciAoKSB7XG4gICAgaWYgKCFvLmRhdGUgfHwgIXJlbmRlcmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB5ID0gcmVmQ2FsLnllYXIoKTtcbiAgICB2YXIgbSA9IHJlZkNhbC5tb250aCgpO1xuICAgIHZhciBkID0gcmVmQ2FsLmRhdGUoKTtcbiAgICBpZiAoZCA9PT0gbGFzdERheSAmJiBtID09PSBsYXN0TW9udGggJiYgeSA9PT0gbGFzdFllYXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNhblN0YXkgPSBpc0Rpc3BsYXllZCgpO1xuICAgIGxhc3REYXkgPSByZWZDYWwuZGF0ZSgpO1xuICAgIGxhc3RNb250aCA9IHJlZkNhbC5tb250aCgpO1xuICAgIGxhc3RZZWFyID0gcmVmQ2FsLnllYXIoKTtcbiAgICBpZiAoY2FuU3RheSkgeyB1cGRhdGVDYWxlbmRhclNlbGVjdGlvbigpOyByZXR1cm47IH1cbiAgICBjYWxlbmRhck1vbnRocy5mb3JFYWNoKHVwZGF0ZU1vbnRoKTtcbiAgICByZW5kZXJBbGxEYXlzKCk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNb250aCAobW9udGgsIGkpIHtcbiAgICAgIHZhciBvZmZzZXRDYWwgPSByZWZDYWwuY2xvbmUoKS5hZGQoaSwgJ21vbnRocycpO1xuICAgICAgdGV4dChtb250aC5sYWJlbCwgb2Zmc2V0Q2FsLmZvcm1hdChvLm1vbnRoRm9ybWF0KSk7XG4gICAgICByZW1vdmVDaGlsZHJlbihtb250aC5ib2R5KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDYWxlbmRhclNlbGVjdGlvbiAoKSB7XG4gICAgdmFyIGRheSA9IHJlZkNhbC5kYXRlKCkgLSAxO1xuICAgIHNlbGVjdERheUVsZW1lbnQoZmFsc2UpO1xuICAgIGNhbGVuZGFyTW9udGhzLmZvckVhY2goZnVuY3Rpb24gKGNhbCkge1xuICAgICAgdmFyIGRheXM7XG4gICAgICBpZiAoc2FtZUNhbGVuZGFyTW9udGgoY2FsLmRhdGUsIHJlZkNhbCkpIHtcbiAgICAgICAgZGF5cyA9IGNhc3QoY2FsLmJvZHkuY2hpbGRyZW4pLm1hcChhZ2dyZWdhdGUpO1xuICAgICAgICBkYXlzID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgZGF5cykuZmlsdGVyKGluc2lkZSk7XG4gICAgICAgIHNlbGVjdERheUVsZW1lbnQoZGF5c1tkYXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNhc3QgKGxpa2UpIHtcbiAgICAgIHZhciBkZXN0ID0gW107XG4gICAgICB2YXIgaTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsaWtlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlc3QucHVzaChsaWtlW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZXN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFnZ3JlZ2F0ZSAoY2hpbGQpIHtcbiAgICAgIHJldHVybiBjYXN0KGNoaWxkLmNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNpZGUgKGNoaWxkKSB7XG4gICAgICByZXR1cm4gIWNsYXNzZXMuY29udGFpbnMoY2hpbGQsIG8uc3R5bGVzLmRheVByZXZNb250aCkgJiZcbiAgICAgICAgICAgICAhY2xhc3Nlcy5jb250YWlucyhjaGlsZCwgby5zdHlsZXMuZGF5TmV4dE1vbnRoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc0Rpc3BsYXllZCAoKSB7XG4gICAgcmV0dXJuIGNhbGVuZGFyTW9udGhzLnNvbWUobWF0Y2hlcyk7XG5cbiAgICBmdW5jdGlvbiBtYXRjaGVzIChjYWwpIHtcbiAgICAgIGlmICghbGFzdFllYXIpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICByZXR1cm4gc2FtZUNhbGVuZGFyTW9udGgoY2FsLmRhdGUsIHJlZkNhbCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2FtZUNhbGVuZGFyTW9udGggKGxlZnQsIHJpZ2h0KSB7XG4gICAgcmV0dXJuIGxlZnQgJiYgcmlnaHQgJiYgbGVmdC55ZWFyKCkgPT09IHJpZ2h0LnllYXIoKSAmJiBsZWZ0Lm1vbnRoKCkgPT09IHJpZ2h0Lm1vbnRoKCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVUaW1lICgpIHtcbiAgICBpZiAoIW8udGltZSB8fCAhcmVuZGVyZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGV4dCh0aW1lLCByZWYuZm9ybWF0KG8udGltZUZvcm1hdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZW1pdFZhbHVlcyAoKSB7XG4gICAgYXBpLmVtaXQoJ2RhdGEnLCBnZXREYXRlU3RyaW5nKCkpO1xuICAgIGFwaS5lbWl0KCd5ZWFyJywgcmVmLnllYXIoKSk7XG4gICAgYXBpLmVtaXQoJ21vbnRoJywgcmVmLm1vbnRoKCkpO1xuICAgIGFwaS5lbWl0KCdkYXknLCByZWYuZGF5KCkpO1xuICAgIGFwaS5lbWl0KCd0aW1lJywgcmVmLmZvcm1hdChvLnRpbWVGb3JtYXQpKTtcbiAgICByZXR1cm4gYXBpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAoKSB7XG4gICAgbGFzdFllYXIgPSBmYWxzZTtcbiAgICBsYXN0TW9udGggPSBmYWxzZTtcbiAgICBsYXN0RGF5ID0gZmFsc2U7XG4gICAgdXBkYXRlKHRydWUpO1xuICAgIHJldHVybiBhcGk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRWYWx1ZSAodmFsdWUpIHtcbiAgICB2YXIgZGF0ZSA9IHBhcnNlKHZhbHVlLCBvLmlucHV0Rm9ybWF0KTtcbiAgICBpZiAoZGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZWYgPSBpblJhbmdlKGRhdGUpIHx8IHJlZjtcbiAgICByZWZDYWwgPSByZWYuY2xvbmUoKTtcbiAgICB1cGRhdGUodHJ1ZSk7XG5cbiAgICByZXR1cm4gYXBpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4gKGVsZW0sIHNlbGYpIHtcbiAgICB3aGlsZSAoZWxlbSAmJiBlbGVtLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGVsZW0ucmVtb3ZlQ2hpbGQoZWxlbS5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgaWYgKHNlbGYgPT09IHRydWUpIHtcbiAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJBbGxEYXlzICgpIHtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgby5tb250aHNJbkNhbGVuZGFyOyBpKyspIHtcbiAgICAgIHJlbmRlckRheXMoaSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRGF5cyAob2Zmc2V0KSB7XG4gICAgdmFyIG1vbnRoID0gY2FsZW5kYXJNb250aHNbb2Zmc2V0XTtcbiAgICB2YXIgb2Zmc2V0Q2FsID0gcmVmQ2FsLmNsb25lKCkuYWRkKG9mZnNldCwgJ21vbnRocycpO1xuICAgIHZhciB0b3RhbCA9IG9mZnNldENhbC5kYXlzSW5Nb250aCgpO1xuICAgIHZhciBjdXJyZW50ID0gb2Zmc2V0Q2FsLm1vbnRoKCkgIT09IHJlZi5tb250aCgpID8gLTEgOiByZWYuZGF0ZSgpOyAvLyAtMSA6IDEuLjMxXG4gICAgdmFyIGZpcnN0ID0gb2Zmc2V0Q2FsLmNsb25lKCkuZGF0ZSgxKTtcbiAgICB2YXIgZmlyc3REYXkgPSB3ZWVrZGF5KGZpcnN0LmRheSgpLCB0cnVlKTsgLy8gMC4uNlxuICAgIHZhciB0ciA9IGRvbSh7IHR5cGU6ICd0cicsIGNsYXNzTmFtZTogby5zdHlsZXMuZGF5Um93LCBwYXJlbnQ6IG1vbnRoLmJvZHkgfSk7XG4gICAgdmFyIHByZXZNb250aCA9IGhpZGRlbldoZW4ob2Zmc2V0ICE9PSAwLCBbby5zdHlsZXMuZGF5Qm9keUVsZW0sIG8uc3R5bGVzLmRheVByZXZNb250aF0pO1xuICAgIHZhciBuZXh0TW9udGggPSBoaWRkZW5XaGVuKG9mZnNldCAhPT0gby5tb250aHNJbkNhbGVuZGFyIC0gMSwgW28uc3R5bGVzLmRheUJvZHlFbGVtLCBvLnN0eWxlcy5kYXlOZXh0TW9udGhdKTtcbiAgICB2YXIgZGlzYWJsZWQgPSBvLnN0eWxlcy5kYXlEaXNhYmxlZDtcbiAgICB2YXIgbGFzdERheTtcblxuICAgIHBhcnQoe1xuICAgICAgYmFzZTogZmlyc3QuY2xvbmUoKS5zdWJ0cmFjdChmaXJzdERheSwgJ2RheXMnKSxcbiAgICAgIGxlbmd0aDogZmlyc3REYXksXG4gICAgICBjZWxsOiBwcmV2TW9udGhcbiAgICB9KTtcblxuICAgIHBhcnQoe1xuICAgICAgYmFzZTogZmlyc3QuY2xvbmUoKSxcbiAgICAgIGxlbmd0aDogdG90YWwsXG4gICAgICBjZWxsOiBbby5zdHlsZXMuZGF5Qm9keUVsZW1dLFxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgbGFzdERheSA9IGZpcnN0LmNsb25lKCkuYWRkKHRvdGFsLCAnZGF5cycpO1xuXG4gICAgcGFydCh7XG4gICAgICBiYXNlOiBsYXN0RGF5LFxuICAgICAgbGVuZ3RoOiB3ZWVrZGF5Q291bnQgLSB0ci5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICBjZWxsOiBuZXh0TW9udGhcbiAgICB9KTtcblxuICAgIGJhY2suZGlzYWJsZWQgPSAhaXNJblJhbmdlTGVmdChmaXJzdCwgdHJ1ZSk7XG4gICAgbmV4dC5kaXNhYmxlZCA9ICFpc0luUmFuZ2VSaWdodChsYXN0RGF5LCB0cnVlKTtcbiAgICBtb250aC5kYXRlID0gb2Zmc2V0Q2FsLmNsb25lKCk7XG5cbiAgICBmdW5jdGlvbiBwYXJ0IChkYXRhKSB7XG4gICAgICB2YXIgaSwgZGF5LCBub2RlO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRyLmNoaWxkcmVuLmxlbmd0aCA9PT0gd2Vla2RheUNvdW50KSB7XG4gICAgICAgICAgdHIgPSBkb20oeyB0eXBlOiAndHInLCBjbGFzc05hbWU6IG8uc3R5bGVzLmRheVJvdywgcGFyZW50OiBtb250aC5ib2R5IH0pO1xuICAgICAgICB9XG4gICAgICAgIGRheSA9IGRhdGEuYmFzZS5jbG9uZSgpLmFkZChpLCAnZGF5cycpO1xuICAgICAgICBub2RlID0gZG9tKHtcbiAgICAgICAgICB0eXBlOiAndGQnLFxuICAgICAgICAgIHBhcmVudDogdHIsXG4gICAgICAgICAgdGV4dDogZGF5LmZvcm1hdChvLmRheUZvcm1hdCksXG4gICAgICAgICAgY2xhc3NOYW1lOiB2YWxpZGF0aW9uVGVzdChkYXksIGRhdGEuY2VsbC5qb2luKCcgJykuc3BsaXQoJyAnKSkuam9pbignICcpXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGF0YS5zZWxlY3RhYmxlICYmIGRheS5kYXRlKCkgPT09IGN1cnJlbnQpIHtcbiAgICAgICAgICBzZWxlY3REYXlFbGVtZW50KG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGlvblRlc3QgKGRheSwgY2VsbCkge1xuICAgICAgaWYgKCFpc0luUmFuZ2UoZGF5LCB0cnVlLCBvLmRhdGVWYWxpZGF0b3IpKSB7IGNlbGwucHVzaChkaXNhYmxlZCk7IH1cbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhpZGRlbldoZW4gKHZhbHVlLCBjZWxsKSB7XG4gICAgICBpZiAodmFsdWUpIHsgY2VsbC5wdXNoKG8uc3R5bGVzLmRheUNvbmNlYWxlZCk7IH1cbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSW5SYW5nZSAoZGF0ZSwgYWxsZGF5LCB2YWxpZGF0b3IpIHtcbiAgICBpZiAoIWlzSW5SYW5nZUxlZnQoZGF0ZSwgYWxsZGF5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWlzSW5SYW5nZVJpZ2h0KGRhdGUsIGFsbGRheSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHZhbGlkID0gKHZhbGlkYXRvciB8fCBGdW5jdGlvbi5wcm90b3R5cGUpLmNhbGwoYXBpLCBkYXRlLnRvRGF0ZSgpKTtcbiAgICByZXR1cm4gdmFsaWQgIT09IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNJblJhbmdlTGVmdCAoZGF0ZSwgYWxsZGF5KSB7XG4gICAgdmFyIG1pbiA9ICFvLm1pbiA/IGZhbHNlIDogKGFsbGRheSA/IG8ubWluLmNsb25lKCkuc3RhcnRPZignZGF5JykgOiBvLm1pbik7XG4gICAgcmV0dXJuICFtaW4gfHwgIWRhdGUuaXNCZWZvcmUobWluKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSW5SYW5nZVJpZ2h0IChkYXRlLCBhbGxkYXkpIHtcbiAgICB2YXIgbWF4ID0gIW8ubWF4ID8gZmFsc2UgOiAoYWxsZGF5ID8gby5tYXguY2xvbmUoKS5lbmRPZignZGF5JykgOiBvLm1heCk7XG4gICAgcmV0dXJuICFtYXggfHwgIWRhdGUuaXNBZnRlcihtYXgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5SYW5nZSAoZGF0ZSkge1xuICAgIGlmIChvLm1pbiAmJiBkYXRlLmlzQmVmb3JlKG8ubWluKSkge1xuICAgICAgcmV0dXJuIGluUmFuZ2Uoby5taW4uY2xvbmUoKSk7XG4gICAgfSBlbHNlIGlmIChvLm1heCAmJiBkYXRlLmlzQWZ0ZXIoby5tYXgpKSB7XG4gICAgICByZXR1cm4gaW5SYW5nZShvLm1heC5jbG9uZSgpKTtcbiAgICB9XG4gICAgdmFyIHZhbHVlID0gZGF0ZS5jbG9uZSgpLnN1YnRyYWN0KDEsICdkYXlzJyk7XG4gICAgaWYgKHZhbGlkYXRlVG93YXJkcyh2YWx1ZSwgZGF0ZSwgJ2FkZCcpKSB7XG4gICAgICByZXR1cm4gaW5UaW1lUmFuZ2UodmFsdWUpO1xuICAgIH1cbiAgICB2YWx1ZSA9IGRhdGUuY2xvbmUoKTtcbiAgICBpZiAodmFsaWRhdGVUb3dhcmRzKHZhbHVlLCBkYXRlLCAnc3VidHJhY3QnKSkge1xuICAgICAgcmV0dXJuIGluVGltZVJhbmdlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpblRpbWVSYW5nZSAodmFsdWUpIHtcbiAgICB2YXIgY29weSA9IHZhbHVlLmNsb25lKCkuc3VidHJhY3Qoby50aW1lSW50ZXJ2YWwsICdzZWNvbmRzJyk7XG4gICAgdmFyIHRpbWVzID0gTWF0aC5jZWlsKHNlY29uZHNJbkRheSAvIG8udGltZUludGVydmFsKTtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xuICAgICAgY29weS5hZGQoby50aW1lSW50ZXJ2YWwsICdzZWNvbmRzJyk7XG4gICAgICBpZiAoY29weS5kYXRlKCkgPiB2YWx1ZS5kYXRlKCkpIHtcbiAgICAgICAgY29weS5zdWJ0cmFjdCgxLCAnZGF5cycpO1xuICAgICAgfVxuICAgICAgaWYgKG8udGltZVZhbGlkYXRvci5jYWxsKGFwaSwgY29weS50b0RhdGUoKSkgIT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlVG93YXJkcyAodmFsdWUsIGRhdGUsIG9wKSB7XG4gICAgdmFyIHZhbGlkID0gZmFsc2U7XG4gICAgd2hpbGUgKHZhbGlkID09PSBmYWxzZSkge1xuICAgICAgdmFsdWVbb3BdKDEsICdkYXlzJyk7XG4gICAgICBpZiAodmFsdWUubW9udGgoKSAhPT0gZGF0ZS5tb250aCgpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdmFsaWQgPSBvLmRhdGVWYWxpZGF0b3IuY2FsbChhcGksIHZhbHVlLnRvRGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkICE9PSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBpY2tEYXkgKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKGNsYXNzZXMuY29udGFpbnModGFyZ2V0LCBvLnN0eWxlcy5kYXlEaXNhYmxlZCkgfHwgIWNsYXNzZXMuY29udGFpbnModGFyZ2V0LCBvLnN0eWxlcy5kYXlCb2R5RWxlbSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGRheSA9IHBhcnNlSW50KHRleHQodGFyZ2V0KSwgMTApO1xuICAgIHZhciBwcmV2ID0gY2xhc3Nlcy5jb250YWlucyh0YXJnZXQsIG8uc3R5bGVzLmRheVByZXZNb250aCk7XG4gICAgdmFyIG5leHQgPSBjbGFzc2VzLmNvbnRhaW5zKHRhcmdldCwgby5zdHlsZXMuZGF5TmV4dE1vbnRoKTtcbiAgICB2YXIgb2Zmc2V0ID0gZ2V0TW9udGhPZmZzZXQodGFyZ2V0KSAtIGdldE1vbnRoT2Zmc2V0KGxhc3REYXlFbGVtZW50KTtcbiAgICByZWYuYWRkKG9mZnNldCwgJ21vbnRocycpO1xuICAgIGlmIChwcmV2IHx8IG5leHQpIHtcbiAgICAgIHJlZi5hZGQocHJldiA/IC0xIDogMSwgJ21vbnRocycpO1xuICAgIH1cbiAgICBzZWxlY3REYXlFbGVtZW50KHRhcmdldCk7XG4gICAgcmVmLmRhdGUoZGF5KTsgLy8gbXVzdCBydW4gYWZ0ZXIgc2V0dGluZyB0aGUgbW9udGhcbiAgICBzZXRUaW1lKHJlZiwgaW5SYW5nZShyZWYpIHx8IHJlZik7XG4gICAgcmVmQ2FsID0gcmVmLmNsb25lKCk7XG4gICAgaWYgKG8uYXV0b0Nsb3NlID09PSB0cnVlKSB7IGhpZGVDb25kaXRpb25hbGx5KCk7IH1cbiAgICB1cGRhdGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdERheUVsZW1lbnQgKG5vZGUpIHtcbiAgICBpZiAobGFzdERheUVsZW1lbnQpIHtcbiAgICAgIGNsYXNzZXMucmVtb3ZlKGxhc3REYXlFbGVtZW50LCBvLnN0eWxlcy5zZWxlY3RlZERheSk7XG4gICAgfVxuICAgIGlmIChub2RlKSB7XG4gICAgICBjbGFzc2VzLmFkZChub2RlLCBvLnN0eWxlcy5zZWxlY3RlZERheSk7XG4gICAgfVxuICAgIGxhc3REYXlFbGVtZW50ID0gbm9kZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1vbnRoT2Zmc2V0IChlbGVtKSB7XG4gICAgdmFyIG9mZnNldDtcbiAgICB3aGlsZSAoZWxlbSAmJiBlbGVtLmdldEF0dHJpYnV0ZSkge1xuICAgICAgb2Zmc2V0ID0gZWxlbS5nZXRBdHRyaWJ1dGUobW9udGhPZmZzZXRBdHRyaWJ1dGUpO1xuICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChvZmZzZXQsIDEwKTtcbiAgICAgIH1cbiAgICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0VGltZSAodG8sIGZyb20pIHtcbiAgICB0by5ob3VyKGZyb20uaG91cigpKS5taW51dGUoZnJvbS5taW51dGUoKSkuc2Vjb25kKGZyb20uc2Vjb25kKCkpO1xuICAgIHJldHVybiB0bztcbiAgfVxuXG4gIGZ1bmN0aW9uIHBpY2tUaW1lIChlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICghY2xhc3Nlcy5jb250YWlucyh0YXJnZXQsIG8uc3R5bGVzLnRpbWVPcHRpb24pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB2YWx1ZSA9IG1vbWVudHVtLm1vbWVudCh0ZXh0KHRhcmdldCksIG8udGltZUZvcm1hdCk7XG4gICAgc2V0VGltZShyZWYsIHZhbHVlKTtcbiAgICByZWZDYWwgPSByZWYuY2xvbmUoKTtcbiAgICBlbWl0VmFsdWVzKCk7XG4gICAgdXBkYXRlVGltZSgpO1xuICAgIGlmICgoIW8uZGF0ZSAmJiBvLmF1dG9DbG9zZSA9PT0gdHJ1ZSkgfHwgby5hdXRvQ2xvc2UgPT09ICd0aW1lJykge1xuICAgICAgaGlkZUNvbmRpdGlvbmFsbHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZVRpbWVMaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGF0ZSAoKSB7XG4gICAgcmV0dXJuIHJlZi50b0RhdGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERhdGVTdHJpbmcgKGZvcm1hdCkge1xuICAgIHJldHVybiByZWYuZm9ybWF0KGZvcm1hdCB8fCBvLmlucHV0Rm9ybWF0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1vbWVudCAoKSB7XG4gICAgcmV0dXJuIHJlZi5jbG9uZSgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FsZW5kYXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0cmltID0gL15cXHMrfFxccyskL2c7XG52YXIgd2hpdGVzcGFjZSA9IC9cXHMrLztcblxuZnVuY3Rpb24gY2xhc3NlcyAobm9kZSkge1xuICByZXR1cm4gbm9kZS5jbGFzc05hbWUucmVwbGFjZSh0cmltLCAnJykuc3BsaXQod2hpdGVzcGFjZSk7XG59XG5cbmZ1bmN0aW9uIHNldCAobm9kZSwgdmFsdWUpIHtcbiAgbm9kZS5jbGFzc05hbWUgPSB2YWx1ZS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIGFkZCAobm9kZSwgdmFsdWUpIHtcbiAgdmFyIHZhbHVlcyA9IHJlbW92ZShub2RlLCB2YWx1ZSk7XG4gIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgc2V0KG5vZGUsIHZhbHVlcyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAobm9kZSwgdmFsdWUpIHtcbiAgdmFyIHZhbHVlcyA9IGNsYXNzZXMobm9kZSk7XG4gIHZhciBpID0gdmFsdWVzLmluZGV4T2YodmFsdWUpO1xuICBpZiAoaSAhPT0gLTEpIHtcbiAgICB2YWx1ZXMuc3BsaWNlKGksIDEpO1xuICAgIHNldChub2RlLCB2YWx1ZXMpO1xuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5zIChub2RlLCB2YWx1ZSkge1xuICByZXR1cm4gY2xhc3Nlcyhub2RlKS5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZCxcbiAgcmVtb3ZlOiByZW1vdmUsXG4gIGNvbnRhaW5zOiBjb250YWluc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1vbWVudHVtID0gcmVxdWlyZSgnLi9tb21lbnR1bScpO1xuXG4vLyBuYcOvdmUgaW1wbGVtZW50YXRpb24sIHNwZWNpZmljYWxseSBtZWFudCB0byBjbG9uZSBgb3B0aW9uc2Agb2JqZWN0c1xuZnVuY3Rpb24gY2xvbmUgKHRoaW5nKSB7XG4gIHZhciBjb3B5ID0ge307XG4gIHZhciB2YWx1ZTtcblxuICBmb3IgKHZhciBrZXkgaW4gdGhpbmcpIHtcbiAgICB2YWx1ZSA9IHRoaW5nW2tleV07XG5cbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICBjb3B5W2tleV0gPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKG1vbWVudHVtLmlzTW9tZW50KHZhbHVlKSkge1xuICAgICAgY29weVtrZXldID0gdmFsdWUuY2xvbmUoKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlLl9pc1N0eWxlc0NvbmZpZ3VyYXRpb24pIHtcbiAgICAgIGNvcHlba2V5XSA9IGNsb25lKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29weVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvcHk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbmRleCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcbnZhciBpbnB1dCA9IHJlcXVpcmUoJy4vaW5wdXQnKTtcbnZhciBpbmxpbmUgPSByZXF1aXJlKCcuL2lubGluZScpO1xudmFyIGlzSW5wdXQgPSByZXF1aXJlKCcuL2lzSW5wdXQnKTtcblxuZnVuY3Rpb24gY29yZSAoZWxlbSwgb3B0aW9ucykge1xuICB2YXIgY2FsO1xuICB2YXIgZXhpc3RpbmcgPSBpbmRleC5maW5kKGVsZW0pO1xuICBpZiAoZXhpc3RpbmcpIHtcbiAgICByZXR1cm4gZXhpc3Rpbmc7XG4gIH1cblxuICBpZiAoaXNJbnB1dChlbGVtKSkge1xuICAgIGNhbCA9IGlucHV0KGVsZW0sIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIGNhbCA9IGlubGluZShlbGVtLCBvcHRpb25zKTtcbiAgfVxuICBpbmRleC5hc3NpZ24oZWxlbSwgY2FsKTtcblxuICByZXR1cm4gY2FsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKTtcbnZhciBpc0lucHV0ID0gcmVxdWlyZSgnLi9pc0lucHV0Jyk7XG52YXIgbW9tZW50dW0gPSByZXF1aXJlKCcuL21vbWVudHVtJyk7XG5cbmZ1bmN0aW9uIGRlZmF1bHRzIChvcHRpb25zLCBjYWwpIHtcbiAgdmFyIHRlbXA7XG4gIHZhciBubztcbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuICBpZiAoby5hdXRvSGlkZU9uQ2xpY2sgPT09IG5vKSB7IG8uYXV0b0hpZGVPbkNsaWNrID0gdHJ1ZTsgfVxuICBpZiAoby5hdXRvSGlkZU9uQmx1ciA9PT0gbm8pIHsgby5hdXRvSGlkZU9uQmx1ciA9IHRydWU7IH1cbiAgaWYgKG8uYXV0b0Nsb3NlID09PSBubykgeyBvLmF1dG9DbG9zZSA9IHRydWU7IH1cbiAgaWYgKG8uYXBwZW5kVG8gPT09IG5vKSB7IG8uYXBwZW5kVG8gPSBkb2N1bWVudC5ib2R5OyB9XG4gIGlmIChvLmFwcGVuZFRvID09PSAncGFyZW50Jykge1xuICAgIGlmIChpc0lucHV0KGNhbC5hc3NvY2lhdGVkKSkge1xuICAgICAgby5hcHBlbmRUbyA9IGNhbC5hc3NvY2lhdGVkLnBhcmVudE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5saW5lIGNhbGVuZGFycyBtdXN0IGJlIGFwcGVuZGVkIHRvIGEgcGFyZW50IG5vZGUgZXhwbGljaXRseS4nKTtcbiAgICB9XG4gIH1cbiAgaWYgKG8uaW52YWxpZGF0ZSA9PT0gbm8pIHsgby5pbnZhbGlkYXRlID0gdHJ1ZTsgfVxuICBpZiAoby5yZXF1aXJlZCA9PT0gbm8pIHsgby5yZXF1aXJlZCA9IGZhbHNlOyB9XG4gIGlmIChvLmRhdGUgPT09IG5vKSB7IG8uZGF0ZSA9IHRydWU7IH1cbiAgaWYgKG8udGltZSA9PT0gbm8pIHsgby50aW1lID0gdHJ1ZTsgfVxuICBpZiAoby5kYXRlID09PSBmYWxzZSAmJiBvLnRpbWUgPT09IGZhbHNlKSB7IHRocm93IG5ldyBFcnJvcignQXQgbGVhc3Qgb25lIG9mIGBkYXRlYCBvciBgdGltZWAgbXVzdCBiZSBgdHJ1ZWAuJyk7IH1cbiAgaWYgKG8uaW5wdXRGb3JtYXQgPT09IG5vKSB7XG4gICAgaWYgKG8uZGF0ZSAmJiBvLnRpbWUpIHtcbiAgICAgIG8uaW5wdXRGb3JtYXQgPSAnWVlZWS1NTS1ERCBISDptbSc7XG4gICAgfSBlbHNlIGlmIChvLmRhdGUpIHtcbiAgICAgIG8uaW5wdXRGb3JtYXQgPSAnWVlZWS1NTS1ERCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG8uaW5wdXRGb3JtYXQgPSAnSEg6bW0nO1xuICAgIH1cbiAgfVxuICBpZiAoby5pbml0aWFsVmFsdWUgPT09IG5vKSB7XG4gICAgby5pbml0aWFsVmFsdWUgPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIG8uaW5pdGlhbFZhbHVlID0gcGFyc2Uoby5pbml0aWFsVmFsdWUsIG8uaW5wdXRGb3JtYXQpO1xuICB9XG4gIGlmIChvLm1pbiA9PT0gbm8pIHsgby5taW4gPSBudWxsOyB9IGVsc2UgeyBvLm1pbiA9IHBhcnNlKG8ubWluLCBvLmlucHV0Rm9ybWF0KTsgfVxuICBpZiAoby5tYXggPT09IG5vKSB7IG8ubWF4ID0gbnVsbDsgfSBlbHNlIHsgby5tYXggPSBwYXJzZShvLm1heCwgby5pbnB1dEZvcm1hdCk7IH1cbiAgaWYgKG8udGltZUludGVydmFsID09PSBubykgeyBvLnRpbWVJbnRlcnZhbCA9IDYwICogMzA7IH0gLy8gMzAgbWludXRlcyBieSBkZWZhdWx0XG4gIGlmIChvLm1pbiAmJiBvLm1heCkge1xuICAgIGlmIChvLm1heC5pc0JlZm9yZShvLm1pbikpIHtcbiAgICAgIHRlbXAgPSBvLm1heDtcbiAgICAgIG8ubWF4ID0gby5taW47XG4gICAgICBvLm1pbiA9IHRlbXA7XG4gICAgfVxuICAgIGlmIChvLmRhdGUgPT09IHRydWUpIHtcbiAgICAgIGlmIChvLm1heC5jbG9uZSgpLnN1YnRyYWN0KDEsICdkYXlzJykuaXNCZWZvcmUoby5taW4pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYG1heGAgbXVzdCBiZSBhdCBsZWFzdCBvbmUgZGF5IGFmdGVyIGBtaW5gJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvLnRpbWVJbnRlcnZhbCAqIDEwMDAgLSBvLm1pbiAlIChvLnRpbWVJbnRlcnZhbCAqIDEwMDApID4gby5tYXggLSBvLm1pbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbWluYCB0byBgbWF4YCByYW5nZSBtdXN0IGFsbG93IGZvciBhdCBsZWFzdCBvbmUgdGltZSBvcHRpb24gdGhhdCBtYXRjaGVzIGB0aW1lSW50ZXJ2YWxgJyk7XG4gICAgfVxuICB9XG4gIGlmIChvLmRhdGVWYWxpZGF0b3IgPT09IG5vKSB7IG8uZGF0ZVZhbGlkYXRvciA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgfVxuICBpZiAoby50aW1lVmFsaWRhdG9yID09PSBubykgeyBvLnRpbWVWYWxpZGF0b3IgPSBGdW5jdGlvbi5wcm90b3R5cGU7IH1cbiAgaWYgKG8udGltZUZvcm1hdCA9PT0gbm8pIHsgby50aW1lRm9ybWF0ID0gJ0hIOm1tJzsgfVxuICBpZiAoby53ZWVrU3RhcnQgPT09IG5vKSB7IG8ud2Vla1N0YXJ0ID0gbW9tZW50dW0ubW9tZW50KCkud2Vla2RheSgwKS5kYXkoKTsgfVxuICBpZiAoby53ZWVrZGF5Rm9ybWF0ID09PSBubykgeyBvLndlZWtkYXlGb3JtYXQgPSAnbWluJzsgfVxuICBpZiAoby53ZWVrZGF5Rm9ybWF0ID09PSAnbG9uZycpIHtcbiAgICBvLndlZWtkYXlGb3JtYXQgPSBtb21lbnR1bS5tb21lbnQud2Vla2RheXMoKTtcbiAgfSBlbHNlIGlmIChvLndlZWtkYXlGb3JtYXQgPT09ICdzaG9ydCcpIHtcbiAgICBvLndlZWtkYXlGb3JtYXQgPSBtb21lbnR1bS5tb21lbnQud2Vla2RheXNTaG9ydCgpO1xuICB9IGVsc2UgaWYgKG8ud2Vla2RheUZvcm1hdCA9PT0gJ21pbicpIHtcbiAgICBvLndlZWtkYXlGb3JtYXQgPSBtb21lbnR1bS5tb21lbnQud2Vla2RheXNNaW4oKTtcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShvLndlZWtkYXlGb3JtYXQpIHx8IG8ud2Vla2RheUZvcm1hdC5sZW5ndGggPCA3KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdgd2Vla2RheXNgIG11c3QgYmUgYG1pbmAsIGBzaG9ydGAsIG9yIGBsb25nYCcpO1xuICB9XG4gIGlmIChvLm1vbnRoc0luQ2FsZW5kYXIgPT09IG5vKSB7IG8ubW9udGhzSW5DYWxlbmRhciA9IDE7IH1cbiAgaWYgKG8ubW9udGhGb3JtYXQgPT09IG5vKSB7IG8ubW9udGhGb3JtYXQgPSAnTU1NTSBZWVlZJzsgfVxuICBpZiAoby5kYXlGb3JtYXQgPT09IG5vKSB7IG8uZGF5Rm9ybWF0ID0gJ0REJzsgfVxuICBpZiAoby5zdHlsZXMgPT09IG5vKSB7IG8uc3R5bGVzID0ge307IH1cblxuICBvLnN0eWxlcy5faXNTdHlsZXNDb25maWd1cmF0aW9uID0gdHJ1ZTtcblxuICB2YXIgc3R5bCA9IG8uc3R5bGVzO1xuICBpZiAoc3R5bC5iYWNrID09PSBubykgeyBzdHlsLmJhY2sgPSAncmQtYmFjayc7IH1cbiAgaWYgKHN0eWwuY29udGFpbmVyID09PSBubykgeyBzdHlsLmNvbnRhaW5lciA9ICdyZC1jb250YWluZXInOyB9XG4gIGlmIChzdHlsLnBvc2l0aW9uZWQgPT09IG5vKSB7IHN0eWwucG9zaXRpb25lZCA9ICdyZC1jb250YWluZXItYXR0YWNobWVudCc7IH1cbiAgaWYgKHN0eWwuZGF0ZSA9PT0gbm8pIHsgc3R5bC5kYXRlID0gJ3JkLWRhdGUnOyB9XG4gIGlmIChzdHlsLmRheUJvZHkgPT09IG5vKSB7IHN0eWwuZGF5Qm9keSA9ICdyZC1kYXlzLWJvZHknOyB9XG4gIGlmIChzdHlsLmRheUJvZHlFbGVtID09PSBubykgeyBzdHlsLmRheUJvZHlFbGVtID0gJ3JkLWRheS1ib2R5JzsgfVxuICBpZiAoc3R5bC5kYXlQcmV2TW9udGggPT09IG5vKSB7IHN0eWwuZGF5UHJldk1vbnRoID0gJ3JkLWRheS1wcmV2LW1vbnRoJzsgfVxuICBpZiAoc3R5bC5kYXlOZXh0TW9udGggPT09IG5vKSB7IHN0eWwuZGF5TmV4dE1vbnRoID0gJ3JkLWRheS1uZXh0LW1vbnRoJzsgfVxuICBpZiAoc3R5bC5kYXlEaXNhYmxlZCA9PT0gbm8pIHsgc3R5bC5kYXlEaXNhYmxlZCA9ICdyZC1kYXktZGlzYWJsZWQnOyB9XG4gIGlmIChzdHlsLmRheUNvbmNlYWxlZCA9PT0gbm8pIHsgc3R5bC5kYXlDb25jZWFsZWQgPSAncmQtZGF5LWNvbmNlYWxlZCc7IH1cbiAgaWYgKHN0eWwuZGF5SGVhZCA9PT0gbm8pIHsgc3R5bC5kYXlIZWFkID0gJ3JkLWRheXMtaGVhZCc7IH1cbiAgaWYgKHN0eWwuZGF5SGVhZEVsZW0gPT09IG5vKSB7IHN0eWwuZGF5SGVhZEVsZW0gPSAncmQtZGF5LWhlYWQnOyB9XG4gIGlmIChzdHlsLmRheVJvdyA9PT0gbm8pIHsgc3R5bC5kYXlSb3cgPSAncmQtZGF5cy1yb3cnOyB9XG4gIGlmIChzdHlsLmRheVRhYmxlID09PSBubykgeyBzdHlsLmRheVRhYmxlID0gJ3JkLWRheXMnOyB9XG4gIGlmIChzdHlsLm1vbnRoID09PSBubykgeyBzdHlsLm1vbnRoID0gJ3JkLW1vbnRoJzsgfVxuICBpZiAoc3R5bC5tb250aExhYmVsID09PSBubykgeyBzdHlsLm1vbnRoTGFiZWwgPSAncmQtbW9udGgtbGFiZWwnOyB9XG4gIGlmIChzdHlsLm5leHQgPT09IG5vKSB7IHN0eWwubmV4dCA9ICdyZC1uZXh0JzsgfVxuICBpZiAoc3R5bC5zZWxlY3RlZERheSA9PT0gbm8pIHsgc3R5bC5zZWxlY3RlZERheSA9ICdyZC1kYXktc2VsZWN0ZWQnOyB9XG4gIGlmIChzdHlsLnNlbGVjdGVkVGltZSA9PT0gbm8pIHsgc3R5bC5zZWxlY3RlZFRpbWUgPSAncmQtdGltZS1zZWxlY3RlZCc7IH1cbiAgaWYgKHN0eWwudGltZSA9PT0gbm8pIHsgc3R5bC50aW1lID0gJ3JkLXRpbWUnOyB9XG4gIGlmIChzdHlsLnRpbWVMaXN0ID09PSBubykgeyBzdHlsLnRpbWVMaXN0ID0gJ3JkLXRpbWUtbGlzdCc7IH1cbiAgaWYgKHN0eWwudGltZU9wdGlvbiA9PT0gbm8pIHsgc3R5bC50aW1lT3B0aW9uID0gJ3JkLXRpbWUtb3B0aW9uJzsgfVxuXG4gIHJldHVybiBvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBkb20gKG9wdGlvbnMpIHtcbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuICBpZiAoIW8udHlwZSkgeyBvLnR5cGUgPSAnZGl2JzsgfVxuICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoby50eXBlKTtcbiAgaWYgKG8uY2xhc3NOYW1lKSB7IGVsZW0uY2xhc3NOYW1lID0gby5jbGFzc05hbWU7IH1cbiAgaWYgKG8udGV4dCkgeyBlbGVtLmlubmVyVGV4dCA9IGVsZW0udGV4dENvbnRlbnQgPSBvLnRleHQ7IH1cbiAgaWYgKG8uYXR0cmlidXRlcykge1xuICAgIE9iamVjdC5rZXlzKG8uYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgby5hdHRyaWJ1dGVzW2tleV0pO1xuICAgIH0pO1xuICB9XG4gIGlmIChvLnBhcmVudCkgeyBvLnBhcmVudC5hcHBlbmRDaGlsZChlbGVtKTsgfVxuICByZXR1cm4gZWxlbTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb207XG4iLCIndXNlIHN0cmljdCc7XG52YXIgbm87XG52YXIgaWtleSA9ICdkYXRhLXJvbWUtaWQnO1xudmFyIGluZGV4ID0gW107XG5cbmZ1bmN0aW9uIGZpbmQgKHRoaW5nKSB7IC8vIGNhbiBiZSBhIERPTSBlbGVtZW50IG9yIGEgbnVtYmVyXG4gIGlmICh0eXBlb2YgdGhpbmcgIT09ICdudW1iZXInICYmIHRoaW5nICYmIHRoaW5nLmdldEF0dHJpYnV0ZSkge1xuICAgIHJldHVybiBmaW5kKHRoaW5nLmdldEF0dHJpYnV0ZShpa2V5KSk7XG4gIH1cbiAgdmFyIGV4aXN0aW5nID0gaW5kZXhbdGhpbmddO1xuICBpZiAoZXhpc3RpbmcgIT09IG5vKSB7XG4gICAgcmV0dXJuIGV4aXN0aW5nO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBhc3NpZ24gKGVsZW0sIGluc3RhbmNlKSB7XG4gIGVsZW0uc2V0QXR0cmlidXRlKGlrZXksIGluc3RhbmNlLmlkID0gaW5kZXgucHVzaChpbnN0YW5jZSkgLSAxKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGZpbmQ6IGZpbmQsXG4gIGFzc2lnbjogYXNzaWduXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsZW5kYXIgPSByZXF1aXJlKCcuL2NhbGVuZGFyJyk7XG5cbmZ1bmN0aW9uIGlubGluZSAoZWxlbSwgY2FsZW5kYXJPcHRpb25zKSB7XG4gIHZhciBvID0gY2FsZW5kYXJPcHRpb25zIHx8IHt9O1xuXG4gIG8uYXBwZW5kVG8gPSBlbGVtO1xuICBvLmFzc29jaWF0ZWQgPSBlbGVtO1xuXG4gIHZhciBjYWwgPSBjYWxlbmRhcihvKTtcbiAgY2FsLnNob3coKTtcbiAgcmV0dXJuIGNhbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbmxpbmU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBidWxsc2V5ZSA9IHJlcXVpcmUoJ2J1bGxzZXllJyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgY2xvbmUgPSByZXF1aXJlKCcuL2Nsb25lJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG52YXIgY2FsZW5kYXIgPSByZXF1aXJlKCcuL2NhbGVuZGFyJyk7XG52YXIgbW9tZW50dW0gPSByZXF1aXJlKCcuL21vbWVudHVtJyk7XG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vY2xhc3NlcycpO1xuXG5mdW5jdGlvbiBpbnB1dENhbGVuZGFyIChpbnB1dCwgY2FsZW5kYXJPcHRpb25zKSB7XG4gIHZhciBvID0gY2FsZW5kYXJPcHRpb25zIHx8IHt9O1xuXG4gIG8uYXNzb2NpYXRlZCA9IGlucHV0O1xuXG4gIHZhciBhcGkgPSBjYWxlbmRhcihvKTtcbiAgdmFyIHRocm90dGxlZFRha2VJbnB1dCA9IHRocm90dGxlKHRha2VJbnB1dCwgMzApO1xuICB2YXIgaWdub3JlSW52YWxpZGF0aW9uO1xuICB2YXIgaWdub3JlU2hvdztcbiAgdmFyIGV5ZTtcblxuICBpbml0KG8pO1xuXG4gIHJldHVybiBhcGk7XG5cbiAgZnVuY3Rpb24gaW5pdCAoaW5pdE9wdGlvbnMpIHtcbiAgICBvID0gZGVmYXVsdHMoaW5pdE9wdGlvbnMgfHwgbywgYXBpKTtcblxuICAgIGNsYXNzZXMuYWRkKGFwaS5jb250YWluZXIsIG8uc3R5bGVzLnBvc2l0aW9uZWQpO1xuICAgIGNyb3NzdmVudC5hZGQoYXBpLmNvbnRhaW5lciwgJ21vdXNlZG93bicsIGNvbnRhaW5lck1vdXNlRG93bik7XG4gICAgY3Jvc3N2ZW50LmFkZChhcGkuY29udGFpbmVyLCAnY2xpY2snLCBjb250YWluZXJDbGljayk7XG5cbiAgICBhcGkuZ2V0RGF0ZSA9IHVucmVxdWlyZShhcGkuZ2V0RGF0ZSk7XG4gICAgYXBpLmdldERhdGVTdHJpbmcgPSB1bnJlcXVpcmUoYXBpLmdldERhdGVTdHJpbmcpO1xuICAgIGFwaS5nZXRNb21lbnQgPSB1bnJlcXVpcmUoYXBpLmdldE1vbWVudCk7XG5cbiAgICBpZiAoby5pbml0aWFsVmFsdWUpIHtcbiAgICAgIGlucHV0LnZhbHVlID0gby5pbml0aWFsVmFsdWUuZm9ybWF0KG8uaW5wdXRGb3JtYXQpO1xuICAgIH1cblxuICAgIGV5ZSA9IGJ1bGxzZXllKGFwaS5jb250YWluZXIsIGlucHV0KTtcbiAgICBhcGkub24oJ2RhdGEnLCB1cGRhdGVJbnB1dCk7XG4gICAgYXBpLm9uKCdzaG93JywgZXllLnJlZnJlc2gpO1xuXG4gICAgZXZlbnRMaXN0ZW5pbmcoKTtcbiAgICB0aHJvdHRsZWRUYWtlSW5wdXQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGV2ZW50TGlzdGVuaW5nKHRydWUpO1xuICAgIGV5ZS5kZXN0cm95KCk7XG4gICAgZXllID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50TGlzdGVuaW5nIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0oaW5wdXQsICdjbGljaycsIHNob3cpO1xuICAgIGNyb3NzdmVudFtvcF0oaW5wdXQsICd0b3VjaGVuZCcsIHNob3cpO1xuICAgIGNyb3NzdmVudFtvcF0oaW5wdXQsICdmb2N1c2luJywgc2hvdyk7XG4gICAgY3Jvc3N2ZW50W29wXShpbnB1dCwgJ2NoYW5nZScsIHRocm90dGxlZFRha2VJbnB1dCk7XG4gICAgY3Jvc3N2ZW50W29wXShpbnB1dCwgJ2tleXByZXNzJywgdGhyb3R0bGVkVGFrZUlucHV0KTtcbiAgICBjcm9zc3ZlbnRbb3BdKGlucHV0LCAna2V5ZG93bicsIHRocm90dGxlZFRha2VJbnB1dCk7XG4gICAgY3Jvc3N2ZW50W29wXShpbnB1dCwgJ2lucHV0JywgdGhyb3R0bGVkVGFrZUlucHV0KTtcbiAgICBpZiAoby5pbnZhbGlkYXRlKSB7IGNyb3NzdmVudFtvcF0oaW5wdXQsICdibHVyJywgaW52YWxpZGF0ZUlucHV0KTsgfVxuXG4gICAgaWYgKHJlbW92ZSkge1xuICAgICAgYXBpLm9uY2UoJ3JlYWR5JywgaW5pdCk7XG4gICAgICBhcGkub2ZmKCdkZXN0cm95ZWQnLCBkZXN0cm95KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLm9mZigncmVhZHknLCBpbml0KTtcbiAgICAgIGFwaS5vbmNlKCdkZXN0cm95ZWQnLCBkZXN0cm95KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWluZXJDbGljayAoKSB7XG4gICAgaWdub3JlU2hvdyA9IHRydWU7XG4gICAgaW5wdXQuZm9jdXMoKTtcbiAgICBpZ25vcmVTaG93ID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWluZXJNb3VzZURvd24gKCkge1xuICAgIGlnbm9yZUludmFsaWRhdGlvbiA9IHRydWU7XG4gICAgc2V0VGltZW91dCh1bmlnbm9yZSwgMCk7XG5cbiAgICBmdW5jdGlvbiB1bmlnbm9yZSAoKSB7XG4gICAgICBpZ25vcmVJbnZhbGlkYXRpb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbnZhbGlkYXRlSW5wdXQgKCkge1xuICAgIGlmICghaWdub3JlSW52YWxpZGF0aW9uICYmICFpc0VtcHR5KCkpIHtcbiAgICAgIGFwaS5lbWl0VmFsdWVzKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvdyAoKSB7XG4gICAgaWYgKGlnbm9yZVNob3cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXBpLnNob3coKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRha2VJbnB1dCAoKSB7XG4gICAgdmFyIHZhbHVlID0gaW5wdXQudmFsdWUudHJpbSgpO1xuICAgIGlmIChpc0VtcHR5KCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGRhdGUgPSBtb21lbnR1bS5tb21lbnQodmFsdWUsIG8uaW5wdXRGb3JtYXQsIG8uc3RyaWN0UGFyc2UpO1xuICAgIGFwaS5zZXRWYWx1ZShkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUlucHV0IChkYXRhKSB7XG4gICAgaW5wdXQudmFsdWUgPSBkYXRhO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNFbXB0eSAoKSB7XG4gICAgcmV0dXJuIG8ucmVxdWlyZWQgPT09IGZhbHNlICYmIGlucHV0LnZhbHVlLnRyaW0oKSA9PT0gJyc7XG4gIH1cblxuICBmdW5jdGlvbiB1bnJlcXVpcmUgKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1heWJlICgpIHtcbiAgICAgIHJldHVybiBpc0VtcHR5KCkgPyBudWxsIDogZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRDYWxlbmRhcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaXNJbnB1dCAoZWxlbSkge1xuICByZXR1cm4gZWxlbSAmJiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0lucHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc01vbWVudCAodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ19pc0FNb21lbnRPYmplY3QnKTtcbn1cblxudmFyIGFwaSA9IHtcbiAgbW9tZW50OiBudWxsLFxuICBpc01vbWVudDogaXNNb21lbnRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYXBpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBub29wICgpIHt9XG5cbm1vZHVsZS5leHBvcnRzID0gbm9vcDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1vbWVudHVtID0gcmVxdWlyZSgnLi9tb21lbnR1bScpO1xuXG5mdW5jdGlvbiByYXcgKGRhdGUsIGZvcm1hdCkge1xuICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG1vbWVudHVtLm1vbWVudChkYXRlLCBmb3JtYXQpO1xuICB9XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0ZSkgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIHJldHVybiBtb21lbnR1bS5tb21lbnQoZGF0ZSk7XG4gIH1cbiAgaWYgKG1vbWVudHVtLmlzTW9tZW50KGRhdGUpKSB7XG4gICAgcmV0dXJuIGRhdGUuY2xvbmUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZSAoZGF0ZSwgZm9ybWF0KSB7XG4gIHZhciBtID0gcmF3KGRhdGUsIHR5cGVvZiBmb3JtYXQgPT09ICdzdHJpbmcnID8gZm9ybWF0IDogbnVsbCk7XG4gIHJldHVybiBtICYmIG0uaXNWYWxpZCgpID8gbSA6IG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmICghQXJyYXkucHJvdG90eXBlLmZpbHRlcikge1xuICBBcnJheS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGZuLCBjdHgpIHtcbiAgICB2YXIgZiA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAodiwgaSwgdCkge1xuICAgICAgaWYgKGZuLmNhbGwoY3R4LCB2LCBpLCB0KSkgeyBmLnB1c2godik7IH1cbiAgICB9LCBjdHgpO1xuICAgIHJldHVybiBmO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAoIUFycmF5LnByb3RvdHlwZS5mb3JFYWNoKSB7XG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGZuLCBjdHgpIHtcbiAgICBpZiAodGhpcyA9PT0gdm9pZCAwIHx8IHRoaXMgPT09IG51bGwgfHwgdHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciB0ID0gdGhpcztcbiAgICB2YXIgbGVuID0gdC5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGkgaW4gdCkgeyBmbi5jYWxsKGN0eCwgdFtpXSwgaSwgdCk7IH1cbiAgICB9XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmICghQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcbiAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAod2hhdCwgc3RhcnQpIHtcbiAgICBpZiAodGhpcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgIHN0YXJ0ID0gK3N0YXJ0IHx8IDA7XG4gICAgaWYgKE1hdGguYWJzKHN0YXJ0KSA9PT0gSW5maW5pdHkpIHtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9IGVsc2UgaWYgKHN0YXJ0IDwgMCkge1xuICAgICAgc3RhcnQgKz0gbGVuZ3RoO1xuICAgICAgaWYgKHN0YXJ0IDwgMCkgeyBzdGFydCA9IDA7IH1cbiAgICB9XG4gICAgZm9yICg7IHN0YXJ0IDwgbGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICBpZiAodGhpc1tzdGFydF0gPT09IHdoYXQpIHtcbiAgICAgICAgcmV0dXJuIHN0YXJ0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbkFycmF5LmlzQXJyYXkgfHwgKEFycmF5LmlzQXJyYXkgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gJycgKyBhICE9PSBhICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAoIUFycmF5LnByb3RvdHlwZS5tYXApIHtcbiAgQXJyYXkucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG4gICAgdmFyIGNvbnRleHQsIHJlc3VsdCwgaTtcblxuICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RoaXMgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2UgPSBPYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbiA9IHNvdXJjZS5sZW5ndGggPj4+IDA7XG5cbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgIH1cblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgY29udGV4dCA9IGN0eDtcbiAgICB9XG5cbiAgICByZXN1bHQgPSBuZXcgQXJyYXkobGVuKTtcbiAgICBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBpZiAoaSBpbiBzb3VyY2UpIHtcbiAgICAgICAgcmVzdWx0W2ldID0gZm4uY2FsbChjb250ZXh0LCBzb3VyY2VbaV0sIGksIHNvdXJjZSk7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmICghQXJyYXkucHJvdG90eXBlLnNvbWUpIHtcbiAgQXJyYXkucHJvdG90eXBlLnNvbWUgPSBmdW5jdGlvbiAoZm4sIGN0eCkge1xuICAgIHZhciBjb250ZXh0LCBpO1xuXG4gICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGhpcyBpcyBudWxsIG9yIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZSA9IE9iamVjdCh0aGlzKTtcbiAgICB2YXIgbGVuID0gc291cmNlLmxlbmd0aCA+Pj4gMDtcblxuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoZm4gKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICBjb250ZXh0ID0gY3R4O1xuICAgIH1cblxuICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGlmIChpIGluIHNvdXJjZSkge1xuICAgICAgICB2YXIgdGVzdCA9IGZuLmNhbGwoY29udGV4dCwgc291cmNlW2ldLCBpLCBzb3VyY2UpO1xuICAgICAgICBpZiAodGVzdCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZScpO1xuICAgIH1cbiAgICB2YXIgY3VycmllZCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIG9yaWdpbmFsID0gdGhpcztcbiAgICB2YXIgTm9PcCA9IGZ1bmN0aW9uICgpIHt9O1xuICAgIHZhciBib3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjdHggPSB0aGlzIGluc3RhbmNlb2YgTm9PcCAmJiBjb250ZXh0ID8gdGhpcyA6IGNvbnRleHQ7XG4gICAgICB2YXIgYXJncyA9IGN1cnJpZWQuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgcmV0dXJuIG9yaWdpbmFsLmFwcGx5KGN0eCwgYXJncyk7XG4gICAgfTtcbiAgICBOb09wLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgIGJvdW5kLnByb3RvdHlwZSA9IG5ldyBOb09wKCk7XG4gICAgcmV0dXJuIGJvdW5kO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBoYXNEb250RW51bUJ1ZyA9ICEoeyB0b1N0cmluZzogbnVsbCB9KS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbnZhciBkb250RW51bXMgPSBbXG4gICd0b1N0cmluZycsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd2YWx1ZU9mJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAnY29uc3RydWN0b3InXG5dO1xudmFyIGRvbnRFbnVtc0xlbmd0aCA9IGRvbnRFbnVtcy5sZW5ndGg7XG5cbmlmICghT2JqZWN0LmtleXMpIHtcbiAgT2JqZWN0LmtleXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgJiYgKHR5cGVvZiBvYmogIT09ICdmdW5jdGlvbicgfHwgb2JqID09PSBudWxsKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmtleXMgY2FsbGVkIG9uIG5vbi1vYmplY3QnKTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gW10sIHByb3AsIGk7XG5cbiAgICBmb3IgKHByb3AgaW4gb2JqKSB7XG4gICAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBwcm9wKSkge1xuICAgICAgICByZXN1bHQucHVzaChwcm9wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaGFzRG9udEVudW1CdWcpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkb250RW51bXNMZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBkb250RW51bXNbaV0pKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goZG9udEVudW1zW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAoIVN0cmluZy5wcm90b3R5cGUudHJpbSkge1xuICBTdHJpbmcucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyB0aGVzZSBhcmUgb25seSByZXF1aXJlZCBmb3IgSUUgPCA5XG4vLyBtYXliZSBtb3ZlIHRvIElFLXNwZWNpZmljIGRpc3Rybz9cbnJlcXVpcmUoJy4vcG9seWZpbGxzL2Z1bmN0aW9uLmJpbmQnKTtcbnJlcXVpcmUoJy4vcG9seWZpbGxzL2FycmF5LmZvcmVhY2gnKTtcbnJlcXVpcmUoJy4vcG9seWZpbGxzL2FycmF5Lm1hcCcpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbHMvYXJyYXkuZmlsdGVyJyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscy9hcnJheS5pc2FycmF5Jyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscy9hcnJheS5pbmRleG9mJyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscy9hcnJheS5zb21lJyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscy9zdHJpbmcudHJpbScpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbHMvb2JqZWN0LmtleXMnKTtcblxudmFyIGNvcmUgPSByZXF1aXJlKCcuL2NvcmUnKTtcbnZhciBpbmRleCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcbnZhciB1c2UgPSByZXF1aXJlKCcuL3VzZScpO1xuXG5jb3JlLnVzZSA9IHVzZS5iaW5kKGNvcmUpO1xuY29yZS5maW5kID0gaW5kZXguZmluZDtcbmNvcmUudmFsID0gcmVxdWlyZSgnLi92YWxpZGF0b3JzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY29yZTtcbiIsInZhciByb21lID0gcmVxdWlyZSgnLi9yb21lJyk7XG52YXIgbW9tZW50dW0gPSByZXF1aXJlKCcuL21vbWVudHVtJyk7XG5cbnJvbWUudXNlKGdsb2JhbC5tb21lbnQpO1xuXG5pZiAobW9tZW50dW0ubW9tZW50ID09PSB2b2lkIDApIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdyb21lIGRlcGVuZHMgb24gbW9tZW50LmpzLCB5b3UgY2FuIGdldCBpdCBhdCBodHRwOi8vbW9tZW50anMuY29tLCBvciB5b3UgY291bGQgdXNlIHRoZSBidW5kbGVkIGRpc3RyaWJ1dGlvbiBmaWxlIGluc3RlYWQuJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm9tZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gdGV4dCAoZWxlbSwgdmFsdWUpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICBlbGVtLmlubmVyVGV4dCA9IGVsZW0udGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gZWxlbS5pbm5lclRleHQgfHwgZWxlbS50ZXh0Q29udGVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0ZXh0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRocm90dGxlIChmbiwgYm91bmRhcnkpIHtcbiAgdmFyIGxhc3QgPSAtSW5maW5pdHk7XG4gIHZhciB0aW1lcjtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJvdW5jZWQgKCkge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1bmJvdW5kKCk7XG5cbiAgICBmdW5jdGlvbiB1bmJvdW5kICgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICB2YXIgbmV4dCA9IGxhc3QgKyBib3VuZGFyeTtcbiAgICAgIHZhciBub3cgPSArbmV3IERhdGUoKTtcbiAgICAgIGlmIChub3cgPiBuZXh0KSB7XG4gICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQodW5ib3VuZCwgbmV4dCAtIG5vdyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1vbWVudHVtID0gcmVxdWlyZSgnLi9tb21lbnR1bScpO1xuXG5mdW5jdGlvbiB1c2UgKG1vbWVudCkge1xuICB0aGlzLm1vbWVudCA9IG1vbWVudHVtLm1vbWVudCA9IG1vbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1c2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbmRleCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKTtcbnZhciBhc3NvY2lhdGlvbiA9IHJlcXVpcmUoJy4vYXNzb2NpYXRpb24nKTtcblxuZnVuY3Rpb24gY29tcGFyZUJ1aWxkZXIgKGNvbXBhcmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZhY3RvcnkgKHZhbHVlKSB7XG4gICAgdmFyIGZpeGVkID0gcGFyc2UodmFsdWUpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHZhbGlkYXRlIChkYXRlKSB7XG4gICAgICB2YXIgY2FsID0gaW5kZXguZmluZCh2YWx1ZSk7XG4gICAgICB2YXIgbGVmdCA9IHBhcnNlKGRhdGUpO1xuICAgICAgdmFyIHJpZ2h0ID0gZml4ZWQgfHwgY2FsICYmIGNhbC5nZXRNb21lbnQoKTtcbiAgICAgIGlmICghcmlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoY2FsKSB7XG4gICAgICAgIGFzc29jaWF0aW9uLmFkZCh0aGlzLCBjYWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbXBhcmUobGVmdCwgcmlnaHQpO1xuICAgIH07XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJhbmdlQnVpbGRlciAoaG93LCBjb21wYXJlKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmYWN0b3J5IChzdGFydCwgZW5kKSB7XG4gICAgdmFyIGRhdGVzO1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3RhcnQpKSB7XG4gICAgICBkYXRlcyA9IHN0YXJ0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobGVuID09PSAxKSB7XG4gICAgICAgIGRhdGVzID0gW3N0YXJ0XTtcbiAgICAgIH0gZWxzZSBpZiAobGVuID09PSAyKSB7XG4gICAgICAgIGRhdGVzID0gW1tzdGFydCwgZW5kXV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHZhbGlkYXRlIChkYXRlKSB7XG4gICAgICByZXR1cm4gZGF0ZXMubWFwKGV4cGFuZC5iaW5kKHRoaXMpKVtob3ddKGNvbXBhcmUuYmluZCh0aGlzLCBkYXRlKSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGV4cGFuZCAodmFsdWUpIHtcbiAgICAgIHZhciBzdGFydCwgZW5kO1xuICAgICAgdmFyIGNhbCA9IGluZGV4LmZpbmQodmFsdWUpO1xuICAgICAgaWYgKGNhbCkge1xuICAgICAgICBzdGFydCA9IGVuZCA9IGNhbC5nZXRNb21lbnQoKTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgc3RhcnQgPSB2YWx1ZVswXTsgZW5kID0gdmFsdWVbMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydCA9IGVuZCA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKGNhbCkge1xuICAgICAgICBhc3NvY2lhdGlvbi5hZGQoY2FsLCB0aGlzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBwYXJzZShzdGFydCkuc3RhcnRPZignZGF5JykudG9EYXRlKCksXG4gICAgICAgIGVuZDogcGFyc2UoZW5kKS5lbmRPZignZGF5JykudG9EYXRlKClcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuXG52YXIgYWZ0ZXJFcSAgPSBjb21wYXJlQnVpbGRlcihmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnQgPj0gcmlnaHQ7IH0pO1xudmFyIGFmdGVyICAgID0gY29tcGFyZUJ1aWxkZXIoZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0ICA+IHJpZ2h0OyB9KTtcbnZhciBiZWZvcmVFcSA9IGNvbXBhcmVCdWlsZGVyKGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gbGVmdCA8PSByaWdodDsgfSk7XG52YXIgYmVmb3JlICAgPSBjb21wYXJlQnVpbGRlcihmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnQgIDwgcmlnaHQ7IH0pO1xuXG52YXIgZXhjZXB0ICAgPSByYW5nZUJ1aWxkZXIoJ2V2ZXJ5JywgZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiByaWdodC5zdGFydCAgPiBsZWZ0IHx8IHJpZ2h0LmVuZCAgPCBsZWZ0OyB9KTtcbnZhciBvbmx5ICAgICA9IHJhbmdlQnVpbGRlcignc29tZScsICBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIHJpZ2h0LnN0YXJ0IDw9IGxlZnQgJiYgcmlnaHQuZW5kID49IGxlZnQ7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWZ0ZXJFcTogYWZ0ZXJFcSxcbiAgYWZ0ZXI6IGFmdGVyLFxuICBiZWZvcmVFcTogYmVmb3JlRXEsXG4gIGJlZm9yZTogYmVmb3JlLFxuICBleGNlcHQ6IGV4Y2VwdCxcbiAgb25seTogb25seVxufTtcbiJdfQ==
