!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.woofmark=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./tailormade":3,"./throttle":4,"crossvent":6}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS90YWlsb3JtYWRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHNlbGwgPSByZXF1aXJlKCdzZWxsJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgc2VsZWNjaW9uID0gcmVxdWlyZSgnc2VsZWNjaW9uJyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgZ2V0U2VsZWN0aW9uID0gc2VsZWNjaW9uLmdldDtcbnZhciBwcm9wcyA9IFtcbiAgJ2RpcmVjdGlvbicsXG4gICdib3hTaXppbmcnLFxuICAnd2lkdGgnLFxuICAnaGVpZ2h0JyxcbiAgJ292ZXJmbG93WCcsXG4gICdvdmVyZmxvd1knLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICdib3JkZXJCb3R0b21XaWR0aCcsXG4gICdib3JkZXJMZWZ0V2lkdGgnLFxuICAncGFkZGluZ1RvcCcsXG4gICdwYWRkaW5nUmlnaHQnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdwYWRkaW5nTGVmdCcsXG4gICdmb250U3R5bGUnLFxuICAnZm9udFZhcmlhbnQnLFxuICAnZm9udFdlaWdodCcsXG4gICdmb250U3RyZXRjaCcsXG4gICdmb250U2l6ZScsXG4gICdmb250U2l6ZUFkanVzdCcsXG4gICdsaW5lSGVpZ2h0JyxcbiAgJ2ZvbnRGYW1pbHknLFxuICAndGV4dEFsaWduJyxcbiAgJ3RleHRUcmFuc2Zvcm0nLFxuICAndGV4dEluZGVudCcsXG4gICd0ZXh0RGVjb3JhdGlvbicsXG4gICdsZXR0ZXJTcGFjaW5nJyxcbiAgJ3dvcmRTcGFjaW5nJ1xuXTtcbnZhciB3aW4gPSBnbG9iYWw7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgZmYgPSB3aW4ubW96SW5uZXJTY3JlZW5YICE9PSBudWxsICYmIHdpbi5tb3pJbm5lclNjcmVlblggIT09IHZvaWQgMDtcblxuZnVuY3Rpb24gdGFpbG9ybWFkZSAoZWwsIG9wdGlvbnMpIHtcbiAgdmFyIHRleHRJbnB1dCA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJztcbiAgdmFyIHRocm90dGxlZFJlZnJlc2ggPSB0aHJvdHRsZShyZWZyZXNoLCAzMCk7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcblxuICBiaW5kKCk7XG5cbiAgcmV0dXJuIHtcbiAgICByZWFkOiByZWFkUG9zaXRpb24sXG4gICAgcmVmcmVzaDogdGhyb3R0bGVkUmVmcmVzaCxcbiAgICBkZXN0cm95OiBkZXN0cm95XG4gIH07XG5cbiAgZnVuY3Rpb24gbm9vcCAoKSB7fVxuICBmdW5jdGlvbiByZWFkUG9zaXRpb24gKCkgeyByZXR1cm4gKHRleHRJbnB1dCA/IGNvb3Jkc1RleHQgOiBjb29yZHNIVE1MKSgpOyB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAoKSB7XG4gICAgaWYgKG8uc2xlZXBpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChvLnVwZGF0ZSB8fCBub29wKShyZWFkUG9zaXRpb24oKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNUZXh0ICgpIHtcbiAgICB2YXIgcCA9IHNlbGwoZWwpO1xuICAgIHZhciBjb250ZXh0ID0gcHJlcGFyZSgpO1xuICAgIHZhciByZWFkaW5ncyA9IHJlYWRUZXh0Q29vcmRzKGNvbnRleHQsIHAuc3RhcnQpO1xuICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKGNvbnRleHQubWlycm9yKTtcbiAgICByZXR1cm4gcmVhZGluZ3M7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNIVE1MICgpIHtcbiAgICB2YXIgc2VsID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICB2YXIgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgIHZhciBuZWVkc1RvV29ya0Fyb3VuZE5ld2xpbmVCdWcgPSByYW5nZS5zdGFydENvbnRhaW5lci5ub2RlTmFtZSA9PT0gJ1AnICYmIHJhbmdlLnN0YXJ0T2Zmc2V0ID09PSAwO1xuICAgICAgaWYgKG5lZWRzVG9Xb3JrQXJvdW5kTmV3bGluZUJ1Zykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm9mZnNldExlZnQsXG4gICAgICAgICAgeTogcmFuZ2Uuc3RhcnRDb250YWluZXIub2Zmc2V0VG9wLFxuICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAocmFuZ2UuZ2V0Q2xpZW50UmVjdHMpIHtcbiAgICAgICAgdmFyIHJlY3RzID0gcmFuZ2UuZ2V0Q2xpZW50UmVjdHMoKTtcbiAgICAgICAgaWYgKHJlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcmVjdHNbMF0ubGVmdCxcbiAgICAgICAgICAgIHk6IHJlY3RzWzBdLnRvcCxcbiAgICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB4OiAwLCB5OiAwIH07XG4gIH1cblxuICBmdW5jdGlvbiByZWFkVGV4dENvb3JkcyAoY29udGV4dCwgcCkge1xuICAgIHZhciByZXN0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB2YXIgbWlycm9yID0gY29udGV4dC5taXJyb3I7XG4gICAgdmFyIGNvbXB1dGVkID0gY29udGV4dC5jb21wdXRlZDtcblxuICAgIHdyaXRlKG1pcnJvciwgcmVhZChlbCkuc3Vic3RyaW5nKDAsIHApKTtcblxuICAgIGlmIChlbC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICBtaXJyb3IudGV4dENvbnRlbnQgPSBtaXJyb3IudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICdcXHUwMGEwJyk7XG4gICAgfVxuXG4gICAgd3JpdGUocmVzdCwgcmVhZChlbCkuc3Vic3RyaW5nKHApIHx8ICcuJyk7XG5cbiAgICBtaXJyb3IuYXBwZW5kQ2hpbGQocmVzdCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogcmVzdC5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlckxlZnRXaWR0aCddKSxcbiAgICAgIHk6IHJlc3Qub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlclRvcFdpZHRoJ10pXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGVsKSB7XG4gICAgcmV0dXJuIHRleHRJbnB1dCA/IGVsLnZhbHVlIDogZWwuaW5uZXJIVE1MO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlcGFyZSAoKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gd2luLmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsKSA6IGVsLmN1cnJlbnRTdHlsZTtcbiAgICB2YXIgbWlycm9yID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBzdHlsZSA9IG1pcnJvci5zdHlsZTtcblxuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKG1pcnJvcik7XG5cbiAgICBpZiAoZWwudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7XG4gICAgfVxuICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnO1xuICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgcHJvcHMuZm9yRWFjaChjb3B5KTtcblxuICAgIGlmIChmZikge1xuICAgICAgc3R5bGUud2lkdGggPSBwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyICsgJ3B4JztcbiAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKSB7XG4gICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICByZXR1cm4geyBtaXJyb3I6IG1pcnJvciwgY29tcHV0ZWQ6IGNvbXB1dGVkIH07XG5cbiAgICBmdW5jdGlvbiBjb3B5IChwcm9wKSB7XG4gICAgICBzdHlsZVtwcm9wXSA9IGNvbXB1dGVkW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChlbCwgdmFsdWUpIHtcbiAgICBpZiAodGV4dElucHV0KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXlkb3duJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleXVwJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2lucHV0JywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ3Bhc3RlJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2NoYW5nZScsIHRocm90dGxlZFJlZnJlc2gpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgYmluZCh0cnVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhaWxvcm1hZGU7XG4iXX0=
},{"./throttle":4,"crossvent":6,"seleccion":19,"sell":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
},{"./eventmap":7,"custom-event":5}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
'use strict';

var sektor = require('sektor');
var crossvent = require('crossvent');
var rspaces = /\s+/g;
var keymap = {
  13: 'enter',
  27: 'esc',
  32: 'space'
};
var handlers = {};

crossvent.add(window, 'keydown', keydown);

function clear (context) {
  if (context) {
    if (context in handlers) {
      handlers[context] = {};
    }
  } else {
    handlers = {};
  }
}

function switchboard (then, combo, options, fn) {
  if (fn === void 0) {
    fn = options;
    options = {};
  }

  var context = options.context || 'defaults';

  if (!fn) {
    return;
  }

  if (handlers[context] === void 0) {
    handlers[context] = {};
  }

  combo.toLowerCase().split(rspaces).forEach(item);

  function item (keys) {
    var c = keys.trim();
    if (c.length === 0) {
      return;
    }
    then(handlers[context], c, options, fn);
  }
}

function on (combo, options, fn) {
  switchboard(add, combo, options, fn);

  function add (area, key, options, fn) {
    var handler = {
      handle: fn,
      filter: options.filter
    };
    if (area[key]) {
      area[key].push(handler);
    } else {
      area[key] = [handler];
    }
  }
}

function off (combo, options, fn) {
  switchboard(rm, combo, options, fn);

  function rm (area, key, options, fn) {
    if (area[key]) {
      area[key] = area[key].filter(matching);
    }

    function matching (handler) {
      return handler.handle === fn && handler.filter === options.filter;
    }
  }
}

function getKeyCode (e) {
  return e.which || e.keyCode || e.charCode;
}

function keydown (e) {
  var code = getKeyCode(e);
  var key = keymap[code] || String.fromCharCode(code);
  if (key) {
    handle(key, e);
  }
}

function parseKeyCombo (key, e) {
  var combo = [key];
  if (e.shiftKey) {
    combo.unshift('shift');
  }
  if (e.altKey) {
    combo.unshift('alt');
  }
  if (e.ctrlKey ^ e.metaKey) {
    combo.unshift('cmd');
  }
  return combo.join('+').toLowerCase();
}

function handle (key, e) {
  var combo = parseKeyCombo(key, e);
  var context;
  for (context in handlers) {
    if (handlers[context][combo]) {
      handlers[context][combo].forEach(exec);
    }
  }

  function filtered (handler) {
    var filter = handler.filter;
    if (!filter) {
      return;
    }

    var el = e.target;
    var selector = typeof filter === 'string';
    if (selector) {
      return sektor.matchesSelector(el, filter) === false;
    }
    while (el.parentElement && el !== filter) {
      el = el.parentElement;
    }
    return el !== filter;
  }

  function exec (handler) {
    if (filtered(handler)) {
      return;
    }
    handler.handle(e);
  }
}

module.exports = {
  on: on,
  off: off,
  clear: clear,
  handlers: handlers
};

},{"crossvent":6,"sektor":9}],9:[function(require,module,exports){
(function (global){
'use strict';

var expando = 'sektor-' + Date.now();
var rsiblings = /[+~]/;
var document = global.document;
var del = document.documentElement;
var match = del.matches ||
            del.webkitMatchesSelector ||
            del.mozMatchesSelector ||
            del.oMatchesSelector ||
            del.msMatchesSelector;

function qsa (selector, context) {
  var existed, id, prefix, prefixed, adapter, hack = context !== document;
  if (hack) { // id hack for context-rooted queries
    existed = context.getAttribute('id');
    id = existed || expando;
    prefix = '#' + id + ' ';
    prefixed = prefix + selector.replace(/,/g, ',' + prefix);
    adapter = rsiblings.test(selector) && context.parentNode;
    if (!existed) { context.setAttribute('id', id); }
  }
  try {
    return (adapter || context).querySelectorAll(prefixed || selector);
  } catch (e) {
    return [];
  } finally {
    if (existed === null) { context.removeAttribute('id'); }
  }
}

function find (selector, ctx, collection, seed) {
  var element;
  var context = ctx || document;
  var results = collection || [];
  var i = 0;
  if (typeof selector !== 'string') {
    return results;
  }
  if (context.nodeType !== 1 && context.nodeType !== 9) {
    return []; // bail if context is not an element or document
  }
  if (seed) {
    while ((element = seed[i++])) {
      if (matchesSelector(element, selector)) {
        results.push(element);
      }
    }
  } else {
    results.push.apply(results, qsa(selector, context));
  }
  return results;
}

function matches (selector, elements) {
  return find(selector, null, null, elements);
}

function matchesSelector (element, selector) {
  return match.call(element, selector);
}

module.exports = find;

find.matches = matches;
find.matchesSelector = matchesSelector;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9rYW55ZS9ub2RlX21vZHVsZXMvc2VrdG9yL3NyYy9zZWt0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBleHBhbmRvID0gJ3Nla3Rvci0nICsgRGF0ZS5ub3coKTtcbnZhciByc2libGluZ3MgPSAvWyt+XS87XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgZGVsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xudmFyIG1hdGNoID0gZGVsLm1hdGNoZXMgfHxcbiAgICAgICAgICAgIGRlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIGRlbC5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIGRlbC5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBkZWwubXNNYXRjaGVzU2VsZWN0b3I7XG5cbmZ1bmN0aW9uIHFzYSAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgdmFyIGV4aXN0ZWQsIGlkLCBwcmVmaXgsIHByZWZpeGVkLCBhZGFwdGVyLCBoYWNrID0gY29udGV4dCAhPT0gZG9jdW1lbnQ7XG4gIGlmIChoYWNrKSB7IC8vIGlkIGhhY2sgZm9yIGNvbnRleHQtcm9vdGVkIHF1ZXJpZXNcbiAgICBleGlzdGVkID0gY29udGV4dC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgaWQgPSBleGlzdGVkIHx8IGV4cGFuZG87XG4gICAgcHJlZml4ID0gJyMnICsgaWQgKyAnICc7XG4gICAgcHJlZml4ZWQgPSBwcmVmaXggKyBzZWxlY3Rvci5yZXBsYWNlKC8sL2csICcsJyArIHByZWZpeCk7XG4gICAgYWRhcHRlciA9IHJzaWJsaW5ncy50ZXN0KHNlbGVjdG9yKSAmJiBjb250ZXh0LnBhcmVudE5vZGU7XG4gICAgaWYgKCFleGlzdGVkKSB7IGNvbnRleHQuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTsgfVxuICB9XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhZGFwdGVyIHx8IGNvbnRleHQpLnF1ZXJ5U2VsZWN0b3JBbGwocHJlZml4ZWQgfHwgc2VsZWN0b3IpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChleGlzdGVkID09PSBudWxsKSB7IGNvbnRleHQucmVtb3ZlQXR0cmlidXRlKCdpZCcpOyB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoc2VsZWN0b3IsIGN0eCwgY29sbGVjdGlvbiwgc2VlZCkge1xuICB2YXIgZWxlbWVudDtcbiAgdmFyIGNvbnRleHQgPSBjdHggfHwgZG9jdW1lbnQ7XG4gIHZhciByZXN1bHRzID0gY29sbGVjdGlvbiB8fCBbXTtcbiAgdmFyIGkgPSAwO1xuICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG4gIGlmIChjb250ZXh0Lm5vZGVUeXBlICE9PSAxICYmIGNvbnRleHQubm9kZVR5cGUgIT09IDkpIHtcbiAgICByZXR1cm4gW107IC8vIGJhaWwgaWYgY29udGV4dCBpcyBub3QgYW4gZWxlbWVudCBvciBkb2N1bWVudFxuICB9XG4gIGlmIChzZWVkKSB7XG4gICAgd2hpbGUgKChlbGVtZW50ID0gc2VlZFtpKytdKSkge1xuICAgICAgaWYgKG1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvcikpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXN1bHRzLnB1c2guYXBwbHkocmVzdWx0cywgcXNhKHNlbGVjdG9yLCBjb250ZXh0KSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKHNlbGVjdG9yLCBlbGVtZW50cykge1xuICByZXR1cm4gZmluZChzZWxlY3RvciwgbnVsbCwgbnVsbCwgZWxlbWVudHMpO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IgKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gIHJldHVybiBtYXRjaC5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kO1xuXG5maW5kLm1hdGNoZXMgPSBtYXRjaGVzO1xuZmluZC5tYXRjaGVzU2VsZWN0b3IgPSBtYXRjaGVzU2VsZWN0b3I7XG4iXX0=
},{}],10:[function(require,module,exports){
(function (global){
'use strict';

var stub = require('./stub');
var tracking = require('./tracking');
var ls = 'localStorage' in global && global.localStorage ? global.localStorage : stub;

function accessor (key, value) {
  if (arguments.length === 1) {
    return get(key);
  }
  return set(key, value);
}

function get (key) {
  return JSON.parse(ls.getItem(key));
}

function set (key, value) {
  try {
    ls.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

function remove (key) {
  return ls.removeItem(key);
}

function clear () {
  return ls.clear();
}

accessor.set = set;
accessor.get = get;
accessor.remove = remove;
accessor.clear = clear;
accessor.on = tracking.on;
accessor.off = tracking.off;

module.exports = accessor;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBzdHViID0gcmVxdWlyZSgnLi9zdHViJyk7XG52YXIgdHJhY2tpbmcgPSByZXF1aXJlKCcuL3RyYWNraW5nJyk7XG52YXIgbHMgPSAnbG9jYWxTdG9yYWdlJyBpbiBnbG9iYWwgJiYgZ2xvYmFsLmxvY2FsU3RvcmFnZSA/IGdsb2JhbC5sb2NhbFN0b3JhZ2UgOiBzdHViO1xuXG5mdW5jdGlvbiBhY2Nlc3NvciAoa2V5LCB2YWx1ZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBnZXQoa2V5KTtcbiAgfVxuICByZXR1cm4gc2V0KGtleSwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXQgKGtleSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShscy5nZXRJdGVtKGtleSkpO1xufVxuXG5mdW5jdGlvbiBzZXQgKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBscy5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUgKGtleSkge1xuICByZXR1cm4gbHMucmVtb3ZlSXRlbShrZXkpO1xufVxuXG5mdW5jdGlvbiBjbGVhciAoKSB7XG4gIHJldHVybiBscy5jbGVhcigpO1xufVxuXG5hY2Nlc3Nvci5zZXQgPSBzZXQ7XG5hY2Nlc3Nvci5nZXQgPSBnZXQ7XG5hY2Nlc3Nvci5yZW1vdmUgPSByZW1vdmU7XG5hY2Nlc3Nvci5jbGVhciA9IGNsZWFyO1xuYWNjZXNzb3Iub24gPSB0cmFja2luZy5vbjtcbmFjY2Vzc29yLm9mZiA9IHRyYWNraW5nLm9mZjtcblxubW9kdWxlLmV4cG9ydHMgPSBhY2Nlc3NvcjtcbiJdfQ==
},{"./stub":11,"./tracking":12}],11:[function(require,module,exports){
'use strict';

var ms = {};

function getItem (key) {
  return key in ms ? ms[key] : null;
}

function setItem (key, value) {
  ms[key] = value;
  return true;
}

function removeItem (key) {
  var found = key in ms;
  if (found) {
    return delete ms[key];
  }
  return false;
}

function clear () {
  ms = {};
  return true;
}

module.exports = {
  getItem: getItem,
  setItem: setItem,
  removeItem: removeItem,
  clear: clear
};

},{}],12:[function(require,module,exports){
(function (global){
'use strict';

var listeners = {};
var listening = false;

function listen () {
  if (global.addEventListener) {
    global.addEventListener('storage', change, false);
  } else if (global.attachEvent) {
    global.attachEvent('onstorage', change);
  } else {
    global.onstorage = change;
  }
}

function change (e) {
  if (!e) {
    e = global.event;
  }
  var all = listeners[e.key];
  if (all) {
    all.forEach(fire);
  }

  function fire (listener) {
    listener(JSON.parse(e.newValue), JSON.parse(e.oldValue), e.url || e.uri);
  }
}

function on (key, fn) {
  if (listeners[key]) {
    listeners[key].push(fn);
  } else {
    listeners[key] = [fn];
  }
  if (listening === false) {
    listen();
  }
}

function off (key, fn) {
  var ns = listeners[key];
  if (ns.length > 1) {
    ns.splice(ns.indexOf(fn), 1);
  } else {
    listeners[key] = [];
  }
}

module.exports = {
  on: on,
  off: off
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9sb2NhbC1zdG9yYWdlL3RyYWNraW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGxpc3RlbmVycyA9IHt9O1xudmFyIGxpc3RlbmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBsaXN0ZW4gKCkge1xuICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIGNoYW5nZSwgZmFsc2UpO1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hdHRhY2hFdmVudCkge1xuICAgIGdsb2JhbC5hdHRhY2hFdmVudCgnb25zdG9yYWdlJywgY2hhbmdlKTtcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWwub25zdG9yYWdlID0gY2hhbmdlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZSAoZSkge1xuICBpZiAoIWUpIHtcbiAgICBlID0gZ2xvYmFsLmV2ZW50O1xuICB9XG4gIHZhciBhbGwgPSBsaXN0ZW5lcnNbZS5rZXldO1xuICBpZiAoYWxsKSB7XG4gICAgYWxsLmZvckVhY2goZmlyZSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaXJlIChsaXN0ZW5lcikge1xuICAgIGxpc3RlbmVyKEpTT04ucGFyc2UoZS5uZXdWYWx1ZSksIEpTT04ucGFyc2UoZS5vbGRWYWx1ZSksIGUudXJsIHx8IGUudXJpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbiAoa2V5LCBmbikge1xuICBpZiAobGlzdGVuZXJzW2tleV0pIHtcbiAgICBsaXN0ZW5lcnNba2V5XS5wdXNoKGZuKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0ZW5lcnNba2V5XSA9IFtmbl07XG4gIH1cbiAgaWYgKGxpc3RlbmluZyA9PT0gZmFsc2UpIHtcbiAgICBsaXN0ZW4oKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvZmYgKGtleSwgZm4pIHtcbiAgdmFyIG5zID0gbGlzdGVuZXJzW2tleV07XG4gIGlmIChucy5sZW5ndGggPiAxKSB7XG4gICAgbnMuc3BsaWNlKG5zLmluZGV4T2YoZm4pLCAxKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0ZW5lcnNba2V5XSA9IFtdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvbjogb24sXG4gIG9mZjogb2ZmXG59O1xuIl19
},{}],13:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTZWxlY3Rpb247XG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGdldFNlbGVjdGlvblJhdyA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uUmF3Jyk7XG52YXIgZ2V0U2VsZWN0aW9uTnVsbE9wID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb25OdWxsT3AnKTtcbnZhciBnZXRTZWxlY3Rpb25TeW50aGV0aWMgPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvblN5bnRoZXRpYycpO1xudmFyIGlzSG9zdCA9IHJlcXVpcmUoJy4vaXNIb3N0Jyk7XG5pZiAoaXNIb3N0Lm1ldGhvZChnbG9iYWwsICdnZXRTZWxlY3Rpb24nKSkge1xuICBnZXRTZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb25SYXc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2Muc2VsZWN0aW9uID09PSAnb2JqZWN0JyAmJiBkb2Muc2VsZWN0aW9uKSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvblN5bnRoZXRpYztcbn0gZWxzZSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvbk51bGxPcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb247XG4iXX0=
},{"./getSelectionNullOp":14,"./getSelectionRaw":15,"./getSelectionSynthetic":16,"./isHost":17}],14:[function(require,module,exports){
'use strict';

function noop () {}

function getSelectionNullOp () {
  return {
    removeAllRanges: noop,
    addRange: noop
  };
}

module.exports = getSelectionNullOp;

},{}],15:[function(require,module,exports){
(function (global){
'use strict';

function getSelectionRaw () {
  return global.getSelection();
}

module.exports = getSelectionRaw;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvblJhdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb25SYXcgKCkge1xuICByZXR1cm4gZ2xvYmFsLmdldFNlbGVjdGlvbigpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvblJhdztcbiJdfQ==
},{}],16:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvblN5bnRoZXRpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZ2VUb1RleHRSYW5nZSA9IHJlcXVpcmUoJy4vcmFuZ2VUb1RleHRSYW5nZScpO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBib2R5ID0gZG9jLmJvZHk7XG52YXIgR2V0U2VsZWN0aW9uUHJvdG8gPSBHZXRTZWxlY3Rpb24ucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBHZXRTZWxlY3Rpb24gKHNlbGVjdGlvbikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciByYW5nZSA9IHNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuXG4gIHRoaXMuX3NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcbiAgdGhpcy5fcmFuZ2VzID0gW107XG5cbiAgaWYgKHNlbGVjdGlvbi50eXBlID09PSAnQ29udHJvbCcpIHtcbiAgICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHNlbGYpO1xuICB9IGVsc2UgaWYgKGlzVGV4dFJhbmdlKHJhbmdlKSkge1xuICAgIHVwZGF0ZUZyb21UZXh0UmFuZ2Uoc2VsZiwgcmFuZ2UpO1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZUVtcHR5U2VsZWN0aW9uKHNlbGYpO1xuICB9XG59XG5cbkdldFNlbGVjdGlvblByb3RvLnJlbW92ZUFsbFJhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRSYW5nZTtcbiAgdHJ5IHtcbiAgICB0aGlzLl9zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uLnR5cGUgIT09ICdOb25lJykge1xuICAgICAgdGV4dFJhbmdlID0gYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgIHRleHRSYW5nZS5zZWxlY3QoKTtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbi5lbXB0eSgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHVwZGF0ZUVtcHR5U2VsZWN0aW9uKHRoaXMpO1xufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uYWRkUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgaWYgKHRoaXMuX3NlbGVjdGlvbi50eXBlID09PSAnQ29udHJvbCcpIHtcbiAgICBhZGRSYW5nZVRvQ29udHJvbFNlbGVjdGlvbih0aGlzLCByYW5nZSk7XG4gIH0gZWxzZSB7XG4gICAgcmFuZ2VUb1RleHRSYW5nZShyYW5nZSkuc2VsZWN0KCk7XG4gICAgdGhpcy5fcmFuZ2VzWzBdID0gcmFuZ2U7XG4gICAgdGhpcy5yYW5nZUNvdW50ID0gMTtcbiAgICB0aGlzLmlzQ29sbGFwc2VkID0gdGhpcy5fcmFuZ2VzWzBdLmNvbGxhcHNlZDtcbiAgICB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZSh0aGlzLCByYW5nZSwgZmFsc2UpO1xuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5zZXRSYW5nZXMgPSBmdW5jdGlvbiAocmFuZ2VzKSB7XG4gIHRoaXMucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHZhciByYW5nZUNvdW50ID0gcmFuZ2VzLmxlbmd0aDtcbiAgaWYgKHJhbmdlQ291bnQgPiAxKSB7XG4gICAgY3JlYXRlQ29udHJvbFNlbGVjdGlvbih0aGlzLCByYW5nZXMpO1xuICB9IGVsc2UgaWYgKHJhbmdlQ291bnQpIHtcbiAgICB0aGlzLmFkZFJhbmdlKHJhbmdlc1swXSk7XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmdldFJhbmdlQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLnJhbmdlQ291bnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFJhbmdlQXQoKTogaW5kZXggb3V0IG9mIGJvdW5kcycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZXNbaW5kZXhdLmNsb25lUmFuZ2UoKTtcbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8ucmVtb3ZlUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgaWYgKHRoaXMuX3NlbGVjdGlvbi50eXBlICE9PSAnQ29udHJvbCcpIHtcbiAgICByZW1vdmVSYW5nZU1hbnVhbGx5KHRoaXMsIHJhbmdlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGNvbnRyb2xSYW5nZSA9IHRoaXMuX3NlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICB2YXIgcmFuZ2VFbGVtZW50ID0gZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZShyYW5nZSk7XG4gIHZhciBuZXdDb250cm9sUmFuZ2UgPSBib2R5LmNyZWF0ZUNvbnRyb2xSYW5nZSgpO1xuICB2YXIgZWw7XG4gIHZhciByZW1vdmVkID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjb250cm9sUmFuZ2UubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBlbCA9IGNvbnRyb2xSYW5nZS5pdGVtKGkpO1xuICAgIGlmIChlbCAhPT0gcmFuZ2VFbGVtZW50IHx8IHJlbW92ZWQpIHtcbiAgICAgIG5ld0NvbnRyb2xSYW5nZS5hZGQoY29udHJvbFJhbmdlLml0ZW0oaSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgbmV3Q29udHJvbFJhbmdlLnNlbGVjdCgpO1xuICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHRoaXMpO1xufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uZWFjaFJhbmdlID0gZnVuY3Rpb24gKGZuLCByZXR1cm5WYWx1ZSkge1xuICB2YXIgaSA9IDA7XG4gIHZhciBsZW4gPSB0aGlzLl9yYW5nZXMubGVuZ3RoO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoZm4odGhpcy5nZXRSYW5nZUF0KGkpKSkge1xuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uZ2V0QWxsUmFuZ2VzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcmFuZ2VzID0gW107XG4gIHRoaXMuZWFjaFJhbmdlKGZ1bmN0aW9uIChyYW5nZSkge1xuICAgIHJhbmdlcy5wdXNoKHJhbmdlKTtcbiAgfSk7XG4gIHJldHVybiByYW5nZXM7XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5zZXRTaW5nbGVSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICB0aGlzLnJlbW92ZUFsbFJhbmdlcygpO1xuICB0aGlzLmFkZFJhbmdlKHJhbmdlKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xTZWxlY3Rpb24gKHNlbCwgcmFuZ2VzKSB7XG4gIHZhciBjb250cm9sUmFuZ2UgPSBib2R5LmNyZWF0ZUNvbnRyb2xSYW5nZSgpO1xuICBmb3IgKHZhciBpID0gMCwgZWwsIGxlbiA9IHJhbmdlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGVsID0gZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZShyYW5nZXNbaV0pO1xuICAgIHRyeSB7XG4gICAgICBjb250cm9sUmFuZ2UuYWRkKGVsKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFJhbmdlcygpOiBFbGVtZW50IGNvdWxkIG5vdCBiZSBhZGRlZCB0byBjb250cm9sIHNlbGVjdGlvbicpO1xuICAgIH1cbiAgfVxuICBjb250cm9sUmFuZ2Uuc2VsZWN0KCk7XG4gIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24oc2VsKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlUmFuZ2VNYW51YWxseSAoc2VsLCByYW5nZSkge1xuICB2YXIgcmFuZ2VzID0gc2VsLmdldEFsbFJhbmdlcygpO1xuICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSByYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoIWlzU2FtZVJhbmdlKHJhbmdlLCByYW5nZXNbaV0pKSB7XG4gICAgICBzZWwuYWRkUmFuZ2UocmFuZ2VzW2ldKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFzZWwucmFuZ2VDb3VudCkge1xuICAgIHVwZGF0ZUVtcHR5U2VsZWN0aW9uKHNlbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2UgKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIGFuY2hvclByZWZpeCA9ICdzdGFydCc7XG4gIHZhciBmb2N1c1ByZWZpeCA9ICdlbmQnO1xuICBzZWwuYW5jaG9yTm9kZSA9IHJhbmdlW2FuY2hvclByZWZpeCArICdDb250YWluZXInXTtcbiAgc2VsLmFuY2hvck9mZnNldCA9IHJhbmdlW2FuY2hvclByZWZpeCArICdPZmZzZXQnXTtcbiAgc2VsLmZvY3VzTm9kZSA9IHJhbmdlW2ZvY3VzUHJlZml4ICsgJ0NvbnRhaW5lciddO1xuICBzZWwuZm9jdXNPZmZzZXQgPSByYW5nZVtmb2N1c1ByZWZpeCArICdPZmZzZXQnXTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRW1wdHlTZWxlY3Rpb24gKHNlbCkge1xuICBzZWwuYW5jaG9yTm9kZSA9IHNlbC5mb2N1c05vZGUgPSBudWxsO1xuICBzZWwuYW5jaG9yT2Zmc2V0ID0gc2VsLmZvY3VzT2Zmc2V0ID0gMDtcbiAgc2VsLnJhbmdlQ291bnQgPSAwO1xuICBzZWwuaXNDb2xsYXBzZWQgPSB0cnVlO1xuICBzZWwuX3Jhbmdlcy5sZW5ndGggPSAwO1xufVxuXG5mdW5jdGlvbiByYW5nZUNvbnRhaW5zU2luZ2xlRWxlbWVudCAocmFuZ2VOb2Rlcykge1xuICBpZiAoIXJhbmdlTm9kZXMubGVuZ3RoIHx8IHJhbmdlTm9kZXNbMF0ubm9kZVR5cGUgIT09IDEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IHJhbmdlTm9kZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoIWlzQW5jZXN0b3JPZihyYW5nZU5vZGVzWzBdLCByYW5nZU5vZGVzW2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZSAocmFuZ2UpIHtcbiAgdmFyIG5vZGVzID0gcmFuZ2UuZ2V0Tm9kZXMoKTtcbiAgaWYgKCFyYW5nZUNvbnRhaW5zU2luZ2xlRWxlbWVudChub2RlcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UoKTogcmFuZ2UgZGlkIG5vdCBjb25zaXN0IG9mIGEgc2luZ2xlIGVsZW1lbnQnKTtcbiAgfVxuICByZXR1cm4gbm9kZXNbMF07XG59XG5cbmZ1bmN0aW9uIGlzVGV4dFJhbmdlIChyYW5nZSkge1xuICByZXR1cm4gcmFuZ2UgJiYgcmFuZ2UudGV4dCAhPT0gdm9pZCAwO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVGcm9tVGV4dFJhbmdlIChzZWwsIHJhbmdlKSB7XG4gIHNlbC5fcmFuZ2VzID0gW3JhbmdlXTtcbiAgdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2Uoc2VsLCByYW5nZSwgZmFsc2UpO1xuICBzZWwucmFuZ2VDb3VudCA9IDE7XG4gIHNlbC5pc0NvbGxhcHNlZCA9IHJhbmdlLmNvbGxhcHNlZDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29udHJvbFNlbGVjdGlvbiAoc2VsKSB7XG4gIHNlbC5fcmFuZ2VzLmxlbmd0aCA9IDA7XG4gIGlmIChzZWwuX3NlbGVjdGlvbi50eXBlID09PSAnTm9uZScpIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWwpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjb250cm9sUmFuZ2UgPSBzZWwuX3NlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICAgIGlmIChpc1RleHRSYW5nZShjb250cm9sUmFuZ2UpKSB7XG4gICAgICB1cGRhdGVGcm9tVGV4dFJhbmdlKHNlbCwgY29udHJvbFJhbmdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsLnJhbmdlQ291bnQgPSBjb250cm9sUmFuZ2UubGVuZ3RoO1xuICAgICAgdmFyIHJhbmdlO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWwucmFuZ2VDb3VudDsgKytpKSB7XG4gICAgICAgIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGUoY29udHJvbFJhbmdlLml0ZW0oaSkpO1xuICAgICAgICBzZWwuX3Jhbmdlcy5wdXNoKHJhbmdlKTtcbiAgICAgIH1cbiAgICAgIHNlbC5pc0NvbGxhcHNlZCA9IHNlbC5yYW5nZUNvdW50ID09PSAxICYmIHNlbC5fcmFuZ2VzWzBdLmNvbGxhcHNlZDtcbiAgICAgIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlKHNlbCwgc2VsLl9yYW5nZXNbc2VsLnJhbmdlQ291bnQgLSAxXSwgZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRSYW5nZVRvQ29udHJvbFNlbGVjdGlvbiAoc2VsLCByYW5nZSkge1xuICB2YXIgY29udHJvbFJhbmdlID0gc2VsLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHJhbmdlRWxlbWVudCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2UpO1xuICB2YXIgbmV3Q29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvbnRyb2xSYW5nZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIG5ld0NvbnRyb2xSYW5nZS5hZGQoY29udHJvbFJhbmdlLml0ZW0oaSkpO1xuICB9XG4gIHRyeSB7XG4gICAgbmV3Q29udHJvbFJhbmdlLmFkZChyYW5nZUVsZW1lbnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhZGRSYW5nZSgpOiBFbGVtZW50IGNvdWxkIG5vdCBiZSBhZGRlZCB0byBjb250cm9sIHNlbGVjdGlvbicpO1xuICB9XG4gIG5ld0NvbnRyb2xSYW5nZS5zZWxlY3QoKTtcbiAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbihzZWwpO1xufVxuXG5mdW5jdGlvbiBpc1NhbWVSYW5nZSAobGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIChcbiAgICBsZWZ0LnN0YXJ0Q29udGFpbmVyID09PSByaWdodC5zdGFydENvbnRhaW5lciAmJlxuICAgIGxlZnQuc3RhcnRPZmZzZXQgPT09IHJpZ2h0LnN0YXJ0T2Zmc2V0ICYmXG4gICAgbGVmdC5lbmRDb250YWluZXIgPT09IHJpZ2h0LmVuZENvbnRhaW5lciAmJlxuICAgIGxlZnQuZW5kT2Zmc2V0ID09PSByaWdodC5lbmRPZmZzZXRcbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNBbmNlc3Rvck9mIChhbmNlc3RvciwgZGVzY2VuZGFudCkge1xuICB2YXIgbm9kZSA9IGRlc2NlbmRhbnQ7XG4gIHdoaWxlIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlID09PSBhbmNlc3Rvcikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IEdldFNlbGVjdGlvbihnbG9iYWwuZG9jdW1lbnQuc2VsZWN0aW9uKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb247XG4iXX0=
},{"./rangeToTextRange":18}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL3JhbmdlVG9UZXh0UmFuZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYm9keSA9IGRvYy5ib2R5O1xuXG5mdW5jdGlvbiByYW5nZVRvVGV4dFJhbmdlIChwKSB7XG4gIGlmIChwLmNvbGxhcHNlZCkge1xuICAgIHJldHVybiBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSh7IG5vZGU6IHAuc3RhcnRDb250YWluZXIsIG9mZnNldDogcC5zdGFydE9mZnNldCB9LCB0cnVlKTtcbiAgfVxuICB2YXIgc3RhcnRSYW5nZSA9IGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlKHsgbm9kZTogcC5zdGFydENvbnRhaW5lciwgb2Zmc2V0OiBwLnN0YXJ0T2Zmc2V0IH0sIHRydWUpO1xuICB2YXIgZW5kUmFuZ2UgPSBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSh7IG5vZGU6IHAuZW5kQ29udGFpbmVyLCBvZmZzZXQ6IHAuZW5kT2Zmc2V0IH0sIGZhbHNlKTtcbiAgdmFyIHRleHRSYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gIHRleHRSYW5nZS5zZXRFbmRQb2ludCgnU3RhcnRUb1N0YXJ0Jywgc3RhcnRSYW5nZSk7XG4gIHRleHRSYW5nZS5zZXRFbmRQb2ludCgnRW5kVG9FbmQnLCBlbmRSYW5nZSk7XG4gIHJldHVybiB0ZXh0UmFuZ2U7XG59XG5cbmZ1bmN0aW9uIGlzQ2hhcmFjdGVyRGF0YU5vZGUgKG5vZGUpIHtcbiAgdmFyIHQgPSBub2RlLm5vZGVUeXBlO1xuICByZXR1cm4gdCA9PT0gMyB8fCB0ID09PSA0IHx8IHQgPT09IDggO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSAocCwgc3RhcnRpbmcpIHtcbiAgdmFyIGJvdW5kO1xuICB2YXIgcGFyZW50O1xuICB2YXIgb2Zmc2V0ID0gcC5vZmZzZXQ7XG4gIHZhciB3b3JraW5nTm9kZTtcbiAgdmFyIGNoaWxkTm9kZXM7XG4gIHZhciByYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gIHZhciBkYXRhID0gaXNDaGFyYWN0ZXJEYXRhTm9kZShwLm5vZGUpO1xuXG4gIGlmIChkYXRhKSB7XG4gICAgYm91bmQgPSBwLm5vZGU7XG4gICAgcGFyZW50ID0gYm91bmQucGFyZW50Tm9kZTtcbiAgfSBlbHNlIHtcbiAgICBjaGlsZE5vZGVzID0gcC5ub2RlLmNoaWxkTm9kZXM7XG4gICAgYm91bmQgPSBvZmZzZXQgPCBjaGlsZE5vZGVzLmxlbmd0aCA/IGNoaWxkTm9kZXNbb2Zmc2V0XSA6IG51bGw7XG4gICAgcGFyZW50ID0gcC5ub2RlO1xuICB9XG5cbiAgd29ya2luZ05vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICB3b3JraW5nTm9kZS5pbm5lckhUTUwgPSAnJiNmZWZmOyc7XG5cbiAgaWYgKGJvdW5kKSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZSh3b3JraW5nTm9kZSwgYm91bmQpO1xuICB9IGVsc2Uge1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh3b3JraW5nTm9kZSk7XG4gIH1cblxuICByYW5nZS5tb3ZlVG9FbGVtZW50VGV4dCh3b3JraW5nTm9kZSk7XG4gIHJhbmdlLmNvbGxhcHNlKCFzdGFydGluZyk7XG4gIHBhcmVudC5yZW1vdmVDaGlsZCh3b3JraW5nTm9kZSk7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICByYW5nZVtzdGFydGluZyA/ICdtb3ZlU3RhcnQnIDogJ21vdmVFbmQnXSgnY2hhcmFjdGVyJywgb2Zmc2V0KTtcbiAgfVxuICByZXR1cm4gcmFuZ2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZ2VUb1RleHRSYW5nZTtcbiJdfQ==
},{}],19:[function(require,module,exports){
'use strict';

var getSelection = require('./getSelection');
var setSelection = require('./setSelection');

module.exports = {
  get: getSelection,
  set: setSelection
};

},{"./getSelection":13,"./setSelection":20}],20:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL3NldFNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTZWxlY3Rpb24gPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvbicpO1xudmFyIHJhbmdlVG9UZXh0UmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlVG9UZXh0UmFuZ2UnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG5cbmZ1bmN0aW9uIHNldFNlbGVjdGlvbiAocCkge1xuICBpZiAoZG9jLmNyZWF0ZVJhbmdlKSB7XG4gICAgbW9kZXJuU2VsZWN0aW9uKCk7XG4gIH0gZWxzZSB7XG4gICAgb2xkU2VsZWN0aW9uKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtb2Rlcm5TZWxlY3Rpb24gKCkge1xuICAgIHZhciBzZWwgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICB2YXIgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICBpZiAoIXAuc3RhcnRDb250YWluZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHAuZW5kQ29udGFpbmVyKSB7XG4gICAgICByYW5nZS5zZXRFbmQocC5lbmRDb250YWluZXIsIHAuZW5kT2Zmc2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2Uuc2V0RW5kKHAuc3RhcnRDb250YWluZXIsIHAuc3RhcnRPZmZzZXQpO1xuICAgIH1cbiAgICByYW5nZS5zZXRTdGFydChwLnN0YXJ0Q29udGFpbmVyLCBwLnN0YXJ0T2Zmc2V0KTtcbiAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9sZFNlbGVjdGlvbiAoKSB7XG4gICAgcmFuZ2VUb1RleHRSYW5nZShwKS5zZWxlY3QoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFNlbGVjdGlvbjtcbiJdfQ==
},{"./getSelection":13,"./rangeToTextRange":18}],21:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var InputState = require('./InputState');

function InputHistory (surface, mode) {
  var state = this;

  state.inputMode = mode;
  state.surface = surface;
  state.reset();

  listen(surface.textarea);
  listen(surface.editable);

  function listen (el) {
    var pasteHandler = selfie(handlePaste);
    crossvent.add(el, 'keypress', preventCtrlYZ);
    crossvent.add(el, 'keydown', selfie(handleCtrlYZ));
    crossvent.add(el, 'keydown', selfie(handleModeChange));
    crossvent.add(el, 'mousedown', setMoving);
    el.onpaste = pasteHandler;
    el.ondrop = pasteHandler;
  }

  function setMoving () {
    state.setMode('moving');
  }

  function selfie (fn) {
    return function handler (e) { return fn.call(null, state, e); };
  }
}

InputHistory.prototype.setInputMode = function (mode) {
  var state = this;
  state.inputMode = mode;
  state.reset();
};

InputHistory.prototype.reset = function () {
  var state = this;
  state.inputState = null;
  state.lastState = null;
  state.history = [];
  state.historyPointer = 0;
  state.historyMode = 'none';
  state.refreshing = null;
  state.refreshState(true);
  state.saveState();
  return state;
};

InputHistory.prototype.setCommandMode = function () {
  var state = this;
  state.historyMode = 'command';
  state.saveState();
  state.refreshing = setTimeout(function () {
    state.refreshState();
  }, 0);
};

InputHistory.prototype.canUndo = function () {
  return this.historyPointer > 1;
};

InputHistory.prototype.canRedo = function () {
  return this.history[this.historyPointer + 1];
};

InputHistory.prototype.undo = function () {
  var state = this;
  if (state.canUndo()) {
    if (state.lastState) {
      state.lastState.restore();
      state.lastState = null;
    } else {
      state.history[state.historyPointer] = new InputState(state.surface, state.inputMode);
      state.history[--state.historyPointer].restore();
    }
  }
  state.historyMode = 'none';
  state.surface.focus(state.inputMode);
  state.refreshState();
};

InputHistory.prototype.redo = function () {
  var state = this;
  if (state.canRedo()) {
    state.history[++state.historyPointer].restore();
  }

  state.historyMode = 'none';
  state.surface.focus(state.inputMode);
  state.refreshState();
};

InputHistory.prototype.setMode = function (value) {
  var state = this;
  if (state.historyMode !== value) {
    state.historyMode = value;
    state.saveState();
  }
  state.refreshing = setTimeout(function () {
    state.refreshState();
  }, 1);
};

InputHistory.prototype.refreshState = function (initialState) {
  var state = this;
  state.inputState = new InputState(state.surface, state.inputMode, initialState);
  state.refreshing = null;
};

InputHistory.prototype.saveState = function () {
  var state = this;
  var current = state.inputState || new InputState(state.surface, state.inputMode);

  if (state.historyMode === 'moving') {
    if (!state.lastState) {
      state.lastState = current;
    }
    return;
  }
  if (state.lastState) {
    if (state.history[state.historyPointer - 1].text !== state.lastState.text) {
      state.history[state.historyPointer++] = state.lastState;
    }
    state.lastState = null;
  }
  state.history[state.historyPointer++] = current;
  state.history[state.historyPointer + 1] = null;
};

function handleCtrlYZ (state, e) {
  var handled = false;
  var keyCode = e.charCode || e.keyCode;
  var keyCodeChar = String.fromCharCode(keyCode);

  if (e.ctrlKey || e.metaKey) {
    switch (keyCodeChar.toLowerCase()) {
      case 'y':
        state.redo();
        handled = true;
        break;

      case 'z':
        if (e.shiftKey) {
          state.redo();
        } else {
          state.undo();
        }
        handled = true;
        break;
    }
  }

  if (handled && e.preventDefault) {
    e.preventDefault();
  }
}

function handleModeChange (state, e) {
  if (e.ctrlKey || e.metaKey) {
    return;
  }

  var keyCode = e.keyCode;

  if ((keyCode >= 33 && keyCode <= 40) || (keyCode >= 63232 && keyCode <= 63235)) {
    state.setMode('moving');
  } else if (keyCode === 8 || keyCode === 46 || keyCode === 127) {
    state.setMode('deleting');
  } else if (keyCode === 13) {
    state.setMode('newlines');
  } else if (keyCode === 27) {
    state.setMode('escape');
  } else if ((keyCode < 16 || keyCode > 20) && keyCode !== 91) {
    state.setMode('typing');
  }
}

function handlePaste (state) {
  if (state.inputState && state.inputState.text !== state.surface.read(state.inputMode) && state.refreshing === null) {
    state.historyMode = 'paste';
    state.saveState();
    state.refreshState();
  }
}

function preventCtrlYZ (e) {
  var keyCode = e.charCode || e.keyCode;
  var yz = keyCode === 89 || keyCode === 90;
  var ctrl = e.ctrlKey || e.metaKey;
  if (ctrl && yz) {
    e.preventDefault();
  }
}

module.exports = InputHistory;

},{"./InputState":22,"crossvent":6}],22:[function(require,module,exports){
(function (global){
'use strict';

var doc = global.document;
var isVisibleElement = require('./isVisibleElement');
var fixEOL = require('./fixEOL');
var MarkdownChunks = require('./markdown/MarkdownChunks');
var HtmlChunks = require('./html/HtmlChunks');
var chunks = {
  markdown: MarkdownChunks,
  html: HtmlChunks,
  wysiwyg: HtmlChunks
};

function InputState (surface, mode, initialState) {
  this.mode = mode;
  this.surface = surface;
  this.initialState = initialState || false;
  this.init();
}

InputState.prototype.init = function () {
  var self = this;
  var el = self.surface.current(self.mode);
  if (!isVisibleElement(el)) {
    return;
  }
  if (!this.initialState && doc.activeElement && doc.activeElement !== el) {
    return;
  }
  self.surface.readSelection(self);
  self.scrollTop = el.scrollTop;
  if (!self.text) {
    self.text = self.surface.read(self.mode);
  }
};

InputState.prototype.select = function () {
  var self = this;
  var el = self.surface.current(self.mode);
  if (!isVisibleElement(el)) {
    return;
  }
  self.surface.writeSelection(self);
};

InputState.prototype.restore = function () {
  var self = this;
  var el = self.surface.current(self.mode);
  if (typeof self.text === 'string' && self.text !== self.surface.read(self.mode)) {
    self.surface.write(self.mode, self.text);
  }
  self.select();
  el.scrollTop = self.scrollTop;
};

InputState.prototype.getChunks = function () {
  var self = this;
  var chunk = new chunks[self.mode]();
  chunk.before = fixEOL(self.text.substring(0, self.start));
  chunk.startTag = '';
  chunk.selection = fixEOL(self.text.substring(self.start, self.end));
  chunk.endTag = '';
  chunk.after = fixEOL(self.text.substring(self.end));
  chunk.scrollTop = self.scrollTop;
  self.cachedChunks = chunk;
  return chunk;
};

InputState.prototype.setChunks = function (chunk) {
  var self = this;
  chunk.before = chunk.before + chunk.startTag;
  chunk.after = chunk.endTag + chunk.after;
  self.start = chunk.before.length;
  self.end = chunk.before.length + chunk.selection.length;
  self.text = chunk.before + chunk.selection + chunk.after;
  self.scrollTop = chunk.scrollTop;
};

module.exports = InputState;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9JbnB1dFN0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgaXNWaXNpYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vaXNWaXNpYmxlRWxlbWVudCcpO1xudmFyIGZpeEVPTCA9IHJlcXVpcmUoJy4vZml4RU9MJyk7XG52YXIgTWFya2Rvd25DaHVua3MgPSByZXF1aXJlKCcuL21hcmtkb3duL01hcmtkb3duQ2h1bmtzJyk7XG52YXIgSHRtbENodW5rcyA9IHJlcXVpcmUoJy4vaHRtbC9IdG1sQ2h1bmtzJyk7XG52YXIgY2h1bmtzID0ge1xuICBtYXJrZG93bjogTWFya2Rvd25DaHVua3MsXG4gIGh0bWw6IEh0bWxDaHVua3MsXG4gIHd5c2l3eWc6IEh0bWxDaHVua3Ncbn07XG5cbmZ1bmN0aW9uIElucHV0U3RhdGUgKHN1cmZhY2UsIG1vZGUsIGluaXRpYWxTdGF0ZSkge1xuICB0aGlzLm1vZGUgPSBtb2RlO1xuICB0aGlzLnN1cmZhY2UgPSBzdXJmYWNlO1xuICB0aGlzLmluaXRpYWxTdGF0ZSA9IGluaXRpYWxTdGF0ZSB8fCBmYWxzZTtcbiAgdGhpcy5pbml0KCk7XG59XG5cbklucHV0U3RhdGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGVsID0gc2VsZi5zdXJmYWNlLmN1cnJlbnQoc2VsZi5tb2RlKTtcbiAgaWYgKCFpc1Zpc2libGVFbGVtZW50KGVsKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXRoaXMuaW5pdGlhbFN0YXRlICYmIGRvYy5hY3RpdmVFbGVtZW50ICYmIGRvYy5hY3RpdmVFbGVtZW50ICE9PSBlbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBzZWxmLnN1cmZhY2UucmVhZFNlbGVjdGlvbihzZWxmKTtcbiAgc2VsZi5zY3JvbGxUb3AgPSBlbC5zY3JvbGxUb3A7XG4gIGlmICghc2VsZi50ZXh0KSB7XG4gICAgc2VsZi50ZXh0ID0gc2VsZi5zdXJmYWNlLnJlYWQoc2VsZi5tb2RlKTtcbiAgfVxufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBlbCA9IHNlbGYuc3VyZmFjZS5jdXJyZW50KHNlbGYubW9kZSk7XG4gIGlmICghaXNWaXNpYmxlRWxlbWVudChlbCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc2VsZi5zdXJmYWNlLndyaXRlU2VsZWN0aW9uKHNlbGYpO1xufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUucmVzdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZWwgPSBzZWxmLnN1cmZhY2UuY3VycmVudChzZWxmLm1vZGUpO1xuICBpZiAodHlwZW9mIHNlbGYudGV4dCA9PT0gJ3N0cmluZycgJiYgc2VsZi50ZXh0ICE9PSBzZWxmLnN1cmZhY2UucmVhZChzZWxmLm1vZGUpKSB7XG4gICAgc2VsZi5zdXJmYWNlLndyaXRlKHNlbGYubW9kZSwgc2VsZi50ZXh0KTtcbiAgfVxuICBzZWxmLnNlbGVjdCgpO1xuICBlbC5zY3JvbGxUb3AgPSBzZWxmLnNjcm9sbFRvcDtcbn07XG5cbklucHV0U3RhdGUucHJvdG90eXBlLmdldENodW5rcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgY2h1bmsgPSBuZXcgY2h1bmtzW3NlbGYubW9kZV0oKTtcbiAgY2h1bmsuYmVmb3JlID0gZml4RU9MKHNlbGYudGV4dC5zdWJzdHJpbmcoMCwgc2VsZi5zdGFydCkpO1xuICBjaHVuay5zdGFydFRhZyA9ICcnO1xuICBjaHVuay5zZWxlY3Rpb24gPSBmaXhFT0woc2VsZi50ZXh0LnN1YnN0cmluZyhzZWxmLnN0YXJ0LCBzZWxmLmVuZCkpO1xuICBjaHVuay5lbmRUYWcgPSAnJztcbiAgY2h1bmsuYWZ0ZXIgPSBmaXhFT0woc2VsZi50ZXh0LnN1YnN0cmluZyhzZWxmLmVuZCkpO1xuICBjaHVuay5zY3JvbGxUb3AgPSBzZWxmLnNjcm9sbFRvcDtcbiAgc2VsZi5jYWNoZWRDaHVua3MgPSBjaHVuaztcbiAgcmV0dXJuIGNodW5rO1xufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuc2V0Q2h1bmtzID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2h1bmsuYmVmb3JlID0gY2h1bmsuYmVmb3JlICsgY2h1bmsuc3RhcnRUYWc7XG4gIGNodW5rLmFmdGVyID0gY2h1bmsuZW5kVGFnICsgY2h1bmsuYWZ0ZXI7XG4gIHNlbGYuc3RhcnQgPSBjaHVuay5iZWZvcmUubGVuZ3RoO1xuICBzZWxmLmVuZCA9IGNodW5rLmJlZm9yZS5sZW5ndGggKyBjaHVuay5zZWxlY3Rpb24ubGVuZ3RoO1xuICBzZWxmLnRleHQgPSBjaHVuay5iZWZvcmUgKyBjaHVuay5zZWxlY3Rpb24gKyBjaHVuay5hZnRlcjtcbiAgc2VsZi5zY3JvbGxUb3AgPSBjaHVuay5zY3JvbGxUb3A7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0U3RhdGU7XG4iXX0=
},{"./fixEOL":29,"./html/HtmlChunks":33,"./isVisibleElement":42,"./markdown/MarkdownChunks":44}],23:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var commands = {
  markdown: {
    boldOrItalic: require('./markdown/boldOrItalic'),
    linkOrImageOrAttachment: require('./markdown/linkOrImageOrAttachment'),
    blockquote: require('./markdown/blockquote'),
    codeblock: require('./markdown/codeblock'),
    heading: require('./markdown/heading'),
    list: require('./markdown/list'),
    hr: require('./markdown/hr')
  },
  html: {
    boldOrItalic: require('./html/boldOrItalic'),
    linkOrImageOrAttachment: require('./html/linkOrImageOrAttachment'),
    blockquote: require('./html/blockquote'),
    codeblock: require('./html/codeblock'),
    heading: require('./html/heading'),
    list: require('./html/list'),
    hr: require('./html/hr')
  }
};

commands.wysiwyg = commands.html;

function bindCommands (surface, options, editor) {
  bind('bold', 'cmd+b', bold);
  bind('italic', 'cmd+i', italic);
  bind('quote', 'cmd+j', router('blockquote'));
  bind('code', 'cmd+e', code);
  bind('ol', 'cmd+o', ol);
  bind('ul', 'cmd+u', ul);
  bind('heading', 'cmd+d', router('heading'));
  editor.showLinkDialog = fabricator(bind('link', 'cmd+k', linkOrImageOrAttachment('link')));
  editor.showImageDialog = fabricator(bind('image', 'cmd+g', linkOrImageOrAttachment('image')));
  editor.linkOrImageOrAttachment = linkOrImageOrAttachment;

  if (options.attachments) {
    editor.showAttachmentDialog = fabricator(bind('attachment', 'cmd+shift+k', linkOrImageOrAttachment('attachment')));
  }
  if (options.hr) { bind('hr', 'cmd+n', router('hr')); }

  function fabricator (el) {
    return function open () {
      crossvent.fabricate(el, 'click');
    };
  }
  function bold (mode, chunks) {
    commands[mode].boldOrItalic(chunks, 'bold');
  }
  function italic (mode, chunks) {
    commands[mode].boldOrItalic(chunks, 'italic');
  }
  function code (mode, chunks) {
    commands[mode].codeblock(chunks, { fencing: options.fencing });
  }
  function ul (mode, chunks) {
    commands[mode].list(chunks, false);
  }
  function ol (mode, chunks) {
    commands[mode].list(chunks, true);
  }
  function linkOrImageOrAttachment (type, autoUpload) {
    return function linkOrImageOrAttachmentInvoke (mode, chunks) {
      commands[mode].linkOrImageOrAttachment.call(this, chunks, {
        editor: editor,
        mode: mode,
        type: type,
        surface: surface,
        prompts: options.prompts,
        xhr: options.xhr,
        upload: options[type + 's'],
        classes: options.classes,
        mergeHtmlAndAttachment: options.mergeHtmlAndAttachment,
        autoUpload: autoUpload
      });
    };
  }
  function bind (id, combo, fn) {
    return editor.addCommandButton(id, combo, suppress(fn));
  }
  function router (method) {
    return function routed (mode, chunks) { commands[mode][method].call(this, chunks); };
  }
  function stop (e) {
    e.preventDefault(); e.stopPropagation();
  }
  function suppress (fn) {
    return function suppressor (e, mode, chunks) { stop(e); fn.call(this, mode, chunks); };
  }
}

module.exports = bindCommands;

},{"./html/blockquote":34,"./html/boldOrItalic":35,"./html/codeblock":36,"./html/heading":37,"./html/hr":38,"./html/linkOrImageOrAttachment":39,"./html/list":40,"./markdown/blockquote":45,"./markdown/boldOrItalic":46,"./markdown/codeblock":47,"./markdown/heading":48,"./markdown/hr":49,"./markdown/linkOrImageOrAttachment":50,"./markdown/list":51,"crossvent":6}],24:[function(require,module,exports){
'use strict';

function cast (collection) {
  var result = [];
  var i;
  var len = collection.length;
  for (i = 0; i < len; i++) {
    result.push(collection[i]);
  }
  return result;
}

module.exports = cast;

},{}],25:[function(require,module,exports){
'use strict';

var rinput = /^\s*(.*?)(?:\s+"(.+)")?\s*$/;
var rfull = /^(?:https?|ftp):\/\//;

function parseLinkInput (input) {
  return parser.apply(null, input.match(rinput));

  function parser (all, link, title) {
    var href = link.replace(/\?.*$/, queryUnencodedReplacer);
    href = decodeURIComponent(href);
    href = encodeURI(href).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
    href = href.replace(/\?.*$/, queryEncodedReplacer);

    return {
      href: formatHref(href), title: formatTitle(title)
    };
  }
}

function queryUnencodedReplacer (query) {
  return query.replace(/\+/g, ' ');
}

function queryEncodedReplacer (query) {
  return query.replace(/\+/g, '%2b');
}

function formatTitle (title) {
  if (!title) {
    return null;
  }

  return title
    .replace(/^\s+|\s+$/g, '')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatHref (url) {
  var href = url.replace(/^\s+|\s+$/g, '');
  if (href.length && href[0] !== '/' && !rfull.test(href)) {
    return 'http://' + href;
  }
  return href;
}

module.exports = parseLinkInput;

},{}],26:[function(require,module,exports){
'use strict';

function trim (remove) {
  var self = this;

  if (remove) {
    beforeReplacer = afterReplacer = '';
  }
  self.selection = self.selection.replace(/^(\s*)/, beforeReplacer).replace(/(\s*)$/, afterReplacer);

  function beforeReplacer (text) {
    self.before += text; return '';
  }
  function afterReplacer (text) {
    self.after = text + self.after; return '';
  }
}

module.exports = trim;

},{}],27:[function(require,module,exports){
'use strict';

var rtrim = /^\s+|\s+$/g;
var rspaces = /\s+/g;

function addClass (el, cls) {
  var current = el.className;
  if (current.indexOf(cls) === -1) {
    el.className = (current + ' ' + cls).replace(rtrim, '');
  }
}

function rmClass (el, cls) {
  el.className = el.className.replace(cls, '').replace(rtrim, '').replace(rspaces, ' ');
}

module.exports = {
  add: addClass,
  rm: rmClass
};

},{}],28:[function(require,module,exports){
'use strict';

function extendRegExp (regex, pre, post) {
  var pattern = regex.toString();
  var flags;

  pattern = pattern.replace(/\/([gim]*)$/, captureFlags);
  pattern = pattern.replace(/(^\/|\/$)/g, '');
  pattern = pre + pattern + post;
  return new RegExp(pattern, flags);

  function captureFlags (all, f) {
    flags = f;
    return '';
  }
}

module.exports = extendRegExp;

},{}],29:[function(require,module,exports){
'use strict';

function fixEOL (text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

module.exports = fixEOL;

},{}],30:[function(require,module,exports){
'use strict';

var InputState = require('./InputState');

function getCommandHandler (surface, history, fn) {
  return function handleCommand (e) {
    surface.focus(history.inputMode);
    history.setCommandMode();

    var state = new InputState(surface, history.inputMode);
    var chunks = state.getChunks();
    var asyncHandler = {
      async: async, immediate: true
    };

    fn.call(asyncHandler, e, history.inputMode, chunks);

    if (asyncHandler.immediate) {
      done();
    }

    function async () {
      asyncHandler.immediate = false;
      return done;
    }

    function done () {
      surface.focus(history.inputMode);
      state.setChunks(chunks);
      state.restore();
    }
  };
}

module.exports = getCommandHandler;

},{"./InputState":22}],31:[function(require,module,exports){
(function (global){
'use strict';

var doc = global.document;
var seleccion = require('seleccion');
var fixEOL = require('./fixEOL');
var many = require('./many');
var cast = require('./cast');
var getSelection = seleccion.get;
var setSelection = seleccion.set;
var ropen = /^(<[^>]+(?: [^>]*)?>)/;
var rclose = /(<\/[^>]+>)$/;

function surface (textarea, editable, droparea) {
  return {
    textarea: textarea,
    editable: editable,
    droparea: droparea,
    focus: setFocus,
    read: read,
    write: write,
    current: current,
    writeSelection: writeSelection,
    readSelection: readSelection
  };

  function setFocus (mode) {
    current(mode).focus();
  }

  function current (mode) {
    return mode === 'wysiwyg' ? editable : textarea;
  }

  function read (mode) {
    if (mode === 'wysiwyg') {
      return editable.innerHTML;
    }
    return textarea.value;
  }

  function write (mode, value) {
    if (mode === 'wysiwyg') {
      editable.innerHTML = value;
    } else {
      textarea.value = value;
    }
  }

  function writeSelection (state) {
    if (state.mode === 'wysiwyg') {
      writeSelectionEditable(state);
    } else {
      writeSelectionTextarea(state);
    }
  }

  function readSelection (state) {
    if (state.mode === 'wysiwyg') {
      readSelectionEditable(state);
    } else {
      readSelectionTextarea(state);
    }
  }

  function writeSelectionTextarea (state) {
    var range;
    if (textarea.selectionStart !== void 0) {
      textarea.focus();
      textarea.selectionStart = state.start;
      textarea.selectionEnd = state.end;
      textarea.scrollTop = state.scrollTop;
    } else if (doc.selection) {
      if (doc.activeElement && doc.activeElement !== textarea) {
        return;
      }
      textarea.focus();
      range = textarea.createTextRange();
      range.moveStart('character', -textarea.value.length);
      range.moveEnd('character', -textarea.value.length);
      range.moveEnd('character', state.end);
      range.moveStart('character', state.start);
      range.select();
    }
  }

  function readSelectionTextarea (state) {
    if (textarea.selectionStart !== void 0) {
      state.start = textarea.selectionStart;
      state.end = textarea.selectionEnd;
    } else if (doc.selection) {
      ancientlyReadSelectionTextarea(state);
    }
  }

  function ancientlyReadSelectionTextarea (state) {
    if (doc.activeElement && doc.activeElement !== textarea) {
      return;
    }

    state.text = fixEOL(textarea.value);

    var range = doc.selection.createRange();
    var fixedRange = fixEOL(range.text);
    var marker = '\x07';
    var markedRange = marker + fixedRange + marker;

    range.text = markedRange;

    var inputText = fixEOL(textarea.value);

    range.moveStart('character', -markedRange.length);
    range.text = fixedRange;
    state.start = inputText.indexOf(marker);
    state.end = inputText.lastIndexOf(marker) - marker.length;

    var diff = state.text.length - fixEOL(textarea.value).length;
    if (diff) {
      range.moveStart('character', -fixedRange.length);
      fixedRange += many('\n', diff);
      state.end += diff;
      range.text = fixedRange;
    }
    state.select();
  }

  function writeSelectionEditable (state) {
    var chunks = state.cachedChunks || state.getChunks();
    var start = chunks.before.length;
    var end = start + chunks.selection.length;
    var p = {};

    walk(editable.firstChild, peek);
    editable.focus();
    setSelection(p);

    function peek (context, el) {
      var cursor = context.text.length;
      var content = readNode(el).length;
      var sum = cursor + content;
      if (!p.startContainer && sum >= start) {
        p.startContainer = el;
        p.startOffset = bounded(start - cursor);
      }
      if (!p.endContainer && sum >= end) {
        p.endContainer = el;
        p.endOffset = bounded(end - cursor);
      }

      function bounded (offset) {
        return Math.max(0, Math.min(content, offset));
      }
    }
  }

  function readSelectionEditable (state) {
    var sel = getSelection();
    var distance = walk(editable.firstChild, peek);
    var start = distance.start || 0;
    var end = distance.end || 0;

    state.text = distance.text;

    if (end > start) {
      state.start = start;
      state.end = end;
    } else {
      state.start = end;
      state.end = start;
    }

    function peek (context, el) {
      if (el === sel.anchorNode) {
        context.start = context.text.length + sel.anchorOffset;
      }
      if (el === sel.focusNode) {
        context.end = context.text.length + sel.focusOffset;
      }
    }
  }

  function walk (el, peek, ctx, siblings) {
    var context = ctx || { text: '' };

    if (!el) {
      return context;
    }

    var elNode = el.nodeType === 1;
    var textNode = el.nodeType === 3;

    peek(context, el);

    if (textNode) {
      context.text += readNode(el);
    }
    if (elNode) {
      if (el.outerHTML.match(ropen)) { context.text += RegExp.$1; }
      cast(el.childNodes).forEach(walkChildren);
      if (el.outerHTML.match(rclose)) { context.text += RegExp.$1; }
    }
    if (siblings !== false && el.nextSibling) {
      return walk(el.nextSibling, peek, context);
    }
    return context;

    function walkChildren (child) {
      walk(child, peek, context, false);
    }
  }

  function readNode (el) {
    return el.nodeType === 3 ? fixEOL(el.textContent || el.innerText || '') : '';
  }
}

module.exports = surface;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9nZXRTdXJmYWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIHNlbGVjY2lvbiA9IHJlcXVpcmUoJ3NlbGVjY2lvbicpO1xudmFyIGZpeEVPTCA9IHJlcXVpcmUoJy4vZml4RU9MJyk7XG52YXIgbWFueSA9IHJlcXVpcmUoJy4vbWFueScpO1xudmFyIGNhc3QgPSByZXF1aXJlKCcuL2Nhc3QnKTtcbnZhciBnZXRTZWxlY3Rpb24gPSBzZWxlY2Npb24uZ2V0O1xudmFyIHNldFNlbGVjdGlvbiA9IHNlbGVjY2lvbi5zZXQ7XG52YXIgcm9wZW4gPSAvXig8W14+XSsoPzogW14+XSopPz4pLztcbnZhciByY2xvc2UgPSAvKDxcXC9bXj5dKz4pJC87XG5cbmZ1bmN0aW9uIHN1cmZhY2UgKHRleHRhcmVhLCBlZGl0YWJsZSwgZHJvcGFyZWEpIHtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0YXJlYTogdGV4dGFyZWEsXG4gICAgZWRpdGFibGU6IGVkaXRhYmxlLFxuICAgIGRyb3BhcmVhOiBkcm9wYXJlYSxcbiAgICBmb2N1czogc2V0Rm9jdXMsXG4gICAgcmVhZDogcmVhZCxcbiAgICB3cml0ZTogd3JpdGUsXG4gICAgY3VycmVudDogY3VycmVudCxcbiAgICB3cml0ZVNlbGVjdGlvbjogd3JpdGVTZWxlY3Rpb24sXG4gICAgcmVhZFNlbGVjdGlvbjogcmVhZFNlbGVjdGlvblxuICB9O1xuXG4gIGZ1bmN0aW9uIHNldEZvY3VzIChtb2RlKSB7XG4gICAgY3VycmVudChtb2RlKS5mb2N1cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3VycmVudCAobW9kZSkge1xuICAgIHJldHVybiBtb2RlID09PSAnd3lzaXd5ZycgPyBlZGl0YWJsZSA6IHRleHRhcmVhO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAobW9kZSkge1xuICAgIGlmIChtb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHJldHVybiBlZGl0YWJsZS5pbm5lckhUTUw7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChtb2RlLCB2YWx1ZSkge1xuICAgIGlmIChtb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIGVkaXRhYmxlLmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXh0YXJlYS52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlU2VsZWN0aW9uIChzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5tb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHdyaXRlU2VsZWN0aW9uRWRpdGFibGUoc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cml0ZVNlbGVjdGlvblRleHRhcmVhKHN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU2VsZWN0aW9uIChzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5tb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHJlYWRTZWxlY3Rpb25FZGl0YWJsZShzdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlYWRTZWxlY3Rpb25UZXh0YXJlYShzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVTZWxlY3Rpb25UZXh0YXJlYSAoc3RhdGUpIHtcbiAgICB2YXIgcmFuZ2U7XG4gICAgaWYgKHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ICE9PSB2b2lkIDApIHtcbiAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydCA9IHN0YXRlLnN0YXJ0O1xuICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uRW5kID0gc3RhdGUuZW5kO1xuICAgICAgdGV4dGFyZWEuc2Nyb2xsVG9wID0gc3RhdGUuc2Nyb2xsVG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jLnNlbGVjdGlvbikge1xuICAgICAgaWYgKGRvYy5hY3RpdmVFbGVtZW50ICYmIGRvYy5hY3RpdmVFbGVtZW50ICE9PSB0ZXh0YXJlYSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgcmFuZ2UgPSB0ZXh0YXJlYS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLXRleHRhcmVhLnZhbHVlLmxlbmd0aCk7XG4gICAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCAtdGV4dGFyZWEudmFsdWUubGVuZ3RoKTtcbiAgICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIHN0YXRlLmVuZCk7XG4gICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIHN0YXRlLnN0YXJ0KTtcbiAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRTZWxlY3Rpb25UZXh0YXJlYSAoc3RhdGUpIHtcbiAgICBpZiAodGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgIT09IHZvaWQgMCkge1xuICAgICAgc3RhdGUuc3RhcnQgPSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgIHN0YXRlLmVuZCA9IHRleHRhcmVhLnNlbGVjdGlvbkVuZDtcbiAgICB9IGVsc2UgaWYgKGRvYy5zZWxlY3Rpb24pIHtcbiAgICAgIGFuY2llbnRseVJlYWRTZWxlY3Rpb25UZXh0YXJlYShzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYW5jaWVudGx5UmVhZFNlbGVjdGlvblRleHRhcmVhIChzdGF0ZSkge1xuICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCAmJiBkb2MuYWN0aXZlRWxlbWVudCAhPT0gdGV4dGFyZWEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdGF0ZS50ZXh0ID0gZml4RU9MKHRleHRhcmVhLnZhbHVlKTtcblxuICAgIHZhciByYW5nZSA9IGRvYy5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICB2YXIgZml4ZWRSYW5nZSA9IGZpeEVPTChyYW5nZS50ZXh0KTtcbiAgICB2YXIgbWFya2VyID0gJ1xceDA3JztcbiAgICB2YXIgbWFya2VkUmFuZ2UgPSBtYXJrZXIgKyBmaXhlZFJhbmdlICsgbWFya2VyO1xuXG4gICAgcmFuZ2UudGV4dCA9IG1hcmtlZFJhbmdlO1xuXG4gICAgdmFyIGlucHV0VGV4dCA9IGZpeEVPTCh0ZXh0YXJlYS52YWx1ZSk7XG5cbiAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC1tYXJrZWRSYW5nZS5sZW5ndGgpO1xuICAgIHJhbmdlLnRleHQgPSBmaXhlZFJhbmdlO1xuICAgIHN0YXRlLnN0YXJ0ID0gaW5wdXRUZXh0LmluZGV4T2YobWFya2VyKTtcbiAgICBzdGF0ZS5lbmQgPSBpbnB1dFRleHQubGFzdEluZGV4T2YobWFya2VyKSAtIG1hcmtlci5sZW5ndGg7XG5cbiAgICB2YXIgZGlmZiA9IHN0YXRlLnRleHQubGVuZ3RoIC0gZml4RU9MKHRleHRhcmVhLnZhbHVlKS5sZW5ndGg7XG4gICAgaWYgKGRpZmYpIHtcbiAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLWZpeGVkUmFuZ2UubGVuZ3RoKTtcbiAgICAgIGZpeGVkUmFuZ2UgKz0gbWFueSgnXFxuJywgZGlmZik7XG4gICAgICBzdGF0ZS5lbmQgKz0gZGlmZjtcbiAgICAgIHJhbmdlLnRleHQgPSBmaXhlZFJhbmdlO1xuICAgIH1cbiAgICBzdGF0ZS5zZWxlY3QoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlU2VsZWN0aW9uRWRpdGFibGUgKHN0YXRlKSB7XG4gICAgdmFyIGNodW5rcyA9IHN0YXRlLmNhY2hlZENodW5rcyB8fCBzdGF0ZS5nZXRDaHVua3MoKTtcbiAgICB2YXIgc3RhcnQgPSBjaHVua3MuYmVmb3JlLmxlbmd0aDtcbiAgICB2YXIgZW5kID0gc3RhcnQgKyBjaHVua3Muc2VsZWN0aW9uLmxlbmd0aDtcbiAgICB2YXIgcCA9IHt9O1xuXG4gICAgd2FsayhlZGl0YWJsZS5maXJzdENoaWxkLCBwZWVrKTtcbiAgICBlZGl0YWJsZS5mb2N1cygpO1xuICAgIHNldFNlbGVjdGlvbihwKTtcblxuICAgIGZ1bmN0aW9uIHBlZWsgKGNvbnRleHQsIGVsKSB7XG4gICAgICB2YXIgY3Vyc29yID0gY29udGV4dC50ZXh0Lmxlbmd0aDtcbiAgICAgIHZhciBjb250ZW50ID0gcmVhZE5vZGUoZWwpLmxlbmd0aDtcbiAgICAgIHZhciBzdW0gPSBjdXJzb3IgKyBjb250ZW50O1xuICAgICAgaWYgKCFwLnN0YXJ0Q29udGFpbmVyICYmIHN1bSA+PSBzdGFydCkge1xuICAgICAgICBwLnN0YXJ0Q29udGFpbmVyID0gZWw7XG4gICAgICAgIHAuc3RhcnRPZmZzZXQgPSBib3VuZGVkKHN0YXJ0IC0gY3Vyc29yKTtcbiAgICAgIH1cbiAgICAgIGlmICghcC5lbmRDb250YWluZXIgJiYgc3VtID49IGVuZCkge1xuICAgICAgICBwLmVuZENvbnRhaW5lciA9IGVsO1xuICAgICAgICBwLmVuZE9mZnNldCA9IGJvdW5kZWQoZW5kIC0gY3Vyc29yKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYm91bmRlZCAob2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihjb250ZW50LCBvZmZzZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU2VsZWN0aW9uRWRpdGFibGUgKHN0YXRlKSB7XG4gICAgdmFyIHNlbCA9IGdldFNlbGVjdGlvbigpO1xuICAgIHZhciBkaXN0YW5jZSA9IHdhbGsoZWRpdGFibGUuZmlyc3RDaGlsZCwgcGVlayk7XG4gICAgdmFyIHN0YXJ0ID0gZGlzdGFuY2Uuc3RhcnQgfHwgMDtcbiAgICB2YXIgZW5kID0gZGlzdGFuY2UuZW5kIHx8IDA7XG5cbiAgICBzdGF0ZS50ZXh0ID0gZGlzdGFuY2UudGV4dDtcblxuICAgIGlmIChlbmQgPiBzdGFydCkge1xuICAgICAgc3RhdGUuc3RhcnQgPSBzdGFydDtcbiAgICAgIHN0YXRlLmVuZCA9IGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuc3RhcnQgPSBlbmQ7XG4gICAgICBzdGF0ZS5lbmQgPSBzdGFydDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwZWVrIChjb250ZXh0LCBlbCkge1xuICAgICAgaWYgKGVsID09PSBzZWwuYW5jaG9yTm9kZSkge1xuICAgICAgICBjb250ZXh0LnN0YXJ0ID0gY29udGV4dC50ZXh0Lmxlbmd0aCArIHNlbC5hbmNob3JPZmZzZXQ7XG4gICAgICB9XG4gICAgICBpZiAoZWwgPT09IHNlbC5mb2N1c05vZGUpIHtcbiAgICAgICAgY29udGV4dC5lbmQgPSBjb250ZXh0LnRleHQubGVuZ3RoICsgc2VsLmZvY3VzT2Zmc2V0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdhbGsgKGVsLCBwZWVrLCBjdHgsIHNpYmxpbmdzKSB7XG4gICAgdmFyIGNvbnRleHQgPSBjdHggfHwgeyB0ZXh0OiAnJyB9O1xuXG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuXG4gICAgdmFyIGVsTm9kZSA9IGVsLm5vZGVUeXBlID09PSAxO1xuICAgIHZhciB0ZXh0Tm9kZSA9IGVsLm5vZGVUeXBlID09PSAzO1xuXG4gICAgcGVlayhjb250ZXh0LCBlbCk7XG5cbiAgICBpZiAodGV4dE5vZGUpIHtcbiAgICAgIGNvbnRleHQudGV4dCArPSByZWFkTm9kZShlbCk7XG4gICAgfVxuICAgIGlmIChlbE5vZGUpIHtcbiAgICAgIGlmIChlbC5vdXRlckhUTUwubWF0Y2gocm9wZW4pKSB7IGNvbnRleHQudGV4dCArPSBSZWdFeHAuJDE7IH1cbiAgICAgIGNhc3QoZWwuY2hpbGROb2RlcykuZm9yRWFjaCh3YWxrQ2hpbGRyZW4pO1xuICAgICAgaWYgKGVsLm91dGVySFRNTC5tYXRjaChyY2xvc2UpKSB7IGNvbnRleHQudGV4dCArPSBSZWdFeHAuJDE7IH1cbiAgICB9XG4gICAgaWYgKHNpYmxpbmdzICE9PSBmYWxzZSAmJiBlbC5uZXh0U2libGluZykge1xuICAgICAgcmV0dXJuIHdhbGsoZWwubmV4dFNpYmxpbmcsIHBlZWssIGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dDtcblxuICAgIGZ1bmN0aW9uIHdhbGtDaGlsZHJlbiAoY2hpbGQpIHtcbiAgICAgIHdhbGsoY2hpbGQsIHBlZWssIGNvbnRleHQsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkTm9kZSAoZWwpIHtcbiAgICByZXR1cm4gZWwubm9kZVR5cGUgPT09IDMgPyBmaXhFT0woZWwudGV4dENvbnRlbnQgfHwgZWwuaW5uZXJUZXh0IHx8ICcnKSA6ICcnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3VyZmFjZTtcbiJdfQ==
},{"./cast":24,"./fixEOL":29,"./many":43,"seleccion":19}],32:[function(require,module,exports){
'use strict';

function getText (el) {
  return el.innerText || el.textContent;
}

module.exports = getText;

},{}],33:[function(require,module,exports){
'use strict';

var trimChunks = require('../chunks/trim');

function HtmlChunks () {
}

HtmlChunks.prototype.trim = trimChunks;

HtmlChunks.prototype.findTags = function () {
};

HtmlChunks.prototype.skip = function () {
};

module.exports = HtmlChunks;

},{"../chunks/trim":26}],34:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function blockquote (chunks) {
  wrapping('blockquote', strings.placeholders.quote, chunks);
}

module.exports = blockquote;

},{"../strings":61,"./wrapping":41}],35:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function boldOrItalic (chunks, type) {
  wrapping(type === 'bold' ? 'strong' : 'em', strings.placeholders[type], chunks);
}

module.exports = boldOrItalic;

},{"../strings":61,"./wrapping":41}],36:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function codeblock (chunks) {
  wrapping('pre><code', strings.placeholders.code, chunks);
}

module.exports = codeblock;

},{"../strings":61,"./wrapping":41}],37:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var rleading = /<h([1-6])( [^>]*)?>$/;
var rtrailing = /^<\/h([1-6])>/;

function heading (chunks) {
  chunks.trim();

  var trail = rtrailing.exec(chunks.after);
  var lead = rleading.exec(chunks.before);
  if (lead && trail && lead[1] === trail[1]) {
    swap();
  } else {
    add();
  }

  function swap () {
    var level = parseInt(lead[1], 10);
    var next = level <= 1 ? 4 : level - 1;
    chunks.before = chunks.before.replace(rleading, '<h' + next + '>');
    chunks.after = chunks.after.replace(rtrailing, '</h' + next + '>');
  }

  function add () {
    if (!chunks.selection) {
      chunks.selection = strings.placeholders.heading;
    }
    chunks.before += '<h1>';
    chunks.after = '</h1>' + chunks.after;
  }
}

module.exports = heading;

},{"../strings":61}],38:[function(require,module,exports){
'use strict';

function hr (chunks) {
  chunks.before += '\n<hr>\n';
  chunks.selection = '';
}

module.exports = hr;

},{}],39:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var once = require('../once');
var strings = require('../strings');
var parseLinkInput = require('../chunks/parseLinkInput');
var rleading = /<a( [^>]*)?>$/;
var rtrailing = /^<\/a>/;
var rimage = /<img( [^>]*)?\/>$/;

function linkOrImageOrAttachment (chunks, options) {
  var type = options.type;
  var image = type === 'image';
  var resume;

  if (type !== 'attachment') {
    chunks.trim();
  }

  if (removal()) {
    return;
  }

  resume = this.async();

  options.prompts.close();
  (options.prompts[type] || options.prompts.link)(options, once(resolved));

  function removal () {
    if (image) {
      if (rimage.test(chunks.selection)) {
        chunks.selection = '';
        return true;
      }
    } else if (rtrailing.exec(chunks.after) && rleading.exec(chunks.before)) {
      chunks.before = chunks.before.replace(rleading, '');
      chunks.after = chunks.after.replace(rtrailing, '');
      return true;
    }
  }

  function resolved (result) {
    var parts;
    var link = parseLinkInput(result.definition);
    if (link.href.length === 0) {
      resume(); return;
    }

    if (type === 'attachment') {
      parts = options.mergeHtmlAndAttachment(chunks.before + chunks.selection + chunks.after, link);
      chunks.before = parts.before;
      chunks.selection = parts.selection;
      chunks.after = parts.after;
      resume();
      crossvent.fabricate(options.surface.textarea, 'woofmark-mode-change');
      return;
    }

    var title = link.title ? ' title="' + link.title + '"' : '';

    if (image) {
      imageWrap();
    } else {
      linkWrap();
    }

    if (!chunks.selection) {
      chunks.selection = strings.placeholders[type];
    }
    resume();

    function imageWrap () {
      chunks.before += '<img src="' + link.href + '" alt="';
      chunks.after = '"' + title + ' />' + chunks.after;
    }

    function linkWrap () {
      var names = options.classes.input.links;
      var classes = names ? ' class="' + names + '"' : '';
      chunks.before += '<a href="' + link.href + '"' + title + classes + '>';
      chunks.after = '</a>' + chunks.after;
    }
  }
}

module.exports = linkOrImageOrAttachment;

},{"../chunks/parseLinkInput":25,"../once":54,"../strings":61,"crossvent":6}],40:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var rleftsingle = /<(ul|ol)( [^>]*)?>\s*<li( [^>]*)?>$/;
var rrightsingle = /^<\/li>\s*<\/(ul|ol)>/;
var rleftitem = /<li( [^>]*)?>$/;
var rrightitem = /^<\/li( [^>]*)?>/;
var ropen = /^<(ul|ol)( [^>]*)?>$/;

function list (chunks, ordered) {
  var tag = ordered ? 'ol' : 'ul';
  var olist = '<' + tag + '>';
  var clist = '</' + tag + '>';

  chunks.trim();

  if (rleftsingle.test(chunks.before) && rrightsingle.test(chunks.after)) {
    if (tag === RegExp.$1) {
      chunks.before = chunks.before.replace(rleftsingle, '');
      chunks.after = chunks.after.replace(rrightsingle, '');
      return;
    }
  }

  var ulStart = chunks.before.lastIndexOf('<ul');
  var olStart = chunks.before.lastIndexOf('<ol');
  var closeTag = chunks.after.indexOf('</ul>');
  if (closeTag === -1) {
    closeTag = chunks.after.indexOf('</ol>');
  }
  if (closeTag === -1) {
    add(); return;
  }
  var openStart = ulStart > olStart ? ulStart : olStart;
  if (openStart === -1) {
    add(); return;
  }
  var openEnd = chunks.before.indexOf('>', openStart);
  if (openEnd === -1) {
    add(); return;
  }

  var openTag = chunks.before.substr(openStart, openEnd - openStart + 1);
  if (ropen.test(openTag)) {
    if (tag !== RegExp.$1) {
      chunks.before = chunks.before.substr(0, openStart) + '<' + tag + chunks.before.substr(openStart + 3);
      chunks.after = chunks.after.substr(0, closeTag) + '</' + tag + chunks.after.substr(closeTag + 4);
    } else {
      if (rleftitem.test(chunks.before) && rrightitem.test(chunks.after)) {
        chunks.before = chunks.before.replace(rleftitem, '');
        chunks.after = chunks.after.replace(rrightitem, '');
      } else {
        add(true);
      }
    }
  }

  function add (list) {
    var open = list ? '' : olist;
    var close = list ? '' : clist;

    chunks.before += open + '<li>';
    chunks.after = '</li>' + close + chunks.after;

    if (!chunks.selection) {
      chunks.selection = strings.placeholders.listitem;
    }
  }
}

module.exports = list;

},{"../strings":61}],41:[function(require,module,exports){
'use strict';

function wrapping (tag, placeholder, chunks) {
  var open = '<' + tag;
  var close = '</' + tag.replace(/</g, '</');
  var rleading = new RegExp(open + '( [^>]*)?>$', 'i');
  var rtrailing = new RegExp('^' + close + '>', 'i');
  var ropen = new RegExp(open + '( [^>]*)?>', 'ig');
  var rclose = new RegExp(close + '( [^>]*)?>', 'ig');

  chunks.trim();

  var trail = rtrailing.exec(chunks.after);
  var lead = rleading.exec(chunks.before);
  if (lead && trail) {
    chunks.before = chunks.before.replace(rleading, '');
    chunks.after = chunks.after.replace(rtrailing, '');
  } else {
    if (!chunks.selection) {
      chunks.selection = placeholder;
    }
    var opened = ropen.test(chunks.selection);
    if (opened) {
      chunks.selection = chunks.selection.replace(ropen, '');
      if (!surrounded(chunks, tag)) {
        chunks.before += open + '>';
      }
    }
    var closed = rclose.test(chunks.selection);
    if (closed) {
      chunks.selection = chunks.selection.replace(rclose, '');
      if (!surrounded(chunks, tag)) {
        chunks.after = close + '>' + chunks.after;
      }
    }
    if (opened || closed) {
      pushover(); return;
    }
    if (surrounded(chunks, tag)) {
      if (rleading.test(chunks.before)) {
        chunks.before = chunks.before.replace(rleading, '');
      } else {
        chunks.before += close + '>';
      }
      if (rtrailing.test(chunks.after)) {
        chunks.after = chunks.after.replace(rtrailing, '');
      } else {
        chunks.after = open + '>' + chunks.after;
      }
    } else if (!closebounded(chunks, tag)) {
      chunks.after = close + '>' + chunks.after;
      chunks.before += open + '>';
    }
    pushover();
  }

  function pushover () {
    chunks.selection.replace(/<(\/)?([^> ]+)( [^>]*)?>/ig, pushoverOtherTags);
  }

  function pushoverOtherTags (all, closing, tag, a, i) {
    var attrs = a || '';
    var open = !closing;
    var rclosed = new RegExp('<\/' + tag.replace(/</g, '</') + '>', 'i');
    var ropened = new RegExp('<' + tag + '( [^>]*)?>', 'i');
    if (open && !rclosed.test(chunks.selection.substr(i))) {
      chunks.selection += '</' + tag + '>';
      chunks.after = chunks.after.replace(/^(<\/[^>]+>)/, '$1<' + tag + attrs + '>');
    }

    if (closing && !ropened.test(chunks.selection.substr(0, i))) {
      chunks.selection = '<' + tag + attrs + '>' + chunks.selection;
      chunks.before = chunks.before.replace(/(<[^>]+(?: [^>]*)?>)$/, '</' + tag + '>$1');
    }
  }
}

function closebounded (chunks, tag) {
  var rcloseleft = new RegExp('</' + tag.replace(/</g, '</') + '>$', 'i');
  var ropenright = new RegExp('^<' + tag + '(?: [^>]*)?>', 'i');
  var bounded = rcloseleft.test(chunks.before) && ropenright.test(chunks.after);
  if (bounded) {
    chunks.before = chunks.before.replace(rcloseleft, '');
    chunks.after = chunks.after.replace(ropenright, '');
  }
  return bounded;
}

function surrounded (chunks, tag) {
  var ropen = new RegExp('<' + tag + '(?: [^>]*)?>', 'ig');
  var rclose = new RegExp('<\/' + tag.replace(/</g, '</') + '>', 'ig');
  var opensBefore = count(chunks.before, ropen);
  var opensAfter = count(chunks.after, ropen);
  var closesBefore = count(chunks.before, rclose);
  var closesAfter = count(chunks.after, rclose);
  var open = opensBefore - closesBefore > 0;
  var close = closesAfter - opensAfter > 0;
  return open && close;

  function count (text, regex) {
    var match = text.match(regex);
    if (match) {
      return match.length;
    }
    return 0;
  }
}

module.exports = wrapping;

},{}],42:[function(require,module,exports){
(function (global){
'use strict';

function isVisibleElement (elem) {
  if (global.getComputedStyle) {
    return global.getComputedStyle(elem, null).getPropertyValue('display') !== 'none';
  } else if (elem.currentStyle) {
    return elem.currentStyle.display !== 'none';
  }
}

module.exports = isVisibleElement;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pc1Zpc2libGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaXNWaXNpYmxlRWxlbWVudCAoZWxlbSkge1xuICBpZiAoZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICByZXR1cm4gZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpICE9PSAnbm9uZSc7XG4gIH0gZWxzZSBpZiAoZWxlbS5jdXJyZW50U3R5bGUpIHtcbiAgICByZXR1cm4gZWxlbS5jdXJyZW50U3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNWaXNpYmxlRWxlbWVudDtcbiJdfQ==
},{}],43:[function(require,module,exports){
'use strict';

function many (text, times) {
  return new Array(times + 1).join(text);
}

module.exports = many;

},{}],44:[function(require,module,exports){
'use strict';

var many = require('../many');
var extendRegExp = require('../extendRegExp');
var trimChunks = require('../chunks/trim');
var re = RegExp;

function MarkdownChunks () {
}

MarkdownChunks.prototype.trim = trimChunks;

MarkdownChunks.prototype.findTags = function (startRegex, endRegex) {
  var self = this;
  var regex;

  if (startRegex) {
    regex = extendRegExp(startRegex, '', '$');
    this.before = this.before.replace(regex, startReplacer);
    regex = extendRegExp(startRegex, '^', '');
    this.selection = this.selection.replace(regex, startReplacer);
  }

  if (endRegex) {
    regex = extendRegExp(endRegex, '', '$');
    this.selection = this.selection.replace(regex, endReplacer);
    regex = extendRegExp(endRegex, '^', '');
    this.after = this.after.replace(regex, endReplacer);
  }

  function startReplacer (match) {
    self.startTag = self.startTag + match; return '';
  }

  function endReplacer (match) {
    self.endTag = match + self.endTag; return '';
  }
};

MarkdownChunks.prototype.skip = function (options) {
  var o = options || {};
  var beforeCount = 'before' in o ? o.before : 1;
  var afterCount = 'after' in o ? o.after : 1;

  this.selection = this.selection.replace(/(^\n*)/, '');
  this.startTag = this.startTag + re.$1;
  this.selection = this.selection.replace(/(\n*$)/, '');
  this.endTag = this.endTag + re.$1;
  this.startTag = this.startTag.replace(/(^\n*)/, '');
  this.before = this.before + re.$1;
  this.endTag = this.endTag.replace(/(\n*$)/, '');
  this.after = this.after + re.$1;

  if (this.before) {
    this.before = replace(this.before, ++beforeCount, '$');
  }

  if (this.after) {
    this.after = replace(this.after, ++afterCount, '');
  }

  function replace (text, count, suffix) {
    var regex = o.any ? '\\n*' : many('\\n?', count);
    var replacement = many('\n', count);
    return text.replace(new re(regex + suffix), replacement);
  }
};

module.exports = MarkdownChunks;

},{"../chunks/trim":26,"../extendRegExp":28,"../many":43}],45:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');
var settings = require('./settings');
var rtrailblankline = /(>[ \t]*)$/;
var rleadblankline = /^(>[ \t]*)/;
var rnewlinefencing = /^(\n*)([^\r]+?)(\n*)$/;
var rendtag = /^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/;
var rleadbracket = /^\n((>|\s)*)\n/;
var rtrailbracket = /\n((>|\s)*)\n$/;

function blockquote (chunks) {
  var match = '';
  var leftOver = '';
  var line;

  chunks.selection = chunks.selection.replace(rnewlinefencing, newlinereplacer);
  chunks.before = chunks.before.replace(rtrailblankline, trailblanklinereplacer);
  chunks.selection = chunks.selection.replace(/^(\s|>)+$/, '');
  chunks.selection = chunks.selection || strings.placeholders.quote;

  if (chunks.before) {
    beforeProcessing();
  }

  chunks.startTag = match;
  chunks.before = leftOver;

  if (chunks.after) {
    chunks.after = chunks.after.replace(/^\n?/, '\n');
  }

  chunks.after = chunks.after.replace(rendtag, endtagreplacer);

  if (/^(?![ ]{0,3}>)/m.test(chunks.selection)) {
    wrapping.wrap(chunks, settings.lineLength - 2);
    chunks.selection = chunks.selection.replace(/^/gm, '> ');
    replaceBlanksInTags(true);
    chunks.skip();
  } else {
    chunks.selection = chunks.selection.replace(/^[ ]{0,3}> ?/gm, '');
    wrapping.unwrap(chunks);
    replaceBlanksInTags(false);

    if (!/^(\n|^)[ ]{0,3}>/.test(chunks.selection) && chunks.startTag) {
      chunks.startTag = chunks.startTag.replace(/\n{0,2}$/, '\n\n');
    }

    if (!/(\n|^)[ ]{0,3}>.*$/.test(chunks.selection) && chunks.endTag) {
      chunks.endTag = chunks.endTag.replace(/^\n{0,2}/, '\n\n');
    }
  }

  if (!/\n/.test(chunks.selection)) {
    chunks.selection = chunks.selection.replace(rleadblankline, leadblanklinereplacer);
  }

  function newlinereplacer (all, before, text, after) {
    chunks.before += before;
    chunks.after = after + chunks.after;
    return text;
  }

  function trailblanklinereplacer (all, blank) {
    chunks.selection = blank + chunks.selection; return '';
  }

  function leadblanklinereplacer (all, blanks) {
    chunks.startTag += blanks; return '';
  }

  function beforeProcessing () {
    var lines = chunks.before.replace(/\n$/, '').split('\n');
    var chained = false;
    var good;

    for (var i = 0; i < lines.length; i++) {
      good = false;
      line = lines[i];
      chained = chained && line.length > 0;
      if (/^>/.test(line)) {
        good = true;
        if (!chained && line.length > 1) {
          chained = true;
        }
      } else if (/^[ \t]*$/.test(line)) {
        good = true;
      } else {
        good = chained;
      }
      if (good) {
        match += line + '\n';
      } else {
        leftOver += match + line;
        match = '\n';
      }
    }

    if (!/(^|\n)>/.test(match)) {
      leftOver += match;
      match = '';
    }
  }

  function endtagreplacer (all) {
    chunks.endTag = all; return '';
  }

  function replaceBlanksInTags (bracket) {
    var replacement = bracket ? '> ' : '';

    if (chunks.startTag) {
      chunks.startTag = chunks.startTag.replace(rtrailbracket, replacer);
    }
    if (chunks.endTag) {
      chunks.endTag = chunks.endTag.replace(rleadbracket, replacer);
    }

    function replacer (all, markdown) {
      return '\n' + markdown.replace(/^[ ]{0,3}>?[ \t]*$/gm, replacement) + '\n';
    }
  }
}

module.exports = blockquote;

},{"../strings":61,"./settings":52,"./wrapping":53}],46:[function(require,module,exports){
'use strict';

var rleading = /^(\**)/;
var rtrailing = /(\**$)/;
var rtrailingspace = /(\s?)$/;
var strings = require('../strings');

function boldOrItalic (chunks, type) {
  var rnewlines = /\n{2,}/g;
  var starCount = type === 'bold' ? 2 : 1;

  chunks.trim();
  chunks.selection = chunks.selection.replace(rnewlines, '\n');

  var markup;
  var leadStars = rtrailing.exec(chunks.before)[0];
  var trailStars = rleading.exec(chunks.after)[0];
  var stars = '\\*{' + starCount + '}';
  var fence = Math.min(leadStars.length, trailStars.length);
  if (fence >= starCount && (fence !== 2 || starCount !== 1)) {
    chunks.before = chunks.before.replace(new RegExp(stars + '$', ''), '');
    chunks.after = chunks.after.replace(new RegExp('^' + stars, ''), '');
  } else if (!chunks.selection && trailStars) {
    chunks.after = chunks.after.replace(rleading, '');
    chunks.before = chunks.before.replace(rtrailingspace, '') + trailStars + RegExp.$1;
  } else {
    if (!chunks.selection && !trailStars) {
      chunks.selection = strings.placeholders[type];
    }

    markup = starCount === 1 ? '*' : '**';
    chunks.before = chunks.before + markup;
    chunks.after = markup + chunks.after;
  }
}

module.exports = boldOrItalic;

},{"../strings":61}],47:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var rtextbefore = /\S[ ]*$/;
var rtextafter = /^[ ]*\S/;
var rnewline = /\n/;
var rbacktick = /`/;
var rfencebefore = /```[a-z]*\n?$/;
var rfencebeforeinside = /^```[a-z]*\n/;
var rfenceafter = /^\n?```/;
var rfenceafterinside = /\n```$/;

function codeblock (chunks, options) {
  var newlined = rnewline.test(chunks.selection);
  var trailing = rtextafter.test(chunks.after);
  var leading = rtextbefore.test(chunks.before);
  var outfenced = rfencebefore.test(chunks.before) && rfenceafter.test(chunks.after);
  if (outfenced || newlined || !(leading || trailing)) {
    block(outfenced);
  } else {
    inline();
  }

  function inline () {
    chunks.trim();
    chunks.findTags(rbacktick, rbacktick);

    if (!chunks.startTag && !chunks.endTag) {
      chunks.startTag = chunks.endTag = '`';
      if (!chunks.selection) {
        chunks.selection = strings.placeholders.code;
      }
    } else if (chunks.endTag && !chunks.startTag) {
      chunks.before += chunks.endTag;
      chunks.endTag = '';
    } else {
      chunks.startTag = chunks.endTag = '';
    }
  }

  function block (outfenced) {
    if (outfenced) {
      chunks.before = chunks.before.replace(rfencebefore, '');
      chunks.after = chunks.after.replace(rfenceafter, '');
      return;
    }

    chunks.before = chunks.before.replace(/[ ]{4}|```[a-z]*\n$/, mergeSelection);
    chunks.skip({
      before: /(\n|^)(\t|[ ]{4,}|```[a-z]*\n).*\n$/.test(chunks.before) ? 0 : 1,
      after: /^\n(\t|[ ]{4,}|\n```)/.test(chunks.after) ? 0 : 1
    });

    if (!chunks.selection) {
      if (options.fencing) {
        chunks.startTag = '```\n';
        chunks.endTag = '\n```';
      } else {
        chunks.startTag = '    ';
      }
      chunks.selection = strings.placeholders.code;
    } else {
      if (rfencebeforeinside.test(chunks.selection) && rfenceafterinside.test(chunks.selection)) {
        chunks.selection = chunks.selection.replace(/(^```[a-z]*\n)|(```$)/g, '');
      } else if (/^[ ]{0,3}\S/m.test(chunks.selection)) {
        if (options.fencing) {
          chunks.before += '```\n';
          chunks.after = '\n```' + chunks.after;
        } else if (newlined) {
          chunks.selection = chunks.selection.replace(/^/gm, '    ');
        } else {
          chunks.before += '    ';
        }
      } else {
        chunks.selection = chunks.selection.replace(/^(?:[ ]{4}|[ ]{0,3}\t|```[a-z]*)/gm, '');
      }
    }

    function mergeSelection (all) {
      chunks.selection = all + chunks.selection; return '';
    }
  }
}

module.exports = codeblock;

},{"../strings":61}],48:[function(require,module,exports){
'use strict';

var many = require('../many');
var strings = require('../strings');

function heading (chunks) {
  var level = 0;

  chunks.selection = chunks.selection
    .replace(/\s+/g, ' ')
    .replace(/(^\s+|\s+$)/g, '');

  if (!chunks.selection) {
    chunks.startTag = '# ';
    chunks.selection = strings.placeholders.heading;
    chunks.endTag = '';
    chunks.skip({ before: 1, after: 1 });
    return;
  }

  chunks.findTags(/#+[ ]*/, /[ ]*#+/);

  if (/#+/.test(chunks.startTag)) {
    level = RegExp.lastMatch.length;
  }

  chunks.startTag = chunks.endTag = '';
  chunks.findTags(null, /\s?(-+|=+)/);

  if (/=+/.test(chunks.endTag)) {
    level = 1;
  }

  if (/-+/.test(chunks.endTag)) {
    level = 2;
  }

  chunks.startTag = chunks.endTag = '';
  chunks.skip({ before: 1, after: 1 });

  var levelToCreate = level < 2 ? 4 : level - 1;
  if (levelToCreate > 0) {
    chunks.startTag = many('#', levelToCreate) + ' ';
  }
}

module.exports = heading;

},{"../many":43,"../strings":61}],49:[function(require,module,exports){
'use strict';

function hr (chunks) {
  chunks.startTag = '----------\n';
  chunks.selection = '';
  chunks.skip({ left: 2, right: 1, any: true });
}

module.exports = hr;

},{}],50:[function(require,module,exports){
'use strict';

var once = require('../once');
var strings = require('../strings');
var parseLinkInput = require('../chunks/parseLinkInput');
var rdefinitions = /^[ ]{0,3}\[((?:attachment-)?\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm;
var rattachment = /^attachment-(\d+)$/i;

function extractDefinitions (text, definitions) {
  rdefinitions.lastIndex = 0;
  return text.replace(rdefinitions, replacer);

  function replacer (all, id, link, newlines, title) {
    definitions[id] = all.replace(/\s*$/, '');
    if (newlines) {
      definitions[id] = all.replace(/["(](.+?)[")]$/, '');
      return newlines + title;
    }
    return '';
  }
}

function pushDefinition (chunks, definition, attachment) {
  var regex = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)((?:attachment-)?\d+)(\])/g;
  var anchor = 0;
  var definitions = {};
  var footnotes = [];

  chunks.before = extractDefinitions(chunks.before, definitions);
  chunks.selection = extractDefinitions(chunks.selection, definitions);
  chunks.after = extractDefinitions(chunks.after, definitions);
  chunks.before = chunks.before.replace(regex, getLink);

  if (definition) {
    if (!attachment) { pushAnchor(definition); }
  } else {
    chunks.selection = chunks.selection.replace(regex, getLink);
  }

  var result = anchor;

  chunks.after = chunks.after.replace(regex, getLink);

  if (chunks.after) {
    chunks.after = chunks.after.replace(/\n*$/, '');
  }
  if (!chunks.after) {
    chunks.selection = chunks.selection.replace(/\n*$/, '');
  }

  anchor = 0;
  Object.keys(definitions).forEach(pushAttachments);

  if (attachment) {
    pushAnchor(definition);
  }
  chunks.after += '\n\n' + footnotes.join('\n');

  return result;

  function pushAttachments (definition) {
    if (rattachment.test(definition)) {
      pushAnchor(definitions[definition]);
    }
  }

  function pushAnchor (definition) {
    anchor++;
    definition = definition.replace(/^[ ]{0,3}\[(attachment-)?(\d+)\]:/, '  [$1' + anchor + ']:');
    footnotes.push(definition);
  }

  function getLink (all, before, inner, afterInner, definition, end) {
    inner = inner.replace(regex, getLink);
    if (definitions[definition]) {
      pushAnchor(definitions[definition]);
      return before + inner + afterInner + anchor + end;
    }
    return all;
  }
}

function linkOrImageOrAttachment (chunks, options) {
  var type = options.type;
  var image = type === 'image';
  var resume;

  chunks.trim();
  chunks.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);

  if (chunks.endTag.length > 1 && chunks.startTag.length > 0) {
    chunks.startTag = chunks.startTag.replace(/!?\[/, '');
    chunks.endTag = '';
    pushDefinition(chunks);
    return;
  }

  chunks.selection = chunks.startTag + chunks.selection + chunks.endTag;
  chunks.startTag = chunks.endTag = '';

  if (/\n\n/.test(chunks.selection)) {
    pushDefinition(chunks);
    return;
  }
  resume = this.async();

  options.prompts.close();
  (options.prompts[type] || options.prompts.link)(options, once(resolved));

  function resolved (result) {
    var link = parseLinkInput(result.definition);
    if (link.href.length === 0) {
      resume(); return;
    }

    chunks.selection = (' ' + chunks.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, '$1\\').substr(1);

    var key = result.attachment ? '  [attachment-9999]: ' : ' [9999]: ';
    var definition = key + link.href + (link.title ? ' "' + link.title + '"' : '');
    var anchor = pushDefinition(chunks, definition, result.attachment);

    if (!result.attachment) {
      add();
    }

    resume();

    function add () {
      chunks.startTag = image ? '![' : '[';
      chunks.endTag = '][' + anchor + ']';

      if (!chunks.selection) {
        chunks.selection = strings.placeholders[type];
      }
    }
  }
}

module.exports = linkOrImageOrAttachment;

},{"../chunks/parseLinkInput":25,"../once":54,"../strings":61}],51:[function(require,module,exports){
'use strict';

var many = require('../many');
var strings = require('../strings');
var wrapping = require('./wrapping');
var settings = require('./settings');
var rprevious = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/;
var rnext = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/;
var rbullettype = /^\s*([*+-])/;
var rskipper = /[^\n]\n\n[^\n]/;

function pad (text) {
  return ' ' + text + ' ';
}

function list (chunks, ordered) {
  var bullet = '-';
  var num = 1;
  var digital;
  var beforeSkip = 1;
  var afterSkip = 1;

  chunks.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null);

  if (chunks.before && !/\n$/.test(chunks.before) && !/^\n/.test(chunks.startTag)) {
    chunks.before += chunks.startTag;
    chunks.startTag = '';
  }

  if (chunks.startTag) {
    digital = /\d+[.]/.test(chunks.startTag);
    chunks.startTag = '';
    chunks.selection = chunks.selection.replace(/\n[ ]{4}/g, '\n');
    wrapping.unwrap(chunks);
    chunks.skip();

    if (digital) {
      chunks.after = chunks.after.replace(rnext, getPrefixedItem);
    }
    if (ordered === digital) {
      return;
    }
  }

  chunks.before = chunks.before.replace(rprevious, beforeReplacer);

  if (!chunks.selection) {
    chunks.selection = strings.placeholders.listitem;
  }

  var prefix = nextBullet();
  var spaces = many(' ', prefix.length);

  chunks.after = chunks.after.replace(rnext, afterReplacer);
  chunks.trim(true);
  chunks.skip({ before: beforeSkip, after: afterSkip, any: true });
  chunks.startTag = prefix;
  wrapping.wrap(chunks, settings.lineLength - prefix.length);
  chunks.selection = chunks.selection.replace(/\n/g, '\n' + spaces);

  function beforeReplacer (text) {
    if (rbullettype.test(text)) {
      bullet = RegExp.$1;
    }
    beforeSkip = rskipper.test(text) ? 1 : 0;
    return getPrefixedItem(text);
  }

  function afterReplacer (text) {
    afterSkip = rskipper.test(text) ? 1 : 0;
    return getPrefixedItem(text);
  }

  function nextBullet () {
    if (ordered) {
      return pad((num++) + '.');
    }
    return pad(bullet);
  }

  function getPrefixedItem (text) {
    var rmarkers = /^[ ]{0,3}([*+-]|\d+[.])\s/gm;
    return text.replace(rmarkers, nextBullet);
  }
}

module.exports = list;

},{"../many":43,"../strings":61,"./settings":52,"./wrapping":53}],52:[function(require,module,exports){
'use strict';

module.exports = {
  lineLength: 72
};

},{}],53:[function(require,module,exports){
'use strict';

var prefixes = '(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)';
var rleadingprefixes = new RegExp('^' + prefixes, '');
var rtext = new RegExp('([^\\n])\\n(?!(\\n|' + prefixes + '))', 'g');
var rtrailingspaces = /\s+$/;

function wrap (chunks, len) {
  var regex = new RegExp('(.{1,' + len + '})( +|$\\n?)', 'gm');

  unwrap(chunks);
  chunks.selection = chunks.selection
    .replace(regex, replacer)
    .replace(rtrailingspaces, '');

  function replacer (line, marked) {
    return rleadingprefixes.test(line) ? line : marked + '\n';
  }
}

function unwrap (chunks) {
  rtext.lastIndex = 0;
  chunks.selection = chunks.selection.replace(rtext, '$1 $2');
}

module.exports = {
  wrap: wrap,
  unwrap: unwrap
};

},{}],54:[function(require,module,exports){
'use strict';

function once (fn) {
  var disposed;
  return function disposable () {
    if (disposed) {
      return;
    }
    disposed = true;
    return fn.apply(this, arguments);
  };
}

module.exports = once;

},{}],55:[function(require,module,exports){
'use strict';

var doc = document;

function homebrewQSA (className) {
  var results = [];
  var all = doc.getElementsByTagName('*');
  var i;
  for (i in all) {
    if (wrap(all[i].className).indexOf(wrap(className)) !== -1) {
      results.push(all[i]);
    }
  }
  return results;
}

function wrap (text) {
  return ' ' + text + ' ';
}

function closePrompts () {
  if (doc.body.querySelectorAll) {
    remove(doc.body.querySelectorAll('.wk-prompt'));
  } else {
    remove(homebrewQSA('wk-prompt'));
  }
}

function remove (prompts) {
  var len = prompts.length;
  var i;
  for (i = 0; i < len; i++) {
    prompts[i].parentElement.removeChild(prompts[i]);
  }
}

module.exports = closePrompts;

},{}],56:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var render = require('./render');
var classes = require('../classes');
var strings = require('../strings');
var uploads = require('../uploads');
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
var dragClass = 'wk-dragging';
var dragClassSpecific = 'wk-prompt-upload-dragging';
var root = document.documentElement;

function always () {
  return true;
}

function classify (group, classes) {
  Object.keys(group).forEach(customize);
  function customize (key) {
    if (classes[key]) {
      group[key].className += ' ' + classes[key];
    }
  }
}

function prompt (options, done) {
  var text = strings.prompts[options.type];
  var dom = render({
    id: 'wk-prompt-' + options.type,
    title: text.title,
    description: text.description,
    placeholder: text.placeholder
  });
  var domup;

  crossvent.add(dom.cancel, 'click', remove);
  crossvent.add(dom.close, 'click', remove);
  crossvent.add(dom.ok, 'click', ok);
  crossvent.add(dom.input, 'keypress', enter);
  crossvent.add(dom.dialog, 'keydown', esc);
  classify(dom, options.classes.prompts);

  var xhr = options.xhr;
  var upload = options.upload;
  if (typeof upload === 'string') {
    upload = { url: upload };
  }
  if (upload) {
    arrangeUploads();
  }
  if (options.autoUpload) {
    submit(options.autoUpload);
  }

  setTimeout(focusDialog, 0);

  function focusDialog () {
    dom.input.focus();
  }

  function enter (e) {
    var key = e.which || e.keyCode;
    if (key === ENTER_KEY) {
      ok();
      e.preventDefault();
    }
  }

  function esc (e) {
    var key = e.which || e.keyCode;
    if (key === ESCAPE_KEY) {
      remove();
      e.preventDefault();
    }
  }

  function ok () {
    remove();
    done({ definition: dom.input.value });
  }

  function remove () {
    if (upload) { bindUploadEvents(true); }
    if (dom.dialog.parentElement) { dom.dialog.parentElement.removeChild(dom.dialog); }
    options.surface.focus(options.mode);
  }

  function bindUploadEvents (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](root, 'dragenter', dragging);
    crossvent[op](root, 'dragend', dragstop);
    crossvent[op](root, 'mouseout', dragstop);
  }

  function warn () {
    classes.add(domup.warning, 'wk-prompt-error-show');
  }
  function dragging () {
    classes.add(domup.area, dragClass);
    classes.add(domup.area, dragClassSpecific);
  }
  function dragstop () {
    classes.rm(domup.area, dragClass);
    classes.rm(domup.area, dragClassSpecific);
    uploads.stop(options.surface.droparea);
  }

  function arrangeUploads () {
    domup = render.uploads(dom, strings.prompts.types + (upload.restriction || options.type + 's'));
    bindUploadEvents();

    crossvent.add(domup.fileinput, 'change', handleChange, false);
    crossvent.add(domup.area, 'dragover', handleDragOver, false);
    crossvent.add(domup.area, 'drop', handleFileSelect, false);
    classify(domup, options.classes.prompts);
  }

  function handleChange (e) {
    stop(e);
    submit(domup.fileinput.files);
    domup.fileinput.value = '';
    domup.fileinput.value = null;
  }

  function handleDragOver (e) {
    stop(e);
    e.dataTransfer.dropEffect = 'copy';
  }

  function handleFileSelect (e) {
    dragstop();
    stop(e);
    submit(e.dataTransfer.files);
  }

  function stop (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function valid (files) {
    var i;
    for (i = 0; i < files.length; i++) {
      if ((upload.validate || always)(files[i])) {
        return files[i];
      }
    }
    warn();
  }

  function submit (files) {
    classes.rm(domup.failed, 'wk-prompt-error-show');
    classes.rm(domup.warning, 'wk-prompt-error-show');
    var file = valid(files);
    if (!file) {
      return;
    }
    var form = new FormData();
    var req = {
      'Content-Type': 'multipart/form-data',
      headers: {
        Accept: 'application/json'
      },
      method: upload.method || 'PUT',
      url: upload.url,
      body: form
    };

    form.append(upload.key || 'woofmark_upload', file, file.name);
    classes.add(domup.area, 'wk-prompt-uploading');
    xhr(req, handleResponse);

    function handleResponse (err, res, body) {
      classes.rm(domup.area, 'wk-prompt-uploading');
      if (err || res.statusCode < 200 || res.statusCode > 299) {
        classes.add(domup.failed, 'wk-prompt-error-show');
        return;
      }
      dom.input.value = body.href + ' "' + body.title + '"';
      remove();
      done({ definition: dom.input.value, attachment: options.type === 'attachment' });
    }
  }
}

module.exports = prompt;

},{"../classes":27,"../strings":61,"../uploads":62,"./render":57,"crossvent":6}],57:[function(require,module,exports){
(function (global){
'use strict';

var crossvent = require('crossvent');
var getText = require('../getText');
var setText = require('../setText');
var classes = require('../classes');
var strings = require('../strings');
var ac = 'appendChild';
var doc = global.document;

function e (type, cls, text) {
  var el = doc.createElement(type);
  el.className = cls;
  if (text) {
    setText(el, text);
  }
  return el;
}

function render (options) {
  var dom = {
    dialog: e('article', 'wk-prompt ' + options.id),
    close: e('a', 'wk-prompt-close'),
    header: e('header', 'wk-prompt-header'),
    h1: e('h1', 'wk-prompt-title', options.title),
    section: e('section', 'wk-prompt-body'),
    desc: e('p', 'wk-prompt-description', options.description),
    inputContainer: e('div', 'wk-prompt-input-container'),
    input: e('input', 'wk-prompt-input'),
    cancel: e('button', 'wk-prompt-cancel', 'Cancel'),
    ok: e('button', 'wk-prompt-ok', 'Ok'),
    footer: e('footer', 'wk-prompt-buttons')
  };
  dom.ok.type = 'button';
  dom.header[ac](dom.h1);
  dom.section[ac](dom.desc);
  dom.section[ac](dom.inputContainer);
  dom.inputContainer[ac](dom.input);
  dom.input.placeholder = options.placeholder;
  dom.cancel.type = 'button';
  dom.footer[ac](dom.cancel);
  dom.footer[ac](dom.ok);
  dom.dialog[ac](dom.close);
  dom.dialog[ac](dom.header);
  dom.dialog[ac](dom.section);
  dom.dialog[ac](dom.footer);
  doc.body[ac](dom.dialog);
  return dom;
}

function uploads (dom, warning) {
  var fup = 'wk-prompt-fileupload';
  var domup = {
    area: e('section', 'wk-prompt-upload-area'),
    warning: e('p', 'wk-prompt-error wk-warning', warning),
    failed: e('p', 'wk-prompt-error wk-failed', strings.prompts.uploadfailed),
    upload: e('label', 'wk-prompt-upload'),
    uploading: e('span', 'wk-prompt-progress', strings.prompts.uploading),
    drop: e('span', 'wk-prompt-drop', strings.prompts.drop),
    dropicon: e('p', 'wk-drop-icon wk-prompt-drop-icon'),
    browse: e('span', 'wk-prompt-browse', strings.prompts.browse),
    dragdrop: e('p', 'wk-prompt-dragdrop', strings.prompts.drophint),
    fileinput: e('input', fup)
  };
  domup.area[ac](domup.drop);
  domup.area[ac](domup.uploading);
  domup.area[ac](domup.dropicon);
  domup.upload[ac](domup.browse);
  domup.upload[ac](domup.fileinput);
  domup.fileinput.id = fup;
  domup.fileinput.type = 'file';
  dom.dialog.className += ' wk-prompt-uploads';
  dom.inputContainer.className += ' wk-prompt-input-container-uploads';
  dom.input.className += ' wk-prompt-input-uploads';
  dom.section.insertBefore(domup.warning, dom.inputContainer);
  dom.section.insertBefore(domup.failed, dom.inputContainer);
  dom.section[ac](domup.upload);
  dom.section[ac](domup.dragdrop);
  dom.section[ac](domup.area);
  setText(dom.desc, getText(dom.desc) + strings.prompts.upload);
  crossvent.add(domup.fileinput, 'focus', focusedFileInput);
  crossvent.add(domup.fileinput, 'blur', blurredFileInput);

  function focusedFileInput () {
    classes.add(domup.upload, 'wk-focused');
  }
  function blurredFileInput () {
    classes.rm(domup.upload, 'wk-focused');
  }
  return domup;
}

render.uploads = uploads;
module.exports = render;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9wcm9tcHRzL3JlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgZ2V0VGV4dCA9IHJlcXVpcmUoJy4uL2dldFRleHQnKTtcbnZhciBzZXRUZXh0ID0gcmVxdWlyZSgnLi4vc2V0VGV4dCcpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuLi9jbGFzc2VzJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBhYyA9ICdhcHBlbmRDaGlsZCc7XG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuXG5mdW5jdGlvbiBlICh0eXBlLCBjbHMsIHRleHQpIHtcbiAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGVsLmNsYXNzTmFtZSA9IGNscztcbiAgaWYgKHRleHQpIHtcbiAgICBzZXRUZXh0KGVsLCB0ZXh0KTtcbiAgfVxuICByZXR1cm4gZWw7XG59XG5cbmZ1bmN0aW9uIHJlbmRlciAob3B0aW9ucykge1xuICB2YXIgZG9tID0ge1xuICAgIGRpYWxvZzogZSgnYXJ0aWNsZScsICd3ay1wcm9tcHQgJyArIG9wdGlvbnMuaWQpLFxuICAgIGNsb3NlOiBlKCdhJywgJ3drLXByb21wdC1jbG9zZScpLFxuICAgIGhlYWRlcjogZSgnaGVhZGVyJywgJ3drLXByb21wdC1oZWFkZXInKSxcbiAgICBoMTogZSgnaDEnLCAnd2stcHJvbXB0LXRpdGxlJywgb3B0aW9ucy50aXRsZSksXG4gICAgc2VjdGlvbjogZSgnc2VjdGlvbicsICd3ay1wcm9tcHQtYm9keScpLFxuICAgIGRlc2M6IGUoJ3AnLCAnd2stcHJvbXB0LWRlc2NyaXB0aW9uJywgb3B0aW9ucy5kZXNjcmlwdGlvbiksXG4gICAgaW5wdXRDb250YWluZXI6IGUoJ2RpdicsICd3ay1wcm9tcHQtaW5wdXQtY29udGFpbmVyJyksXG4gICAgaW5wdXQ6IGUoJ2lucHV0JywgJ3drLXByb21wdC1pbnB1dCcpLFxuICAgIGNhbmNlbDogZSgnYnV0dG9uJywgJ3drLXByb21wdC1jYW5jZWwnLCAnQ2FuY2VsJyksXG4gICAgb2s6IGUoJ2J1dHRvbicsICd3ay1wcm9tcHQtb2snLCAnT2snKSxcbiAgICBmb290ZXI6IGUoJ2Zvb3RlcicsICd3ay1wcm9tcHQtYnV0dG9ucycpXG4gIH07XG4gIGRvbS5vay50eXBlID0gJ2J1dHRvbic7XG4gIGRvbS5oZWFkZXJbYWNdKGRvbS5oMSk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb20uZGVzYyk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb20uaW5wdXRDb250YWluZXIpO1xuICBkb20uaW5wdXRDb250YWluZXJbYWNdKGRvbS5pbnB1dCk7XG4gIGRvbS5pbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXI7XG4gIGRvbS5jYW5jZWwudHlwZSA9ICdidXR0b24nO1xuICBkb20uZm9vdGVyW2FjXShkb20uY2FuY2VsKTtcbiAgZG9tLmZvb3RlclthY10oZG9tLm9rKTtcbiAgZG9tLmRpYWxvZ1thY10oZG9tLmNsb3NlKTtcbiAgZG9tLmRpYWxvZ1thY10oZG9tLmhlYWRlcik7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5zZWN0aW9uKTtcbiAgZG9tLmRpYWxvZ1thY10oZG9tLmZvb3Rlcik7XG4gIGRvYy5ib2R5W2FjXShkb20uZGlhbG9nKTtcbiAgcmV0dXJuIGRvbTtcbn1cblxuZnVuY3Rpb24gdXBsb2FkcyAoZG9tLCB3YXJuaW5nKSB7XG4gIHZhciBmdXAgPSAnd2stcHJvbXB0LWZpbGV1cGxvYWQnO1xuICB2YXIgZG9tdXAgPSB7XG4gICAgYXJlYTogZSgnc2VjdGlvbicsICd3ay1wcm9tcHQtdXBsb2FkLWFyZWEnKSxcbiAgICB3YXJuaW5nOiBlKCdwJywgJ3drLXByb21wdC1lcnJvciB3ay13YXJuaW5nJywgd2FybmluZyksXG4gICAgZmFpbGVkOiBlKCdwJywgJ3drLXByb21wdC1lcnJvciB3ay1mYWlsZWQnLCBzdHJpbmdzLnByb21wdHMudXBsb2FkZmFpbGVkKSxcbiAgICB1cGxvYWQ6IGUoJ2xhYmVsJywgJ3drLXByb21wdC11cGxvYWQnKSxcbiAgICB1cGxvYWRpbmc6IGUoJ3NwYW4nLCAnd2stcHJvbXB0LXByb2dyZXNzJywgc3RyaW5ncy5wcm9tcHRzLnVwbG9hZGluZyksXG4gICAgZHJvcDogZSgnc3BhbicsICd3ay1wcm9tcHQtZHJvcCcsIHN0cmluZ3MucHJvbXB0cy5kcm9wKSxcbiAgICBkcm9waWNvbjogZSgncCcsICd3ay1kcm9wLWljb24gd2stcHJvbXB0LWRyb3AtaWNvbicpLFxuICAgIGJyb3dzZTogZSgnc3BhbicsICd3ay1wcm9tcHQtYnJvd3NlJywgc3RyaW5ncy5wcm9tcHRzLmJyb3dzZSksXG4gICAgZHJhZ2Ryb3A6IGUoJ3AnLCAnd2stcHJvbXB0LWRyYWdkcm9wJywgc3RyaW5ncy5wcm9tcHRzLmRyb3BoaW50KSxcbiAgICBmaWxlaW5wdXQ6IGUoJ2lucHV0JywgZnVwKVxuICB9O1xuICBkb211cC5hcmVhW2FjXShkb211cC5kcm9wKTtcbiAgZG9tdXAuYXJlYVthY10oZG9tdXAudXBsb2FkaW5nKTtcbiAgZG9tdXAuYXJlYVthY10oZG9tdXAuZHJvcGljb24pO1xuICBkb211cC51cGxvYWRbYWNdKGRvbXVwLmJyb3dzZSk7XG4gIGRvbXVwLnVwbG9hZFthY10oZG9tdXAuZmlsZWlucHV0KTtcbiAgZG9tdXAuZmlsZWlucHV0LmlkID0gZnVwO1xuICBkb211cC5maWxlaW5wdXQudHlwZSA9ICdmaWxlJztcbiAgZG9tLmRpYWxvZy5jbGFzc05hbWUgKz0gJyB3ay1wcm9tcHQtdXBsb2Fkcyc7XG4gIGRvbS5pbnB1dENvbnRhaW5lci5jbGFzc05hbWUgKz0gJyB3ay1wcm9tcHQtaW5wdXQtY29udGFpbmVyLXVwbG9hZHMnO1xuICBkb20uaW5wdXQuY2xhc3NOYW1lICs9ICcgd2stcHJvbXB0LWlucHV0LXVwbG9hZHMnO1xuICBkb20uc2VjdGlvbi5pbnNlcnRCZWZvcmUoZG9tdXAud2FybmluZywgZG9tLmlucHV0Q29udGFpbmVyKTtcbiAgZG9tLnNlY3Rpb24uaW5zZXJ0QmVmb3JlKGRvbXVwLmZhaWxlZCwgZG9tLmlucHV0Q29udGFpbmVyKTtcbiAgZG9tLnNlY3Rpb25bYWNdKGRvbXVwLnVwbG9hZCk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb211cC5kcmFnZHJvcCk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb211cC5hcmVhKTtcbiAgc2V0VGV4dChkb20uZGVzYywgZ2V0VGV4dChkb20uZGVzYykgKyBzdHJpbmdzLnByb21wdHMudXBsb2FkKTtcbiAgY3Jvc3N2ZW50LmFkZChkb211cC5maWxlaW5wdXQsICdmb2N1cycsIGZvY3VzZWRGaWxlSW5wdXQpO1xuICBjcm9zc3ZlbnQuYWRkKGRvbXVwLmZpbGVpbnB1dCwgJ2JsdXInLCBibHVycmVkRmlsZUlucHV0KTtcblxuICBmdW5jdGlvbiBmb2N1c2VkRmlsZUlucHV0ICgpIHtcbiAgICBjbGFzc2VzLmFkZChkb211cC51cGxvYWQsICd3ay1mb2N1c2VkJyk7XG4gIH1cbiAgZnVuY3Rpb24gYmx1cnJlZEZpbGVJbnB1dCAoKSB7XG4gICAgY2xhc3Nlcy5ybShkb211cC51cGxvYWQsICd3ay1mb2N1c2VkJyk7XG4gIH1cbiAgcmV0dXJuIGRvbXVwO1xufVxuXG5yZW5kZXIudXBsb2FkcyA9IHVwbG9hZHM7XG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlcjtcbiJdfQ==
},{"../classes":27,"../getText":32,"../setText":60,"../strings":61,"crossvent":6}],58:[function(require,module,exports){
'use strict';

var bullseye = require('bullseye');
var ranchored = /^[#>*-]$/;
var rboundary = /^[*_`#-]$/;
var rbulletafter = /^\d+\. /;
var rbulletline = /^\s*\d+\.$/;
var rbulletleft = /^\s*\d+$/;
var rbulletright = /\d|\./;
var rwhitespace = /^\s*$/;
var rhr = /^---+$/;
var rend = /^$|\s|\n/;
var rfootnotedeclaration = /^\[[^\]]+\]\s*:\s*[A-z\/]/;
var rfootnotebegin = /^\s*\[[^\]]*$/;
var rfootnotebegan = /^\s*\[[^\]]+$/;
var rfootnoteleft = /^\s*\[[^\]]+\]\s*$/;
var rfootnoteanchor = /^\s*\[[^\]]+\]\s*:$/;
var rfootnotelink = /^\s*\[[^\]]+\]\s*:\s*[A-z\/]/;
var rfootnotefull = /^\s*\[[^\]]+\]\s*:\s*[A-z\/].*\s*"[^"]*"/;
var rspaceorquote = /\s|"/;
var rspaceorcolon = /\s|:/;
var rempty = /^(<p><\/p>)?\n?$/i;

function rememberSelection (history) {
  var code = Math.random().toString(18).substr(2).replace(/\d+/g, '');
  var open = 'WoofmarkSelectionOpenMarker' + code;
  var close = 'WoofmarkSelectionCloseMarker' + code;
  var rmarkers = new RegExp(open + '|' + close, 'g');
  mark();
  return unmark;

  function mark () {
    var state = history.reset().inputState;
    var chunks = state.getChunks();
    var mode = state.mode;
    var all = chunks.before + chunks.selection + chunks.after;
    if (rempty.test(all)) {
      return;
    }
    if (mode === 'markdown') {
      updateMarkdownChunks(chunks);
    } else {
      updateHTMLChunks(chunks);
    }
    state.setChunks(chunks);
    state.restore(false);
  }

  function unmark () {
    var state = history.inputState;
    var chunks = state.getChunks();
    var all = chunks.before + chunks.selection + chunks.after;
    var start = all.lastIndexOf(open);
    var end = all.lastIndexOf(close) + close.length;
    var selectionStart = start === -1 ? 0 : start;
    var selectionEnd = end === -1 ? 0 : end;
    chunks.before = all.substr(0, selectionStart).replace(rmarkers, '');
    chunks.selection = all.substr(selectionStart, selectionEnd - selectionStart).replace(rmarkers, '');
    chunks.after = all.substr(end).replace(rmarkers, '');
    var el = history.surface.current(history.inputMode);
    var eye = bullseye(el, {
      caret: true, autoupdateToCaret: false, tracking: false
    });
    state.setChunks(chunks);
    state.restore(false);
    state.scrollTop = el.scrollTop = eye.read().y - el.getBoundingClientRect().top - 50;
    eye.destroy();
  }

  function updateMarkdownChunks (chunks) {
    var all = chunks.before + chunks.selection + chunks.after;
    var originalStart = chunks.before.length;
    var originalEnd = originalStart + chunks.selection.length;
    var selectionStart = move(originalStart, 1);
    var selectionEnd = move(originalEnd, -1);
    var moved = originalStart !== selectionStart || originalEnd !== selectionEnd;

    updateSelection(chunks, all, selectionStart, selectionEnd, moved);

    function move (p, offset) {
      var prev = all[p - 1] || '';
      var next = all[p] || '';
      var line = backtrace(p - 1, '\n');
      var jumps = prev === '' || prev === '\n';

      if (next === ' ' && (jumps || prev === ' ')) {
        return again();
      }

      var close = backtrace(p - 1, ']');
      var reopened = close.indexOf('[');

      // these two handle anchored references '[foo][1]', or even '[bar]  \n [2]'
      if (reopened !== -1 && rwhitespace.test(close.substr(0, reopened))) {
        return again(-close.length);
      } else {
        reopened = all.substr(p).indexOf('[');
        if (reopened !== -1 && rwhitespace.test(all.substr(p, reopened))) {
          return again(-1);
        }
      }

      // the seven following rules together handle footnote references
      if ((jumps || rwhitespace.test(line)) && rfootnotedeclaration.test(all.substr(p))) {
        return again(); // started with '', '\n', or '  ' and continued with '[a-1]: h'
      }
      if (rfootnotebegin.test(line) && next !== ']') {
        return again(); // started with '[' and continued with 'a-1'
      }
      if (rfootnotebegan.test(line) && next === ']') {
        return again(); // started with '[a-1' and continued with ']: h'
      }
      if (rfootnoteleft.test(line) && rspaceorcolon.test(next)) {
        return again(); // started with '[a-1]  ' and continued with ':'
      }
      if (rfootnoteanchor.test(line) && next === ' ') {
        return again(); // started with '[a-1]  :' and continued with ' '
      }
      if (rfootnotelink.test(line) && prev === ' ' && rspaceorquote.test(next) && offset === 1) {
        return again(); // started with '[a-1]  :' and continued with ' ', or '"', on the left
      }
      if (rfootnotefull.test(line) && rend.test(next)) {
        return again(-1); // started with '[a-1]  : something "something"' and continued with '', ' ', or '\n'
      }

      // the three following rules together handle ordered list items: '\n1. foo\n2. bar'
      if ((jumps || rwhitespace.test(line)) && rbulletafter.test(all.substr(p))) {
        return again(); // started with '', '\n', or '  ' and continued with '123. '
      }
      if (rbulletleft.test(line) && rbulletright.test(next)) {
        return again(); // started with '  123' and ended in '4' or '.'
      }
      if (rbulletline.test(line) && next === ' ') {
        return again(); // started with '  123.' and ended with ' '
      }

      if (ranchored.test(next) && jumps) {
        return again();
      }
      if (ranchored.test(prev) && next === ' ') {
        return again();
      }
      if (next === prev && rboundary.test(next)) {
        return again();
      }
      if (rhr.test(line) && next === '\n') {
        return again();
      }
      if (all.substr(p - 3, 3) === '```' && offset === 1) { // handles '```javascript\ncode\n```'
        while (all[p - 1] && all[p - 1] !== '\n') {
          p++;
        }
      }
      return p;

      function again (override) {
        var diff = override || offset;
        return move(p + diff, diff > 0 ? 1 : -1);
      }
      function backtrace (p, edge) {
        var last = all[p];
        var text = '';
        while (last && last !== edge) {
          text = last + text;
          last = all[--p];
        }
        return text;
      }
    }
  }

  function updateHTMLChunks (chunks) {
    var all = chunks.before + chunks.selection + chunks.after;
    var selectionStart = chunks.before.length;
    var selectionEnd = selectionStart + chunks.selection.length;
    var leftClose = chunks.before.lastIndexOf('>');
    var leftOpen = chunks.before.lastIndexOf('<');
    var rightClose = chunks.after.indexOf('>');
    var rightOpen = chunks.after.indexOf('<');
    var prevOpen;
    var nextClose;
    var balanceTags;

    // <fo[o]>bar</foo> into <foo>[]bar</foo>, <fo[o>ba]r</foo> into <foo>[ba]r</foo>
    if (leftOpen > leftClose) {
      nextClose = all.indexOf('>', leftClose + 1);
      if (nextClose !== -1) {
        selectionStart = nextClose + 1;
        balanceTags = true;
      }
    }

    // <foo>bar</[fo]o> into <foo>bar[]</foo>, <foo>b[ar</f]oo> into <foo>b[ar]</foo>
    if (rightOpen === -1 || rightOpen > rightClose) {
      prevOpen = all.substr(0, chunks.before.length + chunks.selection.length + rightClose).lastIndexOf('<');
      if (prevOpen !== -1) {
        selectionEnd = prevOpen;
        selectionStart = Math.min(selectionStart, selectionEnd);
        balanceTags = true;
      }
    }

    updateSelection(chunks, all, selectionStart, selectionEnd, balanceTags);
  }

  function updateSelection (chunks, all, selectionStart, selectionEnd, balanceTags) {
    if (selectionEnd < selectionStart) {
      selectionEnd = selectionStart;
    }
    if (balanceTags) {
      chunks.before = all.substr(0, selectionStart);
      chunks.selection = all.substr(selectionStart, selectionEnd - selectionStart);
      chunks.after = all.substr(selectionEnd);
    }
    chunks.selection = open + chunks.selection + close;
  }
}

module.exports = rememberSelection;

},{"bullseye":1}],59:[function(require,module,exports){
'use strict';

var setText = require('./setText');
var strings = require('./strings');

function commands (el, id) {
  setText(el, strings.buttons[id] || id);
}

function modes (el, id) {
  var texts = {
    markdown: 'm\u2193',
    wysiwyg: 'wysiwyg'
  };
  setText(el, texts[id] || id);
}

module.exports = {
  modes: modes,
  commands: commands
};

},{"./setText":60,"./strings":61}],60:[function(require,module,exports){
'use strict';

function setText (el, value) {
  el.innerText = el.textContent = value;
}

module.exports = setText;

},{}],61:[function(require,module,exports){
'use strict';

module.exports = {
  placeholders: {
    bold: 'strong text',
    italic: 'emphasized text',
    quote: 'quoted text',
    code: 'code goes here',
    listitem: 'list item',
    heading: 'Heading Text',
    link: 'link text',
    image: 'image description',
    attachment: 'attachment description'
  },
  titles: {
    bold: 'Strong <strong> Ctrl+B',
    italic: 'Emphasis <em> Ctrl+I',
    quote: 'Blockquote <blockquote> Ctrl+J',
    code: 'Code Sample <pre><code> Ctrl+E',
    ol: 'Numbered List <ol> Ctrl+O',
    ul: 'Bulleted List <ul> Ctrl+U',
    heading: 'Heading <h1>, <h2>, ... Ctrl+D',
    link: 'Hyperlink <a> Ctrl+K',
    image: 'Image <img> Ctrl+G',
    attachment: 'Attachment Ctrl+Shift+K',
    markdown: 'Markdown Mode Ctrl+M',
    html: 'HTML Mode Ctrl+H',
    wysiwyg: 'Preview Mode Ctrl+P'
  },
  buttons: {
    bold: 'B',
    italic: 'I',
    quote: '\u201c',
    code: '</>',
    ol: '1.',
    ul: '\u29BF',
    heading: 'Tt',
    link: 'Link',
    image: 'Image',
    attachment: 'Attachment',
    hr: '\u21b5'
  },
  prompts: {
    link: {
      title: 'Insert Link',
      description: 'Type or paste the url to your link',
      placeholder: 'http://example.com/ "title"'
    },
    image: {
      title: 'Insert Image',
      description: 'Enter the url to your image',
      placeholder: 'http://example.com/public/image.png "title"'
    },
    attachment: {
      title: 'Attach File',
      description: 'Enter the url to your attachment',
      placeholder: 'http://example.com/public/report.pdf "title"'
    },
    types: 'You can only upload ',
    browse: 'Browse...',
    drophint: 'You can also drag files from your computer and drop them here!',
    drop: 'Drop your file here to begin upload...',
    upload: ', or upload a file',
    uploading: 'Uploading your file...',
    uploadfailed: 'The upload failed! That\'s all we know.'
  }
};

},{}],62:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var classes = require('./classes');
var dragClass = 'wk-dragging';
var dragClassSpecific = 'wk-container-dragging';
var root = document.documentElement;

function uploads (container, droparea, editor, options, remove) {
  var op = remove ? 'remove' : 'add';
  crossvent[op](root, 'dragenter', dragging);
  crossvent[op](root, 'dragend', dragstop);
  crossvent[op](root, 'mouseout', dragstop);
  crossvent[op](container, 'dragover', handleDragOver, false);
  crossvent[op](droparea, 'drop', handleFileSelect, false);

  function dragging () {
    classes.add(droparea, dragClass);
    classes.add(droparea, dragClassSpecific);
  }
  function dragstop () {
    dragstopper(droparea);
  }
  function handleDragOver (e) {
    stop(e);
    dragging();
    e.dataTransfer.dropEffect = 'copy';
  }
  function handleFileSelect (e) {
    dragstop();
    stop(e);
    editor.runCommand(function runner (chunks, mode) {
      var files = Array.prototype.slice.call(e.dataTransfer.files);
      var type = inferType(files);
      editor.linkOrImageOrAttachment(type, files).call(this, mode, chunks);
    });
  }
  function inferType (files) {
    if (options.images && !options.attachments) {
      return 'image';
    }
    if (!options.images && options.attachments) {
      return 'attachment';
    }
    if (files.every(matches(options.images.validate || never))) {
      return 'image';
    }
    return 'attachment';
  }
}

function matches (fn) {
  return function matcher (file) { return fn(file); };
}
function never () {
  return false;
}
function stop (e) {
  e.stopPropagation();
  e.preventDefault();
}
function dragstopper (droparea) {
  classes.rm(droparea, dragClass);
  classes.rm(droparea, dragClassSpecific);
}

uploads.stop = dragstopper;
module.exports = uploads;

},{"./classes":27,"crossvent":6}],63:[function(require,module,exports){
(function (global){
'use strict';

var ls = require('local-storage');
var crossvent = require('crossvent');
var kanye = require('kanye');
var uploads = require('./uploads');
var strings = require('./strings');
var setText = require('./setText');
var rememberSelection = require('./rememberSelection');
var bindCommands = require('./bindCommands');
var InputHistory = require('./InputHistory');
var getCommandHandler = require('./getCommandHandler');
var getSurface = require('./getSurface');
var classes = require('./classes');
var renderers = require('./renderers');
var xhrStub = require('./xhrStub');
var prompt = require('./prompts/prompt');
var closePrompts = require('./prompts/close');
var modeNames = ['markdown', 'html', 'wysiwyg'];
var cache = [];
var mac = /\bMac OS\b/.test(global.navigator.userAgent);
var doc = document;
var rparagraph = /^<p><\/p>\n?$/i;

function find (textarea) {
  for (var i = 0; i < cache.length; i++) {
    if (cache[i] && cache[i].ta === textarea) {
      return cache[i].editor;
    }
  }
  return null;
}

function woofmark (textarea, options) {
  var cached = find(textarea);
  if (cached) {
    return cached;
  }

  var parent = textarea.parentElement;
  if (parent.children.length > 1) {
    throw new Error('woofmark demands <textarea> elements to have no siblings');
  }

  var o = options || {};
  if (o.markdown === void 0) { o.markdown = true; }
  if (o.html === void 0) { o.html = true; }
  if (o.wysiwyg === void 0) { o.wysiwyg = true; }

  if (!o.markdown && !o.html && !o.wysiwyg) {
    throw new Error('woofmark expects at least one input mode to be available');
  }

  if (o.hr === void 0) { o.hr = false; }
  if (o.storage === void 0) { o.storage = true; }
  if (o.storage === true) { o.storage = 'woofmark_input_mode'; }
  if (o.fencing === void 0) { o.fencing = true; }
  if (o.render === void 0) { o.render = {}; }
  if (o.render.modes === void 0) { o.render.modes = {}; }
  if (o.render.commands === void 0) { o.render.commands = {}; }
  if (o.prompts === void 0) { o.prompts = {}; }
  if (o.prompts.link === void 0) { o.prompts.link = prompt; }
  if (o.prompts.image === void 0) { o.prompts.image = prompt; }
  if (o.prompts.attachment === void 0) { o.prompts.attachment = prompt; }
  if (o.prompts.close === void 0) { o.prompts.close = closePrompts; }
  if (o.xhr === void 0) { o.xhr = xhrStub; }
  if (o.classes === void 0) { o.classes = {}; }
  if (o.classes.wysiwyg === void 0) { o.classes.wysiwyg = []; }
  if (o.classes.prompts === void 0) { o.classes.prompts = {}; }
  if (o.classes.input === void 0) { o.classes.input = {}; }

  var preference = o.storage && ls.get(o.storage);
  if (preference) {
    o.defaultMode = preference;
  }

  var droparea = tag({ c: 'wk-container-drop' });
  var switchboard = tag({ c: 'wk-switchboard' });
  var commands = tag({ c: 'wk-commands' });
  var editable = tag({ c: ['wk-wysiwyg', 'wk-hide'].concat(o.classes.wysiwyg).join(' ') });
  var surface = getSurface(textarea, editable, droparea);
  var history = new InputHistory(surface, 'markdown');
  var editor = {
    addCommand: addCommand,
    addCommandButton: addCommandButton,
    runCommand: runCommand,
    parseMarkdown: o.parseMarkdown,
    parseHTML: o.parseHTML,
    destroy: destroy,
    value: getMarkdown,
    textarea: textarea,
    editable: o.wysiwyg ? editable : null,
    setMode: persistMode,
    history: {
      undo: history.undo,
      redo: history.redo,
      canUndo: history.canUndo,
      canRedo: history.canRedo
    },
    mode: 'markdown'
  };
  var entry = { ta: textarea, editor: editor };
  var i = cache.push(entry);
  var kanyeContext = 'woofmark_' + i;
  var kanyeOptions = {
    filter: parent,
    context: kanyeContext
  };
  var modes = {
    markdown: {
      button: tag({ t: 'button', c: 'wk-mode wk-mode-active' }),
      set: markdownMode
    },
    html: {
      button: tag({ t: 'button', c: 'wk-mode wk-mode-inactive' }),
      set: htmlMode
    },
    wysiwyg: {
      button: tag({ t: 'button', c: 'wk-mode wk-mode-inactive' }),
      set: wysiwygMode
    }
  };
  var place;

  tag({ t: 'span', c: 'wk-drop-text', x: strings.prompts.drop, p: droparea });
  tag({ t: 'p', c: ['wk-drop-icon'].concat(o.classes.dropicon).join(' '), p: droparea });

  editable.contentEditable = true;
  modes.markdown.button.setAttribute('disabled', 'disabled');
  modeNames.forEach(addMode);

  if (o.wysiwyg) {
    place = tag({ c: 'wk-wysiwyg-placeholder wk-hide', x: textarea.placeholder });
    crossvent.add(place, 'click', focusEditable);
  }

  if (o.defaultMode && o[o.defaultMode]) {
    modes[o.defaultMode].set();
  } else if (o.markdown) {
    modes.markdown.set();
  } else if (o.html) {
    modes.html.set();
  } else {
    modes.wysiwyg.set();
  }

  bindCommands(surface, o, editor);
  bindEvents();

  return editor;

  function addMode (id) {
    var button = modes[id].button;
    var custom = o.render.modes;
    if (o[id]) {
      switchboard.appendChild(button);
      (typeof custom === 'function' ? custom : renderers.modes)(button, id);
      crossvent.add(button, 'click', modes[id].set);
      button.type = 'button';
      button.tabIndex = -1;

      var title = strings.titles[id];
      if (title) {
        button.setAttribute('title', mac ? macify(title) : title);
      }
    }
  }

  function bindEvents (remove) {
    var ar = remove ? 'rm' : 'add';
    var mov = remove ? 'removeChild' : 'appendChild';
    if (remove) {
      kanye.clear(kanyeContext);
    } else {
      if (o.markdown) { kanye.on('cmd+m', kanyeOptions, markdownMode); }
      if (o.html) { kanye.on('cmd+h', kanyeOptions, htmlMode); }
      if (o.wysiwyg) { kanye.on('cmd+p', kanyeOptions, wysiwygMode); }
    }
    classes[ar](parent, 'wk-container');
    parent[mov](editable);
    if (place) { parent[mov](place); }
    parent[mov](commands);
    parent[mov](switchboard);
    if ((o.images || o.attachments) && o.xhr) {
      parent[mov](droparea);
      uploads(parent, droparea, editor, o, remove);
    }
  }

  function destroy () {
    if (editor.mode !== 'markdown') {
      textarea.value = getMarkdown();
    }
    classes.rm(textarea, 'wk-hide');
    bindEvents(true);
    delete cache[i - 1];
  }

  function markdownMode (e) { persistMode('markdown', e); }
  function htmlMode (e) { persistMode('html', e); }
  function wysiwygMode (e) { persistMode('wysiwyg', e); }

  function persistMode (nextMode, e) {
    var restoreSelection;
    var currentMode = editor.mode;
    var old = modes[currentMode].button;
    var button = modes[nextMode].button;
    var focusing = !!e || doc.activeElement === textarea || doc.activeElement === editable;

    stop(e);

    if (currentMode === nextMode) {
      return;
    }

    restoreSelection = focusing && rememberSelection(history, o);
    textarea.blur(); // avert chrome repaint bugs

    if (nextMode === 'markdown') {
      if (currentMode === 'html') {
        textarea.value = o.parseHTML(textarea.value).trim();
      } else {
        textarea.value = o.parseHTML(editable).trim();
      }
    } else if (nextMode === 'html') {
      if (currentMode === 'markdown') {
        textarea.value = o.parseMarkdown(textarea.value).trim();
      } else {
        textarea.value = editable.innerHTML.trim();
      }
    } else if (nextMode === 'wysiwyg') {
      if (currentMode === 'markdown') {
        editable.innerHTML = o.parseMarkdown(textarea.value).replace(rparagraph, '').trim();
      } else {
        editable.innerHTML = textarea.value.replace(rparagraph, '').trim();
      }
    }

    if (nextMode === 'wysiwyg') {
      classes.add(textarea, 'wk-hide');
      classes.rm(editable, 'wk-hide');
      if (place) { classes.rm(place, 'wk-hide'); }
      if (focusing) { setTimeout(focusEditable, 0); }
    } else {
      classes.rm(textarea, 'wk-hide');
      classes.add(editable, 'wk-hide');
      if (place) { classes.add(place, 'wk-hide'); }
      if (focusing) { textarea.focus(); }
    }
    classes.add(button, 'wk-mode-active');
    classes.rm(old, 'wk-mode-active');
    classes.add(old, 'wk-mode-inactive');
    classes.rm(button, 'wk-mode-inactive');
    button.setAttribute('disabled', 'disabled');
    old.removeAttribute('disabled');
    editor.mode = nextMode;

    if (o.storage) { ls.set(o.storage, nextMode); }

    history.setInputMode(nextMode);
    if (restoreSelection) { restoreSelection(); }
    fireLater('woofmark-mode-change');
  }

  function fireLater (type) {
    setTimeout(function fire () {
      crossvent.fabricate(textarea, type);
    }, 0);
  }

  function focusEditable () {
    editable.focus();
  }

  function getMarkdown () {
    if (editor.mode === 'wysiwyg') {
      return o.parseHTML(editable);
    }
    if (editor.mode === 'html') {
      return o.parseHTML(textarea.value);
    }
    return textarea.value;
  }

  function addCommandButton (id, combo, fn) {
    if (arguments.length === 2) {
      fn = combo;
      combo = null;
    }
    var button = tag({ t: 'button', c: 'wk-command', p: commands });
    var custom = o.render.commands;
    var render = typeof custom === 'function' ? custom : renderers.commands;
    var title = strings.titles[id];
    if (title) {
      button.setAttribute('title', mac ? macify(title) : title);
    }
    button.type = 'button';
    button.tabIndex = -1;
    render(button, id);
    crossvent.add(button, 'click', getCommandHandler(surface, history, fn));
    if (combo) {
      addCommand(combo, fn);
    }
    return button;
  }

  function addCommand (combo, fn) {
    kanye.on(combo, kanyeOptions, getCommandHandler(surface, history, fn));
  }

  function runCommand (fn) {
    getCommandHandler(surface, history, rearrange)(null);
    function rearrange (e, mode, chunks) {
      return fn.call(this, chunks, mode);
    }
  }
}

function tag (options) {
  var o = options || {};
  var el = doc.createElement(o.t || 'div');
  el.className = o.c || '';
  setText(el, o.x || '');
  if (o.p) { o.p.appendChild(el); }
  return el;
}

function stop (e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
}

function macify (text) {
  return text
    .replace(/\bctrl\b/i, '\u2318')
    .replace(/\balt\b/i, '\u2325')
    .replace(/\bshift\b/i, '\u21e7');
}

woofmark.find = find;
woofmark.strings = strings;
module.exports = woofmark;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy93b29mbWFyay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBscyA9IHJlcXVpcmUoJ2xvY2FsLXN0b3JhZ2UnKTtcbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBrYW55ZSA9IHJlcXVpcmUoJ2thbnllJyk7XG52YXIgdXBsb2FkcyA9IHJlcXVpcmUoJy4vdXBsb2FkcycpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuL3N0cmluZ3MnKTtcbnZhciBzZXRUZXh0ID0gcmVxdWlyZSgnLi9zZXRUZXh0Jyk7XG52YXIgcmVtZW1iZXJTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3JlbWVtYmVyU2VsZWN0aW9uJyk7XG52YXIgYmluZENvbW1hbmRzID0gcmVxdWlyZSgnLi9iaW5kQ29tbWFuZHMnKTtcbnZhciBJbnB1dEhpc3RvcnkgPSByZXF1aXJlKCcuL0lucHV0SGlzdG9yeScpO1xudmFyIGdldENvbW1hbmRIYW5kbGVyID0gcmVxdWlyZSgnLi9nZXRDb21tYW5kSGFuZGxlcicpO1xudmFyIGdldFN1cmZhY2UgPSByZXF1aXJlKCcuL2dldFN1cmZhY2UnKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi9jbGFzc2VzJyk7XG52YXIgcmVuZGVyZXJzID0gcmVxdWlyZSgnLi9yZW5kZXJlcnMnKTtcbnZhciB4aHJTdHViID0gcmVxdWlyZSgnLi94aHJTdHViJyk7XG52YXIgcHJvbXB0ID0gcmVxdWlyZSgnLi9wcm9tcHRzL3Byb21wdCcpO1xudmFyIGNsb3NlUHJvbXB0cyA9IHJlcXVpcmUoJy4vcHJvbXB0cy9jbG9zZScpO1xudmFyIG1vZGVOYW1lcyA9IFsnbWFya2Rvd24nLCAnaHRtbCcsICd3eXNpd3lnJ107XG52YXIgY2FjaGUgPSBbXTtcbnZhciBtYWMgPSAvXFxiTWFjIE9TXFxiLy50ZXN0KGdsb2JhbC5uYXZpZ2F0b3IudXNlckFnZW50KTtcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBycGFyYWdyYXBoID0gL148cD48XFwvcD5cXG4/JC9pO1xuXG5mdW5jdGlvbiBmaW5kICh0ZXh0YXJlYSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGNhY2hlW2ldICYmIGNhY2hlW2ldLnRhID09PSB0ZXh0YXJlYSkge1xuICAgICAgcmV0dXJuIGNhY2hlW2ldLmVkaXRvcjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHdvb2ZtYXJrICh0ZXh0YXJlYSwgb3B0aW9ucykge1xuICB2YXIgY2FjaGVkID0gZmluZCh0ZXh0YXJlYSk7XG4gIGlmIChjYWNoZWQpIHtcbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG5cbiAgdmFyIHBhcmVudCA9IHRleHRhcmVhLnBhcmVudEVsZW1lbnQ7XG4gIGlmIChwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignd29vZm1hcmsgZGVtYW5kcyA8dGV4dGFyZWE+IGVsZW1lbnRzIHRvIGhhdmUgbm8gc2libGluZ3MnKTtcbiAgfVxuXG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKG8ubWFya2Rvd24gPT09IHZvaWQgMCkgeyBvLm1hcmtkb3duID0gdHJ1ZTsgfVxuICBpZiAoby5odG1sID09PSB2b2lkIDApIHsgby5odG1sID0gdHJ1ZTsgfVxuICBpZiAoby53eXNpd3lnID09PSB2b2lkIDApIHsgby53eXNpd3lnID0gdHJ1ZTsgfVxuXG4gIGlmICghby5tYXJrZG93biAmJiAhby5odG1sICYmICFvLnd5c2l3eWcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dvb2ZtYXJrIGV4cGVjdHMgYXQgbGVhc3Qgb25lIGlucHV0IG1vZGUgdG8gYmUgYXZhaWxhYmxlJyk7XG4gIH1cblxuICBpZiAoby5ociA9PT0gdm9pZCAwKSB7IG8uaHIgPSBmYWxzZTsgfVxuICBpZiAoby5zdG9yYWdlID09PSB2b2lkIDApIHsgby5zdG9yYWdlID0gdHJ1ZTsgfVxuICBpZiAoby5zdG9yYWdlID09PSB0cnVlKSB7IG8uc3RvcmFnZSA9ICd3b29mbWFya19pbnB1dF9tb2RlJzsgfVxuICBpZiAoby5mZW5jaW5nID09PSB2b2lkIDApIHsgby5mZW5jaW5nID0gdHJ1ZTsgfVxuICBpZiAoby5yZW5kZXIgPT09IHZvaWQgMCkgeyBvLnJlbmRlciA9IHt9OyB9XG4gIGlmIChvLnJlbmRlci5tb2RlcyA9PT0gdm9pZCAwKSB7IG8ucmVuZGVyLm1vZGVzID0ge307IH1cbiAgaWYgKG8ucmVuZGVyLmNvbW1hbmRzID09PSB2b2lkIDApIHsgby5yZW5kZXIuY29tbWFuZHMgPSB7fTsgfVxuICBpZiAoby5wcm9tcHRzID09PSB2b2lkIDApIHsgby5wcm9tcHRzID0ge307IH1cbiAgaWYgKG8ucHJvbXB0cy5saW5rID09PSB2b2lkIDApIHsgby5wcm9tcHRzLmxpbmsgPSBwcm9tcHQ7IH1cbiAgaWYgKG8ucHJvbXB0cy5pbWFnZSA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cy5pbWFnZSA9IHByb21wdDsgfVxuICBpZiAoby5wcm9tcHRzLmF0dGFjaG1lbnQgPT09IHZvaWQgMCkgeyBvLnByb21wdHMuYXR0YWNobWVudCA9IHByb21wdDsgfVxuICBpZiAoby5wcm9tcHRzLmNsb3NlID09PSB2b2lkIDApIHsgby5wcm9tcHRzLmNsb3NlID0gY2xvc2VQcm9tcHRzOyB9XG4gIGlmIChvLnhociA9PT0gdm9pZCAwKSB7IG8ueGhyID0geGhyU3R1YjsgfVxuICBpZiAoby5jbGFzc2VzID09PSB2b2lkIDApIHsgby5jbGFzc2VzID0ge307IH1cbiAgaWYgKG8uY2xhc3Nlcy53eXNpd3lnID09PSB2b2lkIDApIHsgby5jbGFzc2VzLnd5c2l3eWcgPSBbXTsgfVxuICBpZiAoby5jbGFzc2VzLnByb21wdHMgPT09IHZvaWQgMCkgeyBvLmNsYXNzZXMucHJvbXB0cyA9IHt9OyB9XG4gIGlmIChvLmNsYXNzZXMuaW5wdXQgPT09IHZvaWQgMCkgeyBvLmNsYXNzZXMuaW5wdXQgPSB7fTsgfVxuXG4gIHZhciBwcmVmZXJlbmNlID0gby5zdG9yYWdlICYmIGxzLmdldChvLnN0b3JhZ2UpO1xuICBpZiAocHJlZmVyZW5jZSkge1xuICAgIG8uZGVmYXVsdE1vZGUgPSBwcmVmZXJlbmNlO1xuICB9XG5cbiAgdmFyIGRyb3BhcmVhID0gdGFnKHsgYzogJ3drLWNvbnRhaW5lci1kcm9wJyB9KTtcbiAgdmFyIHN3aXRjaGJvYXJkID0gdGFnKHsgYzogJ3drLXN3aXRjaGJvYXJkJyB9KTtcbiAgdmFyIGNvbW1hbmRzID0gdGFnKHsgYzogJ3drLWNvbW1hbmRzJyB9KTtcbiAgdmFyIGVkaXRhYmxlID0gdGFnKHsgYzogWyd3ay13eXNpd3lnJywgJ3drLWhpZGUnXS5jb25jYXQoby5jbGFzc2VzLnd5c2l3eWcpLmpvaW4oJyAnKSB9KTtcbiAgdmFyIHN1cmZhY2UgPSBnZXRTdXJmYWNlKHRleHRhcmVhLCBlZGl0YWJsZSwgZHJvcGFyZWEpO1xuICB2YXIgaGlzdG9yeSA9IG5ldyBJbnB1dEhpc3Rvcnkoc3VyZmFjZSwgJ21hcmtkb3duJyk7XG4gIHZhciBlZGl0b3IgPSB7XG4gICAgYWRkQ29tbWFuZDogYWRkQ29tbWFuZCxcbiAgICBhZGRDb21tYW5kQnV0dG9uOiBhZGRDb21tYW5kQnV0dG9uLFxuICAgIHJ1bkNvbW1hbmQ6IHJ1bkNvbW1hbmQsXG4gICAgcGFyc2VNYXJrZG93bjogby5wYXJzZU1hcmtkb3duLFxuICAgIHBhcnNlSFRNTDogby5wYXJzZUhUTUwsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICB2YWx1ZTogZ2V0TWFya2Rvd24sXG4gICAgdGV4dGFyZWE6IHRleHRhcmVhLFxuICAgIGVkaXRhYmxlOiBvLnd5c2l3eWcgPyBlZGl0YWJsZSA6IG51bGwsXG4gICAgc2V0TW9kZTogcGVyc2lzdE1vZGUsXG4gICAgaGlzdG9yeToge1xuICAgICAgdW5kbzogaGlzdG9yeS51bmRvLFxuICAgICAgcmVkbzogaGlzdG9yeS5yZWRvLFxuICAgICAgY2FuVW5kbzogaGlzdG9yeS5jYW5VbmRvLFxuICAgICAgY2FuUmVkbzogaGlzdG9yeS5jYW5SZWRvXG4gICAgfSxcbiAgICBtb2RlOiAnbWFya2Rvd24nXG4gIH07XG4gIHZhciBlbnRyeSA9IHsgdGE6IHRleHRhcmVhLCBlZGl0b3I6IGVkaXRvciB9O1xuICB2YXIgaSA9IGNhY2hlLnB1c2goZW50cnkpO1xuICB2YXIga2FueWVDb250ZXh0ID0gJ3dvb2ZtYXJrXycgKyBpO1xuICB2YXIga2FueWVPcHRpb25zID0ge1xuICAgIGZpbHRlcjogcGFyZW50LFxuICAgIGNvbnRleHQ6IGthbnllQ29udGV4dFxuICB9O1xuICB2YXIgbW9kZXMgPSB7XG4gICAgbWFya2Rvd246IHtcbiAgICAgIGJ1dHRvbjogdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1tb2RlIHdrLW1vZGUtYWN0aXZlJyB9KSxcbiAgICAgIHNldDogbWFya2Rvd25Nb2RlXG4gICAgfSxcbiAgICBodG1sOiB7XG4gICAgICBidXR0b246IHRhZyh7IHQ6ICdidXR0b24nLCBjOiAnd2stbW9kZSB3ay1tb2RlLWluYWN0aXZlJyB9KSxcbiAgICAgIHNldDogaHRtbE1vZGVcbiAgICB9LFxuICAgIHd5c2l3eWc6IHtcbiAgICAgIGJ1dHRvbjogdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1tb2RlIHdrLW1vZGUtaW5hY3RpdmUnIH0pLFxuICAgICAgc2V0OiB3eXNpd3lnTW9kZVxuICAgIH1cbiAgfTtcbiAgdmFyIHBsYWNlO1xuXG4gIHRhZyh7IHQ6ICdzcGFuJywgYzogJ3drLWRyb3AtdGV4dCcsIHg6IHN0cmluZ3MucHJvbXB0cy5kcm9wLCBwOiBkcm9wYXJlYSB9KTtcbiAgdGFnKHsgdDogJ3AnLCBjOiBbJ3drLWRyb3AtaWNvbiddLmNvbmNhdChvLmNsYXNzZXMuZHJvcGljb24pLmpvaW4oJyAnKSwgcDogZHJvcGFyZWEgfSk7XG5cbiAgZWRpdGFibGUuY29udGVudEVkaXRhYmxlID0gdHJ1ZTtcbiAgbW9kZXMubWFya2Rvd24uYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgbW9kZU5hbWVzLmZvckVhY2goYWRkTW9kZSk7XG5cbiAgaWYgKG8ud3lzaXd5Zykge1xuICAgIHBsYWNlID0gdGFnKHsgYzogJ3drLXd5c2l3eWctcGxhY2Vob2xkZXIgd2staGlkZScsIHg6IHRleHRhcmVhLnBsYWNlaG9sZGVyIH0pO1xuICAgIGNyb3NzdmVudC5hZGQocGxhY2UsICdjbGljaycsIGZvY3VzRWRpdGFibGUpO1xuICB9XG5cbiAgaWYgKG8uZGVmYXVsdE1vZGUgJiYgb1tvLmRlZmF1bHRNb2RlXSkge1xuICAgIG1vZGVzW28uZGVmYXVsdE1vZGVdLnNldCgpO1xuICB9IGVsc2UgaWYgKG8ubWFya2Rvd24pIHtcbiAgICBtb2Rlcy5tYXJrZG93bi5zZXQoKTtcbiAgfSBlbHNlIGlmIChvLmh0bWwpIHtcbiAgICBtb2Rlcy5odG1sLnNldCgpO1xuICB9IGVsc2Uge1xuICAgIG1vZGVzLnd5c2l3eWcuc2V0KCk7XG4gIH1cblxuICBiaW5kQ29tbWFuZHMoc3VyZmFjZSwgbywgZWRpdG9yKTtcbiAgYmluZEV2ZW50cygpO1xuXG4gIHJldHVybiBlZGl0b3I7XG5cbiAgZnVuY3Rpb24gYWRkTW9kZSAoaWQpIHtcbiAgICB2YXIgYnV0dG9uID0gbW9kZXNbaWRdLmJ1dHRvbjtcbiAgICB2YXIgY3VzdG9tID0gby5yZW5kZXIubW9kZXM7XG4gICAgaWYgKG9baWRdKSB7XG4gICAgICBzd2l0Y2hib2FyZC5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgKHR5cGVvZiBjdXN0b20gPT09ICdmdW5jdGlvbicgPyBjdXN0b20gOiByZW5kZXJlcnMubW9kZXMpKGJ1dHRvbiwgaWQpO1xuICAgICAgY3Jvc3N2ZW50LmFkZChidXR0b24sICdjbGljaycsIG1vZGVzW2lkXS5zZXQpO1xuICAgICAgYnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgIGJ1dHRvbi50YWJJbmRleCA9IC0xO1xuXG4gICAgICB2YXIgdGl0bGUgPSBzdHJpbmdzLnRpdGxlc1tpZF07XG4gICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBtYWMgPyBtYWNpZnkodGl0bGUpIDogdGl0bGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmRFdmVudHMgKHJlbW92ZSkge1xuICAgIHZhciBhciA9IHJlbW92ZSA/ICdybScgOiAnYWRkJztcbiAgICB2YXIgbW92ID0gcmVtb3ZlID8gJ3JlbW92ZUNoaWxkJyA6ICdhcHBlbmRDaGlsZCc7XG4gICAgaWYgKHJlbW92ZSkge1xuICAgICAga2FueWUuY2xlYXIoa2FueWVDb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG8ubWFya2Rvd24pIHsga2FueWUub24oJ2NtZCttJywga2FueWVPcHRpb25zLCBtYXJrZG93bk1vZGUpOyB9XG4gICAgICBpZiAoby5odG1sKSB7IGthbnllLm9uKCdjbWQraCcsIGthbnllT3B0aW9ucywgaHRtbE1vZGUpOyB9XG4gICAgICBpZiAoby53eXNpd3lnKSB7IGthbnllLm9uKCdjbWQrcCcsIGthbnllT3B0aW9ucywgd3lzaXd5Z01vZGUpOyB9XG4gICAgfVxuICAgIGNsYXNzZXNbYXJdKHBhcmVudCwgJ3drLWNvbnRhaW5lcicpO1xuICAgIHBhcmVudFttb3ZdKGVkaXRhYmxlKTtcbiAgICBpZiAocGxhY2UpIHsgcGFyZW50W21vdl0ocGxhY2UpOyB9XG4gICAgcGFyZW50W21vdl0oY29tbWFuZHMpO1xuICAgIHBhcmVudFttb3ZdKHN3aXRjaGJvYXJkKTtcbiAgICBpZiAoKG8uaW1hZ2VzIHx8IG8uYXR0YWNobWVudHMpICYmIG8ueGhyKSB7XG4gICAgICBwYXJlbnRbbW92XShkcm9wYXJlYSk7XG4gICAgICB1cGxvYWRzKHBhcmVudCwgZHJvcGFyZWEsIGVkaXRvciwgbywgcmVtb3ZlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBpZiAoZWRpdG9yLm1vZGUgIT09ICdtYXJrZG93bicpIHtcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gZ2V0TWFya2Rvd24oKTtcbiAgICB9XG4gICAgY2xhc3Nlcy5ybSh0ZXh0YXJlYSwgJ3drLWhpZGUnKTtcbiAgICBiaW5kRXZlbnRzKHRydWUpO1xuICAgIGRlbGV0ZSBjYWNoZVtpIC0gMV07XG4gIH1cblxuICBmdW5jdGlvbiBtYXJrZG93bk1vZGUgKGUpIHsgcGVyc2lzdE1vZGUoJ21hcmtkb3duJywgZSk7IH1cbiAgZnVuY3Rpb24gaHRtbE1vZGUgKGUpIHsgcGVyc2lzdE1vZGUoJ2h0bWwnLCBlKTsgfVxuICBmdW5jdGlvbiB3eXNpd3lnTW9kZSAoZSkgeyBwZXJzaXN0TW9kZSgnd3lzaXd5ZycsIGUpOyB9XG5cbiAgZnVuY3Rpb24gcGVyc2lzdE1vZGUgKG5leHRNb2RlLCBlKSB7XG4gICAgdmFyIHJlc3RvcmVTZWxlY3Rpb247XG4gICAgdmFyIGN1cnJlbnRNb2RlID0gZWRpdG9yLm1vZGU7XG4gICAgdmFyIG9sZCA9IG1vZGVzW2N1cnJlbnRNb2RlXS5idXR0b247XG4gICAgdmFyIGJ1dHRvbiA9IG1vZGVzW25leHRNb2RlXS5idXR0b247XG4gICAgdmFyIGZvY3VzaW5nID0gISFlIHx8IGRvYy5hY3RpdmVFbGVtZW50ID09PSB0ZXh0YXJlYSB8fCBkb2MuYWN0aXZlRWxlbWVudCA9PT0gZWRpdGFibGU7XG5cbiAgICBzdG9wKGUpO1xuXG4gICAgaWYgKGN1cnJlbnRNb2RlID09PSBuZXh0TW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlc3RvcmVTZWxlY3Rpb24gPSBmb2N1c2luZyAmJiByZW1lbWJlclNlbGVjdGlvbihoaXN0b3J5LCBvKTtcbiAgICB0ZXh0YXJlYS5ibHVyKCk7IC8vIGF2ZXJ0IGNocm9tZSByZXBhaW50IGJ1Z3NcblxuICAgIGlmIChuZXh0TW9kZSA9PT0gJ21hcmtkb3duJykge1xuICAgICAgaWYgKGN1cnJlbnRNb2RlID09PSAnaHRtbCcpIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBvLnBhcnNlSFRNTCh0ZXh0YXJlYS52YWx1ZSkudHJpbSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBvLnBhcnNlSFRNTChlZGl0YWJsZSkudHJpbSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmV4dE1vZGUgPT09ICdodG1sJykge1xuICAgICAgaWYgKGN1cnJlbnRNb2RlID09PSAnbWFya2Rvd24nKSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gby5wYXJzZU1hcmtkb3duKHRleHRhcmVhLnZhbHVlKS50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IGVkaXRhYmxlLmlubmVySFRNTC50cmltKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuZXh0TW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICBpZiAoY3VycmVudE1vZGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgZWRpdGFibGUuaW5uZXJIVE1MID0gby5wYXJzZU1hcmtkb3duKHRleHRhcmVhLnZhbHVlKS5yZXBsYWNlKHJwYXJhZ3JhcGgsICcnKS50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSB0ZXh0YXJlYS52YWx1ZS5yZXBsYWNlKHJwYXJhZ3JhcGgsICcnKS50cmltKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5leHRNb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIGNsYXNzZXMuYWRkKHRleHRhcmVhLCAnd2staGlkZScpO1xuICAgICAgY2xhc3Nlcy5ybShlZGl0YWJsZSwgJ3drLWhpZGUnKTtcbiAgICAgIGlmIChwbGFjZSkgeyBjbGFzc2VzLnJtKHBsYWNlLCAnd2staGlkZScpOyB9XG4gICAgICBpZiAoZm9jdXNpbmcpIHsgc2V0VGltZW91dChmb2N1c0VkaXRhYmxlLCAwKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFzc2VzLnJtKHRleHRhcmVhLCAnd2staGlkZScpO1xuICAgICAgY2xhc3Nlcy5hZGQoZWRpdGFibGUsICd3ay1oaWRlJyk7XG4gICAgICBpZiAocGxhY2UpIHsgY2xhc3Nlcy5hZGQocGxhY2UsICd3ay1oaWRlJyk7IH1cbiAgICAgIGlmIChmb2N1c2luZykgeyB0ZXh0YXJlYS5mb2N1cygpOyB9XG4gICAgfVxuICAgIGNsYXNzZXMuYWRkKGJ1dHRvbiwgJ3drLW1vZGUtYWN0aXZlJyk7XG4gICAgY2xhc3Nlcy5ybShvbGQsICd3ay1tb2RlLWFjdGl2ZScpO1xuICAgIGNsYXNzZXMuYWRkKG9sZCwgJ3drLW1vZGUtaW5hY3RpdmUnKTtcbiAgICBjbGFzc2VzLnJtKGJ1dHRvbiwgJ3drLW1vZGUtaW5hY3RpdmUnKTtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIG9sZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgZWRpdG9yLm1vZGUgPSBuZXh0TW9kZTtcblxuICAgIGlmIChvLnN0b3JhZ2UpIHsgbHMuc2V0KG8uc3RvcmFnZSwgbmV4dE1vZGUpOyB9XG5cbiAgICBoaXN0b3J5LnNldElucHV0TW9kZShuZXh0TW9kZSk7XG4gICAgaWYgKHJlc3RvcmVTZWxlY3Rpb24pIHsgcmVzdG9yZVNlbGVjdGlvbigpOyB9XG4gICAgZmlyZUxhdGVyKCd3b29mbWFyay1tb2RlLWNoYW5nZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyZUxhdGVyICh0eXBlKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiBmaXJlICgpIHtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUodGV4dGFyZWEsIHR5cGUpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9jdXNFZGl0YWJsZSAoKSB7XG4gICAgZWRpdGFibGUuZm9jdXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1hcmtkb3duICgpIHtcbiAgICBpZiAoZWRpdG9yLm1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgcmV0dXJuIG8ucGFyc2VIVE1MKGVkaXRhYmxlKTtcbiAgICB9XG4gICAgaWYgKGVkaXRvci5tb2RlID09PSAnaHRtbCcpIHtcbiAgICAgIHJldHVybiBvLnBhcnNlSFRNTCh0ZXh0YXJlYS52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENvbW1hbmRCdXR0b24gKGlkLCBjb21ibywgZm4pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgZm4gPSBjb21ibztcbiAgICAgIGNvbWJvID0gbnVsbDtcbiAgICB9XG4gICAgdmFyIGJ1dHRvbiA9IHRhZyh7IHQ6ICdidXR0b24nLCBjOiAnd2stY29tbWFuZCcsIHA6IGNvbW1hbmRzIH0pO1xuICAgIHZhciBjdXN0b20gPSBvLnJlbmRlci5jb21tYW5kcztcbiAgICB2YXIgcmVuZGVyID0gdHlwZW9mIGN1c3RvbSA9PT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbSA6IHJlbmRlcmVycy5jb21tYW5kcztcbiAgICB2YXIgdGl0bGUgPSBzdHJpbmdzLnRpdGxlc1tpZF07XG4gICAgaWYgKHRpdGxlKSB7XG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIG1hYyA/IG1hY2lmeSh0aXRsZSkgOiB0aXRsZSk7XG4gICAgfVxuICAgIGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgYnV0dG9uLnRhYkluZGV4ID0gLTE7XG4gICAgcmVuZGVyKGJ1dHRvbiwgaWQpO1xuICAgIGNyb3NzdmVudC5hZGQoYnV0dG9uLCAnY2xpY2snLCBnZXRDb21tYW5kSGFuZGxlcihzdXJmYWNlLCBoaXN0b3J5LCBmbikpO1xuICAgIGlmIChjb21ibykge1xuICAgICAgYWRkQ29tbWFuZChjb21ibywgZm4pO1xuICAgIH1cbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ29tbWFuZCAoY29tYm8sIGZuKSB7XG4gICAga2FueWUub24oY29tYm8sIGthbnllT3B0aW9ucywgZ2V0Q29tbWFuZEhhbmRsZXIoc3VyZmFjZSwgaGlzdG9yeSwgZm4pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkNvbW1hbmQgKGZuKSB7XG4gICAgZ2V0Q29tbWFuZEhhbmRsZXIoc3VyZmFjZSwgaGlzdG9yeSwgcmVhcnJhbmdlKShudWxsKTtcbiAgICBmdW5jdGlvbiByZWFycmFuZ2UgKGUsIG1vZGUsIGNodW5rcykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgY2h1bmtzLCBtb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdGFnIChvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoby50IHx8ICdkaXYnKTtcbiAgZWwuY2xhc3NOYW1lID0gby5jIHx8ICcnO1xuICBzZXRUZXh0KGVsLCBvLnggfHwgJycpO1xuICBpZiAoby5wKSB7IG8ucC5hcHBlbmRDaGlsZChlbCk7IH1cbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiBzdG9wIChlKSB7XG4gIGlmIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfVxufVxuXG5mdW5jdGlvbiBtYWNpZnkgKHRleHQpIHtcbiAgcmV0dXJuIHRleHRcbiAgICAucmVwbGFjZSgvXFxiY3RybFxcYi9pLCAnXFx1MjMxOCcpXG4gICAgLnJlcGxhY2UoL1xcYmFsdFxcYi9pLCAnXFx1MjMyNScpXG4gICAgLnJlcGxhY2UoL1xcYnNoaWZ0XFxiL2ksICdcXHUyMWU3Jyk7XG59XG5cbndvb2ZtYXJrLmZpbmQgPSBmaW5kO1xud29vZm1hcmsuc3RyaW5ncyA9IHN0cmluZ3M7XG5tb2R1bGUuZXhwb3J0cyA9IHdvb2ZtYXJrO1xuIl19
},{"./InputHistory":21,"./bindCommands":23,"./classes":27,"./getCommandHandler":30,"./getSurface":31,"./prompts/close":55,"./prompts/prompt":56,"./rememberSelection":58,"./renderers":59,"./setText":60,"./strings":61,"./uploads":62,"./xhrStub":64,"crossvent":6,"kanye":8,"local-storage":10}],64:[function(require,module,exports){
'use strict';

function xhrStub (options) {
  throw new Error('Woofmark is missing XHR configuration. Can\'t request ' + options.url);
}

module.exports = xhrStub;

},{}]},{},[63])(63)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvYnVsbHNleWUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL3NlbGwvc2VsbC5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS90YWlsb3JtYWRlLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL3Rocm90dGxlLmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9ub2RlX21vZHVsZXMvY3VzdG9tLWV2ZW50L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvZXZlbnRtYXAuanMiLCJub2RlX21vZHVsZXMva2FueWUva2FueWUuanMiLCJub2RlX21vZHVsZXMva2FueWUvbm9kZV9tb2R1bGVzL3Nla3Rvci9zcmMvc2VrdG9yLmpzIiwibm9kZV9tb2R1bGVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2NhbC1zdG9yYWdlL3N0dWIuanMiLCJub2RlX21vZHVsZXMvbG9jYWwtc3RvcmFnZS90cmFja2luZy5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvbk51bGxPcC5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvblJhdy5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvblN5bnRoZXRpYy5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2lzSG9zdC5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL3JhbmdlVG9UZXh0UmFuZ2UuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9zZWxlY2Npb24uanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9zZXRTZWxlY3Rpb24uanMiLCJzcmMvSW5wdXRIaXN0b3J5LmpzIiwic3JjL0lucHV0U3RhdGUuanMiLCJzcmMvYmluZENvbW1hbmRzLmpzIiwic3JjL2Nhc3QuanMiLCJzcmMvY2h1bmtzL3BhcnNlTGlua0lucHV0LmpzIiwic3JjL2NodW5rcy90cmltLmpzIiwic3JjL2NsYXNzZXMuanMiLCJzcmMvZXh0ZW5kUmVnRXhwLmpzIiwic3JjL2ZpeEVPTC5qcyIsInNyYy9nZXRDb21tYW5kSGFuZGxlci5qcyIsInNyYy9nZXRTdXJmYWNlLmpzIiwic3JjL2dldFRleHQuanMiLCJzcmMvaHRtbC9IdG1sQ2h1bmtzLmpzIiwic3JjL2h0bWwvYmxvY2txdW90ZS5qcyIsInNyYy9odG1sL2JvbGRPckl0YWxpYy5qcyIsInNyYy9odG1sL2NvZGVibG9jay5qcyIsInNyYy9odG1sL2hlYWRpbmcuanMiLCJzcmMvaHRtbC9oci5qcyIsInNyYy9odG1sL2xpbmtPckltYWdlT3JBdHRhY2htZW50LmpzIiwic3JjL2h0bWwvbGlzdC5qcyIsInNyYy9odG1sL3dyYXBwaW5nLmpzIiwic3JjL2lzVmlzaWJsZUVsZW1lbnQuanMiLCJzcmMvbWFueS5qcyIsInNyYy9tYXJrZG93bi9NYXJrZG93bkNodW5rcy5qcyIsInNyYy9tYXJrZG93bi9ibG9ja3F1b3RlLmpzIiwic3JjL21hcmtkb3duL2JvbGRPckl0YWxpYy5qcyIsInNyYy9tYXJrZG93bi9jb2RlYmxvY2suanMiLCJzcmMvbWFya2Rvd24vaGVhZGluZy5qcyIsInNyYy9tYXJrZG93bi9oci5qcyIsInNyYy9tYXJrZG93bi9saW5rT3JJbWFnZU9yQXR0YWNobWVudC5qcyIsInNyYy9tYXJrZG93bi9saXN0LmpzIiwic3JjL21hcmtkb3duL3NldHRpbmdzLmpzIiwic3JjL21hcmtkb3duL3dyYXBwaW5nLmpzIiwic3JjL29uY2UuanMiLCJzcmMvcHJvbXB0cy9jbG9zZS5qcyIsInNyYy9wcm9tcHRzL3Byb21wdC5qcyIsInNyYy9wcm9tcHRzL3JlbmRlci5qcyIsInNyYy9yZW1lbWJlclNlbGVjdGlvbi5qcyIsInNyYy9yZW5kZXJlcnMuanMiLCJzcmMvc2V0VGV4dC5qcyIsInNyYy9zdHJpbmdzLmpzIiwic3JjL3VwbG9hZHMuanMiLCJzcmMvd29vZm1hcmsuanMiLCJzcmMveGhyU3R1Yi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIHRocm90dGxlID0gcmVxdWlyZSgnLi90aHJvdHRsZScpO1xudmFyIHRhaWxvcm1hZGUgPSByZXF1aXJlKCcuL3RhaWxvcm1hZGUnKTtcblxuZnVuY3Rpb24gYnVsbHNleWUgKGVsLCB0YXJnZXQsIG9wdGlvbnMpIHtcbiAgdmFyIG8gPSBvcHRpb25zO1xuICB2YXIgZG9tVGFyZ2V0ID0gdGFyZ2V0ICYmIHRhcmdldC50YWdOYW1lO1xuXG4gIGlmICghZG9tVGFyZ2V0ICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICBvID0gdGFyZ2V0O1xuICB9XG4gIGlmICghZG9tVGFyZ2V0KSB7XG4gICAgdGFyZ2V0ID0gZWw7XG4gIH1cbiAgaWYgKCFvKSB7IG8gPSB7fTsgfVxuXG4gIHZhciBkZXN0cm95ZWQgPSBmYWxzZTtcbiAgdmFyIHRocm90dGxlZFdyaXRlID0gdGhyb3R0bGUod3JpdGUsIDMwKTtcbiAgdmFyIHRhaWxvck9wdGlvbnMgPSB7IHVwZGF0ZTogby5hdXRvdXBkYXRlVG9DYXJldCAhPT0gZmFsc2UgJiYgdXBkYXRlIH07XG4gIHZhciB0YWlsb3IgPSBvLmNhcmV0ICYmIHRhaWxvcm1hZGUodGFyZ2V0LCB0YWlsb3JPcHRpb25zKTtcblxuICB3cml0ZSgpO1xuXG4gIGlmIChvLnRyYWNraW5nICE9PSBmYWxzZSkge1xuICAgIGNyb3NzdmVudC5hZGQod2luZG93LCAncmVzaXplJywgdGhyb3R0bGVkV3JpdGUpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZWFkOiByZWFkTnVsbCxcbiAgICByZWZyZXNoOiB3cml0ZSxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHNsZWVwOiBzbGVlcFxuICB9O1xuXG4gIGZ1bmN0aW9uIHNsZWVwICgpIHtcbiAgICB0YWlsb3JPcHRpb25zLnNsZWVwaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWROdWxsICgpIHsgcmV0dXJuIHJlYWQoKTsgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKHJlYWRpbmdzKSB7XG4gICAgdmFyIGJvdW5kcyA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB2YXIgc2Nyb2xsVG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAodGFpbG9yKSB7XG4gICAgICByZWFkaW5ncyA9IHRhaWxvci5yZWFkKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB4OiAocmVhZGluZ3MuYWJzb2x1dGUgPyAwIDogYm91bmRzLmxlZnQpICsgcmVhZGluZ3MueCxcbiAgICAgICAgeTogKHJlYWRpbmdzLmFic29sdXRlID8gMCA6IGJvdW5kcy50b3ApICsgc2Nyb2xsVG9wICsgcmVhZGluZ3MueSArIDIwXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgeDogYm91bmRzLmxlZnQsXG4gICAgICB5OiBib3VuZHMudG9wICsgc2Nyb2xsVG9wXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSAocmVhZGluZ3MpIHtcbiAgICB3cml0ZShyZWFkaW5ncyk7XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZSAocmVhZGluZ3MpIHtcbiAgICBpZiAoZGVzdHJveWVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1bGxzZXllIGNhblxcJ3QgcmVmcmVzaCBhZnRlciBiZWluZyBkZXN0cm95ZWQuIENyZWF0ZSBhbm90aGVyIGluc3RhbmNlIGluc3RlYWQuJyk7XG4gICAgfVxuICAgIGlmICh0YWlsb3IgJiYgIXJlYWRpbmdzKSB7XG4gICAgICB0YWlsb3JPcHRpb25zLnNsZWVwaW5nID0gZmFsc2U7XG4gICAgICB0YWlsb3IucmVmcmVzaCgpOyByZXR1cm47XG4gICAgfVxuICAgIHZhciBwID0gcmVhZChyZWFkaW5ncyk7XG4gICAgaWYgKCF0YWlsb3IgJiYgdGFyZ2V0ICE9PSBlbCkge1xuICAgICAgcC55ICs9IHRhcmdldC5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuICAgIGVsLnN0eWxlLmxlZnQgPSBwLnggKyAncHgnO1xuICAgIGVsLnN0eWxlLnRvcCA9IHAueSArICdweCc7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBpZiAodGFpbG9yKSB7IHRhaWxvci5kZXN0cm95KCk7IH1cbiAgICBjcm9zc3ZlbnQucmVtb3ZlKHdpbmRvdywgJ3Jlc2l6ZScsIHRocm90dGxlZFdyaXRlKTtcbiAgICBkZXN0cm95ZWQgPSB0cnVlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVsbHNleWU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXQgPSBlYXN5R2V0O1xudmFyIHNldCA9IGVhc3lTZXQ7XG5cbmlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XG4gIGdldCA9IGhhcmRHZXQ7XG4gIHNldCA9IGhhcmRTZXQ7XG59XG5cbmZ1bmN0aW9uIGVhc3lHZXQgKGVsKSB7XG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IGVsLnNlbGVjdGlvblN0YXJ0LFxuICAgIGVuZDogZWwuc2VsZWN0aW9uRW5kXG4gIH07XG59XG5cbmZ1bmN0aW9uIGhhcmRHZXQgKGVsKSB7XG4gIHZhciBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBpZiAoYWN0aXZlICE9PSBlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gIH1cblxuICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIGJvb2ttYXJrID0gcmFuZ2UuZ2V0Qm9va21hcmsoKTtcbiAgdmFyIG9yaWdpbmFsID0gZWwudmFsdWU7XG4gIHZhciBtYXJrZXIgPSBnZXRVbmlxdWVNYXJrZXIob3JpZ2luYWwpO1xuICB2YXIgcGFyZW50ID0gcmFuZ2UucGFyZW50RWxlbWVudCgpO1xuICBpZiAocGFyZW50ID09PSBudWxsIHx8ICFpbnB1dHMocGFyZW50KSkge1xuICAgIHJldHVybiByZXN1bHQoMCwgMCk7XG4gIH1cbiAgcmFuZ2UudGV4dCA9IG1hcmtlciArIHJhbmdlLnRleHQgKyBtYXJrZXI7XG5cbiAgdmFyIGNvbnRlbnRzID0gZWwudmFsdWU7XG5cbiAgZWwudmFsdWUgPSBvcmlnaW5hbDtcbiAgcmFuZ2UubW92ZVRvQm9va21hcmsoYm9va21hcmspO1xuICByYW5nZS5zZWxlY3QoKTtcblxuICByZXR1cm4gcmVzdWx0KGNvbnRlbnRzLmluZGV4T2YobWFya2VyKSwgY29udGVudHMubGFzdEluZGV4T2YobWFya2VyKSAtIG1hcmtlci5sZW5ndGgpO1xuXG4gIGZ1bmN0aW9uIHJlc3VsdCAoc3RhcnQsIGVuZCkge1xuICAgIGlmIChhY3RpdmUgIT09IGVsKSB7IC8vIGRvbid0IGRpc3J1cHQgcHJlLWV4aXN0aW5nIHN0YXRlXG4gICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgIGFjdGl2ZS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuYmx1cigpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VW5pcXVlTWFya2VyIChjb250ZW50cykge1xuICB2YXIgbWFya2VyO1xuICBkbyB7XG4gICAgbWFya2VyID0gJ0BAbWFya2VyLicgKyBNYXRoLnJhbmRvbSgpICogbmV3IERhdGUoKTtcbiAgfSB3aGlsZSAoY29udGVudHMuaW5kZXhPZihtYXJrZXIpICE9PSAtMSk7XG4gIHJldHVybiBtYXJrZXI7XG59XG5cbmZ1bmN0aW9uIGlucHV0cyAoZWwpIHtcbiAgcmV0dXJuICgoZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbC50eXBlID09PSAndGV4dCcpIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScpO1xufVxuXG5mdW5jdGlvbiBlYXN5U2V0IChlbCwgcCkge1xuICBlbC5zZWxlY3Rpb25TdGFydCA9IHBhcnNlKGVsLCBwLnN0YXJ0KTtcbiAgZWwuc2VsZWN0aW9uRW5kID0gcGFyc2UoZWwsIHAuZW5kKTtcbn1cblxuZnVuY3Rpb24gaGFyZFNldCAoZWwsIHApIHtcbiAgdmFyIHJhbmdlID0gZWwuY3JlYXRlVGV4dFJhbmdlKCk7XG5cbiAgaWYgKHAuc3RhcnQgPT09ICdlbmQnICYmIHAuZW5kID09PSAnZW5kJykge1xuICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBwYXJzZShlbCwgcC5lbmQpKTtcbiAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIHBhcnNlKGVsLCBwLnN0YXJ0KSk7XG4gICAgcmFuZ2Uuc2VsZWN0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2UgKGVsLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09ICdlbmQnID8gZWwudmFsdWUubGVuZ3RoIDogdmFsdWUgfHwgMDtcbn1cblxuZnVuY3Rpb24gc2VsbCAoZWwsIHApIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICBzZXQoZWwsIHApO1xuICB9XG4gIHJldHVybiBnZXQoZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbGw7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBzZWxsID0gcmVxdWlyZSgnc2VsbCcpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIHNlbGVjY2lvbiA9IHJlcXVpcmUoJ3NlbGVjY2lvbicpO1xudmFyIHRocm90dGxlID0gcmVxdWlyZSgnLi90aHJvdHRsZScpO1xudmFyIGdldFNlbGVjdGlvbiA9IHNlbGVjY2lvbi5nZXQ7XG52YXIgcHJvcHMgPSBbXG4gICdkaXJlY3Rpb24nLFxuICAnYm94U2l6aW5nJyxcbiAgJ3dpZHRoJyxcbiAgJ2hlaWdodCcsXG4gICdvdmVyZmxvd1gnLFxuICAnb3ZlcmZsb3dZJyxcbiAgJ2JvcmRlclRvcFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdCb3R0b20nLFxuICAncGFkZGluZ0xlZnQnLFxuICAnZm9udFN0eWxlJyxcbiAgJ2ZvbnRWYXJpYW50JyxcbiAgJ2ZvbnRXZWlnaHQnLFxuICAnZm9udFN0cmV0Y2gnLFxuICAnZm9udFNpemUnLFxuICAnZm9udFNpemVBZGp1c3QnLFxuICAnbGluZUhlaWdodCcsXG4gICdmb250RmFtaWx5JyxcbiAgJ3RleHRBbGlnbicsXG4gICd0ZXh0VHJhbnNmb3JtJyxcbiAgJ3RleHRJbmRlbnQnLFxuICAndGV4dERlY29yYXRpb24nLFxuICAnbGV0dGVyU3BhY2luZycsXG4gICd3b3JkU3BhY2luZydcbl07XG52YXIgd2luID0gZ2xvYmFsO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGZmID0gd2luLm1veklubmVyU2NyZWVuWCAhPT0gbnVsbCAmJiB3aW4ubW96SW5uZXJTY3JlZW5YICE9PSB2b2lkIDA7XG5cbmZ1bmN0aW9uIHRhaWxvcm1hZGUgKGVsLCBvcHRpb25zKSB7XG4gIHZhciB0ZXh0SW5wdXQgPSBlbC50YWdOYW1lID09PSAnSU5QVVQnIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQSc7XG4gIHZhciB0aHJvdHRsZWRSZWZyZXNoID0gdGhyb3R0bGUocmVmcmVzaCwgMzApO1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG5cbiAgYmluZCgpO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZDogcmVhZFBvc2l0aW9uLFxuICAgIHJlZnJlc2g6IHRocm90dGxlZFJlZnJlc2gsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xuXG4gIGZ1bmN0aW9uIG5vb3AgKCkge31cbiAgZnVuY3Rpb24gcmVhZFBvc2l0aW9uICgpIHsgcmV0dXJuICh0ZXh0SW5wdXQgPyBjb29yZHNUZXh0IDogY29vcmRzSFRNTCkoKTsgfVxuXG4gIGZ1bmN0aW9uIHJlZnJlc2ggKCkge1xuICAgIGlmIChvLnNsZWVwaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoby51cGRhdGUgfHwgbm9vcCkocmVhZFBvc2l0aW9uKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29vcmRzVGV4dCAoKSB7XG4gICAgdmFyIHAgPSBzZWxsKGVsKTtcbiAgICB2YXIgY29udGV4dCA9IHByZXBhcmUoKTtcbiAgICB2YXIgcmVhZGluZ3MgPSByZWFkVGV4dENvb3Jkcyhjb250ZXh0LCBwLnN0YXJ0KTtcbiAgICBkb2MuYm9keS5yZW1vdmVDaGlsZChjb250ZXh0Lm1pcnJvcik7XG4gICAgcmV0dXJuIHJlYWRpbmdzO1xuICB9XG5cbiAgZnVuY3Rpb24gY29vcmRzSFRNTCAoKSB7XG4gICAgdmFyIHNlbCA9IGdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWwucmFuZ2VDb3VudCkge1xuICAgICAgdmFyIHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XG4gICAgICB2YXIgbmVlZHNUb1dvcmtBcm91bmROZXdsaW5lQnVnID0gcmFuZ2Uuc3RhcnRDb250YWluZXIubm9kZU5hbWUgPT09ICdQJyAmJiByYW5nZS5zdGFydE9mZnNldCA9PT0gMDtcbiAgICAgIGlmIChuZWVkc1RvV29ya0Fyb3VuZE5ld2xpbmVCdWcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiByYW5nZS5zdGFydENvbnRhaW5lci5vZmZzZXRMZWZ0LFxuICAgICAgICAgIHk6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm9mZnNldFRvcCxcbiAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKHJhbmdlLmdldENsaWVudFJlY3RzKSB7XG4gICAgICAgIHZhciByZWN0cyA9IHJhbmdlLmdldENsaWVudFJlY3RzKCk7XG4gICAgICAgIGlmIChyZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHJlY3RzWzBdLmxlZnQsXG4gICAgICAgICAgICB5OiByZWN0c1swXS50b3AsXG4gICAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgeDogMCwgeTogMCB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFRleHRDb29yZHMgKGNvbnRleHQsIHApIHtcbiAgICB2YXIgcmVzdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdmFyIG1pcnJvciA9IGNvbnRleHQubWlycm9yO1xuICAgIHZhciBjb21wdXRlZCA9IGNvbnRleHQuY29tcHV0ZWQ7XG5cbiAgICB3cml0ZShtaXJyb3IsIHJlYWQoZWwpLnN1YnN0cmluZygwLCBwKSk7XG5cbiAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgbWlycm9yLnRleHRDb250ZW50ID0gbWlycm9yLnRleHRDb250ZW50LnJlcGxhY2UoL1xccy9nLCAnXFx1MDBhMCcpO1xuICAgIH1cblxuICAgIHdyaXRlKHJlc3QsIHJlYWQoZWwpLnN1YnN0cmluZyhwKSB8fCAnLicpO1xuXG4gICAgbWlycm9yLmFwcGVuZENoaWxkKHJlc3QpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHJlc3Qub2Zmc2V0TGVmdCArIHBhcnNlSW50KGNvbXB1dGVkWydib3JkZXJMZWZ0V2lkdGgnXSksXG4gICAgICB5OiByZXN0Lm9mZnNldFRvcCArIHBhcnNlSW50KGNvbXB1dGVkWydib3JkZXJUb3BXaWR0aCddKVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChlbCkge1xuICAgIHJldHVybiB0ZXh0SW5wdXQgPyBlbC52YWx1ZSA6IGVsLmlubmVySFRNTDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXBhcmUgKCkge1xuICAgIHZhciBjb21wdXRlZCA9IHdpbi5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbCkgOiBlbC5jdXJyZW50U3R5bGU7XG4gICAgdmFyIG1pcnJvciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgc3R5bGUgPSBtaXJyb3Iuc3R5bGU7XG5cbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChtaXJyb3IpO1xuXG4gICAgaWYgKGVsLnRhZ05hbWUgIT09ICdJTlBVVCcpIHtcbiAgICAgIHN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnO1xuICAgIH1cbiAgICBzdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJztcbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIHByb3BzLmZvckVhY2goY29weSk7XG5cbiAgICBpZiAoZmYpIHtcbiAgICAgIHN0eWxlLndpZHRoID0gcGFyc2VJbnQoY29tcHV0ZWQud2lkdGgpIC0gMiArICdweCc7XG4gICAgICBpZiAoZWwuc2Nyb2xsSGVpZ2h0ID4gcGFyc2VJbnQoY29tcHV0ZWQuaGVpZ2h0KSkge1xuICAgICAgICBzdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgcmV0dXJuIHsgbWlycm9yOiBtaXJyb3IsIGNvbXB1dGVkOiBjb21wdXRlZCB9O1xuXG4gICAgZnVuY3Rpb24gY29weSAocHJvcCkge1xuICAgICAgc3R5bGVbcHJvcF0gPSBjb21wdXRlZFtwcm9wXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZSAoZWwsIHZhbHVlKSB7XG4gICAgaWYgKHRleHRJbnB1dCkge1xuICAgICAgZWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYmluZCAocmVtb3ZlKSB7XG4gICAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAna2V5ZG93bicsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXl1cCcsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdpbnB1dCcsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdwYXN0ZScsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdjaGFuZ2UnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGJpbmQodHJ1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0YWlsb3JtYWRlO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpZFd4c2MyVjVaUzkwWVdsc2IzSnRZV1JsTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlITmxiR3dnUFNCeVpYRjFhWEpsS0NkelpXeHNKeWs3WEc1MllYSWdZM0p2YzNOMlpXNTBJRDBnY21WeGRXbHlaU2duWTNKdmMzTjJaVzUwSnlrN1hHNTJZWElnYzJWc1pXTmphVzl1SUQwZ2NtVnhkV2x5WlNnbmMyVnNaV05qYVc5dUp5azdYRzUyWVhJZ2RHaHliM1IwYkdVZ1BTQnlaWEYxYVhKbEtDY3VMM1JvY205MGRHeGxKeWs3WEc1MllYSWdaMlYwVTJWc1pXTjBhVzl1SUQwZ2MyVnNaV05qYVc5dUxtZGxkRHRjYm5aaGNpQndjbTl3Y3lBOUlGdGNiaUFnSjJScGNtVmpkR2x2Ymljc1hHNGdJQ2RpYjNoVGFYcHBibWNuTEZ4dUlDQW5kMmxrZEdnbkxGeHVJQ0FuYUdWcFoyaDBKeXhjYmlBZ0oyOTJaWEptYkc5M1dDY3NYRzRnSUNkdmRtVnlabXh2ZDFrbkxGeHVJQ0FuWW05eVpHVnlWRzl3VjJsa2RHZ25MRnh1SUNBblltOXlaR1Z5VW1sbmFIUlhhV1IwYUNjc1hHNGdJQ2RpYjNKa1pYSkNiM1IwYjIxWGFXUjBhQ2NzWEc0Z0lDZGliM0prWlhKTVpXWjBWMmxrZEdnbkxGeHVJQ0FuY0dGa1pHbHVaMVJ2Y0Njc1hHNGdJQ2R3WVdSa2FXNW5VbWxuYUhRbkxGeHVJQ0FuY0dGa1pHbHVaMEp2ZEhSdmJTY3NYRzRnSUNkd1lXUmthVzVuVEdWbWRDY3NYRzRnSUNkbWIyNTBVM1I1YkdVbkxGeHVJQ0FuWm05dWRGWmhjbWxoYm5RbkxGeHVJQ0FuWm05dWRGZGxhV2RvZENjc1hHNGdJQ2RtYjI1MFUzUnlaWFJqYUNjc1hHNGdJQ2RtYjI1MFUybDZaU2NzWEc0Z0lDZG1iMjUwVTJsNlpVRmthblZ6ZENjc1hHNGdJQ2RzYVc1bFNHVnBaMmgwSnl4Y2JpQWdKMlp2Ym5SR1lXMXBiSGtuTEZ4dUlDQW5kR1Y0ZEVGc2FXZHVKeXhjYmlBZ0ozUmxlSFJVY21GdWMyWnZjbTBuTEZ4dUlDQW5kR1Y0ZEVsdVpHVnVkQ2NzWEc0Z0lDZDBaWGgwUkdWamIzSmhkR2x2Ymljc1hHNGdJQ2RzWlhSMFpYSlRjR0ZqYVc1bkp5eGNiaUFnSjNkdmNtUlRjR0ZqYVc1bkoxeHVYVHRjYm5aaGNpQjNhVzRnUFNCbmJHOWlZV3c3WEc1MllYSWdaRzlqSUQwZ1pHOWpkVzFsYm5RN1hHNTJZWElnWm1ZZ1BTQjNhVzR1Ylc5NlNXNXVaWEpUWTNKbFpXNVlJQ0U5UFNCdWRXeHNJQ1ltSUhkcGJpNXRiM3BKYm01bGNsTmpjbVZsYmxnZ0lUMDlJSFp2YVdRZ01EdGNibHh1Wm5WdVkzUnBiMjRnZEdGcGJHOXliV0ZrWlNBb1pXd3NJRzl3ZEdsdmJuTXBJSHRjYmlBZ2RtRnlJSFJsZUhSSmJuQjFkQ0E5SUdWc0xuUmhaMDVoYldVZ1BUMDlJQ2RKVGxCVlZDY2dmSHdnWld3dWRHRm5UbUZ0WlNBOVBUMGdKMVJGV0ZSQlVrVkJKenRjYmlBZ2RtRnlJSFJvY205MGRHeGxaRkpsWm5KbGMyZ2dQU0IwYUhKdmRIUnNaU2h5WldaeVpYTm9MQ0F6TUNrN1hHNGdJSFpoY2lCdklEMGdiM0IwYVc5dWN5QjhmQ0I3ZlR0Y2JseHVJQ0JpYVc1a0tDazdYRzVjYmlBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0J5WldGa09pQnlaV0ZrVUc5emFYUnBiMjRzWEc0Z0lDQWdjbVZtY21WemFEb2dkR2h5YjNSMGJHVmtVbVZtY21WemFDeGNiaUFnSUNCa1pYTjBjbTk1T2lCa1pYTjBjbTk1WEc0Z0lIMDdYRzVjYmlBZ1puVnVZM1JwYjI0Z2JtOXZjQ0FvS1NCN2ZWeHVJQ0JtZFc1amRHbHZiaUJ5WldGa1VHOXphWFJwYjI0Z0tDa2dleUJ5WlhSMWNtNGdLSFJsZUhSSmJuQjFkQ0EvSUdOdmIzSmtjMVJsZUhRZ09pQmpiMjl5WkhOSVZFMU1LU2dwT3lCOVhHNWNiaUFnWm5WdVkzUnBiMjRnY21WbWNtVnphQ0FvS1NCN1hHNGdJQ0FnYVdZZ0tHOHVjMnhsWlhCcGJtY3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJQ2h2TG5Wd1pHRjBaU0I4ZkNCdWIyOXdLU2h5WldGa1VHOXphWFJwYjI0b0tTazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJqYjI5eVpITlVaWGgwSUNncElIdGNiaUFnSUNCMllYSWdjQ0E5SUhObGJHd29aV3dwTzF4dUlDQWdJSFpoY2lCamIyNTBaWGgwSUQwZ2NISmxjR0Z5WlNncE8xeHVJQ0FnSUhaaGNpQnlaV0ZrYVc1bmN5QTlJSEpsWVdSVVpYaDBRMjl2Y21SektHTnZiblJsZUhRc0lIQXVjM1JoY25RcE8xeHVJQ0FnSUdSdll5NWliMlI1TG5KbGJXOTJaVU5vYVd4a0tHTnZiblJsZUhRdWJXbHljbTl5S1R0Y2JpQWdJQ0J5WlhSMWNtNGdjbVZoWkdsdVozTTdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJqYjI5eVpITklWRTFNSUNncElIdGNiaUFnSUNCMllYSWdjMlZzSUQwZ1oyVjBVMlZzWldOMGFXOXVLQ2s3WEc0Z0lDQWdhV1lnS0hObGJDNXlZVzVuWlVOdmRXNTBLU0I3WEc0Z0lDQWdJQ0IyWVhJZ2NtRnVaMlVnUFNCelpXd3VaMlYwVW1GdVoyVkJkQ2d3S1R0Y2JpQWdJQ0FnSUhaaGNpQnVaV1ZrYzFSdlYyOXlhMEZ5YjNWdVpFNWxkMnhwYm1WQ2RXY2dQU0J5WVc1blpTNXpkR0Z5ZEVOdmJuUmhhVzVsY2k1dWIyUmxUbUZ0WlNBOVBUMGdKMUFuSUNZbUlISmhibWRsTG5OMFlYSjBUMlptYzJWMElEMDlQU0F3TzF4dUlDQWdJQ0FnYVdZZ0tHNWxaV1J6Vkc5WGIzSnJRWEp2ZFc1a1RtVjNiR2x1WlVKMVp5a2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdJQ0FnSUhnNklISmhibWRsTG5OMFlYSjBRMjl1ZEdGcGJtVnlMbTltWm5ObGRFeGxablFzWEc0Z0lDQWdJQ0FnSUNBZ2VUb2djbUZ1WjJVdWMzUmhjblJEYjI1MFlXbHVaWEl1YjJabWMyVjBWRzl3TEZ4dUlDQWdJQ0FnSUNBZ0lHRmljMjlzZFhSbE9pQjBjblZsWEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9jbUZ1WjJVdVoyVjBRMnhwWlc1MFVtVmpkSE1wSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJSEpsWTNSeklEMGdjbUZ1WjJVdVoyVjBRMnhwWlc1MFVtVmpkSE1vS1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLSEpsWTNSekxteGxibWQwYUNBK0lEQXBJSHRjYmlBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdlRG9nY21WamRITmJNRjB1YkdWbWRDeGNiaUFnSUNBZ0lDQWdJQ0FnSUhrNklISmxZM1J6V3pCZExuUnZjQ3hjYmlBZ0lDQWdJQ0FnSUNBZ0lHRmljMjlzZFhSbE9pQjBjblZsWEc0Z0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnZXlCNE9pQXdMQ0I1T2lBd0lIMDdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ5WldGa1ZHVjRkRU52YjNKa2N5QW9ZMjl1ZEdWNGRDd2djQ2tnZTF4dUlDQWdJSFpoY2lCeVpYTjBJRDBnWkc5akxtTnlaV0YwWlVWc1pXMWxiblFvSjNOd1lXNG5LVHRjYmlBZ0lDQjJZWElnYldseWNtOXlJRDBnWTI5dWRHVjRkQzV0YVhKeWIzSTdYRzRnSUNBZ2RtRnlJR052YlhCMWRHVmtJRDBnWTI5dWRHVjRkQzVqYjIxd2RYUmxaRHRjYmx4dUlDQWdJSGR5YVhSbEtHMXBjbkp2Y2l3Z2NtVmhaQ2hsYkNrdWMzVmljM1J5YVc1bktEQXNJSEFwS1R0Y2JseHVJQ0FnSUdsbUlDaGxiQzUwWVdkT1lXMWxJRDA5UFNBblNVNVFWVlFuS1NCN1hHNGdJQ0FnSUNCdGFYSnliM0l1ZEdWNGRFTnZiblJsYm5RZ1BTQnRhWEp5YjNJdWRHVjRkRU52Ym5SbGJuUXVjbVZ3YkdGalpTZ3ZYRnh6TDJjc0lDZGNYSFV3TUdFd0p5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2QzSnBkR1VvY21WemRDd2djbVZoWkNobGJDa3VjM1ZpYzNSeWFXNW5LSEFwSUh4OElDY3VKeWs3WEc1Y2JpQWdJQ0J0YVhKeWIzSXVZWEJ3Wlc1a1EyaHBiR1FvY21WemRDazdYRzVjYmlBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ2VEb2djbVZ6ZEM1dlptWnpaWFJNWldaMElDc2djR0Z5YzJWSmJuUW9ZMjl0Y0hWMFpXUmJKMkp2Y21SbGNreGxablJYYVdSMGFDZGRLU3hjYmlBZ0lDQWdJSGs2SUhKbGMzUXViMlptYzJWMFZHOXdJQ3NnY0dGeWMyVkpiblFvWTI5dGNIVjBaV1JiSjJKdmNtUmxjbFJ2Y0ZkcFpIUm9KMTBwWEc0Z0lDQWdmVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhKbFlXUWdLR1ZzS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJsZUhSSmJuQjFkQ0EvSUdWc0xuWmhiSFZsSURvZ1pXd3VhVzV1WlhKSVZFMU1PMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnY0hKbGNHRnlaU0FvS1NCN1hHNGdJQ0FnZG1GeUlHTnZiWEIxZEdWa0lEMGdkMmx1TG1kbGRFTnZiWEIxZEdWa1UzUjViR1VnUHlCblpYUkRiMjF3ZFhSbFpGTjBlV3hsS0dWc0tTQTZJR1ZzTG1OMWNuSmxiblJUZEhsc1pUdGNiaUFnSUNCMllYSWdiV2x5Y205eUlEMGdaRzlqTG1OeVpXRjBaVVZzWlcxbGJuUW9KMlJwZGljcE8xeHVJQ0FnSUhaaGNpQnpkSGxzWlNBOUlHMXBjbkp2Y2k1emRIbHNaVHRjYmx4dUlDQWdJR1J2WXk1aWIyUjVMbUZ3Y0dWdVpFTm9hV3hrS0cxcGNuSnZjaWs3WEc1Y2JpQWdJQ0JwWmlBb1pXd3VkR0ZuVG1GdFpTQWhQVDBnSjBsT1VGVlVKeWtnZTF4dUlDQWdJQ0FnYzNSNWJHVXVkMjl5WkZkeVlYQWdQU0FuWW5KbFlXc3RkMjl5WkNjN1hHNGdJQ0FnZlZ4dUlDQWdJSE4wZVd4bExuZG9hWFJsVTNCaFkyVWdQU0FuY0hKbExYZHlZWEFuTzF4dUlDQWdJSE4wZVd4bExuQnZjMmwwYVc5dUlEMGdKMkZpYzI5c2RYUmxKenRjYmlBZ0lDQnpkSGxzWlM1MmFYTnBZbWxzYVhSNUlEMGdKMmhwWkdSbGJpYzdYRzRnSUNBZ2NISnZjSE11Wm05eVJXRmphQ2hqYjNCNUtUdGNibHh1SUNBZ0lHbG1JQ2htWmlrZ2UxeHVJQ0FnSUNBZ2MzUjViR1V1ZDJsa2RHZ2dQU0J3WVhKelpVbHVkQ2hqYjIxd2RYUmxaQzUzYVdSMGFDa2dMU0F5SUNzZ0ozQjRKenRjYmlBZ0lDQWdJR2xtSUNobGJDNXpZM0p2Ykd4SVpXbG5hSFFnUGlCd1lYSnpaVWx1ZENoamIyMXdkWFJsWkM1b1pXbG5hSFFwS1NCN1hHNGdJQ0FnSUNBZ0lITjBlV3hsTG05MlpYSm1iRzkzV1NBOUlDZHpZM0p2Ykd3bk8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0J6ZEhsc1pTNXZkbVZ5Wm14dmR5QTlJQ2RvYVdSa1pXNG5PMXh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnZXlCdGFYSnliM0k2SUcxcGNuSnZjaXdnWTI5dGNIVjBaV1E2SUdOdmJYQjFkR1ZrSUgwN1hHNWNiaUFnSUNCbWRXNWpkR2x2YmlCamIzQjVJQ2h3Y205d0tTQjdYRzRnSUNBZ0lDQnpkSGxzWlZ0d2NtOXdYU0E5SUdOdmJYQjFkR1ZrVzNCeWIzQmRPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSGR5YVhSbElDaGxiQ3dnZG1Gc2RXVXBJSHRjYmlBZ0lDQnBaaUFvZEdWNGRFbHVjSFYwS1NCN1hHNGdJQ0FnSUNCbGJDNTBaWGgwUTI5dWRHVnVkQ0E5SUhaaGJIVmxPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCbGJDNXBibTVsY2toVVRVd2dQU0IyWVd4MVpUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmlhVzVrSUNoeVpXMXZkbVVwSUh0Y2JpQWdJQ0IyWVhJZ2IzQWdQU0J5WlcxdmRtVWdQeUFuY21WdGIzWmxKeUE2SUNkaFpHUW5PMXh1SUNBZ0lHTnliM056ZG1WdWRGdHZjRjBvWld3c0lDZHJaWGxrYjNkdUp5d2dkR2h5YjNSMGJHVmtVbVZtY21WemFDazdYRzRnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hsYkN3Z0oydGxlWFZ3Snl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwVzI5d1hTaGxiQ3dnSjJsdWNIVjBKeXdnZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNobGJDd2dKM0JoYzNSbEp5d2dkR2h5YjNSMGJHVmtVbVZtY21WemFDazdYRzRnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hsYkN3Z0oyTm9ZVzVuWlNjc0lIUm9jbTkwZEd4bFpGSmxabkpsYzJncE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdaR1Z6ZEhKdmVTQW9LU0I3WEc0Z0lDQWdZbWx1WkNoMGNuVmxLVHRjYmlBZ2ZWeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhSaGFXeHZjbTFoWkdVN1hHNGlYWDA9IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB0aHJvdHRsZSAoZm4sIGJvdW5kYXJ5KSB7XG4gIHZhciBsYXN0ID0gLUluZmluaXR5O1xuICB2YXIgdGltZXI7XG4gIHJldHVybiBmdW5jdGlvbiBib3VuY2VkICgpIHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdW5ib3VuZCgpO1xuXG4gICAgZnVuY3Rpb24gdW5ib3VuZCAoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgdmFyIG5leHQgPSBsYXN0ICsgYm91bmRhcnk7XG4gICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIGlmIChub3cgPiBuZXh0KSB7XG4gICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQodW5ib3VuZCwgbmV4dCAtIG5vdyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXG52YXIgTmF0aXZlQ3VzdG9tRXZlbnQgPSBnbG9iYWwuQ3VzdG9tRXZlbnQ7XG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHAgPSBuZXcgTmF0aXZlQ3VzdG9tRXZlbnQoJ2NhdCcsIHsgZGV0YWlsOiB7IGZvbzogJ2JhcicgfSB9KTtcbiAgICByZXR1cm4gICdjYXQnID09PSBwLnR5cGUgJiYgJ2JhcicgPT09IHAuZGV0YWlsLmZvbztcbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcm9zcy1icm93c2VyIGBDdXN0b21FdmVudGAgY29uc3RydWN0b3IuXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50LkN1c3RvbUV2ZW50XG4gKlxuICogQHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdXNlTmF0aXZlKCkgPyBOYXRpdmVDdXN0b21FdmVudCA6XG5cbi8vIElFID49IDlcbidmdW5jdGlvbicgPT09IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFdmVudCA/IGZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gIH0gZWxzZSB7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlLCB2b2lkIDApO1xuICB9XG4gIHJldHVybiBlO1xufSA6XG5cbi8vIElFIDw9IDhcbmZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICBlLnR5cGUgPSB0eXBlO1xuICBpZiAocGFyYW1zKSB7XG4gICAgZS5idWJibGVzID0gQm9vbGVhbihwYXJhbXMuYnViYmxlcyk7XG4gICAgZS5jYW5jZWxhYmxlID0gQm9vbGVhbihwYXJhbXMuY2FuY2VsYWJsZSk7XG4gICAgZS5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICB9IGVsc2Uge1xuICAgIGUuYnViYmxlcyA9IGZhbHNlO1xuICAgIGUuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgIGUuZGV0YWlsID0gdm9pZCAwO1xuICB9XG4gIHJldHVybiBlO1xufVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlqY205emMzWmxiblF2Ym05a1pWOXRiMlIxYkdWekwyTjFjM1J2YlMxbGRtVnVkQzlwYm1SbGVDNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklseHVkbUZ5SUU1aGRHbDJaVU4xYzNSdmJVVjJaVzUwSUQwZ1oyeHZZbUZzTGtOMWMzUnZiVVYyWlc1ME8xeHVYRzVtZFc1amRHbHZiaUIxYzJWT1lYUnBkbVVnS0NrZ2UxeHVJQ0IwY25rZ2UxeHVJQ0FnSUhaaGNpQndJRDBnYm1WM0lFNWhkR2wyWlVOMWMzUnZiVVYyWlc1MEtDZGpZWFFuTENCN0lHUmxkR0ZwYkRvZ2V5Qm1iMjg2SUNkaVlYSW5JSDBnZlNrN1hHNGdJQ0FnY21WMGRYSnVJQ0FuWTJGMEp5QTlQVDBnY0M1MGVYQmxJQ1ltSUNkaVlYSW5JRDA5UFNCd0xtUmxkR0ZwYkM1bWIyODdYRzRnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1ptRnNjMlU3WEc1OVhHNWNiaThxS2x4dUlDb2dRM0p2YzNNdFluSnZkM05sY2lCZ1EzVnpkRzl0UlhabGJuUmdJR052Ym5OMGNuVmpkRzl5TGx4dUlDcGNiaUFxSUdoMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBGUVNTOURkWE4wYjIxRmRtVnVkQzVEZFhOMGIyMUZkbVZ1ZEZ4dUlDcGNiaUFxSUVCd2RXSnNhV05jYmlBcUwxeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSFZ6WlU1aGRHbDJaU2dwSUQ4Z1RtRjBhWFpsUTNWemRHOXRSWFpsYm5RZ09seHVYRzR2THlCSlJTQStQU0E1WEc0blpuVnVZM1JwYjI0bklEMDlQU0IwZVhCbGIyWWdaRzlqZFcxbGJuUXVZM0psWVhSbFJYWmxiblFnUHlCbWRXNWpkR2x2YmlCRGRYTjBiMjFGZG1WdWRDQW9kSGx3WlN3Z2NHRnlZVzF6S1NCN1hHNGdJSFpoY2lCbElEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJYWmxiblFvSjBOMWMzUnZiVVYyWlc1MEp5azdYRzRnSUdsbUlDaHdZWEpoYlhNcElIdGNiaUFnSUNCbExtbHVhWFJEZFhOMGIyMUZkbVZ1ZENoMGVYQmxMQ0J3WVhKaGJYTXVZblZpWW14bGN5d2djR0Z5WVcxekxtTmhibU5sYkdGaWJHVXNJSEJoY21GdGN5NWtaWFJoYVd3cE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHVXVhVzVwZEVOMWMzUnZiVVYyWlc1MEtIUjVjR1VzSUdaaGJITmxMQ0JtWVd4elpTd2dkbTlwWkNBd0tUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1pUdGNibjBnT2x4dVhHNHZMeUJKUlNBOFBTQTRYRzVtZFc1amRHbHZiaUJEZFhOMGIyMUZkbVZ1ZENBb2RIbHdaU3dnY0dGeVlXMXpLU0I3WEc0Z0lIWmhjaUJsSUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUlhabGJuUlBZbXBsWTNRb0tUdGNiaUFnWlM1MGVYQmxJRDBnZEhsd1pUdGNiaUFnYVdZZ0tIQmhjbUZ0Y3lrZ2UxeHVJQ0FnSUdVdVluVmlZbXhsY3lBOUlFSnZiMnhsWVc0b2NHRnlZVzF6TG1KMVltSnNaWE1wTzF4dUlDQWdJR1V1WTJGdVkyVnNZV0pzWlNBOUlFSnZiMnhsWVc0b2NHRnlZVzF6TG1OaGJtTmxiR0ZpYkdVcE8xeHVJQ0FnSUdVdVpHVjBZV2xzSUQwZ2NHRnlZVzF6TG1SbGRHRnBiRHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JsTG1KMVltSnNaWE1nUFNCbVlXeHpaVHRjYmlBZ0lDQmxMbU5oYm1ObGJHRmliR1VnUFNCbVlXeHpaVHRjYmlBZ0lDQmxMbVJsZEdGcGJDQTlJSFp2YVdRZ01EdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1pUdGNibjFjYmlKZGZRPT0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBjdXN0b21FdmVudCA9IHJlcXVpcmUoJ2N1c3RvbS1ldmVudCcpO1xudmFyIGV2ZW50bWFwID0gcmVxdWlyZSgnLi9ldmVudG1hcCcpO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGFkZEV2ZW50ID0gYWRkRXZlbnRFYXN5O1xudmFyIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRFYXN5O1xudmFyIGhhcmRDYWNoZSA9IFtdO1xuXG5pZiAoIWdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gIGFkZEV2ZW50ID0gYWRkRXZlbnRIYXJkO1xuICByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50SGFyZDtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHVud3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlLCBtb2RlbCkge1xuICB2YXIgZSA9IGV2ZW50bWFwLmluZGV4T2YodHlwZSkgPT09IC0xID8gbWFrZUN1c3RvbUV2ZW50KCkgOiBtYWtlQ2xhc3NpY0V2ZW50KCk7XG4gIGlmIChlbC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDbGFzc2ljRXZlbnQgKCkge1xuICAgIHZhciBlO1xuICAgIGlmIChkb2MuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ3VzdG9tRXZlbnQgKCkge1xuICAgIHJldHVybiBuZXcgY3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWw6IG1vZGVsIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBmbi5jYWxsKGVsLCBlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciB3cmFwcGVyID0gdW53cmFwKGVsLCB0eXBlLCBmbikgfHwgd3JhcHBlckZhY3RvcnkoZWwsIHR5cGUsIGZuKTtcbiAgaGFyZENhY2hlLnB1c2goe1xuICAgIHdyYXBwZXI6IHdyYXBwZXIsXG4gICAgZWxlbWVudDogZWwsXG4gICAgdHlwZTogdHlwZSxcbiAgICBmbjogZm5cbiAgfSk7XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiB1bndyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSA9IGZpbmQoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgd3JhcHBlciA9IGhhcmRDYWNoZVtpXS53cmFwcGVyO1xuICAgIGhhcmRDYWNoZS5zcGxpY2UoaSwgMSk7IC8vIGZyZWUgdXAgYSB0YWQgb2YgbWVtb3J5XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpLCBpdGVtO1xuICBmb3IgKGkgPSAwOyBpIDwgaGFyZENhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbSA9IGhhcmRDYWNoZVtpXTtcbiAgICBpZiAoaXRlbS5lbGVtZW50ID09PSBlbCAmJiBpdGVtLnR5cGUgPT09IHR5cGUgJiYgaXRlbS5mbiA9PT0gZm4pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRFdmVudCxcbiAgcmVtb3ZlOiByZW1vdmVFdmVudCxcbiAgZmFicmljYXRlOiBmYWJyaWNhdGVFdmVudFxufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5amNtOXpjM1psYm5RdmMzSmpMMk55YjNOemRtVnVkQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJqZFhOMGIyMUZkbVZ1ZENBOUlISmxjWFZwY21Vb0oyTjFjM1J2YlMxbGRtVnVkQ2NwTzF4dWRtRnlJR1YyWlc1MGJXRndJRDBnY21WeGRXbHlaU2duTGk5bGRtVnVkRzFoY0NjcE8xeHVkbUZ5SUdSdll5QTlJR1J2WTNWdFpXNTBPMXh1ZG1GeUlHRmtaRVYyWlc1MElEMGdZV1JrUlhabGJuUkZZWE41TzF4dWRtRnlJSEpsYlc5MlpVVjJaVzUwSUQwZ2NtVnRiM1psUlhabGJuUkZZWE41TzF4dWRtRnlJR2hoY21SRFlXTm9aU0E5SUZ0ZE8xeHVYRzVwWmlBb0lXZHNiMkpoYkM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S1NCN1hHNGdJR0ZrWkVWMlpXNTBJRDBnWVdSa1JYWmxiblJJWVhKa08xeHVJQ0J5WlcxdmRtVkZkbVZ1ZENBOUlISmxiVzkyWlVWMlpXNTBTR0Z5WkR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWVdSa1JYWmxiblJGWVhONUlDaGxiQ3dnZEhsd1pTd2dabTRzSUdOaGNIUjFjbWx1WnlrZ2UxeHVJQ0J5WlhSMWNtNGdaV3d1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWgwZVhCbExDQm1iaXdnWTJGd2RIVnlhVzVuS1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWVdSa1JYWmxiblJJWVhKa0lDaGxiQ3dnZEhsd1pTd2dabTRwSUh0Y2JpQWdjbVYwZFhKdUlHVnNMbUYwZEdGamFFVjJaVzUwS0NkdmJpY2dLeUIwZVhCbExDQjNjbUZ3S0dWc0xDQjBlWEJsTENCbWJpa3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaVzF2ZG1WRmRtVnVkRVZoYzNrZ0tHVnNMQ0IwZVhCbExDQm1iaXdnWTJGd2RIVnlhVzVuS1NCN1hHNGdJSEpsZEhWeWJpQmxiQzV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0hSNWNHVXNJR1p1TENCallYQjBkWEpwYm1jcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVpXMXZkbVZGZG1WdWRFaGhjbVFnS0dWc0xDQjBlWEJsTENCbWJpa2dlMXh1SUNCeVpYUjFjbTRnWld3dVpHVjBZV05vUlhabGJuUW9KMjl1SnlBcklIUjVjR1VzSUhWdWQzSmhjQ2hsYkN3Z2RIbHdaU3dnWm00cEtUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1ptRmljbWxqWVhSbFJYWmxiblFnS0dWc0xDQjBlWEJsTENCdGIyUmxiQ2tnZTF4dUlDQjJZWElnWlNBOUlHVjJaVzUwYldGd0xtbHVaR1Y0VDJZb2RIbHdaU2tnUFQwOUlDMHhJRDhnYldGclpVTjFjM1J2YlVWMlpXNTBLQ2tnT2lCdFlXdGxRMnhoYzNOcFkwVjJaVzUwS0NrN1hHNGdJR2xtSUNobGJDNWthWE53WVhSamFFVjJaVzUwS1NCN1hHNGdJQ0FnWld3dVpHbHpjR0YwWTJoRmRtVnVkQ2hsS1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCbGJDNW1hWEpsUlhabGJuUW9KMjl1SnlBcklIUjVjR1VzSUdVcE8xeHVJQ0I5WEc0Z0lHWjFibU4wYVc5dUlHMWhhMlZEYkdGemMybGpSWFpsYm5RZ0tDa2dlMXh1SUNBZ0lIWmhjaUJsTzF4dUlDQWdJR2xtSUNoa2IyTXVZM0psWVhSbFJYWmxiblFwSUh0Y2JpQWdJQ0FnSUdVZ1BTQmtiMk11WTNKbFlYUmxSWFpsYm5Rb0owVjJaVzUwSnlrN1hHNGdJQ0FnSUNCbExtbHVhWFJGZG1WdWRDaDBlWEJsTENCMGNuVmxMQ0IwY25WbEtUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHUnZZeTVqY21WaGRHVkZkbVZ1ZEU5aWFtVmpkQ2tnZTF4dUlDQWdJQ0FnWlNBOUlHUnZZeTVqY21WaGRHVkZkbVZ1ZEU5aWFtVmpkQ2dwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1pUdGNiaUFnZlZ4dUlDQm1kVzVqZEdsdmJpQnRZV3RsUTNWemRHOXRSWFpsYm5RZ0tDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCdVpYY2dZM1Z6ZEc5dFJYWmxiblFvZEhsd1pTd2dleUJrWlhSaGFXdzZJRzF2WkdWc0lIMHBPMXh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUhkeVlYQndaWEpHWVdOMGIzSjVJQ2hsYkN3Z2RIbHdaU3dnWm00cElIdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJSGR5WVhCd1pYSWdLRzl5YVdkcGJtRnNSWFpsYm5RcElIdGNiaUFnSUNCMllYSWdaU0E5SUc5eWFXZHBibUZzUlhabGJuUWdmSHdnWjJ4dlltRnNMbVYyWlc1ME8xeHVJQ0FnSUdVdWRHRnlaMlYwSUQwZ1pTNTBZWEpuWlhRZ2ZId2daUzV6Y21ORmJHVnRaVzUwTzF4dUlDQWdJR1V1Y0hKbGRtVnVkRVJsWm1GMWJIUWdQU0JsTG5CeVpYWmxiblJFWldaaGRXeDBJSHg4SUdaMWJtTjBhVzl1SUhCeVpYWmxiblJFWldaaGRXeDBJQ2dwSUhzZ1pTNXlaWFIxY201V1lXeDFaU0E5SUdaaGJITmxPeUI5TzF4dUlDQWdJR1V1YzNSdmNGQnliM0JoWjJGMGFXOXVJRDBnWlM1emRHOXdVSEp2Y0dGbllYUnBiMjRnZkh3Z1puVnVZM1JwYjI0Z2MzUnZjRkJ5YjNCaFoyRjBhVzl1SUNncElIc2daUzVqWVc1alpXeENkV0ppYkdVZ1BTQjBjblZsT3lCOU8xeHVJQ0FnSUdVdWQyaHBZMmdnUFNCbExuZG9hV05vSUh4OElHVXVhMlY1UTI5a1pUdGNiaUFnSUNCbWJpNWpZV3hzS0dWc0xDQmxLVHRjYmlBZ2ZUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2QzSmhjQ0FvWld3c0lIUjVjR1VzSUdadUtTQjdYRzRnSUhaaGNpQjNjbUZ3Y0dWeUlEMGdkVzUzY21Gd0tHVnNMQ0IwZVhCbExDQm1iaWtnZkh3Z2QzSmhjSEJsY2taaFkzUnZjbmtvWld3c0lIUjVjR1VzSUdadUtUdGNiaUFnYUdGeVpFTmhZMmhsTG5CMWMyZ29lMXh1SUNBZ0lIZHlZWEJ3WlhJNklIZHlZWEJ3WlhJc1hHNGdJQ0FnWld4bGJXVnVkRG9nWld3c1hHNGdJQ0FnZEhsd1pUb2dkSGx3WlN4Y2JpQWdJQ0JtYmpvZ1ptNWNiaUFnZlNrN1hHNGdJSEpsZEhWeWJpQjNjbUZ3Y0dWeU8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCMWJuZHlZWEFnS0dWc0xDQjBlWEJsTENCbWJpa2dlMXh1SUNCMllYSWdhU0E5SUdacGJtUW9aV3dzSUhSNWNHVXNJR1p1S1R0Y2JpQWdhV1lnS0drcElIdGNiaUFnSUNCMllYSWdkM0poY0hCbGNpQTlJR2hoY21SRFlXTm9aVnRwWFM1M2NtRndjR1Z5TzF4dUlDQWdJR2hoY21SRFlXTm9aUzV6Y0d4cFkyVW9hU3dnTVNrN0lDOHZJR1p5WldVZ2RYQWdZU0IwWVdRZ2IyWWdiV1Z0YjNKNVhHNGdJQ0FnY21WMGRYSnVJSGR5WVhCd1pYSTdYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWm1sdVpDQW9aV3dzSUhSNWNHVXNJR1p1S1NCN1hHNGdJSFpoY2lCcExDQnBkR1Z0TzF4dUlDQm1iM0lnS0drZ1BTQXdPeUJwSUR3Z2FHRnlaRU5oWTJobExteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdhWFJsYlNBOUlHaGhjbVJEWVdOb1pWdHBYVHRjYmlBZ0lDQnBaaUFvYVhSbGJTNWxiR1Z0Wlc1MElEMDlQU0JsYkNBbUppQnBkR1Z0TG5SNWNHVWdQVDA5SUhSNWNHVWdKaVlnYVhSbGJTNW1iaUE5UFQwZ1ptNHBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnBPMXh1SUNBZ0lIMWNiaUFnZlZ4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHRjYmlBZ1lXUmtPaUJoWkdSRmRtVnVkQ3hjYmlBZ2NtVnRiM1psT2lCeVpXMXZkbVZGZG1WdWRDeGNiaUFnWm1GaWNtbGpZWFJsT2lCbVlXSnlhV05oZEdWRmRtVnVkRnh1ZlR0Y2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXZlbnRtYXAgPSBbXTtcbnZhciBldmVudG5hbWUgPSAnJztcbnZhciByb24gPSAvXm9uLztcblxuZm9yIChldmVudG5hbWUgaW4gZ2xvYmFsKSB7XG4gIGlmIChyb24udGVzdChldmVudG5hbWUpKSB7XG4gICAgZXZlbnRtYXAucHVzaChldmVudG5hbWUuc2xpY2UoMikpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXZlbnRtYXA7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWpjbTl6YzNabGJuUXZjM0pqTDJWMlpXNTBiV0Z3TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJsZG1WdWRHMWhjQ0E5SUZ0ZE8xeHVkbUZ5SUdWMlpXNTBibUZ0WlNBOUlDY25PMXh1ZG1GeUlISnZiaUE5SUM5ZWIyNHZPMXh1WEc1bWIzSWdLR1YyWlc1MGJtRnRaU0JwYmlCbmJHOWlZV3dwSUh0Y2JpQWdhV1lnS0hKdmJpNTBaWE4wS0dWMlpXNTBibUZ0WlNrcElIdGNiaUFnSUNCbGRtVnVkRzFoY0M1d2RYTm9LR1YyWlc1MGJtRnRaUzV6YkdsalpTZ3lLU2s3WEc0Z0lIMWNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbGRtVnVkRzFoY0R0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2VrdG9yID0gcmVxdWlyZSgnc2VrdG9yJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgcnNwYWNlcyA9IC9cXHMrL2c7XG52YXIga2V5bWFwID0ge1xuICAxMzogJ2VudGVyJyxcbiAgMjc6ICdlc2MnLFxuICAzMjogJ3NwYWNlJ1xufTtcbnZhciBoYW5kbGVycyA9IHt9O1xuXG5jcm9zc3ZlbnQuYWRkKHdpbmRvdywgJ2tleWRvd24nLCBrZXlkb3duKTtcblxuZnVuY3Rpb24gY2xlYXIgKGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQpIHtcbiAgICBpZiAoY29udGV4dCBpbiBoYW5kbGVycykge1xuICAgICAgaGFuZGxlcnNbY29udGV4dF0gPSB7fTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaGFuZGxlcnMgPSB7fTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzd2l0Y2hib2FyZCAodGhlbiwgY29tYm8sIG9wdGlvbnMsIGZuKSB7XG4gIGlmIChmbiA9PT0gdm9pZCAwKSB7XG4gICAgZm4gPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBjb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0IHx8ICdkZWZhdWx0cyc7XG5cbiAgaWYgKCFmbikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChoYW5kbGVyc1tjb250ZXh0XSA9PT0gdm9pZCAwKSB7XG4gICAgaGFuZGxlcnNbY29udGV4dF0gPSB7fTtcbiAgfVxuXG4gIGNvbWJvLnRvTG93ZXJDYXNlKCkuc3BsaXQocnNwYWNlcykuZm9yRWFjaChpdGVtKTtcblxuICBmdW5jdGlvbiBpdGVtIChrZXlzKSB7XG4gICAgdmFyIGMgPSBrZXlzLnRyaW0oKTtcbiAgICBpZiAoYy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhlbihoYW5kbGVyc1tjb250ZXh0XSwgYywgb3B0aW9ucywgZm4pO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uIChjb21ibywgb3B0aW9ucywgZm4pIHtcbiAgc3dpdGNoYm9hcmQoYWRkLCBjb21ibywgb3B0aW9ucywgZm4pO1xuXG4gIGZ1bmN0aW9uIGFkZCAoYXJlYSwga2V5LCBvcHRpb25zLCBmbikge1xuICAgIHZhciBoYW5kbGVyID0ge1xuICAgICAgaGFuZGxlOiBmbixcbiAgICAgIGZpbHRlcjogb3B0aW9ucy5maWx0ZXJcbiAgICB9O1xuICAgIGlmIChhcmVhW2tleV0pIHtcbiAgICAgIGFyZWFba2V5XS5wdXNoKGhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmVhW2tleV0gPSBbaGFuZGxlcl07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9mZiAoY29tYm8sIG9wdGlvbnMsIGZuKSB7XG4gIHN3aXRjaGJvYXJkKHJtLCBjb21ibywgb3B0aW9ucywgZm4pO1xuXG4gIGZ1bmN0aW9uIHJtIChhcmVhLCBrZXksIG9wdGlvbnMsIGZuKSB7XG4gICAgaWYgKGFyZWFba2V5XSkge1xuICAgICAgYXJlYVtrZXldID0gYXJlYVtrZXldLmZpbHRlcihtYXRjaGluZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hpbmcgKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBoYW5kbGVyLmhhbmRsZSA9PT0gZm4gJiYgaGFuZGxlci5maWx0ZXIgPT09IG9wdGlvbnMuZmlsdGVyO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRLZXlDb2RlIChlKSB7XG4gIHJldHVybiBlLndoaWNoIHx8IGUua2V5Q29kZSB8fCBlLmNoYXJDb2RlO1xufVxuXG5mdW5jdGlvbiBrZXlkb3duIChlKSB7XG4gIHZhciBjb2RlID0gZ2V0S2V5Q29kZShlKTtcbiAgdmFyIGtleSA9IGtleW1hcFtjb2RlXSB8fCBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZiAoa2V5KSB7XG4gICAgaGFuZGxlKGtleSwgZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VLZXlDb21ibyAoa2V5LCBlKSB7XG4gIHZhciBjb21ibyA9IFtrZXldO1xuICBpZiAoZS5zaGlmdEtleSkge1xuICAgIGNvbWJvLnVuc2hpZnQoJ3NoaWZ0Jyk7XG4gIH1cbiAgaWYgKGUuYWx0S2V5KSB7XG4gICAgY29tYm8udW5zaGlmdCgnYWx0Jyk7XG4gIH1cbiAgaWYgKGUuY3RybEtleSBeIGUubWV0YUtleSkge1xuICAgIGNvbWJvLnVuc2hpZnQoJ2NtZCcpO1xuICB9XG4gIHJldHVybiBjb21iby5qb2luKCcrJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlIChrZXksIGUpIHtcbiAgdmFyIGNvbWJvID0gcGFyc2VLZXlDb21ibyhrZXksIGUpO1xuICB2YXIgY29udGV4dDtcbiAgZm9yIChjb250ZXh0IGluIGhhbmRsZXJzKSB7XG4gICAgaWYgKGhhbmRsZXJzW2NvbnRleHRdW2NvbWJvXSkge1xuICAgICAgaGFuZGxlcnNbY29udGV4dF1bY29tYm9dLmZvckVhY2goZXhlYyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyZWQgKGhhbmRsZXIpIHtcbiAgICB2YXIgZmlsdGVyID0gaGFuZGxlci5maWx0ZXI7XG4gICAgaWYgKCFmaWx0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZWwgPSBlLnRhcmdldDtcbiAgICB2YXIgc2VsZWN0b3IgPSB0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJztcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBzZWt0b3IubWF0Y2hlc1NlbGVjdG9yKGVsLCBmaWx0ZXIpID09PSBmYWxzZTtcbiAgICB9XG4gICAgd2hpbGUgKGVsLnBhcmVudEVsZW1lbnQgJiYgZWwgIT09IGZpbHRlcikge1xuICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gZWwgIT09IGZpbHRlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4ZWMgKGhhbmRsZXIpIHtcbiAgICBpZiAoZmlsdGVyZWQoaGFuZGxlcikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGFuZGxlci5oYW5kbGUoZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uOiBvbixcbiAgb2ZmOiBvZmYsXG4gIGNsZWFyOiBjbGVhcixcbiAgaGFuZGxlcnM6IGhhbmRsZXJzXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXhwYW5kbyA9ICdzZWt0b3ItJyArIERhdGUubm93KCk7XG52YXIgcnNpYmxpbmdzID0gL1srfl0vO1xudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGRlbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbnZhciBtYXRjaCA9IGRlbC5tYXRjaGVzIHx8XG4gICAgICAgICAgICBkZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBkZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBkZWwub01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgZGVsLm1zTWF0Y2hlc1NlbGVjdG9yO1xuXG5mdW5jdGlvbiBxc2EgKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gIHZhciBleGlzdGVkLCBpZCwgcHJlZml4LCBwcmVmaXhlZCwgYWRhcHRlciwgaGFjayA9IGNvbnRleHQgIT09IGRvY3VtZW50O1xuICBpZiAoaGFjaykgeyAvLyBpZCBoYWNrIGZvciBjb250ZXh0LXJvb3RlZCBxdWVyaWVzXG4gICAgZXhpc3RlZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIGlkID0gZXhpc3RlZCB8fCBleHBhbmRvO1xuICAgIHByZWZpeCA9ICcjJyArIGlkICsgJyAnO1xuICAgIHByZWZpeGVkID0gcHJlZml4ICsgc2VsZWN0b3IucmVwbGFjZSgvLC9nLCAnLCcgKyBwcmVmaXgpO1xuICAgIGFkYXB0ZXIgPSByc2libGluZ3MudGVzdChzZWxlY3RvcikgJiYgY29udGV4dC5wYXJlbnROb2RlO1xuICAgIGlmICghZXhpc3RlZCkgeyBjb250ZXh0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7IH1cbiAgfVxuICB0cnkge1xuICAgIHJldHVybiAoYWRhcHRlciB8fCBjb250ZXh0KS5xdWVyeVNlbGVjdG9yQWxsKHByZWZpeGVkIHx8IHNlbGVjdG9yKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBbXTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoZXhpc3RlZCA9PT0gbnVsbCkgeyBjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTsgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmQgKHNlbGVjdG9yLCBjdHgsIGNvbGxlY3Rpb24sIHNlZWQpIHtcbiAgdmFyIGVsZW1lbnQ7XG4gIHZhciBjb250ZXh0ID0gY3R4IHx8IGRvY3VtZW50O1xuICB2YXIgcmVzdWx0cyA9IGNvbGxlY3Rpb24gfHwgW107XG4gIHZhciBpID0gMDtcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuICBpZiAoY29udGV4dC5ub2RlVHlwZSAhPT0gMSAmJiBjb250ZXh0Lm5vZGVUeXBlICE9PSA5KSB7XG4gICAgcmV0dXJuIFtdOyAvLyBiYWlsIGlmIGNvbnRleHQgaXMgbm90IGFuIGVsZW1lbnQgb3IgZG9jdW1lbnRcbiAgfVxuICBpZiAoc2VlZCkge1xuICAgIHdoaWxlICgoZWxlbWVudCA9IHNlZWRbaSsrXSkpIHtcbiAgICAgIGlmIChtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0cy5wdXNoLmFwcGx5KHJlc3VsdHMsIHFzYShzZWxlY3RvciwgY29udGV4dCkpO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVzIChzZWxlY3RvciwgZWxlbWVudHMpIHtcbiAgcmV0dXJuIGZpbmQoc2VsZWN0b3IsIG51bGwsIG51bGwsIGVsZW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gbWF0Y2guY2FsbChlbGVtZW50LCBzZWxlY3Rvcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZDtcblxuZmluZC5tYXRjaGVzID0gbWF0Y2hlcztcbmZpbmQubWF0Y2hlc1NlbGVjdG9yID0gbWF0Y2hlc1NlbGVjdG9yO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlyWVc1NVpTOXViMlJsWDIxdlpIVnNaWE12YzJWcmRHOXlMM055WXk5elpXdDBiM0l1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCbGVIQmhibVJ2SUQwZ0ozTmxhM1J2Y2kwbklDc2dSR0YwWlM1dWIzY29LVHRjYm5aaGNpQnljMmxpYkdsdVozTWdQU0F2V3l0K1hTODdYRzUyWVhJZ1pHOWpkVzFsYm5RZ1BTQm5iRzlpWVd3dVpHOWpkVzFsYm5RN1hHNTJZWElnWkdWc0lEMGdaRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1ME8xeHVkbUZ5SUcxaGRHTm9JRDBnWkdWc0xtMWhkR05vWlhNZ2ZIeGNiaUFnSUNBZ0lDQWdJQ0FnSUdSbGJDNTNaV0pyYVhSTllYUmphR1Z6VTJWc1pXTjBiM0lnZkh4Y2JpQWdJQ0FnSUNBZ0lDQWdJR1JsYkM1dGIzcE5ZWFJqYUdWelUyVnNaV04wYjNJZ2ZIeGNiaUFnSUNBZ0lDQWdJQ0FnSUdSbGJDNXZUV0YwWTJobGMxTmxiR1ZqZEc5eUlIeDhYRzRnSUNBZ0lDQWdJQ0FnSUNCa1pXd3ViWE5OWVhSamFHVnpVMlZzWldOMGIzSTdYRzVjYm1aMWJtTjBhVzl1SUhGellTQW9jMlZzWldOMGIzSXNJR052Ym5SbGVIUXBJSHRjYmlBZ2RtRnlJR1Y0YVhOMFpXUXNJR2xrTENCd2NtVm1hWGdzSUhCeVpXWnBlR1ZrTENCaFpHRndkR1Z5TENCb1lXTnJJRDBnWTI5dWRHVjRkQ0FoUFQwZ1pHOWpkVzFsYm5RN1hHNGdJR2xtSUNob1lXTnJLU0I3SUM4dklHbGtJR2hoWTJzZ1ptOXlJR052Ym5SbGVIUXRjbTl2ZEdWa0lIRjFaWEpwWlhOY2JpQWdJQ0JsZUdsemRHVmtJRDBnWTI5dWRHVjRkQzVuWlhSQmRIUnlhV0oxZEdVb0oybGtKeWs3WEc0Z0lDQWdhV1FnUFNCbGVHbHpkR1ZrSUh4OElHVjRjR0Z1Wkc4N1hHNGdJQ0FnY0hKbFptbDRJRDBnSnlNbklDc2dhV1FnS3lBbklDYzdYRzRnSUNBZ2NISmxabWw0WldRZ1BTQndjbVZtYVhnZ0t5QnpaV3hsWTNSdmNpNXlaWEJzWVdObEtDOHNMMmNzSUNjc0p5QXJJSEJ5WldacGVDazdYRzRnSUNBZ1lXUmhjSFJsY2lBOUlISnphV0pzYVc1bmN5NTBaWE4wS0hObGJHVmpkRzl5S1NBbUppQmpiMjUwWlhoMExuQmhjbVZ1ZEU1dlpHVTdYRzRnSUNBZ2FXWWdLQ0ZsZUdsemRHVmtLU0I3SUdOdmJuUmxlSFF1YzJWMFFYUjBjbWxpZFhSbEtDZHBaQ2NzSUdsa0tUc2dmVnh1SUNCOVhHNGdJSFJ5ZVNCN1hHNGdJQ0FnY21WMGRYSnVJQ2hoWkdGd2RHVnlJSHg4SUdOdmJuUmxlSFFwTG5GMVpYSjVVMlZzWldOMGIzSkJiR3dvY0hKbFptbDRaV1FnZkh3Z2MyVnNaV04wYjNJcE8xeHVJQ0I5SUdOaGRHTm9JQ2hsS1NCN1hHNGdJQ0FnY21WMGRYSnVJRnRkTzF4dUlDQjlJR1pwYm1Gc2JIa2dlMXh1SUNBZ0lHbG1JQ2hsZUdsemRHVmtJRDA5UFNCdWRXeHNLU0I3SUdOdmJuUmxlSFF1Y21WdGIzWmxRWFIwY21saWRYUmxLQ2RwWkNjcE95QjlYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWm1sdVpDQW9jMlZzWldOMGIzSXNJR04wZUN3Z1kyOXNiR1ZqZEdsdmJpd2djMlZsWkNrZ2UxeHVJQ0IyWVhJZ1pXeGxiV1Z1ZER0Y2JpQWdkbUZ5SUdOdmJuUmxlSFFnUFNCamRIZ2dmSHdnWkc5amRXMWxiblE3WEc0Z0lIWmhjaUJ5WlhOMWJIUnpJRDBnWTI5c2JHVmpkR2x2YmlCOGZDQmJYVHRjYmlBZ2RtRnlJR2tnUFNBd08xeHVJQ0JwWmlBb2RIbHdaVzltSUhObGJHVmpkRzl5SUNFOVBTQW5jM1J5YVc1bkp5a2dlMXh1SUNBZ0lISmxkSFZ5YmlCeVpYTjFiSFJ6TzF4dUlDQjlYRzRnSUdsbUlDaGpiMjUwWlhoMExtNXZaR1ZVZVhCbElDRTlQU0F4SUNZbUlHTnZiblJsZUhRdWJtOWtaVlI1Y0dVZ0lUMDlJRGtwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdXMTA3SUM4dklHSmhhV3dnYVdZZ1kyOXVkR1Y0ZENCcGN5QnViM1FnWVc0Z1pXeGxiV1Z1ZENCdmNpQmtiMk4xYldWdWRGeHVJQ0I5WEc0Z0lHbG1JQ2h6WldWa0tTQjdYRzRnSUNBZ2QyaHBiR1VnS0NobGJHVnRaVzUwSUQwZ2MyVmxaRnRwS3l0ZEtTa2dlMXh1SUNBZ0lDQWdhV1lnS0cxaGRHTm9aWE5UWld4bFkzUnZjaWhsYkdWdFpXNTBMQ0J6Wld4bFkzUnZjaWtwSUh0Y2JpQWdJQ0FnSUNBZ2NtVnpkV3gwY3k1d2RYTm9LR1ZzWlcxbGJuUXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnlaWE4xYkhSekxuQjFjMmd1WVhCd2JIa29jbVZ6ZFd4MGN5d2djWE5oS0hObGJHVmpkRzl5TENCamIyNTBaWGgwS1NrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkSE03WEc1OVhHNWNibVoxYm1OMGFXOXVJRzFoZEdOb1pYTWdLSE5sYkdWamRHOXlMQ0JsYkdWdFpXNTBjeWtnZTF4dUlDQnlaWFIxY200Z1ptbHVaQ2h6Wld4bFkzUnZjaXdnYm5Wc2JDd2diblZzYkN3Z1pXeGxiV1Z1ZEhNcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCdFlYUmphR1Z6VTJWc1pXTjBiM0lnS0dWc1pXMWxiblFzSUhObGJHVmpkRzl5S1NCN1hHNGdJSEpsZEhWeWJpQnRZWFJqYUM1allXeHNLR1ZzWlcxbGJuUXNJSE5sYkdWamRHOXlLVHRjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1hVzVrTzF4dVhHNW1hVzVrTG0xaGRHTm9aWE1nUFNCdFlYUmphR1Z6TzF4dVptbHVaQzV0WVhSamFHVnpVMlZzWldOMGIzSWdQU0J0WVhSamFHVnpVMlZzWldOMGIzSTdYRzRpWFgwPSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHN0dWIgPSByZXF1aXJlKCcuL3N0dWInKTtcbnZhciB0cmFja2luZyA9IHJlcXVpcmUoJy4vdHJhY2tpbmcnKTtcbnZhciBscyA9ICdsb2NhbFN0b3JhZ2UnIGluIGdsb2JhbCAmJiBnbG9iYWwubG9jYWxTdG9yYWdlID8gZ2xvYmFsLmxvY2FsU3RvcmFnZSA6IHN0dWI7XG5cbmZ1bmN0aW9uIGFjY2Vzc29yIChrZXksIHZhbHVlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGdldChrZXkpO1xuICB9XG4gIHJldHVybiBzZXQoa2V5LCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGdldCAoa2V5KSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxzLmdldEl0ZW0oa2V5KSk7XG59XG5cbmZ1bmN0aW9uIHNldCAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGxzLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAoa2V5KSB7XG4gIHJldHVybiBscy5yZW1vdmVJdGVtKGtleSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgcmV0dXJuIGxzLmNsZWFyKCk7XG59XG5cbmFjY2Vzc29yLnNldCA9IHNldDtcbmFjY2Vzc29yLmdldCA9IGdldDtcbmFjY2Vzc29yLnJlbW92ZSA9IHJlbW92ZTtcbmFjY2Vzc29yLmNsZWFyID0gY2xlYXI7XG5hY2Nlc3Nvci5vbiA9IHRyYWNraW5nLm9uO1xuYWNjZXNzb3Iub2ZmID0gdHJhY2tpbmcub2ZmO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFjY2Vzc29yO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlzYjJOaGJDMXpkRzl5WVdkbEwyeHZZMkZzTFhOMGIzSmhaMlV1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJ6ZEhWaUlEMGdjbVZ4ZFdseVpTZ25MaTl6ZEhWaUp5azdYRzUyWVhJZ2RISmhZMnRwYm1jZ1BTQnlaWEYxYVhKbEtDY3VMM1J5WVdOcmFXNW5KeWs3WEc1MllYSWdiSE1nUFNBbmJHOWpZV3hUZEc5eVlXZGxKeUJwYmlCbmJHOWlZV3dnSmlZZ1oyeHZZbUZzTG14dlkyRnNVM1J2Y21GblpTQS9JR2RzYjJKaGJDNXNiMk5oYkZOMGIzSmhaMlVnT2lCemRIVmlPMXh1WEc1bWRXNWpkR2x2YmlCaFkyTmxjM052Y2lBb2EyVjVMQ0IyWVd4MVpTa2dlMXh1SUNCcFppQW9ZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQTlQVDBnTVNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJuWlhRb2EyVjVLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjMlYwS0d0bGVTd2dkbUZzZFdVcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCblpYUWdLR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdTbE5QVGk1d1lYSnpaU2hzY3k1blpYUkpkR1Z0S0d0bGVTa3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnpaWFFnS0d0bGVTd2dkbUZzZFdVcElIdGNiaUFnZEhKNUlIdGNiaUFnSUNCc2N5NXpaWFJKZEdWdEtHdGxlU3dnU2xOUFRpNXpkSEpwYm1kcFpua29kbUZzZFdVcEtUdGNiaUFnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WlcxdmRtVWdLR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdiSE11Y21WdGIzWmxTWFJsYlNoclpYa3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmpiR1ZoY2lBb0tTQjdYRzRnSUhKbGRIVnliaUJzY3k1amJHVmhjaWdwTzF4dWZWeHVYRzVoWTJObGMzTnZjaTV6WlhRZ1BTQnpaWFE3WEc1aFkyTmxjM052Y2k1blpYUWdQU0JuWlhRN1hHNWhZMk5sYzNOdmNpNXlaVzF2ZG1VZ1BTQnlaVzF2ZG1VN1hHNWhZMk5sYzNOdmNpNWpiR1ZoY2lBOUlHTnNaV0Z5TzF4dVlXTmpaWE56YjNJdWIyNGdQU0IwY21GamEybHVaeTV2Ymp0Y2JtRmpZMlZ6YzI5eUxtOW1aaUE5SUhSeVlXTnJhVzVuTG05bVpqdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JoWTJObGMzTnZjanRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtcyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRJdGVtIChrZXkpIHtcbiAgcmV0dXJuIGtleSBpbiBtcyA/IG1zW2tleV0gOiBudWxsO1xufVxuXG5mdW5jdGlvbiBzZXRJdGVtIChrZXksIHZhbHVlKSB7XG4gIG1zW2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUl0ZW0gKGtleSkge1xuICB2YXIgZm91bmQgPSBrZXkgaW4gbXM7XG4gIGlmIChmb3VuZCkge1xuICAgIHJldHVybiBkZWxldGUgbXNba2V5XTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgbXMgPSB7fTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRJdGVtOiBnZXRJdGVtLFxuICBzZXRJdGVtOiBzZXRJdGVtLFxuICByZW1vdmVJdGVtOiByZW1vdmVJdGVtLFxuICBjbGVhcjogY2xlYXJcbn07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBsaXN0ZW5lcnMgPSB7fTtcbnZhciBsaXN0ZW5pbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gbGlzdGVuICgpIHtcbiAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBjaGFuZ2UsIGZhbHNlKTtcbiAgfSBlbHNlIGlmIChnbG9iYWwuYXR0YWNoRXZlbnQpIHtcbiAgICBnbG9iYWwuYXR0YWNoRXZlbnQoJ29uc3RvcmFnZScsIGNoYW5nZSk7XG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFsLm9uc3RvcmFnZSA9IGNoYW5nZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGFuZ2UgKGUpIHtcbiAgaWYgKCFlKSB7XG4gICAgZSA9IGdsb2JhbC5ldmVudDtcbiAgfVxuICB2YXIgYWxsID0gbGlzdGVuZXJzW2Uua2V5XTtcbiAgaWYgKGFsbCkge1xuICAgIGFsbC5mb3JFYWNoKGZpcmUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyZSAobGlzdGVuZXIpIHtcbiAgICBsaXN0ZW5lcihKU09OLnBhcnNlKGUubmV3VmFsdWUpLCBKU09OLnBhcnNlKGUub2xkVmFsdWUpLCBlLnVybCB8fCBlLnVyaSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb24gKGtleSwgZm4pIHtcbiAgaWYgKGxpc3RlbmVyc1trZXldKSB7XG4gICAgbGlzdGVuZXJzW2tleV0ucHVzaChmbik7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXJzW2tleV0gPSBbZm5dO1xuICB9XG4gIGlmIChsaXN0ZW5pbmcgPT09IGZhbHNlKSB7XG4gICAgbGlzdGVuKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb2ZmIChrZXksIGZuKSB7XG4gIHZhciBucyA9IGxpc3RlbmVyc1trZXldO1xuICBpZiAobnMubGVuZ3RoID4gMSkge1xuICAgIG5zLnNwbGljZShucy5pbmRleE9mKGZuKSwgMSk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXJzW2tleV0gPSBbXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb246IG9uLFxuICBvZmY6IG9mZlxufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5c2IyTmhiQzF6ZEc5eVlXZGxMM1J5WVdOcmFXNW5MbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJR3hwYzNSbGJtVnljeUE5SUh0OU8xeHVkbUZ5SUd4cGMzUmxibWx1WnlBOUlHWmhiSE5sTzF4dVhHNW1kVzVqZEdsdmJpQnNhWE4wWlc0Z0tDa2dlMXh1SUNCcFppQW9aMnh2WW1Gc0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJcElIdGNiaUFnSUNCbmJHOWlZV3d1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduYzNSdmNtRm5aU2NzSUdOb1lXNW5aU3dnWm1Gc2MyVXBPMXh1SUNCOUlHVnNjMlVnYVdZZ0tHZHNiMkpoYkM1aGRIUmhZMmhGZG1WdWRDa2dlMXh1SUNBZ0lHZHNiMkpoYkM1aGRIUmhZMmhGZG1WdWRDZ25iMjV6ZEc5eVlXZGxKeXdnWTJoaGJtZGxLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JuYkc5aVlXd3ViMjV6ZEc5eVlXZGxJRDBnWTJoaGJtZGxPMXh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUdOb1lXNW5aU0FvWlNrZ2UxeHVJQ0JwWmlBb0lXVXBJSHRjYmlBZ0lDQmxJRDBnWjJ4dlltRnNMbVYyWlc1ME8xeHVJQ0I5WEc0Z0lIWmhjaUJoYkd3Z1BTQnNhWE4wWlc1bGNuTmJaUzVyWlhsZE8xeHVJQ0JwWmlBb1lXeHNLU0I3WEc0Z0lDQWdZV3hzTG1admNrVmhZMmdvWm1seVpTazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJtYVhKbElDaHNhWE4wWlc1bGNpa2dlMXh1SUNBZ0lHeHBjM1JsYm1WeUtFcFRUMDR1Y0dGeWMyVW9aUzV1WlhkV1lXeDFaU2tzSUVwVFQwNHVjR0Z5YzJVb1pTNXZiR1JXWVd4MVpTa3NJR1V1ZFhKc0lIeDhJR1V1ZFhKcEtUdGNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ2YmlBb2EyVjVMQ0JtYmlrZ2UxeHVJQ0JwWmlBb2JHbHpkR1Z1WlhKelcydGxlVjBwSUh0Y2JpQWdJQ0JzYVhOMFpXNWxjbk5iYTJWNVhTNXdkWE5vS0dadUtUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnNhWE4wWlc1bGNuTmJhMlY1WFNBOUlGdG1ibDA3WEc0Z0lIMWNiaUFnYVdZZ0tHeHBjM1JsYm1sdVp5QTlQVDBnWm1Gc2MyVXBJSHRjYmlBZ0lDQnNhWE4wWlc0b0tUdGNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ2Wm1ZZ0tHdGxlU3dnWm00cElIdGNiaUFnZG1GeUlHNXpJRDBnYkdsemRHVnVaWEp6VzJ0bGVWMDdYRzRnSUdsbUlDaHVjeTVzWlc1bmRHZ2dQaUF4S1NCN1hHNGdJQ0FnYm5NdWMzQnNhV05sS0c1ekxtbHVaR1Y0VDJZb1ptNHBMQ0F4S1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCc2FYTjBaVzVsY25OYmEyVjVYU0E5SUZ0ZE8xeHVJQ0I5WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdlMXh1SUNCdmJqb2diMjRzWEc0Z0lHOW1aam9nYjJabVhHNTlPMXh1SWwxOSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGdldFNlbGVjdGlvbjtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgZ2V0U2VsZWN0aW9uUmF3ID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb25SYXcnKTtcbnZhciBnZXRTZWxlY3Rpb25OdWxsT3AgPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvbk51bGxPcCcpO1xudmFyIGdldFNlbGVjdGlvblN5bnRoZXRpYyA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uU3ludGhldGljJyk7XG52YXIgaXNIb3N0ID0gcmVxdWlyZSgnLi9pc0hvc3QnKTtcbmlmIChpc0hvc3QubWV0aG9kKGdsb2JhbCwgJ2dldFNlbGVjdGlvbicpKSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvblJhdztcbn0gZWxzZSBpZiAodHlwZW9mIGRvYy5zZWxlY3Rpb24gPT09ICdvYmplY3QnICYmIGRvYy5zZWxlY3Rpb24pIHtcbiAgZ2V0U2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uU3ludGhldGljO1xufSBlbHNlIHtcbiAgZ2V0U2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uTnVsbE9wO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvbjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5elpXeGxZMk5wYjI0dmMzSmpMMmRsZEZObGJHVmpkR2x2Ymk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCblpYUlRaV3hsWTNScGIyNDdYRzUyWVhJZ1pHOWpJRDBnWjJ4dlltRnNMbVJ2WTNWdFpXNTBPMXh1ZG1GeUlHZGxkRk5sYkdWamRHbHZibEpoZHlBOUlISmxjWFZwY21Vb0p5NHZaMlYwVTJWc1pXTjBhVzl1VW1GM0p5azdYRzUyWVhJZ1oyVjBVMlZzWldOMGFXOXVUblZzYkU5d0lEMGdjbVZ4ZFdseVpTZ25MaTluWlhSVFpXeGxZM1JwYjI1T2RXeHNUM0FuS1R0Y2JuWmhjaUJuWlhSVFpXeGxZM1JwYjI1VGVXNTBhR1YwYVdNZ1BTQnlaWEYxYVhKbEtDY3VMMmRsZEZObGJHVmpkR2x2YmxONWJuUm9aWFJwWXljcE8xeHVkbUZ5SUdselNHOXpkQ0E5SUhKbGNYVnBjbVVvSnk0dmFYTkliM04wSnlrN1hHNXBaaUFvYVhOSWIzTjBMbTFsZEdodlpDaG5iRzlpWVd3c0lDZG5aWFJUWld4bFkzUnBiMjRuS1NrZ2UxeHVJQ0JuWlhSVFpXeGxZM1JwYjI0Z1BTQm5aWFJUWld4bFkzUnBiMjVTWVhjN1hHNTlJR1ZzYzJVZ2FXWWdLSFI1Y0dWdlppQmtiMk11YzJWc1pXTjBhVzl1SUQwOVBTQW5iMkpxWldOMEp5QW1KaUJrYjJNdWMyVnNaV04wYVc5dUtTQjdYRzRnSUdkbGRGTmxiR1ZqZEdsdmJpQTlJR2RsZEZObGJHVmpkR2x2YmxONWJuUm9aWFJwWXp0Y2JuMGdaV3h6WlNCN1hHNGdJR2RsZEZObGJHVmpkR2x2YmlBOUlHZGxkRk5sYkdWamRHbHZiazUxYkd4UGNEdGNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCblpYUlRaV3hsWTNScGIyNDdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb25OdWxsT3AgKCkge1xuICByZXR1cm4ge1xuICAgIHJlbW92ZUFsbFJhbmdlczogbm9vcCxcbiAgICBhZGRSYW5nZTogbm9vcFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvbk51bGxPcDtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uUmF3ICgpIHtcbiAgcmV0dXJuIGdsb2JhbC5nZXRTZWxlY3Rpb24oKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb25SYXc7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDJkbGRGTmxiR1ZqZEdsdmJsSmhkeTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzVtZFc1amRHbHZiaUJuWlhSVFpXeGxZM1JwYjI1U1lYY2dLQ2tnZTF4dUlDQnlaWFIxY200Z1oyeHZZbUZzTG1kbGRGTmxiR1ZqZEdsdmJpZ3BPMXh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHZGxkRk5sYkdWamRHbHZibEpoZHp0Y2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZ2VUb1RleHRSYW5nZSA9IHJlcXVpcmUoJy4vcmFuZ2VUb1RleHRSYW5nZScpO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBib2R5ID0gZG9jLmJvZHk7XG52YXIgR2V0U2VsZWN0aW9uUHJvdG8gPSBHZXRTZWxlY3Rpb24ucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBHZXRTZWxlY3Rpb24gKHNlbGVjdGlvbikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciByYW5nZSA9IHNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuXG4gIHRoaXMuX3NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcbiAgdGhpcy5fcmFuZ2VzID0gW107XG5cbiAgaWYgKHNlbGVjdGlvbi50eXBlID09PSAnQ29udHJvbCcpIHtcbiAgICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHNlbGYpO1xuICB9IGVsc2UgaWYgKGlzVGV4dFJhbmdlKHJhbmdlKSkge1xuICAgIHVwZGF0ZUZyb21UZXh0UmFuZ2Uoc2VsZiwgcmFuZ2UpO1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZUVtcHR5U2VsZWN0aW9uKHNlbGYpO1xuICB9XG59XG5cbkdldFNlbGVjdGlvblByb3RvLnJlbW92ZUFsbFJhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRSYW5nZTtcbiAgdHJ5IHtcbiAgICB0aGlzLl9zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uLnR5cGUgIT09ICdOb25lJykge1xuICAgICAgdGV4dFJhbmdlID0gYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgIHRleHRSYW5nZS5zZWxlY3QoKTtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbi5lbXB0eSgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHVwZGF0ZUVtcHR5U2VsZWN0aW9uKHRoaXMpO1xufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uYWRkUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgaWYgKHRoaXMuX3NlbGVjdGlvbi50eXBlID09PSAnQ29udHJvbCcpIHtcbiAgICBhZGRSYW5nZVRvQ29udHJvbFNlbGVjdGlvbih0aGlzLCByYW5nZSk7XG4gIH0gZWxzZSB7XG4gICAgcmFuZ2VUb1RleHRSYW5nZShyYW5nZSkuc2VsZWN0KCk7XG4gICAgdGhpcy5fcmFuZ2VzWzBdID0gcmFuZ2U7XG4gICAgdGhpcy5yYW5nZUNvdW50ID0gMTtcbiAgICB0aGlzLmlzQ29sbGFwc2VkID0gdGhpcy5fcmFuZ2VzWzBdLmNvbGxhcHNlZDtcbiAgICB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZSh0aGlzLCByYW5nZSwgZmFsc2UpO1xuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5zZXRSYW5nZXMgPSBmdW5jdGlvbiAocmFuZ2VzKSB7XG4gIHRoaXMucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHZhciByYW5nZUNvdW50ID0gcmFuZ2VzLmxlbmd0aDtcbiAgaWYgKHJhbmdlQ291bnQgPiAxKSB7XG4gICAgY3JlYXRlQ29udHJvbFNlbGVjdGlvbih0aGlzLCByYW5nZXMpO1xuICB9IGVsc2UgaWYgKHJhbmdlQ291bnQpIHtcbiAgICB0aGlzLmFkZFJhbmdlKHJhbmdlc1swXSk7XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmdldFJhbmdlQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLnJhbmdlQ291bnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFJhbmdlQXQoKTogaW5kZXggb3V0IG9mIGJvdW5kcycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZXNbaW5kZXhdLmNsb25lUmFuZ2UoKTtcbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8ucmVtb3ZlUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgaWYgKHRoaXMuX3NlbGVjdGlvbi50eXBlICE9PSAnQ29udHJvbCcpIHtcbiAgICByZW1vdmVSYW5nZU1hbnVhbGx5KHRoaXMsIHJhbmdlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGNvbnRyb2xSYW5nZSA9IHRoaXMuX3NlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICB2YXIgcmFuZ2VFbGVtZW50ID0gZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZShyYW5nZSk7XG4gIHZhciBuZXdDb250cm9sUmFuZ2UgPSBib2R5LmNyZWF0ZUNvbnRyb2xSYW5nZSgpO1xuICB2YXIgZWw7XG4gIHZhciByZW1vdmVkID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjb250cm9sUmFuZ2UubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBlbCA9IGNvbnRyb2xSYW5nZS5pdGVtKGkpO1xuICAgIGlmIChlbCAhPT0gcmFuZ2VFbGVtZW50IHx8IHJlbW92ZWQpIHtcbiAgICAgIG5ld0NvbnRyb2xSYW5nZS5hZGQoY29udHJvbFJhbmdlLml0ZW0oaSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgbmV3Q29udHJvbFJhbmdlLnNlbGVjdCgpO1xuICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHRoaXMpO1xufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uZWFjaFJhbmdlID0gZnVuY3Rpb24gKGZuLCByZXR1cm5WYWx1ZSkge1xuICB2YXIgaSA9IDA7XG4gIHZhciBsZW4gPSB0aGlzLl9yYW5nZXMubGVuZ3RoO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoZm4odGhpcy5nZXRSYW5nZUF0KGkpKSkge1xuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uZ2V0QWxsUmFuZ2VzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcmFuZ2VzID0gW107XG4gIHRoaXMuZWFjaFJhbmdlKGZ1bmN0aW9uIChyYW5nZSkge1xuICAgIHJhbmdlcy5wdXNoKHJhbmdlKTtcbiAgfSk7XG4gIHJldHVybiByYW5nZXM7XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5zZXRTaW5nbGVSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICB0aGlzLnJlbW92ZUFsbFJhbmdlcygpO1xuICB0aGlzLmFkZFJhbmdlKHJhbmdlKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xTZWxlY3Rpb24gKHNlbCwgcmFuZ2VzKSB7XG4gIHZhciBjb250cm9sUmFuZ2UgPSBib2R5LmNyZWF0ZUNvbnRyb2xSYW5nZSgpO1xuICBmb3IgKHZhciBpID0gMCwgZWwsIGxlbiA9IHJhbmdlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGVsID0gZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZShyYW5nZXNbaV0pO1xuICAgIHRyeSB7XG4gICAgICBjb250cm9sUmFuZ2UuYWRkKGVsKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFJhbmdlcygpOiBFbGVtZW50IGNvdWxkIG5vdCBiZSBhZGRlZCB0byBjb250cm9sIHNlbGVjdGlvbicpO1xuICAgIH1cbiAgfVxuICBjb250cm9sUmFuZ2Uuc2VsZWN0KCk7XG4gIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24oc2VsKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlUmFuZ2VNYW51YWxseSAoc2VsLCByYW5nZSkge1xuICB2YXIgcmFuZ2VzID0gc2VsLmdldEFsbFJhbmdlcygpO1xuICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSByYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoIWlzU2FtZVJhbmdlKHJhbmdlLCByYW5nZXNbaV0pKSB7XG4gICAgICBzZWwuYWRkUmFuZ2UocmFuZ2VzW2ldKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFzZWwucmFuZ2VDb3VudCkge1xuICAgIHVwZGF0ZUVtcHR5U2VsZWN0aW9uKHNlbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2UgKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIGFuY2hvclByZWZpeCA9ICdzdGFydCc7XG4gIHZhciBmb2N1c1ByZWZpeCA9ICdlbmQnO1xuICBzZWwuYW5jaG9yTm9kZSA9IHJhbmdlW2FuY2hvclByZWZpeCArICdDb250YWluZXInXTtcbiAgc2VsLmFuY2hvck9mZnNldCA9IHJhbmdlW2FuY2hvclByZWZpeCArICdPZmZzZXQnXTtcbiAgc2VsLmZvY3VzTm9kZSA9IHJhbmdlW2ZvY3VzUHJlZml4ICsgJ0NvbnRhaW5lciddO1xuICBzZWwuZm9jdXNPZmZzZXQgPSByYW5nZVtmb2N1c1ByZWZpeCArICdPZmZzZXQnXTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRW1wdHlTZWxlY3Rpb24gKHNlbCkge1xuICBzZWwuYW5jaG9yTm9kZSA9IHNlbC5mb2N1c05vZGUgPSBudWxsO1xuICBzZWwuYW5jaG9yT2Zmc2V0ID0gc2VsLmZvY3VzT2Zmc2V0ID0gMDtcbiAgc2VsLnJhbmdlQ291bnQgPSAwO1xuICBzZWwuaXNDb2xsYXBzZWQgPSB0cnVlO1xuICBzZWwuX3Jhbmdlcy5sZW5ndGggPSAwO1xufVxuXG5mdW5jdGlvbiByYW5nZUNvbnRhaW5zU2luZ2xlRWxlbWVudCAocmFuZ2VOb2Rlcykge1xuICBpZiAoIXJhbmdlTm9kZXMubGVuZ3RoIHx8IHJhbmdlTm9kZXNbMF0ubm9kZVR5cGUgIT09IDEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IHJhbmdlTm9kZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoIWlzQW5jZXN0b3JPZihyYW5nZU5vZGVzWzBdLCByYW5nZU5vZGVzW2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZSAocmFuZ2UpIHtcbiAgdmFyIG5vZGVzID0gcmFuZ2UuZ2V0Tm9kZXMoKTtcbiAgaWYgKCFyYW5nZUNvbnRhaW5zU2luZ2xlRWxlbWVudChub2RlcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UoKTogcmFuZ2UgZGlkIG5vdCBjb25zaXN0IG9mIGEgc2luZ2xlIGVsZW1lbnQnKTtcbiAgfVxuICByZXR1cm4gbm9kZXNbMF07XG59XG5cbmZ1bmN0aW9uIGlzVGV4dFJhbmdlIChyYW5nZSkge1xuICByZXR1cm4gcmFuZ2UgJiYgcmFuZ2UudGV4dCAhPT0gdm9pZCAwO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVGcm9tVGV4dFJhbmdlIChzZWwsIHJhbmdlKSB7XG4gIHNlbC5fcmFuZ2VzID0gW3JhbmdlXTtcbiAgdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2Uoc2VsLCByYW5nZSwgZmFsc2UpO1xuICBzZWwucmFuZ2VDb3VudCA9IDE7XG4gIHNlbC5pc0NvbGxhcHNlZCA9IHJhbmdlLmNvbGxhcHNlZDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29udHJvbFNlbGVjdGlvbiAoc2VsKSB7XG4gIHNlbC5fcmFuZ2VzLmxlbmd0aCA9IDA7XG4gIGlmIChzZWwuX3NlbGVjdGlvbi50eXBlID09PSAnTm9uZScpIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWwpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjb250cm9sUmFuZ2UgPSBzZWwuX3NlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICAgIGlmIChpc1RleHRSYW5nZShjb250cm9sUmFuZ2UpKSB7XG4gICAgICB1cGRhdGVGcm9tVGV4dFJhbmdlKHNlbCwgY29udHJvbFJhbmdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsLnJhbmdlQ291bnQgPSBjb250cm9sUmFuZ2UubGVuZ3RoO1xuICAgICAgdmFyIHJhbmdlO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWwucmFuZ2VDb3VudDsgKytpKSB7XG4gICAgICAgIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGUoY29udHJvbFJhbmdlLml0ZW0oaSkpO1xuICAgICAgICBzZWwuX3Jhbmdlcy5wdXNoKHJhbmdlKTtcbiAgICAgIH1cbiAgICAgIHNlbC5pc0NvbGxhcHNlZCA9IHNlbC5yYW5nZUNvdW50ID09PSAxICYmIHNlbC5fcmFuZ2VzWzBdLmNvbGxhcHNlZDtcbiAgICAgIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlKHNlbCwgc2VsLl9yYW5nZXNbc2VsLnJhbmdlQ291bnQgLSAxXSwgZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRSYW5nZVRvQ29udHJvbFNlbGVjdGlvbiAoc2VsLCByYW5nZSkge1xuICB2YXIgY29udHJvbFJhbmdlID0gc2VsLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHJhbmdlRWxlbWVudCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2UpO1xuICB2YXIgbmV3Q29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvbnRyb2xSYW5nZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIG5ld0NvbnRyb2xSYW5nZS5hZGQoY29udHJvbFJhbmdlLml0ZW0oaSkpO1xuICB9XG4gIHRyeSB7XG4gICAgbmV3Q29udHJvbFJhbmdlLmFkZChyYW5nZUVsZW1lbnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhZGRSYW5nZSgpOiBFbGVtZW50IGNvdWxkIG5vdCBiZSBhZGRlZCB0byBjb250cm9sIHNlbGVjdGlvbicpO1xuICB9XG4gIG5ld0NvbnRyb2xSYW5nZS5zZWxlY3QoKTtcbiAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbihzZWwpO1xufVxuXG5mdW5jdGlvbiBpc1NhbWVSYW5nZSAobGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIChcbiAgICBsZWZ0LnN0YXJ0Q29udGFpbmVyID09PSByaWdodC5zdGFydENvbnRhaW5lciAmJlxuICAgIGxlZnQuc3RhcnRPZmZzZXQgPT09IHJpZ2h0LnN0YXJ0T2Zmc2V0ICYmXG4gICAgbGVmdC5lbmRDb250YWluZXIgPT09IHJpZ2h0LmVuZENvbnRhaW5lciAmJlxuICAgIGxlZnQuZW5kT2Zmc2V0ID09PSByaWdodC5lbmRPZmZzZXRcbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNBbmNlc3Rvck9mIChhbmNlc3RvciwgZGVzY2VuZGFudCkge1xuICB2YXIgbm9kZSA9IGRlc2NlbmRhbnQ7XG4gIHdoaWxlIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlID09PSBhbmNlc3Rvcikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IEdldFNlbGVjdGlvbihnbG9iYWwuZG9jdW1lbnQuc2VsZWN0aW9uKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb247XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDJkbGRGTmxiR1ZqZEdsdmJsTjViblJvWlhScFl5NXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnY21GdVoyVlViMVJsZUhSU1lXNW5aU0E5SUhKbGNYVnBjbVVvSnk0dmNtRnVaMlZVYjFSbGVIUlNZVzVuWlNjcE8xeHVkbUZ5SUdSdll5QTlJR2RzYjJKaGJDNWtiMk4xYldWdWREdGNiblpoY2lCaWIyUjVJRDBnWkc5akxtSnZaSGs3WEc1MllYSWdSMlYwVTJWc1pXTjBhVzl1VUhKdmRHOGdQU0JIWlhSVFpXeGxZM1JwYjI0dWNISnZkRzkwZVhCbE8xeHVYRzVtZFc1amRHbHZiaUJIWlhSVFpXeGxZM1JwYjI0Z0tITmxiR1ZqZEdsdmJpa2dlMXh1SUNCMllYSWdjMlZzWmlBOUlIUm9hWE03WEc0Z0lIWmhjaUJ5WVc1blpTQTlJSE5sYkdWamRHbHZiaTVqY21WaGRHVlNZVzVuWlNncE8xeHVYRzRnSUhSb2FYTXVYM05sYkdWamRHbHZiaUE5SUhObGJHVmpkR2x2Ymp0Y2JpQWdkR2hwY3k1ZmNtRnVaMlZ6SUQwZ1cxMDdYRzVjYmlBZ2FXWWdLSE5sYkdWamRHbHZiaTUwZVhCbElEMDlQU0FuUTI5dWRISnZiQ2NwSUh0Y2JpQWdJQ0IxY0dSaGRHVkRiMjUwY205c1UyVnNaV04wYVc5dUtITmxiR1lwTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLR2x6VkdWNGRGSmhibWRsS0hKaGJtZGxLU2tnZTF4dUlDQWdJSFZ3WkdGMFpVWnliMjFVWlhoMFVtRnVaMlVvYzJWc1ppd2djbUZ1WjJVcE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lIVndaR0YwWlVWdGNIUjVVMlZzWldOMGFXOXVLSE5sYkdZcE8xeHVJQ0I5WEc1OVhHNWNia2RsZEZObGJHVmpkR2x2YmxCeWIzUnZMbkpsYlc5MlpVRnNiRkpoYm1kbGN5QTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdkbUZ5SUhSbGVIUlNZVzVuWlR0Y2JpQWdkSEo1SUh0Y2JpQWdJQ0IwYUdsekxsOXpaV3hsWTNScGIyNHVaVzF3ZEhrb0tUdGNiaUFnSUNCcFppQW9kR2hwY3k1ZmMyVnNaV04wYVc5dUxuUjVjR1VnSVQwOUlDZE9iMjVsSnlrZ2UxeHVJQ0FnSUNBZ2RHVjRkRkpoYm1kbElEMGdZbTlrZVM1amNtVmhkR1ZVWlhoMFVtRnVaMlVvS1R0Y2JpQWdJQ0FnSUhSbGVIUlNZVzVuWlM1elpXeGxZM1FvS1R0Y2JpQWdJQ0FnSUhSb2FYTXVYM05sYkdWamRHbHZiaTVsYlhCMGVTZ3BPMXh1SUNBZ0lIMWNiaUFnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0I5WEc0Z0lIVndaR0YwWlVWdGNIUjVVMlZzWldOMGFXOXVLSFJvYVhNcE8xeHVmVHRjYmx4dVIyVjBVMlZzWldOMGFXOXVVSEp2ZEc4dVlXUmtVbUZ1WjJVZ1BTQm1kVzVqZEdsdmJpQW9jbUZ1WjJVcElIdGNiaUFnYVdZZ0tIUm9hWE11WDNObGJHVmpkR2x2Ymk1MGVYQmxJRDA5UFNBblEyOXVkSEp2YkNjcElIdGNiaUFnSUNCaFpHUlNZVzVuWlZSdlEyOXVkSEp2YkZObGJHVmpkR2x2YmloMGFHbHpMQ0J5WVc1blpTazdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdjbUZ1WjJWVWIxUmxlSFJTWVc1blpTaHlZVzVuWlNrdWMyVnNaV04wS0NrN1hHNGdJQ0FnZEdocGN5NWZjbUZ1WjJWeld6QmRJRDBnY21GdVoyVTdYRzRnSUNBZ2RHaHBjeTV5WVc1blpVTnZkVzUwSUQwZ01UdGNiaUFnSUNCMGFHbHpMbWx6UTI5c2JHRndjMlZrSUQwZ2RHaHBjeTVmY21GdVoyVnpXekJkTG1OdmJHeGhjSE5sWkR0Y2JpQWdJQ0IxY0dSaGRHVkJibU5vYjNKQmJtUkdiMk4xYzBaeWIyMVNZVzVuWlNoMGFHbHpMQ0J5WVc1blpTd2dabUZzYzJVcE8xeHVJQ0I5WEc1OU8xeHVYRzVIWlhSVFpXeGxZM1JwYjI1UWNtOTBieTV6WlhSU1lXNW5aWE1nUFNCbWRXNWpkR2x2YmlBb2NtRnVaMlZ6S1NCN1hHNGdJSFJvYVhNdWNtVnRiM1psUVd4c1VtRnVaMlZ6S0NrN1hHNGdJSFpoY2lCeVlXNW5aVU52ZFc1MElEMGdjbUZ1WjJWekxteGxibWQwYUR0Y2JpQWdhV1lnS0hKaGJtZGxRMjkxYm5RZ1BpQXhLU0I3WEc0Z0lDQWdZM0psWVhSbFEyOXVkSEp2YkZObGJHVmpkR2x2YmloMGFHbHpMQ0J5WVc1blpYTXBPMXh1SUNCOUlHVnNjMlVnYVdZZ0tISmhibWRsUTI5MWJuUXBJSHRjYmlBZ0lDQjBhR2x6TG1Ga1pGSmhibWRsS0hKaGJtZGxjMXN3WFNrN1hHNGdJSDFjYm4wN1hHNWNia2RsZEZObGJHVmpkR2x2YmxCeWIzUnZMbWRsZEZKaGJtZGxRWFFnUFNCbWRXNWpkR2x2YmlBb2FXNWtaWGdwSUh0Y2JpQWdhV1lnS0dsdVpHVjRJRHdnTUNCOGZDQnBibVJsZUNBK1BTQjBhR2x6TG5KaGJtZGxRMjkxYm5RcElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjJkbGRGSmhibWRsUVhRb0tUb2dhVzVrWlhnZ2IzVjBJRzltSUdKdmRXNWtjeWNwTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhKbGRIVnliaUIwYUdsekxsOXlZVzVuWlhOYmFXNWtaWGhkTG1Oc2IyNWxVbUZ1WjJVb0tUdGNiaUFnZlZ4dWZUdGNibHh1UjJWMFUyVnNaV04wYVc5dVVISnZkRzh1Y21WdGIzWmxVbUZ1WjJVZ1BTQm1kVzVqZEdsdmJpQW9jbUZ1WjJVcElIdGNiaUFnYVdZZ0tIUm9hWE11WDNObGJHVmpkR2x2Ymk1MGVYQmxJQ0U5UFNBblEyOXVkSEp2YkNjcElIdGNiaUFnSUNCeVpXMXZkbVZTWVc1blpVMWhiblZoYkd4NUtIUm9hWE1zSUhKaGJtZGxLVHRjYmlBZ0lDQnlaWFIxY200N1hHNGdJSDFjYmlBZ2RtRnlJR052Ym5SeWIyeFNZVzVuWlNBOUlIUm9hWE11WDNObGJHVmpkR2x2Ymk1amNtVmhkR1ZTWVc1blpTZ3BPMXh1SUNCMllYSWdjbUZ1WjJWRmJHVnRaVzUwSUQwZ1oyVjBVMmx1WjJ4bFJXeGxiV1Z1ZEVaeWIyMVNZVzVuWlNoeVlXNW5aU2s3WEc0Z0lIWmhjaUJ1WlhkRGIyNTBjbTlzVW1GdVoyVWdQU0JpYjJSNUxtTnlaV0YwWlVOdmJuUnliMnhTWVc1blpTZ3BPMXh1SUNCMllYSWdaV3c3WEc0Z0lIWmhjaUJ5WlcxdmRtVmtJRDBnWm1Gc2MyVTdYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdMQ0JzWlc0Z1BTQmpiMjUwY205c1VtRnVaMlV1YkdWdVozUm9PeUJwSUR3Z2JHVnVPeUFySzJrcElIdGNiaUFnSUNCbGJDQTlJR052Ym5SeWIyeFNZVzVuWlM1cGRHVnRLR2twTzF4dUlDQWdJR2xtSUNobGJDQWhQVDBnY21GdVoyVkZiR1Z0Wlc1MElIeDhJSEpsYlc5MlpXUXBJSHRjYmlBZ0lDQWdJRzVsZDBOdmJuUnliMnhTWVc1blpTNWhaR1FvWTI5dWRISnZiRkpoYm1kbExtbDBaVzBvYVNrcE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0J5WlcxdmRtVmtJRDBnZEhKMVpUdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2JtVjNRMjl1ZEhKdmJGSmhibWRsTG5ObGJHVmpkQ2dwTzF4dUlDQjFjR1JoZEdWRGIyNTBjbTlzVTJWc1pXTjBhVzl1S0hSb2FYTXBPMXh1ZlR0Y2JseHVSMlYwVTJWc1pXTjBhVzl1VUhKdmRHOHVaV0ZqYUZKaGJtZGxJRDBnWm5WdVkzUnBiMjRnS0dadUxDQnlaWFIxY201V1lXeDFaU2tnZTF4dUlDQjJZWElnYVNBOUlEQTdYRzRnSUhaaGNpQnNaVzRnUFNCMGFHbHpMbDl5WVc1blpYTXViR1Z1WjNSb08xeHVJQ0JtYjNJZ0tHa2dQU0F3T3lCcElEd2diR1Z1T3lBcksya3BJSHRjYmlBZ0lDQnBaaUFvWm00b2RHaHBjeTVuWlhSU1lXNW5aVUYwS0drcEtTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlISmxkSFZ5YmxaaGJIVmxPMXh1SUNBZ0lIMWNiaUFnZlZ4dWZUdGNibHh1UjJWMFUyVnNaV04wYVc5dVVISnZkRzh1WjJWMFFXeHNVbUZ1WjJWeklEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQjJZWElnY21GdVoyVnpJRDBnVzEwN1hHNGdJSFJvYVhNdVpXRmphRkpoYm1kbEtHWjFibU4wYVc5dUlDaHlZVzVuWlNrZ2UxeHVJQ0FnSUhKaGJtZGxjeTV3ZFhOb0tISmhibWRsS1R0Y2JpQWdmU2s3WEc0Z0lISmxkSFZ5YmlCeVlXNW5aWE03WEc1OU8xeHVYRzVIWlhSVFpXeGxZM1JwYjI1UWNtOTBieTV6WlhSVGFXNW5iR1ZTWVc1blpTQTlJR1oxYm1OMGFXOXVJQ2h5WVc1blpTa2dlMXh1SUNCMGFHbHpMbkpsYlc5MlpVRnNiRkpoYm1kbGN5Z3BPMXh1SUNCMGFHbHpMbUZrWkZKaGJtZGxLSEpoYm1kbEtUdGNibjA3WEc1Y2JtWjFibU4wYVc5dUlHTnlaV0YwWlVOdmJuUnliMnhUWld4bFkzUnBiMjRnS0hObGJDd2djbUZ1WjJWektTQjdYRzRnSUhaaGNpQmpiMjUwY205c1VtRnVaMlVnUFNCaWIyUjVMbU55WldGMFpVTnZiblJ5YjJ4U1lXNW5aU2dwTzF4dUlDQm1iM0lnS0haaGNpQnBJRDBnTUN3Z1pXd3NJR3hsYmlBOUlISmhibWRsY3k1c1pXNW5kR2c3SUdrZ1BDQnNaVzQ3SUNzcmFTa2dlMXh1SUNBZ0lHVnNJRDBnWjJWMFUybHVaMnhsUld4bGJXVnVkRVp5YjIxU1lXNW5aU2h5WVc1blpYTmJhVjBwTzF4dUlDQWdJSFJ5ZVNCN1hHNGdJQ0FnSUNCamIyNTBjbTlzVW1GdVoyVXVZV1JrS0dWc0tUdGNiaUFnSUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0ozTmxkRkpoYm1kbGN5Z3BPaUJGYkdWdFpXNTBJR052ZFd4a0lHNXZkQ0JpWlNCaFpHUmxaQ0IwYnlCamIyNTBjbTlzSUhObGJHVmpkR2x2YmljcE8xeHVJQ0FnSUgxY2JpQWdmVnh1SUNCamIyNTBjbTlzVW1GdVoyVXVjMlZzWldOMEtDazdYRzRnSUhWd1pHRjBaVU52Ym5SeWIyeFRaV3hsWTNScGIyNG9jMlZzS1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnY21WdGIzWmxVbUZ1WjJWTllXNTFZV3hzZVNBb2MyVnNMQ0J5WVc1blpTa2dlMXh1SUNCMllYSWdjbUZ1WjJWeklEMGdjMlZzTG1kbGRFRnNiRkpoYm1kbGN5Z3BPMXh1SUNCelpXd3VjbVZ0YjNabFFXeHNVbUZ1WjJWektDazdYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdMQ0JzWlc0Z1BTQnlZVzVuWlhNdWJHVnVaM1JvT3lCcElEd2diR1Z1T3lBcksya3BJSHRjYmlBZ0lDQnBaaUFvSVdselUyRnRaVkpoYm1kbEtISmhibWRsTENCeVlXNW5aWE5iYVYwcEtTQjdYRzRnSUNBZ0lDQnpaV3d1WVdSa1VtRnVaMlVvY21GdVoyVnpXMmxkS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNiaUFnYVdZZ0tDRnpaV3d1Y21GdVoyVkRiM1Z1ZENrZ2UxeHVJQ0FnSUhWd1pHRjBaVVZ0Y0hSNVUyVnNaV04wYVc5dUtITmxiQ2s3WEc0Z0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z2RYQmtZWFJsUVc1amFHOXlRVzVrUm05amRYTkdjbTl0VW1GdVoyVWdLSE5sYkN3Z2NtRnVaMlVwSUh0Y2JpQWdkbUZ5SUdGdVkyaHZjbEJ5WldacGVDQTlJQ2R6ZEdGeWRDYzdYRzRnSUhaaGNpQm1iMk4xYzFCeVpXWnBlQ0E5SUNkbGJtUW5PMXh1SUNCelpXd3VZVzVqYUc5eVRtOWtaU0E5SUhKaGJtZGxXMkZ1WTJodmNsQnlaV1pwZUNBcklDZERiMjUwWVdsdVpYSW5YVHRjYmlBZ2MyVnNMbUZ1WTJodmNrOW1abk5sZENBOUlISmhibWRsVzJGdVkyaHZjbEJ5WldacGVDQXJJQ2RQWm1aelpYUW5YVHRjYmlBZ2MyVnNMbVp2WTNWelRtOWtaU0E5SUhKaGJtZGxXMlp2WTNWelVISmxabWw0SUNzZ0owTnZiblJoYVc1bGNpZGRPMXh1SUNCelpXd3VabTlqZFhOUFptWnpaWFFnUFNCeVlXNW5aVnRtYjJOMWMxQnlaV1pwZUNBcklDZFBabVp6WlhRblhUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2RYQmtZWFJsUlcxd2RIbFRaV3hsWTNScGIyNGdLSE5sYkNrZ2UxeHVJQ0J6Wld3dVlXNWphRzl5VG05a1pTQTlJSE5sYkM1bWIyTjFjMDV2WkdVZ1BTQnVkV3hzTzF4dUlDQnpaV3d1WVc1amFHOXlUMlptYzJWMElEMGdjMlZzTG1adlkzVnpUMlptYzJWMElEMGdNRHRjYmlBZ2MyVnNMbkpoYm1kbFEyOTFiblFnUFNBd08xeHVJQ0J6Wld3dWFYTkRiMnhzWVhCelpXUWdQU0IwY25WbE8xeHVJQ0J6Wld3dVgzSmhibWRsY3k1c1pXNW5kR2dnUFNBd08xeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVlXNW5aVU52Ym5SaGFXNXpVMmx1WjJ4bFJXeGxiV1Z1ZENBb2NtRnVaMlZPYjJSbGN5a2dlMXh1SUNCcFppQW9JWEpoYm1kbFRtOWtaWE11YkdWdVozUm9JSHg4SUhKaGJtZGxUbTlrWlhOYk1GMHVibTlrWlZSNWNHVWdJVDA5SURFcElIdGNiaUFnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUgxY2JpQWdabTl5SUNoMllYSWdhU0E5SURFc0lHeGxiaUE5SUhKaGJtZGxUbTlrWlhNdWJHVnVaM1JvT3lCcElEd2diR1Z1T3lBcksya3BJSHRjYmlBZ0lDQnBaaUFvSVdselFXNWpaWE4wYjNKUFppaHlZVzVuWlU1dlpHVnpXekJkTENCeVlXNW5aVTV2WkdWelcybGRLU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0FnSUgxY2JpQWdmVnh1SUNCeVpYUjFjbTRnZEhKMVpUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1oyVjBVMmx1WjJ4bFJXeGxiV1Z1ZEVaeWIyMVNZVzVuWlNBb2NtRnVaMlVwSUh0Y2JpQWdkbUZ5SUc1dlpHVnpJRDBnY21GdVoyVXVaMlYwVG05a1pYTW9LVHRjYmlBZ2FXWWdLQ0Z5WVc1blpVTnZiblJoYVc1elUybHVaMnhsUld4bGJXVnVkQ2h1YjJSbGN5a3BJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oyZGxkRk5wYm1kc1pVVnNaVzFsYm5SR2NtOXRVbUZ1WjJVb0tUb2djbUZ1WjJVZ1pHbGtJRzV2ZENCamIyNXphWE4wSUc5bUlHRWdjMmx1WjJ4bElHVnNaVzFsYm5RbktUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2JtOWtaWE5iTUYwN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdselZHVjRkRkpoYm1kbElDaHlZVzVuWlNrZ2UxeHVJQ0J5WlhSMWNtNGdjbUZ1WjJVZ0ppWWdjbUZ1WjJVdWRHVjRkQ0FoUFQwZ2RtOXBaQ0F3TzF4dWZWeHVYRzVtZFc1amRHbHZiaUIxY0dSaGRHVkdjbTl0VkdWNGRGSmhibWRsSUNoelpXd3NJSEpoYm1kbEtTQjdYRzRnSUhObGJDNWZjbUZ1WjJWeklEMGdXM0poYm1kbFhUdGNiaUFnZFhCa1lYUmxRVzVqYUc5eVFXNWtSbTlqZFhOR2NtOXRVbUZ1WjJVb2MyVnNMQ0J5WVc1blpTd2dabUZzYzJVcE8xeHVJQ0J6Wld3dWNtRnVaMlZEYjNWdWRDQTlJREU3WEc0Z0lITmxiQzVwYzBOdmJHeGhjSE5sWkNBOUlISmhibWRsTG1OdmJHeGhjSE5sWkR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnZFhCa1lYUmxRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpQW9jMlZzS1NCN1hHNGdJSE5sYkM1ZmNtRnVaMlZ6TG14bGJtZDBhQ0E5SURBN1hHNGdJR2xtSUNoelpXd3VYM05sYkdWamRHbHZiaTUwZVhCbElEMDlQU0FuVG05dVpTY3BJSHRjYmlBZ0lDQjFjR1JoZEdWRmJYQjBlVk5sYkdWamRHbHZiaWh6Wld3cE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lIWmhjaUJqYjI1MGNtOXNVbUZ1WjJVZ1BTQnpaV3d1WDNObGJHVmpkR2x2Ymk1amNtVmhkR1ZTWVc1blpTZ3BPMXh1SUNBZ0lHbG1JQ2hwYzFSbGVIUlNZVzVuWlNoamIyNTBjbTlzVW1GdVoyVXBLU0I3WEc0Z0lDQWdJQ0IxY0dSaGRHVkdjbTl0VkdWNGRGSmhibWRsS0hObGJDd2dZMjl1ZEhKdmJGSmhibWRsS1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdjMlZzTG5KaGJtZGxRMjkxYm5RZ1BTQmpiMjUwY205c1VtRnVaMlV1YkdWdVozUm9PMXh1SUNBZ0lDQWdkbUZ5SUhKaGJtZGxPMXh1SUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0J6Wld3dWNtRnVaMlZEYjNWdWREc2dLeXRwS1NCN1hHNGdJQ0FnSUNBZ0lISmhibWRsSUQwZ1pHOWpMbU55WldGMFpWSmhibWRsS0NrN1hHNGdJQ0FnSUNBZ0lISmhibWRsTG5ObGJHVmpkRTV2WkdVb1kyOXVkSEp2YkZKaGJtZGxMbWwwWlcwb2FTa3BPMXh1SUNBZ0lDQWdJQ0J6Wld3dVgzSmhibWRsY3k1d2RYTm9LSEpoYm1kbEtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lITmxiQzVwYzBOdmJHeGhjSE5sWkNBOUlITmxiQzV5WVc1blpVTnZkVzUwSUQwOVBTQXhJQ1ltSUhObGJDNWZjbUZ1WjJWeld6QmRMbU52Ykd4aGNITmxaRHRjYmlBZ0lDQWdJSFZ3WkdGMFpVRnVZMmh2Y2tGdVpFWnZZM1Z6Um5KdmJWSmhibWRsS0hObGJDd2djMlZzTGw5eVlXNW5aWE5iYzJWc0xuSmhibWRsUTI5MWJuUWdMU0F4WFN3Z1ptRnNjMlVwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaFpHUlNZVzVuWlZSdlEyOXVkSEp2YkZObGJHVmpkR2x2YmlBb2MyVnNMQ0J5WVc1blpTa2dlMXh1SUNCMllYSWdZMjl1ZEhKdmJGSmhibWRsSUQwZ2MyVnNMbDl6Wld4bFkzUnBiMjR1WTNKbFlYUmxVbUZ1WjJVb0tUdGNiaUFnZG1GeUlISmhibWRsUld4bGJXVnVkQ0E5SUdkbGRGTnBibWRzWlVWc1pXMWxiblJHY205dFVtRnVaMlVvY21GdVoyVXBPMXh1SUNCMllYSWdibVYzUTI5dWRISnZiRkpoYm1kbElEMGdZbTlrZVM1amNtVmhkR1ZEYjI1MGNtOXNVbUZ1WjJVb0tUdGNiaUFnWm05eUlDaDJZWElnYVNBOUlEQXNJR3hsYmlBOUlHTnZiblJ5YjJ4U1lXNW5aUzVzWlc1bmRHZzdJR2tnUENCc1pXNDdJQ3NyYVNrZ2UxeHVJQ0FnSUc1bGQwTnZiblJ5YjJ4U1lXNW5aUzVoWkdRb1kyOXVkSEp2YkZKaGJtZGxMbWwwWlcwb2FTa3BPMXh1SUNCOVhHNGdJSFJ5ZVNCN1hHNGdJQ0FnYm1WM1EyOXVkSEp2YkZKaGJtZGxMbUZrWkNoeVlXNW5aVVZzWlcxbGJuUXBPMXh1SUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkaFpHUlNZVzVuWlNncE9pQkZiR1Z0Wlc1MElHTnZkV3hrSUc1dmRDQmlaU0JoWkdSbFpDQjBieUJqYjI1MGNtOXNJSE5sYkdWamRHbHZiaWNwTzF4dUlDQjlYRzRnSUc1bGQwTnZiblJ5YjJ4U1lXNW5aUzV6Wld4bFkzUW9LVHRjYmlBZ2RYQmtZWFJsUTI5dWRISnZiRk5sYkdWamRHbHZiaWh6Wld3cE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCcGMxTmhiV1ZTWVc1blpTQW9iR1ZtZEN3Z2NtbG5hSFFwSUh0Y2JpQWdjbVYwZFhKdUlDaGNiaUFnSUNCc1pXWjBMbk4wWVhKMFEyOXVkR0ZwYm1WeUlEMDlQU0J5YVdkb2RDNXpkR0Z5ZEVOdmJuUmhhVzVsY2lBbUpseHVJQ0FnSUd4bFpuUXVjM1JoY25SUFptWnpaWFFnUFQwOUlISnBaMmgwTG5OMFlYSjBUMlptYzJWMElDWW1YRzRnSUNBZ2JHVm1kQzVsYm1SRGIyNTBZV2x1WlhJZ1BUMDlJSEpwWjJoMExtVnVaRU52Ym5SaGFXNWxjaUFtSmx4dUlDQWdJR3hsWm5RdVpXNWtUMlptYzJWMElEMDlQU0J5YVdkb2RDNWxibVJQWm1aelpYUmNiaUFnS1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnYVhOQmJtTmxjM1J2Y2s5bUlDaGhibU5sYzNSdmNpd2daR1Z6WTJWdVpHRnVkQ2tnZTF4dUlDQjJZWElnYm05a1pTQTlJR1JsYzJObGJtUmhiblE3WEc0Z0lIZG9hV3hsSUNodWIyUmxMbkJoY21WdWRFNXZaR1VwSUh0Y2JpQWdJQ0JwWmlBb2JtOWtaUzV3WVhKbGJuUk9iMlJsSUQwOVBTQmhibU5sYzNSdmNpa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlIUnlkV1U3WEc0Z0lDQWdmVnh1SUNBZ0lHNXZaR1VnUFNCdWIyUmxMbkJoY21WdWRFNXZaR1U3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1poYkhObE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCblpYUlRaV3hsWTNScGIyNGdLQ2tnZTF4dUlDQnlaWFIxY200Z2JtVjNJRWRsZEZObGJHVmpkR2x2YmlobmJHOWlZV3d1Wkc5amRXMWxiblF1YzJWc1pXTjBhVzl1S1R0Y2JuMWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JuWlhSVFpXeGxZM1JwYjI0N1hHNGlYWDA9IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc0hvc3RNZXRob2QgKGhvc3QsIHByb3ApIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgaG9zdFtwcm9wXTtcbiAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgISEodHlwZSA9PT0gJ29iamVjdCcgJiYgaG9zdFtwcm9wXSkgfHwgdHlwZSA9PT0gJ3Vua25vd24nO1xufVxuXG5mdW5jdGlvbiBpc0hvc3RQcm9wZXJ0eSAoaG9zdCwgcHJvcCkge1xuICByZXR1cm4gdHlwZW9mIGhvc3RbcHJvcF0gIT09ICd1bmRlZmluZWQnO1xufVxuXG5mdW5jdGlvbiBtYW55IChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gYXJlSG9zdGVkIChob3N0LCBwcm9wcykge1xuICAgIHZhciBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmICghZm4oaG9zdCwgcHJvcHNbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRob2Q6IGlzSG9zdE1ldGhvZCxcbiAgbWV0aG9kczogbWFueShpc0hvc3RNZXRob2QpLFxuICBwcm9wZXJ0eTogaXNIb3N0UHJvcGVydHksXG4gIHByb3BlcnRpZXM6IG1hbnkoaXNIb3N0UHJvcGVydHkpXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGJvZHkgPSBkb2MuYm9keTtcblxuZnVuY3Rpb24gcmFuZ2VUb1RleHRSYW5nZSAocCkge1xuICBpZiAocC5jb2xsYXBzZWQpIHtcbiAgICByZXR1cm4gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiBwLnN0YXJ0Q29udGFpbmVyLCBvZmZzZXQ6IHAuc3RhcnRPZmZzZXQgfSwgdHJ1ZSk7XG4gIH1cbiAgdmFyIHN0YXJ0UmFuZ2UgPSBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSh7IG5vZGU6IHAuc3RhcnRDb250YWluZXIsIG9mZnNldDogcC5zdGFydE9mZnNldCB9LCB0cnVlKTtcbiAgdmFyIGVuZFJhbmdlID0gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiBwLmVuZENvbnRhaW5lciwgb2Zmc2V0OiBwLmVuZE9mZnNldCB9LCBmYWxzZSk7XG4gIHZhciB0ZXh0UmFuZ2UgPSBib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICB0ZXh0UmFuZ2Uuc2V0RW5kUG9pbnQoJ1N0YXJ0VG9TdGFydCcsIHN0YXJ0UmFuZ2UpO1xuICB0ZXh0UmFuZ2Uuc2V0RW5kUG9pbnQoJ0VuZFRvRW5kJywgZW5kUmFuZ2UpO1xuICByZXR1cm4gdGV4dFJhbmdlO1xufVxuXG5mdW5jdGlvbiBpc0NoYXJhY3RlckRhdGFOb2RlIChub2RlKSB7XG4gIHZhciB0ID0gbm9kZS5ub2RlVHlwZTtcbiAgcmV0dXJuIHQgPT09IDMgfHwgdCA9PT0gNCB8fCB0ID09PSA4IDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UgKHAsIHN0YXJ0aW5nKSB7XG4gIHZhciBib3VuZDtcbiAgdmFyIHBhcmVudDtcbiAgdmFyIG9mZnNldCA9IHAub2Zmc2V0O1xuICB2YXIgd29ya2luZ05vZGU7XG4gIHZhciBjaGlsZE5vZGVzO1xuICB2YXIgcmFuZ2UgPSBib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICB2YXIgZGF0YSA9IGlzQ2hhcmFjdGVyRGF0YU5vZGUocC5ub2RlKTtcblxuICBpZiAoZGF0YSkge1xuICAgIGJvdW5kID0gcC5ub2RlO1xuICAgIHBhcmVudCA9IGJvdW5kLnBhcmVudE5vZGU7XG4gIH0gZWxzZSB7XG4gICAgY2hpbGROb2RlcyA9IHAubm9kZS5jaGlsZE5vZGVzO1xuICAgIGJvdW5kID0gb2Zmc2V0IDwgY2hpbGROb2Rlcy5sZW5ndGggPyBjaGlsZE5vZGVzW29mZnNldF0gOiBudWxsO1xuICAgIHBhcmVudCA9IHAubm9kZTtcbiAgfVxuXG4gIHdvcmtpbmdOb2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgd29ya2luZ05vZGUuaW5uZXJIVE1MID0gJyYjZmVmZjsnO1xuXG4gIGlmIChib3VuZCkge1xuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUod29ya2luZ05vZGUsIGJvdW5kKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQod29ya2luZ05vZGUpO1xuICB9XG5cbiAgcmFuZ2UubW92ZVRvRWxlbWVudFRleHQod29ya2luZ05vZGUpO1xuICByYW5nZS5jb2xsYXBzZSghc3RhcnRpbmcpO1xuICBwYXJlbnQucmVtb3ZlQ2hpbGQod29ya2luZ05vZGUpO1xuXG4gIGlmIChkYXRhKSB7XG4gICAgcmFuZ2Vbc3RhcnRpbmcgPyAnbW92ZVN0YXJ0JyA6ICdtb3ZlRW5kJ10oJ2NoYXJhY3RlcicsIG9mZnNldCk7XG4gIH1cbiAgcmV0dXJuIHJhbmdlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmdlVG9UZXh0UmFuZ2U7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDNKaGJtZGxWRzlVWlhoMFVtRnVaMlV1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJrYjJNZ1BTQm5iRzlpWVd3dVpHOWpkVzFsYm5RN1hHNTJZWElnWW05a2VTQTlJR1J2WXk1aWIyUjVPMXh1WEc1bWRXNWpkR2x2YmlCeVlXNW5aVlJ2VkdWNGRGSmhibWRsSUNod0tTQjdYRzRnSUdsbUlDaHdMbU52Ykd4aGNITmxaQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQmpjbVZoZEdWQ2IzVnVaR0Z5ZVZSbGVIUlNZVzVuWlNoN0lHNXZaR1U2SUhBdWMzUmhjblJEYjI1MFlXbHVaWElzSUc5bVpuTmxkRG9nY0M1emRHRnlkRTltWm5ObGRDQjlMQ0IwY25WbEtUdGNiaUFnZlZ4dUlDQjJZWElnYzNSaGNuUlNZVzVuWlNBOUlHTnlaV0YwWlVKdmRXNWtZWEo1VkdWNGRGSmhibWRsS0hzZ2JtOWtaVG9nY0M1emRHRnlkRU52Ym5SaGFXNWxjaXdnYjJabWMyVjBPaUJ3TG5OMFlYSjBUMlptYzJWMElIMHNJSFJ5ZFdVcE8xeHVJQ0IyWVhJZ1pXNWtVbUZ1WjJVZ1BTQmpjbVZoZEdWQ2IzVnVaR0Z5ZVZSbGVIUlNZVzVuWlNoN0lHNXZaR1U2SUhBdVpXNWtRMjl1ZEdGcGJtVnlMQ0J2Wm1aelpYUTZJSEF1Wlc1a1QyWm1jMlYwSUgwc0lHWmhiSE5sS1R0Y2JpQWdkbUZ5SUhSbGVIUlNZVzVuWlNBOUlHSnZaSGt1WTNKbFlYUmxWR1Y0ZEZKaGJtZGxLQ2s3WEc0Z0lIUmxlSFJTWVc1blpTNXpaWFJGYm1SUWIybHVkQ2duVTNSaGNuUlViMU4wWVhKMEp5d2djM1JoY25SU1lXNW5aU2s3WEc0Z0lIUmxlSFJTWVc1blpTNXpaWFJGYm1SUWIybHVkQ2duUlc1a1ZHOUZibVFuTENCbGJtUlNZVzVuWlNrN1hHNGdJSEpsZEhWeWJpQjBaWGgwVW1GdVoyVTdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHbHpRMmhoY21GamRHVnlSR0YwWVU1dlpHVWdLRzV2WkdVcElIdGNiaUFnZG1GeUlIUWdQU0J1YjJSbExtNXZaR1ZVZVhCbE8xeHVJQ0J5WlhSMWNtNGdkQ0E5UFQwZ015QjhmQ0IwSUQwOVBTQTBJSHg4SUhRZ1BUMDlJRGdnTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJqY21WaGRHVkNiM1Z1WkdGeWVWUmxlSFJTWVc1blpTQW9jQ3dnYzNSaGNuUnBibWNwSUh0Y2JpQWdkbUZ5SUdKdmRXNWtPMXh1SUNCMllYSWdjR0Z5Wlc1ME8xeHVJQ0IyWVhJZ2IyWm1jMlYwSUQwZ2NDNXZabVp6WlhRN1hHNGdJSFpoY2lCM2IzSnJhVzVuVG05a1pUdGNiaUFnZG1GeUlHTm9hV3hrVG05a1pYTTdYRzRnSUhaaGNpQnlZVzVuWlNBOUlHSnZaSGt1WTNKbFlYUmxWR1Y0ZEZKaGJtZGxLQ2s3WEc0Z0lIWmhjaUJrWVhSaElEMGdhWE5EYUdGeVlXTjBaWEpFWVhSaFRtOWtaU2h3TG01dlpHVXBPMXh1WEc0Z0lHbG1JQ2hrWVhSaEtTQjdYRzRnSUNBZ1ltOTFibVFnUFNCd0xtNXZaR1U3WEc0Z0lDQWdjR0Z5Wlc1MElEMGdZbTkxYm1RdWNHRnlaVzUwVG05a1pUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQmphR2xzWkU1dlpHVnpJRDBnY0M1dWIyUmxMbU5vYVd4a1RtOWtaWE03WEc0Z0lDQWdZbTkxYm1RZ1BTQnZabVp6WlhRZ1BDQmphR2xzWkU1dlpHVnpMbXhsYm1kMGFDQS9JR05vYVd4a1RtOWtaWE5iYjJabWMyVjBYU0E2SUc1MWJHdzdYRzRnSUNBZ2NHRnlaVzUwSUQwZ2NDNXViMlJsTzF4dUlDQjlYRzVjYmlBZ2QyOXlhMmx1WjA1dlpHVWdQU0JrYjJNdVkzSmxZWFJsUld4bGJXVnVkQ2duYzNCaGJpY3BPMXh1SUNCM2IzSnJhVzVuVG05a1pTNXBibTVsY2toVVRVd2dQU0FuSmlObVpXWm1PeWM3WEc1Y2JpQWdhV1lnS0dKdmRXNWtLU0I3WEc0Z0lDQWdjR0Z5Wlc1MExtbHVjMlZ5ZEVKbFptOXlaU2gzYjNKcmFXNW5UbTlrWlN3Z1ltOTFibVFwTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhCaGNtVnVkQzVoY0hCbGJtUkRhR2xzWkNoM2IzSnJhVzVuVG05a1pTazdYRzRnSUgxY2JseHVJQ0J5WVc1blpTNXRiM1psVkc5RmJHVnRaVzUwVkdWNGRDaDNiM0pyYVc1blRtOWtaU2s3WEc0Z0lISmhibWRsTG1OdmJHeGhjSE5sS0NGemRHRnlkR2x1WnlrN1hHNGdJSEJoY21WdWRDNXlaVzF2ZG1WRGFHbHNaQ2gzYjNKcmFXNW5UbTlrWlNrN1hHNWNiaUFnYVdZZ0tHUmhkR0VwSUh0Y2JpQWdJQ0J5WVc1blpWdHpkR0Z5ZEdsdVp5QS9JQ2R0YjNabFUzUmhjblFuSURvZ0oyMXZkbVZGYm1RblhTZ25ZMmhoY21GamRHVnlKeXdnYjJabWMyVjBLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjbUZ1WjJVN1hHNTlYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21GdVoyVlViMVJsZUhSU1lXNW5aVHRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTZWxlY3Rpb24gPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvbicpO1xudmFyIHNldFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vc2V0U2VsZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXQ6IGdldFNlbGVjdGlvbixcbiAgc2V0OiBzZXRTZWxlY3Rpb25cbn07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTZWxlY3Rpb24gPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvbicpO1xudmFyIHJhbmdlVG9UZXh0UmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlVG9UZXh0UmFuZ2UnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG5cbmZ1bmN0aW9uIHNldFNlbGVjdGlvbiAocCkge1xuICBpZiAoZG9jLmNyZWF0ZVJhbmdlKSB7XG4gICAgbW9kZXJuU2VsZWN0aW9uKCk7XG4gIH0gZWxzZSB7XG4gICAgb2xkU2VsZWN0aW9uKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtb2Rlcm5TZWxlY3Rpb24gKCkge1xuICAgIHZhciBzZWwgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICB2YXIgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICBpZiAoIXAuc3RhcnRDb250YWluZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHAuZW5kQ29udGFpbmVyKSB7XG4gICAgICByYW5nZS5zZXRFbmQocC5lbmRDb250YWluZXIsIHAuZW5kT2Zmc2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2Uuc2V0RW5kKHAuc3RhcnRDb250YWluZXIsIHAuc3RhcnRPZmZzZXQpO1xuICAgIH1cbiAgICByYW5nZS5zZXRTdGFydChwLnN0YXJ0Q29udGFpbmVyLCBwLnN0YXJ0T2Zmc2V0KTtcbiAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9sZFNlbGVjdGlvbiAoKSB7XG4gICAgcmFuZ2VUb1RleHRSYW5nZShwKS5zZWxlY3QoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFNlbGVjdGlvbjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5elpXeGxZMk5wYjI0dmMzSmpMM05sZEZObGJHVmpkR2x2Ymk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCblpYUlRaV3hsWTNScGIyNGdQU0J5WlhGMWFYSmxLQ2N1TDJkbGRGTmxiR1ZqZEdsdmJpY3BPMXh1ZG1GeUlISmhibWRsVkc5VVpYaDBVbUZ1WjJVZ1BTQnlaWEYxYVhKbEtDY3VMM0poYm1kbFZHOVVaWGgwVW1GdVoyVW5LVHRjYm5aaGNpQmtiMk1nUFNCbmJHOWlZV3d1Wkc5amRXMWxiblE3WEc1Y2JtWjFibU4wYVc5dUlITmxkRk5sYkdWamRHbHZiaUFvY0NrZ2UxeHVJQ0JwWmlBb1pHOWpMbU55WldGMFpWSmhibWRsS1NCN1hHNGdJQ0FnYlc5a1pYSnVVMlZzWldOMGFXOXVLQ2s3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnYjJ4a1UyVnNaV04wYVc5dUtDazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ0YjJSbGNtNVRaV3hsWTNScGIyNGdLQ2tnZTF4dUlDQWdJSFpoY2lCelpXd2dQU0JuWlhSVFpXeGxZM1JwYjI0b0tUdGNiaUFnSUNCMllYSWdjbUZ1WjJVZ1BTQmtiMk11WTNKbFlYUmxVbUZ1WjJVb0tUdGNiaUFnSUNCcFppQW9JWEF1YzNSaGNuUkRiMjUwWVdsdVpYSXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tIQXVaVzVrUTI5dWRHRnBibVZ5S1NCN1hHNGdJQ0FnSUNCeVlXNW5aUzV6WlhSRmJtUW9jQzVsYm1SRGIyNTBZV2x1WlhJc0lIQXVaVzVrVDJabWMyVjBLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2NtRnVaMlV1YzJWMFJXNWtLSEF1YzNSaGNuUkRiMjUwWVdsdVpYSXNJSEF1YzNSaGNuUlBabVp6WlhRcE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WVc1blpTNXpaWFJUZEdGeWRDaHdMbk4wWVhKMFEyOXVkR0ZwYm1WeUxDQndMbk4wWVhKMFQyWm1jMlYwS1R0Y2JpQWdJQ0J6Wld3dWNtVnRiM1psUVd4c1VtRnVaMlZ6S0NrN1hHNGdJQ0FnYzJWc0xtRmtaRkpoYm1kbEtISmhibWRsS1R0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHOXNaRk5sYkdWamRHbHZiaUFvS1NCN1hHNGdJQ0FnY21GdVoyVlViMVJsZUhSU1lXNW5aU2h3S1M1elpXeGxZM1FvS1R0Y2JpQWdmVnh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlITmxkRk5sYkdWamRHbHZianRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBJbnB1dFN0YXRlID0gcmVxdWlyZSgnLi9JbnB1dFN0YXRlJyk7XG5cbmZ1bmN0aW9uIElucHV0SGlzdG9yeSAoc3VyZmFjZSwgbW9kZSkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuXG4gIHN0YXRlLmlucHV0TW9kZSA9IG1vZGU7XG4gIHN0YXRlLnN1cmZhY2UgPSBzdXJmYWNlO1xuICBzdGF0ZS5yZXNldCgpO1xuXG4gIGxpc3RlbihzdXJmYWNlLnRleHRhcmVhKTtcbiAgbGlzdGVuKHN1cmZhY2UuZWRpdGFibGUpO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbiAoZWwpIHtcbiAgICB2YXIgcGFzdGVIYW5kbGVyID0gc2VsZmllKGhhbmRsZVBhc3RlKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGVsLCAna2V5cHJlc3MnLCBwcmV2ZW50Q3RybFlaKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGVsLCAna2V5ZG93bicsIHNlbGZpZShoYW5kbGVDdHJsWVopKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGVsLCAna2V5ZG93bicsIHNlbGZpZShoYW5kbGVNb2RlQ2hhbmdlKSk7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ21vdXNlZG93bicsIHNldE1vdmluZyk7XG4gICAgZWwub25wYXN0ZSA9IHBhc3RlSGFuZGxlcjtcbiAgICBlbC5vbmRyb3AgPSBwYXN0ZUhhbmRsZXI7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRNb3ZpbmcgKCkge1xuICAgIHN0YXRlLnNldE1vZGUoJ21vdmluZycpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZmllIChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVyIChlKSB7IHJldHVybiBmbi5jYWxsKG51bGwsIHN0YXRlLCBlKTsgfTtcbiAgfVxufVxuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnNldElucHV0TW9kZSA9IGZ1bmN0aW9uIChtb2RlKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIHN0YXRlLmlucHV0TW9kZSA9IG1vZGU7XG4gIHN0YXRlLnJlc2V0KCk7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBzdGF0ZS5pbnB1dFN0YXRlID0gbnVsbDtcbiAgc3RhdGUubGFzdFN0YXRlID0gbnVsbDtcbiAgc3RhdGUuaGlzdG9yeSA9IFtdO1xuICBzdGF0ZS5oaXN0b3J5UG9pbnRlciA9IDA7XG4gIHN0YXRlLmhpc3RvcnlNb2RlID0gJ25vbmUnO1xuICBzdGF0ZS5yZWZyZXNoaW5nID0gbnVsbDtcbiAgc3RhdGUucmVmcmVzaFN0YXRlKHRydWUpO1xuICBzdGF0ZS5zYXZlU3RhdGUoKTtcbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5zZXRDb21tYW5kTW9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgc3RhdGUuaGlzdG9yeU1vZGUgPSAnY29tbWFuZCc7XG4gIHN0YXRlLnNhdmVTdGF0ZSgpO1xuICBzdGF0ZS5yZWZyZXNoaW5nID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhdGUucmVmcmVzaFN0YXRlKCk7XG4gIH0sIDApO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5jYW5VbmRvID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5oaXN0b3J5UG9pbnRlciA+IDE7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLmNhblJlZG8gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmhpc3RvcnlbdGhpcy5oaXN0b3J5UG9pbnRlciArIDFdO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS51bmRvID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBpZiAoc3RhdGUuY2FuVW5kbygpKSB7XG4gICAgaWYgKHN0YXRlLmxhc3RTdGF0ZSkge1xuICAgICAgc3RhdGUubGFzdFN0YXRlLnJlc3RvcmUoKTtcbiAgICAgIHN0YXRlLmxhc3RTdGF0ZSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeVBvaW50ZXJdID0gbmV3IElucHV0U3RhdGUoc3RhdGUuc3VyZmFjZSwgc3RhdGUuaW5wdXRNb2RlKTtcbiAgICAgIHN0YXRlLmhpc3RvcnlbLS1zdGF0ZS5oaXN0b3J5UG9pbnRlcl0ucmVzdG9yZSgpO1xuICAgIH1cbiAgfVxuICBzdGF0ZS5oaXN0b3J5TW9kZSA9ICdub25lJztcbiAgc3RhdGUuc3VyZmFjZS5mb2N1cyhzdGF0ZS5pbnB1dE1vZGUpO1xuICBzdGF0ZS5yZWZyZXNoU3RhdGUoKTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUucmVkbyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgaWYgKHN0YXRlLmNhblJlZG8oKSkge1xuICAgIHN0YXRlLmhpc3RvcnlbKytzdGF0ZS5oaXN0b3J5UG9pbnRlcl0ucmVzdG9yZSgpO1xuICB9XG5cbiAgc3RhdGUuaGlzdG9yeU1vZGUgPSAnbm9uZSc7XG4gIHN0YXRlLnN1cmZhY2UuZm9jdXMoc3RhdGUuaW5wdXRNb2RlKTtcbiAgc3RhdGUucmVmcmVzaFN0YXRlKCk7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnNldE1vZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgaWYgKHN0YXRlLmhpc3RvcnlNb2RlICE9PSB2YWx1ZSkge1xuICAgIHN0YXRlLmhpc3RvcnlNb2RlID0gdmFsdWU7XG4gICAgc3RhdGUuc2F2ZVN0YXRlKCk7XG4gIH1cbiAgc3RhdGUucmVmcmVzaGluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xuICB9LCAxKTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUucmVmcmVzaFN0YXRlID0gZnVuY3Rpb24gKGluaXRpYWxTdGF0ZSkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBzdGF0ZS5pbnB1dFN0YXRlID0gbmV3IElucHV0U3RhdGUoc3RhdGUuc3VyZmFjZSwgc3RhdGUuaW5wdXRNb2RlLCBpbml0aWFsU3RhdGUpO1xuICBzdGF0ZS5yZWZyZXNoaW5nID0gbnVsbDtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUuc2F2ZVN0YXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICB2YXIgY3VycmVudCA9IHN0YXRlLmlucHV0U3RhdGUgfHwgbmV3IElucHV0U3RhdGUoc3RhdGUuc3VyZmFjZSwgc3RhdGUuaW5wdXRNb2RlKTtcblxuICBpZiAoc3RhdGUuaGlzdG9yeU1vZGUgPT09ICdtb3ZpbmcnKSB7XG4gICAgaWYgKCFzdGF0ZS5sYXN0U3RhdGUpIHtcbiAgICAgIHN0YXRlLmxhc3RTdGF0ZSA9IGN1cnJlbnQ7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoc3RhdGUubGFzdFN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeVBvaW50ZXIgLSAxXS50ZXh0ICE9PSBzdGF0ZS5sYXN0U3RhdGUudGV4dCkge1xuICAgICAgc3RhdGUuaGlzdG9yeVtzdGF0ZS5oaXN0b3J5UG9pbnRlcisrXSA9IHN0YXRlLmxhc3RTdGF0ZTtcbiAgICB9XG4gICAgc3RhdGUubGFzdFN0YXRlID0gbnVsbDtcbiAgfVxuICBzdGF0ZS5oaXN0b3J5W3N0YXRlLmhpc3RvcnlQb2ludGVyKytdID0gY3VycmVudDtcbiAgc3RhdGUuaGlzdG9yeVtzdGF0ZS5oaXN0b3J5UG9pbnRlciArIDFdID0gbnVsbDtcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZUN0cmxZWiAoc3RhdGUsIGUpIHtcbiAgdmFyIGhhbmRsZWQgPSBmYWxzZTtcbiAgdmFyIGtleUNvZGUgPSBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZTtcbiAgdmFyIGtleUNvZGVDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXlDb2RlKTtcblxuICBpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xuICAgIHN3aXRjaCAoa2V5Q29kZUNoYXIudG9Mb3dlckNhc2UoKSkge1xuICAgICAgY2FzZSAneSc6XG4gICAgICAgIHN0YXRlLnJlZG8oKTtcbiAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICd6JzpcbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICBzdGF0ZS5yZWRvKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUudW5kbygpO1xuICAgICAgICB9XG4gICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoaGFuZGxlZCAmJiBlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1vZGVDaGFuZ2UgKHN0YXRlLCBlKSB7XG4gIGlmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XG5cbiAgaWYgKChrZXlDb2RlID49IDMzICYmIGtleUNvZGUgPD0gNDApIHx8IChrZXlDb2RlID49IDYzMjMyICYmIGtleUNvZGUgPD0gNjMyMzUpKSB7XG4gICAgc3RhdGUuc2V0TW9kZSgnbW92aW5nJyk7XG4gIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gOCB8fCBrZXlDb2RlID09PSA0NiB8fCBrZXlDb2RlID09PSAxMjcpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCdkZWxldGluZycpO1xuICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IDEzKSB7XG4gICAgc3RhdGUuc2V0TW9kZSgnbmV3bGluZXMnKTtcbiAgfSBlbHNlIGlmIChrZXlDb2RlID09PSAyNykge1xuICAgIHN0YXRlLnNldE1vZGUoJ2VzY2FwZScpO1xuICB9IGVsc2UgaWYgKChrZXlDb2RlIDwgMTYgfHwga2V5Q29kZSA+IDIwKSAmJiBrZXlDb2RlICE9PSA5MSkge1xuICAgIHN0YXRlLnNldE1vZGUoJ3R5cGluZycpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVBhc3RlIChzdGF0ZSkge1xuICBpZiAoc3RhdGUuaW5wdXRTdGF0ZSAmJiBzdGF0ZS5pbnB1dFN0YXRlLnRleHQgIT09IHN0YXRlLnN1cmZhY2UucmVhZChzdGF0ZS5pbnB1dE1vZGUpICYmIHN0YXRlLnJlZnJlc2hpbmcgPT09IG51bGwpIHtcbiAgICBzdGF0ZS5oaXN0b3J5TW9kZSA9ICdwYXN0ZSc7XG4gICAgc3RhdGUuc2F2ZVN0YXRlKCk7XG4gICAgc3RhdGUucmVmcmVzaFN0YXRlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJldmVudEN0cmxZWiAoZSkge1xuICB2YXIga2V5Q29kZSA9IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlO1xuICB2YXIgeXogPSBrZXlDb2RlID09PSA4OSB8fCBrZXlDb2RlID09PSA5MDtcbiAgdmFyIGN0cmwgPSBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5O1xuICBpZiAoY3RybCAmJiB5eikge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0SGlzdG9yeTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBpc1Zpc2libGVFbGVtZW50ID0gcmVxdWlyZSgnLi9pc1Zpc2libGVFbGVtZW50Jyk7XG52YXIgZml4RU9MID0gcmVxdWlyZSgnLi9maXhFT0wnKTtcbnZhciBNYXJrZG93bkNodW5rcyA9IHJlcXVpcmUoJy4vbWFya2Rvd24vTWFya2Rvd25DaHVua3MnKTtcbnZhciBIdG1sQ2h1bmtzID0gcmVxdWlyZSgnLi9odG1sL0h0bWxDaHVua3MnKTtcbnZhciBjaHVua3MgPSB7XG4gIG1hcmtkb3duOiBNYXJrZG93bkNodW5rcyxcbiAgaHRtbDogSHRtbENodW5rcyxcbiAgd3lzaXd5ZzogSHRtbENodW5rc1xufTtcblxuZnVuY3Rpb24gSW5wdXRTdGF0ZSAoc3VyZmFjZSwgbW9kZSwgaW5pdGlhbFN0YXRlKSB7XG4gIHRoaXMubW9kZSA9IG1vZGU7XG4gIHRoaXMuc3VyZmFjZSA9IHN1cmZhY2U7XG4gIHRoaXMuaW5pdGlhbFN0YXRlID0gaW5pdGlhbFN0YXRlIHx8IGZhbHNlO1xuICB0aGlzLmluaXQoKTtcbn1cblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZWwgPSBzZWxmLnN1cmZhY2UuY3VycmVudChzZWxmLm1vZGUpO1xuICBpZiAoIWlzVmlzaWJsZUVsZW1lbnQoZWwpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghdGhpcy5pbml0aWFsU3RhdGUgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgIT09IGVsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHNlbGYuc3VyZmFjZS5yZWFkU2VsZWN0aW9uKHNlbGYpO1xuICBzZWxmLnNjcm9sbFRvcCA9IGVsLnNjcm9sbFRvcDtcbiAgaWYgKCFzZWxmLnRleHQpIHtcbiAgICBzZWxmLnRleHQgPSBzZWxmLnN1cmZhY2UucmVhZChzZWxmLm1vZGUpO1xuICB9XG59O1xuXG5JbnB1dFN0YXRlLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGVsID0gc2VsZi5zdXJmYWNlLmN1cnJlbnQoc2VsZi5tb2RlKTtcbiAgaWYgKCFpc1Zpc2libGVFbGVtZW50KGVsKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBzZWxmLnN1cmZhY2Uud3JpdGVTZWxlY3Rpb24oc2VsZik7XG59O1xuXG5JbnB1dFN0YXRlLnByb3RvdHlwZS5yZXN0b3JlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBlbCA9IHNlbGYuc3VyZmFjZS5jdXJyZW50KHNlbGYubW9kZSk7XG4gIGlmICh0eXBlb2Ygc2VsZi50ZXh0ID09PSAnc3RyaW5nJyAmJiBzZWxmLnRleHQgIT09IHNlbGYuc3VyZmFjZS5yZWFkKHNlbGYubW9kZSkpIHtcbiAgICBzZWxmLnN1cmZhY2Uud3JpdGUoc2VsZi5tb2RlLCBzZWxmLnRleHQpO1xuICB9XG4gIHNlbGYuc2VsZWN0KCk7XG4gIGVsLnNjcm9sbFRvcCA9IHNlbGYuc2Nyb2xsVG9wO1xufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuZ2V0Q2h1bmtzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBjaHVuayA9IG5ldyBjaHVua3Nbc2VsZi5tb2RlXSgpO1xuICBjaHVuay5iZWZvcmUgPSBmaXhFT0woc2VsZi50ZXh0LnN1YnN0cmluZygwLCBzZWxmLnN0YXJ0KSk7XG4gIGNodW5rLnN0YXJ0VGFnID0gJyc7XG4gIGNodW5rLnNlbGVjdGlvbiA9IGZpeEVPTChzZWxmLnRleHQuc3Vic3RyaW5nKHNlbGYuc3RhcnQsIHNlbGYuZW5kKSk7XG4gIGNodW5rLmVuZFRhZyA9ICcnO1xuICBjaHVuay5hZnRlciA9IGZpeEVPTChzZWxmLnRleHQuc3Vic3RyaW5nKHNlbGYuZW5kKSk7XG4gIGNodW5rLnNjcm9sbFRvcCA9IHNlbGYuc2Nyb2xsVG9wO1xuICBzZWxmLmNhY2hlZENodW5rcyA9IGNodW5rO1xuICByZXR1cm4gY2h1bms7XG59O1xuXG5JbnB1dFN0YXRlLnByb3RvdHlwZS5zZXRDaHVua3MgPSBmdW5jdGlvbiAoY2h1bmspIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBjaHVuay5iZWZvcmUgPSBjaHVuay5iZWZvcmUgKyBjaHVuay5zdGFydFRhZztcbiAgY2h1bmsuYWZ0ZXIgPSBjaHVuay5lbmRUYWcgKyBjaHVuay5hZnRlcjtcbiAgc2VsZi5zdGFydCA9IGNodW5rLmJlZm9yZS5sZW5ndGg7XG4gIHNlbGYuZW5kID0gY2h1bmsuYmVmb3JlLmxlbmd0aCArIGNodW5rLnNlbGVjdGlvbi5sZW5ndGg7XG4gIHNlbGYudGV4dCA9IGNodW5rLmJlZm9yZSArIGNodW5rLnNlbGVjdGlvbiArIGNodW5rLmFmdGVyO1xuICBzZWxmLnNjcm9sbFRvcCA9IGNodW5rLnNjcm9sbFRvcDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRTdGF0ZTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5SmJuQjFkRk4wWVhSbExtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJrYjJNZ1BTQm5iRzlpWVd3dVpHOWpkVzFsYm5RN1hHNTJZWElnYVhOV2FYTnBZbXhsUld4bGJXVnVkQ0E5SUhKbGNYVnBjbVVvSnk0dmFYTldhWE5wWW14bFJXeGxiV1Z1ZENjcE8xeHVkbUZ5SUdacGVFVlBUQ0E5SUhKbGNYVnBjbVVvSnk0dlptbDRSVTlNSnlrN1hHNTJZWElnVFdGeWEyUnZkMjVEYUhWdWEzTWdQU0J5WlhGMWFYSmxLQ2N1TDIxaGNtdGtiM2R1TDAxaGNtdGtiM2R1UTJoMWJtdHpKeWs3WEc1MllYSWdTSFJ0YkVOb2RXNXJjeUE5SUhKbGNYVnBjbVVvSnk0dmFIUnRiQzlJZEcxc1EyaDFibXR6SnlrN1hHNTJZWElnWTJoMWJtdHpJRDBnZTF4dUlDQnRZWEpyWkc5M2Jqb2dUV0Z5YTJSdmQyNURhSFZ1YTNNc1hHNGdJR2gwYld3NklFaDBiV3hEYUhWdWEzTXNYRzRnSUhkNWMybDNlV2M2SUVoMGJXeERhSFZ1YTNOY2JuMDdYRzVjYm1aMWJtTjBhVzl1SUVsdWNIVjBVM1JoZEdVZ0tITjFjbVpoWTJVc0lHMXZaR1VzSUdsdWFYUnBZV3hUZEdGMFpTa2dlMXh1SUNCMGFHbHpMbTF2WkdVZ1BTQnRiMlJsTzF4dUlDQjBhR2x6TG5OMWNtWmhZMlVnUFNCemRYSm1ZV05sTzF4dUlDQjBhR2x6TG1sdWFYUnBZV3hUZEdGMFpTQTlJR2x1YVhScFlXeFRkR0YwWlNCOGZDQm1ZV3h6WlR0Y2JpQWdkR2hwY3k1cGJtbDBLQ2s3WEc1OVhHNWNia2x1Y0hWMFUzUmhkR1V1Y0hKdmRHOTBlWEJsTG1sdWFYUWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJSFpoY2lCelpXeG1JRDBnZEdocGN6dGNiaUFnZG1GeUlHVnNJRDBnYzJWc1ppNXpkWEptWVdObExtTjFjbkpsYm5Rb2MyVnNaaTV0YjJSbEtUdGNiaUFnYVdZZ0tDRnBjMVpwYzJsaWJHVkZiR1Z0Wlc1MEtHVnNLU2tnZTF4dUlDQWdJSEpsZEhWeWJqdGNiaUFnZlZ4dUlDQnBaaUFvSVhSb2FYTXVhVzVwZEdsaGJGTjBZWFJsSUNZbUlHUnZZeTVoWTNScGRtVkZiR1Z0Wlc1MElDWW1JR1J2WXk1aFkzUnBkbVZGYkdWdFpXNTBJQ0U5UFNCbGJDa2dlMXh1SUNBZ0lISmxkSFZ5Ymp0Y2JpQWdmVnh1SUNCelpXeG1Mbk4xY21aaFkyVXVjbVZoWkZObGJHVmpkR2x2YmloelpXeG1LVHRjYmlBZ2MyVnNaaTV6WTNKdmJHeFViM0FnUFNCbGJDNXpZM0p2Ykd4VWIzQTdYRzRnSUdsbUlDZ2hjMlZzWmk1MFpYaDBLU0I3WEc0Z0lDQWdjMlZzWmk1MFpYaDBJRDBnYzJWc1ppNXpkWEptWVdObExuSmxZV1FvYzJWc1ppNXRiMlJsS1R0Y2JpQWdmVnh1ZlR0Y2JseHVTVzV3ZFhSVGRHRjBaUzV3Y205MGIzUjVjR1V1YzJWc1pXTjBJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0IyWVhJZ2MyVnNaaUE5SUhSb2FYTTdYRzRnSUhaaGNpQmxiQ0E5SUhObGJHWXVjM1Z5Wm1GalpTNWpkWEp5Wlc1MEtITmxiR1l1Ylc5a1pTazdYRzRnSUdsbUlDZ2hhWE5XYVhOcFlteGxSV3hsYldWdWRDaGxiQ2twSUh0Y2JpQWdJQ0J5WlhSMWNtNDdYRzRnSUgxY2JpQWdjMlZzWmk1emRYSm1ZV05sTG5keWFYUmxVMlZzWldOMGFXOXVLSE5sYkdZcE8xeHVmVHRjYmx4dVNXNXdkWFJUZEdGMFpTNXdjbTkwYjNSNWNHVXVjbVZ6ZEc5eVpTQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdkbUZ5SUhObGJHWWdQU0IwYUdsek8xeHVJQ0IyWVhJZ1pXd2dQU0J6Wld4bUxuTjFjbVpoWTJVdVkzVnljbVZ1ZENoelpXeG1MbTF2WkdVcE8xeHVJQ0JwWmlBb2RIbHdaVzltSUhObGJHWXVkR1Y0ZENBOVBUMGdKM04wY21sdVp5Y2dKaVlnYzJWc1ppNTBaWGgwSUNFOVBTQnpaV3htTG5OMWNtWmhZMlV1Y21WaFpDaHpaV3htTG0xdlpHVXBLU0I3WEc0Z0lDQWdjMlZzWmk1emRYSm1ZV05sTG5keWFYUmxLSE5sYkdZdWJXOWtaU3dnYzJWc1ppNTBaWGgwS1R0Y2JpQWdmVnh1SUNCelpXeG1Mbk5sYkdWamRDZ3BPMXh1SUNCbGJDNXpZM0p2Ykd4VWIzQWdQU0J6Wld4bUxuTmpjbTlzYkZSdmNEdGNibjA3WEc1Y2JrbHVjSFYwVTNSaGRHVXVjSEp2ZEc5MGVYQmxMbWRsZEVOb2RXNXJjeUE5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnZG1GeUlITmxiR1lnUFNCMGFHbHpPMXh1SUNCMllYSWdZMmgxYm1zZ1BTQnVaWGNnWTJoMWJtdHpXM05sYkdZdWJXOWtaVjBvS1R0Y2JpQWdZMmgxYm1zdVltVm1iM0psSUQwZ1ptbDRSVTlNS0hObGJHWXVkR1Y0ZEM1emRXSnpkSEpwYm1jb01Dd2djMlZzWmk1emRHRnlkQ2twTzF4dUlDQmphSFZ1YXk1emRHRnlkRlJoWnlBOUlDY25PMXh1SUNCamFIVnVheTV6Wld4bFkzUnBiMjRnUFNCbWFYaEZUMHdvYzJWc1ppNTBaWGgwTG5OMVluTjBjbWx1WnloelpXeG1Mbk4wWVhKMExDQnpaV3htTG1WdVpDa3BPMXh1SUNCamFIVnVheTVsYm1SVVlXY2dQU0FuSnp0Y2JpQWdZMmgxYm1zdVlXWjBaWElnUFNCbWFYaEZUMHdvYzJWc1ppNTBaWGgwTG5OMVluTjBjbWx1WnloelpXeG1MbVZ1WkNrcE8xeHVJQ0JqYUhWdWF5NXpZM0p2Ykd4VWIzQWdQU0J6Wld4bUxuTmpjbTlzYkZSdmNEdGNiaUFnYzJWc1ppNWpZV05vWldSRGFIVnVhM01nUFNCamFIVnVhenRjYmlBZ2NtVjBkWEp1SUdOb2RXNXJPMXh1ZlR0Y2JseHVTVzV3ZFhSVGRHRjBaUzV3Y205MGIzUjVjR1V1YzJWMFEyaDFibXR6SUQwZ1puVnVZM1JwYjI0Z0tHTm9kVzVyS1NCN1hHNGdJSFpoY2lCelpXeG1JRDBnZEdocGN6dGNiaUFnWTJoMWJtc3VZbVZtYjNKbElEMGdZMmgxYm1zdVltVm1iM0psSUNzZ1kyaDFibXN1YzNSaGNuUlVZV2M3WEc0Z0lHTm9kVzVyTG1GbWRHVnlJRDBnWTJoMWJtc3VaVzVrVkdGbklDc2dZMmgxYm1zdVlXWjBaWEk3WEc0Z0lITmxiR1l1YzNSaGNuUWdQU0JqYUhWdWF5NWlaV1p2Y21VdWJHVnVaM1JvTzF4dUlDQnpaV3htTG1WdVpDQTlJR05vZFc1ckxtSmxabTl5WlM1c1pXNW5kR2dnS3lCamFIVnVheTV6Wld4bFkzUnBiMjR1YkdWdVozUm9PMXh1SUNCelpXeG1MblJsZUhRZ1BTQmphSFZ1YXk1aVpXWnZjbVVnS3lCamFIVnVheTV6Wld4bFkzUnBiMjRnS3lCamFIVnVheTVoWm5SbGNqdGNiaUFnYzJWc1ppNXpZM0p2Ykd4VWIzQWdQU0JqYUhWdWF5NXpZM0p2Ykd4VWIzQTdYRzU5TzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlFbHVjSFYwVTNSaGRHVTdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGNvbW1hbmRzID0ge1xuICBtYXJrZG93bjoge1xuICAgIGJvbGRPckl0YWxpYzogcmVxdWlyZSgnLi9tYXJrZG93bi9ib2xkT3JJdGFsaWMnKSxcbiAgICBsaW5rT3JJbWFnZU9yQXR0YWNobWVudDogcmVxdWlyZSgnLi9tYXJrZG93bi9saW5rT3JJbWFnZU9yQXR0YWNobWVudCcpLFxuICAgIGJsb2NrcXVvdGU6IHJlcXVpcmUoJy4vbWFya2Rvd24vYmxvY2txdW90ZScpLFxuICAgIGNvZGVibG9jazogcmVxdWlyZSgnLi9tYXJrZG93bi9jb2RlYmxvY2snKSxcbiAgICBoZWFkaW5nOiByZXF1aXJlKCcuL21hcmtkb3duL2hlYWRpbmcnKSxcbiAgICBsaXN0OiByZXF1aXJlKCcuL21hcmtkb3duL2xpc3QnKSxcbiAgICBocjogcmVxdWlyZSgnLi9tYXJrZG93bi9ocicpXG4gIH0sXG4gIGh0bWw6IHtcbiAgICBib2xkT3JJdGFsaWM6IHJlcXVpcmUoJy4vaHRtbC9ib2xkT3JJdGFsaWMnKSxcbiAgICBsaW5rT3JJbWFnZU9yQXR0YWNobWVudDogcmVxdWlyZSgnLi9odG1sL2xpbmtPckltYWdlT3JBdHRhY2htZW50JyksXG4gICAgYmxvY2txdW90ZTogcmVxdWlyZSgnLi9odG1sL2Jsb2NrcXVvdGUnKSxcbiAgICBjb2RlYmxvY2s6IHJlcXVpcmUoJy4vaHRtbC9jb2RlYmxvY2snKSxcbiAgICBoZWFkaW5nOiByZXF1aXJlKCcuL2h0bWwvaGVhZGluZycpLFxuICAgIGxpc3Q6IHJlcXVpcmUoJy4vaHRtbC9saXN0JyksXG4gICAgaHI6IHJlcXVpcmUoJy4vaHRtbC9ocicpXG4gIH1cbn07XG5cbmNvbW1hbmRzLnd5c2l3eWcgPSBjb21tYW5kcy5odG1sO1xuXG5mdW5jdGlvbiBiaW5kQ29tbWFuZHMgKHN1cmZhY2UsIG9wdGlvbnMsIGVkaXRvcikge1xuICBiaW5kKCdib2xkJywgJ2NtZCtiJywgYm9sZCk7XG4gIGJpbmQoJ2l0YWxpYycsICdjbWQraScsIGl0YWxpYyk7XG4gIGJpbmQoJ3F1b3RlJywgJ2NtZCtqJywgcm91dGVyKCdibG9ja3F1b3RlJykpO1xuICBiaW5kKCdjb2RlJywgJ2NtZCtlJywgY29kZSk7XG4gIGJpbmQoJ29sJywgJ2NtZCtvJywgb2wpO1xuICBiaW5kKCd1bCcsICdjbWQrdScsIHVsKTtcbiAgYmluZCgnaGVhZGluZycsICdjbWQrZCcsIHJvdXRlcignaGVhZGluZycpKTtcbiAgZWRpdG9yLnNob3dMaW5rRGlhbG9nID0gZmFicmljYXRvcihiaW5kKCdsaW5rJywgJ2NtZCtrJywgbGlua09ySW1hZ2VPckF0dGFjaG1lbnQoJ2xpbmsnKSkpO1xuICBlZGl0b3Iuc2hvd0ltYWdlRGlhbG9nID0gZmFicmljYXRvcihiaW5kKCdpbWFnZScsICdjbWQrZycsIGxpbmtPckltYWdlT3JBdHRhY2htZW50KCdpbWFnZScpKSk7XG4gIGVkaXRvci5saW5rT3JJbWFnZU9yQXR0YWNobWVudCA9IGxpbmtPckltYWdlT3JBdHRhY2htZW50O1xuXG4gIGlmIChvcHRpb25zLmF0dGFjaG1lbnRzKSB7XG4gICAgZWRpdG9yLnNob3dBdHRhY2htZW50RGlhbG9nID0gZmFicmljYXRvcihiaW5kKCdhdHRhY2htZW50JywgJ2NtZCtzaGlmdCtrJywgbGlua09ySW1hZ2VPckF0dGFjaG1lbnQoJ2F0dGFjaG1lbnQnKSkpO1xuICB9XG4gIGlmIChvcHRpb25zLmhyKSB7IGJpbmQoJ2hyJywgJ2NtZCtuJywgcm91dGVyKCdocicpKTsgfVxuXG4gIGZ1bmN0aW9uIGZhYnJpY2F0b3IgKGVsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG9wZW4gKCkge1xuICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShlbCwgJ2NsaWNrJyk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBib2xkIChtb2RlLCBjaHVua3MpIHtcbiAgICBjb21tYW5kc1ttb2RlXS5ib2xkT3JJdGFsaWMoY2h1bmtzLCAnYm9sZCcpO1xuICB9XG4gIGZ1bmN0aW9uIGl0YWxpYyAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0uYm9sZE9ySXRhbGljKGNodW5rcywgJ2l0YWxpYycpO1xuICB9XG4gIGZ1bmN0aW9uIGNvZGUgKG1vZGUsIGNodW5rcykge1xuICAgIGNvbW1hbmRzW21vZGVdLmNvZGVibG9jayhjaHVua3MsIHsgZmVuY2luZzogb3B0aW9ucy5mZW5jaW5nIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHVsIChtb2RlLCBjaHVua3MpIHtcbiAgICBjb21tYW5kc1ttb2RlXS5saXN0KGNodW5rcywgZmFsc2UpO1xuICB9XG4gIGZ1bmN0aW9uIG9sIChtb2RlLCBjaHVua3MpIHtcbiAgICBjb21tYW5kc1ttb2RlXS5saXN0KGNodW5rcywgdHJ1ZSk7XG4gIH1cbiAgZnVuY3Rpb24gbGlua09ySW1hZ2VPckF0dGFjaG1lbnQgKHR5cGUsIGF1dG9VcGxvYWQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbGlua09ySW1hZ2VPckF0dGFjaG1lbnRJbnZva2UgKG1vZGUsIGNodW5rcykge1xuICAgICAgY29tbWFuZHNbbW9kZV0ubGlua09ySW1hZ2VPckF0dGFjaG1lbnQuY2FsbCh0aGlzLCBjaHVua3MsIHtcbiAgICAgICAgZWRpdG9yOiBlZGl0b3IsXG4gICAgICAgIG1vZGU6IG1vZGUsXG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIHN1cmZhY2U6IHN1cmZhY2UsXG4gICAgICAgIHByb21wdHM6IG9wdGlvbnMucHJvbXB0cyxcbiAgICAgICAgeGhyOiBvcHRpb25zLnhocixcbiAgICAgICAgdXBsb2FkOiBvcHRpb25zW3R5cGUgKyAncyddLFxuICAgICAgICBjbGFzc2VzOiBvcHRpb25zLmNsYXNzZXMsXG4gICAgICAgIG1lcmdlSHRtbEFuZEF0dGFjaG1lbnQ6IG9wdGlvbnMubWVyZ2VIdG1sQW5kQXR0YWNobWVudCxcbiAgICAgICAgYXV0b1VwbG9hZDogYXV0b1VwbG9hZFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBiaW5kIChpZCwgY29tYm8sIGZuKSB7XG4gICAgcmV0dXJuIGVkaXRvci5hZGRDb21tYW5kQnV0dG9uKGlkLCBjb21ibywgc3VwcHJlc3MoZm4pKTtcbiAgfVxuICBmdW5jdGlvbiByb3V0ZXIgKG1ldGhvZCkge1xuICAgIHJldHVybiBmdW5jdGlvbiByb3V0ZWQgKG1vZGUsIGNodW5rcykgeyBjb21tYW5kc1ttb2RlXVttZXRob2RdLmNhbGwodGhpcywgY2h1bmtzKTsgfTtcbiAgfVxuICBmdW5jdGlvbiBzdG9wIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG4gIGZ1bmN0aW9uIHN1cHByZXNzIChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiBzdXBwcmVzc29yIChlLCBtb2RlLCBjaHVua3MpIHsgc3RvcChlKTsgZm4uY2FsbCh0aGlzLCBtb2RlLCBjaHVua3MpOyB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZENvbW1hbmRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjYXN0IChjb2xsZWN0aW9uKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGk7XG4gIHZhciBsZW4gPSBjb2xsZWN0aW9uLmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgcmVzdWx0LnB1c2goY29sbGVjdGlvbltpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYXN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmlucHV0ID0gL15cXHMqKC4qPykoPzpcXHMrXCIoLispXCIpP1xccyokLztcbnZhciByZnVsbCA9IC9eKD86aHR0cHM/fGZ0cCk6XFwvXFwvLztcblxuZnVuY3Rpb24gcGFyc2VMaW5rSW5wdXQgKGlucHV0KSB7XG4gIHJldHVybiBwYXJzZXIuYXBwbHkobnVsbCwgaW5wdXQubWF0Y2gocmlucHV0KSk7XG5cbiAgZnVuY3Rpb24gcGFyc2VyIChhbGwsIGxpbmssIHRpdGxlKSB7XG4gICAgdmFyIGhyZWYgPSBsaW5rLnJlcGxhY2UoL1xcPy4qJC8sIHF1ZXJ5VW5lbmNvZGVkUmVwbGFjZXIpO1xuICAgIGhyZWYgPSBkZWNvZGVVUklDb21wb25lbnQoaHJlZik7XG4gICAgaHJlZiA9IGVuY29kZVVSSShocmVmKS5yZXBsYWNlKC8nL2csICclMjcnKS5yZXBsYWNlKC9cXCgvZywgJyUyOCcpLnJlcGxhY2UoL1xcKS9nLCAnJTI5Jyk7XG4gICAgaHJlZiA9IGhyZWYucmVwbGFjZSgvXFw/LiokLywgcXVlcnlFbmNvZGVkUmVwbGFjZXIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhyZWY6IGZvcm1hdEhyZWYoaHJlZiksIHRpdGxlOiBmb3JtYXRUaXRsZSh0aXRsZSlcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5VW5lbmNvZGVkUmVwbGFjZXIgKHF1ZXJ5KSB7XG4gIHJldHVybiBxdWVyeS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbn1cblxuZnVuY3Rpb24gcXVlcnlFbmNvZGVkUmVwbGFjZXIgKHF1ZXJ5KSB7XG4gIHJldHVybiBxdWVyeS5yZXBsYWNlKC9cXCsvZywgJyUyYicpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUaXRsZSAodGl0bGUpIHtcbiAgaWYgKCF0aXRsZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHRpdGxlXG4gICAgLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0SHJlZiAodXJsKSB7XG4gIHZhciBocmVmID0gdXJsLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgaWYgKGhyZWYubGVuZ3RoICYmIGhyZWZbMF0gIT09ICcvJyAmJiAhcmZ1bGwudGVzdChocmVmKSkge1xuICAgIHJldHVybiAnaHR0cDovLycgKyBocmVmO1xuICB9XG4gIHJldHVybiBocmVmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlTGlua0lucHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB0cmltIChyZW1vdmUpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmIChyZW1vdmUpIHtcbiAgICBiZWZvcmVSZXBsYWNlciA9IGFmdGVyUmVwbGFjZXIgPSAnJztcbiAgfVxuICBzZWxmLnNlbGVjdGlvbiA9IHNlbGYuc2VsZWN0aW9uLnJlcGxhY2UoL14oXFxzKikvLCBiZWZvcmVSZXBsYWNlcikucmVwbGFjZSgvKFxccyopJC8sIGFmdGVyUmVwbGFjZXIpO1xuXG4gIGZ1bmN0aW9uIGJlZm9yZVJlcGxhY2VyICh0ZXh0KSB7XG4gICAgc2VsZi5iZWZvcmUgKz0gdGV4dDsgcmV0dXJuICcnO1xuICB9XG4gIGZ1bmN0aW9uIGFmdGVyUmVwbGFjZXIgKHRleHQpIHtcbiAgICBzZWxmLmFmdGVyID0gdGV4dCArIHNlbGYuYWZ0ZXI7IHJldHVybiAnJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBydHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xudmFyIHJzcGFjZXMgPSAvXFxzKy9nO1xuXG5mdW5jdGlvbiBhZGRDbGFzcyAoZWwsIGNscykge1xuICB2YXIgY3VycmVudCA9IGVsLmNsYXNzTmFtZTtcbiAgaWYgKGN1cnJlbnQuaW5kZXhPZihjbHMpID09PSAtMSkge1xuICAgIGVsLmNsYXNzTmFtZSA9IChjdXJyZW50ICsgJyAnICsgY2xzKS5yZXBsYWNlKHJ0cmltLCAnJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm1DbGFzcyAoZWwsIGNscykge1xuICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShjbHMsICcnKS5yZXBsYWNlKHJ0cmltLCAnJykucmVwbGFjZShyc3BhY2VzLCAnICcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRDbGFzcyxcbiAgcm06IHJtQ2xhc3Ncbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGV4dGVuZFJlZ0V4cCAocmVnZXgsIHByZSwgcG9zdCkge1xuICB2YXIgcGF0dGVybiA9IHJlZ2V4LnRvU3RyaW5nKCk7XG4gIHZhciBmbGFncztcblxuICBwYXR0ZXJuID0gcGF0dGVybi5yZXBsYWNlKC9cXC8oW2dpbV0qKSQvLCBjYXB0dXJlRmxhZ3MpO1xuICBwYXR0ZXJuID0gcGF0dGVybi5yZXBsYWNlKC8oXlxcL3xcXC8kKS9nLCAnJyk7XG4gIHBhdHRlcm4gPSBwcmUgKyBwYXR0ZXJuICsgcG9zdDtcbiAgcmV0dXJuIG5ldyBSZWdFeHAocGF0dGVybiwgZmxhZ3MpO1xuXG4gIGZ1bmN0aW9uIGNhcHR1cmVGbGFncyAoYWxsLCBmKSB7XG4gICAgZmxhZ3MgPSBmO1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFJlZ0V4cDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZml4RU9MICh0ZXh0KSB7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJykucmVwbGFjZSgvXFxyL2csICdcXG4nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaXhFT0w7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBJbnB1dFN0YXRlID0gcmVxdWlyZSgnLi9JbnB1dFN0YXRlJyk7XG5cbmZ1bmN0aW9uIGdldENvbW1hbmRIYW5kbGVyIChzdXJmYWNlLCBoaXN0b3J5LCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlQ29tbWFuZCAoZSkge1xuICAgIHN1cmZhY2UuZm9jdXMoaGlzdG9yeS5pbnB1dE1vZGUpO1xuICAgIGhpc3Rvcnkuc2V0Q29tbWFuZE1vZGUoKTtcblxuICAgIHZhciBzdGF0ZSA9IG5ldyBJbnB1dFN0YXRlKHN1cmZhY2UsIGhpc3RvcnkuaW5wdXRNb2RlKTtcbiAgICB2YXIgY2h1bmtzID0gc3RhdGUuZ2V0Q2h1bmtzKCk7XG4gICAgdmFyIGFzeW5jSGFuZGxlciA9IHtcbiAgICAgIGFzeW5jOiBhc3luYywgaW1tZWRpYXRlOiB0cnVlXG4gICAgfTtcblxuICAgIGZuLmNhbGwoYXN5bmNIYW5kbGVyLCBlLCBoaXN0b3J5LmlucHV0TW9kZSwgY2h1bmtzKTtcblxuICAgIGlmIChhc3luY0hhbmRsZXIuaW1tZWRpYXRlKSB7XG4gICAgICBkb25lKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXN5bmMgKCkge1xuICAgICAgYXN5bmNIYW5kbGVyLmltbWVkaWF0ZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGRvbmU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9uZSAoKSB7XG4gICAgICBzdXJmYWNlLmZvY3VzKGhpc3RvcnkuaW5wdXRNb2RlKTtcbiAgICAgIHN0YXRlLnNldENodW5rcyhjaHVua3MpO1xuICAgICAgc3RhdGUucmVzdG9yZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRDb21tYW5kSGFuZGxlcjtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBzZWxlY2Npb24gPSByZXF1aXJlKCdzZWxlY2Npb24nKTtcbnZhciBmaXhFT0wgPSByZXF1aXJlKCcuL2ZpeEVPTCcpO1xudmFyIG1hbnkgPSByZXF1aXJlKCcuL21hbnknKTtcbnZhciBjYXN0ID0gcmVxdWlyZSgnLi9jYXN0Jyk7XG52YXIgZ2V0U2VsZWN0aW9uID0gc2VsZWNjaW9uLmdldDtcbnZhciBzZXRTZWxlY3Rpb24gPSBzZWxlY2Npb24uc2V0O1xudmFyIHJvcGVuID0gL14oPFtePl0rKD86IFtePl0qKT8+KS87XG52YXIgcmNsb3NlID0gLyg8XFwvW14+XSs+KSQvO1xuXG5mdW5jdGlvbiBzdXJmYWNlICh0ZXh0YXJlYSwgZWRpdGFibGUsIGRyb3BhcmVhKSB7XG4gIHJldHVybiB7XG4gICAgdGV4dGFyZWE6IHRleHRhcmVhLFxuICAgIGVkaXRhYmxlOiBlZGl0YWJsZSxcbiAgICBkcm9wYXJlYTogZHJvcGFyZWEsXG4gICAgZm9jdXM6IHNldEZvY3VzLFxuICAgIHJlYWQ6IHJlYWQsXG4gICAgd3JpdGU6IHdyaXRlLFxuICAgIGN1cnJlbnQ6IGN1cnJlbnQsXG4gICAgd3JpdGVTZWxlY3Rpb246IHdyaXRlU2VsZWN0aW9uLFxuICAgIHJlYWRTZWxlY3Rpb246IHJlYWRTZWxlY3Rpb25cbiAgfTtcblxuICBmdW5jdGlvbiBzZXRGb2N1cyAobW9kZSkge1xuICAgIGN1cnJlbnQobW9kZSkuZm9jdXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGN1cnJlbnQgKG1vZGUpIHtcbiAgICByZXR1cm4gbW9kZSA9PT0gJ3d5c2l3eWcnID8gZWRpdGFibGUgOiB0ZXh0YXJlYTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKG1vZGUpIHtcbiAgICBpZiAobW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICByZXR1cm4gZWRpdGFibGUuaW5uZXJIVE1MO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dGFyZWEudmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZSAobW9kZSwgdmFsdWUpIHtcbiAgICBpZiAobW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGV4dGFyZWEudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZVNlbGVjdGlvbiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUubW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICB3cml0ZVNlbGVjdGlvbkVkaXRhYmxlKHN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JpdGVTZWxlY3Rpb25UZXh0YXJlYShzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFNlbGVjdGlvbiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUubW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICByZWFkU2VsZWN0aW9uRWRpdGFibGUoc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFkU2VsZWN0aW9uVGV4dGFyZWEoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlU2VsZWN0aW9uVGV4dGFyZWEgKHN0YXRlKSB7XG4gICAgdmFyIHJhbmdlO1xuICAgIGlmICh0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydCAhPT0gdm9pZCAwKSB7XG4gICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgPSBzdGF0ZS5zdGFydDtcbiAgICAgIHRleHRhcmVhLnNlbGVjdGlvbkVuZCA9IHN0YXRlLmVuZDtcbiAgICAgIHRleHRhcmVhLnNjcm9sbFRvcCA9IHN0YXRlLnNjcm9sbFRvcDtcbiAgICB9IGVsc2UgaWYgKGRvYy5zZWxlY3Rpb24pIHtcbiAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCAmJiBkb2MuYWN0aXZlRWxlbWVudCAhPT0gdGV4dGFyZWEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgIHJhbmdlID0gdGV4dGFyZWEuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC10ZXh0YXJlYS52YWx1ZS5sZW5ndGgpO1xuICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgLXRleHRhcmVhLnZhbHVlLmxlbmd0aCk7XG4gICAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBzdGF0ZS5lbmQpO1xuICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCBzdGF0ZS5zdGFydCk7XG4gICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU2VsZWN0aW9uVGV4dGFyZWEgKHN0YXRlKSB7XG4gICAgaWYgKHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ICE9PSB2b2lkIDApIHtcbiAgICAgIHN0YXRlLnN0YXJ0ID0gdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICBzdGF0ZS5lbmQgPSB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQ7XG4gICAgfSBlbHNlIGlmIChkb2Muc2VsZWN0aW9uKSB7XG4gICAgICBhbmNpZW50bHlSZWFkU2VsZWN0aW9uVGV4dGFyZWEoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFuY2llbnRseVJlYWRTZWxlY3Rpb25UZXh0YXJlYSAoc3RhdGUpIHtcbiAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgIT09IHRleHRhcmVhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RhdGUudGV4dCA9IGZpeEVPTCh0ZXh0YXJlYS52YWx1ZSk7XG5cbiAgICB2YXIgcmFuZ2UgPSBkb2Muc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgdmFyIGZpeGVkUmFuZ2UgPSBmaXhFT0wocmFuZ2UudGV4dCk7XG4gICAgdmFyIG1hcmtlciA9ICdcXHgwNyc7XG4gICAgdmFyIG1hcmtlZFJhbmdlID0gbWFya2VyICsgZml4ZWRSYW5nZSArIG1hcmtlcjtcblxuICAgIHJhbmdlLnRleHQgPSBtYXJrZWRSYW5nZTtcblxuICAgIHZhciBpbnB1dFRleHQgPSBmaXhFT0wodGV4dGFyZWEudmFsdWUpO1xuXG4gICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtbWFya2VkUmFuZ2UubGVuZ3RoKTtcbiAgICByYW5nZS50ZXh0ID0gZml4ZWRSYW5nZTtcbiAgICBzdGF0ZS5zdGFydCA9IGlucHV0VGV4dC5pbmRleE9mKG1hcmtlcik7XG4gICAgc3RhdGUuZW5kID0gaW5wdXRUZXh0Lmxhc3RJbmRleE9mKG1hcmtlcikgLSBtYXJrZXIubGVuZ3RoO1xuXG4gICAgdmFyIGRpZmYgPSBzdGF0ZS50ZXh0Lmxlbmd0aCAtIGZpeEVPTCh0ZXh0YXJlYS52YWx1ZSkubGVuZ3RoO1xuICAgIGlmIChkaWZmKSB7XG4gICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC1maXhlZFJhbmdlLmxlbmd0aCk7XG4gICAgICBmaXhlZFJhbmdlICs9IG1hbnkoJ1xcbicsIGRpZmYpO1xuICAgICAgc3RhdGUuZW5kICs9IGRpZmY7XG4gICAgICByYW5nZS50ZXh0ID0gZml4ZWRSYW5nZTtcbiAgICB9XG4gICAgc3RhdGUuc2VsZWN0KCk7XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZVNlbGVjdGlvbkVkaXRhYmxlIChzdGF0ZSkge1xuICAgIHZhciBjaHVua3MgPSBzdGF0ZS5jYWNoZWRDaHVua3MgfHwgc3RhdGUuZ2V0Q2h1bmtzKCk7XG4gICAgdmFyIHN0YXJ0ID0gY2h1bmtzLmJlZm9yZS5sZW5ndGg7XG4gICAgdmFyIGVuZCA9IHN0YXJ0ICsgY2h1bmtzLnNlbGVjdGlvbi5sZW5ndGg7XG4gICAgdmFyIHAgPSB7fTtcblxuICAgIHdhbGsoZWRpdGFibGUuZmlyc3RDaGlsZCwgcGVlayk7XG4gICAgZWRpdGFibGUuZm9jdXMoKTtcbiAgICBzZXRTZWxlY3Rpb24ocCk7XG5cbiAgICBmdW5jdGlvbiBwZWVrIChjb250ZXh0LCBlbCkge1xuICAgICAgdmFyIGN1cnNvciA9IGNvbnRleHQudGV4dC5sZW5ndGg7XG4gICAgICB2YXIgY29udGVudCA9IHJlYWROb2RlKGVsKS5sZW5ndGg7XG4gICAgICB2YXIgc3VtID0gY3Vyc29yICsgY29udGVudDtcbiAgICAgIGlmICghcC5zdGFydENvbnRhaW5lciAmJiBzdW0gPj0gc3RhcnQpIHtcbiAgICAgICAgcC5zdGFydENvbnRhaW5lciA9IGVsO1xuICAgICAgICBwLnN0YXJ0T2Zmc2V0ID0gYm91bmRlZChzdGFydCAtIGN1cnNvcik7XG4gICAgICB9XG4gICAgICBpZiAoIXAuZW5kQ29udGFpbmVyICYmIHN1bSA+PSBlbmQpIHtcbiAgICAgICAgcC5lbmRDb250YWluZXIgPSBlbDtcbiAgICAgICAgcC5lbmRPZmZzZXQgPSBib3VuZGVkKGVuZCAtIGN1cnNvcik7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGJvdW5kZWQgKG9mZnNldCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oY29udGVudCwgb2Zmc2V0KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFNlbGVjdGlvbkVkaXRhYmxlIChzdGF0ZSkge1xuICAgIHZhciBzZWwgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICB2YXIgZGlzdGFuY2UgPSB3YWxrKGVkaXRhYmxlLmZpcnN0Q2hpbGQsIHBlZWspO1xuICAgIHZhciBzdGFydCA9IGRpc3RhbmNlLnN0YXJ0IHx8IDA7XG4gICAgdmFyIGVuZCA9IGRpc3RhbmNlLmVuZCB8fCAwO1xuXG4gICAgc3RhdGUudGV4dCA9IGRpc3RhbmNlLnRleHQ7XG5cbiAgICBpZiAoZW5kID4gc3RhcnQpIHtcbiAgICAgIHN0YXRlLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICBzdGF0ZS5lbmQgPSBlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnN0YXJ0ID0gZW5kO1xuICAgICAgc3RhdGUuZW5kID0gc3RhcnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGVlayAoY29udGV4dCwgZWwpIHtcbiAgICAgIGlmIChlbCA9PT0gc2VsLmFuY2hvck5vZGUpIHtcbiAgICAgICAgY29udGV4dC5zdGFydCA9IGNvbnRleHQudGV4dC5sZW5ndGggKyBzZWwuYW5jaG9yT2Zmc2V0O1xuICAgICAgfVxuICAgICAgaWYgKGVsID09PSBzZWwuZm9jdXNOb2RlKSB7XG4gICAgICAgIGNvbnRleHQuZW5kID0gY29udGV4dC50ZXh0Lmxlbmd0aCArIHNlbC5mb2N1c09mZnNldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3YWxrIChlbCwgcGVlaywgY3R4LCBzaWJsaW5ncykge1xuICAgIHZhciBjb250ZXh0ID0gY3R4IHx8IHsgdGV4dDogJycgfTtcblxuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cblxuICAgIHZhciBlbE5vZGUgPSBlbC5ub2RlVHlwZSA9PT0gMTtcbiAgICB2YXIgdGV4dE5vZGUgPSBlbC5ub2RlVHlwZSA9PT0gMztcblxuICAgIHBlZWsoY29udGV4dCwgZWwpO1xuXG4gICAgaWYgKHRleHROb2RlKSB7XG4gICAgICBjb250ZXh0LnRleHQgKz0gcmVhZE5vZGUoZWwpO1xuICAgIH1cbiAgICBpZiAoZWxOb2RlKSB7XG4gICAgICBpZiAoZWwub3V0ZXJIVE1MLm1hdGNoKHJvcGVuKSkgeyBjb250ZXh0LnRleHQgKz0gUmVnRXhwLiQxOyB9XG4gICAgICBjYXN0KGVsLmNoaWxkTm9kZXMpLmZvckVhY2god2Fsa0NoaWxkcmVuKTtcbiAgICAgIGlmIChlbC5vdXRlckhUTUwubWF0Y2gocmNsb3NlKSkgeyBjb250ZXh0LnRleHQgKz0gUmVnRXhwLiQxOyB9XG4gICAgfVxuICAgIGlmIChzaWJsaW5ncyAhPT0gZmFsc2UgJiYgZWwubmV4dFNpYmxpbmcpIHtcbiAgICAgIHJldHVybiB3YWxrKGVsLm5leHRTaWJsaW5nLCBwZWVrLCBjb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG5cbiAgICBmdW5jdGlvbiB3YWxrQ2hpbGRyZW4gKGNoaWxkKSB7XG4gICAgICB3YWxrKGNoaWxkLCBwZWVrLCBjb250ZXh0LCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZE5vZGUgKGVsKSB7XG4gICAgcmV0dXJuIGVsLm5vZGVUeXBlID09PSAzID8gZml4RU9MKGVsLnRleHRDb250ZW50IHx8IGVsLmlubmVyVGV4dCB8fCAnJykgOiAnJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1cmZhY2U7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OW5aWFJUZFhKbVlXTmxMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ1pHOWpJRDBnWjJ4dlltRnNMbVJ2WTNWdFpXNTBPMXh1ZG1GeUlITmxiR1ZqWTJsdmJpQTlJSEpsY1hWcGNtVW9KM05sYkdWalkybHZiaWNwTzF4dWRtRnlJR1pwZUVWUFRDQTlJSEpsY1hWcGNtVW9KeTR2Wm1sNFJVOU1KeWs3WEc1MllYSWdiV0Z1ZVNBOUlISmxjWFZwY21Vb0p5NHZiV0Z1ZVNjcE8xeHVkbUZ5SUdOaGMzUWdQU0J5WlhGMWFYSmxLQ2N1TDJOaGMzUW5LVHRjYm5aaGNpQm5aWFJUWld4bFkzUnBiMjRnUFNCelpXeGxZMk5wYjI0dVoyVjBPMXh1ZG1GeUlITmxkRk5sYkdWamRHbHZiaUE5SUhObGJHVmpZMmx2Ymk1elpYUTdYRzUyWVhJZ2NtOXdaVzRnUFNBdlhpZzhXMTQrWFNzb1B6b2dXMTQrWFNvcFB6NHBMenRjYm5aaGNpQnlZMnh2YzJVZ1BTQXZLRHhjWEM5YlhqNWRLejRwSkM4N1hHNWNibVoxYm1OMGFXOXVJSE4xY21aaFkyVWdLSFJsZUhSaGNtVmhMQ0JsWkdsMFlXSnNaU3dnWkhKdmNHRnlaV0VwSUh0Y2JpQWdjbVYwZFhKdUlIdGNiaUFnSUNCMFpYaDBZWEpsWVRvZ2RHVjRkR0Z5WldFc1hHNGdJQ0FnWldScGRHRmliR1U2SUdWa2FYUmhZbXhsTEZ4dUlDQWdJR1J5YjNCaGNtVmhPaUJrY205d1lYSmxZU3hjYmlBZ0lDQm1iMk4xY3pvZ2MyVjBSbTlqZFhNc1hHNGdJQ0FnY21WaFpEb2djbVZoWkN4Y2JpQWdJQ0IzY21sMFpUb2dkM0pwZEdVc1hHNGdJQ0FnWTNWeWNtVnVkRG9nWTNWeWNtVnVkQ3hjYmlBZ0lDQjNjbWwwWlZObGJHVmpkR2x2YmpvZ2QzSnBkR1ZUWld4bFkzUnBiMjRzWEc0Z0lDQWdjbVZoWkZObGJHVmpkR2x2YmpvZ2NtVmhaRk5sYkdWamRHbHZibHh1SUNCOU8xeHVYRzRnSUdaMWJtTjBhVzl1SUhObGRFWnZZM1Z6SUNodGIyUmxLU0I3WEc0Z0lDQWdZM1Z5Y21WdWRDaHRiMlJsS1M1bWIyTjFjeWdwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1kzVnljbVZ1ZENBb2JXOWtaU2tnZTF4dUlDQWdJSEpsZEhWeWJpQnRiMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y2dQeUJsWkdsMFlXSnNaU0E2SUhSbGVIUmhjbVZoTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2NtVmhaQ0FvYlc5a1pTa2dlMXh1SUNBZ0lHbG1JQ2h0YjJSbElEMDlQU0FuZDNsemFYZDVaeWNwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJsWkdsMFlXSnNaUzVwYm01bGNraFVUVXc3WEc0Z0lDQWdmVnh1SUNBZ0lISmxkSFZ5YmlCMFpYaDBZWEpsWVM1MllXeDFaVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkeWFYUmxJQ2h0YjJSbExDQjJZV3gxWlNrZ2UxeHVJQ0FnSUdsbUlDaHRiMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y3BJSHRjYmlBZ0lDQWdJR1ZrYVhSaFlteGxMbWx1Ym1WeVNGUk5UQ0E5SUhaaGJIVmxPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCMFpYaDBZWEpsWVM1MllXeDFaU0E5SUhaaGJIVmxPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSGR5YVhSbFUyVnNaV04wYVc5dUlDaHpkR0YwWlNrZ2UxeHVJQ0FnSUdsbUlDaHpkR0YwWlM1dGIyUmxJRDA5UFNBbmQzbHphWGQ1WnljcElIdGNiaUFnSUNBZ0lIZHlhWFJsVTJWc1pXTjBhVzl1UldScGRHRmliR1VvYzNSaGRHVXBPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCM2NtbDBaVk5sYkdWamRHbHZibFJsZUhSaGNtVmhLSE4wWVhSbEtUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVTJWc1pXTjBhVzl1SUNoemRHRjBaU2tnZTF4dUlDQWdJR2xtSUNoemRHRjBaUzV0YjJSbElEMDlQU0FuZDNsemFYZDVaeWNwSUh0Y2JpQWdJQ0FnSUhKbFlXUlRaV3hsWTNScGIyNUZaR2wwWVdKc1pTaHpkR0YwWlNrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSEpsWVdSVFpXeGxZM1JwYjI1VVpYaDBZWEpsWVNoemRHRjBaU2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnZDNKcGRHVlRaV3hsWTNScGIyNVVaWGgwWVhKbFlTQW9jM1JoZEdVcElIdGNiaUFnSUNCMllYSWdjbUZ1WjJVN1hHNGdJQ0FnYVdZZ0tIUmxlSFJoY21WaExuTmxiR1ZqZEdsdmJsTjBZWEowSUNFOVBTQjJiMmxrSURBcElIdGNiaUFnSUNBZ0lIUmxlSFJoY21WaExtWnZZM1Z6S0NrN1hHNGdJQ0FnSUNCMFpYaDBZWEpsWVM1elpXeGxZM1JwYjI1VGRHRnlkQ0E5SUhOMFlYUmxMbk4wWVhKME8xeHVJQ0FnSUNBZ2RHVjRkR0Z5WldFdWMyVnNaV04wYVc5dVJXNWtJRDBnYzNSaGRHVXVaVzVrTzF4dUlDQWdJQ0FnZEdWNGRHRnlaV0V1YzJOeWIyeHNWRzl3SUQwZ2MzUmhkR1V1YzJOeWIyeHNWRzl3TzF4dUlDQWdJSDBnWld4elpTQnBaaUFvWkc5akxuTmxiR1ZqZEdsdmJpa2dlMXh1SUNBZ0lDQWdhV1lnS0dSdll5NWhZM1JwZG1WRmJHVnRaVzUwSUNZbUlHUnZZeTVoWTNScGRtVkZiR1Z0Wlc1MElDRTlQU0IwWlhoMFlYSmxZU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0IwWlhoMFlYSmxZUzVtYjJOMWN5Z3BPMXh1SUNBZ0lDQWdjbUZ1WjJVZ1BTQjBaWGgwWVhKbFlTNWpjbVZoZEdWVVpYaDBVbUZ1WjJVb0tUdGNiaUFnSUNBZ0lISmhibWRsTG0xdmRtVlRkR0Z5ZENnblkyaGhjbUZqZEdWeUp5d2dMWFJsZUhSaGNtVmhMblpoYkhWbExteGxibWQwYUNrN1hHNGdJQ0FnSUNCeVlXNW5aUzV0YjNabFJXNWtLQ2RqYUdGeVlXTjBaWEluTENBdGRHVjRkR0Z5WldFdWRtRnNkV1V1YkdWdVozUm9LVHRjYmlBZ0lDQWdJSEpoYm1kbExtMXZkbVZGYm1Rb0oyTm9ZWEpoWTNSbGNpY3NJSE4wWVhSbExtVnVaQ2s3WEc0Z0lDQWdJQ0J5WVc1blpTNXRiM1psVTNSaGNuUW9KMk5vWVhKaFkzUmxjaWNzSUhOMFlYUmxMbk4wWVhKMEtUdGNiaUFnSUNBZ0lISmhibWRsTG5ObGJHVmpkQ2dwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhKbFlXUlRaV3hsWTNScGIyNVVaWGgwWVhKbFlTQW9jM1JoZEdVcElIdGNiaUFnSUNCcFppQW9kR1Y0ZEdGeVpXRXVjMlZzWldOMGFXOXVVM1JoY25RZ0lUMDlJSFp2YVdRZ01Da2dlMXh1SUNBZ0lDQWdjM1JoZEdVdWMzUmhjblFnUFNCMFpYaDBZWEpsWVM1elpXeGxZM1JwYjI1VGRHRnlkRHRjYmlBZ0lDQWdJSE4wWVhSbExtVnVaQ0E5SUhSbGVIUmhjbVZoTG5ObGJHVmpkR2x2YmtWdVpEdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHUnZZeTV6Wld4bFkzUnBiMjRwSUh0Y2JpQWdJQ0FnSUdGdVkybGxiblJzZVZKbFlXUlRaV3hsWTNScGIyNVVaWGgwWVhKbFlTaHpkR0YwWlNrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1lXNWphV1Z1ZEd4NVVtVmhaRk5sYkdWamRHbHZibFJsZUhSaGNtVmhJQ2h6ZEdGMFpTa2dlMXh1SUNBZ0lHbG1JQ2hrYjJNdVlXTjBhWFpsUld4bGJXVnVkQ0FtSmlCa2IyTXVZV04wYVhabFJXeGxiV1Z1ZENBaFBUMGdkR1Y0ZEdGeVpXRXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNWNiaUFnSUNCemRHRjBaUzUwWlhoMElEMGdabWw0UlU5TUtIUmxlSFJoY21WaExuWmhiSFZsS1R0Y2JseHVJQ0FnSUhaaGNpQnlZVzVuWlNBOUlHUnZZeTV6Wld4bFkzUnBiMjR1WTNKbFlYUmxVbUZ1WjJVb0tUdGNiaUFnSUNCMllYSWdabWw0WldSU1lXNW5aU0E5SUdacGVFVlBUQ2h5WVc1blpTNTBaWGgwS1R0Y2JpQWdJQ0IyWVhJZ2JXRnlhMlZ5SUQwZ0oxeGNlREEzSnp0Y2JpQWdJQ0IyWVhJZ2JXRnlhMlZrVW1GdVoyVWdQU0J0WVhKclpYSWdLeUJtYVhobFpGSmhibWRsSUNzZ2JXRnlhMlZ5TzF4dVhHNGdJQ0FnY21GdVoyVXVkR1Y0ZENBOUlHMWhjbXRsWkZKaGJtZGxPMXh1WEc0Z0lDQWdkbUZ5SUdsdWNIVjBWR1Y0ZENBOUlHWnBlRVZQVENoMFpYaDBZWEpsWVM1MllXeDFaU2s3WEc1Y2JpQWdJQ0J5WVc1blpTNXRiM1psVTNSaGNuUW9KMk5vWVhKaFkzUmxjaWNzSUMxdFlYSnJaV1JTWVc1blpTNXNaVzVuZEdncE8xeHVJQ0FnSUhKaGJtZGxMblJsZUhRZ1BTQm1hWGhsWkZKaGJtZGxPMXh1SUNBZ0lITjBZWFJsTG5OMFlYSjBJRDBnYVc1d2RYUlVaWGgwTG1sdVpHVjRUMllvYldGeWEyVnlLVHRjYmlBZ0lDQnpkR0YwWlM1bGJtUWdQU0JwYm5CMWRGUmxlSFF1YkdGemRFbHVaR1Y0VDJZb2JXRnlhMlZ5S1NBdElHMWhjbXRsY2k1c1pXNW5kR2c3WEc1Y2JpQWdJQ0IyWVhJZ1pHbG1aaUE5SUhOMFlYUmxMblJsZUhRdWJHVnVaM1JvSUMwZ1ptbDRSVTlNS0hSbGVIUmhjbVZoTG5aaGJIVmxLUzVzWlc1bmRHZzdYRzRnSUNBZ2FXWWdLR1JwWm1ZcElIdGNiaUFnSUNBZ0lISmhibWRsTG0xdmRtVlRkR0Z5ZENnblkyaGhjbUZqZEdWeUp5d2dMV1pwZUdWa1VtRnVaMlV1YkdWdVozUm9LVHRjYmlBZ0lDQWdJR1pwZUdWa1VtRnVaMlVnS3owZ2JXRnVlU2duWEZ4dUp5d2daR2xtWmlrN1hHNGdJQ0FnSUNCemRHRjBaUzVsYm1RZ0t6MGdaR2xtWmp0Y2JpQWdJQ0FnSUhKaGJtZGxMblJsZUhRZ1BTQm1hWGhsWkZKaGJtZGxPMXh1SUNBZ0lIMWNiaUFnSUNCemRHRjBaUzV6Wld4bFkzUW9LVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkeWFYUmxVMlZzWldOMGFXOXVSV1JwZEdGaWJHVWdLSE4wWVhSbEtTQjdYRzRnSUNBZ2RtRnlJR05vZFc1cmN5QTlJSE4wWVhSbExtTmhZMmhsWkVOb2RXNXJjeUI4ZkNCemRHRjBaUzVuWlhSRGFIVnVhM01vS1R0Y2JpQWdJQ0IyWVhJZ2MzUmhjblFnUFNCamFIVnVhM011WW1WbWIzSmxMbXhsYm1kMGFEdGNiaUFnSUNCMllYSWdaVzVrSUQwZ2MzUmhjblFnS3lCamFIVnVhM011YzJWc1pXTjBhVzl1TG14bGJtZDBhRHRjYmlBZ0lDQjJZWElnY0NBOUlIdDlPMXh1WEc0Z0lDQWdkMkZzYXlobFpHbDBZV0pzWlM1bWFYSnpkRU5vYVd4a0xDQndaV1ZyS1R0Y2JpQWdJQ0JsWkdsMFlXSnNaUzVtYjJOMWN5Z3BPMXh1SUNBZ0lITmxkRk5sYkdWamRHbHZiaWh3S1R0Y2JseHVJQ0FnSUdaMWJtTjBhVzl1SUhCbFpXc2dLR052Ym5SbGVIUXNJR1ZzS1NCN1hHNGdJQ0FnSUNCMllYSWdZM1Z5YzI5eUlEMGdZMjl1ZEdWNGRDNTBaWGgwTG14bGJtZDBhRHRjYmlBZ0lDQWdJSFpoY2lCamIyNTBaVzUwSUQwZ2NtVmhaRTV2WkdVb1pXd3BMbXhsYm1kMGFEdGNiaUFnSUNBZ0lIWmhjaUJ6ZFcwZ1BTQmpkWEp6YjNJZ0t5QmpiMjUwWlc1ME8xeHVJQ0FnSUNBZ2FXWWdLQ0Z3TG5OMFlYSjBRMjl1ZEdGcGJtVnlJQ1ltSUhOMWJTQStQU0J6ZEdGeWRDa2dlMXh1SUNBZ0lDQWdJQ0J3TG5OMFlYSjBRMjl1ZEdGcGJtVnlJRDBnWld3N1hHNGdJQ0FnSUNBZ0lIQXVjM1JoY25SUFptWnpaWFFnUFNCaWIzVnVaR1ZrS0hOMFlYSjBJQzBnWTNWeWMyOXlLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR2xtSUNnaGNDNWxibVJEYjI1MFlXbHVaWElnSmlZZ2MzVnRJRDQ5SUdWdVpDa2dlMXh1SUNBZ0lDQWdJQ0J3TG1WdVpFTnZiblJoYVc1bGNpQTlJR1ZzTzF4dUlDQWdJQ0FnSUNCd0xtVnVaRTltWm5ObGRDQTlJR0p2ZFc1a1pXUW9aVzVrSUMwZ1kzVnljMjl5S1R0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ1puVnVZM1JwYjI0Z1ltOTFibVJsWkNBb2IyWm1jMlYwS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCTllYUm9MbTFoZUNnd0xDQk5ZWFJvTG0xcGJpaGpiMjUwWlc1MExDQnZabVp6WlhRcEtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVTJWc1pXTjBhVzl1UldScGRHRmliR1VnS0hOMFlYUmxLU0I3WEc0Z0lDQWdkbUZ5SUhObGJDQTlJR2RsZEZObGJHVmpkR2x2YmlncE8xeHVJQ0FnSUhaaGNpQmthWE4wWVc1alpTQTlJSGRoYkdzb1pXUnBkR0ZpYkdVdVptbHljM1JEYUdsc1pDd2djR1ZsYXlrN1hHNGdJQ0FnZG1GeUlITjBZWEowSUQwZ1pHbHpkR0Z1WTJVdWMzUmhjblFnZkh3Z01EdGNiaUFnSUNCMllYSWdaVzVrSUQwZ1pHbHpkR0Z1WTJVdVpXNWtJSHg4SURBN1hHNWNiaUFnSUNCemRHRjBaUzUwWlhoMElEMGdaR2x6ZEdGdVkyVXVkR1Y0ZER0Y2JseHVJQ0FnSUdsbUlDaGxibVFnUGlCemRHRnlkQ2tnZTF4dUlDQWdJQ0FnYzNSaGRHVXVjM1JoY25RZ1BTQnpkR0Z5ZER0Y2JpQWdJQ0FnSUhOMFlYUmxMbVZ1WkNBOUlHVnVaRHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2MzUmhkR1V1YzNSaGNuUWdQU0JsYm1RN1hHNGdJQ0FnSUNCemRHRjBaUzVsYm1RZ1BTQnpkR0Z5ZER0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUJ3WldWcklDaGpiMjUwWlhoMExDQmxiQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tHVnNJRDA5UFNCelpXd3VZVzVqYUc5eVRtOWtaU2tnZTF4dUlDQWdJQ0FnSUNCamIyNTBaWGgwTG5OMFlYSjBJRDBnWTI5dWRHVjRkQzUwWlhoMExteGxibWQwYUNBcklITmxiQzVoYm1Ob2IzSlBabVp6WlhRN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9aV3dnUFQwOUlITmxiQzVtYjJOMWMwNXZaR1VwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEM1bGJtUWdQU0JqYjI1MFpYaDBMblJsZUhRdWJHVnVaM1JvSUNzZ2MyVnNMbVp2WTNWelQyWm1jMlYwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkaGJHc2dLR1ZzTENCd1pXVnJMQ0JqZEhnc0lITnBZbXhwYm1kektTQjdYRzRnSUNBZ2RtRnlJR052Ym5SbGVIUWdQU0JqZEhnZ2ZId2dleUIwWlhoME9pQW5KeUI5TzF4dVhHNGdJQ0FnYVdZZ0tDRmxiQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR052Ym5SbGVIUTdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2RtRnlJR1ZzVG05a1pTQTlJR1ZzTG01dlpHVlVlWEJsSUQwOVBTQXhPMXh1SUNBZ0lIWmhjaUIwWlhoMFRtOWtaU0E5SUdWc0xtNXZaR1ZVZVhCbElEMDlQU0F6TzF4dVhHNGdJQ0FnY0dWbGF5aGpiMjUwWlhoMExDQmxiQ2s3WEc1Y2JpQWdJQ0JwWmlBb2RHVjRkRTV2WkdVcElIdGNiaUFnSUNBZ0lHTnZiblJsZUhRdWRHVjRkQ0FyUFNCeVpXRmtUbTlrWlNobGJDazdYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaGxiRTV2WkdVcElIdGNiaUFnSUNBZ0lHbG1JQ2hsYkM1dmRYUmxja2hVVFV3dWJXRjBZMmdvY205d1pXNHBLU0I3SUdOdmJuUmxlSFF1ZEdWNGRDQXJQU0JTWldkRmVIQXVKREU3SUgxY2JpQWdJQ0FnSUdOaGMzUW9aV3d1WTJocGJHUk9iMlJsY3lrdVptOXlSV0ZqYUNoM1lXeHJRMmhwYkdSeVpXNHBPMXh1SUNBZ0lDQWdhV1lnS0dWc0xtOTFkR1Z5U0ZSTlRDNXRZWFJqYUNoeVkyeHZjMlVwS1NCN0lHTnZiblJsZUhRdWRHVjRkQ0FyUFNCU1pXZEZlSEF1SkRFN0lIMWNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tITnBZbXhwYm1keklDRTlQU0JtWVd4elpTQW1KaUJsYkM1dVpYaDBVMmxpYkdsdVp5a2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlIZGhiR3NvWld3dWJtVjRkRk5wWW14cGJtY3NJSEJsWldzc0lHTnZiblJsZUhRcE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdZMjl1ZEdWNGREdGNibHh1SUNBZ0lHWjFibU4wYVc5dUlIZGhiR3REYUdsc1pISmxiaUFvWTJocGJHUXBJSHRjYmlBZ0lDQWdJSGRoYkdzb1kyaHBiR1FzSUhCbFpXc3NJR052Ym5SbGVIUXNJR1poYkhObEtUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVG05a1pTQW9aV3dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdaV3d1Ym05a1pWUjVjR1VnUFQwOUlETWdQeUJtYVhoRlQwd29aV3d1ZEdWNGRFTnZiblJsYm5RZ2ZId2daV3d1YVc1dVpYSlVaWGgwSUh4OElDY25LU0E2SUNjbk8xeHVJQ0I5WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjM1Z5Wm1GalpUdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZ2V0VGV4dCAoZWwpIHtcbiAgcmV0dXJuIGVsLmlubmVyVGV4dCB8fCBlbC50ZXh0Q29udGVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUZXh0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHJpbUNodW5rcyA9IHJlcXVpcmUoJy4uL2NodW5rcy90cmltJyk7XG5cbmZ1bmN0aW9uIEh0bWxDaHVua3MgKCkge1xufVxuXG5IdG1sQ2h1bmtzLnByb3RvdHlwZS50cmltID0gdHJpbUNodW5rcztcblxuSHRtbENodW5rcy5wcm90b3R5cGUuZmluZFRhZ3MgPSBmdW5jdGlvbiAoKSB7XG59O1xuXG5IdG1sQ2h1bmtzLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gKCkge1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIdG1sQ2h1bmtzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcblxuZnVuY3Rpb24gYmxvY2txdW90ZSAoY2h1bmtzKSB7XG4gIHdyYXBwaW5nKCdibG9ja3F1b3RlJywgc3RyaW5ncy5wbGFjZWhvbGRlcnMucXVvdGUsIGNodW5rcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmxvY2txdW90ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgd3JhcHBpbmcgPSByZXF1aXJlKCcuL3dyYXBwaW5nJyk7XG5cbmZ1bmN0aW9uIGJvbGRPckl0YWxpYyAoY2h1bmtzLCB0eXBlKSB7XG4gIHdyYXBwaW5nKHR5cGUgPT09ICdib2xkJyA/ICdzdHJvbmcnIDogJ2VtJywgc3RyaW5ncy5wbGFjZWhvbGRlcnNbdHlwZV0sIGNodW5rcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYm9sZE9ySXRhbGljO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcblxuZnVuY3Rpb24gY29kZWJsb2NrIChjaHVua3MpIHtcbiAgd3JhcHBpbmcoJ3ByZT48Y29kZScsIHN0cmluZ3MucGxhY2Vob2xkZXJzLmNvZGUsIGNodW5rcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29kZWJsb2NrO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBybGVhZGluZyA9IC88aChbMS02XSkoIFtePl0qKT8+JC87XG52YXIgcnRyYWlsaW5nID0gL148XFwvaChbMS02XSk+LztcblxuZnVuY3Rpb24gaGVhZGluZyAoY2h1bmtzKSB7XG4gIGNodW5rcy50cmltKCk7XG5cbiAgdmFyIHRyYWlsID0gcnRyYWlsaW5nLmV4ZWMoY2h1bmtzLmFmdGVyKTtcbiAgdmFyIGxlYWQgPSBybGVhZGluZy5leGVjKGNodW5rcy5iZWZvcmUpO1xuICBpZiAobGVhZCAmJiB0cmFpbCAmJiBsZWFkWzFdID09PSB0cmFpbFsxXSkge1xuICAgIHN3YXAoKTtcbiAgfSBlbHNlIHtcbiAgICBhZGQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN3YXAgKCkge1xuICAgIHZhciBsZXZlbCA9IHBhcnNlSW50KGxlYWRbMV0sIDEwKTtcbiAgICB2YXIgbmV4dCA9IGxldmVsIDw9IDEgPyA0IDogbGV2ZWwgLSAxO1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlYWRpbmcsICc8aCcgKyBuZXh0ICsgJz4nKTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShydHJhaWxpbmcsICc8L2gnICsgbmV4dCArICc+Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGQgKCkge1xuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmhlYWRpbmc7XG4gICAgfVxuICAgIGNodW5rcy5iZWZvcmUgKz0gJzxoMT4nO1xuICAgIGNodW5rcy5hZnRlciA9ICc8L2gxPicgKyBjaHVua3MuYWZ0ZXI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoZWFkaW5nO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBociAoY2h1bmtzKSB7XG4gIGNodW5rcy5iZWZvcmUgKz0gJ1xcbjxocj5cXG4nO1xuICBjaHVua3Muc2VsZWN0aW9uID0gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBvbmNlID0gcmVxdWlyZSgnLi4vb25jZScpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgcGFyc2VMaW5rSW5wdXQgPSByZXF1aXJlKCcuLi9jaHVua3MvcGFyc2VMaW5rSW5wdXQnKTtcbnZhciBybGVhZGluZyA9IC88YSggW14+XSopPz4kLztcbnZhciBydHJhaWxpbmcgPSAvXjxcXC9hPi87XG52YXIgcmltYWdlID0gLzxpbWcoIFtePl0qKT9cXC8+JC87XG5cbmZ1bmN0aW9uIGxpbmtPckltYWdlT3JBdHRhY2htZW50IChjaHVua3MsIG9wdGlvbnMpIHtcbiAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gIHZhciBpbWFnZSA9IHR5cGUgPT09ICdpbWFnZSc7XG4gIHZhciByZXN1bWU7XG5cbiAgaWYgKHR5cGUgIT09ICdhdHRhY2htZW50Jykge1xuICAgIGNodW5rcy50cmltKCk7XG4gIH1cblxuICBpZiAocmVtb3ZhbCgpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmVzdW1lID0gdGhpcy5hc3luYygpO1xuXG4gIG9wdGlvbnMucHJvbXB0cy5jbG9zZSgpO1xuICAob3B0aW9ucy5wcm9tcHRzW3R5cGVdIHx8IG9wdGlvbnMucHJvbXB0cy5saW5rKShvcHRpb25zLCBvbmNlKHJlc29sdmVkKSk7XG5cbiAgZnVuY3Rpb24gcmVtb3ZhbCAoKSB7XG4gICAgaWYgKGltYWdlKSB7XG4gICAgICBpZiAocmltYWdlLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJ0cmFpbGluZy5leGVjKGNodW5rcy5hZnRlcikgJiYgcmxlYWRpbmcuZXhlYyhjaHVua3MuYmVmb3JlKSkge1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVhZGluZywgJycpO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnRyYWlsaW5nLCAnJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNvbHZlZCAocmVzdWx0KSB7XG4gICAgdmFyIHBhcnRzO1xuICAgIHZhciBsaW5rID0gcGFyc2VMaW5rSW5wdXQocmVzdWx0LmRlZmluaXRpb24pO1xuICAgIGlmIChsaW5rLmhyZWYubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXN1bWUoKTsgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnYXR0YWNobWVudCcpIHtcbiAgICAgIHBhcnRzID0gb3B0aW9ucy5tZXJnZUh0bWxBbmRBdHRhY2htZW50KGNodW5rcy5iZWZvcmUgKyBjaHVua3Muc2VsZWN0aW9uICsgY2h1bmtzLmFmdGVyLCBsaW5rKTtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBwYXJ0cy5iZWZvcmU7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gcGFydHMuc2VsZWN0aW9uO1xuICAgICAgY2h1bmtzLmFmdGVyID0gcGFydHMuYWZ0ZXI7XG4gICAgICByZXN1bWUoKTtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUob3B0aW9ucy5zdXJmYWNlLnRleHRhcmVhLCAnd29vZm1hcmstbW9kZS1jaGFuZ2UnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdGl0bGUgPSBsaW5rLnRpdGxlID8gJyB0aXRsZT1cIicgKyBsaW5rLnRpdGxlICsgJ1wiJyA6ICcnO1xuXG4gICAgaWYgKGltYWdlKSB7XG4gICAgICBpbWFnZVdyYXAoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlua1dyYXAoKTtcbiAgICB9XG5cbiAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVyc1t0eXBlXTtcbiAgICB9XG4gICAgcmVzdW1lKCk7XG5cbiAgICBmdW5jdGlvbiBpbWFnZVdyYXAgKCkge1xuICAgICAgY2h1bmtzLmJlZm9yZSArPSAnPGltZyBzcmM9XCInICsgbGluay5ocmVmICsgJ1wiIGFsdD1cIic7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSAnXCInICsgdGl0bGUgKyAnIC8+JyArIGNodW5rcy5hZnRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaW5rV3JhcCAoKSB7XG4gICAgICB2YXIgbmFtZXMgPSBvcHRpb25zLmNsYXNzZXMuaW5wdXQubGlua3M7XG4gICAgICB2YXIgY2xhc3NlcyA9IG5hbWVzID8gJyBjbGFzcz1cIicgKyBuYW1lcyArICdcIicgOiAnJztcbiAgICAgIGNodW5rcy5iZWZvcmUgKz0gJzxhIGhyZWY9XCInICsgbGluay5ocmVmICsgJ1wiJyArIHRpdGxlICsgY2xhc3NlcyArICc+JztcbiAgICAgIGNodW5rcy5hZnRlciA9ICc8L2E+JyArIGNodW5rcy5hZnRlcjtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaW5rT3JJbWFnZU9yQXR0YWNobWVudDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgcmxlZnRzaW5nbGUgPSAvPCh1bHxvbCkoIFtePl0qKT8+XFxzKjxsaSggW14+XSopPz4kLztcbnZhciBycmlnaHRzaW5nbGUgPSAvXjxcXC9saT5cXHMqPFxcLyh1bHxvbCk+LztcbnZhciBybGVmdGl0ZW0gPSAvPGxpKCBbXj5dKik/PiQvO1xudmFyIHJyaWdodGl0ZW0gPSAvXjxcXC9saSggW14+XSopPz4vO1xudmFyIHJvcGVuID0gL148KHVsfG9sKSggW14+XSopPz4kLztcblxuZnVuY3Rpb24gbGlzdCAoY2h1bmtzLCBvcmRlcmVkKSB7XG4gIHZhciB0YWcgPSBvcmRlcmVkID8gJ29sJyA6ICd1bCc7XG4gIHZhciBvbGlzdCA9ICc8JyArIHRhZyArICc+JztcbiAgdmFyIGNsaXN0ID0gJzwvJyArIHRhZyArICc+JztcblxuICBjaHVua3MudHJpbSgpO1xuXG4gIGlmIChybGVmdHNpbmdsZS50ZXN0KGNodW5rcy5iZWZvcmUpICYmIHJyaWdodHNpbmdsZS50ZXN0KGNodW5rcy5hZnRlcikpIHtcbiAgICBpZiAodGFnID09PSBSZWdFeHAuJDEpIHtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlZnRzaW5nbGUsICcnKTtcbiAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJyaWdodHNpbmdsZSwgJycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHZhciB1bFN0YXJ0ID0gY2h1bmtzLmJlZm9yZS5sYXN0SW5kZXhPZignPHVsJyk7XG4gIHZhciBvbFN0YXJ0ID0gY2h1bmtzLmJlZm9yZS5sYXN0SW5kZXhPZignPG9sJyk7XG4gIHZhciBjbG9zZVRhZyA9IGNodW5rcy5hZnRlci5pbmRleE9mKCc8L3VsPicpO1xuICBpZiAoY2xvc2VUYWcgPT09IC0xKSB7XG4gICAgY2xvc2VUYWcgPSBjaHVua3MuYWZ0ZXIuaW5kZXhPZignPC9vbD4nKTtcbiAgfVxuICBpZiAoY2xvc2VUYWcgPT09IC0xKSB7XG4gICAgYWRkKCk7IHJldHVybjtcbiAgfVxuICB2YXIgb3BlblN0YXJ0ID0gdWxTdGFydCA+IG9sU3RhcnQgPyB1bFN0YXJ0IDogb2xTdGFydDtcbiAgaWYgKG9wZW5TdGFydCA9PT0gLTEpIHtcbiAgICBhZGQoKTsgcmV0dXJuO1xuICB9XG4gIHZhciBvcGVuRW5kID0gY2h1bmtzLmJlZm9yZS5pbmRleE9mKCc+Jywgb3BlblN0YXJ0KTtcbiAgaWYgKG9wZW5FbmQgPT09IC0xKSB7XG4gICAgYWRkKCk7IHJldHVybjtcbiAgfVxuXG4gIHZhciBvcGVuVGFnID0gY2h1bmtzLmJlZm9yZS5zdWJzdHIob3BlblN0YXJ0LCBvcGVuRW5kIC0gb3BlblN0YXJ0ICsgMSk7XG4gIGlmIChyb3Blbi50ZXN0KG9wZW5UYWcpKSB7XG4gICAgaWYgKHRhZyAhPT0gUmVnRXhwLiQxKSB7XG4gICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5zdWJzdHIoMCwgb3BlblN0YXJ0KSArICc8JyArIHRhZyArIGNodW5rcy5iZWZvcmUuc3Vic3RyKG9wZW5TdGFydCArIDMpO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnN1YnN0cigwLCBjbG9zZVRhZykgKyAnPC8nICsgdGFnICsgY2h1bmtzLmFmdGVyLnN1YnN0cihjbG9zZVRhZyArIDQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmxlZnRpdGVtLnRlc3QoY2h1bmtzLmJlZm9yZSkgJiYgcnJpZ2h0aXRlbS50ZXN0KGNodW5rcy5hZnRlcikpIHtcbiAgICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVmdGl0ZW0sICcnKTtcbiAgICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnJpZ2h0aXRlbSwgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZCAobGlzdCkge1xuICAgIHZhciBvcGVuID0gbGlzdCA/ICcnIDogb2xpc3Q7XG4gICAgdmFyIGNsb3NlID0gbGlzdCA/ICcnIDogY2xpc3Q7XG5cbiAgICBjaHVua3MuYmVmb3JlICs9IG9wZW4gKyAnPGxpPic7XG4gICAgY2h1bmtzLmFmdGVyID0gJzwvbGk+JyArIGNsb3NlICsgY2h1bmtzLmFmdGVyO1xuXG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMubGlzdGl0ZW07XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gd3JhcHBpbmcgKHRhZywgcGxhY2Vob2xkZXIsIGNodW5rcykge1xuICB2YXIgb3BlbiA9ICc8JyArIHRhZztcbiAgdmFyIGNsb3NlID0gJzwvJyArIHRhZy5yZXBsYWNlKC88L2csICc8LycpO1xuICB2YXIgcmxlYWRpbmcgPSBuZXcgUmVnRXhwKG9wZW4gKyAnKCBbXj5dKik/PiQnLCAnaScpO1xuICB2YXIgcnRyYWlsaW5nID0gbmV3IFJlZ0V4cCgnXicgKyBjbG9zZSArICc+JywgJ2knKTtcbiAgdmFyIHJvcGVuID0gbmV3IFJlZ0V4cChvcGVuICsgJyggW14+XSopPz4nLCAnaWcnKTtcbiAgdmFyIHJjbG9zZSA9IG5ldyBSZWdFeHAoY2xvc2UgKyAnKCBbXj5dKik/PicsICdpZycpO1xuXG4gIGNodW5rcy50cmltKCk7XG5cbiAgdmFyIHRyYWlsID0gcnRyYWlsaW5nLmV4ZWMoY2h1bmtzLmFmdGVyKTtcbiAgdmFyIGxlYWQgPSBybGVhZGluZy5leGVjKGNodW5rcy5iZWZvcmUpO1xuICBpZiAobGVhZCAmJiB0cmFpbCkge1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlYWRpbmcsICcnKTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShydHJhaWxpbmcsICcnKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBwbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgdmFyIG9wZW5lZCA9IHJvcGVuLnRlc3QoY2h1bmtzLnNlbGVjdGlvbik7XG4gICAgaWYgKG9wZW5lZCkge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShyb3BlbiwgJycpO1xuICAgICAgaWYgKCFzdXJyb3VuZGVkKGNodW5rcywgdGFnKSkge1xuICAgICAgICBjaHVua3MuYmVmb3JlICs9IG9wZW4gKyAnPic7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBjbG9zZWQgPSByY2xvc2UudGVzdChjaHVua3Muc2VsZWN0aW9uKTtcbiAgICBpZiAoY2xvc2VkKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJjbG9zZSwgJycpO1xuICAgICAgaWYgKCFzdXJyb3VuZGVkKGNodW5rcywgdGFnKSkge1xuICAgICAgICBjaHVua3MuYWZ0ZXIgPSBjbG9zZSArICc+JyArIGNodW5rcy5hZnRlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wZW5lZCB8fCBjbG9zZWQpIHtcbiAgICAgIHB1c2hvdmVyKCk7IHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN1cnJvdW5kZWQoY2h1bmtzLCB0YWcpKSB7XG4gICAgICBpZiAocmxlYWRpbmcudGVzdChjaHVua3MuYmVmb3JlKSkge1xuICAgICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJsZWFkaW5nLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaHVua3MuYmVmb3JlICs9IGNsb3NlICsgJz4nO1xuICAgICAgfVxuICAgICAgaWYgKHJ0cmFpbGluZy50ZXN0KGNodW5rcy5hZnRlcikpIHtcbiAgICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnRyYWlsaW5nLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaHVua3MuYWZ0ZXIgPSBvcGVuICsgJz4nICsgY2h1bmtzLmFmdGVyO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWNsb3NlYm91bmRlZChjaHVua3MsIHRhZykpIHtcbiAgICAgIGNodW5rcy5hZnRlciA9IGNsb3NlICsgJz4nICsgY2h1bmtzLmFmdGVyO1xuICAgICAgY2h1bmtzLmJlZm9yZSArPSBvcGVuICsgJz4nO1xuICAgIH1cbiAgICBwdXNob3ZlcigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaG92ZXIgKCkge1xuICAgIGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvPChcXC8pPyhbXj4gXSspKCBbXj5dKik/Pi9pZywgcHVzaG92ZXJPdGhlclRhZ3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaG92ZXJPdGhlclRhZ3MgKGFsbCwgY2xvc2luZywgdGFnLCBhLCBpKSB7XG4gICAgdmFyIGF0dHJzID0gYSB8fCAnJztcbiAgICB2YXIgb3BlbiA9ICFjbG9zaW5nO1xuICAgIHZhciByY2xvc2VkID0gbmV3IFJlZ0V4cCgnPFxcLycgKyB0YWcucmVwbGFjZSgvPC9nLCAnPC8nKSArICc+JywgJ2knKTtcbiAgICB2YXIgcm9wZW5lZCA9IG5ldyBSZWdFeHAoJzwnICsgdGFnICsgJyggW14+XSopPz4nLCAnaScpO1xuICAgIGlmIChvcGVuICYmICFyY2xvc2VkLnRlc3QoY2h1bmtzLnNlbGVjdGlvbi5zdWJzdHIoaSkpKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uICs9ICc8LycgKyB0YWcgKyAnPic7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZSgvXig8XFwvW14+XSs+KS8sICckMTwnICsgdGFnICsgYXR0cnMgKyAnPicpO1xuICAgIH1cblxuICAgIGlmIChjbG9zaW5nICYmICFyb3BlbmVkLnRlc3QoY2h1bmtzLnNlbGVjdGlvbi5zdWJzdHIoMCwgaSkpKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gJzwnICsgdGFnICsgYXR0cnMgKyAnPicgKyBjaHVua3Muc2VsZWN0aW9uO1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZSgvKDxbXj5dKyg/OiBbXj5dKik/PikkLywgJzwvJyArIHRhZyArICc+JDEnKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvc2Vib3VuZGVkIChjaHVua3MsIHRhZykge1xuICB2YXIgcmNsb3NlbGVmdCA9IG5ldyBSZWdFeHAoJzwvJyArIHRhZy5yZXBsYWNlKC88L2csICc8LycpICsgJz4kJywgJ2knKTtcbiAgdmFyIHJvcGVucmlnaHQgPSBuZXcgUmVnRXhwKCdePCcgKyB0YWcgKyAnKD86IFtePl0qKT8+JywgJ2knKTtcbiAgdmFyIGJvdW5kZWQgPSByY2xvc2VsZWZ0LnRlc3QoY2h1bmtzLmJlZm9yZSkgJiYgcm9wZW5yaWdodC50ZXN0KGNodW5rcy5hZnRlcik7XG4gIGlmIChib3VuZGVkKSB7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShyY2xvc2VsZWZ0LCAnJyk7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2Uocm9wZW5yaWdodCwgJycpO1xuICB9XG4gIHJldHVybiBib3VuZGVkO1xufVxuXG5mdW5jdGlvbiBzdXJyb3VuZGVkIChjaHVua3MsIHRhZykge1xuICB2YXIgcm9wZW4gPSBuZXcgUmVnRXhwKCc8JyArIHRhZyArICcoPzogW14+XSopPz4nLCAnaWcnKTtcbiAgdmFyIHJjbG9zZSA9IG5ldyBSZWdFeHAoJzxcXC8nICsgdGFnLnJlcGxhY2UoLzwvZywgJzwvJykgKyAnPicsICdpZycpO1xuICB2YXIgb3BlbnNCZWZvcmUgPSBjb3VudChjaHVua3MuYmVmb3JlLCByb3Blbik7XG4gIHZhciBvcGVuc0FmdGVyID0gY291bnQoY2h1bmtzLmFmdGVyLCByb3Blbik7XG4gIHZhciBjbG9zZXNCZWZvcmUgPSBjb3VudChjaHVua3MuYmVmb3JlLCByY2xvc2UpO1xuICB2YXIgY2xvc2VzQWZ0ZXIgPSBjb3VudChjaHVua3MuYWZ0ZXIsIHJjbG9zZSk7XG4gIHZhciBvcGVuID0gb3BlbnNCZWZvcmUgLSBjbG9zZXNCZWZvcmUgPiAwO1xuICB2YXIgY2xvc2UgPSBjbG9zZXNBZnRlciAtIG9wZW5zQWZ0ZXIgPiAwO1xuICByZXR1cm4gb3BlbiAmJiBjbG9zZTtcblxuICBmdW5jdGlvbiBjb3VudCAodGV4dCwgcmVnZXgpIHtcbiAgICB2YXIgbWF0Y2ggPSB0ZXh0Lm1hdGNoKHJlZ2V4KTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiBtYXRjaC5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd3JhcHBpbmc7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGlzVmlzaWJsZUVsZW1lbnQgKGVsZW0pIHtcbiAgaWYgKGdsb2JhbC5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgcmV0dXJuIGdsb2JhbC5nZXRDb21wdXRlZFN0eWxlKGVsZW0sIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ2Rpc3BsYXknKSAhPT0gJ25vbmUnO1xuICB9IGVsc2UgaWYgKGVsZW0uY3VycmVudFN0eWxlKSB7XG4gICAgcmV0dXJuIGVsZW0uY3VycmVudFN0eWxlLmRpc3BsYXkgIT09ICdub25lJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVmlzaWJsZUVsZW1lbnQ7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OXBjMVpwYzJsaWJHVkZiR1Z0Wlc1MExtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVablZ1WTNScGIyNGdhWE5XYVhOcFlteGxSV3hsYldWdWRDQW9aV3hsYlNrZ2UxeHVJQ0JwWmlBb1oyeHZZbUZzTG1kbGRFTnZiWEIxZEdWa1UzUjViR1VwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdaMnh2WW1Gc0xtZGxkRU52YlhCMWRHVmtVM1I1YkdVb1pXeGxiU3dnYm5Wc2JDa3VaMlYwVUhKdmNHVnlkSGxXWVd4MVpTZ25aR2x6Y0d4aGVTY3BJQ0U5UFNBbmJtOXVaU2M3WEc0Z0lIMGdaV3h6WlNCcFppQW9aV3hsYlM1amRYSnlaVzUwVTNSNWJHVXBJSHRjYmlBZ0lDQnlaWFIxY200Z1pXeGxiUzVqZFhKeVpXNTBVM1I1YkdVdVpHbHpjR3hoZVNBaFBUMGdKMjV2Ym1Vbk8xeHVJQ0I5WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdhWE5XYVhOcFlteGxSV3hsYldWdWREdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbWFueSAodGV4dCwgdGltZXMpIHtcbiAgcmV0dXJuIG5ldyBBcnJheSh0aW1lcyArIDEpLmpvaW4odGV4dCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFueTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hbnkgPSByZXF1aXJlKCcuLi9tYW55Jyk7XG52YXIgZXh0ZW5kUmVnRXhwID0gcmVxdWlyZSgnLi4vZXh0ZW5kUmVnRXhwJyk7XG52YXIgdHJpbUNodW5rcyA9IHJlcXVpcmUoJy4uL2NodW5rcy90cmltJyk7XG52YXIgcmUgPSBSZWdFeHA7XG5cbmZ1bmN0aW9uIE1hcmtkb3duQ2h1bmtzICgpIHtcbn1cblxuTWFya2Rvd25DaHVua3MucHJvdG90eXBlLnRyaW0gPSB0cmltQ2h1bmtzO1xuXG5NYXJrZG93bkNodW5rcy5wcm90b3R5cGUuZmluZFRhZ3MgPSBmdW5jdGlvbiAoc3RhcnRSZWdleCwgZW5kUmVnZXgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgcmVnZXg7XG5cbiAgaWYgKHN0YXJ0UmVnZXgpIHtcbiAgICByZWdleCA9IGV4dGVuZFJlZ0V4cChzdGFydFJlZ2V4LCAnJywgJyQnKTtcbiAgICB0aGlzLmJlZm9yZSA9IHRoaXMuYmVmb3JlLnJlcGxhY2UocmVnZXgsIHN0YXJ0UmVwbGFjZXIpO1xuICAgIHJlZ2V4ID0gZXh0ZW5kUmVnRXhwKHN0YXJ0UmVnZXgsICdeJywgJycpO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24ucmVwbGFjZShyZWdleCwgc3RhcnRSZXBsYWNlcik7XG4gIH1cblxuICBpZiAoZW5kUmVnZXgpIHtcbiAgICByZWdleCA9IGV4dGVuZFJlZ0V4cChlbmRSZWdleCwgJycsICckJyk7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5yZXBsYWNlKHJlZ2V4LCBlbmRSZXBsYWNlcik7XG4gICAgcmVnZXggPSBleHRlbmRSZWdFeHAoZW5kUmVnZXgsICdeJywgJycpO1xuICAgIHRoaXMuYWZ0ZXIgPSB0aGlzLmFmdGVyLnJlcGxhY2UocmVnZXgsIGVuZFJlcGxhY2VyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0UmVwbGFjZXIgKG1hdGNoKSB7XG4gICAgc2VsZi5zdGFydFRhZyA9IHNlbGYuc3RhcnRUYWcgKyBtYXRjaDsgcmV0dXJuICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5kUmVwbGFjZXIgKG1hdGNoKSB7XG4gICAgc2VsZi5lbmRUYWcgPSBtYXRjaCArIHNlbGYuZW5kVGFnOyByZXR1cm4gJyc7XG4gIH1cbn07XG5cbk1hcmtkb3duQ2h1bmtzLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgYmVmb3JlQ291bnQgPSAnYmVmb3JlJyBpbiBvID8gby5iZWZvcmUgOiAxO1xuICB2YXIgYWZ0ZXJDb3VudCA9ICdhZnRlcicgaW4gbyA/IG8uYWZ0ZXIgOiAxO1xuXG4gIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24ucmVwbGFjZSgvKF5cXG4qKS8sICcnKTtcbiAgdGhpcy5zdGFydFRhZyA9IHRoaXMuc3RhcnRUYWcgKyByZS4kMTtcbiAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5yZXBsYWNlKC8oXFxuKiQpLywgJycpO1xuICB0aGlzLmVuZFRhZyA9IHRoaXMuZW5kVGFnICsgcmUuJDE7XG4gIHRoaXMuc3RhcnRUYWcgPSB0aGlzLnN0YXJ0VGFnLnJlcGxhY2UoLyheXFxuKikvLCAnJyk7XG4gIHRoaXMuYmVmb3JlID0gdGhpcy5iZWZvcmUgKyByZS4kMTtcbiAgdGhpcy5lbmRUYWcgPSB0aGlzLmVuZFRhZy5yZXBsYWNlKC8oXFxuKiQpLywgJycpO1xuICB0aGlzLmFmdGVyID0gdGhpcy5hZnRlciArIHJlLiQxO1xuXG4gIGlmICh0aGlzLmJlZm9yZSkge1xuICAgIHRoaXMuYmVmb3JlID0gcmVwbGFjZSh0aGlzLmJlZm9yZSwgKytiZWZvcmVDb3VudCwgJyQnKTtcbiAgfVxuXG4gIGlmICh0aGlzLmFmdGVyKSB7XG4gICAgdGhpcy5hZnRlciA9IHJlcGxhY2UodGhpcy5hZnRlciwgKythZnRlckNvdW50LCAnJyk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlICh0ZXh0LCBjb3VudCwgc3VmZml4KSB7XG4gICAgdmFyIHJlZ2V4ID0gby5hbnkgPyAnXFxcXG4qJyA6IG1hbnkoJ1xcXFxuPycsIGNvdW50KTtcbiAgICB2YXIgcmVwbGFjZW1lbnQgPSBtYW55KCdcXG4nLCBjb3VudCk7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShuZXcgcmUocmVnZXggKyBzdWZmaXgpLCByZXBsYWNlbWVudCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTWFya2Rvd25DaHVua3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHdyYXBwaW5nID0gcmVxdWlyZSgnLi93cmFwcGluZycpO1xudmFyIHNldHRpbmdzID0gcmVxdWlyZSgnLi9zZXR0aW5ncycpO1xudmFyIHJ0cmFpbGJsYW5rbGluZSA9IC8oPlsgXFx0XSopJC87XG52YXIgcmxlYWRibGFua2xpbmUgPSAvXig+WyBcXHRdKikvO1xudmFyIHJuZXdsaW5lZmVuY2luZyA9IC9eKFxcbiopKFteXFxyXSs/KShcXG4qKSQvO1xudmFyIHJlbmR0YWcgPSAvXigoKFxcbnxeKShcXG5bIFxcdF0qKSo+KC4rXFxuKSouKikrKFxcblsgXFx0XSopKikvO1xudmFyIHJsZWFkYnJhY2tldCA9IC9eXFxuKCg+fFxccykqKVxcbi87XG52YXIgcnRyYWlsYnJhY2tldCA9IC9cXG4oKD58XFxzKSopXFxuJC87XG5cbmZ1bmN0aW9uIGJsb2NrcXVvdGUgKGNodW5rcykge1xuICB2YXIgbWF0Y2ggPSAnJztcbiAgdmFyIGxlZnRPdmVyID0gJyc7XG4gIHZhciBsaW5lO1xuXG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2Uocm5ld2xpbmVmZW5jaW5nLCBuZXdsaW5lcmVwbGFjZXIpO1xuICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJ0cmFpbGJsYW5rbGluZSwgdHJhaWxibGFua2xpbmVyZXBsYWNlcik7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL14oXFxzfD4pKyQvLCAnJyk7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uIHx8IHN0cmluZ3MucGxhY2Vob2xkZXJzLnF1b3RlO1xuXG4gIGlmIChjaHVua3MuYmVmb3JlKSB7XG4gICAgYmVmb3JlUHJvY2Vzc2luZygpO1xuICB9XG5cbiAgY2h1bmtzLnN0YXJ0VGFnID0gbWF0Y2g7XG4gIGNodW5rcy5iZWZvcmUgPSBsZWZ0T3ZlcjtcblxuICBpZiAoY2h1bmtzLmFmdGVyKSB7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UoL15cXG4/LywgJ1xcbicpO1xuICB9XG5cbiAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocmVuZHRhZywgZW5kdGFncmVwbGFjZXIpO1xuXG4gIGlmICgvXig/IVsgXXswLDN9PikvbS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pKSB7XG4gICAgd3JhcHBpbmcud3JhcChjaHVua3MsIHNldHRpbmdzLmxpbmVMZW5ndGggLSAyKTtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9eL2dtLCAnPiAnKTtcbiAgICByZXBsYWNlQmxhbmtzSW5UYWdzKHRydWUpO1xuICAgIGNodW5rcy5za2lwKCk7XG4gIH0gZWxzZSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXlsgXXswLDN9PiA/L2dtLCAnJyk7XG4gICAgd3JhcHBpbmcudW53cmFwKGNodW5rcyk7XG4gICAgcmVwbGFjZUJsYW5rc0luVGFncyhmYWxzZSk7XG5cbiAgICBpZiAoIS9eKFxcbnxeKVsgXXswLDN9Pi8udGVzdChjaHVua3Muc2VsZWN0aW9uKSAmJiBjaHVua3Muc3RhcnRUYWcpIHtcbiAgICAgIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5zdGFydFRhZy5yZXBsYWNlKC9cXG57MCwyfSQvLCAnXFxuXFxuJyk7XG4gICAgfVxuXG4gICAgaWYgKCEvKFxcbnxeKVsgXXswLDN9Pi4qJC8udGVzdChjaHVua3Muc2VsZWN0aW9uKSAmJiBjaHVua3MuZW5kVGFnKSB7XG4gICAgICBjaHVua3MuZW5kVGFnID0gY2h1bmtzLmVuZFRhZy5yZXBsYWNlKC9eXFxuezAsMn0vLCAnXFxuXFxuJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCEvXFxuLy50ZXN0KGNodW5rcy5zZWxlY3Rpb24pKSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShybGVhZGJsYW5rbGluZSwgbGVhZGJsYW5rbGluZXJlcGxhY2VyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld2xpbmVyZXBsYWNlciAoYWxsLCBiZWZvcmUsIHRleHQsIGFmdGVyKSB7XG4gICAgY2h1bmtzLmJlZm9yZSArPSBiZWZvcmU7XG4gICAgY2h1bmtzLmFmdGVyID0gYWZ0ZXIgKyBjaHVua3MuYWZ0ZXI7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGJsYW5rbGluZXJlcGxhY2VyIChhbGwsIGJsYW5rKSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGJsYW5rICsgY2h1bmtzLnNlbGVjdGlvbjsgcmV0dXJuICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGJsYW5rbGluZXJlcGxhY2VyIChhbGwsIGJsYW5rcykge1xuICAgIGNodW5rcy5zdGFydFRhZyArPSBibGFua3M7IHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGJlZm9yZVByb2Nlc3NpbmcgKCkge1xuICAgIHZhciBsaW5lcyA9IGNodW5rcy5iZWZvcmUucmVwbGFjZSgvXFxuJC8sICcnKS5zcGxpdCgnXFxuJyk7XG4gICAgdmFyIGNoYWluZWQgPSBmYWxzZTtcbiAgICB2YXIgZ29vZDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGdvb2QgPSBmYWxzZTtcbiAgICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgIGNoYWluZWQgPSBjaGFpbmVkICYmIGxpbmUubGVuZ3RoID4gMDtcbiAgICAgIGlmICgvXj4vLnRlc3QobGluZSkpIHtcbiAgICAgICAgZ29vZCA9IHRydWU7XG4gICAgICAgIGlmICghY2hhaW5lZCAmJiBsaW5lLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBjaGFpbmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgvXlsgXFx0XSokLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGdvb2QgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29vZCA9IGNoYWluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoZ29vZCkge1xuICAgICAgICBtYXRjaCArPSBsaW5lICsgJ1xcbic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWZ0T3ZlciArPSBtYXRjaCArIGxpbmU7XG4gICAgICAgIG1hdGNoID0gJ1xcbic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCEvKF58XFxuKT4vLnRlc3QobWF0Y2gpKSB7XG4gICAgICBsZWZ0T3ZlciArPSBtYXRjaDtcbiAgICAgIG1hdGNoID0gJyc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW5kdGFncmVwbGFjZXIgKGFsbCkge1xuICAgIGNodW5rcy5lbmRUYWcgPSBhbGw7IHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2VCbGFua3NJblRhZ3MgKGJyYWNrZXQpIHtcbiAgICB2YXIgcmVwbGFjZW1lbnQgPSBicmFja2V0ID8gJz4gJyA6ICcnO1xuXG4gICAgaWYgKGNodW5rcy5zdGFydFRhZykge1xuICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLnN0YXJ0VGFnLnJlcGxhY2UocnRyYWlsYnJhY2tldCwgcmVwbGFjZXIpO1xuICAgIH1cbiAgICBpZiAoY2h1bmtzLmVuZFRhZykge1xuICAgICAgY2h1bmtzLmVuZFRhZyA9IGNodW5rcy5lbmRUYWcucmVwbGFjZShybGVhZGJyYWNrZXQsIHJlcGxhY2VyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXBsYWNlciAoYWxsLCBtYXJrZG93bikge1xuICAgICAgcmV0dXJuICdcXG4nICsgbWFya2Rvd24ucmVwbGFjZSgvXlsgXXswLDN9Pj9bIFxcdF0qJC9nbSwgcmVwbGFjZW1lbnQpICsgJ1xcbic7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmxvY2txdW90ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJsZWFkaW5nID0gL14oXFwqKikvO1xudmFyIHJ0cmFpbGluZyA9IC8oXFwqKiQpLztcbnZhciBydHJhaWxpbmdzcGFjZSA9IC8oXFxzPykkLztcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xuXG5mdW5jdGlvbiBib2xkT3JJdGFsaWMgKGNodW5rcywgdHlwZSkge1xuICB2YXIgcm5ld2xpbmVzID0gL1xcbnsyLH0vZztcbiAgdmFyIHN0YXJDb3VudCA9IHR5cGUgPT09ICdib2xkJyA/IDIgOiAxO1xuXG4gIGNodW5rcy50cmltKCk7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2Uocm5ld2xpbmVzLCAnXFxuJyk7XG5cbiAgdmFyIG1hcmt1cDtcbiAgdmFyIGxlYWRTdGFycyA9IHJ0cmFpbGluZy5leGVjKGNodW5rcy5iZWZvcmUpWzBdO1xuICB2YXIgdHJhaWxTdGFycyA9IHJsZWFkaW5nLmV4ZWMoY2h1bmtzLmFmdGVyKVswXTtcbiAgdmFyIHN0YXJzID0gJ1xcXFwqeycgKyBzdGFyQ291bnQgKyAnfSc7XG4gIHZhciBmZW5jZSA9IE1hdGgubWluKGxlYWRTdGFycy5sZW5ndGgsIHRyYWlsU3RhcnMubGVuZ3RoKTtcbiAgaWYgKGZlbmNlID49IHN0YXJDb3VudCAmJiAoZmVuY2UgIT09IDIgfHwgc3RhckNvdW50ICE9PSAxKSkge1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UobmV3IFJlZ0V4cChzdGFycyArICckJywgJycpLCAnJyk7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UobmV3IFJlZ0V4cCgnXicgKyBzdGFycywgJycpLCAnJyk7XG4gIH0gZWxzZSBpZiAoIWNodW5rcy5zZWxlY3Rpb24gJiYgdHJhaWxTdGFycykge1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJsZWFkaW5nLCAnJyk7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShydHJhaWxpbmdzcGFjZSwgJycpICsgdHJhaWxTdGFycyArIFJlZ0V4cC4kMTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24gJiYgIXRyYWlsU3RhcnMpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVyc1t0eXBlXTtcbiAgICB9XG5cbiAgICBtYXJrdXAgPSBzdGFyQ291bnQgPT09IDEgPyAnKicgOiAnKionO1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlICsgbWFya3VwO1xuICAgIGNodW5rcy5hZnRlciA9IG1hcmt1cCArIGNodW5rcy5hZnRlcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJvbGRPckl0YWxpYztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgcnRleHRiZWZvcmUgPSAvXFxTWyBdKiQvO1xudmFyIHJ0ZXh0YWZ0ZXIgPSAvXlsgXSpcXFMvO1xudmFyIHJuZXdsaW5lID0gL1xcbi87XG52YXIgcmJhY2t0aWNrID0gL2AvO1xudmFyIHJmZW5jZWJlZm9yZSA9IC9gYGBbYS16XSpcXG4/JC87XG52YXIgcmZlbmNlYmVmb3JlaW5zaWRlID0gL15gYGBbYS16XSpcXG4vO1xudmFyIHJmZW5jZWFmdGVyID0gL15cXG4/YGBgLztcbnZhciByZmVuY2VhZnRlcmluc2lkZSA9IC9cXG5gYGAkLztcblxuZnVuY3Rpb24gY29kZWJsb2NrIChjaHVua3MsIG9wdGlvbnMpIHtcbiAgdmFyIG5ld2xpbmVkID0gcm5ld2xpbmUudGVzdChjaHVua3Muc2VsZWN0aW9uKTtcbiAgdmFyIHRyYWlsaW5nID0gcnRleHRhZnRlci50ZXN0KGNodW5rcy5hZnRlcik7XG4gIHZhciBsZWFkaW5nID0gcnRleHRiZWZvcmUudGVzdChjaHVua3MuYmVmb3JlKTtcbiAgdmFyIG91dGZlbmNlZCA9IHJmZW5jZWJlZm9yZS50ZXN0KGNodW5rcy5iZWZvcmUpICYmIHJmZW5jZWFmdGVyLnRlc3QoY2h1bmtzLmFmdGVyKTtcbiAgaWYgKG91dGZlbmNlZCB8fCBuZXdsaW5lZCB8fCAhKGxlYWRpbmcgfHwgdHJhaWxpbmcpKSB7XG4gICAgYmxvY2sob3V0ZmVuY2VkKTtcbiAgfSBlbHNlIHtcbiAgICBpbmxpbmUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlubGluZSAoKSB7XG4gICAgY2h1bmtzLnRyaW0oKTtcbiAgICBjaHVua3MuZmluZFRhZ3MocmJhY2t0aWNrLCByYmFja3RpY2spO1xuXG4gICAgaWYgKCFjaHVua3Muc3RhcnRUYWcgJiYgIWNodW5rcy5lbmRUYWcpIHtcbiAgICAgIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5lbmRUYWcgPSAnYCc7XG4gICAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmNvZGU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjaHVua3MuZW5kVGFnICYmICFjaHVua3Muc3RhcnRUYWcpIHtcbiAgICAgIGNodW5rcy5iZWZvcmUgKz0gY2h1bmtzLmVuZFRhZztcbiAgICAgIGNodW5rcy5lbmRUYWcgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLmVuZFRhZyA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJsb2NrIChvdXRmZW5jZWQpIHtcbiAgICBpZiAob3V0ZmVuY2VkKSB7XG4gICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJmZW5jZWJlZm9yZSwgJycpO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocmZlbmNlYWZ0ZXIsICcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKC9bIF17NH18YGBgW2Etel0qXFxuJC8sIG1lcmdlU2VsZWN0aW9uKTtcbiAgICBjaHVua3Muc2tpcCh7XG4gICAgICBiZWZvcmU6IC8oXFxufF4pKFxcdHxbIF17NCx9fGBgYFthLXpdKlxcbikuKlxcbiQvLnRlc3QoY2h1bmtzLmJlZm9yZSkgPyAwIDogMSxcbiAgICAgIGFmdGVyOiAvXlxcbihcXHR8WyBdezQsfXxcXG5gYGApLy50ZXN0KGNodW5rcy5hZnRlcikgPyAwIDogMVxuICAgIH0pO1xuXG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICBpZiAob3B0aW9ucy5mZW5jaW5nKSB7XG4gICAgICAgIGNodW5rcy5zdGFydFRhZyA9ICdgYGBcXG4nO1xuICAgICAgICBjaHVua3MuZW5kVGFnID0gJ1xcbmBgYCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaHVua3Muc3RhcnRUYWcgPSAnICAgICc7XG4gICAgICB9XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMuY29kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJmZW5jZWJlZm9yZWluc2lkZS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pICYmIHJmZW5jZWFmdGVyaW5zaWRlLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvKF5gYGBbYS16XSpcXG4pfChgYGAkKS9nLCAnJyk7XG4gICAgICB9IGVsc2UgaWYgKC9eWyBdezAsM31cXFMvbS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmZlbmNpbmcpIHtcbiAgICAgICAgICBjaHVua3MuYmVmb3JlICs9ICdgYGBcXG4nO1xuICAgICAgICAgIGNodW5rcy5hZnRlciA9ICdcXG5gYGAnICsgY2h1bmtzLmFmdGVyO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld2xpbmVkKSB7XG4gICAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXi9nbSwgJyAgICAnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaHVua3MuYmVmb3JlICs9ICcgICAgJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXig/OlsgXXs0fXxbIF17MCwzfVxcdHxgYGBbYS16XSopL2dtLCAnJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVyZ2VTZWxlY3Rpb24gKGFsbCkge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGFsbCArIGNodW5rcy5zZWxlY3Rpb247IHJldHVybiAnJztcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb2RlYmxvY2s7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYW55ID0gcmVxdWlyZSgnLi4vbWFueScpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG5cbmZ1bmN0aW9uIGhlYWRpbmcgKGNodW5rcykge1xuICB2YXIgbGV2ZWwgPSAwO1xuXG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uXG4gICAgLnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAgIC5yZXBsYWNlKC8oXlxccyt8XFxzKyQpL2csICcnKTtcblxuICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICBjaHVua3Muc3RhcnRUYWcgPSAnIyAnO1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVycy5oZWFkaW5nO1xuICAgIGNodW5rcy5lbmRUYWcgPSAnJztcbiAgICBjaHVua3Muc2tpcCh7IGJlZm9yZTogMSwgYWZ0ZXI6IDEgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY2h1bmtzLmZpbmRUYWdzKC8jK1sgXSovLCAvWyBdKiMrLyk7XG5cbiAgaWYgKC8jKy8udGVzdChjaHVua3Muc3RhcnRUYWcpKSB7XG4gICAgbGV2ZWwgPSBSZWdFeHAubGFzdE1hdGNoLmxlbmd0aDtcbiAgfVxuXG4gIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5lbmRUYWcgPSAnJztcbiAgY2h1bmtzLmZpbmRUYWdzKG51bGwsIC9cXHM/KC0rfD0rKS8pO1xuXG4gIGlmICgvPSsvLnRlc3QoY2h1bmtzLmVuZFRhZykpIHtcbiAgICBsZXZlbCA9IDE7XG4gIH1cblxuICBpZiAoLy0rLy50ZXN0KGNodW5rcy5lbmRUYWcpKSB7XG4gICAgbGV2ZWwgPSAyO1xuICB9XG5cbiAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLmVuZFRhZyA9ICcnO1xuICBjaHVua3Muc2tpcCh7IGJlZm9yZTogMSwgYWZ0ZXI6IDEgfSk7XG5cbiAgdmFyIGxldmVsVG9DcmVhdGUgPSBsZXZlbCA8IDIgPyA0IDogbGV2ZWwgLSAxO1xuICBpZiAobGV2ZWxUb0NyZWF0ZSA+IDApIHtcbiAgICBjaHVua3Muc3RhcnRUYWcgPSBtYW55KCcjJywgbGV2ZWxUb0NyZWF0ZSkgKyAnICc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoZWFkaW5nO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBociAoY2h1bmtzKSB7XG4gIGNodW5rcy5zdGFydFRhZyA9ICctLS0tLS0tLS0tXFxuJztcbiAgY2h1bmtzLnNlbGVjdGlvbiA9ICcnO1xuICBjaHVua3Muc2tpcCh7IGxlZnQ6IDIsIHJpZ2h0OiAxLCBhbnk6IHRydWUgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvbmNlID0gcmVxdWlyZSgnLi4vb25jZScpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgcGFyc2VMaW5rSW5wdXQgPSByZXF1aXJlKCcuLi9jaHVua3MvcGFyc2VMaW5rSW5wdXQnKTtcbnZhciByZGVmaW5pdGlvbnMgPSAvXlsgXXswLDN9XFxbKCg/OmF0dGFjaG1lbnQtKT9cXGQrKVxcXTpbIFxcdF0qXFxuP1sgXFx0XSo8PyhcXFMrPyk+P1sgXFx0XSpcXG4/WyBcXHRdKig/OihcXG4qKVtcIihdKC4rPylbXCIpXVsgXFx0XSopPyg/Olxcbit8JCkvZ207XG52YXIgcmF0dGFjaG1lbnQgPSAvXmF0dGFjaG1lbnQtKFxcZCspJC9pO1xuXG5mdW5jdGlvbiBleHRyYWN0RGVmaW5pdGlvbnMgKHRleHQsIGRlZmluaXRpb25zKSB7XG4gIHJkZWZpbml0aW9ucy5sYXN0SW5kZXggPSAwO1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKHJkZWZpbml0aW9ucywgcmVwbGFjZXIpO1xuXG4gIGZ1bmN0aW9uIHJlcGxhY2VyIChhbGwsIGlkLCBsaW5rLCBuZXdsaW5lcywgdGl0bGUpIHtcbiAgICBkZWZpbml0aW9uc1tpZF0gPSBhbGwucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG4gICAgaWYgKG5ld2xpbmVzKSB7XG4gICAgICBkZWZpbml0aW9uc1tpZF0gPSBhbGwucmVwbGFjZSgvW1wiKF0oLis/KVtcIildJC8sICcnKTtcbiAgICAgIHJldHVybiBuZXdsaW5lcyArIHRpdGxlO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVzaERlZmluaXRpb24gKGNodW5rcywgZGVmaW5pdGlvbiwgYXR0YWNobWVudCkge1xuICB2YXIgcmVnZXggPSAvKFxcWykoKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV0pKikoXFxdWyBdPyg/OlxcblsgXSopP1xcWykoKD86YXR0YWNobWVudC0pP1xcZCspKFxcXSkvZztcbiAgdmFyIGFuY2hvciA9IDA7XG4gIHZhciBkZWZpbml0aW9ucyA9IHt9O1xuICB2YXIgZm9vdG5vdGVzID0gW107XG5cbiAgY2h1bmtzLmJlZm9yZSA9IGV4dHJhY3REZWZpbml0aW9ucyhjaHVua3MuYmVmb3JlLCBkZWZpbml0aW9ucyk7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBleHRyYWN0RGVmaW5pdGlvbnMoY2h1bmtzLnNlbGVjdGlvbiwgZGVmaW5pdGlvbnMpO1xuICBjaHVua3MuYWZ0ZXIgPSBleHRyYWN0RGVmaW5pdGlvbnMoY2h1bmtzLmFmdGVyLCBkZWZpbml0aW9ucyk7XG4gIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmVnZXgsIGdldExpbmspO1xuXG4gIGlmIChkZWZpbml0aW9uKSB7XG4gICAgaWYgKCFhdHRhY2htZW50KSB7IHB1c2hBbmNob3IoZGVmaW5pdGlvbik7IH1cbiAgfSBlbHNlIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJlZ2V4LCBnZXRMaW5rKTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBhbmNob3I7XG5cbiAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocmVnZXgsIGdldExpbmspO1xuXG4gIGlmIChjaHVua3MuYWZ0ZXIpIHtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZSgvXFxuKiQvLCAnJyk7XG4gIH1cbiAgaWYgKCFjaHVua3MuYWZ0ZXIpIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9cXG4qJC8sICcnKTtcbiAgfVxuXG4gIGFuY2hvciA9IDA7XG4gIE9iamVjdC5rZXlzKGRlZmluaXRpb25zKS5mb3JFYWNoKHB1c2hBdHRhY2htZW50cyk7XG5cbiAgaWYgKGF0dGFjaG1lbnQpIHtcbiAgICBwdXNoQW5jaG9yKGRlZmluaXRpb24pO1xuICB9XG4gIGNodW5rcy5hZnRlciArPSAnXFxuXFxuJyArIGZvb3Rub3Rlcy5qb2luKCdcXG4nKTtcblxuICByZXR1cm4gcmVzdWx0O1xuXG4gIGZ1bmN0aW9uIHB1c2hBdHRhY2htZW50cyAoZGVmaW5pdGlvbikge1xuICAgIGlmIChyYXR0YWNobWVudC50ZXN0KGRlZmluaXRpb24pKSB7XG4gICAgICBwdXNoQW5jaG9yKGRlZmluaXRpb25zW2RlZmluaXRpb25dKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoQW5jaG9yIChkZWZpbml0aW9uKSB7XG4gICAgYW5jaG9yKys7XG4gICAgZGVmaW5pdGlvbiA9IGRlZmluaXRpb24ucmVwbGFjZSgvXlsgXXswLDN9XFxbKGF0dGFjaG1lbnQtKT8oXFxkKylcXF06LywgJyAgWyQxJyArIGFuY2hvciArICddOicpO1xuICAgIGZvb3Rub3Rlcy5wdXNoKGRlZmluaXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGluayAoYWxsLCBiZWZvcmUsIGlubmVyLCBhZnRlcklubmVyLCBkZWZpbml0aW9uLCBlbmQpIHtcbiAgICBpbm5lciA9IGlubmVyLnJlcGxhY2UocmVnZXgsIGdldExpbmspO1xuICAgIGlmIChkZWZpbml0aW9uc1tkZWZpbml0aW9uXSkge1xuICAgICAgcHVzaEFuY2hvcihkZWZpbml0aW9uc1tkZWZpbml0aW9uXSk7XG4gICAgICByZXR1cm4gYmVmb3JlICsgaW5uZXIgKyBhZnRlcklubmVyICsgYW5jaG9yICsgZW5kO1xuICAgIH1cbiAgICByZXR1cm4gYWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxpbmtPckltYWdlT3JBdHRhY2htZW50IChjaHVua3MsIG9wdGlvbnMpIHtcbiAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gIHZhciBpbWFnZSA9IHR5cGUgPT09ICdpbWFnZSc7XG4gIHZhciByZXN1bWU7XG5cbiAgY2h1bmtzLnRyaW0oKTtcbiAgY2h1bmtzLmZpbmRUYWdzKC9cXHMqIT9cXFsvLCAvXFxdWyBdPyg/OlxcblsgXSopPyhcXFsuKj9cXF0pPy8pO1xuXG4gIGlmIChjaHVua3MuZW5kVGFnLmxlbmd0aCA+IDEgJiYgY2h1bmtzLnN0YXJ0VGFnLmxlbmd0aCA+IDApIHtcbiAgICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3Muc3RhcnRUYWcucmVwbGFjZSgvIT9cXFsvLCAnJyk7XG4gICAgY2h1bmtzLmVuZFRhZyA9ICcnO1xuICAgIHB1c2hEZWZpbml0aW9uKGNodW5rcyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zdGFydFRhZyArIGNodW5rcy5zZWxlY3Rpb24gKyBjaHVua3MuZW5kVGFnO1xuICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3MuZW5kVGFnID0gJyc7XG5cbiAgaWYgKC9cXG5cXG4vLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICBwdXNoRGVmaW5pdGlvbihjaHVua3MpO1xuICAgIHJldHVybjtcbiAgfVxuICByZXN1bWUgPSB0aGlzLmFzeW5jKCk7XG5cbiAgb3B0aW9ucy5wcm9tcHRzLmNsb3NlKCk7XG4gIChvcHRpb25zLnByb21wdHNbdHlwZV0gfHwgb3B0aW9ucy5wcm9tcHRzLmxpbmspKG9wdGlvbnMsIG9uY2UocmVzb2x2ZWQpKTtcblxuICBmdW5jdGlvbiByZXNvbHZlZCAocmVzdWx0KSB7XG4gICAgdmFyIGxpbmsgPSBwYXJzZUxpbmtJbnB1dChyZXN1bHQuZGVmaW5pdGlvbik7XG4gICAgaWYgKGxpbmsuaHJlZi5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlc3VtZSgpOyByZXR1cm47XG4gICAgfVxuXG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9ICgnICcgKyBjaHVua3Muc2VsZWN0aW9uKS5yZXBsYWNlKC8oW15cXFxcXSg/OlxcXFxcXFxcKSopKD89W1tcXF1dKS9nLCAnJDFcXFxcJykuc3Vic3RyKDEpO1xuXG4gICAgdmFyIGtleSA9IHJlc3VsdC5hdHRhY2htZW50ID8gJyAgW2F0dGFjaG1lbnQtOTk5OV06ICcgOiAnIFs5OTk5XTogJztcbiAgICB2YXIgZGVmaW5pdGlvbiA9IGtleSArIGxpbmsuaHJlZiArIChsaW5rLnRpdGxlID8gJyBcIicgKyBsaW5rLnRpdGxlICsgJ1wiJyA6ICcnKTtcbiAgICB2YXIgYW5jaG9yID0gcHVzaERlZmluaXRpb24oY2h1bmtzLCBkZWZpbml0aW9uLCByZXN1bHQuYXR0YWNobWVudCk7XG5cbiAgICBpZiAoIXJlc3VsdC5hdHRhY2htZW50KSB7XG4gICAgICBhZGQoKTtcbiAgICB9XG5cbiAgICByZXN1bWUoKTtcblxuICAgIGZ1bmN0aW9uIGFkZCAoKSB7XG4gICAgICBjaHVua3Muc3RhcnRUYWcgPSBpbWFnZSA/ICchWycgOiAnWyc7XG4gICAgICBjaHVua3MuZW5kVGFnID0gJ11bJyArIGFuY2hvciArICddJztcblxuICAgICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVyc1t0eXBlXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaW5rT3JJbWFnZU9yQXR0YWNobWVudDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hbnkgPSByZXF1aXJlKCcuLi9tYW55Jyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcbnZhciBzZXR0aW5ncyA9IHJlcXVpcmUoJy4vc2V0dGluZ3MnKTtcbnZhciBycHJldmlvdXMgPSAvKFxcbnxeKSgoWyBdezAsM30oWyorLV18XFxkK1suXSlbIFxcdF0rLiopKFxcbi4rfFxcbnsyLH0oWyorLV0uKnxcXGQrWy5dKVsgXFx0XSsuKnxcXG57Mix9WyBcXHRdK1xcUy4qKSopXFxuKiQvO1xudmFyIHJuZXh0ID0gL15cXG4qKChbIF17MCwzfShbKistXXxcXGQrWy5dKVsgXFx0XSsuKikoXFxuLit8XFxuezIsfShbKistXS4qfFxcZCtbLl0pWyBcXHRdKy4qfFxcbnsyLH1bIFxcdF0rXFxTLiopKilcXG4qLztcbnZhciByYnVsbGV0dHlwZSA9IC9eXFxzKihbKistXSkvO1xudmFyIHJza2lwcGVyID0gL1teXFxuXVxcblxcblteXFxuXS87XG5cbmZ1bmN0aW9uIHBhZCAodGV4dCkge1xuICByZXR1cm4gJyAnICsgdGV4dCArICcgJztcbn1cblxuZnVuY3Rpb24gbGlzdCAoY2h1bmtzLCBvcmRlcmVkKSB7XG4gIHZhciBidWxsZXQgPSAnLSc7XG4gIHZhciBudW0gPSAxO1xuICB2YXIgZGlnaXRhbDtcbiAgdmFyIGJlZm9yZVNraXAgPSAxO1xuICB2YXIgYWZ0ZXJTa2lwID0gMTtcblxuICBjaHVua3MuZmluZFRhZ3MoLyhcXG58XikqWyBdezAsM30oWyorLV18XFxkK1suXSlcXHMrLywgbnVsbCk7XG5cbiAgaWYgKGNodW5rcy5iZWZvcmUgJiYgIS9cXG4kLy50ZXN0KGNodW5rcy5iZWZvcmUpICYmICEvXlxcbi8udGVzdChjaHVua3Muc3RhcnRUYWcpKSB7XG4gICAgY2h1bmtzLmJlZm9yZSArPSBjaHVua3Muc3RhcnRUYWc7XG4gICAgY2h1bmtzLnN0YXJ0VGFnID0gJyc7XG4gIH1cblxuICBpZiAoY2h1bmtzLnN0YXJ0VGFnKSB7XG4gICAgZGlnaXRhbCA9IC9cXGQrWy5dLy50ZXN0KGNodW5rcy5zdGFydFRhZyk7XG4gICAgY2h1bmtzLnN0YXJ0VGFnID0gJyc7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXFxuWyBdezR9L2csICdcXG4nKTtcbiAgICB3cmFwcGluZy51bndyYXAoY2h1bmtzKTtcbiAgICBjaHVua3Muc2tpcCgpO1xuXG4gICAgaWYgKGRpZ2l0YWwpIHtcbiAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJuZXh0LCBnZXRQcmVmaXhlZEl0ZW0pO1xuICAgIH1cbiAgICBpZiAob3JkZXJlZCA9PT0gZGlnaXRhbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocnByZXZpb3VzLCBiZWZvcmVSZXBsYWNlcik7XG5cbiAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmxpc3RpdGVtO1xuICB9XG5cbiAgdmFyIHByZWZpeCA9IG5leHRCdWxsZXQoKTtcbiAgdmFyIHNwYWNlcyA9IG1hbnkoJyAnLCBwcmVmaXgubGVuZ3RoKTtcblxuICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShybmV4dCwgYWZ0ZXJSZXBsYWNlcik7XG4gIGNodW5rcy50cmltKHRydWUpO1xuICBjaHVua3Muc2tpcCh7IGJlZm9yZTogYmVmb3JlU2tpcCwgYWZ0ZXI6IGFmdGVyU2tpcCwgYW55OiB0cnVlIH0pO1xuICBjaHVua3Muc3RhcnRUYWcgPSBwcmVmaXg7XG4gIHdyYXBwaW5nLndyYXAoY2h1bmtzLCBzZXR0aW5ncy5saW5lTGVuZ3RoIC0gcHJlZml4Lmxlbmd0aCk7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL1xcbi9nLCAnXFxuJyArIHNwYWNlcyk7XG5cbiAgZnVuY3Rpb24gYmVmb3JlUmVwbGFjZXIgKHRleHQpIHtcbiAgICBpZiAocmJ1bGxldHR5cGUudGVzdCh0ZXh0KSkge1xuICAgICAgYnVsbGV0ID0gUmVnRXhwLiQxO1xuICAgIH1cbiAgICBiZWZvcmVTa2lwID0gcnNraXBwZXIudGVzdCh0ZXh0KSA/IDEgOiAwO1xuICAgIHJldHVybiBnZXRQcmVmaXhlZEl0ZW0odGV4dCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZnRlclJlcGxhY2VyICh0ZXh0KSB7XG4gICAgYWZ0ZXJTa2lwID0gcnNraXBwZXIudGVzdCh0ZXh0KSA/IDEgOiAwO1xuICAgIHJldHVybiBnZXRQcmVmaXhlZEl0ZW0odGV4dCk7XG4gIH1cblxuICBmdW5jdGlvbiBuZXh0QnVsbGV0ICgpIHtcbiAgICBpZiAob3JkZXJlZCkge1xuICAgICAgcmV0dXJuIHBhZCgobnVtKyspICsgJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhZChidWxsZXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UHJlZml4ZWRJdGVtICh0ZXh0KSB7XG4gICAgdmFyIHJtYXJrZXJzID0gL15bIF17MCwzfShbKistXXxcXGQrWy5dKVxccy9nbTtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHJtYXJrZXJzLCBuZXh0QnVsbGV0KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsaW5lTGVuZ3RoOiA3MlxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHByZWZpeGVzID0gJyg/OlxcXFxzezQsfXxcXFxccyo+fFxcXFxzKi1cXFxccyt8XFxcXHMqXFxcXGQrXFxcXC58PXxcXFxcK3wtfF98XFxcXCp8I3xcXFxccypcXFxcW1teXFxuXV0rXFxcXF06KSc7XG52YXIgcmxlYWRpbmdwcmVmaXhlcyA9IG5ldyBSZWdFeHAoJ14nICsgcHJlZml4ZXMsICcnKTtcbnZhciBydGV4dCA9IG5ldyBSZWdFeHAoJyhbXlxcXFxuXSlcXFxcbig/IShcXFxcbnwnICsgcHJlZml4ZXMgKyAnKSknLCAnZycpO1xudmFyIHJ0cmFpbGluZ3NwYWNlcyA9IC9cXHMrJC87XG5cbmZ1bmN0aW9uIHdyYXAgKGNodW5rcywgbGVuKSB7XG4gIHZhciByZWdleCA9IG5ldyBSZWdFeHAoJyguezEsJyArIGxlbiArICd9KSggK3wkXFxcXG4/KScsICdnbScpO1xuXG4gIHVud3JhcChjaHVua3MpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvblxuICAgIC5yZXBsYWNlKHJlZ2V4LCByZXBsYWNlcilcbiAgICAucmVwbGFjZShydHJhaWxpbmdzcGFjZXMsICcnKTtcblxuICBmdW5jdGlvbiByZXBsYWNlciAobGluZSwgbWFya2VkKSB7XG4gICAgcmV0dXJuIHJsZWFkaW5ncHJlZml4ZXMudGVzdChsaW5lKSA/IGxpbmUgOiBtYXJrZWQgKyAnXFxuJztcbiAgfVxufVxuXG5mdW5jdGlvbiB1bndyYXAgKGNodW5rcykge1xuICBydGV4dC5sYXN0SW5kZXggPSAwO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJ0ZXh0LCAnJDEgJDInKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHdyYXA6IHdyYXAsXG4gIHVud3JhcDogdW53cmFwXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbmNlIChmbikge1xuICB2YXIgZGlzcG9zZWQ7XG4gIHJldHVybiBmdW5jdGlvbiBkaXNwb3NhYmxlICgpIHtcbiAgICBpZiAoZGlzcG9zZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9uY2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBkb2N1bWVudDtcblxuZnVuY3Rpb24gaG9tZWJyZXdRU0EgKGNsYXNzTmFtZSkge1xuICB2YXIgcmVzdWx0cyA9IFtdO1xuICB2YXIgYWxsID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7XG4gIHZhciBpO1xuICBmb3IgKGkgaW4gYWxsKSB7XG4gICAgaWYgKHdyYXAoYWxsW2ldLmNsYXNzTmFtZSkuaW5kZXhPZih3cmFwKGNsYXNzTmFtZSkpICE9PSAtMSkge1xuICAgICAgcmVzdWx0cy5wdXNoKGFsbFtpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiB3cmFwICh0ZXh0KSB7XG4gIHJldHVybiAnICcgKyB0ZXh0ICsgJyAnO1xufVxuXG5mdW5jdGlvbiBjbG9zZVByb21wdHMgKCkge1xuICBpZiAoZG9jLmJvZHkucXVlcnlTZWxlY3RvckFsbCkge1xuICAgIHJlbW92ZShkb2MuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCcud2stcHJvbXB0JykpO1xuICB9IGVsc2Uge1xuICAgIHJlbW92ZShob21lYnJld1FTQSgnd2stcHJvbXB0JykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAocHJvbXB0cykge1xuICB2YXIgbGVuID0gcHJvbXB0cy5sZW5ndGg7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBwcm9tcHRzW2ldLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQocHJvbXB0c1tpXSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9zZVByb21wdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciByZW5kZXIgPSByZXF1aXJlKCcuL3JlbmRlcicpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuLi9jbGFzc2VzJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB1cGxvYWRzID0gcmVxdWlyZSgnLi4vdXBsb2FkcycpO1xudmFyIEVOVEVSX0tFWSA9IDEzO1xudmFyIEVTQ0FQRV9LRVkgPSAyNztcbnZhciBkcmFnQ2xhc3MgPSAnd2stZHJhZ2dpbmcnO1xudmFyIGRyYWdDbGFzc1NwZWNpZmljID0gJ3drLXByb21wdC11cGxvYWQtZHJhZ2dpbmcnO1xudmFyIHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGFsd2F5cyAoKSB7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjbGFzc2lmeSAoZ3JvdXAsIGNsYXNzZXMpIHtcbiAgT2JqZWN0LmtleXMoZ3JvdXApLmZvckVhY2goY3VzdG9taXplKTtcbiAgZnVuY3Rpb24gY3VzdG9taXplIChrZXkpIHtcbiAgICBpZiAoY2xhc3Nlc1trZXldKSB7XG4gICAgICBncm91cFtrZXldLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc2VzW2tleV07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHByb21wdCAob3B0aW9ucywgZG9uZSkge1xuICB2YXIgdGV4dCA9IHN0cmluZ3MucHJvbXB0c1tvcHRpb25zLnR5cGVdO1xuICB2YXIgZG9tID0gcmVuZGVyKHtcbiAgICBpZDogJ3drLXByb21wdC0nICsgb3B0aW9ucy50eXBlLFxuICAgIHRpdGxlOiB0ZXh0LnRpdGxlLFxuICAgIGRlc2NyaXB0aW9uOiB0ZXh0LmRlc2NyaXB0aW9uLFxuICAgIHBsYWNlaG9sZGVyOiB0ZXh0LnBsYWNlaG9sZGVyXG4gIH0pO1xuICB2YXIgZG9tdXA7XG5cbiAgY3Jvc3N2ZW50LmFkZChkb20uY2FuY2VsLCAnY2xpY2snLCByZW1vdmUpO1xuICBjcm9zc3ZlbnQuYWRkKGRvbS5jbG9zZSwgJ2NsaWNrJywgcmVtb3ZlKTtcbiAgY3Jvc3N2ZW50LmFkZChkb20ub2ssICdjbGljaycsIG9rKTtcbiAgY3Jvc3N2ZW50LmFkZChkb20uaW5wdXQsICdrZXlwcmVzcycsIGVudGVyKTtcbiAgY3Jvc3N2ZW50LmFkZChkb20uZGlhbG9nLCAna2V5ZG93bicsIGVzYyk7XG4gIGNsYXNzaWZ5KGRvbSwgb3B0aW9ucy5jbGFzc2VzLnByb21wdHMpO1xuXG4gIHZhciB4aHIgPSBvcHRpb25zLnhocjtcbiAgdmFyIHVwbG9hZCA9IG9wdGlvbnMudXBsb2FkO1xuICBpZiAodHlwZW9mIHVwbG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICB1cGxvYWQgPSB7IHVybDogdXBsb2FkIH07XG4gIH1cbiAgaWYgKHVwbG9hZCkge1xuICAgIGFycmFuZ2VVcGxvYWRzKCk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuYXV0b1VwbG9hZCkge1xuICAgIHN1Ym1pdChvcHRpb25zLmF1dG9VcGxvYWQpO1xuICB9XG5cbiAgc2V0VGltZW91dChmb2N1c0RpYWxvZywgMCk7XG5cbiAgZnVuY3Rpb24gZm9jdXNEaWFsb2cgKCkge1xuICAgIGRvbS5pbnB1dC5mb2N1cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZW50ZXIgKGUpIHtcbiAgICB2YXIga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYgKGtleSA9PT0gRU5URVJfS0VZKSB7XG4gICAgICBvaygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVzYyAoZSkge1xuICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAoa2V5ID09PSBFU0NBUEVfS0VZKSB7XG4gICAgICByZW1vdmUoKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvayAoKSB7XG4gICAgcmVtb3ZlKCk7XG4gICAgZG9uZSh7IGRlZmluaXRpb246IGRvbS5pbnB1dC52YWx1ZSB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZSAoKSB7XG4gICAgaWYgKHVwbG9hZCkgeyBiaW5kVXBsb2FkRXZlbnRzKHRydWUpOyB9XG4gICAgaWYgKGRvbS5kaWFsb2cucGFyZW50RWxlbWVudCkgeyBkb20uZGlhbG9nLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tLmRpYWxvZyk7IH1cbiAgICBvcHRpb25zLnN1cmZhY2UuZm9jdXMob3B0aW9ucy5tb2RlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmRVcGxvYWRFdmVudHMgKHJlbW92ZSkge1xuICAgIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gICAgY3Jvc3N2ZW50W29wXShyb290LCAnZHJhZ2VudGVyJywgZHJhZ2dpbmcpO1xuICAgIGNyb3NzdmVudFtvcF0ocm9vdCwgJ2RyYWdlbmQnLCBkcmFnc3RvcCk7XG4gICAgY3Jvc3N2ZW50W29wXShyb290LCAnbW91c2VvdXQnLCBkcmFnc3RvcCk7XG4gIH1cblxuICBmdW5jdGlvbiB3YXJuICgpIHtcbiAgICBjbGFzc2VzLmFkZChkb211cC53YXJuaW5nLCAnd2stcHJvbXB0LWVycm9yLXNob3cnKTtcbiAgfVxuICBmdW5jdGlvbiBkcmFnZ2luZyAoKSB7XG4gICAgY2xhc3Nlcy5hZGQoZG9tdXAuYXJlYSwgZHJhZ0NsYXNzKTtcbiAgICBjbGFzc2VzLmFkZChkb211cC5hcmVhLCBkcmFnQ2xhc3NTcGVjaWZpYyk7XG4gIH1cbiAgZnVuY3Rpb24gZHJhZ3N0b3AgKCkge1xuICAgIGNsYXNzZXMucm0oZG9tdXAuYXJlYSwgZHJhZ0NsYXNzKTtcbiAgICBjbGFzc2VzLnJtKGRvbXVwLmFyZWEsIGRyYWdDbGFzc1NwZWNpZmljKTtcbiAgICB1cGxvYWRzLnN0b3Aob3B0aW9ucy5zdXJmYWNlLmRyb3BhcmVhKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFycmFuZ2VVcGxvYWRzICgpIHtcbiAgICBkb211cCA9IHJlbmRlci51cGxvYWRzKGRvbSwgc3RyaW5ncy5wcm9tcHRzLnR5cGVzICsgKHVwbG9hZC5yZXN0cmljdGlvbiB8fCBvcHRpb25zLnR5cGUgKyAncycpKTtcbiAgICBiaW5kVXBsb2FkRXZlbnRzKCk7XG5cbiAgICBjcm9zc3ZlbnQuYWRkKGRvbXVwLmZpbGVpbnB1dCwgJ2NoYW5nZScsIGhhbmRsZUNoYW5nZSwgZmFsc2UpO1xuICAgIGNyb3NzdmVudC5hZGQoZG9tdXAuYXJlYSwgJ2RyYWdvdmVyJywgaGFuZGxlRHJhZ092ZXIsIGZhbHNlKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGRvbXVwLmFyZWEsICdkcm9wJywgaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuICAgIGNsYXNzaWZ5KGRvbXVwLCBvcHRpb25zLmNsYXNzZXMucHJvbXB0cyk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UgKGUpIHtcbiAgICBzdG9wKGUpO1xuICAgIHN1Ym1pdChkb211cC5maWxlaW5wdXQuZmlsZXMpO1xuICAgIGRvbXVwLmZpbGVpbnB1dC52YWx1ZSA9ICcnO1xuICAgIGRvbXVwLmZpbGVpbnB1dC52YWx1ZSA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVEcmFnT3ZlciAoZSkge1xuICAgIHN0b3AoZSk7XG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUZpbGVTZWxlY3QgKGUpIHtcbiAgICBkcmFnc3RvcCgpO1xuICAgIHN0b3AoZSk7XG4gICAgc3VibWl0KGUuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AgKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkIChmaWxlcykge1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCh1cGxvYWQudmFsaWRhdGUgfHwgYWx3YXlzKShmaWxlc1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICB3YXJuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzdWJtaXQgKGZpbGVzKSB7XG4gICAgY2xhc3Nlcy5ybShkb211cC5mYWlsZWQsICd3ay1wcm9tcHQtZXJyb3Itc2hvdycpO1xuICAgIGNsYXNzZXMucm0oZG9tdXAud2FybmluZywgJ3drLXByb21wdC1lcnJvci1zaG93Jyk7XG4gICAgdmFyIGZpbGUgPSB2YWxpZChmaWxlcyk7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgdmFyIHJlcSA9IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiB1cGxvYWQubWV0aG9kIHx8ICdQVVQnLFxuICAgICAgdXJsOiB1cGxvYWQudXJsLFxuICAgICAgYm9keTogZm9ybVxuICAgIH07XG5cbiAgICBmb3JtLmFwcGVuZCh1cGxvYWQua2V5IHx8ICd3b29mbWFya191cGxvYWQnLCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgIGNsYXNzZXMuYWRkKGRvbXVwLmFyZWEsICd3ay1wcm9tcHQtdXBsb2FkaW5nJyk7XG4gICAgeGhyKHJlcSwgaGFuZGxlUmVzcG9uc2UpO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2UgKGVyciwgcmVzLCBib2R5KSB7XG4gICAgICBjbGFzc2VzLnJtKGRvbXVwLmFyZWEsICd3ay1wcm9tcHQtdXBsb2FkaW5nJyk7XG4gICAgICBpZiAoZXJyIHx8IHJlcy5zdGF0dXNDb2RlIDwgMjAwIHx8IHJlcy5zdGF0dXNDb2RlID4gMjk5KSB7XG4gICAgICAgIGNsYXNzZXMuYWRkKGRvbXVwLmZhaWxlZCwgJ3drLXByb21wdC1lcnJvci1zaG93Jyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRvbS5pbnB1dC52YWx1ZSA9IGJvZHkuaHJlZiArICcgXCInICsgYm9keS50aXRsZSArICdcIic7XG4gICAgICByZW1vdmUoKTtcbiAgICAgIGRvbmUoeyBkZWZpbml0aW9uOiBkb20uaW5wdXQudmFsdWUsIGF0dGFjaG1lbnQ6IG9wdGlvbnMudHlwZSA9PT0gJ2F0dGFjaG1lbnQnIH0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb21wdDtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGdldFRleHQgPSByZXF1aXJlKCcuLi9nZXRUZXh0Jyk7XG52YXIgc2V0VGV4dCA9IHJlcXVpcmUoJy4uL3NldFRleHQnKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi4vY2xhc3NlcycpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgYWMgPSAnYXBwZW5kQ2hpbGQnO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcblxuZnVuY3Rpb24gZSAodHlwZSwgY2xzLCB0ZXh0KSB7XG4gIHZhciBlbCA9IGRvYy5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBlbC5jbGFzc05hbWUgPSBjbHM7XG4gIGlmICh0ZXh0KSB7XG4gICAgc2V0VGV4dChlbCwgdGV4dCk7XG4gIH1cbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiByZW5kZXIgKG9wdGlvbnMpIHtcbiAgdmFyIGRvbSA9IHtcbiAgICBkaWFsb2c6IGUoJ2FydGljbGUnLCAnd2stcHJvbXB0ICcgKyBvcHRpb25zLmlkKSxcbiAgICBjbG9zZTogZSgnYScsICd3ay1wcm9tcHQtY2xvc2UnKSxcbiAgICBoZWFkZXI6IGUoJ2hlYWRlcicsICd3ay1wcm9tcHQtaGVhZGVyJyksXG4gICAgaDE6IGUoJ2gxJywgJ3drLXByb21wdC10aXRsZScsIG9wdGlvbnMudGl0bGUpLFxuICAgIHNlY3Rpb246IGUoJ3NlY3Rpb24nLCAnd2stcHJvbXB0LWJvZHknKSxcbiAgICBkZXNjOiBlKCdwJywgJ3drLXByb21wdC1kZXNjcmlwdGlvbicsIG9wdGlvbnMuZGVzY3JpcHRpb24pLFxuICAgIGlucHV0Q29udGFpbmVyOiBlKCdkaXYnLCAnd2stcHJvbXB0LWlucHV0LWNvbnRhaW5lcicpLFxuICAgIGlucHV0OiBlKCdpbnB1dCcsICd3ay1wcm9tcHQtaW5wdXQnKSxcbiAgICBjYW5jZWw6IGUoJ2J1dHRvbicsICd3ay1wcm9tcHQtY2FuY2VsJywgJ0NhbmNlbCcpLFxuICAgIG9rOiBlKCdidXR0b24nLCAnd2stcHJvbXB0LW9rJywgJ09rJyksXG4gICAgZm9vdGVyOiBlKCdmb290ZXInLCAnd2stcHJvbXB0LWJ1dHRvbnMnKVxuICB9O1xuICBkb20ub2sudHlwZSA9ICdidXR0b24nO1xuICBkb20uaGVhZGVyW2FjXShkb20uaDEpO1xuICBkb20uc2VjdGlvblthY10oZG9tLmRlc2MpO1xuICBkb20uc2VjdGlvblthY10oZG9tLmlucHV0Q29udGFpbmVyKTtcbiAgZG9tLmlucHV0Q29udGFpbmVyW2FjXShkb20uaW5wdXQpO1xuICBkb20uaW5wdXQucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyO1xuICBkb20uY2FuY2VsLnR5cGUgPSAnYnV0dG9uJztcbiAgZG9tLmZvb3RlclthY10oZG9tLmNhbmNlbCk7XG4gIGRvbS5mb290ZXJbYWNdKGRvbS5vayk7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5jbG9zZSk7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5oZWFkZXIpO1xuICBkb20uZGlhbG9nW2FjXShkb20uc2VjdGlvbik7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5mb290ZXIpO1xuICBkb2MuYm9keVthY10oZG9tLmRpYWxvZyk7XG4gIHJldHVybiBkb207XG59XG5cbmZ1bmN0aW9uIHVwbG9hZHMgKGRvbSwgd2FybmluZykge1xuICB2YXIgZnVwID0gJ3drLXByb21wdC1maWxldXBsb2FkJztcbiAgdmFyIGRvbXVwID0ge1xuICAgIGFyZWE6IGUoJ3NlY3Rpb24nLCAnd2stcHJvbXB0LXVwbG9hZC1hcmVhJyksXG4gICAgd2FybmluZzogZSgncCcsICd3ay1wcm9tcHQtZXJyb3Igd2std2FybmluZycsIHdhcm5pbmcpLFxuICAgIGZhaWxlZDogZSgncCcsICd3ay1wcm9tcHQtZXJyb3Igd2stZmFpbGVkJywgc3RyaW5ncy5wcm9tcHRzLnVwbG9hZGZhaWxlZCksXG4gICAgdXBsb2FkOiBlKCdsYWJlbCcsICd3ay1wcm9tcHQtdXBsb2FkJyksXG4gICAgdXBsb2FkaW5nOiBlKCdzcGFuJywgJ3drLXByb21wdC1wcm9ncmVzcycsIHN0cmluZ3MucHJvbXB0cy51cGxvYWRpbmcpLFxuICAgIGRyb3A6IGUoJ3NwYW4nLCAnd2stcHJvbXB0LWRyb3AnLCBzdHJpbmdzLnByb21wdHMuZHJvcCksXG4gICAgZHJvcGljb246IGUoJ3AnLCAnd2stZHJvcC1pY29uIHdrLXByb21wdC1kcm9wLWljb24nKSxcbiAgICBicm93c2U6IGUoJ3NwYW4nLCAnd2stcHJvbXB0LWJyb3dzZScsIHN0cmluZ3MucHJvbXB0cy5icm93c2UpLFxuICAgIGRyYWdkcm9wOiBlKCdwJywgJ3drLXByb21wdC1kcmFnZHJvcCcsIHN0cmluZ3MucHJvbXB0cy5kcm9waGludCksXG4gICAgZmlsZWlucHV0OiBlKCdpbnB1dCcsIGZ1cClcbiAgfTtcbiAgZG9tdXAuYXJlYVthY10oZG9tdXAuZHJvcCk7XG4gIGRvbXVwLmFyZWFbYWNdKGRvbXVwLnVwbG9hZGluZyk7XG4gIGRvbXVwLmFyZWFbYWNdKGRvbXVwLmRyb3BpY29uKTtcbiAgZG9tdXAudXBsb2FkW2FjXShkb211cC5icm93c2UpO1xuICBkb211cC51cGxvYWRbYWNdKGRvbXVwLmZpbGVpbnB1dCk7XG4gIGRvbXVwLmZpbGVpbnB1dC5pZCA9IGZ1cDtcbiAgZG9tdXAuZmlsZWlucHV0LnR5cGUgPSAnZmlsZSc7XG4gIGRvbS5kaWFsb2cuY2xhc3NOYW1lICs9ICcgd2stcHJvbXB0LXVwbG9hZHMnO1xuICBkb20uaW5wdXRDb250YWluZXIuY2xhc3NOYW1lICs9ICcgd2stcHJvbXB0LWlucHV0LWNvbnRhaW5lci11cGxvYWRzJztcbiAgZG9tLmlucHV0LmNsYXNzTmFtZSArPSAnIHdrLXByb21wdC1pbnB1dC11cGxvYWRzJztcbiAgZG9tLnNlY3Rpb24uaW5zZXJ0QmVmb3JlKGRvbXVwLndhcm5pbmcsIGRvbS5pbnB1dENvbnRhaW5lcik7XG4gIGRvbS5zZWN0aW9uLmluc2VydEJlZm9yZShkb211cC5mYWlsZWQsIGRvbS5pbnB1dENvbnRhaW5lcik7XG4gIGRvbS5zZWN0aW9uW2FjXShkb211cC51cGxvYWQpO1xuICBkb20uc2VjdGlvblthY10oZG9tdXAuZHJhZ2Ryb3ApO1xuICBkb20uc2VjdGlvblthY10oZG9tdXAuYXJlYSk7XG4gIHNldFRleHQoZG9tLmRlc2MsIGdldFRleHQoZG9tLmRlc2MpICsgc3RyaW5ncy5wcm9tcHRzLnVwbG9hZCk7XG4gIGNyb3NzdmVudC5hZGQoZG9tdXAuZmlsZWlucHV0LCAnZm9jdXMnLCBmb2N1c2VkRmlsZUlucHV0KTtcbiAgY3Jvc3N2ZW50LmFkZChkb211cC5maWxlaW5wdXQsICdibHVyJywgYmx1cnJlZEZpbGVJbnB1dCk7XG5cbiAgZnVuY3Rpb24gZm9jdXNlZEZpbGVJbnB1dCAoKSB7XG4gICAgY2xhc3Nlcy5hZGQoZG9tdXAudXBsb2FkLCAnd2stZm9jdXNlZCcpO1xuICB9XG4gIGZ1bmN0aW9uIGJsdXJyZWRGaWxlSW5wdXQgKCkge1xuICAgIGNsYXNzZXMucm0oZG9tdXAudXBsb2FkLCAnd2stZm9jdXNlZCcpO1xuICB9XG4gIHJldHVybiBkb211cDtcbn1cblxucmVuZGVyLnVwbG9hZHMgPSB1cGxvYWRzO1xubW9kdWxlLmV4cG9ydHMgPSByZW5kZXI7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OXdjbTl0Y0hSekwzSmxibVJsY2k1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnWTNKdmMzTjJaVzUwSUQwZ2NtVnhkV2x5WlNnblkzSnZjM04yWlc1MEp5azdYRzUyWVhJZ1oyVjBWR1Y0ZENBOUlISmxjWFZwY21Vb0p5NHVMMmRsZEZSbGVIUW5LVHRjYm5aaGNpQnpaWFJVWlhoMElEMGdjbVZ4ZFdseVpTZ25MaTR2YzJWMFZHVjRkQ2NwTzF4dWRtRnlJR05zWVhOelpYTWdQU0J5WlhGMWFYSmxLQ2N1TGk5amJHRnpjMlZ6SnlrN1hHNTJZWElnYzNSeWFXNW5jeUE5SUhKbGNYVnBjbVVvSnk0dUwzTjBjbWx1WjNNbktUdGNiblpoY2lCaFl5QTlJQ2RoY0hCbGJtUkRhR2xzWkNjN1hHNTJZWElnWkc5aklEMGdaMnh2WW1Gc0xtUnZZM1Z0Wlc1ME8xeHVYRzVtZFc1amRHbHZiaUJsSUNoMGVYQmxMQ0JqYkhNc0lIUmxlSFFwSUh0Y2JpQWdkbUZ5SUdWc0lEMGdaRzlqTG1OeVpXRjBaVVZzWlcxbGJuUW9kSGx3WlNrN1hHNGdJR1ZzTG1Oc1lYTnpUbUZ0WlNBOUlHTnNjenRjYmlBZ2FXWWdLSFJsZUhRcElIdGNiaUFnSUNCelpYUlVaWGgwS0dWc0xDQjBaWGgwS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnWld3N1hHNTlYRzVjYm1aMWJtTjBhVzl1SUhKbGJtUmxjaUFvYjNCMGFXOXVjeWtnZTF4dUlDQjJZWElnWkc5dElEMGdlMXh1SUNBZ0lHUnBZV3h2WnpvZ1pTZ25ZWEowYVdOc1pTY3NJQ2QzYXkxd2NtOXRjSFFnSnlBcklHOXdkR2x2Ym5NdWFXUXBMRnh1SUNBZ0lHTnNiM05sT2lCbEtDZGhKeXdnSjNkckxYQnliMjF3ZEMxamJHOXpaU2NwTEZ4dUlDQWdJR2hsWVdSbGNqb2daU2duYUdWaFpHVnlKeXdnSjNkckxYQnliMjF3ZEMxb1pXRmtaWEluS1N4Y2JpQWdJQ0JvTVRvZ1pTZ25hREVuTENBbmQyc3RjSEp2YlhCMExYUnBkR3hsSnl3Z2IzQjBhVzl1Y3k1MGFYUnNaU2tzWEc0Z0lDQWdjMlZqZEdsdmJqb2daU2duYzJWamRHbHZiaWNzSUNkM2F5MXdjbTl0Y0hRdFltOWtlU2NwTEZ4dUlDQWdJR1JsYzJNNklHVW9KM0FuTENBbmQyc3RjSEp2YlhCMExXUmxjMk55YVhCMGFXOXVKeXdnYjNCMGFXOXVjeTVrWlhOamNtbHdkR2x2Ymlrc1hHNGdJQ0FnYVc1d2RYUkRiMjUwWVdsdVpYSTZJR1VvSjJScGRpY3NJQ2QzYXkxd2NtOXRjSFF0YVc1d2RYUXRZMjl1ZEdGcGJtVnlKeWtzWEc0Z0lDQWdhVzV3ZFhRNklHVW9KMmx1Y0hWMEp5d2dKM2RyTFhCeWIyMXdkQzFwYm5CMWRDY3BMRnh1SUNBZ0lHTmhibU5sYkRvZ1pTZ25ZblYwZEc5dUp5d2dKM2RyTFhCeWIyMXdkQzFqWVc1alpXd25MQ0FuUTJGdVkyVnNKeWtzWEc0Z0lDQWdiMnM2SUdVb0oySjFkSFJ2Ymljc0lDZDNheTF3Y205dGNIUXRiMnNuTENBblQyc25LU3hjYmlBZ0lDQm1iMjkwWlhJNklHVW9KMlp2YjNSbGNpY3NJQ2QzYXkxd2NtOXRjSFF0WW5WMGRHOXVjeWNwWEc0Z0lIMDdYRzRnSUdSdmJTNXZheTUwZVhCbElEMGdKMkoxZEhSdmJpYzdYRzRnSUdSdmJTNW9aV0ZrWlhKYllXTmRLR1J2YlM1b01TazdYRzRnSUdSdmJTNXpaV04wYVc5dVcyRmpYU2hrYjIwdVpHVnpZeWs3WEc0Z0lHUnZiUzV6WldOMGFXOXVXMkZqWFNoa2IyMHVhVzV3ZFhSRGIyNTBZV2x1WlhJcE8xeHVJQ0JrYjIwdWFXNXdkWFJEYjI1MFlXbHVaWEpiWVdOZEtHUnZiUzVwYm5CMWRDazdYRzRnSUdSdmJTNXBibkIxZEM1d2JHRmpaV2h2YkdSbGNpQTlJRzl3ZEdsdmJuTXVjR3hoWTJWb2IyeGtaWEk3WEc0Z0lHUnZiUzVqWVc1alpXd3VkSGx3WlNBOUlDZGlkWFIwYjI0bk8xeHVJQ0JrYjIwdVptOXZkR1Z5VzJGalhTaGtiMjB1WTJGdVkyVnNLVHRjYmlBZ1pHOXRMbVp2YjNSbGNsdGhZMTBvWkc5dExtOXJLVHRjYmlBZ1pHOXRMbVJwWVd4dloxdGhZMTBvWkc5dExtTnNiM05sS1R0Y2JpQWdaRzl0TG1ScFlXeHZaMXRoWTEwb1pHOXRMbWhsWVdSbGNpazdYRzRnSUdSdmJTNWthV0ZzYjJkYllXTmRLR1J2YlM1elpXTjBhVzl1S1R0Y2JpQWdaRzl0TG1ScFlXeHZaMXRoWTEwb1pHOXRMbVp2YjNSbGNpazdYRzRnSUdSdll5NWliMlI1VzJGalhTaGtiMjB1WkdsaGJHOW5LVHRjYmlBZ2NtVjBkWEp1SUdSdmJUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2RYQnNiMkZrY3lBb1pHOXRMQ0IzWVhKdWFXNW5LU0I3WEc0Z0lIWmhjaUJtZFhBZ1BTQW5kMnN0Y0hKdmJYQjBMV1pwYkdWMWNHeHZZV1FuTzF4dUlDQjJZWElnWkc5dGRYQWdQU0I3WEc0Z0lDQWdZWEpsWVRvZ1pTZ25jMlZqZEdsdmJpY3NJQ2QzYXkxd2NtOXRjSFF0ZFhCc2IyRmtMV0Z5WldFbktTeGNiaUFnSUNCM1lYSnVhVzVuT2lCbEtDZHdKeXdnSjNkckxYQnliMjF3ZEMxbGNuSnZjaUIzYXkxM1lYSnVhVzVuSnl3Z2QyRnlibWx1Wnlrc1hHNGdJQ0FnWm1GcGJHVmtPaUJsS0Nkd0p5d2dKM2RyTFhCeWIyMXdkQzFsY25KdmNpQjNheTFtWVdsc1pXUW5MQ0J6ZEhKcGJtZHpMbkJ5YjIxd2RITXVkWEJzYjJGa1ptRnBiR1ZrS1N4Y2JpQWdJQ0IxY0d4dllXUTZJR1VvSjJ4aFltVnNKeXdnSjNkckxYQnliMjF3ZEMxMWNHeHZZV1FuS1N4Y2JpQWdJQ0IxY0d4dllXUnBibWM2SUdVb0ozTndZVzRuTENBbmQyc3RjSEp2YlhCMExYQnliMmR5WlhOekp5d2djM1J5YVc1bmN5NXdjbTl0Y0hSekxuVndiRzloWkdsdVp5a3NYRzRnSUNBZ1pISnZjRG9nWlNnbmMzQmhiaWNzSUNkM2F5MXdjbTl0Y0hRdFpISnZjQ2NzSUhOMGNtbHVaM011Y0hKdmJYQjBjeTVrY205d0tTeGNiaUFnSUNCa2NtOXdhV052YmpvZ1pTZ25jQ2NzSUNkM2F5MWtjbTl3TFdsamIyNGdkMnN0Y0hKdmJYQjBMV1J5YjNBdGFXTnZiaWNwTEZ4dUlDQWdJR0p5YjNkelpUb2daU2duYzNCaGJpY3NJQ2QzYXkxd2NtOXRjSFF0WW5KdmQzTmxKeXdnYzNSeWFXNW5jeTV3Y205dGNIUnpMbUp5YjNkelpTa3NYRzRnSUNBZ1pISmhaMlJ5YjNBNklHVW9KM0FuTENBbmQyc3RjSEp2YlhCMExXUnlZV2RrY205d0p5d2djM1J5YVc1bmN5NXdjbTl0Y0hSekxtUnliM0JvYVc1MEtTeGNiaUFnSUNCbWFXeGxhVzV3ZFhRNklHVW9KMmx1Y0hWMEp5d2dablZ3S1Z4dUlDQjlPMXh1SUNCa2IyMTFjQzVoY21WaFcyRmpYU2hrYjIxMWNDNWtjbTl3S1R0Y2JpQWdaRzl0ZFhBdVlYSmxZVnRoWTEwb1pHOXRkWEF1ZFhCc2IyRmthVzVuS1R0Y2JpQWdaRzl0ZFhBdVlYSmxZVnRoWTEwb1pHOXRkWEF1WkhKdmNHbGpiMjRwTzF4dUlDQmtiMjExY0M1MWNHeHZZV1JiWVdOZEtHUnZiWFZ3TG1KeWIzZHpaU2s3WEc0Z0lHUnZiWFZ3TG5Wd2JHOWhaRnRoWTEwb1pHOXRkWEF1Wm1sc1pXbHVjSFYwS1R0Y2JpQWdaRzl0ZFhBdVptbHNaV2x1Y0hWMExtbGtJRDBnWm5Wd08xeHVJQ0JrYjIxMWNDNW1hV3hsYVc1d2RYUXVkSGx3WlNBOUlDZG1hV3hsSnp0Y2JpQWdaRzl0TG1ScFlXeHZaeTVqYkdGemMwNWhiV1VnS3owZ0p5QjNheTF3Y205dGNIUXRkWEJzYjJGa2N5YzdYRzRnSUdSdmJTNXBibkIxZEVOdmJuUmhhVzVsY2k1amJHRnpjMDVoYldVZ0t6MGdKeUIzYXkxd2NtOXRjSFF0YVc1d2RYUXRZMjl1ZEdGcGJtVnlMWFZ3Ykc5aFpITW5PMXh1SUNCa2IyMHVhVzV3ZFhRdVkyeGhjM05PWVcxbElDczlJQ2NnZDJzdGNISnZiWEIwTFdsdWNIVjBMWFZ3Ykc5aFpITW5PMXh1SUNCa2IyMHVjMlZqZEdsdmJpNXBibk5sY25SQ1pXWnZjbVVvWkc5dGRYQXVkMkZ5Ym1sdVp5d2daRzl0TG1sdWNIVjBRMjl1ZEdGcGJtVnlLVHRjYmlBZ1pHOXRMbk5sWTNScGIyNHVhVzV6WlhKMFFtVm1iM0psS0dSdmJYVndMbVpoYVd4bFpDd2daRzl0TG1sdWNIVjBRMjl1ZEdGcGJtVnlLVHRjYmlBZ1pHOXRMbk5sWTNScGIyNWJZV05kS0dSdmJYVndMblZ3Ykc5aFpDazdYRzRnSUdSdmJTNXpaV04wYVc5dVcyRmpYU2hrYjIxMWNDNWtjbUZuWkhKdmNDazdYRzRnSUdSdmJTNXpaV04wYVc5dVcyRmpYU2hrYjIxMWNDNWhjbVZoS1R0Y2JpQWdjMlYwVkdWNGRDaGtiMjB1WkdWell5d2daMlYwVkdWNGRDaGtiMjB1WkdWell5a2dLeUJ6ZEhKcGJtZHpMbkJ5YjIxd2RITXVkWEJzYjJGa0tUdGNiaUFnWTNKdmMzTjJaVzUwTG1Ga1pDaGtiMjExY0M1bWFXeGxhVzV3ZFhRc0lDZG1iMk4xY3ljc0lHWnZZM1Z6WldSR2FXeGxTVzV3ZFhRcE8xeHVJQ0JqY205emMzWmxiblF1WVdSa0tHUnZiWFZ3TG1acGJHVnBibkIxZEN3Z0oySnNkWEluTENCaWJIVnljbVZrUm1sc1pVbHVjSFYwS1R0Y2JseHVJQ0JtZFc1amRHbHZiaUJtYjJOMWMyVmtSbWxzWlVsdWNIVjBJQ2dwSUh0Y2JpQWdJQ0JqYkdGemMyVnpMbUZrWkNoa2IyMTFjQzUxY0d4dllXUXNJQ2QzYXkxbWIyTjFjMlZrSnlrN1hHNGdJSDFjYmlBZ1puVnVZM1JwYjI0Z1lteDFjbkpsWkVacGJHVkpibkIxZENBb0tTQjdYRzRnSUNBZ1kyeGhjM05sY3k1eWJTaGtiMjExY0M1MWNHeHZZV1FzSUNkM2F5MW1iMk4xYzJWa0p5azdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHUnZiWFZ3TzF4dWZWeHVYRzV5Wlc1a1pYSXVkWEJzYjJGa2N5QTlJSFZ3Ykc5aFpITTdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSEpsYm1SbGNqdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJ1bGxzZXllID0gcmVxdWlyZSgnYnVsbHNleWUnKTtcbnZhciByYW5jaG9yZWQgPSAvXlsjPiotXSQvO1xudmFyIHJib3VuZGFyeSA9IC9eWypfYCMtXSQvO1xudmFyIHJidWxsZXRhZnRlciA9IC9eXFxkK1xcLiAvO1xudmFyIHJidWxsZXRsaW5lID0gL15cXHMqXFxkK1xcLiQvO1xudmFyIHJidWxsZXRsZWZ0ID0gL15cXHMqXFxkKyQvO1xudmFyIHJidWxsZXRyaWdodCA9IC9cXGR8XFwuLztcbnZhciByd2hpdGVzcGFjZSA9IC9eXFxzKiQvO1xudmFyIHJociA9IC9eLS0tKyQvO1xudmFyIHJlbmQgPSAvXiR8XFxzfFxcbi87XG52YXIgcmZvb3Rub3RlZGVjbGFyYXRpb24gPSAvXlxcW1teXFxdXStcXF1cXHMqOlxccypbQS16XFwvXS87XG52YXIgcmZvb3Rub3RlYmVnaW4gPSAvXlxccypcXFtbXlxcXV0qJC87XG52YXIgcmZvb3Rub3RlYmVnYW4gPSAvXlxccypcXFtbXlxcXV0rJC87XG52YXIgcmZvb3Rub3RlbGVmdCA9IC9eXFxzKlxcW1teXFxdXStcXF1cXHMqJC87XG52YXIgcmZvb3Rub3RlYW5jaG9yID0gL15cXHMqXFxbW15cXF1dK1xcXVxccyo6JC87XG52YXIgcmZvb3Rub3RlbGluayA9IC9eXFxzKlxcW1teXFxdXStcXF1cXHMqOlxccypbQS16XFwvXS87XG52YXIgcmZvb3Rub3RlZnVsbCA9IC9eXFxzKlxcW1teXFxdXStcXF1cXHMqOlxccypbQS16XFwvXS4qXFxzKlwiW15cIl0qXCIvO1xudmFyIHJzcGFjZW9ycXVvdGUgPSAvXFxzfFwiLztcbnZhciByc3BhY2VvcmNvbG9uID0gL1xcc3w6LztcbnZhciByZW1wdHkgPSAvXig8cD48XFwvcD4pP1xcbj8kL2k7XG5cbmZ1bmN0aW9uIHJlbWVtYmVyU2VsZWN0aW9uIChoaXN0b3J5KSB7XG4gIHZhciBjb2RlID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxOCkuc3Vic3RyKDIpLnJlcGxhY2UoL1xcZCsvZywgJycpO1xuICB2YXIgb3BlbiA9ICdXb29mbWFya1NlbGVjdGlvbk9wZW5NYXJrZXInICsgY29kZTtcbiAgdmFyIGNsb3NlID0gJ1dvb2ZtYXJrU2VsZWN0aW9uQ2xvc2VNYXJrZXInICsgY29kZTtcbiAgdmFyIHJtYXJrZXJzID0gbmV3IFJlZ0V4cChvcGVuICsgJ3wnICsgY2xvc2UsICdnJyk7XG4gIG1hcmsoKTtcbiAgcmV0dXJuIHVubWFyaztcblxuICBmdW5jdGlvbiBtYXJrICgpIHtcbiAgICB2YXIgc3RhdGUgPSBoaXN0b3J5LnJlc2V0KCkuaW5wdXRTdGF0ZTtcbiAgICB2YXIgY2h1bmtzID0gc3RhdGUuZ2V0Q2h1bmtzKCk7XG4gICAgdmFyIG1vZGUgPSBzdGF0ZS5tb2RlO1xuICAgIHZhciBhbGwgPSBjaHVua3MuYmVmb3JlICsgY2h1bmtzLnNlbGVjdGlvbiArIGNodW5rcy5hZnRlcjtcbiAgICBpZiAocmVtcHR5LnRlc3QoYWxsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobW9kZSA9PT0gJ21hcmtkb3duJykge1xuICAgICAgdXBkYXRlTWFya2Rvd25DaHVua3MoY2h1bmtzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlSFRNTENodW5rcyhjaHVua3MpO1xuICAgIH1cbiAgICBzdGF0ZS5zZXRDaHVua3MoY2h1bmtzKTtcbiAgICBzdGF0ZS5yZXN0b3JlKGZhbHNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVubWFyayAoKSB7XG4gICAgdmFyIHN0YXRlID0gaGlzdG9yeS5pbnB1dFN0YXRlO1xuICAgIHZhciBjaHVua3MgPSBzdGF0ZS5nZXRDaHVua3MoKTtcbiAgICB2YXIgYWxsID0gY2h1bmtzLmJlZm9yZSArIGNodW5rcy5zZWxlY3Rpb24gKyBjaHVua3MuYWZ0ZXI7XG4gICAgdmFyIHN0YXJ0ID0gYWxsLmxhc3RJbmRleE9mKG9wZW4pO1xuICAgIHZhciBlbmQgPSBhbGwubGFzdEluZGV4T2YoY2xvc2UpICsgY2xvc2UubGVuZ3RoO1xuICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IHN0YXJ0ID09PSAtMSA/IDAgOiBzdGFydDtcbiAgICB2YXIgc2VsZWN0aW9uRW5kID0gZW5kID09PSAtMSA/IDAgOiBlbmQ7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGFsbC5zdWJzdHIoMCwgc2VsZWN0aW9uU3RhcnQpLnJlcGxhY2Uocm1hcmtlcnMsICcnKTtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gYWxsLnN1YnN0cihzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kIC0gc2VsZWN0aW9uU3RhcnQpLnJlcGxhY2Uocm1hcmtlcnMsICcnKTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBhbGwuc3Vic3RyKGVuZCkucmVwbGFjZShybWFya2VycywgJycpO1xuICAgIHZhciBlbCA9IGhpc3Rvcnkuc3VyZmFjZS5jdXJyZW50KGhpc3RvcnkuaW5wdXRNb2RlKTtcbiAgICB2YXIgZXllID0gYnVsbHNleWUoZWwsIHtcbiAgICAgIGNhcmV0OiB0cnVlLCBhdXRvdXBkYXRlVG9DYXJldDogZmFsc2UsIHRyYWNraW5nOiBmYWxzZVxuICAgIH0pO1xuICAgIHN0YXRlLnNldENodW5rcyhjaHVua3MpO1xuICAgIHN0YXRlLnJlc3RvcmUoZmFsc2UpO1xuICAgIHN0YXRlLnNjcm9sbFRvcCA9IGVsLnNjcm9sbFRvcCA9IGV5ZS5yZWFkKCkueSAtIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIDUwO1xuICAgIGV5ZS5kZXN0cm95KCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYXJrZG93bkNodW5rcyAoY2h1bmtzKSB7XG4gICAgdmFyIGFsbCA9IGNodW5rcy5iZWZvcmUgKyBjaHVua3Muc2VsZWN0aW9uICsgY2h1bmtzLmFmdGVyO1xuICAgIHZhciBvcmlnaW5hbFN0YXJ0ID0gY2h1bmtzLmJlZm9yZS5sZW5ndGg7XG4gICAgdmFyIG9yaWdpbmFsRW5kID0gb3JpZ2luYWxTdGFydCArIGNodW5rcy5zZWxlY3Rpb24ubGVuZ3RoO1xuICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IG1vdmUob3JpZ2luYWxTdGFydCwgMSk7XG4gICAgdmFyIHNlbGVjdGlvbkVuZCA9IG1vdmUob3JpZ2luYWxFbmQsIC0xKTtcbiAgICB2YXIgbW92ZWQgPSBvcmlnaW5hbFN0YXJ0ICE9PSBzZWxlY3Rpb25TdGFydCB8fCBvcmlnaW5hbEVuZCAhPT0gc2VsZWN0aW9uRW5kO1xuXG4gICAgdXBkYXRlU2VsZWN0aW9uKGNodW5rcywgYWxsLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kLCBtb3ZlZCk7XG5cbiAgICBmdW5jdGlvbiBtb3ZlIChwLCBvZmZzZXQpIHtcbiAgICAgIHZhciBwcmV2ID0gYWxsW3AgLSAxXSB8fCAnJztcbiAgICAgIHZhciBuZXh0ID0gYWxsW3BdIHx8ICcnO1xuICAgICAgdmFyIGxpbmUgPSBiYWNrdHJhY2UocCAtIDEsICdcXG4nKTtcbiAgICAgIHZhciBqdW1wcyA9IHByZXYgPT09ICcnIHx8IHByZXYgPT09ICdcXG4nO1xuXG4gICAgICBpZiAobmV4dCA9PT0gJyAnICYmIChqdW1wcyB8fCBwcmV2ID09PSAnICcpKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2xvc2UgPSBiYWNrdHJhY2UocCAtIDEsICddJyk7XG4gICAgICB2YXIgcmVvcGVuZWQgPSBjbG9zZS5pbmRleE9mKCdbJyk7XG5cbiAgICAgIC8vIHRoZXNlIHR3byBoYW5kbGUgYW5jaG9yZWQgcmVmZXJlbmNlcyAnW2Zvb11bMV0nLCBvciBldmVuICdbYmFyXSAgXFxuIFsyXSdcbiAgICAgIGlmIChyZW9wZW5lZCAhPT0gLTEgJiYgcndoaXRlc3BhY2UudGVzdChjbG9zZS5zdWJzdHIoMCwgcmVvcGVuZWQpKSkge1xuICAgICAgICByZXR1cm4gYWdhaW4oLWNsb3NlLmxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW9wZW5lZCA9IGFsbC5zdWJzdHIocCkuaW5kZXhPZignWycpO1xuICAgICAgICBpZiAocmVvcGVuZWQgIT09IC0xICYmIHJ3aGl0ZXNwYWNlLnRlc3QoYWxsLnN1YnN0cihwLCByZW9wZW5lZCkpKSB7XG4gICAgICAgICAgcmV0dXJuIGFnYWluKC0xKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0aGUgc2V2ZW4gZm9sbG93aW5nIHJ1bGVzIHRvZ2V0aGVyIGhhbmRsZSBmb290bm90ZSByZWZlcmVuY2VzXG4gICAgICBpZiAoKGp1bXBzIHx8IHJ3aGl0ZXNwYWNlLnRlc3QobGluZSkpICYmIHJmb290bm90ZWRlY2xhcmF0aW9uLnRlc3QoYWxsLnN1YnN0cihwKSkpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7IC8vIHN0YXJ0ZWQgd2l0aCAnJywgJ1xcbicsIG9yICcgICcgYW5kIGNvbnRpbnVlZCB3aXRoICdbYS0xXTogaCdcbiAgICAgIH1cbiAgICAgIGlmIChyZm9vdG5vdGViZWdpbi50ZXN0KGxpbmUpICYmIG5leHQgIT09ICddJykge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTsgLy8gc3RhcnRlZCB3aXRoICdbJyBhbmQgY29udGludWVkIHdpdGggJ2EtMSdcbiAgICAgIH1cbiAgICAgIGlmIChyZm9vdG5vdGViZWdhbi50ZXN0KGxpbmUpICYmIG5leHQgPT09ICddJykge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTsgLy8gc3RhcnRlZCB3aXRoICdbYS0xJyBhbmQgY29udGludWVkIHdpdGggJ106IGgnXG4gICAgICB9XG4gICAgICBpZiAocmZvb3Rub3RlbGVmdC50ZXN0KGxpbmUpICYmIHJzcGFjZW9yY29sb24udGVzdChuZXh0KSkge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTsgLy8gc3RhcnRlZCB3aXRoICdbYS0xXSAgJyBhbmQgY29udGludWVkIHdpdGggJzonXG4gICAgICB9XG4gICAgICBpZiAocmZvb3Rub3RlYW5jaG9yLnRlc3QobGluZSkgJiYgbmV4dCA9PT0gJyAnKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpOyAvLyBzdGFydGVkIHdpdGggJ1thLTFdICA6JyBhbmQgY29udGludWVkIHdpdGggJyAnXG4gICAgICB9XG4gICAgICBpZiAocmZvb3Rub3RlbGluay50ZXN0KGxpbmUpICYmIHByZXYgPT09ICcgJyAmJiByc3BhY2VvcnF1b3RlLnRlc3QobmV4dCkgJiYgb2Zmc2V0ID09PSAxKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpOyAvLyBzdGFydGVkIHdpdGggJ1thLTFdICA6JyBhbmQgY29udGludWVkIHdpdGggJyAnLCBvciAnXCInLCBvbiB0aGUgbGVmdFxuICAgICAgfVxuICAgICAgaWYgKHJmb290bm90ZWZ1bGwudGVzdChsaW5lKSAmJiByZW5kLnRlc3QobmV4dCkpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKC0xKTsgLy8gc3RhcnRlZCB3aXRoICdbYS0xXSAgOiBzb21ldGhpbmcgXCJzb21ldGhpbmdcIicgYW5kIGNvbnRpbnVlZCB3aXRoICcnLCAnICcsIG9yICdcXG4nXG4gICAgICB9XG5cbiAgICAgIC8vIHRoZSB0aHJlZSBmb2xsb3dpbmcgcnVsZXMgdG9nZXRoZXIgaGFuZGxlIG9yZGVyZWQgbGlzdCBpdGVtczogJ1xcbjEuIGZvb1xcbjIuIGJhcidcbiAgICAgIGlmICgoanVtcHMgfHwgcndoaXRlc3BhY2UudGVzdChsaW5lKSkgJiYgcmJ1bGxldGFmdGVyLnRlc3QoYWxsLnN1YnN0cihwKSkpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7IC8vIHN0YXJ0ZWQgd2l0aCAnJywgJ1xcbicsIG9yICcgICcgYW5kIGNvbnRpbnVlZCB3aXRoICcxMjMuICdcbiAgICAgIH1cbiAgICAgIGlmIChyYnVsbGV0bGVmdC50ZXN0KGxpbmUpICYmIHJidWxsZXRyaWdodC50ZXN0KG5leHQpKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpOyAvLyBzdGFydGVkIHdpdGggJyAgMTIzJyBhbmQgZW5kZWQgaW4gJzQnIG9yICcuJ1xuICAgICAgfVxuICAgICAgaWYgKHJidWxsZXRsaW5lLnRlc3QobGluZSkgJiYgbmV4dCA9PT0gJyAnKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpOyAvLyBzdGFydGVkIHdpdGggJyAgMTIzLicgYW5kIGVuZGVkIHdpdGggJyAnXG4gICAgICB9XG5cbiAgICAgIGlmIChyYW5jaG9yZWQudGVzdChuZXh0KSAmJiBqdW1wcykge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTtcbiAgICAgIH1cbiAgICAgIGlmIChyYW5jaG9yZWQudGVzdChwcmV2KSAmJiBuZXh0ID09PSAnICcpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7XG4gICAgICB9XG4gICAgICBpZiAobmV4dCA9PT0gcHJldiAmJiByYm91bmRhcnkudGVzdChuZXh0KSkge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTtcbiAgICAgIH1cbiAgICAgIGlmIChyaHIudGVzdChsaW5lKSAmJiBuZXh0ID09PSAnXFxuJykge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTtcbiAgICAgIH1cbiAgICAgIGlmIChhbGwuc3Vic3RyKHAgLSAzLCAzKSA9PT0gJ2BgYCcgJiYgb2Zmc2V0ID09PSAxKSB7IC8vIGhhbmRsZXMgJ2BgYGphdmFzY3JpcHRcXG5jb2RlXFxuYGBgJ1xuICAgICAgICB3aGlsZSAoYWxsW3AgLSAxXSAmJiBhbGxbcCAtIDFdICE9PSAnXFxuJykge1xuICAgICAgICAgIHArKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHA7XG5cbiAgICAgIGZ1bmN0aW9uIGFnYWluIChvdmVycmlkZSkge1xuICAgICAgICB2YXIgZGlmZiA9IG92ZXJyaWRlIHx8IG9mZnNldDtcbiAgICAgICAgcmV0dXJuIG1vdmUocCArIGRpZmYsIGRpZmYgPiAwID8gMSA6IC0xKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGJhY2t0cmFjZSAocCwgZWRnZSkge1xuICAgICAgICB2YXIgbGFzdCA9IGFsbFtwXTtcbiAgICAgICAgdmFyIHRleHQgPSAnJztcbiAgICAgICAgd2hpbGUgKGxhc3QgJiYgbGFzdCAhPT0gZWRnZSkge1xuICAgICAgICAgIHRleHQgPSBsYXN0ICsgdGV4dDtcbiAgICAgICAgICBsYXN0ID0gYWxsWy0tcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlSFRNTENodW5rcyAoY2h1bmtzKSB7XG4gICAgdmFyIGFsbCA9IGNodW5rcy5iZWZvcmUgKyBjaHVua3Muc2VsZWN0aW9uICsgY2h1bmtzLmFmdGVyO1xuICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IGNodW5rcy5iZWZvcmUubGVuZ3RoO1xuICAgIHZhciBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25TdGFydCArIGNodW5rcy5zZWxlY3Rpb24ubGVuZ3RoO1xuICAgIHZhciBsZWZ0Q2xvc2UgPSBjaHVua3MuYmVmb3JlLmxhc3RJbmRleE9mKCc+Jyk7XG4gICAgdmFyIGxlZnRPcGVuID0gY2h1bmtzLmJlZm9yZS5sYXN0SW5kZXhPZignPCcpO1xuICAgIHZhciByaWdodENsb3NlID0gY2h1bmtzLmFmdGVyLmluZGV4T2YoJz4nKTtcbiAgICB2YXIgcmlnaHRPcGVuID0gY2h1bmtzLmFmdGVyLmluZGV4T2YoJzwnKTtcbiAgICB2YXIgcHJldk9wZW47XG4gICAgdmFyIG5leHRDbG9zZTtcbiAgICB2YXIgYmFsYW5jZVRhZ3M7XG5cbiAgICAvLyA8Zm9bb10+YmFyPC9mb28+IGludG8gPGZvbz5bXWJhcjwvZm9vPiwgPGZvW28+YmFdcjwvZm9vPiBpbnRvIDxmb28+W2JhXXI8L2Zvbz5cbiAgICBpZiAobGVmdE9wZW4gPiBsZWZ0Q2xvc2UpIHtcbiAgICAgIG5leHRDbG9zZSA9IGFsbC5pbmRleE9mKCc+JywgbGVmdENsb3NlICsgMSk7XG4gICAgICBpZiAobmV4dENsb3NlICE9PSAtMSkge1xuICAgICAgICBzZWxlY3Rpb25TdGFydCA9IG5leHRDbG9zZSArIDE7XG4gICAgICAgIGJhbGFuY2VUYWdzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA8Zm9vPmJhcjwvW2ZvXW8+IGludG8gPGZvbz5iYXJbXTwvZm9vPiwgPGZvbz5iW2FyPC9mXW9vPiBpbnRvIDxmb28+Ylthcl08L2Zvbz5cbiAgICBpZiAocmlnaHRPcGVuID09PSAtMSB8fCByaWdodE9wZW4gPiByaWdodENsb3NlKSB7XG4gICAgICBwcmV2T3BlbiA9IGFsbC5zdWJzdHIoMCwgY2h1bmtzLmJlZm9yZS5sZW5ndGggKyBjaHVua3Muc2VsZWN0aW9uLmxlbmd0aCArIHJpZ2h0Q2xvc2UpLmxhc3RJbmRleE9mKCc8Jyk7XG4gICAgICBpZiAocHJldk9wZW4gIT09IC0xKSB7XG4gICAgICAgIHNlbGVjdGlvbkVuZCA9IHByZXZPcGVuO1xuICAgICAgICBzZWxlY3Rpb25TdGFydCA9IE1hdGgubWluKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICBiYWxhbmNlVGFncyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0aW9uKGNodW5rcywgYWxsLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kLCBiYWxhbmNlVGFncyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVTZWxlY3Rpb24gKGNodW5rcywgYWxsLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kLCBiYWxhbmNlVGFncykge1xuICAgIGlmIChzZWxlY3Rpb25FbmQgPCBzZWxlY3Rpb25TdGFydCkge1xuICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgfVxuICAgIGlmIChiYWxhbmNlVGFncykge1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGFsbC5zdWJzdHIoMCwgc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGFsbC5zdWJzdHIoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCAtIHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgIGNodW5rcy5hZnRlciA9IGFsbC5zdWJzdHIoc2VsZWN0aW9uRW5kKTtcbiAgICB9XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IG9wZW4gKyBjaHVua3Muc2VsZWN0aW9uICsgY2xvc2U7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZW1lbWJlclNlbGVjdGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNldFRleHQgPSByZXF1aXJlKCcuL3NldFRleHQnKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi9zdHJpbmdzJyk7XG5cbmZ1bmN0aW9uIGNvbW1hbmRzIChlbCwgaWQpIHtcbiAgc2V0VGV4dChlbCwgc3RyaW5ncy5idXR0b25zW2lkXSB8fCBpZCk7XG59XG5cbmZ1bmN0aW9uIG1vZGVzIChlbCwgaWQpIHtcbiAgdmFyIHRleHRzID0ge1xuICAgIG1hcmtkb3duOiAnbVxcdTIxOTMnLFxuICAgIHd5c2l3eWc6ICd3eXNpd3lnJ1xuICB9O1xuICBzZXRUZXh0KGVsLCB0ZXh0c1tpZF0gfHwgaWQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbW9kZXM6IG1vZGVzLFxuICBjb21tYW5kczogY29tbWFuZHNcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHNldFRleHQgKGVsLCB2YWx1ZSkge1xuICBlbC5pbm5lclRleHQgPSBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRleHQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwbGFjZWhvbGRlcnM6IHtcbiAgICBib2xkOiAnc3Ryb25nIHRleHQnLFxuICAgIGl0YWxpYzogJ2VtcGhhc2l6ZWQgdGV4dCcsXG4gICAgcXVvdGU6ICdxdW90ZWQgdGV4dCcsXG4gICAgY29kZTogJ2NvZGUgZ29lcyBoZXJlJyxcbiAgICBsaXN0aXRlbTogJ2xpc3QgaXRlbScsXG4gICAgaGVhZGluZzogJ0hlYWRpbmcgVGV4dCcsXG4gICAgbGluazogJ2xpbmsgdGV4dCcsXG4gICAgaW1hZ2U6ICdpbWFnZSBkZXNjcmlwdGlvbicsXG4gICAgYXR0YWNobWVudDogJ2F0dGFjaG1lbnQgZGVzY3JpcHRpb24nXG4gIH0sXG4gIHRpdGxlczoge1xuICAgIGJvbGQ6ICdTdHJvbmcgPHN0cm9uZz4gQ3RybCtCJyxcbiAgICBpdGFsaWM6ICdFbXBoYXNpcyA8ZW0+IEN0cmwrSScsXG4gICAgcXVvdGU6ICdCbG9ja3F1b3RlIDxibG9ja3F1b3RlPiBDdHJsK0onLFxuICAgIGNvZGU6ICdDb2RlIFNhbXBsZSA8cHJlPjxjb2RlPiBDdHJsK0UnLFxuICAgIG9sOiAnTnVtYmVyZWQgTGlzdCA8b2w+IEN0cmwrTycsXG4gICAgdWw6ICdCdWxsZXRlZCBMaXN0IDx1bD4gQ3RybCtVJyxcbiAgICBoZWFkaW5nOiAnSGVhZGluZyA8aDE+LCA8aDI+LCAuLi4gQ3RybCtEJyxcbiAgICBsaW5rOiAnSHlwZXJsaW5rIDxhPiBDdHJsK0snLFxuICAgIGltYWdlOiAnSW1hZ2UgPGltZz4gQ3RybCtHJyxcbiAgICBhdHRhY2htZW50OiAnQXR0YWNobWVudCBDdHJsK1NoaWZ0K0snLFxuICAgIG1hcmtkb3duOiAnTWFya2Rvd24gTW9kZSBDdHJsK00nLFxuICAgIGh0bWw6ICdIVE1MIE1vZGUgQ3RybCtIJyxcbiAgICB3eXNpd3lnOiAnUHJldmlldyBNb2RlIEN0cmwrUCdcbiAgfSxcbiAgYnV0dG9uczoge1xuICAgIGJvbGQ6ICdCJyxcbiAgICBpdGFsaWM6ICdJJyxcbiAgICBxdW90ZTogJ1xcdTIwMWMnLFxuICAgIGNvZGU6ICc8Lz4nLFxuICAgIG9sOiAnMS4nLFxuICAgIHVsOiAnXFx1MjlCRicsXG4gICAgaGVhZGluZzogJ1R0JyxcbiAgICBsaW5rOiAnTGluaycsXG4gICAgaW1hZ2U6ICdJbWFnZScsXG4gICAgYXR0YWNobWVudDogJ0F0dGFjaG1lbnQnLFxuICAgIGhyOiAnXFx1MjFiNSdcbiAgfSxcbiAgcHJvbXB0czoge1xuICAgIGxpbms6IHtcbiAgICAgIHRpdGxlOiAnSW5zZXJ0IExpbmsnLFxuICAgICAgZGVzY3JpcHRpb246ICdUeXBlIG9yIHBhc3RlIHRoZSB1cmwgdG8geW91ciBsaW5rJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnaHR0cDovL2V4YW1wbGUuY29tLyBcInRpdGxlXCInXG4gICAgfSxcbiAgICBpbWFnZToge1xuICAgICAgdGl0bGU6ICdJbnNlcnQgSW1hZ2UnLFxuICAgICAgZGVzY3JpcHRpb246ICdFbnRlciB0aGUgdXJsIHRvIHlvdXIgaW1hZ2UnLFxuICAgICAgcGxhY2Vob2xkZXI6ICdodHRwOi8vZXhhbXBsZS5jb20vcHVibGljL2ltYWdlLnBuZyBcInRpdGxlXCInXG4gICAgfSxcbiAgICBhdHRhY2htZW50OiB7XG4gICAgICB0aXRsZTogJ0F0dGFjaCBGaWxlJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRW50ZXIgdGhlIHVybCB0byB5b3VyIGF0dGFjaG1lbnQnLFxuICAgICAgcGxhY2Vob2xkZXI6ICdodHRwOi8vZXhhbXBsZS5jb20vcHVibGljL3JlcG9ydC5wZGYgXCJ0aXRsZVwiJ1xuICAgIH0sXG4gICAgdHlwZXM6ICdZb3UgY2FuIG9ubHkgdXBsb2FkICcsXG4gICAgYnJvd3NlOiAnQnJvd3NlLi4uJyxcbiAgICBkcm9waGludDogJ1lvdSBjYW4gYWxzbyBkcmFnIGZpbGVzIGZyb20geW91ciBjb21wdXRlciBhbmQgZHJvcCB0aGVtIGhlcmUhJyxcbiAgICBkcm9wOiAnRHJvcCB5b3VyIGZpbGUgaGVyZSB0byBiZWdpbiB1cGxvYWQuLi4nLFxuICAgIHVwbG9hZDogJywgb3IgdXBsb2FkIGEgZmlsZScsXG4gICAgdXBsb2FkaW5nOiAnVXBsb2FkaW5nIHlvdXIgZmlsZS4uLicsXG4gICAgdXBsb2FkZmFpbGVkOiAnVGhlIHVwbG9hZCBmYWlsZWQhIFRoYXRcXCdzIGFsbCB3ZSBrbm93LidcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL2NsYXNzZXMnKTtcbnZhciBkcmFnQ2xhc3MgPSAnd2stZHJhZ2dpbmcnO1xudmFyIGRyYWdDbGFzc1NwZWNpZmljID0gJ3drLWNvbnRhaW5lci1kcmFnZ2luZyc7XG52YXIgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuZnVuY3Rpb24gdXBsb2FkcyAoY29udGFpbmVyLCBkcm9wYXJlYSwgZWRpdG9yLCBvcHRpb25zLCByZW1vdmUpIHtcbiAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgY3Jvc3N2ZW50W29wXShyb290LCAnZHJhZ2VudGVyJywgZHJhZ2dpbmcpO1xuICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdkcmFnZW5kJywgZHJhZ3N0b3ApO1xuICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdtb3VzZW91dCcsIGRyYWdzdG9wKTtcbiAgY3Jvc3N2ZW50W29wXShjb250YWluZXIsICdkcmFnb3ZlcicsIGhhbmRsZURyYWdPdmVyLCBmYWxzZSk7XG4gIGNyb3NzdmVudFtvcF0oZHJvcGFyZWEsICdkcm9wJywgaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuXG4gIGZ1bmN0aW9uIGRyYWdnaW5nICgpIHtcbiAgICBjbGFzc2VzLmFkZChkcm9wYXJlYSwgZHJhZ0NsYXNzKTtcbiAgICBjbGFzc2VzLmFkZChkcm9wYXJlYSwgZHJhZ0NsYXNzU3BlY2lmaWMpO1xuICB9XG4gIGZ1bmN0aW9uIGRyYWdzdG9wICgpIHtcbiAgICBkcmFnc3RvcHBlcihkcm9wYXJlYSk7XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIgKGUpIHtcbiAgICBzdG9wKGUpO1xuICAgIGRyYWdnaW5nKCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVGaWxlU2VsZWN0IChlKSB7XG4gICAgZHJhZ3N0b3AoKTtcbiAgICBzdG9wKGUpO1xuICAgIGVkaXRvci5ydW5Db21tYW5kKGZ1bmN0aW9uIHJ1bm5lciAoY2h1bmtzLCBtb2RlKSB7XG4gICAgICB2YXIgZmlsZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlLmRhdGFUcmFuc2Zlci5maWxlcyk7XG4gICAgICB2YXIgdHlwZSA9IGluZmVyVHlwZShmaWxlcyk7XG4gICAgICBlZGl0b3IubGlua09ySW1hZ2VPckF0dGFjaG1lbnQodHlwZSwgZmlsZXMpLmNhbGwodGhpcywgbW9kZSwgY2h1bmtzKTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBpbmZlclR5cGUgKGZpbGVzKSB7XG4gICAgaWYgKG9wdGlvbnMuaW1hZ2VzICYmICFvcHRpb25zLmF0dGFjaG1lbnRzKSB7XG4gICAgICByZXR1cm4gJ2ltYWdlJztcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmltYWdlcyAmJiBvcHRpb25zLmF0dGFjaG1lbnRzKSB7XG4gICAgICByZXR1cm4gJ2F0dGFjaG1lbnQnO1xuICAgIH1cbiAgICBpZiAoZmlsZXMuZXZlcnkobWF0Y2hlcyhvcHRpb25zLmltYWdlcy52YWxpZGF0ZSB8fCBuZXZlcikpKSB7XG4gICAgICByZXR1cm4gJ2ltYWdlJztcbiAgICB9XG4gICAgcmV0dXJuICdhdHRhY2htZW50JztcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXRjaGVzIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gbWF0Y2hlciAoZmlsZSkgeyByZXR1cm4gZm4oZmlsZSk7IH07XG59XG5mdW5jdGlvbiBuZXZlciAoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHN0b3AgKGUpIHtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuZnVuY3Rpb24gZHJhZ3N0b3BwZXIgKGRyb3BhcmVhKSB7XG4gIGNsYXNzZXMucm0oZHJvcGFyZWEsIGRyYWdDbGFzcyk7XG4gIGNsYXNzZXMucm0oZHJvcGFyZWEsIGRyYWdDbGFzc1NwZWNpZmljKTtcbn1cblxudXBsb2Fkcy5zdG9wID0gZHJhZ3N0b3BwZXI7XG5tb2R1bGUuZXhwb3J0cyA9IHVwbG9hZHM7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBscyA9IHJlcXVpcmUoJ2xvY2FsLXN0b3JhZ2UnKTtcbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBrYW55ZSA9IHJlcXVpcmUoJ2thbnllJyk7XG52YXIgdXBsb2FkcyA9IHJlcXVpcmUoJy4vdXBsb2FkcycpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuL3N0cmluZ3MnKTtcbnZhciBzZXRUZXh0ID0gcmVxdWlyZSgnLi9zZXRUZXh0Jyk7XG52YXIgcmVtZW1iZXJTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3JlbWVtYmVyU2VsZWN0aW9uJyk7XG52YXIgYmluZENvbW1hbmRzID0gcmVxdWlyZSgnLi9iaW5kQ29tbWFuZHMnKTtcbnZhciBJbnB1dEhpc3RvcnkgPSByZXF1aXJlKCcuL0lucHV0SGlzdG9yeScpO1xudmFyIGdldENvbW1hbmRIYW5kbGVyID0gcmVxdWlyZSgnLi9nZXRDb21tYW5kSGFuZGxlcicpO1xudmFyIGdldFN1cmZhY2UgPSByZXF1aXJlKCcuL2dldFN1cmZhY2UnKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi9jbGFzc2VzJyk7XG52YXIgcmVuZGVyZXJzID0gcmVxdWlyZSgnLi9yZW5kZXJlcnMnKTtcbnZhciB4aHJTdHViID0gcmVxdWlyZSgnLi94aHJTdHViJyk7XG52YXIgcHJvbXB0ID0gcmVxdWlyZSgnLi9wcm9tcHRzL3Byb21wdCcpO1xudmFyIGNsb3NlUHJvbXB0cyA9IHJlcXVpcmUoJy4vcHJvbXB0cy9jbG9zZScpO1xudmFyIG1vZGVOYW1lcyA9IFsnbWFya2Rvd24nLCAnaHRtbCcsICd3eXNpd3lnJ107XG52YXIgY2FjaGUgPSBbXTtcbnZhciBtYWMgPSAvXFxiTWFjIE9TXFxiLy50ZXN0KGdsb2JhbC5uYXZpZ2F0b3IudXNlckFnZW50KTtcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBycGFyYWdyYXBoID0gL148cD48XFwvcD5cXG4/JC9pO1xuXG5mdW5jdGlvbiBmaW5kICh0ZXh0YXJlYSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGNhY2hlW2ldICYmIGNhY2hlW2ldLnRhID09PSB0ZXh0YXJlYSkge1xuICAgICAgcmV0dXJuIGNhY2hlW2ldLmVkaXRvcjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHdvb2ZtYXJrICh0ZXh0YXJlYSwgb3B0aW9ucykge1xuICB2YXIgY2FjaGVkID0gZmluZCh0ZXh0YXJlYSk7XG4gIGlmIChjYWNoZWQpIHtcbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG5cbiAgdmFyIHBhcmVudCA9IHRleHRhcmVhLnBhcmVudEVsZW1lbnQ7XG4gIGlmIChwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignd29vZm1hcmsgZGVtYW5kcyA8dGV4dGFyZWE+IGVsZW1lbnRzIHRvIGhhdmUgbm8gc2libGluZ3MnKTtcbiAgfVxuXG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKG8ubWFya2Rvd24gPT09IHZvaWQgMCkgeyBvLm1hcmtkb3duID0gdHJ1ZTsgfVxuICBpZiAoby5odG1sID09PSB2b2lkIDApIHsgby5odG1sID0gdHJ1ZTsgfVxuICBpZiAoby53eXNpd3lnID09PSB2b2lkIDApIHsgby53eXNpd3lnID0gdHJ1ZTsgfVxuXG4gIGlmICghby5tYXJrZG93biAmJiAhby5odG1sICYmICFvLnd5c2l3eWcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dvb2ZtYXJrIGV4cGVjdHMgYXQgbGVhc3Qgb25lIGlucHV0IG1vZGUgdG8gYmUgYXZhaWxhYmxlJyk7XG4gIH1cblxuICBpZiAoby5ociA9PT0gdm9pZCAwKSB7IG8uaHIgPSBmYWxzZTsgfVxuICBpZiAoby5zdG9yYWdlID09PSB2b2lkIDApIHsgby5zdG9yYWdlID0gdHJ1ZTsgfVxuICBpZiAoby5zdG9yYWdlID09PSB0cnVlKSB7IG8uc3RvcmFnZSA9ICd3b29mbWFya19pbnB1dF9tb2RlJzsgfVxuICBpZiAoby5mZW5jaW5nID09PSB2b2lkIDApIHsgby5mZW5jaW5nID0gdHJ1ZTsgfVxuICBpZiAoby5yZW5kZXIgPT09IHZvaWQgMCkgeyBvLnJlbmRlciA9IHt9OyB9XG4gIGlmIChvLnJlbmRlci5tb2RlcyA9PT0gdm9pZCAwKSB7IG8ucmVuZGVyLm1vZGVzID0ge307IH1cbiAgaWYgKG8ucmVuZGVyLmNvbW1hbmRzID09PSB2b2lkIDApIHsgby5yZW5kZXIuY29tbWFuZHMgPSB7fTsgfVxuICBpZiAoby5wcm9tcHRzID09PSB2b2lkIDApIHsgby5wcm9tcHRzID0ge307IH1cbiAgaWYgKG8ucHJvbXB0cy5saW5rID09PSB2b2lkIDApIHsgby5wcm9tcHRzLmxpbmsgPSBwcm9tcHQ7IH1cbiAgaWYgKG8ucHJvbXB0cy5pbWFnZSA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cy5pbWFnZSA9IHByb21wdDsgfVxuICBpZiAoby5wcm9tcHRzLmF0dGFjaG1lbnQgPT09IHZvaWQgMCkgeyBvLnByb21wdHMuYXR0YWNobWVudCA9IHByb21wdDsgfVxuICBpZiAoby5wcm9tcHRzLmNsb3NlID09PSB2b2lkIDApIHsgby5wcm9tcHRzLmNsb3NlID0gY2xvc2VQcm9tcHRzOyB9XG4gIGlmIChvLnhociA9PT0gdm9pZCAwKSB7IG8ueGhyID0geGhyU3R1YjsgfVxuICBpZiAoby5jbGFzc2VzID09PSB2b2lkIDApIHsgby5jbGFzc2VzID0ge307IH1cbiAgaWYgKG8uY2xhc3Nlcy53eXNpd3lnID09PSB2b2lkIDApIHsgby5jbGFzc2VzLnd5c2l3eWcgPSBbXTsgfVxuICBpZiAoby5jbGFzc2VzLnByb21wdHMgPT09IHZvaWQgMCkgeyBvLmNsYXNzZXMucHJvbXB0cyA9IHt9OyB9XG4gIGlmIChvLmNsYXNzZXMuaW5wdXQgPT09IHZvaWQgMCkgeyBvLmNsYXNzZXMuaW5wdXQgPSB7fTsgfVxuXG4gIHZhciBwcmVmZXJlbmNlID0gby5zdG9yYWdlICYmIGxzLmdldChvLnN0b3JhZ2UpO1xuICBpZiAocHJlZmVyZW5jZSkge1xuICAgIG8uZGVmYXVsdE1vZGUgPSBwcmVmZXJlbmNlO1xuICB9XG5cbiAgdmFyIGRyb3BhcmVhID0gdGFnKHsgYzogJ3drLWNvbnRhaW5lci1kcm9wJyB9KTtcbiAgdmFyIHN3aXRjaGJvYXJkID0gdGFnKHsgYzogJ3drLXN3aXRjaGJvYXJkJyB9KTtcbiAgdmFyIGNvbW1hbmRzID0gdGFnKHsgYzogJ3drLWNvbW1hbmRzJyB9KTtcbiAgdmFyIGVkaXRhYmxlID0gdGFnKHsgYzogWyd3ay13eXNpd3lnJywgJ3drLWhpZGUnXS5jb25jYXQoby5jbGFzc2VzLnd5c2l3eWcpLmpvaW4oJyAnKSB9KTtcbiAgdmFyIHN1cmZhY2UgPSBnZXRTdXJmYWNlKHRleHRhcmVhLCBlZGl0YWJsZSwgZHJvcGFyZWEpO1xuICB2YXIgaGlzdG9yeSA9IG5ldyBJbnB1dEhpc3Rvcnkoc3VyZmFjZSwgJ21hcmtkb3duJyk7XG4gIHZhciBlZGl0b3IgPSB7XG4gICAgYWRkQ29tbWFuZDogYWRkQ29tbWFuZCxcbiAgICBhZGRDb21tYW5kQnV0dG9uOiBhZGRDb21tYW5kQnV0dG9uLFxuICAgIHJ1bkNvbW1hbmQ6IHJ1bkNvbW1hbmQsXG4gICAgcGFyc2VNYXJrZG93bjogby5wYXJzZU1hcmtkb3duLFxuICAgIHBhcnNlSFRNTDogby5wYXJzZUhUTUwsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICB2YWx1ZTogZ2V0TWFya2Rvd24sXG4gICAgdGV4dGFyZWE6IHRleHRhcmVhLFxuICAgIGVkaXRhYmxlOiBvLnd5c2l3eWcgPyBlZGl0YWJsZSA6IG51bGwsXG4gICAgc2V0TW9kZTogcGVyc2lzdE1vZGUsXG4gICAgaGlzdG9yeToge1xuICAgICAgdW5kbzogaGlzdG9yeS51bmRvLFxuICAgICAgcmVkbzogaGlzdG9yeS5yZWRvLFxuICAgICAgY2FuVW5kbzogaGlzdG9yeS5jYW5VbmRvLFxuICAgICAgY2FuUmVkbzogaGlzdG9yeS5jYW5SZWRvXG4gICAgfSxcbiAgICBtb2RlOiAnbWFya2Rvd24nXG4gIH07XG4gIHZhciBlbnRyeSA9IHsgdGE6IHRleHRhcmVhLCBlZGl0b3I6IGVkaXRvciB9O1xuICB2YXIgaSA9IGNhY2hlLnB1c2goZW50cnkpO1xuICB2YXIga2FueWVDb250ZXh0ID0gJ3dvb2ZtYXJrXycgKyBpO1xuICB2YXIga2FueWVPcHRpb25zID0ge1xuICAgIGZpbHRlcjogcGFyZW50LFxuICAgIGNvbnRleHQ6IGthbnllQ29udGV4dFxuICB9O1xuICB2YXIgbW9kZXMgPSB7XG4gICAgbWFya2Rvd246IHtcbiAgICAgIGJ1dHRvbjogdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1tb2RlIHdrLW1vZGUtYWN0aXZlJyB9KSxcbiAgICAgIHNldDogbWFya2Rvd25Nb2RlXG4gICAgfSxcbiAgICBodG1sOiB7XG4gICAgICBidXR0b246IHRhZyh7IHQ6ICdidXR0b24nLCBjOiAnd2stbW9kZSB3ay1tb2RlLWluYWN0aXZlJyB9KSxcbiAgICAgIHNldDogaHRtbE1vZGVcbiAgICB9LFxuICAgIHd5c2l3eWc6IHtcbiAgICAgIGJ1dHRvbjogdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1tb2RlIHdrLW1vZGUtaW5hY3RpdmUnIH0pLFxuICAgICAgc2V0OiB3eXNpd3lnTW9kZVxuICAgIH1cbiAgfTtcbiAgdmFyIHBsYWNlO1xuXG4gIHRhZyh7IHQ6ICdzcGFuJywgYzogJ3drLWRyb3AtdGV4dCcsIHg6IHN0cmluZ3MucHJvbXB0cy5kcm9wLCBwOiBkcm9wYXJlYSB9KTtcbiAgdGFnKHsgdDogJ3AnLCBjOiBbJ3drLWRyb3AtaWNvbiddLmNvbmNhdChvLmNsYXNzZXMuZHJvcGljb24pLmpvaW4oJyAnKSwgcDogZHJvcGFyZWEgfSk7XG5cbiAgZWRpdGFibGUuY29udGVudEVkaXRhYmxlID0gdHJ1ZTtcbiAgbW9kZXMubWFya2Rvd24uYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgbW9kZU5hbWVzLmZvckVhY2goYWRkTW9kZSk7XG5cbiAgaWYgKG8ud3lzaXd5Zykge1xuICAgIHBsYWNlID0gdGFnKHsgYzogJ3drLXd5c2l3eWctcGxhY2Vob2xkZXIgd2staGlkZScsIHg6IHRleHRhcmVhLnBsYWNlaG9sZGVyIH0pO1xuICAgIGNyb3NzdmVudC5hZGQocGxhY2UsICdjbGljaycsIGZvY3VzRWRpdGFibGUpO1xuICB9XG5cbiAgaWYgKG8uZGVmYXVsdE1vZGUgJiYgb1tvLmRlZmF1bHRNb2RlXSkge1xuICAgIG1vZGVzW28uZGVmYXVsdE1vZGVdLnNldCgpO1xuICB9IGVsc2UgaWYgKG8ubWFya2Rvd24pIHtcbiAgICBtb2Rlcy5tYXJrZG93bi5zZXQoKTtcbiAgfSBlbHNlIGlmIChvLmh0bWwpIHtcbiAgICBtb2Rlcy5odG1sLnNldCgpO1xuICB9IGVsc2Uge1xuICAgIG1vZGVzLnd5c2l3eWcuc2V0KCk7XG4gIH1cblxuICBiaW5kQ29tbWFuZHMoc3VyZmFjZSwgbywgZWRpdG9yKTtcbiAgYmluZEV2ZW50cygpO1xuXG4gIHJldHVybiBlZGl0b3I7XG5cbiAgZnVuY3Rpb24gYWRkTW9kZSAoaWQpIHtcbiAgICB2YXIgYnV0dG9uID0gbW9kZXNbaWRdLmJ1dHRvbjtcbiAgICB2YXIgY3VzdG9tID0gby5yZW5kZXIubW9kZXM7XG4gICAgaWYgKG9baWRdKSB7XG4gICAgICBzd2l0Y2hib2FyZC5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgKHR5cGVvZiBjdXN0b20gPT09ICdmdW5jdGlvbicgPyBjdXN0b20gOiByZW5kZXJlcnMubW9kZXMpKGJ1dHRvbiwgaWQpO1xuICAgICAgY3Jvc3N2ZW50LmFkZChidXR0b24sICdjbGljaycsIG1vZGVzW2lkXS5zZXQpO1xuICAgICAgYnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgIGJ1dHRvbi50YWJJbmRleCA9IC0xO1xuXG4gICAgICB2YXIgdGl0bGUgPSBzdHJpbmdzLnRpdGxlc1tpZF07XG4gICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBtYWMgPyBtYWNpZnkodGl0bGUpIDogdGl0bGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmRFdmVudHMgKHJlbW92ZSkge1xuICAgIHZhciBhciA9IHJlbW92ZSA/ICdybScgOiAnYWRkJztcbiAgICB2YXIgbW92ID0gcmVtb3ZlID8gJ3JlbW92ZUNoaWxkJyA6ICdhcHBlbmRDaGlsZCc7XG4gICAgaWYgKHJlbW92ZSkge1xuICAgICAga2FueWUuY2xlYXIoa2FueWVDb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG8ubWFya2Rvd24pIHsga2FueWUub24oJ2NtZCttJywga2FueWVPcHRpb25zLCBtYXJrZG93bk1vZGUpOyB9XG4gICAgICBpZiAoby5odG1sKSB7IGthbnllLm9uKCdjbWQraCcsIGthbnllT3B0aW9ucywgaHRtbE1vZGUpOyB9XG4gICAgICBpZiAoby53eXNpd3lnKSB7IGthbnllLm9uKCdjbWQrcCcsIGthbnllT3B0aW9ucywgd3lzaXd5Z01vZGUpOyB9XG4gICAgfVxuICAgIGNsYXNzZXNbYXJdKHBhcmVudCwgJ3drLWNvbnRhaW5lcicpO1xuICAgIHBhcmVudFttb3ZdKGVkaXRhYmxlKTtcbiAgICBpZiAocGxhY2UpIHsgcGFyZW50W21vdl0ocGxhY2UpOyB9XG4gICAgcGFyZW50W21vdl0oY29tbWFuZHMpO1xuICAgIHBhcmVudFttb3ZdKHN3aXRjaGJvYXJkKTtcbiAgICBpZiAoKG8uaW1hZ2VzIHx8IG8uYXR0YWNobWVudHMpICYmIG8ueGhyKSB7XG4gICAgICBwYXJlbnRbbW92XShkcm9wYXJlYSk7XG4gICAgICB1cGxvYWRzKHBhcmVudCwgZHJvcGFyZWEsIGVkaXRvciwgbywgcmVtb3ZlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBpZiAoZWRpdG9yLm1vZGUgIT09ICdtYXJrZG93bicpIHtcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gZ2V0TWFya2Rvd24oKTtcbiAgICB9XG4gICAgY2xhc3Nlcy5ybSh0ZXh0YXJlYSwgJ3drLWhpZGUnKTtcbiAgICBiaW5kRXZlbnRzKHRydWUpO1xuICAgIGRlbGV0ZSBjYWNoZVtpIC0gMV07XG4gIH1cblxuICBmdW5jdGlvbiBtYXJrZG93bk1vZGUgKGUpIHsgcGVyc2lzdE1vZGUoJ21hcmtkb3duJywgZSk7IH1cbiAgZnVuY3Rpb24gaHRtbE1vZGUgKGUpIHsgcGVyc2lzdE1vZGUoJ2h0bWwnLCBlKTsgfVxuICBmdW5jdGlvbiB3eXNpd3lnTW9kZSAoZSkgeyBwZXJzaXN0TW9kZSgnd3lzaXd5ZycsIGUpOyB9XG5cbiAgZnVuY3Rpb24gcGVyc2lzdE1vZGUgKG5leHRNb2RlLCBlKSB7XG4gICAgdmFyIHJlc3RvcmVTZWxlY3Rpb247XG4gICAgdmFyIGN1cnJlbnRNb2RlID0gZWRpdG9yLm1vZGU7XG4gICAgdmFyIG9sZCA9IG1vZGVzW2N1cnJlbnRNb2RlXS5idXR0b247XG4gICAgdmFyIGJ1dHRvbiA9IG1vZGVzW25leHRNb2RlXS5idXR0b247XG4gICAgdmFyIGZvY3VzaW5nID0gISFlIHx8IGRvYy5hY3RpdmVFbGVtZW50ID09PSB0ZXh0YXJlYSB8fCBkb2MuYWN0aXZlRWxlbWVudCA9PT0gZWRpdGFibGU7XG5cbiAgICBzdG9wKGUpO1xuXG4gICAgaWYgKGN1cnJlbnRNb2RlID09PSBuZXh0TW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlc3RvcmVTZWxlY3Rpb24gPSBmb2N1c2luZyAmJiByZW1lbWJlclNlbGVjdGlvbihoaXN0b3J5LCBvKTtcbiAgICB0ZXh0YXJlYS5ibHVyKCk7IC8vIGF2ZXJ0IGNocm9tZSByZXBhaW50IGJ1Z3NcblxuICAgIGlmIChuZXh0TW9kZSA9PT0gJ21hcmtkb3duJykge1xuICAgICAgaWYgKGN1cnJlbnRNb2RlID09PSAnaHRtbCcpIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBvLnBhcnNlSFRNTCh0ZXh0YXJlYS52YWx1ZSkudHJpbSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBvLnBhcnNlSFRNTChlZGl0YWJsZSkudHJpbSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmV4dE1vZGUgPT09ICdodG1sJykge1xuICAgICAgaWYgKGN1cnJlbnRNb2RlID09PSAnbWFya2Rvd24nKSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gby5wYXJzZU1hcmtkb3duKHRleHRhcmVhLnZhbHVlKS50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IGVkaXRhYmxlLmlubmVySFRNTC50cmltKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuZXh0TW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICBpZiAoY3VycmVudE1vZGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgZWRpdGFibGUuaW5uZXJIVE1MID0gby5wYXJzZU1hcmtkb3duKHRleHRhcmVhLnZhbHVlKS5yZXBsYWNlKHJwYXJhZ3JhcGgsICcnKS50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSB0ZXh0YXJlYS52YWx1ZS5yZXBsYWNlKHJwYXJhZ3JhcGgsICcnKS50cmltKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5leHRNb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIGNsYXNzZXMuYWRkKHRleHRhcmVhLCAnd2staGlkZScpO1xuICAgICAgY2xhc3Nlcy5ybShlZGl0YWJsZSwgJ3drLWhpZGUnKTtcbiAgICAgIGlmIChwbGFjZSkgeyBjbGFzc2VzLnJtKHBsYWNlLCAnd2staGlkZScpOyB9XG4gICAgICBpZiAoZm9jdXNpbmcpIHsgc2V0VGltZW91dChmb2N1c0VkaXRhYmxlLCAwKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFzc2VzLnJtKHRleHRhcmVhLCAnd2staGlkZScpO1xuICAgICAgY2xhc3Nlcy5hZGQoZWRpdGFibGUsICd3ay1oaWRlJyk7XG4gICAgICBpZiAocGxhY2UpIHsgY2xhc3Nlcy5hZGQocGxhY2UsICd3ay1oaWRlJyk7IH1cbiAgICAgIGlmIChmb2N1c2luZykgeyB0ZXh0YXJlYS5mb2N1cygpOyB9XG4gICAgfVxuICAgIGNsYXNzZXMuYWRkKGJ1dHRvbiwgJ3drLW1vZGUtYWN0aXZlJyk7XG4gICAgY2xhc3Nlcy5ybShvbGQsICd3ay1tb2RlLWFjdGl2ZScpO1xuICAgIGNsYXNzZXMuYWRkKG9sZCwgJ3drLW1vZGUtaW5hY3RpdmUnKTtcbiAgICBjbGFzc2VzLnJtKGJ1dHRvbiwgJ3drLW1vZGUtaW5hY3RpdmUnKTtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIG9sZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgZWRpdG9yLm1vZGUgPSBuZXh0TW9kZTtcblxuICAgIGlmIChvLnN0b3JhZ2UpIHsgbHMuc2V0KG8uc3RvcmFnZSwgbmV4dE1vZGUpOyB9XG5cbiAgICBoaXN0b3J5LnNldElucHV0TW9kZShuZXh0TW9kZSk7XG4gICAgaWYgKHJlc3RvcmVTZWxlY3Rpb24pIHsgcmVzdG9yZVNlbGVjdGlvbigpOyB9XG4gICAgZmlyZUxhdGVyKCd3b29mbWFyay1tb2RlLWNoYW5nZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyZUxhdGVyICh0eXBlKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiBmaXJlICgpIHtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUodGV4dGFyZWEsIHR5cGUpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9jdXNFZGl0YWJsZSAoKSB7XG4gICAgZWRpdGFibGUuZm9jdXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1hcmtkb3duICgpIHtcbiAgICBpZiAoZWRpdG9yLm1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgcmV0dXJuIG8ucGFyc2VIVE1MKGVkaXRhYmxlKTtcbiAgICB9XG4gICAgaWYgKGVkaXRvci5tb2RlID09PSAnaHRtbCcpIHtcbiAgICAgIHJldHVybiBvLnBhcnNlSFRNTCh0ZXh0YXJlYS52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENvbW1hbmRCdXR0b24gKGlkLCBjb21ibywgZm4pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgZm4gPSBjb21ibztcbiAgICAgIGNvbWJvID0gbnVsbDtcbiAgICB9XG4gICAgdmFyIGJ1dHRvbiA9IHRhZyh7IHQ6ICdidXR0b24nLCBjOiAnd2stY29tbWFuZCcsIHA6IGNvbW1hbmRzIH0pO1xuICAgIHZhciBjdXN0b20gPSBvLnJlbmRlci5jb21tYW5kcztcbiAgICB2YXIgcmVuZGVyID0gdHlwZW9mIGN1c3RvbSA9PT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbSA6IHJlbmRlcmVycy5jb21tYW5kcztcbiAgICB2YXIgdGl0bGUgPSBzdHJpbmdzLnRpdGxlc1tpZF07XG4gICAgaWYgKHRpdGxlKSB7XG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIG1hYyA/IG1hY2lmeSh0aXRsZSkgOiB0aXRsZSk7XG4gICAgfVxuICAgIGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgYnV0dG9uLnRhYkluZGV4ID0gLTE7XG4gICAgcmVuZGVyKGJ1dHRvbiwgaWQpO1xuICAgIGNyb3NzdmVudC5hZGQoYnV0dG9uLCAnY2xpY2snLCBnZXRDb21tYW5kSGFuZGxlcihzdXJmYWNlLCBoaXN0b3J5LCBmbikpO1xuICAgIGlmIChjb21ibykge1xuICAgICAgYWRkQ29tbWFuZChjb21ibywgZm4pO1xuICAgIH1cbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ29tbWFuZCAoY29tYm8sIGZuKSB7XG4gICAga2FueWUub24oY29tYm8sIGthbnllT3B0aW9ucywgZ2V0Q29tbWFuZEhhbmRsZXIoc3VyZmFjZSwgaGlzdG9yeSwgZm4pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkNvbW1hbmQgKGZuKSB7XG4gICAgZ2V0Q29tbWFuZEhhbmRsZXIoc3VyZmFjZSwgaGlzdG9yeSwgcmVhcnJhbmdlKShudWxsKTtcbiAgICBmdW5jdGlvbiByZWFycmFuZ2UgKGUsIG1vZGUsIGNodW5rcykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgY2h1bmtzLCBtb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdGFnIChvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoby50IHx8ICdkaXYnKTtcbiAgZWwuY2xhc3NOYW1lID0gby5jIHx8ICcnO1xuICBzZXRUZXh0KGVsLCBvLnggfHwgJycpO1xuICBpZiAoby5wKSB7IG8ucC5hcHBlbmRDaGlsZChlbCk7IH1cbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiBzdG9wIChlKSB7XG4gIGlmIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfVxufVxuXG5mdW5jdGlvbiBtYWNpZnkgKHRleHQpIHtcbiAgcmV0dXJuIHRleHRcbiAgICAucmVwbGFjZSgvXFxiY3RybFxcYi9pLCAnXFx1MjMxOCcpXG4gICAgLnJlcGxhY2UoL1xcYmFsdFxcYi9pLCAnXFx1MjMyNScpXG4gICAgLnJlcGxhY2UoL1xcYnNoaWZ0XFxiL2ksICdcXHUyMWU3Jyk7XG59XG5cbndvb2ZtYXJrLmZpbmQgPSBmaW5kO1xud29vZm1hcmsuc3RyaW5ncyA9IHN0cmluZ3M7XG5tb2R1bGUuZXhwb3J0cyA9IHdvb2ZtYXJrO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTkzYjI5bWJXRnlheTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJzY3lBOUlISmxjWFZwY21Vb0oyeHZZMkZzTFhOMGIzSmhaMlVuS1R0Y2JuWmhjaUJqY205emMzWmxiblFnUFNCeVpYRjFhWEpsS0NkamNtOXpjM1psYm5RbktUdGNiblpoY2lCcllXNTVaU0E5SUhKbGNYVnBjbVVvSjJ0aGJubGxKeWs3WEc1MllYSWdkWEJzYjJGa2N5QTlJSEpsY1hWcGNtVW9KeTR2ZFhCc2IyRmtjeWNwTzF4dWRtRnlJSE4wY21sdVozTWdQU0J5WlhGMWFYSmxLQ2N1TDNOMGNtbHVaM01uS1R0Y2JuWmhjaUJ6WlhSVVpYaDBJRDBnY21WeGRXbHlaU2duTGk5elpYUlVaWGgwSnlrN1hHNTJZWElnY21WdFpXMWlaWEpUWld4bFkzUnBiMjRnUFNCeVpYRjFhWEpsS0NjdUwzSmxiV1Z0WW1WeVUyVnNaV04wYVc5dUp5azdYRzUyWVhJZ1ltbHVaRU52YlcxaGJtUnpJRDBnY21WeGRXbHlaU2duTGk5aWFXNWtRMjl0YldGdVpITW5LVHRjYm5aaGNpQkpibkIxZEVocGMzUnZjbmtnUFNCeVpYRjFhWEpsS0NjdUwwbHVjSFYwU0dsemRHOXllU2NwTzF4dWRtRnlJR2RsZEVOdmJXMWhibVJJWVc1a2JHVnlJRDBnY21WeGRXbHlaU2duTGk5blpYUkRiMjF0WVc1a1NHRnVaR3hsY2ljcE8xeHVkbUZ5SUdkbGRGTjFjbVpoWTJVZ1BTQnlaWEYxYVhKbEtDY3VMMmRsZEZOMWNtWmhZMlVuS1R0Y2JuWmhjaUJqYkdGemMyVnpJRDBnY21WeGRXbHlaU2duTGk5amJHRnpjMlZ6SnlrN1hHNTJZWElnY21WdVpHVnlaWEp6SUQwZ2NtVnhkV2x5WlNnbkxpOXlaVzVrWlhKbGNuTW5LVHRjYm5aaGNpQjRhSEpUZEhWaUlEMGdjbVZ4ZFdseVpTZ25MaTk0YUhKVGRIVmlKeWs3WEc1MllYSWdjSEp2YlhCMElEMGdjbVZ4ZFdseVpTZ25MaTl3Y205dGNIUnpMM0J5YjIxd2RDY3BPMXh1ZG1GeUlHTnNiM05sVUhKdmJYQjBjeUE5SUhKbGNYVnBjbVVvSnk0dmNISnZiWEIwY3k5amJHOXpaU2NwTzF4dWRtRnlJRzF2WkdWT1lXMWxjeUE5SUZzbmJXRnlhMlJ2ZDI0bkxDQW5hSFJ0YkNjc0lDZDNlWE5wZDNsbkoxMDdYRzUyWVhJZ1kyRmphR1VnUFNCYlhUdGNiblpoY2lCdFlXTWdQU0F2WEZ4aVRXRmpJRTlUWEZ4aUx5NTBaWE4wS0dkc2IySmhiQzV1WVhacFoyRjBiM0l1ZFhObGNrRm5aVzUwS1R0Y2JuWmhjaUJrYjJNZ1BTQmtiMk4xYldWdWREdGNiblpoY2lCeWNHRnlZV2R5WVhCb0lEMGdMMTQ4Y0Q0OFhGd3ZjRDVjWEc0L0pDOXBPMXh1WEc1bWRXNWpkR2x2YmlCbWFXNWtJQ2gwWlhoMFlYSmxZU2tnZTF4dUlDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR05oWTJobExteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdhV1lnS0dOaFkyaGxXMmxkSUNZbUlHTmhZMmhsVzJsZExuUmhJRDA5UFNCMFpYaDBZWEpsWVNrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdOaFkyaGxXMmxkTG1Wa2FYUnZjanRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdjbVYwZFhKdUlHNTFiR3c3WEc1OVhHNWNibVoxYm1OMGFXOXVJSGR2YjJadFlYSnJJQ2gwWlhoMFlYSmxZU3dnYjNCMGFXOXVjeWtnZTF4dUlDQjJZWElnWTJGamFHVmtJRDBnWm1sdVpDaDBaWGgwWVhKbFlTazdYRzRnSUdsbUlDaGpZV05vWldRcElIdGNiaUFnSUNCeVpYUjFjbTRnWTJGamFHVmtPMXh1SUNCOVhHNWNiaUFnZG1GeUlIQmhjbVZ1ZENBOUlIUmxlSFJoY21WaExuQmhjbVZ1ZEVWc1pXMWxiblE3WEc0Z0lHbG1JQ2h3WVhKbGJuUXVZMmhwYkdSeVpXNHViR1Z1WjNSb0lENGdNU2tnZTF4dUlDQWdJSFJvY205M0lHNWxkeUJGY25KdmNpZ25kMjl2Wm0xaGNtc2daR1Z0WVc1a2N5QThkR1Y0ZEdGeVpXRStJR1ZzWlcxbGJuUnpJSFJ2SUdoaGRtVWdibThnYzJsaWJHbHVaM01uS1R0Y2JpQWdmVnh1WEc0Z0lIWmhjaUJ2SUQwZ2IzQjBhVzl1Y3lCOGZDQjdmVHRjYmlBZ2FXWWdLRzh1YldGeWEyUnZkMjRnUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbTFoY210a2IzZHVJRDBnZEhKMVpUc2dmVnh1SUNCcFppQW9ieTVvZEcxc0lEMDlQU0IyYjJsa0lEQXBJSHNnYnk1b2RHMXNJRDBnZEhKMVpUc2dmVnh1SUNCcFppQW9ieTUzZVhOcGQzbG5JRDA5UFNCMmIybGtJREFwSUhzZ2J5NTNlWE5wZDNsbklEMGdkSEoxWlRzZ2ZWeHVYRzRnSUdsbUlDZ2hieTV0WVhKclpHOTNiaUFtSmlBaGJ5NW9kRzFzSUNZbUlDRnZMbmQ1YzJsM2VXY3BJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0ozZHZiMlp0WVhKcklHVjRjR1ZqZEhNZ1lYUWdiR1ZoYzNRZ2IyNWxJR2x1Y0hWMElHMXZaR1VnZEc4Z1ltVWdZWFpoYVd4aFlteGxKeWs3WEc0Z0lIMWNibHh1SUNCcFppQW9ieTVvY2lBOVBUMGdkbTlwWkNBd0tTQjdJRzh1YUhJZ1BTQm1ZV3h6WlRzZ2ZWeHVJQ0JwWmlBb2J5NXpkRzl5WVdkbElEMDlQU0IyYjJsa0lEQXBJSHNnYnk1emRHOXlZV2RsSUQwZ2RISjFaVHNnZlZ4dUlDQnBaaUFvYnk1emRHOXlZV2RsSUQwOVBTQjBjblZsS1NCN0lHOHVjM1J2Y21GblpTQTlJQ2QzYjI5bWJXRnlhMTlwYm5CMWRGOXRiMlJsSnpzZ2ZWeHVJQ0JwWmlBb2J5NW1aVzVqYVc1bklEMDlQU0IyYjJsa0lEQXBJSHNnYnk1bVpXNWphVzVuSUQwZ2RISjFaVHNnZlZ4dUlDQnBaaUFvYnk1eVpXNWtaWElnUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbkpsYm1SbGNpQTlJSHQ5T3lCOVhHNGdJR2xtSUNodkxuSmxibVJsY2k1dGIyUmxjeUE5UFQwZ2RtOXBaQ0F3S1NCN0lHOHVjbVZ1WkdWeUxtMXZaR1Z6SUQwZ2UzMDdJSDFjYmlBZ2FXWWdLRzh1Y21WdVpHVnlMbU52YlcxaGJtUnpJRDA5UFNCMmIybGtJREFwSUhzZ2J5NXlaVzVrWlhJdVkyOXRiV0Z1WkhNZ1BTQjdmVHNnZlZ4dUlDQnBaaUFvYnk1d2NtOXRjSFJ6SUQwOVBTQjJiMmxrSURBcElIc2dieTV3Y205dGNIUnpJRDBnZTMwN0lIMWNiaUFnYVdZZ0tHOHVjSEp2YlhCMGN5NXNhVzVySUQwOVBTQjJiMmxrSURBcElIc2dieTV3Y205dGNIUnpMbXhwYm1zZ1BTQndjbTl0Y0hRN0lIMWNiaUFnYVdZZ0tHOHVjSEp2YlhCMGN5NXBiV0ZuWlNBOVBUMGdkbTlwWkNBd0tTQjdJRzh1Y0hKdmJYQjBjeTVwYldGblpTQTlJSEJ5YjIxd2REc2dmVnh1SUNCcFppQW9ieTV3Y205dGNIUnpMbUYwZEdGamFHMWxiblFnUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbkJ5YjIxd2RITXVZWFIwWVdOb2JXVnVkQ0E5SUhCeWIyMXdkRHNnZlZ4dUlDQnBaaUFvYnk1d2NtOXRjSFJ6TG1Oc2IzTmxJRDA5UFNCMmIybGtJREFwSUhzZ2J5NXdjbTl0Y0hSekxtTnNiM05sSUQwZ1kyeHZjMlZRY205dGNIUnpPeUI5WEc0Z0lHbG1JQ2h2TG5ob2NpQTlQVDBnZG05cFpDQXdLU0I3SUc4dWVHaHlJRDBnZUdoeVUzUjFZanNnZlZ4dUlDQnBaaUFvYnk1amJHRnpjMlZ6SUQwOVBTQjJiMmxrSURBcElIc2dieTVqYkdGemMyVnpJRDBnZTMwN0lIMWNiaUFnYVdZZ0tHOHVZMnhoYzNObGN5NTNlWE5wZDNsbklEMDlQU0IyYjJsa0lEQXBJSHNnYnk1amJHRnpjMlZ6TG5kNWMybDNlV2NnUFNCYlhUc2dmVnh1SUNCcFppQW9ieTVqYkdGemMyVnpMbkJ5YjIxd2RITWdQVDA5SUhadmFXUWdNQ2tnZXlCdkxtTnNZWE56WlhNdWNISnZiWEIwY3lBOUlIdDlPeUI5WEc0Z0lHbG1JQ2h2TG1Oc1lYTnpaWE11YVc1d2RYUWdQVDA5SUhadmFXUWdNQ2tnZXlCdkxtTnNZWE56WlhNdWFXNXdkWFFnUFNCN2ZUc2dmVnh1WEc0Z0lIWmhjaUJ3Y21WbVpYSmxibU5sSUQwZ2J5NXpkRzl5WVdkbElDWW1JR3h6TG1kbGRDaHZMbk4wYjNKaFoyVXBPMXh1SUNCcFppQW9jSEpsWm1WeVpXNWpaU2tnZTF4dUlDQWdJRzh1WkdWbVlYVnNkRTF2WkdVZ1BTQndjbVZtWlhKbGJtTmxPMXh1SUNCOVhHNWNiaUFnZG1GeUlHUnliM0JoY21WaElEMGdkR0ZuS0hzZ1l6b2dKM2RyTFdOdmJuUmhhVzVsY2kxa2NtOXdKeUI5S1R0Y2JpQWdkbUZ5SUhOM2FYUmphR0p2WVhKa0lEMGdkR0ZuS0hzZ1l6b2dKM2RyTFhOM2FYUmphR0p2WVhKa0p5QjlLVHRjYmlBZ2RtRnlJR052YlcxaGJtUnpJRDBnZEdGbktIc2dZem9nSjNkckxXTnZiVzFoYm1Sekp5QjlLVHRjYmlBZ2RtRnlJR1ZrYVhSaFlteGxJRDBnZEdGbktIc2dZem9nV3lkM2F5MTNlWE5wZDNsbkp5d2dKM2RyTFdocFpHVW5YUzVqYjI1allYUW9ieTVqYkdGemMyVnpMbmQ1YzJsM2VXY3BMbXB2YVc0b0p5QW5LU0I5S1R0Y2JpQWdkbUZ5SUhOMWNtWmhZMlVnUFNCblpYUlRkWEptWVdObEtIUmxlSFJoY21WaExDQmxaR2wwWVdKc1pTd2daSEp2Y0dGeVpXRXBPMXh1SUNCMllYSWdhR2x6ZEc5eWVTQTlJRzVsZHlCSmJuQjFkRWhwYzNSdmNua29jM1Z5Wm1GalpTd2dKMjFoY210a2IzZHVKeWs3WEc0Z0lIWmhjaUJsWkdsMGIzSWdQU0I3WEc0Z0lDQWdZV1JrUTI5dGJXRnVaRG9nWVdSa1EyOXRiV0Z1WkN4Y2JpQWdJQ0JoWkdSRGIyMXRZVzVrUW5WMGRHOXVPaUJoWkdSRGIyMXRZVzVrUW5WMGRHOXVMRnh1SUNBZ0lISjFia052YlcxaGJtUTZJSEoxYmtOdmJXMWhibVFzWEc0Z0lDQWdjR0Z5YzJWTllYSnJaRzkzYmpvZ2J5NXdZWEp6WlUxaGNtdGtiM2R1TEZ4dUlDQWdJSEJoY25ObFNGUk5URG9nYnk1d1lYSnpaVWhVVFV3c1hHNGdJQ0FnWkdWemRISnZlVG9nWkdWemRISnZlU3hjYmlBZ0lDQjJZV3gxWlRvZ1oyVjBUV0Z5YTJSdmQyNHNYRzRnSUNBZ2RHVjRkR0Z5WldFNklIUmxlSFJoY21WaExGeHVJQ0FnSUdWa2FYUmhZbXhsT2lCdkxuZDVjMmwzZVdjZ1B5QmxaR2wwWVdKc1pTQTZJRzUxYkd3c1hHNGdJQ0FnYzJWMFRXOWtaVG9nY0dWeWMybHpkRTF2WkdVc1hHNGdJQ0FnYUdsemRHOXllVG9nZTF4dUlDQWdJQ0FnZFc1a2J6b2dhR2x6ZEc5eWVTNTFibVJ2TEZ4dUlDQWdJQ0FnY21Wa2J6b2dhR2x6ZEc5eWVTNXlaV1J2TEZ4dUlDQWdJQ0FnWTJGdVZXNWtiem9nYUdsemRHOXllUzVqWVc1VmJtUnZMRnh1SUNBZ0lDQWdZMkZ1VW1Wa2J6b2dhR2x6ZEc5eWVTNWpZVzVTWldSdlhHNGdJQ0FnZlN4Y2JpQWdJQ0J0YjJSbE9pQW5iV0Z5YTJSdmQyNG5YRzRnSUgwN1hHNGdJSFpoY2lCbGJuUnllU0E5SUhzZ2RHRTZJSFJsZUhSaGNtVmhMQ0JsWkdsMGIzSTZJR1ZrYVhSdmNpQjlPMXh1SUNCMllYSWdhU0E5SUdOaFkyaGxMbkIxYzJnb1pXNTBjbmtwTzF4dUlDQjJZWElnYTJGdWVXVkRiMjUwWlhoMElEMGdKM2R2YjJadFlYSnJYeWNnS3lCcE8xeHVJQ0IyWVhJZ2EyRnVlV1ZQY0hScGIyNXpJRDBnZTF4dUlDQWdJR1pwYkhSbGNqb2djR0Z5Wlc1MExGeHVJQ0FnSUdOdmJuUmxlSFE2SUd0aGJubGxRMjl1ZEdWNGRGeHVJQ0I5TzF4dUlDQjJZWElnYlc5a1pYTWdQU0I3WEc0Z0lDQWdiV0Z5YTJSdmQyNDZJSHRjYmlBZ0lDQWdJR0oxZEhSdmJqb2dkR0ZuS0hzZ2REb2dKMkoxZEhSdmJpY3NJR002SUNkM2F5MXRiMlJsSUhkckxXMXZaR1V0WVdOMGFYWmxKeUI5S1N4Y2JpQWdJQ0FnSUhObGREb2diV0Z5YTJSdmQyNU5iMlJsWEc0Z0lDQWdmU3hjYmlBZ0lDQm9kRzFzT2lCN1hHNGdJQ0FnSUNCaWRYUjBiMjQ2SUhSaFp5aDdJSFE2SUNkaWRYUjBiMjRuTENCak9pQW5kMnN0Ylc5a1pTQjNheTF0YjJSbExXbHVZV04wYVhabEp5QjlLU3hjYmlBZ0lDQWdJSE5sZERvZ2FIUnRiRTF2WkdWY2JpQWdJQ0I5TEZ4dUlDQWdJSGQ1YzJsM2VXYzZJSHRjYmlBZ0lDQWdJR0oxZEhSdmJqb2dkR0ZuS0hzZ2REb2dKMkoxZEhSdmJpY3NJR002SUNkM2F5MXRiMlJsSUhkckxXMXZaR1V0YVc1aFkzUnBkbVVuSUgwcExGeHVJQ0FnSUNBZ2MyVjBPaUIzZVhOcGQzbG5UVzlrWlZ4dUlDQWdJSDFjYmlBZ2ZUdGNiaUFnZG1GeUlIQnNZV05sTzF4dVhHNGdJSFJoWnloN0lIUTZJQ2R6Y0dGdUp5d2dZem9nSjNkckxXUnliM0F0ZEdWNGRDY3NJSGc2SUhOMGNtbHVaM011Y0hKdmJYQjBjeTVrY205d0xDQndPaUJrY205d1lYSmxZU0I5S1R0Y2JpQWdkR0ZuS0hzZ2REb2dKM0FuTENCak9pQmJKM2RyTFdSeWIzQXRhV052YmlkZExtTnZibU5oZENodkxtTnNZWE56WlhNdVpISnZjR2xqYjI0cExtcHZhVzRvSnlBbktTd2djRG9nWkhKdmNHRnlaV0VnZlNrN1hHNWNiaUFnWldScGRHRmliR1V1WTI5dWRHVnVkRVZrYVhSaFlteGxJRDBnZEhKMVpUdGNiaUFnYlc5a1pYTXViV0Z5YTJSdmQyNHVZblYwZEc5dUxuTmxkRUYwZEhKcFluVjBaU2duWkdsellXSnNaV1FuTENBblpHbHpZV0pzWldRbktUdGNiaUFnYlc5a1pVNWhiV1Z6TG1admNrVmhZMmdvWVdSa1RXOWtaU2s3WEc1Y2JpQWdhV1lnS0c4dWQzbHphWGQ1WnlrZ2UxeHVJQ0FnSUhCc1lXTmxJRDBnZEdGbktIc2dZem9nSjNkckxYZDVjMmwzZVdjdGNHeGhZMlZvYjJ4a1pYSWdkMnN0YUdsa1pTY3NJSGc2SUhSbGVIUmhjbVZoTG5Cc1lXTmxhRzlzWkdWeUlIMHBPMXh1SUNBZ0lHTnliM056ZG1WdWRDNWhaR1FvY0d4aFkyVXNJQ2RqYkdsamF5Y3NJR1p2WTNWelJXUnBkR0ZpYkdVcE8xeHVJQ0I5WEc1Y2JpQWdhV1lnS0c4dVpHVm1ZWFZzZEUxdlpHVWdKaVlnYjF0dkxtUmxabUYxYkhSTmIyUmxYU2tnZTF4dUlDQWdJRzF2WkdWelcyOHVaR1ZtWVhWc2RFMXZaR1ZkTG5ObGRDZ3BPMXh1SUNCOUlHVnNjMlVnYVdZZ0tHOHViV0Z5YTJSdmQyNHBJSHRjYmlBZ0lDQnRiMlJsY3k1dFlYSnJaRzkzYmk1elpYUW9LVHRjYmlBZ2ZTQmxiSE5sSUdsbUlDaHZMbWgwYld3cElIdGNiaUFnSUNCdGIyUmxjeTVvZEcxc0xuTmxkQ2dwTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUcxdlpHVnpMbmQ1YzJsM2VXY3VjMlYwS0NrN1hHNGdJSDFjYmx4dUlDQmlhVzVrUTI5dGJXRnVaSE1vYzNWeVptRmpaU3dnYnl3Z1pXUnBkRzl5S1R0Y2JpQWdZbWx1WkVWMlpXNTBjeWdwTzF4dVhHNGdJSEpsZEhWeWJpQmxaR2wwYjNJN1hHNWNiaUFnWm5WdVkzUnBiMjRnWVdSa1RXOWtaU0FvYVdRcElIdGNiaUFnSUNCMllYSWdZblYwZEc5dUlEMGdiVzlrWlhOYmFXUmRMbUoxZEhSdmJqdGNiaUFnSUNCMllYSWdZM1Z6ZEc5dElEMGdieTV5Wlc1a1pYSXViVzlrWlhNN1hHNGdJQ0FnYVdZZ0tHOWJhV1JkS1NCN1hHNGdJQ0FnSUNCemQybDBZMmhpYjJGeVpDNWhjSEJsYm1SRGFHbHNaQ2hpZFhSMGIyNHBPMXh1SUNBZ0lDQWdLSFI1Y0dWdlppQmpkWE4wYjIwZ1BUMDlJQ2RtZFc1amRHbHZiaWNnUHlCamRYTjBiMjBnT2lCeVpXNWtaWEpsY25NdWJXOWtaWE1wS0dKMWRIUnZiaXdnYVdRcE8xeHVJQ0FnSUNBZ1kzSnZjM04yWlc1MExtRmtaQ2hpZFhSMGIyNHNJQ2RqYkdsamF5Y3NJRzF2WkdWelcybGtYUzV6WlhRcE8xeHVJQ0FnSUNBZ1luVjBkRzl1TG5SNWNHVWdQU0FuWW5WMGRHOXVKenRjYmlBZ0lDQWdJR0oxZEhSdmJpNTBZV0pKYm1SbGVDQTlJQzB4TzF4dVhHNGdJQ0FnSUNCMllYSWdkR2wwYkdVZ1BTQnpkSEpwYm1kekxuUnBkR3hsYzF0cFpGMDdYRzRnSUNBZ0lDQnBaaUFvZEdsMGJHVXBJSHRjYmlBZ0lDQWdJQ0FnWW5WMGRHOXVMbk5sZEVGMGRISnBZblYwWlNnbmRHbDBiR1VuTENCdFlXTWdQeUJ0WVdOcFpua29kR2wwYkdVcElEb2dkR2wwYkdVcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHSnBibVJGZG1WdWRITWdLSEpsYlc5MlpTa2dlMXh1SUNBZ0lIWmhjaUJoY2lBOUlISmxiVzkyWlNBL0lDZHliU2NnT2lBbllXUmtKenRjYmlBZ0lDQjJZWElnYlc5MklEMGdjbVZ0YjNabElEOGdKM0psYlc5MlpVTm9hV3hrSnlBNklDZGhjSEJsYm1SRGFHbHNaQ2M3WEc0Z0lDQWdhV1lnS0hKbGJXOTJaU2tnZTF4dUlDQWdJQ0FnYTJGdWVXVXVZMnhsWVhJb2EyRnVlV1ZEYjI1MFpYaDBLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2FXWWdLRzh1YldGeWEyUnZkMjRwSUhzZ2EyRnVlV1V1YjI0b0oyTnRaQ3R0Snl3Z2EyRnVlV1ZQY0hScGIyNXpMQ0J0WVhKclpHOTNiazF2WkdVcE95QjlYRzRnSUNBZ0lDQnBaaUFvYnk1b2RHMXNLU0I3SUd0aGJubGxMbTl1S0NkamJXUXJhQ2NzSUd0aGJubGxUM0IwYVc5dWN5d2dhSFJ0YkUxdlpHVXBPeUI5WEc0Z0lDQWdJQ0JwWmlBb2J5NTNlWE5wZDNsbktTQjdJR3RoYm5sbExtOXVLQ2RqYldRcmNDY3NJR3RoYm5sbFQzQjBhVzl1Y3l3Z2QzbHphWGQ1WjAxdlpHVXBPeUI5WEc0Z0lDQWdmVnh1SUNBZ0lHTnNZWE56WlhOYllYSmRLSEJoY21WdWRDd2dKM2RyTFdOdmJuUmhhVzVsY2ljcE8xeHVJQ0FnSUhCaGNtVnVkRnR0YjNaZEtHVmthWFJoWW14bEtUdGNiaUFnSUNCcFppQW9jR3hoWTJVcElIc2djR0Z5Wlc1MFcyMXZkbDBvY0d4aFkyVXBPeUI5WEc0Z0lDQWdjR0Z5Wlc1MFcyMXZkbDBvWTI5dGJXRnVaSE1wTzF4dUlDQWdJSEJoY21WdWRGdHRiM1pkS0hOM2FYUmphR0p2WVhKa0tUdGNiaUFnSUNCcFppQW9LRzh1YVcxaFoyVnpJSHg4SUc4dVlYUjBZV05vYldWdWRITXBJQ1ltSUc4dWVHaHlLU0I3WEc0Z0lDQWdJQ0J3WVhKbGJuUmJiVzkyWFNoa2NtOXdZWEpsWVNrN1hHNGdJQ0FnSUNCMWNHeHZZV1J6S0hCaGNtVnVkQ3dnWkhKdmNHRnlaV0VzSUdWa2FYUnZjaXdnYnl3Z2NtVnRiM1psS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCa1pYTjBjbTk1SUNncElIdGNiaUFnSUNCcFppQW9aV1JwZEc5eUxtMXZaR1VnSVQwOUlDZHRZWEpyWkc5M2JpY3BJSHRjYmlBZ0lDQWdJSFJsZUhSaGNtVmhMblpoYkhWbElEMGdaMlYwVFdGeWEyUnZkMjRvS1R0Y2JpQWdJQ0I5WEc0Z0lDQWdZMnhoYzNObGN5NXliU2gwWlhoMFlYSmxZU3dnSjNkckxXaHBaR1VuS1R0Y2JpQWdJQ0JpYVc1a1JYWmxiblJ6S0hSeWRXVXBPMXh1SUNBZ0lHUmxiR1YwWlNCallXTm9aVnRwSUMwZ01WMDdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ0WVhKclpHOTNiazF2WkdVZ0tHVXBJSHNnY0dWeWMybHpkRTF2WkdVb0oyMWhjbXRrYjNkdUp5d2daU2s3SUgxY2JpQWdablZ1WTNScGIyNGdhSFJ0YkUxdlpHVWdLR1VwSUhzZ2NHVnljMmx6ZEUxdlpHVW9KMmgwYld3bkxDQmxLVHNnZlZ4dUlDQm1kVzVqZEdsdmJpQjNlWE5wZDNsblRXOWtaU0FvWlNrZ2V5QndaWEp6YVhOMFRXOWtaU2duZDNsemFYZDVaeWNzSUdVcE95QjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2NHVnljMmx6ZEUxdlpHVWdLRzVsZUhSTmIyUmxMQ0JsS1NCN1hHNGdJQ0FnZG1GeUlISmxjM1J2Y21WVFpXeGxZM1JwYjI0N1hHNGdJQ0FnZG1GeUlHTjFjbkpsYm5STmIyUmxJRDBnWldScGRHOXlMbTF2WkdVN1hHNGdJQ0FnZG1GeUlHOXNaQ0E5SUcxdlpHVnpXMk4xY25KbGJuUk5iMlJsWFM1aWRYUjBiMjQ3WEc0Z0lDQWdkbUZ5SUdKMWRIUnZiaUE5SUcxdlpHVnpXMjVsZUhSTmIyUmxYUzVpZFhSMGIyNDdYRzRnSUNBZ2RtRnlJR1p2WTNWemFXNW5JRDBnSVNGbElIeDhJR1J2WXk1aFkzUnBkbVZGYkdWdFpXNTBJRDA5UFNCMFpYaDBZWEpsWVNCOGZDQmtiMk11WVdOMGFYWmxSV3hsYldWdWRDQTlQVDBnWldScGRHRmliR1U3WEc1Y2JpQWdJQ0J6ZEc5d0tHVXBPMXh1WEc0Z0lDQWdhV1lnS0dOMWNuSmxiblJOYjJSbElEMDlQU0J1WlhoMFRXOWtaU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lIMWNibHh1SUNBZ0lISmxjM1J2Y21WVFpXeGxZM1JwYjI0Z1BTQm1iMk4xYzJsdVp5QW1KaUJ5WlcxbGJXSmxjbE5sYkdWamRHbHZiaWhvYVhOMGIzSjVMQ0J2S1R0Y2JpQWdJQ0IwWlhoMFlYSmxZUzVpYkhWeUtDazdJQzh2SUdGMlpYSjBJR05vY205dFpTQnlaWEJoYVc1MElHSjFaM05jYmx4dUlDQWdJR2xtSUNodVpYaDBUVzlrWlNBOVBUMGdKMjFoY210a2IzZHVKeWtnZTF4dUlDQWdJQ0FnYVdZZ0tHTjFjbkpsYm5STmIyUmxJRDA5UFNBbmFIUnRiQ2NwSUh0Y2JpQWdJQ0FnSUNBZ2RHVjRkR0Z5WldFdWRtRnNkV1VnUFNCdkxuQmhjbk5sU0ZSTlRDaDBaWGgwWVhKbFlTNTJZV3gxWlNrdWRISnBiU2dwTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnZEdWNGRHRnlaV0V1ZG1Gc2RXVWdQU0J2TG5CaGNuTmxTRlJOVENobFpHbDBZV0pzWlNrdWRISnBiU2dwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBnWld4elpTQnBaaUFvYm1WNGRFMXZaR1VnUFQwOUlDZG9kRzFzSnlrZ2UxeHVJQ0FnSUNBZ2FXWWdLR04xY25KbGJuUk5iMlJsSUQwOVBTQW5iV0Z5YTJSdmQyNG5LU0I3WEc0Z0lDQWdJQ0FnSUhSbGVIUmhjbVZoTG5aaGJIVmxJRDBnYnk1d1lYSnpaVTFoY210a2IzZHVLSFJsZUhSaGNtVmhMblpoYkhWbEtTNTBjbWx0S0NrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCMFpYaDBZWEpsWVM1MllXeDFaU0E5SUdWa2FYUmhZbXhsTG1sdWJtVnlTRlJOVEM1MGNtbHRLQ2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2h1WlhoMFRXOWtaU0E5UFQwZ0ozZDVjMmwzZVdjbktTQjdYRzRnSUNBZ0lDQnBaaUFvWTNWeWNtVnVkRTF2WkdVZ1BUMDlJQ2R0WVhKclpHOTNiaWNwSUh0Y2JpQWdJQ0FnSUNBZ1pXUnBkR0ZpYkdVdWFXNXVaWEpJVkUxTUlEMGdieTV3WVhKelpVMWhjbXRrYjNkdUtIUmxlSFJoY21WaExuWmhiSFZsS1M1eVpYQnNZV05sS0hKd1lYSmhaM0poY0dnc0lDY25LUzUwY21sdEtDazdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQmxaR2wwWVdKc1pTNXBibTVsY2toVVRVd2dQU0IwWlhoMFlYSmxZUzUyWVd4MVpTNXlaWEJzWVdObEtISndZWEpoWjNKaGNHZ3NJQ2NuS1M1MGNtbHRLQ2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0c1bGVIUk5iMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y3BJSHRjYmlBZ0lDQWdJR05zWVhOelpYTXVZV1JrS0hSbGVIUmhjbVZoTENBbmQyc3RhR2xrWlNjcE8xeHVJQ0FnSUNBZ1kyeGhjM05sY3k1eWJTaGxaR2wwWVdKc1pTd2dKM2RyTFdocFpHVW5LVHRjYmlBZ0lDQWdJR2xtSUNod2JHRmpaU2tnZXlCamJHRnpjMlZ6TG5KdEtIQnNZV05sTENBbmQyc3RhR2xrWlNjcE95QjlYRzRnSUNBZ0lDQnBaaUFvWm05amRYTnBibWNwSUhzZ2MyVjBWR2x0Wlc5MWRDaG1iMk4xYzBWa2FYUmhZbXhsTENBd0tUc2dmVnh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCamJHRnpjMlZ6TG5KdEtIUmxlSFJoY21WaExDQW5kMnN0YUdsa1pTY3BPMXh1SUNBZ0lDQWdZMnhoYzNObGN5NWhaR1FvWldScGRHRmliR1VzSUNkM2F5MW9hV1JsSnlrN1hHNGdJQ0FnSUNCcFppQW9jR3hoWTJVcElIc2dZMnhoYzNObGN5NWhaR1FvY0d4aFkyVXNJQ2QzYXkxb2FXUmxKeWs3SUgxY2JpQWdJQ0FnSUdsbUlDaG1iMk4xYzJsdVp5a2dleUIwWlhoMFlYSmxZUzVtYjJOMWN5Z3BPeUI5WEc0Z0lDQWdmVnh1SUNBZ0lHTnNZWE56WlhNdVlXUmtLR0oxZEhSdmJpd2dKM2RyTFcxdlpHVXRZV04wYVhabEp5azdYRzRnSUNBZ1kyeGhjM05sY3k1eWJTaHZiR1FzSUNkM2F5MXRiMlJsTFdGamRHbDJaU2NwTzF4dUlDQWdJR05zWVhOelpYTXVZV1JrS0c5c1pDd2dKM2RyTFcxdlpHVXRhVzVoWTNScGRtVW5LVHRjYmlBZ0lDQmpiR0Z6YzJWekxuSnRLR0oxZEhSdmJpd2dKM2RyTFcxdlpHVXRhVzVoWTNScGRtVW5LVHRjYmlBZ0lDQmlkWFIwYjI0dWMyVjBRWFIwY21saWRYUmxLQ2RrYVhOaFlteGxaQ2NzSUNka2FYTmhZbXhsWkNjcE8xeHVJQ0FnSUc5c1pDNXlaVzF2ZG1WQmRIUnlhV0oxZEdVb0oyUnBjMkZpYkdWa0p5azdYRzRnSUNBZ1pXUnBkRzl5TG0xdlpHVWdQU0J1WlhoMFRXOWtaVHRjYmx4dUlDQWdJR2xtSUNodkxuTjBiM0poWjJVcElIc2diSE11YzJWMEtHOHVjM1J2Y21GblpTd2dibVY0ZEUxdlpHVXBPeUI5WEc1Y2JpQWdJQ0JvYVhOMGIzSjVMbk5sZEVsdWNIVjBUVzlrWlNodVpYaDBUVzlrWlNrN1hHNGdJQ0FnYVdZZ0tISmxjM1J2Y21WVFpXeGxZM1JwYjI0cElIc2djbVZ6ZEc5eVpWTmxiR1ZqZEdsdmJpZ3BPeUI5WEc0Z0lDQWdabWx5WlV4aGRHVnlLQ2QzYjI5bWJXRnlheTF0YjJSbExXTm9ZVzVuWlNjcE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdabWx5WlV4aGRHVnlJQ2gwZVhCbEtTQjdYRzRnSUNBZ2MyVjBWR2x0Wlc5MWRDaG1kVzVqZEdsdmJpQm1hWEpsSUNncElIdGNiaUFnSUNBZ0lHTnliM056ZG1WdWRDNW1ZV0p5YVdOaGRHVW9kR1Y0ZEdGeVpXRXNJSFI1Y0dVcE8xeHVJQ0FnSUgwc0lEQXBPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWm05amRYTkZaR2wwWVdKc1pTQW9LU0I3WEc0Z0lDQWdaV1JwZEdGaWJHVXVabTlqZFhNb0tUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR2RsZEUxaGNtdGtiM2R1SUNncElIdGNiaUFnSUNCcFppQW9aV1JwZEc5eUxtMXZaR1VnUFQwOUlDZDNlWE5wZDNsbkp5a2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHOHVjR0Z5YzJWSVZFMU1LR1ZrYVhSaFlteGxLVHRjYmlBZ0lDQjlYRzRnSUNBZ2FXWWdLR1ZrYVhSdmNpNXRiMlJsSUQwOVBTQW5hSFJ0YkNjcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCdkxuQmhjbk5sU0ZSTlRDaDBaWGgwWVhKbFlTNTJZV3gxWlNrN1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQjBaWGgwWVhKbFlTNTJZV3gxWlR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHRmtaRU52YlcxaGJtUkNkWFIwYjI0Z0tHbGtMQ0JqYjIxaWJ5d2dabTRwSUh0Y2JpQWdJQ0JwWmlBb1lYSm5kVzFsYm5SekxteGxibWQwYUNBOVBUMGdNaWtnZTF4dUlDQWdJQ0FnWm00Z1BTQmpiMjFpYnp0Y2JpQWdJQ0FnSUdOdmJXSnZJRDBnYm5Wc2JEdGNiaUFnSUNCOVhHNGdJQ0FnZG1GeUlHSjFkSFJ2YmlBOUlIUmhaeWg3SUhRNklDZGlkWFIwYjI0bkxDQmpPaUFuZDJzdFkyOXRiV0Z1WkNjc0lIQTZJR052YlcxaGJtUnpJSDBwTzF4dUlDQWdJSFpoY2lCamRYTjBiMjBnUFNCdkxuSmxibVJsY2k1amIyMXRZVzVrY3p0Y2JpQWdJQ0IyWVhJZ2NtVnVaR1Z5SUQwZ2RIbHdaVzltSUdOMWMzUnZiU0E5UFQwZ0oyWjFibU4wYVc5dUp5QS9JR04xYzNSdmJTQTZJSEpsYm1SbGNtVnljeTVqYjIxdFlXNWtjenRjYmlBZ0lDQjJZWElnZEdsMGJHVWdQU0J6ZEhKcGJtZHpMblJwZEd4bGMxdHBaRjA3WEc0Z0lDQWdhV1lnS0hScGRHeGxLU0I3WEc0Z0lDQWdJQ0JpZFhSMGIyNHVjMlYwUVhSMGNtbGlkWFJsS0NkMGFYUnNaU2NzSUcxaFl5QS9JRzFoWTJsbWVTaDBhWFJzWlNrZ09pQjBhWFJzWlNrN1hHNGdJQ0FnZlZ4dUlDQWdJR0oxZEhSdmJpNTBlWEJsSUQwZ0oySjFkSFJ2YmljN1hHNGdJQ0FnWW5WMGRHOXVMblJoWWtsdVpHVjRJRDBnTFRFN1hHNGdJQ0FnY21WdVpHVnlLR0oxZEhSdmJpd2dhV1FwTzF4dUlDQWdJR055YjNOemRtVnVkQzVoWkdRb1luVjBkRzl1TENBblkyeHBZMnNuTENCblpYUkRiMjF0WVc1a1NHRnVaR3hsY2loemRYSm1ZV05sTENCb2FYTjBiM0o1TENCbWJpa3BPMXh1SUNBZ0lHbG1JQ2hqYjIxaWJ5a2dlMXh1SUNBZ0lDQWdZV1JrUTI5dGJXRnVaQ2hqYjIxaWJ5d2dabTRwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1luVjBkRzl1TzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1lXUmtRMjl0YldGdVpDQW9ZMjl0WW04c0lHWnVLU0I3WEc0Z0lDQWdhMkZ1ZVdVdWIyNG9ZMjl0WW04c0lHdGhibmxsVDNCMGFXOXVjeXdnWjJWMFEyOXRiV0Z1WkVoaGJtUnNaWElvYzNWeVptRmpaU3dnYUdsemRHOXllU3dnWm00cEtUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSEoxYmtOdmJXMWhibVFnS0dadUtTQjdYRzRnSUNBZ1oyVjBRMjl0YldGdVpFaGhibVJzWlhJb2MzVnlabUZqWlN3Z2FHbHpkRzl5ZVN3Z2NtVmhjbkpoYm1kbEtTaHVkV3hzS1R0Y2JpQWdJQ0JtZFc1amRHbHZiaUJ5WldGeWNtRnVaMlVnS0dVc0lHMXZaR1VzSUdOb2RXNXJjeWtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR1p1TG1OaGJHd29kR2hwY3l3Z1kyaDFibXR6TENCdGIyUmxLVHRjYmlBZ0lDQjlYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnZEdGbklDaHZjSFJwYjI1ektTQjdYRzRnSUhaaGNpQnZJRDBnYjNCMGFXOXVjeUI4ZkNCN2ZUdGNiaUFnZG1GeUlHVnNJRDBnWkc5akxtTnlaV0YwWlVWc1pXMWxiblFvYnk1MElIeDhJQ2RrYVhZbktUdGNiaUFnWld3dVkyeGhjM05PWVcxbElEMGdieTVqSUh4OElDY25PMXh1SUNCelpYUlVaWGgwS0dWc0xDQnZMbmdnZkh3Z0p5Y3BPMXh1SUNCcFppQW9ieTV3S1NCN0lHOHVjQzVoY0hCbGJtUkRhR2xzWkNobGJDazdJSDFjYmlBZ2NtVjBkWEp1SUdWc08xeHVmVnh1WEc1bWRXNWpkR2x2YmlCemRHOXdJQ2hsS1NCN1hHNGdJR2xtSUNobEtTQjdJR1V1Y0hKbGRtVnVkRVJsWm1GMWJIUW9LVHNnWlM1emRHOXdVSEp2Y0dGbllYUnBiMjRvS1RzZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCdFlXTnBabmtnS0hSbGVIUXBJSHRjYmlBZ2NtVjBkWEp1SUhSbGVIUmNiaUFnSUNBdWNtVndiR0ZqWlNndlhGeGlZM1J5YkZ4Y1lpOXBMQ0FuWEZ4MU1qTXhPQ2NwWEc0Z0lDQWdMbkpsY0d4aFkyVW9MMXhjWW1Gc2RGeGNZaTlwTENBblhGeDFNak15TlNjcFhHNGdJQ0FnTG5KbGNHeGhZMlVvTDF4Y1luTm9hV1owWEZ4aUwya3NJQ2RjWEhVeU1XVTNKeWs3WEc1OVhHNWNibmR2YjJadFlYSnJMbVpwYm1RZ1BTQm1hVzVrTzF4dWQyOXZabTFoY21zdWMzUnlhVzVuY3lBOUlITjBjbWx1WjNNN1hHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIZHZiMlp0WVhKck8xeHVJbDE5IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB4aHJTdHViIChvcHRpb25zKSB7XG4gIHRocm93IG5ldyBFcnJvcignV29vZm1hcmsgaXMgbWlzc2luZyBYSFIgY29uZmlndXJhdGlvbi4gQ2FuXFwndCByZXF1ZXN0ICcgKyBvcHRpb25zLnVybCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geGhyU3R1YjtcbiJdfQ==
