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
      fieldKey: upload.fieldKey,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXRvYS9hdG9hLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL2J1bGxzZXllLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL3RhaWxvcm1hZGUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvdGhyb3R0bGUuanMiLCJub2RlX21vZHVsZXMvYnVyZWF1Y3JhY3kvYnVyZWF1Y3JhY3kuanMiLCJub2RlX21vZHVsZXMvYnVyZWF1Y3JhY3kvbm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2J1cmVhdWNyYWN5L25vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2V2ZW50bWFwLmpzIiwibm9kZV9tb2R1bGVzL2NvbnRyYS9kZWJvdW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9jb250cmEvZW1pdHRlci5qcyIsIm5vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2Nyb3NzdmVudC5qcyIsIm5vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2V2ZW50bWFwLmpzIiwibm9kZV9tb2R1bGVzL2N1c3RvbS1ldmVudC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mb3ItZWFjaC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwibm9kZV9tb2R1bGVzL2lzLWZ1bmN0aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2thbnllL2thbnllLmpzIiwibm9kZV9tb2R1bGVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2NhbC1zdG9yYWdlL3N0dWIuanMiLCJub2RlX21vZHVsZXMvbG9jYWwtc3RvcmFnZS90cmFja2luZy5qcyIsIm5vZGVfbW9kdWxlcy9wYXJzZS1oZWFkZXJzL3BhcnNlLWhlYWRlcnMuanMiLCJub2RlX21vZHVsZXMvc2VrdG9yL3NyYy9zZWt0b3IuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25OdWxsT3AuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25SYXcuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25TeW50aGV0aWMuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9pc0hvc3QuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9yYW5nZVRvVGV4dFJhbmdlLmpzIiwibm9kZV9tb2R1bGVzL3NlbGVjY2lvbi9zcmMvc2VsZWNjaW9uLmpzIiwibm9kZV9tb2R1bGVzL3NlbGVjY2lvbi9zcmMvc2V0U2VsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3NlbGwvc2VsbC5qcyIsIm5vZGVfbW9kdWxlcy90aWNreS90aWNreS1icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3RyaW0vaW5kZXguanMiLCJub2RlX21vZHVsZXMveGhyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3h0ZW5kL2ltbXV0YWJsZS5qcyIsInNyYy9JbnB1dEhpc3RvcnkuanMiLCJzcmMvSW5wdXRTdGF0ZS5qcyIsInNyYy9iaW5kQ29tbWFuZHMuanMiLCJzcmMvY2FzdC5qcyIsInNyYy9jaHVua3MvcGFyc2VMaW5rSW5wdXQuanMiLCJzcmMvY2h1bmtzL3RyaW0uanMiLCJzcmMvY2xhc3Nlcy5qcyIsInNyYy9leHRlbmRSZWdFeHAuanMiLCJzcmMvZml4RU9MLmpzIiwic3JjL2dldENvbW1hbmRIYW5kbGVyLmpzIiwic3JjL2dldFN1cmZhY2UuanMiLCJzcmMvZ2V0VGV4dC5qcyIsInNyYy9odG1sL0h0bWxDaHVua3MuanMiLCJzcmMvaHRtbC9ibG9ja3F1b3RlLmpzIiwic3JjL2h0bWwvYm9sZE9ySXRhbGljLmpzIiwic3JjL2h0bWwvY29kZWJsb2NrLmpzIiwic3JjL2h0bWwvaGVhZGluZy5qcyIsInNyYy9odG1sL2hyLmpzIiwic3JjL2h0bWwvbGlua09ySW1hZ2VPckF0dGFjaG1lbnQuanMiLCJzcmMvaHRtbC9saXN0LmpzIiwic3JjL2h0bWwvd3JhcHBpbmcuanMiLCJzcmMvaXNWaXNpYmxlRWxlbWVudC5qcyIsInNyYy9tYW55LmpzIiwic3JjL21hcmtkb3duL01hcmtkb3duQ2h1bmtzLmpzIiwic3JjL21hcmtkb3duL2Jsb2NrcXVvdGUuanMiLCJzcmMvbWFya2Rvd24vYm9sZE9ySXRhbGljLmpzIiwic3JjL21hcmtkb3duL2NvZGVibG9jay5qcyIsInNyYy9tYXJrZG93bi9oZWFkaW5nLmpzIiwic3JjL21hcmtkb3duL2hyLmpzIiwic3JjL21hcmtkb3duL2xpbmtPckltYWdlT3JBdHRhY2htZW50LmpzIiwic3JjL21hcmtkb3duL2xpc3QuanMiLCJzcmMvbWFya2Rvd24vc2V0dGluZ3MuanMiLCJzcmMvbWFya2Rvd24vd3JhcHBpbmcuanMiLCJzcmMvb25jZS5qcyIsInNyYy9wcm9tcHRzL2Nsb3NlLmpzIiwic3JjL3Byb21wdHMvcHJvbXB0LmpzIiwic3JjL3Byb21wdHMvcmVuZGVyLmpzIiwic3JjL3JlbWVtYmVyU2VsZWN0aW9uLmpzIiwic3JjL3JlbmRlcmVycy5qcyIsInNyYy9zZXRUZXh0LmpzIiwic3JjL3N0cmluZ3MuanMiLCJzcmMvdXBsb2Fkcy5qcyIsInNyYy93b29mbWFyay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGF0b2EgKGEsIG4pIHsgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGEsIG4pOyB9XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciB0aHJvdHRsZSA9IHJlcXVpcmUoJy4vdGhyb3R0bGUnKTtcbnZhciB0YWlsb3JtYWRlID0gcmVxdWlyZSgnLi90YWlsb3JtYWRlJyk7XG5cbmZ1bmN0aW9uIGJ1bGxzZXllIChlbCwgdGFyZ2V0LCBvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucztcbiAgdmFyIGRvbVRhcmdldCA9IHRhcmdldCAmJiB0YXJnZXQudGFnTmFtZTtcblxuICBpZiAoIWRvbVRhcmdldCAmJiBhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgbyA9IHRhcmdldDtcbiAgfVxuICBpZiAoIWRvbVRhcmdldCkge1xuICAgIHRhcmdldCA9IGVsO1xuICB9XG4gIGlmICghbykgeyBvID0ge307IH1cblxuICB2YXIgZGVzdHJveWVkID0gZmFsc2U7XG4gIHZhciB0aHJvdHRsZWRXcml0ZSA9IHRocm90dGxlKHdyaXRlLCAzMCk7XG4gIHZhciB0YWlsb3JPcHRpb25zID0geyB1cGRhdGU6IG8uYXV0b3VwZGF0ZVRvQ2FyZXQgIT09IGZhbHNlICYmIHVwZGF0ZSB9O1xuICB2YXIgdGFpbG9yID0gby5jYXJldCAmJiB0YWlsb3JtYWRlKHRhcmdldCwgdGFpbG9yT3B0aW9ucyk7XG5cbiAgd3JpdGUoKTtcblxuICBpZiAoby50cmFja2luZyAhPT0gZmFsc2UpIHtcbiAgICBjcm9zc3ZlbnQuYWRkKHdpbmRvdywgJ3Jlc2l6ZScsIHRocm90dGxlZFdyaXRlKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVhZDogcmVhZE51bGwsXG4gICAgcmVmcmVzaDogd3JpdGUsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBzbGVlcDogc2xlZXBcbiAgfTtcblxuICBmdW5jdGlvbiBzbGVlcCAoKSB7XG4gICAgdGFpbG9yT3B0aW9ucy5zbGVlcGluZyA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkTnVsbCAoKSB7IHJldHVybiByZWFkKCk7IH1cblxuICBmdW5jdGlvbiByZWFkIChyZWFkaW5ncykge1xuICAgIHZhciBib3VuZHMgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIHNjcm9sbFRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKHRhaWxvcikge1xuICAgICAgcmVhZGluZ3MgPSB0YWlsb3IucmVhZCgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogKHJlYWRpbmdzLmFic29sdXRlID8gMCA6IGJvdW5kcy5sZWZ0KSArIHJlYWRpbmdzLngsXG4gICAgICAgIHk6IChyZWFkaW5ncy5hYnNvbHV0ZSA/IDAgOiBib3VuZHMudG9wKSArIHNjcm9sbFRvcCArIHJlYWRpbmdzLnkgKyAyMFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGJvdW5kcy5sZWZ0LFxuICAgICAgeTogYm91bmRzLnRvcCArIHNjcm9sbFRvcFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKHJlYWRpbmdzKSB7XG4gICAgd3JpdGUocmVhZGluZ3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUgKHJlYWRpbmdzKSB7XG4gICAgaWYgKGRlc3Ryb3llZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCdWxsc2V5ZSBjYW5cXCd0IHJlZnJlc2ggYWZ0ZXIgYmVpbmcgZGVzdHJveWVkLiBDcmVhdGUgYW5vdGhlciBpbnN0YW5jZSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICBpZiAodGFpbG9yICYmICFyZWFkaW5ncykge1xuICAgICAgdGFpbG9yT3B0aW9ucy5zbGVlcGluZyA9IGZhbHNlO1xuICAgICAgdGFpbG9yLnJlZnJlc2goKTsgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcCA9IHJlYWQocmVhZGluZ3MpO1xuICAgIGlmICghdGFpbG9yICYmIHRhcmdldCAhPT0gZWwpIHtcbiAgICAgIHAueSArPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICBlbC5zdHlsZS5sZWZ0ID0gcC54ICsgJ3B4JztcbiAgICBlbC5zdHlsZS50b3AgPSBwLnkgKyAncHgnO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgaWYgKHRhaWxvcikgeyB0YWlsb3IuZGVzdHJveSgpOyB9XG4gICAgY3Jvc3N2ZW50LnJlbW92ZSh3aW5kb3csICdyZXNpemUnLCB0aHJvdHRsZWRXcml0ZSk7XG4gICAgZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1bGxzZXllO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2VsbCA9IHJlcXVpcmUoJ3NlbGwnKTtcbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBzZWxlY2Npb24gPSByZXF1aXJlKCdzZWxlY2Npb24nKTtcbnZhciB0aHJvdHRsZSA9IHJlcXVpcmUoJy4vdGhyb3R0bGUnKTtcbnZhciBnZXRTZWxlY3Rpb24gPSBzZWxlY2Npb24uZ2V0O1xudmFyIHByb3BzID0gW1xuICAnZGlyZWN0aW9uJyxcbiAgJ2JveFNpemluZycsXG4gICd3aWR0aCcsXG4gICdoZWlnaHQnLFxuICAnb3ZlcmZsb3dYJyxcbiAgJ292ZXJmbG93WScsXG4gICdib3JkZXJUb3BXaWR0aCcsXG4gICdib3JkZXJSaWdodFdpZHRoJyxcbiAgJ2JvcmRlckJvdHRvbVdpZHRoJyxcbiAgJ2JvcmRlckxlZnRXaWR0aCcsXG4gICdwYWRkaW5nVG9wJyxcbiAgJ3BhZGRpbmdSaWdodCcsXG4gICdwYWRkaW5nQm90dG9tJyxcbiAgJ3BhZGRpbmdMZWZ0JyxcbiAgJ2ZvbnRTdHlsZScsXG4gICdmb250VmFyaWFudCcsXG4gICdmb250V2VpZ2h0JyxcbiAgJ2ZvbnRTdHJldGNoJyxcbiAgJ2ZvbnRTaXplJyxcbiAgJ2ZvbnRTaXplQWRqdXN0JyxcbiAgJ2xpbmVIZWlnaHQnLFxuICAnZm9udEZhbWlseScsXG4gICd0ZXh0QWxpZ24nLFxuICAndGV4dFRyYW5zZm9ybScsXG4gICd0ZXh0SW5kZW50JyxcbiAgJ3RleHREZWNvcmF0aW9uJyxcbiAgJ2xldHRlclNwYWNpbmcnLFxuICAnd29yZFNwYWNpbmcnXG5dO1xudmFyIHdpbiA9IGdsb2JhbDtcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBmZiA9IHdpbi5tb3pJbm5lclNjcmVlblggIT09IG51bGwgJiYgd2luLm1veklubmVyU2NyZWVuWCAhPT0gdm9pZCAwO1xuXG5mdW5jdGlvbiB0YWlsb3JtYWRlIChlbCwgb3B0aW9ucykge1xuICB2YXIgdGV4dElucHV0ID0gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnO1xuICB2YXIgdGhyb3R0bGVkUmVmcmVzaCA9IHRocm90dGxlKHJlZnJlc2gsIDMwKTtcbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuXG4gIGJpbmQoKTtcblxuICByZXR1cm4ge1xuICAgIHJlYWQ6IHJlYWRQb3NpdGlvbixcbiAgICByZWZyZXNoOiB0aHJvdHRsZWRSZWZyZXNoLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfTtcblxuICBmdW5jdGlvbiBub29wICgpIHt9XG4gIGZ1bmN0aW9uIHJlYWRQb3NpdGlvbiAoKSB7IHJldHVybiAodGV4dElucHV0ID8gY29vcmRzVGV4dCA6IGNvb3Jkc0hUTUwpKCk7IH1cblxuICBmdW5jdGlvbiByZWZyZXNoICgpIHtcbiAgICBpZiAoby5zbGVlcGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gKG8udXBkYXRlIHx8IG5vb3ApKHJlYWRQb3NpdGlvbigpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvb3Jkc1RleHQgKCkge1xuICAgIHZhciBwID0gc2VsbChlbCk7XG4gICAgdmFyIGNvbnRleHQgPSBwcmVwYXJlKCk7XG4gICAgdmFyIHJlYWRpbmdzID0gcmVhZFRleHRDb29yZHMoY29udGV4dCwgcC5zdGFydCk7XG4gICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoY29udGV4dC5taXJyb3IpO1xuICAgIHJldHVybiByZWFkaW5ncztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvb3Jkc0hUTUwgKCkge1xuICAgIHZhciBzZWwgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICBpZiAoc2VsLnJhbmdlQ291bnQpIHtcbiAgICAgIHZhciByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xuICAgICAgdmFyIG5lZWRzVG9Xb3JrQXJvdW5kTmV3bGluZUJ1ZyA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm5vZGVOYW1lID09PSAnUCcgJiYgcmFuZ2Uuc3RhcnRPZmZzZXQgPT09IDA7XG4gICAgICBpZiAobmVlZHNUb1dvcmtBcm91bmROZXdsaW5lQnVnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogcmFuZ2Uuc3RhcnRDb250YWluZXIub2Zmc2V0TGVmdCxcbiAgICAgICAgICB5OiByYW5nZS5zdGFydENvbnRhaW5lci5vZmZzZXRUb3AsXG4gICAgICAgICAgYWJzb2x1dGU6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChyYW5nZS5nZXRDbGllbnRSZWN0cykge1xuICAgICAgICB2YXIgcmVjdHMgPSByYW5nZS5nZXRDbGllbnRSZWN0cygpO1xuICAgICAgICBpZiAocmVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiByZWN0c1swXS5sZWZ0LFxuICAgICAgICAgICAgeTogcmVjdHNbMF0udG9wLFxuICAgICAgICAgICAgYWJzb2x1dGU6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHg6IDAsIHk6IDAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRUZXh0Q29vcmRzIChjb250ZXh0LCBwKSB7XG4gICAgdmFyIHJlc3QgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHZhciBtaXJyb3IgPSBjb250ZXh0Lm1pcnJvcjtcbiAgICB2YXIgY29tcHV0ZWQgPSBjb250ZXh0LmNvbXB1dGVkO1xuXG4gICAgd3JpdGUobWlycm9yLCByZWFkKGVsKS5zdWJzdHJpbmcoMCwgcCkpO1xuXG4gICAgaWYgKGVsLnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgIG1pcnJvci50ZXh0Q29udGVudCA9IG1pcnJvci50ZXh0Q29udGVudC5yZXBsYWNlKC9cXHMvZywgJ1xcdTAwYTAnKTtcbiAgICB9XG5cbiAgICB3cml0ZShyZXN0LCByZWFkKGVsKS5zdWJzdHJpbmcocCkgfHwgJy4nKTtcblxuICAgIG1pcnJvci5hcHBlbmRDaGlsZChyZXN0KTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiByZXN0Lm9mZnNldExlZnQgKyBwYXJzZUludChjb21wdXRlZFsnYm9yZGVyTGVmdFdpZHRoJ10pLFxuICAgICAgeTogcmVzdC5vZmZzZXRUb3AgKyBwYXJzZUludChjb21wdXRlZFsnYm9yZGVyVG9wV2lkdGgnXSlcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoZWwpIHtcbiAgICByZXR1cm4gdGV4dElucHV0ID8gZWwudmFsdWUgOiBlbC5pbm5lckhUTUw7XG4gIH1cblxuICBmdW5jdGlvbiBwcmVwYXJlICgpIHtcbiAgICB2YXIgY29tcHV0ZWQgPSB3aW4uZ2V0Q29tcHV0ZWRTdHlsZSA/IGdldENvbXB1dGVkU3R5bGUoZWwpIDogZWwuY3VycmVudFN0eWxlO1xuICAgIHZhciBtaXJyb3IgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIHN0eWxlID0gbWlycm9yLnN0eWxlO1xuXG4gICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQobWlycm9yKTtcblxuICAgIGlmIChlbC50YWdOYW1lICE9PSAnSU5QVVQnKSB7XG4gICAgICBzdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJztcbiAgICB9XG4gICAgc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCc7XG4gICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICBwcm9wcy5mb3JFYWNoKGNvcHkpO1xuXG4gICAgaWYgKGZmKSB7XG4gICAgICBzdHlsZS53aWR0aCA9IHBhcnNlSW50KGNvbXB1dGVkLndpZHRoKSAtIDIgKyAncHgnO1xuICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+IHBhcnNlSW50KGNvbXB1dGVkLmhlaWdodCkpIHtcbiAgICAgICAgc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgfVxuICAgIHJldHVybiB7IG1pcnJvcjogbWlycm9yLCBjb21wdXRlZDogY29tcHV0ZWQgfTtcblxuICAgIGZ1bmN0aW9uIGNvcHkgKHByb3ApIHtcbiAgICAgIHN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUgKGVsLCB2YWx1ZSkge1xuICAgIGlmICh0ZXh0SW5wdXQpIHtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmQgKHJlbW92ZSkge1xuICAgIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleWRvd24nLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAna2V5dXAnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAnaW5wdXQnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAncGFzdGUnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAnY2hhbmdlJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBiaW5kKHRydWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGFpbG9ybWFkZTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWRXeHNjMlY1WlM5MFlXbHNiM0p0WVdSbExtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJSE5sYkd3Z1BTQnlaWEYxYVhKbEtDZHpaV3hzSnlrN1hHNTJZWElnWTNKdmMzTjJaVzUwSUQwZ2NtVnhkV2x5WlNnblkzSnZjM04yWlc1MEp5azdYRzUyWVhJZ2MyVnNaV05qYVc5dUlEMGdjbVZ4ZFdseVpTZ25jMlZzWldOamFXOXVKeWs3WEc1MllYSWdkR2h5YjNSMGJHVWdQU0J5WlhGMWFYSmxLQ2N1TDNSb2NtOTBkR3hsSnlrN1hHNTJZWElnWjJWMFUyVnNaV04wYVc5dUlEMGdjMlZzWldOamFXOXVMbWRsZER0Y2JuWmhjaUJ3Y205d2N5QTlJRnRjYmlBZ0oyUnBjbVZqZEdsdmJpY3NYRzRnSUNkaWIzaFRhWHBwYm1jbkxGeHVJQ0FuZDJsa2RHZ25MRnh1SUNBbmFHVnBaMmgwSnl4Y2JpQWdKMjkyWlhKbWJHOTNXQ2NzWEc0Z0lDZHZkbVZ5Wm14dmQxa25MRnh1SUNBblltOXlaR1Z5Vkc5d1YybGtkR2duTEZ4dUlDQW5ZbTl5WkdWeVVtbG5hSFJYYVdSMGFDY3NYRzRnSUNkaWIzSmtaWEpDYjNSMGIyMVhhV1IwYUNjc1hHNGdJQ2RpYjNKa1pYSk1aV1owVjJsa2RHZ25MRnh1SUNBbmNHRmtaR2x1WjFSdmNDY3NYRzRnSUNkd1lXUmthVzVuVW1sbmFIUW5MRnh1SUNBbmNHRmtaR2x1WjBKdmRIUnZiU2NzWEc0Z0lDZHdZV1JrYVc1blRHVm1kQ2NzWEc0Z0lDZG1iMjUwVTNSNWJHVW5MRnh1SUNBblptOXVkRlpoY21saGJuUW5MRnh1SUNBblptOXVkRmRsYVdkb2RDY3NYRzRnSUNkbWIyNTBVM1J5WlhSamFDY3NYRzRnSUNkbWIyNTBVMmw2WlNjc1hHNGdJQ2RtYjI1MFUybDZaVUZrYW5WemRDY3NYRzRnSUNkc2FXNWxTR1ZwWjJoMEp5eGNiaUFnSjJadmJuUkdZVzFwYkhrbkxGeHVJQ0FuZEdWNGRFRnNhV2R1Snl4Y2JpQWdKM1JsZUhSVWNtRnVjMlp2Y20wbkxGeHVJQ0FuZEdWNGRFbHVaR1Z1ZENjc1hHNGdJQ2QwWlhoMFJHVmpiM0poZEdsdmJpY3NYRzRnSUNkc1pYUjBaWEpUY0dGamFXNW5KeXhjYmlBZ0ozZHZjbVJUY0dGamFXNW5KMXh1WFR0Y2JuWmhjaUIzYVc0Z1BTQm5iRzlpWVd3N1hHNTJZWElnWkc5aklEMGdaRzlqZFcxbGJuUTdYRzUyWVhJZ1ptWWdQU0IzYVc0dWJXOTZTVzV1WlhKVFkzSmxaVzVZSUNFOVBTQnVkV3hzSUNZbUlIZHBiaTV0YjNwSmJtNWxjbE5qY21WbGJsZ2dJVDA5SUhadmFXUWdNRHRjYmx4dVpuVnVZM1JwYjI0Z2RHRnBiRzl5YldGa1pTQW9aV3dzSUc5d2RHbHZibk1wSUh0Y2JpQWdkbUZ5SUhSbGVIUkpibkIxZENBOUlHVnNMblJoWjA1aGJXVWdQVDA5SUNkSlRsQlZWQ2NnZkh3Z1pXd3VkR0ZuVG1GdFpTQTlQVDBnSjFSRldGUkJVa1ZCSnp0Y2JpQWdkbUZ5SUhSb2NtOTBkR3hsWkZKbFpuSmxjMmdnUFNCMGFISnZkSFJzWlNoeVpXWnlaWE5vTENBek1DazdYRzRnSUhaaGNpQnZJRDBnYjNCMGFXOXVjeUI4ZkNCN2ZUdGNibHh1SUNCaWFXNWtLQ2s3WEc1Y2JpQWdjbVYwZFhKdUlIdGNiaUFnSUNCeVpXRmtPaUJ5WldGa1VHOXphWFJwYjI0c1hHNGdJQ0FnY21WbWNtVnphRG9nZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ3hjYmlBZ0lDQmtaWE4wY205NU9pQmtaWE4wY205NVhHNGdJSDA3WEc1Y2JpQWdablZ1WTNScGIyNGdibTl2Y0NBb0tTQjdmVnh1SUNCbWRXNWpkR2x2YmlCeVpXRmtVRzl6YVhScGIyNGdLQ2tnZXlCeVpYUjFjbTRnS0hSbGVIUkpibkIxZENBL0lHTnZiM0prYzFSbGVIUWdPaUJqYjI5eVpITklWRTFNS1NncE95QjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2NtVm1jbVZ6YUNBb0tTQjdYRzRnSUNBZ2FXWWdLRzh1YzJ4bFpYQnBibWNwSUh0Y2JpQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUNodkxuVndaR0YwWlNCOGZDQnViMjl3S1NoeVpXRmtVRzl6YVhScGIyNG9LU2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCamIyOXlaSE5VWlhoMElDZ3BJSHRjYmlBZ0lDQjJZWElnY0NBOUlITmxiR3dvWld3cE8xeHVJQ0FnSUhaaGNpQmpiMjUwWlhoMElEMGdjSEpsY0dGeVpTZ3BPMXh1SUNBZ0lIWmhjaUJ5WldGa2FXNW5jeUE5SUhKbFlXUlVaWGgwUTI5dmNtUnpLR052Ym5SbGVIUXNJSEF1YzNSaGNuUXBPMXh1SUNBZ0lHUnZZeTVpYjJSNUxuSmxiVzkyWlVOb2FXeGtLR052Ym5SbGVIUXViV2x5Y205eUtUdGNiaUFnSUNCeVpYUjFjbTRnY21WaFpHbHVaM003WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCamIyOXlaSE5JVkUxTUlDZ3BJSHRjYmlBZ0lDQjJZWElnYzJWc0lEMGdaMlYwVTJWc1pXTjBhVzl1S0NrN1hHNGdJQ0FnYVdZZ0tITmxiQzV5WVc1blpVTnZkVzUwS1NCN1hHNGdJQ0FnSUNCMllYSWdjbUZ1WjJVZ1BTQnpaV3d1WjJWMFVtRnVaMlZCZENnd0tUdGNiaUFnSUNBZ0lIWmhjaUJ1WldWa2MxUnZWMjl5YTBGeWIzVnVaRTVsZDJ4cGJtVkNkV2NnUFNCeVlXNW5aUzV6ZEdGeWRFTnZiblJoYVc1bGNpNXViMlJsVG1GdFpTQTlQVDBnSjFBbklDWW1JSEpoYm1kbExuTjBZWEowVDJabWMyVjBJRDA5UFNBd08xeHVJQ0FnSUNBZ2FXWWdLRzVsWldSelZHOVhiM0pyUVhKdmRXNWtUbVYzYkdsdVpVSjFaeWtnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnSUNBZ0lIZzZJSEpoYm1kbExuTjBZWEowUTI5dWRHRnBibVZ5TG05bVpuTmxkRXhsWm5Rc1hHNGdJQ0FnSUNBZ0lDQWdlVG9nY21GdVoyVXVjM1JoY25SRGIyNTBZV2x1WlhJdWIyWm1jMlYwVkc5d0xGeHVJQ0FnSUNBZ0lDQWdJR0ZpYzI5c2RYUmxPaUIwY25WbFhHNGdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnBaaUFvY21GdVoyVXVaMlYwUTJ4cFpXNTBVbVZqZEhNcElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUhKbFkzUnpJRDBnY21GdVoyVXVaMlYwUTJ4cFpXNTBVbVZqZEhNb0tUdGNiaUFnSUNBZ0lDQWdhV1lnS0hKbFkzUnpMbXhsYm1kMGFDQStJREFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZURvZ2NtVmpkSE5iTUYwdWJHVm1kQ3hjYmlBZ0lDQWdJQ0FnSUNBZ0lIazZJSEpsWTNSeld6QmRMblJ2Y0N4Y2JpQWdJQ0FnSUNBZ0lDQWdJR0ZpYzI5c2RYUmxPaUIwY25WbFhHNGdJQ0FnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z2V5QjRPaUF3TENCNU9pQXdJSDA3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCeVpXRmtWR1Y0ZEVOdmIzSmtjeUFvWTI5dWRHVjRkQ3dnY0NrZ2UxeHVJQ0FnSUhaaGNpQnlaWE4wSUQwZ1pHOWpMbU55WldGMFpVVnNaVzFsYm5Rb0ozTndZVzRuS1R0Y2JpQWdJQ0IyWVhJZ2JXbHljbTl5SUQwZ1kyOXVkR1Y0ZEM1dGFYSnliM0k3WEc0Z0lDQWdkbUZ5SUdOdmJYQjFkR1ZrSUQwZ1kyOXVkR1Y0ZEM1amIyMXdkWFJsWkR0Y2JseHVJQ0FnSUhkeWFYUmxLRzFwY25KdmNpd2djbVZoWkNobGJDa3VjM1ZpYzNSeWFXNW5LREFzSUhBcEtUdGNibHh1SUNBZ0lHbG1JQ2hsYkM1MFlXZE9ZVzFsSUQwOVBTQW5TVTVRVlZRbktTQjdYRzRnSUNBZ0lDQnRhWEp5YjNJdWRHVjRkRU52Ym5SbGJuUWdQU0J0YVhKeWIzSXVkR1Y0ZEVOdmJuUmxiblF1Y21Wd2JHRmpaU2d2WEZ4ekwyY3NJQ2RjWEhVd01HRXdKeWs3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdkM0pwZEdVb2NtVnpkQ3dnY21WaFpDaGxiQ2t1YzNWaWMzUnlhVzVuS0hBcElIeDhJQ2N1SnlrN1hHNWNiaUFnSUNCdGFYSnliM0l1WVhCd1pXNWtRMmhwYkdRb2NtVnpkQ2s3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdlRG9nY21WemRDNXZabVp6WlhSTVpXWjBJQ3NnY0dGeWMyVkpiblFvWTI5dGNIVjBaV1JiSjJKdmNtUmxja3hsWm5SWGFXUjBhQ2RkS1N4Y2JpQWdJQ0FnSUhrNklISmxjM1F1YjJabWMyVjBWRzl3SUNzZ2NHRnljMlZKYm5Rb1kyOXRjSFYwWldSYkoySnZjbVJsY2xSdmNGZHBaSFJvSjEwcFhHNGdJQ0FnZlR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlISmxZV1FnS0dWc0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUhSbGVIUkpibkIxZENBL0lHVnNMblpoYkhWbElEb2daV3d1YVc1dVpYSklWRTFNTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2NISmxjR0Z5WlNBb0tTQjdYRzRnSUNBZ2RtRnlJR052YlhCMWRHVmtJRDBnZDJsdUxtZGxkRU52YlhCMWRHVmtVM1I1YkdVZ1B5Qm5aWFJEYjIxd2RYUmxaRk4wZVd4bEtHVnNLU0E2SUdWc0xtTjFjbkpsYm5SVGRIbHNaVHRjYmlBZ0lDQjJZWElnYldseWNtOXlJRDBnWkc5akxtTnlaV0YwWlVWc1pXMWxiblFvSjJScGRpY3BPMXh1SUNBZ0lIWmhjaUJ6ZEhsc1pTQTlJRzFwY25KdmNpNXpkSGxzWlR0Y2JseHVJQ0FnSUdSdll5NWliMlI1TG1Gd2NHVnVaRU5vYVd4a0tHMXBjbkp2Y2lrN1hHNWNiaUFnSUNCcFppQW9aV3d1ZEdGblRtRnRaU0FoUFQwZ0owbE9VRlZVSnlrZ2UxeHVJQ0FnSUNBZ2MzUjViR1V1ZDI5eVpGZHlZWEFnUFNBblluSmxZV3N0ZDI5eVpDYzdYRzRnSUNBZ2ZWeHVJQ0FnSUhOMGVXeGxMbmRvYVhSbFUzQmhZMlVnUFNBbmNISmxMWGR5WVhBbk8xeHVJQ0FnSUhOMGVXeGxMbkJ2YzJsMGFXOXVJRDBnSjJGaWMyOXNkWFJsSnp0Y2JpQWdJQ0J6ZEhsc1pTNTJhWE5wWW1sc2FYUjVJRDBnSjJocFpHUmxiaWM3WEc0Z0lDQWdjSEp2Y0hNdVptOXlSV0ZqYUNoamIzQjVLVHRjYmx4dUlDQWdJR2xtSUNobVppa2dlMXh1SUNBZ0lDQWdjM1I1YkdVdWQybGtkR2dnUFNCd1lYSnpaVWx1ZENoamIyMXdkWFJsWkM1M2FXUjBhQ2tnTFNBeUlDc2dKM0I0Snp0Y2JpQWdJQ0FnSUdsbUlDaGxiQzV6WTNKdmJHeElaV2xuYUhRZ1BpQndZWEp6WlVsdWRDaGpiMjF3ZFhSbFpDNW9aV2xuYUhRcEtTQjdYRzRnSUNBZ0lDQWdJSE4wZVd4bExtOTJaWEptYkc5M1dTQTlJQ2R6WTNKdmJHd25PMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCemRIbHNaUzV2ZG1WeVpteHZkeUE5SUNkb2FXUmtaVzRuTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z2V5QnRhWEp5YjNJNklHMXBjbkp2Y2l3Z1kyOXRjSFYwWldRNklHTnZiWEIxZEdWa0lIMDdYRzVjYmlBZ0lDQm1kVzVqZEdsdmJpQmpiM0I1SUNod2NtOXdLU0I3WEc0Z0lDQWdJQ0J6ZEhsc1pWdHdjbTl3WFNBOUlHTnZiWEIxZEdWa1czQnliM0JkTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkeWFYUmxJQ2hsYkN3Z2RtRnNkV1VwSUh0Y2JpQWdJQ0JwWmlBb2RHVjRkRWx1Y0hWMEtTQjdYRzRnSUNBZ0lDQmxiQzUwWlhoMFEyOXVkR1Z1ZENBOUlIWmhiSFZsTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQmxiQzVwYm01bGNraFVUVXdnUFNCMllXeDFaVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJpYVc1a0lDaHlaVzF2ZG1VcElIdGNiaUFnSUNCMllYSWdiM0FnUFNCeVpXMXZkbVVnUHlBbmNtVnRiM1psSnlBNklDZGhaR1FuTzF4dUlDQWdJR055YjNOemRtVnVkRnR2Y0Ywb1pXd3NJQ2RyWlhsa2IzZHVKeXdnZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNobGJDd2dKMnRsZVhWd0p5d2dkR2h5YjNSMGJHVmtVbVZtY21WemFDazdYRzRnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hsYkN3Z0oybHVjSFYwSnl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwVzI5d1hTaGxiQ3dnSjNCaGMzUmxKeXdnZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNobGJDd2dKMk5vWVc1blpTY3NJSFJvY205MGRHeGxaRkpsWm5KbGMyZ3BPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWkdWemRISnZlU0FvS1NCN1hHNGdJQ0FnWW1sdVpDaDBjblZsS1R0Y2JpQWdmVnh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIUmhhV3h2Y20xaFpHVTdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gdGhyb3R0bGUgKGZuLCBib3VuZGFyeSkge1xuICB2YXIgbGFzdCA9IC1JbmZpbml0eTtcbiAgdmFyIHRpbWVyO1xuICByZXR1cm4gZnVuY3Rpb24gYm91bmNlZCAoKSB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHVuYm91bmQoKTtcblxuICAgIGZ1bmN0aW9uIHVuYm91bmQgKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIHZhciBuZXh0ID0gbGFzdCArIGJvdW5kYXJ5O1xuICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICBpZiAobm93ID4gbmV4dCkge1xuICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICBmbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KHVuYm91bmQsIG5leHQgLSBub3cpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHhociA9IHJlcXVpcmUoJ3hocicpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGVtaXR0ZXIgPSByZXF1aXJlKCdjb250cmEvZW1pdHRlcicpO1xudmFyIHZhbGlkYXRvcnMgPSB7XG4gIGltYWdlOiBpc0l0QW5JbWFnZUZpbGVcbn07XG52YXIgcmltYWdlbWltZSA9IC9eaW1hZ2VcXC8oZ2lmfHBuZ3xwP2pwZT9nKSQvaTtcblxuZnVuY3Rpb24gc2V0dXAgKGZpbGVpbnB1dCwgb3B0aW9ucykge1xuICB2YXIgYnVyZWF1Y3JhdCA9IGNyZWF0ZShvcHRpb25zKTtcbiAgY3Jvc3N2ZW50LmFkZChmaWxlaW5wdXQsICdjaGFuZ2UnLCBoYW5kbGVyLCBmYWxzZSk7XG5cbiAgcmV0dXJuIGJ1cmVhdWNyYXQ7XG5cbiAgZnVuY3Rpb24gaGFuZGxlciAoZSkge1xuICAgIHN0b3AoZSk7XG4gICAgaWYgKGZpbGVpbnB1dC5maWxlcy5sZW5ndGgpIHtcbiAgICAgIGJ1cmVhdWNyYXQuc3VibWl0KGZpbGVpbnB1dC5maWxlcyk7XG4gICAgfVxuICAgIGZpbGVpbnB1dC52YWx1ZSA9ICcnO1xuICAgIGZpbGVpbnB1dC52YWx1ZSA9IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlIChvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgby5mb3JtRGF0YSA9IG8uZm9ybURhdGEgfHwge307XG4gIHZhciBidXJlYXVjcmF0ID0gZW1pdHRlcih7XG4gICAgc3VibWl0OiBzdWJtaXRcbiAgfSk7XG4gIHJldHVybiBidXJlYXVjcmF0O1xuXG4gIGZ1bmN0aW9uIHN1Ym1pdCAocmF3RmlsZXMpIHtcbiAgICBidXJlYXVjcmF0LmVtaXQoJ3N0YXJ0ZWQnLCByYXdGaWxlcyk7XG4gICAgdmFyIGFsbEZpbGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocmF3RmlsZXMpO1xuICAgIHZhciB2YWxpZEZpbGVzID0gZmlsdGVyKGFsbEZpbGVzKTtcbiAgICBpZiAoIXZhbGlkRmlsZXMpIHtcbiAgICAgIGJ1cmVhdWNyYXQuZW1pdCgnaW52YWxpZCcsIGFsbEZpbGVzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYnVyZWF1Y3JhdC5lbWl0KCd2YWxpZCcsIHZhbGlkRmlsZXMpO1xuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgT2JqZWN0LmtleXMoby5mb3JtRGF0YSkuZm9yRWFjaChmdW5jdGlvbiBjb3B5Rm9ybURhdGEoa2V5KSB7XG4gICAgICBmb3JtLmFwcGVuZChrZXksIG8uZm9ybURhdGFba2V5XSk7XG4gICAgfSk7XG4gICAgdmFyIHJlcSA9IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiBvLm1ldGhvZCB8fCAnUFVUJyxcbiAgICAgIHVybDogby5lbmRwb2ludCB8fCAnL2FwaS9maWxlcycsXG4gICAgICBib2R5OiBmb3JtXG4gICAgfTtcblxuICAgIHZhbGlkRmlsZXMuZm9yRWFjaChhcHBlbmRGaWxlKTtcbiAgICB4aHIocmVxLCBoYW5kbGVSZXNwb25zZSk7XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRGaWxlIChmaWxlKSB7XG4gICAgICBmb3JtLmFwcGVuZCgndXBsb2FkcycsIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2UgKGVyciwgcmVzLCBib2R5KSB7XG4gICAgICByZXMuYm9keSA9IGJvZHkgPSBnZXREYXRhKGJvZHkpO1xuICAgICAgdmFyIHJlc3VsdHMgPSBib2R5ICYmIGJvZHkucmVzdWx0cyAmJiBBcnJheS5pc0FycmF5KGJvZHkucmVzdWx0cykgPyBib2R5LnJlc3VsdHMgOiBbXTtcbiAgICAgIHZhciBmYWlsZWQgPSBlcnIgfHwgcmVzLnN0YXR1c0NvZGUgPCAyMDAgfHwgcmVzLnN0YXR1c0NvZGUgPiAyOTkgfHwgYm9keSBpbnN0YW5jZW9mIEVycm9yO1xuICAgICAgaWYgKGZhaWxlZCkge1xuICAgICAgICBidXJlYXVjcmF0LmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1cmVhdWNyYXQuZW1pdCgnc3VjY2VzcycsIHJlc3VsdHMsIGJvZHkpO1xuICAgICAgfVxuICAgICAgYnVyZWF1Y3JhdC5lbWl0KCdlbmRlZCcsIGVyciwgcmVzdWx0cywgYm9keSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyIChmaWxlcykge1xuICAgIHJldHVybiBvLnZhbGlkYXRlID8gZmlsZXMuZmlsdGVyKHdoZXJlVmFsaWQpIDogZmlsZXM7XG4gICAgZnVuY3Rpb24gd2hlcmVWYWxpZCAoZmlsZSkge1xuICAgICAgdmFyIHZhbGlkYXRvciA9IHZhbGlkYXRvcnNbby52YWxpZGF0ZV0gfHwgby52YWxpZGF0ZTtcbiAgICAgIHJldHVybiB2YWxpZGF0b3IoZmlsZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHN0b3AgKGUpIHtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBpc0l0QW5JbWFnZUZpbGUgKGZpbGUpIHtcbiAgcmV0dXJuIHJpbWFnZW1pbWUudGVzdChmaWxlLnR5cGUpO1xufVxuXG5mdW5jdGlvbiBnZXREYXRhIChib2R5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoYm9keSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBlcnI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogY3JlYXRlLFxuICBzZXR1cDogc2V0dXBcbn07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBjdXN0b21FdmVudCA9IHJlcXVpcmUoJ2N1c3RvbS1ldmVudCcpO1xudmFyIGV2ZW50bWFwID0gcmVxdWlyZSgnLi9ldmVudG1hcCcpO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBhZGRFdmVudCA9IGFkZEV2ZW50RWFzeTtcbnZhciByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50RWFzeTtcbnZhciBoYXJkQ2FjaGUgPSBbXTtcblxuaWYgKCFnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICBhZGRFdmVudCA9IGFkZEV2ZW50SGFyZDtcbiAgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEhhcmQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZEV2ZW50LFxuICByZW1vdmU6IHJlbW92ZUV2ZW50LFxuICBmYWJyaWNhdGU6IGZhYnJpY2F0ZUV2ZW50XG59O1xuXG5mdW5jdGlvbiBhZGRFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHdyYXAoZWwsIHR5cGUsIGZuKSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50RWFzeSAoZWwsIHR5cGUsIGZuLCBjYXB0dXJpbmcpIHtcbiAgcmV0dXJuIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGNhcHR1cmluZyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50SGFyZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBsaXN0ZW5lciA9IHVud3JhcChlbCwgdHlwZSwgZm4pO1xuICBpZiAobGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmYWJyaWNhdGVFdmVudCAoZWwsIHR5cGUsIG1vZGVsKSB7XG4gIHZhciBlID0gZXZlbnRtYXAuaW5kZXhPZih0eXBlKSA9PT0gLTEgPyBtYWtlQ3VzdG9tRXZlbnQoKSA6IG1ha2VDbGFzc2ljRXZlbnQoKTtcbiAgaWYgKGVsLmRpc3BhdGNoRXZlbnQpIHtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9IGVsc2Uge1xuICAgIGVsLmZpcmVFdmVudCgnb24nICsgdHlwZSwgZSk7XG4gIH1cbiAgZnVuY3Rpb24gbWFrZUNsYXNzaWNFdmVudCAoKSB7XG4gICAgdmFyIGU7XG4gICAgaWYgKGRvYy5jcmVhdGVFdmVudCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgIGUuaW5pdEV2ZW50KHR5cGUsIHRydWUsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAoZG9jLmNyZWF0ZUV2ZW50T2JqZWN0KSB7XG4gICAgICBlID0gZG9jLmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgfVxuICAgIHJldHVybiBlO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDdXN0b21FdmVudCAoKSB7XG4gICAgcmV0dXJuIG5ldyBjdXN0b21FdmVudCh0eXBlLCB7IGRldGFpbDogbW9kZWwgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd3JhcHBlckZhY3RvcnkgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlciAob3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gb3JpZ2luYWxFdmVudCB8fCBnbG9iYWwuZXZlbnQ7XG4gICAgZS50YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCA9IGUucHJldmVudERlZmF1bHQgfHwgZnVuY3Rpb24gcHJldmVudERlZmF1bHQgKCkgeyBlLnJldHVyblZhbHVlID0gZmFsc2U7IH07XG4gICAgZS5zdG9wUHJvcGFnYXRpb24gPSBlLnN0b3BQcm9wYWdhdGlvbiB8fCBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24gKCkgeyBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7IH07XG4gICAgZS53aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGZuLmNhbGwoZWwsIGUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIHdyYXBwZXIgPSB1bndyYXAoZWwsIHR5cGUsIGZuKSB8fCB3cmFwcGVyRmFjdG9yeShlbCwgdHlwZSwgZm4pO1xuICBoYXJkQ2FjaGUucHVzaCh7XG4gICAgd3JhcHBlcjogd3JhcHBlcixcbiAgICBlbGVtZW50OiBlbCxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGZuOiBmblxuICB9KTtcbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIHVud3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpID0gZmluZChlbCwgdHlwZSwgZm4pO1xuICBpZiAoaSkge1xuICAgIHZhciB3cmFwcGVyID0gaGFyZENhY2hlW2ldLndyYXBwZXI7XG4gICAgaGFyZENhY2hlLnNwbGljZShpLCAxKTsgLy8gZnJlZSB1cCBhIHRhZCBvZiBtZW1vcnlcbiAgICByZXR1cm4gd3JhcHBlcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGksIGl0ZW07XG4gIGZvciAoaSA9IDA7IGkgPCBoYXJkQ2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBpdGVtID0gaGFyZENhY2hlW2ldO1xuICAgIGlmIChpdGVtLmVsZW1lbnQgPT09IGVsICYmIGl0ZW0udHlwZSA9PT0gdHlwZSAmJiBpdGVtLmZuID09PSBmbikge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG59XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWlkWEpsWVhWamNtRmplUzl1YjJSbFgyMXZaSFZzWlhNdlkzSnZjM04yWlc1MEwzTnlZeTlqY205emMzWmxiblF1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdZM1Z6ZEc5dFJYWmxiblFnUFNCeVpYRjFhWEpsS0NkamRYTjBiMjB0WlhabGJuUW5LVHRjYm5aaGNpQmxkbVZ1ZEcxaGNDQTlJSEpsY1hWcGNtVW9KeTR2WlhabGJuUnRZWEFuS1R0Y2JuWmhjaUJrYjJNZ1BTQm5iRzlpWVd3dVpHOWpkVzFsYm5RN1hHNTJZWElnWVdSa1JYWmxiblFnUFNCaFpHUkZkbVZ1ZEVWaGMzazdYRzUyWVhJZ2NtVnRiM1psUlhabGJuUWdQU0J5WlcxdmRtVkZkbVZ1ZEVWaGMzazdYRzUyWVhJZ2FHRnlaRU5oWTJobElEMGdXMTA3WEc1Y2JtbG1JQ2doWjJ4dlltRnNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSXBJSHRjYmlBZ1lXUmtSWFpsYm5RZ1BTQmhaR1JGZG1WdWRFaGhjbVE3WEc0Z0lISmxiVzkyWlVWMlpXNTBJRDBnY21WdGIzWmxSWFpsYm5SSVlYSmtPMXh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIdGNiaUFnWVdSa09pQmhaR1JGZG1WdWRDeGNiaUFnY21WdGIzWmxPaUJ5WlcxdmRtVkZkbVZ1ZEN4Y2JpQWdabUZpY21sallYUmxPaUJtWVdKeWFXTmhkR1ZGZG1WdWRGeHVmVHRjYmx4dVpuVnVZM1JwYjI0Z1lXUmtSWFpsYm5SRllYTjVJQ2hsYkN3Z2RIbHdaU3dnWm00c0lHTmhjSFIxY21sdVp5a2dlMXh1SUNCeVpYUjFjbTRnWld3dVlXUmtSWFpsYm5STWFYTjBaVzVsY2loMGVYQmxMQ0JtYml3Z1kyRndkSFZ5YVc1bktUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1lXUmtSWFpsYm5SSVlYSmtJQ2hsYkN3Z2RIbHdaU3dnWm00cElIdGNiaUFnY21WMGRYSnVJR1ZzTG1GMGRHRmphRVYyWlc1MEtDZHZiaWNnS3lCMGVYQmxMQ0IzY21Gd0tHVnNMQ0IwZVhCbExDQm1iaWtwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WlcxdmRtVkZkbVZ1ZEVWaGMza2dLR1ZzTENCMGVYQmxMQ0JtYml3Z1kyRndkSFZ5YVc1bktTQjdYRzRnSUhKbGRIVnliaUJsYkM1eVpXMXZkbVZGZG1WdWRFeHBjM1JsYm1WeUtIUjVjR1VzSUdadUxDQmpZWEIwZFhKcGJtY3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaVzF2ZG1WRmRtVnVkRWhoY21RZ0tHVnNMQ0IwZVhCbExDQm1iaWtnZTF4dUlDQjJZWElnYkdsemRHVnVaWElnUFNCMWJuZHlZWEFvWld3c0lIUjVjR1VzSUdadUtUdGNiaUFnYVdZZ0tHeHBjM1JsYm1WeUtTQjdYRzRnSUNBZ2NtVjBkWEp1SUdWc0xtUmxkR0ZqYUVWMlpXNTBLQ2R2YmljZ0t5QjBlWEJsTENCc2FYTjBaVzVsY2lrN1hHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdabUZpY21sallYUmxSWFpsYm5RZ0tHVnNMQ0IwZVhCbExDQnRiMlJsYkNrZ2UxeHVJQ0IyWVhJZ1pTQTlJR1YyWlc1MGJXRndMbWx1WkdWNFQyWW9kSGx3WlNrZ1BUMDlJQzB4SUQ4Z2JXRnJaVU4xYzNSdmJVVjJaVzUwS0NrZ09pQnRZV3RsUTJ4aGMzTnBZMFYyWlc1MEtDazdYRzRnSUdsbUlDaGxiQzVrYVhOd1lYUmphRVYyWlc1MEtTQjdYRzRnSUNBZ1pXd3VaR2x6Y0dGMFkyaEZkbVZ1ZENobEtUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQmxiQzVtYVhKbFJYWmxiblFvSjI5dUp5QXJJSFI1Y0dVc0lHVXBPMXh1SUNCOVhHNGdJR1oxYm1OMGFXOXVJRzFoYTJWRGJHRnpjMmxqUlhabGJuUWdLQ2tnZTF4dUlDQWdJSFpoY2lCbE8xeHVJQ0FnSUdsbUlDaGtiMk11WTNKbFlYUmxSWFpsYm5RcElIdGNiaUFnSUNBZ0lHVWdQU0JrYjJNdVkzSmxZWFJsUlhabGJuUW9KMFYyWlc1MEp5azdYRzRnSUNBZ0lDQmxMbWx1YVhSRmRtVnVkQ2gwZVhCbExDQjBjblZsTENCMGNuVmxLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLR1J2WXk1amNtVmhkR1ZGZG1WdWRFOWlhbVZqZENrZ2UxeHVJQ0FnSUNBZ1pTQTlJR1J2WXk1amNtVmhkR1ZGZG1WdWRFOWlhbVZqZENncE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdaVHRjYmlBZ2ZWeHVJQ0JtZFc1amRHbHZiaUJ0WVd0bFEzVnpkRzl0UlhabGJuUWdLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQnVaWGNnWTNWemRHOXRSWFpsYm5Rb2RIbHdaU3dnZXlCa1pYUmhhV3c2SUcxdlpHVnNJSDBwTzF4dUlDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlIZHlZWEJ3WlhKR1lXTjBiM0o1SUNobGJDd2dkSGx3WlN3Z1ptNHBJSHRjYmlBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUhkeVlYQndaWElnS0c5eWFXZHBibUZzUlhabGJuUXBJSHRjYmlBZ0lDQjJZWElnWlNBOUlHOXlhV2RwYm1Gc1JYWmxiblFnZkh3Z1oyeHZZbUZzTG1WMlpXNTBPMXh1SUNBZ0lHVXVkR0Z5WjJWMElEMGdaUzUwWVhKblpYUWdmSHdnWlM1emNtTkZiR1Z0Wlc1ME8xeHVJQ0FnSUdVdWNISmxkbVZ1ZEVSbFptRjFiSFFnUFNCbExuQnlaWFpsYm5SRVpXWmhkV3gwSUh4OElHWjFibU4wYVc5dUlIQnlaWFpsYm5SRVpXWmhkV3gwSUNncElIc2daUzV5WlhSMWNtNVdZV3gxWlNBOUlHWmhiSE5sT3lCOU8xeHVJQ0FnSUdVdWMzUnZjRkJ5YjNCaFoyRjBhVzl1SUQwZ1pTNXpkRzl3VUhKdmNHRm5ZWFJwYjI0Z2ZId2dablZ1WTNScGIyNGdjM1J2Y0ZCeWIzQmhaMkYwYVc5dUlDZ3BJSHNnWlM1allXNWpaV3hDZFdKaWJHVWdQU0IwY25WbE95QjlPMXh1SUNBZ0lHVXVkMmhwWTJnZ1BTQmxMbmRvYVdOb0lIeDhJR1V1YTJWNVEyOWtaVHRjYmlBZ0lDQm1iaTVqWVd4c0tHVnNMQ0JsS1R0Y2JpQWdmVHRjYm4xY2JseHVablZ1WTNScGIyNGdkM0poY0NBb1pXd3NJSFI1Y0dVc0lHWnVLU0I3WEc0Z0lIWmhjaUIzY21Gd2NHVnlJRDBnZFc1M2NtRndLR1ZzTENCMGVYQmxMQ0JtYmlrZ2ZId2dkM0poY0hCbGNrWmhZM1J2Y25rb1pXd3NJSFI1Y0dVc0lHWnVLVHRjYmlBZ2FHRnlaRU5oWTJobExuQjFjMmdvZTF4dUlDQWdJSGR5WVhCd1pYSTZJSGR5WVhCd1pYSXNYRzRnSUNBZ1pXeGxiV1Z1ZERvZ1pXd3NYRzRnSUNBZ2RIbHdaVG9nZEhsd1pTeGNiaUFnSUNCbWJqb2dabTVjYmlBZ2ZTazdYRzRnSUhKbGRIVnliaUIzY21Gd2NHVnlPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjFibmR5WVhBZ0tHVnNMQ0IwZVhCbExDQm1iaWtnZTF4dUlDQjJZWElnYVNBOUlHWnBibVFvWld3c0lIUjVjR1VzSUdadUtUdGNiaUFnYVdZZ0tHa3BJSHRjYmlBZ0lDQjJZWElnZDNKaGNIQmxjaUE5SUdoaGNtUkRZV05vWlZ0cFhTNTNjbUZ3Y0dWeU8xeHVJQ0FnSUdoaGNtUkRZV05vWlM1emNHeHBZMlVvYVN3Z01TazdJQzh2SUdaeVpXVWdkWEFnWVNCMFlXUWdiMllnYldWdGIzSjVYRzRnSUNBZ2NtVjBkWEp1SUhkeVlYQndaWEk3WEc0Z0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z1ptbHVaQ0FvWld3c0lIUjVjR1VzSUdadUtTQjdYRzRnSUhaaGNpQnBMQ0JwZEdWdE8xeHVJQ0JtYjNJZ0tHa2dQU0F3T3lCcElEd2dhR0Z5WkVOaFkyaGxMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnYVhSbGJTQTlJR2hoY21SRFlXTm9aVnRwWFR0Y2JpQWdJQ0JwWmlBb2FYUmxiUzVsYkdWdFpXNTBJRDA5UFNCbGJDQW1KaUJwZEdWdExuUjVjR1VnUFQwOUlIUjVjR1VnSmlZZ2FYUmxiUzVtYmlBOVBUMGdabTRwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVmVnh1SWwxOSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGV2ZW50bWFwID0gW107XG52YXIgZXZlbnRuYW1lID0gJyc7XG52YXIgcm9uID0gL15vbi87XG5cbmZvciAoZXZlbnRuYW1lIGluIGdsb2JhbCkge1xuICBpZiAocm9uLnRlc3QoZXZlbnRuYW1lKSkge1xuICAgIGV2ZW50bWFwLnB1c2goZXZlbnRuYW1lLnNsaWNlKDIpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50bWFwO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpZFhKbFlYVmpjbUZqZVM5dWIyUmxYMjF2WkhWc1pYTXZZM0p2YzNOMlpXNTBMM055WXk5bGRtVnVkRzFoY0M1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnWlhabGJuUnRZWEFnUFNCYlhUdGNiblpoY2lCbGRtVnVkRzVoYldVZ1BTQW5KenRjYm5aaGNpQnliMjRnUFNBdlhtOXVMenRjYmx4dVptOXlJQ2hsZG1WdWRHNWhiV1VnYVc0Z1oyeHZZbUZzS1NCN1hHNGdJR2xtSUNoeWIyNHVkR1Z6ZENobGRtVnVkRzVoYldVcEtTQjdYRzRnSUNBZ1pYWmxiblJ0WVhBdWNIVnphQ2hsZG1WdWRHNWhiV1V1YzJ4cFkyVW9NaWtwTzF4dUlDQjlYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1pYWmxiblJ0WVhBN1hHNGlYWDA9IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGlja3kgPSByZXF1aXJlKCd0aWNreScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlYm91bmNlIChmbiwgYXJncywgY3R4KSB7XG4gIGlmICghZm4pIHsgcmV0dXJuOyB9XG4gIHRpY2t5KGZ1bmN0aW9uIHJ1biAoKSB7XG4gICAgZm4uYXBwbHkoY3R4IHx8IG51bGwsIGFyZ3MgfHwgW10pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhdG9hID0gcmVxdWlyZSgnYXRvYScpO1xudmFyIGRlYm91bmNlID0gcmVxdWlyZSgnLi9kZWJvdW5jZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVtaXR0ZXIgKHRoaW5nLCBvcHRpb25zKSB7XG4gIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGV2dCA9IHt9O1xuICBpZiAodGhpbmcgPT09IHVuZGVmaW5lZCkgeyB0aGluZyA9IHt9OyB9XG4gIHRoaW5nLm9uID0gZnVuY3Rpb24gKHR5cGUsIGZuKSB7XG4gICAgaWYgKCFldnRbdHlwZV0pIHtcbiAgICAgIGV2dFt0eXBlXSA9IFtmbl07XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2dFt0eXBlXS5wdXNoKGZuKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9O1xuICB0aGluZy5vbmNlID0gZnVuY3Rpb24gKHR5cGUsIGZuKSB7XG4gICAgZm4uX29uY2UgPSB0cnVlOyAvLyB0aGluZy5vZmYoZm4pIHN0aWxsIHdvcmtzIVxuICAgIHRoaW5nLm9uKHR5cGUsIGZuKTtcbiAgICByZXR1cm4gdGhpbmc7XG4gIH07XG4gIHRoaW5nLm9mZiA9IGZ1bmN0aW9uICh0eXBlLCBmbikge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAoYyA9PT0gMSkge1xuICAgICAgZGVsZXRlIGV2dFt0eXBlXTtcbiAgICB9IGVsc2UgaWYgKGMgPT09IDApIHtcbiAgICAgIGV2dCA9IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZXQgPSBldnRbdHlwZV07XG4gICAgICBpZiAoIWV0KSB7IHJldHVybiB0aGluZzsgfVxuICAgICAgZXQuc3BsaWNlKGV0LmluZGV4T2YoZm4pLCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9O1xuICB0aGluZy5lbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gYXRvYShhcmd1bWVudHMpO1xuICAgIHJldHVybiB0aGluZy5lbWl0dGVyU25hcHNob3QoYXJncy5zaGlmdCgpKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfTtcbiAgdGhpbmcuZW1pdHRlclNuYXBzaG90ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgZXQgPSAoZXZ0W3R5cGVdIHx8IFtdKS5zbGljZSgwKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhdG9hKGFyZ3VtZW50cyk7XG4gICAgICB2YXIgY3R4ID0gdGhpcyB8fCB0aGluZztcbiAgICAgIGlmICh0eXBlID09PSAnZXJyb3InICYmIG9wdHMudGhyb3dzICE9PSBmYWxzZSAmJiAhZXQubGVuZ3RoKSB7IHRocm93IGFyZ3MubGVuZ3RoID09PSAxID8gYXJnc1swXSA6IGFyZ3M7IH1cbiAgICAgIGV0LmZvckVhY2goZnVuY3Rpb24gZW1pdHRlciAobGlzdGVuKSB7XG4gICAgICAgIGlmIChvcHRzLmFzeW5jKSB7IGRlYm91bmNlKGxpc3RlbiwgYXJncywgY3R4KTsgfSBlbHNlIHsgbGlzdGVuLmFwcGx5KGN0eCwgYXJncyk7IH1cbiAgICAgICAgaWYgKGxpc3Rlbi5fb25jZSkgeyB0aGluZy5vZmYodHlwZSwgbGlzdGVuKTsgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpbmc7XG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIHRoaW5nO1xufTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGN1c3RvbUV2ZW50ID0gcmVxdWlyZSgnY3VzdG9tLWV2ZW50Jyk7XG52YXIgZXZlbnRtYXAgPSByZXF1aXJlKCcuL2V2ZW50bWFwJyk7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgYWRkRXZlbnQgPSBhZGRFdmVudEVhc3k7XG52YXIgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEVhc3k7XG52YXIgaGFyZENhY2hlID0gW107XG5cbmlmICghZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgYWRkRXZlbnQgPSBhZGRFdmVudEhhcmQ7XG4gIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRIYXJkO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHdyYXAoZWwsIHR5cGUsIGZuKSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50RWFzeSAoZWwsIHR5cGUsIGZuLCBjYXB0dXJpbmcpIHtcbiAgcmV0dXJuIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGNhcHR1cmluZyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50SGFyZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBlbC5kZXRhY2hFdmVudCgnb24nICsgdHlwZSwgdW53cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiBmYWJyaWNhdGVFdmVudCAoZWwsIHR5cGUsIG1vZGVsKSB7XG4gIHZhciBlID0gZXZlbnRtYXAuaW5kZXhPZih0eXBlKSA9PT0gLTEgPyBtYWtlQ3VzdG9tRXZlbnQoKSA6IG1ha2VDbGFzc2ljRXZlbnQoKTtcbiAgaWYgKGVsLmRpc3BhdGNoRXZlbnQpIHtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9IGVsc2Uge1xuICAgIGVsLmZpcmVFdmVudCgnb24nICsgdHlwZSwgZSk7XG4gIH1cbiAgZnVuY3Rpb24gbWFrZUNsYXNzaWNFdmVudCAoKSB7XG4gICAgdmFyIGU7XG4gICAgaWYgKGRvYy5jcmVhdGVFdmVudCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgIGUuaW5pdEV2ZW50KHR5cGUsIHRydWUsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAoZG9jLmNyZWF0ZUV2ZW50T2JqZWN0KSB7XG4gICAgICBlID0gZG9jLmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgfVxuICAgIHJldHVybiBlO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDdXN0b21FdmVudCAoKSB7XG4gICAgcmV0dXJuIG5ldyBjdXN0b21FdmVudCh0eXBlLCB7IGRldGFpbDogbW9kZWwgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd3JhcHBlckZhY3RvcnkgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlciAob3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gb3JpZ2luYWxFdmVudCB8fCBnbG9iYWwuZXZlbnQ7XG4gICAgZS50YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCA9IGUucHJldmVudERlZmF1bHQgfHwgZnVuY3Rpb24gcHJldmVudERlZmF1bHQgKCkgeyBlLnJldHVyblZhbHVlID0gZmFsc2U7IH07XG4gICAgZS5zdG9wUHJvcGFnYXRpb24gPSBlLnN0b3BQcm9wYWdhdGlvbiB8fCBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24gKCkgeyBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7IH07XG4gICAgZS53aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGZuLmNhbGwoZWwsIGUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIHdyYXBwZXIgPSB1bndyYXAoZWwsIHR5cGUsIGZuKSB8fCB3cmFwcGVyRmFjdG9yeShlbCwgdHlwZSwgZm4pO1xuICBoYXJkQ2FjaGUucHVzaCh7XG4gICAgd3JhcHBlcjogd3JhcHBlcixcbiAgICBlbGVtZW50OiBlbCxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGZuOiBmblxuICB9KTtcbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIHVud3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpID0gZmluZChlbCwgdHlwZSwgZm4pO1xuICBpZiAoaSkge1xuICAgIHZhciB3cmFwcGVyID0gaGFyZENhY2hlW2ldLndyYXBwZXI7XG4gICAgaGFyZENhY2hlLnNwbGljZShpLCAxKTsgLy8gZnJlZSB1cCBhIHRhZCBvZiBtZW1vcnlcbiAgICByZXR1cm4gd3JhcHBlcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGksIGl0ZW07XG4gIGZvciAoaSA9IDA7IGkgPCBoYXJkQ2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBpdGVtID0gaGFyZENhY2hlW2ldO1xuICAgIGlmIChpdGVtLmVsZW1lbnQgPT09IGVsICYmIGl0ZW0udHlwZSA9PT0gdHlwZSAmJiBpdGVtLmZuID09PSBmbikge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZEV2ZW50LFxuICByZW1vdmU6IHJlbW92ZUV2ZW50LFxuICBmYWJyaWNhdGU6IGZhYnJpY2F0ZUV2ZW50XG59O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlqY205emMzWmxiblF2YzNKakwyTnliM056ZG1WdWRDNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQmpkWE4wYjIxRmRtVnVkQ0E5SUhKbGNYVnBjbVVvSjJOMWMzUnZiUzFsZG1WdWRDY3BPMXh1ZG1GeUlHVjJaVzUwYldGd0lEMGdjbVZ4ZFdseVpTZ25MaTlsZG1WdWRHMWhjQ2NwTzF4dWRtRnlJR1J2WXlBOUlHUnZZM1Z0Wlc1ME8xeHVkbUZ5SUdGa1pFVjJaVzUwSUQwZ1lXUmtSWFpsYm5SRllYTjVPMXh1ZG1GeUlISmxiVzkyWlVWMlpXNTBJRDBnY21WdGIzWmxSWFpsYm5SRllYTjVPMXh1ZG1GeUlHaGhjbVJEWVdOb1pTQTlJRnRkTzF4dVhHNXBaaUFvSVdkc2IySmhiQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLU0I3WEc0Z0lHRmtaRVYyWlc1MElEMGdZV1JrUlhabGJuUklZWEprTzF4dUlDQnlaVzF2ZG1WRmRtVnVkQ0E5SUhKbGJXOTJaVVYyWlc1MFNHRnlaRHRjYm4xY2JseHVablZ1WTNScGIyNGdZV1JrUlhabGJuUkZZWE41SUNobGJDd2dkSGx3WlN3Z1ptNHNJR05oY0hSMWNtbHVaeWtnZTF4dUlDQnlaWFIxY200Z1pXd3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpaDBlWEJsTENCbWJpd2dZMkZ3ZEhWeWFXNW5LVHRjYm4xY2JseHVablZ1WTNScGIyNGdZV1JrUlhabGJuUklZWEprSUNobGJDd2dkSGx3WlN3Z1ptNHBJSHRjYmlBZ2NtVjBkWEp1SUdWc0xtRjBkR0ZqYUVWMlpXNTBLQ2R2YmljZ0t5QjBlWEJsTENCM2NtRndLR1ZzTENCMGVYQmxMQ0JtYmlrcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVpXMXZkbVZGZG1WdWRFVmhjM2tnS0dWc0xDQjBlWEJsTENCbWJpd2dZMkZ3ZEhWeWFXNW5LU0I3WEc0Z0lISmxkSFZ5YmlCbGJDNXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLSFI1Y0dVc0lHWnVMQ0JqWVhCMGRYSnBibWNwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WlcxdmRtVkZkbVZ1ZEVoaGNtUWdLR1ZzTENCMGVYQmxMQ0JtYmlrZ2UxeHVJQ0J5WlhSMWNtNGdaV3d1WkdWMFlXTm9SWFpsYm5Rb0oyOXVKeUFySUhSNWNHVXNJSFZ1ZDNKaGNDaGxiQ3dnZEhsd1pTd2dabTRwS1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWm1GaWNtbGpZWFJsUlhabGJuUWdLR1ZzTENCMGVYQmxMQ0J0YjJSbGJDa2dlMXh1SUNCMllYSWdaU0E5SUdWMlpXNTBiV0Z3TG1sdVpHVjRUMllvZEhsd1pTa2dQVDA5SUMweElEOGdiV0ZyWlVOMWMzUnZiVVYyWlc1MEtDa2dPaUJ0WVd0bFEyeGhjM05wWTBWMlpXNTBLQ2s3WEc0Z0lHbG1JQ2hsYkM1a2FYTndZWFJqYUVWMlpXNTBLU0I3WEc0Z0lDQWdaV3d1WkdsemNHRjBZMmhGZG1WdWRDaGxLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JsYkM1bWFYSmxSWFpsYm5Rb0oyOXVKeUFySUhSNWNHVXNJR1VwTzF4dUlDQjlYRzRnSUdaMWJtTjBhVzl1SUcxaGEyVkRiR0Z6YzJsalJYWmxiblFnS0NrZ2UxeHVJQ0FnSUhaaGNpQmxPMXh1SUNBZ0lHbG1JQ2hrYjJNdVkzSmxZWFJsUlhabGJuUXBJSHRjYmlBZ0lDQWdJR1VnUFNCa2IyTXVZM0psWVhSbFJYWmxiblFvSjBWMlpXNTBKeWs3WEc0Z0lDQWdJQ0JsTG1sdWFYUkZkbVZ1ZENoMGVYQmxMQ0IwY25WbExDQjBjblZsS1R0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0dSdll5NWpjbVZoZEdWRmRtVnVkRTlpYW1WamRDa2dlMXh1SUNBZ0lDQWdaU0E5SUdSdll5NWpjbVZoZEdWRmRtVnVkRTlpYW1WamRDZ3BPMXh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnWlR0Y2JpQWdmVnh1SUNCbWRXNWpkR2x2YmlCdFlXdGxRM1Z6ZEc5dFJYWmxiblFnS0NrZ2UxeHVJQ0FnSUhKbGRIVnliaUJ1WlhjZ1kzVnpkRzl0UlhabGJuUW9kSGx3WlN3Z2V5QmtaWFJoYVd3NklHMXZaR1ZzSUgwcE8xeHVJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJSGR5WVhCd1pYSkdZV04wYjNKNUlDaGxiQ3dnZEhsd1pTd2dabTRwSUh0Y2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUlIZHlZWEJ3WlhJZ0tHOXlhV2RwYm1Gc1JYWmxiblFwSUh0Y2JpQWdJQ0IyWVhJZ1pTQTlJRzl5YVdkcGJtRnNSWFpsYm5RZ2ZId2daMnh2WW1Gc0xtVjJaVzUwTzF4dUlDQWdJR1V1ZEdGeVoyVjBJRDBnWlM1MFlYSm5aWFFnZkh3Z1pTNXpjbU5GYkdWdFpXNTBPMXh1SUNBZ0lHVXVjSEpsZG1WdWRFUmxabUYxYkhRZ1BTQmxMbkJ5WlhabGJuUkVaV1poZFd4MElIeDhJR1oxYm1OMGFXOXVJSEJ5WlhabGJuUkVaV1poZFd4MElDZ3BJSHNnWlM1eVpYUjFjbTVXWVd4MVpTQTlJR1poYkhObE95QjlPMXh1SUNBZ0lHVXVjM1J2Y0ZCeWIzQmhaMkYwYVc5dUlEMGdaUzV6ZEc5d1VISnZjR0ZuWVhScGIyNGdmSHdnWm5WdVkzUnBiMjRnYzNSdmNGQnliM0JoWjJGMGFXOXVJQ2dwSUhzZ1pTNWpZVzVqWld4Q2RXSmliR1VnUFNCMGNuVmxPeUI5TzF4dUlDQWdJR1V1ZDJocFkyZ2dQU0JsTG5kb2FXTm9JSHg4SUdVdWEyVjVRMjlrWlR0Y2JpQWdJQ0JtYmk1allXeHNLR1ZzTENCbEtUdGNiaUFnZlR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnZDNKaGNDQW9aV3dzSUhSNWNHVXNJR1p1S1NCN1hHNGdJSFpoY2lCM2NtRndjR1Z5SUQwZ2RXNTNjbUZ3S0dWc0xDQjBlWEJsTENCbWJpa2dmSHdnZDNKaGNIQmxja1poWTNSdmNua29aV3dzSUhSNWNHVXNJR1p1S1R0Y2JpQWdhR0Z5WkVOaFkyaGxMbkIxYzJnb2UxeHVJQ0FnSUhkeVlYQndaWEk2SUhkeVlYQndaWElzWEc0Z0lDQWdaV3hsYldWdWREb2daV3dzWEc0Z0lDQWdkSGx3WlRvZ2RIbHdaU3hjYmlBZ0lDQm1iam9nWm01Y2JpQWdmU2s3WEc0Z0lISmxkSFZ5YmlCM2NtRndjR1Z5TzF4dWZWeHVYRzVtZFc1amRHbHZiaUIxYm5keVlYQWdLR1ZzTENCMGVYQmxMQ0JtYmlrZ2UxeHVJQ0IyWVhJZ2FTQTlJR1pwYm1Rb1pXd3NJSFI1Y0dVc0lHWnVLVHRjYmlBZ2FXWWdLR2twSUh0Y2JpQWdJQ0IyWVhJZ2QzSmhjSEJsY2lBOUlHaGhjbVJEWVdOb1pWdHBYUzUzY21Gd2NHVnlPMXh1SUNBZ0lHaGhjbVJEWVdOb1pTNXpjR3hwWTJVb2FTd2dNU2s3SUM4dklHWnlaV1VnZFhBZ1lTQjBZV1FnYjJZZ2JXVnRiM0o1WEc0Z0lDQWdjbVYwZFhKdUlIZHlZWEJ3WlhJN1hHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdabWx1WkNBb1pXd3NJSFI1Y0dVc0lHWnVLU0I3WEc0Z0lIWmhjaUJwTENCcGRHVnRPMXh1SUNCbWIzSWdLR2tnUFNBd095QnBJRHdnYUdGeVpFTmhZMmhsTG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2FYUmxiU0E5SUdoaGNtUkRZV05vWlZ0cFhUdGNiaUFnSUNCcFppQW9hWFJsYlM1bGJHVnRaVzUwSUQwOVBTQmxiQ0FtSmlCcGRHVnRMblI1Y0dVZ1BUMDlJSFI1Y0dVZ0ppWWdhWFJsYlM1bWJpQTlQVDBnWm00cElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCcE8xeHVJQ0FnSUgxY2JpQWdmVnh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIdGNiaUFnWVdSa09pQmhaR1JGZG1WdWRDeGNiaUFnY21WdGIzWmxPaUJ5WlcxdmRtVkZkbVZ1ZEN4Y2JpQWdabUZpY21sallYUmxPaUJtWVdKeWFXTmhkR1ZGZG1WdWRGeHVmVHRjYmlKZGZRPT0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBldmVudG1hcCA9IFtdO1xudmFyIGV2ZW50bmFtZSA9ICcnO1xudmFyIHJvbiA9IC9eb24vO1xuXG5mb3IgKGV2ZW50bmFtZSBpbiBnbG9iYWwpIHtcbiAgaWYgKHJvbi50ZXN0KGV2ZW50bmFtZSkpIHtcbiAgICBldmVudG1hcC5wdXNoKGV2ZW50bmFtZS5zbGljZSgyKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBldmVudG1hcDtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5amNtOXpjM1psYm5RdmMzSmpMMlYyWlc1MGJXRndMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQmxkbVZ1ZEcxaGNDQTlJRnRkTzF4dWRtRnlJR1YyWlc1MGJtRnRaU0E5SUNjbk8xeHVkbUZ5SUhKdmJpQTlJQzllYjI0dk8xeHVYRzVtYjNJZ0tHVjJaVzUwYm1GdFpTQnBiaUJuYkc5aVlXd3BJSHRjYmlBZ2FXWWdLSEp2Ymk1MFpYTjBLR1YyWlc1MGJtRnRaU2twSUh0Y2JpQWdJQ0JsZG1WdWRHMWhjQzV3ZFhOb0tHVjJaVzUwYm1GdFpTNXpiR2xqWlNneUtTazdYRzRnSUgxY2JuMWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JsZG1WdWRHMWhjRHRjYmlKZGZRPT0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG5cbnZhciBOYXRpdmVDdXN0b21FdmVudCA9IGdsb2JhbC5DdXN0b21FdmVudDtcblxuZnVuY3Rpb24gdXNlTmF0aXZlICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgcCA9IG5ldyBOYXRpdmVDdXN0b21FdmVudCgnY2F0JywgeyBkZXRhaWw6IHsgZm9vOiAnYmFyJyB9IH0pO1xuICAgIHJldHVybiAgJ2NhdCcgPT09IHAudHlwZSAmJiAnYmFyJyA9PT0gcC5kZXRhaWwuZm9vO1xuICB9IGNhdGNoIChlKSB7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENyb3NzLWJyb3dzZXIgYEN1c3RvbUV2ZW50YCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQuQ3VzdG9tRXZlbnRcbiAqXG4gKiBAcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB1c2VOYXRpdmUoKSA/IE5hdGl2ZUN1c3RvbUV2ZW50IDpcblxuLy8gSUUgPj0gOVxuJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUV2ZW50ID8gZnVuY3Rpb24gQ3VzdG9tRXZlbnQgKHR5cGUsIHBhcmFtcykge1xuICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICBpZiAocGFyYW1zKSB7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgfSBlbHNlIHtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIHZvaWQgMCk7XG4gIH1cbiAgcmV0dXJuIGU7XG59IDpcblxuLy8gSUUgPD0gOFxuZnVuY3Rpb24gQ3VzdG9tRXZlbnQgKHR5cGUsIHBhcmFtcykge1xuICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gIGUudHlwZSA9IHR5cGU7XG4gIGlmIChwYXJhbXMpIHtcbiAgICBlLmJ1YmJsZXMgPSBCb29sZWFuKHBhcmFtcy5idWJibGVzKTtcbiAgICBlLmNhbmNlbGFibGUgPSBCb29sZWFuKHBhcmFtcy5jYW5jZWxhYmxlKTtcbiAgICBlLmRldGFpbCA9IHBhcmFtcy5kZXRhaWw7XG4gIH0gZWxzZSB7XG4gICAgZS5idWJibGVzID0gZmFsc2U7XG4gICAgZS5jYW5jZWxhYmxlID0gZmFsc2U7XG4gICAgZS5kZXRhaWwgPSB2b2lkIDA7XG4gIH1cbiAgcmV0dXJuIGU7XG59XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWpkWE4wYjIwdFpYWmxiblF2YVc1a1pYZ3Vhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SmNiblpoY2lCT1lYUnBkbVZEZFhOMGIyMUZkbVZ1ZENBOUlHZHNiMkpoYkM1RGRYTjBiMjFGZG1WdWREdGNibHh1Wm5WdVkzUnBiMjRnZFhObFRtRjBhWFpsSUNncElIdGNiaUFnZEhKNUlIdGNiaUFnSUNCMllYSWdjQ0E5SUc1bGR5Qk9ZWFJwZG1WRGRYTjBiMjFGZG1WdWRDZ25ZMkYwSnl3Z2V5QmtaWFJoYVd3NklIc2dabTl2T2lBblltRnlKeUI5SUgwcE8xeHVJQ0FnSUhKbGRIVnliaUFnSjJOaGRDY2dQVDA5SUhBdWRIbHdaU0FtSmlBblltRnlKeUE5UFQwZ2NDNWtaWFJoYVd3dVptOXZPMXh1SUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHWmhiSE5sTzF4dWZWeHVYRzR2S2lwY2JpQXFJRU55YjNOekxXSnliM2R6WlhJZ1lFTjFjM1J2YlVWMlpXNTBZQ0JqYjI1emRISjFZM1J2Y2k1Y2JpQXFYRzRnS2lCb2RIUndjem92TDJSbGRtVnNiM0JsY2k1dGIzcHBiR3hoTG05eVp5OWxiaTFWVXk5a2IyTnpMMWRsWWk5QlVFa3ZRM1Z6ZEc5dFJYWmxiblF1UTNWemRHOXRSWFpsYm5SY2JpQXFYRzRnS2lCQWNIVmliR2xqWEc0Z0tpOWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0IxYzJWT1lYUnBkbVVvS1NBL0lFNWhkR2wyWlVOMWMzUnZiVVYyWlc1MElEcGNibHh1THk4Z1NVVWdQajBnT1Z4dUoyWjFibU4wYVc5dUp5QTlQVDBnZEhsd1pXOW1JR1J2WTNWdFpXNTBMbU55WldGMFpVVjJaVzUwSUQ4Z1puVnVZM1JwYjI0Z1EzVnpkRzl0UlhabGJuUWdLSFI1Y0dVc0lIQmhjbUZ0Y3lrZ2UxeHVJQ0IyWVhJZ1pTQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVjJaVzUwS0NkRGRYTjBiMjFGZG1WdWRDY3BPMXh1SUNCcFppQW9jR0Z5WVcxektTQjdYRzRnSUNBZ1pTNXBibWwwUTNWemRHOXRSWFpsYm5Rb2RIbHdaU3dnY0dGeVlXMXpMbUoxWW1Kc1pYTXNJSEJoY21GdGN5NWpZVzVqWld4aFlteGxMQ0J3WVhKaGJYTXVaR1YwWVdsc0tUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQmxMbWx1YVhSRGRYTjBiMjFGZG1WdWRDaDBlWEJsTENCbVlXeHpaU3dnWm1Gc2MyVXNJSFp2YVdRZ01DazdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHVTdYRzU5SURwY2JseHVMeThnU1VVZ1BEMGdPRnh1Wm5WdVkzUnBiMjRnUTNWemRHOXRSWFpsYm5RZ0tIUjVjR1VzSUhCaGNtRnRjeWtnZTF4dUlDQjJZWElnWlNBOUlHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWMlpXNTBUMkpxWldOMEtDazdYRzRnSUdVdWRIbHdaU0E5SUhSNWNHVTdYRzRnSUdsbUlDaHdZWEpoYlhNcElIdGNiaUFnSUNCbExtSjFZbUpzWlhNZ1BTQkNiMjlzWldGdUtIQmhjbUZ0Y3k1aWRXSmliR1Z6S1R0Y2JpQWdJQ0JsTG1OaGJtTmxiR0ZpYkdVZ1BTQkNiMjlzWldGdUtIQmhjbUZ0Y3k1allXNWpaV3hoWW14bEtUdGNiaUFnSUNCbExtUmxkR0ZwYkNBOUlIQmhjbUZ0Y3k1a1pYUmhhV3c3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnWlM1aWRXSmliR1Z6SUQwZ1ptRnNjMlU3WEc0Z0lDQWdaUzVqWVc1alpXeGhZbXhsSUQwZ1ptRnNjMlU3WEc0Z0lDQWdaUzVrWlhSaGFXd2dQU0IyYjJsa0lEQTdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHVTdYRzU5WEc0aVhYMD0iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2lzLWZ1bmN0aW9uJylcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcblxuZnVuY3Rpb24gZm9yRWFjaChsaXN0LCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGlmICghaXNGdW5jdGlvbihpdGVyYXRvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICB9XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgY29udGV4dCA9IHRoaXNcbiAgICB9XG4gICAgXG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobGlzdCkgPT09ICdbb2JqZWN0IEFycmF5XScpXG4gICAgICAgIGZvckVhY2hBcnJheShsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbiAgICBlbHNlIGlmICh0eXBlb2YgbGlzdCA9PT0gJ3N0cmluZycpXG4gICAgICAgIGZvckVhY2hTdHJpbmcobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG4gICAgZWxzZVxuICAgICAgICBmb3JFYWNoT2JqZWN0KGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCBpKSkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBhcnJheVtpXSwgaSwgYXJyYXkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hTdHJpbmcoc3RyaW5nLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHJpbmcubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgLy8gbm8gc3VjaCB0aGluZyBhcyBhIHNwYXJzZSBzdHJpbmcuXG4gICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaE9iamVjdChvYmplY3QsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgayBpbiBvYmplY3QpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrKSkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmplY3Rba10sIGssIG9iamVjdClcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIG1vZHVsZS5leHBvcnRzID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7fTtcbn1cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5bmJHOWlZV3d2ZDJsdVpHOTNMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpYVdZZ0tIUjVjR1Z2WmlCM2FXNWtiM2NnSVQwOUlGd2lkVzVrWldacGJtVmtYQ0lwSUh0Y2JpQWdJQ0J0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSGRwYm1SdmR6dGNibjBnWld4elpTQnBaaUFvZEhsd1pXOW1JR2RzYjJKaGJDQWhQVDBnWENKMWJtUmxabWx1WldSY0lpa2dlMXh1SUNBZ0lHMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1oyeHZZbUZzTzF4dWZTQmxiSE5sSUdsbUlDaDBlWEJsYjJZZ2MyVnNaaUFoUFQwZ1hDSjFibVJsWm1sdVpXUmNJaWw3WEc0Z0lDQWdiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnpaV3htTzF4dWZTQmxiSE5sSUh0Y2JpQWdJQ0J0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHQ5TzF4dWZWeHVJbDE5IiwibW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxuZnVuY3Rpb24gaXNGdW5jdGlvbiAoZm4pIHtcbiAgdmFyIHN0cmluZyA9IHRvU3RyaW5nLmNhbGwoZm4pXG4gIHJldHVybiBzdHJpbmcgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScgfHxcbiAgICAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIHN0cmluZyAhPT0gJ1tvYmplY3QgUmVnRXhwXScpIHx8XG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgIC8vIElFOCBhbmQgYmVsb3dcbiAgICAgKGZuID09PSB3aW5kb3cuc2V0VGltZW91dCB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5hbGVydCB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5jb25maXJtIHx8XG4gICAgICBmbiA9PT0gd2luZG93LnByb21wdCkpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2VrdG9yID0gcmVxdWlyZSgnc2VrdG9yJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgcnNwYWNlcyA9IC9cXHMrL2c7XG52YXIga2V5bWFwID0ge1xuICAxMzogJ2VudGVyJyxcbiAgMjc6ICdlc2MnLFxuICAzMjogJ3NwYWNlJ1xufTtcbnZhciBoYW5kbGVycyA9IHt9O1xuXG5jcm9zc3ZlbnQuYWRkKHdpbmRvdywgJ2tleWRvd24nLCBrZXlkb3duKTtcblxuZnVuY3Rpb24gY2xlYXIgKGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQpIHtcbiAgICBpZiAoY29udGV4dCBpbiBoYW5kbGVycykge1xuICAgICAgaGFuZGxlcnNbY29udGV4dF0gPSB7fTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaGFuZGxlcnMgPSB7fTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzd2l0Y2hib2FyZCAodGhlbiwgY29tYm8sIG9wdGlvbnMsIGZuKSB7XG4gIGlmIChmbiA9PT0gdm9pZCAwKSB7XG4gICAgZm4gPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBjb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0IHx8ICdkZWZhdWx0cyc7XG5cbiAgaWYgKCFmbikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChoYW5kbGVyc1tjb250ZXh0XSA9PT0gdm9pZCAwKSB7XG4gICAgaGFuZGxlcnNbY29udGV4dF0gPSB7fTtcbiAgfVxuXG4gIGNvbWJvLnRvTG93ZXJDYXNlKCkuc3BsaXQocnNwYWNlcykuZm9yRWFjaChpdGVtKTtcblxuICBmdW5jdGlvbiBpdGVtIChrZXlzKSB7XG4gICAgdmFyIGMgPSBrZXlzLnRyaW0oKTtcbiAgICBpZiAoYy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhlbihoYW5kbGVyc1tjb250ZXh0XSwgYywgb3B0aW9ucywgZm4pO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uIChjb21ibywgb3B0aW9ucywgZm4pIHtcbiAgc3dpdGNoYm9hcmQoYWRkLCBjb21ibywgb3B0aW9ucywgZm4pO1xuXG4gIGZ1bmN0aW9uIGFkZCAoYXJlYSwga2V5LCBvcHRpb25zLCBmbikge1xuICAgIHZhciBoYW5kbGVyID0ge1xuICAgICAgaGFuZGxlOiBmbixcbiAgICAgIGZpbHRlcjogb3B0aW9ucy5maWx0ZXJcbiAgICB9O1xuICAgIGlmIChhcmVhW2tleV0pIHtcbiAgICAgIGFyZWFba2V5XS5wdXNoKGhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmVhW2tleV0gPSBbaGFuZGxlcl07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9mZiAoY29tYm8sIG9wdGlvbnMsIGZuKSB7XG4gIHN3aXRjaGJvYXJkKHJtLCBjb21ibywgb3B0aW9ucywgZm4pO1xuXG4gIGZ1bmN0aW9uIHJtIChhcmVhLCBrZXksIG9wdGlvbnMsIGZuKSB7XG4gICAgaWYgKGFyZWFba2V5XSkge1xuICAgICAgYXJlYVtrZXldID0gYXJlYVtrZXldLmZpbHRlcihtYXRjaGluZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hpbmcgKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBoYW5kbGVyLmhhbmRsZSA9PT0gZm4gJiYgaGFuZGxlci5maWx0ZXIgPT09IG9wdGlvbnMuZmlsdGVyO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRLZXlDb2RlIChlKSB7XG4gIHJldHVybiBlLndoaWNoIHx8IGUua2V5Q29kZSB8fCBlLmNoYXJDb2RlO1xufVxuXG5mdW5jdGlvbiBrZXlkb3duIChlKSB7XG4gIHZhciBjb2RlID0gZ2V0S2V5Q29kZShlKTtcbiAgdmFyIGtleSA9IGtleW1hcFtjb2RlXSB8fCBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZiAoa2V5KSB7XG4gICAgaGFuZGxlKGtleSwgZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VLZXlDb21ibyAoa2V5LCBlKSB7XG4gIHZhciBjb21ibyA9IFtrZXldO1xuICBpZiAoZS5zaGlmdEtleSkge1xuICAgIGNvbWJvLnVuc2hpZnQoJ3NoaWZ0Jyk7XG4gIH1cbiAgaWYgKGUuYWx0S2V5KSB7XG4gICAgY29tYm8udW5zaGlmdCgnYWx0Jyk7XG4gIH1cbiAgaWYgKGUuY3RybEtleSBeIGUubWV0YUtleSkge1xuICAgIGNvbWJvLnVuc2hpZnQoJ2NtZCcpO1xuICB9XG4gIHJldHVybiBjb21iby5qb2luKCcrJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlIChrZXksIGUpIHtcbiAgdmFyIGNvbWJvID0gcGFyc2VLZXlDb21ibyhrZXksIGUpO1xuICB2YXIgY29udGV4dDtcbiAgZm9yIChjb250ZXh0IGluIGhhbmRsZXJzKSB7XG4gICAgaWYgKGhhbmRsZXJzW2NvbnRleHRdW2NvbWJvXSkge1xuICAgICAgaGFuZGxlcnNbY29udGV4dF1bY29tYm9dLmZvckVhY2goZXhlYyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyZWQgKGhhbmRsZXIpIHtcbiAgICB2YXIgZmlsdGVyID0gaGFuZGxlci5maWx0ZXI7XG4gICAgaWYgKCFmaWx0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZWwgPSBlLnRhcmdldDtcbiAgICB2YXIgc2VsZWN0b3IgPSB0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJztcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBzZWt0b3IubWF0Y2hlc1NlbGVjdG9yKGVsLCBmaWx0ZXIpID09PSBmYWxzZTtcbiAgICB9XG4gICAgd2hpbGUgKGVsLnBhcmVudEVsZW1lbnQgJiYgZWwgIT09IGZpbHRlcikge1xuICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gZWwgIT09IGZpbHRlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4ZWMgKGhhbmRsZXIpIHtcbiAgICBpZiAoZmlsdGVyZWQoaGFuZGxlcikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGFuZGxlci5oYW5kbGUoZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uOiBvbixcbiAgb2ZmOiBvZmYsXG4gIGNsZWFyOiBjbGVhcixcbiAgaGFuZGxlcnM6IGhhbmRsZXJzXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3R1YiA9IHJlcXVpcmUoJy4vc3R1YicpO1xudmFyIHRyYWNraW5nID0gcmVxdWlyZSgnLi90cmFja2luZycpO1xudmFyIGxzID0gJ2xvY2FsU3RvcmFnZScgaW4gZ2xvYmFsICYmIGdsb2JhbC5sb2NhbFN0b3JhZ2UgPyBnbG9iYWwubG9jYWxTdG9yYWdlIDogc3R1YjtcblxuZnVuY3Rpb24gYWNjZXNzb3IgKGtleSwgdmFsdWUpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZ2V0KGtleSk7XG4gIH1cbiAgcmV0dXJuIHNldChrZXksIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gZ2V0IChrZXkpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UobHMuZ2V0SXRlbShrZXkpKTtcbn1cblxuZnVuY3Rpb24gc2V0IChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgbHMuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChrZXkpIHtcbiAgcmV0dXJuIGxzLnJlbW92ZUl0ZW0oa2V5KTtcbn1cblxuZnVuY3Rpb24gY2xlYXIgKCkge1xuICByZXR1cm4gbHMuY2xlYXIoKTtcbn1cblxuYWNjZXNzb3Iuc2V0ID0gc2V0O1xuYWNjZXNzb3IuZ2V0ID0gZ2V0O1xuYWNjZXNzb3IucmVtb3ZlID0gcmVtb3ZlO1xuYWNjZXNzb3IuY2xlYXIgPSBjbGVhcjtcbmFjY2Vzc29yLm9uID0gdHJhY2tpbmcub247XG5hY2Nlc3Nvci5vZmYgPSB0cmFja2luZy5vZmY7XG5cbm1vZHVsZS5leHBvcnRzID0gYWNjZXNzb3I7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXNiMk5oYkMxemRHOXlZV2RsTDJ4dlkyRnNMWE4wYjNKaFoyVXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQnpkSFZpSUQwZ2NtVnhkV2x5WlNnbkxpOXpkSFZpSnlrN1hHNTJZWElnZEhKaFkydHBibWNnUFNCeVpYRjFhWEpsS0NjdUwzUnlZV05yYVc1bkp5azdYRzUyWVhJZ2JITWdQU0FuYkc5allXeFRkRzl5WVdkbEp5QnBiaUJuYkc5aVlXd2dKaVlnWjJ4dlltRnNMbXh2WTJGc1UzUnZjbUZuWlNBL0lHZHNiMkpoYkM1c2IyTmhiRk4wYjNKaFoyVWdPaUJ6ZEhWaU8xeHVYRzVtZFc1amRHbHZiaUJoWTJObGMzTnZjaUFvYTJWNUxDQjJZV3gxWlNrZ2UxeHVJQ0JwWmlBb1lYSm5kVzFsYm5SekxteGxibWQwYUNBOVBUMGdNU2tnZTF4dUlDQWdJSEpsZEhWeWJpQm5aWFFvYTJWNUtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2MyVjBLR3RsZVN3Z2RtRnNkV1VwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJuWlhRZ0tHdGxlU2tnZTF4dUlDQnlaWFIxY200Z1NsTlBUaTV3WVhKelpTaHNjeTVuWlhSSmRHVnRLR3RsZVNrcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCelpYUWdLR3RsZVN3Z2RtRnNkV1VwSUh0Y2JpQWdkSEo1SUh0Y2JpQWdJQ0JzY3k1elpYUkpkR1Z0S0d0bGVTd2dTbE5QVGk1emRISnBibWRwWm5rb2RtRnNkV1VwS1R0Y2JpQWdJQ0J5WlhSMWNtNGdkSEoxWlR0Y2JpQWdmU0JqWVhSamFDQW9aU2tnZTF4dUlDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JpQWdmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaVzF2ZG1VZ0tHdGxlU2tnZTF4dUlDQnlaWFIxY200Z2JITXVjbVZ0YjNabFNYUmxiU2hyWlhrcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCamJHVmhjaUFvS1NCN1hHNGdJSEpsZEhWeWJpQnNjeTVqYkdWaGNpZ3BPMXh1ZlZ4dVhHNWhZMk5sYzNOdmNpNXpaWFFnUFNCelpYUTdYRzVoWTJObGMzTnZjaTVuWlhRZ1BTQm5aWFE3WEc1aFkyTmxjM052Y2k1eVpXMXZkbVVnUFNCeVpXMXZkbVU3WEc1aFkyTmxjM052Y2k1amJHVmhjaUE5SUdOc1pXRnlPMXh1WVdOalpYTnpiM0l1YjI0Z1BTQjBjbUZqYTJsdVp5NXZianRjYm1GalkyVnpjMjl5TG05bVppQTlJSFJ5WVdOcmFXNW5MbTltWmp0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQmhZMk5sYzNOdmNqdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1zID0ge307XG5cbmZ1bmN0aW9uIGdldEl0ZW0gKGtleSkge1xuICByZXR1cm4ga2V5IGluIG1zID8gbXNba2V5XSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHNldEl0ZW0gKGtleSwgdmFsdWUpIHtcbiAgbXNba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSXRlbSAoa2V5KSB7XG4gIHZhciBmb3VuZCA9IGtleSBpbiBtcztcbiAgaWYgKGZvdW5kKSB7XG4gICAgcmV0dXJuIGRlbGV0ZSBtc1trZXldO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY2xlYXIgKCkge1xuICBtcyA9IHt9O1xuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldEl0ZW06IGdldEl0ZW0sXG4gIHNldEl0ZW06IHNldEl0ZW0sXG4gIHJlbW92ZUl0ZW06IHJlbW92ZUl0ZW0sXG4gIGNsZWFyOiBjbGVhclxufTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGxpc3RlbmVycyA9IHt9O1xudmFyIGxpc3RlbmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBsaXN0ZW4gKCkge1xuICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIGNoYW5nZSwgZmFsc2UpO1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hdHRhY2hFdmVudCkge1xuICAgIGdsb2JhbC5hdHRhY2hFdmVudCgnb25zdG9yYWdlJywgY2hhbmdlKTtcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWwub25zdG9yYWdlID0gY2hhbmdlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZSAoZSkge1xuICBpZiAoIWUpIHtcbiAgICBlID0gZ2xvYmFsLmV2ZW50O1xuICB9XG4gIHZhciBhbGwgPSBsaXN0ZW5lcnNbZS5rZXldO1xuICBpZiAoYWxsKSB7XG4gICAgYWxsLmZvckVhY2goZmlyZSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaXJlIChsaXN0ZW5lcikge1xuICAgIGxpc3RlbmVyKEpTT04ucGFyc2UoZS5uZXdWYWx1ZSksIEpTT04ucGFyc2UoZS5vbGRWYWx1ZSksIGUudXJsIHx8IGUudXJpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbiAoa2V5LCBmbikge1xuICBpZiAobGlzdGVuZXJzW2tleV0pIHtcbiAgICBsaXN0ZW5lcnNba2V5XS5wdXNoKGZuKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0ZW5lcnNba2V5XSA9IFtmbl07XG4gIH1cbiAgaWYgKGxpc3RlbmluZyA9PT0gZmFsc2UpIHtcbiAgICBsaXN0ZW4oKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvZmYgKGtleSwgZm4pIHtcbiAgdmFyIG5zID0gbGlzdGVuZXJzW2tleV07XG4gIGlmIChucy5sZW5ndGggPiAxKSB7XG4gICAgbnMuc3BsaWNlKG5zLmluZGV4T2YoZm4pLCAxKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0ZW5lcnNba2V5XSA9IFtdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvbjogb24sXG4gIG9mZjogb2ZmXG59O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlzYjJOaGJDMXpkRzl5WVdkbEwzUnlZV05yYVc1bkxtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlHeHBjM1JsYm1WeWN5QTlJSHQ5TzF4dWRtRnlJR3hwYzNSbGJtbHVaeUE5SUdaaGJITmxPMXh1WEc1bWRXNWpkR2x2YmlCc2FYTjBaVzRnS0NrZ2UxeHVJQ0JwWmlBb1oyeHZZbUZzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElwSUh0Y2JpQWdJQ0JuYkc5aVlXd3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25jM1J2Y21GblpTY3NJR05vWVc1blpTd2dabUZzYzJVcE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0dkc2IySmhiQzVoZEhSaFkyaEZkbVZ1ZENrZ2UxeHVJQ0FnSUdkc2IySmhiQzVoZEhSaFkyaEZkbVZ1ZENnbmIyNXpkRzl5WVdkbEp5d2dZMmhoYm1kbEtUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQm5iRzlpWVd3dWIyNXpkRzl5WVdkbElEMGdZMmhoYm1kbE8xeHVJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJR05vWVc1blpTQW9aU2tnZTF4dUlDQnBaaUFvSVdVcElIdGNiaUFnSUNCbElEMGdaMnh2WW1Gc0xtVjJaVzUwTzF4dUlDQjlYRzRnSUhaaGNpQmhiR3dnUFNCc2FYTjBaVzVsY25OYlpTNXJaWGxkTzF4dUlDQnBaaUFvWVd4c0tTQjdYRzRnSUNBZ1lXeHNMbVp2Y2tWaFkyZ29abWx5WlNrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQm1hWEpsSUNoc2FYTjBaVzVsY2lrZ2UxeHVJQ0FnSUd4cGMzUmxibVZ5S0VwVFQwNHVjR0Z5YzJVb1pTNXVaWGRXWVd4MVpTa3NJRXBUVDA0dWNHRnljMlVvWlM1dmJHUldZV3gxWlNrc0lHVXVkWEpzSUh4OElHVXVkWEpwS1R0Y2JpQWdmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnZiaUFvYTJWNUxDQm1iaWtnZTF4dUlDQnBaaUFvYkdsemRHVnVaWEp6VzJ0bGVWMHBJSHRjYmlBZ0lDQnNhWE4wWlc1bGNuTmJhMlY1WFM1d2RYTm9LR1p1S1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCc2FYTjBaVzVsY25OYmEyVjVYU0E5SUZ0bWJsMDdYRzRnSUgxY2JpQWdhV1lnS0d4cGMzUmxibWx1WnlBOVBUMGdabUZzYzJVcElIdGNiaUFnSUNCc2FYTjBaVzRvS1R0Y2JpQWdmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnZabVlnS0d0bGVTd2dabTRwSUh0Y2JpQWdkbUZ5SUc1eklEMGdiR2x6ZEdWdVpYSnpXMnRsZVYwN1hHNGdJR2xtSUNodWN5NXNaVzVuZEdnZ1BpQXhLU0I3WEc0Z0lDQWdibk11YzNCc2FXTmxLRzV6TG1sdVpHVjRUMllvWm00cExDQXhLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JzYVhOMFpXNWxjbk5iYTJWNVhTQTlJRnRkTzF4dUlDQjlYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2UxeHVJQ0J2YmpvZ2IyNHNYRzRnSUc5bVpqb2diMlptWEc1OU8xeHVJbDE5IiwidmFyIHRyaW0gPSByZXF1aXJlKCd0cmltJylcbiAgLCBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKVxuICAsIGlzQXJyYXkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgaWYgKCFoZWFkZXJzKVxuICAgIHJldHVybiB7fVxuXG4gIHZhciByZXN1bHQgPSB7fVxuXG4gIGZvckVhY2goXG4gICAgICB0cmltKGhlYWRlcnMpLnNwbGl0KCdcXG4nKVxuICAgICwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICB2YXIgaW5kZXggPSByb3cuaW5kZXhPZignOicpXG4gICAgICAgICAgLCBrZXkgPSB0cmltKHJvdy5zbGljZSgwLCBpbmRleCkpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAsIHZhbHVlID0gdHJpbShyb3cuc2xpY2UoaW5kZXggKyAxKSlcblxuICAgICAgICBpZiAodHlwZW9mKHJlc3VsdFtrZXldKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShyZXN1bHRba2V5XSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XS5wdXNoKHZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gWyByZXN1bHRba2V5XSwgdmFsdWUgXVxuICAgICAgICB9XG4gICAgICB9XG4gIClcblxuICByZXR1cm4gcmVzdWx0XG59IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXhwYW5kbyA9ICdzZWt0b3ItJyArIERhdGUubm93KCk7XG52YXIgcnNpYmxpbmdzID0gL1srfl0vO1xudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGRlbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCB7fTtcbnZhciBtYXRjaCA9IChcbiAgZGVsLm1hdGNoZXMgfHxcbiAgZGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuICBkZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gIGRlbC5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4gIGRlbC5tc01hdGNoZXNTZWxlY3RvciB8fFxuICBuZXZlclxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZWt0b3I7XG5cbnNla3Rvci5tYXRjaGVzID0gbWF0Y2hlcztcbnNla3Rvci5tYXRjaGVzU2VsZWN0b3IgPSBtYXRjaGVzU2VsZWN0b3I7XG5cbmZ1bmN0aW9uIHFzYSAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgdmFyIGV4aXN0ZWQsIGlkLCBwcmVmaXgsIHByZWZpeGVkLCBhZGFwdGVyLCBoYWNrID0gY29udGV4dCAhPT0gZG9jdW1lbnQ7XG4gIGlmIChoYWNrKSB7IC8vIGlkIGhhY2sgZm9yIGNvbnRleHQtcm9vdGVkIHF1ZXJpZXNcbiAgICBleGlzdGVkID0gY29udGV4dC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgaWQgPSBleGlzdGVkIHx8IGV4cGFuZG87XG4gICAgcHJlZml4ID0gJyMnICsgaWQgKyAnICc7XG4gICAgcHJlZml4ZWQgPSBwcmVmaXggKyBzZWxlY3Rvci5yZXBsYWNlKC8sL2csICcsJyArIHByZWZpeCk7XG4gICAgYWRhcHRlciA9IHJzaWJsaW5ncy50ZXN0KHNlbGVjdG9yKSAmJiBjb250ZXh0LnBhcmVudE5vZGU7XG4gICAgaWYgKCFleGlzdGVkKSB7IGNvbnRleHQuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTsgfVxuICB9XG4gIHRyeSB7XG4gICAgcmV0dXJuIChhZGFwdGVyIHx8IGNvbnRleHQpLnF1ZXJ5U2VsZWN0b3JBbGwocHJlZml4ZWQgfHwgc2VsZWN0b3IpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChleGlzdGVkID09PSBudWxsKSB7IGNvbnRleHQucmVtb3ZlQXR0cmlidXRlKCdpZCcpOyB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2VrdG9yIChzZWxlY3RvciwgY3R4LCBjb2xsZWN0aW9uLCBzZWVkKSB7XG4gIHZhciBlbGVtZW50O1xuICB2YXIgY29udGV4dCA9IGN0eCB8fCBkb2N1bWVudDtcbiAgdmFyIHJlc3VsdHMgPSBjb2xsZWN0aW9uIHx8IFtdO1xuICB2YXIgaSA9IDA7XG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cbiAgaWYgKGNvbnRleHQubm9kZVR5cGUgIT09IDEgJiYgY29udGV4dC5ub2RlVHlwZSAhPT0gOSkge1xuICAgIHJldHVybiBbXTsgLy8gYmFpbCBpZiBjb250ZXh0IGlzIG5vdCBhbiBlbGVtZW50IG9yIGRvY3VtZW50XG4gIH1cbiAgaWYgKHNlZWQpIHtcbiAgICB3aGlsZSAoKGVsZW1lbnQgPSBzZWVkW2krK10pKSB7XG4gICAgICBpZiAobWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKSkge1xuICAgICAgICByZXN1bHRzLnB1c2goZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdHMucHVzaC5hcHBseShyZXN1bHRzLCBxc2Eoc2VsZWN0b3IsIGNvbnRleHQpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gbWF0Y2hlcyAoc2VsZWN0b3IsIGVsZW1lbnRzKSB7XG4gIHJldHVybiBzZWt0b3Ioc2VsZWN0b3IsIG51bGwsIG51bGwsIGVsZW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gbWF0Y2guY2FsbChlbGVtZW50LCBzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIG5ldmVyICgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3QwYjNJdmMzSmpMM05sYTNSdmNpNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQmxlSEJoYm1SdklEMGdKM05sYTNSdmNpMG5JQ3NnUkdGMFpTNXViM2NvS1R0Y2JuWmhjaUJ5YzJsaWJHbHVaM01nUFNBdld5dCtYUzg3WEc1MllYSWdaRzlqZFcxbGJuUWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzUyWVhJZ1pHVnNJRDBnWkc5amRXMWxiblF1Wkc5amRXMWxiblJGYkdWdFpXNTBJSHg4SUh0OU8xeHVkbUZ5SUcxaGRHTm9JRDBnS0Z4dUlDQmtaV3d1YldGMFkyaGxjeUI4ZkZ4dUlDQmtaV3d1ZDJWaWEybDBUV0YwWTJobGMxTmxiR1ZqZEc5eUlIeDhYRzRnSUdSbGJDNXRiM3BOWVhSamFHVnpVMlZzWldOMGIzSWdmSHhjYmlBZ1pHVnNMbTlOWVhSamFHVnpVMlZzWldOMGIzSWdmSHhjYmlBZ1pHVnNMbTF6VFdGMFkyaGxjMU5sYkdWamRHOXlJSHg4WEc0Z0lHNWxkbVZ5WEc0cE8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSE5sYTNSdmNqdGNibHh1YzJWcmRHOXlMbTFoZEdOb1pYTWdQU0J0WVhSamFHVnpPMXh1YzJWcmRHOXlMbTFoZEdOb1pYTlRaV3hsWTNSdmNpQTlJRzFoZEdOb1pYTlRaV3hsWTNSdmNqdGNibHh1Wm5WdVkzUnBiMjRnY1hOaElDaHpaV3hsWTNSdmNpd2dZMjl1ZEdWNGRDa2dlMXh1SUNCMllYSWdaWGhwYzNSbFpDd2dhV1FzSUhCeVpXWnBlQ3dnY0hKbFptbDRaV1FzSUdGa1lYQjBaWElzSUdoaFkyc2dQU0JqYjI1MFpYaDBJQ0U5UFNCa2IyTjFiV1Z1ZER0Y2JpQWdhV1lnS0doaFkyc3BJSHNnTHk4Z2FXUWdhR0ZqYXlCbWIzSWdZMjl1ZEdWNGRDMXliMjkwWldRZ2NYVmxjbWxsYzF4dUlDQWdJR1Y0YVhOMFpXUWdQU0JqYjI1MFpYaDBMbWRsZEVGMGRISnBZblYwWlNnbmFXUW5LVHRjYmlBZ0lDQnBaQ0E5SUdWNGFYTjBaV1FnZkh3Z1pYaHdZVzVrYnp0Y2JpQWdJQ0J3Y21WbWFYZ2dQU0FuSXljZ0t5QnBaQ0FySUNjZ0p6dGNiaUFnSUNCd2NtVm1hWGhsWkNBOUlIQnlaV1pwZUNBcklITmxiR1ZqZEc5eUxuSmxjR3hoWTJVb0x5d3ZaeXdnSnl3bklDc2djSEpsWm1sNEtUdGNiaUFnSUNCaFpHRndkR1Z5SUQwZ2NuTnBZbXhwYm1kekxuUmxjM1FvYzJWc1pXTjBiM0lwSUNZbUlHTnZiblJsZUhRdWNHRnlaVzUwVG05a1pUdGNiaUFnSUNCcFppQW9JV1Y0YVhOMFpXUXBJSHNnWTI5dWRHVjRkQzV6WlhSQmRIUnlhV0oxZEdVb0oybGtKeXdnYVdRcE95QjlYRzRnSUgxY2JpQWdkSEo1SUh0Y2JpQWdJQ0J5WlhSMWNtNGdLR0ZrWVhCMFpYSWdmSHdnWTI5dWRHVjRkQ2t1Y1hWbGNubFRaV3hsWTNSdmNrRnNiQ2h3Y21WbWFYaGxaQ0I4ZkNCelpXeGxZM1J2Y2lrN1hHNGdJSDBnWTJGMFkyZ2dLR1VwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdXMTA3WEc0Z0lIMGdabWx1WVd4c2VTQjdYRzRnSUNBZ2FXWWdLR1Y0YVhOMFpXUWdQVDA5SUc1MWJHd3BJSHNnWTI5dWRHVjRkQzV5WlcxdmRtVkJkSFJ5YVdKMWRHVW9KMmxrSnlrN0lIMWNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ6Wld0MGIzSWdLSE5sYkdWamRHOXlMQ0JqZEhnc0lHTnZiR3hsWTNScGIyNHNJSE5sWldRcElIdGNiaUFnZG1GeUlHVnNaVzFsYm5RN1hHNGdJSFpoY2lCamIyNTBaWGgwSUQwZ1kzUjRJSHg4SUdSdlkzVnRaVzUwTzF4dUlDQjJZWElnY21WemRXeDBjeUE5SUdOdmJHeGxZM1JwYjI0Z2ZId2dXMTA3WEc0Z0lIWmhjaUJwSUQwZ01EdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCelpXeGxZM1J2Y2lBaFBUMGdKM04wY21sdVp5Y3BJSHRjYmlBZ0lDQnlaWFIxY200Z2NtVnpkV3gwY3p0Y2JpQWdmVnh1SUNCcFppQW9ZMjl1ZEdWNGRDNXViMlJsVkhsd1pTQWhQVDBnTVNBbUppQmpiMjUwWlhoMExtNXZaR1ZVZVhCbElDRTlQU0E1S1NCN1hHNGdJQ0FnY21WMGRYSnVJRnRkT3lBdkx5QmlZV2xzSUdsbUlHTnZiblJsZUhRZ2FYTWdibTkwSUdGdUlHVnNaVzFsYm5RZ2IzSWdaRzlqZFcxbGJuUmNiaUFnZlZ4dUlDQnBaaUFvYzJWbFpDa2dlMXh1SUNBZ0lIZG9hV3hsSUNnb1pXeGxiV1Z1ZENBOUlITmxaV1JiYVNzclhTa3BJSHRjYmlBZ0lDQWdJR2xtSUNodFlYUmphR1Z6VTJWc1pXTjBiM0lvWld4bGJXVnVkQ3dnYzJWc1pXTjBiM0lwS1NCN1hHNGdJQ0FnSUNBZ0lISmxjM1ZzZEhNdWNIVnphQ2hsYkdWdFpXNTBLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdjbVZ6ZFd4MGN5NXdkWE5vTG1Gd2NHeDVLSEpsYzNWc2RITXNJSEZ6WVNoelpXeGxZM1J2Y2l3Z1kyOXVkR1Y0ZENrcE8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCeVpYTjFiSFJ6TzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ0WVhSamFHVnpJQ2h6Wld4bFkzUnZjaXdnWld4bGJXVnVkSE1wSUh0Y2JpQWdjbVYwZFhKdUlITmxhM1J2Y2loelpXeGxZM1J2Y2l3Z2JuVnNiQ3dnYm5Wc2JDd2daV3hsYldWdWRITXBPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnRZWFJqYUdWelUyVnNaV04wYjNJZ0tHVnNaVzFsYm5Rc0lITmxiR1ZqZEc5eUtTQjdYRzRnSUhKbGRIVnliaUJ0WVhSamFDNWpZV3hzS0dWc1pXMWxiblFzSUhObGJHVmpkRzl5S1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnYm1WMlpYSWdLQ2tnZXlCeVpYUjFjbTRnWm1Gc2MyVTdJSDFjYmlKZGZRPT0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTZWxlY3Rpb247XG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGdldFNlbGVjdGlvblJhdyA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uUmF3Jyk7XG52YXIgZ2V0U2VsZWN0aW9uTnVsbE9wID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb25OdWxsT3AnKTtcbnZhciBnZXRTZWxlY3Rpb25TeW50aGV0aWMgPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvblN5bnRoZXRpYycpO1xudmFyIGlzSG9zdCA9IHJlcXVpcmUoJy4vaXNIb3N0Jyk7XG5pZiAoaXNIb3N0Lm1ldGhvZChnbG9iYWwsICdnZXRTZWxlY3Rpb24nKSkge1xuICBnZXRTZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb25SYXc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2Muc2VsZWN0aW9uID09PSAnb2JqZWN0JyAmJiBkb2Muc2VsZWN0aW9uKSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvblN5bnRoZXRpYztcbn0gZWxzZSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvbk51bGxPcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb247XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDJkbGRGTmxiR1ZqZEdsdmJpNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQm5aWFJUWld4bFkzUnBiMjQ3WEc1MllYSWdaRzlqSUQwZ1oyeHZZbUZzTG1SdlkzVnRaVzUwTzF4dWRtRnlJR2RsZEZObGJHVmpkR2x2YmxKaGR5QTlJSEpsY1hWcGNtVW9KeTR2WjJWMFUyVnNaV04wYVc5dVVtRjNKeWs3WEc1MllYSWdaMlYwVTJWc1pXTjBhVzl1VG5Wc2JFOXdJRDBnY21WeGRXbHlaU2duTGk5blpYUlRaV3hsWTNScGIyNU9kV3hzVDNBbktUdGNiblpoY2lCblpYUlRaV3hsWTNScGIyNVRlVzUwYUdWMGFXTWdQU0J5WlhGMWFYSmxLQ2N1TDJkbGRGTmxiR1ZqZEdsdmJsTjViblJvWlhScFl5Y3BPMXh1ZG1GeUlHbHpTRzl6ZENBOUlISmxjWFZwY21Vb0p5NHZhWE5JYjNOMEp5azdYRzVwWmlBb2FYTkliM04wTG0xbGRHaHZaQ2huYkc5aVlXd3NJQ2RuWlhSVFpXeGxZM1JwYjI0bktTa2dlMXh1SUNCblpYUlRaV3hsWTNScGIyNGdQU0JuWlhSVFpXeGxZM1JwYjI1U1lYYzdYRzU5SUdWc2MyVWdhV1lnS0hSNWNHVnZaaUJrYjJNdWMyVnNaV04wYVc5dUlEMDlQU0FuYjJKcVpXTjBKeUFtSmlCa2IyTXVjMlZzWldOMGFXOXVLU0I3WEc0Z0lHZGxkRk5sYkdWamRHbHZiaUE5SUdkbGRGTmxiR1ZqZEdsdmJsTjViblJvWlhScFl6dGNibjBnWld4elpTQjdYRzRnSUdkbGRGTmxiR1ZqZEdsdmJpQTlJR2RsZEZObGJHVmpkR2x2Yms1MWJHeFBjRHRjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm5aWFJUWld4bFkzUnBiMjQ3WEc0aVhYMD0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uTnVsbE9wICgpIHtcbiAgcmV0dXJuIHtcbiAgICByZW1vdmVBbGxSYW5nZXM6IG5vb3AsXG4gICAgYWRkUmFuZ2U6IG5vb3BcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb25OdWxsT3A7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGlvblJhdyAoKSB7XG4gIHJldHVybiBnbG9iYWwuZ2V0U2VsZWN0aW9uKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uUmF3O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld4bFkyTnBiMjR2YzNKakwyZGxkRk5sYkdWamRHbHZibEpoZHk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1bWRXNWpkR2x2YmlCblpYUlRaV3hsWTNScGIyNVNZWGNnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdaMnh2WW1Gc0xtZGxkRk5sYkdWamRHbHZiaWdwTzF4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR2RsZEZObGJHVmpkR2x2YmxKaGR6dGNiaUpkZlE9PSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHJhbmdlVG9UZXh0UmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlVG9UZXh0UmFuZ2UnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYm9keSA9IGRvYy5ib2R5O1xudmFyIEdldFNlbGVjdGlvblByb3RvID0gR2V0U2VsZWN0aW9uLnByb3RvdHlwZTtcblxuZnVuY3Rpb24gR2V0U2VsZWN0aW9uIChzZWxlY3Rpb24pIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgcmFuZ2UgPSBzZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcblxuICB0aGlzLl9zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gIHRoaXMuX3JhbmdlcyA9IFtdO1xuXG4gIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ0NvbnRyb2wnKSB7XG4gICAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbihzZWxmKTtcbiAgfSBlbHNlIGlmIChpc1RleHRSYW5nZShyYW5nZSkpIHtcbiAgICB1cGRhdGVGcm9tVGV4dFJhbmdlKHNlbGYsIHJhbmdlKTtcbiAgfSBlbHNlIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWxmKTtcbiAgfVxufVxuXG5HZXRTZWxlY3Rpb25Qcm90by5yZW1vdmVBbGxSYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0UmFuZ2U7XG4gIHRyeSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbi50eXBlICE9PSAnTm9uZScpIHtcbiAgICAgIHRleHRSYW5nZSA9IGJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICB0ZXh0UmFuZ2Uuc2VsZWN0KCk7XG4gICAgICB0aGlzLl9zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICB1cGRhdGVFbXB0eVNlbGVjdGlvbih0aGlzKTtcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmFkZFJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSA9PT0gJ0NvbnRyb2wnKSB7XG4gICAgYWRkUmFuZ2VUb0NvbnRyb2xTZWxlY3Rpb24odGhpcywgcmFuZ2UpO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlVG9UZXh0UmFuZ2UocmFuZ2UpLnNlbGVjdCgpO1xuICAgIHRoaXMuX3Jhbmdlc1swXSA9IHJhbmdlO1xuICAgIHRoaXMucmFuZ2VDb3VudCA9IDE7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRoaXMuX3Jhbmdlc1swXS5jb2xsYXBzZWQ7XG4gICAgdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2UodGhpcywgcmFuZ2UsIGZhbHNlKTtcbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uc2V0UmFuZ2VzID0gZnVuY3Rpb24gKHJhbmdlcykge1xuICB0aGlzLnJlbW92ZUFsbFJhbmdlcygpO1xuICB2YXIgcmFuZ2VDb3VudCA9IHJhbmdlcy5sZW5ndGg7XG4gIGlmIChyYW5nZUNvdW50ID4gMSkge1xuICAgIGNyZWF0ZUNvbnRyb2xTZWxlY3Rpb24odGhpcywgcmFuZ2VzKTtcbiAgfSBlbHNlIGlmIChyYW5nZUNvdW50KSB7XG4gICAgdGhpcy5hZGRSYW5nZShyYW5nZXNbMF0pO1xuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5nZXRSYW5nZUF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5yYW5nZUNvdW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRSYW5nZUF0KCk6IGluZGV4IG91dCBvZiBib3VuZHMnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2VzW2luZGV4XS5jbG9uZVJhbmdlKCk7XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLnJlbW92ZVJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gIGlmICh0aGlzLl9zZWxlY3Rpb24udHlwZSAhPT0gJ0NvbnRyb2wnKSB7XG4gICAgcmVtb3ZlUmFuZ2VNYW51YWxseSh0aGlzLCByYW5nZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjb250cm9sUmFuZ2UgPSB0aGlzLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHJhbmdlRWxlbWVudCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2UpO1xuICB2YXIgbmV3Q29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgdmFyIGVsO1xuICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gY29udHJvbFJhbmdlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgZWwgPSBjb250cm9sUmFuZ2UuaXRlbShpKTtcbiAgICBpZiAoZWwgIT09IHJhbmdlRWxlbWVudCB8fCByZW1vdmVkKSB7XG4gICAgICBuZXdDb250cm9sUmFuZ2UuYWRkKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfVxuICB9XG4gIG5ld0NvbnRyb2xSYW5nZS5zZWxlY3QoKTtcbiAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbih0aGlzKTtcbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmVhY2hSYW5nZSA9IGZ1bmN0aW9uIChmbiwgcmV0dXJuVmFsdWUpIHtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbGVuID0gdGhpcy5fcmFuZ2VzLmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGZuKHRoaXMuZ2V0UmFuZ2VBdChpKSkpIHtcbiAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmdldEFsbFJhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJhbmdlcyA9IFtdO1xuICB0aGlzLmVhY2hSYW5nZShmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICByYW5nZXMucHVzaChyYW5nZSk7XG4gIH0pO1xuICByZXR1cm4gcmFuZ2VzO1xufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uc2V0U2luZ2xlUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgdGhpcy5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgdGhpcy5hZGRSYW5nZShyYW5nZSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDb250cm9sU2VsZWN0aW9uIChzZWwsIHJhbmdlcykge1xuICB2YXIgY29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGVsLCBsZW4gPSByYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBlbCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2VzW2ldKTtcbiAgICB0cnkge1xuICAgICAgY29udHJvbFJhbmdlLmFkZChlbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRSYW5nZXMoKTogRWxlbWVudCBjb3VsZCBub3QgYmUgYWRkZWQgdG8gY29udHJvbCBzZWxlY3Rpb24nKTtcbiAgICB9XG4gIH1cbiAgY29udHJvbFJhbmdlLnNlbGVjdCgpO1xuICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHNlbCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJhbmdlTWFudWFsbHkgKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIHJhbmdlcyA9IHNlbC5nZXRBbGxSYW5nZXMoKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmFuZ2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKCFpc1NhbWVSYW5nZShyYW5nZSwgcmFuZ2VzW2ldKSkge1xuICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmICghc2VsLnJhbmdlQ291bnQpIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlIChzZWwsIHJhbmdlKSB7XG4gIHZhciBhbmNob3JQcmVmaXggPSAnc3RhcnQnO1xuICB2YXIgZm9jdXNQcmVmaXggPSAnZW5kJztcbiAgc2VsLmFuY2hvck5vZGUgPSByYW5nZVthbmNob3JQcmVmaXggKyAnQ29udGFpbmVyJ107XG4gIHNlbC5hbmNob3JPZmZzZXQgPSByYW5nZVthbmNob3JQcmVmaXggKyAnT2Zmc2V0J107XG4gIHNlbC5mb2N1c05vZGUgPSByYW5nZVtmb2N1c1ByZWZpeCArICdDb250YWluZXInXTtcbiAgc2VsLmZvY3VzT2Zmc2V0ID0gcmFuZ2VbZm9jdXNQcmVmaXggKyAnT2Zmc2V0J107XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUVtcHR5U2VsZWN0aW9uIChzZWwpIHtcbiAgc2VsLmFuY2hvck5vZGUgPSBzZWwuZm9jdXNOb2RlID0gbnVsbDtcbiAgc2VsLmFuY2hvck9mZnNldCA9IHNlbC5mb2N1c09mZnNldCA9IDA7XG4gIHNlbC5yYW5nZUNvdW50ID0gMDtcbiAgc2VsLmlzQ29sbGFwc2VkID0gdHJ1ZTtcbiAgc2VsLl9yYW5nZXMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gcmFuZ2VDb250YWluc1NpbmdsZUVsZW1lbnQgKHJhbmdlTm9kZXMpIHtcbiAgaWYgKCFyYW5nZU5vZGVzLmxlbmd0aCB8fCByYW5nZU5vZGVzWzBdLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAodmFyIGkgPSAxLCBsZW4gPSByYW5nZU5vZGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKCFpc0FuY2VzdG9yT2YocmFuZ2VOb2Rlc1swXSwgcmFuZ2VOb2Rlc1tpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UgKHJhbmdlKSB7XG4gIHZhciBub2RlcyA9IHJhbmdlLmdldE5vZGVzKCk7XG4gIGlmICghcmFuZ2VDb250YWluc1NpbmdsZUVsZW1lbnQobm9kZXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKCk6IHJhbmdlIGRpZCBub3QgY29uc2lzdCBvZiBhIHNpbmdsZSBlbGVtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIG5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBpc1RleHRSYW5nZSAocmFuZ2UpIHtcbiAgcmV0dXJuIHJhbmdlICYmIHJhbmdlLnRleHQgIT09IHZvaWQgMDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRnJvbVRleHRSYW5nZSAoc2VsLCByYW5nZSkge1xuICBzZWwuX3JhbmdlcyA9IFtyYW5nZV07XG4gIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlKHNlbCwgcmFuZ2UsIGZhbHNlKTtcbiAgc2VsLnJhbmdlQ291bnQgPSAxO1xuICBzZWwuaXNDb2xsYXBzZWQgPSByYW5nZS5jb2xsYXBzZWQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24gKHNlbCkge1xuICBzZWwuX3Jhbmdlcy5sZW5ndGggPSAwO1xuICBpZiAoc2VsLl9zZWxlY3Rpb24udHlwZSA9PT0gJ05vbmUnKSB7XG4gICAgdXBkYXRlRW1wdHlTZWxlY3Rpb24oc2VsKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY29udHJvbFJhbmdlID0gc2VsLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICBpZiAoaXNUZXh0UmFuZ2UoY29udHJvbFJhbmdlKSkge1xuICAgICAgdXBkYXRlRnJvbVRleHRSYW5nZShzZWwsIGNvbnRyb2xSYW5nZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbC5yYW5nZUNvdW50ID0gY29udHJvbFJhbmdlLmxlbmd0aDtcbiAgICAgIHZhciByYW5nZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsLnJhbmdlQ291bnQ7ICsraSkge1xuICAgICAgICByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgICAgICAgc2VsLl9yYW5nZXMucHVzaChyYW5nZSk7XG4gICAgICB9XG4gICAgICBzZWwuaXNDb2xsYXBzZWQgPSBzZWwucmFuZ2VDb3VudCA9PT0gMSAmJiBzZWwuX3Jhbmdlc1swXS5jb2xsYXBzZWQ7XG4gICAgICB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZShzZWwsIHNlbC5fcmFuZ2VzW3NlbC5yYW5nZUNvdW50IC0gMV0sIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkUmFuZ2VUb0NvbnRyb2xTZWxlY3Rpb24gKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIGNvbnRyb2xSYW5nZSA9IHNlbC5fc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gIHZhciByYW5nZUVsZW1lbnQgPSBnZXRTaW5nbGVFbGVtZW50RnJvbVJhbmdlKHJhbmdlKTtcbiAgdmFyIG5ld0NvbnRyb2xSYW5nZSA9IGJvZHkuY3JlYXRlQ29udHJvbFJhbmdlKCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjb250cm9sUmFuZ2UubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBuZXdDb250cm9sUmFuZ2UuYWRkKGNvbnRyb2xSYW5nZS5pdGVtKGkpKTtcbiAgfVxuICB0cnkge1xuICAgIG5ld0NvbnRyb2xSYW5nZS5hZGQocmFuZ2VFbGVtZW50KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignYWRkUmFuZ2UoKTogRWxlbWVudCBjb3VsZCBub3QgYmUgYWRkZWQgdG8gY29udHJvbCBzZWxlY3Rpb24nKTtcbiAgfVxuICBuZXdDb250cm9sUmFuZ2Uuc2VsZWN0KCk7XG4gIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24oc2VsKTtcbn1cblxuZnVuY3Rpb24gaXNTYW1lUmFuZ2UgKGxlZnQsIHJpZ2h0KSB7XG4gIHJldHVybiAoXG4gICAgbGVmdC5zdGFydENvbnRhaW5lciA9PT0gcmlnaHQuc3RhcnRDb250YWluZXIgJiZcbiAgICBsZWZ0LnN0YXJ0T2Zmc2V0ID09PSByaWdodC5zdGFydE9mZnNldCAmJlxuICAgIGxlZnQuZW5kQ29udGFpbmVyID09PSByaWdodC5lbmRDb250YWluZXIgJiZcbiAgICBsZWZ0LmVuZE9mZnNldCA9PT0gcmlnaHQuZW5kT2Zmc2V0XG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzQW5jZXN0b3JPZiAoYW5jZXN0b3IsIGRlc2NlbmRhbnQpIHtcbiAgdmFyIG5vZGUgPSBkZXNjZW5kYW50O1xuICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSA9PT0gYW5jZXN0b3IpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBHZXRTZWxlY3Rpb24oZ2xvYmFsLmRvY3VtZW50LnNlbGVjdGlvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2VsZWN0aW9uO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld4bFkyTnBiMjR2YzNKakwyZGxkRk5sYkdWamRHbHZibE41Ym5Sb1pYUnBZeTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2NtRnVaMlZVYjFSbGVIUlNZVzVuWlNBOUlISmxjWFZwY21Vb0p5NHZjbUZ1WjJWVWIxUmxlSFJTWVc1blpTY3BPMXh1ZG1GeUlHUnZZeUE5SUdkc2IySmhiQzVrYjJOMWJXVnVkRHRjYm5aaGNpQmliMlI1SUQwZ1pHOWpMbUp2WkhrN1hHNTJZWElnUjJWMFUyVnNaV04wYVc5dVVISnZkRzhnUFNCSFpYUlRaV3hsWTNScGIyNHVjSEp2ZEc5MGVYQmxPMXh1WEc1bWRXNWpkR2x2YmlCSFpYUlRaV3hsWTNScGIyNGdLSE5sYkdWamRHbHZiaWtnZTF4dUlDQjJZWElnYzJWc1ppQTlJSFJvYVhNN1hHNGdJSFpoY2lCeVlXNW5aU0E5SUhObGJHVmpkR2x2Ymk1amNtVmhkR1ZTWVc1blpTZ3BPMXh1WEc0Z0lIUm9hWE11WDNObGJHVmpkR2x2YmlBOUlITmxiR1ZqZEdsdmJqdGNiaUFnZEdocGN5NWZjbUZ1WjJWeklEMGdXMTA3WEc1Y2JpQWdhV1lnS0hObGJHVmpkR2x2Ymk1MGVYQmxJRDA5UFNBblEyOXVkSEp2YkNjcElIdGNiaUFnSUNCMWNHUmhkR1ZEYjI1MGNtOXNVMlZzWldOMGFXOXVLSE5sYkdZcE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0dselZHVjRkRkpoYm1kbEtISmhibWRsS1NrZ2UxeHVJQ0FnSUhWd1pHRjBaVVp5YjIxVVpYaDBVbUZ1WjJVb2MyVnNaaXdnY21GdVoyVXBPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSFZ3WkdGMFpVVnRjSFI1VTJWc1pXTjBhVzl1S0hObGJHWXBPMXh1SUNCOVhHNTlYRzVjYmtkbGRGTmxiR1ZqZEdsdmJsQnliM1J2TG5KbGJXOTJaVUZzYkZKaGJtZGxjeUE5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnZG1GeUlIUmxlSFJTWVc1blpUdGNiaUFnZEhKNUlIdGNiaUFnSUNCMGFHbHpMbDl6Wld4bFkzUnBiMjR1Wlcxd2RIa29LVHRjYmlBZ0lDQnBaaUFvZEdocGN5NWZjMlZzWldOMGFXOXVMblI1Y0dVZ0lUMDlJQ2RPYjI1bEp5a2dlMXh1SUNBZ0lDQWdkR1Y0ZEZKaGJtZGxJRDBnWW05a2VTNWpjbVZoZEdWVVpYaDBVbUZ1WjJVb0tUdGNiaUFnSUNBZ0lIUmxlSFJTWVc1blpTNXpaV3hsWTNRb0tUdGNiaUFnSUNBZ0lIUm9hWE11WDNObGJHVmpkR2x2Ymk1bGJYQjBlU2dwTzF4dUlDQWdJSDFjYmlBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNCOVhHNGdJSFZ3WkdGMFpVVnRjSFI1VTJWc1pXTjBhVzl1S0hSb2FYTXBPMXh1ZlR0Y2JseHVSMlYwVTJWc1pXTjBhVzl1VUhKdmRHOHVZV1JrVW1GdVoyVWdQU0JtZFc1amRHbHZiaUFvY21GdVoyVXBJSHRjYmlBZ2FXWWdLSFJvYVhNdVgzTmxiR1ZqZEdsdmJpNTBlWEJsSUQwOVBTQW5RMjl1ZEhKdmJDY3BJSHRjYmlBZ0lDQmhaR1JTWVc1blpWUnZRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpaDBhR2x6TENCeVlXNW5aU2s3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnY21GdVoyVlViMVJsZUhSU1lXNW5aU2h5WVc1blpTa3VjMlZzWldOMEtDazdYRzRnSUNBZ2RHaHBjeTVmY21GdVoyVnpXekJkSUQwZ2NtRnVaMlU3WEc0Z0lDQWdkR2hwY3k1eVlXNW5aVU52ZFc1MElEMGdNVHRjYmlBZ0lDQjBhR2x6TG1selEyOXNiR0Z3YzJWa0lEMGdkR2hwY3k1ZmNtRnVaMlZ6V3pCZExtTnZiR3hoY0hObFpEdGNiaUFnSUNCMWNHUmhkR1ZCYm1Ob2IzSkJibVJHYjJOMWMwWnliMjFTWVc1blpTaDBhR2x6TENCeVlXNW5aU3dnWm1Gc2MyVXBPMXh1SUNCOVhHNTlPMXh1WEc1SFpYUlRaV3hsWTNScGIyNVFjbTkwYnk1elpYUlNZVzVuWlhNZ1BTQm1kVzVqZEdsdmJpQW9jbUZ1WjJWektTQjdYRzRnSUhSb2FYTXVjbVZ0YjNabFFXeHNVbUZ1WjJWektDazdYRzRnSUhaaGNpQnlZVzVuWlVOdmRXNTBJRDBnY21GdVoyVnpMbXhsYm1kMGFEdGNiaUFnYVdZZ0tISmhibWRsUTI5MWJuUWdQaUF4S1NCN1hHNGdJQ0FnWTNKbFlYUmxRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpaDBhR2x6TENCeVlXNW5aWE1wTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLSEpoYm1kbFEyOTFiblFwSUh0Y2JpQWdJQ0IwYUdsekxtRmtaRkpoYm1kbEtISmhibWRsYzFzd1hTazdYRzRnSUgxY2JuMDdYRzVjYmtkbGRGTmxiR1ZqZEdsdmJsQnliM1J2TG1kbGRGSmhibWRsUVhRZ1BTQm1kVzVqZEdsdmJpQW9hVzVrWlhncElIdGNiaUFnYVdZZ0tHbHVaR1Y0SUR3Z01DQjhmQ0JwYm1SbGVDQStQU0IwYUdsekxuSmhibWRsUTI5MWJuUXBJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oyZGxkRkpoYm1kbFFYUW9LVG9nYVc1a1pYZ2diM1YwSUc5bUlHSnZkVzVrY3ljcE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpMbDl5WVc1blpYTmJhVzVrWlhoZExtTnNiMjVsVW1GdVoyVW9LVHRjYmlBZ2ZWeHVmVHRjYmx4dVIyVjBVMlZzWldOMGFXOXVVSEp2ZEc4dWNtVnRiM1psVW1GdVoyVWdQU0JtZFc1amRHbHZiaUFvY21GdVoyVXBJSHRjYmlBZ2FXWWdLSFJvYVhNdVgzTmxiR1ZqZEdsdmJpNTBlWEJsSUNFOVBTQW5RMjl1ZEhKdmJDY3BJSHRjYmlBZ0lDQnlaVzF2ZG1WU1lXNW5aVTFoYm5WaGJHeDVLSFJvYVhNc0lISmhibWRsS1R0Y2JpQWdJQ0J5WlhSMWNtNDdYRzRnSUgxY2JpQWdkbUZ5SUdOdmJuUnliMnhTWVc1blpTQTlJSFJvYVhNdVgzTmxiR1ZqZEdsdmJpNWpjbVZoZEdWU1lXNW5aU2dwTzF4dUlDQjJZWElnY21GdVoyVkZiR1Z0Wlc1MElEMGdaMlYwVTJsdVoyeGxSV3hsYldWdWRFWnliMjFTWVc1blpTaHlZVzVuWlNrN1hHNGdJSFpoY2lCdVpYZERiMjUwY205c1VtRnVaMlVnUFNCaWIyUjVMbU55WldGMFpVTnZiblJ5YjJ4U1lXNW5aU2dwTzF4dUlDQjJZWElnWld3N1hHNGdJSFpoY2lCeVpXMXZkbVZrSUQwZ1ptRnNjMlU3WEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3TENCc1pXNGdQU0JqYjI1MGNtOXNVbUZ1WjJVdWJHVnVaM1JvT3lCcElEd2diR1Z1T3lBcksya3BJSHRjYmlBZ0lDQmxiQ0E5SUdOdmJuUnliMnhTWVc1blpTNXBkR1Z0S0drcE8xeHVJQ0FnSUdsbUlDaGxiQ0FoUFQwZ2NtRnVaMlZGYkdWdFpXNTBJSHg4SUhKbGJXOTJaV1FwSUh0Y2JpQWdJQ0FnSUc1bGQwTnZiblJ5YjJ4U1lXNW5aUzVoWkdRb1kyOXVkSEp2YkZKaGJtZGxMbWwwWlcwb2FTa3BPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCeVpXMXZkbVZrSUQwZ2RISjFaVHRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdibVYzUTI5dWRISnZiRkpoYm1kbExuTmxiR1ZqZENncE8xeHVJQ0IxY0dSaGRHVkRiMjUwY205c1UyVnNaV04wYVc5dUtIUm9hWE1wTzF4dWZUdGNibHh1UjJWMFUyVnNaV04wYVc5dVVISnZkRzh1WldGamFGSmhibWRsSUQwZ1puVnVZM1JwYjI0Z0tHWnVMQ0J5WlhSMWNtNVdZV3gxWlNrZ2UxeHVJQ0IyWVhJZ2FTQTlJREE3WEc0Z0lIWmhjaUJzWlc0Z1BTQjBhR2x6TGw5eVlXNW5aWE11YkdWdVozUm9PMXh1SUNCbWIzSWdLR2tnUFNBd095QnBJRHdnYkdWdU95QXJLMmtwSUh0Y2JpQWdJQ0JwWmlBb1ptNG9kR2hwY3k1blpYUlNZVzVuWlVGMEtHa3BLU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSEpsZEhWeWJsWmhiSFZsTzF4dUlDQWdJSDFjYmlBZ2ZWeHVmVHRjYmx4dVIyVjBVMlZzWldOMGFXOXVVSEp2ZEc4dVoyVjBRV3hzVW1GdVoyVnpJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0IyWVhJZ2NtRnVaMlZ6SUQwZ1cxMDdYRzRnSUhSb2FYTXVaV0ZqYUZKaGJtZGxLR1oxYm1OMGFXOXVJQ2h5WVc1blpTa2dlMXh1SUNBZ0lISmhibWRsY3k1d2RYTm9LSEpoYm1kbEtUdGNiaUFnZlNrN1hHNGdJSEpsZEhWeWJpQnlZVzVuWlhNN1hHNTlPMXh1WEc1SFpYUlRaV3hsWTNScGIyNVFjbTkwYnk1elpYUlRhVzVuYkdWU1lXNW5aU0E5SUdaMWJtTjBhVzl1SUNoeVlXNW5aU2tnZTF4dUlDQjBhR2x6TG5KbGJXOTJaVUZzYkZKaGJtZGxjeWdwTzF4dUlDQjBhR2x6TG1Ga1pGSmhibWRsS0hKaGJtZGxLVHRjYm4wN1hHNWNibVoxYm1OMGFXOXVJR055WldGMFpVTnZiblJ5YjJ4VFpXeGxZM1JwYjI0Z0tITmxiQ3dnY21GdVoyVnpLU0I3WEc0Z0lIWmhjaUJqYjI1MGNtOXNVbUZ1WjJVZ1BTQmliMlI1TG1OeVpXRjBaVU52Ym5SeWIyeFNZVzVuWlNncE8xeHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Dd2daV3dzSUd4bGJpQTlJSEpoYm1kbGN5NXNaVzVuZEdnN0lHa2dQQ0JzWlc0N0lDc3JhU2tnZTF4dUlDQWdJR1ZzSUQwZ1oyVjBVMmx1WjJ4bFJXeGxiV1Z1ZEVaeWIyMVNZVzVuWlNoeVlXNW5aWE5iYVYwcE8xeHVJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQmpiMjUwY205c1VtRnVaMlV1WVdSa0tHVnNLVHRjYmlBZ0lDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KM05sZEZKaGJtZGxjeWdwT2lCRmJHVnRaVzUwSUdOdmRXeGtJRzV2ZENCaVpTQmhaR1JsWkNCMGJ5QmpiMjUwY205c0lITmxiR1ZqZEdsdmJpY3BPMXh1SUNBZ0lIMWNiaUFnZlZ4dUlDQmpiMjUwY205c1VtRnVaMlV1YzJWc1pXTjBLQ2s3WEc0Z0lIVndaR0YwWlVOdmJuUnliMnhUWld4bFkzUnBiMjRvYzJWc0tUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2NtVnRiM1psVW1GdVoyVk5ZVzUxWVd4c2VTQW9jMlZzTENCeVlXNW5aU2tnZTF4dUlDQjJZWElnY21GdVoyVnpJRDBnYzJWc0xtZGxkRUZzYkZKaGJtZGxjeWdwTzF4dUlDQnpaV3d1Y21WdGIzWmxRV3hzVW1GdVoyVnpLQ2s3WEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3TENCc1pXNGdQU0J5WVc1blpYTXViR1Z1WjNSb095QnBJRHdnYkdWdU95QXJLMmtwSUh0Y2JpQWdJQ0JwWmlBb0lXbHpVMkZ0WlZKaGJtZGxLSEpoYm1kbExDQnlZVzVuWlhOYmFWMHBLU0I3WEc0Z0lDQWdJQ0J6Wld3dVlXUmtVbUZ1WjJVb2NtRnVaMlZ6VzJsZEtUdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2FXWWdLQ0Z6Wld3dWNtRnVaMlZEYjNWdWRDa2dlMXh1SUNBZ0lIVndaR0YwWlVWdGNIUjVVMlZzWldOMGFXOXVLSE5sYkNrN1hHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdkWEJrWVhSbFFXNWphRzl5UVc1a1JtOWpkWE5HY205dFVtRnVaMlVnS0hObGJDd2djbUZ1WjJVcElIdGNiaUFnZG1GeUlHRnVZMmh2Y2xCeVpXWnBlQ0E5SUNkemRHRnlkQ2M3WEc0Z0lIWmhjaUJtYjJOMWMxQnlaV1pwZUNBOUlDZGxibVFuTzF4dUlDQnpaV3d1WVc1amFHOXlUbTlrWlNBOUlISmhibWRsVzJGdVkyaHZjbEJ5WldacGVDQXJJQ2REYjI1MFlXbHVaWEluWFR0Y2JpQWdjMlZzTG1GdVkyaHZjazltWm5ObGRDQTlJSEpoYm1kbFcyRnVZMmh2Y2xCeVpXWnBlQ0FySUNkUFptWnpaWFFuWFR0Y2JpQWdjMlZzTG1adlkzVnpUbTlrWlNBOUlISmhibWRsVzJadlkzVnpVSEpsWm1sNElDc2dKME52Ym5SaGFXNWxjaWRkTzF4dUlDQnpaV3d1Wm05amRYTlBabVp6WlhRZ1BTQnlZVzVuWlZ0bWIyTjFjMUJ5WldacGVDQXJJQ2RQWm1aelpYUW5YVHRjYm4xY2JseHVablZ1WTNScGIyNGdkWEJrWVhSbFJXMXdkSGxUWld4bFkzUnBiMjRnS0hObGJDa2dlMXh1SUNCelpXd3VZVzVqYUc5eVRtOWtaU0E5SUhObGJDNW1iMk4xYzA1dlpHVWdQU0J1ZFd4c08xeHVJQ0J6Wld3dVlXNWphRzl5VDJabWMyVjBJRDBnYzJWc0xtWnZZM1Z6VDJabWMyVjBJRDBnTUR0Y2JpQWdjMlZzTG5KaGJtZGxRMjkxYm5RZ1BTQXdPMXh1SUNCelpXd3VhWE5EYjJ4c1lYQnpaV1FnUFNCMGNuVmxPMXh1SUNCelpXd3VYM0poYm1kbGN5NXNaVzVuZEdnZ1BTQXdPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlZVzVuWlVOdmJuUmhhVzV6VTJsdVoyeGxSV3hsYldWdWRDQW9jbUZ1WjJWT2IyUmxjeWtnZTF4dUlDQnBaaUFvSVhKaGJtZGxUbTlrWlhNdWJHVnVaM1JvSUh4OElISmhibWRsVG05a1pYTmJNRjB1Ym05a1pWUjVjR1VnSVQwOUlERXBJSHRjYmlBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lIMWNiaUFnWm05eUlDaDJZWElnYVNBOUlERXNJR3hsYmlBOUlISmhibWRsVG05a1pYTXViR1Z1WjNSb095QnBJRHdnYkdWdU95QXJLMmtwSUh0Y2JpQWdJQ0JwWmlBb0lXbHpRVzVqWlhOMGIzSlBaaWh5WVc1blpVNXZaR1Z6V3pCZExDQnlZVzVuWlU1dlpHVnpXMmxkS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lIMWNiaUFnZlZ4dUlDQnlaWFIxY200Z2RISjFaVHRjYm4xY2JseHVablZ1WTNScGIyNGdaMlYwVTJsdVoyeGxSV3hsYldWdWRFWnliMjFTWVc1blpTQW9jbUZ1WjJVcElIdGNiaUFnZG1GeUlHNXZaR1Z6SUQwZ2NtRnVaMlV1WjJWMFRtOWtaWE1vS1R0Y2JpQWdhV1lnS0NGeVlXNW5aVU52Ym5SaGFXNXpVMmx1WjJ4bFJXeGxiV1Z1ZENodWIyUmxjeWtwSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMmRsZEZOcGJtZHNaVVZzWlcxbGJuUkdjbTl0VW1GdVoyVW9LVG9nY21GdVoyVWdaR2xrSUc1dmRDQmpiMjV6YVhOMElHOW1JR0VnYzJsdVoyeGxJR1ZzWlcxbGJuUW5LVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdibTlrWlhOYk1GMDdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHbHpWR1Y0ZEZKaGJtZGxJQ2h5WVc1blpTa2dlMXh1SUNCeVpYUjFjbTRnY21GdVoyVWdKaVlnY21GdVoyVXVkR1Y0ZENBaFBUMGdkbTlwWkNBd08xeHVmVnh1WEc1bWRXNWpkR2x2YmlCMWNHUmhkR1ZHY205dFZHVjRkRkpoYm1kbElDaHpaV3dzSUhKaGJtZGxLU0I3WEc0Z0lITmxiQzVmY21GdVoyVnpJRDBnVzNKaGJtZGxYVHRjYmlBZ2RYQmtZWFJsUVc1amFHOXlRVzVrUm05amRYTkdjbTl0VW1GdVoyVW9jMlZzTENCeVlXNW5aU3dnWm1Gc2MyVXBPMXh1SUNCelpXd3VjbUZ1WjJWRGIzVnVkQ0E5SURFN1hHNGdJSE5sYkM1cGMwTnZiR3hoY0hObFpDQTlJSEpoYm1kbExtTnZiR3hoY0hObFpEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2RYQmtZWFJsUTI5dWRISnZiRk5sYkdWamRHbHZiaUFvYzJWc0tTQjdYRzRnSUhObGJDNWZjbUZ1WjJWekxteGxibWQwYUNBOUlEQTdYRzRnSUdsbUlDaHpaV3d1WDNObGJHVmpkR2x2Ymk1MGVYQmxJRDA5UFNBblRtOXVaU2NwSUh0Y2JpQWdJQ0IxY0dSaGRHVkZiWEIwZVZObGJHVmpkR2x2YmloelpXd3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSFpoY2lCamIyNTBjbTlzVW1GdVoyVWdQU0J6Wld3dVgzTmxiR1ZqZEdsdmJpNWpjbVZoZEdWU1lXNW5aU2dwTzF4dUlDQWdJR2xtSUNocGMxUmxlSFJTWVc1blpTaGpiMjUwY205c1VtRnVaMlVwS1NCN1hHNGdJQ0FnSUNCMWNHUmhkR1ZHY205dFZHVjRkRkpoYm1kbEtITmxiQ3dnWTI5dWRISnZiRkpoYm1kbEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnYzJWc0xuSmhibWRsUTI5MWJuUWdQU0JqYjI1MGNtOXNVbUZ1WjJVdWJHVnVaM1JvTzF4dUlDQWdJQ0FnZG1GeUlISmhibWRsTzF4dUlDQWdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCelpXd3VjbUZ1WjJWRGIzVnVkRHNnS3l0cEtTQjdYRzRnSUNBZ0lDQWdJSEpoYm1kbElEMGdaRzlqTG1OeVpXRjBaVkpoYm1kbEtDazdYRzRnSUNBZ0lDQWdJSEpoYm1kbExuTmxiR1ZqZEU1dlpHVW9ZMjl1ZEhKdmJGSmhibWRsTG1sMFpXMG9hU2twTzF4dUlDQWdJQ0FnSUNCelpXd3VYM0poYm1kbGN5NXdkWE5vS0hKaGJtZGxLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJSE5sYkM1cGMwTnZiR3hoY0hObFpDQTlJSE5sYkM1eVlXNW5aVU52ZFc1MElEMDlQU0F4SUNZbUlITmxiQzVmY21GdVoyVnpXekJkTG1OdmJHeGhjSE5sWkR0Y2JpQWdJQ0FnSUhWd1pHRjBaVUZ1WTJodmNrRnVaRVp2WTNWelJuSnZiVkpoYm1kbEtITmxiQ3dnYzJWc0xsOXlZVzVuWlhOYmMyVnNMbkpoYm1kbFEyOTFiblFnTFNBeFhTd2dabUZzYzJVcE8xeHVJQ0FnSUgxY2JpQWdmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmhaR1JTWVc1blpWUnZRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpQW9jMlZzTENCeVlXNW5aU2tnZTF4dUlDQjJZWElnWTI5dWRISnZiRkpoYm1kbElEMGdjMlZzTGw5elpXeGxZM1JwYjI0dVkzSmxZWFJsVW1GdVoyVW9LVHRjYmlBZ2RtRnlJSEpoYm1kbFJXeGxiV1Z1ZENBOUlHZGxkRk5wYm1kc1pVVnNaVzFsYm5SR2NtOXRVbUZ1WjJVb2NtRnVaMlVwTzF4dUlDQjJZWElnYm1WM1EyOXVkSEp2YkZKaGJtZGxJRDBnWW05a2VTNWpjbVZoZEdWRGIyNTBjbTlzVW1GdVoyVW9LVHRjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREFzSUd4bGJpQTlJR052Ym5SeWIyeFNZVzVuWlM1c1pXNW5kR2c3SUdrZ1BDQnNaVzQ3SUNzcmFTa2dlMXh1SUNBZ0lHNWxkME52Ym5SeWIyeFNZVzVuWlM1aFpHUW9ZMjl1ZEhKdmJGSmhibWRsTG1sMFpXMG9hU2twTzF4dUlDQjlYRzRnSUhSeWVTQjdYRzRnSUNBZ2JtVjNRMjl1ZEhKdmJGSmhibWRsTG1Ga1pDaHlZVzVuWlVWc1pXMWxiblFwTzF4dUlDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZGhaR1JTWVc1blpTZ3BPaUJGYkdWdFpXNTBJR052ZFd4a0lHNXZkQ0JpWlNCaFpHUmxaQ0IwYnlCamIyNTBjbTlzSUhObGJHVmpkR2x2YmljcE8xeHVJQ0I5WEc0Z0lHNWxkME52Ym5SeWIyeFNZVzVuWlM1elpXeGxZM1FvS1R0Y2JpQWdkWEJrWVhSbFEyOXVkSEp2YkZObGJHVmpkR2x2YmloelpXd3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnBjMU5oYldWU1lXNW5aU0FvYkdWbWRDd2djbWxuYUhRcElIdGNiaUFnY21WMGRYSnVJQ2hjYmlBZ0lDQnNaV1owTG5OMFlYSjBRMjl1ZEdGcGJtVnlJRDA5UFNCeWFXZG9kQzV6ZEdGeWRFTnZiblJoYVc1bGNpQW1KbHh1SUNBZ0lHeGxablF1YzNSaGNuUlBabVp6WlhRZ1BUMDlJSEpwWjJoMExuTjBZWEowVDJabWMyVjBJQ1ltWEc0Z0lDQWdiR1ZtZEM1bGJtUkRiMjUwWVdsdVpYSWdQVDA5SUhKcFoyaDBMbVZ1WkVOdmJuUmhhVzVsY2lBbUpseHVJQ0FnSUd4bFpuUXVaVzVrVDJabWMyVjBJRDA5UFNCeWFXZG9kQzVsYm1SUFptWnpaWFJjYmlBZ0tUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2FYTkJibU5sYzNSdmNrOW1JQ2hoYm1ObGMzUnZjaXdnWkdWelkyVnVaR0Z1ZENrZ2UxeHVJQ0IyWVhJZ2JtOWtaU0E5SUdSbGMyTmxibVJoYm5RN1hHNGdJSGRvYVd4bElDaHViMlJsTG5CaGNtVnVkRTV2WkdVcElIdGNiaUFnSUNCcFppQW9ibTlrWlM1d1lYSmxiblJPYjJSbElEMDlQU0JoYm1ObGMzUnZjaWtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSFJ5ZFdVN1hHNGdJQ0FnZlZ4dUlDQWdJRzV2WkdVZ1BTQnViMlJsTG5CaGNtVnVkRTV2WkdVN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUdaaGJITmxPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQm5aWFJUWld4bFkzUnBiMjRnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdibVYzSUVkbGRGTmxiR1ZqZEdsdmJpaG5iRzlpWVd3dVpHOWpkVzFsYm5RdWMyVnNaV04wYVc5dUtUdGNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCblpYUlRaV3hsWTNScGIyNDdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaXNIb3N0TWV0aG9kIChob3N0LCBwcm9wKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGhvc3RbcHJvcF07XG4gIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8ICEhKHR5cGUgPT09ICdvYmplY3QnICYmIGhvc3RbcHJvcF0pIHx8IHR5cGUgPT09ICd1bmtub3duJztcbn1cblxuZnVuY3Rpb24gaXNIb3N0UHJvcGVydHkgKGhvc3QsIHByb3ApIHtcbiAgcmV0dXJuIHR5cGVvZiBob3N0W3Byb3BdICE9PSAndW5kZWZpbmVkJztcbn1cblxuZnVuY3Rpb24gbWFueSAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGFyZUhvc3RlZCAoaG9zdCwgcHJvcHMpIHtcbiAgICB2YXIgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoIWZuKGhvc3QsIHByb3BzW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0aG9kOiBpc0hvc3RNZXRob2QsXG4gIG1ldGhvZHM6IG1hbnkoaXNIb3N0TWV0aG9kKSxcbiAgcHJvcGVydHk6IGlzSG9zdFByb3BlcnR5LFxuICBwcm9wZXJ0aWVzOiBtYW55KGlzSG9zdFByb3BlcnR5KVxufTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBib2R5ID0gZG9jLmJvZHk7XG5cbmZ1bmN0aW9uIHJhbmdlVG9UZXh0UmFuZ2UgKHApIHtcbiAgaWYgKHAuY29sbGFwc2VkKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlKHsgbm9kZTogcC5zdGFydENvbnRhaW5lciwgb2Zmc2V0OiBwLnN0YXJ0T2Zmc2V0IH0sIHRydWUpO1xuICB9XG4gIHZhciBzdGFydFJhbmdlID0gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiBwLnN0YXJ0Q29udGFpbmVyLCBvZmZzZXQ6IHAuc3RhcnRPZmZzZXQgfSwgdHJ1ZSk7XG4gIHZhciBlbmRSYW5nZSA9IGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlKHsgbm9kZTogcC5lbmRDb250YWluZXIsIG9mZnNldDogcC5lbmRPZmZzZXQgfSwgZmFsc2UpO1xuICB2YXIgdGV4dFJhbmdlID0gYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgdGV4dFJhbmdlLnNldEVuZFBvaW50KCdTdGFydFRvU3RhcnQnLCBzdGFydFJhbmdlKTtcbiAgdGV4dFJhbmdlLnNldEVuZFBvaW50KCdFbmRUb0VuZCcsIGVuZFJhbmdlKTtcbiAgcmV0dXJuIHRleHRSYW5nZTtcbn1cblxuZnVuY3Rpb24gaXNDaGFyYWN0ZXJEYXRhTm9kZSAobm9kZSkge1xuICB2YXIgdCA9IG5vZGUubm9kZVR5cGU7XG4gIHJldHVybiB0ID09PSAzIHx8IHQgPT09IDQgfHwgdCA9PT0gOCA7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvdW5kYXJ5VGV4dFJhbmdlIChwLCBzdGFydGluZykge1xuICB2YXIgYm91bmQ7XG4gIHZhciBwYXJlbnQ7XG4gIHZhciBvZmZzZXQgPSBwLm9mZnNldDtcbiAgdmFyIHdvcmtpbmdOb2RlO1xuICB2YXIgY2hpbGROb2RlcztcbiAgdmFyIHJhbmdlID0gYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgdmFyIGRhdGEgPSBpc0NoYXJhY3RlckRhdGFOb2RlKHAubm9kZSk7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICBib3VuZCA9IHAubm9kZTtcbiAgICBwYXJlbnQgPSBib3VuZC5wYXJlbnROb2RlO1xuICB9IGVsc2Uge1xuICAgIGNoaWxkTm9kZXMgPSBwLm5vZGUuY2hpbGROb2RlcztcbiAgICBib3VuZCA9IG9mZnNldCA8IGNoaWxkTm9kZXMubGVuZ3RoID8gY2hpbGROb2Rlc1tvZmZzZXRdIDogbnVsbDtcbiAgICBwYXJlbnQgPSBwLm5vZGU7XG4gIH1cblxuICB3b3JraW5nTm9kZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHdvcmtpbmdOb2RlLmlubmVySFRNTCA9ICcmI2ZlZmY7JztcblxuICBpZiAoYm91bmQpIHtcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHdvcmtpbmdOb2RlLCBib3VuZCk7XG4gIH0gZWxzZSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHdvcmtpbmdOb2RlKTtcbiAgfVxuXG4gIHJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KHdvcmtpbmdOb2RlKTtcbiAgcmFuZ2UuY29sbGFwc2UoIXN0YXJ0aW5nKTtcbiAgcGFyZW50LnJlbW92ZUNoaWxkKHdvcmtpbmdOb2RlKTtcblxuICBpZiAoZGF0YSkge1xuICAgIHJhbmdlW3N0YXJ0aW5nID8gJ21vdmVTdGFydCcgOiAnbW92ZUVuZCddKCdjaGFyYWN0ZXInLCBvZmZzZXQpO1xuICB9XG4gIHJldHVybiByYW5nZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByYW5nZVRvVGV4dFJhbmdlO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld4bFkyTnBiMjR2YzNKakwzSmhibWRsVkc5VVpYaDBVbUZ1WjJVdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCa2IyTWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzUyWVhJZ1ltOWtlU0E5SUdSdll5NWliMlI1TzF4dVhHNW1kVzVqZEdsdmJpQnlZVzVuWlZSdlZHVjRkRkpoYm1kbElDaHdLU0I3WEc0Z0lHbG1JQ2h3TG1OdmJHeGhjSE5sWkNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJqY21WaGRHVkNiM1Z1WkdGeWVWUmxlSFJTWVc1blpTaDdJRzV2WkdVNklIQXVjM1JoY25SRGIyNTBZV2x1WlhJc0lHOW1abk5sZERvZ2NDNXpkR0Z5ZEU5bVpuTmxkQ0I5TENCMGNuVmxLVHRjYmlBZ2ZWeHVJQ0IyWVhJZ2MzUmhjblJTWVc1blpTQTlJR055WldGMFpVSnZkVzVrWVhKNVZHVjRkRkpoYm1kbEtIc2dibTlrWlRvZ2NDNXpkR0Z5ZEVOdmJuUmhhVzVsY2l3Z2IyWm1jMlYwT2lCd0xuTjBZWEowVDJabWMyVjBJSDBzSUhSeWRXVXBPMXh1SUNCMllYSWdaVzVrVW1GdVoyVWdQU0JqY21WaGRHVkNiM1Z1WkdGeWVWUmxlSFJTWVc1blpTaDdJRzV2WkdVNklIQXVaVzVrUTI5dWRHRnBibVZ5TENCdlptWnpaWFE2SUhBdVpXNWtUMlptYzJWMElIMHNJR1poYkhObEtUdGNiaUFnZG1GeUlIUmxlSFJTWVc1blpTQTlJR0p2WkhrdVkzSmxZWFJsVkdWNGRGSmhibWRsS0NrN1hHNGdJSFJsZUhSU1lXNW5aUzV6WlhSRmJtUlFiMmx1ZENnblUzUmhjblJVYjFOMFlYSjBKeXdnYzNSaGNuUlNZVzVuWlNrN1hHNGdJSFJsZUhSU1lXNW5aUzV6WlhSRmJtUlFiMmx1ZENnblJXNWtWRzlGYm1RbkxDQmxibVJTWVc1blpTazdYRzRnSUhKbGRIVnliaUIwWlhoMFVtRnVaMlU3WEc1OVhHNWNibVoxYm1OMGFXOXVJR2x6UTJoaGNtRmpkR1Z5UkdGMFlVNXZaR1VnS0c1dlpHVXBJSHRjYmlBZ2RtRnlJSFFnUFNCdWIyUmxMbTV2WkdWVWVYQmxPMXh1SUNCeVpYUjFjbTRnZENBOVBUMGdNeUI4ZkNCMElEMDlQU0EwSUh4OElIUWdQVDA5SURnZ08xeHVmVnh1WEc1bWRXNWpkR2x2YmlCamNtVmhkR1ZDYjNWdVpHRnllVlJsZUhSU1lXNW5aU0FvY0N3Z2MzUmhjblJwYm1jcElIdGNiaUFnZG1GeUlHSnZkVzVrTzF4dUlDQjJZWElnY0dGeVpXNTBPMXh1SUNCMllYSWdiMlptYzJWMElEMGdjQzV2Wm1aelpYUTdYRzRnSUhaaGNpQjNiM0pyYVc1blRtOWtaVHRjYmlBZ2RtRnlJR05vYVd4a1RtOWtaWE03WEc0Z0lIWmhjaUJ5WVc1blpTQTlJR0p2WkhrdVkzSmxZWFJsVkdWNGRGSmhibWRsS0NrN1hHNGdJSFpoY2lCa1lYUmhJRDBnYVhORGFHRnlZV04wWlhKRVlYUmhUbTlrWlNod0xtNXZaR1VwTzF4dVhHNGdJR2xtSUNoa1lYUmhLU0I3WEc0Z0lDQWdZbTkxYm1RZ1BTQndMbTV2WkdVN1hHNGdJQ0FnY0dGeVpXNTBJRDBnWW05MWJtUXVjR0Z5Wlc1MFRtOWtaVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JqYUdsc1pFNXZaR1Z6SUQwZ2NDNXViMlJsTG1Ob2FXeGtUbTlrWlhNN1hHNGdJQ0FnWW05MWJtUWdQU0J2Wm1aelpYUWdQQ0JqYUdsc1pFNXZaR1Z6TG14bGJtZDBhQ0EvSUdOb2FXeGtUbTlrWlhOYmIyWm1jMlYwWFNBNklHNTFiR3c3WEc0Z0lDQWdjR0Z5Wlc1MElEMGdjQzV1YjJSbE8xeHVJQ0I5WEc1Y2JpQWdkMjl5YTJsdVowNXZaR1VnUFNCa2IyTXVZM0psWVhSbFJXeGxiV1Z1ZENnbmMzQmhiaWNwTzF4dUlDQjNiM0pyYVc1blRtOWtaUzVwYm01bGNraFVUVXdnUFNBbkppTm1aV1ptT3ljN1hHNWNiaUFnYVdZZ0tHSnZkVzVrS1NCN1hHNGdJQ0FnY0dGeVpXNTBMbWx1YzJWeWRFSmxabTl5WlNoM2IzSnJhVzVuVG05a1pTd2dZbTkxYm1RcE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lIQmhjbVZ1ZEM1aGNIQmxibVJEYUdsc1pDaDNiM0pyYVc1blRtOWtaU2s3WEc0Z0lIMWNibHh1SUNCeVlXNW5aUzV0YjNabFZHOUZiR1Z0Wlc1MFZHVjRkQ2gzYjNKcmFXNW5UbTlrWlNrN1hHNGdJSEpoYm1kbExtTnZiR3hoY0hObEtDRnpkR0Z5ZEdsdVp5azdYRzRnSUhCaGNtVnVkQzV5WlcxdmRtVkRhR2xzWkNoM2IzSnJhVzVuVG05a1pTazdYRzVjYmlBZ2FXWWdLR1JoZEdFcElIdGNiaUFnSUNCeVlXNW5aVnR6ZEdGeWRHbHVaeUEvSUNkdGIzWmxVM1JoY25RbklEb2dKMjF2ZG1WRmJtUW5YU2duWTJoaGNtRmpkR1Z5Snl3Z2IyWm1jMlYwS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnY21GdVoyVTdYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2NtRnVaMlZVYjFSbGVIUlNZVzVuWlR0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0U2VsZWN0aW9uID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb24nKTtcbnZhciBzZXRTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3NldFNlbGVjdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0OiBnZXRTZWxlY3Rpb24sXG4gIHNldDogc2V0U2VsZWN0aW9uXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0U2VsZWN0aW9uID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb24nKTtcbnZhciByYW5nZVRvVGV4dFJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZVRvVGV4dFJhbmdlJyk7XG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuXG5mdW5jdGlvbiBzZXRTZWxlY3Rpb24gKHApIHtcbiAgaWYgKGRvYy5jcmVhdGVSYW5nZSkge1xuICAgIG1vZGVyblNlbGVjdGlvbigpO1xuICB9IGVsc2Uge1xuICAgIG9sZFNlbGVjdGlvbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW9kZXJuU2VsZWN0aW9uICgpIHtcbiAgICB2YXIgc2VsID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgdmFyIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgaWYgKCFwLnN0YXJ0Q29udGFpbmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChwLmVuZENvbnRhaW5lcikge1xuICAgICAgcmFuZ2Uuc2V0RW5kKHAuZW5kQ29udGFpbmVyLCBwLmVuZE9mZnNldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlLnNldEVuZChwLnN0YXJ0Q29udGFpbmVyLCBwLnN0YXJ0T2Zmc2V0KTtcbiAgICB9XG4gICAgcmFuZ2Uuc2V0U3RhcnQocC5zdGFydENvbnRhaW5lciwgcC5zdGFydE9mZnNldCk7XG4gICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbGRTZWxlY3Rpb24gKCkge1xuICAgIHJhbmdlVG9UZXh0UmFuZ2UocCkuc2VsZWN0KCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRTZWxlY3Rpb247XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDNObGRGTmxiR1ZqZEdsdmJpNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQm5aWFJUWld4bFkzUnBiMjRnUFNCeVpYRjFhWEpsS0NjdUwyZGxkRk5sYkdWamRHbHZiaWNwTzF4dWRtRnlJSEpoYm1kbFZHOVVaWGgwVW1GdVoyVWdQU0J5WlhGMWFYSmxLQ2N1TDNKaGJtZGxWRzlVWlhoMFVtRnVaMlVuS1R0Y2JuWmhjaUJrYjJNZ1BTQm5iRzlpWVd3dVpHOWpkVzFsYm5RN1hHNWNibVoxYm1OMGFXOXVJSE5sZEZObGJHVmpkR2x2YmlBb2NDa2dlMXh1SUNCcFppQW9aRzlqTG1OeVpXRjBaVkpoYm1kbEtTQjdYRzRnSUNBZ2JXOWtaWEp1VTJWc1pXTjBhVzl1S0NrN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2IyeGtVMlZzWldOMGFXOXVLQ2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCdGIyUmxjbTVUWld4bFkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUhaaGNpQnpaV3dnUFNCblpYUlRaV3hsWTNScGIyNG9LVHRjYmlBZ0lDQjJZWElnY21GdVoyVWdQU0JrYjJNdVkzSmxZWFJsVW1GdVoyVW9LVHRjYmlBZ0lDQnBaaUFvSVhBdWMzUmhjblJEYjI1MFlXbHVaWElwSUh0Y2JpQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQjlYRzRnSUNBZ2FXWWdLSEF1Wlc1a1EyOXVkR0ZwYm1WeUtTQjdYRzRnSUNBZ0lDQnlZVzVuWlM1elpYUkZibVFvY0M1bGJtUkRiMjUwWVdsdVpYSXNJSEF1Wlc1a1QyWm1jMlYwS1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdjbUZ1WjJVdWMyVjBSVzVrS0hBdWMzUmhjblJEYjI1MFlXbHVaWElzSUhBdWMzUmhjblJQWm1aelpYUXBPMXh1SUNBZ0lIMWNiaUFnSUNCeVlXNW5aUzV6WlhSVGRHRnlkQ2h3TG5OMFlYSjBRMjl1ZEdGcGJtVnlMQ0J3TG5OMFlYSjBUMlptYzJWMEtUdGNiaUFnSUNCelpXd3VjbVZ0YjNabFFXeHNVbUZ1WjJWektDazdYRzRnSUNBZ2MyVnNMbUZrWkZKaGJtZGxLSEpoYm1kbEtUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJRzlzWkZObGJHVmpkR2x2YmlBb0tTQjdYRzRnSUNBZ2NtRnVaMlZVYjFSbGVIUlNZVzVuWlNod0tTNXpaV3hsWTNRb0tUdGNiaUFnZlZ4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSE5sZEZObGJHVmpkR2x2Ymp0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0ID0gZWFzeUdldDtcbnZhciBzZXQgPSBlYXN5U2V0O1xuXG5pZiAoZG9jdW1lbnQuc2VsZWN0aW9uICYmIGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSkge1xuICBnZXQgPSBoYXJkR2V0O1xuICBzZXQgPSBoYXJkU2V0O1xufVxuXG5mdW5jdGlvbiBlYXN5R2V0IChlbCkge1xuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBlbC5zZWxlY3Rpb25TdGFydCxcbiAgICBlbmQ6IGVsLnNlbGVjdGlvbkVuZFxuICB9O1xufVxuXG5mdW5jdGlvbiBoYXJkR2V0IChlbCkge1xuICB2YXIgYWN0aXZlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgaWYgKGFjdGl2ZSAhPT0gZWwpIHtcbiAgICBlbC5mb2N1cygpO1xuICB9XG5cbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gIHZhciBib29rbWFyayA9IHJhbmdlLmdldEJvb2ttYXJrKCk7XG4gIHZhciBvcmlnaW5hbCA9IGVsLnZhbHVlO1xuICB2YXIgbWFya2VyID0gZ2V0VW5pcXVlTWFya2VyKG9yaWdpbmFsKTtcbiAgdmFyIHBhcmVudCA9IHJhbmdlLnBhcmVudEVsZW1lbnQoKTtcbiAgaWYgKHBhcmVudCA9PT0gbnVsbCB8fCAhaW5wdXRzKHBhcmVudCkpIHtcbiAgICByZXR1cm4gcmVzdWx0KDAsIDApO1xuICB9XG4gIHJhbmdlLnRleHQgPSBtYXJrZXIgKyByYW5nZS50ZXh0ICsgbWFya2VyO1xuXG4gIHZhciBjb250ZW50cyA9IGVsLnZhbHVlO1xuXG4gIGVsLnZhbHVlID0gb3JpZ2luYWw7XG4gIHJhbmdlLm1vdmVUb0Jvb2ttYXJrKGJvb2ttYXJrKTtcbiAgcmFuZ2Uuc2VsZWN0KCk7XG5cbiAgcmV0dXJuIHJlc3VsdChjb250ZW50cy5pbmRleE9mKG1hcmtlciksIGNvbnRlbnRzLmxhc3RJbmRleE9mKG1hcmtlcikgLSBtYXJrZXIubGVuZ3RoKTtcblxuICBmdW5jdGlvbiByZXN1bHQgKHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAoYWN0aXZlICE9PSBlbCkgeyAvLyBkb24ndCBkaXNydXB0IHByZS1leGlzdGluZyBzdGF0ZVxuICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICBhY3RpdmUuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmJsdXIoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFVuaXF1ZU1hcmtlciAoY29udGVudHMpIHtcbiAgdmFyIG1hcmtlcjtcbiAgZG8ge1xuICAgIG1hcmtlciA9ICdAQG1hcmtlci4nICsgTWF0aC5yYW5kb20oKSAqIG5ldyBEYXRlKCk7XG4gIH0gd2hpbGUgKGNvbnRlbnRzLmluZGV4T2YobWFya2VyKSAhPT0gLTEpO1xuICByZXR1cm4gbWFya2VyO1xufVxuXG5mdW5jdGlvbiBpbnB1dHMgKGVsKSB7XG4gIHJldHVybiAoKGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgZWwudHlwZSA9PT0gJ3RleHQnKSB8fCBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnKTtcbn1cblxuZnVuY3Rpb24gZWFzeVNldCAoZWwsIHApIHtcbiAgZWwuc2VsZWN0aW9uU3RhcnQgPSBwYXJzZShlbCwgcC5zdGFydCk7XG4gIGVsLnNlbGVjdGlvbkVuZCA9IHBhcnNlKGVsLCBwLmVuZCk7XG59XG5cbmZ1bmN0aW9uIGhhcmRTZXQgKGVsLCBwKSB7XG4gIHZhciByYW5nZSA9IGVsLmNyZWF0ZVRleHRSYW5nZSgpO1xuXG4gIGlmIChwLnN0YXJ0ID09PSAnZW5kJyAmJiBwLmVuZCA9PT0gJ2VuZCcpIHtcbiAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgcmFuZ2Uuc2VsZWN0KCk7XG4gIH0gZWxzZSB7XG4gICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgcGFyc2UoZWwsIHAuZW5kKSk7XG4gICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCBwYXJzZShlbCwgcC5zdGFydCkpO1xuICAgIHJhbmdlLnNlbGVjdCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlIChlbCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSAnZW5kJyA/IGVsLnZhbHVlLmxlbmd0aCA6IHZhbHVlIHx8IDA7XG59XG5cbmZ1bmN0aW9uIHNlbGwgKGVsLCBwKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgc2V0KGVsLCBwKTtcbiAgfVxuICByZXR1cm4gZ2V0KGVsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZWxsO1xuIiwidmFyIHNpID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJywgdGljaztcbmlmIChzaSkge1xuICB0aWNrID0gZnVuY3Rpb24gKGZuKSB7IHNldEltbWVkaWF0ZShmbik7IH07XG59IGVsc2Uge1xuICB0aWNrID0gZnVuY3Rpb24gKGZuKSB7IHNldFRpbWVvdXQoZm4sIDApOyB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRpY2s7IiwiXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0cmltO1xuXG5mdW5jdGlvbiB0cmltKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xufVxuXG5leHBvcnRzLmxlZnQgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpO1xufTtcblxuZXhwb3J0cy5yaWdodCA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgd2luZG93ID0gcmVxdWlyZShcImdsb2JhbC93aW5kb3dcIilcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZShcImlzLWZ1bmN0aW9uXCIpXG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZShcInBhcnNlLWhlYWRlcnNcIilcbnZhciB4dGVuZCA9IHJlcXVpcmUoXCJ4dGVuZFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVhIUlxuY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0IHx8IG5vb3BcbmNyZWF0ZVhIUi5YRG9tYWluUmVxdWVzdCA9IFwid2l0aENyZWRlbnRpYWxzXCIgaW4gKG5ldyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QoKSkgPyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QgOiB3aW5kb3cuWERvbWFpblJlcXVlc3RcblxuZm9yRWFjaEFycmF5KFtcImdldFwiLCBcInB1dFwiLCBcInBvc3RcIiwgXCJwYXRjaFwiLCBcImhlYWRcIiwgXCJkZWxldGVcIl0sIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGNyZWF0ZVhIUlttZXRob2QgPT09IFwiZGVsZXRlXCIgPyBcImRlbFwiIDogbWV0aG9kXSA9IGZ1bmN0aW9uKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgb3B0aW9ucyA9IGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICAgICAgb3B0aW9ucy5tZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgICAgICByZXR1cm4gX2NyZWF0ZVhIUihvcHRpb25zKVxuICAgIH1cbn0pXG5cbmZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdG9yKGFycmF5W2ldKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNFbXB0eShvYmope1xuICAgIGZvcih2YXIgaSBpbiBvYmope1xuICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkoaSkpIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgcGFyYW1zID0gdXJpXG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICAgICAgaWYgKHR5cGVvZiB1cmkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHt1cmk6dXJpfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zID0geHRlbmQob3B0aW9ucywge3VyaTogdXJpfSlcbiAgICB9XG5cbiAgICBwYXJhbXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHJldHVybiBwYXJhbXNcbn1cblxuZnVuY3Rpb24gY3JlYXRlWEhSKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBvcHRpb25zID0gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgIHJldHVybiBfY3JlYXRlWEhSKG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVYSFIob3B0aW9ucykge1xuICAgIHZhciBjYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2tcbiAgICBpZih0eXBlb2YgY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBhcmd1bWVudCBtaXNzaW5nXCIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhZHlzdGF0ZWNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBsb2FkRnVuYygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCb2R5KCkge1xuICAgICAgICAvLyBDaHJvbWUgd2l0aCByZXF1ZXN0VHlwZT1ibG9iIHRocm93cyBlcnJvcnMgYXJyb3VuZCB3aGVuIGV2ZW4gdGVzdGluZyBhY2Nlc3MgdG8gcmVzcG9uc2VUZXh0XG4gICAgICAgIHZhciBib2R5ID0gdW5kZWZpbmVkXG5cbiAgICAgICAgaWYgKHhoci5yZXNwb25zZSkge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVRleHQgfHwgZ2V0WG1sKHhocilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0pzb24pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IEpTT04ucGFyc2UoYm9keSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm9keVxuICAgIH1cblxuICAgIHZhciBmYWlsdXJlUmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgYm9keTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDAsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmksXG4gICAgICAgICAgICAgICAgcmF3UmVxdWVzdDogeGhyXG4gICAgICAgICAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvckZ1bmMoZXZ0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpXG4gICAgICAgIGlmKCEoZXZ0IGluc3RhbmNlb2YgRXJyb3IpKXtcbiAgICAgICAgICAgIGV2dCA9IG5ldyBFcnJvcihcIlwiICsgKGV2dCB8fCBcIlVua25vd24gWE1MSHR0cFJlcXVlc3QgRXJyb3JcIikgKVxuICAgICAgICB9XG4gICAgICAgIGV2dC5zdGF0dXNDb2RlID0gMFxuICAgICAgICBjYWxsYmFjayhldnQsIGZhaWx1cmVSZXNwb25zZSlcbiAgICAgICAgY2FsbGJhY2sgPSBub29wXG4gICAgfVxuXG4gICAgLy8gd2lsbCBsb2FkIHRoZSBkYXRhICYgcHJvY2VzcyB0aGUgcmVzcG9uc2UgaW4gYSBzcGVjaWFsIHJlc3BvbnNlIG9iamVjdFxuICAgIGZ1bmN0aW9uIGxvYWRGdW5jKCkge1xuICAgICAgICBpZiAoYWJvcnRlZCkgcmV0dXJuXG4gICAgICAgIHZhciBzdGF0dXNcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcilcbiAgICAgICAgaWYob3B0aW9ucy51c2VYRFIgJiYgeGhyLnN0YXR1cz09PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy9JRTggQ09SUyBHRVQgc3VjY2Vzc2Z1bCByZXNwb25zZSBkb2Vzbid0IGhhdmUgYSBzdGF0dXMgZmllbGQsIGJ1dCBib2R5IGlzIGZpbmVcbiAgICAgICAgICAgIHN0YXR1cyA9IDIwMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdHVzID0gKHhoci5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiB4aHIuc3RhdHVzKVxuICAgICAgICB9XG4gICAgICAgIHZhciByZXNwb25zZSA9IGZhaWx1cmVSZXNwb25zZVxuICAgICAgICB2YXIgZXJyID0gbnVsbFxuXG4gICAgICAgIGlmIChzdGF0dXMgIT09IDApe1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgYm9keTogZ2V0Qm9keSgpLFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgICAgICB1cmw6IHVyaSxcbiAgICAgICAgICAgICAgICByYXdSZXF1ZXN0OiB4aHJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMpeyAvL3JlbWVtYmVyIHhociBjYW4gaW4gZmFjdCBiZSBYRFIgZm9yIENPUlMgaW4gSUVcbiAgICAgICAgICAgICAgICByZXNwb25zZS5oZWFkZXJzID0gcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcihcIkludGVybmFsIFhNTEh0dHBSZXF1ZXN0IEVycm9yXCIpXG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soZXJyLCByZXNwb25zZSwgcmVzcG9uc2UuYm9keSlcbiAgICAgICAgY2FsbGJhY2sgPSBub29wXG5cbiAgICB9XG5cbiAgICB2YXIgeGhyID0gb3B0aW9ucy54aHIgfHwgbnVsbFxuXG4gICAgaWYgKCF4aHIpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29ycyB8fCBvcHRpb25zLnVzZVhEUikge1xuICAgICAgICAgICAgeGhyID0gbmV3IGNyZWF0ZVhIUi5YRG9tYWluUmVxdWVzdCgpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgeGhyID0gbmV3IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIga2V5XG4gICAgdmFyIGFib3J0ZWRcbiAgICB2YXIgdXJpID0geGhyLnVybCA9IG9wdGlvbnMudXJpIHx8IG9wdGlvbnMudXJsXG4gICAgdmFyIG1ldGhvZCA9IHhoci5tZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCBcIkdFVFwiXG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHkgfHwgb3B0aW9ucy5kYXRhIHx8IG51bGxcbiAgICB2YXIgaGVhZGVycyA9IHhoci5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9XG4gICAgdmFyIHN5bmMgPSAhIW9wdGlvbnMuc3luY1xuICAgIHZhciBpc0pzb24gPSBmYWxzZVxuICAgIHZhciB0aW1lb3V0VGltZXJcblxuICAgIGlmIChcImpzb25cIiBpbiBvcHRpb25zKSB7XG4gICAgICAgIGlzSnNvbiA9IHRydWVcbiAgICAgICAgaGVhZGVyc1tcImFjY2VwdFwiXSB8fCBoZWFkZXJzW1wiQWNjZXB0XCJdIHx8IChoZWFkZXJzW1wiQWNjZXB0XCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgIGlmIChtZXRob2QgIT09IFwiR0VUXCIgJiYgbWV0aG9kICE9PSBcIkhFQURcIikge1xuICAgICAgICAgICAgaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSB8fCBoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdIHx8IChoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5qc29uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHJlYWR5c3RhdGVjaGFuZ2VcbiAgICB4aHIub25sb2FkID0gbG9hZEZ1bmNcbiAgICB4aHIub25lcnJvciA9IGVycm9yRnVuY1xuICAgIC8vIElFOSBtdXN0IGhhdmUgb25wcm9ncmVzcyBiZSBzZXQgdG8gYSB1bmlxdWUgZnVuY3Rpb24uXG4gICAgeGhyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIElFIG11c3QgZGllXG4gICAgfVxuICAgIHhoci5vbnRpbWVvdXQgPSBlcnJvckZ1bmNcbiAgICB4aHIub3BlbihtZXRob2QsIHVyaSwgIXN5bmMsIG9wdGlvbnMudXNlcm5hbWUsIG9wdGlvbnMucGFzc3dvcmQpXG4gICAgLy9oYXMgdG8gYmUgYWZ0ZXIgb3BlblxuICAgIGlmKCFzeW5jKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSAhIW9wdGlvbnMud2l0aENyZWRlbnRpYWxzXG4gICAgfVxuICAgIC8vIENhbm5vdCBzZXQgdGltZW91dCB3aXRoIHN5bmMgcmVxdWVzdFxuICAgIC8vIG5vdCBzZXR0aW5nIHRpbWVvdXQgb24gdGhlIHhociBvYmplY3QsIGJlY2F1c2Ugb2Ygb2xkIHdlYmtpdHMgZXRjLiBub3QgaGFuZGxpbmcgdGhhdCBjb3JyZWN0bHlcbiAgICAvLyBib3RoIG5wbSdzIHJlcXVlc3QgYW5kIGpxdWVyeSAxLnggdXNlIHRoaXMga2luZCBvZiB0aW1lb3V0LCBzbyB0aGlzIGlzIGJlaW5nIGNvbnNpc3RlbnRcbiAgICBpZiAoIXN5bmMgJiYgb3B0aW9ucy50aW1lb3V0ID4gMCApIHtcbiAgICAgICAgdGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgYWJvcnRlZD10cnVlLy9JRTkgbWF5IHN0aWxsIGNhbGwgcmVhZHlzdGF0ZWNoYW5nZVxuICAgICAgICAgICAgeGhyLmFib3J0KFwidGltZW91dFwiKVxuICAgICAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoXCJYTUxIdHRwUmVxdWVzdCB0aW1lb3V0XCIpXG4gICAgICAgICAgICBlLmNvZGUgPSBcIkVUSU1FRE9VVFwiXG4gICAgICAgICAgICBlcnJvckZ1bmMoZSlcbiAgICAgICAgfSwgb3B0aW9ucy50aW1lb3V0IClcbiAgICB9XG5cbiAgICBpZiAoeGhyLnNldFJlcXVlc3RIZWFkZXIpIHtcbiAgICAgICAgZm9yKGtleSBpbiBoZWFkZXJzKXtcbiAgICAgICAgICAgIGlmKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSl7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaGVhZGVycyAmJiAhaXNFbXB0eShvcHRpb25zLmhlYWRlcnMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlcnMgY2Fubm90IGJlIHNldCBvbiBhbiBYRG9tYWluUmVxdWVzdCBvYmplY3RcIilcbiAgICB9XG5cbiAgICBpZiAoXCJyZXNwb25zZVR5cGVcIiBpbiBvcHRpb25zKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZVxuICAgIH1cblxuICAgIGlmIChcImJlZm9yZVNlbmRcIiBpbiBvcHRpb25zICYmXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLmJlZm9yZVNlbmQgPT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgICBvcHRpb25zLmJlZm9yZVNlbmQoeGhyKVxuICAgIH1cblxuICAgIHhoci5zZW5kKGJvZHkpXG5cbiAgICByZXR1cm4geGhyXG5cblxufVxuXG5mdW5jdGlvbiBnZXRYbWwoeGhyKSB7XG4gICAgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwiZG9jdW1lbnRcIikge1xuICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlWE1MXG4gICAgfVxuICAgIHZhciBmaXJlZm94QnVnVGFrZW5FZmZlY3QgPSB4aHIuc3RhdHVzID09PSAyMDQgJiYgeGhyLnJlc3BvbnNlWE1MICYmIHhoci5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQubm9kZU5hbWUgPT09IFwicGFyc2VyZXJyb3JcIlxuICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcIlwiICYmICFmaXJlZm94QnVnVGFrZW5FZmZlY3QpIHtcbiAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVhNTFxuICAgIH1cblxuICAgIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIElucHV0U3RhdGUgPSByZXF1aXJlKCcuL0lucHV0U3RhdGUnKTtcblxuZnVuY3Rpb24gSW5wdXRIaXN0b3J5IChzdXJmYWNlLCBtb2RlKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG5cbiAgc3RhdGUuaW5wdXRNb2RlID0gbW9kZTtcbiAgc3RhdGUuc3VyZmFjZSA9IHN1cmZhY2U7XG4gIHN0YXRlLnJlc2V0KCk7XG5cbiAgbGlzdGVuKHN1cmZhY2UudGV4dGFyZWEpO1xuICBsaXN0ZW4oc3VyZmFjZS5lZGl0YWJsZSk7XG5cbiAgZnVuY3Rpb24gbGlzdGVuIChlbCkge1xuICAgIHZhciBwYXN0ZUhhbmRsZXIgPSBzZWxmaWUoaGFuZGxlUGFzdGUpO1xuICAgIGNyb3NzdmVudC5hZGQoZWwsICdrZXlwcmVzcycsIHByZXZlbnRDdHJsWVopO1xuICAgIGNyb3NzdmVudC5hZGQoZWwsICdrZXlkb3duJywgc2VsZmllKGhhbmRsZUN0cmxZWikpO1xuICAgIGNyb3NzdmVudC5hZGQoZWwsICdrZXlkb3duJywgc2VsZmllKGhhbmRsZU1vZGVDaGFuZ2UpKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGVsLCAnbW91c2Vkb3duJywgc2V0TW92aW5nKTtcbiAgICBlbC5vbnBhc3RlID0gcGFzdGVIYW5kbGVyO1xuICAgIGVsLm9uZHJvcCA9IHBhc3RlSGFuZGxlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldE1vdmluZyAoKSB7XG4gICAgc3RhdGUuc2V0TW9kZSgnbW92aW5nJyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWxmaWUgKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZXIgKGUpIHsgcmV0dXJuIGZuLmNhbGwobnVsbCwgc3RhdGUsIGUpOyB9O1xuICB9XG59XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUuc2V0SW5wdXRNb2RlID0gZnVuY3Rpb24gKG1vZGUpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgc3RhdGUuaW5wdXRNb2RlID0gbW9kZTtcbiAgc3RhdGUucmVzZXQoKTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIHN0YXRlLmlucHV0U3RhdGUgPSBudWxsO1xuICBzdGF0ZS5sYXN0U3RhdGUgPSBudWxsO1xuICBzdGF0ZS5oaXN0b3J5ID0gW107XG4gIHN0YXRlLmhpc3RvcnlQb2ludGVyID0gMDtcbiAgc3RhdGUuaGlzdG9yeU1vZGUgPSAnbm9uZSc7XG4gIHN0YXRlLnJlZnJlc2hpbmcgPSBudWxsO1xuICBzdGF0ZS5yZWZyZXNoU3RhdGUodHJ1ZSk7XG4gIHN0YXRlLnNhdmVTdGF0ZSgpO1xuICByZXR1cm4gc3RhdGU7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnNldENvbW1hbmRNb2RlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBzdGF0ZS5oaXN0b3J5TW9kZSA9ICdjb21tYW5kJztcbiAgc3RhdGUuc2F2ZVN0YXRlKCk7XG4gIHN0YXRlLnJlZnJlc2hpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGF0ZS5yZWZyZXNoU3RhdGUoKTtcbiAgfSwgMCk7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLmNhblVuZG8gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmhpc3RvcnlQb2ludGVyID4gMTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUuY2FuUmVkbyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuaGlzdG9yeVt0aGlzLmhpc3RvcnlQb2ludGVyICsgMV07XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnVuZG8gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIGlmIChzdGF0ZS5jYW5VbmRvKCkpIHtcbiAgICBpZiAoc3RhdGUubGFzdFN0YXRlKSB7XG4gICAgICBzdGF0ZS5sYXN0U3RhdGUucmVzdG9yZSgpO1xuICAgICAgc3RhdGUubGFzdFN0YXRlID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuaGlzdG9yeVtzdGF0ZS5oaXN0b3J5UG9pbnRlcl0gPSBuZXcgSW5wdXRTdGF0ZShzdGF0ZS5zdXJmYWNlLCBzdGF0ZS5pbnB1dE1vZGUpO1xuICAgICAgc3RhdGUuaGlzdG9yeVstLXN0YXRlLmhpc3RvcnlQb2ludGVyXS5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG4gIHN0YXRlLmhpc3RvcnlNb2RlID0gJ25vbmUnO1xuICBzdGF0ZS5zdXJmYWNlLmZvY3VzKHN0YXRlLmlucHV0TW9kZSk7XG4gIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5yZWRvID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBpZiAoc3RhdGUuY2FuUmVkbygpKSB7XG4gICAgc3RhdGUuaGlzdG9yeVsrK3N0YXRlLmhpc3RvcnlQb2ludGVyXS5yZXN0b3JlKCk7XG4gIH1cblxuICBzdGF0ZS5oaXN0b3J5TW9kZSA9ICdub25lJztcbiAgc3RhdGUuc3VyZmFjZS5mb2N1cyhzdGF0ZS5pbnB1dE1vZGUpO1xuICBzdGF0ZS5yZWZyZXNoU3RhdGUoKTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUuc2V0TW9kZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBpZiAoc3RhdGUuaGlzdG9yeU1vZGUgIT09IHZhbHVlKSB7XG4gICAgc3RhdGUuaGlzdG9yeU1vZGUgPSB2YWx1ZTtcbiAgICBzdGF0ZS5zYXZlU3RhdGUoKTtcbiAgfVxuICBzdGF0ZS5yZWZyZXNoaW5nID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhdGUucmVmcmVzaFN0YXRlKCk7XG4gIH0sIDEpO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5yZWZyZXNoU3RhdGUgPSBmdW5jdGlvbiAoaW5pdGlhbFN0YXRlKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIHN0YXRlLmlucHV0U3RhdGUgPSBuZXcgSW5wdXRTdGF0ZShzdGF0ZS5zdXJmYWNlLCBzdGF0ZS5pbnB1dE1vZGUsIGluaXRpYWxTdGF0ZSk7XG4gIHN0YXRlLnJlZnJlc2hpbmcgPSBudWxsO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5zYXZlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIHZhciBjdXJyZW50ID0gc3RhdGUuaW5wdXRTdGF0ZSB8fCBuZXcgSW5wdXRTdGF0ZShzdGF0ZS5zdXJmYWNlLCBzdGF0ZS5pbnB1dE1vZGUpO1xuXG4gIGlmIChzdGF0ZS5oaXN0b3J5TW9kZSA9PT0gJ21vdmluZycpIHtcbiAgICBpZiAoIXN0YXRlLmxhc3RTdGF0ZSkge1xuICAgICAgc3RhdGUubGFzdFN0YXRlID0gY3VycmVudDtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChzdGF0ZS5sYXN0U3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuaGlzdG9yeVtzdGF0ZS5oaXN0b3J5UG9pbnRlciAtIDFdLnRleHQgIT09IHN0YXRlLmxhc3RTdGF0ZS50ZXh0KSB7XG4gICAgICBzdGF0ZS5oaXN0b3J5W3N0YXRlLmhpc3RvcnlQb2ludGVyKytdID0gc3RhdGUubGFzdFN0YXRlO1xuICAgIH1cbiAgICBzdGF0ZS5sYXN0U3RhdGUgPSBudWxsO1xuICB9XG4gIHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeVBvaW50ZXIrK10gPSBjdXJyZW50O1xuICBzdGF0ZS5oaXN0b3J5W3N0YXRlLmhpc3RvcnlQb2ludGVyICsgMV0gPSBudWxsO1xufTtcblxuZnVuY3Rpb24gaGFuZGxlQ3RybFlaIChzdGF0ZSwgZSkge1xuICB2YXIgaGFuZGxlZCA9IGZhbHNlO1xuICB2YXIga2V5Q29kZSA9IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlO1xuICB2YXIga2V5Q29kZUNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGtleUNvZGUpO1xuXG4gIGlmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgc3dpdGNoIChrZXlDb2RlQ2hhci50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBjYXNlICd5JzpcbiAgICAgICAgc3RhdGUucmVkbygpO1xuICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3onOlxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgIHN0YXRlLnJlZG8oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGF0ZS51bmRvKCk7XG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChoYW5kbGVkICYmIGUucHJldmVudERlZmF1bHQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlTW9kZUNoYW5nZSAoc3RhdGUsIGUpIHtcbiAgaWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZTtcblxuICBpZiAoKGtleUNvZGUgPj0gMzMgJiYga2V5Q29kZSA8PSA0MCkgfHwgKGtleUNvZGUgPj0gNjMyMzIgJiYga2V5Q29kZSA8PSA2MzIzNSkpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCdtb3ZpbmcnKTtcbiAgfSBlbHNlIGlmIChrZXlDb2RlID09PSA4IHx8IGtleUNvZGUgPT09IDQ2IHx8IGtleUNvZGUgPT09IDEyNykge1xuICAgIHN0YXRlLnNldE1vZGUoJ2RlbGV0aW5nJyk7XG4gIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gMTMpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCduZXdsaW5lcycpO1xuICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IDI3KSB7XG4gICAgc3RhdGUuc2V0TW9kZSgnZXNjYXBlJyk7XG4gIH0gZWxzZSBpZiAoKGtleUNvZGUgPCAxNiB8fCBrZXlDb2RlID4gMjApICYmIGtleUNvZGUgIT09IDkxKSB7XG4gICAgc3RhdGUuc2V0TW9kZSgndHlwaW5nJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlUGFzdGUgKHN0YXRlKSB7XG4gIGlmIChzdGF0ZS5pbnB1dFN0YXRlICYmIHN0YXRlLmlucHV0U3RhdGUudGV4dCAhPT0gc3RhdGUuc3VyZmFjZS5yZWFkKHN0YXRlLmlucHV0TW9kZSkgJiYgc3RhdGUucmVmcmVzaGluZyA9PT0gbnVsbCkge1xuICAgIHN0YXRlLmhpc3RvcnlNb2RlID0gJ3Bhc3RlJztcbiAgICBzdGF0ZS5zYXZlU3RhdGUoKTtcbiAgICBzdGF0ZS5yZWZyZXNoU3RhdGUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmV2ZW50Q3RybFlaIChlKSB7XG4gIHZhciBrZXlDb2RlID0gZS5jaGFyQ29kZSB8fCBlLmtleUNvZGU7XG4gIHZhciB5eiA9IGtleUNvZGUgPT09IDg5IHx8IGtleUNvZGUgPT09IDkwO1xuICB2YXIgY3RybCA9IGUuY3RybEtleSB8fCBlLm1ldGFLZXk7XG4gIGlmIChjdHJsICYmIHl6KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRIaXN0b3J5O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGlzVmlzaWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2lzVmlzaWJsZUVsZW1lbnQnKTtcbnZhciBmaXhFT0wgPSByZXF1aXJlKCcuL2ZpeEVPTCcpO1xudmFyIE1hcmtkb3duQ2h1bmtzID0gcmVxdWlyZSgnLi9tYXJrZG93bi9NYXJrZG93bkNodW5rcycpO1xudmFyIEh0bWxDaHVua3MgPSByZXF1aXJlKCcuL2h0bWwvSHRtbENodW5rcycpO1xudmFyIGNodW5rcyA9IHtcbiAgbWFya2Rvd246IE1hcmtkb3duQ2h1bmtzLFxuICBodG1sOiBIdG1sQ2h1bmtzLFxuICB3eXNpd3lnOiBIdG1sQ2h1bmtzXG59O1xuXG5mdW5jdGlvbiBJbnB1dFN0YXRlIChzdXJmYWNlLCBtb2RlLCBpbml0aWFsU3RhdGUpIHtcbiAgdGhpcy5tb2RlID0gbW9kZTtcbiAgdGhpcy5zdXJmYWNlID0gc3VyZmFjZTtcbiAgdGhpcy5pbml0aWFsU3RhdGUgPSBpbml0aWFsU3RhdGUgfHwgZmFsc2U7XG4gIHRoaXMuaW5pdCgpO1xufVxuXG5JbnB1dFN0YXRlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBlbCA9IHNlbGYuc3VyZmFjZS5jdXJyZW50KHNlbGYubW9kZSk7XG4gIGlmICghaXNWaXNpYmxlRWxlbWVudChlbCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCF0aGlzLmluaXRpYWxTdGF0ZSAmJiBkb2MuYWN0aXZlRWxlbWVudCAmJiBkb2MuYWN0aXZlRWxlbWVudCAhPT0gZWwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc2VsZi5zdXJmYWNlLnJlYWRTZWxlY3Rpb24oc2VsZik7XG4gIHNlbGYuc2Nyb2xsVG9wID0gZWwuc2Nyb2xsVG9wO1xuICBpZiAoIXNlbGYudGV4dCkge1xuICAgIHNlbGYudGV4dCA9IHNlbGYuc3VyZmFjZS5yZWFkKHNlbGYubW9kZSk7XG4gIH1cbn07XG5cbklucHV0U3RhdGUucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZWwgPSBzZWxmLnN1cmZhY2UuY3VycmVudChzZWxmLm1vZGUpO1xuICBpZiAoIWlzVmlzaWJsZUVsZW1lbnQoZWwpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHNlbGYuc3VyZmFjZS53cml0ZVNlbGVjdGlvbihzZWxmKTtcbn07XG5cbklucHV0U3RhdGUucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGVsID0gc2VsZi5zdXJmYWNlLmN1cnJlbnQoc2VsZi5tb2RlKTtcbiAgaWYgKHR5cGVvZiBzZWxmLnRleHQgPT09ICdzdHJpbmcnICYmIHNlbGYudGV4dCAhPT0gc2VsZi5zdXJmYWNlLnJlYWQoc2VsZi5tb2RlKSkge1xuICAgIHNlbGYuc3VyZmFjZS53cml0ZShzZWxmLm1vZGUsIHNlbGYudGV4dCk7XG4gIH1cbiAgc2VsZi5zZWxlY3QoKTtcbiAgZWwuc2Nyb2xsVG9wID0gc2VsZi5zY3JvbGxUb3A7XG59O1xuXG5JbnB1dFN0YXRlLnByb3RvdHlwZS5nZXRDaHVua3MgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGNodW5rID0gbmV3IGNodW5rc1tzZWxmLm1vZGVdKCk7XG4gIGNodW5rLmJlZm9yZSA9IGZpeEVPTChzZWxmLnRleHQuc3Vic3RyaW5nKDAsIHNlbGYuc3RhcnQpKTtcbiAgY2h1bmsuc3RhcnRUYWcgPSAnJztcbiAgY2h1bmsuc2VsZWN0aW9uID0gZml4RU9MKHNlbGYudGV4dC5zdWJzdHJpbmcoc2VsZi5zdGFydCwgc2VsZi5lbmQpKTtcbiAgY2h1bmsuZW5kVGFnID0gJyc7XG4gIGNodW5rLmFmdGVyID0gZml4RU9MKHNlbGYudGV4dC5zdWJzdHJpbmcoc2VsZi5lbmQpKTtcbiAgY2h1bmsuc2Nyb2xsVG9wID0gc2VsZi5zY3JvbGxUb3A7XG4gIHNlbGYuY2FjaGVkQ2h1bmtzID0gY2h1bms7XG4gIHJldHVybiBjaHVuaztcbn07XG5cbklucHV0U3RhdGUucHJvdG90eXBlLnNldENodW5rcyA9IGZ1bmN0aW9uIChjaHVuaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGNodW5rLmJlZm9yZSA9IGNodW5rLmJlZm9yZSArIGNodW5rLnN0YXJ0VGFnO1xuICBjaHVuay5hZnRlciA9IGNodW5rLmVuZFRhZyArIGNodW5rLmFmdGVyO1xuICBzZWxmLnN0YXJ0ID0gY2h1bmsuYmVmb3JlLmxlbmd0aDtcbiAgc2VsZi5lbmQgPSBjaHVuay5iZWZvcmUubGVuZ3RoICsgY2h1bmsuc2VsZWN0aW9uLmxlbmd0aDtcbiAgc2VsZi50ZXh0ID0gY2h1bmsuYmVmb3JlICsgY2h1bmsuc2VsZWN0aW9uICsgY2h1bmsuYWZ0ZXI7XG4gIHNlbGYuc2Nyb2xsVG9wID0gY2h1bmsuc2Nyb2xsVG9wO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dFN0YXRlO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTlKYm5CMWRGTjBZWFJsTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQmtiMk1nUFNCbmJHOWlZV3d1Wkc5amRXMWxiblE3WEc1MllYSWdhWE5XYVhOcFlteGxSV3hsYldWdWRDQTlJSEpsY1hWcGNtVW9KeTR2YVhOV2FYTnBZbXhsUld4bGJXVnVkQ2NwTzF4dWRtRnlJR1pwZUVWUFRDQTlJSEpsY1hWcGNtVW9KeTR2Wm1sNFJVOU1KeWs3WEc1MllYSWdUV0Z5YTJSdmQyNURhSFZ1YTNNZ1BTQnlaWEYxYVhKbEtDY3VMMjFoY210a2IzZHVMMDFoY210a2IzZHVRMmgxYm10ekp5azdYRzUyWVhJZ1NIUnRiRU5vZFc1cmN5QTlJSEpsY1hWcGNtVW9KeTR2YUhSdGJDOUlkRzFzUTJoMWJtdHpKeWs3WEc1MllYSWdZMmgxYm10eklEMGdlMXh1SUNCdFlYSnJaRzkzYmpvZ1RXRnlhMlJ2ZDI1RGFIVnVhM01zWEc0Z0lHaDBiV3c2SUVoMGJXeERhSFZ1YTNNc1hHNGdJSGQ1YzJsM2VXYzZJRWgwYld4RGFIVnVhM05jYm4wN1hHNWNibVoxYm1OMGFXOXVJRWx1Y0hWMFUzUmhkR1VnS0hOMWNtWmhZMlVzSUcxdlpHVXNJR2x1YVhScFlXeFRkR0YwWlNrZ2UxeHVJQ0IwYUdsekxtMXZaR1VnUFNCdGIyUmxPMXh1SUNCMGFHbHpMbk4xY21aaFkyVWdQU0J6ZFhKbVlXTmxPMXh1SUNCMGFHbHpMbWx1YVhScFlXeFRkR0YwWlNBOUlHbHVhWFJwWVd4VGRHRjBaU0I4ZkNCbVlXeHpaVHRjYmlBZ2RHaHBjeTVwYm1sMEtDazdYRzU5WEc1Y2JrbHVjSFYwVTNSaGRHVXVjSEp2ZEc5MGVYQmxMbWx1YVhRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lIWmhjaUJ6Wld4bUlEMGdkR2hwY3p0Y2JpQWdkbUZ5SUdWc0lEMGdjMlZzWmk1emRYSm1ZV05sTG1OMWNuSmxiblFvYzJWc1ppNXRiMlJsS1R0Y2JpQWdhV1lnS0NGcGMxWnBjMmxpYkdWRmJHVnRaVzUwS0dWc0tTa2dlMXh1SUNBZ0lISmxkSFZ5Ymp0Y2JpQWdmVnh1SUNCcFppQW9JWFJvYVhNdWFXNXBkR2xoYkZOMFlYUmxJQ1ltSUdSdll5NWhZM1JwZG1WRmJHVnRaVzUwSUNZbUlHUnZZeTVoWTNScGRtVkZiR1Z0Wlc1MElDRTlQU0JsYkNrZ2UxeHVJQ0FnSUhKbGRIVnlianRjYmlBZ2ZWeHVJQ0J6Wld4bUxuTjFjbVpoWTJVdWNtVmhaRk5sYkdWamRHbHZiaWh6Wld4bUtUdGNiaUFnYzJWc1ppNXpZM0p2Ykd4VWIzQWdQU0JsYkM1elkzSnZiR3hVYjNBN1hHNGdJR2xtSUNnaGMyVnNaaTUwWlhoMEtTQjdYRzRnSUNBZ2MyVnNaaTUwWlhoMElEMGdjMlZzWmk1emRYSm1ZV05sTG5KbFlXUW9jMlZzWmk1dGIyUmxLVHRjYmlBZ2ZWeHVmVHRjYmx4dVNXNXdkWFJUZEdGMFpTNXdjbTkwYjNSNWNHVXVjMlZzWldOMElEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQjJZWElnYzJWc1ppQTlJSFJvYVhNN1hHNGdJSFpoY2lCbGJDQTlJSE5sYkdZdWMzVnlabUZqWlM1amRYSnlaVzUwS0hObGJHWXViVzlrWlNrN1hHNGdJR2xtSUNnaGFYTldhWE5wWW14bFJXeGxiV1Z1ZENobGJDa3BJSHRjYmlBZ0lDQnlaWFIxY200N1hHNGdJSDFjYmlBZ2MyVnNaaTV6ZFhKbVlXTmxMbmR5YVhSbFUyVnNaV04wYVc5dUtITmxiR1lwTzF4dWZUdGNibHh1U1c1d2RYUlRkR0YwWlM1d2NtOTBiM1I1Y0dVdWNtVnpkRzl5WlNBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ2RtRnlJSE5sYkdZZ1BTQjBhR2x6TzF4dUlDQjJZWElnWld3Z1BTQnpaV3htTG5OMWNtWmhZMlV1WTNWeWNtVnVkQ2h6Wld4bUxtMXZaR1VwTzF4dUlDQnBaaUFvZEhsd1pXOW1JSE5sYkdZdWRHVjRkQ0E5UFQwZ0ozTjBjbWx1WnljZ0ppWWdjMlZzWmk1MFpYaDBJQ0U5UFNCelpXeG1Mbk4xY21aaFkyVXVjbVZoWkNoelpXeG1MbTF2WkdVcEtTQjdYRzRnSUNBZ2MyVnNaaTV6ZFhKbVlXTmxMbmR5YVhSbEtITmxiR1l1Ylc5a1pTd2djMlZzWmk1MFpYaDBLVHRjYmlBZ2ZWeHVJQ0J6Wld4bUxuTmxiR1ZqZENncE8xeHVJQ0JsYkM1elkzSnZiR3hVYjNBZ1BTQnpaV3htTG5OamNtOXNiRlJ2Y0R0Y2JuMDdYRzVjYmtsdWNIVjBVM1JoZEdVdWNISnZkRzkwZVhCbExtZGxkRU5vZFc1cmN5QTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdkbUZ5SUhObGJHWWdQU0IwYUdsek8xeHVJQ0IyWVhJZ1kyaDFibXNnUFNCdVpYY2dZMmgxYm10elczTmxiR1l1Ylc5a1pWMG9LVHRjYmlBZ1kyaDFibXN1WW1WbWIzSmxJRDBnWm1sNFJVOU1LSE5sYkdZdWRHVjRkQzV6ZFdKemRISnBibWNvTUN3Z2MyVnNaaTV6ZEdGeWRDa3BPMXh1SUNCamFIVnVheTV6ZEdGeWRGUmhaeUE5SUNjbk8xeHVJQ0JqYUhWdWF5NXpaV3hsWTNScGIyNGdQU0JtYVhoRlQwd29jMlZzWmk1MFpYaDBMbk4xWW5OMGNtbHVaeWh6Wld4bUxuTjBZWEowTENCelpXeG1MbVZ1WkNrcE8xeHVJQ0JqYUhWdWF5NWxibVJVWVdjZ1BTQW5KenRjYmlBZ1kyaDFibXN1WVdaMFpYSWdQU0JtYVhoRlQwd29jMlZzWmk1MFpYaDBMbk4xWW5OMGNtbHVaeWh6Wld4bUxtVnVaQ2twTzF4dUlDQmphSFZ1YXk1elkzSnZiR3hVYjNBZ1BTQnpaV3htTG5OamNtOXNiRlJ2Y0R0Y2JpQWdjMlZzWmk1allXTm9aV1JEYUhWdWEzTWdQU0JqYUhWdWF6dGNiaUFnY21WMGRYSnVJR05vZFc1ck8xeHVmVHRjYmx4dVNXNXdkWFJUZEdGMFpTNXdjbTkwYjNSNWNHVXVjMlYwUTJoMWJtdHpJRDBnWm5WdVkzUnBiMjRnS0dOb2RXNXJLU0I3WEc0Z0lIWmhjaUJ6Wld4bUlEMGdkR2hwY3p0Y2JpQWdZMmgxYm1zdVltVm1iM0psSUQwZ1kyaDFibXN1WW1WbWIzSmxJQ3NnWTJoMWJtc3VjM1JoY25SVVlXYzdYRzRnSUdOb2RXNXJMbUZtZEdWeUlEMGdZMmgxYm1zdVpXNWtWR0ZuSUNzZ1kyaDFibXN1WVdaMFpYSTdYRzRnSUhObGJHWXVjM1JoY25RZ1BTQmphSFZ1YXk1aVpXWnZjbVV1YkdWdVozUm9PMXh1SUNCelpXeG1MbVZ1WkNBOUlHTm9kVzVyTG1KbFptOXlaUzVzWlc1bmRHZ2dLeUJqYUhWdWF5NXpaV3hsWTNScGIyNHViR1Z1WjNSb08xeHVJQ0J6Wld4bUxuUmxlSFFnUFNCamFIVnVheTVpWldadmNtVWdLeUJqYUhWdWF5NXpaV3hsWTNScGIyNGdLeUJqYUhWdWF5NWhablJsY2p0Y2JpQWdjMlZzWmk1elkzSnZiR3hVYjNBZ1BTQmphSFZ1YXk1elkzSnZiR3hVYjNBN1hHNTlPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUVsdWNIVjBVM1JoZEdVN1hHNGlYWDA9IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgY29tbWFuZHMgPSB7XG4gIG1hcmtkb3duOiB7XG4gICAgYm9sZE9ySXRhbGljOiByZXF1aXJlKCcuL21hcmtkb3duL2JvbGRPckl0YWxpYycpLFxuICAgIGxpbmtPckltYWdlT3JBdHRhY2htZW50OiByZXF1aXJlKCcuL21hcmtkb3duL2xpbmtPckltYWdlT3JBdHRhY2htZW50JyksXG4gICAgYmxvY2txdW90ZTogcmVxdWlyZSgnLi9tYXJrZG93bi9ibG9ja3F1b3RlJyksXG4gICAgY29kZWJsb2NrOiByZXF1aXJlKCcuL21hcmtkb3duL2NvZGVibG9jaycpLFxuICAgIGhlYWRpbmc6IHJlcXVpcmUoJy4vbWFya2Rvd24vaGVhZGluZycpLFxuICAgIGxpc3Q6IHJlcXVpcmUoJy4vbWFya2Rvd24vbGlzdCcpLFxuICAgIGhyOiByZXF1aXJlKCcuL21hcmtkb3duL2hyJylcbiAgfSxcbiAgaHRtbDoge1xuICAgIGJvbGRPckl0YWxpYzogcmVxdWlyZSgnLi9odG1sL2JvbGRPckl0YWxpYycpLFxuICAgIGxpbmtPckltYWdlT3JBdHRhY2htZW50OiByZXF1aXJlKCcuL2h0bWwvbGlua09ySW1hZ2VPckF0dGFjaG1lbnQnKSxcbiAgICBibG9ja3F1b3RlOiByZXF1aXJlKCcuL2h0bWwvYmxvY2txdW90ZScpLFxuICAgIGNvZGVibG9jazogcmVxdWlyZSgnLi9odG1sL2NvZGVibG9jaycpLFxuICAgIGhlYWRpbmc6IHJlcXVpcmUoJy4vaHRtbC9oZWFkaW5nJyksXG4gICAgbGlzdDogcmVxdWlyZSgnLi9odG1sL2xpc3QnKSxcbiAgICBocjogcmVxdWlyZSgnLi9odG1sL2hyJylcbiAgfVxufTtcblxuY29tbWFuZHMud3lzaXd5ZyA9IGNvbW1hbmRzLmh0bWw7XG5cbmZ1bmN0aW9uIGJpbmRDb21tYW5kcyAoc3VyZmFjZSwgb3B0aW9ucywgZWRpdG9yKSB7XG4gIGJpbmQoJ2JvbGQnLCAnY21kK2InLCBib2xkKTtcbiAgYmluZCgnaXRhbGljJywgJ2NtZCtpJywgaXRhbGljKTtcbiAgYmluZCgncXVvdGUnLCAnY21kK2onLCByb3V0ZXIoJ2Jsb2NrcXVvdGUnKSk7XG4gIGJpbmQoJ2NvZGUnLCAnY21kK2UnLCBjb2RlKTtcbiAgYmluZCgnb2wnLCAnY21kK28nLCBvbCk7XG4gIGJpbmQoJ3VsJywgJ2NtZCt1JywgdWwpO1xuICBiaW5kKCdoZWFkaW5nJywgJ2NtZCtkJywgcm91dGVyKCdoZWFkaW5nJykpO1xuICBlZGl0b3Iuc2hvd0xpbmtEaWFsb2cgPSBmYWJyaWNhdG9yKGJpbmQoJ2xpbmsnLCAnY21kK2snLCBsaW5rT3JJbWFnZU9yQXR0YWNobWVudCgnbGluaycpKSk7XG4gIGVkaXRvci5zaG93SW1hZ2VEaWFsb2cgPSBmYWJyaWNhdG9yKGJpbmQoJ2ltYWdlJywgJ2NtZCtnJywgbGlua09ySW1hZ2VPckF0dGFjaG1lbnQoJ2ltYWdlJykpKTtcbiAgZWRpdG9yLmxpbmtPckltYWdlT3JBdHRhY2htZW50ID0gbGlua09ySW1hZ2VPckF0dGFjaG1lbnQ7XG5cbiAgaWYgKG9wdGlvbnMuYXR0YWNobWVudHMpIHtcbiAgICBlZGl0b3Iuc2hvd0F0dGFjaG1lbnREaWFsb2cgPSBmYWJyaWNhdG9yKGJpbmQoJ2F0dGFjaG1lbnQnLCAnY21kK3NoaWZ0K2snLCBsaW5rT3JJbWFnZU9yQXR0YWNobWVudCgnYXR0YWNobWVudCcpKSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaHIpIHsgYmluZCgnaHInLCAnY21kK24nLCByb3V0ZXIoJ2hyJykpOyB9XG5cbiAgZnVuY3Rpb24gZmFicmljYXRvciAoZWwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gb3BlbiAoKSB7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGVsLCAnY2xpY2snKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGJvbGQgKG1vZGUsIGNodW5rcykge1xuICAgIGNvbW1hbmRzW21vZGVdLmJvbGRPckl0YWxpYyhjaHVua3MsICdib2xkJyk7XG4gIH1cbiAgZnVuY3Rpb24gaXRhbGljIChtb2RlLCBjaHVua3MpIHtcbiAgICBjb21tYW5kc1ttb2RlXS5ib2xkT3JJdGFsaWMoY2h1bmtzLCAnaXRhbGljJyk7XG4gIH1cbiAgZnVuY3Rpb24gY29kZSAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0uY29kZWJsb2NrKGNodW5rcywgeyBmZW5jaW5nOiBvcHRpb25zLmZlbmNpbmcgfSk7XG4gIH1cbiAgZnVuY3Rpb24gdWwgKG1vZGUsIGNodW5rcykge1xuICAgIGNvbW1hbmRzW21vZGVdLmxpc3QoY2h1bmtzLCBmYWxzZSk7XG4gIH1cbiAgZnVuY3Rpb24gb2wgKG1vZGUsIGNodW5rcykge1xuICAgIGNvbW1hbmRzW21vZGVdLmxpc3QoY2h1bmtzLCB0cnVlKTtcbiAgfVxuICBmdW5jdGlvbiBsaW5rT3JJbWFnZU9yQXR0YWNobWVudCAodHlwZSwgYXV0b1VwbG9hZCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBsaW5rT3JJbWFnZU9yQXR0YWNobWVudEludm9rZSAobW9kZSwgY2h1bmtzKSB7XG4gICAgICBjb21tYW5kc1ttb2RlXS5saW5rT3JJbWFnZU9yQXR0YWNobWVudC5jYWxsKHRoaXMsIGNodW5rcywge1xuICAgICAgICBlZGl0b3I6IGVkaXRvcixcbiAgICAgICAgbW9kZTogbW9kZSxcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgc3VyZmFjZTogc3VyZmFjZSxcbiAgICAgICAgcHJvbXB0czogb3B0aW9ucy5wcm9tcHRzLFxuICAgICAgICB1cGxvYWQ6IG9wdGlvbnNbdHlwZSArICdzJ10sXG4gICAgICAgIGNsYXNzZXM6IG9wdGlvbnMuY2xhc3NlcyxcbiAgICAgICAgbWVyZ2VIdG1sQW5kQXR0YWNobWVudDogb3B0aW9ucy5tZXJnZUh0bWxBbmRBdHRhY2htZW50LFxuICAgICAgICBhdXRvVXBsb2FkOiBhdXRvVXBsb2FkXG4gICAgICB9KTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGJpbmQgKGlkLCBjb21ibywgZm4pIHtcbiAgICByZXR1cm4gZWRpdG9yLmFkZENvbW1hbmRCdXR0b24oaWQsIGNvbWJvLCBzdXBwcmVzcyhmbikpO1xuICB9XG4gIGZ1bmN0aW9uIHJvdXRlciAobWV0aG9kKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJvdXRlZCAobW9kZSwgY2h1bmtzKSB7IGNvbW1hbmRzW21vZGVdW21ldGhvZF0uY2FsbCh0aGlzLCBjaHVua3MpOyB9O1xuICB9XG4gIGZ1bmN0aW9uIHN0b3AgKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbiAgZnVuY3Rpb24gc3VwcHJlc3MgKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN1cHByZXNzb3IgKGUsIG1vZGUsIGNodW5rcykgeyBzdG9wKGUpOyBmbi5jYWxsKHRoaXMsIG1vZGUsIGNodW5rcyk7IH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ29tbWFuZHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGNhc3QgKGNvbGxlY3Rpb24pIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaTtcbiAgdmFyIGxlbiA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICByZXN1bHQucHVzaChjb2xsZWN0aW9uW2ldKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhc3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByaW5wdXQgPSAvXlxccyooLio/KSg/OlxccytcIiguKylcIik/XFxzKiQvO1xudmFyIHJmdWxsID0gL14oPzpodHRwcz98ZnRwKTpcXC9cXC8vO1xuXG5mdW5jdGlvbiBwYXJzZUxpbmtJbnB1dCAoaW5wdXQpIHtcbiAgcmV0dXJuIHBhcnNlci5hcHBseShudWxsLCBpbnB1dC5tYXRjaChyaW5wdXQpKTtcblxuICBmdW5jdGlvbiBwYXJzZXIgKGFsbCwgbGluaywgdGl0bGUpIHtcbiAgICB2YXIgaHJlZiA9IGxpbmsucmVwbGFjZSgvXFw/LiokLywgcXVlcnlVbmVuY29kZWRSZXBsYWNlcik7XG4gICAgaHJlZiA9IGRlY29kZVVSSUNvbXBvbmVudChocmVmKTtcbiAgICBocmVmID0gZW5jb2RlVVJJKGhyZWYpLnJlcGxhY2UoLycvZywgJyUyNycpLnJlcGxhY2UoL1xcKC9nLCAnJTI4JykucmVwbGFjZSgvXFwpL2csICclMjknKTtcbiAgICBocmVmID0gaHJlZi5yZXBsYWNlKC9cXD8uKiQvLCBxdWVyeUVuY29kZWRSZXBsYWNlcik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaHJlZjogZm9ybWF0SHJlZihocmVmKSwgdGl0bGU6IGZvcm1hdFRpdGxlKHRpdGxlKVxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gcXVlcnlVbmVuY29kZWRSZXBsYWNlciAocXVlcnkpIHtcbiAgcmV0dXJuIHF1ZXJ5LnJlcGxhY2UoL1xcKy9nLCAnICcpO1xufVxuXG5mdW5jdGlvbiBxdWVyeUVuY29kZWRSZXBsYWNlciAocXVlcnkpIHtcbiAgcmV0dXJuIHF1ZXJ5LnJlcGxhY2UoL1xcKy9nLCAnJTJiJyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpdGxlICh0aXRsZSkge1xuICBpZiAoIXRpdGxlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gdGl0bGVcbiAgICAucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRIcmVmICh1cmwpIHtcbiAgdmFyIGhyZWYgPSB1cmwucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICBpZiAoaHJlZi5sZW5ndGggJiYgaHJlZlswXSAhPT0gJy8nICYmICFyZnVsbC50ZXN0KGhyZWYpKSB7XG4gICAgcmV0dXJuICdodHRwOi8vJyArIGhyZWY7XG4gIH1cbiAgcmV0dXJuIGhyZWY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VMaW5rSW5wdXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHRyaW0gKHJlbW92ZSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKHJlbW92ZSkge1xuICAgIGJlZm9yZVJlcGxhY2VyID0gYWZ0ZXJSZXBsYWNlciA9ICcnO1xuICB9XG4gIHNlbGYuc2VsZWN0aW9uID0gc2VsZi5zZWxlY3Rpb24ucmVwbGFjZSgvXihcXHMqKS8sIGJlZm9yZVJlcGxhY2VyKS5yZXBsYWNlKC8oXFxzKikkLywgYWZ0ZXJSZXBsYWNlcik7XG5cbiAgZnVuY3Rpb24gYmVmb3JlUmVwbGFjZXIgKHRleHQpIHtcbiAgICBzZWxmLmJlZm9yZSArPSB0ZXh0OyByZXR1cm4gJyc7XG4gIH1cbiAgZnVuY3Rpb24gYWZ0ZXJSZXBsYWNlciAodGV4dCkge1xuICAgIHNlbGYuYWZ0ZXIgPSB0ZXh0ICsgc2VsZi5hZnRlcjsgcmV0dXJuICcnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJpbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJ0cmltID0gL15cXHMrfFxccyskL2c7XG52YXIgcnNwYWNlcyA9IC9cXHMrL2c7XG5cbmZ1bmN0aW9uIGFkZENsYXNzIChlbCwgY2xzKSB7XG4gIHZhciBjdXJyZW50ID0gZWwuY2xhc3NOYW1lO1xuICBpZiAoY3VycmVudC5pbmRleE9mKGNscykgPT09IC0xKSB7XG4gICAgZWwuY2xhc3NOYW1lID0gKGN1cnJlbnQgKyAnICcgKyBjbHMpLnJlcGxhY2UocnRyaW0sICcnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBybUNsYXNzIChlbCwgY2xzKSB7XG4gIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKGNscywgJycpLnJlcGxhY2UocnRyaW0sICcnKS5yZXBsYWNlKHJzcGFjZXMsICcgJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZENsYXNzLFxuICBybTogcm1DbGFzc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZXh0ZW5kUmVnRXhwIChyZWdleCwgcHJlLCBwb3N0KSB7XG4gIHZhciBwYXR0ZXJuID0gcmVnZXgudG9TdHJpbmcoKTtcbiAgdmFyIGZsYWdzO1xuXG4gIHBhdHRlcm4gPSBwYXR0ZXJuLnJlcGxhY2UoL1xcLyhbZ2ltXSopJC8sIGNhcHR1cmVGbGFncyk7XG4gIHBhdHRlcm4gPSBwYXR0ZXJuLnJlcGxhY2UoLyheXFwvfFxcLyQpL2csICcnKTtcbiAgcGF0dGVybiA9IHByZSArIHBhdHRlcm4gKyBwb3N0O1xuICByZXR1cm4gbmV3IFJlZ0V4cChwYXR0ZXJuLCBmbGFncyk7XG5cbiAgZnVuY3Rpb24gY2FwdHVyZUZsYWdzIChhbGwsIGYpIHtcbiAgICBmbGFncyA9IGY7XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kUmVnRXhwO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBmaXhFT0wgKHRleHQpIHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKS5yZXBsYWNlKC9cXHIvZywgJ1xcbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpeEVPTDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIElucHV0U3RhdGUgPSByZXF1aXJlKCcuL0lucHV0U3RhdGUnKTtcblxuZnVuY3Rpb24gZ2V0Q29tbWFuZEhhbmRsZXIgKHN1cmZhY2UsIGhpc3RvcnksIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBoYW5kbGVDb21tYW5kIChlKSB7XG4gICAgc3VyZmFjZS5mb2N1cyhoaXN0b3J5LmlucHV0TW9kZSk7XG4gICAgaGlzdG9yeS5zZXRDb21tYW5kTW9kZSgpO1xuXG4gICAgdmFyIHN0YXRlID0gbmV3IElucHV0U3RhdGUoc3VyZmFjZSwgaGlzdG9yeS5pbnB1dE1vZGUpO1xuICAgIHZhciBjaHVua3MgPSBzdGF0ZS5nZXRDaHVua3MoKTtcbiAgICB2YXIgYXN5bmNIYW5kbGVyID0ge1xuICAgICAgYXN5bmM6IGFzeW5jLCBpbW1lZGlhdGU6IHRydWVcbiAgICB9O1xuXG4gICAgZm4uY2FsbChhc3luY0hhbmRsZXIsIGUsIGhpc3RvcnkuaW5wdXRNb2RlLCBjaHVua3MpO1xuXG4gICAgaWYgKGFzeW5jSGFuZGxlci5pbW1lZGlhdGUpIHtcbiAgICAgIGRvbmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhc3luYyAoKSB7XG4gICAgICBhc3luY0hhbmRsZXIuaW1tZWRpYXRlID0gZmFsc2U7XG4gICAgICByZXR1cm4gZG9uZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb25lICgpIHtcbiAgICAgIHN1cmZhY2UuZm9jdXMoaGlzdG9yeS5pbnB1dE1vZGUpO1xuICAgICAgc3RhdGUuc2V0Q2h1bmtzKGNodW5rcyk7XG4gICAgICBzdGF0ZS5yZXN0b3JlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldENvbW1hbmRIYW5kbGVyO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIHNlbGVjY2lvbiA9IHJlcXVpcmUoJ3NlbGVjY2lvbicpO1xudmFyIGZpeEVPTCA9IHJlcXVpcmUoJy4vZml4RU9MJyk7XG52YXIgbWFueSA9IHJlcXVpcmUoJy4vbWFueScpO1xudmFyIGNhc3QgPSByZXF1aXJlKCcuL2Nhc3QnKTtcbnZhciBnZXRTZWxlY3Rpb24gPSBzZWxlY2Npb24uZ2V0O1xudmFyIHNldFNlbGVjdGlvbiA9IHNlbGVjY2lvbi5zZXQ7XG52YXIgcm9wZW4gPSAvXig8W14+XSsoPzogW14+XSopPz4pLztcbnZhciByY2xvc2UgPSAvKDxcXC9bXj5dKz4pJC87XG5cbmZ1bmN0aW9uIHN1cmZhY2UgKHRleHRhcmVhLCBlZGl0YWJsZSwgZHJvcGFyZWEpIHtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0YXJlYTogdGV4dGFyZWEsXG4gICAgZWRpdGFibGU6IGVkaXRhYmxlLFxuICAgIGRyb3BhcmVhOiBkcm9wYXJlYSxcbiAgICBmb2N1czogc2V0Rm9jdXMsXG4gICAgcmVhZDogcmVhZCxcbiAgICB3cml0ZTogd3JpdGUsXG4gICAgY3VycmVudDogY3VycmVudCxcbiAgICB3cml0ZVNlbGVjdGlvbjogd3JpdGVTZWxlY3Rpb24sXG4gICAgcmVhZFNlbGVjdGlvbjogcmVhZFNlbGVjdGlvblxuICB9O1xuXG4gIGZ1bmN0aW9uIHNldEZvY3VzIChtb2RlKSB7XG4gICAgY3VycmVudChtb2RlKS5mb2N1cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3VycmVudCAobW9kZSkge1xuICAgIHJldHVybiBtb2RlID09PSAnd3lzaXd5ZycgPyBlZGl0YWJsZSA6IHRleHRhcmVhO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAobW9kZSkge1xuICAgIGlmIChtb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHJldHVybiBlZGl0YWJsZS5pbm5lckhUTUw7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChtb2RlLCB2YWx1ZSkge1xuICAgIGlmIChtb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIGVkaXRhYmxlLmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXh0YXJlYS52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlU2VsZWN0aW9uIChzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5tb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHdyaXRlU2VsZWN0aW9uRWRpdGFibGUoc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cml0ZVNlbGVjdGlvblRleHRhcmVhKHN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU2VsZWN0aW9uIChzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5tb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHJlYWRTZWxlY3Rpb25FZGl0YWJsZShzdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlYWRTZWxlY3Rpb25UZXh0YXJlYShzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVTZWxlY3Rpb25UZXh0YXJlYSAoc3RhdGUpIHtcbiAgICB2YXIgcmFuZ2U7XG4gICAgaWYgKHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ICE9PSB2b2lkIDApIHtcbiAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydCA9IHN0YXRlLnN0YXJ0O1xuICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uRW5kID0gc3RhdGUuZW5kO1xuICAgICAgdGV4dGFyZWEuc2Nyb2xsVG9wID0gc3RhdGUuc2Nyb2xsVG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jLnNlbGVjdGlvbikge1xuICAgICAgaWYgKGRvYy5hY3RpdmVFbGVtZW50ICYmIGRvYy5hY3RpdmVFbGVtZW50ICE9PSB0ZXh0YXJlYSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgcmFuZ2UgPSB0ZXh0YXJlYS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLXRleHRhcmVhLnZhbHVlLmxlbmd0aCk7XG4gICAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCAtdGV4dGFyZWEudmFsdWUubGVuZ3RoKTtcbiAgICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIHN0YXRlLmVuZCk7XG4gICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIHN0YXRlLnN0YXJ0KTtcbiAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRTZWxlY3Rpb25UZXh0YXJlYSAoc3RhdGUpIHtcbiAgICBpZiAodGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgIT09IHZvaWQgMCkge1xuICAgICAgc3RhdGUuc3RhcnQgPSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgIHN0YXRlLmVuZCA9IHRleHRhcmVhLnNlbGVjdGlvbkVuZDtcbiAgICB9IGVsc2UgaWYgKGRvYy5zZWxlY3Rpb24pIHtcbiAgICAgIGFuY2llbnRseVJlYWRTZWxlY3Rpb25UZXh0YXJlYShzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYW5jaWVudGx5UmVhZFNlbGVjdGlvblRleHRhcmVhIChzdGF0ZSkge1xuICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCAmJiBkb2MuYWN0aXZlRWxlbWVudCAhPT0gdGV4dGFyZWEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdGF0ZS50ZXh0ID0gZml4RU9MKHRleHRhcmVhLnZhbHVlKTtcblxuICAgIHZhciByYW5nZSA9IGRvYy5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICB2YXIgZml4ZWRSYW5nZSA9IGZpeEVPTChyYW5nZS50ZXh0KTtcbiAgICB2YXIgbWFya2VyID0gJ1xceDA3JztcbiAgICB2YXIgbWFya2VkUmFuZ2UgPSBtYXJrZXIgKyBmaXhlZFJhbmdlICsgbWFya2VyO1xuXG4gICAgcmFuZ2UudGV4dCA9IG1hcmtlZFJhbmdlO1xuXG4gICAgdmFyIGlucHV0VGV4dCA9IGZpeEVPTCh0ZXh0YXJlYS52YWx1ZSk7XG5cbiAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC1tYXJrZWRSYW5nZS5sZW5ndGgpO1xuICAgIHJhbmdlLnRleHQgPSBmaXhlZFJhbmdlO1xuICAgIHN0YXRlLnN0YXJ0ID0gaW5wdXRUZXh0LmluZGV4T2YobWFya2VyKTtcbiAgICBzdGF0ZS5lbmQgPSBpbnB1dFRleHQubGFzdEluZGV4T2YobWFya2VyKSAtIG1hcmtlci5sZW5ndGg7XG5cbiAgICB2YXIgZGlmZiA9IHN0YXRlLnRleHQubGVuZ3RoIC0gZml4RU9MKHRleHRhcmVhLnZhbHVlKS5sZW5ndGg7XG4gICAgaWYgKGRpZmYpIHtcbiAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLWZpeGVkUmFuZ2UubGVuZ3RoKTtcbiAgICAgIGZpeGVkUmFuZ2UgKz0gbWFueSgnXFxuJywgZGlmZik7XG4gICAgICBzdGF0ZS5lbmQgKz0gZGlmZjtcbiAgICAgIHJhbmdlLnRleHQgPSBmaXhlZFJhbmdlO1xuICAgIH1cbiAgICBzdGF0ZS5zZWxlY3QoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlU2VsZWN0aW9uRWRpdGFibGUgKHN0YXRlKSB7XG4gICAgdmFyIGNodW5rcyA9IHN0YXRlLmNhY2hlZENodW5rcyB8fCBzdGF0ZS5nZXRDaHVua3MoKTtcbiAgICB2YXIgc3RhcnQgPSBjaHVua3MuYmVmb3JlLmxlbmd0aDtcbiAgICB2YXIgZW5kID0gc3RhcnQgKyBjaHVua3Muc2VsZWN0aW9uLmxlbmd0aDtcbiAgICB2YXIgcCA9IHt9O1xuXG4gICAgd2FsayhlZGl0YWJsZS5maXJzdENoaWxkLCBwZWVrKTtcbiAgICBlZGl0YWJsZS5mb2N1cygpO1xuICAgIHNldFNlbGVjdGlvbihwKTtcblxuICAgIGZ1bmN0aW9uIHBlZWsgKGNvbnRleHQsIGVsKSB7XG4gICAgICB2YXIgY3Vyc29yID0gY29udGV4dC50ZXh0Lmxlbmd0aDtcbiAgICAgIHZhciBjb250ZW50ID0gcmVhZE5vZGUoZWwpLmxlbmd0aDtcbiAgICAgIHZhciBzdW0gPSBjdXJzb3IgKyBjb250ZW50O1xuICAgICAgaWYgKCFwLnN0YXJ0Q29udGFpbmVyICYmIHN1bSA+PSBzdGFydCkge1xuICAgICAgICBwLnN0YXJ0Q29udGFpbmVyID0gZWw7XG4gICAgICAgIHAuc3RhcnRPZmZzZXQgPSBib3VuZGVkKHN0YXJ0IC0gY3Vyc29yKTtcbiAgICAgIH1cbiAgICAgIGlmICghcC5lbmRDb250YWluZXIgJiYgc3VtID49IGVuZCkge1xuICAgICAgICBwLmVuZENvbnRhaW5lciA9IGVsO1xuICAgICAgICBwLmVuZE9mZnNldCA9IGJvdW5kZWQoZW5kIC0gY3Vyc29yKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYm91bmRlZCAob2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihjb250ZW50LCBvZmZzZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU2VsZWN0aW9uRWRpdGFibGUgKHN0YXRlKSB7XG4gICAgdmFyIHNlbCA9IGdldFNlbGVjdGlvbigpO1xuICAgIHZhciBkaXN0YW5jZSA9IHdhbGsoZWRpdGFibGUuZmlyc3RDaGlsZCwgcGVlayk7XG4gICAgdmFyIHN0YXJ0ID0gZGlzdGFuY2Uuc3RhcnQgfHwgMDtcbiAgICB2YXIgZW5kID0gZGlzdGFuY2UuZW5kIHx8IDA7XG5cbiAgICBzdGF0ZS50ZXh0ID0gZGlzdGFuY2UudGV4dDtcblxuICAgIGlmIChlbmQgPiBzdGFydCkge1xuICAgICAgc3RhdGUuc3RhcnQgPSBzdGFydDtcbiAgICAgIHN0YXRlLmVuZCA9IGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuc3RhcnQgPSBlbmQ7XG4gICAgICBzdGF0ZS5lbmQgPSBzdGFydDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwZWVrIChjb250ZXh0LCBlbCkge1xuICAgICAgaWYgKGVsID09PSBzZWwuYW5jaG9yTm9kZSkge1xuICAgICAgICBjb250ZXh0LnN0YXJ0ID0gY29udGV4dC50ZXh0Lmxlbmd0aCArIHNlbC5hbmNob3JPZmZzZXQ7XG4gICAgICB9XG4gICAgICBpZiAoZWwgPT09IHNlbC5mb2N1c05vZGUpIHtcbiAgICAgICAgY29udGV4dC5lbmQgPSBjb250ZXh0LnRleHQubGVuZ3RoICsgc2VsLmZvY3VzT2Zmc2V0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdhbGsgKGVsLCBwZWVrLCBjdHgsIHNpYmxpbmdzKSB7XG4gICAgdmFyIGNvbnRleHQgPSBjdHggfHwgeyB0ZXh0OiAnJyB9O1xuXG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuXG4gICAgdmFyIGVsTm9kZSA9IGVsLm5vZGVUeXBlID09PSAxO1xuICAgIHZhciB0ZXh0Tm9kZSA9IGVsLm5vZGVUeXBlID09PSAzO1xuXG4gICAgcGVlayhjb250ZXh0LCBlbCk7XG5cbiAgICBpZiAodGV4dE5vZGUpIHtcbiAgICAgIGNvbnRleHQudGV4dCArPSByZWFkTm9kZShlbCk7XG4gICAgfVxuICAgIGlmIChlbE5vZGUpIHtcbiAgICAgIGlmIChlbC5vdXRlckhUTUwubWF0Y2gocm9wZW4pKSB7IGNvbnRleHQudGV4dCArPSBSZWdFeHAuJDE7IH1cbiAgICAgIGNhc3QoZWwuY2hpbGROb2RlcykuZm9yRWFjaCh3YWxrQ2hpbGRyZW4pO1xuICAgICAgaWYgKGVsLm91dGVySFRNTC5tYXRjaChyY2xvc2UpKSB7IGNvbnRleHQudGV4dCArPSBSZWdFeHAuJDE7IH1cbiAgICB9XG4gICAgaWYgKHNpYmxpbmdzICE9PSBmYWxzZSAmJiBlbC5uZXh0U2libGluZykge1xuICAgICAgcmV0dXJuIHdhbGsoZWwubmV4dFNpYmxpbmcsIHBlZWssIGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dDtcblxuICAgIGZ1bmN0aW9uIHdhbGtDaGlsZHJlbiAoY2hpbGQpIHtcbiAgICAgIHdhbGsoY2hpbGQsIHBlZWssIGNvbnRleHQsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkTm9kZSAoZWwpIHtcbiAgICByZXR1cm4gZWwubm9kZVR5cGUgPT09IDMgPyBmaXhFT0woZWwudGV4dENvbnRlbnQgfHwgZWwuaW5uZXJUZXh0IHx8ICcnKSA6ICcnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3VyZmFjZTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5blpYUlRkWEptWVdObExtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnWkc5aklEMGdaMnh2WW1Gc0xtUnZZM1Z0Wlc1ME8xeHVkbUZ5SUhObGJHVmpZMmx2YmlBOUlISmxjWFZwY21Vb0ozTmxiR1ZqWTJsdmJpY3BPMXh1ZG1GeUlHWnBlRVZQVENBOUlISmxjWFZwY21Vb0p5NHZabWw0UlU5TUp5azdYRzUyWVhJZ2JXRnVlU0E5SUhKbGNYVnBjbVVvSnk0dmJXRnVlU2NwTzF4dWRtRnlJR05oYzNRZ1BTQnlaWEYxYVhKbEtDY3VMMk5oYzNRbktUdGNiblpoY2lCblpYUlRaV3hsWTNScGIyNGdQU0J6Wld4bFkyTnBiMjR1WjJWME8xeHVkbUZ5SUhObGRGTmxiR1ZqZEdsdmJpQTlJSE5sYkdWalkybHZiaTV6WlhRN1hHNTJZWElnY205d1pXNGdQU0F2WGlnOFcxNCtYU3NvUHpvZ1cxNCtYU29wUHo0cEx6dGNiblpoY2lCeVkyeHZjMlVnUFNBdktEeGNYQzliWGo1ZEt6NHBKQzg3WEc1Y2JtWjFibU4wYVc5dUlITjFjbVpoWTJVZ0tIUmxlSFJoY21WaExDQmxaR2wwWVdKc1pTd2daSEp2Y0dGeVpXRXBJSHRjYmlBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0IwWlhoMFlYSmxZVG9nZEdWNGRHRnlaV0VzWEc0Z0lDQWdaV1JwZEdGaWJHVTZJR1ZrYVhSaFlteGxMRnh1SUNBZ0lHUnliM0JoY21WaE9pQmtjbTl3WVhKbFlTeGNiaUFnSUNCbWIyTjFjem9nYzJWMFJtOWpkWE1zWEc0Z0lDQWdjbVZoWkRvZ2NtVmhaQ3hjYmlBZ0lDQjNjbWwwWlRvZ2QzSnBkR1VzWEc0Z0lDQWdZM1Z5Y21WdWREb2dZM1Z5Y21WdWRDeGNiaUFnSUNCM2NtbDBaVk5sYkdWamRHbHZiam9nZDNKcGRHVlRaV3hsWTNScGIyNHNYRzRnSUNBZ2NtVmhaRk5sYkdWamRHbHZiam9nY21WaFpGTmxiR1ZqZEdsdmJseHVJQ0I5TzF4dVhHNGdJR1oxYm1OMGFXOXVJSE5sZEVadlkzVnpJQ2h0YjJSbEtTQjdYRzRnSUNBZ1kzVnljbVZ1ZENodGIyUmxLUzVtYjJOMWN5Z3BPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWTNWeWNtVnVkQ0FvYlc5a1pTa2dlMXh1SUNBZ0lISmxkSFZ5YmlCdGIyUmxJRDA5UFNBbmQzbHphWGQ1WnljZ1B5QmxaR2wwWVdKc1pTQTZJSFJsZUhSaGNtVmhPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnY21WaFpDQW9iVzlrWlNrZ2UxeHVJQ0FnSUdsbUlDaHRiMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQmxaR2wwWVdKc1pTNXBibTVsY2toVVRVdzdYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGRIVnliaUIwWlhoMFlYSmxZUzUyWVd4MVpUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSGR5YVhSbElDaHRiMlJsTENCMllXeDFaU2tnZTF4dUlDQWdJR2xtSUNodGIyUmxJRDA5UFNBbmQzbHphWGQ1WnljcElIdGNiaUFnSUNBZ0lHVmthWFJoWW14bExtbHVibVZ5U0ZSTlRDQTlJSFpoYkhWbE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0IwWlhoMFlYSmxZUzUyWVd4MVpTQTlJSFpoYkhWbE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlIZHlhWFJsVTJWc1pXTjBhVzl1SUNoemRHRjBaU2tnZTF4dUlDQWdJR2xtSUNoemRHRjBaUzV0YjJSbElEMDlQU0FuZDNsemFYZDVaeWNwSUh0Y2JpQWdJQ0FnSUhkeWFYUmxVMlZzWldOMGFXOXVSV1JwZEdGaWJHVW9jM1JoZEdVcE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0IzY21sMFpWTmxiR1ZqZEdsdmJsUmxlSFJoY21WaEtITjBZWFJsS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCeVpXRmtVMlZzWldOMGFXOXVJQ2h6ZEdGMFpTa2dlMXh1SUNBZ0lHbG1JQ2h6ZEdGMFpTNXRiMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y3BJSHRjYmlBZ0lDQWdJSEpsWVdSVFpXeGxZM1JwYjI1RlpHbDBZV0pzWlNoemRHRjBaU2s3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lISmxZV1JUWld4bFkzUnBiMjVVWlhoMFlYSmxZU2h6ZEdGMFpTazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdkM0pwZEdWVFpXeGxZM1JwYjI1VVpYaDBZWEpsWVNBb2MzUmhkR1VwSUh0Y2JpQWdJQ0IyWVhJZ2NtRnVaMlU3WEc0Z0lDQWdhV1lnS0hSbGVIUmhjbVZoTG5ObGJHVmpkR2x2YmxOMFlYSjBJQ0U5UFNCMmIybGtJREFwSUh0Y2JpQWdJQ0FnSUhSbGVIUmhjbVZoTG1adlkzVnpLQ2s3WEc0Z0lDQWdJQ0IwWlhoMFlYSmxZUzV6Wld4bFkzUnBiMjVUZEdGeWRDQTlJSE4wWVhSbExuTjBZWEowTzF4dUlDQWdJQ0FnZEdWNGRHRnlaV0V1YzJWc1pXTjBhVzl1Ulc1a0lEMGdjM1JoZEdVdVpXNWtPMXh1SUNBZ0lDQWdkR1Y0ZEdGeVpXRXVjMk55YjJ4c1ZHOXdJRDBnYzNSaGRHVXVjMk55YjJ4c1ZHOXdPMXh1SUNBZ0lIMGdaV3h6WlNCcFppQW9aRzlqTG5ObGJHVmpkR2x2YmlrZ2UxeHVJQ0FnSUNBZ2FXWWdLR1J2WXk1aFkzUnBkbVZGYkdWdFpXNTBJQ1ltSUdSdll5NWhZM1JwZG1WRmJHVnRaVzUwSUNFOVBTQjBaWGgwWVhKbFlTa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQjBaWGgwWVhKbFlTNW1iMk4xY3lncE8xeHVJQ0FnSUNBZ2NtRnVaMlVnUFNCMFpYaDBZWEpsWVM1amNtVmhkR1ZVWlhoMFVtRnVaMlVvS1R0Y2JpQWdJQ0FnSUhKaGJtZGxMbTF2ZG1WVGRHRnlkQ2duWTJoaGNtRmpkR1Z5Snl3Z0xYUmxlSFJoY21WaExuWmhiSFZsTG14bGJtZDBhQ2s3WEc0Z0lDQWdJQ0J5WVc1blpTNXRiM1psUlc1a0tDZGphR0Z5WVdOMFpYSW5MQ0F0ZEdWNGRHRnlaV0V1ZG1Gc2RXVXViR1Z1WjNSb0tUdGNiaUFnSUNBZ0lISmhibWRsTG0xdmRtVkZibVFvSjJOb1lYSmhZM1JsY2ljc0lITjBZWFJsTG1WdVpDazdYRzRnSUNBZ0lDQnlZVzVuWlM1dGIzWmxVM1JoY25Rb0oyTm9ZWEpoWTNSbGNpY3NJSE4wWVhSbExuTjBZWEowS1R0Y2JpQWdJQ0FnSUhKaGJtZGxMbk5sYkdWamRDZ3BPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSEpsWVdSVFpXeGxZM1JwYjI1VVpYaDBZWEpsWVNBb2MzUmhkR1VwSUh0Y2JpQWdJQ0JwWmlBb2RHVjRkR0Z5WldFdWMyVnNaV04wYVc5dVUzUmhjblFnSVQwOUlIWnZhV1FnTUNrZ2UxeHVJQ0FnSUNBZ2MzUmhkR1V1YzNSaGNuUWdQU0IwWlhoMFlYSmxZUzV6Wld4bFkzUnBiMjVUZEdGeWREdGNiaUFnSUNBZ0lITjBZWFJsTG1WdVpDQTlJSFJsZUhSaGNtVmhMbk5sYkdWamRHbHZia1Z1WkR0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0dSdll5NXpaV3hsWTNScGIyNHBJSHRjYmlBZ0lDQWdJR0Z1WTJsbGJuUnNlVkpsWVdSVFpXeGxZM1JwYjI1VVpYaDBZWEpsWVNoemRHRjBaU2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWVc1amFXVnVkR3g1VW1WaFpGTmxiR1ZqZEdsdmJsUmxlSFJoY21WaElDaHpkR0YwWlNrZ2UxeHVJQ0FnSUdsbUlDaGtiMk11WVdOMGFYWmxSV3hsYldWdWRDQW1KaUJrYjJNdVlXTjBhWFpsUld4bGJXVnVkQ0FoUFQwZ2RHVjRkR0Z5WldFcElIdGNiaUFnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0J6ZEdGMFpTNTBaWGgwSUQwZ1ptbDRSVTlNS0hSbGVIUmhjbVZoTG5aaGJIVmxLVHRjYmx4dUlDQWdJSFpoY2lCeVlXNW5aU0E5SUdSdll5NXpaV3hsWTNScGIyNHVZM0psWVhSbFVtRnVaMlVvS1R0Y2JpQWdJQ0IyWVhJZ1ptbDRaV1JTWVc1blpTQTlJR1pwZUVWUFRDaHlZVzVuWlM1MFpYaDBLVHRjYmlBZ0lDQjJZWElnYldGeWEyVnlJRDBnSjF4Y2VEQTNKenRjYmlBZ0lDQjJZWElnYldGeWEyVmtVbUZ1WjJVZ1BTQnRZWEpyWlhJZ0t5Qm1hWGhsWkZKaGJtZGxJQ3NnYldGeWEyVnlPMXh1WEc0Z0lDQWdjbUZ1WjJVdWRHVjRkQ0E5SUcxaGNtdGxaRkpoYm1kbE8xeHVYRzRnSUNBZ2RtRnlJR2x1Y0hWMFZHVjRkQ0E5SUdacGVFVlBUQ2gwWlhoMFlYSmxZUzUyWVd4MVpTazdYRzVjYmlBZ0lDQnlZVzVuWlM1dGIzWmxVM1JoY25Rb0oyTm9ZWEpoWTNSbGNpY3NJQzF0WVhKclpXUlNZVzVuWlM1c1pXNW5kR2dwTzF4dUlDQWdJSEpoYm1kbExuUmxlSFFnUFNCbWFYaGxaRkpoYm1kbE8xeHVJQ0FnSUhOMFlYUmxMbk4wWVhKMElEMGdhVzV3ZFhSVVpYaDBMbWx1WkdWNFQyWW9iV0Z5YTJWeUtUdGNiaUFnSUNCemRHRjBaUzVsYm1RZ1BTQnBibkIxZEZSbGVIUXViR0Z6ZEVsdVpHVjRUMllvYldGeWEyVnlLU0F0SUcxaGNtdGxjaTVzWlc1bmRHZzdYRzVjYmlBZ0lDQjJZWElnWkdsbVppQTlJSE4wWVhSbExuUmxlSFF1YkdWdVozUm9JQzBnWm1sNFJVOU1LSFJsZUhSaGNtVmhMblpoYkhWbEtTNXNaVzVuZEdnN1hHNGdJQ0FnYVdZZ0tHUnBabVlwSUh0Y2JpQWdJQ0FnSUhKaGJtZGxMbTF2ZG1WVGRHRnlkQ2duWTJoaGNtRmpkR1Z5Snl3Z0xXWnBlR1ZrVW1GdVoyVXViR1Z1WjNSb0tUdGNiaUFnSUNBZ0lHWnBlR1ZrVW1GdVoyVWdLejBnYldGdWVTZ25YRnh1Snl3Z1pHbG1aaWs3WEc0Z0lDQWdJQ0J6ZEdGMFpTNWxibVFnS3owZ1pHbG1aanRjYmlBZ0lDQWdJSEpoYm1kbExuUmxlSFFnUFNCbWFYaGxaRkpoYm1kbE8xeHVJQ0FnSUgxY2JpQWdJQ0J6ZEdGMFpTNXpaV3hsWTNRb0tUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSGR5YVhSbFUyVnNaV04wYVc5dVJXUnBkR0ZpYkdVZ0tITjBZWFJsS1NCN1hHNGdJQ0FnZG1GeUlHTm9kVzVyY3lBOUlITjBZWFJsTG1OaFkyaGxaRU5vZFc1cmN5QjhmQ0J6ZEdGMFpTNW5aWFJEYUhWdWEzTW9LVHRjYmlBZ0lDQjJZWElnYzNSaGNuUWdQU0JqYUhWdWEzTXVZbVZtYjNKbExteGxibWQwYUR0Y2JpQWdJQ0IyWVhJZ1pXNWtJRDBnYzNSaGNuUWdLeUJqYUhWdWEzTXVjMlZzWldOMGFXOXVMbXhsYm1kMGFEdGNiaUFnSUNCMllYSWdjQ0E5SUh0OU8xeHVYRzRnSUNBZ2QyRnNheWhsWkdsMFlXSnNaUzVtYVhKemRFTm9hV3hrTENCd1pXVnJLVHRjYmlBZ0lDQmxaR2wwWVdKc1pTNW1iMk4xY3lncE8xeHVJQ0FnSUhObGRGTmxiR1ZqZEdsdmJpaHdLVHRjYmx4dUlDQWdJR1oxYm1OMGFXOXVJSEJsWldzZ0tHTnZiblJsZUhRc0lHVnNLU0I3WEc0Z0lDQWdJQ0IyWVhJZ1kzVnljMjl5SUQwZ1kyOXVkR1Y0ZEM1MFpYaDBMbXhsYm1kMGFEdGNiaUFnSUNBZ0lIWmhjaUJqYjI1MFpXNTBJRDBnY21WaFpFNXZaR1VvWld3cExteGxibWQwYUR0Y2JpQWdJQ0FnSUhaaGNpQnpkVzBnUFNCamRYSnpiM0lnS3lCamIyNTBaVzUwTzF4dUlDQWdJQ0FnYVdZZ0tDRndMbk4wWVhKMFEyOXVkR0ZwYm1WeUlDWW1JSE4xYlNBK1BTQnpkR0Z5ZENrZ2UxeHVJQ0FnSUNBZ0lDQndMbk4wWVhKMFEyOXVkR0ZwYm1WeUlEMGdaV3c3WEc0Z0lDQWdJQ0FnSUhBdWMzUmhjblJQWm1aelpYUWdQU0JpYjNWdVpHVmtLSE4wWVhKMElDMGdZM1Z5YzI5eUtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lHbG1JQ2doY0M1bGJtUkRiMjUwWVdsdVpYSWdKaVlnYzNWdElENDlJR1Z1WkNrZ2UxeHVJQ0FnSUNBZ0lDQndMbVZ1WkVOdmJuUmhhVzVsY2lBOUlHVnNPMXh1SUNBZ0lDQWdJQ0J3TG1WdVpFOW1abk5sZENBOUlHSnZkVzVrWldRb1pXNWtJQzBnWTNWeWMyOXlLVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnWm5WdVkzUnBiMjRnWW05MWJtUmxaQ0FvYjJabWMyVjBLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJOWVhSb0xtMWhlQ2d3TENCTllYUm9MbTFwYmloamIyNTBaVzUwTENCdlptWnpaWFFwS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCeVpXRmtVMlZzWldOMGFXOXVSV1JwZEdGaWJHVWdLSE4wWVhSbEtTQjdYRzRnSUNBZ2RtRnlJSE5sYkNBOUlHZGxkRk5sYkdWamRHbHZiaWdwTzF4dUlDQWdJSFpoY2lCa2FYTjBZVzVqWlNBOUlIZGhiR3NvWldScGRHRmliR1V1Wm1seWMzUkRhR2xzWkN3Z2NHVmxheWs3WEc0Z0lDQWdkbUZ5SUhOMFlYSjBJRDBnWkdsemRHRnVZMlV1YzNSaGNuUWdmSHdnTUR0Y2JpQWdJQ0IyWVhJZ1pXNWtJRDBnWkdsemRHRnVZMlV1Wlc1a0lIeDhJREE3WEc1Y2JpQWdJQ0J6ZEdGMFpTNTBaWGgwSUQwZ1pHbHpkR0Z1WTJVdWRHVjRkRHRjYmx4dUlDQWdJR2xtSUNobGJtUWdQaUJ6ZEdGeWRDa2dlMXh1SUNBZ0lDQWdjM1JoZEdVdWMzUmhjblFnUFNCemRHRnlkRHRjYmlBZ0lDQWdJSE4wWVhSbExtVnVaQ0E5SUdWdVpEdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnYzNSaGRHVXVjM1JoY25RZ1BTQmxibVE3WEc0Z0lDQWdJQ0J6ZEdGMFpTNWxibVFnUFNCemRHRnlkRHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQm1kVzVqZEdsdmJpQndaV1ZySUNoamIyNTBaWGgwTENCbGJDa2dlMXh1SUNBZ0lDQWdhV1lnS0dWc0lEMDlQU0J6Wld3dVlXNWphRzl5VG05a1pTa2dlMXh1SUNBZ0lDQWdJQ0JqYjI1MFpYaDBMbk4wWVhKMElEMGdZMjl1ZEdWNGRDNTBaWGgwTG14bGJtZDBhQ0FySUhObGJDNWhibU5vYjNKUFptWnpaWFE3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JwWmlBb1pXd2dQVDA5SUhObGJDNW1iMk4xYzA1dlpHVXBJSHRjYmlBZ0lDQWdJQ0FnWTI5dWRHVjRkQzVsYm1RZ1BTQmpiMjUwWlhoMExuUmxlSFF1YkdWdVozUm9JQ3NnYzJWc0xtWnZZM1Z6VDJabWMyVjBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSGRoYkdzZ0tHVnNMQ0J3WldWckxDQmpkSGdzSUhOcFlteHBibWR6S1NCN1hHNGdJQ0FnZG1GeUlHTnZiblJsZUhRZ1BTQmpkSGdnZkh3Z2V5QjBaWGgwT2lBbkp5QjlPMXh1WEc0Z0lDQWdhV1lnS0NGbGJDa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHTnZiblJsZUhRN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnZG1GeUlHVnNUbTlrWlNBOUlHVnNMbTV2WkdWVWVYQmxJRDA5UFNBeE8xeHVJQ0FnSUhaaGNpQjBaWGgwVG05a1pTQTlJR1ZzTG01dlpHVlVlWEJsSUQwOVBTQXpPMXh1WEc0Z0lDQWdjR1ZsYXloamIyNTBaWGgwTENCbGJDazdYRzVjYmlBZ0lDQnBaaUFvZEdWNGRFNXZaR1VwSUh0Y2JpQWdJQ0FnSUdOdmJuUmxlSFF1ZEdWNGRDQXJQU0J5WldGa1RtOWtaU2hsYkNrN1hHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNobGJFNXZaR1VwSUh0Y2JpQWdJQ0FnSUdsbUlDaGxiQzV2ZFhSbGNraFVUVXd1YldGMFkyZ29jbTl3Wlc0cEtTQjdJR052Ym5SbGVIUXVkR1Y0ZENBclBTQlNaV2RGZUhBdUpERTdJSDFjYmlBZ0lDQWdJR05oYzNRb1pXd3VZMmhwYkdST2IyUmxjeWt1Wm05eVJXRmphQ2gzWVd4clEyaHBiR1J5Wlc0cE8xeHVJQ0FnSUNBZ2FXWWdLR1ZzTG05MWRHVnlTRlJOVEM1dFlYUmphQ2h5WTJ4dmMyVXBLU0I3SUdOdmJuUmxlSFF1ZEdWNGRDQXJQU0JTWldkRmVIQXVKREU3SUgxY2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0hOcFlteHBibWR6SUNFOVBTQm1ZV3h6WlNBbUppQmxiQzV1WlhoMFUybGliR2x1WnlrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhkaGJHc29aV3d1Ym1WNGRGTnBZbXhwYm1jc0lIQmxaV3NzSUdOdmJuUmxlSFFwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1kyOXVkR1Y0ZER0Y2JseHVJQ0FnSUdaMWJtTjBhVzl1SUhkaGJHdERhR2xzWkhKbGJpQW9ZMmhwYkdRcElIdGNiaUFnSUNBZ0lIZGhiR3NvWTJocGJHUXNJSEJsWldzc0lHTnZiblJsZUhRc0lHWmhiSE5sS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCeVpXRmtUbTlrWlNBb1pXd3BJSHRjYmlBZ0lDQnlaWFIxY200Z1pXd3VibTlrWlZSNWNHVWdQVDA5SURNZ1B5Qm1hWGhGVDB3b1pXd3VkR1Y0ZEVOdmJuUmxiblFnZkh3Z1pXd3VhVzV1WlhKVVpYaDBJSHg4SUNjbktTQTZJQ2NuTzF4dUlDQjlYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2MzVnlabUZqWlR0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBnZXRUZXh0IChlbCkge1xuICByZXR1cm4gZWwuaW5uZXJUZXh0IHx8IGVsLnRleHRDb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFRleHQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0cmltQ2h1bmtzID0gcmVxdWlyZSgnLi4vY2h1bmtzL3RyaW0nKTtcblxuZnVuY3Rpb24gSHRtbENodW5rcyAoKSB7XG59XG5cbkh0bWxDaHVua3MucHJvdG90eXBlLnRyaW0gPSB0cmltQ2h1bmtzO1xuXG5IdG1sQ2h1bmtzLnByb3RvdHlwZS5maW5kVGFncyA9IGZ1bmN0aW9uICgpIHtcbn07XG5cbkh0bWxDaHVua3MucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiAoKSB7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEh0bWxDaHVua3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHdyYXBwaW5nID0gcmVxdWlyZSgnLi93cmFwcGluZycpO1xuXG5mdW5jdGlvbiBibG9ja3F1b3RlIChjaHVua3MpIHtcbiAgd3JhcHBpbmcoJ2Jsb2NrcXVvdGUnLCBzdHJpbmdzLnBsYWNlaG9sZGVycy5xdW90ZSwgY2h1bmtzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBibG9ja3F1b3RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcblxuZnVuY3Rpb24gYm9sZE9ySXRhbGljIChjaHVua3MsIHR5cGUpIHtcbiAgd3JhcHBpbmcodHlwZSA9PT0gJ2JvbGQnID8gJ3N0cm9uZycgOiAnZW0nLCBzdHJpbmdzLnBsYWNlaG9sZGVyc1t0eXBlXSwgY2h1bmtzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBib2xkT3JJdGFsaWM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHdyYXBwaW5nID0gcmVxdWlyZSgnLi93cmFwcGluZycpO1xuXG5mdW5jdGlvbiBjb2RlYmxvY2sgKGNodW5rcykge1xuICB3cmFwcGluZygncHJlPjxjb2RlJywgc3RyaW5ncy5wbGFjZWhvbGRlcnMuY29kZSwgY2h1bmtzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb2RlYmxvY2s7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHJsZWFkaW5nID0gLzxoKFsxLTZdKSggW14+XSopPz4kLztcbnZhciBydHJhaWxpbmcgPSAvXjxcXC9oKFsxLTZdKT4vO1xuXG5mdW5jdGlvbiBoZWFkaW5nIChjaHVua3MpIHtcbiAgY2h1bmtzLnRyaW0oKTtcblxuICB2YXIgdHJhaWwgPSBydHJhaWxpbmcuZXhlYyhjaHVua3MuYWZ0ZXIpO1xuICB2YXIgbGVhZCA9IHJsZWFkaW5nLmV4ZWMoY2h1bmtzLmJlZm9yZSk7XG4gIGlmIChsZWFkICYmIHRyYWlsICYmIGxlYWRbMV0gPT09IHRyYWlsWzFdKSB7XG4gICAgc3dhcCgpO1xuICB9IGVsc2Uge1xuICAgIGFkZCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3dhcCAoKSB7XG4gICAgdmFyIGxldmVsID0gcGFyc2VJbnQobGVhZFsxXSwgMTApO1xuICAgIHZhciBuZXh0ID0gbGV2ZWwgPD0gMSA/IDQgOiBsZXZlbCAtIDE7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVhZGluZywgJzxoJyArIG5leHQgKyAnPicpO1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJ0cmFpbGluZywgJzwvaCcgKyBuZXh0ICsgJz4nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZCAoKSB7XG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMuaGVhZGluZztcbiAgICB9XG4gICAgY2h1bmtzLmJlZm9yZSArPSAnPGgxPic7XG4gICAgY2h1bmtzLmFmdGVyID0gJzwvaDE+JyArIGNodW5rcy5hZnRlcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhlYWRpbmc7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGhyIChjaHVua3MpIHtcbiAgY2h1bmtzLmJlZm9yZSArPSAnXFxuPGhyPlxcbic7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSAnJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBocjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIG9uY2UgPSByZXF1aXJlKCcuLi9vbmNlJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBwYXJzZUxpbmtJbnB1dCA9IHJlcXVpcmUoJy4uL2NodW5rcy9wYXJzZUxpbmtJbnB1dCcpO1xudmFyIHJsZWFkaW5nID0gLzxhKCBbXj5dKik/PiQvO1xudmFyIHJ0cmFpbGluZyA9IC9ePFxcL2E+LztcbnZhciByaW1hZ2UgPSAvPGltZyggW14+XSopP1xcLz4kLztcblxuZnVuY3Rpb24gbGlua09ySW1hZ2VPckF0dGFjaG1lbnQgKGNodW5rcywgb3B0aW9ucykge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgdmFyIGltYWdlID0gdHlwZSA9PT0gJ2ltYWdlJztcbiAgdmFyIHJlc3VtZTtcblxuICBpZiAodHlwZSAhPT0gJ2F0dGFjaG1lbnQnKSB7XG4gICAgY2h1bmtzLnRyaW0oKTtcbiAgfVxuXG4gIGlmIChyZW1vdmFsKCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXN1bWUgPSB0aGlzLmFzeW5jKCk7XG5cbiAgb3B0aW9ucy5wcm9tcHRzLmNsb3NlKCk7XG4gIChvcHRpb25zLnByb21wdHNbdHlwZV0gfHwgb3B0aW9ucy5wcm9tcHRzLmxpbmspKG9wdGlvbnMsIG9uY2UocmVzb2x2ZWQpKTtcblxuICBmdW5jdGlvbiByZW1vdmFsICgpIHtcbiAgICBpZiAoaW1hZ2UpIHtcbiAgICAgIGlmIChyaW1hZ2UudGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocnRyYWlsaW5nLmV4ZWMoY2h1bmtzLmFmdGVyKSAmJiBybGVhZGluZy5leGVjKGNodW5rcy5iZWZvcmUpKSB7XG4gICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJsZWFkaW5nLCAnJyk7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShydHJhaWxpbmcsICcnKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmVkIChyZXN1bHQpIHtcbiAgICB2YXIgcGFydHM7XG4gICAgdmFyIGxpbmtzID0gcmVzdWx0LmRlZmluaXRpb25zLm1hcChwYXJzZUxpbmtJbnB1dCkuZmlsdGVyKGxvbmcpO1xuICAgIGlmIChsaW5rcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlc3VtZSgpOyByZXR1cm47XG4gICAgfVxuICAgIHZhciBsaW5rID0gbGlua3NbMF07XG5cbiAgICBpZiAodHlwZSA9PT0gJ2F0dGFjaG1lbnQnKSB7XG4gICAgICBwYXJ0cyA9IG9wdGlvbnMubWVyZ2VIdG1sQW5kQXR0YWNobWVudChjaHVua3MuYmVmb3JlICsgY2h1bmtzLnNlbGVjdGlvbiArIGNodW5rcy5hZnRlciwgbGluayk7XG4gICAgICBjaHVua3MuYmVmb3JlID0gcGFydHMuYmVmb3JlO1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHBhcnRzLnNlbGVjdGlvbjtcbiAgICAgIGNodW5rcy5hZnRlciA9IHBhcnRzLmFmdGVyO1xuICAgICAgcmVzdW1lKCk7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKG9wdGlvbnMuc3VyZmFjZS50ZXh0YXJlYSwgJ3dvb2ZtYXJrLW1vZGUtY2hhbmdlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGltYWdlKSB7XG4gICAgICBpbWFnZVdyYXAobGluaywgbGlua3Muc2xpY2UoMSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaW5rV3JhcChsaW5rLCBsaW5rcy5zbGljZSgxKSk7XG4gICAgfVxuXG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnNbdHlwZV07XG4gICAgfVxuICAgIHJlc3VtZSgpO1xuXG4gICAgZnVuY3Rpb24gbG9uZyAobGluaykge1xuICAgICAgcmV0dXJuIGxpbmsuaHJlZi5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRpdGxlIChsaW5rKSB7XG4gICAgICByZXR1cm4gbGluay50aXRsZSA/ICcgdGl0bGU9XCInICsgbGluay50aXRsZSArICdcIicgOiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbWFnZVdyYXAgKGxpbmssIHJlc3QpIHtcbiAgICAgIHZhciBhZnRlciA9IGNodW5rcy5hZnRlcjtcbiAgICAgIGNodW5rcy5iZWZvcmUgKz0gdGFnb3BlbihsaW5rKTtcbiAgICAgIGNodW5rcy5hZnRlciA9IHRhZ2Nsb3NlKGxpbmspO1xuICAgICAgaWYgKHJlc3QubGVuZ3RoKSB7XG4gICAgICAgIGNodW5rcy5hZnRlciArPSByZXN0Lm1hcCh0b0Fub3RoZXJJbWFnZSkuam9pbignJyk7XG4gICAgICB9XG4gICAgICBjaHVua3MuYWZ0ZXIgKz0gYWZ0ZXI7XG4gICAgICBmdW5jdGlvbiB0YWdvcGVuIChsaW5rKSB7IHJldHVybiAnPGltZyBzcmM9XCInICsgbGluay5ocmVmICsgJ1wiIGFsdD1cIic7IH1cbiAgICAgIGZ1bmN0aW9uIHRhZ2Nsb3NlIChsaW5rKSB7IHJldHVybiAnXCInICsgZ2V0VGl0bGUobGluaykgKyAnIC8+JzsgfVxuICAgICAgZnVuY3Rpb24gdG9Bbm90aGVySW1hZ2UgKGxpbmspIHsgcmV0dXJuICcgJyArIHRhZ29wZW4obGluaykgKyB0YWdjbG9zZShsaW5rKTsgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpbmtXcmFwIChsaW5rLCByZXN0KSB7XG4gICAgICB2YXIgYWZ0ZXIgPSBjaHVua3MuYWZ0ZXI7XG4gICAgICB2YXIgbmFtZXMgPSBvcHRpb25zLmNsYXNzZXMuaW5wdXQubGlua3M7XG4gICAgICB2YXIgY2xhc3NlcyA9IG5hbWVzID8gJyBjbGFzcz1cIicgKyBuYW1lcyArICdcIicgOiAnJztcbiAgICAgIGNodW5rcy5iZWZvcmUgKz0gdGFnb3BlbihsaW5rKTtcbiAgICAgIGNodW5rcy5hZnRlciA9IHRhZ2Nsb3NlKCk7XG4gICAgICBpZiAocmVzdC5sZW5ndGgpIHtcbiAgICAgICAgY2h1bmtzLmFmdGVyICs9IHJlc3QubWFwKHRvQW5vdGhlckxpbmspLmpvaW4oJycpO1xuICAgICAgfVxuICAgICAgY2h1bmtzLmFmdGVyICs9IGFmdGVyO1xuICAgICAgZnVuY3Rpb24gdGFnb3BlbiAobGluaykgeyByZXR1cm4gJzxhIGhyZWY9XCInICsgbGluay5ocmVmICsgJ1wiJyArIGdldFRpdGxlKGxpbmspICsgY2xhc3NlcyArICc+JzsgfVxuICAgICAgZnVuY3Rpb24gdGFnY2xvc2UgKCkgeyByZXR1cm4gJzwvYT4nOyB9XG4gICAgICBmdW5jdGlvbiB0b0Fub3RoZXJMaW5rIChsaW5rKSB7IHJldHVybiAnICcgKyB0YWdvcGVuKGxpbmspICsgdGFnY2xvc2UoKTsgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpbmtPckltYWdlT3JBdHRhY2htZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBybGVmdHNpbmdsZSA9IC88KHVsfG9sKSggW14+XSopPz5cXHMqPGxpKCBbXj5dKik/PiQvO1xudmFyIHJyaWdodHNpbmdsZSA9IC9ePFxcL2xpPlxccyo8XFwvKHVsfG9sKT4vO1xudmFyIHJsZWZ0aXRlbSA9IC88bGkoIFtePl0qKT8+JC87XG52YXIgcnJpZ2h0aXRlbSA9IC9ePFxcL2xpKCBbXj5dKik/Pi87XG52YXIgcm9wZW4gPSAvXjwodWx8b2wpKCBbXj5dKik/PiQvO1xuXG5mdW5jdGlvbiBsaXN0IChjaHVua3MsIG9yZGVyZWQpIHtcbiAgdmFyIHRhZyA9IG9yZGVyZWQgPyAnb2wnIDogJ3VsJztcbiAgdmFyIG9saXN0ID0gJzwnICsgdGFnICsgJz4nO1xuICB2YXIgY2xpc3QgPSAnPC8nICsgdGFnICsgJz4nO1xuXG4gIGNodW5rcy50cmltKCk7XG5cbiAgaWYgKHJsZWZ0c2luZ2xlLnRlc3QoY2h1bmtzLmJlZm9yZSkgJiYgcnJpZ2h0c2luZ2xlLnRlc3QoY2h1bmtzLmFmdGVyKSkge1xuICAgIGlmICh0YWcgPT09IFJlZ0V4cC4kMSkge1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVmdHNpbmdsZSwgJycpO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnJpZ2h0c2luZ2xlLCAnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgdmFyIHVsU3RhcnQgPSBjaHVua3MuYmVmb3JlLmxhc3RJbmRleE9mKCc8dWwnKTtcbiAgdmFyIG9sU3RhcnQgPSBjaHVua3MuYmVmb3JlLmxhc3RJbmRleE9mKCc8b2wnKTtcbiAgdmFyIGNsb3NlVGFnID0gY2h1bmtzLmFmdGVyLmluZGV4T2YoJzwvdWw+Jyk7XG4gIGlmIChjbG9zZVRhZyA9PT0gLTEpIHtcbiAgICBjbG9zZVRhZyA9IGNodW5rcy5hZnRlci5pbmRleE9mKCc8L29sPicpO1xuICB9XG4gIGlmIChjbG9zZVRhZyA9PT0gLTEpIHtcbiAgICBhZGQoKTsgcmV0dXJuO1xuICB9XG4gIHZhciBvcGVuU3RhcnQgPSB1bFN0YXJ0ID4gb2xTdGFydCA/IHVsU3RhcnQgOiBvbFN0YXJ0O1xuICBpZiAob3BlblN0YXJ0ID09PSAtMSkge1xuICAgIGFkZCgpOyByZXR1cm47XG4gIH1cbiAgdmFyIG9wZW5FbmQgPSBjaHVua3MuYmVmb3JlLmluZGV4T2YoJz4nLCBvcGVuU3RhcnQpO1xuICBpZiAob3BlbkVuZCA9PT0gLTEpIHtcbiAgICBhZGQoKTsgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG9wZW5UYWcgPSBjaHVua3MuYmVmb3JlLnN1YnN0cihvcGVuU3RhcnQsIG9wZW5FbmQgLSBvcGVuU3RhcnQgKyAxKTtcbiAgaWYgKHJvcGVuLnRlc3Qob3BlblRhZykpIHtcbiAgICBpZiAodGFnICE9PSBSZWdFeHAuJDEpIHtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnN1YnN0cigwLCBvcGVuU3RhcnQpICsgJzwnICsgdGFnICsgY2h1bmtzLmJlZm9yZS5zdWJzdHIob3BlblN0YXJ0ICsgMyk7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIuc3Vic3RyKDAsIGNsb3NlVGFnKSArICc8LycgKyB0YWcgKyBjaHVua3MuYWZ0ZXIuc3Vic3RyKGNsb3NlVGFnICsgNCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChybGVmdGl0ZW0udGVzdChjaHVua3MuYmVmb3JlKSAmJiBycmlnaHRpdGVtLnRlc3QoY2h1bmtzLmFmdGVyKSkge1xuICAgICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJsZWZ0aXRlbSwgJycpO1xuICAgICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShycmlnaHRpdGVtLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGQodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkIChsaXN0KSB7XG4gICAgdmFyIG9wZW4gPSBsaXN0ID8gJycgOiBvbGlzdDtcbiAgICB2YXIgY2xvc2UgPSBsaXN0ID8gJycgOiBjbGlzdDtcblxuICAgIGNodW5rcy5iZWZvcmUgKz0gb3BlbiArICc8bGk+JztcbiAgICBjaHVua3MuYWZ0ZXIgPSAnPC9saT4nICsgY2xvc2UgKyBjaHVua3MuYWZ0ZXI7XG5cbiAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVycy5saXN0aXRlbTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB3cmFwcGluZyAodGFnLCBwbGFjZWhvbGRlciwgY2h1bmtzKSB7XG4gIHZhciBvcGVuID0gJzwnICsgdGFnO1xuICB2YXIgY2xvc2UgPSAnPC8nICsgdGFnLnJlcGxhY2UoLzwvZywgJzwvJyk7XG4gIHZhciBybGVhZGluZyA9IG5ldyBSZWdFeHAob3BlbiArICcoIFtePl0qKT8+JCcsICdpJyk7XG4gIHZhciBydHJhaWxpbmcgPSBuZXcgUmVnRXhwKCdeJyArIGNsb3NlICsgJz4nLCAnaScpO1xuICB2YXIgcm9wZW4gPSBuZXcgUmVnRXhwKG9wZW4gKyAnKCBbXj5dKik/PicsICdpZycpO1xuICB2YXIgcmNsb3NlID0gbmV3IFJlZ0V4cChjbG9zZSArICcoIFtePl0qKT8+JywgJ2lnJyk7XG5cbiAgY2h1bmtzLnRyaW0oKTtcblxuICB2YXIgdHJhaWwgPSBydHJhaWxpbmcuZXhlYyhjaHVua3MuYWZ0ZXIpO1xuICB2YXIgbGVhZCA9IHJsZWFkaW5nLmV4ZWMoY2h1bmtzLmJlZm9yZSk7XG4gIGlmIChsZWFkICYmIHRyYWlsKSB7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVhZGluZywgJycpO1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJ0cmFpbGluZywgJycpO1xuICB9IGVsc2Uge1xuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICB2YXIgb3BlbmVkID0gcm9wZW4udGVzdChjaHVua3Muc2VsZWN0aW9uKTtcbiAgICBpZiAob3BlbmVkKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJvcGVuLCAnJyk7XG4gICAgICBpZiAoIXN1cnJvdW5kZWQoY2h1bmtzLCB0YWcpKSB7XG4gICAgICAgIGNodW5rcy5iZWZvcmUgKz0gb3BlbiArICc+JztcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGNsb3NlZCA9IHJjbG9zZS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pO1xuICAgIGlmIChjbG9zZWQpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UocmNsb3NlLCAnJyk7XG4gICAgICBpZiAoIXN1cnJvdW5kZWQoY2h1bmtzLCB0YWcpKSB7XG4gICAgICAgIGNodW5rcy5hZnRlciA9IGNsb3NlICsgJz4nICsgY2h1bmtzLmFmdGVyO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3BlbmVkIHx8IGNsb3NlZCkge1xuICAgICAgcHVzaG92ZXIoKTsgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3Vycm91bmRlZChjaHVua3MsIHRhZykpIHtcbiAgICAgIGlmIChybGVhZGluZy50ZXN0KGNodW5rcy5iZWZvcmUpKSB7XG4gICAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlYWRpbmcsICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNodW5rcy5iZWZvcmUgKz0gY2xvc2UgKyAnPic7XG4gICAgICB9XG4gICAgICBpZiAocnRyYWlsaW5nLnRlc3QoY2h1bmtzLmFmdGVyKSkge1xuICAgICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShydHJhaWxpbmcsICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNodW5rcy5hZnRlciA9IG9wZW4gKyAnPicgKyBjaHVua3MuYWZ0ZXI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghY2xvc2Vib3VuZGVkKGNodW5rcywgdGFnKSkge1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2xvc2UgKyAnPicgKyBjaHVua3MuYWZ0ZXI7XG4gICAgICBjaHVua3MuYmVmb3JlICs9IG9wZW4gKyAnPic7XG4gICAgfVxuICAgIHB1c2hvdmVyKCk7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNob3ZlciAoKSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC88KFxcLyk/KFtePiBdKykoIFtePl0qKT8+L2lnLCBwdXNob3Zlck90aGVyVGFncyk7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNob3Zlck90aGVyVGFncyAoYWxsLCBjbG9zaW5nLCB0YWcsIGEsIGkpIHtcbiAgICB2YXIgYXR0cnMgPSBhIHx8ICcnO1xuICAgIHZhciBvcGVuID0gIWNsb3Npbmc7XG4gICAgdmFyIHJjbG9zZWQgPSBuZXcgUmVnRXhwKCc8XFwvJyArIHRhZy5yZXBsYWNlKC88L2csICc8LycpICsgJz4nLCAnaScpO1xuICAgIHZhciByb3BlbmVkID0gbmV3IFJlZ0V4cCgnPCcgKyB0YWcgKyAnKCBbXj5dKik/PicsICdpJyk7XG4gICAgaWYgKG9wZW4gJiYgIXJjbG9zZWQudGVzdChjaHVua3Muc2VsZWN0aW9uLnN1YnN0cihpKSkpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gKz0gJzwvJyArIHRhZyArICc+JztcbiAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKC9eKDxcXC9bXj5dKz4pLywgJyQxPCcgKyB0YWcgKyBhdHRycyArICc+Jyk7XG4gICAgfVxuXG4gICAgaWYgKGNsb3NpbmcgJiYgIXJvcGVuZWQudGVzdChjaHVua3Muc2VsZWN0aW9uLnN1YnN0cigwLCBpKSkpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSAnPCcgKyB0YWcgKyBhdHRycyArICc+JyArIGNodW5rcy5zZWxlY3Rpb247XG4gICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKC8oPFtePl0rKD86IFtePl0qKT8+KSQvLCAnPC8nICsgdGFnICsgJz4kMScpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjbG9zZWJvdW5kZWQgKGNodW5rcywgdGFnKSB7XG4gIHZhciByY2xvc2VsZWZ0ID0gbmV3IFJlZ0V4cCgnPC8nICsgdGFnLnJlcGxhY2UoLzwvZywgJzwvJykgKyAnPiQnLCAnaScpO1xuICB2YXIgcm9wZW5yaWdodCA9IG5ldyBSZWdFeHAoJ148JyArIHRhZyArICcoPzogW14+XSopPz4nLCAnaScpO1xuICB2YXIgYm91bmRlZCA9IHJjbG9zZWxlZnQudGVzdChjaHVua3MuYmVmb3JlKSAmJiByb3BlbnJpZ2h0LnRlc3QoY2h1bmtzLmFmdGVyKTtcbiAgaWYgKGJvdW5kZWQpIHtcbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJjbG9zZWxlZnQsICcnKTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShyb3BlbnJpZ2h0LCAnJyk7XG4gIH1cbiAgcmV0dXJuIGJvdW5kZWQ7XG59XG5cbmZ1bmN0aW9uIHN1cnJvdW5kZWQgKGNodW5rcywgdGFnKSB7XG4gIHZhciByb3BlbiA9IG5ldyBSZWdFeHAoJzwnICsgdGFnICsgJyg/OiBbXj5dKik/PicsICdpZycpO1xuICB2YXIgcmNsb3NlID0gbmV3IFJlZ0V4cCgnPFxcLycgKyB0YWcucmVwbGFjZSgvPC9nLCAnPC8nKSArICc+JywgJ2lnJyk7XG4gIHZhciBvcGVuc0JlZm9yZSA9IGNvdW50KGNodW5rcy5iZWZvcmUsIHJvcGVuKTtcbiAgdmFyIG9wZW5zQWZ0ZXIgPSBjb3VudChjaHVua3MuYWZ0ZXIsIHJvcGVuKTtcbiAgdmFyIGNsb3Nlc0JlZm9yZSA9IGNvdW50KGNodW5rcy5iZWZvcmUsIHJjbG9zZSk7XG4gIHZhciBjbG9zZXNBZnRlciA9IGNvdW50KGNodW5rcy5hZnRlciwgcmNsb3NlKTtcbiAgdmFyIG9wZW4gPSBvcGVuc0JlZm9yZSAtIGNsb3Nlc0JlZm9yZSA+IDA7XG4gIHZhciBjbG9zZSA9IGNsb3Nlc0FmdGVyIC0gb3BlbnNBZnRlciA+IDA7XG4gIHJldHVybiBvcGVuICYmIGNsb3NlO1xuXG4gIGZ1bmN0aW9uIGNvdW50ICh0ZXh0LCByZWdleCkge1xuICAgIHZhciBtYXRjaCA9IHRleHQubWF0Y2gocmVnZXgpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgcmV0dXJuIG1hdGNoLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3cmFwcGluZztcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaXNWaXNpYmxlRWxlbWVudCAoZWxlbSkge1xuICBpZiAoZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICByZXR1cm4gZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpICE9PSAnbm9uZSc7XG4gIH0gZWxzZSBpZiAoZWxlbS5jdXJyZW50U3R5bGUpIHtcbiAgICByZXR1cm4gZWxlbS5jdXJyZW50U3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNWaXNpYmxlRWxlbWVudDtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5cGMxWnBjMmxpYkdWRmJHVnRaVzUwTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVpuVnVZM1JwYjI0Z2FYTldhWE5wWW14bFJXeGxiV1Z1ZENBb1pXeGxiU2tnZTF4dUlDQnBaaUFvWjJ4dlltRnNMbWRsZEVOdmJYQjFkR1ZrVTNSNWJHVXBJSHRjYmlBZ0lDQnlaWFIxY200Z1oyeHZZbUZzTG1kbGRFTnZiWEIxZEdWa1UzUjViR1VvWld4bGJTd2diblZzYkNrdVoyVjBVSEp2Y0dWeWRIbFdZV3gxWlNnblpHbHpjR3hoZVNjcElDRTlQU0FuYm05dVpTYzdYRzRnSUgwZ1pXeHpaU0JwWmlBb1pXeGxiUzVqZFhKeVpXNTBVM1I1YkdVcElIdGNiaUFnSUNCeVpYUjFjbTRnWld4bGJTNWpkWEp5Wlc1MFUzUjViR1V1WkdsemNHeGhlU0FoUFQwZ0oyNXZibVVuTzF4dUlDQjlYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2FYTldhWE5wWW14bFJXeGxiV1Z1ZER0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBtYW55ICh0ZXh0LCB0aW1lcykge1xuICByZXR1cm4gbmV3IEFycmF5KHRpbWVzICsgMSkuam9pbih0ZXh0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYW55O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWFueSA9IHJlcXVpcmUoJy4uL21hbnknKTtcbnZhciBleHRlbmRSZWdFeHAgPSByZXF1aXJlKCcuLi9leHRlbmRSZWdFeHAnKTtcbnZhciB0cmltQ2h1bmtzID0gcmVxdWlyZSgnLi4vY2h1bmtzL3RyaW0nKTtcblxuZnVuY3Rpb24gTWFya2Rvd25DaHVua3MgKCkge1xufVxuXG5NYXJrZG93bkNodW5rcy5wcm90b3R5cGUudHJpbSA9IHRyaW1DaHVua3M7XG5cbk1hcmtkb3duQ2h1bmtzLnByb3RvdHlwZS5maW5kVGFncyA9IGZ1bmN0aW9uIChzdGFydFJlZ2V4LCBlbmRSZWdleCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciByZWdleDtcblxuICBpZiAoc3RhcnRSZWdleCkge1xuICAgIHJlZ2V4ID0gZXh0ZW5kUmVnRXhwKHN0YXJ0UmVnZXgsICcnLCAnJCcpO1xuICAgIHRoaXMuYmVmb3JlID0gdGhpcy5iZWZvcmUucmVwbGFjZShyZWdleCwgc3RhcnRSZXBsYWNlcik7XG4gICAgcmVnZXggPSBleHRlbmRSZWdFeHAoc3RhcnRSZWdleCwgJ14nLCAnJyk7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5yZXBsYWNlKHJlZ2V4LCBzdGFydFJlcGxhY2VyKTtcbiAgfVxuXG4gIGlmIChlbmRSZWdleCkge1xuICAgIHJlZ2V4ID0gZXh0ZW5kUmVnRXhwKGVuZFJlZ2V4LCAnJywgJyQnKTtcbiAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLnJlcGxhY2UocmVnZXgsIGVuZFJlcGxhY2VyKTtcbiAgICByZWdleCA9IGV4dGVuZFJlZ0V4cChlbmRSZWdleCwgJ14nLCAnJyk7XG4gICAgdGhpcy5hZnRlciA9IHRoaXMuYWZ0ZXIucmVwbGFjZShyZWdleCwgZW5kUmVwbGFjZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRSZXBsYWNlciAobWF0Y2gpIHtcbiAgICBzZWxmLnN0YXJ0VGFnID0gc2VsZi5zdGFydFRhZyArIG1hdGNoOyByZXR1cm4gJyc7XG4gIH1cblxuICBmdW5jdGlvbiBlbmRSZXBsYWNlciAobWF0Y2gpIHtcbiAgICBzZWxmLmVuZFRhZyA9IG1hdGNoICsgc2VsZi5lbmRUYWc7IHJldHVybiAnJztcbiAgfVxufTtcblxuTWFya2Rvd25DaHVua3MucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBiZWZvcmVDb3VudCA9ICdiZWZvcmUnIGluIG8gPyBvLmJlZm9yZSA6IDE7XG4gIHZhciBhZnRlckNvdW50ID0gJ2FmdGVyJyBpbiBvID8gby5hZnRlciA6IDE7XG5cbiAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5yZXBsYWNlKC8oXlxcbiopLywgJycpO1xuICB0aGlzLnN0YXJ0VGFnID0gdGhpcy5zdGFydFRhZyArIFJlZ0V4cC4kMTtcbiAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5yZXBsYWNlKC8oXFxuKiQpLywgJycpO1xuICB0aGlzLmVuZFRhZyA9IHRoaXMuZW5kVGFnICsgUmVnRXhwLiQxO1xuICB0aGlzLnN0YXJ0VGFnID0gdGhpcy5zdGFydFRhZy5yZXBsYWNlKC8oXlxcbiopLywgJycpO1xuICB0aGlzLmJlZm9yZSA9IHRoaXMuYmVmb3JlICsgUmVnRXhwLiQxO1xuICB0aGlzLmVuZFRhZyA9IHRoaXMuZW5kVGFnLnJlcGxhY2UoLyhcXG4qJCkvLCAnJyk7XG4gIHRoaXMuYWZ0ZXIgPSB0aGlzLmFmdGVyICsgUmVnRXhwLiQxO1xuXG4gIGlmICh0aGlzLmJlZm9yZSkge1xuICAgIHRoaXMuYmVmb3JlID0gcmVwbGFjZSh0aGlzLmJlZm9yZSwgKytiZWZvcmVDb3VudCwgJyQnKTtcbiAgfVxuXG4gIGlmICh0aGlzLmFmdGVyKSB7XG4gICAgdGhpcy5hZnRlciA9IHJlcGxhY2UodGhpcy5hZnRlciwgKythZnRlckNvdW50LCAnJyk7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlICh0ZXh0LCBjb3VudCwgc3VmZml4KSB7XG4gICAgdmFyIHJlZ2V4ID0gby5hbnkgPyAnXFxcXG4qJyA6IG1hbnkoJ1xcXFxuPycsIGNvdW50KTtcbiAgICB2YXIgcmVwbGFjZW1lbnQgPSBtYW55KCdcXG4nLCBjb3VudCk7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShuZXcgUmVnRXhwKHJlZ2V4ICsgc3VmZml4KSwgcmVwbGFjZW1lbnQpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtkb3duQ2h1bmtzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcbnZhciBzZXR0aW5ncyA9IHJlcXVpcmUoJy4vc2V0dGluZ3MnKTtcbnZhciBydHJhaWxibGFua2xpbmUgPSAvKD5bIFxcdF0qKSQvO1xudmFyIHJsZWFkYmxhbmtsaW5lID0gL14oPlsgXFx0XSopLztcbnZhciBybmV3bGluZWZlbmNpbmcgPSAvXihcXG4qKShbXlxccl0rPykoXFxuKikkLztcbnZhciByZW5kdGFnID0gL14oKChcXG58XikoXFxuWyBcXHRdKikqPiguK1xcbikqLiopKyhcXG5bIFxcdF0qKSopLztcbnZhciBybGVhZGJyYWNrZXQgPSAvXlxcbigoPnxcXHMpKilcXG4vO1xudmFyIHJ0cmFpbGJyYWNrZXQgPSAvXFxuKCg+fFxccykqKVxcbiQvO1xuXG5mdW5jdGlvbiBibG9ja3F1b3RlIChjaHVua3MpIHtcbiAgdmFyIG1hdGNoID0gJyc7XG4gIHZhciBsZWZ0T3ZlciA9ICcnO1xuICB2YXIgbGluZTtcblxuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJuZXdsaW5lZmVuY2luZywgbmV3bGluZXJlcGxhY2VyKTtcbiAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShydHJhaWxibGFua2xpbmUsIHRyYWlsYmxhbmtsaW5lcmVwbGFjZXIpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9eKFxcc3w+KSskLywgJycpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbiB8fCBzdHJpbmdzLnBsYWNlaG9sZGVycy5xdW90ZTtcblxuICBpZiAoY2h1bmtzLmJlZm9yZSkge1xuICAgIGJlZm9yZVByb2Nlc3NpbmcoKTtcbiAgfVxuXG4gIGNodW5rcy5zdGFydFRhZyA9IG1hdGNoO1xuICBjaHVua3MuYmVmb3JlID0gbGVmdE92ZXI7XG5cbiAgaWYgKGNodW5rcy5hZnRlcikge1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKC9eXFxuPy8sICdcXG4nKTtcbiAgfVxuXG4gIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJlbmR0YWcsIGVuZHRhZ3JlcGxhY2VyKTtcblxuICBpZiAoL14oPyFbIF17MCwzfT4pL20udGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgIHdyYXBwaW5nLndyYXAoY2h1bmtzLCBzZXR0aW5ncy5saW5lTGVuZ3RoIC0gMik7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXi9nbSwgJz4gJyk7XG4gICAgcmVwbGFjZUJsYW5rc0luVGFncyh0cnVlKTtcbiAgICBjaHVua3Muc2tpcCgpO1xuICB9IGVsc2Uge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL15bIF17MCwzfT4gPy9nbSwgJycpO1xuICAgIHdyYXBwaW5nLnVud3JhcChjaHVua3MpO1xuICAgIHJlcGxhY2VCbGFua3NJblRhZ3MoZmFsc2UpO1xuXG4gICAgaWYgKCEvXihcXG58XilbIF17MCwzfT4vLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikgJiYgY2h1bmtzLnN0YXJ0VGFnKSB7XG4gICAgICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3Muc3RhcnRUYWcucmVwbGFjZSgvXFxuezAsMn0kLywgJ1xcblxcbicpO1xuICAgIH1cblxuICAgIGlmICghLyhcXG58XilbIF17MCwzfT4uKiQvLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikgJiYgY2h1bmtzLmVuZFRhZykge1xuICAgICAgY2h1bmtzLmVuZFRhZyA9IGNodW5rcy5lbmRUYWcucmVwbGFjZSgvXlxcbnswLDJ9LywgJ1xcblxcbicpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghL1xcbi8udGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UocmxlYWRibGFua2xpbmUsIGxlYWRibGFua2xpbmVyZXBsYWNlcik7XG4gIH1cblxuICBmdW5jdGlvbiBuZXdsaW5lcmVwbGFjZXIgKGFsbCwgYmVmb3JlLCB0ZXh0LCBhZnRlcikge1xuICAgIGNodW5rcy5iZWZvcmUgKz0gYmVmb3JlO1xuICAgIGNodW5rcy5hZnRlciA9IGFmdGVyICsgY2h1bmtzLmFmdGVyO1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxibGFua2xpbmVyZXBsYWNlciAoYWxsLCBibGFuaykge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBibGFuayArIGNodW5rcy5zZWxlY3Rpb247IHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRibGFua2xpbmVyZXBsYWNlciAoYWxsLCBibGFua3MpIHtcbiAgICBjaHVua3Muc3RhcnRUYWcgKz0gYmxhbmtzOyByZXR1cm4gJyc7XG4gIH1cblxuICBmdW5jdGlvbiBiZWZvcmVQcm9jZXNzaW5nICgpIHtcbiAgICB2YXIgbGluZXMgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UoL1xcbiQvLCAnJykuc3BsaXQoJ1xcbicpO1xuICAgIHZhciBjaGFpbmVkID0gZmFsc2U7XG4gICAgdmFyIGdvb2Q7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBnb29kID0gZmFsc2U7XG4gICAgICBsaW5lID0gbGluZXNbaV07XG4gICAgICBjaGFpbmVkID0gY2hhaW5lZCAmJiBsaW5lLmxlbmd0aCA+IDA7XG4gICAgICBpZiAoL14+Ly50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGdvb2QgPSB0cnVlO1xuICAgICAgICBpZiAoIWNoYWluZWQgJiYgbGluZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY2hhaW5lZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoL15bIFxcdF0qJC8udGVzdChsaW5lKSkge1xuICAgICAgICBnb29kID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdvb2QgPSBjaGFpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKGdvb2QpIHtcbiAgICAgICAgbWF0Y2ggKz0gbGluZSArICdcXG4nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVmdE92ZXIgKz0gbWF0Y2ggKyBsaW5lO1xuICAgICAgICBtYXRjaCA9ICdcXG4nO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghLyhefFxcbik+Ly50ZXN0KG1hdGNoKSkge1xuICAgICAgbGVmdE92ZXIgKz0gbWF0Y2g7XG4gICAgICBtYXRjaCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZHRhZ3JlcGxhY2VyIChhbGwpIHtcbiAgICBjaHVua3MuZW5kVGFnID0gYWxsOyByZXR1cm4gJyc7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlQmxhbmtzSW5UYWdzIChicmFja2V0KSB7XG4gICAgdmFyIHJlcGxhY2VtZW50ID0gYnJhY2tldCA/ICc+ICcgOiAnJztcblxuICAgIGlmIChjaHVua3Muc3RhcnRUYWcpIHtcbiAgICAgIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5zdGFydFRhZy5yZXBsYWNlKHJ0cmFpbGJyYWNrZXQsIHJlcGxhY2VyKTtcbiAgICB9XG4gICAgaWYgKGNodW5rcy5lbmRUYWcpIHtcbiAgICAgIGNodW5rcy5lbmRUYWcgPSBjaHVua3MuZW5kVGFnLnJlcGxhY2UocmxlYWRicmFja2V0LCByZXBsYWNlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwbGFjZXIgKGFsbCwgbWFya2Rvd24pIHtcbiAgICAgIHJldHVybiAnXFxuJyArIG1hcmtkb3duLnJlcGxhY2UoL15bIF17MCwzfT4/WyBcXHRdKiQvZ20sIHJlcGxhY2VtZW50KSArICdcXG4nO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJsb2NrcXVvdGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBybGVhZGluZyA9IC9eKFxcKiopLztcbnZhciBydHJhaWxpbmcgPSAvKFxcKiokKS87XG52YXIgcnRyYWlsaW5nc3BhY2UgPSAvKFxccz8pJC87XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcblxuZnVuY3Rpb24gYm9sZE9ySXRhbGljIChjaHVua3MsIHR5cGUpIHtcbiAgdmFyIHJuZXdsaW5lcyA9IC9cXG57Mix9L2c7XG4gIHZhciBzdGFyQ291bnQgPSB0eXBlID09PSAnYm9sZCcgPyAyIDogMTtcblxuICBjaHVua3MudHJpbSgpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJuZXdsaW5lcywgJ1xcbicpO1xuXG4gIHZhciBtYXJrdXA7XG4gIHZhciBsZWFkU3RhcnMgPSBydHJhaWxpbmcuZXhlYyhjaHVua3MuYmVmb3JlKVswXTtcbiAgdmFyIHRyYWlsU3RhcnMgPSBybGVhZGluZy5leGVjKGNodW5rcy5hZnRlcilbMF07XG4gIHZhciBzdGFycyA9ICdcXFxcKnsnICsgc3RhckNvdW50ICsgJ30nO1xuICB2YXIgZmVuY2UgPSBNYXRoLm1pbihsZWFkU3RhcnMubGVuZ3RoLCB0cmFpbFN0YXJzLmxlbmd0aCk7XG4gIGlmIChmZW5jZSA+PSBzdGFyQ291bnQgJiYgKGZlbmNlICE9PSAyIHx8IHN0YXJDb3VudCAhPT0gMSkpIHtcbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKG5ldyBSZWdFeHAoc3RhcnMgKyAnJCcsICcnKSwgJycpO1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKG5ldyBSZWdFeHAoJ14nICsgc3RhcnMsICcnKSwgJycpO1xuICB9IGVsc2UgaWYgKCFjaHVua3Muc2VsZWN0aW9uICYmIHRyYWlsU3RhcnMpIHtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShybGVhZGluZywgJycpO1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocnRyYWlsaW5nc3BhY2UsICcnKSArIHRyYWlsU3RhcnMgKyBSZWdFeHAuJDE7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uICYmICF0cmFpbFN0YXJzKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnNbdHlwZV07XG4gICAgfVxuXG4gICAgbWFya3VwID0gc3RhckNvdW50ID09PSAxID8gJyonIDogJyoqJztcbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZSArIG1hcmt1cDtcbiAgICBjaHVua3MuYWZ0ZXIgPSBtYXJrdXAgKyBjaHVua3MuYWZ0ZXI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBib2xkT3JJdGFsaWM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHJ0ZXh0YmVmb3JlID0gL1xcU1sgXSokLztcbnZhciBydGV4dGFmdGVyID0gL15bIF0qXFxTLztcbnZhciBybmV3bGluZSA9IC9cXG4vO1xudmFyIHJiYWNrdGljayA9IC9gLztcbnZhciByZmVuY2ViZWZvcmUgPSAvYGBgW2Etel0qXFxuPyQvO1xudmFyIHJmZW5jZWJlZm9yZWluc2lkZSA9IC9eYGBgW2Etel0qXFxuLztcbnZhciByZmVuY2VhZnRlciA9IC9eXFxuP2BgYC87XG52YXIgcmZlbmNlYWZ0ZXJpbnNpZGUgPSAvXFxuYGBgJC87XG5cbmZ1bmN0aW9uIGNvZGVibG9jayAoY2h1bmtzLCBvcHRpb25zKSB7XG4gIHZhciBuZXdsaW5lZCA9IHJuZXdsaW5lLnRlc3QoY2h1bmtzLnNlbGVjdGlvbik7XG4gIHZhciB0cmFpbGluZyA9IHJ0ZXh0YWZ0ZXIudGVzdChjaHVua3MuYWZ0ZXIpO1xuICB2YXIgbGVhZGluZyA9IHJ0ZXh0YmVmb3JlLnRlc3QoY2h1bmtzLmJlZm9yZSk7XG4gIHZhciBvdXRmZW5jZWQgPSByZmVuY2ViZWZvcmUudGVzdChjaHVua3MuYmVmb3JlKSAmJiByZmVuY2VhZnRlci50ZXN0KGNodW5rcy5hZnRlcik7XG4gIGlmIChvdXRmZW5jZWQgfHwgbmV3bGluZWQgfHwgIShsZWFkaW5nIHx8IHRyYWlsaW5nKSkge1xuICAgIGJsb2NrKG91dGZlbmNlZCk7XG4gIH0gZWxzZSB7XG4gICAgaW5saW5lKCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbmxpbmUgKCkge1xuICAgIGNodW5rcy50cmltKCk7XG4gICAgY2h1bmtzLmZpbmRUYWdzKHJiYWNrdGljaywgcmJhY2t0aWNrKTtcblxuICAgIGlmICghY2h1bmtzLnN0YXJ0VGFnICYmICFjaHVua3MuZW5kVGFnKSB7XG4gICAgICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3MuZW5kVGFnID0gJ2AnO1xuICAgICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVycy5jb2RlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2h1bmtzLmVuZFRhZyAmJiAhY2h1bmtzLnN0YXJ0VGFnKSB7XG4gICAgICBjaHVua3MuYmVmb3JlICs9IGNodW5rcy5lbmRUYWc7XG4gICAgICBjaHVua3MuZW5kVGFnID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5lbmRUYWcgPSAnJztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBibG9jayAob3V0ZmVuY2VkKSB7XG4gICAgaWYgKG91dGZlbmNlZCkge1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShyZmVuY2ViZWZvcmUsICcnKTtcbiAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJmZW5jZWFmdGVyLCAnJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZSgvWyBdezR9fGBgYFthLXpdKlxcbiQvLCBtZXJnZVNlbGVjdGlvbik7XG4gICAgY2h1bmtzLnNraXAoe1xuICAgICAgYmVmb3JlOiAvKFxcbnxeKShcXHR8WyBdezQsfXxgYGBbYS16XSpcXG4pLipcXG4kLy50ZXN0KGNodW5rcy5iZWZvcmUpID8gMCA6IDEsXG4gICAgICBhZnRlcjogL15cXG4oXFx0fFsgXXs0LH18XFxuYGBgKS8udGVzdChjaHVua3MuYWZ0ZXIpID8gMCA6IDFcbiAgICB9KTtcblxuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgaWYgKG9wdGlvbnMuZmVuY2luZykge1xuICAgICAgICBjaHVua3Muc3RhcnRUYWcgPSAnYGBgXFxuJztcbiAgICAgICAgY2h1bmtzLmVuZFRhZyA9ICdcXG5gYGAnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gJyAgICAnO1xuICAgICAgfVxuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmNvZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZmVuY2ViZWZvcmVpbnNpZGUudGVzdChjaHVua3Muc2VsZWN0aW9uKSAmJiByZmVuY2VhZnRlcmluc2lkZS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pKSB7XG4gICAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoLyheYGBgW2Etel0qXFxuKXwoYGBgJCkvZywgJycpO1xuICAgICAgfSBlbHNlIGlmICgvXlsgXXswLDN9XFxTL20udGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgICAgICBpZiAob3B0aW9ucy5mZW5jaW5nKSB7XG4gICAgICAgICAgY2h1bmtzLmJlZm9yZSArPSAnYGBgXFxuJztcbiAgICAgICAgICBjaHVua3MuYWZ0ZXIgPSAnXFxuYGBgJyArIGNodW5rcy5hZnRlcjtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdsaW5lZCkge1xuICAgICAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL14vZ20sICcgICAgJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2h1bmtzLmJlZm9yZSArPSAnICAgICc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL14oPzpbIF17NH18WyBdezAsM31cXHR8YGBgW2Etel0qKS9nbSwgJycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lcmdlU2VsZWN0aW9uIChhbGwpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBhbGwgKyBjaHVua3Muc2VsZWN0aW9uOyByZXR1cm4gJyc7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29kZWJsb2NrO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWFueSA9IHJlcXVpcmUoJy4uL21hbnknKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xuXG5mdW5jdGlvbiBoZWFkaW5nIChjaHVua3MpIHtcbiAgdmFyIGxldmVsID0gMDtcblxuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvblxuICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAucmVwbGFjZSgvKF5cXHMrfFxccyskKS9nLCAnJyk7XG5cbiAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgY2h1bmtzLnN0YXJ0VGFnID0gJyMgJztcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMuaGVhZGluZztcbiAgICBjaHVua3MuZW5kVGFnID0gJyc7XG4gICAgY2h1bmtzLnNraXAoeyBiZWZvcmU6IDEsIGFmdGVyOiAxIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNodW5rcy5maW5kVGFncygvIytbIF0qLywgL1sgXSojKy8pO1xuXG4gIGlmICgvIysvLnRlc3QoY2h1bmtzLnN0YXJ0VGFnKSkge1xuICAgIGxldmVsID0gUmVnRXhwLmxhc3RNYXRjaC5sZW5ndGg7XG4gIH1cblxuICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3MuZW5kVGFnID0gJyc7XG4gIGNodW5rcy5maW5kVGFncyhudWxsLCAvXFxzPygtK3w9KykvKTtcblxuICBpZiAoLz0rLy50ZXN0KGNodW5rcy5lbmRUYWcpKSB7XG4gICAgbGV2ZWwgPSAxO1xuICB9XG5cbiAgaWYgKC8tKy8udGVzdChjaHVua3MuZW5kVGFnKSkge1xuICAgIGxldmVsID0gMjtcbiAgfVxuXG4gIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5lbmRUYWcgPSAnJztcbiAgY2h1bmtzLnNraXAoeyBiZWZvcmU6IDEsIGFmdGVyOiAxIH0pO1xuXG4gIHZhciBsZXZlbFRvQ3JlYXRlID0gbGV2ZWwgPCAyID8gNCA6IGxldmVsIC0gMTtcbiAgaWYgKGxldmVsVG9DcmVhdGUgPiAwKSB7XG4gICAgY2h1bmtzLnN0YXJ0VGFnID0gbWFueSgnIycsIGxldmVsVG9DcmVhdGUpICsgJyAnO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGVhZGluZztcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaHIgKGNodW5rcykge1xuICBjaHVua3Muc3RhcnRUYWcgPSAnLS0tLS0tLS0tLVxcbic7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSAnJztcbiAgY2h1bmtzLnNraXAoeyBsZWZ0OiAyLCByaWdodDogMSwgYW55OiB0cnVlIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb25jZSA9IHJlcXVpcmUoJy4uL29uY2UnKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHBhcnNlTGlua0lucHV0ID0gcmVxdWlyZSgnLi4vY2h1bmtzL3BhcnNlTGlua0lucHV0Jyk7XG52YXIgcmRlZmluaXRpb25zID0gL15bIF17MCwzfVxcWygoPzphdHRhY2htZW50LSk/XFxkKylcXF06WyBcXHRdKlxcbj9bIFxcdF0qPD8oXFxTKz8pPj9bIFxcdF0qXFxuP1sgXFx0XSooPzooXFxuKilbXCIoXSguKz8pW1wiKV1bIFxcdF0qKT8oPzpcXG4rfCQpL2dtO1xudmFyIHJhdHRhY2htZW50ID0gL15hdHRhY2htZW50LShcXGQrKSQvaTtcblxuZnVuY3Rpb24gZXh0cmFjdERlZmluaXRpb25zICh0ZXh0LCBkZWZpbml0aW9ucykge1xuICByZGVmaW5pdGlvbnMubGFzdEluZGV4ID0gMDtcbiAgcmV0dXJuIHRleHQucmVwbGFjZShyZGVmaW5pdGlvbnMsIHJlcGxhY2VyKTtcblxuICBmdW5jdGlvbiByZXBsYWNlciAoYWxsLCBpZCwgbGluaywgbmV3bGluZXMsIHRpdGxlKSB7XG4gICAgZGVmaW5pdGlvbnNbaWRdID0gYWxsLnJlcGxhY2UoL1xccyokLywgJycpO1xuICAgIGlmIChuZXdsaW5lcykge1xuICAgICAgZGVmaW5pdGlvbnNbaWRdID0gYWxsLnJlcGxhY2UoL1tcIihdKC4rPylbXCIpXSQvLCAnJyk7XG4gICAgICByZXR1cm4gbmV3bGluZXMgKyB0aXRsZTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1c2hEZWZpbml0aW9uIChvcHRpb25zKSB7XG4gIHZhciBjaHVua3MgPSBvcHRpb25zLmNodW5rcztcbiAgdmFyIGRlZmluaXRpb24gPSBvcHRpb25zLmRlZmluaXRpb247XG4gIHZhciBhdHRhY2htZW50ID0gb3B0aW9ucy5hdHRhY2htZW50O1xuICB2YXIgcmVnZXggPSAvKFxcWykoKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV0pKikoXFxdWyBdPyg/OlxcblsgXSopP1xcWykoKD86YXR0YWNobWVudC0pP1xcZCspKFxcXSkvZztcbiAgdmFyIGFuY2hvciA9IDA7XG4gIHZhciBkZWZpbml0aW9ucyA9IHt9O1xuICB2YXIgZm9vdG5vdGVzID0gW107XG5cbiAgY2h1bmtzLmJlZm9yZSA9IGV4dHJhY3REZWZpbml0aW9ucyhjaHVua3MuYmVmb3JlLCBkZWZpbml0aW9ucyk7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBleHRyYWN0RGVmaW5pdGlvbnMoY2h1bmtzLnNlbGVjdGlvbiwgZGVmaW5pdGlvbnMpO1xuICBjaHVua3MuYWZ0ZXIgPSBleHRyYWN0RGVmaW5pdGlvbnMoY2h1bmtzLmFmdGVyLCBkZWZpbml0aW9ucyk7XG4gIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmVnZXgsIGdldExpbmspO1xuXG4gIGlmIChkZWZpbml0aW9uKSB7XG4gICAgaWYgKCFhdHRhY2htZW50KSB7IHB1c2hBbmNob3IoZGVmaW5pdGlvbik7IH1cbiAgfSBlbHNlIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKHJlZ2V4LCBnZXRMaW5rKTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBhbmNob3I7XG5cbiAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocmVnZXgsIGdldExpbmspO1xuXG4gIGlmIChjaHVua3MuYWZ0ZXIpIHtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZSgvXFxuKiQvLCAnJyk7XG4gIH1cbiAgaWYgKCFjaHVua3MuYWZ0ZXIpIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9cXG4qJC8sICcnKTtcbiAgfVxuXG4gIGFuY2hvciA9IDA7XG4gIE9iamVjdC5rZXlzKGRlZmluaXRpb25zKS5mb3JFYWNoKHB1c2hBdHRhY2htZW50cyk7XG5cbiAgaWYgKGF0dGFjaG1lbnQpIHtcbiAgICBwdXNoQW5jaG9yKGRlZmluaXRpb24pO1xuICB9XG4gIGNodW5rcy5hZnRlciArPSAnXFxuXFxuJyArIGZvb3Rub3Rlcy5qb2luKCdcXG4nKTtcblxuICByZXR1cm4gcmVzdWx0O1xuXG4gIGZ1bmN0aW9uIHB1c2hBdHRhY2htZW50cyAoZGVmaW5pdGlvbikge1xuICAgIGlmIChyYXR0YWNobWVudC50ZXN0KGRlZmluaXRpb24pKSB7XG4gICAgICBwdXNoQW5jaG9yKGRlZmluaXRpb25zW2RlZmluaXRpb25dKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoQW5jaG9yIChkZWZpbml0aW9uKSB7XG4gICAgYW5jaG9yKys7XG4gICAgZGVmaW5pdGlvbiA9IGRlZmluaXRpb24ucmVwbGFjZSgvXlsgXXswLDN9XFxbKGF0dGFjaG1lbnQtKT8oXFxkKylcXF06LywgJyAgWyQxJyArIGFuY2hvciArICddOicpO1xuICAgIGZvb3Rub3Rlcy5wdXNoKGRlZmluaXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGluayAoYWxsLCBiZWZvcmUsIGlubmVyLCBhZnRlcklubmVyLCBkZWZpbml0aW9uLCBlbmQpIHtcbiAgICBpbm5lciA9IGlubmVyLnJlcGxhY2UocmVnZXgsIGdldExpbmspO1xuICAgIGlmIChkZWZpbml0aW9uc1tkZWZpbml0aW9uXSkge1xuICAgICAgcHVzaEFuY2hvcihkZWZpbml0aW9uc1tkZWZpbml0aW9uXSk7XG4gICAgICByZXR1cm4gYmVmb3JlICsgaW5uZXIgKyBhZnRlcklubmVyICsgYW5jaG9yICsgZW5kO1xuICAgIH1cbiAgICByZXR1cm4gYWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxpbmtPckltYWdlT3JBdHRhY2htZW50IChjaHVua3MsIG9wdGlvbnMpIHtcbiAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gIHZhciBpbWFnZSA9IHR5cGUgPT09ICdpbWFnZSc7XG4gIHZhciByZXN1bWU7XG5cbiAgY2h1bmtzLnRyaW0oKTtcbiAgY2h1bmtzLmZpbmRUYWdzKC9cXHMqIT9cXFsvLCAvXFxdWyBdPyg/OlxcblsgXSopPyhcXFsuKj9cXF0pPy8pO1xuXG4gIGlmIChjaHVua3MuZW5kVGFnLmxlbmd0aCA+IDEgJiYgY2h1bmtzLnN0YXJ0VGFnLmxlbmd0aCA+IDApIHtcbiAgICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3Muc3RhcnRUYWcucmVwbGFjZSgvIT9cXFsvLCAnJyk7XG4gICAgY2h1bmtzLmVuZFRhZyA9ICcnO1xuICAgIHB1c2hEZWZpbml0aW9uKHsgY2h1bmtzOiBjaHVua3MgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zdGFydFRhZyArIGNodW5rcy5zZWxlY3Rpb24gKyBjaHVua3MuZW5kVGFnO1xuICBjaHVua3Muc3RhcnRUYWcgPSBjaHVua3MuZW5kVGFnID0gJyc7XG5cbiAgaWYgKC9cXG5cXG4vLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICBwdXNoRGVmaW5pdGlvbih7IGNodW5rczogY2h1bmtzIH0pO1xuICAgIHJldHVybjtcbiAgfVxuICByZXN1bWUgPSB0aGlzLmFzeW5jKCk7XG5cbiAgb3B0aW9ucy5wcm9tcHRzLmNsb3NlKCk7XG4gIChvcHRpb25zLnByb21wdHNbdHlwZV0gfHwgb3B0aW9ucy5wcm9tcHRzLmxpbmspKG9wdGlvbnMsIG9uY2UocmVzb2x2ZWQpKTtcblxuICBmdW5jdGlvbiByZXNvbHZlZCAocmVzdWx0KSB7XG4gICAgdmFyIGxpbmtzID0gcmVzdWx0XG4gICAgICAuZGVmaW5pdGlvbnNcbiAgICAgIC5tYXAocGFyc2VMaW5rSW5wdXQpXG4gICAgICAuZmlsdGVyKGxvbmcpO1xuXG4gICAgbGlua3MuZm9yRWFjaChyZW5kZXJMaW5rKTtcbiAgICByZXN1bWUoKTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlckxpbmsgKGxpbmssIGkpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSAoJyAnICsgY2h1bmtzLnNlbGVjdGlvbikucmVwbGFjZSgvKFteXFxcXF0oPzpcXFxcXFxcXCkqKSg/PVtbXFxdXSkvZywgJyQxXFxcXCcpLnN1YnN0cigxKTtcblxuICAgICAgdmFyIGtleSA9IHJlc3VsdC5hdHRhY2htZW50ID8gJyAgW2F0dGFjaG1lbnQtOTk5OV06ICcgOiAnIFs5OTk5XTogJztcbiAgICAgIHZhciBkZWZpbml0aW9uID0ga2V5ICsgbGluay5ocmVmICsgKGxpbmsudGl0bGUgPyAnIFwiJyArIGxpbmsudGl0bGUgKyAnXCInIDogJycpO1xuICAgICAgdmFyIGFuY2hvciA9IHB1c2hEZWZpbml0aW9uKHtcbiAgICAgICAgY2h1bmtzOiBjaHVua3MsXG4gICAgICAgIGRlZmluaXRpb246IGRlZmluaXRpb24sXG4gICAgICAgIGF0dGFjaG1lbnQ6IHJlc3VsdC5hdHRhY2htZW50XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXN1bHQuYXR0YWNobWVudCkge1xuICAgICAgICBhZGQoKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkICgpIHtcbiAgICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gaW1hZ2UgPyAnIVsnIDogJ1snO1xuICAgICAgICBjaHVua3MuZW5kVGFnID0gJ11bJyArIGFuY2hvciArICddJztcblxuICAgICAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnNbdHlwZV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSA8IGxpbmtzLmxlbmd0aCAtIDEpIHsgLy8gaGFzIG11bHRpcGxlIGxpbmtzLCBub3QgdGhlIGxhc3Qgb25lXG4gICAgICAgICAgY2h1bmtzLmJlZm9yZSArPSBjaHVua3Muc3RhcnRUYWcgKyBjaHVua3Muc2VsZWN0aW9uICsgY2h1bmtzLmVuZFRhZyArICdcXG4nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9uZyAobGluaykge1xuICAgICAgcmV0dXJuIGxpbmsuaHJlZi5sZW5ndGggPiAwO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpbmtPckltYWdlT3JBdHRhY2htZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWFueSA9IHJlcXVpcmUoJy4uL21hbnknKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHdyYXBwaW5nID0gcmVxdWlyZSgnLi93cmFwcGluZycpO1xudmFyIHNldHRpbmdzID0gcmVxdWlyZSgnLi9zZXR0aW5ncycpO1xudmFyIHJwcmV2aW91cyA9IC8oXFxufF4pKChbIF17MCwzfShbKistXXxcXGQrWy5dKVsgXFx0XSsuKikoXFxuLit8XFxuezIsfShbKistXS4qfFxcZCtbLl0pWyBcXHRdKy4qfFxcbnsyLH1bIFxcdF0rXFxTLiopKilcXG4qJC87XG52YXIgcm5leHQgPSAvXlxcbiooKFsgXXswLDN9KFsqKy1dfFxcZCtbLl0pWyBcXHRdKy4qKShcXG4uK3xcXG57Mix9KFsqKy1dLip8XFxkK1suXSlbIFxcdF0rLip8XFxuezIsfVsgXFx0XStcXFMuKikqKVxcbiovO1xudmFyIHJidWxsZXR0eXBlID0gL15cXHMqKFsqKy1dKS87XG52YXIgcnNraXBwZXIgPSAvW15cXG5dXFxuXFxuW15cXG5dLztcblxuZnVuY3Rpb24gcGFkICh0ZXh0KSB7XG4gIHJldHVybiAnICcgKyB0ZXh0ICsgJyAnO1xufVxuXG5mdW5jdGlvbiBsaXN0IChjaHVua3MsIG9yZGVyZWQpIHtcbiAgdmFyIGJ1bGxldCA9ICctJztcbiAgdmFyIG51bSA9IDE7XG4gIHZhciBkaWdpdGFsO1xuICB2YXIgYmVmb3JlU2tpcCA9IDE7XG4gIHZhciBhZnRlclNraXAgPSAxO1xuXG4gIGNodW5rcy5maW5kVGFncygvKFxcbnxeKSpbIF17MCwzfShbKistXXxcXGQrWy5dKVxccysvLCBudWxsKTtcblxuICBpZiAoY2h1bmtzLmJlZm9yZSAmJiAhL1xcbiQvLnRlc3QoY2h1bmtzLmJlZm9yZSkgJiYgIS9eXFxuLy50ZXN0KGNodW5rcy5zdGFydFRhZykpIHtcbiAgICBjaHVua3MuYmVmb3JlICs9IGNodW5rcy5zdGFydFRhZztcbiAgICBjaHVua3Muc3RhcnRUYWcgPSAnJztcbiAgfVxuXG4gIGlmIChjaHVua3Muc3RhcnRUYWcpIHtcbiAgICBkaWdpdGFsID0gL1xcZCtbLl0vLnRlc3QoY2h1bmtzLnN0YXJ0VGFnKTtcbiAgICBjaHVua3Muc3RhcnRUYWcgPSAnJztcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9cXG5bIF17NH0vZywgJ1xcbicpO1xuICAgIHdyYXBwaW5nLnVud3JhcChjaHVua3MpO1xuICAgIGNodW5rcy5za2lwKCk7XG5cbiAgICBpZiAoZGlnaXRhbCkge1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2Uocm5leHQsIGdldFByZWZpeGVkSXRlbSk7XG4gICAgfVxuICAgIGlmIChvcmRlcmVkID09PSBkaWdpdGFsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShycHJldmlvdXMsIGJlZm9yZVJlcGxhY2VyKTtcblxuICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMubGlzdGl0ZW07XG4gIH1cblxuICB2YXIgcHJlZml4ID0gbmV4dEJ1bGxldCgpO1xuICB2YXIgc3BhY2VzID0gbWFueSgnICcsIHByZWZpeC5sZW5ndGgpO1xuXG4gIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJuZXh0LCBhZnRlclJlcGxhY2VyKTtcbiAgY2h1bmtzLnRyaW0odHJ1ZSk7XG4gIGNodW5rcy5za2lwKHsgYmVmb3JlOiBiZWZvcmVTa2lwLCBhZnRlcjogYWZ0ZXJTa2lwLCBhbnk6IHRydWUgfSk7XG4gIGNodW5rcy5zdGFydFRhZyA9IHByZWZpeDtcbiAgd3JhcHBpbmcud3JhcChjaHVua3MsIHNldHRpbmdzLmxpbmVMZW5ndGggLSBwcmVmaXgubGVuZ3RoKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXFxuL2csICdcXG4nICsgc3BhY2VzKTtcblxuICBmdW5jdGlvbiBiZWZvcmVSZXBsYWNlciAodGV4dCkge1xuICAgIGlmIChyYnVsbGV0dHlwZS50ZXN0KHRleHQpKSB7XG4gICAgICBidWxsZXQgPSBSZWdFeHAuJDE7XG4gICAgfVxuICAgIGJlZm9yZVNraXAgPSByc2tpcHBlci50ZXN0KHRleHQpID8gMSA6IDA7XG4gICAgcmV0dXJuIGdldFByZWZpeGVkSXRlbSh0ZXh0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFmdGVyUmVwbGFjZXIgKHRleHQpIHtcbiAgICBhZnRlclNraXAgPSByc2tpcHBlci50ZXN0KHRleHQpID8gMSA6IDA7XG4gICAgcmV0dXJuIGdldFByZWZpeGVkSXRlbSh0ZXh0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRCdWxsZXQgKCkge1xuICAgIGlmIChvcmRlcmVkKSB7XG4gICAgICByZXR1cm4gcGFkKChudW0rKykgKyAnLicpO1xuICAgIH1cbiAgICByZXR1cm4gcGFkKGJ1bGxldCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQcmVmaXhlZEl0ZW0gKHRleHQpIHtcbiAgICB2YXIgcm1hcmtlcnMgPSAvXlsgXXswLDN9KFsqKy1dfFxcZCtbLl0pXFxzL2dtO1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2Uocm1hcmtlcnMsIG5leHRCdWxsZXQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdDtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxpbmVMZW5ndGg6IDcyXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJlZml4ZXMgPSAnKD86XFxcXHN7NCx9fFxcXFxzKj58XFxcXHMqLVxcXFxzK3xcXFxccypcXFxcZCtcXFxcLnw9fFxcXFwrfC18X3xcXFxcKnwjfFxcXFxzKlxcXFxbW15cXG5dXStcXFxcXTopJztcbnZhciBybGVhZGluZ3ByZWZpeGVzID0gbmV3IFJlZ0V4cCgnXicgKyBwcmVmaXhlcywgJycpO1xudmFyIHJ0ZXh0ID0gbmV3IFJlZ0V4cCgnKFteXFxcXG5dKVxcXFxuKD8hKFxcXFxufCcgKyBwcmVmaXhlcyArICcpKScsICdnJyk7XG52YXIgcnRyYWlsaW5nc3BhY2VzID0gL1xccyskLztcblxuZnVuY3Rpb24gd3JhcCAoY2h1bmtzLCBsZW4pIHtcbiAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnKC57MSwnICsgbGVuICsgJ30pKCArfCRcXFxcbj8pJywgJ2dtJyk7XG5cbiAgdW53cmFwKGNodW5rcyk7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uXG4gICAgLnJlcGxhY2UocmVnZXgsIHJlcGxhY2VyKVxuICAgIC5yZXBsYWNlKHJ0cmFpbGluZ3NwYWNlcywgJycpO1xuXG4gIGZ1bmN0aW9uIHJlcGxhY2VyIChsaW5lLCBtYXJrZWQpIHtcbiAgICByZXR1cm4gcmxlYWRpbmdwcmVmaXhlcy50ZXN0KGxpbmUpID8gbGluZSA6IG1hcmtlZCArICdcXG4nO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVud3JhcCAoY2h1bmtzKSB7XG4gIHJ0ZXh0Lmxhc3RJbmRleCA9IDA7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UocnRleHQsICckMSAkMicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgd3JhcDogd3JhcCxcbiAgdW53cmFwOiB1bndyYXBcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBkaXNwb3NlZDtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRpc3Bvc2FibGUgKCkge1xuICAgIGlmIChkaXNwb3NlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25jZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGRvY3VtZW50O1xuXG5mdW5jdGlvbiBob21lYnJld1FTQSAoY2xhc3NOYW1lKSB7XG4gIHZhciByZXN1bHRzID0gW107XG4gIHZhciBhbGwgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKTtcbiAgdmFyIGk7XG4gIGZvciAoaSBpbiBhbGwpIHtcbiAgICBpZiAod3JhcChhbGxbaV0uY2xhc3NOYW1lKS5pbmRleE9mKHdyYXAoY2xhc3NOYW1lKSkgIT09IC0xKSB7XG4gICAgICByZXN1bHRzLnB1c2goYWxsW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIHdyYXAgKHRleHQpIHtcbiAgcmV0dXJuICcgJyArIHRleHQgKyAnICc7XG59XG5cbmZ1bmN0aW9uIGNsb3NlUHJvbXB0cyAoKSB7XG4gIGlmIChkb2MuYm9keS5xdWVyeVNlbGVjdG9yQWxsKSB7XG4gICAgcmVtb3ZlKGRvYy5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJy53ay1wcm9tcHQnKSk7XG4gIH0gZWxzZSB7XG4gICAgcmVtb3ZlKGhvbWVicmV3UVNBKCd3ay1wcm9tcHQnKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChwcm9tcHRzKSB7XG4gIHZhciBsZW4gPSBwcm9tcHRzLmxlbmd0aDtcbiAgdmFyIGk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHByb21wdHNbaV0ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChwcm9tcHRzW2ldKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb3NlUHJvbXB0cztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGJ1cmVhdWNyYWN5ID0gcmVxdWlyZSgnYnVyZWF1Y3JhY3knKTtcbnZhciByZW5kZXIgPSByZXF1aXJlKCcuL3JlbmRlcicpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuLi9jbGFzc2VzJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB1cGxvYWRzID0gcmVxdWlyZSgnLi4vdXBsb2FkcycpO1xudmFyIEVOVEVSX0tFWSA9IDEzO1xudmFyIEVTQ0FQRV9LRVkgPSAyNztcbnZhciBkcmFnQ2xhc3MgPSAnd2stZHJhZ2dpbmcnO1xudmFyIGRyYWdDbGFzc1NwZWNpZmljID0gJ3drLXByb21wdC11cGxvYWQtZHJhZ2dpbmcnO1xudmFyIHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGNsYXNzaWZ5IChncm91cCwgY2xhc3Nlcykge1xuICBPYmplY3Qua2V5cyhncm91cCkuZm9yRWFjaChjdXN0b21pemUpO1xuICBmdW5jdGlvbiBjdXN0b21pemUgKGtleSkge1xuICAgIGlmIChjbGFzc2VzW2tleV0pIHtcbiAgICAgIGdyb3VwW2tleV0uY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzZXNba2V5XTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvbXB0IChvcHRpb25zLCBkb25lKSB7XG4gIHZhciB0ZXh0ID0gc3RyaW5ncy5wcm9tcHRzW29wdGlvbnMudHlwZV07XG4gIHZhciBkb20gPSByZW5kZXIoe1xuICAgIGlkOiAnd2stcHJvbXB0LScgKyBvcHRpb25zLnR5cGUsXG4gICAgdGl0bGU6IHRleHQudGl0bGUsXG4gICAgZGVzY3JpcHRpb246IHRleHQuZGVzY3JpcHRpb24sXG4gICAgcGxhY2Vob2xkZXI6IHRleHQucGxhY2Vob2xkZXJcbiAgfSk7XG4gIHZhciBkb211cDtcblxuICBjcm9zc3ZlbnQuYWRkKGRvbS5jYW5jZWwsICdjbGljaycsIHJlbW92ZSk7XG4gIGNyb3NzdmVudC5hZGQoZG9tLmNsb3NlLCAnY2xpY2snLCByZW1vdmUpO1xuICBjcm9zc3ZlbnQuYWRkKGRvbS5vaywgJ2NsaWNrJywgb2spO1xuICBjcm9zc3ZlbnQuYWRkKGRvbS5pbnB1dCwgJ2tleXByZXNzJywgZW50ZXIpO1xuICBjcm9zc3ZlbnQuYWRkKGRvbS5kaWFsb2csICdrZXlkb3duJywgZXNjKTtcbiAgY2xhc3NpZnkoZG9tLCBvcHRpb25zLmNsYXNzZXMucHJvbXB0cyk7XG5cbiAgdmFyIHVwbG9hZCA9IG9wdGlvbnMudXBsb2FkO1xuICBpZiAodHlwZW9mIHVwbG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICB1cGxvYWQgPSB7IHVybDogdXBsb2FkIH07XG4gIH1cblxuICB2YXIgYnVyZWF1Y3JhdCA9IG51bGw7XG4gIGlmICh1cGxvYWQpIHtcbiAgICBidXJlYXVjcmF0ID0gYXJyYW5nZVVwbG9hZHMoKTtcbiAgICBpZiAob3B0aW9ucy5hdXRvVXBsb2FkKSB7XG4gICAgICBidXJlYXVjcmF0LnN1Ym1pdChvcHRpb25zLmF1dG9VcGxvYWQpO1xuICAgIH1cbiAgfVxuXG4gIHNldFRpbWVvdXQoZm9jdXNEaWFsb2csIDApO1xuXG4gIGZ1bmN0aW9uIGZvY3VzRGlhbG9nICgpIHtcbiAgICBkb20uaW5wdXQuZm9jdXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVudGVyIChlKSB7XG4gICAgdmFyIGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmIChrZXkgPT09IEVOVEVSX0tFWSkge1xuICAgICAgb2soKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlc2MgKGUpIHtcbiAgICB2YXIga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYgKGtleSA9PT0gRVNDQVBFX0tFWSkge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb2sgKCkge1xuICAgIHJlbW92ZSgpO1xuICAgIGRvbmUoeyBkZWZpbml0aW9uczogW2RvbS5pbnB1dC52YWx1ZV0gfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmUgKCkge1xuICAgIGlmICh1cGxvYWQpIHsgYmluZFVwbG9hZEV2ZW50cyh0cnVlKTsgfVxuICAgIGlmIChkb20uZGlhbG9nLnBhcmVudEVsZW1lbnQpIHsgZG9tLmRpYWxvZy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGRvbS5kaWFsb2cpOyB9XG4gICAgb3B0aW9ucy5zdXJmYWNlLmZvY3VzKG9wdGlvbnMubW9kZSk7XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kVXBsb2FkRXZlbnRzIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0ocm9vdCwgJ2RyYWdlbnRlcicsIGRyYWdnaW5nKTtcbiAgICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdkcmFnZW5kJywgZHJhZ3N0b3ApO1xuICAgIGNyb3NzdmVudFtvcF0ocm9vdCwgJ21vdXNlb3V0JywgZHJhZ3N0b3ApO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhZ2dpbmcgKCkge1xuICAgIGNsYXNzZXMuYWRkKGRvbXVwLmFyZWEsIGRyYWdDbGFzcyk7XG4gICAgY2xhc3Nlcy5hZGQoZG9tdXAuYXJlYSwgZHJhZ0NsYXNzU3BlY2lmaWMpO1xuICB9XG4gIGZ1bmN0aW9uIGRyYWdzdG9wICgpIHtcbiAgICBjbGFzc2VzLnJtKGRvbXVwLmFyZWEsIGRyYWdDbGFzcyk7XG4gICAgY2xhc3Nlcy5ybShkb211cC5hcmVhLCBkcmFnQ2xhc3NTcGVjaWZpYyk7XG4gICAgdXBsb2Fkcy5zdG9wKG9wdGlvbnMuc3VyZmFjZS5kcm9wYXJlYSk7XG4gIH1cblxuICBmdW5jdGlvbiBhcnJhbmdlVXBsb2FkcyAoKSB7XG4gICAgZG9tdXAgPSByZW5kZXIudXBsb2Fkcyhkb20sIHN0cmluZ3MucHJvbXB0cy50eXBlcyArICh1cGxvYWQucmVzdHJpY3Rpb24gfHwgb3B0aW9ucy50eXBlICsgJ3MnKSk7XG4gICAgYmluZFVwbG9hZEV2ZW50cygpO1xuICAgIGNyb3NzdmVudC5hZGQoZG9tdXAuYXJlYSwgJ2RyYWdvdmVyJywgaGFuZGxlRHJhZ092ZXIsIGZhbHNlKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGRvbXVwLmFyZWEsICdkcm9wJywgaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuICAgIGNsYXNzaWZ5KGRvbXVwLCBvcHRpb25zLmNsYXNzZXMucHJvbXB0cyk7XG5cbiAgICB2YXIgYnVyZWF1Y3JhdCA9IGJ1cmVhdWNyYWN5LnNldHVwKGRvbXVwLmZpbGVpbnB1dCwge1xuICAgICAgbWV0aG9kOiB1cGxvYWQubWV0aG9kLFxuICAgICAgZm9ybURhdGE6IHVwbG9hZC5mb3JtRGF0YSxcbiAgICAgIGZpZWxkS2V5OiB1cGxvYWQuZmllbGRLZXksXG4gICAgICBlbmRwb2ludDogdXBsb2FkLnVybCxcbiAgICAgIHZhbGlkYXRlOiAnaW1hZ2UnXG4gICAgfSk7XG5cbiAgICBidXJlYXVjcmF0Lm9uKCdzdGFydGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2xhc3Nlcy5ybShkb211cC5mYWlsZWQsICd3ay1wcm9tcHQtZXJyb3Itc2hvdycpO1xuICAgICAgY2xhc3Nlcy5ybShkb211cC53YXJuaW5nLCAnd2stcHJvbXB0LWVycm9yLXNob3cnKTtcbiAgICB9KTtcbiAgICBidXJlYXVjcmF0Lm9uKCd2YWxpZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNsYXNzZXMuYWRkKGRvbXVwLmFyZWEsICd3ay1wcm9tcHQtdXBsb2FkaW5nJyk7XG4gICAgfSk7XG4gICAgYnVyZWF1Y3JhdC5vbignaW52YWxpZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNsYXNzZXMuYWRkKGRvbXVwLndhcm5pbmcsICd3ay1wcm9tcHQtZXJyb3Itc2hvdycpO1xuICAgIH0pO1xuICAgIGJ1cmVhdWNyYXQub24oJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2xhc3Nlcy5hZGQoZG9tdXAuZmFpbGVkLCAnd2stcHJvbXB0LWVycm9yLXNob3cnKTtcbiAgICB9KTtcbiAgICBidXJlYXVjcmF0Lm9uKCdzdWNjZXNzJywgcmVjZWl2ZWRJbWFnZXMpO1xuICAgIGJ1cmVhdWNyYXQub24oJ2VuZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2xhc3Nlcy5ybShkb211cC5hcmVhLCAnd2stcHJvbXB0LXVwbG9hZGluZycpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJ1cmVhdWNyYXQ7XG5cbiAgICBmdW5jdGlvbiByZWNlaXZlZEltYWdlcyAocmVzdWx0cykge1xuICAgICAgdmFyIGJvZHkgPSByZXN1bHRzWzBdO1xuICAgICAgZG9tLmlucHV0LnZhbHVlID0gYm9keS5ocmVmICsgJyBcIicgKyBib2R5LnRpdGxlICsgJ1wiJztcbiAgICAgIHJlbW92ZSgpO1xuICAgICAgZG9uZSh7XG4gICAgICAgIGRlZmluaXRpb25zOiByZXN1bHRzLm1hcCh0b0RlZmluaXRpb24pLFxuICAgICAgICBhdHRhY2htZW50OiBvcHRpb25zLnR5cGUgPT09ICdhdHRhY2htZW50J1xuICAgICAgfSk7XG4gICAgICBmdW5jdGlvbiB0b0RlZmluaXRpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0LmhyZWYgKyAnIFwiJyArIHJlc3VsdC50aXRsZSArICdcIic7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIgKGUpIHtcbiAgICBzdG9wKGUpO1xuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVGaWxlU2VsZWN0IChlKSB7XG4gICAgZHJhZ3N0b3AoKTtcbiAgICBzdG9wKGUpO1xuICAgIGJ1cmVhdWNyYXQuc3VibWl0KGUuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AgKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb21wdDtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGdldFRleHQgPSByZXF1aXJlKCcuLi9nZXRUZXh0Jyk7XG52YXIgc2V0VGV4dCA9IHJlcXVpcmUoJy4uL3NldFRleHQnKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi4vY2xhc3NlcycpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgYWMgPSAnYXBwZW5kQ2hpbGQnO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcblxuZnVuY3Rpb24gZSAodHlwZSwgY2xzLCB0ZXh0KSB7XG4gIHZhciBlbCA9IGRvYy5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBlbC5jbGFzc05hbWUgPSBjbHM7XG4gIGlmICh0ZXh0KSB7XG4gICAgc2V0VGV4dChlbCwgdGV4dCk7XG4gIH1cbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiByZW5kZXIgKG9wdGlvbnMpIHtcbiAgdmFyIGRvbSA9IHtcbiAgICBkaWFsb2c6IGUoJ2FydGljbGUnLCAnd2stcHJvbXB0ICcgKyBvcHRpb25zLmlkKSxcbiAgICBjbG9zZTogZSgnYScsICd3ay1wcm9tcHQtY2xvc2UnKSxcbiAgICBoZWFkZXI6IGUoJ2hlYWRlcicsICd3ay1wcm9tcHQtaGVhZGVyJyksXG4gICAgaDE6IGUoJ2gxJywgJ3drLXByb21wdC10aXRsZScsIG9wdGlvbnMudGl0bGUpLFxuICAgIHNlY3Rpb246IGUoJ3NlY3Rpb24nLCAnd2stcHJvbXB0LWJvZHknKSxcbiAgICBkZXNjOiBlKCdwJywgJ3drLXByb21wdC1kZXNjcmlwdGlvbicsIG9wdGlvbnMuZGVzY3JpcHRpb24pLFxuICAgIGlucHV0Q29udGFpbmVyOiBlKCdkaXYnLCAnd2stcHJvbXB0LWlucHV0LWNvbnRhaW5lcicpLFxuICAgIGlucHV0OiBlKCdpbnB1dCcsICd3ay1wcm9tcHQtaW5wdXQnKSxcbiAgICBjYW5jZWw6IGUoJ2J1dHRvbicsICd3ay1wcm9tcHQtY2FuY2VsJywgJ0NhbmNlbCcpLFxuICAgIG9rOiBlKCdidXR0b24nLCAnd2stcHJvbXB0LW9rJywgJ09rJyksXG4gICAgZm9vdGVyOiBlKCdmb290ZXInLCAnd2stcHJvbXB0LWJ1dHRvbnMnKVxuICB9O1xuICBkb20ub2sudHlwZSA9ICdidXR0b24nO1xuICBkb20uaGVhZGVyW2FjXShkb20uaDEpO1xuICBkb20uc2VjdGlvblthY10oZG9tLmRlc2MpO1xuICBkb20uc2VjdGlvblthY10oZG9tLmlucHV0Q29udGFpbmVyKTtcbiAgZG9tLmlucHV0Q29udGFpbmVyW2FjXShkb20uaW5wdXQpO1xuICBkb20uaW5wdXQucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyO1xuICBkb20uY2FuY2VsLnR5cGUgPSAnYnV0dG9uJztcbiAgZG9tLmZvb3RlclthY10oZG9tLmNhbmNlbCk7XG4gIGRvbS5mb290ZXJbYWNdKGRvbS5vayk7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5jbG9zZSk7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5oZWFkZXIpO1xuICBkb20uZGlhbG9nW2FjXShkb20uc2VjdGlvbik7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5mb290ZXIpO1xuICBkb2MuYm9keVthY10oZG9tLmRpYWxvZyk7XG4gIHJldHVybiBkb207XG59XG5cbmZ1bmN0aW9uIHVwbG9hZHMgKGRvbSwgd2FybmluZykge1xuICB2YXIgZnVwID0gJ3drLXByb21wdC1maWxldXBsb2FkJztcbiAgdmFyIGRvbXVwID0ge1xuICAgIGFyZWE6IGUoJ3NlY3Rpb24nLCAnd2stcHJvbXB0LXVwbG9hZC1hcmVhJyksXG4gICAgd2FybmluZzogZSgncCcsICd3ay1wcm9tcHQtZXJyb3Igd2std2FybmluZycsIHdhcm5pbmcpLFxuICAgIGZhaWxlZDogZSgncCcsICd3ay1wcm9tcHQtZXJyb3Igd2stZmFpbGVkJywgc3RyaW5ncy5wcm9tcHRzLnVwbG9hZGZhaWxlZCksXG4gICAgdXBsb2FkOiBlKCdsYWJlbCcsICd3ay1wcm9tcHQtdXBsb2FkJyksXG4gICAgdXBsb2FkaW5nOiBlKCdzcGFuJywgJ3drLXByb21wdC1wcm9ncmVzcycsIHN0cmluZ3MucHJvbXB0cy51cGxvYWRpbmcpLFxuICAgIGRyb3A6IGUoJ3NwYW4nLCAnd2stcHJvbXB0LWRyb3AnLCBzdHJpbmdzLnByb21wdHMuZHJvcCksXG4gICAgZHJvcGljb246IGUoJ3AnLCAnd2stZHJvcC1pY29uIHdrLXByb21wdC1kcm9wLWljb24nKSxcbiAgICBicm93c2U6IGUoJ3NwYW4nLCAnd2stcHJvbXB0LWJyb3dzZScsIHN0cmluZ3MucHJvbXB0cy5icm93c2UpLFxuICAgIGRyYWdkcm9wOiBlKCdwJywgJ3drLXByb21wdC1kcmFnZHJvcCcsIHN0cmluZ3MucHJvbXB0cy5kcm9waGludCksXG4gICAgZmlsZWlucHV0OiBlKCdpbnB1dCcsIGZ1cClcbiAgfTtcbiAgZG9tdXAuYXJlYVthY10oZG9tdXAuZHJvcCk7XG4gIGRvbXVwLmFyZWFbYWNdKGRvbXVwLnVwbG9hZGluZyk7XG4gIGRvbXVwLmFyZWFbYWNdKGRvbXVwLmRyb3BpY29uKTtcbiAgZG9tdXAudXBsb2FkW2FjXShkb211cC5icm93c2UpO1xuICBkb211cC51cGxvYWRbYWNdKGRvbXVwLmZpbGVpbnB1dCk7XG4gIGRvbXVwLmZpbGVpbnB1dC5pZCA9IGZ1cDtcbiAgZG9tdXAuZmlsZWlucHV0LnR5cGUgPSAnZmlsZSc7XG4gIGRvbXVwLmZpbGVpbnB1dC5tdWx0aXBsZSA9ICdtdWx0aXBsZSc7XG4gIGRvbS5kaWFsb2cuY2xhc3NOYW1lICs9ICcgd2stcHJvbXB0LXVwbG9hZHMnO1xuICBkb20uaW5wdXRDb250YWluZXIuY2xhc3NOYW1lICs9ICcgd2stcHJvbXB0LWlucHV0LWNvbnRhaW5lci11cGxvYWRzJztcbiAgZG9tLmlucHV0LmNsYXNzTmFtZSArPSAnIHdrLXByb21wdC1pbnB1dC11cGxvYWRzJztcbiAgZG9tLnNlY3Rpb24uaW5zZXJ0QmVmb3JlKGRvbXVwLndhcm5pbmcsIGRvbS5pbnB1dENvbnRhaW5lcik7XG4gIGRvbS5zZWN0aW9uLmluc2VydEJlZm9yZShkb211cC5mYWlsZWQsIGRvbS5pbnB1dENvbnRhaW5lcik7XG4gIGRvbS5zZWN0aW9uW2FjXShkb211cC51cGxvYWQpO1xuICBkb20uc2VjdGlvblthY10oZG9tdXAuZHJhZ2Ryb3ApO1xuICBkb20uc2VjdGlvblthY10oZG9tdXAuYXJlYSk7XG4gIHNldFRleHQoZG9tLmRlc2MsIGdldFRleHQoZG9tLmRlc2MpICsgc3RyaW5ncy5wcm9tcHRzLnVwbG9hZCk7XG4gIGNyb3NzdmVudC5hZGQoZG9tdXAuZmlsZWlucHV0LCAnZm9jdXMnLCBmb2N1c2VkRmlsZUlucHV0KTtcbiAgY3Jvc3N2ZW50LmFkZChkb211cC5maWxlaW5wdXQsICdibHVyJywgYmx1cnJlZEZpbGVJbnB1dCk7XG5cbiAgZnVuY3Rpb24gZm9jdXNlZEZpbGVJbnB1dCAoKSB7XG4gICAgY2xhc3Nlcy5hZGQoZG9tdXAudXBsb2FkLCAnd2stZm9jdXNlZCcpO1xuICB9XG4gIGZ1bmN0aW9uIGJsdXJyZWRGaWxlSW5wdXQgKCkge1xuICAgIGNsYXNzZXMucm0oZG9tdXAudXBsb2FkLCAnd2stZm9jdXNlZCcpO1xuICB9XG4gIHJldHVybiBkb211cDtcbn1cblxucmVuZGVyLnVwbG9hZHMgPSB1cGxvYWRzO1xubW9kdWxlLmV4cG9ydHMgPSByZW5kZXI7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OXdjbTl0Y0hSekwzSmxibVJsY2k1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQmpjbTl6YzNabGJuUWdQU0J5WlhGMWFYSmxLQ2RqY205emMzWmxiblFuS1R0Y2JuWmhjaUJuWlhSVVpYaDBJRDBnY21WeGRXbHlaU2duTGk0dloyVjBWR1Y0ZENjcE8xeHVkbUZ5SUhObGRGUmxlSFFnUFNCeVpYRjFhWEpsS0NjdUxpOXpaWFJVWlhoMEp5azdYRzUyWVhJZ1kyeGhjM05sY3lBOUlISmxjWFZwY21Vb0p5NHVMMk5zWVhOelpYTW5LVHRjYm5aaGNpQnpkSEpwYm1keklEMGdjbVZ4ZFdseVpTZ25MaTR2YzNSeWFXNW5jeWNwTzF4dWRtRnlJR0ZqSUQwZ0oyRndjR1Z1WkVOb2FXeGtKenRjYm5aaGNpQmtiMk1nUFNCbmJHOWlZV3d1Wkc5amRXMWxiblE3WEc1Y2JtWjFibU4wYVc5dUlHVWdLSFI1Y0dVc0lHTnNjeXdnZEdWNGRDa2dlMXh1SUNCMllYSWdaV3dnUFNCa2IyTXVZM0psWVhSbFJXeGxiV1Z1ZENoMGVYQmxLVHRjYmlBZ1pXd3VZMnhoYzNOT1lXMWxJRDBnWTJ4ek8xeHVJQ0JwWmlBb2RHVjRkQ2tnZTF4dUlDQWdJSE5sZEZSbGVIUW9aV3dzSUhSbGVIUXBPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQmxiRHRjYm4xY2JseHVablZ1WTNScGIyNGdjbVZ1WkdWeUlDaHZjSFJwYjI1ektTQjdYRzRnSUhaaGNpQmtiMjBnUFNCN1hHNGdJQ0FnWkdsaGJHOW5PaUJsS0NkaGNuUnBZMnhsSnl3Z0ozZHJMWEJ5YjIxd2RDQW5JQ3NnYjNCMGFXOXVjeTVwWkNrc1hHNGdJQ0FnWTJ4dmMyVTZJR1VvSjJFbkxDQW5kMnN0Y0hKdmJYQjBMV05zYjNObEp5a3NYRzRnSUNBZ2FHVmhaR1Z5T2lCbEtDZG9aV0ZrWlhJbkxDQW5kMnN0Y0hKdmJYQjBMV2hsWVdSbGNpY3BMRnh1SUNBZ0lHZ3hPaUJsS0Nkb01TY3NJQ2QzYXkxd2NtOXRjSFF0ZEdsMGJHVW5MQ0J2Y0hScGIyNXpMblJwZEd4bEtTeGNiaUFnSUNCelpXTjBhVzl1T2lCbEtDZHpaV04wYVc5dUp5d2dKM2RyTFhCeWIyMXdkQzFpYjJSNUp5a3NYRzRnSUNBZ1pHVnpZem9nWlNnbmNDY3NJQ2QzYXkxd2NtOXRjSFF0WkdWelkzSnBjSFJwYjI0bkxDQnZjSFJwYjI1ekxtUmxjMk55YVhCMGFXOXVLU3hjYmlBZ0lDQnBibkIxZEVOdmJuUmhhVzVsY2pvZ1pTZ25aR2wySnl3Z0ozZHJMWEJ5YjIxd2RDMXBibkIxZEMxamIyNTBZV2x1WlhJbktTeGNiaUFnSUNCcGJuQjFkRG9nWlNnbmFXNXdkWFFuTENBbmQyc3RjSEp2YlhCMExXbHVjSFYwSnlrc1hHNGdJQ0FnWTJGdVkyVnNPaUJsS0NkaWRYUjBiMjRuTENBbmQyc3RjSEp2YlhCMExXTmhibU5sYkNjc0lDZERZVzVqWld3bktTeGNiaUFnSUNCdmF6b2daU2duWW5WMGRHOXVKeXdnSjNkckxYQnliMjF3ZEMxdmF5Y3NJQ2RQYXljcExGeHVJQ0FnSUdadmIzUmxjam9nWlNnblptOXZkR1Z5Snl3Z0ozZHJMWEJ5YjIxd2RDMWlkWFIwYjI1ekp5bGNiaUFnZlR0Y2JpQWdaRzl0TG05ckxuUjVjR1VnUFNBblluVjBkRzl1Snp0Y2JpQWdaRzl0TG1obFlXUmxjbHRoWTEwb1pHOXRMbWd4S1R0Y2JpQWdaRzl0TG5ObFkzUnBiMjViWVdOZEtHUnZiUzVrWlhOaktUdGNiaUFnWkc5dExuTmxZM1JwYjI1YllXTmRLR1J2YlM1cGJuQjFkRU52Ym5SaGFXNWxjaWs3WEc0Z0lHUnZiUzVwYm5CMWRFTnZiblJoYVc1bGNsdGhZMTBvWkc5dExtbHVjSFYwS1R0Y2JpQWdaRzl0TG1sdWNIVjBMbkJzWVdObGFHOXNaR1Z5SUQwZ2IzQjBhVzl1Y3k1d2JHRmpaV2h2YkdSbGNqdGNiaUFnWkc5dExtTmhibU5sYkM1MGVYQmxJRDBnSjJKMWRIUnZiaWM3WEc0Z0lHUnZiUzVtYjI5MFpYSmJZV05kS0dSdmJTNWpZVzVqWld3cE8xeHVJQ0JrYjIwdVptOXZkR1Z5VzJGalhTaGtiMjB1YjJzcE8xeHVJQ0JrYjIwdVpHbGhiRzluVzJGalhTaGtiMjB1WTJ4dmMyVXBPMXh1SUNCa2IyMHVaR2xoYkc5blcyRmpYU2hrYjIwdWFHVmhaR1Z5S1R0Y2JpQWdaRzl0TG1ScFlXeHZaMXRoWTEwb1pHOXRMbk5sWTNScGIyNHBPMXh1SUNCa2IyMHVaR2xoYkc5blcyRmpYU2hrYjIwdVptOXZkR1Z5S1R0Y2JpQWdaRzlqTG1KdlpIbGJZV05kS0dSdmJTNWthV0ZzYjJjcE8xeHVJQ0J5WlhSMWNtNGdaRzl0TzF4dWZWeHVYRzVtZFc1amRHbHZiaUIxY0d4dllXUnpJQ2hrYjIwc0lIZGhjbTVwYm1jcElIdGNiaUFnZG1GeUlHWjFjQ0E5SUNkM2F5MXdjbTl0Y0hRdFptbHNaWFZ3Ykc5aFpDYzdYRzRnSUhaaGNpQmtiMjExY0NBOUlIdGNiaUFnSUNCaGNtVmhPaUJsS0NkelpXTjBhVzl1Snl3Z0ozZHJMWEJ5YjIxd2RDMTFjR3h2WVdRdFlYSmxZU2NwTEZ4dUlDQWdJSGRoY201cGJtYzZJR1VvSjNBbkxDQW5kMnN0Y0hKdmJYQjBMV1Z5Y205eUlIZHJMWGRoY201cGJtY25MQ0IzWVhKdWFXNW5LU3hjYmlBZ0lDQm1ZV2xzWldRNklHVW9KM0FuTENBbmQyc3RjSEp2YlhCMExXVnljbTl5SUhkckxXWmhhV3hsWkNjc0lITjBjbWx1WjNNdWNISnZiWEIwY3k1MWNHeHZZV1JtWVdsc1pXUXBMRnh1SUNBZ0lIVndiRzloWkRvZ1pTZ25iR0ZpWld3bkxDQW5kMnN0Y0hKdmJYQjBMWFZ3Ykc5aFpDY3BMRnh1SUNBZ0lIVndiRzloWkdsdVp6b2daU2duYzNCaGJpY3NJQ2QzYXkxd2NtOXRjSFF0Y0hKdlozSmxjM01uTENCemRISnBibWR6TG5CeWIyMXdkSE11ZFhCc2IyRmthVzVuS1N4Y2JpQWdJQ0JrY205d09pQmxLQ2R6Y0dGdUp5d2dKM2RyTFhCeWIyMXdkQzFrY205d0p5d2djM1J5YVc1bmN5NXdjbTl0Y0hSekxtUnliM0FwTEZ4dUlDQWdJR1J5YjNCcFkyOXVPaUJsS0Nkd0p5d2dKM2RyTFdSeWIzQXRhV052YmlCM2F5MXdjbTl0Y0hRdFpISnZjQzFwWTI5dUp5a3NYRzRnSUNBZ1luSnZkM05sT2lCbEtDZHpjR0Z1Snl3Z0ozZHJMWEJ5YjIxd2RDMWljbTkzYzJVbkxDQnpkSEpwYm1kekxuQnliMjF3ZEhNdVluSnZkM05sS1N4Y2JpQWdJQ0JrY21GblpISnZjRG9nWlNnbmNDY3NJQ2QzYXkxd2NtOXRjSFF0WkhKaFoyUnliM0FuTENCemRISnBibWR6TG5CeWIyMXdkSE11WkhKdmNHaHBiblFwTEZ4dUlDQWdJR1pwYkdWcGJuQjFkRG9nWlNnbmFXNXdkWFFuTENCbWRYQXBYRzRnSUgwN1hHNGdJR1J2YlhWd0xtRnlaV0ZiWVdOZEtHUnZiWFZ3TG1SeWIzQXBPMXh1SUNCa2IyMTFjQzVoY21WaFcyRmpYU2hrYjIxMWNDNTFjR3h2WVdScGJtY3BPMXh1SUNCa2IyMTFjQzVoY21WaFcyRmpYU2hrYjIxMWNDNWtjbTl3YVdOdmJpazdYRzRnSUdSdmJYVndMblZ3Ykc5aFpGdGhZMTBvWkc5dGRYQXVZbkp2ZDNObEtUdGNiaUFnWkc5dGRYQXVkWEJzYjJGa1cyRmpYU2hrYjIxMWNDNW1hV3hsYVc1d2RYUXBPMXh1SUNCa2IyMTFjQzVtYVd4bGFXNXdkWFF1YVdRZ1BTQm1kWEE3WEc0Z0lHUnZiWFZ3TG1acGJHVnBibkIxZEM1MGVYQmxJRDBnSjJacGJHVW5PMXh1SUNCa2IyMTFjQzVtYVd4bGFXNXdkWFF1YlhWc2RHbHdiR1VnUFNBbmJYVnNkR2x3YkdVbk8xeHVJQ0JrYjIwdVpHbGhiRzluTG1Oc1lYTnpUbUZ0WlNBclBTQW5JSGRyTFhCeWIyMXdkQzExY0d4dllXUnpKenRjYmlBZ1pHOXRMbWx1Y0hWMFEyOXVkR0ZwYm1WeUxtTnNZWE56VG1GdFpTQXJQU0FuSUhkckxYQnliMjF3ZEMxcGJuQjFkQzFqYjI1MFlXbHVaWEl0ZFhCc2IyRmtjeWM3WEc0Z0lHUnZiUzVwYm5CMWRDNWpiR0Z6YzA1aGJXVWdLejBnSnlCM2F5MXdjbTl0Y0hRdGFXNXdkWFF0ZFhCc2IyRmtjeWM3WEc0Z0lHUnZiUzV6WldOMGFXOXVMbWx1YzJWeWRFSmxabTl5WlNoa2IyMTFjQzUzWVhKdWFXNW5MQ0JrYjIwdWFXNXdkWFJEYjI1MFlXbHVaWElwTzF4dUlDQmtiMjB1YzJWamRHbHZiaTVwYm5ObGNuUkNaV1p2Y21Vb1pHOXRkWEF1Wm1GcGJHVmtMQ0JrYjIwdWFXNXdkWFJEYjI1MFlXbHVaWElwTzF4dUlDQmtiMjB1YzJWamRHbHZibHRoWTEwb1pHOXRkWEF1ZFhCc2IyRmtLVHRjYmlBZ1pHOXRMbk5sWTNScGIyNWJZV05kS0dSdmJYVndMbVJ5WVdka2NtOXdLVHRjYmlBZ1pHOXRMbk5sWTNScGIyNWJZV05kS0dSdmJYVndMbUZ5WldFcE8xeHVJQ0J6WlhSVVpYaDBLR1J2YlM1a1pYTmpMQ0JuWlhSVVpYaDBLR1J2YlM1a1pYTmpLU0FySUhOMGNtbHVaM011Y0hKdmJYQjBjeTUxY0d4dllXUXBPMXh1SUNCamNtOXpjM1psYm5RdVlXUmtLR1J2YlhWd0xtWnBiR1ZwYm5CMWRDd2dKMlp2WTNWekp5d2dabTlqZFhObFpFWnBiR1ZKYm5CMWRDazdYRzRnSUdOeWIzTnpkbVZ1ZEM1aFpHUW9aRzl0ZFhBdVptbHNaV2x1Y0hWMExDQW5ZbXgxY2ljc0lHSnNkWEp5WldSR2FXeGxTVzV3ZFhRcE8xeHVYRzRnSUdaMWJtTjBhVzl1SUdadlkzVnpaV1JHYVd4bFNXNXdkWFFnS0NrZ2UxeHVJQ0FnSUdOc1lYTnpaWE11WVdSa0tHUnZiWFZ3TG5Wd2JHOWhaQ3dnSjNkckxXWnZZM1Z6WldRbktUdGNiaUFnZlZ4dUlDQm1kVzVqZEdsdmJpQmliSFZ5Y21Wa1JtbHNaVWx1Y0hWMElDZ3BJSHRjYmlBZ0lDQmpiR0Z6YzJWekxuSnRLR1J2YlhWd0xuVndiRzloWkN3Z0ozZHJMV1p2WTNWelpXUW5LVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdaRzl0ZFhBN1hHNTlYRzVjYm5KbGJtUmxjaTUxY0d4dllXUnpJRDBnZFhCc2IyRmtjenRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21WdVpHVnlPMXh1SWwxOSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJ1bGxzZXllID0gcmVxdWlyZSgnYnVsbHNleWUnKTtcblxuZnVuY3Rpb24gcmVtZW1iZXJTZWxlY3Rpb24gKGhpc3RvcnkpIHtcbiAgdmFyIGNvZGUgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE4KS5zdWJzdHIoMikucmVwbGFjZSgvXFxkKy9nLCAnJyk7XG4gIHZhciBvcGVuID0gJ1dvb2ZtYXJrU2VsZWN0aW9uT3Blbk1hcmtlcicgKyBjb2RlO1xuICB2YXIgY2xvc2UgPSAnV29vZm1hcmtTZWxlY3Rpb25DbG9zZU1hcmtlcicgKyBjb2RlO1xuICB2YXIgcm1hcmtlcnMgPSBuZXcgUmVnRXhwKG9wZW4gKyAnfCcgKyBjbG9zZSwgJ2cnKTtcbiAgcmV0dXJuIHtcbiAgICBtYXJrZXJzOiBtYXJrZXJzKCksXG4gICAgdW5tYXJrOiB1bm1hcmtcbiAgfTtcblxuICBmdW5jdGlvbiBtYXJrZXJzICgpIHtcbiAgICB2YXIgc3RhdGUgPSBoaXN0b3J5LnJlc2V0KCkuaW5wdXRTdGF0ZTtcbiAgICB2YXIgY2h1bmtzID0gc3RhdGUuZ2V0Q2h1bmtzKCk7XG4gICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gY2h1bmtzLmJlZm9yZS5sZW5ndGg7XG4gICAgdmFyIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvblN0YXJ0ICsgY2h1bmtzLnNlbGVjdGlvbi5sZW5ndGg7XG4gICAgcmV0dXJuIFtbc2VsZWN0aW9uU3RhcnQsIG9wZW5dLCBbc2VsZWN0aW9uRW5kLCBjbG9zZV1dO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5tYXJrICgpIHtcbiAgICB2YXIgc3RhdGUgPSBoaXN0b3J5LmlucHV0U3RhdGU7XG4gICAgdmFyIGNodW5rcyA9IHN0YXRlLmdldENodW5rcygpO1xuICAgIHZhciBhbGwgPSBjaHVua3MuYmVmb3JlICsgY2h1bmtzLnNlbGVjdGlvbiArIGNodW5rcy5hZnRlcjtcbiAgICB2YXIgc3RhcnQgPSBhbGwubGFzdEluZGV4T2Yob3Blbik7XG4gICAgdmFyIGVuZCA9IGFsbC5sYXN0SW5kZXhPZihjbG9zZSkgKyBjbG9zZS5sZW5ndGg7XG4gICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gc3RhcnQgPT09IC0xID8gMCA6IHN0YXJ0O1xuICAgIHZhciBzZWxlY3Rpb25FbmQgPSBlbmQgPT09IC0xID8gMCA6IGVuZDtcbiAgICBjaHVua3MuYmVmb3JlID0gYWxsLnN1YnN0cigwLCBzZWxlY3Rpb25TdGFydCkucmVwbGFjZShybWFya2VycywgJycpO1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBhbGwuc3Vic3RyKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQgLSBzZWxlY3Rpb25TdGFydCkucmVwbGFjZShybWFya2VycywgJycpO1xuICAgIGNodW5rcy5hZnRlciA9IGFsbC5zdWJzdHIoZW5kKS5yZXBsYWNlKHJtYXJrZXJzLCAnJyk7XG4gICAgdmFyIGVsID0gaGlzdG9yeS5zdXJmYWNlLmN1cnJlbnQoaGlzdG9yeS5pbnB1dE1vZGUpO1xuICAgIHZhciBleWUgPSBidWxsc2V5ZShlbCwge1xuICAgICAgY2FyZXQ6IHRydWUsIGF1dG91cGRhdGVUb0NhcmV0OiBmYWxzZSwgdHJhY2tpbmc6IGZhbHNlXG4gICAgfSk7XG4gICAgc3RhdGUuc2V0Q2h1bmtzKGNodW5rcyk7XG4gICAgc3RhdGUucmVzdG9yZShmYWxzZSk7XG4gICAgc3RhdGUuc2Nyb2xsVG9wID0gZWwuc2Nyb2xsVG9wID0gZXllLnJlYWQoKS55IC0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gNTA7XG4gICAgZXllLmRlc3Ryb3koKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbWVtYmVyU2VsZWN0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2V0VGV4dCA9IHJlcXVpcmUoJy4vc2V0VGV4dCcpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuL3N0cmluZ3MnKTtcblxuZnVuY3Rpb24gY29tbWFuZHMgKGVsLCBpZCkge1xuICBzZXRUZXh0KGVsLCBzdHJpbmdzLmJ1dHRvbnNbaWRdIHx8IGlkKTtcbn1cblxuZnVuY3Rpb24gbW9kZXMgKGVsLCBpZCkge1xuICB2YXIgdGV4dHMgPSB7XG4gICAgbWFya2Rvd246ICdtXFx1MjE5MycsXG4gICAgd3lzaXd5ZzogJ3d5c2l3eWcnXG4gIH07XG4gIHNldFRleHQoZWwsIHRleHRzW2lkXSB8fCBpZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtb2RlczogbW9kZXMsXG4gIGNvbW1hbmRzOiBjb21tYW5kc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gc2V0VGV4dCAoZWwsIHZhbHVlKSB7XG4gIGVsLmlubmVyVGV4dCA9IGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VGV4dDtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBsYWNlaG9sZGVyczoge1xuICAgIGJvbGQ6ICdzdHJvbmcgdGV4dCcsXG4gICAgaXRhbGljOiAnZW1waGFzaXplZCB0ZXh0JyxcbiAgICBxdW90ZTogJ3F1b3RlZCB0ZXh0JyxcbiAgICBjb2RlOiAnY29kZSBnb2VzIGhlcmUnLFxuICAgIGxpc3RpdGVtOiAnbGlzdCBpdGVtJyxcbiAgICBoZWFkaW5nOiAnSGVhZGluZyBUZXh0JyxcbiAgICBsaW5rOiAnbGluayB0ZXh0JyxcbiAgICBpbWFnZTogJ2ltYWdlIGRlc2NyaXB0aW9uJyxcbiAgICBhdHRhY2htZW50OiAnYXR0YWNobWVudCBkZXNjcmlwdGlvbidcbiAgfSxcbiAgdGl0bGVzOiB7XG4gICAgYm9sZDogJ1N0cm9uZyA8c3Ryb25nPiBDdHJsK0InLFxuICAgIGl0YWxpYzogJ0VtcGhhc2lzIDxlbT4gQ3RybCtJJyxcbiAgICBxdW90ZTogJ0Jsb2NrcXVvdGUgPGJsb2NrcXVvdGU+IEN0cmwrSicsXG4gICAgY29kZTogJ0NvZGUgU2FtcGxlIDxwcmU+PGNvZGU+IEN0cmwrRScsXG4gICAgb2w6ICdOdW1iZXJlZCBMaXN0IDxvbD4gQ3RybCtPJyxcbiAgICB1bDogJ0J1bGxldGVkIExpc3QgPHVsPiBDdHJsK1UnLFxuICAgIGhlYWRpbmc6ICdIZWFkaW5nIDxoMT4sIDxoMj4sIC4uLiBDdHJsK0QnLFxuICAgIGxpbms6ICdIeXBlcmxpbmsgPGE+IEN0cmwrSycsXG4gICAgaW1hZ2U6ICdJbWFnZSA8aW1nPiBDdHJsK0cnLFxuICAgIGF0dGFjaG1lbnQ6ICdBdHRhY2htZW50IEN0cmwrU2hpZnQrSycsXG4gICAgbWFya2Rvd246ICdNYXJrZG93biBNb2RlIEN0cmwrTScsXG4gICAgaHRtbDogJ0hUTUwgTW9kZSBDdHJsK0gnLFxuICAgIHd5c2l3eWc6ICdQcmV2aWV3IE1vZGUgQ3RybCtQJ1xuICB9LFxuICBidXR0b25zOiB7XG4gICAgYm9sZDogJ0InLFxuICAgIGl0YWxpYzogJ0knLFxuICAgIHF1b3RlOiAnXFx1MjAxYycsXG4gICAgY29kZTogJzwvPicsXG4gICAgb2w6ICcxLicsXG4gICAgdWw6ICdcXHUyOUJGJyxcbiAgICBoZWFkaW5nOiAnVHQnLFxuICAgIGxpbms6ICdMaW5rJyxcbiAgICBpbWFnZTogJ0ltYWdlJyxcbiAgICBhdHRhY2htZW50OiAnQXR0YWNobWVudCcsXG4gICAgaHI6ICdcXHUyMWI1J1xuICB9LFxuICBwcm9tcHRzOiB7XG4gICAgbGluazoge1xuICAgICAgdGl0bGU6ICdJbnNlcnQgTGluaycsXG4gICAgICBkZXNjcmlwdGlvbjogJ1R5cGUgb3IgcGFzdGUgdGhlIHVybCB0byB5b3VyIGxpbmsnLFxuICAgICAgcGxhY2Vob2xkZXI6ICdodHRwOi8vZXhhbXBsZS5jb20vIFwidGl0bGVcIidcbiAgICB9LFxuICAgIGltYWdlOiB7XG4gICAgICB0aXRsZTogJ0luc2VydCBJbWFnZScsXG4gICAgICBkZXNjcmlwdGlvbjogJ0VudGVyIHRoZSB1cmwgdG8geW91ciBpbWFnZScsXG4gICAgICBwbGFjZWhvbGRlcjogJ2h0dHA6Ly9leGFtcGxlLmNvbS9wdWJsaWMvaW1hZ2UucG5nIFwidGl0bGVcIidcbiAgICB9LFxuICAgIGF0dGFjaG1lbnQ6IHtcbiAgICAgIHRpdGxlOiAnQXR0YWNoIEZpbGUnLFxuICAgICAgZGVzY3JpcHRpb246ICdFbnRlciB0aGUgdXJsIHRvIHlvdXIgYXR0YWNobWVudCcsXG4gICAgICBwbGFjZWhvbGRlcjogJ2h0dHA6Ly9leGFtcGxlLmNvbS9wdWJsaWMvcmVwb3J0LnBkZiBcInRpdGxlXCInXG4gICAgfSxcbiAgICB0eXBlczogJ1lvdSBjYW4gb25seSB1cGxvYWQgJyxcbiAgICBicm93c2U6ICdCcm93c2UuLi4nLFxuICAgIGRyb3BoaW50OiAnWW91IGNhbiBhbHNvIGRyYWcgZmlsZXMgZnJvbSB5b3VyIGNvbXB1dGVyIGFuZCBkcm9wIHRoZW0gaGVyZSEnLFxuICAgIGRyb3A6ICdEcm9wIHlvdXIgZmlsZSBoZXJlIHRvIGJlZ2luIHVwbG9hZC4uLicsXG4gICAgdXBsb2FkOiAnLCBvciB1cGxvYWQgYSBmaWxlJyxcbiAgICB1cGxvYWRpbmc6ICdVcGxvYWRpbmcgeW91ciBmaWxlLi4uJyxcbiAgICB1cGxvYWRmYWlsZWQ6ICdUaGUgdXBsb2FkIGZhaWxlZCEgVGhhdFxcJ3MgYWxsIHdlIGtub3cuJ1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vY2xhc3NlcycpO1xudmFyIGRyYWdDbGFzcyA9ICd3ay1kcmFnZ2luZyc7XG52YXIgZHJhZ0NsYXNzU3BlY2lmaWMgPSAnd2stY29udGFpbmVyLWRyYWdnaW5nJztcbnZhciByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5mdW5jdGlvbiB1cGxvYWRzIChjb250YWluZXIsIGRyb3BhcmVhLCBlZGl0b3IsIG9wdGlvbnMsIHJlbW92ZSkge1xuICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdkcmFnZW50ZXInLCBkcmFnZ2luZyk7XG4gIGNyb3NzdmVudFtvcF0ocm9vdCwgJ2RyYWdlbmQnLCBkcmFnc3RvcCk7XG4gIGNyb3NzdmVudFtvcF0ocm9vdCwgJ21vdXNlb3V0JywgZHJhZ3N0b3ApO1xuICBjcm9zc3ZlbnRbb3BdKGNvbnRhaW5lciwgJ2RyYWdvdmVyJywgaGFuZGxlRHJhZ092ZXIsIGZhbHNlKTtcbiAgY3Jvc3N2ZW50W29wXShkcm9wYXJlYSwgJ2Ryb3AnLCBoYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbiAgZnVuY3Rpb24gZHJhZ2dpbmcgKCkge1xuICAgIGNsYXNzZXMuYWRkKGRyb3BhcmVhLCBkcmFnQ2xhc3MpO1xuICAgIGNsYXNzZXMuYWRkKGRyb3BhcmVhLCBkcmFnQ2xhc3NTcGVjaWZpYyk7XG4gIH1cbiAgZnVuY3Rpb24gZHJhZ3N0b3AgKCkge1xuICAgIGRyYWdzdG9wcGVyKGRyb3BhcmVhKTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVEcmFnT3ZlciAoZSkge1xuICAgIHN0b3AoZSk7XG4gICAgZHJhZ2dpbmcoKTtcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZUZpbGVTZWxlY3QgKGUpIHtcbiAgICBkcmFnc3RvcCgpO1xuICAgIHN0b3AoZSk7XG4gICAgZWRpdG9yLnJ1bkNvbW1hbmQoZnVuY3Rpb24gcnVubmVyIChjaHVua3MsIG1vZGUpIHtcbiAgICAgIHZhciBmaWxlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgIHZhciB0eXBlID0gaW5mZXJUeXBlKGZpbGVzKTtcbiAgICAgIGVkaXRvci5saW5rT3JJbWFnZU9yQXR0YWNobWVudCh0eXBlLCBmaWxlcykuY2FsbCh0aGlzLCBtb2RlLCBjaHVua3MpO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGluZmVyVHlwZSAoZmlsZXMpIHtcbiAgICBpZiAob3B0aW9ucy5pbWFnZXMgJiYgIW9wdGlvbnMuYXR0YWNobWVudHMpIHtcbiAgICAgIHJldHVybiAnaW1hZ2UnO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuaW1hZ2VzICYmIG9wdGlvbnMuYXR0YWNobWVudHMpIHtcbiAgICAgIHJldHVybiAnYXR0YWNobWVudCc7XG4gICAgfVxuICAgIGlmIChmaWxlcy5ldmVyeShtYXRjaGVzKG9wdGlvbnMuaW1hZ2VzLnZhbGlkYXRlIHx8IG5ldmVyKSkpIHtcbiAgICAgIHJldHVybiAnaW1hZ2UnO1xuICAgIH1cbiAgICByZXR1cm4gJ2F0dGFjaG1lbnQnO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtYXRjaGVyIChmaWxlKSB7IHJldHVybiBmbihmaWxlKTsgfTtcbn1cbmZ1bmN0aW9uIG5ldmVyICgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gc3RvcCAoZSkge1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5mdW5jdGlvbiBkcmFnc3RvcHBlciAoZHJvcGFyZWEpIHtcbiAgY2xhc3Nlcy5ybShkcm9wYXJlYSwgZHJhZ0NsYXNzKTtcbiAgY2xhc3Nlcy5ybShkcm9wYXJlYSwgZHJhZ0NsYXNzU3BlY2lmaWMpO1xufVxuXG51cGxvYWRzLnN0b3AgPSBkcmFnc3RvcHBlcjtcbm1vZHVsZS5leHBvcnRzID0gdXBsb2FkcztcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGxzID0gcmVxdWlyZSgnbG9jYWwtc3RvcmFnZScpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGthbnllID0gcmVxdWlyZSgna2FueWUnKTtcbnZhciB1cGxvYWRzID0gcmVxdWlyZSgnLi91cGxvYWRzJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4vc3RyaW5ncycpO1xudmFyIHNldFRleHQgPSByZXF1aXJlKCcuL3NldFRleHQnKTtcbnZhciByZW1lbWJlclNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vcmVtZW1iZXJTZWxlY3Rpb24nKTtcbnZhciBiaW5kQ29tbWFuZHMgPSByZXF1aXJlKCcuL2JpbmRDb21tYW5kcycpO1xudmFyIElucHV0SGlzdG9yeSA9IHJlcXVpcmUoJy4vSW5wdXRIaXN0b3J5Jyk7XG52YXIgZ2V0Q29tbWFuZEhhbmRsZXIgPSByZXF1aXJlKCcuL2dldENvbW1hbmRIYW5kbGVyJyk7XG52YXIgZ2V0U3VyZmFjZSA9IHJlcXVpcmUoJy4vZ2V0U3VyZmFjZScpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL2NsYXNzZXMnKTtcbnZhciByZW5kZXJlcnMgPSByZXF1aXJlKCcuL3JlbmRlcmVycycpO1xudmFyIHByb21wdCA9IHJlcXVpcmUoJy4vcHJvbXB0cy9wcm9tcHQnKTtcbnZhciBjbG9zZVByb21wdHMgPSByZXF1aXJlKCcuL3Byb21wdHMvY2xvc2UnKTtcbnZhciBtb2RlTmFtZXMgPSBbJ21hcmtkb3duJywgJ2h0bWwnLCAnd3lzaXd5ZyddO1xudmFyIGNhY2hlID0gW107XG52YXIgbWFjID0gL1xcYk1hYyBPU1xcYi8udGVzdChnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgcnBhcmFncmFwaCA9IC9ePHA+PFxcL3A+XFxuPyQvaTtcblxuZnVuY3Rpb24gZmluZCAodGV4dGFyZWEpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWNoZS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjYWNoZVtpXSAmJiBjYWNoZVtpXS50YSA9PT0gdGV4dGFyZWEpIHtcbiAgICAgIHJldHVybiBjYWNoZVtpXS5lZGl0b3I7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB3b29mbWFyayAodGV4dGFyZWEsIG9wdGlvbnMpIHtcbiAgdmFyIGNhY2hlZCA9IGZpbmQodGV4dGFyZWEpO1xuICBpZiAoY2FjaGVkKSB7XG4gICAgcmV0dXJuIGNhY2hlZDtcbiAgfVxuXG4gIHZhciBwYXJlbnQgPSB0ZXh0YXJlYS5wYXJlbnRFbGVtZW50O1xuICBpZiAocGFyZW50LmNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dvb2ZtYXJrIGRlbWFuZHMgPHRleHRhcmVhPiBlbGVtZW50cyB0byBoYXZlIG5vIHNpYmxpbmdzJyk7XG4gIH1cblxuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIGlmIChvLm1hcmtkb3duID09PSB2b2lkIDApIHsgby5tYXJrZG93biA9IHRydWU7IH1cbiAgaWYgKG8uaHRtbCA9PT0gdm9pZCAwKSB7IG8uaHRtbCA9IHRydWU7IH1cbiAgaWYgKG8ud3lzaXd5ZyA9PT0gdm9pZCAwKSB7IG8ud3lzaXd5ZyA9IHRydWU7IH1cblxuICBpZiAoIW8ubWFya2Rvd24gJiYgIW8uaHRtbCAmJiAhby53eXNpd3lnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b29mbWFyayBleHBlY3RzIGF0IGxlYXN0IG9uZSBpbnB1dCBtb2RlIHRvIGJlIGF2YWlsYWJsZScpO1xuICB9XG5cbiAgaWYgKG8uaHIgPT09IHZvaWQgMCkgeyBvLmhyID0gZmFsc2U7IH1cbiAgaWYgKG8uc3RvcmFnZSA9PT0gdm9pZCAwKSB7IG8uc3RvcmFnZSA9IHRydWU7IH1cbiAgaWYgKG8uc3RvcmFnZSA9PT0gdHJ1ZSkgeyBvLnN0b3JhZ2UgPSAnd29vZm1hcmtfaW5wdXRfbW9kZSc7IH1cbiAgaWYgKG8uZmVuY2luZyA9PT0gdm9pZCAwKSB7IG8uZmVuY2luZyA9IHRydWU7IH1cbiAgaWYgKG8ucmVuZGVyID09PSB2b2lkIDApIHsgby5yZW5kZXIgPSB7fTsgfVxuICBpZiAoby5yZW5kZXIubW9kZXMgPT09IHZvaWQgMCkgeyBvLnJlbmRlci5tb2RlcyA9IHt9OyB9XG4gIGlmIChvLnJlbmRlci5jb21tYW5kcyA9PT0gdm9pZCAwKSB7IG8ucmVuZGVyLmNvbW1hbmRzID0ge307IH1cbiAgaWYgKG8ucHJvbXB0cyA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cyA9IHt9OyB9XG4gIGlmIChvLnByb21wdHMubGluayA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cy5saW5rID0gcHJvbXB0OyB9XG4gIGlmIChvLnByb21wdHMuaW1hZ2UgPT09IHZvaWQgMCkgeyBvLnByb21wdHMuaW1hZ2UgPSBwcm9tcHQ7IH1cbiAgaWYgKG8ucHJvbXB0cy5hdHRhY2htZW50ID09PSB2b2lkIDApIHsgby5wcm9tcHRzLmF0dGFjaG1lbnQgPSBwcm9tcHQ7IH1cbiAgaWYgKG8ucHJvbXB0cy5jbG9zZSA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cy5jbG9zZSA9IGNsb3NlUHJvbXB0czsgfVxuICBpZiAoby5jbGFzc2VzID09PSB2b2lkIDApIHsgby5jbGFzc2VzID0ge307IH1cbiAgaWYgKG8uY2xhc3Nlcy53eXNpd3lnID09PSB2b2lkIDApIHsgby5jbGFzc2VzLnd5c2l3eWcgPSBbXTsgfVxuICBpZiAoby5jbGFzc2VzLnByb21wdHMgPT09IHZvaWQgMCkgeyBvLmNsYXNzZXMucHJvbXB0cyA9IHt9OyB9XG4gIGlmIChvLmNsYXNzZXMuaW5wdXQgPT09IHZvaWQgMCkgeyBvLmNsYXNzZXMuaW5wdXQgPSB7fTsgfVxuXG4gIHZhciBwcmVmZXJlbmNlID0gby5zdG9yYWdlICYmIGxzLmdldChvLnN0b3JhZ2UpO1xuICBpZiAocHJlZmVyZW5jZSkge1xuICAgIG8uZGVmYXVsdE1vZGUgPSBwcmVmZXJlbmNlO1xuICB9XG5cbiAgdmFyIGRyb3BhcmVhID0gdGFnKHsgYzogJ3drLWNvbnRhaW5lci1kcm9wJyB9KTtcbiAgdmFyIHN3aXRjaGJvYXJkID0gdGFnKHsgYzogJ3drLXN3aXRjaGJvYXJkJyB9KTtcbiAgdmFyIGNvbW1hbmRzID0gdGFnKHsgYzogJ3drLWNvbW1hbmRzJyB9KTtcbiAgdmFyIGVkaXRhYmxlID0gdGFnKHsgYzogWyd3ay13eXNpd3lnJywgJ3drLWhpZGUnXS5jb25jYXQoby5jbGFzc2VzLnd5c2l3eWcpLmpvaW4oJyAnKSB9KTtcbiAgdmFyIHN1cmZhY2UgPSBnZXRTdXJmYWNlKHRleHRhcmVhLCBlZGl0YWJsZSwgZHJvcGFyZWEpO1xuICB2YXIgaGlzdG9yeSA9IG5ldyBJbnB1dEhpc3Rvcnkoc3VyZmFjZSwgJ21hcmtkb3duJyk7XG4gIHZhciBlZGl0b3IgPSB7XG4gICAgYWRkQ29tbWFuZDogYWRkQ29tbWFuZCxcbiAgICBhZGRDb21tYW5kQnV0dG9uOiBhZGRDb21tYW5kQnV0dG9uLFxuICAgIHJ1bkNvbW1hbmQ6IHJ1bkNvbW1hbmQsXG4gICAgcGFyc2VNYXJrZG93bjogby5wYXJzZU1hcmtkb3duLFxuICAgIHBhcnNlSFRNTDogby5wYXJzZUhUTUwsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICB2YWx1ZTogZ2V0T3JTZXRWYWx1ZSxcbiAgICB0ZXh0YXJlYTogdGV4dGFyZWEsXG4gICAgZWRpdGFibGU6IG8ud3lzaXd5ZyA/IGVkaXRhYmxlIDogbnVsbCxcbiAgICBzZXRNb2RlOiBwZXJzaXN0TW9kZSxcbiAgICBoaXN0b3J5OiB7XG4gICAgICB1bmRvOiBoaXN0b3J5LnVuZG8sXG4gICAgICByZWRvOiBoaXN0b3J5LnJlZG8sXG4gICAgICBjYW5VbmRvOiBoaXN0b3J5LmNhblVuZG8sXG4gICAgICBjYW5SZWRvOiBoaXN0b3J5LmNhblJlZG9cbiAgICB9LFxuICAgIG1vZGU6ICdtYXJrZG93bidcbiAgfTtcbiAgdmFyIGVudHJ5ID0geyB0YTogdGV4dGFyZWEsIGVkaXRvcjogZWRpdG9yIH07XG4gIHZhciBpID0gY2FjaGUucHVzaChlbnRyeSk7XG4gIHZhciBrYW55ZUNvbnRleHQgPSAnd29vZm1hcmtfJyArIGk7XG4gIHZhciBrYW55ZU9wdGlvbnMgPSB7XG4gICAgZmlsdGVyOiBwYXJlbnQsXG4gICAgY29udGV4dDoga2FueWVDb250ZXh0XG4gIH07XG4gIHZhciBtb2RlcyA9IHtcbiAgICBtYXJrZG93bjoge1xuICAgICAgYnV0dG9uOiB0YWcoeyB0OiAnYnV0dG9uJywgYzogJ3drLW1vZGUgd2stbW9kZS1hY3RpdmUnIH0pLFxuICAgICAgc2V0OiBtYXJrZG93bk1vZGVcbiAgICB9LFxuICAgIGh0bWw6IHtcbiAgICAgIGJ1dHRvbjogdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1tb2RlIHdrLW1vZGUtaW5hY3RpdmUnIH0pLFxuICAgICAgc2V0OiBodG1sTW9kZVxuICAgIH0sXG4gICAgd3lzaXd5Zzoge1xuICAgICAgYnV0dG9uOiB0YWcoeyB0OiAnYnV0dG9uJywgYzogJ3drLW1vZGUgd2stbW9kZS1pbmFjdGl2ZScgfSksXG4gICAgICBzZXQ6IHd5c2l3eWdNb2RlXG4gICAgfVxuICB9O1xuICB2YXIgcGxhY2U7XG5cbiAgdGFnKHsgdDogJ3NwYW4nLCBjOiAnd2stZHJvcC10ZXh0JywgeDogc3RyaW5ncy5wcm9tcHRzLmRyb3AsIHA6IGRyb3BhcmVhIH0pO1xuICB0YWcoeyB0OiAncCcsIGM6IFsnd2stZHJvcC1pY29uJ10uY29uY2F0KG8uY2xhc3Nlcy5kcm9waWNvbikuam9pbignICcpLCBwOiBkcm9wYXJlYSB9KTtcblxuICBlZGl0YWJsZS5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xuICBtb2Rlcy5tYXJrZG93bi5idXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICBtb2RlTmFtZXMuZm9yRWFjaChhZGRNb2RlKTtcblxuICBpZiAoby53eXNpd3lnKSB7XG4gICAgcGxhY2UgPSB0YWcoeyBjOiAnd2std3lzaXd5Zy1wbGFjZWhvbGRlciB3ay1oaWRlJywgeDogdGV4dGFyZWEucGxhY2Vob2xkZXIgfSk7XG4gICAgY3Jvc3N2ZW50LmFkZChwbGFjZSwgJ2NsaWNrJywgZm9jdXNFZGl0YWJsZSk7XG4gIH1cblxuICBpZiAoby5kZWZhdWx0TW9kZSAmJiBvW28uZGVmYXVsdE1vZGVdKSB7XG4gICAgbW9kZXNbby5kZWZhdWx0TW9kZV0uc2V0KCk7XG4gIH0gZWxzZSBpZiAoby5tYXJrZG93bikge1xuICAgIG1vZGVzLm1hcmtkb3duLnNldCgpO1xuICB9IGVsc2UgaWYgKG8uaHRtbCkge1xuICAgIG1vZGVzLmh0bWwuc2V0KCk7XG4gIH0gZWxzZSB7XG4gICAgbW9kZXMud3lzaXd5Zy5zZXQoKTtcbiAgfVxuXG4gIGJpbmRDb21tYW5kcyhzdXJmYWNlLCBvLCBlZGl0b3IpO1xuICBiaW5kRXZlbnRzKCk7XG5cbiAgcmV0dXJuIGVkaXRvcjtcblxuICBmdW5jdGlvbiBhZGRNb2RlIChpZCkge1xuICAgIHZhciBidXR0b24gPSBtb2Rlc1tpZF0uYnV0dG9uO1xuICAgIHZhciBjdXN0b20gPSBvLnJlbmRlci5tb2RlcztcbiAgICBpZiAob1tpZF0pIHtcbiAgICAgIHN3aXRjaGJvYXJkLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAodHlwZW9mIGN1c3RvbSA9PT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbSA6IHJlbmRlcmVycy5tb2RlcykoYnV0dG9uLCBpZCk7XG4gICAgICBjcm9zc3ZlbnQuYWRkKGJ1dHRvbiwgJ2NsaWNrJywgbW9kZXNbaWRdLnNldCk7XG4gICAgICBidXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgYnV0dG9uLnRhYkluZGV4ID0gLTE7XG5cbiAgICAgIHZhciB0aXRsZSA9IHN0cmluZ3MudGl0bGVzW2lkXTtcbiAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIG1hYyA/IG1hY2lmeSh0aXRsZSkgOiB0aXRsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYmluZEV2ZW50cyAocmVtb3ZlKSB7XG4gICAgdmFyIGFyID0gcmVtb3ZlID8gJ3JtJyA6ICdhZGQnO1xuICAgIHZhciBtb3YgPSByZW1vdmUgPyAncmVtb3ZlQ2hpbGQnIDogJ2FwcGVuZENoaWxkJztcbiAgICBpZiAocmVtb3ZlKSB7XG4gICAgICBrYW55ZS5jbGVhcihrYW55ZUNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoby5tYXJrZG93bikgeyBrYW55ZS5vbignY21kK20nLCBrYW55ZU9wdGlvbnMsIG1hcmtkb3duTW9kZSk7IH1cbiAgICAgIGlmIChvLmh0bWwpIHsga2FueWUub24oJ2NtZCtoJywga2FueWVPcHRpb25zLCBodG1sTW9kZSk7IH1cbiAgICAgIGlmIChvLnd5c2l3eWcpIHsga2FueWUub24oJ2NtZCtwJywga2FueWVPcHRpb25zLCB3eXNpd3lnTW9kZSk7IH1cbiAgICB9XG4gICAgY2xhc3Nlc1thcl0ocGFyZW50LCAnd2stY29udGFpbmVyJyk7XG4gICAgcGFyZW50W21vdl0oZWRpdGFibGUpO1xuICAgIGlmIChwbGFjZSkgeyBwYXJlbnRbbW92XShwbGFjZSk7IH1cbiAgICBwYXJlbnRbbW92XShjb21tYW5kcyk7XG4gICAgcGFyZW50W21vdl0oc3dpdGNoYm9hcmQpO1xuICAgIGlmIChvLmltYWdlcyB8fCBvLmF0dGFjaG1lbnRzKSB7XG4gICAgICBwYXJlbnRbbW92XShkcm9wYXJlYSk7XG4gICAgICB1cGxvYWRzKHBhcmVudCwgZHJvcGFyZWEsIGVkaXRvciwgbywgcmVtb3ZlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBpZiAoZWRpdG9yLm1vZGUgIT09ICdtYXJrZG93bicpIHtcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gZ2V0TWFya2Rvd24oKTtcbiAgICB9XG4gICAgY2xhc3Nlcy5ybSh0ZXh0YXJlYSwgJ3drLWhpZGUnKTtcbiAgICBiaW5kRXZlbnRzKHRydWUpO1xuICAgIGRlbGV0ZSBjYWNoZVtpIC0gMV07XG4gIH1cblxuICBmdW5jdGlvbiBtYXJrZG93bk1vZGUgKGUpIHsgcGVyc2lzdE1vZGUoJ21hcmtkb3duJywgZSk7IH1cbiAgZnVuY3Rpb24gaHRtbE1vZGUgKGUpIHsgcGVyc2lzdE1vZGUoJ2h0bWwnLCBlKTsgfVxuICBmdW5jdGlvbiB3eXNpd3lnTW9kZSAoZSkgeyBwZXJzaXN0TW9kZSgnd3lzaXd5ZycsIGUpOyB9XG5cbiAgZnVuY3Rpb24gcGVyc2lzdE1vZGUgKG5leHRNb2RlLCBlKSB7XG4gICAgdmFyIHJlbWVtYnJhbmNlO1xuICAgIHZhciBjdXJyZW50TW9kZSA9IGVkaXRvci5tb2RlO1xuICAgIHZhciBvbGQgPSBtb2Rlc1tjdXJyZW50TW9kZV0uYnV0dG9uO1xuICAgIHZhciBidXR0b24gPSBtb2Rlc1tuZXh0TW9kZV0uYnV0dG9uO1xuICAgIHZhciBmb2N1c2luZyA9ICEhZSB8fCBkb2MuYWN0aXZlRWxlbWVudCA9PT0gdGV4dGFyZWEgfHwgZG9jLmFjdGl2ZUVsZW1lbnQgPT09IGVkaXRhYmxlO1xuXG4gICAgc3RvcChlKTtcblxuICAgIGlmIChjdXJyZW50TW9kZSA9PT0gbmV4dE1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZW1lbWJyYW5jZSA9IGZvY3VzaW5nICYmIHJlbWVtYmVyU2VsZWN0aW9uKGhpc3RvcnksIG8pO1xuICAgIHRleHRhcmVhLmJsdXIoKTsgLy8gYXZlcnQgY2hyb21lIHJlcGFpbnQgYnVnc1xuXG4gICAgaWYgKG5leHRNb2RlID09PSAnbWFya2Rvd24nKSB7XG4gICAgICBpZiAoY3VycmVudE1vZGUgPT09ICdodG1sJykge1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHBhcnNlKCdwYXJzZUhUTUwnLCB0ZXh0YXJlYS52YWx1ZSkudHJpbSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBwYXJzZSgncGFyc2VIVE1MJywgZWRpdGFibGUpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5leHRNb2RlID09PSAnaHRtbCcpIHtcbiAgICAgIGlmIChjdXJyZW50TW9kZSA9PT0gJ21hcmtkb3duJykge1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHBhcnNlKCdwYXJzZU1hcmtkb3duJywgdGV4dGFyZWEudmFsdWUpLnRyaW0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gZWRpdGFibGUuaW5uZXJIVE1MLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5leHRNb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIGlmIChjdXJyZW50TW9kZSA9PT0gJ21hcmtkb3duJykge1xuICAgICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSBwYXJzZSgncGFyc2VNYXJrZG93bicsIHRleHRhcmVhLnZhbHVlKS5yZXBsYWNlKHJwYXJhZ3JhcGgsICcnKS50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSB0ZXh0YXJlYS52YWx1ZS5yZXBsYWNlKHJwYXJhZ3JhcGgsICcnKS50cmltKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5leHRNb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIGNsYXNzZXMuYWRkKHRleHRhcmVhLCAnd2staGlkZScpO1xuICAgICAgY2xhc3Nlcy5ybShlZGl0YWJsZSwgJ3drLWhpZGUnKTtcbiAgICAgIGlmIChwbGFjZSkgeyBjbGFzc2VzLnJtKHBsYWNlLCAnd2staGlkZScpOyB9XG4gICAgICBpZiAoZm9jdXNpbmcpIHsgc2V0VGltZW91dChmb2N1c0VkaXRhYmxlLCAwKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGFzc2VzLnJtKHRleHRhcmVhLCAnd2staGlkZScpO1xuICAgICAgY2xhc3Nlcy5hZGQoZWRpdGFibGUsICd3ay1oaWRlJyk7XG4gICAgICBpZiAocGxhY2UpIHsgY2xhc3Nlcy5hZGQocGxhY2UsICd3ay1oaWRlJyk7IH1cbiAgICAgIGlmIChmb2N1c2luZykgeyB0ZXh0YXJlYS5mb2N1cygpOyB9XG4gICAgfVxuICAgIGNsYXNzZXMuYWRkKGJ1dHRvbiwgJ3drLW1vZGUtYWN0aXZlJyk7XG4gICAgY2xhc3Nlcy5ybShvbGQsICd3ay1tb2RlLWFjdGl2ZScpO1xuICAgIGNsYXNzZXMuYWRkKG9sZCwgJ3drLW1vZGUtaW5hY3RpdmUnKTtcbiAgICBjbGFzc2VzLnJtKGJ1dHRvbiwgJ3drLW1vZGUtaW5hY3RpdmUnKTtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIG9sZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgZWRpdG9yLm1vZGUgPSBuZXh0TW9kZTtcblxuICAgIGlmIChvLnN0b3JhZ2UpIHsgbHMuc2V0KG8uc3RvcmFnZSwgbmV4dE1vZGUpOyB9XG5cbiAgICBoaXN0b3J5LnNldElucHV0TW9kZShuZXh0TW9kZSk7XG4gICAgaWYgKHJlbWVtYnJhbmNlKSB7IHJlbWVtYnJhbmNlLnVubWFyaygpOyB9XG4gICAgZmlyZUxhdGVyKCd3b29mbWFyay1tb2RlLWNoYW5nZScpO1xuXG4gICAgZnVuY3Rpb24gcGFyc2UgKG1ldGhvZCwgaW5wdXQpIHtcbiAgICAgIHJldHVybiBvW21ldGhvZF0oaW5wdXQsIHtcbiAgICAgICAgbWFya2VyczogcmVtZW1icmFuY2UgJiYgcmVtZW1icmFuY2UubWFya2VycyB8fCBbXVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmlyZUxhdGVyICh0eXBlKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiBmaXJlICgpIHtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUodGV4dGFyZWEsIHR5cGUpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9jdXNFZGl0YWJsZSAoKSB7XG4gICAgZWRpdGFibGUuZm9jdXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1hcmtkb3duICgpIHtcbiAgICBpZiAoZWRpdG9yLm1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgcmV0dXJuIG8ucGFyc2VIVE1MKGVkaXRhYmxlKTtcbiAgICB9XG4gICAgaWYgKGVkaXRvci5tb2RlID09PSAnaHRtbCcpIHtcbiAgICAgIHJldHVybiBvLnBhcnNlSFRNTCh0ZXh0YXJlYS52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9yU2V0VmFsdWUgKGlucHV0KSB7XG4gICAgdmFyIG1hcmtkb3duID0gU3RyaW5nKGlucHV0KTtcbiAgICB2YXIgc2V0cyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDE7XG4gICAgaWYgKHNldHMpIHtcbiAgICAgIGlmIChlZGl0b3IubW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICAgIGVkaXRhYmxlLmlubmVySFRNTCA9IGFzSHRtbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBlZGl0b3IubW9kZSA9PT0gJ2h0bWwnID8gYXNIdG1sKCkgOiBtYXJrZG93bjtcbiAgICAgIH1cbiAgICAgIGhpc3RvcnkucmVzZXQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldE1hcmtkb3duKCk7XG4gICAgZnVuY3Rpb24gYXNIdG1sICgpIHtcbiAgICAgIHJldHVybiBvLnBhcnNlTWFya2Rvd24obWFya2Rvd24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENvbW1hbmRCdXR0b24gKGlkLCBjb21ibywgZm4pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgZm4gPSBjb21ibztcbiAgICAgIGNvbWJvID0gbnVsbDtcbiAgICB9XG4gICAgdmFyIGJ1dHRvbiA9IHRhZyh7IHQ6ICdidXR0b24nLCBjOiAnd2stY29tbWFuZCcsIHA6IGNvbW1hbmRzIH0pO1xuICAgIHZhciBjdXN0b20gPSBvLnJlbmRlci5jb21tYW5kcztcbiAgICB2YXIgcmVuZGVyID0gdHlwZW9mIGN1c3RvbSA9PT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbSA6IHJlbmRlcmVycy5jb21tYW5kcztcbiAgICB2YXIgdGl0bGUgPSBzdHJpbmdzLnRpdGxlc1tpZF07XG4gICAgaWYgKHRpdGxlKSB7XG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIG1hYyA/IG1hY2lmeSh0aXRsZSkgOiB0aXRsZSk7XG4gICAgfVxuICAgIGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgYnV0dG9uLnRhYkluZGV4ID0gLTE7XG4gICAgcmVuZGVyKGJ1dHRvbiwgaWQpO1xuICAgIGNyb3NzdmVudC5hZGQoYnV0dG9uLCAnY2xpY2snLCBnZXRDb21tYW5kSGFuZGxlcihzdXJmYWNlLCBoaXN0b3J5LCBmbikpO1xuICAgIGlmIChjb21ibykge1xuICAgICAgYWRkQ29tbWFuZChjb21ibywgZm4pO1xuICAgIH1cbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ29tbWFuZCAoY29tYm8sIGZuKSB7XG4gICAga2FueWUub24oY29tYm8sIGthbnllT3B0aW9ucywgZ2V0Q29tbWFuZEhhbmRsZXIoc3VyZmFjZSwgaGlzdG9yeSwgZm4pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkNvbW1hbmQgKGZuKSB7XG4gICAgZ2V0Q29tbWFuZEhhbmRsZXIoc3VyZmFjZSwgaGlzdG9yeSwgcmVhcnJhbmdlKShudWxsKTtcbiAgICBmdW5jdGlvbiByZWFycmFuZ2UgKGUsIG1vZGUsIGNodW5rcykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgY2h1bmtzLCBtb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdGFnIChvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoby50IHx8ICdkaXYnKTtcbiAgZWwuY2xhc3NOYW1lID0gby5jIHx8ICcnO1xuICBzZXRUZXh0KGVsLCBvLnggfHwgJycpO1xuICBpZiAoby5wKSB7IG8ucC5hcHBlbmRDaGlsZChlbCk7IH1cbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiBzdG9wIChlKSB7XG4gIGlmIChlKSB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfVxufVxuXG5mdW5jdGlvbiBtYWNpZnkgKHRleHQpIHtcbiAgcmV0dXJuIHRleHRcbiAgICAucmVwbGFjZSgvXFxiY3RybFxcYi9pLCAnXFx1MjMxOCcpXG4gICAgLnJlcGxhY2UoL1xcYmFsdFxcYi9pLCAnXFx1MjMyNScpXG4gICAgLnJlcGxhY2UoL1xcYnNoaWZ0XFxiL2ksICdcXHUyMWU3Jyk7XG59XG5cbndvb2ZtYXJrLmZpbmQgPSBmaW5kO1xud29vZm1hcmsuc3RyaW5ncyA9IHN0cmluZ3M7XG5tb2R1bGUuZXhwb3J0cyA9IHdvb2ZtYXJrO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTkzYjI5bWJXRnlheTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQnNjeUE5SUhKbGNYVnBjbVVvSjJ4dlkyRnNMWE4wYjNKaFoyVW5LVHRjYm5aaGNpQmpjbTl6YzNabGJuUWdQU0J5WlhGMWFYSmxLQ2RqY205emMzWmxiblFuS1R0Y2JuWmhjaUJyWVc1NVpTQTlJSEpsY1hWcGNtVW9KMnRoYm5sbEp5azdYRzUyWVhJZ2RYQnNiMkZrY3lBOUlISmxjWFZwY21Vb0p5NHZkWEJzYjJGa2N5Y3BPMXh1ZG1GeUlITjBjbWx1WjNNZ1BTQnlaWEYxYVhKbEtDY3VMM04wY21sdVozTW5LVHRjYm5aaGNpQnpaWFJVWlhoMElEMGdjbVZ4ZFdseVpTZ25MaTl6WlhSVVpYaDBKeWs3WEc1MllYSWdjbVZ0WlcxaVpYSlRaV3hsWTNScGIyNGdQU0J5WlhGMWFYSmxLQ2N1TDNKbGJXVnRZbVZ5VTJWc1pXTjBhVzl1SnlrN1hHNTJZWElnWW1sdVpFTnZiVzFoYm1SeklEMGdjbVZ4ZFdseVpTZ25MaTlpYVc1a1EyOXRiV0Z1WkhNbktUdGNiblpoY2lCSmJuQjFkRWhwYzNSdmNua2dQU0J5WlhGMWFYSmxLQ2N1TDBsdWNIVjBTR2x6ZEc5eWVTY3BPMXh1ZG1GeUlHZGxkRU52YlcxaGJtUklZVzVrYkdWeUlEMGdjbVZ4ZFdseVpTZ25MaTluWlhSRGIyMXRZVzVrU0dGdVpHeGxjaWNwTzF4dWRtRnlJR2RsZEZOMWNtWmhZMlVnUFNCeVpYRjFhWEpsS0NjdUwyZGxkRk4xY21aaFkyVW5LVHRjYm5aaGNpQmpiR0Z6YzJWeklEMGdjbVZ4ZFdseVpTZ25MaTlqYkdGemMyVnpKeWs3WEc1MllYSWdjbVZ1WkdWeVpYSnpJRDBnY21WeGRXbHlaU2duTGk5eVpXNWtaWEpsY25NbktUdGNiblpoY2lCd2NtOXRjSFFnUFNCeVpYRjFhWEpsS0NjdUwzQnliMjF3ZEhNdmNISnZiWEIwSnlrN1hHNTJZWElnWTJ4dmMyVlFjbTl0Y0hSeklEMGdjbVZ4ZFdseVpTZ25MaTl3Y205dGNIUnpMMk5zYjNObEp5azdYRzUyWVhJZ2JXOWtaVTVoYldWeklEMGdXeWR0WVhKclpHOTNiaWNzSUNkb2RHMXNKeXdnSjNkNWMybDNlV2NuWFR0Y2JuWmhjaUJqWVdOb1pTQTlJRnRkTzF4dWRtRnlJRzFoWXlBOUlDOWNYR0pOWVdNZ1QxTmNYR0l2TG5SbGMzUW9aMnh2WW1Gc0xtNWhkbWxuWVhSdmNpNTFjMlZ5UVdkbGJuUXBPMXh1ZG1GeUlHUnZZeUE5SUdSdlkzVnRaVzUwTzF4dWRtRnlJSEp3WVhKaFozSmhjR2dnUFNBdlhqeHdQanhjWEM5d1BseGNiajhrTDJrN1hHNWNibVoxYm1OMGFXOXVJR1pwYm1RZ0tIUmxlSFJoY21WaEtTQjdYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z1kyRmphR1V1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNCcFppQW9ZMkZqYUdWYmFWMGdKaVlnWTJGamFHVmJhVjB1ZEdFZ1BUMDlJSFJsZUhSaGNtVmhLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdZMkZqYUdWYmFWMHVaV1JwZEc5eU8xeHVJQ0FnSUgxY2JpQWdmVnh1SUNCeVpYUjFjbTRnYm5Wc2JEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2QyOXZabTFoY21zZ0tIUmxlSFJoY21WaExDQnZjSFJwYjI1ektTQjdYRzRnSUhaaGNpQmpZV05vWldRZ1BTQm1hVzVrS0hSbGVIUmhjbVZoS1R0Y2JpQWdhV1lnS0dOaFkyaGxaQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQmpZV05vWldRN1hHNGdJSDFjYmx4dUlDQjJZWElnY0dGeVpXNTBJRDBnZEdWNGRHRnlaV0V1Y0dGeVpXNTBSV3hsYldWdWREdGNiaUFnYVdZZ0tIQmhjbVZ1ZEM1amFHbHNaSEpsYmk1c1pXNW5kR2dnUGlBeEtTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkM2IyOW1iV0Z5YXlCa1pXMWhibVJ6SUR4MFpYaDBZWEpsWVQ0Z1pXeGxiV1Z1ZEhNZ2RHOGdhR0YyWlNCdWJ5QnphV0pzYVc1bmN5Y3BPMXh1SUNCOVhHNWNiaUFnZG1GeUlHOGdQU0J2Y0hScGIyNXpJSHg4SUh0OU8xeHVJQ0JwWmlBb2J5NXRZWEpyWkc5M2JpQTlQVDBnZG05cFpDQXdLU0I3SUc4dWJXRnlhMlJ2ZDI0Z1BTQjBjblZsT3lCOVhHNGdJR2xtSUNodkxtaDBiV3dnUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbWgwYld3Z1BTQjBjblZsT3lCOVhHNGdJR2xtSUNodkxuZDVjMmwzZVdjZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG5kNWMybDNlV2NnUFNCMGNuVmxPeUI5WEc1Y2JpQWdhV1lnS0NGdkxtMWhjbXRrYjNkdUlDWW1JQ0Z2TG1oMGJXd2dKaVlnSVc4dWQzbHphWGQ1WnlrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduZDI5dlptMWhjbXNnWlhod1pXTjBjeUJoZENCc1pXRnpkQ0J2Ym1VZ2FXNXdkWFFnYlc5a1pTQjBieUJpWlNCaGRtRnBiR0ZpYkdVbktUdGNiaUFnZlZ4dVhHNGdJR2xtSUNodkxtaHlJRDA5UFNCMmIybGtJREFwSUhzZ2J5NW9jaUE5SUdaaGJITmxPeUI5WEc0Z0lHbG1JQ2h2TG5OMGIzSmhaMlVnUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbk4wYjNKaFoyVWdQU0IwY25WbE95QjlYRzRnSUdsbUlDaHZMbk4wYjNKaFoyVWdQVDA5SUhSeWRXVXBJSHNnYnk1emRHOXlZV2RsSUQwZ0ozZHZiMlp0WVhKclgybHVjSFYwWDIxdlpHVW5PeUI5WEc0Z0lHbG1JQ2h2TG1abGJtTnBibWNnUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbVpsYm1OcGJtY2dQU0IwY25WbE95QjlYRzRnSUdsbUlDaHZMbkpsYm1SbGNpQTlQVDBnZG05cFpDQXdLU0I3SUc4dWNtVnVaR1Z5SUQwZ2UzMDdJSDFjYmlBZ2FXWWdLRzh1Y21WdVpHVnlMbTF2WkdWeklEMDlQU0IyYjJsa0lEQXBJSHNnYnk1eVpXNWtaWEl1Ylc5a1pYTWdQU0I3ZlRzZ2ZWeHVJQ0JwWmlBb2J5NXlaVzVrWlhJdVkyOXRiV0Z1WkhNZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG5KbGJtUmxjaTVqYjIxdFlXNWtjeUE5SUh0OU95QjlYRzRnSUdsbUlDaHZMbkJ5YjIxd2RITWdQVDA5SUhadmFXUWdNQ2tnZXlCdkxuQnliMjF3ZEhNZ1BTQjdmVHNnZlZ4dUlDQnBaaUFvYnk1d2NtOXRjSFJ6TG14cGJtc2dQVDA5SUhadmFXUWdNQ2tnZXlCdkxuQnliMjF3ZEhNdWJHbHVheUE5SUhCeWIyMXdkRHNnZlZ4dUlDQnBaaUFvYnk1d2NtOXRjSFJ6TG1sdFlXZGxJRDA5UFNCMmIybGtJREFwSUhzZ2J5NXdjbTl0Y0hSekxtbHRZV2RsSUQwZ2NISnZiWEIwT3lCOVhHNGdJR2xtSUNodkxuQnliMjF3ZEhNdVlYUjBZV05vYldWdWRDQTlQVDBnZG05cFpDQXdLU0I3SUc4dWNISnZiWEIwY3k1aGRIUmhZMmh0Wlc1MElEMGdjSEp2YlhCME95QjlYRzRnSUdsbUlDaHZMbkJ5YjIxd2RITXVZMnh2YzJVZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG5CeWIyMXdkSE11WTJ4dmMyVWdQU0JqYkc5elpWQnliMjF3ZEhNN0lIMWNiaUFnYVdZZ0tHOHVZMnhoYzNObGN5QTlQVDBnZG05cFpDQXdLU0I3SUc4dVkyeGhjM05sY3lBOUlIdDlPeUI5WEc0Z0lHbG1JQ2h2TG1Oc1lYTnpaWE11ZDNsemFYZDVaeUE5UFQwZ2RtOXBaQ0F3S1NCN0lHOHVZMnhoYzNObGN5NTNlWE5wZDNsbklEMGdXMTA3SUgxY2JpQWdhV1lnS0c4dVkyeGhjM05sY3k1d2NtOXRjSFJ6SUQwOVBTQjJiMmxrSURBcElIc2dieTVqYkdGemMyVnpMbkJ5YjIxd2RITWdQU0I3ZlRzZ2ZWeHVJQ0JwWmlBb2J5NWpiR0Z6YzJWekxtbHVjSFYwSUQwOVBTQjJiMmxrSURBcElIc2dieTVqYkdGemMyVnpMbWx1Y0hWMElEMGdlMzA3SUgxY2JseHVJQ0IyWVhJZ2NISmxabVZ5Wlc1alpTQTlJRzh1YzNSdmNtRm5aU0FtSmlCc2N5NW5aWFFvYnk1emRHOXlZV2RsS1R0Y2JpQWdhV1lnS0hCeVpXWmxjbVZ1WTJVcElIdGNiaUFnSUNCdkxtUmxabUYxYkhSTmIyUmxJRDBnY0hKbFptVnlaVzVqWlR0Y2JpQWdmVnh1WEc0Z0lIWmhjaUJrY205d1lYSmxZU0E5SUhSaFp5aDdJR002SUNkM2F5MWpiMjUwWVdsdVpYSXRaSEp2Y0NjZ2ZTazdYRzRnSUhaaGNpQnpkMmwwWTJoaWIyRnlaQ0E5SUhSaFp5aDdJR002SUNkM2F5MXpkMmwwWTJoaWIyRnlaQ2NnZlNrN1hHNGdJSFpoY2lCamIyMXRZVzVrY3lBOUlIUmhaeWg3SUdNNklDZDNheTFqYjIxdFlXNWtjeWNnZlNrN1hHNGdJSFpoY2lCbFpHbDBZV0pzWlNBOUlIUmhaeWg3SUdNNklGc25kMnN0ZDNsemFYZDVaeWNzSUNkM2F5MW9hV1JsSjEwdVkyOXVZMkYwS0c4dVkyeGhjM05sY3k1M2VYTnBkM2xuS1M1cWIybHVLQ2NnSnlrZ2ZTazdYRzRnSUhaaGNpQnpkWEptWVdObElEMGdaMlYwVTNWeVptRmpaU2gwWlhoMFlYSmxZU3dnWldScGRHRmliR1VzSUdSeWIzQmhjbVZoS1R0Y2JpQWdkbUZ5SUdocGMzUnZjbmtnUFNCdVpYY2dTVzV3ZFhSSWFYTjBiM0o1S0hOMWNtWmhZMlVzSUNkdFlYSnJaRzkzYmljcE8xeHVJQ0IyWVhJZ1pXUnBkRzl5SUQwZ2UxeHVJQ0FnSUdGa1pFTnZiVzFoYm1RNklHRmtaRU52YlcxaGJtUXNYRzRnSUNBZ1lXUmtRMjl0YldGdVpFSjFkSFJ2YmpvZ1lXUmtRMjl0YldGdVpFSjFkSFJ2Yml4Y2JpQWdJQ0J5ZFc1RGIyMXRZVzVrT2lCeWRXNURiMjF0WVc1a0xGeHVJQ0FnSUhCaGNuTmxUV0Z5YTJSdmQyNDZJRzh1Y0dGeWMyVk5ZWEpyWkc5M2JpeGNiaUFnSUNCd1lYSnpaVWhVVFV3NklHOHVjR0Z5YzJWSVZFMU1MRnh1SUNBZ0lHUmxjM1J5YjNrNklHUmxjM1J5YjNrc1hHNGdJQ0FnZG1Gc2RXVTZJR2RsZEU5eVUyVjBWbUZzZFdVc1hHNGdJQ0FnZEdWNGRHRnlaV0U2SUhSbGVIUmhjbVZoTEZ4dUlDQWdJR1ZrYVhSaFlteGxPaUJ2TG5kNWMybDNlV2NnUHlCbFpHbDBZV0pzWlNBNklHNTFiR3dzWEc0Z0lDQWdjMlYwVFc5a1pUb2djR1Z5YzJsemRFMXZaR1VzWEc0Z0lDQWdhR2x6ZEc5eWVUb2dlMXh1SUNBZ0lDQWdkVzVrYnpvZ2FHbHpkRzl5ZVM1MWJtUnZMRnh1SUNBZ0lDQWdjbVZrYnpvZ2FHbHpkRzl5ZVM1eVpXUnZMRnh1SUNBZ0lDQWdZMkZ1Vlc1a2J6b2dhR2x6ZEc5eWVTNWpZVzVWYm1SdkxGeHVJQ0FnSUNBZ1kyRnVVbVZrYnpvZ2FHbHpkRzl5ZVM1allXNVNaV1J2WEc0Z0lDQWdmU3hjYmlBZ0lDQnRiMlJsT2lBbmJXRnlhMlJ2ZDI0blhHNGdJSDA3WEc0Z0lIWmhjaUJsYm5SeWVTQTlJSHNnZEdFNklIUmxlSFJoY21WaExDQmxaR2wwYjNJNklHVmthWFJ2Y2lCOU8xeHVJQ0IyWVhJZ2FTQTlJR05oWTJobExuQjFjMmdvWlc1MGNua3BPMXh1SUNCMllYSWdhMkZ1ZVdWRGIyNTBaWGgwSUQwZ0ozZHZiMlp0WVhKclh5Y2dLeUJwTzF4dUlDQjJZWElnYTJGdWVXVlBjSFJwYjI1eklEMGdlMXh1SUNBZ0lHWnBiSFJsY2pvZ2NHRnlaVzUwTEZ4dUlDQWdJR052Ym5SbGVIUTZJR3RoYm5sbFEyOXVkR1Y0ZEZ4dUlDQjlPMXh1SUNCMllYSWdiVzlrWlhNZ1BTQjdYRzRnSUNBZ2JXRnlhMlJ2ZDI0NklIdGNiaUFnSUNBZ0lHSjFkSFJ2YmpvZ2RHRm5LSHNnZERvZ0oySjFkSFJ2Ymljc0lHTTZJQ2QzYXkxdGIyUmxJSGRyTFcxdlpHVXRZV04wYVhabEp5QjlLU3hjYmlBZ0lDQWdJSE5sZERvZ2JXRnlhMlJ2ZDI1TmIyUmxYRzRnSUNBZ2ZTeGNiaUFnSUNCb2RHMXNPaUI3WEc0Z0lDQWdJQ0JpZFhSMGIyNDZJSFJoWnloN0lIUTZJQ2RpZFhSMGIyNG5MQ0JqT2lBbmQyc3RiVzlrWlNCM2F5MXRiMlJsTFdsdVlXTjBhWFpsSnlCOUtTeGNiaUFnSUNBZ0lITmxkRG9nYUhSdGJFMXZaR1ZjYmlBZ0lDQjlMRnh1SUNBZ0lIZDVjMmwzZVdjNklIdGNiaUFnSUNBZ0lHSjFkSFJ2YmpvZ2RHRm5LSHNnZERvZ0oySjFkSFJ2Ymljc0lHTTZJQ2QzYXkxdGIyUmxJSGRyTFcxdlpHVXRhVzVoWTNScGRtVW5JSDBwTEZ4dUlDQWdJQ0FnYzJWME9pQjNlWE5wZDNsblRXOWtaVnh1SUNBZ0lIMWNiaUFnZlR0Y2JpQWdkbUZ5SUhCc1lXTmxPMXh1WEc0Z0lIUmhaeWg3SUhRNklDZHpjR0Z1Snl3Z1l6b2dKM2RyTFdSeWIzQXRkR1Y0ZENjc0lIZzZJSE4wY21sdVozTXVjSEp2YlhCMGN5NWtjbTl3TENCd09pQmtjbTl3WVhKbFlTQjlLVHRjYmlBZ2RHRm5LSHNnZERvZ0ozQW5MQ0JqT2lCYkozZHJMV1J5YjNBdGFXTnZiaWRkTG1OdmJtTmhkQ2h2TG1Oc1lYTnpaWE11WkhKdmNHbGpiMjRwTG1wdmFXNG9KeUFuS1N3Z2NEb2daSEp2Y0dGeVpXRWdmU2s3WEc1Y2JpQWdaV1JwZEdGaWJHVXVZMjl1ZEdWdWRFVmthWFJoWW14bElEMGdkSEoxWlR0Y2JpQWdiVzlrWlhNdWJXRnlhMlJ2ZDI0dVluVjBkRzl1TG5ObGRFRjBkSEpwWW5WMFpTZ25aR2x6WVdKc1pXUW5MQ0FuWkdsellXSnNaV1FuS1R0Y2JpQWdiVzlrWlU1aGJXVnpMbVp2Y2tWaFkyZ29ZV1JrVFc5a1pTazdYRzVjYmlBZ2FXWWdLRzh1ZDNsemFYZDVaeWtnZTF4dUlDQWdJSEJzWVdObElEMGdkR0ZuS0hzZ1l6b2dKM2RyTFhkNWMybDNlV2N0Y0d4aFkyVm9iMnhrWlhJZ2Qyc3RhR2xrWlNjc0lIZzZJSFJsZUhSaGNtVmhMbkJzWVdObGFHOXNaR1Z5SUgwcE8xeHVJQ0FnSUdOeWIzTnpkbVZ1ZEM1aFpHUW9jR3hoWTJVc0lDZGpiR2xqYXljc0lHWnZZM1Z6UldScGRHRmliR1VwTzF4dUlDQjlYRzVjYmlBZ2FXWWdLRzh1WkdWbVlYVnNkRTF2WkdVZ0ppWWdiMXR2TG1SbFptRjFiSFJOYjJSbFhTa2dlMXh1SUNBZ0lHMXZaR1Z6VzI4dVpHVm1ZWFZzZEUxdlpHVmRMbk5sZENncE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0c4dWJXRnlhMlJ2ZDI0cElIdGNiaUFnSUNCdGIyUmxjeTV0WVhKclpHOTNiaTV6WlhRb0tUdGNiaUFnZlNCbGJITmxJR2xtSUNodkxtaDBiV3dwSUh0Y2JpQWdJQ0J0YjJSbGN5NW9kRzFzTG5ObGRDZ3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJRzF2WkdWekxuZDVjMmwzZVdjdWMyVjBLQ2s3WEc0Z0lIMWNibHh1SUNCaWFXNWtRMjl0YldGdVpITW9jM1Z5Wm1GalpTd2dieXdnWldScGRHOXlLVHRjYmlBZ1ltbHVaRVYyWlc1MGN5Z3BPMXh1WEc0Z0lISmxkSFZ5YmlCbFpHbDBiM0k3WEc1Y2JpQWdablZ1WTNScGIyNGdZV1JrVFc5a1pTQW9hV1FwSUh0Y2JpQWdJQ0IyWVhJZ1luVjBkRzl1SUQwZ2JXOWtaWE5iYVdSZExtSjFkSFJ2Ymp0Y2JpQWdJQ0IyWVhJZ1kzVnpkRzl0SUQwZ2J5NXlaVzVrWlhJdWJXOWtaWE03WEc0Z0lDQWdhV1lnS0c5YmFXUmRLU0I3WEc0Z0lDQWdJQ0J6ZDJsMFkyaGliMkZ5WkM1aGNIQmxibVJEYUdsc1pDaGlkWFIwYjI0cE8xeHVJQ0FnSUNBZ0tIUjVjR1Z2WmlCamRYTjBiMjBnUFQwOUlDZG1kVzVqZEdsdmJpY2dQeUJqZFhOMGIyMGdPaUJ5Wlc1a1pYSmxjbk11Ylc5a1pYTXBLR0oxZEhSdmJpd2dhV1FwTzF4dUlDQWdJQ0FnWTNKdmMzTjJaVzUwTG1Ga1pDaGlkWFIwYjI0c0lDZGpiR2xqYXljc0lHMXZaR1Z6VzJsa1hTNXpaWFFwTzF4dUlDQWdJQ0FnWW5WMGRHOXVMblI1Y0dVZ1BTQW5ZblYwZEc5dUp6dGNiaUFnSUNBZ0lHSjFkSFJ2Ymk1MFlXSkpibVJsZUNBOUlDMHhPMXh1WEc0Z0lDQWdJQ0IyWVhJZ2RHbDBiR1VnUFNCemRISnBibWR6TG5ScGRHeGxjMXRwWkYwN1hHNGdJQ0FnSUNCcFppQW9kR2wwYkdVcElIdGNiaUFnSUNBZ0lDQWdZblYwZEc5dUxuTmxkRUYwZEhKcFluVjBaU2duZEdsMGJHVW5MQ0J0WVdNZ1B5QnRZV05wWm5rb2RHbDBiR1VwSURvZ2RHbDBiR1VwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdKcGJtUkZkbVZ1ZEhNZ0tISmxiVzkyWlNrZ2UxeHVJQ0FnSUhaaGNpQmhjaUE5SUhKbGJXOTJaU0EvSUNkeWJTY2dPaUFuWVdSa0p6dGNiaUFnSUNCMllYSWdiVzkySUQwZ2NtVnRiM1psSUQ4Z0ozSmxiVzkyWlVOb2FXeGtKeUE2SUNkaGNIQmxibVJEYUdsc1pDYzdYRzRnSUNBZ2FXWWdLSEpsYlc5MlpTa2dlMXh1SUNBZ0lDQWdhMkZ1ZVdVdVkyeGxZWElvYTJGdWVXVkRiMjUwWlhoMEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnYVdZZ0tHOHViV0Z5YTJSdmQyNHBJSHNnYTJGdWVXVXViMjRvSjJOdFpDdHRKeXdnYTJGdWVXVlBjSFJwYjI1ekxDQnRZWEpyWkc5M2JrMXZaR1VwT3lCOVhHNGdJQ0FnSUNCcFppQW9ieTVvZEcxc0tTQjdJR3RoYm5sbExtOXVLQ2RqYldRcmFDY3NJR3RoYm5sbFQzQjBhVzl1Y3l3Z2FIUnRiRTF2WkdVcE95QjlYRzRnSUNBZ0lDQnBaaUFvYnk1M2VYTnBkM2xuS1NCN0lHdGhibmxsTG05dUtDZGpiV1FyY0Njc0lHdGhibmxsVDNCMGFXOXVjeXdnZDNsemFYZDVaMDF2WkdVcE95QjlYRzRnSUNBZ2ZWeHVJQ0FnSUdOc1lYTnpaWE5iWVhKZEtIQmhjbVZ1ZEN3Z0ozZHJMV052Ym5SaGFXNWxjaWNwTzF4dUlDQWdJSEJoY21WdWRGdHRiM1pkS0dWa2FYUmhZbXhsS1R0Y2JpQWdJQ0JwWmlBb2NHeGhZMlVwSUhzZ2NHRnlaVzUwVzIxdmRsMG9jR3hoWTJVcE95QjlYRzRnSUNBZ2NHRnlaVzUwVzIxdmRsMG9ZMjl0YldGdVpITXBPMXh1SUNBZ0lIQmhjbVZ1ZEZ0dGIzWmRLSE4zYVhSamFHSnZZWEprS1R0Y2JpQWdJQ0JwWmlBb2J5NXBiV0ZuWlhNZ2ZId2dieTVoZEhSaFkyaHRaVzUwY3lrZ2UxeHVJQ0FnSUNBZ2NHRnlaVzUwVzIxdmRsMG9aSEp2Y0dGeVpXRXBPMXh1SUNBZ0lDQWdkWEJzYjJGa2N5aHdZWEpsYm5Rc0lHUnliM0JoY21WaExDQmxaR2wwYjNJc0lHOHNJSEpsYlc5MlpTazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdaR1Z6ZEhKdmVTQW9LU0I3WEc0Z0lDQWdhV1lnS0dWa2FYUnZjaTV0YjJSbElDRTlQU0FuYldGeWEyUnZkMjRuS1NCN1hHNGdJQ0FnSUNCMFpYaDBZWEpsWVM1MllXeDFaU0E5SUdkbGRFMWhjbXRrYjNkdUtDazdYRzRnSUNBZ2ZWeHVJQ0FnSUdOc1lYTnpaWE11Y20wb2RHVjRkR0Z5WldFc0lDZDNheTFvYVdSbEp5azdYRzRnSUNBZ1ltbHVaRVYyWlc1MGN5aDBjblZsS1R0Y2JpQWdJQ0JrWld4bGRHVWdZMkZqYUdWYmFTQXRJREZkTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2JXRnlhMlJ2ZDI1TmIyUmxJQ2hsS1NCN0lIQmxjbk5wYzNSTmIyUmxLQ2R0WVhKclpHOTNiaWNzSUdVcE95QjlYRzRnSUdaMWJtTjBhVzl1SUdoMGJXeE5iMlJsSUNobEtTQjdJSEJsY25OcGMzUk5iMlJsS0Nkb2RHMXNKeXdnWlNrN0lIMWNiaUFnWm5WdVkzUnBiMjRnZDNsemFYZDVaMDF2WkdVZ0tHVXBJSHNnY0dWeWMybHpkRTF2WkdVb0ozZDVjMmwzZVdjbkxDQmxLVHNnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSEJsY25OcGMzUk5iMlJsSUNodVpYaDBUVzlrWlN3Z1pTa2dlMXh1SUNBZ0lIWmhjaUJ5WlcxbGJXSnlZVzVqWlR0Y2JpQWdJQ0IyWVhJZ1kzVnljbVZ1ZEUxdlpHVWdQU0JsWkdsMGIzSXViVzlrWlR0Y2JpQWdJQ0IyWVhJZ2IyeGtJRDBnYlc5a1pYTmJZM1Z5Y21WdWRFMXZaR1ZkTG1KMWRIUnZianRjYmlBZ0lDQjJZWElnWW5WMGRHOXVJRDBnYlc5a1pYTmJibVY0ZEUxdlpHVmRMbUoxZEhSdmJqdGNiaUFnSUNCMllYSWdabTlqZFhOcGJtY2dQU0FoSVdVZ2ZId2daRzlqTG1GamRHbDJaVVZzWlcxbGJuUWdQVDA5SUhSbGVIUmhjbVZoSUh4OElHUnZZeTVoWTNScGRtVkZiR1Z0Wlc1MElEMDlQU0JsWkdsMFlXSnNaVHRjYmx4dUlDQWdJSE4wYjNBb1pTazdYRzVjYmlBZ0lDQnBaaUFvWTNWeWNtVnVkRTF2WkdVZ1BUMDlJRzVsZUhSTmIyUmxLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2NtVnRaVzFpY21GdVkyVWdQU0JtYjJOMWMybHVaeUFtSmlCeVpXMWxiV0psY2xObGJHVmpkR2x2Ymlob2FYTjBiM0o1TENCdktUdGNiaUFnSUNCMFpYaDBZWEpsWVM1aWJIVnlLQ2s3SUM4dklHRjJaWEowSUdOb2NtOXRaU0J5WlhCaGFXNTBJR0oxWjNOY2JseHVJQ0FnSUdsbUlDaHVaWGgwVFc5a1pTQTlQVDBnSjIxaGNtdGtiM2R1SnlrZ2UxeHVJQ0FnSUNBZ2FXWWdLR04xY25KbGJuUk5iMlJsSUQwOVBTQW5hSFJ0YkNjcElIdGNiaUFnSUNBZ0lDQWdkR1Y0ZEdGeVpXRXVkbUZzZFdVZ1BTQndZWEp6WlNnbmNHRnljMlZJVkUxTUp5d2dkR1Y0ZEdGeVpXRXVkbUZzZFdVcExuUnlhVzBvS1R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUhSbGVIUmhjbVZoTG5aaGJIVmxJRDBnY0dGeWMyVW9KM0JoY25ObFNGUk5UQ2NzSUdWa2FYUmhZbXhsS1M1MGNtbHRLQ2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2h1WlhoMFRXOWtaU0E5UFQwZ0oyaDBiV3duS1NCN1hHNGdJQ0FnSUNCcFppQW9ZM1Z5Y21WdWRFMXZaR1VnUFQwOUlDZHRZWEpyWkc5M2JpY3BJSHRjYmlBZ0lDQWdJQ0FnZEdWNGRHRnlaV0V1ZG1Gc2RXVWdQU0J3WVhKelpTZ25jR0Z5YzJWTllYSnJaRzkzYmljc0lIUmxlSFJoY21WaExuWmhiSFZsS1M1MGNtbHRLQ2s3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0IwWlhoMFlYSmxZUzUyWVd4MVpTQTlJR1ZrYVhSaFlteGxMbWx1Ym1WeVNGUk5UQzUwY21sdEtDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaHVaWGgwVFc5a1pTQTlQVDBnSjNkNWMybDNlV2NuS1NCN1hHNGdJQ0FnSUNCcFppQW9ZM1Z5Y21WdWRFMXZaR1VnUFQwOUlDZHRZWEpyWkc5M2JpY3BJSHRjYmlBZ0lDQWdJQ0FnWldScGRHRmliR1V1YVc1dVpYSklWRTFNSUQwZ2NHRnljMlVvSjNCaGNuTmxUV0Z5YTJSdmQyNG5MQ0IwWlhoMFlYSmxZUzUyWVd4MVpTa3VjbVZ3YkdGalpTaHljR0Z5WVdkeVlYQm9MQ0FuSnlrdWRISnBiU2dwTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnWldScGRHRmliR1V1YVc1dVpYSklWRTFNSUQwZ2RHVjRkR0Z5WldFdWRtRnNkV1V1Y21Wd2JHRmpaU2h5Y0dGeVlXZHlZWEJvTENBbkp5a3VkSEpwYlNncE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaHVaWGgwVFc5a1pTQTlQVDBnSjNkNWMybDNlV2NuS1NCN1hHNGdJQ0FnSUNCamJHRnpjMlZ6TG1Ga1pDaDBaWGgwWVhKbFlTd2dKM2RyTFdocFpHVW5LVHRjYmlBZ0lDQWdJR05zWVhOelpYTXVjbTBvWldScGRHRmliR1VzSUNkM2F5MW9hV1JsSnlrN1hHNGdJQ0FnSUNCcFppQW9jR3hoWTJVcElIc2dZMnhoYzNObGN5NXliU2h3YkdGalpTd2dKM2RyTFdocFpHVW5LVHNnZlZ4dUlDQWdJQ0FnYVdZZ0tHWnZZM1Z6YVc1bktTQjdJSE5sZEZScGJXVnZkWFFvWm05amRYTkZaR2wwWVdKc1pTd2dNQ2s3SUgxY2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdZMnhoYzNObGN5NXliU2gwWlhoMFlYSmxZU3dnSjNkckxXaHBaR1VuS1R0Y2JpQWdJQ0FnSUdOc1lYTnpaWE11WVdSa0tHVmthWFJoWW14bExDQW5kMnN0YUdsa1pTY3BPMXh1SUNBZ0lDQWdhV1lnS0hCc1lXTmxLU0I3SUdOc1lYTnpaWE11WVdSa0tIQnNZV05sTENBbmQyc3RhR2xrWlNjcE95QjlYRzRnSUNBZ0lDQnBaaUFvWm05amRYTnBibWNwSUhzZ2RHVjRkR0Z5WldFdVptOWpkWE1vS1RzZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0JqYkdGemMyVnpMbUZrWkNoaWRYUjBiMjRzSUNkM2F5MXRiMlJsTFdGamRHbDJaU2NwTzF4dUlDQWdJR05zWVhOelpYTXVjbTBvYjJ4a0xDQW5kMnN0Ylc5a1pTMWhZM1JwZG1VbktUdGNiaUFnSUNCamJHRnpjMlZ6TG1Ga1pDaHZiR1FzSUNkM2F5MXRiMlJsTFdsdVlXTjBhWFpsSnlrN1hHNGdJQ0FnWTJ4aGMzTmxjeTV5YlNoaWRYUjBiMjRzSUNkM2F5MXRiMlJsTFdsdVlXTjBhWFpsSnlrN1hHNGdJQ0FnWW5WMGRHOXVMbk5sZEVGMGRISnBZblYwWlNnblpHbHpZV0pzWldRbkxDQW5aR2x6WVdKc1pXUW5LVHRjYmlBZ0lDQnZiR1F1Y21WdGIzWmxRWFIwY21saWRYUmxLQ2RrYVhOaFlteGxaQ2NwTzF4dUlDQWdJR1ZrYVhSdmNpNXRiMlJsSUQwZ2JtVjRkRTF2WkdVN1hHNWNiaUFnSUNCcFppQW9ieTV6ZEc5eVlXZGxLU0I3SUd4ekxuTmxkQ2h2TG5OMGIzSmhaMlVzSUc1bGVIUk5iMlJsS1RzZ2ZWeHVYRzRnSUNBZ2FHbHpkRzl5ZVM1elpYUkpibkIxZEUxdlpHVW9ibVY0ZEUxdlpHVXBPMXh1SUNBZ0lHbG1JQ2h5WlcxbGJXSnlZVzVqWlNrZ2V5QnlaVzFsYldKeVlXNWpaUzUxYm0xaGNtc29LVHNnZlZ4dUlDQWdJR1pwY21WTVlYUmxjaWduZDI5dlptMWhjbXN0Ylc5a1pTMWphR0Z1WjJVbktUdGNibHh1SUNBZ0lHWjFibU4wYVc5dUlIQmhjbk5sSUNodFpYUm9iMlFzSUdsdWNIVjBLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdiMXR0WlhSb2IyUmRLR2x1Y0hWMExDQjdYRzRnSUNBZ0lDQWdJRzFoY210bGNuTTZJSEpsYldWdFluSmhibU5sSUNZbUlISmxiV1Z0WW5KaGJtTmxMbTFoY210bGNuTWdmSHdnVzExY2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHWnBjbVZNWVhSbGNpQW9kSGx3WlNrZ2UxeHVJQ0FnSUhObGRGUnBiV1Z2ZFhRb1puVnVZM1JwYjI0Z1ptbHlaU0FvS1NCN1hHNGdJQ0FnSUNCamNtOXpjM1psYm5RdVptRmljbWxqWVhSbEtIUmxlSFJoY21WaExDQjBlWEJsS1R0Y2JpQWdJQ0I5TENBd0tUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR1p2WTNWelJXUnBkR0ZpYkdVZ0tDa2dlMXh1SUNBZ0lHVmthWFJoWW14bExtWnZZM1Z6S0NrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQm5aWFJOWVhKclpHOTNiaUFvS1NCN1hHNGdJQ0FnYVdZZ0tHVmthWFJ2Y2k1dGIyUmxJRDA5UFNBbmQzbHphWGQ1WnljcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCdkxuQmhjbk5sU0ZSTlRDaGxaR2wwWVdKc1pTazdYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaGxaR2wwYjNJdWJXOWtaU0E5UFQwZ0oyaDBiV3duS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnYnk1d1lYSnpaVWhVVFV3b2RHVjRkR0Z5WldFdWRtRnNkV1VwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z2RHVjRkR0Z5WldFdWRtRnNkV1U3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCblpYUlBjbE5sZEZaaGJIVmxJQ2hwYm5CMWRDa2dlMXh1SUNBZ0lIWmhjaUJ0WVhKclpHOTNiaUE5SUZOMGNtbHVaeWhwYm5CMWRDazdYRzRnSUNBZ2RtRnlJSE5sZEhNZ1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb0lEMDlQU0F4TzF4dUlDQWdJR2xtSUNoelpYUnpLU0I3WEc0Z0lDQWdJQ0JwWmlBb1pXUnBkRzl5TG0xdlpHVWdQVDA5SUNkM2VYTnBkM2xuSnlrZ2UxeHVJQ0FnSUNBZ0lDQmxaR2wwWVdKc1pTNXBibTVsY2toVVRVd2dQU0JoYzBoMGJXd29LVHRjYmlBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJSFJsZUhSaGNtVmhMblpoYkhWbElEMGdaV1JwZEc5eUxtMXZaR1VnUFQwOUlDZG9kRzFzSnlBL0lHRnpTSFJ0YkNncElEb2diV0Z5YTJSdmQyNDdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQm9hWE4wYjNKNUxuSmxjMlYwS0NrN1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQm5aWFJOWVhKclpHOTNiaWdwTzF4dUlDQWdJR1oxYm1OMGFXOXVJR0Z6U0hSdGJDQW9LU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdieTV3WVhKelpVMWhjbXRrYjNkdUtHMWhjbXRrYjNkdUtUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmhaR1JEYjIxdFlXNWtRblYwZEc5dUlDaHBaQ3dnWTI5dFltOHNJR1p1S1NCN1hHNGdJQ0FnYVdZZ0tHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnZ1BUMDlJRElwSUh0Y2JpQWdJQ0FnSUdadUlEMGdZMjl0WW04N1hHNGdJQ0FnSUNCamIyMWlieUE5SUc1MWJHdzdYRzRnSUNBZ2ZWeHVJQ0FnSUhaaGNpQmlkWFIwYjI0Z1BTQjBZV2NvZXlCME9pQW5ZblYwZEc5dUp5d2dZem9nSjNkckxXTnZiVzFoYm1RbkxDQndPaUJqYjIxdFlXNWtjeUI5S1R0Y2JpQWdJQ0IyWVhJZ1kzVnpkRzl0SUQwZ2J5NXlaVzVrWlhJdVkyOXRiV0Z1WkhNN1hHNGdJQ0FnZG1GeUlISmxibVJsY2lBOUlIUjVjR1Z2WmlCamRYTjBiMjBnUFQwOUlDZG1kVzVqZEdsdmJpY2dQeUJqZFhOMGIyMGdPaUJ5Wlc1a1pYSmxjbk11WTI5dGJXRnVaSE03WEc0Z0lDQWdkbUZ5SUhScGRHeGxJRDBnYzNSeWFXNW5jeTUwYVhSc1pYTmJhV1JkTzF4dUlDQWdJR2xtSUNoMGFYUnNaU2tnZTF4dUlDQWdJQ0FnWW5WMGRHOXVMbk5sZEVGMGRISnBZblYwWlNnbmRHbDBiR1VuTENCdFlXTWdQeUJ0WVdOcFpua29kR2wwYkdVcElEb2dkR2wwYkdVcE8xeHVJQ0FnSUgxY2JpQWdJQ0JpZFhSMGIyNHVkSGx3WlNBOUlDZGlkWFIwYjI0bk8xeHVJQ0FnSUdKMWRIUnZiaTUwWVdKSmJtUmxlQ0E5SUMweE8xeHVJQ0FnSUhKbGJtUmxjaWhpZFhSMGIyNHNJR2xrS1R0Y2JpQWdJQ0JqY205emMzWmxiblF1WVdSa0tHSjFkSFJ2Yml3Z0oyTnNhV05ySnl3Z1oyVjBRMjl0YldGdVpFaGhibVJzWlhJb2MzVnlabUZqWlN3Z2FHbHpkRzl5ZVN3Z1ptNHBLVHRjYmlBZ0lDQnBaaUFvWTI5dFltOHBJSHRjYmlBZ0lDQWdJR0ZrWkVOdmJXMWhibVFvWTI5dFltOHNJR1p1S1R0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHSjFkSFJ2Ymp0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHRmtaRU52YlcxaGJtUWdLR052YldKdkxDQm1iaWtnZTF4dUlDQWdJR3RoYm5sbExtOXVLR052YldKdkxDQnJZVzU1WlU5d2RHbHZibk1zSUdkbGRFTnZiVzFoYm1SSVlXNWtiR1Z5S0hOMWNtWmhZMlVzSUdocGMzUnZjbmtzSUdadUtTazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ5ZFc1RGIyMXRZVzVrSUNobWJpa2dlMXh1SUNBZ0lHZGxkRU52YlcxaGJtUklZVzVrYkdWeUtITjFjbVpoWTJVc0lHaHBjM1J2Y25rc0lISmxZWEp5WVc1blpTa29iblZzYkNrN1hHNGdJQ0FnWm5WdVkzUnBiMjRnY21WaGNuSmhibWRsSUNobExDQnRiMlJsTENCamFIVnVhM01wSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtYmk1allXeHNLSFJvYVhNc0lHTm9kVzVyY3l3Z2JXOWtaU2s3WEc0Z0lDQWdmVnh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUhSaFp5QW9iM0IwYVc5dWN5a2dlMXh1SUNCMllYSWdieUE5SUc5d2RHbHZibk1nZkh3Z2UzMDdYRzRnSUhaaGNpQmxiQ0E5SUdSdll5NWpjbVZoZEdWRmJHVnRaVzUwS0c4dWRDQjhmQ0FuWkdsMkp5azdYRzRnSUdWc0xtTnNZWE56VG1GdFpTQTlJRzh1WXlCOGZDQW5KenRjYmlBZ2MyVjBWR1Y0ZENobGJDd2dieTU0SUh4OElDY25LVHRjYmlBZ2FXWWdLRzh1Y0NrZ2V5QnZMbkF1WVhCd1pXNWtRMmhwYkdRb1pXd3BPeUI5WEc0Z0lISmxkSFZ5YmlCbGJEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2MzUnZjQ0FvWlNrZ2UxeHVJQ0JwWmlBb1pTa2dleUJsTG5CeVpYWmxiblJFWldaaGRXeDBLQ2s3SUdVdWMzUnZjRkJ5YjNCaFoyRjBhVzl1S0NrN0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z2JXRmphV1o1SUNoMFpYaDBLU0I3WEc0Z0lISmxkSFZ5YmlCMFpYaDBYRzRnSUNBZ0xuSmxjR3hoWTJVb0wxeGNZbU4wY214Y1hHSXZhU3dnSjF4Y2RUSXpNVGduS1Z4dUlDQWdJQzV5WlhCc1lXTmxLQzljWEdKaGJIUmNYR0l2YVN3Z0oxeGNkVEl6TWpVbktWeHVJQ0FnSUM1eVpYQnNZV05sS0M5Y1hHSnphR2xtZEZ4Y1lpOXBMQ0FuWEZ4MU1qRmxOeWNwTzF4dWZWeHVYRzUzYjI5bWJXRnlheTVtYVc1a0lEMGdabWx1WkR0Y2JuZHZiMlp0WVhKckxuTjBjbWx1WjNNZ1BTQnpkSEpwYm1kek8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjNiMjltYldGeWF6dGNiaUpkZlE9PSJdfQ==
