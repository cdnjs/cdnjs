!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.woofmark=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function atoa (a, n) { return Array.prototype.slice.call(a, n); }

},{}],2:[function(require,module,exports){
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

},{"./tailormade":3,"./throttle":4,"crossvent":10}],3:[function(require,module,exports){
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
},{"./throttle":4,"crossvent":10,"seleccion":28,"sell":30}],4:[function(require,module,exports){
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
'use strict';

var xhr = require('xhr');
var crossvent = require('crossvent');
var emitter = require('contra/emitter');
var validators = {
  image: isItAnImageFile
};
var rimagemime = /^image\/(gif|png|p?jpe?g)$/i;

function setup (fileinput, options) {
  var bureaucrat = create(options);
  crossvent.add(fileinput, 'change', handler, false);

  return bureaucrat;

  function handler (e) {
    stop(e);
    if (fileinput.files.length) {
      bureaucrat.submit(fileinput.files);
    }
    fileinput.value = '';
    fileinput.value = null;
  }
}

function create (options) {
  var o = options || {};
  o.formData = o.formData || {};
  var bureaucrat = emitter({
    submit: submit
  });
  return bureaucrat;

  function submit (rawFiles) {
    bureaucrat.emit('started', rawFiles);
    var allFiles = Array.prototype.slice.call(rawFiles);
    var validFiles = filter(allFiles);
    if (!validFiles) {
      bureaucrat.emit('invalid', allFiles);
      return;
    }
    bureaucrat.emit('valid', validFiles);
    var form = new FormData();
    Object.keys(o.formData).forEach(function copyFormData(key) {
      form.append(key, o.formData[key]);
    });
    var req = {
      'Content-Type': 'multipart/form-data',
      headers: {
        Accept: 'application/json'
      },
      method: o.method || 'PUT',
      url: o.endpoint || '/api/files',
      body: form
    };

    validFiles.forEach(appendFile);
    xhr(req, handleResponse);

    function appendFile (file) {
      form.append('uploads', file, file.name);
    }

    function handleResponse (err, res, body) {
      res.body = body = getData(body);
      var results = body && body.results && Array.isArray(body.results) ? body.results : [];
      var failed = err || res.statusCode < 200 || res.statusCode > 299 || body instanceof Error;
      if (failed) {
        bureaucrat.emit('error', err);
      } else {
        bureaucrat.emit('success', results, body);
      }
      bureaucrat.emit('ended', err, results, body);
    }
  }

  function filter (files) {
    return o.validate ? files.filter(whereValid) : files;
    function whereValid (file) {
      var validator = validators[o.validate] || o.validate;
      return validator(file);
    }
  }
}

function stop (e) {
  e.stopPropagation();
  e.preventDefault();
}

function isItAnImageFile (file) {
  return rimagemime.test(file.type);
}

function getData (body) {
  try {
    return JSON.parse(body);
  } catch (err) {
    return err;
  }
}

module.exports = {
  create: create,
  setup: setup
};

},{"contra/emitter":9,"crossvent":6,"xhr":33}],6:[function(require,module,exports){
(function (global){
'use strict';

var customEvent = require('custom-event');
var eventmap = require('./eventmap');
var doc = global.document;
var addEvent = addEventEasy;
var removeEvent = removeEventEasy;
var hardCache = [];

if (!global.addEventListener) {
  addEvent = addEventHard;
  removeEvent = removeEventHard;
}

module.exports = {
  add: addEvent,
  remove: removeEvent,
  fabricate: fabricateEvent
};

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
  var listener = unwrap(el, type, fn);
  if (listener) {
    return el.detachEvent('on' + type, listener);
  }
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9idXJlYXVjcmFjeS9ub2RlX21vZHVsZXMvY3Jvc3N2ZW50L3NyYy9jcm9zc3ZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3VzdG9tRXZlbnQgPSByZXF1aXJlKCdjdXN0b20tZXZlbnQnKTtcbnZhciBldmVudG1hcCA9IHJlcXVpcmUoJy4vZXZlbnRtYXAnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYWRkRXZlbnQgPSBhZGRFdmVudEVhc3k7XG52YXIgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEVhc3k7XG52YXIgaGFyZENhY2hlID0gW107XG5cbmlmICghZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgYWRkRXZlbnQgPSBhZGRFdmVudEhhcmQ7XG4gIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRIYXJkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRFdmVudCxcbiAgcmVtb3ZlOiByZW1vdmVFdmVudCxcbiAgZmFicmljYXRlOiBmYWJyaWNhdGVFdmVudFxufTtcblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgbGlzdGVuZXIgPSB1bndyYXAoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGxpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGVsLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlLCBtb2RlbCkge1xuICB2YXIgZSA9IGV2ZW50bWFwLmluZGV4T2YodHlwZSkgPT09IC0xID8gbWFrZUN1c3RvbUV2ZW50KCkgOiBtYWtlQ2xhc3NpY0V2ZW50KCk7XG4gIGlmIChlbC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDbGFzc2ljRXZlbnQgKCkge1xuICAgIHZhciBlO1xuICAgIGlmIChkb2MuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ3VzdG9tRXZlbnQgKCkge1xuICAgIHJldHVybiBuZXcgY3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWw6IG1vZGVsIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBmbi5jYWxsKGVsLCBlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciB3cmFwcGVyID0gdW53cmFwKGVsLCB0eXBlLCBmbikgfHwgd3JhcHBlckZhY3RvcnkoZWwsIHR5cGUsIGZuKTtcbiAgaGFyZENhY2hlLnB1c2goe1xuICAgIHdyYXBwZXI6IHdyYXBwZXIsXG4gICAgZWxlbWVudDogZWwsXG4gICAgdHlwZTogdHlwZSxcbiAgICBmbjogZm5cbiAgfSk7XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiB1bndyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSA9IGZpbmQoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgd3JhcHBlciA9IGhhcmRDYWNoZVtpXS53cmFwcGVyO1xuICAgIGhhcmRDYWNoZS5zcGxpY2UoaSwgMSk7IC8vIGZyZWUgdXAgYSB0YWQgb2YgbWVtb3J5XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpLCBpdGVtO1xuICBmb3IgKGkgPSAwOyBpIDwgaGFyZENhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbSA9IGhhcmRDYWNoZVtpXTtcbiAgICBpZiAoaXRlbS5lbGVtZW50ID09PSBlbCAmJiBpdGVtLnR5cGUgPT09IHR5cGUgJiYgaXRlbS5mbiA9PT0gZm4pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufVxuIl19
},{"./eventmap":7,"custom-event":12}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9idXJlYXVjcmFjeS9ub2RlX21vZHVsZXMvY3Jvc3N2ZW50L3NyYy9ldmVudG1hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXZlbnRtYXAgPSBbXTtcbnZhciBldmVudG5hbWUgPSAnJztcbnZhciByb24gPSAvXm9uLztcblxuZm9yIChldmVudG5hbWUgaW4gZ2xvYmFsKSB7XG4gIGlmIChyb24udGVzdChldmVudG5hbWUpKSB7XG4gICAgZXZlbnRtYXAucHVzaChldmVudG5hbWUuc2xpY2UoMikpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXZlbnRtYXA7XG4iXX0=
},{}],8:[function(require,module,exports){
'use strict';

var ticky = require('ticky');

module.exports = function debounce (fn, args, ctx) {
  if (!fn) { return; }
  ticky(function run () {
    fn.apply(ctx || null, args || []);
  });
};

},{"ticky":31}],9:[function(require,module,exports){
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

},{"./debounce":8,"atoa":1}],10:[function(require,module,exports){
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
},{"./eventmap":11,"custom-event":12}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9jdXN0b20tZXZlbnQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJcbnZhciBOYXRpdmVDdXN0b21FdmVudCA9IGdsb2JhbC5DdXN0b21FdmVudDtcblxuZnVuY3Rpb24gdXNlTmF0aXZlICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgcCA9IG5ldyBOYXRpdmVDdXN0b21FdmVudCgnY2F0JywgeyBkZXRhaWw6IHsgZm9vOiAnYmFyJyB9IH0pO1xuICAgIHJldHVybiAgJ2NhdCcgPT09IHAudHlwZSAmJiAnYmFyJyA9PT0gcC5kZXRhaWwuZm9vO1xuICB9IGNhdGNoIChlKSB7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENyb3NzLWJyb3dzZXIgYEN1c3RvbUV2ZW50YCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQuQ3VzdG9tRXZlbnRcbiAqXG4gKiBAcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB1c2VOYXRpdmUoKSA/IE5hdGl2ZUN1c3RvbUV2ZW50IDpcblxuLy8gSUUgPj0gOVxuJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUV2ZW50ID8gZnVuY3Rpb24gQ3VzdG9tRXZlbnQgKHR5cGUsIHBhcmFtcykge1xuICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICBpZiAocGFyYW1zKSB7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgfSBlbHNlIHtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIHZvaWQgMCk7XG4gIH1cbiAgcmV0dXJuIGU7XG59IDpcblxuLy8gSUUgPD0gOFxuZnVuY3Rpb24gQ3VzdG9tRXZlbnQgKHR5cGUsIHBhcmFtcykge1xuICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gIGUudHlwZSA9IHR5cGU7XG4gIGlmIChwYXJhbXMpIHtcbiAgICBlLmJ1YmJsZXMgPSBCb29sZWFuKHBhcmFtcy5idWJibGVzKTtcbiAgICBlLmNhbmNlbGFibGUgPSBCb29sZWFuKHBhcmFtcy5jYW5jZWxhYmxlKTtcbiAgICBlLmRldGFpbCA9IHBhcmFtcy5kZXRhaWw7XG4gIH0gZWxzZSB7XG4gICAgZS5idWJibGVzID0gZmFsc2U7XG4gICAgZS5jYW5jZWxhYmxlID0gZmFsc2U7XG4gICAgZS5kZXRhaWwgPSB2b2lkIDA7XG4gIH1cbiAgcmV0dXJuIGU7XG59XG4iXX0=
},{}],13:[function(require,module,exports){
var isFunction = require('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":15}],14:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzZWxmO1xufSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHt9O1xufVxuIl19
},{}],15:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],16:[function(require,module,exports){
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

},{"crossvent":10,"sektor":21}],17:[function(require,module,exports){
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
},{"./stub":18,"./tracking":19}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
var trim = require('trim')
  , forEach = require('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":13,"trim":32}],21:[function(require,module,exports){
(function (global){
'use strict';

var expando = 'sektor-' + Date.now();
var rsiblings = /[+~]/;
var document = global.document;
var del = document.documentElement || {};
var match = (
  del.matches ||
  del.webkitMatchesSelector ||
  del.mozMatchesSelector ||
  del.oMatchesSelector ||
  del.msMatchesSelector ||
  never
);

module.exports = sektor;

sektor.matches = matches;
sektor.matchesSelector = matchesSelector;

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

function sektor (selector, ctx, collection, seed) {
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
  return sektor(selector, null, null, elements);
}

function matchesSelector (element, selector) {
  return match.call(element, selector);
}

function never () { return false; }

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zZWt0b3Ivc3JjL3Nla3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBleHBhbmRvID0gJ3Nla3Rvci0nICsgRGF0ZS5ub3coKTtcbnZhciByc2libGluZ3MgPSAvWyt+XS87XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgZGVsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IHt9O1xudmFyIG1hdGNoID0gKFxuICBkZWwubWF0Y2hlcyB8fFxuICBkZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG4gIGRlbC5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgZGVsLm9NYXRjaGVzU2VsZWN0b3IgfHxcbiAgZGVsLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XG4gIG5ldmVyXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNla3Rvcjtcblxuc2VrdG9yLm1hdGNoZXMgPSBtYXRjaGVzO1xuc2VrdG9yLm1hdGNoZXNTZWxlY3RvciA9IG1hdGNoZXNTZWxlY3RvcjtcblxuZnVuY3Rpb24gcXNhIChzZWxlY3RvciwgY29udGV4dCkge1xuICB2YXIgZXhpc3RlZCwgaWQsIHByZWZpeCwgcHJlZml4ZWQsIGFkYXB0ZXIsIGhhY2sgPSBjb250ZXh0ICE9PSBkb2N1bWVudDtcbiAgaWYgKGhhY2spIHsgLy8gaWQgaGFjayBmb3IgY29udGV4dC1yb290ZWQgcXVlcmllc1xuICAgIGV4aXN0ZWQgPSBjb250ZXh0LmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICBpZCA9IGV4aXN0ZWQgfHwgZXhwYW5kbztcbiAgICBwcmVmaXggPSAnIycgKyBpZCArICcgJztcbiAgICBwcmVmaXhlZCA9IHByZWZpeCArIHNlbGVjdG9yLnJlcGxhY2UoLywvZywgJywnICsgcHJlZml4KTtcbiAgICBhZGFwdGVyID0gcnNpYmxpbmdzLnRlc3Qoc2VsZWN0b3IpICYmIGNvbnRleHQucGFyZW50Tm9kZTtcbiAgICBpZiAoIWV4aXN0ZWQpIHsgY29udGV4dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpOyB9XG4gIH1cbiAgdHJ5IHtcbiAgICByZXR1cm4gKGFkYXB0ZXIgfHwgY29udGV4dCkucXVlcnlTZWxlY3RvckFsbChwcmVmaXhlZCB8fCBzZWxlY3Rvcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gW107XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGV4aXN0ZWQgPT09IG51bGwpIHsgY29udGV4dC5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7IH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzZWt0b3IgKHNlbGVjdG9yLCBjdHgsIGNvbGxlY3Rpb24sIHNlZWQpIHtcbiAgdmFyIGVsZW1lbnQ7XG4gIHZhciBjb250ZXh0ID0gY3R4IHx8IGRvY3VtZW50O1xuICB2YXIgcmVzdWx0cyA9IGNvbGxlY3Rpb24gfHwgW107XG4gIHZhciBpID0gMDtcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuICBpZiAoY29udGV4dC5ub2RlVHlwZSAhPT0gMSAmJiBjb250ZXh0Lm5vZGVUeXBlICE9PSA5KSB7XG4gICAgcmV0dXJuIFtdOyAvLyBiYWlsIGlmIGNvbnRleHQgaXMgbm90IGFuIGVsZW1lbnQgb3IgZG9jdW1lbnRcbiAgfVxuICBpZiAoc2VlZCkge1xuICAgIHdoaWxlICgoZWxlbWVudCA9IHNlZWRbaSsrXSkpIHtcbiAgICAgIGlmIChtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0cy5wdXNoLmFwcGx5KHJlc3VsdHMsIHFzYShzZWxlY3RvciwgY29udGV4dCkpO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVzIChzZWxlY3RvciwgZWxlbWVudHMpIHtcbiAgcmV0dXJuIHNla3RvcihzZWxlY3RvciwgbnVsbCwgbnVsbCwgZWxlbWVudHMpO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IgKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gIHJldHVybiBtYXRjaC5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gbmV2ZXIgKCkgeyByZXR1cm4gZmFsc2U7IH1cbiJdfQ==
},{}],22:[function(require,module,exports){
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
},{"./getSelectionNullOp":23,"./getSelectionRaw":24,"./getSelectionSynthetic":25,"./isHost":26}],23:[function(require,module,exports){
'use strict';

function noop () {}

function getSelectionNullOp () {
  return {
    removeAllRanges: noop,
    addRange: noop
  };
}

module.exports = getSelectionNullOp;

},{}],24:[function(require,module,exports){
(function (global){
'use strict';

function getSelectionRaw () {
  return global.getSelection();
}

module.exports = getSelectionRaw;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvblJhdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb25SYXcgKCkge1xuICByZXR1cm4gZ2xvYmFsLmdldFNlbGVjdGlvbigpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvblJhdztcbiJdfQ==
},{}],25:[function(require,module,exports){
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
},{"./rangeToTextRange":27}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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
},{}],28:[function(require,module,exports){
'use strict';

var getSelection = require('./getSelection');
var setSelection = require('./setSelection');

module.exports = {
  get: getSelection,
  set: setSelection
};

},{"./getSelection":22,"./setSelection":29}],29:[function(require,module,exports){
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
},{"./getSelection":22,"./rangeToTextRange":27}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
var si = typeof setImmediate === 'function', tick;
if (si) {
  tick = function (fn) { setImmediate(fn); };
} else {
  tick = function (fn) { setTimeout(fn, 0); };
}

module.exports = tick;
},{}],32:[function(require,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],33:[function(require,module,exports){
"use strict";
var window = require("global/window")
var isFunction = require("is-function")
var parseHeaders = require("parse-headers")
var xtend = require("xtend")

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    var callback = options.callback
    if(typeof callback === "undefined"){
        throw new Error("callback argument missing")
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            loadFunc()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    var failureResponse = {
                body: undefined,
                headers: {},
                statusCode: 0,
                method: method,
                url: uri,
                rawRequest: xhr
            }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        callback(evt, failureResponse)
        callback = noop
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        callback(err, response, response.body)
        callback = noop

    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data || null
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer

    if ("json" in options) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            aborted=true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr


}

function getXml(xhr) {
    if (xhr.responseType === "document") {
        return xhr.responseXML
    }
    var firefoxBugTakenEffect = xhr.status === 204 && xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
        return xhr.responseXML
    }

    return null
}

function noop() {}

},{"global/window":14,"is-function":15,"parse-headers":20,"xtend":34}],34:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],35:[function(require,module,exports){
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

},{"./InputState":36,"crossvent":10}],36:[function(require,module,exports){
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
},{"./fixEOL":43,"./html/HtmlChunks":47,"./isVisibleElement":56,"./markdown/MarkdownChunks":58}],37:[function(require,module,exports){
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

},{"./html/blockquote":48,"./html/boldOrItalic":49,"./html/codeblock":50,"./html/heading":51,"./html/hr":52,"./html/linkOrImageOrAttachment":53,"./html/list":54,"./markdown/blockquote":59,"./markdown/boldOrItalic":60,"./markdown/codeblock":61,"./markdown/heading":62,"./markdown/hr":63,"./markdown/linkOrImageOrAttachment":64,"./markdown/list":65,"crossvent":10}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
'use strict';

function fixEOL (text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

module.exports = fixEOL;

},{}],44:[function(require,module,exports){
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

},{"./InputState":36}],45:[function(require,module,exports){
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
},{"./cast":38,"./fixEOL":43,"./many":57,"seleccion":28}],46:[function(require,module,exports){
'use strict';

function getText (el) {
  return el.innerText || el.textContent;
}

module.exports = getText;

},{}],47:[function(require,module,exports){
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

},{"../chunks/trim":40}],48:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function blockquote (chunks) {
  wrapping('blockquote', strings.placeholders.quote, chunks);
}

module.exports = blockquote;

},{"../strings":75,"./wrapping":55}],49:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function boldOrItalic (chunks, type) {
  wrapping(type === 'bold' ? 'strong' : 'em', strings.placeholders[type], chunks);
}

module.exports = boldOrItalic;

},{"../strings":75,"./wrapping":55}],50:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function codeblock (chunks) {
  wrapping('pre><code', strings.placeholders.code, chunks);
}

module.exports = codeblock;

},{"../strings":75,"./wrapping":55}],51:[function(require,module,exports){
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

},{"../strings":75}],52:[function(require,module,exports){
'use strict';

function hr (chunks) {
  chunks.before += '\n<hr>\n';
  chunks.selection = '';
}

module.exports = hr;

},{}],53:[function(require,module,exports){
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
    var links = result.definitions.map(parseLinkInput).filter(long);
    if (links.length === 0) {
      resume(); return;
    }
    var link = links[0];

    if (type === 'attachment') {
      parts = options.mergeHtmlAndAttachment(chunks.before + chunks.selection + chunks.after, link);
      chunks.before = parts.before;
      chunks.selection = parts.selection;
      chunks.after = parts.after;
      resume();
      crossvent.fabricate(options.surface.textarea, 'woofmark-mode-change');
      return;
    }

    if (image) {
      imageWrap(link, links.slice(1));
    } else {
      linkWrap(link, links.slice(1));
    }

    if (!chunks.selection) {
      chunks.selection = strings.placeholders[type];
    }
    resume();

    function long (link) {
      return link.href.length > 0;
    }

    function getTitle (link) {
      return link.title ? ' title="' + link.title + '"' : '';
    }

    function imageWrap (link, rest) {
      var after = chunks.after;
      chunks.before += tagopen(link);
      chunks.after = tagclose(link);
      if (rest.length) {
        chunks.after += rest.map(toAnotherImage).join('');
      }
      chunks.after += after;
      function tagopen (link) { return '<img src="' + link.href + '" alt="'; }
      function tagclose (link) { return '"' + getTitle(link) + ' />'; }
      function toAnotherImage (link) { return ' ' + tagopen(link) + tagclose(link); }
    }

    function linkWrap (link, rest) {
      var after = chunks.after;
      var names = options.classes.input.links;
      var classes = names ? ' class="' + names + '"' : '';
      chunks.before += tagopen(link);
      chunks.after = tagclose();
      if (rest.length) {
        chunks.after += rest.map(toAnotherLink).join('');
      }
      chunks.after += after;
      function tagopen (link) { return '<a href="' + link.href + '"' + getTitle(link) + classes + '>'; }
      function tagclose () { return '</a>'; }
      function toAnotherLink (link) { return ' ' + tagopen(link) + tagclose(); }
    }
  }
}

module.exports = linkOrImageOrAttachment;

},{"../chunks/parseLinkInput":39,"../once":68,"../strings":75,"crossvent":10}],54:[function(require,module,exports){
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

},{"../strings":75}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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
},{}],57:[function(require,module,exports){
'use strict';

function many (text, times) {
  return new Array(times + 1).join(text);
}

module.exports = many;

},{}],58:[function(require,module,exports){
'use strict';

var many = require('../many');
var extendRegExp = require('../extendRegExp');
var trimChunks = require('../chunks/trim');

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
  this.startTag = this.startTag + RegExp.$1;
  this.selection = this.selection.replace(/(\n*$)/, '');
  this.endTag = this.endTag + RegExp.$1;
  this.startTag = this.startTag.replace(/(^\n*)/, '');
  this.before = this.before + RegExp.$1;
  this.endTag = this.endTag.replace(/(\n*$)/, '');
  this.after = this.after + RegExp.$1;

  if (this.before) {
    this.before = replace(this.before, ++beforeCount, '$');
  }

  if (this.after) {
    this.after = replace(this.after, ++afterCount, '');
  }

  function replace (text, count, suffix) {
    var regex = o.any ? '\\n*' : many('\\n?', count);
    var replacement = many('\n', count);
    return text.replace(new RegExp(regex + suffix), replacement);
  }
};

module.exports = MarkdownChunks;

},{"../chunks/trim":40,"../extendRegExp":42,"../many":57}],59:[function(require,module,exports){
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

},{"../strings":75,"./settings":66,"./wrapping":67}],60:[function(require,module,exports){
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

},{"../strings":75}],61:[function(require,module,exports){
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

},{"../strings":75}],62:[function(require,module,exports){
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

},{"../many":57,"../strings":75}],63:[function(require,module,exports){
'use strict';

function hr (chunks) {
  chunks.startTag = '----------\n';
  chunks.selection = '';
  chunks.skip({ left: 2, right: 1, any: true });
}

module.exports = hr;

},{}],64:[function(require,module,exports){
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

function pushDefinition (options) {
  var chunks = options.chunks;
  var definition = options.definition;
  var attachment = options.attachment;
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
    pushDefinition({ chunks: chunks });
    return;
  }

  chunks.selection = chunks.startTag + chunks.selection + chunks.endTag;
  chunks.startTag = chunks.endTag = '';

  if (/\n\n/.test(chunks.selection)) {
    pushDefinition({ chunks: chunks });
    return;
  }
  resume = this.async();

  options.prompts.close();
  (options.prompts[type] || options.prompts.link)(options, once(resolved));

  function resolved (result) {
    var links = result
      .definitions
      .map(parseLinkInput)
      .filter(long);

    links.forEach(renderLink);
    resume();

    function renderLink (link, i) {
      chunks.selection = (' ' + chunks.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, '$1\\').substr(1);

      var key = result.attachment ? '  [attachment-9999]: ' : ' [9999]: ';
      var definition = key + link.href + (link.title ? ' "' + link.title + '"' : '');
      var anchor = pushDefinition({
        chunks: chunks,
        definition: definition,
        attachment: result.attachment
      });

      if (!result.attachment) {
        add();
      }

      function add () {
        chunks.startTag = image ? '![' : '[';
        chunks.endTag = '][' + anchor + ']';

        if (!chunks.selection) {
          chunks.selection = strings.placeholders[type];
        }

        if (i < links.length - 1) { // has multiple links, not the last one
          chunks.before += chunks.startTag + chunks.selection + chunks.endTag + '\n';
        }
      }
    }

    function long (link) {
      return link.href.length > 0;
    }
  }
}

module.exports = linkOrImageOrAttachment;

},{"../chunks/parseLinkInput":39,"../once":68,"../strings":75}],65:[function(require,module,exports){
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

},{"../many":57,"../strings":75,"./settings":66,"./wrapping":67}],66:[function(require,module,exports){
'use strict';

module.exports = {
  lineLength: 72
};

},{}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var bureaucracy = require('bureaucracy');
var render = require('./render');
var classes = require('../classes');
var strings = require('../strings');
var uploads = require('../uploads');
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
var dragClass = 'wk-dragging';
var dragClassSpecific = 'wk-prompt-upload-dragging';
var root = document.documentElement;

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

  var upload = options.upload;
  if (typeof upload === 'string') {
    upload = { url: upload };
  }

  var bureaucrat = null;
  if (upload) {
    bureaucrat = arrangeUploads();
    if (options.autoUpload) {
      bureaucrat.submit(options.autoUpload);
    }
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
    done({ definitions: [dom.input.value] });
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
    crossvent.add(domup.area, 'dragover', handleDragOver, false);
    crossvent.add(domup.area, 'drop', handleFileSelect, false);
    classify(domup, options.classes.prompts);

    var bureaucrat = bureaucracy.setup(domup.fileinput, {
      method: upload.method,
      formData: upload.formData,
      endpoint: upload.url,
      validate: 'image'
    });

    bureaucrat.on('started', function () {
      classes.rm(domup.failed, 'wk-prompt-error-show');
      classes.rm(domup.warning, 'wk-prompt-error-show');
    });
    bureaucrat.on('valid', function () {
      classes.add(domup.area, 'wk-prompt-uploading');
    });
    bureaucrat.on('invalid', function () {
      classes.add(domup.warning, 'wk-prompt-error-show');
    });
    bureaucrat.on('error', function () {
      classes.add(domup.failed, 'wk-prompt-error-show');
    });
    bureaucrat.on('success', receivedImages);
    bureaucrat.on('ended', function () {
      classes.rm(domup.area, 'wk-prompt-uploading');
    });

    return bureaucrat;

    function receivedImages (results) {
      var body = results[0];
      dom.input.value = body.href + ' "' + body.title + '"';
      remove();
      done({
        definitions: results.map(toDefinition),
        attachment: options.type === 'attachment'
      });
      function toDefinition (result) {
        return result.href + ' "' + result.title + '"';
      }
    }
  }

  function handleDragOver (e) {
    stop(e);
    e.dataTransfer.dropEffect = 'copy';
  }

  function handleFileSelect (e) {
    dragstop();
    stop(e);
    bureaucrat.submit(e.dataTransfer.files);
  }

  function stop (e) {
    e.stopPropagation();
    e.preventDefault();
  }
}

module.exports = prompt;

},{"../classes":41,"../strings":75,"../uploads":76,"./render":71,"bureaucracy":5,"crossvent":10}],71:[function(require,module,exports){
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
  domup.fileinput.multiple = 'multiple';
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9wcm9tcHRzL3JlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBnZXRUZXh0ID0gcmVxdWlyZSgnLi4vZ2V0VGV4dCcpO1xudmFyIHNldFRleHQgPSByZXF1aXJlKCcuLi9zZXRUZXh0Jyk7XG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4uL2NsYXNzZXMnKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIGFjID0gJ2FwcGVuZENoaWxkJztcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG5cbmZ1bmN0aW9uIGUgKHR5cGUsIGNscywgdGV4dCkge1xuICB2YXIgZWwgPSBkb2MuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgZWwuY2xhc3NOYW1lID0gY2xzO1xuICBpZiAodGV4dCkge1xuICAgIHNldFRleHQoZWwsIHRleHQpO1xuICB9XG4gIHJldHVybiBlbDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyIChvcHRpb25zKSB7XG4gIHZhciBkb20gPSB7XG4gICAgZGlhbG9nOiBlKCdhcnRpY2xlJywgJ3drLXByb21wdCAnICsgb3B0aW9ucy5pZCksXG4gICAgY2xvc2U6IGUoJ2EnLCAnd2stcHJvbXB0LWNsb3NlJyksXG4gICAgaGVhZGVyOiBlKCdoZWFkZXInLCAnd2stcHJvbXB0LWhlYWRlcicpLFxuICAgIGgxOiBlKCdoMScsICd3ay1wcm9tcHQtdGl0bGUnLCBvcHRpb25zLnRpdGxlKSxcbiAgICBzZWN0aW9uOiBlKCdzZWN0aW9uJywgJ3drLXByb21wdC1ib2R5JyksXG4gICAgZGVzYzogZSgncCcsICd3ay1wcm9tcHQtZGVzY3JpcHRpb24nLCBvcHRpb25zLmRlc2NyaXB0aW9uKSxcbiAgICBpbnB1dENvbnRhaW5lcjogZSgnZGl2JywgJ3drLXByb21wdC1pbnB1dC1jb250YWluZXInKSxcbiAgICBpbnB1dDogZSgnaW5wdXQnLCAnd2stcHJvbXB0LWlucHV0JyksXG4gICAgY2FuY2VsOiBlKCdidXR0b24nLCAnd2stcHJvbXB0LWNhbmNlbCcsICdDYW5jZWwnKSxcbiAgICBvazogZSgnYnV0dG9uJywgJ3drLXByb21wdC1vaycsICdPaycpLFxuICAgIGZvb3RlcjogZSgnZm9vdGVyJywgJ3drLXByb21wdC1idXR0b25zJylcbiAgfTtcbiAgZG9tLm9rLnR5cGUgPSAnYnV0dG9uJztcbiAgZG9tLmhlYWRlclthY10oZG9tLmgxKTtcbiAgZG9tLnNlY3Rpb25bYWNdKGRvbS5kZXNjKTtcbiAgZG9tLnNlY3Rpb25bYWNdKGRvbS5pbnB1dENvbnRhaW5lcik7XG4gIGRvbS5pbnB1dENvbnRhaW5lclthY10oZG9tLmlucHV0KTtcbiAgZG9tLmlucHV0LnBsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlcjtcbiAgZG9tLmNhbmNlbC50eXBlID0gJ2J1dHRvbic7XG4gIGRvbS5mb290ZXJbYWNdKGRvbS5jYW5jZWwpO1xuICBkb20uZm9vdGVyW2FjXShkb20ub2spO1xuICBkb20uZGlhbG9nW2FjXShkb20uY2xvc2UpO1xuICBkb20uZGlhbG9nW2FjXShkb20uaGVhZGVyKTtcbiAgZG9tLmRpYWxvZ1thY10oZG9tLnNlY3Rpb24pO1xuICBkb20uZGlhbG9nW2FjXShkb20uZm9vdGVyKTtcbiAgZG9jLmJvZHlbYWNdKGRvbS5kaWFsb2cpO1xuICByZXR1cm4gZG9tO1xufVxuXG5mdW5jdGlvbiB1cGxvYWRzIChkb20sIHdhcm5pbmcpIHtcbiAgdmFyIGZ1cCA9ICd3ay1wcm9tcHQtZmlsZXVwbG9hZCc7XG4gIHZhciBkb211cCA9IHtcbiAgICBhcmVhOiBlKCdzZWN0aW9uJywgJ3drLXByb21wdC11cGxvYWQtYXJlYScpLFxuICAgIHdhcm5pbmc6IGUoJ3AnLCAnd2stcHJvbXB0LWVycm9yIHdrLXdhcm5pbmcnLCB3YXJuaW5nKSxcbiAgICBmYWlsZWQ6IGUoJ3AnLCAnd2stcHJvbXB0LWVycm9yIHdrLWZhaWxlZCcsIHN0cmluZ3MucHJvbXB0cy51cGxvYWRmYWlsZWQpLFxuICAgIHVwbG9hZDogZSgnbGFiZWwnLCAnd2stcHJvbXB0LXVwbG9hZCcpLFxuICAgIHVwbG9hZGluZzogZSgnc3BhbicsICd3ay1wcm9tcHQtcHJvZ3Jlc3MnLCBzdHJpbmdzLnByb21wdHMudXBsb2FkaW5nKSxcbiAgICBkcm9wOiBlKCdzcGFuJywgJ3drLXByb21wdC1kcm9wJywgc3RyaW5ncy5wcm9tcHRzLmRyb3ApLFxuICAgIGRyb3BpY29uOiBlKCdwJywgJ3drLWRyb3AtaWNvbiB3ay1wcm9tcHQtZHJvcC1pY29uJyksXG4gICAgYnJvd3NlOiBlKCdzcGFuJywgJ3drLXByb21wdC1icm93c2UnLCBzdHJpbmdzLnByb21wdHMuYnJvd3NlKSxcbiAgICBkcmFnZHJvcDogZSgncCcsICd3ay1wcm9tcHQtZHJhZ2Ryb3AnLCBzdHJpbmdzLnByb21wdHMuZHJvcGhpbnQpLFxuICAgIGZpbGVpbnB1dDogZSgnaW5wdXQnLCBmdXApXG4gIH07XG4gIGRvbXVwLmFyZWFbYWNdKGRvbXVwLmRyb3ApO1xuICBkb211cC5hcmVhW2FjXShkb211cC51cGxvYWRpbmcpO1xuICBkb211cC5hcmVhW2FjXShkb211cC5kcm9waWNvbik7XG4gIGRvbXVwLnVwbG9hZFthY10oZG9tdXAuYnJvd3NlKTtcbiAgZG9tdXAudXBsb2FkW2FjXShkb211cC5maWxlaW5wdXQpO1xuICBkb211cC5maWxlaW5wdXQuaWQgPSBmdXA7XG4gIGRvbXVwLmZpbGVpbnB1dC50eXBlID0gJ2ZpbGUnO1xuICBkb211cC5maWxlaW5wdXQubXVsdGlwbGUgPSAnbXVsdGlwbGUnO1xuICBkb20uZGlhbG9nLmNsYXNzTmFtZSArPSAnIHdrLXByb21wdC11cGxvYWRzJztcbiAgZG9tLmlucHV0Q29udGFpbmVyLmNsYXNzTmFtZSArPSAnIHdrLXByb21wdC1pbnB1dC1jb250YWluZXItdXBsb2Fkcyc7XG4gIGRvbS5pbnB1dC5jbGFzc05hbWUgKz0gJyB3ay1wcm9tcHQtaW5wdXQtdXBsb2Fkcyc7XG4gIGRvbS5zZWN0aW9uLmluc2VydEJlZm9yZShkb211cC53YXJuaW5nLCBkb20uaW5wdXRDb250YWluZXIpO1xuICBkb20uc2VjdGlvbi5pbnNlcnRCZWZvcmUoZG9tdXAuZmFpbGVkLCBkb20uaW5wdXRDb250YWluZXIpO1xuICBkb20uc2VjdGlvblthY10oZG9tdXAudXBsb2FkKTtcbiAgZG9tLnNlY3Rpb25bYWNdKGRvbXVwLmRyYWdkcm9wKTtcbiAgZG9tLnNlY3Rpb25bYWNdKGRvbXVwLmFyZWEpO1xuICBzZXRUZXh0KGRvbS5kZXNjLCBnZXRUZXh0KGRvbS5kZXNjKSArIHN0cmluZ3MucHJvbXB0cy51cGxvYWQpO1xuICBjcm9zc3ZlbnQuYWRkKGRvbXVwLmZpbGVpbnB1dCwgJ2ZvY3VzJywgZm9jdXNlZEZpbGVJbnB1dCk7XG4gIGNyb3NzdmVudC5hZGQoZG9tdXAuZmlsZWlucHV0LCAnYmx1cicsIGJsdXJyZWRGaWxlSW5wdXQpO1xuXG4gIGZ1bmN0aW9uIGZvY3VzZWRGaWxlSW5wdXQgKCkge1xuICAgIGNsYXNzZXMuYWRkKGRvbXVwLnVwbG9hZCwgJ3drLWZvY3VzZWQnKTtcbiAgfVxuICBmdW5jdGlvbiBibHVycmVkRmlsZUlucHV0ICgpIHtcbiAgICBjbGFzc2VzLnJtKGRvbXVwLnVwbG9hZCwgJ3drLWZvY3VzZWQnKTtcbiAgfVxuICByZXR1cm4gZG9tdXA7XG59XG5cbnJlbmRlci51cGxvYWRzID0gdXBsb2Fkcztcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyO1xuIl19
},{"../classes":41,"../getText":46,"../setText":74,"../strings":75,"crossvent":10}],72:[function(require,module,exports){
'use strict';

var bullseye = require('bullseye');

function rememberSelection (history) {
  var code = Math.random().toString(18).substr(2).replace(/\d+/g, '');
  var open = 'WoofmarkSelectionOpenMarker' + code;
  var close = 'WoofmarkSelectionCloseMarker' + code;
  var rmarkers = new RegExp(open + '|' + close, 'g');
  return {
    markers: markers(),
    unmark: unmark
  };

  function markers () {
    var state = history.reset().inputState;
    var chunks = state.getChunks();
    var selectionStart = chunks.before.length;
    var selectionEnd = selectionStart + chunks.selection.length;
    return [[selectionStart, open], [selectionEnd, close]];
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
}

module.exports = rememberSelection;

},{"bullseye":2}],73:[function(require,module,exports){
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

},{"./setText":74,"./strings":75}],74:[function(require,module,exports){
'use strict';

function setText (el, value) {
  el.innerText = el.textContent = value;
}

module.exports = setText;

},{}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{"./classes":41,"crossvent":10}],77:[function(require,module,exports){
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
    value: getOrSetValue,
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
    if (o.images || o.attachments) {
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
    var remembrance;
    var currentMode = editor.mode;
    var old = modes[currentMode].button;
    var button = modes[nextMode].button;
    var focusing = !!e || doc.activeElement === textarea || doc.activeElement === editable;

    stop(e);

    if (currentMode === nextMode) {
      return;
    }

    remembrance = focusing && rememberSelection(history, o);
    textarea.blur(); // avert chrome repaint bugs

    if (nextMode === 'markdown') {
      if (currentMode === 'html') {
        textarea.value = parse('parseHTML', textarea.value).trim();
      } else {
        textarea.value = parse('parseHTML', editable).trim();
      }
    } else if (nextMode === 'html') {
      if (currentMode === 'markdown') {
        textarea.value = parse('parseMarkdown', textarea.value).trim();
      } else {
        textarea.value = editable.innerHTML.trim();
      }
    } else if (nextMode === 'wysiwyg') {
      if (currentMode === 'markdown') {
        editable.innerHTML = parse('parseMarkdown', textarea.value).replace(rparagraph, '').trim();
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
    if (remembrance) { remembrance.unmark(); }
    fireLater('woofmark-mode-change');

    function parse (method, input) {
      return o[method](input, {
        markers: remembrance && remembrance.markers || []
      });
    }
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

  function getOrSetValue (input) {
    var markdown = String(input);
    var sets = arguments.length === 1;
    if (sets) {
      if (editor.mode === 'wysiwyg') {
        editable.innerHTML = asHtml();
      } else {
        textarea.value = editor.mode === 'html' ? asHtml() : markdown;
      }
      history.reset();
    }
    return getMarkdown();
    function asHtml () {
      return o.parseMarkdown(markdown);
    }
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy93b29mbWFyay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBscyA9IHJlcXVpcmUoJ2xvY2FsLXN0b3JhZ2UnKTtcbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBrYW55ZSA9IHJlcXVpcmUoJ2thbnllJyk7XG52YXIgdXBsb2FkcyA9IHJlcXVpcmUoJy4vdXBsb2FkcycpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuL3N0cmluZ3MnKTtcbnZhciBzZXRUZXh0ID0gcmVxdWlyZSgnLi9zZXRUZXh0Jyk7XG52YXIgcmVtZW1iZXJTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3JlbWVtYmVyU2VsZWN0aW9uJyk7XG52YXIgYmluZENvbW1hbmRzID0gcmVxdWlyZSgnLi9iaW5kQ29tbWFuZHMnKTtcbnZhciBJbnB1dEhpc3RvcnkgPSByZXF1aXJlKCcuL0lucHV0SGlzdG9yeScpO1xudmFyIGdldENvbW1hbmRIYW5kbGVyID0gcmVxdWlyZSgnLi9nZXRDb21tYW5kSGFuZGxlcicpO1xudmFyIGdldFN1cmZhY2UgPSByZXF1aXJlKCcuL2dldFN1cmZhY2UnKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi9jbGFzc2VzJyk7XG52YXIgcmVuZGVyZXJzID0gcmVxdWlyZSgnLi9yZW5kZXJlcnMnKTtcbnZhciBwcm9tcHQgPSByZXF1aXJlKCcuL3Byb21wdHMvcHJvbXB0Jyk7XG52YXIgY2xvc2VQcm9tcHRzID0gcmVxdWlyZSgnLi9wcm9tcHRzL2Nsb3NlJyk7XG52YXIgbW9kZU5hbWVzID0gWydtYXJrZG93bicsICdodG1sJywgJ3d5c2l3eWcnXTtcbnZhciBjYWNoZSA9IFtdO1xudmFyIG1hYyA9IC9cXGJNYWMgT1NcXGIvLnRlc3QoZ2xvYmFsLm5hdmlnYXRvci51c2VyQWdlbnQpO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIHJwYXJhZ3JhcGggPSAvXjxwPjxcXC9wPlxcbj8kL2k7XG5cbmZ1bmN0aW9uIGZpbmQgKHRleHRhcmVhKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoY2FjaGVbaV0gJiYgY2FjaGVbaV0udGEgPT09IHRleHRhcmVhKSB7XG4gICAgICByZXR1cm4gY2FjaGVbaV0uZWRpdG9yO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gd29vZm1hcmsgKHRleHRhcmVhLCBvcHRpb25zKSB7XG4gIHZhciBjYWNoZWQgPSBmaW5kKHRleHRhcmVhKTtcbiAgaWYgKGNhY2hlZCkge1xuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cblxuICB2YXIgcGFyZW50ID0gdGV4dGFyZWEucGFyZW50RWxlbWVudDtcbiAgaWYgKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b29mbWFyayBkZW1hbmRzIDx0ZXh0YXJlYT4gZWxlbWVudHMgdG8gaGF2ZSBubyBzaWJsaW5ncycpO1xuICB9XG5cbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuICBpZiAoby5tYXJrZG93biA9PT0gdm9pZCAwKSB7IG8ubWFya2Rvd24gPSB0cnVlOyB9XG4gIGlmIChvLmh0bWwgPT09IHZvaWQgMCkgeyBvLmh0bWwgPSB0cnVlOyB9XG4gIGlmIChvLnd5c2l3eWcgPT09IHZvaWQgMCkgeyBvLnd5c2l3eWcgPSB0cnVlOyB9XG5cbiAgaWYgKCFvLm1hcmtkb3duICYmICFvLmh0bWwgJiYgIW8ud3lzaXd5Zykge1xuICAgIHRocm93IG5ldyBFcnJvcignd29vZm1hcmsgZXhwZWN0cyBhdCBsZWFzdCBvbmUgaW5wdXQgbW9kZSB0byBiZSBhdmFpbGFibGUnKTtcbiAgfVxuXG4gIGlmIChvLmhyID09PSB2b2lkIDApIHsgby5ociA9IGZhbHNlOyB9XG4gIGlmIChvLnN0b3JhZ2UgPT09IHZvaWQgMCkgeyBvLnN0b3JhZ2UgPSB0cnVlOyB9XG4gIGlmIChvLnN0b3JhZ2UgPT09IHRydWUpIHsgby5zdG9yYWdlID0gJ3dvb2ZtYXJrX2lucHV0X21vZGUnOyB9XG4gIGlmIChvLmZlbmNpbmcgPT09IHZvaWQgMCkgeyBvLmZlbmNpbmcgPSB0cnVlOyB9XG4gIGlmIChvLnJlbmRlciA9PT0gdm9pZCAwKSB7IG8ucmVuZGVyID0ge307IH1cbiAgaWYgKG8ucmVuZGVyLm1vZGVzID09PSB2b2lkIDApIHsgby5yZW5kZXIubW9kZXMgPSB7fTsgfVxuICBpZiAoby5yZW5kZXIuY29tbWFuZHMgPT09IHZvaWQgMCkgeyBvLnJlbmRlci5jb21tYW5kcyA9IHt9OyB9XG4gIGlmIChvLnByb21wdHMgPT09IHZvaWQgMCkgeyBvLnByb21wdHMgPSB7fTsgfVxuICBpZiAoby5wcm9tcHRzLmxpbmsgPT09IHZvaWQgMCkgeyBvLnByb21wdHMubGluayA9IHByb21wdDsgfVxuICBpZiAoby5wcm9tcHRzLmltYWdlID09PSB2b2lkIDApIHsgby5wcm9tcHRzLmltYWdlID0gcHJvbXB0OyB9XG4gIGlmIChvLnByb21wdHMuYXR0YWNobWVudCA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cy5hdHRhY2htZW50ID0gcHJvbXB0OyB9XG4gIGlmIChvLnByb21wdHMuY2xvc2UgPT09IHZvaWQgMCkgeyBvLnByb21wdHMuY2xvc2UgPSBjbG9zZVByb21wdHM7IH1cbiAgaWYgKG8uY2xhc3NlcyA9PT0gdm9pZCAwKSB7IG8uY2xhc3NlcyA9IHt9OyB9XG4gIGlmIChvLmNsYXNzZXMud3lzaXd5ZyA9PT0gdm9pZCAwKSB7IG8uY2xhc3Nlcy53eXNpd3lnID0gW107IH1cbiAgaWYgKG8uY2xhc3Nlcy5wcm9tcHRzID09PSB2b2lkIDApIHsgby5jbGFzc2VzLnByb21wdHMgPSB7fTsgfVxuICBpZiAoby5jbGFzc2VzLmlucHV0ID09PSB2b2lkIDApIHsgby5jbGFzc2VzLmlucHV0ID0ge307IH1cblxuICB2YXIgcHJlZmVyZW5jZSA9IG8uc3RvcmFnZSAmJiBscy5nZXQoby5zdG9yYWdlKTtcbiAgaWYgKHByZWZlcmVuY2UpIHtcbiAgICBvLmRlZmF1bHRNb2RlID0gcHJlZmVyZW5jZTtcbiAgfVxuXG4gIHZhciBkcm9wYXJlYSA9IHRhZyh7IGM6ICd3ay1jb250YWluZXItZHJvcCcgfSk7XG4gIHZhciBzd2l0Y2hib2FyZCA9IHRhZyh7IGM6ICd3ay1zd2l0Y2hib2FyZCcgfSk7XG4gIHZhciBjb21tYW5kcyA9IHRhZyh7IGM6ICd3ay1jb21tYW5kcycgfSk7XG4gIHZhciBlZGl0YWJsZSA9IHRhZyh7IGM6IFsnd2std3lzaXd5ZycsICd3ay1oaWRlJ10uY29uY2F0KG8uY2xhc3Nlcy53eXNpd3lnKS5qb2luKCcgJykgfSk7XG4gIHZhciBzdXJmYWNlID0gZ2V0U3VyZmFjZSh0ZXh0YXJlYSwgZWRpdGFibGUsIGRyb3BhcmVhKTtcbiAgdmFyIGhpc3RvcnkgPSBuZXcgSW5wdXRIaXN0b3J5KHN1cmZhY2UsICdtYXJrZG93bicpO1xuICB2YXIgZWRpdG9yID0ge1xuICAgIGFkZENvbW1hbmQ6IGFkZENvbW1hbmQsXG4gICAgYWRkQ29tbWFuZEJ1dHRvbjogYWRkQ29tbWFuZEJ1dHRvbixcbiAgICBydW5Db21tYW5kOiBydW5Db21tYW5kLFxuICAgIHBhcnNlTWFya2Rvd246IG8ucGFyc2VNYXJrZG93bixcbiAgICBwYXJzZUhUTUw6IG8ucGFyc2VIVE1MLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgdmFsdWU6IGdldE9yU2V0VmFsdWUsXG4gICAgdGV4dGFyZWE6IHRleHRhcmVhLFxuICAgIGVkaXRhYmxlOiBvLnd5c2l3eWcgPyBlZGl0YWJsZSA6IG51bGwsXG4gICAgc2V0TW9kZTogcGVyc2lzdE1vZGUsXG4gICAgaGlzdG9yeToge1xuICAgICAgdW5kbzogaGlzdG9yeS51bmRvLFxuICAgICAgcmVkbzogaGlzdG9yeS5yZWRvLFxuICAgICAgY2FuVW5kbzogaGlzdG9yeS5jYW5VbmRvLFxuICAgICAgY2FuUmVkbzogaGlzdG9yeS5jYW5SZWRvXG4gICAgfSxcbiAgICBtb2RlOiAnbWFya2Rvd24nXG4gIH07XG4gIHZhciBlbnRyeSA9IHsgdGE6IHRleHRhcmVhLCBlZGl0b3I6IGVkaXRvciB9O1xuICB2YXIgaSA9IGNhY2hlLnB1c2goZW50cnkpO1xuICB2YXIga2FueWVDb250ZXh0ID0gJ3dvb2ZtYXJrXycgKyBpO1xuICB2YXIga2FueWVPcHRpb25zID0ge1xuICAgIGZpbHRlcjogcGFyZW50LFxuICAgIGNvbnRleHQ6IGthbnllQ29udGV4dFxuICB9O1xuICB2YXIgbW9kZXMgPSB7XG4gICAgbWFya2Rvd246IHtcbiAgICAgIGJ1dHRvbjogdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1tb2RlIHdrLW1vZGUtYWN0aXZlJyB9KSxcbiAgICAgIHNldDogbWFya2Rvd25Nb2RlXG4gICAgfSxcbiAgICBodG1sOiB7XG4gICAgICBidXR0b246IHRhZyh7IHQ6ICdidXR0b24nLCBjOiAnd2stbW9kZSB3ay1tb2RlLWluYWN0aXZlJyB9KSxcbiAgICAgIHNldDogaHRtbE1vZGVcbiAgICB9LFxuICAgIHd5c2l3eWc6IHtcbiAgICAgIGJ1dHRvbjogdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1tb2RlIHdrLW1vZGUtaW5hY3RpdmUnIH0pLFxuICAgICAgc2V0OiB3eXNpd3lnTW9kZVxuICAgIH1cbiAgfTtcbiAgdmFyIHBsYWNlO1xuXG4gIHRhZyh7IHQ6ICdzcGFuJywgYzogJ3drLWRyb3AtdGV4dCcsIHg6IHN0cmluZ3MucHJvbXB0cy5kcm9wLCBwOiBkcm9wYXJlYSB9KTtcbiAgdGFnKHsgdDogJ3AnLCBjOiBbJ3drLWRyb3AtaWNvbiddLmNvbmNhdChvLmNsYXNzZXMuZHJvcGljb24pLmpvaW4oJyAnKSwgcDogZHJvcGFyZWEgfSk7XG5cbiAgZWRpdGFibGUuY29udGVudEVkaXRhYmxlID0gdHJ1ZTtcbiAgbW9kZXMubWFya2Rvd24uYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgbW9kZU5hbWVzLmZvckVhY2goYWRkTW9kZSk7XG5cbiAgaWYgKG8ud3lzaXd5Zykge1xuICAgIHBsYWNlID0gdGFnKHsgYzogJ3drLXd5c2l3eWctcGxhY2Vob2xkZXIgd2staGlkZScsIHg6IHRleHRhcmVhLnBsYWNlaG9sZGVyIH0pO1xuICAgIGNyb3NzdmVudC5hZGQocGxhY2UsICdjbGljaycsIGZvY3VzRWRpdGFibGUpO1xuICB9XG5cbiAgaWYgKG8uZGVmYXVsdE1vZGUgJiYgb1tvLmRlZmF1bHRNb2RlXSkge1xuICAgIG1vZGVzW28uZGVmYXVsdE1vZGVdLnNldCgpO1xuICB9IGVsc2UgaWYgKG8ubWFya2Rvd24pIHtcbiAgICBtb2Rlcy5tYXJrZG93bi5zZXQoKTtcbiAgfSBlbHNlIGlmIChvLmh0bWwpIHtcbiAgICBtb2Rlcy5odG1sLnNldCgpO1xuICB9IGVsc2Uge1xuICAgIG1vZGVzLnd5c2l3eWcuc2V0KCk7XG4gIH1cblxuICBiaW5kQ29tbWFuZHMoc3VyZmFjZSwgbywgZWRpdG9yKTtcbiAgYmluZEV2ZW50cygpO1xuXG4gIHJldHVybiBlZGl0b3I7XG5cbiAgZnVuY3Rpb24gYWRkTW9kZSAoaWQpIHtcbiAgICB2YXIgYnV0dG9uID0gbW9kZXNbaWRdLmJ1dHRvbjtcbiAgICB2YXIgY3VzdG9tID0gby5yZW5kZXIubW9kZXM7XG4gICAgaWYgKG9baWRdKSB7XG4gICAgICBzd2l0Y2hib2FyZC5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgKHR5cGVvZiBjdXN0b20gPT09ICdmdW5jdGlvbicgPyBjdXN0b20gOiByZW5kZXJlcnMubW9kZXMpKGJ1dHRvbiwgaWQpO1xuICAgICAgY3Jvc3N2ZW50LmFkZChidXR0b24sICdjbGljaycsIG1vZGVzW2lkXS5zZXQpO1xuICAgICAgYnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgIGJ1dHRvbi50YWJJbmRleCA9IC0xO1xuXG4gICAgICB2YXIgdGl0bGUgPSBzdHJpbmdzLnRpdGxlc1tpZF07XG4gICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBtYWMgPyBtYWNpZnkodGl0bGUpIDogdGl0bGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmRFdmVudHMgKHJlbW92ZSkge1xuICAgIHZhciBhciA9IHJlbW92ZSA/ICdybScgOiAnYWRkJztcbiAgICB2YXIgbW92ID0gcmVtb3ZlID8gJ3JlbW92ZUNoaWxkJyA6ICdhcHBlbmRDaGlsZCc7XG4gICAgaWYgKHJlbW92ZSkge1xuICAgICAga2FueWUuY2xlYXIoa2FueWVDb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG8ubWFya2Rvd24pIHsga2FueWUub24oJ2NtZCttJywga2FueWVPcHRpb25zLCBtYXJrZG93bk1vZGUpOyB9XG4gICAgICBpZiAoby5odG1sKSB7IGthbnllLm9uKCdjbWQraCcsIGthbnllT3B0aW9ucywgaHRtbE1vZGUpOyB9XG4gICAgICBpZiAoby53eXNpd3lnKSB7IGthbnllLm9uKCdjbWQrcCcsIGthbnllT3B0aW9ucywgd3lzaXd5Z01vZGUpOyB9XG4gICAgfVxuICAgIGNsYXNzZXNbYXJdKHBhcmVudCwgJ3drLWNvbnRhaW5lcicpO1xuICAgIHBhcmVudFttb3ZdKGVkaXRhYmxlKTtcbiAgICBpZiAocGxhY2UpIHsgcGFyZW50W21vdl0ocGxhY2UpOyB9XG4gICAgcGFyZW50W21vdl0oY29tbWFuZHMpO1xuICAgIHBhcmVudFttb3ZdKHN3aXRjaGJvYXJkKTtcbiAgICBpZiAoby5pbWFnZXMgfHwgby5hdHRhY2htZW50cykge1xuICAgICAgcGFyZW50W21vdl0oZHJvcGFyZWEpO1xuICAgICAgdXBsb2FkcyhwYXJlbnQsIGRyb3BhcmVhLCBlZGl0b3IsIG8sIHJlbW92ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgaWYgKGVkaXRvci5tb2RlICE9PSAnbWFya2Rvd24nKSB7XG4gICAgICB0ZXh0YXJlYS52YWx1ZSA9IGdldE1hcmtkb3duKCk7XG4gICAgfVxuICAgIGNsYXNzZXMucm0odGV4dGFyZWEsICd3ay1oaWRlJyk7XG4gICAgYmluZEV2ZW50cyh0cnVlKTtcbiAgICBkZWxldGUgY2FjaGVbaSAtIDFdO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFya2Rvd25Nb2RlIChlKSB7IHBlcnNpc3RNb2RlKCdtYXJrZG93bicsIGUpOyB9XG4gIGZ1bmN0aW9uIGh0bWxNb2RlIChlKSB7IHBlcnNpc3RNb2RlKCdodG1sJywgZSk7IH1cbiAgZnVuY3Rpb24gd3lzaXd5Z01vZGUgKGUpIHsgcGVyc2lzdE1vZGUoJ3d5c2l3eWcnLCBlKTsgfVxuXG4gIGZ1bmN0aW9uIHBlcnNpc3RNb2RlIChuZXh0TW9kZSwgZSkge1xuICAgIHZhciByZW1lbWJyYW5jZTtcbiAgICB2YXIgY3VycmVudE1vZGUgPSBlZGl0b3IubW9kZTtcbiAgICB2YXIgb2xkID0gbW9kZXNbY3VycmVudE1vZGVdLmJ1dHRvbjtcbiAgICB2YXIgYnV0dG9uID0gbW9kZXNbbmV4dE1vZGVdLmJ1dHRvbjtcbiAgICB2YXIgZm9jdXNpbmcgPSAhIWUgfHwgZG9jLmFjdGl2ZUVsZW1lbnQgPT09IHRleHRhcmVhIHx8IGRvYy5hY3RpdmVFbGVtZW50ID09PSBlZGl0YWJsZTtcblxuICAgIHN0b3AoZSk7XG5cbiAgICBpZiAoY3VycmVudE1vZGUgPT09IG5leHRNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVtZW1icmFuY2UgPSBmb2N1c2luZyAmJiByZW1lbWJlclNlbGVjdGlvbihoaXN0b3J5LCBvKTtcbiAgICB0ZXh0YXJlYS5ibHVyKCk7IC8vIGF2ZXJ0IGNocm9tZSByZXBhaW50IGJ1Z3NcblxuICAgIGlmIChuZXh0TW9kZSA9PT0gJ21hcmtkb3duJykge1xuICAgICAgaWYgKGN1cnJlbnRNb2RlID09PSAnaHRtbCcpIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBwYXJzZSgncGFyc2VIVE1MJywgdGV4dGFyZWEudmFsdWUpLnRyaW0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gcGFyc2UoJ3BhcnNlSFRNTCcsIGVkaXRhYmxlKS50cmltKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuZXh0TW9kZSA9PT0gJ2h0bWwnKSB7XG4gICAgICBpZiAoY3VycmVudE1vZGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBwYXJzZSgncGFyc2VNYXJrZG93bicsIHRleHRhcmVhLnZhbHVlKS50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IGVkaXRhYmxlLmlubmVySFRNTC50cmltKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuZXh0TW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICBpZiAoY3VycmVudE1vZGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgZWRpdGFibGUuaW5uZXJIVE1MID0gcGFyc2UoJ3BhcnNlTWFya2Rvd24nLCB0ZXh0YXJlYS52YWx1ZSkucmVwbGFjZShycGFyYWdyYXBoLCAnJykudHJpbSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWRpdGFibGUuaW5uZXJIVE1MID0gdGV4dGFyZWEudmFsdWUucmVwbGFjZShycGFyYWdyYXBoLCAnJykudHJpbSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuZXh0TW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICBjbGFzc2VzLmFkZCh0ZXh0YXJlYSwgJ3drLWhpZGUnKTtcbiAgICAgIGNsYXNzZXMucm0oZWRpdGFibGUsICd3ay1oaWRlJyk7XG4gICAgICBpZiAocGxhY2UpIHsgY2xhc3Nlcy5ybShwbGFjZSwgJ3drLWhpZGUnKTsgfVxuICAgICAgaWYgKGZvY3VzaW5nKSB7IHNldFRpbWVvdXQoZm9jdXNFZGl0YWJsZSwgMCk7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhc3Nlcy5ybSh0ZXh0YXJlYSwgJ3drLWhpZGUnKTtcbiAgICAgIGNsYXNzZXMuYWRkKGVkaXRhYmxlLCAnd2staGlkZScpO1xuICAgICAgaWYgKHBsYWNlKSB7IGNsYXNzZXMuYWRkKHBsYWNlLCAnd2staGlkZScpOyB9XG4gICAgICBpZiAoZm9jdXNpbmcpIHsgdGV4dGFyZWEuZm9jdXMoKTsgfVxuICAgIH1cbiAgICBjbGFzc2VzLmFkZChidXR0b24sICd3ay1tb2RlLWFjdGl2ZScpO1xuICAgIGNsYXNzZXMucm0ob2xkLCAnd2stbW9kZS1hY3RpdmUnKTtcbiAgICBjbGFzc2VzLmFkZChvbGQsICd3ay1tb2RlLWluYWN0aXZlJyk7XG4gICAgY2xhc3Nlcy5ybShidXR0b24sICd3ay1tb2RlLWluYWN0aXZlJyk7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICBvbGQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIGVkaXRvci5tb2RlID0gbmV4dE1vZGU7XG5cbiAgICBpZiAoby5zdG9yYWdlKSB7IGxzLnNldChvLnN0b3JhZ2UsIG5leHRNb2RlKTsgfVxuXG4gICAgaGlzdG9yeS5zZXRJbnB1dE1vZGUobmV4dE1vZGUpO1xuICAgIGlmIChyZW1lbWJyYW5jZSkgeyByZW1lbWJyYW5jZS51bm1hcmsoKTsgfVxuICAgIGZpcmVMYXRlcignd29vZm1hcmstbW9kZS1jaGFuZ2UnKTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlIChtZXRob2QsIGlucHV0KSB7XG4gICAgICByZXR1cm4gb1ttZXRob2RdKGlucHV0LCB7XG4gICAgICAgIG1hcmtlcnM6IHJlbWVtYnJhbmNlICYmIHJlbWVtYnJhbmNlLm1hcmtlcnMgfHwgW11cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpcmVMYXRlciAodHlwZSkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gZmlyZSAoKSB7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKHRleHRhcmVhLCB0eXBlKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvY3VzRWRpdGFibGUgKCkge1xuICAgIGVkaXRhYmxlLmZvY3VzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNYXJrZG93biAoKSB7XG4gICAgaWYgKGVkaXRvci5tb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHJldHVybiBvLnBhcnNlSFRNTChlZGl0YWJsZSk7XG4gICAgfVxuICAgIGlmIChlZGl0b3IubW9kZSA9PT0gJ2h0bWwnKSB7XG4gICAgICByZXR1cm4gby5wYXJzZUhUTUwodGV4dGFyZWEudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dGFyZWEudmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRPclNldFZhbHVlIChpbnB1dCkge1xuICAgIHZhciBtYXJrZG93biA9IFN0cmluZyhpbnB1dCk7XG4gICAgdmFyIHNldHMgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxO1xuICAgIGlmIChzZXRzKSB7XG4gICAgICBpZiAoZWRpdG9yLm1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSBhc0h0bWwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gZWRpdG9yLm1vZGUgPT09ICdodG1sJyA/IGFzSHRtbCgpIDogbWFya2Rvd247XG4gICAgICB9XG4gICAgICBoaXN0b3J5LnJlc2V0KCk7XG4gICAgfVxuICAgIHJldHVybiBnZXRNYXJrZG93bigpO1xuICAgIGZ1bmN0aW9uIGFzSHRtbCAoKSB7XG4gICAgICByZXR1cm4gby5wYXJzZU1hcmtkb3duKG1hcmtkb3duKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDb21tYW5kQnV0dG9uIChpZCwgY29tYm8sIGZuKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGZuID0gY29tYm87XG4gICAgICBjb21ibyA9IG51bGw7XG4gICAgfVxuICAgIHZhciBidXR0b24gPSB0YWcoeyB0OiAnYnV0dG9uJywgYzogJ3drLWNvbW1hbmQnLCBwOiBjb21tYW5kcyB9KTtcbiAgICB2YXIgY3VzdG9tID0gby5yZW5kZXIuY29tbWFuZHM7XG4gICAgdmFyIHJlbmRlciA9IHR5cGVvZiBjdXN0b20gPT09ICdmdW5jdGlvbicgPyBjdXN0b20gOiByZW5kZXJlcnMuY29tbWFuZHM7XG4gICAgdmFyIHRpdGxlID0gc3RyaW5ncy50aXRsZXNbaWRdO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBtYWMgPyBtYWNpZnkodGl0bGUpIDogdGl0bGUpO1xuICAgIH1cbiAgICBidXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgIGJ1dHRvbi50YWJJbmRleCA9IC0xO1xuICAgIHJlbmRlcihidXR0b24sIGlkKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGJ1dHRvbiwgJ2NsaWNrJywgZ2V0Q29tbWFuZEhhbmRsZXIoc3VyZmFjZSwgaGlzdG9yeSwgZm4pKTtcbiAgICBpZiAoY29tYm8pIHtcbiAgICAgIGFkZENvbW1hbmQoY29tYm8sIGZuKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENvbW1hbmQgKGNvbWJvLCBmbikge1xuICAgIGthbnllLm9uKGNvbWJvLCBrYW55ZU9wdGlvbnMsIGdldENvbW1hbmRIYW5kbGVyKHN1cmZhY2UsIGhpc3RvcnksIGZuKSk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5Db21tYW5kIChmbikge1xuICAgIGdldENvbW1hbmRIYW5kbGVyKHN1cmZhY2UsIGhpc3RvcnksIHJlYXJyYW5nZSkobnVsbCk7XG4gICAgZnVuY3Rpb24gcmVhcnJhbmdlIChlLCBtb2RlLCBjaHVua3MpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGNodW5rcywgbW9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRhZyAob3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBlbCA9IGRvYy5jcmVhdGVFbGVtZW50KG8udCB8fCAnZGl2Jyk7XG4gIGVsLmNsYXNzTmFtZSA9IG8uYyB8fCAnJztcbiAgc2V0VGV4dChlbCwgby54IHx8ICcnKTtcbiAgaWYgKG8ucCkgeyBvLnAuYXBwZW5kQ2hpbGQoZWwpOyB9XG4gIHJldHVybiBlbDtcbn1cblxuZnVuY3Rpb24gc3RvcCAoZSkge1xuICBpZiAoZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IH1cbn1cblxuZnVuY3Rpb24gbWFjaWZ5ICh0ZXh0KSB7XG4gIHJldHVybiB0ZXh0XG4gICAgLnJlcGxhY2UoL1xcYmN0cmxcXGIvaSwgJ1xcdTIzMTgnKVxuICAgIC5yZXBsYWNlKC9cXGJhbHRcXGIvaSwgJ1xcdTIzMjUnKVxuICAgIC5yZXBsYWNlKC9cXGJzaGlmdFxcYi9pLCAnXFx1MjFlNycpO1xufVxuXG53b29mbWFyay5maW5kID0gZmluZDtcbndvb2ZtYXJrLnN0cmluZ3MgPSBzdHJpbmdzO1xubW9kdWxlLmV4cG9ydHMgPSB3b29mbWFyaztcbiJdfQ==
},{"./InputHistory":35,"./bindCommands":37,"./classes":41,"./getCommandHandler":44,"./getSurface":45,"./prompts/close":69,"./prompts/prompt":70,"./rememberSelection":72,"./renderers":73,"./setText":74,"./strings":75,"./uploads":76,"crossvent":10,"kanye":16,"local-storage":17}]},{},[77])(77)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXRvYS9hdG9hLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL2J1bGxzZXllLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL3RhaWxvcm1hZGUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvdGhyb3R0bGUuanMiLCJub2RlX21vZHVsZXMvYnVyZWF1Y3JhY3kvYnVyZWF1Y3JhY3kuanMiLCJub2RlX21vZHVsZXMvYnVyZWF1Y3JhY3kvbm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2J1cmVhdWNyYWN5L25vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2V2ZW50bWFwLmpzIiwibm9kZV9tb2R1bGVzL2NvbnRyYS9kZWJvdW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9jb250cmEvZW1pdHRlci5qcyIsIm5vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2Nyb3NzdmVudC5qcyIsIm5vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2V2ZW50bWFwLmpzIiwibm9kZV9tb2R1bGVzL2N1c3RvbS1ldmVudC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mb3ItZWFjaC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwibm9kZV9tb2R1bGVzL2lzLWZ1bmN0aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2thbnllL2thbnllLmpzIiwibm9kZV9tb2R1bGVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2NhbC1zdG9yYWdlL3N0dWIuanMiLCJub2RlX21vZHVsZXMvbG9jYWwtc3RvcmFnZS90cmFja2luZy5qcyIsIm5vZGVfbW9kdWxlcy9wYXJzZS1oZWFkZXJzL3BhcnNlLWhlYWRlcnMuanMiLCJub2RlX21vZHVsZXMvc2VrdG9yL3NyYy9zZWt0b3IuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25OdWxsT3AuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25SYXcuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25TeW50aGV0aWMuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9pc0hvc3QuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9yYW5nZVRvVGV4dFJhbmdlLmpzIiwibm9kZV9tb2R1bGVzL3NlbGVjY2lvbi9zcmMvc2VsZWNjaW9uLmpzIiwibm9kZV9tb2R1bGVzL3NlbGVjY2lvbi9zcmMvc2V0U2VsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3NlbGwvc2VsbC5qcyIsIm5vZGVfbW9kdWxlcy90aWNreS90aWNreS1icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3RyaW0vaW5kZXguanMiLCJub2RlX21vZHVsZXMveGhyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3h0ZW5kL2ltbXV0YWJsZS5qcyIsInNyYy9JbnB1dEhpc3RvcnkuanMiLCJzcmMvSW5wdXRTdGF0ZS5qcyIsInNyYy9iaW5kQ29tbWFuZHMuanMiLCJzcmMvY2FzdC5qcyIsInNyYy9jaHVua3MvcGFyc2VMaW5rSW5wdXQuanMiLCJzcmMvY2h1bmtzL3RyaW0uanMiLCJzcmMvY2xhc3Nlcy5qcyIsInNyYy9leHRlbmRSZWdFeHAuanMiLCJzcmMvZml4RU9MLmpzIiwic3JjL2dldENvbW1hbmRIYW5kbGVyLmpzIiwic3JjL2dldFN1cmZhY2UuanMiLCJzcmMvZ2V0VGV4dC5qcyIsInNyYy9odG1sL0h0bWxDaHVua3MuanMiLCJzcmMvaHRtbC9ibG9ja3F1b3RlLmpzIiwic3JjL2h0bWwvYm9sZE9ySXRhbGljLmpzIiwic3JjL2h0bWwvY29kZWJsb2NrLmpzIiwic3JjL2h0bWwvaGVhZGluZy5qcyIsInNyYy9odG1sL2hyLmpzIiwic3JjL2h0bWwvbGlua09ySW1hZ2VPckF0dGFjaG1lbnQuanMiLCJzcmMvaHRtbC9saXN0LmpzIiwic3JjL2h0bWwvd3JhcHBpbmcuanMiLCJzcmMvaXNWaXNpYmxlRWxlbWVudC5qcyIsInNyYy9tYW55LmpzIiwic3JjL21hcmtkb3duL01hcmtkb3duQ2h1bmtzLmpzIiwic3JjL21hcmtkb3duL2Jsb2NrcXVvdGUuanMiLCJzcmMvbWFya2Rvd24vYm9sZE9ySXRhbGljLmpzIiwic3JjL21hcmtkb3duL2NvZGVibG9jay5qcyIsInNyYy9tYXJrZG93bi9oZWFkaW5nLmpzIiwic3JjL21hcmtkb3duL2hyLmpzIiwic3JjL21hcmtkb3duL2xpbmtPckltYWdlT3JBdHRhY2htZW50LmpzIiwic3JjL21hcmtkb3duL2xpc3QuanMiLCJzcmMvbWFya2Rvd24vc2V0dGluZ3MuanMiLCJzcmMvbWFya2Rvd24vd3JhcHBpbmcuanMiLCJzcmMvb25jZS5qcyIsInNyYy9wcm9tcHRzL2Nsb3NlLmpzIiwic3JjL3Byb21wdHMvcHJvbXB0LmpzIiwic3JjL3Byb21wdHMvcmVuZGVyLmpzIiwic3JjL3JlbWVtYmVyU2VsZWN0aW9uLmpzIiwic3JjL3JlbmRlcmVycy5qcyIsInNyYy9zZXRUZXh0LmpzIiwic3JjL3N0cmluZ3MuanMiLCJzcmMvdXBsb2Fkcy5qcyIsInNyYy93b29mbWFyay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhdG9hIChhLCBuKSB7IHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhLCBuKTsgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgdGFpbG9ybWFkZSA9IHJlcXVpcmUoJy4vdGFpbG9ybWFkZScpO1xuXG5mdW5jdGlvbiBidWxsc2V5ZSAoZWwsIHRhcmdldCwgb3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnM7XG4gIHZhciBkb21UYXJnZXQgPSB0YXJnZXQgJiYgdGFyZ2V0LnRhZ05hbWU7XG5cbiAgaWYgKCFkb21UYXJnZXQgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIG8gPSB0YXJnZXQ7XG4gIH1cbiAgaWYgKCFkb21UYXJnZXQpIHtcbiAgICB0YXJnZXQgPSBlbDtcbiAgfVxuICBpZiAoIW8pIHsgbyA9IHt9OyB9XG5cbiAgdmFyIGRlc3Ryb3llZCA9IGZhbHNlO1xuICB2YXIgdGhyb3R0bGVkV3JpdGUgPSB0aHJvdHRsZSh3cml0ZSwgMzApO1xuICB2YXIgdGFpbG9yT3B0aW9ucyA9IHsgdXBkYXRlOiBvLmF1dG91cGRhdGVUb0NhcmV0ICE9PSBmYWxzZSAmJiB1cGRhdGUgfTtcbiAgdmFyIHRhaWxvciA9IG8uY2FyZXQgJiYgdGFpbG9ybWFkZSh0YXJnZXQsIHRhaWxvck9wdGlvbnMpO1xuXG4gIHdyaXRlKCk7XG5cbiAgaWYgKG8udHJhY2tpbmcgIT09IGZhbHNlKSB7XG4gICAgY3Jvc3N2ZW50LmFkZCh3aW5kb3csICdyZXNpemUnLCB0aHJvdHRsZWRXcml0ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlYWQ6IHJlYWROdWxsLFxuICAgIHJlZnJlc2g6IHdyaXRlLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgc2xlZXA6IHNsZWVwXG4gIH07XG5cbiAgZnVuY3Rpb24gc2xlZXAgKCkge1xuICAgIHRhaWxvck9wdGlvbnMuc2xlZXBpbmcgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZE51bGwgKCkgeyByZXR1cm4gcmVhZCgpOyB9XG5cbiAgZnVuY3Rpb24gcmVhZCAocmVhZGluZ3MpIHtcbiAgICB2YXIgYm91bmRzID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBzY3JvbGxUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmICh0YWlsb3IpIHtcbiAgICAgIHJlYWRpbmdzID0gdGFpbG9yLnJlYWQoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IChyZWFkaW5ncy5hYnNvbHV0ZSA/IDAgOiBib3VuZHMubGVmdCkgKyByZWFkaW5ncy54LFxuICAgICAgICB5OiAocmVhZGluZ3MuYWJzb2x1dGUgPyAwIDogYm91bmRzLnRvcCkgKyBzY3JvbGxUb3AgKyByZWFkaW5ncy55ICsgMjBcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB4OiBib3VuZHMubGVmdCxcbiAgICAgIHk6IGJvdW5kcy50b3AgKyBzY3JvbGxUb3BcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlIChyZWFkaW5ncykge1xuICAgIHdyaXRlKHJlYWRpbmdzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChyZWFkaW5ncykge1xuICAgIGlmIChkZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQnVsbHNleWUgY2FuXFwndCByZWZyZXNoIGFmdGVyIGJlaW5nIGRlc3Ryb3llZC4gQ3JlYXRlIGFub3RoZXIgaW5zdGFuY2UgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgaWYgKHRhaWxvciAmJiAhcmVhZGluZ3MpIHtcbiAgICAgIHRhaWxvck9wdGlvbnMuc2xlZXBpbmcgPSBmYWxzZTtcbiAgICAgIHRhaWxvci5yZWZyZXNoKCk7IHJldHVybjtcbiAgICB9XG4gICAgdmFyIHAgPSByZWFkKHJlYWRpbmdzKTtcbiAgICBpZiAoIXRhaWxvciAmJiB0YXJnZXQgIT09IGVsKSB7XG4gICAgICBwLnkgKz0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB9XG4gICAgZWwuc3R5bGUubGVmdCA9IHAueCArICdweCc7XG4gICAgZWwuc3R5bGUudG9wID0gcC55ICsgJ3B4JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0YWlsb3IpIHsgdGFpbG9yLmRlc3Ryb3koKTsgfVxuICAgIGNyb3NzdmVudC5yZW1vdmUod2luZG93LCAncmVzaXplJywgdGhyb3R0bGVkV3JpdGUpO1xuICAgIGRlc3Ryb3llZCA9IHRydWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWxsc2V5ZTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHNlbGwgPSByZXF1aXJlKCdzZWxsJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgc2VsZWNjaW9uID0gcmVxdWlyZSgnc2VsZWNjaW9uJyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgZ2V0U2VsZWN0aW9uID0gc2VsZWNjaW9uLmdldDtcbnZhciBwcm9wcyA9IFtcbiAgJ2RpcmVjdGlvbicsXG4gICdib3hTaXppbmcnLFxuICAnd2lkdGgnLFxuICAnaGVpZ2h0JyxcbiAgJ292ZXJmbG93WCcsXG4gICdvdmVyZmxvd1knLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICdib3JkZXJCb3R0b21XaWR0aCcsXG4gICdib3JkZXJMZWZ0V2lkdGgnLFxuICAncGFkZGluZ1RvcCcsXG4gICdwYWRkaW5nUmlnaHQnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdwYWRkaW5nTGVmdCcsXG4gICdmb250U3R5bGUnLFxuICAnZm9udFZhcmlhbnQnLFxuICAnZm9udFdlaWdodCcsXG4gICdmb250U3RyZXRjaCcsXG4gICdmb250U2l6ZScsXG4gICdmb250U2l6ZUFkanVzdCcsXG4gICdsaW5lSGVpZ2h0JyxcbiAgJ2ZvbnRGYW1pbHknLFxuICAndGV4dEFsaWduJyxcbiAgJ3RleHRUcmFuc2Zvcm0nLFxuICAndGV4dEluZGVudCcsXG4gICd0ZXh0RGVjb3JhdGlvbicsXG4gICdsZXR0ZXJTcGFjaW5nJyxcbiAgJ3dvcmRTcGFjaW5nJ1xuXTtcbnZhciB3aW4gPSBnbG9iYWw7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgZmYgPSB3aW4ubW96SW5uZXJTY3JlZW5YICE9PSBudWxsICYmIHdpbi5tb3pJbm5lclNjcmVlblggIT09IHZvaWQgMDtcblxuZnVuY3Rpb24gdGFpbG9ybWFkZSAoZWwsIG9wdGlvbnMpIHtcbiAgdmFyIHRleHRJbnB1dCA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJztcbiAgdmFyIHRocm90dGxlZFJlZnJlc2ggPSB0aHJvdHRsZShyZWZyZXNoLCAzMCk7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcblxuICBiaW5kKCk7XG5cbiAgcmV0dXJuIHtcbiAgICByZWFkOiByZWFkUG9zaXRpb24sXG4gICAgcmVmcmVzaDogdGhyb3R0bGVkUmVmcmVzaCxcbiAgICBkZXN0cm95OiBkZXN0cm95XG4gIH07XG5cbiAgZnVuY3Rpb24gbm9vcCAoKSB7fVxuICBmdW5jdGlvbiByZWFkUG9zaXRpb24gKCkgeyByZXR1cm4gKHRleHRJbnB1dCA/IGNvb3Jkc1RleHQgOiBjb29yZHNIVE1MKSgpOyB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAoKSB7XG4gICAgaWYgKG8uc2xlZXBpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChvLnVwZGF0ZSB8fCBub29wKShyZWFkUG9zaXRpb24oKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNUZXh0ICgpIHtcbiAgICB2YXIgcCA9IHNlbGwoZWwpO1xuICAgIHZhciBjb250ZXh0ID0gcHJlcGFyZSgpO1xuICAgIHZhciByZWFkaW5ncyA9IHJlYWRUZXh0Q29vcmRzKGNvbnRleHQsIHAuc3RhcnQpO1xuICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKGNvbnRleHQubWlycm9yKTtcbiAgICByZXR1cm4gcmVhZGluZ3M7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNIVE1MICgpIHtcbiAgICB2YXIgc2VsID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICB2YXIgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgIHZhciBuZWVkc1RvV29ya0Fyb3VuZE5ld2xpbmVCdWcgPSByYW5nZS5zdGFydENvbnRhaW5lci5ub2RlTmFtZSA9PT0gJ1AnICYmIHJhbmdlLnN0YXJ0T2Zmc2V0ID09PSAwO1xuICAgICAgaWYgKG5lZWRzVG9Xb3JrQXJvdW5kTmV3bGluZUJ1Zykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm9mZnNldExlZnQsXG4gICAgICAgICAgeTogcmFuZ2Uuc3RhcnRDb250YWluZXIub2Zmc2V0VG9wLFxuICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAocmFuZ2UuZ2V0Q2xpZW50UmVjdHMpIHtcbiAgICAgICAgdmFyIHJlY3RzID0gcmFuZ2UuZ2V0Q2xpZW50UmVjdHMoKTtcbiAgICAgICAgaWYgKHJlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcmVjdHNbMF0ubGVmdCxcbiAgICAgICAgICAgIHk6IHJlY3RzWzBdLnRvcCxcbiAgICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB4OiAwLCB5OiAwIH07XG4gIH1cblxuICBmdW5jdGlvbiByZWFkVGV4dENvb3JkcyAoY29udGV4dCwgcCkge1xuICAgIHZhciByZXN0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB2YXIgbWlycm9yID0gY29udGV4dC5taXJyb3I7XG4gICAgdmFyIGNvbXB1dGVkID0gY29udGV4dC5jb21wdXRlZDtcblxuICAgIHdyaXRlKG1pcnJvciwgcmVhZChlbCkuc3Vic3RyaW5nKDAsIHApKTtcblxuICAgIGlmIChlbC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICBtaXJyb3IudGV4dENvbnRlbnQgPSBtaXJyb3IudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICdcXHUwMGEwJyk7XG4gICAgfVxuXG4gICAgd3JpdGUocmVzdCwgcmVhZChlbCkuc3Vic3RyaW5nKHApIHx8ICcuJyk7XG5cbiAgICBtaXJyb3IuYXBwZW5kQ2hpbGQocmVzdCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogcmVzdC5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlckxlZnRXaWR0aCddKSxcbiAgICAgIHk6IHJlc3Qub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlclRvcFdpZHRoJ10pXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGVsKSB7XG4gICAgcmV0dXJuIHRleHRJbnB1dCA/IGVsLnZhbHVlIDogZWwuaW5uZXJIVE1MO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlcGFyZSAoKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gd2luLmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsKSA6IGVsLmN1cnJlbnRTdHlsZTtcbiAgICB2YXIgbWlycm9yID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBzdHlsZSA9IG1pcnJvci5zdHlsZTtcblxuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKG1pcnJvcik7XG5cbiAgICBpZiAoZWwudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7XG4gICAgfVxuICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnO1xuICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgcHJvcHMuZm9yRWFjaChjb3B5KTtcblxuICAgIGlmIChmZikge1xuICAgICAgc3R5bGUud2lkdGggPSBwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyICsgJ3B4JztcbiAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKSB7XG4gICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICByZXR1cm4geyBtaXJyb3I6IG1pcnJvciwgY29tcHV0ZWQ6IGNvbXB1dGVkIH07XG5cbiAgICBmdW5jdGlvbiBjb3B5IChwcm9wKSB7XG4gICAgICBzdHlsZVtwcm9wXSA9IGNvbXB1dGVkW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChlbCwgdmFsdWUpIHtcbiAgICBpZiAodGV4dElucHV0KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXlkb3duJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleXVwJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2lucHV0JywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ3Bhc3RlJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2NoYW5nZScsIHRocm90dGxlZFJlZnJlc2gpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgYmluZCh0cnVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhaWxvcm1hZGU7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWlkV3hzYzJWNVpTOTBZV2xzYjNKdFlXUmxMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhObGJHd2dQU0J5WlhGMWFYSmxLQ2R6Wld4c0p5azdYRzUyWVhJZ1kzSnZjM04yWlc1MElEMGdjbVZ4ZFdseVpTZ25ZM0p2YzNOMlpXNTBKeWs3WEc1MllYSWdjMlZzWldOamFXOXVJRDBnY21WeGRXbHlaU2duYzJWc1pXTmphVzl1SnlrN1hHNTJZWElnZEdoeWIzUjBiR1VnUFNCeVpYRjFhWEpsS0NjdUwzUm9jbTkwZEd4bEp5azdYRzUyWVhJZ1oyVjBVMlZzWldOMGFXOXVJRDBnYzJWc1pXTmphVzl1TG1kbGREdGNiblpoY2lCd2NtOXdjeUE5SUZ0Y2JpQWdKMlJwY21WamRHbHZiaWNzWEc0Z0lDZGliM2hUYVhwcGJtY25MRnh1SUNBbmQybGtkR2duTEZ4dUlDQW5hR1ZwWjJoMEp5eGNiaUFnSjI5MlpYSm1iRzkzV0Njc1hHNGdJQ2R2ZG1WeVpteHZkMWtuTEZ4dUlDQW5ZbTl5WkdWeVZHOXdWMmxrZEdnbkxGeHVJQ0FuWW05eVpHVnlVbWxuYUhSWGFXUjBhQ2NzWEc0Z0lDZGliM0prWlhKQ2IzUjBiMjFYYVdSMGFDY3NYRzRnSUNkaWIzSmtaWEpNWldaMFYybGtkR2duTEZ4dUlDQW5jR0ZrWkdsdVoxUnZjQ2NzWEc0Z0lDZHdZV1JrYVc1blVtbG5hSFFuTEZ4dUlDQW5jR0ZrWkdsdVowSnZkSFJ2YlNjc1hHNGdJQ2R3WVdSa2FXNW5UR1ZtZENjc1hHNGdJQ2RtYjI1MFUzUjViR1VuTEZ4dUlDQW5abTl1ZEZaaGNtbGhiblFuTEZ4dUlDQW5abTl1ZEZkbGFXZG9kQ2NzWEc0Z0lDZG1iMjUwVTNSeVpYUmphQ2NzWEc0Z0lDZG1iMjUwVTJsNlpTY3NYRzRnSUNkbWIyNTBVMmw2WlVGa2FuVnpkQ2NzWEc0Z0lDZHNhVzVsU0dWcFoyaDBKeXhjYmlBZ0oyWnZiblJHWVcxcGJIa25MRnh1SUNBbmRHVjRkRUZzYVdkdUp5eGNiaUFnSjNSbGVIUlVjbUZ1YzJadmNtMG5MRnh1SUNBbmRHVjRkRWx1WkdWdWRDY3NYRzRnSUNkMFpYaDBSR1ZqYjNKaGRHbHZiaWNzWEc0Z0lDZHNaWFIwWlhKVGNHRmphVzVuSnl4Y2JpQWdKM2R2Y21SVGNHRmphVzVuSjF4dVhUdGNiblpoY2lCM2FXNGdQU0JuYkc5aVlXdzdYRzUyWVhJZ1pHOWpJRDBnWkc5amRXMWxiblE3WEc1MllYSWdabVlnUFNCM2FXNHViVzk2U1c1dVpYSlRZM0psWlc1WUlDRTlQU0J1ZFd4c0lDWW1JSGRwYmk1dGIzcEpibTVsY2xOamNtVmxibGdnSVQwOUlIWnZhV1FnTUR0Y2JseHVablZ1WTNScGIyNGdkR0ZwYkc5eWJXRmtaU0FvWld3c0lHOXdkR2x2Ym5NcElIdGNiaUFnZG1GeUlIUmxlSFJKYm5CMWRDQTlJR1ZzTG5SaFowNWhiV1VnUFQwOUlDZEpUbEJWVkNjZ2ZId2daV3d1ZEdGblRtRnRaU0E5UFQwZ0oxUkZXRlJCVWtWQkp6dGNiaUFnZG1GeUlIUm9jbTkwZEd4bFpGSmxabkpsYzJnZ1BTQjBhSEp2ZEhSc1pTaHlaV1p5WlhOb0xDQXpNQ2s3WEc0Z0lIWmhjaUJ2SUQwZ2IzQjBhVzl1Y3lCOGZDQjdmVHRjYmx4dUlDQmlhVzVrS0NrN1hHNWNiaUFnY21WMGRYSnVJSHRjYmlBZ0lDQnlaV0ZrT2lCeVpXRmtVRzl6YVhScGIyNHNYRzRnSUNBZ2NtVm1jbVZ6YURvZ2RHaHliM1IwYkdWa1VtVm1jbVZ6YUN4Y2JpQWdJQ0JrWlhOMGNtOTVPaUJrWlhOMGNtOTVYRzRnSUgwN1hHNWNiaUFnWm5WdVkzUnBiMjRnYm05dmNDQW9LU0I3ZlZ4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVUc5emFYUnBiMjRnS0NrZ2V5QnlaWFIxY200Z0tIUmxlSFJKYm5CMWRDQS9JR052YjNKa2MxUmxlSFFnT2lCamIyOXlaSE5JVkUxTUtTZ3BPeUI5WEc1Y2JpQWdablZ1WTNScGIyNGdjbVZtY21WemFDQW9LU0I3WEc0Z0lDQWdhV1lnS0c4dWMyeGxaWEJwYm1jcElIdGNiaUFnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlDaHZMblZ3WkdGMFpTQjhmQ0J1YjI5d0tTaHlaV0ZrVUc5emFYUnBiMjRvS1NrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmpiMjl5WkhOVVpYaDBJQ2dwSUh0Y2JpQWdJQ0IyWVhJZ2NDQTlJSE5sYkd3b1pXd3BPMXh1SUNBZ0lIWmhjaUJqYjI1MFpYaDBJRDBnY0hKbGNHRnlaU2dwTzF4dUlDQWdJSFpoY2lCeVpXRmthVzVuY3lBOUlISmxZV1JVWlhoMFEyOXZjbVJ6S0dOdmJuUmxlSFFzSUhBdWMzUmhjblFwTzF4dUlDQWdJR1J2WXk1aWIyUjVMbkpsYlc5MlpVTm9hV3hrS0dOdmJuUmxlSFF1YldseWNtOXlLVHRjYmlBZ0lDQnlaWFIxY200Z2NtVmhaR2x1WjNNN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmpiMjl5WkhOSVZFMU1JQ2dwSUh0Y2JpQWdJQ0IyWVhJZ2MyVnNJRDBnWjJWMFUyVnNaV04wYVc5dUtDazdYRzRnSUNBZ2FXWWdLSE5sYkM1eVlXNW5aVU52ZFc1MEtTQjdYRzRnSUNBZ0lDQjJZWElnY21GdVoyVWdQU0J6Wld3dVoyVjBVbUZ1WjJWQmRDZ3dLVHRjYmlBZ0lDQWdJSFpoY2lCdVpXVmtjMVJ2VjI5eWEwRnliM1Z1WkU1bGQyeHBibVZDZFdjZ1BTQnlZVzVuWlM1emRHRnlkRU52Ym5SaGFXNWxjaTV1YjJSbFRtRnRaU0E5UFQwZ0oxQW5JQ1ltSUhKaGJtZGxMbk4wWVhKMFQyWm1jMlYwSUQwOVBTQXdPMXh1SUNBZ0lDQWdhV1lnS0c1bFpXUnpWRzlYYjNKclFYSnZkVzVrVG1WM2JHbHVaVUoxWnlrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0lDQWdJSGc2SUhKaGJtZGxMbk4wWVhKMFEyOXVkR0ZwYm1WeUxtOW1abk5sZEV4bFpuUXNYRzRnSUNBZ0lDQWdJQ0FnZVRvZ2NtRnVaMlV1YzNSaGNuUkRiMjUwWVdsdVpYSXViMlptYzJWMFZHOXdMRnh1SUNBZ0lDQWdJQ0FnSUdGaWMyOXNkWFJsT2lCMGNuVmxYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JwWmlBb2NtRnVaMlV1WjJWMFEyeHBaVzUwVW1WamRITXBJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlISmxZM1J6SUQwZ2NtRnVaMlV1WjJWMFEyeHBaVzUwVW1WamRITW9LVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tISmxZM1J6TG14bGJtZDBhQ0ErSURBcElIdGNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2VEb2djbVZqZEhOYk1GMHViR1ZtZEN4Y2JpQWdJQ0FnSUNBZ0lDQWdJSGs2SUhKbFkzUnpXekJkTG5SdmNDeGNiaUFnSUNBZ0lDQWdJQ0FnSUdGaWMyOXNkWFJsT2lCMGNuVmxYRzRnSUNBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdleUI0T2lBd0xDQjVPaUF3SUgwN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVkdWNGRFTnZiM0prY3lBb1kyOXVkR1Y0ZEN3Z2NDa2dlMXh1SUNBZ0lIWmhjaUJ5WlhOMElEMGdaRzlqTG1OeVpXRjBaVVZzWlcxbGJuUW9KM053WVc0bktUdGNiaUFnSUNCMllYSWdiV2x5Y205eUlEMGdZMjl1ZEdWNGRDNXRhWEp5YjNJN1hHNGdJQ0FnZG1GeUlHTnZiWEIxZEdWa0lEMGdZMjl1ZEdWNGRDNWpiMjF3ZFhSbFpEdGNibHh1SUNBZ0lIZHlhWFJsS0cxcGNuSnZjaXdnY21WaFpDaGxiQ2t1YzNWaWMzUnlhVzVuS0RBc0lIQXBLVHRjYmx4dUlDQWdJR2xtSUNobGJDNTBZV2RPWVcxbElEMDlQU0FuU1U1UVZWUW5LU0I3WEc0Z0lDQWdJQ0J0YVhKeWIzSXVkR1Y0ZEVOdmJuUmxiblFnUFNCdGFYSnliM0l1ZEdWNGRFTnZiblJsYm5RdWNtVndiR0ZqWlNndlhGeHpMMmNzSUNkY1hIVXdNR0V3SnlrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnZDNKcGRHVW9jbVZ6ZEN3Z2NtVmhaQ2hsYkNrdWMzVmljM1J5YVc1bktIQXBJSHg4SUNjdUp5azdYRzVjYmlBZ0lDQnRhWEp5YjNJdVlYQndaVzVrUTJocGJHUW9jbVZ6ZENrN1hHNWNiaUFnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnZURvZ2NtVnpkQzV2Wm1aelpYUk1aV1owSUNzZ2NHRnljMlZKYm5Rb1kyOXRjSFYwWldSYkoySnZjbVJsY2t4bFpuUlhhV1IwYUNkZEtTeGNiaUFnSUNBZ0lIazZJSEpsYzNRdWIyWm1jMlYwVkc5d0lDc2djR0Z5YzJWSmJuUW9ZMjl0Y0hWMFpXUmJKMkp2Y21SbGNsUnZjRmRwWkhSb0oxMHBYRzRnSUNBZ2ZUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSEpsWVdRZ0tHVnNLU0I3WEc0Z0lDQWdjbVYwZFhKdUlIUmxlSFJKYm5CMWRDQS9JR1ZzTG5aaGJIVmxJRG9nWld3dWFXNXVaWEpJVkUxTU8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdjSEpsY0dGeVpTQW9LU0I3WEc0Z0lDQWdkbUZ5SUdOdmJYQjFkR1ZrSUQwZ2QybHVMbWRsZEVOdmJYQjFkR1ZrVTNSNWJHVWdQeUJuWlhSRGIyMXdkWFJsWkZOMGVXeGxLR1ZzS1NBNklHVnNMbU4xY25KbGJuUlRkSGxzWlR0Y2JpQWdJQ0IyWVhJZ2JXbHljbTl5SUQwZ1pHOWpMbU55WldGMFpVVnNaVzFsYm5Rb0oyUnBkaWNwTzF4dUlDQWdJSFpoY2lCemRIbHNaU0E5SUcxcGNuSnZjaTV6ZEhsc1pUdGNibHh1SUNBZ0lHUnZZeTVpYjJSNUxtRndjR1Z1WkVOb2FXeGtLRzFwY25KdmNpazdYRzVjYmlBZ0lDQnBaaUFvWld3dWRHRm5UbUZ0WlNBaFBUMGdKMGxPVUZWVUp5a2dlMXh1SUNBZ0lDQWdjM1I1YkdVdWQyOXlaRmR5WVhBZ1BTQW5ZbkpsWVdzdGQyOXlaQ2M3WEc0Z0lDQWdmVnh1SUNBZ0lITjBlV3hsTG5kb2FYUmxVM0JoWTJVZ1BTQW5jSEpsTFhkeVlYQW5PMXh1SUNBZ0lITjBlV3hsTG5CdmMybDBhVzl1SUQwZ0oyRmljMjlzZFhSbEp6dGNiaUFnSUNCemRIbHNaUzUyYVhOcFltbHNhWFI1SUQwZ0oyaHBaR1JsYmljN1hHNGdJQ0FnY0hKdmNITXVabTl5UldGamFDaGpiM0I1S1R0Y2JseHVJQ0FnSUdsbUlDaG1aaWtnZTF4dUlDQWdJQ0FnYzNSNWJHVXVkMmxrZEdnZ1BTQndZWEp6WlVsdWRDaGpiMjF3ZFhSbFpDNTNhV1IwYUNrZ0xTQXlJQ3NnSjNCNEp6dGNiaUFnSUNBZ0lHbG1JQ2hsYkM1elkzSnZiR3hJWldsbmFIUWdQaUJ3WVhKelpVbHVkQ2hqYjIxd2RYUmxaQzVvWldsbmFIUXBLU0I3WEc0Z0lDQWdJQ0FnSUhOMGVXeGxMbTkyWlhKbWJHOTNXU0E5SUNkelkzSnZiR3duTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQnpkSGxzWlM1dmRtVnlabXh2ZHlBOUlDZG9hV1JrWlc0bk8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdleUJ0YVhKeWIzSTZJRzFwY25KdmNpd2dZMjl0Y0hWMFpXUTZJR052YlhCMWRHVmtJSDA3WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUJqYjNCNUlDaHdjbTl3S1NCN1hHNGdJQ0FnSUNCemRIbHNaVnR3Y205d1hTQTlJR052YlhCMWRHVmtXM0J5YjNCZE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlIZHlhWFJsSUNobGJDd2dkbUZzZFdVcElIdGNiaUFnSUNCcFppQW9kR1Y0ZEVsdWNIVjBLU0I3WEc0Z0lDQWdJQ0JsYkM1MFpYaDBRMjl1ZEdWdWRDQTlJSFpoYkhWbE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0JsYkM1cGJtNWxja2hVVFV3Z1BTQjJZV3gxWlR0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCaWFXNWtJQ2h5WlcxdmRtVXBJSHRjYmlBZ0lDQjJZWElnYjNBZ1BTQnlaVzF2ZG1VZ1B5QW5jbVZ0YjNabEp5QTZJQ2RoWkdRbk8xeHVJQ0FnSUdOeWIzTnpkbVZ1ZEZ0dmNGMG9aV3dzSUNkclpYbGtiM2R1Snl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwVzI5d1hTaGxiQ3dnSjJ0bGVYVndKeXdnZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNobGJDd2dKMmx1Y0hWMEp5d2dkR2h5YjNSMGJHVmtVbVZtY21WemFDazdYRzRnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hsYkN3Z0ozQmhjM1JsSnl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwVzI5d1hTaGxiQ3dnSjJOb1lXNW5aU2NzSUhSb2NtOTBkR3hsWkZKbFpuSmxjMmdwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1pHVnpkSEp2ZVNBb0tTQjdYRzRnSUNBZ1ltbHVaQ2gwY25WbEtUdGNiaUFnZlZ4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSFJoYVd4dmNtMWhaR1U3WEc0aVhYMD0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHRocm90dGxlIChmbiwgYm91bmRhcnkpIHtcbiAgdmFyIGxhc3QgPSAtSW5maW5pdHk7XG4gIHZhciB0aW1lcjtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJvdW5jZWQgKCkge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1bmJvdW5kKCk7XG5cbiAgICBmdW5jdGlvbiB1bmJvdW5kICgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICB2YXIgbmV4dCA9IGxhc3QgKyBib3VuZGFyeTtcbiAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgaWYgKG5vdyA+IG5leHQpIHtcbiAgICAgICAgbGFzdCA9IG5vdztcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCh1bmJvdW5kLCBuZXh0IC0gbm93KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB4aHIgPSByZXF1aXJlKCd4aHInKTtcbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBlbWl0dGVyID0gcmVxdWlyZSgnY29udHJhL2VtaXR0ZXInKTtcbnZhciB2YWxpZGF0b3JzID0ge1xuICBpbWFnZTogaXNJdEFuSW1hZ2VGaWxlXG59O1xudmFyIHJpbWFnZW1pbWUgPSAvXmltYWdlXFwvKGdpZnxwbmd8cD9qcGU/ZykkL2k7XG5cbmZ1bmN0aW9uIHNldHVwIChmaWxlaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGJ1cmVhdWNyYXQgPSBjcmVhdGUob3B0aW9ucyk7XG4gIGNyb3NzdmVudC5hZGQoZmlsZWlucHV0LCAnY2hhbmdlJywgaGFuZGxlciwgZmFsc2UpO1xuXG4gIHJldHVybiBidXJlYXVjcmF0O1xuXG4gIGZ1bmN0aW9uIGhhbmRsZXIgKGUpIHtcbiAgICBzdG9wKGUpO1xuICAgIGlmIChmaWxlaW5wdXQuZmlsZXMubGVuZ3RoKSB7XG4gICAgICBidXJlYXVjcmF0LnN1Ym1pdChmaWxlaW5wdXQuZmlsZXMpO1xuICAgIH1cbiAgICBmaWxlaW5wdXQudmFsdWUgPSAnJztcbiAgICBmaWxlaW5wdXQudmFsdWUgPSBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSAob3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIG8uZm9ybURhdGEgPSBvLmZvcm1EYXRhIHx8IHt9O1xuICB2YXIgYnVyZWF1Y3JhdCA9IGVtaXR0ZXIoe1xuICAgIHN1Ym1pdDogc3VibWl0XG4gIH0pO1xuICByZXR1cm4gYnVyZWF1Y3JhdDtcblxuICBmdW5jdGlvbiBzdWJtaXQgKHJhd0ZpbGVzKSB7XG4gICAgYnVyZWF1Y3JhdC5lbWl0KCdzdGFydGVkJywgcmF3RmlsZXMpO1xuICAgIHZhciBhbGxGaWxlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHJhd0ZpbGVzKTtcbiAgICB2YXIgdmFsaWRGaWxlcyA9IGZpbHRlcihhbGxGaWxlcyk7XG4gICAgaWYgKCF2YWxpZEZpbGVzKSB7XG4gICAgICBidXJlYXVjcmF0LmVtaXQoJ2ludmFsaWQnLCBhbGxGaWxlcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGJ1cmVhdWNyYXQuZW1pdCgndmFsaWQnLCB2YWxpZEZpbGVzKTtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIE9iamVjdC5rZXlzKG8uZm9ybURhdGEpLmZvckVhY2goZnVuY3Rpb24gY29weUZvcm1EYXRhKGtleSkge1xuICAgICAgZm9ybS5hcHBlbmQoa2V5LCBvLmZvcm1EYXRhW2tleV0pO1xuICAgIH0pO1xuICAgIHZhciByZXEgPSB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIG1ldGhvZDogby5tZXRob2QgfHwgJ1BVVCcsXG4gICAgICB1cmw6IG8uZW5kcG9pbnQgfHwgJy9hcGkvZmlsZXMnLFxuICAgICAgYm9keTogZm9ybVxuICAgIH07XG5cbiAgICB2YWxpZEZpbGVzLmZvckVhY2goYXBwZW5kRmlsZSk7XG4gICAgeGhyKHJlcSwgaGFuZGxlUmVzcG9uc2UpO1xuXG4gICAgZnVuY3Rpb24gYXBwZW5kRmlsZSAoZmlsZSkge1xuICAgICAgZm9ybS5hcHBlbmQoJ3VwbG9hZHMnLCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlIChlcnIsIHJlcywgYm9keSkge1xuICAgICAgcmVzLmJvZHkgPSBib2R5ID0gZ2V0RGF0YShib2R5KTtcbiAgICAgIHZhciByZXN1bHRzID0gYm9keSAmJiBib2R5LnJlc3VsdHMgJiYgQXJyYXkuaXNBcnJheShib2R5LnJlc3VsdHMpID8gYm9keS5yZXN1bHRzIDogW107XG4gICAgICB2YXIgZmFpbGVkID0gZXJyIHx8IHJlcy5zdGF0dXNDb2RlIDwgMjAwIHx8IHJlcy5zdGF0dXNDb2RlID4gMjk5IHx8IGJvZHkgaW5zdGFuY2VvZiBFcnJvcjtcbiAgICAgIGlmIChmYWlsZWQpIHtcbiAgICAgICAgYnVyZWF1Y3JhdC5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXJlYXVjcmF0LmVtaXQoJ3N1Y2Nlc3MnLCByZXN1bHRzLCBib2R5KTtcbiAgICAgIH1cbiAgICAgIGJ1cmVhdWNyYXQuZW1pdCgnZW5kZWQnLCBlcnIsIHJlc3VsdHMsIGJvZHkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlciAoZmlsZXMpIHtcbiAgICByZXR1cm4gby52YWxpZGF0ZSA/IGZpbGVzLmZpbHRlcih3aGVyZVZhbGlkKSA6IGZpbGVzO1xuICAgIGZ1bmN0aW9uIHdoZXJlVmFsaWQgKGZpbGUpIHtcbiAgICAgIHZhciB2YWxpZGF0b3IgPSB2YWxpZGF0b3JzW28udmFsaWRhdGVdIHx8IG8udmFsaWRhdGU7XG4gICAgICByZXR1cm4gdmFsaWRhdG9yKGZpbGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzdG9wIChlKSB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gaXNJdEFuSW1hZ2VGaWxlIChmaWxlKSB7XG4gIHJldHVybiByaW1hZ2VtaW1lLnRlc3QoZmlsZS50eXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGF0YSAoYm9keSkge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGJvZHkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZXJyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6IGNyZWF0ZSxcbiAgc2V0dXA6IHNldHVwXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3VzdG9tRXZlbnQgPSByZXF1aXJlKCdjdXN0b20tZXZlbnQnKTtcbnZhciBldmVudG1hcCA9IHJlcXVpcmUoJy4vZXZlbnRtYXAnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYWRkRXZlbnQgPSBhZGRFdmVudEVhc3k7XG52YXIgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEVhc3k7XG52YXIgaGFyZENhY2hlID0gW107XG5cbmlmICghZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgYWRkRXZlbnQgPSBhZGRFdmVudEhhcmQ7XG4gIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRIYXJkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRFdmVudCxcbiAgcmVtb3ZlOiByZW1vdmVFdmVudCxcbiAgZmFicmljYXRlOiBmYWJyaWNhdGVFdmVudFxufTtcblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgbGlzdGVuZXIgPSB1bndyYXAoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGxpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGVsLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlLCBtb2RlbCkge1xuICB2YXIgZSA9IGV2ZW50bWFwLmluZGV4T2YodHlwZSkgPT09IC0xID8gbWFrZUN1c3RvbUV2ZW50KCkgOiBtYWtlQ2xhc3NpY0V2ZW50KCk7XG4gIGlmIChlbC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDbGFzc2ljRXZlbnQgKCkge1xuICAgIHZhciBlO1xuICAgIGlmIChkb2MuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ3VzdG9tRXZlbnQgKCkge1xuICAgIHJldHVybiBuZXcgY3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWw6IG1vZGVsIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBmbi5jYWxsKGVsLCBlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciB3cmFwcGVyID0gdW53cmFwKGVsLCB0eXBlLCBmbikgfHwgd3JhcHBlckZhY3RvcnkoZWwsIHR5cGUsIGZuKTtcbiAgaGFyZENhY2hlLnB1c2goe1xuICAgIHdyYXBwZXI6IHdyYXBwZXIsXG4gICAgZWxlbWVudDogZWwsXG4gICAgdHlwZTogdHlwZSxcbiAgICBmbjogZm5cbiAgfSk7XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiB1bndyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSA9IGZpbmQoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgd3JhcHBlciA9IGhhcmRDYWNoZVtpXS53cmFwcGVyO1xuICAgIGhhcmRDYWNoZS5zcGxpY2UoaSwgMSk7IC8vIGZyZWUgdXAgYSB0YWQgb2YgbWVtb3J5XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpLCBpdGVtO1xuICBmb3IgKGkgPSAwOyBpIDwgaGFyZENhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbSA9IGhhcmRDYWNoZVtpXTtcbiAgICBpZiAoaXRlbS5lbGVtZW50ID09PSBlbCAmJiBpdGVtLnR5cGUgPT09IHR5cGUgJiYgaXRlbS5mbiA9PT0gZm4pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpZFhKbFlYVmpjbUZqZVM5dWIyUmxYMjF2WkhWc1pYTXZZM0p2YzNOMlpXNTBMM055WXk5amNtOXpjM1psYm5RdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnWTNWemRHOXRSWFpsYm5RZ1BTQnlaWEYxYVhKbEtDZGpkWE4wYjIwdFpYWmxiblFuS1R0Y2JuWmhjaUJsZG1WdWRHMWhjQ0E5SUhKbGNYVnBjbVVvSnk0dlpYWmxiblJ0WVhBbktUdGNiblpoY2lCa2IyTWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzUyWVhJZ1lXUmtSWFpsYm5RZ1BTQmhaR1JGZG1WdWRFVmhjM2s3WEc1MllYSWdjbVZ0YjNabFJYWmxiblFnUFNCeVpXMXZkbVZGZG1WdWRFVmhjM2s3WEc1MllYSWdhR0Z5WkVOaFkyaGxJRDBnVzEwN1hHNWNibWxtSUNnaFoyeHZZbUZzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElwSUh0Y2JpQWdZV1JrUlhabGJuUWdQU0JoWkdSRmRtVnVkRWhoY21RN1hHNGdJSEpsYlc5MlpVVjJaVzUwSUQwZ2NtVnRiM1psUlhabGJuUklZWEprTzF4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHRjYmlBZ1lXUmtPaUJoWkdSRmRtVnVkQ3hjYmlBZ2NtVnRiM1psT2lCeVpXMXZkbVZGZG1WdWRDeGNiaUFnWm1GaWNtbGpZWFJsT2lCbVlXSnlhV05oZEdWRmRtVnVkRnh1ZlR0Y2JseHVablZ1WTNScGIyNGdZV1JrUlhabGJuUkZZWE41SUNobGJDd2dkSGx3WlN3Z1ptNHNJR05oY0hSMWNtbHVaeWtnZTF4dUlDQnlaWFIxY200Z1pXd3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpaDBlWEJsTENCbWJpd2dZMkZ3ZEhWeWFXNW5LVHRjYm4xY2JseHVablZ1WTNScGIyNGdZV1JrUlhabGJuUklZWEprSUNobGJDd2dkSGx3WlN3Z1ptNHBJSHRjYmlBZ2NtVjBkWEp1SUdWc0xtRjBkR0ZqYUVWMlpXNTBLQ2R2YmljZ0t5QjBlWEJsTENCM2NtRndLR1ZzTENCMGVYQmxMQ0JtYmlrcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVpXMXZkbVZGZG1WdWRFVmhjM2tnS0dWc0xDQjBlWEJsTENCbWJpd2dZMkZ3ZEhWeWFXNW5LU0I3WEc0Z0lISmxkSFZ5YmlCbGJDNXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLSFI1Y0dVc0lHWnVMQ0JqWVhCMGRYSnBibWNwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WlcxdmRtVkZkbVZ1ZEVoaGNtUWdLR1ZzTENCMGVYQmxMQ0JtYmlrZ2UxeHVJQ0IyWVhJZ2JHbHpkR1Z1WlhJZ1BTQjFibmR5WVhBb1pXd3NJSFI1Y0dVc0lHWnVLVHRjYmlBZ2FXWWdLR3hwYzNSbGJtVnlLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHVnNMbVJsZEdGamFFVjJaVzUwS0NkdmJpY2dLeUIwZVhCbExDQnNhWE4wWlc1bGNpazdYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWm1GaWNtbGpZWFJsUlhabGJuUWdLR1ZzTENCMGVYQmxMQ0J0YjJSbGJDa2dlMXh1SUNCMllYSWdaU0E5SUdWMlpXNTBiV0Z3TG1sdVpHVjRUMllvZEhsd1pTa2dQVDA5SUMweElEOGdiV0ZyWlVOMWMzUnZiVVYyWlc1MEtDa2dPaUJ0WVd0bFEyeGhjM05wWTBWMlpXNTBLQ2s3WEc0Z0lHbG1JQ2hsYkM1a2FYTndZWFJqYUVWMlpXNTBLU0I3WEc0Z0lDQWdaV3d1WkdsemNHRjBZMmhGZG1WdWRDaGxLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JsYkM1bWFYSmxSWFpsYm5Rb0oyOXVKeUFySUhSNWNHVXNJR1VwTzF4dUlDQjlYRzRnSUdaMWJtTjBhVzl1SUcxaGEyVkRiR0Z6YzJsalJYWmxiblFnS0NrZ2UxeHVJQ0FnSUhaaGNpQmxPMXh1SUNBZ0lHbG1JQ2hrYjJNdVkzSmxZWFJsUlhabGJuUXBJSHRjYmlBZ0lDQWdJR1VnUFNCa2IyTXVZM0psWVhSbFJYWmxiblFvSjBWMlpXNTBKeWs3WEc0Z0lDQWdJQ0JsTG1sdWFYUkZkbVZ1ZENoMGVYQmxMQ0IwY25WbExDQjBjblZsS1R0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0dSdll5NWpjbVZoZEdWRmRtVnVkRTlpYW1WamRDa2dlMXh1SUNBZ0lDQWdaU0E5SUdSdll5NWpjbVZoZEdWRmRtVnVkRTlpYW1WamRDZ3BPMXh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnWlR0Y2JpQWdmVnh1SUNCbWRXNWpkR2x2YmlCdFlXdGxRM1Z6ZEc5dFJYWmxiblFnS0NrZ2UxeHVJQ0FnSUhKbGRIVnliaUJ1WlhjZ1kzVnpkRzl0UlhabGJuUW9kSGx3WlN3Z2V5QmtaWFJoYVd3NklHMXZaR1ZzSUgwcE8xeHVJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJSGR5WVhCd1pYSkdZV04wYjNKNUlDaGxiQ3dnZEhsd1pTd2dabTRwSUh0Y2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUlIZHlZWEJ3WlhJZ0tHOXlhV2RwYm1Gc1JYWmxiblFwSUh0Y2JpQWdJQ0IyWVhJZ1pTQTlJRzl5YVdkcGJtRnNSWFpsYm5RZ2ZId2daMnh2WW1Gc0xtVjJaVzUwTzF4dUlDQWdJR1V1ZEdGeVoyVjBJRDBnWlM1MFlYSm5aWFFnZkh3Z1pTNXpjbU5GYkdWdFpXNTBPMXh1SUNBZ0lHVXVjSEpsZG1WdWRFUmxabUYxYkhRZ1BTQmxMbkJ5WlhabGJuUkVaV1poZFd4MElIeDhJR1oxYm1OMGFXOXVJSEJ5WlhabGJuUkVaV1poZFd4MElDZ3BJSHNnWlM1eVpYUjFjbTVXWVd4MVpTQTlJR1poYkhObE95QjlPMXh1SUNBZ0lHVXVjM1J2Y0ZCeWIzQmhaMkYwYVc5dUlEMGdaUzV6ZEc5d1VISnZjR0ZuWVhScGIyNGdmSHdnWm5WdVkzUnBiMjRnYzNSdmNGQnliM0JoWjJGMGFXOXVJQ2dwSUhzZ1pTNWpZVzVqWld4Q2RXSmliR1VnUFNCMGNuVmxPeUI5TzF4dUlDQWdJR1V1ZDJocFkyZ2dQU0JsTG5kb2FXTm9JSHg4SUdVdWEyVjVRMjlrWlR0Y2JpQWdJQ0JtYmk1allXeHNLR1ZzTENCbEtUdGNiaUFnZlR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnZDNKaGNDQW9aV3dzSUhSNWNHVXNJR1p1S1NCN1hHNGdJSFpoY2lCM2NtRndjR1Z5SUQwZ2RXNTNjbUZ3S0dWc0xDQjBlWEJsTENCbWJpa2dmSHdnZDNKaGNIQmxja1poWTNSdmNua29aV3dzSUhSNWNHVXNJR1p1S1R0Y2JpQWdhR0Z5WkVOaFkyaGxMbkIxYzJnb2UxeHVJQ0FnSUhkeVlYQndaWEk2SUhkeVlYQndaWElzWEc0Z0lDQWdaV3hsYldWdWREb2daV3dzWEc0Z0lDQWdkSGx3WlRvZ2RIbHdaU3hjYmlBZ0lDQm1iam9nWm01Y2JpQWdmU2s3WEc0Z0lISmxkSFZ5YmlCM2NtRndjR1Z5TzF4dWZWeHVYRzVtZFc1amRHbHZiaUIxYm5keVlYQWdLR1ZzTENCMGVYQmxMQ0JtYmlrZ2UxeHVJQ0IyWVhJZ2FTQTlJR1pwYm1Rb1pXd3NJSFI1Y0dVc0lHWnVLVHRjYmlBZ2FXWWdLR2twSUh0Y2JpQWdJQ0IyWVhJZ2QzSmhjSEJsY2lBOUlHaGhjbVJEWVdOb1pWdHBYUzUzY21Gd2NHVnlPMXh1SUNBZ0lHaGhjbVJEWVdOb1pTNXpjR3hwWTJVb2FTd2dNU2s3SUM4dklHWnlaV1VnZFhBZ1lTQjBZV1FnYjJZZ2JXVnRiM0o1WEc0Z0lDQWdjbVYwZFhKdUlIZHlZWEJ3WlhJN1hHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdabWx1WkNBb1pXd3NJSFI1Y0dVc0lHWnVLU0I3WEc0Z0lIWmhjaUJwTENCcGRHVnRPMXh1SUNCbWIzSWdLR2tnUFNBd095QnBJRHdnYUdGeVpFTmhZMmhsTG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2FYUmxiU0E5SUdoaGNtUkRZV05vWlZ0cFhUdGNiaUFnSUNCcFppQW9hWFJsYlM1bGJHVnRaVzUwSUQwOVBTQmxiQ0FtSmlCcGRHVnRMblI1Y0dVZ1BUMDlJSFI1Y0dVZ0ppWWdhWFJsYlM1bWJpQTlQVDBnWm00cElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCcE8xeHVJQ0FnSUgxY2JpQWdmVnh1ZlZ4dUlsMTkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBldmVudG1hcCA9IFtdO1xudmFyIGV2ZW50bmFtZSA9ICcnO1xudmFyIHJvbiA9IC9eb24vO1xuXG5mb3IgKGV2ZW50bmFtZSBpbiBnbG9iYWwpIHtcbiAgaWYgKHJvbi50ZXN0KGV2ZW50bmFtZSkpIHtcbiAgICBldmVudG1hcC5wdXNoKGV2ZW50bmFtZS5zbGljZSgyKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBldmVudG1hcDtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWRYSmxZWFZqY21GamVTOXViMlJsWDIxdlpIVnNaWE12WTNKdmMzTjJaVzUwTDNOeVl5OWxkbVZ1ZEcxaGNDNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ1pYWmxiblJ0WVhBZ1BTQmJYVHRjYm5aaGNpQmxkbVZ1ZEc1aGJXVWdQU0FuSnp0Y2JuWmhjaUJ5YjI0Z1BTQXZYbTl1THp0Y2JseHVabTl5SUNobGRtVnVkRzVoYldVZ2FXNGdaMnh2WW1Gc0tTQjdYRzRnSUdsbUlDaHliMjR1ZEdWemRDaGxkbVZ1ZEc1aGJXVXBLU0I3WEc0Z0lDQWdaWFpsYm5SdFlYQXVjSFZ6YUNobGRtVnVkRzVoYldVdWMyeHBZMlVvTWlrcE8xeHVJQ0I5WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdaWFpsYm5SdFlYQTdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRpY2t5ID0gcmVxdWlyZSgndGlja3knKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWJvdW5jZSAoZm4sIGFyZ3MsIGN0eCkge1xuICBpZiAoIWZuKSB7IHJldHVybjsgfVxuICB0aWNreShmdW5jdGlvbiBydW4gKCkge1xuICAgIGZuLmFwcGx5KGN0eCB8fCBudWxsLCBhcmdzIHx8IFtdKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXRvYSA9IHJlcXVpcmUoJ2F0b2EnKTtcbnZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbWl0dGVyICh0aGluZywgb3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBldnQgPSB7fTtcbiAgaWYgKHRoaW5nID09PSB1bmRlZmluZWQpIHsgdGhpbmcgPSB7fTsgfVxuICB0aGluZy5vbiA9IGZ1bmN0aW9uICh0eXBlLCBmbikge1xuICAgIGlmICghZXZ0W3R5cGVdKSB7XG4gICAgICBldnRbdHlwZV0gPSBbZm5dO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnRbdHlwZV0ucHVzaChmbik7XG4gICAgfVxuICAgIHJldHVybiB0aGluZztcbiAgfTtcbiAgdGhpbmcub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBmbikge1xuICAgIGZuLl9vbmNlID0gdHJ1ZTsgLy8gdGhpbmcub2ZmKGZuKSBzdGlsbCB3b3JrcyFcbiAgICB0aGluZy5vbih0eXBlLCBmbik7XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9O1xuICB0aGluZy5vZmYgPSBmdW5jdGlvbiAodHlwZSwgZm4pIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGMgPT09IDEpIHtcbiAgICAgIGRlbGV0ZSBldnRbdHlwZV07XG4gICAgfSBlbHNlIGlmIChjID09PSAwKSB7XG4gICAgICBldnQgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGV0ID0gZXZ0W3R5cGVdO1xuICAgICAgaWYgKCFldCkgeyByZXR1cm4gdGhpbmc7IH1cbiAgICAgIGV0LnNwbGljZShldC5pbmRleE9mKGZuKSwgMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGluZztcbiAgfTtcbiAgdGhpbmcuZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IGF0b2EoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpbmcuZW1pdHRlclNuYXBzaG90KGFyZ3Muc2hpZnQoKSkuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG4gIHRoaW5nLmVtaXR0ZXJTbmFwc2hvdCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgdmFyIGV0ID0gKGV2dFt0eXBlXSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhcmdzID0gYXRvYShhcmd1bWVudHMpO1xuICAgICAgdmFyIGN0eCA9IHRoaXMgfHwgdGhpbmc7XG4gICAgICBpZiAodHlwZSA9PT0gJ2Vycm9yJyAmJiBvcHRzLnRocm93cyAhPT0gZmFsc2UgJiYgIWV0Lmxlbmd0aCkgeyB0aHJvdyBhcmdzLmxlbmd0aCA9PT0gMSA/IGFyZ3NbMF0gOiBhcmdzOyB9XG4gICAgICBldC5mb3JFYWNoKGZ1bmN0aW9uIGVtaXR0ZXIgKGxpc3Rlbikge1xuICAgICAgICBpZiAob3B0cy5hc3luYykgeyBkZWJvdW5jZShsaXN0ZW4sIGFyZ3MsIGN0eCk7IH0gZWxzZSB7IGxpc3Rlbi5hcHBseShjdHgsIGFyZ3MpOyB9XG4gICAgICAgIGlmIChsaXN0ZW4uX29uY2UpIHsgdGhpbmcub2ZmKHR5cGUsIGxpc3Rlbik7IH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaW5nO1xuICAgIH07XG4gIH07XG4gIHJldHVybiB0aGluZztcbn07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBjdXN0b21FdmVudCA9IHJlcXVpcmUoJ2N1c3RvbS1ldmVudCcpO1xudmFyIGV2ZW50bWFwID0gcmVxdWlyZSgnLi9ldmVudG1hcCcpO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGFkZEV2ZW50ID0gYWRkRXZlbnRFYXN5O1xudmFyIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRFYXN5O1xudmFyIGhhcmRDYWNoZSA9IFtdO1xuXG5pZiAoIWdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gIGFkZEV2ZW50ID0gYWRkRXZlbnRIYXJkO1xuICByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50SGFyZDtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHVud3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlLCBtb2RlbCkge1xuICB2YXIgZSA9IGV2ZW50bWFwLmluZGV4T2YodHlwZSkgPT09IC0xID8gbWFrZUN1c3RvbUV2ZW50KCkgOiBtYWtlQ2xhc3NpY0V2ZW50KCk7XG4gIGlmIChlbC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDbGFzc2ljRXZlbnQgKCkge1xuICAgIHZhciBlO1xuICAgIGlmIChkb2MuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ3VzdG9tRXZlbnQgKCkge1xuICAgIHJldHVybiBuZXcgY3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWw6IG1vZGVsIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBmbi5jYWxsKGVsLCBlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciB3cmFwcGVyID0gdW53cmFwKGVsLCB0eXBlLCBmbikgfHwgd3JhcHBlckZhY3RvcnkoZWwsIHR5cGUsIGZuKTtcbiAgaGFyZENhY2hlLnB1c2goe1xuICAgIHdyYXBwZXI6IHdyYXBwZXIsXG4gICAgZWxlbWVudDogZWwsXG4gICAgdHlwZTogdHlwZSxcbiAgICBmbjogZm5cbiAgfSk7XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiB1bndyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSA9IGZpbmQoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgd3JhcHBlciA9IGhhcmRDYWNoZVtpXS53cmFwcGVyO1xuICAgIGhhcmRDYWNoZS5zcGxpY2UoaSwgMSk7IC8vIGZyZWUgdXAgYSB0YWQgb2YgbWVtb3J5XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpLCBpdGVtO1xuICBmb3IgKGkgPSAwOyBpIDwgaGFyZENhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbSA9IGhhcmRDYWNoZVtpXTtcbiAgICBpZiAoaXRlbS5lbGVtZW50ID09PSBlbCAmJiBpdGVtLnR5cGUgPT09IHR5cGUgJiYgaXRlbS5mbiA9PT0gZm4pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRFdmVudCxcbiAgcmVtb3ZlOiByZW1vdmVFdmVudCxcbiAgZmFicmljYXRlOiBmYWJyaWNhdGVFdmVudFxufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5amNtOXpjM1psYm5RdmMzSmpMMk55YjNOemRtVnVkQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJqZFhOMGIyMUZkbVZ1ZENBOUlISmxjWFZwY21Vb0oyTjFjM1J2YlMxbGRtVnVkQ2NwTzF4dWRtRnlJR1YyWlc1MGJXRndJRDBnY21WeGRXbHlaU2duTGk5bGRtVnVkRzFoY0NjcE8xeHVkbUZ5SUdSdll5QTlJR1J2WTNWdFpXNTBPMXh1ZG1GeUlHRmtaRVYyWlc1MElEMGdZV1JrUlhabGJuUkZZWE41TzF4dWRtRnlJSEpsYlc5MlpVVjJaVzUwSUQwZ2NtVnRiM1psUlhabGJuUkZZWE41TzF4dWRtRnlJR2hoY21SRFlXTm9aU0E5SUZ0ZE8xeHVYRzVwWmlBb0lXZHNiMkpoYkM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S1NCN1hHNGdJR0ZrWkVWMlpXNTBJRDBnWVdSa1JYWmxiblJJWVhKa08xeHVJQ0J5WlcxdmRtVkZkbVZ1ZENBOUlISmxiVzkyWlVWMlpXNTBTR0Z5WkR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWVdSa1JYWmxiblJGWVhONUlDaGxiQ3dnZEhsd1pTd2dabTRzSUdOaGNIUjFjbWx1WnlrZ2UxeHVJQ0J5WlhSMWNtNGdaV3d1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWgwZVhCbExDQm1iaXdnWTJGd2RIVnlhVzVuS1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWVdSa1JYWmxiblJJWVhKa0lDaGxiQ3dnZEhsd1pTd2dabTRwSUh0Y2JpQWdjbVYwZFhKdUlHVnNMbUYwZEdGamFFVjJaVzUwS0NkdmJpY2dLeUIwZVhCbExDQjNjbUZ3S0dWc0xDQjBlWEJsTENCbWJpa3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaVzF2ZG1WRmRtVnVkRVZoYzNrZ0tHVnNMQ0IwZVhCbExDQm1iaXdnWTJGd2RIVnlhVzVuS1NCN1hHNGdJSEpsZEhWeWJpQmxiQzV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0hSNWNHVXNJR1p1TENCallYQjBkWEpwYm1jcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVpXMXZkbVZGZG1WdWRFaGhjbVFnS0dWc0xDQjBlWEJsTENCbWJpa2dlMXh1SUNCeVpYUjFjbTRnWld3dVpHVjBZV05vUlhabGJuUW9KMjl1SnlBcklIUjVjR1VzSUhWdWQzSmhjQ2hsYkN3Z2RIbHdaU3dnWm00cEtUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1ptRmljbWxqWVhSbFJYWmxiblFnS0dWc0xDQjBlWEJsTENCdGIyUmxiQ2tnZTF4dUlDQjJZWElnWlNBOUlHVjJaVzUwYldGd0xtbHVaR1Y0VDJZb2RIbHdaU2tnUFQwOUlDMHhJRDhnYldGclpVTjFjM1J2YlVWMlpXNTBLQ2tnT2lCdFlXdGxRMnhoYzNOcFkwVjJaVzUwS0NrN1hHNGdJR2xtSUNobGJDNWthWE53WVhSamFFVjJaVzUwS1NCN1hHNGdJQ0FnWld3dVpHbHpjR0YwWTJoRmRtVnVkQ2hsS1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCbGJDNW1hWEpsUlhabGJuUW9KMjl1SnlBcklIUjVjR1VzSUdVcE8xeHVJQ0I5WEc0Z0lHWjFibU4wYVc5dUlHMWhhMlZEYkdGemMybGpSWFpsYm5RZ0tDa2dlMXh1SUNBZ0lIWmhjaUJsTzF4dUlDQWdJR2xtSUNoa2IyTXVZM0psWVhSbFJYWmxiblFwSUh0Y2JpQWdJQ0FnSUdVZ1BTQmtiMk11WTNKbFlYUmxSWFpsYm5Rb0owVjJaVzUwSnlrN1hHNGdJQ0FnSUNCbExtbHVhWFJGZG1WdWRDaDBlWEJsTENCMGNuVmxMQ0IwY25WbEtUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHUnZZeTVqY21WaGRHVkZkbVZ1ZEU5aWFtVmpkQ2tnZTF4dUlDQWdJQ0FnWlNBOUlHUnZZeTVqY21WaGRHVkZkbVZ1ZEU5aWFtVmpkQ2dwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1pUdGNiaUFnZlZ4dUlDQm1kVzVqZEdsdmJpQnRZV3RsUTNWemRHOXRSWFpsYm5RZ0tDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCdVpYY2dZM1Z6ZEc5dFJYWmxiblFvZEhsd1pTd2dleUJrWlhSaGFXdzZJRzF2WkdWc0lIMHBPMXh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUhkeVlYQndaWEpHWVdOMGIzSjVJQ2hsYkN3Z2RIbHdaU3dnWm00cElIdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJSGR5WVhCd1pYSWdLRzl5YVdkcGJtRnNSWFpsYm5RcElIdGNiaUFnSUNCMllYSWdaU0E5SUc5eWFXZHBibUZzUlhabGJuUWdmSHdnWjJ4dlltRnNMbVYyWlc1ME8xeHVJQ0FnSUdVdWRHRnlaMlYwSUQwZ1pTNTBZWEpuWlhRZ2ZId2daUzV6Y21ORmJHVnRaVzUwTzF4dUlDQWdJR1V1Y0hKbGRtVnVkRVJsWm1GMWJIUWdQU0JsTG5CeVpYWmxiblJFWldaaGRXeDBJSHg4SUdaMWJtTjBhVzl1SUhCeVpYWmxiblJFWldaaGRXeDBJQ2dwSUhzZ1pTNXlaWFIxY201V1lXeDFaU0E5SUdaaGJITmxPeUI5TzF4dUlDQWdJR1V1YzNSdmNGQnliM0JoWjJGMGFXOXVJRDBnWlM1emRHOXdVSEp2Y0dGbllYUnBiMjRnZkh3Z1puVnVZM1JwYjI0Z2MzUnZjRkJ5YjNCaFoyRjBhVzl1SUNncElIc2daUzVqWVc1alpXeENkV0ppYkdVZ1BTQjBjblZsT3lCOU8xeHVJQ0FnSUdVdWQyaHBZMmdnUFNCbExuZG9hV05vSUh4OElHVXVhMlY1UTI5a1pUdGNiaUFnSUNCbWJpNWpZV3hzS0dWc0xDQmxLVHRjYmlBZ2ZUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2QzSmhjQ0FvWld3c0lIUjVjR1VzSUdadUtTQjdYRzRnSUhaaGNpQjNjbUZ3Y0dWeUlEMGdkVzUzY21Gd0tHVnNMQ0IwZVhCbExDQm1iaWtnZkh3Z2QzSmhjSEJsY2taaFkzUnZjbmtvWld3c0lIUjVjR1VzSUdadUtUdGNiaUFnYUdGeVpFTmhZMmhsTG5CMWMyZ29lMXh1SUNBZ0lIZHlZWEJ3WlhJNklIZHlZWEJ3WlhJc1hHNGdJQ0FnWld4bGJXVnVkRG9nWld3c1hHNGdJQ0FnZEhsd1pUb2dkSGx3WlN4Y2JpQWdJQ0JtYmpvZ1ptNWNiaUFnZlNrN1hHNGdJSEpsZEhWeWJpQjNjbUZ3Y0dWeU8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCMWJuZHlZWEFnS0dWc0xDQjBlWEJsTENCbWJpa2dlMXh1SUNCMllYSWdhU0E5SUdacGJtUW9aV3dzSUhSNWNHVXNJR1p1S1R0Y2JpQWdhV1lnS0drcElIdGNiaUFnSUNCMllYSWdkM0poY0hCbGNpQTlJR2hoY21SRFlXTm9aVnRwWFM1M2NtRndjR1Z5TzF4dUlDQWdJR2hoY21SRFlXTm9aUzV6Y0d4cFkyVW9hU3dnTVNrN0lDOHZJR1p5WldVZ2RYQWdZU0IwWVdRZ2IyWWdiV1Z0YjNKNVhHNGdJQ0FnY21WMGRYSnVJSGR5WVhCd1pYSTdYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWm1sdVpDQW9aV3dzSUhSNWNHVXNJR1p1S1NCN1hHNGdJSFpoY2lCcExDQnBkR1Z0TzF4dUlDQm1iM0lnS0drZ1BTQXdPeUJwSUR3Z2FHRnlaRU5oWTJobExteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdhWFJsYlNBOUlHaGhjbVJEWVdOb1pWdHBYVHRjYmlBZ0lDQnBaaUFvYVhSbGJTNWxiR1Z0Wlc1MElEMDlQU0JsYkNBbUppQnBkR1Z0TG5SNWNHVWdQVDA5SUhSNWNHVWdKaVlnYVhSbGJTNW1iaUE5UFQwZ1ptNHBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnBPMXh1SUNBZ0lIMWNiaUFnZlZ4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHRjYmlBZ1lXUmtPaUJoWkdSRmRtVnVkQ3hjYmlBZ2NtVnRiM1psT2lCeVpXMXZkbVZGZG1WdWRDeGNiaUFnWm1GaWNtbGpZWFJsT2lCbVlXSnlhV05oZEdWRmRtVnVkRnh1ZlR0Y2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXZlbnRtYXAgPSBbXTtcbnZhciBldmVudG5hbWUgPSAnJztcbnZhciByb24gPSAvXm9uLztcblxuZm9yIChldmVudG5hbWUgaW4gZ2xvYmFsKSB7XG4gIGlmIChyb24udGVzdChldmVudG5hbWUpKSB7XG4gICAgZXZlbnRtYXAucHVzaChldmVudG5hbWUuc2xpY2UoMikpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXZlbnRtYXA7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWpjbTl6YzNabGJuUXZjM0pqTDJWMlpXNTBiV0Z3TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJsZG1WdWRHMWhjQ0E5SUZ0ZE8xeHVkbUZ5SUdWMlpXNTBibUZ0WlNBOUlDY25PMXh1ZG1GeUlISnZiaUE5SUM5ZWIyNHZPMXh1WEc1bWIzSWdLR1YyWlc1MGJtRnRaU0JwYmlCbmJHOWlZV3dwSUh0Y2JpQWdhV1lnS0hKdmJpNTBaWE4wS0dWMlpXNTBibUZ0WlNrcElIdGNiaUFnSUNCbGRtVnVkRzFoY0M1d2RYTm9LR1YyWlc1MGJtRnRaUzV6YkdsalpTZ3lLU2s3WEc0Z0lIMWNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbGRtVnVkRzFoY0R0Y2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXG52YXIgTmF0aXZlQ3VzdG9tRXZlbnQgPSBnbG9iYWwuQ3VzdG9tRXZlbnQ7XG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHAgPSBuZXcgTmF0aXZlQ3VzdG9tRXZlbnQoJ2NhdCcsIHsgZGV0YWlsOiB7IGZvbzogJ2JhcicgfSB9KTtcbiAgICByZXR1cm4gICdjYXQnID09PSBwLnR5cGUgJiYgJ2JhcicgPT09IHAuZGV0YWlsLmZvbztcbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcm9zcy1icm93c2VyIGBDdXN0b21FdmVudGAgY29uc3RydWN0b3IuXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50LkN1c3RvbUV2ZW50XG4gKlxuICogQHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdXNlTmF0aXZlKCkgPyBOYXRpdmVDdXN0b21FdmVudCA6XG5cbi8vIElFID49IDlcbidmdW5jdGlvbicgPT09IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFdmVudCA/IGZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gIH0gZWxzZSB7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlLCB2b2lkIDApO1xuICB9XG4gIHJldHVybiBlO1xufSA6XG5cbi8vIElFIDw9IDhcbmZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICBlLnR5cGUgPSB0eXBlO1xuICBpZiAocGFyYW1zKSB7XG4gICAgZS5idWJibGVzID0gQm9vbGVhbihwYXJhbXMuYnViYmxlcyk7XG4gICAgZS5jYW5jZWxhYmxlID0gQm9vbGVhbihwYXJhbXMuY2FuY2VsYWJsZSk7XG4gICAgZS5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICB9IGVsc2Uge1xuICAgIGUuYnViYmxlcyA9IGZhbHNlO1xuICAgIGUuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgIGUuZGV0YWlsID0gdm9pZCAwO1xuICB9XG4gIHJldHVybiBlO1xufVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlqZFhOMGIyMHRaWFpsYm5RdmFXNWtaWGd1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpjYm5aaGNpQk9ZWFJwZG1WRGRYTjBiMjFGZG1WdWRDQTlJR2RzYjJKaGJDNURkWE4wYjIxRmRtVnVkRHRjYmx4dVpuVnVZM1JwYjI0Z2RYTmxUbUYwYVhabElDZ3BJSHRjYmlBZ2RISjVJSHRjYmlBZ0lDQjJZWElnY0NBOUlHNWxkeUJPWVhScGRtVkRkWE4wYjIxRmRtVnVkQ2duWTJGMEp5d2dleUJrWlhSaGFXdzZJSHNnWm05dk9pQW5ZbUZ5SnlCOUlIMHBPMXh1SUNBZ0lISmxkSFZ5YmlBZ0oyTmhkQ2NnUFQwOUlIQXVkSGx3WlNBbUppQW5ZbUZ5SnlBOVBUMGdjQzVrWlhSaGFXd3VabTl2TzF4dUlDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1poYkhObE8xeHVmVnh1WEc0dktpcGNiaUFxSUVOeWIzTnpMV0p5YjNkelpYSWdZRU4xYzNSdmJVVjJaVzUwWUNCamIyNXpkSEoxWTNSdmNpNWNiaUFxWEc0Z0tpQm9kSFJ3Y3pvdkwyUmxkbVZzYjNCbGNpNXRiM3BwYkd4aExtOXlaeTlsYmkxVlV5OWtiMk56TDFkbFlpOUJVRWt2UTNWemRHOXRSWFpsYm5RdVEzVnpkRzl0UlhabGJuUmNiaUFxWEc0Z0tpQkFjSFZpYkdsalhHNGdLaTljYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCMWMyVk9ZWFJwZG1Vb0tTQS9JRTVoZEdsMlpVTjFjM1J2YlVWMlpXNTBJRHBjYmx4dUx5OGdTVVVnUGowZ09WeHVKMloxYm1OMGFXOXVKeUE5UFQwZ2RIbHdaVzltSUdSdlkzVnRaVzUwTG1OeVpXRjBaVVYyWlc1MElEOGdablZ1WTNScGIyNGdRM1Z6ZEc5dFJYWmxiblFnS0hSNWNHVXNJSEJoY21GdGN5a2dlMXh1SUNCMllYSWdaU0E5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVYyWlc1MEtDZERkWE4wYjIxRmRtVnVkQ2NwTzF4dUlDQnBaaUFvY0dGeVlXMXpLU0I3WEc0Z0lDQWdaUzVwYm1sMFEzVnpkRzl0UlhabGJuUW9kSGx3WlN3Z2NHRnlZVzF6TG1KMVltSnNaWE1zSUhCaGNtRnRjeTVqWVc1alpXeGhZbXhsTENCd1lYSmhiWE11WkdWMFlXbHNLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JsTG1sdWFYUkRkWE4wYjIxRmRtVnVkQ2gwZVhCbExDQm1ZV3h6WlN3Z1ptRnNjMlVzSUhadmFXUWdNQ2s3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1U3WEc1OUlEcGNibHh1THk4Z1NVVWdQRDBnT0Z4dVpuVnVZM1JwYjI0Z1EzVnpkRzl0UlhabGJuUWdLSFI1Y0dVc0lIQmhjbUZ0Y3lrZ2UxeHVJQ0IyWVhJZ1pTQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVjJaVzUwVDJKcVpXTjBLQ2s3WEc0Z0lHVXVkSGx3WlNBOUlIUjVjR1U3WEc0Z0lHbG1JQ2h3WVhKaGJYTXBJSHRjYmlBZ0lDQmxMbUoxWW1Kc1pYTWdQU0JDYjI5c1pXRnVLSEJoY21GdGN5NWlkV0ppYkdWektUdGNiaUFnSUNCbExtTmhibU5sYkdGaWJHVWdQU0JDYjI5c1pXRnVLSEJoY21GdGN5NWpZVzVqWld4aFlteGxLVHRjYmlBZ0lDQmxMbVJsZEdGcGJDQTlJSEJoY21GdGN5NWtaWFJoYVd3N1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ1pTNWlkV0ppYkdWeklEMGdabUZzYzJVN1hHNGdJQ0FnWlM1allXNWpaV3hoWW14bElEMGdabUZzYzJVN1hHNGdJQ0FnWlM1a1pYUmhhV3dnUFNCMmIybGtJREE3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1U3WEc1OVhHNGlYWDA9IiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCdpcy1mdW5jdGlvbicpXG5cbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaFxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG5cbmZ1bmN0aW9uIGZvckVhY2gobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24oaXRlcmF0b3IpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2l0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gICAgfVxuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICAgIGNvbnRleHQgPSB0aGlzXG4gICAgfVxuICAgIFxuICAgIGlmICh0b1N0cmluZy5jYWxsKGxpc3QpID09PSAnW29iamVjdCBBcnJheV0nKVxuICAgICAgICBmb3JFYWNoQXJyYXkobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG4gICAgZWxzZSBpZiAodHlwZW9mIGxpc3QgPT09ICdzdHJpbmcnKVxuICAgICAgICBmb3JFYWNoU3RyaW5nKGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxuICAgIGVsc2VcbiAgICAgICAgZm9yRWFjaE9iamVjdChsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbn1cblxuZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgaSkpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgYXJyYXlbaV0sIGksIGFycmF5KVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoU3RyaW5nKHN0cmluZywgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyaW5nLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIC8vIG5vIHN1Y2ggdGhpbmcgYXMgYSBzcGFyc2Ugc3RyaW5nLlxuICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIHN0cmluZy5jaGFyQXQoaSksIGksIHN0cmluZylcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hPYmplY3Qob2JqZWN0LCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGsgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgaykpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqZWN0W2tdLCBrLCBvYmplY3QpXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHNlbGY7XG59IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0ge307XG59XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OW5iRzlpWVd3dmQybHVaRzkzTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWFXWWdLSFI1Y0dWdlppQjNhVzVrYjNjZ0lUMDlJRndpZFc1a1pXWnBibVZrWENJcElIdGNiaUFnSUNCdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhkcGJtUnZkenRjYm4wZ1pXeHpaU0JwWmlBb2RIbHdaVzltSUdkc2IySmhiQ0FoUFQwZ1hDSjFibVJsWm1sdVpXUmNJaWtnZTF4dUlDQWdJRzF2WkhWc1pTNWxlSEJ2Y25SeklEMGdaMnh2WW1Gc08xeHVmU0JsYkhObElHbG1JQ2gwZVhCbGIyWWdjMlZzWmlBaFBUMGdYQ0oxYm1SbFptbHVaV1JjSWlsN1hHNGdJQ0FnYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0J6Wld4bU8xeHVmU0JsYkhObElIdGNiaUFnSUNCdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUh0OU8xeHVmVnh1SWwxOSIsIm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvblxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKGZuKSB7XG4gIHZhciBzdHJpbmcgPSB0b1N0cmluZy5jYWxsKGZuKVxuICByZXR1cm4gc3RyaW5nID09PSAnW29iamVjdCBGdW5jdGlvbl0nIHx8XG4gICAgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBzdHJpbmcgIT09ICdbb2JqZWN0IFJlZ0V4cF0nKSB8fFxuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAvLyBJRTggYW5kIGJlbG93XG4gICAgIChmbiA9PT0gd2luZG93LnNldFRpbWVvdXQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuYWxlcnQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuY29uZmlybSB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5wcm9tcHQpKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNla3RvciA9IHJlcXVpcmUoJ3Nla3RvcicpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIHJzcGFjZXMgPSAvXFxzKy9nO1xudmFyIGtleW1hcCA9IHtcbiAgMTM6ICdlbnRlcicsXG4gIDI3OiAnZXNjJyxcbiAgMzI6ICdzcGFjZSdcbn07XG52YXIgaGFuZGxlcnMgPSB7fTtcblxuY3Jvc3N2ZW50LmFkZCh3aW5kb3csICdrZXlkb3duJywga2V5ZG93bik7XG5cbmZ1bmN0aW9uIGNsZWFyIChjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0KSB7XG4gICAgaWYgKGNvbnRleHQgaW4gaGFuZGxlcnMpIHtcbiAgICAgIGhhbmRsZXJzW2NvbnRleHRdID0ge307XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhhbmRsZXJzID0ge307XG4gIH1cbn1cblxuZnVuY3Rpb24gc3dpdGNoYm9hcmQgKHRoZW4sIGNvbWJvLCBvcHRpb25zLCBmbikge1xuICBpZiAoZm4gPT09IHZvaWQgMCkge1xuICAgIGZuID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgY29udGV4dCA9IG9wdGlvbnMuY29udGV4dCB8fCAnZGVmYXVsdHMnO1xuXG4gIGlmICghZm4pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaGFuZGxlcnNbY29udGV4dF0gPT09IHZvaWQgMCkge1xuICAgIGhhbmRsZXJzW2NvbnRleHRdID0ge307XG4gIH1cblxuICBjb21iby50b0xvd2VyQ2FzZSgpLnNwbGl0KHJzcGFjZXMpLmZvckVhY2goaXRlbSk7XG5cbiAgZnVuY3Rpb24gaXRlbSAoa2V5cykge1xuICAgIHZhciBjID0ga2V5cy50cmltKCk7XG4gICAgaWYgKGMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoZW4oaGFuZGxlcnNbY29udGV4dF0sIGMsIG9wdGlvbnMsIGZuKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbiAoY29tYm8sIG9wdGlvbnMsIGZuKSB7XG4gIHN3aXRjaGJvYXJkKGFkZCwgY29tYm8sIG9wdGlvbnMsIGZuKTtcblxuICBmdW5jdGlvbiBhZGQgKGFyZWEsIGtleSwgb3B0aW9ucywgZm4pIHtcbiAgICB2YXIgaGFuZGxlciA9IHtcbiAgICAgIGhhbmRsZTogZm4sXG4gICAgICBmaWx0ZXI6IG9wdGlvbnMuZmlsdGVyXG4gICAgfTtcbiAgICBpZiAoYXJlYVtrZXldKSB7XG4gICAgICBhcmVhW2tleV0ucHVzaChoYW5kbGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJlYVtrZXldID0gW2hhbmRsZXJdO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBvZmYgKGNvbWJvLCBvcHRpb25zLCBmbikge1xuICBzd2l0Y2hib2FyZChybSwgY29tYm8sIG9wdGlvbnMsIGZuKTtcblxuICBmdW5jdGlvbiBybSAoYXJlYSwga2V5LCBvcHRpb25zLCBmbikge1xuICAgIGlmIChhcmVhW2tleV0pIHtcbiAgICAgIGFyZWFba2V5XSA9IGFyZWFba2V5XS5maWx0ZXIobWF0Y2hpbmcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoaW5nIChoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gaGFuZGxlci5oYW5kbGUgPT09IGZuICYmIGhhbmRsZXIuZmlsdGVyID09PSBvcHRpb25zLmZpbHRlcjtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0S2V5Q29kZSAoZSkge1xuICByZXR1cm4gZS53aGljaCB8fCBlLmtleUNvZGUgfHwgZS5jaGFyQ29kZTtcbn1cblxuZnVuY3Rpb24ga2V5ZG93biAoZSkge1xuICB2YXIgY29kZSA9IGdldEtleUNvZGUoZSk7XG4gIHZhciBrZXkgPSBrZXltYXBbY29kZV0gfHwgU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYgKGtleSkge1xuICAgIGhhbmRsZShrZXksIGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlS2V5Q29tYm8gKGtleSwgZSkge1xuICB2YXIgY29tYm8gPSBba2V5XTtcbiAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICBjb21iby51bnNoaWZ0KCdzaGlmdCcpO1xuICB9XG4gIGlmIChlLmFsdEtleSkge1xuICAgIGNvbWJvLnVuc2hpZnQoJ2FsdCcpO1xuICB9XG4gIGlmIChlLmN0cmxLZXkgXiBlLm1ldGFLZXkpIHtcbiAgICBjb21iby51bnNoaWZ0KCdjbWQnKTtcbiAgfVxuICByZXR1cm4gY29tYm8uam9pbignKycpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZSAoa2V5LCBlKSB7XG4gIHZhciBjb21ibyA9IHBhcnNlS2V5Q29tYm8oa2V5LCBlKTtcbiAgdmFyIGNvbnRleHQ7XG4gIGZvciAoY29udGV4dCBpbiBoYW5kbGVycykge1xuICAgIGlmIChoYW5kbGVyc1tjb250ZXh0XVtjb21ib10pIHtcbiAgICAgIGhhbmRsZXJzW2NvbnRleHRdW2NvbWJvXS5mb3JFYWNoKGV4ZWMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlcmVkIChoYW5kbGVyKSB7XG4gICAgdmFyIGZpbHRlciA9IGhhbmRsZXIuZmlsdGVyO1xuICAgIGlmICghZmlsdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGVsID0gZS50YXJnZXQ7XG4gICAgdmFyIHNlbGVjdG9yID0gdHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZyc7XG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gc2VrdG9yLm1hdGNoZXNTZWxlY3RvcihlbCwgZmlsdGVyKSA9PT0gZmFsc2U7XG4gICAgfVxuICAgIHdoaWxlIChlbC5wYXJlbnRFbGVtZW50ICYmIGVsICE9PSBmaWx0ZXIpIHtcbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIGVsICE9PSBmaWx0ZXI7XG4gIH1cblxuICBmdW5jdGlvbiBleGVjIChoYW5kbGVyKSB7XG4gICAgaWYgKGZpbHRlcmVkKGhhbmRsZXIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhhbmRsZXIuaGFuZGxlKGUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvbjogb24sXG4gIG9mZjogb2ZmLFxuICBjbGVhcjogY2xlYXIsXG4gIGhhbmRsZXJzOiBoYW5kbGVyc1xufTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHN0dWIgPSByZXF1aXJlKCcuL3N0dWInKTtcbnZhciB0cmFja2luZyA9IHJlcXVpcmUoJy4vdHJhY2tpbmcnKTtcbnZhciBscyA9ICdsb2NhbFN0b3JhZ2UnIGluIGdsb2JhbCAmJiBnbG9iYWwubG9jYWxTdG9yYWdlID8gZ2xvYmFsLmxvY2FsU3RvcmFnZSA6IHN0dWI7XG5cbmZ1bmN0aW9uIGFjY2Vzc29yIChrZXksIHZhbHVlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGdldChrZXkpO1xuICB9XG4gIHJldHVybiBzZXQoa2V5LCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGdldCAoa2V5KSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxzLmdldEl0ZW0oa2V5KSk7XG59XG5cbmZ1bmN0aW9uIHNldCAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGxzLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAoa2V5KSB7XG4gIHJldHVybiBscy5yZW1vdmVJdGVtKGtleSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgcmV0dXJuIGxzLmNsZWFyKCk7XG59XG5cbmFjY2Vzc29yLnNldCA9IHNldDtcbmFjY2Vzc29yLmdldCA9IGdldDtcbmFjY2Vzc29yLnJlbW92ZSA9IHJlbW92ZTtcbmFjY2Vzc29yLmNsZWFyID0gY2xlYXI7XG5hY2Nlc3Nvci5vbiA9IHRyYWNraW5nLm9uO1xuYWNjZXNzb3Iub2ZmID0gdHJhY2tpbmcub2ZmO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFjY2Vzc29yO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlzYjJOaGJDMXpkRzl5WVdkbEwyeHZZMkZzTFhOMGIzSmhaMlV1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJ6ZEhWaUlEMGdjbVZ4ZFdseVpTZ25MaTl6ZEhWaUp5azdYRzUyWVhJZ2RISmhZMnRwYm1jZ1BTQnlaWEYxYVhKbEtDY3VMM1J5WVdOcmFXNW5KeWs3WEc1MllYSWdiSE1nUFNBbmJHOWpZV3hUZEc5eVlXZGxKeUJwYmlCbmJHOWlZV3dnSmlZZ1oyeHZZbUZzTG14dlkyRnNVM1J2Y21GblpTQS9JR2RzYjJKaGJDNXNiMk5oYkZOMGIzSmhaMlVnT2lCemRIVmlPMXh1WEc1bWRXNWpkR2x2YmlCaFkyTmxjM052Y2lBb2EyVjVMQ0IyWVd4MVpTa2dlMXh1SUNCcFppQW9ZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQTlQVDBnTVNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJuWlhRb2EyVjVLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjMlYwS0d0bGVTd2dkbUZzZFdVcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCblpYUWdLR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdTbE5QVGk1d1lYSnpaU2hzY3k1blpYUkpkR1Z0S0d0bGVTa3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnpaWFFnS0d0bGVTd2dkbUZzZFdVcElIdGNiaUFnZEhKNUlIdGNiaUFnSUNCc2N5NXpaWFJKZEdWdEtHdGxlU3dnU2xOUFRpNXpkSEpwYm1kcFpua29kbUZzZFdVcEtUdGNiaUFnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WlcxdmRtVWdLR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdiSE11Y21WdGIzWmxTWFJsYlNoclpYa3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmpiR1ZoY2lBb0tTQjdYRzRnSUhKbGRIVnliaUJzY3k1amJHVmhjaWdwTzF4dWZWeHVYRzVoWTJObGMzTnZjaTV6WlhRZ1BTQnpaWFE3WEc1aFkyTmxjM052Y2k1blpYUWdQU0JuWlhRN1hHNWhZMk5sYzNOdmNpNXlaVzF2ZG1VZ1BTQnlaVzF2ZG1VN1hHNWhZMk5sYzNOdmNpNWpiR1ZoY2lBOUlHTnNaV0Z5TzF4dVlXTmpaWE56YjNJdWIyNGdQU0IwY21GamEybHVaeTV2Ymp0Y2JtRmpZMlZ6YzI5eUxtOW1aaUE5SUhSeVlXTnJhVzVuTG05bVpqdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JoWTJObGMzTnZjanRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtcyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRJdGVtIChrZXkpIHtcbiAgcmV0dXJuIGtleSBpbiBtcyA/IG1zW2tleV0gOiBudWxsO1xufVxuXG5mdW5jdGlvbiBzZXRJdGVtIChrZXksIHZhbHVlKSB7XG4gIG1zW2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUl0ZW0gKGtleSkge1xuICB2YXIgZm91bmQgPSBrZXkgaW4gbXM7XG4gIGlmIChmb3VuZCkge1xuICAgIHJldHVybiBkZWxldGUgbXNba2V5XTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgbXMgPSB7fTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRJdGVtOiBnZXRJdGVtLFxuICBzZXRJdGVtOiBzZXRJdGVtLFxuICByZW1vdmVJdGVtOiByZW1vdmVJdGVtLFxuICBjbGVhcjogY2xlYXJcbn07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBsaXN0ZW5lcnMgPSB7fTtcbnZhciBsaXN0ZW5pbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gbGlzdGVuICgpIHtcbiAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBjaGFuZ2UsIGZhbHNlKTtcbiAgfSBlbHNlIGlmIChnbG9iYWwuYXR0YWNoRXZlbnQpIHtcbiAgICBnbG9iYWwuYXR0YWNoRXZlbnQoJ29uc3RvcmFnZScsIGNoYW5nZSk7XG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFsLm9uc3RvcmFnZSA9IGNoYW5nZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGFuZ2UgKGUpIHtcbiAgaWYgKCFlKSB7XG4gICAgZSA9IGdsb2JhbC5ldmVudDtcbiAgfVxuICB2YXIgYWxsID0gbGlzdGVuZXJzW2Uua2V5XTtcbiAgaWYgKGFsbCkge1xuICAgIGFsbC5mb3JFYWNoKGZpcmUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyZSAobGlzdGVuZXIpIHtcbiAgICBsaXN0ZW5lcihKU09OLnBhcnNlKGUubmV3VmFsdWUpLCBKU09OLnBhcnNlKGUub2xkVmFsdWUpLCBlLnVybCB8fCBlLnVyaSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb24gKGtleSwgZm4pIHtcbiAgaWYgKGxpc3RlbmVyc1trZXldKSB7XG4gICAgbGlzdGVuZXJzW2tleV0ucHVzaChmbik7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXJzW2tleV0gPSBbZm5dO1xuICB9XG4gIGlmIChsaXN0ZW5pbmcgPT09IGZhbHNlKSB7XG4gICAgbGlzdGVuKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb2ZmIChrZXksIGZuKSB7XG4gIHZhciBucyA9IGxpc3RlbmVyc1trZXldO1xuICBpZiAobnMubGVuZ3RoID4gMSkge1xuICAgIG5zLnNwbGljZShucy5pbmRleE9mKGZuKSwgMSk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXJzW2tleV0gPSBbXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb246IG9uLFxuICBvZmY6IG9mZlxufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5c2IyTmhiQzF6ZEc5eVlXZGxMM1J5WVdOcmFXNW5MbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJR3hwYzNSbGJtVnljeUE5SUh0OU8xeHVkbUZ5SUd4cGMzUmxibWx1WnlBOUlHWmhiSE5sTzF4dVhHNW1kVzVqZEdsdmJpQnNhWE4wWlc0Z0tDa2dlMXh1SUNCcFppQW9aMnh2WW1Gc0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJcElIdGNiaUFnSUNCbmJHOWlZV3d1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduYzNSdmNtRm5aU2NzSUdOb1lXNW5aU3dnWm1Gc2MyVXBPMXh1SUNCOUlHVnNjMlVnYVdZZ0tHZHNiMkpoYkM1aGRIUmhZMmhGZG1WdWRDa2dlMXh1SUNBZ0lHZHNiMkpoYkM1aGRIUmhZMmhGZG1WdWRDZ25iMjV6ZEc5eVlXZGxKeXdnWTJoaGJtZGxLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JuYkc5aVlXd3ViMjV6ZEc5eVlXZGxJRDBnWTJoaGJtZGxPMXh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUdOb1lXNW5aU0FvWlNrZ2UxeHVJQ0JwWmlBb0lXVXBJSHRjYmlBZ0lDQmxJRDBnWjJ4dlltRnNMbVYyWlc1ME8xeHVJQ0I5WEc0Z0lIWmhjaUJoYkd3Z1BTQnNhWE4wWlc1bGNuTmJaUzVyWlhsZE8xeHVJQ0JwWmlBb1lXeHNLU0I3WEc0Z0lDQWdZV3hzTG1admNrVmhZMmdvWm1seVpTazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJtYVhKbElDaHNhWE4wWlc1bGNpa2dlMXh1SUNBZ0lHeHBjM1JsYm1WeUtFcFRUMDR1Y0dGeWMyVW9aUzV1WlhkV1lXeDFaU2tzSUVwVFQwNHVjR0Z5YzJVb1pTNXZiR1JXWVd4MVpTa3NJR1V1ZFhKc0lIeDhJR1V1ZFhKcEtUdGNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ2YmlBb2EyVjVMQ0JtYmlrZ2UxeHVJQ0JwWmlBb2JHbHpkR1Z1WlhKelcydGxlVjBwSUh0Y2JpQWdJQ0JzYVhOMFpXNWxjbk5iYTJWNVhTNXdkWE5vS0dadUtUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnNhWE4wWlc1bGNuTmJhMlY1WFNBOUlGdG1ibDA3WEc0Z0lIMWNiaUFnYVdZZ0tHeHBjM1JsYm1sdVp5QTlQVDBnWm1Gc2MyVXBJSHRjYmlBZ0lDQnNhWE4wWlc0b0tUdGNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ2Wm1ZZ0tHdGxlU3dnWm00cElIdGNiaUFnZG1GeUlHNXpJRDBnYkdsemRHVnVaWEp6VzJ0bGVWMDdYRzRnSUdsbUlDaHVjeTVzWlc1bmRHZ2dQaUF4S1NCN1hHNGdJQ0FnYm5NdWMzQnNhV05sS0c1ekxtbHVaR1Y0VDJZb1ptNHBMQ0F4S1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCc2FYTjBaVzVsY25OYmEyVjVYU0E5SUZ0ZE8xeHVJQ0I5WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdlMXh1SUNCdmJqb2diMjRzWEc0Z0lHOW1aam9nYjJabVhHNTlPMXh1SWwxOSIsInZhciB0cmltID0gcmVxdWlyZSgndHJpbScpXG4gICwgZm9yRWFjaCA9IHJlcXVpcmUoJ2Zvci1lYWNoJylcbiAgLCBpc0FycmF5ID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChoZWFkZXJzKSB7XG4gIGlmICghaGVhZGVycylcbiAgICByZXR1cm4ge31cblxuICB2YXIgcmVzdWx0ID0ge31cblxuICBmb3JFYWNoKFxuICAgICAgdHJpbShoZWFkZXJzKS5zcGxpdCgnXFxuJylcbiAgICAsIGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gcm93LmluZGV4T2YoJzonKVxuICAgICAgICAgICwga2V5ID0gdHJpbShyb3cuc2xpY2UoMCwgaW5kZXgpKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgLCB2YWx1ZSA9IHRyaW0ocm93LnNsaWNlKGluZGV4ICsgMSkpXG5cbiAgICAgICAgaWYgKHR5cGVvZihyZXN1bHRba2V5XSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZVxuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkocmVzdWx0W2tleV0pKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IFsgcmVzdWx0W2tleV0sIHZhbHVlIF1cbiAgICAgICAgfVxuICAgICAgfVxuICApXG5cbiAgcmV0dXJuIHJlc3VsdFxufSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGV4cGFuZG8gPSAnc2VrdG9yLScgKyBEYXRlLm5vdygpO1xudmFyIHJzaWJsaW5ncyA9IC9bK35dLztcbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBkZWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwge307XG52YXIgbWF0Y2ggPSAoXG4gIGRlbC5tYXRjaGVzIHx8XG4gIGRlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgZGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICBkZWwub01hdGNoZXNTZWxlY3RvciB8fFxuICBkZWwubXNNYXRjaGVzU2VsZWN0b3IgfHxcbiAgbmV2ZXJcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gc2VrdG9yO1xuXG5zZWt0b3IubWF0Y2hlcyA9IG1hdGNoZXM7XG5zZWt0b3IubWF0Y2hlc1NlbGVjdG9yID0gbWF0Y2hlc1NlbGVjdG9yO1xuXG5mdW5jdGlvbiBxc2EgKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gIHZhciBleGlzdGVkLCBpZCwgcHJlZml4LCBwcmVmaXhlZCwgYWRhcHRlciwgaGFjayA9IGNvbnRleHQgIT09IGRvY3VtZW50O1xuICBpZiAoaGFjaykgeyAvLyBpZCBoYWNrIGZvciBjb250ZXh0LXJvb3RlZCBxdWVyaWVzXG4gICAgZXhpc3RlZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIGlkID0gZXhpc3RlZCB8fCBleHBhbmRvO1xuICAgIHByZWZpeCA9ICcjJyArIGlkICsgJyAnO1xuICAgIHByZWZpeGVkID0gcHJlZml4ICsgc2VsZWN0b3IucmVwbGFjZSgvLC9nLCAnLCcgKyBwcmVmaXgpO1xuICAgIGFkYXB0ZXIgPSByc2libGluZ3MudGVzdChzZWxlY3RvcikgJiYgY29udGV4dC5wYXJlbnROb2RlO1xuICAgIGlmICghZXhpc3RlZCkgeyBjb250ZXh0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7IH1cbiAgfVxuICB0cnkge1xuICAgIHJldHVybiAoYWRhcHRlciB8fCBjb250ZXh0KS5xdWVyeVNlbGVjdG9yQWxsKHByZWZpeGVkIHx8IHNlbGVjdG9yKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBbXTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoZXhpc3RlZCA9PT0gbnVsbCkgeyBjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTsgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNla3RvciAoc2VsZWN0b3IsIGN0eCwgY29sbGVjdGlvbiwgc2VlZCkge1xuICB2YXIgZWxlbWVudDtcbiAgdmFyIGNvbnRleHQgPSBjdHggfHwgZG9jdW1lbnQ7XG4gIHZhciByZXN1bHRzID0gY29sbGVjdGlvbiB8fCBbXTtcbiAgdmFyIGkgPSAwO1xuICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG4gIGlmIChjb250ZXh0Lm5vZGVUeXBlICE9PSAxICYmIGNvbnRleHQubm9kZVR5cGUgIT09IDkpIHtcbiAgICByZXR1cm4gW107IC8vIGJhaWwgaWYgY29udGV4dCBpcyBub3QgYW4gZWxlbWVudCBvciBkb2N1bWVudFxuICB9XG4gIGlmIChzZWVkKSB7XG4gICAgd2hpbGUgKChlbGVtZW50ID0gc2VlZFtpKytdKSkge1xuICAgICAgaWYgKG1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvcikpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXN1bHRzLnB1c2guYXBwbHkocmVzdWx0cywgcXNhKHNlbGVjdG9yLCBjb250ZXh0KSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKHNlbGVjdG9yLCBlbGVtZW50cykge1xuICByZXR1cm4gc2VrdG9yKHNlbGVjdG9yLCBudWxsLCBudWxsLCBlbGVtZW50cyk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvciAoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIG1hdGNoLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBuZXZlciAoKSB7IHJldHVybiBmYWxzZTsgfVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld0MGIzSXZjM0pqTDNObGEzUnZjaTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJsZUhCaGJtUnZJRDBnSjNObGEzUnZjaTBuSUNzZ1JHRjBaUzV1YjNjb0tUdGNiblpoY2lCeWMybGliR2x1WjNNZ1BTQXZXeXQrWFM4N1hHNTJZWElnWkc5amRXMWxiblFnUFNCbmJHOWlZV3d1Wkc5amRXMWxiblE3WEc1MllYSWdaR1ZzSUQwZ1pHOWpkVzFsYm5RdVpHOWpkVzFsYm5SRmJHVnRaVzUwSUh4OElIdDlPMXh1ZG1GeUlHMWhkR05vSUQwZ0tGeHVJQ0JrWld3dWJXRjBZMmhsY3lCOGZGeHVJQ0JrWld3dWQyVmlhMmwwVFdGMFkyaGxjMU5sYkdWamRHOXlJSHg4WEc0Z0lHUmxiQzV0YjNwTllYUmphR1Z6VTJWc1pXTjBiM0lnZkh4Y2JpQWdaR1ZzTG05TllYUmphR1Z6VTJWc1pXTjBiM0lnZkh4Y2JpQWdaR1ZzTG0xelRXRjBZMmhsYzFObGJHVmpkRzl5SUh4OFhHNGdJRzVsZG1WeVhHNHBPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhObGEzUnZjanRjYmx4dWMyVnJkRzl5TG0xaGRHTm9aWE1nUFNCdFlYUmphR1Z6TzF4dWMyVnJkRzl5TG0xaGRHTm9aWE5UWld4bFkzUnZjaUE5SUcxaGRHTm9aWE5UWld4bFkzUnZjanRjYmx4dVpuVnVZM1JwYjI0Z2NYTmhJQ2h6Wld4bFkzUnZjaXdnWTI5dWRHVjRkQ2tnZTF4dUlDQjJZWElnWlhocGMzUmxaQ3dnYVdRc0lIQnlaV1pwZUN3Z2NISmxabWw0WldRc0lHRmtZWEIwWlhJc0lHaGhZMnNnUFNCamIyNTBaWGgwSUNFOVBTQmtiMk4xYldWdWREdGNiaUFnYVdZZ0tHaGhZMnNwSUhzZ0x5OGdhV1FnYUdGamF5Qm1iM0lnWTI5dWRHVjRkQzF5YjI5MFpXUWdjWFZsY21sbGMxeHVJQ0FnSUdWNGFYTjBaV1FnUFNCamIyNTBaWGgwTG1kbGRFRjBkSEpwWW5WMFpTZ25hV1FuS1R0Y2JpQWdJQ0JwWkNBOUlHVjRhWE4wWldRZ2ZId2daWGh3WVc1a2J6dGNiaUFnSUNCd2NtVm1hWGdnUFNBbkl5Y2dLeUJwWkNBcklDY2dKenRjYmlBZ0lDQndjbVZtYVhobFpDQTlJSEJ5WldacGVDQXJJSE5sYkdWamRHOXlMbkpsY0d4aFkyVW9MeXd2Wnl3Z0p5d25JQ3NnY0hKbFptbDRLVHRjYmlBZ0lDQmhaR0Z3ZEdWeUlEMGdjbk5wWW14cGJtZHpMblJsYzNRb2MyVnNaV04wYjNJcElDWW1JR052Ym5SbGVIUXVjR0Z5Wlc1MFRtOWtaVHRjYmlBZ0lDQnBaaUFvSVdWNGFYTjBaV1FwSUhzZ1kyOXVkR1Y0ZEM1elpYUkJkSFJ5YVdKMWRHVW9KMmxrSnl3Z2FXUXBPeUI5WEc0Z0lIMWNiaUFnZEhKNUlIdGNiaUFnSUNCeVpYUjFjbTRnS0dGa1lYQjBaWElnZkh3Z1kyOXVkR1Y0ZENrdWNYVmxjbmxUWld4bFkzUnZja0ZzYkNod2NtVm1hWGhsWkNCOGZDQnpaV3hsWTNSdmNpazdYRzRnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNCeVpYUjFjbTRnVzEwN1hHNGdJSDBnWm1sdVlXeHNlU0I3WEc0Z0lDQWdhV1lnS0dWNGFYTjBaV1FnUFQwOUlHNTFiR3dwSUhzZ1kyOXVkR1Y0ZEM1eVpXMXZkbVZCZEhSeWFXSjFkR1VvSjJsa0p5azdJSDFjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCelpXdDBiM0lnS0hObGJHVmpkRzl5TENCamRIZ3NJR052Ykd4bFkzUnBiMjRzSUhObFpXUXBJSHRjYmlBZ2RtRnlJR1ZzWlcxbGJuUTdYRzRnSUhaaGNpQmpiMjUwWlhoMElEMGdZM1I0SUh4OElHUnZZM1Z0Wlc1ME8xeHVJQ0IyWVhJZ2NtVnpkV3gwY3lBOUlHTnZiR3hsWTNScGIyNGdmSHdnVzEwN1hHNGdJSFpoY2lCcElEMGdNRHRjYmlBZ2FXWWdLSFI1Y0dWdlppQnpaV3hsWTNSdmNpQWhQVDBnSjNOMGNtbHVaeWNwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdjbVZ6ZFd4MGN6dGNiaUFnZlZ4dUlDQnBaaUFvWTI5dWRHVjRkQzV1YjJSbFZIbHdaU0FoUFQwZ01TQW1KaUJqYjI1MFpYaDBMbTV2WkdWVWVYQmxJQ0U5UFNBNUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUZ0ZE95QXZMeUJpWVdsc0lHbG1JR052Ym5SbGVIUWdhWE1nYm05MElHRnVJR1ZzWlcxbGJuUWdiM0lnWkc5amRXMWxiblJjYmlBZ2ZWeHVJQ0JwWmlBb2MyVmxaQ2tnZTF4dUlDQWdJSGRvYVd4bElDZ29aV3hsYldWdWRDQTlJSE5sWldSYmFTc3JYU2twSUh0Y2JpQWdJQ0FnSUdsbUlDaHRZWFJqYUdWelUyVnNaV04wYjNJb1pXeGxiV1Z1ZEN3Z2MyVnNaV04wYjNJcEtTQjdYRzRnSUNBZ0lDQWdJSEpsYzNWc2RITXVjSFZ6YUNobGJHVnRaVzUwS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnY21WemRXeDBjeTV3ZFhOb0xtRndjR3g1S0hKbGMzVnNkSE1zSUhGellTaHpaV3hsWTNSdmNpd2dZMjl1ZEdWNGRDa3BPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQnlaWE4xYkhSek8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCdFlYUmphR1Z6SUNoelpXeGxZM1J2Y2l3Z1pXeGxiV1Z1ZEhNcElIdGNiaUFnY21WMGRYSnVJSE5sYTNSdmNpaHpaV3hsWTNSdmNpd2diblZzYkN3Z2JuVnNiQ3dnWld4bGJXVnVkSE1wTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ0WVhSamFHVnpVMlZzWldOMGIzSWdLR1ZzWlcxbGJuUXNJSE5sYkdWamRHOXlLU0I3WEc0Z0lISmxkSFZ5YmlCdFlYUmphQzVqWVd4c0tHVnNaVzFsYm5Rc0lITmxiR1ZqZEc5eUtUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2JtVjJaWElnS0NrZ2V5QnlaWFIxY200Z1ptRnNjMlU3SUgxY2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0U2VsZWN0aW9uO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBnZXRTZWxlY3Rpb25SYXcgPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvblJhdycpO1xudmFyIGdldFNlbGVjdGlvbk51bGxPcCA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uTnVsbE9wJyk7XG52YXIgZ2V0U2VsZWN0aW9uU3ludGhldGljID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb25TeW50aGV0aWMnKTtcbnZhciBpc0hvc3QgPSByZXF1aXJlKCcuL2lzSG9zdCcpO1xuaWYgKGlzSG9zdC5tZXRob2QoZ2xvYmFsLCAnZ2V0U2VsZWN0aW9uJykpIHtcbiAgZ2V0U2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uUmF3O1xufSBlbHNlIGlmICh0eXBlb2YgZG9jLnNlbGVjdGlvbiA9PT0gJ29iamVjdCcgJiYgZG9jLnNlbGVjdGlvbikge1xuICBnZXRTZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb25TeW50aGV0aWM7XG59IGVsc2Uge1xuICBnZXRTZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb25OdWxsT3A7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld4bFkyTnBiMjR2YzNKakwyZGxkRk5sYkdWamRHbHZiaTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJuWlhSVFpXeGxZM1JwYjI0N1hHNTJZWElnWkc5aklEMGdaMnh2WW1Gc0xtUnZZM1Z0Wlc1ME8xeHVkbUZ5SUdkbGRGTmxiR1ZqZEdsdmJsSmhkeUE5SUhKbGNYVnBjbVVvSnk0dloyVjBVMlZzWldOMGFXOXVVbUYzSnlrN1hHNTJZWElnWjJWMFUyVnNaV04wYVc5dVRuVnNiRTl3SUQwZ2NtVnhkV2x5WlNnbkxpOW5aWFJUWld4bFkzUnBiMjVPZFd4c1QzQW5LVHRjYm5aaGNpQm5aWFJUWld4bFkzUnBiMjVUZVc1MGFHVjBhV01nUFNCeVpYRjFhWEpsS0NjdUwyZGxkRk5sYkdWamRHbHZibE41Ym5Sb1pYUnBZeWNwTzF4dWRtRnlJR2x6U0c5emRDQTlJSEpsY1hWcGNtVW9KeTR2YVhOSWIzTjBKeWs3WEc1cFppQW9hWE5JYjNOMExtMWxkR2h2WkNobmJHOWlZV3dzSUNkblpYUlRaV3hsWTNScGIyNG5LU2tnZTF4dUlDQm5aWFJUWld4bFkzUnBiMjRnUFNCblpYUlRaV3hsWTNScGIyNVNZWGM3WEc1OUlHVnNjMlVnYVdZZ0tIUjVjR1Z2WmlCa2IyTXVjMlZzWldOMGFXOXVJRDA5UFNBbmIySnFaV04wSnlBbUppQmtiMk11YzJWc1pXTjBhVzl1S1NCN1hHNGdJR2RsZEZObGJHVmpkR2x2YmlBOUlHZGxkRk5sYkdWamRHbHZibE41Ym5Sb1pYUnBZenRjYm4wZ1pXeHpaU0I3WEc0Z0lHZGxkRk5sYkdWamRHbHZiaUE5SUdkbGRGTmxiR1ZqZEdsdmJrNTFiR3hQY0R0Y2JuMWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JuWlhSVFpXeGxZM1JwYjI0N1hHNGlYWDA9IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBub29wICgpIHt9XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGlvbk51bGxPcCAoKSB7XG4gIHJldHVybiB7XG4gICAgcmVtb3ZlQWxsUmFuZ2VzOiBub29wLFxuICAgIGFkZFJhbmdlOiBub29wXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uTnVsbE9wO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb25SYXcgKCkge1xuICByZXR1cm4gZ2xvYmFsLmdldFNlbGVjdGlvbigpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvblJhdztcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5elpXeGxZMk5wYjI0dmMzSmpMMmRsZEZObGJHVmpkR2x2YmxKaGR5NXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNW1kVzVqZEdsdmJpQm5aWFJUWld4bFkzUnBiMjVTWVhjZ0tDa2dlMXh1SUNCeVpYUjFjbTRnWjJ4dlltRnNMbWRsZEZObGJHVmpkR2x2YmlncE8xeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdkbGRGTmxiR1ZqZEdsdmJsSmhkenRjYmlKZGZRPT0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciByYW5nZVRvVGV4dFJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZVRvVGV4dFJhbmdlJyk7XG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGJvZHkgPSBkb2MuYm9keTtcbnZhciBHZXRTZWxlY3Rpb25Qcm90byA9IEdldFNlbGVjdGlvbi5wcm90b3R5cGU7XG5cbmZ1bmN0aW9uIEdldFNlbGVjdGlvbiAoc2VsZWN0aW9uKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHJhbmdlID0gc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG5cbiAgdGhpcy5fc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuICB0aGlzLl9yYW5nZXMgPSBbXTtcblxuICBpZiAoc2VsZWN0aW9uLnR5cGUgPT09ICdDb250cm9sJykge1xuICAgIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24oc2VsZik7XG4gIH0gZWxzZSBpZiAoaXNUZXh0UmFuZ2UocmFuZ2UpKSB7XG4gICAgdXBkYXRlRnJvbVRleHRSYW5nZShzZWxmLCByYW5nZSk7XG4gIH0gZWxzZSB7XG4gICAgdXBkYXRlRW1wdHlTZWxlY3Rpb24oc2VsZik7XG4gIH1cbn1cblxuR2V0U2VsZWN0aW9uUHJvdG8ucmVtb3ZlQWxsUmFuZ2VzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGV4dFJhbmdlO1xuICB0cnkge1xuICAgIHRoaXMuX3NlbGVjdGlvbi5lbXB0eSgpO1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSAhPT0gJ05vbmUnKSB7XG4gICAgICB0ZXh0UmFuZ2UgPSBib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgdGV4dFJhbmdlLnNlbGVjdCgpO1xuICAgICAgdGhpcy5fc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gIH1cbiAgdXBkYXRlRW1wdHlTZWxlY3Rpb24odGhpcyk7XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5hZGRSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICBpZiAodGhpcy5fc2VsZWN0aW9uLnR5cGUgPT09ICdDb250cm9sJykge1xuICAgIGFkZFJhbmdlVG9Db250cm9sU2VsZWN0aW9uKHRoaXMsIHJhbmdlKTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZVRvVGV4dFJhbmdlKHJhbmdlKS5zZWxlY3QoKTtcbiAgICB0aGlzLl9yYW5nZXNbMF0gPSByYW5nZTtcbiAgICB0aGlzLnJhbmdlQ291bnQgPSAxO1xuICAgIHRoaXMuaXNDb2xsYXBzZWQgPSB0aGlzLl9yYW5nZXNbMF0uY29sbGFwc2VkO1xuICAgIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlKHRoaXMsIHJhbmdlLCBmYWxzZSk7XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLnNldFJhbmdlcyA9IGZ1bmN0aW9uIChyYW5nZXMpIHtcbiAgdGhpcy5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgdmFyIHJhbmdlQ291bnQgPSByYW5nZXMubGVuZ3RoO1xuICBpZiAocmFuZ2VDb3VudCA+IDEpIHtcbiAgICBjcmVhdGVDb250cm9sU2VsZWN0aW9uKHRoaXMsIHJhbmdlcyk7XG4gIH0gZWxzZSBpZiAocmFuZ2VDb3VudCkge1xuICAgIHRoaXMuYWRkUmFuZ2UocmFuZ2VzWzBdKTtcbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uZ2V0UmFuZ2VBdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMucmFuZ2VDb3VudCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2V0UmFuZ2VBdCgpOiBpbmRleCBvdXQgb2YgYm91bmRzJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhbmdlc1tpbmRleF0uY2xvbmVSYW5nZSgpO1xuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5yZW1vdmVSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICBpZiAodGhpcy5fc2VsZWN0aW9uLnR5cGUgIT09ICdDb250cm9sJykge1xuICAgIHJlbW92ZVJhbmdlTWFudWFsbHkodGhpcywgcmFuZ2UpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgY29udHJvbFJhbmdlID0gdGhpcy5fc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gIHZhciByYW5nZUVsZW1lbnQgPSBnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKHJhbmdlKTtcbiAgdmFyIG5ld0NvbnRyb2xSYW5nZSA9IGJvZHkuY3JlYXRlQ29udHJvbFJhbmdlKCk7XG4gIHZhciBlbDtcbiAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvbnRyb2xSYW5nZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGVsID0gY29udHJvbFJhbmdlLml0ZW0oaSk7XG4gICAgaWYgKGVsICE9PSByYW5nZUVsZW1lbnQgfHwgcmVtb3ZlZCkge1xuICAgICAgbmV3Q29udHJvbFJhbmdlLmFkZChjb250cm9sUmFuZ2UuaXRlbShpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBuZXdDb250cm9sUmFuZ2Uuc2VsZWN0KCk7XG4gIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24odGhpcyk7XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5lYWNoUmFuZ2UgPSBmdW5jdGlvbiAoZm4sIHJldHVyblZhbHVlKSB7XG4gIHZhciBpID0gMDtcbiAgdmFyIGxlbiA9IHRoaXMuX3Jhbmdlcy5sZW5ndGg7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChmbih0aGlzLmdldFJhbmdlQXQoaSkpKSB7XG4gICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5nZXRBbGxSYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciByYW5nZXMgPSBbXTtcbiAgdGhpcy5lYWNoUmFuZ2UoZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgcmFuZ2VzLnB1c2gocmFuZ2UpO1xuICB9KTtcbiAgcmV0dXJuIHJhbmdlcztcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLnNldFNpbmdsZVJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIHRoaXMucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHRoaXMuYWRkUmFuZ2UocmFuZ2UpO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ29udHJvbFNlbGVjdGlvbiAoc2VsLCByYW5nZXMpIHtcbiAgdmFyIGNvbnRyb2xSYW5nZSA9IGJvZHkuY3JlYXRlQ29udHJvbFJhbmdlKCk7XG4gIGZvciAodmFyIGkgPSAwLCBlbCwgbGVuID0gcmFuZ2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgZWwgPSBnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKHJhbmdlc1tpXSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnRyb2xSYW5nZS5hZGQoZWwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2V0UmFuZ2VzKCk6IEVsZW1lbnQgY291bGQgbm90IGJlIGFkZGVkIHRvIGNvbnRyb2wgc2VsZWN0aW9uJyk7XG4gICAgfVxuICB9XG4gIGNvbnRyb2xSYW5nZS5zZWxlY3QoKTtcbiAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbihzZWwpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVSYW5nZU1hbnVhbGx5IChzZWwsIHJhbmdlKSB7XG4gIHZhciByYW5nZXMgPSBzZWwuZ2V0QWxsUmFuZ2VzKCk7XG4gIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJhbmdlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICghaXNTYW1lUmFuZ2UocmFuZ2UsIHJhbmdlc1tpXSkpIHtcbiAgICAgIHNlbC5hZGRSYW5nZShyYW5nZXNbaV0pO1xuICAgIH1cbiAgfVxuICBpZiAoIXNlbC5yYW5nZUNvdW50KSB7XG4gICAgdXBkYXRlRW1wdHlTZWxlY3Rpb24oc2VsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZSAoc2VsLCByYW5nZSkge1xuICB2YXIgYW5jaG9yUHJlZml4ID0gJ3N0YXJ0JztcbiAgdmFyIGZvY3VzUHJlZml4ID0gJ2VuZCc7XG4gIHNlbC5hbmNob3JOb2RlID0gcmFuZ2VbYW5jaG9yUHJlZml4ICsgJ0NvbnRhaW5lciddO1xuICBzZWwuYW5jaG9yT2Zmc2V0ID0gcmFuZ2VbYW5jaG9yUHJlZml4ICsgJ09mZnNldCddO1xuICBzZWwuZm9jdXNOb2RlID0gcmFuZ2VbZm9jdXNQcmVmaXggKyAnQ29udGFpbmVyJ107XG4gIHNlbC5mb2N1c09mZnNldCA9IHJhbmdlW2ZvY3VzUHJlZml4ICsgJ09mZnNldCddO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVFbXB0eVNlbGVjdGlvbiAoc2VsKSB7XG4gIHNlbC5hbmNob3JOb2RlID0gc2VsLmZvY3VzTm9kZSA9IG51bGw7XG4gIHNlbC5hbmNob3JPZmZzZXQgPSBzZWwuZm9jdXNPZmZzZXQgPSAwO1xuICBzZWwucmFuZ2VDb3VudCA9IDA7XG4gIHNlbC5pc0NvbGxhcHNlZCA9IHRydWU7XG4gIHNlbC5fcmFuZ2VzLmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIHJhbmdlQ29udGFpbnNTaW5nbGVFbGVtZW50IChyYW5nZU5vZGVzKSB7XG4gIGlmICghcmFuZ2VOb2Rlcy5sZW5ndGggfHwgcmFuZ2VOb2Rlc1swXS5ub2RlVHlwZSAhPT0gMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKHZhciBpID0gMSwgbGVuID0gcmFuZ2VOb2Rlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICghaXNBbmNlc3Rvck9mKHJhbmdlTm9kZXNbMF0sIHJhbmdlTm9kZXNbaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlIChyYW5nZSkge1xuICB2YXIgbm9kZXMgPSByYW5nZS5nZXROb2RlcygpO1xuICBpZiAoIXJhbmdlQ29udGFpbnNTaW5nbGVFbGVtZW50KG5vZGVzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZSgpOiByYW5nZSBkaWQgbm90IGNvbnNpc3Qgb2YgYSBzaW5nbGUgZWxlbWVudCcpO1xuICB9XG4gIHJldHVybiBub2Rlc1swXTtcbn1cblxuZnVuY3Rpb24gaXNUZXh0UmFuZ2UgKHJhbmdlKSB7XG4gIHJldHVybiByYW5nZSAmJiByYW5nZS50ZXh0ICE9PSB2b2lkIDA7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZyb21UZXh0UmFuZ2UgKHNlbCwgcmFuZ2UpIHtcbiAgc2VsLl9yYW5nZXMgPSBbcmFuZ2VdO1xuICB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZShzZWwsIHJhbmdlLCBmYWxzZSk7XG4gIHNlbC5yYW5nZUNvdW50ID0gMTtcbiAgc2VsLmlzQ29sbGFwc2VkID0gcmFuZ2UuY29sbGFwc2VkO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDb250cm9sU2VsZWN0aW9uIChzZWwpIHtcbiAgc2VsLl9yYW5nZXMubGVuZ3RoID0gMDtcbiAgaWYgKHNlbC5fc2VsZWN0aW9uLnR5cGUgPT09ICdOb25lJykge1xuICAgIHVwZGF0ZUVtcHR5U2VsZWN0aW9uKHNlbCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNvbnRyb2xSYW5nZSA9IHNlbC5fc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgaWYgKGlzVGV4dFJhbmdlKGNvbnRyb2xSYW5nZSkpIHtcbiAgICAgIHVwZGF0ZUZyb21UZXh0UmFuZ2Uoc2VsLCBjb250cm9sUmFuZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWwucmFuZ2VDb3VudCA9IGNvbnRyb2xSYW5nZS5sZW5ndGg7XG4gICAgICB2YXIgcmFuZ2U7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbC5yYW5nZUNvdW50OyArK2kpIHtcbiAgICAgICAgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShjb250cm9sUmFuZ2UuaXRlbShpKSk7XG4gICAgICAgIHNlbC5fcmFuZ2VzLnB1c2gocmFuZ2UpO1xuICAgICAgfVxuICAgICAgc2VsLmlzQ29sbGFwc2VkID0gc2VsLnJhbmdlQ291bnQgPT09IDEgJiYgc2VsLl9yYW5nZXNbMF0uY29sbGFwc2VkO1xuICAgICAgdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2Uoc2VsLCBzZWwuX3Jhbmdlc1tzZWwucmFuZ2VDb3VudCAtIDFdLCBmYWxzZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFJhbmdlVG9Db250cm9sU2VsZWN0aW9uIChzZWwsIHJhbmdlKSB7XG4gIHZhciBjb250cm9sUmFuZ2UgPSBzZWwuX3NlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICB2YXIgcmFuZ2VFbGVtZW50ID0gZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZShyYW5nZSk7XG4gIHZhciBuZXdDb250cm9sUmFuZ2UgPSBib2R5LmNyZWF0ZUNvbnRyb2xSYW5nZSgpO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gY29udHJvbFJhbmdlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgbmV3Q29udHJvbFJhbmdlLmFkZChjb250cm9sUmFuZ2UuaXRlbShpKSk7XG4gIH1cbiAgdHJ5IHtcbiAgICBuZXdDb250cm9sUmFuZ2UuYWRkKHJhbmdlRWxlbWVudCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FkZFJhbmdlKCk6IEVsZW1lbnQgY291bGQgbm90IGJlIGFkZGVkIHRvIGNvbnRyb2wgc2VsZWN0aW9uJyk7XG4gIH1cbiAgbmV3Q29udHJvbFJhbmdlLnNlbGVjdCgpO1xuICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHNlbCk7XG59XG5cbmZ1bmN0aW9uIGlzU2FtZVJhbmdlIChsZWZ0LCByaWdodCkge1xuICByZXR1cm4gKFxuICAgIGxlZnQuc3RhcnRDb250YWluZXIgPT09IHJpZ2h0LnN0YXJ0Q29udGFpbmVyICYmXG4gICAgbGVmdC5zdGFydE9mZnNldCA9PT0gcmlnaHQuc3RhcnRPZmZzZXQgJiZcbiAgICBsZWZ0LmVuZENvbnRhaW5lciA9PT0gcmlnaHQuZW5kQ29udGFpbmVyICYmXG4gICAgbGVmdC5lbmRPZmZzZXQgPT09IHJpZ2h0LmVuZE9mZnNldFxuICApO1xufVxuXG5mdW5jdGlvbiBpc0FuY2VzdG9yT2YgKGFuY2VzdG9yLCBkZXNjZW5kYW50KSB7XG4gIHZhciBub2RlID0gZGVzY2VuZGFudDtcbiAgd2hpbGUgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgIGlmIChub2RlLnBhcmVudE5vZGUgPT09IGFuY2VzdG9yKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGlvbiAoKSB7XG4gIHJldHVybiBuZXcgR2V0U2VsZWN0aW9uKGdsb2JhbC5kb2N1bWVudC5zZWxlY3Rpb24pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvbjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5elpXeGxZMk5wYjI0dmMzSmpMMmRsZEZObGJHVmpkR2x2YmxONWJuUm9aWFJwWXk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdjbUZ1WjJWVWIxUmxlSFJTWVc1blpTQTlJSEpsY1hWcGNtVW9KeTR2Y21GdVoyVlViMVJsZUhSU1lXNW5aU2NwTzF4dWRtRnlJR1J2WXlBOUlHZHNiMkpoYkM1a2IyTjFiV1Z1ZER0Y2JuWmhjaUJpYjJSNUlEMGdaRzlqTG1KdlpIazdYRzUyWVhJZ1IyVjBVMlZzWldOMGFXOXVVSEp2ZEc4Z1BTQkhaWFJUWld4bFkzUnBiMjR1Y0hKdmRHOTBlWEJsTzF4dVhHNW1kVzVqZEdsdmJpQkhaWFJUWld4bFkzUnBiMjRnS0hObGJHVmpkR2x2YmlrZ2UxeHVJQ0IyWVhJZ2MyVnNaaUE5SUhSb2FYTTdYRzRnSUhaaGNpQnlZVzVuWlNBOUlITmxiR1ZqZEdsdmJpNWpjbVZoZEdWU1lXNW5aU2dwTzF4dVhHNGdJSFJvYVhNdVgzTmxiR1ZqZEdsdmJpQTlJSE5sYkdWamRHbHZianRjYmlBZ2RHaHBjeTVmY21GdVoyVnpJRDBnVzEwN1hHNWNiaUFnYVdZZ0tITmxiR1ZqZEdsdmJpNTBlWEJsSUQwOVBTQW5RMjl1ZEhKdmJDY3BJSHRjYmlBZ0lDQjFjR1JoZEdWRGIyNTBjbTlzVTJWc1pXTjBhVzl1S0hObGJHWXBPMXh1SUNCOUlHVnNjMlVnYVdZZ0tHbHpWR1Y0ZEZKaGJtZGxLSEpoYm1kbEtTa2dlMXh1SUNBZ0lIVndaR0YwWlVaeWIyMVVaWGgwVW1GdVoyVW9jMlZzWml3Z2NtRnVaMlVwTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhWd1pHRjBaVVZ0Y0hSNVUyVnNaV04wYVc5dUtITmxiR1lwTzF4dUlDQjlYRzU5WEc1Y2JrZGxkRk5sYkdWamRHbHZibEJ5YjNSdkxuSmxiVzkyWlVGc2JGSmhibWRsY3lBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ2RtRnlJSFJsZUhSU1lXNW5aVHRjYmlBZ2RISjVJSHRjYmlBZ0lDQjBhR2x6TGw5elpXeGxZM1JwYjI0dVpXMXdkSGtvS1R0Y2JpQWdJQ0JwWmlBb2RHaHBjeTVmYzJWc1pXTjBhVzl1TG5SNWNHVWdJVDA5SUNkT2IyNWxKeWtnZTF4dUlDQWdJQ0FnZEdWNGRGSmhibWRsSUQwZ1ltOWtlUzVqY21WaGRHVlVaWGgwVW1GdVoyVW9LVHRjYmlBZ0lDQWdJSFJsZUhSU1lXNW5aUzV6Wld4bFkzUW9LVHRjYmlBZ0lDQWdJSFJvYVhNdVgzTmxiR1ZqZEdsdmJpNWxiWEIwZVNncE8xeHVJQ0FnSUgxY2JpQWdmU0JqWVhSamFDQW9aU2tnZTF4dUlDQjlYRzRnSUhWd1pHRjBaVVZ0Y0hSNVUyVnNaV04wYVc5dUtIUm9hWE1wTzF4dWZUdGNibHh1UjJWMFUyVnNaV04wYVc5dVVISnZkRzh1WVdSa1VtRnVaMlVnUFNCbWRXNWpkR2x2YmlBb2NtRnVaMlVwSUh0Y2JpQWdhV1lnS0hSb2FYTXVYM05sYkdWamRHbHZiaTUwZVhCbElEMDlQU0FuUTI5dWRISnZiQ2NwSUh0Y2JpQWdJQ0JoWkdSU1lXNW5aVlJ2UTI5dWRISnZiRk5sYkdWamRHbHZiaWgwYUdsekxDQnlZVzVuWlNrN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2NtRnVaMlZVYjFSbGVIUlNZVzVuWlNoeVlXNW5aU2t1YzJWc1pXTjBLQ2s3WEc0Z0lDQWdkR2hwY3k1ZmNtRnVaMlZ6V3pCZElEMGdjbUZ1WjJVN1hHNGdJQ0FnZEdocGN5NXlZVzVuWlVOdmRXNTBJRDBnTVR0Y2JpQWdJQ0IwYUdsekxtbHpRMjlzYkdGd2MyVmtJRDBnZEdocGN5NWZjbUZ1WjJWeld6QmRMbU52Ykd4aGNITmxaRHRjYmlBZ0lDQjFjR1JoZEdWQmJtTm9iM0pCYm1SR2IyTjFjMFp5YjIxU1lXNW5aU2gwYUdsekxDQnlZVzVuWlN3Z1ptRnNjMlVwTzF4dUlDQjlYRzU5TzF4dVhHNUhaWFJUWld4bFkzUnBiMjVRY205MGJ5NXpaWFJTWVc1blpYTWdQU0JtZFc1amRHbHZiaUFvY21GdVoyVnpLU0I3WEc0Z0lIUm9hWE11Y21WdGIzWmxRV3hzVW1GdVoyVnpLQ2s3WEc0Z0lIWmhjaUJ5WVc1blpVTnZkVzUwSUQwZ2NtRnVaMlZ6TG14bGJtZDBhRHRjYmlBZ2FXWWdLSEpoYm1kbFEyOTFiblFnUGlBeEtTQjdYRzRnSUNBZ1kzSmxZWFJsUTI5dWRISnZiRk5sYkdWamRHbHZiaWgwYUdsekxDQnlZVzVuWlhNcE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0hKaGJtZGxRMjkxYm5RcElIdGNiaUFnSUNCMGFHbHpMbUZrWkZKaGJtZGxLSEpoYm1kbGMxc3dYU2s3WEc0Z0lIMWNibjA3WEc1Y2JrZGxkRk5sYkdWamRHbHZibEJ5YjNSdkxtZGxkRkpoYm1kbFFYUWdQU0JtZFc1amRHbHZiaUFvYVc1a1pYZ3BJSHRjYmlBZ2FXWWdLR2x1WkdWNElEd2dNQ0I4ZkNCcGJtUmxlQ0ErUFNCMGFHbHpMbkpoYm1kbFEyOTFiblFwSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMmRsZEZKaGJtZGxRWFFvS1RvZ2FXNWtaWGdnYjNWMElHOW1JR0p2ZFc1a2N5Y3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TGw5eVlXNW5aWE5iYVc1a1pYaGRMbU5zYjI1bFVtRnVaMlVvS1R0Y2JpQWdmVnh1ZlR0Y2JseHVSMlYwVTJWc1pXTjBhVzl1VUhKdmRHOHVjbVZ0YjNabFVtRnVaMlVnUFNCbWRXNWpkR2x2YmlBb2NtRnVaMlVwSUh0Y2JpQWdhV1lnS0hSb2FYTXVYM05sYkdWamRHbHZiaTUwZVhCbElDRTlQU0FuUTI5dWRISnZiQ2NwSUh0Y2JpQWdJQ0J5WlcxdmRtVlNZVzVuWlUxaGJuVmhiR3g1S0hSb2FYTXNJSEpoYm1kbEtUdGNiaUFnSUNCeVpYUjFjbTQ3WEc0Z0lIMWNiaUFnZG1GeUlHTnZiblJ5YjJ4U1lXNW5aU0E5SUhSb2FYTXVYM05sYkdWamRHbHZiaTVqY21WaGRHVlNZVzVuWlNncE8xeHVJQ0IyWVhJZ2NtRnVaMlZGYkdWdFpXNTBJRDBnWjJWMFUybHVaMnhsUld4bGJXVnVkRVp5YjIxU1lXNW5aU2h5WVc1blpTazdYRzRnSUhaaGNpQnVaWGREYjI1MGNtOXNVbUZ1WjJVZ1BTQmliMlI1TG1OeVpXRjBaVU52Ym5SeWIyeFNZVzVuWlNncE8xeHVJQ0IyWVhJZ1pXdzdYRzRnSUhaaGNpQnlaVzF2ZG1Wa0lEMGdabUZzYzJVN1hHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd0xDQnNaVzRnUFNCamIyNTBjbTlzVW1GdVoyVXViR1Z1WjNSb095QnBJRHdnYkdWdU95QXJLMmtwSUh0Y2JpQWdJQ0JsYkNBOUlHTnZiblJ5YjJ4U1lXNW5aUzVwZEdWdEtHa3BPMXh1SUNBZ0lHbG1JQ2hsYkNBaFBUMGdjbUZ1WjJWRmJHVnRaVzUwSUh4OElISmxiVzkyWldRcElIdGNiaUFnSUNBZ0lHNWxkME52Ym5SeWIyeFNZVzVuWlM1aFpHUW9ZMjl1ZEhKdmJGSmhibWRsTG1sMFpXMG9hU2twTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQnlaVzF2ZG1Wa0lEMGdkSEoxWlR0Y2JpQWdJQ0I5WEc0Z0lIMWNiaUFnYm1WM1EyOXVkSEp2YkZKaGJtZGxMbk5sYkdWamRDZ3BPMXh1SUNCMWNHUmhkR1ZEYjI1MGNtOXNVMlZzWldOMGFXOXVLSFJvYVhNcE8xeHVmVHRjYmx4dVIyVjBVMlZzWldOMGFXOXVVSEp2ZEc4dVpXRmphRkpoYm1kbElEMGdablZ1WTNScGIyNGdLR1p1TENCeVpYUjFjbTVXWVd4MVpTa2dlMXh1SUNCMllYSWdhU0E5SURBN1hHNGdJSFpoY2lCc1pXNGdQU0IwYUdsekxsOXlZVzVuWlhNdWJHVnVaM1JvTzF4dUlDQm1iM0lnS0drZ1BTQXdPeUJwSUR3Z2JHVnVPeUFySzJrcElIdGNiaUFnSUNCcFppQW9abTRvZEdocGN5NW5aWFJTWVc1blpVRjBLR2twS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhKbGRIVnlibFpoYkhWbE8xeHVJQ0FnSUgxY2JpQWdmVnh1ZlR0Y2JseHVSMlYwVTJWc1pXTjBhVzl1VUhKdmRHOHVaMlYwUVd4c1VtRnVaMlZ6SUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCMllYSWdjbUZ1WjJWeklEMGdXMTA3WEc0Z0lIUm9hWE11WldGamFGSmhibWRsS0daMWJtTjBhVzl1SUNoeVlXNW5aU2tnZTF4dUlDQWdJSEpoYm1kbGN5NXdkWE5vS0hKaGJtZGxLVHRjYmlBZ2ZTazdYRzRnSUhKbGRIVnliaUJ5WVc1blpYTTdYRzU5TzF4dVhHNUhaWFJUWld4bFkzUnBiMjVRY205MGJ5NXpaWFJUYVc1bmJHVlNZVzVuWlNBOUlHWjFibU4wYVc5dUlDaHlZVzVuWlNrZ2UxeHVJQ0IwYUdsekxuSmxiVzkyWlVGc2JGSmhibWRsY3lncE8xeHVJQ0IwYUdsekxtRmtaRkpoYm1kbEtISmhibWRsS1R0Y2JuMDdYRzVjYm1aMWJtTjBhVzl1SUdOeVpXRjBaVU52Ym5SeWIyeFRaV3hsWTNScGIyNGdLSE5sYkN3Z2NtRnVaMlZ6S1NCN1hHNGdJSFpoY2lCamIyNTBjbTlzVW1GdVoyVWdQU0JpYjJSNUxtTnlaV0YwWlVOdmJuUnliMnhTWVc1blpTZ3BPMXh1SUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnWld3c0lHeGxiaUE5SUhKaGJtZGxjeTVzWlc1bmRHZzdJR2tnUENCc1pXNDdJQ3NyYVNrZ2UxeHVJQ0FnSUdWc0lEMGdaMlYwVTJsdVoyeGxSV3hsYldWdWRFWnliMjFTWVc1blpTaHlZVzVuWlhOYmFWMHBPMXh1SUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0JqYjI1MGNtOXNVbUZ1WjJVdVlXUmtLR1ZzS1R0Y2JpQWdJQ0I5SUdOaGRHTm9JQ2hsS1NCN1hHNGdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjNObGRGSmhibWRsY3lncE9pQkZiR1Z0Wlc1MElHTnZkV3hrSUc1dmRDQmlaU0JoWkdSbFpDQjBieUJqYjI1MGNtOXNJSE5sYkdWamRHbHZiaWNwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVJQ0JqYjI1MGNtOXNVbUZ1WjJVdWMyVnNaV04wS0NrN1hHNGdJSFZ3WkdGMFpVTnZiblJ5YjJ4VFpXeGxZM1JwYjI0b2MyVnNLVHRjYm4xY2JseHVablZ1WTNScGIyNGdjbVZ0YjNabFVtRnVaMlZOWVc1MVlXeHNlU0FvYzJWc0xDQnlZVzVuWlNrZ2UxeHVJQ0IyWVhJZ2NtRnVaMlZ6SUQwZ2MyVnNMbWRsZEVGc2JGSmhibWRsY3lncE8xeHVJQ0J6Wld3dWNtVnRiM1psUVd4c1VtRnVaMlZ6S0NrN1hHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd0xDQnNaVzRnUFNCeVlXNW5aWE11YkdWdVozUm9PeUJwSUR3Z2JHVnVPeUFySzJrcElIdGNiaUFnSUNCcFppQW9JV2x6VTJGdFpWSmhibWRsS0hKaGJtZGxMQ0J5WVc1blpYTmJhVjBwS1NCN1hHNGdJQ0FnSUNCelpXd3VZV1JrVW1GdVoyVW9jbUZ1WjJWelcybGRLVHRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdhV1lnS0NGelpXd3VjbUZ1WjJWRGIzVnVkQ2tnZTF4dUlDQWdJSFZ3WkdGMFpVVnRjSFI1VTJWc1pXTjBhVzl1S0hObGJDazdYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnZFhCa1lYUmxRVzVqYUc5eVFXNWtSbTlqZFhOR2NtOXRVbUZ1WjJVZ0tITmxiQ3dnY21GdVoyVXBJSHRjYmlBZ2RtRnlJR0Z1WTJodmNsQnlaV1pwZUNBOUlDZHpkR0Z5ZENjN1hHNGdJSFpoY2lCbWIyTjFjMUJ5WldacGVDQTlJQ2RsYm1Rbk8xeHVJQ0J6Wld3dVlXNWphRzl5VG05a1pTQTlJSEpoYm1kbFcyRnVZMmh2Y2xCeVpXWnBlQ0FySUNkRGIyNTBZV2x1WlhJblhUdGNiaUFnYzJWc0xtRnVZMmh2Y2s5bVpuTmxkQ0E5SUhKaGJtZGxXMkZ1WTJodmNsQnlaV1pwZUNBcklDZFBabVp6WlhRblhUdGNiaUFnYzJWc0xtWnZZM1Z6VG05a1pTQTlJSEpoYm1kbFcyWnZZM1Z6VUhKbFptbDRJQ3NnSjBOdmJuUmhhVzVsY2lkZE8xeHVJQ0J6Wld3dVptOWpkWE5QWm1aelpYUWdQU0J5WVc1blpWdG1iMk4xYzFCeVpXWnBlQ0FySUNkUFptWnpaWFFuWFR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnZFhCa1lYUmxSVzF3ZEhsVFpXeGxZM1JwYjI0Z0tITmxiQ2tnZTF4dUlDQnpaV3d1WVc1amFHOXlUbTlrWlNBOUlITmxiQzVtYjJOMWMwNXZaR1VnUFNCdWRXeHNPMXh1SUNCelpXd3VZVzVqYUc5eVQyWm1jMlYwSUQwZ2MyVnNMbVp2WTNWelQyWm1jMlYwSUQwZ01EdGNiaUFnYzJWc0xuSmhibWRsUTI5MWJuUWdQU0F3TzF4dUlDQnpaV3d1YVhORGIyeHNZWEJ6WldRZ1BTQjBjblZsTzF4dUlDQnpaV3d1WDNKaGJtZGxjeTVzWlc1bmRHZ2dQU0F3TzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WVc1blpVTnZiblJoYVc1elUybHVaMnhsUld4bGJXVnVkQ0FvY21GdVoyVk9iMlJsY3lrZ2UxeHVJQ0JwWmlBb0lYSmhibWRsVG05a1pYTXViR1Z1WjNSb0lIeDhJSEpoYm1kbFRtOWtaWE5iTUYwdWJtOWtaVlI1Y0dVZ0lUMDlJREVwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJSDFjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREVzSUd4bGJpQTlJSEpoYm1kbFRtOWtaWE11YkdWdVozUm9PeUJwSUR3Z2JHVnVPeUFySzJrcElIdGNiaUFnSUNCcFppQW9JV2x6UVc1alpYTjBiM0pQWmloeVlXNW5aVTV2WkdWeld6QmRMQ0J5WVc1blpVNXZaR1Z6VzJsZEtTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sTzF4dUlDQWdJSDFjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdkSEoxWlR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWjJWMFUybHVaMnhsUld4bGJXVnVkRVp5YjIxU1lXNW5aU0FvY21GdVoyVXBJSHRjYmlBZ2RtRnlJRzV2WkdWeklEMGdjbUZ1WjJVdVoyVjBUbTlrWlhNb0tUdGNiaUFnYVdZZ0tDRnlZVzVuWlVOdmJuUmhhVzV6VTJsdVoyeGxSV3hsYldWdWRDaHViMlJsY3lrcElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjJkbGRGTnBibWRzWlVWc1pXMWxiblJHY205dFVtRnVaMlVvS1RvZ2NtRnVaMlVnWkdsa0lHNXZkQ0JqYjI1emFYTjBJRzltSUdFZ2MybHVaMnhsSUdWc1pXMWxiblFuS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnYm05a1pYTmJNRjA3WEc1OVhHNWNibVoxYm1OMGFXOXVJR2x6VkdWNGRGSmhibWRsSUNoeVlXNW5aU2tnZTF4dUlDQnlaWFIxY200Z2NtRnVaMlVnSmlZZ2NtRnVaMlV1ZEdWNGRDQWhQVDBnZG05cFpDQXdPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjFjR1JoZEdWR2NtOXRWR1Y0ZEZKaGJtZGxJQ2h6Wld3c0lISmhibWRsS1NCN1hHNGdJSE5sYkM1ZmNtRnVaMlZ6SUQwZ1czSmhibWRsWFR0Y2JpQWdkWEJrWVhSbFFXNWphRzl5UVc1a1JtOWpkWE5HY205dFVtRnVaMlVvYzJWc0xDQnlZVzVuWlN3Z1ptRnNjMlVwTzF4dUlDQnpaV3d1Y21GdVoyVkRiM1Z1ZENBOUlERTdYRzRnSUhObGJDNXBjME52Ykd4aGNITmxaQ0E5SUhKaGJtZGxMbU52Ykd4aGNITmxaRHRjYm4xY2JseHVablZ1WTNScGIyNGdkWEJrWVhSbFEyOXVkSEp2YkZObGJHVmpkR2x2YmlBb2MyVnNLU0I3WEc0Z0lITmxiQzVmY21GdVoyVnpMbXhsYm1kMGFDQTlJREE3WEc0Z0lHbG1JQ2h6Wld3dVgzTmxiR1ZqZEdsdmJpNTBlWEJsSUQwOVBTQW5UbTl1WlNjcElIdGNiaUFnSUNCMWNHUmhkR1ZGYlhCMGVWTmxiR1ZqZEdsdmJpaHpaV3dwTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhaaGNpQmpiMjUwY205c1VtRnVaMlVnUFNCelpXd3VYM05sYkdWamRHbHZiaTVqY21WaGRHVlNZVzVuWlNncE8xeHVJQ0FnSUdsbUlDaHBjMVJsZUhSU1lXNW5aU2hqYjI1MGNtOXNVbUZ1WjJVcEtTQjdYRzRnSUNBZ0lDQjFjR1JoZEdWR2NtOXRWR1Y0ZEZKaGJtZGxLSE5sYkN3Z1kyOXVkSEp2YkZKaGJtZGxLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2MyVnNMbkpoYm1kbFEyOTFiblFnUFNCamIyNTBjbTlzVW1GdVoyVXViR1Z1WjNSb08xeHVJQ0FnSUNBZ2RtRnlJSEpoYm1kbE8xeHVJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnpaV3d1Y21GdVoyVkRiM1Z1ZERzZ0t5dHBLU0I3WEc0Z0lDQWdJQ0FnSUhKaGJtZGxJRDBnWkc5akxtTnlaV0YwWlZKaGJtZGxLQ2s3WEc0Z0lDQWdJQ0FnSUhKaGJtZGxMbk5sYkdWamRFNXZaR1VvWTI5dWRISnZiRkpoYm1kbExtbDBaVzBvYVNrcE8xeHVJQ0FnSUNBZ0lDQnpaV3d1WDNKaGJtZGxjeTV3ZFhOb0tISmhibWRsS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhObGJDNXBjME52Ykd4aGNITmxaQ0E5SUhObGJDNXlZVzVuWlVOdmRXNTBJRDA5UFNBeElDWW1JSE5sYkM1ZmNtRnVaMlZ6V3pCZExtTnZiR3hoY0hObFpEdGNiaUFnSUNBZ0lIVndaR0YwWlVGdVkyaHZja0Z1WkVadlkzVnpSbkp2YlZKaGJtZGxLSE5sYkN3Z2MyVnNMbDl5WVc1blpYTmJjMlZzTG5KaGJtZGxRMjkxYm5RZ0xTQXhYU3dnWm1Gc2MyVXBPMXh1SUNBZ0lIMWNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJoWkdSU1lXNW5aVlJ2UTI5dWRISnZiRk5sYkdWamRHbHZiaUFvYzJWc0xDQnlZVzVuWlNrZ2UxeHVJQ0IyWVhJZ1kyOXVkSEp2YkZKaGJtZGxJRDBnYzJWc0xsOXpaV3hsWTNScGIyNHVZM0psWVhSbFVtRnVaMlVvS1R0Y2JpQWdkbUZ5SUhKaGJtZGxSV3hsYldWdWRDQTlJR2RsZEZOcGJtZHNaVVZzWlcxbGJuUkdjbTl0VW1GdVoyVW9jbUZ1WjJVcE8xeHVJQ0IyWVhJZ2JtVjNRMjl1ZEhKdmJGSmhibWRsSUQwZ1ltOWtlUzVqY21WaGRHVkRiMjUwY205c1VtRnVaMlVvS1R0Y2JpQWdabTl5SUNoMllYSWdhU0E5SURBc0lHeGxiaUE5SUdOdmJuUnliMnhTWVc1blpTNXNaVzVuZEdnN0lHa2dQQ0JzWlc0N0lDc3JhU2tnZTF4dUlDQWdJRzVsZDBOdmJuUnliMnhTWVc1blpTNWhaR1FvWTI5dWRISnZiRkpoYm1kbExtbDBaVzBvYVNrcE8xeHVJQ0I5WEc0Z0lIUnllU0I3WEc0Z0lDQWdibVYzUTI5dWRISnZiRkpoYm1kbExtRmtaQ2h5WVc1blpVVnNaVzFsYm5RcE8xeHVJQ0I5SUdOaGRHTm9JQ2hsS1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RoWkdSU1lXNW5aU2dwT2lCRmJHVnRaVzUwSUdOdmRXeGtJRzV2ZENCaVpTQmhaR1JsWkNCMGJ5QmpiMjUwY205c0lITmxiR1ZqZEdsdmJpY3BPMXh1SUNCOVhHNGdJRzVsZDBOdmJuUnliMnhTWVc1blpTNXpaV3hsWTNRb0tUdGNiaUFnZFhCa1lYUmxRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpaHpaV3dwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJwYzFOaGJXVlNZVzVuWlNBb2JHVm1kQ3dnY21sbmFIUXBJSHRjYmlBZ2NtVjBkWEp1SUNoY2JpQWdJQ0JzWldaMExuTjBZWEowUTI5dWRHRnBibVZ5SUQwOVBTQnlhV2RvZEM1emRHRnlkRU52Ym5SaGFXNWxjaUFtSmx4dUlDQWdJR3hsWm5RdWMzUmhjblJQWm1aelpYUWdQVDA5SUhKcFoyaDBMbk4wWVhKMFQyWm1jMlYwSUNZbVhHNGdJQ0FnYkdWbWRDNWxibVJEYjI1MFlXbHVaWElnUFQwOUlISnBaMmgwTG1WdVpFTnZiblJoYVc1bGNpQW1KbHh1SUNBZ0lHeGxablF1Wlc1a1QyWm1jMlYwSUQwOVBTQnlhV2RvZEM1bGJtUlBabVp6WlhSY2JpQWdLVHRjYm4xY2JseHVablZ1WTNScGIyNGdhWE5CYm1ObGMzUnZjazltSUNoaGJtTmxjM1J2Y2l3Z1pHVnpZMlZ1WkdGdWRDa2dlMXh1SUNCMllYSWdibTlrWlNBOUlHUmxjMk5sYm1SaGJuUTdYRzRnSUhkb2FXeGxJQ2h1YjJSbExuQmhjbVZ1ZEU1dlpHVXBJSHRjYmlBZ0lDQnBaaUFvYm05a1pTNXdZWEpsYm5ST2IyUmxJRDA5UFNCaGJtTmxjM1J2Y2lrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhSeWRXVTdYRzRnSUNBZ2ZWeHVJQ0FnSUc1dlpHVWdQU0J1YjJSbExuQmhjbVZ1ZEU1dlpHVTdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHWmhiSE5sTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJuWlhSVFpXeGxZM1JwYjI0Z0tDa2dlMXh1SUNCeVpYUjFjbTRnYm1WM0lFZGxkRk5sYkdWamRHbHZiaWhuYkc5aVlXd3VaRzlqZFcxbGJuUXVjMlZzWldOMGFXOXVLVHRjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm5aWFJUWld4bFkzUnBiMjQ3WEc0aVhYMD0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGlzSG9zdE1ldGhvZCAoaG9zdCwgcHJvcCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBob3N0W3Byb3BdO1xuICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCAhISh0eXBlID09PSAnb2JqZWN0JyAmJiBob3N0W3Byb3BdKSB8fCB0eXBlID09PSAndW5rbm93bic7XG59XG5cbmZ1bmN0aW9uIGlzSG9zdFByb3BlcnR5IChob3N0LCBwcm9wKSB7XG4gIHJldHVybiB0eXBlb2YgaG9zdFtwcm9wXSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cbmZ1bmN0aW9uIG1hbnkgKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBhcmVIb3N0ZWQgKGhvc3QsIHByb3BzKSB7XG4gICAgdmFyIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKCFmbihob3N0LCBwcm9wc1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGhvZDogaXNIb3N0TWV0aG9kLFxuICBtZXRob2RzOiBtYW55KGlzSG9zdE1ldGhvZCksXG4gIHByb3BlcnR5OiBpc0hvc3RQcm9wZXJ0eSxcbiAgcHJvcGVydGllczogbWFueShpc0hvc3RQcm9wZXJ0eSlcbn07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYm9keSA9IGRvYy5ib2R5O1xuXG5mdW5jdGlvbiByYW5nZVRvVGV4dFJhbmdlIChwKSB7XG4gIGlmIChwLmNvbGxhcHNlZCkge1xuICAgIHJldHVybiBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSh7IG5vZGU6IHAuc3RhcnRDb250YWluZXIsIG9mZnNldDogcC5zdGFydE9mZnNldCB9LCB0cnVlKTtcbiAgfVxuICB2YXIgc3RhcnRSYW5nZSA9IGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlKHsgbm9kZTogcC5zdGFydENvbnRhaW5lciwgb2Zmc2V0OiBwLnN0YXJ0T2Zmc2V0IH0sIHRydWUpO1xuICB2YXIgZW5kUmFuZ2UgPSBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSh7IG5vZGU6IHAuZW5kQ29udGFpbmVyLCBvZmZzZXQ6IHAuZW5kT2Zmc2V0IH0sIGZhbHNlKTtcbiAgdmFyIHRleHRSYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gIHRleHRSYW5nZS5zZXRFbmRQb2ludCgnU3RhcnRUb1N0YXJ0Jywgc3RhcnRSYW5nZSk7XG4gIHRleHRSYW5nZS5zZXRFbmRQb2ludCgnRW5kVG9FbmQnLCBlbmRSYW5nZSk7XG4gIHJldHVybiB0ZXh0UmFuZ2U7XG59XG5cbmZ1bmN0aW9uIGlzQ2hhcmFjdGVyRGF0YU5vZGUgKG5vZGUpIHtcbiAgdmFyIHQgPSBub2RlLm5vZGVUeXBlO1xuICByZXR1cm4gdCA9PT0gMyB8fCB0ID09PSA0IHx8IHQgPT09IDggO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSAocCwgc3RhcnRpbmcpIHtcbiAgdmFyIGJvdW5kO1xuICB2YXIgcGFyZW50O1xuICB2YXIgb2Zmc2V0ID0gcC5vZmZzZXQ7XG4gIHZhciB3b3JraW5nTm9kZTtcbiAgdmFyIGNoaWxkTm9kZXM7XG4gIHZhciByYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gIHZhciBkYXRhID0gaXNDaGFyYWN0ZXJEYXRhTm9kZShwLm5vZGUpO1xuXG4gIGlmIChkYXRhKSB7XG4gICAgYm91bmQgPSBwLm5vZGU7XG4gICAgcGFyZW50ID0gYm91bmQucGFyZW50Tm9kZTtcbiAgfSBlbHNlIHtcbiAgICBjaGlsZE5vZGVzID0gcC5ub2RlLmNoaWxkTm9kZXM7XG4gICAgYm91bmQgPSBvZmZzZXQgPCBjaGlsZE5vZGVzLmxlbmd0aCA/IGNoaWxkTm9kZXNbb2Zmc2V0XSA6IG51bGw7XG4gICAgcGFyZW50ID0gcC5ub2RlO1xuICB9XG5cbiAgd29ya2luZ05vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICB3b3JraW5nTm9kZS5pbm5lckhUTUwgPSAnJiNmZWZmOyc7XG5cbiAgaWYgKGJvdW5kKSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZSh3b3JraW5nTm9kZSwgYm91bmQpO1xuICB9IGVsc2Uge1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh3b3JraW5nTm9kZSk7XG4gIH1cblxuICByYW5nZS5tb3ZlVG9FbGVtZW50VGV4dCh3b3JraW5nTm9kZSk7XG4gIHJhbmdlLmNvbGxhcHNlKCFzdGFydGluZyk7XG4gIHBhcmVudC5yZW1vdmVDaGlsZCh3b3JraW5nTm9kZSk7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICByYW5nZVtzdGFydGluZyA/ICdtb3ZlU3RhcnQnIDogJ21vdmVFbmQnXSgnY2hhcmFjdGVyJywgb2Zmc2V0KTtcbiAgfVxuICByZXR1cm4gcmFuZ2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZ2VUb1RleHRSYW5nZTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5elpXeGxZMk5wYjI0dmMzSmpMM0poYm1kbFZHOVVaWGgwVW1GdVoyVXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQmtiMk1nUFNCbmJHOWlZV3d1Wkc5amRXMWxiblE3WEc1MllYSWdZbTlrZVNBOUlHUnZZeTVpYjJSNU8xeHVYRzVtZFc1amRHbHZiaUJ5WVc1blpWUnZWR1Y0ZEZKaGJtZGxJQ2h3S1NCN1hHNGdJR2xtSUNod0xtTnZiR3hoY0hObFpDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCamNtVmhkR1ZDYjNWdVpHRnllVlJsZUhSU1lXNW5aU2g3SUc1dlpHVTZJSEF1YzNSaGNuUkRiMjUwWVdsdVpYSXNJRzltWm5ObGREb2djQzV6ZEdGeWRFOW1abk5sZENCOUxDQjBjblZsS1R0Y2JpQWdmVnh1SUNCMllYSWdjM1JoY25SU1lXNW5aU0E5SUdOeVpXRjBaVUp2ZFc1a1lYSjVWR1Y0ZEZKaGJtZGxLSHNnYm05a1pUb2djQzV6ZEdGeWRFTnZiblJoYVc1bGNpd2diMlptYzJWME9pQndMbk4wWVhKMFQyWm1jMlYwSUgwc0lIUnlkV1VwTzF4dUlDQjJZWElnWlc1a1VtRnVaMlVnUFNCamNtVmhkR1ZDYjNWdVpHRnllVlJsZUhSU1lXNW5aU2g3SUc1dlpHVTZJSEF1Wlc1a1EyOXVkR0ZwYm1WeUxDQnZabVp6WlhRNklIQXVaVzVrVDJabWMyVjBJSDBzSUdaaGJITmxLVHRjYmlBZ2RtRnlJSFJsZUhSU1lXNW5aU0E5SUdKdlpIa3VZM0psWVhSbFZHVjRkRkpoYm1kbEtDazdYRzRnSUhSbGVIUlNZVzVuWlM1elpYUkZibVJRYjJsdWRDZ25VM1JoY25SVWIxTjBZWEowSnl3Z2MzUmhjblJTWVc1blpTazdYRzRnSUhSbGVIUlNZVzVuWlM1elpYUkZibVJRYjJsdWRDZ25SVzVrVkc5RmJtUW5MQ0JsYm1SU1lXNW5aU2s3WEc0Z0lISmxkSFZ5YmlCMFpYaDBVbUZ1WjJVN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdselEyaGhjbUZqZEdWeVJHRjBZVTV2WkdVZ0tHNXZaR1VwSUh0Y2JpQWdkbUZ5SUhRZ1BTQnViMlJsTG01dlpHVlVlWEJsTzF4dUlDQnlaWFIxY200Z2RDQTlQVDBnTXlCOGZDQjBJRDA5UFNBMElIeDhJSFFnUFQwOUlEZ2dPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmpjbVZoZEdWQ2IzVnVaR0Z5ZVZSbGVIUlNZVzVuWlNBb2NDd2djM1JoY25ScGJtY3BJSHRjYmlBZ2RtRnlJR0p2ZFc1a08xeHVJQ0IyWVhJZ2NHRnlaVzUwTzF4dUlDQjJZWElnYjJabWMyVjBJRDBnY0M1dlptWnpaWFE3WEc0Z0lIWmhjaUIzYjNKcmFXNW5UbTlrWlR0Y2JpQWdkbUZ5SUdOb2FXeGtUbTlrWlhNN1hHNGdJSFpoY2lCeVlXNW5aU0E5SUdKdlpIa3VZM0psWVhSbFZHVjRkRkpoYm1kbEtDazdYRzRnSUhaaGNpQmtZWFJoSUQwZ2FYTkRhR0Z5WVdOMFpYSkVZWFJoVG05a1pTaHdMbTV2WkdVcE8xeHVYRzRnSUdsbUlDaGtZWFJoS1NCN1hHNGdJQ0FnWW05MWJtUWdQU0J3TG01dlpHVTdYRzRnSUNBZ2NHRnlaVzUwSUQwZ1ltOTFibVF1Y0dGeVpXNTBUbTlrWlR0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCamFHbHNaRTV2WkdWeklEMGdjQzV1YjJSbExtTm9hV3hrVG05a1pYTTdYRzRnSUNBZ1ltOTFibVFnUFNCdlptWnpaWFFnUENCamFHbHNaRTV2WkdWekxteGxibWQwYUNBL0lHTm9hV3hrVG05a1pYTmJiMlptYzJWMFhTQTZJRzUxYkd3N1hHNGdJQ0FnY0dGeVpXNTBJRDBnY0M1dWIyUmxPMXh1SUNCOVhHNWNiaUFnZDI5eWEybHVaMDV2WkdVZ1BTQmtiMk11WTNKbFlYUmxSV3hsYldWdWRDZ25jM0JoYmljcE8xeHVJQ0IzYjNKcmFXNW5UbTlrWlM1cGJtNWxja2hVVFV3Z1BTQW5KaU5tWldabU95YzdYRzVjYmlBZ2FXWWdLR0p2ZFc1a0tTQjdYRzRnSUNBZ2NHRnlaVzUwTG1sdWMyVnlkRUpsWm05eVpTaDNiM0pyYVc1blRtOWtaU3dnWW05MWJtUXBPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSEJoY21WdWRDNWhjSEJsYm1SRGFHbHNaQ2gzYjNKcmFXNW5UbTlrWlNrN1hHNGdJSDFjYmx4dUlDQnlZVzVuWlM1dGIzWmxWRzlGYkdWdFpXNTBWR1Y0ZENoM2IzSnJhVzVuVG05a1pTazdYRzRnSUhKaGJtZGxMbU52Ykd4aGNITmxLQ0Z6ZEdGeWRHbHVaeWs3WEc0Z0lIQmhjbVZ1ZEM1eVpXMXZkbVZEYUdsc1pDaDNiM0pyYVc1blRtOWtaU2s3WEc1Y2JpQWdhV1lnS0dSaGRHRXBJSHRjYmlBZ0lDQnlZVzVuWlZ0emRHRnlkR2x1WnlBL0lDZHRiM1psVTNSaGNuUW5JRG9nSjIxdmRtVkZibVFuWFNnblkyaGhjbUZqZEdWeUp5d2diMlptYzJWMEtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtRnVaMlU3WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjbUZ1WjJWVWIxUmxlSFJTWVc1blpUdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uJyk7XG52YXIgc2V0U2VsZWN0aW9uID0gcmVxdWlyZSgnLi9zZXRTZWxlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldDogZ2V0U2VsZWN0aW9uLFxuICBzZXQ6IHNldFNlbGVjdGlvblxufTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGdldFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uJyk7XG52YXIgcmFuZ2VUb1RleHRSYW5nZSA9IHJlcXVpcmUoJy4vcmFuZ2VUb1RleHRSYW5nZScpO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcblxuZnVuY3Rpb24gc2V0U2VsZWN0aW9uIChwKSB7XG4gIGlmIChkb2MuY3JlYXRlUmFuZ2UpIHtcbiAgICBtb2Rlcm5TZWxlY3Rpb24oKTtcbiAgfSBlbHNlIHtcbiAgICBvbGRTZWxlY3Rpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vZGVyblNlbGVjdGlvbiAoKSB7XG4gICAgdmFyIHNlbCA9IGdldFNlbGVjdGlvbigpO1xuICAgIHZhciByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgIGlmICghcC5zdGFydENvbnRhaW5lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocC5lbmRDb250YWluZXIpIHtcbiAgICAgIHJhbmdlLnNldEVuZChwLmVuZENvbnRhaW5lciwgcC5lbmRPZmZzZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYW5nZS5zZXRFbmQocC5zdGFydENvbnRhaW5lciwgcC5zdGFydE9mZnNldCk7XG4gICAgfVxuICAgIHJhbmdlLnNldFN0YXJ0KHAuc3RhcnRDb250YWluZXIsIHAuc3RhcnRPZmZzZXQpO1xuICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gb2xkU2VsZWN0aW9uICgpIHtcbiAgICByYW5nZVRvVGV4dFJhbmdlKHApLnNlbGVjdCgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0U2VsZWN0aW9uO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld4bFkyTnBiMjR2YzNKakwzTmxkRk5sYkdWamRHbHZiaTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJuWlhSVFpXeGxZM1JwYjI0Z1BTQnlaWEYxYVhKbEtDY3VMMmRsZEZObGJHVmpkR2x2YmljcE8xeHVkbUZ5SUhKaGJtZGxWRzlVWlhoMFVtRnVaMlVnUFNCeVpYRjFhWEpsS0NjdUwzSmhibWRsVkc5VVpYaDBVbUZ1WjJVbktUdGNiblpoY2lCa2IyTWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzVjYm1aMWJtTjBhVzl1SUhObGRGTmxiR1ZqZEdsdmJpQW9jQ2tnZTF4dUlDQnBaaUFvWkc5akxtTnlaV0YwWlZKaGJtZGxLU0I3WEc0Z0lDQWdiVzlrWlhKdVUyVnNaV04wYVc5dUtDazdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdiMnhrVTJWc1pXTjBhVzl1S0NrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnRiMlJsY201VFpXeGxZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lIWmhjaUJ6Wld3Z1BTQm5aWFJUWld4bFkzUnBiMjRvS1R0Y2JpQWdJQ0IyWVhJZ2NtRnVaMlVnUFNCa2IyTXVZM0psWVhSbFVtRnVaMlVvS1R0Y2JpQWdJQ0JwWmlBb0lYQXVjM1JoY25SRGIyNTBZV2x1WlhJcElIdGNiaUFnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0hBdVpXNWtRMjl1ZEdGcGJtVnlLU0I3WEc0Z0lDQWdJQ0J5WVc1blpTNXpaWFJGYm1Rb2NDNWxibVJEYjI1MFlXbHVaWElzSUhBdVpXNWtUMlptYzJWMEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnY21GdVoyVXVjMlYwUlc1a0tIQXVjM1JoY25SRGIyNTBZV2x1WlhJc0lIQXVjM1JoY25SUFptWnpaWFFwTzF4dUlDQWdJSDFjYmlBZ0lDQnlZVzVuWlM1elpYUlRkR0Z5ZENod0xuTjBZWEowUTI5dWRHRnBibVZ5TENCd0xuTjBZWEowVDJabWMyVjBLVHRjYmlBZ0lDQnpaV3d1Y21WdGIzWmxRV3hzVW1GdVoyVnpLQ2s3WEc0Z0lDQWdjMlZzTG1Ga1pGSmhibWRsS0hKaGJtZGxLVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUc5c1pGTmxiR1ZqZEdsdmJpQW9LU0I3WEc0Z0lDQWdjbUZ1WjJWVWIxUmxlSFJTWVc1blpTaHdLUzV6Wld4bFkzUW9LVHRjYmlBZ2ZWeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhObGRGTmxiR1ZqZEdsdmJqdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldCA9IGVhc3lHZXQ7XG52YXIgc2V0ID0gZWFzeVNldDtcblxuaWYgKGRvY3VtZW50LnNlbGVjdGlvbiAmJiBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UpIHtcbiAgZ2V0ID0gaGFyZEdldDtcbiAgc2V0ID0gaGFyZFNldDtcbn1cblxuZnVuY3Rpb24gZWFzeUdldCAoZWwpIHtcbiAgcmV0dXJuIHtcbiAgICBzdGFydDogZWwuc2VsZWN0aW9uU3RhcnQsXG4gICAgZW5kOiBlbC5zZWxlY3Rpb25FbmRcbiAgfTtcbn1cblxuZnVuY3Rpb24gaGFyZEdldCAoZWwpIHtcbiAgdmFyIGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIGlmIChhY3RpdmUgIT09IGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxuXG4gIHZhciByYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICB2YXIgYm9va21hcmsgPSByYW5nZS5nZXRCb29rbWFyaygpO1xuICB2YXIgb3JpZ2luYWwgPSBlbC52YWx1ZTtcbiAgdmFyIG1hcmtlciA9IGdldFVuaXF1ZU1hcmtlcihvcmlnaW5hbCk7XG4gIHZhciBwYXJlbnQgPSByYW5nZS5wYXJlbnRFbGVtZW50KCk7XG4gIGlmIChwYXJlbnQgPT09IG51bGwgfHwgIWlucHV0cyhwYXJlbnQpKSB7XG4gICAgcmV0dXJuIHJlc3VsdCgwLCAwKTtcbiAgfVxuICByYW5nZS50ZXh0ID0gbWFya2VyICsgcmFuZ2UudGV4dCArIG1hcmtlcjtcblxuICB2YXIgY29udGVudHMgPSBlbC52YWx1ZTtcblxuICBlbC52YWx1ZSA9IG9yaWdpbmFsO1xuICByYW5nZS5tb3ZlVG9Cb29rbWFyayhib29rbWFyayk7XG4gIHJhbmdlLnNlbGVjdCgpO1xuXG4gIHJldHVybiByZXN1bHQoY29udGVudHMuaW5kZXhPZihtYXJrZXIpLCBjb250ZW50cy5sYXN0SW5kZXhPZihtYXJrZXIpIC0gbWFya2VyLmxlbmd0aCk7XG5cbiAgZnVuY3Rpb24gcmVzdWx0IChzdGFydCwgZW5kKSB7XG4gICAgaWYgKGFjdGl2ZSAhPT0gZWwpIHsgLy8gZG9uJ3QgZGlzcnVwdCBwcmUtZXhpc3Rpbmcgc3RhdGVcbiAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgYWN0aXZlLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5ibHVyKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRVbmlxdWVNYXJrZXIgKGNvbnRlbnRzKSB7XG4gIHZhciBtYXJrZXI7XG4gIGRvIHtcbiAgICBtYXJrZXIgPSAnQEBtYXJrZXIuJyArIE1hdGgucmFuZG9tKCkgKiBuZXcgRGF0ZSgpO1xuICB9IHdoaWxlIChjb250ZW50cy5pbmRleE9mKG1hcmtlcikgIT09IC0xKTtcbiAgcmV0dXJuIG1hcmtlcjtcbn1cblxuZnVuY3Rpb24gaW5wdXRzIChlbCkge1xuICByZXR1cm4gKChlbC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsLnR5cGUgPT09ICd0ZXh0JykgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJyk7XG59XG5cbmZ1bmN0aW9uIGVhc3lTZXQgKGVsLCBwKSB7XG4gIGVsLnNlbGVjdGlvblN0YXJ0ID0gcGFyc2UoZWwsIHAuc3RhcnQpO1xuICBlbC5zZWxlY3Rpb25FbmQgPSBwYXJzZShlbCwgcC5lbmQpO1xufVxuXG5mdW5jdGlvbiBoYXJkU2V0IChlbCwgcCkge1xuICB2YXIgcmFuZ2UgPSBlbC5jcmVhdGVUZXh0UmFuZ2UoKTtcblxuICBpZiAocC5zdGFydCA9PT0gJ2VuZCcgJiYgcC5lbmQgPT09ICdlbmQnKSB7XG4gICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgIHJhbmdlLnNlbGVjdCgpO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIHBhcnNlKGVsLCBwLmVuZCkpO1xuICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgcGFyc2UoZWwsIHAuc3RhcnQpKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZSAoZWwsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gJ2VuZCcgPyBlbC52YWx1ZS5sZW5ndGggOiB2YWx1ZSB8fCAwO1xufVxuXG5mdW5jdGlvbiBzZWxsIChlbCwgcCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHNldChlbCwgcCk7XG4gIH1cbiAgcmV0dXJuIGdldChlbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VsbDtcbiIsInZhciBzaSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicsIHRpY2s7XG5pZiAoc2kpIHtcbiAgdGljayA9IGZ1bmN0aW9uIChmbikgeyBzZXRJbW1lZGlhdGUoZm4pOyB9O1xufSBlbHNlIHtcbiAgdGljayA9IGZ1bmN0aW9uIChmbikgeyBzZXRUaW1lb3V0KGZuLCAwKTsgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aWNrOyIsIlxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHJpbTtcblxuZnVuY3Rpb24gdHJpbShzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKTtcbn1cblxuZXhwb3J0cy5sZWZ0ID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKTtcbn07XG5cbmV4cG9ydHMucmlnaHQgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccyokLywgJycpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIHdpbmRvdyA9IHJlcXVpcmUoXCJnbG9iYWwvd2luZG93XCIpXG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoXCJpcy1mdW5jdGlvblwiKVxudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoXCJwYXJzZS1oZWFkZXJzXCIpXG52YXIgeHRlbmQgPSByZXF1aXJlKFwieHRlbmRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVYSFJcbmNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCB8fCBub29wXG5jcmVhdGVYSFIuWERvbWFpblJlcXVlc3QgPSBcIndpdGhDcmVkZW50aWFsc1wiIGluIChuZXcgY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0KCkpID8gY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0IDogd2luZG93LlhEb21haW5SZXF1ZXN0XG5cbmZvckVhY2hBcnJheShbXCJnZXRcIiwgXCJwdXRcIiwgXCJwb3N0XCIsIFwicGF0Y2hcIiwgXCJoZWFkXCIsIFwiZGVsZXRlXCJdLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICBjcmVhdGVYSFJbbWV0aG9kID09PSBcImRlbGV0ZVwiID8gXCJkZWxcIiA6IG1ldGhvZF0gPSBmdW5jdGlvbih1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICAgIG9wdGlvbnMgPSBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgICAgIG9wdGlvbnMubWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICAgICAgcmV0dXJuIF9jcmVhdGVYSFIob3B0aW9ucylcbiAgICB9XG59KVxuXG5mdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRvcihhcnJheVtpXSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHkob2JqKXtcbiAgICBmb3IodmFyIGkgaW4gb2JqKXtcbiAgICAgICAgaWYob2JqLmhhc093blByb3BlcnR5KGkpKSByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHBhcmFtcyA9IHVyaVxuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgICAgIGlmICh0eXBlb2YgdXJpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSB7dXJpOnVyaX1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcyA9IHh0ZW5kKG9wdGlvbnMsIHt1cmk6IHVyaX0pXG4gICAgfVxuXG4gICAgcGFyYW1zLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICByZXR1cm4gcGFyYW1zXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVhIUih1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgb3B0aW9ucyA9IGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICByZXR1cm4gX2NyZWF0ZVhIUihvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlWEhSKG9wdGlvbnMpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrXG4gICAgaWYodHlwZW9mIGNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgYXJndW1lbnQgbWlzc2luZ1wiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlYWR5c3RhdGVjaGFuZ2UoKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgbG9hZEZ1bmMoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9keSgpIHtcbiAgICAgICAgLy8gQ2hyb21lIHdpdGggcmVxdWVzdFR5cGU9YmxvYiB0aHJvd3MgZXJyb3JzIGFycm91bmQgd2hlbiBldmVuIHRlc3RpbmcgYWNjZXNzIHRvIHJlc3BvbnNlVGV4dFxuICAgICAgICB2YXIgYm9keSA9IHVuZGVmaW5lZFxuXG4gICAgICAgIGlmICh4aHIucmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGJvZHkgPSB4aHIucmVzcG9uc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvZHkgPSB4aHIucmVzcG9uc2VUZXh0IHx8IGdldFhtbCh4aHIpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNKc29uKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGJvZHkgPSBKU09OLnBhcnNlKGJvZHkpXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJvZHlcbiAgICB9XG5cbiAgICB2YXIgZmFpbHVyZVJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGJvZHk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiAwLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgIHVybDogdXJpLFxuICAgICAgICAgICAgICAgIHJhd1JlcXVlc3Q6IHhoclxuICAgICAgICAgICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3JGdW5jKGV2dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dFRpbWVyKVxuICAgICAgICBpZighKGV2dCBpbnN0YW5jZW9mIEVycm9yKSl7XG4gICAgICAgICAgICBldnQgPSBuZXcgRXJyb3IoXCJcIiArIChldnQgfHwgXCJVbmtub3duIFhNTEh0dHBSZXF1ZXN0IEVycm9yXCIpIClcbiAgICAgICAgfVxuICAgICAgICBldnQuc3RhdHVzQ29kZSA9IDBcbiAgICAgICAgY2FsbGJhY2soZXZ0LCBmYWlsdXJlUmVzcG9uc2UpXG4gICAgICAgIGNhbGxiYWNrID0gbm9vcFxuICAgIH1cblxuICAgIC8vIHdpbGwgbG9hZCB0aGUgZGF0YSAmIHByb2Nlc3MgdGhlIHJlc3BvbnNlIGluIGEgc3BlY2lhbCByZXNwb25zZSBvYmplY3RcbiAgICBmdW5jdGlvbiBsb2FkRnVuYygpIHtcbiAgICAgICAgaWYgKGFib3J0ZWQpIHJldHVyblxuICAgICAgICB2YXIgc3RhdHVzXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpXG4gICAgICAgIGlmKG9wdGlvbnMudXNlWERSICYmIHhoci5zdGF0dXM9PT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vSUU4IENPUlMgR0VUIHN1Y2Nlc3NmdWwgcmVzcG9uc2UgZG9lc24ndCBoYXZlIGEgc3RhdHVzIGZpZWxkLCBidXQgYm9keSBpcyBmaW5lXG4gICAgICAgICAgICBzdGF0dXMgPSAyMDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXR1cyA9ICh4aHIuc3RhdHVzID09PSAxMjIzID8gMjA0IDogeGhyLnN0YXR1cylcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBmYWlsdXJlUmVzcG9uc2VcbiAgICAgICAgdmFyIGVyciA9IG51bGxcblxuICAgICAgICBpZiAoc3RhdHVzICE9PSAwKXtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGJvZHk6IGdldEJvZHkoKSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBzdGF0dXMsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICAgICAgdXJsOiB1cmksXG4gICAgICAgICAgICAgICAgcmF3UmVxdWVzdDogeGhyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKXsgLy9yZW1lbWJlciB4aHIgY2FuIGluIGZhY3QgYmUgWERSIGZvciBDT1JTIGluIElFXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuaGVhZGVycyA9IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoXCJJbnRlcm5hbCBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKVxuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKGVyciwgcmVzcG9uc2UsIHJlc3BvbnNlLmJvZHkpXG4gICAgICAgIGNhbGxiYWNrID0gbm9vcFxuXG4gICAgfVxuXG4gICAgdmFyIHhociA9IG9wdGlvbnMueGhyIHx8IG51bGxcblxuICAgIGlmICgheGhyKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNvcnMgfHwgb3B0aW9ucy51c2VYRFIpIHtcbiAgICAgICAgICAgIHhociA9IG5ldyBjcmVhdGVYSFIuWERvbWFpblJlcXVlc3QoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHhociA9IG5ldyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGtleVxuICAgIHZhciBhYm9ydGVkXG4gICAgdmFyIHVyaSA9IHhoci51cmwgPSBvcHRpb25zLnVyaSB8fCBvcHRpb25zLnVybFxuICAgIHZhciBtZXRob2QgPSB4aHIubWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgXCJHRVRcIlxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5IHx8IG9wdGlvbnMuZGF0YSB8fCBudWxsXG4gICAgdmFyIGhlYWRlcnMgPSB4aHIuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fVxuICAgIHZhciBzeW5jID0gISFvcHRpb25zLnN5bmNcbiAgICB2YXIgaXNKc29uID0gZmFsc2VcbiAgICB2YXIgdGltZW91dFRpbWVyXG5cbiAgICBpZiAoXCJqc29uXCIgaW4gb3B0aW9ucykge1xuICAgICAgICBpc0pzb24gPSB0cnVlXG4gICAgICAgIGhlYWRlcnNbXCJhY2NlcHRcIl0gfHwgaGVhZGVyc1tcIkFjY2VwdFwiXSB8fCAoaGVhZGVyc1tcIkFjY2VwdFwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiKSAvL0Rvbid0IG92ZXJyaWRlIGV4aXN0aW5nIGFjY2VwdCBoZWFkZXIgZGVjbGFyZWQgYnkgdXNlclxuICAgICAgICBpZiAobWV0aG9kICE9PSBcIkdFVFwiICYmIG1ldGhvZCAhPT0gXCJIRUFEXCIpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbXCJjb250ZW50LXR5cGVcIl0gfHwgaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSB8fCAoaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiKSAvL0Rvbid0IG92ZXJyaWRlIGV4aXN0aW5nIGFjY2VwdCBoZWFkZXIgZGVjbGFyZWQgYnkgdXNlclxuICAgICAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuanNvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZWFkeXN0YXRlY2hhbmdlXG4gICAgeGhyLm9ubG9hZCA9IGxvYWRGdW5jXG4gICAgeGhyLm9uZXJyb3IgPSBlcnJvckZ1bmNcbiAgICAvLyBJRTkgbXVzdCBoYXZlIG9ucHJvZ3Jlc3MgYmUgc2V0IHRvIGEgdW5pcXVlIGZ1bmN0aW9uLlxuICAgIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBJRSBtdXN0IGRpZVxuICAgIH1cbiAgICB4aHIub250aW1lb3V0ID0gZXJyb3JGdW5jXG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmksICFzeW5jLCBvcHRpb25zLnVzZXJuYW1lLCBvcHRpb25zLnBhc3N3b3JkKVxuICAgIC8vaGFzIHRvIGJlIGFmdGVyIG9wZW5cbiAgICBpZighc3luYykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISFvcHRpb25zLndpdGhDcmVkZW50aWFsc1xuICAgIH1cbiAgICAvLyBDYW5ub3Qgc2V0IHRpbWVvdXQgd2l0aCBzeW5jIHJlcXVlc3RcbiAgICAvLyBub3Qgc2V0dGluZyB0aW1lb3V0IG9uIHRoZSB4aHIgb2JqZWN0LCBiZWNhdXNlIG9mIG9sZCB3ZWJraXRzIGV0Yy4gbm90IGhhbmRsaW5nIHRoYXQgY29ycmVjdGx5XG4gICAgLy8gYm90aCBucG0ncyByZXF1ZXN0IGFuZCBqcXVlcnkgMS54IHVzZSB0aGlzIGtpbmQgb2YgdGltZW91dCwgc28gdGhpcyBpcyBiZWluZyBjb25zaXN0ZW50XG4gICAgaWYgKCFzeW5jICYmIG9wdGlvbnMudGltZW91dCA+IDAgKSB7XG4gICAgICAgIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGFib3J0ZWQ9dHJ1ZS8vSUU5IG1heSBzdGlsbCBjYWxsIHJlYWR5c3RhdGVjaGFuZ2VcbiAgICAgICAgICAgIHhoci5hYm9ydChcInRpbWVvdXRcIilcbiAgICAgICAgICAgIHZhciBlID0gbmV3IEVycm9yKFwiWE1MSHR0cFJlcXVlc3QgdGltZW91dFwiKVxuICAgICAgICAgICAgZS5jb2RlID0gXCJFVElNRURPVVRcIlxuICAgICAgICAgICAgZXJyb3JGdW5jKGUpXG4gICAgICAgIH0sIG9wdGlvbnMudGltZW91dCApXG4gICAgfVxuXG4gICAgaWYgKHhoci5zZXRSZXF1ZXN0SGVhZGVyKSB7XG4gICAgICAgIGZvcihrZXkgaW4gaGVhZGVycyl7XG4gICAgICAgICAgICBpZihoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpe1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmhlYWRlcnMgJiYgIWlzRW1wdHkob3B0aW9ucy5oZWFkZXJzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZWFkZXJzIGNhbm5vdCBiZSBzZXQgb24gYW4gWERvbWFpblJlcXVlc3Qgb2JqZWN0XCIpXG4gICAgfVxuXG4gICAgaWYgKFwicmVzcG9uc2VUeXBlXCIgaW4gb3B0aW9ucykge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5yZXNwb25zZVR5cGVcbiAgICB9XG5cbiAgICBpZiAoXCJiZWZvcmVTZW5kXCIgaW4gb3B0aW9ucyAmJlxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5iZWZvcmVTZW5kID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgICAgb3B0aW9ucy5iZWZvcmVTZW5kKHhocilcbiAgICB9XG5cbiAgICB4aHIuc2VuZChib2R5KVxuXG4gICAgcmV0dXJuIHhoclxuXG5cbn1cblxuZnVuY3Rpb24gZ2V0WG1sKHhocikge1xuICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVhNTFxuICAgIH1cbiAgICB2YXIgZmlyZWZveEJ1Z1Rha2VuRWZmZWN0ID0geGhyLnN0YXR1cyA9PT0gMjA0ICYmIHhoci5yZXNwb25zZVhNTCAmJiB4aHIucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lID09PSBcInBhcnNlcmVycm9yXCJcbiAgICBpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJcIiAmJiAhZmlyZWZveEJ1Z1Rha2VuRWZmZWN0KSB7XG4gICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUxcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBub29wKCkge31cbiIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0ge31cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBJbnB1dFN0YXRlID0gcmVxdWlyZSgnLi9JbnB1dFN0YXRlJyk7XG5cbmZ1bmN0aW9uIElucHV0SGlzdG9yeSAoc3VyZmFjZSwgbW9kZSkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuXG4gIHN0YXRlLmlucHV0TW9kZSA9IG1vZGU7XG4gIHN0YXRlLnN1cmZhY2UgPSBzdXJmYWNlO1xuICBzdGF0ZS5yZXNldCgpO1xuXG4gIGxpc3RlbihzdXJmYWNlLnRleHRhcmVhKTtcbiAgbGlzdGVuKHN1cmZhY2UuZWRpdGFibGUpO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbiAoZWwpIHtcbiAgICB2YXIgcGFzdGVIYW5kbGVyID0gc2VsZmllKGhhbmRsZVBhc3RlKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGVsLCAna2V5cHJlc3MnLCBwcmV2ZW50Q3RybFlaKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGVsLCAna2V5ZG93bicsIHNlbGZpZShoYW5kbGVDdHJsWVopKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGVsLCAna2V5ZG93bicsIHNlbGZpZShoYW5kbGVNb2RlQ2hhbmdlKSk7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ21vdXNlZG93bicsIHNldE1vdmluZyk7XG4gICAgZWwub25wYXN0ZSA9IHBhc3RlSGFuZGxlcjtcbiAgICBlbC5vbmRyb3AgPSBwYXN0ZUhhbmRsZXI7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRNb3ZpbmcgKCkge1xuICAgIHN0YXRlLnNldE1vZGUoJ21vdmluZycpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZmllIChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVyIChlKSB7IHJldHVybiBmbi5jYWxsKG51bGwsIHN0YXRlLCBlKTsgfTtcbiAgfVxufVxuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnNldElucHV0TW9kZSA9IGZ1bmN0aW9uIChtb2RlKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIHN0YXRlLmlucHV0TW9kZSA9IG1vZGU7XG4gIHN0YXRlLnJlc2V0KCk7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBzdGF0ZS5pbnB1dFN0YXRlID0gbnVsbDtcbiAgc3RhdGUubGFzdFN0YXRlID0gbnVsbDtcbiAgc3RhdGUuaGlzdG9yeSA9IFtdO1xuICBzdGF0ZS5oaXN0b3J5UG9pbnRlciA9IDA7XG4gIHN0YXRlLmhpc3RvcnlNb2RlID0gJ25vbmUnO1xuICBzdGF0ZS5yZWZyZXNoaW5nID0gbnVsbDtcbiAgc3RhdGUucmVmcmVzaFN0YXRlKHRydWUpO1xuICBzdGF0ZS5zYXZlU3RhdGUoKTtcbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5zZXRDb21tYW5kTW9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgc3RhdGUuaGlzdG9yeU1vZGUgPSAnY29tbWFuZCc7XG4gIHN0YXRlLnNhdmVTdGF0ZSgpO1xuICBzdGF0ZS5yZWZyZXNoaW5nID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhdGUucmVmcmVzaFN0YXRlKCk7XG4gIH0sIDApO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5jYW5VbmRvID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5oaXN0b3J5UG9pbnRlciA+IDE7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLmNhblJlZG8gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmhpc3RvcnlbdGhpcy5oaXN0b3J5UG9pbnRlciArIDFdO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS51bmRvID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBpZiAoc3RhdGUuY2FuVW5kbygpKSB7XG4gICAgaWYgKHN0YXRlLmxhc3RTdGF0ZSkge1xuICAgICAgc3RhdGUubGFzdFN0YXRlLnJlc3RvcmUoKTtcbiAgICAgIHN0YXRlLmxhc3RTdGF0ZSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeVBvaW50ZXJdID0gbmV3IElucHV0U3RhdGUoc3RhdGUuc3VyZmFjZSwgc3RhdGUuaW5wdXRNb2RlKTtcbiAgICAgIHN0YXRlLmhpc3RvcnlbLS1zdGF0ZS5oaXN0b3J5UG9pbnRlcl0ucmVzdG9yZSgpO1xuICAgIH1cbiAgfVxuICBzdGF0ZS5oaXN0b3J5TW9kZSA9ICdub25lJztcbiAgc3RhdGUuc3VyZmFjZS5mb2N1cyhzdGF0ZS5pbnB1dE1vZGUpO1xuICBzdGF0ZS5yZWZyZXNoU3RhdGUoKTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUucmVkbyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgaWYgKHN0YXRlLmNhblJlZG8oKSkge1xuICAgIHN0YXRlLmhpc3RvcnlbKytzdGF0ZS5oaXN0b3J5UG9pbnRlcl0ucmVzdG9yZSgpO1xuICB9XG5cbiAgc3RhdGUuaGlzdG9yeU1vZGUgPSAnbm9uZSc7XG4gIHN0YXRlLnN1cmZhY2UuZm9jdXMoc3RhdGUuaW5wdXRNb2RlKTtcbiAgc3RhdGUucmVmcmVzaFN0YXRlKCk7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnNldE1vZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgaWYgKHN0YXRlLmhpc3RvcnlNb2RlICE9PSB2YWx1ZSkge1xuICAgIHN0YXRlLmhpc3RvcnlNb2RlID0gdmFsdWU7XG4gICAgc3RhdGUuc2F2ZVN0YXRlKCk7XG4gIH1cbiAgc3RhdGUucmVmcmVzaGluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xuICB9LCAxKTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUucmVmcmVzaFN0YXRlID0gZnVuY3Rpb24gKGluaXRpYWxTdGF0ZSkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBzdGF0ZS5pbnB1dFN0YXRlID0gbmV3IElucHV0U3RhdGUoc3RhdGUuc3VyZmFjZSwgc3RhdGUuaW5wdXRNb2RlLCBpbml0aWFsU3RhdGUpO1xuICBzdGF0ZS5yZWZyZXNoaW5nID0gbnVsbDtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUuc2F2ZVN0YXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICB2YXIgY3VycmVudCA9IHN0YXRlLmlucHV0U3RhdGUgfHwgbmV3IElucHV0U3RhdGUoc3RhdGUuc3VyZmFjZSwgc3RhdGUuaW5wdXRNb2RlKTtcblxuICBpZiAoc3RhdGUuaGlzdG9yeU1vZGUgPT09ICdtb3ZpbmcnKSB7XG4gICAgaWYgKCFzdGF0ZS5sYXN0U3RhdGUpIHtcbiAgICAgIHN0YXRlLmxhc3RTdGF0ZSA9IGN1cnJlbnQ7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoc3RhdGUubGFzdFN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeVBvaW50ZXIgLSAxXS50ZXh0ICE9PSBzdGF0ZS5sYXN0U3RhdGUudGV4dCkge1xuICAgICAgc3RhdGUuaGlzdG9yeVtzdGF0ZS5oaXN0b3J5UG9pbnRlcisrXSA9IHN0YXRlLmxhc3RTdGF0ZTtcbiAgICB9XG4gICAgc3RhdGUubGFzdFN0YXRlID0gbnVsbDtcbiAgfVxuICBzdGF0ZS5oaXN0b3J5W3N0YXRlLmhpc3RvcnlQb2ludGVyKytdID0gY3VycmVudDtcbiAgc3RhdGUuaGlzdG9yeVtzdGF0ZS5oaXN0b3J5UG9pbnRlciArIDFdID0gbnVsbDtcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZUN0cmxZWiAoc3RhdGUsIGUpIHtcbiAgdmFyIGhhbmRsZWQgPSBmYWxzZTtcbiAgdmFyIGtleUNvZGUgPSBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZTtcbiAgdmFyIGtleUNvZGVDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXlDb2RlKTtcblxuICBpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xuICAgIHN3aXRjaCAoa2V5Q29kZUNoYXIudG9Mb3dlckNhc2UoKSkge1xuICAgICAgY2FzZSAneSc6XG4gICAgICAgIHN0YXRlLnJlZG8oKTtcbiAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICd6JzpcbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICBzdGF0ZS5yZWRvKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUudW5kbygpO1xuICAgICAgICB9XG4gICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoaGFuZGxlZCAmJiBlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1vZGVDaGFuZ2UgKHN0YXRlLCBlKSB7XG4gIGlmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XG5cbiAgaWYgKChrZXlDb2RlID49IDMzICYmIGtleUNvZGUgPD0gNDApIHx8IChrZXlDb2RlID49IDYzMjMyICYmIGtleUNvZGUgPD0gNjMyMzUpKSB7XG4gICAgc3RhdGUuc2V0TW9kZSgnbW92aW5nJyk7XG4gIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gOCB8fCBrZXlDb2RlID09PSA0NiB8fCBrZXlDb2RlID09PSAxMjcpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCdkZWxldGluZycpO1xuICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IDEzKSB7XG4gICAgc3RhdGUuc2V0TW9kZSgnbmV3bGluZXMnKTtcbiAgfSBlbHNlIGlmIChrZXlDb2RlID09PSAyNykge1xuICAgIHN0YXRlLnNldE1vZGUoJ2VzY2FwZScpO1xuICB9IGVsc2UgaWYgKChrZXlDb2RlIDwgMTYgfHwga2V5Q29kZSA+IDIwKSAmJiBrZXlDb2RlICE9PSA5MSkge1xuICAgIHN0YXRlLnNldE1vZGUoJ3R5cGluZycpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVBhc3RlIChzdGF0ZSkge1xuICBpZiAoc3RhdGUuaW5wdXRTdGF0ZSAmJiBzdGF0ZS5pbnB1dFN0YXRlLnRleHQgIT09IHN0YXRlLnN1cmZhY2UucmVhZChzdGF0ZS5pbnB1dE1vZGUpICYmIHN0YXRlLnJlZnJlc2hpbmcgPT09IG51bGwpIHtcbiAgICBzdGF0ZS5oaXN0b3J5TW9kZSA9ICdwYXN0ZSc7XG4gICAgc3RhdGUuc2F2ZVN0YXRlKCk7XG4gICAgc3RhdGUucmVmcmVzaFN0YXRlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJldmVudEN0cmxZWiAoZSkge1xuICB2YXIga2V5Q29kZSA9IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlO1xuICB2YXIgeXogPSBrZXlDb2RlID09PSA4OSB8fCBrZXlDb2RlID09PSA5MDtcbiAgdmFyIGN0cmwgPSBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5O1xuICBpZiAoY3RybCAmJiB5eikge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0SGlzdG9yeTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBpc1Zpc2libGVFbGVtZW50ID0gcmVxdWlyZSgnLi9pc1Zpc2libGVFbGVtZW50Jyk7XG52YXIgZml4RU9MID0gcmVxdWlyZSgnLi9maXhFT0wnKTtcbnZhciBNYXJrZG93bkNodW5rcyA9IHJlcXVpcmUoJy4vbWFya2Rvd24vTWFya2Rvd25DaHVua3MnKTtcbnZhciBIdG1sQ2h1bmtzID0gcmVxdWlyZSgnLi9odG1sL0h0bWxDaHVua3MnKTtcbnZhciBjaHVua3MgPSB7XG4gIG1hcmtkb3duOiBNYXJrZG93bkNodW5rcyxcbiAgaHRtbDogSHRtbENodW5rcyxcbiAgd3lzaXd5ZzogSHRtbENodW5rc1xufTtcblxuZnVuY3Rpb24gSW5wdXRTdGF0ZSAoc3VyZmFjZSwgbW9kZSwgaW5pdGlhbFN0YXRlKSB7XG4gIHRoaXMubW9kZSA9IG1vZGU7XG4gIHRoaXMuc3VyZmFjZSA9IHN1cmZhY2U7XG4gIHRoaXMuaW5pdGlhbFN0YXRlID0gaW5pdGlhbFN0YXRlIHx8IGZhbHNlO1xuICB0aGlzLmluaXQoKTtcbn1cblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZWwgPSBzZWxmLnN1cmZhY2UuY3VycmVudChzZWxmLm1vZGUpO1xuICBpZiAoIWlzVmlzaWJsZUVsZW1lbnQoZWwpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghdGhpcy5pbml0aWFsU3RhdGUgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgIT09IGVsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHNlbGYuc3VyZmFjZS5yZWFkU2VsZWN0aW9uKHNlbGYpO1xuICBzZWxmLnNjcm9sbFRvcCA9IGVsLnNjcm9sbFRvcDtcbiAgaWYgKCFzZWxmLnRleHQpIHtcbiAgICBzZWxmLnRleHQgPSBzZWxmLnN1cmZhY2UucmVhZChzZWxmLm1vZGUpO1xuICB9XG59O1xuXG5JbnB1dFN0YXRlLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGVsID0gc2VsZi5zdXJmYWNlLmN1cnJlbnQoc2VsZi5tb2RlKTtcbiAgaWYgKCFpc1Zpc2libGVFbGVtZW50KGVsKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBzZWxmLnN1cmZhY2Uud3JpdGVTZWxlY3Rpb24oc2VsZik7XG59O1xuXG5JbnB1dFN0YXRlLnByb3RvdHlwZS5yZXN0b3JlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBlbCA9IHNlbGYuc3VyZmFjZS5jdXJyZW50KHNlbGYubW9kZSk7XG4gIGlmICh0eXBlb2Ygc2VsZi50ZXh0ID09PSAnc3RyaW5nJyAmJiBzZWxmLnRleHQgIT09IHNlbGYuc3VyZmFjZS5yZWFkKHNlbGYubW9kZSkpIHtcbiAgICBzZWxmLnN1cmZhY2Uud3JpdGUoc2VsZi5tb2RlLCBzZWxmLnRleHQpO1xuICB9XG4gIHNlbGYuc2VsZWN0KCk7XG4gIGVsLnNjcm9sbFRvcCA9IHNlbGYuc2Nyb2xsVG9wO1xufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuZ2V0Q2h1bmtzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBjaHVuayA9IG5ldyBjaHVua3Nbc2VsZi5tb2RlXSgpO1xuICBjaHVuay5iZWZvcmUgPSBmaXhFT0woc2VsZi50ZXh0LnN1YnN0cmluZygwLCBzZWxmLnN0YXJ0KSk7XG4gIGNodW5rLnN0YXJ0VGFnID0gJyc7XG4gIGNodW5rLnNlbGVjdGlvbiA9IGZpeEVPTChzZWxmLnRleHQuc3Vic3RyaW5nKHNlbGYuc3RhcnQsIHNlbGYuZW5kKSk7XG4gIGNodW5rLmVuZFRhZyA9ICcnO1xuICBjaHVuay5hZnRlciA9IGZpeEVPTChzZWxmLnRleHQuc3Vic3RyaW5nKHNlbGYuZW5kKSk7XG4gIGNodW5rLnNjcm9sbFRvcCA9IHNlbGYuc2Nyb2xsVG9wO1xuICBzZWxmLmNhY2hlZENodW5rcyA9IGNodW5rO1xuICByZXR1cm4gY2h1bms7XG59O1xuXG5JbnB1dFN0YXRlLnByb3RvdHlwZS5zZXRDaHVua3MgPSBmdW5jdGlvbiAoY2h1bmspIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBjaHVuay5iZWZvcmUgPSBjaHVuay5iZWZvcmUgKyBjaHVuay5zdGFydFRhZztcbiAgY2h1bmsuYWZ0ZXIgPSBjaHVuay5lbmRUYWcgKyBjaHVuay5hZnRlcjtcbiAgc2VsZi5zdGFydCA9IGNodW5rLmJlZm9yZS5sZW5ndGg7XG4gIHNlbGYuZW5kID0gY2h1bmsuYmVmb3JlLmxlbmd0aCArIGNodW5rLnNlbGVjdGlvbi5sZW5ndGg7XG4gIHNlbGYudGV4dCA9IGNodW5rLmJlZm9yZSArIGNodW5rLnNlbGVjdGlvbiArIGNodW5rLmFmdGVyO1xuICBzZWxmLnNjcm9sbFRvcCA9IGNodW5rLnNjcm9sbFRvcDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRTdGF0ZTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5SmJuQjFkRk4wWVhSbExtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJrYjJNZ1BTQm5iRzlpWVd3dVpHOWpkVzFsYm5RN1hHNTJZWElnYVhOV2FYTnBZbXhsUld4bGJXVnVkQ0E5SUhKbGNYVnBjbVVvSnk0dmFYTldhWE5wWW14bFJXeGxiV1Z1ZENjcE8xeHVkbUZ5SUdacGVFVlBUQ0E5SUhKbGNYVnBjbVVvSnk0dlptbDRSVTlNSnlrN1hHNTJZWElnVFdGeWEyUnZkMjVEYUhWdWEzTWdQU0J5WlhGMWFYSmxLQ2N1TDIxaGNtdGtiM2R1TDAxaGNtdGtiM2R1UTJoMWJtdHpKeWs3WEc1MllYSWdTSFJ0YkVOb2RXNXJjeUE5SUhKbGNYVnBjbVVvSnk0dmFIUnRiQzlJZEcxc1EyaDFibXR6SnlrN1hHNTJZWElnWTJoMWJtdHpJRDBnZTF4dUlDQnRZWEpyWkc5M2Jqb2dUV0Z5YTJSdmQyNURhSFZ1YTNNc1hHNGdJR2gwYld3NklFaDBiV3hEYUhWdWEzTXNYRzRnSUhkNWMybDNlV2M2SUVoMGJXeERhSFZ1YTNOY2JuMDdYRzVjYm1aMWJtTjBhVzl1SUVsdWNIVjBVM1JoZEdVZ0tITjFjbVpoWTJVc0lHMXZaR1VzSUdsdWFYUnBZV3hUZEdGMFpTa2dlMXh1SUNCMGFHbHpMbTF2WkdVZ1BTQnRiMlJsTzF4dUlDQjBhR2x6TG5OMWNtWmhZMlVnUFNCemRYSm1ZV05sTzF4dUlDQjBhR2x6TG1sdWFYUnBZV3hUZEdGMFpTQTlJR2x1YVhScFlXeFRkR0YwWlNCOGZDQm1ZV3h6WlR0Y2JpQWdkR2hwY3k1cGJtbDBLQ2s3WEc1OVhHNWNia2x1Y0hWMFUzUmhkR1V1Y0hKdmRHOTBlWEJsTG1sdWFYUWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJSFpoY2lCelpXeG1JRDBnZEdocGN6dGNiaUFnZG1GeUlHVnNJRDBnYzJWc1ppNXpkWEptWVdObExtTjFjbkpsYm5Rb2MyVnNaaTV0YjJSbEtUdGNiaUFnYVdZZ0tDRnBjMVpwYzJsaWJHVkZiR1Z0Wlc1MEtHVnNLU2tnZTF4dUlDQWdJSEpsZEhWeWJqdGNiaUFnZlZ4dUlDQnBaaUFvSVhSb2FYTXVhVzVwZEdsaGJGTjBZWFJsSUNZbUlHUnZZeTVoWTNScGRtVkZiR1Z0Wlc1MElDWW1JR1J2WXk1aFkzUnBkbVZGYkdWdFpXNTBJQ0U5UFNCbGJDa2dlMXh1SUNBZ0lISmxkSFZ5Ymp0Y2JpQWdmVnh1SUNCelpXeG1Mbk4xY21aaFkyVXVjbVZoWkZObGJHVmpkR2x2YmloelpXeG1LVHRjYmlBZ2MyVnNaaTV6WTNKdmJHeFViM0FnUFNCbGJDNXpZM0p2Ykd4VWIzQTdYRzRnSUdsbUlDZ2hjMlZzWmk1MFpYaDBLU0I3WEc0Z0lDQWdjMlZzWmk1MFpYaDBJRDBnYzJWc1ppNXpkWEptWVdObExuSmxZV1FvYzJWc1ppNXRiMlJsS1R0Y2JpQWdmVnh1ZlR0Y2JseHVTVzV3ZFhSVGRHRjBaUzV3Y205MGIzUjVjR1V1YzJWc1pXTjBJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0IyWVhJZ2MyVnNaaUE5SUhSb2FYTTdYRzRnSUhaaGNpQmxiQ0E5SUhObGJHWXVjM1Z5Wm1GalpTNWpkWEp5Wlc1MEtITmxiR1l1Ylc5a1pTazdYRzRnSUdsbUlDZ2hhWE5XYVhOcFlteGxSV3hsYldWdWRDaGxiQ2twSUh0Y2JpQWdJQ0J5WlhSMWNtNDdYRzRnSUgxY2JpQWdjMlZzWmk1emRYSm1ZV05sTG5keWFYUmxVMlZzWldOMGFXOXVLSE5sYkdZcE8xeHVmVHRjYmx4dVNXNXdkWFJUZEdGMFpTNXdjbTkwYjNSNWNHVXVjbVZ6ZEc5eVpTQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdkbUZ5SUhObGJHWWdQU0IwYUdsek8xeHVJQ0IyWVhJZ1pXd2dQU0J6Wld4bUxuTjFjbVpoWTJVdVkzVnljbVZ1ZENoelpXeG1MbTF2WkdVcE8xeHVJQ0JwWmlBb2RIbHdaVzltSUhObGJHWXVkR1Y0ZENBOVBUMGdKM04wY21sdVp5Y2dKaVlnYzJWc1ppNTBaWGgwSUNFOVBTQnpaV3htTG5OMWNtWmhZMlV1Y21WaFpDaHpaV3htTG0xdlpHVXBLU0I3WEc0Z0lDQWdjMlZzWmk1emRYSm1ZV05sTG5keWFYUmxLSE5sYkdZdWJXOWtaU3dnYzJWc1ppNTBaWGgwS1R0Y2JpQWdmVnh1SUNCelpXeG1Mbk5sYkdWamRDZ3BPMXh1SUNCbGJDNXpZM0p2Ykd4VWIzQWdQU0J6Wld4bUxuTmpjbTlzYkZSdmNEdGNibjA3WEc1Y2JrbHVjSFYwVTNSaGRHVXVjSEp2ZEc5MGVYQmxMbWRsZEVOb2RXNXJjeUE5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnZG1GeUlITmxiR1lnUFNCMGFHbHpPMXh1SUNCMllYSWdZMmgxYm1zZ1BTQnVaWGNnWTJoMWJtdHpXM05sYkdZdWJXOWtaVjBvS1R0Y2JpQWdZMmgxYm1zdVltVm1iM0psSUQwZ1ptbDRSVTlNS0hObGJHWXVkR1Y0ZEM1emRXSnpkSEpwYm1jb01Dd2djMlZzWmk1emRHRnlkQ2twTzF4dUlDQmphSFZ1YXk1emRHRnlkRlJoWnlBOUlDY25PMXh1SUNCamFIVnVheTV6Wld4bFkzUnBiMjRnUFNCbWFYaEZUMHdvYzJWc1ppNTBaWGgwTG5OMVluTjBjbWx1WnloelpXeG1Mbk4wWVhKMExDQnpaV3htTG1WdVpDa3BPMXh1SUNCamFIVnVheTVsYm1SVVlXY2dQU0FuSnp0Y2JpQWdZMmgxYm1zdVlXWjBaWElnUFNCbWFYaEZUMHdvYzJWc1ppNTBaWGgwTG5OMVluTjBjbWx1WnloelpXeG1MbVZ1WkNrcE8xeHVJQ0JqYUhWdWF5NXpZM0p2Ykd4VWIzQWdQU0J6Wld4bUxuTmpjbTlzYkZSdmNEdGNiaUFnYzJWc1ppNWpZV05vWldSRGFIVnVhM01nUFNCamFIVnVhenRjYmlBZ2NtVjBkWEp1SUdOb2RXNXJPMXh1ZlR0Y2JseHVTVzV3ZFhSVGRHRjBaUzV3Y205MGIzUjVjR1V1YzJWMFEyaDFibXR6SUQwZ1puVnVZM1JwYjI0Z0tHTm9kVzVyS1NCN1hHNGdJSFpoY2lCelpXeG1JRDBnZEdocGN6dGNiaUFnWTJoMWJtc3VZbVZtYjNKbElEMGdZMmgxYm1zdVltVm1iM0psSUNzZ1kyaDFibXN1YzNSaGNuUlVZV2M3WEc0Z0lHTm9kVzVyTG1GbWRHVnlJRDBnWTJoMWJtc3VaVzVrVkdGbklDc2dZMmgxYm1zdVlXWjBaWEk3WEc0Z0lITmxiR1l1YzNSaGNuUWdQU0JqYUhWdWF5NWlaV1p2Y21VdWJHVnVaM1JvTzF4dUlDQnpaV3htTG1WdVpDQTlJR05vZFc1ckxtSmxabTl5WlM1c1pXNW5kR2dnS3lCamFIVnVheTV6Wld4bFkzUnBiMjR1YkdWdVozUm9PMXh1SUNCelpXeG1MblJsZUhRZ1BTQmphSFZ1YXk1aVpXWnZjbVVnS3lCamFIVnVheTV6Wld4bFkzUnBiMjRnS3lCamFIVnVheTVoWm5SbGNqdGNiaUFnYzJWc1ppNXpZM0p2Ykd4VWIzQWdQU0JqYUhWdWF5NXpZM0p2Ykd4VWIzQTdYRzU5TzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlFbHVjSFYwVTNSaGRHVTdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGNvbW1hbmRzID0ge1xuICBtYXJrZG93bjoge1xuICAgIGJvbGRPckl0YWxpYzogcmVxdWlyZSgnLi9tYXJrZG93bi9ib2xkT3JJdGFsaWMnKSxcbiAgICBsaW5rT3JJbWFnZU9yQXR0YWNobWVudDogcmVxdWlyZSgnLi9tYXJrZG93bi9saW5rT3JJbWFnZU9yQXR0YWNobWVudCcpLFxuICAgIGJsb2NrcXVvdGU6IHJlcXVpcmUoJy4vbWFya2Rvd24vYmxvY2txdW90ZScpLFxuICAgIGNvZGVibG9jazogcmVxdWlyZSgnLi9tYXJrZG93bi9jb2RlYmxvY2snKSxcbiAgICBoZWFkaW5nOiByZXF1aXJlKCcuL21hcmtkb3duL2hlYWRpbmcnKSxcbiAgICBsaXN0OiByZXF1aXJlKCcuL21hcmtkb3duL2xpc3QnKSxcbiAgICBocjogcmVxdWlyZSgnLi9tYXJrZG93bi9ocicpXG4gIH0sXG4gIGh0bWw6IHtcbiAgICBib2xkT3JJdGFsaWM6IHJlcXVpcmUoJy4vaHRtbC9ib2xkT3JJdGFsaWMnKSxcbiAgICBsaW5rT3JJbWFnZU9yQXR0YWNobWVudDogcmVxdWlyZSgnLi9odG1sL2xpbmtPckltYWdlT3JBdHRhY2htZW50JyksXG4gICAgYmxvY2txdW90ZTogcmVxdWlyZSgnLi9odG1sL2Jsb2NrcXVvdGUnKSxcbiAgICBjb2RlYmxvY2s6IHJlcXVpcmUoJy4vaHRtbC9jb2RlYmxvY2snKSxcbiAgICBoZWFkaW5nOiByZXF1aXJlKCcuL2h0bWwvaGVhZGluZycpLFxuICAgIGxpc3Q6IHJlcXVpcmUoJy4vaHRtbC9saXN0JyksXG4gICAgaHI6IHJlcXVpcmUoJy4vaHRtbC9ocicpXG4gIH1cbn07XG5cbmNvbW1hbmRzLnd5c2l3eWcgPSBjb21tYW5kcy5odG1sO1xuXG5mdW5jdGlvbiBiaW5kQ29tbWFuZHMgKHN1cmZhY2UsIG9wdGlvbnMsIGVkaXRvcikge1xuICBiaW5kKCdib2xkJywgJ2NtZCtiJywgYm9sZCk7XG4gIGJpbmQoJ2l0YWxpYycsICdjbWQraScsIGl0YWxpYyk7XG4gIGJpbmQoJ3F1b3RlJywgJ2NtZCtqJywgcm91dGVyKCdibG9ja3F1b3RlJykpO1xuICBiaW5kKCdjb2RlJywgJ2NtZCtlJywgY29kZSk7XG4gIGJpbmQoJ29sJywgJ2NtZCtvJywgb2wpO1xuICBiaW5kKCd1bCcsICdjbWQrdScsIHVsKTtcbiAgYmluZCgnaGVhZGluZycsICdjbWQrZCcsIHJvdXRlcignaGVhZGluZycpKTtcbiAgZWRpdG9yLnNob3dMaW5rRGlhbG9nID0gZmFicmljYXRvcihiaW5kKCdsaW5rJywgJ2NtZCtrJywgbGlua09ySW1hZ2VPckF0dGFjaG1lbnQoJ2xpbmsnKSkpO1xuICBlZGl0b3Iuc2hvd0ltYWdlRGlhbG9nID0gZmFicmljYXRvcihiaW5kKCdpbWFnZScsICdjbWQrZycsIGxpbmtPckltYWdlT3JBdHRhY2htZW50KCdpbWFnZScpKSk7XG4gIGVkaXRvci5saW5rT3JJbWFnZU9yQXR0YWNobWVudCA9IGxpbmtPckltYWdlT3JBdHRhY2htZW50O1xuXG4gIGlmIChvcHRpb25zLmF0dGFjaG1lbnRzKSB7XG4gICAgZWRpdG9yLnNob3dBdHRhY2htZW50RGlhbG9nID0gZmFicmljYXRvcihiaW5kKCdhdHRhY2htZW50JywgJ2NtZCtzaGlmdCtrJywgbGlua09ySW1hZ2VPckF0dGFjaG1lbnQoJ2F0dGFjaG1lbnQnKSkpO1xuICB9XG4gIGlmIChvcHRpb25zLmhyKSB7IGJpbmQoJ2hyJywgJ2NtZCtuJywgcm91dGVyKCdocicpKTsgfVxuXG4gIGZ1bmN0aW9uIGZhYnJpY2F0b3IgKGVsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG9wZW4gKCkge1xuICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShlbCwgJ2NsaWNrJyk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBib2xkIChtb2RlLCBjaHVua3MpIHtcbiAgICBjb21tYW5kc1ttb2RlXS5ib2xkT3JJdGFsaWMoY2h1bmtzLCAnYm9sZCcpO1xuICB9XG4gIGZ1bmN0aW9uIGl0YWxpYyAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0uYm9sZE9ySXRhbGljKGNodW5rcywgJ2l0YWxpYycpO1xuICB9XG4gIGZ1bmN0aW9uIGNvZGUgKG1vZGUsIGNodW5rcykge1xuICAgIGNvbW1hbmRzW21vZGVdLmNvZGVibG9jayhjaHVua3MsIHsgZmVuY2luZzogb3B0aW9ucy5mZW5jaW5nIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHVsIChtb2RlLCBjaHVua3MpIHtcbiAgICBjb21tYW5kc1ttb2RlXS5saXN0KGNodW5rcywgZmFsc2UpO1xuICB9XG4gIGZ1bmN0aW9uIG9sIChtb2RlLCBjaHVua3MpIHtcbiAgICBjb21tYW5kc1ttb2RlXS5saXN0KGNodW5rcywgdHJ1ZSk7XG4gIH1cbiAgZnVuY3Rpb24gbGlua09ySW1hZ2VPckF0dGFjaG1lbnQgKHR5cGUsIGF1dG9VcGxvYWQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbGlua09ySW1hZ2VPckF0dGFjaG1lbnRJbnZva2UgKG1vZGUsIGNodW5rcykge1xuICAgICAgY29tbWFuZHNbbW9kZV0ubGlua09ySW1hZ2VPckF0dGFjaG1lbnQuY2FsbCh0aGlzLCBjaHVua3MsIHtcbiAgICAgICAgZWRpdG9yOiBlZGl0b3IsXG4gICAgICAgIG1vZGU6IG1vZGUsXG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIHN1cmZhY2U6IHN1cmZhY2UsXG4gICAgICAgIHByb21wdHM6IG9wdGlvbnMucHJvbXB0cyxcbiAgICAgICAgdXBsb2FkOiBvcHRpb25zW3R5cGUgKyAncyddLFxuICAgICAgICBjbGFzc2VzOiBvcHRpb25zLmNsYXNzZXMsXG4gICAgICAgIG1lcmdlSHRtbEFuZEF0dGFjaG1lbnQ6IG9wdGlvbnMubWVyZ2VIdG1sQW5kQXR0YWNobWVudCxcbiAgICAgICAgYXV0b1VwbG9hZDogYXV0b1VwbG9hZFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBiaW5kIChpZCwgY29tYm8sIGZuKSB7XG4gICAgcmV0dXJuIGVkaXRvci5hZGRDb21tYW5kQnV0dG9uKGlkLCBjb21ibywgc3VwcHJlc3MoZm4pKTtcbiAgfVxuICBmdW5jdGlvbiByb3V0ZXIgKG1ldGhvZCkge1xuICAgIHJldHVybiBmdW5jdGlvbiByb3V0ZWQgKG1vZGUsIGNodW5rcykgeyBjb21tYW5kc1ttb2RlXVttZXRob2RdLmNhbGwodGhpcywgY2h1bmtzKTsgfTtcbiAgfVxuICBmdW5jdGlvbiBzdG9wIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG4gIGZ1bmN0aW9uIHN1cHByZXNzIChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiBzdXBwcmVzc29yIChlLCBtb2RlLCBjaHVua3MpIHsgc3RvcChlKTsgZm4uY2FsbCh0aGlzLCBtb2RlLCBjaHVua3MpOyB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZENvbW1hbmRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjYXN0IChjb2xsZWN0aW9uKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGk7XG4gIHZhciBsZW4gPSBjb2xsZWN0aW9uLmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgcmVzdWx0LnB1c2goY29sbGVjdGlvbltpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYXN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmlucHV0ID0gL15cXHMqKC4qPykoPzpcXHMrXCIoLispXCIpP1xccyokLztcbnZhciByZnVsbCA9IC9eKD86aHR0cHM/fGZ0cCk6XFwvXFwvLztcblxuZnVuY3Rpb24gcGFyc2VMaW5rSW5wdXQgKGlucHV0KSB7XG4gIHJldHVybiBwYXJzZXIuYXBwbHkobnVsbCwgaW5wdXQubWF0Y2gocmlucHV0KSk7XG5cbiAgZnVuY3Rpb24gcGFyc2VyIChhbGwsIGxpbmssIHRpdGxlKSB7XG4gICAgdmFyIGhyZWYgPSBsaW5rLnJlcGxhY2UoL1xcPy4qJC8sIHF1ZXJ5VW5lbmNvZGVkUmVwbGFjZXIpO1xuICAgIGhyZWYgPSBkZWNvZGVVUklDb21wb25lbnQoaHJlZik7XG4gICAgaHJlZiA9IGVuY29kZVVSSShocmVmKS5yZXBsYWNlKC8nL2csICclMjcnKS5yZXBsYWNlKC9cXCgvZywgJyUyOCcpLnJlcGxhY2UoL1xcKS9nLCAnJTI5Jyk7XG4gICAgaHJlZiA9IGhyZWYucmVwbGFjZSgvXFw/LiokLywgcXVlcnlFbmNvZGVkUmVwbGFjZXIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhyZWY6IGZvcm1hdEhyZWYoaHJlZiksIHRpdGxlOiBmb3JtYXRUaXRsZSh0aXRsZSlcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5VW5lbmNvZGVkUmVwbGFjZXIgKHF1ZXJ5KSB7XG4gIHJldHVybiBxdWVyeS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbn1cblxuZnVuY3Rpb24gcXVlcnlFbmNvZGVkUmVwbGFjZXIgKHF1ZXJ5KSB7XG4gIHJldHVybiBxdWVyeS5yZXBsYWNlKC9cXCsvZywgJyUyYicpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUaXRsZSAodGl0bGUpIHtcbiAgaWYgKCF0aXRsZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHRpdGxlXG4gICAgLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0SHJlZiAodXJsKSB7XG4gIHZhciBocmVmID0gdXJsLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgaWYgKGhyZWYubGVuZ3RoICYmIGhyZWZbMF0gIT09ICcvJyAmJiAhcmZ1bGwudGVzdChocmVmKSkge1xuICAgIHJldHVybiAnaHR0cDovLycgKyBocmVmO1xuICB9XG4gIHJldHVybiBocmVmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlTGlua0lucHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB0cmltIChyZW1vdmUpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmIChyZW1vdmUpIHtcbiAgICBiZWZvcmVSZXBsYWNlciA9IGFmdGVyUmVwbGFjZXIgPSAnJztcbiAgfVxuICBzZWxmLnNlbGVjdGlvbiA9IHNlbGYuc2VsZWN0aW9uLnJlcGxhY2UoL14oXFxzKikvLCBiZWZvcmVSZXBsYWNlcikucmVwbGFjZSgvKFxccyopJC8sIGFmdGVyUmVwbGFjZXIpO1xuXG4gIGZ1bmN0aW9uIGJlZm9yZVJlcGxhY2VyICh0ZXh0KSB7XG4gICAgc2VsZi5iZWZvcmUgKz0gdGV4dDsgcmV0dXJuICcnO1xuICB9XG4gIGZ1bmN0aW9uIGFmdGVyUmVwbGFjZXIgKHRleHQpIHtcbiAgICBzZWxmLmFmdGVyID0gdGV4dCArIHNlbGYuYWZ0ZXI7IHJldHVybiAnJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBydHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xudmFyIHJzcGFjZXMgPSAvXFxzKy9nO1xuXG5mdW5jdGlvbiBhZGRDbGFzcyAoZWwsIGNscykge1xuICB2YXIgY3VycmVudCA9IGVsLmNsYXNzTmFtZTtcbiAgaWYgKGN1cnJlbnQuaW5kZXhPZihjbHMpID09PSAtMSkge1xuICAgIGVsLmNsYXNzTmFtZSA9IChjdXJyZW50ICsgJyAnICsgY2xzKS5yZXBsYWNlKHJ0cmltLCAnJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm1DbGFzcyAoZWwsIGNscykge1xuICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShjbHMsICcnKS5yZXBsYWNlKHJ0cmltLCAnJykucmVwbGFjZShyc3BhY2VzLCAnICcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRDbGFzcyxcbiAgcm06IHJtQ2xhc3Ncbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGV4dGVuZFJlZ0V4cCAocmVnZXgsIHByZSwgcG9zdCkge1xuICB2YXIgcGF0dGVybiA9IHJlZ2V4LnRvU3RyaW5nKCk7XG4gIHZhciBmbGFncztcblxuICBwYXR0ZXJuID0gcGF0dGVybi5yZXBsYWNlKC9cXC8oW2dpbV0qKSQvLCBjYXB0dXJlRmxhZ3MpO1xuICBwYXR0ZXJuID0gcGF0dGVybi5yZXBsYWNlKC8oXlxcL3xcXC8kKS9nLCAnJyk7XG4gIHBhdHRlcm4gPSBwcmUgKyBwYXR0ZXJuICsgcG9zdDtcbiAgcmV0dXJuIG5ldyBSZWdFeHAocGF0dGVybiwgZmxhZ3MpO1xuXG4gIGZ1bmN0aW9uIGNhcHR1cmVGbGFncyAoYWxsLCBmKSB7XG4gICAgZmxhZ3MgPSBmO1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFJlZ0V4cDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZml4RU9MICh0ZXh0KSB7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJykucmVwbGFjZSgvXFxyL2csICdcXG4nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaXhFT0w7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBJbnB1dFN0YXRlID0gcmVxdWlyZSgnLi9JbnB1dFN0YXRlJyk7XG5cbmZ1bmN0aW9uIGdldENvbW1hbmRIYW5kbGVyIChzdXJmYWNlLCBoaXN0b3J5LCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlQ29tbWFuZCAoZSkge1xuICAgIHN1cmZhY2UuZm9jdXMoaGlzdG9yeS5pbnB1dE1vZGUpO1xuICAgIGhpc3Rvcnkuc2V0Q29tbWFuZE1vZGUoKTtcblxuICAgIHZhciBzdGF0ZSA9IG5ldyBJbnB1dFN0YXRlKHN1cmZhY2UsIGhpc3RvcnkuaW5wdXRNb2RlKTtcbiAgICB2YXIgY2h1bmtzID0gc3RhdGUuZ2V0Q2h1bmtzKCk7XG4gICAgdmFyIGFzeW5jSGFuZGxlciA9IHtcbiAgICAgIGFzeW5jOiBhc3luYywgaW1tZWRpYXRlOiB0cnVlXG4gICAgfTtcblxuICAgIGZuLmNhbGwoYXN5bmNIYW5kbGVyLCBlLCBoaXN0b3J5LmlucHV0TW9kZSwgY2h1bmtzKTtcblxuICAgIGlmIChhc3luY0hhbmRsZXIuaW1tZWRpYXRlKSB7XG4gICAgICBkb25lKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXN5bmMgKCkge1xuICAgICAgYXN5bmNIYW5kbGVyLmltbWVkaWF0ZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGRvbmU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9uZSAoKSB7XG4gICAgICBzdXJmYWNlLmZvY3VzKGhpc3RvcnkuaW5wdXRNb2RlKTtcbiAgICAgIHN0YXRlLnNldENodW5rcyhjaHVua3MpO1xuICAgICAgc3RhdGUucmVzdG9yZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRDb21tYW5kSGFuZGxlcjtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBzZWxlY2Npb24gPSByZXF1aXJlKCdzZWxlY2Npb24nKTtcbnZhciBmaXhFT0wgPSByZXF1aXJlKCcuL2ZpeEVPTCcpO1xudmFyIG1hbnkgPSByZXF1aXJlKCcuL21hbnknKTtcbnZhciBjYXN0ID0gcmVxdWlyZSgnLi9jYXN0Jyk7XG52YXIgZ2V0U2VsZWN0aW9uID0gc2VsZWNjaW9uLmdldDtcbnZhciBzZXRTZWxlY3Rpb24gPSBzZWxlY2Npb24uc2V0O1xudmFyIHJvcGVuID0gL14oPFtePl0rKD86IFtePl0qKT8+KS87XG52YXIgcmNsb3NlID0gLyg8XFwvW14+XSs+KSQvO1xuXG5mdW5jdGlvbiBzdXJmYWNlICh0ZXh0YXJlYSwgZWRpdGFibGUsIGRyb3BhcmVhKSB7XG4gIHJldHVybiB7XG4gICAgdGV4dGFyZWE6IHRleHRhcmVhLFxuICAgIGVkaXRhYmxlOiBlZGl0YWJsZSxcbiAgICBkcm9wYXJlYTogZHJvcGFyZWEsXG4gICAgZm9jdXM6IHNldEZvY3VzLFxuICAgIHJlYWQ6IHJlYWQsXG4gICAgd3JpdGU6IHdyaXRlLFxuICAgIGN1cnJlbnQ6IGN1cnJlbnQsXG4gICAgd3JpdGVTZWxlY3Rpb246IHdyaXRlU2VsZWN0aW9uLFxuICAgIHJlYWRTZWxlY3Rpb246IHJlYWRTZWxlY3Rpb25cbiAgfTtcblxuICBmdW5jdGlvbiBzZXRGb2N1cyAobW9kZSkge1xuICAgIGN1cnJlbnQobW9kZSkuZm9jdXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGN1cnJlbnQgKG1vZGUpIHtcbiAgICByZXR1cm4gbW9kZSA9PT0gJ3d5c2l3eWcnID8gZWRpdGFibGUgOiB0ZXh0YXJlYTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKG1vZGUpIHtcbiAgICBpZiAobW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICByZXR1cm4gZWRpdGFibGUuaW5uZXJIVE1MO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dGFyZWEudmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZSAobW9kZSwgdmFsdWUpIHtcbiAgICBpZiAobW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGV4dGFyZWEudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZVNlbGVjdGlvbiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUubW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICB3cml0ZVNlbGVjdGlvbkVkaXRhYmxlKHN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JpdGVTZWxlY3Rpb25UZXh0YXJlYShzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFNlbGVjdGlvbiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUubW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICByZWFkU2VsZWN0aW9uRWRpdGFibGUoc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFkU2VsZWN0aW9uVGV4dGFyZWEoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlU2VsZWN0aW9uVGV4dGFyZWEgKHN0YXRlKSB7XG4gICAgdmFyIHJhbmdlO1xuICAgIGlmICh0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydCAhPT0gdm9pZCAwKSB7XG4gICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgPSBzdGF0ZS5zdGFydDtcbiAgICAgIHRleHRhcmVhLnNlbGVjdGlvbkVuZCA9IHN0YXRlLmVuZDtcbiAgICAgIHRleHRhcmVhLnNjcm9sbFRvcCA9IHN0YXRlLnNjcm9sbFRvcDtcbiAgICB9IGVsc2UgaWYgKGRvYy5zZWxlY3Rpb24pIHtcbiAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCAmJiBkb2MuYWN0aXZlRWxlbWVudCAhPT0gdGV4dGFyZWEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgIHJhbmdlID0gdGV4dGFyZWEuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC10ZXh0YXJlYS52YWx1ZS5sZW5ndGgpO1xuICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgLXRleHRhcmVhLnZhbHVlLmxlbmd0aCk7XG4gICAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBzdGF0ZS5lbmQpO1xuICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCBzdGF0ZS5zdGFydCk7XG4gICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU2VsZWN0aW9uVGV4dGFyZWEgKHN0YXRlKSB7XG4gICAgaWYgKHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ICE9PSB2b2lkIDApIHtcbiAgICAgIHN0YXRlLnN0YXJ0ID0gdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICBzdGF0ZS5lbmQgPSB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQ7XG4gICAgfSBlbHNlIGlmIChkb2Muc2VsZWN0aW9uKSB7XG4gICAgICBhbmNpZW50bHlSZWFkU2VsZWN0aW9uVGV4dGFyZWEoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFuY2llbnRseVJlYWRTZWxlY3Rpb25UZXh0YXJlYSAoc3RhdGUpIHtcbiAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgIT09IHRleHRhcmVhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RhdGUudGV4dCA9IGZpeEVPTCh0ZXh0YXJlYS52YWx1ZSk7XG5cbiAgICB2YXIgcmFuZ2UgPSBkb2Muc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgdmFyIGZpeGVkUmFuZ2UgPSBmaXhFT0wocmFuZ2UudGV4dCk7XG4gICAgdmFyIG1hcmtlciA9ICdcXHgwNyc7XG4gICAgdmFyIG1hcmtlZFJhbmdlID0gbWFya2VyICsgZml4ZWRSYW5nZSArIG1hcmtlcjtcblxuICAgIHJhbmdlLnRleHQgPSBtYXJrZWRSYW5nZTtcblxuICAgIHZhciBpbnB1dFRleHQgPSBmaXhFT0wodGV4dGFyZWEudmFsdWUpO1xuXG4gICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtbWFya2VkUmFuZ2UubGVuZ3RoKTtcbiAgICByYW5nZS50ZXh0ID0gZml4ZWRSYW5nZTtcbiAgICBzdGF0ZS5zdGFydCA9IGlucHV0VGV4dC5pbmRleE9mKG1hcmtlcik7XG4gICAgc3RhdGUuZW5kID0gaW5wdXRUZXh0Lmxhc3RJbmRleE9mKG1hcmtlcikgLSBtYXJrZXIubGVuZ3RoO1xuXG4gICAgdmFyIGRpZmYgPSBzdGF0ZS50ZXh0Lmxlbmd0aCAtIGZpeEVPTCh0ZXh0YXJlYS52YWx1ZSkubGVuZ3RoO1xuICAgIGlmIChkaWZmKSB7XG4gICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC1maXhlZFJhbmdlLmxlbmd0aCk7XG4gICAgICBmaXhlZFJhbmdlICs9IG1hbnkoJ1xcbicsIGRpZmYpO1xuICAgICAgc3RhdGUuZW5kICs9IGRpZmY7XG4gICAgICByYW5nZS50ZXh0ID0gZml4ZWRSYW5nZTtcbiAgICB9XG4gICAgc3RhdGUuc2VsZWN0KCk7XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZVNlbGVjdGlvbkVkaXRhYmxlIChzdGF0ZSkge1xuICAgIHZhciBjaHVua3MgPSBzdGF0ZS5jYWNoZWRDaHVua3MgfHwgc3RhdGUuZ2V0Q2h1bmtzKCk7XG4gICAgdmFyIHN0YXJ0ID0gY2h1bmtzLmJlZm9yZS5sZW5ndGg7XG4gICAgdmFyIGVuZCA9IHN0YXJ0ICsgY2h1bmtzLnNlbGVjdGlvbi5sZW5ndGg7XG4gICAgdmFyIHAgPSB7fTtcblxuICAgIHdhbGsoZWRpdGFibGUuZmlyc3RDaGlsZCwgcGVlayk7XG4gICAgZWRpdGFibGUuZm9jdXMoKTtcbiAgICBzZXRTZWxlY3Rpb24ocCk7XG5cbiAgICBmdW5jdGlvbiBwZWVrIChjb250ZXh0LCBlbCkge1xuICAgICAgdmFyIGN1cnNvciA9IGNvbnRleHQudGV4dC5sZW5ndGg7XG4gICAgICB2YXIgY29udGVudCA9IHJlYWROb2RlKGVsKS5sZW5ndGg7XG4gICAgICB2YXIgc3VtID0gY3Vyc29yICsgY29udGVudDtcbiAgICAgIGlmICghcC5zdGFydENvbnRhaW5lciAmJiBzdW0gPj0gc3RhcnQpIHtcbiAgICAgICAgcC5zdGFydENvbnRhaW5lciA9IGVsO1xuICAgICAgICBwLnN0YXJ0T2Zmc2V0ID0gYm91bmRlZChzdGFydCAtIGN1cnNvcik7XG4gICAgICB9XG4gICAgICBpZiAoIXAuZW5kQ29udGFpbmVyICYmIHN1bSA+PSBlbmQpIHtcbiAgICAgICAgcC5lbmRDb250YWluZXIgPSBlbDtcbiAgICAgICAgcC5lbmRPZmZzZXQgPSBib3VuZGVkKGVuZCAtIGN1cnNvcik7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGJvdW5kZWQgKG9mZnNldCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oY29udGVudCwgb2Zmc2V0KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFNlbGVjdGlvbkVkaXRhYmxlIChzdGF0ZSkge1xuICAgIHZhciBzZWwgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICB2YXIgZGlzdGFuY2UgPSB3YWxrKGVkaXRhYmxlLmZpcnN0Q2hpbGQsIHBlZWspO1xuICAgIHZhciBzdGFydCA9IGRpc3RhbmNlLnN0YXJ0IHx8IDA7XG4gICAgdmFyIGVuZCA9IGRpc3RhbmNlLmVuZCB8fCAwO1xuXG4gICAgc3RhdGUudGV4dCA9IGRpc3RhbmNlLnRleHQ7XG5cbiAgICBpZiAoZW5kID4gc3RhcnQpIHtcbiAgICAgIHN0YXRlLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICBzdGF0ZS5lbmQgPSBlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnN0YXJ0ID0gZW5kO1xuICAgICAgc3RhdGUuZW5kID0gc3RhcnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGVlayAoY29udGV4dCwgZWwpIHtcbiAgICAgIGlmIChlbCA9PT0gc2VsLmFuY2hvck5vZGUpIHtcbiAgICAgICAgY29udGV4dC5zdGFydCA9IGNvbnRleHQudGV4dC5sZW5ndGggKyBzZWwuYW5jaG9yT2Zmc2V0O1xuICAgICAgfVxuICAgICAgaWYgKGVsID09PSBzZWwuZm9jdXNOb2RlKSB7XG4gICAgICAgIGNvbnRleHQuZW5kID0gY29udGV4dC50ZXh0Lmxlbmd0aCArIHNlbC5mb2N1c09mZnNldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3YWxrIChlbCwgcGVlaywgY3R4LCBzaWJsaW5ncykge1xuICAgIHZhciBjb250ZXh0ID0gY3R4IHx8IHsgdGV4dDogJycgfTtcblxuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cblxuICAgIHZhciBlbE5vZGUgPSBlbC5ub2RlVHlwZSA9PT0gMTtcbiAgICB2YXIgdGV4dE5vZGUgPSBlbC5ub2RlVHlwZSA9PT0gMztcblxuICAgIHBlZWsoY29udGV4dCwgZWwpO1xuXG4gICAgaWYgKHRleHROb2RlKSB7XG4gICAgICBjb250ZXh0LnRleHQgKz0gcmVhZE5vZGUoZWwpO1xuICAgIH1cbiAgICBpZiAoZWxOb2RlKSB7XG4gICAgICBpZiAoZWwub3V0ZXJIVE1MLm1hdGNoKHJvcGVuKSkgeyBjb250ZXh0LnRleHQgKz0gUmVnRXhwLiQxOyB9XG4gICAgICBjYXN0KGVsLmNoaWxkTm9kZXMpLmZvckVhY2god2Fsa0NoaWxkcmVuKTtcbiAgICAgIGlmIChlbC5vdXRlckhUTUwubWF0Y2gocmNsb3NlKSkgeyBjb250ZXh0LnRleHQgKz0gUmVnRXhwLiQxOyB9XG4gICAgfVxuICAgIGlmIChzaWJsaW5ncyAhPT0gZmFsc2UgJiYgZWwubmV4dFNpYmxpbmcpIHtcbiAgICAgIHJldHVybiB3YWxrKGVsLm5leHRTaWJsaW5nLCBwZWVrLCBjb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG5cbiAgICBmdW5jdGlvbiB3YWxrQ2hpbGRyZW4gKGNoaWxkKSB7XG4gICAgICB3YWxrKGNoaWxkLCBwZWVrLCBjb250ZXh0LCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZE5vZGUgKGVsKSB7XG4gICAgcmV0dXJuIGVsLm5vZGVUeXBlID09PSAzID8gZml4RU9MKGVsLnRleHRDb250ZW50IHx8IGVsLmlubmVyVGV4dCB8fCAnJykgOiAnJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1cmZhY2U7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OW5aWFJUZFhKbVlXTmxMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ1pHOWpJRDBnWjJ4dlltRnNMbVJ2WTNWdFpXNTBPMXh1ZG1GeUlITmxiR1ZqWTJsdmJpQTlJSEpsY1hWcGNtVW9KM05sYkdWalkybHZiaWNwTzF4dWRtRnlJR1pwZUVWUFRDQTlJSEpsY1hWcGNtVW9KeTR2Wm1sNFJVOU1KeWs3WEc1MllYSWdiV0Z1ZVNBOUlISmxjWFZwY21Vb0p5NHZiV0Z1ZVNjcE8xeHVkbUZ5SUdOaGMzUWdQU0J5WlhGMWFYSmxLQ2N1TDJOaGMzUW5LVHRjYm5aaGNpQm5aWFJUWld4bFkzUnBiMjRnUFNCelpXeGxZMk5wYjI0dVoyVjBPMXh1ZG1GeUlITmxkRk5sYkdWamRHbHZiaUE5SUhObGJHVmpZMmx2Ymk1elpYUTdYRzUyWVhJZ2NtOXdaVzRnUFNBdlhpZzhXMTQrWFNzb1B6b2dXMTQrWFNvcFB6NHBMenRjYm5aaGNpQnlZMnh2YzJVZ1BTQXZLRHhjWEM5YlhqNWRLejRwSkM4N1hHNWNibVoxYm1OMGFXOXVJSE4xY21aaFkyVWdLSFJsZUhSaGNtVmhMQ0JsWkdsMFlXSnNaU3dnWkhKdmNHRnlaV0VwSUh0Y2JpQWdjbVYwZFhKdUlIdGNiaUFnSUNCMFpYaDBZWEpsWVRvZ2RHVjRkR0Z5WldFc1hHNGdJQ0FnWldScGRHRmliR1U2SUdWa2FYUmhZbXhsTEZ4dUlDQWdJR1J5YjNCaGNtVmhPaUJrY205d1lYSmxZU3hjYmlBZ0lDQm1iMk4xY3pvZ2MyVjBSbTlqZFhNc1hHNGdJQ0FnY21WaFpEb2djbVZoWkN4Y2JpQWdJQ0IzY21sMFpUb2dkM0pwZEdVc1hHNGdJQ0FnWTNWeWNtVnVkRG9nWTNWeWNtVnVkQ3hjYmlBZ0lDQjNjbWwwWlZObGJHVmpkR2x2YmpvZ2QzSnBkR1ZUWld4bFkzUnBiMjRzWEc0Z0lDQWdjbVZoWkZObGJHVmpkR2x2YmpvZ2NtVmhaRk5sYkdWamRHbHZibHh1SUNCOU8xeHVYRzRnSUdaMWJtTjBhVzl1SUhObGRFWnZZM1Z6SUNodGIyUmxLU0I3WEc0Z0lDQWdZM1Z5Y21WdWRDaHRiMlJsS1M1bWIyTjFjeWdwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1kzVnljbVZ1ZENBb2JXOWtaU2tnZTF4dUlDQWdJSEpsZEhWeWJpQnRiMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y2dQeUJsWkdsMFlXSnNaU0E2SUhSbGVIUmhjbVZoTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2NtVmhaQ0FvYlc5a1pTa2dlMXh1SUNBZ0lHbG1JQ2h0YjJSbElEMDlQU0FuZDNsemFYZDVaeWNwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJsWkdsMFlXSnNaUzVwYm01bGNraFVUVXc3WEc0Z0lDQWdmVnh1SUNBZ0lISmxkSFZ5YmlCMFpYaDBZWEpsWVM1MllXeDFaVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkeWFYUmxJQ2h0YjJSbExDQjJZV3gxWlNrZ2UxeHVJQ0FnSUdsbUlDaHRiMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y3BJSHRjYmlBZ0lDQWdJR1ZrYVhSaFlteGxMbWx1Ym1WeVNGUk5UQ0E5SUhaaGJIVmxPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCMFpYaDBZWEpsWVM1MllXeDFaU0E5SUhaaGJIVmxPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSGR5YVhSbFUyVnNaV04wYVc5dUlDaHpkR0YwWlNrZ2UxeHVJQ0FnSUdsbUlDaHpkR0YwWlM1dGIyUmxJRDA5UFNBbmQzbHphWGQ1WnljcElIdGNiaUFnSUNBZ0lIZHlhWFJsVTJWc1pXTjBhVzl1UldScGRHRmliR1VvYzNSaGRHVXBPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCM2NtbDBaVk5sYkdWamRHbHZibFJsZUhSaGNtVmhLSE4wWVhSbEtUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVTJWc1pXTjBhVzl1SUNoemRHRjBaU2tnZTF4dUlDQWdJR2xtSUNoemRHRjBaUzV0YjJSbElEMDlQU0FuZDNsemFYZDVaeWNwSUh0Y2JpQWdJQ0FnSUhKbFlXUlRaV3hsWTNScGIyNUZaR2wwWVdKc1pTaHpkR0YwWlNrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSEpsWVdSVFpXeGxZM1JwYjI1VVpYaDBZWEpsWVNoemRHRjBaU2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnZDNKcGRHVlRaV3hsWTNScGIyNVVaWGgwWVhKbFlTQW9jM1JoZEdVcElIdGNiaUFnSUNCMllYSWdjbUZ1WjJVN1hHNGdJQ0FnYVdZZ0tIUmxlSFJoY21WaExuTmxiR1ZqZEdsdmJsTjBZWEowSUNFOVBTQjJiMmxrSURBcElIdGNiaUFnSUNBZ0lIUmxlSFJoY21WaExtWnZZM1Z6S0NrN1hHNGdJQ0FnSUNCMFpYaDBZWEpsWVM1elpXeGxZM1JwYjI1VGRHRnlkQ0E5SUhOMFlYUmxMbk4wWVhKME8xeHVJQ0FnSUNBZ2RHVjRkR0Z5WldFdWMyVnNaV04wYVc5dVJXNWtJRDBnYzNSaGRHVXVaVzVrTzF4dUlDQWdJQ0FnZEdWNGRHRnlaV0V1YzJOeWIyeHNWRzl3SUQwZ2MzUmhkR1V1YzJOeWIyeHNWRzl3TzF4dUlDQWdJSDBnWld4elpTQnBaaUFvWkc5akxuTmxiR1ZqZEdsdmJpa2dlMXh1SUNBZ0lDQWdhV1lnS0dSdll5NWhZM1JwZG1WRmJHVnRaVzUwSUNZbUlHUnZZeTVoWTNScGRtVkZiR1Z0Wlc1MElDRTlQU0IwWlhoMFlYSmxZU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0IwWlhoMFlYSmxZUzVtYjJOMWN5Z3BPMXh1SUNBZ0lDQWdjbUZ1WjJVZ1BTQjBaWGgwWVhKbFlTNWpjbVZoZEdWVVpYaDBVbUZ1WjJVb0tUdGNiaUFnSUNBZ0lISmhibWRsTG0xdmRtVlRkR0Z5ZENnblkyaGhjbUZqZEdWeUp5d2dMWFJsZUhSaGNtVmhMblpoYkhWbExteGxibWQwYUNrN1hHNGdJQ0FnSUNCeVlXNW5aUzV0YjNabFJXNWtLQ2RqYUdGeVlXTjBaWEluTENBdGRHVjRkR0Z5WldFdWRtRnNkV1V1YkdWdVozUm9LVHRjYmlBZ0lDQWdJSEpoYm1kbExtMXZkbVZGYm1Rb0oyTm9ZWEpoWTNSbGNpY3NJSE4wWVhSbExtVnVaQ2s3WEc0Z0lDQWdJQ0J5WVc1blpTNXRiM1psVTNSaGNuUW9KMk5vWVhKaFkzUmxjaWNzSUhOMFlYUmxMbk4wWVhKMEtUdGNiaUFnSUNBZ0lISmhibWRsTG5ObGJHVmpkQ2dwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhKbFlXUlRaV3hsWTNScGIyNVVaWGgwWVhKbFlTQW9jM1JoZEdVcElIdGNiaUFnSUNCcFppQW9kR1Y0ZEdGeVpXRXVjMlZzWldOMGFXOXVVM1JoY25RZ0lUMDlJSFp2YVdRZ01Da2dlMXh1SUNBZ0lDQWdjM1JoZEdVdWMzUmhjblFnUFNCMFpYaDBZWEpsWVM1elpXeGxZM1JwYjI1VGRHRnlkRHRjYmlBZ0lDQWdJSE4wWVhSbExtVnVaQ0E5SUhSbGVIUmhjbVZoTG5ObGJHVmpkR2x2YmtWdVpEdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHUnZZeTV6Wld4bFkzUnBiMjRwSUh0Y2JpQWdJQ0FnSUdGdVkybGxiblJzZVZKbFlXUlRaV3hsWTNScGIyNVVaWGgwWVhKbFlTaHpkR0YwWlNrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1lXNWphV1Z1ZEd4NVVtVmhaRk5sYkdWamRHbHZibFJsZUhSaGNtVmhJQ2h6ZEdGMFpTa2dlMXh1SUNBZ0lHbG1JQ2hrYjJNdVlXTjBhWFpsUld4bGJXVnVkQ0FtSmlCa2IyTXVZV04wYVhabFJXeGxiV1Z1ZENBaFBUMGdkR1Y0ZEdGeVpXRXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNWNiaUFnSUNCemRHRjBaUzUwWlhoMElEMGdabWw0UlU5TUtIUmxlSFJoY21WaExuWmhiSFZsS1R0Y2JseHVJQ0FnSUhaaGNpQnlZVzVuWlNBOUlHUnZZeTV6Wld4bFkzUnBiMjR1WTNKbFlYUmxVbUZ1WjJVb0tUdGNiaUFnSUNCMllYSWdabWw0WldSU1lXNW5aU0E5SUdacGVFVlBUQ2h5WVc1blpTNTBaWGgwS1R0Y2JpQWdJQ0IyWVhJZ2JXRnlhMlZ5SUQwZ0oxeGNlREEzSnp0Y2JpQWdJQ0IyWVhJZ2JXRnlhMlZrVW1GdVoyVWdQU0J0WVhKclpYSWdLeUJtYVhobFpGSmhibWRsSUNzZ2JXRnlhMlZ5TzF4dVhHNGdJQ0FnY21GdVoyVXVkR1Y0ZENBOUlHMWhjbXRsWkZKaGJtZGxPMXh1WEc0Z0lDQWdkbUZ5SUdsdWNIVjBWR1Y0ZENBOUlHWnBlRVZQVENoMFpYaDBZWEpsWVM1MllXeDFaU2s3WEc1Y2JpQWdJQ0J5WVc1blpTNXRiM1psVTNSaGNuUW9KMk5vWVhKaFkzUmxjaWNzSUMxdFlYSnJaV1JTWVc1blpTNXNaVzVuZEdncE8xeHVJQ0FnSUhKaGJtZGxMblJsZUhRZ1BTQm1hWGhsWkZKaGJtZGxPMXh1SUNBZ0lITjBZWFJsTG5OMFlYSjBJRDBnYVc1d2RYUlVaWGgwTG1sdVpHVjRUMllvYldGeWEyVnlLVHRjYmlBZ0lDQnpkR0YwWlM1bGJtUWdQU0JwYm5CMWRGUmxlSFF1YkdGemRFbHVaR1Y0VDJZb2JXRnlhMlZ5S1NBdElHMWhjbXRsY2k1c1pXNW5kR2c3WEc1Y2JpQWdJQ0IyWVhJZ1pHbG1aaUE5SUhOMFlYUmxMblJsZUhRdWJHVnVaM1JvSUMwZ1ptbDRSVTlNS0hSbGVIUmhjbVZoTG5aaGJIVmxLUzVzWlc1bmRHZzdYRzRnSUNBZ2FXWWdLR1JwWm1ZcElIdGNiaUFnSUNBZ0lISmhibWRsTG0xdmRtVlRkR0Z5ZENnblkyaGhjbUZqZEdWeUp5d2dMV1pwZUdWa1VtRnVaMlV1YkdWdVozUm9LVHRjYmlBZ0lDQWdJR1pwZUdWa1VtRnVaMlVnS3owZ2JXRnVlU2duWEZ4dUp5d2daR2xtWmlrN1hHNGdJQ0FnSUNCemRHRjBaUzVsYm1RZ0t6MGdaR2xtWmp0Y2JpQWdJQ0FnSUhKaGJtZGxMblJsZUhRZ1BTQm1hWGhsWkZKaGJtZGxPMXh1SUNBZ0lIMWNiaUFnSUNCemRHRjBaUzV6Wld4bFkzUW9LVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkeWFYUmxVMlZzWldOMGFXOXVSV1JwZEdGaWJHVWdLSE4wWVhSbEtTQjdYRzRnSUNBZ2RtRnlJR05vZFc1cmN5QTlJSE4wWVhSbExtTmhZMmhsWkVOb2RXNXJjeUI4ZkNCemRHRjBaUzVuWlhSRGFIVnVhM01vS1R0Y2JpQWdJQ0IyWVhJZ2MzUmhjblFnUFNCamFIVnVhM011WW1WbWIzSmxMbXhsYm1kMGFEdGNiaUFnSUNCMllYSWdaVzVrSUQwZ2MzUmhjblFnS3lCamFIVnVhM011YzJWc1pXTjBhVzl1TG14bGJtZDBhRHRjYmlBZ0lDQjJZWElnY0NBOUlIdDlPMXh1WEc0Z0lDQWdkMkZzYXlobFpHbDBZV0pzWlM1bWFYSnpkRU5vYVd4a0xDQndaV1ZyS1R0Y2JpQWdJQ0JsWkdsMFlXSnNaUzVtYjJOMWN5Z3BPMXh1SUNBZ0lITmxkRk5sYkdWamRHbHZiaWh3S1R0Y2JseHVJQ0FnSUdaMWJtTjBhVzl1SUhCbFpXc2dLR052Ym5SbGVIUXNJR1ZzS1NCN1hHNGdJQ0FnSUNCMllYSWdZM1Z5YzI5eUlEMGdZMjl1ZEdWNGRDNTBaWGgwTG14bGJtZDBhRHRjYmlBZ0lDQWdJSFpoY2lCamIyNTBaVzUwSUQwZ2NtVmhaRTV2WkdVb1pXd3BMbXhsYm1kMGFEdGNiaUFnSUNBZ0lIWmhjaUJ6ZFcwZ1BTQmpkWEp6YjNJZ0t5QmpiMjUwWlc1ME8xeHVJQ0FnSUNBZ2FXWWdLQ0Z3TG5OMFlYSjBRMjl1ZEdGcGJtVnlJQ1ltSUhOMWJTQStQU0J6ZEdGeWRDa2dlMXh1SUNBZ0lDQWdJQ0J3TG5OMFlYSjBRMjl1ZEdGcGJtVnlJRDBnWld3N1hHNGdJQ0FnSUNBZ0lIQXVjM1JoY25SUFptWnpaWFFnUFNCaWIzVnVaR1ZrS0hOMFlYSjBJQzBnWTNWeWMyOXlLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR2xtSUNnaGNDNWxibVJEYjI1MFlXbHVaWElnSmlZZ2MzVnRJRDQ5SUdWdVpDa2dlMXh1SUNBZ0lDQWdJQ0J3TG1WdVpFTnZiblJoYVc1bGNpQTlJR1ZzTzF4dUlDQWdJQ0FnSUNCd0xtVnVaRTltWm5ObGRDQTlJR0p2ZFc1a1pXUW9aVzVrSUMwZ1kzVnljMjl5S1R0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ1puVnVZM1JwYjI0Z1ltOTFibVJsWkNBb2IyWm1jMlYwS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCTllYUm9MbTFoZUNnd0xDQk5ZWFJvTG0xcGJpaGpiMjUwWlc1MExDQnZabVp6WlhRcEtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVTJWc1pXTjBhVzl1UldScGRHRmliR1VnS0hOMFlYUmxLU0I3WEc0Z0lDQWdkbUZ5SUhObGJDQTlJR2RsZEZObGJHVmpkR2x2YmlncE8xeHVJQ0FnSUhaaGNpQmthWE4wWVc1alpTQTlJSGRoYkdzb1pXUnBkR0ZpYkdVdVptbHljM1JEYUdsc1pDd2djR1ZsYXlrN1hHNGdJQ0FnZG1GeUlITjBZWEowSUQwZ1pHbHpkR0Z1WTJVdWMzUmhjblFnZkh3Z01EdGNiaUFnSUNCMllYSWdaVzVrSUQwZ1pHbHpkR0Z1WTJVdVpXNWtJSHg4SURBN1hHNWNiaUFnSUNCemRHRjBaUzUwWlhoMElEMGdaR2x6ZEdGdVkyVXVkR1Y0ZER0Y2JseHVJQ0FnSUdsbUlDaGxibVFnUGlCemRHRnlkQ2tnZTF4dUlDQWdJQ0FnYzNSaGRHVXVjM1JoY25RZ1BTQnpkR0Z5ZER0Y2JpQWdJQ0FnSUhOMFlYUmxMbVZ1WkNBOUlHVnVaRHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2MzUmhkR1V1YzNSaGNuUWdQU0JsYm1RN1hHNGdJQ0FnSUNCemRHRjBaUzVsYm1RZ1BTQnpkR0Z5ZER0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUJ3WldWcklDaGpiMjUwWlhoMExDQmxiQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tHVnNJRDA5UFNCelpXd3VZVzVqYUc5eVRtOWtaU2tnZTF4dUlDQWdJQ0FnSUNCamIyNTBaWGgwTG5OMFlYSjBJRDBnWTI5dWRHVjRkQzUwWlhoMExteGxibWQwYUNBcklITmxiQzVoYm1Ob2IzSlBabVp6WlhRN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9aV3dnUFQwOUlITmxiQzVtYjJOMWMwNXZaR1VwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEM1bGJtUWdQU0JqYjI1MFpYaDBMblJsZUhRdWJHVnVaM1JvSUNzZ2MyVnNMbVp2WTNWelQyWm1jMlYwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkaGJHc2dLR1ZzTENCd1pXVnJMQ0JqZEhnc0lITnBZbXhwYm1kektTQjdYRzRnSUNBZ2RtRnlJR052Ym5SbGVIUWdQU0JqZEhnZ2ZId2dleUIwWlhoME9pQW5KeUI5TzF4dVhHNGdJQ0FnYVdZZ0tDRmxiQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR052Ym5SbGVIUTdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2RtRnlJR1ZzVG05a1pTQTlJR1ZzTG01dlpHVlVlWEJsSUQwOVBTQXhPMXh1SUNBZ0lIWmhjaUIwWlhoMFRtOWtaU0E5SUdWc0xtNXZaR1ZVZVhCbElEMDlQU0F6TzF4dVhHNGdJQ0FnY0dWbGF5aGpiMjUwWlhoMExDQmxiQ2s3WEc1Y2JpQWdJQ0JwWmlBb2RHVjRkRTV2WkdVcElIdGNiaUFnSUNBZ0lHTnZiblJsZUhRdWRHVjRkQ0FyUFNCeVpXRmtUbTlrWlNobGJDazdYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaGxiRTV2WkdVcElIdGNiaUFnSUNBZ0lHbG1JQ2hsYkM1dmRYUmxja2hVVFV3dWJXRjBZMmdvY205d1pXNHBLU0I3SUdOdmJuUmxlSFF1ZEdWNGRDQXJQU0JTWldkRmVIQXVKREU3SUgxY2JpQWdJQ0FnSUdOaGMzUW9aV3d1WTJocGJHUk9iMlJsY3lrdVptOXlSV0ZqYUNoM1lXeHJRMmhwYkdSeVpXNHBPMXh1SUNBZ0lDQWdhV1lnS0dWc0xtOTFkR1Z5U0ZSTlRDNXRZWFJqYUNoeVkyeHZjMlVwS1NCN0lHTnZiblJsZUhRdWRHVjRkQ0FyUFNCU1pXZEZlSEF1SkRFN0lIMWNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tITnBZbXhwYm1keklDRTlQU0JtWVd4elpTQW1KaUJsYkM1dVpYaDBVMmxpYkdsdVp5a2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlIZGhiR3NvWld3dWJtVjRkRk5wWW14cGJtY3NJSEJsWldzc0lHTnZiblJsZUhRcE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdZMjl1ZEdWNGREdGNibHh1SUNBZ0lHWjFibU4wYVc5dUlIZGhiR3REYUdsc1pISmxiaUFvWTJocGJHUXBJSHRjYmlBZ0lDQWdJSGRoYkdzb1kyaHBiR1FzSUhCbFpXc3NJR052Ym5SbGVIUXNJR1poYkhObEtUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVG05a1pTQW9aV3dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdaV3d1Ym05a1pWUjVjR1VnUFQwOUlETWdQeUJtYVhoRlQwd29aV3d1ZEdWNGRFTnZiblJsYm5RZ2ZId2daV3d1YVc1dVpYSlVaWGgwSUh4OElDY25LU0E2SUNjbk8xeHVJQ0I5WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjM1Z5Wm1GalpUdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZ2V0VGV4dCAoZWwpIHtcbiAgcmV0dXJuIGVsLmlubmVyVGV4dCB8fCBlbC50ZXh0Q29udGVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUZXh0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHJpbUNodW5rcyA9IHJlcXVpcmUoJy4uL2NodW5rcy90cmltJyk7XG5cbmZ1bmN0aW9uIEh0bWxDaHVua3MgKCkge1xufVxuXG5IdG1sQ2h1bmtzLnByb3RvdHlwZS50cmltID0gdHJpbUNodW5rcztcblxuSHRtbENodW5rcy5wcm90b3R5cGUuZmluZFRhZ3MgPSBmdW5jdGlvbiAoKSB7XG59O1xuXG5IdG1sQ2h1bmtzLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gKCkge1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIdG1sQ2h1bmtzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcblxuZnVuY3Rpb24gYmxvY2txdW90ZSAoY2h1bmtzKSB7XG4gIHdyYXBwaW5nKCdibG9ja3F1b3RlJywgc3RyaW5ncy5wbGFjZWhvbGRlcnMucXVvdGUsIGNodW5rcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmxvY2txdW90ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgd3JhcHBpbmcgPSByZXF1aXJlKCcuL3dyYXBwaW5nJyk7XG5cbmZ1bmN0aW9uIGJvbGRPckl0YWxpYyAoY2h1bmtzLCB0eXBlKSB7XG4gIHdyYXBwaW5nKHR5cGUgPT09ICdib2xkJyA/ICdzdHJvbmcnIDogJ2VtJywgc3RyaW5ncy5wbGFjZWhvbGRlcnNbdHlwZV0sIGNodW5rcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYm9sZE9ySXRhbGljO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcblxuZnVuY3Rpb24gY29kZWJsb2NrIChjaHVua3MpIHtcbiAgd3JhcHBpbmcoJ3ByZT48Y29kZScsIHN0cmluZ3MucGxhY2Vob2xkZXJzLmNvZGUsIGNodW5rcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29kZWJsb2NrO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBybGVhZGluZyA9IC88aChbMS02XSkoIFtePl0qKT8+JC87XG52YXIgcnRyYWlsaW5nID0gL148XFwvaChbMS02XSk+LztcblxuZnVuY3Rpb24gaGVhZGluZyAoY2h1bmtzKSB7XG4gIGNodW5rcy50cmltKCk7XG5cbiAgdmFyIHRyYWlsID0gcnRyYWlsaW5nLmV4ZWMoY2h1bmtzLmFmdGVyKTtcbiAgdmFyIGxlYWQgPSBybGVhZGluZy5leGVjKGNodW5rcy5iZWZvcmUpO1xuICBpZiAobGVhZCAmJiB0cmFpbCAmJiBsZWFkWzFdID09PSB0cmFpbFsxXSkge1xuICAgIHN3YXAoKTtcbiAgfSBlbHNlIHtcbiAgICBhZGQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN3YXAgKCkge1xuICAgIHZhciBsZXZlbCA9IHBhcnNlSW50KGxlYWRbMV0sIDEwKTtcbiAgICB2YXIgbmV4dCA9IGxldmVsIDw9IDEgPyA0IDogbGV2ZWwgLSAxO1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlYWRpbmcsICc8aCcgKyBuZXh0ICsgJz4nKTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShydHJhaWxpbmcsICc8L2gnICsgbmV4dCArICc+Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGQgKCkge1xuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmhlYWRpbmc7XG4gICAgfVxuICAgIGNodW5rcy5iZWZvcmUgKz0gJzxoMT4nO1xuICAgIGNodW5rcy5hZnRlciA9ICc8L2gxPicgKyBjaHVua3MuYWZ0ZXI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoZWFkaW5nO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBociAoY2h1bmtzKSB7XG4gIGNodW5rcy5iZWZvcmUgKz0gJ1xcbjxocj5cXG4nO1xuICBjaHVua3Muc2VsZWN0aW9uID0gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBvbmNlID0gcmVxdWlyZSgnLi4vb25jZScpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgcGFyc2VMaW5rSW5wdXQgPSByZXF1aXJlKCcuLi9jaHVua3MvcGFyc2VMaW5rSW5wdXQnKTtcbnZhciBybGVhZGluZyA9IC88YSggW14+XSopPz4kLztcbnZhciBydHJhaWxpbmcgPSAvXjxcXC9hPi87XG52YXIgcmltYWdlID0gLzxpbWcoIFtePl0qKT9cXC8+JC87XG5cbmZ1bmN0aW9uIGxpbmtPckltYWdlT3JBdHRhY2htZW50IChjaHVua3MsIG9wdGlvbnMpIHtcbiAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gIHZhciBpbWFnZSA9IHR5cGUgPT09ICdpbWFnZSc7XG4gIHZhciByZXN1bWU7XG5cbiAgaWYgKHR5cGUgIT09ICdhdHRhY2htZW50Jykge1xuICAgIGNodW5rcy50cmltKCk7XG4gIH1cblxuICBpZiAocmVtb3ZhbCgpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmVzdW1lID0gdGhpcy5hc3luYygpO1xuXG4gIG9wdGlvbnMucHJvbXB0cy5jbG9zZSgpO1xuICAob3B0aW9ucy5wcm9tcHRzW3R5cGVdIHx8IG9wdGlvbnMucHJvbXB0cy5saW5rKShvcHRpb25zLCBvbmNlKHJlc29sdmVkKSk7XG5cbiAgZnVuY3Rpb24gcmVtb3ZhbCAoKSB7XG4gICAgaWYgKGltYWdlKSB7XG4gICAgICBpZiAocmltYWdlLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJ0cmFpbGluZy5leGVjKGNodW5rcy5hZnRlcikgJiYgcmxlYWRpbmcuZXhlYyhjaHVua3MuYmVmb3JlKSkge1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVhZGluZywgJycpO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnRyYWlsaW5nLCAnJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNvbHZlZCAocmVzdWx0KSB7XG4gICAgdmFyIHBhcnRzO1xuICAgIHZhciBsaW5rcyA9IHJlc3VsdC5kZWZpbml0aW9ucy5tYXAocGFyc2VMaW5rSW5wdXQpLmZpbHRlcihsb25nKTtcbiAgICBpZiAobGlua3MubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXN1bWUoKTsgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbGluayA9IGxpbmtzWzBdO1xuXG4gICAgaWYgKHR5cGUgPT09ICdhdHRhY2htZW50Jykge1xuICAgICAgcGFydHMgPSBvcHRpb25zLm1lcmdlSHRtbEFuZEF0dGFjaG1lbnQoY2h1bmtzLmJlZm9yZSArIGNodW5rcy5zZWxlY3Rpb24gKyBjaHVua3MuYWZ0ZXIsIGxpbmspO1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IHBhcnRzLmJlZm9yZTtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBwYXJ0cy5zZWxlY3Rpb247XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBwYXJ0cy5hZnRlcjtcbiAgICAgIHJlc3VtZSgpO1xuICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShvcHRpb25zLnN1cmZhY2UudGV4dGFyZWEsICd3b29mbWFyay1tb2RlLWNoYW5nZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpbWFnZSkge1xuICAgICAgaW1hZ2VXcmFwKGxpbmssIGxpbmtzLnNsaWNlKDEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlua1dyYXAobGluaywgbGlua3Muc2xpY2UoMSkpO1xuICAgIH1cblxuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzW3R5cGVdO1xuICAgIH1cbiAgICByZXN1bWUoKTtcblxuICAgIGZ1bmN0aW9uIGxvbmcgKGxpbmspIHtcbiAgICAgIHJldHVybiBsaW5rLmhyZWYubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUaXRsZSAobGluaykge1xuICAgICAgcmV0dXJuIGxpbmsudGl0bGUgPyAnIHRpdGxlPVwiJyArIGxpbmsudGl0bGUgKyAnXCInIDogJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW1hZ2VXcmFwIChsaW5rLCByZXN0KSB7XG4gICAgICB2YXIgYWZ0ZXIgPSBjaHVua3MuYWZ0ZXI7XG4gICAgICBjaHVua3MuYmVmb3JlICs9IHRhZ29wZW4obGluayk7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSB0YWdjbG9zZShsaW5rKTtcbiAgICAgIGlmIChyZXN0Lmxlbmd0aCkge1xuICAgICAgICBjaHVua3MuYWZ0ZXIgKz0gcmVzdC5tYXAodG9Bbm90aGVySW1hZ2UpLmpvaW4oJycpO1xuICAgICAgfVxuICAgICAgY2h1bmtzLmFmdGVyICs9IGFmdGVyO1xuICAgICAgZnVuY3Rpb24gdGFnb3BlbiAobGluaykgeyByZXR1cm4gJzxpbWcgc3JjPVwiJyArIGxpbmsuaHJlZiArICdcIiBhbHQ9XCInOyB9XG4gICAgICBmdW5jdGlvbiB0YWdjbG9zZSAobGluaykgeyByZXR1cm4gJ1wiJyArIGdldFRpdGxlKGxpbmspICsgJyAvPic7IH1cbiAgICAgIGZ1bmN0aW9uIHRvQW5vdGhlckltYWdlIChsaW5rKSB7IHJldHVybiAnICcgKyB0YWdvcGVuKGxpbmspICsgdGFnY2xvc2UobGluayk7IH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaW5rV3JhcCAobGluaywgcmVzdCkge1xuICAgICAgdmFyIGFmdGVyID0gY2h1bmtzLmFmdGVyO1xuICAgICAgdmFyIG5hbWVzID0gb3B0aW9ucy5jbGFzc2VzLmlucHV0LmxpbmtzO1xuICAgICAgdmFyIGNsYXNzZXMgPSBuYW1lcyA/ICcgY2xhc3M9XCInICsgbmFtZXMgKyAnXCInIDogJyc7XG4gICAgICBjaHVua3MuYmVmb3JlICs9IHRhZ29wZW4obGluayk7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSB0YWdjbG9zZSgpO1xuICAgICAgaWYgKHJlc3QubGVuZ3RoKSB7XG4gICAgICAgIGNodW5rcy5hZnRlciArPSByZXN0Lm1hcCh0b0Fub3RoZXJMaW5rKS5qb2luKCcnKTtcbiAgICAgIH1cbiAgICAgIGNodW5rcy5hZnRlciArPSBhZnRlcjtcbiAgICAgIGZ1bmN0aW9uIHRhZ29wZW4gKGxpbmspIHsgcmV0dXJuICc8YSBocmVmPVwiJyArIGxpbmsuaHJlZiArICdcIicgKyBnZXRUaXRsZShsaW5rKSArIGNsYXNzZXMgKyAnPic7IH1cbiAgICAgIGZ1bmN0aW9uIHRhZ2Nsb3NlICgpIHsgcmV0dXJuICc8L2E+JzsgfVxuICAgICAgZnVuY3Rpb24gdG9Bbm90aGVyTGluayAobGluaykgeyByZXR1cm4gJyAnICsgdGFnb3BlbihsaW5rKSArIHRhZ2Nsb3NlKCk7IH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaW5rT3JJbWFnZU9yQXR0YWNobWVudDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgcmxlZnRzaW5nbGUgPSAvPCh1bHxvbCkoIFtePl0qKT8+XFxzKjxsaSggW14+XSopPz4kLztcbnZhciBycmlnaHRzaW5nbGUgPSAvXjxcXC9saT5cXHMqPFxcLyh1bHxvbCk+LztcbnZhciBybGVmdGl0ZW0gPSAvPGxpKCBbXj5dKik/PiQvO1xudmFyIHJyaWdodGl0ZW0gPSAvXjxcXC9saSggW14+XSopPz4vO1xudmFyIHJvcGVuID0gL148KHVsfG9sKSggW14+XSopPz4kLztcblxuZnVuY3Rpb24gbGlzdCAoY2h1bmtzLCBvcmRlcmVkKSB7XG4gIHZhciB0YWcgPSBvcmRlcmVkID8gJ29sJyA6ICd1bCc7XG4gIHZhciBvbGlzdCA9ICc8JyArIHRhZyArICc+JztcbiAgdmFyIGNsaXN0ID0gJzwvJyArIHRhZyArICc+JztcblxuICBjaHVua3MudHJpbSgpO1xuXG4gIGlmIChybGVmdHNpbmdsZS50ZXN0KGNodW5rcy5iZWZvcmUpICYmIHJyaWdodHNpbmdsZS50ZXN0KGNodW5rcy5hZnRlcikpIHtcbiAgICBpZiAodGFnID09PSBSZWdFeHAuJDEpIHtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlZnRzaW5nbGUsICcnKTtcbiAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJyaWdodHNpbmdsZSwgJycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHZhciB1bFN0YXJ0ID0gY2h1bmtzLmJlZm9yZS5sYXN0SW5kZXhPZignPHVsJyk7XG4gIHZhciBvbFN0YXJ0ID0gY2h1bmtzLmJlZm9yZS5sYXN0SW5kZXhPZignPG9sJyk7XG4gIHZhciBjbG9zZVRhZyA9IGNodW5rcy5hZnRlci5pbmRleE9mKCc8L3VsPicpO1xuICBpZiAoY2xvc2VUYWcgPT09IC0xKSB7XG4gICAgY2xvc2VUYWcgPSBjaHVua3MuYWZ0ZXIuaW5kZXhPZignPC9vbD4nKTtcbiAgfVxuICBpZiAoY2xvc2VUYWcgPT09IC0xKSB7XG4gICAgYWRkKCk7IHJldHVybjtcbiAgfVxuICB2YXIgb3BlblN0YXJ0ID0gdWxTdGFydCA+IG9sU3RhcnQgPyB1bFN0YXJ0IDogb2xTdGFydDtcbiAgaWYgKG9wZW5TdGFydCA9PT0gLTEpIHtcbiAgICBhZGQoKTsgcmV0dXJuO1xuICB9XG4gIHZhciBvcGVuRW5kID0gY2h1bmtzLmJlZm9yZS5pbmRleE9mKCc+Jywgb3BlblN0YXJ0KTtcbiAgaWYgKG9wZW5FbmQgPT09IC0xKSB7XG4gICAgYWRkKCk7IHJldHVybjtcbiAgfVxuXG4gIHZhciBvcGVuVGFnID0gY2h1bmtzLmJlZm9yZS5zdWJzdHIob3BlblN0YXJ0LCBvcGVuRW5kIC0gb3BlblN0YXJ0ICsgMSk7XG4gIGlmIChyb3Blbi50ZXN0KG9wZW5UYWcpKSB7XG4gICAgaWYgKHRhZyAhPT0gUmVnRXhwLiQxKSB7XG4gICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5zdWJzdHIoMCwgb3BlblN0YXJ0KSArICc8JyArIHRhZyArIGNodW5rcy5iZWZvcmUuc3Vic3RyKG9wZW5TdGFydCArIDMpO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnN1YnN0cigwLCBjbG9zZVRhZykgKyAnPC8nICsgdGFnICsgY2h1bmtzLmFmdGVyLnN1YnN0cihjbG9zZVRhZyArIDQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmxlZnRpdGVtLnRlc3QoY2h1bmtzLmJlZm9yZSkgJiYgcnJpZ2h0aXRlbS50ZXN0KGNodW5rcy5hZnRlcikpIHtcbiAgICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVmdGl0ZW0sICcnKTtcbiAgICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnJpZ2h0aXRlbSwgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZCAobGlzdCkge1xuICAgIHZhciBvcGVuID0gbGlzdCA/ICcnIDogb2xpc3Q7XG4gICAgdmFyIGNsb3NlID0gbGlzdCA/ICcnIDogY2xpc3Q7XG5cbiAgICBjaHVua3MuYmVmb3JlICs9IG9wZW4gKyAnPGxpPic7XG4gICAgY2h1bmtzLmFmdGVyID0gJzwvbGk+JyArIGNsb3NlICsgY2h1bmtzLmFmdGVyO1xuXG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMubGlzdGl0ZW07XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gd3JhcHBpbmcgKHRhZywgcGxhY2Vob2xkZXIsIGNodW5rcykge1xuICB2YXIgb3BlbiA9ICc8JyArIHRhZztcbiAgdmFyIGNsb3NlID0gJzwvJyArIHRhZy5yZXBsYWNlKC88L2csICc8LycpO1xuICB2YXIgcmxlYWRpbmcgPSBuZXcgUmVnRXhwKG9wZW4gKyAnKCBbXj5dKik/PiQnLCAnaScpO1xuICB2YXIgcnRyYWlsaW5nID0gbmV3IFJlZ0V4cCgnXicgKyBjbG9zZSArICc+JywgJ2knKTtcbiAgdmFyIHJvcGVuID0gbmV3IFJlZ0V4cChvcGVuICsgJyggW14+XSopPz4nLCAnaWcnKTtcbiAgdmFyIHJjbG9zZSA9IG5ldyBSZWdFeHAoY2xvc2UgKyAnKCBbXj5dKik/PicsICdpZycpO1xuXG4gIGNodW5rcy50cmltKCk7XG5cbiAgdmFyIHRyYWlsID0gcnRyYWlsaW5nLmV4ZWMoY2h1bmtzLmFmdGVyKTtcbiAgdmFyIGxlYWQgPSBybGVhZGluZy5leGVjKGNodW5rcy5iZWZvcmUpO1xuICBpZiAobGVhZCAmJiB0cmFpbCkge1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlYWRpbmcsICcnKTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShydHJhaWxpbmcsICcnKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBwbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgdmFyIG9wZW5lZCA9IHJvcGVuLnRlc3QoY2h1bmtzLnNlbGVjdGlvbik7XG4gICAgaWYgKG9wZW5lZCkge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShyb3BlbiwgJycpO1xuICAgICAgaWYgKCFzdXJyb3VuZGVkKGNodW5rcywgdGFnKSkge1xuICAgICAgICBjaHVua3MuYmVmb3JlICs9IG9wZW4gKyAnPic7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBjbG9zZWQgPSByY2xvc2UudGVzdChjaHVua3Muc2VsZWN0aW9uKTtcbiAgICBpZiAoY2xvc2VkKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJjbG9zZSwgJycpO1xuICAgICAgaWYgKCFzdXJyb3VuZGVkKGNodW5rcywgdGFnKSkge1xuICAgICAgICBjaHVua3MuYWZ0ZXIgPSBjbG9zZSArICc+JyArIGNodW5rcy5hZnRlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wZW5lZCB8fCBjbG9zZWQpIHtcbiAgICAgIHB1c2hvdmVyKCk7IHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN1cnJvdW5kZWQoY2h1bmtzLCB0YWcpKSB7XG4gICAgICBpZiAocmxlYWRpbmcudGVzdChjaHVua3MuYmVmb3JlKSkge1xuICAgICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJsZWFkaW5nLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaHVua3MuYmVmb3JlICs9IGNsb3NlICsgJz4nO1xuICAgICAgfVxuICAgICAgaWYgKHJ0cmFpbGluZy50ZXN0KGNodW5rcy5hZnRlcikpIHtcbiAgICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnRyYWlsaW5nLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaHVua3MuYWZ0ZXIgPSBvcGVuICsgJz4nICsgY2h1bmtzLmFmdGVyO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWNsb3NlYm91bmRlZChjaHVua3MsIHRhZykpIHtcbiAgICAgIGNodW5rcy5hZnRlciA9IGNsb3NlICsgJz4nICsgY2h1bmtzLmFmdGVyO1xuICAgICAgY2h1bmtzLmJlZm9yZSArPSBvcGVuICsgJz4nO1xuICAgIH1cbiAgICBwdXNob3ZlcigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaG92ZXIgKCkge1xuICAgIGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvPChcXC8pPyhbXj4gXSspKCBbXj5dKik/Pi9pZywgcHVzaG92ZXJPdGhlclRhZ3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaG92ZXJPdGhlclRhZ3MgKGFsbCwgY2xvc2luZywgdGFnLCBhLCBpKSB7XG4gICAgdmFyIGF0dHJzID0gYSB8fCAnJztcbiAgICB2YXIgb3BlbiA9ICFjbG9zaW5nO1xuICAgIHZhciByY2xvc2VkID0gbmV3IFJlZ0V4cCgnPFxcLycgKyB0YWcucmVwbGFjZSgvPC9nLCAnPC8nKSArICc+JywgJ2knKTtcbiAgICB2YXIgcm9wZW5lZCA9IG5ldyBSZWdFeHAoJzwnICsgdGFnICsgJyggW14+XSopPz4nLCAnaScpO1xuICAgIGlmIChvcGVuICYmICFyY2xvc2VkLnRlc3QoY2h1bmtzLnNlbGVjdGlvbi5zdWJzdHIoaSkpKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uICs9ICc8LycgKyB0YWcgKyAnPic7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZSgvXig8XFwvW14+XSs+KS8sICckMTwnICsgdGFnICsgYXR0cnMgKyAnPicpO1xuICAgIH1cblxuICAgIGlmIChjbG9zaW5nICYmICFyb3BlbmVkLnRlc3QoY2h1bmtzLnNlbGVjdGlvbi5zdWJzdHIoMCwgaSkpKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gJzwnICsgdGFnICsgYXR0cnMgKyAnPicgKyBjaHVua3Muc2VsZWN0aW9uO1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZSgvKDxbXj5dKyg/OiBbXj5dKik/PikkLywgJzwvJyArIHRhZyArICc+JDEnKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvc2Vib3VuZGVkIChjaHVua3MsIHRhZykge1xuICB2YXIgcmNsb3NlbGVmdCA9IG5ldyBSZWdFeHAoJzwvJyArIHRhZy5yZXBsYWNlKC88L2csICc8LycpICsgJz4kJywgJ2knKTtcbiAgdmFyIHJvcGVucmlnaHQgPSBuZXcgUmVnRXhwKCdePCcgKyB0YWcgKyAnKD86IFtePl0qKT8+JywgJ2knKTtcbiAgdmFyIGJvdW5kZWQgPSByY2xvc2VsZWZ0LnRlc3QoY2h1bmtzLmJlZm9yZSkgJiYgcm9wZW5yaWdodC50ZXN0KGNodW5rcy5hZnRlcik7XG4gIGlmIChib3VuZGVkKSB7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShyY2xvc2VsZWZ0LCAnJyk7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2Uocm9wZW5yaWdodCwgJycpO1xuICB9XG4gIHJldHVybiBib3VuZGVkO1xufVxuXG5mdW5jdGlvbiBzdXJyb3VuZGVkIChjaHVua3MsIHRhZykge1xuICB2YXIgcm9wZW4gPSBuZXcgUmVnRXhwKCc8JyArIHRhZyArICcoPzogW14+XSopPz4nLCAnaWcnKTtcbiAgdmFyIHJjbG9zZSA9IG5ldyBSZWdFeHAoJzxcXC8nICsgdGFnLnJlcGxhY2UoLzwvZywgJzwvJykgKyAnPicsICdpZycpO1xuICB2YXIgb3BlbnNCZWZvcmUgPSBjb3VudChjaHVua3MuYmVmb3JlLCByb3Blbik7XG4gIHZhciBvcGVuc0FmdGVyID0gY291bnQoY2h1bmtzLmFmdGVyLCByb3Blbik7XG4gIHZhciBjbG9zZXNCZWZvcmUgPSBjb3VudChjaHVua3MuYmVmb3JlLCByY2xvc2UpO1xuICB2YXIgY2xvc2VzQWZ0ZXIgPSBjb3VudChjaHVua3MuYWZ0ZXIsIHJjbG9zZSk7XG4gIHZhciBvcGVuID0gb3BlbnNCZWZvcmUgLSBjbG9zZXNCZWZvcmUgPiAwO1xuICB2YXIgY2xvc2UgPSBjbG9zZXNBZnRlciAtIG9wZW5zQWZ0ZXIgPiAwO1xuICByZXR1cm4gb3BlbiAmJiBjbG9zZTtcblxuICBmdW5jdGlvbiBjb3VudCAodGV4dCwgcmVnZXgpIHtcbiAgICB2YXIgbWF0Y2ggPSB0ZXh0Lm1hdGNoKHJlZ2V4KTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiBtYXRjaC5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd3JhcHBpbmc7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGlzVmlzaWJsZUVsZW1lbnQgKGVsZW0pIHtcbiAgaWYgKGdsb2JhbC5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgcmV0dXJuIGdsb2JhbC5nZXRDb21wdXRlZFN0eWxlKGVsZW0sIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ2Rpc3BsYXknKSAhPT0gJ25vbmUnO1xuICB9IGVsc2UgaWYgKGVsZW0uY3VycmVudFN0eWxlKSB7XG4gICAgcmV0dXJuIGVsZW0uY3VycmVudFN0eWxlLmRpc3BsYXkgIT09ICdub25lJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVmlzaWJsZUVsZW1lbnQ7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OXBjMVpwYzJsaWJHVkZiR1Z0Wlc1MExtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVablZ1WTNScGIyNGdhWE5XYVhOcFlteGxSV3hsYldWdWRDQW9aV3hsYlNrZ2UxeHVJQ0JwWmlBb1oyeHZZbUZzTG1kbGRFTnZiWEIxZEdWa1UzUjViR1VwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdaMnh2WW1Gc0xtZGxkRU52YlhCMWRHVmtVM1I1YkdVb1pXeGxiU3dnYm5Wc2JDa3VaMlYwVUhKdmNHVnlkSGxXWVd4MVpTZ25aR2x6Y0d4aGVTY3BJQ0U5UFNBbmJtOXVaU2M3WEc0Z0lIMGdaV3h6WlNCcFppQW9aV3hsYlM1amRYSnlaVzUwVTNSNWJHVXBJSHRjYmlBZ0lDQnlaWFIxY200Z1pXeGxiUzVqZFhKeVpXNTBVM1I1YkdVdVpHbHpjR3hoZVNBaFBUMGdKMjV2Ym1Vbk8xeHVJQ0I5WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdhWE5XYVhOcFlteGxSV3hsYldWdWREdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbWFueSAodGV4dCwgdGltZXMpIHtcbiAgcmV0dXJuIG5ldyBBcnJheSh0aW1lcyArIDEpLmpvaW4odGV4dCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFueTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hbnkgPSByZXF1aXJlKCcuLi9tYW55Jyk7XG52YXIgZXh0ZW5kUmVnRXhwID0gcmVxdWlyZSgnLi4vZXh0ZW5kUmVnRXhwJyk7XG52YXIgdHJpbUNodW5rcyA9IHJlcXVpcmUoJy4uL2NodW5rcy90cmltJyk7XG5cbmZ1bmN0aW9uIE1hcmtkb3duQ2h1bmtzICgpIHtcbn1cblxuTWFya2Rvd25DaHVua3MucHJvdG90eXBlLnRyaW0gPSB0cmltQ2h1bmtzO1xuXG5NYXJrZG93bkNodW5rcy5wcm90b3R5cGUuZmluZFRhZ3MgPSBmdW5jdGlvbiAoc3RhcnRSZWdleCwgZW5kUmVnZXgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgcmVnZXg7XG5cbiAgaWYgKHN0YXJ0UmVnZXgpIHtcbiAgICByZWdleCA9IGV4dGVuZFJlZ0V4cChzdGFydFJlZ2V4LCAnJywgJyQnKTtcbiAgICB0aGlzLmJlZm9yZSA9IHRoaXMuYmVmb3JlLnJlcGxhY2UocmVnZXgsIHN0YXJ0UmVwbGFjZXIpO1xuICAgIHJlZ2V4ID0gZXh0ZW5kUmVnRXhwKHN0YXJ0UmVnZXgsICdeJywgJycpO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24ucmVwbGFjZShyZWdleCwgc3RhcnRSZXBsYWNlcik7XG4gIH1cblxuICBpZiAoZW5kUmVnZXgpIHtcbiAgICByZWdleCA9IGV4dGVuZFJlZ0V4cChlbmRSZWdleCwgJycsICckJyk7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5yZXBsYWNlKHJlZ2V4LCBlbmRSZXBsYWNlcik7XG4gICAgcmVnZXggPSBleHRlbmRSZWdFeHAoZW5kUmVnZXgsICdeJywgJycpO1xuICAgIHRoaXMuYWZ0ZXIgPSB0aGlzLmFmdGVyLnJlcGxhY2UocmVnZXgsIGVuZFJlcGxhY2VyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0UmVwbGFjZXIgKG1hdGNoKSB7XG4gICAgc2VsZi5zdGFydFRhZyA9IHNlbGYuc3RhcnRUYWcgKyBtYXRjaDsgcmV0dXJuICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5kUmVwbGFjZXIgKG1hdGNoKSB7XG4gICAgc2VsZi5lbmRUYWcgPSBtYXRjaCArIHNlbGYuZW5kVGFnOyByZXR1cm4gJyc7XG4gIH1cbn07XG5cbk1hcmtkb3duQ2h1bmtzLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgYmVmb3JlQ291bnQgPSAnYmVmb3JlJyBpbiBvID8gby5iZWZvcmUgOiAxO1xuICB2YXIgYWZ0ZXJDb3VudCA9ICdhZnRlcicgaW4gbyA/IG8uYWZ0ZXIgOiAxO1xuXG4gIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24ucmVwbGFjZSgvKF5cXG4qKS8sICcnKTtcbiAgdGhpcy5zdGFydFRhZyA9IHRoaXMuc3RhcnRUYWcgKyBSZWdFeHAuJDE7XG4gIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24ucmVwbGFjZSgvKFxcbiokKS8sICcnKTtcbiAgdGhpcy5lbmRUYWcgPSB0aGlzLmVuZFRhZyArIFJlZ0V4cC4kMTtcbiAgdGhpcy5zdGFydFRhZyA9IHRoaXMuc3RhcnRUYWcucmVwbGFjZSgvKF5cXG4qKS8sICcnKTtcbiAgdGhpcy5iZWZvcmUgPSB0aGlzLmJlZm9yZSArIFJlZ0V4cC4kMTtcbiAgdGhpcy5lbmRUYWcgPSB0aGlzLmVuZFRhZy5yZXBsYWNlKC8oXFxuKiQpLywgJycpO1xuICB0aGlzLmFmdGVyID0gdGhpcy5hZnRlciArIFJlZ0V4cC4kMTtcblxuICBpZiAodGhpcy5iZWZvcmUpIHtcbiAgICB0aGlzLmJlZm9yZSA9IHJlcGxhY2UodGhpcy5iZWZvcmUsICsrYmVmb3JlQ291bnQsICckJyk7XG4gIH1cblxuICBpZiAodGhpcy5hZnRlcikge1xuICAgIHRoaXMuYWZ0ZXIgPSByZXBsYWNlKHRoaXMuYWZ0ZXIsICsrYWZ0ZXJDb3VudCwgJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZSAodGV4dCwgY291bnQsIHN1ZmZpeCkge1xuICAgIHZhciByZWdleCA9IG8uYW55ID8gJ1xcXFxuKicgOiBtYW55KCdcXFxcbj8nLCBjb3VudCk7XG4gICAgdmFyIHJlcGxhY2VtZW50ID0gbWFueSgnXFxuJywgY291bnQpO1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UobmV3IFJlZ0V4cChyZWdleCArIHN1ZmZpeCksIHJlcGxhY2VtZW50KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZG93bkNodW5rcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgd3JhcHBpbmcgPSByZXF1aXJlKCcuL3dyYXBwaW5nJyk7XG52YXIgc2V0dGluZ3MgPSByZXF1aXJlKCcuL3NldHRpbmdzJyk7XG52YXIgcnRyYWlsYmxhbmtsaW5lID0gLyg+WyBcXHRdKikkLztcbnZhciBybGVhZGJsYW5rbGluZSA9IC9eKD5bIFxcdF0qKS87XG52YXIgcm5ld2xpbmVmZW5jaW5nID0gL14oXFxuKikoW15cXHJdKz8pKFxcbiopJC87XG52YXIgcmVuZHRhZyA9IC9eKCgoXFxufF4pKFxcblsgXFx0XSopKj4oLitcXG4pKi4qKSsoXFxuWyBcXHRdKikqKS87XG52YXIgcmxlYWRicmFja2V0ID0gL15cXG4oKD58XFxzKSopXFxuLztcbnZhciBydHJhaWxicmFja2V0ID0gL1xcbigoPnxcXHMpKilcXG4kLztcblxuZnVuY3Rpb24gYmxvY2txdW90ZSAoY2h1bmtzKSB7XG4gIHZhciBtYXRjaCA9ICcnO1xuICB2YXIgbGVmdE92ZXIgPSAnJztcbiAgdmFyIGxpbmU7XG5cbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShybmV3bGluZWZlbmNpbmcsIG5ld2xpbmVyZXBsYWNlcik7XG4gIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocnRyYWlsYmxhbmtsaW5lLCB0cmFpbGJsYW5rbGluZXJlcGxhY2VyKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXihcXHN8PikrJC8sICcnKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24gfHwgc3RyaW5ncy5wbGFjZWhvbGRlcnMucXVvdGU7XG5cbiAgaWYgKGNodW5rcy5iZWZvcmUpIHtcbiAgICBiZWZvcmVQcm9jZXNzaW5nKCk7XG4gIH1cblxuICBjaHVua3Muc3RhcnRUYWcgPSBtYXRjaDtcbiAgY2h1bmtzLmJlZm9yZSA9IGxlZnRPdmVyO1xuXG4gIGlmIChjaHVua3MuYWZ0ZXIpIHtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZSgvXlxcbj8vLCAnXFxuJyk7XG4gIH1cblxuICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShyZW5kdGFnLCBlbmR0YWdyZXBsYWNlcik7XG5cbiAgaWYgKC9eKD8hWyBdezAsM30+KS9tLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICB3cmFwcGluZy53cmFwKGNodW5rcywgc2V0dGluZ3MubGluZUxlbmd0aCAtIDIpO1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL14vZ20sICc+ICcpO1xuICAgIHJlcGxhY2VCbGFua3NJblRhZ3ModHJ1ZSk7XG4gICAgY2h1bmtzLnNraXAoKTtcbiAgfSBlbHNlIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9eWyBdezAsM30+ID8vZ20sICcnKTtcbiAgICB3cmFwcGluZy51bndyYXAoY2h1bmtzKTtcbiAgICByZXBsYWNlQmxhbmtzSW5UYWdzKGZhbHNlKTtcblxuICAgIGlmICghL14oXFxufF4pWyBdezAsM30+Ly50ZXN0KGNodW5rcy5zZWxlY3Rpb24pICYmIGNodW5rcy5zdGFydFRhZykge1xuICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLnN0YXJ0VGFnLnJlcGxhY2UoL1xcbnswLDJ9JC8sICdcXG5cXG4nKTtcbiAgICB9XG5cbiAgICBpZiAoIS8oXFxufF4pWyBdezAsM30+LiokLy50ZXN0KGNodW5rcy5zZWxlY3Rpb24pICYmIGNodW5rcy5lbmRUYWcpIHtcbiAgICAgIGNodW5rcy5lbmRUYWcgPSBjaHVua3MuZW5kVGFnLnJlcGxhY2UoL15cXG57MCwyfS8sICdcXG5cXG4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIS9cXG4vLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJsZWFkYmxhbmtsaW5lLCBsZWFkYmxhbmtsaW5lcmVwbGFjZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gbmV3bGluZXJlcGxhY2VyIChhbGwsIGJlZm9yZSwgdGV4dCwgYWZ0ZXIpIHtcbiAgICBjaHVua3MuYmVmb3JlICs9IGJlZm9yZTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBhZnRlciArIGNodW5rcy5hZnRlcjtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsYmxhbmtsaW5lcmVwbGFjZXIgKGFsbCwgYmxhbmspIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gYmxhbmsgKyBjaHVua3Muc2VsZWN0aW9uOyByZXR1cm4gJyc7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkYmxhbmtsaW5lcmVwbGFjZXIgKGFsbCwgYmxhbmtzKSB7XG4gICAgY2h1bmtzLnN0YXJ0VGFnICs9IGJsYW5rczsgcmV0dXJuICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gYmVmb3JlUHJvY2Vzc2luZyAoKSB7XG4gICAgdmFyIGxpbmVzID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKC9cXG4kLywgJycpLnNwbGl0KCdcXG4nKTtcbiAgICB2YXIgY2hhaW5lZCA9IGZhbHNlO1xuICAgIHZhciBnb29kO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgZ29vZCA9IGZhbHNlO1xuICAgICAgbGluZSA9IGxpbmVzW2ldO1xuICAgICAgY2hhaW5lZCA9IGNoYWluZWQgJiYgbGluZS5sZW5ndGggPiAwO1xuICAgICAgaWYgKC9ePi8udGVzdChsaW5lKSkge1xuICAgICAgICBnb29kID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFjaGFpbmVkICYmIGxpbmUubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGNoYWluZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKC9eWyBcXHRdKiQvLnRlc3QobGluZSkpIHtcbiAgICAgICAgZ29vZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnb29kID0gY2hhaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChnb29kKSB7XG4gICAgICAgIG1hdGNoICs9IGxpbmUgKyAnXFxuJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlZnRPdmVyICs9IG1hdGNoICsgbGluZTtcbiAgICAgICAgbWF0Y2ggPSAnXFxuJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIS8oXnxcXG4pPi8udGVzdChtYXRjaCkpIHtcbiAgICAgIGxlZnRPdmVyICs9IG1hdGNoO1xuICAgICAgbWF0Y2ggPSAnJztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbmR0YWdyZXBsYWNlciAoYWxsKSB7XG4gICAgY2h1bmtzLmVuZFRhZyA9IGFsbDsgcmV0dXJuICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZUJsYW5rc0luVGFncyAoYnJhY2tldCkge1xuICAgIHZhciByZXBsYWNlbWVudCA9IGJyYWNrZXQgPyAnPiAnIDogJyc7XG5cbiAgICBpZiAoY2h1bmtzLnN0YXJ0VGFnKSB7XG4gICAgICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3Muc3RhcnRUYWcucmVwbGFjZShydHJhaWxicmFja2V0LCByZXBsYWNlcik7XG4gICAgfVxuICAgIGlmIChjaHVua3MuZW5kVGFnKSB7XG4gICAgICBjaHVua3MuZW5kVGFnID0gY2h1bmtzLmVuZFRhZy5yZXBsYWNlKHJsZWFkYnJhY2tldCwgcmVwbGFjZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyIChhbGwsIG1hcmtkb3duKSB7XG4gICAgICByZXR1cm4gJ1xcbicgKyBtYXJrZG93bi5yZXBsYWNlKC9eWyBdezAsM30+P1sgXFx0XSokL2dtLCByZXBsYWNlbWVudCkgKyAnXFxuJztcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9ja3F1b3RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmxlYWRpbmcgPSAvXihcXCoqKS87XG52YXIgcnRyYWlsaW5nID0gLyhcXCoqJCkvO1xudmFyIHJ0cmFpbGluZ3NwYWNlID0gLyhcXHM/KSQvO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG5cbmZ1bmN0aW9uIGJvbGRPckl0YWxpYyAoY2h1bmtzLCB0eXBlKSB7XG4gIHZhciBybmV3bGluZXMgPSAvXFxuezIsfS9nO1xuICB2YXIgc3RhckNvdW50ID0gdHlwZSA9PT0gJ2JvbGQnID8gMiA6IDE7XG5cbiAgY2h1bmtzLnRyaW0oKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShybmV3bGluZXMsICdcXG4nKTtcblxuICB2YXIgbWFya3VwO1xuICB2YXIgbGVhZFN0YXJzID0gcnRyYWlsaW5nLmV4ZWMoY2h1bmtzLmJlZm9yZSlbMF07XG4gIHZhciB0cmFpbFN0YXJzID0gcmxlYWRpbmcuZXhlYyhjaHVua3MuYWZ0ZXIpWzBdO1xuICB2YXIgc3RhcnMgPSAnXFxcXCp7JyArIHN0YXJDb3VudCArICd9JztcbiAgdmFyIGZlbmNlID0gTWF0aC5taW4obGVhZFN0YXJzLmxlbmd0aCwgdHJhaWxTdGFycy5sZW5ndGgpO1xuICBpZiAoZmVuY2UgPj0gc3RhckNvdW50ICYmIChmZW5jZSAhPT0gMiB8fCBzdGFyQ291bnQgIT09IDEpKSB7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShuZXcgUmVnRXhwKHN0YXJzICsgJyQnLCAnJyksICcnKTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShuZXcgUmVnRXhwKCdeJyArIHN0YXJzLCAnJyksICcnKTtcbiAgfSBlbHNlIGlmICghY2h1bmtzLnNlbGVjdGlvbiAmJiB0cmFpbFN0YXJzKSB7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocmxlYWRpbmcsICcnKTtcbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJ0cmFpbGluZ3NwYWNlLCAnJykgKyB0cmFpbFN0YXJzICsgUmVnRXhwLiQxO1xuICB9IGVsc2Uge1xuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbiAmJiAhdHJhaWxTdGFycykge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzW3R5cGVdO1xuICAgIH1cblxuICAgIG1hcmt1cCA9IHN0YXJDb3VudCA9PT0gMSA/ICcqJyA6ICcqKic7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUgKyBtYXJrdXA7XG4gICAgY2h1bmtzLmFmdGVyID0gbWFya3VwICsgY2h1bmtzLmFmdGVyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYm9sZE9ySXRhbGljO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBydGV4dGJlZm9yZSA9IC9cXFNbIF0qJC87XG52YXIgcnRleHRhZnRlciA9IC9eWyBdKlxcUy87XG52YXIgcm5ld2xpbmUgPSAvXFxuLztcbnZhciByYmFja3RpY2sgPSAvYC87XG52YXIgcmZlbmNlYmVmb3JlID0gL2BgYFthLXpdKlxcbj8kLztcbnZhciByZmVuY2ViZWZvcmVpbnNpZGUgPSAvXmBgYFthLXpdKlxcbi87XG52YXIgcmZlbmNlYWZ0ZXIgPSAvXlxcbj9gYGAvO1xudmFyIHJmZW5jZWFmdGVyaW5zaWRlID0gL1xcbmBgYCQvO1xuXG5mdW5jdGlvbiBjb2RlYmxvY2sgKGNodW5rcywgb3B0aW9ucykge1xuICB2YXIgbmV3bGluZWQgPSBybmV3bGluZS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pO1xuICB2YXIgdHJhaWxpbmcgPSBydGV4dGFmdGVyLnRlc3QoY2h1bmtzLmFmdGVyKTtcbiAgdmFyIGxlYWRpbmcgPSBydGV4dGJlZm9yZS50ZXN0KGNodW5rcy5iZWZvcmUpO1xuICB2YXIgb3V0ZmVuY2VkID0gcmZlbmNlYmVmb3JlLnRlc3QoY2h1bmtzLmJlZm9yZSkgJiYgcmZlbmNlYWZ0ZXIudGVzdChjaHVua3MuYWZ0ZXIpO1xuICBpZiAob3V0ZmVuY2VkIHx8IG5ld2xpbmVkIHx8ICEobGVhZGluZyB8fCB0cmFpbGluZykpIHtcbiAgICBibG9jayhvdXRmZW5jZWQpO1xuICB9IGVsc2Uge1xuICAgIGlubGluZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5saW5lICgpIHtcbiAgICBjaHVua3MudHJpbSgpO1xuICAgIGNodW5rcy5maW5kVGFncyhyYmFja3RpY2ssIHJiYWNrdGljayk7XG5cbiAgICBpZiAoIWNodW5rcy5zdGFydFRhZyAmJiAhY2h1bmtzLmVuZFRhZykge1xuICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLmVuZFRhZyA9ICdgJztcbiAgICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMuY29kZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNodW5rcy5lbmRUYWcgJiYgIWNodW5rcy5zdGFydFRhZykge1xuICAgICAgY2h1bmtzLmJlZm9yZSArPSBjaHVua3MuZW5kVGFnO1xuICAgICAgY2h1bmtzLmVuZFRhZyA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3MuZW5kVGFnID0gJyc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2sgKG91dGZlbmNlZCkge1xuICAgIGlmIChvdXRmZW5jZWQpIHtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmZlbmNlYmVmb3JlLCAnJyk7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShyZmVuY2VhZnRlciwgJycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UoL1sgXXs0fXxgYGBbYS16XSpcXG4kLywgbWVyZ2VTZWxlY3Rpb24pO1xuICAgIGNodW5rcy5za2lwKHtcbiAgICAgIGJlZm9yZTogLyhcXG58XikoXFx0fFsgXXs0LH18YGBgW2Etel0qXFxuKS4qXFxuJC8udGVzdChjaHVua3MuYmVmb3JlKSA/IDAgOiAxLFxuICAgICAgYWZ0ZXI6IC9eXFxuKFxcdHxbIF17NCx9fFxcbmBgYCkvLnRlc3QoY2h1bmtzLmFmdGVyKSA/IDAgOiAxXG4gICAgfSk7XG5cbiAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgIGlmIChvcHRpb25zLmZlbmNpbmcpIHtcbiAgICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gJ2BgYFxcbic7XG4gICAgICAgIGNodW5rcy5lbmRUYWcgPSAnXFxuYGBgJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNodW5rcy5zdGFydFRhZyA9ICcgICAgJztcbiAgICAgIH1cbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVycy5jb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmZlbmNlYmVmb3JlaW5zaWRlLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikgJiYgcmZlbmNlYWZ0ZXJpbnNpZGUudGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC8oXmBgYFthLXpdKlxcbil8KGBgYCQpL2csICcnKTtcbiAgICAgIH0gZWxzZSBpZiAoL15bIF17MCwzfVxcUy9tLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZmVuY2luZykge1xuICAgICAgICAgIGNodW5rcy5iZWZvcmUgKz0gJ2BgYFxcbic7XG4gICAgICAgICAgY2h1bmtzLmFmdGVyID0gJ1xcbmBgYCcgKyBjaHVua3MuYWZ0ZXI7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3bGluZWQpIHtcbiAgICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9eL2dtLCAnICAgICcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNodW5rcy5iZWZvcmUgKz0gJyAgICAnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9eKD86WyBdezR9fFsgXXswLDN9XFx0fGBgYFthLXpdKikvZ20sICcnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZVNlbGVjdGlvbiAoYWxsKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gYWxsICsgY2h1bmtzLnNlbGVjdGlvbjsgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvZGVibG9jaztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hbnkgPSByZXF1aXJlKCcuLi9tYW55Jyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcblxuZnVuY3Rpb24gaGVhZGluZyAoY2h1bmtzKSB7XG4gIHZhciBsZXZlbCA9IDA7XG5cbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb25cbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgLnJlcGxhY2UoLyheXFxzK3xcXHMrJCkvZywgJycpO1xuXG4gIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgIGNodW5rcy5zdGFydFRhZyA9ICcjICc7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmhlYWRpbmc7XG4gICAgY2h1bmtzLmVuZFRhZyA9ICcnO1xuICAgIGNodW5rcy5za2lwKHsgYmVmb3JlOiAxLCBhZnRlcjogMSB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjaHVua3MuZmluZFRhZ3MoLyMrWyBdKi8sIC9bIF0qIysvKTtcblxuICBpZiAoLyMrLy50ZXN0KGNodW5rcy5zdGFydFRhZykpIHtcbiAgICBsZXZlbCA9IFJlZ0V4cC5sYXN0TWF0Y2gubGVuZ3RoO1xuICB9XG5cbiAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLmVuZFRhZyA9ICcnO1xuICBjaHVua3MuZmluZFRhZ3MobnVsbCwgL1xccz8oLSt8PSspLyk7XG5cbiAgaWYgKC89Ky8udGVzdChjaHVua3MuZW5kVGFnKSkge1xuICAgIGxldmVsID0gMTtcbiAgfVxuXG4gIGlmICgvLSsvLnRlc3QoY2h1bmtzLmVuZFRhZykpIHtcbiAgICBsZXZlbCA9IDI7XG4gIH1cblxuICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3MuZW5kVGFnID0gJyc7XG4gIGNodW5rcy5za2lwKHsgYmVmb3JlOiAxLCBhZnRlcjogMSB9KTtcblxuICB2YXIgbGV2ZWxUb0NyZWF0ZSA9IGxldmVsIDwgMiA/IDQgOiBsZXZlbCAtIDE7XG4gIGlmIChsZXZlbFRvQ3JlYXRlID4gMCkge1xuICAgIGNodW5rcy5zdGFydFRhZyA9IG1hbnkoJyMnLCBsZXZlbFRvQ3JlYXRlKSArICcgJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhlYWRpbmc7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGhyIChjaHVua3MpIHtcbiAgY2h1bmtzLnN0YXJ0VGFnID0gJy0tLS0tLS0tLS1cXG4nO1xuICBjaHVua3Muc2VsZWN0aW9uID0gJyc7XG4gIGNodW5rcy5za2lwKHsgbGVmdDogMiwgcmlnaHQ6IDEsIGFueTogdHJ1ZSB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBocjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9uY2UgPSByZXF1aXJlKCcuLi9vbmNlJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBwYXJzZUxpbmtJbnB1dCA9IHJlcXVpcmUoJy4uL2NodW5rcy9wYXJzZUxpbmtJbnB1dCcpO1xudmFyIHJkZWZpbml0aW9ucyA9IC9eWyBdezAsM31cXFsoKD86YXR0YWNobWVudC0pP1xcZCspXFxdOlsgXFx0XSpcXG4/WyBcXHRdKjw/KFxcUys/KT4/WyBcXHRdKlxcbj9bIFxcdF0qKD86KFxcbiopW1wiKF0oLis/KVtcIildWyBcXHRdKik/KD86XFxuK3wkKS9nbTtcbnZhciByYXR0YWNobWVudCA9IC9eYXR0YWNobWVudC0oXFxkKykkL2k7XG5cbmZ1bmN0aW9uIGV4dHJhY3REZWZpbml0aW9ucyAodGV4dCwgZGVmaW5pdGlvbnMpIHtcbiAgcmRlZmluaXRpb25zLmxhc3RJbmRleCA9IDA7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UocmRlZmluaXRpb25zLCByZXBsYWNlcik7XG5cbiAgZnVuY3Rpb24gcmVwbGFjZXIgKGFsbCwgaWQsIGxpbmssIG5ld2xpbmVzLCB0aXRsZSkge1xuICAgIGRlZmluaXRpb25zW2lkXSA9IGFsbC5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbiAgICBpZiAobmV3bGluZXMpIHtcbiAgICAgIGRlZmluaXRpb25zW2lkXSA9IGFsbC5yZXBsYWNlKC9bXCIoXSguKz8pW1wiKV0kLywgJycpO1xuICAgICAgcmV0dXJuIG5ld2xpbmVzICsgdGl0bGU7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBwdXNoRGVmaW5pdGlvbiAob3B0aW9ucykge1xuICB2YXIgY2h1bmtzID0gb3B0aW9ucy5jaHVua3M7XG4gIHZhciBkZWZpbml0aW9uID0gb3B0aW9ucy5kZWZpbml0aW9uO1xuICB2YXIgYXR0YWNobWVudCA9IG9wdGlvbnMuYXR0YWNobWVudDtcbiAgdmFyIHJlZ2V4ID0gLyhcXFspKCg/OlxcW1teXFxdXSpcXF18W15cXFtcXF1dKSopKFxcXVsgXT8oPzpcXG5bIF0qKT9cXFspKCg/OmF0dGFjaG1lbnQtKT9cXGQrKShcXF0pL2c7XG4gIHZhciBhbmNob3IgPSAwO1xuICB2YXIgZGVmaW5pdGlvbnMgPSB7fTtcbiAgdmFyIGZvb3Rub3RlcyA9IFtdO1xuXG4gIGNodW5rcy5iZWZvcmUgPSBleHRyYWN0RGVmaW5pdGlvbnMoY2h1bmtzLmJlZm9yZSwgZGVmaW5pdGlvbnMpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gZXh0cmFjdERlZmluaXRpb25zKGNodW5rcy5zZWxlY3Rpb24sIGRlZmluaXRpb25zKTtcbiAgY2h1bmtzLmFmdGVyID0gZXh0cmFjdERlZmluaXRpb25zKGNodW5rcy5hZnRlciwgZGVmaW5pdGlvbnMpO1xuICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJlZ2V4LCBnZXRMaW5rKTtcblxuICBpZiAoZGVmaW5pdGlvbikge1xuICAgIGlmICghYXR0YWNobWVudCkgeyBwdXNoQW5jaG9yKGRlZmluaXRpb24pOyB9XG4gIH0gZWxzZSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShyZWdleCwgZ2V0TGluayk7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gYW5jaG9yO1xuXG4gIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJlZ2V4LCBnZXRMaW5rKTtcblxuICBpZiAoY2h1bmtzLmFmdGVyKSB7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UoL1xcbiokLywgJycpO1xuICB9XG4gIGlmICghY2h1bmtzLmFmdGVyKSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXFxuKiQvLCAnJyk7XG4gIH1cblxuICBhbmNob3IgPSAwO1xuICBPYmplY3Qua2V5cyhkZWZpbml0aW9ucykuZm9yRWFjaChwdXNoQXR0YWNobWVudHMpO1xuXG4gIGlmIChhdHRhY2htZW50KSB7XG4gICAgcHVzaEFuY2hvcihkZWZpbml0aW9uKTtcbiAgfVxuICBjaHVua3MuYWZ0ZXIgKz0gJ1xcblxcbicgKyBmb290bm90ZXMuam9pbignXFxuJyk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcblxuICBmdW5jdGlvbiBwdXNoQXR0YWNobWVudHMgKGRlZmluaXRpb24pIHtcbiAgICBpZiAocmF0dGFjaG1lbnQudGVzdChkZWZpbml0aW9uKSkge1xuICAgICAgcHVzaEFuY2hvcihkZWZpbml0aW9uc1tkZWZpbml0aW9uXSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHVzaEFuY2hvciAoZGVmaW5pdGlvbikge1xuICAgIGFuY2hvcisrO1xuICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uLnJlcGxhY2UoL15bIF17MCwzfVxcWyhhdHRhY2htZW50LSk/KFxcZCspXFxdOi8sICcgIFskMScgKyBhbmNob3IgKyAnXTonKTtcbiAgICBmb290bm90ZXMucHVzaChkZWZpbml0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExpbmsgKGFsbCwgYmVmb3JlLCBpbm5lciwgYWZ0ZXJJbm5lciwgZGVmaW5pdGlvbiwgZW5kKSB7XG4gICAgaW5uZXIgPSBpbm5lci5yZXBsYWNlKHJlZ2V4LCBnZXRMaW5rKTtcbiAgICBpZiAoZGVmaW5pdGlvbnNbZGVmaW5pdGlvbl0pIHtcbiAgICAgIHB1c2hBbmNob3IoZGVmaW5pdGlvbnNbZGVmaW5pdGlvbl0pO1xuICAgICAgcmV0dXJuIGJlZm9yZSArIGlubmVyICsgYWZ0ZXJJbm5lciArIGFuY2hvciArIGVuZDtcbiAgICB9XG4gICAgcmV0dXJuIGFsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBsaW5rT3JJbWFnZU9yQXR0YWNobWVudCAoY2h1bmtzLCBvcHRpb25zKSB7XG4gIHZhciB0eXBlID0gb3B0aW9ucy50eXBlO1xuICB2YXIgaW1hZ2UgPSB0eXBlID09PSAnaW1hZ2UnO1xuICB2YXIgcmVzdW1lO1xuXG4gIGNodW5rcy50cmltKCk7XG4gIGNodW5rcy5maW5kVGFncygvXFxzKiE/XFxbLywgL1xcXVsgXT8oPzpcXG5bIF0qKT8oXFxbLio/XFxdKT8vKTtcblxuICBpZiAoY2h1bmtzLmVuZFRhZy5sZW5ndGggPiAxICYmIGNodW5rcy5zdGFydFRhZy5sZW5ndGggPiAwKSB7XG4gICAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLnN0YXJ0VGFnLnJlcGxhY2UoLyE/XFxbLywgJycpO1xuICAgIGNodW5rcy5lbmRUYWcgPSAnJztcbiAgICBwdXNoRGVmaW5pdGlvbih7IGNodW5rczogY2h1bmtzIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc3RhcnRUYWcgKyBjaHVua3Muc2VsZWN0aW9uICsgY2h1bmtzLmVuZFRhZztcbiAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLmVuZFRhZyA9ICcnO1xuXG4gIGlmICgvXFxuXFxuLy50ZXN0KGNodW5rcy5zZWxlY3Rpb24pKSB7XG4gICAgcHVzaERlZmluaXRpb24oeyBjaHVua3M6IGNodW5rcyB9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgcmVzdW1lID0gdGhpcy5hc3luYygpO1xuXG4gIG9wdGlvbnMucHJvbXB0cy5jbG9zZSgpO1xuICAob3B0aW9ucy5wcm9tcHRzW3R5cGVdIHx8IG9wdGlvbnMucHJvbXB0cy5saW5rKShvcHRpb25zLCBvbmNlKHJlc29sdmVkKSk7XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZWQgKHJlc3VsdCkge1xuICAgIHZhciBsaW5rcyA9IHJlc3VsdFxuICAgICAgLmRlZmluaXRpb25zXG4gICAgICAubWFwKHBhcnNlTGlua0lucHV0KVxuICAgICAgLmZpbHRlcihsb25nKTtcblxuICAgIGxpbmtzLmZvckVhY2gocmVuZGVyTGluayk7XG4gICAgcmVzdW1lKCk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXJMaW5rIChsaW5rLCBpKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gKCcgJyArIGNodW5rcy5zZWxlY3Rpb24pLnJlcGxhY2UoLyhbXlxcXFxdKD86XFxcXFxcXFwpKikoPz1bW1xcXV0pL2csICckMVxcXFwnKS5zdWJzdHIoMSk7XG5cbiAgICAgIHZhciBrZXkgPSByZXN1bHQuYXR0YWNobWVudCA/ICcgIFthdHRhY2htZW50LTk5OTldOiAnIDogJyBbOTk5OV06ICc7XG4gICAgICB2YXIgZGVmaW5pdGlvbiA9IGtleSArIGxpbmsuaHJlZiArIChsaW5rLnRpdGxlID8gJyBcIicgKyBsaW5rLnRpdGxlICsgJ1wiJyA6ICcnKTtcbiAgICAgIHZhciBhbmNob3IgPSBwdXNoRGVmaW5pdGlvbih7XG4gICAgICAgIGNodW5rczogY2h1bmtzLFxuICAgICAgICBkZWZpbml0aW9uOiBkZWZpbml0aW9uLFxuICAgICAgICBhdHRhY2htZW50OiByZXN1bHQuYXR0YWNobWVudFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmVzdWx0LmF0dGFjaG1lbnQpIHtcbiAgICAgICAgYWRkKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZCAoKSB7XG4gICAgICAgIGNodW5rcy5zdGFydFRhZyA9IGltYWdlID8gJyFbJyA6ICdbJztcbiAgICAgICAgY2h1bmtzLmVuZFRhZyA9ICddWycgKyBhbmNob3IgKyAnXSc7XG5cbiAgICAgICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzW3R5cGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgPCBsaW5rcy5sZW5ndGggLSAxKSB7IC8vIGhhcyBtdWx0aXBsZSBsaW5rcywgbm90IHRoZSBsYXN0IG9uZVxuICAgICAgICAgIGNodW5rcy5iZWZvcmUgKz0gY2h1bmtzLnN0YXJ0VGFnICsgY2h1bmtzLnNlbGVjdGlvbiArIGNodW5rcy5lbmRUYWcgKyAnXFxuJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvbmcgKGxpbmspIHtcbiAgICAgIHJldHVybiBsaW5rLmhyZWYubGVuZ3RoID4gMDtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaW5rT3JJbWFnZU9yQXR0YWNobWVudDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hbnkgPSByZXF1aXJlKCcuLi9tYW55Jyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcbnZhciBzZXR0aW5ncyA9IHJlcXVpcmUoJy4vc2V0dGluZ3MnKTtcbnZhciBycHJldmlvdXMgPSAvKFxcbnxeKSgoWyBdezAsM30oWyorLV18XFxkK1suXSlbIFxcdF0rLiopKFxcbi4rfFxcbnsyLH0oWyorLV0uKnxcXGQrWy5dKVsgXFx0XSsuKnxcXG57Mix9WyBcXHRdK1xcUy4qKSopXFxuKiQvO1xudmFyIHJuZXh0ID0gL15cXG4qKChbIF17MCwzfShbKistXXxcXGQrWy5dKVsgXFx0XSsuKikoXFxuLit8XFxuezIsfShbKistXS4qfFxcZCtbLl0pWyBcXHRdKy4qfFxcbnsyLH1bIFxcdF0rXFxTLiopKilcXG4qLztcbnZhciByYnVsbGV0dHlwZSA9IC9eXFxzKihbKistXSkvO1xudmFyIHJza2lwcGVyID0gL1teXFxuXVxcblxcblteXFxuXS87XG5cbmZ1bmN0aW9uIHBhZCAodGV4dCkge1xuICByZXR1cm4gJyAnICsgdGV4dCArICcgJztcbn1cblxuZnVuY3Rpb24gbGlzdCAoY2h1bmtzLCBvcmRlcmVkKSB7XG4gIHZhciBidWxsZXQgPSAnLSc7XG4gIHZhciBudW0gPSAxO1xuICB2YXIgZGlnaXRhbDtcbiAgdmFyIGJlZm9yZVNraXAgPSAxO1xuICB2YXIgYWZ0ZXJTa2lwID0gMTtcblxuICBjaHVua3MuZmluZFRhZ3MoLyhcXG58XikqWyBdezAsM30oWyorLV18XFxkK1suXSlcXHMrLywgbnVsbCk7XG5cbiAgaWYgKGNodW5rcy5iZWZvcmUgJiYgIS9cXG4kLy50ZXN0KGNodW5rcy5iZWZvcmUpICYmICEvXlxcbi8udGVzdChjaHVua3Muc3RhcnRUYWcpKSB7XG4gICAgY2h1bmtzLmJlZm9yZSArPSBjaHVua3Muc3RhcnRUYWc7XG4gICAgY2h1bmtzLnN0YXJ0VGFnID0gJyc7XG4gIH1cblxuICBpZiAoY2h1bmtzLnN0YXJ0VGFnKSB7XG4gICAgZGlnaXRhbCA9IC9cXGQrWy5dLy50ZXN0KGNodW5rcy5zdGFydFRhZyk7XG4gICAgY2h1bmtzLnN0YXJ0VGFnID0gJyc7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXFxuWyBdezR9L2csICdcXG4nKTtcbiAgICB3cmFwcGluZy51bndyYXAoY2h1bmtzKTtcbiAgICBjaHVua3Muc2tpcCgpO1xuXG4gICAgaWYgKGRpZ2l0YWwpIHtcbiAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJuZXh0LCBnZXRQcmVmaXhlZEl0ZW0pO1xuICAgIH1cbiAgICBpZiAob3JkZXJlZCA9PT0gZGlnaXRhbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocnByZXZpb3VzLCBiZWZvcmVSZXBsYWNlcik7XG5cbiAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmxpc3RpdGVtO1xuICB9XG5cbiAgdmFyIHByZWZpeCA9IG5leHRCdWxsZXQoKTtcbiAgdmFyIHNwYWNlcyA9IG1hbnkoJyAnLCBwcmVmaXgubGVuZ3RoKTtcblxuICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShybmV4dCwgYWZ0ZXJSZXBsYWNlcik7XG4gIGNodW5rcy50cmltKHRydWUpO1xuICBjaHVua3Muc2tpcCh7IGJlZm9yZTogYmVmb3JlU2tpcCwgYWZ0ZXI6IGFmdGVyU2tpcCwgYW55OiB0cnVlIH0pO1xuICBjaHVua3Muc3RhcnRUYWcgPSBwcmVmaXg7XG4gIHdyYXBwaW5nLndyYXAoY2h1bmtzLCBzZXR0aW5ncy5saW5lTGVuZ3RoIC0gcHJlZml4Lmxlbmd0aCk7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL1xcbi9nLCAnXFxuJyArIHNwYWNlcyk7XG5cbiAgZnVuY3Rpb24gYmVmb3JlUmVwbGFjZXIgKHRleHQpIHtcbiAgICBpZiAocmJ1bGxldHR5cGUudGVzdCh0ZXh0KSkge1xuICAgICAgYnVsbGV0ID0gUmVnRXhwLiQxO1xuICAgIH1cbiAgICBiZWZvcmVTa2lwID0gcnNraXBwZXIudGVzdCh0ZXh0KSA/IDEgOiAwO1xuICAgIHJldHVybiBnZXRQcmVmaXhlZEl0ZW0odGV4dCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZnRlclJlcGxhY2VyICh0ZXh0KSB7XG4gICAgYWZ0ZXJTa2lwID0gcnNraXBwZXIudGVzdCh0ZXh0KSA/IDEgOiAwO1xuICAgIHJldHVybiBnZXRQcmVmaXhlZEl0ZW0odGV4dCk7XG4gIH1cblxuICBmdW5jdGlvbiBuZXh0QnVsbGV0ICgpIHtcbiAgICBpZiAob3JkZXJlZCkge1xuICAgICAgcmV0dXJuIHBhZCgobnVtKyspICsgJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhZChidWxsZXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UHJlZml4ZWRJdGVtICh0ZXh0KSB7XG4gICAgdmFyIHJtYXJrZXJzID0gL15bIF17MCwzfShbKistXXxcXGQrWy5dKVxccy9nbTtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHJtYXJrZXJzLCBuZXh0QnVsbGV0KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsaW5lTGVuZ3RoOiA3MlxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHByZWZpeGVzID0gJyg/OlxcXFxzezQsfXxcXFxccyo+fFxcXFxzKi1cXFxccyt8XFxcXHMqXFxcXGQrXFxcXC58PXxcXFxcK3wtfF98XFxcXCp8I3xcXFxccypcXFxcW1teXFxuXV0rXFxcXF06KSc7XG52YXIgcmxlYWRpbmdwcmVmaXhlcyA9IG5ldyBSZWdFeHAoJ14nICsgcHJlZml4ZXMsICcnKTtcbnZhciBydGV4dCA9IG5ldyBSZWdFeHAoJyhbXlxcXFxuXSlcXFxcbig/IShcXFxcbnwnICsgcHJlZml4ZXMgKyAnKSknLCAnZycpO1xudmFyIHJ0cmFpbGluZ3NwYWNlcyA9IC9cXHMrJC87XG5cbmZ1bmN0aW9uIHdyYXAgKGNodW5rcywgbGVuKSB7XG4gIHZhciByZWdleCA9IG5ldyBSZWdFeHAoJyguezEsJyArIGxlbiArICd9KSggK3wkXFxcXG4/KScsICdnbScpO1xuXG4gIHVud3JhcChjaHVua3MpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvblxuICAgIC5yZXBsYWNlKHJlZ2V4LCByZXBsYWNlcilcbiAgICAucmVwbGFjZShydHJhaWxpbmdzcGFjZXMsICcnKTtcblxuICBmdW5jdGlvbiByZXBsYWNlciAobGluZSwgbWFya2VkKSB7XG4gICAgcmV0dXJuIHJsZWFkaW5ncHJlZml4ZXMudGVzdChsaW5lKSA/IGxpbmUgOiBtYXJrZWQgKyAnXFxuJztcbiAgfVxufVxuXG5mdW5jdGlvbiB1bndyYXAgKGNodW5rcykge1xuICBydGV4dC5sYXN0SW5kZXggPSAwO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJ0ZXh0LCAnJDEgJDInKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHdyYXA6IHdyYXAsXG4gIHVud3JhcDogdW53cmFwXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbmNlIChmbikge1xuICB2YXIgZGlzcG9zZWQ7XG4gIHJldHVybiBmdW5jdGlvbiBkaXNwb3NhYmxlICgpIHtcbiAgICBpZiAoZGlzcG9zZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGlzcG9zZWQgPSB0cnVlO1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9uY2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBkb2N1bWVudDtcblxuZnVuY3Rpb24gaG9tZWJyZXdRU0EgKGNsYXNzTmFtZSkge1xuICB2YXIgcmVzdWx0cyA9IFtdO1xuICB2YXIgYWxsID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7XG4gIHZhciBpO1xuICBmb3IgKGkgaW4gYWxsKSB7XG4gICAgaWYgKHdyYXAoYWxsW2ldLmNsYXNzTmFtZSkuaW5kZXhPZih3cmFwKGNsYXNzTmFtZSkpICE9PSAtMSkge1xuICAgICAgcmVzdWx0cy5wdXNoKGFsbFtpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiB3cmFwICh0ZXh0KSB7XG4gIHJldHVybiAnICcgKyB0ZXh0ICsgJyAnO1xufVxuXG5mdW5jdGlvbiBjbG9zZVByb21wdHMgKCkge1xuICBpZiAoZG9jLmJvZHkucXVlcnlTZWxlY3RvckFsbCkge1xuICAgIHJlbW92ZShkb2MuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCcud2stcHJvbXB0JykpO1xuICB9IGVsc2Uge1xuICAgIHJlbW92ZShob21lYnJld1FTQSgnd2stcHJvbXB0JykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAocHJvbXB0cykge1xuICB2YXIgbGVuID0gcHJvbXB0cy5sZW5ndGg7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBwcm9tcHRzW2ldLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQocHJvbXB0c1tpXSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9zZVByb21wdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBidXJlYXVjcmFjeSA9IHJlcXVpcmUoJ2J1cmVhdWNyYWN5Jyk7XG52YXIgcmVuZGVyID0gcmVxdWlyZSgnLi9yZW5kZXInKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi4vY2xhc3NlcycpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgdXBsb2FkcyA9IHJlcXVpcmUoJy4uL3VwbG9hZHMnKTtcbnZhciBFTlRFUl9LRVkgPSAxMztcbnZhciBFU0NBUEVfS0VZID0gMjc7XG52YXIgZHJhZ0NsYXNzID0gJ3drLWRyYWdnaW5nJztcbnZhciBkcmFnQ2xhc3NTcGVjaWZpYyA9ICd3ay1wcm9tcHQtdXBsb2FkLWRyYWdnaW5nJztcbnZhciByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5mdW5jdGlvbiBjbGFzc2lmeSAoZ3JvdXAsIGNsYXNzZXMpIHtcbiAgT2JqZWN0LmtleXMoZ3JvdXApLmZvckVhY2goY3VzdG9taXplKTtcbiAgZnVuY3Rpb24gY3VzdG9taXplIChrZXkpIHtcbiAgICBpZiAoY2xhc3Nlc1trZXldKSB7XG4gICAgICBncm91cFtrZXldLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc2VzW2tleV07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHByb21wdCAob3B0aW9ucywgZG9uZSkge1xuICB2YXIgdGV4dCA9IHN0cmluZ3MucHJvbXB0c1tvcHRpb25zLnR5cGVdO1xuICB2YXIgZG9tID0gcmVuZGVyKHtcbiAgICBpZDogJ3drLXByb21wdC0nICsgb3B0aW9ucy50eXBlLFxuICAgIHRpdGxlOiB0ZXh0LnRpdGxlLFxuICAgIGRlc2NyaXB0aW9uOiB0ZXh0LmRlc2NyaXB0aW9uLFxuICAgIHBsYWNlaG9sZGVyOiB0ZXh0LnBsYWNlaG9sZGVyXG4gIH0pO1xuICB2YXIgZG9tdXA7XG5cbiAgY3Jvc3N2ZW50LmFkZChkb20uY2FuY2VsLCAnY2xpY2snLCByZW1vdmUpO1xuICBjcm9zc3ZlbnQuYWRkKGRvbS5jbG9zZSwgJ2NsaWNrJywgcmVtb3ZlKTtcbiAgY3Jvc3N2ZW50LmFkZChkb20ub2ssICdjbGljaycsIG9rKTtcbiAgY3Jvc3N2ZW50LmFkZChkb20uaW5wdXQsICdrZXlwcmVzcycsIGVudGVyKTtcbiAgY3Jvc3N2ZW50LmFkZChkb20uZGlhbG9nLCAna2V5ZG93bicsIGVzYyk7XG4gIGNsYXNzaWZ5KGRvbSwgb3B0aW9ucy5jbGFzc2VzLnByb21wdHMpO1xuXG4gIHZhciB1cGxvYWQgPSBvcHRpb25zLnVwbG9hZDtcbiAgaWYgKHR5cGVvZiB1cGxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgdXBsb2FkID0geyB1cmw6IHVwbG9hZCB9O1xuICB9XG5cbiAgdmFyIGJ1cmVhdWNyYXQgPSBudWxsO1xuICBpZiAodXBsb2FkKSB7XG4gICAgYnVyZWF1Y3JhdCA9IGFycmFuZ2VVcGxvYWRzKCk7XG4gICAgaWYgKG9wdGlvbnMuYXV0b1VwbG9hZCkge1xuICAgICAgYnVyZWF1Y3JhdC5zdWJtaXQob3B0aW9ucy5hdXRvVXBsb2FkKTtcbiAgICB9XG4gIH1cblxuICBzZXRUaW1lb3V0KGZvY3VzRGlhbG9nLCAwKTtcblxuICBmdW5jdGlvbiBmb2N1c0RpYWxvZyAoKSB7XG4gICAgZG9tLmlucHV0LmZvY3VzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBlbnRlciAoZSkge1xuICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAoa2V5ID09PSBFTlRFUl9LRVkpIHtcbiAgICAgIG9rKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXNjIChlKSB7XG4gICAgdmFyIGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmIChrZXkgPT09IEVTQ0FQRV9LRVkpIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9rICgpIHtcbiAgICByZW1vdmUoKTtcbiAgICBkb25lKHsgZGVmaW5pdGlvbnM6IFtkb20uaW5wdXQudmFsdWVdIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlICgpIHtcbiAgICBpZiAodXBsb2FkKSB7IGJpbmRVcGxvYWRFdmVudHModHJ1ZSk7IH1cbiAgICBpZiAoZG9tLmRpYWxvZy5wYXJlbnRFbGVtZW50KSB7IGRvbS5kaWFsb2cucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChkb20uZGlhbG9nKTsgfVxuICAgIG9wdGlvbnMuc3VyZmFjZS5mb2N1cyhvcHRpb25zLm1vZGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYmluZFVwbG9hZEV2ZW50cyAocmVtb3ZlKSB7XG4gICAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdkcmFnZW50ZXInLCBkcmFnZ2luZyk7XG4gICAgY3Jvc3N2ZW50W29wXShyb290LCAnZHJhZ2VuZCcsIGRyYWdzdG9wKTtcbiAgICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdtb3VzZW91dCcsIGRyYWdzdG9wKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYWdnaW5nICgpIHtcbiAgICBjbGFzc2VzLmFkZChkb211cC5hcmVhLCBkcmFnQ2xhc3MpO1xuICAgIGNsYXNzZXMuYWRkKGRvbXVwLmFyZWEsIGRyYWdDbGFzc1NwZWNpZmljKTtcbiAgfVxuICBmdW5jdGlvbiBkcmFnc3RvcCAoKSB7XG4gICAgY2xhc3Nlcy5ybShkb211cC5hcmVhLCBkcmFnQ2xhc3MpO1xuICAgIGNsYXNzZXMucm0oZG9tdXAuYXJlYSwgZHJhZ0NsYXNzU3BlY2lmaWMpO1xuICAgIHVwbG9hZHMuc3RvcChvcHRpb25zLnN1cmZhY2UuZHJvcGFyZWEpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXJyYW5nZVVwbG9hZHMgKCkge1xuICAgIGRvbXVwID0gcmVuZGVyLnVwbG9hZHMoZG9tLCBzdHJpbmdzLnByb21wdHMudHlwZXMgKyAodXBsb2FkLnJlc3RyaWN0aW9uIHx8IG9wdGlvbnMudHlwZSArICdzJykpO1xuICAgIGJpbmRVcGxvYWRFdmVudHMoKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGRvbXVwLmFyZWEsICdkcmFnb3ZlcicsIGhhbmRsZURyYWdPdmVyLCBmYWxzZSk7XG4gICAgY3Jvc3N2ZW50LmFkZChkb211cC5hcmVhLCAnZHJvcCcsIGhhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcbiAgICBjbGFzc2lmeShkb211cCwgb3B0aW9ucy5jbGFzc2VzLnByb21wdHMpO1xuXG4gICAgdmFyIGJ1cmVhdWNyYXQgPSBidXJlYXVjcmFjeS5zZXR1cChkb211cC5maWxlaW5wdXQsIHtcbiAgICAgIG1ldGhvZDogdXBsb2FkLm1ldGhvZCxcbiAgICAgIGZvcm1EYXRhOiB1cGxvYWQuZm9ybURhdGEsXG4gICAgICBlbmRwb2ludDogdXBsb2FkLnVybCxcbiAgICAgIHZhbGlkYXRlOiAnaW1hZ2UnXG4gICAgfSk7XG5cbiAgICBidXJlYXVjcmF0Lm9uKCdzdGFydGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2xhc3Nlcy5ybShkb211cC5mYWlsZWQsICd3ay1wcm9tcHQtZXJyb3Itc2hvdycpO1xuICAgICAgY2xhc3Nlcy5ybShkb211cC53YXJuaW5nLCAnd2stcHJvbXB0LWVycm9yLXNob3cnKTtcbiAgICB9KTtcbiAgICBidXJlYXVjcmF0Lm9uKCd2YWxpZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNsYXNzZXMuYWRkKGRvbXVwLmFyZWEsICd3ay1wcm9tcHQtdXBsb2FkaW5nJyk7XG4gICAgfSk7XG4gICAgYnVyZWF1Y3JhdC5vbignaW52YWxpZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNsYXNzZXMuYWRkKGRvbXVwLndhcm5pbmcsICd3ay1wcm9tcHQtZXJyb3Itc2hvdycpO1xuICAgIH0pO1xuICAgIGJ1cmVhdWNyYXQub24oJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2xhc3Nlcy5hZGQoZG9tdXAuZmFpbGVkLCAnd2stcHJvbXB0LWVycm9yLXNob3cnKTtcbiAgICB9KTtcbiAgICBidXJlYXVjcmF0Lm9uKCdzdWNjZXNzJywgcmVjZWl2ZWRJbWFnZXMpO1xuICAgIGJ1cmVhdWNyYXQub24oJ2VuZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2xhc3Nlcy5ybShkb211cC5hcmVhLCAnd2stcHJvbXB0LXVwbG9hZGluZycpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJ1cmVhdWNyYXQ7XG5cbiAgICBmdW5jdGlvbiByZWNlaXZlZEltYWdlcyAocmVzdWx0cykge1xuICAgICAgdmFyIGJvZHkgPSByZXN1bHRzWzBdO1xuICAgICAgZG9tLmlucHV0LnZhbHVlID0gYm9keS5ocmVmICsgJyBcIicgKyBib2R5LnRpdGxlICsgJ1wiJztcbiAgICAgIHJlbW92ZSgpO1xuICAgICAgZG9uZSh7XG4gICAgICAgIGRlZmluaXRpb25zOiByZXN1bHRzLm1hcCh0b0RlZmluaXRpb24pLFxuICAgICAgICBhdHRhY2htZW50OiBvcHRpb25zLnR5cGUgPT09ICdhdHRhY2htZW50J1xuICAgICAgfSk7XG4gICAgICBmdW5jdGlvbiB0b0RlZmluaXRpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0LmhyZWYgKyAnIFwiJyArIHJlc3VsdC50aXRsZSArICdcIic7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIgKGUpIHtcbiAgICBzdG9wKGUpO1xuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVGaWxlU2VsZWN0IChlKSB7XG4gICAgZHJhZ3N0b3AoKTtcbiAgICBzdG9wKGUpO1xuICAgIGJ1cmVhdWNyYXQuc3VibWl0KGUuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AgKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb21wdDtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGdldFRleHQgPSByZXF1aXJlKCcuLi9nZXRUZXh0Jyk7XG52YXIgc2V0VGV4dCA9IHJlcXVpcmUoJy4uL3NldFRleHQnKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi4vY2xhc3NlcycpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgYWMgPSAnYXBwZW5kQ2hpbGQnO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcblxuZnVuY3Rpb24gZSAodHlwZSwgY2xzLCB0ZXh0KSB7XG4gIHZhciBlbCA9IGRvYy5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBlbC5jbGFzc05hbWUgPSBjbHM7XG4gIGlmICh0ZXh0KSB7XG4gICAgc2V0VGV4dChlbCwgdGV4dCk7XG4gIH1cbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiByZW5kZXIgKG9wdGlvbnMpIHtcbiAgdmFyIGRvbSA9IHtcbiAgICBkaWFsb2c6IGUoJ2FydGljbGUnLCAnd2stcHJvbXB0ICcgKyBvcHRpb25zLmlkKSxcbiAgICBjbG9zZTogZSgnYScsICd3ay1wcm9tcHQtY2xvc2UnKSxcbiAgICBoZWFkZXI6IGUoJ2hlYWRlcicsICd3ay1wcm9tcHQtaGVhZGVyJyksXG4gICAgaDE6IGUoJ2gxJywgJ3drLXByb21wdC10aXRsZScsIG9wdGlvbnMudGl0bGUpLFxuICAgIHNlY3Rpb246IGUoJ3NlY3Rpb24nLCAnd2stcHJvbXB0LWJvZHknKSxcbiAgICBkZXNjOiBlKCdwJywgJ3drLXByb21wdC1kZXNjcmlwdGlvbicsIG9wdGlvbnMuZGVzY3JpcHRpb24pLFxuICAgIGlucHV0Q29udGFpbmVyOiBlKCdkaXYnLCAnd2stcHJvbXB0LWlucHV0LWNvbnRhaW5lcicpLFxuICAgIGlucHV0OiBlKCdpbnB1dCcsICd3ay1wcm9tcHQtaW5wdXQnKSxcbiAgICBjYW5jZWw6IGUoJ2J1dHRvbicsICd3ay1wcm9tcHQtY2FuY2VsJywgJ0NhbmNlbCcpLFxuICAgIG9rOiBlKCdidXR0b24nLCAnd2stcHJvbXB0LW9rJywgJ09rJyksXG4gICAgZm9vdGVyOiBlKCdmb290ZXInLCAnd2stcHJvbXB0LWJ1dHRvbnMnKVxuICB9O1xuICBkb20ub2sudHlwZSA9ICdidXR0b24nO1xuICBkb20uaGVhZGVyW2FjXShkb20uaDEpO1xuICBkb20uc2VjdGlvblthY10oZG9tLmRlc2MpO1xuICBkb20uc2VjdGlvblthY10oZG9tLmlucHV0Q29udGFpbmVyKTtcbiAgZG9tLmlucHV0Q29udGFpbmVyW2FjXShkb20uaW5wdXQpO1xuICBkb20uaW5wdXQucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyO1xuICBkb20uY2FuY2VsLnR5cGUgPSAnYnV0dG9uJztcbiAgZG9tLmZvb3RlclthY10oZG9tLmNhbmNlbCk7XG4gIGRvbS5mb290ZXJbYWNdKGRvbS5vayk7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5jbG9zZSk7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5oZWFkZXIpO1xuICBkb20uZGlhbG9nW2FjXShkb20uc2VjdGlvbik7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5mb290ZXIpO1xuICBkb2MuYm9keVthY10oZG9tLmRpYWxvZyk7XG4gIHJldHVybiBkb207XG59XG5cbmZ1bmN0aW9uIHVwbG9hZHMgKGRvbSwgd2FybmluZykge1xuICB2YXIgZnVwID0gJ3drLXByb21wdC1maWxldXBsb2FkJztcbiAgdmFyIGRvbXVwID0ge1xuICAgIGFyZWE6IGUoJ3NlY3Rpb24nLCAnd2stcHJvbXB0LXVwbG9hZC1hcmVhJyksXG4gICAgd2FybmluZzogZSgncCcsICd3ay1wcm9tcHQtZXJyb3Igd2std2FybmluZycsIHdhcm5pbmcpLFxuICAgIGZhaWxlZDogZSgncCcsICd3ay1wcm9tcHQtZXJyb3Igd2stZmFpbGVkJywgc3RyaW5ncy5wcm9tcHRzLnVwbG9hZGZhaWxlZCksXG4gICAgdXBsb2FkOiBlKCdsYWJlbCcsICd3ay1wcm9tcHQtdXBsb2FkJyksXG4gICAgdXBsb2FkaW5nOiBlKCdzcGFuJywgJ3drLXByb21wdC1wcm9ncmVzcycsIHN0cmluZ3MucHJvbXB0cy51cGxvYWRpbmcpLFxuICAgIGRyb3A6IGUoJ3NwYW4nLCAnd2stcHJvbXB0LWRyb3AnLCBzdHJpbmdzLnByb21wdHMuZHJvcCksXG4gICAgZHJvcGljb246IGUoJ3AnLCAnd2stZHJvcC1pY29uIHdrLXByb21wdC1kcm9wLWljb24nKSxcbiAgICBicm93c2U6IGUoJ3NwYW4nLCAnd2stcHJvbXB0LWJyb3dzZScsIHN0cmluZ3MucHJvbXB0cy5icm93c2UpLFxuICAgIGRyYWdkcm9wOiBlKCdwJywgJ3drLXByb21wdC1kcmFnZHJvcCcsIHN0cmluZ3MucHJvbXB0cy5kcm9waGludCksXG4gICAgZmlsZWlucHV0OiBlKCdpbnB1dCcsIGZ1cClcbiAgfTtcbiAgZG9tdXAuYXJlYVthY10oZG9tdXAuZHJvcCk7XG4gIGRvbXVwLmFyZWFbYWNdKGRvbXVwLnVwbG9hZGluZyk7XG4gIGRvbXVwLmFyZWFbYWNdKGRvbXVwLmRyb3BpY29uKTtcbiAgZG9tdXAudXBsb2FkW2FjXShkb211cC5icm93c2UpO1xuICBkb211cC51cGxvYWRbYWNdKGRvbXVwLmZpbGVpbnB1dCk7XG4gIGRvbXVwLmZpbGVpbnB1dC5pZCA9IGZ1cDtcbiAgZG9tdXAuZmlsZWlucHV0LnR5cGUgPSAnZmlsZSc7XG4gIGRvbXVwLmZpbGVpbnB1dC5tdWx0aXBsZSA9ICdtdWx0aXBsZSc7XG4gIGRvbS5kaWFsb2cuY2xhc3NOYW1lICs9ICcgd2stcHJvbXB0LXVwbG9hZHMnO1xuICBkb20uaW5wdXRDb250YWluZXIuY2xhc3NOYW1lICs9ICcgd2stcHJvbXB0LWlucHV0LWNvbnRhaW5lci11cGxvYWRzJztcbiAgZG9tLmlucHV0LmNsYXNzTmFtZSArPSAnIHdrLXByb21wdC1pbnB1dC11cGxvYWRzJztcbiAgZG9tLnNlY3Rpb24uaW5zZXJ0QmVmb3JlKGRvbXVwLndhcm5pbmcsIGRvbS5pbnB1dENvbnRhaW5lcik7XG4gIGRvbS5zZWN0aW9uLmluc2VydEJlZm9yZShkb211cC5mYWlsZWQsIGRvbS5pbnB1dENvbnRhaW5lcik7XG4gIGRvbS5zZWN0aW9uW2FjXShkb211cC51cGxvYWQpO1xuICBkb20uc2VjdGlvblthY10oZG9tdXAuZHJhZ2Ryb3ApO1xuICBkb20uc2VjdGlvblthY10oZG9tdXAuYXJlYSk7XG4gIHNldFRleHQoZG9tLmRlc2MsIGdldFRleHQoZG9tLmRlc2MpICsgc3RyaW5ncy5wcm9tcHRzLnVwbG9hZCk7XG4gIGNyb3NzdmVudC5hZGQoZG9tdXAuZmlsZWlucHV0LCAnZm9jdXMnLCBmb2N1c2VkRmlsZUlucHV0KTtcbiAgY3Jvc3N2ZW50LmFkZChkb211cC5maWxlaW5wdXQsICdibHVyJywgYmx1cnJlZEZpbGVJbnB1dCk7XG5cbiAgZnVuY3Rpb24gZm9jdXNlZEZpbGVJbnB1dCAoKSB7XG4gICAgY2xhc3Nlcy5hZGQoZG9tdXAudXBsb2FkLCAnd2stZm9jdXNlZCcpO1xuICB9XG4gIGZ1bmN0aW9uIGJsdXJyZWRGaWxlSW5wdXQgKCkge1xuICAgIGNsYXNzZXMucm0oZG9tdXAudXBsb2FkLCAnd2stZm9jdXNlZCcpO1xuICB9XG4gIHJldHVybiBkb211cDtcbn1cblxucmVuZGVyLnVwbG9hZHMgPSB1cGxvYWRzO1xubW9kdWxlLmV4cG9ydHMgPSByZW5kZXI7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OXdjbTl0Y0hSekwzSmxibVJsY2k1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQmpjbTl6YzNabGJuUWdQU0J5WlhGMWFYSmxLQ2RqY205emMzWmxiblFuS1R0Y2JuWmhjaUJuWlhSVVpYaDBJRDBnY21WeGRXbHlaU2duTGk0dloyVjBWR1Y0ZENjcE8xeHVkbUZ5SUhObGRGUmxlSFFnUFNCeVpYRjFhWEpsS0NjdUxpOXpaWFJVWlhoMEp5azdYRzUyWVhJZ1kyeGhjM05sY3lBOUlISmxjWFZwY21Vb0p5NHVMMk5zWVhOelpYTW5LVHRjYm5aaGNpQnpkSEpwYm1keklEMGdjbVZ4ZFdseVpTZ25MaTR2YzNSeWFXNW5jeWNwTzF4dWRtRnlJR0ZqSUQwZ0oyRndjR1Z1WkVOb2FXeGtKenRjYm5aaGNpQmtiMk1nUFNCbmJHOWlZV3d1Wkc5amRXMWxiblE3WEc1Y2JtWjFibU4wYVc5dUlHVWdLSFI1Y0dVc0lHTnNjeXdnZEdWNGRDa2dlMXh1SUNCMllYSWdaV3dnUFNCa2IyTXVZM0psWVhSbFJXeGxiV1Z1ZENoMGVYQmxLVHRjYmlBZ1pXd3VZMnhoYzNOT1lXMWxJRDBnWTJ4ek8xeHVJQ0JwWmlBb2RHVjRkQ2tnZTF4dUlDQWdJSE5sZEZSbGVIUW9aV3dzSUhSbGVIUXBPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQmxiRHRjYm4xY2JseHVablZ1WTNScGIyNGdjbVZ1WkdWeUlDaHZjSFJwYjI1ektTQjdYRzRnSUhaaGNpQmtiMjBnUFNCN1hHNGdJQ0FnWkdsaGJHOW5PaUJsS0NkaGNuUnBZMnhsSnl3Z0ozZHJMWEJ5YjIxd2RDQW5JQ3NnYjNCMGFXOXVjeTVwWkNrc1hHNGdJQ0FnWTJ4dmMyVTZJR1VvSjJFbkxDQW5kMnN0Y0hKdmJYQjBMV05zYjNObEp5a3NYRzRnSUNBZ2FHVmhaR1Z5T2lCbEtDZG9aV0ZrWlhJbkxDQW5kMnN0Y0hKdmJYQjBMV2hsWVdSbGNpY3BMRnh1SUNBZ0lHZ3hPaUJsS0Nkb01TY3NJQ2QzYXkxd2NtOXRjSFF0ZEdsMGJHVW5MQ0J2Y0hScGIyNXpMblJwZEd4bEtTeGNiaUFnSUNCelpXTjBhVzl1T2lCbEtDZHpaV04wYVc5dUp5d2dKM2RyTFhCeWIyMXdkQzFpYjJSNUp5a3NYRzRnSUNBZ1pHVnpZem9nWlNnbmNDY3NJQ2QzYXkxd2NtOXRjSFF0WkdWelkzSnBjSFJwYjI0bkxDQnZjSFJwYjI1ekxtUmxjMk55YVhCMGFXOXVLU3hjYmlBZ0lDQnBibkIxZEVOdmJuUmhhVzVsY2pvZ1pTZ25aR2wySnl3Z0ozZHJMWEJ5YjIxd2RDMXBibkIxZEMxamIyNTBZV2x1WlhJbktTeGNiaUFnSUNCcGJuQjFkRG9nWlNnbmFXNXdkWFFuTENBbmQyc3RjSEp2YlhCMExXbHVjSFYwSnlrc1hHNGdJQ0FnWTJGdVkyVnNPaUJsS0NkaWRYUjBiMjRuTENBbmQyc3RjSEp2YlhCMExXTmhibU5sYkNjc0lDZERZVzVqWld3bktTeGNiaUFnSUNCdmF6b2daU2duWW5WMGRHOXVKeXdnSjNkckxYQnliMjF3ZEMxdmF5Y3NJQ2RQYXljcExGeHVJQ0FnSUdadmIzUmxjam9nWlNnblptOXZkR1Z5Snl3Z0ozZHJMWEJ5YjIxd2RDMWlkWFIwYjI1ekp5bGNiaUFnZlR0Y2JpQWdaRzl0TG05ckxuUjVjR1VnUFNBblluVjBkRzl1Snp0Y2JpQWdaRzl0TG1obFlXUmxjbHRoWTEwb1pHOXRMbWd4S1R0Y2JpQWdaRzl0TG5ObFkzUnBiMjViWVdOZEtHUnZiUzVrWlhOaktUdGNiaUFnWkc5dExuTmxZM1JwYjI1YllXTmRLR1J2YlM1cGJuQjFkRU52Ym5SaGFXNWxjaWs3WEc0Z0lHUnZiUzVwYm5CMWRFTnZiblJoYVc1bGNsdGhZMTBvWkc5dExtbHVjSFYwS1R0Y2JpQWdaRzl0TG1sdWNIVjBMbkJzWVdObGFHOXNaR1Z5SUQwZ2IzQjBhVzl1Y3k1d2JHRmpaV2h2YkdSbGNqdGNiaUFnWkc5dExtTmhibU5sYkM1MGVYQmxJRDBnSjJKMWRIUnZiaWM3WEc0Z0lHUnZiUzVtYjI5MFpYSmJZV05kS0dSdmJTNWpZVzVqWld3cE8xeHVJQ0JrYjIwdVptOXZkR1Z5VzJGalhTaGtiMjB1YjJzcE8xeHVJQ0JrYjIwdVpHbGhiRzluVzJGalhTaGtiMjB1WTJ4dmMyVXBPMXh1SUNCa2IyMHVaR2xoYkc5blcyRmpYU2hrYjIwdWFHVmhaR1Z5S1R0Y2JpQWdaRzl0TG1ScFlXeHZaMXRoWTEwb1pHOXRMbk5sWTNScGIyNHBPMXh1SUNCa2IyMHVaR2xoYkc5blcyRmpYU2hrYjIwdVptOXZkR1Z5S1R0Y2JpQWdaRzlqTG1KdlpIbGJZV05kS0dSdmJTNWthV0ZzYjJjcE8xeHVJQ0J5WlhSMWNtNGdaRzl0TzF4dWZWeHVYRzVtZFc1amRHbHZiaUIxY0d4dllXUnpJQ2hrYjIwc0lIZGhjbTVwYm1jcElIdGNiaUFnZG1GeUlHWjFjQ0E5SUNkM2F5MXdjbTl0Y0hRdFptbHNaWFZ3Ykc5aFpDYzdYRzRnSUhaaGNpQmtiMjExY0NBOUlIdGNiaUFnSUNCaGNtVmhPaUJsS0NkelpXTjBhVzl1Snl3Z0ozZHJMWEJ5YjIxd2RDMTFjR3h2WVdRdFlYSmxZU2NwTEZ4dUlDQWdJSGRoY201cGJtYzZJR1VvSjNBbkxDQW5kMnN0Y0hKdmJYQjBMV1Z5Y205eUlIZHJMWGRoY201cGJtY25MQ0IzWVhKdWFXNW5LU3hjYmlBZ0lDQm1ZV2xzWldRNklHVW9KM0FuTENBbmQyc3RjSEp2YlhCMExXVnljbTl5SUhkckxXWmhhV3hsWkNjc0lITjBjbWx1WjNNdWNISnZiWEIwY3k1MWNHeHZZV1JtWVdsc1pXUXBMRnh1SUNBZ0lIVndiRzloWkRvZ1pTZ25iR0ZpWld3bkxDQW5kMnN0Y0hKdmJYQjBMWFZ3Ykc5aFpDY3BMRnh1SUNBZ0lIVndiRzloWkdsdVp6b2daU2duYzNCaGJpY3NJQ2QzYXkxd2NtOXRjSFF0Y0hKdlozSmxjM01uTENCemRISnBibWR6TG5CeWIyMXdkSE11ZFhCc2IyRmthVzVuS1N4Y2JpQWdJQ0JrY205d09pQmxLQ2R6Y0dGdUp5d2dKM2RyTFhCeWIyMXdkQzFrY205d0p5d2djM1J5YVc1bmN5NXdjbTl0Y0hSekxtUnliM0FwTEZ4dUlDQWdJR1J5YjNCcFkyOXVPaUJsS0Nkd0p5d2dKM2RyTFdSeWIzQXRhV052YmlCM2F5MXdjbTl0Y0hRdFpISnZjQzFwWTI5dUp5a3NYRzRnSUNBZ1luSnZkM05sT2lCbEtDZHpjR0Z1Snl3Z0ozZHJMWEJ5YjIxd2RDMWljbTkzYzJVbkxDQnpkSEpwYm1kekxuQnliMjF3ZEhNdVluSnZkM05sS1N4Y2JpQWdJQ0JrY21GblpISnZjRG9nWlNnbmNDY3NJQ2QzYXkxd2NtOXRjSFF0WkhKaFoyUnliM0FuTENCemRISnBibWR6TG5CeWIyMXdkSE11WkhKdmNHaHBiblFwTEZ4dUlDQWdJR1pwYkdWcGJuQjFkRG9nWlNnbmFXNXdkWFFuTENCbWRYQXBYRzRnSUgwN1hHNGdJR1J2YlhWd0xtRnlaV0ZiWVdOZEtHUnZiWFZ3TG1SeWIzQXBPMXh1SUNCa2IyMTFjQzVoY21WaFcyRmpYU2hrYjIxMWNDNTFjR3h2WVdScGJtY3BPMXh1SUNCa2IyMTFjQzVoY21WaFcyRmpYU2hrYjIxMWNDNWtjbTl3YVdOdmJpazdYRzRnSUdSdmJYVndMblZ3Ykc5aFpGdGhZMTBvWkc5dGRYQXVZbkp2ZDNObEtUdGNiaUFnWkc5dGRYQXVkWEJzYjJGa1cyRmpYU2hrYjIxMWNDNW1hV3hsYVc1d2RYUXBPMXh1SUNCa2IyMTFjQzVtYVd4bGFXNXdkWFF1YVdRZ1BTQm1kWEE3WEc0Z0lHUnZiWFZ3TG1acGJHVnBibkIxZEM1MGVYQmxJRDBnSjJacGJHVW5PMXh1SUNCa2IyMTFjQzVtYVd4bGFXNXdkWFF1YlhWc2RHbHdiR1VnUFNBbmJYVnNkR2x3YkdVbk8xeHVJQ0JrYjIwdVpHbGhiRzluTG1Oc1lYTnpUbUZ0WlNBclBTQW5JSGRyTFhCeWIyMXdkQzExY0d4dllXUnpKenRjYmlBZ1pHOXRMbWx1Y0hWMFEyOXVkR0ZwYm1WeUxtTnNZWE56VG1GdFpTQXJQU0FuSUhkckxYQnliMjF3ZEMxcGJuQjFkQzFqYjI1MFlXbHVaWEl0ZFhCc2IyRmtjeWM3WEc0Z0lHUnZiUzVwYm5CMWRDNWpiR0Z6YzA1aGJXVWdLejBnSnlCM2F5MXdjbTl0Y0hRdGFXNXdkWFF0ZFhCc2IyRmtjeWM3WEc0Z0lHUnZiUzV6WldOMGFXOXVMbWx1YzJWeWRFSmxabTl5WlNoa2IyMTFjQzUzWVhKdWFXNW5MQ0JrYjIwdWFXNXdkWFJEYjI1MFlXbHVaWElwTzF4dUlDQmtiMjB1YzJWamRHbHZiaTVwYm5ObGNuUkNaV1p2Y21Vb1pHOXRkWEF1Wm1GcGJHVmtMQ0JrYjIwdWFXNXdkWFJEYjI1MFlXbHVaWElwTzF4dUlDQmtiMjB1YzJWamRHbHZibHRoWTEwb1pHOXRkWEF1ZFhCc2IyRmtLVHRjYmlBZ1pHOXRMbk5sWTNScGIyNWJZV05kS0dSdmJYVndMbVJ5WVdka2NtOXdLVHRjYmlBZ1pHOXRMbk5sWTNScGIyNWJZV05kS0dSdmJYVndMbUZ5WldFcE8xeHVJQ0J6WlhSVVpYaDBLR1J2YlM1a1pYTmpMQ0JuWlhSVVpYaDBLR1J2YlM1a1pYTmpLU0FySUhOMGNtbHVaM011Y0hKdmJYQjBjeTUxY0d4dllXUXBPMXh1SUNCamNtOXpjM1psYm5RdVlXUmtLR1J2YlhWd0xtWnBiR1ZwYm5CMWRDd2dKMlp2WTNWekp5d2dabTlqZFhObFpFWnBiR1ZKYm5CMWRDazdYRzRnSUdOeWIzTnpkbVZ1ZEM1aFpHUW9aRzl0ZFhBdVptbHNaV2x1Y0hWMExDQW5ZbXgxY2ljc0lHSnNkWEp5WldSR2FXeGxTVzV3ZFhRcE8xeHVYRzRnSUdaMWJtTjBhVzl1SUdadlkzVnpaV1JHYVd4bFNXNXdkWFFnS0NrZ2UxeHVJQ0FnSUdOc1lYTnpaWE11WVdSa0tHUnZiWFZ3TG5Wd2JHOWhaQ3dnSjNkckxXWnZZM1Z6WldRbktUdGNiaUFnZlZ4dUlDQm1kVzVqZEdsdmJpQmliSFZ5Y21Wa1JtbHNaVWx1Y0hWMElDZ3BJSHRjYmlBZ0lDQmpiR0Z6YzJWekxuSnRLR1J2YlhWd0xuVndiRzloWkN3Z0ozZHJMV1p2WTNWelpXUW5LVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdaRzl0ZFhBN1hHNTlYRzVjYm5KbGJtUmxjaTUxY0d4dllXUnpJRDBnZFhCc2IyRmtjenRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21WdVpHVnlPMXh1SWwxOSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJ1bGxzZXllID0gcmVxdWlyZSgnYnVsbHNleWUnKTtcblxuZnVuY3Rpb24gcmVtZW1iZXJTZWxlY3Rpb24gKGhpc3RvcnkpIHtcbiAgdmFyIGNvZGUgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE4KS5zdWJzdHIoMikucmVwbGFjZSgvXFxkKy9nLCAnJyk7XG4gIHZhciBvcGVuID0gJ1dvb2ZtYXJrU2VsZWN0aW9uT3Blbk1hcmtlcicgKyBjb2RlO1xuICB2YXIgY2xvc2UgPSAnV29vZm1hcmtTZWxlY3Rpb25DbG9zZU1hcmtlcicgKyBjb2RlO1xuICB2YXIgcm1hcmtlcnMgPSBuZXcgUmVnRXhwKG9wZW4gKyAnfCcgKyBjbG9zZSwgJ2cnKTtcbiAgcmV0dXJuIHtcbiAgICBtYXJrZXJzOiBtYXJrZXJzKCksXG4gICAgdW5tYXJrOiB1bm1hcmtcbiAgfTtcblxuICBmdW5jdGlvbiBtYXJrZXJzICgpIHtcbiAgICB2YXIgc3RhdGUgPSBoaXN0b3J5LnJlc2V0KCkuaW5wdXRTdGF0ZTtcbiAgICB2YXIgY2h1bmtzID0gc3RhdGUuZ2V0Q2h1bmtzKCk7XG4gICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gY2h1bmtzLmJlZm9yZS5sZW5ndGg7XG4gICAgdmFyIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvblN0YXJ0ICsgY2h1bmtzLnNlbGVjdGlvbi5sZW5ndGg7XG4gICAgcmV0dXJuIFtbc2VsZWN0aW9uU3RhcnQsIG9wZW5dLCBbc2VsZWN0aW9uRW5kLCBjbG9zZV1dO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5tYXJrICgpIHtcbiAgICB2YXIgc3RhdGUgPSBoaXN0b3J5LmlucHV0U3RhdGU7XG4gICAgdmFyIGNodW5rcyA9IHN0YXRlLmdldENodW5rcygpO1xuICAgIHZhciBhbGwgPSBjaHVua3MuYmVmb3JlICsgY2h1bmtzLnNlbGVjdGlvbiArIGNodW5rcy5hZnRlcjtcbiAgICB2YXIgc3RhcnQgPSBhbGwubGFzdEluZGV4T2Yob3Blbik7XG4gICAgdmFyIGVuZCA9IGFsbC5sYXN0SW5kZXhPZihjbG9zZSkgKyBjbG9zZS5sZW5ndGg7XG4gICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gc3RhcnQgPT09IC0xID8gMCA6IHN0YXJ0O1xuICAgIHZhciBzZWxlY3Rpb25FbmQgPSBlbmQgPT09IC0xID8gMCA6IGVuZDtcbiAgICBjaHVua3MuYmVmb3JlID0gYWxsLnN1YnN0cigwLCBzZWxlY3Rpb25TdGFydCkucmVwbGFjZShybWFya2VycywgJycpO1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBhbGwuc3Vic3RyKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQgLSBzZWxlY3Rpb25TdGFydCkucmVwbGFjZShybWFya2VycywgJycpO1xuICAgIGNodW5rcy5hZnRlciA9IGFsbC5zdWJzdHIoZW5kKS5yZXBsYWNlKHJtYXJrZXJzLCAnJyk7XG4gICAgdmFyIGVsID0gaGlzdG9yeS5zdXJmYWNlLmN1cnJlbnQoaGlzdG9yeS5pbnB1dE1vZGUpO1xuICAgIHZhciBleWUgPSBidWxsc2V5ZShlbCwge1xuICAgICAgY2FyZXQ6IHRydWUsIGF1dG91cGRhdGVUb0NhcmV0OiBmYWxzZSwgdHJhY2tpbmc6IGZhbHNlXG4gICAgfSk7XG4gICAgc3RhdGUuc2V0Q2h1bmtzKGNodW5rcyk7XG4gICAgc3RhdGUucmVzdG9yZShmYWxzZSk7XG4gICAgc3RhdGUuc2Nyb2xsVG9wID0gZWwuc2Nyb2xsVG9wID0gZXllLnJlYWQoKS55IC0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gNTA7XG4gICAgZXllLmRlc3Ryb3koKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbWVtYmVyU2VsZWN0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2V0VGV4dCA9IHJlcXVpcmUoJy4vc2V0VGV4dCcpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuL3N0cmluZ3MnKTtcblxuZnVuY3Rpb24gY29tbWFuZHMgKGVsLCBpZCkge1xuICBzZXRUZXh0KGVsLCBzdHJpbmdzLmJ1dHRvbnNbaWRdIHx8IGlkKTtcbn1cblxuZnVuY3Rpb24gbW9kZXMgKGVsLCBpZCkge1xuICB2YXIgdGV4dHMgPSB7XG4gICAgbWFya2Rvd246ICdtXFx1MjE5MycsXG4gICAgd3lzaXd5ZzogJ3d5c2l3eWcnXG4gIH07XG4gIHNldFRleHQoZWwsIHRleHRzW2lkXSB8fCBpZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtb2RlczogbW9kZXMsXG4gIGNvbW1hbmRzOiBjb21tYW5kc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gc2V0VGV4dCAoZWwsIHZhbHVlKSB7XG4gIGVsLmlubmVyVGV4dCA9IGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VGV4dDtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBsYWNlaG9sZGVyczoge1xuICAgIGJvbGQ6ICdzdHJvbmcgdGV4dCcsXG4gICAgaXRhbGljOiAnZW1waGFzaXplZCB0ZXh0JyxcbiAgICBxdW90ZTogJ3F1b3RlZCB0ZXh0JyxcbiAgICBjb2RlOiAnY29kZSBnb2VzIGhlcmUnLFxuICAgIGxpc3RpdGVtOiAnbGlzdCBpdGVtJyxcbiAgICBoZWFkaW5nOiAnSGVhZGluZyBUZXh0JyxcbiAgICBsaW5rOiAnbGluayB0ZXh0JyxcbiAgICBpbWFnZTogJ2ltYWdlIGRlc2NyaXB0aW9uJyxcbiAgICBhdHRhY2htZW50OiAnYXR0YWNobWVudCBkZXNjcmlwdGlvbidcbiAgfSxcbiAgdGl0bGVzOiB7XG4gICAgYm9sZDogJ1N0cm9uZyA8c3Ryb25nPiBDdHJsK0InLFxuICAgIGl0YWxpYzogJ0VtcGhhc2lzIDxlbT4gQ3RybCtJJyxcbiAgICBxdW90ZTogJ0Jsb2NrcXVvdGUgPGJsb2NrcXVvdGU+IEN0cmwrSicsXG4gICAgY29kZTogJ0NvZGUgU2FtcGxlIDxwcmU+PGNvZGU+IEN0cmwrRScsXG4gICAgb2w6ICdOdW1iZXJlZCBMaXN0IDxvbD4gQ3RybCtPJyxcbiAgICB1bDogJ0J1bGxldGVkIExpc3QgPHVsPiBDdHJsK1UnLFxuICAgIGhlYWRpbmc6ICdIZWFkaW5nIDxoMT4sIDxoMj4sIC4uLiBDdHJsK0QnLFxuICAgIGxpbms6ICdIeXBlcmxpbmsgPGE+IEN0cmwrSycsXG4gICAgaW1hZ2U6ICdJbWFnZSA8aW1nPiBDdHJsK0cnLFxuICAgIGF0dGFjaG1lbnQ6ICdBdHRhY2htZW50IEN0cmwrU2hpZnQrSycsXG4gICAgbWFya2Rvd246ICdNYXJrZG93biBNb2RlIEN0cmwrTScsXG4gICAgaHRtbDogJ0hUTUwgTW9kZSBDdHJsK0gnLFxuICAgIHd5c2l3eWc6ICdQcmV2aWV3IE1vZGUgQ3RybCtQJ1xuICB9LFxuICBidXR0b25zOiB7XG4gICAgYm9sZDogJ0InLFxuICAgIGl0YWxpYzogJ0knLFxuICAgIHF1b3RlOiAnXFx1MjAxYycsXG4gICAgY29kZTogJzwvPicsXG4gICAgb2w6ICcxLicsXG4gICAgdWw6ICdcXHUyOUJGJyxcbiAgICBoZWFkaW5nOiAnVHQnLFxuICAgIGxpbms6ICdMaW5rJyxcbiAgICBpbWFnZTogJ0ltYWdlJyxcbiAgICBhdHRhY2htZW50OiAnQXR0YWNobWVudCcsXG4gICAgaHI6ICdcXHUyMWI1J1xuICB9LFxuICBwcm9tcHRzOiB7XG4gICAgbGluazoge1xuICAgICAgdGl0bGU6ICdJbnNlcnQgTGluaycsXG4gICAgICBkZXNjcmlwdGlvbjogJ1R5cGUgb3IgcGFzdGUgdGhlIHVybCB0byB5b3VyIGxpbmsnLFxuICAgICAgcGxhY2Vob2xkZXI6ICdodHRwOi8vZXhhbXBsZS5jb20vIFwidGl0bGVcIidcbiAgICB9LFxuICAgIGltYWdlOiB7XG4gICAgICB0aXRsZTogJ0luc2VydCBJbWFnZScsXG4gICAgICBkZXNjcmlwdGlvbjogJ0VudGVyIHRoZSB1cmwgdG8geW91ciBpbWFnZScsXG4gICAgICBwbGFjZWhvbGRlcjogJ2h0dHA6Ly9leGFtcGxlLmNvbS9wdWJsaWMvaW1hZ2UucG5nIFwidGl0bGVcIidcbiAgICB9LFxuICAgIGF0dGFjaG1lbnQ6IHtcbiAgICAgIHRpdGxlOiAnQXR0YWNoIEZpbGUnLFxuICAgICAgZGVzY3JpcHRpb246ICdFbnRlciB0aGUgdXJsIHRvIHlvdXIgYXR0YWNobWVudCcsXG4gICAgICBwbGFjZWhvbGRlcjogJ2h0dHA6Ly9leGFtcGxlLmNvbS9wdWJsaWMvcmVwb3J0LnBkZiBcInRpdGxlXCInXG4gICAgfSxcbiAgICB0eXBlczogJ1lvdSBjYW4gb25seSB1cGxvYWQgJyxcbiAgICBicm93c2U6ICdCcm93c2UuLi4nLFxuICAgIGRyb3BoaW50OiAnWW91IGNhbiBhbHNvIGRyYWcgZmlsZXMgZnJvbSB5b3VyIGNvbXB1dGVyIGFuZCBkcm9wIHRoZW0gaGVyZSEnLFxuICAgIGRyb3A6ICdEcm9wIHlvdXIgZmlsZSBoZXJlIHRvIGJlZ2luIHVwbG9hZC4uLicsXG4gICAgdXBsb2FkOiAnLCBvciB1cGxvYWQgYSBmaWxlJyxcbiAgICB1cGxvYWRpbmc6ICdVcGxvYWRpbmcgeW91ciBmaWxlLi4uJyxcbiAgICB1cGxvYWRmYWlsZWQ6ICdUaGUgdXBsb2FkIGZhaWxlZCEgVGhhdFxcJ3MgYWxsIHdlIGtub3cuJ1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vY2xhc3NlcycpO1xudmFyIGRyYWdDbGFzcyA9ICd3ay1kcmFnZ2luZyc7XG52YXIgZHJhZ0NsYXNzU3BlY2lmaWMgPSAnd2stY29udGFpbmVyLWRyYWdnaW5nJztcbnZhciByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5mdW5jdGlvbiB1cGxvYWRzIChjb250YWluZXIsIGRyb3BhcmVhLCBlZGl0b3IsIG9wdGlvbnMsIHJlbW92ZSkge1xuICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdkcmFnZW50ZXInLCBkcmFnZ2luZyk7XG4gIGNyb3NzdmVudFtvcF0ocm9vdCwgJ2RyYWdlbmQnLCBkcmFnc3RvcCk7XG4gIGNyb3NzdmVudFtvcF0ocm9vdCwgJ21vdXNlb3V0JywgZHJhZ3N0b3ApO1xuICBjcm9zc3ZlbnRbb3BdKGNvbnRhaW5lciwgJ2RyYWdvdmVyJywgaGFuZGxlRHJhZ092ZXIsIGZhbHNlKTtcbiAgY3Jvc3N2ZW50W29wXShkcm9wYXJlYSwgJ2Ryb3AnLCBoYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbiAgZnVuY3Rpb24gZHJhZ2dpbmcgKCkge1xuICAgIGNsYXNzZXMuYWRkKGRyb3BhcmVhLCBkcmFnQ2xhc3MpO1xuICAgIGNsYXNzZXMuYWRkKGRyb3BhcmVhLCBkcmFnQ2xhc3NTcGVjaWZpYyk7XG4gIH1cbiAgZnVuY3Rpb24gZHJhZ3N0b3AgKCkge1xuICAgIGRyYWdzdG9wcGVyKGRyb3BhcmVhKTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVEcmFnT3ZlciAoZSkge1xuICAgIHN0b3AoZSk7XG4gICAgZHJhZ2dpbmcoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZUZpbGVTZWxlY3QgKGUpIHtcbiAgICBkcmFnc3RvcCgpO1xuICAgIHN0b3AoZSk7XG4gICAgZWRpdG9yLnJ1bkNvbW1hbmQoZnVuY3Rpb24gcnVubmVyIChjaHVua3MsIG1vZGUpIHtcbiAgICAgIHZhciBmaWxlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgIHZhciB0eXBlID0gaW5mZXJUeXBlKGZpbGVzKTtcbiAgICAgIGVkaXRvci5saW5rT3JJbWFnZU9yQXR0YWNobWVudCh0eXBlLCBmaWxlcykuY2FsbCh0aGlzLCBtb2RlLCBjaHVua3MpO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGluZmVyVHlwZSAoZmlsZXMpIHtcbiAgICBpZiAob3B0aW9ucy5pbWFnZXMgJiYgIW9wdGlvbnMuYXR0YWNobWVudHMpIHtcbiAgICAgIHJldHVybiAnaW1hZ2UnO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuaW1hZ2VzICYmIG9wdGlvbnMuYXR0YWNobWVudHMpIHtcbiAgICAgIHJldHVybiAnYXR0YWNobWVudCc7XG4gICAgfVxuICAgIGlmIChmaWxlcy5ldmVyeShtYXRjaGVzKG9wdGlvbnMuaW1hZ2VzLnZhbGlkYXRlIHx8IG5ldmVyKSkpIHtcbiAgICAgIHJldHVybiAnaW1hZ2UnO1xuICAgIH1cbiAgICByZXR1cm4gJ2F0dGFjaG1lbnQnO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtYXRjaGVyIChmaWxlKSB7IHJldHVybiBmbihmaWxlKTsgfTtcbn1cbmZ1bmN0aW9uIG5ldmVyICgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gc3RvcCAoZSkge1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5mdW5jdGlvbiBkcmFnc3RvcHBlciAoZHJvcGFyZWEpIHtcbiAgY2xhc3Nlcy5ybShkcm9wYXJlYSwgZHJhZ0NsYXNzKTtcbiAgY2xhc3Nlcy5ybShkcm9wYXJlYSwgZHJhZ0NsYXNzU3BlY2lmaWMpO1xufVxuXG51cGxvYWRzLnN0b3AgPSBkcmFnc3RvcHBlcjtcbm1vZHVsZS5leHBvcnRzID0gdXBsb2FkcztcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGxzID0gcmVxdWlyZSgnbG9jYWwtc3RvcmFnZScpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGthbnllID0gcmVxdWlyZSgna2FueWUnKTtcbnZhciB1cGxvYWRzID0gcmVxdWlyZSgnLi91cGxvYWRzJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4vc3RyaW5ncycpO1xudmFyIHNldFRleHQgPSByZXF1aXJlKCcuL3NldFRleHQnKTtcbnZhciByZW1lbWJlclNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vcmVtZW1iZXJTZWxlY3Rpb24nKTtcbnZhciBiaW5kQ29tbWFuZHMgPSByZXF1aXJlKCcuL2JpbmRDb21tYW5kcycpO1xudmFyIElucHV0SGlzdG9yeSA9IHJlcXVpcmUoJy4vSW5wdXRIaXN0b3J5Jyk7XG52YXIgZ2V0Q29tbWFuZEhhbmRsZXIgPSByZXF1aXJlKCcuL2dldENvbW1hbmRIYW5kbGVyJyk7XG52YXIgZ2V0U3VyZmFjZSA9IHJlcXVpcmUoJy4vZ2V0U3VyZmFjZScpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL2NsYXNzZXMnKTtcbnZhciByZW5kZXJlcnMgPSByZXF1aXJlKCcuL3JlbmRlcmVycycpO1xudmFyIHByb21wdCA9IHJlcXVpcmUoJy4vcHJvbXB0cy9wcm9tcHQnKTtcbnZhciBjbG9zZVByb21wdHMgPSByZXF1aXJlKCcuL3Byb21wdHMvY2xvc2UnKTtcbnZhciBtb2RlTmFtZXMgPSBbJ21hcmtkb3duJywgJ2h0bWwnLCAnd3lzaXd5ZyddO1xudmFyIGNhY2hlID0gW107XG52YXIgbWFjID0gL1xcYk1hYyBPU1xcYi8udGVzdChnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgcnBhcmFncmFwaCA9IC9ePHA+PFxcL3A+XFxuPyQvaTtcblxuZnVuY3Rpb24gZmluZCAodGV4dGFyZWEpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWNoZS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjYWNoZVtpXSAmJiBjYWNoZVtpXS50YSA9PT0gdGV4dGFyZWEpIHtcbiAgICAgIHJldHVybiBjYWNoZVtpXS5lZGl0b3I7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB3b29mbWFyayAodGV4dGFyZWEsIG9wdGlvbnMpIHtcbiAgdmFyIGNhY2hlZCA9IGZpbmQodGV4dGFyZWEpO1xuICBpZiAoY2FjaGVkKSB7XG4gICAgcmV0dXJuIGNhY2hlZDtcbiAgfVxuXG4gIHZhciBwYXJlbnQgPSB0ZXh0YXJlYS5wYXJlbnRFbGVtZW50O1xuICBpZiAocGFyZW50LmNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dvb2ZtYXJrIGRlbWFuZHMgPHRleHRhcmVhPiBlbGVtZW50cyB0byBoYXZlIG5vIHNpYmxpbmdzJyk7XG4gIH1cblxuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIGlmIChvLm1hcmtkb3duID09PSB2b2lkIDApIHsgby5tYXJrZG93biA9IHRydWU7IH1cbiAgaWYgKG8uaHRtbCA9PT0gdm9pZCAwKSB7IG8uaHRtbCA9IHRydWU7IH1cbiAgaWYgKG8ud3lzaXd5ZyA9PT0gdm9pZCAwKSB7IG8ud3lzaXd5ZyA9IHRydWU7IH1cblxuICBpZiAoIW8ubWFya2Rvd24gJiYgIW8uaHRtbCAmJiAhby53eXNpd3lnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b29mbWFyayBleHBlY3RzIGF0IGxlYXN0IG9uZSBpbnB1dCBtb2RlIHRvIGJlIGF2YWlsYWJsZScpO1xuICB9XG5cbiAgaWYgKG8uaHIgPT09IHZvaWQgMCkgeyBvLmhyID0gZmFsc2U7IH1cbiAgaWYgKG8uc3RvcmFnZSA9PT0gdm9pZCAwKSB7IG8uc3RvcmFnZSA9IHRydWU7IH1cbiAgaWYgKG8uc3RvcmFnZSA9PT0gdHJ1ZSkgeyBvLnN0b3JhZ2UgPSAnd29vZm1hcmtfaW5wdXRfbW9kZSc7IH1cbiAgaWYgKG8uZmVuY2luZyA9PT0gdm9pZCAwKSB7IG8uZmVuY2luZyA9IHRydWU7IH1cbiAgaWYgKG8ucmVuZGVyID09PSB2b2lkIDApIHsgby5yZW5kZXIgPSB7fTsgfVxuICBpZiAoby5yZW5kZXIubW9kZXMgPT09IHZvaWQgMCkgeyBvLnJlbmRlci5tb2RlcyA9IHt9OyB9XG4gIGlmIChvLnJlbmRlci5jb21tYW5kcyA9PT0gdm9pZCAwKSB7IG8ucmVuZGVyLmNvbW1hbmRzID0ge307IH1cbiAgaWYgKG8ucHJvbXB0cyA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cyA9IHt9OyB9XG4gIGlmIChvLnByb21wdHMubGluayA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cy5saW5rID0gcHJvbXB0OyB9XG4gIGlmIChvLnByb21wdHMuaW1hZ2UgPT09IHZvaWQgMCkgeyBvLnByb21wdHMuaW1hZ2UgPSBwcm9tcHQ7IH1cbiAgaWYgKG8ucHJvbXB0cy5hdHRhY2htZW50ID09PSB2b2lkIDApIHsgby5wcm9tcHRzLmF0dGFjaG1lbnQgPSBwcm9tcHQ7IH1cbiAgaWYgKG8ucHJvbXB0cy5jbG9zZSA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cy5jbG9zZSA9IGNsb3NlUHJvbXB0czsgfVxuICBpZiAoby5jbGFzc2VzID09PSB2b2lkIDApIHsgby5jbGFzc2VzID0ge307IH1cbiAgaWYgKG8uY2xhc3Nlcy53eXNpd3lnID09PSB2b2lkIDApIHsgby5jbGFzc2VzLnd5c2l3eWcgPSBbXTsgfVxuICBpZiAoby5jbGFzc2VzLnByb21wdHMgPT09IHZvaWQgMCkgeyBvLmNsYXNzZXMucHJvbXB0cyA9IHt9OyB9XG4gIGlmIChvLmNsYXNzZXMuaW5wdXQgPT09IHZvaWQgMCkgeyBvLmNsYXNzZXMuaW5wdXQgPSB7fTsgfVxuXG4gIHZhciBwcmVmZXJlbmNlID0gby5zdG9yYWdlICYmIGxzLmdldChvLnN0b3JhZ2UpO1xuICBpZiAocHJlZmVyZW5jZSkge1xuICAgIG8uZGVmYXVsdE1vZGUgPSBwcmVmZXJlbmNlO1xuICB9XG5cbiAgdmFyIGRyb3BhcmVhID0gdGFnKHsgYzogJ3drLWNvbnRhaW5lci1kcm9wJyB9KTtcbiAgdmFyIHN3aXRjaGJvYXJkID0gdGFnKHsgYzogJ3drLXN3aXRjaGJvYXJkJyB9KTtcbiAgdmFyIGNvbW1hbmRzID0gdGFnKHsgYzogJ3drLWNvbW1hbmRzJyB9KTtcbiAgdmFyIGVkaXRhYmxlID0gdGFnKHsgYzogWyd3ay13eXNpd3lnJywgJ3drLWhpZGUnXS5jb25jYXQoby5jbGFzc2VzLnd5c2l3eWcpLmpvaW4oJyAnKSB9KTtcbiAgdmFyIHN1cmZhY2UgPSBnZXRTdXJmYWNlKHRleHRhcmVhLCBlZGl0YWJsZSwgZHJvcGFyZWEpO1xuICB2YXIgaGlzdG9yeSA9IG5ldyBJbnB1dEhpc3Rvcnkoc3VyZmFjZSwgJ21hcmtkb3duJyk7XG4gIHZhciBlZGl0b3IgPSB7XG4gICAgYWRkQ29tbWFuZDogYWRkQ29tbWFuZCxcbiAgICBhZGRDb21tYW5kQnV0dG9uOiBhZGRDb21tYW5kQnV0dG9uLFxuICAgIHJ1bkNvbW1hbmQ6IHJ1bkNvbW1hbmQsXG4gICAgcGFyc2VNYXJrZG93bjogby5wYXJzZU1hcmtkb3duLFxuICAgIHBhcnNlSFRNTDogby5wYXJzZUhUTUwsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICB2YWx1ZTogZ2V0T3JTZXRWYWx1ZSxcbiAgICB0ZXh0YXJlYTogdGV4dGFyZWEsXG4gICAgZWRpdGFibGU6IG8ud3lzaXd5ZyA/IGVkaXRhYmxlIDogbnVsbCxcbiAgICBzZXRNb2RlOiBwZXJzaXN0TW9kZSxcbiAgICBoaXN0b3J5OiB7XG4gICAgICB1bmRvOiBoaXN0b3J5LnVuZG8sXG4gICAgICByZWRvOiBoaXN0b3J5LnJlZG8sXG4gICAgICBjYW5VbmRvOiBoaXN0b3J5LmNhblVuZG8sXG4gICAgICBjYW5SZWRvOiBoaXN0b3J5LmNhblJlZG9cbiAgICB9LFxuICAgIG1vZGU6ICdtYXJrZG93bidcbiAgfTtcbiAgdmFyIGVudHJ5ID0geyB0YTogdGV4dGFyZWEsIGVkaXRvcjogZWRpdG9yIH07XG4gIHZhciBpID0gY2FjaGUucHVzaChlbnRyeSk7XG4gIHZhciBrYW55ZUNvbnRleHQgPSAnd29vZm1hcmtfJyArIGk7XG4gIHZhciBrYW55ZU9wdGlvbnMgPSB7XG4gICAgZmlsdGVyOiBwYXJlbnQsXG4gICAgY29udGV4dDoga2FueWVDb250ZXh0XG4gIH07XG4gIHZhciBtb2RlcyA9IHtcbiAgICBtYXJrZG93bjoge1xuICAgICAgYnV0dG9uOiB0YWcoeyB0OiAnYnV0dG9uJywgYzogJ3drLW1vZGUgd2stbW9kZS1hY3RpdmUnIH0pLFxuICAgICAgc2V0OiBtYXJrZG93bk1vZGVcbiAgICB9LFxuICAgIGh0bWw6IHtcbiAgICAgIGJ1dHRvbjogdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1tb2RlIHdrLW1vZGUtaW5hY3RpdmUnIH0pLFxuICAgICAgc2V0OiBodG1sTW9kZVxuICAgIH0sXG4gICAgd3lzaXd5Zzoge1xuICAgICAgYnV0dG9uOiB0YWcoeyB0OiAnYnV0dG9uJywgYzogJ3drLW1vZGUgd2stbW9kZS1pbmFjdGl2ZScgfSksXG4gICAgICBzZXQ6IHd5c2l3eWdNb2RlXG4gICAgfVxuICB9O1xuICB2YXIgcGxhY2U7XG5cbiAgdGFnKHsgdDogJ3NwYW4nLCBjOiAnd2stZHJvcC10ZXh0JywgeDogc3RyaW5ncy5wcm9tcHRzLmRyb3AsIHA6IGRyb3BhcmVhIH0pO1xuICB0YWcoeyB0OiAncCcsIGM6IFsnd2stZHJvcC1pY29uJ10uY29uY2F0KG8uY2xhc3Nlcy5kcm9waWNvbikuam9pbignICcpLCBwOiBkcm9wYXJlYSB9KTtcblxuICBlZGl0YWJsZS5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xuICBtb2Rlcy5tYXJrZG93bi5idXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICBtb2RlTmFtZXMuZm9yRWFjaChhZGRNb2RlKTtcblxuICBpZiAoby53eXNpd3lnKSB7XG4gICAgcGxhY2UgPSB0YWcoeyBjOiAnd2std3lzaXd5Zy1wbGFjZWhvbGRlciB3ay1oaWRlJywgeDogdGV4dGFyZWEucGxhY2Vob2xkZXIgfSk7XG4gICAgY3Jvc3N2ZW50LmFkZChwbGFjZSwgJ2NsaWNrJywgZm9jdXNFZGl0YWJsZSk7XG4gIH1cblxuICBpZiAoby5kZWZhdWx0TW9kZSAmJiBvW28uZGVmYXVsdE1vZGVdKSB7XG4gICAgbW9kZXNbby5kZWZhdWx0TW9kZV0uc2V0KCk7XG4gIH0gZWxzZSBpZiAoby5tYXJrZG93bikge1xuICAgIG1vZGVzLm1hcmtkb3duLnNldCgpO1xuICB9IGVsc2UgaWYgKG8uaHRtbCkge1xuICAgIG1vZGVzLmh0bWwuc2V0KCk7XG4gIH0gZWxzZSB7XG4gICAgbW9kZXMud3lzaXd5Zy5zZXQoKTtcbiAgfVxuXG4gIGJpbmRDb21tYW5kcyhzdXJmYWNlLCBvLCBlZGl0b3IpO1xuICBiaW5kRXZlbnRzKCk7XG5cbiAgcmV0dXJuIGVkaXRvcjtcblxuICBmdW5jdGlvbiBhZGRNb2RlIChpZCkge1xuICAgIHZhciBidXR0b24gPSBtb2Rlc1tpZF0uYnV0dG9uO1xuICAgIHZhciBjdXN0b20gPSBvLnJlbmRlci5tb2RlcztcbiAgICBpZiAob1tpZF0pIHtcbiAgICAgIHN3aXRjaGJvYXJkLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAodHlwZW9mIGN1c3RvbSA9PT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbSA6IHJlbmRlcmVycy5tb2RlcykoYnV0dG9uLCBpZCk7XG4gICAgICBjcm9zc3ZlbnQuYWRkKGJ1dHRvbiwgJ2NsaWNrJywgbW9kZXNbaWRdLnNldCk7XG4gICAgICBidXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgYnV0dG9uLnRhYkluZGV4ID0gLTE7XG5cbiAgICAgIHZhciB0aXRsZSA9IHN0cmluZ3MudGl0bGVzW2lkXTtcbiAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIG1hYyA/IG1hY2lmeSh0aXRsZSkgOiB0aXRsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYmluZEV2ZW50cyAocmVtb3ZlKSB7XG4gICAgdmFyIGFyID0gcmVtb3ZlID8gJ3JtJyA6ICdhZGQnO1xuICAgIHZhciBtb3YgPSByZW1vdmUgPyAncmVtb3ZlQ2hpbGQnIDogJ2FwcGVuZENoaWxkJztcbiAgICBpZiAocmVtb3ZlKSB7XG4gICAgICBrYW55ZS5jbGVhcihrYW55ZUNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoby5tYXJrZG93bikgeyBrYW55ZS5vbignY21kK20nLCBrYW55ZU9wdGlvbnMsIG1hcmtkb3duTW9kZSk7IH1cbiAgICAgIGlmIChvLmh0bWwpIHsga2FueWUub24oJ2NtZCtoJywga2FueWVPcHRpb25zLCBodG1sTW9kZSk7IH1cbiAgICAgIGlmIChvLnd5c2l3eWcpIHsga2FueWUub24oJ2NtZCtwJywga2FueWVPcHRpb25zLCB3eXNpd3lnTW9kZSk7IH1cbiAgICB9XG4gICAgY2xhc3Nlc1thcl0ocGFyZW50LCAnd2stY29udGFpbmVyJyk7XG4gICAgcGFyZW50W21vdl0oZWRpdGFibGUpO1xuICAgIGlmIChwbGFjZSkgeyBwYXJlbnRbbW92XShwbGFjZSk7IH1cbiAgICBwYXJlbnRbbW92XShjb21tYW5kcyk7XG4gICAgcGFyZW50W21vdl0oc3dpdGNoYm9hcmQpO1xuICAgIGlmIChvLmltYWdlcyB8fCBvLmF0dGFjaG1lbnRzKSB7XG4gICAgICBwYXJlbnRbbW92XShkcm9wYXJlYSk7XG4gICAgICB1cGxvYWRzKHBhcmVudCwgZHJvcGFyZWEsIGVkaXRvciwgbywgcmVtb3ZlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBpZiAoZWRpdG9yLm1vZGUgIT09ICdtYXJrZG93bicpIHtcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gZ2V0TWFya2Rvd24oKTtcbiAgICB9XG4gICAgY2xhc3Nlcy5ybSh0ZXh0YXJlYSwgJ3drLWhpZGUnKTtcbiAgICBiaW5kRXZlbnRzKHRydWUpO1xuICAgIGRlbGV0ZSBjYWNoZVtpIC0gMV07XG4gIH1cblxuICBmdW5jdGlvbiBtYXJrZG93bk1vZGUgKGUpIHsgcGVyc2lzdE1vZGUoJ21hcmtkb3duJywgZSk7IH1cbiAgZnVuY3Rpb24gaHRtbE1vZGUgKGUpIHsgcGVyc2lzdE1vZGUoJ2h0bWwnLCBlKTsgfVxuICBmdW5jdGlvbiB3eXNpd3lnTW9kZSAoZSkgeyBwZXJzaXN0TW9kZSgnd3lzaXd5ZycsIGUpOyB9XG5cbiAgZnVuY3Rpb24gcGVyc2lzdE1vZGUgKG5leHRNb2RlLCBlKSB7XG4gICAgdmFyIHJlbWVtYnJhbmNlO1xuICAgIHZhciBjdXJyZW50TW9kZSA9IGVkaXRvci5tb2RlO1xuICAgIHZhciBvbGQgPSBtb2Rlc1tjdXJyZW50TW9kZV0uYnV0dG9uO1xuICAgIHZhciBidXR0b24gPSBtb2Rlc1tuZXh0TW9kZV0uYnV0dG9uO1xuICAgIHZhciBmb2N1c2luZyA9ICEhZSB8fCBkb2MuYWN0aXZlRWxlbWVudCA9PT0gdGV4dGFyZWEgfHwgZG9jLmFjdGl2ZUVsZW1lbnQgPT09IGVkaXRhYmxlO1xuXG4gICAgc3RvcChlKTtcblxuICAgIGlmIChjdXJyZW50TW9kZSA9PT0gbmV4dE1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZW1lbWJyYW5jZSA9IGZvY3VzaW5nICYmIHJlbWVtYmVyU2VsZWN0aW9uKGhpc3RvcnksIG8pO1xuICAgIHRleHRhcmVhLmJsdXIoKTsgLy8gYXZlcnQgY2hyb21lIHJlcGFpbnQgYnVnc1xuXG4gICAgaWYgKG5leHRNb2RlID09PSAnbWFya2Rvd24nKSB7XG4gICAgICBpZiAoY3VycmVudE1vZGUgPT09ICdodG1sJykge1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHBhcnNlKCdwYXJzZUhUTUwnLCB0ZXh0YXJlYS52YWx1ZSkudHJpbSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBwYXJzZSgncGFyc2VIVE1MJywgZWRpdGFibGUpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5leHRNb2RlID09PSAnaHRtbCcpIHtcbiAgICAgIGlmIChjdXJyZW50TW9kZSA9PT0gJ21hcmtkb3duJykge1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHBhcnNlKCdwYXJzZU1hcmtkb3duJywgdGV4dGFyZWEudmFsdWUpLnRyaW0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gZWRpdGFibGUuaW5uZXJIVE1MLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5leHRNb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIGlmIChjdXJyZW50TW9kZSA9PT0gJ21hcmtkb3duJykge1xuICAgICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSBwYXJzZSgncGFyc2VNYXJrZG93bicsIHRleHRhcmVhLnZhbHVlKS5yZXBsYWNlKHJwYXJhZ3JhcGgsICcnKS50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSB0ZXh0YXJlYS52YWx1ZS5yZXBsYWNlKHJwYXJhZ3JhcGgsICcnKS50cmltKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5leHRNb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIGNsYXNzZXMuYWRkKHRleHRhcmVhLCAnd2staGlkZScpO1xuICAgICAgY2xhc3Nlcy5ybShlZGl0YWJsZSwgJ3drLWhpZGUnKTtcbiAgICAgIGlmIChwbGFjZSkgeyBjbGFzc2VzLnJtKHBsYWNlLCAnd2staGlkZScpOyB9XG4gICAgICBpZiAoZm9jdXNpbmcpIHsgc2V0VGltZW91dChmb2N1c0VkaXRhYmxlLCAwKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFzc2VzLnJtKHRleHRhcmVhLCAnd2staGlkZScpO1xuICAgICAgY2xhc3Nlcy5hZGQoZWRpdGFibGUsICd3ay1oaWRlJyk7XG4gICAgICBpZiAocGxhY2UpIHsgY2xhc3Nlcy5hZGQocGxhY2UsICd3ay1oaWRlJyk7IH1cbiAgICAgIGlmIChmb2N1c2luZykgeyB0ZXh0YXJlYS5mb2N1cygpOyB9XG4gICAgfVxuICAgIGNsYXNzZXMuYWRkKGJ1dHRvbiwgJ3drLW1vZGUtYWN0aXZlJyk7XG4gICAgY2xhc3Nlcy5ybShvbGQsICd3ay1tb2RlLWFjdGl2ZScpO1xuICAgIGNsYXNzZXMuYWRkKG9sZCwgJ3drLW1vZGUtaW5hY3RpdmUnKTtcbiAgICBjbGFzc2VzLnJtKGJ1dHRvbiwgJ3drLW1vZGUtaW5hY3RpdmUnKTtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIG9sZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgZWRpdG9yLm1vZGUgPSBuZXh0TW9kZTtcblxuICAgIGlmIChvLnN0b3JhZ2UpIHsgbHMuc2V0KG8uc3RvcmFnZSwgbmV4dE1vZGUpOyB9XG5cbiAgICBoaXN0b3J5LnNldElucHV0TW9kZShuZXh0TW9kZSk7XG4gICAgaWYgKHJlbWVtYnJhbmNlKSB7IHJlbWVtYnJhbmNlLnVubWFyaygpOyB9XG4gICAgZmlyZUxhdGVyKCd3b29mbWFyay1tb2RlLWNoYW5nZScpO1xuXG4gICAgZnVuY3Rpb24gcGFyc2UgKG1ldGhvZCwgaW5wdXQpIHtcbiAgICAgIHJldHVybiBvW21ldGhvZF0oaW5wdXQsIHtcbiAgICAgICAgbWFya2VyczogcmVtZW1icmFuY2UgJiYgcmVtZW1icmFuY2UubWFya2VycyB8fCBbXVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmlyZUxhdGVyICh0eXBlKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiBmaXJlICgpIHtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUodGV4dGFyZWEsIHR5cGUpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9jdXNFZGl0YWJsZSAoKSB7XG4gICAgZWRpdGFibGUuZm9jdXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1hcmtkb3duICgpIHtcbiAgICBpZiAoZWRpdG9yLm1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgcmV0dXJuIG8ucGFyc2VIVE1MKGVkaXRhYmxlKTtcbiAgICB9XG4gICAgaWYgKGVkaXRvci5tb2RlID09PSAnaHRtbCcpIHtcbiAgICAgIHJldHVybiBvLnBhcnNlSFRNTCh0ZXh0YXJlYS52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9yU2V0VmFsdWUgKGlucHV0KSB7XG4gICAgdmFyIG1hcmtkb3duID0gU3RyaW5nKGlucHV0KTtcbiAgICB2YXIgc2V0cyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDE7XG4gICAgaWYgKHNldHMpIHtcbiAgICAgIGlmIChlZGl0b3IubW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICAgIGVkaXRhYmxlLmlubmVySFRNTCA9IGFzSHRtbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBlZGl0b3IubW9kZSA9PT0gJ2h0bWwnID8gYXNIdG1sKCkgOiBtYXJrZG93bjtcbiAgICAgIH1cbiAgICAgIGhpc3RvcnkucmVzZXQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldE1hcmtkb3duKCk7XG4gICAgZnVuY3Rpb24gYXNIdG1sICgpIHtcbiAgICAgIHJldHVybiBvLnBhcnNlTWFya2Rvd24obWFya2Rvd24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENvbW1hbmRCdXR0b24gKGlkLCBjb21ibywgZm4pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgZm4gPSBjb21ibztcbiAgICAgIGNvbWJvID0gbnVsbDtcbiAgICB9XG4gICAgdmFyIGJ1dHRvbiA9IHRhZyh7IHQ6ICdidXR0b24nLCBjOiAnd2stY29tbWFuZCcsIHA6IGNvbW1hbmRzIH0pO1xuICAgIHZhciBjdXN0b20gPSBvLnJlbmRlci5jb21tYW5kcztcbiAgICB2YXIgcmVuZGVyID0gdHlwZW9mIGN1c3RvbSA9PT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbSA6IHJlbmRlcmVycy5jb21tYW5kcztcbiAgICB2YXIgdGl0bGUgPSBzdHJpbmdzLnRpdGxlc1tpZF07XG4gICAgaWYgKHRpdGxlKSB7XG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIG1hYyA/IG1hY2lmeSh0aXRsZSkgOiB0aXRsZSk7XG4gICAgfVxuICAgIGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgYnV0dG9uLnRhYkluZGV4ID0gLTE7XG4gICAgcmVuZGVyKGJ1dHRvbiwgaWQpO1xuICAgIGNyb3NzdmVudC5hZGQoYnV0dG9uLCAnY2xpY2snLCBnZXRDb21tYW5kSGFuZGxlcihzdXJmYWNlLCBoaXN0b3J5LCBmbikpO1xuICAgIGlmIChjb21ibykge1xuICAgICAgYWRkQ29tbWFuZChjb21ibywgZm4pO1xuICAgIH1cbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ29tbWFuZCAoY29tYm8sIGZuKSB7XG4gICAga2FueWUub24oY29tYm8sIGthbnllT3B0aW9ucywgZ2V0Q29tbWFuZEhhbmRsZXIoc3VyZmFjZSwgaGlzdG9yeSwgZm4pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkNvbW1hbmQgKGZuKSB7XG4gICAgZ2V0Q29tbWFuZEhhbmRsZXIoc3VyZmFjZSwgaGlzdG9yeSwgcmVhcnJhbmdlKShudWxsKTtcbiAgICBmdW5jdGlvbiByZWFycmFuZ2UgKGUsIG1vZGUsIGNodW5rcykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgY2h1bmtzLCBtb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdGFnIChvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoby50IHx8ICdkaXYnKTtcbiAgZWwuY2xhc3NOYW1lID0gby5jIHx8ICcnO1xuICBzZXRUZXh0KGVsLCBvLnggfHwgJycpO1xuICBpZiAoby5wKSB7IG8ucC5hcHBlbmRDaGlsZChlbCk7IH1cbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiBzdG9wIChlKSB7XG4gIGlmIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfVxufVxuXG5mdW5jdGlvbiBtYWNpZnkgKHRleHQpIHtcbiAgcmV0dXJuIHRleHRcbiAgICAucmVwbGFjZSgvXFxiY3RybFxcYi9pLCAnXFx1MjMxOCcpXG4gICAgLnJlcGxhY2UoL1xcYmFsdFxcYi9pLCAnXFx1MjMyNScpXG4gICAgLnJlcGxhY2UoL1xcYnNoaWZ0XFxiL2ksICdcXHUyMWU3Jyk7XG59XG5cbndvb2ZtYXJrLmZpbmQgPSBmaW5kO1xud29vZm1hcmsuc3RyaW5ncyA9IHN0cmluZ3M7XG5tb2R1bGUuZXhwb3J0cyA9IHdvb2ZtYXJrO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTkzYjI5bWJXRnlheTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQnNjeUE5SUhKbGNYVnBjbVVvSjJ4dlkyRnNMWE4wYjNKaFoyVW5LVHRjYm5aaGNpQmpjbTl6YzNabGJuUWdQU0J5WlhGMWFYSmxLQ2RqY205emMzWmxiblFuS1R0Y2JuWmhjaUJyWVc1NVpTQTlJSEpsY1hWcGNtVW9KMnRoYm5sbEp5azdYRzUyWVhJZ2RYQnNiMkZrY3lBOUlISmxjWFZwY21Vb0p5NHZkWEJzYjJGa2N5Y3BPMXh1ZG1GeUlITjBjbWx1WjNNZ1BTQnlaWEYxYVhKbEtDY3VMM04wY21sdVozTW5LVHRjYm5aaGNpQnpaWFJVWlhoMElEMGdjbVZ4ZFdseVpTZ25MaTl6WlhSVVpYaDBKeWs3WEc1MllYSWdjbVZ0WlcxaVpYSlRaV3hsWTNScGIyNGdQU0J5WlhGMWFYSmxLQ2N1TDNKbGJXVnRZbVZ5VTJWc1pXTjBhVzl1SnlrN1hHNTJZWElnWW1sdVpFTnZiVzFoYm1SeklEMGdjbVZ4ZFdseVpTZ25MaTlpYVc1a1EyOXRiV0Z1WkhNbktUdGNiblpoY2lCSmJuQjFkRWhwYzNSdmNua2dQU0J5WlhGMWFYSmxLQ2N1TDBsdWNIVjBTR2x6ZEc5eWVTY3BPMXh1ZG1GeUlHZGxkRU52YlcxaGJtUklZVzVrYkdWeUlEMGdjbVZ4ZFdseVpTZ25MaTluWlhSRGIyMXRZVzVrU0dGdVpHeGxjaWNwTzF4dWRtRnlJR2RsZEZOMWNtWmhZMlVnUFNCeVpYRjFhWEpsS0NjdUwyZGxkRk4xY21aaFkyVW5LVHRjYm5aaGNpQmpiR0Z6YzJWeklEMGdjbVZ4ZFdseVpTZ25MaTlqYkdGemMyVnpKeWs3WEc1MllYSWdjbVZ1WkdWeVpYSnpJRDBnY21WeGRXbHlaU2duTGk5eVpXNWtaWEpsY25NbktUdGNiblpoY2lCd2NtOXRjSFFnUFNCeVpYRjFhWEpsS0NjdUwzQnliMjF3ZEhNdmNISnZiWEIwSnlrN1hHNTJZWElnWTJ4dmMyVlFjbTl0Y0hSeklEMGdjbVZ4ZFdseVpTZ25MaTl3Y205dGNIUnpMMk5zYjNObEp5azdYRzUyWVhJZ2JXOWtaVTVoYldWeklEMGdXeWR0WVhKclpHOTNiaWNzSUNkb2RHMXNKeXdnSjNkNWMybDNlV2NuWFR0Y2JuWmhjaUJqWVdOb1pTQTlJRnRkTzF4dWRtRnlJRzFoWXlBOUlDOWNYR0pOWVdNZ1QxTmNYR0l2TG5SbGMzUW9aMnh2WW1Gc0xtNWhkbWxuWVhSdmNpNTFjMlZ5UVdkbGJuUXBPMXh1ZG1GeUlHUnZZeUE5SUdSdlkzVnRaVzUwTzF4dWRtRnlJSEp3WVhKaFozSmhjR2dnUFNBdlhqeHdQanhjWEM5d1BseGNiajhrTDJrN1hHNWNibVoxYm1OMGFXOXVJR1pwYm1RZ0tIUmxlSFJoY21WaEtTQjdYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z1kyRmphR1V1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNCcFppQW9ZMkZqYUdWYmFWMGdKaVlnWTJGamFHVmJhVjB1ZEdFZ1BUMDlJSFJsZUhSaGNtVmhLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdZMkZqYUdWYmFWMHVaV1JwZEc5eU8xeHVJQ0FnSUgxY2JpQWdmVnh1SUNCeVpYUjFjbTRnYm5Wc2JEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2QyOXZabTFoY21zZ0tIUmxlSFJoY21WaExDQnZjSFJwYjI1ektTQjdYRzRnSUhaaGNpQmpZV05vWldRZ1BTQm1hVzVrS0hSbGVIUmhjbVZoS1R0Y2JpQWdhV1lnS0dOaFkyaGxaQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQmpZV05vWldRN1hHNGdJSDFjYmx4dUlDQjJZWElnY0dGeVpXNTBJRDBnZEdWNGRHRnlaV0V1Y0dGeVpXNTBSV3hsYldWdWREdGNiaUFnYVdZZ0tIQmhjbVZ1ZEM1amFHbHNaSEpsYmk1c1pXNW5kR2dnUGlBeEtTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkM2IyOW1iV0Z5YXlCa1pXMWhibVJ6SUR4MFpYaDBZWEpsWVQ0Z1pXeGxiV1Z1ZEhNZ2RHOGdhR0YyWlNCdWJ5QnphV0pzYVc1bmN5Y3BPMXh1SUNCOVhHNWNiaUFnZG1GeUlHOGdQU0J2Y0hScGIyNXpJSHg4SUh0OU8xeHVJQ0JwWmlBb2J5NXRZWEpyWkc5M2JpQTlQVDBnZG05cFpDQXdLU0I3SUc4dWJXRnlhMlJ2ZDI0Z1BTQjBjblZsT3lCOVhHNGdJR2xtSUNodkxtaDBiV3dnUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbWgwYld3Z1BTQjBjblZsT3lCOVhHNGdJR2xtSUNodkxuZDVjMmwzZVdjZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG5kNWMybDNlV2NnUFNCMGNuVmxPeUI5WEc1Y2JpQWdhV1lnS0NGdkxtMWhjbXRrYjNkdUlDWW1JQ0Z2TG1oMGJXd2dKaVlnSVc4dWQzbHphWGQ1WnlrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduZDI5dlptMWhjbXNnWlhod1pXTjBjeUJoZENCc1pXRnpkQ0J2Ym1VZ2FXNXdkWFFnYlc5a1pTQjBieUJpWlNCaGRtRnBiR0ZpYkdVbktUdGNiaUFnZlZ4dVhHNGdJR2xtSUNodkxtaHlJRDA5UFNCMmIybGtJREFwSUhzZ2J5NW9jaUE5SUdaaGJITmxPeUI5WEc0Z0lHbG1JQ2h2TG5OMGIzSmhaMlVnUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbk4wYjNKaFoyVWdQU0IwY25WbE95QjlYRzRnSUdsbUlDaHZMbk4wYjNKaFoyVWdQVDA5SUhSeWRXVXBJSHNnYnk1emRHOXlZV2RsSUQwZ0ozZHZiMlp0WVhKclgybHVjSFYwWDIxdlpHVW5PeUI5WEc0Z0lHbG1JQ2h2TG1abGJtTnBibWNnUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbVpsYm1OcGJtY2dQU0IwY25WbE95QjlYRzRnSUdsbUlDaHZMbkpsYm1SbGNpQTlQVDBnZG05cFpDQXdLU0I3SUc4dWNtVnVaR1Z5SUQwZ2UzMDdJSDFjYmlBZ2FXWWdLRzh1Y21WdVpHVnlMbTF2WkdWeklEMDlQU0IyYjJsa0lEQXBJSHNnYnk1eVpXNWtaWEl1Ylc5a1pYTWdQU0I3ZlRzZ2ZWeHVJQ0JwWmlBb2J5NXlaVzVrWlhJdVkyOXRiV0Z1WkhNZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG5KbGJtUmxjaTVqYjIxdFlXNWtjeUE5SUh0OU95QjlYRzRnSUdsbUlDaHZMbkJ5YjIxd2RITWdQVDA5SUhadmFXUWdNQ2tnZXlCdkxuQnliMjF3ZEhNZ1BTQjdmVHNnZlZ4dUlDQnBaaUFvYnk1d2NtOXRjSFJ6TG14cGJtc2dQVDA5SUhadmFXUWdNQ2tnZXlCdkxuQnliMjF3ZEhNdWJHbHVheUE5SUhCeWIyMXdkRHNnZlZ4dUlDQnBaaUFvYnk1d2NtOXRjSFJ6TG1sdFlXZGxJRDA5UFNCMmIybGtJREFwSUhzZ2J5NXdjbTl0Y0hSekxtbHRZV2RsSUQwZ2NISnZiWEIwT3lCOVhHNGdJR2xtSUNodkxuQnliMjF3ZEhNdVlYUjBZV05vYldWdWRDQTlQVDBnZG05cFpDQXdLU0I3SUc4dWNISnZiWEIwY3k1aGRIUmhZMmh0Wlc1MElEMGdjSEp2YlhCME95QjlYRzRnSUdsbUlDaHZMbkJ5YjIxd2RITXVZMnh2YzJVZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG5CeWIyMXdkSE11WTJ4dmMyVWdQU0JqYkc5elpWQnliMjF3ZEhNN0lIMWNiaUFnYVdZZ0tHOHVZMnhoYzNObGN5QTlQVDBnZG05cFpDQXdLU0I3SUc4dVkyeGhjM05sY3lBOUlIdDlPeUI5WEc0Z0lHbG1JQ2h2TG1Oc1lYTnpaWE11ZDNsemFYZDVaeUE5UFQwZ2RtOXBaQ0F3S1NCN0lHOHVZMnhoYzNObGN5NTNlWE5wZDNsbklEMGdXMTA3SUgxY2JpQWdhV1lnS0c4dVkyeGhjM05sY3k1d2NtOXRjSFJ6SUQwOVBTQjJiMmxrSURBcElIc2dieTVqYkdGemMyVnpMbkJ5YjIxd2RITWdQU0I3ZlRzZ2ZWeHVJQ0JwWmlBb2J5NWpiR0Z6YzJWekxtbHVjSFYwSUQwOVBTQjJiMmxrSURBcElIc2dieTVqYkdGemMyVnpMbWx1Y0hWMElEMGdlMzA3SUgxY2JseHVJQ0IyWVhJZ2NISmxabVZ5Wlc1alpTQTlJRzh1YzNSdmNtRm5aU0FtSmlCc2N5NW5aWFFvYnk1emRHOXlZV2RsS1R0Y2JpQWdhV1lnS0hCeVpXWmxjbVZ1WTJVcElIdGNiaUFnSUNCdkxtUmxabUYxYkhSTmIyUmxJRDBnY0hKbFptVnlaVzVqWlR0Y2JpQWdmVnh1WEc0Z0lIWmhjaUJrY205d1lYSmxZU0E5SUhSaFp5aDdJR002SUNkM2F5MWpiMjUwWVdsdVpYSXRaSEp2Y0NjZ2ZTazdYRzRnSUhaaGNpQnpkMmwwWTJoaWIyRnlaQ0E5SUhSaFp5aDdJR002SUNkM2F5MXpkMmwwWTJoaWIyRnlaQ2NnZlNrN1hHNGdJSFpoY2lCamIyMXRZVzVrY3lBOUlIUmhaeWg3SUdNNklDZDNheTFqYjIxdFlXNWtjeWNnZlNrN1hHNGdJSFpoY2lCbFpHbDBZV0pzWlNBOUlIUmhaeWg3SUdNNklGc25kMnN0ZDNsemFYZDVaeWNzSUNkM2F5MW9hV1JsSjEwdVkyOXVZMkYwS0c4dVkyeGhjM05sY3k1M2VYTnBkM2xuS1M1cWIybHVLQ2NnSnlrZ2ZTazdYRzRnSUhaaGNpQnpkWEptWVdObElEMGdaMlYwVTNWeVptRmpaU2gwWlhoMFlYSmxZU3dnWldScGRHRmliR1VzSUdSeWIzQmhjbVZoS1R0Y2JpQWdkbUZ5SUdocGMzUnZjbmtnUFNCdVpYY2dTVzV3ZFhSSWFYTjBiM0o1S0hOMWNtWmhZMlVzSUNkdFlYSnJaRzkzYmljcE8xeHVJQ0IyWVhJZ1pXUnBkRzl5SUQwZ2UxeHVJQ0FnSUdGa1pFTnZiVzFoYm1RNklHRmtaRU52YlcxaGJtUXNYRzRnSUNBZ1lXUmtRMjl0YldGdVpFSjFkSFJ2YmpvZ1lXUmtRMjl0YldGdVpFSjFkSFJ2Yml4Y2JpQWdJQ0J5ZFc1RGIyMXRZVzVrT2lCeWRXNURiMjF0WVc1a0xGeHVJQ0FnSUhCaGNuTmxUV0Z5YTJSdmQyNDZJRzh1Y0dGeWMyVk5ZWEpyWkc5M2JpeGNiaUFnSUNCd1lYSnpaVWhVVFV3NklHOHVjR0Z5YzJWSVZFMU1MRnh1SUNBZ0lHUmxjM1J5YjNrNklHUmxjM1J5YjNrc1hHNGdJQ0FnZG1Gc2RXVTZJR2RsZEU5eVUyVjBWbUZzZFdVc1hHNGdJQ0FnZEdWNGRHRnlaV0U2SUhSbGVIUmhjbVZoTEZ4dUlDQWdJR1ZrYVhSaFlteGxPaUJ2TG5kNWMybDNlV2NnUHlCbFpHbDBZV0pzWlNBNklHNTFiR3dzWEc0Z0lDQWdjMlYwVFc5a1pUb2djR1Z5YzJsemRFMXZaR1VzWEc0Z0lDQWdhR2x6ZEc5eWVUb2dlMXh1SUNBZ0lDQWdkVzVrYnpvZ2FHbHpkRzl5ZVM1MWJtUnZMRnh1SUNBZ0lDQWdjbVZrYnpvZ2FHbHpkRzl5ZVM1eVpXUnZMRnh1SUNBZ0lDQWdZMkZ1Vlc1a2J6b2dhR2x6ZEc5eWVTNWpZVzVWYm1SdkxGeHVJQ0FnSUNBZ1kyRnVVbVZrYnpvZ2FHbHpkRzl5ZVM1allXNVNaV1J2WEc0Z0lDQWdmU3hjYmlBZ0lDQnRiMlJsT2lBbmJXRnlhMlJ2ZDI0blhHNGdJSDA3WEc0Z0lIWmhjaUJsYm5SeWVTQTlJSHNnZEdFNklIUmxlSFJoY21WaExDQmxaR2wwYjNJNklHVmthWFJ2Y2lCOU8xeHVJQ0IyWVhJZ2FTQTlJR05oWTJobExuQjFjMmdvWlc1MGNua3BPMXh1SUNCMllYSWdhMkZ1ZVdWRGIyNTBaWGgwSUQwZ0ozZHZiMlp0WVhKclh5Y2dLeUJwTzF4dUlDQjJZWElnYTJGdWVXVlBjSFJwYjI1eklEMGdlMXh1SUNBZ0lHWnBiSFJsY2pvZ2NHRnlaVzUwTEZ4dUlDQWdJR052Ym5SbGVIUTZJR3RoYm5sbFEyOXVkR1Y0ZEZ4dUlDQjlPMXh1SUNCMllYSWdiVzlrWlhNZ1BTQjdYRzRnSUNBZ2JXRnlhMlJ2ZDI0NklIdGNiaUFnSUNBZ0lHSjFkSFJ2YmpvZ2RHRm5LSHNnZERvZ0oySjFkSFJ2Ymljc0lHTTZJQ2QzYXkxdGIyUmxJSGRyTFcxdlpHVXRZV04wYVhabEp5QjlLU3hjYmlBZ0lDQWdJSE5sZERvZ2JXRnlhMlJ2ZDI1TmIyUmxYRzRnSUNBZ2ZTeGNiaUFnSUNCb2RHMXNPaUI3WEc0Z0lDQWdJQ0JpZFhSMGIyNDZJSFJoWnloN0lIUTZJQ2RpZFhSMGIyNG5MQ0JqT2lBbmQyc3RiVzlrWlNCM2F5MXRiMlJsTFdsdVlXTjBhWFpsSnlCOUtTeGNiaUFnSUNBZ0lITmxkRG9nYUhSdGJFMXZaR1ZjYmlBZ0lDQjlMRnh1SUNBZ0lIZDVjMmwzZVdjNklIdGNiaUFnSUNBZ0lHSjFkSFJ2YmpvZ2RHRm5LSHNnZERvZ0oySjFkSFJ2Ymljc0lHTTZJQ2QzYXkxdGIyUmxJSGRyTFcxdlpHVXRhVzVoWTNScGRtVW5JSDBwTEZ4dUlDQWdJQ0FnYzJWME9pQjNlWE5wZDNsblRXOWtaVnh1SUNBZ0lIMWNiaUFnZlR0Y2JpQWdkbUZ5SUhCc1lXTmxPMXh1WEc0Z0lIUmhaeWg3SUhRNklDZHpjR0Z1Snl3Z1l6b2dKM2RyTFdSeWIzQXRkR1Y0ZENjc0lIZzZJSE4wY21sdVozTXVjSEp2YlhCMGN5NWtjbTl3TENCd09pQmtjbTl3WVhKbFlTQjlLVHRjYmlBZ2RHRm5LSHNnZERvZ0ozQW5MQ0JqT2lCYkozZHJMV1J5YjNBdGFXTnZiaWRkTG1OdmJtTmhkQ2h2TG1Oc1lYTnpaWE11WkhKdmNHbGpiMjRwTG1wdmFXNG9KeUFuS1N3Z2NEb2daSEp2Y0dGeVpXRWdmU2s3WEc1Y2JpQWdaV1JwZEdGaWJHVXVZMjl1ZEdWdWRFVmthWFJoWW14bElEMGdkSEoxWlR0Y2JpQWdiVzlrWlhNdWJXRnlhMlJ2ZDI0dVluVjBkRzl1TG5ObGRFRjBkSEpwWW5WMFpTZ25aR2x6WVdKc1pXUW5MQ0FuWkdsellXSnNaV1FuS1R0Y2JpQWdiVzlrWlU1aGJXVnpMbVp2Y2tWaFkyZ29ZV1JrVFc5a1pTazdYRzVjYmlBZ2FXWWdLRzh1ZDNsemFYZDVaeWtnZTF4dUlDQWdJSEJzWVdObElEMGdkR0ZuS0hzZ1l6b2dKM2RyTFhkNWMybDNlV2N0Y0d4aFkyVm9iMnhrWlhJZ2Qyc3RhR2xrWlNjc0lIZzZJSFJsZUhSaGNtVmhMbkJzWVdObGFHOXNaR1Z5SUgwcE8xeHVJQ0FnSUdOeWIzTnpkbVZ1ZEM1aFpHUW9jR3hoWTJVc0lDZGpiR2xqYXljc0lHWnZZM1Z6UldScGRHRmliR1VwTzF4dUlDQjlYRzVjYmlBZ2FXWWdLRzh1WkdWbVlYVnNkRTF2WkdVZ0ppWWdiMXR2TG1SbFptRjFiSFJOYjJSbFhTa2dlMXh1SUNBZ0lHMXZaR1Z6VzI4dVpHVm1ZWFZzZEUxdlpHVmRMbk5sZENncE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0c4dWJXRnlhMlJ2ZDI0cElIdGNiaUFnSUNCdGIyUmxjeTV0WVhKclpHOTNiaTV6WlhRb0tUdGNiaUFnZlNCbGJITmxJR2xtSUNodkxtaDBiV3dwSUh0Y2JpQWdJQ0J0YjJSbGN5NW9kRzFzTG5ObGRDZ3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJRzF2WkdWekxuZDVjMmwzZVdjdWMyVjBLQ2s3WEc0Z0lIMWNibHh1SUNCaWFXNWtRMjl0YldGdVpITW9jM1Z5Wm1GalpTd2dieXdnWldScGRHOXlLVHRjYmlBZ1ltbHVaRVYyWlc1MGN5Z3BPMXh1WEc0Z0lISmxkSFZ5YmlCbFpHbDBiM0k3WEc1Y2JpQWdablZ1WTNScGIyNGdZV1JrVFc5a1pTQW9hV1FwSUh0Y2JpQWdJQ0IyWVhJZ1luVjBkRzl1SUQwZ2JXOWtaWE5iYVdSZExtSjFkSFJ2Ymp0Y2JpQWdJQ0IyWVhJZ1kzVnpkRzl0SUQwZ2J5NXlaVzVrWlhJdWJXOWtaWE03WEc0Z0lDQWdhV1lnS0c5YmFXUmRLU0I3WEc0Z0lDQWdJQ0J6ZDJsMFkyaGliMkZ5WkM1aGNIQmxibVJEYUdsc1pDaGlkWFIwYjI0cE8xeHVJQ0FnSUNBZ0tIUjVjR1Z2WmlCamRYTjBiMjBnUFQwOUlDZG1kVzVqZEdsdmJpY2dQeUJqZFhOMGIyMGdPaUJ5Wlc1a1pYSmxjbk11Ylc5a1pYTXBLR0oxZEhSdmJpd2dhV1FwTzF4dUlDQWdJQ0FnWTNKdmMzTjJaVzUwTG1Ga1pDaGlkWFIwYjI0c0lDZGpiR2xqYXljc0lHMXZaR1Z6VzJsa1hTNXpaWFFwTzF4dUlDQWdJQ0FnWW5WMGRHOXVMblI1Y0dVZ1BTQW5ZblYwZEc5dUp6dGNiaUFnSUNBZ0lHSjFkSFJ2Ymk1MFlXSkpibVJsZUNBOUlDMHhPMXh1WEc0Z0lDQWdJQ0IyWVhJZ2RHbDBiR1VnUFNCemRISnBibWR6TG5ScGRHeGxjMXRwWkYwN1hHNGdJQ0FnSUNCcFppQW9kR2wwYkdVcElIdGNiaUFnSUNBZ0lDQWdZblYwZEc5dUxuTmxkRUYwZEhKcFluVjBaU2duZEdsMGJHVW5MQ0J0WVdNZ1B5QnRZV05wWm5rb2RHbDBiR1VwSURvZ2RHbDBiR1VwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdKcGJtUkZkbVZ1ZEhNZ0tISmxiVzkyWlNrZ2UxeHVJQ0FnSUhaaGNpQmhjaUE5SUhKbGJXOTJaU0EvSUNkeWJTY2dPaUFuWVdSa0p6dGNiaUFnSUNCMllYSWdiVzkySUQwZ2NtVnRiM1psSUQ4Z0ozSmxiVzkyWlVOb2FXeGtKeUE2SUNkaGNIQmxibVJEYUdsc1pDYzdYRzRnSUNBZ2FXWWdLSEpsYlc5MlpTa2dlMXh1SUNBZ0lDQWdhMkZ1ZVdVdVkyeGxZWElvYTJGdWVXVkRiMjUwWlhoMEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnYVdZZ0tHOHViV0Z5YTJSdmQyNHBJSHNnYTJGdWVXVXViMjRvSjJOdFpDdHRKeXdnYTJGdWVXVlBjSFJwYjI1ekxDQnRZWEpyWkc5M2JrMXZaR1VwT3lCOVhHNGdJQ0FnSUNCcFppQW9ieTVvZEcxc0tTQjdJR3RoYm5sbExtOXVLQ2RqYldRcmFDY3NJR3RoYm5sbFQzQjBhVzl1Y3l3Z2FIUnRiRTF2WkdVcE95QjlYRzRnSUNBZ0lDQnBaaUFvYnk1M2VYTnBkM2xuS1NCN0lHdGhibmxsTG05dUtDZGpiV1FyY0Njc0lHdGhibmxsVDNCMGFXOXVjeXdnZDNsemFYZDVaMDF2WkdVcE95QjlYRzRnSUNBZ2ZWeHVJQ0FnSUdOc1lYTnpaWE5iWVhKZEtIQmhjbVZ1ZEN3Z0ozZHJMV052Ym5SaGFXNWxjaWNwTzF4dUlDQWdJSEJoY21WdWRGdHRiM1pkS0dWa2FYUmhZbXhsS1R0Y2JpQWdJQ0JwWmlBb2NHeGhZMlVwSUhzZ2NHRnlaVzUwVzIxdmRsMG9jR3hoWTJVcE95QjlYRzRnSUNBZ2NHRnlaVzUwVzIxdmRsMG9ZMjl0YldGdVpITXBPMXh1SUNBZ0lIQmhjbVZ1ZEZ0dGIzWmRLSE4zYVhSamFHSnZZWEprS1R0Y2JpQWdJQ0JwWmlBb2J5NXBiV0ZuWlhNZ2ZId2dieTVoZEhSaFkyaHRaVzUwY3lrZ2UxeHVJQ0FnSUNBZ2NHRnlaVzUwVzIxdmRsMG9aSEp2Y0dGeVpXRXBPMXh1SUNBZ0lDQWdkWEJzYjJGa2N5aHdZWEpsYm5Rc0lHUnliM0JoY21WaExDQmxaR2wwYjNJc0lHOHNJSEpsYlc5MlpTazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdaR1Z6ZEhKdmVTQW9LU0I3WEc0Z0lDQWdhV1lnS0dWa2FYUnZjaTV0YjJSbElDRTlQU0FuYldGeWEyUnZkMjRuS1NCN1hHNGdJQ0FnSUNCMFpYaDBZWEpsWVM1MllXeDFaU0E5SUdkbGRFMWhjbXRrYjNkdUtDazdYRzRnSUNBZ2ZWeHVJQ0FnSUdOc1lYTnpaWE11Y20wb2RHVjRkR0Z5WldFc0lDZDNheTFvYVdSbEp5azdYRzRnSUNBZ1ltbHVaRVYyWlc1MGN5aDBjblZsS1R0Y2JpQWdJQ0JrWld4bGRHVWdZMkZqYUdWYmFTQXRJREZkTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2JXRnlhMlJ2ZDI1TmIyUmxJQ2hsS1NCN0lIQmxjbk5wYzNSTmIyUmxLQ2R0WVhKclpHOTNiaWNzSUdVcE95QjlYRzRnSUdaMWJtTjBhVzl1SUdoMGJXeE5iMlJsSUNobEtTQjdJSEJsY25OcGMzUk5iMlJsS0Nkb2RHMXNKeXdnWlNrN0lIMWNiaUFnWm5WdVkzUnBiMjRnZDNsemFYZDVaMDF2WkdVZ0tHVXBJSHNnY0dWeWMybHpkRTF2WkdVb0ozZDVjMmwzZVdjbkxDQmxLVHNnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSEJsY25OcGMzUk5iMlJsSUNodVpYaDBUVzlrWlN3Z1pTa2dlMXh1SUNBZ0lIWmhjaUJ5WlcxbGJXSnlZVzVqWlR0Y2JpQWdJQ0IyWVhJZ1kzVnljbVZ1ZEUxdlpHVWdQU0JsWkdsMGIzSXViVzlrWlR0Y2JpQWdJQ0IyWVhJZ2IyeGtJRDBnYlc5a1pYTmJZM1Z5Y21WdWRFMXZaR1ZkTG1KMWRIUnZianRjYmlBZ0lDQjJZWElnWW5WMGRHOXVJRDBnYlc5a1pYTmJibVY0ZEUxdlpHVmRMbUoxZEhSdmJqdGNiaUFnSUNCMllYSWdabTlqZFhOcGJtY2dQU0FoSVdVZ2ZId2daRzlqTG1GamRHbDJaVVZzWlcxbGJuUWdQVDA5SUhSbGVIUmhjbVZoSUh4OElHUnZZeTVoWTNScGRtVkZiR1Z0Wlc1MElEMDlQU0JsWkdsMFlXSnNaVHRjYmx4dUlDQWdJSE4wYjNBb1pTazdYRzVjYmlBZ0lDQnBaaUFvWTNWeWNtVnVkRTF2WkdVZ1BUMDlJRzVsZUhSTmIyUmxLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2NtVnRaVzFpY21GdVkyVWdQU0JtYjJOMWMybHVaeUFtSmlCeVpXMWxiV0psY2xObGJHVmpkR2x2Ymlob2FYTjBiM0o1TENCdktUdGNiaUFnSUNCMFpYaDBZWEpsWVM1aWJIVnlLQ2s3SUM4dklHRjJaWEowSUdOb2NtOXRaU0J5WlhCaGFXNTBJR0oxWjNOY2JseHVJQ0FnSUdsbUlDaHVaWGgwVFc5a1pTQTlQVDBnSjIxaGNtdGtiM2R1SnlrZ2UxeHVJQ0FnSUNBZ2FXWWdLR04xY25KbGJuUk5iMlJsSUQwOVBTQW5hSFJ0YkNjcElIdGNiaUFnSUNBZ0lDQWdkR1Y0ZEdGeVpXRXVkbUZzZFdVZ1BTQndZWEp6WlNnbmNHRnljMlZJVkUxTUp5d2dkR1Y0ZEdGeVpXRXVkbUZzZFdVcExuUnlhVzBvS1R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUhSbGVIUmhjbVZoTG5aaGJIVmxJRDBnY0dGeWMyVW9KM0JoY25ObFNGUk5UQ2NzSUdWa2FYUmhZbXhsS1M1MGNtbHRLQ2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2h1WlhoMFRXOWtaU0E5UFQwZ0oyaDBiV3duS1NCN1hHNGdJQ0FnSUNCcFppQW9ZM1Z5Y21WdWRFMXZaR1VnUFQwOUlDZHRZWEpyWkc5M2JpY3BJSHRjYmlBZ0lDQWdJQ0FnZEdWNGRHRnlaV0V1ZG1Gc2RXVWdQU0J3WVhKelpTZ25jR0Z5YzJWTllYSnJaRzkzYmljc0lIUmxlSFJoY21WaExuWmhiSFZsS1M1MGNtbHRLQ2s3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0IwWlhoMFlYSmxZUzUyWVd4MVpTQTlJR1ZrYVhSaFlteGxMbWx1Ym1WeVNGUk5UQzUwY21sdEtDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaHVaWGgwVFc5a1pTQTlQVDBnSjNkNWMybDNlV2NuS1NCN1hHNGdJQ0FnSUNCcFppQW9ZM1Z5Y21WdWRFMXZaR1VnUFQwOUlDZHRZWEpyWkc5M2JpY3BJSHRjYmlBZ0lDQWdJQ0FnWldScGRHRmliR1V1YVc1dVpYSklWRTFNSUQwZ2NHRnljMlVvSjNCaGNuTmxUV0Z5YTJSdmQyNG5MQ0IwWlhoMFlYSmxZUzUyWVd4MVpTa3VjbVZ3YkdGalpTaHljR0Z5WVdkeVlYQm9MQ0FuSnlrdWRISnBiU2dwTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnWldScGRHRmliR1V1YVc1dVpYSklWRTFNSUQwZ2RHVjRkR0Z5WldFdWRtRnNkV1V1Y21Wd2JHRmpaU2h5Y0dGeVlXZHlZWEJvTENBbkp5a3VkSEpwYlNncE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaHVaWGgwVFc5a1pTQTlQVDBnSjNkNWMybDNlV2NuS1NCN1hHNGdJQ0FnSUNCamJHRnpjMlZ6TG1Ga1pDaDBaWGgwWVhKbFlTd2dKM2RyTFdocFpHVW5LVHRjYmlBZ0lDQWdJR05zWVhOelpYTXVjbTBvWldScGRHRmliR1VzSUNkM2F5MW9hV1JsSnlrN1hHNGdJQ0FnSUNCcFppQW9jR3hoWTJVcElIc2dZMnhoYzNObGN5NXliU2h3YkdGalpTd2dKM2RyTFdocFpHVW5LVHNnZlZ4dUlDQWdJQ0FnYVdZZ0tHWnZZM1Z6YVc1bktTQjdJSE5sZEZScGJXVnZkWFFvWm05amRYTkZaR2wwWVdKc1pTd2dNQ2s3SUgxY2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdZMnhoYzNObGN5NXliU2gwWlhoMFlYSmxZU3dnSjNkckxXaHBaR1VuS1R0Y2JpQWdJQ0FnSUdOc1lYTnpaWE11WVdSa0tHVmthWFJoWW14bExDQW5kMnN0YUdsa1pTY3BPMXh1SUNBZ0lDQWdhV1lnS0hCc1lXTmxLU0I3SUdOc1lYTnpaWE11WVdSa0tIQnNZV05sTENBbmQyc3RhR2xrWlNjcE95QjlYRzRnSUNBZ0lDQnBaaUFvWm05amRYTnBibWNwSUhzZ2RHVjRkR0Z5WldFdVptOWpkWE1vS1RzZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0JqYkdGemMyVnpMbUZrWkNoaWRYUjBiMjRzSUNkM2F5MXRiMlJsTFdGamRHbDJaU2NwTzF4dUlDQWdJR05zWVhOelpYTXVjbTBvYjJ4a0xDQW5kMnN0Ylc5a1pTMWhZM1JwZG1VbktUdGNiaUFnSUNCamJHRnpjMlZ6TG1Ga1pDaHZiR1FzSUNkM2F5MXRiMlJsTFdsdVlXTjBhWFpsSnlrN1hHNGdJQ0FnWTJ4aGMzTmxjeTV5YlNoaWRYUjBiMjRzSUNkM2F5MXRiMlJsTFdsdVlXTjBhWFpsSnlrN1hHNGdJQ0FnWW5WMGRHOXVMbk5sZEVGMGRISnBZblYwWlNnblpHbHpZV0pzWldRbkxDQW5aR2x6WVdKc1pXUW5LVHRjYmlBZ0lDQnZiR1F1Y21WdGIzWmxRWFIwY21saWRYUmxLQ2RrYVhOaFlteGxaQ2NwTzF4dUlDQWdJR1ZrYVhSdmNpNXRiMlJsSUQwZ2JtVjRkRTF2WkdVN1hHNWNiaUFnSUNCcFppQW9ieTV6ZEc5eVlXZGxLU0I3SUd4ekxuTmxkQ2h2TG5OMGIzSmhaMlVzSUc1bGVIUk5iMlJsS1RzZ2ZWeHVYRzRnSUNBZ2FHbHpkRzl5ZVM1elpYUkpibkIxZEUxdlpHVW9ibVY0ZEUxdlpHVXBPMXh1SUNBZ0lHbG1JQ2h5WlcxbGJXSnlZVzVqWlNrZ2V5QnlaVzFsYldKeVlXNWpaUzUxYm0xaGNtc29LVHNnZlZ4dUlDQWdJR1pwY21WTVlYUmxjaWduZDI5dlptMWhjbXN0Ylc5a1pTMWphR0Z1WjJVbktUdGNibHh1SUNBZ0lHWjFibU4wYVc5dUlIQmhjbk5sSUNodFpYUm9iMlFzSUdsdWNIVjBLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdiMXR0WlhSb2IyUmRLR2x1Y0hWMExDQjdYRzRnSUNBZ0lDQWdJRzFoY210bGNuTTZJSEpsYldWdFluSmhibU5sSUNZbUlISmxiV1Z0WW5KaGJtTmxMbTFoY210bGNuTWdmSHdnVzExY2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHWnBjbVZNWVhSbGNpQW9kSGx3WlNrZ2UxeHVJQ0FnSUhObGRGUnBiV1Z2ZFhRb1puVnVZM1JwYjI0Z1ptbHlaU0FvS1NCN1hHNGdJQ0FnSUNCamNtOXpjM1psYm5RdVptRmljbWxqWVhSbEtIUmxlSFJoY21WaExDQjBlWEJsS1R0Y2JpQWdJQ0I5TENBd0tUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR1p2WTNWelJXUnBkR0ZpYkdVZ0tDa2dlMXh1SUNBZ0lHVmthWFJoWW14bExtWnZZM1Z6S0NrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQm5aWFJOWVhKclpHOTNiaUFvS1NCN1hHNGdJQ0FnYVdZZ0tHVmthWFJ2Y2k1dGIyUmxJRDA5UFNBbmQzbHphWGQ1WnljcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCdkxuQmhjbk5sU0ZSTlRDaGxaR2wwWVdKc1pTazdYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaGxaR2wwYjNJdWJXOWtaU0E5UFQwZ0oyaDBiV3duS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnYnk1d1lYSnpaVWhVVFV3b2RHVjRkR0Z5WldFdWRtRnNkV1VwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z2RHVjRkR0Z5WldFdWRtRnNkV1U3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCblpYUlBjbE5sZEZaaGJIVmxJQ2hwYm5CMWRDa2dlMXh1SUNBZ0lIWmhjaUJ0WVhKclpHOTNiaUE5SUZOMGNtbHVaeWhwYm5CMWRDazdYRzRnSUNBZ2RtRnlJSE5sZEhNZ1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb0lEMDlQU0F4TzF4dUlDQWdJR2xtSUNoelpYUnpLU0I3WEc0Z0lDQWdJQ0JwWmlBb1pXUnBkRzl5TG0xdlpHVWdQVDA5SUNkM2VYTnBkM2xuSnlrZ2UxeHVJQ0FnSUNBZ0lDQmxaR2wwWVdKc1pTNXBibTVsY2toVVRVd2dQU0JoYzBoMGJXd29LVHRjYmlBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJSFJsZUhSaGNtVmhMblpoYkhWbElEMGdaV1JwZEc5eUxtMXZaR1VnUFQwOUlDZG9kRzFzSnlBL0lHRnpTSFJ0YkNncElEb2diV0Z5YTJSdmQyNDdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQm9hWE4wYjNKNUxuSmxjMlYwS0NrN1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQm5aWFJOWVhKclpHOTNiaWdwTzF4dUlDQWdJR1oxYm1OMGFXOXVJR0Z6U0hSdGJDQW9LU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdieTV3WVhKelpVMWhjbXRrYjNkdUtHMWhjbXRrYjNkdUtUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmhaR1JEYjIxdFlXNWtRblYwZEc5dUlDaHBaQ3dnWTI5dFltOHNJR1p1S1NCN1hHNGdJQ0FnYVdZZ0tHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnZ1BUMDlJRElwSUh0Y2JpQWdJQ0FnSUdadUlEMGdZMjl0WW04N1hHNGdJQ0FnSUNCamIyMWlieUE5SUc1MWJHdzdYRzRnSUNBZ2ZWeHVJQ0FnSUhaaGNpQmlkWFIwYjI0Z1BTQjBZV2NvZXlCME9pQW5ZblYwZEc5dUp5d2dZem9nSjNkckxXTnZiVzFoYm1RbkxDQndPaUJqYjIxdFlXNWtjeUI5S1R0Y2JpQWdJQ0IyWVhJZ1kzVnpkRzl0SUQwZ2J5NXlaVzVrWlhJdVkyOXRiV0Z1WkhNN1hHNGdJQ0FnZG1GeUlISmxibVJsY2lBOUlIUjVjR1Z2WmlCamRYTjBiMjBnUFQwOUlDZG1kVzVqZEdsdmJpY2dQeUJqZFhOMGIyMGdPaUJ5Wlc1a1pYSmxjbk11WTI5dGJXRnVaSE03WEc0Z0lDQWdkbUZ5SUhScGRHeGxJRDBnYzNSeWFXNW5jeTUwYVhSc1pYTmJhV1JkTzF4dUlDQWdJR2xtSUNoMGFYUnNaU2tnZTF4dUlDQWdJQ0FnWW5WMGRHOXVMbk5sZEVGMGRISnBZblYwWlNnbmRHbDBiR1VuTENCdFlXTWdQeUJ0WVdOcFpua29kR2wwYkdVcElEb2dkR2wwYkdVcE8xeHVJQ0FnSUgxY2JpQWdJQ0JpZFhSMGIyNHVkSGx3WlNBOUlDZGlkWFIwYjI0bk8xeHVJQ0FnSUdKMWRIUnZiaTUwWVdKSmJtUmxlQ0E5SUMweE8xeHVJQ0FnSUhKbGJtUmxjaWhpZFhSMGIyNHNJR2xrS1R0Y2JpQWdJQ0JqY205emMzWmxiblF1WVdSa0tHSjFkSFJ2Yml3Z0oyTnNhV05ySnl3Z1oyVjBRMjl0YldGdVpFaGhibVJzWlhJb2MzVnlabUZqWlN3Z2FHbHpkRzl5ZVN3Z1ptNHBLVHRjYmlBZ0lDQnBaaUFvWTI5dFltOHBJSHRjYmlBZ0lDQWdJR0ZrWkVOdmJXMWhibVFvWTI5dFltOHNJR1p1S1R0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHSjFkSFJ2Ymp0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHRmtaRU52YlcxaGJtUWdLR052YldKdkxDQm1iaWtnZTF4dUlDQWdJR3RoYm5sbExtOXVLR052YldKdkxDQnJZVzU1WlU5d2RHbHZibk1zSUdkbGRFTnZiVzFoYm1SSVlXNWtiR1Z5S0hOMWNtWmhZMlVzSUdocGMzUnZjbmtzSUdadUtTazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ5ZFc1RGIyMXRZVzVrSUNobWJpa2dlMXh1SUNBZ0lHZGxkRU52YlcxaGJtUklZVzVrYkdWeUtITjFjbVpoWTJVc0lHaHBjM1J2Y25rc0lISmxZWEp5WVc1blpTa29iblZzYkNrN1hHNGdJQ0FnWm5WdVkzUnBiMjRnY21WaGNuSmhibWRsSUNobExDQnRiMlJsTENCamFIVnVhM01wSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtYmk1allXeHNLSFJvYVhNc0lHTm9kVzVyY3l3Z2JXOWtaU2s3WEc0Z0lDQWdmVnh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUhSaFp5QW9iM0IwYVc5dWN5a2dlMXh1SUNCMllYSWdieUE5SUc5d2RHbHZibk1nZkh3Z2UzMDdYRzRnSUhaaGNpQmxiQ0E5SUdSdll5NWpjbVZoZEdWRmJHVnRaVzUwS0c4dWRDQjhmQ0FuWkdsMkp5azdYRzRnSUdWc0xtTnNZWE56VG1GdFpTQTlJRzh1WXlCOGZDQW5KenRjYmlBZ2MyVjBWR1Y0ZENobGJDd2dieTU0SUh4OElDY25LVHRjYmlBZ2FXWWdLRzh1Y0NrZ2V5QnZMbkF1WVhCd1pXNWtRMmhwYkdRb1pXd3BPeUI5WEc0Z0lISmxkSFZ5YmlCbGJEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2MzUnZjQ0FvWlNrZ2UxeHVJQ0JwWmlBb1pTa2dleUJsTG5CeVpYWmxiblJFWldaaGRXeDBLQ2s3SUdVdWMzUnZjRkJ5YjNCaFoyRjBhVzl1S0NrN0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z2JXRmphV1o1SUNoMFpYaDBLU0I3WEc0Z0lISmxkSFZ5YmlCMFpYaDBYRzRnSUNBZ0xuSmxjR3hoWTJVb0wxeGNZbU4wY214Y1hHSXZhU3dnSjF4Y2RUSXpNVGduS1Z4dUlDQWdJQzV5WlhCc1lXTmxLQzljWEdKaGJIUmNYR0l2YVN3Z0oxeGNkVEl6TWpVbktWeHVJQ0FnSUM1eVpYQnNZV05sS0M5Y1hHSnphR2xtZEZ4Y1lpOXBMQ0FuWEZ4MU1qRmxOeWNwTzF4dWZWeHVYRzUzYjI5bWJXRnlheTVtYVc1a0lEMGdabWx1WkR0Y2JuZHZiMlp0WVhKckxuTjBjbWx1WjNNZ1BTQnpkSEpwYm1kek8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjNiMjltYldGeWF6dGNiaUpkZlE9PSJdfQ==
