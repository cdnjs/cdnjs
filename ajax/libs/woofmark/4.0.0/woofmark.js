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
    var sel = (o.getSelection || win.getSelection)();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS90YWlsb3JtYWRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2VsbCA9IHJlcXVpcmUoJ3NlbGwnKTtcbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciB0aHJvdHRsZSA9IHJlcXVpcmUoJy4vdGhyb3R0bGUnKTtcbnZhciBwcm9wcyA9IFtcbiAgJ2RpcmVjdGlvbicsXG4gICdib3hTaXppbmcnLFxuICAnd2lkdGgnLFxuICAnaGVpZ2h0JyxcbiAgJ292ZXJmbG93WCcsXG4gICdvdmVyZmxvd1knLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICdib3JkZXJCb3R0b21XaWR0aCcsXG4gICdib3JkZXJMZWZ0V2lkdGgnLFxuICAncGFkZGluZ1RvcCcsXG4gICdwYWRkaW5nUmlnaHQnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdwYWRkaW5nTGVmdCcsXG4gICdmb250U3R5bGUnLFxuICAnZm9udFZhcmlhbnQnLFxuICAnZm9udFdlaWdodCcsXG4gICdmb250U3RyZXRjaCcsXG4gICdmb250U2l6ZScsXG4gICdmb250U2l6ZUFkanVzdCcsXG4gICdsaW5lSGVpZ2h0JyxcbiAgJ2ZvbnRGYW1pbHknLFxuICAndGV4dEFsaWduJyxcbiAgJ3RleHRUcmFuc2Zvcm0nLFxuICAndGV4dEluZGVudCcsXG4gICd0ZXh0RGVjb3JhdGlvbicsXG4gICdsZXR0ZXJTcGFjaW5nJyxcbiAgJ3dvcmRTcGFjaW5nJ1xuXTtcbnZhciB3aW4gPSBnbG9iYWw7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgZmYgPSB3aW4ubW96SW5uZXJTY3JlZW5YICE9PSBudWxsICYmIHdpbi5tb3pJbm5lclNjcmVlblggIT09IHZvaWQgMDtcblxuZnVuY3Rpb24gdGFpbG9ybWFkZSAoZWwsIG9wdGlvbnMpIHtcbiAgdmFyIHRleHRJbnB1dCA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJztcbiAgdmFyIHRocm90dGxlZFJlZnJlc2ggPSB0aHJvdHRsZShyZWZyZXNoLCAzMCk7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcblxuICBiaW5kKCk7XG5cbiAgcmV0dXJuIHtcbiAgICByZWFkOiByZWFkUG9zaXRpb24sXG4gICAgcmVmcmVzaDogdGhyb3R0bGVkUmVmcmVzaCxcbiAgICBkZXN0cm95OiBkZXN0cm95XG4gIH07XG5cbiAgZnVuY3Rpb24gbm9vcCAoKSB7fVxuICBmdW5jdGlvbiByZWFkUG9zaXRpb24gKCkgeyByZXR1cm4gKHRleHRJbnB1dCA/IGNvb3Jkc1RleHQgOiBjb29yZHNIVE1MKSgpOyB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAoKSB7XG4gICAgaWYgKG8uc2xlZXBpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChvLnVwZGF0ZSB8fCBub29wKShyZWFkUG9zaXRpb24oKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNUZXh0ICgpIHtcbiAgICB2YXIgcCA9IHNlbGwoZWwpO1xuICAgIHZhciBjb250ZXh0ID0gcHJlcGFyZSgpO1xuICAgIHZhciByZWFkaW5ncyA9IHJlYWRUZXh0Q29vcmRzKGNvbnRleHQsIHAuc3RhcnQpO1xuICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKGNvbnRleHQubWlycm9yKTtcbiAgICByZXR1cm4gcmVhZGluZ3M7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNIVE1MICgpIHtcbiAgICB2YXIgc2VsID0gKG8uZ2V0U2VsZWN0aW9uIHx8IHdpbi5nZXRTZWxlY3Rpb24pKCk7XG4gICAgaWYgKHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICB2YXIgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgIHZhciBuZWVkc1RvV29ya0Fyb3VuZE5ld2xpbmVCdWcgPSByYW5nZS5zdGFydENvbnRhaW5lci5ub2RlTmFtZSA9PT0gJ1AnICYmIHJhbmdlLnN0YXJ0T2Zmc2V0ID09PSAwO1xuICAgICAgaWYgKG5lZWRzVG9Xb3JrQXJvdW5kTmV3bGluZUJ1Zykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm9mZnNldExlZnQsXG4gICAgICAgICAgeTogcmFuZ2Uuc3RhcnRDb250YWluZXIub2Zmc2V0VG9wLFxuICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAocmFuZ2UuZ2V0Q2xpZW50UmVjdHMpIHtcbiAgICAgICAgdmFyIHJlY3RzID0gcmFuZ2UuZ2V0Q2xpZW50UmVjdHMoKTtcbiAgICAgICAgaWYgKHJlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcmVjdHNbMF0ubGVmdCxcbiAgICAgICAgICAgIHk6IHJlY3RzWzBdLnRvcCxcbiAgICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB4OiAwLCB5OiAwIH07XG4gIH1cblxuICBmdW5jdGlvbiByZWFkVGV4dENvb3JkcyAoY29udGV4dCwgcCkge1xuICAgIHZhciByZXN0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB2YXIgbWlycm9yID0gY29udGV4dC5taXJyb3I7XG4gICAgdmFyIGNvbXB1dGVkID0gY29udGV4dC5jb21wdXRlZDtcblxuICAgIHdyaXRlKG1pcnJvciwgcmVhZChlbCkuc3Vic3RyaW5nKDAsIHApKTtcblxuICAgIGlmIChlbC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICBtaXJyb3IudGV4dENvbnRlbnQgPSBtaXJyb3IudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICdcXHUwMGEwJyk7XG4gICAgfVxuXG4gICAgd3JpdGUocmVzdCwgcmVhZChlbCkuc3Vic3RyaW5nKHApIHx8ICcuJyk7XG5cbiAgICBtaXJyb3IuYXBwZW5kQ2hpbGQocmVzdCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogcmVzdC5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlckxlZnRXaWR0aCddKSxcbiAgICAgIHk6IHJlc3Qub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlclRvcFdpZHRoJ10pXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGVsKSB7XG4gICAgcmV0dXJuIHRleHRJbnB1dCA/IGVsLnZhbHVlIDogZWwuaW5uZXJIVE1MO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlcGFyZSAoKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gd2luLmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsKSA6IGVsLmN1cnJlbnRTdHlsZTtcbiAgICB2YXIgbWlycm9yID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBzdHlsZSA9IG1pcnJvci5zdHlsZTtcblxuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKG1pcnJvcik7XG5cbiAgICBpZiAoZWwudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7XG4gICAgfVxuICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnO1xuICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgcHJvcHMuZm9yRWFjaChjb3B5KTtcblxuICAgIGlmIChmZikge1xuICAgICAgc3R5bGUud2lkdGggPSBwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyICsgJ3B4JztcbiAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKSB7XG4gICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICByZXR1cm4geyBtaXJyb3I6IG1pcnJvciwgY29tcHV0ZWQ6IGNvbXB1dGVkIH07XG5cbiAgICBmdW5jdGlvbiBjb3B5IChwcm9wKSB7XG4gICAgICBzdHlsZVtwcm9wXSA9IGNvbXB1dGVkW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChlbCwgdmFsdWUpIHtcbiAgICBpZiAodGV4dElucHV0KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXlkb3duJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleXVwJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2lucHV0JywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ3Bhc3RlJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2NoYW5nZScsIHRocm90dGxlZFJlZnJlc2gpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgYmluZCh0cnVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhaWxvcm1hZGU7XG4iXX0=
},{"./throttle":4,"crossvent":6,"sell":2}],4:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0U2VsZWN0aW9uO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciByYW5nZVRvVGV4dFJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZVRvVGV4dFJhbmdlJyk7XG52YXIgZ2V0U2VsZWN0aW9uUmF3ID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb25SYXcnKTtcbnZhciBnZXRTZWxlY3Rpb25OdWxsT3AgPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvbk51bGxPcCcpO1xudmFyIGdldFNlbGVjdGlvblN5bnRoZXRpYyA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uU3ludGhldGljJyk7XG52YXIgaXNIb3N0ID0gcmVxdWlyZSgnLi9pc0hvc3QnKTtcbmlmIChpc0hvc3QubWV0aG9kKGdsb2JhbCwgJ2dldFNlbGVjdGlvbicpKSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvblJhdztcbn0gZWxzZSBpZiAodHlwZW9mIGRvYy5zZWxlY3Rpb24gPT09ICdvYmplY3QnICYmIGRvYy5zZWxlY3Rpb24pIHtcbiAgZ2V0U2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uU3ludGhldGljO1xufSBlbHNlIHtcbiAgZ2V0U2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uTnVsbE9wO1xufVxuXG5nZXRTZWxlY3Rpb24ucmFuZ2VUb1RleHRSYW5nZSA9IHJhbmdlVG9UZXh0UmFuZ2U7XG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvbjtcbiJdfQ==
},{"./getSelectionNullOp":14,"./getSelectionRaw":15,"./getSelectionSynthetic":16,"./isHost":17,"./rangeToTextRange":18}],14:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL3JhbmdlVG9UZXh0UmFuZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYm9keSA9IGRvYy5ib2R5O1xuXG5mdW5jdGlvbiByYW5nZVRvVGV4dFJhbmdlIChyYW5nZSkge1xuICBpZiAocmFuZ2UuY29sbGFwc2VkKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlKHsgbm9kZTogcmFuZ2Uuc3RhcnRDb250YWluZXIsIG9mZnNldDogcmFuZ2Uuc3RhcnRPZmZzZXQgfSwgdHJ1ZSk7XG4gIH1cbiAgdmFyIHN0YXJ0UmFuZ2UgPSBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSh7IG5vZGU6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLCBvZmZzZXQ6IHJhbmdlLnN0YXJ0T2Zmc2V0IH0sIHRydWUpO1xuICB2YXIgZW5kUmFuZ2UgPSBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSh7IG5vZGU6IHJhbmdlLmVuZENvbnRhaW5lciwgb2Zmc2V0OiByYW5nZS5lbmRPZmZzZXQgfSwgZmFsc2UpO1xuICB2YXIgdGV4dFJhbmdlID0gYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgdGV4dFJhbmdlLnNldEVuZFBvaW50KCdTdGFydFRvU3RhcnQnLCBzdGFydFJhbmdlKTtcbiAgdGV4dFJhbmdlLnNldEVuZFBvaW50KCdFbmRUb0VuZCcsIGVuZFJhbmdlKTtcbiAgcmV0dXJuIHRleHRSYW5nZTtcbn1cblxuZnVuY3Rpb24gaXNDaGFyYWN0ZXJEYXRhTm9kZSAobm9kZSkge1xuICB2YXIgdCA9IG5vZGUubm9kZVR5cGU7XG4gIHJldHVybiB0ID09PSAzIHx8IHQgPT09IDQgfHwgdCA9PT0gOCA7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlIChwLCBzdGFydGluZykge1xuICB2YXIgYm91bmQ7XG4gIHZhciBwYXJlbnQ7XG4gIHZhciBvZmZzZXQgPSBwLm9mZnNldDtcbiAgdmFyIHdvcmtpbmdOb2RlO1xuICB2YXIgY2hpbGROb2RlcztcbiAgdmFyIHJhbmdlID0gYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgdmFyIGRhdGEgPSBpc0NoYXJhY3RlckRhdGFOb2RlKHAubm9kZSk7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICBib3VuZCA9IHAubm9kZTtcbiAgICBwYXJlbnQgPSBib3VuZC5wYXJlbnROb2RlO1xuICB9IGVsc2Uge1xuICAgIGNoaWxkTm9kZXMgPSBwLm5vZGUuY2hpbGROb2RlcztcbiAgICBib3VuZCA9IG9mZnNldCA8IGNoaWxkTm9kZXMubGVuZ3RoID8gY2hpbGROb2Rlc1tvZmZzZXRdIDogbnVsbDtcbiAgICBwYXJlbnQgPSBwLm5vZGU7XG4gIH1cblxuICB3b3JraW5nTm9kZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHdvcmtpbmdOb2RlLmlubmVySFRNTCA9ICcmI2ZlZmY7JztcblxuICBpZiAoYm91bmQpIHtcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHdvcmtpbmdOb2RlLCBib3VuZCk7XG4gIH0gZWxzZSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHdvcmtpbmdOb2RlKTtcbiAgfVxuXG4gIHJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KHdvcmtpbmdOb2RlKTtcbiAgcmFuZ2UuY29sbGFwc2UoIXN0YXJ0aW5nKTtcbiAgcGFyZW50LnJlbW92ZUNoaWxkKHdvcmtpbmdOb2RlKTtcblxuICBpZiAoZGF0YSkge1xuICAgIHJhbmdlW3N0YXJ0aW5nID8gJ21vdmVTdGFydCcgOiAnbW92ZUVuZCddKCdjaGFyYWN0ZXInLCBvZmZzZXQpO1xuICB9XG4gIHJldHVybiByYW5nZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByYW5nZVRvVGV4dFJhbmdlO1xuIl19
},{}],19:[function(require,module,exports){
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

},{"./InputState":20,"crossvent":6}],20:[function(require,module,exports){
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
},{"./fixEOL":27,"./html/HtmlChunks":31,"./isVisibleElement":40,"./markdown/MarkdownChunks":42}],21:[function(require,module,exports){
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

},{"./html/blockquote":32,"./html/boldOrItalic":33,"./html/codeblock":34,"./html/heading":35,"./html/hr":36,"./html/linkOrImageOrAttachment":37,"./html/list":38,"./markdown/blockquote":43,"./markdown/boldOrItalic":44,"./markdown/codeblock":45,"./markdown/heading":46,"./markdown/hr":47,"./markdown/linkOrImageOrAttachment":48,"./markdown/list":49,"crossvent":6}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
'use strict';

function fixEOL (text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

module.exports = fixEOL;

},{}],28:[function(require,module,exports){
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

},{"./InputState":20}],29:[function(require,module,exports){
(function (global){
'use strict';

var doc = global.document;
var getSelection = require('seleccion');
var fixEOL = require('./fixEOL');
var many = require('./many');
var cast = require('./cast');
var rangeToTextRange = getSelection.rangeToTextRange;
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

    if (document.createRange) {
      modernSelection();
    } else {
      oldSelection();
    }

    function modernSelection () {
      var sel = getSelection();
      var range = document.createRange();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9nZXRTdXJmYWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGdldFNlbGVjdGlvbiA9IHJlcXVpcmUoJ3NlbGVjY2lvbicpO1xudmFyIGZpeEVPTCA9IHJlcXVpcmUoJy4vZml4RU9MJyk7XG52YXIgbWFueSA9IHJlcXVpcmUoJy4vbWFueScpO1xudmFyIGNhc3QgPSByZXF1aXJlKCcuL2Nhc3QnKTtcbnZhciByYW5nZVRvVGV4dFJhbmdlID0gZ2V0U2VsZWN0aW9uLnJhbmdlVG9UZXh0UmFuZ2U7XG52YXIgcm9wZW4gPSAvXig8W14+XSsoPzogW14+XSopPz4pLztcbnZhciByY2xvc2UgPSAvKDxcXC9bXj5dKz4pJC87XG5cbmZ1bmN0aW9uIHN1cmZhY2UgKHRleHRhcmVhLCBlZGl0YWJsZSwgZHJvcGFyZWEpIHtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0YXJlYTogdGV4dGFyZWEsXG4gICAgZWRpdGFibGU6IGVkaXRhYmxlLFxuICAgIGRyb3BhcmVhOiBkcm9wYXJlYSxcbiAgICBmb2N1czogc2V0Rm9jdXMsXG4gICAgcmVhZDogcmVhZCxcbiAgICB3cml0ZTogd3JpdGUsXG4gICAgY3VycmVudDogY3VycmVudCxcbiAgICB3cml0ZVNlbGVjdGlvbjogd3JpdGVTZWxlY3Rpb24sXG4gICAgcmVhZFNlbGVjdGlvbjogcmVhZFNlbGVjdGlvblxuICB9O1xuXG4gIGZ1bmN0aW9uIHNldEZvY3VzIChtb2RlKSB7XG4gICAgY3VycmVudChtb2RlKS5mb2N1cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3VycmVudCAobW9kZSkge1xuICAgIHJldHVybiBtb2RlID09PSAnd3lzaXd5ZycgPyBlZGl0YWJsZSA6IHRleHRhcmVhO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAobW9kZSkge1xuICAgIGlmIChtb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHJldHVybiBlZGl0YWJsZS5pbm5lckhUTUw7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChtb2RlLCB2YWx1ZSkge1xuICAgIGlmIChtb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIGVkaXRhYmxlLmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXh0YXJlYS52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlU2VsZWN0aW9uIChzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5tb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHdyaXRlU2VsZWN0aW9uRWRpdGFibGUoc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cml0ZVNlbGVjdGlvblRleHRhcmVhKHN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU2VsZWN0aW9uIChzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5tb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHJlYWRTZWxlY3Rpb25FZGl0YWJsZShzdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlYWRTZWxlY3Rpb25UZXh0YXJlYShzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVTZWxlY3Rpb25UZXh0YXJlYSAoc3RhdGUpIHtcbiAgICB2YXIgcmFuZ2U7XG4gICAgaWYgKHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ICE9PSB2b2lkIDApIHtcbiAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydCA9IHN0YXRlLnN0YXJ0O1xuICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uRW5kID0gc3RhdGUuZW5kO1xuICAgICAgdGV4dGFyZWEuc2Nyb2xsVG9wID0gc3RhdGUuc2Nyb2xsVG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jLnNlbGVjdGlvbikge1xuICAgICAgaWYgKGRvYy5hY3RpdmVFbGVtZW50ICYmIGRvYy5hY3RpdmVFbGVtZW50ICE9PSB0ZXh0YXJlYSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgcmFuZ2UgPSB0ZXh0YXJlYS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLXRleHRhcmVhLnZhbHVlLmxlbmd0aCk7XG4gICAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCAtdGV4dGFyZWEudmFsdWUubGVuZ3RoKTtcbiAgICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIHN0YXRlLmVuZCk7XG4gICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIHN0YXRlLnN0YXJ0KTtcbiAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRTZWxlY3Rpb25UZXh0YXJlYSAoc3RhdGUpIHtcbiAgICBpZiAodGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgIT09IHZvaWQgMCkge1xuICAgICAgc3RhdGUuc3RhcnQgPSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgIHN0YXRlLmVuZCA9IHRleHRhcmVhLnNlbGVjdGlvbkVuZDtcbiAgICB9IGVsc2UgaWYgKGRvYy5zZWxlY3Rpb24pIHtcbiAgICAgIGFuY2llbnRseVJlYWRTZWxlY3Rpb25UZXh0YXJlYShzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYW5jaWVudGx5UmVhZFNlbGVjdGlvblRleHRhcmVhIChzdGF0ZSkge1xuICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCAmJiBkb2MuYWN0aXZlRWxlbWVudCAhPT0gdGV4dGFyZWEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdGF0ZS50ZXh0ID0gZml4RU9MKHRleHRhcmVhLnZhbHVlKTtcblxuICAgIHZhciByYW5nZSA9IGRvYy5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICB2YXIgZml4ZWRSYW5nZSA9IGZpeEVPTChyYW5nZS50ZXh0KTtcbiAgICB2YXIgbWFya2VyID0gJ1xceDA3JztcbiAgICB2YXIgbWFya2VkUmFuZ2UgPSBtYXJrZXIgKyBmaXhlZFJhbmdlICsgbWFya2VyO1xuXG4gICAgcmFuZ2UudGV4dCA9IG1hcmtlZFJhbmdlO1xuXG4gICAgdmFyIGlucHV0VGV4dCA9IGZpeEVPTCh0ZXh0YXJlYS52YWx1ZSk7XG5cbiAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC1tYXJrZWRSYW5nZS5sZW5ndGgpO1xuICAgIHJhbmdlLnRleHQgPSBmaXhlZFJhbmdlO1xuICAgIHN0YXRlLnN0YXJ0ID0gaW5wdXRUZXh0LmluZGV4T2YobWFya2VyKTtcbiAgICBzdGF0ZS5lbmQgPSBpbnB1dFRleHQubGFzdEluZGV4T2YobWFya2VyKSAtIG1hcmtlci5sZW5ndGg7XG5cbiAgICB2YXIgZGlmZiA9IHN0YXRlLnRleHQubGVuZ3RoIC0gZml4RU9MKHRleHRhcmVhLnZhbHVlKS5sZW5ndGg7XG4gICAgaWYgKGRpZmYpIHtcbiAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLWZpeGVkUmFuZ2UubGVuZ3RoKTtcbiAgICAgIGZpeGVkUmFuZ2UgKz0gbWFueSgnXFxuJywgZGlmZik7XG4gICAgICBzdGF0ZS5lbmQgKz0gZGlmZjtcbiAgICAgIHJhbmdlLnRleHQgPSBmaXhlZFJhbmdlO1xuICAgIH1cbiAgICBzdGF0ZS5zZWxlY3QoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlU2VsZWN0aW9uRWRpdGFibGUgKHN0YXRlKSB7XG4gICAgdmFyIGNodW5rcyA9IHN0YXRlLmNhY2hlZENodW5rcyB8fCBzdGF0ZS5nZXRDaHVua3MoKTtcbiAgICB2YXIgc3RhcnQgPSBjaHVua3MuYmVmb3JlLmxlbmd0aDtcbiAgICB2YXIgZW5kID0gc3RhcnQgKyBjaHVua3Muc2VsZWN0aW9uLmxlbmd0aDtcbiAgICB2YXIgcCA9IHt9O1xuXG4gICAgd2FsayhlZGl0YWJsZS5maXJzdENoaWxkLCBwZWVrKTtcbiAgICBlZGl0YWJsZS5mb2N1cygpO1xuXG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZVJhbmdlKSB7XG4gICAgICBtb2Rlcm5TZWxlY3Rpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9kZXJuU2VsZWN0aW9uICgpIHtcbiAgICAgIHZhciBzZWwgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICBpZiAoIXAuc3RhcnRDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHAuZW5kQ29udGFpbmVyKSB7XG4gICAgICAgIHJhbmdlLnNldEVuZChwLmVuZENvbnRhaW5lciwgcC5lbmRPZmZzZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKHAuc3RhcnRDb250YWluZXIsIHAuc3RhcnRPZmZzZXQpO1xuICAgICAgfVxuICAgICAgcmFuZ2Uuc2V0U3RhcnQocC5zdGFydENvbnRhaW5lciwgcC5zdGFydE9mZnNldCk7XG4gICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9sZFNlbGVjdGlvbiAoKSB7XG4gICAgICByYW5nZVRvVGV4dFJhbmdlKHApLnNlbGVjdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBlZWsgKGNvbnRleHQsIGVsKSB7XG4gICAgICB2YXIgY3Vyc29yID0gY29udGV4dC50ZXh0Lmxlbmd0aDtcbiAgICAgIHZhciBjb250ZW50ID0gcmVhZE5vZGUoZWwpLmxlbmd0aDtcbiAgICAgIHZhciBzdW0gPSBjdXJzb3IgKyBjb250ZW50O1xuICAgICAgaWYgKCFwLnN0YXJ0Q29udGFpbmVyICYmIHN1bSA+PSBzdGFydCkge1xuICAgICAgICBwLnN0YXJ0Q29udGFpbmVyID0gZWw7XG4gICAgICAgIHAuc3RhcnRPZmZzZXQgPSBib3VuZGVkKHN0YXJ0IC0gY3Vyc29yKTtcbiAgICAgIH1cbiAgICAgIGlmICghcC5lbmRDb250YWluZXIgJiYgc3VtID49IGVuZCkge1xuICAgICAgICBwLmVuZENvbnRhaW5lciA9IGVsO1xuICAgICAgICBwLmVuZE9mZnNldCA9IGJvdW5kZWQoZW5kIC0gY3Vyc29yKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYm91bmRlZCAob2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihjb250ZW50LCBvZmZzZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU2VsZWN0aW9uRWRpdGFibGUgKHN0YXRlKSB7XG4gICAgdmFyIHNlbCA9IGdldFNlbGVjdGlvbigpO1xuICAgIHZhciBkaXN0YW5jZSA9IHdhbGsoZWRpdGFibGUuZmlyc3RDaGlsZCwgcGVlayk7XG4gICAgdmFyIHN0YXJ0ID0gZGlzdGFuY2Uuc3RhcnQgfHwgMDtcbiAgICB2YXIgZW5kID0gZGlzdGFuY2UuZW5kIHx8IDA7XG5cbiAgICBzdGF0ZS50ZXh0ID0gZGlzdGFuY2UudGV4dDtcblxuICAgIGlmIChlbmQgPiBzdGFydCkge1xuICAgICAgc3RhdGUuc3RhcnQgPSBzdGFydDtcbiAgICAgIHN0YXRlLmVuZCA9IGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuc3RhcnQgPSBlbmQ7XG4gICAgICBzdGF0ZS5lbmQgPSBzdGFydDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwZWVrIChjb250ZXh0LCBlbCkge1xuICAgICAgaWYgKGVsID09PSBzZWwuYW5jaG9yTm9kZSkge1xuICAgICAgICBjb250ZXh0LnN0YXJ0ID0gY29udGV4dC50ZXh0Lmxlbmd0aCArIHNlbC5hbmNob3JPZmZzZXQ7XG4gICAgICB9XG4gICAgICBpZiAoZWwgPT09IHNlbC5mb2N1c05vZGUpIHtcbiAgICAgICAgY29udGV4dC5lbmQgPSBjb250ZXh0LnRleHQubGVuZ3RoICsgc2VsLmZvY3VzT2Zmc2V0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdhbGsgKGVsLCBwZWVrLCBjdHgsIHNpYmxpbmdzKSB7XG4gICAgdmFyIGNvbnRleHQgPSBjdHggfHwgeyB0ZXh0OiAnJyB9O1xuXG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuXG4gICAgdmFyIGVsTm9kZSA9IGVsLm5vZGVUeXBlID09PSAxO1xuICAgIHZhciB0ZXh0Tm9kZSA9IGVsLm5vZGVUeXBlID09PSAzO1xuXG4gICAgcGVlayhjb250ZXh0LCBlbCk7XG5cbiAgICBpZiAodGV4dE5vZGUpIHtcbiAgICAgIGNvbnRleHQudGV4dCArPSByZWFkTm9kZShlbCk7XG4gICAgfVxuICAgIGlmIChlbE5vZGUpIHtcbiAgICAgIGlmIChlbC5vdXRlckhUTUwubWF0Y2gocm9wZW4pKSB7IGNvbnRleHQudGV4dCArPSBSZWdFeHAuJDE7IH1cbiAgICAgIGNhc3QoZWwuY2hpbGROb2RlcykuZm9yRWFjaCh3YWxrQ2hpbGRyZW4pO1xuICAgICAgaWYgKGVsLm91dGVySFRNTC5tYXRjaChyY2xvc2UpKSB7IGNvbnRleHQudGV4dCArPSBSZWdFeHAuJDE7IH1cbiAgICB9XG4gICAgaWYgKHNpYmxpbmdzICE9PSBmYWxzZSAmJiBlbC5uZXh0U2libGluZykge1xuICAgICAgcmV0dXJuIHdhbGsoZWwubmV4dFNpYmxpbmcsIHBlZWssIGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dDtcblxuICAgIGZ1bmN0aW9uIHdhbGtDaGlsZHJlbiAoY2hpbGQpIHtcbiAgICAgIHdhbGsoY2hpbGQsIHBlZWssIGNvbnRleHQsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkTm9kZSAoZWwpIHtcbiAgICByZXR1cm4gZWwubm9kZVR5cGUgPT09IDMgPyBmaXhFT0woZWwudGV4dENvbnRlbnQgfHwgZWwuaW5uZXJUZXh0IHx8ICcnKSA6ICcnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3VyZmFjZTtcbiJdfQ==
},{"./cast":22,"./fixEOL":27,"./many":41,"seleccion":13}],30:[function(require,module,exports){
'use strict';

function getText (el) {
  return el.innerText || el.textContent;
}

module.exports = getText;

},{}],31:[function(require,module,exports){
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

},{"../chunks/trim":24}],32:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function blockquote (chunks) {
  wrapping('blockquote', strings.placeholders.quote, chunks);
}

module.exports = blockquote;

},{"../strings":59,"./wrapping":39}],33:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function boldOrItalic (chunks, type) {
  wrapping(type === 'bold' ? 'strong' : 'em', strings.placeholders[type], chunks);
}

module.exports = boldOrItalic;

},{"../strings":59,"./wrapping":39}],34:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function codeblock (chunks) {
  wrapping('pre><code', strings.placeholders.code, chunks);
}

module.exports = codeblock;

},{"../strings":59,"./wrapping":39}],35:[function(require,module,exports){
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

},{"../strings":59}],36:[function(require,module,exports){
'use strict';

function hr (chunks) {
  chunks.before += '\n<hr>\n';
  chunks.selection = '';
}

module.exports = hr;

},{}],37:[function(require,module,exports){
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

},{"../chunks/parseLinkInput":23,"../once":52,"../strings":59,"crossvent":6}],38:[function(require,module,exports){
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

},{"../strings":59}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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
},{}],41:[function(require,module,exports){
'use strict';

function many (text, times) {
  return new Array(times + 1).join(text);
}

module.exports = many;

},{}],42:[function(require,module,exports){
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

},{"../chunks/trim":24,"../extendRegExp":26,"../many":41}],43:[function(require,module,exports){
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

},{"../strings":59,"./settings":50,"./wrapping":51}],44:[function(require,module,exports){
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

},{"../strings":59}],45:[function(require,module,exports){
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

},{"../strings":59}],46:[function(require,module,exports){
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

},{"../many":41,"../strings":59}],47:[function(require,module,exports){
'use strict';

function hr (chunks) {
  chunks.startTag = '----------\n';
  chunks.selection = '';
  chunks.skip({ left: 2, right: 1, any: true });
}

module.exports = hr;

},{}],48:[function(require,module,exports){
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

},{"../chunks/parseLinkInput":23,"../once":52,"../strings":59}],49:[function(require,module,exports){
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

},{"../many":41,"../strings":59,"./settings":50,"./wrapping":51}],50:[function(require,module,exports){
'use strict';

module.exports = {
  lineLength: 72
};

},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{"../classes":25,"../strings":59,"../uploads":60,"./render":55,"crossvent":6}],55:[function(require,module,exports){
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
},{"../classes":25,"../getText":30,"../setText":58,"../strings":59,"crossvent":6}],56:[function(require,module,exports){
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

},{"bullseye":1}],57:[function(require,module,exports){
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

},{"./setText":58,"./strings":59}],58:[function(require,module,exports){
'use strict';

function setText (el, value) {
  el.innerText = el.textContent = value;
}

module.exports = setText;

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"./classes":25,"crossvent":6}],61:[function(require,module,exports){
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
},{"./InputHistory":19,"./bindCommands":21,"./classes":25,"./getCommandHandler":28,"./getSurface":29,"./prompts/close":53,"./prompts/prompt":54,"./rememberSelection":56,"./renderers":57,"./setText":58,"./strings":59,"./uploads":60,"./xhrStub":62,"crossvent":6,"kanye":8,"local-storage":10}],62:[function(require,module,exports){
'use strict';

function xhrStub (options) {
  throw new Error('Woofmark is missing XHR configuration. Can\'t request ' + options.url);
}

module.exports = xhrStub;

},{}]},{},[61])(61)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvYnVsbHNleWUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL3NlbGwvc2VsbC5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS90YWlsb3JtYWRlLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL3Rocm90dGxlLmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9ub2RlX21vZHVsZXMvY3VzdG9tLWV2ZW50L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvZXZlbnRtYXAuanMiLCJub2RlX21vZHVsZXMva2FueWUva2FueWUuanMiLCJub2RlX21vZHVsZXMva2FueWUvbm9kZV9tb2R1bGVzL3Nla3Rvci9zcmMvc2VrdG9yLmpzIiwibm9kZV9tb2R1bGVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2NhbC1zdG9yYWdlL3N0dWIuanMiLCJub2RlX21vZHVsZXMvbG9jYWwtc3RvcmFnZS90cmFja2luZy5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvbk51bGxPcC5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvblJhdy5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvblN5bnRoZXRpYy5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2lzSG9zdC5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL3JhbmdlVG9UZXh0UmFuZ2UuanMiLCJzcmMvSW5wdXRIaXN0b3J5LmpzIiwic3JjL0lucHV0U3RhdGUuanMiLCJzcmMvYmluZENvbW1hbmRzLmpzIiwic3JjL2Nhc3QuanMiLCJzcmMvY2h1bmtzL3BhcnNlTGlua0lucHV0LmpzIiwic3JjL2NodW5rcy90cmltLmpzIiwic3JjL2NsYXNzZXMuanMiLCJzcmMvZXh0ZW5kUmVnRXhwLmpzIiwic3JjL2ZpeEVPTC5qcyIsInNyYy9nZXRDb21tYW5kSGFuZGxlci5qcyIsInNyYy9nZXRTdXJmYWNlLmpzIiwic3JjL2dldFRleHQuanMiLCJzcmMvaHRtbC9IdG1sQ2h1bmtzLmpzIiwic3JjL2h0bWwvYmxvY2txdW90ZS5qcyIsInNyYy9odG1sL2JvbGRPckl0YWxpYy5qcyIsInNyYy9odG1sL2NvZGVibG9jay5qcyIsInNyYy9odG1sL2hlYWRpbmcuanMiLCJzcmMvaHRtbC9oci5qcyIsInNyYy9odG1sL2xpbmtPckltYWdlT3JBdHRhY2htZW50LmpzIiwic3JjL2h0bWwvbGlzdC5qcyIsInNyYy9odG1sL3dyYXBwaW5nLmpzIiwic3JjL2lzVmlzaWJsZUVsZW1lbnQuanMiLCJzcmMvbWFueS5qcyIsInNyYy9tYXJrZG93bi9NYXJrZG93bkNodW5rcy5qcyIsInNyYy9tYXJrZG93bi9ibG9ja3F1b3RlLmpzIiwic3JjL21hcmtkb3duL2JvbGRPckl0YWxpYy5qcyIsInNyYy9tYXJrZG93bi9jb2RlYmxvY2suanMiLCJzcmMvbWFya2Rvd24vaGVhZGluZy5qcyIsInNyYy9tYXJrZG93bi9oci5qcyIsInNyYy9tYXJrZG93bi9saW5rT3JJbWFnZU9yQXR0YWNobWVudC5qcyIsInNyYy9tYXJrZG93bi9saXN0LmpzIiwic3JjL21hcmtkb3duL3NldHRpbmdzLmpzIiwic3JjL21hcmtkb3duL3dyYXBwaW5nLmpzIiwic3JjL29uY2UuanMiLCJzcmMvcHJvbXB0cy9jbG9zZS5qcyIsInNyYy9wcm9tcHRzL3Byb21wdC5qcyIsInNyYy9wcm9tcHRzL3JlbmRlci5qcyIsInNyYy9yZW1lbWJlclNlbGVjdGlvbi5qcyIsInNyYy9yZW5kZXJlcnMuanMiLCJzcmMvc2V0VGV4dC5qcyIsInNyYy9zdHJpbmdzLmpzIiwic3JjL3VwbG9hZHMuanMiLCJzcmMvd29vZm1hcmsuanMiLCJzcmMveGhyU3R1Yi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4VkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciB0aHJvdHRsZSA9IHJlcXVpcmUoJy4vdGhyb3R0bGUnKTtcbnZhciB0YWlsb3JtYWRlID0gcmVxdWlyZSgnLi90YWlsb3JtYWRlJyk7XG5cbmZ1bmN0aW9uIGJ1bGxzZXllIChlbCwgdGFyZ2V0LCBvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucztcbiAgdmFyIGRvbVRhcmdldCA9IHRhcmdldCAmJiB0YXJnZXQudGFnTmFtZTtcblxuICBpZiAoIWRvbVRhcmdldCAmJiBhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgbyA9IHRhcmdldDtcbiAgfVxuICBpZiAoIWRvbVRhcmdldCkge1xuICAgIHRhcmdldCA9IGVsO1xuICB9XG4gIGlmICghbykgeyBvID0ge307IH1cblxuICB2YXIgZGVzdHJveWVkID0gZmFsc2U7XG4gIHZhciB0aHJvdHRsZWRXcml0ZSA9IHRocm90dGxlKHdyaXRlLCAzMCk7XG4gIHZhciB0YWlsb3JPcHRpb25zID0geyB1cGRhdGU6IG8uYXV0b3VwZGF0ZVRvQ2FyZXQgIT09IGZhbHNlICYmIHVwZGF0ZSB9O1xuICB2YXIgdGFpbG9yID0gby5jYXJldCAmJiB0YWlsb3JtYWRlKHRhcmdldCwgdGFpbG9yT3B0aW9ucyk7XG5cbiAgd3JpdGUoKTtcblxuICBpZiAoby50cmFja2luZyAhPT0gZmFsc2UpIHtcbiAgICBjcm9zc3ZlbnQuYWRkKHdpbmRvdywgJ3Jlc2l6ZScsIHRocm90dGxlZFdyaXRlKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVhZDogcmVhZE51bGwsXG4gICAgcmVmcmVzaDogd3JpdGUsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBzbGVlcDogc2xlZXBcbiAgfTtcblxuICBmdW5jdGlvbiBzbGVlcCAoKSB7XG4gICAgdGFpbG9yT3B0aW9ucy5zbGVlcGluZyA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkTnVsbCAoKSB7IHJldHVybiByZWFkKCk7IH1cblxuICBmdW5jdGlvbiByZWFkIChyZWFkaW5ncykge1xuICAgIHZhciBib3VuZHMgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIHNjcm9sbFRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKHRhaWxvcikge1xuICAgICAgcmVhZGluZ3MgPSB0YWlsb3IucmVhZCgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogKHJlYWRpbmdzLmFic29sdXRlID8gMCA6IGJvdW5kcy5sZWZ0KSArIHJlYWRpbmdzLngsXG4gICAgICAgIHk6IChyZWFkaW5ncy5hYnNvbHV0ZSA/IDAgOiBib3VuZHMudG9wKSArIHNjcm9sbFRvcCArIHJlYWRpbmdzLnkgKyAyMFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGJvdW5kcy5sZWZ0LFxuICAgICAgeTogYm91bmRzLnRvcCArIHNjcm9sbFRvcFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKHJlYWRpbmdzKSB7XG4gICAgd3JpdGUocmVhZGluZ3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUgKHJlYWRpbmdzKSB7XG4gICAgaWYgKGRlc3Ryb3llZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCdWxsc2V5ZSBjYW5cXCd0IHJlZnJlc2ggYWZ0ZXIgYmVpbmcgZGVzdHJveWVkLiBDcmVhdGUgYW5vdGhlciBpbnN0YW5jZSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICBpZiAodGFpbG9yICYmICFyZWFkaW5ncykge1xuICAgICAgdGFpbG9yT3B0aW9ucy5zbGVlcGluZyA9IGZhbHNlO1xuICAgICAgdGFpbG9yLnJlZnJlc2goKTsgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcCA9IHJlYWQocmVhZGluZ3MpO1xuICAgIGlmICghdGFpbG9yICYmIHRhcmdldCAhPT0gZWwpIHtcbiAgICAgIHAueSArPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICBlbC5zdHlsZS5sZWZ0ID0gcC54ICsgJ3B4JztcbiAgICBlbC5zdHlsZS50b3AgPSBwLnkgKyAncHgnO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgaWYgKHRhaWxvcikgeyB0YWlsb3IuZGVzdHJveSgpOyB9XG4gICAgY3Jvc3N2ZW50LnJlbW92ZSh3aW5kb3csICdyZXNpemUnLCB0aHJvdHRsZWRXcml0ZSk7XG4gICAgZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1bGxzZXllO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0ID0gZWFzeUdldDtcbnZhciBzZXQgPSBlYXN5U2V0O1xuXG5pZiAoZG9jdW1lbnQuc2VsZWN0aW9uICYmIGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSkge1xuICBnZXQgPSBoYXJkR2V0O1xuICBzZXQgPSBoYXJkU2V0O1xufVxuXG5mdW5jdGlvbiBlYXN5R2V0IChlbCkge1xuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBlbC5zZWxlY3Rpb25TdGFydCxcbiAgICBlbmQ6IGVsLnNlbGVjdGlvbkVuZFxuICB9O1xufVxuXG5mdW5jdGlvbiBoYXJkR2V0IChlbCkge1xuICB2YXIgYWN0aXZlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgaWYgKGFjdGl2ZSAhPT0gZWwpIHtcbiAgICBlbC5mb2N1cygpO1xuICB9XG5cbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gIHZhciBib29rbWFyayA9IHJhbmdlLmdldEJvb2ttYXJrKCk7XG4gIHZhciBvcmlnaW5hbCA9IGVsLnZhbHVlO1xuICB2YXIgbWFya2VyID0gZ2V0VW5pcXVlTWFya2VyKG9yaWdpbmFsKTtcbiAgdmFyIHBhcmVudCA9IHJhbmdlLnBhcmVudEVsZW1lbnQoKTtcbiAgaWYgKHBhcmVudCA9PT0gbnVsbCB8fCAhaW5wdXRzKHBhcmVudCkpIHtcbiAgICByZXR1cm4gcmVzdWx0KDAsIDApO1xuICB9XG4gIHJhbmdlLnRleHQgPSBtYXJrZXIgKyByYW5nZS50ZXh0ICsgbWFya2VyO1xuXG4gIHZhciBjb250ZW50cyA9IGVsLnZhbHVlO1xuXG4gIGVsLnZhbHVlID0gb3JpZ2luYWw7XG4gIHJhbmdlLm1vdmVUb0Jvb2ttYXJrKGJvb2ttYXJrKTtcbiAgcmFuZ2Uuc2VsZWN0KCk7XG5cbiAgcmV0dXJuIHJlc3VsdChjb250ZW50cy5pbmRleE9mKG1hcmtlciksIGNvbnRlbnRzLmxhc3RJbmRleE9mKG1hcmtlcikgLSBtYXJrZXIubGVuZ3RoKTtcblxuICBmdW5jdGlvbiByZXN1bHQgKHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAoYWN0aXZlICE9PSBlbCkgeyAvLyBkb24ndCBkaXNydXB0IHByZS1leGlzdGluZyBzdGF0ZVxuICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICBhY3RpdmUuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmJsdXIoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFVuaXF1ZU1hcmtlciAoY29udGVudHMpIHtcbiAgdmFyIG1hcmtlcjtcbiAgZG8ge1xuICAgIG1hcmtlciA9ICdAQG1hcmtlci4nICsgTWF0aC5yYW5kb20oKSAqIG5ldyBEYXRlKCk7XG4gIH0gd2hpbGUgKGNvbnRlbnRzLmluZGV4T2YobWFya2VyKSAhPT0gLTEpO1xuICByZXR1cm4gbWFya2VyO1xufVxuXG5mdW5jdGlvbiBpbnB1dHMgKGVsKSB7XG4gIHJldHVybiAoKGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgZWwudHlwZSA9PT0gJ3RleHQnKSB8fCBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnKTtcbn1cblxuZnVuY3Rpb24gZWFzeVNldCAoZWwsIHApIHtcbiAgZWwuc2VsZWN0aW9uU3RhcnQgPSBwYXJzZShlbCwgcC5zdGFydCk7XG4gIGVsLnNlbGVjdGlvbkVuZCA9IHBhcnNlKGVsLCBwLmVuZCk7XG59XG5cbmZ1bmN0aW9uIGhhcmRTZXQgKGVsLCBwKSB7XG4gIHZhciByYW5nZSA9IGVsLmNyZWF0ZVRleHRSYW5nZSgpO1xuXG4gIGlmIChwLnN0YXJ0ID09PSAnZW5kJyAmJiBwLmVuZCA9PT0gJ2VuZCcpIHtcbiAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgcmFuZ2Uuc2VsZWN0KCk7XG4gIH0gZWxzZSB7XG4gICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgcGFyc2UoZWwsIHAuZW5kKSk7XG4gICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCBwYXJzZShlbCwgcC5zdGFydCkpO1xuICAgIHJhbmdlLnNlbGVjdCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlIChlbCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSAnZW5kJyA/IGVsLnZhbHVlLmxlbmd0aCA6IHZhbHVlIHx8IDA7XG59XG5cbmZ1bmN0aW9uIHNlbGwgKGVsLCBwKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgc2V0KGVsLCBwKTtcbiAgfVxuICByZXR1cm4gZ2V0KGVsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZWxsO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2VsbCA9IHJlcXVpcmUoJ3NlbGwnKTtcbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciB0aHJvdHRsZSA9IHJlcXVpcmUoJy4vdGhyb3R0bGUnKTtcbnZhciBwcm9wcyA9IFtcbiAgJ2RpcmVjdGlvbicsXG4gICdib3hTaXppbmcnLFxuICAnd2lkdGgnLFxuICAnaGVpZ2h0JyxcbiAgJ292ZXJmbG93WCcsXG4gICdvdmVyZmxvd1knLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICdib3JkZXJCb3R0b21XaWR0aCcsXG4gICdib3JkZXJMZWZ0V2lkdGgnLFxuICAncGFkZGluZ1RvcCcsXG4gICdwYWRkaW5nUmlnaHQnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdwYWRkaW5nTGVmdCcsXG4gICdmb250U3R5bGUnLFxuICAnZm9udFZhcmlhbnQnLFxuICAnZm9udFdlaWdodCcsXG4gICdmb250U3RyZXRjaCcsXG4gICdmb250U2l6ZScsXG4gICdmb250U2l6ZUFkanVzdCcsXG4gICdsaW5lSGVpZ2h0JyxcbiAgJ2ZvbnRGYW1pbHknLFxuICAndGV4dEFsaWduJyxcbiAgJ3RleHRUcmFuc2Zvcm0nLFxuICAndGV4dEluZGVudCcsXG4gICd0ZXh0RGVjb3JhdGlvbicsXG4gICdsZXR0ZXJTcGFjaW5nJyxcbiAgJ3dvcmRTcGFjaW5nJ1xuXTtcbnZhciB3aW4gPSBnbG9iYWw7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgZmYgPSB3aW4ubW96SW5uZXJTY3JlZW5YICE9PSBudWxsICYmIHdpbi5tb3pJbm5lclNjcmVlblggIT09IHZvaWQgMDtcblxuZnVuY3Rpb24gdGFpbG9ybWFkZSAoZWwsIG9wdGlvbnMpIHtcbiAgdmFyIHRleHRJbnB1dCA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJztcbiAgdmFyIHRocm90dGxlZFJlZnJlc2ggPSB0aHJvdHRsZShyZWZyZXNoLCAzMCk7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcblxuICBiaW5kKCk7XG5cbiAgcmV0dXJuIHtcbiAgICByZWFkOiByZWFkUG9zaXRpb24sXG4gICAgcmVmcmVzaDogdGhyb3R0bGVkUmVmcmVzaCxcbiAgICBkZXN0cm95OiBkZXN0cm95XG4gIH07XG5cbiAgZnVuY3Rpb24gbm9vcCAoKSB7fVxuICBmdW5jdGlvbiByZWFkUG9zaXRpb24gKCkgeyByZXR1cm4gKHRleHRJbnB1dCA/IGNvb3Jkc1RleHQgOiBjb29yZHNIVE1MKSgpOyB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAoKSB7XG4gICAgaWYgKG8uc2xlZXBpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChvLnVwZGF0ZSB8fCBub29wKShyZWFkUG9zaXRpb24oKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNUZXh0ICgpIHtcbiAgICB2YXIgcCA9IHNlbGwoZWwpO1xuICAgIHZhciBjb250ZXh0ID0gcHJlcGFyZSgpO1xuICAgIHZhciByZWFkaW5ncyA9IHJlYWRUZXh0Q29vcmRzKGNvbnRleHQsIHAuc3RhcnQpO1xuICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKGNvbnRleHQubWlycm9yKTtcbiAgICByZXR1cm4gcmVhZGluZ3M7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNIVE1MICgpIHtcbiAgICB2YXIgc2VsID0gKG8uZ2V0U2VsZWN0aW9uIHx8IHdpbi5nZXRTZWxlY3Rpb24pKCk7XG4gICAgaWYgKHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICB2YXIgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgIHZhciBuZWVkc1RvV29ya0Fyb3VuZE5ld2xpbmVCdWcgPSByYW5nZS5zdGFydENvbnRhaW5lci5ub2RlTmFtZSA9PT0gJ1AnICYmIHJhbmdlLnN0YXJ0T2Zmc2V0ID09PSAwO1xuICAgICAgaWYgKG5lZWRzVG9Xb3JrQXJvdW5kTmV3bGluZUJ1Zykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm9mZnNldExlZnQsXG4gICAgICAgICAgeTogcmFuZ2Uuc3RhcnRDb250YWluZXIub2Zmc2V0VG9wLFxuICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAocmFuZ2UuZ2V0Q2xpZW50UmVjdHMpIHtcbiAgICAgICAgdmFyIHJlY3RzID0gcmFuZ2UuZ2V0Q2xpZW50UmVjdHMoKTtcbiAgICAgICAgaWYgKHJlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcmVjdHNbMF0ubGVmdCxcbiAgICAgICAgICAgIHk6IHJlY3RzWzBdLnRvcCxcbiAgICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB4OiAwLCB5OiAwIH07XG4gIH1cblxuICBmdW5jdGlvbiByZWFkVGV4dENvb3JkcyAoY29udGV4dCwgcCkge1xuICAgIHZhciByZXN0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB2YXIgbWlycm9yID0gY29udGV4dC5taXJyb3I7XG4gICAgdmFyIGNvbXB1dGVkID0gY29udGV4dC5jb21wdXRlZDtcblxuICAgIHdyaXRlKG1pcnJvciwgcmVhZChlbCkuc3Vic3RyaW5nKDAsIHApKTtcblxuICAgIGlmIChlbC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICBtaXJyb3IudGV4dENvbnRlbnQgPSBtaXJyb3IudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICdcXHUwMGEwJyk7XG4gICAgfVxuXG4gICAgd3JpdGUocmVzdCwgcmVhZChlbCkuc3Vic3RyaW5nKHApIHx8ICcuJyk7XG5cbiAgICBtaXJyb3IuYXBwZW5kQ2hpbGQocmVzdCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogcmVzdC5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlckxlZnRXaWR0aCddKSxcbiAgICAgIHk6IHJlc3Qub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlclRvcFdpZHRoJ10pXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGVsKSB7XG4gICAgcmV0dXJuIHRleHRJbnB1dCA/IGVsLnZhbHVlIDogZWwuaW5uZXJIVE1MO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlcGFyZSAoKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gd2luLmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsKSA6IGVsLmN1cnJlbnRTdHlsZTtcbiAgICB2YXIgbWlycm9yID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBzdHlsZSA9IG1pcnJvci5zdHlsZTtcblxuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKG1pcnJvcik7XG5cbiAgICBpZiAoZWwudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7XG4gICAgfVxuICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnO1xuICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgcHJvcHMuZm9yRWFjaChjb3B5KTtcblxuICAgIGlmIChmZikge1xuICAgICAgc3R5bGUud2lkdGggPSBwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyICsgJ3B4JztcbiAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKSB7XG4gICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICByZXR1cm4geyBtaXJyb3I6IG1pcnJvciwgY29tcHV0ZWQ6IGNvbXB1dGVkIH07XG5cbiAgICBmdW5jdGlvbiBjb3B5IChwcm9wKSB7XG4gICAgICBzdHlsZVtwcm9wXSA9IGNvbXB1dGVkW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChlbCwgdmFsdWUpIHtcbiAgICBpZiAodGV4dElucHV0KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXlkb3duJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleXVwJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2lucHV0JywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ3Bhc3RlJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2NoYW5nZScsIHRocm90dGxlZFJlZnJlc2gpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgYmluZCh0cnVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhaWxvcm1hZGU7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWlkV3hzYzJWNVpTOTBZV2xzYjNKdFlXUmxMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnYzJWc2JDQTlJSEpsY1hWcGNtVW9KM05sYkd3bktUdGNiblpoY2lCamNtOXpjM1psYm5RZ1BTQnlaWEYxYVhKbEtDZGpjbTl6YzNabGJuUW5LVHRjYm5aaGNpQjBhSEp2ZEhSc1pTQTlJSEpsY1hWcGNtVW9KeTR2ZEdoeWIzUjBiR1VuS1R0Y2JuWmhjaUJ3Y205d2N5QTlJRnRjYmlBZ0oyUnBjbVZqZEdsdmJpY3NYRzRnSUNkaWIzaFRhWHBwYm1jbkxGeHVJQ0FuZDJsa2RHZ25MRnh1SUNBbmFHVnBaMmgwSnl4Y2JpQWdKMjkyWlhKbWJHOTNXQ2NzWEc0Z0lDZHZkbVZ5Wm14dmQxa25MRnh1SUNBblltOXlaR1Z5Vkc5d1YybGtkR2duTEZ4dUlDQW5ZbTl5WkdWeVVtbG5hSFJYYVdSMGFDY3NYRzRnSUNkaWIzSmtaWEpDYjNSMGIyMVhhV1IwYUNjc1hHNGdJQ2RpYjNKa1pYSk1aV1owVjJsa2RHZ25MRnh1SUNBbmNHRmtaR2x1WjFSdmNDY3NYRzRnSUNkd1lXUmthVzVuVW1sbmFIUW5MRnh1SUNBbmNHRmtaR2x1WjBKdmRIUnZiU2NzWEc0Z0lDZHdZV1JrYVc1blRHVm1kQ2NzWEc0Z0lDZG1iMjUwVTNSNWJHVW5MRnh1SUNBblptOXVkRlpoY21saGJuUW5MRnh1SUNBblptOXVkRmRsYVdkb2RDY3NYRzRnSUNkbWIyNTBVM1J5WlhSamFDY3NYRzRnSUNkbWIyNTBVMmw2WlNjc1hHNGdJQ2RtYjI1MFUybDZaVUZrYW5WemRDY3NYRzRnSUNkc2FXNWxTR1ZwWjJoMEp5eGNiaUFnSjJadmJuUkdZVzFwYkhrbkxGeHVJQ0FuZEdWNGRFRnNhV2R1Snl4Y2JpQWdKM1JsZUhSVWNtRnVjMlp2Y20wbkxGeHVJQ0FuZEdWNGRFbHVaR1Z1ZENjc1hHNGdJQ2QwWlhoMFJHVmpiM0poZEdsdmJpY3NYRzRnSUNkc1pYUjBaWEpUY0dGamFXNW5KeXhjYmlBZ0ozZHZjbVJUY0dGamFXNW5KMXh1WFR0Y2JuWmhjaUIzYVc0Z1BTQm5iRzlpWVd3N1hHNTJZWElnWkc5aklEMGdaRzlqZFcxbGJuUTdYRzUyWVhJZ1ptWWdQU0IzYVc0dWJXOTZTVzV1WlhKVFkzSmxaVzVZSUNFOVBTQnVkV3hzSUNZbUlIZHBiaTV0YjNwSmJtNWxjbE5qY21WbGJsZ2dJVDA5SUhadmFXUWdNRHRjYmx4dVpuVnVZM1JwYjI0Z2RHRnBiRzl5YldGa1pTQW9aV3dzSUc5d2RHbHZibk1wSUh0Y2JpQWdkbUZ5SUhSbGVIUkpibkIxZENBOUlHVnNMblJoWjA1aGJXVWdQVDA5SUNkSlRsQlZWQ2NnZkh3Z1pXd3VkR0ZuVG1GdFpTQTlQVDBnSjFSRldGUkJVa1ZCSnp0Y2JpQWdkbUZ5SUhSb2NtOTBkR3hsWkZKbFpuSmxjMmdnUFNCMGFISnZkSFJzWlNoeVpXWnlaWE5vTENBek1DazdYRzRnSUhaaGNpQnZJRDBnYjNCMGFXOXVjeUI4ZkNCN2ZUdGNibHh1SUNCaWFXNWtLQ2s3WEc1Y2JpQWdjbVYwZFhKdUlIdGNiaUFnSUNCeVpXRmtPaUJ5WldGa1VHOXphWFJwYjI0c1hHNGdJQ0FnY21WbWNtVnphRG9nZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ3hjYmlBZ0lDQmtaWE4wY205NU9pQmtaWE4wY205NVhHNGdJSDA3WEc1Y2JpQWdablZ1WTNScGIyNGdibTl2Y0NBb0tTQjdmVnh1SUNCbWRXNWpkR2x2YmlCeVpXRmtVRzl6YVhScGIyNGdLQ2tnZXlCeVpYUjFjbTRnS0hSbGVIUkpibkIxZENBL0lHTnZiM0prYzFSbGVIUWdPaUJqYjI5eVpITklWRTFNS1NncE95QjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2NtVm1jbVZ6YUNBb0tTQjdYRzRnSUNBZ2FXWWdLRzh1YzJ4bFpYQnBibWNwSUh0Y2JpQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUNodkxuVndaR0YwWlNCOGZDQnViMjl3S1NoeVpXRmtVRzl6YVhScGIyNG9LU2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCamIyOXlaSE5VWlhoMElDZ3BJSHRjYmlBZ0lDQjJZWElnY0NBOUlITmxiR3dvWld3cE8xeHVJQ0FnSUhaaGNpQmpiMjUwWlhoMElEMGdjSEpsY0dGeVpTZ3BPMXh1SUNBZ0lIWmhjaUJ5WldGa2FXNW5jeUE5SUhKbFlXUlVaWGgwUTI5dmNtUnpLR052Ym5SbGVIUXNJSEF1YzNSaGNuUXBPMXh1SUNBZ0lHUnZZeTVpYjJSNUxuSmxiVzkyWlVOb2FXeGtLR052Ym5SbGVIUXViV2x5Y205eUtUdGNiaUFnSUNCeVpYUjFjbTRnY21WaFpHbHVaM003WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCamIyOXlaSE5JVkUxTUlDZ3BJSHRjYmlBZ0lDQjJZWElnYzJWc0lEMGdLRzh1WjJWMFUyVnNaV04wYVc5dUlIeDhJSGRwYmk1blpYUlRaV3hsWTNScGIyNHBLQ2s3WEc0Z0lDQWdhV1lnS0hObGJDNXlZVzVuWlVOdmRXNTBLU0I3WEc0Z0lDQWdJQ0IyWVhJZ2NtRnVaMlVnUFNCelpXd3VaMlYwVW1GdVoyVkJkQ2d3S1R0Y2JpQWdJQ0FnSUhaaGNpQnVaV1ZrYzFSdlYyOXlhMEZ5YjNWdVpFNWxkMnhwYm1WQ2RXY2dQU0J5WVc1blpTNXpkR0Z5ZEVOdmJuUmhhVzVsY2k1dWIyUmxUbUZ0WlNBOVBUMGdKMUFuSUNZbUlISmhibWRsTG5OMFlYSjBUMlptYzJWMElEMDlQU0F3TzF4dUlDQWdJQ0FnYVdZZ0tHNWxaV1J6Vkc5WGIzSnJRWEp2ZFc1a1RtVjNiR2x1WlVKMVp5a2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdJQ0FnSUhnNklISmhibWRsTG5OMFlYSjBRMjl1ZEdGcGJtVnlMbTltWm5ObGRFeGxablFzWEc0Z0lDQWdJQ0FnSUNBZ2VUb2djbUZ1WjJVdWMzUmhjblJEYjI1MFlXbHVaWEl1YjJabWMyVjBWRzl3TEZ4dUlDQWdJQ0FnSUNBZ0lHRmljMjlzZFhSbE9pQjBjblZsWEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9jbUZ1WjJVdVoyVjBRMnhwWlc1MFVtVmpkSE1wSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJSEpsWTNSeklEMGdjbUZ1WjJVdVoyVjBRMnhwWlc1MFVtVmpkSE1vS1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLSEpsWTNSekxteGxibWQwYUNBK0lEQXBJSHRjYmlBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdlRG9nY21WamRITmJNRjB1YkdWbWRDeGNiaUFnSUNBZ0lDQWdJQ0FnSUhrNklISmxZM1J6V3pCZExuUnZjQ3hjYmlBZ0lDQWdJQ0FnSUNBZ0lHRmljMjlzZFhSbE9pQjBjblZsWEc0Z0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnZXlCNE9pQXdMQ0I1T2lBd0lIMDdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ5WldGa1ZHVjRkRU52YjNKa2N5QW9ZMjl1ZEdWNGRDd2djQ2tnZTF4dUlDQWdJSFpoY2lCeVpYTjBJRDBnWkc5akxtTnlaV0YwWlVWc1pXMWxiblFvSjNOd1lXNG5LVHRjYmlBZ0lDQjJZWElnYldseWNtOXlJRDBnWTI5dWRHVjRkQzV0YVhKeWIzSTdYRzRnSUNBZ2RtRnlJR052YlhCMWRHVmtJRDBnWTI5dWRHVjRkQzVqYjIxd2RYUmxaRHRjYmx4dUlDQWdJSGR5YVhSbEtHMXBjbkp2Y2l3Z2NtVmhaQ2hsYkNrdWMzVmljM1J5YVc1bktEQXNJSEFwS1R0Y2JseHVJQ0FnSUdsbUlDaGxiQzUwWVdkT1lXMWxJRDA5UFNBblNVNVFWVlFuS1NCN1hHNGdJQ0FnSUNCdGFYSnliM0l1ZEdWNGRFTnZiblJsYm5RZ1BTQnRhWEp5YjNJdWRHVjRkRU52Ym5SbGJuUXVjbVZ3YkdGalpTZ3ZYRnh6TDJjc0lDZGNYSFV3TUdFd0p5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2QzSnBkR1VvY21WemRDd2djbVZoWkNobGJDa3VjM1ZpYzNSeWFXNW5LSEFwSUh4OElDY3VKeWs3WEc1Y2JpQWdJQ0J0YVhKeWIzSXVZWEJ3Wlc1a1EyaHBiR1FvY21WemRDazdYRzVjYmlBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ2VEb2djbVZ6ZEM1dlptWnpaWFJNWldaMElDc2djR0Z5YzJWSmJuUW9ZMjl0Y0hWMFpXUmJKMkp2Y21SbGNreGxablJYYVdSMGFDZGRLU3hjYmlBZ0lDQWdJSGs2SUhKbGMzUXViMlptYzJWMFZHOXdJQ3NnY0dGeWMyVkpiblFvWTI5dGNIVjBaV1JiSjJKdmNtUmxjbFJ2Y0ZkcFpIUm9KMTBwWEc0Z0lDQWdmVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhKbFlXUWdLR1ZzS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJsZUhSSmJuQjFkQ0EvSUdWc0xuWmhiSFZsSURvZ1pXd3VhVzV1WlhKSVZFMU1PMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnY0hKbGNHRnlaU0FvS1NCN1hHNGdJQ0FnZG1GeUlHTnZiWEIxZEdWa0lEMGdkMmx1TG1kbGRFTnZiWEIxZEdWa1UzUjViR1VnUHlCblpYUkRiMjF3ZFhSbFpGTjBlV3hsS0dWc0tTQTZJR1ZzTG1OMWNuSmxiblJUZEhsc1pUdGNiaUFnSUNCMllYSWdiV2x5Y205eUlEMGdaRzlqTG1OeVpXRjBaVVZzWlcxbGJuUW9KMlJwZGljcE8xeHVJQ0FnSUhaaGNpQnpkSGxzWlNBOUlHMXBjbkp2Y2k1emRIbHNaVHRjYmx4dUlDQWdJR1J2WXk1aWIyUjVMbUZ3Y0dWdVpFTm9hV3hrS0cxcGNuSnZjaWs3WEc1Y2JpQWdJQ0JwWmlBb1pXd3VkR0ZuVG1GdFpTQWhQVDBnSjBsT1VGVlVKeWtnZTF4dUlDQWdJQ0FnYzNSNWJHVXVkMjl5WkZkeVlYQWdQU0FuWW5KbFlXc3RkMjl5WkNjN1hHNGdJQ0FnZlZ4dUlDQWdJSE4wZVd4bExuZG9hWFJsVTNCaFkyVWdQU0FuY0hKbExYZHlZWEFuTzF4dUlDQWdJSE4wZVd4bExuQnZjMmwwYVc5dUlEMGdKMkZpYzI5c2RYUmxKenRjYmlBZ0lDQnpkSGxzWlM1MmFYTnBZbWxzYVhSNUlEMGdKMmhwWkdSbGJpYzdYRzRnSUNBZ2NISnZjSE11Wm05eVJXRmphQ2hqYjNCNUtUdGNibHh1SUNBZ0lHbG1JQ2htWmlrZ2UxeHVJQ0FnSUNBZ2MzUjViR1V1ZDJsa2RHZ2dQU0J3WVhKelpVbHVkQ2hqYjIxd2RYUmxaQzUzYVdSMGFDa2dMU0F5SUNzZ0ozQjRKenRjYmlBZ0lDQWdJR2xtSUNobGJDNXpZM0p2Ykd4SVpXbG5hSFFnUGlCd1lYSnpaVWx1ZENoamIyMXdkWFJsWkM1b1pXbG5hSFFwS1NCN1hHNGdJQ0FnSUNBZ0lITjBlV3hsTG05MlpYSm1iRzkzV1NBOUlDZHpZM0p2Ykd3bk8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0J6ZEhsc1pTNXZkbVZ5Wm14dmR5QTlJQ2RvYVdSa1pXNG5PMXh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnZXlCdGFYSnliM0k2SUcxcGNuSnZjaXdnWTI5dGNIVjBaV1E2SUdOdmJYQjFkR1ZrSUgwN1hHNWNiaUFnSUNCbWRXNWpkR2x2YmlCamIzQjVJQ2h3Y205d0tTQjdYRzRnSUNBZ0lDQnpkSGxzWlZ0d2NtOXdYU0E5SUdOdmJYQjFkR1ZrVzNCeWIzQmRPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSGR5YVhSbElDaGxiQ3dnZG1Gc2RXVXBJSHRjYmlBZ0lDQnBaaUFvZEdWNGRFbHVjSFYwS1NCN1hHNGdJQ0FnSUNCbGJDNTBaWGgwUTI5dWRHVnVkQ0E5SUhaaGJIVmxPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCbGJDNXBibTVsY2toVVRVd2dQU0IyWVd4MVpUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmlhVzVrSUNoeVpXMXZkbVVwSUh0Y2JpQWdJQ0IyWVhJZ2IzQWdQU0J5WlcxdmRtVWdQeUFuY21WdGIzWmxKeUE2SUNkaFpHUW5PMXh1SUNBZ0lHTnliM056ZG1WdWRGdHZjRjBvWld3c0lDZHJaWGxrYjNkdUp5d2dkR2h5YjNSMGJHVmtVbVZtY21WemFDazdYRzRnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hsYkN3Z0oydGxlWFZ3Snl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwVzI5d1hTaGxiQ3dnSjJsdWNIVjBKeXdnZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNobGJDd2dKM0JoYzNSbEp5d2dkR2h5YjNSMGJHVmtVbVZtY21WemFDazdYRzRnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hsYkN3Z0oyTm9ZVzVuWlNjc0lIUm9jbTkwZEd4bFpGSmxabkpsYzJncE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdaR1Z6ZEhKdmVTQW9LU0I3WEc0Z0lDQWdZbWx1WkNoMGNuVmxLVHRjYmlBZ2ZWeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhSaGFXeHZjbTFoWkdVN1hHNGlYWDA9IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB0aHJvdHRsZSAoZm4sIGJvdW5kYXJ5KSB7XG4gIHZhciBsYXN0ID0gLUluZmluaXR5O1xuICB2YXIgdGltZXI7XG4gIHJldHVybiBmdW5jdGlvbiBib3VuY2VkICgpIHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdW5ib3VuZCgpO1xuXG4gICAgZnVuY3Rpb24gdW5ib3VuZCAoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgdmFyIG5leHQgPSBsYXN0ICsgYm91bmRhcnk7XG4gICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIGlmIChub3cgPiBuZXh0KSB7XG4gICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQodW5ib3VuZCwgbmV4dCAtIG5vdyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXG52YXIgTmF0aXZlQ3VzdG9tRXZlbnQgPSBnbG9iYWwuQ3VzdG9tRXZlbnQ7XG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHAgPSBuZXcgTmF0aXZlQ3VzdG9tRXZlbnQoJ2NhdCcsIHsgZGV0YWlsOiB7IGZvbzogJ2JhcicgfSB9KTtcbiAgICByZXR1cm4gICdjYXQnID09PSBwLnR5cGUgJiYgJ2JhcicgPT09IHAuZGV0YWlsLmZvbztcbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcm9zcy1icm93c2VyIGBDdXN0b21FdmVudGAgY29uc3RydWN0b3IuXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50LkN1c3RvbUV2ZW50XG4gKlxuICogQHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdXNlTmF0aXZlKCkgPyBOYXRpdmVDdXN0b21FdmVudCA6XG5cbi8vIElFID49IDlcbidmdW5jdGlvbicgPT09IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFdmVudCA/IGZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gIH0gZWxzZSB7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlLCB2b2lkIDApO1xuICB9XG4gIHJldHVybiBlO1xufSA6XG5cbi8vIElFIDw9IDhcbmZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICBlLnR5cGUgPSB0eXBlO1xuICBpZiAocGFyYW1zKSB7XG4gICAgZS5idWJibGVzID0gQm9vbGVhbihwYXJhbXMuYnViYmxlcyk7XG4gICAgZS5jYW5jZWxhYmxlID0gQm9vbGVhbihwYXJhbXMuY2FuY2VsYWJsZSk7XG4gICAgZS5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICB9IGVsc2Uge1xuICAgIGUuYnViYmxlcyA9IGZhbHNlO1xuICAgIGUuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgIGUuZGV0YWlsID0gdm9pZCAwO1xuICB9XG4gIHJldHVybiBlO1xufVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlqY205emMzWmxiblF2Ym05a1pWOXRiMlIxYkdWekwyTjFjM1J2YlMxbGRtVnVkQzlwYm1SbGVDNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklseHVkbUZ5SUU1aGRHbDJaVU4xYzNSdmJVVjJaVzUwSUQwZ1oyeHZZbUZzTGtOMWMzUnZiVVYyWlc1ME8xeHVYRzVtZFc1amRHbHZiaUIxYzJWT1lYUnBkbVVnS0NrZ2UxeHVJQ0IwY25rZ2UxeHVJQ0FnSUhaaGNpQndJRDBnYm1WM0lFNWhkR2wyWlVOMWMzUnZiVVYyWlc1MEtDZGpZWFFuTENCN0lHUmxkR0ZwYkRvZ2V5Qm1iMjg2SUNkaVlYSW5JSDBnZlNrN1hHNGdJQ0FnY21WMGRYSnVJQ0FuWTJGMEp5QTlQVDBnY0M1MGVYQmxJQ1ltSUNkaVlYSW5JRDA5UFNCd0xtUmxkR0ZwYkM1bWIyODdYRzRnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1ptRnNjMlU3WEc1OVhHNWNiaThxS2x4dUlDb2dRM0p2YzNNdFluSnZkM05sY2lCZ1EzVnpkRzl0UlhabGJuUmdJR052Ym5OMGNuVmpkRzl5TGx4dUlDcGNiaUFxSUdoMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBGUVNTOURkWE4wYjIxRmRtVnVkQzVEZFhOMGIyMUZkbVZ1ZEZ4dUlDcGNiaUFxSUVCd2RXSnNhV05jYmlBcUwxeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSFZ6WlU1aGRHbDJaU2dwSUQ4Z1RtRjBhWFpsUTNWemRHOXRSWFpsYm5RZ09seHVYRzR2THlCSlJTQStQU0E1WEc0blpuVnVZM1JwYjI0bklEMDlQU0IwZVhCbGIyWWdaRzlqZFcxbGJuUXVZM0psWVhSbFJYWmxiblFnUHlCbWRXNWpkR2x2YmlCRGRYTjBiMjFGZG1WdWRDQW9kSGx3WlN3Z2NHRnlZVzF6S1NCN1hHNGdJSFpoY2lCbElEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJYWmxiblFvSjBOMWMzUnZiVVYyWlc1MEp5azdYRzRnSUdsbUlDaHdZWEpoYlhNcElIdGNiaUFnSUNCbExtbHVhWFJEZFhOMGIyMUZkbVZ1ZENoMGVYQmxMQ0J3WVhKaGJYTXVZblZpWW14bGN5d2djR0Z5WVcxekxtTmhibU5sYkdGaWJHVXNJSEJoY21GdGN5NWtaWFJoYVd3cE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHVXVhVzVwZEVOMWMzUnZiVVYyWlc1MEtIUjVjR1VzSUdaaGJITmxMQ0JtWVd4elpTd2dkbTlwWkNBd0tUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1pUdGNibjBnT2x4dVhHNHZMeUJKUlNBOFBTQTRYRzVtZFc1amRHbHZiaUJEZFhOMGIyMUZkbVZ1ZENBb2RIbHdaU3dnY0dGeVlXMXpLU0I3WEc0Z0lIWmhjaUJsSUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUlhabGJuUlBZbXBsWTNRb0tUdGNiaUFnWlM1MGVYQmxJRDBnZEhsd1pUdGNiaUFnYVdZZ0tIQmhjbUZ0Y3lrZ2UxeHVJQ0FnSUdVdVluVmlZbXhsY3lBOUlFSnZiMnhsWVc0b2NHRnlZVzF6TG1KMVltSnNaWE1wTzF4dUlDQWdJR1V1WTJGdVkyVnNZV0pzWlNBOUlFSnZiMnhsWVc0b2NHRnlZVzF6TG1OaGJtTmxiR0ZpYkdVcE8xeHVJQ0FnSUdVdVpHVjBZV2xzSUQwZ2NHRnlZVzF6TG1SbGRHRnBiRHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JsTG1KMVltSnNaWE1nUFNCbVlXeHpaVHRjYmlBZ0lDQmxMbU5oYm1ObGJHRmliR1VnUFNCbVlXeHpaVHRjYmlBZ0lDQmxMbVJsZEdGcGJDQTlJSFp2YVdRZ01EdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1pUdGNibjFjYmlKZGZRPT0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBjdXN0b21FdmVudCA9IHJlcXVpcmUoJ2N1c3RvbS1ldmVudCcpO1xudmFyIGV2ZW50bWFwID0gcmVxdWlyZSgnLi9ldmVudG1hcCcpO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGFkZEV2ZW50ID0gYWRkRXZlbnRFYXN5O1xudmFyIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRFYXN5O1xudmFyIGhhcmRDYWNoZSA9IFtdO1xuXG5pZiAoIWdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gIGFkZEV2ZW50ID0gYWRkRXZlbnRIYXJkO1xuICByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50SGFyZDtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHVud3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlLCBtb2RlbCkge1xuICB2YXIgZSA9IGV2ZW50bWFwLmluZGV4T2YodHlwZSkgPT09IC0xID8gbWFrZUN1c3RvbUV2ZW50KCkgOiBtYWtlQ2xhc3NpY0V2ZW50KCk7XG4gIGlmIChlbC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDbGFzc2ljRXZlbnQgKCkge1xuICAgIHZhciBlO1xuICAgIGlmIChkb2MuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ3VzdG9tRXZlbnQgKCkge1xuICAgIHJldHVybiBuZXcgY3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWw6IG1vZGVsIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBmbi5jYWxsKGVsLCBlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciB3cmFwcGVyID0gdW53cmFwKGVsLCB0eXBlLCBmbikgfHwgd3JhcHBlckZhY3RvcnkoZWwsIHR5cGUsIGZuKTtcbiAgaGFyZENhY2hlLnB1c2goe1xuICAgIHdyYXBwZXI6IHdyYXBwZXIsXG4gICAgZWxlbWVudDogZWwsXG4gICAgdHlwZTogdHlwZSxcbiAgICBmbjogZm5cbiAgfSk7XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiB1bndyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSA9IGZpbmQoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgd3JhcHBlciA9IGhhcmRDYWNoZVtpXS53cmFwcGVyO1xuICAgIGhhcmRDYWNoZS5zcGxpY2UoaSwgMSk7IC8vIGZyZWUgdXAgYSB0YWQgb2YgbWVtb3J5XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpLCBpdGVtO1xuICBmb3IgKGkgPSAwOyBpIDwgaGFyZENhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbSA9IGhhcmRDYWNoZVtpXTtcbiAgICBpZiAoaXRlbS5lbGVtZW50ID09PSBlbCAmJiBpdGVtLnR5cGUgPT09IHR5cGUgJiYgaXRlbS5mbiA9PT0gZm4pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRFdmVudCxcbiAgcmVtb3ZlOiByZW1vdmVFdmVudCxcbiAgZmFicmljYXRlOiBmYWJyaWNhdGVFdmVudFxufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5amNtOXpjM1psYm5RdmMzSmpMMk55YjNOemRtVnVkQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJqZFhOMGIyMUZkbVZ1ZENBOUlISmxjWFZwY21Vb0oyTjFjM1J2YlMxbGRtVnVkQ2NwTzF4dWRtRnlJR1YyWlc1MGJXRndJRDBnY21WeGRXbHlaU2duTGk5bGRtVnVkRzFoY0NjcE8xeHVkbUZ5SUdSdll5QTlJR1J2WTNWdFpXNTBPMXh1ZG1GeUlHRmtaRVYyWlc1MElEMGdZV1JrUlhabGJuUkZZWE41TzF4dWRtRnlJSEpsYlc5MlpVVjJaVzUwSUQwZ2NtVnRiM1psUlhabGJuUkZZWE41TzF4dWRtRnlJR2hoY21SRFlXTm9aU0E5SUZ0ZE8xeHVYRzVwWmlBb0lXZHNiMkpoYkM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S1NCN1hHNGdJR0ZrWkVWMlpXNTBJRDBnWVdSa1JYWmxiblJJWVhKa08xeHVJQ0J5WlcxdmRtVkZkbVZ1ZENBOUlISmxiVzkyWlVWMlpXNTBTR0Z5WkR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWVdSa1JYWmxiblJGWVhONUlDaGxiQ3dnZEhsd1pTd2dabTRzSUdOaGNIUjFjbWx1WnlrZ2UxeHVJQ0J5WlhSMWNtNGdaV3d1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWgwZVhCbExDQm1iaXdnWTJGd2RIVnlhVzVuS1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWVdSa1JYWmxiblJJWVhKa0lDaGxiQ3dnZEhsd1pTd2dabTRwSUh0Y2JpQWdjbVYwZFhKdUlHVnNMbUYwZEdGamFFVjJaVzUwS0NkdmJpY2dLeUIwZVhCbExDQjNjbUZ3S0dWc0xDQjBlWEJsTENCbWJpa3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaVzF2ZG1WRmRtVnVkRVZoYzNrZ0tHVnNMQ0IwZVhCbExDQm1iaXdnWTJGd2RIVnlhVzVuS1NCN1hHNGdJSEpsZEhWeWJpQmxiQzV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0hSNWNHVXNJR1p1TENCallYQjBkWEpwYm1jcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVpXMXZkbVZGZG1WdWRFaGhjbVFnS0dWc0xDQjBlWEJsTENCbWJpa2dlMXh1SUNCeVpYUjFjbTRnWld3dVpHVjBZV05vUlhabGJuUW9KMjl1SnlBcklIUjVjR1VzSUhWdWQzSmhjQ2hsYkN3Z2RIbHdaU3dnWm00cEtUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1ptRmljbWxqWVhSbFJYWmxiblFnS0dWc0xDQjBlWEJsTENCdGIyUmxiQ2tnZTF4dUlDQjJZWElnWlNBOUlHVjJaVzUwYldGd0xtbHVaR1Y0VDJZb2RIbHdaU2tnUFQwOUlDMHhJRDhnYldGclpVTjFjM1J2YlVWMlpXNTBLQ2tnT2lCdFlXdGxRMnhoYzNOcFkwVjJaVzUwS0NrN1hHNGdJR2xtSUNobGJDNWthWE53WVhSamFFVjJaVzUwS1NCN1hHNGdJQ0FnWld3dVpHbHpjR0YwWTJoRmRtVnVkQ2hsS1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCbGJDNW1hWEpsUlhabGJuUW9KMjl1SnlBcklIUjVjR1VzSUdVcE8xeHVJQ0I5WEc0Z0lHWjFibU4wYVc5dUlHMWhhMlZEYkdGemMybGpSWFpsYm5RZ0tDa2dlMXh1SUNBZ0lIWmhjaUJsTzF4dUlDQWdJR2xtSUNoa2IyTXVZM0psWVhSbFJYWmxiblFwSUh0Y2JpQWdJQ0FnSUdVZ1BTQmtiMk11WTNKbFlYUmxSWFpsYm5Rb0owVjJaVzUwSnlrN1hHNGdJQ0FnSUNCbExtbHVhWFJGZG1WdWRDaDBlWEJsTENCMGNuVmxMQ0IwY25WbEtUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHUnZZeTVqY21WaGRHVkZkbVZ1ZEU5aWFtVmpkQ2tnZTF4dUlDQWdJQ0FnWlNBOUlHUnZZeTVqY21WaGRHVkZkbVZ1ZEU5aWFtVmpkQ2dwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1pUdGNiaUFnZlZ4dUlDQm1kVzVqZEdsdmJpQnRZV3RsUTNWemRHOXRSWFpsYm5RZ0tDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCdVpYY2dZM1Z6ZEc5dFJYWmxiblFvZEhsd1pTd2dleUJrWlhSaGFXdzZJRzF2WkdWc0lIMHBPMXh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUhkeVlYQndaWEpHWVdOMGIzSjVJQ2hsYkN3Z2RIbHdaU3dnWm00cElIdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJSGR5WVhCd1pYSWdLRzl5YVdkcGJtRnNSWFpsYm5RcElIdGNiaUFnSUNCMllYSWdaU0E5SUc5eWFXZHBibUZzUlhabGJuUWdmSHdnWjJ4dlltRnNMbVYyWlc1ME8xeHVJQ0FnSUdVdWRHRnlaMlYwSUQwZ1pTNTBZWEpuWlhRZ2ZId2daUzV6Y21ORmJHVnRaVzUwTzF4dUlDQWdJR1V1Y0hKbGRtVnVkRVJsWm1GMWJIUWdQU0JsTG5CeVpYWmxiblJFWldaaGRXeDBJSHg4SUdaMWJtTjBhVzl1SUhCeVpYWmxiblJFWldaaGRXeDBJQ2dwSUhzZ1pTNXlaWFIxY201V1lXeDFaU0E5SUdaaGJITmxPeUI5TzF4dUlDQWdJR1V1YzNSdmNGQnliM0JoWjJGMGFXOXVJRDBnWlM1emRHOXdVSEp2Y0dGbllYUnBiMjRnZkh3Z1puVnVZM1JwYjI0Z2MzUnZjRkJ5YjNCaFoyRjBhVzl1SUNncElIc2daUzVqWVc1alpXeENkV0ppYkdVZ1BTQjBjblZsT3lCOU8xeHVJQ0FnSUdVdWQyaHBZMmdnUFNCbExuZG9hV05vSUh4OElHVXVhMlY1UTI5a1pUdGNiaUFnSUNCbWJpNWpZV3hzS0dWc0xDQmxLVHRjYmlBZ2ZUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2QzSmhjQ0FvWld3c0lIUjVjR1VzSUdadUtTQjdYRzRnSUhaaGNpQjNjbUZ3Y0dWeUlEMGdkVzUzY21Gd0tHVnNMQ0IwZVhCbExDQm1iaWtnZkh3Z2QzSmhjSEJsY2taaFkzUnZjbmtvWld3c0lIUjVjR1VzSUdadUtUdGNiaUFnYUdGeVpFTmhZMmhsTG5CMWMyZ29lMXh1SUNBZ0lIZHlZWEJ3WlhJNklIZHlZWEJ3WlhJc1hHNGdJQ0FnWld4bGJXVnVkRG9nWld3c1hHNGdJQ0FnZEhsd1pUb2dkSGx3WlN4Y2JpQWdJQ0JtYmpvZ1ptNWNiaUFnZlNrN1hHNGdJSEpsZEhWeWJpQjNjbUZ3Y0dWeU8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCMWJuZHlZWEFnS0dWc0xDQjBlWEJsTENCbWJpa2dlMXh1SUNCMllYSWdhU0E5SUdacGJtUW9aV3dzSUhSNWNHVXNJR1p1S1R0Y2JpQWdhV1lnS0drcElIdGNiaUFnSUNCMllYSWdkM0poY0hCbGNpQTlJR2hoY21SRFlXTm9aVnRwWFM1M2NtRndjR1Z5TzF4dUlDQWdJR2hoY21SRFlXTm9aUzV6Y0d4cFkyVW9hU3dnTVNrN0lDOHZJR1p5WldVZ2RYQWdZU0IwWVdRZ2IyWWdiV1Z0YjNKNVhHNGdJQ0FnY21WMGRYSnVJSGR5WVhCd1pYSTdYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWm1sdVpDQW9aV3dzSUhSNWNHVXNJR1p1S1NCN1hHNGdJSFpoY2lCcExDQnBkR1Z0TzF4dUlDQm1iM0lnS0drZ1BTQXdPeUJwSUR3Z2FHRnlaRU5oWTJobExteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdhWFJsYlNBOUlHaGhjbVJEWVdOb1pWdHBYVHRjYmlBZ0lDQnBaaUFvYVhSbGJTNWxiR1Z0Wlc1MElEMDlQU0JsYkNBbUppQnBkR1Z0TG5SNWNHVWdQVDA5SUhSNWNHVWdKaVlnYVhSbGJTNW1iaUE5UFQwZ1ptNHBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnBPMXh1SUNBZ0lIMWNiaUFnZlZ4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHRjYmlBZ1lXUmtPaUJoWkdSRmRtVnVkQ3hjYmlBZ2NtVnRiM1psT2lCeVpXMXZkbVZGZG1WdWRDeGNiaUFnWm1GaWNtbGpZWFJsT2lCbVlXSnlhV05oZEdWRmRtVnVkRnh1ZlR0Y2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXZlbnRtYXAgPSBbXTtcbnZhciBldmVudG5hbWUgPSAnJztcbnZhciByb24gPSAvXm9uLztcblxuZm9yIChldmVudG5hbWUgaW4gZ2xvYmFsKSB7XG4gIGlmIChyb24udGVzdChldmVudG5hbWUpKSB7XG4gICAgZXZlbnRtYXAucHVzaChldmVudG5hbWUuc2xpY2UoMikpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXZlbnRtYXA7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWpjbTl6YzNabGJuUXZjM0pqTDJWMlpXNTBiV0Z3TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJsZG1WdWRHMWhjQ0E5SUZ0ZE8xeHVkbUZ5SUdWMlpXNTBibUZ0WlNBOUlDY25PMXh1ZG1GeUlISnZiaUE5SUM5ZWIyNHZPMXh1WEc1bWIzSWdLR1YyWlc1MGJtRnRaU0JwYmlCbmJHOWlZV3dwSUh0Y2JpQWdhV1lnS0hKdmJpNTBaWE4wS0dWMlpXNTBibUZ0WlNrcElIdGNiaUFnSUNCbGRtVnVkRzFoY0M1d2RYTm9LR1YyWlc1MGJtRnRaUzV6YkdsalpTZ3lLU2s3WEc0Z0lIMWNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbGRtVnVkRzFoY0R0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2VrdG9yID0gcmVxdWlyZSgnc2VrdG9yJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgcnNwYWNlcyA9IC9cXHMrL2c7XG52YXIga2V5bWFwID0ge1xuICAxMzogJ2VudGVyJyxcbiAgMjc6ICdlc2MnLFxuICAzMjogJ3NwYWNlJ1xufTtcbnZhciBoYW5kbGVycyA9IHt9O1xuXG5jcm9zc3ZlbnQuYWRkKHdpbmRvdywgJ2tleWRvd24nLCBrZXlkb3duKTtcblxuZnVuY3Rpb24gY2xlYXIgKGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQpIHtcbiAgICBpZiAoY29udGV4dCBpbiBoYW5kbGVycykge1xuICAgICAgaGFuZGxlcnNbY29udGV4dF0gPSB7fTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaGFuZGxlcnMgPSB7fTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzd2l0Y2hib2FyZCAodGhlbiwgY29tYm8sIG9wdGlvbnMsIGZuKSB7XG4gIGlmIChmbiA9PT0gdm9pZCAwKSB7XG4gICAgZm4gPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBjb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0IHx8ICdkZWZhdWx0cyc7XG5cbiAgaWYgKCFmbikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChoYW5kbGVyc1tjb250ZXh0XSA9PT0gdm9pZCAwKSB7XG4gICAgaGFuZGxlcnNbY29udGV4dF0gPSB7fTtcbiAgfVxuXG4gIGNvbWJvLnRvTG93ZXJDYXNlKCkuc3BsaXQocnNwYWNlcykuZm9yRWFjaChpdGVtKTtcblxuICBmdW5jdGlvbiBpdGVtIChrZXlzKSB7XG4gICAgdmFyIGMgPSBrZXlzLnRyaW0oKTtcbiAgICBpZiAoYy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhlbihoYW5kbGVyc1tjb250ZXh0XSwgYywgb3B0aW9ucywgZm4pO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uIChjb21ibywgb3B0aW9ucywgZm4pIHtcbiAgc3dpdGNoYm9hcmQoYWRkLCBjb21ibywgb3B0aW9ucywgZm4pO1xuXG4gIGZ1bmN0aW9uIGFkZCAoYXJlYSwga2V5LCBvcHRpb25zLCBmbikge1xuICAgIHZhciBoYW5kbGVyID0ge1xuICAgICAgaGFuZGxlOiBmbixcbiAgICAgIGZpbHRlcjogb3B0aW9ucy5maWx0ZXJcbiAgICB9O1xuICAgIGlmIChhcmVhW2tleV0pIHtcbiAgICAgIGFyZWFba2V5XS5wdXNoKGhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmVhW2tleV0gPSBbaGFuZGxlcl07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9mZiAoY29tYm8sIG9wdGlvbnMsIGZuKSB7XG4gIHN3aXRjaGJvYXJkKHJtLCBjb21ibywgb3B0aW9ucywgZm4pO1xuXG4gIGZ1bmN0aW9uIHJtIChhcmVhLCBrZXksIG9wdGlvbnMsIGZuKSB7XG4gICAgaWYgKGFyZWFba2V5XSkge1xuICAgICAgYXJlYVtrZXldID0gYXJlYVtrZXldLmZpbHRlcihtYXRjaGluZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hpbmcgKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBoYW5kbGVyLmhhbmRsZSA9PT0gZm4gJiYgaGFuZGxlci5maWx0ZXIgPT09IG9wdGlvbnMuZmlsdGVyO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRLZXlDb2RlIChlKSB7XG4gIHJldHVybiBlLndoaWNoIHx8IGUua2V5Q29kZSB8fCBlLmNoYXJDb2RlO1xufVxuXG5mdW5jdGlvbiBrZXlkb3duIChlKSB7XG4gIHZhciBjb2RlID0gZ2V0S2V5Q29kZShlKTtcbiAgdmFyIGtleSA9IGtleW1hcFtjb2RlXSB8fCBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZiAoa2V5KSB7XG4gICAgaGFuZGxlKGtleSwgZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VLZXlDb21ibyAoa2V5LCBlKSB7XG4gIHZhciBjb21ibyA9IFtrZXldO1xuICBpZiAoZS5zaGlmdEtleSkge1xuICAgIGNvbWJvLnVuc2hpZnQoJ3NoaWZ0Jyk7XG4gIH1cbiAgaWYgKGUuYWx0S2V5KSB7XG4gICAgY29tYm8udW5zaGlmdCgnYWx0Jyk7XG4gIH1cbiAgaWYgKGUuY3RybEtleSBeIGUubWV0YUtleSkge1xuICAgIGNvbWJvLnVuc2hpZnQoJ2NtZCcpO1xuICB9XG4gIHJldHVybiBjb21iby5qb2luKCcrJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlIChrZXksIGUpIHtcbiAgdmFyIGNvbWJvID0gcGFyc2VLZXlDb21ibyhrZXksIGUpO1xuICB2YXIgY29udGV4dDtcbiAgZm9yIChjb250ZXh0IGluIGhhbmRsZXJzKSB7XG4gICAgaWYgKGhhbmRsZXJzW2NvbnRleHRdW2NvbWJvXSkge1xuICAgICAgaGFuZGxlcnNbY29udGV4dF1bY29tYm9dLmZvckVhY2goZXhlYyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyZWQgKGhhbmRsZXIpIHtcbiAgICB2YXIgZmlsdGVyID0gaGFuZGxlci5maWx0ZXI7XG4gICAgaWYgKCFmaWx0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZWwgPSBlLnRhcmdldDtcbiAgICB2YXIgc2VsZWN0b3IgPSB0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJztcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBzZWt0b3IubWF0Y2hlc1NlbGVjdG9yKGVsLCBmaWx0ZXIpID09PSBmYWxzZTtcbiAgICB9XG4gICAgd2hpbGUgKGVsLnBhcmVudEVsZW1lbnQgJiYgZWwgIT09IGZpbHRlcikge1xuICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gZWwgIT09IGZpbHRlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4ZWMgKGhhbmRsZXIpIHtcbiAgICBpZiAoZmlsdGVyZWQoaGFuZGxlcikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGFuZGxlci5oYW5kbGUoZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uOiBvbixcbiAgb2ZmOiBvZmYsXG4gIGNsZWFyOiBjbGVhcixcbiAgaGFuZGxlcnM6IGhhbmRsZXJzXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXhwYW5kbyA9ICdzZWt0b3ItJyArIERhdGUubm93KCk7XG52YXIgcnNpYmxpbmdzID0gL1srfl0vO1xudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGRlbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbnZhciBtYXRjaCA9IGRlbC5tYXRjaGVzIHx8XG4gICAgICAgICAgICBkZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBkZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBkZWwub01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgZGVsLm1zTWF0Y2hlc1NlbGVjdG9yO1xuXG5mdW5jdGlvbiBxc2EgKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gIHZhciBleGlzdGVkLCBpZCwgcHJlZml4LCBwcmVmaXhlZCwgYWRhcHRlciwgaGFjayA9IGNvbnRleHQgIT09IGRvY3VtZW50O1xuICBpZiAoaGFjaykgeyAvLyBpZCBoYWNrIGZvciBjb250ZXh0LXJvb3RlZCBxdWVyaWVzXG4gICAgZXhpc3RlZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIGlkID0gZXhpc3RlZCB8fCBleHBhbmRvO1xuICAgIHByZWZpeCA9ICcjJyArIGlkICsgJyAnO1xuICAgIHByZWZpeGVkID0gcHJlZml4ICsgc2VsZWN0b3IucmVwbGFjZSgvLC9nLCAnLCcgKyBwcmVmaXgpO1xuICAgIGFkYXB0ZXIgPSByc2libGluZ3MudGVzdChzZWxlY3RvcikgJiYgY29udGV4dC5wYXJlbnROb2RlO1xuICAgIGlmICghZXhpc3RlZCkgeyBjb250ZXh0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7IH1cbiAgfVxuICB0cnkge1xuICAgIHJldHVybiAoYWRhcHRlciB8fCBjb250ZXh0KS5xdWVyeVNlbGVjdG9yQWxsKHByZWZpeGVkIHx8IHNlbGVjdG9yKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBbXTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoZXhpc3RlZCA9PT0gbnVsbCkgeyBjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTsgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmQgKHNlbGVjdG9yLCBjdHgsIGNvbGxlY3Rpb24sIHNlZWQpIHtcbiAgdmFyIGVsZW1lbnQ7XG4gIHZhciBjb250ZXh0ID0gY3R4IHx8IGRvY3VtZW50O1xuICB2YXIgcmVzdWx0cyA9IGNvbGxlY3Rpb24gfHwgW107XG4gIHZhciBpID0gMDtcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuICBpZiAoY29udGV4dC5ub2RlVHlwZSAhPT0gMSAmJiBjb250ZXh0Lm5vZGVUeXBlICE9PSA5KSB7XG4gICAgcmV0dXJuIFtdOyAvLyBiYWlsIGlmIGNvbnRleHQgaXMgbm90IGFuIGVsZW1lbnQgb3IgZG9jdW1lbnRcbiAgfVxuICBpZiAoc2VlZCkge1xuICAgIHdoaWxlICgoZWxlbWVudCA9IHNlZWRbaSsrXSkpIHtcbiAgICAgIGlmIChtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0cy5wdXNoLmFwcGx5KHJlc3VsdHMsIHFzYShzZWxlY3RvciwgY29udGV4dCkpO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVzIChzZWxlY3RvciwgZWxlbWVudHMpIHtcbiAgcmV0dXJuIGZpbmQoc2VsZWN0b3IsIG51bGwsIG51bGwsIGVsZW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gbWF0Y2guY2FsbChlbGVtZW50LCBzZWxlY3Rvcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZDtcblxuZmluZC5tYXRjaGVzID0gbWF0Y2hlcztcbmZpbmQubWF0Y2hlc1NlbGVjdG9yID0gbWF0Y2hlc1NlbGVjdG9yO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlyWVc1NVpTOXViMlJsWDIxdlpIVnNaWE12YzJWcmRHOXlMM055WXk5elpXdDBiM0l1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCbGVIQmhibVJ2SUQwZ0ozTmxhM1J2Y2kwbklDc2dSR0YwWlM1dWIzY29LVHRjYm5aaGNpQnljMmxpYkdsdVozTWdQU0F2V3l0K1hTODdYRzUyWVhJZ1pHOWpkVzFsYm5RZ1BTQm5iRzlpWVd3dVpHOWpkVzFsYm5RN1hHNTJZWElnWkdWc0lEMGdaRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1ME8xeHVkbUZ5SUcxaGRHTm9JRDBnWkdWc0xtMWhkR05vWlhNZ2ZIeGNiaUFnSUNBZ0lDQWdJQ0FnSUdSbGJDNTNaV0pyYVhSTllYUmphR1Z6VTJWc1pXTjBiM0lnZkh4Y2JpQWdJQ0FnSUNBZ0lDQWdJR1JsYkM1dGIzcE5ZWFJqYUdWelUyVnNaV04wYjNJZ2ZIeGNiaUFnSUNBZ0lDQWdJQ0FnSUdSbGJDNXZUV0YwWTJobGMxTmxiR1ZqZEc5eUlIeDhYRzRnSUNBZ0lDQWdJQ0FnSUNCa1pXd3ViWE5OWVhSamFHVnpVMlZzWldOMGIzSTdYRzVjYm1aMWJtTjBhVzl1SUhGellTQW9jMlZzWldOMGIzSXNJR052Ym5SbGVIUXBJSHRjYmlBZ2RtRnlJR1Y0YVhOMFpXUXNJR2xrTENCd2NtVm1hWGdzSUhCeVpXWnBlR1ZrTENCaFpHRndkR1Z5TENCb1lXTnJJRDBnWTI5dWRHVjRkQ0FoUFQwZ1pHOWpkVzFsYm5RN1hHNGdJR2xtSUNob1lXTnJLU0I3SUM4dklHbGtJR2hoWTJzZ1ptOXlJR052Ym5SbGVIUXRjbTl2ZEdWa0lIRjFaWEpwWlhOY2JpQWdJQ0JsZUdsemRHVmtJRDBnWTI5dWRHVjRkQzVuWlhSQmRIUnlhV0oxZEdVb0oybGtKeWs3WEc0Z0lDQWdhV1FnUFNCbGVHbHpkR1ZrSUh4OElHVjRjR0Z1Wkc4N1hHNGdJQ0FnY0hKbFptbDRJRDBnSnlNbklDc2dhV1FnS3lBbklDYzdYRzRnSUNBZ2NISmxabWw0WldRZ1BTQndjbVZtYVhnZ0t5QnpaV3hsWTNSdmNpNXlaWEJzWVdObEtDOHNMMmNzSUNjc0p5QXJJSEJ5WldacGVDazdYRzRnSUNBZ1lXUmhjSFJsY2lBOUlISnphV0pzYVc1bmN5NTBaWE4wS0hObGJHVmpkRzl5S1NBbUppQmpiMjUwWlhoMExuQmhjbVZ1ZEU1dlpHVTdYRzRnSUNBZ2FXWWdLQ0ZsZUdsemRHVmtLU0I3SUdOdmJuUmxlSFF1YzJWMFFYUjBjbWxpZFhSbEtDZHBaQ2NzSUdsa0tUc2dmVnh1SUNCOVhHNGdJSFJ5ZVNCN1hHNGdJQ0FnY21WMGRYSnVJQ2hoWkdGd2RHVnlJSHg4SUdOdmJuUmxlSFFwTG5GMVpYSjVVMlZzWldOMGIzSkJiR3dvY0hKbFptbDRaV1FnZkh3Z2MyVnNaV04wYjNJcE8xeHVJQ0I5SUdOaGRHTm9JQ2hsS1NCN1hHNGdJQ0FnY21WMGRYSnVJRnRkTzF4dUlDQjlJR1pwYm1Gc2JIa2dlMXh1SUNBZ0lHbG1JQ2hsZUdsemRHVmtJRDA5UFNCdWRXeHNLU0I3SUdOdmJuUmxlSFF1Y21WdGIzWmxRWFIwY21saWRYUmxLQ2RwWkNjcE95QjlYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWm1sdVpDQW9jMlZzWldOMGIzSXNJR04wZUN3Z1kyOXNiR1ZqZEdsdmJpd2djMlZsWkNrZ2UxeHVJQ0IyWVhJZ1pXeGxiV1Z1ZER0Y2JpQWdkbUZ5SUdOdmJuUmxlSFFnUFNCamRIZ2dmSHdnWkc5amRXMWxiblE3WEc0Z0lIWmhjaUJ5WlhOMWJIUnpJRDBnWTI5c2JHVmpkR2x2YmlCOGZDQmJYVHRjYmlBZ2RtRnlJR2tnUFNBd08xeHVJQ0JwWmlBb2RIbHdaVzltSUhObGJHVmpkRzl5SUNFOVBTQW5jM1J5YVc1bkp5a2dlMXh1SUNBZ0lISmxkSFZ5YmlCeVpYTjFiSFJ6TzF4dUlDQjlYRzRnSUdsbUlDaGpiMjUwWlhoMExtNXZaR1ZVZVhCbElDRTlQU0F4SUNZbUlHTnZiblJsZUhRdWJtOWtaVlI1Y0dVZ0lUMDlJRGtwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdXMTA3SUM4dklHSmhhV3dnYVdZZ1kyOXVkR1Y0ZENCcGN5QnViM1FnWVc0Z1pXeGxiV1Z1ZENCdmNpQmtiMk4xYldWdWRGeHVJQ0I5WEc0Z0lHbG1JQ2h6WldWa0tTQjdYRzRnSUNBZ2QyaHBiR1VnS0NobGJHVnRaVzUwSUQwZ2MyVmxaRnRwS3l0ZEtTa2dlMXh1SUNBZ0lDQWdhV1lnS0cxaGRHTm9aWE5UWld4bFkzUnZjaWhsYkdWdFpXNTBMQ0J6Wld4bFkzUnZjaWtwSUh0Y2JpQWdJQ0FnSUNBZ2NtVnpkV3gwY3k1d2RYTm9LR1ZzWlcxbGJuUXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnlaWE4xYkhSekxuQjFjMmd1WVhCd2JIa29jbVZ6ZFd4MGN5d2djWE5oS0hObGJHVmpkRzl5TENCamIyNTBaWGgwS1NrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkSE03WEc1OVhHNWNibVoxYm1OMGFXOXVJRzFoZEdOb1pYTWdLSE5sYkdWamRHOXlMQ0JsYkdWdFpXNTBjeWtnZTF4dUlDQnlaWFIxY200Z1ptbHVaQ2h6Wld4bFkzUnZjaXdnYm5Wc2JDd2diblZzYkN3Z1pXeGxiV1Z1ZEhNcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCdFlYUmphR1Z6VTJWc1pXTjBiM0lnS0dWc1pXMWxiblFzSUhObGJHVmpkRzl5S1NCN1hHNGdJSEpsZEhWeWJpQnRZWFJqYUM1allXeHNLR1ZzWlcxbGJuUXNJSE5sYkdWamRHOXlLVHRjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1hVzVrTzF4dVhHNW1hVzVrTG0xaGRHTm9aWE1nUFNCdFlYUmphR1Z6TzF4dVptbHVaQzV0WVhSamFHVnpVMlZzWldOMGIzSWdQU0J0WVhSamFHVnpVMlZzWldOMGIzSTdYRzRpWFgwPSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHN0dWIgPSByZXF1aXJlKCcuL3N0dWInKTtcbnZhciB0cmFja2luZyA9IHJlcXVpcmUoJy4vdHJhY2tpbmcnKTtcbnZhciBscyA9ICdsb2NhbFN0b3JhZ2UnIGluIGdsb2JhbCAmJiBnbG9iYWwubG9jYWxTdG9yYWdlID8gZ2xvYmFsLmxvY2FsU3RvcmFnZSA6IHN0dWI7XG5cbmZ1bmN0aW9uIGFjY2Vzc29yIChrZXksIHZhbHVlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGdldChrZXkpO1xuICB9XG4gIHJldHVybiBzZXQoa2V5LCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGdldCAoa2V5KSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxzLmdldEl0ZW0oa2V5KSk7XG59XG5cbmZ1bmN0aW9uIHNldCAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGxzLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAoa2V5KSB7XG4gIHJldHVybiBscy5yZW1vdmVJdGVtKGtleSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgcmV0dXJuIGxzLmNsZWFyKCk7XG59XG5cbmFjY2Vzc29yLnNldCA9IHNldDtcbmFjY2Vzc29yLmdldCA9IGdldDtcbmFjY2Vzc29yLnJlbW92ZSA9IHJlbW92ZTtcbmFjY2Vzc29yLmNsZWFyID0gY2xlYXI7XG5hY2Nlc3Nvci5vbiA9IHRyYWNraW5nLm9uO1xuYWNjZXNzb3Iub2ZmID0gdHJhY2tpbmcub2ZmO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFjY2Vzc29yO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlzYjJOaGJDMXpkRzl5WVdkbEwyeHZZMkZzTFhOMGIzSmhaMlV1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJ6ZEhWaUlEMGdjbVZ4ZFdseVpTZ25MaTl6ZEhWaUp5azdYRzUyWVhJZ2RISmhZMnRwYm1jZ1BTQnlaWEYxYVhKbEtDY3VMM1J5WVdOcmFXNW5KeWs3WEc1MllYSWdiSE1nUFNBbmJHOWpZV3hUZEc5eVlXZGxKeUJwYmlCbmJHOWlZV3dnSmlZZ1oyeHZZbUZzTG14dlkyRnNVM1J2Y21GblpTQS9JR2RzYjJKaGJDNXNiMk5oYkZOMGIzSmhaMlVnT2lCemRIVmlPMXh1WEc1bWRXNWpkR2x2YmlCaFkyTmxjM052Y2lBb2EyVjVMQ0IyWVd4MVpTa2dlMXh1SUNCcFppQW9ZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQTlQVDBnTVNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJuWlhRb2EyVjVLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjMlYwS0d0bGVTd2dkbUZzZFdVcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCblpYUWdLR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdTbE5QVGk1d1lYSnpaU2hzY3k1blpYUkpkR1Z0S0d0bGVTa3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnpaWFFnS0d0bGVTd2dkbUZzZFdVcElIdGNiaUFnZEhKNUlIdGNiaUFnSUNCc2N5NXpaWFJKZEdWdEtHdGxlU3dnU2xOUFRpNXpkSEpwYm1kcFpua29kbUZzZFdVcEtUdGNiaUFnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WlcxdmRtVWdLR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdiSE11Y21WdGIzWmxTWFJsYlNoclpYa3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmpiR1ZoY2lBb0tTQjdYRzRnSUhKbGRIVnliaUJzY3k1amJHVmhjaWdwTzF4dWZWeHVYRzVoWTJObGMzTnZjaTV6WlhRZ1BTQnpaWFE3WEc1aFkyTmxjM052Y2k1blpYUWdQU0JuWlhRN1hHNWhZMk5sYzNOdmNpNXlaVzF2ZG1VZ1BTQnlaVzF2ZG1VN1hHNWhZMk5sYzNOdmNpNWpiR1ZoY2lBOUlHTnNaV0Z5TzF4dVlXTmpaWE56YjNJdWIyNGdQU0IwY21GamEybHVaeTV2Ymp0Y2JtRmpZMlZ6YzI5eUxtOW1aaUE5SUhSeVlXTnJhVzVuTG05bVpqdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JoWTJObGMzTnZjanRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtcyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRJdGVtIChrZXkpIHtcbiAgcmV0dXJuIGtleSBpbiBtcyA/IG1zW2tleV0gOiBudWxsO1xufVxuXG5mdW5jdGlvbiBzZXRJdGVtIChrZXksIHZhbHVlKSB7XG4gIG1zW2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUl0ZW0gKGtleSkge1xuICB2YXIgZm91bmQgPSBrZXkgaW4gbXM7XG4gIGlmIChmb3VuZCkge1xuICAgIHJldHVybiBkZWxldGUgbXNba2V5XTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgbXMgPSB7fTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRJdGVtOiBnZXRJdGVtLFxuICBzZXRJdGVtOiBzZXRJdGVtLFxuICByZW1vdmVJdGVtOiByZW1vdmVJdGVtLFxuICBjbGVhcjogY2xlYXJcbn07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBsaXN0ZW5lcnMgPSB7fTtcbnZhciBsaXN0ZW5pbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gbGlzdGVuICgpIHtcbiAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBjaGFuZ2UsIGZhbHNlKTtcbiAgfSBlbHNlIGlmIChnbG9iYWwuYXR0YWNoRXZlbnQpIHtcbiAgICBnbG9iYWwuYXR0YWNoRXZlbnQoJ29uc3RvcmFnZScsIGNoYW5nZSk7XG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFsLm9uc3RvcmFnZSA9IGNoYW5nZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGFuZ2UgKGUpIHtcbiAgaWYgKCFlKSB7XG4gICAgZSA9IGdsb2JhbC5ldmVudDtcbiAgfVxuICB2YXIgYWxsID0gbGlzdGVuZXJzW2Uua2V5XTtcbiAgaWYgKGFsbCkge1xuICAgIGFsbC5mb3JFYWNoKGZpcmUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyZSAobGlzdGVuZXIpIHtcbiAgICBsaXN0ZW5lcihKU09OLnBhcnNlKGUubmV3VmFsdWUpLCBKU09OLnBhcnNlKGUub2xkVmFsdWUpLCBlLnVybCB8fCBlLnVyaSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb24gKGtleSwgZm4pIHtcbiAgaWYgKGxpc3RlbmVyc1trZXldKSB7XG4gICAgbGlzdGVuZXJzW2tleV0ucHVzaChmbik7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXJzW2tleV0gPSBbZm5dO1xuICB9XG4gIGlmIChsaXN0ZW5pbmcgPT09IGZhbHNlKSB7XG4gICAgbGlzdGVuKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb2ZmIChrZXksIGZuKSB7XG4gIHZhciBucyA9IGxpc3RlbmVyc1trZXldO1xuICBpZiAobnMubGVuZ3RoID4gMSkge1xuICAgIG5zLnNwbGljZShucy5pbmRleE9mKGZuKSwgMSk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXJzW2tleV0gPSBbXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb246IG9uLFxuICBvZmY6IG9mZlxufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5c2IyTmhiQzF6ZEc5eVlXZGxMM1J5WVdOcmFXNW5MbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJR3hwYzNSbGJtVnljeUE5SUh0OU8xeHVkbUZ5SUd4cGMzUmxibWx1WnlBOUlHWmhiSE5sTzF4dVhHNW1kVzVqZEdsdmJpQnNhWE4wWlc0Z0tDa2dlMXh1SUNCcFppQW9aMnh2WW1Gc0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJcElIdGNiaUFnSUNCbmJHOWlZV3d1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduYzNSdmNtRm5aU2NzSUdOb1lXNW5aU3dnWm1Gc2MyVXBPMXh1SUNCOUlHVnNjMlVnYVdZZ0tHZHNiMkpoYkM1aGRIUmhZMmhGZG1WdWRDa2dlMXh1SUNBZ0lHZHNiMkpoYkM1aGRIUmhZMmhGZG1WdWRDZ25iMjV6ZEc5eVlXZGxKeXdnWTJoaGJtZGxLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JuYkc5aVlXd3ViMjV6ZEc5eVlXZGxJRDBnWTJoaGJtZGxPMXh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUdOb1lXNW5aU0FvWlNrZ2UxeHVJQ0JwWmlBb0lXVXBJSHRjYmlBZ0lDQmxJRDBnWjJ4dlltRnNMbVYyWlc1ME8xeHVJQ0I5WEc0Z0lIWmhjaUJoYkd3Z1BTQnNhWE4wWlc1bGNuTmJaUzVyWlhsZE8xeHVJQ0JwWmlBb1lXeHNLU0I3WEc0Z0lDQWdZV3hzTG1admNrVmhZMmdvWm1seVpTazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJtYVhKbElDaHNhWE4wWlc1bGNpa2dlMXh1SUNBZ0lHeHBjM1JsYm1WeUtFcFRUMDR1Y0dGeWMyVW9aUzV1WlhkV1lXeDFaU2tzSUVwVFQwNHVjR0Z5YzJVb1pTNXZiR1JXWVd4MVpTa3NJR1V1ZFhKc0lIeDhJR1V1ZFhKcEtUdGNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ2YmlBb2EyVjVMQ0JtYmlrZ2UxeHVJQ0JwWmlBb2JHbHpkR1Z1WlhKelcydGxlVjBwSUh0Y2JpQWdJQ0JzYVhOMFpXNWxjbk5iYTJWNVhTNXdkWE5vS0dadUtUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnNhWE4wWlc1bGNuTmJhMlY1WFNBOUlGdG1ibDA3WEc0Z0lIMWNiaUFnYVdZZ0tHeHBjM1JsYm1sdVp5QTlQVDBnWm1Gc2MyVXBJSHRjYmlBZ0lDQnNhWE4wWlc0b0tUdGNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ2Wm1ZZ0tHdGxlU3dnWm00cElIdGNiaUFnZG1GeUlHNXpJRDBnYkdsemRHVnVaWEp6VzJ0bGVWMDdYRzRnSUdsbUlDaHVjeTVzWlc1bmRHZ2dQaUF4S1NCN1hHNGdJQ0FnYm5NdWMzQnNhV05sS0c1ekxtbHVaR1Y0VDJZb1ptNHBMQ0F4S1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCc2FYTjBaVzVsY25OYmEyVjVYU0E5SUZ0ZE8xeHVJQ0I5WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdlMXh1SUNCdmJqb2diMjRzWEc0Z0lHOW1aam9nYjJabVhHNTlPMXh1SWwxOSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGdldFNlbGVjdGlvbjtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgcmFuZ2VUb1RleHRSYW5nZSA9IHJlcXVpcmUoJy4vcmFuZ2VUb1RleHRSYW5nZScpO1xudmFyIGdldFNlbGVjdGlvblJhdyA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uUmF3Jyk7XG52YXIgZ2V0U2VsZWN0aW9uTnVsbE9wID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb25OdWxsT3AnKTtcbnZhciBnZXRTZWxlY3Rpb25TeW50aGV0aWMgPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvblN5bnRoZXRpYycpO1xudmFyIGlzSG9zdCA9IHJlcXVpcmUoJy4vaXNIb3N0Jyk7XG5pZiAoaXNIb3N0Lm1ldGhvZChnbG9iYWwsICdnZXRTZWxlY3Rpb24nKSkge1xuICBnZXRTZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb25SYXc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2Muc2VsZWN0aW9uID09PSAnb2JqZWN0JyAmJiBkb2Muc2VsZWN0aW9uKSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvblN5bnRoZXRpYztcbn0gZWxzZSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvbk51bGxPcDtcbn1cblxuZ2V0U2VsZWN0aW9uLnJhbmdlVG9UZXh0UmFuZ2UgPSByYW5nZVRvVGV4dFJhbmdlO1xubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb247XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDJkbGRGTmxiR1ZqZEdsdmJpNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdaMlYwVTJWc1pXTjBhVzl1TzF4dWRtRnlJR1J2WXlBOUlHZHNiMkpoYkM1a2IyTjFiV1Z1ZER0Y2JuWmhjaUJ5WVc1blpWUnZWR1Y0ZEZKaGJtZGxJRDBnY21WeGRXbHlaU2duTGk5eVlXNW5aVlJ2VkdWNGRGSmhibWRsSnlrN1hHNTJZWElnWjJWMFUyVnNaV04wYVc5dVVtRjNJRDBnY21WeGRXbHlaU2duTGk5blpYUlRaV3hsWTNScGIyNVNZWGNuS1R0Y2JuWmhjaUJuWlhSVFpXeGxZM1JwYjI1T2RXeHNUM0FnUFNCeVpYRjFhWEpsS0NjdUwyZGxkRk5sYkdWamRHbHZiazUxYkd4UGNDY3BPMXh1ZG1GeUlHZGxkRk5sYkdWamRHbHZibE41Ym5Sb1pYUnBZeUE5SUhKbGNYVnBjbVVvSnk0dloyVjBVMlZzWldOMGFXOXVVM2x1ZEdobGRHbGpKeWs3WEc1MllYSWdhWE5JYjNOMElEMGdjbVZ4ZFdseVpTZ25MaTlwYzBodmMzUW5LVHRjYm1sbUlDaHBjMGh2YzNRdWJXVjBhRzlrS0dkc2IySmhiQ3dnSjJkbGRGTmxiR1ZqZEdsdmJpY3BLU0I3WEc0Z0lHZGxkRk5sYkdWamRHbHZiaUE5SUdkbGRGTmxiR1ZqZEdsdmJsSmhkenRjYm4wZ1pXeHpaU0JwWmlBb2RIbHdaVzltSUdSdll5NXpaV3hsWTNScGIyNGdQVDA5SUNkdlltcGxZM1FuSUNZbUlHUnZZeTV6Wld4bFkzUnBiMjRwSUh0Y2JpQWdaMlYwVTJWc1pXTjBhVzl1SUQwZ1oyVjBVMlZzWldOMGFXOXVVM2x1ZEdobGRHbGpPMXh1ZlNCbGJITmxJSHRjYmlBZ1oyVjBVMlZzWldOMGFXOXVJRDBnWjJWMFUyVnNaV04wYVc5dVRuVnNiRTl3TzF4dWZWeHVYRzVuWlhSVFpXeGxZM1JwYjI0dWNtRnVaMlZVYjFSbGVIUlNZVzVuWlNBOUlISmhibWRsVkc5VVpYaDBVbUZ1WjJVN1hHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHZGxkRk5sYkdWamRHbHZianRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uTnVsbE9wICgpIHtcbiAgcmV0dXJuIHtcbiAgICByZW1vdmVBbGxSYW5nZXM6IG5vb3AsXG4gICAgYWRkUmFuZ2U6IG5vb3BcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb25OdWxsT3A7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGlvblJhdyAoKSB7XG4gIHJldHVybiBnbG9iYWwuZ2V0U2VsZWN0aW9uKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uUmF3O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld4bFkyTnBiMjR2YzNKakwyZGxkRk5sYkdWamRHbHZibEpoZHk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1bWRXNWpkR2x2YmlCblpYUlRaV3hsWTNScGIyNVNZWGNnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdaMnh2WW1Gc0xtZGxkRk5sYkdWamRHbHZiaWdwTzF4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR2RsZEZObGJHVmpkR2x2YmxKaGR6dGNiaUpkZlE9PSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmdlVG9UZXh0UmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlVG9UZXh0UmFuZ2UnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYm9keSA9IGRvYy5ib2R5O1xudmFyIEdldFNlbGVjdGlvblByb3RvID0gR2V0U2VsZWN0aW9uLnByb3RvdHlwZTtcblxuZnVuY3Rpb24gR2V0U2VsZWN0aW9uIChzZWxlY3Rpb24pIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgcmFuZ2UgPSBzZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcblxuICB0aGlzLl9zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gIHRoaXMuX3JhbmdlcyA9IFtdO1xuXG4gIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ0NvbnRyb2wnKSB7XG4gICAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbihzZWxmKTtcbiAgfSBlbHNlIGlmIChpc1RleHRSYW5nZShyYW5nZSkpIHtcbiAgICB1cGRhdGVGcm9tVGV4dFJhbmdlKHNlbGYsIHJhbmdlKTtcbiAgfSBlbHNlIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWxmKTtcbiAgfVxufVxuXG5HZXRTZWxlY3Rpb25Qcm90by5yZW1vdmVBbGxSYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0UmFuZ2U7XG4gIHRyeSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbi50eXBlICE9PSAnTm9uZScpIHtcbiAgICAgIHRleHRSYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICB0ZXh0UmFuZ2Uuc2VsZWN0KCk7XG4gICAgICB0aGlzLl9zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICB1cGRhdGVFbXB0eVNlbGVjdGlvbih0aGlzKTtcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmFkZFJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSA9PT0gJ0NvbnRyb2wnKSB7XG4gICAgYWRkUmFuZ2VUb0NvbnRyb2xTZWxlY3Rpb24odGhpcywgcmFuZ2UpO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlVG9UZXh0UmFuZ2UocmFuZ2UpLnNlbGVjdCgpO1xuICAgIHRoaXMuX3Jhbmdlc1swXSA9IHJhbmdlO1xuICAgIHRoaXMucmFuZ2VDb3VudCA9IDE7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRoaXMuX3Jhbmdlc1swXS5jb2xsYXBzZWQ7XG4gICAgdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2UodGhpcywgcmFuZ2UsIGZhbHNlKTtcbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uc2V0UmFuZ2VzID0gZnVuY3Rpb24gKHJhbmdlcykge1xuICB0aGlzLnJlbW92ZUFsbFJhbmdlcygpO1xuICB2YXIgcmFuZ2VDb3VudCA9IHJhbmdlcy5sZW5ndGg7XG4gIGlmIChyYW5nZUNvdW50ID4gMSkge1xuICAgIGNyZWF0ZUNvbnRyb2xTZWxlY3Rpb24odGhpcywgcmFuZ2VzKTtcbiAgfSBlbHNlIGlmIChyYW5nZUNvdW50KSB7XG4gICAgdGhpcy5hZGRSYW5nZShyYW5nZXNbMF0pO1xuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5nZXRSYW5nZUF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5yYW5nZUNvdW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRSYW5nZUF0KCk6IGluZGV4IG91dCBvZiBib3VuZHMnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VzW2luZGV4XS5jbG9uZVJhbmdlKCk7XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLnJlbW92ZVJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSAhPT0gJ0NvbnRyb2wnKSB7XG4gICAgcmVtb3ZlUmFuZ2VNYW51YWxseSh0aGlzLCByYW5nZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjb250cm9sUmFuZ2UgPSB0aGlzLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHJhbmdlRWxlbWVudCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2UpO1xuICB2YXIgbmV3Q29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgdmFyIGVsO1xuICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gY29udHJvbFJhbmdlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgZWwgPSBjb250cm9sUmFuZ2UuaXRlbShpKTtcbiAgICBpZiAoZWwgIT09IHJhbmdlRWxlbWVudCB8fCByZW1vdmVkKSB7XG4gICAgICBuZXdDb250cm9sUmFuZ2UuYWRkKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfVxuICB9XG4gIG5ld0NvbnRyb2xSYW5nZS5zZWxlY3QoKTtcbiAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbih0aGlzKTtcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmVhY2hSYW5nZSA9IGZ1bmN0aW9uIChmbiwgcmV0dXJuVmFsdWUpIHtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbGVuID0gdGhpcy5fcmFuZ2VzLmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGZuKHRoaXMuZ2V0UmFuZ2VBdChpKSkpIHtcbiAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmdldEFsbFJhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJhbmdlcyA9IFtdO1xuICB0aGlzLmVhY2hSYW5nZShmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICByYW5nZXMucHVzaChyYW5nZSk7XG4gIH0pO1xuICByZXR1cm4gcmFuZ2VzO1xufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uc2V0U2luZ2xlUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgdGhpcy5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgdGhpcy5hZGRSYW5nZShyYW5nZSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDb250cm9sU2VsZWN0aW9uIChzZWwsIHJhbmdlcykge1xuICB2YXIgY29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGVsLCBsZW4gPSByYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBlbCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2VzW2ldKTtcbiAgICB0cnkge1xuICAgICAgY29udHJvbFJhbmdlLmFkZChlbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRSYW5nZXMoKTogRWxlbWVudCBjb3VsZCBub3QgYmUgYWRkZWQgdG8gY29udHJvbCBzZWxlY3Rpb24nKTtcbiAgICB9XG4gIH1cbiAgY29udHJvbFJhbmdlLnNlbGVjdCgpO1xuICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHNlbCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJhbmdlTWFudWFsbHkgKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIHJhbmdlcyA9IHNlbC5nZXRBbGxSYW5nZXMoKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmFuZ2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKCFpc1NhbWVSYW5nZShyYW5nZSwgcmFuZ2VzW2ldKSkge1xuICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmICghc2VsLnJhbmdlQ291bnQpIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlIChzZWwsIHJhbmdlKSB7XG4gIHZhciBhbmNob3JQcmVmaXggPSAnc3RhcnQnO1xuICB2YXIgZm9jdXNQcmVmaXggPSAnZW5kJztcbiAgc2VsLmFuY2hvck5vZGUgPSByYW5nZVthbmNob3JQcmVmaXggKyAnQ29udGFpbmVyJ107XG4gIHNlbC5hbmNob3JPZmZzZXQgPSByYW5nZVthbmNob3JQcmVmaXggKyAnT2Zmc2V0J107XG4gIHNlbC5mb2N1c05vZGUgPSByYW5nZVtmb2N1c1ByZWZpeCArICdDb250YWluZXInXTtcbiAgc2VsLmZvY3VzT2Zmc2V0ID0gcmFuZ2VbZm9jdXNQcmVmaXggKyAnT2Zmc2V0J107XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUVtcHR5U2VsZWN0aW9uIChzZWwpIHtcbiAgc2VsLmFuY2hvck5vZGUgPSBzZWwuZm9jdXNOb2RlID0gbnVsbDtcbiAgc2VsLmFuY2hvck9mZnNldCA9IHNlbC5mb2N1c09mZnNldCA9IDA7XG4gIHNlbC5yYW5nZUNvdW50ID0gMDtcbiAgc2VsLmlzQ29sbGFwc2VkID0gdHJ1ZTtcbiAgc2VsLl9yYW5nZXMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gcmFuZ2VDb250YWluc1NpbmdsZUVsZW1lbnQgKHJhbmdlTm9kZXMpIHtcbiAgaWYgKCFyYW5nZU5vZGVzLmxlbmd0aCB8fCByYW5nZU5vZGVzWzBdLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAodmFyIGkgPSAxLCBsZW4gPSByYW5nZU5vZGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKCFpc0FuY2VzdG9yT2YocmFuZ2VOb2Rlc1swXSwgcmFuZ2VOb2Rlc1tpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UgKHJhbmdlKSB7XG4gIHZhciBub2RlcyA9IHJhbmdlLmdldE5vZGVzKCk7XG4gIGlmICghcmFuZ2VDb250YWluc1NpbmdsZUVsZW1lbnQobm9kZXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKCk6IHJhbmdlIGRpZCBub3QgY29uc2lzdCBvZiBhIHNpbmdsZSBlbGVtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIG5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBpc1RleHRSYW5nZSAocmFuZ2UpIHtcbiAgcmV0dXJuIHJhbmdlICYmIHJhbmdlLnRleHQgIT09IHZvaWQgMDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRnJvbVRleHRSYW5nZSAoc2VsLCByYW5nZSkge1xuICBzZWwuX3JhbmdlcyA9IFtyYW5nZV07XG4gIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlKHNlbCwgcmFuZ2UsIGZhbHNlKTtcbiAgc2VsLnJhbmdlQ291bnQgPSAxO1xuICBzZWwuaXNDb2xsYXBzZWQgPSByYW5nZS5jb2xsYXBzZWQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24gKHNlbCkge1xuICBzZWwuX3Jhbmdlcy5sZW5ndGggPSAwO1xuICBpZiAoc2VsLl9zZWxlY3Rpb24udHlwZSA9PT0gJ05vbmUnKSB7XG4gICAgdXBkYXRlRW1wdHlTZWxlY3Rpb24oc2VsKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY29udHJvbFJhbmdlID0gc2VsLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICBpZiAoaXNUZXh0UmFuZ2UoY29udHJvbFJhbmdlKSkge1xuICAgICAgdXBkYXRlRnJvbVRleHRSYW5nZShzZWwsIGNvbnRyb2xSYW5nZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbC5yYW5nZUNvdW50ID0gY29udHJvbFJhbmdlLmxlbmd0aDtcbiAgICAgIHZhciByYW5nZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsLnJhbmdlQ291bnQ7ICsraSkge1xuICAgICAgICByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgICAgICAgc2VsLl9yYW5nZXMucHVzaChyYW5nZSk7XG4gICAgICB9XG4gICAgICBzZWwuaXNDb2xsYXBzZWQgPSBzZWwucmFuZ2VDb3VudCA9PT0gMSAmJiBzZWwuX3Jhbmdlc1swXS5jb2xsYXBzZWQ7XG4gICAgICB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZShzZWwsIHNlbC5fcmFuZ2VzW3NlbC5yYW5nZUNvdW50IC0gMV0sIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkUmFuZ2VUb0NvbnRyb2xTZWxlY3Rpb24gKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIGNvbnRyb2xSYW5nZSA9IHNlbC5fc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gIHZhciByYW5nZUVsZW1lbnQgPSBnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKHJhbmdlKTtcbiAgdmFyIG5ld0NvbnRyb2xSYW5nZSA9IGJvZHkuY3JlYXRlQ29udHJvbFJhbmdlKCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjb250cm9sUmFuZ2UubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBuZXdDb250cm9sUmFuZ2UuYWRkKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgfVxuICB0cnkge1xuICAgIG5ld0NvbnRyb2xSYW5nZS5hZGQocmFuZ2VFbGVtZW50KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignYWRkUmFuZ2UoKTogRWxlbWVudCBjb3VsZCBub3QgYmUgYWRkZWQgdG8gY29udHJvbCBzZWxlY3Rpb24nKTtcbiAgfVxuICBuZXdDb250cm9sUmFuZ2Uuc2VsZWN0KCk7XG4gIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24oc2VsKTtcbn1cblxuZnVuY3Rpb24gaXNTYW1lUmFuZ2UgKGxlZnQsIHJpZ2h0KSB7XG4gIHJldHVybiAoXG4gICAgbGVmdC5zdGFydENvbnRhaW5lciA9PT0gcmlnaHQuc3RhcnRDb250YWluZXIgJiZcbiAgICBsZWZ0LnN0YXJ0T2Zmc2V0ID09PSByaWdodC5zdGFydE9mZnNldCAmJlxuICAgIGxlZnQuZW5kQ29udGFpbmVyID09PSByaWdodC5lbmRDb250YWluZXIgJiZcbiAgICBsZWZ0LmVuZE9mZnNldCA9PT0gcmlnaHQuZW5kT2Zmc2V0XG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzQW5jZXN0b3JPZiAoYW5jZXN0b3IsIGRlc2NlbmRhbnQpIHtcbiAgdmFyIG5vZGUgPSBkZXNjZW5kYW50O1xuICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSA9PT0gYW5jZXN0b3IpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBHZXRTZWxlY3Rpb24oZ2xvYmFsLmRvY3VtZW50LnNlbGVjdGlvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld4bFkyTnBiMjR2YzNKakwyZGxkRk5sYkdWamRHbHZibE41Ym5Sb1pYUnBZeTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2NtRnVaMlZVYjFSbGVIUlNZVzVuWlNBOUlISmxjWFZwY21Vb0p5NHZjbUZ1WjJWVWIxUmxlSFJTWVc1blpTY3BPMXh1ZG1GeUlHUnZZeUE5SUdkc2IySmhiQzVrYjJOMWJXVnVkRHRjYm5aaGNpQmliMlI1SUQwZ1pHOWpMbUp2WkhrN1hHNTJZWElnUjJWMFUyVnNaV04wYVc5dVVISnZkRzhnUFNCSFpYUlRaV3hsWTNScGIyNHVjSEp2ZEc5MGVYQmxPMXh1WEc1bWRXNWpkR2x2YmlCSFpYUlRaV3hsWTNScGIyNGdLSE5sYkdWamRHbHZiaWtnZTF4dUlDQjJZWElnYzJWc1ppQTlJSFJvYVhNN1hHNGdJSFpoY2lCeVlXNW5aU0E5SUhObGJHVmpkR2x2Ymk1amNtVmhkR1ZTWVc1blpTZ3BPMXh1WEc0Z0lIUm9hWE11WDNObGJHVmpkR2x2YmlBOUlITmxiR1ZqZEdsdmJqdGNiaUFnZEdocGN5NWZjbUZ1WjJWeklEMGdXMTA3WEc1Y2JpQWdhV1lnS0hObGJHVmpkR2x2Ymk1MGVYQmxJRDA5UFNBblEyOXVkSEp2YkNjcElIdGNiaUFnSUNCMWNHUmhkR1ZEYjI1MGNtOXNVMlZzWldOMGFXOXVLSE5sYkdZcE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0dselZHVjRkRkpoYm1kbEtISmhibWRsS1NrZ2UxeHVJQ0FnSUhWd1pHRjBaVVp5YjIxVVpYaDBVbUZ1WjJVb2MyVnNaaXdnY21GdVoyVXBPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSFZ3WkdGMFpVVnRjSFI1VTJWc1pXTjBhVzl1S0hObGJHWXBPMXh1SUNCOVhHNTlYRzVjYmtkbGRGTmxiR1ZqZEdsdmJsQnliM1J2TG5KbGJXOTJaVUZzYkZKaGJtZGxjeUE5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnZG1GeUlIUmxlSFJTWVc1blpUdGNiaUFnZEhKNUlIdGNiaUFnSUNCMGFHbHpMbDl6Wld4bFkzUnBiMjR1Wlcxd2RIa29LVHRjYmlBZ0lDQnBaaUFvZEdocGN5NWZjMlZzWldOMGFXOXVMblI1Y0dVZ0lUMDlJQ2RPYjI1bEp5a2dlMXh1SUNBZ0lDQWdkR1Y0ZEZKaGJtZGxJRDBnWW05a2VTNWpjbVZoZEdWVVpYaDBVbUZ1WjJVb0tUdGNiaUFnSUNBZ0lIUmxlSFJTWVc1blpTNXpaV3hsWTNRb0tUdGNiaUFnSUNBZ0lIUm9hWE11WDNObGJHVmpkR2x2Ymk1bGJYQjBlU2dwTzF4dUlDQWdJSDFjYmlBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNCOVhHNGdJSFZ3WkdGMFpVVnRjSFI1VTJWc1pXTjBhVzl1S0hSb2FYTXBPMXh1ZlR0Y2JseHVSMlYwVTJWc1pXTjBhVzl1VUhKdmRHOHVZV1JrVW1GdVoyVWdQU0JtZFc1amRHbHZiaUFvY21GdVoyVXBJSHRjYmlBZ2FXWWdLSFJvYVhNdVgzTmxiR1ZqZEdsdmJpNTBlWEJsSUQwOVBTQW5RMjl1ZEhKdmJDY3BJSHRjYmlBZ0lDQmhaR1JTWVc1blpWUnZRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpaDBhR2x6TENCeVlXNW5aU2s3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnY21GdVoyVlViMVJsZUhSU1lXNW5aU2h5WVc1blpTa3VjMlZzWldOMEtDazdYRzRnSUNBZ2RHaHBjeTVmY21GdVoyVnpXekJkSUQwZ2NtRnVaMlU3WEc0Z0lDQWdkR2hwY3k1eVlXNW5aVU52ZFc1MElEMGdNVHRjYmlBZ0lDQjBhR2x6TG1selEyOXNiR0Z3YzJWa0lEMGdkR2hwY3k1ZmNtRnVaMlZ6V3pCZExtTnZiR3hoY0hObFpEdGNiaUFnSUNCMWNHUmhkR1ZCYm1Ob2IzSkJibVJHYjJOMWMwWnliMjFTWVc1blpTaDBhR2x6TENCeVlXNW5aU3dnWm1Gc2MyVXBPMXh1SUNCOVhHNTlPMXh1WEc1SFpYUlRaV3hsWTNScGIyNVFjbTkwYnk1elpYUlNZVzVuWlhNZ1BTQm1kVzVqZEdsdmJpQW9jbUZ1WjJWektTQjdYRzRnSUhSb2FYTXVjbVZ0YjNabFFXeHNVbUZ1WjJWektDazdYRzRnSUhaaGNpQnlZVzVuWlVOdmRXNTBJRDBnY21GdVoyVnpMbXhsYm1kMGFEdGNiaUFnYVdZZ0tISmhibWRsUTI5MWJuUWdQaUF4S1NCN1hHNGdJQ0FnWTNKbFlYUmxRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpaDBhR2x6TENCeVlXNW5aWE1wTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLSEpoYm1kbFEyOTFiblFwSUh0Y2JpQWdJQ0IwYUdsekxtRmtaRkpoYm1kbEtISmhibWRsYzFzd1hTazdYRzRnSUgxY2JuMDdYRzVjYmtkbGRGTmxiR1ZqZEdsdmJsQnliM1J2TG1kbGRGSmhibWRsUVhRZ1BTQm1kVzVqZEdsdmJpQW9hVzVrWlhncElIdGNiaUFnYVdZZ0tHbHVaR1Y0SUR3Z01DQjhmQ0JwYm1SbGVDQStQU0IwYUdsekxuSmhibWRsUTI5MWJuUXBJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oyZGxkRkpoYm1kbFFYUW9LVG9nYVc1a1pYZ2diM1YwSUc5bUlHSnZkVzVrY3ljcE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpMbDl5WVc1blpYTmJhVzVrWlhoZExtTnNiMjVsVW1GdVoyVW9LVHRjYmlBZ2ZWeHVmVHRjYmx4dVIyVjBVMlZzWldOMGFXOXVVSEp2ZEc4dWNtVnRiM1psVW1GdVoyVWdQU0JtZFc1amRHbHZiaUFvY21GdVoyVXBJSHRjYmlBZ2FXWWdLSFJvYVhNdVgzTmxiR1ZqZEdsdmJpNTBlWEJsSUNFOVBTQW5RMjl1ZEhKdmJDY3BJSHRjYmlBZ0lDQnlaVzF2ZG1WU1lXNW5aVTFoYm5WaGJHeDVLSFJvYVhNc0lISmhibWRsS1R0Y2JpQWdJQ0J5WlhSMWNtNDdYRzRnSUgxY2JpQWdkbUZ5SUdOdmJuUnliMnhTWVc1blpTQTlJSFJvYVhNdVgzTmxiR1ZqZEdsdmJpNWpjbVZoZEdWU1lXNW5aU2dwTzF4dUlDQjJZWElnY21GdVoyVkZiR1Z0Wlc1MElEMGdaMlYwVTJsdVoyeGxSV3hsYldWdWRFWnliMjFTWVc1blpTaHlZVzVuWlNrN1hHNGdJSFpoY2lCdVpYZERiMjUwY205c1VtRnVaMlVnUFNCaWIyUjVMbU55WldGMFpVTnZiblJ5YjJ4U1lXNW5aU2dwTzF4dUlDQjJZWElnWld3N1hHNGdJSFpoY2lCeVpXMXZkbVZrSUQwZ1ptRnNjMlU3WEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3TENCc1pXNGdQU0JqYjI1MGNtOXNVbUZ1WjJVdWJHVnVaM1JvT3lCcElEd2diR1Z1T3lBcksya3BJSHRjYmlBZ0lDQmxiQ0E5SUdOdmJuUnliMnhTWVc1blpTNXBkR1Z0S0drcE8xeHVJQ0FnSUdsbUlDaGxiQ0FoUFQwZ2NtRnVaMlZGYkdWdFpXNTBJSHg4SUhKbGJXOTJaV1FwSUh0Y2JpQWdJQ0FnSUc1bGQwTnZiblJ5YjJ4U1lXNW5aUzVoWkdRb1kyOXVkSEp2YkZKaGJtZGxMbWwwWlcwb2FTa3BPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCeVpXMXZkbVZrSUQwZ2RISjFaVHRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdibVYzUTI5dWRISnZiRkpoYm1kbExuTmxiR1ZqZENncE8xeHVJQ0IxY0dSaGRHVkRiMjUwY205c1UyVnNaV04wYVc5dUtIUm9hWE1wTzF4dWZUdGNibHh1UjJWMFUyVnNaV04wYVc5dVVISnZkRzh1WldGamFGSmhibWRsSUQwZ1puVnVZM1JwYjI0Z0tHWnVMQ0J5WlhSMWNtNVdZV3gxWlNrZ2UxeHVJQ0IyWVhJZ2FTQTlJREE3WEc0Z0lIWmhjaUJzWlc0Z1BTQjBhR2x6TGw5eVlXNW5aWE11YkdWdVozUm9PMXh1SUNCbWIzSWdLR2tnUFNBd095QnBJRHdnYkdWdU95QXJLMmtwSUh0Y2JpQWdJQ0JwWmlBb1ptNG9kR2hwY3k1blpYUlNZVzVuWlVGMEtHa3BLU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSEpsZEhWeWJsWmhiSFZsTzF4dUlDQWdJSDFjYmlBZ2ZWeHVmVHRjYmx4dVIyVjBVMlZzWldOMGFXOXVVSEp2ZEc4dVoyVjBRV3hzVW1GdVoyVnpJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0IyWVhJZ2NtRnVaMlZ6SUQwZ1cxMDdYRzRnSUhSb2FYTXVaV0ZqYUZKaGJtZGxLR1oxYm1OMGFXOXVJQ2h5WVc1blpTa2dlMXh1SUNBZ0lISmhibWRsY3k1d2RYTm9LSEpoYm1kbEtUdGNiaUFnZlNrN1hHNGdJSEpsZEhWeWJpQnlZVzVuWlhNN1hHNTlPMXh1WEc1SFpYUlRaV3hsWTNScGIyNVFjbTkwYnk1elpYUlRhVzVuYkdWU1lXNW5aU0E5SUdaMWJtTjBhVzl1SUNoeVlXNW5aU2tnZTF4dUlDQjBhR2x6TG5KbGJXOTJaVUZzYkZKaGJtZGxjeWdwTzF4dUlDQjBhR2x6TG1Ga1pGSmhibWRsS0hKaGJtZGxLVHRjYm4wN1hHNWNibVoxYm1OMGFXOXVJR055WldGMFpVTnZiblJ5YjJ4VFpXeGxZM1JwYjI0Z0tITmxiQ3dnY21GdVoyVnpLU0I3WEc0Z0lIWmhjaUJqYjI1MGNtOXNVbUZ1WjJVZ1BTQmliMlI1TG1OeVpXRjBaVU52Ym5SeWIyeFNZVzVuWlNncE8xeHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Dd2daV3dzSUd4bGJpQTlJSEpoYm1kbGN5NXNaVzVuZEdnN0lHa2dQQ0JzWlc0N0lDc3JhU2tnZTF4dUlDQWdJR1ZzSUQwZ1oyVjBVMmx1WjJ4bFJXeGxiV1Z1ZEVaeWIyMVNZVzVuWlNoeVlXNW5aWE5iYVYwcE8xeHVJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQmpiMjUwY205c1VtRnVaMlV1WVdSa0tHVnNLVHRjYmlBZ0lDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KM05sZEZKaGJtZGxjeWdwT2lCRmJHVnRaVzUwSUdOdmRXeGtJRzV2ZENCaVpTQmhaR1JsWkNCMGJ5QmpiMjUwY205c0lITmxiR1ZqZEdsdmJpY3BPMXh1SUNBZ0lIMWNiaUFnZlZ4dUlDQmpiMjUwY205c1VtRnVaMlV1YzJWc1pXTjBLQ2s3WEc0Z0lIVndaR0YwWlVOdmJuUnliMnhUWld4bFkzUnBiMjRvYzJWc0tUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2NtVnRiM1psVW1GdVoyVk5ZVzUxWVd4c2VTQW9jMlZzTENCeVlXNW5aU2tnZTF4dUlDQjJZWElnY21GdVoyVnpJRDBnYzJWc0xtZGxkRUZzYkZKaGJtZGxjeWdwTzF4dUlDQnpaV3d1Y21WdGIzWmxRV3hzVW1GdVoyVnpLQ2s3WEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3TENCc1pXNGdQU0J5WVc1blpYTXViR1Z1WjNSb095QnBJRHdnYkdWdU95QXJLMmtwSUh0Y2JpQWdJQ0JwWmlBb0lXbHpVMkZ0WlZKaGJtZGxLSEpoYm1kbExDQnlZVzVuWlhOYmFWMHBLU0I3WEc0Z0lDQWdJQ0J6Wld3dVlXUmtVbUZ1WjJVb2NtRnVaMlZ6VzJsZEtUdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2FXWWdLQ0Z6Wld3dWNtRnVaMlZEYjNWdWRDa2dlMXh1SUNBZ0lIVndaR0YwWlVWdGNIUjVVMlZzWldOMGFXOXVLSE5sYkNrN1hHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdkWEJrWVhSbFFXNWphRzl5UVc1a1JtOWpkWE5HY205dFVtRnVaMlVnS0hObGJDd2djbUZ1WjJVcElIdGNiaUFnZG1GeUlHRnVZMmh2Y2xCeVpXWnBlQ0E5SUNkemRHRnlkQ2M3WEc0Z0lIWmhjaUJtYjJOMWMxQnlaV1pwZUNBOUlDZGxibVFuTzF4dUlDQnpaV3d1WVc1amFHOXlUbTlrWlNBOUlISmhibWRsVzJGdVkyaHZjbEJ5WldacGVDQXJJQ2REYjI1MFlXbHVaWEluWFR0Y2JpQWdjMlZzTG1GdVkyaHZjazltWm5ObGRDQTlJSEpoYm1kbFcyRnVZMmh2Y2xCeVpXWnBlQ0FySUNkUFptWnpaWFFuWFR0Y2JpQWdjMlZzTG1adlkzVnpUbTlrWlNBOUlISmhibWRsVzJadlkzVnpVSEpsWm1sNElDc2dKME52Ym5SaGFXNWxjaWRkTzF4dUlDQnpaV3d1Wm05amRYTlBabVp6WlhRZ1BTQnlZVzVuWlZ0bWIyTjFjMUJ5WldacGVDQXJJQ2RQWm1aelpYUW5YVHRjYm4xY2JseHVablZ1WTNScGIyNGdkWEJrWVhSbFJXMXdkSGxUWld4bFkzUnBiMjRnS0hObGJDa2dlMXh1SUNCelpXd3VZVzVqYUc5eVRtOWtaU0E5SUhObGJDNW1iMk4xYzA1dlpHVWdQU0J1ZFd4c08xeHVJQ0J6Wld3dVlXNWphRzl5VDJabWMyVjBJRDBnYzJWc0xtWnZZM1Z6VDJabWMyVjBJRDBnTUR0Y2JpQWdjMlZzTG5KaGJtZGxRMjkxYm5RZ1BTQXdPMXh1SUNCelpXd3VhWE5EYjJ4c1lYQnpaV1FnUFNCMGNuVmxPMXh1SUNCelpXd3VYM0poYm1kbGN5NXNaVzVuZEdnZ1BTQXdPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlZVzVuWlVOdmJuUmhhVzV6VTJsdVoyeGxSV3hsYldWdWRDQW9jbUZ1WjJWT2IyUmxjeWtnZTF4dUlDQnBaaUFvSVhKaGJtZGxUbTlrWlhNdWJHVnVaM1JvSUh4OElISmhibWRsVG05a1pYTmJNRjB1Ym05a1pWUjVjR1VnSVQwOUlERXBJSHRjYmlBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lIMWNiaUFnWm05eUlDaDJZWElnYVNBOUlERXNJR3hsYmlBOUlISmhibWRsVG05a1pYTXViR1Z1WjNSb095QnBJRHdnYkdWdU95QXJLMmtwSUh0Y2JpQWdJQ0JwWmlBb0lXbHpRVzVqWlhOMGIzSlBaaWh5WVc1blpVNXZaR1Z6V3pCZExDQnlZVzVuWlU1dlpHVnpXMmxkS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lIMWNiaUFnZlZ4dUlDQnlaWFIxY200Z2RISjFaVHRjYm4xY2JseHVablZ1WTNScGIyNGdaMlYwVTJsdVoyeGxSV3hsYldWdWRFWnliMjFTWVc1blpTQW9jbUZ1WjJVcElIdGNiaUFnZG1GeUlHNXZaR1Z6SUQwZ2NtRnVaMlV1WjJWMFRtOWtaWE1vS1R0Y2JpQWdhV1lnS0NGeVlXNW5aVU52Ym5SaGFXNXpVMmx1WjJ4bFJXeGxiV1Z1ZENodWIyUmxjeWtwSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMmRsZEZOcGJtZHNaVVZzWlcxbGJuUkdjbTl0VW1GdVoyVW9LVG9nY21GdVoyVWdaR2xrSUc1dmRDQmpiMjV6YVhOMElHOW1JR0VnYzJsdVoyeGxJR1ZzWlcxbGJuUW5LVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdibTlrWlhOYk1GMDdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHbHpWR1Y0ZEZKaGJtZGxJQ2h5WVc1blpTa2dlMXh1SUNCeVpYUjFjbTRnY21GdVoyVWdKaVlnY21GdVoyVXVkR1Y0ZENBaFBUMGdkbTlwWkNBd08xeHVmVnh1WEc1bWRXNWpkR2x2YmlCMWNHUmhkR1ZHY205dFZHVjRkRkpoYm1kbElDaHpaV3dzSUhKaGJtZGxLU0I3WEc0Z0lITmxiQzVmY21GdVoyVnpJRDBnVzNKaGJtZGxYVHRjYmlBZ2RYQmtZWFJsUVc1amFHOXlRVzVrUm05amRYTkdjbTl0VW1GdVoyVW9jMlZzTENCeVlXNW5aU3dnWm1Gc2MyVXBPMXh1SUNCelpXd3VjbUZ1WjJWRGIzVnVkQ0E5SURFN1hHNGdJSE5sYkM1cGMwTnZiR3hoY0hObFpDQTlJSEpoYm1kbExtTnZiR3hoY0hObFpEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2RYQmtZWFJsUTI5dWRISnZiRk5sYkdWamRHbHZiaUFvYzJWc0tTQjdYRzRnSUhObGJDNWZjbUZ1WjJWekxteGxibWQwYUNBOUlEQTdYRzRnSUdsbUlDaHpaV3d1WDNObGJHVmpkR2x2Ymk1MGVYQmxJRDA5UFNBblRtOXVaU2NwSUh0Y2JpQWdJQ0IxY0dSaGRHVkZiWEIwZVZObGJHVmpkR2x2YmloelpXd3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSFpoY2lCamIyNTBjbTlzVW1GdVoyVWdQU0J6Wld3dVgzTmxiR1ZqZEdsdmJpNWpjbVZoZEdWU1lXNW5aU2dwTzF4dUlDQWdJR2xtSUNocGMxUmxlSFJTWVc1blpTaGpiMjUwY205c1VtRnVaMlVwS1NCN1hHNGdJQ0FnSUNCMWNHUmhkR1ZHY205dFZHVjRkRkpoYm1kbEtITmxiQ3dnWTI5dWRISnZiRkpoYm1kbEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnYzJWc0xuSmhibWRsUTI5MWJuUWdQU0JqYjI1MGNtOXNVbUZ1WjJVdWJHVnVaM1JvTzF4dUlDQWdJQ0FnZG1GeUlISmhibWRsTzF4dUlDQWdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCelpXd3VjbUZ1WjJWRGIzVnVkRHNnS3l0cEtTQjdYRzRnSUNBZ0lDQWdJSEpoYm1kbElEMGdaRzlqTG1OeVpXRjBaVkpoYm1kbEtDazdYRzRnSUNBZ0lDQWdJSEpoYm1kbExuTmxiR1ZqZEU1dlpHVW9ZMjl1ZEhKdmJGSmhibWRsTG1sMFpXMG9hU2twTzF4dUlDQWdJQ0FnSUNCelpXd3VYM0poYm1kbGN5NXdkWE5vS0hKaGJtZGxLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJSE5sYkM1cGMwTnZiR3hoY0hObFpDQTlJSE5sYkM1eVlXNW5aVU52ZFc1MElEMDlQU0F4SUNZbUlITmxiQzVmY21GdVoyVnpXekJkTG1OdmJHeGhjSE5sWkR0Y2JpQWdJQ0FnSUhWd1pHRjBaVUZ1WTJodmNrRnVaRVp2WTNWelJuSnZiVkpoYm1kbEtITmxiQ3dnYzJWc0xsOXlZVzVuWlhOYmMyVnNMbkpoYm1kbFEyOTFiblFnTFNBeFhTd2dabUZzYzJVcE8xeHVJQ0FnSUgxY2JpQWdmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmhaR1JTWVc1blpWUnZRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpQW9jMlZzTENCeVlXNW5aU2tnZTF4dUlDQjJZWElnWTI5dWRISnZiRkpoYm1kbElEMGdjMlZzTGw5elpXeGxZM1JwYjI0dVkzSmxZWFJsVW1GdVoyVW9LVHRjYmlBZ2RtRnlJSEpoYm1kbFJXeGxiV1Z1ZENBOUlHZGxkRk5wYm1kc1pVVnNaVzFsYm5SR2NtOXRVbUZ1WjJVb2NtRnVaMlVwTzF4dUlDQjJZWElnYm1WM1EyOXVkSEp2YkZKaGJtZGxJRDBnWW05a2VTNWpjbVZoZEdWRGIyNTBjbTlzVW1GdVoyVW9LVHRjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREFzSUd4bGJpQTlJR052Ym5SeWIyeFNZVzVuWlM1c1pXNW5kR2c3SUdrZ1BDQnNaVzQ3SUNzcmFTa2dlMXh1SUNBZ0lHNWxkME52Ym5SeWIyeFNZVzVuWlM1aFpHUW9ZMjl1ZEhKdmJGSmhibWRsTG1sMFpXMG9hU2twTzF4dUlDQjlYRzRnSUhSeWVTQjdYRzRnSUNBZ2JtVjNRMjl1ZEhKdmJGSmhibWRsTG1Ga1pDaHlZVzVuWlVWc1pXMWxiblFwTzF4dUlDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZGhaR1JTWVc1blpTZ3BPaUJGYkdWdFpXNTBJR052ZFd4a0lHNXZkQ0JpWlNCaFpHUmxaQ0IwYnlCamIyNTBjbTlzSUhObGJHVmpkR2x2YmljcE8xeHVJQ0I5WEc0Z0lHNWxkME52Ym5SeWIyeFNZVzVuWlM1elpXeGxZM1FvS1R0Y2JpQWdkWEJrWVhSbFEyOXVkSEp2YkZObGJHVmpkR2x2YmloelpXd3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnBjMU5oYldWU1lXNW5aU0FvYkdWbWRDd2djbWxuYUhRcElIdGNiaUFnY21WMGRYSnVJQ2hjYmlBZ0lDQnNaV1owTG5OMFlYSjBRMjl1ZEdGcGJtVnlJRDA5UFNCeWFXZG9kQzV6ZEdGeWRFTnZiblJoYVc1bGNpQW1KbHh1SUNBZ0lHeGxablF1YzNSaGNuUlBabVp6WlhRZ1BUMDlJSEpwWjJoMExuTjBZWEowVDJabWMyVjBJQ1ltWEc0Z0lDQWdiR1ZtZEM1bGJtUkRiMjUwWVdsdVpYSWdQVDA5SUhKcFoyaDBMbVZ1WkVOdmJuUmhhVzVsY2lBbUpseHVJQ0FnSUd4bFpuUXVaVzVrVDJabWMyVjBJRDA5UFNCeWFXZG9kQzVsYm1SUFptWnpaWFJjYmlBZ0tUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2FYTkJibU5sYzNSdmNrOW1JQ2hoYm1ObGMzUnZjaXdnWkdWelkyVnVaR0Z1ZENrZ2UxeHVJQ0IyWVhJZ2JtOWtaU0E5SUdSbGMyTmxibVJoYm5RN1hHNGdJSGRvYVd4bElDaHViMlJsTG5CaGNtVnVkRTV2WkdVcElIdGNiaUFnSUNCcFppQW9ibTlrWlM1d1lYSmxiblJPYjJSbElEMDlQU0JoYm1ObGMzUnZjaWtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSFJ5ZFdVN1hHNGdJQ0FnZlZ4dUlDQWdJRzV2WkdVZ1BTQnViMlJsTG5CaGNtVnVkRTV2WkdVN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUdaaGJITmxPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQm5aWFJUWld4bFkzUnBiMjRnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdibVYzSUVkbGRGTmxiR1ZqZEdsdmJpaG5iRzlpWVd3dVpHOWpkVzFsYm5RdWMyVnNaV04wYVc5dUtUdGNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCblpYUlRaV3hsWTNScGIyNDdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaXNIb3N0TWV0aG9kIChob3N0LCBwcm9wKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGhvc3RbcHJvcF07XG4gIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8ICEhKHR5cGUgPT09ICdvYmplY3QnICYmIGhvc3RbcHJvcF0pIHx8IHR5cGUgPT09ICd1bmtub3duJztcbn1cblxuZnVuY3Rpb24gaXNIb3N0UHJvcGVydHkgKGhvc3QsIHByb3ApIHtcbiAgcmV0dXJuIHR5cGVvZiBob3N0W3Byb3BdICE9PSAndW5kZWZpbmVkJztcbn1cblxuZnVuY3Rpb24gbWFueSAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGFyZUhvc3RlZCAoaG9zdCwgcHJvcHMpIHtcbiAgICB2YXIgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoIWZuKGhvc3QsIHByb3BzW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0aG9kOiBpc0hvc3RNZXRob2QsXG4gIG1ldGhvZHM6IG1hbnkoaXNIb3N0TWV0aG9kKSxcbiAgcHJvcGVydHk6IGlzSG9zdFByb3BlcnR5LFxuICBwcm9wZXJ0aWVzOiBtYW55KGlzSG9zdFByb3BlcnR5KVxufTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBib2R5ID0gZG9jLmJvZHk7XG5cbmZ1bmN0aW9uIHJhbmdlVG9UZXh0UmFuZ2UgKHJhbmdlKSB7XG4gIGlmIChyYW5nZS5jb2xsYXBzZWQpIHtcbiAgICByZXR1cm4gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiByYW5nZS5zdGFydENvbnRhaW5lciwgb2Zmc2V0OiByYW5nZS5zdGFydE9mZnNldCB9LCB0cnVlKTtcbiAgfVxuICB2YXIgc3RhcnRSYW5nZSA9IGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlKHsgbm9kZTogcmFuZ2Uuc3RhcnRDb250YWluZXIsIG9mZnNldDogcmFuZ2Uuc3RhcnRPZmZzZXQgfSwgdHJ1ZSk7XG4gIHZhciBlbmRSYW5nZSA9IGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlKHsgbm9kZTogcmFuZ2UuZW5kQ29udGFpbmVyLCBvZmZzZXQ6IHJhbmdlLmVuZE9mZnNldCB9LCBmYWxzZSk7XG4gIHZhciB0ZXh0UmFuZ2UgPSBib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICB0ZXh0UmFuZ2Uuc2V0RW5kUG9pbnQoJ1N0YXJ0VG9TdGFydCcsIHN0YXJ0UmFuZ2UpO1xuICB0ZXh0UmFuZ2Uuc2V0RW5kUG9pbnQoJ0VuZFRvRW5kJywgZW5kUmFuZ2UpO1xuICByZXR1cm4gdGV4dFJhbmdlO1xufVxuXG5mdW5jdGlvbiBpc0NoYXJhY3RlckRhdGFOb2RlIChub2RlKSB7XG4gIHZhciB0ID0gbm9kZS5ub2RlVHlwZTtcbiAgcmV0dXJuIHQgPT09IDMgfHwgdCA9PT0gNCB8fCB0ID09PSA4IDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UgKHAsIHN0YXJ0aW5nKSB7XG4gIHZhciBib3VuZDtcbiAgdmFyIHBhcmVudDtcbiAgdmFyIG9mZnNldCA9IHAub2Zmc2V0O1xuICB2YXIgd29ya2luZ05vZGU7XG4gIHZhciBjaGlsZE5vZGVzO1xuICB2YXIgcmFuZ2UgPSBib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICB2YXIgZGF0YSA9IGlzQ2hhcmFjdGVyRGF0YU5vZGUocC5ub2RlKTtcblxuICBpZiAoZGF0YSkge1xuICAgIGJvdW5kID0gcC5ub2RlO1xuICAgIHBhcmVudCA9IGJvdW5kLnBhcmVudE5vZGU7XG4gIH0gZWxzZSB7XG4gICAgY2hpbGROb2RlcyA9IHAubm9kZS5jaGlsZE5vZGVzO1xuICAgIGJvdW5kID0gb2Zmc2V0IDwgY2hpbGROb2Rlcy5sZW5ndGggPyBjaGlsZE5vZGVzW29mZnNldF0gOiBudWxsO1xuICAgIHBhcmVudCA9IHAubm9kZTtcbiAgfVxuXG4gIHdvcmtpbmdOb2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgd29ya2luZ05vZGUuaW5uZXJIVE1MID0gJyYjZmVmZjsnO1xuXG4gIGlmIChib3VuZCkge1xuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUod29ya2luZ05vZGUsIGJvdW5kKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQod29ya2luZ05vZGUpO1xuICB9XG5cbiAgcmFuZ2UubW92ZVRvRWxlbWVudFRleHQod29ya2luZ05vZGUpO1xuICByYW5nZS5jb2xsYXBzZSghc3RhcnRpbmcpO1xuICBwYXJlbnQucmVtb3ZlQ2hpbGQod29ya2luZ05vZGUpO1xuXG4gIGlmIChkYXRhKSB7XG4gICAgcmFuZ2Vbc3RhcnRpbmcgPyAnbW92ZVN0YXJ0JyA6ICdtb3ZlRW5kJ10oJ2NoYXJhY3RlcicsIG9mZnNldCk7XG4gIH1cbiAgcmV0dXJuIHJhbmdlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmdlVG9UZXh0UmFuZ2U7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDNKaGJtZGxWRzlVWlhoMFVtRnVaMlV1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJrYjJNZ1BTQm5iRzlpWVd3dVpHOWpkVzFsYm5RN1hHNTJZWElnWW05a2VTQTlJR1J2WXk1aWIyUjVPMXh1WEc1bWRXNWpkR2x2YmlCeVlXNW5aVlJ2VkdWNGRGSmhibWRsSUNoeVlXNW5aU2tnZTF4dUlDQnBaaUFvY21GdVoyVXVZMjlzYkdGd2MyVmtLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHTnlaV0YwWlVKdmRXNWtZWEo1VkdWNGRGSmhibWRsS0hzZ2JtOWtaVG9nY21GdVoyVXVjM1JoY25SRGIyNTBZV2x1WlhJc0lHOW1abk5sZERvZ2NtRnVaMlV1YzNSaGNuUlBabVp6WlhRZ2ZTd2dkSEoxWlNrN1hHNGdJSDFjYmlBZ2RtRnlJSE4wWVhKMFVtRnVaMlVnUFNCamNtVmhkR1ZDYjNWdVpHRnllVlJsZUhSU1lXNW5aU2g3SUc1dlpHVTZJSEpoYm1kbExuTjBZWEowUTI5dWRHRnBibVZ5TENCdlptWnpaWFE2SUhKaGJtZGxMbk4wWVhKMFQyWm1jMlYwSUgwc0lIUnlkV1VwTzF4dUlDQjJZWElnWlc1a1VtRnVaMlVnUFNCamNtVmhkR1ZDYjNWdVpHRnllVlJsZUhSU1lXNW5aU2g3SUc1dlpHVTZJSEpoYm1kbExtVnVaRU52Ym5SaGFXNWxjaXdnYjJabWMyVjBPaUJ5WVc1blpTNWxibVJQWm1aelpYUWdmU3dnWm1Gc2MyVXBPMXh1SUNCMllYSWdkR1Y0ZEZKaGJtZGxJRDBnWW05a2VTNWpjbVZoZEdWVVpYaDBVbUZ1WjJVb0tUdGNiaUFnZEdWNGRGSmhibWRsTG5ObGRFVnVaRkJ2YVc1MEtDZFRkR0Z5ZEZSdlUzUmhjblFuTENCemRHRnlkRkpoYm1kbEtUdGNiaUFnZEdWNGRGSmhibWRsTG5ObGRFVnVaRkJ2YVc1MEtDZEZibVJVYjBWdVpDY3NJR1Z1WkZKaGJtZGxLVHRjYmlBZ2NtVjBkWEp1SUhSbGVIUlNZVzVuWlR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnYVhORGFHRnlZV04wWlhKRVlYUmhUbTlrWlNBb2JtOWtaU2tnZTF4dUlDQjJZWElnZENBOUlHNXZaR1V1Ym05a1pWUjVjR1U3WEc0Z0lISmxkSFZ5YmlCMElEMDlQU0F6SUh4OElIUWdQVDA5SURRZ2ZId2dkQ0E5UFQwZ09DQTdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHTnlaV0YwWlVKdmRXNWtZWEo1VkdWNGRGSmhibWRsSUNod0xDQnpkR0Z5ZEdsdVp5a2dlMXh1SUNCMllYSWdZbTkxYm1RN1hHNGdJSFpoY2lCd1lYSmxiblE3WEc0Z0lIWmhjaUJ2Wm1aelpYUWdQU0J3TG05bVpuTmxkRHRjYmlBZ2RtRnlJSGR2Y210cGJtZE9iMlJsTzF4dUlDQjJZWElnWTJocGJHUk9iMlJsY3p0Y2JpQWdkbUZ5SUhKaGJtZGxJRDBnWW05a2VTNWpjbVZoZEdWVVpYaDBVbUZ1WjJVb0tUdGNiaUFnZG1GeUlHUmhkR0VnUFNCcGMwTm9ZWEpoWTNSbGNrUmhkR0ZPYjJSbEtIQXVibTlrWlNrN1hHNWNiaUFnYVdZZ0tHUmhkR0VwSUh0Y2JpQWdJQ0JpYjNWdVpDQTlJSEF1Ym05a1pUdGNiaUFnSUNCd1lYSmxiblFnUFNCaWIzVnVaQzV3WVhKbGJuUk9iMlJsTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUdOb2FXeGtUbTlrWlhNZ1BTQndMbTV2WkdVdVkyaHBiR1JPYjJSbGN6dGNiaUFnSUNCaWIzVnVaQ0E5SUc5bVpuTmxkQ0E4SUdOb2FXeGtUbTlrWlhNdWJHVnVaM1JvSUQ4Z1kyaHBiR1JPYjJSbGMxdHZabVp6WlhSZElEb2diblZzYkR0Y2JpQWdJQ0J3WVhKbGJuUWdQU0J3TG01dlpHVTdYRzRnSUgxY2JseHVJQ0IzYjNKcmFXNW5UbTlrWlNBOUlHUnZZeTVqY21WaGRHVkZiR1Z0Wlc1MEtDZHpjR0Z1SnlrN1hHNGdJSGR2Y210cGJtZE9iMlJsTG1sdWJtVnlTRlJOVENBOUlDY21JMlpsWm1ZN0p6dGNibHh1SUNCcFppQW9ZbTkxYm1RcElIdGNiaUFnSUNCd1lYSmxiblF1YVc1elpYSjBRbVZtYjNKbEtIZHZjbXRwYm1kT2IyUmxMQ0JpYjNWdVpDazdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdjR0Z5Wlc1MExtRndjR1Z1WkVOb2FXeGtLSGR2Y210cGJtZE9iMlJsS1R0Y2JpQWdmVnh1WEc0Z0lISmhibWRsTG0xdmRtVlViMFZzWlcxbGJuUlVaWGgwS0hkdmNtdHBibWRPYjJSbEtUdGNiaUFnY21GdVoyVXVZMjlzYkdGd2MyVW9JWE4wWVhKMGFXNW5LVHRjYmlBZ2NHRnlaVzUwTG5KbGJXOTJaVU5vYVd4a0tIZHZjbXRwYm1kT2IyUmxLVHRjYmx4dUlDQnBaaUFvWkdGMFlTa2dlMXh1SUNBZ0lISmhibWRsVzNOMFlYSjBhVzVuSUQ4Z0oyMXZkbVZUZEdGeWRDY2dPaUFuYlc5MlpVVnVaQ2RkS0NkamFHRnlZV04wWlhJbkxDQnZabVp6WlhRcE8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCeVlXNW5aVHRjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnlZVzVuWlZSdlZHVjRkRkpoYm1kbE8xeHVJbDE5IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgSW5wdXRTdGF0ZSA9IHJlcXVpcmUoJy4vSW5wdXRTdGF0ZScpO1xuXG5mdW5jdGlvbiBJbnB1dEhpc3RvcnkgKHN1cmZhY2UsIG1vZGUpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcblxuICBzdGF0ZS5pbnB1dE1vZGUgPSBtb2RlO1xuICBzdGF0ZS5zdXJmYWNlID0gc3VyZmFjZTtcbiAgc3RhdGUucmVzZXQoKTtcblxuICBsaXN0ZW4oc3VyZmFjZS50ZXh0YXJlYSk7XG4gIGxpc3RlbihzdXJmYWNlLmVkaXRhYmxlKTtcblxuICBmdW5jdGlvbiBsaXN0ZW4gKGVsKSB7XG4gICAgdmFyIHBhc3RlSGFuZGxlciA9IHNlbGZpZShoYW5kbGVQYXN0ZSk7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ2tleXByZXNzJywgcHJldmVudEN0cmxZWik7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ2tleWRvd24nLCBzZWxmaWUoaGFuZGxlQ3RybFlaKSk7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ2tleWRvd24nLCBzZWxmaWUoaGFuZGxlTW9kZUNoYW5nZSkpO1xuICAgIGNyb3NzdmVudC5hZGQoZWwsICdtb3VzZWRvd24nLCBzZXRNb3ZpbmcpO1xuICAgIGVsLm9ucGFzdGUgPSBwYXN0ZUhhbmRsZXI7XG4gICAgZWwub25kcm9wID0gcGFzdGVIYW5kbGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0TW92aW5nICgpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCdtb3ZpbmcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGZpZSAoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlciAoZSkgeyByZXR1cm4gZm4uY2FsbChudWxsLCBzdGF0ZSwgZSk7IH07XG4gIH1cbn1cblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5zZXRJbnB1dE1vZGUgPSBmdW5jdGlvbiAobW9kZSkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBzdGF0ZS5pbnB1dE1vZGUgPSBtb2RlO1xuICBzdGF0ZS5yZXNldCgpO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgc3RhdGUuaW5wdXRTdGF0ZSA9IG51bGw7XG4gIHN0YXRlLmxhc3RTdGF0ZSA9IG51bGw7XG4gIHN0YXRlLmhpc3RvcnkgPSBbXTtcbiAgc3RhdGUuaGlzdG9yeVBvaW50ZXIgPSAwO1xuICBzdGF0ZS5oaXN0b3J5TW9kZSA9ICdub25lJztcbiAgc3RhdGUucmVmcmVzaGluZyA9IG51bGw7XG4gIHN0YXRlLnJlZnJlc2hTdGF0ZSh0cnVlKTtcbiAgc3RhdGUuc2F2ZVN0YXRlKCk7XG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUuc2V0Q29tbWFuZE1vZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIHN0YXRlLmhpc3RvcnlNb2RlID0gJ2NvbW1hbmQnO1xuICBzdGF0ZS5zYXZlU3RhdGUoKTtcbiAgc3RhdGUucmVmcmVzaGluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xuICB9LCAwKTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUuY2FuVW5kbyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuaGlzdG9yeVBvaW50ZXIgPiAxO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5jYW5SZWRvID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5oaXN0b3J5W3RoaXMuaGlzdG9yeVBvaW50ZXIgKyAxXTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUudW5kbyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgaWYgKHN0YXRlLmNhblVuZG8oKSkge1xuICAgIGlmIChzdGF0ZS5sYXN0U3RhdGUpIHtcbiAgICAgIHN0YXRlLmxhc3RTdGF0ZS5yZXN0b3JlKCk7XG4gICAgICBzdGF0ZS5sYXN0U3RhdGUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5oaXN0b3J5W3N0YXRlLmhpc3RvcnlQb2ludGVyXSA9IG5ldyBJbnB1dFN0YXRlKHN0YXRlLnN1cmZhY2UsIHN0YXRlLmlucHV0TW9kZSk7XG4gICAgICBzdGF0ZS5oaXN0b3J5Wy0tc3RhdGUuaGlzdG9yeVBvaW50ZXJdLnJlc3RvcmUoKTtcbiAgICB9XG4gIH1cbiAgc3RhdGUuaGlzdG9yeU1vZGUgPSAnbm9uZSc7XG4gIHN0YXRlLnN1cmZhY2UuZm9jdXMoc3RhdGUuaW5wdXRNb2RlKTtcbiAgc3RhdGUucmVmcmVzaFN0YXRlKCk7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnJlZG8gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIGlmIChzdGF0ZS5jYW5SZWRvKCkpIHtcbiAgICBzdGF0ZS5oaXN0b3J5Wysrc3RhdGUuaGlzdG9yeVBvaW50ZXJdLnJlc3RvcmUoKTtcbiAgfVxuXG4gIHN0YXRlLmhpc3RvcnlNb2RlID0gJ25vbmUnO1xuICBzdGF0ZS5zdXJmYWNlLmZvY3VzKHN0YXRlLmlucHV0TW9kZSk7XG4gIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5zZXRNb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIGlmIChzdGF0ZS5oaXN0b3J5TW9kZSAhPT0gdmFsdWUpIHtcbiAgICBzdGF0ZS5oaXN0b3J5TW9kZSA9IHZhbHVlO1xuICAgIHN0YXRlLnNhdmVTdGF0ZSgpO1xuICB9XG4gIHN0YXRlLnJlZnJlc2hpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGF0ZS5yZWZyZXNoU3RhdGUoKTtcbiAgfSwgMSk7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnJlZnJlc2hTdGF0ZSA9IGZ1bmN0aW9uIChpbml0aWFsU3RhdGUpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgc3RhdGUuaW5wdXRTdGF0ZSA9IG5ldyBJbnB1dFN0YXRlKHN0YXRlLnN1cmZhY2UsIHN0YXRlLmlucHV0TW9kZSwgaW5pdGlhbFN0YXRlKTtcbiAgc3RhdGUucmVmcmVzaGluZyA9IG51bGw7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnNhdmVTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgdmFyIGN1cnJlbnQgPSBzdGF0ZS5pbnB1dFN0YXRlIHx8IG5ldyBJbnB1dFN0YXRlKHN0YXRlLnN1cmZhY2UsIHN0YXRlLmlucHV0TW9kZSk7XG5cbiAgaWYgKHN0YXRlLmhpc3RvcnlNb2RlID09PSAnbW92aW5nJykge1xuICAgIGlmICghc3RhdGUubGFzdFN0YXRlKSB7XG4gICAgICBzdGF0ZS5sYXN0U3RhdGUgPSBjdXJyZW50O1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHN0YXRlLmxhc3RTdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5oaXN0b3J5W3N0YXRlLmhpc3RvcnlQb2ludGVyIC0gMV0udGV4dCAhPT0gc3RhdGUubGFzdFN0YXRlLnRleHQpIHtcbiAgICAgIHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeVBvaW50ZXIrK10gPSBzdGF0ZS5sYXN0U3RhdGU7XG4gICAgfVxuICAgIHN0YXRlLmxhc3RTdGF0ZSA9IG51bGw7XG4gIH1cbiAgc3RhdGUuaGlzdG9yeVtzdGF0ZS5oaXN0b3J5UG9pbnRlcisrXSA9IGN1cnJlbnQ7XG4gIHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeVBvaW50ZXIgKyAxXSA9IG51bGw7XG59O1xuXG5mdW5jdGlvbiBoYW5kbGVDdHJsWVogKHN0YXRlLCBlKSB7XG4gIHZhciBoYW5kbGVkID0gZmFsc2U7XG4gIHZhciBrZXlDb2RlID0gZS5jaGFyQ29kZSB8fCBlLmtleUNvZGU7XG4gIHZhciBrZXlDb2RlQ2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5Q29kZSk7XG5cbiAgaWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICBzd2l0Y2ggKGtleUNvZGVDaGFyLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICBzdGF0ZS5yZWRvKCk7XG4gICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAneic6XG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgc3RhdGUucmVkbygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLnVuZG8oKTtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGhhbmRsZWQgJiYgZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVNb2RlQ2hhbmdlIChzdGF0ZSwgZSkge1xuICBpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlO1xuXG4gIGlmICgoa2V5Q29kZSA+PSAzMyAmJiBrZXlDb2RlIDw9IDQwKSB8fCAoa2V5Q29kZSA+PSA2MzIzMiAmJiBrZXlDb2RlIDw9IDYzMjM1KSkge1xuICAgIHN0YXRlLnNldE1vZGUoJ21vdmluZycpO1xuICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IDggfHwga2V5Q29kZSA9PT0gNDYgfHwga2V5Q29kZSA9PT0gMTI3KSB7XG4gICAgc3RhdGUuc2V0TW9kZSgnZGVsZXRpbmcnKTtcbiAgfSBlbHNlIGlmIChrZXlDb2RlID09PSAxMykge1xuICAgIHN0YXRlLnNldE1vZGUoJ25ld2xpbmVzJyk7XG4gIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gMjcpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCdlc2NhcGUnKTtcbiAgfSBlbHNlIGlmICgoa2V5Q29kZSA8IDE2IHx8IGtleUNvZGUgPiAyMCkgJiYga2V5Q29kZSAhPT0gOTEpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCd0eXBpbmcnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVQYXN0ZSAoc3RhdGUpIHtcbiAgaWYgKHN0YXRlLmlucHV0U3RhdGUgJiYgc3RhdGUuaW5wdXRTdGF0ZS50ZXh0ICE9PSBzdGF0ZS5zdXJmYWNlLnJlYWQoc3RhdGUuaW5wdXRNb2RlKSAmJiBzdGF0ZS5yZWZyZXNoaW5nID09PSBudWxsKSB7XG4gICAgc3RhdGUuaGlzdG9yeU1vZGUgPSAncGFzdGUnO1xuICAgIHN0YXRlLnNhdmVTdGF0ZSgpO1xuICAgIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByZXZlbnRDdHJsWVogKGUpIHtcbiAgdmFyIGtleUNvZGUgPSBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZTtcbiAgdmFyIHl6ID0ga2V5Q29kZSA9PT0gODkgfHwga2V5Q29kZSA9PT0gOTA7XG4gIHZhciBjdHJsID0gZS5jdHJsS2V5IHx8IGUubWV0YUtleTtcbiAgaWYgKGN0cmwgJiYgeXopIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dEhpc3Rvcnk7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgaXNWaXNpYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vaXNWaXNpYmxlRWxlbWVudCcpO1xudmFyIGZpeEVPTCA9IHJlcXVpcmUoJy4vZml4RU9MJyk7XG52YXIgTWFya2Rvd25DaHVua3MgPSByZXF1aXJlKCcuL21hcmtkb3duL01hcmtkb3duQ2h1bmtzJyk7XG52YXIgSHRtbENodW5rcyA9IHJlcXVpcmUoJy4vaHRtbC9IdG1sQ2h1bmtzJyk7XG52YXIgY2h1bmtzID0ge1xuICBtYXJrZG93bjogTWFya2Rvd25DaHVua3MsXG4gIGh0bWw6IEh0bWxDaHVua3MsXG4gIHd5c2l3eWc6IEh0bWxDaHVua3Ncbn07XG5cbmZ1bmN0aW9uIElucHV0U3RhdGUgKHN1cmZhY2UsIG1vZGUsIGluaXRpYWxTdGF0ZSkge1xuICB0aGlzLm1vZGUgPSBtb2RlO1xuICB0aGlzLnN1cmZhY2UgPSBzdXJmYWNlO1xuICB0aGlzLmluaXRpYWxTdGF0ZSA9IGluaXRpYWxTdGF0ZSB8fCBmYWxzZTtcbiAgdGhpcy5pbml0KCk7XG59XG5cbklucHV0U3RhdGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGVsID0gc2VsZi5zdXJmYWNlLmN1cnJlbnQoc2VsZi5tb2RlKTtcbiAgaWYgKCFpc1Zpc2libGVFbGVtZW50KGVsKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXRoaXMuaW5pdGlhbFN0YXRlICYmIGRvYy5hY3RpdmVFbGVtZW50ICYmIGRvYy5hY3RpdmVFbGVtZW50ICE9PSBlbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBzZWxmLnN1cmZhY2UucmVhZFNlbGVjdGlvbihzZWxmKTtcbiAgc2VsZi5zY3JvbGxUb3AgPSBlbC5zY3JvbGxUb3A7XG4gIGlmICghc2VsZi50ZXh0KSB7XG4gICAgc2VsZi50ZXh0ID0gc2VsZi5zdXJmYWNlLnJlYWQoc2VsZi5tb2RlKTtcbiAgfVxufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBlbCA9IHNlbGYuc3VyZmFjZS5jdXJyZW50KHNlbGYubW9kZSk7XG4gIGlmICghaXNWaXNpYmxlRWxlbWVudChlbCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc2VsZi5zdXJmYWNlLndyaXRlU2VsZWN0aW9uKHNlbGYpO1xufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUucmVzdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZWwgPSBzZWxmLnN1cmZhY2UuY3VycmVudChzZWxmLm1vZGUpO1xuICBpZiAodHlwZW9mIHNlbGYudGV4dCA9PT0gJ3N0cmluZycgJiYgc2VsZi50ZXh0ICE9PSBzZWxmLnN1cmZhY2UucmVhZChzZWxmLm1vZGUpKSB7XG4gICAgc2VsZi5zdXJmYWNlLndyaXRlKHNlbGYubW9kZSwgc2VsZi50ZXh0KTtcbiAgfVxuICBzZWxmLnNlbGVjdCgpO1xuICBlbC5zY3JvbGxUb3AgPSBzZWxmLnNjcm9sbFRvcDtcbn07XG5cbklucHV0U3RhdGUucHJvdG90eXBlLmdldENodW5rcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgY2h1bmsgPSBuZXcgY2h1bmtzW3NlbGYubW9kZV0oKTtcbiAgY2h1bmsuYmVmb3JlID0gZml4RU9MKHNlbGYudGV4dC5zdWJzdHJpbmcoMCwgc2VsZi5zdGFydCkpO1xuICBjaHVuay5zdGFydFRhZyA9ICcnO1xuICBjaHVuay5zZWxlY3Rpb24gPSBmaXhFT0woc2VsZi50ZXh0LnN1YnN0cmluZyhzZWxmLnN0YXJ0LCBzZWxmLmVuZCkpO1xuICBjaHVuay5lbmRUYWcgPSAnJztcbiAgY2h1bmsuYWZ0ZXIgPSBmaXhFT0woc2VsZi50ZXh0LnN1YnN0cmluZyhzZWxmLmVuZCkpO1xuICBjaHVuay5zY3JvbGxUb3AgPSBzZWxmLnNjcm9sbFRvcDtcbiAgc2VsZi5jYWNoZWRDaHVua3MgPSBjaHVuaztcbiAgcmV0dXJuIGNodW5rO1xufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuc2V0Q2h1bmtzID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2h1bmsuYmVmb3JlID0gY2h1bmsuYmVmb3JlICsgY2h1bmsuc3RhcnRUYWc7XG4gIGNodW5rLmFmdGVyID0gY2h1bmsuZW5kVGFnICsgY2h1bmsuYWZ0ZXI7XG4gIHNlbGYuc3RhcnQgPSBjaHVuay5iZWZvcmUubGVuZ3RoO1xuICBzZWxmLmVuZCA9IGNodW5rLmJlZm9yZS5sZW5ndGggKyBjaHVuay5zZWxlY3Rpb24ubGVuZ3RoO1xuICBzZWxmLnRleHQgPSBjaHVuay5iZWZvcmUgKyBjaHVuay5zZWxlY3Rpb24gKyBjaHVuay5hZnRlcjtcbiAgc2VsZi5zY3JvbGxUb3AgPSBjaHVuay5zY3JvbGxUb3A7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0U3RhdGU7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OUpibkIxZEZOMFlYUmxMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCa2IyTWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzUyWVhJZ2FYTldhWE5wWW14bFJXeGxiV1Z1ZENBOUlISmxjWFZwY21Vb0p5NHZhWE5XYVhOcFlteGxSV3hsYldWdWRDY3BPMXh1ZG1GeUlHWnBlRVZQVENBOUlISmxjWFZwY21Vb0p5NHZabWw0UlU5TUp5azdYRzUyWVhJZ1RXRnlhMlJ2ZDI1RGFIVnVhM01nUFNCeVpYRjFhWEpsS0NjdUwyMWhjbXRrYjNkdUwwMWhjbXRrYjNkdVEyaDFibXR6SnlrN1hHNTJZWElnU0hSdGJFTm9kVzVyY3lBOUlISmxjWFZwY21Vb0p5NHZhSFJ0YkM5SWRHMXNRMmgxYm10ekp5azdYRzUyWVhJZ1kyaDFibXR6SUQwZ2UxeHVJQ0J0WVhKclpHOTNiam9nVFdGeWEyUnZkMjVEYUhWdWEzTXNYRzRnSUdoMGJXdzZJRWgwYld4RGFIVnVhM01zWEc0Z0lIZDVjMmwzZVdjNklFaDBiV3hEYUhWdWEzTmNibjA3WEc1Y2JtWjFibU4wYVc5dUlFbHVjSFYwVTNSaGRHVWdLSE4xY21aaFkyVXNJRzF2WkdVc0lHbHVhWFJwWVd4VGRHRjBaU2tnZTF4dUlDQjBhR2x6TG0xdlpHVWdQU0J0YjJSbE8xeHVJQ0IwYUdsekxuTjFjbVpoWTJVZ1BTQnpkWEptWVdObE8xeHVJQ0IwYUdsekxtbHVhWFJwWVd4VGRHRjBaU0E5SUdsdWFYUnBZV3hUZEdGMFpTQjhmQ0JtWVd4elpUdGNiaUFnZEdocGN5NXBibWwwS0NrN1hHNTlYRzVjYmtsdWNIVjBVM1JoZEdVdWNISnZkRzkwZVhCbExtbHVhWFFnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUhaaGNpQnpaV3htSUQwZ2RHaHBjenRjYmlBZ2RtRnlJR1ZzSUQwZ2MyVnNaaTV6ZFhKbVlXTmxMbU4xY25KbGJuUW9jMlZzWmk1dGIyUmxLVHRjYmlBZ2FXWWdLQ0ZwYzFacGMybGliR1ZGYkdWdFpXNTBLR1ZzS1NrZ2UxeHVJQ0FnSUhKbGRIVnlianRjYmlBZ2ZWeHVJQ0JwWmlBb0lYUm9hWE11YVc1cGRHbGhiRk4wWVhSbElDWW1JR1J2WXk1aFkzUnBkbVZGYkdWdFpXNTBJQ1ltSUdSdll5NWhZM1JwZG1WRmJHVnRaVzUwSUNFOVBTQmxiQ2tnZTF4dUlDQWdJSEpsZEhWeWJqdGNiaUFnZlZ4dUlDQnpaV3htTG5OMWNtWmhZMlV1Y21WaFpGTmxiR1ZqZEdsdmJpaHpaV3htS1R0Y2JpQWdjMlZzWmk1elkzSnZiR3hVYjNBZ1BTQmxiQzV6WTNKdmJHeFViM0E3WEc0Z0lHbG1JQ2doYzJWc1ppNTBaWGgwS1NCN1hHNGdJQ0FnYzJWc1ppNTBaWGgwSUQwZ2MyVnNaaTV6ZFhKbVlXTmxMbkpsWVdRb2MyVnNaaTV0YjJSbEtUdGNiaUFnZlZ4dWZUdGNibHh1U1c1d2RYUlRkR0YwWlM1d2NtOTBiM1I1Y0dVdWMyVnNaV04wSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCMllYSWdjMlZzWmlBOUlIUm9hWE03WEc0Z0lIWmhjaUJsYkNBOUlITmxiR1l1YzNWeVptRmpaUzVqZFhKeVpXNTBLSE5sYkdZdWJXOWtaU2s3WEc0Z0lHbG1JQ2doYVhOV2FYTnBZbXhsUld4bGJXVnVkQ2hsYkNrcElIdGNiaUFnSUNCeVpYUjFjbTQ3WEc0Z0lIMWNiaUFnYzJWc1ppNXpkWEptWVdObExuZHlhWFJsVTJWc1pXTjBhVzl1S0hObGJHWXBPMXh1ZlR0Y2JseHVTVzV3ZFhSVGRHRjBaUzV3Y205MGIzUjVjR1V1Y21WemRHOXlaU0E5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnZG1GeUlITmxiR1lnUFNCMGFHbHpPMXh1SUNCMllYSWdaV3dnUFNCelpXeG1Mbk4xY21aaFkyVXVZM1Z5Y21WdWRDaHpaV3htTG0xdlpHVXBPMXh1SUNCcFppQW9kSGx3Wlc5bUlITmxiR1l1ZEdWNGRDQTlQVDBnSjNOMGNtbHVaeWNnSmlZZ2MyVnNaaTUwWlhoMElDRTlQU0J6Wld4bUxuTjFjbVpoWTJVdWNtVmhaQ2h6Wld4bUxtMXZaR1VwS1NCN1hHNGdJQ0FnYzJWc1ppNXpkWEptWVdObExuZHlhWFJsS0hObGJHWXViVzlrWlN3Z2MyVnNaaTUwWlhoMEtUdGNiaUFnZlZ4dUlDQnpaV3htTG5ObGJHVmpkQ2dwTzF4dUlDQmxiQzV6WTNKdmJHeFViM0FnUFNCelpXeG1Mbk5qY205c2JGUnZjRHRjYm4wN1hHNWNia2x1Y0hWMFUzUmhkR1V1Y0hKdmRHOTBlWEJsTG1kbGRFTm9kVzVyY3lBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ2RtRnlJSE5sYkdZZ1BTQjBhR2x6TzF4dUlDQjJZWElnWTJoMWJtc2dQU0J1WlhjZ1kyaDFibXR6VzNObGJHWXViVzlrWlYwb0tUdGNiaUFnWTJoMWJtc3VZbVZtYjNKbElEMGdabWw0UlU5TUtITmxiR1l1ZEdWNGRDNXpkV0p6ZEhKcGJtY29NQ3dnYzJWc1ppNXpkR0Z5ZENrcE8xeHVJQ0JqYUhWdWF5NXpkR0Z5ZEZSaFp5QTlJQ2NuTzF4dUlDQmphSFZ1YXk1elpXeGxZM1JwYjI0Z1BTQm1hWGhGVDB3b2MyVnNaaTUwWlhoMExuTjFZbk4wY21sdVp5aHpaV3htTG5OMFlYSjBMQ0J6Wld4bUxtVnVaQ2twTzF4dUlDQmphSFZ1YXk1bGJtUlVZV2NnUFNBbkp6dGNiaUFnWTJoMWJtc3VZV1owWlhJZ1BTQm1hWGhGVDB3b2MyVnNaaTUwWlhoMExuTjFZbk4wY21sdVp5aHpaV3htTG1WdVpDa3BPMXh1SUNCamFIVnVheTV6WTNKdmJHeFViM0FnUFNCelpXeG1Mbk5qY205c2JGUnZjRHRjYmlBZ2MyVnNaaTVqWVdOb1pXUkRhSFZ1YTNNZ1BTQmphSFZ1YXp0Y2JpQWdjbVYwZFhKdUlHTm9kVzVyTzF4dWZUdGNibHh1U1c1d2RYUlRkR0YwWlM1d2NtOTBiM1I1Y0dVdWMyVjBRMmgxYm10eklEMGdablZ1WTNScGIyNGdLR05vZFc1cktTQjdYRzRnSUhaaGNpQnpaV3htSUQwZ2RHaHBjenRjYmlBZ1kyaDFibXN1WW1WbWIzSmxJRDBnWTJoMWJtc3VZbVZtYjNKbElDc2dZMmgxYm1zdWMzUmhjblJVWVdjN1hHNGdJR05vZFc1ckxtRm1kR1Z5SUQwZ1kyaDFibXN1Wlc1a1ZHRm5JQ3NnWTJoMWJtc3VZV1owWlhJN1hHNGdJSE5sYkdZdWMzUmhjblFnUFNCamFIVnVheTVpWldadmNtVXViR1Z1WjNSb08xeHVJQ0J6Wld4bUxtVnVaQ0E5SUdOb2RXNXJMbUpsWm05eVpTNXNaVzVuZEdnZ0t5QmphSFZ1YXk1elpXeGxZM1JwYjI0dWJHVnVaM1JvTzF4dUlDQnpaV3htTG5SbGVIUWdQU0JqYUhWdWF5NWlaV1p2Y21VZ0t5QmphSFZ1YXk1elpXeGxZM1JwYjI0Z0t5QmphSFZ1YXk1aFpuUmxjanRjYmlBZ2MyVnNaaTV6WTNKdmJHeFViM0FnUFNCamFIVnVheTV6WTNKdmJHeFViM0E3WEc1OU8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRWx1Y0hWMFUzUmhkR1U3WEc0aVhYMD0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBjb21tYW5kcyA9IHtcbiAgbWFya2Rvd246IHtcbiAgICBib2xkT3JJdGFsaWM6IHJlcXVpcmUoJy4vbWFya2Rvd24vYm9sZE9ySXRhbGljJyksXG4gICAgbGlua09ySW1hZ2VPckF0dGFjaG1lbnQ6IHJlcXVpcmUoJy4vbWFya2Rvd24vbGlua09ySW1hZ2VPckF0dGFjaG1lbnQnKSxcbiAgICBibG9ja3F1b3RlOiByZXF1aXJlKCcuL21hcmtkb3duL2Jsb2NrcXVvdGUnKSxcbiAgICBjb2RlYmxvY2s6IHJlcXVpcmUoJy4vbWFya2Rvd24vY29kZWJsb2NrJyksXG4gICAgaGVhZGluZzogcmVxdWlyZSgnLi9tYXJrZG93bi9oZWFkaW5nJyksXG4gICAgbGlzdDogcmVxdWlyZSgnLi9tYXJrZG93bi9saXN0JyksXG4gICAgaHI6IHJlcXVpcmUoJy4vbWFya2Rvd24vaHInKVxuICB9LFxuICBodG1sOiB7XG4gICAgYm9sZE9ySXRhbGljOiByZXF1aXJlKCcuL2h0bWwvYm9sZE9ySXRhbGljJyksXG4gICAgbGlua09ySW1hZ2VPckF0dGFjaG1lbnQ6IHJlcXVpcmUoJy4vaHRtbC9saW5rT3JJbWFnZU9yQXR0YWNobWVudCcpLFxuICAgIGJsb2NrcXVvdGU6IHJlcXVpcmUoJy4vaHRtbC9ibG9ja3F1b3RlJyksXG4gICAgY29kZWJsb2NrOiByZXF1aXJlKCcuL2h0bWwvY29kZWJsb2NrJyksXG4gICAgaGVhZGluZzogcmVxdWlyZSgnLi9odG1sL2hlYWRpbmcnKSxcbiAgICBsaXN0OiByZXF1aXJlKCcuL2h0bWwvbGlzdCcpLFxuICAgIGhyOiByZXF1aXJlKCcuL2h0bWwvaHInKVxuICB9XG59O1xuXG5jb21tYW5kcy53eXNpd3lnID0gY29tbWFuZHMuaHRtbDtcblxuZnVuY3Rpb24gYmluZENvbW1hbmRzIChzdXJmYWNlLCBvcHRpb25zLCBlZGl0b3IpIHtcbiAgYmluZCgnYm9sZCcsICdjbWQrYicsIGJvbGQpO1xuICBiaW5kKCdpdGFsaWMnLCAnY21kK2knLCBpdGFsaWMpO1xuICBiaW5kKCdxdW90ZScsICdjbWQraicsIHJvdXRlcignYmxvY2txdW90ZScpKTtcbiAgYmluZCgnY29kZScsICdjbWQrZScsIGNvZGUpO1xuICBiaW5kKCdvbCcsICdjbWQrbycsIG9sKTtcbiAgYmluZCgndWwnLCAnY21kK3UnLCB1bCk7XG4gIGJpbmQoJ2hlYWRpbmcnLCAnY21kK2QnLCByb3V0ZXIoJ2hlYWRpbmcnKSk7XG4gIGVkaXRvci5zaG93TGlua0RpYWxvZyA9IGZhYnJpY2F0b3IoYmluZCgnbGluaycsICdjbWQraycsIGxpbmtPckltYWdlT3JBdHRhY2htZW50KCdsaW5rJykpKTtcbiAgZWRpdG9yLnNob3dJbWFnZURpYWxvZyA9IGZhYnJpY2F0b3IoYmluZCgnaW1hZ2UnLCAnY21kK2cnLCBsaW5rT3JJbWFnZU9yQXR0YWNobWVudCgnaW1hZ2UnKSkpO1xuICBlZGl0b3IubGlua09ySW1hZ2VPckF0dGFjaG1lbnQgPSBsaW5rT3JJbWFnZU9yQXR0YWNobWVudDtcblxuICBpZiAob3B0aW9ucy5hdHRhY2htZW50cykge1xuICAgIGVkaXRvci5zaG93QXR0YWNobWVudERpYWxvZyA9IGZhYnJpY2F0b3IoYmluZCgnYXR0YWNobWVudCcsICdjbWQrc2hpZnQraycsIGxpbmtPckltYWdlT3JBdHRhY2htZW50KCdhdHRhY2htZW50JykpKTtcbiAgfVxuICBpZiAob3B0aW9ucy5ocikgeyBiaW5kKCdocicsICdjbWQrbicsIHJvdXRlcignaHInKSk7IH1cblxuICBmdW5jdGlvbiBmYWJyaWNhdG9yIChlbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBvcGVuICgpIHtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoZWwsICdjbGljaycpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gYm9sZCAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0uYm9sZE9ySXRhbGljKGNodW5rcywgJ2JvbGQnKTtcbiAgfVxuICBmdW5jdGlvbiBpdGFsaWMgKG1vZGUsIGNodW5rcykge1xuICAgIGNvbW1hbmRzW21vZGVdLmJvbGRPckl0YWxpYyhjaHVua3MsICdpdGFsaWMnKTtcbiAgfVxuICBmdW5jdGlvbiBjb2RlIChtb2RlLCBjaHVua3MpIHtcbiAgICBjb21tYW5kc1ttb2RlXS5jb2RlYmxvY2soY2h1bmtzLCB7IGZlbmNpbmc6IG9wdGlvbnMuZmVuY2luZyB9KTtcbiAgfVxuICBmdW5jdGlvbiB1bCAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0ubGlzdChjaHVua3MsIGZhbHNlKTtcbiAgfVxuICBmdW5jdGlvbiBvbCAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0ubGlzdChjaHVua3MsIHRydWUpO1xuICB9XG4gIGZ1bmN0aW9uIGxpbmtPckltYWdlT3JBdHRhY2htZW50ICh0eXBlLCBhdXRvVXBsb2FkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGxpbmtPckltYWdlT3JBdHRhY2htZW50SW52b2tlIChtb2RlLCBjaHVua3MpIHtcbiAgICAgIGNvbW1hbmRzW21vZGVdLmxpbmtPckltYWdlT3JBdHRhY2htZW50LmNhbGwodGhpcywgY2h1bmtzLCB7XG4gICAgICAgIGVkaXRvcjogZWRpdG9yLFxuICAgICAgICBtb2RlOiBtb2RlLFxuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBzdXJmYWNlOiBzdXJmYWNlLFxuICAgICAgICBwcm9tcHRzOiBvcHRpb25zLnByb21wdHMsXG4gICAgICAgIHhocjogb3B0aW9ucy54aHIsXG4gICAgICAgIHVwbG9hZDogb3B0aW9uc1t0eXBlICsgJ3MnXSxcbiAgICAgICAgY2xhc3Nlczogb3B0aW9ucy5jbGFzc2VzLFxuICAgICAgICBtZXJnZUh0bWxBbmRBdHRhY2htZW50OiBvcHRpb25zLm1lcmdlSHRtbEFuZEF0dGFjaG1lbnQsXG4gICAgICAgIGF1dG9VcGxvYWQ6IGF1dG9VcGxvYWRcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gYmluZCAoaWQsIGNvbWJvLCBmbikge1xuICAgIHJldHVybiBlZGl0b3IuYWRkQ29tbWFuZEJ1dHRvbihpZCwgY29tYm8sIHN1cHByZXNzKGZuKSk7XG4gIH1cbiAgZnVuY3Rpb24gcm91dGVyIChtZXRob2QpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gcm91dGVkIChtb2RlLCBjaHVua3MpIHsgY29tbWFuZHNbbW9kZV1bbWV0aG9kXS5jYWxsKHRoaXMsIGNodW5rcyk7IH07XG4gIH1cbiAgZnVuY3Rpb24gc3RvcCAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuICBmdW5jdGlvbiBzdXBwcmVzcyAoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gc3VwcHJlc3NvciAoZSwgbW9kZSwgY2h1bmtzKSB7IHN0b3AoZSk7IGZuLmNhbGwodGhpcywgbW9kZSwgY2h1bmtzKTsgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRDb21tYW5kcztcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gY2FzdCAoY29sbGVjdGlvbikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpO1xuICB2YXIgbGVuID0gY29sbGVjdGlvbi5sZW5ndGg7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHJlc3VsdC5wdXNoKGNvbGxlY3Rpb25baV0pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FzdDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJpbnB1dCA9IC9eXFxzKiguKj8pKD86XFxzK1wiKC4rKVwiKT9cXHMqJC87XG52YXIgcmZ1bGwgPSAvXig/Omh0dHBzP3xmdHApOlxcL1xcLy87XG5cbmZ1bmN0aW9uIHBhcnNlTGlua0lucHV0IChpbnB1dCkge1xuICByZXR1cm4gcGFyc2VyLmFwcGx5KG51bGwsIGlucHV0Lm1hdGNoKHJpbnB1dCkpO1xuXG4gIGZ1bmN0aW9uIHBhcnNlciAoYWxsLCBsaW5rLCB0aXRsZSkge1xuICAgIHZhciBocmVmID0gbGluay5yZXBsYWNlKC9cXD8uKiQvLCBxdWVyeVVuZW5jb2RlZFJlcGxhY2VyKTtcbiAgICBocmVmID0gZGVjb2RlVVJJQ29tcG9uZW50KGhyZWYpO1xuICAgIGhyZWYgPSBlbmNvZGVVUkkoaHJlZikucmVwbGFjZSgvJy9nLCAnJTI3JykucmVwbGFjZSgvXFwoL2csICclMjgnKS5yZXBsYWNlKC9cXCkvZywgJyUyOScpO1xuICAgIGhyZWYgPSBocmVmLnJlcGxhY2UoL1xcPy4qJC8sIHF1ZXJ5RW5jb2RlZFJlcGxhY2VyKTtcblxuICAgIHJldHVybiB7XG4gICAgICBocmVmOiBmb3JtYXRIcmVmKGhyZWYpLCB0aXRsZTogZm9ybWF0VGl0bGUodGl0bGUpXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBxdWVyeVVuZW5jb2RlZFJlcGxhY2VyIChxdWVyeSkge1xuICByZXR1cm4gcXVlcnkucmVwbGFjZSgvXFwrL2csICcgJyk7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5RW5jb2RlZFJlcGxhY2VyIChxdWVyeSkge1xuICByZXR1cm4gcXVlcnkucmVwbGFjZSgvXFwrL2csICclMmInKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGl0bGUgKHRpdGxlKSB7XG4gIGlmICghdGl0bGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB0aXRsZVxuICAgIC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhyZWYgKHVybCkge1xuICB2YXIgaHJlZiA9IHVybC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gIGlmIChocmVmLmxlbmd0aCAmJiBocmVmWzBdICE9PSAnLycgJiYgIXJmdWxsLnRlc3QoaHJlZikpIHtcbiAgICByZXR1cm4gJ2h0dHA6Ly8nICsgaHJlZjtcbiAgfVxuICByZXR1cm4gaHJlZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZUxpbmtJbnB1dDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gdHJpbSAocmVtb3ZlKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAocmVtb3ZlKSB7XG4gICAgYmVmb3JlUmVwbGFjZXIgPSBhZnRlclJlcGxhY2VyID0gJyc7XG4gIH1cbiAgc2VsZi5zZWxlY3Rpb24gPSBzZWxmLnNlbGVjdGlvbi5yZXBsYWNlKC9eKFxccyopLywgYmVmb3JlUmVwbGFjZXIpLnJlcGxhY2UoLyhcXHMqKSQvLCBhZnRlclJlcGxhY2VyKTtcblxuICBmdW5jdGlvbiBiZWZvcmVSZXBsYWNlciAodGV4dCkge1xuICAgIHNlbGYuYmVmb3JlICs9IHRleHQ7IHJldHVybiAnJztcbiAgfVxuICBmdW5jdGlvbiBhZnRlclJlcGxhY2VyICh0ZXh0KSB7XG4gICAgc2VsZi5hZnRlciA9IHRleHQgKyBzZWxmLmFmdGVyOyByZXR1cm4gJyc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0cmltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcnRyaW0gPSAvXlxccyt8XFxzKyQvZztcbnZhciByc3BhY2VzID0gL1xccysvZztcblxuZnVuY3Rpb24gYWRkQ2xhc3MgKGVsLCBjbHMpIHtcbiAgdmFyIGN1cnJlbnQgPSBlbC5jbGFzc05hbWU7XG4gIGlmIChjdXJyZW50LmluZGV4T2YoY2xzKSA9PT0gLTEpIHtcbiAgICBlbC5jbGFzc05hbWUgPSAoY3VycmVudCArICcgJyArIGNscykucmVwbGFjZShydHJpbSwgJycpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJtQ2xhc3MgKGVsLCBjbHMpIHtcbiAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoY2xzLCAnJykucmVwbGFjZShydHJpbSwgJycpLnJlcGxhY2UocnNwYWNlcywgJyAnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZDogYWRkQ2xhc3MsXG4gIHJtOiBybUNsYXNzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBleHRlbmRSZWdFeHAgKHJlZ2V4LCBwcmUsIHBvc3QpIHtcbiAgdmFyIHBhdHRlcm4gPSByZWdleC50b1N0cmluZygpO1xuICB2YXIgZmxhZ3M7XG5cbiAgcGF0dGVybiA9IHBhdHRlcm4ucmVwbGFjZSgvXFwvKFtnaW1dKikkLywgY2FwdHVyZUZsYWdzKTtcbiAgcGF0dGVybiA9IHBhdHRlcm4ucmVwbGFjZSgvKF5cXC98XFwvJCkvZywgJycpO1xuICBwYXR0ZXJuID0gcHJlICsgcGF0dGVybiArIHBvc3Q7XG4gIHJldHVybiBuZXcgUmVnRXhwKHBhdHRlcm4sIGZsYWdzKTtcblxuICBmdW5jdGlvbiBjYXB0dXJlRmxhZ3MgKGFsbCwgZikge1xuICAgIGZsYWdzID0gZjtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmRSZWdFeHA7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGZpeEVPTCAodGV4dCkge1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpLnJlcGxhY2UoL1xcci9nLCAnXFxuJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZml4RU9MO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgSW5wdXRTdGF0ZSA9IHJlcXVpcmUoJy4vSW5wdXRTdGF0ZScpO1xuXG5mdW5jdGlvbiBnZXRDb21tYW5kSGFuZGxlciAoc3VyZmFjZSwgaGlzdG9yeSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUNvbW1hbmQgKGUpIHtcbiAgICBzdXJmYWNlLmZvY3VzKGhpc3RvcnkuaW5wdXRNb2RlKTtcbiAgICBoaXN0b3J5LnNldENvbW1hbmRNb2RlKCk7XG5cbiAgICB2YXIgc3RhdGUgPSBuZXcgSW5wdXRTdGF0ZShzdXJmYWNlLCBoaXN0b3J5LmlucHV0TW9kZSk7XG4gICAgdmFyIGNodW5rcyA9IHN0YXRlLmdldENodW5rcygpO1xuICAgIHZhciBhc3luY0hhbmRsZXIgPSB7XG4gICAgICBhc3luYzogYXN5bmMsIGltbWVkaWF0ZTogdHJ1ZVxuICAgIH07XG5cbiAgICBmbi5jYWxsKGFzeW5jSGFuZGxlciwgZSwgaGlzdG9yeS5pbnB1dE1vZGUsIGNodW5rcyk7XG5cbiAgICBpZiAoYXN5bmNIYW5kbGVyLmltbWVkaWF0ZSkge1xuICAgICAgZG9uZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzeW5jICgpIHtcbiAgICAgIGFzeW5jSGFuZGxlci5pbW1lZGlhdGUgPSBmYWxzZTtcbiAgICAgIHJldHVybiBkb25lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvbmUgKCkge1xuICAgICAgc3VyZmFjZS5mb2N1cyhoaXN0b3J5LmlucHV0TW9kZSk7XG4gICAgICBzdGF0ZS5zZXRDaHVua3MoY2h1bmtzKTtcbiAgICAgIHN0YXRlLnJlc3RvcmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0Q29tbWFuZEhhbmRsZXI7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgZ2V0U2VsZWN0aW9uID0gcmVxdWlyZSgnc2VsZWNjaW9uJyk7XG52YXIgZml4RU9MID0gcmVxdWlyZSgnLi9maXhFT0wnKTtcbnZhciBtYW55ID0gcmVxdWlyZSgnLi9tYW55Jyk7XG52YXIgY2FzdCA9IHJlcXVpcmUoJy4vY2FzdCcpO1xudmFyIHJhbmdlVG9UZXh0UmFuZ2UgPSBnZXRTZWxlY3Rpb24ucmFuZ2VUb1RleHRSYW5nZTtcbnZhciByb3BlbiA9IC9eKDxbXj5dKyg/OiBbXj5dKik/PikvO1xudmFyIHJjbG9zZSA9IC8oPFxcL1tePl0rPikkLztcblxuZnVuY3Rpb24gc3VyZmFjZSAodGV4dGFyZWEsIGVkaXRhYmxlLCBkcm9wYXJlYSkge1xuICByZXR1cm4ge1xuICAgIHRleHRhcmVhOiB0ZXh0YXJlYSxcbiAgICBlZGl0YWJsZTogZWRpdGFibGUsXG4gICAgZHJvcGFyZWE6IGRyb3BhcmVhLFxuICAgIGZvY3VzOiBzZXRGb2N1cyxcbiAgICByZWFkOiByZWFkLFxuICAgIHdyaXRlOiB3cml0ZSxcbiAgICBjdXJyZW50OiBjdXJyZW50LFxuICAgIHdyaXRlU2VsZWN0aW9uOiB3cml0ZVNlbGVjdGlvbixcbiAgICByZWFkU2VsZWN0aW9uOiByZWFkU2VsZWN0aW9uXG4gIH07XG5cbiAgZnVuY3Rpb24gc2V0Rm9jdXMgKG1vZGUpIHtcbiAgICBjdXJyZW50KG1vZGUpLmZvY3VzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjdXJyZW50IChtb2RlKSB7XG4gICAgcmV0dXJuIG1vZGUgPT09ICd3eXNpd3lnJyA/IGVkaXRhYmxlIDogdGV4dGFyZWE7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChtb2RlKSB7XG4gICAgaWYgKG1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgcmV0dXJuIGVkaXRhYmxlLmlubmVySFRNTDtcbiAgICB9XG4gICAgcmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUgKG1vZGUsIHZhbHVlKSB7XG4gICAgaWYgKG1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgZWRpdGFibGUuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVTZWxlY3Rpb24gKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLm1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgd3JpdGVTZWxlY3Rpb25FZGl0YWJsZShzdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyaXRlU2VsZWN0aW9uVGV4dGFyZWEoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRTZWxlY3Rpb24gKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLm1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgcmVhZFNlbGVjdGlvbkVkaXRhYmxlKHN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVhZFNlbGVjdGlvblRleHRhcmVhKHN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZVNlbGVjdGlvblRleHRhcmVhIChzdGF0ZSkge1xuICAgIHZhciByYW5nZTtcbiAgICBpZiAodGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgIT09IHZvaWQgMCkge1xuICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgIHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ID0gc3RhdGUuc3RhcnQ7XG4gICAgICB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQgPSBzdGF0ZS5lbmQ7XG4gICAgICB0ZXh0YXJlYS5zY3JvbGxUb3AgPSBzdGF0ZS5zY3JvbGxUb3A7XG4gICAgfSBlbHNlIGlmIChkb2Muc2VsZWN0aW9uKSB7XG4gICAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgIT09IHRleHRhcmVhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICByYW5nZSA9IHRleHRhcmVhLmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtdGV4dGFyZWEudmFsdWUubGVuZ3RoKTtcbiAgICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIC10ZXh0YXJlYS52YWx1ZS5sZW5ndGgpO1xuICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgc3RhdGUuZW5kKTtcbiAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgc3RhdGUuc3RhcnQpO1xuICAgICAgcmFuZ2Uuc2VsZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFNlbGVjdGlvblRleHRhcmVhIChzdGF0ZSkge1xuICAgIGlmICh0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydCAhPT0gdm9pZCAwKSB7XG4gICAgICBzdGF0ZS5zdGFydCA9IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgc3RhdGUuZW5kID0gdGV4dGFyZWEuc2VsZWN0aW9uRW5kO1xuICAgIH0gZWxzZSBpZiAoZG9jLnNlbGVjdGlvbikge1xuICAgICAgYW5jaWVudGx5UmVhZFNlbGVjdGlvblRleHRhcmVhKHN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhbmNpZW50bHlSZWFkU2VsZWN0aW9uVGV4dGFyZWEgKHN0YXRlKSB7XG4gICAgaWYgKGRvYy5hY3RpdmVFbGVtZW50ICYmIGRvYy5hY3RpdmVFbGVtZW50ICE9PSB0ZXh0YXJlYSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN0YXRlLnRleHQgPSBmaXhFT0wodGV4dGFyZWEudmFsdWUpO1xuXG4gICAgdmFyIHJhbmdlID0gZG9jLnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICAgIHZhciBmaXhlZFJhbmdlID0gZml4RU9MKHJhbmdlLnRleHQpO1xuICAgIHZhciBtYXJrZXIgPSAnXFx4MDcnO1xuICAgIHZhciBtYXJrZWRSYW5nZSA9IG1hcmtlciArIGZpeGVkUmFuZ2UgKyBtYXJrZXI7XG5cbiAgICByYW5nZS50ZXh0ID0gbWFya2VkUmFuZ2U7XG5cbiAgICB2YXIgaW5wdXRUZXh0ID0gZml4RU9MKHRleHRhcmVhLnZhbHVlKTtcblxuICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLW1hcmtlZFJhbmdlLmxlbmd0aCk7XG4gICAgcmFuZ2UudGV4dCA9IGZpeGVkUmFuZ2U7XG4gICAgc3RhdGUuc3RhcnQgPSBpbnB1dFRleHQuaW5kZXhPZihtYXJrZXIpO1xuICAgIHN0YXRlLmVuZCA9IGlucHV0VGV4dC5sYXN0SW5kZXhPZihtYXJrZXIpIC0gbWFya2VyLmxlbmd0aDtcblxuICAgIHZhciBkaWZmID0gc3RhdGUudGV4dC5sZW5ndGggLSBmaXhFT0wodGV4dGFyZWEudmFsdWUpLmxlbmd0aDtcbiAgICBpZiAoZGlmZikge1xuICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtZml4ZWRSYW5nZS5sZW5ndGgpO1xuICAgICAgZml4ZWRSYW5nZSArPSBtYW55KCdcXG4nLCBkaWZmKTtcbiAgICAgIHN0YXRlLmVuZCArPSBkaWZmO1xuICAgICAgcmFuZ2UudGV4dCA9IGZpeGVkUmFuZ2U7XG4gICAgfVxuICAgIHN0YXRlLnNlbGVjdCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVTZWxlY3Rpb25FZGl0YWJsZSAoc3RhdGUpIHtcbiAgICB2YXIgY2h1bmtzID0gc3RhdGUuY2FjaGVkQ2h1bmtzIHx8IHN0YXRlLmdldENodW5rcygpO1xuICAgIHZhciBzdGFydCA9IGNodW5rcy5iZWZvcmUubGVuZ3RoO1xuICAgIHZhciBlbmQgPSBzdGFydCArIGNodW5rcy5zZWxlY3Rpb24ubGVuZ3RoO1xuICAgIHZhciBwID0ge307XG5cbiAgICB3YWxrKGVkaXRhYmxlLmZpcnN0Q2hpbGQsIHBlZWspO1xuICAgIGVkaXRhYmxlLmZvY3VzKCk7XG5cbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlUmFuZ2UpIHtcbiAgICAgIG1vZGVyblNlbGVjdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbGRTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb2Rlcm5TZWxlY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbCA9IGdldFNlbGVjdGlvbigpO1xuICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIGlmICghcC5zdGFydENvbnRhaW5lcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAocC5lbmRDb250YWluZXIpIHtcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKHAuZW5kQ29udGFpbmVyLCBwLmVuZE9mZnNldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYW5nZS5zZXRFbmQocC5zdGFydENvbnRhaW5lciwgcC5zdGFydE9mZnNldCk7XG4gICAgICB9XG4gICAgICByYW5nZS5zZXRTdGFydChwLnN0YXJ0Q29udGFpbmVyLCBwLnN0YXJ0T2Zmc2V0KTtcbiAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb2xkU2VsZWN0aW9uICgpIHtcbiAgICAgIHJhbmdlVG9UZXh0UmFuZ2UocCkuc2VsZWN0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGVlayAoY29udGV4dCwgZWwpIHtcbiAgICAgIHZhciBjdXJzb3IgPSBjb250ZXh0LnRleHQubGVuZ3RoO1xuICAgICAgdmFyIGNvbnRlbnQgPSByZWFkTm9kZShlbCkubGVuZ3RoO1xuICAgICAgdmFyIHN1bSA9IGN1cnNvciArIGNvbnRlbnQ7XG4gICAgICBpZiAoIXAuc3RhcnRDb250YWluZXIgJiYgc3VtID49IHN0YXJ0KSB7XG4gICAgICAgIHAuc3RhcnRDb250YWluZXIgPSBlbDtcbiAgICAgICAgcC5zdGFydE9mZnNldCA9IGJvdW5kZWQoc3RhcnQgLSBjdXJzb3IpO1xuICAgICAgfVxuICAgICAgaWYgKCFwLmVuZENvbnRhaW5lciAmJiBzdW0gPj0gZW5kKSB7XG4gICAgICAgIHAuZW5kQ29udGFpbmVyID0gZWw7XG4gICAgICAgIHAuZW5kT2Zmc2V0ID0gYm91bmRlZChlbmQgLSBjdXJzb3IpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBib3VuZGVkIChvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGNvbnRlbnQsIG9mZnNldCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRTZWxlY3Rpb25FZGl0YWJsZSAoc3RhdGUpIHtcbiAgICB2YXIgc2VsID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgdmFyIGRpc3RhbmNlID0gd2FsayhlZGl0YWJsZS5maXJzdENoaWxkLCBwZWVrKTtcbiAgICB2YXIgc3RhcnQgPSBkaXN0YW5jZS5zdGFydCB8fCAwO1xuICAgIHZhciBlbmQgPSBkaXN0YW5jZS5lbmQgfHwgMDtcblxuICAgIHN0YXRlLnRleHQgPSBkaXN0YW5jZS50ZXh0O1xuXG4gICAgaWYgKGVuZCA+IHN0YXJ0KSB7XG4gICAgICBzdGF0ZS5zdGFydCA9IHN0YXJ0O1xuICAgICAgc3RhdGUuZW5kID0gZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5zdGFydCA9IGVuZDtcbiAgICAgIHN0YXRlLmVuZCA9IHN0YXJ0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBlZWsgKGNvbnRleHQsIGVsKSB7XG4gICAgICBpZiAoZWwgPT09IHNlbC5hbmNob3JOb2RlKSB7XG4gICAgICAgIGNvbnRleHQuc3RhcnQgPSBjb250ZXh0LnRleHQubGVuZ3RoICsgc2VsLmFuY2hvck9mZnNldDtcbiAgICAgIH1cbiAgICAgIGlmIChlbCA9PT0gc2VsLmZvY3VzTm9kZSkge1xuICAgICAgICBjb250ZXh0LmVuZCA9IGNvbnRleHQudGV4dC5sZW5ndGggKyBzZWwuZm9jdXNPZmZzZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2FsayAoZWwsIHBlZWssIGN0eCwgc2libGluZ3MpIHtcbiAgICB2YXIgY29udGV4dCA9IGN0eCB8fCB7IHRleHQ6ICcnIH07XG5cbiAgICBpZiAoIWVsKSB7XG4gICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG5cbiAgICB2YXIgZWxOb2RlID0gZWwubm9kZVR5cGUgPT09IDE7XG4gICAgdmFyIHRleHROb2RlID0gZWwubm9kZVR5cGUgPT09IDM7XG5cbiAgICBwZWVrKGNvbnRleHQsIGVsKTtcblxuICAgIGlmICh0ZXh0Tm9kZSkge1xuICAgICAgY29udGV4dC50ZXh0ICs9IHJlYWROb2RlKGVsKTtcbiAgICB9XG4gICAgaWYgKGVsTm9kZSkge1xuICAgICAgaWYgKGVsLm91dGVySFRNTC5tYXRjaChyb3BlbikpIHsgY29udGV4dC50ZXh0ICs9IFJlZ0V4cC4kMTsgfVxuICAgICAgY2FzdChlbC5jaGlsZE5vZGVzKS5mb3JFYWNoKHdhbGtDaGlsZHJlbik7XG4gICAgICBpZiAoZWwub3V0ZXJIVE1MLm1hdGNoKHJjbG9zZSkpIHsgY29udGV4dC50ZXh0ICs9IFJlZ0V4cC4kMTsgfVxuICAgIH1cbiAgICBpZiAoc2libGluZ3MgIT09IGZhbHNlICYmIGVsLm5leHRTaWJsaW5nKSB7XG4gICAgICByZXR1cm4gd2FsayhlbC5uZXh0U2libGluZywgcGVlaywgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0O1xuXG4gICAgZnVuY3Rpb24gd2Fsa0NoaWxkcmVuIChjaGlsZCkge1xuICAgICAgd2FsayhjaGlsZCwgcGVlaywgY29udGV4dCwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWROb2RlIChlbCkge1xuICAgIHJldHVybiBlbC5ub2RlVHlwZSA9PT0gMyA/IGZpeEVPTChlbC50ZXh0Q29udGVudCB8fCBlbC5pbm5lclRleHQgfHwgJycpIDogJyc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdXJmYWNlO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTluWlhSVGRYSm1ZV05sTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnWkc5aklEMGdaMnh2WW1Gc0xtUnZZM1Z0Wlc1ME8xeHVkbUZ5SUdkbGRGTmxiR1ZqZEdsdmJpQTlJSEpsY1hWcGNtVW9KM05sYkdWalkybHZiaWNwTzF4dWRtRnlJR1pwZUVWUFRDQTlJSEpsY1hWcGNtVW9KeTR2Wm1sNFJVOU1KeWs3WEc1MllYSWdiV0Z1ZVNBOUlISmxjWFZwY21Vb0p5NHZiV0Z1ZVNjcE8xeHVkbUZ5SUdOaGMzUWdQU0J5WlhGMWFYSmxLQ2N1TDJOaGMzUW5LVHRjYm5aaGNpQnlZVzVuWlZSdlZHVjRkRkpoYm1kbElEMGdaMlYwVTJWc1pXTjBhVzl1TG5KaGJtZGxWRzlVWlhoMFVtRnVaMlU3WEc1MllYSWdjbTl3Wlc0Z1BTQXZYaWc4VzE0K1hTc29Qem9nVzE0K1hTb3BQejRwTHp0Y2JuWmhjaUJ5WTJ4dmMyVWdQU0F2S0R4Y1hDOWJYajVkS3o0cEpDODdYRzVjYm1aMWJtTjBhVzl1SUhOMWNtWmhZMlVnS0hSbGVIUmhjbVZoTENCbFpHbDBZV0pzWlN3Z1pISnZjR0Z5WldFcElIdGNiaUFnY21WMGRYSnVJSHRjYmlBZ0lDQjBaWGgwWVhKbFlUb2dkR1Y0ZEdGeVpXRXNYRzRnSUNBZ1pXUnBkR0ZpYkdVNklHVmthWFJoWW14bExGeHVJQ0FnSUdSeWIzQmhjbVZoT2lCa2NtOXdZWEpsWVN4Y2JpQWdJQ0JtYjJOMWN6b2djMlYwUm05amRYTXNYRzRnSUNBZ2NtVmhaRG9nY21WaFpDeGNiaUFnSUNCM2NtbDBaVG9nZDNKcGRHVXNYRzRnSUNBZ1kzVnljbVZ1ZERvZ1kzVnljbVZ1ZEN4Y2JpQWdJQ0IzY21sMFpWTmxiR1ZqZEdsdmJqb2dkM0pwZEdWVFpXeGxZM1JwYjI0c1hHNGdJQ0FnY21WaFpGTmxiR1ZqZEdsdmJqb2djbVZoWkZObGJHVmpkR2x2Ymx4dUlDQjlPMXh1WEc0Z0lHWjFibU4wYVc5dUlITmxkRVp2WTNWeklDaHRiMlJsS1NCN1hHNGdJQ0FnWTNWeWNtVnVkQ2h0YjJSbEtTNW1iMk4xY3lncE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdZM1Z5Y21WdWRDQW9iVzlrWlNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJ0YjJSbElEMDlQU0FuZDNsemFYZDVaeWNnUHlCbFpHbDBZV0pzWlNBNklIUmxlSFJoY21WaE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdjbVZoWkNBb2JXOWtaU2tnZTF4dUlDQWdJR2xtSUNodGIyUmxJRDA5UFNBbmQzbHphWGQ1WnljcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCbFpHbDBZV0pzWlM1cGJtNWxja2hVVFV3N1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQjBaWGgwWVhKbFlTNTJZV3gxWlR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlIZHlhWFJsSUNodGIyUmxMQ0IyWVd4MVpTa2dlMXh1SUNBZ0lHbG1JQ2h0YjJSbElEMDlQU0FuZDNsemFYZDVaeWNwSUh0Y2JpQWdJQ0FnSUdWa2FYUmhZbXhsTG1sdWJtVnlTRlJOVENBOUlIWmhiSFZsTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQjBaWGgwWVhKbFlTNTJZV3gxWlNBOUlIWmhiSFZsTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkeWFYUmxVMlZzWldOMGFXOXVJQ2h6ZEdGMFpTa2dlMXh1SUNBZ0lHbG1JQ2h6ZEdGMFpTNXRiMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y3BJSHRjYmlBZ0lDQWdJSGR5YVhSbFUyVnNaV04wYVc5dVJXUnBkR0ZpYkdVb2MzUmhkR1VwTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQjNjbWwwWlZObGJHVmpkR2x2YmxSbGVIUmhjbVZoS0hOMFlYUmxLVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ5WldGa1UyVnNaV04wYVc5dUlDaHpkR0YwWlNrZ2UxeHVJQ0FnSUdsbUlDaHpkR0YwWlM1dGIyUmxJRDA5UFNBbmQzbHphWGQ1WnljcElIdGNiaUFnSUNBZ0lISmxZV1JUWld4bFkzUnBiMjVGWkdsMFlXSnNaU2h6ZEdGMFpTazdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhKbFlXUlRaV3hsWTNScGIyNVVaWGgwWVhKbFlTaHpkR0YwWlNrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2QzSnBkR1ZUWld4bFkzUnBiMjVVWlhoMFlYSmxZU0FvYzNSaGRHVXBJSHRjYmlBZ0lDQjJZWElnY21GdVoyVTdYRzRnSUNBZ2FXWWdLSFJsZUhSaGNtVmhMbk5sYkdWamRHbHZibE4wWVhKMElDRTlQU0IyYjJsa0lEQXBJSHRjYmlBZ0lDQWdJSFJsZUhSaGNtVmhMbVp2WTNWektDazdYRzRnSUNBZ0lDQjBaWGgwWVhKbFlTNXpaV3hsWTNScGIyNVRkR0Z5ZENBOUlITjBZWFJsTG5OMFlYSjBPMXh1SUNBZ0lDQWdkR1Y0ZEdGeVpXRXVjMlZzWldOMGFXOXVSVzVrSUQwZ2MzUmhkR1V1Wlc1a08xeHVJQ0FnSUNBZ2RHVjRkR0Z5WldFdWMyTnliMnhzVkc5d0lEMGdjM1JoZEdVdWMyTnliMnhzVkc5d08xeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb1pHOWpMbk5sYkdWamRHbHZiaWtnZTF4dUlDQWdJQ0FnYVdZZ0tHUnZZeTVoWTNScGRtVkZiR1Z0Wlc1MElDWW1JR1J2WXk1aFkzUnBkbVZGYkdWdFpXNTBJQ0U5UFNCMFpYaDBZWEpsWVNrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCMFpYaDBZWEpsWVM1bWIyTjFjeWdwTzF4dUlDQWdJQ0FnY21GdVoyVWdQU0IwWlhoMFlYSmxZUzVqY21WaGRHVlVaWGgwVW1GdVoyVW9LVHRjYmlBZ0lDQWdJSEpoYm1kbExtMXZkbVZUZEdGeWRDZ25ZMmhoY21GamRHVnlKeXdnTFhSbGVIUmhjbVZoTG5aaGJIVmxMbXhsYm1kMGFDazdYRzRnSUNBZ0lDQnlZVzVuWlM1dGIzWmxSVzVrS0NkamFHRnlZV04wWlhJbkxDQXRkR1Y0ZEdGeVpXRXVkbUZzZFdVdWJHVnVaM1JvS1R0Y2JpQWdJQ0FnSUhKaGJtZGxMbTF2ZG1WRmJtUW9KMk5vWVhKaFkzUmxjaWNzSUhOMFlYUmxMbVZ1WkNrN1hHNGdJQ0FnSUNCeVlXNW5aUzV0YjNabFUzUmhjblFvSjJOb1lYSmhZM1JsY2ljc0lITjBZWFJsTG5OMFlYSjBLVHRjYmlBZ0lDQWdJSEpoYm1kbExuTmxiR1ZqZENncE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlISmxZV1JUWld4bFkzUnBiMjVVWlhoMFlYSmxZU0FvYzNSaGRHVXBJSHRjYmlBZ0lDQnBaaUFvZEdWNGRHRnlaV0V1YzJWc1pXTjBhVzl1VTNSaGNuUWdJVDA5SUhadmFXUWdNQ2tnZTF4dUlDQWdJQ0FnYzNSaGRHVXVjM1JoY25RZ1BTQjBaWGgwWVhKbFlTNXpaV3hsWTNScGIyNVRkR0Z5ZER0Y2JpQWdJQ0FnSUhOMFlYUmxMbVZ1WkNBOUlIUmxlSFJoY21WaExuTmxiR1ZqZEdsdmJrVnVaRHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLR1J2WXk1elpXeGxZM1JwYjI0cElIdGNiaUFnSUNBZ0lHRnVZMmxsYm5Sc2VWSmxZV1JUWld4bFkzUnBiMjVVWlhoMFlYSmxZU2h6ZEdGMFpTazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdZVzVqYVdWdWRHeDVVbVZoWkZObGJHVmpkR2x2YmxSbGVIUmhjbVZoSUNoemRHRjBaU2tnZTF4dUlDQWdJR2xtSUNoa2IyTXVZV04wYVhabFJXeGxiV1Z1ZENBbUppQmtiMk11WVdOMGFYWmxSV3hsYldWdWRDQWhQVDBnZEdWNGRHRnlaV0VwSUh0Y2JpQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnpkR0YwWlM1MFpYaDBJRDBnWm1sNFJVOU1LSFJsZUhSaGNtVmhMblpoYkhWbEtUdGNibHh1SUNBZ0lIWmhjaUJ5WVc1blpTQTlJR1J2WXk1elpXeGxZM1JwYjI0dVkzSmxZWFJsVW1GdVoyVW9LVHRjYmlBZ0lDQjJZWElnWm1sNFpXUlNZVzVuWlNBOUlHWnBlRVZQVENoeVlXNW5aUzUwWlhoMEtUdGNiaUFnSUNCMllYSWdiV0Z5YTJWeUlEMGdKMXhjZURBM0p6dGNiaUFnSUNCMllYSWdiV0Z5YTJWa1VtRnVaMlVnUFNCdFlYSnJaWElnS3lCbWFYaGxaRkpoYm1kbElDc2diV0Z5YTJWeU8xeHVYRzRnSUNBZ2NtRnVaMlV1ZEdWNGRDQTlJRzFoY210bFpGSmhibWRsTzF4dVhHNGdJQ0FnZG1GeUlHbHVjSFYwVkdWNGRDQTlJR1pwZUVWUFRDaDBaWGgwWVhKbFlTNTJZV3gxWlNrN1hHNWNiaUFnSUNCeVlXNW5aUzV0YjNabFUzUmhjblFvSjJOb1lYSmhZM1JsY2ljc0lDMXRZWEpyWldSU1lXNW5aUzVzWlc1bmRHZ3BPMXh1SUNBZ0lISmhibWRsTG5SbGVIUWdQU0JtYVhobFpGSmhibWRsTzF4dUlDQWdJSE4wWVhSbExuTjBZWEowSUQwZ2FXNXdkWFJVWlhoMExtbHVaR1Y0VDJZb2JXRnlhMlZ5S1R0Y2JpQWdJQ0J6ZEdGMFpTNWxibVFnUFNCcGJuQjFkRlJsZUhRdWJHRnpkRWx1WkdWNFQyWW9iV0Z5YTJWeUtTQXRJRzFoY210bGNpNXNaVzVuZEdnN1hHNWNiaUFnSUNCMllYSWdaR2xtWmlBOUlITjBZWFJsTG5SbGVIUXViR1Z1WjNSb0lDMGdabWw0UlU5TUtIUmxlSFJoY21WaExuWmhiSFZsS1M1c1pXNW5kR2c3WEc0Z0lDQWdhV1lnS0dScFptWXBJSHRjYmlBZ0lDQWdJSEpoYm1kbExtMXZkbVZUZEdGeWRDZ25ZMmhoY21GamRHVnlKeXdnTFdacGVHVmtVbUZ1WjJVdWJHVnVaM1JvS1R0Y2JpQWdJQ0FnSUdacGVHVmtVbUZ1WjJVZ0t6MGdiV0Z1ZVNnblhGeHVKeXdnWkdsbVppazdYRzRnSUNBZ0lDQnpkR0YwWlM1bGJtUWdLejBnWkdsbVpqdGNiaUFnSUNBZ0lISmhibWRsTG5SbGVIUWdQU0JtYVhobFpGSmhibWRsTzF4dUlDQWdJSDFjYmlBZ0lDQnpkR0YwWlM1elpXeGxZM1FvS1R0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlIZHlhWFJsVTJWc1pXTjBhVzl1UldScGRHRmliR1VnS0hOMFlYUmxLU0I3WEc0Z0lDQWdkbUZ5SUdOb2RXNXJjeUE5SUhOMFlYUmxMbU5oWTJobFpFTm9kVzVyY3lCOGZDQnpkR0YwWlM1blpYUkRhSFZ1YTNNb0tUdGNiaUFnSUNCMllYSWdjM1JoY25RZ1BTQmphSFZ1YTNNdVltVm1iM0psTG14bGJtZDBhRHRjYmlBZ0lDQjJZWElnWlc1a0lEMGdjM1JoY25RZ0t5QmphSFZ1YTNNdWMyVnNaV04wYVc5dUxteGxibWQwYUR0Y2JpQWdJQ0IyWVhJZ2NDQTlJSHQ5TzF4dVhHNGdJQ0FnZDJGc2F5aGxaR2wwWVdKc1pTNW1hWEp6ZEVOb2FXeGtMQ0J3WldWcktUdGNiaUFnSUNCbFpHbDBZV0pzWlM1bWIyTjFjeWdwTzF4dVhHNGdJQ0FnYVdZZ0tHUnZZM1Z0Wlc1MExtTnlaV0YwWlZKaGJtZGxLU0I3WEc0Z0lDQWdJQ0J0YjJSbGNtNVRaV3hsWTNScGIyNG9LVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2IyeGtVMlZzWldOMGFXOXVLQ2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdablZ1WTNScGIyNGdiVzlrWlhKdVUyVnNaV04wYVc5dUlDZ3BJSHRjYmlBZ0lDQWdJSFpoY2lCelpXd2dQU0JuWlhSVFpXeGxZM1JwYjI0b0tUdGNiaUFnSUNBZ0lIWmhjaUJ5WVc1blpTQTlJR1J2WTNWdFpXNTBMbU55WldGMFpWSmhibWRsS0NrN1hHNGdJQ0FnSUNCcFppQW9JWEF1YzNSaGNuUkRiMjUwWVdsdVpYSXBJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdhV1lnS0hBdVpXNWtRMjl1ZEdGcGJtVnlLU0I3WEc0Z0lDQWdJQ0FnSUhKaGJtZGxMbk5sZEVWdVpDaHdMbVZ1WkVOdmJuUmhhVzVsY2l3Z2NDNWxibVJQWm1aelpYUXBPMXh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdjbUZ1WjJVdWMyVjBSVzVrS0hBdWMzUmhjblJEYjI1MFlXbHVaWElzSUhBdWMzUmhjblJQWm1aelpYUXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdjbUZ1WjJVdWMyVjBVM1JoY25Rb2NDNXpkR0Z5ZEVOdmJuUmhhVzVsY2l3Z2NDNXpkR0Z5ZEU5bVpuTmxkQ2s3WEc0Z0lDQWdJQ0J6Wld3dWNtVnRiM1psUVd4c1VtRnVaMlZ6S0NrN1hHNGdJQ0FnSUNCelpXd3VZV1JrVW1GdVoyVW9jbUZ1WjJVcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdaMWJtTjBhVzl1SUc5c1pGTmxiR1ZqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0J5WVc1blpWUnZWR1Y0ZEZKaGJtZGxLSEFwTG5ObGJHVmpkQ2dwTzF4dUlDQWdJSDFjYmx4dUlDQWdJR1oxYm1OMGFXOXVJSEJsWldzZ0tHTnZiblJsZUhRc0lHVnNLU0I3WEc0Z0lDQWdJQ0IyWVhJZ1kzVnljMjl5SUQwZ1kyOXVkR1Y0ZEM1MFpYaDBMbXhsYm1kMGFEdGNiaUFnSUNBZ0lIWmhjaUJqYjI1MFpXNTBJRDBnY21WaFpFNXZaR1VvWld3cExteGxibWQwYUR0Y2JpQWdJQ0FnSUhaaGNpQnpkVzBnUFNCamRYSnpiM0lnS3lCamIyNTBaVzUwTzF4dUlDQWdJQ0FnYVdZZ0tDRndMbk4wWVhKMFEyOXVkR0ZwYm1WeUlDWW1JSE4xYlNBK1BTQnpkR0Z5ZENrZ2UxeHVJQ0FnSUNBZ0lDQndMbk4wWVhKMFEyOXVkR0ZwYm1WeUlEMGdaV3c3WEc0Z0lDQWdJQ0FnSUhBdWMzUmhjblJQWm1aelpYUWdQU0JpYjNWdVpHVmtLSE4wWVhKMElDMGdZM1Z5YzI5eUtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lHbG1JQ2doY0M1bGJtUkRiMjUwWVdsdVpYSWdKaVlnYzNWdElENDlJR1Z1WkNrZ2UxeHVJQ0FnSUNBZ0lDQndMbVZ1WkVOdmJuUmhhVzVsY2lBOUlHVnNPMXh1SUNBZ0lDQWdJQ0J3TG1WdVpFOW1abk5sZENBOUlHSnZkVzVrWldRb1pXNWtJQzBnWTNWeWMyOXlLVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnWm5WdVkzUnBiMjRnWW05MWJtUmxaQ0FvYjJabWMyVjBLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJOWVhSb0xtMWhlQ2d3TENCTllYUm9MbTFwYmloamIyNTBaVzUwTENCdlptWnpaWFFwS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCeVpXRmtVMlZzWldOMGFXOXVSV1JwZEdGaWJHVWdLSE4wWVhSbEtTQjdYRzRnSUNBZ2RtRnlJSE5sYkNBOUlHZGxkRk5sYkdWamRHbHZiaWdwTzF4dUlDQWdJSFpoY2lCa2FYTjBZVzVqWlNBOUlIZGhiR3NvWldScGRHRmliR1V1Wm1seWMzUkRhR2xzWkN3Z2NHVmxheWs3WEc0Z0lDQWdkbUZ5SUhOMFlYSjBJRDBnWkdsemRHRnVZMlV1YzNSaGNuUWdmSHdnTUR0Y2JpQWdJQ0IyWVhJZ1pXNWtJRDBnWkdsemRHRnVZMlV1Wlc1a0lIeDhJREE3WEc1Y2JpQWdJQ0J6ZEdGMFpTNTBaWGgwSUQwZ1pHbHpkR0Z1WTJVdWRHVjRkRHRjYmx4dUlDQWdJR2xtSUNobGJtUWdQaUJ6ZEdGeWRDa2dlMXh1SUNBZ0lDQWdjM1JoZEdVdWMzUmhjblFnUFNCemRHRnlkRHRjYmlBZ0lDQWdJSE4wWVhSbExtVnVaQ0E5SUdWdVpEdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnYzNSaGRHVXVjM1JoY25RZ1BTQmxibVE3WEc0Z0lDQWdJQ0J6ZEdGMFpTNWxibVFnUFNCemRHRnlkRHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQm1kVzVqZEdsdmJpQndaV1ZySUNoamIyNTBaWGgwTENCbGJDa2dlMXh1SUNBZ0lDQWdhV1lnS0dWc0lEMDlQU0J6Wld3dVlXNWphRzl5VG05a1pTa2dlMXh1SUNBZ0lDQWdJQ0JqYjI1MFpYaDBMbk4wWVhKMElEMGdZMjl1ZEdWNGRDNTBaWGgwTG14bGJtZDBhQ0FySUhObGJDNWhibU5vYjNKUFptWnpaWFE3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JwWmlBb1pXd2dQVDA5SUhObGJDNW1iMk4xYzA1dlpHVXBJSHRjYmlBZ0lDQWdJQ0FnWTI5dWRHVjRkQzVsYm1RZ1BTQmpiMjUwWlhoMExuUmxlSFF1YkdWdVozUm9JQ3NnYzJWc0xtWnZZM1Z6VDJabWMyVjBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSGRoYkdzZ0tHVnNMQ0J3WldWckxDQmpkSGdzSUhOcFlteHBibWR6S1NCN1hHNGdJQ0FnZG1GeUlHTnZiblJsZUhRZ1BTQmpkSGdnZkh3Z2V5QjBaWGgwT2lBbkp5QjlPMXh1WEc0Z0lDQWdhV1lnS0NGbGJDa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHTnZiblJsZUhRN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnZG1GeUlHVnNUbTlrWlNBOUlHVnNMbTV2WkdWVWVYQmxJRDA5UFNBeE8xeHVJQ0FnSUhaaGNpQjBaWGgwVG05a1pTQTlJR1ZzTG01dlpHVlVlWEJsSUQwOVBTQXpPMXh1WEc0Z0lDQWdjR1ZsYXloamIyNTBaWGgwTENCbGJDazdYRzVjYmlBZ0lDQnBaaUFvZEdWNGRFNXZaR1VwSUh0Y2JpQWdJQ0FnSUdOdmJuUmxlSFF1ZEdWNGRDQXJQU0J5WldGa1RtOWtaU2hsYkNrN1hHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNobGJFNXZaR1VwSUh0Y2JpQWdJQ0FnSUdsbUlDaGxiQzV2ZFhSbGNraFVUVXd1YldGMFkyZ29jbTl3Wlc0cEtTQjdJR052Ym5SbGVIUXVkR1Y0ZENBclBTQlNaV2RGZUhBdUpERTdJSDFjYmlBZ0lDQWdJR05oYzNRb1pXd3VZMmhwYkdST2IyUmxjeWt1Wm05eVJXRmphQ2gzWVd4clEyaHBiR1J5Wlc0cE8xeHVJQ0FnSUNBZ2FXWWdLR1ZzTG05MWRHVnlTRlJOVEM1dFlYUmphQ2h5WTJ4dmMyVXBLU0I3SUdOdmJuUmxlSFF1ZEdWNGRDQXJQU0JTWldkRmVIQXVKREU3SUgxY2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0hOcFlteHBibWR6SUNFOVBTQm1ZV3h6WlNBbUppQmxiQzV1WlhoMFUybGliR2x1WnlrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhkaGJHc29aV3d1Ym1WNGRGTnBZbXhwYm1jc0lIQmxaV3NzSUdOdmJuUmxlSFFwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1kyOXVkR1Y0ZER0Y2JseHVJQ0FnSUdaMWJtTjBhVzl1SUhkaGJHdERhR2xzWkhKbGJpQW9ZMmhwYkdRcElIdGNiaUFnSUNBZ0lIZGhiR3NvWTJocGJHUXNJSEJsWldzc0lHTnZiblJsZUhRc0lHWmhiSE5sS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCeVpXRmtUbTlrWlNBb1pXd3BJSHRjYmlBZ0lDQnlaWFIxY200Z1pXd3VibTlrWlZSNWNHVWdQVDA5SURNZ1B5Qm1hWGhGVDB3b1pXd3VkR1Y0ZEVOdmJuUmxiblFnZkh3Z1pXd3VhVzV1WlhKVVpYaDBJSHg4SUNjbktTQTZJQ2NuTzF4dUlDQjlYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2MzVnlabUZqWlR0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBnZXRUZXh0IChlbCkge1xuICByZXR1cm4gZWwuaW5uZXJUZXh0IHx8IGVsLnRleHRDb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFRleHQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0cmltQ2h1bmtzID0gcmVxdWlyZSgnLi4vY2h1bmtzL3RyaW0nKTtcblxuZnVuY3Rpb24gSHRtbENodW5rcyAoKSB7XG59XG5cbkh0bWxDaHVua3MucHJvdG90eXBlLnRyaW0gPSB0cmltQ2h1bmtzO1xuXG5IdG1sQ2h1bmtzLnByb3RvdHlwZS5maW5kVGFncyA9IGZ1bmN0aW9uICgpIHtcbn07XG5cbkh0bWxDaHVua3MucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiAoKSB7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEh0bWxDaHVua3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHdyYXBwaW5nID0gcmVxdWlyZSgnLi93cmFwcGluZycpO1xuXG5mdW5jdGlvbiBibG9ja3F1b3RlIChjaHVua3MpIHtcbiAgd3JhcHBpbmcoJ2Jsb2NrcXVvdGUnLCBzdHJpbmdzLnBsYWNlaG9sZGVycy5xdW90ZSwgY2h1bmtzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9ja3F1b3RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcblxuZnVuY3Rpb24gYm9sZE9ySXRhbGljIChjaHVua3MsIHR5cGUpIHtcbiAgd3JhcHBpbmcodHlwZSA9PT0gJ2JvbGQnID8gJ3N0cm9uZycgOiAnZW0nLCBzdHJpbmdzLnBsYWNlaG9sZGVyc1t0eXBlXSwgY2h1bmtzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBib2xkT3JJdGFsaWM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHdyYXBwaW5nID0gcmVxdWlyZSgnLi93cmFwcGluZycpO1xuXG5mdW5jdGlvbiBjb2RlYmxvY2sgKGNodW5rcykge1xuICB3cmFwcGluZygncHJlPjxjb2RlJywgc3RyaW5ncy5wbGFjZWhvbGRlcnMuY29kZSwgY2h1bmtzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb2RlYmxvY2s7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHJsZWFkaW5nID0gLzxoKFsxLTZdKSggW14+XSopPz4kLztcbnZhciBydHJhaWxpbmcgPSAvXjxcXC9oKFsxLTZdKT4vO1xuXG5mdW5jdGlvbiBoZWFkaW5nIChjaHVua3MpIHtcbiAgY2h1bmtzLnRyaW0oKTtcblxuICB2YXIgdHJhaWwgPSBydHJhaWxpbmcuZXhlYyhjaHVua3MuYWZ0ZXIpO1xuICB2YXIgbGVhZCA9IHJsZWFkaW5nLmV4ZWMoY2h1bmtzLmJlZm9yZSk7XG4gIGlmIChsZWFkICYmIHRyYWlsICYmIGxlYWRbMV0gPT09IHRyYWlsWzFdKSB7XG4gICAgc3dhcCgpO1xuICB9IGVsc2Uge1xuICAgIGFkZCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3dhcCAoKSB7XG4gICAgdmFyIGxldmVsID0gcGFyc2VJbnQobGVhZFsxXSwgMTApO1xuICAgIHZhciBuZXh0ID0gbGV2ZWwgPD0gMSA/IDQgOiBsZXZlbCAtIDE7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVhZGluZywgJzxoJyArIG5leHQgKyAnPicpO1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJ0cmFpbGluZywgJzwvaCcgKyBuZXh0ICsgJz4nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZCAoKSB7XG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMuaGVhZGluZztcbiAgICB9XG4gICAgY2h1bmtzLmJlZm9yZSArPSAnPGgxPic7XG4gICAgY2h1bmtzLmFmdGVyID0gJzwvaDE+JyArIGNodW5rcy5hZnRlcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhlYWRpbmc7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGhyIChjaHVua3MpIHtcbiAgY2h1bmtzLmJlZm9yZSArPSAnXFxuPGhyPlxcbic7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSAnJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBocjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIG9uY2UgPSByZXF1aXJlKCcuLi9vbmNlJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBwYXJzZUxpbmtJbnB1dCA9IHJlcXVpcmUoJy4uL2NodW5rcy9wYXJzZUxpbmtJbnB1dCcpO1xudmFyIHJsZWFkaW5nID0gLzxhKCBbXj5dKik/PiQvO1xudmFyIHJ0cmFpbGluZyA9IC9ePFxcL2E+LztcbnZhciByaW1hZ2UgPSAvPGltZyggW14+XSopP1xcLz4kLztcblxuZnVuY3Rpb24gbGlua09ySW1hZ2VPckF0dGFjaG1lbnQgKGNodW5rcywgb3B0aW9ucykge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgdmFyIGltYWdlID0gdHlwZSA9PT0gJ2ltYWdlJztcbiAgdmFyIHJlc3VtZTtcblxuICBpZiAodHlwZSAhPT0gJ2F0dGFjaG1lbnQnKSB7XG4gICAgY2h1bmtzLnRyaW0oKTtcbiAgfVxuXG4gIGlmIChyZW1vdmFsKCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXN1bWUgPSB0aGlzLmFzeW5jKCk7XG5cbiAgb3B0aW9ucy5wcm9tcHRzLmNsb3NlKCk7XG4gIChvcHRpb25zLnByb21wdHNbdHlwZV0gfHwgb3B0aW9ucy5wcm9tcHRzLmxpbmspKG9wdGlvbnMsIG9uY2UocmVzb2x2ZWQpKTtcblxuICBmdW5jdGlvbiByZW1vdmFsICgpIHtcbiAgICBpZiAoaW1hZ2UpIHtcbiAgICAgIGlmIChyaW1hZ2UudGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocnRyYWlsaW5nLmV4ZWMoY2h1bmtzLmFmdGVyKSAmJiBybGVhZGluZy5leGVjKGNodW5rcy5iZWZvcmUpKSB7XG4gICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJsZWFkaW5nLCAnJyk7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShydHJhaWxpbmcsICcnKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmVkIChyZXN1bHQpIHtcbiAgICB2YXIgcGFydHM7XG4gICAgdmFyIGxpbmsgPSBwYXJzZUxpbmtJbnB1dChyZXN1bHQuZGVmaW5pdGlvbik7XG4gICAgaWYgKGxpbmsuaHJlZi5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlc3VtZSgpOyByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPT09ICdhdHRhY2htZW50Jykge1xuICAgICAgcGFydHMgPSBvcHRpb25zLm1lcmdlSHRtbEFuZEF0dGFjaG1lbnQoY2h1bmtzLmJlZm9yZSArIGNodW5rcy5zZWxlY3Rpb24gKyBjaHVua3MuYWZ0ZXIsIGxpbmspO1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IHBhcnRzLmJlZm9yZTtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBwYXJ0cy5zZWxlY3Rpb247XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBwYXJ0cy5hZnRlcjtcbiAgICAgIHJlc3VtZSgpO1xuICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShvcHRpb25zLnN1cmZhY2UudGV4dGFyZWEsICd3b29mbWFyay1tb2RlLWNoYW5nZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0aXRsZSA9IGxpbmsudGl0bGUgPyAnIHRpdGxlPVwiJyArIGxpbmsudGl0bGUgKyAnXCInIDogJyc7XG5cbiAgICBpZiAoaW1hZ2UpIHtcbiAgICAgIGltYWdlV3JhcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaW5rV3JhcCgpO1xuICAgIH1cblxuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzW3R5cGVdO1xuICAgIH1cbiAgICByZXN1bWUoKTtcblxuICAgIGZ1bmN0aW9uIGltYWdlV3JhcCAoKSB7XG4gICAgICBjaHVua3MuYmVmb3JlICs9ICc8aW1nIHNyYz1cIicgKyBsaW5rLmhyZWYgKyAnXCIgYWx0PVwiJztcbiAgICAgIGNodW5rcy5hZnRlciA9ICdcIicgKyB0aXRsZSArICcgLz4nICsgY2h1bmtzLmFmdGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpbmtXcmFwICgpIHtcbiAgICAgIHZhciBuYW1lcyA9IG9wdGlvbnMuY2xhc3Nlcy5pbnB1dC5saW5rcztcbiAgICAgIHZhciBjbGFzc2VzID0gbmFtZXMgPyAnIGNsYXNzPVwiJyArIG5hbWVzICsgJ1wiJyA6ICcnO1xuICAgICAgY2h1bmtzLmJlZm9yZSArPSAnPGEgaHJlZj1cIicgKyBsaW5rLmhyZWYgKyAnXCInICsgdGl0bGUgKyBjbGFzc2VzICsgJz4nO1xuICAgICAgY2h1bmtzLmFmdGVyID0gJzwvYT4nICsgY2h1bmtzLmFmdGVyO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpbmtPckltYWdlT3JBdHRhY2htZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBybGVmdHNpbmdsZSA9IC88KHVsfG9sKSggW14+XSopPz5cXHMqPGxpKCBbXj5dKik/PiQvO1xudmFyIHJyaWdodHNpbmdsZSA9IC9ePFxcL2xpPlxccyo8XFwvKHVsfG9sKT4vO1xudmFyIHJsZWZ0aXRlbSA9IC88bGkoIFtePl0qKT8+JC87XG52YXIgcnJpZ2h0aXRlbSA9IC9ePFxcL2xpKCBbXj5dKik/Pi87XG52YXIgcm9wZW4gPSAvXjwodWx8b2wpKCBbXj5dKik/PiQvO1xuXG5mdW5jdGlvbiBsaXN0IChjaHVua3MsIG9yZGVyZWQpIHtcbiAgdmFyIHRhZyA9IG9yZGVyZWQgPyAnb2wnIDogJ3VsJztcbiAgdmFyIG9saXN0ID0gJzwnICsgdGFnICsgJz4nO1xuICB2YXIgY2xpc3QgPSAnPC8nICsgdGFnICsgJz4nO1xuXG4gIGNodW5rcy50cmltKCk7XG5cbiAgaWYgKHJsZWZ0c2luZ2xlLnRlc3QoY2h1bmtzLmJlZm9yZSkgJiYgcnJpZ2h0c2luZ2xlLnRlc3QoY2h1bmtzLmFmdGVyKSkge1xuICAgIGlmICh0YWcgPT09IFJlZ0V4cC4kMSkge1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVmdHNpbmdsZSwgJycpO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnJpZ2h0c2luZ2xlLCAnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgdmFyIHVsU3RhcnQgPSBjaHVua3MuYmVmb3JlLmxhc3RJbmRleE9mKCc8dWwnKTtcbiAgdmFyIG9sU3RhcnQgPSBjaHVua3MuYmVmb3JlLmxhc3RJbmRleE9mKCc8b2wnKTtcbiAgdmFyIGNsb3NlVGFnID0gY2h1bmtzLmFmdGVyLmluZGV4T2YoJzwvdWw+Jyk7XG4gIGlmIChjbG9zZVRhZyA9PT0gLTEpIHtcbiAgICBjbG9zZVRhZyA9IGNodW5rcy5hZnRlci5pbmRleE9mKCc8L29sPicpO1xuICB9XG4gIGlmIChjbG9zZVRhZyA9PT0gLTEpIHtcbiAgICBhZGQoKTsgcmV0dXJuO1xuICB9XG4gIHZhciBvcGVuU3RhcnQgPSB1bFN0YXJ0ID4gb2xTdGFydCA/IHVsU3RhcnQgOiBvbFN0YXJ0O1xuICBpZiAob3BlblN0YXJ0ID09PSAtMSkge1xuICAgIGFkZCgpOyByZXR1cm47XG4gIH1cbiAgdmFyIG9wZW5FbmQgPSBjaHVua3MuYmVmb3JlLmluZGV4T2YoJz4nLCBvcGVuU3RhcnQpO1xuICBpZiAob3BlbkVuZCA9PT0gLTEpIHtcbiAgICBhZGQoKTsgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG9wZW5UYWcgPSBjaHVua3MuYmVmb3JlLnN1YnN0cihvcGVuU3RhcnQsIG9wZW5FbmQgLSBvcGVuU3RhcnQgKyAxKTtcbiAgaWYgKHJvcGVuLnRlc3Qob3BlblRhZykpIHtcbiAgICBpZiAodGFnICE9PSBSZWdFeHAuJDEpIHtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnN1YnN0cigwLCBvcGVuU3RhcnQpICsgJzwnICsgdGFnICsgY2h1bmtzLmJlZm9yZS5zdWJzdHIob3BlblN0YXJ0ICsgMyk7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIuc3Vic3RyKDAsIGNsb3NlVGFnKSArICc8LycgKyB0YWcgKyBjaHVua3MuYWZ0ZXIuc3Vic3RyKGNsb3NlVGFnICsgNCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChybGVmdGl0ZW0udGVzdChjaHVua3MuYmVmb3JlKSAmJiBycmlnaHRpdGVtLnRlc3QoY2h1bmtzLmFmdGVyKSkge1xuICAgICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJsZWZ0aXRlbSwgJycpO1xuICAgICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShycmlnaHRpdGVtLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGQodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkIChsaXN0KSB7XG4gICAgdmFyIG9wZW4gPSBsaXN0ID8gJycgOiBvbGlzdDtcbiAgICB2YXIgY2xvc2UgPSBsaXN0ID8gJycgOiBjbGlzdDtcblxuICAgIGNodW5rcy5iZWZvcmUgKz0gb3BlbiArICc8bGk+JztcbiAgICBjaHVua3MuYWZ0ZXIgPSAnPC9saT4nICsgY2xvc2UgKyBjaHVua3MuYWZ0ZXI7XG5cbiAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVycy5saXN0aXRlbTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB3cmFwcGluZyAodGFnLCBwbGFjZWhvbGRlciwgY2h1bmtzKSB7XG4gIHZhciBvcGVuID0gJzwnICsgdGFnO1xuICB2YXIgY2xvc2UgPSAnPC8nICsgdGFnLnJlcGxhY2UoLzwvZywgJzwvJyk7XG4gIHZhciBybGVhZGluZyA9IG5ldyBSZWdFeHAob3BlbiArICcoIFtePl0qKT8+JCcsICdpJyk7XG4gIHZhciBydHJhaWxpbmcgPSBuZXcgUmVnRXhwKCdeJyArIGNsb3NlICsgJz4nLCAnaScpO1xuICB2YXIgcm9wZW4gPSBuZXcgUmVnRXhwKG9wZW4gKyAnKCBbXj5dKik/PicsICdpZycpO1xuICB2YXIgcmNsb3NlID0gbmV3IFJlZ0V4cChjbG9zZSArICcoIFtePl0qKT8+JywgJ2lnJyk7XG5cbiAgY2h1bmtzLnRyaW0oKTtcblxuICB2YXIgdHJhaWwgPSBydHJhaWxpbmcuZXhlYyhjaHVua3MuYWZ0ZXIpO1xuICB2YXIgbGVhZCA9IHJsZWFkaW5nLmV4ZWMoY2h1bmtzLmJlZm9yZSk7XG4gIGlmIChsZWFkICYmIHRyYWlsKSB7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVhZGluZywgJycpO1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJ0cmFpbGluZywgJycpO1xuICB9IGVsc2Uge1xuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICB2YXIgb3BlbmVkID0gcm9wZW4udGVzdChjaHVua3Muc2VsZWN0aW9uKTtcbiAgICBpZiAob3BlbmVkKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJvcGVuLCAnJyk7XG4gICAgICBpZiAoIXN1cnJvdW5kZWQoY2h1bmtzLCB0YWcpKSB7XG4gICAgICAgIGNodW5rcy5iZWZvcmUgKz0gb3BlbiArICc+JztcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGNsb3NlZCA9IHJjbG9zZS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pO1xuICAgIGlmIChjbG9zZWQpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UocmNsb3NlLCAnJyk7XG4gICAgICBpZiAoIXN1cnJvdW5kZWQoY2h1bmtzLCB0YWcpKSB7XG4gICAgICAgIGNodW5rcy5hZnRlciA9IGNsb3NlICsgJz4nICsgY2h1bmtzLmFmdGVyO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3BlbmVkIHx8IGNsb3NlZCkge1xuICAgICAgcHVzaG92ZXIoKTsgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3Vycm91bmRlZChjaHVua3MsIHRhZykpIHtcbiAgICAgIGlmIChybGVhZGluZy50ZXN0KGNodW5rcy5iZWZvcmUpKSB7XG4gICAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlYWRpbmcsICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNodW5rcy5iZWZvcmUgKz0gY2xvc2UgKyAnPic7XG4gICAgICB9XG4gICAgICBpZiAocnRyYWlsaW5nLnRlc3QoY2h1bmtzLmFmdGVyKSkge1xuICAgICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShydHJhaWxpbmcsICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNodW5rcy5hZnRlciA9IG9wZW4gKyAnPicgKyBjaHVua3MuYWZ0ZXI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghY2xvc2Vib3VuZGVkKGNodW5rcywgdGFnKSkge1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2xvc2UgKyAnPicgKyBjaHVua3MuYWZ0ZXI7XG4gICAgICBjaHVua3MuYmVmb3JlICs9IG9wZW4gKyAnPic7XG4gICAgfVxuICAgIHB1c2hvdmVyKCk7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNob3ZlciAoKSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC88KFxcLyk/KFtePiBdKykoIFtePl0qKT8+L2lnLCBwdXNob3Zlck90aGVyVGFncyk7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNob3Zlck90aGVyVGFncyAoYWxsLCBjbG9zaW5nLCB0YWcsIGEsIGkpIHtcbiAgICB2YXIgYXR0cnMgPSBhIHx8ICcnO1xuICAgIHZhciBvcGVuID0gIWNsb3Npbmc7XG4gICAgdmFyIHJjbG9zZWQgPSBuZXcgUmVnRXhwKCc8XFwvJyArIHRhZy5yZXBsYWNlKC88L2csICc8LycpICsgJz4nLCAnaScpO1xuICAgIHZhciByb3BlbmVkID0gbmV3IFJlZ0V4cCgnPCcgKyB0YWcgKyAnKCBbXj5dKik/PicsICdpJyk7XG4gICAgaWYgKG9wZW4gJiYgIXJjbG9zZWQudGVzdChjaHVua3Muc2VsZWN0aW9uLnN1YnN0cihpKSkpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gKz0gJzwvJyArIHRhZyArICc+JztcbiAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKC9eKDxcXC9bXj5dKz4pLywgJyQxPCcgKyB0YWcgKyBhdHRycyArICc+Jyk7XG4gICAgfVxuXG4gICAgaWYgKGNsb3NpbmcgJiYgIXJvcGVuZWQudGVzdChjaHVua3Muc2VsZWN0aW9uLnN1YnN0cigwLCBpKSkpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSAnPCcgKyB0YWcgKyBhdHRycyArICc+JyArIGNodW5rcy5zZWxlY3Rpb247XG4gICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKC8oPFtePl0rKD86IFtePl0qKT8+KSQvLCAnPC8nICsgdGFnICsgJz4kMScpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjbG9zZWJvdW5kZWQgKGNodW5rcywgdGFnKSB7XG4gIHZhciByY2xvc2VsZWZ0ID0gbmV3IFJlZ0V4cCgnPC8nICsgdGFnLnJlcGxhY2UoLzwvZywgJzwvJykgKyAnPiQnLCAnaScpO1xuICB2YXIgcm9wZW5yaWdodCA9IG5ldyBSZWdFeHAoJ148JyArIHRhZyArICcoPzogW14+XSopPz4nLCAnaScpO1xuICB2YXIgYm91bmRlZCA9IHJjbG9zZWxlZnQudGVzdChjaHVua3MuYmVmb3JlKSAmJiByb3BlbnJpZ2h0LnRlc3QoY2h1bmtzLmFmdGVyKTtcbiAgaWYgKGJvdW5kZWQpIHtcbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJjbG9zZWxlZnQsICcnKTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShyb3BlbnJpZ2h0LCAnJyk7XG4gIH1cbiAgcmV0dXJuIGJvdW5kZWQ7XG59XG5cbmZ1bmN0aW9uIHN1cnJvdW5kZWQgKGNodW5rcywgdGFnKSB7XG4gIHZhciByb3BlbiA9IG5ldyBSZWdFeHAoJzwnICsgdGFnICsgJyg/OiBbXj5dKik/PicsICdpZycpO1xuICB2YXIgcmNsb3NlID0gbmV3IFJlZ0V4cCgnPFxcLycgKyB0YWcucmVwbGFjZSgvPC9nLCAnPC8nKSArICc+JywgJ2lnJyk7XG4gIHZhciBvcGVuc0JlZm9yZSA9IGNvdW50KGNodW5rcy5iZWZvcmUsIHJvcGVuKTtcbiAgdmFyIG9wZW5zQWZ0ZXIgPSBjb3VudChjaHVua3MuYWZ0ZXIsIHJvcGVuKTtcbiAgdmFyIGNsb3Nlc0JlZm9yZSA9IGNvdW50KGNodW5rcy5iZWZvcmUsIHJjbG9zZSk7XG4gIHZhciBjbG9zZXNBZnRlciA9IGNvdW50KGNodW5rcy5hZnRlciwgcmNsb3NlKTtcbiAgdmFyIG9wZW4gPSBvcGVuc0JlZm9yZSAtIGNsb3Nlc0JlZm9yZSA+IDA7XG4gIHZhciBjbG9zZSA9IGNsb3Nlc0FmdGVyIC0gb3BlbnNBZnRlciA+IDA7XG4gIHJldHVybiBvcGVuICYmIGNsb3NlO1xuXG4gIGZ1bmN0aW9uIGNvdW50ICh0ZXh0LCByZWdleCkge1xuICAgIHZhciBtYXRjaCA9IHRleHQubWF0Y2gocmVnZXgpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgcmV0dXJuIG1hdGNoLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3cmFwcGluZztcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaXNWaXNpYmxlRWxlbWVudCAoZWxlbSkge1xuICBpZiAoZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICByZXR1cm4gZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpICE9PSAnbm9uZSc7XG4gIH0gZWxzZSBpZiAoZWxlbS5jdXJyZW50U3R5bGUpIHtcbiAgICByZXR1cm4gZWxlbS5jdXJyZW50U3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNWaXNpYmxlRWxlbWVudDtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5cGMxWnBjMmxpYkdWRmJHVnRaVzUwTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVpuVnVZM1JwYjI0Z2FYTldhWE5wWW14bFJXeGxiV1Z1ZENBb1pXeGxiU2tnZTF4dUlDQnBaaUFvWjJ4dlltRnNMbWRsZEVOdmJYQjFkR1ZrVTNSNWJHVXBJSHRjYmlBZ0lDQnlaWFIxY200Z1oyeHZZbUZzTG1kbGRFTnZiWEIxZEdWa1UzUjViR1VvWld4bGJTd2diblZzYkNrdVoyVjBVSEp2Y0dWeWRIbFdZV3gxWlNnblpHbHpjR3hoZVNjcElDRTlQU0FuYm05dVpTYzdYRzRnSUgwZ1pXeHpaU0JwWmlBb1pXeGxiUzVqZFhKeVpXNTBVM1I1YkdVcElIdGNiaUFnSUNCeVpYUjFjbTRnWld4bGJTNWpkWEp5Wlc1MFUzUjViR1V1WkdsemNHeGhlU0FoUFQwZ0oyNXZibVVuTzF4dUlDQjlYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2FYTldhWE5wWW14bFJXeGxiV1Z1ZER0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBtYW55ICh0ZXh0LCB0aW1lcykge1xuICByZXR1cm4gbmV3IEFycmF5KHRpbWVzICsgMSkuam9pbih0ZXh0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYW55O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWFueSA9IHJlcXVpcmUoJy4uL21hbnknKTtcbnZhciBleHRlbmRSZWdFeHAgPSByZXF1aXJlKCcuLi9leHRlbmRSZWdFeHAnKTtcbnZhciB0cmltQ2h1bmtzID0gcmVxdWlyZSgnLi4vY2h1bmtzL3RyaW0nKTtcbnZhciByZSA9IFJlZ0V4cDtcblxuZnVuY3Rpb24gTWFya2Rvd25DaHVua3MgKCkge1xufVxuXG5NYXJrZG93bkNodW5rcy5wcm90b3R5cGUudHJpbSA9IHRyaW1DaHVua3M7XG5cbk1hcmtkb3duQ2h1bmtzLnByb3RvdHlwZS5maW5kVGFncyA9IGZ1bmN0aW9uIChzdGFydFJlZ2V4LCBlbmRSZWdleCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciByZWdleDtcblxuICBpZiAoc3RhcnRSZWdleCkge1xuICAgIHJlZ2V4ID0gZXh0ZW5kUmVnRXhwKHN0YXJ0UmVnZXgsICcnLCAnJCcpO1xuICAgIHRoaXMuYmVmb3JlID0gdGhpcy5iZWZvcmUucmVwbGFjZShyZWdleCwgc3RhcnRSZXBsYWNlcik7XG4gICAgcmVnZXggPSBleHRlbmRSZWdFeHAoc3RhcnRSZWdleCwgJ14nLCAnJyk7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5yZXBsYWNlKHJlZ2V4LCBzdGFydFJlcGxhY2VyKTtcbiAgfVxuXG4gIGlmIChlbmRSZWdleCkge1xuICAgIHJlZ2V4ID0gZXh0ZW5kUmVnRXhwKGVuZFJlZ2V4LCAnJywgJyQnKTtcbiAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLnJlcGxhY2UocmVnZXgsIGVuZFJlcGxhY2VyKTtcbiAgICByZWdleCA9IGV4dGVuZFJlZ0V4cChlbmRSZWdleCwgJ14nLCAnJyk7XG4gICAgdGhpcy5hZnRlciA9IHRoaXMuYWZ0ZXIucmVwbGFjZShyZWdleCwgZW5kUmVwbGFjZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRSZXBsYWNlciAobWF0Y2gpIHtcbiAgICBzZWxmLnN0YXJ0VGFnID0gc2VsZi5zdGFydFRhZyArIG1hdGNoOyByZXR1cm4gJyc7XG4gIH1cblxuICBmdW5jdGlvbiBlbmRSZXBsYWNlciAobWF0Y2gpIHtcbiAgICBzZWxmLmVuZFRhZyA9IG1hdGNoICsgc2VsZi5lbmRUYWc7IHJldHVybiAnJztcbiAgfVxufTtcblxuTWFya2Rvd25DaHVua3MucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBiZWZvcmVDb3VudCA9ICdiZWZvcmUnIGluIG8gPyBvLmJlZm9yZSA6IDE7XG4gIHZhciBhZnRlckNvdW50ID0gJ2FmdGVyJyBpbiBvID8gby5hZnRlciA6IDE7XG5cbiAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5yZXBsYWNlKC8oXlxcbiopLywgJycpO1xuICB0aGlzLnN0YXJ0VGFnID0gdGhpcy5zdGFydFRhZyArIHJlLiQxO1xuICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLnJlcGxhY2UoLyhcXG4qJCkvLCAnJyk7XG4gIHRoaXMuZW5kVGFnID0gdGhpcy5lbmRUYWcgKyByZS4kMTtcbiAgdGhpcy5zdGFydFRhZyA9IHRoaXMuc3RhcnRUYWcucmVwbGFjZSgvKF5cXG4qKS8sICcnKTtcbiAgdGhpcy5iZWZvcmUgPSB0aGlzLmJlZm9yZSArIHJlLiQxO1xuICB0aGlzLmVuZFRhZyA9IHRoaXMuZW5kVGFnLnJlcGxhY2UoLyhcXG4qJCkvLCAnJyk7XG4gIHRoaXMuYWZ0ZXIgPSB0aGlzLmFmdGVyICsgcmUuJDE7XG5cbiAgaWYgKHRoaXMuYmVmb3JlKSB7XG4gICAgdGhpcy5iZWZvcmUgPSByZXBsYWNlKHRoaXMuYmVmb3JlLCArK2JlZm9yZUNvdW50LCAnJCcpO1xuICB9XG5cbiAgaWYgKHRoaXMuYWZ0ZXIpIHtcbiAgICB0aGlzLmFmdGVyID0gcmVwbGFjZSh0aGlzLmFmdGVyLCArK2FmdGVyQ291bnQsICcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UgKHRleHQsIGNvdW50LCBzdWZmaXgpIHtcbiAgICB2YXIgcmVnZXggPSBvLmFueSA/ICdcXFxcbionIDogbWFueSgnXFxcXG4/JywgY291bnQpO1xuICAgIHZhciByZXBsYWNlbWVudCA9IG1hbnkoJ1xcbicsIGNvdW50KTtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKG5ldyByZShyZWdleCArIHN1ZmZpeCksIHJlcGxhY2VtZW50KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZG93bkNodW5rcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgd3JhcHBpbmcgPSByZXF1aXJlKCcuL3dyYXBwaW5nJyk7XG52YXIgc2V0dGluZ3MgPSByZXF1aXJlKCcuL3NldHRpbmdzJyk7XG52YXIgcnRyYWlsYmxhbmtsaW5lID0gLyg+WyBcXHRdKikkLztcbnZhciBybGVhZGJsYW5rbGluZSA9IC9eKD5bIFxcdF0qKS87XG52YXIgcm5ld2xpbmVmZW5jaW5nID0gL14oXFxuKikoW15cXHJdKz8pKFxcbiopJC87XG52YXIgcmVuZHRhZyA9IC9eKCgoXFxufF4pKFxcblsgXFx0XSopKj4oLitcXG4pKi4qKSsoXFxuWyBcXHRdKikqKS87XG52YXIgcmxlYWRicmFja2V0ID0gL15cXG4oKD58XFxzKSopXFxuLztcbnZhciBydHJhaWxicmFja2V0ID0gL1xcbigoPnxcXHMpKilcXG4kLztcblxuZnVuY3Rpb24gYmxvY2txdW90ZSAoY2h1bmtzKSB7XG4gIHZhciBtYXRjaCA9ICcnO1xuICB2YXIgbGVmdE92ZXIgPSAnJztcbiAgdmFyIGxpbmU7XG5cbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShybmV3bGluZWZlbmNpbmcsIG5ld2xpbmVyZXBsYWNlcik7XG4gIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocnRyYWlsYmxhbmtsaW5lLCB0cmFpbGJsYW5rbGluZXJlcGxhY2VyKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXihcXHN8PikrJC8sICcnKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24gfHwgc3RyaW5ncy5wbGFjZWhvbGRlcnMucXVvdGU7XG5cbiAgaWYgKGNodW5rcy5iZWZvcmUpIHtcbiAgICBiZWZvcmVQcm9jZXNzaW5nKCk7XG4gIH1cblxuICBjaHVua3Muc3RhcnRUYWcgPSBtYXRjaDtcbiAgY2h1bmtzLmJlZm9yZSA9IGxlZnRPdmVyO1xuXG4gIGlmIChjaHVua3MuYWZ0ZXIpIHtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZSgvXlxcbj8vLCAnXFxuJyk7XG4gIH1cblxuICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShyZW5kdGFnLCBlbmR0YWdyZXBsYWNlcik7XG5cbiAgaWYgKC9eKD8hWyBdezAsM30+KS9tLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICB3cmFwcGluZy53cmFwKGNodW5rcywgc2V0dGluZ3MubGluZUxlbmd0aCAtIDIpO1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL14vZ20sICc+ICcpO1xuICAgIHJlcGxhY2VCbGFua3NJblRhZ3ModHJ1ZSk7XG4gICAgY2h1bmtzLnNraXAoKTtcbiAgfSBlbHNlIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9eWyBdezAsM30+ID8vZ20sICcnKTtcbiAgICB3cmFwcGluZy51bndyYXAoY2h1bmtzKTtcbiAgICByZXBsYWNlQmxhbmtzSW5UYWdzKGZhbHNlKTtcblxuICAgIGlmICghL14oXFxufF4pWyBdezAsM30+Ly50ZXN0KGNodW5rcy5zZWxlY3Rpb24pICYmIGNodW5rcy5zdGFydFRhZykge1xuICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLnN0YXJ0VGFnLnJlcGxhY2UoL1xcbnswLDJ9JC8sICdcXG5cXG4nKTtcbiAgICB9XG5cbiAgICBpZiAoIS8oXFxufF4pWyBdezAsM30+LiokLy50ZXN0KGNodW5rcy5zZWxlY3Rpb24pICYmIGNodW5rcy5lbmRUYWcpIHtcbiAgICAgIGNodW5rcy5lbmRUYWcgPSBjaHVua3MuZW5kVGFnLnJlcGxhY2UoL15cXG57MCwyfS8sICdcXG5cXG4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIS9cXG4vLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJsZWFkYmxhbmtsaW5lLCBsZWFkYmxhbmtsaW5lcmVwbGFjZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gbmV3bGluZXJlcGxhY2VyIChhbGwsIGJlZm9yZSwgdGV4dCwgYWZ0ZXIpIHtcbiAgICBjaHVua3MuYmVmb3JlICs9IGJlZm9yZTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBhZnRlciArIGNodW5rcy5hZnRlcjtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsYmxhbmtsaW5lcmVwbGFjZXIgKGFsbCwgYmxhbmspIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gYmxhbmsgKyBjaHVua3Muc2VsZWN0aW9uOyByZXR1cm4gJyc7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkYmxhbmtsaW5lcmVwbGFjZXIgKGFsbCwgYmxhbmtzKSB7XG4gICAgY2h1bmtzLnN0YXJ0VGFnICs9IGJsYW5rczsgcmV0dXJuICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gYmVmb3JlUHJvY2Vzc2luZyAoKSB7XG4gICAgdmFyIGxpbmVzID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKC9cXG4kLywgJycpLnNwbGl0KCdcXG4nKTtcbiAgICB2YXIgY2hhaW5lZCA9IGZhbHNlO1xuICAgIHZhciBnb29kO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgZ29vZCA9IGZhbHNlO1xuICAgICAgbGluZSA9IGxpbmVzW2ldO1xuICAgICAgY2hhaW5lZCA9IGNoYWluZWQgJiYgbGluZS5sZW5ndGggPiAwO1xuICAgICAgaWYgKC9ePi8udGVzdChsaW5lKSkge1xuICAgICAgICBnb29kID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFjaGFpbmVkICYmIGxpbmUubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGNoYWluZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKC9eWyBcXHRdKiQvLnRlc3QobGluZSkpIHtcbiAgICAgICAgZ29vZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnb29kID0gY2hhaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChnb29kKSB7XG4gICAgICAgIG1hdGNoICs9IGxpbmUgKyAnXFxuJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlZnRPdmVyICs9IG1hdGNoICsgbGluZTtcbiAgICAgICAgbWF0Y2ggPSAnXFxuJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIS8oXnxcXG4pPi8udGVzdChtYXRjaCkpIHtcbiAgICAgIGxlZnRPdmVyICs9IG1hdGNoO1xuICAgICAgbWF0Y2ggPSAnJztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbmR0YWdyZXBsYWNlciAoYWxsKSB7XG4gICAgY2h1bmtzLmVuZFRhZyA9IGFsbDsgcmV0dXJuICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZUJsYW5rc0luVGFncyAoYnJhY2tldCkge1xuICAgIHZhciByZXBsYWNlbWVudCA9IGJyYWNrZXQgPyAnPiAnIDogJyc7XG5cbiAgICBpZiAoY2h1bmtzLnN0YXJ0VGFnKSB7XG4gICAgICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3Muc3RhcnRUYWcucmVwbGFjZShydHJhaWxicmFja2V0LCByZXBsYWNlcik7XG4gICAgfVxuICAgIGlmIChjaHVua3MuZW5kVGFnKSB7XG4gICAgICBjaHVua3MuZW5kVGFnID0gY2h1bmtzLmVuZFRhZy5yZXBsYWNlKHJsZWFkYnJhY2tldCwgcmVwbGFjZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyIChhbGwsIG1hcmtkb3duKSB7XG4gICAgICByZXR1cm4gJ1xcbicgKyBtYXJrZG93bi5yZXBsYWNlKC9eWyBdezAsM30+P1sgXFx0XSokL2dtLCByZXBsYWNlbWVudCkgKyAnXFxuJztcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9ja3F1b3RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmxlYWRpbmcgPSAvXihcXCoqKS87XG52YXIgcnRyYWlsaW5nID0gLyhcXCoqJCkvO1xudmFyIHJ0cmFpbGluZ3NwYWNlID0gLyhcXHM/KSQvO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG5cbmZ1bmN0aW9uIGJvbGRPckl0YWxpYyAoY2h1bmtzLCB0eXBlKSB7XG4gIHZhciBybmV3bGluZXMgPSAvXFxuezIsfS9nO1xuICB2YXIgc3RhckNvdW50ID0gdHlwZSA9PT0gJ2JvbGQnID8gMiA6IDE7XG5cbiAgY2h1bmtzLnRyaW0oKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShybmV3bGluZXMsICdcXG4nKTtcblxuICB2YXIgbWFya3VwO1xuICB2YXIgbGVhZFN0YXJzID0gcnRyYWlsaW5nLmV4ZWMoY2h1bmtzLmJlZm9yZSlbMF07XG4gIHZhciB0cmFpbFN0YXJzID0gcmxlYWRpbmcuZXhlYyhjaHVua3MuYWZ0ZXIpWzBdO1xuICB2YXIgc3RhcnMgPSAnXFxcXCp7JyArIHN0YXJDb3VudCArICd9JztcbiAgdmFyIGZlbmNlID0gTWF0aC5taW4obGVhZFN0YXJzLmxlbmd0aCwgdHJhaWxTdGFycy5sZW5ndGgpO1xuICBpZiAoZmVuY2UgPj0gc3RhckNvdW50ICYmIChmZW5jZSAhPT0gMiB8fCBzdGFyQ291bnQgIT09IDEpKSB7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShuZXcgUmVnRXhwKHN0YXJzICsgJyQnLCAnJyksICcnKTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShuZXcgUmVnRXhwKCdeJyArIHN0YXJzLCAnJyksICcnKTtcbiAgfSBlbHNlIGlmICghY2h1bmtzLnNlbGVjdGlvbiAmJiB0cmFpbFN0YXJzKSB7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocmxlYWRpbmcsICcnKTtcbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJ0cmFpbGluZ3NwYWNlLCAnJykgKyB0cmFpbFN0YXJzICsgUmVnRXhwLiQxO1xuICB9IGVsc2Uge1xuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbiAmJiAhdHJhaWxTdGFycykge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzW3R5cGVdO1xuICAgIH1cblxuICAgIG1hcmt1cCA9IHN0YXJDb3VudCA9PT0gMSA/ICcqJyA6ICcqKic7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUgKyBtYXJrdXA7XG4gICAgY2h1bmtzLmFmdGVyID0gbWFya3VwICsgY2h1bmtzLmFmdGVyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYm9sZE9ySXRhbGljO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBydGV4dGJlZm9yZSA9IC9cXFNbIF0qJC87XG52YXIgcnRleHRhZnRlciA9IC9eWyBdKlxcUy87XG52YXIgcm5ld2xpbmUgPSAvXFxuLztcbnZhciByYmFja3RpY2sgPSAvYC87XG52YXIgcmZlbmNlYmVmb3JlID0gL2BgYFthLXpdKlxcbj8kLztcbnZhciByZmVuY2ViZWZvcmVpbnNpZGUgPSAvXmBgYFthLXpdKlxcbi87XG52YXIgcmZlbmNlYWZ0ZXIgPSAvXlxcbj9gYGAvO1xudmFyIHJmZW5jZWFmdGVyaW5zaWRlID0gL1xcbmBgYCQvO1xuXG5mdW5jdGlvbiBjb2RlYmxvY2sgKGNodW5rcywgb3B0aW9ucykge1xuICB2YXIgbmV3bGluZWQgPSBybmV3bGluZS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pO1xuICB2YXIgdHJhaWxpbmcgPSBydGV4dGFmdGVyLnRlc3QoY2h1bmtzLmFmdGVyKTtcbiAgdmFyIGxlYWRpbmcgPSBydGV4dGJlZm9yZS50ZXN0KGNodW5rcy5iZWZvcmUpO1xuICB2YXIgb3V0ZmVuY2VkID0gcmZlbmNlYmVmb3JlLnRlc3QoY2h1bmtzLmJlZm9yZSkgJiYgcmZlbmNlYWZ0ZXIudGVzdChjaHVua3MuYWZ0ZXIpO1xuICBpZiAob3V0ZmVuY2VkIHx8IG5ld2xpbmVkIHx8ICEobGVhZGluZyB8fCB0cmFpbGluZykpIHtcbiAgICBibG9jayhvdXRmZW5jZWQpO1xuICB9IGVsc2Uge1xuICAgIGlubGluZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5saW5lICgpIHtcbiAgICBjaHVua3MudHJpbSgpO1xuICAgIGNodW5rcy5maW5kVGFncyhyYmFja3RpY2ssIHJiYWNrdGljayk7XG5cbiAgICBpZiAoIWNodW5rcy5zdGFydFRhZyAmJiAhY2h1bmtzLmVuZFRhZykge1xuICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLmVuZFRhZyA9ICdgJztcbiAgICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMuY29kZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNodW5rcy5lbmRUYWcgJiYgIWNodW5rcy5zdGFydFRhZykge1xuICAgICAgY2h1bmtzLmJlZm9yZSArPSBjaHVua3MuZW5kVGFnO1xuICAgICAgY2h1bmtzLmVuZFRhZyA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3MuZW5kVGFnID0gJyc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2sgKG91dGZlbmNlZCkge1xuICAgIGlmIChvdXRmZW5jZWQpIHtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmZlbmNlYmVmb3JlLCAnJyk7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShyZmVuY2VhZnRlciwgJycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UoL1sgXXs0fXxgYGBbYS16XSpcXG4kLywgbWVyZ2VTZWxlY3Rpb24pO1xuICAgIGNodW5rcy5za2lwKHtcbiAgICAgIGJlZm9yZTogLyhcXG58XikoXFx0fFsgXXs0LH18YGBgW2Etel0qXFxuKS4qXFxuJC8udGVzdChjaHVua3MuYmVmb3JlKSA/IDAgOiAxLFxuICAgICAgYWZ0ZXI6IC9eXFxuKFxcdHxbIF17NCx9fFxcbmBgYCkvLnRlc3QoY2h1bmtzLmFmdGVyKSA/IDAgOiAxXG4gICAgfSk7XG5cbiAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgIGlmIChvcHRpb25zLmZlbmNpbmcpIHtcbiAgICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gJ2BgYFxcbic7XG4gICAgICAgIGNodW5rcy5lbmRUYWcgPSAnXFxuYGBgJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNodW5rcy5zdGFydFRhZyA9ICcgICAgJztcbiAgICAgIH1cbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVycy5jb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmZlbmNlYmVmb3JlaW5zaWRlLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikgJiYgcmZlbmNlYWZ0ZXJpbnNpZGUudGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC8oXmBgYFthLXpdKlxcbil8KGBgYCQpL2csICcnKTtcbiAgICAgIH0gZWxzZSBpZiAoL15bIF17MCwzfVxcUy9tLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZmVuY2luZykge1xuICAgICAgICAgIGNodW5rcy5iZWZvcmUgKz0gJ2BgYFxcbic7XG4gICAgICAgICAgY2h1bmtzLmFmdGVyID0gJ1xcbmBgYCcgKyBjaHVua3MuYWZ0ZXI7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3bGluZWQpIHtcbiAgICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9eL2dtLCAnICAgICcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNodW5rcy5iZWZvcmUgKz0gJyAgICAnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9eKD86WyBdezR9fFsgXXswLDN9XFx0fGBgYFthLXpdKikvZ20sICcnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZVNlbGVjdGlvbiAoYWxsKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gYWxsICsgY2h1bmtzLnNlbGVjdGlvbjsgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvZGVibG9jaztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hbnkgPSByZXF1aXJlKCcuLi9tYW55Jyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcblxuZnVuY3Rpb24gaGVhZGluZyAoY2h1bmtzKSB7XG4gIHZhciBsZXZlbCA9IDA7XG5cbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb25cbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgLnJlcGxhY2UoLyheXFxzK3xcXHMrJCkvZywgJycpO1xuXG4gIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgIGNodW5rcy5zdGFydFRhZyA9ICcjICc7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmhlYWRpbmc7XG4gICAgY2h1bmtzLmVuZFRhZyA9ICcnO1xuICAgIGNodW5rcy5za2lwKHsgYmVmb3JlOiAxLCBhZnRlcjogMSB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjaHVua3MuZmluZFRhZ3MoLyMrWyBdKi8sIC9bIF0qIysvKTtcblxuICBpZiAoLyMrLy50ZXN0KGNodW5rcy5zdGFydFRhZykpIHtcbiAgICBsZXZlbCA9IFJlZ0V4cC5sYXN0TWF0Y2gubGVuZ3RoO1xuICB9XG5cbiAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLmVuZFRhZyA9ICcnO1xuICBjaHVua3MuZmluZFRhZ3MobnVsbCwgL1xccz8oLSt8PSspLyk7XG5cbiAgaWYgKC89Ky8udGVzdChjaHVua3MuZW5kVGFnKSkge1xuICAgIGxldmVsID0gMTtcbiAgfVxuXG4gIGlmICgvLSsvLnRlc3QoY2h1bmtzLmVuZFRhZykpIHtcbiAgICBsZXZlbCA9IDI7XG4gIH1cblxuICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3MuZW5kVGFnID0gJyc7XG4gIGNodW5rcy5za2lwKHsgYmVmb3JlOiAxLCBhZnRlcjogMSB9KTtcblxuICB2YXIgbGV2ZWxUb0NyZWF0ZSA9IGxldmVsIDwgMiA/IDQgOiBsZXZlbCAtIDE7XG4gIGlmIChsZXZlbFRvQ3JlYXRlID4gMCkge1xuICAgIGNodW5rcy5zdGFydFRhZyA9IG1hbnkoJyMnLCBsZXZlbFRvQ3JlYXRlKSArICcgJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhlYWRpbmc7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGhyIChjaHVua3MpIHtcbiAgY2h1bmtzLnN0YXJ0VGFnID0gJy0tLS0tLS0tLS1cXG4nO1xuICBjaHVua3Muc2VsZWN0aW9uID0gJyc7XG4gIGNodW5rcy5za2lwKHsgbGVmdDogMiwgcmlnaHQ6IDEsIGFueTogdHJ1ZSB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBocjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9uY2UgPSByZXF1aXJlKCcuLi9vbmNlJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBwYXJzZUxpbmtJbnB1dCA9IHJlcXVpcmUoJy4uL2NodW5rcy9wYXJzZUxpbmtJbnB1dCcpO1xudmFyIHJkZWZpbml0aW9ucyA9IC9eWyBdezAsM31cXFsoKD86YXR0YWNobWVudC0pP1xcZCspXFxdOlsgXFx0XSpcXG4/WyBcXHRdKjw/KFxcUys/KT4/WyBcXHRdKlxcbj9bIFxcdF0qKD86KFxcbiopW1wiKF0oLis/KVtcIildWyBcXHRdKik/KD86XFxuK3wkKS9nbTtcbnZhciByYXR0YWNobWVudCA9IC9eYXR0YWNobWVudC0oXFxkKykkL2k7XG5cbmZ1bmN0aW9uIGV4dHJhY3REZWZpbml0aW9ucyAodGV4dCwgZGVmaW5pdGlvbnMpIHtcbiAgcmRlZmluaXRpb25zLmxhc3RJbmRleCA9IDA7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UocmRlZmluaXRpb25zLCByZXBsYWNlcik7XG5cbiAgZnVuY3Rpb24gcmVwbGFjZXIgKGFsbCwgaWQsIGxpbmssIG5ld2xpbmVzLCB0aXRsZSkge1xuICAgIGRlZmluaXRpb25zW2lkXSA9IGFsbC5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbiAgICBpZiAobmV3bGluZXMpIHtcbiAgICAgIGRlZmluaXRpb25zW2lkXSA9IGFsbC5yZXBsYWNlKC9bXCIoXSguKz8pW1wiKV0kLywgJycpO1xuICAgICAgcmV0dXJuIG5ld2xpbmVzICsgdGl0bGU7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBwdXNoRGVmaW5pdGlvbiAoY2h1bmtzLCBkZWZpbml0aW9uLCBhdHRhY2htZW50KSB7XG4gIHZhciByZWdleCA9IC8oXFxbKSgoPzpcXFtbXlxcXV0qXFxdfFteXFxbXFxdXSkqKShcXF1bIF0/KD86XFxuWyBdKik/XFxbKSgoPzphdHRhY2htZW50LSk/XFxkKykoXFxdKS9nO1xuICB2YXIgYW5jaG9yID0gMDtcbiAgdmFyIGRlZmluaXRpb25zID0ge307XG4gIHZhciBmb290bm90ZXMgPSBbXTtcblxuICBjaHVua3MuYmVmb3JlID0gZXh0cmFjdERlZmluaXRpb25zKGNodW5rcy5iZWZvcmUsIGRlZmluaXRpb25zKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGV4dHJhY3REZWZpbml0aW9ucyhjaHVua3Muc2VsZWN0aW9uLCBkZWZpbml0aW9ucyk7XG4gIGNodW5rcy5hZnRlciA9IGV4dHJhY3REZWZpbml0aW9ucyhjaHVua3MuYWZ0ZXIsIGRlZmluaXRpb25zKTtcbiAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShyZWdleCwgZ2V0TGluayk7XG5cbiAgaWYgKGRlZmluaXRpb24pIHtcbiAgICBpZiAoIWF0dGFjaG1lbnQpIHsgcHVzaEFuY2hvcihkZWZpbml0aW9uKTsgfVxuICB9IGVsc2Uge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UocmVnZXgsIGdldExpbmspO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IGFuY2hvcjtcblxuICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShyZWdleCwgZ2V0TGluayk7XG5cbiAgaWYgKGNodW5rcy5hZnRlcikge1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKC9cXG4qJC8sICcnKTtcbiAgfVxuICBpZiAoIWNodW5rcy5hZnRlcikge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL1xcbiokLywgJycpO1xuICB9XG5cbiAgYW5jaG9yID0gMDtcbiAgT2JqZWN0LmtleXMoZGVmaW5pdGlvbnMpLmZvckVhY2gocHVzaEF0dGFjaG1lbnRzKTtcblxuICBpZiAoYXR0YWNobWVudCkge1xuICAgIHB1c2hBbmNob3IoZGVmaW5pdGlvbik7XG4gIH1cbiAgY2h1bmtzLmFmdGVyICs9ICdcXG5cXG4nICsgZm9vdG5vdGVzLmpvaW4oJ1xcbicpO1xuXG4gIHJldHVybiByZXN1bHQ7XG5cbiAgZnVuY3Rpb24gcHVzaEF0dGFjaG1lbnRzIChkZWZpbml0aW9uKSB7XG4gICAgaWYgKHJhdHRhY2htZW50LnRlc3QoZGVmaW5pdGlvbikpIHtcbiAgICAgIHB1c2hBbmNob3IoZGVmaW5pdGlvbnNbZGVmaW5pdGlvbl0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2hBbmNob3IgKGRlZmluaXRpb24pIHtcbiAgICBhbmNob3IrKztcbiAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbi5yZXBsYWNlKC9eWyBdezAsM31cXFsoYXR0YWNobWVudC0pPyhcXGQrKVxcXTovLCAnICBbJDEnICsgYW5jaG9yICsgJ106Jyk7XG4gICAgZm9vdG5vdGVzLnB1c2goZGVmaW5pdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMaW5rIChhbGwsIGJlZm9yZSwgaW5uZXIsIGFmdGVySW5uZXIsIGRlZmluaXRpb24sIGVuZCkge1xuICAgIGlubmVyID0gaW5uZXIucmVwbGFjZShyZWdleCwgZ2V0TGluayk7XG4gICAgaWYgKGRlZmluaXRpb25zW2RlZmluaXRpb25dKSB7XG4gICAgICBwdXNoQW5jaG9yKGRlZmluaXRpb25zW2RlZmluaXRpb25dKTtcbiAgICAgIHJldHVybiBiZWZvcmUgKyBpbm5lciArIGFmdGVySW5uZXIgKyBhbmNob3IgKyBlbmQ7XG4gICAgfVxuICAgIHJldHVybiBhbGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gbGlua09ySW1hZ2VPckF0dGFjaG1lbnQgKGNodW5rcywgb3B0aW9ucykge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgdmFyIGltYWdlID0gdHlwZSA9PT0gJ2ltYWdlJztcbiAgdmFyIHJlc3VtZTtcblxuICBjaHVua3MudHJpbSgpO1xuICBjaHVua3MuZmluZFRhZ3MoL1xccyohP1xcWy8sIC9cXF1bIF0/KD86XFxuWyBdKik/KFxcWy4qP1xcXSk/Lyk7XG5cbiAgaWYgKGNodW5rcy5lbmRUYWcubGVuZ3RoID4gMSAmJiBjaHVua3Muc3RhcnRUYWcubGVuZ3RoID4gMCkge1xuICAgIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5zdGFydFRhZy5yZXBsYWNlKC8hP1xcWy8sICcnKTtcbiAgICBjaHVua3MuZW5kVGFnID0gJyc7XG4gICAgcHVzaERlZmluaXRpb24oY2h1bmtzKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnN0YXJ0VGFnICsgY2h1bmtzLnNlbGVjdGlvbiArIGNodW5rcy5lbmRUYWc7XG4gIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5lbmRUYWcgPSAnJztcblxuICBpZiAoL1xcblxcbi8udGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgIHB1c2hEZWZpbml0aW9uKGNodW5rcyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJlc3VtZSA9IHRoaXMuYXN5bmMoKTtcblxuICBvcHRpb25zLnByb21wdHMuY2xvc2UoKTtcbiAgKG9wdGlvbnMucHJvbXB0c1t0eXBlXSB8fCBvcHRpb25zLnByb21wdHMubGluaykob3B0aW9ucywgb25jZShyZXNvbHZlZCkpO1xuXG4gIGZ1bmN0aW9uIHJlc29sdmVkIChyZXN1bHQpIHtcbiAgICB2YXIgbGluayA9IHBhcnNlTGlua0lucHV0KHJlc3VsdC5kZWZpbml0aW9uKTtcbiAgICBpZiAobGluay5ocmVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVzdW1lKCk7IHJldHVybjtcbiAgICB9XG5cbiAgICBjaHVua3Muc2VsZWN0aW9uID0gKCcgJyArIGNodW5rcy5zZWxlY3Rpb24pLnJlcGxhY2UoLyhbXlxcXFxdKD86XFxcXFxcXFwpKikoPz1bW1xcXV0pL2csICckMVxcXFwnKS5zdWJzdHIoMSk7XG5cbiAgICB2YXIga2V5ID0gcmVzdWx0LmF0dGFjaG1lbnQgPyAnICBbYXR0YWNobWVudC05OTk5XTogJyA6ICcgWzk5OTldOiAnO1xuICAgIHZhciBkZWZpbml0aW9uID0ga2V5ICsgbGluay5ocmVmICsgKGxpbmsudGl0bGUgPyAnIFwiJyArIGxpbmsudGl0bGUgKyAnXCInIDogJycpO1xuICAgIHZhciBhbmNob3IgPSBwdXNoRGVmaW5pdGlvbihjaHVua3MsIGRlZmluaXRpb24sIHJlc3VsdC5hdHRhY2htZW50KTtcblxuICAgIGlmICghcmVzdWx0LmF0dGFjaG1lbnQpIHtcbiAgICAgIGFkZCgpO1xuICAgIH1cblxuICAgIHJlc3VtZSgpO1xuXG4gICAgZnVuY3Rpb24gYWRkICgpIHtcbiAgICAgIGNodW5rcy5zdGFydFRhZyA9IGltYWdlID8gJyFbJyA6ICdbJztcbiAgICAgIGNodW5rcy5lbmRUYWcgPSAnXVsnICsgYW5jaG9yICsgJ10nO1xuXG4gICAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzW3R5cGVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpbmtPckltYWdlT3JBdHRhY2htZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWFueSA9IHJlcXVpcmUoJy4uL21hbnknKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHdyYXBwaW5nID0gcmVxdWlyZSgnLi93cmFwcGluZycpO1xudmFyIHNldHRpbmdzID0gcmVxdWlyZSgnLi9zZXR0aW5ncycpO1xudmFyIHJwcmV2aW91cyA9IC8oXFxufF4pKChbIF17MCwzfShbKistXXxcXGQrWy5dKVsgXFx0XSsuKikoXFxuLit8XFxuezIsfShbKistXS4qfFxcZCtbLl0pWyBcXHRdKy4qfFxcbnsyLH1bIFxcdF0rXFxTLiopKilcXG4qJC87XG52YXIgcm5leHQgPSAvXlxcbiooKFsgXXswLDN9KFsqKy1dfFxcZCtbLl0pWyBcXHRdKy4qKShcXG4uK3xcXG57Mix9KFsqKy1dLip8XFxkK1suXSlbIFxcdF0rLip8XFxuezIsfVsgXFx0XStcXFMuKikqKVxcbiovO1xudmFyIHJidWxsZXR0eXBlID0gL15cXHMqKFsqKy1dKS87XG52YXIgcnNraXBwZXIgPSAvW15cXG5dXFxuXFxuW15cXG5dLztcblxuZnVuY3Rpb24gcGFkICh0ZXh0KSB7XG4gIHJldHVybiAnICcgKyB0ZXh0ICsgJyAnO1xufVxuXG5mdW5jdGlvbiBsaXN0IChjaHVua3MsIG9yZGVyZWQpIHtcbiAgdmFyIGJ1bGxldCA9ICctJztcbiAgdmFyIG51bSA9IDE7XG4gIHZhciBkaWdpdGFsO1xuICB2YXIgYmVmb3JlU2tpcCA9IDE7XG4gIHZhciBhZnRlclNraXAgPSAxO1xuXG4gIGNodW5rcy5maW5kVGFncygvKFxcbnxeKSpbIF17MCwzfShbKistXXxcXGQrWy5dKVxccysvLCBudWxsKTtcblxuICBpZiAoY2h1bmtzLmJlZm9yZSAmJiAhL1xcbiQvLnRlc3QoY2h1bmtzLmJlZm9yZSkgJiYgIS9eXFxuLy50ZXN0KGNodW5rcy5zdGFydFRhZykpIHtcbiAgICBjaHVua3MuYmVmb3JlICs9IGNodW5rcy5zdGFydFRhZztcbiAgICBjaHVua3Muc3RhcnRUYWcgPSAnJztcbiAgfVxuXG4gIGlmIChjaHVua3Muc3RhcnRUYWcpIHtcbiAgICBkaWdpdGFsID0gL1xcZCtbLl0vLnRlc3QoY2h1bmtzLnN0YXJ0VGFnKTtcbiAgICBjaHVua3Muc3RhcnRUYWcgPSAnJztcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9cXG5bIF17NH0vZywgJ1xcbicpO1xuICAgIHdyYXBwaW5nLnVud3JhcChjaHVua3MpO1xuICAgIGNodW5rcy5za2lwKCk7XG5cbiAgICBpZiAoZGlnaXRhbCkge1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2Uocm5leHQsIGdldFByZWZpeGVkSXRlbSk7XG4gICAgfVxuICAgIGlmIChvcmRlcmVkID09PSBkaWdpdGFsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShycHJldmlvdXMsIGJlZm9yZVJlcGxhY2VyKTtcblxuICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMubGlzdGl0ZW07XG4gIH1cblxuICB2YXIgcHJlZml4ID0gbmV4dEJ1bGxldCgpO1xuICB2YXIgc3BhY2VzID0gbWFueSgnICcsIHByZWZpeC5sZW5ndGgpO1xuXG4gIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJuZXh0LCBhZnRlclJlcGxhY2VyKTtcbiAgY2h1bmtzLnRyaW0odHJ1ZSk7XG4gIGNodW5rcy5za2lwKHsgYmVmb3JlOiBiZWZvcmVTa2lwLCBhZnRlcjogYWZ0ZXJTa2lwLCBhbnk6IHRydWUgfSk7XG4gIGNodW5rcy5zdGFydFRhZyA9IHByZWZpeDtcbiAgd3JhcHBpbmcud3JhcChjaHVua3MsIHNldHRpbmdzLmxpbmVMZW5ndGggLSBwcmVmaXgubGVuZ3RoKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXFxuL2csICdcXG4nICsgc3BhY2VzKTtcblxuICBmdW5jdGlvbiBiZWZvcmVSZXBsYWNlciAodGV4dCkge1xuICAgIGlmIChyYnVsbGV0dHlwZS50ZXN0KHRleHQpKSB7XG4gICAgICBidWxsZXQgPSBSZWdFeHAuJDE7XG4gICAgfVxuICAgIGJlZm9yZVNraXAgPSByc2tpcHBlci50ZXN0KHRleHQpID8gMSA6IDA7XG4gICAgcmV0dXJuIGdldFByZWZpeGVkSXRlbSh0ZXh0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFmdGVyUmVwbGFjZXIgKHRleHQpIHtcbiAgICBhZnRlclNraXAgPSByc2tpcHBlci50ZXN0KHRleHQpID8gMSA6IDA7XG4gICAgcmV0dXJuIGdldFByZWZpeGVkSXRlbSh0ZXh0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRCdWxsZXQgKCkge1xuICAgIGlmIChvcmRlcmVkKSB7XG4gICAgICByZXR1cm4gcGFkKChudW0rKykgKyAnLicpO1xuICAgIH1cbiAgICByZXR1cm4gcGFkKGJ1bGxldCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQcmVmaXhlZEl0ZW0gKHRleHQpIHtcbiAgICB2YXIgcm1hcmtlcnMgPSAvXlsgXXswLDN9KFsqKy1dfFxcZCtbLl0pXFxzL2dtO1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2Uocm1hcmtlcnMsIG5leHRCdWxsZXQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdDtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxpbmVMZW5ndGg6IDcyXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJlZml4ZXMgPSAnKD86XFxcXHN7NCx9fFxcXFxzKj58XFxcXHMqLVxcXFxzK3xcXFxccypcXFxcZCtcXFxcLnw9fFxcXFwrfC18X3xcXFxcKnwjfFxcXFxzKlxcXFxbW15cXG5dXStcXFxcXTopJztcbnZhciBybGVhZGluZ3ByZWZpeGVzID0gbmV3IFJlZ0V4cCgnXicgKyBwcmVmaXhlcywgJycpO1xudmFyIHJ0ZXh0ID0gbmV3IFJlZ0V4cCgnKFteXFxcXG5dKVxcXFxuKD8hKFxcXFxufCcgKyBwcmVmaXhlcyArICcpKScsICdnJyk7XG52YXIgcnRyYWlsaW5nc3BhY2VzID0gL1xccyskLztcblxuZnVuY3Rpb24gd3JhcCAoY2h1bmtzLCBsZW4pIHtcbiAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnKC57MSwnICsgbGVuICsgJ30pKCArfCRcXFxcbj8pJywgJ2dtJyk7XG5cbiAgdW53cmFwKGNodW5rcyk7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uXG4gICAgLnJlcGxhY2UocmVnZXgsIHJlcGxhY2VyKVxuICAgIC5yZXBsYWNlKHJ0cmFpbGluZ3NwYWNlcywgJycpO1xuXG4gIGZ1bmN0aW9uIHJlcGxhY2VyIChsaW5lLCBtYXJrZWQpIHtcbiAgICByZXR1cm4gcmxlYWRpbmdwcmVmaXhlcy50ZXN0KGxpbmUpID8gbGluZSA6IG1hcmtlZCArICdcXG4nO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVud3JhcCAoY2h1bmtzKSB7XG4gIHJ0ZXh0Lmxhc3RJbmRleCA9IDA7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UocnRleHQsICckMSAkMicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgd3JhcDogd3JhcCxcbiAgdW53cmFwOiB1bndyYXBcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBkaXNwb3NlZDtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRpc3Bvc2FibGUgKCkge1xuICAgIGlmIChkaXNwb3NlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25jZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGRvY3VtZW50O1xuXG5mdW5jdGlvbiBob21lYnJld1FTQSAoY2xhc3NOYW1lKSB7XG4gIHZhciByZXN1bHRzID0gW107XG4gIHZhciBhbGwgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKTtcbiAgdmFyIGk7XG4gIGZvciAoaSBpbiBhbGwpIHtcbiAgICBpZiAod3JhcChhbGxbaV0uY2xhc3NOYW1lKS5pbmRleE9mKHdyYXAoY2xhc3NOYW1lKSkgIT09IC0xKSB7XG4gICAgICByZXN1bHRzLnB1c2goYWxsW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIHdyYXAgKHRleHQpIHtcbiAgcmV0dXJuICcgJyArIHRleHQgKyAnICc7XG59XG5cbmZ1bmN0aW9uIGNsb3NlUHJvbXB0cyAoKSB7XG4gIGlmIChkb2MuYm9keS5xdWVyeVNlbGVjdG9yQWxsKSB7XG4gICAgcmVtb3ZlKGRvYy5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJy53ay1wcm9tcHQnKSk7XG4gIH0gZWxzZSB7XG4gICAgcmVtb3ZlKGhvbWVicmV3UVNBKCd3ay1wcm9tcHQnKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChwcm9tcHRzKSB7XG4gIHZhciBsZW4gPSBwcm9tcHRzLmxlbmd0aDtcbiAgdmFyIGk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHByb21wdHNbaV0ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChwcm9tcHRzW2ldKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb3NlUHJvbXB0cztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIHJlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyJyk7XG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4uL2NsYXNzZXMnKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHVwbG9hZHMgPSByZXF1aXJlKCcuLi91cGxvYWRzJyk7XG52YXIgRU5URVJfS0VZID0gMTM7XG52YXIgRVNDQVBFX0tFWSA9IDI3O1xudmFyIGRyYWdDbGFzcyA9ICd3ay1kcmFnZ2luZyc7XG52YXIgZHJhZ0NsYXNzU3BlY2lmaWMgPSAnd2stcHJvbXB0LXVwbG9hZC1kcmFnZ2luZyc7XG52YXIgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuZnVuY3Rpb24gYWx3YXlzICgpIHtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNsYXNzaWZ5IChncm91cCwgY2xhc3Nlcykge1xuICBPYmplY3Qua2V5cyhncm91cCkuZm9yRWFjaChjdXN0b21pemUpO1xuICBmdW5jdGlvbiBjdXN0b21pemUgKGtleSkge1xuICAgIGlmIChjbGFzc2VzW2tleV0pIHtcbiAgICAgIGdyb3VwW2tleV0uY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzZXNba2V5XTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvbXB0IChvcHRpb25zLCBkb25lKSB7XG4gIHZhciB0ZXh0ID0gc3RyaW5ncy5wcm9tcHRzW29wdGlvbnMudHlwZV07XG4gIHZhciBkb20gPSByZW5kZXIoe1xuICAgIGlkOiAnd2stcHJvbXB0LScgKyBvcHRpb25zLnR5cGUsXG4gICAgdGl0bGU6IHRleHQudGl0bGUsXG4gICAgZGVzY3JpcHRpb246IHRleHQuZGVzY3JpcHRpb24sXG4gICAgcGxhY2Vob2xkZXI6IHRleHQucGxhY2Vob2xkZXJcbiAgfSk7XG4gIHZhciBkb211cDtcblxuICBjcm9zc3ZlbnQuYWRkKGRvbS5jYW5jZWwsICdjbGljaycsIHJlbW92ZSk7XG4gIGNyb3NzdmVudC5hZGQoZG9tLmNsb3NlLCAnY2xpY2snLCByZW1vdmUpO1xuICBjcm9zc3ZlbnQuYWRkKGRvbS5vaywgJ2NsaWNrJywgb2spO1xuICBjcm9zc3ZlbnQuYWRkKGRvbS5pbnB1dCwgJ2tleXByZXNzJywgZW50ZXIpO1xuICBjcm9zc3ZlbnQuYWRkKGRvbS5kaWFsb2csICdrZXlkb3duJywgZXNjKTtcbiAgY2xhc3NpZnkoZG9tLCBvcHRpb25zLmNsYXNzZXMucHJvbXB0cyk7XG5cbiAgdmFyIHhociA9IG9wdGlvbnMueGhyO1xuICB2YXIgdXBsb2FkID0gb3B0aW9ucy51cGxvYWQ7XG4gIGlmICh0eXBlb2YgdXBsb2FkID09PSAnc3RyaW5nJykge1xuICAgIHVwbG9hZCA9IHsgdXJsOiB1cGxvYWQgfTtcbiAgfVxuICBpZiAodXBsb2FkKSB7XG4gICAgYXJyYW5nZVVwbG9hZHMoKTtcbiAgfVxuICBpZiAob3B0aW9ucy5hdXRvVXBsb2FkKSB7XG4gICAgc3VibWl0KG9wdGlvbnMuYXV0b1VwbG9hZCk7XG4gIH1cblxuICBzZXRUaW1lb3V0KGZvY3VzRGlhbG9nLCAwKTtcblxuICBmdW5jdGlvbiBmb2N1c0RpYWxvZyAoKSB7XG4gICAgZG9tLmlucHV0LmZvY3VzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBlbnRlciAoZSkge1xuICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAoa2V5ID09PSBFTlRFUl9LRVkpIHtcbiAgICAgIG9rKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXNjIChlKSB7XG4gICAgdmFyIGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmIChrZXkgPT09IEVTQ0FQRV9LRVkpIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9rICgpIHtcbiAgICByZW1vdmUoKTtcbiAgICBkb25lKHsgZGVmaW5pdGlvbjogZG9tLmlucHV0LnZhbHVlIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlICgpIHtcbiAgICBpZiAodXBsb2FkKSB7IGJpbmRVcGxvYWRFdmVudHModHJ1ZSk7IH1cbiAgICBpZiAoZG9tLmRpYWxvZy5wYXJlbnRFbGVtZW50KSB7IGRvbS5kaWFsb2cucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChkb20uZGlhbG9nKTsgfVxuICAgIG9wdGlvbnMuc3VyZmFjZS5mb2N1cyhvcHRpb25zLm1vZGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYmluZFVwbG9hZEV2ZW50cyAocmVtb3ZlKSB7XG4gICAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdkcmFnZW50ZXInLCBkcmFnZ2luZyk7XG4gICAgY3Jvc3N2ZW50W29wXShyb290LCAnZHJhZ2VuZCcsIGRyYWdzdG9wKTtcbiAgICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdtb3VzZW91dCcsIGRyYWdzdG9wKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdhcm4gKCkge1xuICAgIGNsYXNzZXMuYWRkKGRvbXVwLndhcm5pbmcsICd3ay1wcm9tcHQtZXJyb3Itc2hvdycpO1xuICB9XG4gIGZ1bmN0aW9uIGRyYWdnaW5nICgpIHtcbiAgICBjbGFzc2VzLmFkZChkb211cC5hcmVhLCBkcmFnQ2xhc3MpO1xuICAgIGNsYXNzZXMuYWRkKGRvbXVwLmFyZWEsIGRyYWdDbGFzc1NwZWNpZmljKTtcbiAgfVxuICBmdW5jdGlvbiBkcmFnc3RvcCAoKSB7XG4gICAgY2xhc3Nlcy5ybShkb211cC5hcmVhLCBkcmFnQ2xhc3MpO1xuICAgIGNsYXNzZXMucm0oZG9tdXAuYXJlYSwgZHJhZ0NsYXNzU3BlY2lmaWMpO1xuICAgIHVwbG9hZHMuc3RvcChvcHRpb25zLnN1cmZhY2UuZHJvcGFyZWEpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXJyYW5nZVVwbG9hZHMgKCkge1xuICAgIGRvbXVwID0gcmVuZGVyLnVwbG9hZHMoZG9tLCBzdHJpbmdzLnByb21wdHMudHlwZXMgKyAodXBsb2FkLnJlc3RyaWN0aW9uIHx8IG9wdGlvbnMudHlwZSArICdzJykpO1xuICAgIGJpbmRVcGxvYWRFdmVudHMoKTtcblxuICAgIGNyb3NzdmVudC5hZGQoZG9tdXAuZmlsZWlucHV0LCAnY2hhbmdlJywgaGFuZGxlQ2hhbmdlLCBmYWxzZSk7XG4gICAgY3Jvc3N2ZW50LmFkZChkb211cC5hcmVhLCAnZHJhZ292ZXInLCBoYW5kbGVEcmFnT3ZlciwgZmFsc2UpO1xuICAgIGNyb3NzdmVudC5hZGQoZG9tdXAuYXJlYSwgJ2Ryb3AnLCBoYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG4gICAgY2xhc3NpZnkoZG9tdXAsIG9wdGlvbnMuY2xhc3Nlcy5wcm9tcHRzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUNoYW5nZSAoZSkge1xuICAgIHN0b3AoZSk7XG4gICAgc3VibWl0KGRvbXVwLmZpbGVpbnB1dC5maWxlcyk7XG4gICAgZG9tdXAuZmlsZWlucHV0LnZhbHVlID0gJyc7XG4gICAgZG9tdXAuZmlsZWlucHV0LnZhbHVlID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZURyYWdPdmVyIChlKSB7XG4gICAgc3RvcChlKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRmlsZVNlbGVjdCAoZSkge1xuICAgIGRyYWdzdG9wKCk7XG4gICAgc3RvcChlKTtcbiAgICBzdWJtaXQoZS5kYXRhVHJhbnNmZXIuZmlsZXMpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWQgKGZpbGVzKSB7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoKHVwbG9hZC52YWxpZGF0ZSB8fCBhbHdheXMpKGZpbGVzW2ldKSkge1xuICAgICAgICByZXR1cm4gZmlsZXNbaV07XG4gICAgICB9XG4gICAgfVxuICAgIHdhcm4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Ym1pdCAoZmlsZXMpIHtcbiAgICBjbGFzc2VzLnJtKGRvbXVwLmZhaWxlZCwgJ3drLXByb21wdC1lcnJvci1zaG93Jyk7XG4gICAgY2xhc3Nlcy5ybShkb211cC53YXJuaW5nLCAnd2stcHJvbXB0LWVycm9yLXNob3cnKTtcbiAgICB2YXIgZmlsZSA9IHZhbGlkKGZpbGVzKTtcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICB2YXIgcmVxID0ge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBtZXRob2Q6IHVwbG9hZC5tZXRob2QgfHwgJ1BVVCcsXG4gICAgICB1cmw6IHVwbG9hZC51cmwsXG4gICAgICBib2R5OiBmb3JtXG4gICAgfTtcblxuICAgIGZvcm0uYXBwZW5kKHVwbG9hZC5rZXkgfHwgJ3dvb2ZtYXJrX3VwbG9hZCcsIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgY2xhc3Nlcy5hZGQoZG9tdXAuYXJlYSwgJ3drLXByb21wdC11cGxvYWRpbmcnKTtcbiAgICB4aHIocmVxLCBoYW5kbGVSZXNwb25zZSk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVSZXNwb25zZSAoZXJyLCByZXMsIGJvZHkpIHtcbiAgICAgIGNsYXNzZXMucm0oZG9tdXAuYXJlYSwgJ3drLXByb21wdC11cGxvYWRpbmcnKTtcbiAgICAgIGlmIChlcnIgfHwgcmVzLnN0YXR1c0NvZGUgPCAyMDAgfHwgcmVzLnN0YXR1c0NvZGUgPiAyOTkpIHtcbiAgICAgICAgY2xhc3Nlcy5hZGQoZG9tdXAuZmFpbGVkLCAnd2stcHJvbXB0LWVycm9yLXNob3cnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZG9tLmlucHV0LnZhbHVlID0gYm9keS5ocmVmICsgJyBcIicgKyBib2R5LnRpdGxlICsgJ1wiJztcbiAgICAgIHJlbW92ZSgpO1xuICAgICAgZG9uZSh7IGRlZmluaXRpb246IGRvbS5pbnB1dC52YWx1ZSwgYXR0YWNobWVudDogb3B0aW9ucy50eXBlID09PSAnYXR0YWNobWVudCcgfSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvbXB0O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgZ2V0VGV4dCA9IHJlcXVpcmUoJy4uL2dldFRleHQnKTtcbnZhciBzZXRUZXh0ID0gcmVxdWlyZSgnLi4vc2V0VGV4dCcpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuLi9jbGFzc2VzJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBhYyA9ICdhcHBlbmRDaGlsZCc7XG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuXG5mdW5jdGlvbiBlICh0eXBlLCBjbHMsIHRleHQpIHtcbiAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGVsLmNsYXNzTmFtZSA9IGNscztcbiAgaWYgKHRleHQpIHtcbiAgICBzZXRUZXh0KGVsLCB0ZXh0KTtcbiAgfVxuICByZXR1cm4gZWw7XG59XG5cbmZ1bmN0aW9uIHJlbmRlciAob3B0aW9ucykge1xuICB2YXIgZG9tID0ge1xuICAgIGRpYWxvZzogZSgnYXJ0aWNsZScsICd3ay1wcm9tcHQgJyArIG9wdGlvbnMuaWQpLFxuICAgIGNsb3NlOiBlKCdhJywgJ3drLXByb21wdC1jbG9zZScpLFxuICAgIGhlYWRlcjogZSgnaGVhZGVyJywgJ3drLXByb21wdC1oZWFkZXInKSxcbiAgICBoMTogZSgnaDEnLCAnd2stcHJvbXB0LXRpdGxlJywgb3B0aW9ucy50aXRsZSksXG4gICAgc2VjdGlvbjogZSgnc2VjdGlvbicsICd3ay1wcm9tcHQtYm9keScpLFxuICAgIGRlc2M6IGUoJ3AnLCAnd2stcHJvbXB0LWRlc2NyaXB0aW9uJywgb3B0aW9ucy5kZXNjcmlwdGlvbiksXG4gICAgaW5wdXRDb250YWluZXI6IGUoJ2RpdicsICd3ay1wcm9tcHQtaW5wdXQtY29udGFpbmVyJyksXG4gICAgaW5wdXQ6IGUoJ2lucHV0JywgJ3drLXByb21wdC1pbnB1dCcpLFxuICAgIGNhbmNlbDogZSgnYnV0dG9uJywgJ3drLXByb21wdC1jYW5jZWwnLCAnQ2FuY2VsJyksXG4gICAgb2s6IGUoJ2J1dHRvbicsICd3ay1wcm9tcHQtb2snLCAnT2snKSxcbiAgICBmb290ZXI6IGUoJ2Zvb3RlcicsICd3ay1wcm9tcHQtYnV0dG9ucycpXG4gIH07XG4gIGRvbS5vay50eXBlID0gJ2J1dHRvbic7XG4gIGRvbS5oZWFkZXJbYWNdKGRvbS5oMSk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb20uZGVzYyk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb20uaW5wdXRDb250YWluZXIpO1xuICBkb20uaW5wdXRDb250YWluZXJbYWNdKGRvbS5pbnB1dCk7XG4gIGRvbS5pbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXI7XG4gIGRvbS5jYW5jZWwudHlwZSA9ICdidXR0b24nO1xuICBkb20uZm9vdGVyW2FjXShkb20uY2FuY2VsKTtcbiAgZG9tLmZvb3RlclthY10oZG9tLm9rKTtcbiAgZG9tLmRpYWxvZ1thY10oZG9tLmNsb3NlKTtcbiAgZG9tLmRpYWxvZ1thY10oZG9tLmhlYWRlcik7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5zZWN0aW9uKTtcbiAgZG9tLmRpYWxvZ1thY10oZG9tLmZvb3Rlcik7XG4gIGRvYy5ib2R5W2FjXShkb20uZGlhbG9nKTtcbiAgcmV0dXJuIGRvbTtcbn1cblxuZnVuY3Rpb24gdXBsb2FkcyAoZG9tLCB3YXJuaW5nKSB7XG4gIHZhciBmdXAgPSAnd2stcHJvbXB0LWZpbGV1cGxvYWQnO1xuICB2YXIgZG9tdXAgPSB7XG4gICAgYXJlYTogZSgnc2VjdGlvbicsICd3ay1wcm9tcHQtdXBsb2FkLWFyZWEnKSxcbiAgICB3YXJuaW5nOiBlKCdwJywgJ3drLXByb21wdC1lcnJvciB3ay13YXJuaW5nJywgd2FybmluZyksXG4gICAgZmFpbGVkOiBlKCdwJywgJ3drLXByb21wdC1lcnJvciB3ay1mYWlsZWQnLCBzdHJpbmdzLnByb21wdHMudXBsb2FkZmFpbGVkKSxcbiAgICB1cGxvYWQ6IGUoJ2xhYmVsJywgJ3drLXByb21wdC11cGxvYWQnKSxcbiAgICB1cGxvYWRpbmc6IGUoJ3NwYW4nLCAnd2stcHJvbXB0LXByb2dyZXNzJywgc3RyaW5ncy5wcm9tcHRzLnVwbG9hZGluZyksXG4gICAgZHJvcDogZSgnc3BhbicsICd3ay1wcm9tcHQtZHJvcCcsIHN0cmluZ3MucHJvbXB0cy5kcm9wKSxcbiAgICBkcm9waWNvbjogZSgncCcsICd3ay1kcm9wLWljb24gd2stcHJvbXB0LWRyb3AtaWNvbicpLFxuICAgIGJyb3dzZTogZSgnc3BhbicsICd3ay1wcm9tcHQtYnJvd3NlJywgc3RyaW5ncy5wcm9tcHRzLmJyb3dzZSksXG4gICAgZHJhZ2Ryb3A6IGUoJ3AnLCAnd2stcHJvbXB0LWRyYWdkcm9wJywgc3RyaW5ncy5wcm9tcHRzLmRyb3BoaW50KSxcbiAgICBmaWxlaW5wdXQ6IGUoJ2lucHV0JywgZnVwKVxuICB9O1xuICBkb211cC5hcmVhW2FjXShkb211cC5kcm9wKTtcbiAgZG9tdXAuYXJlYVthY10oZG9tdXAudXBsb2FkaW5nKTtcbiAgZG9tdXAuYXJlYVthY10oZG9tdXAuZHJvcGljb24pO1xuICBkb211cC51cGxvYWRbYWNdKGRvbXVwLmJyb3dzZSk7XG4gIGRvbXVwLnVwbG9hZFthY10oZG9tdXAuZmlsZWlucHV0KTtcbiAgZG9tdXAuZmlsZWlucHV0LmlkID0gZnVwO1xuICBkb211cC5maWxlaW5wdXQudHlwZSA9ICdmaWxlJztcbiAgZG9tLmRpYWxvZy5jbGFzc05hbWUgKz0gJyB3ay1wcm9tcHQtdXBsb2Fkcyc7XG4gIGRvbS5pbnB1dENvbnRhaW5lci5jbGFzc05hbWUgKz0gJyB3ay1wcm9tcHQtaW5wdXQtY29udGFpbmVyLXVwbG9hZHMnO1xuICBkb20uaW5wdXQuY2xhc3NOYW1lICs9ICcgd2stcHJvbXB0LWlucHV0LXVwbG9hZHMnO1xuICBkb20uc2VjdGlvbi5pbnNlcnRCZWZvcmUoZG9tdXAud2FybmluZywgZG9tLmlucHV0Q29udGFpbmVyKTtcbiAgZG9tLnNlY3Rpb24uaW5zZXJ0QmVmb3JlKGRvbXVwLmZhaWxlZCwgZG9tLmlucHV0Q29udGFpbmVyKTtcbiAgZG9tLnNlY3Rpb25bYWNdKGRvbXVwLnVwbG9hZCk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb211cC5kcmFnZHJvcCk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb211cC5hcmVhKTtcbiAgc2V0VGV4dChkb20uZGVzYywgZ2V0VGV4dChkb20uZGVzYykgKyBzdHJpbmdzLnByb21wdHMudXBsb2FkKTtcbiAgY3Jvc3N2ZW50LmFkZChkb211cC5maWxlaW5wdXQsICdmb2N1cycsIGZvY3VzZWRGaWxlSW5wdXQpO1xuICBjcm9zc3ZlbnQuYWRkKGRvbXVwLmZpbGVpbnB1dCwgJ2JsdXInLCBibHVycmVkRmlsZUlucHV0KTtcblxuICBmdW5jdGlvbiBmb2N1c2VkRmlsZUlucHV0ICgpIHtcbiAgICBjbGFzc2VzLmFkZChkb211cC51cGxvYWQsICd3ay1mb2N1c2VkJyk7XG4gIH1cbiAgZnVuY3Rpb24gYmx1cnJlZEZpbGVJbnB1dCAoKSB7XG4gICAgY2xhc3Nlcy5ybShkb211cC51cGxvYWQsICd3ay1mb2N1c2VkJyk7XG4gIH1cbiAgcmV0dXJuIGRvbXVwO1xufVxuXG5yZW5kZXIudXBsb2FkcyA9IHVwbG9hZHM7XG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlcjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5d2NtOXRjSFJ6TDNKbGJtUmxjaTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdZM0p2YzNOMlpXNTBJRDBnY21WeGRXbHlaU2duWTNKdmMzTjJaVzUwSnlrN1hHNTJZWElnWjJWMFZHVjRkQ0E5SUhKbGNYVnBjbVVvSnk0dUwyZGxkRlJsZUhRbktUdGNiblpoY2lCelpYUlVaWGgwSUQwZ2NtVnhkV2x5WlNnbkxpNHZjMlYwVkdWNGRDY3BPMXh1ZG1GeUlHTnNZWE56WlhNZ1BTQnlaWEYxYVhKbEtDY3VMaTlqYkdGemMyVnpKeWs3WEc1MllYSWdjM1J5YVc1bmN5QTlJSEpsY1hWcGNtVW9KeTR1TDNOMGNtbHVaM01uS1R0Y2JuWmhjaUJoWXlBOUlDZGhjSEJsYm1SRGFHbHNaQ2M3WEc1MllYSWdaRzlqSUQwZ1oyeHZZbUZzTG1SdlkzVnRaVzUwTzF4dVhHNW1kVzVqZEdsdmJpQmxJQ2gwZVhCbExDQmpiSE1zSUhSbGVIUXBJSHRjYmlBZ2RtRnlJR1ZzSUQwZ1pHOWpMbU55WldGMFpVVnNaVzFsYm5Rb2RIbHdaU2s3WEc0Z0lHVnNMbU5zWVhOelRtRnRaU0E5SUdOc2N6dGNiaUFnYVdZZ0tIUmxlSFFwSUh0Y2JpQWdJQ0J6WlhSVVpYaDBLR1ZzTENCMFpYaDBLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdaV3c3WEc1OVhHNWNibVoxYm1OMGFXOXVJSEpsYm1SbGNpQW9iM0IwYVc5dWN5a2dlMXh1SUNCMllYSWdaRzl0SUQwZ2UxeHVJQ0FnSUdScFlXeHZaem9nWlNnbllYSjBhV05zWlNjc0lDZDNheTF3Y205dGNIUWdKeUFySUc5d2RHbHZibk11YVdRcExGeHVJQ0FnSUdOc2IzTmxPaUJsS0NkaEp5d2dKM2RyTFhCeWIyMXdkQzFqYkc5elpTY3BMRnh1SUNBZ0lHaGxZV1JsY2pvZ1pTZ25hR1ZoWkdWeUp5d2dKM2RyTFhCeWIyMXdkQzFvWldGa1pYSW5LU3hjYmlBZ0lDQm9NVG9nWlNnbmFERW5MQ0FuZDJzdGNISnZiWEIwTFhScGRHeGxKeXdnYjNCMGFXOXVjeTUwYVhSc1pTa3NYRzRnSUNBZ2MyVmpkR2x2YmpvZ1pTZ25jMlZqZEdsdmJpY3NJQ2QzYXkxd2NtOXRjSFF0WW05a2VTY3BMRnh1SUNBZ0lHUmxjMk02SUdVb0ozQW5MQ0FuZDJzdGNISnZiWEIwTFdSbGMyTnlhWEIwYVc5dUp5d2diM0IwYVc5dWN5NWtaWE5qY21sd2RHbHZiaWtzWEc0Z0lDQWdhVzV3ZFhSRGIyNTBZV2x1WlhJNklHVW9KMlJwZGljc0lDZDNheTF3Y205dGNIUXRhVzV3ZFhRdFkyOXVkR0ZwYm1WeUp5a3NYRzRnSUNBZ2FXNXdkWFE2SUdVb0oybHVjSFYwSnl3Z0ozZHJMWEJ5YjIxd2RDMXBibkIxZENjcExGeHVJQ0FnSUdOaGJtTmxiRG9nWlNnblluVjBkRzl1Snl3Z0ozZHJMWEJ5YjIxd2RDMWpZVzVqWld3bkxDQW5RMkZ1WTJWc0p5a3NYRzRnSUNBZ2IyczZJR1VvSjJKMWRIUnZiaWNzSUNkM2F5MXdjbTl0Y0hRdGIyc25MQ0FuVDJzbktTeGNiaUFnSUNCbWIyOTBaWEk2SUdVb0oyWnZiM1JsY2ljc0lDZDNheTF3Y205dGNIUXRZblYwZEc5dWN5Y3BYRzRnSUgwN1hHNGdJR1J2YlM1dmF5NTBlWEJsSUQwZ0oySjFkSFJ2YmljN1hHNGdJR1J2YlM1b1pXRmtaWEpiWVdOZEtHUnZiUzVvTVNrN1hHNGdJR1J2YlM1elpXTjBhVzl1VzJGalhTaGtiMjB1WkdWell5azdYRzRnSUdSdmJTNXpaV04wYVc5dVcyRmpYU2hrYjIwdWFXNXdkWFJEYjI1MFlXbHVaWElwTzF4dUlDQmtiMjB1YVc1d2RYUkRiMjUwWVdsdVpYSmJZV05kS0dSdmJTNXBibkIxZENrN1hHNGdJR1J2YlM1cGJuQjFkQzV3YkdGalpXaHZiR1JsY2lBOUlHOXdkR2x2Ym5NdWNHeGhZMlZvYjJ4a1pYSTdYRzRnSUdSdmJTNWpZVzVqWld3dWRIbHdaU0E5SUNkaWRYUjBiMjRuTzF4dUlDQmtiMjB1Wm05dmRHVnlXMkZqWFNoa2IyMHVZMkZ1WTJWc0tUdGNiaUFnWkc5dExtWnZiM1JsY2x0aFkxMG9aRzl0TG05cktUdGNiaUFnWkc5dExtUnBZV3h2WjF0aFkxMG9aRzl0TG1Oc2IzTmxLVHRjYmlBZ1pHOXRMbVJwWVd4dloxdGhZMTBvWkc5dExtaGxZV1JsY2lrN1hHNGdJR1J2YlM1a2FXRnNiMmRiWVdOZEtHUnZiUzV6WldOMGFXOXVLVHRjYmlBZ1pHOXRMbVJwWVd4dloxdGhZMTBvWkc5dExtWnZiM1JsY2lrN1hHNGdJR1J2WXk1aWIyUjVXMkZqWFNoa2IyMHVaR2xoYkc5bktUdGNiaUFnY21WMGRYSnVJR1J2YlR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnZFhCc2IyRmtjeUFvWkc5dExDQjNZWEp1YVc1bktTQjdYRzRnSUhaaGNpQm1kWEFnUFNBbmQyc3RjSEp2YlhCMExXWnBiR1YxY0d4dllXUW5PMXh1SUNCMllYSWdaRzl0ZFhBZ1BTQjdYRzRnSUNBZ1lYSmxZVG9nWlNnbmMyVmpkR2x2Ymljc0lDZDNheTF3Y205dGNIUXRkWEJzYjJGa0xXRnlaV0VuS1N4Y2JpQWdJQ0IzWVhKdWFXNW5PaUJsS0Nkd0p5d2dKM2RyTFhCeWIyMXdkQzFsY25KdmNpQjNheTEzWVhKdWFXNW5KeXdnZDJGeWJtbHVaeWtzWEc0Z0lDQWdabUZwYkdWa09pQmxLQ2R3Snl3Z0ozZHJMWEJ5YjIxd2RDMWxjbkp2Y2lCM2F5MW1ZV2xzWldRbkxDQnpkSEpwYm1kekxuQnliMjF3ZEhNdWRYQnNiMkZrWm1GcGJHVmtLU3hjYmlBZ0lDQjFjR3h2WVdRNklHVW9KMnhoWW1Wc0p5d2dKM2RyTFhCeWIyMXdkQzExY0d4dllXUW5LU3hjYmlBZ0lDQjFjR3h2WVdScGJtYzZJR1VvSjNOd1lXNG5MQ0FuZDJzdGNISnZiWEIwTFhCeWIyZHlaWE56Snl3Z2MzUnlhVzVuY3k1d2NtOXRjSFJ6TG5Wd2JHOWhaR2x1Wnlrc1hHNGdJQ0FnWkhKdmNEb2daU2duYzNCaGJpY3NJQ2QzYXkxd2NtOXRjSFF0WkhKdmNDY3NJSE4wY21sdVozTXVjSEp2YlhCMGN5NWtjbTl3S1N4Y2JpQWdJQ0JrY205d2FXTnZiam9nWlNnbmNDY3NJQ2QzYXkxa2NtOXdMV2xqYjI0Z2Qyc3RjSEp2YlhCMExXUnliM0F0YVdOdmJpY3BMRnh1SUNBZ0lHSnliM2R6WlRvZ1pTZ25jM0JoYmljc0lDZDNheTF3Y205dGNIUXRZbkp2ZDNObEp5d2djM1J5YVc1bmN5NXdjbTl0Y0hSekxtSnliM2R6WlNrc1hHNGdJQ0FnWkhKaFoyUnliM0E2SUdVb0ozQW5MQ0FuZDJzdGNISnZiWEIwTFdSeVlXZGtjbTl3Snl3Z2MzUnlhVzVuY3k1d2NtOXRjSFJ6TG1SeWIzQm9hVzUwS1N4Y2JpQWdJQ0JtYVd4bGFXNXdkWFE2SUdVb0oybHVjSFYwSnl3Z1puVndLVnh1SUNCOU8xeHVJQ0JrYjIxMWNDNWhjbVZoVzJGalhTaGtiMjExY0M1a2NtOXdLVHRjYmlBZ1pHOXRkWEF1WVhKbFlWdGhZMTBvWkc5dGRYQXVkWEJzYjJGa2FXNW5LVHRjYmlBZ1pHOXRkWEF1WVhKbFlWdGhZMTBvWkc5dGRYQXVaSEp2Y0dsamIyNHBPMXh1SUNCa2IyMTFjQzUxY0d4dllXUmJZV05kS0dSdmJYVndMbUp5YjNkelpTazdYRzRnSUdSdmJYVndMblZ3Ykc5aFpGdGhZMTBvWkc5dGRYQXVabWxzWldsdWNIVjBLVHRjYmlBZ1pHOXRkWEF1Wm1sc1pXbHVjSFYwTG1sa0lEMGdablZ3TzF4dUlDQmtiMjExY0M1bWFXeGxhVzV3ZFhRdWRIbHdaU0E5SUNkbWFXeGxKenRjYmlBZ1pHOXRMbVJwWVd4dlp5NWpiR0Z6YzA1aGJXVWdLejBnSnlCM2F5MXdjbTl0Y0hRdGRYQnNiMkZrY3ljN1hHNGdJR1J2YlM1cGJuQjFkRU52Ym5SaGFXNWxjaTVqYkdGemMwNWhiV1VnS3owZ0p5QjNheTF3Y205dGNIUXRhVzV3ZFhRdFkyOXVkR0ZwYm1WeUxYVndiRzloWkhNbk8xeHVJQ0JrYjIwdWFXNXdkWFF1WTJ4aGMzTk9ZVzFsSUNzOUlDY2dkMnN0Y0hKdmJYQjBMV2x1Y0hWMExYVndiRzloWkhNbk8xeHVJQ0JrYjIwdWMyVmpkR2x2Ymk1cGJuTmxjblJDWldadmNtVW9aRzl0ZFhBdWQyRnlibWx1Wnl3Z1pHOXRMbWx1Y0hWMFEyOXVkR0ZwYm1WeUtUdGNiaUFnWkc5dExuTmxZM1JwYjI0dWFXNXpaWEowUW1WbWIzSmxLR1J2YlhWd0xtWmhhV3hsWkN3Z1pHOXRMbWx1Y0hWMFEyOXVkR0ZwYm1WeUtUdGNiaUFnWkc5dExuTmxZM1JwYjI1YllXTmRLR1J2YlhWd0xuVndiRzloWkNrN1hHNGdJR1J2YlM1elpXTjBhVzl1VzJGalhTaGtiMjExY0M1a2NtRm5aSEp2Y0NrN1hHNGdJR1J2YlM1elpXTjBhVzl1VzJGalhTaGtiMjExY0M1aGNtVmhLVHRjYmlBZ2MyVjBWR1Y0ZENoa2IyMHVaR1Z6WXl3Z1oyVjBWR1Y0ZENoa2IyMHVaR1Z6WXlrZ0t5QnpkSEpwYm1kekxuQnliMjF3ZEhNdWRYQnNiMkZrS1R0Y2JpQWdZM0p2YzNOMlpXNTBMbUZrWkNoa2IyMTFjQzVtYVd4bGFXNXdkWFFzSUNkbWIyTjFjeWNzSUdadlkzVnpaV1JHYVd4bFNXNXdkWFFwTzF4dUlDQmpjbTl6YzNabGJuUXVZV1JrS0dSdmJYVndMbVpwYkdWcGJuQjFkQ3dnSjJKc2RYSW5MQ0JpYkhWeWNtVmtSbWxzWlVsdWNIVjBLVHRjYmx4dUlDQm1kVzVqZEdsdmJpQm1iMk4xYzJWa1JtbHNaVWx1Y0hWMElDZ3BJSHRjYmlBZ0lDQmpiR0Z6YzJWekxtRmtaQ2hrYjIxMWNDNTFjR3h2WVdRc0lDZDNheTFtYjJOMWMyVmtKeWs3WEc0Z0lIMWNiaUFnWm5WdVkzUnBiMjRnWW14MWNuSmxaRVpwYkdWSmJuQjFkQ0FvS1NCN1hHNGdJQ0FnWTJ4aGMzTmxjeTV5YlNoa2IyMTFjQzUxY0d4dllXUXNJQ2QzYXkxbWIyTjFjMlZrSnlrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUdSdmJYVndPMXh1ZlZ4dVhHNXlaVzVrWlhJdWRYQnNiMkZrY3lBOUlIVndiRzloWkhNN1hHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlISmxibVJsY2p0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYnVsbHNleWUgPSByZXF1aXJlKCdidWxsc2V5ZScpO1xudmFyIHJhbmNob3JlZCA9IC9eWyM+Ki1dJC87XG52YXIgcmJvdW5kYXJ5ID0gL15bKl9gIy1dJC87XG52YXIgcmJ1bGxldGFmdGVyID0gL15cXGQrXFwuIC87XG52YXIgcmJ1bGxldGxpbmUgPSAvXlxccypcXGQrXFwuJC87XG52YXIgcmJ1bGxldGxlZnQgPSAvXlxccypcXGQrJC87XG52YXIgcmJ1bGxldHJpZ2h0ID0gL1xcZHxcXC4vO1xudmFyIHJ3aGl0ZXNwYWNlID0gL15cXHMqJC87XG52YXIgcmhyID0gL14tLS0rJC87XG52YXIgcmVuZCA9IC9eJHxcXHN8XFxuLztcbnZhciByZm9vdG5vdGVkZWNsYXJhdGlvbiA9IC9eXFxbW15cXF1dK1xcXVxccyo6XFxzKltBLXpcXC9dLztcbnZhciByZm9vdG5vdGViZWdpbiA9IC9eXFxzKlxcW1teXFxdXSokLztcbnZhciByZm9vdG5vdGViZWdhbiA9IC9eXFxzKlxcW1teXFxdXSskLztcbnZhciByZm9vdG5vdGVsZWZ0ID0gL15cXHMqXFxbW15cXF1dK1xcXVxccyokLztcbnZhciByZm9vdG5vdGVhbmNob3IgPSAvXlxccypcXFtbXlxcXV0rXFxdXFxzKjokLztcbnZhciByZm9vdG5vdGVsaW5rID0gL15cXHMqXFxbW15cXF1dK1xcXVxccyo6XFxzKltBLXpcXC9dLztcbnZhciByZm9vdG5vdGVmdWxsID0gL15cXHMqXFxbW15cXF1dK1xcXVxccyo6XFxzKltBLXpcXC9dLipcXHMqXCJbXlwiXSpcIi87XG52YXIgcnNwYWNlb3JxdW90ZSA9IC9cXHN8XCIvO1xudmFyIHJzcGFjZW9yY29sb24gPSAvXFxzfDovO1xudmFyIHJlbXB0eSA9IC9eKDxwPjxcXC9wPik/XFxuPyQvaTtcblxuZnVuY3Rpb24gcmVtZW1iZXJTZWxlY3Rpb24gKGhpc3RvcnkpIHtcbiAgdmFyIGNvZGUgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE4KS5zdWJzdHIoMikucmVwbGFjZSgvXFxkKy9nLCAnJyk7XG4gIHZhciBvcGVuID0gJ1dvb2ZtYXJrU2VsZWN0aW9uT3Blbk1hcmtlcicgKyBjb2RlO1xuICB2YXIgY2xvc2UgPSAnV29vZm1hcmtTZWxlY3Rpb25DbG9zZU1hcmtlcicgKyBjb2RlO1xuICB2YXIgcm1hcmtlcnMgPSBuZXcgUmVnRXhwKG9wZW4gKyAnfCcgKyBjbG9zZSwgJ2cnKTtcbiAgbWFyaygpO1xuICByZXR1cm4gdW5tYXJrO1xuXG4gIGZ1bmN0aW9uIG1hcmsgKCkge1xuICAgIHZhciBzdGF0ZSA9IGhpc3RvcnkucmVzZXQoKS5pbnB1dFN0YXRlO1xuICAgIHZhciBjaHVua3MgPSBzdGF0ZS5nZXRDaHVua3MoKTtcbiAgICB2YXIgbW9kZSA9IHN0YXRlLm1vZGU7XG4gICAgdmFyIGFsbCA9IGNodW5rcy5iZWZvcmUgKyBjaHVua3Muc2VsZWN0aW9uICsgY2h1bmtzLmFmdGVyO1xuICAgIGlmIChyZW1wdHkudGVzdChhbGwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChtb2RlID09PSAnbWFya2Rvd24nKSB7XG4gICAgICB1cGRhdGVNYXJrZG93bkNodW5rcyhjaHVua3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVIVE1MQ2h1bmtzKGNodW5rcyk7XG4gICAgfVxuICAgIHN0YXRlLnNldENodW5rcyhjaHVua3MpO1xuICAgIHN0YXRlLnJlc3RvcmUoZmFsc2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5tYXJrICgpIHtcbiAgICB2YXIgc3RhdGUgPSBoaXN0b3J5LmlucHV0U3RhdGU7XG4gICAgdmFyIGNodW5rcyA9IHN0YXRlLmdldENodW5rcygpO1xuICAgIHZhciBhbGwgPSBjaHVua3MuYmVmb3JlICsgY2h1bmtzLnNlbGVjdGlvbiArIGNodW5rcy5hZnRlcjtcbiAgICB2YXIgc3RhcnQgPSBhbGwubGFzdEluZGV4T2Yob3Blbik7XG4gICAgdmFyIGVuZCA9IGFsbC5sYXN0SW5kZXhPZihjbG9zZSkgKyBjbG9zZS5sZW5ndGg7XG4gICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gc3RhcnQgPT09IC0xID8gMCA6IHN0YXJ0O1xuICAgIHZhciBzZWxlY3Rpb25FbmQgPSBlbmQgPT09IC0xID8gMCA6IGVuZDtcbiAgICBjaHVua3MuYmVmb3JlID0gYWxsLnN1YnN0cigwLCBzZWxlY3Rpb25TdGFydCkucmVwbGFjZShybWFya2VycywgJycpO1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBhbGwuc3Vic3RyKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQgLSBzZWxlY3Rpb25TdGFydCkucmVwbGFjZShybWFya2VycywgJycpO1xuICAgIGNodW5rcy5hZnRlciA9IGFsbC5zdWJzdHIoZW5kKS5yZXBsYWNlKHJtYXJrZXJzLCAnJyk7XG4gICAgdmFyIGVsID0gaGlzdG9yeS5zdXJmYWNlLmN1cnJlbnQoaGlzdG9yeS5pbnB1dE1vZGUpO1xuICAgIHZhciBleWUgPSBidWxsc2V5ZShlbCwge1xuICAgICAgY2FyZXQ6IHRydWUsIGF1dG91cGRhdGVUb0NhcmV0OiBmYWxzZSwgdHJhY2tpbmc6IGZhbHNlXG4gICAgfSk7XG4gICAgc3RhdGUuc2V0Q2h1bmtzKGNodW5rcyk7XG4gICAgc3RhdGUucmVzdG9yZShmYWxzZSk7XG4gICAgc3RhdGUuc2Nyb2xsVG9wID0gZWwuc2Nyb2xsVG9wID0gZXllLnJlYWQoKS55IC0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gNTA7XG4gICAgZXllLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hcmtkb3duQ2h1bmtzIChjaHVua3MpIHtcbiAgICB2YXIgYWxsID0gY2h1bmtzLmJlZm9yZSArIGNodW5rcy5zZWxlY3Rpb24gKyBjaHVua3MuYWZ0ZXI7XG4gICAgdmFyIG9yaWdpbmFsU3RhcnQgPSBjaHVua3MuYmVmb3JlLmxlbmd0aDtcbiAgICB2YXIgb3JpZ2luYWxFbmQgPSBvcmlnaW5hbFN0YXJ0ICsgY2h1bmtzLnNlbGVjdGlvbi5sZW5ndGg7XG4gICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gbW92ZShvcmlnaW5hbFN0YXJ0LCAxKTtcbiAgICB2YXIgc2VsZWN0aW9uRW5kID0gbW92ZShvcmlnaW5hbEVuZCwgLTEpO1xuICAgIHZhciBtb3ZlZCA9IG9yaWdpbmFsU3RhcnQgIT09IHNlbGVjdGlvblN0YXJ0IHx8IG9yaWdpbmFsRW5kICE9PSBzZWxlY3Rpb25FbmQ7XG5cbiAgICB1cGRhdGVTZWxlY3Rpb24oY2h1bmtzLCBhbGwsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQsIG1vdmVkKTtcblxuICAgIGZ1bmN0aW9uIG1vdmUgKHAsIG9mZnNldCkge1xuICAgICAgdmFyIHByZXYgPSBhbGxbcCAtIDFdIHx8ICcnO1xuICAgICAgdmFyIG5leHQgPSBhbGxbcF0gfHwgJyc7XG4gICAgICB2YXIgbGluZSA9IGJhY2t0cmFjZShwIC0gMSwgJ1xcbicpO1xuICAgICAgdmFyIGp1bXBzID0gcHJldiA9PT0gJycgfHwgcHJldiA9PT0gJ1xcbic7XG5cbiAgICAgIGlmIChuZXh0ID09PSAnICcgJiYgKGp1bXBzIHx8IHByZXYgPT09ICcgJykpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjbG9zZSA9IGJhY2t0cmFjZShwIC0gMSwgJ10nKTtcbiAgICAgIHZhciByZW9wZW5lZCA9IGNsb3NlLmluZGV4T2YoJ1snKTtcblxuICAgICAgLy8gdGhlc2UgdHdvIGhhbmRsZSBhbmNob3JlZCByZWZlcmVuY2VzICdbZm9vXVsxXScsIG9yIGV2ZW4gJ1tiYXJdICBcXG4gWzJdJ1xuICAgICAgaWYgKHJlb3BlbmVkICE9PSAtMSAmJiByd2hpdGVzcGFjZS50ZXN0KGNsb3NlLnN1YnN0cigwLCByZW9wZW5lZCkpKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigtY2xvc2UubGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlb3BlbmVkID0gYWxsLnN1YnN0cihwKS5pbmRleE9mKCdbJyk7XG4gICAgICAgIGlmIChyZW9wZW5lZCAhPT0gLTEgJiYgcndoaXRlc3BhY2UudGVzdChhbGwuc3Vic3RyKHAsIHJlb3BlbmVkKSkpIHtcbiAgICAgICAgICByZXR1cm4gYWdhaW4oLTEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHRoZSBzZXZlbiBmb2xsb3dpbmcgcnVsZXMgdG9nZXRoZXIgaGFuZGxlIGZvb3Rub3RlIHJlZmVyZW5jZXNcbiAgICAgIGlmICgoanVtcHMgfHwgcndoaXRlc3BhY2UudGVzdChsaW5lKSkgJiYgcmZvb3Rub3RlZGVjbGFyYXRpb24udGVzdChhbGwuc3Vic3RyKHApKSkge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTsgLy8gc3RhcnRlZCB3aXRoICcnLCAnXFxuJywgb3IgJyAgJyBhbmQgY29udGludWVkIHdpdGggJ1thLTFdOiBoJ1xuICAgICAgfVxuICAgICAgaWYgKHJmb290bm90ZWJlZ2luLnRlc3QobGluZSkgJiYgbmV4dCAhPT0gJ10nKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpOyAvLyBzdGFydGVkIHdpdGggJ1snIGFuZCBjb250aW51ZWQgd2l0aCAnYS0xJ1xuICAgICAgfVxuICAgICAgaWYgKHJmb290bm90ZWJlZ2FuLnRlc3QobGluZSkgJiYgbmV4dCA9PT0gJ10nKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpOyAvLyBzdGFydGVkIHdpdGggJ1thLTEnIGFuZCBjb250aW51ZWQgd2l0aCAnXTogaCdcbiAgICAgIH1cbiAgICAgIGlmIChyZm9vdG5vdGVsZWZ0LnRlc3QobGluZSkgJiYgcnNwYWNlb3Jjb2xvbi50ZXN0KG5leHQpKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpOyAvLyBzdGFydGVkIHdpdGggJ1thLTFdICAnIGFuZCBjb250aW51ZWQgd2l0aCAnOidcbiAgICAgIH1cbiAgICAgIGlmIChyZm9vdG5vdGVhbmNob3IudGVzdChsaW5lKSAmJiBuZXh0ID09PSAnICcpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7IC8vIHN0YXJ0ZWQgd2l0aCAnW2EtMV0gIDonIGFuZCBjb250aW51ZWQgd2l0aCAnICdcbiAgICAgIH1cbiAgICAgIGlmIChyZm9vdG5vdGVsaW5rLnRlc3QobGluZSkgJiYgcHJldiA9PT0gJyAnICYmIHJzcGFjZW9ycXVvdGUudGVzdChuZXh0KSAmJiBvZmZzZXQgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7IC8vIHN0YXJ0ZWQgd2l0aCAnW2EtMV0gIDonIGFuZCBjb250aW51ZWQgd2l0aCAnICcsIG9yICdcIicsIG9uIHRoZSBsZWZ0XG4gICAgICB9XG4gICAgICBpZiAocmZvb3Rub3RlZnVsbC50ZXN0KGxpbmUpICYmIHJlbmQudGVzdChuZXh0KSkge1xuICAgICAgICByZXR1cm4gYWdhaW4oLTEpOyAvLyBzdGFydGVkIHdpdGggJ1thLTFdICA6IHNvbWV0aGluZyBcInNvbWV0aGluZ1wiJyBhbmQgY29udGludWVkIHdpdGggJycsICcgJywgb3IgJ1xcbidcbiAgICAgIH1cblxuICAgICAgLy8gdGhlIHRocmVlIGZvbGxvd2luZyBydWxlcyB0b2dldGhlciBoYW5kbGUgb3JkZXJlZCBsaXN0IGl0ZW1zOiAnXFxuMS4gZm9vXFxuMi4gYmFyJ1xuICAgICAgaWYgKChqdW1wcyB8fCByd2hpdGVzcGFjZS50ZXN0KGxpbmUpKSAmJiByYnVsbGV0YWZ0ZXIudGVzdChhbGwuc3Vic3RyKHApKSkge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTsgLy8gc3RhcnRlZCB3aXRoICcnLCAnXFxuJywgb3IgJyAgJyBhbmQgY29udGludWVkIHdpdGggJzEyMy4gJ1xuICAgICAgfVxuICAgICAgaWYgKHJidWxsZXRsZWZ0LnRlc3QobGluZSkgJiYgcmJ1bGxldHJpZ2h0LnRlc3QobmV4dCkpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7IC8vIHN0YXJ0ZWQgd2l0aCAnICAxMjMnIGFuZCBlbmRlZCBpbiAnNCcgb3IgJy4nXG4gICAgICB9XG4gICAgICBpZiAocmJ1bGxldGxpbmUudGVzdChsaW5lKSAmJiBuZXh0ID09PSAnICcpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7IC8vIHN0YXJ0ZWQgd2l0aCAnICAxMjMuJyBhbmQgZW5kZWQgd2l0aCAnICdcbiAgICAgIH1cblxuICAgICAgaWYgKHJhbmNob3JlZC50ZXN0KG5leHQpICYmIGp1bXBzKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpO1xuICAgICAgfVxuICAgICAgaWYgKHJhbmNob3JlZC50ZXN0KHByZXYpICYmIG5leHQgPT09ICcgJykge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0ID09PSBwcmV2ICYmIHJib3VuZGFyeS50ZXN0KG5leHQpKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpO1xuICAgICAgfVxuICAgICAgaWYgKHJoci50ZXN0KGxpbmUpICYmIG5leHQgPT09ICdcXG4nKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpO1xuICAgICAgfVxuICAgICAgaWYgKGFsbC5zdWJzdHIocCAtIDMsIDMpID09PSAnYGBgJyAmJiBvZmZzZXQgPT09IDEpIHsgLy8gaGFuZGxlcyAnYGBgamF2YXNjcmlwdFxcbmNvZGVcXG5gYGAnXG4gICAgICAgIHdoaWxlIChhbGxbcCAtIDFdICYmIGFsbFtwIC0gMV0gIT09ICdcXG4nKSB7XG4gICAgICAgICAgcCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcDtcblxuICAgICAgZnVuY3Rpb24gYWdhaW4gKG92ZXJyaWRlKSB7XG4gICAgICAgIHZhciBkaWZmID0gb3ZlcnJpZGUgfHwgb2Zmc2V0O1xuICAgICAgICByZXR1cm4gbW92ZShwICsgZGlmZiwgZGlmZiA+IDAgPyAxIDogLTEpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gYmFja3RyYWNlIChwLCBlZGdlKSB7XG4gICAgICAgIHZhciBsYXN0ID0gYWxsW3BdO1xuICAgICAgICB2YXIgdGV4dCA9ICcnO1xuICAgICAgICB3aGlsZSAobGFzdCAmJiBsYXN0ICE9PSBlZGdlKSB7XG4gICAgICAgICAgdGV4dCA9IGxhc3QgKyB0ZXh0O1xuICAgICAgICAgIGxhc3QgPSBhbGxbLS1wXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVIVE1MQ2h1bmtzIChjaHVua3MpIHtcbiAgICB2YXIgYWxsID0gY2h1bmtzLmJlZm9yZSArIGNodW5rcy5zZWxlY3Rpb24gKyBjaHVua3MuYWZ0ZXI7XG4gICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gY2h1bmtzLmJlZm9yZS5sZW5ndGg7XG4gICAgdmFyIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvblN0YXJ0ICsgY2h1bmtzLnNlbGVjdGlvbi5sZW5ndGg7XG4gICAgdmFyIGxlZnRDbG9zZSA9IGNodW5rcy5iZWZvcmUubGFzdEluZGV4T2YoJz4nKTtcbiAgICB2YXIgbGVmdE9wZW4gPSBjaHVua3MuYmVmb3JlLmxhc3RJbmRleE9mKCc8Jyk7XG4gICAgdmFyIHJpZ2h0Q2xvc2UgPSBjaHVua3MuYWZ0ZXIuaW5kZXhPZignPicpO1xuICAgIHZhciByaWdodE9wZW4gPSBjaHVua3MuYWZ0ZXIuaW5kZXhPZignPCcpO1xuICAgIHZhciBwcmV2T3BlbjtcbiAgICB2YXIgbmV4dENsb3NlO1xuICAgIHZhciBiYWxhbmNlVGFncztcblxuICAgIC8vIDxmb1tvXT5iYXI8L2Zvbz4gaW50byA8Zm9vPltdYmFyPC9mb28+LCA8Zm9bbz5iYV1yPC9mb28+IGludG8gPGZvbz5bYmFdcjwvZm9vPlxuICAgIGlmIChsZWZ0T3BlbiA+IGxlZnRDbG9zZSkge1xuICAgICAgbmV4dENsb3NlID0gYWxsLmluZGV4T2YoJz4nLCBsZWZ0Q2xvc2UgKyAxKTtcbiAgICAgIGlmIChuZXh0Q2xvc2UgIT09IC0xKSB7XG4gICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gbmV4dENsb3NlICsgMTtcbiAgICAgICAgYmFsYW5jZVRhZ3MgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIDxmb28+YmFyPC9bZm9dbz4gaW50byA8Zm9vPmJhcltdPC9mb28+LCA8Zm9vPmJbYXI8L2Zdb28+IGludG8gPGZvbz5iW2FyXTwvZm9vPlxuICAgIGlmIChyaWdodE9wZW4gPT09IC0xIHx8IHJpZ2h0T3BlbiA+IHJpZ2h0Q2xvc2UpIHtcbiAgICAgIHByZXZPcGVuID0gYWxsLnN1YnN0cigwLCBjaHVua3MuYmVmb3JlLmxlbmd0aCArIGNodW5rcy5zZWxlY3Rpb24ubGVuZ3RoICsgcmlnaHRDbG9zZSkubGFzdEluZGV4T2YoJzwnKTtcbiAgICAgIGlmIChwcmV2T3BlbiAhPT0gLTEpIHtcbiAgICAgICAgc2VsZWN0aW9uRW5kID0gcHJldk9wZW47XG4gICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gTWF0aC5taW4oc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgIGJhbGFuY2VUYWdzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3Rpb24oY2h1bmtzLCBhbGwsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQsIGJhbGFuY2VUYWdzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGlvbiAoY2h1bmtzLCBhbGwsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQsIGJhbGFuY2VUYWdzKSB7XG4gICAgaWYgKHNlbGVjdGlvbkVuZCA8IHNlbGVjdGlvblN0YXJ0KSB7XG4gICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25TdGFydDtcbiAgICB9XG4gICAgaWYgKGJhbGFuY2VUYWdzKSB7XG4gICAgICBjaHVua3MuYmVmb3JlID0gYWxsLnN1YnN0cigwLCBzZWxlY3Rpb25TdGFydCk7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gYWxsLnN1YnN0cihzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kIC0gc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgY2h1bmtzLmFmdGVyID0gYWxsLnN1YnN0cihzZWxlY3Rpb25FbmQpO1xuICAgIH1cbiAgICBjaHVua3Muc2VsZWN0aW9uID0gb3BlbiArIGNodW5rcy5zZWxlY3Rpb24gKyBjbG9zZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbWVtYmVyU2VsZWN0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2V0VGV4dCA9IHJlcXVpcmUoJy4vc2V0VGV4dCcpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuL3N0cmluZ3MnKTtcblxuZnVuY3Rpb24gY29tbWFuZHMgKGVsLCBpZCkge1xuICBzZXRUZXh0KGVsLCBzdHJpbmdzLmJ1dHRvbnNbaWRdIHx8IGlkKTtcbn1cblxuZnVuY3Rpb24gbW9kZXMgKGVsLCBpZCkge1xuICB2YXIgdGV4dHMgPSB7XG4gICAgbWFya2Rvd246ICdtXFx1MjE5MycsXG4gICAgd3lzaXd5ZzogJ3d5c2l3eWcnXG4gIH07XG4gIHNldFRleHQoZWwsIHRleHRzW2lkXSB8fCBpZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtb2RlczogbW9kZXMsXG4gIGNvbW1hbmRzOiBjb21tYW5kc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gc2V0VGV4dCAoZWwsIHZhbHVlKSB7XG4gIGVsLmlubmVyVGV4dCA9IGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VGV4dDtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBsYWNlaG9sZGVyczoge1xuICAgIGJvbGQ6ICdzdHJvbmcgdGV4dCcsXG4gICAgaXRhbGljOiAnZW1waGFzaXplZCB0ZXh0JyxcbiAgICBxdW90ZTogJ3F1b3RlZCB0ZXh0JyxcbiAgICBjb2RlOiAnY29kZSBnb2VzIGhlcmUnLFxuICAgIGxpc3RpdGVtOiAnbGlzdCBpdGVtJyxcbiAgICBoZWFkaW5nOiAnSGVhZGluZyBUZXh0JyxcbiAgICBsaW5rOiAnbGluayB0ZXh0JyxcbiAgICBpbWFnZTogJ2ltYWdlIGRlc2NyaXB0aW9uJyxcbiAgICBhdHRhY2htZW50OiAnYXR0YWNobWVudCBkZXNjcmlwdGlvbidcbiAgfSxcbiAgdGl0bGVzOiB7XG4gICAgYm9sZDogJ1N0cm9uZyA8c3Ryb25nPiBDdHJsK0InLFxuICAgIGl0YWxpYzogJ0VtcGhhc2lzIDxlbT4gQ3RybCtJJyxcbiAgICBxdW90ZTogJ0Jsb2NrcXVvdGUgPGJsb2NrcXVvdGU+IEN0cmwrSicsXG4gICAgY29kZTogJ0NvZGUgU2FtcGxlIDxwcmU+PGNvZGU+IEN0cmwrRScsXG4gICAgb2w6ICdOdW1iZXJlZCBMaXN0IDxvbD4gQ3RybCtPJyxcbiAgICB1bDogJ0J1bGxldGVkIExpc3QgPHVsPiBDdHJsK1UnLFxuICAgIGhlYWRpbmc6ICdIZWFkaW5nIDxoMT4sIDxoMj4sIC4uLiBDdHJsK0QnLFxuICAgIGxpbms6ICdIeXBlcmxpbmsgPGE+IEN0cmwrSycsXG4gICAgaW1hZ2U6ICdJbWFnZSA8aW1nPiBDdHJsK0cnLFxuICAgIGF0dGFjaG1lbnQ6ICdBdHRhY2htZW50IEN0cmwrU2hpZnQrSycsXG4gICAgbWFya2Rvd246ICdNYXJrZG93biBNb2RlIEN0cmwrTScsXG4gICAgaHRtbDogJ0hUTUwgTW9kZSBDdHJsK0gnLFxuICAgIHd5c2l3eWc6ICdQcmV2aWV3IE1vZGUgQ3RybCtQJ1xuICB9LFxuICBidXR0b25zOiB7XG4gICAgYm9sZDogJ0InLFxuICAgIGl0YWxpYzogJ0knLFxuICAgIHF1b3RlOiAnXFx1MjAxYycsXG4gICAgY29kZTogJzwvPicsXG4gICAgb2w6ICcxLicsXG4gICAgdWw6ICdcXHUyOUJGJyxcbiAgICBoZWFkaW5nOiAnVHQnLFxuICAgIGxpbms6ICdMaW5rJyxcbiAgICBpbWFnZTogJ0ltYWdlJyxcbiAgICBhdHRhY2htZW50OiAnQXR0YWNobWVudCcsXG4gICAgaHI6ICdcXHUyMWI1J1xuICB9LFxuICBwcm9tcHRzOiB7XG4gICAgbGluazoge1xuICAgICAgdGl0bGU6ICdJbnNlcnQgTGluaycsXG4gICAgICBkZXNjcmlwdGlvbjogJ1R5cGUgb3IgcGFzdGUgdGhlIHVybCB0byB5b3VyIGxpbmsnLFxuICAgICAgcGxhY2Vob2xkZXI6ICdodHRwOi8vZXhhbXBsZS5jb20vIFwidGl0bGVcIidcbiAgICB9LFxuICAgIGltYWdlOiB7XG4gICAgICB0aXRsZTogJ0luc2VydCBJbWFnZScsXG4gICAgICBkZXNjcmlwdGlvbjogJ0VudGVyIHRoZSB1cmwgdG8geW91ciBpbWFnZScsXG4gICAgICBwbGFjZWhvbGRlcjogJ2h0dHA6Ly9leGFtcGxlLmNvbS9wdWJsaWMvaW1hZ2UucG5nIFwidGl0bGVcIidcbiAgICB9LFxuICAgIGF0dGFjaG1lbnQ6IHtcbiAgICAgIHRpdGxlOiAnQXR0YWNoIEZpbGUnLFxuICAgICAgZGVzY3JpcHRpb246ICdFbnRlciB0aGUgdXJsIHRvIHlvdXIgYXR0YWNobWVudCcsXG4gICAgICBwbGFjZWhvbGRlcjogJ2h0dHA6Ly9leGFtcGxlLmNvbS9wdWJsaWMvcmVwb3J0LnBkZiBcInRpdGxlXCInXG4gICAgfSxcbiAgICB0eXBlczogJ1lvdSBjYW4gb25seSB1cGxvYWQgJyxcbiAgICBicm93c2U6ICdCcm93c2UuLi4nLFxuICAgIGRyb3BoaW50OiAnWW91IGNhbiBhbHNvIGRyYWcgZmlsZXMgZnJvbSB5b3VyIGNvbXB1dGVyIGFuZCBkcm9wIHRoZW0gaGVyZSEnLFxuICAgIGRyb3A6ICdEcm9wIHlvdXIgZmlsZSBoZXJlIHRvIGJlZ2luIHVwbG9hZC4uLicsXG4gICAgdXBsb2FkOiAnLCBvciB1cGxvYWQgYSBmaWxlJyxcbiAgICB1cGxvYWRpbmc6ICdVcGxvYWRpbmcgeW91ciBmaWxlLi4uJyxcbiAgICB1cGxvYWRmYWlsZWQ6ICdUaGUgdXBsb2FkIGZhaWxlZCEgVGhhdFxcJ3MgYWxsIHdlIGtub3cuJ1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vY2xhc3NlcycpO1xudmFyIGRyYWdDbGFzcyA9ICd3ay1kcmFnZ2luZyc7XG52YXIgZHJhZ0NsYXNzU3BlY2lmaWMgPSAnd2stY29udGFpbmVyLWRyYWdnaW5nJztcbnZhciByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5mdW5jdGlvbiB1cGxvYWRzIChjb250YWluZXIsIGRyb3BhcmVhLCBlZGl0b3IsIG9wdGlvbnMsIHJlbW92ZSkge1xuICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdkcmFnZW50ZXInLCBkcmFnZ2luZyk7XG4gIGNyb3NzdmVudFtvcF0ocm9vdCwgJ2RyYWdlbmQnLCBkcmFnc3RvcCk7XG4gIGNyb3NzdmVudFtvcF0ocm9vdCwgJ21vdXNlb3V0JywgZHJhZ3N0b3ApO1xuICBjcm9zc3ZlbnRbb3BdKGNvbnRhaW5lciwgJ2RyYWdvdmVyJywgaGFuZGxlRHJhZ092ZXIsIGZhbHNlKTtcbiAgY3Jvc3N2ZW50W29wXShkcm9wYXJlYSwgJ2Ryb3AnLCBoYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbiAgZnVuY3Rpb24gZHJhZ2dpbmcgKCkge1xuICAgIGNsYXNzZXMuYWRkKGRyb3BhcmVhLCBkcmFnQ2xhc3MpO1xuICAgIGNsYXNzZXMuYWRkKGRyb3BhcmVhLCBkcmFnQ2xhc3NTcGVjaWZpYyk7XG4gIH1cbiAgZnVuY3Rpb24gZHJhZ3N0b3AgKCkge1xuICAgIGRyYWdzdG9wcGVyKGRyb3BhcmVhKTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVEcmFnT3ZlciAoZSkge1xuICAgIHN0b3AoZSk7XG4gICAgZHJhZ2dpbmcoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZUZpbGVTZWxlY3QgKGUpIHtcbiAgICBkcmFnc3RvcCgpO1xuICAgIHN0b3AoZSk7XG4gICAgZWRpdG9yLnJ1bkNvbW1hbmQoZnVuY3Rpb24gcnVubmVyIChjaHVua3MsIG1vZGUpIHtcbiAgICAgIHZhciBmaWxlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgIHZhciB0eXBlID0gaW5mZXJUeXBlKGZpbGVzKTtcbiAgICAgIGVkaXRvci5saW5rT3JJbWFnZU9yQXR0YWNobWVudCh0eXBlLCBmaWxlcykuY2FsbCh0aGlzLCBtb2RlLCBjaHVua3MpO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGluZmVyVHlwZSAoZmlsZXMpIHtcbiAgICBpZiAob3B0aW9ucy5pbWFnZXMgJiYgIW9wdGlvbnMuYXR0YWNobWVudHMpIHtcbiAgICAgIHJldHVybiAnaW1hZ2UnO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuaW1hZ2VzICYmIG9wdGlvbnMuYXR0YWNobWVudHMpIHtcbiAgICAgIHJldHVybiAnYXR0YWNobWVudCc7XG4gICAgfVxuICAgIGlmIChmaWxlcy5ldmVyeShtYXRjaGVzKG9wdGlvbnMuaW1hZ2VzLnZhbGlkYXRlIHx8IG5ldmVyKSkpIHtcbiAgICAgIHJldHVybiAnaW1hZ2UnO1xuICAgIH1cbiAgICByZXR1cm4gJ2F0dGFjaG1lbnQnO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtYXRjaGVyIChmaWxlKSB7IHJldHVybiBmbihmaWxlKTsgfTtcbn1cbmZ1bmN0aW9uIG5ldmVyICgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gc3RvcCAoZSkge1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5mdW5jdGlvbiBkcmFnc3RvcHBlciAoZHJvcGFyZWEpIHtcbiAgY2xhc3Nlcy5ybShkcm9wYXJlYSwgZHJhZ0NsYXNzKTtcbiAgY2xhc3Nlcy5ybShkcm9wYXJlYSwgZHJhZ0NsYXNzU3BlY2lmaWMpO1xufVxuXG51cGxvYWRzLnN0b3AgPSBkcmFnc3RvcHBlcjtcbm1vZHVsZS5leHBvcnRzID0gdXBsb2FkcztcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGxzID0gcmVxdWlyZSgnbG9jYWwtc3RvcmFnZScpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGthbnllID0gcmVxdWlyZSgna2FueWUnKTtcbnZhciB1cGxvYWRzID0gcmVxdWlyZSgnLi91cGxvYWRzJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4vc3RyaW5ncycpO1xudmFyIHNldFRleHQgPSByZXF1aXJlKCcuL3NldFRleHQnKTtcbnZhciByZW1lbWJlclNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vcmVtZW1iZXJTZWxlY3Rpb24nKTtcbnZhciBiaW5kQ29tbWFuZHMgPSByZXF1aXJlKCcuL2JpbmRDb21tYW5kcycpO1xudmFyIElucHV0SGlzdG9yeSA9IHJlcXVpcmUoJy4vSW5wdXRIaXN0b3J5Jyk7XG52YXIgZ2V0Q29tbWFuZEhhbmRsZXIgPSByZXF1aXJlKCcuL2dldENvbW1hbmRIYW5kbGVyJyk7XG52YXIgZ2V0U3VyZmFjZSA9IHJlcXVpcmUoJy4vZ2V0U3VyZmFjZScpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL2NsYXNzZXMnKTtcbnZhciByZW5kZXJlcnMgPSByZXF1aXJlKCcuL3JlbmRlcmVycycpO1xudmFyIHhoclN0dWIgPSByZXF1aXJlKCcuL3hoclN0dWInKTtcbnZhciBwcm9tcHQgPSByZXF1aXJlKCcuL3Byb21wdHMvcHJvbXB0Jyk7XG52YXIgY2xvc2VQcm9tcHRzID0gcmVxdWlyZSgnLi9wcm9tcHRzL2Nsb3NlJyk7XG52YXIgbW9kZU5hbWVzID0gWydtYXJrZG93bicsICdodG1sJywgJ3d5c2l3eWcnXTtcbnZhciBjYWNoZSA9IFtdO1xudmFyIG1hYyA9IC9cXGJNYWMgT1NcXGIvLnRlc3QoZ2xvYmFsLm5hdmlnYXRvci51c2VyQWdlbnQpO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIHJwYXJhZ3JhcGggPSAvXjxwPjxcXC9wPlxcbj8kL2k7XG5cbmZ1bmN0aW9uIGZpbmQgKHRleHRhcmVhKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoY2FjaGVbaV0gJiYgY2FjaGVbaV0udGEgPT09IHRleHRhcmVhKSB7XG4gICAgICByZXR1cm4gY2FjaGVbaV0uZWRpdG9yO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gd29vZm1hcmsgKHRleHRhcmVhLCBvcHRpb25zKSB7XG4gIHZhciBjYWNoZWQgPSBmaW5kKHRleHRhcmVhKTtcbiAgaWYgKGNhY2hlZCkge1xuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cblxuICB2YXIgcGFyZW50ID0gdGV4dGFyZWEucGFyZW50RWxlbWVudDtcbiAgaWYgKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b29mbWFyayBkZW1hbmRzIDx0ZXh0YXJlYT4gZWxlbWVudHMgdG8gaGF2ZSBubyBzaWJsaW5ncycpO1xuICB9XG5cbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuICBpZiAoby5tYXJrZG93biA9PT0gdm9pZCAwKSB7IG8ubWFya2Rvd24gPSB0cnVlOyB9XG4gIGlmIChvLmh0bWwgPT09IHZvaWQgMCkgeyBvLmh0bWwgPSB0cnVlOyB9XG4gIGlmIChvLnd5c2l3eWcgPT09IHZvaWQgMCkgeyBvLnd5c2l3eWcgPSB0cnVlOyB9XG5cbiAgaWYgKCFvLm1hcmtkb3duICYmICFvLmh0bWwgJiYgIW8ud3lzaXd5Zykge1xuICAgIHRocm93IG5ldyBFcnJvcignd29vZm1hcmsgZXhwZWN0cyBhdCBsZWFzdCBvbmUgaW5wdXQgbW9kZSB0byBiZSBhdmFpbGFibGUnKTtcbiAgfVxuXG4gIGlmIChvLmhyID09PSB2b2lkIDApIHsgby5ociA9IGZhbHNlOyB9XG4gIGlmIChvLnN0b3JhZ2UgPT09IHZvaWQgMCkgeyBvLnN0b3JhZ2UgPSB0cnVlOyB9XG4gIGlmIChvLnN0b3JhZ2UgPT09IHRydWUpIHsgby5zdG9yYWdlID0gJ3dvb2ZtYXJrX2lucHV0X21vZGUnOyB9XG4gIGlmIChvLmZlbmNpbmcgPT09IHZvaWQgMCkgeyBvLmZlbmNpbmcgPSB0cnVlOyB9XG4gIGlmIChvLnJlbmRlciA9PT0gdm9pZCAwKSB7IG8ucmVuZGVyID0ge307IH1cbiAgaWYgKG8ucmVuZGVyLm1vZGVzID09PSB2b2lkIDApIHsgby5yZW5kZXIubW9kZXMgPSB7fTsgfVxuICBpZiAoby5yZW5kZXIuY29tbWFuZHMgPT09IHZvaWQgMCkgeyBvLnJlbmRlci5jb21tYW5kcyA9IHt9OyB9XG4gIGlmIChvLnByb21wdHMgPT09IHZvaWQgMCkgeyBvLnByb21wdHMgPSB7fTsgfVxuICBpZiAoby5wcm9tcHRzLmxpbmsgPT09IHZvaWQgMCkgeyBvLnByb21wdHMubGluayA9IHByb21wdDsgfVxuICBpZiAoby5wcm9tcHRzLmltYWdlID09PSB2b2lkIDApIHsgby5wcm9tcHRzLmltYWdlID0gcHJvbXB0OyB9XG4gIGlmIChvLnByb21wdHMuYXR0YWNobWVudCA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cy5hdHRhY2htZW50ID0gcHJvbXB0OyB9XG4gIGlmIChvLnByb21wdHMuY2xvc2UgPT09IHZvaWQgMCkgeyBvLnByb21wdHMuY2xvc2UgPSBjbG9zZVByb21wdHM7IH1cbiAgaWYgKG8ueGhyID09PSB2b2lkIDApIHsgby54aHIgPSB4aHJTdHViOyB9XG4gIGlmIChvLmNsYXNzZXMgPT09IHZvaWQgMCkgeyBvLmNsYXNzZXMgPSB7fTsgfVxuICBpZiAoby5jbGFzc2VzLnd5c2l3eWcgPT09IHZvaWQgMCkgeyBvLmNsYXNzZXMud3lzaXd5ZyA9IFtdOyB9XG4gIGlmIChvLmNsYXNzZXMucHJvbXB0cyA9PT0gdm9pZCAwKSB7IG8uY2xhc3Nlcy5wcm9tcHRzID0ge307IH1cbiAgaWYgKG8uY2xhc3Nlcy5pbnB1dCA9PT0gdm9pZCAwKSB7IG8uY2xhc3Nlcy5pbnB1dCA9IHt9OyB9XG5cbiAgdmFyIHByZWZlcmVuY2UgPSBvLnN0b3JhZ2UgJiYgbHMuZ2V0KG8uc3RvcmFnZSk7XG4gIGlmIChwcmVmZXJlbmNlKSB7XG4gICAgby5kZWZhdWx0TW9kZSA9IHByZWZlcmVuY2U7XG4gIH1cblxuICB2YXIgZHJvcGFyZWEgPSB0YWcoeyBjOiAnd2stY29udGFpbmVyLWRyb3AnIH0pO1xuICB2YXIgc3dpdGNoYm9hcmQgPSB0YWcoeyBjOiAnd2stc3dpdGNoYm9hcmQnIH0pO1xuICB2YXIgY29tbWFuZHMgPSB0YWcoeyBjOiAnd2stY29tbWFuZHMnIH0pO1xuICB2YXIgZWRpdGFibGUgPSB0YWcoeyBjOiBbJ3drLXd5c2l3eWcnLCAnd2staGlkZSddLmNvbmNhdChvLmNsYXNzZXMud3lzaXd5Zykuam9pbignICcpIH0pO1xuICB2YXIgc3VyZmFjZSA9IGdldFN1cmZhY2UodGV4dGFyZWEsIGVkaXRhYmxlLCBkcm9wYXJlYSk7XG4gIHZhciBoaXN0b3J5ID0gbmV3IElucHV0SGlzdG9yeShzdXJmYWNlLCAnbWFya2Rvd24nKTtcbiAgdmFyIGVkaXRvciA9IHtcbiAgICBhZGRDb21tYW5kOiBhZGRDb21tYW5kLFxuICAgIGFkZENvbW1hbmRCdXR0b246IGFkZENvbW1hbmRCdXR0b24sXG4gICAgcnVuQ29tbWFuZDogcnVuQ29tbWFuZCxcbiAgICBwYXJzZU1hcmtkb3duOiBvLnBhcnNlTWFya2Rvd24sXG4gICAgcGFyc2VIVE1MOiBvLnBhcnNlSFRNTCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHZhbHVlOiBnZXRNYXJrZG93bixcbiAgICB0ZXh0YXJlYTogdGV4dGFyZWEsXG4gICAgZWRpdGFibGU6IG8ud3lzaXd5ZyA/IGVkaXRhYmxlIDogbnVsbCxcbiAgICBzZXRNb2RlOiBwZXJzaXN0TW9kZSxcbiAgICBoaXN0b3J5OiB7XG4gICAgICB1bmRvOiBoaXN0b3J5LnVuZG8sXG4gICAgICByZWRvOiBoaXN0b3J5LnJlZG8sXG4gICAgICBjYW5VbmRvOiBoaXN0b3J5LmNhblVuZG8sXG4gICAgICBjYW5SZWRvOiBoaXN0b3J5LmNhblJlZG9cbiAgICB9LFxuICAgIG1vZGU6ICdtYXJrZG93bidcbiAgfTtcbiAgdmFyIGVudHJ5ID0geyB0YTogdGV4dGFyZWEsIGVkaXRvcjogZWRpdG9yIH07XG4gIHZhciBpID0gY2FjaGUucHVzaChlbnRyeSk7XG4gIHZhciBrYW55ZUNvbnRleHQgPSAnd29vZm1hcmtfJyArIGk7XG4gIHZhciBrYW55ZU9wdGlvbnMgPSB7XG4gICAgZmlsdGVyOiBwYXJlbnQsXG4gICAgY29udGV4dDoga2FueWVDb250ZXh0XG4gIH07XG4gIHZhciBtb2RlcyA9IHtcbiAgICBtYXJrZG93bjoge1xuICAgICAgYnV0dG9uOiB0YWcoeyB0OiAnYnV0dG9uJywgYzogJ3drLW1vZGUgd2stbW9kZS1hY3RpdmUnIH0pLFxuICAgICAgc2V0OiBtYXJrZG93bk1vZGVcbiAgICB9LFxuICAgIGh0bWw6IHtcbiAgICAgIGJ1dHRvbjogdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1tb2RlIHdrLW1vZGUtaW5hY3RpdmUnIH0pLFxuICAgICAgc2V0OiBodG1sTW9kZVxuICAgIH0sXG4gICAgd3lzaXd5Zzoge1xuICAgICAgYnV0dG9uOiB0YWcoeyB0OiAnYnV0dG9uJywgYzogJ3drLW1vZGUgd2stbW9kZS1pbmFjdGl2ZScgfSksXG4gICAgICBzZXQ6IHd5c2l3eWdNb2RlXG4gICAgfVxuICB9O1xuICB2YXIgcGxhY2U7XG5cbiAgdGFnKHsgdDogJ3NwYW4nLCBjOiAnd2stZHJvcC10ZXh0JywgeDogc3RyaW5ncy5wcm9tcHRzLmRyb3AsIHA6IGRyb3BhcmVhIH0pO1xuICB0YWcoeyB0OiAncCcsIGM6IFsnd2stZHJvcC1pY29uJ10uY29uY2F0KG8uY2xhc3Nlcy5kcm9waWNvbikuam9pbignICcpLCBwOiBkcm9wYXJlYSB9KTtcblxuICBlZGl0YWJsZS5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xuICBtb2Rlcy5tYXJrZG93bi5idXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICBtb2RlTmFtZXMuZm9yRWFjaChhZGRNb2RlKTtcblxuICBpZiAoby53eXNpd3lnKSB7XG4gICAgcGxhY2UgPSB0YWcoeyBjOiAnd2std3lzaXd5Zy1wbGFjZWhvbGRlciB3ay1oaWRlJywgeDogdGV4dGFyZWEucGxhY2Vob2xkZXIgfSk7XG4gICAgY3Jvc3N2ZW50LmFkZChwbGFjZSwgJ2NsaWNrJywgZm9jdXNFZGl0YWJsZSk7XG4gIH1cblxuICBpZiAoby5kZWZhdWx0TW9kZSAmJiBvW28uZGVmYXVsdE1vZGVdKSB7XG4gICAgbW9kZXNbby5kZWZhdWx0TW9kZV0uc2V0KCk7XG4gIH0gZWxzZSBpZiAoby5tYXJrZG93bikge1xuICAgIG1vZGVzLm1hcmtkb3duLnNldCgpO1xuICB9IGVsc2UgaWYgKG8uaHRtbCkge1xuICAgIG1vZGVzLmh0bWwuc2V0KCk7XG4gIH0gZWxzZSB7XG4gICAgbW9kZXMud3lzaXd5Zy5zZXQoKTtcbiAgfVxuXG4gIGJpbmRDb21tYW5kcyhzdXJmYWNlLCBvLCBlZGl0b3IpO1xuICBiaW5kRXZlbnRzKCk7XG5cbiAgcmV0dXJuIGVkaXRvcjtcblxuICBmdW5jdGlvbiBhZGRNb2RlIChpZCkge1xuICAgIHZhciBidXR0b24gPSBtb2Rlc1tpZF0uYnV0dG9uO1xuICAgIHZhciBjdXN0b20gPSBvLnJlbmRlci5tb2RlcztcbiAgICBpZiAob1tpZF0pIHtcbiAgICAgIHN3aXRjaGJvYXJkLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAodHlwZW9mIGN1c3RvbSA9PT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbSA6IHJlbmRlcmVycy5tb2RlcykoYnV0dG9uLCBpZCk7XG4gICAgICBjcm9zc3ZlbnQuYWRkKGJ1dHRvbiwgJ2NsaWNrJywgbW9kZXNbaWRdLnNldCk7XG4gICAgICBidXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgYnV0dG9uLnRhYkluZGV4ID0gLTE7XG5cbiAgICAgIHZhciB0aXRsZSA9IHN0cmluZ3MudGl0bGVzW2lkXTtcbiAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIG1hYyA/IG1hY2lmeSh0aXRsZSkgOiB0aXRsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYmluZEV2ZW50cyAocmVtb3ZlKSB7XG4gICAgdmFyIGFyID0gcmVtb3ZlID8gJ3JtJyA6ICdhZGQnO1xuICAgIHZhciBtb3YgPSByZW1vdmUgPyAncmVtb3ZlQ2hpbGQnIDogJ2FwcGVuZENoaWxkJztcbiAgICBpZiAocmVtb3ZlKSB7XG4gICAgICBrYW55ZS5jbGVhcihrYW55ZUNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoby5tYXJrZG93bikgeyBrYW55ZS5vbignY21kK20nLCBrYW55ZU9wdGlvbnMsIG1hcmtkb3duTW9kZSk7IH1cbiAgICAgIGlmIChvLmh0bWwpIHsga2FueWUub24oJ2NtZCtoJywga2FueWVPcHRpb25zLCBodG1sTW9kZSk7IH1cbiAgICAgIGlmIChvLnd5c2l3eWcpIHsga2FueWUub24oJ2NtZCtwJywga2FueWVPcHRpb25zLCB3eXNpd3lnTW9kZSk7IH1cbiAgICB9XG4gICAgY2xhc3Nlc1thcl0ocGFyZW50LCAnd2stY29udGFpbmVyJyk7XG4gICAgcGFyZW50W21vdl0oZWRpdGFibGUpO1xuICAgIGlmIChwbGFjZSkgeyBwYXJlbnRbbW92XShwbGFjZSk7IH1cbiAgICBwYXJlbnRbbW92XShjb21tYW5kcyk7XG4gICAgcGFyZW50W21vdl0oc3dpdGNoYm9hcmQpO1xuICAgIGlmICgoby5pbWFnZXMgfHwgby5hdHRhY2htZW50cykgJiYgby54aHIpIHtcbiAgICAgIHBhcmVudFttb3ZdKGRyb3BhcmVhKTtcbiAgICAgIHVwbG9hZHMocGFyZW50LCBkcm9wYXJlYSwgZWRpdG9yLCBvLCByZW1vdmUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGlmIChlZGl0b3IubW9kZSAhPT0gJ21hcmtkb3duJykge1xuICAgICAgdGV4dGFyZWEudmFsdWUgPSBnZXRNYXJrZG93bigpO1xuICAgIH1cbiAgICBjbGFzc2VzLnJtKHRleHRhcmVhLCAnd2staGlkZScpO1xuICAgIGJpbmRFdmVudHModHJ1ZSk7XG4gICAgZGVsZXRlIGNhY2hlW2kgLSAxXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcmtkb3duTW9kZSAoZSkgeyBwZXJzaXN0TW9kZSgnbWFya2Rvd24nLCBlKTsgfVxuICBmdW5jdGlvbiBodG1sTW9kZSAoZSkgeyBwZXJzaXN0TW9kZSgnaHRtbCcsIGUpOyB9XG4gIGZ1bmN0aW9uIHd5c2l3eWdNb2RlIChlKSB7IHBlcnNpc3RNb2RlKCd3eXNpd3lnJywgZSk7IH1cblxuICBmdW5jdGlvbiBwZXJzaXN0TW9kZSAobmV4dE1vZGUsIGUpIHtcbiAgICB2YXIgcmVzdG9yZVNlbGVjdGlvbjtcbiAgICB2YXIgY3VycmVudE1vZGUgPSBlZGl0b3IubW9kZTtcbiAgICB2YXIgb2xkID0gbW9kZXNbY3VycmVudE1vZGVdLmJ1dHRvbjtcbiAgICB2YXIgYnV0dG9uID0gbW9kZXNbbmV4dE1vZGVdLmJ1dHRvbjtcbiAgICB2YXIgZm9jdXNpbmcgPSAhIWUgfHwgZG9jLmFjdGl2ZUVsZW1lbnQgPT09IHRleHRhcmVhIHx8IGRvYy5hY3RpdmVFbGVtZW50ID09PSBlZGl0YWJsZTtcblxuICAgIHN0b3AoZSk7XG5cbiAgICBpZiAoY3VycmVudE1vZGUgPT09IG5leHRNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVzdG9yZVNlbGVjdGlvbiA9IGZvY3VzaW5nICYmIHJlbWVtYmVyU2VsZWN0aW9uKGhpc3RvcnksIG8pO1xuICAgIHRleHRhcmVhLmJsdXIoKTsgLy8gYXZlcnQgY2hyb21lIHJlcGFpbnQgYnVnc1xuXG4gICAgaWYgKG5leHRNb2RlID09PSAnbWFya2Rvd24nKSB7XG4gICAgICBpZiAoY3VycmVudE1vZGUgPT09ICdodG1sJykge1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IG8ucGFyc2VIVE1MKHRleHRhcmVhLnZhbHVlKS50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IG8ucGFyc2VIVE1MKGVkaXRhYmxlKS50cmltKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuZXh0TW9kZSA9PT0gJ2h0bWwnKSB7XG4gICAgICBpZiAoY3VycmVudE1vZGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBvLnBhcnNlTWFya2Rvd24odGV4dGFyZWEudmFsdWUpLnRyaW0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gZWRpdGFibGUuaW5uZXJIVE1MLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5leHRNb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIGlmIChjdXJyZW50TW9kZSA9PT0gJ21hcmtkb3duJykge1xuICAgICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSBvLnBhcnNlTWFya2Rvd24odGV4dGFyZWEudmFsdWUpLnJlcGxhY2UocnBhcmFncmFwaCwgJycpLnRyaW0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRhYmxlLmlubmVySFRNTCA9IHRleHRhcmVhLnZhbHVlLnJlcGxhY2UocnBhcmFncmFwaCwgJycpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobmV4dE1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgY2xhc3Nlcy5hZGQodGV4dGFyZWEsICd3ay1oaWRlJyk7XG4gICAgICBjbGFzc2VzLnJtKGVkaXRhYmxlLCAnd2staGlkZScpO1xuICAgICAgaWYgKHBsYWNlKSB7IGNsYXNzZXMucm0ocGxhY2UsICd3ay1oaWRlJyk7IH1cbiAgICAgIGlmIChmb2N1c2luZykgeyBzZXRUaW1lb3V0KGZvY3VzRWRpdGFibGUsIDApOyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYXNzZXMucm0odGV4dGFyZWEsICd3ay1oaWRlJyk7XG4gICAgICBjbGFzc2VzLmFkZChlZGl0YWJsZSwgJ3drLWhpZGUnKTtcbiAgICAgIGlmIChwbGFjZSkgeyBjbGFzc2VzLmFkZChwbGFjZSwgJ3drLWhpZGUnKTsgfVxuICAgICAgaWYgKGZvY3VzaW5nKSB7IHRleHRhcmVhLmZvY3VzKCk7IH1cbiAgICB9XG4gICAgY2xhc3Nlcy5hZGQoYnV0dG9uLCAnd2stbW9kZS1hY3RpdmUnKTtcbiAgICBjbGFzc2VzLnJtKG9sZCwgJ3drLW1vZGUtYWN0aXZlJyk7XG4gICAgY2xhc3Nlcy5hZGQob2xkLCAnd2stbW9kZS1pbmFjdGl2ZScpO1xuICAgIGNsYXNzZXMucm0oYnV0dG9uLCAnd2stbW9kZS1pbmFjdGl2ZScpO1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgb2xkLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICBlZGl0b3IubW9kZSA9IG5leHRNb2RlO1xuXG4gICAgaWYgKG8uc3RvcmFnZSkgeyBscy5zZXQoby5zdG9yYWdlLCBuZXh0TW9kZSk7IH1cblxuICAgIGhpc3Rvcnkuc2V0SW5wdXRNb2RlKG5leHRNb2RlKTtcbiAgICBpZiAocmVzdG9yZVNlbGVjdGlvbikgeyByZXN0b3JlU2VsZWN0aW9uKCk7IH1cbiAgICBmaXJlTGF0ZXIoJ3dvb2ZtYXJrLW1vZGUtY2hhbmdlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBmaXJlTGF0ZXIgKHR5cGUpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIGZpcmUgKCkge1xuICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZSh0ZXh0YXJlYSwgdHlwZSk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBmdW5jdGlvbiBmb2N1c0VkaXRhYmxlICgpIHtcbiAgICBlZGl0YWJsZS5mb2N1cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWFya2Rvd24gKCkge1xuICAgIGlmIChlZGl0b3IubW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICByZXR1cm4gby5wYXJzZUhUTUwoZWRpdGFibGUpO1xuICAgIH1cbiAgICBpZiAoZWRpdG9yLm1vZGUgPT09ICdodG1sJykge1xuICAgICAgcmV0dXJuIG8ucGFyc2VIVE1MKHRleHRhcmVhLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ29tbWFuZEJ1dHRvbiAoaWQsIGNvbWJvLCBmbikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICBmbiA9IGNvbWJvO1xuICAgICAgY29tYm8gPSBudWxsO1xuICAgIH1cbiAgICB2YXIgYnV0dG9uID0gdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1jb21tYW5kJywgcDogY29tbWFuZHMgfSk7XG4gICAgdmFyIGN1c3RvbSA9IG8ucmVuZGVyLmNvbW1hbmRzO1xuICAgIHZhciByZW5kZXIgPSB0eXBlb2YgY3VzdG9tID09PSAnZnVuY3Rpb24nID8gY3VzdG9tIDogcmVuZGVyZXJzLmNvbW1hbmRzO1xuICAgIHZhciB0aXRsZSA9IHN0cmluZ3MudGl0bGVzW2lkXTtcbiAgICBpZiAodGl0bGUpIHtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgbWFjID8gbWFjaWZ5KHRpdGxlKSA6IHRpdGxlKTtcbiAgICB9XG4gICAgYnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICBidXR0b24udGFiSW5kZXggPSAtMTtcbiAgICByZW5kZXIoYnV0dG9uLCBpZCk7XG4gICAgY3Jvc3N2ZW50LmFkZChidXR0b24sICdjbGljaycsIGdldENvbW1hbmRIYW5kbGVyKHN1cmZhY2UsIGhpc3RvcnksIGZuKSk7XG4gICAgaWYgKGNvbWJvKSB7XG4gICAgICBhZGRDb21tYW5kKGNvbWJvLCBmbik7XG4gICAgfVxuICAgIHJldHVybiBidXR0b247XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDb21tYW5kIChjb21ibywgZm4pIHtcbiAgICBrYW55ZS5vbihjb21ibywga2FueWVPcHRpb25zLCBnZXRDb21tYW5kSGFuZGxlcihzdXJmYWNlLCBoaXN0b3J5LCBmbikpO1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuQ29tbWFuZCAoZm4pIHtcbiAgICBnZXRDb21tYW5kSGFuZGxlcihzdXJmYWNlLCBoaXN0b3J5LCByZWFycmFuZ2UpKG51bGwpO1xuICAgIGZ1bmN0aW9uIHJlYXJyYW5nZSAoZSwgbW9kZSwgY2h1bmtzKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBjaHVua3MsIG1vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB0YWcgKG9wdGlvbnMpIHtcbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgZWwgPSBkb2MuY3JlYXRlRWxlbWVudChvLnQgfHwgJ2RpdicpO1xuICBlbC5jbGFzc05hbWUgPSBvLmMgfHwgJyc7XG4gIHNldFRleHQoZWwsIG8ueCB8fCAnJyk7XG4gIGlmIChvLnApIHsgby5wLmFwcGVuZENoaWxkKGVsKTsgfVxuICByZXR1cm4gZWw7XG59XG5cbmZ1bmN0aW9uIHN0b3AgKGUpIHtcbiAgaWYgKGUpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyB9XG59XG5cbmZ1bmN0aW9uIG1hY2lmeSAodGV4dCkge1xuICByZXR1cm4gdGV4dFxuICAgIC5yZXBsYWNlKC9cXGJjdHJsXFxiL2ksICdcXHUyMzE4JylcbiAgICAucmVwbGFjZSgvXFxiYWx0XFxiL2ksICdcXHUyMzI1JylcbiAgICAucmVwbGFjZSgvXFxic2hpZnRcXGIvaSwgJ1xcdTIxZTcnKTtcbn1cblxud29vZm1hcmsuZmluZCA9IGZpbmQ7XG53b29mbWFyay5zdHJpbmdzID0gc3RyaW5ncztcbm1vZHVsZS5leHBvcnRzID0gd29vZm1hcms7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OTNiMjltYldGeWF5NXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQnNjeUE5SUhKbGNYVnBjbVVvSjJ4dlkyRnNMWE4wYjNKaFoyVW5LVHRjYm5aaGNpQmpjbTl6YzNabGJuUWdQU0J5WlhGMWFYSmxLQ2RqY205emMzWmxiblFuS1R0Y2JuWmhjaUJyWVc1NVpTQTlJSEpsY1hWcGNtVW9KMnRoYm5sbEp5azdYRzUyWVhJZ2RYQnNiMkZrY3lBOUlISmxjWFZwY21Vb0p5NHZkWEJzYjJGa2N5Y3BPMXh1ZG1GeUlITjBjbWx1WjNNZ1BTQnlaWEYxYVhKbEtDY3VMM04wY21sdVozTW5LVHRjYm5aaGNpQnpaWFJVWlhoMElEMGdjbVZ4ZFdseVpTZ25MaTl6WlhSVVpYaDBKeWs3WEc1MllYSWdjbVZ0WlcxaVpYSlRaV3hsWTNScGIyNGdQU0J5WlhGMWFYSmxLQ2N1TDNKbGJXVnRZbVZ5VTJWc1pXTjBhVzl1SnlrN1hHNTJZWElnWW1sdVpFTnZiVzFoYm1SeklEMGdjbVZ4ZFdseVpTZ25MaTlpYVc1a1EyOXRiV0Z1WkhNbktUdGNiblpoY2lCSmJuQjFkRWhwYzNSdmNua2dQU0J5WlhGMWFYSmxLQ2N1TDBsdWNIVjBTR2x6ZEc5eWVTY3BPMXh1ZG1GeUlHZGxkRU52YlcxaGJtUklZVzVrYkdWeUlEMGdjbVZ4ZFdseVpTZ25MaTluWlhSRGIyMXRZVzVrU0dGdVpHeGxjaWNwTzF4dWRtRnlJR2RsZEZOMWNtWmhZMlVnUFNCeVpYRjFhWEpsS0NjdUwyZGxkRk4xY21aaFkyVW5LVHRjYm5aaGNpQmpiR0Z6YzJWeklEMGdjbVZ4ZFdseVpTZ25MaTlqYkdGemMyVnpKeWs3WEc1MllYSWdjbVZ1WkdWeVpYSnpJRDBnY21WeGRXbHlaU2duTGk5eVpXNWtaWEpsY25NbktUdGNiblpoY2lCNGFISlRkSFZpSUQwZ2NtVnhkV2x5WlNnbkxpOTRhSEpUZEhWaUp5azdYRzUyWVhJZ2NISnZiWEIwSUQwZ2NtVnhkV2x5WlNnbkxpOXdjbTl0Y0hSekwzQnliMjF3ZENjcE8xeHVkbUZ5SUdOc2IzTmxVSEp2YlhCMGN5QTlJSEpsY1hWcGNtVW9KeTR2Y0hKdmJYQjBjeTlqYkc5elpTY3BPMXh1ZG1GeUlHMXZaR1ZPWVcxbGN5QTlJRnNuYldGeWEyUnZkMjRuTENBbmFIUnRiQ2NzSUNkM2VYTnBkM2xuSjEwN1hHNTJZWElnWTJGamFHVWdQU0JiWFR0Y2JuWmhjaUJ0WVdNZ1BTQXZYRnhpVFdGaklFOVRYRnhpTHk1MFpYTjBLR2RzYjJKaGJDNXVZWFpwWjJGMGIzSXVkWE5sY2tGblpXNTBLVHRjYm5aaGNpQmtiMk1nUFNCa2IyTjFiV1Z1ZER0Y2JuWmhjaUJ5Y0dGeVlXZHlZWEJvSUQwZ0wxNDhjRDQ4WEZ3dmNENWNYRzQvSkM5cE8xeHVYRzVtZFc1amRHbHZiaUJtYVc1a0lDaDBaWGgwWVhKbFlTa2dlMXh1SUNCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHTmhZMmhsTG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2FXWWdLR05oWTJobFcybGRJQ1ltSUdOaFkyaGxXMmxkTG5SaElEMDlQU0IwWlhoMFlYSmxZU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR05oWTJobFcybGRMbVZrYVhSdmNqdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2NtVjBkWEp1SUc1MWJHdzdYRzU5WEc1Y2JtWjFibU4wYVc5dUlIZHZiMlp0WVhKcklDaDBaWGgwWVhKbFlTd2diM0IwYVc5dWN5a2dlMXh1SUNCMllYSWdZMkZqYUdWa0lEMGdabWx1WkNoMFpYaDBZWEpsWVNrN1hHNGdJR2xtSUNoallXTm9aV1FwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdZMkZqYUdWa08xeHVJQ0I5WEc1Y2JpQWdkbUZ5SUhCaGNtVnVkQ0E5SUhSbGVIUmhjbVZoTG5CaGNtVnVkRVZzWlcxbGJuUTdYRzRnSUdsbUlDaHdZWEpsYm5RdVkyaHBiR1J5Wlc0dWJHVnVaM1JvSUQ0Z01Ta2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnbmQyOXZabTFoY21zZ1pHVnRZVzVrY3lBOGRHVjRkR0Z5WldFK0lHVnNaVzFsYm5SeklIUnZJR2hoZG1VZ2JtOGdjMmxpYkdsdVozTW5LVHRjYmlBZ2ZWeHVYRzRnSUhaaGNpQnZJRDBnYjNCMGFXOXVjeUI4ZkNCN2ZUdGNiaUFnYVdZZ0tHOHViV0Z5YTJSdmQyNGdQVDA5SUhadmFXUWdNQ2tnZXlCdkxtMWhjbXRrYjNkdUlEMGdkSEoxWlRzZ2ZWeHVJQ0JwWmlBb2J5NW9kRzFzSUQwOVBTQjJiMmxrSURBcElIc2dieTVvZEcxc0lEMGdkSEoxWlRzZ2ZWeHVJQ0JwWmlBb2J5NTNlWE5wZDNsbklEMDlQU0IyYjJsa0lEQXBJSHNnYnk1M2VYTnBkM2xuSUQwZ2RISjFaVHNnZlZ4dVhHNGdJR2xtSUNnaGJ5NXRZWEpyWkc5M2JpQW1KaUFoYnk1b2RHMXNJQ1ltSUNGdkxuZDVjMmwzZVdjcElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjNkdmIyWnRZWEpySUdWNGNHVmpkSE1nWVhRZ2JHVmhjM1FnYjI1bElHbHVjSFYwSUcxdlpHVWdkRzhnWW1VZ1lYWmhhV3hoWW14bEp5azdYRzRnSUgxY2JseHVJQ0JwWmlBb2J5NW9jaUE5UFQwZ2RtOXBaQ0F3S1NCN0lHOHVhSElnUFNCbVlXeHpaVHNnZlZ4dUlDQnBaaUFvYnk1emRHOXlZV2RsSUQwOVBTQjJiMmxrSURBcElIc2dieTV6ZEc5eVlXZGxJRDBnZEhKMVpUc2dmVnh1SUNCcFppQW9ieTV6ZEc5eVlXZGxJRDA5UFNCMGNuVmxLU0I3SUc4dWMzUnZjbUZuWlNBOUlDZDNiMjltYldGeWExOXBibkIxZEY5dGIyUmxKenNnZlZ4dUlDQnBaaUFvYnk1bVpXNWphVzVuSUQwOVBTQjJiMmxrSURBcElIc2dieTVtWlc1amFXNW5JRDBnZEhKMVpUc2dmVnh1SUNCcFppQW9ieTV5Wlc1a1pYSWdQVDA5SUhadmFXUWdNQ2tnZXlCdkxuSmxibVJsY2lBOUlIdDlPeUI5WEc0Z0lHbG1JQ2h2TG5KbGJtUmxjaTV0YjJSbGN5QTlQVDBnZG05cFpDQXdLU0I3SUc4dWNtVnVaR1Z5TG0xdlpHVnpJRDBnZTMwN0lIMWNiaUFnYVdZZ0tHOHVjbVZ1WkdWeUxtTnZiVzFoYm1SeklEMDlQU0IyYjJsa0lEQXBJSHNnYnk1eVpXNWtaWEl1WTI5dGJXRnVaSE1nUFNCN2ZUc2dmVnh1SUNCcFppQW9ieTV3Y205dGNIUnpJRDA5UFNCMmIybGtJREFwSUhzZ2J5NXdjbTl0Y0hSeklEMGdlMzA3SUgxY2JpQWdhV1lnS0c4dWNISnZiWEIwY3k1c2FXNXJJRDA5UFNCMmIybGtJREFwSUhzZ2J5NXdjbTl0Y0hSekxteHBibXNnUFNCd2NtOXRjSFE3SUgxY2JpQWdhV1lnS0c4dWNISnZiWEIwY3k1cGJXRm5aU0E5UFQwZ2RtOXBaQ0F3S1NCN0lHOHVjSEp2YlhCMGN5NXBiV0ZuWlNBOUlIQnliMjF3ZERzZ2ZWeHVJQ0JwWmlBb2J5NXdjbTl0Y0hSekxtRjBkR0ZqYUcxbGJuUWdQVDA5SUhadmFXUWdNQ2tnZXlCdkxuQnliMjF3ZEhNdVlYUjBZV05vYldWdWRDQTlJSEJ5YjIxd2REc2dmVnh1SUNCcFppQW9ieTV3Y205dGNIUnpMbU5zYjNObElEMDlQU0IyYjJsa0lEQXBJSHNnYnk1d2NtOXRjSFJ6TG1Oc2IzTmxJRDBnWTJ4dmMyVlFjbTl0Y0hSek95QjlYRzRnSUdsbUlDaHZMbmhvY2lBOVBUMGdkbTlwWkNBd0tTQjdJRzh1ZUdoeUlEMGdlR2h5VTNSMVlqc2dmVnh1SUNCcFppQW9ieTVqYkdGemMyVnpJRDA5UFNCMmIybGtJREFwSUhzZ2J5NWpiR0Z6YzJWeklEMGdlMzA3SUgxY2JpQWdhV1lnS0c4dVkyeGhjM05sY3k1M2VYTnBkM2xuSUQwOVBTQjJiMmxrSURBcElIc2dieTVqYkdGemMyVnpMbmQ1YzJsM2VXY2dQU0JiWFRzZ2ZWeHVJQ0JwWmlBb2J5NWpiR0Z6YzJWekxuQnliMjF3ZEhNZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG1Oc1lYTnpaWE11Y0hKdmJYQjBjeUE5SUh0OU95QjlYRzRnSUdsbUlDaHZMbU5zWVhOelpYTXVhVzV3ZFhRZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG1Oc1lYTnpaWE11YVc1d2RYUWdQU0I3ZlRzZ2ZWeHVYRzRnSUhaaGNpQndjbVZtWlhKbGJtTmxJRDBnYnk1emRHOXlZV2RsSUNZbUlHeHpMbWRsZENodkxuTjBiM0poWjJVcE8xeHVJQ0JwWmlBb2NISmxabVZ5Wlc1alpTa2dlMXh1SUNBZ0lHOHVaR1ZtWVhWc2RFMXZaR1VnUFNCd2NtVm1aWEpsYm1ObE8xeHVJQ0I5WEc1Y2JpQWdkbUZ5SUdSeWIzQmhjbVZoSUQwZ2RHRm5LSHNnWXpvZ0ozZHJMV052Ym5SaGFXNWxjaTFrY205d0p5QjlLVHRjYmlBZ2RtRnlJSE4zYVhSamFHSnZZWEprSUQwZ2RHRm5LSHNnWXpvZ0ozZHJMWE4zYVhSamFHSnZZWEprSnlCOUtUdGNiaUFnZG1GeUlHTnZiVzFoYm1SeklEMGdkR0ZuS0hzZ1l6b2dKM2RyTFdOdmJXMWhibVJ6SnlCOUtUdGNiaUFnZG1GeUlHVmthWFJoWW14bElEMGdkR0ZuS0hzZ1l6b2dXeWQzYXkxM2VYTnBkM2xuSnl3Z0ozZHJMV2hwWkdVblhTNWpiMjVqWVhRb2J5NWpiR0Z6YzJWekxuZDVjMmwzZVdjcExtcHZhVzRvSnlBbktTQjlLVHRjYmlBZ2RtRnlJSE4xY21aaFkyVWdQU0JuWlhSVGRYSm1ZV05sS0hSbGVIUmhjbVZoTENCbFpHbDBZV0pzWlN3Z1pISnZjR0Z5WldFcE8xeHVJQ0IyWVhJZ2FHbHpkRzl5ZVNBOUlHNWxkeUJKYm5CMWRFaHBjM1J2Y25rb2MzVnlabUZqWlN3Z0oyMWhjbXRrYjNkdUp5azdYRzRnSUhaaGNpQmxaR2wwYjNJZ1BTQjdYRzRnSUNBZ1lXUmtRMjl0YldGdVpEb2dZV1JrUTI5dGJXRnVaQ3hjYmlBZ0lDQmhaR1JEYjIxdFlXNWtRblYwZEc5dU9pQmhaR1JEYjIxdFlXNWtRblYwZEc5dUxGeHVJQ0FnSUhKMWJrTnZiVzFoYm1RNklISjFia052YlcxaGJtUXNYRzRnSUNBZ2NHRnljMlZOWVhKclpHOTNiam9nYnk1d1lYSnpaVTFoY210a2IzZHVMRnh1SUNBZ0lIQmhjbk5sU0ZSTlREb2dieTV3WVhKelpVaFVUVXdzWEc0Z0lDQWdaR1Z6ZEhKdmVUb2daR1Z6ZEhKdmVTeGNiaUFnSUNCMllXeDFaVG9nWjJWMFRXRnlhMlJ2ZDI0c1hHNGdJQ0FnZEdWNGRHRnlaV0U2SUhSbGVIUmhjbVZoTEZ4dUlDQWdJR1ZrYVhSaFlteGxPaUJ2TG5kNWMybDNlV2NnUHlCbFpHbDBZV0pzWlNBNklHNTFiR3dzWEc0Z0lDQWdjMlYwVFc5a1pUb2djR1Z5YzJsemRFMXZaR1VzWEc0Z0lDQWdhR2x6ZEc5eWVUb2dlMXh1SUNBZ0lDQWdkVzVrYnpvZ2FHbHpkRzl5ZVM1MWJtUnZMRnh1SUNBZ0lDQWdjbVZrYnpvZ2FHbHpkRzl5ZVM1eVpXUnZMRnh1SUNBZ0lDQWdZMkZ1Vlc1a2J6b2dhR2x6ZEc5eWVTNWpZVzVWYm1SdkxGeHVJQ0FnSUNBZ1kyRnVVbVZrYnpvZ2FHbHpkRzl5ZVM1allXNVNaV1J2WEc0Z0lDQWdmU3hjYmlBZ0lDQnRiMlJsT2lBbmJXRnlhMlJ2ZDI0blhHNGdJSDA3WEc0Z0lIWmhjaUJsYm5SeWVTQTlJSHNnZEdFNklIUmxlSFJoY21WaExDQmxaR2wwYjNJNklHVmthWFJ2Y2lCOU8xeHVJQ0IyWVhJZ2FTQTlJR05oWTJobExuQjFjMmdvWlc1MGNua3BPMXh1SUNCMllYSWdhMkZ1ZVdWRGIyNTBaWGgwSUQwZ0ozZHZiMlp0WVhKclh5Y2dLeUJwTzF4dUlDQjJZWElnYTJGdWVXVlBjSFJwYjI1eklEMGdlMXh1SUNBZ0lHWnBiSFJsY2pvZ2NHRnlaVzUwTEZ4dUlDQWdJR052Ym5SbGVIUTZJR3RoYm5sbFEyOXVkR1Y0ZEZ4dUlDQjlPMXh1SUNCMllYSWdiVzlrWlhNZ1BTQjdYRzRnSUNBZ2JXRnlhMlJ2ZDI0NklIdGNiaUFnSUNBZ0lHSjFkSFJ2YmpvZ2RHRm5LSHNnZERvZ0oySjFkSFJ2Ymljc0lHTTZJQ2QzYXkxdGIyUmxJSGRyTFcxdlpHVXRZV04wYVhabEp5QjlLU3hjYmlBZ0lDQWdJSE5sZERvZ2JXRnlhMlJ2ZDI1TmIyUmxYRzRnSUNBZ2ZTeGNiaUFnSUNCb2RHMXNPaUI3WEc0Z0lDQWdJQ0JpZFhSMGIyNDZJSFJoWnloN0lIUTZJQ2RpZFhSMGIyNG5MQ0JqT2lBbmQyc3RiVzlrWlNCM2F5MXRiMlJsTFdsdVlXTjBhWFpsSnlCOUtTeGNiaUFnSUNBZ0lITmxkRG9nYUhSdGJFMXZaR1ZjYmlBZ0lDQjlMRnh1SUNBZ0lIZDVjMmwzZVdjNklIdGNiaUFnSUNBZ0lHSjFkSFJ2YmpvZ2RHRm5LSHNnZERvZ0oySjFkSFJ2Ymljc0lHTTZJQ2QzYXkxdGIyUmxJSGRyTFcxdlpHVXRhVzVoWTNScGRtVW5JSDBwTEZ4dUlDQWdJQ0FnYzJWME9pQjNlWE5wZDNsblRXOWtaVnh1SUNBZ0lIMWNiaUFnZlR0Y2JpQWdkbUZ5SUhCc1lXTmxPMXh1WEc0Z0lIUmhaeWg3SUhRNklDZHpjR0Z1Snl3Z1l6b2dKM2RyTFdSeWIzQXRkR1Y0ZENjc0lIZzZJSE4wY21sdVozTXVjSEp2YlhCMGN5NWtjbTl3TENCd09pQmtjbTl3WVhKbFlTQjlLVHRjYmlBZ2RHRm5LSHNnZERvZ0ozQW5MQ0JqT2lCYkozZHJMV1J5YjNBdGFXTnZiaWRkTG1OdmJtTmhkQ2h2TG1Oc1lYTnpaWE11WkhKdmNHbGpiMjRwTG1wdmFXNG9KeUFuS1N3Z2NEb2daSEp2Y0dGeVpXRWdmU2s3WEc1Y2JpQWdaV1JwZEdGaWJHVXVZMjl1ZEdWdWRFVmthWFJoWW14bElEMGdkSEoxWlR0Y2JpQWdiVzlrWlhNdWJXRnlhMlJ2ZDI0dVluVjBkRzl1TG5ObGRFRjBkSEpwWW5WMFpTZ25aR2x6WVdKc1pXUW5MQ0FuWkdsellXSnNaV1FuS1R0Y2JpQWdiVzlrWlU1aGJXVnpMbVp2Y2tWaFkyZ29ZV1JrVFc5a1pTazdYRzVjYmlBZ2FXWWdLRzh1ZDNsemFYZDVaeWtnZTF4dUlDQWdJSEJzWVdObElEMGdkR0ZuS0hzZ1l6b2dKM2RyTFhkNWMybDNlV2N0Y0d4aFkyVm9iMnhrWlhJZ2Qyc3RhR2xrWlNjc0lIZzZJSFJsZUhSaGNtVmhMbkJzWVdObGFHOXNaR1Z5SUgwcE8xeHVJQ0FnSUdOeWIzTnpkbVZ1ZEM1aFpHUW9jR3hoWTJVc0lDZGpiR2xqYXljc0lHWnZZM1Z6UldScGRHRmliR1VwTzF4dUlDQjlYRzVjYmlBZ2FXWWdLRzh1WkdWbVlYVnNkRTF2WkdVZ0ppWWdiMXR2TG1SbFptRjFiSFJOYjJSbFhTa2dlMXh1SUNBZ0lHMXZaR1Z6VzI4dVpHVm1ZWFZzZEUxdlpHVmRMbk5sZENncE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0c4dWJXRnlhMlJ2ZDI0cElIdGNiaUFnSUNCdGIyUmxjeTV0WVhKclpHOTNiaTV6WlhRb0tUdGNiaUFnZlNCbGJITmxJR2xtSUNodkxtaDBiV3dwSUh0Y2JpQWdJQ0J0YjJSbGN5NW9kRzFzTG5ObGRDZ3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJRzF2WkdWekxuZDVjMmwzZVdjdWMyVjBLQ2s3WEc0Z0lIMWNibHh1SUNCaWFXNWtRMjl0YldGdVpITW9jM1Z5Wm1GalpTd2dieXdnWldScGRHOXlLVHRjYmlBZ1ltbHVaRVYyWlc1MGN5Z3BPMXh1WEc0Z0lISmxkSFZ5YmlCbFpHbDBiM0k3WEc1Y2JpQWdablZ1WTNScGIyNGdZV1JrVFc5a1pTQW9hV1FwSUh0Y2JpQWdJQ0IyWVhJZ1luVjBkRzl1SUQwZ2JXOWtaWE5iYVdSZExtSjFkSFJ2Ymp0Y2JpQWdJQ0IyWVhJZ1kzVnpkRzl0SUQwZ2J5NXlaVzVrWlhJdWJXOWtaWE03WEc0Z0lDQWdhV1lnS0c5YmFXUmRLU0I3WEc0Z0lDQWdJQ0J6ZDJsMFkyaGliMkZ5WkM1aGNIQmxibVJEYUdsc1pDaGlkWFIwYjI0cE8xeHVJQ0FnSUNBZ0tIUjVjR1Z2WmlCamRYTjBiMjBnUFQwOUlDZG1kVzVqZEdsdmJpY2dQeUJqZFhOMGIyMGdPaUJ5Wlc1a1pYSmxjbk11Ylc5a1pYTXBLR0oxZEhSdmJpd2dhV1FwTzF4dUlDQWdJQ0FnWTNKdmMzTjJaVzUwTG1Ga1pDaGlkWFIwYjI0c0lDZGpiR2xqYXljc0lHMXZaR1Z6VzJsa1hTNXpaWFFwTzF4dUlDQWdJQ0FnWW5WMGRHOXVMblI1Y0dVZ1BTQW5ZblYwZEc5dUp6dGNiaUFnSUNBZ0lHSjFkSFJ2Ymk1MFlXSkpibVJsZUNBOUlDMHhPMXh1WEc0Z0lDQWdJQ0IyWVhJZ2RHbDBiR1VnUFNCemRISnBibWR6TG5ScGRHeGxjMXRwWkYwN1hHNGdJQ0FnSUNCcFppQW9kR2wwYkdVcElIdGNiaUFnSUNBZ0lDQWdZblYwZEc5dUxuTmxkRUYwZEhKcFluVjBaU2duZEdsMGJHVW5MQ0J0WVdNZ1B5QnRZV05wWm5rb2RHbDBiR1VwSURvZ2RHbDBiR1VwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdKcGJtUkZkbVZ1ZEhNZ0tISmxiVzkyWlNrZ2UxeHVJQ0FnSUhaaGNpQmhjaUE5SUhKbGJXOTJaU0EvSUNkeWJTY2dPaUFuWVdSa0p6dGNiaUFnSUNCMllYSWdiVzkySUQwZ2NtVnRiM1psSUQ4Z0ozSmxiVzkyWlVOb2FXeGtKeUE2SUNkaGNIQmxibVJEYUdsc1pDYzdYRzRnSUNBZ2FXWWdLSEpsYlc5MlpTa2dlMXh1SUNBZ0lDQWdhMkZ1ZVdVdVkyeGxZWElvYTJGdWVXVkRiMjUwWlhoMEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnYVdZZ0tHOHViV0Z5YTJSdmQyNHBJSHNnYTJGdWVXVXViMjRvSjJOdFpDdHRKeXdnYTJGdWVXVlBjSFJwYjI1ekxDQnRZWEpyWkc5M2JrMXZaR1VwT3lCOVhHNGdJQ0FnSUNCcFppQW9ieTVvZEcxc0tTQjdJR3RoYm5sbExtOXVLQ2RqYldRcmFDY3NJR3RoYm5sbFQzQjBhVzl1Y3l3Z2FIUnRiRTF2WkdVcE95QjlYRzRnSUNBZ0lDQnBaaUFvYnk1M2VYTnBkM2xuS1NCN0lHdGhibmxsTG05dUtDZGpiV1FyY0Njc0lHdGhibmxsVDNCMGFXOXVjeXdnZDNsemFYZDVaMDF2WkdVcE95QjlYRzRnSUNBZ2ZWeHVJQ0FnSUdOc1lYTnpaWE5iWVhKZEtIQmhjbVZ1ZEN3Z0ozZHJMV052Ym5SaGFXNWxjaWNwTzF4dUlDQWdJSEJoY21WdWRGdHRiM1pkS0dWa2FYUmhZbXhsS1R0Y2JpQWdJQ0JwWmlBb2NHeGhZMlVwSUhzZ2NHRnlaVzUwVzIxdmRsMG9jR3hoWTJVcE95QjlYRzRnSUNBZ2NHRnlaVzUwVzIxdmRsMG9ZMjl0YldGdVpITXBPMXh1SUNBZ0lIQmhjbVZ1ZEZ0dGIzWmRLSE4zYVhSamFHSnZZWEprS1R0Y2JpQWdJQ0JwWmlBb0tHOHVhVzFoWjJWeklIeDhJRzh1WVhSMFlXTm9iV1Z1ZEhNcElDWW1JRzh1ZUdoeUtTQjdYRzRnSUNBZ0lDQndZWEpsYm5SYmJXOTJYU2hrY205d1lYSmxZU2s3WEc0Z0lDQWdJQ0IxY0d4dllXUnpLSEJoY21WdWRDd2daSEp2Y0dGeVpXRXNJR1ZrYVhSdmNpd2dieXdnY21WdGIzWmxLVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJrWlhOMGNtOTVJQ2dwSUh0Y2JpQWdJQ0JwWmlBb1pXUnBkRzl5TG0xdlpHVWdJVDA5SUNkdFlYSnJaRzkzYmljcElIdGNiaUFnSUNBZ0lIUmxlSFJoY21WaExuWmhiSFZsSUQwZ1oyVjBUV0Z5YTJSdmQyNG9LVHRjYmlBZ0lDQjlYRzRnSUNBZ1kyeGhjM05sY3k1eWJTaDBaWGgwWVhKbFlTd2dKM2RyTFdocFpHVW5LVHRjYmlBZ0lDQmlhVzVrUlhabGJuUnpLSFJ5ZFdVcE8xeHVJQ0FnSUdSbGJHVjBaU0JqWVdOb1pWdHBJQzBnTVYwN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnRZWEpyWkc5M2JrMXZaR1VnS0dVcElIc2djR1Z5YzJsemRFMXZaR1VvSjIxaGNtdGtiM2R1Snl3Z1pTazdJSDFjYmlBZ1puVnVZM1JwYjI0Z2FIUnRiRTF2WkdVZ0tHVXBJSHNnY0dWeWMybHpkRTF2WkdVb0oyaDBiV3duTENCbEtUc2dmVnh1SUNCbWRXNWpkR2x2YmlCM2VYTnBkM2xuVFc5a1pTQW9aU2tnZXlCd1pYSnphWE4wVFc5a1pTZ25kM2x6YVhkNVp5Y3NJR1VwT3lCOVhHNWNiaUFnWm5WdVkzUnBiMjRnY0dWeWMybHpkRTF2WkdVZ0tHNWxlSFJOYjJSbExDQmxLU0I3WEc0Z0lDQWdkbUZ5SUhKbGMzUnZjbVZUWld4bFkzUnBiMjQ3WEc0Z0lDQWdkbUZ5SUdOMWNuSmxiblJOYjJSbElEMGdaV1JwZEc5eUxtMXZaR1U3WEc0Z0lDQWdkbUZ5SUc5c1pDQTlJRzF2WkdWelcyTjFjbkpsYm5STmIyUmxYUzVpZFhSMGIyNDdYRzRnSUNBZ2RtRnlJR0oxZEhSdmJpQTlJRzF2WkdWelcyNWxlSFJOYjJSbFhTNWlkWFIwYjI0N1hHNGdJQ0FnZG1GeUlHWnZZM1Z6YVc1bklEMGdJU0ZsSUh4OElHUnZZeTVoWTNScGRtVkZiR1Z0Wlc1MElEMDlQU0IwWlhoMFlYSmxZU0I4ZkNCa2IyTXVZV04wYVhabFJXeGxiV1Z1ZENBOVBUMGdaV1JwZEdGaWJHVTdYRzVjYmlBZ0lDQnpkRzl3S0dVcE8xeHVYRzRnSUNBZ2FXWWdLR04xY25KbGJuUk5iMlJsSUQwOVBTQnVaWGgwVFc5a1pTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGMzUnZjbVZUWld4bFkzUnBiMjRnUFNCbWIyTjFjMmx1WnlBbUppQnlaVzFsYldKbGNsTmxiR1ZqZEdsdmJpaG9hWE4wYjNKNUxDQnZLVHRjYmlBZ0lDQjBaWGgwWVhKbFlTNWliSFZ5S0NrN0lDOHZJR0YyWlhKMElHTm9jbTl0WlNCeVpYQmhhVzUwSUdKMVozTmNibHh1SUNBZ0lHbG1JQ2h1WlhoMFRXOWtaU0E5UFQwZ0oyMWhjbXRrYjNkdUp5a2dlMXh1SUNBZ0lDQWdhV1lnS0dOMWNuSmxiblJOYjJSbElEMDlQU0FuYUhSdGJDY3BJSHRjYmlBZ0lDQWdJQ0FnZEdWNGRHRnlaV0V1ZG1Gc2RXVWdQU0J2TG5CaGNuTmxTRlJOVENoMFpYaDBZWEpsWVM1MllXeDFaU2t1ZEhKcGJTZ3BPMXh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdkR1Y0ZEdGeVpXRXVkbUZzZFdVZ1BTQnZMbkJoY25ObFNGUk5UQ2hsWkdsMFlXSnNaU2t1ZEhKcGJTZ3BPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMGdaV3h6WlNCcFppQW9ibVY0ZEUxdlpHVWdQVDA5SUNkb2RHMXNKeWtnZTF4dUlDQWdJQ0FnYVdZZ0tHTjFjbkpsYm5STmIyUmxJRDA5UFNBbmJXRnlhMlJ2ZDI0bktTQjdYRzRnSUNBZ0lDQWdJSFJsZUhSaGNtVmhMblpoYkhWbElEMGdieTV3WVhKelpVMWhjbXRrYjNkdUtIUmxlSFJoY21WaExuWmhiSFZsS1M1MGNtbHRLQ2s3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0IwWlhoMFlYSmxZUzUyWVd4MVpTQTlJR1ZrYVhSaFlteGxMbWx1Ym1WeVNGUk5UQzUwY21sdEtDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaHVaWGgwVFc5a1pTQTlQVDBnSjNkNWMybDNlV2NuS1NCN1hHNGdJQ0FnSUNCcFppQW9ZM1Z5Y21WdWRFMXZaR1VnUFQwOUlDZHRZWEpyWkc5M2JpY3BJSHRjYmlBZ0lDQWdJQ0FnWldScGRHRmliR1V1YVc1dVpYSklWRTFNSUQwZ2J5NXdZWEp6WlUxaGNtdGtiM2R1S0hSbGVIUmhjbVZoTG5aaGJIVmxLUzV5WlhCc1lXTmxLSEp3WVhKaFozSmhjR2dzSUNjbktTNTBjbWx0S0NrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCbFpHbDBZV0pzWlM1cGJtNWxja2hVVFV3Z1BTQjBaWGgwWVhKbFlTNTJZV3gxWlM1eVpYQnNZV05sS0hKd1lYSmhaM0poY0dnc0lDY25LUzUwY21sdEtDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLRzVsZUhSTmIyUmxJRDA5UFNBbmQzbHphWGQ1WnljcElIdGNiaUFnSUNBZ0lHTnNZWE56WlhNdVlXUmtLSFJsZUhSaGNtVmhMQ0FuZDJzdGFHbGtaU2NwTzF4dUlDQWdJQ0FnWTJ4aGMzTmxjeTV5YlNobFpHbDBZV0pzWlN3Z0ozZHJMV2hwWkdVbktUdGNiaUFnSUNBZ0lHbG1JQ2h3YkdGalpTa2dleUJqYkdGemMyVnpMbkp0S0hCc1lXTmxMQ0FuZDJzdGFHbGtaU2NwT3lCOVhHNGdJQ0FnSUNCcFppQW9abTlqZFhOcGJtY3BJSHNnYzJWMFZHbHRaVzkxZENobWIyTjFjMFZrYVhSaFlteGxMQ0F3S1RzZ2ZWeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0JqYkdGemMyVnpMbkp0S0hSbGVIUmhjbVZoTENBbmQyc3RhR2xrWlNjcE8xeHVJQ0FnSUNBZ1kyeGhjM05sY3k1aFpHUW9aV1JwZEdGaWJHVXNJQ2QzYXkxb2FXUmxKeWs3WEc0Z0lDQWdJQ0JwWmlBb2NHeGhZMlVwSUhzZ1kyeGhjM05sY3k1aFpHUW9jR3hoWTJVc0lDZDNheTFvYVdSbEp5azdJSDFjYmlBZ0lDQWdJR2xtSUNobWIyTjFjMmx1WnlrZ2V5QjBaWGgwWVhKbFlTNW1iMk4xY3lncE95QjlYRzRnSUNBZ2ZWeHVJQ0FnSUdOc1lYTnpaWE11WVdSa0tHSjFkSFJ2Yml3Z0ozZHJMVzF2WkdVdFlXTjBhWFpsSnlrN1hHNGdJQ0FnWTJ4aGMzTmxjeTV5YlNodmJHUXNJQ2QzYXkxdGIyUmxMV0ZqZEdsMlpTY3BPMXh1SUNBZ0lHTnNZWE56WlhNdVlXUmtLRzlzWkN3Z0ozZHJMVzF2WkdVdGFXNWhZM1JwZG1VbktUdGNiaUFnSUNCamJHRnpjMlZ6TG5KdEtHSjFkSFJ2Yml3Z0ozZHJMVzF2WkdVdGFXNWhZM1JwZG1VbktUdGNiaUFnSUNCaWRYUjBiMjR1YzJWMFFYUjBjbWxpZFhSbEtDZGthWE5oWW14bFpDY3NJQ2RrYVhOaFlteGxaQ2NwTzF4dUlDQWdJRzlzWkM1eVpXMXZkbVZCZEhSeWFXSjFkR1VvSjJScGMyRmliR1ZrSnlrN1hHNGdJQ0FnWldScGRHOXlMbTF2WkdVZ1BTQnVaWGgwVFc5a1pUdGNibHh1SUNBZ0lHbG1JQ2h2TG5OMGIzSmhaMlVwSUhzZ2JITXVjMlYwS0c4dWMzUnZjbUZuWlN3Z2JtVjRkRTF2WkdVcE95QjlYRzVjYmlBZ0lDQm9hWE4wYjNKNUxuTmxkRWx1Y0hWMFRXOWtaU2h1WlhoMFRXOWtaU2s3WEc0Z0lDQWdhV1lnS0hKbGMzUnZjbVZUWld4bFkzUnBiMjRwSUhzZ2NtVnpkRzl5WlZObGJHVmpkR2x2YmlncE95QjlYRzRnSUNBZ1ptbHlaVXhoZEdWeUtDZDNiMjltYldGeWF5MXRiMlJsTFdOb1lXNW5aU2NwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1ptbHlaVXhoZEdWeUlDaDBlWEJsS1NCN1hHNGdJQ0FnYzJWMFZHbHRaVzkxZENobWRXNWpkR2x2YmlCbWFYSmxJQ2dwSUh0Y2JpQWdJQ0FnSUdOeWIzTnpkbVZ1ZEM1bVlXSnlhV05oZEdVb2RHVjRkR0Z5WldFc0lIUjVjR1VwTzF4dUlDQWdJSDBzSURBcE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdabTlqZFhORlpHbDBZV0pzWlNBb0tTQjdYRzRnSUNBZ1pXUnBkR0ZpYkdVdVptOWpkWE1vS1R0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHZGxkRTFoY210a2IzZHVJQ2dwSUh0Y2JpQWdJQ0JwWmlBb1pXUnBkRzl5TG0xdlpHVWdQVDA5SUNkM2VYTnBkM2xuSnlrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUc4dWNHRnljMlZJVkUxTUtHVmthWFJoWW14bEtUdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tHVmthWFJ2Y2k1dGIyUmxJRDA5UFNBbmFIUnRiQ2NwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJ2TG5CaGNuTmxTRlJOVENoMFpYaDBZWEpsWVM1MllXeDFaU2s3WEc0Z0lDQWdmVnh1SUNBZ0lISmxkSFZ5YmlCMFpYaDBZWEpsWVM1MllXeDFaVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdGa1pFTnZiVzFoYm1SQ2RYUjBiMjRnS0dsa0xDQmpiMjFpYnl3Z1ptNHBJSHRjYmlBZ0lDQnBaaUFvWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0E5UFQwZ01pa2dlMXh1SUNBZ0lDQWdabTRnUFNCamIyMWlienRjYmlBZ0lDQWdJR052YldKdklEMGdiblZzYkR0Y2JpQWdJQ0I5WEc0Z0lDQWdkbUZ5SUdKMWRIUnZiaUE5SUhSaFp5aDdJSFE2SUNkaWRYUjBiMjRuTENCak9pQW5kMnN0WTI5dGJXRnVaQ2NzSUhBNklHTnZiVzFoYm1SeklIMHBPMXh1SUNBZ0lIWmhjaUJqZFhOMGIyMGdQU0J2TG5KbGJtUmxjaTVqYjIxdFlXNWtjenRjYmlBZ0lDQjJZWElnY21WdVpHVnlJRDBnZEhsd1pXOW1JR04xYzNSdmJTQTlQVDBnSjJaMWJtTjBhVzl1SnlBL0lHTjFjM1J2YlNBNklISmxibVJsY21WeWN5NWpiMjF0WVc1a2N6dGNiaUFnSUNCMllYSWdkR2wwYkdVZ1BTQnpkSEpwYm1kekxuUnBkR3hsYzF0cFpGMDdYRzRnSUNBZ2FXWWdLSFJwZEd4bEtTQjdYRzRnSUNBZ0lDQmlkWFIwYjI0dWMyVjBRWFIwY21saWRYUmxLQ2QwYVhSc1pTY3NJRzFoWXlBL0lHMWhZMmxtZVNoMGFYUnNaU2tnT2lCMGFYUnNaU2s3WEc0Z0lDQWdmVnh1SUNBZ0lHSjFkSFJ2Ymk1MGVYQmxJRDBnSjJKMWRIUnZiaWM3WEc0Z0lDQWdZblYwZEc5dUxuUmhZa2x1WkdWNElEMGdMVEU3WEc0Z0lDQWdjbVZ1WkdWeUtHSjFkSFJ2Yml3Z2FXUXBPMXh1SUNBZ0lHTnliM056ZG1WdWRDNWhaR1FvWW5WMGRHOXVMQ0FuWTJ4cFkyc25MQ0JuWlhSRGIyMXRZVzVrU0dGdVpHeGxjaWh6ZFhKbVlXTmxMQ0JvYVhOMGIzSjVMQ0JtYmlrcE8xeHVJQ0FnSUdsbUlDaGpiMjFpYnlrZ2UxeHVJQ0FnSUNBZ1lXUmtRMjl0YldGdVpDaGpiMjFpYnl3Z1ptNHBPMXh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnWW5WMGRHOXVPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWVdSa1EyOXRiV0Z1WkNBb1kyOXRZbThzSUdadUtTQjdYRzRnSUNBZ2EyRnVlV1V1YjI0b1kyOXRZbThzSUd0aGJubGxUM0IwYVc5dWN5d2daMlYwUTI5dGJXRnVaRWhoYm1Sc1pYSW9jM1Z5Wm1GalpTd2dhR2x6ZEc5eWVTd2dabTRwS1R0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlISjFia052YlcxaGJtUWdLR1p1S1NCN1hHNGdJQ0FnWjJWMFEyOXRiV0Z1WkVoaGJtUnNaWElvYzNWeVptRmpaU3dnYUdsemRHOXllU3dnY21WaGNuSmhibWRsS1NodWRXeHNLVHRjYmlBZ0lDQm1kVzVqZEdsdmJpQnlaV0Z5Y21GdVoyVWdLR1VzSUcxdlpHVXNJR05vZFc1cmN5a2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHWnVMbU5oYkd3b2RHaHBjeXdnWTJoMWJtdHpMQ0J0YjJSbEtUdGNiaUFnSUNCOVhHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdkR0ZuSUNodmNIUnBiMjV6S1NCN1hHNGdJSFpoY2lCdklEMGdiM0IwYVc5dWN5QjhmQ0I3ZlR0Y2JpQWdkbUZ5SUdWc0lEMGdaRzlqTG1OeVpXRjBaVVZzWlcxbGJuUW9ieTUwSUh4OElDZGthWFluS1R0Y2JpQWdaV3d1WTJ4aGMzTk9ZVzFsSUQwZ2J5NWpJSHg4SUNjbk8xeHVJQ0J6WlhSVVpYaDBLR1ZzTENCdkxuZ2dmSHdnSnljcE8xeHVJQ0JwWmlBb2J5NXdLU0I3SUc4dWNDNWhjSEJsYm1SRGFHbHNaQ2hsYkNrN0lIMWNiaUFnY21WMGRYSnVJR1ZzTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ6ZEc5d0lDaGxLU0I3WEc0Z0lHbG1JQ2hsS1NCN0lHVXVjSEpsZG1WdWRFUmxabUYxYkhRb0tUc2daUzV6ZEc5d1VISnZjR0ZuWVhScGIyNG9LVHNnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ0WVdOcFpua2dLSFJsZUhRcElIdGNiaUFnY21WMGRYSnVJSFJsZUhSY2JpQWdJQ0F1Y21Wd2JHRmpaU2d2WEZ4aVkzUnliRnhjWWk5cExDQW5YRngxTWpNeE9DY3BYRzRnSUNBZ0xuSmxjR3hoWTJVb0wxeGNZbUZzZEZ4Y1lpOXBMQ0FuWEZ4MU1qTXlOU2NwWEc0Z0lDQWdMbkpsY0d4aFkyVW9MMXhjWW5Ob2FXWjBYRnhpTDJrc0lDZGNYSFV5TVdVM0p5azdYRzU5WEc1Y2JuZHZiMlp0WVhKckxtWnBibVFnUFNCbWFXNWtPMXh1ZDI5dlptMWhjbXN1YzNSeWFXNW5jeUE5SUhOMGNtbHVaM003WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhkdmIyWnRZWEpyTzF4dUlsMTkiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHhoclN0dWIgKG9wdGlvbnMpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdXb29mbWFyayBpcyBtaXNzaW5nIFhIUiBjb25maWd1cmF0aW9uLiBDYW5cXCd0IHJlcXVlc3QgJyArIG9wdGlvbnMudXJsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB4aHJTdHViO1xuIl19
