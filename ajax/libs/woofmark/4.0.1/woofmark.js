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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvYnVsbHNleWUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL3NlbGwvc2VsbC5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS90YWlsb3JtYWRlLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL3Rocm90dGxlLmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9ub2RlX21vZHVsZXMvY3VzdG9tLWV2ZW50L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvZXZlbnRtYXAuanMiLCJub2RlX21vZHVsZXMva2FueWUva2FueWUuanMiLCJub2RlX21vZHVsZXMva2FueWUvbm9kZV9tb2R1bGVzL3Nla3Rvci9zcmMvc2VrdG9yLmpzIiwibm9kZV9tb2R1bGVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2NhbC1zdG9yYWdlL3N0dWIuanMiLCJub2RlX21vZHVsZXMvbG9jYWwtc3RvcmFnZS90cmFja2luZy5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvbk51bGxPcC5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvblJhdy5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvblN5bnRoZXRpYy5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2lzSG9zdC5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL3JhbmdlVG9UZXh0UmFuZ2UuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9zZWxlY2Npb24uanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9zZXRTZWxlY3Rpb24uanMiLCJzcmMvSW5wdXRIaXN0b3J5LmpzIiwic3JjL0lucHV0U3RhdGUuanMiLCJzcmMvYmluZENvbW1hbmRzLmpzIiwic3JjL2Nhc3QuanMiLCJzcmMvY2h1bmtzL3BhcnNlTGlua0lucHV0LmpzIiwic3JjL2NodW5rcy90cmltLmpzIiwic3JjL2NsYXNzZXMuanMiLCJzcmMvZXh0ZW5kUmVnRXhwLmpzIiwic3JjL2ZpeEVPTC5qcyIsInNyYy9nZXRDb21tYW5kSGFuZGxlci5qcyIsInNyYy9nZXRTdXJmYWNlLmpzIiwic3JjL2dldFRleHQuanMiLCJzcmMvaHRtbC9IdG1sQ2h1bmtzLmpzIiwic3JjL2h0bWwvYmxvY2txdW90ZS5qcyIsInNyYy9odG1sL2JvbGRPckl0YWxpYy5qcyIsInNyYy9odG1sL2NvZGVibG9jay5qcyIsInNyYy9odG1sL2hlYWRpbmcuanMiLCJzcmMvaHRtbC9oci5qcyIsInNyYy9odG1sL2xpbmtPckltYWdlT3JBdHRhY2htZW50LmpzIiwic3JjL2h0bWwvbGlzdC5qcyIsInNyYy9odG1sL3dyYXBwaW5nLmpzIiwic3JjL2lzVmlzaWJsZUVsZW1lbnQuanMiLCJzcmMvbWFueS5qcyIsInNyYy9tYXJrZG93bi9NYXJrZG93bkNodW5rcy5qcyIsInNyYy9tYXJrZG93bi9ibG9ja3F1b3RlLmpzIiwic3JjL21hcmtkb3duL2JvbGRPckl0YWxpYy5qcyIsInNyYy9tYXJrZG93bi9jb2RlYmxvY2suanMiLCJzcmMvbWFya2Rvd24vaGVhZGluZy5qcyIsInNyYy9tYXJrZG93bi9oci5qcyIsInNyYy9tYXJrZG93bi9saW5rT3JJbWFnZU9yQXR0YWNobWVudC5qcyIsInNyYy9tYXJrZG93bi9saXN0LmpzIiwic3JjL21hcmtkb3duL3NldHRpbmdzLmpzIiwic3JjL21hcmtkb3duL3dyYXBwaW5nLmpzIiwic3JjL29uY2UuanMiLCJzcmMvcHJvbXB0cy9jbG9zZS5qcyIsInNyYy9wcm9tcHRzL3Byb21wdC5qcyIsInNyYy9wcm9tcHRzL3JlbmRlci5qcyIsInNyYy9yZW1lbWJlclNlbGVjdGlvbi5qcyIsInNyYy9yZW5kZXJlcnMuanMiLCJzcmMvc2V0VGV4dC5qcyIsInNyYy9zdHJpbmdzLmpzIiwic3JjL3VwbG9hZHMuanMiLCJzcmMvd29vZm1hcmsuanMiLCJzcmMveGhyU3R1Yi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgdGFpbG9ybWFkZSA9IHJlcXVpcmUoJy4vdGFpbG9ybWFkZScpO1xuXG5mdW5jdGlvbiBidWxsc2V5ZSAoZWwsIHRhcmdldCwgb3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnM7XG4gIHZhciBkb21UYXJnZXQgPSB0YXJnZXQgJiYgdGFyZ2V0LnRhZ05hbWU7XG5cbiAgaWYgKCFkb21UYXJnZXQgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIG8gPSB0YXJnZXQ7XG4gIH1cbiAgaWYgKCFkb21UYXJnZXQpIHtcbiAgICB0YXJnZXQgPSBlbDtcbiAgfVxuICBpZiAoIW8pIHsgbyA9IHt9OyB9XG5cbiAgdmFyIGRlc3Ryb3llZCA9IGZhbHNlO1xuICB2YXIgdGhyb3R0bGVkV3JpdGUgPSB0aHJvdHRsZSh3cml0ZSwgMzApO1xuICB2YXIgdGFpbG9yT3B0aW9ucyA9IHsgdXBkYXRlOiBvLmF1dG91cGRhdGVUb0NhcmV0ICE9PSBmYWxzZSAmJiB1cGRhdGUgfTtcbiAgdmFyIHRhaWxvciA9IG8uY2FyZXQgJiYgdGFpbG9ybWFkZSh0YXJnZXQsIHRhaWxvck9wdGlvbnMpO1xuXG4gIHdyaXRlKCk7XG5cbiAgaWYgKG8udHJhY2tpbmcgIT09IGZhbHNlKSB7XG4gICAgY3Jvc3N2ZW50LmFkZCh3aW5kb3csICdyZXNpemUnLCB0aHJvdHRsZWRXcml0ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlYWQ6IHJlYWROdWxsLFxuICAgIHJlZnJlc2g6IHdyaXRlLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgc2xlZXA6IHNsZWVwXG4gIH07XG5cbiAgZnVuY3Rpb24gc2xlZXAgKCkge1xuICAgIHRhaWxvck9wdGlvbnMuc2xlZXBpbmcgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZE51bGwgKCkgeyByZXR1cm4gcmVhZCgpOyB9XG5cbiAgZnVuY3Rpb24gcmVhZCAocmVhZGluZ3MpIHtcbiAgICB2YXIgYm91bmRzID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBzY3JvbGxUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmICh0YWlsb3IpIHtcbiAgICAgIHJlYWRpbmdzID0gdGFpbG9yLnJlYWQoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IChyZWFkaW5ncy5hYnNvbHV0ZSA/IDAgOiBib3VuZHMubGVmdCkgKyByZWFkaW5ncy54LFxuICAgICAgICB5OiAocmVhZGluZ3MuYWJzb2x1dGUgPyAwIDogYm91bmRzLnRvcCkgKyBzY3JvbGxUb3AgKyByZWFkaW5ncy55ICsgMjBcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB4OiBib3VuZHMubGVmdCxcbiAgICAgIHk6IGJvdW5kcy50b3AgKyBzY3JvbGxUb3BcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlIChyZWFkaW5ncykge1xuICAgIHdyaXRlKHJlYWRpbmdzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChyZWFkaW5ncykge1xuICAgIGlmIChkZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQnVsbHNleWUgY2FuXFwndCByZWZyZXNoIGFmdGVyIGJlaW5nIGRlc3Ryb3llZC4gQ3JlYXRlIGFub3RoZXIgaW5zdGFuY2UgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgaWYgKHRhaWxvciAmJiAhcmVhZGluZ3MpIHtcbiAgICAgIHRhaWxvck9wdGlvbnMuc2xlZXBpbmcgPSBmYWxzZTtcbiAgICAgIHRhaWxvci5yZWZyZXNoKCk7IHJldHVybjtcbiAgICB9XG4gICAgdmFyIHAgPSByZWFkKHJlYWRpbmdzKTtcbiAgICBpZiAoIXRhaWxvciAmJiB0YXJnZXQgIT09IGVsKSB7XG4gICAgICBwLnkgKz0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB9XG4gICAgZWwuc3R5bGUubGVmdCA9IHAueCArICdweCc7XG4gICAgZWwuc3R5bGUudG9wID0gcC55ICsgJ3B4JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0YWlsb3IpIHsgdGFpbG9yLmRlc3Ryb3koKTsgfVxuICAgIGNyb3NzdmVudC5yZW1vdmUod2luZG93LCAncmVzaXplJywgdGhyb3R0bGVkV3JpdGUpO1xuICAgIGRlc3Ryb3llZCA9IHRydWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWxsc2V5ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldCA9IGVhc3lHZXQ7XG52YXIgc2V0ID0gZWFzeVNldDtcblxuaWYgKGRvY3VtZW50LnNlbGVjdGlvbiAmJiBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UpIHtcbiAgZ2V0ID0gaGFyZEdldDtcbiAgc2V0ID0gaGFyZFNldDtcbn1cblxuZnVuY3Rpb24gZWFzeUdldCAoZWwpIHtcbiAgcmV0dXJuIHtcbiAgICBzdGFydDogZWwuc2VsZWN0aW9uU3RhcnQsXG4gICAgZW5kOiBlbC5zZWxlY3Rpb25FbmRcbiAgfTtcbn1cblxuZnVuY3Rpb24gaGFyZEdldCAoZWwpIHtcbiAgdmFyIGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIGlmIChhY3RpdmUgIT09IGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxuXG4gIHZhciByYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICB2YXIgYm9va21hcmsgPSByYW5nZS5nZXRCb29rbWFyaygpO1xuICB2YXIgb3JpZ2luYWwgPSBlbC52YWx1ZTtcbiAgdmFyIG1hcmtlciA9IGdldFVuaXF1ZU1hcmtlcihvcmlnaW5hbCk7XG4gIHZhciBwYXJlbnQgPSByYW5nZS5wYXJlbnRFbGVtZW50KCk7XG4gIGlmIChwYXJlbnQgPT09IG51bGwgfHwgIWlucHV0cyhwYXJlbnQpKSB7XG4gICAgcmV0dXJuIHJlc3VsdCgwLCAwKTtcbiAgfVxuICByYW5nZS50ZXh0ID0gbWFya2VyICsgcmFuZ2UudGV4dCArIG1hcmtlcjtcblxuICB2YXIgY29udGVudHMgPSBlbC52YWx1ZTtcblxuICBlbC52YWx1ZSA9IG9yaWdpbmFsO1xuICByYW5nZS5tb3ZlVG9Cb29rbWFyayhib29rbWFyayk7XG4gIHJhbmdlLnNlbGVjdCgpO1xuXG4gIHJldHVybiByZXN1bHQoY29udGVudHMuaW5kZXhPZihtYXJrZXIpLCBjb250ZW50cy5sYXN0SW5kZXhPZihtYXJrZXIpIC0gbWFya2VyLmxlbmd0aCk7XG5cbiAgZnVuY3Rpb24gcmVzdWx0IChzdGFydCwgZW5kKSB7XG4gICAgaWYgKGFjdGl2ZSAhPT0gZWwpIHsgLy8gZG9uJ3QgZGlzcnVwdCBwcmUtZXhpc3Rpbmcgc3RhdGVcbiAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgYWN0aXZlLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5ibHVyKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRVbmlxdWVNYXJrZXIgKGNvbnRlbnRzKSB7XG4gIHZhciBtYXJrZXI7XG4gIGRvIHtcbiAgICBtYXJrZXIgPSAnQEBtYXJrZXIuJyArIE1hdGgucmFuZG9tKCkgKiBuZXcgRGF0ZSgpO1xuICB9IHdoaWxlIChjb250ZW50cy5pbmRleE9mKG1hcmtlcikgIT09IC0xKTtcbiAgcmV0dXJuIG1hcmtlcjtcbn1cblxuZnVuY3Rpb24gaW5wdXRzIChlbCkge1xuICByZXR1cm4gKChlbC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsLnR5cGUgPT09ICd0ZXh0JykgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJyk7XG59XG5cbmZ1bmN0aW9uIGVhc3lTZXQgKGVsLCBwKSB7XG4gIGVsLnNlbGVjdGlvblN0YXJ0ID0gcGFyc2UoZWwsIHAuc3RhcnQpO1xuICBlbC5zZWxlY3Rpb25FbmQgPSBwYXJzZShlbCwgcC5lbmQpO1xufVxuXG5mdW5jdGlvbiBoYXJkU2V0IChlbCwgcCkge1xuICB2YXIgcmFuZ2UgPSBlbC5jcmVhdGVUZXh0UmFuZ2UoKTtcblxuICBpZiAocC5zdGFydCA9PT0gJ2VuZCcgJiYgcC5lbmQgPT09ICdlbmQnKSB7XG4gICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgIHJhbmdlLnNlbGVjdCgpO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIHBhcnNlKGVsLCBwLmVuZCkpO1xuICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgcGFyc2UoZWwsIHAuc3RhcnQpKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZSAoZWwsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gJ2VuZCcgPyBlbC52YWx1ZS5sZW5ndGggOiB2YWx1ZSB8fCAwO1xufVxuXG5mdW5jdGlvbiBzZWxsIChlbCwgcCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHNldChlbCwgcCk7XG4gIH1cbiAgcmV0dXJuIGdldChlbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VsbDtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHNlbGwgPSByZXF1aXJlKCdzZWxsJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgcHJvcHMgPSBbXG4gICdkaXJlY3Rpb24nLFxuICAnYm94U2l6aW5nJyxcbiAgJ3dpZHRoJyxcbiAgJ2hlaWdodCcsXG4gICdvdmVyZmxvd1gnLFxuICAnb3ZlcmZsb3dZJyxcbiAgJ2JvcmRlclRvcFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdCb3R0b20nLFxuICAncGFkZGluZ0xlZnQnLFxuICAnZm9udFN0eWxlJyxcbiAgJ2ZvbnRWYXJpYW50JyxcbiAgJ2ZvbnRXZWlnaHQnLFxuICAnZm9udFN0cmV0Y2gnLFxuICAnZm9udFNpemUnLFxuICAnZm9udFNpemVBZGp1c3QnLFxuICAnbGluZUhlaWdodCcsXG4gICdmb250RmFtaWx5JyxcbiAgJ3RleHRBbGlnbicsXG4gICd0ZXh0VHJhbnNmb3JtJyxcbiAgJ3RleHRJbmRlbnQnLFxuICAndGV4dERlY29yYXRpb24nLFxuICAnbGV0dGVyU3BhY2luZycsXG4gICd3b3JkU3BhY2luZydcbl07XG52YXIgd2luID0gZ2xvYmFsO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGZmID0gd2luLm1veklubmVyU2NyZWVuWCAhPT0gbnVsbCAmJiB3aW4ubW96SW5uZXJTY3JlZW5YICE9PSB2b2lkIDA7XG5cbmZ1bmN0aW9uIHRhaWxvcm1hZGUgKGVsLCBvcHRpb25zKSB7XG4gIHZhciB0ZXh0SW5wdXQgPSBlbC50YWdOYW1lID09PSAnSU5QVVQnIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQSc7XG4gIHZhciB0aHJvdHRsZWRSZWZyZXNoID0gdGhyb3R0bGUocmVmcmVzaCwgMzApO1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG5cbiAgYmluZCgpO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZDogcmVhZFBvc2l0aW9uLFxuICAgIHJlZnJlc2g6IHRocm90dGxlZFJlZnJlc2gsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xuXG4gIGZ1bmN0aW9uIG5vb3AgKCkge31cbiAgZnVuY3Rpb24gcmVhZFBvc2l0aW9uICgpIHsgcmV0dXJuICh0ZXh0SW5wdXQgPyBjb29yZHNUZXh0IDogY29vcmRzSFRNTCkoKTsgfVxuXG4gIGZ1bmN0aW9uIHJlZnJlc2ggKCkge1xuICAgIGlmIChvLnNsZWVwaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoby51cGRhdGUgfHwgbm9vcCkocmVhZFBvc2l0aW9uKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29vcmRzVGV4dCAoKSB7XG4gICAgdmFyIHAgPSBzZWxsKGVsKTtcbiAgICB2YXIgY29udGV4dCA9IHByZXBhcmUoKTtcbiAgICB2YXIgcmVhZGluZ3MgPSByZWFkVGV4dENvb3Jkcyhjb250ZXh0LCBwLnN0YXJ0KTtcbiAgICBkb2MuYm9keS5yZW1vdmVDaGlsZChjb250ZXh0Lm1pcnJvcik7XG4gICAgcmV0dXJuIHJlYWRpbmdzO1xuICB9XG5cbiAgZnVuY3Rpb24gY29vcmRzSFRNTCAoKSB7XG4gICAgdmFyIHNlbCA9IChvLmdldFNlbGVjdGlvbiB8fCB3aW4uZ2V0U2VsZWN0aW9uKSgpO1xuICAgIGlmIChzZWwucmFuZ2VDb3VudCkge1xuICAgICAgdmFyIHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XG4gICAgICB2YXIgbmVlZHNUb1dvcmtBcm91bmROZXdsaW5lQnVnID0gcmFuZ2Uuc3RhcnRDb250YWluZXIubm9kZU5hbWUgPT09ICdQJyAmJiByYW5nZS5zdGFydE9mZnNldCA9PT0gMDtcbiAgICAgIGlmIChuZWVkc1RvV29ya0Fyb3VuZE5ld2xpbmVCdWcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiByYW5nZS5zdGFydENvbnRhaW5lci5vZmZzZXRMZWZ0LFxuICAgICAgICAgIHk6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm9mZnNldFRvcCxcbiAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKHJhbmdlLmdldENsaWVudFJlY3RzKSB7XG4gICAgICAgIHZhciByZWN0cyA9IHJhbmdlLmdldENsaWVudFJlY3RzKCk7XG4gICAgICAgIGlmIChyZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHJlY3RzWzBdLmxlZnQsXG4gICAgICAgICAgICB5OiByZWN0c1swXS50b3AsXG4gICAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgeDogMCwgeTogMCB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFRleHRDb29yZHMgKGNvbnRleHQsIHApIHtcbiAgICB2YXIgcmVzdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdmFyIG1pcnJvciA9IGNvbnRleHQubWlycm9yO1xuICAgIHZhciBjb21wdXRlZCA9IGNvbnRleHQuY29tcHV0ZWQ7XG5cbiAgICB3cml0ZShtaXJyb3IsIHJlYWQoZWwpLnN1YnN0cmluZygwLCBwKSk7XG5cbiAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgbWlycm9yLnRleHRDb250ZW50ID0gbWlycm9yLnRleHRDb250ZW50LnJlcGxhY2UoL1xccy9nLCAnXFx1MDBhMCcpO1xuICAgIH1cblxuICAgIHdyaXRlKHJlc3QsIHJlYWQoZWwpLnN1YnN0cmluZyhwKSB8fCAnLicpO1xuXG4gICAgbWlycm9yLmFwcGVuZENoaWxkKHJlc3QpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHJlc3Qub2Zmc2V0TGVmdCArIHBhcnNlSW50KGNvbXB1dGVkWydib3JkZXJMZWZ0V2lkdGgnXSksXG4gICAgICB5OiByZXN0Lm9mZnNldFRvcCArIHBhcnNlSW50KGNvbXB1dGVkWydib3JkZXJUb3BXaWR0aCddKVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChlbCkge1xuICAgIHJldHVybiB0ZXh0SW5wdXQgPyBlbC52YWx1ZSA6IGVsLmlubmVySFRNTDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXBhcmUgKCkge1xuICAgIHZhciBjb21wdXRlZCA9IHdpbi5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbCkgOiBlbC5jdXJyZW50U3R5bGU7XG4gICAgdmFyIG1pcnJvciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgc3R5bGUgPSBtaXJyb3Iuc3R5bGU7XG5cbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChtaXJyb3IpO1xuXG4gICAgaWYgKGVsLnRhZ05hbWUgIT09ICdJTlBVVCcpIHtcbiAgICAgIHN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnO1xuICAgIH1cbiAgICBzdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJztcbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIHByb3BzLmZvckVhY2goY29weSk7XG5cbiAgICBpZiAoZmYpIHtcbiAgICAgIHN0eWxlLndpZHRoID0gcGFyc2VJbnQoY29tcHV0ZWQud2lkdGgpIC0gMiArICdweCc7XG4gICAgICBpZiAoZWwuc2Nyb2xsSGVpZ2h0ID4gcGFyc2VJbnQoY29tcHV0ZWQuaGVpZ2h0KSkge1xuICAgICAgICBzdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgcmV0dXJuIHsgbWlycm9yOiBtaXJyb3IsIGNvbXB1dGVkOiBjb21wdXRlZCB9O1xuXG4gICAgZnVuY3Rpb24gY29weSAocHJvcCkge1xuICAgICAgc3R5bGVbcHJvcF0gPSBjb21wdXRlZFtwcm9wXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZSAoZWwsIHZhbHVlKSB7XG4gICAgaWYgKHRleHRJbnB1dCkge1xuICAgICAgZWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYmluZCAocmVtb3ZlKSB7XG4gICAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAna2V5ZG93bicsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXl1cCcsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdpbnB1dCcsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdwYXN0ZScsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdjaGFuZ2UnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGJpbmQodHJ1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0YWlsb3JtYWRlO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpZFd4c2MyVjVaUzkwWVdsc2IzSnRZV1JsTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2MyVnNiQ0E5SUhKbGNYVnBjbVVvSjNObGJHd25LVHRjYm5aaGNpQmpjbTl6YzNabGJuUWdQU0J5WlhGMWFYSmxLQ2RqY205emMzWmxiblFuS1R0Y2JuWmhjaUIwYUhKdmRIUnNaU0E5SUhKbGNYVnBjbVVvSnk0dmRHaHliM1IwYkdVbktUdGNiblpoY2lCd2NtOXdjeUE5SUZ0Y2JpQWdKMlJwY21WamRHbHZiaWNzWEc0Z0lDZGliM2hUYVhwcGJtY25MRnh1SUNBbmQybGtkR2duTEZ4dUlDQW5hR1ZwWjJoMEp5eGNiaUFnSjI5MlpYSm1iRzkzV0Njc1hHNGdJQ2R2ZG1WeVpteHZkMWtuTEZ4dUlDQW5ZbTl5WkdWeVZHOXdWMmxrZEdnbkxGeHVJQ0FuWW05eVpHVnlVbWxuYUhSWGFXUjBhQ2NzWEc0Z0lDZGliM0prWlhKQ2IzUjBiMjFYYVdSMGFDY3NYRzRnSUNkaWIzSmtaWEpNWldaMFYybGtkR2duTEZ4dUlDQW5jR0ZrWkdsdVoxUnZjQ2NzWEc0Z0lDZHdZV1JrYVc1blVtbG5hSFFuTEZ4dUlDQW5jR0ZrWkdsdVowSnZkSFJ2YlNjc1hHNGdJQ2R3WVdSa2FXNW5UR1ZtZENjc1hHNGdJQ2RtYjI1MFUzUjViR1VuTEZ4dUlDQW5abTl1ZEZaaGNtbGhiblFuTEZ4dUlDQW5abTl1ZEZkbGFXZG9kQ2NzWEc0Z0lDZG1iMjUwVTNSeVpYUmphQ2NzWEc0Z0lDZG1iMjUwVTJsNlpTY3NYRzRnSUNkbWIyNTBVMmw2WlVGa2FuVnpkQ2NzWEc0Z0lDZHNhVzVsU0dWcFoyaDBKeXhjYmlBZ0oyWnZiblJHWVcxcGJIa25MRnh1SUNBbmRHVjRkRUZzYVdkdUp5eGNiaUFnSjNSbGVIUlVjbUZ1YzJadmNtMG5MRnh1SUNBbmRHVjRkRWx1WkdWdWRDY3NYRzRnSUNkMFpYaDBSR1ZqYjNKaGRHbHZiaWNzWEc0Z0lDZHNaWFIwWlhKVGNHRmphVzVuSnl4Y2JpQWdKM2R2Y21SVGNHRmphVzVuSjF4dVhUdGNiblpoY2lCM2FXNGdQU0JuYkc5aVlXdzdYRzUyWVhJZ1pHOWpJRDBnWkc5amRXMWxiblE3WEc1MllYSWdabVlnUFNCM2FXNHViVzk2U1c1dVpYSlRZM0psWlc1WUlDRTlQU0J1ZFd4c0lDWW1JSGRwYmk1dGIzcEpibTVsY2xOamNtVmxibGdnSVQwOUlIWnZhV1FnTUR0Y2JseHVablZ1WTNScGIyNGdkR0ZwYkc5eWJXRmtaU0FvWld3c0lHOXdkR2x2Ym5NcElIdGNiaUFnZG1GeUlIUmxlSFJKYm5CMWRDQTlJR1ZzTG5SaFowNWhiV1VnUFQwOUlDZEpUbEJWVkNjZ2ZId2daV3d1ZEdGblRtRnRaU0E5UFQwZ0oxUkZXRlJCVWtWQkp6dGNiaUFnZG1GeUlIUm9jbTkwZEd4bFpGSmxabkpsYzJnZ1BTQjBhSEp2ZEhSc1pTaHlaV1p5WlhOb0xDQXpNQ2s3WEc0Z0lIWmhjaUJ2SUQwZ2IzQjBhVzl1Y3lCOGZDQjdmVHRjYmx4dUlDQmlhVzVrS0NrN1hHNWNiaUFnY21WMGRYSnVJSHRjYmlBZ0lDQnlaV0ZrT2lCeVpXRmtVRzl6YVhScGIyNHNYRzRnSUNBZ2NtVm1jbVZ6YURvZ2RHaHliM1IwYkdWa1VtVm1jbVZ6YUN4Y2JpQWdJQ0JrWlhOMGNtOTVPaUJrWlhOMGNtOTVYRzRnSUgwN1hHNWNiaUFnWm5WdVkzUnBiMjRnYm05dmNDQW9LU0I3ZlZ4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVUc5emFYUnBiMjRnS0NrZ2V5QnlaWFIxY200Z0tIUmxlSFJKYm5CMWRDQS9JR052YjNKa2MxUmxlSFFnT2lCamIyOXlaSE5JVkUxTUtTZ3BPeUI5WEc1Y2JpQWdablZ1WTNScGIyNGdjbVZtY21WemFDQW9LU0I3WEc0Z0lDQWdhV1lnS0c4dWMyeGxaWEJwYm1jcElIdGNiaUFnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlDaHZMblZ3WkdGMFpTQjhmQ0J1YjI5d0tTaHlaV0ZrVUc5emFYUnBiMjRvS1NrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmpiMjl5WkhOVVpYaDBJQ2dwSUh0Y2JpQWdJQ0IyWVhJZ2NDQTlJSE5sYkd3b1pXd3BPMXh1SUNBZ0lIWmhjaUJqYjI1MFpYaDBJRDBnY0hKbGNHRnlaU2dwTzF4dUlDQWdJSFpoY2lCeVpXRmthVzVuY3lBOUlISmxZV1JVWlhoMFEyOXZjbVJ6S0dOdmJuUmxlSFFzSUhBdWMzUmhjblFwTzF4dUlDQWdJR1J2WXk1aWIyUjVMbkpsYlc5MlpVTm9hV3hrS0dOdmJuUmxlSFF1YldseWNtOXlLVHRjYmlBZ0lDQnlaWFIxY200Z2NtVmhaR2x1WjNNN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmpiMjl5WkhOSVZFMU1JQ2dwSUh0Y2JpQWdJQ0IyWVhJZ2MyVnNJRDBnS0c4dVoyVjBVMlZzWldOMGFXOXVJSHg4SUhkcGJpNW5aWFJUWld4bFkzUnBiMjRwS0NrN1hHNGdJQ0FnYVdZZ0tITmxiQzV5WVc1blpVTnZkVzUwS1NCN1hHNGdJQ0FnSUNCMllYSWdjbUZ1WjJVZ1BTQnpaV3d1WjJWMFVtRnVaMlZCZENnd0tUdGNiaUFnSUNBZ0lIWmhjaUJ1WldWa2MxUnZWMjl5YTBGeWIzVnVaRTVsZDJ4cGJtVkNkV2NnUFNCeVlXNW5aUzV6ZEdGeWRFTnZiblJoYVc1bGNpNXViMlJsVG1GdFpTQTlQVDBnSjFBbklDWW1JSEpoYm1kbExuTjBZWEowVDJabWMyVjBJRDA5UFNBd08xeHVJQ0FnSUNBZ2FXWWdLRzVsWldSelZHOVhiM0pyUVhKdmRXNWtUbVYzYkdsdVpVSjFaeWtnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnSUNBZ0lIZzZJSEpoYm1kbExuTjBZWEowUTI5dWRHRnBibVZ5TG05bVpuTmxkRXhsWm5Rc1hHNGdJQ0FnSUNBZ0lDQWdlVG9nY21GdVoyVXVjM1JoY25SRGIyNTBZV2x1WlhJdWIyWm1jMlYwVkc5d0xGeHVJQ0FnSUNBZ0lDQWdJR0ZpYzI5c2RYUmxPaUIwY25WbFhHNGdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnBaaUFvY21GdVoyVXVaMlYwUTJ4cFpXNTBVbVZqZEhNcElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUhKbFkzUnpJRDBnY21GdVoyVXVaMlYwUTJ4cFpXNTBVbVZqZEhNb0tUdGNiaUFnSUNBZ0lDQWdhV1lnS0hKbFkzUnpMbXhsYm1kMGFDQStJREFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZURvZ2NtVmpkSE5iTUYwdWJHVm1kQ3hjYmlBZ0lDQWdJQ0FnSUNBZ0lIazZJSEpsWTNSeld6QmRMblJ2Y0N4Y2JpQWdJQ0FnSUNBZ0lDQWdJR0ZpYzI5c2RYUmxPaUIwY25WbFhHNGdJQ0FnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z2V5QjRPaUF3TENCNU9pQXdJSDA3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCeVpXRmtWR1Y0ZEVOdmIzSmtjeUFvWTI5dWRHVjRkQ3dnY0NrZ2UxeHVJQ0FnSUhaaGNpQnlaWE4wSUQwZ1pHOWpMbU55WldGMFpVVnNaVzFsYm5Rb0ozTndZVzRuS1R0Y2JpQWdJQ0IyWVhJZ2JXbHljbTl5SUQwZ1kyOXVkR1Y0ZEM1dGFYSnliM0k3WEc0Z0lDQWdkbUZ5SUdOdmJYQjFkR1ZrSUQwZ1kyOXVkR1Y0ZEM1amIyMXdkWFJsWkR0Y2JseHVJQ0FnSUhkeWFYUmxLRzFwY25KdmNpd2djbVZoWkNobGJDa3VjM1ZpYzNSeWFXNW5LREFzSUhBcEtUdGNibHh1SUNBZ0lHbG1JQ2hsYkM1MFlXZE9ZVzFsSUQwOVBTQW5TVTVRVlZRbktTQjdYRzRnSUNBZ0lDQnRhWEp5YjNJdWRHVjRkRU52Ym5SbGJuUWdQU0J0YVhKeWIzSXVkR1Y0ZEVOdmJuUmxiblF1Y21Wd2JHRmpaU2d2WEZ4ekwyY3NJQ2RjWEhVd01HRXdKeWs3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdkM0pwZEdVb2NtVnpkQ3dnY21WaFpDaGxiQ2t1YzNWaWMzUnlhVzVuS0hBcElIeDhJQ2N1SnlrN1hHNWNiaUFnSUNCdGFYSnliM0l1WVhCd1pXNWtRMmhwYkdRb2NtVnpkQ2s3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdlRG9nY21WemRDNXZabVp6WlhSTVpXWjBJQ3NnY0dGeWMyVkpiblFvWTI5dGNIVjBaV1JiSjJKdmNtUmxja3hsWm5SWGFXUjBhQ2RkS1N4Y2JpQWdJQ0FnSUhrNklISmxjM1F1YjJabWMyVjBWRzl3SUNzZ2NHRnljMlZKYm5Rb1kyOXRjSFYwWldSYkoySnZjbVJsY2xSdmNGZHBaSFJvSjEwcFhHNGdJQ0FnZlR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlISmxZV1FnS0dWc0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUhSbGVIUkpibkIxZENBL0lHVnNMblpoYkhWbElEb2daV3d1YVc1dVpYSklWRTFNTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2NISmxjR0Z5WlNBb0tTQjdYRzRnSUNBZ2RtRnlJR052YlhCMWRHVmtJRDBnZDJsdUxtZGxkRU52YlhCMWRHVmtVM1I1YkdVZ1B5Qm5aWFJEYjIxd2RYUmxaRk4wZVd4bEtHVnNLU0E2SUdWc0xtTjFjbkpsYm5SVGRIbHNaVHRjYmlBZ0lDQjJZWElnYldseWNtOXlJRDBnWkc5akxtTnlaV0YwWlVWc1pXMWxiblFvSjJScGRpY3BPMXh1SUNBZ0lIWmhjaUJ6ZEhsc1pTQTlJRzFwY25KdmNpNXpkSGxzWlR0Y2JseHVJQ0FnSUdSdll5NWliMlI1TG1Gd2NHVnVaRU5vYVd4a0tHMXBjbkp2Y2lrN1hHNWNiaUFnSUNCcFppQW9aV3d1ZEdGblRtRnRaU0FoUFQwZ0owbE9VRlZVSnlrZ2UxeHVJQ0FnSUNBZ2MzUjViR1V1ZDI5eVpGZHlZWEFnUFNBblluSmxZV3N0ZDI5eVpDYzdYRzRnSUNBZ2ZWeHVJQ0FnSUhOMGVXeGxMbmRvYVhSbFUzQmhZMlVnUFNBbmNISmxMWGR5WVhBbk8xeHVJQ0FnSUhOMGVXeGxMbkJ2YzJsMGFXOXVJRDBnSjJGaWMyOXNkWFJsSnp0Y2JpQWdJQ0J6ZEhsc1pTNTJhWE5wWW1sc2FYUjVJRDBnSjJocFpHUmxiaWM3WEc0Z0lDQWdjSEp2Y0hNdVptOXlSV0ZqYUNoamIzQjVLVHRjYmx4dUlDQWdJR2xtSUNobVppa2dlMXh1SUNBZ0lDQWdjM1I1YkdVdWQybGtkR2dnUFNCd1lYSnpaVWx1ZENoamIyMXdkWFJsWkM1M2FXUjBhQ2tnTFNBeUlDc2dKM0I0Snp0Y2JpQWdJQ0FnSUdsbUlDaGxiQzV6WTNKdmJHeElaV2xuYUhRZ1BpQndZWEp6WlVsdWRDaGpiMjF3ZFhSbFpDNW9aV2xuYUhRcEtTQjdYRzRnSUNBZ0lDQWdJSE4wZVd4bExtOTJaWEptYkc5M1dTQTlJQ2R6WTNKdmJHd25PMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCemRIbHNaUzV2ZG1WeVpteHZkeUE5SUNkb2FXUmtaVzRuTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z2V5QnRhWEp5YjNJNklHMXBjbkp2Y2l3Z1kyOXRjSFYwWldRNklHTnZiWEIxZEdWa0lIMDdYRzVjYmlBZ0lDQm1kVzVqZEdsdmJpQmpiM0I1SUNod2NtOXdLU0I3WEc0Z0lDQWdJQ0J6ZEhsc1pWdHdjbTl3WFNBOUlHTnZiWEIxZEdWa1czQnliM0JkTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkeWFYUmxJQ2hsYkN3Z2RtRnNkV1VwSUh0Y2JpQWdJQ0JwWmlBb2RHVjRkRWx1Y0hWMEtTQjdYRzRnSUNBZ0lDQmxiQzUwWlhoMFEyOXVkR1Z1ZENBOUlIWmhiSFZsTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQmxiQzVwYm01bGNraFVUVXdnUFNCMllXeDFaVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJpYVc1a0lDaHlaVzF2ZG1VcElIdGNiaUFnSUNCMllYSWdiM0FnUFNCeVpXMXZkbVVnUHlBbmNtVnRiM1psSnlBNklDZGhaR1FuTzF4dUlDQWdJR055YjNOemRtVnVkRnR2Y0Ywb1pXd3NJQ2RyWlhsa2IzZHVKeXdnZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNobGJDd2dKMnRsZVhWd0p5d2dkR2h5YjNSMGJHVmtVbVZtY21WemFDazdYRzRnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hsYkN3Z0oybHVjSFYwSnl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwVzI5d1hTaGxiQ3dnSjNCaGMzUmxKeXdnZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNobGJDd2dKMk5vWVc1blpTY3NJSFJvY205MGRHeGxaRkpsWm5KbGMyZ3BPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWkdWemRISnZlU0FvS1NCN1hHNGdJQ0FnWW1sdVpDaDBjblZsS1R0Y2JpQWdmVnh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIUmhhV3h2Y20xaFpHVTdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gdGhyb3R0bGUgKGZuLCBib3VuZGFyeSkge1xuICB2YXIgbGFzdCA9IC1JbmZpbml0eTtcbiAgdmFyIHRpbWVyO1xuICByZXR1cm4gZnVuY3Rpb24gYm91bmNlZCAoKSB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHVuYm91bmQoKTtcblxuICAgIGZ1bmN0aW9uIHVuYm91bmQgKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIHZhciBuZXh0ID0gbGFzdCArIGJvdW5kYXJ5O1xuICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICBpZiAobm93ID4gbmV4dCkge1xuICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICBmbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KHVuYm91bmQsIG5leHQgLSBub3cpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcblxudmFyIE5hdGl2ZUN1c3RvbUV2ZW50ID0gZ2xvYmFsLkN1c3RvbUV2ZW50O1xuXG5mdW5jdGlvbiB1c2VOYXRpdmUgKCkge1xuICB0cnkge1xuICAgIHZhciBwID0gbmV3IE5hdGl2ZUN1c3RvbUV2ZW50KCdjYXQnLCB7IGRldGFpbDogeyBmb286ICdiYXInIH0gfSk7XG4gICAgcmV0dXJuICAnY2F0JyA9PT0gcC50eXBlICYmICdiYXInID09PSBwLmRldGFpbC5mb287XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ3Jvc3MtYnJvd3NlciBgQ3VzdG9tRXZlbnRgIGNvbnN0cnVjdG9yLlxuICpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudC5DdXN0b21FdmVudFxuICpcbiAqIEBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZU5hdGl2ZSgpID8gTmF0aXZlQ3VzdG9tRXZlbnQgOlxuXG4vLyBJRSA+PSA5XG4nZnVuY3Rpb24nID09PSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRXZlbnQgPyBmdW5jdGlvbiBDdXN0b21FdmVudCAodHlwZSwgcGFyYW1zKSB7XG4gIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gIGlmIChwYXJhbXMpIHtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICB9IGVsc2Uge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgdm9pZCAwKTtcbiAgfVxuICByZXR1cm4gZTtcbn0gOlxuXG4vLyBJRSA8PSA4XG5mdW5jdGlvbiBDdXN0b21FdmVudCAodHlwZSwgcGFyYW1zKSB7XG4gIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgZS50eXBlID0gdHlwZTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuYnViYmxlcyA9IEJvb2xlYW4ocGFyYW1zLmJ1YmJsZXMpO1xuICAgIGUuY2FuY2VsYWJsZSA9IEJvb2xlYW4ocGFyYW1zLmNhbmNlbGFibGUpO1xuICAgIGUuZGV0YWlsID0gcGFyYW1zLmRldGFpbDtcbiAgfSBlbHNlIHtcbiAgICBlLmJ1YmJsZXMgPSBmYWxzZTtcbiAgICBlLmNhbmNlbGFibGUgPSBmYWxzZTtcbiAgICBlLmRldGFpbCA9IHZvaWQgMDtcbiAgfVxuICByZXR1cm4gZTtcbn1cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5amNtOXpjM1psYm5RdmJtOWtaVjl0YjJSMWJHVnpMMk4xYzNSdmJTMWxkbVZ1ZEM5cGJtUmxlQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbHh1ZG1GeUlFNWhkR2wyWlVOMWMzUnZiVVYyWlc1MElEMGdaMnh2WW1Gc0xrTjFjM1J2YlVWMlpXNTBPMXh1WEc1bWRXNWpkR2x2YmlCMWMyVk9ZWFJwZG1VZ0tDa2dlMXh1SUNCMGNua2dlMXh1SUNBZ0lIWmhjaUJ3SUQwZ2JtVjNJRTVoZEdsMlpVTjFjM1J2YlVWMlpXNTBLQ2RqWVhRbkxDQjdJR1JsZEdGcGJEb2dleUJtYjI4NklDZGlZWEluSUgwZ2ZTazdYRzRnSUNBZ2NtVjBkWEp1SUNBblkyRjBKeUE5UFQwZ2NDNTBlWEJsSUNZbUlDZGlZWEluSUQwOVBTQndMbVJsZEdGcGJDNW1iMjg3WEc0Z0lIMGdZMkYwWTJnZ0tHVXBJSHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNTlYRzVjYmk4cUtseHVJQ29nUTNKdmMzTXRZbkp2ZDNObGNpQmdRM1Z6ZEc5dFJYWmxiblJnSUdOdmJuTjBjblZqZEc5eUxseHVJQ3BjYmlBcUlHaDBkSEJ6T2k4dlpHVjJaV3h2Y0dWeUxtMXZlbWxzYkdFdWIzSm5MMlZ1TFZWVEwyUnZZM012VjJWaUwwRlFTUzlEZFhOMGIyMUZkbVZ1ZEM1RGRYTjBiMjFGZG1WdWRGeHVJQ3BjYmlBcUlFQndkV0pzYVdOY2JpQXFMMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhWelpVNWhkR2wyWlNncElEOGdUbUYwYVhabFEzVnpkRzl0UlhabGJuUWdPbHh1WEc0dkx5QkpSU0ErUFNBNVhHNG5ablZ1WTNScGIyNG5JRDA5UFNCMGVYQmxiMllnWkc5amRXMWxiblF1WTNKbFlYUmxSWFpsYm5RZ1B5Qm1kVzVqZEdsdmJpQkRkWE4wYjIxRmRtVnVkQ0FvZEhsd1pTd2djR0Z5WVcxektTQjdYRzRnSUhaaGNpQmxJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSWFpsYm5Rb0owTjFjM1J2YlVWMlpXNTBKeWs3WEc0Z0lHbG1JQ2h3WVhKaGJYTXBJSHRjYmlBZ0lDQmxMbWx1YVhSRGRYTjBiMjFGZG1WdWRDaDBlWEJsTENCd1lYSmhiWE11WW5WaVlteGxjeXdnY0dGeVlXMXpMbU5oYm1ObGJHRmliR1VzSUhCaGNtRnRjeTVrWlhSaGFXd3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJR1V1YVc1cGRFTjFjM1J2YlVWMlpXNTBLSFI1Y0dVc0lHWmhiSE5sTENCbVlXeHpaU3dnZG05cFpDQXdLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdaVHRjYm4wZ09seHVYRzR2THlCSlJTQThQU0E0WEc1bWRXNWpkR2x2YmlCRGRYTjBiMjFGZG1WdWRDQW9kSGx3WlN3Z2NHRnlZVzF6S1NCN1hHNGdJSFpoY2lCbElEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJYWmxiblJQWW1wbFkzUW9LVHRjYmlBZ1pTNTBlWEJsSUQwZ2RIbHdaVHRjYmlBZ2FXWWdLSEJoY21GdGN5a2dlMXh1SUNBZ0lHVXVZblZpWW14bGN5QTlJRUp2YjJ4bFlXNG9jR0Z5WVcxekxtSjFZbUpzWlhNcE8xeHVJQ0FnSUdVdVkyRnVZMlZzWVdKc1pTQTlJRUp2YjJ4bFlXNG9jR0Z5WVcxekxtTmhibU5sYkdGaWJHVXBPMXh1SUNBZ0lHVXVaR1YwWVdsc0lEMGdjR0Z5WVcxekxtUmxkR0ZwYkR0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCbExtSjFZbUpzWlhNZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0JsTG1OaGJtTmxiR0ZpYkdVZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0JsTG1SbGRHRnBiQ0E5SUhadmFXUWdNRHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdaVHRjYm4xY2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3VzdG9tRXZlbnQgPSByZXF1aXJlKCdjdXN0b20tZXZlbnQnKTtcbnZhciBldmVudG1hcCA9IHJlcXVpcmUoJy4vZXZlbnRtYXAnKTtcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBhZGRFdmVudCA9IGFkZEV2ZW50RWFzeTtcbnZhciByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50RWFzeTtcbnZhciBoYXJkQ2FjaGUgPSBbXTtcblxuaWYgKCFnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICBhZGRFdmVudCA9IGFkZEV2ZW50SGFyZDtcbiAgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEhhcmQ7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50RWFzeSAoZWwsIHR5cGUsIGZuLCBjYXB0dXJpbmcpIHtcbiAgcmV0dXJuIGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGNhcHR1cmluZyk7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50SGFyZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBlbC5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgd3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCB1bndyYXAoZWwsIHR5cGUsIGZuKSk7XG59XG5cbmZ1bmN0aW9uIGZhYnJpY2F0ZUV2ZW50IChlbCwgdHlwZSwgbW9kZWwpIHtcbiAgdmFyIGUgPSBldmVudG1hcC5pbmRleE9mKHR5cGUpID09PSAtMSA/IG1ha2VDdXN0b21FdmVudCgpIDogbWFrZUNsYXNzaWNFdmVudCgpO1xuICBpZiAoZWwuZGlzcGF0Y2hFdmVudCkge1xuICAgIGVsLmRpc3BhdGNoRXZlbnQoZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuZmlyZUV2ZW50KCdvbicgKyB0eXBlLCBlKTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ2xhc3NpY0V2ZW50ICgpIHtcbiAgICB2YXIgZTtcbiAgICBpZiAoZG9jLmNyZWF0ZUV2ZW50KSB7XG4gICAgICBlID0gZG9jLmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgZS5pbml0RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIGU7XG4gIH1cbiAgZnVuY3Rpb24gbWFrZUN1c3RvbUV2ZW50ICgpIHtcbiAgICByZXR1cm4gbmV3IGN1c3RvbUV2ZW50KHR5cGUsIHsgZGV0YWlsOiBtb2RlbCB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwcGVyRmFjdG9yeSAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwcGVyIChvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSBvcmlnaW5hbEV2ZW50IHx8IGdsb2JhbC5ldmVudDtcbiAgICBlLnRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0ID0gZS5wcmV2ZW50RGVmYXVsdCB8fCBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdCAoKSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbiA9IGUuc3RvcFByb3BhZ2F0aW9uIHx8IGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbiAoKSB7IGUuY2FuY2VsQnViYmxlID0gdHJ1ZTsgfTtcbiAgICBlLndoaWNoID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgZm4uY2FsbChlbCwgZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgd3JhcHBlciA9IHVud3JhcChlbCwgdHlwZSwgZm4pIHx8IHdyYXBwZXJGYWN0b3J5KGVsLCB0eXBlLCBmbik7XG4gIGhhcmRDYWNoZS5wdXNoKHtcbiAgICB3cmFwcGVyOiB3cmFwcGVyLFxuICAgIGVsZW1lbnQ6IGVsLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgZm46IGZuXG4gIH0pO1xuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuZnVuY3Rpb24gdW53cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGkgPSBmaW5kKGVsLCB0eXBlLCBmbik7XG4gIGlmIChpKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBoYXJkQ2FjaGVbaV0ud3JhcHBlcjtcbiAgICBoYXJkQ2FjaGUuc3BsaWNlKGksIDEpOyAvLyBmcmVlIHVwIGEgdGFkIG9mIG1lbW9yeVxuICAgIHJldHVybiB3cmFwcGVyO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmQgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSwgaXRlbTtcbiAgZm9yIChpID0gMDsgaSA8IGhhcmRDYWNoZS5sZW5ndGg7IGkrKykge1xuICAgIGl0ZW0gPSBoYXJkQ2FjaGVbaV07XG4gICAgaWYgKGl0ZW0uZWxlbWVudCA9PT0gZWwgJiYgaXRlbS50eXBlID09PSB0eXBlICYmIGl0ZW0uZm4gPT09IGZuKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZDogYWRkRXZlbnQsXG4gIHJlbW92ZTogcmVtb3ZlRXZlbnQsXG4gIGZhYnJpY2F0ZTogZmFicmljYXRlRXZlbnRcbn07XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWpjbTl6YzNabGJuUXZjM0pqTDJOeWIzTnpkbVZ1ZEM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCamRYTjBiMjFGZG1WdWRDQTlJSEpsY1hWcGNtVW9KMk4xYzNSdmJTMWxkbVZ1ZENjcE8xeHVkbUZ5SUdWMlpXNTBiV0Z3SUQwZ2NtVnhkV2x5WlNnbkxpOWxkbVZ1ZEcxaGNDY3BPMXh1ZG1GeUlHUnZZeUE5SUdSdlkzVnRaVzUwTzF4dWRtRnlJR0ZrWkVWMlpXNTBJRDBnWVdSa1JYWmxiblJGWVhONU8xeHVkbUZ5SUhKbGJXOTJaVVYyWlc1MElEMGdjbVZ0YjNabFJYWmxiblJGWVhONU8xeHVkbUZ5SUdoaGNtUkRZV05vWlNBOUlGdGRPMXh1WEc1cFppQW9JV2RzYjJKaGJDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtTQjdYRzRnSUdGa1pFVjJaVzUwSUQwZ1lXUmtSWFpsYm5SSVlYSmtPMXh1SUNCeVpXMXZkbVZGZG1WdWRDQTlJSEpsYlc5MlpVVjJaVzUwU0dGeVpEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1lXUmtSWFpsYm5SRllYTjVJQ2hsYkN3Z2RIbHdaU3dnWm00c0lHTmhjSFIxY21sdVp5a2dlMXh1SUNCeVpYUjFjbTRnWld3dVlXUmtSWFpsYm5STWFYTjBaVzVsY2loMGVYQmxMQ0JtYml3Z1kyRndkSFZ5YVc1bktUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1lXUmtSWFpsYm5SSVlYSmtJQ2hsYkN3Z2RIbHdaU3dnWm00cElIdGNiaUFnY21WMGRYSnVJR1ZzTG1GMGRHRmphRVYyWlc1MEtDZHZiaWNnS3lCMGVYQmxMQ0IzY21Gd0tHVnNMQ0IwZVhCbExDQm1iaWtwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WlcxdmRtVkZkbVZ1ZEVWaGMza2dLR1ZzTENCMGVYQmxMQ0JtYml3Z1kyRndkSFZ5YVc1bktTQjdYRzRnSUhKbGRIVnliaUJsYkM1eVpXMXZkbVZGZG1WdWRFeHBjM1JsYm1WeUtIUjVjR1VzSUdadUxDQmpZWEIwZFhKcGJtY3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaVzF2ZG1WRmRtVnVkRWhoY21RZ0tHVnNMQ0IwZVhCbExDQm1iaWtnZTF4dUlDQnlaWFIxY200Z1pXd3VaR1YwWVdOb1JYWmxiblFvSjI5dUp5QXJJSFI1Y0dVc0lIVnVkM0poY0NobGJDd2dkSGx3WlN3Z1ptNHBLVHRjYm4xY2JseHVablZ1WTNScGIyNGdabUZpY21sallYUmxSWFpsYm5RZ0tHVnNMQ0IwZVhCbExDQnRiMlJsYkNrZ2UxeHVJQ0IyWVhJZ1pTQTlJR1YyWlc1MGJXRndMbWx1WkdWNFQyWW9kSGx3WlNrZ1BUMDlJQzB4SUQ4Z2JXRnJaVU4xYzNSdmJVVjJaVzUwS0NrZ09pQnRZV3RsUTJ4aGMzTnBZMFYyWlc1MEtDazdYRzRnSUdsbUlDaGxiQzVrYVhOd1lYUmphRVYyWlc1MEtTQjdYRzRnSUNBZ1pXd3VaR2x6Y0dGMFkyaEZkbVZ1ZENobEtUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQmxiQzVtYVhKbFJYWmxiblFvSjI5dUp5QXJJSFI1Y0dVc0lHVXBPMXh1SUNCOVhHNGdJR1oxYm1OMGFXOXVJRzFoYTJWRGJHRnpjMmxqUlhabGJuUWdLQ2tnZTF4dUlDQWdJSFpoY2lCbE8xeHVJQ0FnSUdsbUlDaGtiMk11WTNKbFlYUmxSWFpsYm5RcElIdGNiaUFnSUNBZ0lHVWdQU0JrYjJNdVkzSmxZWFJsUlhabGJuUW9KMFYyWlc1MEp5azdYRzRnSUNBZ0lDQmxMbWx1YVhSRmRtVnVkQ2gwZVhCbExDQjBjblZsTENCMGNuVmxLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLR1J2WXk1amNtVmhkR1ZGZG1WdWRFOWlhbVZqZENrZ2UxeHVJQ0FnSUNBZ1pTQTlJR1J2WXk1amNtVmhkR1ZGZG1WdWRFOWlhbVZqZENncE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdaVHRjYmlBZ2ZWeHVJQ0JtZFc1amRHbHZiaUJ0WVd0bFEzVnpkRzl0UlhabGJuUWdLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQnVaWGNnWTNWemRHOXRSWFpsYm5Rb2RIbHdaU3dnZXlCa1pYUmhhV3c2SUcxdlpHVnNJSDBwTzF4dUlDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlIZHlZWEJ3WlhKR1lXTjBiM0o1SUNobGJDd2dkSGx3WlN3Z1ptNHBJSHRjYmlBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUhkeVlYQndaWElnS0c5eWFXZHBibUZzUlhabGJuUXBJSHRjYmlBZ0lDQjJZWElnWlNBOUlHOXlhV2RwYm1Gc1JYWmxiblFnZkh3Z1oyeHZZbUZzTG1WMlpXNTBPMXh1SUNBZ0lHVXVkR0Z5WjJWMElEMGdaUzUwWVhKblpYUWdmSHdnWlM1emNtTkZiR1Z0Wlc1ME8xeHVJQ0FnSUdVdWNISmxkbVZ1ZEVSbFptRjFiSFFnUFNCbExuQnlaWFpsYm5SRVpXWmhkV3gwSUh4OElHWjFibU4wYVc5dUlIQnlaWFpsYm5SRVpXWmhkV3gwSUNncElIc2daUzV5WlhSMWNtNVdZV3gxWlNBOUlHWmhiSE5sT3lCOU8xeHVJQ0FnSUdVdWMzUnZjRkJ5YjNCaFoyRjBhVzl1SUQwZ1pTNXpkRzl3VUhKdmNHRm5ZWFJwYjI0Z2ZId2dablZ1WTNScGIyNGdjM1J2Y0ZCeWIzQmhaMkYwYVc5dUlDZ3BJSHNnWlM1allXNWpaV3hDZFdKaWJHVWdQU0IwY25WbE95QjlPMXh1SUNBZ0lHVXVkMmhwWTJnZ1BTQmxMbmRvYVdOb0lIeDhJR1V1YTJWNVEyOWtaVHRjYmlBZ0lDQm1iaTVqWVd4c0tHVnNMQ0JsS1R0Y2JpQWdmVHRjYm4xY2JseHVablZ1WTNScGIyNGdkM0poY0NBb1pXd3NJSFI1Y0dVc0lHWnVLU0I3WEc0Z0lIWmhjaUIzY21Gd2NHVnlJRDBnZFc1M2NtRndLR1ZzTENCMGVYQmxMQ0JtYmlrZ2ZId2dkM0poY0hCbGNrWmhZM1J2Y25rb1pXd3NJSFI1Y0dVc0lHWnVLVHRjYmlBZ2FHRnlaRU5oWTJobExuQjFjMmdvZTF4dUlDQWdJSGR5WVhCd1pYSTZJSGR5WVhCd1pYSXNYRzRnSUNBZ1pXeGxiV1Z1ZERvZ1pXd3NYRzRnSUNBZ2RIbHdaVG9nZEhsd1pTeGNiaUFnSUNCbWJqb2dabTVjYmlBZ2ZTazdYRzRnSUhKbGRIVnliaUIzY21Gd2NHVnlPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjFibmR5WVhBZ0tHVnNMQ0IwZVhCbExDQm1iaWtnZTF4dUlDQjJZWElnYVNBOUlHWnBibVFvWld3c0lIUjVjR1VzSUdadUtUdGNiaUFnYVdZZ0tHa3BJSHRjYmlBZ0lDQjJZWElnZDNKaGNIQmxjaUE5SUdoaGNtUkRZV05vWlZ0cFhTNTNjbUZ3Y0dWeU8xeHVJQ0FnSUdoaGNtUkRZV05vWlM1emNHeHBZMlVvYVN3Z01TazdJQzh2SUdaeVpXVWdkWEFnWVNCMFlXUWdiMllnYldWdGIzSjVYRzRnSUNBZ2NtVjBkWEp1SUhkeVlYQndaWEk3WEc0Z0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z1ptbHVaQ0FvWld3c0lIUjVjR1VzSUdadUtTQjdYRzRnSUhaaGNpQnBMQ0JwZEdWdE8xeHVJQ0JtYjNJZ0tHa2dQU0F3T3lCcElEd2dhR0Z5WkVOaFkyaGxMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnYVhSbGJTQTlJR2hoY21SRFlXTm9aVnRwWFR0Y2JpQWdJQ0JwWmlBb2FYUmxiUzVsYkdWdFpXNTBJRDA5UFNCbGJDQW1KaUJwZEdWdExuUjVjR1VnUFQwOUlIUjVjR1VnSmlZZ2FYUmxiUzVtYmlBOVBUMGdabTRwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUh0Y2JpQWdZV1JrT2lCaFpHUkZkbVZ1ZEN4Y2JpQWdjbVZ0YjNabE9pQnlaVzF2ZG1WRmRtVnVkQ3hjYmlBZ1ptRmljbWxqWVhSbE9pQm1ZV0p5YVdOaGRHVkZkbVZ1ZEZ4dWZUdGNiaUpkZlE9PSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGV2ZW50bWFwID0gW107XG52YXIgZXZlbnRuYW1lID0gJyc7XG52YXIgcm9uID0gL15vbi87XG5cbmZvciAoZXZlbnRuYW1lIGluIGdsb2JhbCkge1xuICBpZiAocm9uLnRlc3QoZXZlbnRuYW1lKSkge1xuICAgIGV2ZW50bWFwLnB1c2goZXZlbnRuYW1lLnNsaWNlKDIpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50bWFwO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlqY205emMzWmxiblF2YzNKakwyVjJaVzUwYldGd0xtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCbGRtVnVkRzFoY0NBOUlGdGRPMXh1ZG1GeUlHVjJaVzUwYm1GdFpTQTlJQ2NuTzF4dWRtRnlJSEp2YmlBOUlDOWViMjR2TzF4dVhHNW1iM0lnS0dWMlpXNTBibUZ0WlNCcGJpQm5iRzlpWVd3cElIdGNiaUFnYVdZZ0tISnZiaTUwWlhOMEtHVjJaVzUwYm1GdFpTa3BJSHRjYmlBZ0lDQmxkbVZ1ZEcxaGNDNXdkWE5vS0dWMlpXNTBibUZ0WlM1emJHbGpaU2d5S1NrN1hHNGdJSDFjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQmxkbVZ1ZEcxaGNEdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNla3RvciA9IHJlcXVpcmUoJ3Nla3RvcicpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIHJzcGFjZXMgPSAvXFxzKy9nO1xudmFyIGtleW1hcCA9IHtcbiAgMTM6ICdlbnRlcicsXG4gIDI3OiAnZXNjJyxcbiAgMzI6ICdzcGFjZSdcbn07XG52YXIgaGFuZGxlcnMgPSB7fTtcblxuY3Jvc3N2ZW50LmFkZCh3aW5kb3csICdrZXlkb3duJywga2V5ZG93bik7XG5cbmZ1bmN0aW9uIGNsZWFyIChjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0KSB7XG4gICAgaWYgKGNvbnRleHQgaW4gaGFuZGxlcnMpIHtcbiAgICAgIGhhbmRsZXJzW2NvbnRleHRdID0ge307XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhhbmRsZXJzID0ge307XG4gIH1cbn1cblxuZnVuY3Rpb24gc3dpdGNoYm9hcmQgKHRoZW4sIGNvbWJvLCBvcHRpb25zLCBmbikge1xuICBpZiAoZm4gPT09IHZvaWQgMCkge1xuICAgIGZuID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgY29udGV4dCA9IG9wdGlvbnMuY29udGV4dCB8fCAnZGVmYXVsdHMnO1xuXG4gIGlmICghZm4pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaGFuZGxlcnNbY29udGV4dF0gPT09IHZvaWQgMCkge1xuICAgIGhhbmRsZXJzW2NvbnRleHRdID0ge307XG4gIH1cblxuICBjb21iby50b0xvd2VyQ2FzZSgpLnNwbGl0KHJzcGFjZXMpLmZvckVhY2goaXRlbSk7XG5cbiAgZnVuY3Rpb24gaXRlbSAoa2V5cykge1xuICAgIHZhciBjID0ga2V5cy50cmltKCk7XG4gICAgaWYgKGMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoZW4oaGFuZGxlcnNbY29udGV4dF0sIGMsIG9wdGlvbnMsIGZuKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbiAoY29tYm8sIG9wdGlvbnMsIGZuKSB7XG4gIHN3aXRjaGJvYXJkKGFkZCwgY29tYm8sIG9wdGlvbnMsIGZuKTtcblxuICBmdW5jdGlvbiBhZGQgKGFyZWEsIGtleSwgb3B0aW9ucywgZm4pIHtcbiAgICB2YXIgaGFuZGxlciA9IHtcbiAgICAgIGhhbmRsZTogZm4sXG4gICAgICBmaWx0ZXI6IG9wdGlvbnMuZmlsdGVyXG4gICAgfTtcbiAgICBpZiAoYXJlYVtrZXldKSB7XG4gICAgICBhcmVhW2tleV0ucHVzaChoYW5kbGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJlYVtrZXldID0gW2hhbmRsZXJdO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBvZmYgKGNvbWJvLCBvcHRpb25zLCBmbikge1xuICBzd2l0Y2hib2FyZChybSwgY29tYm8sIG9wdGlvbnMsIGZuKTtcblxuICBmdW5jdGlvbiBybSAoYXJlYSwga2V5LCBvcHRpb25zLCBmbikge1xuICAgIGlmIChhcmVhW2tleV0pIHtcbiAgICAgIGFyZWFba2V5XSA9IGFyZWFba2V5XS5maWx0ZXIobWF0Y2hpbmcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoaW5nIChoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gaGFuZGxlci5oYW5kbGUgPT09IGZuICYmIGhhbmRsZXIuZmlsdGVyID09PSBvcHRpb25zLmZpbHRlcjtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0S2V5Q29kZSAoZSkge1xuICByZXR1cm4gZS53aGljaCB8fCBlLmtleUNvZGUgfHwgZS5jaGFyQ29kZTtcbn1cblxuZnVuY3Rpb24ga2V5ZG93biAoZSkge1xuICB2YXIgY29kZSA9IGdldEtleUNvZGUoZSk7XG4gIHZhciBrZXkgPSBrZXltYXBbY29kZV0gfHwgU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYgKGtleSkge1xuICAgIGhhbmRsZShrZXksIGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlS2V5Q29tYm8gKGtleSwgZSkge1xuICB2YXIgY29tYm8gPSBba2V5XTtcbiAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICBjb21iby51bnNoaWZ0KCdzaGlmdCcpO1xuICB9XG4gIGlmIChlLmFsdEtleSkge1xuICAgIGNvbWJvLnVuc2hpZnQoJ2FsdCcpO1xuICB9XG4gIGlmIChlLmN0cmxLZXkgXiBlLm1ldGFLZXkpIHtcbiAgICBjb21iby51bnNoaWZ0KCdjbWQnKTtcbiAgfVxuICByZXR1cm4gY29tYm8uam9pbignKycpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZSAoa2V5LCBlKSB7XG4gIHZhciBjb21ibyA9IHBhcnNlS2V5Q29tYm8oa2V5LCBlKTtcbiAgdmFyIGNvbnRleHQ7XG4gIGZvciAoY29udGV4dCBpbiBoYW5kbGVycykge1xuICAgIGlmIChoYW5kbGVyc1tjb250ZXh0XVtjb21ib10pIHtcbiAgICAgIGhhbmRsZXJzW2NvbnRleHRdW2NvbWJvXS5mb3JFYWNoKGV4ZWMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlcmVkIChoYW5kbGVyKSB7XG4gICAgdmFyIGZpbHRlciA9IGhhbmRsZXIuZmlsdGVyO1xuICAgIGlmICghZmlsdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGVsID0gZS50YXJnZXQ7XG4gICAgdmFyIHNlbGVjdG9yID0gdHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZyc7XG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gc2VrdG9yLm1hdGNoZXNTZWxlY3RvcihlbCwgZmlsdGVyKSA9PT0gZmFsc2U7XG4gICAgfVxuICAgIHdoaWxlIChlbC5wYXJlbnRFbGVtZW50ICYmIGVsICE9PSBmaWx0ZXIpIHtcbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIGVsICE9PSBmaWx0ZXI7XG4gIH1cblxuICBmdW5jdGlvbiBleGVjIChoYW5kbGVyKSB7XG4gICAgaWYgKGZpbHRlcmVkKGhhbmRsZXIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhhbmRsZXIuaGFuZGxlKGUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvbjogb24sXG4gIG9mZjogb2ZmLFxuICBjbGVhcjogY2xlYXIsXG4gIGhhbmRsZXJzOiBoYW5kbGVyc1xufTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGV4cGFuZG8gPSAnc2VrdG9yLScgKyBEYXRlLm5vdygpO1xudmFyIHJzaWJsaW5ncyA9IC9bK35dLztcbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBkZWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG52YXIgbWF0Y2ggPSBkZWwubWF0Y2hlcyB8fFxuICAgICAgICAgICAgZGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgZGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgZGVsLm9NYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIGRlbC5tc01hdGNoZXNTZWxlY3RvcjtcblxuZnVuY3Rpb24gcXNhIChzZWxlY3RvciwgY29udGV4dCkge1xuICB2YXIgZXhpc3RlZCwgaWQsIHByZWZpeCwgcHJlZml4ZWQsIGFkYXB0ZXIsIGhhY2sgPSBjb250ZXh0ICE9PSBkb2N1bWVudDtcbiAgaWYgKGhhY2spIHsgLy8gaWQgaGFjayBmb3IgY29udGV4dC1yb290ZWQgcXVlcmllc1xuICAgIGV4aXN0ZWQgPSBjb250ZXh0LmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICBpZCA9IGV4aXN0ZWQgfHwgZXhwYW5kbztcbiAgICBwcmVmaXggPSAnIycgKyBpZCArICcgJztcbiAgICBwcmVmaXhlZCA9IHByZWZpeCArIHNlbGVjdG9yLnJlcGxhY2UoLywvZywgJywnICsgcHJlZml4KTtcbiAgICBhZGFwdGVyID0gcnNpYmxpbmdzLnRlc3Qoc2VsZWN0b3IpICYmIGNvbnRleHQucGFyZW50Tm9kZTtcbiAgICBpZiAoIWV4aXN0ZWQpIHsgY29udGV4dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpOyB9XG4gIH1cbiAgdHJ5IHtcbiAgICByZXR1cm4gKGFkYXB0ZXIgfHwgY29udGV4dCkucXVlcnlTZWxlY3RvckFsbChwcmVmaXhlZCB8fCBzZWxlY3Rvcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gW107XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGV4aXN0ZWQgPT09IG51bGwpIHsgY29udGV4dC5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7IH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kIChzZWxlY3RvciwgY3R4LCBjb2xsZWN0aW9uLCBzZWVkKSB7XG4gIHZhciBlbGVtZW50O1xuICB2YXIgY29udGV4dCA9IGN0eCB8fCBkb2N1bWVudDtcbiAgdmFyIHJlc3VsdHMgPSBjb2xsZWN0aW9uIHx8IFtdO1xuICB2YXIgaSA9IDA7XG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cbiAgaWYgKGNvbnRleHQubm9kZVR5cGUgIT09IDEgJiYgY29udGV4dC5ub2RlVHlwZSAhPT0gOSkge1xuICAgIHJldHVybiBbXTsgLy8gYmFpbCBpZiBjb250ZXh0IGlzIG5vdCBhbiBlbGVtZW50IG9yIGRvY3VtZW50XG4gIH1cbiAgaWYgKHNlZWQpIHtcbiAgICB3aGlsZSAoKGVsZW1lbnQgPSBzZWVkW2krK10pKSB7XG4gICAgICBpZiAobWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKSkge1xuICAgICAgICByZXN1bHRzLnB1c2goZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdHMucHVzaC5hcHBseShyZXN1bHRzLCBxc2Eoc2VsZWN0b3IsIGNvbnRleHQpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gbWF0Y2hlcyAoc2VsZWN0b3IsIGVsZW1lbnRzKSB7XG4gIHJldHVybiBmaW5kKHNlbGVjdG9yLCBudWxsLCBudWxsLCBlbGVtZW50cyk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvciAoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIG1hdGNoLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbmQ7XG5cbmZpbmQubWF0Y2hlcyA9IG1hdGNoZXM7XG5maW5kLm1hdGNoZXNTZWxlY3RvciA9IG1hdGNoZXNTZWxlY3RvcjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5cllXNTVaUzl1YjJSbFgyMXZaSFZzWlhNdmMyVnJkRzl5TDNOeVl5OXpaV3QwYjNJdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQmxlSEJoYm1SdklEMGdKM05sYTNSdmNpMG5JQ3NnUkdGMFpTNXViM2NvS1R0Y2JuWmhjaUJ5YzJsaWJHbHVaM01nUFNBdld5dCtYUzg3WEc1MllYSWdaRzlqZFcxbGJuUWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzUyWVhJZ1pHVnNJRDBnWkc5amRXMWxiblF1Wkc5amRXMWxiblJGYkdWdFpXNTBPMXh1ZG1GeUlHMWhkR05vSUQwZ1pHVnNMbTFoZEdOb1pYTWdmSHhjYmlBZ0lDQWdJQ0FnSUNBZ0lHUmxiQzUzWldKcmFYUk5ZWFJqYUdWelUyVnNaV04wYjNJZ2ZIeGNiaUFnSUNBZ0lDQWdJQ0FnSUdSbGJDNXRiM3BOWVhSamFHVnpVMlZzWldOMGIzSWdmSHhjYmlBZ0lDQWdJQ0FnSUNBZ0lHUmxiQzV2VFdGMFkyaGxjMU5sYkdWamRHOXlJSHg4WEc0Z0lDQWdJQ0FnSUNBZ0lDQmtaV3d1YlhOTllYUmphR1Z6VTJWc1pXTjBiM0k3WEc1Y2JtWjFibU4wYVc5dUlIRnpZU0FvYzJWc1pXTjBiM0lzSUdOdmJuUmxlSFFwSUh0Y2JpQWdkbUZ5SUdWNGFYTjBaV1FzSUdsa0xDQndjbVZtYVhnc0lIQnlaV1pwZUdWa0xDQmhaR0Z3ZEdWeUxDQm9ZV05ySUQwZ1kyOXVkR1Y0ZENBaFBUMGdaRzlqZFcxbGJuUTdYRzRnSUdsbUlDaG9ZV05yS1NCN0lDOHZJR2xrSUdoaFkyc2dabTl5SUdOdmJuUmxlSFF0Y205dmRHVmtJSEYxWlhKcFpYTmNiaUFnSUNCbGVHbHpkR1ZrSUQwZ1kyOXVkR1Y0ZEM1blpYUkJkSFJ5YVdKMWRHVW9KMmxrSnlrN1hHNGdJQ0FnYVdRZ1BTQmxlR2x6ZEdWa0lIeDhJR1Y0Y0dGdVpHODdYRzRnSUNBZ2NISmxabWw0SUQwZ0p5TW5JQ3NnYVdRZ0t5QW5JQ2M3WEc0Z0lDQWdjSEpsWm1sNFpXUWdQU0J3Y21WbWFYZ2dLeUJ6Wld4bFkzUnZjaTV5WlhCc1lXTmxLQzhzTDJjc0lDY3NKeUFySUhCeVpXWnBlQ2s3WEc0Z0lDQWdZV1JoY0hSbGNpQTlJSEp6YVdKc2FXNW5jeTUwWlhOMEtITmxiR1ZqZEc5eUtTQW1KaUJqYjI1MFpYaDBMbkJoY21WdWRFNXZaR1U3WEc0Z0lDQWdhV1lnS0NGbGVHbHpkR1ZrS1NCN0lHTnZiblJsZUhRdWMyVjBRWFIwY21saWRYUmxLQ2RwWkNjc0lHbGtLVHNnZlZ4dUlDQjlYRzRnSUhSeWVTQjdYRzRnSUNBZ2NtVjBkWEp1SUNoaFpHRndkR1Z5SUh4OElHTnZiblJsZUhRcExuRjFaWEo1VTJWc1pXTjBiM0pCYkd3b2NISmxabWw0WldRZ2ZId2djMlZzWldOMGIzSXBPMXh1SUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUZ0ZE8xeHVJQ0I5SUdacGJtRnNiSGtnZTF4dUlDQWdJR2xtSUNobGVHbHpkR1ZrSUQwOVBTQnVkV3hzS1NCN0lHTnZiblJsZUhRdWNtVnRiM1psUVhSMGNtbGlkWFJsS0NkcFpDY3BPeUI5WEc0Z0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z1ptbHVaQ0FvYzJWc1pXTjBiM0lzSUdOMGVDd2dZMjlzYkdWamRHbHZiaXdnYzJWbFpDa2dlMXh1SUNCMllYSWdaV3hsYldWdWREdGNiaUFnZG1GeUlHTnZiblJsZUhRZ1BTQmpkSGdnZkh3Z1pHOWpkVzFsYm5RN1hHNGdJSFpoY2lCeVpYTjFiSFJ6SUQwZ1kyOXNiR1ZqZEdsdmJpQjhmQ0JiWFR0Y2JpQWdkbUZ5SUdrZ1BTQXdPMXh1SUNCcFppQW9kSGx3Wlc5bUlITmxiR1ZqZEc5eUlDRTlQU0FuYzNSeWFXNW5KeWtnZTF4dUlDQWdJSEpsZEhWeWJpQnlaWE4xYkhSek8xeHVJQ0I5WEc0Z0lHbG1JQ2hqYjI1MFpYaDBMbTV2WkdWVWVYQmxJQ0U5UFNBeElDWW1JR052Ym5SbGVIUXVibTlrWlZSNWNHVWdJVDA5SURrcElIdGNiaUFnSUNCeVpYUjFjbTRnVzEwN0lDOHZJR0poYVd3Z2FXWWdZMjl1ZEdWNGRDQnBjeUJ1YjNRZ1lXNGdaV3hsYldWdWRDQnZjaUJrYjJOMWJXVnVkRnh1SUNCOVhHNGdJR2xtSUNoelpXVmtLU0I3WEc0Z0lDQWdkMmhwYkdVZ0tDaGxiR1Z0Wlc1MElEMGdjMlZsWkZ0cEt5dGRLU2tnZTF4dUlDQWdJQ0FnYVdZZ0tHMWhkR05vWlhOVFpXeGxZM1J2Y2lobGJHVnRaVzUwTENCelpXeGxZM1J2Y2lrcElIdGNiaUFnSUNBZ0lDQWdjbVZ6ZFd4MGN5NXdkWE5vS0dWc1pXMWxiblFwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0J5WlhOMWJIUnpMbkIxYzJndVlYQndiSGtvY21WemRXeDBjeXdnY1hOaEtITmxiR1ZqZEc5eUxDQmpiMjUwWlhoMEtTazdYRzRnSUgxY2JpQWdjbVYwZFhKdUlISmxjM1ZzZEhNN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUcxaGRHTm9aWE1nS0hObGJHVmpkRzl5TENCbGJHVnRaVzUwY3lrZ2UxeHVJQ0J5WlhSMWNtNGdabWx1WkNoelpXeGxZM1J2Y2l3Z2JuVnNiQ3dnYm5Wc2JDd2daV3hsYldWdWRITXBPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnRZWFJqYUdWelUyVnNaV04wYjNJZ0tHVnNaVzFsYm5Rc0lITmxiR1ZqZEc5eUtTQjdYRzRnSUhKbGRIVnliaUJ0WVhSamFDNWpZV3hzS0dWc1pXMWxiblFzSUhObGJHVmpkRzl5S1R0Y2JuMWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtYVc1a08xeHVYRzVtYVc1a0xtMWhkR05vWlhNZ1BTQnRZWFJqYUdWek8xeHVabWx1WkM1dFlYUmphR1Z6VTJWc1pXTjBiM0lnUFNCdFlYUmphR1Z6VTJWc1pXTjBiM0k3WEc0aVhYMD0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHViID0gcmVxdWlyZSgnLi9zdHViJyk7XG52YXIgdHJhY2tpbmcgPSByZXF1aXJlKCcuL3RyYWNraW5nJyk7XG52YXIgbHMgPSAnbG9jYWxTdG9yYWdlJyBpbiBnbG9iYWwgJiYgZ2xvYmFsLmxvY2FsU3RvcmFnZSA/IGdsb2JhbC5sb2NhbFN0b3JhZ2UgOiBzdHViO1xuXG5mdW5jdGlvbiBhY2Nlc3NvciAoa2V5LCB2YWx1ZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBnZXQoa2V5KTtcbiAgfVxuICByZXR1cm4gc2V0KGtleSwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXQgKGtleSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShscy5nZXRJdGVtKGtleSkpO1xufVxuXG5mdW5jdGlvbiBzZXQgKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBscy5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUgKGtleSkge1xuICByZXR1cm4gbHMucmVtb3ZlSXRlbShrZXkpO1xufVxuXG5mdW5jdGlvbiBjbGVhciAoKSB7XG4gIHJldHVybiBscy5jbGVhcigpO1xufVxuXG5hY2Nlc3Nvci5zZXQgPSBzZXQ7XG5hY2Nlc3Nvci5nZXQgPSBnZXQ7XG5hY2Nlc3Nvci5yZW1vdmUgPSByZW1vdmU7XG5hY2Nlc3Nvci5jbGVhciA9IGNsZWFyO1xuYWNjZXNzb3Iub24gPSB0cmFja2luZy5vbjtcbmFjY2Vzc29yLm9mZiA9IHRyYWNraW5nLm9mZjtcblxubW9kdWxlLmV4cG9ydHMgPSBhY2Nlc3NvcjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5c2IyTmhiQzF6ZEc5eVlXZGxMMnh2WTJGc0xYTjBiM0poWjJVdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCemRIVmlJRDBnY21WeGRXbHlaU2duTGk5emRIVmlKeWs3WEc1MllYSWdkSEpoWTJ0cGJtY2dQU0J5WlhGMWFYSmxLQ2N1TDNSeVlXTnJhVzVuSnlrN1hHNTJZWElnYkhNZ1BTQW5iRzlqWVd4VGRHOXlZV2RsSnlCcGJpQm5iRzlpWVd3Z0ppWWdaMnh2WW1Gc0xteHZZMkZzVTNSdmNtRm5aU0EvSUdkc2IySmhiQzVzYjJOaGJGTjBiM0poWjJVZ09pQnpkSFZpTzF4dVhHNW1kVzVqZEdsdmJpQmhZMk5sYzNOdmNpQW9hMlY1TENCMllXeDFaU2tnZTF4dUlDQnBaaUFvWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0E5UFQwZ01Ta2dlMXh1SUNBZ0lISmxkSFZ5YmlCblpYUW9hMlY1S1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnYzJWMEtHdGxlU3dnZG1Gc2RXVXBPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQm5aWFFnS0d0bGVTa2dlMXh1SUNCeVpYUjFjbTRnU2xOUFRpNXdZWEp6WlNoc2N5NW5aWFJKZEdWdEtHdGxlU2twTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ6WlhRZ0tHdGxlU3dnZG1Gc2RXVXBJSHRjYmlBZ2RISjVJSHRjYmlBZ0lDQnNjeTV6WlhSSmRHVnRLR3RsZVN3Z1NsTlBUaTV6ZEhKcGJtZHBabmtvZG1Gc2RXVXBLVHRjYmlBZ0lDQnlaWFIxY200Z2RISjFaVHRjYmlBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVpXMXZkbVVnS0d0bGVTa2dlMXh1SUNCeVpYUjFjbTRnYkhNdWNtVnRiM1psU1hSbGJTaHJaWGtwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJqYkdWaGNpQW9LU0I3WEc0Z0lISmxkSFZ5YmlCc2N5NWpiR1ZoY2lncE8xeHVmVnh1WEc1aFkyTmxjM052Y2k1elpYUWdQU0J6WlhRN1hHNWhZMk5sYzNOdmNpNW5aWFFnUFNCblpYUTdYRzVoWTJObGMzTnZjaTV5WlcxdmRtVWdQU0J5WlcxdmRtVTdYRzVoWTJObGMzTnZjaTVqYkdWaGNpQTlJR05zWldGeU8xeHVZV05qWlhOemIzSXViMjRnUFNCMGNtRmphMmx1Wnk1dmJqdGNibUZqWTJWemMyOXlMbTltWmlBOUlIUnlZV05yYVc1bkxtOW1aanRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCaFkyTmxjM052Y2p0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbXMgPSB7fTtcblxuZnVuY3Rpb24gZ2V0SXRlbSAoa2V5KSB7XG4gIHJldHVybiBrZXkgaW4gbXMgPyBtc1trZXldIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gc2V0SXRlbSAoa2V5LCB2YWx1ZSkge1xuICBtc1trZXldID0gdmFsdWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVJdGVtIChrZXkpIHtcbiAgdmFyIGZvdW5kID0ga2V5IGluIG1zO1xuICBpZiAoZm91bmQpIHtcbiAgICByZXR1cm4gZGVsZXRlIG1zW2tleV07XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBjbGVhciAoKSB7XG4gIG1zID0ge307XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0SXRlbTogZ2V0SXRlbSxcbiAgc2V0SXRlbTogc2V0SXRlbSxcbiAgcmVtb3ZlSXRlbTogcmVtb3ZlSXRlbSxcbiAgY2xlYXI6IGNsZWFyXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbGlzdGVuZXJzID0ge307XG52YXIgbGlzdGVuaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGxpc3RlbiAoKSB7XG4gIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgY2hhbmdlLCBmYWxzZSk7XG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmF0dGFjaEV2ZW50KSB7XG4gICAgZ2xvYmFsLmF0dGFjaEV2ZW50KCdvbnN0b3JhZ2UnLCBjaGFuZ2UpO1xuICB9IGVsc2Uge1xuICAgIGdsb2JhbC5vbnN0b3JhZ2UgPSBjaGFuZ2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlIChlKSB7XG4gIGlmICghZSkge1xuICAgIGUgPSBnbG9iYWwuZXZlbnQ7XG4gIH1cbiAgdmFyIGFsbCA9IGxpc3RlbmVyc1tlLmtleV07XG4gIGlmIChhbGwpIHtcbiAgICBhbGwuZm9yRWFjaChmaXJlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpcmUgKGxpc3RlbmVyKSB7XG4gICAgbGlzdGVuZXIoSlNPTi5wYXJzZShlLm5ld1ZhbHVlKSwgSlNPTi5wYXJzZShlLm9sZFZhbHVlKSwgZS51cmwgfHwgZS51cmkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uIChrZXksIGZuKSB7XG4gIGlmIChsaXN0ZW5lcnNba2V5XSkge1xuICAgIGxpc3RlbmVyc1trZXldLnB1c2goZm4pO1xuICB9IGVsc2Uge1xuICAgIGxpc3RlbmVyc1trZXldID0gW2ZuXTtcbiAgfVxuICBpZiAobGlzdGVuaW5nID09PSBmYWxzZSkge1xuICAgIGxpc3RlbigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9mZiAoa2V5LCBmbikge1xuICB2YXIgbnMgPSBsaXN0ZW5lcnNba2V5XTtcbiAgaWYgKG5zLmxlbmd0aCA+IDEpIHtcbiAgICBucy5zcGxpY2UobnMuaW5kZXhPZihmbiksIDEpO1xuICB9IGVsc2Uge1xuICAgIGxpc3RlbmVyc1trZXldID0gW107XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uOiBvbixcbiAgb2ZmOiBvZmZcbn07XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXNiMk5oYkMxemRHOXlZV2RsTDNSeVlXTnJhVzVuTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUd4cGMzUmxibVZ5Y3lBOUlIdDlPMXh1ZG1GeUlHeHBjM1JsYm1sdVp5QTlJR1poYkhObE8xeHVYRzVtZFc1amRHbHZiaUJzYVhOMFpXNGdLQ2tnZTF4dUlDQnBaaUFvWjJ4dlltRnNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSXBJSHRjYmlBZ0lDQm5iRzlpWVd3dVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmMzUnZjbUZuWlNjc0lHTm9ZVzVuWlN3Z1ptRnNjMlVwTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLR2RzYjJKaGJDNWhkSFJoWTJoRmRtVnVkQ2tnZTF4dUlDQWdJR2RzYjJKaGJDNWhkSFJoWTJoRmRtVnVkQ2duYjI1emRHOXlZV2RsSnl3Z1kyaGhibWRsS1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCbmJHOWlZV3d1YjI1emRHOXlZV2RsSUQwZ1kyaGhibWRsTzF4dUlDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlHTm9ZVzVuWlNBb1pTa2dlMXh1SUNCcFppQW9JV1VwSUh0Y2JpQWdJQ0JsSUQwZ1oyeHZZbUZzTG1WMlpXNTBPMXh1SUNCOVhHNGdJSFpoY2lCaGJHd2dQU0JzYVhOMFpXNWxjbk5iWlM1clpYbGRPMXh1SUNCcFppQW9ZV3hzS1NCN1hHNGdJQ0FnWVd4c0xtWnZja1ZoWTJnb1ptbHlaU2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCbWFYSmxJQ2hzYVhOMFpXNWxjaWtnZTF4dUlDQWdJR3hwYzNSbGJtVnlLRXBUVDA0dWNHRnljMlVvWlM1dVpYZFdZV3gxWlNrc0lFcFRUMDR1Y0dGeWMyVW9aUzV2YkdSV1lXeDFaU2tzSUdVdWRYSnNJSHg4SUdVdWRYSnBLVHRjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCdmJpQW9hMlY1TENCbWJpa2dlMXh1SUNCcFppQW9iR2x6ZEdWdVpYSnpXMnRsZVYwcElIdGNiaUFnSUNCc2FYTjBaVzVsY25OYmEyVjVYUzV3ZFhOb0tHWnVLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JzYVhOMFpXNWxjbk5iYTJWNVhTQTlJRnRtYmwwN1hHNGdJSDFjYmlBZ2FXWWdLR3hwYzNSbGJtbHVaeUE5UFQwZ1ptRnNjMlVwSUh0Y2JpQWdJQ0JzYVhOMFpXNG9LVHRjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCdlptWWdLR3RsZVN3Z1ptNHBJSHRjYmlBZ2RtRnlJRzV6SUQwZ2JHbHpkR1Z1WlhKelcydGxlVjA3WEc0Z0lHbG1JQ2h1Y3k1c1pXNW5kR2dnUGlBeEtTQjdYRzRnSUNBZ2JuTXVjM0JzYVdObEtHNXpMbWx1WkdWNFQyWW9abTRwTENBeEtUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnNhWE4wWlc1bGNuTmJhMlY1WFNBOUlGdGRPMXh1SUNCOVhHNTlYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnZTF4dUlDQnZiam9nYjI0c1hHNGdJRzltWmpvZ2IyWm1YRzU5TzF4dUlsMTkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTZWxlY3Rpb247XG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGdldFNlbGVjdGlvblJhdyA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uUmF3Jyk7XG52YXIgZ2V0U2VsZWN0aW9uTnVsbE9wID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb25OdWxsT3AnKTtcbnZhciBnZXRTZWxlY3Rpb25TeW50aGV0aWMgPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvblN5bnRoZXRpYycpO1xudmFyIGlzSG9zdCA9IHJlcXVpcmUoJy4vaXNIb3N0Jyk7XG5pZiAoaXNIb3N0Lm1ldGhvZChnbG9iYWwsICdnZXRTZWxlY3Rpb24nKSkge1xuICBnZXRTZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb25SYXc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2Muc2VsZWN0aW9uID09PSAnb2JqZWN0JyAmJiBkb2Muc2VsZWN0aW9uKSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvblN5bnRoZXRpYztcbn0gZWxzZSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvbk51bGxPcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb247XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDJkbGRGTmxiR1ZqZEdsdmJpNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQm5aWFJUWld4bFkzUnBiMjQ3WEc1MllYSWdaRzlqSUQwZ1oyeHZZbUZzTG1SdlkzVnRaVzUwTzF4dWRtRnlJR2RsZEZObGJHVmpkR2x2YmxKaGR5QTlJSEpsY1hWcGNtVW9KeTR2WjJWMFUyVnNaV04wYVc5dVVtRjNKeWs3WEc1MllYSWdaMlYwVTJWc1pXTjBhVzl1VG5Wc2JFOXdJRDBnY21WeGRXbHlaU2duTGk5blpYUlRaV3hsWTNScGIyNU9kV3hzVDNBbktUdGNiblpoY2lCblpYUlRaV3hsWTNScGIyNVRlVzUwYUdWMGFXTWdQU0J5WlhGMWFYSmxLQ2N1TDJkbGRGTmxiR1ZqZEdsdmJsTjViblJvWlhScFl5Y3BPMXh1ZG1GeUlHbHpTRzl6ZENBOUlISmxjWFZwY21Vb0p5NHZhWE5JYjNOMEp5azdYRzVwWmlBb2FYTkliM04wTG0xbGRHaHZaQ2huYkc5aVlXd3NJQ2RuWlhSVFpXeGxZM1JwYjI0bktTa2dlMXh1SUNCblpYUlRaV3hsWTNScGIyNGdQU0JuWlhSVFpXeGxZM1JwYjI1U1lYYzdYRzU5SUdWc2MyVWdhV1lnS0hSNWNHVnZaaUJrYjJNdWMyVnNaV04wYVc5dUlEMDlQU0FuYjJKcVpXTjBKeUFtSmlCa2IyTXVjMlZzWldOMGFXOXVLU0I3WEc0Z0lHZGxkRk5sYkdWamRHbHZiaUE5SUdkbGRGTmxiR1ZqZEdsdmJsTjViblJvWlhScFl6dGNibjBnWld4elpTQjdYRzRnSUdkbGRGTmxiR1ZqZEdsdmJpQTlJR2RsZEZObGJHVmpkR2x2Yms1MWJHeFBjRHRjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm5aWFJUWld4bFkzUnBiMjQ3WEc0aVhYMD0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uTnVsbE9wICgpIHtcbiAgcmV0dXJuIHtcbiAgICByZW1vdmVBbGxSYW5nZXM6IG5vb3AsXG4gICAgYWRkUmFuZ2U6IG5vb3BcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb25OdWxsT3A7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGlvblJhdyAoKSB7XG4gIHJldHVybiBnbG9iYWwuZ2V0U2VsZWN0aW9uKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uUmF3O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld4bFkyTnBiMjR2YzNKakwyZGxkRk5sYkdWamRHbHZibEpoZHk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1bWRXNWpkR2x2YmlCblpYUlRaV3hsWTNScGIyNVNZWGNnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdaMnh2WW1Gc0xtZGxkRk5sYkdWamRHbHZiaWdwTzF4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR2RsZEZObGJHVmpkR2x2YmxKaGR6dGNiaUpkZlE9PSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmdlVG9UZXh0UmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlVG9UZXh0UmFuZ2UnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYm9keSA9IGRvYy5ib2R5O1xudmFyIEdldFNlbGVjdGlvblByb3RvID0gR2V0U2VsZWN0aW9uLnByb3RvdHlwZTtcblxuZnVuY3Rpb24gR2V0U2VsZWN0aW9uIChzZWxlY3Rpb24pIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgcmFuZ2UgPSBzZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcblxuICB0aGlzLl9zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gIHRoaXMuX3JhbmdlcyA9IFtdO1xuXG4gIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ0NvbnRyb2wnKSB7XG4gICAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbihzZWxmKTtcbiAgfSBlbHNlIGlmIChpc1RleHRSYW5nZShyYW5nZSkpIHtcbiAgICB1cGRhdGVGcm9tVGV4dFJhbmdlKHNlbGYsIHJhbmdlKTtcbiAgfSBlbHNlIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWxmKTtcbiAgfVxufVxuXG5HZXRTZWxlY3Rpb25Qcm90by5yZW1vdmVBbGxSYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0UmFuZ2U7XG4gIHRyeSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbi50eXBlICE9PSAnTm9uZScpIHtcbiAgICAgIHRleHRSYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICB0ZXh0UmFuZ2Uuc2VsZWN0KCk7XG4gICAgICB0aGlzLl9zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICB1cGRhdGVFbXB0eVNlbGVjdGlvbih0aGlzKTtcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmFkZFJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSA9PT0gJ0NvbnRyb2wnKSB7XG4gICAgYWRkUmFuZ2VUb0NvbnRyb2xTZWxlY3Rpb24odGhpcywgcmFuZ2UpO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlVG9UZXh0UmFuZ2UocmFuZ2UpLnNlbGVjdCgpO1xuICAgIHRoaXMuX3Jhbmdlc1swXSA9IHJhbmdlO1xuICAgIHRoaXMucmFuZ2VDb3VudCA9IDE7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRoaXMuX3Jhbmdlc1swXS5jb2xsYXBzZWQ7XG4gICAgdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2UodGhpcywgcmFuZ2UsIGZhbHNlKTtcbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uc2V0UmFuZ2VzID0gZnVuY3Rpb24gKHJhbmdlcykge1xuICB0aGlzLnJlbW92ZUFsbFJhbmdlcygpO1xuICB2YXIgcmFuZ2VDb3VudCA9IHJhbmdlcy5sZW5ndGg7XG4gIGlmIChyYW5nZUNvdW50ID4gMSkge1xuICAgIGNyZWF0ZUNvbnRyb2xTZWxlY3Rpb24odGhpcywgcmFuZ2VzKTtcbiAgfSBlbHNlIGlmIChyYW5nZUNvdW50KSB7XG4gICAgdGhpcy5hZGRSYW5nZShyYW5nZXNbMF0pO1xuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5nZXRSYW5nZUF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5yYW5nZUNvdW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRSYW5nZUF0KCk6IGluZGV4IG91dCBvZiBib3VuZHMnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VzW2luZGV4XS5jbG9uZVJhbmdlKCk7XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLnJlbW92ZVJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSAhPT0gJ0NvbnRyb2wnKSB7XG4gICAgcmVtb3ZlUmFuZ2VNYW51YWxseSh0aGlzLCByYW5nZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjb250cm9sUmFuZ2UgPSB0aGlzLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHJhbmdlRWxlbWVudCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2UpO1xuICB2YXIgbmV3Q29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgdmFyIGVsO1xuICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gY29udHJvbFJhbmdlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgZWwgPSBjb250cm9sUmFuZ2UuaXRlbShpKTtcbiAgICBpZiAoZWwgIT09IHJhbmdlRWxlbWVudCB8fCByZW1vdmVkKSB7XG4gICAgICBuZXdDb250cm9sUmFuZ2UuYWRkKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfVxuICB9XG4gIG5ld0NvbnRyb2xSYW5nZS5zZWxlY3QoKTtcbiAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbih0aGlzKTtcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmVhY2hSYW5nZSA9IGZ1bmN0aW9uIChmbiwgcmV0dXJuVmFsdWUpIHtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbGVuID0gdGhpcy5fcmFuZ2VzLmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGZuKHRoaXMuZ2V0UmFuZ2VBdChpKSkpIHtcbiAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmdldEFsbFJhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJhbmdlcyA9IFtdO1xuICB0aGlzLmVhY2hSYW5nZShmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICByYW5nZXMucHVzaChyYW5nZSk7XG4gIH0pO1xuICByZXR1cm4gcmFuZ2VzO1xufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uc2V0U2luZ2xlUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgdGhpcy5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgdGhpcy5hZGRSYW5nZShyYW5nZSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDb250cm9sU2VsZWN0aW9uIChzZWwsIHJhbmdlcykge1xuICB2YXIgY29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGVsLCBsZW4gPSByYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBlbCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2VzW2ldKTtcbiAgICB0cnkge1xuICAgICAgY29udHJvbFJhbmdlLmFkZChlbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRSYW5nZXMoKTogRWxlbWVudCBjb3VsZCBub3QgYmUgYWRkZWQgdG8gY29udHJvbCBzZWxlY3Rpb24nKTtcbiAgICB9XG4gIH1cbiAgY29udHJvbFJhbmdlLnNlbGVjdCgpO1xuICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHNlbCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJhbmdlTWFudWFsbHkgKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIHJhbmdlcyA9IHNlbC5nZXRBbGxSYW5nZXMoKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmFuZ2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKCFpc1NhbWVSYW5nZShyYW5nZSwgcmFuZ2VzW2ldKSkge1xuICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmICghc2VsLnJhbmdlQ291bnQpIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlIChzZWwsIHJhbmdlKSB7XG4gIHZhciBhbmNob3JQcmVmaXggPSAnc3RhcnQnO1xuICB2YXIgZm9jdXNQcmVmaXggPSAnZW5kJztcbiAgc2VsLmFuY2hvck5vZGUgPSByYW5nZVthbmNob3JQcmVmaXggKyAnQ29udGFpbmVyJ107XG4gIHNlbC5hbmNob3JPZmZzZXQgPSByYW5nZVthbmNob3JQcmVmaXggKyAnT2Zmc2V0J107XG4gIHNlbC5mb2N1c05vZGUgPSByYW5nZVtmb2N1c1ByZWZpeCArICdDb250YWluZXInXTtcbiAgc2VsLmZvY3VzT2Zmc2V0ID0gcmFuZ2VbZm9jdXNQcmVmaXggKyAnT2Zmc2V0J107XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUVtcHR5U2VsZWN0aW9uIChzZWwpIHtcbiAgc2VsLmFuY2hvck5vZGUgPSBzZWwuZm9jdXNOb2RlID0gbnVsbDtcbiAgc2VsLmFuY2hvck9mZnNldCA9IHNlbC5mb2N1c09mZnNldCA9IDA7XG4gIHNlbC5yYW5nZUNvdW50ID0gMDtcbiAgc2VsLmlzQ29sbGFwc2VkID0gdHJ1ZTtcbiAgc2VsLl9yYW5nZXMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gcmFuZ2VDb250YWluc1NpbmdsZUVsZW1lbnQgKHJhbmdlTm9kZXMpIHtcbiAgaWYgKCFyYW5nZU5vZGVzLmxlbmd0aCB8fCByYW5nZU5vZGVzWzBdLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAodmFyIGkgPSAxLCBsZW4gPSByYW5nZU5vZGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKCFpc0FuY2VzdG9yT2YocmFuZ2VOb2Rlc1swXSwgcmFuZ2VOb2Rlc1tpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UgKHJhbmdlKSB7XG4gIHZhciBub2RlcyA9IHJhbmdlLmdldE5vZGVzKCk7XG4gIGlmICghcmFuZ2VDb250YWluc1NpbmdsZUVsZW1lbnQobm9kZXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKCk6IHJhbmdlIGRpZCBub3QgY29uc2lzdCBvZiBhIHNpbmdsZSBlbGVtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIG5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBpc1RleHRSYW5nZSAocmFuZ2UpIHtcbiAgcmV0dXJuIHJhbmdlICYmIHJhbmdlLnRleHQgIT09IHZvaWQgMDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRnJvbVRleHRSYW5nZSAoc2VsLCByYW5nZSkge1xuICBzZWwuX3JhbmdlcyA9IFtyYW5nZV07XG4gIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlKHNlbCwgcmFuZ2UsIGZhbHNlKTtcbiAgc2VsLnJhbmdlQ291bnQgPSAxO1xuICBzZWwuaXNDb2xsYXBzZWQgPSByYW5nZS5jb2xsYXBzZWQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24gKHNlbCkge1xuICBzZWwuX3Jhbmdlcy5sZW5ndGggPSAwO1xuICBpZiAoc2VsLl9zZWxlY3Rpb24udHlwZSA9PT0gJ05vbmUnKSB7XG4gICAgdXBkYXRlRW1wdHlTZWxlY3Rpb24oc2VsKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY29udHJvbFJhbmdlID0gc2VsLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICBpZiAoaXNUZXh0UmFuZ2UoY29udHJvbFJhbmdlKSkge1xuICAgICAgdXBkYXRlRnJvbVRleHRSYW5nZShzZWwsIGNvbnRyb2xSYW5nZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbC5yYW5nZUNvdW50ID0gY29udHJvbFJhbmdlLmxlbmd0aDtcbiAgICAgIHZhciByYW5nZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsLnJhbmdlQ291bnQ7ICsraSkge1xuICAgICAgICByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgICAgICAgc2VsLl9yYW5nZXMucHVzaChyYW5nZSk7XG4gICAgICB9XG4gICAgICBzZWwuaXNDb2xsYXBzZWQgPSBzZWwucmFuZ2VDb3VudCA9PT0gMSAmJiBzZWwuX3Jhbmdlc1swXS5jb2xsYXBzZWQ7XG4gICAgICB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZShzZWwsIHNlbC5fcmFuZ2VzW3NlbC5yYW5nZUNvdW50IC0gMV0sIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkUmFuZ2VUb0NvbnRyb2xTZWxlY3Rpb24gKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIGNvbnRyb2xSYW5nZSA9IHNlbC5fc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gIHZhciByYW5nZUVsZW1lbnQgPSBnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKHJhbmdlKTtcbiAgdmFyIG5ld0NvbnRyb2xSYW5nZSA9IGJvZHkuY3JlYXRlQ29udHJvbFJhbmdlKCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjb250cm9sUmFuZ2UubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBuZXdDb250cm9sUmFuZ2UuYWRkKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgfVxuICB0cnkge1xuICAgIG5ld0NvbnRyb2xSYW5nZS5hZGQocmFuZ2VFbGVtZW50KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignYWRkUmFuZ2UoKTogRWxlbWVudCBjb3VsZCBub3QgYmUgYWRkZWQgdG8gY29udHJvbCBzZWxlY3Rpb24nKTtcbiAgfVxuICBuZXdDb250cm9sUmFuZ2Uuc2VsZWN0KCk7XG4gIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24oc2VsKTtcbn1cblxuZnVuY3Rpb24gaXNTYW1lUmFuZ2UgKGxlZnQsIHJpZ2h0KSB7XG4gIHJldHVybiAoXG4gICAgbGVmdC5zdGFydENvbnRhaW5lciA9PT0gcmlnaHQuc3RhcnRDb250YWluZXIgJiZcbiAgICBsZWZ0LnN0YXJ0T2Zmc2V0ID09PSByaWdodC5zdGFydE9mZnNldCAmJlxuICAgIGxlZnQuZW5kQ29udGFpbmVyID09PSByaWdodC5lbmRDb250YWluZXIgJiZcbiAgICBsZWZ0LmVuZE9mZnNldCA9PT0gcmlnaHQuZW5kT2Zmc2V0XG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzQW5jZXN0b3JPZiAoYW5jZXN0b3IsIGRlc2NlbmRhbnQpIHtcbiAgdmFyIG5vZGUgPSBkZXNjZW5kYW50O1xuICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSA9PT0gYW5jZXN0b3IpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBHZXRTZWxlY3Rpb24oZ2xvYmFsLmRvY3VtZW50LnNlbGVjdGlvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld4bFkyTnBiMjR2YzNKakwyZGxkRk5sYkdWamRHbHZibE41Ym5Sb1pYUnBZeTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2NtRnVaMlZVYjFSbGVIUlNZVzVuWlNBOUlISmxjWFZwY21Vb0p5NHZjbUZ1WjJWVWIxUmxlSFJTWVc1blpTY3BPMXh1ZG1GeUlHUnZZeUE5SUdkc2IySmhiQzVrYjJOMWJXVnVkRHRjYm5aaGNpQmliMlI1SUQwZ1pHOWpMbUp2WkhrN1hHNTJZWElnUjJWMFUyVnNaV04wYVc5dVVISnZkRzhnUFNCSFpYUlRaV3hsWTNScGIyNHVjSEp2ZEc5MGVYQmxPMXh1WEc1bWRXNWpkR2x2YmlCSFpYUlRaV3hsWTNScGIyNGdLSE5sYkdWamRHbHZiaWtnZTF4dUlDQjJZWElnYzJWc1ppQTlJSFJvYVhNN1hHNGdJSFpoY2lCeVlXNW5aU0E5SUhObGJHVmpkR2x2Ymk1amNtVmhkR1ZTWVc1blpTZ3BPMXh1WEc0Z0lIUm9hWE11WDNObGJHVmpkR2x2YmlBOUlITmxiR1ZqZEdsdmJqdGNiaUFnZEdocGN5NWZjbUZ1WjJWeklEMGdXMTA3WEc1Y2JpQWdhV1lnS0hObGJHVmpkR2x2Ymk1MGVYQmxJRDA5UFNBblEyOXVkSEp2YkNjcElIdGNiaUFnSUNCMWNHUmhkR1ZEYjI1MGNtOXNVMlZzWldOMGFXOXVLSE5sYkdZcE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0dselZHVjRkRkpoYm1kbEtISmhibWRsS1NrZ2UxeHVJQ0FnSUhWd1pHRjBaVVp5YjIxVVpYaDBVbUZ1WjJVb2MyVnNaaXdnY21GdVoyVXBPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSFZ3WkdGMFpVVnRjSFI1VTJWc1pXTjBhVzl1S0hObGJHWXBPMXh1SUNCOVhHNTlYRzVjYmtkbGRGTmxiR1ZqZEdsdmJsQnliM1J2TG5KbGJXOTJaVUZzYkZKaGJtZGxjeUE5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnZG1GeUlIUmxlSFJTWVc1blpUdGNiaUFnZEhKNUlIdGNiaUFnSUNCMGFHbHpMbDl6Wld4bFkzUnBiMjR1Wlcxd2RIa29LVHRjYmlBZ0lDQnBaaUFvZEdocGN5NWZjMlZzWldOMGFXOXVMblI1Y0dVZ0lUMDlJQ2RPYjI1bEp5a2dlMXh1SUNBZ0lDQWdkR1Y0ZEZKaGJtZGxJRDBnWW05a2VTNWpjbVZoZEdWVVpYaDBVbUZ1WjJVb0tUdGNiaUFnSUNBZ0lIUmxlSFJTWVc1blpTNXpaV3hsWTNRb0tUdGNiaUFnSUNBZ0lIUm9hWE11WDNObGJHVmpkR2x2Ymk1bGJYQjBlU2dwTzF4dUlDQWdJSDFjYmlBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNCOVhHNGdJSFZ3WkdGMFpVVnRjSFI1VTJWc1pXTjBhVzl1S0hSb2FYTXBPMXh1ZlR0Y2JseHVSMlYwVTJWc1pXTjBhVzl1VUhKdmRHOHVZV1JrVW1GdVoyVWdQU0JtZFc1amRHbHZiaUFvY21GdVoyVXBJSHRjYmlBZ2FXWWdLSFJvYVhNdVgzTmxiR1ZqZEdsdmJpNTBlWEJsSUQwOVBTQW5RMjl1ZEhKdmJDY3BJSHRjYmlBZ0lDQmhaR1JTWVc1blpWUnZRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpaDBhR2x6TENCeVlXNW5aU2s3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnY21GdVoyVlViMVJsZUhSU1lXNW5aU2h5WVc1blpTa3VjMlZzWldOMEtDazdYRzRnSUNBZ2RHaHBjeTVmY21GdVoyVnpXekJkSUQwZ2NtRnVaMlU3WEc0Z0lDQWdkR2hwY3k1eVlXNW5aVU52ZFc1MElEMGdNVHRjYmlBZ0lDQjBhR2x6TG1selEyOXNiR0Z3YzJWa0lEMGdkR2hwY3k1ZmNtRnVaMlZ6V3pCZExtTnZiR3hoY0hObFpEdGNiaUFnSUNCMWNHUmhkR1ZCYm1Ob2IzSkJibVJHYjJOMWMwWnliMjFTWVc1blpTaDBhR2x6TENCeVlXNW5aU3dnWm1Gc2MyVXBPMXh1SUNCOVhHNTlPMXh1WEc1SFpYUlRaV3hsWTNScGIyNVFjbTkwYnk1elpYUlNZVzVuWlhNZ1BTQm1kVzVqZEdsdmJpQW9jbUZ1WjJWektTQjdYRzRnSUhSb2FYTXVjbVZ0YjNabFFXeHNVbUZ1WjJWektDazdYRzRnSUhaaGNpQnlZVzVuWlVOdmRXNTBJRDBnY21GdVoyVnpMbXhsYm1kMGFEdGNiaUFnYVdZZ0tISmhibWRsUTI5MWJuUWdQaUF4S1NCN1hHNGdJQ0FnWTNKbFlYUmxRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpaDBhR2x6TENCeVlXNW5aWE1wTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLSEpoYm1kbFEyOTFiblFwSUh0Y2JpQWdJQ0IwYUdsekxtRmtaRkpoYm1kbEtISmhibWRsYzFzd1hTazdYRzRnSUgxY2JuMDdYRzVjYmtkbGRGTmxiR1ZqZEdsdmJsQnliM1J2TG1kbGRGSmhibWRsUVhRZ1BTQm1kVzVqZEdsdmJpQW9hVzVrWlhncElIdGNiaUFnYVdZZ0tHbHVaR1Y0SUR3Z01DQjhmQ0JwYm1SbGVDQStQU0IwYUdsekxuSmhibWRsUTI5MWJuUXBJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oyZGxkRkpoYm1kbFFYUW9LVG9nYVc1a1pYZ2diM1YwSUc5bUlHSnZkVzVrY3ljcE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpMbDl5WVc1blpYTmJhVzVrWlhoZExtTnNiMjVsVW1GdVoyVW9LVHRjYmlBZ2ZWeHVmVHRjYmx4dVIyVjBVMlZzWldOMGFXOXVVSEp2ZEc4dWNtVnRiM1psVW1GdVoyVWdQU0JtZFc1amRHbHZiaUFvY21GdVoyVXBJSHRjYmlBZ2FXWWdLSFJvYVhNdVgzTmxiR1ZqZEdsdmJpNTBlWEJsSUNFOVBTQW5RMjl1ZEhKdmJDY3BJSHRjYmlBZ0lDQnlaVzF2ZG1WU1lXNW5aVTFoYm5WaGJHeDVLSFJvYVhNc0lISmhibWRsS1R0Y2JpQWdJQ0J5WlhSMWNtNDdYRzRnSUgxY2JpQWdkbUZ5SUdOdmJuUnliMnhTWVc1blpTQTlJSFJvYVhNdVgzTmxiR1ZqZEdsdmJpNWpjbVZoZEdWU1lXNW5aU2dwTzF4dUlDQjJZWElnY21GdVoyVkZiR1Z0Wlc1MElEMGdaMlYwVTJsdVoyeGxSV3hsYldWdWRFWnliMjFTWVc1blpTaHlZVzVuWlNrN1hHNGdJSFpoY2lCdVpYZERiMjUwY205c1VtRnVaMlVnUFNCaWIyUjVMbU55WldGMFpVTnZiblJ5YjJ4U1lXNW5aU2dwTzF4dUlDQjJZWElnWld3N1hHNGdJSFpoY2lCeVpXMXZkbVZrSUQwZ1ptRnNjMlU3WEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3TENCc1pXNGdQU0JqYjI1MGNtOXNVbUZ1WjJVdWJHVnVaM1JvT3lCcElEd2diR1Z1T3lBcksya3BJSHRjYmlBZ0lDQmxiQ0E5SUdOdmJuUnliMnhTWVc1blpTNXBkR1Z0S0drcE8xeHVJQ0FnSUdsbUlDaGxiQ0FoUFQwZ2NtRnVaMlZGYkdWdFpXNTBJSHg4SUhKbGJXOTJaV1FwSUh0Y2JpQWdJQ0FnSUc1bGQwTnZiblJ5YjJ4U1lXNW5aUzVoWkdRb1kyOXVkSEp2YkZKaGJtZGxMbWwwWlcwb2FTa3BPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCeVpXMXZkbVZrSUQwZ2RISjFaVHRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdibVYzUTI5dWRISnZiRkpoYm1kbExuTmxiR1ZqZENncE8xeHVJQ0IxY0dSaGRHVkRiMjUwY205c1UyVnNaV04wYVc5dUtIUm9hWE1wTzF4dWZUdGNibHh1UjJWMFUyVnNaV04wYVc5dVVISnZkRzh1WldGamFGSmhibWRsSUQwZ1puVnVZM1JwYjI0Z0tHWnVMQ0J5WlhSMWNtNVdZV3gxWlNrZ2UxeHVJQ0IyWVhJZ2FTQTlJREE3WEc0Z0lIWmhjaUJzWlc0Z1BTQjBhR2x6TGw5eVlXNW5aWE11YkdWdVozUm9PMXh1SUNCbWIzSWdLR2tnUFNBd095QnBJRHdnYkdWdU95QXJLMmtwSUh0Y2JpQWdJQ0JwWmlBb1ptNG9kR2hwY3k1blpYUlNZVzVuWlVGMEtHa3BLU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSEpsZEhWeWJsWmhiSFZsTzF4dUlDQWdJSDFjYmlBZ2ZWeHVmVHRjYmx4dVIyVjBVMlZzWldOMGFXOXVVSEp2ZEc4dVoyVjBRV3hzVW1GdVoyVnpJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0IyWVhJZ2NtRnVaMlZ6SUQwZ1cxMDdYRzRnSUhSb2FYTXVaV0ZqYUZKaGJtZGxLR1oxYm1OMGFXOXVJQ2h5WVc1blpTa2dlMXh1SUNBZ0lISmhibWRsY3k1d2RYTm9LSEpoYm1kbEtUdGNiaUFnZlNrN1hHNGdJSEpsZEhWeWJpQnlZVzVuWlhNN1hHNTlPMXh1WEc1SFpYUlRaV3hsWTNScGIyNVFjbTkwYnk1elpYUlRhVzVuYkdWU1lXNW5aU0E5SUdaMWJtTjBhVzl1SUNoeVlXNW5aU2tnZTF4dUlDQjBhR2x6TG5KbGJXOTJaVUZzYkZKaGJtZGxjeWdwTzF4dUlDQjBhR2x6TG1Ga1pGSmhibWRsS0hKaGJtZGxLVHRjYm4wN1hHNWNibVoxYm1OMGFXOXVJR055WldGMFpVTnZiblJ5YjJ4VFpXeGxZM1JwYjI0Z0tITmxiQ3dnY21GdVoyVnpLU0I3WEc0Z0lIWmhjaUJqYjI1MGNtOXNVbUZ1WjJVZ1BTQmliMlI1TG1OeVpXRjBaVU52Ym5SeWIyeFNZVzVuWlNncE8xeHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Dd2daV3dzSUd4bGJpQTlJSEpoYm1kbGN5NXNaVzVuZEdnN0lHa2dQQ0JzWlc0N0lDc3JhU2tnZTF4dUlDQWdJR1ZzSUQwZ1oyVjBVMmx1WjJ4bFJXeGxiV1Z1ZEVaeWIyMVNZVzVuWlNoeVlXNW5aWE5iYVYwcE8xeHVJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQmpiMjUwY205c1VtRnVaMlV1WVdSa0tHVnNLVHRjYmlBZ0lDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KM05sZEZKaGJtZGxjeWdwT2lCRmJHVnRaVzUwSUdOdmRXeGtJRzV2ZENCaVpTQmhaR1JsWkNCMGJ5QmpiMjUwY205c0lITmxiR1ZqZEdsdmJpY3BPMXh1SUNBZ0lIMWNiaUFnZlZ4dUlDQmpiMjUwY205c1VtRnVaMlV1YzJWc1pXTjBLQ2s3WEc0Z0lIVndaR0YwWlVOdmJuUnliMnhUWld4bFkzUnBiMjRvYzJWc0tUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2NtVnRiM1psVW1GdVoyVk5ZVzUxWVd4c2VTQW9jMlZzTENCeVlXNW5aU2tnZTF4dUlDQjJZWElnY21GdVoyVnpJRDBnYzJWc0xtZGxkRUZzYkZKaGJtZGxjeWdwTzF4dUlDQnpaV3d1Y21WdGIzWmxRV3hzVW1GdVoyVnpLQ2s3WEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3TENCc1pXNGdQU0J5WVc1blpYTXViR1Z1WjNSb095QnBJRHdnYkdWdU95QXJLMmtwSUh0Y2JpQWdJQ0JwWmlBb0lXbHpVMkZ0WlZKaGJtZGxLSEpoYm1kbExDQnlZVzVuWlhOYmFWMHBLU0I3WEc0Z0lDQWdJQ0J6Wld3dVlXUmtVbUZ1WjJVb2NtRnVaMlZ6VzJsZEtUdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2FXWWdLQ0Z6Wld3dWNtRnVaMlZEYjNWdWRDa2dlMXh1SUNBZ0lIVndaR0YwWlVWdGNIUjVVMlZzWldOMGFXOXVLSE5sYkNrN1hHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdkWEJrWVhSbFFXNWphRzl5UVc1a1JtOWpkWE5HY205dFVtRnVaMlVnS0hObGJDd2djbUZ1WjJVcElIdGNiaUFnZG1GeUlHRnVZMmh2Y2xCeVpXWnBlQ0E5SUNkemRHRnlkQ2M3WEc0Z0lIWmhjaUJtYjJOMWMxQnlaV1pwZUNBOUlDZGxibVFuTzF4dUlDQnpaV3d1WVc1amFHOXlUbTlrWlNBOUlISmhibWRsVzJGdVkyaHZjbEJ5WldacGVDQXJJQ2REYjI1MFlXbHVaWEluWFR0Y2JpQWdjMlZzTG1GdVkyaHZjazltWm5ObGRDQTlJSEpoYm1kbFcyRnVZMmh2Y2xCeVpXWnBlQ0FySUNkUFptWnpaWFFuWFR0Y2JpQWdjMlZzTG1adlkzVnpUbTlrWlNBOUlISmhibWRsVzJadlkzVnpVSEpsWm1sNElDc2dKME52Ym5SaGFXNWxjaWRkTzF4dUlDQnpaV3d1Wm05amRYTlBabVp6WlhRZ1BTQnlZVzVuWlZ0bWIyTjFjMUJ5WldacGVDQXJJQ2RQWm1aelpYUW5YVHRjYm4xY2JseHVablZ1WTNScGIyNGdkWEJrWVhSbFJXMXdkSGxUWld4bFkzUnBiMjRnS0hObGJDa2dlMXh1SUNCelpXd3VZVzVqYUc5eVRtOWtaU0E5SUhObGJDNW1iMk4xYzA1dlpHVWdQU0J1ZFd4c08xeHVJQ0J6Wld3dVlXNWphRzl5VDJabWMyVjBJRDBnYzJWc0xtWnZZM1Z6VDJabWMyVjBJRDBnTUR0Y2JpQWdjMlZzTG5KaGJtZGxRMjkxYm5RZ1BTQXdPMXh1SUNCelpXd3VhWE5EYjJ4c1lYQnpaV1FnUFNCMGNuVmxPMXh1SUNCelpXd3VYM0poYm1kbGN5NXNaVzVuZEdnZ1BTQXdPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlZVzVuWlVOdmJuUmhhVzV6VTJsdVoyeGxSV3hsYldWdWRDQW9jbUZ1WjJWT2IyUmxjeWtnZTF4dUlDQnBaaUFvSVhKaGJtZGxUbTlrWlhNdWJHVnVaM1JvSUh4OElISmhibWRsVG05a1pYTmJNRjB1Ym05a1pWUjVjR1VnSVQwOUlERXBJSHRjYmlBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lIMWNiaUFnWm05eUlDaDJZWElnYVNBOUlERXNJR3hsYmlBOUlISmhibWRsVG05a1pYTXViR1Z1WjNSb095QnBJRHdnYkdWdU95QXJLMmtwSUh0Y2JpQWdJQ0JwWmlBb0lXbHpRVzVqWlhOMGIzSlBaaWh5WVc1blpVNXZaR1Z6V3pCZExDQnlZVzVuWlU1dlpHVnpXMmxkS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lIMWNiaUFnZlZ4dUlDQnlaWFIxY200Z2RISjFaVHRjYm4xY2JseHVablZ1WTNScGIyNGdaMlYwVTJsdVoyeGxSV3hsYldWdWRFWnliMjFTWVc1blpTQW9jbUZ1WjJVcElIdGNiaUFnZG1GeUlHNXZaR1Z6SUQwZ2NtRnVaMlV1WjJWMFRtOWtaWE1vS1R0Y2JpQWdhV1lnS0NGeVlXNW5aVU52Ym5SaGFXNXpVMmx1WjJ4bFJXeGxiV1Z1ZENodWIyUmxjeWtwSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMmRsZEZOcGJtZHNaVVZzWlcxbGJuUkdjbTl0VW1GdVoyVW9LVG9nY21GdVoyVWdaR2xrSUc1dmRDQmpiMjV6YVhOMElHOW1JR0VnYzJsdVoyeGxJR1ZzWlcxbGJuUW5LVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdibTlrWlhOYk1GMDdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHbHpWR1Y0ZEZKaGJtZGxJQ2h5WVc1blpTa2dlMXh1SUNCeVpYUjFjbTRnY21GdVoyVWdKaVlnY21GdVoyVXVkR1Y0ZENBaFBUMGdkbTlwWkNBd08xeHVmVnh1WEc1bWRXNWpkR2x2YmlCMWNHUmhkR1ZHY205dFZHVjRkRkpoYm1kbElDaHpaV3dzSUhKaGJtZGxLU0I3WEc0Z0lITmxiQzVmY21GdVoyVnpJRDBnVzNKaGJtZGxYVHRjYmlBZ2RYQmtZWFJsUVc1amFHOXlRVzVrUm05amRYTkdjbTl0VW1GdVoyVW9jMlZzTENCeVlXNW5aU3dnWm1Gc2MyVXBPMXh1SUNCelpXd3VjbUZ1WjJWRGIzVnVkQ0E5SURFN1hHNGdJSE5sYkM1cGMwTnZiR3hoY0hObFpDQTlJSEpoYm1kbExtTnZiR3hoY0hObFpEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2RYQmtZWFJsUTI5dWRISnZiRk5sYkdWamRHbHZiaUFvYzJWc0tTQjdYRzRnSUhObGJDNWZjbUZ1WjJWekxteGxibWQwYUNBOUlEQTdYRzRnSUdsbUlDaHpaV3d1WDNObGJHVmpkR2x2Ymk1MGVYQmxJRDA5UFNBblRtOXVaU2NwSUh0Y2JpQWdJQ0IxY0dSaGRHVkZiWEIwZVZObGJHVmpkR2x2YmloelpXd3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSFpoY2lCamIyNTBjbTlzVW1GdVoyVWdQU0J6Wld3dVgzTmxiR1ZqZEdsdmJpNWpjbVZoZEdWU1lXNW5aU2dwTzF4dUlDQWdJR2xtSUNocGMxUmxlSFJTWVc1blpTaGpiMjUwY205c1VtRnVaMlVwS1NCN1hHNGdJQ0FnSUNCMWNHUmhkR1ZHY205dFZHVjRkRkpoYm1kbEtITmxiQ3dnWTI5dWRISnZiRkpoYm1kbEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnYzJWc0xuSmhibWRsUTI5MWJuUWdQU0JqYjI1MGNtOXNVbUZ1WjJVdWJHVnVaM1JvTzF4dUlDQWdJQ0FnZG1GeUlISmhibWRsTzF4dUlDQWdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCelpXd3VjbUZ1WjJWRGIzVnVkRHNnS3l0cEtTQjdYRzRnSUNBZ0lDQWdJSEpoYm1kbElEMGdaRzlqTG1OeVpXRjBaVkpoYm1kbEtDazdYRzRnSUNBZ0lDQWdJSEpoYm1kbExuTmxiR1ZqZEU1dlpHVW9ZMjl1ZEhKdmJGSmhibWRsTG1sMFpXMG9hU2twTzF4dUlDQWdJQ0FnSUNCelpXd3VYM0poYm1kbGN5NXdkWE5vS0hKaGJtZGxLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJSE5sYkM1cGMwTnZiR3hoY0hObFpDQTlJSE5sYkM1eVlXNW5aVU52ZFc1MElEMDlQU0F4SUNZbUlITmxiQzVmY21GdVoyVnpXekJkTG1OdmJHeGhjSE5sWkR0Y2JpQWdJQ0FnSUhWd1pHRjBaVUZ1WTJodmNrRnVaRVp2WTNWelJuSnZiVkpoYm1kbEtITmxiQ3dnYzJWc0xsOXlZVzVuWlhOYmMyVnNMbkpoYm1kbFEyOTFiblFnTFNBeFhTd2dabUZzYzJVcE8xeHVJQ0FnSUgxY2JpQWdmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmhaR1JTWVc1blpWUnZRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpQW9jMlZzTENCeVlXNW5aU2tnZTF4dUlDQjJZWElnWTI5dWRISnZiRkpoYm1kbElEMGdjMlZzTGw5elpXeGxZM1JwYjI0dVkzSmxZWFJsVW1GdVoyVW9LVHRjYmlBZ2RtRnlJSEpoYm1kbFJXeGxiV1Z1ZENBOUlHZGxkRk5wYm1kc1pVVnNaVzFsYm5SR2NtOXRVbUZ1WjJVb2NtRnVaMlVwTzF4dUlDQjJZWElnYm1WM1EyOXVkSEp2YkZKaGJtZGxJRDBnWW05a2VTNWpjbVZoZEdWRGIyNTBjbTlzVW1GdVoyVW9LVHRjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREFzSUd4bGJpQTlJR052Ym5SeWIyeFNZVzVuWlM1c1pXNW5kR2c3SUdrZ1BDQnNaVzQ3SUNzcmFTa2dlMXh1SUNBZ0lHNWxkME52Ym5SeWIyeFNZVzVuWlM1aFpHUW9ZMjl1ZEhKdmJGSmhibWRsTG1sMFpXMG9hU2twTzF4dUlDQjlYRzRnSUhSeWVTQjdYRzRnSUNBZ2JtVjNRMjl1ZEhKdmJGSmhibWRsTG1Ga1pDaHlZVzVuWlVWc1pXMWxiblFwTzF4dUlDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZGhaR1JTWVc1blpTZ3BPaUJGYkdWdFpXNTBJR052ZFd4a0lHNXZkQ0JpWlNCaFpHUmxaQ0IwYnlCamIyNTBjbTlzSUhObGJHVmpkR2x2YmljcE8xeHVJQ0I5WEc0Z0lHNWxkME52Ym5SeWIyeFNZVzVuWlM1elpXeGxZM1FvS1R0Y2JpQWdkWEJrWVhSbFEyOXVkSEp2YkZObGJHVmpkR2x2YmloelpXd3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnBjMU5oYldWU1lXNW5aU0FvYkdWbWRDd2djbWxuYUhRcElIdGNiaUFnY21WMGRYSnVJQ2hjYmlBZ0lDQnNaV1owTG5OMFlYSjBRMjl1ZEdGcGJtVnlJRDA5UFNCeWFXZG9kQzV6ZEdGeWRFTnZiblJoYVc1bGNpQW1KbHh1SUNBZ0lHeGxablF1YzNSaGNuUlBabVp6WlhRZ1BUMDlJSEpwWjJoMExuTjBZWEowVDJabWMyVjBJQ1ltWEc0Z0lDQWdiR1ZtZEM1bGJtUkRiMjUwWVdsdVpYSWdQVDA5SUhKcFoyaDBMbVZ1WkVOdmJuUmhhVzVsY2lBbUpseHVJQ0FnSUd4bFpuUXVaVzVrVDJabWMyVjBJRDA5UFNCeWFXZG9kQzVsYm1SUFptWnpaWFJjYmlBZ0tUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2FYTkJibU5sYzNSdmNrOW1JQ2hoYm1ObGMzUnZjaXdnWkdWelkyVnVaR0Z1ZENrZ2UxeHVJQ0IyWVhJZ2JtOWtaU0E5SUdSbGMyTmxibVJoYm5RN1hHNGdJSGRvYVd4bElDaHViMlJsTG5CaGNtVnVkRTV2WkdVcElIdGNiaUFnSUNCcFppQW9ibTlrWlM1d1lYSmxiblJPYjJSbElEMDlQU0JoYm1ObGMzUnZjaWtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSFJ5ZFdVN1hHNGdJQ0FnZlZ4dUlDQWdJRzV2WkdVZ1BTQnViMlJsTG5CaGNtVnVkRTV2WkdVN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUdaaGJITmxPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQm5aWFJUWld4bFkzUnBiMjRnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdibVYzSUVkbGRGTmxiR1ZqZEdsdmJpaG5iRzlpWVd3dVpHOWpkVzFsYm5RdWMyVnNaV04wYVc5dUtUdGNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCblpYUlRaV3hsWTNScGIyNDdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaXNIb3N0TWV0aG9kIChob3N0LCBwcm9wKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGhvc3RbcHJvcF07XG4gIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8ICEhKHR5cGUgPT09ICdvYmplY3QnICYmIGhvc3RbcHJvcF0pIHx8IHR5cGUgPT09ICd1bmtub3duJztcbn1cblxuZnVuY3Rpb24gaXNIb3N0UHJvcGVydHkgKGhvc3QsIHByb3ApIHtcbiAgcmV0dXJuIHR5cGVvZiBob3N0W3Byb3BdICE9PSAndW5kZWZpbmVkJztcbn1cblxuZnVuY3Rpb24gbWFueSAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGFyZUhvc3RlZCAoaG9zdCwgcHJvcHMpIHtcbiAgICB2YXIgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoIWZuKGhvc3QsIHByb3BzW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0aG9kOiBpc0hvc3RNZXRob2QsXG4gIG1ldGhvZHM6IG1hbnkoaXNIb3N0TWV0aG9kKSxcbiAgcHJvcGVydHk6IGlzSG9zdFByb3BlcnR5LFxuICBwcm9wZXJ0aWVzOiBtYW55KGlzSG9zdFByb3BlcnR5KVxufTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBib2R5ID0gZG9jLmJvZHk7XG5cbmZ1bmN0aW9uIHJhbmdlVG9UZXh0UmFuZ2UgKHApIHtcbiAgaWYgKHAuY29sbGFwc2VkKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlKHsgbm9kZTogcC5zdGFydENvbnRhaW5lciwgb2Zmc2V0OiBwLnN0YXJ0T2Zmc2V0IH0sIHRydWUpO1xuICB9XG4gIHZhciBzdGFydFJhbmdlID0gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiBwLnN0YXJ0Q29udGFpbmVyLCBvZmZzZXQ6IHAuc3RhcnRPZmZzZXQgfSwgdHJ1ZSk7XG4gIHZhciBlbmRSYW5nZSA9IGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlKHsgbm9kZTogcC5lbmRDb250YWluZXIsIG9mZnNldDogcC5lbmRPZmZzZXQgfSwgZmFsc2UpO1xuICB2YXIgdGV4dFJhbmdlID0gYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgdGV4dFJhbmdlLnNldEVuZFBvaW50KCdTdGFydFRvU3RhcnQnLCBzdGFydFJhbmdlKTtcbiAgdGV4dFJhbmdlLnNldEVuZFBvaW50KCdFbmRUb0VuZCcsIGVuZFJhbmdlKTtcbiAgcmV0dXJuIHRleHRSYW5nZTtcbn1cblxuZnVuY3Rpb24gaXNDaGFyYWN0ZXJEYXRhTm9kZSAobm9kZSkge1xuICB2YXIgdCA9IG5vZGUubm9kZVR5cGU7XG4gIHJldHVybiB0ID09PSAzIHx8IHQgPT09IDQgfHwgdCA9PT0gOCA7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlIChwLCBzdGFydGluZykge1xuICB2YXIgYm91bmQ7XG4gIHZhciBwYXJlbnQ7XG4gIHZhciBvZmZzZXQgPSBwLm9mZnNldDtcbiAgdmFyIHdvcmtpbmdOb2RlO1xuICB2YXIgY2hpbGROb2RlcztcbiAgdmFyIHJhbmdlID0gYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgdmFyIGRhdGEgPSBpc0NoYXJhY3RlckRhdGFOb2RlKHAubm9kZSk7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICBib3VuZCA9IHAubm9kZTtcbiAgICBwYXJlbnQgPSBib3VuZC5wYXJlbnROb2RlO1xuICB9IGVsc2Uge1xuICAgIGNoaWxkTm9kZXMgPSBwLm5vZGUuY2hpbGROb2RlcztcbiAgICBib3VuZCA9IG9mZnNldCA8IGNoaWxkTm9kZXMubGVuZ3RoID8gY2hpbGROb2Rlc1tvZmZzZXRdIDogbnVsbDtcbiAgICBwYXJlbnQgPSBwLm5vZGU7XG4gIH1cblxuICB3b3JraW5nTm9kZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHdvcmtpbmdOb2RlLmlubmVySFRNTCA9ICcmI2ZlZmY7JztcblxuICBpZiAoYm91bmQpIHtcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHdvcmtpbmdOb2RlLCBib3VuZCk7XG4gIH0gZWxzZSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHdvcmtpbmdOb2RlKTtcbiAgfVxuXG4gIHJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KHdvcmtpbmdOb2RlKTtcbiAgcmFuZ2UuY29sbGFwc2UoIXN0YXJ0aW5nKTtcbiAgcGFyZW50LnJlbW92ZUNoaWxkKHdvcmtpbmdOb2RlKTtcblxuICBpZiAoZGF0YSkge1xuICAgIHJhbmdlW3N0YXJ0aW5nID8gJ21vdmVTdGFydCcgOiAnbW92ZUVuZCddKCdjaGFyYWN0ZXInLCBvZmZzZXQpO1xuICB9XG4gIHJldHVybiByYW5nZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByYW5nZVRvVGV4dFJhbmdlO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld4bFkyTnBiMjR2YzNKakwzSmhibWRsVkc5VVpYaDBVbUZ1WjJVdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCa2IyTWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzUyWVhJZ1ltOWtlU0E5SUdSdll5NWliMlI1TzF4dVhHNW1kVzVqZEdsdmJpQnlZVzVuWlZSdlZHVjRkRkpoYm1kbElDaHdLU0I3WEc0Z0lHbG1JQ2h3TG1OdmJHeGhjSE5sWkNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJqY21WaGRHVkNiM1Z1WkdGeWVWUmxlSFJTWVc1blpTaDdJRzV2WkdVNklIQXVjM1JoY25SRGIyNTBZV2x1WlhJc0lHOW1abk5sZERvZ2NDNXpkR0Z5ZEU5bVpuTmxkQ0I5TENCMGNuVmxLVHRjYmlBZ2ZWeHVJQ0IyWVhJZ2MzUmhjblJTWVc1blpTQTlJR055WldGMFpVSnZkVzVrWVhKNVZHVjRkRkpoYm1kbEtIc2dibTlrWlRvZ2NDNXpkR0Z5ZEVOdmJuUmhhVzVsY2l3Z2IyWm1jMlYwT2lCd0xuTjBZWEowVDJabWMyVjBJSDBzSUhSeWRXVXBPMXh1SUNCMllYSWdaVzVrVW1GdVoyVWdQU0JqY21WaGRHVkNiM1Z1WkdGeWVWUmxlSFJTWVc1blpTaDdJRzV2WkdVNklIQXVaVzVrUTI5dWRHRnBibVZ5TENCdlptWnpaWFE2SUhBdVpXNWtUMlptYzJWMElIMHNJR1poYkhObEtUdGNiaUFnZG1GeUlIUmxlSFJTWVc1blpTQTlJR0p2WkhrdVkzSmxZWFJsVkdWNGRGSmhibWRsS0NrN1hHNGdJSFJsZUhSU1lXNW5aUzV6WlhSRmJtUlFiMmx1ZENnblUzUmhjblJVYjFOMFlYSjBKeXdnYzNSaGNuUlNZVzVuWlNrN1hHNGdJSFJsZUhSU1lXNW5aUzV6WlhSRmJtUlFiMmx1ZENnblJXNWtWRzlGYm1RbkxDQmxibVJTWVc1blpTazdYRzRnSUhKbGRIVnliaUIwWlhoMFVtRnVaMlU3WEc1OVhHNWNibVoxYm1OMGFXOXVJR2x6UTJoaGNtRmpkR1Z5UkdGMFlVNXZaR1VnS0c1dlpHVXBJSHRjYmlBZ2RtRnlJSFFnUFNCdWIyUmxMbTV2WkdWVWVYQmxPMXh1SUNCeVpYUjFjbTRnZENBOVBUMGdNeUI4ZkNCMElEMDlQU0EwSUh4OElIUWdQVDA5SURnZ08xeHVmVnh1WEc1bWRXNWpkR2x2YmlCamNtVmhkR1ZDYjNWdVpHRnllVlJsZUhSU1lXNW5aU0FvY0N3Z2MzUmhjblJwYm1jcElIdGNiaUFnZG1GeUlHSnZkVzVrTzF4dUlDQjJZWElnY0dGeVpXNTBPMXh1SUNCMllYSWdiMlptYzJWMElEMGdjQzV2Wm1aelpYUTdYRzRnSUhaaGNpQjNiM0pyYVc1blRtOWtaVHRjYmlBZ2RtRnlJR05vYVd4a1RtOWtaWE03WEc0Z0lIWmhjaUJ5WVc1blpTQTlJR0p2WkhrdVkzSmxZWFJsVkdWNGRGSmhibWRsS0NrN1hHNGdJSFpoY2lCa1lYUmhJRDBnYVhORGFHRnlZV04wWlhKRVlYUmhUbTlrWlNod0xtNXZaR1VwTzF4dVhHNGdJR2xtSUNoa1lYUmhLU0I3WEc0Z0lDQWdZbTkxYm1RZ1BTQndMbTV2WkdVN1hHNGdJQ0FnY0dGeVpXNTBJRDBnWW05MWJtUXVjR0Z5Wlc1MFRtOWtaVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JqYUdsc1pFNXZaR1Z6SUQwZ2NDNXViMlJsTG1Ob2FXeGtUbTlrWlhNN1hHNGdJQ0FnWW05MWJtUWdQU0J2Wm1aelpYUWdQQ0JqYUdsc1pFNXZaR1Z6TG14bGJtZDBhQ0EvSUdOb2FXeGtUbTlrWlhOYmIyWm1jMlYwWFNBNklHNTFiR3c3WEc0Z0lDQWdjR0Z5Wlc1MElEMGdjQzV1YjJSbE8xeHVJQ0I5WEc1Y2JpQWdkMjl5YTJsdVowNXZaR1VnUFNCa2IyTXVZM0psWVhSbFJXeGxiV1Z1ZENnbmMzQmhiaWNwTzF4dUlDQjNiM0pyYVc1blRtOWtaUzVwYm01bGNraFVUVXdnUFNBbkppTm1aV1ptT3ljN1hHNWNiaUFnYVdZZ0tHSnZkVzVrS1NCN1hHNGdJQ0FnY0dGeVpXNTBMbWx1YzJWeWRFSmxabTl5WlNoM2IzSnJhVzVuVG05a1pTd2dZbTkxYm1RcE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lIQmhjbVZ1ZEM1aGNIQmxibVJEYUdsc1pDaDNiM0pyYVc1blRtOWtaU2s3WEc0Z0lIMWNibHh1SUNCeVlXNW5aUzV0YjNabFZHOUZiR1Z0Wlc1MFZHVjRkQ2gzYjNKcmFXNW5UbTlrWlNrN1hHNGdJSEpoYm1kbExtTnZiR3hoY0hObEtDRnpkR0Z5ZEdsdVp5azdYRzRnSUhCaGNtVnVkQzV5WlcxdmRtVkRhR2xzWkNoM2IzSnJhVzVuVG05a1pTazdYRzVjYmlBZ2FXWWdLR1JoZEdFcElIdGNiaUFnSUNCeVlXNW5aVnR6ZEdGeWRHbHVaeUEvSUNkdGIzWmxVM1JoY25RbklEb2dKMjF2ZG1WRmJtUW5YU2duWTJoaGNtRmpkR1Z5Snl3Z2IyWm1jMlYwS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnY21GdVoyVTdYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2NtRnVaMlZVYjFSbGVIUlNZVzVuWlR0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0U2VsZWN0aW9uID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb24nKTtcbnZhciBzZXRTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3NldFNlbGVjdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0OiBnZXRTZWxlY3Rpb24sXG4gIHNldDogc2V0U2VsZWN0aW9uXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0U2VsZWN0aW9uID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb24nKTtcbnZhciByYW5nZVRvVGV4dFJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZVRvVGV4dFJhbmdlJyk7XG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuXG5mdW5jdGlvbiBzZXRTZWxlY3Rpb24gKHApIHtcbiAgaWYgKGRvYy5jcmVhdGVSYW5nZSkge1xuICAgIG1vZGVyblNlbGVjdGlvbigpO1xuICB9IGVsc2Uge1xuICAgIG9sZFNlbGVjdGlvbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW9kZXJuU2VsZWN0aW9uICgpIHtcbiAgICB2YXIgc2VsID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgdmFyIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgaWYgKCFwLnN0YXJ0Q29udGFpbmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChwLmVuZENvbnRhaW5lcikge1xuICAgICAgcmFuZ2Uuc2V0RW5kKHAuZW5kQ29udGFpbmVyLCBwLmVuZE9mZnNldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlLnNldEVuZChwLnN0YXJ0Q29udGFpbmVyLCBwLnN0YXJ0T2Zmc2V0KTtcbiAgICB9XG4gICAgcmFuZ2Uuc2V0U3RhcnQocC5zdGFydENvbnRhaW5lciwgcC5zdGFydE9mZnNldCk7XG4gICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbGRTZWxlY3Rpb24gKCkge1xuICAgIHJhbmdlVG9UZXh0UmFuZ2UocCkuc2VsZWN0KCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRTZWxlY3Rpb247XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDNObGRGTmxiR1ZqZEdsdmJpNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQm5aWFJUWld4bFkzUnBiMjRnUFNCeVpYRjFhWEpsS0NjdUwyZGxkRk5sYkdWamRHbHZiaWNwTzF4dWRtRnlJSEpoYm1kbFZHOVVaWGgwVW1GdVoyVWdQU0J5WlhGMWFYSmxLQ2N1TDNKaGJtZGxWRzlVWlhoMFVtRnVaMlVuS1R0Y2JuWmhjaUJrYjJNZ1BTQm5iRzlpWVd3dVpHOWpkVzFsYm5RN1hHNWNibVoxYm1OMGFXOXVJSE5sZEZObGJHVmpkR2x2YmlBb2NDa2dlMXh1SUNCcFppQW9aRzlqTG1OeVpXRjBaVkpoYm1kbEtTQjdYRzRnSUNBZ2JXOWtaWEp1VTJWc1pXTjBhVzl1S0NrN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2IyeGtVMlZzWldOMGFXOXVLQ2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCdGIyUmxjbTVUWld4bFkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUhaaGNpQnpaV3dnUFNCblpYUlRaV3hsWTNScGIyNG9LVHRjYmlBZ0lDQjJZWElnY21GdVoyVWdQU0JrYjJNdVkzSmxZWFJsVW1GdVoyVW9LVHRjYmlBZ0lDQnBaaUFvSVhBdWMzUmhjblJEYjI1MFlXbHVaWElwSUh0Y2JpQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQjlYRzRnSUNBZ2FXWWdLSEF1Wlc1a1EyOXVkR0ZwYm1WeUtTQjdYRzRnSUNBZ0lDQnlZVzVuWlM1elpYUkZibVFvY0M1bGJtUkRiMjUwWVdsdVpYSXNJSEF1Wlc1a1QyWm1jMlYwS1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdjbUZ1WjJVdWMyVjBSVzVrS0hBdWMzUmhjblJEYjI1MFlXbHVaWElzSUhBdWMzUmhjblJQWm1aelpYUXBPMXh1SUNBZ0lIMWNiaUFnSUNCeVlXNW5aUzV6WlhSVGRHRnlkQ2h3TG5OMFlYSjBRMjl1ZEdGcGJtVnlMQ0J3TG5OMFlYSjBUMlptYzJWMEtUdGNiaUFnSUNCelpXd3VjbVZ0YjNabFFXeHNVbUZ1WjJWektDazdYRzRnSUNBZ2MyVnNMbUZrWkZKaGJtZGxLSEpoYm1kbEtUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJRzlzWkZObGJHVmpkR2x2YmlBb0tTQjdYRzRnSUNBZ2NtRnVaMlZVYjFSbGVIUlNZVzVuWlNod0tTNXpaV3hsWTNRb0tUdGNiaUFnZlZ4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSE5sZEZObGJHVmpkR2x2Ymp0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgSW5wdXRTdGF0ZSA9IHJlcXVpcmUoJy4vSW5wdXRTdGF0ZScpO1xuXG5mdW5jdGlvbiBJbnB1dEhpc3RvcnkgKHN1cmZhY2UsIG1vZGUpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcblxuICBzdGF0ZS5pbnB1dE1vZGUgPSBtb2RlO1xuICBzdGF0ZS5zdXJmYWNlID0gc3VyZmFjZTtcbiAgc3RhdGUucmVzZXQoKTtcblxuICBsaXN0ZW4oc3VyZmFjZS50ZXh0YXJlYSk7XG4gIGxpc3RlbihzdXJmYWNlLmVkaXRhYmxlKTtcblxuICBmdW5jdGlvbiBsaXN0ZW4gKGVsKSB7XG4gICAgdmFyIHBhc3RlSGFuZGxlciA9IHNlbGZpZShoYW5kbGVQYXN0ZSk7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ2tleXByZXNzJywgcHJldmVudEN0cmxZWik7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ2tleWRvd24nLCBzZWxmaWUoaGFuZGxlQ3RybFlaKSk7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ2tleWRvd24nLCBzZWxmaWUoaGFuZGxlTW9kZUNoYW5nZSkpO1xuICAgIGNyb3NzdmVudC5hZGQoZWwsICdtb3VzZWRvd24nLCBzZXRNb3ZpbmcpO1xuICAgIGVsLm9ucGFzdGUgPSBwYXN0ZUhhbmRsZXI7XG4gICAgZWwub25kcm9wID0gcGFzdGVIYW5kbGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0TW92aW5nICgpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCdtb3ZpbmcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGZpZSAoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlciAoZSkgeyByZXR1cm4gZm4uY2FsbChudWxsLCBzdGF0ZSwgZSk7IH07XG4gIH1cbn1cblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5zZXRJbnB1dE1vZGUgPSBmdW5jdGlvbiAobW9kZSkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBzdGF0ZS5pbnB1dE1vZGUgPSBtb2RlO1xuICBzdGF0ZS5yZXNldCgpO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgc3RhdGUuaW5wdXRTdGF0ZSA9IG51bGw7XG4gIHN0YXRlLmxhc3RTdGF0ZSA9IG51bGw7XG4gIHN0YXRlLmhpc3RvcnkgPSBbXTtcbiAgc3RhdGUuaGlzdG9yeVBvaW50ZXIgPSAwO1xuICBzdGF0ZS5oaXN0b3J5TW9kZSA9ICdub25lJztcbiAgc3RhdGUucmVmcmVzaGluZyA9IG51bGw7XG4gIHN0YXRlLnJlZnJlc2hTdGF0ZSh0cnVlKTtcbiAgc3RhdGUuc2F2ZVN0YXRlKCk7XG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUuc2V0Q29tbWFuZE1vZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIHN0YXRlLmhpc3RvcnlNb2RlID0gJ2NvbW1hbmQnO1xuICBzdGF0ZS5zYXZlU3RhdGUoKTtcbiAgc3RhdGUucmVmcmVzaGluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xuICB9LCAwKTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUuY2FuVW5kbyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuaGlzdG9yeVBvaW50ZXIgPiAxO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5jYW5SZWRvID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5oaXN0b3J5W3RoaXMuaGlzdG9yeVBvaW50ZXIgKyAxXTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUudW5kbyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgaWYgKHN0YXRlLmNhblVuZG8oKSkge1xuICAgIGlmIChzdGF0ZS5sYXN0U3RhdGUpIHtcbiAgICAgIHN0YXRlLmxhc3RTdGF0ZS5yZXN0b3JlKCk7XG4gICAgICBzdGF0ZS5sYXN0U3RhdGUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5oaXN0b3J5W3N0YXRlLmhpc3RvcnlQb2ludGVyXSA9IG5ldyBJbnB1dFN0YXRlKHN0YXRlLnN1cmZhY2UsIHN0YXRlLmlucHV0TW9kZSk7XG4gICAgICBzdGF0ZS5oaXN0b3J5Wy0tc3RhdGUuaGlzdG9yeVBvaW50ZXJdLnJlc3RvcmUoKTtcbiAgICB9XG4gIH1cbiAgc3RhdGUuaGlzdG9yeU1vZGUgPSAnbm9uZSc7XG4gIHN0YXRlLnN1cmZhY2UuZm9jdXMoc3RhdGUuaW5wdXRNb2RlKTtcbiAgc3RhdGUucmVmcmVzaFN0YXRlKCk7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnJlZG8gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIGlmIChzdGF0ZS5jYW5SZWRvKCkpIHtcbiAgICBzdGF0ZS5oaXN0b3J5Wysrc3RhdGUuaGlzdG9yeVBvaW50ZXJdLnJlc3RvcmUoKTtcbiAgfVxuXG4gIHN0YXRlLmhpc3RvcnlNb2RlID0gJ25vbmUnO1xuICBzdGF0ZS5zdXJmYWNlLmZvY3VzKHN0YXRlLmlucHV0TW9kZSk7XG4gIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5zZXRNb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIGlmIChzdGF0ZS5oaXN0b3J5TW9kZSAhPT0gdmFsdWUpIHtcbiAgICBzdGF0ZS5oaXN0b3J5TW9kZSA9IHZhbHVlO1xuICAgIHN0YXRlLnNhdmVTdGF0ZSgpO1xuICB9XG4gIHN0YXRlLnJlZnJlc2hpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGF0ZS5yZWZyZXNoU3RhdGUoKTtcbiAgfSwgMSk7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnJlZnJlc2hTdGF0ZSA9IGZ1bmN0aW9uIChpbml0aWFsU3RhdGUpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgc3RhdGUuaW5wdXRTdGF0ZSA9IG5ldyBJbnB1dFN0YXRlKHN0YXRlLnN1cmZhY2UsIHN0YXRlLmlucHV0TW9kZSwgaW5pdGlhbFN0YXRlKTtcbiAgc3RhdGUucmVmcmVzaGluZyA9IG51bGw7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnNhdmVTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgdmFyIGN1cnJlbnQgPSBzdGF0ZS5pbnB1dFN0YXRlIHx8IG5ldyBJbnB1dFN0YXRlKHN0YXRlLnN1cmZhY2UsIHN0YXRlLmlucHV0TW9kZSk7XG5cbiAgaWYgKHN0YXRlLmhpc3RvcnlNb2RlID09PSAnbW92aW5nJykge1xuICAgIGlmICghc3RhdGUubGFzdFN0YXRlKSB7XG4gICAgICBzdGF0ZS5sYXN0U3RhdGUgPSBjdXJyZW50O1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHN0YXRlLmxhc3RTdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5oaXN0b3J5W3N0YXRlLmhpc3RvcnlQb2ludGVyIC0gMV0udGV4dCAhPT0gc3RhdGUubGFzdFN0YXRlLnRleHQpIHtcbiAgICAgIHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeVBvaW50ZXIrK10gPSBzdGF0ZS5sYXN0U3RhdGU7XG4gICAgfVxuICAgIHN0YXRlLmxhc3RTdGF0ZSA9IG51bGw7XG4gIH1cbiAgc3RhdGUuaGlzdG9yeVtzdGF0ZS5oaXN0b3J5UG9pbnRlcisrXSA9IGN1cnJlbnQ7XG4gIHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeVBvaW50ZXIgKyAxXSA9IG51bGw7XG59O1xuXG5mdW5jdGlvbiBoYW5kbGVDdHJsWVogKHN0YXRlLCBlKSB7XG4gIHZhciBoYW5kbGVkID0gZmFsc2U7XG4gIHZhciBrZXlDb2RlID0gZS5jaGFyQ29kZSB8fCBlLmtleUNvZGU7XG4gIHZhciBrZXlDb2RlQ2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5Q29kZSk7XG5cbiAgaWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICBzd2l0Y2ggKGtleUNvZGVDaGFyLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICBzdGF0ZS5yZWRvKCk7XG4gICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAneic6XG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgc3RhdGUucmVkbygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLnVuZG8oKTtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGhhbmRsZWQgJiYgZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVNb2RlQ2hhbmdlIChzdGF0ZSwgZSkge1xuICBpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlO1xuXG4gIGlmICgoa2V5Q29kZSA+PSAzMyAmJiBrZXlDb2RlIDw9IDQwKSB8fCAoa2V5Q29kZSA+PSA2MzIzMiAmJiBrZXlDb2RlIDw9IDYzMjM1KSkge1xuICAgIHN0YXRlLnNldE1vZGUoJ21vdmluZycpO1xuICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IDggfHwga2V5Q29kZSA9PT0gNDYgfHwga2V5Q29kZSA9PT0gMTI3KSB7XG4gICAgc3RhdGUuc2V0TW9kZSgnZGVsZXRpbmcnKTtcbiAgfSBlbHNlIGlmIChrZXlDb2RlID09PSAxMykge1xuICAgIHN0YXRlLnNldE1vZGUoJ25ld2xpbmVzJyk7XG4gIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gMjcpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCdlc2NhcGUnKTtcbiAgfSBlbHNlIGlmICgoa2V5Q29kZSA8IDE2IHx8IGtleUNvZGUgPiAyMCkgJiYga2V5Q29kZSAhPT0gOTEpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCd0eXBpbmcnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVQYXN0ZSAoc3RhdGUpIHtcbiAgaWYgKHN0YXRlLmlucHV0U3RhdGUgJiYgc3RhdGUuaW5wdXRTdGF0ZS50ZXh0ICE9PSBzdGF0ZS5zdXJmYWNlLnJlYWQoc3RhdGUuaW5wdXRNb2RlKSAmJiBzdGF0ZS5yZWZyZXNoaW5nID09PSBudWxsKSB7XG4gICAgc3RhdGUuaGlzdG9yeU1vZGUgPSAncGFzdGUnO1xuICAgIHN0YXRlLnNhdmVTdGF0ZSgpO1xuICAgIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByZXZlbnRDdHJsWVogKGUpIHtcbiAgdmFyIGtleUNvZGUgPSBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZTtcbiAgdmFyIHl6ID0ga2V5Q29kZSA9PT0gODkgfHwga2V5Q29kZSA9PT0gOTA7XG4gIHZhciBjdHJsID0gZS5jdHJsS2V5IHx8IGUubWV0YUtleTtcbiAgaWYgKGN0cmwgJiYgeXopIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dEhpc3Rvcnk7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgaXNWaXNpYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vaXNWaXNpYmxlRWxlbWVudCcpO1xudmFyIGZpeEVPTCA9IHJlcXVpcmUoJy4vZml4RU9MJyk7XG52YXIgTWFya2Rvd25DaHVua3MgPSByZXF1aXJlKCcuL21hcmtkb3duL01hcmtkb3duQ2h1bmtzJyk7XG52YXIgSHRtbENodW5rcyA9IHJlcXVpcmUoJy4vaHRtbC9IdG1sQ2h1bmtzJyk7XG52YXIgY2h1bmtzID0ge1xuICBtYXJrZG93bjogTWFya2Rvd25DaHVua3MsXG4gIGh0bWw6IEh0bWxDaHVua3MsXG4gIHd5c2l3eWc6IEh0bWxDaHVua3Ncbn07XG5cbmZ1bmN0aW9uIElucHV0U3RhdGUgKHN1cmZhY2UsIG1vZGUsIGluaXRpYWxTdGF0ZSkge1xuICB0aGlzLm1vZGUgPSBtb2RlO1xuICB0aGlzLnN1cmZhY2UgPSBzdXJmYWNlO1xuICB0aGlzLmluaXRpYWxTdGF0ZSA9IGluaXRpYWxTdGF0ZSB8fCBmYWxzZTtcbiAgdGhpcy5pbml0KCk7XG59XG5cbklucHV0U3RhdGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGVsID0gc2VsZi5zdXJmYWNlLmN1cnJlbnQoc2VsZi5tb2RlKTtcbiAgaWYgKCFpc1Zpc2libGVFbGVtZW50KGVsKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXRoaXMuaW5pdGlhbFN0YXRlICYmIGRvYy5hY3RpdmVFbGVtZW50ICYmIGRvYy5hY3RpdmVFbGVtZW50ICE9PSBlbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBzZWxmLnN1cmZhY2UucmVhZFNlbGVjdGlvbihzZWxmKTtcbiAgc2VsZi5zY3JvbGxUb3AgPSBlbC5zY3JvbGxUb3A7XG4gIGlmICghc2VsZi50ZXh0KSB7XG4gICAgc2VsZi50ZXh0ID0gc2VsZi5zdXJmYWNlLnJlYWQoc2VsZi5tb2RlKTtcbiAgfVxufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBlbCA9IHNlbGYuc3VyZmFjZS5jdXJyZW50KHNlbGYubW9kZSk7XG4gIGlmICghaXNWaXNpYmxlRWxlbWVudChlbCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc2VsZi5zdXJmYWNlLndyaXRlU2VsZWN0aW9uKHNlbGYpO1xufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUucmVzdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZWwgPSBzZWxmLnN1cmZhY2UuY3VycmVudChzZWxmLm1vZGUpO1xuICBpZiAodHlwZW9mIHNlbGYudGV4dCA9PT0gJ3N0cmluZycgJiYgc2VsZi50ZXh0ICE9PSBzZWxmLnN1cmZhY2UucmVhZChzZWxmLm1vZGUpKSB7XG4gICAgc2VsZi5zdXJmYWNlLndyaXRlKHNlbGYubW9kZSwgc2VsZi50ZXh0KTtcbiAgfVxuICBzZWxmLnNlbGVjdCgpO1xuICBlbC5zY3JvbGxUb3AgPSBzZWxmLnNjcm9sbFRvcDtcbn07XG5cbklucHV0U3RhdGUucHJvdG90eXBlLmdldENodW5rcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgY2h1bmsgPSBuZXcgY2h1bmtzW3NlbGYubW9kZV0oKTtcbiAgY2h1bmsuYmVmb3JlID0gZml4RU9MKHNlbGYudGV4dC5zdWJzdHJpbmcoMCwgc2VsZi5zdGFydCkpO1xuICBjaHVuay5zdGFydFRhZyA9ICcnO1xuICBjaHVuay5zZWxlY3Rpb24gPSBmaXhFT0woc2VsZi50ZXh0LnN1YnN0cmluZyhzZWxmLnN0YXJ0LCBzZWxmLmVuZCkpO1xuICBjaHVuay5lbmRUYWcgPSAnJztcbiAgY2h1bmsuYWZ0ZXIgPSBmaXhFT0woc2VsZi50ZXh0LnN1YnN0cmluZyhzZWxmLmVuZCkpO1xuICBjaHVuay5zY3JvbGxUb3AgPSBzZWxmLnNjcm9sbFRvcDtcbiAgc2VsZi5jYWNoZWRDaHVua3MgPSBjaHVuaztcbiAgcmV0dXJuIGNodW5rO1xufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuc2V0Q2h1bmtzID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2h1bmsuYmVmb3JlID0gY2h1bmsuYmVmb3JlICsgY2h1bmsuc3RhcnRUYWc7XG4gIGNodW5rLmFmdGVyID0gY2h1bmsuZW5kVGFnICsgY2h1bmsuYWZ0ZXI7XG4gIHNlbGYuc3RhcnQgPSBjaHVuay5iZWZvcmUubGVuZ3RoO1xuICBzZWxmLmVuZCA9IGNodW5rLmJlZm9yZS5sZW5ndGggKyBjaHVuay5zZWxlY3Rpb24ubGVuZ3RoO1xuICBzZWxmLnRleHQgPSBjaHVuay5iZWZvcmUgKyBjaHVuay5zZWxlY3Rpb24gKyBjaHVuay5hZnRlcjtcbiAgc2VsZi5zY3JvbGxUb3AgPSBjaHVuay5zY3JvbGxUb3A7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0U3RhdGU7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OUpibkIxZEZOMFlYUmxMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCa2IyTWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzUyWVhJZ2FYTldhWE5wWW14bFJXeGxiV1Z1ZENBOUlISmxjWFZwY21Vb0p5NHZhWE5XYVhOcFlteGxSV3hsYldWdWRDY3BPMXh1ZG1GeUlHWnBlRVZQVENBOUlISmxjWFZwY21Vb0p5NHZabWw0UlU5TUp5azdYRzUyWVhJZ1RXRnlhMlJ2ZDI1RGFIVnVhM01nUFNCeVpYRjFhWEpsS0NjdUwyMWhjbXRrYjNkdUwwMWhjbXRrYjNkdVEyaDFibXR6SnlrN1hHNTJZWElnU0hSdGJFTm9kVzVyY3lBOUlISmxjWFZwY21Vb0p5NHZhSFJ0YkM5SWRHMXNRMmgxYm10ekp5azdYRzUyWVhJZ1kyaDFibXR6SUQwZ2UxeHVJQ0J0WVhKclpHOTNiam9nVFdGeWEyUnZkMjVEYUhWdWEzTXNYRzRnSUdoMGJXdzZJRWgwYld4RGFIVnVhM01zWEc0Z0lIZDVjMmwzZVdjNklFaDBiV3hEYUhWdWEzTmNibjA3WEc1Y2JtWjFibU4wYVc5dUlFbHVjSFYwVTNSaGRHVWdLSE4xY21aaFkyVXNJRzF2WkdVc0lHbHVhWFJwWVd4VGRHRjBaU2tnZTF4dUlDQjBhR2x6TG0xdlpHVWdQU0J0YjJSbE8xeHVJQ0IwYUdsekxuTjFjbVpoWTJVZ1BTQnpkWEptWVdObE8xeHVJQ0IwYUdsekxtbHVhWFJwWVd4VGRHRjBaU0E5SUdsdWFYUnBZV3hUZEdGMFpTQjhmQ0JtWVd4elpUdGNiaUFnZEdocGN5NXBibWwwS0NrN1hHNTlYRzVjYmtsdWNIVjBVM1JoZEdVdWNISnZkRzkwZVhCbExtbHVhWFFnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUhaaGNpQnpaV3htSUQwZ2RHaHBjenRjYmlBZ2RtRnlJR1ZzSUQwZ2MyVnNaaTV6ZFhKbVlXTmxMbU4xY25KbGJuUW9jMlZzWmk1dGIyUmxLVHRjYmlBZ2FXWWdLQ0ZwYzFacGMybGliR1ZGYkdWdFpXNTBLR1ZzS1NrZ2UxeHVJQ0FnSUhKbGRIVnlianRjYmlBZ2ZWeHVJQ0JwWmlBb0lYUm9hWE11YVc1cGRHbGhiRk4wWVhSbElDWW1JR1J2WXk1aFkzUnBkbVZGYkdWdFpXNTBJQ1ltSUdSdll5NWhZM1JwZG1WRmJHVnRaVzUwSUNFOVBTQmxiQ2tnZTF4dUlDQWdJSEpsZEhWeWJqdGNiaUFnZlZ4dUlDQnpaV3htTG5OMWNtWmhZMlV1Y21WaFpGTmxiR1ZqZEdsdmJpaHpaV3htS1R0Y2JpQWdjMlZzWmk1elkzSnZiR3hVYjNBZ1BTQmxiQzV6WTNKdmJHeFViM0E3WEc0Z0lHbG1JQ2doYzJWc1ppNTBaWGgwS1NCN1hHNGdJQ0FnYzJWc1ppNTBaWGgwSUQwZ2MyVnNaaTV6ZFhKbVlXTmxMbkpsWVdRb2MyVnNaaTV0YjJSbEtUdGNiaUFnZlZ4dWZUdGNibHh1U1c1d2RYUlRkR0YwWlM1d2NtOTBiM1I1Y0dVdWMyVnNaV04wSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCMllYSWdjMlZzWmlBOUlIUm9hWE03WEc0Z0lIWmhjaUJsYkNBOUlITmxiR1l1YzNWeVptRmpaUzVqZFhKeVpXNTBLSE5sYkdZdWJXOWtaU2s3WEc0Z0lHbG1JQ2doYVhOV2FYTnBZbXhsUld4bGJXVnVkQ2hsYkNrcElIdGNiaUFnSUNCeVpYUjFjbTQ3WEc0Z0lIMWNiaUFnYzJWc1ppNXpkWEptWVdObExuZHlhWFJsVTJWc1pXTjBhVzl1S0hObGJHWXBPMXh1ZlR0Y2JseHVTVzV3ZFhSVGRHRjBaUzV3Y205MGIzUjVjR1V1Y21WemRHOXlaU0E5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnZG1GeUlITmxiR1lnUFNCMGFHbHpPMXh1SUNCMllYSWdaV3dnUFNCelpXeG1Mbk4xY21aaFkyVXVZM1Z5Y21WdWRDaHpaV3htTG0xdlpHVXBPMXh1SUNCcFppQW9kSGx3Wlc5bUlITmxiR1l1ZEdWNGRDQTlQVDBnSjNOMGNtbHVaeWNnSmlZZ2MyVnNaaTUwWlhoMElDRTlQU0J6Wld4bUxuTjFjbVpoWTJVdWNtVmhaQ2h6Wld4bUxtMXZaR1VwS1NCN1hHNGdJQ0FnYzJWc1ppNXpkWEptWVdObExuZHlhWFJsS0hObGJHWXViVzlrWlN3Z2MyVnNaaTUwWlhoMEtUdGNiaUFnZlZ4dUlDQnpaV3htTG5ObGJHVmpkQ2dwTzF4dUlDQmxiQzV6WTNKdmJHeFViM0FnUFNCelpXeG1Mbk5qY205c2JGUnZjRHRjYm4wN1hHNWNia2x1Y0hWMFUzUmhkR1V1Y0hKdmRHOTBlWEJsTG1kbGRFTm9kVzVyY3lBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ2RtRnlJSE5sYkdZZ1BTQjBhR2x6TzF4dUlDQjJZWElnWTJoMWJtc2dQU0J1WlhjZ1kyaDFibXR6VzNObGJHWXViVzlrWlYwb0tUdGNiaUFnWTJoMWJtc3VZbVZtYjNKbElEMGdabWw0UlU5TUtITmxiR1l1ZEdWNGRDNXpkV0p6ZEhKcGJtY29NQ3dnYzJWc1ppNXpkR0Z5ZENrcE8xeHVJQ0JqYUhWdWF5NXpkR0Z5ZEZSaFp5QTlJQ2NuTzF4dUlDQmphSFZ1YXk1elpXeGxZM1JwYjI0Z1BTQm1hWGhGVDB3b2MyVnNaaTUwWlhoMExuTjFZbk4wY21sdVp5aHpaV3htTG5OMFlYSjBMQ0J6Wld4bUxtVnVaQ2twTzF4dUlDQmphSFZ1YXk1bGJtUlVZV2NnUFNBbkp6dGNiaUFnWTJoMWJtc3VZV1owWlhJZ1BTQm1hWGhGVDB3b2MyVnNaaTUwWlhoMExuTjFZbk4wY21sdVp5aHpaV3htTG1WdVpDa3BPMXh1SUNCamFIVnVheTV6WTNKdmJHeFViM0FnUFNCelpXeG1Mbk5qY205c2JGUnZjRHRjYmlBZ2MyVnNaaTVqWVdOb1pXUkRhSFZ1YTNNZ1BTQmphSFZ1YXp0Y2JpQWdjbVYwZFhKdUlHTm9kVzVyTzF4dWZUdGNibHh1U1c1d2RYUlRkR0YwWlM1d2NtOTBiM1I1Y0dVdWMyVjBRMmgxYm10eklEMGdablZ1WTNScGIyNGdLR05vZFc1cktTQjdYRzRnSUhaaGNpQnpaV3htSUQwZ2RHaHBjenRjYmlBZ1kyaDFibXN1WW1WbWIzSmxJRDBnWTJoMWJtc3VZbVZtYjNKbElDc2dZMmgxYm1zdWMzUmhjblJVWVdjN1hHNGdJR05vZFc1ckxtRm1kR1Z5SUQwZ1kyaDFibXN1Wlc1a1ZHRm5JQ3NnWTJoMWJtc3VZV1owWlhJN1hHNGdJSE5sYkdZdWMzUmhjblFnUFNCamFIVnVheTVpWldadmNtVXViR1Z1WjNSb08xeHVJQ0J6Wld4bUxtVnVaQ0E5SUdOb2RXNXJMbUpsWm05eVpTNXNaVzVuZEdnZ0t5QmphSFZ1YXk1elpXeGxZM1JwYjI0dWJHVnVaM1JvTzF4dUlDQnpaV3htTG5SbGVIUWdQU0JqYUhWdWF5NWlaV1p2Y21VZ0t5QmphSFZ1YXk1elpXeGxZM1JwYjI0Z0t5QmphSFZ1YXk1aFpuUmxjanRjYmlBZ2MyVnNaaTV6WTNKdmJHeFViM0FnUFNCamFIVnVheTV6WTNKdmJHeFViM0E3WEc1OU8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRWx1Y0hWMFUzUmhkR1U3WEc0aVhYMD0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBjb21tYW5kcyA9IHtcbiAgbWFya2Rvd246IHtcbiAgICBib2xkT3JJdGFsaWM6IHJlcXVpcmUoJy4vbWFya2Rvd24vYm9sZE9ySXRhbGljJyksXG4gICAgbGlua09ySW1hZ2VPckF0dGFjaG1lbnQ6IHJlcXVpcmUoJy4vbWFya2Rvd24vbGlua09ySW1hZ2VPckF0dGFjaG1lbnQnKSxcbiAgICBibG9ja3F1b3RlOiByZXF1aXJlKCcuL21hcmtkb3duL2Jsb2NrcXVvdGUnKSxcbiAgICBjb2RlYmxvY2s6IHJlcXVpcmUoJy4vbWFya2Rvd24vY29kZWJsb2NrJyksXG4gICAgaGVhZGluZzogcmVxdWlyZSgnLi9tYXJrZG93bi9oZWFkaW5nJyksXG4gICAgbGlzdDogcmVxdWlyZSgnLi9tYXJrZG93bi9saXN0JyksXG4gICAgaHI6IHJlcXVpcmUoJy4vbWFya2Rvd24vaHInKVxuICB9LFxuICBodG1sOiB7XG4gICAgYm9sZE9ySXRhbGljOiByZXF1aXJlKCcuL2h0bWwvYm9sZE9ySXRhbGljJyksXG4gICAgbGlua09ySW1hZ2VPckF0dGFjaG1lbnQ6IHJlcXVpcmUoJy4vaHRtbC9saW5rT3JJbWFnZU9yQXR0YWNobWVudCcpLFxuICAgIGJsb2NrcXVvdGU6IHJlcXVpcmUoJy4vaHRtbC9ibG9ja3F1b3RlJyksXG4gICAgY29kZWJsb2NrOiByZXF1aXJlKCcuL2h0bWwvY29kZWJsb2NrJyksXG4gICAgaGVhZGluZzogcmVxdWlyZSgnLi9odG1sL2hlYWRpbmcnKSxcbiAgICBsaXN0OiByZXF1aXJlKCcuL2h0bWwvbGlzdCcpLFxuICAgIGhyOiByZXF1aXJlKCcuL2h0bWwvaHInKVxuICB9XG59O1xuXG5jb21tYW5kcy53eXNpd3lnID0gY29tbWFuZHMuaHRtbDtcblxuZnVuY3Rpb24gYmluZENvbW1hbmRzIChzdXJmYWNlLCBvcHRpb25zLCBlZGl0b3IpIHtcbiAgYmluZCgnYm9sZCcsICdjbWQrYicsIGJvbGQpO1xuICBiaW5kKCdpdGFsaWMnLCAnY21kK2knLCBpdGFsaWMpO1xuICBiaW5kKCdxdW90ZScsICdjbWQraicsIHJvdXRlcignYmxvY2txdW90ZScpKTtcbiAgYmluZCgnY29kZScsICdjbWQrZScsIGNvZGUpO1xuICBiaW5kKCdvbCcsICdjbWQrbycsIG9sKTtcbiAgYmluZCgndWwnLCAnY21kK3UnLCB1bCk7XG4gIGJpbmQoJ2hlYWRpbmcnLCAnY21kK2QnLCByb3V0ZXIoJ2hlYWRpbmcnKSk7XG4gIGVkaXRvci5zaG93TGlua0RpYWxvZyA9IGZhYnJpY2F0b3IoYmluZCgnbGluaycsICdjbWQraycsIGxpbmtPckltYWdlT3JBdHRhY2htZW50KCdsaW5rJykpKTtcbiAgZWRpdG9yLnNob3dJbWFnZURpYWxvZyA9IGZhYnJpY2F0b3IoYmluZCgnaW1hZ2UnLCAnY21kK2cnLCBsaW5rT3JJbWFnZU9yQXR0YWNobWVudCgnaW1hZ2UnKSkpO1xuICBlZGl0b3IubGlua09ySW1hZ2VPckF0dGFjaG1lbnQgPSBsaW5rT3JJbWFnZU9yQXR0YWNobWVudDtcblxuICBpZiAob3B0aW9ucy5hdHRhY2htZW50cykge1xuICAgIGVkaXRvci5zaG93QXR0YWNobWVudERpYWxvZyA9IGZhYnJpY2F0b3IoYmluZCgnYXR0YWNobWVudCcsICdjbWQrc2hpZnQraycsIGxpbmtPckltYWdlT3JBdHRhY2htZW50KCdhdHRhY2htZW50JykpKTtcbiAgfVxuICBpZiAob3B0aW9ucy5ocikgeyBiaW5kKCdocicsICdjbWQrbicsIHJvdXRlcignaHInKSk7IH1cblxuICBmdW5jdGlvbiBmYWJyaWNhdG9yIChlbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBvcGVuICgpIHtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoZWwsICdjbGljaycpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gYm9sZCAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0uYm9sZE9ySXRhbGljKGNodW5rcywgJ2JvbGQnKTtcbiAgfVxuICBmdW5jdGlvbiBpdGFsaWMgKG1vZGUsIGNodW5rcykge1xuICAgIGNvbW1hbmRzW21vZGVdLmJvbGRPckl0YWxpYyhjaHVua3MsICdpdGFsaWMnKTtcbiAgfVxuICBmdW5jdGlvbiBjb2RlIChtb2RlLCBjaHVua3MpIHtcbiAgICBjb21tYW5kc1ttb2RlXS5jb2RlYmxvY2soY2h1bmtzLCB7IGZlbmNpbmc6IG9wdGlvbnMuZmVuY2luZyB9KTtcbiAgfVxuICBmdW5jdGlvbiB1bCAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0ubGlzdChjaHVua3MsIGZhbHNlKTtcbiAgfVxuICBmdW5jdGlvbiBvbCAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0ubGlzdChjaHVua3MsIHRydWUpO1xuICB9XG4gIGZ1bmN0aW9uIGxpbmtPckltYWdlT3JBdHRhY2htZW50ICh0eXBlLCBhdXRvVXBsb2FkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGxpbmtPckltYWdlT3JBdHRhY2htZW50SW52b2tlIChtb2RlLCBjaHVua3MpIHtcbiAgICAgIGNvbW1hbmRzW21vZGVdLmxpbmtPckltYWdlT3JBdHRhY2htZW50LmNhbGwodGhpcywgY2h1bmtzLCB7XG4gICAgICAgIGVkaXRvcjogZWRpdG9yLFxuICAgICAgICBtb2RlOiBtb2RlLFxuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBzdXJmYWNlOiBzdXJmYWNlLFxuICAgICAgICBwcm9tcHRzOiBvcHRpb25zLnByb21wdHMsXG4gICAgICAgIHhocjogb3B0aW9ucy54aHIsXG4gICAgICAgIHVwbG9hZDogb3B0aW9uc1t0eXBlICsgJ3MnXSxcbiAgICAgICAgY2xhc3Nlczogb3B0aW9ucy5jbGFzc2VzLFxuICAgICAgICBtZXJnZUh0bWxBbmRBdHRhY2htZW50OiBvcHRpb25zLm1lcmdlSHRtbEFuZEF0dGFjaG1lbnQsXG4gICAgICAgIGF1dG9VcGxvYWQ6IGF1dG9VcGxvYWRcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gYmluZCAoaWQsIGNvbWJvLCBmbikge1xuICAgIHJldHVybiBlZGl0b3IuYWRkQ29tbWFuZEJ1dHRvbihpZCwgY29tYm8sIHN1cHByZXNzKGZuKSk7XG4gIH1cbiAgZnVuY3Rpb24gcm91dGVyIChtZXRob2QpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gcm91dGVkIChtb2RlLCBjaHVua3MpIHsgY29tbWFuZHNbbW9kZV1bbWV0aG9kXS5jYWxsKHRoaXMsIGNodW5rcyk7IH07XG4gIH1cbiAgZnVuY3Rpb24gc3RvcCAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuICBmdW5jdGlvbiBzdXBwcmVzcyAoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gc3VwcHJlc3NvciAoZSwgbW9kZSwgY2h1bmtzKSB7IHN0b3AoZSk7IGZuLmNhbGwodGhpcywgbW9kZSwgY2h1bmtzKTsgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRDb21tYW5kcztcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gY2FzdCAoY29sbGVjdGlvbikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpO1xuICB2YXIgbGVuID0gY29sbGVjdGlvbi5sZW5ndGg7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHJlc3VsdC5wdXNoKGNvbGxlY3Rpb25baV0pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FzdDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJpbnB1dCA9IC9eXFxzKiguKj8pKD86XFxzK1wiKC4rKVwiKT9cXHMqJC87XG52YXIgcmZ1bGwgPSAvXig/Omh0dHBzP3xmdHApOlxcL1xcLy87XG5cbmZ1bmN0aW9uIHBhcnNlTGlua0lucHV0IChpbnB1dCkge1xuICByZXR1cm4gcGFyc2VyLmFwcGx5KG51bGwsIGlucHV0Lm1hdGNoKHJpbnB1dCkpO1xuXG4gIGZ1bmN0aW9uIHBhcnNlciAoYWxsLCBsaW5rLCB0aXRsZSkge1xuICAgIHZhciBocmVmID0gbGluay5yZXBsYWNlKC9cXD8uKiQvLCBxdWVyeVVuZW5jb2RlZFJlcGxhY2VyKTtcbiAgICBocmVmID0gZGVjb2RlVVJJQ29tcG9uZW50KGhyZWYpO1xuICAgIGhyZWYgPSBlbmNvZGVVUkkoaHJlZikucmVwbGFjZSgvJy9nLCAnJTI3JykucmVwbGFjZSgvXFwoL2csICclMjgnKS5yZXBsYWNlKC9cXCkvZywgJyUyOScpO1xuICAgIGhyZWYgPSBocmVmLnJlcGxhY2UoL1xcPy4qJC8sIHF1ZXJ5RW5jb2RlZFJlcGxhY2VyKTtcblxuICAgIHJldHVybiB7XG4gICAgICBocmVmOiBmb3JtYXRIcmVmKGhyZWYpLCB0aXRsZTogZm9ybWF0VGl0bGUodGl0bGUpXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBxdWVyeVVuZW5jb2RlZFJlcGxhY2VyIChxdWVyeSkge1xuICByZXR1cm4gcXVlcnkucmVwbGFjZSgvXFwrL2csICcgJyk7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5RW5jb2RlZFJlcGxhY2VyIChxdWVyeSkge1xuICByZXR1cm4gcXVlcnkucmVwbGFjZSgvXFwrL2csICclMmInKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGl0bGUgKHRpdGxlKSB7XG4gIGlmICghdGl0bGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB0aXRsZVxuICAgIC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhyZWYgKHVybCkge1xuICB2YXIgaHJlZiA9IHVybC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gIGlmIChocmVmLmxlbmd0aCAmJiBocmVmWzBdICE9PSAnLycgJiYgIXJmdWxsLnRlc3QoaHJlZikpIHtcbiAgICByZXR1cm4gJ2h0dHA6Ly8nICsgaHJlZjtcbiAgfVxuICByZXR1cm4gaHJlZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZUxpbmtJbnB1dDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gdHJpbSAocmVtb3ZlKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAocmVtb3ZlKSB7XG4gICAgYmVmb3JlUmVwbGFjZXIgPSBhZnRlclJlcGxhY2VyID0gJyc7XG4gIH1cbiAgc2VsZi5zZWxlY3Rpb24gPSBzZWxmLnNlbGVjdGlvbi5yZXBsYWNlKC9eKFxccyopLywgYmVmb3JlUmVwbGFjZXIpLnJlcGxhY2UoLyhcXHMqKSQvLCBhZnRlclJlcGxhY2VyKTtcblxuICBmdW5jdGlvbiBiZWZvcmVSZXBsYWNlciAodGV4dCkge1xuICAgIHNlbGYuYmVmb3JlICs9IHRleHQ7IHJldHVybiAnJztcbiAgfVxuICBmdW5jdGlvbiBhZnRlclJlcGxhY2VyICh0ZXh0KSB7XG4gICAgc2VsZi5hZnRlciA9IHRleHQgKyBzZWxmLmFmdGVyOyByZXR1cm4gJyc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0cmltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcnRyaW0gPSAvXlxccyt8XFxzKyQvZztcbnZhciByc3BhY2VzID0gL1xccysvZztcblxuZnVuY3Rpb24gYWRkQ2xhc3MgKGVsLCBjbHMpIHtcbiAgdmFyIGN1cnJlbnQgPSBlbC5jbGFzc05hbWU7XG4gIGlmIChjdXJyZW50LmluZGV4T2YoY2xzKSA9PT0gLTEpIHtcbiAgICBlbC5jbGFzc05hbWUgPSAoY3VycmVudCArICcgJyArIGNscykucmVwbGFjZShydHJpbSwgJycpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJtQ2xhc3MgKGVsLCBjbHMpIHtcbiAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoY2xzLCAnJykucmVwbGFjZShydHJpbSwgJycpLnJlcGxhY2UocnNwYWNlcywgJyAnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZDogYWRkQ2xhc3MsXG4gIHJtOiBybUNsYXNzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBleHRlbmRSZWdFeHAgKHJlZ2V4LCBwcmUsIHBvc3QpIHtcbiAgdmFyIHBhdHRlcm4gPSByZWdleC50b1N0cmluZygpO1xuICB2YXIgZmxhZ3M7XG5cbiAgcGF0dGVybiA9IHBhdHRlcm4ucmVwbGFjZSgvXFwvKFtnaW1dKikkLywgY2FwdHVyZUZsYWdzKTtcbiAgcGF0dGVybiA9IHBhdHRlcm4ucmVwbGFjZSgvKF5cXC98XFwvJCkvZywgJycpO1xuICBwYXR0ZXJuID0gcHJlICsgcGF0dGVybiArIHBvc3Q7XG4gIHJldHVybiBuZXcgUmVnRXhwKHBhdHRlcm4sIGZsYWdzKTtcblxuICBmdW5jdGlvbiBjYXB0dXJlRmxhZ3MgKGFsbCwgZikge1xuICAgIGZsYWdzID0gZjtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmRSZWdFeHA7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGZpeEVPTCAodGV4dCkge1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpLnJlcGxhY2UoL1xcci9nLCAnXFxuJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZml4RU9MO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgSW5wdXRTdGF0ZSA9IHJlcXVpcmUoJy4vSW5wdXRTdGF0ZScpO1xuXG5mdW5jdGlvbiBnZXRDb21tYW5kSGFuZGxlciAoc3VyZmFjZSwgaGlzdG9yeSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUNvbW1hbmQgKGUpIHtcbiAgICBzdXJmYWNlLmZvY3VzKGhpc3RvcnkuaW5wdXRNb2RlKTtcbiAgICBoaXN0b3J5LnNldENvbW1hbmRNb2RlKCk7XG5cbiAgICB2YXIgc3RhdGUgPSBuZXcgSW5wdXRTdGF0ZShzdXJmYWNlLCBoaXN0b3J5LmlucHV0TW9kZSk7XG4gICAgdmFyIGNodW5rcyA9IHN0YXRlLmdldENodW5rcygpO1xuICAgIHZhciBhc3luY0hhbmRsZXIgPSB7XG4gICAgICBhc3luYzogYXN5bmMsIGltbWVkaWF0ZTogdHJ1ZVxuICAgIH07XG5cbiAgICBmbi5jYWxsKGFzeW5jSGFuZGxlciwgZSwgaGlzdG9yeS5pbnB1dE1vZGUsIGNodW5rcyk7XG5cbiAgICBpZiAoYXN5bmNIYW5kbGVyLmltbWVkaWF0ZSkge1xuICAgICAgZG9uZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzeW5jICgpIHtcbiAgICAgIGFzeW5jSGFuZGxlci5pbW1lZGlhdGUgPSBmYWxzZTtcbiAgICAgIHJldHVybiBkb25lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvbmUgKCkge1xuICAgICAgc3VyZmFjZS5mb2N1cyhoaXN0b3J5LmlucHV0TW9kZSk7XG4gICAgICBzdGF0ZS5zZXRDaHVua3MoY2h1bmtzKTtcbiAgICAgIHN0YXRlLnJlc3RvcmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0Q29tbWFuZEhhbmRsZXI7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgc2VsZWNjaW9uID0gcmVxdWlyZSgnc2VsZWNjaW9uJyk7XG52YXIgZml4RU9MID0gcmVxdWlyZSgnLi9maXhFT0wnKTtcbnZhciBtYW55ID0gcmVxdWlyZSgnLi9tYW55Jyk7XG52YXIgY2FzdCA9IHJlcXVpcmUoJy4vY2FzdCcpO1xudmFyIGdldFNlbGVjdGlvbiA9IHNlbGVjY2lvbi5nZXQ7XG52YXIgc2V0U2VsZWN0aW9uID0gc2VsZWNjaW9uLnNldDtcbnZhciByb3BlbiA9IC9eKDxbXj5dKyg/OiBbXj5dKik/PikvO1xudmFyIHJjbG9zZSA9IC8oPFxcL1tePl0rPikkLztcblxuZnVuY3Rpb24gc3VyZmFjZSAodGV4dGFyZWEsIGVkaXRhYmxlLCBkcm9wYXJlYSkge1xuICByZXR1cm4ge1xuICAgIHRleHRhcmVhOiB0ZXh0YXJlYSxcbiAgICBlZGl0YWJsZTogZWRpdGFibGUsXG4gICAgZHJvcGFyZWE6IGRyb3BhcmVhLFxuICAgIGZvY3VzOiBzZXRGb2N1cyxcbiAgICByZWFkOiByZWFkLFxuICAgIHdyaXRlOiB3cml0ZSxcbiAgICBjdXJyZW50OiBjdXJyZW50LFxuICAgIHdyaXRlU2VsZWN0aW9uOiB3cml0ZVNlbGVjdGlvbixcbiAgICByZWFkU2VsZWN0aW9uOiByZWFkU2VsZWN0aW9uXG4gIH07XG5cbiAgZnVuY3Rpb24gc2V0Rm9jdXMgKG1vZGUpIHtcbiAgICBjdXJyZW50KG1vZGUpLmZvY3VzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjdXJyZW50IChtb2RlKSB7XG4gICAgcmV0dXJuIG1vZGUgPT09ICd3eXNpd3lnJyA/IGVkaXRhYmxlIDogdGV4dGFyZWE7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChtb2RlKSB7XG4gICAgaWYgKG1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgcmV0dXJuIGVkaXRhYmxlLmlubmVySFRNTDtcbiAgICB9XG4gICAgcmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUgKG1vZGUsIHZhbHVlKSB7XG4gICAgaWYgKG1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgZWRpdGFibGUuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVTZWxlY3Rpb24gKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLm1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgd3JpdGVTZWxlY3Rpb25FZGl0YWJsZShzdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyaXRlU2VsZWN0aW9uVGV4dGFyZWEoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRTZWxlY3Rpb24gKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLm1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgcmVhZFNlbGVjdGlvbkVkaXRhYmxlKHN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVhZFNlbGVjdGlvblRleHRhcmVhKHN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZVNlbGVjdGlvblRleHRhcmVhIChzdGF0ZSkge1xuICAgIHZhciByYW5nZTtcbiAgICBpZiAodGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgIT09IHZvaWQgMCkge1xuICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgIHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ID0gc3RhdGUuc3RhcnQ7XG4gICAgICB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQgPSBzdGF0ZS5lbmQ7XG4gICAgICB0ZXh0YXJlYS5zY3JvbGxUb3AgPSBzdGF0ZS5zY3JvbGxUb3A7XG4gICAgfSBlbHNlIGlmIChkb2Muc2VsZWN0aW9uKSB7XG4gICAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgIT09IHRleHRhcmVhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICByYW5nZSA9IHRleHRhcmVhLmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtdGV4dGFyZWEudmFsdWUubGVuZ3RoKTtcbiAgICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIC10ZXh0YXJlYS52YWx1ZS5sZW5ndGgpO1xuICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgc3RhdGUuZW5kKTtcbiAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgc3RhdGUuc3RhcnQpO1xuICAgICAgcmFuZ2Uuc2VsZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFNlbGVjdGlvblRleHRhcmVhIChzdGF0ZSkge1xuICAgIGlmICh0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydCAhPT0gdm9pZCAwKSB7XG4gICAgICBzdGF0ZS5zdGFydCA9IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgc3RhdGUuZW5kID0gdGV4dGFyZWEuc2VsZWN0aW9uRW5kO1xuICAgIH0gZWxzZSBpZiAoZG9jLnNlbGVjdGlvbikge1xuICAgICAgYW5jaWVudGx5UmVhZFNlbGVjdGlvblRleHRhcmVhKHN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhbmNpZW50bHlSZWFkU2VsZWN0aW9uVGV4dGFyZWEgKHN0YXRlKSB7XG4gICAgaWYgKGRvYy5hY3RpdmVFbGVtZW50ICYmIGRvYy5hY3RpdmVFbGVtZW50ICE9PSB0ZXh0YXJlYSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN0YXRlLnRleHQgPSBmaXhFT0wodGV4dGFyZWEudmFsdWUpO1xuXG4gICAgdmFyIHJhbmdlID0gZG9jLnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICAgIHZhciBmaXhlZFJhbmdlID0gZml4RU9MKHJhbmdlLnRleHQpO1xuICAgIHZhciBtYXJrZXIgPSAnXFx4MDcnO1xuICAgIHZhciBtYXJrZWRSYW5nZSA9IG1hcmtlciArIGZpeGVkUmFuZ2UgKyBtYXJrZXI7XG5cbiAgICByYW5nZS50ZXh0ID0gbWFya2VkUmFuZ2U7XG5cbiAgICB2YXIgaW5wdXRUZXh0ID0gZml4RU9MKHRleHRhcmVhLnZhbHVlKTtcblxuICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLW1hcmtlZFJhbmdlLmxlbmd0aCk7XG4gICAgcmFuZ2UudGV4dCA9IGZpeGVkUmFuZ2U7XG4gICAgc3RhdGUuc3RhcnQgPSBpbnB1dFRleHQuaW5kZXhPZihtYXJrZXIpO1xuICAgIHN0YXRlLmVuZCA9IGlucHV0VGV4dC5sYXN0SW5kZXhPZihtYXJrZXIpIC0gbWFya2VyLmxlbmd0aDtcblxuICAgIHZhciBkaWZmID0gc3RhdGUudGV4dC5sZW5ndGggLSBmaXhFT0wodGV4dGFyZWEudmFsdWUpLmxlbmd0aDtcbiAgICBpZiAoZGlmZikge1xuICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtZml4ZWRSYW5nZS5sZW5ndGgpO1xuICAgICAgZml4ZWRSYW5nZSArPSBtYW55KCdcXG4nLCBkaWZmKTtcbiAgICAgIHN0YXRlLmVuZCArPSBkaWZmO1xuICAgICAgcmFuZ2UudGV4dCA9IGZpeGVkUmFuZ2U7XG4gICAgfVxuICAgIHN0YXRlLnNlbGVjdCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVTZWxlY3Rpb25FZGl0YWJsZSAoc3RhdGUpIHtcbiAgICB2YXIgY2h1bmtzID0gc3RhdGUuY2FjaGVkQ2h1bmtzIHx8IHN0YXRlLmdldENodW5rcygpO1xuICAgIHZhciBzdGFydCA9IGNodW5rcy5iZWZvcmUubGVuZ3RoO1xuICAgIHZhciBlbmQgPSBzdGFydCArIGNodW5rcy5zZWxlY3Rpb24ubGVuZ3RoO1xuICAgIHZhciBwID0ge307XG5cbiAgICB3YWxrKGVkaXRhYmxlLmZpcnN0Q2hpbGQsIHBlZWspO1xuICAgIGVkaXRhYmxlLmZvY3VzKCk7XG4gICAgc2V0U2VsZWN0aW9uKHApO1xuXG4gICAgZnVuY3Rpb24gcGVlayAoY29udGV4dCwgZWwpIHtcbiAgICAgIHZhciBjdXJzb3IgPSBjb250ZXh0LnRleHQubGVuZ3RoO1xuICAgICAgdmFyIGNvbnRlbnQgPSByZWFkTm9kZShlbCkubGVuZ3RoO1xuICAgICAgdmFyIHN1bSA9IGN1cnNvciArIGNvbnRlbnQ7XG4gICAgICBpZiAoIXAuc3RhcnRDb250YWluZXIgJiYgc3VtID49IHN0YXJ0KSB7XG4gICAgICAgIHAuc3RhcnRDb250YWluZXIgPSBlbDtcbiAgICAgICAgcC5zdGFydE9mZnNldCA9IGJvdW5kZWQoc3RhcnQgLSBjdXJzb3IpO1xuICAgICAgfVxuICAgICAgaWYgKCFwLmVuZENvbnRhaW5lciAmJiBzdW0gPj0gZW5kKSB7XG4gICAgICAgIHAuZW5kQ29udGFpbmVyID0gZWw7XG4gICAgICAgIHAuZW5kT2Zmc2V0ID0gYm91bmRlZChlbmQgLSBjdXJzb3IpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBib3VuZGVkIChvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGNvbnRlbnQsIG9mZnNldCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRTZWxlY3Rpb25FZGl0YWJsZSAoc3RhdGUpIHtcbiAgICB2YXIgc2VsID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgdmFyIGRpc3RhbmNlID0gd2FsayhlZGl0YWJsZS5maXJzdENoaWxkLCBwZWVrKTtcbiAgICB2YXIgc3RhcnQgPSBkaXN0YW5jZS5zdGFydCB8fCAwO1xuICAgIHZhciBlbmQgPSBkaXN0YW5jZS5lbmQgfHwgMDtcblxuICAgIHN0YXRlLnRleHQgPSBkaXN0YW5jZS50ZXh0O1xuXG4gICAgaWYgKGVuZCA+IHN0YXJ0KSB7XG4gICAgICBzdGF0ZS5zdGFydCA9IHN0YXJ0O1xuICAgICAgc3RhdGUuZW5kID0gZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5zdGFydCA9IGVuZDtcbiAgICAgIHN0YXRlLmVuZCA9IHN0YXJ0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBlZWsgKGNvbnRleHQsIGVsKSB7XG4gICAgICBpZiAoZWwgPT09IHNlbC5hbmNob3JOb2RlKSB7XG4gICAgICAgIGNvbnRleHQuc3RhcnQgPSBjb250ZXh0LnRleHQubGVuZ3RoICsgc2VsLmFuY2hvck9mZnNldDtcbiAgICAgIH1cbiAgICAgIGlmIChlbCA9PT0gc2VsLmZvY3VzTm9kZSkge1xuICAgICAgICBjb250ZXh0LmVuZCA9IGNvbnRleHQudGV4dC5sZW5ndGggKyBzZWwuZm9jdXNPZmZzZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2FsayAoZWwsIHBlZWssIGN0eCwgc2libGluZ3MpIHtcbiAgICB2YXIgY29udGV4dCA9IGN0eCB8fCB7IHRleHQ6ICcnIH07XG5cbiAgICBpZiAoIWVsKSB7XG4gICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG5cbiAgICB2YXIgZWxOb2RlID0gZWwubm9kZVR5cGUgPT09IDE7XG4gICAgdmFyIHRleHROb2RlID0gZWwubm9kZVR5cGUgPT09IDM7XG5cbiAgICBwZWVrKGNvbnRleHQsIGVsKTtcblxuICAgIGlmICh0ZXh0Tm9kZSkge1xuICAgICAgY29udGV4dC50ZXh0ICs9IHJlYWROb2RlKGVsKTtcbiAgICB9XG4gICAgaWYgKGVsTm9kZSkge1xuICAgICAgaWYgKGVsLm91dGVySFRNTC5tYXRjaChyb3BlbikpIHsgY29udGV4dC50ZXh0ICs9IFJlZ0V4cC4kMTsgfVxuICAgICAgY2FzdChlbC5jaGlsZE5vZGVzKS5mb3JFYWNoKHdhbGtDaGlsZHJlbik7XG4gICAgICBpZiAoZWwub3V0ZXJIVE1MLm1hdGNoKHJjbG9zZSkpIHsgY29udGV4dC50ZXh0ICs9IFJlZ0V4cC4kMTsgfVxuICAgIH1cbiAgICBpZiAoc2libGluZ3MgIT09IGZhbHNlICYmIGVsLm5leHRTaWJsaW5nKSB7XG4gICAgICByZXR1cm4gd2FsayhlbC5uZXh0U2libGluZywgcGVlaywgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0O1xuXG4gICAgZnVuY3Rpb24gd2Fsa0NoaWxkcmVuIChjaGlsZCkge1xuICAgICAgd2FsayhjaGlsZCwgcGVlaywgY29udGV4dCwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWROb2RlIChlbCkge1xuICAgIHJldHVybiBlbC5ub2RlVHlwZSA9PT0gMyA/IGZpeEVPTChlbC50ZXh0Q29udGVudCB8fCBlbC5pbm5lclRleHQgfHwgJycpIDogJyc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdXJmYWNlO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTluWlhSVGRYSm1ZV05sTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdaRzlqSUQwZ1oyeHZZbUZzTG1SdlkzVnRaVzUwTzF4dWRtRnlJSE5sYkdWalkybHZiaUE5SUhKbGNYVnBjbVVvSjNObGJHVmpZMmx2YmljcE8xeHVkbUZ5SUdacGVFVlBUQ0E5SUhKbGNYVnBjbVVvSnk0dlptbDRSVTlNSnlrN1hHNTJZWElnYldGdWVTQTlJSEpsY1hWcGNtVW9KeTR2YldGdWVTY3BPMXh1ZG1GeUlHTmhjM1FnUFNCeVpYRjFhWEpsS0NjdUwyTmhjM1FuS1R0Y2JuWmhjaUJuWlhSVFpXeGxZM1JwYjI0Z1BTQnpaV3hsWTJOcGIyNHVaMlYwTzF4dWRtRnlJSE5sZEZObGJHVmpkR2x2YmlBOUlITmxiR1ZqWTJsdmJpNXpaWFE3WEc1MllYSWdjbTl3Wlc0Z1BTQXZYaWc4VzE0K1hTc29Qem9nVzE0K1hTb3BQejRwTHp0Y2JuWmhjaUJ5WTJ4dmMyVWdQU0F2S0R4Y1hDOWJYajVkS3o0cEpDODdYRzVjYm1aMWJtTjBhVzl1SUhOMWNtWmhZMlVnS0hSbGVIUmhjbVZoTENCbFpHbDBZV0pzWlN3Z1pISnZjR0Z5WldFcElIdGNiaUFnY21WMGRYSnVJSHRjYmlBZ0lDQjBaWGgwWVhKbFlUb2dkR1Y0ZEdGeVpXRXNYRzRnSUNBZ1pXUnBkR0ZpYkdVNklHVmthWFJoWW14bExGeHVJQ0FnSUdSeWIzQmhjbVZoT2lCa2NtOXdZWEpsWVN4Y2JpQWdJQ0JtYjJOMWN6b2djMlYwUm05amRYTXNYRzRnSUNBZ2NtVmhaRG9nY21WaFpDeGNiaUFnSUNCM2NtbDBaVG9nZDNKcGRHVXNYRzRnSUNBZ1kzVnljbVZ1ZERvZ1kzVnljbVZ1ZEN4Y2JpQWdJQ0IzY21sMFpWTmxiR1ZqZEdsdmJqb2dkM0pwZEdWVFpXeGxZM1JwYjI0c1hHNGdJQ0FnY21WaFpGTmxiR1ZqZEdsdmJqb2djbVZoWkZObGJHVmpkR2x2Ymx4dUlDQjlPMXh1WEc0Z0lHWjFibU4wYVc5dUlITmxkRVp2WTNWeklDaHRiMlJsS1NCN1hHNGdJQ0FnWTNWeWNtVnVkQ2h0YjJSbEtTNW1iMk4xY3lncE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdZM1Z5Y21WdWRDQW9iVzlrWlNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJ0YjJSbElEMDlQU0FuZDNsemFYZDVaeWNnUHlCbFpHbDBZV0pzWlNBNklIUmxlSFJoY21WaE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdjbVZoWkNBb2JXOWtaU2tnZTF4dUlDQWdJR2xtSUNodGIyUmxJRDA5UFNBbmQzbHphWGQ1WnljcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCbFpHbDBZV0pzWlM1cGJtNWxja2hVVFV3N1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQjBaWGgwWVhKbFlTNTJZV3gxWlR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlIZHlhWFJsSUNodGIyUmxMQ0IyWVd4MVpTa2dlMXh1SUNBZ0lHbG1JQ2h0YjJSbElEMDlQU0FuZDNsemFYZDVaeWNwSUh0Y2JpQWdJQ0FnSUdWa2FYUmhZbXhsTG1sdWJtVnlTRlJOVENBOUlIWmhiSFZsTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQjBaWGgwWVhKbFlTNTJZV3gxWlNBOUlIWmhiSFZsTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkeWFYUmxVMlZzWldOMGFXOXVJQ2h6ZEdGMFpTa2dlMXh1SUNBZ0lHbG1JQ2h6ZEdGMFpTNXRiMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y3BJSHRjYmlBZ0lDQWdJSGR5YVhSbFUyVnNaV04wYVc5dVJXUnBkR0ZpYkdVb2MzUmhkR1VwTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQjNjbWwwWlZObGJHVmpkR2x2YmxSbGVIUmhjbVZoS0hOMFlYUmxLVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ5WldGa1UyVnNaV04wYVc5dUlDaHpkR0YwWlNrZ2UxeHVJQ0FnSUdsbUlDaHpkR0YwWlM1dGIyUmxJRDA5UFNBbmQzbHphWGQ1WnljcElIdGNiaUFnSUNBZ0lISmxZV1JUWld4bFkzUnBiMjVGWkdsMFlXSnNaU2h6ZEdGMFpTazdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhKbFlXUlRaV3hsWTNScGIyNVVaWGgwWVhKbFlTaHpkR0YwWlNrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2QzSnBkR1ZUWld4bFkzUnBiMjVVWlhoMFlYSmxZU0FvYzNSaGRHVXBJSHRjYmlBZ0lDQjJZWElnY21GdVoyVTdYRzRnSUNBZ2FXWWdLSFJsZUhSaGNtVmhMbk5sYkdWamRHbHZibE4wWVhKMElDRTlQU0IyYjJsa0lEQXBJSHRjYmlBZ0lDQWdJSFJsZUhSaGNtVmhMbVp2WTNWektDazdYRzRnSUNBZ0lDQjBaWGgwWVhKbFlTNXpaV3hsWTNScGIyNVRkR0Z5ZENBOUlITjBZWFJsTG5OMFlYSjBPMXh1SUNBZ0lDQWdkR1Y0ZEdGeVpXRXVjMlZzWldOMGFXOXVSVzVrSUQwZ2MzUmhkR1V1Wlc1a08xeHVJQ0FnSUNBZ2RHVjRkR0Z5WldFdWMyTnliMnhzVkc5d0lEMGdjM1JoZEdVdWMyTnliMnhzVkc5d08xeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb1pHOWpMbk5sYkdWamRHbHZiaWtnZTF4dUlDQWdJQ0FnYVdZZ0tHUnZZeTVoWTNScGRtVkZiR1Z0Wlc1MElDWW1JR1J2WXk1aFkzUnBkbVZGYkdWdFpXNTBJQ0U5UFNCMFpYaDBZWEpsWVNrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCMFpYaDBZWEpsWVM1bWIyTjFjeWdwTzF4dUlDQWdJQ0FnY21GdVoyVWdQU0IwWlhoMFlYSmxZUzVqY21WaGRHVlVaWGgwVW1GdVoyVW9LVHRjYmlBZ0lDQWdJSEpoYm1kbExtMXZkbVZUZEdGeWRDZ25ZMmhoY21GamRHVnlKeXdnTFhSbGVIUmhjbVZoTG5aaGJIVmxMbXhsYm1kMGFDazdYRzRnSUNBZ0lDQnlZVzVuWlM1dGIzWmxSVzVrS0NkamFHRnlZV04wWlhJbkxDQXRkR1Y0ZEdGeVpXRXVkbUZzZFdVdWJHVnVaM1JvS1R0Y2JpQWdJQ0FnSUhKaGJtZGxMbTF2ZG1WRmJtUW9KMk5vWVhKaFkzUmxjaWNzSUhOMFlYUmxMbVZ1WkNrN1hHNGdJQ0FnSUNCeVlXNW5aUzV0YjNabFUzUmhjblFvSjJOb1lYSmhZM1JsY2ljc0lITjBZWFJsTG5OMFlYSjBLVHRjYmlBZ0lDQWdJSEpoYm1kbExuTmxiR1ZqZENncE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlISmxZV1JUWld4bFkzUnBiMjVVWlhoMFlYSmxZU0FvYzNSaGRHVXBJSHRjYmlBZ0lDQnBaaUFvZEdWNGRHRnlaV0V1YzJWc1pXTjBhVzl1VTNSaGNuUWdJVDA5SUhadmFXUWdNQ2tnZTF4dUlDQWdJQ0FnYzNSaGRHVXVjM1JoY25RZ1BTQjBaWGgwWVhKbFlTNXpaV3hsWTNScGIyNVRkR0Z5ZER0Y2JpQWdJQ0FnSUhOMFlYUmxMbVZ1WkNBOUlIUmxlSFJoY21WaExuTmxiR1ZqZEdsdmJrVnVaRHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLR1J2WXk1elpXeGxZM1JwYjI0cElIdGNiaUFnSUNBZ0lHRnVZMmxsYm5Sc2VWSmxZV1JUWld4bFkzUnBiMjVVWlhoMFlYSmxZU2h6ZEdGMFpTazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdZVzVqYVdWdWRHeDVVbVZoWkZObGJHVmpkR2x2YmxSbGVIUmhjbVZoSUNoemRHRjBaU2tnZTF4dUlDQWdJR2xtSUNoa2IyTXVZV04wYVhabFJXeGxiV1Z1ZENBbUppQmtiMk11WVdOMGFYWmxSV3hsYldWdWRDQWhQVDBnZEdWNGRHRnlaV0VwSUh0Y2JpQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnpkR0YwWlM1MFpYaDBJRDBnWm1sNFJVOU1LSFJsZUhSaGNtVmhMblpoYkhWbEtUdGNibHh1SUNBZ0lIWmhjaUJ5WVc1blpTQTlJR1J2WXk1elpXeGxZM1JwYjI0dVkzSmxZWFJsVW1GdVoyVW9LVHRjYmlBZ0lDQjJZWElnWm1sNFpXUlNZVzVuWlNBOUlHWnBlRVZQVENoeVlXNW5aUzUwWlhoMEtUdGNiaUFnSUNCMllYSWdiV0Z5YTJWeUlEMGdKMXhjZURBM0p6dGNiaUFnSUNCMllYSWdiV0Z5YTJWa1VtRnVaMlVnUFNCdFlYSnJaWElnS3lCbWFYaGxaRkpoYm1kbElDc2diV0Z5YTJWeU8xeHVYRzRnSUNBZ2NtRnVaMlV1ZEdWNGRDQTlJRzFoY210bFpGSmhibWRsTzF4dVhHNGdJQ0FnZG1GeUlHbHVjSFYwVkdWNGRDQTlJR1pwZUVWUFRDaDBaWGgwWVhKbFlTNTJZV3gxWlNrN1hHNWNiaUFnSUNCeVlXNW5aUzV0YjNabFUzUmhjblFvSjJOb1lYSmhZM1JsY2ljc0lDMXRZWEpyWldSU1lXNW5aUzVzWlc1bmRHZ3BPMXh1SUNBZ0lISmhibWRsTG5SbGVIUWdQU0JtYVhobFpGSmhibWRsTzF4dUlDQWdJSE4wWVhSbExuTjBZWEowSUQwZ2FXNXdkWFJVWlhoMExtbHVaR1Y0VDJZb2JXRnlhMlZ5S1R0Y2JpQWdJQ0J6ZEdGMFpTNWxibVFnUFNCcGJuQjFkRlJsZUhRdWJHRnpkRWx1WkdWNFQyWW9iV0Z5YTJWeUtTQXRJRzFoY210bGNpNXNaVzVuZEdnN1hHNWNiaUFnSUNCMllYSWdaR2xtWmlBOUlITjBZWFJsTG5SbGVIUXViR1Z1WjNSb0lDMGdabWw0UlU5TUtIUmxlSFJoY21WaExuWmhiSFZsS1M1c1pXNW5kR2c3WEc0Z0lDQWdhV1lnS0dScFptWXBJSHRjYmlBZ0lDQWdJSEpoYm1kbExtMXZkbVZUZEdGeWRDZ25ZMmhoY21GamRHVnlKeXdnTFdacGVHVmtVbUZ1WjJVdWJHVnVaM1JvS1R0Y2JpQWdJQ0FnSUdacGVHVmtVbUZ1WjJVZ0t6MGdiV0Z1ZVNnblhGeHVKeXdnWkdsbVppazdYRzRnSUNBZ0lDQnpkR0YwWlM1bGJtUWdLejBnWkdsbVpqdGNiaUFnSUNBZ0lISmhibWRsTG5SbGVIUWdQU0JtYVhobFpGSmhibWRsTzF4dUlDQWdJSDFjYmlBZ0lDQnpkR0YwWlM1elpXeGxZM1FvS1R0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlIZHlhWFJsVTJWc1pXTjBhVzl1UldScGRHRmliR1VnS0hOMFlYUmxLU0I3WEc0Z0lDQWdkbUZ5SUdOb2RXNXJjeUE5SUhOMFlYUmxMbU5oWTJobFpFTm9kVzVyY3lCOGZDQnpkR0YwWlM1blpYUkRhSFZ1YTNNb0tUdGNiaUFnSUNCMllYSWdjM1JoY25RZ1BTQmphSFZ1YTNNdVltVm1iM0psTG14bGJtZDBhRHRjYmlBZ0lDQjJZWElnWlc1a0lEMGdjM1JoY25RZ0t5QmphSFZ1YTNNdWMyVnNaV04wYVc5dUxteGxibWQwYUR0Y2JpQWdJQ0IyWVhJZ2NDQTlJSHQ5TzF4dVhHNGdJQ0FnZDJGc2F5aGxaR2wwWVdKc1pTNW1hWEp6ZEVOb2FXeGtMQ0J3WldWcktUdGNiaUFnSUNCbFpHbDBZV0pzWlM1bWIyTjFjeWdwTzF4dUlDQWdJSE5sZEZObGJHVmpkR2x2Ymlod0tUdGNibHh1SUNBZ0lHWjFibU4wYVc5dUlIQmxaV3NnS0dOdmJuUmxlSFFzSUdWc0tTQjdYRzRnSUNBZ0lDQjJZWElnWTNWeWMyOXlJRDBnWTI5dWRHVjRkQzUwWlhoMExteGxibWQwYUR0Y2JpQWdJQ0FnSUhaaGNpQmpiMjUwWlc1MElEMGdjbVZoWkU1dlpHVW9aV3dwTG14bGJtZDBhRHRjYmlBZ0lDQWdJSFpoY2lCemRXMGdQU0JqZFhKemIzSWdLeUJqYjI1MFpXNTBPMXh1SUNBZ0lDQWdhV1lnS0NGd0xuTjBZWEowUTI5dWRHRnBibVZ5SUNZbUlITjFiU0ErUFNCemRHRnlkQ2tnZTF4dUlDQWdJQ0FnSUNCd0xuTjBZWEowUTI5dWRHRnBibVZ5SUQwZ1pXdzdYRzRnSUNBZ0lDQWdJSEF1YzNSaGNuUlBabVp6WlhRZ1BTQmliM1Z1WkdWa0tITjBZWEowSUMwZ1kzVnljMjl5S1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUdsbUlDZ2hjQzVsYm1SRGIyNTBZV2x1WlhJZ0ppWWdjM1Z0SUQ0OUlHVnVaQ2tnZTF4dUlDQWdJQ0FnSUNCd0xtVnVaRU52Ym5SaGFXNWxjaUE5SUdWc08xeHVJQ0FnSUNBZ0lDQndMbVZ1WkU5bVpuTmxkQ0E5SUdKdmRXNWtaV1FvWlc1a0lDMGdZM1Z5YzI5eUtUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdablZ1WTNScGIyNGdZbTkxYm1SbFpDQW9iMlptYzJWMEtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQk5ZWFJvTG0xaGVDZ3dMQ0JOWVhSb0xtMXBiaWhqYjI1MFpXNTBMQ0J2Wm1aelpYUXBLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ5WldGa1UyVnNaV04wYVc5dVJXUnBkR0ZpYkdVZ0tITjBZWFJsS1NCN1hHNGdJQ0FnZG1GeUlITmxiQ0E5SUdkbGRGTmxiR1ZqZEdsdmJpZ3BPMXh1SUNBZ0lIWmhjaUJrYVhOMFlXNWpaU0E5SUhkaGJHc29aV1JwZEdGaWJHVXVabWx5YzNSRGFHbHNaQ3dnY0dWbGF5azdYRzRnSUNBZ2RtRnlJSE4wWVhKMElEMGdaR2x6ZEdGdVkyVXVjM1JoY25RZ2ZId2dNRHRjYmlBZ0lDQjJZWElnWlc1a0lEMGdaR2x6ZEdGdVkyVXVaVzVrSUh4OElEQTdYRzVjYmlBZ0lDQnpkR0YwWlM1MFpYaDBJRDBnWkdsemRHRnVZMlV1ZEdWNGREdGNibHh1SUNBZ0lHbG1JQ2hsYm1RZ1BpQnpkR0Z5ZENrZ2UxeHVJQ0FnSUNBZ2MzUmhkR1V1YzNSaGNuUWdQU0J6ZEdGeWREdGNiaUFnSUNBZ0lITjBZWFJsTG1WdVpDQTlJR1Z1WkR0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdjM1JoZEdVdWMzUmhjblFnUFNCbGJtUTdYRzRnSUNBZ0lDQnpkR0YwWlM1bGJtUWdQU0J6ZEdGeWREdGNiaUFnSUNCOVhHNWNiaUFnSUNCbWRXNWpkR2x2YmlCd1pXVnJJQ2hqYjI1MFpYaDBMQ0JsYkNrZ2UxeHVJQ0FnSUNBZ2FXWWdLR1ZzSUQwOVBTQnpaV3d1WVc1amFHOXlUbTlrWlNrZ2UxeHVJQ0FnSUNBZ0lDQmpiMjUwWlhoMExuTjBZWEowSUQwZ1kyOXVkR1Y0ZEM1MFpYaDBMbXhsYm1kMGFDQXJJSE5sYkM1aGJtTm9iM0pQWm1aelpYUTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnBaaUFvWld3Z1BUMDlJSE5sYkM1bWIyTjFjMDV2WkdVcElIdGNiaUFnSUNBZ0lDQWdZMjl1ZEdWNGRDNWxibVFnUFNCamIyNTBaWGgwTG5SbGVIUXViR1Z1WjNSb0lDc2djMlZzTG1adlkzVnpUMlptYzJWME8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlIZGhiR3NnS0dWc0xDQndaV1ZyTENCamRIZ3NJSE5wWW14cGJtZHpLU0I3WEc0Z0lDQWdkbUZ5SUdOdmJuUmxlSFFnUFNCamRIZ2dmSHdnZXlCMFpYaDBPaUFuSnlCOU8xeHVYRzRnSUNBZ2FXWWdLQ0ZsYkNrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdOdmJuUmxlSFE3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdkbUZ5SUdWc1RtOWtaU0E5SUdWc0xtNXZaR1ZVZVhCbElEMDlQU0F4TzF4dUlDQWdJSFpoY2lCMFpYaDBUbTlrWlNBOUlHVnNMbTV2WkdWVWVYQmxJRDA5UFNBek8xeHVYRzRnSUNBZ2NHVmxheWhqYjI1MFpYaDBMQ0JsYkNrN1hHNWNiaUFnSUNCcFppQW9kR1Y0ZEU1dlpHVXBJSHRjYmlBZ0lDQWdJR052Ym5SbGVIUXVkR1Y0ZENBclBTQnlaV0ZrVG05a1pTaGxiQ2s3WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2hsYkU1dlpHVXBJSHRjYmlBZ0lDQWdJR2xtSUNobGJDNXZkWFJsY2toVVRVd3ViV0YwWTJnb2NtOXdaVzRwS1NCN0lHTnZiblJsZUhRdWRHVjRkQ0FyUFNCU1pXZEZlSEF1SkRFN0lIMWNiaUFnSUNBZ0lHTmhjM1FvWld3dVkyaHBiR1JPYjJSbGN5a3VabTl5UldGamFDaDNZV3hyUTJocGJHUnlaVzRwTzF4dUlDQWdJQ0FnYVdZZ0tHVnNMbTkxZEdWeVNGUk5UQzV0WVhSamFDaHlZMnh2YzJVcEtTQjdJR052Ym5SbGVIUXVkR1Y0ZENBclBTQlNaV2RGZUhBdUpERTdJSDFjYmlBZ0lDQjlYRzRnSUNBZ2FXWWdLSE5wWW14cGJtZHpJQ0U5UFNCbVlXeHpaU0FtSmlCbGJDNXVaWGgwVTJsaWJHbHVaeWtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSGRoYkdzb1pXd3VibVY0ZEZOcFlteHBibWNzSUhCbFpXc3NJR052Ym5SbGVIUXBPMXh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnWTI5dWRHVjRkRHRjYmx4dUlDQWdJR1oxYm1OMGFXOXVJSGRoYkd0RGFHbHNaSEpsYmlBb1kyaHBiR1FwSUh0Y2JpQWdJQ0FnSUhkaGJHc29ZMmhwYkdRc0lIQmxaV3NzSUdOdmJuUmxlSFFzSUdaaGJITmxLVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ5WldGa1RtOWtaU0FvWld3cElIdGNiaUFnSUNCeVpYUjFjbTRnWld3dWJtOWtaVlI1Y0dVZ1BUMDlJRE1nUHlCbWFYaEZUMHdvWld3dWRHVjRkRU52Ym5SbGJuUWdmSHdnWld3dWFXNXVaWEpVWlhoMElIeDhJQ2NuS1NBNklDY25PMXh1SUNCOVhHNTlYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnYzNWeVptRmpaVHRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGdldFRleHQgKGVsKSB7XG4gIHJldHVybiBlbC5pbm5lclRleHQgfHwgZWwudGV4dENvbnRlbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VGV4dDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRyaW1DaHVua3MgPSByZXF1aXJlKCcuLi9jaHVua3MvdHJpbScpO1xuXG5mdW5jdGlvbiBIdG1sQ2h1bmtzICgpIHtcbn1cblxuSHRtbENodW5rcy5wcm90b3R5cGUudHJpbSA9IHRyaW1DaHVua3M7XG5cbkh0bWxDaHVua3MucHJvdG90eXBlLmZpbmRUYWdzID0gZnVuY3Rpb24gKCkge1xufTtcblxuSHRtbENodW5rcy5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uICgpIHtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSHRtbENodW5rcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgd3JhcHBpbmcgPSByZXF1aXJlKCcuL3dyYXBwaW5nJyk7XG5cbmZ1bmN0aW9uIGJsb2NrcXVvdGUgKGNodW5rcykge1xuICB3cmFwcGluZygnYmxvY2txdW90ZScsIHN0cmluZ3MucGxhY2Vob2xkZXJzLnF1b3RlLCBjaHVua3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJsb2NrcXVvdGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHdyYXBwaW5nID0gcmVxdWlyZSgnLi93cmFwcGluZycpO1xuXG5mdW5jdGlvbiBib2xkT3JJdGFsaWMgKGNodW5rcywgdHlwZSkge1xuICB3cmFwcGluZyh0eXBlID09PSAnYm9sZCcgPyAnc3Ryb25nJyA6ICdlbScsIHN0cmluZ3MucGxhY2Vob2xkZXJzW3R5cGVdLCBjaHVua3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJvbGRPckl0YWxpYztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgd3JhcHBpbmcgPSByZXF1aXJlKCcuL3dyYXBwaW5nJyk7XG5cbmZ1bmN0aW9uIGNvZGVibG9jayAoY2h1bmtzKSB7XG4gIHdyYXBwaW5nKCdwcmU+PGNvZGUnLCBzdHJpbmdzLnBsYWNlaG9sZGVycy5jb2RlLCBjaHVua3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvZGVibG9jaztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgcmxlYWRpbmcgPSAvPGgoWzEtNl0pKCBbXj5dKik/PiQvO1xudmFyIHJ0cmFpbGluZyA9IC9ePFxcL2goWzEtNl0pPi87XG5cbmZ1bmN0aW9uIGhlYWRpbmcgKGNodW5rcykge1xuICBjaHVua3MudHJpbSgpO1xuXG4gIHZhciB0cmFpbCA9IHJ0cmFpbGluZy5leGVjKGNodW5rcy5hZnRlcik7XG4gIHZhciBsZWFkID0gcmxlYWRpbmcuZXhlYyhjaHVua3MuYmVmb3JlKTtcbiAgaWYgKGxlYWQgJiYgdHJhaWwgJiYgbGVhZFsxXSA9PT0gdHJhaWxbMV0pIHtcbiAgICBzd2FwKCk7XG4gIH0gZWxzZSB7XG4gICAgYWRkKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzd2FwICgpIHtcbiAgICB2YXIgbGV2ZWwgPSBwYXJzZUludChsZWFkWzFdLCAxMCk7XG4gICAgdmFyIG5leHQgPSBsZXZlbCA8PSAxID8gNCA6IGxldmVsIC0gMTtcbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJsZWFkaW5nLCAnPGgnICsgbmV4dCArICc+Jyk7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnRyYWlsaW5nLCAnPC9oJyArIG5leHQgKyAnPicpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkICgpIHtcbiAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVycy5oZWFkaW5nO1xuICAgIH1cbiAgICBjaHVua3MuYmVmb3JlICs9ICc8aDE+JztcbiAgICBjaHVua3MuYWZ0ZXIgPSAnPC9oMT4nICsgY2h1bmtzLmFmdGVyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGVhZGluZztcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaHIgKGNodW5rcykge1xuICBjaHVua3MuYmVmb3JlICs9ICdcXG48aHI+XFxuJztcbiAgY2h1bmtzLnNlbGVjdGlvbiA9ICcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgb25jZSA9IHJlcXVpcmUoJy4uL29uY2UnKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHBhcnNlTGlua0lucHV0ID0gcmVxdWlyZSgnLi4vY2h1bmtzL3BhcnNlTGlua0lucHV0Jyk7XG52YXIgcmxlYWRpbmcgPSAvPGEoIFtePl0qKT8+JC87XG52YXIgcnRyYWlsaW5nID0gL148XFwvYT4vO1xudmFyIHJpbWFnZSA9IC88aW1nKCBbXj5dKik/XFwvPiQvO1xuXG5mdW5jdGlvbiBsaW5rT3JJbWFnZU9yQXR0YWNobWVudCAoY2h1bmtzLCBvcHRpb25zKSB7XG4gIHZhciB0eXBlID0gb3B0aW9ucy50eXBlO1xuICB2YXIgaW1hZ2UgPSB0eXBlID09PSAnaW1hZ2UnO1xuICB2YXIgcmVzdW1lO1xuXG4gIGlmICh0eXBlICE9PSAnYXR0YWNobWVudCcpIHtcbiAgICBjaHVua3MudHJpbSgpO1xuICB9XG5cbiAgaWYgKHJlbW92YWwoKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJlc3VtZSA9IHRoaXMuYXN5bmMoKTtcblxuICBvcHRpb25zLnByb21wdHMuY2xvc2UoKTtcbiAgKG9wdGlvbnMucHJvbXB0c1t0eXBlXSB8fCBvcHRpb25zLnByb21wdHMubGluaykob3B0aW9ucywgb25jZShyZXNvbHZlZCkpO1xuXG4gIGZ1bmN0aW9uIHJlbW92YWwgKCkge1xuICAgIGlmIChpbWFnZSkge1xuICAgICAgaWYgKHJpbWFnZS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pKSB7XG4gICAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChydHJhaWxpbmcuZXhlYyhjaHVua3MuYWZ0ZXIpICYmIHJsZWFkaW5nLmV4ZWMoY2h1bmtzLmJlZm9yZSkpIHtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlYWRpbmcsICcnKTtcbiAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJ0cmFpbGluZywgJycpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZWQgKHJlc3VsdCkge1xuICAgIHZhciBwYXJ0cztcbiAgICB2YXIgbGluayA9IHBhcnNlTGlua0lucHV0KHJlc3VsdC5kZWZpbml0aW9uKTtcbiAgICBpZiAobGluay5ocmVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVzdW1lKCk7IHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ2F0dGFjaG1lbnQnKSB7XG4gICAgICBwYXJ0cyA9IG9wdGlvbnMubWVyZ2VIdG1sQW5kQXR0YWNobWVudChjaHVua3MuYmVmb3JlICsgY2h1bmtzLnNlbGVjdGlvbiArIGNodW5rcy5hZnRlciwgbGluayk7XG4gICAgICBjaHVua3MuYmVmb3JlID0gcGFydHMuYmVmb3JlO1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHBhcnRzLnNlbGVjdGlvbjtcbiAgICAgIGNodW5rcy5hZnRlciA9IHBhcnRzLmFmdGVyO1xuICAgICAgcmVzdW1lKCk7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKG9wdGlvbnMuc3VyZmFjZS50ZXh0YXJlYSwgJ3dvb2ZtYXJrLW1vZGUtY2hhbmdlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHRpdGxlID0gbGluay50aXRsZSA/ICcgdGl0bGU9XCInICsgbGluay50aXRsZSArICdcIicgOiAnJztcblxuICAgIGlmIChpbWFnZSkge1xuICAgICAgaW1hZ2VXcmFwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmtXcmFwKCk7XG4gICAgfVxuXG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnNbdHlwZV07XG4gICAgfVxuICAgIHJlc3VtZSgpO1xuXG4gICAgZnVuY3Rpb24gaW1hZ2VXcmFwICgpIHtcbiAgICAgIGNodW5rcy5iZWZvcmUgKz0gJzxpbWcgc3JjPVwiJyArIGxpbmsuaHJlZiArICdcIiBhbHQ9XCInO1xuICAgICAgY2h1bmtzLmFmdGVyID0gJ1wiJyArIHRpdGxlICsgJyAvPicgKyBjaHVua3MuYWZ0ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlua1dyYXAgKCkge1xuICAgICAgdmFyIG5hbWVzID0gb3B0aW9ucy5jbGFzc2VzLmlucHV0LmxpbmtzO1xuICAgICAgdmFyIGNsYXNzZXMgPSBuYW1lcyA/ICcgY2xhc3M9XCInICsgbmFtZXMgKyAnXCInIDogJyc7XG4gICAgICBjaHVua3MuYmVmb3JlICs9ICc8YSBocmVmPVwiJyArIGxpbmsuaHJlZiArICdcIicgKyB0aXRsZSArIGNsYXNzZXMgKyAnPic7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSAnPC9hPicgKyBjaHVua3MuYWZ0ZXI7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlua09ySW1hZ2VPckF0dGFjaG1lbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHJsZWZ0c2luZ2xlID0gLzwodWx8b2wpKCBbXj5dKik/Plxccyo8bGkoIFtePl0qKT8+JC87XG52YXIgcnJpZ2h0c2luZ2xlID0gL148XFwvbGk+XFxzKjxcXC8odWx8b2wpPi87XG52YXIgcmxlZnRpdGVtID0gLzxsaSggW14+XSopPz4kLztcbnZhciBycmlnaHRpdGVtID0gL148XFwvbGkoIFtePl0qKT8+LztcbnZhciByb3BlbiA9IC9ePCh1bHxvbCkoIFtePl0qKT8+JC87XG5cbmZ1bmN0aW9uIGxpc3QgKGNodW5rcywgb3JkZXJlZCkge1xuICB2YXIgdGFnID0gb3JkZXJlZCA/ICdvbCcgOiAndWwnO1xuICB2YXIgb2xpc3QgPSAnPCcgKyB0YWcgKyAnPic7XG4gIHZhciBjbGlzdCA9ICc8LycgKyB0YWcgKyAnPic7XG5cbiAgY2h1bmtzLnRyaW0oKTtcblxuICBpZiAocmxlZnRzaW5nbGUudGVzdChjaHVua3MuYmVmb3JlKSAmJiBycmlnaHRzaW5nbGUudGVzdChjaHVua3MuYWZ0ZXIpKSB7XG4gICAgaWYgKHRhZyA9PT0gUmVnRXhwLiQxKSB7XG4gICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJsZWZ0c2luZ2xlLCAnJyk7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShycmlnaHRzaW5nbGUsICcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICB2YXIgdWxTdGFydCA9IGNodW5rcy5iZWZvcmUubGFzdEluZGV4T2YoJzx1bCcpO1xuICB2YXIgb2xTdGFydCA9IGNodW5rcy5iZWZvcmUubGFzdEluZGV4T2YoJzxvbCcpO1xuICB2YXIgY2xvc2VUYWcgPSBjaHVua3MuYWZ0ZXIuaW5kZXhPZignPC91bD4nKTtcbiAgaWYgKGNsb3NlVGFnID09PSAtMSkge1xuICAgIGNsb3NlVGFnID0gY2h1bmtzLmFmdGVyLmluZGV4T2YoJzwvb2w+Jyk7XG4gIH1cbiAgaWYgKGNsb3NlVGFnID09PSAtMSkge1xuICAgIGFkZCgpOyByZXR1cm47XG4gIH1cbiAgdmFyIG9wZW5TdGFydCA9IHVsU3RhcnQgPiBvbFN0YXJ0ID8gdWxTdGFydCA6IG9sU3RhcnQ7XG4gIGlmIChvcGVuU3RhcnQgPT09IC0xKSB7XG4gICAgYWRkKCk7IHJldHVybjtcbiAgfVxuICB2YXIgb3BlbkVuZCA9IGNodW5rcy5iZWZvcmUuaW5kZXhPZignPicsIG9wZW5TdGFydCk7XG4gIGlmIChvcGVuRW5kID09PSAtMSkge1xuICAgIGFkZCgpOyByZXR1cm47XG4gIH1cblxuICB2YXIgb3BlblRhZyA9IGNodW5rcy5iZWZvcmUuc3Vic3RyKG9wZW5TdGFydCwgb3BlbkVuZCAtIG9wZW5TdGFydCArIDEpO1xuICBpZiAocm9wZW4udGVzdChvcGVuVGFnKSkge1xuICAgIGlmICh0YWcgIT09IFJlZ0V4cC4kMSkge1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUuc3Vic3RyKDAsIG9wZW5TdGFydCkgKyAnPCcgKyB0YWcgKyBjaHVua3MuYmVmb3JlLnN1YnN0cihvcGVuU3RhcnQgKyAzKTtcbiAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5zdWJzdHIoMCwgY2xvc2VUYWcpICsgJzwvJyArIHRhZyArIGNodW5rcy5hZnRlci5zdWJzdHIoY2xvc2VUYWcgKyA0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJsZWZ0aXRlbS50ZXN0KGNodW5rcy5iZWZvcmUpICYmIHJyaWdodGl0ZW0udGVzdChjaHVua3MuYWZ0ZXIpKSB7XG4gICAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlZnRpdGVtLCAnJyk7XG4gICAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJyaWdodGl0ZW0sICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZCh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGQgKGxpc3QpIHtcbiAgICB2YXIgb3BlbiA9IGxpc3QgPyAnJyA6IG9saXN0O1xuICAgIHZhciBjbG9zZSA9IGxpc3QgPyAnJyA6IGNsaXN0O1xuXG4gICAgY2h1bmtzLmJlZm9yZSArPSBvcGVuICsgJzxsaT4nO1xuICAgIGNodW5rcy5hZnRlciA9ICc8L2xpPicgKyBjbG9zZSArIGNodW5rcy5hZnRlcjtcblxuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmxpc3RpdGVtO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHdyYXBwaW5nICh0YWcsIHBsYWNlaG9sZGVyLCBjaHVua3MpIHtcbiAgdmFyIG9wZW4gPSAnPCcgKyB0YWc7XG4gIHZhciBjbG9zZSA9ICc8LycgKyB0YWcucmVwbGFjZSgvPC9nLCAnPC8nKTtcbiAgdmFyIHJsZWFkaW5nID0gbmV3IFJlZ0V4cChvcGVuICsgJyggW14+XSopPz4kJywgJ2knKTtcbiAgdmFyIHJ0cmFpbGluZyA9IG5ldyBSZWdFeHAoJ14nICsgY2xvc2UgKyAnPicsICdpJyk7XG4gIHZhciByb3BlbiA9IG5ldyBSZWdFeHAob3BlbiArICcoIFtePl0qKT8+JywgJ2lnJyk7XG4gIHZhciByY2xvc2UgPSBuZXcgUmVnRXhwKGNsb3NlICsgJyggW14+XSopPz4nLCAnaWcnKTtcblxuICBjaHVua3MudHJpbSgpO1xuXG4gIHZhciB0cmFpbCA9IHJ0cmFpbGluZy5leGVjKGNodW5rcy5hZnRlcik7XG4gIHZhciBsZWFkID0gcmxlYWRpbmcuZXhlYyhjaHVua3MuYmVmb3JlKTtcbiAgaWYgKGxlYWQgJiYgdHJhaWwpIHtcbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJsZWFkaW5nLCAnJyk7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnRyYWlsaW5nLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIHZhciBvcGVuZWQgPSByb3Blbi50ZXN0KGNodW5rcy5zZWxlY3Rpb24pO1xuICAgIGlmIChvcGVuZWQpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2Uocm9wZW4sICcnKTtcbiAgICAgIGlmICghc3Vycm91bmRlZChjaHVua3MsIHRhZykpIHtcbiAgICAgICAgY2h1bmtzLmJlZm9yZSArPSBvcGVuICsgJz4nO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2xvc2VkID0gcmNsb3NlLnRlc3QoY2h1bmtzLnNlbGVjdGlvbik7XG4gICAgaWYgKGNsb3NlZCkge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShyY2xvc2UsICcnKTtcbiAgICAgIGlmICghc3Vycm91bmRlZChjaHVua3MsIHRhZykpIHtcbiAgICAgICAgY2h1bmtzLmFmdGVyID0gY2xvc2UgKyAnPicgKyBjaHVua3MuYWZ0ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcGVuZWQgfHwgY2xvc2VkKSB7XG4gICAgICBwdXNob3ZlcigpOyByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdXJyb3VuZGVkKGNodW5rcywgdGFnKSkge1xuICAgICAgaWYgKHJsZWFkaW5nLnRlc3QoY2h1bmtzLmJlZm9yZSkpIHtcbiAgICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVhZGluZywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2h1bmtzLmJlZm9yZSArPSBjbG9zZSArICc+JztcbiAgICAgIH1cbiAgICAgIGlmIChydHJhaWxpbmcudGVzdChjaHVua3MuYWZ0ZXIpKSB7XG4gICAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJ0cmFpbGluZywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2h1bmtzLmFmdGVyID0gb3BlbiArICc+JyArIGNodW5rcy5hZnRlcjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFjbG9zZWJvdW5kZWQoY2h1bmtzLCB0YWcpKSB7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjbG9zZSArICc+JyArIGNodW5rcy5hZnRlcjtcbiAgICAgIGNodW5rcy5iZWZvcmUgKz0gb3BlbiArICc+JztcbiAgICB9XG4gICAgcHVzaG92ZXIoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2hvdmVyICgpIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoLzwoXFwvKT8oW14+IF0rKSggW14+XSopPz4vaWcsIHB1c2hvdmVyT3RoZXJUYWdzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2hvdmVyT3RoZXJUYWdzIChhbGwsIGNsb3NpbmcsIHRhZywgYSwgaSkge1xuICAgIHZhciBhdHRycyA9IGEgfHwgJyc7XG4gICAgdmFyIG9wZW4gPSAhY2xvc2luZztcbiAgICB2YXIgcmNsb3NlZCA9IG5ldyBSZWdFeHAoJzxcXC8nICsgdGFnLnJlcGxhY2UoLzwvZywgJzwvJykgKyAnPicsICdpJyk7XG4gICAgdmFyIHJvcGVuZWQgPSBuZXcgUmVnRXhwKCc8JyArIHRhZyArICcoIFtePl0qKT8+JywgJ2knKTtcbiAgICBpZiAob3BlbiAmJiAhcmNsb3NlZC50ZXN0KGNodW5rcy5zZWxlY3Rpb24uc3Vic3RyKGkpKSkge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiArPSAnPC8nICsgdGFnICsgJz4nO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UoL14oPFxcL1tePl0rPikvLCAnJDE8JyArIHRhZyArIGF0dHJzICsgJz4nKTtcbiAgICB9XG5cbiAgICBpZiAoY2xvc2luZyAmJiAhcm9wZW5lZC50ZXN0KGNodW5rcy5zZWxlY3Rpb24uc3Vic3RyKDAsIGkpKSkge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9ICc8JyArIHRhZyArIGF0dHJzICsgJz4nICsgY2h1bmtzLnNlbGVjdGlvbjtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UoLyg8W14+XSsoPzogW14+XSopPz4pJC8sICc8LycgKyB0YWcgKyAnPiQxJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlYm91bmRlZCAoY2h1bmtzLCB0YWcpIHtcbiAgdmFyIHJjbG9zZWxlZnQgPSBuZXcgUmVnRXhwKCc8LycgKyB0YWcucmVwbGFjZSgvPC9nLCAnPC8nKSArICc+JCcsICdpJyk7XG4gIHZhciByb3BlbnJpZ2h0ID0gbmV3IFJlZ0V4cCgnXjwnICsgdGFnICsgJyg/OiBbXj5dKik/PicsICdpJyk7XG4gIHZhciBib3VuZGVkID0gcmNsb3NlbGVmdC50ZXN0KGNodW5rcy5iZWZvcmUpICYmIHJvcGVucmlnaHQudGVzdChjaHVua3MuYWZ0ZXIpO1xuICBpZiAoYm91bmRlZCkge1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmNsb3NlbGVmdCwgJycpO1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJvcGVucmlnaHQsICcnKTtcbiAgfVxuICByZXR1cm4gYm91bmRlZDtcbn1cblxuZnVuY3Rpb24gc3Vycm91bmRlZCAoY2h1bmtzLCB0YWcpIHtcbiAgdmFyIHJvcGVuID0gbmV3IFJlZ0V4cCgnPCcgKyB0YWcgKyAnKD86IFtePl0qKT8+JywgJ2lnJyk7XG4gIHZhciByY2xvc2UgPSBuZXcgUmVnRXhwKCc8XFwvJyArIHRhZy5yZXBsYWNlKC88L2csICc8LycpICsgJz4nLCAnaWcnKTtcbiAgdmFyIG9wZW5zQmVmb3JlID0gY291bnQoY2h1bmtzLmJlZm9yZSwgcm9wZW4pO1xuICB2YXIgb3BlbnNBZnRlciA9IGNvdW50KGNodW5rcy5hZnRlciwgcm9wZW4pO1xuICB2YXIgY2xvc2VzQmVmb3JlID0gY291bnQoY2h1bmtzLmJlZm9yZSwgcmNsb3NlKTtcbiAgdmFyIGNsb3Nlc0FmdGVyID0gY291bnQoY2h1bmtzLmFmdGVyLCByY2xvc2UpO1xuICB2YXIgb3BlbiA9IG9wZW5zQmVmb3JlIC0gY2xvc2VzQmVmb3JlID4gMDtcbiAgdmFyIGNsb3NlID0gY2xvc2VzQWZ0ZXIgLSBvcGVuc0FmdGVyID4gMDtcbiAgcmV0dXJuIG9wZW4gJiYgY2xvc2U7XG5cbiAgZnVuY3Rpb24gY291bnQgKHRleHQsIHJlZ2V4KSB7XG4gICAgdmFyIG1hdGNoID0gdGV4dC5tYXRjaChyZWdleCk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWF0Y2gubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBwaW5nO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc1Zpc2libGVFbGVtZW50IChlbGVtKSB7XG4gIGlmIChnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgIHJldHVybiBnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXNwbGF5JykgIT09ICdub25lJztcbiAgfSBlbHNlIGlmIChlbGVtLmN1cnJlbnRTdHlsZSkge1xuICAgIHJldHVybiBlbGVtLmN1cnJlbnRTdHlsZS5kaXNwbGF5ICE9PSAnbm9uZSc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Zpc2libGVFbGVtZW50O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTlwYzFacGMybGliR1ZGYkdWdFpXNTBMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1Wm5WdVkzUnBiMjRnYVhOV2FYTnBZbXhsUld4bGJXVnVkQ0FvWld4bGJTa2dlMXh1SUNCcFppQW9aMnh2WW1Gc0xtZGxkRU52YlhCMWRHVmtVM1I1YkdVcElIdGNiaUFnSUNCeVpYUjFjbTRnWjJ4dlltRnNMbWRsZEVOdmJYQjFkR1ZrVTNSNWJHVW9aV3hsYlN3Z2JuVnNiQ2t1WjJWMFVISnZjR1Z5ZEhsV1lXeDFaU2duWkdsemNHeGhlU2NwSUNFOVBTQW5ibTl1WlNjN1hHNGdJSDBnWld4elpTQnBaaUFvWld4bGJTNWpkWEp5Wlc1MFUzUjViR1VwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdaV3hsYlM1amRYSnlaVzUwVTNSNWJHVXVaR2x6Y0d4aGVTQWhQVDBnSjI1dmJtVW5PMXh1SUNCOVhHNTlYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnYVhOV2FYTnBZbXhsUld4bGJXVnVkRHRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG1hbnkgKHRleHQsIHRpbWVzKSB7XG4gIHJldHVybiBuZXcgQXJyYXkodGltZXMgKyAxKS5qb2luKHRleHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hbnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYW55ID0gcmVxdWlyZSgnLi4vbWFueScpO1xudmFyIGV4dGVuZFJlZ0V4cCA9IHJlcXVpcmUoJy4uL2V4dGVuZFJlZ0V4cCcpO1xudmFyIHRyaW1DaHVua3MgPSByZXF1aXJlKCcuLi9jaHVua3MvdHJpbScpO1xudmFyIHJlID0gUmVnRXhwO1xuXG5mdW5jdGlvbiBNYXJrZG93bkNodW5rcyAoKSB7XG59XG5cbk1hcmtkb3duQ2h1bmtzLnByb3RvdHlwZS50cmltID0gdHJpbUNodW5rcztcblxuTWFya2Rvd25DaHVua3MucHJvdG90eXBlLmZpbmRUYWdzID0gZnVuY3Rpb24gKHN0YXJ0UmVnZXgsIGVuZFJlZ2V4KSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHJlZ2V4O1xuXG4gIGlmIChzdGFydFJlZ2V4KSB7XG4gICAgcmVnZXggPSBleHRlbmRSZWdFeHAoc3RhcnRSZWdleCwgJycsICckJyk7XG4gICAgdGhpcy5iZWZvcmUgPSB0aGlzLmJlZm9yZS5yZXBsYWNlKHJlZ2V4LCBzdGFydFJlcGxhY2VyKTtcbiAgICByZWdleCA9IGV4dGVuZFJlZ0V4cChzdGFydFJlZ2V4LCAnXicsICcnKTtcbiAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLnJlcGxhY2UocmVnZXgsIHN0YXJ0UmVwbGFjZXIpO1xuICB9XG5cbiAgaWYgKGVuZFJlZ2V4KSB7XG4gICAgcmVnZXggPSBleHRlbmRSZWdFeHAoZW5kUmVnZXgsICcnLCAnJCcpO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24ucmVwbGFjZShyZWdleCwgZW5kUmVwbGFjZXIpO1xuICAgIHJlZ2V4ID0gZXh0ZW5kUmVnRXhwKGVuZFJlZ2V4LCAnXicsICcnKTtcbiAgICB0aGlzLmFmdGVyID0gdGhpcy5hZnRlci5yZXBsYWNlKHJlZ2V4LCBlbmRSZXBsYWNlcik7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydFJlcGxhY2VyIChtYXRjaCkge1xuICAgIHNlbGYuc3RhcnRUYWcgPSBzZWxmLnN0YXJ0VGFnICsgbWF0Y2g7IHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZFJlcGxhY2VyIChtYXRjaCkge1xuICAgIHNlbGYuZW5kVGFnID0gbWF0Y2ggKyBzZWxmLmVuZFRhZzsgcmV0dXJuICcnO1xuICB9XG59O1xuXG5NYXJrZG93bkNodW5rcy5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGJlZm9yZUNvdW50ID0gJ2JlZm9yZScgaW4gbyA/IG8uYmVmb3JlIDogMTtcbiAgdmFyIGFmdGVyQ291bnQgPSAnYWZ0ZXInIGluIG8gPyBvLmFmdGVyIDogMTtcblxuICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLnJlcGxhY2UoLyheXFxuKikvLCAnJyk7XG4gIHRoaXMuc3RhcnRUYWcgPSB0aGlzLnN0YXJ0VGFnICsgcmUuJDE7XG4gIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24ucmVwbGFjZSgvKFxcbiokKS8sICcnKTtcbiAgdGhpcy5lbmRUYWcgPSB0aGlzLmVuZFRhZyArIHJlLiQxO1xuICB0aGlzLnN0YXJ0VGFnID0gdGhpcy5zdGFydFRhZy5yZXBsYWNlKC8oXlxcbiopLywgJycpO1xuICB0aGlzLmJlZm9yZSA9IHRoaXMuYmVmb3JlICsgcmUuJDE7XG4gIHRoaXMuZW5kVGFnID0gdGhpcy5lbmRUYWcucmVwbGFjZSgvKFxcbiokKS8sICcnKTtcbiAgdGhpcy5hZnRlciA9IHRoaXMuYWZ0ZXIgKyByZS4kMTtcblxuICBpZiAodGhpcy5iZWZvcmUpIHtcbiAgICB0aGlzLmJlZm9yZSA9IHJlcGxhY2UodGhpcy5iZWZvcmUsICsrYmVmb3JlQ291bnQsICckJyk7XG4gIH1cblxuICBpZiAodGhpcy5hZnRlcikge1xuICAgIHRoaXMuYWZ0ZXIgPSByZXBsYWNlKHRoaXMuYWZ0ZXIsICsrYWZ0ZXJDb3VudCwgJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZSAodGV4dCwgY291bnQsIHN1ZmZpeCkge1xuICAgIHZhciByZWdleCA9IG8uYW55ID8gJ1xcXFxuKicgOiBtYW55KCdcXFxcbj8nLCBjb3VudCk7XG4gICAgdmFyIHJlcGxhY2VtZW50ID0gbWFueSgnXFxuJywgY291bnQpO1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UobmV3IHJlKHJlZ2V4ICsgc3VmZml4KSwgcmVwbGFjZW1lbnQpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtkb3duQ2h1bmtzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcbnZhciBzZXR0aW5ncyA9IHJlcXVpcmUoJy4vc2V0dGluZ3MnKTtcbnZhciBydHJhaWxibGFua2xpbmUgPSAvKD5bIFxcdF0qKSQvO1xudmFyIHJsZWFkYmxhbmtsaW5lID0gL14oPlsgXFx0XSopLztcbnZhciBybmV3bGluZWZlbmNpbmcgPSAvXihcXG4qKShbXlxccl0rPykoXFxuKikkLztcbnZhciByZW5kdGFnID0gL14oKChcXG58XikoXFxuWyBcXHRdKikqPiguK1xcbikqLiopKyhcXG5bIFxcdF0qKSopLztcbnZhciBybGVhZGJyYWNrZXQgPSAvXlxcbigoPnxcXHMpKilcXG4vO1xudmFyIHJ0cmFpbGJyYWNrZXQgPSAvXFxuKCg+fFxccykqKVxcbiQvO1xuXG5mdW5jdGlvbiBibG9ja3F1b3RlIChjaHVua3MpIHtcbiAgdmFyIG1hdGNoID0gJyc7XG4gIHZhciBsZWZ0T3ZlciA9ICcnO1xuICB2YXIgbGluZTtcblxuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJuZXdsaW5lZmVuY2luZywgbmV3bGluZXJlcGxhY2VyKTtcbiAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShydHJhaWxibGFua2xpbmUsIHRyYWlsYmxhbmtsaW5lcmVwbGFjZXIpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9eKFxcc3w+KSskLywgJycpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbiB8fCBzdHJpbmdzLnBsYWNlaG9sZGVycy5xdW90ZTtcblxuICBpZiAoY2h1bmtzLmJlZm9yZSkge1xuICAgIGJlZm9yZVByb2Nlc3NpbmcoKTtcbiAgfVxuXG4gIGNodW5rcy5zdGFydFRhZyA9IG1hdGNoO1xuICBjaHVua3MuYmVmb3JlID0gbGVmdE92ZXI7XG5cbiAgaWYgKGNodW5rcy5hZnRlcikge1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKC9eXFxuPy8sICdcXG4nKTtcbiAgfVxuXG4gIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJlbmR0YWcsIGVuZHRhZ3JlcGxhY2VyKTtcblxuICBpZiAoL14oPyFbIF17MCwzfT4pL20udGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgIHdyYXBwaW5nLndyYXAoY2h1bmtzLCBzZXR0aW5ncy5saW5lTGVuZ3RoIC0gMik7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXi9nbSwgJz4gJyk7XG4gICAgcmVwbGFjZUJsYW5rc0luVGFncyh0cnVlKTtcbiAgICBjaHVua3Muc2tpcCgpO1xuICB9IGVsc2Uge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL15bIF17MCwzfT4gPy9nbSwgJycpO1xuICAgIHdyYXBwaW5nLnVud3JhcChjaHVua3MpO1xuICAgIHJlcGxhY2VCbGFua3NJblRhZ3MoZmFsc2UpO1xuXG4gICAgaWYgKCEvXihcXG58XilbIF17MCwzfT4vLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikgJiYgY2h1bmtzLnN0YXJ0VGFnKSB7XG4gICAgICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3Muc3RhcnRUYWcucmVwbGFjZSgvXFxuezAsMn0kLywgJ1xcblxcbicpO1xuICAgIH1cblxuICAgIGlmICghLyhcXG58XilbIF17MCwzfT4uKiQvLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikgJiYgY2h1bmtzLmVuZFRhZykge1xuICAgICAgY2h1bmtzLmVuZFRhZyA9IGNodW5rcy5lbmRUYWcucmVwbGFjZSgvXlxcbnswLDJ9LywgJ1xcblxcbicpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghL1xcbi8udGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UocmxlYWRibGFua2xpbmUsIGxlYWRibGFua2xpbmVyZXBsYWNlcik7XG4gIH1cblxuICBmdW5jdGlvbiBuZXdsaW5lcmVwbGFjZXIgKGFsbCwgYmVmb3JlLCB0ZXh0LCBhZnRlcikge1xuICAgIGNodW5rcy5iZWZvcmUgKz0gYmVmb3JlO1xuICAgIGNodW5rcy5hZnRlciA9IGFmdGVyICsgY2h1bmtzLmFmdGVyO1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxibGFua2xpbmVyZXBsYWNlciAoYWxsLCBibGFuaykge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBibGFuayArIGNodW5rcy5zZWxlY3Rpb247IHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRibGFua2xpbmVyZXBsYWNlciAoYWxsLCBibGFua3MpIHtcbiAgICBjaHVua3Muc3RhcnRUYWcgKz0gYmxhbmtzOyByZXR1cm4gJyc7XG4gIH1cblxuICBmdW5jdGlvbiBiZWZvcmVQcm9jZXNzaW5nICgpIHtcbiAgICB2YXIgbGluZXMgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UoL1xcbiQvLCAnJykuc3BsaXQoJ1xcbicpO1xuICAgIHZhciBjaGFpbmVkID0gZmFsc2U7XG4gICAgdmFyIGdvb2Q7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBnb29kID0gZmFsc2U7XG4gICAgICBsaW5lID0gbGluZXNbaV07XG4gICAgICBjaGFpbmVkID0gY2hhaW5lZCAmJiBsaW5lLmxlbmd0aCA+IDA7XG4gICAgICBpZiAoL14+Ly50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGdvb2QgPSB0cnVlO1xuICAgICAgICBpZiAoIWNoYWluZWQgJiYgbGluZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY2hhaW5lZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoL15bIFxcdF0qJC8udGVzdChsaW5lKSkge1xuICAgICAgICBnb29kID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdvb2QgPSBjaGFpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKGdvb2QpIHtcbiAgICAgICAgbWF0Y2ggKz0gbGluZSArICdcXG4nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVmdE92ZXIgKz0gbWF0Y2ggKyBsaW5lO1xuICAgICAgICBtYXRjaCA9ICdcXG4nO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghLyhefFxcbik+Ly50ZXN0KG1hdGNoKSkge1xuICAgICAgbGVmdE92ZXIgKz0gbWF0Y2g7XG4gICAgICBtYXRjaCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZHRhZ3JlcGxhY2VyIChhbGwpIHtcbiAgICBjaHVua3MuZW5kVGFnID0gYWxsOyByZXR1cm4gJyc7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlQmxhbmtzSW5UYWdzIChicmFja2V0KSB7XG4gICAgdmFyIHJlcGxhY2VtZW50ID0gYnJhY2tldCA/ICc+ICcgOiAnJztcblxuICAgIGlmIChjaHVua3Muc3RhcnRUYWcpIHtcbiAgICAgIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5zdGFydFRhZy5yZXBsYWNlKHJ0cmFpbGJyYWNrZXQsIHJlcGxhY2VyKTtcbiAgICB9XG4gICAgaWYgKGNodW5rcy5lbmRUYWcpIHtcbiAgICAgIGNodW5rcy5lbmRUYWcgPSBjaHVua3MuZW5kVGFnLnJlcGxhY2UocmxlYWRicmFja2V0LCByZXBsYWNlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwbGFjZXIgKGFsbCwgbWFya2Rvd24pIHtcbiAgICAgIHJldHVybiAnXFxuJyArIG1hcmtkb3duLnJlcGxhY2UoL15bIF17MCwzfT4/WyBcXHRdKiQvZ20sIHJlcGxhY2VtZW50KSArICdcXG4nO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJsb2NrcXVvdGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBybGVhZGluZyA9IC9eKFxcKiopLztcbnZhciBydHJhaWxpbmcgPSAvKFxcKiokKS87XG52YXIgcnRyYWlsaW5nc3BhY2UgPSAvKFxccz8pJC87XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcblxuZnVuY3Rpb24gYm9sZE9ySXRhbGljIChjaHVua3MsIHR5cGUpIHtcbiAgdmFyIHJuZXdsaW5lcyA9IC9cXG57Mix9L2c7XG4gIHZhciBzdGFyQ291bnQgPSB0eXBlID09PSAnYm9sZCcgPyAyIDogMTtcblxuICBjaHVua3MudHJpbSgpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJuZXdsaW5lcywgJ1xcbicpO1xuXG4gIHZhciBtYXJrdXA7XG4gIHZhciBsZWFkU3RhcnMgPSBydHJhaWxpbmcuZXhlYyhjaHVua3MuYmVmb3JlKVswXTtcbiAgdmFyIHRyYWlsU3RhcnMgPSBybGVhZGluZy5leGVjKGNodW5rcy5hZnRlcilbMF07XG4gIHZhciBzdGFycyA9ICdcXFxcKnsnICsgc3RhckNvdW50ICsgJ30nO1xuICB2YXIgZmVuY2UgPSBNYXRoLm1pbihsZWFkU3RhcnMubGVuZ3RoLCB0cmFpbFN0YXJzLmxlbmd0aCk7XG4gIGlmIChmZW5jZSA+PSBzdGFyQ291bnQgJiYgKGZlbmNlICE9PSAyIHx8IHN0YXJDb3VudCAhPT0gMSkpIHtcbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKG5ldyBSZWdFeHAoc3RhcnMgKyAnJCcsICcnKSwgJycpO1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKG5ldyBSZWdFeHAoJ14nICsgc3RhcnMsICcnKSwgJycpO1xuICB9IGVsc2UgaWYgKCFjaHVua3Muc2VsZWN0aW9uICYmIHRyYWlsU3RhcnMpIHtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShybGVhZGluZywgJycpO1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocnRyYWlsaW5nc3BhY2UsICcnKSArIHRyYWlsU3RhcnMgKyBSZWdFeHAuJDE7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uICYmICF0cmFpbFN0YXJzKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnNbdHlwZV07XG4gICAgfVxuXG4gICAgbWFya3VwID0gc3RhckNvdW50ID09PSAxID8gJyonIDogJyoqJztcbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZSArIG1hcmt1cDtcbiAgICBjaHVua3MuYWZ0ZXIgPSBtYXJrdXAgKyBjaHVua3MuYWZ0ZXI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBib2xkT3JJdGFsaWM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHJ0ZXh0YmVmb3JlID0gL1xcU1sgXSokLztcbnZhciBydGV4dGFmdGVyID0gL15bIF0qXFxTLztcbnZhciBybmV3bGluZSA9IC9cXG4vO1xudmFyIHJiYWNrdGljayA9IC9gLztcbnZhciByZmVuY2ViZWZvcmUgPSAvYGBgW2Etel0qXFxuPyQvO1xudmFyIHJmZW5jZWJlZm9yZWluc2lkZSA9IC9eYGBgW2Etel0qXFxuLztcbnZhciByZmVuY2VhZnRlciA9IC9eXFxuP2BgYC87XG52YXIgcmZlbmNlYWZ0ZXJpbnNpZGUgPSAvXFxuYGBgJC87XG5cbmZ1bmN0aW9uIGNvZGVibG9jayAoY2h1bmtzLCBvcHRpb25zKSB7XG4gIHZhciBuZXdsaW5lZCA9IHJuZXdsaW5lLnRlc3QoY2h1bmtzLnNlbGVjdGlvbik7XG4gIHZhciB0cmFpbGluZyA9IHJ0ZXh0YWZ0ZXIudGVzdChjaHVua3MuYWZ0ZXIpO1xuICB2YXIgbGVhZGluZyA9IHJ0ZXh0YmVmb3JlLnRlc3QoY2h1bmtzLmJlZm9yZSk7XG4gIHZhciBvdXRmZW5jZWQgPSByZmVuY2ViZWZvcmUudGVzdChjaHVua3MuYmVmb3JlKSAmJiByZmVuY2VhZnRlci50ZXN0KGNodW5rcy5hZnRlcik7XG4gIGlmIChvdXRmZW5jZWQgfHwgbmV3bGluZWQgfHwgIShsZWFkaW5nIHx8IHRyYWlsaW5nKSkge1xuICAgIGJsb2NrKG91dGZlbmNlZCk7XG4gIH0gZWxzZSB7XG4gICAgaW5saW5lKCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbmxpbmUgKCkge1xuICAgIGNodW5rcy50cmltKCk7XG4gICAgY2h1bmtzLmZpbmRUYWdzKHJiYWNrdGljaywgcmJhY2t0aWNrKTtcblxuICAgIGlmICghY2h1bmtzLnN0YXJ0VGFnICYmICFjaHVua3MuZW5kVGFnKSB7XG4gICAgICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3MuZW5kVGFnID0gJ2AnO1xuICAgICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVycy5jb2RlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2h1bmtzLmVuZFRhZyAmJiAhY2h1bmtzLnN0YXJ0VGFnKSB7XG4gICAgICBjaHVua3MuYmVmb3JlICs9IGNodW5rcy5lbmRUYWc7XG4gICAgICBjaHVua3MuZW5kVGFnID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5lbmRUYWcgPSAnJztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBibG9jayAob3V0ZmVuY2VkKSB7XG4gICAgaWYgKG91dGZlbmNlZCkge1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShyZmVuY2ViZWZvcmUsICcnKTtcbiAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJmZW5jZWFmdGVyLCAnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZSgvWyBdezR9fGBgYFthLXpdKlxcbiQvLCBtZXJnZVNlbGVjdGlvbik7XG4gICAgY2h1bmtzLnNraXAoe1xuICAgICAgYmVmb3JlOiAvKFxcbnxeKShcXHR8WyBdezQsfXxgYGBbYS16XSpcXG4pLipcXG4kLy50ZXN0KGNodW5rcy5iZWZvcmUpID8gMCA6IDEsXG4gICAgICBhZnRlcjogL15cXG4oXFx0fFsgXXs0LH18XFxuYGBgKS8udGVzdChjaHVua3MuYWZ0ZXIpID8gMCA6IDFcbiAgICB9KTtcblxuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgaWYgKG9wdGlvbnMuZmVuY2luZykge1xuICAgICAgICBjaHVua3Muc3RhcnRUYWcgPSAnYGBgXFxuJztcbiAgICAgICAgY2h1bmtzLmVuZFRhZyA9ICdcXG5gYGAnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gJyAgICAnO1xuICAgICAgfVxuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmNvZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZmVuY2ViZWZvcmVpbnNpZGUudGVzdChjaHVua3Muc2VsZWN0aW9uKSAmJiByZmVuY2VhZnRlcmluc2lkZS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pKSB7XG4gICAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoLyheYGBgW2Etel0qXFxuKXwoYGBgJCkvZywgJycpO1xuICAgICAgfSBlbHNlIGlmICgvXlsgXXswLDN9XFxTL20udGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgICAgICBpZiAob3B0aW9ucy5mZW5jaW5nKSB7XG4gICAgICAgICAgY2h1bmtzLmJlZm9yZSArPSAnYGBgXFxuJztcbiAgICAgICAgICBjaHVua3MuYWZ0ZXIgPSAnXFxuYGBgJyArIGNodW5rcy5hZnRlcjtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdsaW5lZCkge1xuICAgICAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL14vZ20sICcgICAgJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2h1bmtzLmJlZm9yZSArPSAnICAgICc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL14oPzpbIF17NH18WyBdezAsM31cXHR8YGBgW2Etel0qKS9nbSwgJycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lcmdlU2VsZWN0aW9uIChhbGwpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBhbGwgKyBjaHVua3Muc2VsZWN0aW9uOyByZXR1cm4gJyc7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29kZWJsb2NrO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWFueSA9IHJlcXVpcmUoJy4uL21hbnknKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xuXG5mdW5jdGlvbiBoZWFkaW5nIChjaHVua3MpIHtcbiAgdmFyIGxldmVsID0gMDtcblxuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvblxuICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAucmVwbGFjZSgvKF5cXHMrfFxccyskKS9nLCAnJyk7XG5cbiAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgY2h1bmtzLnN0YXJ0VGFnID0gJyMgJztcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMuaGVhZGluZztcbiAgICBjaHVua3MuZW5kVGFnID0gJyc7XG4gICAgY2h1bmtzLnNraXAoeyBiZWZvcmU6IDEsIGFmdGVyOiAxIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNodW5rcy5maW5kVGFncygvIytbIF0qLywgL1sgXSojKy8pO1xuXG4gIGlmICgvIysvLnRlc3QoY2h1bmtzLnN0YXJ0VGFnKSkge1xuICAgIGxldmVsID0gUmVnRXhwLmxhc3RNYXRjaC5sZW5ndGg7XG4gIH1cblxuICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3MuZW5kVGFnID0gJyc7XG4gIGNodW5rcy5maW5kVGFncyhudWxsLCAvXFxzPygtK3w9KykvKTtcblxuICBpZiAoLz0rLy50ZXN0KGNodW5rcy5lbmRUYWcpKSB7XG4gICAgbGV2ZWwgPSAxO1xuICB9XG5cbiAgaWYgKC8tKy8udGVzdChjaHVua3MuZW5kVGFnKSkge1xuICAgIGxldmVsID0gMjtcbiAgfVxuXG4gIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5lbmRUYWcgPSAnJztcbiAgY2h1bmtzLnNraXAoeyBiZWZvcmU6IDEsIGFmdGVyOiAxIH0pO1xuXG4gIHZhciBsZXZlbFRvQ3JlYXRlID0gbGV2ZWwgPCAyID8gNCA6IGxldmVsIC0gMTtcbiAgaWYgKGxldmVsVG9DcmVhdGUgPiAwKSB7XG4gICAgY2h1bmtzLnN0YXJ0VGFnID0gbWFueSgnIycsIGxldmVsVG9DcmVhdGUpICsgJyAnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGVhZGluZztcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaHIgKGNodW5rcykge1xuICBjaHVua3Muc3RhcnRUYWcgPSAnLS0tLS0tLS0tLVxcbic7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSAnJztcbiAgY2h1bmtzLnNraXAoeyBsZWZ0OiAyLCByaWdodDogMSwgYW55OiB0cnVlIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb25jZSA9IHJlcXVpcmUoJy4uL29uY2UnKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHBhcnNlTGlua0lucHV0ID0gcmVxdWlyZSgnLi4vY2h1bmtzL3BhcnNlTGlua0lucHV0Jyk7XG52YXIgcmRlZmluaXRpb25zID0gL15bIF17MCwzfVxcWygoPzphdHRhY2htZW50LSk/XFxkKylcXF06WyBcXHRdKlxcbj9bIFxcdF0qPD8oXFxTKz8pPj9bIFxcdF0qXFxuP1sgXFx0XSooPzooXFxuKilbXCIoXSguKz8pW1wiKV1bIFxcdF0qKT8oPzpcXG4rfCQpL2dtO1xudmFyIHJhdHRhY2htZW50ID0gL15hdHRhY2htZW50LShcXGQrKSQvaTtcblxuZnVuY3Rpb24gZXh0cmFjdERlZmluaXRpb25zICh0ZXh0LCBkZWZpbml0aW9ucykge1xuICByZGVmaW5pdGlvbnMubGFzdEluZGV4ID0gMDtcbiAgcmV0dXJuIHRleHQucmVwbGFjZShyZGVmaW5pdGlvbnMsIHJlcGxhY2VyKTtcblxuICBmdW5jdGlvbiByZXBsYWNlciAoYWxsLCBpZCwgbGluaywgbmV3bGluZXMsIHRpdGxlKSB7XG4gICAgZGVmaW5pdGlvbnNbaWRdID0gYWxsLnJlcGxhY2UoL1xccyokLywgJycpO1xuICAgIGlmIChuZXdsaW5lcykge1xuICAgICAgZGVmaW5pdGlvbnNbaWRdID0gYWxsLnJlcGxhY2UoL1tcIihdKC4rPylbXCIpXSQvLCAnJyk7XG4gICAgICByZXR1cm4gbmV3bGluZXMgKyB0aXRsZTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1c2hEZWZpbml0aW9uIChjaHVua3MsIGRlZmluaXRpb24sIGF0dGFjaG1lbnQpIHtcbiAgdmFyIHJlZ2V4ID0gLyhcXFspKCg/OlxcW1teXFxdXSpcXF18W15cXFtcXF1dKSopKFxcXVsgXT8oPzpcXG5bIF0qKT9cXFspKCg/OmF0dGFjaG1lbnQtKT9cXGQrKShcXF0pL2c7XG4gIHZhciBhbmNob3IgPSAwO1xuICB2YXIgZGVmaW5pdGlvbnMgPSB7fTtcbiAgdmFyIGZvb3Rub3RlcyA9IFtdO1xuXG4gIGNodW5rcy5iZWZvcmUgPSBleHRyYWN0RGVmaW5pdGlvbnMoY2h1bmtzLmJlZm9yZSwgZGVmaW5pdGlvbnMpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gZXh0cmFjdERlZmluaXRpb25zKGNodW5rcy5zZWxlY3Rpb24sIGRlZmluaXRpb25zKTtcbiAgY2h1bmtzLmFmdGVyID0gZXh0cmFjdERlZmluaXRpb25zKGNodW5rcy5hZnRlciwgZGVmaW5pdGlvbnMpO1xuICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJlZ2V4LCBnZXRMaW5rKTtcblxuICBpZiAoZGVmaW5pdGlvbikge1xuICAgIGlmICghYXR0YWNobWVudCkgeyBwdXNoQW5jaG9yKGRlZmluaXRpb24pOyB9XG4gIH0gZWxzZSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShyZWdleCwgZ2V0TGluayk7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gYW5jaG9yO1xuXG4gIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJlZ2V4LCBnZXRMaW5rKTtcblxuICBpZiAoY2h1bmtzLmFmdGVyKSB7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UoL1xcbiokLywgJycpO1xuICB9XG4gIGlmICghY2h1bmtzLmFmdGVyKSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXFxuKiQvLCAnJyk7XG4gIH1cblxuICBhbmNob3IgPSAwO1xuICBPYmplY3Qua2V5cyhkZWZpbml0aW9ucykuZm9yRWFjaChwdXNoQXR0YWNobWVudHMpO1xuXG4gIGlmIChhdHRhY2htZW50KSB7XG4gICAgcHVzaEFuY2hvcihkZWZpbml0aW9uKTtcbiAgfVxuICBjaHVua3MuYWZ0ZXIgKz0gJ1xcblxcbicgKyBmb290bm90ZXMuam9pbignXFxuJyk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcblxuICBmdW5jdGlvbiBwdXNoQXR0YWNobWVudHMgKGRlZmluaXRpb24pIHtcbiAgICBpZiAocmF0dGFjaG1lbnQudGVzdChkZWZpbml0aW9uKSkge1xuICAgICAgcHVzaEFuY2hvcihkZWZpbml0aW9uc1tkZWZpbml0aW9uXSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHVzaEFuY2hvciAoZGVmaW5pdGlvbikge1xuICAgIGFuY2hvcisrO1xuICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uLnJlcGxhY2UoL15bIF17MCwzfVxcWyhhdHRhY2htZW50LSk/KFxcZCspXFxdOi8sICcgIFskMScgKyBhbmNob3IgKyAnXTonKTtcbiAgICBmb290bm90ZXMucHVzaChkZWZpbml0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExpbmsgKGFsbCwgYmVmb3JlLCBpbm5lciwgYWZ0ZXJJbm5lciwgZGVmaW5pdGlvbiwgZW5kKSB7XG4gICAgaW5uZXIgPSBpbm5lci5yZXBsYWNlKHJlZ2V4LCBnZXRMaW5rKTtcbiAgICBpZiAoZGVmaW5pdGlvbnNbZGVmaW5pdGlvbl0pIHtcbiAgICAgIHB1c2hBbmNob3IoZGVmaW5pdGlvbnNbZGVmaW5pdGlvbl0pO1xuICAgICAgcmV0dXJuIGJlZm9yZSArIGlubmVyICsgYWZ0ZXJJbm5lciArIGFuY2hvciArIGVuZDtcbiAgICB9XG4gICAgcmV0dXJuIGFsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBsaW5rT3JJbWFnZU9yQXR0YWNobWVudCAoY2h1bmtzLCBvcHRpb25zKSB7XG4gIHZhciB0eXBlID0gb3B0aW9ucy50eXBlO1xuICB2YXIgaW1hZ2UgPSB0eXBlID09PSAnaW1hZ2UnO1xuICB2YXIgcmVzdW1lO1xuXG4gIGNodW5rcy50cmltKCk7XG4gIGNodW5rcy5maW5kVGFncygvXFxzKiE/XFxbLywgL1xcXVsgXT8oPzpcXG5bIF0qKT8oXFxbLio/XFxdKT8vKTtcblxuICBpZiAoY2h1bmtzLmVuZFRhZy5sZW5ndGggPiAxICYmIGNodW5rcy5zdGFydFRhZy5sZW5ndGggPiAwKSB7XG4gICAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLnN0YXJ0VGFnLnJlcGxhY2UoLyE/XFxbLywgJycpO1xuICAgIGNodW5rcy5lbmRUYWcgPSAnJztcbiAgICBwdXNoRGVmaW5pdGlvbihjaHVua3MpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc3RhcnRUYWcgKyBjaHVua3Muc2VsZWN0aW9uICsgY2h1bmtzLmVuZFRhZztcbiAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLmVuZFRhZyA9ICcnO1xuXG4gIGlmICgvXFxuXFxuLy50ZXN0KGNodW5rcy5zZWxlY3Rpb24pKSB7XG4gICAgcHVzaERlZmluaXRpb24oY2h1bmtzKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcmVzdW1lID0gdGhpcy5hc3luYygpO1xuXG4gIG9wdGlvbnMucHJvbXB0cy5jbG9zZSgpO1xuICAob3B0aW9ucy5wcm9tcHRzW3R5cGVdIHx8IG9wdGlvbnMucHJvbXB0cy5saW5rKShvcHRpb25zLCBvbmNlKHJlc29sdmVkKSk7XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZWQgKHJlc3VsdCkge1xuICAgIHZhciBsaW5rID0gcGFyc2VMaW5rSW5wdXQocmVzdWx0LmRlZmluaXRpb24pO1xuICAgIGlmIChsaW5rLmhyZWYubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXN1bWUoKTsgcmV0dXJuO1xuICAgIH1cblxuICAgIGNodW5rcy5zZWxlY3Rpb24gPSAoJyAnICsgY2h1bmtzLnNlbGVjdGlvbikucmVwbGFjZSgvKFteXFxcXF0oPzpcXFxcXFxcXCkqKSg/PVtbXFxdXSkvZywgJyQxXFxcXCcpLnN1YnN0cigxKTtcblxuICAgIHZhciBrZXkgPSByZXN1bHQuYXR0YWNobWVudCA/ICcgIFthdHRhY2htZW50LTk5OTldOiAnIDogJyBbOTk5OV06ICc7XG4gICAgdmFyIGRlZmluaXRpb24gPSBrZXkgKyBsaW5rLmhyZWYgKyAobGluay50aXRsZSA/ICcgXCInICsgbGluay50aXRsZSArICdcIicgOiAnJyk7XG4gICAgdmFyIGFuY2hvciA9IHB1c2hEZWZpbml0aW9uKGNodW5rcywgZGVmaW5pdGlvbiwgcmVzdWx0LmF0dGFjaG1lbnQpO1xuXG4gICAgaWYgKCFyZXN1bHQuYXR0YWNobWVudCkge1xuICAgICAgYWRkKCk7XG4gICAgfVxuXG4gICAgcmVzdW1lKCk7XG5cbiAgICBmdW5jdGlvbiBhZGQgKCkge1xuICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gaW1hZ2UgPyAnIVsnIDogJ1snO1xuICAgICAgY2h1bmtzLmVuZFRhZyA9ICddWycgKyBhbmNob3IgKyAnXSc7XG5cbiAgICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnNbdHlwZV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlua09ySW1hZ2VPckF0dGFjaG1lbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYW55ID0gcmVxdWlyZSgnLi4vbWFueScpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgd3JhcHBpbmcgPSByZXF1aXJlKCcuL3dyYXBwaW5nJyk7XG52YXIgc2V0dGluZ3MgPSByZXF1aXJlKCcuL3NldHRpbmdzJyk7XG52YXIgcnByZXZpb3VzID0gLyhcXG58XikoKFsgXXswLDN9KFsqKy1dfFxcZCtbLl0pWyBcXHRdKy4qKShcXG4uK3xcXG57Mix9KFsqKy1dLip8XFxkK1suXSlbIFxcdF0rLip8XFxuezIsfVsgXFx0XStcXFMuKikqKVxcbiokLztcbnZhciBybmV4dCA9IC9eXFxuKigoWyBdezAsM30oWyorLV18XFxkK1suXSlbIFxcdF0rLiopKFxcbi4rfFxcbnsyLH0oWyorLV0uKnxcXGQrWy5dKVsgXFx0XSsuKnxcXG57Mix9WyBcXHRdK1xcUy4qKSopXFxuKi87XG52YXIgcmJ1bGxldHR5cGUgPSAvXlxccyooWyorLV0pLztcbnZhciByc2tpcHBlciA9IC9bXlxcbl1cXG5cXG5bXlxcbl0vO1xuXG5mdW5jdGlvbiBwYWQgKHRleHQpIHtcbiAgcmV0dXJuICcgJyArIHRleHQgKyAnICc7XG59XG5cbmZ1bmN0aW9uIGxpc3QgKGNodW5rcywgb3JkZXJlZCkge1xuICB2YXIgYnVsbGV0ID0gJy0nO1xuICB2YXIgbnVtID0gMTtcbiAgdmFyIGRpZ2l0YWw7XG4gIHZhciBiZWZvcmVTa2lwID0gMTtcbiAgdmFyIGFmdGVyU2tpcCA9IDE7XG5cbiAgY2h1bmtzLmZpbmRUYWdzKC8oXFxufF4pKlsgXXswLDN9KFsqKy1dfFxcZCtbLl0pXFxzKy8sIG51bGwpO1xuXG4gIGlmIChjaHVua3MuYmVmb3JlICYmICEvXFxuJC8udGVzdChjaHVua3MuYmVmb3JlKSAmJiAhL15cXG4vLnRlc3QoY2h1bmtzLnN0YXJ0VGFnKSkge1xuICAgIGNodW5rcy5iZWZvcmUgKz0gY2h1bmtzLnN0YXJ0VGFnO1xuICAgIGNodW5rcy5zdGFydFRhZyA9ICcnO1xuICB9XG5cbiAgaWYgKGNodW5rcy5zdGFydFRhZykge1xuICAgIGRpZ2l0YWwgPSAvXFxkK1suXS8udGVzdChjaHVua3Muc3RhcnRUYWcpO1xuICAgIGNodW5rcy5zdGFydFRhZyA9ICcnO1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL1xcblsgXXs0fS9nLCAnXFxuJyk7XG4gICAgd3JhcHBpbmcudW53cmFwKGNodW5rcyk7XG4gICAgY2h1bmtzLnNraXAoKTtcblxuICAgIGlmIChkaWdpdGFsKSB7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShybmV4dCwgZ2V0UHJlZml4ZWRJdGVtKTtcbiAgICB9XG4gICAgaWYgKG9yZGVyZWQgPT09IGRpZ2l0YWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJwcmV2aW91cywgYmVmb3JlUmVwbGFjZXIpO1xuXG4gIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVycy5saXN0aXRlbTtcbiAgfVxuXG4gIHZhciBwcmVmaXggPSBuZXh0QnVsbGV0KCk7XG4gIHZhciBzcGFjZXMgPSBtYW55KCcgJywgcHJlZml4Lmxlbmd0aCk7XG5cbiAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2Uocm5leHQsIGFmdGVyUmVwbGFjZXIpO1xuICBjaHVua3MudHJpbSh0cnVlKTtcbiAgY2h1bmtzLnNraXAoeyBiZWZvcmU6IGJlZm9yZVNraXAsIGFmdGVyOiBhZnRlclNraXAsIGFueTogdHJ1ZSB9KTtcbiAgY2h1bmtzLnN0YXJ0VGFnID0gcHJlZml4O1xuICB3cmFwcGluZy53cmFwKGNodW5rcywgc2V0dGluZ3MubGluZUxlbmd0aCAtIHByZWZpeC5sZW5ndGgpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9cXG4vZywgJ1xcbicgKyBzcGFjZXMpO1xuXG4gIGZ1bmN0aW9uIGJlZm9yZVJlcGxhY2VyICh0ZXh0KSB7XG4gICAgaWYgKHJidWxsZXR0eXBlLnRlc3QodGV4dCkpIHtcbiAgICAgIGJ1bGxldCA9IFJlZ0V4cC4kMTtcbiAgICB9XG4gICAgYmVmb3JlU2tpcCA9IHJza2lwcGVyLnRlc3QodGV4dCkgPyAxIDogMDtcbiAgICByZXR1cm4gZ2V0UHJlZml4ZWRJdGVtKHRleHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWZ0ZXJSZXBsYWNlciAodGV4dCkge1xuICAgIGFmdGVyU2tpcCA9IHJza2lwcGVyLnRlc3QodGV4dCkgPyAxIDogMDtcbiAgICByZXR1cm4gZ2V0UHJlZml4ZWRJdGVtKHRleHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbmV4dEJ1bGxldCAoKSB7XG4gICAgaWYgKG9yZGVyZWQpIHtcbiAgICAgIHJldHVybiBwYWQoKG51bSsrKSArICcuJyk7XG4gICAgfVxuICAgIHJldHVybiBwYWQoYnVsbGV0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFByZWZpeGVkSXRlbSAodGV4dCkge1xuICAgIHZhciBybWFya2VycyA9IC9eWyBdezAsM30oWyorLV18XFxkK1suXSlcXHMvZ207XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShybWFya2VycywgbmV4dEJ1bGxldCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbGluZUxlbmd0aDogNzJcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBwcmVmaXhlcyA9ICcoPzpcXFxcc3s0LH18XFxcXHMqPnxcXFxccyotXFxcXHMrfFxcXFxzKlxcXFxkK1xcXFwufD18XFxcXCt8LXxffFxcXFwqfCN8XFxcXHMqXFxcXFtbXlxcbl1dK1xcXFxdOiknO1xudmFyIHJsZWFkaW5ncHJlZml4ZXMgPSBuZXcgUmVnRXhwKCdeJyArIHByZWZpeGVzLCAnJyk7XG52YXIgcnRleHQgPSBuZXcgUmVnRXhwKCcoW15cXFxcbl0pXFxcXG4oPyEoXFxcXG58JyArIHByZWZpeGVzICsgJykpJywgJ2cnKTtcbnZhciBydHJhaWxpbmdzcGFjZXMgPSAvXFxzKyQvO1xuXG5mdW5jdGlvbiB3cmFwIChjaHVua3MsIGxlbikge1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCcoLnsxLCcgKyBsZW4gKyAnfSkoICt8JFxcXFxuPyknLCAnZ20nKTtcblxuICB1bndyYXAoY2h1bmtzKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb25cbiAgICAucmVwbGFjZShyZWdleCwgcmVwbGFjZXIpXG4gICAgLnJlcGxhY2UocnRyYWlsaW5nc3BhY2VzLCAnJyk7XG5cbiAgZnVuY3Rpb24gcmVwbGFjZXIgKGxpbmUsIG1hcmtlZCkge1xuICAgIHJldHVybiBybGVhZGluZ3ByZWZpeGVzLnRlc3QobGluZSkgPyBsaW5lIDogbWFya2VkICsgJ1xcbic7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW53cmFwIChjaHVua3MpIHtcbiAgcnRleHQubGFzdEluZGV4ID0gMDtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShydGV4dCwgJyQxICQyJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB3cmFwOiB3cmFwLFxuICB1bndyYXA6IHVud3JhcFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGRpc3Bvc2VkO1xuICByZXR1cm4gZnVuY3Rpb24gZGlzcG9zYWJsZSAoKSB7XG4gICAgaWYgKGRpc3Bvc2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvbmNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZG9jdW1lbnQ7XG5cbmZ1bmN0aW9uIGhvbWVicmV3UVNBIChjbGFzc05hbWUpIHtcbiAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgdmFyIGFsbCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpO1xuICB2YXIgaTtcbiAgZm9yIChpIGluIGFsbCkge1xuICAgIGlmICh3cmFwKGFsbFtpXS5jbGFzc05hbWUpLmluZGV4T2Yod3JhcChjbGFzc05hbWUpKSAhPT0gLTEpIHtcbiAgICAgIHJlc3VsdHMucHVzaChhbGxbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gd3JhcCAodGV4dCkge1xuICByZXR1cm4gJyAnICsgdGV4dCArICcgJztcbn1cblxuZnVuY3Rpb24gY2xvc2VQcm9tcHRzICgpIHtcbiAgaWYgKGRvYy5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICByZW1vdmUoZG9jLmJvZHkucXVlcnlTZWxlY3RvckFsbCgnLndrLXByb21wdCcpKTtcbiAgfSBlbHNlIHtcbiAgICByZW1vdmUoaG9tZWJyZXdRU0EoJ3drLXByb21wdCcpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUgKHByb21wdHMpIHtcbiAgdmFyIGxlbiA9IHByb21wdHMubGVuZ3RoO1xuICB2YXIgaTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgcHJvbXB0c1tpXS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHByb21wdHNbaV0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvc2VQcm9tcHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgcmVuZGVyID0gcmVxdWlyZSgnLi9yZW5kZXInKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi4vY2xhc3NlcycpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgdXBsb2FkcyA9IHJlcXVpcmUoJy4uL3VwbG9hZHMnKTtcbnZhciBFTlRFUl9LRVkgPSAxMztcbnZhciBFU0NBUEVfS0VZID0gMjc7XG52YXIgZHJhZ0NsYXNzID0gJ3drLWRyYWdnaW5nJztcbnZhciBkcmFnQ2xhc3NTcGVjaWZpYyA9ICd3ay1wcm9tcHQtdXBsb2FkLWRyYWdnaW5nJztcbnZhciByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5mdW5jdGlvbiBhbHdheXMgKCkge1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY2xhc3NpZnkgKGdyb3VwLCBjbGFzc2VzKSB7XG4gIE9iamVjdC5rZXlzKGdyb3VwKS5mb3JFYWNoKGN1c3RvbWl6ZSk7XG4gIGZ1bmN0aW9uIGN1c3RvbWl6ZSAoa2V5KSB7XG4gICAgaWYgKGNsYXNzZXNba2V5XSkge1xuICAgICAgZ3JvdXBba2V5XS5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3Nlc1trZXldO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9tcHQgKG9wdGlvbnMsIGRvbmUpIHtcbiAgdmFyIHRleHQgPSBzdHJpbmdzLnByb21wdHNbb3B0aW9ucy50eXBlXTtcbiAgdmFyIGRvbSA9IHJlbmRlcih7XG4gICAgaWQ6ICd3ay1wcm9tcHQtJyArIG9wdGlvbnMudHlwZSxcbiAgICB0aXRsZTogdGV4dC50aXRsZSxcbiAgICBkZXNjcmlwdGlvbjogdGV4dC5kZXNjcmlwdGlvbixcbiAgICBwbGFjZWhvbGRlcjogdGV4dC5wbGFjZWhvbGRlclxuICB9KTtcbiAgdmFyIGRvbXVwO1xuXG4gIGNyb3NzdmVudC5hZGQoZG9tLmNhbmNlbCwgJ2NsaWNrJywgcmVtb3ZlKTtcbiAgY3Jvc3N2ZW50LmFkZChkb20uY2xvc2UsICdjbGljaycsIHJlbW92ZSk7XG4gIGNyb3NzdmVudC5hZGQoZG9tLm9rLCAnY2xpY2snLCBvayk7XG4gIGNyb3NzdmVudC5hZGQoZG9tLmlucHV0LCAna2V5cHJlc3MnLCBlbnRlcik7XG4gIGNyb3NzdmVudC5hZGQoZG9tLmRpYWxvZywgJ2tleWRvd24nLCBlc2MpO1xuICBjbGFzc2lmeShkb20sIG9wdGlvbnMuY2xhc3Nlcy5wcm9tcHRzKTtcblxuICB2YXIgeGhyID0gb3B0aW9ucy54aHI7XG4gIHZhciB1cGxvYWQgPSBvcHRpb25zLnVwbG9hZDtcbiAgaWYgKHR5cGVvZiB1cGxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgdXBsb2FkID0geyB1cmw6IHVwbG9hZCB9O1xuICB9XG4gIGlmICh1cGxvYWQpIHtcbiAgICBhcnJhbmdlVXBsb2FkcygpO1xuICB9XG4gIGlmIChvcHRpb25zLmF1dG9VcGxvYWQpIHtcbiAgICBzdWJtaXQob3B0aW9ucy5hdXRvVXBsb2FkKTtcbiAgfVxuXG4gIHNldFRpbWVvdXQoZm9jdXNEaWFsb2csIDApO1xuXG4gIGZ1bmN0aW9uIGZvY3VzRGlhbG9nICgpIHtcbiAgICBkb20uaW5wdXQuZm9jdXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVudGVyIChlKSB7XG4gICAgdmFyIGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmIChrZXkgPT09IEVOVEVSX0tFWSkge1xuICAgICAgb2soKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlc2MgKGUpIHtcbiAgICB2YXIga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYgKGtleSA9PT0gRVNDQVBFX0tFWSkge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb2sgKCkge1xuICAgIHJlbW92ZSgpO1xuICAgIGRvbmUoeyBkZWZpbml0aW9uOiBkb20uaW5wdXQudmFsdWUgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmUgKCkge1xuICAgIGlmICh1cGxvYWQpIHsgYmluZFVwbG9hZEV2ZW50cyh0cnVlKTsgfVxuICAgIGlmIChkb20uZGlhbG9nLnBhcmVudEVsZW1lbnQpIHsgZG9tLmRpYWxvZy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGRvbS5kaWFsb2cpOyB9XG4gICAgb3B0aW9ucy5zdXJmYWNlLmZvY3VzKG9wdGlvbnMubW9kZSk7XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kVXBsb2FkRXZlbnRzIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0ocm9vdCwgJ2RyYWdlbnRlcicsIGRyYWdnaW5nKTtcbiAgICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdkcmFnZW5kJywgZHJhZ3N0b3ApO1xuICAgIGNyb3NzdmVudFtvcF0ocm9vdCwgJ21vdXNlb3V0JywgZHJhZ3N0b3ApO1xuICB9XG5cbiAgZnVuY3Rpb24gd2FybiAoKSB7XG4gICAgY2xhc3Nlcy5hZGQoZG9tdXAud2FybmluZywgJ3drLXByb21wdC1lcnJvci1zaG93Jyk7XG4gIH1cbiAgZnVuY3Rpb24gZHJhZ2dpbmcgKCkge1xuICAgIGNsYXNzZXMuYWRkKGRvbXVwLmFyZWEsIGRyYWdDbGFzcyk7XG4gICAgY2xhc3Nlcy5hZGQoZG9tdXAuYXJlYSwgZHJhZ0NsYXNzU3BlY2lmaWMpO1xuICB9XG4gIGZ1bmN0aW9uIGRyYWdzdG9wICgpIHtcbiAgICBjbGFzc2VzLnJtKGRvbXVwLmFyZWEsIGRyYWdDbGFzcyk7XG4gICAgY2xhc3Nlcy5ybShkb211cC5hcmVhLCBkcmFnQ2xhc3NTcGVjaWZpYyk7XG4gICAgdXBsb2Fkcy5zdG9wKG9wdGlvbnMuc3VyZmFjZS5kcm9wYXJlYSk7XG4gIH1cblxuICBmdW5jdGlvbiBhcnJhbmdlVXBsb2FkcyAoKSB7XG4gICAgZG9tdXAgPSByZW5kZXIudXBsb2Fkcyhkb20sIHN0cmluZ3MucHJvbXB0cy50eXBlcyArICh1cGxvYWQucmVzdHJpY3Rpb24gfHwgb3B0aW9ucy50eXBlICsgJ3MnKSk7XG4gICAgYmluZFVwbG9hZEV2ZW50cygpO1xuXG4gICAgY3Jvc3N2ZW50LmFkZChkb211cC5maWxlaW5wdXQsICdjaGFuZ2UnLCBoYW5kbGVDaGFuZ2UsIGZhbHNlKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGRvbXVwLmFyZWEsICdkcmFnb3ZlcicsIGhhbmRsZURyYWdPdmVyLCBmYWxzZSk7XG4gICAgY3Jvc3N2ZW50LmFkZChkb211cC5hcmVhLCAnZHJvcCcsIGhhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcbiAgICBjbGFzc2lmeShkb211cCwgb3B0aW9ucy5jbGFzc2VzLnByb21wdHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ2hhbmdlIChlKSB7XG4gICAgc3RvcChlKTtcbiAgICBzdWJtaXQoZG9tdXAuZmlsZWlucHV0LmZpbGVzKTtcbiAgICBkb211cC5maWxlaW5wdXQudmFsdWUgPSAnJztcbiAgICBkb211cC5maWxlaW5wdXQudmFsdWUgPSBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIgKGUpIHtcbiAgICBzdG9wKGUpO1xuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVGaWxlU2VsZWN0IChlKSB7XG4gICAgZHJhZ3N0b3AoKTtcbiAgICBzdG9wKGUpO1xuICAgIHN1Ym1pdChlLmRhdGFUcmFuc2Zlci5maWxlcyk7XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZCAoZmlsZXMpIHtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICgodXBsb2FkLnZhbGlkYXRlIHx8IGFsd2F5cykoZmlsZXNbaV0pKSB7XG4gICAgICAgIHJldHVybiBmaWxlc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2FybigpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3VibWl0IChmaWxlcykge1xuICAgIGNsYXNzZXMucm0oZG9tdXAuZmFpbGVkLCAnd2stcHJvbXB0LWVycm9yLXNob3cnKTtcbiAgICBjbGFzc2VzLnJtKGRvbXVwLndhcm5pbmcsICd3ay1wcm9tcHQtZXJyb3Itc2hvdycpO1xuICAgIHZhciBmaWxlID0gdmFsaWQoZmlsZXMpO1xuICAgIGlmICghZmlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIHZhciByZXEgPSB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIG1ldGhvZDogdXBsb2FkLm1ldGhvZCB8fCAnUFVUJyxcbiAgICAgIHVybDogdXBsb2FkLnVybCxcbiAgICAgIGJvZHk6IGZvcm1cbiAgICB9O1xuXG4gICAgZm9ybS5hcHBlbmQodXBsb2FkLmtleSB8fCAnd29vZm1hcmtfdXBsb2FkJywgZmlsZSwgZmlsZS5uYW1lKTtcbiAgICBjbGFzc2VzLmFkZChkb211cC5hcmVhLCAnd2stcHJvbXB0LXVwbG9hZGluZycpO1xuICAgIHhocihyZXEsIGhhbmRsZVJlc3BvbnNlKTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlIChlcnIsIHJlcywgYm9keSkge1xuICAgICAgY2xhc3Nlcy5ybShkb211cC5hcmVhLCAnd2stcHJvbXB0LXVwbG9hZGluZycpO1xuICAgICAgaWYgKGVyciB8fCByZXMuc3RhdHVzQ29kZSA8IDIwMCB8fCByZXMuc3RhdHVzQ29kZSA+IDI5OSkge1xuICAgICAgICBjbGFzc2VzLmFkZChkb211cC5mYWlsZWQsICd3ay1wcm9tcHQtZXJyb3Itc2hvdycpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkb20uaW5wdXQudmFsdWUgPSBib2R5LmhyZWYgKyAnIFwiJyArIGJvZHkudGl0bGUgKyAnXCInO1xuICAgICAgcmVtb3ZlKCk7XG4gICAgICBkb25lKHsgZGVmaW5pdGlvbjogZG9tLmlucHV0LnZhbHVlLCBhdHRhY2htZW50OiBvcHRpb25zLnR5cGUgPT09ICdhdHRhY2htZW50JyB9KTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcm9tcHQ7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBnZXRUZXh0ID0gcmVxdWlyZSgnLi4vZ2V0VGV4dCcpO1xudmFyIHNldFRleHQgPSByZXF1aXJlKCcuLi9zZXRUZXh0Jyk7XG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4uL2NsYXNzZXMnKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIGFjID0gJ2FwcGVuZENoaWxkJztcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG5cbmZ1bmN0aW9uIGUgKHR5cGUsIGNscywgdGV4dCkge1xuICB2YXIgZWwgPSBkb2MuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgZWwuY2xhc3NOYW1lID0gY2xzO1xuICBpZiAodGV4dCkge1xuICAgIHNldFRleHQoZWwsIHRleHQpO1xuICB9XG4gIHJldHVybiBlbDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyIChvcHRpb25zKSB7XG4gIHZhciBkb20gPSB7XG4gICAgZGlhbG9nOiBlKCdhcnRpY2xlJywgJ3drLXByb21wdCAnICsgb3B0aW9ucy5pZCksXG4gICAgY2xvc2U6IGUoJ2EnLCAnd2stcHJvbXB0LWNsb3NlJyksXG4gICAgaGVhZGVyOiBlKCdoZWFkZXInLCAnd2stcHJvbXB0LWhlYWRlcicpLFxuICAgIGgxOiBlKCdoMScsICd3ay1wcm9tcHQtdGl0bGUnLCBvcHRpb25zLnRpdGxlKSxcbiAgICBzZWN0aW9uOiBlKCdzZWN0aW9uJywgJ3drLXByb21wdC1ib2R5JyksXG4gICAgZGVzYzogZSgncCcsICd3ay1wcm9tcHQtZGVzY3JpcHRpb24nLCBvcHRpb25zLmRlc2NyaXB0aW9uKSxcbiAgICBpbnB1dENvbnRhaW5lcjogZSgnZGl2JywgJ3drLXByb21wdC1pbnB1dC1jb250YWluZXInKSxcbiAgICBpbnB1dDogZSgnaW5wdXQnLCAnd2stcHJvbXB0LWlucHV0JyksXG4gICAgY2FuY2VsOiBlKCdidXR0b24nLCAnd2stcHJvbXB0LWNhbmNlbCcsICdDYW5jZWwnKSxcbiAgICBvazogZSgnYnV0dG9uJywgJ3drLXByb21wdC1vaycsICdPaycpLFxuICAgIGZvb3RlcjogZSgnZm9vdGVyJywgJ3drLXByb21wdC1idXR0b25zJylcbiAgfTtcbiAgZG9tLm9rLnR5cGUgPSAnYnV0dG9uJztcbiAgZG9tLmhlYWRlclthY10oZG9tLmgxKTtcbiAgZG9tLnNlY3Rpb25bYWNdKGRvbS5kZXNjKTtcbiAgZG9tLnNlY3Rpb25bYWNdKGRvbS5pbnB1dENvbnRhaW5lcik7XG4gIGRvbS5pbnB1dENvbnRhaW5lclthY10oZG9tLmlucHV0KTtcbiAgZG9tLmlucHV0LnBsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlcjtcbiAgZG9tLmNhbmNlbC50eXBlID0gJ2J1dHRvbic7XG4gIGRvbS5mb290ZXJbYWNdKGRvbS5jYW5jZWwpO1xuICBkb20uZm9vdGVyW2FjXShkb20ub2spO1xuICBkb20uZGlhbG9nW2FjXShkb20uY2xvc2UpO1xuICBkb20uZGlhbG9nW2FjXShkb20uaGVhZGVyKTtcbiAgZG9tLmRpYWxvZ1thY10oZG9tLnNlY3Rpb24pO1xuICBkb20uZGlhbG9nW2FjXShkb20uZm9vdGVyKTtcbiAgZG9jLmJvZHlbYWNdKGRvbS5kaWFsb2cpO1xuICByZXR1cm4gZG9tO1xufVxuXG5mdW5jdGlvbiB1cGxvYWRzIChkb20sIHdhcm5pbmcpIHtcbiAgdmFyIGZ1cCA9ICd3ay1wcm9tcHQtZmlsZXVwbG9hZCc7XG4gIHZhciBkb211cCA9IHtcbiAgICBhcmVhOiBlKCdzZWN0aW9uJywgJ3drLXByb21wdC11cGxvYWQtYXJlYScpLFxuICAgIHdhcm5pbmc6IGUoJ3AnLCAnd2stcHJvbXB0LWVycm9yIHdrLXdhcm5pbmcnLCB3YXJuaW5nKSxcbiAgICBmYWlsZWQ6IGUoJ3AnLCAnd2stcHJvbXB0LWVycm9yIHdrLWZhaWxlZCcsIHN0cmluZ3MucHJvbXB0cy51cGxvYWRmYWlsZWQpLFxuICAgIHVwbG9hZDogZSgnbGFiZWwnLCAnd2stcHJvbXB0LXVwbG9hZCcpLFxuICAgIHVwbG9hZGluZzogZSgnc3BhbicsICd3ay1wcm9tcHQtcHJvZ3Jlc3MnLCBzdHJpbmdzLnByb21wdHMudXBsb2FkaW5nKSxcbiAgICBkcm9wOiBlKCdzcGFuJywgJ3drLXByb21wdC1kcm9wJywgc3RyaW5ncy5wcm9tcHRzLmRyb3ApLFxuICAgIGRyb3BpY29uOiBlKCdwJywgJ3drLWRyb3AtaWNvbiB3ay1wcm9tcHQtZHJvcC1pY29uJyksXG4gICAgYnJvd3NlOiBlKCdzcGFuJywgJ3drLXByb21wdC1icm93c2UnLCBzdHJpbmdzLnByb21wdHMuYnJvd3NlKSxcbiAgICBkcmFnZHJvcDogZSgncCcsICd3ay1wcm9tcHQtZHJhZ2Ryb3AnLCBzdHJpbmdzLnByb21wdHMuZHJvcGhpbnQpLFxuICAgIGZpbGVpbnB1dDogZSgnaW5wdXQnLCBmdXApXG4gIH07XG4gIGRvbXVwLmFyZWFbYWNdKGRvbXVwLmRyb3ApO1xuICBkb211cC5hcmVhW2FjXShkb211cC51cGxvYWRpbmcpO1xuICBkb211cC5hcmVhW2FjXShkb211cC5kcm9waWNvbik7XG4gIGRvbXVwLnVwbG9hZFthY10oZG9tdXAuYnJvd3NlKTtcbiAgZG9tdXAudXBsb2FkW2FjXShkb211cC5maWxlaW5wdXQpO1xuICBkb211cC5maWxlaW5wdXQuaWQgPSBmdXA7XG4gIGRvbXVwLmZpbGVpbnB1dC50eXBlID0gJ2ZpbGUnO1xuICBkb20uZGlhbG9nLmNsYXNzTmFtZSArPSAnIHdrLXByb21wdC11cGxvYWRzJztcbiAgZG9tLmlucHV0Q29udGFpbmVyLmNsYXNzTmFtZSArPSAnIHdrLXByb21wdC1pbnB1dC1jb250YWluZXItdXBsb2Fkcyc7XG4gIGRvbS5pbnB1dC5jbGFzc05hbWUgKz0gJyB3ay1wcm9tcHQtaW5wdXQtdXBsb2Fkcyc7XG4gIGRvbS5zZWN0aW9uLmluc2VydEJlZm9yZShkb211cC53YXJuaW5nLCBkb20uaW5wdXRDb250YWluZXIpO1xuICBkb20uc2VjdGlvbi5pbnNlcnRCZWZvcmUoZG9tdXAuZmFpbGVkLCBkb20uaW5wdXRDb250YWluZXIpO1xuICBkb20uc2VjdGlvblthY10oZG9tdXAudXBsb2FkKTtcbiAgZG9tLnNlY3Rpb25bYWNdKGRvbXVwLmRyYWdkcm9wKTtcbiAgZG9tLnNlY3Rpb25bYWNdKGRvbXVwLmFyZWEpO1xuICBzZXRUZXh0KGRvbS5kZXNjLCBnZXRUZXh0KGRvbS5kZXNjKSArIHN0cmluZ3MucHJvbXB0cy51cGxvYWQpO1xuICBjcm9zc3ZlbnQuYWRkKGRvbXVwLmZpbGVpbnB1dCwgJ2ZvY3VzJywgZm9jdXNlZEZpbGVJbnB1dCk7XG4gIGNyb3NzdmVudC5hZGQoZG9tdXAuZmlsZWlucHV0LCAnYmx1cicsIGJsdXJyZWRGaWxlSW5wdXQpO1xuXG4gIGZ1bmN0aW9uIGZvY3VzZWRGaWxlSW5wdXQgKCkge1xuICAgIGNsYXNzZXMuYWRkKGRvbXVwLnVwbG9hZCwgJ3drLWZvY3VzZWQnKTtcbiAgfVxuICBmdW5jdGlvbiBibHVycmVkRmlsZUlucHV0ICgpIHtcbiAgICBjbGFzc2VzLnJtKGRvbXVwLnVwbG9hZCwgJ3drLWZvY3VzZWQnKTtcbiAgfVxuICByZXR1cm4gZG9tdXA7XG59XG5cbnJlbmRlci51cGxvYWRzID0gdXBsb2Fkcztcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTl3Y205dGNIUnpMM0psYm1SbGNpNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ1kzSnZjM04yWlc1MElEMGdjbVZ4ZFdseVpTZ25ZM0p2YzNOMlpXNTBKeWs3WEc1MllYSWdaMlYwVkdWNGRDQTlJSEpsY1hWcGNtVW9KeTR1TDJkbGRGUmxlSFFuS1R0Y2JuWmhjaUJ6WlhSVVpYaDBJRDBnY21WeGRXbHlaU2duTGk0dmMyVjBWR1Y0ZENjcE8xeHVkbUZ5SUdOc1lYTnpaWE1nUFNCeVpYRjFhWEpsS0NjdUxpOWpiR0Z6YzJWekp5azdYRzUyWVhJZ2MzUnlhVzVuY3lBOUlISmxjWFZwY21Vb0p5NHVMM04wY21sdVozTW5LVHRjYm5aaGNpQmhZeUE5SUNkaGNIQmxibVJEYUdsc1pDYzdYRzUyWVhJZ1pHOWpJRDBnWjJ4dlltRnNMbVJ2WTNWdFpXNTBPMXh1WEc1bWRXNWpkR2x2YmlCbElDaDBlWEJsTENCamJITXNJSFJsZUhRcElIdGNiaUFnZG1GeUlHVnNJRDBnWkc5akxtTnlaV0YwWlVWc1pXMWxiblFvZEhsd1pTazdYRzRnSUdWc0xtTnNZWE56VG1GdFpTQTlJR05zY3p0Y2JpQWdhV1lnS0hSbGVIUXBJSHRjYmlBZ0lDQnpaWFJVWlhoMEtHVnNMQ0IwWlhoMEtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1pXdzdYRzU5WEc1Y2JtWjFibU4wYVc5dUlISmxibVJsY2lBb2IzQjBhVzl1Y3lrZ2UxeHVJQ0IyWVhJZ1pHOXRJRDBnZTF4dUlDQWdJR1JwWVd4dlp6b2daU2duWVhKMGFXTnNaU2NzSUNkM2F5MXdjbTl0Y0hRZ0p5QXJJRzl3ZEdsdmJuTXVhV1FwTEZ4dUlDQWdJR05zYjNObE9pQmxLQ2RoSnl3Z0ozZHJMWEJ5YjIxd2RDMWpiRzl6WlNjcExGeHVJQ0FnSUdobFlXUmxjam9nWlNnbmFHVmhaR1Z5Snl3Z0ozZHJMWEJ5YjIxd2RDMW9aV0ZrWlhJbktTeGNiaUFnSUNCb01Ub2daU2duYURFbkxDQW5kMnN0Y0hKdmJYQjBMWFJwZEd4bEp5d2diM0IwYVc5dWN5NTBhWFJzWlNrc1hHNGdJQ0FnYzJWamRHbHZiam9nWlNnbmMyVmpkR2x2Ymljc0lDZDNheTF3Y205dGNIUXRZbTlrZVNjcExGeHVJQ0FnSUdSbGMyTTZJR1VvSjNBbkxDQW5kMnN0Y0hKdmJYQjBMV1JsYzJOeWFYQjBhVzl1Snl3Z2IzQjBhVzl1Y3k1a1pYTmpjbWx3ZEdsdmJpa3NYRzRnSUNBZ2FXNXdkWFJEYjI1MFlXbHVaWEk2SUdVb0oyUnBkaWNzSUNkM2F5MXdjbTl0Y0hRdGFXNXdkWFF0WTI5dWRHRnBibVZ5Snlrc1hHNGdJQ0FnYVc1d2RYUTZJR1VvSjJsdWNIVjBKeXdnSjNkckxYQnliMjF3ZEMxcGJuQjFkQ2NwTEZ4dUlDQWdJR05oYm1ObGJEb2daU2duWW5WMGRHOXVKeXdnSjNkckxYQnliMjF3ZEMxallXNWpaV3duTENBblEyRnVZMlZzSnlrc1hHNGdJQ0FnYjJzNklHVW9KMkoxZEhSdmJpY3NJQ2QzYXkxd2NtOXRjSFF0YjJzbkxDQW5UMnNuS1N4Y2JpQWdJQ0JtYjI5MFpYSTZJR1VvSjJadmIzUmxjaWNzSUNkM2F5MXdjbTl0Y0hRdFluVjBkRzl1Y3ljcFhHNGdJSDA3WEc0Z0lHUnZiUzV2YXk1MGVYQmxJRDBnSjJKMWRIUnZiaWM3WEc0Z0lHUnZiUzVvWldGa1pYSmJZV05kS0dSdmJTNW9NU2s3WEc0Z0lHUnZiUzV6WldOMGFXOXVXMkZqWFNoa2IyMHVaR1Z6WXlrN1hHNGdJR1J2YlM1elpXTjBhVzl1VzJGalhTaGtiMjB1YVc1d2RYUkRiMjUwWVdsdVpYSXBPMXh1SUNCa2IyMHVhVzV3ZFhSRGIyNTBZV2x1WlhKYllXTmRLR1J2YlM1cGJuQjFkQ2s3WEc0Z0lHUnZiUzVwYm5CMWRDNXdiR0ZqWldodmJHUmxjaUE5SUc5d2RHbHZibk11Y0d4aFkyVm9iMnhrWlhJN1hHNGdJR1J2YlM1allXNWpaV3d1ZEhsd1pTQTlJQ2RpZFhSMGIyNG5PMXh1SUNCa2IyMHVabTl2ZEdWeVcyRmpYU2hrYjIwdVkyRnVZMlZzS1R0Y2JpQWdaRzl0TG1admIzUmxjbHRoWTEwb1pHOXRMbTlyS1R0Y2JpQWdaRzl0TG1ScFlXeHZaMXRoWTEwb1pHOXRMbU5zYjNObEtUdGNiaUFnWkc5dExtUnBZV3h2WjF0aFkxMG9aRzl0TG1obFlXUmxjaWs3WEc0Z0lHUnZiUzVrYVdGc2IyZGJZV05kS0dSdmJTNXpaV04wYVc5dUtUdGNiaUFnWkc5dExtUnBZV3h2WjF0aFkxMG9aRzl0TG1admIzUmxjaWs3WEc0Z0lHUnZZeTVpYjJSNVcyRmpYU2hrYjIwdVpHbGhiRzluS1R0Y2JpQWdjbVYwZFhKdUlHUnZiVHRjYm4xY2JseHVablZ1WTNScGIyNGdkWEJzYjJGa2N5QW9aRzl0TENCM1lYSnVhVzVuS1NCN1hHNGdJSFpoY2lCbWRYQWdQU0FuZDJzdGNISnZiWEIwTFdacGJHVjFjR3h2WVdRbk8xeHVJQ0IyWVhJZ1pHOXRkWEFnUFNCN1hHNGdJQ0FnWVhKbFlUb2daU2duYzJWamRHbHZiaWNzSUNkM2F5MXdjbTl0Y0hRdGRYQnNiMkZrTFdGeVpXRW5LU3hjYmlBZ0lDQjNZWEp1YVc1bk9pQmxLQ2R3Snl3Z0ozZHJMWEJ5YjIxd2RDMWxjbkp2Y2lCM2F5MTNZWEp1YVc1bkp5d2dkMkZ5Ym1sdVp5a3NYRzRnSUNBZ1ptRnBiR1ZrT2lCbEtDZHdKeXdnSjNkckxYQnliMjF3ZEMxbGNuSnZjaUIzYXkxbVlXbHNaV1FuTENCemRISnBibWR6TG5CeWIyMXdkSE11ZFhCc2IyRmtabUZwYkdWa0tTeGNiaUFnSUNCMWNHeHZZV1E2SUdVb0oyeGhZbVZzSnl3Z0ozZHJMWEJ5YjIxd2RDMTFjR3h2WVdRbktTeGNiaUFnSUNCMWNHeHZZV1JwYm1jNklHVW9KM053WVc0bkxDQW5kMnN0Y0hKdmJYQjBMWEJ5YjJkeVpYTnpKeXdnYzNSeWFXNW5jeTV3Y205dGNIUnpMblZ3Ykc5aFpHbHVaeWtzWEc0Z0lDQWdaSEp2Y0RvZ1pTZ25jM0JoYmljc0lDZDNheTF3Y205dGNIUXRaSEp2Y0Njc0lITjBjbWx1WjNNdWNISnZiWEIwY3k1a2NtOXdLU3hjYmlBZ0lDQmtjbTl3YVdOdmJqb2daU2duY0Njc0lDZDNheTFrY205d0xXbGpiMjRnZDJzdGNISnZiWEIwTFdSeWIzQXRhV052YmljcExGeHVJQ0FnSUdKeWIzZHpaVG9nWlNnbmMzQmhiaWNzSUNkM2F5MXdjbTl0Y0hRdFluSnZkM05sSnl3Z2MzUnlhVzVuY3k1d2NtOXRjSFJ6TG1KeWIzZHpaU2tzWEc0Z0lDQWdaSEpoWjJSeWIzQTZJR1VvSjNBbkxDQW5kMnN0Y0hKdmJYQjBMV1J5WVdka2NtOXdKeXdnYzNSeWFXNW5jeTV3Y205dGNIUnpMbVJ5YjNCb2FXNTBLU3hjYmlBZ0lDQm1hV3hsYVc1d2RYUTZJR1VvSjJsdWNIVjBKeXdnWm5Wd0tWeHVJQ0I5TzF4dUlDQmtiMjExY0M1aGNtVmhXMkZqWFNoa2IyMTFjQzVrY205d0tUdGNiaUFnWkc5dGRYQXVZWEpsWVZ0aFkxMG9aRzl0ZFhBdWRYQnNiMkZrYVc1bktUdGNiaUFnWkc5dGRYQXVZWEpsWVZ0aFkxMG9aRzl0ZFhBdVpISnZjR2xqYjI0cE8xeHVJQ0JrYjIxMWNDNTFjR3h2WVdSYllXTmRLR1J2YlhWd0xtSnliM2R6WlNrN1hHNGdJR1J2YlhWd0xuVndiRzloWkZ0aFkxMG9aRzl0ZFhBdVptbHNaV2x1Y0hWMEtUdGNiaUFnWkc5dGRYQXVabWxzWldsdWNIVjBMbWxrSUQwZ1puVndPMXh1SUNCa2IyMTFjQzVtYVd4bGFXNXdkWFF1ZEhsd1pTQTlJQ2RtYVd4bEp6dGNiaUFnWkc5dExtUnBZV3h2Wnk1amJHRnpjMDVoYldVZ0t6MGdKeUIzYXkxd2NtOXRjSFF0ZFhCc2IyRmtjeWM3WEc0Z0lHUnZiUzVwYm5CMWRFTnZiblJoYVc1bGNpNWpiR0Z6YzA1aGJXVWdLejBnSnlCM2F5MXdjbTl0Y0hRdGFXNXdkWFF0WTI5dWRHRnBibVZ5TFhWd2JHOWhaSE1uTzF4dUlDQmtiMjB1YVc1d2RYUXVZMnhoYzNOT1lXMWxJQ3M5SUNjZ2Qyc3RjSEp2YlhCMExXbHVjSFYwTFhWd2JHOWhaSE1uTzF4dUlDQmtiMjB1YzJWamRHbHZiaTVwYm5ObGNuUkNaV1p2Y21Vb1pHOXRkWEF1ZDJGeWJtbHVaeXdnWkc5dExtbHVjSFYwUTI5dWRHRnBibVZ5S1R0Y2JpQWdaRzl0TG5ObFkzUnBiMjR1YVc1elpYSjBRbVZtYjNKbEtHUnZiWFZ3TG1aaGFXeGxaQ3dnWkc5dExtbHVjSFYwUTI5dWRHRnBibVZ5S1R0Y2JpQWdaRzl0TG5ObFkzUnBiMjViWVdOZEtHUnZiWFZ3TG5Wd2JHOWhaQ2s3WEc0Z0lHUnZiUzV6WldOMGFXOXVXMkZqWFNoa2IyMTFjQzVrY21GblpISnZjQ2s3WEc0Z0lHUnZiUzV6WldOMGFXOXVXMkZqWFNoa2IyMTFjQzVoY21WaEtUdGNiaUFnYzJWMFZHVjRkQ2hrYjIwdVpHVnpZeXdnWjJWMFZHVjRkQ2hrYjIwdVpHVnpZeWtnS3lCemRISnBibWR6TG5CeWIyMXdkSE11ZFhCc2IyRmtLVHRjYmlBZ1kzSnZjM04yWlc1MExtRmtaQ2hrYjIxMWNDNW1hV3hsYVc1d2RYUXNJQ2RtYjJOMWN5Y3NJR1p2WTNWelpXUkdhV3hsU1c1d2RYUXBPMXh1SUNCamNtOXpjM1psYm5RdVlXUmtLR1J2YlhWd0xtWnBiR1ZwYm5CMWRDd2dKMkpzZFhJbkxDQmliSFZ5Y21Wa1JtbHNaVWx1Y0hWMEtUdGNibHh1SUNCbWRXNWpkR2x2YmlCbWIyTjFjMlZrUm1sc1pVbHVjSFYwSUNncElIdGNiaUFnSUNCamJHRnpjMlZ6TG1Ga1pDaGtiMjExY0M1MWNHeHZZV1FzSUNkM2F5MW1iMk4xYzJWa0p5azdYRzRnSUgxY2JpQWdablZ1WTNScGIyNGdZbXgxY25KbFpFWnBiR1ZKYm5CMWRDQW9LU0I3WEc0Z0lDQWdZMnhoYzNObGN5NXliU2hrYjIxMWNDNTFjR3h2WVdRc0lDZDNheTFtYjJOMWMyVmtKeWs3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1J2YlhWd08xeHVmVnh1WEc1eVpXNWtaWEl1ZFhCc2IyRmtjeUE5SUhWd2JHOWhaSE03WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhKbGJtUmxjanRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBidWxsc2V5ZSA9IHJlcXVpcmUoJ2J1bGxzZXllJyk7XG52YXIgcmFuY2hvcmVkID0gL15bIz4qLV0kLztcbnZhciByYm91bmRhcnkgPSAvXlsqX2AjLV0kLztcbnZhciByYnVsbGV0YWZ0ZXIgPSAvXlxcZCtcXC4gLztcbnZhciByYnVsbGV0bGluZSA9IC9eXFxzKlxcZCtcXC4kLztcbnZhciByYnVsbGV0bGVmdCA9IC9eXFxzKlxcZCskLztcbnZhciByYnVsbGV0cmlnaHQgPSAvXFxkfFxcLi87XG52YXIgcndoaXRlc3BhY2UgPSAvXlxccyokLztcbnZhciByaHIgPSAvXi0tLSskLztcbnZhciByZW5kID0gL14kfFxcc3xcXG4vO1xudmFyIHJmb290bm90ZWRlY2xhcmF0aW9uID0gL15cXFtbXlxcXV0rXFxdXFxzKjpcXHMqW0EtelxcL10vO1xudmFyIHJmb290bm90ZWJlZ2luID0gL15cXHMqXFxbW15cXF1dKiQvO1xudmFyIHJmb290bm90ZWJlZ2FuID0gL15cXHMqXFxbW15cXF1dKyQvO1xudmFyIHJmb290bm90ZWxlZnQgPSAvXlxccypcXFtbXlxcXV0rXFxdXFxzKiQvO1xudmFyIHJmb290bm90ZWFuY2hvciA9IC9eXFxzKlxcW1teXFxdXStcXF1cXHMqOiQvO1xudmFyIHJmb290bm90ZWxpbmsgPSAvXlxccypcXFtbXlxcXV0rXFxdXFxzKjpcXHMqW0EtelxcL10vO1xudmFyIHJmb290bm90ZWZ1bGwgPSAvXlxccypcXFtbXlxcXV0rXFxdXFxzKjpcXHMqW0EtelxcL10uKlxccypcIlteXCJdKlwiLztcbnZhciByc3BhY2VvcnF1b3RlID0gL1xcc3xcIi87XG52YXIgcnNwYWNlb3Jjb2xvbiA9IC9cXHN8Oi87XG52YXIgcmVtcHR5ID0gL14oPHA+PFxcL3A+KT9cXG4/JC9pO1xuXG5mdW5jdGlvbiByZW1lbWJlclNlbGVjdGlvbiAoaGlzdG9yeSkge1xuICB2YXIgY29kZSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTgpLnN1YnN0cigyKS5yZXBsYWNlKC9cXGQrL2csICcnKTtcbiAgdmFyIG9wZW4gPSAnV29vZm1hcmtTZWxlY3Rpb25PcGVuTWFya2VyJyArIGNvZGU7XG4gIHZhciBjbG9zZSA9ICdXb29mbWFya1NlbGVjdGlvbkNsb3NlTWFya2VyJyArIGNvZGU7XG4gIHZhciBybWFya2VycyA9IG5ldyBSZWdFeHAob3BlbiArICd8JyArIGNsb3NlLCAnZycpO1xuICBtYXJrKCk7XG4gIHJldHVybiB1bm1hcms7XG5cbiAgZnVuY3Rpb24gbWFyayAoKSB7XG4gICAgdmFyIHN0YXRlID0gaGlzdG9yeS5yZXNldCgpLmlucHV0U3RhdGU7XG4gICAgdmFyIGNodW5rcyA9IHN0YXRlLmdldENodW5rcygpO1xuICAgIHZhciBtb2RlID0gc3RhdGUubW9kZTtcbiAgICB2YXIgYWxsID0gY2h1bmtzLmJlZm9yZSArIGNodW5rcy5zZWxlY3Rpb24gKyBjaHVua3MuYWZ0ZXI7XG4gICAgaWYgKHJlbXB0eS50ZXN0KGFsbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG1vZGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgIHVwZGF0ZU1hcmtkb3duQ2h1bmtzKGNodW5rcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZUhUTUxDaHVua3MoY2h1bmtzKTtcbiAgICB9XG4gICAgc3RhdGUuc2V0Q2h1bmtzKGNodW5rcyk7XG4gICAgc3RhdGUucmVzdG9yZShmYWxzZSk7XG4gIH1cblxuICBmdW5jdGlvbiB1bm1hcmsgKCkge1xuICAgIHZhciBzdGF0ZSA9IGhpc3RvcnkuaW5wdXRTdGF0ZTtcbiAgICB2YXIgY2h1bmtzID0gc3RhdGUuZ2V0Q2h1bmtzKCk7XG4gICAgdmFyIGFsbCA9IGNodW5rcy5iZWZvcmUgKyBjaHVua3Muc2VsZWN0aW9uICsgY2h1bmtzLmFmdGVyO1xuICAgIHZhciBzdGFydCA9IGFsbC5sYXN0SW5kZXhPZihvcGVuKTtcbiAgICB2YXIgZW5kID0gYWxsLmxhc3RJbmRleE9mKGNsb3NlKSArIGNsb3NlLmxlbmd0aDtcbiAgICB2YXIgc2VsZWN0aW9uU3RhcnQgPSBzdGFydCA9PT0gLTEgPyAwIDogc3RhcnQ7XG4gICAgdmFyIHNlbGVjdGlvbkVuZCA9IGVuZCA9PT0gLTEgPyAwIDogZW5kO1xuICAgIGNodW5rcy5iZWZvcmUgPSBhbGwuc3Vic3RyKDAsIHNlbGVjdGlvblN0YXJ0KS5yZXBsYWNlKHJtYXJrZXJzLCAnJyk7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGFsbC5zdWJzdHIoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCAtIHNlbGVjdGlvblN0YXJ0KS5yZXBsYWNlKHJtYXJrZXJzLCAnJyk7XG4gICAgY2h1bmtzLmFmdGVyID0gYWxsLnN1YnN0cihlbmQpLnJlcGxhY2Uocm1hcmtlcnMsICcnKTtcbiAgICB2YXIgZWwgPSBoaXN0b3J5LnN1cmZhY2UuY3VycmVudChoaXN0b3J5LmlucHV0TW9kZSk7XG4gICAgdmFyIGV5ZSA9IGJ1bGxzZXllKGVsLCB7XG4gICAgICBjYXJldDogdHJ1ZSwgYXV0b3VwZGF0ZVRvQ2FyZXQ6IGZhbHNlLCB0cmFja2luZzogZmFsc2VcbiAgICB9KTtcbiAgICBzdGF0ZS5zZXRDaHVua3MoY2h1bmtzKTtcbiAgICBzdGF0ZS5yZXN0b3JlKGZhbHNlKTtcbiAgICBzdGF0ZS5zY3JvbGxUb3AgPSBlbC5zY3JvbGxUb3AgPSBleWUucmVhZCgpLnkgLSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSA1MDtcbiAgICBleWUuZGVzdHJveSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFya2Rvd25DaHVua3MgKGNodW5rcykge1xuICAgIHZhciBhbGwgPSBjaHVua3MuYmVmb3JlICsgY2h1bmtzLnNlbGVjdGlvbiArIGNodW5rcy5hZnRlcjtcbiAgICB2YXIgb3JpZ2luYWxTdGFydCA9IGNodW5rcy5iZWZvcmUubGVuZ3RoO1xuICAgIHZhciBvcmlnaW5hbEVuZCA9IG9yaWdpbmFsU3RhcnQgKyBjaHVua3Muc2VsZWN0aW9uLmxlbmd0aDtcbiAgICB2YXIgc2VsZWN0aW9uU3RhcnQgPSBtb3ZlKG9yaWdpbmFsU3RhcnQsIDEpO1xuICAgIHZhciBzZWxlY3Rpb25FbmQgPSBtb3ZlKG9yaWdpbmFsRW5kLCAtMSk7XG4gICAgdmFyIG1vdmVkID0gb3JpZ2luYWxTdGFydCAhPT0gc2VsZWN0aW9uU3RhcnQgfHwgb3JpZ2luYWxFbmQgIT09IHNlbGVjdGlvbkVuZDtcblxuICAgIHVwZGF0ZVNlbGVjdGlvbihjaHVua3MsIGFsbCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCwgbW92ZWQpO1xuXG4gICAgZnVuY3Rpb24gbW92ZSAocCwgb2Zmc2V0KSB7XG4gICAgICB2YXIgcHJldiA9IGFsbFtwIC0gMV0gfHwgJyc7XG4gICAgICB2YXIgbmV4dCA9IGFsbFtwXSB8fCAnJztcbiAgICAgIHZhciBsaW5lID0gYmFja3RyYWNlKHAgLSAxLCAnXFxuJyk7XG4gICAgICB2YXIganVtcHMgPSBwcmV2ID09PSAnJyB8fCBwcmV2ID09PSAnXFxuJztcblxuICAgICAgaWYgKG5leHQgPT09ICcgJyAmJiAoanVtcHMgfHwgcHJldiA9PT0gJyAnKSkge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNsb3NlID0gYmFja3RyYWNlKHAgLSAxLCAnXScpO1xuICAgICAgdmFyIHJlb3BlbmVkID0gY2xvc2UuaW5kZXhPZignWycpO1xuXG4gICAgICAvLyB0aGVzZSB0d28gaGFuZGxlIGFuY2hvcmVkIHJlZmVyZW5jZXMgJ1tmb29dWzFdJywgb3IgZXZlbiAnW2Jhcl0gIFxcbiBbMl0nXG4gICAgICBpZiAocmVvcGVuZWQgIT09IC0xICYmIHJ3aGl0ZXNwYWNlLnRlc3QoY2xvc2Uuc3Vic3RyKDAsIHJlb3BlbmVkKSkpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKC1jbG9zZS5sZW5ndGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVvcGVuZWQgPSBhbGwuc3Vic3RyKHApLmluZGV4T2YoJ1snKTtcbiAgICAgICAgaWYgKHJlb3BlbmVkICE9PSAtMSAmJiByd2hpdGVzcGFjZS50ZXN0KGFsbC5zdWJzdHIocCwgcmVvcGVuZWQpKSkge1xuICAgICAgICAgIHJldHVybiBhZ2FpbigtMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGhlIHNldmVuIGZvbGxvd2luZyBydWxlcyB0b2dldGhlciBoYW5kbGUgZm9vdG5vdGUgcmVmZXJlbmNlc1xuICAgICAgaWYgKChqdW1wcyB8fCByd2hpdGVzcGFjZS50ZXN0KGxpbmUpKSAmJiByZm9vdG5vdGVkZWNsYXJhdGlvbi50ZXN0KGFsbC5zdWJzdHIocCkpKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpOyAvLyBzdGFydGVkIHdpdGggJycsICdcXG4nLCBvciAnICAnIGFuZCBjb250aW51ZWQgd2l0aCAnW2EtMV06IGgnXG4gICAgICB9XG4gICAgICBpZiAocmZvb3Rub3RlYmVnaW4udGVzdChsaW5lKSAmJiBuZXh0ICE9PSAnXScpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7IC8vIHN0YXJ0ZWQgd2l0aCAnWycgYW5kIGNvbnRpbnVlZCB3aXRoICdhLTEnXG4gICAgICB9XG4gICAgICBpZiAocmZvb3Rub3RlYmVnYW4udGVzdChsaW5lKSAmJiBuZXh0ID09PSAnXScpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7IC8vIHN0YXJ0ZWQgd2l0aCAnW2EtMScgYW5kIGNvbnRpbnVlZCB3aXRoICddOiBoJ1xuICAgICAgfVxuICAgICAgaWYgKHJmb290bm90ZWxlZnQudGVzdChsaW5lKSAmJiByc3BhY2VvcmNvbG9uLnRlc3QobmV4dCkpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7IC8vIHN0YXJ0ZWQgd2l0aCAnW2EtMV0gICcgYW5kIGNvbnRpbnVlZCB3aXRoICc6J1xuICAgICAgfVxuICAgICAgaWYgKHJmb290bm90ZWFuY2hvci50ZXN0KGxpbmUpICYmIG5leHQgPT09ICcgJykge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTsgLy8gc3RhcnRlZCB3aXRoICdbYS0xXSAgOicgYW5kIGNvbnRpbnVlZCB3aXRoICcgJ1xuICAgICAgfVxuICAgICAgaWYgKHJmb290bm90ZWxpbmsudGVzdChsaW5lKSAmJiBwcmV2ID09PSAnICcgJiYgcnNwYWNlb3JxdW90ZS50ZXN0KG5leHQpICYmIG9mZnNldCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTsgLy8gc3RhcnRlZCB3aXRoICdbYS0xXSAgOicgYW5kIGNvbnRpbnVlZCB3aXRoICcgJywgb3IgJ1wiJywgb24gdGhlIGxlZnRcbiAgICAgIH1cbiAgICAgIGlmIChyZm9vdG5vdGVmdWxsLnRlc3QobGluZSkgJiYgcmVuZC50ZXN0KG5leHQpKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigtMSk7IC8vIHN0YXJ0ZWQgd2l0aCAnW2EtMV0gIDogc29tZXRoaW5nIFwic29tZXRoaW5nXCInIGFuZCBjb250aW51ZWQgd2l0aCAnJywgJyAnLCBvciAnXFxuJ1xuICAgICAgfVxuXG4gICAgICAvLyB0aGUgdGhyZWUgZm9sbG93aW5nIHJ1bGVzIHRvZ2V0aGVyIGhhbmRsZSBvcmRlcmVkIGxpc3QgaXRlbXM6ICdcXG4xLiBmb29cXG4yLiBiYXInXG4gICAgICBpZiAoKGp1bXBzIHx8IHJ3aGl0ZXNwYWNlLnRlc3QobGluZSkpICYmIHJidWxsZXRhZnRlci50ZXN0KGFsbC5zdWJzdHIocCkpKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpOyAvLyBzdGFydGVkIHdpdGggJycsICdcXG4nLCBvciAnICAnIGFuZCBjb250aW51ZWQgd2l0aCAnMTIzLiAnXG4gICAgICB9XG4gICAgICBpZiAocmJ1bGxldGxlZnQudGVzdChsaW5lKSAmJiByYnVsbGV0cmlnaHQudGVzdChuZXh0KSkge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTsgLy8gc3RhcnRlZCB3aXRoICcgIDEyMycgYW5kIGVuZGVkIGluICc0JyBvciAnLidcbiAgICAgIH1cbiAgICAgIGlmIChyYnVsbGV0bGluZS50ZXN0KGxpbmUpICYmIG5leHQgPT09ICcgJykge1xuICAgICAgICByZXR1cm4gYWdhaW4oKTsgLy8gc3RhcnRlZCB3aXRoICcgIDEyMy4nIGFuZCBlbmRlZCB3aXRoICcgJ1xuICAgICAgfVxuXG4gICAgICBpZiAocmFuY2hvcmVkLnRlc3QobmV4dCkgJiYganVtcHMpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7XG4gICAgICB9XG4gICAgICBpZiAocmFuY2hvcmVkLnRlc3QocHJldikgJiYgbmV4dCA9PT0gJyAnKSB7XG4gICAgICAgIHJldHVybiBhZ2FpbigpO1xuICAgICAgfVxuICAgICAgaWYgKG5leHQgPT09IHByZXYgJiYgcmJvdW5kYXJ5LnRlc3QobmV4dCkpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7XG4gICAgICB9XG4gICAgICBpZiAocmhyLnRlc3QobGluZSkgJiYgbmV4dCA9PT0gJ1xcbicpIHtcbiAgICAgICAgcmV0dXJuIGFnYWluKCk7XG4gICAgICB9XG4gICAgICBpZiAoYWxsLnN1YnN0cihwIC0gMywgMykgPT09ICdgYGAnICYmIG9mZnNldCA9PT0gMSkgeyAvLyBoYW5kbGVzICdgYGBqYXZhc2NyaXB0XFxuY29kZVxcbmBgYCdcbiAgICAgICAgd2hpbGUgKGFsbFtwIC0gMV0gJiYgYWxsW3AgLSAxXSAhPT0gJ1xcbicpIHtcbiAgICAgICAgICBwKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwO1xuXG4gICAgICBmdW5jdGlvbiBhZ2FpbiAob3ZlcnJpZGUpIHtcbiAgICAgICAgdmFyIGRpZmYgPSBvdmVycmlkZSB8fCBvZmZzZXQ7XG4gICAgICAgIHJldHVybiBtb3ZlKHAgKyBkaWZmLCBkaWZmID4gMCA/IDEgOiAtMSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBiYWNrdHJhY2UgKHAsIGVkZ2UpIHtcbiAgICAgICAgdmFyIGxhc3QgPSBhbGxbcF07XG4gICAgICAgIHZhciB0ZXh0ID0gJyc7XG4gICAgICAgIHdoaWxlIChsYXN0ICYmIGxhc3QgIT09IGVkZ2UpIHtcbiAgICAgICAgICB0ZXh0ID0gbGFzdCArIHRleHQ7XG4gICAgICAgICAgbGFzdCA9IGFsbFstLXBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUhUTUxDaHVua3MgKGNodW5rcykge1xuICAgIHZhciBhbGwgPSBjaHVua3MuYmVmb3JlICsgY2h1bmtzLnNlbGVjdGlvbiArIGNodW5rcy5hZnRlcjtcbiAgICB2YXIgc2VsZWN0aW9uU3RhcnQgPSBjaHVua3MuYmVmb3JlLmxlbmd0aDtcbiAgICB2YXIgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uU3RhcnQgKyBjaHVua3Muc2VsZWN0aW9uLmxlbmd0aDtcbiAgICB2YXIgbGVmdENsb3NlID0gY2h1bmtzLmJlZm9yZS5sYXN0SW5kZXhPZignPicpO1xuICAgIHZhciBsZWZ0T3BlbiA9IGNodW5rcy5iZWZvcmUubGFzdEluZGV4T2YoJzwnKTtcbiAgICB2YXIgcmlnaHRDbG9zZSA9IGNodW5rcy5hZnRlci5pbmRleE9mKCc+Jyk7XG4gICAgdmFyIHJpZ2h0T3BlbiA9IGNodW5rcy5hZnRlci5pbmRleE9mKCc8Jyk7XG4gICAgdmFyIHByZXZPcGVuO1xuICAgIHZhciBuZXh0Q2xvc2U7XG4gICAgdmFyIGJhbGFuY2VUYWdzO1xuXG4gICAgLy8gPGZvW29dPmJhcjwvZm9vPiBpbnRvIDxmb28+W11iYXI8L2Zvbz4sIDxmb1tvPmJhXXI8L2Zvbz4gaW50byA8Zm9vPltiYV1yPC9mb28+XG4gICAgaWYgKGxlZnRPcGVuID4gbGVmdENsb3NlKSB7XG4gICAgICBuZXh0Q2xvc2UgPSBhbGwuaW5kZXhPZignPicsIGxlZnRDbG9zZSArIDEpO1xuICAgICAgaWYgKG5leHRDbG9zZSAhPT0gLTEpIHtcbiAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBuZXh0Q2xvc2UgKyAxO1xuICAgICAgICBiYWxhbmNlVGFncyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gPGZvbz5iYXI8L1tmb11vPiBpbnRvIDxmb28+YmFyW108L2Zvbz4sIDxmb28+YlthcjwvZl1vbz4gaW50byA8Zm9vPmJbYXJdPC9mb28+XG4gICAgaWYgKHJpZ2h0T3BlbiA9PT0gLTEgfHwgcmlnaHRPcGVuID4gcmlnaHRDbG9zZSkge1xuICAgICAgcHJldk9wZW4gPSBhbGwuc3Vic3RyKDAsIGNodW5rcy5iZWZvcmUubGVuZ3RoICsgY2h1bmtzLnNlbGVjdGlvbi5sZW5ndGggKyByaWdodENsb3NlKS5sYXN0SW5kZXhPZignPCcpO1xuICAgICAgaWYgKHByZXZPcGVuICE9PSAtMSkge1xuICAgICAgICBzZWxlY3Rpb25FbmQgPSBwcmV2T3BlbjtcbiAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBNYXRoLm1pbihzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgYmFsYW5jZVRhZ3MgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvbihjaHVua3MsIGFsbCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCwgYmFsYW5jZVRhZ3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0aW9uIChjaHVua3MsIGFsbCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCwgYmFsYW5jZVRhZ3MpIHtcbiAgICBpZiAoc2VsZWN0aW9uRW5kIDwgc2VsZWN0aW9uU3RhcnQpIHtcbiAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgIH1cbiAgICBpZiAoYmFsYW5jZVRhZ3MpIHtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBhbGwuc3Vic3RyKDAsIHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBhbGwuc3Vic3RyKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQgLSBzZWxlY3Rpb25TdGFydCk7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBhbGwuc3Vic3RyKHNlbGVjdGlvbkVuZCk7XG4gICAgfVxuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBvcGVuICsgY2h1bmtzLnNlbGVjdGlvbiArIGNsb3NlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVtZW1iZXJTZWxlY3Rpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzZXRUZXh0ID0gcmVxdWlyZSgnLi9zZXRUZXh0Jyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4vc3RyaW5ncycpO1xuXG5mdW5jdGlvbiBjb21tYW5kcyAoZWwsIGlkKSB7XG4gIHNldFRleHQoZWwsIHN0cmluZ3MuYnV0dG9uc1tpZF0gfHwgaWQpO1xufVxuXG5mdW5jdGlvbiBtb2RlcyAoZWwsIGlkKSB7XG4gIHZhciB0ZXh0cyA9IHtcbiAgICBtYXJrZG93bjogJ21cXHUyMTkzJyxcbiAgICB3eXNpd3lnOiAnd3lzaXd5ZydcbiAgfTtcbiAgc2V0VGV4dChlbCwgdGV4dHNbaWRdIHx8IGlkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1vZGVzOiBtb2RlcyxcbiAgY29tbWFuZHM6IGNvbW1hbmRzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBzZXRUZXh0IChlbCwgdmFsdWUpIHtcbiAgZWwuaW5uZXJUZXh0ID0gZWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUZXh0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGxhY2Vob2xkZXJzOiB7XG4gICAgYm9sZDogJ3N0cm9uZyB0ZXh0JyxcbiAgICBpdGFsaWM6ICdlbXBoYXNpemVkIHRleHQnLFxuICAgIHF1b3RlOiAncXVvdGVkIHRleHQnLFxuICAgIGNvZGU6ICdjb2RlIGdvZXMgaGVyZScsXG4gICAgbGlzdGl0ZW06ICdsaXN0IGl0ZW0nLFxuICAgIGhlYWRpbmc6ICdIZWFkaW5nIFRleHQnLFxuICAgIGxpbms6ICdsaW5rIHRleHQnLFxuICAgIGltYWdlOiAnaW1hZ2UgZGVzY3JpcHRpb24nLFxuICAgIGF0dGFjaG1lbnQ6ICdhdHRhY2htZW50IGRlc2NyaXB0aW9uJ1xuICB9LFxuICB0aXRsZXM6IHtcbiAgICBib2xkOiAnU3Ryb25nIDxzdHJvbmc+IEN0cmwrQicsXG4gICAgaXRhbGljOiAnRW1waGFzaXMgPGVtPiBDdHJsK0knLFxuICAgIHF1b3RlOiAnQmxvY2txdW90ZSA8YmxvY2txdW90ZT4gQ3RybCtKJyxcbiAgICBjb2RlOiAnQ29kZSBTYW1wbGUgPHByZT48Y29kZT4gQ3RybCtFJyxcbiAgICBvbDogJ051bWJlcmVkIExpc3QgPG9sPiBDdHJsK08nLFxuICAgIHVsOiAnQnVsbGV0ZWQgTGlzdCA8dWw+IEN0cmwrVScsXG4gICAgaGVhZGluZzogJ0hlYWRpbmcgPGgxPiwgPGgyPiwgLi4uIEN0cmwrRCcsXG4gICAgbGluazogJ0h5cGVybGluayA8YT4gQ3RybCtLJyxcbiAgICBpbWFnZTogJ0ltYWdlIDxpbWc+IEN0cmwrRycsXG4gICAgYXR0YWNobWVudDogJ0F0dGFjaG1lbnQgQ3RybCtTaGlmdCtLJyxcbiAgICBtYXJrZG93bjogJ01hcmtkb3duIE1vZGUgQ3RybCtNJyxcbiAgICBodG1sOiAnSFRNTCBNb2RlIEN0cmwrSCcsXG4gICAgd3lzaXd5ZzogJ1ByZXZpZXcgTW9kZSBDdHJsK1AnXG4gIH0sXG4gIGJ1dHRvbnM6IHtcbiAgICBib2xkOiAnQicsXG4gICAgaXRhbGljOiAnSScsXG4gICAgcXVvdGU6ICdcXHUyMDFjJyxcbiAgICBjb2RlOiAnPC8+JyxcbiAgICBvbDogJzEuJyxcbiAgICB1bDogJ1xcdTI5QkYnLFxuICAgIGhlYWRpbmc6ICdUdCcsXG4gICAgbGluazogJ0xpbmsnLFxuICAgIGltYWdlOiAnSW1hZ2UnLFxuICAgIGF0dGFjaG1lbnQ6ICdBdHRhY2htZW50JyxcbiAgICBocjogJ1xcdTIxYjUnXG4gIH0sXG4gIHByb21wdHM6IHtcbiAgICBsaW5rOiB7XG4gICAgICB0aXRsZTogJ0luc2VydCBMaW5rJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVHlwZSBvciBwYXN0ZSB0aGUgdXJsIHRvIHlvdXIgbGluaycsXG4gICAgICBwbGFjZWhvbGRlcjogJ2h0dHA6Ly9leGFtcGxlLmNvbS8gXCJ0aXRsZVwiJ1xuICAgIH0sXG4gICAgaW1hZ2U6IHtcbiAgICAgIHRpdGxlOiAnSW5zZXJ0IEltYWdlJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRW50ZXIgdGhlIHVybCB0byB5b3VyIGltYWdlJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnaHR0cDovL2V4YW1wbGUuY29tL3B1YmxpYy9pbWFnZS5wbmcgXCJ0aXRsZVwiJ1xuICAgIH0sXG4gICAgYXR0YWNobWVudDoge1xuICAgICAgdGl0bGU6ICdBdHRhY2ggRmlsZScsXG4gICAgICBkZXNjcmlwdGlvbjogJ0VudGVyIHRoZSB1cmwgdG8geW91ciBhdHRhY2htZW50JyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnaHR0cDovL2V4YW1wbGUuY29tL3B1YmxpYy9yZXBvcnQucGRmIFwidGl0bGVcIidcbiAgICB9LFxuICAgIHR5cGVzOiAnWW91IGNhbiBvbmx5IHVwbG9hZCAnLFxuICAgIGJyb3dzZTogJ0Jyb3dzZS4uLicsXG4gICAgZHJvcGhpbnQ6ICdZb3UgY2FuIGFsc28gZHJhZyBmaWxlcyBmcm9tIHlvdXIgY29tcHV0ZXIgYW5kIGRyb3AgdGhlbSBoZXJlIScsXG4gICAgZHJvcDogJ0Ryb3AgeW91ciBmaWxlIGhlcmUgdG8gYmVnaW4gdXBsb2FkLi4uJyxcbiAgICB1cGxvYWQ6ICcsIG9yIHVwbG9hZCBhIGZpbGUnLFxuICAgIHVwbG9hZGluZzogJ1VwbG9hZGluZyB5b3VyIGZpbGUuLi4nLFxuICAgIHVwbG9hZGZhaWxlZDogJ1RoZSB1cGxvYWQgZmFpbGVkISBUaGF0XFwncyBhbGwgd2Uga25vdy4nXG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi9jbGFzc2VzJyk7XG52YXIgZHJhZ0NsYXNzID0gJ3drLWRyYWdnaW5nJztcbnZhciBkcmFnQ2xhc3NTcGVjaWZpYyA9ICd3ay1jb250YWluZXItZHJhZ2dpbmcnO1xudmFyIHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIHVwbG9hZHMgKGNvbnRhaW5lciwgZHJvcGFyZWEsIGVkaXRvciwgb3B0aW9ucywgcmVtb3ZlKSB7XG4gIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gIGNyb3NzdmVudFtvcF0ocm9vdCwgJ2RyYWdlbnRlcicsIGRyYWdnaW5nKTtcbiAgY3Jvc3N2ZW50W29wXShyb290LCAnZHJhZ2VuZCcsIGRyYWdzdG9wKTtcbiAgY3Jvc3N2ZW50W29wXShyb290LCAnbW91c2VvdXQnLCBkcmFnc3RvcCk7XG4gIGNyb3NzdmVudFtvcF0oY29udGFpbmVyLCAnZHJhZ292ZXInLCBoYW5kbGVEcmFnT3ZlciwgZmFsc2UpO1xuICBjcm9zc3ZlbnRbb3BdKGRyb3BhcmVhLCAnZHJvcCcsIGhhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcblxuICBmdW5jdGlvbiBkcmFnZ2luZyAoKSB7XG4gICAgY2xhc3Nlcy5hZGQoZHJvcGFyZWEsIGRyYWdDbGFzcyk7XG4gICAgY2xhc3Nlcy5hZGQoZHJvcGFyZWEsIGRyYWdDbGFzc1NwZWNpZmljKTtcbiAgfVxuICBmdW5jdGlvbiBkcmFnc3RvcCAoKSB7XG4gICAgZHJhZ3N0b3BwZXIoZHJvcGFyZWEpO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZURyYWdPdmVyIChlKSB7XG4gICAgc3RvcChlKTtcbiAgICBkcmFnZ2luZygpO1xuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlRmlsZVNlbGVjdCAoZSkge1xuICAgIGRyYWdzdG9wKCk7XG4gICAgc3RvcChlKTtcbiAgICBlZGl0b3IucnVuQ29tbWFuZChmdW5jdGlvbiBydW5uZXIgKGNodW5rcywgbW9kZSkge1xuICAgICAgdmFyIGZpbGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZS5kYXRhVHJhbnNmZXIuZmlsZXMpO1xuICAgICAgdmFyIHR5cGUgPSBpbmZlclR5cGUoZmlsZXMpO1xuICAgICAgZWRpdG9yLmxpbmtPckltYWdlT3JBdHRhY2htZW50KHR5cGUsIGZpbGVzKS5jYWxsKHRoaXMsIG1vZGUsIGNodW5rcyk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gaW5mZXJUeXBlIChmaWxlcykge1xuICAgIGlmIChvcHRpb25zLmltYWdlcyAmJiAhb3B0aW9ucy5hdHRhY2htZW50cykge1xuICAgICAgcmV0dXJuICdpbWFnZSc7XG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5pbWFnZXMgJiYgb3B0aW9ucy5hdHRhY2htZW50cykge1xuICAgICAgcmV0dXJuICdhdHRhY2htZW50JztcbiAgICB9XG4gICAgaWYgKGZpbGVzLmV2ZXJ5KG1hdGNoZXMob3B0aW9ucy5pbWFnZXMudmFsaWRhdGUgfHwgbmV2ZXIpKSkge1xuICAgICAgcmV0dXJuICdpbWFnZSc7XG4gICAgfVxuICAgIHJldHVybiAnYXR0YWNobWVudCc7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF0Y2hlcyAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1hdGNoZXIgKGZpbGUpIHsgcmV0dXJuIGZuKGZpbGUpOyB9O1xufVxuZnVuY3Rpb24gbmV2ZXIgKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBzdG9wIChlKSB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cbmZ1bmN0aW9uIGRyYWdzdG9wcGVyIChkcm9wYXJlYSkge1xuICBjbGFzc2VzLnJtKGRyb3BhcmVhLCBkcmFnQ2xhc3MpO1xuICBjbGFzc2VzLnJtKGRyb3BhcmVhLCBkcmFnQ2xhc3NTcGVjaWZpYyk7XG59XG5cbnVwbG9hZHMuc3RvcCA9IGRyYWdzdG9wcGVyO1xubW9kdWxlLmV4cG9ydHMgPSB1cGxvYWRzO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbHMgPSByZXF1aXJlKCdsb2NhbC1zdG9yYWdlJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIga2FueWUgPSByZXF1aXJlKCdrYW55ZScpO1xudmFyIHVwbG9hZHMgPSByZXF1aXJlKCcuL3VwbG9hZHMnKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi9zdHJpbmdzJyk7XG52YXIgc2V0VGV4dCA9IHJlcXVpcmUoJy4vc2V0VGV4dCcpO1xudmFyIHJlbWVtYmVyU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9yZW1lbWJlclNlbGVjdGlvbicpO1xudmFyIGJpbmRDb21tYW5kcyA9IHJlcXVpcmUoJy4vYmluZENvbW1hbmRzJyk7XG52YXIgSW5wdXRIaXN0b3J5ID0gcmVxdWlyZSgnLi9JbnB1dEhpc3RvcnknKTtcbnZhciBnZXRDb21tYW5kSGFuZGxlciA9IHJlcXVpcmUoJy4vZ2V0Q29tbWFuZEhhbmRsZXInKTtcbnZhciBnZXRTdXJmYWNlID0gcmVxdWlyZSgnLi9nZXRTdXJmYWNlJyk7XG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vY2xhc3NlcycpO1xudmFyIHJlbmRlcmVycyA9IHJlcXVpcmUoJy4vcmVuZGVyZXJzJyk7XG52YXIgeGhyU3R1YiA9IHJlcXVpcmUoJy4veGhyU3R1YicpO1xudmFyIHByb21wdCA9IHJlcXVpcmUoJy4vcHJvbXB0cy9wcm9tcHQnKTtcbnZhciBjbG9zZVByb21wdHMgPSByZXF1aXJlKCcuL3Byb21wdHMvY2xvc2UnKTtcbnZhciBtb2RlTmFtZXMgPSBbJ21hcmtkb3duJywgJ2h0bWwnLCAnd3lzaXd5ZyddO1xudmFyIGNhY2hlID0gW107XG52YXIgbWFjID0gL1xcYk1hYyBPU1xcYi8udGVzdChnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgcnBhcmFncmFwaCA9IC9ePHA+PFxcL3A+XFxuPyQvaTtcblxuZnVuY3Rpb24gZmluZCAodGV4dGFyZWEpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWNoZS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjYWNoZVtpXSAmJiBjYWNoZVtpXS50YSA9PT0gdGV4dGFyZWEpIHtcbiAgICAgIHJldHVybiBjYWNoZVtpXS5lZGl0b3I7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB3b29mbWFyayAodGV4dGFyZWEsIG9wdGlvbnMpIHtcbiAgdmFyIGNhY2hlZCA9IGZpbmQodGV4dGFyZWEpO1xuICBpZiAoY2FjaGVkKSB7XG4gICAgcmV0dXJuIGNhY2hlZDtcbiAgfVxuXG4gIHZhciBwYXJlbnQgPSB0ZXh0YXJlYS5wYXJlbnRFbGVtZW50O1xuICBpZiAocGFyZW50LmNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dvb2ZtYXJrIGRlbWFuZHMgPHRleHRhcmVhPiBlbGVtZW50cyB0byBoYXZlIG5vIHNpYmxpbmdzJyk7XG4gIH1cblxuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIGlmIChvLm1hcmtkb3duID09PSB2b2lkIDApIHsgby5tYXJrZG93biA9IHRydWU7IH1cbiAgaWYgKG8uaHRtbCA9PT0gdm9pZCAwKSB7IG8uaHRtbCA9IHRydWU7IH1cbiAgaWYgKG8ud3lzaXd5ZyA9PT0gdm9pZCAwKSB7IG8ud3lzaXd5ZyA9IHRydWU7IH1cblxuICBpZiAoIW8ubWFya2Rvd24gJiYgIW8uaHRtbCAmJiAhby53eXNpd3lnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b29mbWFyayBleHBlY3RzIGF0IGxlYXN0IG9uZSBpbnB1dCBtb2RlIHRvIGJlIGF2YWlsYWJsZScpO1xuICB9XG5cbiAgaWYgKG8uaHIgPT09IHZvaWQgMCkgeyBvLmhyID0gZmFsc2U7IH1cbiAgaWYgKG8uc3RvcmFnZSA9PT0gdm9pZCAwKSB7IG8uc3RvcmFnZSA9IHRydWU7IH1cbiAgaWYgKG8uc3RvcmFnZSA9PT0gdHJ1ZSkgeyBvLnN0b3JhZ2UgPSAnd29vZm1hcmtfaW5wdXRfbW9kZSc7IH1cbiAgaWYgKG8uZmVuY2luZyA9PT0gdm9pZCAwKSB7IG8uZmVuY2luZyA9IHRydWU7IH1cbiAgaWYgKG8ucmVuZGVyID09PSB2b2lkIDApIHsgby5yZW5kZXIgPSB7fTsgfVxuICBpZiAoby5yZW5kZXIubW9kZXMgPT09IHZvaWQgMCkgeyBvLnJlbmRlci5tb2RlcyA9IHt9OyB9XG4gIGlmIChvLnJlbmRlci5jb21tYW5kcyA9PT0gdm9pZCAwKSB7IG8ucmVuZGVyLmNvbW1hbmRzID0ge307IH1cbiAgaWYgKG8ucHJvbXB0cyA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cyA9IHt9OyB9XG4gIGlmIChvLnByb21wdHMubGluayA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cy5saW5rID0gcHJvbXB0OyB9XG4gIGlmIChvLnByb21wdHMuaW1hZ2UgPT09IHZvaWQgMCkgeyBvLnByb21wdHMuaW1hZ2UgPSBwcm9tcHQ7IH1cbiAgaWYgKG8ucHJvbXB0cy5hdHRhY2htZW50ID09PSB2b2lkIDApIHsgby5wcm9tcHRzLmF0dGFjaG1lbnQgPSBwcm9tcHQ7IH1cbiAgaWYgKG8ucHJvbXB0cy5jbG9zZSA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cy5jbG9zZSA9IGNsb3NlUHJvbXB0czsgfVxuICBpZiAoby54aHIgPT09IHZvaWQgMCkgeyBvLnhociA9IHhoclN0dWI7IH1cbiAgaWYgKG8uY2xhc3NlcyA9PT0gdm9pZCAwKSB7IG8uY2xhc3NlcyA9IHt9OyB9XG4gIGlmIChvLmNsYXNzZXMud3lzaXd5ZyA9PT0gdm9pZCAwKSB7IG8uY2xhc3Nlcy53eXNpd3lnID0gW107IH1cbiAgaWYgKG8uY2xhc3Nlcy5wcm9tcHRzID09PSB2b2lkIDApIHsgby5jbGFzc2VzLnByb21wdHMgPSB7fTsgfVxuICBpZiAoby5jbGFzc2VzLmlucHV0ID09PSB2b2lkIDApIHsgby5jbGFzc2VzLmlucHV0ID0ge307IH1cblxuICB2YXIgcHJlZmVyZW5jZSA9IG8uc3RvcmFnZSAmJiBscy5nZXQoby5zdG9yYWdlKTtcbiAgaWYgKHByZWZlcmVuY2UpIHtcbiAgICBvLmRlZmF1bHRNb2RlID0gcHJlZmVyZW5jZTtcbiAgfVxuXG4gIHZhciBkcm9wYXJlYSA9IHRhZyh7IGM6ICd3ay1jb250YWluZXItZHJvcCcgfSk7XG4gIHZhciBzd2l0Y2hib2FyZCA9IHRhZyh7IGM6ICd3ay1zd2l0Y2hib2FyZCcgfSk7XG4gIHZhciBjb21tYW5kcyA9IHRhZyh7IGM6ICd3ay1jb21tYW5kcycgfSk7XG4gIHZhciBlZGl0YWJsZSA9IHRhZyh7IGM6IFsnd2std3lzaXd5ZycsICd3ay1oaWRlJ10uY29uY2F0KG8uY2xhc3Nlcy53eXNpd3lnKS5qb2luKCcgJykgfSk7XG4gIHZhciBzdXJmYWNlID0gZ2V0U3VyZmFjZSh0ZXh0YXJlYSwgZWRpdGFibGUsIGRyb3BhcmVhKTtcbiAgdmFyIGhpc3RvcnkgPSBuZXcgSW5wdXRIaXN0b3J5KHN1cmZhY2UsICdtYXJrZG93bicpO1xuICB2YXIgZWRpdG9yID0ge1xuICAgIGFkZENvbW1hbmQ6IGFkZENvbW1hbmQsXG4gICAgYWRkQ29tbWFuZEJ1dHRvbjogYWRkQ29tbWFuZEJ1dHRvbixcbiAgICBydW5Db21tYW5kOiBydW5Db21tYW5kLFxuICAgIHBhcnNlTWFya2Rvd246IG8ucGFyc2VNYXJrZG93bixcbiAgICBwYXJzZUhUTUw6IG8ucGFyc2VIVE1MLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgdmFsdWU6IGdldE1hcmtkb3duLFxuICAgIHRleHRhcmVhOiB0ZXh0YXJlYSxcbiAgICBlZGl0YWJsZTogby53eXNpd3lnID8gZWRpdGFibGUgOiBudWxsLFxuICAgIHNldE1vZGU6IHBlcnNpc3RNb2RlLFxuICAgIGhpc3Rvcnk6IHtcbiAgICAgIHVuZG86IGhpc3RvcnkudW5kbyxcbiAgICAgIHJlZG86IGhpc3RvcnkucmVkbyxcbiAgICAgIGNhblVuZG86IGhpc3RvcnkuY2FuVW5kbyxcbiAgICAgIGNhblJlZG86IGhpc3RvcnkuY2FuUmVkb1xuICAgIH0sXG4gICAgbW9kZTogJ21hcmtkb3duJ1xuICB9O1xuICB2YXIgZW50cnkgPSB7IHRhOiB0ZXh0YXJlYSwgZWRpdG9yOiBlZGl0b3IgfTtcbiAgdmFyIGkgPSBjYWNoZS5wdXNoKGVudHJ5KTtcbiAgdmFyIGthbnllQ29udGV4dCA9ICd3b29mbWFya18nICsgaTtcbiAgdmFyIGthbnllT3B0aW9ucyA9IHtcbiAgICBmaWx0ZXI6IHBhcmVudCxcbiAgICBjb250ZXh0OiBrYW55ZUNvbnRleHRcbiAgfTtcbiAgdmFyIG1vZGVzID0ge1xuICAgIG1hcmtkb3duOiB7XG4gICAgICBidXR0b246IHRhZyh7IHQ6ICdidXR0b24nLCBjOiAnd2stbW9kZSB3ay1tb2RlLWFjdGl2ZScgfSksXG4gICAgICBzZXQ6IG1hcmtkb3duTW9kZVxuICAgIH0sXG4gICAgaHRtbDoge1xuICAgICAgYnV0dG9uOiB0YWcoeyB0OiAnYnV0dG9uJywgYzogJ3drLW1vZGUgd2stbW9kZS1pbmFjdGl2ZScgfSksXG4gICAgICBzZXQ6IGh0bWxNb2RlXG4gICAgfSxcbiAgICB3eXNpd3lnOiB7XG4gICAgICBidXR0b246IHRhZyh7IHQ6ICdidXR0b24nLCBjOiAnd2stbW9kZSB3ay1tb2RlLWluYWN0aXZlJyB9KSxcbiAgICAgIHNldDogd3lzaXd5Z01vZGVcbiAgICB9XG4gIH07XG4gIHZhciBwbGFjZTtcblxuICB0YWcoeyB0OiAnc3BhbicsIGM6ICd3ay1kcm9wLXRleHQnLCB4OiBzdHJpbmdzLnByb21wdHMuZHJvcCwgcDogZHJvcGFyZWEgfSk7XG4gIHRhZyh7IHQ6ICdwJywgYzogWyd3ay1kcm9wLWljb24nXS5jb25jYXQoby5jbGFzc2VzLmRyb3BpY29uKS5qb2luKCcgJyksIHA6IGRyb3BhcmVhIH0pO1xuXG4gIGVkaXRhYmxlLmNvbnRlbnRFZGl0YWJsZSA9IHRydWU7XG4gIG1vZGVzLm1hcmtkb3duLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gIG1vZGVOYW1lcy5mb3JFYWNoKGFkZE1vZGUpO1xuXG4gIGlmIChvLnd5c2l3eWcpIHtcbiAgICBwbGFjZSA9IHRhZyh7IGM6ICd3ay13eXNpd3lnLXBsYWNlaG9sZGVyIHdrLWhpZGUnLCB4OiB0ZXh0YXJlYS5wbGFjZWhvbGRlciB9KTtcbiAgICBjcm9zc3ZlbnQuYWRkKHBsYWNlLCAnY2xpY2snLCBmb2N1c0VkaXRhYmxlKTtcbiAgfVxuXG4gIGlmIChvLmRlZmF1bHRNb2RlICYmIG9bby5kZWZhdWx0TW9kZV0pIHtcbiAgICBtb2Rlc1tvLmRlZmF1bHRNb2RlXS5zZXQoKTtcbiAgfSBlbHNlIGlmIChvLm1hcmtkb3duKSB7XG4gICAgbW9kZXMubWFya2Rvd24uc2V0KCk7XG4gIH0gZWxzZSBpZiAoby5odG1sKSB7XG4gICAgbW9kZXMuaHRtbC5zZXQoKTtcbiAgfSBlbHNlIHtcbiAgICBtb2Rlcy53eXNpd3lnLnNldCgpO1xuICB9XG5cbiAgYmluZENvbW1hbmRzKHN1cmZhY2UsIG8sIGVkaXRvcik7XG4gIGJpbmRFdmVudHMoKTtcblxuICByZXR1cm4gZWRpdG9yO1xuXG4gIGZ1bmN0aW9uIGFkZE1vZGUgKGlkKSB7XG4gICAgdmFyIGJ1dHRvbiA9IG1vZGVzW2lkXS5idXR0b247XG4gICAgdmFyIGN1c3RvbSA9IG8ucmVuZGVyLm1vZGVzO1xuICAgIGlmIChvW2lkXSkge1xuICAgICAgc3dpdGNoYm9hcmQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICh0eXBlb2YgY3VzdG9tID09PSAnZnVuY3Rpb24nID8gY3VzdG9tIDogcmVuZGVyZXJzLm1vZGVzKShidXR0b24sIGlkKTtcbiAgICAgIGNyb3NzdmVudC5hZGQoYnV0dG9uLCAnY2xpY2snLCBtb2Rlc1tpZF0uc2V0KTtcbiAgICAgIGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgICBidXR0b24udGFiSW5kZXggPSAtMTtcblxuICAgICAgdmFyIHRpdGxlID0gc3RyaW5ncy50aXRsZXNbaWRdO1xuICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgbWFjID8gbWFjaWZ5KHRpdGxlKSA6IHRpdGxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kRXZlbnRzIChyZW1vdmUpIHtcbiAgICB2YXIgYXIgPSByZW1vdmUgPyAncm0nIDogJ2FkZCc7XG4gICAgdmFyIG1vdiA9IHJlbW92ZSA/ICdyZW1vdmVDaGlsZCcgOiAnYXBwZW5kQ2hpbGQnO1xuICAgIGlmIChyZW1vdmUpIHtcbiAgICAgIGthbnllLmNsZWFyKGthbnllQ29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvLm1hcmtkb3duKSB7IGthbnllLm9uKCdjbWQrbScsIGthbnllT3B0aW9ucywgbWFya2Rvd25Nb2RlKTsgfVxuICAgICAgaWYgKG8uaHRtbCkgeyBrYW55ZS5vbignY21kK2gnLCBrYW55ZU9wdGlvbnMsIGh0bWxNb2RlKTsgfVxuICAgICAgaWYgKG8ud3lzaXd5ZykgeyBrYW55ZS5vbignY21kK3AnLCBrYW55ZU9wdGlvbnMsIHd5c2l3eWdNb2RlKTsgfVxuICAgIH1cbiAgICBjbGFzc2VzW2FyXShwYXJlbnQsICd3ay1jb250YWluZXInKTtcbiAgICBwYXJlbnRbbW92XShlZGl0YWJsZSk7XG4gICAgaWYgKHBsYWNlKSB7IHBhcmVudFttb3ZdKHBsYWNlKTsgfVxuICAgIHBhcmVudFttb3ZdKGNvbW1hbmRzKTtcbiAgICBwYXJlbnRbbW92XShzd2l0Y2hib2FyZCk7XG4gICAgaWYgKChvLmltYWdlcyB8fCBvLmF0dGFjaG1lbnRzKSAmJiBvLnhocikge1xuICAgICAgcGFyZW50W21vdl0oZHJvcGFyZWEpO1xuICAgICAgdXBsb2FkcyhwYXJlbnQsIGRyb3BhcmVhLCBlZGl0b3IsIG8sIHJlbW92ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgaWYgKGVkaXRvci5tb2RlICE9PSAnbWFya2Rvd24nKSB7XG4gICAgICB0ZXh0YXJlYS52YWx1ZSA9IGdldE1hcmtkb3duKCk7XG4gICAgfVxuICAgIGNsYXNzZXMucm0odGV4dGFyZWEsICd3ay1oaWRlJyk7XG4gICAgYmluZEV2ZW50cyh0cnVlKTtcbiAgICBkZWxldGUgY2FjaGVbaSAtIDFdO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFya2Rvd25Nb2RlIChlKSB7IHBlcnNpc3RNb2RlKCdtYXJrZG93bicsIGUpOyB9XG4gIGZ1bmN0aW9uIGh0bWxNb2RlIChlKSB7IHBlcnNpc3RNb2RlKCdodG1sJywgZSk7IH1cbiAgZnVuY3Rpb24gd3lzaXd5Z01vZGUgKGUpIHsgcGVyc2lzdE1vZGUoJ3d5c2l3eWcnLCBlKTsgfVxuXG4gIGZ1bmN0aW9uIHBlcnNpc3RNb2RlIChuZXh0TW9kZSwgZSkge1xuICAgIHZhciByZXN0b3JlU2VsZWN0aW9uO1xuICAgIHZhciBjdXJyZW50TW9kZSA9IGVkaXRvci5tb2RlO1xuICAgIHZhciBvbGQgPSBtb2Rlc1tjdXJyZW50TW9kZV0uYnV0dG9uO1xuICAgIHZhciBidXR0b24gPSBtb2Rlc1tuZXh0TW9kZV0uYnV0dG9uO1xuICAgIHZhciBmb2N1c2luZyA9ICEhZSB8fCBkb2MuYWN0aXZlRWxlbWVudCA9PT0gdGV4dGFyZWEgfHwgZG9jLmFjdGl2ZUVsZW1lbnQgPT09IGVkaXRhYmxlO1xuXG4gICAgc3RvcChlKTtcblxuICAgIGlmIChjdXJyZW50TW9kZSA9PT0gbmV4dE1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXN0b3JlU2VsZWN0aW9uID0gZm9jdXNpbmcgJiYgcmVtZW1iZXJTZWxlY3Rpb24oaGlzdG9yeSwgbyk7XG4gICAgdGV4dGFyZWEuYmx1cigpOyAvLyBhdmVydCBjaHJvbWUgcmVwYWludCBidWdzXG5cbiAgICBpZiAobmV4dE1vZGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgIGlmIChjdXJyZW50TW9kZSA9PT0gJ2h0bWwnKSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gby5wYXJzZUhUTUwodGV4dGFyZWEudmFsdWUpLnRyaW0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gby5wYXJzZUhUTUwoZWRpdGFibGUpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5leHRNb2RlID09PSAnaHRtbCcpIHtcbiAgICAgIGlmIChjdXJyZW50TW9kZSA9PT0gJ21hcmtkb3duJykge1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IG8ucGFyc2VNYXJrZG93bih0ZXh0YXJlYS52YWx1ZSkudHJpbSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBlZGl0YWJsZS5pbm5lckhUTUwudHJpbSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmV4dE1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgaWYgKGN1cnJlbnRNb2RlID09PSAnbWFya2Rvd24nKSB7XG4gICAgICAgIGVkaXRhYmxlLmlubmVySFRNTCA9IG8ucGFyc2VNYXJrZG93bih0ZXh0YXJlYS52YWx1ZSkucmVwbGFjZShycGFyYWdyYXBoLCAnJykudHJpbSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWRpdGFibGUuaW5uZXJIVE1MID0gdGV4dGFyZWEudmFsdWUucmVwbGFjZShycGFyYWdyYXBoLCAnJykudHJpbSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuZXh0TW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICBjbGFzc2VzLmFkZCh0ZXh0YXJlYSwgJ3drLWhpZGUnKTtcbiAgICAgIGNsYXNzZXMucm0oZWRpdGFibGUsICd3ay1oaWRlJyk7XG4gICAgICBpZiAocGxhY2UpIHsgY2xhc3Nlcy5ybShwbGFjZSwgJ3drLWhpZGUnKTsgfVxuICAgICAgaWYgKGZvY3VzaW5nKSB7IHNldFRpbWVvdXQoZm9jdXNFZGl0YWJsZSwgMCk7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhc3Nlcy5ybSh0ZXh0YXJlYSwgJ3drLWhpZGUnKTtcbiAgICAgIGNsYXNzZXMuYWRkKGVkaXRhYmxlLCAnd2staGlkZScpO1xuICAgICAgaWYgKHBsYWNlKSB7IGNsYXNzZXMuYWRkKHBsYWNlLCAnd2staGlkZScpOyB9XG4gICAgICBpZiAoZm9jdXNpbmcpIHsgdGV4dGFyZWEuZm9jdXMoKTsgfVxuICAgIH1cbiAgICBjbGFzc2VzLmFkZChidXR0b24sICd3ay1tb2RlLWFjdGl2ZScpO1xuICAgIGNsYXNzZXMucm0ob2xkLCAnd2stbW9kZS1hY3RpdmUnKTtcbiAgICBjbGFzc2VzLmFkZChvbGQsICd3ay1tb2RlLWluYWN0aXZlJyk7XG4gICAgY2xhc3Nlcy5ybShidXR0b24sICd3ay1tb2RlLWluYWN0aXZlJyk7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICBvbGQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIGVkaXRvci5tb2RlID0gbmV4dE1vZGU7XG5cbiAgICBpZiAoby5zdG9yYWdlKSB7IGxzLnNldChvLnN0b3JhZ2UsIG5leHRNb2RlKTsgfVxuXG4gICAgaGlzdG9yeS5zZXRJbnB1dE1vZGUobmV4dE1vZGUpO1xuICAgIGlmIChyZXN0b3JlU2VsZWN0aW9uKSB7IHJlc3RvcmVTZWxlY3Rpb24oKTsgfVxuICAgIGZpcmVMYXRlcignd29vZm1hcmstbW9kZS1jaGFuZ2UnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpcmVMYXRlciAodHlwZSkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gZmlyZSAoKSB7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKHRleHRhcmVhLCB0eXBlKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvY3VzRWRpdGFibGUgKCkge1xuICAgIGVkaXRhYmxlLmZvY3VzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNYXJrZG93biAoKSB7XG4gICAgaWYgKGVkaXRvci5tb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHJldHVybiBvLnBhcnNlSFRNTChlZGl0YWJsZSk7XG4gICAgfVxuICAgIGlmIChlZGl0b3IubW9kZSA9PT0gJ2h0bWwnKSB7XG4gICAgICByZXR1cm4gby5wYXJzZUhUTUwodGV4dGFyZWEudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dGFyZWEudmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDb21tYW5kQnV0dG9uIChpZCwgY29tYm8sIGZuKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGZuID0gY29tYm87XG4gICAgICBjb21ibyA9IG51bGw7XG4gICAgfVxuICAgIHZhciBidXR0b24gPSB0YWcoeyB0OiAnYnV0dG9uJywgYzogJ3drLWNvbW1hbmQnLCBwOiBjb21tYW5kcyB9KTtcbiAgICB2YXIgY3VzdG9tID0gby5yZW5kZXIuY29tbWFuZHM7XG4gICAgdmFyIHJlbmRlciA9IHR5cGVvZiBjdXN0b20gPT09ICdmdW5jdGlvbicgPyBjdXN0b20gOiByZW5kZXJlcnMuY29tbWFuZHM7XG4gICAgdmFyIHRpdGxlID0gc3RyaW5ncy50aXRsZXNbaWRdO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBtYWMgPyBtYWNpZnkodGl0bGUpIDogdGl0bGUpO1xuICAgIH1cbiAgICBidXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgIGJ1dHRvbi50YWJJbmRleCA9IC0xO1xuICAgIHJlbmRlcihidXR0b24sIGlkKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGJ1dHRvbiwgJ2NsaWNrJywgZ2V0Q29tbWFuZEhhbmRsZXIoc3VyZmFjZSwgaGlzdG9yeSwgZm4pKTtcbiAgICBpZiAoY29tYm8pIHtcbiAgICAgIGFkZENvbW1hbmQoY29tYm8sIGZuKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENvbW1hbmQgKGNvbWJvLCBmbikge1xuICAgIGthbnllLm9uKGNvbWJvLCBrYW55ZU9wdGlvbnMsIGdldENvbW1hbmRIYW5kbGVyKHN1cmZhY2UsIGhpc3RvcnksIGZuKSk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5Db21tYW5kIChmbikge1xuICAgIGdldENvbW1hbmRIYW5kbGVyKHN1cmZhY2UsIGhpc3RvcnksIHJlYXJyYW5nZSkobnVsbCk7XG4gICAgZnVuY3Rpb24gcmVhcnJhbmdlIChlLCBtb2RlLCBjaHVua3MpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGNodW5rcywgbW9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRhZyAob3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBlbCA9IGRvYy5jcmVhdGVFbGVtZW50KG8udCB8fCAnZGl2Jyk7XG4gIGVsLmNsYXNzTmFtZSA9IG8uYyB8fCAnJztcbiAgc2V0VGV4dChlbCwgby54IHx8ICcnKTtcbiAgaWYgKG8ucCkgeyBvLnAuYXBwZW5kQ2hpbGQoZWwpOyB9XG4gIHJldHVybiBlbDtcbn1cblxuZnVuY3Rpb24gc3RvcCAoZSkge1xuICBpZiAoZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IH1cbn1cblxuZnVuY3Rpb24gbWFjaWZ5ICh0ZXh0KSB7XG4gIHJldHVybiB0ZXh0XG4gICAgLnJlcGxhY2UoL1xcYmN0cmxcXGIvaSwgJ1xcdTIzMTgnKVxuICAgIC5yZXBsYWNlKC9cXGJhbHRcXGIvaSwgJ1xcdTIzMjUnKVxuICAgIC5yZXBsYWNlKC9cXGJzaGlmdFxcYi9pLCAnXFx1MjFlNycpO1xufVxuXG53b29mbWFyay5maW5kID0gZmluZDtcbndvb2ZtYXJrLnN0cmluZ3MgPSBzdHJpbmdzO1xubW9kdWxlLmV4cG9ydHMgPSB3b29mbWFyaztcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5M2IyOW1iV0Z5YXk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCc2N5QTlJSEpsY1hWcGNtVW9KMnh2WTJGc0xYTjBiM0poWjJVbktUdGNiblpoY2lCamNtOXpjM1psYm5RZ1BTQnlaWEYxYVhKbEtDZGpjbTl6YzNabGJuUW5LVHRjYm5aaGNpQnJZVzU1WlNBOUlISmxjWFZwY21Vb0oydGhibmxsSnlrN1hHNTJZWElnZFhCc2IyRmtjeUE5SUhKbGNYVnBjbVVvSnk0dmRYQnNiMkZrY3ljcE8xeHVkbUZ5SUhOMGNtbHVaM01nUFNCeVpYRjFhWEpsS0NjdUwzTjBjbWx1WjNNbktUdGNiblpoY2lCelpYUlVaWGgwSUQwZ2NtVnhkV2x5WlNnbkxpOXpaWFJVWlhoMEp5azdYRzUyWVhJZ2NtVnRaVzFpWlhKVFpXeGxZM1JwYjI0Z1BTQnlaWEYxYVhKbEtDY3VMM0psYldWdFltVnlVMlZzWldOMGFXOXVKeWs3WEc1MllYSWdZbWx1WkVOdmJXMWhibVJ6SUQwZ2NtVnhkV2x5WlNnbkxpOWlhVzVrUTI5dGJXRnVaSE1uS1R0Y2JuWmhjaUJKYm5CMWRFaHBjM1J2Y25rZ1BTQnlaWEYxYVhKbEtDY3VMMGx1Y0hWMFNHbHpkRzl5ZVNjcE8xeHVkbUZ5SUdkbGRFTnZiVzFoYm1SSVlXNWtiR1Z5SUQwZ2NtVnhkV2x5WlNnbkxpOW5aWFJEYjIxdFlXNWtTR0Z1Wkd4bGNpY3BPMXh1ZG1GeUlHZGxkRk4xY21aaFkyVWdQU0J5WlhGMWFYSmxLQ2N1TDJkbGRGTjFjbVpoWTJVbktUdGNiblpoY2lCamJHRnpjMlZ6SUQwZ2NtVnhkV2x5WlNnbkxpOWpiR0Z6YzJWekp5azdYRzUyWVhJZ2NtVnVaR1Z5WlhKeklEMGdjbVZ4ZFdseVpTZ25MaTl5Wlc1a1pYSmxjbk1uS1R0Y2JuWmhjaUI0YUhKVGRIVmlJRDBnY21WeGRXbHlaU2duTGk5NGFISlRkSFZpSnlrN1hHNTJZWElnY0hKdmJYQjBJRDBnY21WeGRXbHlaU2duTGk5d2NtOXRjSFJ6TDNCeWIyMXdkQ2NwTzF4dWRtRnlJR05zYjNObFVISnZiWEIwY3lBOUlISmxjWFZwY21Vb0p5NHZjSEp2YlhCMGN5OWpiRzl6WlNjcE8xeHVkbUZ5SUcxdlpHVk9ZVzFsY3lBOUlGc25iV0Z5YTJSdmQyNG5MQ0FuYUhSdGJDY3NJQ2QzZVhOcGQzbG5KMTA3WEc1MllYSWdZMkZqYUdVZ1BTQmJYVHRjYm5aaGNpQnRZV01nUFNBdlhGeGlUV0ZqSUU5VFhGeGlMeTUwWlhOMEtHZHNiMkpoYkM1dVlYWnBaMkYwYjNJdWRYTmxja0ZuWlc1MEtUdGNiblpoY2lCa2IyTWdQU0JrYjJOMWJXVnVkRHRjYm5aaGNpQnljR0Z5WVdkeVlYQm9JRDBnTDE0OGNENDhYRnd2Y0Q1Y1hHNC9KQzlwTzF4dVhHNW1kVzVqZEdsdmJpQm1hVzVrSUNoMFpYaDBZWEpsWVNrZ2UxeHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUdOaFkyaGxMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnYVdZZ0tHTmhZMmhsVzJsZElDWW1JR05oWTJobFcybGRMblJoSUQwOVBTQjBaWGgwWVhKbFlTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHTmhZMmhsVzJsZExtVmthWFJ2Y2p0Y2JpQWdJQ0I5WEc0Z0lIMWNiaUFnY21WMGRYSnVJRzUxYkd3N1hHNTlYRzVjYm1aMWJtTjBhVzl1SUhkdmIyWnRZWEpySUNoMFpYaDBZWEpsWVN3Z2IzQjBhVzl1Y3lrZ2UxeHVJQ0IyWVhJZ1kyRmphR1ZrSUQwZ1ptbHVaQ2gwWlhoMFlYSmxZU2s3WEc0Z0lHbG1JQ2hqWVdOb1pXUXBJSHRjYmlBZ0lDQnlaWFIxY200Z1kyRmphR1ZrTzF4dUlDQjlYRzVjYmlBZ2RtRnlJSEJoY21WdWRDQTlJSFJsZUhSaGNtVmhMbkJoY21WdWRFVnNaVzFsYm5RN1hHNGdJR2xtSUNod1lYSmxiblF1WTJocGJHUnlaVzR1YkdWdVozUm9JRDRnTVNrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduZDI5dlptMWhjbXNnWkdWdFlXNWtjeUE4ZEdWNGRHRnlaV0UrSUdWc1pXMWxiblJ6SUhSdklHaGhkbVVnYm04Z2MybGliR2x1WjNNbktUdGNiaUFnZlZ4dVhHNGdJSFpoY2lCdklEMGdiM0IwYVc5dWN5QjhmQ0I3ZlR0Y2JpQWdhV1lnS0c4dWJXRnlhMlJ2ZDI0Z1BUMDlJSFp2YVdRZ01Da2dleUJ2TG0xaGNtdGtiM2R1SUQwZ2RISjFaVHNnZlZ4dUlDQnBaaUFvYnk1b2RHMXNJRDA5UFNCMmIybGtJREFwSUhzZ2J5NW9kRzFzSUQwZ2RISjFaVHNnZlZ4dUlDQnBaaUFvYnk1M2VYTnBkM2xuSUQwOVBTQjJiMmxrSURBcElIc2dieTUzZVhOcGQzbG5JRDBnZEhKMVpUc2dmVnh1WEc0Z0lHbG1JQ2doYnk1dFlYSnJaRzkzYmlBbUppQWhieTVvZEcxc0lDWW1JQ0Z2TG5kNWMybDNlV2NwSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KM2R2YjJadFlYSnJJR1Y0Y0dWamRITWdZWFFnYkdWaGMzUWdiMjVsSUdsdWNIVjBJRzF2WkdVZ2RHOGdZbVVnWVhaaGFXeGhZbXhsSnlrN1hHNGdJSDFjYmx4dUlDQnBaaUFvYnk1b2NpQTlQVDBnZG05cFpDQXdLU0I3SUc4dWFISWdQU0JtWVd4elpUc2dmVnh1SUNCcFppQW9ieTV6ZEc5eVlXZGxJRDA5UFNCMmIybGtJREFwSUhzZ2J5NXpkRzl5WVdkbElEMGdkSEoxWlRzZ2ZWeHVJQ0JwWmlBb2J5NXpkRzl5WVdkbElEMDlQU0IwY25WbEtTQjdJRzh1YzNSdmNtRm5aU0E5SUNkM2IyOW1iV0Z5YTE5cGJuQjFkRjl0YjJSbEp6c2dmVnh1SUNCcFppQW9ieTVtWlc1amFXNW5JRDA5UFNCMmIybGtJREFwSUhzZ2J5NW1aVzVqYVc1bklEMGdkSEoxWlRzZ2ZWeHVJQ0JwWmlBb2J5NXlaVzVrWlhJZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG5KbGJtUmxjaUE5SUh0OU95QjlYRzRnSUdsbUlDaHZMbkpsYm1SbGNpNXRiMlJsY3lBOVBUMGdkbTlwWkNBd0tTQjdJRzh1Y21WdVpHVnlMbTF2WkdWeklEMGdlMzA3SUgxY2JpQWdhV1lnS0c4dWNtVnVaR1Z5TG1OdmJXMWhibVJ6SUQwOVBTQjJiMmxrSURBcElIc2dieTV5Wlc1a1pYSXVZMjl0YldGdVpITWdQU0I3ZlRzZ2ZWeHVJQ0JwWmlBb2J5NXdjbTl0Y0hSeklEMDlQU0IyYjJsa0lEQXBJSHNnYnk1d2NtOXRjSFJ6SUQwZ2UzMDdJSDFjYmlBZ2FXWWdLRzh1Y0hKdmJYQjBjeTVzYVc1cklEMDlQU0IyYjJsa0lEQXBJSHNnYnk1d2NtOXRjSFJ6TG14cGJtc2dQU0J3Y205dGNIUTdJSDFjYmlBZ2FXWWdLRzh1Y0hKdmJYQjBjeTVwYldGblpTQTlQVDBnZG05cFpDQXdLU0I3SUc4dWNISnZiWEIwY3k1cGJXRm5aU0E5SUhCeWIyMXdkRHNnZlZ4dUlDQnBaaUFvYnk1d2NtOXRjSFJ6TG1GMGRHRmphRzFsYm5RZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG5CeWIyMXdkSE11WVhSMFlXTm9iV1Z1ZENBOUlIQnliMjF3ZERzZ2ZWeHVJQ0JwWmlBb2J5NXdjbTl0Y0hSekxtTnNiM05sSUQwOVBTQjJiMmxrSURBcElIc2dieTV3Y205dGNIUnpMbU5zYjNObElEMGdZMnh2YzJWUWNtOXRjSFJ6T3lCOVhHNGdJR2xtSUNodkxuaG9jaUE5UFQwZ2RtOXBaQ0F3S1NCN0lHOHVlR2h5SUQwZ2VHaHlVM1IxWWpzZ2ZWeHVJQ0JwWmlBb2J5NWpiR0Z6YzJWeklEMDlQU0IyYjJsa0lEQXBJSHNnYnk1amJHRnpjMlZ6SUQwZ2UzMDdJSDFjYmlBZ2FXWWdLRzh1WTJ4aGMzTmxjeTUzZVhOcGQzbG5JRDA5UFNCMmIybGtJREFwSUhzZ2J5NWpiR0Z6YzJWekxuZDVjMmwzZVdjZ1BTQmJYVHNnZlZ4dUlDQnBaaUFvYnk1amJHRnpjMlZ6TG5CeWIyMXdkSE1nUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbU5zWVhOelpYTXVjSEp2YlhCMGN5QTlJSHQ5T3lCOVhHNGdJR2xtSUNodkxtTnNZWE56WlhNdWFXNXdkWFFnUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbU5zWVhOelpYTXVhVzV3ZFhRZ1BTQjdmVHNnZlZ4dVhHNGdJSFpoY2lCd2NtVm1aWEpsYm1ObElEMGdieTV6ZEc5eVlXZGxJQ1ltSUd4ekxtZGxkQ2h2TG5OMGIzSmhaMlVwTzF4dUlDQnBaaUFvY0hKbFptVnlaVzVqWlNrZ2UxeHVJQ0FnSUc4dVpHVm1ZWFZzZEUxdlpHVWdQU0J3Y21WbVpYSmxibU5sTzF4dUlDQjlYRzVjYmlBZ2RtRnlJR1J5YjNCaGNtVmhJRDBnZEdGbktIc2dZem9nSjNkckxXTnZiblJoYVc1bGNpMWtjbTl3SnlCOUtUdGNiaUFnZG1GeUlITjNhWFJqYUdKdllYSmtJRDBnZEdGbktIc2dZem9nSjNkckxYTjNhWFJqYUdKdllYSmtKeUI5S1R0Y2JpQWdkbUZ5SUdOdmJXMWhibVJ6SUQwZ2RHRm5LSHNnWXpvZ0ozZHJMV052YlcxaGJtUnpKeUI5S1R0Y2JpQWdkbUZ5SUdWa2FYUmhZbXhsSUQwZ2RHRm5LSHNnWXpvZ1d5ZDNheTEzZVhOcGQzbG5KeXdnSjNkckxXaHBaR1VuWFM1amIyNWpZWFFvYnk1amJHRnpjMlZ6TG5kNWMybDNlV2NwTG1wdmFXNG9KeUFuS1NCOUtUdGNiaUFnZG1GeUlITjFjbVpoWTJVZ1BTQm5aWFJUZFhKbVlXTmxLSFJsZUhSaGNtVmhMQ0JsWkdsMFlXSnNaU3dnWkhKdmNHRnlaV0VwTzF4dUlDQjJZWElnYUdsemRHOXllU0E5SUc1bGR5QkpibkIxZEVocGMzUnZjbmtvYzNWeVptRmpaU3dnSjIxaGNtdGtiM2R1SnlrN1hHNGdJSFpoY2lCbFpHbDBiM0lnUFNCN1hHNGdJQ0FnWVdSa1EyOXRiV0Z1WkRvZ1lXUmtRMjl0YldGdVpDeGNiaUFnSUNCaFpHUkRiMjF0WVc1a1FuVjBkRzl1T2lCaFpHUkRiMjF0WVc1a1FuVjBkRzl1TEZ4dUlDQWdJSEoxYmtOdmJXMWhibVE2SUhKMWJrTnZiVzFoYm1Rc1hHNGdJQ0FnY0dGeWMyVk5ZWEpyWkc5M2Jqb2dieTV3WVhKelpVMWhjbXRrYjNkdUxGeHVJQ0FnSUhCaGNuTmxTRlJOVERvZ2J5NXdZWEp6WlVoVVRVd3NYRzRnSUNBZ1pHVnpkSEp2ZVRvZ1pHVnpkSEp2ZVN4Y2JpQWdJQ0IyWVd4MVpUb2daMlYwVFdGeWEyUnZkMjRzWEc0Z0lDQWdkR1Y0ZEdGeVpXRTZJSFJsZUhSaGNtVmhMRnh1SUNBZ0lHVmthWFJoWW14bE9pQnZMbmQ1YzJsM2VXY2dQeUJsWkdsMFlXSnNaU0E2SUc1MWJHd3NYRzRnSUNBZ2MyVjBUVzlrWlRvZ2NHVnljMmx6ZEUxdlpHVXNYRzRnSUNBZ2FHbHpkRzl5ZVRvZ2UxeHVJQ0FnSUNBZ2RXNWtiem9nYUdsemRHOXllUzUxYm1SdkxGeHVJQ0FnSUNBZ2NtVmtiem9nYUdsemRHOXllUzV5WldSdkxGeHVJQ0FnSUNBZ1kyRnVWVzVrYnpvZ2FHbHpkRzl5ZVM1allXNVZibVJ2TEZ4dUlDQWdJQ0FnWTJGdVVtVmtiem9nYUdsemRHOXllUzVqWVc1U1pXUnZYRzRnSUNBZ2ZTeGNiaUFnSUNCdGIyUmxPaUFuYldGeWEyUnZkMjRuWEc0Z0lIMDdYRzRnSUhaaGNpQmxiblJ5ZVNBOUlIc2dkR0U2SUhSbGVIUmhjbVZoTENCbFpHbDBiM0k2SUdWa2FYUnZjaUI5TzF4dUlDQjJZWElnYVNBOUlHTmhZMmhsTG5CMWMyZ29aVzUwY25rcE8xeHVJQ0IyWVhJZ2EyRnVlV1ZEYjI1MFpYaDBJRDBnSjNkdmIyWnRZWEpyWHljZ0t5QnBPMXh1SUNCMllYSWdhMkZ1ZVdWUGNIUnBiMjV6SUQwZ2UxeHVJQ0FnSUdacGJIUmxjam9nY0dGeVpXNTBMRnh1SUNBZ0lHTnZiblJsZUhRNklHdGhibmxsUTI5dWRHVjRkRnh1SUNCOU8xeHVJQ0IyWVhJZ2JXOWtaWE1nUFNCN1hHNGdJQ0FnYldGeWEyUnZkMjQ2SUh0Y2JpQWdJQ0FnSUdKMWRIUnZiam9nZEdGbktIc2dkRG9nSjJKMWRIUnZiaWNzSUdNNklDZDNheTF0YjJSbElIZHJMVzF2WkdVdFlXTjBhWFpsSnlCOUtTeGNiaUFnSUNBZ0lITmxkRG9nYldGeWEyUnZkMjVOYjJSbFhHNGdJQ0FnZlN4Y2JpQWdJQ0JvZEcxc09pQjdYRzRnSUNBZ0lDQmlkWFIwYjI0NklIUmhaeWg3SUhRNklDZGlkWFIwYjI0bkxDQmpPaUFuZDJzdGJXOWtaU0IzYXkxdGIyUmxMV2x1WVdOMGFYWmxKeUI5S1N4Y2JpQWdJQ0FnSUhObGREb2dhSFJ0YkUxdlpHVmNiaUFnSUNCOUxGeHVJQ0FnSUhkNWMybDNlV2M2SUh0Y2JpQWdJQ0FnSUdKMWRIUnZiam9nZEdGbktIc2dkRG9nSjJKMWRIUnZiaWNzSUdNNklDZDNheTF0YjJSbElIZHJMVzF2WkdVdGFXNWhZM1JwZG1VbklIMHBMRnh1SUNBZ0lDQWdjMlYwT2lCM2VYTnBkM2xuVFc5a1pWeHVJQ0FnSUgxY2JpQWdmVHRjYmlBZ2RtRnlJSEJzWVdObE8xeHVYRzRnSUhSaFp5aDdJSFE2SUNkemNHRnVKeXdnWXpvZ0ozZHJMV1J5YjNBdGRHVjRkQ2NzSUhnNklITjBjbWx1WjNNdWNISnZiWEIwY3k1a2NtOXdMQ0J3T2lCa2NtOXdZWEpsWVNCOUtUdGNiaUFnZEdGbktIc2dkRG9nSjNBbkxDQmpPaUJiSjNkckxXUnliM0F0YVdOdmJpZGRMbU52Ym1OaGRDaHZMbU5zWVhOelpYTXVaSEp2Y0dsamIyNHBMbXB2YVc0b0p5QW5LU3dnY0RvZ1pISnZjR0Z5WldFZ2ZTazdYRzVjYmlBZ1pXUnBkR0ZpYkdVdVkyOXVkR1Z1ZEVWa2FYUmhZbXhsSUQwZ2RISjFaVHRjYmlBZ2JXOWtaWE11YldGeWEyUnZkMjR1WW5WMGRHOXVMbk5sZEVGMGRISnBZblYwWlNnblpHbHpZV0pzWldRbkxDQW5aR2x6WVdKc1pXUW5LVHRjYmlBZ2JXOWtaVTVoYldWekxtWnZja1ZoWTJnb1lXUmtUVzlrWlNrN1hHNWNiaUFnYVdZZ0tHOHVkM2x6YVhkNVp5a2dlMXh1SUNBZ0lIQnNZV05sSUQwZ2RHRm5LSHNnWXpvZ0ozZHJMWGQ1YzJsM2VXY3RjR3hoWTJWb2IyeGtaWElnZDJzdGFHbGtaU2NzSUhnNklIUmxlSFJoY21WaExuQnNZV05sYUc5c1pHVnlJSDBwTzF4dUlDQWdJR055YjNOemRtVnVkQzVoWkdRb2NHeGhZMlVzSUNkamJHbGpheWNzSUdadlkzVnpSV1JwZEdGaWJHVXBPMXh1SUNCOVhHNWNiaUFnYVdZZ0tHOHVaR1ZtWVhWc2RFMXZaR1VnSmlZZ2IxdHZMbVJsWm1GMWJIUk5iMlJsWFNrZ2UxeHVJQ0FnSUcxdlpHVnpXMjh1WkdWbVlYVnNkRTF2WkdWZExuTmxkQ2dwTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLRzh1YldGeWEyUnZkMjRwSUh0Y2JpQWdJQ0J0YjJSbGN5NXRZWEpyWkc5M2JpNXpaWFFvS1R0Y2JpQWdmU0JsYkhObElHbG1JQ2h2TG1oMGJXd3BJSHRjYmlBZ0lDQnRiMlJsY3k1b2RHMXNMbk5sZENncE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHMXZaR1Z6TG5kNWMybDNlV2N1YzJWMEtDazdYRzRnSUgxY2JseHVJQ0JpYVc1a1EyOXRiV0Z1WkhNb2MzVnlabUZqWlN3Z2J5d2daV1JwZEc5eUtUdGNiaUFnWW1sdVpFVjJaVzUwY3lncE8xeHVYRzRnSUhKbGRIVnliaUJsWkdsMGIzSTdYRzVjYmlBZ1puVnVZM1JwYjI0Z1lXUmtUVzlrWlNBb2FXUXBJSHRjYmlBZ0lDQjJZWElnWW5WMGRHOXVJRDBnYlc5a1pYTmJhV1JkTG1KMWRIUnZianRjYmlBZ0lDQjJZWElnWTNWemRHOXRJRDBnYnk1eVpXNWtaWEl1Ylc5a1pYTTdYRzRnSUNBZ2FXWWdLRzliYVdSZEtTQjdYRzRnSUNBZ0lDQnpkMmwwWTJoaWIyRnlaQzVoY0hCbGJtUkRhR2xzWkNoaWRYUjBiMjRwTzF4dUlDQWdJQ0FnS0hSNWNHVnZaaUJqZFhOMGIyMGdQVDA5SUNkbWRXNWpkR2x2YmljZ1B5QmpkWE4wYjIwZ09pQnlaVzVrWlhKbGNuTXViVzlrWlhNcEtHSjFkSFJ2Yml3Z2FXUXBPMXh1SUNBZ0lDQWdZM0p2YzNOMlpXNTBMbUZrWkNoaWRYUjBiMjRzSUNkamJHbGpheWNzSUcxdlpHVnpXMmxrWFM1elpYUXBPMXh1SUNBZ0lDQWdZblYwZEc5dUxuUjVjR1VnUFNBblluVjBkRzl1Snp0Y2JpQWdJQ0FnSUdKMWRIUnZiaTUwWVdKSmJtUmxlQ0E5SUMweE8xeHVYRzRnSUNBZ0lDQjJZWElnZEdsMGJHVWdQU0J6ZEhKcGJtZHpMblJwZEd4bGMxdHBaRjA3WEc0Z0lDQWdJQ0JwWmlBb2RHbDBiR1VwSUh0Y2JpQWdJQ0FnSUNBZ1luVjBkRzl1TG5ObGRFRjBkSEpwWW5WMFpTZ25kR2wwYkdVbkxDQnRZV01nUHlCdFlXTnBabmtvZEdsMGJHVXBJRG9nZEdsMGJHVXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR0pwYm1SRmRtVnVkSE1nS0hKbGJXOTJaU2tnZTF4dUlDQWdJSFpoY2lCaGNpQTlJSEpsYlc5MlpTQS9JQ2R5YlNjZ09pQW5ZV1JrSnp0Y2JpQWdJQ0IyWVhJZ2JXOTJJRDBnY21WdGIzWmxJRDhnSjNKbGJXOTJaVU5vYVd4a0p5QTZJQ2RoY0hCbGJtUkRhR2xzWkNjN1hHNGdJQ0FnYVdZZ0tISmxiVzkyWlNrZ2UxeHVJQ0FnSUNBZ2EyRnVlV1V1WTJ4bFlYSW9hMkZ1ZVdWRGIyNTBaWGgwS1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdhV1lnS0c4dWJXRnlhMlJ2ZDI0cElIc2dhMkZ1ZVdVdWIyNG9KMk50WkN0dEp5d2dhMkZ1ZVdWUGNIUnBiMjV6TENCdFlYSnJaRzkzYmsxdlpHVXBPeUI5WEc0Z0lDQWdJQ0JwWmlBb2J5NW9kRzFzS1NCN0lHdGhibmxsTG05dUtDZGpiV1FyYUNjc0lHdGhibmxsVDNCMGFXOXVjeXdnYUhSdGJFMXZaR1VwT3lCOVhHNGdJQ0FnSUNCcFppQW9ieTUzZVhOcGQzbG5LU0I3SUd0aGJubGxMbTl1S0NkamJXUXJjQ2NzSUd0aGJubGxUM0IwYVc5dWN5d2dkM2x6YVhkNVowMXZaR1VwT3lCOVhHNGdJQ0FnZlZ4dUlDQWdJR05zWVhOelpYTmJZWEpkS0hCaGNtVnVkQ3dnSjNkckxXTnZiblJoYVc1bGNpY3BPMXh1SUNBZ0lIQmhjbVZ1ZEZ0dGIzWmRLR1ZrYVhSaFlteGxLVHRjYmlBZ0lDQnBaaUFvY0d4aFkyVXBJSHNnY0dGeVpXNTBXMjF2ZGwwb2NHeGhZMlVwT3lCOVhHNGdJQ0FnY0dGeVpXNTBXMjF2ZGwwb1kyOXRiV0Z1WkhNcE8xeHVJQ0FnSUhCaGNtVnVkRnR0YjNaZEtITjNhWFJqYUdKdllYSmtLVHRjYmlBZ0lDQnBaaUFvS0c4dWFXMWhaMlZ6SUh4OElHOHVZWFIwWVdOb2JXVnVkSE1wSUNZbUlHOHVlR2h5S1NCN1hHNGdJQ0FnSUNCd1lYSmxiblJiYlc5MlhTaGtjbTl3WVhKbFlTazdYRzRnSUNBZ0lDQjFjR3h2WVdSektIQmhjbVZ1ZEN3Z1pISnZjR0Z5WldFc0lHVmthWFJ2Y2l3Z2J5d2djbVZ0YjNabEtUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmtaWE4wY205NUlDZ3BJSHRjYmlBZ0lDQnBaaUFvWldScGRHOXlMbTF2WkdVZ0lUMDlJQ2R0WVhKclpHOTNiaWNwSUh0Y2JpQWdJQ0FnSUhSbGVIUmhjbVZoTG5aaGJIVmxJRDBnWjJWMFRXRnlhMlJ2ZDI0b0tUdGNiaUFnSUNCOVhHNGdJQ0FnWTJ4aGMzTmxjeTV5YlNoMFpYaDBZWEpsWVN3Z0ozZHJMV2hwWkdVbktUdGNiaUFnSUNCaWFXNWtSWFpsYm5SektIUnlkV1VwTzF4dUlDQWdJR1JsYkdWMFpTQmpZV05vWlZ0cElDMGdNVjA3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCdFlYSnJaRzkzYmsxdlpHVWdLR1VwSUhzZ2NHVnljMmx6ZEUxdlpHVW9KMjFoY210a2IzZHVKeXdnWlNrN0lIMWNiaUFnWm5WdVkzUnBiMjRnYUhSdGJFMXZaR1VnS0dVcElIc2djR1Z5YzJsemRFMXZaR1VvSjJoMGJXd25MQ0JsS1RzZ2ZWeHVJQ0JtZFc1amRHbHZiaUIzZVhOcGQzbG5UVzlrWlNBb1pTa2dleUJ3WlhKemFYTjBUVzlrWlNnbmQzbHphWGQ1Wnljc0lHVXBPeUI5WEc1Y2JpQWdablZ1WTNScGIyNGdjR1Z5YzJsemRFMXZaR1VnS0c1bGVIUk5iMlJsTENCbEtTQjdYRzRnSUNBZ2RtRnlJSEpsYzNSdmNtVlRaV3hsWTNScGIyNDdYRzRnSUNBZ2RtRnlJR04xY25KbGJuUk5iMlJsSUQwZ1pXUnBkRzl5TG0xdlpHVTdYRzRnSUNBZ2RtRnlJRzlzWkNBOUlHMXZaR1Z6VzJOMWNuSmxiblJOYjJSbFhTNWlkWFIwYjI0N1hHNGdJQ0FnZG1GeUlHSjFkSFJ2YmlBOUlHMXZaR1Z6VzI1bGVIUk5iMlJsWFM1aWRYUjBiMjQ3WEc0Z0lDQWdkbUZ5SUdadlkzVnphVzVuSUQwZ0lTRmxJSHg4SUdSdll5NWhZM1JwZG1WRmJHVnRaVzUwSUQwOVBTQjBaWGgwWVhKbFlTQjhmQ0JrYjJNdVlXTjBhWFpsUld4bGJXVnVkQ0E5UFQwZ1pXUnBkR0ZpYkdVN1hHNWNiaUFnSUNCemRHOXdLR1VwTzF4dVhHNGdJQ0FnYVdZZ0tHTjFjbkpsYm5STmIyUmxJRDA5UFNCdVpYaDBUVzlrWlNrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJSDFjYmx4dUlDQWdJSEpsYzNSdmNtVlRaV3hsWTNScGIyNGdQU0JtYjJOMWMybHVaeUFtSmlCeVpXMWxiV0psY2xObGJHVmpkR2x2Ymlob2FYTjBiM0o1TENCdktUdGNiaUFnSUNCMFpYaDBZWEpsWVM1aWJIVnlLQ2s3SUM4dklHRjJaWEowSUdOb2NtOXRaU0J5WlhCaGFXNTBJR0oxWjNOY2JseHVJQ0FnSUdsbUlDaHVaWGgwVFc5a1pTQTlQVDBnSjIxaGNtdGtiM2R1SnlrZ2UxeHVJQ0FnSUNBZ2FXWWdLR04xY25KbGJuUk5iMlJsSUQwOVBTQW5hSFJ0YkNjcElIdGNiaUFnSUNBZ0lDQWdkR1Y0ZEdGeVpXRXVkbUZzZFdVZ1BTQnZMbkJoY25ObFNGUk5UQ2gwWlhoMFlYSmxZUzUyWVd4MVpTa3VkSEpwYlNncE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ2RHVjRkR0Z5WldFdWRtRnNkV1VnUFNCdkxuQmhjbk5sU0ZSTlRDaGxaR2wwWVdKc1pTa3VkSEpwYlNncE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb2JtVjRkRTF2WkdVZ1BUMDlJQ2RvZEcxc0p5a2dlMXh1SUNBZ0lDQWdhV1lnS0dOMWNuSmxiblJOYjJSbElEMDlQU0FuYldGeWEyUnZkMjRuS1NCN1hHNGdJQ0FnSUNBZ0lIUmxlSFJoY21WaExuWmhiSFZsSUQwZ2J5NXdZWEp6WlUxaGNtdGtiM2R1S0hSbGVIUmhjbVZoTG5aaGJIVmxLUzUwY21sdEtDazdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQjBaWGgwWVhKbFlTNTJZV3gxWlNBOUlHVmthWFJoWW14bExtbHVibVZ5U0ZSTlRDNTBjbWx0S0NrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNCbGJITmxJR2xtSUNodVpYaDBUVzlrWlNBOVBUMGdKM2Q1YzJsM2VXY25LU0I3WEc0Z0lDQWdJQ0JwWmlBb1kzVnljbVZ1ZEUxdlpHVWdQVDA5SUNkdFlYSnJaRzkzYmljcElIdGNiaUFnSUNBZ0lDQWdaV1JwZEdGaWJHVXVhVzV1WlhKSVZFMU1JRDBnYnk1d1lYSnpaVTFoY210a2IzZHVLSFJsZUhSaGNtVmhMblpoYkhWbEtTNXlaWEJzWVdObEtISndZWEpoWjNKaGNHZ3NJQ2NuS1M1MGNtbHRLQ2s3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0JsWkdsMFlXSnNaUzVwYm01bGNraFVUVXdnUFNCMFpYaDBZWEpsWVM1MllXeDFaUzV5WlhCc1lXTmxLSEp3WVhKaFozSmhjR2dzSUNjbktTNTBjbWx0S0NrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dVhHNGdJQ0FnYVdZZ0tHNWxlSFJOYjJSbElEMDlQU0FuZDNsemFYZDVaeWNwSUh0Y2JpQWdJQ0FnSUdOc1lYTnpaWE11WVdSa0tIUmxlSFJoY21WaExDQW5kMnN0YUdsa1pTY3BPMXh1SUNBZ0lDQWdZMnhoYzNObGN5NXliU2hsWkdsMFlXSnNaU3dnSjNkckxXaHBaR1VuS1R0Y2JpQWdJQ0FnSUdsbUlDaHdiR0ZqWlNrZ2V5QmpiR0Z6YzJWekxuSnRLSEJzWVdObExDQW5kMnN0YUdsa1pTY3BPeUI5WEc0Z0lDQWdJQ0JwWmlBb1ptOWpkWE5wYm1jcElIc2djMlYwVkdsdFpXOTFkQ2htYjJOMWMwVmthWFJoWW14bExDQXdLVHNnZlZ4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQmpiR0Z6YzJWekxuSnRLSFJsZUhSaGNtVmhMQ0FuZDJzdGFHbGtaU2NwTzF4dUlDQWdJQ0FnWTJ4aGMzTmxjeTVoWkdRb1pXUnBkR0ZpYkdVc0lDZDNheTFvYVdSbEp5azdYRzRnSUNBZ0lDQnBaaUFvY0d4aFkyVXBJSHNnWTJ4aGMzTmxjeTVoWkdRb2NHeGhZMlVzSUNkM2F5MW9hV1JsSnlrN0lIMWNiaUFnSUNBZ0lHbG1JQ2htYjJOMWMybHVaeWtnZXlCMFpYaDBZWEpsWVM1bWIyTjFjeWdwT3lCOVhHNGdJQ0FnZlZ4dUlDQWdJR05zWVhOelpYTXVZV1JrS0dKMWRIUnZiaXdnSjNkckxXMXZaR1V0WVdOMGFYWmxKeWs3WEc0Z0lDQWdZMnhoYzNObGN5NXliU2h2YkdRc0lDZDNheTF0YjJSbExXRmpkR2wyWlNjcE8xeHVJQ0FnSUdOc1lYTnpaWE11WVdSa0tHOXNaQ3dnSjNkckxXMXZaR1V0YVc1aFkzUnBkbVVuS1R0Y2JpQWdJQ0JqYkdGemMyVnpMbkp0S0dKMWRIUnZiaXdnSjNkckxXMXZaR1V0YVc1aFkzUnBkbVVuS1R0Y2JpQWdJQ0JpZFhSMGIyNHVjMlYwUVhSMGNtbGlkWFJsS0Nka2FYTmhZbXhsWkNjc0lDZGthWE5oWW14bFpDY3BPMXh1SUNBZ0lHOXNaQzV5WlcxdmRtVkJkSFJ5YVdKMWRHVW9KMlJwYzJGaWJHVmtKeWs3WEc0Z0lDQWdaV1JwZEc5eUxtMXZaR1VnUFNCdVpYaDBUVzlrWlR0Y2JseHVJQ0FnSUdsbUlDaHZMbk4wYjNKaFoyVXBJSHNnYkhNdWMyVjBLRzh1YzNSdmNtRm5aU3dnYm1WNGRFMXZaR1VwT3lCOVhHNWNiaUFnSUNCb2FYTjBiM0o1TG5ObGRFbHVjSFYwVFc5a1pTaHVaWGgwVFc5a1pTazdYRzRnSUNBZ2FXWWdLSEpsYzNSdmNtVlRaV3hsWTNScGIyNHBJSHNnY21WemRHOXlaVk5sYkdWamRHbHZiaWdwT3lCOVhHNGdJQ0FnWm1seVpVeGhkR1Z5S0NkM2IyOW1iV0Z5YXkxdGIyUmxMV05vWVc1blpTY3BPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWm1seVpVeGhkR1Z5SUNoMGVYQmxLU0I3WEc0Z0lDQWdjMlYwVkdsdFpXOTFkQ2htZFc1amRHbHZiaUJtYVhKbElDZ3BJSHRjYmlBZ0lDQWdJR055YjNOemRtVnVkQzVtWVdKeWFXTmhkR1VvZEdWNGRHRnlaV0VzSUhSNWNHVXBPMXh1SUNBZ0lIMHNJREFwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1ptOWpkWE5GWkdsMFlXSnNaU0FvS1NCN1hHNGdJQ0FnWldScGRHRmliR1V1Wm05amRYTW9LVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdkbGRFMWhjbXRrYjNkdUlDZ3BJSHRjYmlBZ0lDQnBaaUFvWldScGRHOXlMbTF2WkdVZ1BUMDlJQ2QzZVhOcGQzbG5KeWtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJRzh1Y0dGeWMyVklWRTFNS0dWa2FYUmhZbXhsS1R0Y2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0dWa2FYUnZjaTV0YjJSbElEMDlQU0FuYUhSdGJDY3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnZMbkJoY25ObFNGUk5UQ2gwWlhoMFlYSmxZUzUyWVd4MVpTazdYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGRIVnliaUIwWlhoMFlYSmxZUzUyWVd4MVpUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR0ZrWkVOdmJXMWhibVJDZFhSMGIyNGdLR2xrTENCamIyMWlieXdnWm00cElIdGNiaUFnSUNCcFppQW9ZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQTlQVDBnTWlrZ2UxeHVJQ0FnSUNBZ1ptNGdQU0JqYjIxaWJ6dGNiaUFnSUNBZ0lHTnZiV0p2SUQwZ2JuVnNiRHRjYmlBZ0lDQjlYRzRnSUNBZ2RtRnlJR0oxZEhSdmJpQTlJSFJoWnloN0lIUTZJQ2RpZFhSMGIyNG5MQ0JqT2lBbmQyc3RZMjl0YldGdVpDY3NJSEE2SUdOdmJXMWhibVJ6SUgwcE8xeHVJQ0FnSUhaaGNpQmpkWE4wYjIwZ1BTQnZMbkpsYm1SbGNpNWpiMjF0WVc1a2N6dGNiaUFnSUNCMllYSWdjbVZ1WkdWeUlEMGdkSGx3Wlc5bUlHTjFjM1J2YlNBOVBUMGdKMloxYm1OMGFXOXVKeUEvSUdOMWMzUnZiU0E2SUhKbGJtUmxjbVZ5Y3k1amIyMXRZVzVrY3p0Y2JpQWdJQ0IyWVhJZ2RHbDBiR1VnUFNCemRISnBibWR6TG5ScGRHeGxjMXRwWkYwN1hHNGdJQ0FnYVdZZ0tIUnBkR3hsS1NCN1hHNGdJQ0FnSUNCaWRYUjBiMjR1YzJWMFFYUjBjbWxpZFhSbEtDZDBhWFJzWlNjc0lHMWhZeUEvSUcxaFkybG1lU2gwYVhSc1pTa2dPaUIwYVhSc1pTazdYRzRnSUNBZ2ZWeHVJQ0FnSUdKMWRIUnZiaTUwZVhCbElEMGdKMkoxZEhSdmJpYzdYRzRnSUNBZ1luVjBkRzl1TG5SaFlrbHVaR1Y0SUQwZ0xURTdYRzRnSUNBZ2NtVnVaR1Z5S0dKMWRIUnZiaXdnYVdRcE8xeHVJQ0FnSUdOeWIzTnpkbVZ1ZEM1aFpHUW9ZblYwZEc5dUxDQW5ZMnhwWTJzbkxDQm5aWFJEYjIxdFlXNWtTR0Z1Wkd4bGNpaHpkWEptWVdObExDQm9hWE4wYjNKNUxDQm1iaWtwTzF4dUlDQWdJR2xtSUNoamIyMWlieWtnZTF4dUlDQWdJQ0FnWVdSa1EyOXRiV0Z1WkNoamIyMWlieXdnWm00cE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdZblYwZEc5dU8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdZV1JrUTI5dGJXRnVaQ0FvWTI5dFltOHNJR1p1S1NCN1hHNGdJQ0FnYTJGdWVXVXViMjRvWTI5dFltOHNJR3RoYm5sbFQzQjBhVzl1Y3l3Z1oyVjBRMjl0YldGdVpFaGhibVJzWlhJb2MzVnlabUZqWlN3Z2FHbHpkRzl5ZVN3Z1ptNHBLVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhKMWJrTnZiVzFoYm1RZ0tHWnVLU0I3WEc0Z0lDQWdaMlYwUTI5dGJXRnVaRWhoYm1Sc1pYSW9jM1Z5Wm1GalpTd2dhR2x6ZEc5eWVTd2djbVZoY25KaGJtZGxLU2h1ZFd4c0tUdGNiaUFnSUNCbWRXNWpkR2x2YmlCeVpXRnljbUZ1WjJVZ0tHVXNJRzF2WkdVc0lHTm9kVzVyY3lrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdadUxtTmhiR3dvZEdocGN5d2dZMmgxYm10ekxDQnRiMlJsS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z2RHRm5JQ2h2Y0hScGIyNXpLU0I3WEc0Z0lIWmhjaUJ2SUQwZ2IzQjBhVzl1Y3lCOGZDQjdmVHRjYmlBZ2RtRnlJR1ZzSUQwZ1pHOWpMbU55WldGMFpVVnNaVzFsYm5Rb2J5NTBJSHg4SUNka2FYWW5LVHRjYmlBZ1pXd3VZMnhoYzNOT1lXMWxJRDBnYnk1aklIeDhJQ2NuTzF4dUlDQnpaWFJVWlhoMEtHVnNMQ0J2TG5nZ2ZId2dKeWNwTzF4dUlDQnBaaUFvYnk1d0tTQjdJRzh1Y0M1aGNIQmxibVJEYUdsc1pDaGxiQ2s3SUgxY2JpQWdjbVYwZFhKdUlHVnNPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnpkRzl3SUNobEtTQjdYRzRnSUdsbUlDaGxLU0I3SUdVdWNISmxkbVZ1ZEVSbFptRjFiSFFvS1RzZ1pTNXpkRzl3VUhKdmNHRm5ZWFJwYjI0b0tUc2dmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnRZV05wWm5rZ0tIUmxlSFFwSUh0Y2JpQWdjbVYwZFhKdUlIUmxlSFJjYmlBZ0lDQXVjbVZ3YkdGalpTZ3ZYRnhpWTNSeWJGeGNZaTlwTENBblhGeDFNak14T0NjcFhHNGdJQ0FnTG5KbGNHeGhZMlVvTDF4Y1ltRnNkRnhjWWk5cExDQW5YRngxTWpNeU5TY3BYRzRnSUNBZ0xuSmxjR3hoWTJVb0wxeGNZbk5vYVdaMFhGeGlMMmtzSUNkY1hIVXlNV1UzSnlrN1hHNTlYRzVjYm5kdmIyWnRZWEpyTG1acGJtUWdQU0JtYVc1a08xeHVkMjl2Wm0xaGNtc3VjM1J5YVc1bmN5QTlJSE4wY21sdVozTTdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSGR2YjJadFlYSnJPMXh1SWwxOSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24geGhyU3R1YiAob3B0aW9ucykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1dvb2ZtYXJrIGlzIG1pc3NpbmcgWEhSIGNvbmZpZ3VyYXRpb24uIENhblxcJ3QgcmVxdWVzdCAnICsgb3B0aW9ucy51cmwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHhoclN0dWI7XG4iXX0=
