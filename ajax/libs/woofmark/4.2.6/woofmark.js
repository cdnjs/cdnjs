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
},{"./throttle":4,"crossvent":10,"seleccion":29,"sell":31}],4:[function(require,module,exports){
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
  o.fieldKey = o.fieldKey || 'uploads';
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
      form.append(o.fieldKey, file, file.name);
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

},{"contra/emitter":9,"crossvent":6,"xhr":34}],6:[function(require,module,exports){
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

},{"ticky":32}],9:[function(require,module,exports){
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
'use strict';

var isCallable = require('is-callable');

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;

},{"is-callable":15}],14:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgd2luO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIHdpbiA9IHNlbGY7XG59IGVsc2Uge1xuICAgIHdpbiA9IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbjtcbiJdfQ==
},{}],15:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"crossvent":10,"sektor":22}],18:[function(require,module,exports){
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
},{"./stub":19,"./tracking":20}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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
},{"for-each":13,"trim":33}],22:[function(require,module,exports){
(function (global){
'use strict';

var expando = 'sektor-' + Date.now();
var rsiblings = /[+~]/;
var document = global.document;
var del = (document && document.documentElement) || {};
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zZWt0b3Ivc3JjL3Nla3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBleHBhbmRvID0gJ3Nla3Rvci0nICsgRGF0ZS5ub3coKTtcbnZhciByc2libGluZ3MgPSAvWyt+XS87XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgZGVsID0gKGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgfHwge307XG52YXIgbWF0Y2ggPSAoXG4gIGRlbC5tYXRjaGVzIHx8XG4gIGRlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgZGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICBkZWwub01hdGNoZXNTZWxlY3RvciB8fFxuICBkZWwubXNNYXRjaGVzU2VsZWN0b3IgfHxcbiAgbmV2ZXJcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gc2VrdG9yO1xuXG5zZWt0b3IubWF0Y2hlcyA9IG1hdGNoZXM7XG5zZWt0b3IubWF0Y2hlc1NlbGVjdG9yID0gbWF0Y2hlc1NlbGVjdG9yO1xuXG5mdW5jdGlvbiBxc2EgKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gIHZhciBleGlzdGVkLCBpZCwgcHJlZml4LCBwcmVmaXhlZCwgYWRhcHRlciwgaGFjayA9IGNvbnRleHQgIT09IGRvY3VtZW50O1xuICBpZiAoaGFjaykgeyAvLyBpZCBoYWNrIGZvciBjb250ZXh0LXJvb3RlZCBxdWVyaWVzXG4gICAgZXhpc3RlZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIGlkID0gZXhpc3RlZCB8fCBleHBhbmRvO1xuICAgIHByZWZpeCA9ICcjJyArIGlkICsgJyAnO1xuICAgIHByZWZpeGVkID0gcHJlZml4ICsgc2VsZWN0b3IucmVwbGFjZSgvLC9nLCAnLCcgKyBwcmVmaXgpO1xuICAgIGFkYXB0ZXIgPSByc2libGluZ3MudGVzdChzZWxlY3RvcikgJiYgY29udGV4dC5wYXJlbnROb2RlO1xuICAgIGlmICghZXhpc3RlZCkgeyBjb250ZXh0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7IH1cbiAgfVxuICB0cnkge1xuICAgIHJldHVybiAoYWRhcHRlciB8fCBjb250ZXh0KS5xdWVyeVNlbGVjdG9yQWxsKHByZWZpeGVkIHx8IHNlbGVjdG9yKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBbXTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoZXhpc3RlZCA9PT0gbnVsbCkgeyBjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTsgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNla3RvciAoc2VsZWN0b3IsIGN0eCwgY29sbGVjdGlvbiwgc2VlZCkge1xuICB2YXIgZWxlbWVudDtcbiAgdmFyIGNvbnRleHQgPSBjdHggfHwgZG9jdW1lbnQ7XG4gIHZhciByZXN1bHRzID0gY29sbGVjdGlvbiB8fCBbXTtcbiAgdmFyIGkgPSAwO1xuICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG4gIGlmIChjb250ZXh0Lm5vZGVUeXBlICE9PSAxICYmIGNvbnRleHQubm9kZVR5cGUgIT09IDkpIHtcbiAgICByZXR1cm4gW107IC8vIGJhaWwgaWYgY29udGV4dCBpcyBub3QgYW4gZWxlbWVudCBvciBkb2N1bWVudFxuICB9XG4gIGlmIChzZWVkKSB7XG4gICAgd2hpbGUgKChlbGVtZW50ID0gc2VlZFtpKytdKSkge1xuICAgICAgaWYgKG1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvcikpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXN1bHRzLnB1c2guYXBwbHkocmVzdWx0cywgcXNhKHNlbGVjdG9yLCBjb250ZXh0KSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKHNlbGVjdG9yLCBlbGVtZW50cykge1xuICByZXR1cm4gc2VrdG9yKHNlbGVjdG9yLCBudWxsLCBudWxsLCBlbGVtZW50cyk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvciAoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIG1hdGNoLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBuZXZlciAoKSB7IHJldHVybiBmYWxzZTsgfVxuIl19
},{}],23:[function(require,module,exports){
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
},{"./getSelectionNullOp":24,"./getSelectionRaw":25,"./getSelectionSynthetic":26,"./isHost":27}],24:[function(require,module,exports){
'use strict';

function noop () {}

function getSelectionNullOp () {
  return {
    removeAllRanges: noop,
    addRange: noop
  };
}

module.exports = getSelectionNullOp;

},{}],25:[function(require,module,exports){
(function (global){
'use strict';

function getSelectionRaw () {
  return global.getSelection();
}

module.exports = getSelectionRaw;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zZWxlY2Npb24vc3JjL2dldFNlbGVjdGlvblJhdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb25SYXcgKCkge1xuICByZXR1cm4gZ2xvYmFsLmdldFNlbGVjdGlvbigpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvblJhdztcbiJdfQ==
},{}],26:[function(require,module,exports){
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
},{"./rangeToTextRange":28}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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
},{}],29:[function(require,module,exports){
'use strict';

var getSelection = require('./getSelection');
var setSelection = require('./setSelection');

module.exports = {
  get: getSelection,
  set: setSelection
};

},{"./getSelection":23,"./setSelection":30}],30:[function(require,module,exports){
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
},{"./getSelection":23,"./rangeToTextRange":28}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
var si = typeof setImmediate === 'function', tick;
if (si) {
  tick = function (fn) { setImmediate(fn); };
} else {
  tick = function (fn) { setTimeout(fn, 0); };
}

module.exports = tick;
},{}],33:[function(require,module,exports){

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

},{}],34:[function(require,module,exports){
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

},{"global/window":14,"is-function":16,"parse-headers":21,"xtend":35}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"./InputState":37,"crossvent":10}],37:[function(require,module,exports){
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
},{"./fixEOL":44,"./html/HtmlChunks":48,"./isVisibleElement":57,"./markdown/MarkdownChunks":59}],38:[function(require,module,exports){
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
        mergeHtmlAndAttachment: options.mergeHtmlAndAttachment || mergeHtmlAndAttachment,
        autoUpload: autoUpload
      });
    };
  }
  function bind (id, combo, fn) {
    return editor.addCommandButton(id, combo, suppress(fn));
  }
  function mergeHtmlAndAttachment (chunks, link) {
    var linkText = chunks.selection || link.title;
    return {
      before: chunks.before,
      selection: '<a href="' + link.href + '">' + linkText + '</a>',
      after: chunks.after,
    };
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

},{"./html/blockquote":49,"./html/boldOrItalic":50,"./html/codeblock":51,"./html/heading":52,"./html/hr":53,"./html/linkOrImageOrAttachment":54,"./html/list":55,"./markdown/blockquote":60,"./markdown/boldOrItalic":61,"./markdown/codeblock":62,"./markdown/heading":63,"./markdown/hr":64,"./markdown/linkOrImageOrAttachment":65,"./markdown/list":66,"crossvent":10}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
'use strict';

function fixEOL (text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

module.exports = fixEOL;

},{}],45:[function(require,module,exports){
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

},{"./InputState":37}],46:[function(require,module,exports){
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
},{"./cast":39,"./fixEOL":44,"./many":58,"seleccion":29}],47:[function(require,module,exports){
'use strict';

function getText (el) {
  return el.innerText || el.textContent;
}

module.exports = getText;

},{}],48:[function(require,module,exports){
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

},{"../chunks/trim":41}],49:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function blockquote (chunks) {
  wrapping('blockquote', strings.placeholders.quote, chunks);
}

module.exports = blockquote;

},{"../strings":76,"./wrapping":56}],50:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function boldOrItalic (chunks, type) {
  wrapping(type === 'bold' ? 'strong' : 'em', strings.placeholders[type], chunks);
}

module.exports = boldOrItalic;

},{"../strings":76,"./wrapping":56}],51:[function(require,module,exports){
'use strict';

var strings = require('../strings');
var wrapping = require('./wrapping');

function codeblock (chunks) {
  wrapping('pre><code', strings.placeholders.code, chunks);
}

module.exports = codeblock;

},{"../strings":76,"./wrapping":56}],52:[function(require,module,exports){
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

},{"../strings":76}],53:[function(require,module,exports){
'use strict';

function hr (chunks) {
  chunks.before += '\n<hr>\n';
  chunks.selection = '';
}

module.exports = hr;

},{}],54:[function(require,module,exports){
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
      parts = options.mergeHtmlAndAttachment(chunks, link);
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

},{"../chunks/parseLinkInput":40,"../once":69,"../strings":76,"crossvent":10}],55:[function(require,module,exports){
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

},{"../strings":76}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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
},{}],58:[function(require,module,exports){
'use strict';

function many (text, times) {
  return new Array(times + 1).join(text);
}

module.exports = many;

},{}],59:[function(require,module,exports){
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

},{"../chunks/trim":41,"../extendRegExp":43,"../many":58}],60:[function(require,module,exports){
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

},{"../strings":76,"./settings":67,"./wrapping":68}],61:[function(require,module,exports){
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

},{"../strings":76}],62:[function(require,module,exports){
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

},{"../strings":76}],63:[function(require,module,exports){
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

},{"../many":58,"../strings":76}],64:[function(require,module,exports){
'use strict';

function hr (chunks) {
  chunks.startTag = '----------\n';
  chunks.selection = '';
  chunks.skip({ left: 2, right: 1, any: true });
}

module.exports = hr;

},{}],65:[function(require,module,exports){
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

},{"../chunks/parseLinkInput":40,"../once":69,"../strings":76}],66:[function(require,module,exports){
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

},{"../many":58,"../strings":76,"./settings":67,"./wrapping":68}],67:[function(require,module,exports){
'use strict';

module.exports = {
  lineLength: 72
};

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
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
      xhrOptions: upload.xhrOptions,
      endpoint: upload.url,
      validate: upload.validate || 'image'
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

},{"../classes":42,"../strings":76,"../uploads":77,"./render":72,"bureaucracy":5,"crossvent":10}],72:[function(require,module,exports){
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
},{"../classes":42,"../getText":47,"../setText":75,"../strings":76,"crossvent":10}],73:[function(require,module,exports){
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

},{"bullseye":2}],74:[function(require,module,exports){
'use strict';

var setText = require('./setText');
var strings = require('./strings');

function commands (el, id) {
  setText(el, strings.buttons[id] || id);
}

function modes (el, id) {
  setText(el, strings.modes[id] || id);
}

module.exports = {
  modes: modes,
  commands: commands
};

},{"./setText":75,"./strings":76}],75:[function(require,module,exports){
'use strict';

function setText (el, value) {
  el.innerText = el.textContent = value;
}

module.exports = setText;

},{}],76:[function(require,module,exports){
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
  },
  modes: {
    wysiwyg: 'wysiwyg',
    markdown: 'm\u2193',
  },
};

},{}],77:[function(require,module,exports){
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

},{"./classes":42,"crossvent":10}],78:[function(require,module,exports){
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
},{"./InputHistory":36,"./bindCommands":38,"./classes":42,"./getCommandHandler":45,"./getSurface":46,"./prompts/close":70,"./prompts/prompt":71,"./rememberSelection":73,"./renderers":74,"./setText":75,"./strings":76,"./uploads":77,"crossvent":10,"kanye":17,"local-storage":18}]},{},[78])(78)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXRvYS9hdG9hLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL2J1bGxzZXllLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL3RhaWxvcm1hZGUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvdGhyb3R0bGUuanMiLCJub2RlX21vZHVsZXMvYnVyZWF1Y3JhY3kvYnVyZWF1Y3JhY3kuanMiLCJub2RlX21vZHVsZXMvYnVyZWF1Y3JhY3kvbm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2J1cmVhdWNyYWN5L25vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2V2ZW50bWFwLmpzIiwibm9kZV9tb2R1bGVzL2NvbnRyYS9kZWJvdW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9jb250cmEvZW1pdHRlci5qcyIsIm5vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2Nyb3NzdmVudC5qcyIsIm5vZGVfbW9kdWxlcy9jcm9zc3ZlbnQvc3JjL2V2ZW50bWFwLmpzIiwibm9kZV9tb2R1bGVzL2N1c3RvbS1ldmVudC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mb3ItZWFjaC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwibm9kZV9tb2R1bGVzL2lzLWNhbGxhYmxlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2lzLWZ1bmN0aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2thbnllL2thbnllLmpzIiwibm9kZV9tb2R1bGVzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2NhbC1zdG9yYWdlL3N0dWIuanMiLCJub2RlX21vZHVsZXMvbG9jYWwtc3RvcmFnZS90cmFja2luZy5qcyIsIm5vZGVfbW9kdWxlcy9wYXJzZS1oZWFkZXJzL3BhcnNlLWhlYWRlcnMuanMiLCJub2RlX21vZHVsZXMvc2VrdG9yL3NyYy9zZWt0b3IuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25OdWxsT3AuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25SYXcuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9nZXRTZWxlY3Rpb25TeW50aGV0aWMuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9pc0hvc3QuanMiLCJub2RlX21vZHVsZXMvc2VsZWNjaW9uL3NyYy9yYW5nZVRvVGV4dFJhbmdlLmpzIiwibm9kZV9tb2R1bGVzL3NlbGVjY2lvbi9zcmMvc2VsZWNjaW9uLmpzIiwibm9kZV9tb2R1bGVzL3NlbGVjY2lvbi9zcmMvc2V0U2VsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3NlbGwvc2VsbC5qcyIsIm5vZGVfbW9kdWxlcy90aWNreS90aWNreS1icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3RyaW0vaW5kZXguanMiLCJub2RlX21vZHVsZXMveGhyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3h0ZW5kL2ltbXV0YWJsZS5qcyIsInNyYy9JbnB1dEhpc3RvcnkuanMiLCJzcmMvSW5wdXRTdGF0ZS5qcyIsInNyYy9iaW5kQ29tbWFuZHMuanMiLCJzcmMvY2FzdC5qcyIsInNyYy9jaHVua3MvcGFyc2VMaW5rSW5wdXQuanMiLCJzcmMvY2h1bmtzL3RyaW0uanMiLCJzcmMvY2xhc3Nlcy5qcyIsInNyYy9leHRlbmRSZWdFeHAuanMiLCJzcmMvZml4RU9MLmpzIiwic3JjL2dldENvbW1hbmRIYW5kbGVyLmpzIiwic3JjL2dldFN1cmZhY2UuanMiLCJzcmMvZ2V0VGV4dC5qcyIsInNyYy9odG1sL0h0bWxDaHVua3MuanMiLCJzcmMvaHRtbC9ibG9ja3F1b3RlLmpzIiwic3JjL2h0bWwvYm9sZE9ySXRhbGljLmpzIiwic3JjL2h0bWwvY29kZWJsb2NrLmpzIiwic3JjL2h0bWwvaGVhZGluZy5qcyIsInNyYy9odG1sL2hyLmpzIiwic3JjL2h0bWwvbGlua09ySW1hZ2VPckF0dGFjaG1lbnQuanMiLCJzcmMvaHRtbC9saXN0LmpzIiwic3JjL2h0bWwvd3JhcHBpbmcuanMiLCJzcmMvaXNWaXNpYmxlRWxlbWVudC5qcyIsInNyYy9tYW55LmpzIiwic3JjL21hcmtkb3duL01hcmtkb3duQ2h1bmtzLmpzIiwic3JjL21hcmtkb3duL2Jsb2NrcXVvdGUuanMiLCJzcmMvbWFya2Rvd24vYm9sZE9ySXRhbGljLmpzIiwic3JjL21hcmtkb3duL2NvZGVibG9jay5qcyIsInNyYy9tYXJrZG93bi9oZWFkaW5nLmpzIiwic3JjL21hcmtkb3duL2hyLmpzIiwic3JjL21hcmtkb3duL2xpbmtPckltYWdlT3JBdHRhY2htZW50LmpzIiwic3JjL21hcmtkb3duL2xpc3QuanMiLCJzcmMvbWFya2Rvd24vc2V0dGluZ3MuanMiLCJzcmMvbWFya2Rvd24vd3JhcHBpbmcuanMiLCJzcmMvb25jZS5qcyIsInNyYy9wcm9tcHRzL2Nsb3NlLmpzIiwic3JjL3Byb21wdHMvcHJvbXB0LmpzIiwic3JjL3Byb21wdHMvcmVuZGVyLmpzIiwic3JjL3JlbWVtYmVyU2VsZWN0aW9uLmpzIiwic3JjL3JlbmRlcmVycy5qcyIsInNyYy9zZXRUZXh0LmpzIiwic3JjL3N0cmluZ3MuanMiLCJzcmMvdXBsb2Fkcy5qcyIsInNyYy93b29mbWFyay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhdG9hIChhLCBuKSB7IHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhLCBuKTsgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgdGFpbG9ybWFkZSA9IHJlcXVpcmUoJy4vdGFpbG9ybWFkZScpO1xuXG5mdW5jdGlvbiBidWxsc2V5ZSAoZWwsIHRhcmdldCwgb3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnM7XG4gIHZhciBkb21UYXJnZXQgPSB0YXJnZXQgJiYgdGFyZ2V0LnRhZ05hbWU7XG5cbiAgaWYgKCFkb21UYXJnZXQgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIG8gPSB0YXJnZXQ7XG4gIH1cbiAgaWYgKCFkb21UYXJnZXQpIHtcbiAgICB0YXJnZXQgPSBlbDtcbiAgfVxuICBpZiAoIW8pIHsgbyA9IHt9OyB9XG5cbiAgdmFyIGRlc3Ryb3llZCA9IGZhbHNlO1xuICB2YXIgdGhyb3R0bGVkV3JpdGUgPSB0aHJvdHRsZSh3cml0ZSwgMzApO1xuICB2YXIgdGFpbG9yT3B0aW9ucyA9IHsgdXBkYXRlOiBvLmF1dG91cGRhdGVUb0NhcmV0ICE9PSBmYWxzZSAmJiB1cGRhdGUgfTtcbiAgdmFyIHRhaWxvciA9IG8uY2FyZXQgJiYgdGFpbG9ybWFkZSh0YXJnZXQsIHRhaWxvck9wdGlvbnMpO1xuXG4gIHdyaXRlKCk7XG5cbiAgaWYgKG8udHJhY2tpbmcgIT09IGZhbHNlKSB7XG4gICAgY3Jvc3N2ZW50LmFkZCh3aW5kb3csICdyZXNpemUnLCB0aHJvdHRsZWRXcml0ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlYWQ6IHJlYWROdWxsLFxuICAgIHJlZnJlc2g6IHdyaXRlLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgc2xlZXA6IHNsZWVwXG4gIH07XG5cbiAgZnVuY3Rpb24gc2xlZXAgKCkge1xuICAgIHRhaWxvck9wdGlvbnMuc2xlZXBpbmcgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZE51bGwgKCkgeyByZXR1cm4gcmVhZCgpOyB9XG5cbiAgZnVuY3Rpb24gcmVhZCAocmVhZGluZ3MpIHtcbiAgICB2YXIgYm91bmRzID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBzY3JvbGxUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmICh0YWlsb3IpIHtcbiAgICAgIHJlYWRpbmdzID0gdGFpbG9yLnJlYWQoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IChyZWFkaW5ncy5hYnNvbHV0ZSA/IDAgOiBib3VuZHMubGVmdCkgKyByZWFkaW5ncy54LFxuICAgICAgICB5OiAocmVhZGluZ3MuYWJzb2x1dGUgPyAwIDogYm91bmRzLnRvcCkgKyBzY3JvbGxUb3AgKyByZWFkaW5ncy55ICsgMjBcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB4OiBib3VuZHMubGVmdCxcbiAgICAgIHk6IGJvdW5kcy50b3AgKyBzY3JvbGxUb3BcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlIChyZWFkaW5ncykge1xuICAgIHdyaXRlKHJlYWRpbmdzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChyZWFkaW5ncykge1xuICAgIGlmIChkZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQnVsbHNleWUgY2FuXFwndCByZWZyZXNoIGFmdGVyIGJlaW5nIGRlc3Ryb3llZC4gQ3JlYXRlIGFub3RoZXIgaW5zdGFuY2UgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgaWYgKHRhaWxvciAmJiAhcmVhZGluZ3MpIHtcbiAgICAgIHRhaWxvck9wdGlvbnMuc2xlZXBpbmcgPSBmYWxzZTtcbiAgICAgIHRhaWxvci5yZWZyZXNoKCk7IHJldHVybjtcbiAgICB9XG4gICAgdmFyIHAgPSByZWFkKHJlYWRpbmdzKTtcbiAgICBpZiAoIXRhaWxvciAmJiB0YXJnZXQgIT09IGVsKSB7XG4gICAgICBwLnkgKz0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB9XG4gICAgZWwuc3R5bGUubGVmdCA9IHAueCArICdweCc7XG4gICAgZWwuc3R5bGUudG9wID0gcC55ICsgJ3B4JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0YWlsb3IpIHsgdGFpbG9yLmRlc3Ryb3koKTsgfVxuICAgIGNyb3NzdmVudC5yZW1vdmUod2luZG93LCAncmVzaXplJywgdGhyb3R0bGVkV3JpdGUpO1xuICAgIGRlc3Ryb3llZCA9IHRydWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWxsc2V5ZTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHNlbGwgPSByZXF1aXJlKCdzZWxsJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgc2VsZWNjaW9uID0gcmVxdWlyZSgnc2VsZWNjaW9uJyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgZ2V0U2VsZWN0aW9uID0gc2VsZWNjaW9uLmdldDtcbnZhciBwcm9wcyA9IFtcbiAgJ2RpcmVjdGlvbicsXG4gICdib3hTaXppbmcnLFxuICAnd2lkdGgnLFxuICAnaGVpZ2h0JyxcbiAgJ292ZXJmbG93WCcsXG4gICdvdmVyZmxvd1knLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICdib3JkZXJCb3R0b21XaWR0aCcsXG4gICdib3JkZXJMZWZ0V2lkdGgnLFxuICAncGFkZGluZ1RvcCcsXG4gICdwYWRkaW5nUmlnaHQnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdwYWRkaW5nTGVmdCcsXG4gICdmb250U3R5bGUnLFxuICAnZm9udFZhcmlhbnQnLFxuICAnZm9udFdlaWdodCcsXG4gICdmb250U3RyZXRjaCcsXG4gICdmb250U2l6ZScsXG4gICdmb250U2l6ZUFkanVzdCcsXG4gICdsaW5lSGVpZ2h0JyxcbiAgJ2ZvbnRGYW1pbHknLFxuICAndGV4dEFsaWduJyxcbiAgJ3RleHRUcmFuc2Zvcm0nLFxuICAndGV4dEluZGVudCcsXG4gICd0ZXh0RGVjb3JhdGlvbicsXG4gICdsZXR0ZXJTcGFjaW5nJyxcbiAgJ3dvcmRTcGFjaW5nJ1xuXTtcbnZhciB3aW4gPSBnbG9iYWw7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgZmYgPSB3aW4ubW96SW5uZXJTY3JlZW5YICE9PSBudWxsICYmIHdpbi5tb3pJbm5lclNjcmVlblggIT09IHZvaWQgMDtcblxuZnVuY3Rpb24gdGFpbG9ybWFkZSAoZWwsIG9wdGlvbnMpIHtcbiAgdmFyIHRleHRJbnB1dCA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJztcbiAgdmFyIHRocm90dGxlZFJlZnJlc2ggPSB0aHJvdHRsZShyZWZyZXNoLCAzMCk7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcblxuICBiaW5kKCk7XG5cbiAgcmV0dXJuIHtcbiAgICByZWFkOiByZWFkUG9zaXRpb24sXG4gICAgcmVmcmVzaDogdGhyb3R0bGVkUmVmcmVzaCxcbiAgICBkZXN0cm95OiBkZXN0cm95XG4gIH07XG5cbiAgZnVuY3Rpb24gbm9vcCAoKSB7fVxuICBmdW5jdGlvbiByZWFkUG9zaXRpb24gKCkgeyByZXR1cm4gKHRleHRJbnB1dCA/IGNvb3Jkc1RleHQgOiBjb29yZHNIVE1MKSgpOyB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAoKSB7XG4gICAgaWYgKG8uc2xlZXBpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIChvLnVwZGF0ZSB8fCBub29wKShyZWFkUG9zaXRpb24oKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNUZXh0ICgpIHtcbiAgICB2YXIgcCA9IHNlbGwoZWwpO1xuICAgIHZhciBjb250ZXh0ID0gcHJlcGFyZSgpO1xuICAgIHZhciByZWFkaW5ncyA9IHJlYWRUZXh0Q29vcmRzKGNvbnRleHQsIHAuc3RhcnQpO1xuICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKGNvbnRleHQubWlycm9yKTtcbiAgICByZXR1cm4gcmVhZGluZ3M7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZHNIVE1MICgpIHtcbiAgICB2YXIgc2VsID0gZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICB2YXIgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgIHZhciBuZWVkc1RvV29ya0Fyb3VuZE5ld2xpbmVCdWcgPSByYW5nZS5zdGFydENvbnRhaW5lci5ub2RlTmFtZSA9PT0gJ1AnICYmIHJhbmdlLnN0YXJ0T2Zmc2V0ID09PSAwO1xuICAgICAgaWYgKG5lZWRzVG9Xb3JrQXJvdW5kTmV3bGluZUJ1Zykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm9mZnNldExlZnQsXG4gICAgICAgICAgeTogcmFuZ2Uuc3RhcnRDb250YWluZXIub2Zmc2V0VG9wLFxuICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAocmFuZ2UuZ2V0Q2xpZW50UmVjdHMpIHtcbiAgICAgICAgdmFyIHJlY3RzID0gcmFuZ2UuZ2V0Q2xpZW50UmVjdHMoKTtcbiAgICAgICAgaWYgKHJlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcmVjdHNbMF0ubGVmdCxcbiAgICAgICAgICAgIHk6IHJlY3RzWzBdLnRvcCxcbiAgICAgICAgICAgIGFic29sdXRlOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB4OiAwLCB5OiAwIH07XG4gIH1cblxuICBmdW5jdGlvbiByZWFkVGV4dENvb3JkcyAoY29udGV4dCwgcCkge1xuICAgIHZhciByZXN0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB2YXIgbWlycm9yID0gY29udGV4dC5taXJyb3I7XG4gICAgdmFyIGNvbXB1dGVkID0gY29udGV4dC5jb21wdXRlZDtcblxuICAgIHdyaXRlKG1pcnJvciwgcmVhZChlbCkuc3Vic3RyaW5nKDAsIHApKTtcblxuICAgIGlmIChlbC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICBtaXJyb3IudGV4dENvbnRlbnQgPSBtaXJyb3IudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICdcXHUwMGEwJyk7XG4gICAgfVxuXG4gICAgd3JpdGUocmVzdCwgcmVhZChlbCkuc3Vic3RyaW5nKHApIHx8ICcuJyk7XG5cbiAgICBtaXJyb3IuYXBwZW5kQ2hpbGQocmVzdCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogcmVzdC5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlckxlZnRXaWR0aCddKSxcbiAgICAgIHk6IHJlc3Qub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlclRvcFdpZHRoJ10pXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGVsKSB7XG4gICAgcmV0dXJuIHRleHRJbnB1dCA/IGVsLnZhbHVlIDogZWwuaW5uZXJIVE1MO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlcGFyZSAoKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gd2luLmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsKSA6IGVsLmN1cnJlbnRTdHlsZTtcbiAgICB2YXIgbWlycm9yID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBzdHlsZSA9IG1pcnJvci5zdHlsZTtcblxuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKG1pcnJvcik7XG5cbiAgICBpZiAoZWwudGFnTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7XG4gICAgfVxuICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnO1xuICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgcHJvcHMuZm9yRWFjaChjb3B5KTtcblxuICAgIGlmIChmZikge1xuICAgICAgc3R5bGUud2lkdGggPSBwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyICsgJ3B4JztcbiAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKSB7XG4gICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICByZXR1cm4geyBtaXJyb3I6IG1pcnJvciwgY29tcHV0ZWQ6IGNvbXB1dGVkIH07XG5cbiAgICBmdW5jdGlvbiBjb3B5IChwcm9wKSB7XG4gICAgICBzdHlsZVtwcm9wXSA9IGNvbXB1dGVkW3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChlbCwgdmFsdWUpIHtcbiAgICBpZiAodGV4dElucHV0KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXlkb3duJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2tleXVwJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2lucHV0JywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ3Bhc3RlJywgdGhyb3R0bGVkUmVmcmVzaCk7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgJ2NoYW5nZScsIHRocm90dGxlZFJlZnJlc2gpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgYmluZCh0cnVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhaWxvcm1hZGU7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWlkV3hzYzJWNVpTOTBZV2xzYjNKdFlXUmxMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhObGJHd2dQU0J5WlhGMWFYSmxLQ2R6Wld4c0p5azdYRzUyWVhJZ1kzSnZjM04yWlc1MElEMGdjbVZ4ZFdseVpTZ25ZM0p2YzNOMlpXNTBKeWs3WEc1MllYSWdjMlZzWldOamFXOXVJRDBnY21WeGRXbHlaU2duYzJWc1pXTmphVzl1SnlrN1hHNTJZWElnZEdoeWIzUjBiR1VnUFNCeVpYRjFhWEpsS0NjdUwzUm9jbTkwZEd4bEp5azdYRzUyWVhJZ1oyVjBVMlZzWldOMGFXOXVJRDBnYzJWc1pXTmphVzl1TG1kbGREdGNiblpoY2lCd2NtOXdjeUE5SUZ0Y2JpQWdKMlJwY21WamRHbHZiaWNzWEc0Z0lDZGliM2hUYVhwcGJtY25MRnh1SUNBbmQybGtkR2duTEZ4dUlDQW5hR1ZwWjJoMEp5eGNiaUFnSjI5MlpYSm1iRzkzV0Njc1hHNGdJQ2R2ZG1WeVpteHZkMWtuTEZ4dUlDQW5ZbTl5WkdWeVZHOXdWMmxrZEdnbkxGeHVJQ0FuWW05eVpHVnlVbWxuYUhSWGFXUjBhQ2NzWEc0Z0lDZGliM0prWlhKQ2IzUjBiMjFYYVdSMGFDY3NYRzRnSUNkaWIzSmtaWEpNWldaMFYybGtkR2duTEZ4dUlDQW5jR0ZrWkdsdVoxUnZjQ2NzWEc0Z0lDZHdZV1JrYVc1blVtbG5hSFFuTEZ4dUlDQW5jR0ZrWkdsdVowSnZkSFJ2YlNjc1hHNGdJQ2R3WVdSa2FXNW5UR1ZtZENjc1hHNGdJQ2RtYjI1MFUzUjViR1VuTEZ4dUlDQW5abTl1ZEZaaGNtbGhiblFuTEZ4dUlDQW5abTl1ZEZkbGFXZG9kQ2NzWEc0Z0lDZG1iMjUwVTNSeVpYUmphQ2NzWEc0Z0lDZG1iMjUwVTJsNlpTY3NYRzRnSUNkbWIyNTBVMmw2WlVGa2FuVnpkQ2NzWEc0Z0lDZHNhVzVsU0dWcFoyaDBKeXhjYmlBZ0oyWnZiblJHWVcxcGJIa25MRnh1SUNBbmRHVjRkRUZzYVdkdUp5eGNiaUFnSjNSbGVIUlVjbUZ1YzJadmNtMG5MRnh1SUNBbmRHVjRkRWx1WkdWdWRDY3NYRzRnSUNkMFpYaDBSR1ZqYjNKaGRHbHZiaWNzWEc0Z0lDZHNaWFIwWlhKVGNHRmphVzVuSnl4Y2JpQWdKM2R2Y21SVGNHRmphVzVuSjF4dVhUdGNiblpoY2lCM2FXNGdQU0JuYkc5aVlXdzdYRzUyWVhJZ1pHOWpJRDBnWkc5amRXMWxiblE3WEc1MllYSWdabVlnUFNCM2FXNHViVzk2U1c1dVpYSlRZM0psWlc1WUlDRTlQU0J1ZFd4c0lDWW1JSGRwYmk1dGIzcEpibTVsY2xOamNtVmxibGdnSVQwOUlIWnZhV1FnTUR0Y2JseHVablZ1WTNScGIyNGdkR0ZwYkc5eWJXRmtaU0FvWld3c0lHOXdkR2x2Ym5NcElIdGNiaUFnZG1GeUlIUmxlSFJKYm5CMWRDQTlJR1ZzTG5SaFowNWhiV1VnUFQwOUlDZEpUbEJWVkNjZ2ZId2daV3d1ZEdGblRtRnRaU0E5UFQwZ0oxUkZXRlJCVWtWQkp6dGNiaUFnZG1GeUlIUm9jbTkwZEd4bFpGSmxabkpsYzJnZ1BTQjBhSEp2ZEhSc1pTaHlaV1p5WlhOb0xDQXpNQ2s3WEc0Z0lIWmhjaUJ2SUQwZ2IzQjBhVzl1Y3lCOGZDQjdmVHRjYmx4dUlDQmlhVzVrS0NrN1hHNWNiaUFnY21WMGRYSnVJSHRjYmlBZ0lDQnlaV0ZrT2lCeVpXRmtVRzl6YVhScGIyNHNYRzRnSUNBZ2NtVm1jbVZ6YURvZ2RHaHliM1IwYkdWa1VtVm1jbVZ6YUN4Y2JpQWdJQ0JrWlhOMGNtOTVPaUJrWlhOMGNtOTVYRzRnSUgwN1hHNWNiaUFnWm5WdVkzUnBiMjRnYm05dmNDQW9LU0I3ZlZ4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVUc5emFYUnBiMjRnS0NrZ2V5QnlaWFIxY200Z0tIUmxlSFJKYm5CMWRDQS9JR052YjNKa2MxUmxlSFFnT2lCamIyOXlaSE5JVkUxTUtTZ3BPeUI5WEc1Y2JpQWdablZ1WTNScGIyNGdjbVZtY21WemFDQW9LU0I3WEc0Z0lDQWdhV1lnS0c4dWMyeGxaWEJwYm1jcElIdGNiaUFnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlDaHZMblZ3WkdGMFpTQjhmQ0J1YjI5d0tTaHlaV0ZrVUc5emFYUnBiMjRvS1NrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmpiMjl5WkhOVVpYaDBJQ2dwSUh0Y2JpQWdJQ0IyWVhJZ2NDQTlJSE5sYkd3b1pXd3BPMXh1SUNBZ0lIWmhjaUJqYjI1MFpYaDBJRDBnY0hKbGNHRnlaU2dwTzF4dUlDQWdJSFpoY2lCeVpXRmthVzVuY3lBOUlISmxZV1JVWlhoMFEyOXZjbVJ6S0dOdmJuUmxlSFFzSUhBdWMzUmhjblFwTzF4dUlDQWdJR1J2WXk1aWIyUjVMbkpsYlc5MlpVTm9hV3hrS0dOdmJuUmxlSFF1YldseWNtOXlLVHRjYmlBZ0lDQnlaWFIxY200Z2NtVmhaR2x1WjNNN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmpiMjl5WkhOSVZFMU1JQ2dwSUh0Y2JpQWdJQ0IyWVhJZ2MyVnNJRDBnWjJWMFUyVnNaV04wYVc5dUtDazdYRzRnSUNBZ2FXWWdLSE5sYkM1eVlXNW5aVU52ZFc1MEtTQjdYRzRnSUNBZ0lDQjJZWElnY21GdVoyVWdQU0J6Wld3dVoyVjBVbUZ1WjJWQmRDZ3dLVHRjYmlBZ0lDQWdJSFpoY2lCdVpXVmtjMVJ2VjI5eWEwRnliM1Z1WkU1bGQyeHBibVZDZFdjZ1BTQnlZVzVuWlM1emRHRnlkRU52Ym5SaGFXNWxjaTV1YjJSbFRtRnRaU0E5UFQwZ0oxQW5JQ1ltSUhKaGJtZGxMbk4wWVhKMFQyWm1jMlYwSUQwOVBTQXdPMXh1SUNBZ0lDQWdhV1lnS0c1bFpXUnpWRzlYYjNKclFYSnZkVzVrVG1WM2JHbHVaVUoxWnlrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0lDQWdJSGc2SUhKaGJtZGxMbk4wWVhKMFEyOXVkR0ZwYm1WeUxtOW1abk5sZEV4bFpuUXNYRzRnSUNBZ0lDQWdJQ0FnZVRvZ2NtRnVaMlV1YzNSaGNuUkRiMjUwWVdsdVpYSXViMlptYzJWMFZHOXdMRnh1SUNBZ0lDQWdJQ0FnSUdGaWMyOXNkWFJsT2lCMGNuVmxYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JwWmlBb2NtRnVaMlV1WjJWMFEyeHBaVzUwVW1WamRITXBJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlISmxZM1J6SUQwZ2NtRnVaMlV1WjJWMFEyeHBaVzUwVW1WamRITW9LVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tISmxZM1J6TG14bGJtZDBhQ0ErSURBcElIdGNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2VEb2djbVZqZEhOYk1GMHViR1ZtZEN4Y2JpQWdJQ0FnSUNBZ0lDQWdJSGs2SUhKbFkzUnpXekJkTG5SdmNDeGNiaUFnSUNBZ0lDQWdJQ0FnSUdGaWMyOXNkWFJsT2lCMGNuVmxYRzRnSUNBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdleUI0T2lBd0xDQjVPaUF3SUgwN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVkdWNGRFTnZiM0prY3lBb1kyOXVkR1Y0ZEN3Z2NDa2dlMXh1SUNBZ0lIWmhjaUJ5WlhOMElEMGdaRzlqTG1OeVpXRjBaVVZzWlcxbGJuUW9KM053WVc0bktUdGNiaUFnSUNCMllYSWdiV2x5Y205eUlEMGdZMjl1ZEdWNGRDNXRhWEp5YjNJN1hHNGdJQ0FnZG1GeUlHTnZiWEIxZEdWa0lEMGdZMjl1ZEdWNGRDNWpiMjF3ZFhSbFpEdGNibHh1SUNBZ0lIZHlhWFJsS0cxcGNuSnZjaXdnY21WaFpDaGxiQ2t1YzNWaWMzUnlhVzVuS0RBc0lIQXBLVHRjYmx4dUlDQWdJR2xtSUNobGJDNTBZV2RPWVcxbElEMDlQU0FuU1U1UVZWUW5LU0I3WEc0Z0lDQWdJQ0J0YVhKeWIzSXVkR1Y0ZEVOdmJuUmxiblFnUFNCdGFYSnliM0l1ZEdWNGRFTnZiblJsYm5RdWNtVndiR0ZqWlNndlhGeHpMMmNzSUNkY1hIVXdNR0V3SnlrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnZDNKcGRHVW9jbVZ6ZEN3Z2NtVmhaQ2hsYkNrdWMzVmljM1J5YVc1bktIQXBJSHg4SUNjdUp5azdYRzVjYmlBZ0lDQnRhWEp5YjNJdVlYQndaVzVrUTJocGJHUW9jbVZ6ZENrN1hHNWNiaUFnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnZURvZ2NtVnpkQzV2Wm1aelpYUk1aV1owSUNzZ2NHRnljMlZKYm5Rb1kyOXRjSFYwWldSYkoySnZjbVJsY2t4bFpuUlhhV1IwYUNkZEtTeGNiaUFnSUNBZ0lIazZJSEpsYzNRdWIyWm1jMlYwVkc5d0lDc2djR0Z5YzJWSmJuUW9ZMjl0Y0hWMFpXUmJKMkp2Y21SbGNsUnZjRmRwWkhSb0oxMHBYRzRnSUNBZ2ZUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSEpsWVdRZ0tHVnNLU0I3WEc0Z0lDQWdjbVYwZFhKdUlIUmxlSFJKYm5CMWRDQS9JR1ZzTG5aaGJIVmxJRG9nWld3dWFXNXVaWEpJVkUxTU8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdjSEpsY0dGeVpTQW9LU0I3WEc0Z0lDQWdkbUZ5SUdOdmJYQjFkR1ZrSUQwZ2QybHVMbWRsZEVOdmJYQjFkR1ZrVTNSNWJHVWdQeUJuWlhSRGIyMXdkWFJsWkZOMGVXeGxLR1ZzS1NBNklHVnNMbU4xY25KbGJuUlRkSGxzWlR0Y2JpQWdJQ0IyWVhJZ2JXbHljbTl5SUQwZ1pHOWpMbU55WldGMFpVVnNaVzFsYm5Rb0oyUnBkaWNwTzF4dUlDQWdJSFpoY2lCemRIbHNaU0E5SUcxcGNuSnZjaTV6ZEhsc1pUdGNibHh1SUNBZ0lHUnZZeTVpYjJSNUxtRndjR1Z1WkVOb2FXeGtLRzFwY25KdmNpazdYRzVjYmlBZ0lDQnBaaUFvWld3dWRHRm5UbUZ0WlNBaFBUMGdKMGxPVUZWVUp5a2dlMXh1SUNBZ0lDQWdjM1I1YkdVdWQyOXlaRmR5WVhBZ1BTQW5ZbkpsWVdzdGQyOXlaQ2M3WEc0Z0lDQWdmVnh1SUNBZ0lITjBlV3hsTG5kb2FYUmxVM0JoWTJVZ1BTQW5jSEpsTFhkeVlYQW5PMXh1SUNBZ0lITjBlV3hsTG5CdmMybDBhVzl1SUQwZ0oyRmljMjlzZFhSbEp6dGNiaUFnSUNCemRIbHNaUzUyYVhOcFltbHNhWFI1SUQwZ0oyaHBaR1JsYmljN1hHNGdJQ0FnY0hKdmNITXVabTl5UldGamFDaGpiM0I1S1R0Y2JseHVJQ0FnSUdsbUlDaG1aaWtnZTF4dUlDQWdJQ0FnYzNSNWJHVXVkMmxrZEdnZ1BTQndZWEp6WlVsdWRDaGpiMjF3ZFhSbFpDNTNhV1IwYUNrZ0xTQXlJQ3NnSjNCNEp6dGNiaUFnSUNBZ0lHbG1JQ2hsYkM1elkzSnZiR3hJWldsbmFIUWdQaUJ3WVhKelpVbHVkQ2hqYjIxd2RYUmxaQzVvWldsbmFIUXBLU0I3WEc0Z0lDQWdJQ0FnSUhOMGVXeGxMbTkyWlhKbWJHOTNXU0E5SUNkelkzSnZiR3duTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQnpkSGxzWlM1dmRtVnlabXh2ZHlBOUlDZG9hV1JrWlc0bk8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdleUJ0YVhKeWIzSTZJRzFwY25KdmNpd2dZMjl0Y0hWMFpXUTZJR052YlhCMWRHVmtJSDA3WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUJqYjNCNUlDaHdjbTl3S1NCN1hHNGdJQ0FnSUNCemRIbHNaVnR3Y205d1hTQTlJR052YlhCMWRHVmtXM0J5YjNCZE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlIZHlhWFJsSUNobGJDd2dkbUZzZFdVcElIdGNiaUFnSUNCcFppQW9kR1Y0ZEVsdWNIVjBLU0I3WEc0Z0lDQWdJQ0JsYkM1MFpYaDBRMjl1ZEdWdWRDQTlJSFpoYkhWbE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0JsYkM1cGJtNWxja2hVVFV3Z1BTQjJZV3gxWlR0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCaWFXNWtJQ2h5WlcxdmRtVXBJSHRjYmlBZ0lDQjJZWElnYjNBZ1BTQnlaVzF2ZG1VZ1B5QW5jbVZ0YjNabEp5QTZJQ2RoWkdRbk8xeHVJQ0FnSUdOeWIzTnpkbVZ1ZEZ0dmNGMG9aV3dzSUNkclpYbGtiM2R1Snl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwVzI5d1hTaGxiQ3dnSjJ0bGVYVndKeXdnZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNobGJDd2dKMmx1Y0hWMEp5d2dkR2h5YjNSMGJHVmtVbVZtY21WemFDazdYRzRnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hsYkN3Z0ozQmhjM1JsSnl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwVzI5d1hTaGxiQ3dnSjJOb1lXNW5aU2NzSUhSb2NtOTBkR3hsWkZKbFpuSmxjMmdwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1pHVnpkSEp2ZVNBb0tTQjdYRzRnSUNBZ1ltbHVaQ2gwY25WbEtUdGNiaUFnZlZ4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSFJoYVd4dmNtMWhaR1U3WEc0aVhYMD0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHRocm90dGxlIChmbiwgYm91bmRhcnkpIHtcbiAgdmFyIGxhc3QgPSAtSW5maW5pdHk7XG4gIHZhciB0aW1lcjtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJvdW5jZWQgKCkge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1bmJvdW5kKCk7XG5cbiAgICBmdW5jdGlvbiB1bmJvdW5kICgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICB2YXIgbmV4dCA9IGxhc3QgKyBib3VuZGFyeTtcbiAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgaWYgKG5vdyA+IG5leHQpIHtcbiAgICAgICAgbGFzdCA9IG5vdztcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCh1bmJvdW5kLCBuZXh0IC0gbm93KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB4aHIgPSByZXF1aXJlKCd4aHInKTtcbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBlbWl0dGVyID0gcmVxdWlyZSgnY29udHJhL2VtaXR0ZXInKTtcbnZhciB2YWxpZGF0b3JzID0ge1xuICBpbWFnZTogaXNJdEFuSW1hZ2VGaWxlXG59O1xudmFyIHJpbWFnZW1pbWUgPSAvXmltYWdlXFwvKGdpZnxwbmd8cD9qcGU/ZykkL2k7XG5cbmZ1bmN0aW9uIHNldHVwIChmaWxlaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGJ1cmVhdWNyYXQgPSBjcmVhdGUob3B0aW9ucyk7XG4gIGNyb3NzdmVudC5hZGQoZmlsZWlucHV0LCAnY2hhbmdlJywgaGFuZGxlciwgZmFsc2UpO1xuXG4gIHJldHVybiBidXJlYXVjcmF0O1xuXG4gIGZ1bmN0aW9uIGhhbmRsZXIgKGUpIHtcbiAgICBzdG9wKGUpO1xuICAgIGlmIChmaWxlaW5wdXQuZmlsZXMubGVuZ3RoKSB7XG4gICAgICBidXJlYXVjcmF0LnN1Ym1pdChmaWxlaW5wdXQuZmlsZXMpO1xuICAgIH1cbiAgICBmaWxlaW5wdXQudmFsdWUgPSAnJztcbiAgICBmaWxlaW5wdXQudmFsdWUgPSBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSAob3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIG8uZm9ybURhdGEgPSBvLmZvcm1EYXRhIHx8IHt9O1xuICBvLmZpZWxkS2V5ID0gby5maWVsZEtleSB8fCAndXBsb2Fkcyc7XG4gIHZhciBidXJlYXVjcmF0ID0gZW1pdHRlcih7XG4gICAgc3VibWl0OiBzdWJtaXRcbiAgfSk7XG4gIHJldHVybiBidXJlYXVjcmF0O1xuXG4gIGZ1bmN0aW9uIHN1Ym1pdCAocmF3RmlsZXMpIHtcbiAgICBidXJlYXVjcmF0LmVtaXQoJ3N0YXJ0ZWQnLCByYXdGaWxlcyk7XG4gICAgdmFyIGFsbEZpbGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocmF3RmlsZXMpO1xuICAgIHZhciB2YWxpZEZpbGVzID0gZmlsdGVyKGFsbEZpbGVzKTtcbiAgICBpZiAoIXZhbGlkRmlsZXMpIHtcbiAgICAgIGJ1cmVhdWNyYXQuZW1pdCgnaW52YWxpZCcsIGFsbEZpbGVzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYnVyZWF1Y3JhdC5lbWl0KCd2YWxpZCcsIHZhbGlkRmlsZXMpO1xuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgT2JqZWN0LmtleXMoby5mb3JtRGF0YSkuZm9yRWFjaChmdW5jdGlvbiBjb3B5Rm9ybURhdGEoa2V5KSB7XG4gICAgICBmb3JtLmFwcGVuZChrZXksIG8uZm9ybURhdGFba2V5XSk7XG4gICAgfSk7XG4gICAgdmFyIHJlcSA9IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiBvLm1ldGhvZCB8fCAnUFVUJyxcbiAgICAgIHVybDogby5lbmRwb2ludCB8fCAnL2FwaS9maWxlcycsXG4gICAgICBib2R5OiBmb3JtXG4gICAgfTtcblxuICAgIHZhbGlkRmlsZXMuZm9yRWFjaChhcHBlbmRGaWxlKTtcbiAgICB4aHIocmVxLCBoYW5kbGVSZXNwb25zZSk7XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRGaWxlIChmaWxlKSB7XG4gICAgICBmb3JtLmFwcGVuZChvLmZpZWxkS2V5LCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlIChlcnIsIHJlcywgYm9keSkge1xuICAgICAgcmVzLmJvZHkgPSBib2R5ID0gZ2V0RGF0YShib2R5KTtcbiAgICAgIHZhciByZXN1bHRzID0gYm9keSAmJiBib2R5LnJlc3VsdHMgJiYgQXJyYXkuaXNBcnJheShib2R5LnJlc3VsdHMpID8gYm9keS5yZXN1bHRzIDogW107XG4gICAgICB2YXIgZmFpbGVkID0gZXJyIHx8IHJlcy5zdGF0dXNDb2RlIDwgMjAwIHx8IHJlcy5zdGF0dXNDb2RlID4gMjk5IHx8IGJvZHkgaW5zdGFuY2VvZiBFcnJvcjtcbiAgICAgIGlmIChmYWlsZWQpIHtcbiAgICAgICAgYnVyZWF1Y3JhdC5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXJlYXVjcmF0LmVtaXQoJ3N1Y2Nlc3MnLCByZXN1bHRzLCBib2R5KTtcbiAgICAgIH1cbiAgICAgIGJ1cmVhdWNyYXQuZW1pdCgnZW5kZWQnLCBlcnIsIHJlc3VsdHMsIGJvZHkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlciAoZmlsZXMpIHtcbiAgICByZXR1cm4gby52YWxpZGF0ZSA/IGZpbGVzLmZpbHRlcih3aGVyZVZhbGlkKSA6IGZpbGVzO1xuICAgIGZ1bmN0aW9uIHdoZXJlVmFsaWQgKGZpbGUpIHtcbiAgICAgIHZhciB2YWxpZGF0b3IgPSB2YWxpZGF0b3JzW28udmFsaWRhdGVdIHx8IG8udmFsaWRhdGU7XG4gICAgICByZXR1cm4gdmFsaWRhdG9yKGZpbGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzdG9wIChlKSB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gaXNJdEFuSW1hZ2VGaWxlIChmaWxlKSB7XG4gIHJldHVybiByaW1hZ2VtaW1lLnRlc3QoZmlsZS50eXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGF0YSAoYm9keSkge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGJvZHkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZXJyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6IGNyZWF0ZSxcbiAgc2V0dXA6IHNldHVwXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3VzdG9tRXZlbnQgPSByZXF1aXJlKCdjdXN0b20tZXZlbnQnKTtcbnZhciBldmVudG1hcCA9IHJlcXVpcmUoJy4vZXZlbnRtYXAnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgYWRkRXZlbnQgPSBhZGRFdmVudEVhc3k7XG52YXIgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEVhc3k7XG52YXIgaGFyZENhY2hlID0gW107XG5cbmlmICghZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgYWRkRXZlbnQgPSBhZGRFdmVudEhhcmQ7XG4gIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRIYXJkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRFdmVudCxcbiAgcmVtb3ZlOiByZW1vdmVFdmVudCxcbiAgZmFicmljYXRlOiBmYWJyaWNhdGVFdmVudFxufTtcblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgbGlzdGVuZXIgPSB1bndyYXAoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGxpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGVsLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlLCBtb2RlbCkge1xuICB2YXIgZSA9IGV2ZW50bWFwLmluZGV4T2YodHlwZSkgPT09IC0xID8gbWFrZUN1c3RvbUV2ZW50KCkgOiBtYWtlQ2xhc3NpY0V2ZW50KCk7XG4gIGlmIChlbC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDbGFzc2ljRXZlbnQgKCkge1xuICAgIHZhciBlO1xuICAgIGlmIChkb2MuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ3VzdG9tRXZlbnQgKCkge1xuICAgIHJldHVybiBuZXcgY3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWw6IG1vZGVsIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBmbi5jYWxsKGVsLCBlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciB3cmFwcGVyID0gdW53cmFwKGVsLCB0eXBlLCBmbikgfHwgd3JhcHBlckZhY3RvcnkoZWwsIHR5cGUsIGZuKTtcbiAgaGFyZENhY2hlLnB1c2goe1xuICAgIHdyYXBwZXI6IHdyYXBwZXIsXG4gICAgZWxlbWVudDogZWwsXG4gICAgdHlwZTogdHlwZSxcbiAgICBmbjogZm5cbiAgfSk7XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiB1bndyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSA9IGZpbmQoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgd3JhcHBlciA9IGhhcmRDYWNoZVtpXS53cmFwcGVyO1xuICAgIGhhcmRDYWNoZS5zcGxpY2UoaSwgMSk7IC8vIGZyZWUgdXAgYSB0YWQgb2YgbWVtb3J5XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpLCBpdGVtO1xuICBmb3IgKGkgPSAwOyBpIDwgaGFyZENhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbSA9IGhhcmRDYWNoZVtpXTtcbiAgICBpZiAoaXRlbS5lbGVtZW50ID09PSBlbCAmJiBpdGVtLnR5cGUgPT09IHR5cGUgJiYgaXRlbS5mbiA9PT0gZm4pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpZFhKbFlYVmpjbUZqZVM5dWIyUmxYMjF2WkhWc1pYTXZZM0p2YzNOMlpXNTBMM055WXk5amNtOXpjM1psYm5RdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnWTNWemRHOXRSWFpsYm5RZ1BTQnlaWEYxYVhKbEtDZGpkWE4wYjIwdFpYWmxiblFuS1R0Y2JuWmhjaUJsZG1WdWRHMWhjQ0E5SUhKbGNYVnBjbVVvSnk0dlpYWmxiblJ0WVhBbktUdGNiblpoY2lCa2IyTWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzUyWVhJZ1lXUmtSWFpsYm5RZ1BTQmhaR1JGZG1WdWRFVmhjM2s3WEc1MllYSWdjbVZ0YjNabFJYWmxiblFnUFNCeVpXMXZkbVZGZG1WdWRFVmhjM2s3WEc1MllYSWdhR0Z5WkVOaFkyaGxJRDBnVzEwN1hHNWNibWxtSUNnaFoyeHZZbUZzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElwSUh0Y2JpQWdZV1JrUlhabGJuUWdQU0JoWkdSRmRtVnVkRWhoY21RN1hHNGdJSEpsYlc5MlpVVjJaVzUwSUQwZ2NtVnRiM1psUlhabGJuUklZWEprTzF4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHRjYmlBZ1lXUmtPaUJoWkdSRmRtVnVkQ3hjYmlBZ2NtVnRiM1psT2lCeVpXMXZkbVZGZG1WdWRDeGNiaUFnWm1GaWNtbGpZWFJsT2lCbVlXSnlhV05oZEdWRmRtVnVkRnh1ZlR0Y2JseHVablZ1WTNScGIyNGdZV1JrUlhabGJuUkZZWE41SUNobGJDd2dkSGx3WlN3Z1ptNHNJR05oY0hSMWNtbHVaeWtnZTF4dUlDQnlaWFIxY200Z1pXd3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpaDBlWEJsTENCbWJpd2dZMkZ3ZEhWeWFXNW5LVHRjYm4xY2JseHVablZ1WTNScGIyNGdZV1JrUlhabGJuUklZWEprSUNobGJDd2dkSGx3WlN3Z1ptNHBJSHRjYmlBZ2NtVjBkWEp1SUdWc0xtRjBkR0ZqYUVWMlpXNTBLQ2R2YmljZ0t5QjBlWEJsTENCM2NtRndLR1ZzTENCMGVYQmxMQ0JtYmlrcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVpXMXZkbVZGZG1WdWRFVmhjM2tnS0dWc0xDQjBlWEJsTENCbWJpd2dZMkZ3ZEhWeWFXNW5LU0I3WEc0Z0lISmxkSFZ5YmlCbGJDNXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLSFI1Y0dVc0lHWnVMQ0JqWVhCMGRYSnBibWNwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WlcxdmRtVkZkbVZ1ZEVoaGNtUWdLR1ZzTENCMGVYQmxMQ0JtYmlrZ2UxeHVJQ0IyWVhJZ2JHbHpkR1Z1WlhJZ1BTQjFibmR5WVhBb1pXd3NJSFI1Y0dVc0lHWnVLVHRjYmlBZ2FXWWdLR3hwYzNSbGJtVnlLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHVnNMbVJsZEdGamFFVjJaVzUwS0NkdmJpY2dLeUIwZVhCbExDQnNhWE4wWlc1bGNpazdYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWm1GaWNtbGpZWFJsUlhabGJuUWdLR1ZzTENCMGVYQmxMQ0J0YjJSbGJDa2dlMXh1SUNCMllYSWdaU0E5SUdWMlpXNTBiV0Z3TG1sdVpHVjRUMllvZEhsd1pTa2dQVDA5SUMweElEOGdiV0ZyWlVOMWMzUnZiVVYyWlc1MEtDa2dPaUJ0WVd0bFEyeGhjM05wWTBWMlpXNTBLQ2s3WEc0Z0lHbG1JQ2hsYkM1a2FYTndZWFJqYUVWMlpXNTBLU0I3WEc0Z0lDQWdaV3d1WkdsemNHRjBZMmhGZG1WdWRDaGxLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JsYkM1bWFYSmxSWFpsYm5Rb0oyOXVKeUFySUhSNWNHVXNJR1VwTzF4dUlDQjlYRzRnSUdaMWJtTjBhVzl1SUcxaGEyVkRiR0Z6YzJsalJYWmxiblFnS0NrZ2UxeHVJQ0FnSUhaaGNpQmxPMXh1SUNBZ0lHbG1JQ2hrYjJNdVkzSmxZWFJsUlhabGJuUXBJSHRjYmlBZ0lDQWdJR1VnUFNCa2IyTXVZM0psWVhSbFJYWmxiblFvSjBWMlpXNTBKeWs3WEc0Z0lDQWdJQ0JsTG1sdWFYUkZkbVZ1ZENoMGVYQmxMQ0IwY25WbExDQjBjblZsS1R0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0dSdll5NWpjbVZoZEdWRmRtVnVkRTlpYW1WamRDa2dlMXh1SUNBZ0lDQWdaU0E5SUdSdll5NWpjbVZoZEdWRmRtVnVkRTlpYW1WamRDZ3BPMXh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnWlR0Y2JpQWdmVnh1SUNCbWRXNWpkR2x2YmlCdFlXdGxRM1Z6ZEc5dFJYWmxiblFnS0NrZ2UxeHVJQ0FnSUhKbGRIVnliaUJ1WlhjZ1kzVnpkRzl0UlhabGJuUW9kSGx3WlN3Z2V5QmtaWFJoYVd3NklHMXZaR1ZzSUgwcE8xeHVJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJSGR5WVhCd1pYSkdZV04wYjNKNUlDaGxiQ3dnZEhsd1pTd2dabTRwSUh0Y2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUlIZHlZWEJ3WlhJZ0tHOXlhV2RwYm1Gc1JYWmxiblFwSUh0Y2JpQWdJQ0IyWVhJZ1pTQTlJRzl5YVdkcGJtRnNSWFpsYm5RZ2ZId2daMnh2WW1Gc0xtVjJaVzUwTzF4dUlDQWdJR1V1ZEdGeVoyVjBJRDBnWlM1MFlYSm5aWFFnZkh3Z1pTNXpjbU5GYkdWdFpXNTBPMXh1SUNBZ0lHVXVjSEpsZG1WdWRFUmxabUYxYkhRZ1BTQmxMbkJ5WlhabGJuUkVaV1poZFd4MElIeDhJR1oxYm1OMGFXOXVJSEJ5WlhabGJuUkVaV1poZFd4MElDZ3BJSHNnWlM1eVpYUjFjbTVXWVd4MVpTQTlJR1poYkhObE95QjlPMXh1SUNBZ0lHVXVjM1J2Y0ZCeWIzQmhaMkYwYVc5dUlEMGdaUzV6ZEc5d1VISnZjR0ZuWVhScGIyNGdmSHdnWm5WdVkzUnBiMjRnYzNSdmNGQnliM0JoWjJGMGFXOXVJQ2dwSUhzZ1pTNWpZVzVqWld4Q2RXSmliR1VnUFNCMGNuVmxPeUI5TzF4dUlDQWdJR1V1ZDJocFkyZ2dQU0JsTG5kb2FXTm9JSHg4SUdVdWEyVjVRMjlrWlR0Y2JpQWdJQ0JtYmk1allXeHNLR1ZzTENCbEtUdGNiaUFnZlR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnZDNKaGNDQW9aV3dzSUhSNWNHVXNJR1p1S1NCN1hHNGdJSFpoY2lCM2NtRndjR1Z5SUQwZ2RXNTNjbUZ3S0dWc0xDQjBlWEJsTENCbWJpa2dmSHdnZDNKaGNIQmxja1poWTNSdmNua29aV3dzSUhSNWNHVXNJR1p1S1R0Y2JpQWdhR0Z5WkVOaFkyaGxMbkIxYzJnb2UxeHVJQ0FnSUhkeVlYQndaWEk2SUhkeVlYQndaWElzWEc0Z0lDQWdaV3hsYldWdWREb2daV3dzWEc0Z0lDQWdkSGx3WlRvZ2RIbHdaU3hjYmlBZ0lDQm1iam9nWm01Y2JpQWdmU2s3WEc0Z0lISmxkSFZ5YmlCM2NtRndjR1Z5TzF4dWZWeHVYRzVtZFc1amRHbHZiaUIxYm5keVlYQWdLR1ZzTENCMGVYQmxMQ0JtYmlrZ2UxeHVJQ0IyWVhJZ2FTQTlJR1pwYm1Rb1pXd3NJSFI1Y0dVc0lHWnVLVHRjYmlBZ2FXWWdLR2twSUh0Y2JpQWdJQ0IyWVhJZ2QzSmhjSEJsY2lBOUlHaGhjbVJEWVdOb1pWdHBYUzUzY21Gd2NHVnlPMXh1SUNBZ0lHaGhjbVJEWVdOb1pTNXpjR3hwWTJVb2FTd2dNU2s3SUM4dklHWnlaV1VnZFhBZ1lTQjBZV1FnYjJZZ2JXVnRiM0o1WEc0Z0lDQWdjbVYwZFhKdUlIZHlZWEJ3WlhJN1hHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdabWx1WkNBb1pXd3NJSFI1Y0dVc0lHWnVLU0I3WEc0Z0lIWmhjaUJwTENCcGRHVnRPMXh1SUNCbWIzSWdLR2tnUFNBd095QnBJRHdnYUdGeVpFTmhZMmhsTG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2FYUmxiU0E5SUdoaGNtUkRZV05vWlZ0cFhUdGNiaUFnSUNCcFppQW9hWFJsYlM1bGJHVnRaVzUwSUQwOVBTQmxiQ0FtSmlCcGRHVnRMblI1Y0dVZ1BUMDlJSFI1Y0dVZ0ppWWdhWFJsYlM1bWJpQTlQVDBnWm00cElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCcE8xeHVJQ0FnSUgxY2JpQWdmVnh1ZlZ4dUlsMTkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBldmVudG1hcCA9IFtdO1xudmFyIGV2ZW50bmFtZSA9ICcnO1xudmFyIHJvbiA9IC9eb24vO1xuXG5mb3IgKGV2ZW50bmFtZSBpbiBnbG9iYWwpIHtcbiAgaWYgKHJvbi50ZXN0KGV2ZW50bmFtZSkpIHtcbiAgICBldmVudG1hcC5wdXNoKGV2ZW50bmFtZS5zbGljZSgyKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBldmVudG1hcDtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWRYSmxZWFZqY21GamVTOXViMlJsWDIxdlpIVnNaWE12WTNKdmMzTjJaVzUwTDNOeVl5OWxkbVZ1ZEcxaGNDNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ1pYWmxiblJ0WVhBZ1BTQmJYVHRjYm5aaGNpQmxkbVZ1ZEc1aGJXVWdQU0FuSnp0Y2JuWmhjaUJ5YjI0Z1BTQXZYbTl1THp0Y2JseHVabTl5SUNobGRtVnVkRzVoYldVZ2FXNGdaMnh2WW1Gc0tTQjdYRzRnSUdsbUlDaHliMjR1ZEdWemRDaGxkbVZ1ZEc1aGJXVXBLU0I3WEc0Z0lDQWdaWFpsYm5SdFlYQXVjSFZ6YUNobGRtVnVkRzVoYldVdWMyeHBZMlVvTWlrcE8xeHVJQ0I5WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdaWFpsYm5SdFlYQTdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRpY2t5ID0gcmVxdWlyZSgndGlja3knKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWJvdW5jZSAoZm4sIGFyZ3MsIGN0eCkge1xuICBpZiAoIWZuKSB7IHJldHVybjsgfVxuICB0aWNreShmdW5jdGlvbiBydW4gKCkge1xuICAgIGZuLmFwcGx5KGN0eCB8fCBudWxsLCBhcmdzIHx8IFtdKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXRvYSA9IHJlcXVpcmUoJ2F0b2EnKTtcbnZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbWl0dGVyICh0aGluZywgb3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBldnQgPSB7fTtcbiAgaWYgKHRoaW5nID09PSB1bmRlZmluZWQpIHsgdGhpbmcgPSB7fTsgfVxuICB0aGluZy5vbiA9IGZ1bmN0aW9uICh0eXBlLCBmbikge1xuICAgIGlmICghZXZ0W3R5cGVdKSB7XG4gICAgICBldnRbdHlwZV0gPSBbZm5dO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnRbdHlwZV0ucHVzaChmbik7XG4gICAgfVxuICAgIHJldHVybiB0aGluZztcbiAgfTtcbiAgdGhpbmcub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBmbikge1xuICAgIGZuLl9vbmNlID0gdHJ1ZTsgLy8gdGhpbmcub2ZmKGZuKSBzdGlsbCB3b3JrcyFcbiAgICB0aGluZy5vbih0eXBlLCBmbik7XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9O1xuICB0aGluZy5vZmYgPSBmdW5jdGlvbiAodHlwZSwgZm4pIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGMgPT09IDEpIHtcbiAgICAgIGRlbGV0ZSBldnRbdHlwZV07XG4gICAgfSBlbHNlIGlmIChjID09PSAwKSB7XG4gICAgICBldnQgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGV0ID0gZXZ0W3R5cGVdO1xuICAgICAgaWYgKCFldCkgeyByZXR1cm4gdGhpbmc7IH1cbiAgICAgIGV0LnNwbGljZShldC5pbmRleE9mKGZuKSwgMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGluZztcbiAgfTtcbiAgdGhpbmcuZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IGF0b2EoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpbmcuZW1pdHRlclNuYXBzaG90KGFyZ3Muc2hpZnQoKSkuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG4gIHRoaW5nLmVtaXR0ZXJTbmFwc2hvdCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgdmFyIGV0ID0gKGV2dFt0eXBlXSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhcmdzID0gYXRvYShhcmd1bWVudHMpO1xuICAgICAgdmFyIGN0eCA9IHRoaXMgfHwgdGhpbmc7XG4gICAgICBpZiAodHlwZSA9PT0gJ2Vycm9yJyAmJiBvcHRzLnRocm93cyAhPT0gZmFsc2UgJiYgIWV0Lmxlbmd0aCkgeyB0aHJvdyBhcmdzLmxlbmd0aCA9PT0gMSA/IGFyZ3NbMF0gOiBhcmdzOyB9XG4gICAgICBldC5mb3JFYWNoKGZ1bmN0aW9uIGVtaXR0ZXIgKGxpc3Rlbikge1xuICAgICAgICBpZiAob3B0cy5hc3luYykgeyBkZWJvdW5jZShsaXN0ZW4sIGFyZ3MsIGN0eCk7IH0gZWxzZSB7IGxpc3Rlbi5hcHBseShjdHgsIGFyZ3MpOyB9XG4gICAgICAgIGlmIChsaXN0ZW4uX29uY2UpIHsgdGhpbmcub2ZmKHR5cGUsIGxpc3Rlbik7IH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaW5nO1xuICAgIH07XG4gIH07XG4gIHJldHVybiB0aGluZztcbn07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBjdXN0b21FdmVudCA9IHJlcXVpcmUoJ2N1c3RvbS1ldmVudCcpO1xudmFyIGV2ZW50bWFwID0gcmVxdWlyZSgnLi9ldmVudG1hcCcpO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGFkZEV2ZW50ID0gYWRkRXZlbnRFYXN5O1xudmFyIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRFYXN5O1xudmFyIGhhcmRDYWNoZSA9IFtdO1xuXG5pZiAoIWdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gIGFkZEV2ZW50ID0gYWRkRXZlbnRIYXJkO1xuICByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50SGFyZDtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCB3cmFwKGVsLCB0eXBlLCBmbikpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHVud3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gZmFicmljYXRlRXZlbnQgKGVsLCB0eXBlLCBtb2RlbCkge1xuICB2YXIgZSA9IGV2ZW50bWFwLmluZGV4T2YodHlwZSkgPT09IC0xID8gbWFrZUN1c3RvbUV2ZW50KCkgOiBtYWtlQ2xhc3NpY0V2ZW50KCk7XG4gIGlmIChlbC5kaXNwYXRjaEV2ZW50KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDbGFzc2ljRXZlbnQgKCkge1xuICAgIHZhciBlO1xuICAgIGlmIChkb2MuY3JlYXRlRXZlbnQpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGRvYy5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gZTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ3VzdG9tRXZlbnQgKCkge1xuICAgIHJldHVybiBuZXcgY3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWw6IG1vZGVsIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBwZXJGYWN0b3J5IChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IG9yaWdpbmFsRXZlbnQgfHwgZ2xvYmFsLmV2ZW50O1xuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGUucHJldmVudERlZmF1bHQgPSBlLnByZXZlbnREZWZhdWx0IHx8IGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0ICgpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZS5zdG9wUHJvcGFnYXRpb24gfHwgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBmbi5jYWxsKGVsLCBlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciB3cmFwcGVyID0gdW53cmFwKGVsLCB0eXBlLCBmbikgfHwgd3JhcHBlckZhY3RvcnkoZWwsIHR5cGUsIGZuKTtcbiAgaGFyZENhY2hlLnB1c2goe1xuICAgIHdyYXBwZXI6IHdyYXBwZXIsXG4gICAgZWxlbWVudDogZWwsXG4gICAgdHlwZTogdHlwZSxcbiAgICBmbjogZm5cbiAgfSk7XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiB1bndyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSA9IGZpbmQoZWwsIHR5cGUsIGZuKTtcbiAgaWYgKGkpIHtcbiAgICB2YXIgd3JhcHBlciA9IGhhcmRDYWNoZVtpXS53cmFwcGVyO1xuICAgIGhhcmRDYWNoZS5zcGxpY2UoaSwgMSk7IC8vIGZyZWUgdXAgYSB0YWQgb2YgbWVtb3J5XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpLCBpdGVtO1xuICBmb3IgKGkgPSAwOyBpIDwgaGFyZENhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgaXRlbSA9IGhhcmRDYWNoZVtpXTtcbiAgICBpZiAoaXRlbS5lbGVtZW50ID09PSBlbCAmJiBpdGVtLnR5cGUgPT09IHR5cGUgJiYgaXRlbS5mbiA9PT0gZm4pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRFdmVudCxcbiAgcmVtb3ZlOiByZW1vdmVFdmVudCxcbiAgZmFicmljYXRlOiBmYWJyaWNhdGVFdmVudFxufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5amNtOXpjM1psYm5RdmMzSmpMMk55YjNOemRtVnVkQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJqZFhOMGIyMUZkbVZ1ZENBOUlISmxjWFZwY21Vb0oyTjFjM1J2YlMxbGRtVnVkQ2NwTzF4dWRtRnlJR1YyWlc1MGJXRndJRDBnY21WeGRXbHlaU2duTGk5bGRtVnVkRzFoY0NjcE8xeHVkbUZ5SUdSdll5QTlJR1J2WTNWdFpXNTBPMXh1ZG1GeUlHRmtaRVYyWlc1MElEMGdZV1JrUlhabGJuUkZZWE41TzF4dWRtRnlJSEpsYlc5MlpVVjJaVzUwSUQwZ2NtVnRiM1psUlhabGJuUkZZWE41TzF4dWRtRnlJR2hoY21SRFlXTm9aU0E5SUZ0ZE8xeHVYRzVwWmlBb0lXZHNiMkpoYkM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S1NCN1hHNGdJR0ZrWkVWMlpXNTBJRDBnWVdSa1JYWmxiblJJWVhKa08xeHVJQ0J5WlcxdmRtVkZkbVZ1ZENBOUlISmxiVzkyWlVWMlpXNTBTR0Z5WkR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWVdSa1JYWmxiblJGWVhONUlDaGxiQ3dnZEhsd1pTd2dabTRzSUdOaGNIUjFjbWx1WnlrZ2UxeHVJQ0J5WlhSMWNtNGdaV3d1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWgwZVhCbExDQm1iaXdnWTJGd2RIVnlhVzVuS1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWVdSa1JYWmxiblJJWVhKa0lDaGxiQ3dnZEhsd1pTd2dabTRwSUh0Y2JpQWdjbVYwZFhKdUlHVnNMbUYwZEdGamFFVjJaVzUwS0NkdmJpY2dLeUIwZVhCbExDQjNjbUZ3S0dWc0xDQjBlWEJsTENCbWJpa3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaVzF2ZG1WRmRtVnVkRVZoYzNrZ0tHVnNMQ0IwZVhCbExDQm1iaXdnWTJGd2RIVnlhVzVuS1NCN1hHNGdJSEpsZEhWeWJpQmxiQzV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0hSNWNHVXNJR1p1TENCallYQjBkWEpwYm1jcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVpXMXZkbVZGZG1WdWRFaGhjbVFnS0dWc0xDQjBlWEJsTENCbWJpa2dlMXh1SUNCeVpYUjFjbTRnWld3dVpHVjBZV05vUlhabGJuUW9KMjl1SnlBcklIUjVjR1VzSUhWdWQzSmhjQ2hsYkN3Z2RIbHdaU3dnWm00cEtUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1ptRmljbWxqWVhSbFJYWmxiblFnS0dWc0xDQjBlWEJsTENCdGIyUmxiQ2tnZTF4dUlDQjJZWElnWlNBOUlHVjJaVzUwYldGd0xtbHVaR1Y0VDJZb2RIbHdaU2tnUFQwOUlDMHhJRDhnYldGclpVTjFjM1J2YlVWMlpXNTBLQ2tnT2lCdFlXdGxRMnhoYzNOcFkwVjJaVzUwS0NrN1hHNGdJR2xtSUNobGJDNWthWE53WVhSamFFVjJaVzUwS1NCN1hHNGdJQ0FnWld3dVpHbHpjR0YwWTJoRmRtVnVkQ2hsS1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCbGJDNW1hWEpsUlhabGJuUW9KMjl1SnlBcklIUjVjR1VzSUdVcE8xeHVJQ0I5WEc0Z0lHWjFibU4wYVc5dUlHMWhhMlZEYkdGemMybGpSWFpsYm5RZ0tDa2dlMXh1SUNBZ0lIWmhjaUJsTzF4dUlDQWdJR2xtSUNoa2IyTXVZM0psWVhSbFJYWmxiblFwSUh0Y2JpQWdJQ0FnSUdVZ1BTQmtiMk11WTNKbFlYUmxSWFpsYm5Rb0owVjJaVzUwSnlrN1hHNGdJQ0FnSUNCbExtbHVhWFJGZG1WdWRDaDBlWEJsTENCMGNuVmxMQ0IwY25WbEtUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHUnZZeTVqY21WaGRHVkZkbVZ1ZEU5aWFtVmpkQ2tnZTF4dUlDQWdJQ0FnWlNBOUlHUnZZeTVqY21WaGRHVkZkbVZ1ZEU5aWFtVmpkQ2dwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1pUdGNiaUFnZlZ4dUlDQm1kVzVqZEdsdmJpQnRZV3RsUTNWemRHOXRSWFpsYm5RZ0tDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCdVpYY2dZM1Z6ZEc5dFJYWmxiblFvZEhsd1pTd2dleUJrWlhSaGFXdzZJRzF2WkdWc0lIMHBPMXh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUhkeVlYQndaWEpHWVdOMGIzSjVJQ2hsYkN3Z2RIbHdaU3dnWm00cElIdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJSGR5WVhCd1pYSWdLRzl5YVdkcGJtRnNSWFpsYm5RcElIdGNiaUFnSUNCMllYSWdaU0E5SUc5eWFXZHBibUZzUlhabGJuUWdmSHdnWjJ4dlltRnNMbVYyWlc1ME8xeHVJQ0FnSUdVdWRHRnlaMlYwSUQwZ1pTNTBZWEpuWlhRZ2ZId2daUzV6Y21ORmJHVnRaVzUwTzF4dUlDQWdJR1V1Y0hKbGRtVnVkRVJsWm1GMWJIUWdQU0JsTG5CeVpYWmxiblJFWldaaGRXeDBJSHg4SUdaMWJtTjBhVzl1SUhCeVpYWmxiblJFWldaaGRXeDBJQ2dwSUhzZ1pTNXlaWFIxY201V1lXeDFaU0E5SUdaaGJITmxPeUI5TzF4dUlDQWdJR1V1YzNSdmNGQnliM0JoWjJGMGFXOXVJRDBnWlM1emRHOXdVSEp2Y0dGbllYUnBiMjRnZkh3Z1puVnVZM1JwYjI0Z2MzUnZjRkJ5YjNCaFoyRjBhVzl1SUNncElIc2daUzVqWVc1alpXeENkV0ppYkdVZ1BTQjBjblZsT3lCOU8xeHVJQ0FnSUdVdWQyaHBZMmdnUFNCbExuZG9hV05vSUh4OElHVXVhMlY1UTI5a1pUdGNiaUFnSUNCbWJpNWpZV3hzS0dWc0xDQmxLVHRjYmlBZ2ZUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2QzSmhjQ0FvWld3c0lIUjVjR1VzSUdadUtTQjdYRzRnSUhaaGNpQjNjbUZ3Y0dWeUlEMGdkVzUzY21Gd0tHVnNMQ0IwZVhCbExDQm1iaWtnZkh3Z2QzSmhjSEJsY2taaFkzUnZjbmtvWld3c0lIUjVjR1VzSUdadUtUdGNiaUFnYUdGeVpFTmhZMmhsTG5CMWMyZ29lMXh1SUNBZ0lIZHlZWEJ3WlhJNklIZHlZWEJ3WlhJc1hHNGdJQ0FnWld4bGJXVnVkRG9nWld3c1hHNGdJQ0FnZEhsd1pUb2dkSGx3WlN4Y2JpQWdJQ0JtYmpvZ1ptNWNiaUFnZlNrN1hHNGdJSEpsZEhWeWJpQjNjbUZ3Y0dWeU8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCMWJuZHlZWEFnS0dWc0xDQjBlWEJsTENCbWJpa2dlMXh1SUNCMllYSWdhU0E5SUdacGJtUW9aV3dzSUhSNWNHVXNJR1p1S1R0Y2JpQWdhV1lnS0drcElIdGNiaUFnSUNCMllYSWdkM0poY0hCbGNpQTlJR2hoY21SRFlXTm9aVnRwWFM1M2NtRndjR1Z5TzF4dUlDQWdJR2hoY21SRFlXTm9aUzV6Y0d4cFkyVW9hU3dnTVNrN0lDOHZJR1p5WldVZ2RYQWdZU0IwWVdRZ2IyWWdiV1Z0YjNKNVhHNGdJQ0FnY21WMGRYSnVJSGR5WVhCd1pYSTdYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWm1sdVpDQW9aV3dzSUhSNWNHVXNJR1p1S1NCN1hHNGdJSFpoY2lCcExDQnBkR1Z0TzF4dUlDQm1iM0lnS0drZ1BTQXdPeUJwSUR3Z2FHRnlaRU5oWTJobExteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdhWFJsYlNBOUlHaGhjbVJEWVdOb1pWdHBYVHRjYmlBZ0lDQnBaaUFvYVhSbGJTNWxiR1Z0Wlc1MElEMDlQU0JsYkNBbUppQnBkR1Z0TG5SNWNHVWdQVDA5SUhSNWNHVWdKaVlnYVhSbGJTNW1iaUE5UFQwZ1ptNHBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnBPMXh1SUNBZ0lIMWNiaUFnZlZ4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHRjYmlBZ1lXUmtPaUJoWkdSRmRtVnVkQ3hjYmlBZ2NtVnRiM1psT2lCeVpXMXZkbVZGZG1WdWRDeGNiaUFnWm1GaWNtbGpZWFJsT2lCbVlXSnlhV05oZEdWRmRtVnVkRnh1ZlR0Y2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXZlbnRtYXAgPSBbXTtcbnZhciBldmVudG5hbWUgPSAnJztcbnZhciByb24gPSAvXm9uLztcblxuZm9yIChldmVudG5hbWUgaW4gZ2xvYmFsKSB7XG4gIGlmIChyb24udGVzdChldmVudG5hbWUpKSB7XG4gICAgZXZlbnRtYXAucHVzaChldmVudG5hbWUuc2xpY2UoMikpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXZlbnRtYXA7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWpjbTl6YzNabGJuUXZjM0pqTDJWMlpXNTBiV0Z3TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJsZG1WdWRHMWhjQ0E5SUZ0ZE8xeHVkbUZ5SUdWMlpXNTBibUZ0WlNBOUlDY25PMXh1ZG1GeUlISnZiaUE5SUM5ZWIyNHZPMXh1WEc1bWIzSWdLR1YyWlc1MGJtRnRaU0JwYmlCbmJHOWlZV3dwSUh0Y2JpQWdhV1lnS0hKdmJpNTBaWE4wS0dWMlpXNTBibUZ0WlNrcElIdGNiaUFnSUNCbGRtVnVkRzFoY0M1d2RYTm9LR1YyWlc1MGJtRnRaUzV6YkdsalpTZ3lLU2s3WEc0Z0lIMWNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbGRtVnVkRzFoY0R0Y2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXG52YXIgTmF0aXZlQ3VzdG9tRXZlbnQgPSBnbG9iYWwuQ3VzdG9tRXZlbnQ7XG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZSAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHAgPSBuZXcgTmF0aXZlQ3VzdG9tRXZlbnQoJ2NhdCcsIHsgZGV0YWlsOiB7IGZvbzogJ2JhcicgfSB9KTtcbiAgICByZXR1cm4gICdjYXQnID09PSBwLnR5cGUgJiYgJ2JhcicgPT09IHAuZGV0YWlsLmZvbztcbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDcm9zcy1icm93c2VyIGBDdXN0b21FdmVudGAgY29uc3RydWN0b3IuXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50LkN1c3RvbUV2ZW50XG4gKlxuICogQHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdXNlTmF0aXZlKCkgPyBOYXRpdmVDdXN0b21FdmVudCA6XG5cbi8vIElFID49IDlcbidmdW5jdGlvbicgPT09IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFdmVudCA/IGZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gIH0gZWxzZSB7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlLCB2b2lkIDApO1xuICB9XG4gIHJldHVybiBlO1xufSA6XG5cbi8vIElFIDw9IDhcbmZ1bmN0aW9uIEN1c3RvbUV2ZW50ICh0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICBlLnR5cGUgPSB0eXBlO1xuICBpZiAocGFyYW1zKSB7XG4gICAgZS5idWJibGVzID0gQm9vbGVhbihwYXJhbXMuYnViYmxlcyk7XG4gICAgZS5jYW5jZWxhYmxlID0gQm9vbGVhbihwYXJhbXMuY2FuY2VsYWJsZSk7XG4gICAgZS5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICB9IGVsc2Uge1xuICAgIGUuYnViYmxlcyA9IGZhbHNlO1xuICAgIGUuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgIGUuZGV0YWlsID0gdm9pZCAwO1xuICB9XG4gIHJldHVybiBlO1xufVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlqZFhOMGIyMHRaWFpsYm5RdmFXNWtaWGd1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpjYm5aaGNpQk9ZWFJwZG1WRGRYTjBiMjFGZG1WdWRDQTlJR2RzYjJKaGJDNURkWE4wYjIxRmRtVnVkRHRjYmx4dVpuVnVZM1JwYjI0Z2RYTmxUbUYwYVhabElDZ3BJSHRjYmlBZ2RISjVJSHRjYmlBZ0lDQjJZWElnY0NBOUlHNWxkeUJPWVhScGRtVkRkWE4wYjIxRmRtVnVkQ2duWTJGMEp5d2dleUJrWlhSaGFXdzZJSHNnWm05dk9pQW5ZbUZ5SnlCOUlIMHBPMXh1SUNBZ0lISmxkSFZ5YmlBZ0oyTmhkQ2NnUFQwOUlIQXVkSGx3WlNBbUppQW5ZbUZ5SnlBOVBUMGdjQzVrWlhSaGFXd3VabTl2TzF4dUlDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1poYkhObE8xeHVmVnh1WEc0dktpcGNiaUFxSUVOeWIzTnpMV0p5YjNkelpYSWdZRU4xYzNSdmJVVjJaVzUwWUNCamIyNXpkSEoxWTNSdmNpNWNiaUFxWEc0Z0tpQm9kSFJ3Y3pvdkwyUmxkbVZzYjNCbGNpNXRiM3BwYkd4aExtOXlaeTlsYmkxVlV5OWtiMk56TDFkbFlpOUJVRWt2UTNWemRHOXRSWFpsYm5RdVEzVnpkRzl0UlhabGJuUmNiaUFxWEc0Z0tpQkFjSFZpYkdsalhHNGdLaTljYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCMWMyVk9ZWFJwZG1Vb0tTQS9JRTVoZEdsMlpVTjFjM1J2YlVWMlpXNTBJRHBjYmx4dUx5OGdTVVVnUGowZ09WeHVKMloxYm1OMGFXOXVKeUE5UFQwZ2RIbHdaVzltSUdSdlkzVnRaVzUwTG1OeVpXRjBaVVYyWlc1MElEOGdablZ1WTNScGIyNGdRM1Z6ZEc5dFJYWmxiblFnS0hSNWNHVXNJSEJoY21GdGN5a2dlMXh1SUNCMllYSWdaU0E5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVYyWlc1MEtDZERkWE4wYjIxRmRtVnVkQ2NwTzF4dUlDQnBaaUFvY0dGeVlXMXpLU0I3WEc0Z0lDQWdaUzVwYm1sMFEzVnpkRzl0UlhabGJuUW9kSGx3WlN3Z2NHRnlZVzF6TG1KMVltSnNaWE1zSUhCaGNtRnRjeTVqWVc1alpXeGhZbXhsTENCd1lYSmhiWE11WkdWMFlXbHNLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JsTG1sdWFYUkRkWE4wYjIxRmRtVnVkQ2gwZVhCbExDQm1ZV3h6WlN3Z1ptRnNjMlVzSUhadmFXUWdNQ2s3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1U3WEc1OUlEcGNibHh1THk4Z1NVVWdQRDBnT0Z4dVpuVnVZM1JwYjI0Z1EzVnpkRzl0UlhabGJuUWdLSFI1Y0dVc0lIQmhjbUZ0Y3lrZ2UxeHVJQ0IyWVhJZ1pTQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVjJaVzUwVDJKcVpXTjBLQ2s3WEc0Z0lHVXVkSGx3WlNBOUlIUjVjR1U3WEc0Z0lHbG1JQ2h3WVhKaGJYTXBJSHRjYmlBZ0lDQmxMbUoxWW1Kc1pYTWdQU0JDYjI5c1pXRnVLSEJoY21GdGN5NWlkV0ppYkdWektUdGNiaUFnSUNCbExtTmhibU5sYkdGaWJHVWdQU0JDYjI5c1pXRnVLSEJoY21GdGN5NWpZVzVqWld4aFlteGxLVHRjYmlBZ0lDQmxMbVJsZEdGcGJDQTlJSEJoY21GdGN5NWtaWFJoYVd3N1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ1pTNWlkV0ppYkdWeklEMGdabUZzYzJVN1hHNGdJQ0FnWlM1allXNWpaV3hoWW14bElEMGdabUZzYzJVN1hHNGdJQ0FnWlM1a1pYUmhhV3dnUFNCMmIybGtJREE3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1U3WEc1OVhHNGlYWDA9IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJ2lzLWNhbGxhYmxlJyk7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgZm9yRWFjaEFycmF5ID0gZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksIGkpKSB7XG4gICAgICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKGFycmF5W2ldLCBpLCBhcnJheSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIGFycmF5W2ldLCBpLCBhcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaFN0cmluZyA9IGZ1bmN0aW9uIGZvckVhY2hTdHJpbmcoc3RyaW5nLCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyaW5nLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIC8vIG5vIHN1Y2ggdGhpbmcgYXMgYSBzcGFyc2Ugc3RyaW5nLlxuICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgaXRlcmF0b3Ioc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIHN0cmluZy5jaGFyQXQoaSksIGksIHN0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaE9iamVjdCA9IGZ1bmN0aW9uIGZvckVhY2hPYmplY3Qob2JqZWN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBrIGluIG9iamVjdCkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGspKSB7XG4gICAgICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKG9iamVjdFtrXSwgaywgb2JqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChyZWNlaXZlciwgb2JqZWN0W2tdLCBrLCBvYmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGxpc3QsIGl0ZXJhdG9yLCB0aGlzQXJnKSB7XG4gICAgaWYgKCFpc0NhbGxhYmxlKGl0ZXJhdG9yKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpdGVyYXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICB2YXIgcmVjZWl2ZXI7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykge1xuICAgICAgICByZWNlaXZlciA9IHRoaXNBcmc7XG4gICAgfVxuXG4gICAgaWYgKHRvU3RyLmNhbGwobGlzdCkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgZm9yRWFjaEFycmF5KGxpc3QsIGl0ZXJhdG9yLCByZWNlaXZlcik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZm9yRWFjaFN0cmluZyhsaXN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvckVhY2hPYmplY3QobGlzdCwgaXRlcmF0b3IsIHJlY2VpdmVyKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2g7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgd2luO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIHdpbiA9IHNlbGY7XG59IGVsc2Uge1xuICAgIHdpbiA9IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5bmJHOWlZV3d2ZDJsdVpHOTNMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKMllYSWdkMmx1TzF4dVhHNXBaaUFvZEhsd1pXOW1JSGRwYm1SdmR5QWhQVDBnWENKMWJtUmxabWx1WldSY0lpa2dlMXh1SUNBZ0lIZHBiaUE5SUhkcGJtUnZkenRjYm4wZ1pXeHpaU0JwWmlBb2RIbHdaVzltSUdkc2IySmhiQ0FoUFQwZ1hDSjFibVJsWm1sdVpXUmNJaWtnZTF4dUlDQWdJSGRwYmlBOUlHZHNiMkpoYkR0Y2JuMGdaV3h6WlNCcFppQW9kSGx3Wlc5bUlITmxiR1lnSVQwOUlGd2lkVzVrWldacGJtVmtYQ0lwZTF4dUlDQWdJSGRwYmlBOUlITmxiR1k3WEc1OUlHVnNjMlVnZTF4dUlDQWdJSGRwYmlBOUlIdDlPMXh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIZHBianRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmblRvU3RyID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG52YXIgY29uc3RydWN0b3JSZWdleCA9IC9eXFxzKmNsYXNzXFxiLztcbnZhciBpc0VTNkNsYXNzRm4gPSBmdW5jdGlvbiBpc0VTNkNsYXNzRnVuY3Rpb24odmFsdWUpIHtcblx0dHJ5IHtcblx0XHR2YXIgZm5TdHIgPSBmblRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiBjb25zdHJ1Y3RvclJlZ2V4LnRlc3QoZm5TdHIpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlOyAvLyBub3QgYSBmdW5jdGlvblxuXHR9XG59O1xuXG52YXIgdHJ5RnVuY3Rpb25PYmplY3QgPSBmdW5jdGlvbiB0cnlGdW5jdGlvblRvU3RyKHZhbHVlKSB7XG5cdHRyeSB7XG5cdFx0aWYgKGlzRVM2Q2xhc3NGbih2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm5Ub1N0ci5jYWxsKHZhbHVlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZm5DbGFzcyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG52YXIgZ2VuQ2xhc3MgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbGxhYmxlKHZhbHVlKSB7XG5cdGlmICghdmFsdWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiAhdmFsdWUucHJvdG90eXBlKSB7IHJldHVybiB0cnVlOyB9XG5cdGlmIChoYXNUb1N0cmluZ1RhZykgeyByZXR1cm4gdHJ5RnVuY3Rpb25PYmplY3QodmFsdWUpOyB9XG5cdGlmIChpc0VTNkNsYXNzRm4odmFsdWUpKSB7IHJldHVybiBmYWxzZTsgfVxuXHR2YXIgc3RyQ2xhc3MgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0cmV0dXJuIHN0ckNsYXNzID09PSBmbkNsYXNzIHx8IHN0ckNsYXNzID09PSBnZW5DbGFzcztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb25cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uIChmbikge1xuICB2YXIgc3RyaW5nID0gdG9TdHJpbmcuY2FsbChmbilcbiAgcmV0dXJuIHN0cmluZyA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJyB8fFxuICAgICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgc3RyaW5nICE9PSAnW29iamVjdCBSZWdFeHBdJykgfHxcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgLy8gSUU4IGFuZCBiZWxvd1xuICAgICAoZm4gPT09IHdpbmRvdy5zZXRUaW1lb3V0IHx8XG4gICAgICBmbiA9PT0gd2luZG93LmFsZXJ0IHx8XG4gICAgICBmbiA9PT0gd2luZG93LmNvbmZpcm0gfHxcbiAgICAgIGZuID09PSB3aW5kb3cucHJvbXB0KSlcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzZWt0b3IgPSByZXF1aXJlKCdzZWt0b3InKTtcbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciByc3BhY2VzID0gL1xccysvZztcbnZhciBrZXltYXAgPSB7XG4gIDEzOiAnZW50ZXInLFxuICAyNzogJ2VzYycsXG4gIDMyOiAnc3BhY2UnXG59O1xudmFyIGhhbmRsZXJzID0ge307XG5cbmNyb3NzdmVudC5hZGQod2luZG93LCAna2V5ZG93bicsIGtleWRvd24pO1xuXG5mdW5jdGlvbiBjbGVhciAoY29udGV4dCkge1xuICBpZiAoY29udGV4dCkge1xuICAgIGlmIChjb250ZXh0IGluIGhhbmRsZXJzKSB7XG4gICAgICBoYW5kbGVyc1tjb250ZXh0XSA9IHt9O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBoYW5kbGVycyA9IHt9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHN3aXRjaGJvYXJkICh0aGVuLCBjb21ibywgb3B0aW9ucywgZm4pIHtcbiAgaWYgKGZuID09PSB2b2lkIDApIHtcbiAgICBmbiA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIGNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQgfHwgJ2RlZmF1bHRzJztcblxuICBpZiAoIWZuKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGhhbmRsZXJzW2NvbnRleHRdID09PSB2b2lkIDApIHtcbiAgICBoYW5kbGVyc1tjb250ZXh0XSA9IHt9O1xuICB9XG5cbiAgY29tYm8udG9Mb3dlckNhc2UoKS5zcGxpdChyc3BhY2VzKS5mb3JFYWNoKGl0ZW0pO1xuXG4gIGZ1bmN0aW9uIGl0ZW0gKGtleXMpIHtcbiAgICB2YXIgYyA9IGtleXMudHJpbSgpO1xuICAgIGlmIChjLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGVuKGhhbmRsZXJzW2NvbnRleHRdLCBjLCBvcHRpb25zLCBmbik7XG4gIH1cbn1cblxuZnVuY3Rpb24gb24gKGNvbWJvLCBvcHRpb25zLCBmbikge1xuICBzd2l0Y2hib2FyZChhZGQsIGNvbWJvLCBvcHRpb25zLCBmbik7XG5cbiAgZnVuY3Rpb24gYWRkIChhcmVhLCBrZXksIG9wdGlvbnMsIGZuKSB7XG4gICAgdmFyIGhhbmRsZXIgPSB7XG4gICAgICBoYW5kbGU6IGZuLFxuICAgICAgZmlsdGVyOiBvcHRpb25zLmZpbHRlclxuICAgIH07XG4gICAgaWYgKGFyZWFba2V5XSkge1xuICAgICAgYXJlYVtrZXldLnB1c2goaGFuZGxlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZWFba2V5XSA9IFtoYW5kbGVyXTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gb2ZmIChjb21ibywgb3B0aW9ucywgZm4pIHtcbiAgc3dpdGNoYm9hcmQocm0sIGNvbWJvLCBvcHRpb25zLCBmbik7XG5cbiAgZnVuY3Rpb24gcm0gKGFyZWEsIGtleSwgb3B0aW9ucywgZm4pIHtcbiAgICBpZiAoYXJlYVtrZXldKSB7XG4gICAgICBhcmVhW2tleV0gPSBhcmVhW2tleV0uZmlsdGVyKG1hdGNoaW5nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaGluZyAoaGFuZGxlcikge1xuICAgICAgcmV0dXJuIGhhbmRsZXIuaGFuZGxlID09PSBmbiAmJiBoYW5kbGVyLmZpbHRlciA9PT0gb3B0aW9ucy5maWx0ZXI7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEtleUNvZGUgKGUpIHtcbiAgcmV0dXJuIGUud2hpY2ggfHwgZS5rZXlDb2RlIHx8IGUuY2hhckNvZGU7XG59XG5cbmZ1bmN0aW9uIGtleWRvd24gKGUpIHtcbiAgdmFyIGNvZGUgPSBnZXRLZXlDb2RlKGUpO1xuICB2YXIga2V5ID0ga2V5bWFwW2NvZGVdIHx8IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmIChrZXkpIHtcbiAgICBoYW5kbGUoa2V5LCBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUtleUNvbWJvIChrZXksIGUpIHtcbiAgdmFyIGNvbWJvID0gW2tleV07XG4gIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgY29tYm8udW5zaGlmdCgnc2hpZnQnKTtcbiAgfVxuICBpZiAoZS5hbHRLZXkpIHtcbiAgICBjb21iby51bnNoaWZ0KCdhbHQnKTtcbiAgfVxuICBpZiAoZS5jdHJsS2V5IF4gZS5tZXRhS2V5KSB7XG4gICAgY29tYm8udW5zaGlmdCgnY21kJyk7XG4gIH1cbiAgcmV0dXJuIGNvbWJvLmpvaW4oJysnKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGUgKGtleSwgZSkge1xuICB2YXIgY29tYm8gPSBwYXJzZUtleUNvbWJvKGtleSwgZSk7XG4gIHZhciBjb250ZXh0O1xuICBmb3IgKGNvbnRleHQgaW4gaGFuZGxlcnMpIHtcbiAgICBpZiAoaGFuZGxlcnNbY29udGV4dF1bY29tYm9dKSB7XG4gICAgICBoYW5kbGVyc1tjb250ZXh0XVtjb21ib10uZm9yRWFjaChleGVjKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXJlZCAoaGFuZGxlcikge1xuICAgIHZhciBmaWx0ZXIgPSBoYW5kbGVyLmZpbHRlcjtcbiAgICBpZiAoIWZpbHRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBlbCA9IGUudGFyZ2V0O1xuICAgIHZhciBzZWxlY3RvciA9IHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnO1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIHNla3Rvci5tYXRjaGVzU2VsZWN0b3IoZWwsIGZpbHRlcikgPT09IGZhbHNlO1xuICAgIH1cbiAgICB3aGlsZSAoZWwucGFyZW50RWxlbWVudCAmJiBlbCAhPT0gZmlsdGVyKSB7XG4gICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBlbCAhPT0gZmlsdGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhlYyAoaGFuZGxlcikge1xuICAgIGlmIChmaWx0ZXJlZChoYW5kbGVyKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoYW5kbGVyLmhhbmRsZShlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb246IG9uLFxuICBvZmY6IG9mZixcbiAgY2xlYXI6IGNsZWFyLFxuICBoYW5kbGVyczogaGFuZGxlcnNcbn07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHViID0gcmVxdWlyZSgnLi9zdHViJyk7XG52YXIgdHJhY2tpbmcgPSByZXF1aXJlKCcuL3RyYWNraW5nJyk7XG52YXIgbHMgPSAnbG9jYWxTdG9yYWdlJyBpbiBnbG9iYWwgJiYgZ2xvYmFsLmxvY2FsU3RvcmFnZSA/IGdsb2JhbC5sb2NhbFN0b3JhZ2UgOiBzdHViO1xuXG5mdW5jdGlvbiBhY2Nlc3NvciAoa2V5LCB2YWx1ZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBnZXQoa2V5KTtcbiAgfVxuICByZXR1cm4gc2V0KGtleSwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXQgKGtleSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShscy5nZXRJdGVtKGtleSkpO1xufVxuXG5mdW5jdGlvbiBzZXQgKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBscy5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUgKGtleSkge1xuICByZXR1cm4gbHMucmVtb3ZlSXRlbShrZXkpO1xufVxuXG5mdW5jdGlvbiBjbGVhciAoKSB7XG4gIHJldHVybiBscy5jbGVhcigpO1xufVxuXG5hY2Nlc3Nvci5zZXQgPSBzZXQ7XG5hY2Nlc3Nvci5nZXQgPSBnZXQ7XG5hY2Nlc3Nvci5yZW1vdmUgPSByZW1vdmU7XG5hY2Nlc3Nvci5jbGVhciA9IGNsZWFyO1xuYWNjZXNzb3Iub24gPSB0cmFja2luZy5vbjtcbmFjY2Vzc29yLm9mZiA9IHRyYWNraW5nLm9mZjtcblxubW9kdWxlLmV4cG9ydHMgPSBhY2Nlc3NvcjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5c2IyTmhiQzF6ZEc5eVlXZGxMMnh2WTJGc0xYTjBiM0poWjJVdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCemRIVmlJRDBnY21WeGRXbHlaU2duTGk5emRIVmlKeWs3WEc1MllYSWdkSEpoWTJ0cGJtY2dQU0J5WlhGMWFYSmxLQ2N1TDNSeVlXTnJhVzVuSnlrN1hHNTJZWElnYkhNZ1BTQW5iRzlqWVd4VGRHOXlZV2RsSnlCcGJpQm5iRzlpWVd3Z0ppWWdaMnh2WW1Gc0xteHZZMkZzVTNSdmNtRm5aU0EvSUdkc2IySmhiQzVzYjJOaGJGTjBiM0poWjJVZ09pQnpkSFZpTzF4dVhHNW1kVzVqZEdsdmJpQmhZMk5sYzNOdmNpQW9hMlY1TENCMllXeDFaU2tnZTF4dUlDQnBaaUFvWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0E5UFQwZ01Ta2dlMXh1SUNBZ0lISmxkSFZ5YmlCblpYUW9hMlY1S1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnYzJWMEtHdGxlU3dnZG1Gc2RXVXBPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQm5aWFFnS0d0bGVTa2dlMXh1SUNCeVpYUjFjbTRnU2xOUFRpNXdZWEp6WlNoc2N5NW5aWFJKZEdWdEtHdGxlU2twTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ6WlhRZ0tHdGxlU3dnZG1Gc2RXVXBJSHRjYmlBZ2RISjVJSHRjYmlBZ0lDQnNjeTV6WlhSSmRHVnRLR3RsZVN3Z1NsTlBUaTV6ZEhKcGJtZHBabmtvZG1Gc2RXVXBLVHRjYmlBZ0lDQnlaWFIxY200Z2RISjFaVHRjYmlBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVpXMXZkbVVnS0d0bGVTa2dlMXh1SUNCeVpYUjFjbTRnYkhNdWNtVnRiM1psU1hSbGJTaHJaWGtwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJqYkdWaGNpQW9LU0I3WEc0Z0lISmxkSFZ5YmlCc2N5NWpiR1ZoY2lncE8xeHVmVnh1WEc1aFkyTmxjM052Y2k1elpYUWdQU0J6WlhRN1hHNWhZMk5sYzNOdmNpNW5aWFFnUFNCblpYUTdYRzVoWTJObGMzTnZjaTV5WlcxdmRtVWdQU0J5WlcxdmRtVTdYRzVoWTJObGMzTnZjaTVqYkdWaGNpQTlJR05zWldGeU8xeHVZV05qWlhOemIzSXViMjRnUFNCMGNtRmphMmx1Wnk1dmJqdGNibUZqWTJWemMyOXlMbTltWmlBOUlIUnlZV05yYVc1bkxtOW1aanRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCaFkyTmxjM052Y2p0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbXMgPSB7fTtcblxuZnVuY3Rpb24gZ2V0SXRlbSAoa2V5KSB7XG4gIHJldHVybiBrZXkgaW4gbXMgPyBtc1trZXldIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gc2V0SXRlbSAoa2V5LCB2YWx1ZSkge1xuICBtc1trZXldID0gdmFsdWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVJdGVtIChrZXkpIHtcbiAgdmFyIGZvdW5kID0ga2V5IGluIG1zO1xuICBpZiAoZm91bmQpIHtcbiAgICByZXR1cm4gZGVsZXRlIG1zW2tleV07XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBjbGVhciAoKSB7XG4gIG1zID0ge307XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0SXRlbTogZ2V0SXRlbSxcbiAgc2V0SXRlbTogc2V0SXRlbSxcbiAgcmVtb3ZlSXRlbTogcmVtb3ZlSXRlbSxcbiAgY2xlYXI6IGNsZWFyXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbGlzdGVuZXJzID0ge307XG52YXIgbGlzdGVuaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGxpc3RlbiAoKSB7XG4gIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgY2hhbmdlLCBmYWxzZSk7XG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmF0dGFjaEV2ZW50KSB7XG4gICAgZ2xvYmFsLmF0dGFjaEV2ZW50KCdvbnN0b3JhZ2UnLCBjaGFuZ2UpO1xuICB9IGVsc2Uge1xuICAgIGdsb2JhbC5vbnN0b3JhZ2UgPSBjaGFuZ2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlIChlKSB7XG4gIGlmICghZSkge1xuICAgIGUgPSBnbG9iYWwuZXZlbnQ7XG4gIH1cbiAgdmFyIGFsbCA9IGxpc3RlbmVyc1tlLmtleV07XG4gIGlmIChhbGwpIHtcbiAgICBhbGwuZm9yRWFjaChmaXJlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpcmUgKGxpc3RlbmVyKSB7XG4gICAgbGlzdGVuZXIoSlNPTi5wYXJzZShlLm5ld1ZhbHVlKSwgSlNPTi5wYXJzZShlLm9sZFZhbHVlKSwgZS51cmwgfHwgZS51cmkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uIChrZXksIGZuKSB7XG4gIGlmIChsaXN0ZW5lcnNba2V5XSkge1xuICAgIGxpc3RlbmVyc1trZXldLnB1c2goZm4pO1xuICB9IGVsc2Uge1xuICAgIGxpc3RlbmVyc1trZXldID0gW2ZuXTtcbiAgfVxuICBpZiAobGlzdGVuaW5nID09PSBmYWxzZSkge1xuICAgIGxpc3RlbigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9mZiAoa2V5LCBmbikge1xuICB2YXIgbnMgPSBsaXN0ZW5lcnNba2V5XTtcbiAgaWYgKG5zLmxlbmd0aCA+IDEpIHtcbiAgICBucy5zcGxpY2UobnMuaW5kZXhPZihmbiksIDEpO1xuICB9IGVsc2Uge1xuICAgIGxpc3RlbmVyc1trZXldID0gW107XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uOiBvbixcbiAgb2ZmOiBvZmZcbn07XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXNiMk5oYkMxemRHOXlZV2RsTDNSeVlXTnJhVzVuTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUd4cGMzUmxibVZ5Y3lBOUlIdDlPMXh1ZG1GeUlHeHBjM1JsYm1sdVp5QTlJR1poYkhObE8xeHVYRzVtZFc1amRHbHZiaUJzYVhOMFpXNGdLQ2tnZTF4dUlDQnBaaUFvWjJ4dlltRnNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSXBJSHRjYmlBZ0lDQm5iRzlpWVd3dVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmMzUnZjbUZuWlNjc0lHTm9ZVzVuWlN3Z1ptRnNjMlVwTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLR2RzYjJKaGJDNWhkSFJoWTJoRmRtVnVkQ2tnZTF4dUlDQWdJR2RzYjJKaGJDNWhkSFJoWTJoRmRtVnVkQ2duYjI1emRHOXlZV2RsSnl3Z1kyaGhibWRsS1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCbmJHOWlZV3d1YjI1emRHOXlZV2RsSUQwZ1kyaGhibWRsTzF4dUlDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlHTm9ZVzVuWlNBb1pTa2dlMXh1SUNCcFppQW9JV1VwSUh0Y2JpQWdJQ0JsSUQwZ1oyeHZZbUZzTG1WMlpXNTBPMXh1SUNCOVhHNGdJSFpoY2lCaGJHd2dQU0JzYVhOMFpXNWxjbk5iWlM1clpYbGRPMXh1SUNCcFppQW9ZV3hzS1NCN1hHNGdJQ0FnWVd4c0xtWnZja1ZoWTJnb1ptbHlaU2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCbWFYSmxJQ2hzYVhOMFpXNWxjaWtnZTF4dUlDQWdJR3hwYzNSbGJtVnlLRXBUVDA0dWNHRnljMlVvWlM1dVpYZFdZV3gxWlNrc0lFcFRUMDR1Y0dGeWMyVW9aUzV2YkdSV1lXeDFaU2tzSUdVdWRYSnNJSHg4SUdVdWRYSnBLVHRjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCdmJpQW9hMlY1TENCbWJpa2dlMXh1SUNCcFppQW9iR2x6ZEdWdVpYSnpXMnRsZVYwcElIdGNiaUFnSUNCc2FYTjBaVzVsY25OYmEyVjVYUzV3ZFhOb0tHWnVLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JzYVhOMFpXNWxjbk5iYTJWNVhTQTlJRnRtYmwwN1hHNGdJSDFjYmlBZ2FXWWdLR3hwYzNSbGJtbHVaeUE5UFQwZ1ptRnNjMlVwSUh0Y2JpQWdJQ0JzYVhOMFpXNG9LVHRjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCdlptWWdLR3RsZVN3Z1ptNHBJSHRjYmlBZ2RtRnlJRzV6SUQwZ2JHbHpkR1Z1WlhKelcydGxlVjA3WEc0Z0lHbG1JQ2h1Y3k1c1pXNW5kR2dnUGlBeEtTQjdYRzRnSUNBZ2JuTXVjM0JzYVdObEtHNXpMbWx1WkdWNFQyWW9abTRwTENBeEtUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnNhWE4wWlc1bGNuTmJhMlY1WFNBOUlGdGRPMXh1SUNCOVhHNTlYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnZTF4dUlDQnZiam9nYjI0c1hHNGdJRzltWmpvZ2IyWm1YRzU5TzF4dUlsMTkiLCJ2YXIgdHJpbSA9IHJlcXVpcmUoJ3RyaW0nKVxuICAsIGZvckVhY2ggPSByZXF1aXJlKCdmb3ItZWFjaCcpXG4gICwgaXNBcnJheSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaGVhZGVycykge1xuICBpZiAoIWhlYWRlcnMpXG4gICAgcmV0dXJuIHt9XG5cbiAgdmFyIHJlc3VsdCA9IHt9XG5cbiAgZm9yRWFjaChcbiAgICAgIHRyaW0oaGVhZGVycykuc3BsaXQoJ1xcbicpXG4gICAgLCBmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHZhciBpbmRleCA9IHJvdy5pbmRleE9mKCc6JylcbiAgICAgICAgICAsIGtleSA9IHRyaW0ocm93LnNsaWNlKDAsIGluZGV4KSkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICwgdmFsdWUgPSB0cmltKHJvdy5zbGljZShpbmRleCArIDEpKVxuXG4gICAgICAgIGlmICh0eXBlb2YocmVzdWx0W2tleV0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWVcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHJlc3VsdFtrZXldKSkge1xuICAgICAgICAgIHJlc3VsdFtrZXldLnB1c2godmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSBbIHJlc3VsdFtrZXldLCB2YWx1ZSBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgKVxuXG4gIHJldHVybiByZXN1bHRcbn0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHBhbmRvID0gJ3Nla3Rvci0nICsgRGF0ZS5ub3coKTtcbnZhciByc2libGluZ3MgPSAvWyt+XS87XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgZGVsID0gKGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgfHwge307XG52YXIgbWF0Y2ggPSAoXG4gIGRlbC5tYXRjaGVzIHx8XG4gIGRlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgZGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICBkZWwub01hdGNoZXNTZWxlY3RvciB8fFxuICBkZWwubXNNYXRjaGVzU2VsZWN0b3IgfHxcbiAgbmV2ZXJcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gc2VrdG9yO1xuXG5zZWt0b3IubWF0Y2hlcyA9IG1hdGNoZXM7XG5zZWt0b3IubWF0Y2hlc1NlbGVjdG9yID0gbWF0Y2hlc1NlbGVjdG9yO1xuXG5mdW5jdGlvbiBxc2EgKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gIHZhciBleGlzdGVkLCBpZCwgcHJlZml4LCBwcmVmaXhlZCwgYWRhcHRlciwgaGFjayA9IGNvbnRleHQgIT09IGRvY3VtZW50O1xuICBpZiAoaGFjaykgeyAvLyBpZCBoYWNrIGZvciBjb250ZXh0LXJvb3RlZCBxdWVyaWVzXG4gICAgZXhpc3RlZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIGlkID0gZXhpc3RlZCB8fCBleHBhbmRvO1xuICAgIHByZWZpeCA9ICcjJyArIGlkICsgJyAnO1xuICAgIHByZWZpeGVkID0gcHJlZml4ICsgc2VsZWN0b3IucmVwbGFjZSgvLC9nLCAnLCcgKyBwcmVmaXgpO1xuICAgIGFkYXB0ZXIgPSByc2libGluZ3MudGVzdChzZWxlY3RvcikgJiYgY29udGV4dC5wYXJlbnROb2RlO1xuICAgIGlmICghZXhpc3RlZCkgeyBjb250ZXh0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7IH1cbiAgfVxuICB0cnkge1xuICAgIHJldHVybiAoYWRhcHRlciB8fCBjb250ZXh0KS5xdWVyeVNlbGVjdG9yQWxsKHByZWZpeGVkIHx8IHNlbGVjdG9yKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBbXTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoZXhpc3RlZCA9PT0gbnVsbCkgeyBjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTsgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNla3RvciAoc2VsZWN0b3IsIGN0eCwgY29sbGVjdGlvbiwgc2VlZCkge1xuICB2YXIgZWxlbWVudDtcbiAgdmFyIGNvbnRleHQgPSBjdHggfHwgZG9jdW1lbnQ7XG4gIHZhciByZXN1bHRzID0gY29sbGVjdGlvbiB8fCBbXTtcbiAgdmFyIGkgPSAwO1xuICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG4gIGlmIChjb250ZXh0Lm5vZGVUeXBlICE9PSAxICYmIGNvbnRleHQubm9kZVR5cGUgIT09IDkpIHtcbiAgICByZXR1cm4gW107IC8vIGJhaWwgaWYgY29udGV4dCBpcyBub3QgYW4gZWxlbWVudCBvciBkb2N1bWVudFxuICB9XG4gIGlmIChzZWVkKSB7XG4gICAgd2hpbGUgKChlbGVtZW50ID0gc2VlZFtpKytdKSkge1xuICAgICAgaWYgKG1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvcikpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXN1bHRzLnB1c2guYXBwbHkocmVzdWx0cywgcXNhKHNlbGVjdG9yLCBjb250ZXh0KSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKHNlbGVjdG9yLCBlbGVtZW50cykge1xuICByZXR1cm4gc2VrdG9yKHNlbGVjdG9yLCBudWxsLCBudWxsLCBlbGVtZW50cyk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvciAoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIG1hdGNoLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBuZXZlciAoKSB7IHJldHVybiBmYWxzZTsgfVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTl6Wld0MGIzSXZjM0pqTDNObGEzUnZjaTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJsZUhCaGJtUnZJRDBnSjNObGEzUnZjaTBuSUNzZ1JHRjBaUzV1YjNjb0tUdGNiblpoY2lCeWMybGliR2x1WjNNZ1BTQXZXeXQrWFM4N1hHNTJZWElnWkc5amRXMWxiblFnUFNCbmJHOWlZV3d1Wkc5amRXMWxiblE3WEc1MllYSWdaR1ZzSUQwZ0tHUnZZM1Z0Wlc1MElDWW1JR1J2WTNWdFpXNTBMbVJ2WTNWdFpXNTBSV3hsYldWdWRDa2dmSHdnZTMwN1hHNTJZWElnYldGMFkyZ2dQU0FvWEc0Z0lHUmxiQzV0WVhSamFHVnpJSHg4WEc0Z0lHUmxiQzUzWldKcmFYUk5ZWFJqYUdWelUyVnNaV04wYjNJZ2ZIeGNiaUFnWkdWc0xtMXZlazFoZEdOb1pYTlRaV3hsWTNSdmNpQjhmRnh1SUNCa1pXd3ViMDFoZEdOb1pYTlRaV3hsWTNSdmNpQjhmRnh1SUNCa1pXd3ViWE5OWVhSamFHVnpVMlZzWldOMGIzSWdmSHhjYmlBZ2JtVjJaWEpjYmlrN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjMlZyZEc5eU8xeHVYRzV6Wld0MGIzSXViV0YwWTJobGN5QTlJRzFoZEdOb1pYTTdYRzV6Wld0MGIzSXViV0YwWTJobGMxTmxiR1ZqZEc5eUlEMGdiV0YwWTJobGMxTmxiR1ZqZEc5eU8xeHVYRzVtZFc1amRHbHZiaUJ4YzJFZ0tITmxiR1ZqZEc5eUxDQmpiMjUwWlhoMEtTQjdYRzRnSUhaaGNpQmxlR2x6ZEdWa0xDQnBaQ3dnY0hKbFptbDRMQ0J3Y21WbWFYaGxaQ3dnWVdSaGNIUmxjaXdnYUdGamF5QTlJR052Ym5SbGVIUWdJVDA5SUdSdlkzVnRaVzUwTzF4dUlDQnBaaUFvYUdGamF5a2dleUF2THlCcFpDQm9ZV05ySUdadmNpQmpiMjUwWlhoMExYSnZiM1JsWkNCeGRXVnlhV1Z6WEc0Z0lDQWdaWGhwYzNSbFpDQTlJR052Ym5SbGVIUXVaMlYwUVhSMGNtbGlkWFJsS0NkcFpDY3BPMXh1SUNBZ0lHbGtJRDBnWlhocGMzUmxaQ0I4ZkNCbGVIQmhibVJ2TzF4dUlDQWdJSEJ5WldacGVDQTlJQ2NqSnlBcklHbGtJQ3NnSnlBbk8xeHVJQ0FnSUhCeVpXWnBlR1ZrSUQwZ2NISmxabWw0SUNzZ2MyVnNaV04wYjNJdWNtVndiR0ZqWlNndkxDOW5MQ0FuTENjZ0t5QndjbVZtYVhncE8xeHVJQ0FnSUdGa1lYQjBaWElnUFNCeWMybGliR2x1WjNNdWRHVnpkQ2h6Wld4bFkzUnZjaWtnSmlZZ1kyOXVkR1Y0ZEM1d1lYSmxiblJPYjJSbE8xeHVJQ0FnSUdsbUlDZ2haWGhwYzNSbFpDa2dleUJqYjI1MFpYaDBMbk5sZEVGMGRISnBZblYwWlNnbmFXUW5MQ0JwWkNrN0lIMWNiaUFnZlZ4dUlDQjBjbmtnZTF4dUlDQWdJSEpsZEhWeWJpQW9ZV1JoY0hSbGNpQjhmQ0JqYjI1MFpYaDBLUzV4ZFdWeWVWTmxiR1ZqZEc5eVFXeHNLSEJ5WldacGVHVmtJSHg4SUhObGJHVmpkRzl5S1R0Y2JpQWdmU0JqWVhSamFDQW9aU2tnZTF4dUlDQWdJSEpsZEhWeWJpQmJYVHRjYmlBZ2ZTQm1hVzVoYkd4NUlIdGNiaUFnSUNCcFppQW9aWGhwYzNSbFpDQTlQVDBnYm5Wc2JDa2dleUJqYjI1MFpYaDBMbkpsYlc5MlpVRjBkSEpwWW5WMFpTZ25hV1FuS1RzZ2ZWeHVJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJSE5sYTNSdmNpQW9jMlZzWldOMGIzSXNJR04wZUN3Z1kyOXNiR1ZqZEdsdmJpd2djMlZsWkNrZ2UxeHVJQ0IyWVhJZ1pXeGxiV1Z1ZER0Y2JpQWdkbUZ5SUdOdmJuUmxlSFFnUFNCamRIZ2dmSHdnWkc5amRXMWxiblE3WEc0Z0lIWmhjaUJ5WlhOMWJIUnpJRDBnWTI5c2JHVmpkR2x2YmlCOGZDQmJYVHRjYmlBZ2RtRnlJR2tnUFNBd08xeHVJQ0JwWmlBb2RIbHdaVzltSUhObGJHVmpkRzl5SUNFOVBTQW5jM1J5YVc1bkp5a2dlMXh1SUNBZ0lISmxkSFZ5YmlCeVpYTjFiSFJ6TzF4dUlDQjlYRzRnSUdsbUlDaGpiMjUwWlhoMExtNXZaR1ZVZVhCbElDRTlQU0F4SUNZbUlHTnZiblJsZUhRdWJtOWtaVlI1Y0dVZ0lUMDlJRGtwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdXMTA3SUM4dklHSmhhV3dnYVdZZ1kyOXVkR1Y0ZENCcGN5QnViM1FnWVc0Z1pXeGxiV1Z1ZENCdmNpQmtiMk4xYldWdWRGeHVJQ0I5WEc0Z0lHbG1JQ2h6WldWa0tTQjdYRzRnSUNBZ2QyaHBiR1VnS0NobGJHVnRaVzUwSUQwZ2MyVmxaRnRwS3l0ZEtTa2dlMXh1SUNBZ0lDQWdhV1lnS0cxaGRHTm9aWE5UWld4bFkzUnZjaWhsYkdWdFpXNTBMQ0J6Wld4bFkzUnZjaWtwSUh0Y2JpQWdJQ0FnSUNBZ2NtVnpkV3gwY3k1d2RYTm9LR1ZzWlcxbGJuUXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnlaWE4xYkhSekxuQjFjMmd1WVhCd2JIa29jbVZ6ZFd4MGN5d2djWE5oS0hObGJHVmpkRzl5TENCamIyNTBaWGgwS1NrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkSE03WEc1OVhHNWNibVoxYm1OMGFXOXVJRzFoZEdOb1pYTWdLSE5sYkdWamRHOXlMQ0JsYkdWdFpXNTBjeWtnZTF4dUlDQnlaWFIxY200Z2MyVnJkRzl5S0hObGJHVmpkRzl5TENCdWRXeHNMQ0J1ZFd4c0xDQmxiR1Z0Wlc1MGN5azdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHMWhkR05vWlhOVFpXeGxZM1J2Y2lBb1pXeGxiV1Z1ZEN3Z2MyVnNaV04wYjNJcElIdGNiaUFnY21WMGRYSnVJRzFoZEdOb0xtTmhiR3dvWld4bGJXVnVkQ3dnYzJWc1pXTjBiM0lwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ1WlhabGNpQW9LU0I3SUhKbGRIVnliaUJtWVd4elpUc2dmVnh1SWwxOSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGdldFNlbGVjdGlvbjtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgZ2V0U2VsZWN0aW9uUmF3ID0gcmVxdWlyZSgnLi9nZXRTZWxlY3Rpb25SYXcnKTtcbnZhciBnZXRTZWxlY3Rpb25OdWxsT3AgPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvbk51bGxPcCcpO1xudmFyIGdldFNlbGVjdGlvblN5bnRoZXRpYyA9IHJlcXVpcmUoJy4vZ2V0U2VsZWN0aW9uU3ludGhldGljJyk7XG52YXIgaXNIb3N0ID0gcmVxdWlyZSgnLi9pc0hvc3QnKTtcbmlmIChpc0hvc3QubWV0aG9kKGdsb2JhbCwgJ2dldFNlbGVjdGlvbicpKSB7XG4gIGdldFNlbGVjdGlvbiA9IGdldFNlbGVjdGlvblJhdztcbn0gZWxzZSBpZiAodHlwZW9mIGRvYy5zZWxlY3Rpb24gPT09ICdvYmplY3QnICYmIGRvYy5zZWxlY3Rpb24pIHtcbiAgZ2V0U2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uU3ludGhldGljO1xufSBlbHNlIHtcbiAgZ2V0U2VsZWN0aW9uID0gZ2V0U2VsZWN0aW9uTnVsbE9wO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvbjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5elpXeGxZMk5wYjI0dmMzSmpMMmRsZEZObGJHVmpkR2x2Ymk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCblpYUlRaV3hsWTNScGIyNDdYRzUyWVhJZ1pHOWpJRDBnWjJ4dlltRnNMbVJ2WTNWdFpXNTBPMXh1ZG1GeUlHZGxkRk5sYkdWamRHbHZibEpoZHlBOUlISmxjWFZwY21Vb0p5NHZaMlYwVTJWc1pXTjBhVzl1VW1GM0p5azdYRzUyWVhJZ1oyVjBVMlZzWldOMGFXOXVUblZzYkU5d0lEMGdjbVZ4ZFdseVpTZ25MaTluWlhSVFpXeGxZM1JwYjI1T2RXeHNUM0FuS1R0Y2JuWmhjaUJuWlhSVFpXeGxZM1JwYjI1VGVXNTBhR1YwYVdNZ1BTQnlaWEYxYVhKbEtDY3VMMmRsZEZObGJHVmpkR2x2YmxONWJuUm9aWFJwWXljcE8xeHVkbUZ5SUdselNHOXpkQ0E5SUhKbGNYVnBjbVVvSnk0dmFYTkliM04wSnlrN1hHNXBaaUFvYVhOSWIzTjBMbTFsZEdodlpDaG5iRzlpWVd3c0lDZG5aWFJUWld4bFkzUnBiMjRuS1NrZ2UxeHVJQ0JuWlhSVFpXeGxZM1JwYjI0Z1BTQm5aWFJUWld4bFkzUnBiMjVTWVhjN1hHNTlJR1ZzYzJVZ2FXWWdLSFI1Y0dWdlppQmtiMk11YzJWc1pXTjBhVzl1SUQwOVBTQW5iMkpxWldOMEp5QW1KaUJrYjJNdWMyVnNaV04wYVc5dUtTQjdYRzRnSUdkbGRGTmxiR1ZqZEdsdmJpQTlJR2RsZEZObGJHVmpkR2x2YmxONWJuUm9aWFJwWXp0Y2JuMGdaV3h6WlNCN1hHNGdJR2RsZEZObGJHVmpkR2x2YmlBOUlHZGxkRk5sYkdWamRHbHZiazUxYkd4UGNEdGNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCblpYUlRaV3hsWTNScGIyNDdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb25OdWxsT3AgKCkge1xuICByZXR1cm4ge1xuICAgIHJlbW92ZUFsbFJhbmdlczogbm9vcCxcbiAgICBhZGRSYW5nZTogbm9vcFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNlbGVjdGlvbk51bGxPcDtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uUmF3ICgpIHtcbiAgcmV0dXJuIGdsb2JhbC5nZXRTZWxlY3Rpb24oKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb25SYXc7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDJkbGRGTmxiR1ZqZEdsdmJsSmhkeTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzVtZFc1amRHbHZiaUJuWlhSVFpXeGxZM1JwYjI1U1lYY2dLQ2tnZTF4dUlDQnlaWFIxY200Z1oyeHZZbUZzTG1kbGRGTmxiR1ZqZEdsdmJpZ3BPMXh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHZGxkRk5sYkdWamRHbHZibEpoZHp0Y2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmFuZ2VUb1RleHRSYW5nZSA9IHJlcXVpcmUoJy4vcmFuZ2VUb1RleHRSYW5nZScpO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBib2R5ID0gZG9jLmJvZHk7XG52YXIgR2V0U2VsZWN0aW9uUHJvdG8gPSBHZXRTZWxlY3Rpb24ucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBHZXRTZWxlY3Rpb24gKHNlbGVjdGlvbikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciByYW5nZSA9IHNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuXG4gIHRoaXMuX3NlbGVjdGlvbiA9IHNlbGVjdGlvbjtcbiAgdGhpcy5fcmFuZ2VzID0gW107XG5cbiAgaWYgKHNlbGVjdGlvbi50eXBlID09PSAnQ29udHJvbCcpIHtcbiAgICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHNlbGYpO1xuICB9IGVsc2UgaWYgKGlzVGV4dFJhbmdlKHJhbmdlKSkge1xuICAgIHVwZGF0ZUZyb21UZXh0UmFuZ2Uoc2VsZiwgcmFuZ2UpO1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZUVtcHR5U2VsZWN0aW9uKHNlbGYpO1xuICB9XG59XG5cbkdldFNlbGVjdGlvblByb3RvLnJlbW92ZUFsbFJhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRSYW5nZTtcbiAgdHJ5IHtcbiAgICB0aGlzLl9zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uLnR5cGUgIT09ICdOb25lJykge1xuICAgICAgdGV4dFJhbmdlID0gYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgIHRleHRSYW5nZS5zZWxlY3QoKTtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbi5lbXB0eSgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHVwZGF0ZUVtcHR5U2VsZWN0aW9uKHRoaXMpO1xufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uYWRkUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgaWYgKHRoaXMuX3NlbGVjdGlvbi50eXBlID09PSAnQ29udHJvbCcpIHtcbiAgICBhZGRSYW5nZVRvQ29udHJvbFNlbGVjdGlvbih0aGlzLCByYW5nZSk7XG4gIH0gZWxzZSB7XG4gICAgcmFuZ2VUb1RleHRSYW5nZShyYW5nZSkuc2VsZWN0KCk7XG4gICAgdGhpcy5fcmFuZ2VzWzBdID0gcmFuZ2U7XG4gICAgdGhpcy5yYW5nZUNvdW50ID0gMTtcbiAgICB0aGlzLmlzQ29sbGFwc2VkID0gdGhpcy5fcmFuZ2VzWzBdLmNvbGxhcHNlZDtcbiAgICB1cGRhdGVBbmNob3JBbmRGb2N1c0Zyb21SYW5nZSh0aGlzLCByYW5nZSwgZmFsc2UpO1xuICB9XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5zZXRSYW5nZXMgPSBmdW5jdGlvbiAocmFuZ2VzKSB7XG4gIHRoaXMucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHZhciByYW5nZUNvdW50ID0gcmFuZ2VzLmxlbmd0aDtcbiAgaWYgKHJhbmdlQ291bnQgPiAxKSB7XG4gICAgY3JlYXRlQ29udHJvbFNlbGVjdGlvbih0aGlzLCByYW5nZXMpO1xuICB9IGVsc2UgaWYgKHJhbmdlQ291bnQpIHtcbiAgICB0aGlzLmFkZFJhbmdlKHJhbmdlc1swXSk7XG4gIH1cbn07XG5cbkdldFNlbGVjdGlvblByb3RvLmdldFJhbmdlQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLnJhbmdlQ291bnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFJhbmdlQXQoKTogaW5kZXggb3V0IG9mIGJvdW5kcycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZXNbaW5kZXhdLmNsb25lUmFuZ2UoKTtcbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8ucmVtb3ZlUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgaWYgKHRoaXMuX3NlbGVjdGlvbi50eXBlICE9PSAnQ29udHJvbCcpIHtcbiAgICByZW1vdmVSYW5nZU1hbnVhbGx5KHRoaXMsIHJhbmdlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGNvbnRyb2xSYW5nZSA9IHRoaXMuX3NlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICB2YXIgcmFuZ2VFbGVtZW50ID0gZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZShyYW5nZSk7XG4gIHZhciBuZXdDb250cm9sUmFuZ2UgPSBib2R5LmNyZWF0ZUNvbnRyb2xSYW5nZSgpO1xuICB2YXIgZWw7XG4gIHZhciByZW1vdmVkID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjb250cm9sUmFuZ2UubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBlbCA9IGNvbnRyb2xSYW5nZS5pdGVtKGkpO1xuICAgIGlmIChlbCAhPT0gcmFuZ2VFbGVtZW50IHx8IHJlbW92ZWQpIHtcbiAgICAgIG5ld0NvbnRyb2xSYW5nZS5hZGQoY29udHJvbFJhbmdlLml0ZW0oaSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgbmV3Q29udHJvbFJhbmdlLnNlbGVjdCgpO1xuICB1cGRhdGVDb250cm9sU2VsZWN0aW9uKHRoaXMpO1xufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uZWFjaFJhbmdlID0gZnVuY3Rpb24gKGZuLCByZXR1cm5WYWx1ZSkge1xuICB2YXIgaSA9IDA7XG4gIHZhciBsZW4gPSB0aGlzLl9yYW5nZXMubGVuZ3RoO1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoZm4odGhpcy5nZXRSYW5nZUF0KGkpKSkge1xuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuR2V0U2VsZWN0aW9uUHJvdG8uZ2V0QWxsUmFuZ2VzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcmFuZ2VzID0gW107XG4gIHRoaXMuZWFjaFJhbmdlKGZ1bmN0aW9uIChyYW5nZSkge1xuICAgIHJhbmdlcy5wdXNoKHJhbmdlKTtcbiAgfSk7XG4gIHJldHVybiByYW5nZXM7XG59O1xuXG5HZXRTZWxlY3Rpb25Qcm90by5zZXRTaW5nbGVSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICB0aGlzLnJlbW92ZUFsbFJhbmdlcygpO1xuICB0aGlzLmFkZFJhbmdlKHJhbmdlKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xTZWxlY3Rpb24gKHNlbCwgcmFuZ2VzKSB7XG4gIHZhciBjb250cm9sUmFuZ2UgPSBib2R5LmNyZWF0ZUNvbnRyb2xSYW5nZSgpO1xuICBmb3IgKHZhciBpID0gMCwgZWwsIGxlbiA9IHJhbmdlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGVsID0gZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZShyYW5nZXNbaV0pO1xuICAgIHRyeSB7XG4gICAgICBjb250cm9sUmFuZ2UuYWRkKGVsKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFJhbmdlcygpOiBFbGVtZW50IGNvdWxkIG5vdCBiZSBhZGRlZCB0byBjb250cm9sIHNlbGVjdGlvbicpO1xuICAgIH1cbiAgfVxuICBjb250cm9sUmFuZ2Uuc2VsZWN0KCk7XG4gIHVwZGF0ZUNvbnRyb2xTZWxlY3Rpb24oc2VsKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlUmFuZ2VNYW51YWxseSAoc2VsLCByYW5nZSkge1xuICB2YXIgcmFuZ2VzID0gc2VsLmdldEFsbFJhbmdlcygpO1xuICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSByYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoIWlzU2FtZVJhbmdlKHJhbmdlLCByYW5nZXNbaV0pKSB7XG4gICAgICBzZWwuYWRkUmFuZ2UocmFuZ2VzW2ldKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFzZWwucmFuZ2VDb3VudCkge1xuICAgIHVwZGF0ZUVtcHR5U2VsZWN0aW9uKHNlbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2UgKHNlbCwgcmFuZ2UpIHtcbiAgdmFyIGFuY2hvclByZWZpeCA9ICdzdGFydCc7XG4gIHZhciBmb2N1c1ByZWZpeCA9ICdlbmQnO1xuICBzZWwuYW5jaG9yTm9kZSA9IHJhbmdlW2FuY2hvclByZWZpeCArICdDb250YWluZXInXTtcbiAgc2VsLmFuY2hvck9mZnNldCA9IHJhbmdlW2FuY2hvclByZWZpeCArICdPZmZzZXQnXTtcbiAgc2VsLmZvY3VzTm9kZSA9IHJhbmdlW2ZvY3VzUHJlZml4ICsgJ0NvbnRhaW5lciddO1xuICBzZWwuZm9jdXNPZmZzZXQgPSByYW5nZVtmb2N1c1ByZWZpeCArICdPZmZzZXQnXTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRW1wdHlTZWxlY3Rpb24gKHNlbCkge1xuICBzZWwuYW5jaG9yTm9kZSA9IHNlbC5mb2N1c05vZGUgPSBudWxsO1xuICBzZWwuYW5jaG9yT2Zmc2V0ID0gc2VsLmZvY3VzT2Zmc2V0ID0gMDtcbiAgc2VsLnJhbmdlQ291bnQgPSAwO1xuICBzZWwuaXNDb2xsYXBzZWQgPSB0cnVlO1xuICBzZWwuX3Jhbmdlcy5sZW5ndGggPSAwO1xufVxuXG5mdW5jdGlvbiByYW5nZUNvbnRhaW5zU2luZ2xlRWxlbWVudCAocmFuZ2VOb2Rlcykge1xuICBpZiAoIXJhbmdlTm9kZXMubGVuZ3RoIHx8IHJhbmdlTm9kZXNbMF0ubm9kZVR5cGUgIT09IDEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IHJhbmdlTm9kZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoIWlzQW5jZXN0b3JPZihyYW5nZU5vZGVzWzBdLCByYW5nZU5vZGVzW2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2luZ2xlRWxlbWVudEZyb21SYW5nZSAocmFuZ2UpIHtcbiAgdmFyIG5vZGVzID0gcmFuZ2UuZ2V0Tm9kZXMoKTtcbiAgaWYgKCFyYW5nZUNvbnRhaW5zU2luZ2xlRWxlbWVudChub2RlcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UoKTogcmFuZ2UgZGlkIG5vdCBjb25zaXN0IG9mIGEgc2luZ2xlIGVsZW1lbnQnKTtcbiAgfVxuICByZXR1cm4gbm9kZXNbMF07XG59XG5cbmZ1bmN0aW9uIGlzVGV4dFJhbmdlIChyYW5nZSkge1xuICByZXR1cm4gcmFuZ2UgJiYgcmFuZ2UudGV4dCAhPT0gdm9pZCAwO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVGcm9tVGV4dFJhbmdlIChzZWwsIHJhbmdlKSB7XG4gIHNlbC5fcmFuZ2VzID0gW3JhbmdlXTtcbiAgdXBkYXRlQW5jaG9yQW5kRm9jdXNGcm9tUmFuZ2Uoc2VsLCByYW5nZSwgZmFsc2UpO1xuICBzZWwucmFuZ2VDb3VudCA9IDE7XG4gIHNlbC5pc0NvbGxhcHNlZCA9IHJhbmdlLmNvbGxhcHNlZDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29udHJvbFNlbGVjdGlvbiAoc2VsKSB7XG4gIHNlbC5fcmFuZ2VzLmxlbmd0aCA9IDA7XG4gIGlmIChzZWwuX3NlbGVjdGlvbi50eXBlID09PSAnTm9uZScpIHtcbiAgICB1cGRhdGVFbXB0eVNlbGVjdGlvbihzZWwpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjb250cm9sUmFuZ2UgPSBzZWwuX3NlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICAgIGlmIChpc1RleHRSYW5nZShjb250cm9sUmFuZ2UpKSB7XG4gICAgICB1cGRhdGVGcm9tVGV4dFJhbmdlKHNlbCwgY29udHJvbFJhbmdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsLnJhbmdlQ291bnQgPSBjb250cm9sUmFuZ2UubGVuZ3RoO1xuICAgICAgdmFyIHJhbmdlO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWwucmFuZ2VDb3VudDsgKytpKSB7XG4gICAgICAgIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGUoY29udHJvbFJhbmdlLml0ZW0oaSkpO1xuICAgICAgICBzZWwuX3Jhbmdlcy5wdXNoKHJhbmdlKTtcbiAgICAgIH1cbiAgICAgIHNlbC5pc0NvbGxhcHNlZCA9IHNlbC5yYW5nZUNvdW50ID09PSAxICYmIHNlbC5fcmFuZ2VzWzBdLmNvbGxhcHNlZDtcbiAgICAgIHVwZGF0ZUFuY2hvckFuZEZvY3VzRnJvbVJhbmdlKHNlbCwgc2VsLl9yYW5nZXNbc2VsLnJhbmdlQ291bnQgLSAxXSwgZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRSYW5nZVRvQ29udHJvbFNlbGVjdGlvbiAoc2VsLCByYW5nZSkge1xuICB2YXIgY29udHJvbFJhbmdlID0gc2VsLl9zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHJhbmdlRWxlbWVudCA9IGdldFNpbmdsZUVsZW1lbnRGcm9tUmFuZ2UocmFuZ2UpO1xuICB2YXIgbmV3Q29udHJvbFJhbmdlID0gYm9keS5jcmVhdGVDb250cm9sUmFuZ2UoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvbnRyb2xSYW5nZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIG5ld0NvbnRyb2xSYW5nZS5hZGQoY29udHJvbFJhbmdlLml0ZW0oaSkpO1xuICB9XG4gIHRyeSB7XG4gICAgbmV3Q29udHJvbFJhbmdlLmFkZChyYW5nZUVsZW1lbnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhZGRSYW5nZSgpOiBFbGVtZW50IGNvdWxkIG5vdCBiZSBhZGRlZCB0byBjb250cm9sIHNlbGVjdGlvbicpO1xuICB9XG4gIG5ld0NvbnRyb2xSYW5nZS5zZWxlY3QoKTtcbiAgdXBkYXRlQ29udHJvbFNlbGVjdGlvbihzZWwpO1xufVxuXG5mdW5jdGlvbiBpc1NhbWVSYW5nZSAobGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIChcbiAgICBsZWZ0LnN0YXJ0Q29udGFpbmVyID09PSByaWdodC5zdGFydENvbnRhaW5lciAmJlxuICAgIGxlZnQuc3RhcnRPZmZzZXQgPT09IHJpZ2h0LnN0YXJ0T2Zmc2V0ICYmXG4gICAgbGVmdC5lbmRDb250YWluZXIgPT09IHJpZ2h0LmVuZENvbnRhaW5lciAmJlxuICAgIGxlZnQuZW5kT2Zmc2V0ID09PSByaWdodC5lbmRPZmZzZXRcbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNBbmNlc3Rvck9mIChhbmNlc3RvciwgZGVzY2VuZGFudCkge1xuICB2YXIgbm9kZSA9IGRlc2NlbmRhbnQ7XG4gIHdoaWxlIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlID09PSBhbmNlc3Rvcikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IEdldFNlbGVjdGlvbihnbG9iYWwuZG9jdW1lbnQuc2VsZWN0aW9uKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTZWxlY3Rpb247XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDJkbGRGTmxiR1ZqZEdsdmJsTjViblJvWlhScFl5NXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnY21GdVoyVlViMVJsZUhSU1lXNW5aU0E5SUhKbGNYVnBjbVVvSnk0dmNtRnVaMlZVYjFSbGVIUlNZVzVuWlNjcE8xeHVkbUZ5SUdSdll5QTlJR2RzYjJKaGJDNWtiMk4xYldWdWREdGNiblpoY2lCaWIyUjVJRDBnWkc5akxtSnZaSGs3WEc1MllYSWdSMlYwVTJWc1pXTjBhVzl1VUhKdmRHOGdQU0JIWlhSVFpXeGxZM1JwYjI0dWNISnZkRzkwZVhCbE8xeHVYRzVtZFc1amRHbHZiaUJIWlhSVFpXeGxZM1JwYjI0Z0tITmxiR1ZqZEdsdmJpa2dlMXh1SUNCMllYSWdjMlZzWmlBOUlIUm9hWE03WEc0Z0lIWmhjaUJ5WVc1blpTQTlJSE5sYkdWamRHbHZiaTVqY21WaGRHVlNZVzVuWlNncE8xeHVYRzRnSUhSb2FYTXVYM05sYkdWamRHbHZiaUE5SUhObGJHVmpkR2x2Ymp0Y2JpQWdkR2hwY3k1ZmNtRnVaMlZ6SUQwZ1cxMDdYRzVjYmlBZ2FXWWdLSE5sYkdWamRHbHZiaTUwZVhCbElEMDlQU0FuUTI5dWRISnZiQ2NwSUh0Y2JpQWdJQ0IxY0dSaGRHVkRiMjUwY205c1UyVnNaV04wYVc5dUtITmxiR1lwTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLR2x6VkdWNGRGSmhibWRsS0hKaGJtZGxLU2tnZTF4dUlDQWdJSFZ3WkdGMFpVWnliMjFVWlhoMFVtRnVaMlVvYzJWc1ppd2djbUZ1WjJVcE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lIVndaR0YwWlVWdGNIUjVVMlZzWldOMGFXOXVLSE5sYkdZcE8xeHVJQ0I5WEc1OVhHNWNia2RsZEZObGJHVmpkR2x2YmxCeWIzUnZMbkpsYlc5MlpVRnNiRkpoYm1kbGN5QTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdkbUZ5SUhSbGVIUlNZVzVuWlR0Y2JpQWdkSEo1SUh0Y2JpQWdJQ0IwYUdsekxsOXpaV3hsWTNScGIyNHVaVzF3ZEhrb0tUdGNiaUFnSUNCcFppQW9kR2hwY3k1ZmMyVnNaV04wYVc5dUxuUjVjR1VnSVQwOUlDZE9iMjVsSnlrZ2UxeHVJQ0FnSUNBZ2RHVjRkRkpoYm1kbElEMGdZbTlrZVM1amNtVmhkR1ZVWlhoMFVtRnVaMlVvS1R0Y2JpQWdJQ0FnSUhSbGVIUlNZVzVuWlM1elpXeGxZM1FvS1R0Y2JpQWdJQ0FnSUhSb2FYTXVYM05sYkdWamRHbHZiaTVsYlhCMGVTZ3BPMXh1SUNBZ0lIMWNiaUFnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0I5WEc0Z0lIVndaR0YwWlVWdGNIUjVVMlZzWldOMGFXOXVLSFJvYVhNcE8xeHVmVHRjYmx4dVIyVjBVMlZzWldOMGFXOXVVSEp2ZEc4dVlXUmtVbUZ1WjJVZ1BTQm1kVzVqZEdsdmJpQW9jbUZ1WjJVcElIdGNiaUFnYVdZZ0tIUm9hWE11WDNObGJHVmpkR2x2Ymk1MGVYQmxJRDA5UFNBblEyOXVkSEp2YkNjcElIdGNiaUFnSUNCaFpHUlNZVzVuWlZSdlEyOXVkSEp2YkZObGJHVmpkR2x2YmloMGFHbHpMQ0J5WVc1blpTazdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdjbUZ1WjJWVWIxUmxlSFJTWVc1blpTaHlZVzVuWlNrdWMyVnNaV04wS0NrN1hHNGdJQ0FnZEdocGN5NWZjbUZ1WjJWeld6QmRJRDBnY21GdVoyVTdYRzRnSUNBZ2RHaHBjeTV5WVc1blpVTnZkVzUwSUQwZ01UdGNiaUFnSUNCMGFHbHpMbWx6UTI5c2JHRndjMlZrSUQwZ2RHaHBjeTVmY21GdVoyVnpXekJkTG1OdmJHeGhjSE5sWkR0Y2JpQWdJQ0IxY0dSaGRHVkJibU5vYjNKQmJtUkdiMk4xYzBaeWIyMVNZVzVuWlNoMGFHbHpMQ0J5WVc1blpTd2dabUZzYzJVcE8xeHVJQ0I5WEc1OU8xeHVYRzVIWlhSVFpXeGxZM1JwYjI1UWNtOTBieTV6WlhSU1lXNW5aWE1nUFNCbWRXNWpkR2x2YmlBb2NtRnVaMlZ6S1NCN1hHNGdJSFJvYVhNdWNtVnRiM1psUVd4c1VtRnVaMlZ6S0NrN1hHNGdJSFpoY2lCeVlXNW5aVU52ZFc1MElEMGdjbUZ1WjJWekxteGxibWQwYUR0Y2JpQWdhV1lnS0hKaGJtZGxRMjkxYm5RZ1BpQXhLU0I3WEc0Z0lDQWdZM0psWVhSbFEyOXVkSEp2YkZObGJHVmpkR2x2YmloMGFHbHpMQ0J5WVc1blpYTXBPMXh1SUNCOUlHVnNjMlVnYVdZZ0tISmhibWRsUTI5MWJuUXBJSHRjYmlBZ0lDQjBhR2x6TG1Ga1pGSmhibWRsS0hKaGJtZGxjMXN3WFNrN1hHNGdJSDFjYm4wN1hHNWNia2RsZEZObGJHVmpkR2x2YmxCeWIzUnZMbWRsZEZKaGJtZGxRWFFnUFNCbWRXNWpkR2x2YmlBb2FXNWtaWGdwSUh0Y2JpQWdhV1lnS0dsdVpHVjRJRHdnTUNCOGZDQnBibVJsZUNBK1BTQjBhR2x6TG5KaGJtZGxRMjkxYm5RcElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjJkbGRGSmhibWRsUVhRb0tUb2dhVzVrWlhnZ2IzVjBJRzltSUdKdmRXNWtjeWNwTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhKbGRIVnliaUIwYUdsekxsOXlZVzVuWlhOYmFXNWtaWGhkTG1Oc2IyNWxVbUZ1WjJVb0tUdGNiaUFnZlZ4dWZUdGNibHh1UjJWMFUyVnNaV04wYVc5dVVISnZkRzh1Y21WdGIzWmxVbUZ1WjJVZ1BTQm1kVzVqZEdsdmJpQW9jbUZ1WjJVcElIdGNiaUFnYVdZZ0tIUm9hWE11WDNObGJHVmpkR2x2Ymk1MGVYQmxJQ0U5UFNBblEyOXVkSEp2YkNjcElIdGNiaUFnSUNCeVpXMXZkbVZTWVc1blpVMWhiblZoYkd4NUtIUm9hWE1zSUhKaGJtZGxLVHRjYmlBZ0lDQnlaWFIxY200N1hHNGdJSDFjYmlBZ2RtRnlJR052Ym5SeWIyeFNZVzVuWlNBOUlIUm9hWE11WDNObGJHVmpkR2x2Ymk1amNtVmhkR1ZTWVc1blpTZ3BPMXh1SUNCMllYSWdjbUZ1WjJWRmJHVnRaVzUwSUQwZ1oyVjBVMmx1WjJ4bFJXeGxiV1Z1ZEVaeWIyMVNZVzVuWlNoeVlXNW5aU2s3WEc0Z0lIWmhjaUJ1WlhkRGIyNTBjbTlzVW1GdVoyVWdQU0JpYjJSNUxtTnlaV0YwWlVOdmJuUnliMnhTWVc1blpTZ3BPMXh1SUNCMllYSWdaV3c3WEc0Z0lIWmhjaUJ5WlcxdmRtVmtJRDBnWm1Gc2MyVTdYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdMQ0JzWlc0Z1BTQmpiMjUwY205c1VtRnVaMlV1YkdWdVozUm9PeUJwSUR3Z2JHVnVPeUFySzJrcElIdGNiaUFnSUNCbGJDQTlJR052Ym5SeWIyeFNZVzVuWlM1cGRHVnRLR2twTzF4dUlDQWdJR2xtSUNobGJDQWhQVDBnY21GdVoyVkZiR1Z0Wlc1MElIeDhJSEpsYlc5MlpXUXBJSHRjYmlBZ0lDQWdJRzVsZDBOdmJuUnliMnhTWVc1blpTNWhaR1FvWTI5dWRISnZiRkpoYm1kbExtbDBaVzBvYVNrcE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0J5WlcxdmRtVmtJRDBnZEhKMVpUdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2JtVjNRMjl1ZEhKdmJGSmhibWRsTG5ObGJHVmpkQ2dwTzF4dUlDQjFjR1JoZEdWRGIyNTBjbTlzVTJWc1pXTjBhVzl1S0hSb2FYTXBPMXh1ZlR0Y2JseHVSMlYwVTJWc1pXTjBhVzl1VUhKdmRHOHVaV0ZqYUZKaGJtZGxJRDBnWm5WdVkzUnBiMjRnS0dadUxDQnlaWFIxY201V1lXeDFaU2tnZTF4dUlDQjJZWElnYVNBOUlEQTdYRzRnSUhaaGNpQnNaVzRnUFNCMGFHbHpMbDl5WVc1blpYTXViR1Z1WjNSb08xeHVJQ0JtYjNJZ0tHa2dQU0F3T3lCcElEd2diR1Z1T3lBcksya3BJSHRjYmlBZ0lDQnBaaUFvWm00b2RHaHBjeTVuWlhSU1lXNW5aVUYwS0drcEtTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlISmxkSFZ5YmxaaGJIVmxPMXh1SUNBZ0lIMWNiaUFnZlZ4dWZUdGNibHh1UjJWMFUyVnNaV04wYVc5dVVISnZkRzh1WjJWMFFXeHNVbUZ1WjJWeklEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQjJZWElnY21GdVoyVnpJRDBnVzEwN1hHNGdJSFJvYVhNdVpXRmphRkpoYm1kbEtHWjFibU4wYVc5dUlDaHlZVzVuWlNrZ2UxeHVJQ0FnSUhKaGJtZGxjeTV3ZFhOb0tISmhibWRsS1R0Y2JpQWdmU2s3WEc0Z0lISmxkSFZ5YmlCeVlXNW5aWE03WEc1OU8xeHVYRzVIWlhSVFpXeGxZM1JwYjI1UWNtOTBieTV6WlhSVGFXNW5iR1ZTWVc1blpTQTlJR1oxYm1OMGFXOXVJQ2h5WVc1blpTa2dlMXh1SUNCMGFHbHpMbkpsYlc5MlpVRnNiRkpoYm1kbGN5Z3BPMXh1SUNCMGFHbHpMbUZrWkZKaGJtZGxLSEpoYm1kbEtUdGNibjA3WEc1Y2JtWjFibU4wYVc5dUlHTnlaV0YwWlVOdmJuUnliMnhUWld4bFkzUnBiMjRnS0hObGJDd2djbUZ1WjJWektTQjdYRzRnSUhaaGNpQmpiMjUwY205c1VtRnVaMlVnUFNCaWIyUjVMbU55WldGMFpVTnZiblJ5YjJ4U1lXNW5aU2dwTzF4dUlDQm1iM0lnS0haaGNpQnBJRDBnTUN3Z1pXd3NJR3hsYmlBOUlISmhibWRsY3k1c1pXNW5kR2c3SUdrZ1BDQnNaVzQ3SUNzcmFTa2dlMXh1SUNBZ0lHVnNJRDBnWjJWMFUybHVaMnhsUld4bGJXVnVkRVp5YjIxU1lXNW5aU2h5WVc1blpYTmJhVjBwTzF4dUlDQWdJSFJ5ZVNCN1hHNGdJQ0FnSUNCamIyNTBjbTlzVW1GdVoyVXVZV1JrS0dWc0tUdGNiaUFnSUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0ozTmxkRkpoYm1kbGN5Z3BPaUJGYkdWdFpXNTBJR052ZFd4a0lHNXZkQ0JpWlNCaFpHUmxaQ0IwYnlCamIyNTBjbTlzSUhObGJHVmpkR2x2YmljcE8xeHVJQ0FnSUgxY2JpQWdmVnh1SUNCamIyNTBjbTlzVW1GdVoyVXVjMlZzWldOMEtDazdYRzRnSUhWd1pHRjBaVU52Ym5SeWIyeFRaV3hsWTNScGIyNG9jMlZzS1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnY21WdGIzWmxVbUZ1WjJWTllXNTFZV3hzZVNBb2MyVnNMQ0J5WVc1blpTa2dlMXh1SUNCMllYSWdjbUZ1WjJWeklEMGdjMlZzTG1kbGRFRnNiRkpoYm1kbGN5Z3BPMXh1SUNCelpXd3VjbVZ0YjNabFFXeHNVbUZ1WjJWektDazdYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdMQ0JzWlc0Z1BTQnlZVzVuWlhNdWJHVnVaM1JvT3lCcElEd2diR1Z1T3lBcksya3BJSHRjYmlBZ0lDQnBaaUFvSVdselUyRnRaVkpoYm1kbEtISmhibWRsTENCeVlXNW5aWE5iYVYwcEtTQjdYRzRnSUNBZ0lDQnpaV3d1WVdSa1VtRnVaMlVvY21GdVoyVnpXMmxkS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNiaUFnYVdZZ0tDRnpaV3d1Y21GdVoyVkRiM1Z1ZENrZ2UxeHVJQ0FnSUhWd1pHRjBaVVZ0Y0hSNVUyVnNaV04wYVc5dUtITmxiQ2s3WEc0Z0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z2RYQmtZWFJsUVc1amFHOXlRVzVrUm05amRYTkdjbTl0VW1GdVoyVWdLSE5sYkN3Z2NtRnVaMlVwSUh0Y2JpQWdkbUZ5SUdGdVkyaHZjbEJ5WldacGVDQTlJQ2R6ZEdGeWRDYzdYRzRnSUhaaGNpQm1iMk4xYzFCeVpXWnBlQ0E5SUNkbGJtUW5PMXh1SUNCelpXd3VZVzVqYUc5eVRtOWtaU0E5SUhKaGJtZGxXMkZ1WTJodmNsQnlaV1pwZUNBcklDZERiMjUwWVdsdVpYSW5YVHRjYmlBZ2MyVnNMbUZ1WTJodmNrOW1abk5sZENBOUlISmhibWRsVzJGdVkyaHZjbEJ5WldacGVDQXJJQ2RQWm1aelpYUW5YVHRjYmlBZ2MyVnNMbVp2WTNWelRtOWtaU0E5SUhKaGJtZGxXMlp2WTNWelVISmxabWw0SUNzZ0owTnZiblJoYVc1bGNpZGRPMXh1SUNCelpXd3VabTlqZFhOUFptWnpaWFFnUFNCeVlXNW5aVnRtYjJOMWMxQnlaV1pwZUNBcklDZFBabVp6WlhRblhUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2RYQmtZWFJsUlcxd2RIbFRaV3hsWTNScGIyNGdLSE5sYkNrZ2UxeHVJQ0J6Wld3dVlXNWphRzl5VG05a1pTQTlJSE5sYkM1bWIyTjFjMDV2WkdVZ1BTQnVkV3hzTzF4dUlDQnpaV3d1WVc1amFHOXlUMlptYzJWMElEMGdjMlZzTG1adlkzVnpUMlptYzJWMElEMGdNRHRjYmlBZ2MyVnNMbkpoYm1kbFEyOTFiblFnUFNBd08xeHVJQ0J6Wld3dWFYTkRiMnhzWVhCelpXUWdQU0IwY25WbE8xeHVJQ0J6Wld3dVgzSmhibWRsY3k1c1pXNW5kR2dnUFNBd08xeHVmVnh1WEc1bWRXNWpkR2x2YmlCeVlXNW5aVU52Ym5SaGFXNXpVMmx1WjJ4bFJXeGxiV1Z1ZENBb2NtRnVaMlZPYjJSbGN5a2dlMXh1SUNCcFppQW9JWEpoYm1kbFRtOWtaWE11YkdWdVozUm9JSHg4SUhKaGJtZGxUbTlrWlhOYk1GMHVibTlrWlZSNWNHVWdJVDA5SURFcElIdGNiaUFnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUgxY2JpQWdabTl5SUNoMllYSWdhU0E5SURFc0lHeGxiaUE5SUhKaGJtZGxUbTlrWlhNdWJHVnVaM1JvT3lCcElEd2diR1Z1T3lBcksya3BJSHRjYmlBZ0lDQnBaaUFvSVdselFXNWpaWE4wYjNKUFppaHlZVzVuWlU1dlpHVnpXekJkTENCeVlXNW5aVTV2WkdWelcybGRLU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0FnSUgxY2JpQWdmVnh1SUNCeVpYUjFjbTRnZEhKMVpUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1oyVjBVMmx1WjJ4bFJXeGxiV1Z1ZEVaeWIyMVNZVzVuWlNBb2NtRnVaMlVwSUh0Y2JpQWdkbUZ5SUc1dlpHVnpJRDBnY21GdVoyVXVaMlYwVG05a1pYTW9LVHRjYmlBZ2FXWWdLQ0Z5WVc1blpVTnZiblJoYVc1elUybHVaMnhsUld4bGJXVnVkQ2h1YjJSbGN5a3BJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oyZGxkRk5wYm1kc1pVVnNaVzFsYm5SR2NtOXRVbUZ1WjJVb0tUb2djbUZ1WjJVZ1pHbGtJRzV2ZENCamIyNXphWE4wSUc5bUlHRWdjMmx1WjJ4bElHVnNaVzFsYm5RbktUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2JtOWtaWE5iTUYwN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdselZHVjRkRkpoYm1kbElDaHlZVzVuWlNrZ2UxeHVJQ0J5WlhSMWNtNGdjbUZ1WjJVZ0ppWWdjbUZ1WjJVdWRHVjRkQ0FoUFQwZ2RtOXBaQ0F3TzF4dWZWeHVYRzVtZFc1amRHbHZiaUIxY0dSaGRHVkdjbTl0VkdWNGRGSmhibWRsSUNoelpXd3NJSEpoYm1kbEtTQjdYRzRnSUhObGJDNWZjbUZ1WjJWeklEMGdXM0poYm1kbFhUdGNiaUFnZFhCa1lYUmxRVzVqYUc5eVFXNWtSbTlqZFhOR2NtOXRVbUZ1WjJVb2MyVnNMQ0J5WVc1blpTd2dabUZzYzJVcE8xeHVJQ0J6Wld3dWNtRnVaMlZEYjNWdWRDQTlJREU3WEc0Z0lITmxiQzVwYzBOdmJHeGhjSE5sWkNBOUlISmhibWRsTG1OdmJHeGhjSE5sWkR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnZFhCa1lYUmxRMjl1ZEhKdmJGTmxiR1ZqZEdsdmJpQW9jMlZzS1NCN1hHNGdJSE5sYkM1ZmNtRnVaMlZ6TG14bGJtZDBhQ0E5SURBN1hHNGdJR2xtSUNoelpXd3VYM05sYkdWamRHbHZiaTUwZVhCbElEMDlQU0FuVG05dVpTY3BJSHRjYmlBZ0lDQjFjR1JoZEdWRmJYQjBlVk5sYkdWamRHbHZiaWh6Wld3cE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lIWmhjaUJqYjI1MGNtOXNVbUZ1WjJVZ1BTQnpaV3d1WDNObGJHVmpkR2x2Ymk1amNtVmhkR1ZTWVc1blpTZ3BPMXh1SUNBZ0lHbG1JQ2hwYzFSbGVIUlNZVzVuWlNoamIyNTBjbTlzVW1GdVoyVXBLU0I3WEc0Z0lDQWdJQ0IxY0dSaGRHVkdjbTl0VkdWNGRGSmhibWRsS0hObGJDd2dZMjl1ZEhKdmJGSmhibWRsS1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdjMlZzTG5KaGJtZGxRMjkxYm5RZ1BTQmpiMjUwY205c1VtRnVaMlV1YkdWdVozUm9PMXh1SUNBZ0lDQWdkbUZ5SUhKaGJtZGxPMXh1SUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0J6Wld3dWNtRnVaMlZEYjNWdWREc2dLeXRwS1NCN1hHNGdJQ0FnSUNBZ0lISmhibWRsSUQwZ1pHOWpMbU55WldGMFpWSmhibWRsS0NrN1hHNGdJQ0FnSUNBZ0lISmhibWRsTG5ObGJHVmpkRTV2WkdVb1kyOXVkSEp2YkZKaGJtZGxMbWwwWlcwb2FTa3BPMXh1SUNBZ0lDQWdJQ0J6Wld3dVgzSmhibWRsY3k1d2RYTm9LSEpoYm1kbEtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lITmxiQzVwYzBOdmJHeGhjSE5sWkNBOUlITmxiQzV5WVc1blpVTnZkVzUwSUQwOVBTQXhJQ1ltSUhObGJDNWZjbUZ1WjJWeld6QmRMbU52Ykd4aGNITmxaRHRjYmlBZ0lDQWdJSFZ3WkdGMFpVRnVZMmh2Y2tGdVpFWnZZM1Z6Um5KdmJWSmhibWRsS0hObGJDd2djMlZzTGw5eVlXNW5aWE5iYzJWc0xuSmhibWRsUTI5MWJuUWdMU0F4WFN3Z1ptRnNjMlVwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaFpHUlNZVzVuWlZSdlEyOXVkSEp2YkZObGJHVmpkR2x2YmlBb2MyVnNMQ0J5WVc1blpTa2dlMXh1SUNCMllYSWdZMjl1ZEhKdmJGSmhibWRsSUQwZ2MyVnNMbDl6Wld4bFkzUnBiMjR1WTNKbFlYUmxVbUZ1WjJVb0tUdGNiaUFnZG1GeUlISmhibWRsUld4bGJXVnVkQ0E5SUdkbGRGTnBibWRzWlVWc1pXMWxiblJHY205dFVtRnVaMlVvY21GdVoyVXBPMXh1SUNCMllYSWdibVYzUTI5dWRISnZiRkpoYm1kbElEMGdZbTlrZVM1amNtVmhkR1ZEYjI1MGNtOXNVbUZ1WjJVb0tUdGNiaUFnWm05eUlDaDJZWElnYVNBOUlEQXNJR3hsYmlBOUlHTnZiblJ5YjJ4U1lXNW5aUzVzWlc1bmRHZzdJR2tnUENCc1pXNDdJQ3NyYVNrZ2UxeHVJQ0FnSUc1bGQwTnZiblJ5YjJ4U1lXNW5aUzVoWkdRb1kyOXVkSEp2YkZKaGJtZGxMbWwwWlcwb2FTa3BPMXh1SUNCOVhHNGdJSFJ5ZVNCN1hHNGdJQ0FnYm1WM1EyOXVkSEp2YkZKaGJtZGxMbUZrWkNoeVlXNW5aVVZzWlcxbGJuUXBPMXh1SUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkaFpHUlNZVzVuWlNncE9pQkZiR1Z0Wlc1MElHTnZkV3hrSUc1dmRDQmlaU0JoWkdSbFpDQjBieUJqYjI1MGNtOXNJSE5sYkdWamRHbHZiaWNwTzF4dUlDQjlYRzRnSUc1bGQwTnZiblJ5YjJ4U1lXNW5aUzV6Wld4bFkzUW9LVHRjYmlBZ2RYQmtZWFJsUTI5dWRISnZiRk5sYkdWamRHbHZiaWh6Wld3cE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCcGMxTmhiV1ZTWVc1blpTQW9iR1ZtZEN3Z2NtbG5hSFFwSUh0Y2JpQWdjbVYwZFhKdUlDaGNiaUFnSUNCc1pXWjBMbk4wWVhKMFEyOXVkR0ZwYm1WeUlEMDlQU0J5YVdkb2RDNXpkR0Z5ZEVOdmJuUmhhVzVsY2lBbUpseHVJQ0FnSUd4bFpuUXVjM1JoY25SUFptWnpaWFFnUFQwOUlISnBaMmgwTG5OMFlYSjBUMlptYzJWMElDWW1YRzRnSUNBZ2JHVm1kQzVsYm1SRGIyNTBZV2x1WlhJZ1BUMDlJSEpwWjJoMExtVnVaRU52Ym5SaGFXNWxjaUFtSmx4dUlDQWdJR3hsWm5RdVpXNWtUMlptYzJWMElEMDlQU0J5YVdkb2RDNWxibVJQWm1aelpYUmNiaUFnS1R0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnYVhOQmJtTmxjM1J2Y2s5bUlDaGhibU5sYzNSdmNpd2daR1Z6WTJWdVpHRnVkQ2tnZTF4dUlDQjJZWElnYm05a1pTQTlJR1JsYzJObGJtUmhiblE3WEc0Z0lIZG9hV3hsSUNodWIyUmxMbkJoY21WdWRFNXZaR1VwSUh0Y2JpQWdJQ0JwWmlBb2JtOWtaUzV3WVhKbGJuUk9iMlJsSUQwOVBTQmhibU5sYzNSdmNpa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlIUnlkV1U3WEc0Z0lDQWdmVnh1SUNBZ0lHNXZaR1VnUFNCdWIyUmxMbkJoY21WdWRFNXZaR1U3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1poYkhObE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCblpYUlRaV3hsWTNScGIyNGdLQ2tnZTF4dUlDQnlaWFIxY200Z2JtVjNJRWRsZEZObGJHVmpkR2x2YmlobmJHOWlZV3d1Wkc5amRXMWxiblF1YzJWc1pXTjBhVzl1S1R0Y2JuMWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JuWlhSVFpXeGxZM1JwYjI0N1hHNGlYWDA9IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc0hvc3RNZXRob2QgKGhvc3QsIHByb3ApIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgaG9zdFtwcm9wXTtcbiAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgISEodHlwZSA9PT0gJ29iamVjdCcgJiYgaG9zdFtwcm9wXSkgfHwgdHlwZSA9PT0gJ3Vua25vd24nO1xufVxuXG5mdW5jdGlvbiBpc0hvc3RQcm9wZXJ0eSAoaG9zdCwgcHJvcCkge1xuICByZXR1cm4gdHlwZW9mIGhvc3RbcHJvcF0gIT09ICd1bmRlZmluZWQnO1xufVxuXG5mdW5jdGlvbiBtYW55IChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gYXJlSG9zdGVkIChob3N0LCBwcm9wcykge1xuICAgIHZhciBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmICghZm4oaG9zdCwgcHJvcHNbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRob2Q6IGlzSG9zdE1ldGhvZCxcbiAgbWV0aG9kczogbWFueShpc0hvc3RNZXRob2QpLFxuICBwcm9wZXJ0eTogaXNIb3N0UHJvcGVydHksXG4gIHByb3BlcnRpZXM6IG1hbnkoaXNIb3N0UHJvcGVydHkpXG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGJvZHkgPSBkb2MuYm9keTtcblxuZnVuY3Rpb24gcmFuZ2VUb1RleHRSYW5nZSAocCkge1xuICBpZiAocC5jb2xsYXBzZWQpIHtcbiAgICByZXR1cm4gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiBwLnN0YXJ0Q29udGFpbmVyLCBvZmZzZXQ6IHAuc3RhcnRPZmZzZXQgfSwgdHJ1ZSk7XG4gIH1cbiAgdmFyIHN0YXJ0UmFuZ2UgPSBjcmVhdGVCb3VuZGFyeVRleHRSYW5nZSh7IG5vZGU6IHAuc3RhcnRDb250YWluZXIsIG9mZnNldDogcC5zdGFydE9mZnNldCB9LCB0cnVlKTtcbiAgdmFyIGVuZFJhbmdlID0gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UoeyBub2RlOiBwLmVuZENvbnRhaW5lciwgb2Zmc2V0OiBwLmVuZE9mZnNldCB9LCBmYWxzZSk7XG4gIHZhciB0ZXh0UmFuZ2UgPSBib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICB0ZXh0UmFuZ2Uuc2V0RW5kUG9pbnQoJ1N0YXJ0VG9TdGFydCcsIHN0YXJ0UmFuZ2UpO1xuICB0ZXh0UmFuZ2Uuc2V0RW5kUG9pbnQoJ0VuZFRvRW5kJywgZW5kUmFuZ2UpO1xuICByZXR1cm4gdGV4dFJhbmdlO1xufVxuXG5mdW5jdGlvbiBpc0NoYXJhY3RlckRhdGFOb2RlIChub2RlKSB7XG4gIHZhciB0ID0gbm9kZS5ub2RlVHlwZTtcbiAgcmV0dXJuIHQgPT09IDMgfHwgdCA9PT0gNCB8fCB0ID09PSA4IDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQm91bmRhcnlUZXh0UmFuZ2UgKHAsIHN0YXJ0aW5nKSB7XG4gIHZhciBib3VuZDtcbiAgdmFyIHBhcmVudDtcbiAgdmFyIG9mZnNldCA9IHAub2Zmc2V0O1xuICB2YXIgd29ya2luZ05vZGU7XG4gIHZhciBjaGlsZE5vZGVzO1xuICB2YXIgcmFuZ2UgPSBib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICB2YXIgZGF0YSA9IGlzQ2hhcmFjdGVyRGF0YU5vZGUocC5ub2RlKTtcblxuICBpZiAoZGF0YSkge1xuICAgIGJvdW5kID0gcC5ub2RlO1xuICAgIHBhcmVudCA9IGJvdW5kLnBhcmVudE5vZGU7XG4gIH0gZWxzZSB7XG4gICAgY2hpbGROb2RlcyA9IHAubm9kZS5jaGlsZE5vZGVzO1xuICAgIGJvdW5kID0gb2Zmc2V0IDwgY2hpbGROb2Rlcy5sZW5ndGggPyBjaGlsZE5vZGVzW29mZnNldF0gOiBudWxsO1xuICAgIHBhcmVudCA9IHAubm9kZTtcbiAgfVxuXG4gIHdvcmtpbmdOb2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgd29ya2luZ05vZGUuaW5uZXJIVE1MID0gJyYjZmVmZjsnO1xuXG4gIGlmIChib3VuZCkge1xuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUod29ya2luZ05vZGUsIGJvdW5kKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQod29ya2luZ05vZGUpO1xuICB9XG5cbiAgcmFuZ2UubW92ZVRvRWxlbWVudFRleHQod29ya2luZ05vZGUpO1xuICByYW5nZS5jb2xsYXBzZSghc3RhcnRpbmcpO1xuICBwYXJlbnQucmVtb3ZlQ2hpbGQod29ya2luZ05vZGUpO1xuXG4gIGlmIChkYXRhKSB7XG4gICAgcmFuZ2Vbc3RhcnRpbmcgPyAnbW92ZVN0YXJ0JyA6ICdtb3ZlRW5kJ10oJ2NoYXJhY3RlcicsIG9mZnNldCk7XG4gIH1cbiAgcmV0dXJuIHJhbmdlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmdlVG9UZXh0UmFuZ2U7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OXpaV3hsWTJOcGIyNHZjM0pqTDNKaGJtZGxWRzlVWlhoMFVtRnVaMlV1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJrYjJNZ1BTQm5iRzlpWVd3dVpHOWpkVzFsYm5RN1hHNTJZWElnWW05a2VTQTlJR1J2WXk1aWIyUjVPMXh1WEc1bWRXNWpkR2x2YmlCeVlXNW5aVlJ2VkdWNGRGSmhibWRsSUNod0tTQjdYRzRnSUdsbUlDaHdMbU52Ykd4aGNITmxaQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQmpjbVZoZEdWQ2IzVnVaR0Z5ZVZSbGVIUlNZVzVuWlNoN0lHNXZaR1U2SUhBdWMzUmhjblJEYjI1MFlXbHVaWElzSUc5bVpuTmxkRG9nY0M1emRHRnlkRTltWm5ObGRDQjlMQ0IwY25WbEtUdGNiaUFnZlZ4dUlDQjJZWElnYzNSaGNuUlNZVzVuWlNBOUlHTnlaV0YwWlVKdmRXNWtZWEo1VkdWNGRGSmhibWRsS0hzZ2JtOWtaVG9nY0M1emRHRnlkRU52Ym5SaGFXNWxjaXdnYjJabWMyVjBPaUJ3TG5OMFlYSjBUMlptYzJWMElIMHNJSFJ5ZFdVcE8xeHVJQ0IyWVhJZ1pXNWtVbUZ1WjJVZ1BTQmpjbVZoZEdWQ2IzVnVaR0Z5ZVZSbGVIUlNZVzVuWlNoN0lHNXZaR1U2SUhBdVpXNWtRMjl1ZEdGcGJtVnlMQ0J2Wm1aelpYUTZJSEF1Wlc1a1QyWm1jMlYwSUgwc0lHWmhiSE5sS1R0Y2JpQWdkbUZ5SUhSbGVIUlNZVzVuWlNBOUlHSnZaSGt1WTNKbFlYUmxWR1Y0ZEZKaGJtZGxLQ2s3WEc0Z0lIUmxlSFJTWVc1blpTNXpaWFJGYm1SUWIybHVkQ2duVTNSaGNuUlViMU4wWVhKMEp5d2djM1JoY25SU1lXNW5aU2s3WEc0Z0lIUmxlSFJTWVc1blpTNXpaWFJGYm1SUWIybHVkQ2duUlc1a1ZHOUZibVFuTENCbGJtUlNZVzVuWlNrN1hHNGdJSEpsZEhWeWJpQjBaWGgwVW1GdVoyVTdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHbHpRMmhoY21GamRHVnlSR0YwWVU1dlpHVWdLRzV2WkdVcElIdGNiaUFnZG1GeUlIUWdQU0J1YjJSbExtNXZaR1ZVZVhCbE8xeHVJQ0J5WlhSMWNtNGdkQ0E5UFQwZ015QjhmQ0IwSUQwOVBTQTBJSHg4SUhRZ1BUMDlJRGdnTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJqY21WaGRHVkNiM1Z1WkdGeWVWUmxlSFJTWVc1blpTQW9jQ3dnYzNSaGNuUnBibWNwSUh0Y2JpQWdkbUZ5SUdKdmRXNWtPMXh1SUNCMllYSWdjR0Z5Wlc1ME8xeHVJQ0IyWVhJZ2IyWm1jMlYwSUQwZ2NDNXZabVp6WlhRN1hHNGdJSFpoY2lCM2IzSnJhVzVuVG05a1pUdGNiaUFnZG1GeUlHTm9hV3hrVG05a1pYTTdYRzRnSUhaaGNpQnlZVzVuWlNBOUlHSnZaSGt1WTNKbFlYUmxWR1Y0ZEZKaGJtZGxLQ2s3WEc0Z0lIWmhjaUJrWVhSaElEMGdhWE5EYUdGeVlXTjBaWEpFWVhSaFRtOWtaU2h3TG01dlpHVXBPMXh1WEc0Z0lHbG1JQ2hrWVhSaEtTQjdYRzRnSUNBZ1ltOTFibVFnUFNCd0xtNXZaR1U3WEc0Z0lDQWdjR0Z5Wlc1MElEMGdZbTkxYm1RdWNHRnlaVzUwVG05a1pUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQmphR2xzWkU1dlpHVnpJRDBnY0M1dWIyUmxMbU5vYVd4a1RtOWtaWE03WEc0Z0lDQWdZbTkxYm1RZ1BTQnZabVp6WlhRZ1BDQmphR2xzWkU1dlpHVnpMbXhsYm1kMGFDQS9JR05vYVd4a1RtOWtaWE5iYjJabWMyVjBYU0E2SUc1MWJHdzdYRzRnSUNBZ2NHRnlaVzUwSUQwZ2NDNXViMlJsTzF4dUlDQjlYRzVjYmlBZ2QyOXlhMmx1WjA1dlpHVWdQU0JrYjJNdVkzSmxZWFJsUld4bGJXVnVkQ2duYzNCaGJpY3BPMXh1SUNCM2IzSnJhVzVuVG05a1pTNXBibTVsY2toVVRVd2dQU0FuSmlObVpXWm1PeWM3WEc1Y2JpQWdhV1lnS0dKdmRXNWtLU0I3WEc0Z0lDQWdjR0Z5Wlc1MExtbHVjMlZ5ZEVKbFptOXlaU2gzYjNKcmFXNW5UbTlrWlN3Z1ltOTFibVFwTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhCaGNtVnVkQzVoY0hCbGJtUkRhR2xzWkNoM2IzSnJhVzVuVG05a1pTazdYRzRnSUgxY2JseHVJQ0J5WVc1blpTNXRiM1psVkc5RmJHVnRaVzUwVkdWNGRDaDNiM0pyYVc1blRtOWtaU2s3WEc0Z0lISmhibWRsTG1OdmJHeGhjSE5sS0NGemRHRnlkR2x1WnlrN1hHNGdJSEJoY21WdWRDNXlaVzF2ZG1WRGFHbHNaQ2gzYjNKcmFXNW5UbTlrWlNrN1hHNWNiaUFnYVdZZ0tHUmhkR0VwSUh0Y2JpQWdJQ0J5WVc1blpWdHpkR0Z5ZEdsdVp5QS9JQ2R0YjNabFUzUmhjblFuSURvZ0oyMXZkbVZGYm1RblhTZ25ZMmhoY21GamRHVnlKeXdnYjJabWMyVjBLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjbUZ1WjJVN1hHNTlYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21GdVoyVlViMVJsZUhSU1lXNW5aVHRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTZWxlY3Rpb24gPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvbicpO1xudmFyIHNldFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vc2V0U2VsZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXQ6IGdldFNlbGVjdGlvbixcbiAgc2V0OiBzZXRTZWxlY3Rpb25cbn07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTZWxlY3Rpb24gPSByZXF1aXJlKCcuL2dldFNlbGVjdGlvbicpO1xudmFyIHJhbmdlVG9UZXh0UmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlVG9UZXh0UmFuZ2UnKTtcbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG5cbmZ1bmN0aW9uIHNldFNlbGVjdGlvbiAocCkge1xuICBpZiAoZG9jLmNyZWF0ZVJhbmdlKSB7XG4gICAgbW9kZXJuU2VsZWN0aW9uKCk7XG4gIH0gZWxzZSB7XG4gICAgb2xkU2VsZWN0aW9uKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtb2Rlcm5TZWxlY3Rpb24gKCkge1xuICAgIHZhciBzZWwgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICB2YXIgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICBpZiAoIXAuc3RhcnRDb250YWluZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHAuZW5kQ29udGFpbmVyKSB7XG4gICAgICByYW5nZS5zZXRFbmQocC5lbmRDb250YWluZXIsIHAuZW5kT2Zmc2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2Uuc2V0RW5kKHAuc3RhcnRDb250YWluZXIsIHAuc3RhcnRPZmZzZXQpO1xuICAgIH1cbiAgICByYW5nZS5zZXRTdGFydChwLnN0YXJ0Q29udGFpbmVyLCBwLnN0YXJ0T2Zmc2V0KTtcbiAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9sZFNlbGVjdGlvbiAoKSB7XG4gICAgcmFuZ2VUb1RleHRSYW5nZShwKS5zZWxlY3QoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFNlbGVjdGlvbjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5elpXeGxZMk5wYjI0dmMzSmpMM05sZEZObGJHVmpkR2x2Ymk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCblpYUlRaV3hsWTNScGIyNGdQU0J5WlhGMWFYSmxLQ2N1TDJkbGRGTmxiR1ZqZEdsdmJpY3BPMXh1ZG1GeUlISmhibWRsVkc5VVpYaDBVbUZ1WjJVZ1BTQnlaWEYxYVhKbEtDY3VMM0poYm1kbFZHOVVaWGgwVW1GdVoyVW5LVHRjYm5aaGNpQmtiMk1nUFNCbmJHOWlZV3d1Wkc5amRXMWxiblE3WEc1Y2JtWjFibU4wYVc5dUlITmxkRk5sYkdWamRHbHZiaUFvY0NrZ2UxeHVJQ0JwWmlBb1pHOWpMbU55WldGMFpWSmhibWRsS1NCN1hHNGdJQ0FnYlc5a1pYSnVVMlZzWldOMGFXOXVLQ2s3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnYjJ4a1UyVnNaV04wYVc5dUtDazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ0YjJSbGNtNVRaV3hsWTNScGIyNGdLQ2tnZTF4dUlDQWdJSFpoY2lCelpXd2dQU0JuWlhSVFpXeGxZM1JwYjI0b0tUdGNiaUFnSUNCMllYSWdjbUZ1WjJVZ1BTQmtiMk11WTNKbFlYUmxVbUZ1WjJVb0tUdGNiaUFnSUNCcFppQW9JWEF1YzNSaGNuUkRiMjUwWVdsdVpYSXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tIQXVaVzVrUTI5dWRHRnBibVZ5S1NCN1hHNGdJQ0FnSUNCeVlXNW5aUzV6WlhSRmJtUW9jQzVsYm1SRGIyNTBZV2x1WlhJc0lIQXVaVzVrVDJabWMyVjBLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2NtRnVaMlV1YzJWMFJXNWtLSEF1YzNSaGNuUkRiMjUwWVdsdVpYSXNJSEF1YzNSaGNuUlBabVp6WlhRcE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WVc1blpTNXpaWFJUZEdGeWRDaHdMbk4wWVhKMFEyOXVkR0ZwYm1WeUxDQndMbk4wWVhKMFQyWm1jMlYwS1R0Y2JpQWdJQ0J6Wld3dWNtVnRiM1psUVd4c1VtRnVaMlZ6S0NrN1hHNGdJQ0FnYzJWc0xtRmtaRkpoYm1kbEtISmhibWRsS1R0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHOXNaRk5sYkdWamRHbHZiaUFvS1NCN1hHNGdJQ0FnY21GdVoyVlViMVJsZUhSU1lXNW5aU2h3S1M1elpXeGxZM1FvS1R0Y2JpQWdmVnh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlITmxkRk5sYkdWamRHbHZianRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXQgPSBlYXN5R2V0O1xudmFyIHNldCA9IGVhc3lTZXQ7XG5cbmlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XG4gIGdldCA9IGhhcmRHZXQ7XG4gIHNldCA9IGhhcmRTZXQ7XG59XG5cbmZ1bmN0aW9uIGVhc3lHZXQgKGVsKSB7XG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IGVsLnNlbGVjdGlvblN0YXJ0LFxuICAgIGVuZDogZWwuc2VsZWN0aW9uRW5kXG4gIH07XG59XG5cbmZ1bmN0aW9uIGhhcmRHZXQgKGVsKSB7XG4gIHZhciBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBpZiAoYWN0aXZlICE9PSBlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gIH1cblxuICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIGJvb2ttYXJrID0gcmFuZ2UuZ2V0Qm9va21hcmsoKTtcbiAgdmFyIG9yaWdpbmFsID0gZWwudmFsdWU7XG4gIHZhciBtYXJrZXIgPSBnZXRVbmlxdWVNYXJrZXIob3JpZ2luYWwpO1xuICB2YXIgcGFyZW50ID0gcmFuZ2UucGFyZW50RWxlbWVudCgpO1xuICBpZiAocGFyZW50ID09PSBudWxsIHx8ICFpbnB1dHMocGFyZW50KSkge1xuICAgIHJldHVybiByZXN1bHQoMCwgMCk7XG4gIH1cbiAgcmFuZ2UudGV4dCA9IG1hcmtlciArIHJhbmdlLnRleHQgKyBtYXJrZXI7XG5cbiAgdmFyIGNvbnRlbnRzID0gZWwudmFsdWU7XG5cbiAgZWwudmFsdWUgPSBvcmlnaW5hbDtcbiAgcmFuZ2UubW92ZVRvQm9va21hcmsoYm9va21hcmspO1xuICByYW5nZS5zZWxlY3QoKTtcblxuICByZXR1cm4gcmVzdWx0KGNvbnRlbnRzLmluZGV4T2YobWFya2VyKSwgY29udGVudHMubGFzdEluZGV4T2YobWFya2VyKSAtIG1hcmtlci5sZW5ndGgpO1xuXG4gIGZ1bmN0aW9uIHJlc3VsdCAoc3RhcnQsIGVuZCkge1xuICAgIGlmIChhY3RpdmUgIT09IGVsKSB7IC8vIGRvbid0IGRpc3J1cHQgcHJlLWV4aXN0aW5nIHN0YXRlXG4gICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgIGFjdGl2ZS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuYmx1cigpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VW5pcXVlTWFya2VyIChjb250ZW50cykge1xuICB2YXIgbWFya2VyO1xuICBkbyB7XG4gICAgbWFya2VyID0gJ0BAbWFya2VyLicgKyBNYXRoLnJhbmRvbSgpICogbmV3IERhdGUoKTtcbiAgfSB3aGlsZSAoY29udGVudHMuaW5kZXhPZihtYXJrZXIpICE9PSAtMSk7XG4gIHJldHVybiBtYXJrZXI7XG59XG5cbmZ1bmN0aW9uIGlucHV0cyAoZWwpIHtcbiAgcmV0dXJuICgoZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbC50eXBlID09PSAndGV4dCcpIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScpO1xufVxuXG5mdW5jdGlvbiBlYXN5U2V0IChlbCwgcCkge1xuICBlbC5zZWxlY3Rpb25TdGFydCA9IHBhcnNlKGVsLCBwLnN0YXJ0KTtcbiAgZWwuc2VsZWN0aW9uRW5kID0gcGFyc2UoZWwsIHAuZW5kKTtcbn1cblxuZnVuY3Rpb24gaGFyZFNldCAoZWwsIHApIHtcbiAgdmFyIHJhbmdlID0gZWwuY3JlYXRlVGV4dFJhbmdlKCk7XG5cbiAgaWYgKHAuc3RhcnQgPT09ICdlbmQnICYmIHAuZW5kID09PSAnZW5kJykge1xuICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBwYXJzZShlbCwgcC5lbmQpKTtcbiAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIHBhcnNlKGVsLCBwLnN0YXJ0KSk7XG4gICAgcmFuZ2Uuc2VsZWN0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2UgKGVsLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09ICdlbmQnID8gZWwudmFsdWUubGVuZ3RoIDogdmFsdWUgfHwgMDtcbn1cblxuZnVuY3Rpb24gc2VsbCAoZWwsIHApIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICBzZXQoZWwsIHApO1xuICB9XG4gIHJldHVybiBnZXQoZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbGw7XG4iLCJ2YXIgc2kgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nLCB0aWNrO1xuaWYgKHNpKSB7XG4gIHRpY2sgPSBmdW5jdGlvbiAoZm4pIHsgc2V0SW1tZWRpYXRlKGZuKTsgfTtcbn0gZWxzZSB7XG4gIHRpY2sgPSBmdW5jdGlvbiAoZm4pIHsgc2V0VGltZW91dChmbiwgMCk7IH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGljazsiLCJcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHRyaW07XG5cbmZ1bmN0aW9uIHRyaW0oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7XG59XG5cbmV4cG9ydHMubGVmdCA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJyk7XG59O1xuXG5leHBvcnRzLnJpZ2h0ID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciB3aW5kb3cgPSByZXF1aXJlKFwiZ2xvYmFsL3dpbmRvd1wiKVxudmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKFwiaXMtZnVuY3Rpb25cIilcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKFwicGFyc2UtaGVhZGVyc1wiKVxudmFyIHh0ZW5kID0gcmVxdWlyZShcInh0ZW5kXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlWEhSXG5jcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgfHwgbm9vcFxuY3JlYXRlWEhSLlhEb21haW5SZXF1ZXN0ID0gXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiAobmV3IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCgpKSA/IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCA6IHdpbmRvdy5YRG9tYWluUmVxdWVzdFxuXG5mb3JFYWNoQXJyYXkoW1wiZ2V0XCIsIFwicHV0XCIsIFwicG9zdFwiLCBcInBhdGNoXCIsIFwiaGVhZFwiLCBcImRlbGV0ZVwiXSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgY3JlYXRlWEhSW21ldGhvZCA9PT0gXCJkZWxldGVcIiA/IFwiZGVsXCIgOiBtZXRob2RdID0gZnVuY3Rpb24odXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgICBvcHRpb25zID0gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgICAgICBvcHRpb25zLm1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgICAgIHJldHVybiBfY3JlYXRlWEhSKG9wdGlvbnMpXG4gICAgfVxufSlcblxuZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvcikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0b3IoYXJyYXlbaV0pXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0VtcHR5KG9iail7XG4gICAgZm9yKHZhciBpIGluIG9iail7XG4gICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciBwYXJhbXMgPSB1cmlcblxuICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgICAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcGFyYW1zID0ge3VyaTp1cml9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMgPSB4dGVuZChvcHRpb25zLCB7dXJpOiB1cml9KVxuICAgIH1cblxuICAgIHBhcmFtcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHBhcmFtc1xufVxuXG5mdW5jdGlvbiBjcmVhdGVYSFIodXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIG9wdGlvbnMgPSBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgcmV0dXJuIF9jcmVhdGVYSFIob3B0aW9ucylcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVhIUihvcHRpb25zKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFja1xuICAgIGlmKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIGFyZ3VtZW50IG1pc3NpbmdcIilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWFkeXN0YXRlY2hhbmdlKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIGxvYWRGdW5jKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJvZHkoKSB7XG4gICAgICAgIC8vIENocm9tZSB3aXRoIHJlcXVlc3RUeXBlPWJsb2IgdGhyb3dzIGVycm9ycyBhcnJvdW5kIHdoZW4gZXZlbiB0ZXN0aW5nIGFjY2VzcyB0byByZXNwb25zZVRleHRcbiAgICAgICAgdmFyIGJvZHkgPSB1bmRlZmluZWRcblxuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICBib2R5ID0geGhyLnJlc3BvbnNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5ID0geGhyLnJlc3BvbnNlVGV4dCB8fCBnZXRYbWwoeGhyKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzSnNvbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBib2R5ID0gSlNPTi5wYXJzZShib2R5KVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib2R5XG4gICAgfVxuXG4gICAgdmFyIGZhaWx1cmVSZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICBib2R5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICB1cmw6IHVyaSxcbiAgICAgICAgICAgICAgICByYXdSZXF1ZXN0OiB4aHJcbiAgICAgICAgICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yRnVuYyhldnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcilcbiAgICAgICAgaWYoIShldnQgaW5zdGFuY2VvZiBFcnJvcikpe1xuICAgICAgICAgICAgZXZ0ID0gbmV3IEVycm9yKFwiXCIgKyAoZXZ0IHx8IFwiVW5rbm93biBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKSApXG4gICAgICAgIH1cbiAgICAgICAgZXZ0LnN0YXR1c0NvZGUgPSAwXG4gICAgICAgIGNhbGxiYWNrKGV2dCwgZmFpbHVyZVJlc3BvbnNlKVxuICAgICAgICBjYWxsYmFjayA9IG5vb3BcbiAgICB9XG5cbiAgICAvLyB3aWxsIGxvYWQgdGhlIGRhdGEgJiBwcm9jZXNzIHRoZSByZXNwb25zZSBpbiBhIHNwZWNpYWwgcmVzcG9uc2Ugb2JqZWN0XG4gICAgZnVuY3Rpb24gbG9hZEZ1bmMoKSB7XG4gICAgICAgIGlmIChhYm9ydGVkKSByZXR1cm5cbiAgICAgICAgdmFyIHN0YXR1c1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dFRpbWVyKVxuICAgICAgICBpZihvcHRpb25zLnVzZVhEUiAmJiB4aHIuc3RhdHVzPT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvL0lFOCBDT1JTIEdFVCBzdWNjZXNzZnVsIHJlc3BvbnNlIGRvZXNuJ3QgaGF2ZSBhIHN0YXR1cyBmaWVsZCwgYnV0IGJvZHkgaXMgZmluZVxuICAgICAgICAgICAgc3RhdHVzID0gMjAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0dXMgPSAoeGhyLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHhoci5zdGF0dXMpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gZmFpbHVyZVJlc3BvbnNlXG4gICAgICAgIHZhciBlcnIgPSBudWxsXG5cbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gMCl7XG4gICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICBib2R5OiBnZXRCb2R5KCksXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogc3RhdHVzLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgICAgIHVybDogdXJpLFxuICAgICAgICAgICAgICAgIHJhd1JlcXVlc3Q6IHhoclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycyl7IC8vcmVtZW1iZXIgeGhyIGNhbiBpbiBmYWN0IGJlIFhEUiBmb3IgQ09SUyBpbiBJRVxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKFwiSW50ZXJuYWwgWE1MSHR0cFJlcXVlc3QgRXJyb3JcIilcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3BvbnNlLCByZXNwb25zZS5ib2R5KVxuICAgICAgICBjYWxsYmFjayA9IG5vb3BcblxuICAgIH1cblxuICAgIHZhciB4aHIgPSBvcHRpb25zLnhociB8fCBudWxsXG5cbiAgICBpZiAoIXhocikge1xuICAgICAgICBpZiAob3B0aW9ucy5jb3JzIHx8IG9wdGlvbnMudXNlWERSKSB7XG4gICAgICAgICAgICB4aHIgPSBuZXcgY3JlYXRlWEhSLlhEb21haW5SZXF1ZXN0KClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB4aHIgPSBuZXcgY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXlcbiAgICB2YXIgYWJvcnRlZFxuICAgIHZhciB1cmkgPSB4aHIudXJsID0gb3B0aW9ucy51cmkgfHwgb3B0aW9ucy51cmxcbiAgICB2YXIgbWV0aG9kID0geGhyLm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8IFwiR0VUXCJcbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keSB8fCBvcHRpb25zLmRhdGEgfHwgbnVsbFxuICAgIHZhciBoZWFkZXJzID0geGhyLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge31cbiAgICB2YXIgc3luYyA9ICEhb3B0aW9ucy5zeW5jXG4gICAgdmFyIGlzSnNvbiA9IGZhbHNlXG4gICAgdmFyIHRpbWVvdXRUaW1lclxuXG4gICAgaWYgKFwianNvblwiIGluIG9wdGlvbnMpIHtcbiAgICAgICAgaXNKc29uID0gdHJ1ZVxuICAgICAgICBoZWFkZXJzW1wiYWNjZXB0XCJdIHx8IGhlYWRlcnNbXCJBY2NlcHRcIl0gfHwgKGhlYWRlcnNbXCJBY2NlcHRcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIikgLy9Eb24ndCBvdmVycmlkZSBleGlzdGluZyBhY2NlcHQgaGVhZGVyIGRlY2xhcmVkIGJ5IHVzZXJcbiAgICAgICAgaWYgKG1ldGhvZCAhPT0gXCJHRVRcIiAmJiBtZXRob2QgIT09IFwiSEVBRFwiKSB7XG4gICAgICAgICAgICBoZWFkZXJzW1wiY29udGVudC10eXBlXCJdIHx8IGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gfHwgKGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIikgLy9Eb24ndCBvdmVycmlkZSBleGlzdGluZyBhY2NlcHQgaGVhZGVyIGRlY2xhcmVkIGJ5IHVzZXJcbiAgICAgICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLmpzb24pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gcmVhZHlzdGF0ZWNoYW5nZVxuICAgIHhoci5vbmxvYWQgPSBsb2FkRnVuY1xuICAgIHhoci5vbmVycm9yID0gZXJyb3JGdW5jXG4gICAgLy8gSUU5IG11c3QgaGF2ZSBvbnByb2dyZXNzIGJlIHNldCB0byBhIHVuaXF1ZSBmdW5jdGlvbi5cbiAgICB4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gSUUgbXVzdCBkaWVcbiAgICB9XG4gICAgeGhyLm9udGltZW91dCA9IGVycm9yRnVuY1xuICAgIHhoci5vcGVuKG1ldGhvZCwgdXJpLCAhc3luYywgb3B0aW9ucy51c2VybmFtZSwgb3B0aW9ucy5wYXNzd29yZClcbiAgICAvL2hhcyB0byBiZSBhZnRlciBvcGVuXG4gICAgaWYoIXN5bmMpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9ICEhb3B0aW9ucy53aXRoQ3JlZGVudGlhbHNcbiAgICB9XG4gICAgLy8gQ2Fubm90IHNldCB0aW1lb3V0IHdpdGggc3luYyByZXF1ZXN0XG4gICAgLy8gbm90IHNldHRpbmcgdGltZW91dCBvbiB0aGUgeGhyIG9iamVjdCwgYmVjYXVzZSBvZiBvbGQgd2Via2l0cyBldGMuIG5vdCBoYW5kbGluZyB0aGF0IGNvcnJlY3RseVxuICAgIC8vIGJvdGggbnBtJ3MgcmVxdWVzdCBhbmQganF1ZXJ5IDEueCB1c2UgdGhpcyBraW5kIG9mIHRpbWVvdXQsIHNvIHRoaXMgaXMgYmVpbmcgY29uc2lzdGVudFxuICAgIGlmICghc3luYyAmJiBvcHRpb25zLnRpbWVvdXQgPiAwICkge1xuICAgICAgICB0aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBhYm9ydGVkPXRydWUvL0lFOSBtYXkgc3RpbGwgY2FsbCByZWFkeXN0YXRlY2hhbmdlXG4gICAgICAgICAgICB4aHIuYWJvcnQoXCJ0aW1lb3V0XCIpXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcihcIlhNTEh0dHBSZXF1ZXN0IHRpbWVvdXRcIilcbiAgICAgICAgICAgIGUuY29kZSA9IFwiRVRJTUVET1VUXCJcbiAgICAgICAgICAgIGVycm9yRnVuYyhlKVxuICAgICAgICB9LCBvcHRpb25zLnRpbWVvdXQgKVxuICAgIH1cblxuICAgIGlmICh4aHIuc2V0UmVxdWVzdEhlYWRlcikge1xuICAgICAgICBmb3Ioa2V5IGluIGhlYWRlcnMpe1xuICAgICAgICAgICAgaWYoaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5oZWFkZXJzICYmICFpc0VtcHR5KG9wdGlvbnMuaGVhZGVycykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVycyBjYW5ub3QgYmUgc2V0IG9uIGFuIFhEb21haW5SZXF1ZXN0IG9iamVjdFwiKVxuICAgIH1cblxuICAgIGlmIChcInJlc3BvbnNlVHlwZVwiIGluIG9wdGlvbnMpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlXG4gICAgfVxuXG4gICAgaWYgKFwiYmVmb3JlU2VuZFwiIGluIG9wdGlvbnMgJiZcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMuYmVmb3JlU2VuZCA9PT0gXCJmdW5jdGlvblwiXG4gICAgKSB7XG4gICAgICAgIG9wdGlvbnMuYmVmb3JlU2VuZCh4aHIpXG4gICAgfVxuXG4gICAgeGhyLnNlbmQoYm9keSlcblxuICAgIHJldHVybiB4aHJcblxuXG59XG5cbmZ1bmN0aW9uIGdldFhtbCh4aHIpIHtcbiAgICBpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJkb2N1bWVudFwiKSB7XG4gICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUxcbiAgICB9XG4gICAgdmFyIGZpcmVmb3hCdWdUYWtlbkVmZmVjdCA9IHhoci5zdGF0dXMgPT09IDIwNCAmJiB4aHIucmVzcG9uc2VYTUwgJiYgeGhyLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSA9PT0gXCJwYXJzZXJlcnJvclwiXG4gICAgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwiXCIgJiYgIWZpcmVmb3hCdWdUYWtlbkVmZmVjdCkge1xuICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlWE1MXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgdmFyIHRhcmdldCA9IHt9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgSW5wdXRTdGF0ZSA9IHJlcXVpcmUoJy4vSW5wdXRTdGF0ZScpO1xuXG5mdW5jdGlvbiBJbnB1dEhpc3RvcnkgKHN1cmZhY2UsIG1vZGUpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcblxuICBzdGF0ZS5pbnB1dE1vZGUgPSBtb2RlO1xuICBzdGF0ZS5zdXJmYWNlID0gc3VyZmFjZTtcbiAgc3RhdGUucmVzZXQoKTtcblxuICBsaXN0ZW4oc3VyZmFjZS50ZXh0YXJlYSk7XG4gIGxpc3RlbihzdXJmYWNlLmVkaXRhYmxlKTtcblxuICBmdW5jdGlvbiBsaXN0ZW4gKGVsKSB7XG4gICAgdmFyIHBhc3RlSGFuZGxlciA9IHNlbGZpZShoYW5kbGVQYXN0ZSk7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ2tleXByZXNzJywgcHJldmVudEN0cmxZWik7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ2tleWRvd24nLCBzZWxmaWUoaGFuZGxlQ3RybFlaKSk7XG4gICAgY3Jvc3N2ZW50LmFkZChlbCwgJ2tleWRvd24nLCBzZWxmaWUoaGFuZGxlTW9kZUNoYW5nZSkpO1xuICAgIGNyb3NzdmVudC5hZGQoZWwsICdtb3VzZWRvd24nLCBzZXRNb3ZpbmcpO1xuICAgIGVsLm9ucGFzdGUgPSBwYXN0ZUhhbmRsZXI7XG4gICAgZWwub25kcm9wID0gcGFzdGVIYW5kbGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0TW92aW5nICgpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCdtb3ZpbmcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGZpZSAoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlciAoZSkgeyByZXR1cm4gZm4uY2FsbChudWxsLCBzdGF0ZSwgZSk7IH07XG4gIH1cbn1cblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5zZXRJbnB1dE1vZGUgPSBmdW5jdGlvbiAobW9kZSkge1xuICB2YXIgc3RhdGUgPSB0aGlzO1xuICBzdGF0ZS5pbnB1dE1vZGUgPSBtb2RlO1xuICBzdGF0ZS5yZXNldCgpO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgc3RhdGUuaW5wdXRTdGF0ZSA9IG51bGw7XG4gIHN0YXRlLmxhc3RTdGF0ZSA9IG51bGw7XG4gIHN0YXRlLmhpc3RvcnkgPSBbXTtcbiAgc3RhdGUuaGlzdG9yeVBvaW50ZXIgPSAwO1xuICBzdGF0ZS5oaXN0b3J5TW9kZSA9ICdub25lJztcbiAgc3RhdGUucmVmcmVzaGluZyA9IG51bGw7XG4gIHN0YXRlLnJlZnJlc2hTdGF0ZSh0cnVlKTtcbiAgc3RhdGUuc2F2ZVN0YXRlKCk7XG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUuc2V0Q29tbWFuZE1vZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIHN0YXRlLmhpc3RvcnlNb2RlID0gJ2NvbW1hbmQnO1xuICBzdGF0ZS5zYXZlU3RhdGUoKTtcbiAgc3RhdGUucmVmcmVzaGluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xuICB9LCAwKTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUuY2FuVW5kbyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuaGlzdG9yeVBvaW50ZXIgPiAxO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5jYW5SZWRvID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5oaXN0b3J5W3RoaXMuaGlzdG9yeVBvaW50ZXIgKyAxXTtcbn07XG5cbklucHV0SGlzdG9yeS5wcm90b3R5cGUudW5kbyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgaWYgKHN0YXRlLmNhblVuZG8oKSkge1xuICAgIGlmIChzdGF0ZS5sYXN0U3RhdGUpIHtcbiAgICAgIHN0YXRlLmxhc3RTdGF0ZS5yZXN0b3JlKCk7XG4gICAgICBzdGF0ZS5sYXN0U3RhdGUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5oaXN0b3J5W3N0YXRlLmhpc3RvcnlQb2ludGVyXSA9IG5ldyBJbnB1dFN0YXRlKHN0YXRlLnN1cmZhY2UsIHN0YXRlLmlucHV0TW9kZSk7XG4gICAgICBzdGF0ZS5oaXN0b3J5Wy0tc3RhdGUuaGlzdG9yeVBvaW50ZXJdLnJlc3RvcmUoKTtcbiAgICB9XG4gIH1cbiAgc3RhdGUuaGlzdG9yeU1vZGUgPSAnbm9uZSc7XG4gIHN0YXRlLnN1cmZhY2UuZm9jdXMoc3RhdGUuaW5wdXRNb2RlKTtcbiAgc3RhdGUucmVmcmVzaFN0YXRlKCk7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnJlZG8gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIGlmIChzdGF0ZS5jYW5SZWRvKCkpIHtcbiAgICBzdGF0ZS5oaXN0b3J5Wysrc3RhdGUuaGlzdG9yeVBvaW50ZXJdLnJlc3RvcmUoKTtcbiAgfVxuXG4gIHN0YXRlLmhpc3RvcnlNb2RlID0gJ25vbmUnO1xuICBzdGF0ZS5zdXJmYWNlLmZvY3VzKHN0YXRlLmlucHV0TW9kZSk7XG4gIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xufTtcblxuSW5wdXRIaXN0b3J5LnByb3RvdHlwZS5zZXRNb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXM7XG4gIGlmIChzdGF0ZS5oaXN0b3J5TW9kZSAhPT0gdmFsdWUpIHtcbiAgICBzdGF0ZS5oaXN0b3J5TW9kZSA9IHZhbHVlO1xuICAgIHN0YXRlLnNhdmVTdGF0ZSgpO1xuICB9XG4gIHN0YXRlLnJlZnJlc2hpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGF0ZS5yZWZyZXNoU3RhdGUoKTtcbiAgfSwgMSk7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnJlZnJlc2hTdGF0ZSA9IGZ1bmN0aW9uIChpbml0aWFsU3RhdGUpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgc3RhdGUuaW5wdXRTdGF0ZSA9IG5ldyBJbnB1dFN0YXRlKHN0YXRlLnN1cmZhY2UsIHN0YXRlLmlucHV0TW9kZSwgaW5pdGlhbFN0YXRlKTtcbiAgc3RhdGUucmVmcmVzaGluZyA9IG51bGw7XG59O1xuXG5JbnB1dEhpc3RvcnkucHJvdG90eXBlLnNhdmVTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gdGhpcztcbiAgdmFyIGN1cnJlbnQgPSBzdGF0ZS5pbnB1dFN0YXRlIHx8IG5ldyBJbnB1dFN0YXRlKHN0YXRlLnN1cmZhY2UsIHN0YXRlLmlucHV0TW9kZSk7XG5cbiAgaWYgKHN0YXRlLmhpc3RvcnlNb2RlID09PSAnbW92aW5nJykge1xuICAgIGlmICghc3RhdGUubGFzdFN0YXRlKSB7XG4gICAgICBzdGF0ZS5sYXN0U3RhdGUgPSBjdXJyZW50O1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHN0YXRlLmxhc3RTdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5oaXN0b3J5W3N0YXRlLmhpc3RvcnlQb2ludGVyIC0gMV0udGV4dCAhPT0gc3RhdGUubGFzdFN0YXRlLnRleHQpIHtcbiAgICAgIHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeVBvaW50ZXIrK10gPSBzdGF0ZS5sYXN0U3RhdGU7XG4gICAgfVxuICAgIHN0YXRlLmxhc3RTdGF0ZSA9IG51bGw7XG4gIH1cbiAgc3RhdGUuaGlzdG9yeVtzdGF0ZS5oaXN0b3J5UG9pbnRlcisrXSA9IGN1cnJlbnQ7XG4gIHN0YXRlLmhpc3Rvcnlbc3RhdGUuaGlzdG9yeVBvaW50ZXIgKyAxXSA9IG51bGw7XG59O1xuXG5mdW5jdGlvbiBoYW5kbGVDdHJsWVogKHN0YXRlLCBlKSB7XG4gIHZhciBoYW5kbGVkID0gZmFsc2U7XG4gIHZhciBrZXlDb2RlID0gZS5jaGFyQ29kZSB8fCBlLmtleUNvZGU7XG4gIHZhciBrZXlDb2RlQ2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5Q29kZSk7XG5cbiAgaWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICBzd2l0Y2ggKGtleUNvZGVDaGFyLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICBzdGF0ZS5yZWRvKCk7XG4gICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAneic6XG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgc3RhdGUucmVkbygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLnVuZG8oKTtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGhhbmRsZWQgJiYgZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVNb2RlQ2hhbmdlIChzdGF0ZSwgZSkge1xuICBpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlO1xuXG4gIGlmICgoa2V5Q29kZSA+PSAzMyAmJiBrZXlDb2RlIDw9IDQwKSB8fCAoa2V5Q29kZSA+PSA2MzIzMiAmJiBrZXlDb2RlIDw9IDYzMjM1KSkge1xuICAgIHN0YXRlLnNldE1vZGUoJ21vdmluZycpO1xuICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IDggfHwga2V5Q29kZSA9PT0gNDYgfHwga2V5Q29kZSA9PT0gMTI3KSB7XG4gICAgc3RhdGUuc2V0TW9kZSgnZGVsZXRpbmcnKTtcbiAgfSBlbHNlIGlmIChrZXlDb2RlID09PSAxMykge1xuICAgIHN0YXRlLnNldE1vZGUoJ25ld2xpbmVzJyk7XG4gIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gMjcpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCdlc2NhcGUnKTtcbiAgfSBlbHNlIGlmICgoa2V5Q29kZSA8IDE2IHx8IGtleUNvZGUgPiAyMCkgJiYga2V5Q29kZSAhPT0gOTEpIHtcbiAgICBzdGF0ZS5zZXRNb2RlKCd0eXBpbmcnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVQYXN0ZSAoc3RhdGUpIHtcbiAgaWYgKHN0YXRlLmlucHV0U3RhdGUgJiYgc3RhdGUuaW5wdXRTdGF0ZS50ZXh0ICE9PSBzdGF0ZS5zdXJmYWNlLnJlYWQoc3RhdGUuaW5wdXRNb2RlKSAmJiBzdGF0ZS5yZWZyZXNoaW5nID09PSBudWxsKSB7XG4gICAgc3RhdGUuaGlzdG9yeU1vZGUgPSAncGFzdGUnO1xuICAgIHN0YXRlLnNhdmVTdGF0ZSgpO1xuICAgIHN0YXRlLnJlZnJlc2hTdGF0ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByZXZlbnRDdHJsWVogKGUpIHtcbiAgdmFyIGtleUNvZGUgPSBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZTtcbiAgdmFyIHl6ID0ga2V5Q29kZSA9PT0gODkgfHwga2V5Q29kZSA9PT0gOTA7XG4gIHZhciBjdHJsID0gZS5jdHJsS2V5IHx8IGUubWV0YUtleTtcbiAgaWYgKGN0cmwgJiYgeXopIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dEhpc3Rvcnk7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgaXNWaXNpYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vaXNWaXNpYmxlRWxlbWVudCcpO1xudmFyIGZpeEVPTCA9IHJlcXVpcmUoJy4vZml4RU9MJyk7XG52YXIgTWFya2Rvd25DaHVua3MgPSByZXF1aXJlKCcuL21hcmtkb3duL01hcmtkb3duQ2h1bmtzJyk7XG52YXIgSHRtbENodW5rcyA9IHJlcXVpcmUoJy4vaHRtbC9IdG1sQ2h1bmtzJyk7XG52YXIgY2h1bmtzID0ge1xuICBtYXJrZG93bjogTWFya2Rvd25DaHVua3MsXG4gIGh0bWw6IEh0bWxDaHVua3MsXG4gIHd5c2l3eWc6IEh0bWxDaHVua3Ncbn07XG5cbmZ1bmN0aW9uIElucHV0U3RhdGUgKHN1cmZhY2UsIG1vZGUsIGluaXRpYWxTdGF0ZSkge1xuICB0aGlzLm1vZGUgPSBtb2RlO1xuICB0aGlzLnN1cmZhY2UgPSBzdXJmYWNlO1xuICB0aGlzLmluaXRpYWxTdGF0ZSA9IGluaXRpYWxTdGF0ZSB8fCBmYWxzZTtcbiAgdGhpcy5pbml0KCk7XG59XG5cbklucHV0U3RhdGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGVsID0gc2VsZi5zdXJmYWNlLmN1cnJlbnQoc2VsZi5tb2RlKTtcbiAgaWYgKCFpc1Zpc2libGVFbGVtZW50KGVsKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXRoaXMuaW5pdGlhbFN0YXRlICYmIGRvYy5hY3RpdmVFbGVtZW50ICYmIGRvYy5hY3RpdmVFbGVtZW50ICE9PSBlbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBzZWxmLnN1cmZhY2UucmVhZFNlbGVjdGlvbihzZWxmKTtcbiAgc2VsZi5zY3JvbGxUb3AgPSBlbC5zY3JvbGxUb3A7XG4gIGlmICghc2VsZi50ZXh0KSB7XG4gICAgc2VsZi50ZXh0ID0gc2VsZi5zdXJmYWNlLnJlYWQoc2VsZi5tb2RlKTtcbiAgfVxufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBlbCA9IHNlbGYuc3VyZmFjZS5jdXJyZW50KHNlbGYubW9kZSk7XG4gIGlmICghaXNWaXNpYmxlRWxlbWVudChlbCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc2VsZi5zdXJmYWNlLndyaXRlU2VsZWN0aW9uKHNlbGYpO1xufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUucmVzdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZWwgPSBzZWxmLnN1cmZhY2UuY3VycmVudChzZWxmLm1vZGUpO1xuICBpZiAodHlwZW9mIHNlbGYudGV4dCA9PT0gJ3N0cmluZycgJiYgc2VsZi50ZXh0ICE9PSBzZWxmLnN1cmZhY2UucmVhZChzZWxmLm1vZGUpKSB7XG4gICAgc2VsZi5zdXJmYWNlLndyaXRlKHNlbGYubW9kZSwgc2VsZi50ZXh0KTtcbiAgfVxuICBzZWxmLnNlbGVjdCgpO1xuICBlbC5zY3JvbGxUb3AgPSBzZWxmLnNjcm9sbFRvcDtcbn07XG5cbklucHV0U3RhdGUucHJvdG90eXBlLmdldENodW5rcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgY2h1bmsgPSBuZXcgY2h1bmtzW3NlbGYubW9kZV0oKTtcbiAgY2h1bmsuYmVmb3JlID0gZml4RU9MKHNlbGYudGV4dC5zdWJzdHJpbmcoMCwgc2VsZi5zdGFydCkpO1xuICBjaHVuay5zdGFydFRhZyA9ICcnO1xuICBjaHVuay5zZWxlY3Rpb24gPSBmaXhFT0woc2VsZi50ZXh0LnN1YnN0cmluZyhzZWxmLnN0YXJ0LCBzZWxmLmVuZCkpO1xuICBjaHVuay5lbmRUYWcgPSAnJztcbiAgY2h1bmsuYWZ0ZXIgPSBmaXhFT0woc2VsZi50ZXh0LnN1YnN0cmluZyhzZWxmLmVuZCkpO1xuICBjaHVuay5zY3JvbGxUb3AgPSBzZWxmLnNjcm9sbFRvcDtcbiAgc2VsZi5jYWNoZWRDaHVua3MgPSBjaHVuaztcbiAgcmV0dXJuIGNodW5rO1xufTtcblxuSW5wdXRTdGF0ZS5wcm90b3R5cGUuc2V0Q2h1bmtzID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2h1bmsuYmVmb3JlID0gY2h1bmsuYmVmb3JlICsgY2h1bmsuc3RhcnRUYWc7XG4gIGNodW5rLmFmdGVyID0gY2h1bmsuZW5kVGFnICsgY2h1bmsuYWZ0ZXI7XG4gIHNlbGYuc3RhcnQgPSBjaHVuay5iZWZvcmUubGVuZ3RoO1xuICBzZWxmLmVuZCA9IGNodW5rLmJlZm9yZS5sZW5ndGggKyBjaHVuay5zZWxlY3Rpb24ubGVuZ3RoO1xuICBzZWxmLnRleHQgPSBjaHVuay5iZWZvcmUgKyBjaHVuay5zZWxlY3Rpb24gKyBjaHVuay5hZnRlcjtcbiAgc2VsZi5zY3JvbGxUb3AgPSBjaHVuay5zY3JvbGxUb3A7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0U3RhdGU7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OUpibkIxZEZOMFlYUmxMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCa2IyTWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzUyWVhJZ2FYTldhWE5wWW14bFJXeGxiV1Z1ZENBOUlISmxjWFZwY21Vb0p5NHZhWE5XYVhOcFlteGxSV3hsYldWdWRDY3BPMXh1ZG1GeUlHWnBlRVZQVENBOUlISmxjWFZwY21Vb0p5NHZabWw0UlU5TUp5azdYRzUyWVhJZ1RXRnlhMlJ2ZDI1RGFIVnVhM01nUFNCeVpYRjFhWEpsS0NjdUwyMWhjbXRrYjNkdUwwMWhjbXRrYjNkdVEyaDFibXR6SnlrN1hHNTJZWElnU0hSdGJFTm9kVzVyY3lBOUlISmxjWFZwY21Vb0p5NHZhSFJ0YkM5SWRHMXNRMmgxYm10ekp5azdYRzUyWVhJZ1kyaDFibXR6SUQwZ2UxeHVJQ0J0WVhKclpHOTNiam9nVFdGeWEyUnZkMjVEYUhWdWEzTXNYRzRnSUdoMGJXdzZJRWgwYld4RGFIVnVhM01zWEc0Z0lIZDVjMmwzZVdjNklFaDBiV3hEYUhWdWEzTmNibjA3WEc1Y2JtWjFibU4wYVc5dUlFbHVjSFYwVTNSaGRHVWdLSE4xY21aaFkyVXNJRzF2WkdVc0lHbHVhWFJwWVd4VGRHRjBaU2tnZTF4dUlDQjBhR2x6TG0xdlpHVWdQU0J0YjJSbE8xeHVJQ0IwYUdsekxuTjFjbVpoWTJVZ1BTQnpkWEptWVdObE8xeHVJQ0IwYUdsekxtbHVhWFJwWVd4VGRHRjBaU0E5SUdsdWFYUnBZV3hUZEdGMFpTQjhmQ0JtWVd4elpUdGNiaUFnZEdocGN5NXBibWwwS0NrN1hHNTlYRzVjYmtsdWNIVjBVM1JoZEdVdWNISnZkRzkwZVhCbExtbHVhWFFnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUhaaGNpQnpaV3htSUQwZ2RHaHBjenRjYmlBZ2RtRnlJR1ZzSUQwZ2MyVnNaaTV6ZFhKbVlXTmxMbU4xY25KbGJuUW9jMlZzWmk1dGIyUmxLVHRjYmlBZ2FXWWdLQ0ZwYzFacGMybGliR1ZGYkdWdFpXNTBLR1ZzS1NrZ2UxeHVJQ0FnSUhKbGRIVnlianRjYmlBZ2ZWeHVJQ0JwWmlBb0lYUm9hWE11YVc1cGRHbGhiRk4wWVhSbElDWW1JR1J2WXk1aFkzUnBkbVZGYkdWdFpXNTBJQ1ltSUdSdll5NWhZM1JwZG1WRmJHVnRaVzUwSUNFOVBTQmxiQ2tnZTF4dUlDQWdJSEpsZEhWeWJqdGNiaUFnZlZ4dUlDQnpaV3htTG5OMWNtWmhZMlV1Y21WaFpGTmxiR1ZqZEdsdmJpaHpaV3htS1R0Y2JpQWdjMlZzWmk1elkzSnZiR3hVYjNBZ1BTQmxiQzV6WTNKdmJHeFViM0E3WEc0Z0lHbG1JQ2doYzJWc1ppNTBaWGgwS1NCN1hHNGdJQ0FnYzJWc1ppNTBaWGgwSUQwZ2MyVnNaaTV6ZFhKbVlXTmxMbkpsWVdRb2MyVnNaaTV0YjJSbEtUdGNiaUFnZlZ4dWZUdGNibHh1U1c1d2RYUlRkR0YwWlM1d2NtOTBiM1I1Y0dVdWMyVnNaV04wSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCMllYSWdjMlZzWmlBOUlIUm9hWE03WEc0Z0lIWmhjaUJsYkNBOUlITmxiR1l1YzNWeVptRmpaUzVqZFhKeVpXNTBLSE5sYkdZdWJXOWtaU2s3WEc0Z0lHbG1JQ2doYVhOV2FYTnBZbXhsUld4bGJXVnVkQ2hsYkNrcElIdGNiaUFnSUNCeVpYUjFjbTQ3WEc0Z0lIMWNiaUFnYzJWc1ppNXpkWEptWVdObExuZHlhWFJsVTJWc1pXTjBhVzl1S0hObGJHWXBPMXh1ZlR0Y2JseHVTVzV3ZFhSVGRHRjBaUzV3Y205MGIzUjVjR1V1Y21WemRHOXlaU0E5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnZG1GeUlITmxiR1lnUFNCMGFHbHpPMXh1SUNCMllYSWdaV3dnUFNCelpXeG1Mbk4xY21aaFkyVXVZM1Z5Y21WdWRDaHpaV3htTG0xdlpHVXBPMXh1SUNCcFppQW9kSGx3Wlc5bUlITmxiR1l1ZEdWNGRDQTlQVDBnSjNOMGNtbHVaeWNnSmlZZ2MyVnNaaTUwWlhoMElDRTlQU0J6Wld4bUxuTjFjbVpoWTJVdWNtVmhaQ2h6Wld4bUxtMXZaR1VwS1NCN1hHNGdJQ0FnYzJWc1ppNXpkWEptWVdObExuZHlhWFJsS0hObGJHWXViVzlrWlN3Z2MyVnNaaTUwWlhoMEtUdGNiaUFnZlZ4dUlDQnpaV3htTG5ObGJHVmpkQ2dwTzF4dUlDQmxiQzV6WTNKdmJHeFViM0FnUFNCelpXeG1Mbk5qY205c2JGUnZjRHRjYm4wN1hHNWNia2x1Y0hWMFUzUmhkR1V1Y0hKdmRHOTBlWEJsTG1kbGRFTm9kVzVyY3lBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ2RtRnlJSE5sYkdZZ1BTQjBhR2x6TzF4dUlDQjJZWElnWTJoMWJtc2dQU0J1WlhjZ1kyaDFibXR6VzNObGJHWXViVzlrWlYwb0tUdGNiaUFnWTJoMWJtc3VZbVZtYjNKbElEMGdabWw0UlU5TUtITmxiR1l1ZEdWNGRDNXpkV0p6ZEhKcGJtY29NQ3dnYzJWc1ppNXpkR0Z5ZENrcE8xeHVJQ0JqYUhWdWF5NXpkR0Z5ZEZSaFp5QTlJQ2NuTzF4dUlDQmphSFZ1YXk1elpXeGxZM1JwYjI0Z1BTQm1hWGhGVDB3b2MyVnNaaTUwWlhoMExuTjFZbk4wY21sdVp5aHpaV3htTG5OMFlYSjBMQ0J6Wld4bUxtVnVaQ2twTzF4dUlDQmphSFZ1YXk1bGJtUlVZV2NnUFNBbkp6dGNiaUFnWTJoMWJtc3VZV1owWlhJZ1BTQm1hWGhGVDB3b2MyVnNaaTUwWlhoMExuTjFZbk4wY21sdVp5aHpaV3htTG1WdVpDa3BPMXh1SUNCamFIVnVheTV6WTNKdmJHeFViM0FnUFNCelpXeG1Mbk5qY205c2JGUnZjRHRjYmlBZ2MyVnNaaTVqWVdOb1pXUkRhSFZ1YTNNZ1BTQmphSFZ1YXp0Y2JpQWdjbVYwZFhKdUlHTm9kVzVyTzF4dWZUdGNibHh1U1c1d2RYUlRkR0YwWlM1d2NtOTBiM1I1Y0dVdWMyVjBRMmgxYm10eklEMGdablZ1WTNScGIyNGdLR05vZFc1cktTQjdYRzRnSUhaaGNpQnpaV3htSUQwZ2RHaHBjenRjYmlBZ1kyaDFibXN1WW1WbWIzSmxJRDBnWTJoMWJtc3VZbVZtYjNKbElDc2dZMmgxYm1zdWMzUmhjblJVWVdjN1hHNGdJR05vZFc1ckxtRm1kR1Z5SUQwZ1kyaDFibXN1Wlc1a1ZHRm5JQ3NnWTJoMWJtc3VZV1owWlhJN1hHNGdJSE5sYkdZdWMzUmhjblFnUFNCamFIVnVheTVpWldadmNtVXViR1Z1WjNSb08xeHVJQ0J6Wld4bUxtVnVaQ0E5SUdOb2RXNXJMbUpsWm05eVpTNXNaVzVuZEdnZ0t5QmphSFZ1YXk1elpXeGxZM1JwYjI0dWJHVnVaM1JvTzF4dUlDQnpaV3htTG5SbGVIUWdQU0JqYUhWdWF5NWlaV1p2Y21VZ0t5QmphSFZ1YXk1elpXeGxZM1JwYjI0Z0t5QmphSFZ1YXk1aFpuUmxjanRjYmlBZ2MyVnNaaTV6WTNKdmJHeFViM0FnUFNCamFIVnVheTV6WTNKdmJHeFViM0E3WEc1OU8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRWx1Y0hWMFUzUmhkR1U3WEc0aVhYMD0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBjb21tYW5kcyA9IHtcbiAgbWFya2Rvd246IHtcbiAgICBib2xkT3JJdGFsaWM6IHJlcXVpcmUoJy4vbWFya2Rvd24vYm9sZE9ySXRhbGljJyksXG4gICAgbGlua09ySW1hZ2VPckF0dGFjaG1lbnQ6IHJlcXVpcmUoJy4vbWFya2Rvd24vbGlua09ySW1hZ2VPckF0dGFjaG1lbnQnKSxcbiAgICBibG9ja3F1b3RlOiByZXF1aXJlKCcuL21hcmtkb3duL2Jsb2NrcXVvdGUnKSxcbiAgICBjb2RlYmxvY2s6IHJlcXVpcmUoJy4vbWFya2Rvd24vY29kZWJsb2NrJyksXG4gICAgaGVhZGluZzogcmVxdWlyZSgnLi9tYXJrZG93bi9oZWFkaW5nJyksXG4gICAgbGlzdDogcmVxdWlyZSgnLi9tYXJrZG93bi9saXN0JyksXG4gICAgaHI6IHJlcXVpcmUoJy4vbWFya2Rvd24vaHInKVxuICB9LFxuICBodG1sOiB7XG4gICAgYm9sZE9ySXRhbGljOiByZXF1aXJlKCcuL2h0bWwvYm9sZE9ySXRhbGljJyksXG4gICAgbGlua09ySW1hZ2VPckF0dGFjaG1lbnQ6IHJlcXVpcmUoJy4vaHRtbC9saW5rT3JJbWFnZU9yQXR0YWNobWVudCcpLFxuICAgIGJsb2NrcXVvdGU6IHJlcXVpcmUoJy4vaHRtbC9ibG9ja3F1b3RlJyksXG4gICAgY29kZWJsb2NrOiByZXF1aXJlKCcuL2h0bWwvY29kZWJsb2NrJyksXG4gICAgaGVhZGluZzogcmVxdWlyZSgnLi9odG1sL2hlYWRpbmcnKSxcbiAgICBsaXN0OiByZXF1aXJlKCcuL2h0bWwvbGlzdCcpLFxuICAgIGhyOiByZXF1aXJlKCcuL2h0bWwvaHInKVxuICB9XG59O1xuXG5jb21tYW5kcy53eXNpd3lnID0gY29tbWFuZHMuaHRtbDtcblxuZnVuY3Rpb24gYmluZENvbW1hbmRzIChzdXJmYWNlLCBvcHRpb25zLCBlZGl0b3IpIHtcbiAgYmluZCgnYm9sZCcsICdjbWQrYicsIGJvbGQpO1xuICBiaW5kKCdpdGFsaWMnLCAnY21kK2knLCBpdGFsaWMpO1xuICBiaW5kKCdxdW90ZScsICdjbWQraicsIHJvdXRlcignYmxvY2txdW90ZScpKTtcbiAgYmluZCgnY29kZScsICdjbWQrZScsIGNvZGUpO1xuICBiaW5kKCdvbCcsICdjbWQrbycsIG9sKTtcbiAgYmluZCgndWwnLCAnY21kK3UnLCB1bCk7XG4gIGJpbmQoJ2hlYWRpbmcnLCAnY21kK2QnLCByb3V0ZXIoJ2hlYWRpbmcnKSk7XG4gIGVkaXRvci5zaG93TGlua0RpYWxvZyA9IGZhYnJpY2F0b3IoYmluZCgnbGluaycsICdjbWQraycsIGxpbmtPckltYWdlT3JBdHRhY2htZW50KCdsaW5rJykpKTtcbiAgZWRpdG9yLnNob3dJbWFnZURpYWxvZyA9IGZhYnJpY2F0b3IoYmluZCgnaW1hZ2UnLCAnY21kK2cnLCBsaW5rT3JJbWFnZU9yQXR0YWNobWVudCgnaW1hZ2UnKSkpO1xuICBlZGl0b3IubGlua09ySW1hZ2VPckF0dGFjaG1lbnQgPSBsaW5rT3JJbWFnZU9yQXR0YWNobWVudDtcblxuICBpZiAob3B0aW9ucy5hdHRhY2htZW50cykge1xuICAgIGVkaXRvci5zaG93QXR0YWNobWVudERpYWxvZyA9IGZhYnJpY2F0b3IoYmluZCgnYXR0YWNobWVudCcsICdjbWQrc2hpZnQraycsIGxpbmtPckltYWdlT3JBdHRhY2htZW50KCdhdHRhY2htZW50JykpKTtcbiAgfVxuICBpZiAob3B0aW9ucy5ocikgeyBiaW5kKCdocicsICdjbWQrbicsIHJvdXRlcignaHInKSk7IH1cblxuICBmdW5jdGlvbiBmYWJyaWNhdG9yIChlbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBvcGVuICgpIHtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoZWwsICdjbGljaycpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gYm9sZCAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0uYm9sZE9ySXRhbGljKGNodW5rcywgJ2JvbGQnKTtcbiAgfVxuICBmdW5jdGlvbiBpdGFsaWMgKG1vZGUsIGNodW5rcykge1xuICAgIGNvbW1hbmRzW21vZGVdLmJvbGRPckl0YWxpYyhjaHVua3MsICdpdGFsaWMnKTtcbiAgfVxuICBmdW5jdGlvbiBjb2RlIChtb2RlLCBjaHVua3MpIHtcbiAgICBjb21tYW5kc1ttb2RlXS5jb2RlYmxvY2soY2h1bmtzLCB7IGZlbmNpbmc6IG9wdGlvbnMuZmVuY2luZyB9KTtcbiAgfVxuICBmdW5jdGlvbiB1bCAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0ubGlzdChjaHVua3MsIGZhbHNlKTtcbiAgfVxuICBmdW5jdGlvbiBvbCAobW9kZSwgY2h1bmtzKSB7XG4gICAgY29tbWFuZHNbbW9kZV0ubGlzdChjaHVua3MsIHRydWUpO1xuICB9XG4gIGZ1bmN0aW9uIGxpbmtPckltYWdlT3JBdHRhY2htZW50ICh0eXBlLCBhdXRvVXBsb2FkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGxpbmtPckltYWdlT3JBdHRhY2htZW50SW52b2tlIChtb2RlLCBjaHVua3MpIHtcbiAgICAgIGNvbW1hbmRzW21vZGVdLmxpbmtPckltYWdlT3JBdHRhY2htZW50LmNhbGwodGhpcywgY2h1bmtzLCB7XG4gICAgICAgIGVkaXRvcjogZWRpdG9yLFxuICAgICAgICBtb2RlOiBtb2RlLFxuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBzdXJmYWNlOiBzdXJmYWNlLFxuICAgICAgICBwcm9tcHRzOiBvcHRpb25zLnByb21wdHMsXG4gICAgICAgIHVwbG9hZDogb3B0aW9uc1t0eXBlICsgJ3MnXSxcbiAgICAgICAgY2xhc3Nlczogb3B0aW9ucy5jbGFzc2VzLFxuICAgICAgICBtZXJnZUh0bWxBbmRBdHRhY2htZW50OiBvcHRpb25zLm1lcmdlSHRtbEFuZEF0dGFjaG1lbnQgfHwgbWVyZ2VIdG1sQW5kQXR0YWNobWVudCxcbiAgICAgICAgYXV0b1VwbG9hZDogYXV0b1VwbG9hZFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBiaW5kIChpZCwgY29tYm8sIGZuKSB7XG4gICAgcmV0dXJuIGVkaXRvci5hZGRDb21tYW5kQnV0dG9uKGlkLCBjb21ibywgc3VwcHJlc3MoZm4pKTtcbiAgfVxuICBmdW5jdGlvbiBtZXJnZUh0bWxBbmRBdHRhY2htZW50IChjaHVua3MsIGxpbmspIHtcbiAgICB2YXIgbGlua1RleHQgPSBjaHVua3Muc2VsZWN0aW9uIHx8IGxpbmsudGl0bGU7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJlZm9yZTogY2h1bmtzLmJlZm9yZSxcbiAgICAgIHNlbGVjdGlvbjogJzxhIGhyZWY9XCInICsgbGluay5ocmVmICsgJ1wiPicgKyBsaW5rVGV4dCArICc8L2E+JyxcbiAgICAgIGFmdGVyOiBjaHVua3MuYWZ0ZXIsXG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiByb3V0ZXIgKG1ldGhvZCkge1xuICAgIHJldHVybiBmdW5jdGlvbiByb3V0ZWQgKG1vZGUsIGNodW5rcykgeyBjb21tYW5kc1ttb2RlXVttZXRob2RdLmNhbGwodGhpcywgY2h1bmtzKTsgfTtcbiAgfVxuICBmdW5jdGlvbiBzdG9wIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG4gIGZ1bmN0aW9uIHN1cHByZXNzIChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiBzdXBwcmVzc29yIChlLCBtb2RlLCBjaHVua3MpIHsgc3RvcChlKTsgZm4uY2FsbCh0aGlzLCBtb2RlLCBjaHVua3MpOyB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZENvbW1hbmRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjYXN0IChjb2xsZWN0aW9uKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGk7XG4gIHZhciBsZW4gPSBjb2xsZWN0aW9uLmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgcmVzdWx0LnB1c2goY29sbGVjdGlvbltpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYXN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmlucHV0ID0gL15cXHMqKC4qPykoPzpcXHMrXCIoLispXCIpP1xccyokLztcbnZhciByZnVsbCA9IC9eKD86aHR0cHM/fGZ0cCk6XFwvXFwvLztcblxuZnVuY3Rpb24gcGFyc2VMaW5rSW5wdXQgKGlucHV0KSB7XG4gIHJldHVybiBwYXJzZXIuYXBwbHkobnVsbCwgaW5wdXQubWF0Y2gocmlucHV0KSk7XG5cbiAgZnVuY3Rpb24gcGFyc2VyIChhbGwsIGxpbmssIHRpdGxlKSB7XG4gICAgdmFyIGhyZWYgPSBsaW5rLnJlcGxhY2UoL1xcPy4qJC8sIHF1ZXJ5VW5lbmNvZGVkUmVwbGFjZXIpO1xuICAgIGhyZWYgPSBkZWNvZGVVUklDb21wb25lbnQoaHJlZik7XG4gICAgaHJlZiA9IGVuY29kZVVSSShocmVmKS5yZXBsYWNlKC8nL2csICclMjcnKS5yZXBsYWNlKC9cXCgvZywgJyUyOCcpLnJlcGxhY2UoL1xcKS9nLCAnJTI5Jyk7XG4gICAgaHJlZiA9IGhyZWYucmVwbGFjZSgvXFw/LiokLywgcXVlcnlFbmNvZGVkUmVwbGFjZXIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhyZWY6IGZvcm1hdEhyZWYoaHJlZiksIHRpdGxlOiBmb3JtYXRUaXRsZSh0aXRsZSlcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5VW5lbmNvZGVkUmVwbGFjZXIgKHF1ZXJ5KSB7XG4gIHJldHVybiBxdWVyeS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbn1cblxuZnVuY3Rpb24gcXVlcnlFbmNvZGVkUmVwbGFjZXIgKHF1ZXJ5KSB7XG4gIHJldHVybiBxdWVyeS5yZXBsYWNlKC9cXCsvZywgJyUyYicpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUaXRsZSAodGl0bGUpIHtcbiAgaWYgKCF0aXRsZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHRpdGxlXG4gICAgLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0SHJlZiAodXJsKSB7XG4gIHZhciBocmVmID0gdXJsLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgaWYgKGhyZWYubGVuZ3RoICYmIGhyZWZbMF0gIT09ICcvJyAmJiAhcmZ1bGwudGVzdChocmVmKSkge1xuICAgIHJldHVybiAnaHR0cDovLycgKyBocmVmO1xuICB9XG4gIHJldHVybiBocmVmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlTGlua0lucHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB0cmltIChyZW1vdmUpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmIChyZW1vdmUpIHtcbiAgICBiZWZvcmVSZXBsYWNlciA9IGFmdGVyUmVwbGFjZXIgPSAnJztcbiAgfVxuICBzZWxmLnNlbGVjdGlvbiA9IHNlbGYuc2VsZWN0aW9uLnJlcGxhY2UoL14oXFxzKikvLCBiZWZvcmVSZXBsYWNlcikucmVwbGFjZSgvKFxccyopJC8sIGFmdGVyUmVwbGFjZXIpO1xuXG4gIGZ1bmN0aW9uIGJlZm9yZVJlcGxhY2VyICh0ZXh0KSB7XG4gICAgc2VsZi5iZWZvcmUgKz0gdGV4dDsgcmV0dXJuICcnO1xuICB9XG4gIGZ1bmN0aW9uIGFmdGVyUmVwbGFjZXIgKHRleHQpIHtcbiAgICBzZWxmLmFmdGVyID0gdGV4dCArIHNlbGYuYWZ0ZXI7IHJldHVybiAnJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBydHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xudmFyIHJzcGFjZXMgPSAvXFxzKy9nO1xuXG5mdW5jdGlvbiBhZGRDbGFzcyAoZWwsIGNscykge1xuICB2YXIgY3VycmVudCA9IGVsLmNsYXNzTmFtZTtcbiAgaWYgKGN1cnJlbnQuaW5kZXhPZihjbHMpID09PSAtMSkge1xuICAgIGVsLmNsYXNzTmFtZSA9IChjdXJyZW50ICsgJyAnICsgY2xzKS5yZXBsYWNlKHJ0cmltLCAnJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm1DbGFzcyAoZWwsIGNscykge1xuICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShjbHMsICcnKS5yZXBsYWNlKHJ0cmltLCAnJykucmVwbGFjZShyc3BhY2VzLCAnICcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkOiBhZGRDbGFzcyxcbiAgcm06IHJtQ2xhc3Ncbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGV4dGVuZFJlZ0V4cCAocmVnZXgsIHByZSwgcG9zdCkge1xuICB2YXIgcGF0dGVybiA9IHJlZ2V4LnRvU3RyaW5nKCk7XG4gIHZhciBmbGFncztcblxuICBwYXR0ZXJuID0gcGF0dGVybi5yZXBsYWNlKC9cXC8oW2dpbV0qKSQvLCBjYXB0dXJlRmxhZ3MpO1xuICBwYXR0ZXJuID0gcGF0dGVybi5yZXBsYWNlKC8oXlxcL3xcXC8kKS9nLCAnJyk7XG4gIHBhdHRlcm4gPSBwcmUgKyBwYXR0ZXJuICsgcG9zdDtcbiAgcmV0dXJuIG5ldyBSZWdFeHAocGF0dGVybiwgZmxhZ3MpO1xuXG4gIGZ1bmN0aW9uIGNhcHR1cmVGbGFncyAoYWxsLCBmKSB7XG4gICAgZmxhZ3MgPSBmO1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFJlZ0V4cDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZml4RU9MICh0ZXh0KSB7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJykucmVwbGFjZSgvXFxyL2csICdcXG4nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaXhFT0w7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBJbnB1dFN0YXRlID0gcmVxdWlyZSgnLi9JbnB1dFN0YXRlJyk7XG5cbmZ1bmN0aW9uIGdldENvbW1hbmRIYW5kbGVyIChzdXJmYWNlLCBoaXN0b3J5LCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlQ29tbWFuZCAoZSkge1xuICAgIHN1cmZhY2UuZm9jdXMoaGlzdG9yeS5pbnB1dE1vZGUpO1xuICAgIGhpc3Rvcnkuc2V0Q29tbWFuZE1vZGUoKTtcblxuICAgIHZhciBzdGF0ZSA9IG5ldyBJbnB1dFN0YXRlKHN1cmZhY2UsIGhpc3RvcnkuaW5wdXRNb2RlKTtcbiAgICB2YXIgY2h1bmtzID0gc3RhdGUuZ2V0Q2h1bmtzKCk7XG4gICAgdmFyIGFzeW5jSGFuZGxlciA9IHtcbiAgICAgIGFzeW5jOiBhc3luYywgaW1tZWRpYXRlOiB0cnVlXG4gICAgfTtcblxuICAgIGZuLmNhbGwoYXN5bmNIYW5kbGVyLCBlLCBoaXN0b3J5LmlucHV0TW9kZSwgY2h1bmtzKTtcblxuICAgIGlmIChhc3luY0hhbmRsZXIuaW1tZWRpYXRlKSB7XG4gICAgICBkb25lKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXN5bmMgKCkge1xuICAgICAgYXN5bmNIYW5kbGVyLmltbWVkaWF0ZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGRvbmU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9uZSAoKSB7XG4gICAgICBzdXJmYWNlLmZvY3VzKGhpc3RvcnkuaW5wdXRNb2RlKTtcbiAgICAgIHN0YXRlLnNldENodW5rcyhjaHVua3MpO1xuICAgICAgc3RhdGUucmVzdG9yZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRDb21tYW5kSGFuZGxlcjtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBzZWxlY2Npb24gPSByZXF1aXJlKCdzZWxlY2Npb24nKTtcbnZhciBmaXhFT0wgPSByZXF1aXJlKCcuL2ZpeEVPTCcpO1xudmFyIG1hbnkgPSByZXF1aXJlKCcuL21hbnknKTtcbnZhciBjYXN0ID0gcmVxdWlyZSgnLi9jYXN0Jyk7XG52YXIgZ2V0U2VsZWN0aW9uID0gc2VsZWNjaW9uLmdldDtcbnZhciBzZXRTZWxlY3Rpb24gPSBzZWxlY2Npb24uc2V0O1xudmFyIHJvcGVuID0gL14oPFtePl0rKD86IFtePl0qKT8+KS87XG52YXIgcmNsb3NlID0gLyg8XFwvW14+XSs+KSQvO1xuXG5mdW5jdGlvbiBzdXJmYWNlICh0ZXh0YXJlYSwgZWRpdGFibGUsIGRyb3BhcmVhKSB7XG4gIHJldHVybiB7XG4gICAgdGV4dGFyZWE6IHRleHRhcmVhLFxuICAgIGVkaXRhYmxlOiBlZGl0YWJsZSxcbiAgICBkcm9wYXJlYTogZHJvcGFyZWEsXG4gICAgZm9jdXM6IHNldEZvY3VzLFxuICAgIHJlYWQ6IHJlYWQsXG4gICAgd3JpdGU6IHdyaXRlLFxuICAgIGN1cnJlbnQ6IGN1cnJlbnQsXG4gICAgd3JpdGVTZWxlY3Rpb246IHdyaXRlU2VsZWN0aW9uLFxuICAgIHJlYWRTZWxlY3Rpb246IHJlYWRTZWxlY3Rpb25cbiAgfTtcblxuICBmdW5jdGlvbiBzZXRGb2N1cyAobW9kZSkge1xuICAgIGN1cnJlbnQobW9kZSkuZm9jdXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGN1cnJlbnQgKG1vZGUpIHtcbiAgICByZXR1cm4gbW9kZSA9PT0gJ3d5c2l3eWcnID8gZWRpdGFibGUgOiB0ZXh0YXJlYTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKG1vZGUpIHtcbiAgICBpZiAobW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICByZXR1cm4gZWRpdGFibGUuaW5uZXJIVE1MO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dGFyZWEudmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZSAobW9kZSwgdmFsdWUpIHtcbiAgICBpZiAobW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGV4dGFyZWEudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZVNlbGVjdGlvbiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUubW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICB3cml0ZVNlbGVjdGlvbkVkaXRhYmxlKHN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JpdGVTZWxlY3Rpb25UZXh0YXJlYShzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFNlbGVjdGlvbiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUubW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICByZWFkU2VsZWN0aW9uRWRpdGFibGUoc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFkU2VsZWN0aW9uVGV4dGFyZWEoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlU2VsZWN0aW9uVGV4dGFyZWEgKHN0YXRlKSB7XG4gICAgdmFyIHJhbmdlO1xuICAgIGlmICh0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydCAhPT0gdm9pZCAwKSB7XG4gICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgPSBzdGF0ZS5zdGFydDtcbiAgICAgIHRleHRhcmVhLnNlbGVjdGlvbkVuZCA9IHN0YXRlLmVuZDtcbiAgICAgIHRleHRhcmVhLnNjcm9sbFRvcCA9IHN0YXRlLnNjcm9sbFRvcDtcbiAgICB9IGVsc2UgaWYgKGRvYy5zZWxlY3Rpb24pIHtcbiAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCAmJiBkb2MuYWN0aXZlRWxlbWVudCAhPT0gdGV4dGFyZWEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgIHJhbmdlID0gdGV4dGFyZWEuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC10ZXh0YXJlYS52YWx1ZS5sZW5ndGgpO1xuICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgLXRleHRhcmVhLnZhbHVlLmxlbmd0aCk7XG4gICAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBzdGF0ZS5lbmQpO1xuICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCBzdGF0ZS5zdGFydCk7XG4gICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU2VsZWN0aW9uVGV4dGFyZWEgKHN0YXRlKSB7XG4gICAgaWYgKHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ICE9PSB2b2lkIDApIHtcbiAgICAgIHN0YXRlLnN0YXJ0ID0gdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICBzdGF0ZS5lbmQgPSB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQ7XG4gICAgfSBlbHNlIGlmIChkb2Muc2VsZWN0aW9uKSB7XG4gICAgICBhbmNpZW50bHlSZWFkU2VsZWN0aW9uVGV4dGFyZWEoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFuY2llbnRseVJlYWRTZWxlY3Rpb25UZXh0YXJlYSAoc3RhdGUpIHtcbiAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgIT09IHRleHRhcmVhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RhdGUudGV4dCA9IGZpeEVPTCh0ZXh0YXJlYS52YWx1ZSk7XG5cbiAgICB2YXIgcmFuZ2UgPSBkb2Muc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgdmFyIGZpeGVkUmFuZ2UgPSBmaXhFT0wocmFuZ2UudGV4dCk7XG4gICAgdmFyIG1hcmtlciA9ICdcXHgwNyc7XG4gICAgdmFyIG1hcmtlZFJhbmdlID0gbWFya2VyICsgZml4ZWRSYW5nZSArIG1hcmtlcjtcblxuICAgIHJhbmdlLnRleHQgPSBtYXJrZWRSYW5nZTtcblxuICAgIHZhciBpbnB1dFRleHQgPSBmaXhFT0wodGV4dGFyZWEudmFsdWUpO1xuXG4gICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtbWFya2VkUmFuZ2UubGVuZ3RoKTtcbiAgICByYW5nZS50ZXh0ID0gZml4ZWRSYW5nZTtcbiAgICBzdGF0ZS5zdGFydCA9IGlucHV0VGV4dC5pbmRleE9mKG1hcmtlcik7XG4gICAgc3RhdGUuZW5kID0gaW5wdXRUZXh0Lmxhc3RJbmRleE9mKG1hcmtlcikgLSBtYXJrZXIubGVuZ3RoO1xuXG4gICAgdmFyIGRpZmYgPSBzdGF0ZS50ZXh0Lmxlbmd0aCAtIGZpeEVPTCh0ZXh0YXJlYS52YWx1ZSkubGVuZ3RoO1xuICAgIGlmIChkaWZmKSB7XG4gICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC1maXhlZFJhbmdlLmxlbmd0aCk7XG4gICAgICBmaXhlZFJhbmdlICs9IG1hbnkoJ1xcbicsIGRpZmYpO1xuICAgICAgc3RhdGUuZW5kICs9IGRpZmY7XG4gICAgICByYW5nZS50ZXh0ID0gZml4ZWRSYW5nZTtcbiAgICB9XG4gICAgc3RhdGUuc2VsZWN0KCk7XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZVNlbGVjdGlvbkVkaXRhYmxlIChzdGF0ZSkge1xuICAgIHZhciBjaHVua3MgPSBzdGF0ZS5jYWNoZWRDaHVua3MgfHwgc3RhdGUuZ2V0Q2h1bmtzKCk7XG4gICAgdmFyIHN0YXJ0ID0gY2h1bmtzLmJlZm9yZS5sZW5ndGg7XG4gICAgdmFyIGVuZCA9IHN0YXJ0ICsgY2h1bmtzLnNlbGVjdGlvbi5sZW5ndGg7XG4gICAgdmFyIHAgPSB7fTtcblxuICAgIHdhbGsoZWRpdGFibGUuZmlyc3RDaGlsZCwgcGVlayk7XG4gICAgZWRpdGFibGUuZm9jdXMoKTtcbiAgICBzZXRTZWxlY3Rpb24ocCk7XG5cbiAgICBmdW5jdGlvbiBwZWVrIChjb250ZXh0LCBlbCkge1xuICAgICAgdmFyIGN1cnNvciA9IGNvbnRleHQudGV4dC5sZW5ndGg7XG4gICAgICB2YXIgY29udGVudCA9IHJlYWROb2RlKGVsKS5sZW5ndGg7XG4gICAgICB2YXIgc3VtID0gY3Vyc29yICsgY29udGVudDtcbiAgICAgIGlmICghcC5zdGFydENvbnRhaW5lciAmJiBzdW0gPj0gc3RhcnQpIHtcbiAgICAgICAgcC5zdGFydENvbnRhaW5lciA9IGVsO1xuICAgICAgICBwLnN0YXJ0T2Zmc2V0ID0gYm91bmRlZChzdGFydCAtIGN1cnNvcik7XG4gICAgICB9XG4gICAgICBpZiAoIXAuZW5kQ29udGFpbmVyICYmIHN1bSA+PSBlbmQpIHtcbiAgICAgICAgcC5lbmRDb250YWluZXIgPSBlbDtcbiAgICAgICAgcC5lbmRPZmZzZXQgPSBib3VuZGVkKGVuZCAtIGN1cnNvcik7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGJvdW5kZWQgKG9mZnNldCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oY29udGVudCwgb2Zmc2V0KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFNlbGVjdGlvbkVkaXRhYmxlIChzdGF0ZSkge1xuICAgIHZhciBzZWwgPSBnZXRTZWxlY3Rpb24oKTtcbiAgICB2YXIgZGlzdGFuY2UgPSB3YWxrKGVkaXRhYmxlLmZpcnN0Q2hpbGQsIHBlZWspO1xuICAgIHZhciBzdGFydCA9IGRpc3RhbmNlLnN0YXJ0IHx8IDA7XG4gICAgdmFyIGVuZCA9IGRpc3RhbmNlLmVuZCB8fCAwO1xuXG4gICAgc3RhdGUudGV4dCA9IGRpc3RhbmNlLnRleHQ7XG5cbiAgICBpZiAoZW5kID4gc3RhcnQpIHtcbiAgICAgIHN0YXRlLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICBzdGF0ZS5lbmQgPSBlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnN0YXJ0ID0gZW5kO1xuICAgICAgc3RhdGUuZW5kID0gc3RhcnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGVlayAoY29udGV4dCwgZWwpIHtcbiAgICAgIGlmIChlbCA9PT0gc2VsLmFuY2hvck5vZGUpIHtcbiAgICAgICAgY29udGV4dC5zdGFydCA9IGNvbnRleHQudGV4dC5sZW5ndGggKyBzZWwuYW5jaG9yT2Zmc2V0O1xuICAgICAgfVxuICAgICAgaWYgKGVsID09PSBzZWwuZm9jdXNOb2RlKSB7XG4gICAgICAgIGNvbnRleHQuZW5kID0gY29udGV4dC50ZXh0Lmxlbmd0aCArIHNlbC5mb2N1c09mZnNldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3YWxrIChlbCwgcGVlaywgY3R4LCBzaWJsaW5ncykge1xuICAgIHZhciBjb250ZXh0ID0gY3R4IHx8IHsgdGV4dDogJycgfTtcblxuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cblxuICAgIHZhciBlbE5vZGUgPSBlbC5ub2RlVHlwZSA9PT0gMTtcbiAgICB2YXIgdGV4dE5vZGUgPSBlbC5ub2RlVHlwZSA9PT0gMztcblxuICAgIHBlZWsoY29udGV4dCwgZWwpO1xuXG4gICAgaWYgKHRleHROb2RlKSB7XG4gICAgICBjb250ZXh0LnRleHQgKz0gcmVhZE5vZGUoZWwpO1xuICAgIH1cbiAgICBpZiAoZWxOb2RlKSB7XG4gICAgICBpZiAoZWwub3V0ZXJIVE1MLm1hdGNoKHJvcGVuKSkgeyBjb250ZXh0LnRleHQgKz0gUmVnRXhwLiQxOyB9XG4gICAgICBjYXN0KGVsLmNoaWxkTm9kZXMpLmZvckVhY2god2Fsa0NoaWxkcmVuKTtcbiAgICAgIGlmIChlbC5vdXRlckhUTUwubWF0Y2gocmNsb3NlKSkgeyBjb250ZXh0LnRleHQgKz0gUmVnRXhwLiQxOyB9XG4gICAgfVxuICAgIGlmIChzaWJsaW5ncyAhPT0gZmFsc2UgJiYgZWwubmV4dFNpYmxpbmcpIHtcbiAgICAgIHJldHVybiB3YWxrKGVsLm5leHRTaWJsaW5nLCBwZWVrLCBjb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG5cbiAgICBmdW5jdGlvbiB3YWxrQ2hpbGRyZW4gKGNoaWxkKSB7XG4gICAgICB3YWxrKGNoaWxkLCBwZWVrLCBjb250ZXh0LCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZE5vZGUgKGVsKSB7XG4gICAgcmV0dXJuIGVsLm5vZGVUeXBlID09PSAzID8gZml4RU9MKGVsLnRleHRDb250ZW50IHx8IGVsLmlubmVyVGV4dCB8fCAnJykgOiAnJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1cmZhY2U7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OW5aWFJUZFhKbVlXTmxMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ1pHOWpJRDBnWjJ4dlltRnNMbVJ2WTNWdFpXNTBPMXh1ZG1GeUlITmxiR1ZqWTJsdmJpQTlJSEpsY1hWcGNtVW9KM05sYkdWalkybHZiaWNwTzF4dWRtRnlJR1pwZUVWUFRDQTlJSEpsY1hWcGNtVW9KeTR2Wm1sNFJVOU1KeWs3WEc1MllYSWdiV0Z1ZVNBOUlISmxjWFZwY21Vb0p5NHZiV0Z1ZVNjcE8xeHVkbUZ5SUdOaGMzUWdQU0J5WlhGMWFYSmxLQ2N1TDJOaGMzUW5LVHRjYm5aaGNpQm5aWFJUWld4bFkzUnBiMjRnUFNCelpXeGxZMk5wYjI0dVoyVjBPMXh1ZG1GeUlITmxkRk5sYkdWamRHbHZiaUE5SUhObGJHVmpZMmx2Ymk1elpYUTdYRzUyWVhJZ2NtOXdaVzRnUFNBdlhpZzhXMTQrWFNzb1B6b2dXMTQrWFNvcFB6NHBMenRjYm5aaGNpQnlZMnh2YzJVZ1BTQXZLRHhjWEM5YlhqNWRLejRwSkM4N1hHNWNibVoxYm1OMGFXOXVJSE4xY21aaFkyVWdLSFJsZUhSaGNtVmhMQ0JsWkdsMFlXSnNaU3dnWkhKdmNHRnlaV0VwSUh0Y2JpQWdjbVYwZFhKdUlIdGNiaUFnSUNCMFpYaDBZWEpsWVRvZ2RHVjRkR0Z5WldFc1hHNGdJQ0FnWldScGRHRmliR1U2SUdWa2FYUmhZbXhsTEZ4dUlDQWdJR1J5YjNCaGNtVmhPaUJrY205d1lYSmxZU3hjYmlBZ0lDQm1iMk4xY3pvZ2MyVjBSbTlqZFhNc1hHNGdJQ0FnY21WaFpEb2djbVZoWkN4Y2JpQWdJQ0IzY21sMFpUb2dkM0pwZEdVc1hHNGdJQ0FnWTNWeWNtVnVkRG9nWTNWeWNtVnVkQ3hjYmlBZ0lDQjNjbWwwWlZObGJHVmpkR2x2YmpvZ2QzSnBkR1ZUWld4bFkzUnBiMjRzWEc0Z0lDQWdjbVZoWkZObGJHVmpkR2x2YmpvZ2NtVmhaRk5sYkdWamRHbHZibHh1SUNCOU8xeHVYRzRnSUdaMWJtTjBhVzl1SUhObGRFWnZZM1Z6SUNodGIyUmxLU0I3WEc0Z0lDQWdZM1Z5Y21WdWRDaHRiMlJsS1M1bWIyTjFjeWdwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1kzVnljbVZ1ZENBb2JXOWtaU2tnZTF4dUlDQWdJSEpsZEhWeWJpQnRiMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y2dQeUJsWkdsMFlXSnNaU0E2SUhSbGVIUmhjbVZoTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2NtVmhaQ0FvYlc5a1pTa2dlMXh1SUNBZ0lHbG1JQ2h0YjJSbElEMDlQU0FuZDNsemFYZDVaeWNwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJsWkdsMFlXSnNaUzVwYm01bGNraFVUVXc3WEc0Z0lDQWdmVnh1SUNBZ0lISmxkSFZ5YmlCMFpYaDBZWEpsWVM1MllXeDFaVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkeWFYUmxJQ2h0YjJSbExDQjJZV3gxWlNrZ2UxeHVJQ0FnSUdsbUlDaHRiMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y3BJSHRjYmlBZ0lDQWdJR1ZrYVhSaFlteGxMbWx1Ym1WeVNGUk5UQ0E5SUhaaGJIVmxPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCMFpYaDBZWEpsWVM1MllXeDFaU0E5SUhaaGJIVmxPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSGR5YVhSbFUyVnNaV04wYVc5dUlDaHpkR0YwWlNrZ2UxeHVJQ0FnSUdsbUlDaHpkR0YwWlM1dGIyUmxJRDA5UFNBbmQzbHphWGQ1WnljcElIdGNiaUFnSUNBZ0lIZHlhWFJsVTJWc1pXTjBhVzl1UldScGRHRmliR1VvYzNSaGRHVXBPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCM2NtbDBaVk5sYkdWamRHbHZibFJsZUhSaGNtVmhLSE4wWVhSbEtUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVTJWc1pXTjBhVzl1SUNoemRHRjBaU2tnZTF4dUlDQWdJR2xtSUNoemRHRjBaUzV0YjJSbElEMDlQU0FuZDNsemFYZDVaeWNwSUh0Y2JpQWdJQ0FnSUhKbFlXUlRaV3hsWTNScGIyNUZaR2wwWVdKc1pTaHpkR0YwWlNrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSEpsWVdSVFpXeGxZM1JwYjI1VVpYaDBZWEpsWVNoemRHRjBaU2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnZDNKcGRHVlRaV3hsWTNScGIyNVVaWGgwWVhKbFlTQW9jM1JoZEdVcElIdGNiaUFnSUNCMllYSWdjbUZ1WjJVN1hHNGdJQ0FnYVdZZ0tIUmxlSFJoY21WaExuTmxiR1ZqZEdsdmJsTjBZWEowSUNFOVBTQjJiMmxrSURBcElIdGNiaUFnSUNBZ0lIUmxlSFJoY21WaExtWnZZM1Z6S0NrN1hHNGdJQ0FnSUNCMFpYaDBZWEpsWVM1elpXeGxZM1JwYjI1VGRHRnlkQ0E5SUhOMFlYUmxMbk4wWVhKME8xeHVJQ0FnSUNBZ2RHVjRkR0Z5WldFdWMyVnNaV04wYVc5dVJXNWtJRDBnYzNSaGRHVXVaVzVrTzF4dUlDQWdJQ0FnZEdWNGRHRnlaV0V1YzJOeWIyeHNWRzl3SUQwZ2MzUmhkR1V1YzJOeWIyeHNWRzl3TzF4dUlDQWdJSDBnWld4elpTQnBaaUFvWkc5akxuTmxiR1ZqZEdsdmJpa2dlMXh1SUNBZ0lDQWdhV1lnS0dSdll5NWhZM1JwZG1WRmJHVnRaVzUwSUNZbUlHUnZZeTVoWTNScGRtVkZiR1Z0Wlc1MElDRTlQU0IwWlhoMFlYSmxZU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0IwWlhoMFlYSmxZUzVtYjJOMWN5Z3BPMXh1SUNBZ0lDQWdjbUZ1WjJVZ1BTQjBaWGgwWVhKbFlTNWpjbVZoZEdWVVpYaDBVbUZ1WjJVb0tUdGNiaUFnSUNBZ0lISmhibWRsTG0xdmRtVlRkR0Z5ZENnblkyaGhjbUZqZEdWeUp5d2dMWFJsZUhSaGNtVmhMblpoYkhWbExteGxibWQwYUNrN1hHNGdJQ0FnSUNCeVlXNW5aUzV0YjNabFJXNWtLQ2RqYUdGeVlXTjBaWEluTENBdGRHVjRkR0Z5WldFdWRtRnNkV1V1YkdWdVozUm9LVHRjYmlBZ0lDQWdJSEpoYm1kbExtMXZkbVZGYm1Rb0oyTm9ZWEpoWTNSbGNpY3NJSE4wWVhSbExtVnVaQ2s3WEc0Z0lDQWdJQ0J5WVc1blpTNXRiM1psVTNSaGNuUW9KMk5vWVhKaFkzUmxjaWNzSUhOMFlYUmxMbk4wWVhKMEtUdGNiaUFnSUNBZ0lISmhibWRsTG5ObGJHVmpkQ2dwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhKbFlXUlRaV3hsWTNScGIyNVVaWGgwWVhKbFlTQW9jM1JoZEdVcElIdGNiaUFnSUNCcFppQW9kR1Y0ZEdGeVpXRXVjMlZzWldOMGFXOXVVM1JoY25RZ0lUMDlJSFp2YVdRZ01Da2dlMXh1SUNBZ0lDQWdjM1JoZEdVdWMzUmhjblFnUFNCMFpYaDBZWEpsWVM1elpXeGxZM1JwYjI1VGRHRnlkRHRjYmlBZ0lDQWdJSE4wWVhSbExtVnVaQ0E5SUhSbGVIUmhjbVZoTG5ObGJHVmpkR2x2YmtWdVpEdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHUnZZeTV6Wld4bFkzUnBiMjRwSUh0Y2JpQWdJQ0FnSUdGdVkybGxiblJzZVZKbFlXUlRaV3hsWTNScGIyNVVaWGgwWVhKbFlTaHpkR0YwWlNrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1lXNWphV1Z1ZEd4NVVtVmhaRk5sYkdWamRHbHZibFJsZUhSaGNtVmhJQ2h6ZEdGMFpTa2dlMXh1SUNBZ0lHbG1JQ2hrYjJNdVlXTjBhWFpsUld4bGJXVnVkQ0FtSmlCa2IyTXVZV04wYVhabFJXeGxiV1Z1ZENBaFBUMGdkR1Y0ZEdGeVpXRXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNWNiaUFnSUNCemRHRjBaUzUwWlhoMElEMGdabWw0UlU5TUtIUmxlSFJoY21WaExuWmhiSFZsS1R0Y2JseHVJQ0FnSUhaaGNpQnlZVzVuWlNBOUlHUnZZeTV6Wld4bFkzUnBiMjR1WTNKbFlYUmxVbUZ1WjJVb0tUdGNiaUFnSUNCMllYSWdabWw0WldSU1lXNW5aU0E5SUdacGVFVlBUQ2h5WVc1blpTNTBaWGgwS1R0Y2JpQWdJQ0IyWVhJZ2JXRnlhMlZ5SUQwZ0oxeGNlREEzSnp0Y2JpQWdJQ0IyWVhJZ2JXRnlhMlZrVW1GdVoyVWdQU0J0WVhKclpYSWdLeUJtYVhobFpGSmhibWRsSUNzZ2JXRnlhMlZ5TzF4dVhHNGdJQ0FnY21GdVoyVXVkR1Y0ZENBOUlHMWhjbXRsWkZKaGJtZGxPMXh1WEc0Z0lDQWdkbUZ5SUdsdWNIVjBWR1Y0ZENBOUlHWnBlRVZQVENoMFpYaDBZWEpsWVM1MllXeDFaU2s3WEc1Y2JpQWdJQ0J5WVc1blpTNXRiM1psVTNSaGNuUW9KMk5vWVhKaFkzUmxjaWNzSUMxdFlYSnJaV1JTWVc1blpTNXNaVzVuZEdncE8xeHVJQ0FnSUhKaGJtZGxMblJsZUhRZ1BTQm1hWGhsWkZKaGJtZGxPMXh1SUNBZ0lITjBZWFJsTG5OMFlYSjBJRDBnYVc1d2RYUlVaWGgwTG1sdVpHVjRUMllvYldGeWEyVnlLVHRjYmlBZ0lDQnpkR0YwWlM1bGJtUWdQU0JwYm5CMWRGUmxlSFF1YkdGemRFbHVaR1Y0VDJZb2JXRnlhMlZ5S1NBdElHMWhjbXRsY2k1c1pXNW5kR2c3WEc1Y2JpQWdJQ0IyWVhJZ1pHbG1aaUE5SUhOMFlYUmxMblJsZUhRdWJHVnVaM1JvSUMwZ1ptbDRSVTlNS0hSbGVIUmhjbVZoTG5aaGJIVmxLUzVzWlc1bmRHZzdYRzRnSUNBZ2FXWWdLR1JwWm1ZcElIdGNiaUFnSUNBZ0lISmhibWRsTG0xdmRtVlRkR0Z5ZENnblkyaGhjbUZqZEdWeUp5d2dMV1pwZUdWa1VtRnVaMlV1YkdWdVozUm9LVHRjYmlBZ0lDQWdJR1pwZUdWa1VtRnVaMlVnS3owZ2JXRnVlU2duWEZ4dUp5d2daR2xtWmlrN1hHNGdJQ0FnSUNCemRHRjBaUzVsYm1RZ0t6MGdaR2xtWmp0Y2JpQWdJQ0FnSUhKaGJtZGxMblJsZUhRZ1BTQm1hWGhsWkZKaGJtZGxPMXh1SUNBZ0lIMWNiaUFnSUNCemRHRjBaUzV6Wld4bFkzUW9LVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkeWFYUmxVMlZzWldOMGFXOXVSV1JwZEdGaWJHVWdLSE4wWVhSbEtTQjdYRzRnSUNBZ2RtRnlJR05vZFc1cmN5QTlJSE4wWVhSbExtTmhZMmhsWkVOb2RXNXJjeUI4ZkNCemRHRjBaUzVuWlhSRGFIVnVhM01vS1R0Y2JpQWdJQ0IyWVhJZ2MzUmhjblFnUFNCamFIVnVhM011WW1WbWIzSmxMbXhsYm1kMGFEdGNiaUFnSUNCMllYSWdaVzVrSUQwZ2MzUmhjblFnS3lCamFIVnVhM011YzJWc1pXTjBhVzl1TG14bGJtZDBhRHRjYmlBZ0lDQjJZWElnY0NBOUlIdDlPMXh1WEc0Z0lDQWdkMkZzYXlobFpHbDBZV0pzWlM1bWFYSnpkRU5vYVd4a0xDQndaV1ZyS1R0Y2JpQWdJQ0JsWkdsMFlXSnNaUzVtYjJOMWN5Z3BPMXh1SUNBZ0lITmxkRk5sYkdWamRHbHZiaWh3S1R0Y2JseHVJQ0FnSUdaMWJtTjBhVzl1SUhCbFpXc2dLR052Ym5SbGVIUXNJR1ZzS1NCN1hHNGdJQ0FnSUNCMllYSWdZM1Z5YzI5eUlEMGdZMjl1ZEdWNGRDNTBaWGgwTG14bGJtZDBhRHRjYmlBZ0lDQWdJSFpoY2lCamIyNTBaVzUwSUQwZ2NtVmhaRTV2WkdVb1pXd3BMbXhsYm1kMGFEdGNiaUFnSUNBZ0lIWmhjaUJ6ZFcwZ1BTQmpkWEp6YjNJZ0t5QmpiMjUwWlc1ME8xeHVJQ0FnSUNBZ2FXWWdLQ0Z3TG5OMFlYSjBRMjl1ZEdGcGJtVnlJQ1ltSUhOMWJTQStQU0J6ZEdGeWRDa2dlMXh1SUNBZ0lDQWdJQ0J3TG5OMFlYSjBRMjl1ZEdGcGJtVnlJRDBnWld3N1hHNGdJQ0FnSUNBZ0lIQXVjM1JoY25SUFptWnpaWFFnUFNCaWIzVnVaR1ZrS0hOMFlYSjBJQzBnWTNWeWMyOXlLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR2xtSUNnaGNDNWxibVJEYjI1MFlXbHVaWElnSmlZZ2MzVnRJRDQ5SUdWdVpDa2dlMXh1SUNBZ0lDQWdJQ0J3TG1WdVpFTnZiblJoYVc1bGNpQTlJR1ZzTzF4dUlDQWdJQ0FnSUNCd0xtVnVaRTltWm5ObGRDQTlJR0p2ZFc1a1pXUW9aVzVrSUMwZ1kzVnljMjl5S1R0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ1puVnVZM1JwYjI0Z1ltOTFibVJsWkNBb2IyWm1jMlYwS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCTllYUm9MbTFoZUNnd0xDQk5ZWFJvTG0xcGJpaGpiMjUwWlc1MExDQnZabVp6WlhRcEtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVTJWc1pXTjBhVzl1UldScGRHRmliR1VnS0hOMFlYUmxLU0I3WEc0Z0lDQWdkbUZ5SUhObGJDQTlJR2RsZEZObGJHVmpkR2x2YmlncE8xeHVJQ0FnSUhaaGNpQmthWE4wWVc1alpTQTlJSGRoYkdzb1pXUnBkR0ZpYkdVdVptbHljM1JEYUdsc1pDd2djR1ZsYXlrN1hHNGdJQ0FnZG1GeUlITjBZWEowSUQwZ1pHbHpkR0Z1WTJVdWMzUmhjblFnZkh3Z01EdGNiaUFnSUNCMllYSWdaVzVrSUQwZ1pHbHpkR0Z1WTJVdVpXNWtJSHg4SURBN1hHNWNiaUFnSUNCemRHRjBaUzUwWlhoMElEMGdaR2x6ZEdGdVkyVXVkR1Y0ZER0Y2JseHVJQ0FnSUdsbUlDaGxibVFnUGlCemRHRnlkQ2tnZTF4dUlDQWdJQ0FnYzNSaGRHVXVjM1JoY25RZ1BTQnpkR0Z5ZER0Y2JpQWdJQ0FnSUhOMFlYUmxMbVZ1WkNBOUlHVnVaRHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2MzUmhkR1V1YzNSaGNuUWdQU0JsYm1RN1hHNGdJQ0FnSUNCemRHRjBaUzVsYm1RZ1BTQnpkR0Z5ZER0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUJ3WldWcklDaGpiMjUwWlhoMExDQmxiQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tHVnNJRDA5UFNCelpXd3VZVzVqYUc5eVRtOWtaU2tnZTF4dUlDQWdJQ0FnSUNCamIyNTBaWGgwTG5OMFlYSjBJRDBnWTI5dWRHVjRkQzUwWlhoMExteGxibWQwYUNBcklITmxiQzVoYm1Ob2IzSlBabVp6WlhRN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9aV3dnUFQwOUlITmxiQzVtYjJOMWMwNXZaR1VwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEM1bGJtUWdQU0JqYjI1MFpYaDBMblJsZUhRdWJHVnVaM1JvSUNzZ2MyVnNMbVp2WTNWelQyWm1jMlYwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkaGJHc2dLR1ZzTENCd1pXVnJMQ0JqZEhnc0lITnBZbXhwYm1kektTQjdYRzRnSUNBZ2RtRnlJR052Ym5SbGVIUWdQU0JqZEhnZ2ZId2dleUIwWlhoME9pQW5KeUI5TzF4dVhHNGdJQ0FnYVdZZ0tDRmxiQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR052Ym5SbGVIUTdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2RtRnlJR1ZzVG05a1pTQTlJR1ZzTG01dlpHVlVlWEJsSUQwOVBTQXhPMXh1SUNBZ0lIWmhjaUIwWlhoMFRtOWtaU0E5SUdWc0xtNXZaR1ZVZVhCbElEMDlQU0F6TzF4dVhHNGdJQ0FnY0dWbGF5aGpiMjUwWlhoMExDQmxiQ2s3WEc1Y2JpQWdJQ0JwWmlBb2RHVjRkRTV2WkdVcElIdGNiaUFnSUNBZ0lHTnZiblJsZUhRdWRHVjRkQ0FyUFNCeVpXRmtUbTlrWlNobGJDazdYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaGxiRTV2WkdVcElIdGNiaUFnSUNBZ0lHbG1JQ2hsYkM1dmRYUmxja2hVVFV3dWJXRjBZMmdvY205d1pXNHBLU0I3SUdOdmJuUmxlSFF1ZEdWNGRDQXJQU0JTWldkRmVIQXVKREU3SUgxY2JpQWdJQ0FnSUdOaGMzUW9aV3d1WTJocGJHUk9iMlJsY3lrdVptOXlSV0ZqYUNoM1lXeHJRMmhwYkdSeVpXNHBPMXh1SUNBZ0lDQWdhV1lnS0dWc0xtOTFkR1Z5U0ZSTlRDNXRZWFJqYUNoeVkyeHZjMlVwS1NCN0lHTnZiblJsZUhRdWRHVjRkQ0FyUFNCU1pXZEZlSEF1SkRFN0lIMWNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tITnBZbXhwYm1keklDRTlQU0JtWVd4elpTQW1KaUJsYkM1dVpYaDBVMmxpYkdsdVp5a2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlIZGhiR3NvWld3dWJtVjRkRk5wWW14cGJtY3NJSEJsWldzc0lHTnZiblJsZUhRcE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdZMjl1ZEdWNGREdGNibHh1SUNBZ0lHWjFibU4wYVc5dUlIZGhiR3REYUdsc1pISmxiaUFvWTJocGJHUXBJSHRjYmlBZ0lDQWdJSGRoYkdzb1kyaHBiR1FzSUhCbFpXc3NJR052Ym5SbGVIUXNJR1poYkhObEtUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVG05a1pTQW9aV3dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdaV3d1Ym05a1pWUjVjR1VnUFQwOUlETWdQeUJtYVhoRlQwd29aV3d1ZEdWNGRFTnZiblJsYm5RZ2ZId2daV3d1YVc1dVpYSlVaWGgwSUh4OElDY25LU0E2SUNjbk8xeHVJQ0I5WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjM1Z5Wm1GalpUdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZ2V0VGV4dCAoZWwpIHtcbiAgcmV0dXJuIGVsLmlubmVyVGV4dCB8fCBlbC50ZXh0Q29udGVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUZXh0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHJpbUNodW5rcyA9IHJlcXVpcmUoJy4uL2NodW5rcy90cmltJyk7XG5cbmZ1bmN0aW9uIEh0bWxDaHVua3MgKCkge1xufVxuXG5IdG1sQ2h1bmtzLnByb3RvdHlwZS50cmltID0gdHJpbUNodW5rcztcblxuSHRtbENodW5rcy5wcm90b3R5cGUuZmluZFRhZ3MgPSBmdW5jdGlvbiAoKSB7XG59O1xuXG5IdG1sQ2h1bmtzLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gKCkge1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIdG1sQ2h1bmtzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcblxuZnVuY3Rpb24gYmxvY2txdW90ZSAoY2h1bmtzKSB7XG4gIHdyYXBwaW5nKCdibG9ja3F1b3RlJywgc3RyaW5ncy5wbGFjZWhvbGRlcnMucXVvdGUsIGNodW5rcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmxvY2txdW90ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgd3JhcHBpbmcgPSByZXF1aXJlKCcuL3dyYXBwaW5nJyk7XG5cbmZ1bmN0aW9uIGJvbGRPckl0YWxpYyAoY2h1bmtzLCB0eXBlKSB7XG4gIHdyYXBwaW5nKHR5cGUgPT09ICdib2xkJyA/ICdzdHJvbmcnIDogJ2VtJywgc3RyaW5ncy5wbGFjZWhvbGRlcnNbdHlwZV0sIGNodW5rcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYm9sZE9ySXRhbGljO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciB3cmFwcGluZyA9IHJlcXVpcmUoJy4vd3JhcHBpbmcnKTtcblxuZnVuY3Rpb24gY29kZWJsb2NrIChjaHVua3MpIHtcbiAgd3JhcHBpbmcoJ3ByZT48Y29kZScsIHN0cmluZ3MucGxhY2Vob2xkZXJzLmNvZGUsIGNodW5rcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29kZWJsb2NrO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBybGVhZGluZyA9IC88aChbMS02XSkoIFtePl0qKT8+JC87XG52YXIgcnRyYWlsaW5nID0gL148XFwvaChbMS02XSk+LztcblxuZnVuY3Rpb24gaGVhZGluZyAoY2h1bmtzKSB7XG4gIGNodW5rcy50cmltKCk7XG5cbiAgdmFyIHRyYWlsID0gcnRyYWlsaW5nLmV4ZWMoY2h1bmtzLmFmdGVyKTtcbiAgdmFyIGxlYWQgPSBybGVhZGluZy5leGVjKGNodW5rcy5iZWZvcmUpO1xuICBpZiAobGVhZCAmJiB0cmFpbCAmJiBsZWFkWzFdID09PSB0cmFpbFsxXSkge1xuICAgIHN3YXAoKTtcbiAgfSBlbHNlIHtcbiAgICBhZGQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN3YXAgKCkge1xuICAgIHZhciBsZXZlbCA9IHBhcnNlSW50KGxlYWRbMV0sIDEwKTtcbiAgICB2YXIgbmV4dCA9IGxldmVsIDw9IDEgPyA0IDogbGV2ZWwgLSAxO1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlYWRpbmcsICc8aCcgKyBuZXh0ICsgJz4nKTtcbiAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShydHJhaWxpbmcsICc8L2gnICsgbmV4dCArICc+Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGQgKCkge1xuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmhlYWRpbmc7XG4gICAgfVxuICAgIGNodW5rcy5iZWZvcmUgKz0gJzxoMT4nO1xuICAgIGNodW5rcy5hZnRlciA9ICc8L2gxPicgKyBjaHVua3MuYWZ0ZXI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoZWFkaW5nO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBociAoY2h1bmtzKSB7XG4gIGNodW5rcy5iZWZvcmUgKz0gJ1xcbjxocj5cXG4nO1xuICBjaHVua3Muc2VsZWN0aW9uID0gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBvbmNlID0gcmVxdWlyZSgnLi4vb25jZScpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgcGFyc2VMaW5rSW5wdXQgPSByZXF1aXJlKCcuLi9jaHVua3MvcGFyc2VMaW5rSW5wdXQnKTtcbnZhciBybGVhZGluZyA9IC88YSggW14+XSopPz4kLztcbnZhciBydHJhaWxpbmcgPSAvXjxcXC9hPi87XG52YXIgcmltYWdlID0gLzxpbWcoIFtePl0qKT9cXC8+JC87XG5cbmZ1bmN0aW9uIGxpbmtPckltYWdlT3JBdHRhY2htZW50IChjaHVua3MsIG9wdGlvbnMpIHtcbiAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gIHZhciBpbWFnZSA9IHR5cGUgPT09ICdpbWFnZSc7XG4gIHZhciByZXN1bWU7XG5cbiAgaWYgKHR5cGUgIT09ICdhdHRhY2htZW50Jykge1xuICAgIGNodW5rcy50cmltKCk7XG4gIH1cblxuICBpZiAocmVtb3ZhbCgpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmVzdW1lID0gdGhpcy5hc3luYygpO1xuXG4gIG9wdGlvbnMucHJvbXB0cy5jbG9zZSgpO1xuICAob3B0aW9ucy5wcm9tcHRzW3R5cGVdIHx8IG9wdGlvbnMucHJvbXB0cy5saW5rKShvcHRpb25zLCBvbmNlKHJlc29sdmVkKSk7XG5cbiAgZnVuY3Rpb24gcmVtb3ZhbCAoKSB7XG4gICAgaWYgKGltYWdlKSB7XG4gICAgICBpZiAocmltYWdlLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJ0cmFpbGluZy5leGVjKGNodW5rcy5hZnRlcikgJiYgcmxlYWRpbmcuZXhlYyhjaHVua3MuYmVmb3JlKSkge1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVhZGluZywgJycpO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnRyYWlsaW5nLCAnJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNvbHZlZCAocmVzdWx0KSB7XG4gICAgdmFyIHBhcnRzO1xuICAgIHZhciBsaW5rcyA9IHJlc3VsdC5kZWZpbml0aW9ucy5tYXAocGFyc2VMaW5rSW5wdXQpLmZpbHRlcihsb25nKTtcbiAgICBpZiAobGlua3MubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXN1bWUoKTsgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbGluayA9IGxpbmtzWzBdO1xuXG4gICAgaWYgKHR5cGUgPT09ICdhdHRhY2htZW50Jykge1xuICAgICAgcGFydHMgPSBvcHRpb25zLm1lcmdlSHRtbEFuZEF0dGFjaG1lbnQoY2h1bmtzLCBsaW5rKTtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBwYXJ0cy5iZWZvcmU7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gcGFydHMuc2VsZWN0aW9uO1xuICAgICAgY2h1bmtzLmFmdGVyID0gcGFydHMuYWZ0ZXI7XG4gICAgICByZXN1bWUoKTtcbiAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUob3B0aW9ucy5zdXJmYWNlLnRleHRhcmVhLCAnd29vZm1hcmstbW9kZS1jaGFuZ2UnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaW1hZ2UpIHtcbiAgICAgIGltYWdlV3JhcChsaW5rLCBsaW5rcy5zbGljZSgxKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmtXcmFwKGxpbmssIGxpbmtzLnNsaWNlKDEpKTtcbiAgICB9XG5cbiAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVyc1t0eXBlXTtcbiAgICB9XG4gICAgcmVzdW1lKCk7XG5cbiAgICBmdW5jdGlvbiBsb25nIChsaW5rKSB7XG4gICAgICByZXR1cm4gbGluay5ocmVmLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGl0bGUgKGxpbmspIHtcbiAgICAgIHJldHVybiBsaW5rLnRpdGxlID8gJyB0aXRsZT1cIicgKyBsaW5rLnRpdGxlICsgJ1wiJyA6ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGltYWdlV3JhcCAobGluaywgcmVzdCkge1xuICAgICAgdmFyIGFmdGVyID0gY2h1bmtzLmFmdGVyO1xuICAgICAgY2h1bmtzLmJlZm9yZSArPSB0YWdvcGVuKGxpbmspO1xuICAgICAgY2h1bmtzLmFmdGVyID0gdGFnY2xvc2UobGluayk7XG4gICAgICBpZiAocmVzdC5sZW5ndGgpIHtcbiAgICAgICAgY2h1bmtzLmFmdGVyICs9IHJlc3QubWFwKHRvQW5vdGhlckltYWdlKS5qb2luKCcnKTtcbiAgICAgIH1cbiAgICAgIGNodW5rcy5hZnRlciArPSBhZnRlcjtcbiAgICAgIGZ1bmN0aW9uIHRhZ29wZW4gKGxpbmspIHsgcmV0dXJuICc8aW1nIHNyYz1cIicgKyBsaW5rLmhyZWYgKyAnXCIgYWx0PVwiJzsgfVxuICAgICAgZnVuY3Rpb24gdGFnY2xvc2UgKGxpbmspIHsgcmV0dXJuICdcIicgKyBnZXRUaXRsZShsaW5rKSArICcgLz4nOyB9XG4gICAgICBmdW5jdGlvbiB0b0Fub3RoZXJJbWFnZSAobGluaykgeyByZXR1cm4gJyAnICsgdGFnb3BlbihsaW5rKSArIHRhZ2Nsb3NlKGxpbmspOyB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlua1dyYXAgKGxpbmssIHJlc3QpIHtcbiAgICAgIHZhciBhZnRlciA9IGNodW5rcy5hZnRlcjtcbiAgICAgIHZhciBuYW1lcyA9IG9wdGlvbnMuY2xhc3Nlcy5pbnB1dC5saW5rcztcbiAgICAgIHZhciBjbGFzc2VzID0gbmFtZXMgPyAnIGNsYXNzPVwiJyArIG5hbWVzICsgJ1wiJyA6ICcnO1xuICAgICAgY2h1bmtzLmJlZm9yZSArPSB0YWdvcGVuKGxpbmspO1xuICAgICAgY2h1bmtzLmFmdGVyID0gdGFnY2xvc2UoKTtcbiAgICAgIGlmIChyZXN0Lmxlbmd0aCkge1xuICAgICAgICBjaHVua3MuYWZ0ZXIgKz0gcmVzdC5tYXAodG9Bbm90aGVyTGluaykuam9pbignJyk7XG4gICAgICB9XG4gICAgICBjaHVua3MuYWZ0ZXIgKz0gYWZ0ZXI7XG4gICAgICBmdW5jdGlvbiB0YWdvcGVuIChsaW5rKSB7IHJldHVybiAnPGEgaHJlZj1cIicgKyBsaW5rLmhyZWYgKyAnXCInICsgZ2V0VGl0bGUobGluaykgKyBjbGFzc2VzICsgJz4nOyB9XG4gICAgICBmdW5jdGlvbiB0YWdjbG9zZSAoKSB7IHJldHVybiAnPC9hPic7IH1cbiAgICAgIGZ1bmN0aW9uIHRvQW5vdGhlckxpbmsgKGxpbmspIHsgcmV0dXJuICcgJyArIHRhZ29wZW4obGluaykgKyB0YWdjbG9zZSgpOyB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlua09ySW1hZ2VPckF0dGFjaG1lbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHJsZWZ0c2luZ2xlID0gLzwodWx8b2wpKCBbXj5dKik/Plxccyo8bGkoIFtePl0qKT8+JC87XG52YXIgcnJpZ2h0c2luZ2xlID0gL148XFwvbGk+XFxzKjxcXC8odWx8b2wpPi87XG52YXIgcmxlZnRpdGVtID0gLzxsaSggW14+XSopPz4kLztcbnZhciBycmlnaHRpdGVtID0gL148XFwvbGkoIFtePl0qKT8+LztcbnZhciByb3BlbiA9IC9ePCh1bHxvbCkoIFtePl0qKT8+JC87XG5cbmZ1bmN0aW9uIGxpc3QgKGNodW5rcywgb3JkZXJlZCkge1xuICB2YXIgdGFnID0gb3JkZXJlZCA/ICdvbCcgOiAndWwnO1xuICB2YXIgb2xpc3QgPSAnPCcgKyB0YWcgKyAnPic7XG4gIHZhciBjbGlzdCA9ICc8LycgKyB0YWcgKyAnPic7XG5cbiAgY2h1bmtzLnRyaW0oKTtcblxuICBpZiAocmxlZnRzaW5nbGUudGVzdChjaHVua3MuYmVmb3JlKSAmJiBycmlnaHRzaW5nbGUudGVzdChjaHVua3MuYWZ0ZXIpKSB7XG4gICAgaWYgKHRhZyA9PT0gUmVnRXhwLiQxKSB7XG4gICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJsZWZ0c2luZ2xlLCAnJyk7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShycmlnaHRzaW5nbGUsICcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICB2YXIgdWxTdGFydCA9IGNodW5rcy5iZWZvcmUubGFzdEluZGV4T2YoJzx1bCcpO1xuICB2YXIgb2xTdGFydCA9IGNodW5rcy5iZWZvcmUubGFzdEluZGV4T2YoJzxvbCcpO1xuICB2YXIgY2xvc2VUYWcgPSBjaHVua3MuYWZ0ZXIuaW5kZXhPZignPC91bD4nKTtcbiAgaWYgKGNsb3NlVGFnID09PSAtMSkge1xuICAgIGNsb3NlVGFnID0gY2h1bmtzLmFmdGVyLmluZGV4T2YoJzwvb2w+Jyk7XG4gIH1cbiAgaWYgKGNsb3NlVGFnID09PSAtMSkge1xuICAgIGFkZCgpOyByZXR1cm47XG4gIH1cbiAgdmFyIG9wZW5TdGFydCA9IHVsU3RhcnQgPiBvbFN0YXJ0ID8gdWxTdGFydCA6IG9sU3RhcnQ7XG4gIGlmIChvcGVuU3RhcnQgPT09IC0xKSB7XG4gICAgYWRkKCk7IHJldHVybjtcbiAgfVxuICB2YXIgb3BlbkVuZCA9IGNodW5rcy5iZWZvcmUuaW5kZXhPZignPicsIG9wZW5TdGFydCk7XG4gIGlmIChvcGVuRW5kID09PSAtMSkge1xuICAgIGFkZCgpOyByZXR1cm47XG4gIH1cblxuICB2YXIgb3BlblRhZyA9IGNodW5rcy5iZWZvcmUuc3Vic3RyKG9wZW5TdGFydCwgb3BlbkVuZCAtIG9wZW5TdGFydCArIDEpO1xuICBpZiAocm9wZW4udGVzdChvcGVuVGFnKSkge1xuICAgIGlmICh0YWcgIT09IFJlZ0V4cC4kMSkge1xuICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUuc3Vic3RyKDAsIG9wZW5TdGFydCkgKyAnPCcgKyB0YWcgKyBjaHVua3MuYmVmb3JlLnN1YnN0cihvcGVuU3RhcnQgKyAzKTtcbiAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5zdWJzdHIoMCwgY2xvc2VUYWcpICsgJzwvJyArIHRhZyArIGNodW5rcy5hZnRlci5zdWJzdHIoY2xvc2VUYWcgKyA0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJsZWZ0aXRlbS50ZXN0KGNodW5rcy5iZWZvcmUpICYmIHJyaWdodGl0ZW0udGVzdChjaHVua3MuYWZ0ZXIpKSB7XG4gICAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmxlZnRpdGVtLCAnJyk7XG4gICAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJyaWdodGl0ZW0sICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZCh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGQgKGxpc3QpIHtcbiAgICB2YXIgb3BlbiA9IGxpc3QgPyAnJyA6IG9saXN0O1xuICAgIHZhciBjbG9zZSA9IGxpc3QgPyAnJyA6IGNsaXN0O1xuXG4gICAgY2h1bmtzLmJlZm9yZSArPSBvcGVuICsgJzxsaT4nO1xuICAgIGNodW5rcy5hZnRlciA9ICc8L2xpPicgKyBjbG9zZSArIGNodW5rcy5hZnRlcjtcblxuICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmxpc3RpdGVtO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHdyYXBwaW5nICh0YWcsIHBsYWNlaG9sZGVyLCBjaHVua3MpIHtcbiAgdmFyIG9wZW4gPSAnPCcgKyB0YWc7XG4gIHZhciBjbG9zZSA9ICc8LycgKyB0YWcucmVwbGFjZSgvPC9nLCAnPC8nKTtcbiAgdmFyIHJsZWFkaW5nID0gbmV3IFJlZ0V4cChvcGVuICsgJyggW14+XSopPz4kJywgJ2knKTtcbiAgdmFyIHJ0cmFpbGluZyA9IG5ldyBSZWdFeHAoJ14nICsgY2xvc2UgKyAnPicsICdpJyk7XG4gIHZhciByb3BlbiA9IG5ldyBSZWdFeHAob3BlbiArICcoIFtePl0qKT8+JywgJ2lnJyk7XG4gIHZhciByY2xvc2UgPSBuZXcgUmVnRXhwKGNsb3NlICsgJyggW14+XSopPz4nLCAnaWcnKTtcblxuICBjaHVua3MudHJpbSgpO1xuXG4gIHZhciB0cmFpbCA9IHJ0cmFpbGluZy5leGVjKGNodW5rcy5hZnRlcik7XG4gIHZhciBsZWFkID0gcmxlYWRpbmcuZXhlYyhjaHVua3MuYmVmb3JlKTtcbiAgaWYgKGxlYWQgJiYgdHJhaWwpIHtcbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJsZWFkaW5nLCAnJyk7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocnRyYWlsaW5nLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIHZhciBvcGVuZWQgPSByb3Blbi50ZXN0KGNodW5rcy5zZWxlY3Rpb24pO1xuICAgIGlmIChvcGVuZWQpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2Uocm9wZW4sICcnKTtcbiAgICAgIGlmICghc3Vycm91bmRlZChjaHVua3MsIHRhZykpIHtcbiAgICAgICAgY2h1bmtzLmJlZm9yZSArPSBvcGVuICsgJz4nO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2xvc2VkID0gcmNsb3NlLnRlc3QoY2h1bmtzLnNlbGVjdGlvbik7XG4gICAgaWYgKGNsb3NlZCkge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShyY2xvc2UsICcnKTtcbiAgICAgIGlmICghc3Vycm91bmRlZChjaHVua3MsIHRhZykpIHtcbiAgICAgICAgY2h1bmtzLmFmdGVyID0gY2xvc2UgKyAnPicgKyBjaHVua3MuYWZ0ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcGVuZWQgfHwgY2xvc2VkKSB7XG4gICAgICBwdXNob3ZlcigpOyByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdXJyb3VuZGVkKGNodW5rcywgdGFnKSkge1xuICAgICAgaWYgKHJsZWFkaW5nLnRlc3QoY2h1bmtzLmJlZm9yZSkpIHtcbiAgICAgICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShybGVhZGluZywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2h1bmtzLmJlZm9yZSArPSBjbG9zZSArICc+JztcbiAgICAgIH1cbiAgICAgIGlmIChydHJhaWxpbmcudGVzdChjaHVua3MuYWZ0ZXIpKSB7XG4gICAgICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJ0cmFpbGluZywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2h1bmtzLmFmdGVyID0gb3BlbiArICc+JyArIGNodW5rcy5hZnRlcjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFjbG9zZWJvdW5kZWQoY2h1bmtzLCB0YWcpKSB7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjbG9zZSArICc+JyArIGNodW5rcy5hZnRlcjtcbiAgICAgIGNodW5rcy5iZWZvcmUgKz0gb3BlbiArICc+JztcbiAgICB9XG4gICAgcHVzaG92ZXIoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2hvdmVyICgpIHtcbiAgICBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoLzwoXFwvKT8oW14+IF0rKSggW14+XSopPz4vaWcsIHB1c2hvdmVyT3RoZXJUYWdzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2hvdmVyT3RoZXJUYWdzIChhbGwsIGNsb3NpbmcsIHRhZywgYSwgaSkge1xuICAgIHZhciBhdHRycyA9IGEgfHwgJyc7XG4gICAgdmFyIG9wZW4gPSAhY2xvc2luZztcbiAgICB2YXIgcmNsb3NlZCA9IG5ldyBSZWdFeHAoJzxcXC8nICsgdGFnLnJlcGxhY2UoLzwvZywgJzwvJykgKyAnPicsICdpJyk7XG4gICAgdmFyIHJvcGVuZWQgPSBuZXcgUmVnRXhwKCc8JyArIHRhZyArICcoIFtePl0qKT8+JywgJ2knKTtcbiAgICBpZiAob3BlbiAmJiAhcmNsb3NlZC50ZXN0KGNodW5rcy5zZWxlY3Rpb24uc3Vic3RyKGkpKSkge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiArPSAnPC8nICsgdGFnICsgJz4nO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UoL14oPFxcL1tePl0rPikvLCAnJDE8JyArIHRhZyArIGF0dHJzICsgJz4nKTtcbiAgICB9XG5cbiAgICBpZiAoY2xvc2luZyAmJiAhcm9wZW5lZC50ZXN0KGNodW5rcy5zZWxlY3Rpb24uc3Vic3RyKDAsIGkpKSkge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9ICc8JyArIHRhZyArIGF0dHJzICsgJz4nICsgY2h1bmtzLnNlbGVjdGlvbjtcbiAgICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UoLyg8W14+XSsoPzogW14+XSopPz4pJC8sICc8LycgKyB0YWcgKyAnPiQxJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlYm91bmRlZCAoY2h1bmtzLCB0YWcpIHtcbiAgdmFyIHJjbG9zZWxlZnQgPSBuZXcgUmVnRXhwKCc8LycgKyB0YWcucmVwbGFjZSgvPC9nLCAnPC8nKSArICc+JCcsICdpJyk7XG4gIHZhciByb3BlbnJpZ2h0ID0gbmV3IFJlZ0V4cCgnXjwnICsgdGFnICsgJyg/OiBbXj5dKik/PicsICdpJyk7XG4gIHZhciBib3VuZGVkID0gcmNsb3NlbGVmdC50ZXN0KGNodW5rcy5iZWZvcmUpICYmIHJvcGVucmlnaHQudGVzdChjaHVua3MuYWZ0ZXIpO1xuICBpZiAoYm91bmRlZCkge1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UocmNsb3NlbGVmdCwgJycpO1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJvcGVucmlnaHQsICcnKTtcbiAgfVxuICByZXR1cm4gYm91bmRlZDtcbn1cblxuZnVuY3Rpb24gc3Vycm91bmRlZCAoY2h1bmtzLCB0YWcpIHtcbiAgdmFyIHJvcGVuID0gbmV3IFJlZ0V4cCgnPCcgKyB0YWcgKyAnKD86IFtePl0qKT8+JywgJ2lnJyk7XG4gIHZhciByY2xvc2UgPSBuZXcgUmVnRXhwKCc8XFwvJyArIHRhZy5yZXBsYWNlKC88L2csICc8LycpICsgJz4nLCAnaWcnKTtcbiAgdmFyIG9wZW5zQmVmb3JlID0gY291bnQoY2h1bmtzLmJlZm9yZSwgcm9wZW4pO1xuICB2YXIgb3BlbnNBZnRlciA9IGNvdW50KGNodW5rcy5hZnRlciwgcm9wZW4pO1xuICB2YXIgY2xvc2VzQmVmb3JlID0gY291bnQoY2h1bmtzLmJlZm9yZSwgcmNsb3NlKTtcbiAgdmFyIGNsb3Nlc0FmdGVyID0gY291bnQoY2h1bmtzLmFmdGVyLCByY2xvc2UpO1xuICB2YXIgb3BlbiA9IG9wZW5zQmVmb3JlIC0gY2xvc2VzQmVmb3JlID4gMDtcbiAgdmFyIGNsb3NlID0gY2xvc2VzQWZ0ZXIgLSBvcGVuc0FmdGVyID4gMDtcbiAgcmV0dXJuIG9wZW4gJiYgY2xvc2U7XG5cbiAgZnVuY3Rpb24gY291bnQgKHRleHQsIHJlZ2V4KSB7XG4gICAgdmFyIG1hdGNoID0gdGV4dC5tYXRjaChyZWdleCk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWF0Y2gubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBwaW5nO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc1Zpc2libGVFbGVtZW50IChlbGVtKSB7XG4gIGlmIChnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgIHJldHVybiBnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXNwbGF5JykgIT09ICdub25lJztcbiAgfSBlbHNlIGlmIChlbGVtLmN1cnJlbnRTdHlsZSkge1xuICAgIHJldHVybiBlbGVtLmN1cnJlbnRTdHlsZS5kaXNwbGF5ICE9PSAnbm9uZSc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Zpc2libGVFbGVtZW50O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTlwYzFacGMybGliR1ZGYkdWdFpXNTBMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1Wm5WdVkzUnBiMjRnYVhOV2FYTnBZbXhsUld4bGJXVnVkQ0FvWld4bGJTa2dlMXh1SUNCcFppQW9aMnh2WW1Gc0xtZGxkRU52YlhCMWRHVmtVM1I1YkdVcElIdGNiaUFnSUNCeVpYUjFjbTRnWjJ4dlltRnNMbWRsZEVOdmJYQjFkR1ZrVTNSNWJHVW9aV3hsYlN3Z2JuVnNiQ2t1WjJWMFVISnZjR1Z5ZEhsV1lXeDFaU2duWkdsemNHeGhlU2NwSUNFOVBTQW5ibTl1WlNjN1hHNGdJSDBnWld4elpTQnBaaUFvWld4bGJTNWpkWEp5Wlc1MFUzUjViR1VwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdaV3hsYlM1amRYSnlaVzUwVTNSNWJHVXVaR2x6Y0d4aGVTQWhQVDBnSjI1dmJtVW5PMXh1SUNCOVhHNTlYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnYVhOV2FYTnBZbXhsUld4bGJXVnVkRHRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG1hbnkgKHRleHQsIHRpbWVzKSB7XG4gIHJldHVybiBuZXcgQXJyYXkodGltZXMgKyAxKS5qb2luKHRleHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hbnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYW55ID0gcmVxdWlyZSgnLi4vbWFueScpO1xudmFyIGV4dGVuZFJlZ0V4cCA9IHJlcXVpcmUoJy4uL2V4dGVuZFJlZ0V4cCcpO1xudmFyIHRyaW1DaHVua3MgPSByZXF1aXJlKCcuLi9jaHVua3MvdHJpbScpO1xuXG5mdW5jdGlvbiBNYXJrZG93bkNodW5rcyAoKSB7XG59XG5cbk1hcmtkb3duQ2h1bmtzLnByb3RvdHlwZS50cmltID0gdHJpbUNodW5rcztcblxuTWFya2Rvd25DaHVua3MucHJvdG90eXBlLmZpbmRUYWdzID0gZnVuY3Rpb24gKHN0YXJ0UmVnZXgsIGVuZFJlZ2V4KSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHJlZ2V4O1xuXG4gIGlmIChzdGFydFJlZ2V4KSB7XG4gICAgcmVnZXggPSBleHRlbmRSZWdFeHAoc3RhcnRSZWdleCwgJycsICckJyk7XG4gICAgdGhpcy5iZWZvcmUgPSB0aGlzLmJlZm9yZS5yZXBsYWNlKHJlZ2V4LCBzdGFydFJlcGxhY2VyKTtcbiAgICByZWdleCA9IGV4dGVuZFJlZ0V4cChzdGFydFJlZ2V4LCAnXicsICcnKTtcbiAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLnJlcGxhY2UocmVnZXgsIHN0YXJ0UmVwbGFjZXIpO1xuICB9XG5cbiAgaWYgKGVuZFJlZ2V4KSB7XG4gICAgcmVnZXggPSBleHRlbmRSZWdFeHAoZW5kUmVnZXgsICcnLCAnJCcpO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24ucmVwbGFjZShyZWdleCwgZW5kUmVwbGFjZXIpO1xuICAgIHJlZ2V4ID0gZXh0ZW5kUmVnRXhwKGVuZFJlZ2V4LCAnXicsICcnKTtcbiAgICB0aGlzLmFmdGVyID0gdGhpcy5hZnRlci5yZXBsYWNlKHJlZ2V4LCBlbmRSZXBsYWNlcik7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydFJlcGxhY2VyIChtYXRjaCkge1xuICAgIHNlbGYuc3RhcnRUYWcgPSBzZWxmLnN0YXJ0VGFnICsgbWF0Y2g7IHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZFJlcGxhY2VyIChtYXRjaCkge1xuICAgIHNlbGYuZW5kVGFnID0gbWF0Y2ggKyBzZWxmLmVuZFRhZzsgcmV0dXJuICcnO1xuICB9XG59O1xuXG5NYXJrZG93bkNodW5rcy5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGJlZm9yZUNvdW50ID0gJ2JlZm9yZScgaW4gbyA/IG8uYmVmb3JlIDogMTtcbiAgdmFyIGFmdGVyQ291bnQgPSAnYWZ0ZXInIGluIG8gPyBvLmFmdGVyIDogMTtcblxuICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLnJlcGxhY2UoLyheXFxuKikvLCAnJyk7XG4gIHRoaXMuc3RhcnRUYWcgPSB0aGlzLnN0YXJ0VGFnICsgUmVnRXhwLiQxO1xuICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLnJlcGxhY2UoLyhcXG4qJCkvLCAnJyk7XG4gIHRoaXMuZW5kVGFnID0gdGhpcy5lbmRUYWcgKyBSZWdFeHAuJDE7XG4gIHRoaXMuc3RhcnRUYWcgPSB0aGlzLnN0YXJ0VGFnLnJlcGxhY2UoLyheXFxuKikvLCAnJyk7XG4gIHRoaXMuYmVmb3JlID0gdGhpcy5iZWZvcmUgKyBSZWdFeHAuJDE7XG4gIHRoaXMuZW5kVGFnID0gdGhpcy5lbmRUYWcucmVwbGFjZSgvKFxcbiokKS8sICcnKTtcbiAgdGhpcy5hZnRlciA9IHRoaXMuYWZ0ZXIgKyBSZWdFeHAuJDE7XG5cbiAgaWYgKHRoaXMuYmVmb3JlKSB7XG4gICAgdGhpcy5iZWZvcmUgPSByZXBsYWNlKHRoaXMuYmVmb3JlLCArK2JlZm9yZUNvdW50LCAnJCcpO1xuICB9XG5cbiAgaWYgKHRoaXMuYWZ0ZXIpIHtcbiAgICB0aGlzLmFmdGVyID0gcmVwbGFjZSh0aGlzLmFmdGVyLCArK2FmdGVyQ291bnQsICcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UgKHRleHQsIGNvdW50LCBzdWZmaXgpIHtcbiAgICB2YXIgcmVnZXggPSBvLmFueSA/ICdcXFxcbionIDogbWFueSgnXFxcXG4/JywgY291bnQpO1xuICAgIHZhciByZXBsYWNlbWVudCA9IG1hbnkoJ1xcbicsIGNvdW50KTtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAocmVnZXggKyBzdWZmaXgpLCByZXBsYWNlbWVudCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTWFya2Rvd25DaHVua3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHdyYXBwaW5nID0gcmVxdWlyZSgnLi93cmFwcGluZycpO1xudmFyIHNldHRpbmdzID0gcmVxdWlyZSgnLi9zZXR0aW5ncycpO1xudmFyIHJ0cmFpbGJsYW5rbGluZSA9IC8oPlsgXFx0XSopJC87XG52YXIgcmxlYWRibGFua2xpbmUgPSAvXig+WyBcXHRdKikvO1xudmFyIHJuZXdsaW5lZmVuY2luZyA9IC9eKFxcbiopKFteXFxyXSs/KShcXG4qKSQvO1xudmFyIHJlbmR0YWcgPSAvXigoKFxcbnxeKShcXG5bIFxcdF0qKSo+KC4rXFxuKSouKikrKFxcblsgXFx0XSopKikvO1xudmFyIHJsZWFkYnJhY2tldCA9IC9eXFxuKCg+fFxccykqKVxcbi87XG52YXIgcnRyYWlsYnJhY2tldCA9IC9cXG4oKD58XFxzKSopXFxuJC87XG5cbmZ1bmN0aW9uIGJsb2NrcXVvdGUgKGNodW5rcykge1xuICB2YXIgbWF0Y2ggPSAnJztcbiAgdmFyIGxlZnRPdmVyID0gJyc7XG4gIHZhciBsaW5lO1xuXG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2Uocm5ld2xpbmVmZW5jaW5nLCBuZXdsaW5lcmVwbGFjZXIpO1xuICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJ0cmFpbGJsYW5rbGluZSwgdHJhaWxibGFua2xpbmVyZXBsYWNlcik7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL14oXFxzfD4pKyQvLCAnJyk7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uIHx8IHN0cmluZ3MucGxhY2Vob2xkZXJzLnF1b3RlO1xuXG4gIGlmIChjaHVua3MuYmVmb3JlKSB7XG4gICAgYmVmb3JlUHJvY2Vzc2luZygpO1xuICB9XG5cbiAgY2h1bmtzLnN0YXJ0VGFnID0gbWF0Y2g7XG4gIGNodW5rcy5iZWZvcmUgPSBsZWZ0T3ZlcjtcblxuICBpZiAoY2h1bmtzLmFmdGVyKSB7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UoL15cXG4/LywgJ1xcbicpO1xuICB9XG5cbiAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocmVuZHRhZywgZW5kdGFncmVwbGFjZXIpO1xuXG4gIGlmICgvXig/IVsgXXswLDN9PikvbS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pKSB7XG4gICAgd3JhcHBpbmcud3JhcChjaHVua3MsIHNldHRpbmdzLmxpbmVMZW5ndGggLSAyKTtcbiAgICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9eL2dtLCAnPiAnKTtcbiAgICByZXBsYWNlQmxhbmtzSW5UYWdzKHRydWUpO1xuICAgIGNodW5rcy5za2lwKCk7XG4gIH0gZWxzZSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXlsgXXswLDN9PiA/L2dtLCAnJyk7XG4gICAgd3JhcHBpbmcudW53cmFwKGNodW5rcyk7XG4gICAgcmVwbGFjZUJsYW5rc0luVGFncyhmYWxzZSk7XG5cbiAgICBpZiAoIS9eKFxcbnxeKVsgXXswLDN9Pi8udGVzdChjaHVua3Muc2VsZWN0aW9uKSAmJiBjaHVua3Muc3RhcnRUYWcpIHtcbiAgICAgIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5zdGFydFRhZy5yZXBsYWNlKC9cXG57MCwyfSQvLCAnXFxuXFxuJyk7XG4gICAgfVxuXG4gICAgaWYgKCEvKFxcbnxeKVsgXXswLDN9Pi4qJC8udGVzdChjaHVua3Muc2VsZWN0aW9uKSAmJiBjaHVua3MuZW5kVGFnKSB7XG4gICAgICBjaHVua3MuZW5kVGFnID0gY2h1bmtzLmVuZFRhZy5yZXBsYWNlKC9eXFxuezAsMn0vLCAnXFxuXFxuJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCEvXFxuLy50ZXN0KGNodW5rcy5zZWxlY3Rpb24pKSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShybGVhZGJsYW5rbGluZSwgbGVhZGJsYW5rbGluZXJlcGxhY2VyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld2xpbmVyZXBsYWNlciAoYWxsLCBiZWZvcmUsIHRleHQsIGFmdGVyKSB7XG4gICAgY2h1bmtzLmJlZm9yZSArPSBiZWZvcmU7XG4gICAgY2h1bmtzLmFmdGVyID0gYWZ0ZXIgKyBjaHVua3MuYWZ0ZXI7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGJsYW5rbGluZXJlcGxhY2VyIChhbGwsIGJsYW5rKSB7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGJsYW5rICsgY2h1bmtzLnNlbGVjdGlvbjsgcmV0dXJuICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGJsYW5rbGluZXJlcGxhY2VyIChhbGwsIGJsYW5rcykge1xuICAgIGNodW5rcy5zdGFydFRhZyArPSBibGFua3M7IHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGJlZm9yZVByb2Nlc3NpbmcgKCkge1xuICAgIHZhciBsaW5lcyA9IGNodW5rcy5iZWZvcmUucmVwbGFjZSgvXFxuJC8sICcnKS5zcGxpdCgnXFxuJyk7XG4gICAgdmFyIGNoYWluZWQgPSBmYWxzZTtcbiAgICB2YXIgZ29vZDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGdvb2QgPSBmYWxzZTtcbiAgICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgIGNoYWluZWQgPSBjaGFpbmVkICYmIGxpbmUubGVuZ3RoID4gMDtcbiAgICAgIGlmICgvXj4vLnRlc3QobGluZSkpIHtcbiAgICAgICAgZ29vZCA9IHRydWU7XG4gICAgICAgIGlmICghY2hhaW5lZCAmJiBsaW5lLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBjaGFpbmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgvXlsgXFx0XSokLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGdvb2QgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29vZCA9IGNoYWluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoZ29vZCkge1xuICAgICAgICBtYXRjaCArPSBsaW5lICsgJ1xcbic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWZ0T3ZlciArPSBtYXRjaCArIGxpbmU7XG4gICAgICAgIG1hdGNoID0gJ1xcbic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCEvKF58XFxuKT4vLnRlc3QobWF0Y2gpKSB7XG4gICAgICBsZWZ0T3ZlciArPSBtYXRjaDtcbiAgICAgIG1hdGNoID0gJyc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW5kdGFncmVwbGFjZXIgKGFsbCkge1xuICAgIGNodW5rcy5lbmRUYWcgPSBhbGw7IHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2VCbGFua3NJblRhZ3MgKGJyYWNrZXQpIHtcbiAgICB2YXIgcmVwbGFjZW1lbnQgPSBicmFja2V0ID8gJz4gJyA6ICcnO1xuXG4gICAgaWYgKGNodW5rcy5zdGFydFRhZykge1xuICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLnN0YXJ0VGFnLnJlcGxhY2UocnRyYWlsYnJhY2tldCwgcmVwbGFjZXIpO1xuICAgIH1cbiAgICBpZiAoY2h1bmtzLmVuZFRhZykge1xuICAgICAgY2h1bmtzLmVuZFRhZyA9IGNodW5rcy5lbmRUYWcucmVwbGFjZShybGVhZGJyYWNrZXQsIHJlcGxhY2VyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXBsYWNlciAoYWxsLCBtYXJrZG93bikge1xuICAgICAgcmV0dXJuICdcXG4nICsgbWFya2Rvd24ucmVwbGFjZSgvXlsgXXswLDN9Pj9bIFxcdF0qJC9nbSwgcmVwbGFjZW1lbnQpICsgJ1xcbic7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmxvY2txdW90ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJsZWFkaW5nID0gL14oXFwqKikvO1xudmFyIHJ0cmFpbGluZyA9IC8oXFwqKiQpLztcbnZhciBydHJhaWxpbmdzcGFjZSA9IC8oXFxzPykkLztcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xuXG5mdW5jdGlvbiBib2xkT3JJdGFsaWMgKGNodW5rcywgdHlwZSkge1xuICB2YXIgcm5ld2xpbmVzID0gL1xcbnsyLH0vZztcbiAgdmFyIHN0YXJDb3VudCA9IHR5cGUgPT09ICdib2xkJyA/IDIgOiAxO1xuXG4gIGNodW5rcy50cmltKCk7XG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2Uocm5ld2xpbmVzLCAnXFxuJyk7XG5cbiAgdmFyIG1hcmt1cDtcbiAgdmFyIGxlYWRTdGFycyA9IHJ0cmFpbGluZy5leGVjKGNodW5rcy5iZWZvcmUpWzBdO1xuICB2YXIgdHJhaWxTdGFycyA9IHJsZWFkaW5nLmV4ZWMoY2h1bmtzLmFmdGVyKVswXTtcbiAgdmFyIHN0YXJzID0gJ1xcXFwqeycgKyBzdGFyQ291bnQgKyAnfSc7XG4gIHZhciBmZW5jZSA9IE1hdGgubWluKGxlYWRTdGFycy5sZW5ndGgsIHRyYWlsU3RhcnMubGVuZ3RoKTtcbiAgaWYgKGZlbmNlID49IHN0YXJDb3VudCAmJiAoZmVuY2UgIT09IDIgfHwgc3RhckNvdW50ICE9PSAxKSkge1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlLnJlcGxhY2UobmV3IFJlZ0V4cChzdGFycyArICckJywgJycpLCAnJyk7XG4gICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UobmV3IFJlZ0V4cCgnXicgKyBzdGFycywgJycpLCAnJyk7XG4gIH0gZWxzZSBpZiAoIWNodW5rcy5zZWxlY3Rpb24gJiYgdHJhaWxTdGFycykge1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKHJsZWFkaW5nLCAnJyk7XG4gICAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShydHJhaWxpbmdzcGFjZSwgJycpICsgdHJhaWxTdGFycyArIFJlZ0V4cC4kMTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24gJiYgIXRyYWlsU3RhcnMpIHtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVyc1t0eXBlXTtcbiAgICB9XG5cbiAgICBtYXJrdXAgPSBzdGFyQ291bnQgPT09IDEgPyAnKicgOiAnKionO1xuICAgIGNodW5rcy5iZWZvcmUgPSBjaHVua3MuYmVmb3JlICsgbWFya3VwO1xuICAgIGNodW5rcy5hZnRlciA9IG1hcmt1cCArIGNodW5rcy5hZnRlcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJvbGRPckl0YWxpYztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgcnRleHRiZWZvcmUgPSAvXFxTWyBdKiQvO1xudmFyIHJ0ZXh0YWZ0ZXIgPSAvXlsgXSpcXFMvO1xudmFyIHJuZXdsaW5lID0gL1xcbi87XG52YXIgcmJhY2t0aWNrID0gL2AvO1xudmFyIHJmZW5jZWJlZm9yZSA9IC9gYGBbYS16XSpcXG4/JC87XG52YXIgcmZlbmNlYmVmb3JlaW5zaWRlID0gL15gYGBbYS16XSpcXG4vO1xudmFyIHJmZW5jZWFmdGVyID0gL15cXG4/YGBgLztcbnZhciByZmVuY2VhZnRlcmluc2lkZSA9IC9cXG5gYGAkLztcblxuZnVuY3Rpb24gY29kZWJsb2NrIChjaHVua3MsIG9wdGlvbnMpIHtcbiAgdmFyIG5ld2xpbmVkID0gcm5ld2xpbmUudGVzdChjaHVua3Muc2VsZWN0aW9uKTtcbiAgdmFyIHRyYWlsaW5nID0gcnRleHRhZnRlci50ZXN0KGNodW5rcy5hZnRlcik7XG4gIHZhciBsZWFkaW5nID0gcnRleHRiZWZvcmUudGVzdChjaHVua3MuYmVmb3JlKTtcbiAgdmFyIG91dGZlbmNlZCA9IHJmZW5jZWJlZm9yZS50ZXN0KGNodW5rcy5iZWZvcmUpICYmIHJmZW5jZWFmdGVyLnRlc3QoY2h1bmtzLmFmdGVyKTtcbiAgaWYgKG91dGZlbmNlZCB8fCBuZXdsaW5lZCB8fCAhKGxlYWRpbmcgfHwgdHJhaWxpbmcpKSB7XG4gICAgYmxvY2sob3V0ZmVuY2VkKTtcbiAgfSBlbHNlIHtcbiAgICBpbmxpbmUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlubGluZSAoKSB7XG4gICAgY2h1bmtzLnRyaW0oKTtcbiAgICBjaHVua3MuZmluZFRhZ3MocmJhY2t0aWNrLCByYmFja3RpY2spO1xuXG4gICAgaWYgKCFjaHVua3Muc3RhcnRUYWcgJiYgIWNodW5rcy5lbmRUYWcpIHtcbiAgICAgIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5lbmRUYWcgPSAnYCc7XG4gICAgICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IHN0cmluZ3MucGxhY2Vob2xkZXJzLmNvZGU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjaHVua3MuZW5kVGFnICYmICFjaHVua3Muc3RhcnRUYWcpIHtcbiAgICAgIGNodW5rcy5iZWZvcmUgKz0gY2h1bmtzLmVuZFRhZztcbiAgICAgIGNodW5rcy5lbmRUYWcgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLmVuZFRhZyA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJsb2NrIChvdXRmZW5jZWQpIHtcbiAgICBpZiAob3V0ZmVuY2VkKSB7XG4gICAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJmZW5jZWJlZm9yZSwgJycpO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2UocmZlbmNlYWZ0ZXIsICcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKC9bIF17NH18YGBgW2Etel0qXFxuJC8sIG1lcmdlU2VsZWN0aW9uKTtcbiAgICBjaHVua3Muc2tpcCh7XG4gICAgICBiZWZvcmU6IC8oXFxufF4pKFxcdHxbIF17NCx9fGBgYFthLXpdKlxcbikuKlxcbiQvLnRlc3QoY2h1bmtzLmJlZm9yZSkgPyAwIDogMSxcbiAgICAgIGFmdGVyOiAvXlxcbihcXHR8WyBdezQsfXxcXG5gYGApLy50ZXN0KGNodW5rcy5hZnRlcikgPyAwIDogMVxuICAgIH0pO1xuXG4gICAgaWYgKCFjaHVua3Muc2VsZWN0aW9uKSB7XG4gICAgICBpZiAob3B0aW9ucy5mZW5jaW5nKSB7XG4gICAgICAgIGNodW5rcy5zdGFydFRhZyA9ICdgYGBcXG4nO1xuICAgICAgICBjaHVua3MuZW5kVGFnID0gJ1xcbmBgYCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaHVua3Muc3RhcnRUYWcgPSAnICAgICc7XG4gICAgICB9XG4gICAgICBjaHVua3Muc2VsZWN0aW9uID0gc3RyaW5ncy5wbGFjZWhvbGRlcnMuY29kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJmZW5jZWJlZm9yZWluc2lkZS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pICYmIHJmZW5jZWFmdGVyaW5zaWRlLnRlc3QoY2h1bmtzLnNlbGVjdGlvbikpIHtcbiAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvKF5gYGBbYS16XSpcXG4pfChgYGAkKS9nLCAnJyk7XG4gICAgICB9IGVsc2UgaWYgKC9eWyBdezAsM31cXFMvbS50ZXN0KGNodW5rcy5zZWxlY3Rpb24pKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmZlbmNpbmcpIHtcbiAgICAgICAgICBjaHVua3MuYmVmb3JlICs9ICdgYGBcXG4nO1xuICAgICAgICAgIGNodW5rcy5hZnRlciA9ICdcXG5gYGAnICsgY2h1bmtzLmFmdGVyO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld2xpbmVkKSB7XG4gICAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXi9nbSwgJyAgICAnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaHVua3MuYmVmb3JlICs9ICcgICAgJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZSgvXig/OlsgXXs0fXxbIF17MCwzfVxcdHxgYGBbYS16XSopL2dtLCAnJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVyZ2VTZWxlY3Rpb24gKGFsbCkge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9IGFsbCArIGNodW5rcy5zZWxlY3Rpb247IHJldHVybiAnJztcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb2RlYmxvY2s7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYW55ID0gcmVxdWlyZSgnLi4vbWFueScpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG5cbmZ1bmN0aW9uIGhlYWRpbmcgKGNodW5rcykge1xuICB2YXIgbGV2ZWwgPSAwO1xuXG4gIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uXG4gICAgLnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAgIC5yZXBsYWNlKC8oXlxccyt8XFxzKyQpL2csICcnKTtcblxuICBpZiAoIWNodW5rcy5zZWxlY3Rpb24pIHtcbiAgICBjaHVua3Muc3RhcnRUYWcgPSAnIyAnO1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVycy5oZWFkaW5nO1xuICAgIGNodW5rcy5lbmRUYWcgPSAnJztcbiAgICBjaHVua3Muc2tpcCh7IGJlZm9yZTogMSwgYWZ0ZXI6IDEgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY2h1bmtzLmZpbmRUYWdzKC8jK1sgXSovLCAvWyBdKiMrLyk7XG5cbiAgaWYgKC8jKy8udGVzdChjaHVua3Muc3RhcnRUYWcpKSB7XG4gICAgbGV2ZWwgPSBSZWdFeHAubGFzdE1hdGNoLmxlbmd0aDtcbiAgfVxuXG4gIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5lbmRUYWcgPSAnJztcbiAgY2h1bmtzLmZpbmRUYWdzKG51bGwsIC9cXHM/KC0rfD0rKS8pO1xuXG4gIGlmICgvPSsvLnRlc3QoY2h1bmtzLmVuZFRhZykpIHtcbiAgICBsZXZlbCA9IDE7XG4gIH1cblxuICBpZiAoLy0rLy50ZXN0KGNodW5rcy5lbmRUYWcpKSB7XG4gICAgbGV2ZWwgPSAyO1xuICB9XG5cbiAgY2h1bmtzLnN0YXJ0VGFnID0gY2h1bmtzLmVuZFRhZyA9ICcnO1xuICBjaHVua3Muc2tpcCh7IGJlZm9yZTogMSwgYWZ0ZXI6IDEgfSk7XG5cbiAgdmFyIGxldmVsVG9DcmVhdGUgPSBsZXZlbCA8IDIgPyA0IDogbGV2ZWwgLSAxO1xuICBpZiAobGV2ZWxUb0NyZWF0ZSA+IDApIHtcbiAgICBjaHVua3Muc3RhcnRUYWcgPSBtYW55KCcjJywgbGV2ZWxUb0NyZWF0ZSkgKyAnICc7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoZWFkaW5nO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBociAoY2h1bmtzKSB7XG4gIGNodW5rcy5zdGFydFRhZyA9ICctLS0tLS0tLS0tXFxuJztcbiAgY2h1bmtzLnNlbGVjdGlvbiA9ICcnO1xuICBjaHVua3Muc2tpcCh7IGxlZnQ6IDIsIHJpZ2h0OiAxLCBhbnk6IHRydWUgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvbmNlID0gcmVxdWlyZSgnLi4vb25jZScpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgcGFyc2VMaW5rSW5wdXQgPSByZXF1aXJlKCcuLi9jaHVua3MvcGFyc2VMaW5rSW5wdXQnKTtcbnZhciByZGVmaW5pdGlvbnMgPSAvXlsgXXswLDN9XFxbKCg/OmF0dGFjaG1lbnQtKT9cXGQrKVxcXTpbIFxcdF0qXFxuP1sgXFx0XSo8PyhcXFMrPyk+P1sgXFx0XSpcXG4/WyBcXHRdKig/OihcXG4qKVtcIihdKC4rPylbXCIpXVsgXFx0XSopPyg/Olxcbit8JCkvZ207XG52YXIgcmF0dGFjaG1lbnQgPSAvXmF0dGFjaG1lbnQtKFxcZCspJC9pO1xuXG5mdW5jdGlvbiBleHRyYWN0RGVmaW5pdGlvbnMgKHRleHQsIGRlZmluaXRpb25zKSB7XG4gIHJkZWZpbml0aW9ucy5sYXN0SW5kZXggPSAwO1xuICByZXR1cm4gdGV4dC5yZXBsYWNlKHJkZWZpbml0aW9ucywgcmVwbGFjZXIpO1xuXG4gIGZ1bmN0aW9uIHJlcGxhY2VyIChhbGwsIGlkLCBsaW5rLCBuZXdsaW5lcywgdGl0bGUpIHtcbiAgICBkZWZpbml0aW9uc1tpZF0gPSBhbGwucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG4gICAgaWYgKG5ld2xpbmVzKSB7XG4gICAgICBkZWZpbml0aW9uc1tpZF0gPSBhbGwucmVwbGFjZSgvW1wiKF0oLis/KVtcIildJC8sICcnKTtcbiAgICAgIHJldHVybiBuZXdsaW5lcyArIHRpdGxlO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVzaERlZmluaXRpb24gKG9wdGlvbnMpIHtcbiAgdmFyIGNodW5rcyA9IG9wdGlvbnMuY2h1bmtzO1xuICB2YXIgZGVmaW5pdGlvbiA9IG9wdGlvbnMuZGVmaW5pdGlvbjtcbiAgdmFyIGF0dGFjaG1lbnQgPSBvcHRpb25zLmF0dGFjaG1lbnQ7XG4gIHZhciByZWdleCA9IC8oXFxbKSgoPzpcXFtbXlxcXV0qXFxdfFteXFxbXFxdXSkqKShcXF1bIF0/KD86XFxuWyBdKik/XFxbKSgoPzphdHRhY2htZW50LSk/XFxkKykoXFxdKS9nO1xuICB2YXIgYW5jaG9yID0gMDtcbiAgdmFyIGRlZmluaXRpb25zID0ge307XG4gIHZhciBmb290bm90ZXMgPSBbXTtcblxuICBjaHVua3MuYmVmb3JlID0gZXh0cmFjdERlZmluaXRpb25zKGNodW5rcy5iZWZvcmUsIGRlZmluaXRpb25zKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGV4dHJhY3REZWZpbml0aW9ucyhjaHVua3Muc2VsZWN0aW9uLCBkZWZpbml0aW9ucyk7XG4gIGNodW5rcy5hZnRlciA9IGV4dHJhY3REZWZpbml0aW9ucyhjaHVua3MuYWZ0ZXIsIGRlZmluaXRpb25zKTtcbiAgY2h1bmtzLmJlZm9yZSA9IGNodW5rcy5iZWZvcmUucmVwbGFjZShyZWdleCwgZ2V0TGluayk7XG5cbiAgaWYgKGRlZmluaXRpb24pIHtcbiAgICBpZiAoIWF0dGFjaG1lbnQpIHsgcHVzaEFuY2hvcihkZWZpbml0aW9uKTsgfVxuICB9IGVsc2Uge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UocmVnZXgsIGdldExpbmspO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IGFuY2hvcjtcblxuICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShyZWdleCwgZ2V0TGluayk7XG5cbiAgaWYgKGNodW5rcy5hZnRlcikge1xuICAgIGNodW5rcy5hZnRlciA9IGNodW5rcy5hZnRlci5yZXBsYWNlKC9cXG4qJC8sICcnKTtcbiAgfVxuICBpZiAoIWNodW5rcy5hZnRlcikge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL1xcbiokLywgJycpO1xuICB9XG5cbiAgYW5jaG9yID0gMDtcbiAgT2JqZWN0LmtleXMoZGVmaW5pdGlvbnMpLmZvckVhY2gocHVzaEF0dGFjaG1lbnRzKTtcblxuICBpZiAoYXR0YWNobWVudCkge1xuICAgIHB1c2hBbmNob3IoZGVmaW5pdGlvbik7XG4gIH1cbiAgY2h1bmtzLmFmdGVyICs9ICdcXG5cXG4nICsgZm9vdG5vdGVzLmpvaW4oJ1xcbicpO1xuXG4gIHJldHVybiByZXN1bHQ7XG5cbiAgZnVuY3Rpb24gcHVzaEF0dGFjaG1lbnRzIChkZWZpbml0aW9uKSB7XG4gICAgaWYgKHJhdHRhY2htZW50LnRlc3QoZGVmaW5pdGlvbikpIHtcbiAgICAgIHB1c2hBbmNob3IoZGVmaW5pdGlvbnNbZGVmaW5pdGlvbl0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2hBbmNob3IgKGRlZmluaXRpb24pIHtcbiAgICBhbmNob3IrKztcbiAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbi5yZXBsYWNlKC9eWyBdezAsM31cXFsoYXR0YWNobWVudC0pPyhcXGQrKVxcXTovLCAnICBbJDEnICsgYW5jaG9yICsgJ106Jyk7XG4gICAgZm9vdG5vdGVzLnB1c2goZGVmaW5pdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMaW5rIChhbGwsIGJlZm9yZSwgaW5uZXIsIGFmdGVySW5uZXIsIGRlZmluaXRpb24sIGVuZCkge1xuICAgIGlubmVyID0gaW5uZXIucmVwbGFjZShyZWdleCwgZ2V0TGluayk7XG4gICAgaWYgKGRlZmluaXRpb25zW2RlZmluaXRpb25dKSB7XG4gICAgICBwdXNoQW5jaG9yKGRlZmluaXRpb25zW2RlZmluaXRpb25dKTtcbiAgICAgIHJldHVybiBiZWZvcmUgKyBpbm5lciArIGFmdGVySW5uZXIgKyBhbmNob3IgKyBlbmQ7XG4gICAgfVxuICAgIHJldHVybiBhbGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gbGlua09ySW1hZ2VPckF0dGFjaG1lbnQgKGNodW5rcywgb3B0aW9ucykge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgdmFyIGltYWdlID0gdHlwZSA9PT0gJ2ltYWdlJztcbiAgdmFyIHJlc3VtZTtcblxuICBjaHVua3MudHJpbSgpO1xuICBjaHVua3MuZmluZFRhZ3MoL1xccyohP1xcWy8sIC9cXF1bIF0/KD86XFxuWyBdKik/KFxcWy4qP1xcXSk/Lyk7XG5cbiAgaWYgKGNodW5rcy5lbmRUYWcubGVuZ3RoID4gMSAmJiBjaHVua3Muc3RhcnRUYWcubGVuZ3RoID4gMCkge1xuICAgIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5zdGFydFRhZy5yZXBsYWNlKC8hP1xcWy8sICcnKTtcbiAgICBjaHVua3MuZW5kVGFnID0gJyc7XG4gICAgcHVzaERlZmluaXRpb24oeyBjaHVua3M6IGNodW5rcyB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnN0YXJ0VGFnICsgY2h1bmtzLnNlbGVjdGlvbiArIGNodW5rcy5lbmRUYWc7XG4gIGNodW5rcy5zdGFydFRhZyA9IGNodW5rcy5lbmRUYWcgPSAnJztcblxuICBpZiAoL1xcblxcbi8udGVzdChjaHVua3Muc2VsZWN0aW9uKSkge1xuICAgIHB1c2hEZWZpbml0aW9uKHsgY2h1bmtzOiBjaHVua3MgfSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJlc3VtZSA9IHRoaXMuYXN5bmMoKTtcblxuICBvcHRpb25zLnByb21wdHMuY2xvc2UoKTtcbiAgKG9wdGlvbnMucHJvbXB0c1t0eXBlXSB8fCBvcHRpb25zLnByb21wdHMubGluaykob3B0aW9ucywgb25jZShyZXNvbHZlZCkpO1xuXG4gIGZ1bmN0aW9uIHJlc29sdmVkIChyZXN1bHQpIHtcbiAgICB2YXIgbGlua3MgPSByZXN1bHRcbiAgICAgIC5kZWZpbml0aW9uc1xuICAgICAgLm1hcChwYXJzZUxpbmtJbnB1dClcbiAgICAgIC5maWx0ZXIobG9uZyk7XG5cbiAgICBsaW5rcy5mb3JFYWNoKHJlbmRlckxpbmspO1xuICAgIHJlc3VtZSgpO1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyTGluayAobGluaywgaSkge1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9ICgnICcgKyBjaHVua3Muc2VsZWN0aW9uKS5yZXBsYWNlKC8oW15cXFxcXSg/OlxcXFxcXFxcKSopKD89W1tcXF1dKS9nLCAnJDFcXFxcJykuc3Vic3RyKDEpO1xuXG4gICAgICB2YXIga2V5ID0gcmVzdWx0LmF0dGFjaG1lbnQgPyAnICBbYXR0YWNobWVudC05OTk5XTogJyA6ICcgWzk5OTldOiAnO1xuICAgICAgdmFyIGRlZmluaXRpb24gPSBrZXkgKyBsaW5rLmhyZWYgKyAobGluay50aXRsZSA/ICcgXCInICsgbGluay50aXRsZSArICdcIicgOiAnJyk7XG4gICAgICB2YXIgYW5jaG9yID0gcHVzaERlZmluaXRpb24oe1xuICAgICAgICBjaHVua3M6IGNodW5rcyxcbiAgICAgICAgZGVmaW5pdGlvbjogZGVmaW5pdGlvbixcbiAgICAgICAgYXR0YWNobWVudDogcmVzdWx0LmF0dGFjaG1lbnRcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3VsdC5hdHRhY2htZW50KSB7XG4gICAgICAgIGFkZCgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGQgKCkge1xuICAgICAgICBjaHVua3Muc3RhcnRUYWcgPSBpbWFnZSA/ICchWycgOiAnWyc7XG4gICAgICAgIGNodW5rcy5lbmRUYWcgPSAnXVsnICsgYW5jaG9yICsgJ10nO1xuXG4gICAgICAgIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgICAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVyc1t0eXBlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpIDwgbGlua3MubGVuZ3RoIC0gMSkgeyAvLyBoYXMgbXVsdGlwbGUgbGlua3MsIG5vdCB0aGUgbGFzdCBvbmVcbiAgICAgICAgICBjaHVua3MuYmVmb3JlICs9IGNodW5rcy5zdGFydFRhZyArIGNodW5rcy5zZWxlY3Rpb24gKyBjaHVua3MuZW5kVGFnICsgJ1xcbic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb25nIChsaW5rKSB7XG4gICAgICByZXR1cm4gbGluay5ocmVmLmxlbmd0aCA+IDA7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlua09ySW1hZ2VPckF0dGFjaG1lbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYW55ID0gcmVxdWlyZSgnLi4vbWFueScpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuLi9zdHJpbmdzJyk7XG52YXIgd3JhcHBpbmcgPSByZXF1aXJlKCcuL3dyYXBwaW5nJyk7XG52YXIgc2V0dGluZ3MgPSByZXF1aXJlKCcuL3NldHRpbmdzJyk7XG52YXIgcnByZXZpb3VzID0gLyhcXG58XikoKFsgXXswLDN9KFsqKy1dfFxcZCtbLl0pWyBcXHRdKy4qKShcXG4uK3xcXG57Mix9KFsqKy1dLip8XFxkK1suXSlbIFxcdF0rLip8XFxuezIsfVsgXFx0XStcXFMuKikqKVxcbiokLztcbnZhciBybmV4dCA9IC9eXFxuKigoWyBdezAsM30oWyorLV18XFxkK1suXSlbIFxcdF0rLiopKFxcbi4rfFxcbnsyLH0oWyorLV0uKnxcXGQrWy5dKVsgXFx0XSsuKnxcXG57Mix9WyBcXHRdK1xcUy4qKSopXFxuKi87XG52YXIgcmJ1bGxldHR5cGUgPSAvXlxccyooWyorLV0pLztcbnZhciByc2tpcHBlciA9IC9bXlxcbl1cXG5cXG5bXlxcbl0vO1xuXG5mdW5jdGlvbiBwYWQgKHRleHQpIHtcbiAgcmV0dXJuICcgJyArIHRleHQgKyAnICc7XG59XG5cbmZ1bmN0aW9uIGxpc3QgKGNodW5rcywgb3JkZXJlZCkge1xuICB2YXIgYnVsbGV0ID0gJy0nO1xuICB2YXIgbnVtID0gMTtcbiAgdmFyIGRpZ2l0YWw7XG4gIHZhciBiZWZvcmVTa2lwID0gMTtcbiAgdmFyIGFmdGVyU2tpcCA9IDE7XG5cbiAgY2h1bmtzLmZpbmRUYWdzKC8oXFxufF4pKlsgXXswLDN9KFsqKy1dfFxcZCtbLl0pXFxzKy8sIG51bGwpO1xuXG4gIGlmIChjaHVua3MuYmVmb3JlICYmICEvXFxuJC8udGVzdChjaHVua3MuYmVmb3JlKSAmJiAhL15cXG4vLnRlc3QoY2h1bmtzLnN0YXJ0VGFnKSkge1xuICAgIGNodW5rcy5iZWZvcmUgKz0gY2h1bmtzLnN0YXJ0VGFnO1xuICAgIGNodW5rcy5zdGFydFRhZyA9ICcnO1xuICB9XG5cbiAgaWYgKGNodW5rcy5zdGFydFRhZykge1xuICAgIGRpZ2l0YWwgPSAvXFxkK1suXS8udGVzdChjaHVua3Muc3RhcnRUYWcpO1xuICAgIGNodW5rcy5zdGFydFRhZyA9ICcnO1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBjaHVua3Muc2VsZWN0aW9uLnJlcGxhY2UoL1xcblsgXXs0fS9nLCAnXFxuJyk7XG4gICAgd3JhcHBpbmcudW53cmFwKGNodW5rcyk7XG4gICAgY2h1bmtzLnNraXAoKTtcblxuICAgIGlmIChkaWdpdGFsKSB7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjaHVua3MuYWZ0ZXIucmVwbGFjZShybmV4dCwgZ2V0UHJlZml4ZWRJdGVtKTtcbiAgICB9XG4gICAgaWYgKG9yZGVyZWQgPT09IGRpZ2l0YWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBjaHVua3MuYmVmb3JlID0gY2h1bmtzLmJlZm9yZS5yZXBsYWNlKHJwcmV2aW91cywgYmVmb3JlUmVwbGFjZXIpO1xuXG4gIGlmICghY2h1bmtzLnNlbGVjdGlvbikge1xuICAgIGNodW5rcy5zZWxlY3Rpb24gPSBzdHJpbmdzLnBsYWNlaG9sZGVycy5saXN0aXRlbTtcbiAgfVxuXG4gIHZhciBwcmVmaXggPSBuZXh0QnVsbGV0KCk7XG4gIHZhciBzcGFjZXMgPSBtYW55KCcgJywgcHJlZml4Lmxlbmd0aCk7XG5cbiAgY2h1bmtzLmFmdGVyID0gY2h1bmtzLmFmdGVyLnJlcGxhY2Uocm5leHQsIGFmdGVyUmVwbGFjZXIpO1xuICBjaHVua3MudHJpbSh0cnVlKTtcbiAgY2h1bmtzLnNraXAoeyBiZWZvcmU6IGJlZm9yZVNraXAsIGFmdGVyOiBhZnRlclNraXAsIGFueTogdHJ1ZSB9KTtcbiAgY2h1bmtzLnN0YXJ0VGFnID0gcHJlZml4O1xuICB3cmFwcGluZy53cmFwKGNodW5rcywgc2V0dGluZ3MubGluZUxlbmd0aCAtIHByZWZpeC5sZW5ndGgpO1xuICBjaHVua3Muc2VsZWN0aW9uID0gY2h1bmtzLnNlbGVjdGlvbi5yZXBsYWNlKC9cXG4vZywgJ1xcbicgKyBzcGFjZXMpO1xuXG4gIGZ1bmN0aW9uIGJlZm9yZVJlcGxhY2VyICh0ZXh0KSB7XG4gICAgaWYgKHJidWxsZXR0eXBlLnRlc3QodGV4dCkpIHtcbiAgICAgIGJ1bGxldCA9IFJlZ0V4cC4kMTtcbiAgICB9XG4gICAgYmVmb3JlU2tpcCA9IHJza2lwcGVyLnRlc3QodGV4dCkgPyAxIDogMDtcbiAgICByZXR1cm4gZ2V0UHJlZml4ZWRJdGVtKHRleHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWZ0ZXJSZXBsYWNlciAodGV4dCkge1xuICAgIGFmdGVyU2tpcCA9IHJza2lwcGVyLnRlc3QodGV4dCkgPyAxIDogMDtcbiAgICByZXR1cm4gZ2V0UHJlZml4ZWRJdGVtKHRleHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbmV4dEJ1bGxldCAoKSB7XG4gICAgaWYgKG9yZGVyZWQpIHtcbiAgICAgIHJldHVybiBwYWQoKG51bSsrKSArICcuJyk7XG4gICAgfVxuICAgIHJldHVybiBwYWQoYnVsbGV0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFByZWZpeGVkSXRlbSAodGV4dCkge1xuICAgIHZhciBybWFya2VycyA9IC9eWyBdezAsM30oWyorLV18XFxkK1suXSlcXHMvZ207XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShybWFya2VycywgbmV4dEJ1bGxldCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbGluZUxlbmd0aDogNzJcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBwcmVmaXhlcyA9ICcoPzpcXFxcc3s0LH18XFxcXHMqPnxcXFxccyotXFxcXHMrfFxcXFxzKlxcXFxkK1xcXFwufD18XFxcXCt8LXxffFxcXFwqfCN8XFxcXHMqXFxcXFtbXlxcbl1dK1xcXFxdOiknO1xudmFyIHJsZWFkaW5ncHJlZml4ZXMgPSBuZXcgUmVnRXhwKCdeJyArIHByZWZpeGVzLCAnJyk7XG52YXIgcnRleHQgPSBuZXcgUmVnRXhwKCcoW15cXFxcbl0pXFxcXG4oPyEoXFxcXG58JyArIHByZWZpeGVzICsgJykpJywgJ2cnKTtcbnZhciBydHJhaWxpbmdzcGFjZXMgPSAvXFxzKyQvO1xuXG5mdW5jdGlvbiB3cmFwIChjaHVua3MsIGxlbikge1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCcoLnsxLCcgKyBsZW4gKyAnfSkoICt8JFxcXFxuPyknLCAnZ20nKTtcblxuICB1bndyYXAoY2h1bmtzKTtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb25cbiAgICAucmVwbGFjZShyZWdleCwgcmVwbGFjZXIpXG4gICAgLnJlcGxhY2UocnRyYWlsaW5nc3BhY2VzLCAnJyk7XG5cbiAgZnVuY3Rpb24gcmVwbGFjZXIgKGxpbmUsIG1hcmtlZCkge1xuICAgIHJldHVybiBybGVhZGluZ3ByZWZpeGVzLnRlc3QobGluZSkgPyBsaW5lIDogbWFya2VkICsgJ1xcbic7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW53cmFwIChjaHVua3MpIHtcbiAgcnRleHQubGFzdEluZGV4ID0gMDtcbiAgY2h1bmtzLnNlbGVjdGlvbiA9IGNodW5rcy5zZWxlY3Rpb24ucmVwbGFjZShydGV4dCwgJyQxICQyJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB3cmFwOiB3cmFwLFxuICB1bndyYXA6IHVud3JhcFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGRpc3Bvc2VkO1xuICByZXR1cm4gZnVuY3Rpb24gZGlzcG9zYWJsZSAoKSB7XG4gICAgaWYgKGRpc3Bvc2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvbmNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZG9jdW1lbnQ7XG5cbmZ1bmN0aW9uIGhvbWVicmV3UVNBIChjbGFzc05hbWUpIHtcbiAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgdmFyIGFsbCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpO1xuICB2YXIgaTtcbiAgZm9yIChpIGluIGFsbCkge1xuICAgIGlmICh3cmFwKGFsbFtpXS5jbGFzc05hbWUpLmluZGV4T2Yod3JhcChjbGFzc05hbWUpKSAhPT0gLTEpIHtcbiAgICAgIHJlc3VsdHMucHVzaChhbGxbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gd3JhcCAodGV4dCkge1xuICByZXR1cm4gJyAnICsgdGV4dCArICcgJztcbn1cblxuZnVuY3Rpb24gY2xvc2VQcm9tcHRzICgpIHtcbiAgaWYgKGRvYy5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICByZW1vdmUoZG9jLmJvZHkucXVlcnlTZWxlY3RvckFsbCgnLndrLXByb21wdCcpKTtcbiAgfSBlbHNlIHtcbiAgICByZW1vdmUoaG9tZWJyZXdRU0EoJ3drLXByb21wdCcpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUgKHByb21wdHMpIHtcbiAgdmFyIGxlbiA9IHByb21wdHMubGVuZ3RoO1xuICB2YXIgaTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgcHJvbXB0c1tpXS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHByb21wdHNbaV0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvc2VQcm9tcHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgYnVyZWF1Y3JhY3kgPSByZXF1aXJlKCdidXJlYXVjcmFjeScpO1xudmFyIHJlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyJyk7XG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4uL2NsYXNzZXMnKTtcbnZhciBzdHJpbmdzID0gcmVxdWlyZSgnLi4vc3RyaW5ncycpO1xudmFyIHVwbG9hZHMgPSByZXF1aXJlKCcuLi91cGxvYWRzJyk7XG52YXIgRU5URVJfS0VZID0gMTM7XG52YXIgRVNDQVBFX0tFWSA9IDI3O1xudmFyIGRyYWdDbGFzcyA9ICd3ay1kcmFnZ2luZyc7XG52YXIgZHJhZ0NsYXNzU3BlY2lmaWMgPSAnd2stcHJvbXB0LXVwbG9hZC1kcmFnZ2luZyc7XG52YXIgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuZnVuY3Rpb24gY2xhc3NpZnkgKGdyb3VwLCBjbGFzc2VzKSB7XG4gIE9iamVjdC5rZXlzKGdyb3VwKS5mb3JFYWNoKGN1c3RvbWl6ZSk7XG4gIGZ1bmN0aW9uIGN1c3RvbWl6ZSAoa2V5KSB7XG4gICAgaWYgKGNsYXNzZXNba2V5XSkge1xuICAgICAgZ3JvdXBba2V5XS5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3Nlc1trZXldO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9tcHQgKG9wdGlvbnMsIGRvbmUpIHtcbiAgdmFyIHRleHQgPSBzdHJpbmdzLnByb21wdHNbb3B0aW9ucy50eXBlXTtcbiAgdmFyIGRvbSA9IHJlbmRlcih7XG4gICAgaWQ6ICd3ay1wcm9tcHQtJyArIG9wdGlvbnMudHlwZSxcbiAgICB0aXRsZTogdGV4dC50aXRsZSxcbiAgICBkZXNjcmlwdGlvbjogdGV4dC5kZXNjcmlwdGlvbixcbiAgICBwbGFjZWhvbGRlcjogdGV4dC5wbGFjZWhvbGRlclxuICB9KTtcbiAgdmFyIGRvbXVwO1xuXG4gIGNyb3NzdmVudC5hZGQoZG9tLmNhbmNlbCwgJ2NsaWNrJywgcmVtb3ZlKTtcbiAgY3Jvc3N2ZW50LmFkZChkb20uY2xvc2UsICdjbGljaycsIHJlbW92ZSk7XG4gIGNyb3NzdmVudC5hZGQoZG9tLm9rLCAnY2xpY2snLCBvayk7XG4gIGNyb3NzdmVudC5hZGQoZG9tLmlucHV0LCAna2V5cHJlc3MnLCBlbnRlcik7XG4gIGNyb3NzdmVudC5hZGQoZG9tLmRpYWxvZywgJ2tleWRvd24nLCBlc2MpO1xuICBjbGFzc2lmeShkb20sIG9wdGlvbnMuY2xhc3Nlcy5wcm9tcHRzKTtcblxuICB2YXIgdXBsb2FkID0gb3B0aW9ucy51cGxvYWQ7XG4gIGlmICh0eXBlb2YgdXBsb2FkID09PSAnc3RyaW5nJykge1xuICAgIHVwbG9hZCA9IHsgdXJsOiB1cGxvYWQgfTtcbiAgfVxuXG4gIHZhciBidXJlYXVjcmF0ID0gbnVsbDtcbiAgaWYgKHVwbG9hZCkge1xuICAgIGJ1cmVhdWNyYXQgPSBhcnJhbmdlVXBsb2FkcygpO1xuICAgIGlmIChvcHRpb25zLmF1dG9VcGxvYWQpIHtcbiAgICAgIGJ1cmVhdWNyYXQuc3VibWl0KG9wdGlvbnMuYXV0b1VwbG9hZCk7XG4gICAgfVxuICB9XG5cbiAgc2V0VGltZW91dChmb2N1c0RpYWxvZywgMCk7XG5cbiAgZnVuY3Rpb24gZm9jdXNEaWFsb2cgKCkge1xuICAgIGRvbS5pbnB1dC5mb2N1cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZW50ZXIgKGUpIHtcbiAgICB2YXIga2V5ID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYgKGtleSA9PT0gRU5URVJfS0VZKSB7XG4gICAgICBvaygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVzYyAoZSkge1xuICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAoa2V5ID09PSBFU0NBUEVfS0VZKSB7XG4gICAgICByZW1vdmUoKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvayAoKSB7XG4gICAgcmVtb3ZlKCk7XG4gICAgZG9uZSh7IGRlZmluaXRpb25zOiBbZG9tLmlucHV0LnZhbHVlXSB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZSAoKSB7XG4gICAgaWYgKHVwbG9hZCkgeyBiaW5kVXBsb2FkRXZlbnRzKHRydWUpOyB9XG4gICAgaWYgKGRvbS5kaWFsb2cucGFyZW50RWxlbWVudCkgeyBkb20uZGlhbG9nLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tLmRpYWxvZyk7IH1cbiAgICBvcHRpb25zLnN1cmZhY2UuZm9jdXMob3B0aW9ucy5tb2RlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmRVcGxvYWRFdmVudHMgKHJlbW92ZSkge1xuICAgIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gICAgY3Jvc3N2ZW50W29wXShyb290LCAnZHJhZ2VudGVyJywgZHJhZ2dpbmcpO1xuICAgIGNyb3NzdmVudFtvcF0ocm9vdCwgJ2RyYWdlbmQnLCBkcmFnc3RvcCk7XG4gICAgY3Jvc3N2ZW50W29wXShyb290LCAnbW91c2VvdXQnLCBkcmFnc3RvcCk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmFnZ2luZyAoKSB7XG4gICAgY2xhc3Nlcy5hZGQoZG9tdXAuYXJlYSwgZHJhZ0NsYXNzKTtcbiAgICBjbGFzc2VzLmFkZChkb211cC5hcmVhLCBkcmFnQ2xhc3NTcGVjaWZpYyk7XG4gIH1cbiAgZnVuY3Rpb24gZHJhZ3N0b3AgKCkge1xuICAgIGNsYXNzZXMucm0oZG9tdXAuYXJlYSwgZHJhZ0NsYXNzKTtcbiAgICBjbGFzc2VzLnJtKGRvbXVwLmFyZWEsIGRyYWdDbGFzc1NwZWNpZmljKTtcbiAgICB1cGxvYWRzLnN0b3Aob3B0aW9ucy5zdXJmYWNlLmRyb3BhcmVhKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFycmFuZ2VVcGxvYWRzICgpIHtcbiAgICBkb211cCA9IHJlbmRlci51cGxvYWRzKGRvbSwgc3RyaW5ncy5wcm9tcHRzLnR5cGVzICsgKHVwbG9hZC5yZXN0cmljdGlvbiB8fCBvcHRpb25zLnR5cGUgKyAncycpKTtcbiAgICBiaW5kVXBsb2FkRXZlbnRzKCk7XG4gICAgY3Jvc3N2ZW50LmFkZChkb211cC5hcmVhLCAnZHJhZ292ZXInLCBoYW5kbGVEcmFnT3ZlciwgZmFsc2UpO1xuICAgIGNyb3NzdmVudC5hZGQoZG9tdXAuYXJlYSwgJ2Ryb3AnLCBoYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG4gICAgY2xhc3NpZnkoZG9tdXAsIG9wdGlvbnMuY2xhc3Nlcy5wcm9tcHRzKTtcblxuICAgIHZhciBidXJlYXVjcmF0ID0gYnVyZWF1Y3JhY3kuc2V0dXAoZG9tdXAuZmlsZWlucHV0LCB7XG4gICAgICBtZXRob2Q6IHVwbG9hZC5tZXRob2QsXG4gICAgICBmb3JtRGF0YTogdXBsb2FkLmZvcm1EYXRhLFxuICAgICAgZmllbGRLZXk6IHVwbG9hZC5maWVsZEtleSxcbiAgICAgIHhock9wdGlvbnM6IHVwbG9hZC54aHJPcHRpb25zLFxuICAgICAgZW5kcG9pbnQ6IHVwbG9hZC51cmwsXG4gICAgICB2YWxpZGF0ZTogdXBsb2FkLnZhbGlkYXRlIHx8ICdpbWFnZSdcbiAgICB9KTtcblxuICAgIGJ1cmVhdWNyYXQub24oJ3N0YXJ0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjbGFzc2VzLnJtKGRvbXVwLmZhaWxlZCwgJ3drLXByb21wdC1lcnJvci1zaG93Jyk7XG4gICAgICBjbGFzc2VzLnJtKGRvbXVwLndhcm5pbmcsICd3ay1wcm9tcHQtZXJyb3Itc2hvdycpO1xuICAgIH0pO1xuICAgIGJ1cmVhdWNyYXQub24oJ3ZhbGlkJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2xhc3Nlcy5hZGQoZG9tdXAuYXJlYSwgJ3drLXByb21wdC11cGxvYWRpbmcnKTtcbiAgICB9KTtcbiAgICBidXJlYXVjcmF0Lm9uKCdpbnZhbGlkJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2xhc3Nlcy5hZGQoZG9tdXAud2FybmluZywgJ3drLXByb21wdC1lcnJvci1zaG93Jyk7XG4gICAgfSk7XG4gICAgYnVyZWF1Y3JhdC5vbignZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjbGFzc2VzLmFkZChkb211cC5mYWlsZWQsICd3ay1wcm9tcHQtZXJyb3Itc2hvdycpO1xuICAgIH0pO1xuICAgIGJ1cmVhdWNyYXQub24oJ3N1Y2Nlc3MnLCByZWNlaXZlZEltYWdlcyk7XG4gICAgYnVyZWF1Y3JhdC5vbignZW5kZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjbGFzc2VzLnJtKGRvbXVwLmFyZWEsICd3ay1wcm9tcHQtdXBsb2FkaW5nJyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYnVyZWF1Y3JhdDtcblxuICAgIGZ1bmN0aW9uIHJlY2VpdmVkSW1hZ2VzIChyZXN1bHRzKSB7XG4gICAgICB2YXIgYm9keSA9IHJlc3VsdHNbMF07XG4gICAgICBkb20uaW5wdXQudmFsdWUgPSBib2R5LmhyZWYgKyAnIFwiJyArIGJvZHkudGl0bGUgKyAnXCInO1xuICAgICAgcmVtb3ZlKCk7XG4gICAgICBkb25lKHtcbiAgICAgICAgZGVmaW5pdGlvbnM6IHJlc3VsdHMubWFwKHRvRGVmaW5pdGlvbiksXG4gICAgICAgIGF0dGFjaG1lbnQ6IG9wdGlvbnMudHlwZSA9PT0gJ2F0dGFjaG1lbnQnXG4gICAgICB9KTtcbiAgICAgIGZ1bmN0aW9uIHRvRGVmaW5pdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQuaHJlZiArICcgXCInICsgcmVzdWx0LnRpdGxlICsgJ1wiJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVEcmFnT3ZlciAoZSkge1xuICAgIHN0b3AoZSk7XG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUZpbGVTZWxlY3QgKGUpIHtcbiAgICBkcmFnc3RvcCgpO1xuICAgIHN0b3AoZSk7XG4gICAgYnVyZWF1Y3JhdC5zdWJtaXQoZS5kYXRhVHJhbnNmZXIuZmlsZXMpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvbXB0O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgZ2V0VGV4dCA9IHJlcXVpcmUoJy4uL2dldFRleHQnKTtcbnZhciBzZXRUZXh0ID0gcmVxdWlyZSgnLi4vc2V0VGV4dCcpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuLi9jbGFzc2VzJyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MnKTtcbnZhciBhYyA9ICdhcHBlbmRDaGlsZCc7XG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuXG5mdW5jdGlvbiBlICh0eXBlLCBjbHMsIHRleHQpIHtcbiAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGVsLmNsYXNzTmFtZSA9IGNscztcbiAgaWYgKHRleHQpIHtcbiAgICBzZXRUZXh0KGVsLCB0ZXh0KTtcbiAgfVxuICByZXR1cm4gZWw7XG59XG5cbmZ1bmN0aW9uIHJlbmRlciAob3B0aW9ucykge1xuICB2YXIgZG9tID0ge1xuICAgIGRpYWxvZzogZSgnYXJ0aWNsZScsICd3ay1wcm9tcHQgJyArIG9wdGlvbnMuaWQpLFxuICAgIGNsb3NlOiBlKCdhJywgJ3drLXByb21wdC1jbG9zZScpLFxuICAgIGhlYWRlcjogZSgnaGVhZGVyJywgJ3drLXByb21wdC1oZWFkZXInKSxcbiAgICBoMTogZSgnaDEnLCAnd2stcHJvbXB0LXRpdGxlJywgb3B0aW9ucy50aXRsZSksXG4gICAgc2VjdGlvbjogZSgnc2VjdGlvbicsICd3ay1wcm9tcHQtYm9keScpLFxuICAgIGRlc2M6IGUoJ3AnLCAnd2stcHJvbXB0LWRlc2NyaXB0aW9uJywgb3B0aW9ucy5kZXNjcmlwdGlvbiksXG4gICAgaW5wdXRDb250YWluZXI6IGUoJ2RpdicsICd3ay1wcm9tcHQtaW5wdXQtY29udGFpbmVyJyksXG4gICAgaW5wdXQ6IGUoJ2lucHV0JywgJ3drLXByb21wdC1pbnB1dCcpLFxuICAgIGNhbmNlbDogZSgnYnV0dG9uJywgJ3drLXByb21wdC1jYW5jZWwnLCAnQ2FuY2VsJyksXG4gICAgb2s6IGUoJ2J1dHRvbicsICd3ay1wcm9tcHQtb2snLCAnT2snKSxcbiAgICBmb290ZXI6IGUoJ2Zvb3RlcicsICd3ay1wcm9tcHQtYnV0dG9ucycpXG4gIH07XG4gIGRvbS5vay50eXBlID0gJ2J1dHRvbic7XG4gIGRvbS5oZWFkZXJbYWNdKGRvbS5oMSk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb20uZGVzYyk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb20uaW5wdXRDb250YWluZXIpO1xuICBkb20uaW5wdXRDb250YWluZXJbYWNdKGRvbS5pbnB1dCk7XG4gIGRvbS5pbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXI7XG4gIGRvbS5jYW5jZWwudHlwZSA9ICdidXR0b24nO1xuICBkb20uZm9vdGVyW2FjXShkb20uY2FuY2VsKTtcbiAgZG9tLmZvb3RlclthY10oZG9tLm9rKTtcbiAgZG9tLmRpYWxvZ1thY10oZG9tLmNsb3NlKTtcbiAgZG9tLmRpYWxvZ1thY10oZG9tLmhlYWRlcik7XG4gIGRvbS5kaWFsb2dbYWNdKGRvbS5zZWN0aW9uKTtcbiAgZG9tLmRpYWxvZ1thY10oZG9tLmZvb3Rlcik7XG4gIGRvYy5ib2R5W2FjXShkb20uZGlhbG9nKTtcbiAgcmV0dXJuIGRvbTtcbn1cblxuZnVuY3Rpb24gdXBsb2FkcyAoZG9tLCB3YXJuaW5nKSB7XG4gIHZhciBmdXAgPSAnd2stcHJvbXB0LWZpbGV1cGxvYWQnO1xuICB2YXIgZG9tdXAgPSB7XG4gICAgYXJlYTogZSgnc2VjdGlvbicsICd3ay1wcm9tcHQtdXBsb2FkLWFyZWEnKSxcbiAgICB3YXJuaW5nOiBlKCdwJywgJ3drLXByb21wdC1lcnJvciB3ay13YXJuaW5nJywgd2FybmluZyksXG4gICAgZmFpbGVkOiBlKCdwJywgJ3drLXByb21wdC1lcnJvciB3ay1mYWlsZWQnLCBzdHJpbmdzLnByb21wdHMudXBsb2FkZmFpbGVkKSxcbiAgICB1cGxvYWQ6IGUoJ2xhYmVsJywgJ3drLXByb21wdC11cGxvYWQnKSxcbiAgICB1cGxvYWRpbmc6IGUoJ3NwYW4nLCAnd2stcHJvbXB0LXByb2dyZXNzJywgc3RyaW5ncy5wcm9tcHRzLnVwbG9hZGluZyksXG4gICAgZHJvcDogZSgnc3BhbicsICd3ay1wcm9tcHQtZHJvcCcsIHN0cmluZ3MucHJvbXB0cy5kcm9wKSxcbiAgICBkcm9waWNvbjogZSgncCcsICd3ay1kcm9wLWljb24gd2stcHJvbXB0LWRyb3AtaWNvbicpLFxuICAgIGJyb3dzZTogZSgnc3BhbicsICd3ay1wcm9tcHQtYnJvd3NlJywgc3RyaW5ncy5wcm9tcHRzLmJyb3dzZSksXG4gICAgZHJhZ2Ryb3A6IGUoJ3AnLCAnd2stcHJvbXB0LWRyYWdkcm9wJywgc3RyaW5ncy5wcm9tcHRzLmRyb3BoaW50KSxcbiAgICBmaWxlaW5wdXQ6IGUoJ2lucHV0JywgZnVwKVxuICB9O1xuICBkb211cC5hcmVhW2FjXShkb211cC5kcm9wKTtcbiAgZG9tdXAuYXJlYVthY10oZG9tdXAudXBsb2FkaW5nKTtcbiAgZG9tdXAuYXJlYVthY10oZG9tdXAuZHJvcGljb24pO1xuICBkb211cC51cGxvYWRbYWNdKGRvbXVwLmJyb3dzZSk7XG4gIGRvbXVwLnVwbG9hZFthY10oZG9tdXAuZmlsZWlucHV0KTtcbiAgZG9tdXAuZmlsZWlucHV0LmlkID0gZnVwO1xuICBkb211cC5maWxlaW5wdXQudHlwZSA9ICdmaWxlJztcbiAgZG9tdXAuZmlsZWlucHV0Lm11bHRpcGxlID0gJ211bHRpcGxlJztcbiAgZG9tLmRpYWxvZy5jbGFzc05hbWUgKz0gJyB3ay1wcm9tcHQtdXBsb2Fkcyc7XG4gIGRvbS5pbnB1dENvbnRhaW5lci5jbGFzc05hbWUgKz0gJyB3ay1wcm9tcHQtaW5wdXQtY29udGFpbmVyLXVwbG9hZHMnO1xuICBkb20uaW5wdXQuY2xhc3NOYW1lICs9ICcgd2stcHJvbXB0LWlucHV0LXVwbG9hZHMnO1xuICBkb20uc2VjdGlvbi5pbnNlcnRCZWZvcmUoZG9tdXAud2FybmluZywgZG9tLmlucHV0Q29udGFpbmVyKTtcbiAgZG9tLnNlY3Rpb24uaW5zZXJ0QmVmb3JlKGRvbXVwLmZhaWxlZCwgZG9tLmlucHV0Q29udGFpbmVyKTtcbiAgZG9tLnNlY3Rpb25bYWNdKGRvbXVwLnVwbG9hZCk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb211cC5kcmFnZHJvcCk7XG4gIGRvbS5zZWN0aW9uW2FjXShkb211cC5hcmVhKTtcbiAgc2V0VGV4dChkb20uZGVzYywgZ2V0VGV4dChkb20uZGVzYykgKyBzdHJpbmdzLnByb21wdHMudXBsb2FkKTtcbiAgY3Jvc3N2ZW50LmFkZChkb211cC5maWxlaW5wdXQsICdmb2N1cycsIGZvY3VzZWRGaWxlSW5wdXQpO1xuICBjcm9zc3ZlbnQuYWRkKGRvbXVwLmZpbGVpbnB1dCwgJ2JsdXInLCBibHVycmVkRmlsZUlucHV0KTtcblxuICBmdW5jdGlvbiBmb2N1c2VkRmlsZUlucHV0ICgpIHtcbiAgICBjbGFzc2VzLmFkZChkb211cC51cGxvYWQsICd3ay1mb2N1c2VkJyk7XG4gIH1cbiAgZnVuY3Rpb24gYmx1cnJlZEZpbGVJbnB1dCAoKSB7XG4gICAgY2xhc3Nlcy5ybShkb211cC51cGxvYWQsICd3ay1mb2N1c2VkJyk7XG4gIH1cbiAgcmV0dXJuIGRvbXVwO1xufVxuXG5yZW5kZXIudXBsb2FkcyA9IHVwbG9hZHM7XG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlcjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5d2NtOXRjSFJ6TDNKbGJtUmxjaTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCamNtOXpjM1psYm5RZ1BTQnlaWEYxYVhKbEtDZGpjbTl6YzNabGJuUW5LVHRjYm5aaGNpQm5aWFJVWlhoMElEMGdjbVZ4ZFdseVpTZ25MaTR2WjJWMFZHVjRkQ2NwTzF4dWRtRnlJSE5sZEZSbGVIUWdQU0J5WlhGMWFYSmxLQ2N1TGk5elpYUlVaWGgwSnlrN1hHNTJZWElnWTJ4aGMzTmxjeUE5SUhKbGNYVnBjbVVvSnk0dUwyTnNZWE56WlhNbktUdGNiblpoY2lCemRISnBibWR6SUQwZ2NtVnhkV2x5WlNnbkxpNHZjM1J5YVc1bmN5Y3BPMXh1ZG1GeUlHRmpJRDBnSjJGd2NHVnVaRU5vYVd4a0p6dGNiblpoY2lCa2IyTWdQU0JuYkc5aVlXd3VaRzlqZFcxbGJuUTdYRzVjYm1aMWJtTjBhVzl1SUdVZ0tIUjVjR1VzSUdOc2N5d2dkR1Y0ZENrZ2UxeHVJQ0IyWVhJZ1pXd2dQU0JrYjJNdVkzSmxZWFJsUld4bGJXVnVkQ2gwZVhCbEtUdGNiaUFnWld3dVkyeGhjM05PWVcxbElEMGdZMnh6TzF4dUlDQnBaaUFvZEdWNGRDa2dlMXh1SUNBZ0lITmxkRlJsZUhRb1pXd3NJSFJsZUhRcE8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCbGJEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z2NtVnVaR1Z5SUNodmNIUnBiMjV6S1NCN1hHNGdJSFpoY2lCa2IyMGdQU0I3WEc0Z0lDQWdaR2xoYkc5bk9pQmxLQ2RoY25ScFkyeGxKeXdnSjNkckxYQnliMjF3ZENBbklDc2diM0IwYVc5dWN5NXBaQ2tzWEc0Z0lDQWdZMnh2YzJVNklHVW9KMkVuTENBbmQyc3RjSEp2YlhCMExXTnNiM05sSnlrc1hHNGdJQ0FnYUdWaFpHVnlPaUJsS0Nkb1pXRmtaWEluTENBbmQyc3RjSEp2YlhCMExXaGxZV1JsY2ljcExGeHVJQ0FnSUdneE9pQmxLQ2RvTVNjc0lDZDNheTF3Y205dGNIUXRkR2wwYkdVbkxDQnZjSFJwYjI1ekxuUnBkR3hsS1N4Y2JpQWdJQ0J6WldOMGFXOXVPaUJsS0NkelpXTjBhVzl1Snl3Z0ozZHJMWEJ5YjIxd2RDMWliMlI1Snlrc1hHNGdJQ0FnWkdWell6b2daU2duY0Njc0lDZDNheTF3Y205dGNIUXRaR1Z6WTNKcGNIUnBiMjRuTENCdmNIUnBiMjV6TG1SbGMyTnlhWEIwYVc5dUtTeGNiaUFnSUNCcGJuQjFkRU52Ym5SaGFXNWxjam9nWlNnblpHbDJKeXdnSjNkckxYQnliMjF3ZEMxcGJuQjFkQzFqYjI1MFlXbHVaWEluS1N4Y2JpQWdJQ0JwYm5CMWREb2daU2duYVc1d2RYUW5MQ0FuZDJzdGNISnZiWEIwTFdsdWNIVjBKeWtzWEc0Z0lDQWdZMkZ1WTJWc09pQmxLQ2RpZFhSMGIyNG5MQ0FuZDJzdGNISnZiWEIwTFdOaGJtTmxiQ2NzSUNkRFlXNWpaV3duS1N4Y2JpQWdJQ0J2YXpvZ1pTZ25ZblYwZEc5dUp5d2dKM2RyTFhCeWIyMXdkQzF2YXljc0lDZFBheWNwTEZ4dUlDQWdJR1p2YjNSbGNqb2daU2duWm05dmRHVnlKeXdnSjNkckxYQnliMjF3ZEMxaWRYUjBiMjV6SnlsY2JpQWdmVHRjYmlBZ1pHOXRMbTlyTG5SNWNHVWdQU0FuWW5WMGRHOXVKenRjYmlBZ1pHOXRMbWhsWVdSbGNsdGhZMTBvWkc5dExtZ3hLVHRjYmlBZ1pHOXRMbk5sWTNScGIyNWJZV05kS0dSdmJTNWtaWE5qS1R0Y2JpQWdaRzl0TG5ObFkzUnBiMjViWVdOZEtHUnZiUzVwYm5CMWRFTnZiblJoYVc1bGNpazdYRzRnSUdSdmJTNXBibkIxZEVOdmJuUmhhVzVsY2x0aFkxMG9aRzl0TG1sdWNIVjBLVHRjYmlBZ1pHOXRMbWx1Y0hWMExuQnNZV05sYUc5c1pHVnlJRDBnYjNCMGFXOXVjeTV3YkdGalpXaHZiR1JsY2p0Y2JpQWdaRzl0TG1OaGJtTmxiQzUwZVhCbElEMGdKMkoxZEhSdmJpYzdYRzRnSUdSdmJTNW1iMjkwWlhKYllXTmRLR1J2YlM1allXNWpaV3dwTzF4dUlDQmtiMjB1Wm05dmRHVnlXMkZqWFNoa2IyMHViMnNwTzF4dUlDQmtiMjB1WkdsaGJHOW5XMkZqWFNoa2IyMHVZMnh2YzJVcE8xeHVJQ0JrYjIwdVpHbGhiRzluVzJGalhTaGtiMjB1YUdWaFpHVnlLVHRjYmlBZ1pHOXRMbVJwWVd4dloxdGhZMTBvWkc5dExuTmxZM1JwYjI0cE8xeHVJQ0JrYjIwdVpHbGhiRzluVzJGalhTaGtiMjB1Wm05dmRHVnlLVHRjYmlBZ1pHOWpMbUp2WkhsYllXTmRLR1J2YlM1a2FXRnNiMmNwTzF4dUlDQnlaWFIxY200Z1pHOXRPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjFjR3h2WVdSeklDaGtiMjBzSUhkaGNtNXBibWNwSUh0Y2JpQWdkbUZ5SUdaMWNDQTlJQ2QzYXkxd2NtOXRjSFF0Wm1sc1pYVndiRzloWkNjN1hHNGdJSFpoY2lCa2IyMTFjQ0E5SUh0Y2JpQWdJQ0JoY21WaE9pQmxLQ2R6WldOMGFXOXVKeXdnSjNkckxYQnliMjF3ZEMxMWNHeHZZV1F0WVhKbFlTY3BMRnh1SUNBZ0lIZGhjbTVwYm1jNklHVW9KM0FuTENBbmQyc3RjSEp2YlhCMExXVnljbTl5SUhkckxYZGhjbTVwYm1jbkxDQjNZWEp1YVc1bktTeGNiaUFnSUNCbVlXbHNaV1E2SUdVb0ozQW5MQ0FuZDJzdGNISnZiWEIwTFdWeWNtOXlJSGRyTFdaaGFXeGxaQ2NzSUhOMGNtbHVaM011Y0hKdmJYQjBjeTUxY0d4dllXUm1ZV2xzWldRcExGeHVJQ0FnSUhWd2JHOWhaRG9nWlNnbmJHRmlaV3duTENBbmQyc3RjSEp2YlhCMExYVndiRzloWkNjcExGeHVJQ0FnSUhWd2JHOWhaR2x1WnpvZ1pTZ25jM0JoYmljc0lDZDNheTF3Y205dGNIUXRjSEp2WjNKbGMzTW5MQ0J6ZEhKcGJtZHpMbkJ5YjIxd2RITXVkWEJzYjJGa2FXNW5LU3hjYmlBZ0lDQmtjbTl3T2lCbEtDZHpjR0Z1Snl3Z0ozZHJMWEJ5YjIxd2RDMWtjbTl3Snl3Z2MzUnlhVzVuY3k1d2NtOXRjSFJ6TG1SeWIzQXBMRnh1SUNBZ0lHUnliM0JwWTI5dU9pQmxLQ2R3Snl3Z0ozZHJMV1J5YjNBdGFXTnZiaUIzYXkxd2NtOXRjSFF0WkhKdmNDMXBZMjl1Snlrc1hHNGdJQ0FnWW5KdmQzTmxPaUJsS0NkemNHRnVKeXdnSjNkckxYQnliMjF3ZEMxaWNtOTNjMlVuTENCemRISnBibWR6TG5CeWIyMXdkSE11WW5KdmQzTmxLU3hjYmlBZ0lDQmtjbUZuWkhKdmNEb2daU2duY0Njc0lDZDNheTF3Y205dGNIUXRaSEpoWjJSeWIzQW5MQ0J6ZEhKcGJtZHpMbkJ5YjIxd2RITXVaSEp2Y0docGJuUXBMRnh1SUNBZ0lHWnBiR1ZwYm5CMWREb2daU2duYVc1d2RYUW5MQ0JtZFhBcFhHNGdJSDA3WEc0Z0lHUnZiWFZ3TG1GeVpXRmJZV05kS0dSdmJYVndMbVJ5YjNBcE8xeHVJQ0JrYjIxMWNDNWhjbVZoVzJGalhTaGtiMjExY0M1MWNHeHZZV1JwYm1jcE8xeHVJQ0JrYjIxMWNDNWhjbVZoVzJGalhTaGtiMjExY0M1a2NtOXdhV052YmlrN1hHNGdJR1J2YlhWd0xuVndiRzloWkZ0aFkxMG9aRzl0ZFhBdVluSnZkM05sS1R0Y2JpQWdaRzl0ZFhBdWRYQnNiMkZrVzJGalhTaGtiMjExY0M1bWFXeGxhVzV3ZFhRcE8xeHVJQ0JrYjIxMWNDNW1hV3hsYVc1d2RYUXVhV1FnUFNCbWRYQTdYRzRnSUdSdmJYVndMbVpwYkdWcGJuQjFkQzUwZVhCbElEMGdKMlpwYkdVbk8xeHVJQ0JrYjIxMWNDNW1hV3hsYVc1d2RYUXViWFZzZEdsd2JHVWdQU0FuYlhWc2RHbHdiR1VuTzF4dUlDQmtiMjB1WkdsaGJHOW5MbU5zWVhOelRtRnRaU0FyUFNBbklIZHJMWEJ5YjIxd2RDMTFjR3h2WVdSekp6dGNiaUFnWkc5dExtbHVjSFYwUTI5dWRHRnBibVZ5TG1Oc1lYTnpUbUZ0WlNBclBTQW5JSGRyTFhCeWIyMXdkQzFwYm5CMWRDMWpiMjUwWVdsdVpYSXRkWEJzYjJGa2N5YzdYRzRnSUdSdmJTNXBibkIxZEM1amJHRnpjMDVoYldVZ0t6MGdKeUIzYXkxd2NtOXRjSFF0YVc1d2RYUXRkWEJzYjJGa2N5YzdYRzRnSUdSdmJTNXpaV04wYVc5dUxtbHVjMlZ5ZEVKbFptOXlaU2hrYjIxMWNDNTNZWEp1YVc1bkxDQmtiMjB1YVc1d2RYUkRiMjUwWVdsdVpYSXBPMXh1SUNCa2IyMHVjMlZqZEdsdmJpNXBibk5sY25SQ1pXWnZjbVVvWkc5dGRYQXVabUZwYkdWa0xDQmtiMjB1YVc1d2RYUkRiMjUwWVdsdVpYSXBPMXh1SUNCa2IyMHVjMlZqZEdsdmJsdGhZMTBvWkc5dGRYQXVkWEJzYjJGa0tUdGNiaUFnWkc5dExuTmxZM1JwYjI1YllXTmRLR1J2YlhWd0xtUnlZV2RrY205d0tUdGNiaUFnWkc5dExuTmxZM1JwYjI1YllXTmRLR1J2YlhWd0xtRnlaV0VwTzF4dUlDQnpaWFJVWlhoMEtHUnZiUzVrWlhOakxDQm5aWFJVWlhoMEtHUnZiUzVrWlhOaktTQXJJSE4wY21sdVozTXVjSEp2YlhCMGN5NTFjR3h2WVdRcE8xeHVJQ0JqY205emMzWmxiblF1WVdSa0tHUnZiWFZ3TG1acGJHVnBibkIxZEN3Z0oyWnZZM1Z6Snl3Z1ptOWpkWE5sWkVacGJHVkpibkIxZENrN1hHNGdJR055YjNOemRtVnVkQzVoWkdRb1pHOXRkWEF1Wm1sc1pXbHVjSFYwTENBbllteDFjaWNzSUdKc2RYSnlaV1JHYVd4bFNXNXdkWFFwTzF4dVhHNGdJR1oxYm1OMGFXOXVJR1p2WTNWelpXUkdhV3hsU1c1d2RYUWdLQ2tnZTF4dUlDQWdJR05zWVhOelpYTXVZV1JrS0dSdmJYVndMblZ3Ykc5aFpDd2dKM2RyTFdadlkzVnpaV1FuS1R0Y2JpQWdmVnh1SUNCbWRXNWpkR2x2YmlCaWJIVnljbVZrUm1sc1pVbHVjSFYwSUNncElIdGNiaUFnSUNCamJHRnpjMlZ6TG5KdEtHUnZiWFZ3TG5Wd2JHOWhaQ3dnSjNkckxXWnZZM1Z6WldRbktUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1pHOXRkWEE3WEc1OVhHNWNibkpsYm1SbGNpNTFjR3h2WVdSeklEMGdkWEJzYjJGa2N6dGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjbVZ1WkdWeU8xeHVJbDE5IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYnVsbHNleWUgPSByZXF1aXJlKCdidWxsc2V5ZScpO1xuXG5mdW5jdGlvbiByZW1lbWJlclNlbGVjdGlvbiAoaGlzdG9yeSkge1xuICB2YXIgY29kZSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTgpLnN1YnN0cigyKS5yZXBsYWNlKC9cXGQrL2csICcnKTtcbiAgdmFyIG9wZW4gPSAnV29vZm1hcmtTZWxlY3Rpb25PcGVuTWFya2VyJyArIGNvZGU7XG4gIHZhciBjbG9zZSA9ICdXb29mbWFya1NlbGVjdGlvbkNsb3NlTWFya2VyJyArIGNvZGU7XG4gIHZhciBybWFya2VycyA9IG5ldyBSZWdFeHAob3BlbiArICd8JyArIGNsb3NlLCAnZycpO1xuICByZXR1cm4ge1xuICAgIG1hcmtlcnM6IG1hcmtlcnMoKSxcbiAgICB1bm1hcms6IHVubWFya1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1hcmtlcnMgKCkge1xuICAgIHZhciBzdGF0ZSA9IGhpc3RvcnkucmVzZXQoKS5pbnB1dFN0YXRlO1xuICAgIHZhciBjaHVua3MgPSBzdGF0ZS5nZXRDaHVua3MoKTtcbiAgICB2YXIgc2VsZWN0aW9uU3RhcnQgPSBjaHVua3MuYmVmb3JlLmxlbmd0aDtcbiAgICB2YXIgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uU3RhcnQgKyBjaHVua3Muc2VsZWN0aW9uLmxlbmd0aDtcbiAgICByZXR1cm4gW1tzZWxlY3Rpb25TdGFydCwgb3Blbl0sIFtzZWxlY3Rpb25FbmQsIGNsb3NlXV07XG4gIH1cblxuICBmdW5jdGlvbiB1bm1hcmsgKCkge1xuICAgIHZhciBzdGF0ZSA9IGhpc3RvcnkuaW5wdXRTdGF0ZTtcbiAgICB2YXIgY2h1bmtzID0gc3RhdGUuZ2V0Q2h1bmtzKCk7XG4gICAgdmFyIGFsbCA9IGNodW5rcy5iZWZvcmUgKyBjaHVua3Muc2VsZWN0aW9uICsgY2h1bmtzLmFmdGVyO1xuICAgIHZhciBzdGFydCA9IGFsbC5sYXN0SW5kZXhPZihvcGVuKTtcbiAgICB2YXIgZW5kID0gYWxsLmxhc3RJbmRleE9mKGNsb3NlKSArIGNsb3NlLmxlbmd0aDtcbiAgICB2YXIgc2VsZWN0aW9uU3RhcnQgPSBzdGFydCA9PT0gLTEgPyAwIDogc3RhcnQ7XG4gICAgdmFyIHNlbGVjdGlvbkVuZCA9IGVuZCA9PT0gLTEgPyAwIDogZW5kO1xuICAgIGNodW5rcy5iZWZvcmUgPSBhbGwuc3Vic3RyKDAsIHNlbGVjdGlvblN0YXJ0KS5yZXBsYWNlKHJtYXJrZXJzLCAnJyk7XG4gICAgY2h1bmtzLnNlbGVjdGlvbiA9IGFsbC5zdWJzdHIoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCAtIHNlbGVjdGlvblN0YXJ0KS5yZXBsYWNlKHJtYXJrZXJzLCAnJyk7XG4gICAgY2h1bmtzLmFmdGVyID0gYWxsLnN1YnN0cihlbmQpLnJlcGxhY2Uocm1hcmtlcnMsICcnKTtcbiAgICB2YXIgZWwgPSBoaXN0b3J5LnN1cmZhY2UuY3VycmVudChoaXN0b3J5LmlucHV0TW9kZSk7XG4gICAgdmFyIGV5ZSA9IGJ1bGxzZXllKGVsLCB7XG4gICAgICBjYXJldDogdHJ1ZSwgYXV0b3VwZGF0ZVRvQ2FyZXQ6IGZhbHNlLCB0cmFja2luZzogZmFsc2VcbiAgICB9KTtcbiAgICBzdGF0ZS5zZXRDaHVua3MoY2h1bmtzKTtcbiAgICBzdGF0ZS5yZXN0b3JlKGZhbHNlKTtcbiAgICBzdGF0ZS5zY3JvbGxUb3AgPSBlbC5zY3JvbGxUb3AgPSBleWUucmVhZCgpLnkgLSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSA1MDtcbiAgICBleWUuZGVzdHJveSgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVtZW1iZXJTZWxlY3Rpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzZXRUZXh0ID0gcmVxdWlyZSgnLi9zZXRUZXh0Jyk7XG52YXIgc3RyaW5ncyA9IHJlcXVpcmUoJy4vc3RyaW5ncycpO1xuXG5mdW5jdGlvbiBjb21tYW5kcyAoZWwsIGlkKSB7XG4gIHNldFRleHQoZWwsIHN0cmluZ3MuYnV0dG9uc1tpZF0gfHwgaWQpO1xufVxuXG5mdW5jdGlvbiBtb2RlcyAoZWwsIGlkKSB7XG4gIHNldFRleHQoZWwsIHN0cmluZ3MubW9kZXNbaWRdIHx8IGlkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1vZGVzOiBtb2RlcyxcbiAgY29tbWFuZHM6IGNvbW1hbmRzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBzZXRUZXh0IChlbCwgdmFsdWUpIHtcbiAgZWwuaW5uZXJUZXh0ID0gZWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUZXh0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGxhY2Vob2xkZXJzOiB7XG4gICAgYm9sZDogJ3N0cm9uZyB0ZXh0JyxcbiAgICBpdGFsaWM6ICdlbXBoYXNpemVkIHRleHQnLFxuICAgIHF1b3RlOiAncXVvdGVkIHRleHQnLFxuICAgIGNvZGU6ICdjb2RlIGdvZXMgaGVyZScsXG4gICAgbGlzdGl0ZW06ICdsaXN0IGl0ZW0nLFxuICAgIGhlYWRpbmc6ICdIZWFkaW5nIFRleHQnLFxuICAgIGxpbms6ICdsaW5rIHRleHQnLFxuICAgIGltYWdlOiAnaW1hZ2UgZGVzY3JpcHRpb24nLFxuICAgIGF0dGFjaG1lbnQ6ICdhdHRhY2htZW50IGRlc2NyaXB0aW9uJ1xuICB9LFxuICB0aXRsZXM6IHtcbiAgICBib2xkOiAnU3Ryb25nIDxzdHJvbmc+IEN0cmwrQicsXG4gICAgaXRhbGljOiAnRW1waGFzaXMgPGVtPiBDdHJsK0knLFxuICAgIHF1b3RlOiAnQmxvY2txdW90ZSA8YmxvY2txdW90ZT4gQ3RybCtKJyxcbiAgICBjb2RlOiAnQ29kZSBTYW1wbGUgPHByZT48Y29kZT4gQ3RybCtFJyxcbiAgICBvbDogJ051bWJlcmVkIExpc3QgPG9sPiBDdHJsK08nLFxuICAgIHVsOiAnQnVsbGV0ZWQgTGlzdCA8dWw+IEN0cmwrVScsXG4gICAgaGVhZGluZzogJ0hlYWRpbmcgPGgxPiwgPGgyPiwgLi4uIEN0cmwrRCcsXG4gICAgbGluazogJ0h5cGVybGluayA8YT4gQ3RybCtLJyxcbiAgICBpbWFnZTogJ0ltYWdlIDxpbWc+IEN0cmwrRycsXG4gICAgYXR0YWNobWVudDogJ0F0dGFjaG1lbnQgQ3RybCtTaGlmdCtLJyxcbiAgICBtYXJrZG93bjogJ01hcmtkb3duIE1vZGUgQ3RybCtNJyxcbiAgICBodG1sOiAnSFRNTCBNb2RlIEN0cmwrSCcsXG4gICAgd3lzaXd5ZzogJ1ByZXZpZXcgTW9kZSBDdHJsK1AnXG4gIH0sXG4gIGJ1dHRvbnM6IHtcbiAgICBib2xkOiAnQicsXG4gICAgaXRhbGljOiAnSScsXG4gICAgcXVvdGU6ICdcXHUyMDFjJyxcbiAgICBjb2RlOiAnPC8+JyxcbiAgICBvbDogJzEuJyxcbiAgICB1bDogJ1xcdTI5QkYnLFxuICAgIGhlYWRpbmc6ICdUdCcsXG4gICAgbGluazogJ0xpbmsnLFxuICAgIGltYWdlOiAnSW1hZ2UnLFxuICAgIGF0dGFjaG1lbnQ6ICdBdHRhY2htZW50JyxcbiAgICBocjogJ1xcdTIxYjUnXG4gIH0sXG4gIHByb21wdHM6IHtcbiAgICBsaW5rOiB7XG4gICAgICB0aXRsZTogJ0luc2VydCBMaW5rJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVHlwZSBvciBwYXN0ZSB0aGUgdXJsIHRvIHlvdXIgbGluaycsXG4gICAgICBwbGFjZWhvbGRlcjogJ2h0dHA6Ly9leGFtcGxlLmNvbS8gXCJ0aXRsZVwiJ1xuICAgIH0sXG4gICAgaW1hZ2U6IHtcbiAgICAgIHRpdGxlOiAnSW5zZXJ0IEltYWdlJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRW50ZXIgdGhlIHVybCB0byB5b3VyIGltYWdlJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnaHR0cDovL2V4YW1wbGUuY29tL3B1YmxpYy9pbWFnZS5wbmcgXCJ0aXRsZVwiJ1xuICAgIH0sXG4gICAgYXR0YWNobWVudDoge1xuICAgICAgdGl0bGU6ICdBdHRhY2ggRmlsZScsXG4gICAgICBkZXNjcmlwdGlvbjogJ0VudGVyIHRoZSB1cmwgdG8geW91ciBhdHRhY2htZW50JyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnaHR0cDovL2V4YW1wbGUuY29tL3B1YmxpYy9yZXBvcnQucGRmIFwidGl0bGVcIidcbiAgICB9LFxuICAgIHR5cGVzOiAnWW91IGNhbiBvbmx5IHVwbG9hZCAnLFxuICAgIGJyb3dzZTogJ0Jyb3dzZS4uLicsXG4gICAgZHJvcGhpbnQ6ICdZb3UgY2FuIGFsc28gZHJhZyBmaWxlcyBmcm9tIHlvdXIgY29tcHV0ZXIgYW5kIGRyb3AgdGhlbSBoZXJlIScsXG4gICAgZHJvcDogJ0Ryb3AgeW91ciBmaWxlIGhlcmUgdG8gYmVnaW4gdXBsb2FkLi4uJyxcbiAgICB1cGxvYWQ6ICcsIG9yIHVwbG9hZCBhIGZpbGUnLFxuICAgIHVwbG9hZGluZzogJ1VwbG9hZGluZyB5b3VyIGZpbGUuLi4nLFxuICAgIHVwbG9hZGZhaWxlZDogJ1RoZSB1cGxvYWQgZmFpbGVkISBUaGF0XFwncyBhbGwgd2Uga25vdy4nXG4gIH0sXG4gIG1vZGVzOiB7XG4gICAgd3lzaXd5ZzogJ3d5c2l3eWcnLFxuICAgIG1hcmtkb3duOiAnbVxcdTIxOTMnLFxuICB9LFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL2NsYXNzZXMnKTtcbnZhciBkcmFnQ2xhc3MgPSAnd2stZHJhZ2dpbmcnO1xudmFyIGRyYWdDbGFzc1NwZWNpZmljID0gJ3drLWNvbnRhaW5lci1kcmFnZ2luZyc7XG52YXIgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuZnVuY3Rpb24gdXBsb2FkcyAoY29udGFpbmVyLCBkcm9wYXJlYSwgZWRpdG9yLCBvcHRpb25zLCByZW1vdmUpIHtcbiAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgY3Jvc3N2ZW50W29wXShyb290LCAnZHJhZ2VudGVyJywgZHJhZ2dpbmcpO1xuICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdkcmFnZW5kJywgZHJhZ3N0b3ApO1xuICBjcm9zc3ZlbnRbb3BdKHJvb3QsICdtb3VzZW91dCcsIGRyYWdzdG9wKTtcbiAgY3Jvc3N2ZW50W29wXShjb250YWluZXIsICdkcmFnb3ZlcicsIGhhbmRsZURyYWdPdmVyLCBmYWxzZSk7XG4gIGNyb3NzdmVudFtvcF0oZHJvcGFyZWEsICdkcm9wJywgaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuXG4gIGZ1bmN0aW9uIGRyYWdnaW5nICgpIHtcbiAgICBjbGFzc2VzLmFkZChkcm9wYXJlYSwgZHJhZ0NsYXNzKTtcbiAgICBjbGFzc2VzLmFkZChkcm9wYXJlYSwgZHJhZ0NsYXNzU3BlY2lmaWMpO1xuICB9XG4gIGZ1bmN0aW9uIGRyYWdzdG9wICgpIHtcbiAgICBkcmFnc3RvcHBlcihkcm9wYXJlYSk7XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIgKGUpIHtcbiAgICBzdG9wKGUpO1xuICAgIGRyYWdnaW5nKCk7XG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVGaWxlU2VsZWN0IChlKSB7XG4gICAgZHJhZ3N0b3AoKTtcbiAgICBzdG9wKGUpO1xuICAgIGVkaXRvci5ydW5Db21tYW5kKGZ1bmN0aW9uIHJ1bm5lciAoY2h1bmtzLCBtb2RlKSB7XG4gICAgICB2YXIgZmlsZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlLmRhdGFUcmFuc2Zlci5maWxlcyk7XG4gICAgICB2YXIgdHlwZSA9IGluZmVyVHlwZShmaWxlcyk7XG4gICAgICBlZGl0b3IubGlua09ySW1hZ2VPckF0dGFjaG1lbnQodHlwZSwgZmlsZXMpLmNhbGwodGhpcywgbW9kZSwgY2h1bmtzKTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBpbmZlclR5cGUgKGZpbGVzKSB7XG4gICAgaWYgKG9wdGlvbnMuaW1hZ2VzICYmICFvcHRpb25zLmF0dGFjaG1lbnRzKSB7XG4gICAgICByZXR1cm4gJ2ltYWdlJztcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmltYWdlcyAmJiBvcHRpb25zLmF0dGFjaG1lbnRzKSB7XG4gICAgICByZXR1cm4gJ2F0dGFjaG1lbnQnO1xuICAgIH1cbiAgICBpZiAoZmlsZXMuZXZlcnkobWF0Y2hlcyhvcHRpb25zLmltYWdlcy52YWxpZGF0ZSB8fCBuZXZlcikpKSB7XG4gICAgICByZXR1cm4gJ2ltYWdlJztcbiAgICB9XG4gICAgcmV0dXJuICdhdHRhY2htZW50JztcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXRjaGVzIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gbWF0Y2hlciAoZmlsZSkgeyByZXR1cm4gZm4oZmlsZSk7IH07XG59XG5mdW5jdGlvbiBuZXZlciAoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHN0b3AgKGUpIHtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuZnVuY3Rpb24gZHJhZ3N0b3BwZXIgKGRyb3BhcmVhKSB7XG4gIGNsYXNzZXMucm0oZHJvcGFyZWEsIGRyYWdDbGFzcyk7XG4gIGNsYXNzZXMucm0oZHJvcGFyZWEsIGRyYWdDbGFzc1NwZWNpZmljKTtcbn1cblxudXBsb2Fkcy5zdG9wID0gZHJhZ3N0b3BwZXI7XG5tb2R1bGUuZXhwb3J0cyA9IHVwbG9hZHM7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBscyA9IHJlcXVpcmUoJ2xvY2FsLXN0b3JhZ2UnKTtcbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBrYW55ZSA9IHJlcXVpcmUoJ2thbnllJyk7XG52YXIgdXBsb2FkcyA9IHJlcXVpcmUoJy4vdXBsb2FkcycpO1xudmFyIHN0cmluZ3MgPSByZXF1aXJlKCcuL3N0cmluZ3MnKTtcbnZhciBzZXRUZXh0ID0gcmVxdWlyZSgnLi9zZXRUZXh0Jyk7XG52YXIgcmVtZW1iZXJTZWxlY3Rpb24gPSByZXF1aXJlKCcuL3JlbWVtYmVyU2VsZWN0aW9uJyk7XG52YXIgYmluZENvbW1hbmRzID0gcmVxdWlyZSgnLi9iaW5kQ29tbWFuZHMnKTtcbnZhciBJbnB1dEhpc3RvcnkgPSByZXF1aXJlKCcuL0lucHV0SGlzdG9yeScpO1xudmFyIGdldENvbW1hbmRIYW5kbGVyID0gcmVxdWlyZSgnLi9nZXRDb21tYW5kSGFuZGxlcicpO1xudmFyIGdldFN1cmZhY2UgPSByZXF1aXJlKCcuL2dldFN1cmZhY2UnKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi9jbGFzc2VzJyk7XG52YXIgcmVuZGVyZXJzID0gcmVxdWlyZSgnLi9yZW5kZXJlcnMnKTtcbnZhciBwcm9tcHQgPSByZXF1aXJlKCcuL3Byb21wdHMvcHJvbXB0Jyk7XG52YXIgY2xvc2VQcm9tcHRzID0gcmVxdWlyZSgnLi9wcm9tcHRzL2Nsb3NlJyk7XG52YXIgbW9kZU5hbWVzID0gWydtYXJrZG93bicsICdodG1sJywgJ3d5c2l3eWcnXTtcbnZhciBjYWNoZSA9IFtdO1xudmFyIG1hYyA9IC9cXGJNYWMgT1NcXGIvLnRlc3QoZ2xvYmFsLm5hdmlnYXRvci51c2VyQWdlbnQpO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIHJwYXJhZ3JhcGggPSAvXjxwPjxcXC9wPlxcbj8kL2k7XG5cbmZ1bmN0aW9uIGZpbmQgKHRleHRhcmVhKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoY2FjaGVbaV0gJiYgY2FjaGVbaV0udGEgPT09IHRleHRhcmVhKSB7XG4gICAgICByZXR1cm4gY2FjaGVbaV0uZWRpdG9yO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gd29vZm1hcmsgKHRleHRhcmVhLCBvcHRpb25zKSB7XG4gIHZhciBjYWNoZWQgPSBmaW5kKHRleHRhcmVhKTtcbiAgaWYgKGNhY2hlZCkge1xuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cblxuICB2YXIgcGFyZW50ID0gdGV4dGFyZWEucGFyZW50RWxlbWVudDtcbiAgaWYgKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b29mbWFyayBkZW1hbmRzIDx0ZXh0YXJlYT4gZWxlbWVudHMgdG8gaGF2ZSBubyBzaWJsaW5ncycpO1xuICB9XG5cbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuICBpZiAoby5tYXJrZG93biA9PT0gdm9pZCAwKSB7IG8ubWFya2Rvd24gPSB0cnVlOyB9XG4gIGlmIChvLmh0bWwgPT09IHZvaWQgMCkgeyBvLmh0bWwgPSB0cnVlOyB9XG4gIGlmIChvLnd5c2l3eWcgPT09IHZvaWQgMCkgeyBvLnd5c2l3eWcgPSB0cnVlOyB9XG5cbiAgaWYgKCFvLm1hcmtkb3duICYmICFvLmh0bWwgJiYgIW8ud3lzaXd5Zykge1xuICAgIHRocm93IG5ldyBFcnJvcignd29vZm1hcmsgZXhwZWN0cyBhdCBsZWFzdCBvbmUgaW5wdXQgbW9kZSB0byBiZSBhdmFpbGFibGUnKTtcbiAgfVxuXG4gIGlmIChvLmhyID09PSB2b2lkIDApIHsgby5ociA9IGZhbHNlOyB9XG4gIGlmIChvLnN0b3JhZ2UgPT09IHZvaWQgMCkgeyBvLnN0b3JhZ2UgPSB0cnVlOyB9XG4gIGlmIChvLnN0b3JhZ2UgPT09IHRydWUpIHsgby5zdG9yYWdlID0gJ3dvb2ZtYXJrX2lucHV0X21vZGUnOyB9XG4gIGlmIChvLmZlbmNpbmcgPT09IHZvaWQgMCkgeyBvLmZlbmNpbmcgPSB0cnVlOyB9XG4gIGlmIChvLnJlbmRlciA9PT0gdm9pZCAwKSB7IG8ucmVuZGVyID0ge307IH1cbiAgaWYgKG8ucmVuZGVyLm1vZGVzID09PSB2b2lkIDApIHsgby5yZW5kZXIubW9kZXMgPSB7fTsgfVxuICBpZiAoby5yZW5kZXIuY29tbWFuZHMgPT09IHZvaWQgMCkgeyBvLnJlbmRlci5jb21tYW5kcyA9IHt9OyB9XG4gIGlmIChvLnByb21wdHMgPT09IHZvaWQgMCkgeyBvLnByb21wdHMgPSB7fTsgfVxuICBpZiAoby5wcm9tcHRzLmxpbmsgPT09IHZvaWQgMCkgeyBvLnByb21wdHMubGluayA9IHByb21wdDsgfVxuICBpZiAoby5wcm9tcHRzLmltYWdlID09PSB2b2lkIDApIHsgby5wcm9tcHRzLmltYWdlID0gcHJvbXB0OyB9XG4gIGlmIChvLnByb21wdHMuYXR0YWNobWVudCA9PT0gdm9pZCAwKSB7IG8ucHJvbXB0cy5hdHRhY2htZW50ID0gcHJvbXB0OyB9XG4gIGlmIChvLnByb21wdHMuY2xvc2UgPT09IHZvaWQgMCkgeyBvLnByb21wdHMuY2xvc2UgPSBjbG9zZVByb21wdHM7IH1cbiAgaWYgKG8uY2xhc3NlcyA9PT0gdm9pZCAwKSB7IG8uY2xhc3NlcyA9IHt9OyB9XG4gIGlmIChvLmNsYXNzZXMud3lzaXd5ZyA9PT0gdm9pZCAwKSB7IG8uY2xhc3Nlcy53eXNpd3lnID0gW107IH1cbiAgaWYgKG8uY2xhc3Nlcy5wcm9tcHRzID09PSB2b2lkIDApIHsgby5jbGFzc2VzLnByb21wdHMgPSB7fTsgfVxuICBpZiAoby5jbGFzc2VzLmlucHV0ID09PSB2b2lkIDApIHsgby5jbGFzc2VzLmlucHV0ID0ge307IH1cblxuICB2YXIgcHJlZmVyZW5jZSA9IG8uc3RvcmFnZSAmJiBscy5nZXQoby5zdG9yYWdlKTtcbiAgaWYgKHByZWZlcmVuY2UpIHtcbiAgICBvLmRlZmF1bHRNb2RlID0gcHJlZmVyZW5jZTtcbiAgfVxuXG4gIHZhciBkcm9wYXJlYSA9IHRhZyh7IGM6ICd3ay1jb250YWluZXItZHJvcCcgfSk7XG4gIHZhciBzd2l0Y2hib2FyZCA9IHRhZyh7IGM6ICd3ay1zd2l0Y2hib2FyZCcgfSk7XG4gIHZhciBjb21tYW5kcyA9IHRhZyh7IGM6ICd3ay1jb21tYW5kcycgfSk7XG4gIHZhciBlZGl0YWJsZSA9IHRhZyh7IGM6IFsnd2std3lzaXd5ZycsICd3ay1oaWRlJ10uY29uY2F0KG8uY2xhc3Nlcy53eXNpd3lnKS5qb2luKCcgJykgfSk7XG4gIHZhciBzdXJmYWNlID0gZ2V0U3VyZmFjZSh0ZXh0YXJlYSwgZWRpdGFibGUsIGRyb3BhcmVhKTtcbiAgdmFyIGhpc3RvcnkgPSBuZXcgSW5wdXRIaXN0b3J5KHN1cmZhY2UsICdtYXJrZG93bicpO1xuICB2YXIgZWRpdG9yID0ge1xuICAgIGFkZENvbW1hbmQ6IGFkZENvbW1hbmQsXG4gICAgYWRkQ29tbWFuZEJ1dHRvbjogYWRkQ29tbWFuZEJ1dHRvbixcbiAgICBydW5Db21tYW5kOiBydW5Db21tYW5kLFxuICAgIHBhcnNlTWFya2Rvd246IG8ucGFyc2VNYXJrZG93bixcbiAgICBwYXJzZUhUTUw6IG8ucGFyc2VIVE1MLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgdmFsdWU6IGdldE9yU2V0VmFsdWUsXG4gICAgdGV4dGFyZWE6IHRleHRhcmVhLFxuICAgIGVkaXRhYmxlOiBvLnd5c2l3eWcgPyBlZGl0YWJsZSA6IG51bGwsXG4gICAgc2V0TW9kZTogcGVyc2lzdE1vZGUsXG4gICAgaGlzdG9yeToge1xuICAgICAgdW5kbzogaGlzdG9yeS51bmRvLFxuICAgICAgcmVkbzogaGlzdG9yeS5yZWRvLFxuICAgICAgY2FuVW5kbzogaGlzdG9yeS5jYW5VbmRvLFxuICAgICAgY2FuUmVkbzogaGlzdG9yeS5jYW5SZWRvXG4gICAgfSxcbiAgICBtb2RlOiAnbWFya2Rvd24nXG4gIH07XG4gIHZhciBlbnRyeSA9IHsgdGE6IHRleHRhcmVhLCBlZGl0b3I6IGVkaXRvciB9O1xuICB2YXIgaSA9IGNhY2hlLnB1c2goZW50cnkpO1xuICB2YXIga2FueWVDb250ZXh0ID0gJ3dvb2ZtYXJrXycgKyBpO1xuICB2YXIga2FueWVPcHRpb25zID0ge1xuICAgIGZpbHRlcjogcGFyZW50LFxuICAgIGNvbnRleHQ6IGthbnllQ29udGV4dFxuICB9O1xuICB2YXIgbW9kZXMgPSB7XG4gICAgbWFya2Rvd246IHtcbiAgICAgIGJ1dHRvbjogdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1tb2RlIHdrLW1vZGUtYWN0aXZlJyB9KSxcbiAgICAgIHNldDogbWFya2Rvd25Nb2RlXG4gICAgfSxcbiAgICBodG1sOiB7XG4gICAgICBidXR0b246IHRhZyh7IHQ6ICdidXR0b24nLCBjOiAnd2stbW9kZSB3ay1tb2RlLWluYWN0aXZlJyB9KSxcbiAgICAgIHNldDogaHRtbE1vZGVcbiAgICB9LFxuICAgIHd5c2l3eWc6IHtcbiAgICAgIGJ1dHRvbjogdGFnKHsgdDogJ2J1dHRvbicsIGM6ICd3ay1tb2RlIHdrLW1vZGUtaW5hY3RpdmUnIH0pLFxuICAgICAgc2V0OiB3eXNpd3lnTW9kZVxuICAgIH1cbiAgfTtcbiAgdmFyIHBsYWNlO1xuXG4gIHRhZyh7IHQ6ICdzcGFuJywgYzogJ3drLWRyb3AtdGV4dCcsIHg6IHN0cmluZ3MucHJvbXB0cy5kcm9wLCBwOiBkcm9wYXJlYSB9KTtcbiAgdGFnKHsgdDogJ3AnLCBjOiBbJ3drLWRyb3AtaWNvbiddLmNvbmNhdChvLmNsYXNzZXMuZHJvcGljb24pLmpvaW4oJyAnKSwgcDogZHJvcGFyZWEgfSk7XG5cbiAgZWRpdGFibGUuY29udGVudEVkaXRhYmxlID0gdHJ1ZTtcbiAgbW9kZXMubWFya2Rvd24uYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgbW9kZU5hbWVzLmZvckVhY2goYWRkTW9kZSk7XG5cbiAgaWYgKG8ud3lzaXd5Zykge1xuICAgIHBsYWNlID0gdGFnKHsgYzogJ3drLXd5c2l3eWctcGxhY2Vob2xkZXIgd2staGlkZScsIHg6IHRleHRhcmVhLnBsYWNlaG9sZGVyIH0pO1xuICAgIGNyb3NzdmVudC5hZGQocGxhY2UsICdjbGljaycsIGZvY3VzRWRpdGFibGUpO1xuICB9XG5cbiAgaWYgKG8uZGVmYXVsdE1vZGUgJiYgb1tvLmRlZmF1bHRNb2RlXSkge1xuICAgIG1vZGVzW28uZGVmYXVsdE1vZGVdLnNldCgpO1xuICB9IGVsc2UgaWYgKG8ubWFya2Rvd24pIHtcbiAgICBtb2Rlcy5tYXJrZG93bi5zZXQoKTtcbiAgfSBlbHNlIGlmIChvLmh0bWwpIHtcbiAgICBtb2Rlcy5odG1sLnNldCgpO1xuICB9IGVsc2Uge1xuICAgIG1vZGVzLnd5c2l3eWcuc2V0KCk7XG4gIH1cblxuICBiaW5kQ29tbWFuZHMoc3VyZmFjZSwgbywgZWRpdG9yKTtcbiAgYmluZEV2ZW50cygpO1xuXG4gIHJldHVybiBlZGl0b3I7XG5cbiAgZnVuY3Rpb24gYWRkTW9kZSAoaWQpIHtcbiAgICB2YXIgYnV0dG9uID0gbW9kZXNbaWRdLmJ1dHRvbjtcbiAgICB2YXIgY3VzdG9tID0gby5yZW5kZXIubW9kZXM7XG4gICAgaWYgKG9baWRdKSB7XG4gICAgICBzd2l0Y2hib2FyZC5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgKHR5cGVvZiBjdXN0b20gPT09ICdmdW5jdGlvbicgPyBjdXN0b20gOiByZW5kZXJlcnMubW9kZXMpKGJ1dHRvbiwgaWQpO1xuICAgICAgY3Jvc3N2ZW50LmFkZChidXR0b24sICdjbGljaycsIG1vZGVzW2lkXS5zZXQpO1xuICAgICAgYnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgIGJ1dHRvbi50YWJJbmRleCA9IC0xO1xuXG4gICAgICB2YXIgdGl0bGUgPSBzdHJpbmdzLnRpdGxlc1tpZF07XG4gICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBtYWMgPyBtYWNpZnkodGl0bGUpIDogdGl0bGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmRFdmVudHMgKHJlbW92ZSkge1xuICAgIHZhciBhciA9IHJlbW92ZSA/ICdybScgOiAnYWRkJztcbiAgICB2YXIgbW92ID0gcmVtb3ZlID8gJ3JlbW92ZUNoaWxkJyA6ICdhcHBlbmRDaGlsZCc7XG4gICAgaWYgKHJlbW92ZSkge1xuICAgICAga2FueWUuY2xlYXIoa2FueWVDb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG8ubWFya2Rvd24pIHsga2FueWUub24oJ2NtZCttJywga2FueWVPcHRpb25zLCBtYXJrZG93bk1vZGUpOyB9XG4gICAgICBpZiAoby5odG1sKSB7IGthbnllLm9uKCdjbWQraCcsIGthbnllT3B0aW9ucywgaHRtbE1vZGUpOyB9XG4gICAgICBpZiAoby53eXNpd3lnKSB7IGthbnllLm9uKCdjbWQrcCcsIGthbnllT3B0aW9ucywgd3lzaXd5Z01vZGUpOyB9XG4gICAgfVxuICAgIGNsYXNzZXNbYXJdKHBhcmVudCwgJ3drLWNvbnRhaW5lcicpO1xuICAgIHBhcmVudFttb3ZdKGVkaXRhYmxlKTtcbiAgICBpZiAocGxhY2UpIHsgcGFyZW50W21vdl0ocGxhY2UpOyB9XG4gICAgcGFyZW50W21vdl0oY29tbWFuZHMpO1xuICAgIHBhcmVudFttb3ZdKHN3aXRjaGJvYXJkKTtcbiAgICBpZiAoby5pbWFnZXMgfHwgby5hdHRhY2htZW50cykge1xuICAgICAgcGFyZW50W21vdl0oZHJvcGFyZWEpO1xuICAgICAgdXBsb2FkcyhwYXJlbnQsIGRyb3BhcmVhLCBlZGl0b3IsIG8sIHJlbW92ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgaWYgKGVkaXRvci5tb2RlICE9PSAnbWFya2Rvd24nKSB7XG4gICAgICB0ZXh0YXJlYS52YWx1ZSA9IGdldE1hcmtkb3duKCk7XG4gICAgfVxuICAgIGNsYXNzZXMucm0odGV4dGFyZWEsICd3ay1oaWRlJyk7XG4gICAgYmluZEV2ZW50cyh0cnVlKTtcbiAgICBkZWxldGUgY2FjaGVbaSAtIDFdO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFya2Rvd25Nb2RlIChlKSB7IHBlcnNpc3RNb2RlKCdtYXJrZG93bicsIGUpOyB9XG4gIGZ1bmN0aW9uIGh0bWxNb2RlIChlKSB7IHBlcnNpc3RNb2RlKCdodG1sJywgZSk7IH1cbiAgZnVuY3Rpb24gd3lzaXd5Z01vZGUgKGUpIHsgcGVyc2lzdE1vZGUoJ3d5c2l3eWcnLCBlKTsgfVxuXG4gIGZ1bmN0aW9uIHBlcnNpc3RNb2RlIChuZXh0TW9kZSwgZSkge1xuICAgIHZhciByZW1lbWJyYW5jZTtcbiAgICB2YXIgY3VycmVudE1vZGUgPSBlZGl0b3IubW9kZTtcbiAgICB2YXIgb2xkID0gbW9kZXNbY3VycmVudE1vZGVdLmJ1dHRvbjtcbiAgICB2YXIgYnV0dG9uID0gbW9kZXNbbmV4dE1vZGVdLmJ1dHRvbjtcbiAgICB2YXIgZm9jdXNpbmcgPSAhIWUgfHwgZG9jLmFjdGl2ZUVsZW1lbnQgPT09IHRleHRhcmVhIHx8IGRvYy5hY3RpdmVFbGVtZW50ID09PSBlZGl0YWJsZTtcblxuICAgIHN0b3AoZSk7XG5cbiAgICBpZiAoY3VycmVudE1vZGUgPT09IG5leHRNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVtZW1icmFuY2UgPSBmb2N1c2luZyAmJiByZW1lbWJlclNlbGVjdGlvbihoaXN0b3J5LCBvKTtcbiAgICB0ZXh0YXJlYS5ibHVyKCk7IC8vIGF2ZXJ0IGNocm9tZSByZXBhaW50IGJ1Z3NcblxuICAgIGlmIChuZXh0TW9kZSA9PT0gJ21hcmtkb3duJykge1xuICAgICAgaWYgKGN1cnJlbnRNb2RlID09PSAnaHRtbCcpIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBwYXJzZSgncGFyc2VIVE1MJywgdGV4dGFyZWEudmFsdWUpLnRyaW0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gcGFyc2UoJ3BhcnNlSFRNTCcsIGVkaXRhYmxlKS50cmltKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuZXh0TW9kZSA9PT0gJ2h0bWwnKSB7XG4gICAgICBpZiAoY3VycmVudE1vZGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBwYXJzZSgncGFyc2VNYXJrZG93bicsIHRleHRhcmVhLnZhbHVlKS50cmltKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IGVkaXRhYmxlLmlubmVySFRNTC50cmltKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuZXh0TW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICBpZiAoY3VycmVudE1vZGUgPT09ICdtYXJrZG93bicpIHtcbiAgICAgICAgZWRpdGFibGUuaW5uZXJIVE1MID0gcGFyc2UoJ3BhcnNlTWFya2Rvd24nLCB0ZXh0YXJlYS52YWx1ZSkucmVwbGFjZShycGFyYWdyYXBoLCAnJykudHJpbSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWRpdGFibGUuaW5uZXJIVE1MID0gdGV4dGFyZWEudmFsdWUucmVwbGFjZShycGFyYWdyYXBoLCAnJykudHJpbSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuZXh0TW9kZSA9PT0gJ3d5c2l3eWcnKSB7XG4gICAgICBjbGFzc2VzLmFkZCh0ZXh0YXJlYSwgJ3drLWhpZGUnKTtcbiAgICAgIGNsYXNzZXMucm0oZWRpdGFibGUsICd3ay1oaWRlJyk7XG4gICAgICBpZiAocGxhY2UpIHsgY2xhc3Nlcy5ybShwbGFjZSwgJ3drLWhpZGUnKTsgfVxuICAgICAgaWYgKGZvY3VzaW5nKSB7IHNldFRpbWVvdXQoZm9jdXNFZGl0YWJsZSwgMCk7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhc3Nlcy5ybSh0ZXh0YXJlYSwgJ3drLWhpZGUnKTtcbiAgICAgIGNsYXNzZXMuYWRkKGVkaXRhYmxlLCAnd2staGlkZScpO1xuICAgICAgaWYgKHBsYWNlKSB7IGNsYXNzZXMuYWRkKHBsYWNlLCAnd2staGlkZScpOyB9XG4gICAgICBpZiAoZm9jdXNpbmcpIHsgdGV4dGFyZWEuZm9jdXMoKTsgfVxuICAgIH1cbiAgICBjbGFzc2VzLmFkZChidXR0b24sICd3ay1tb2RlLWFjdGl2ZScpO1xuICAgIGNsYXNzZXMucm0ob2xkLCAnd2stbW9kZS1hY3RpdmUnKTtcbiAgICBjbGFzc2VzLmFkZChvbGQsICd3ay1tb2RlLWluYWN0aXZlJyk7XG4gICAgY2xhc3Nlcy5ybShidXR0b24sICd3ay1tb2RlLWluYWN0aXZlJyk7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICBvbGQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIGVkaXRvci5tb2RlID0gbmV4dE1vZGU7XG5cbiAgICBpZiAoby5zdG9yYWdlKSB7IGxzLnNldChvLnN0b3JhZ2UsIG5leHRNb2RlKTsgfVxuXG4gICAgaGlzdG9yeS5zZXRJbnB1dE1vZGUobmV4dE1vZGUpO1xuICAgIGlmIChyZW1lbWJyYW5jZSkgeyByZW1lbWJyYW5jZS51bm1hcmsoKTsgfVxuICAgIGZpcmVMYXRlcignd29vZm1hcmstbW9kZS1jaGFuZ2UnKTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlIChtZXRob2QsIGlucHV0KSB7XG4gICAgICByZXR1cm4gb1ttZXRob2RdKGlucHV0LCB7XG4gICAgICAgIG1hcmtlcnM6IHJlbWVtYnJhbmNlICYmIHJlbWVtYnJhbmNlLm1hcmtlcnMgfHwgW11cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpcmVMYXRlciAodHlwZSkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gZmlyZSAoKSB7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKHRleHRhcmVhLCB0eXBlKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvY3VzRWRpdGFibGUgKCkge1xuICAgIGVkaXRhYmxlLmZvY3VzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNYXJrZG93biAoKSB7XG4gICAgaWYgKGVkaXRvci5tb2RlID09PSAnd3lzaXd5ZycpIHtcbiAgICAgIHJldHVybiBvLnBhcnNlSFRNTChlZGl0YWJsZSk7XG4gICAgfVxuICAgIGlmIChlZGl0b3IubW9kZSA9PT0gJ2h0bWwnKSB7XG4gICAgICByZXR1cm4gby5wYXJzZUhUTUwodGV4dGFyZWEudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dGFyZWEudmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRPclNldFZhbHVlIChpbnB1dCkge1xuICAgIHZhciBtYXJrZG93biA9IFN0cmluZyhpbnB1dCk7XG4gICAgdmFyIHNldHMgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxO1xuICAgIGlmIChzZXRzKSB7XG4gICAgICBpZiAoZWRpdG9yLm1vZGUgPT09ICd3eXNpd3lnJykge1xuICAgICAgICBlZGl0YWJsZS5pbm5lckhUTUwgPSBhc0h0bWwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gZWRpdG9yLm1vZGUgPT09ICdodG1sJyA/IGFzSHRtbCgpIDogbWFya2Rvd247XG4gICAgICB9XG4gICAgICBoaXN0b3J5LnJlc2V0KCk7XG4gICAgfVxuICAgIHJldHVybiBnZXRNYXJrZG93bigpO1xuICAgIGZ1bmN0aW9uIGFzSHRtbCAoKSB7XG4gICAgICByZXR1cm4gby5wYXJzZU1hcmtkb3duKG1hcmtkb3duKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDb21tYW5kQnV0dG9uIChpZCwgY29tYm8sIGZuKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGZuID0gY29tYm87XG4gICAgICBjb21ibyA9IG51bGw7XG4gICAgfVxuICAgIHZhciBidXR0b24gPSB0YWcoeyB0OiAnYnV0dG9uJywgYzogJ3drLWNvbW1hbmQnLCBwOiBjb21tYW5kcyB9KTtcbiAgICB2YXIgY3VzdG9tID0gby5yZW5kZXIuY29tbWFuZHM7XG4gICAgdmFyIHJlbmRlciA9IHR5cGVvZiBjdXN0b20gPT09ICdmdW5jdGlvbicgPyBjdXN0b20gOiByZW5kZXJlcnMuY29tbWFuZHM7XG4gICAgdmFyIHRpdGxlID0gc3RyaW5ncy50aXRsZXNbaWRdO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBtYWMgPyBtYWNpZnkodGl0bGUpIDogdGl0bGUpO1xuICAgIH1cbiAgICBidXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgIGJ1dHRvbi50YWJJbmRleCA9IC0xO1xuICAgIHJlbmRlcihidXR0b24sIGlkKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGJ1dHRvbiwgJ2NsaWNrJywgZ2V0Q29tbWFuZEhhbmRsZXIoc3VyZmFjZSwgaGlzdG9yeSwgZm4pKTtcbiAgICBpZiAoY29tYm8pIHtcbiAgICAgIGFkZENvbW1hbmQoY29tYm8sIGZuKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENvbW1hbmQgKGNvbWJvLCBmbikge1xuICAgIGthbnllLm9uKGNvbWJvLCBrYW55ZU9wdGlvbnMsIGdldENvbW1hbmRIYW5kbGVyKHN1cmZhY2UsIGhpc3RvcnksIGZuKSk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5Db21tYW5kIChmbikge1xuICAgIGdldENvbW1hbmRIYW5kbGVyKHN1cmZhY2UsIGhpc3RvcnksIHJlYXJyYW5nZSkobnVsbCk7XG4gICAgZnVuY3Rpb24gcmVhcnJhbmdlIChlLCBtb2RlLCBjaHVua3MpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGNodW5rcywgbW9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRhZyAob3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBlbCA9IGRvYy5jcmVhdGVFbGVtZW50KG8udCB8fCAnZGl2Jyk7XG4gIGVsLmNsYXNzTmFtZSA9IG8uYyB8fCAnJztcbiAgc2V0VGV4dChlbCwgby54IHx8ICcnKTtcbiAgaWYgKG8ucCkgeyBvLnAuYXBwZW5kQ2hpbGQoZWwpOyB9XG4gIHJldHVybiBlbDtcbn1cblxuZnVuY3Rpb24gc3RvcCAoZSkge1xuICBpZiAoZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IH1cbn1cblxuZnVuY3Rpb24gbWFjaWZ5ICh0ZXh0KSB7XG4gIHJldHVybiB0ZXh0XG4gICAgLnJlcGxhY2UoL1xcYmN0cmxcXGIvaSwgJ1xcdTIzMTgnKVxuICAgIC5yZXBsYWNlKC9cXGJhbHRcXGIvaSwgJ1xcdTIzMjUnKVxuICAgIC5yZXBsYWNlKC9cXGJzaGlmdFxcYi9pLCAnXFx1MjFlNycpO1xufVxuXG53b29mbWFyay5maW5kID0gZmluZDtcbndvb2ZtYXJrLnN0cmluZ3MgPSBzdHJpbmdzO1xubW9kdWxlLmV4cG9ydHMgPSB3b29mbWFyaztcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5M2IyOW1iV0Z5YXk1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJzY3lBOUlISmxjWFZwY21Vb0oyeHZZMkZzTFhOMGIzSmhaMlVuS1R0Y2JuWmhjaUJqY205emMzWmxiblFnUFNCeVpYRjFhWEpsS0NkamNtOXpjM1psYm5RbktUdGNiblpoY2lCcllXNTVaU0E5SUhKbGNYVnBjbVVvSjJ0aGJubGxKeWs3WEc1MllYSWdkWEJzYjJGa2N5QTlJSEpsY1hWcGNtVW9KeTR2ZFhCc2IyRmtjeWNwTzF4dWRtRnlJSE4wY21sdVozTWdQU0J5WlhGMWFYSmxLQ2N1TDNOMGNtbHVaM01uS1R0Y2JuWmhjaUJ6WlhSVVpYaDBJRDBnY21WeGRXbHlaU2duTGk5elpYUlVaWGgwSnlrN1hHNTJZWElnY21WdFpXMWlaWEpUWld4bFkzUnBiMjRnUFNCeVpYRjFhWEpsS0NjdUwzSmxiV1Z0WW1WeVUyVnNaV04wYVc5dUp5azdYRzUyWVhJZ1ltbHVaRU52YlcxaGJtUnpJRDBnY21WeGRXbHlaU2duTGk5aWFXNWtRMjl0YldGdVpITW5LVHRjYm5aaGNpQkpibkIxZEVocGMzUnZjbmtnUFNCeVpYRjFhWEpsS0NjdUwwbHVjSFYwU0dsemRHOXllU2NwTzF4dWRtRnlJR2RsZEVOdmJXMWhibVJJWVc1a2JHVnlJRDBnY21WeGRXbHlaU2duTGk5blpYUkRiMjF0WVc1a1NHRnVaR3hsY2ljcE8xeHVkbUZ5SUdkbGRGTjFjbVpoWTJVZ1BTQnlaWEYxYVhKbEtDY3VMMmRsZEZOMWNtWmhZMlVuS1R0Y2JuWmhjaUJqYkdGemMyVnpJRDBnY21WeGRXbHlaU2duTGk5amJHRnpjMlZ6SnlrN1hHNTJZWElnY21WdVpHVnlaWEp6SUQwZ2NtVnhkV2x5WlNnbkxpOXlaVzVrWlhKbGNuTW5LVHRjYm5aaGNpQndjbTl0Y0hRZ1BTQnlaWEYxYVhKbEtDY3VMM0J5YjIxd2RITXZjSEp2YlhCMEp5azdYRzUyWVhJZ1kyeHZjMlZRY205dGNIUnpJRDBnY21WeGRXbHlaU2duTGk5d2NtOXRjSFJ6TDJOc2IzTmxKeWs3WEc1MllYSWdiVzlrWlU1aGJXVnpJRDBnV3lkdFlYSnJaRzkzYmljc0lDZG9kRzFzSnl3Z0ozZDVjMmwzZVdjblhUdGNiblpoY2lCallXTm9aU0E5SUZ0ZE8xeHVkbUZ5SUcxaFl5QTlJQzljWEdKTllXTWdUMU5jWEdJdkxuUmxjM1FvWjJ4dlltRnNMbTVoZG1sbllYUnZjaTUxYzJWeVFXZGxiblFwTzF4dWRtRnlJR1J2WXlBOUlHUnZZM1Z0Wlc1ME8xeHVkbUZ5SUhKd1lYSmhaM0poY0dnZ1BTQXZYanh3UGp4Y1hDOXdQbHhjYmo4a0wyazdYRzVjYm1aMWJtTjBhVzl1SUdacGJtUWdLSFJsZUhSaGNtVmhLU0I3WEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2dZMkZqYUdVdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQnBaaUFvWTJGamFHVmJhVjBnSmlZZ1kyRmphR1ZiYVYwdWRHRWdQVDA5SUhSbGVIUmhjbVZoS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnWTJGamFHVmJhVjB1WldScGRHOXlPMXh1SUNBZ0lIMWNiaUFnZlZ4dUlDQnlaWFIxY200Z2JuVnNiRHRjYm4xY2JseHVablZ1WTNScGIyNGdkMjl2Wm0xaGNtc2dLSFJsZUhSaGNtVmhMQ0J2Y0hScGIyNXpLU0I3WEc0Z0lIWmhjaUJqWVdOb1pXUWdQU0JtYVc1a0tIUmxlSFJoY21WaEtUdGNiaUFnYVdZZ0tHTmhZMmhsWkNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJqWVdOb1pXUTdYRzRnSUgxY2JseHVJQ0IyWVhJZ2NHRnlaVzUwSUQwZ2RHVjRkR0Z5WldFdWNHRnlaVzUwUld4bGJXVnVkRHRjYmlBZ2FXWWdLSEJoY21WdWRDNWphR2xzWkhKbGJpNXNaVzVuZEdnZ1BpQXhLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZDNiMjltYldGeWF5QmtaVzFoYm1SeklEeDBaWGgwWVhKbFlUNGdaV3hsYldWdWRITWdkRzhnYUdGMlpTQnVieUJ6YVdKc2FXNW5jeWNwTzF4dUlDQjlYRzVjYmlBZ2RtRnlJRzhnUFNCdmNIUnBiMjV6SUh4OElIdDlPMXh1SUNCcFppQW9ieTV0WVhKclpHOTNiaUE5UFQwZ2RtOXBaQ0F3S1NCN0lHOHViV0Z5YTJSdmQyNGdQU0IwY25WbE95QjlYRzRnSUdsbUlDaHZMbWgwYld3Z1BUMDlJSFp2YVdRZ01Da2dleUJ2TG1oMGJXd2dQU0IwY25WbE95QjlYRzRnSUdsbUlDaHZMbmQ1YzJsM2VXY2dQVDA5SUhadmFXUWdNQ2tnZXlCdkxuZDVjMmwzZVdjZ1BTQjBjblZsT3lCOVhHNWNiaUFnYVdZZ0tDRnZMbTFoY210a2IzZHVJQ1ltSUNGdkxtaDBiV3dnSmlZZ0lXOHVkM2x6YVhkNVp5a2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnbmQyOXZabTFoY21zZ1pYaHdaV04wY3lCaGRDQnNaV0Z6ZENCdmJtVWdhVzV3ZFhRZ2JXOWtaU0IwYnlCaVpTQmhkbUZwYkdGaWJHVW5LVHRjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZMbWh5SUQwOVBTQjJiMmxrSURBcElIc2dieTVvY2lBOUlHWmhiSE5sT3lCOVhHNGdJR2xtSUNodkxuTjBiM0poWjJVZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG5OMGIzSmhaMlVnUFNCMGNuVmxPeUI5WEc0Z0lHbG1JQ2h2TG5OMGIzSmhaMlVnUFQwOUlIUnlkV1VwSUhzZ2J5NXpkRzl5WVdkbElEMGdKM2R2YjJadFlYSnJYMmx1Y0hWMFgyMXZaR1VuT3lCOVhHNGdJR2xtSUNodkxtWmxibU5wYm1jZ1BUMDlJSFp2YVdRZ01Da2dleUJ2TG1abGJtTnBibWNnUFNCMGNuVmxPeUI5WEc0Z0lHbG1JQ2h2TG5KbGJtUmxjaUE5UFQwZ2RtOXBaQ0F3S1NCN0lHOHVjbVZ1WkdWeUlEMGdlMzA3SUgxY2JpQWdhV1lnS0c4dWNtVnVaR1Z5TG0xdlpHVnpJRDA5UFNCMmIybGtJREFwSUhzZ2J5NXlaVzVrWlhJdWJXOWtaWE1nUFNCN2ZUc2dmVnh1SUNCcFppQW9ieTV5Wlc1a1pYSXVZMjl0YldGdVpITWdQVDA5SUhadmFXUWdNQ2tnZXlCdkxuSmxibVJsY2k1amIyMXRZVzVrY3lBOUlIdDlPeUI5WEc0Z0lHbG1JQ2h2TG5CeWIyMXdkSE1nUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbkJ5YjIxd2RITWdQU0I3ZlRzZ2ZWeHVJQ0JwWmlBb2J5NXdjbTl0Y0hSekxteHBibXNnUFQwOUlIWnZhV1FnTUNrZ2V5QnZMbkJ5YjIxd2RITXViR2x1YXlBOUlIQnliMjF3ZERzZ2ZWeHVJQ0JwWmlBb2J5NXdjbTl0Y0hSekxtbHRZV2RsSUQwOVBTQjJiMmxrSURBcElIc2dieTV3Y205dGNIUnpMbWx0WVdkbElEMGdjSEp2YlhCME95QjlYRzRnSUdsbUlDaHZMbkJ5YjIxd2RITXVZWFIwWVdOb2JXVnVkQ0E5UFQwZ2RtOXBaQ0F3S1NCN0lHOHVjSEp2YlhCMGN5NWhkSFJoWTJodFpXNTBJRDBnY0hKdmJYQjBPeUI5WEc0Z0lHbG1JQ2h2TG5CeWIyMXdkSE11WTJ4dmMyVWdQVDA5SUhadmFXUWdNQ2tnZXlCdkxuQnliMjF3ZEhNdVkyeHZjMlVnUFNCamJHOXpaVkJ5YjIxd2RITTdJSDFjYmlBZ2FXWWdLRzh1WTJ4aGMzTmxjeUE5UFQwZ2RtOXBaQ0F3S1NCN0lHOHVZMnhoYzNObGN5QTlJSHQ5T3lCOVhHNGdJR2xtSUNodkxtTnNZWE56WlhNdWQzbHphWGQ1WnlBOVBUMGdkbTlwWkNBd0tTQjdJRzh1WTJ4aGMzTmxjeTUzZVhOcGQzbG5JRDBnVzEwN0lIMWNiaUFnYVdZZ0tHOHVZMnhoYzNObGN5NXdjbTl0Y0hSeklEMDlQU0IyYjJsa0lEQXBJSHNnYnk1amJHRnpjMlZ6TG5CeWIyMXdkSE1nUFNCN2ZUc2dmVnh1SUNCcFppQW9ieTVqYkdGemMyVnpMbWx1Y0hWMElEMDlQU0IyYjJsa0lEQXBJSHNnYnk1amJHRnpjMlZ6TG1sdWNIVjBJRDBnZTMwN0lIMWNibHh1SUNCMllYSWdjSEpsWm1WeVpXNWpaU0E5SUc4dWMzUnZjbUZuWlNBbUppQnNjeTVuWlhRb2J5NXpkRzl5WVdkbEtUdGNiaUFnYVdZZ0tIQnlaV1psY21WdVkyVXBJSHRjYmlBZ0lDQnZMbVJsWm1GMWJIUk5iMlJsSUQwZ2NISmxabVZ5Wlc1alpUdGNiaUFnZlZ4dVhHNGdJSFpoY2lCa2NtOXdZWEpsWVNBOUlIUmhaeWg3SUdNNklDZDNheTFqYjI1MFlXbHVaWEl0WkhKdmNDY2dmU2s3WEc0Z0lIWmhjaUJ6ZDJsMFkyaGliMkZ5WkNBOUlIUmhaeWg3SUdNNklDZDNheTF6ZDJsMFkyaGliMkZ5WkNjZ2ZTazdYRzRnSUhaaGNpQmpiMjF0WVc1a2N5QTlJSFJoWnloN0lHTTZJQ2QzYXkxamIyMXRZVzVrY3ljZ2ZTazdYRzRnSUhaaGNpQmxaR2wwWVdKc1pTQTlJSFJoWnloN0lHTTZJRnNuZDJzdGQzbHphWGQ1Wnljc0lDZDNheTFvYVdSbEoxMHVZMjl1WTJGMEtHOHVZMnhoYzNObGN5NTNlWE5wZDNsbktTNXFiMmx1S0NjZ0p5a2dmU2s3WEc0Z0lIWmhjaUJ6ZFhKbVlXTmxJRDBnWjJWMFUzVnlabUZqWlNoMFpYaDBZWEpsWVN3Z1pXUnBkR0ZpYkdVc0lHUnliM0JoY21WaEtUdGNiaUFnZG1GeUlHaHBjM1J2Y25rZ1BTQnVaWGNnU1c1d2RYUklhWE4wYjNKNUtITjFjbVpoWTJVc0lDZHRZWEpyWkc5M2JpY3BPMXh1SUNCMllYSWdaV1JwZEc5eUlEMGdlMXh1SUNBZ0lHRmtaRU52YlcxaGJtUTZJR0ZrWkVOdmJXMWhibVFzWEc0Z0lDQWdZV1JrUTI5dGJXRnVaRUoxZEhSdmJqb2dZV1JrUTI5dGJXRnVaRUoxZEhSdmJpeGNiaUFnSUNCeWRXNURiMjF0WVc1a09pQnlkVzVEYjIxdFlXNWtMRnh1SUNBZ0lIQmhjbk5sVFdGeWEyUnZkMjQ2SUc4dWNHRnljMlZOWVhKclpHOTNiaXhjYmlBZ0lDQndZWEp6WlVoVVRVdzZJRzh1Y0dGeWMyVklWRTFNTEZ4dUlDQWdJR1JsYzNSeWIzazZJR1JsYzNSeWIza3NYRzRnSUNBZ2RtRnNkV1U2SUdkbGRFOXlVMlYwVm1Gc2RXVXNYRzRnSUNBZ2RHVjRkR0Z5WldFNklIUmxlSFJoY21WaExGeHVJQ0FnSUdWa2FYUmhZbXhsT2lCdkxuZDVjMmwzZVdjZ1B5QmxaR2wwWVdKc1pTQTZJRzUxYkd3c1hHNGdJQ0FnYzJWMFRXOWtaVG9nY0dWeWMybHpkRTF2WkdVc1hHNGdJQ0FnYUdsemRHOXllVG9nZTF4dUlDQWdJQ0FnZFc1a2J6b2dhR2x6ZEc5eWVTNTFibVJ2TEZ4dUlDQWdJQ0FnY21Wa2J6b2dhR2x6ZEc5eWVTNXlaV1J2TEZ4dUlDQWdJQ0FnWTJGdVZXNWtiem9nYUdsemRHOXllUzVqWVc1VmJtUnZMRnh1SUNBZ0lDQWdZMkZ1VW1Wa2J6b2dhR2x6ZEc5eWVTNWpZVzVTWldSdlhHNGdJQ0FnZlN4Y2JpQWdJQ0J0YjJSbE9pQW5iV0Z5YTJSdmQyNG5YRzRnSUgwN1hHNGdJSFpoY2lCbGJuUnllU0E5SUhzZ2RHRTZJSFJsZUhSaGNtVmhMQ0JsWkdsMGIzSTZJR1ZrYVhSdmNpQjlPMXh1SUNCMllYSWdhU0E5SUdOaFkyaGxMbkIxYzJnb1pXNTBjbmtwTzF4dUlDQjJZWElnYTJGdWVXVkRiMjUwWlhoMElEMGdKM2R2YjJadFlYSnJYeWNnS3lCcE8xeHVJQ0IyWVhJZ2EyRnVlV1ZQY0hScGIyNXpJRDBnZTF4dUlDQWdJR1pwYkhSbGNqb2djR0Z5Wlc1MExGeHVJQ0FnSUdOdmJuUmxlSFE2SUd0aGJubGxRMjl1ZEdWNGRGeHVJQ0I5TzF4dUlDQjJZWElnYlc5a1pYTWdQU0I3WEc0Z0lDQWdiV0Z5YTJSdmQyNDZJSHRjYmlBZ0lDQWdJR0oxZEhSdmJqb2dkR0ZuS0hzZ2REb2dKMkoxZEhSdmJpY3NJR002SUNkM2F5MXRiMlJsSUhkckxXMXZaR1V0WVdOMGFYWmxKeUI5S1N4Y2JpQWdJQ0FnSUhObGREb2diV0Z5YTJSdmQyNU5iMlJsWEc0Z0lDQWdmU3hjYmlBZ0lDQm9kRzFzT2lCN1hHNGdJQ0FnSUNCaWRYUjBiMjQ2SUhSaFp5aDdJSFE2SUNkaWRYUjBiMjRuTENCak9pQW5kMnN0Ylc5a1pTQjNheTF0YjJSbExXbHVZV04wYVhabEp5QjlLU3hjYmlBZ0lDQWdJSE5sZERvZ2FIUnRiRTF2WkdWY2JpQWdJQ0I5TEZ4dUlDQWdJSGQ1YzJsM2VXYzZJSHRjYmlBZ0lDQWdJR0oxZEhSdmJqb2dkR0ZuS0hzZ2REb2dKMkoxZEhSdmJpY3NJR002SUNkM2F5MXRiMlJsSUhkckxXMXZaR1V0YVc1aFkzUnBkbVVuSUgwcExGeHVJQ0FnSUNBZ2MyVjBPaUIzZVhOcGQzbG5UVzlrWlZ4dUlDQWdJSDFjYmlBZ2ZUdGNiaUFnZG1GeUlIQnNZV05sTzF4dVhHNGdJSFJoWnloN0lIUTZJQ2R6Y0dGdUp5d2dZem9nSjNkckxXUnliM0F0ZEdWNGRDY3NJSGc2SUhOMGNtbHVaM011Y0hKdmJYQjBjeTVrY205d0xDQndPaUJrY205d1lYSmxZU0I5S1R0Y2JpQWdkR0ZuS0hzZ2REb2dKM0FuTENCak9pQmJKM2RyTFdSeWIzQXRhV052YmlkZExtTnZibU5oZENodkxtTnNZWE56WlhNdVpISnZjR2xqYjI0cExtcHZhVzRvSnlBbktTd2djRG9nWkhKdmNHRnlaV0VnZlNrN1hHNWNiaUFnWldScGRHRmliR1V1WTI5dWRHVnVkRVZrYVhSaFlteGxJRDBnZEhKMVpUdGNiaUFnYlc5a1pYTXViV0Z5YTJSdmQyNHVZblYwZEc5dUxuTmxkRUYwZEhKcFluVjBaU2duWkdsellXSnNaV1FuTENBblpHbHpZV0pzWldRbktUdGNiaUFnYlc5a1pVNWhiV1Z6TG1admNrVmhZMmdvWVdSa1RXOWtaU2s3WEc1Y2JpQWdhV1lnS0c4dWQzbHphWGQ1WnlrZ2UxeHVJQ0FnSUhCc1lXTmxJRDBnZEdGbktIc2dZem9nSjNkckxYZDVjMmwzZVdjdGNHeGhZMlZvYjJ4a1pYSWdkMnN0YUdsa1pTY3NJSGc2SUhSbGVIUmhjbVZoTG5Cc1lXTmxhRzlzWkdWeUlIMHBPMXh1SUNBZ0lHTnliM056ZG1WdWRDNWhaR1FvY0d4aFkyVXNJQ2RqYkdsamF5Y3NJR1p2WTNWelJXUnBkR0ZpYkdVcE8xeHVJQ0I5WEc1Y2JpQWdhV1lnS0c4dVpHVm1ZWFZzZEUxdlpHVWdKaVlnYjF0dkxtUmxabUYxYkhSTmIyUmxYU2tnZTF4dUlDQWdJRzF2WkdWelcyOHVaR1ZtWVhWc2RFMXZaR1ZkTG5ObGRDZ3BPMXh1SUNCOUlHVnNjMlVnYVdZZ0tHOHViV0Z5YTJSdmQyNHBJSHRjYmlBZ0lDQnRiMlJsY3k1dFlYSnJaRzkzYmk1elpYUW9LVHRjYmlBZ2ZTQmxiSE5sSUdsbUlDaHZMbWgwYld3cElIdGNiaUFnSUNCdGIyUmxjeTVvZEcxc0xuTmxkQ2dwTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUcxdlpHVnpMbmQ1YzJsM2VXY3VjMlYwS0NrN1hHNGdJSDFjYmx4dUlDQmlhVzVrUTI5dGJXRnVaSE1vYzNWeVptRmpaU3dnYnl3Z1pXUnBkRzl5S1R0Y2JpQWdZbWx1WkVWMlpXNTBjeWdwTzF4dVhHNGdJSEpsZEhWeWJpQmxaR2wwYjNJN1hHNWNiaUFnWm5WdVkzUnBiMjRnWVdSa1RXOWtaU0FvYVdRcElIdGNiaUFnSUNCMllYSWdZblYwZEc5dUlEMGdiVzlrWlhOYmFXUmRMbUoxZEhSdmJqdGNiaUFnSUNCMllYSWdZM1Z6ZEc5dElEMGdieTV5Wlc1a1pYSXViVzlrWlhNN1hHNGdJQ0FnYVdZZ0tHOWJhV1JkS1NCN1hHNGdJQ0FnSUNCemQybDBZMmhpYjJGeVpDNWhjSEJsYm1SRGFHbHNaQ2hpZFhSMGIyNHBPMXh1SUNBZ0lDQWdLSFI1Y0dWdlppQmpkWE4wYjIwZ1BUMDlJQ2RtZFc1amRHbHZiaWNnUHlCamRYTjBiMjBnT2lCeVpXNWtaWEpsY25NdWJXOWtaWE1wS0dKMWRIUnZiaXdnYVdRcE8xeHVJQ0FnSUNBZ1kzSnZjM04yWlc1MExtRmtaQ2hpZFhSMGIyNHNJQ2RqYkdsamF5Y3NJRzF2WkdWelcybGtYUzV6WlhRcE8xeHVJQ0FnSUNBZ1luVjBkRzl1TG5SNWNHVWdQU0FuWW5WMGRHOXVKenRjYmlBZ0lDQWdJR0oxZEhSdmJpNTBZV0pKYm1SbGVDQTlJQzB4TzF4dVhHNGdJQ0FnSUNCMllYSWdkR2wwYkdVZ1BTQnpkSEpwYm1kekxuUnBkR3hsYzF0cFpGMDdYRzRnSUNBZ0lDQnBaaUFvZEdsMGJHVXBJSHRjYmlBZ0lDQWdJQ0FnWW5WMGRHOXVMbk5sZEVGMGRISnBZblYwWlNnbmRHbDBiR1VuTENCdFlXTWdQeUJ0WVdOcFpua29kR2wwYkdVcElEb2dkR2wwYkdVcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHSnBibVJGZG1WdWRITWdLSEpsYlc5MlpTa2dlMXh1SUNBZ0lIWmhjaUJoY2lBOUlISmxiVzkyWlNBL0lDZHliU2NnT2lBbllXUmtKenRjYmlBZ0lDQjJZWElnYlc5MklEMGdjbVZ0YjNabElEOGdKM0psYlc5MlpVTm9hV3hrSnlBNklDZGhjSEJsYm1SRGFHbHNaQ2M3WEc0Z0lDQWdhV1lnS0hKbGJXOTJaU2tnZTF4dUlDQWdJQ0FnYTJGdWVXVXVZMnhsWVhJb2EyRnVlV1ZEYjI1MFpYaDBLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2FXWWdLRzh1YldGeWEyUnZkMjRwSUhzZ2EyRnVlV1V1YjI0b0oyTnRaQ3R0Snl3Z2EyRnVlV1ZQY0hScGIyNXpMQ0J0WVhKclpHOTNiazF2WkdVcE95QjlYRzRnSUNBZ0lDQnBaaUFvYnk1b2RHMXNLU0I3SUd0aGJubGxMbTl1S0NkamJXUXJhQ2NzSUd0aGJubGxUM0IwYVc5dWN5d2dhSFJ0YkUxdlpHVXBPeUI5WEc0Z0lDQWdJQ0JwWmlBb2J5NTNlWE5wZDNsbktTQjdJR3RoYm5sbExtOXVLQ2RqYldRcmNDY3NJR3RoYm5sbFQzQjBhVzl1Y3l3Z2QzbHphWGQ1WjAxdlpHVXBPeUI5WEc0Z0lDQWdmVnh1SUNBZ0lHTnNZWE56WlhOYllYSmRLSEJoY21WdWRDd2dKM2RyTFdOdmJuUmhhVzVsY2ljcE8xeHVJQ0FnSUhCaGNtVnVkRnR0YjNaZEtHVmthWFJoWW14bEtUdGNiaUFnSUNCcFppQW9jR3hoWTJVcElIc2djR0Z5Wlc1MFcyMXZkbDBvY0d4aFkyVXBPeUI5WEc0Z0lDQWdjR0Z5Wlc1MFcyMXZkbDBvWTI5dGJXRnVaSE1wTzF4dUlDQWdJSEJoY21WdWRGdHRiM1pkS0hOM2FYUmphR0p2WVhKa0tUdGNiaUFnSUNCcFppQW9ieTVwYldGblpYTWdmSHdnYnk1aGRIUmhZMmh0Wlc1MGN5a2dlMXh1SUNBZ0lDQWdjR0Z5Wlc1MFcyMXZkbDBvWkhKdmNHRnlaV0VwTzF4dUlDQWdJQ0FnZFhCc2IyRmtjeWh3WVhKbGJuUXNJR1J5YjNCaGNtVmhMQ0JsWkdsMGIzSXNJRzhzSUhKbGJXOTJaU2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWkdWemRISnZlU0FvS1NCN1hHNGdJQ0FnYVdZZ0tHVmthWFJ2Y2k1dGIyUmxJQ0U5UFNBbmJXRnlhMlJ2ZDI0bktTQjdYRzRnSUNBZ0lDQjBaWGgwWVhKbFlTNTJZV3gxWlNBOUlHZGxkRTFoY210a2IzZHVLQ2s3WEc0Z0lDQWdmVnh1SUNBZ0lHTnNZWE56WlhNdWNtMG9kR1Y0ZEdGeVpXRXNJQ2QzYXkxb2FXUmxKeWs3WEc0Z0lDQWdZbWx1WkVWMlpXNTBjeWgwY25WbEtUdGNiaUFnSUNCa1pXeGxkR1VnWTJGamFHVmJhU0F0SURGZE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdiV0Z5YTJSdmQyNU5iMlJsSUNobEtTQjdJSEJsY25OcGMzUk5iMlJsS0NkdFlYSnJaRzkzYmljc0lHVXBPeUI5WEc0Z0lHWjFibU4wYVc5dUlHaDBiV3hOYjJSbElDaGxLU0I3SUhCbGNuTnBjM1JOYjJSbEtDZG9kRzFzSnl3Z1pTazdJSDFjYmlBZ1puVnVZM1JwYjI0Z2QzbHphWGQ1WjAxdlpHVWdLR1VwSUhzZ2NHVnljMmx6ZEUxdlpHVW9KM2Q1YzJsM2VXY25MQ0JsS1RzZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhCbGNuTnBjM1JOYjJSbElDaHVaWGgwVFc5a1pTd2daU2tnZTF4dUlDQWdJSFpoY2lCeVpXMWxiV0p5WVc1alpUdGNiaUFnSUNCMllYSWdZM1Z5Y21WdWRFMXZaR1VnUFNCbFpHbDBiM0l1Ylc5a1pUdGNiaUFnSUNCMllYSWdiMnhrSUQwZ2JXOWtaWE5iWTNWeWNtVnVkRTF2WkdWZExtSjFkSFJ2Ymp0Y2JpQWdJQ0IyWVhJZ1luVjBkRzl1SUQwZ2JXOWtaWE5iYm1WNGRFMXZaR1ZkTG1KMWRIUnZianRjYmlBZ0lDQjJZWElnWm05amRYTnBibWNnUFNBaElXVWdmSHdnWkc5akxtRmpkR2wyWlVWc1pXMWxiblFnUFQwOUlIUmxlSFJoY21WaElIeDhJR1J2WXk1aFkzUnBkbVZGYkdWdFpXNTBJRDA5UFNCbFpHbDBZV0pzWlR0Y2JseHVJQ0FnSUhOMGIzQW9aU2s3WEc1Y2JpQWdJQ0JwWmlBb1kzVnljbVZ1ZEUxdlpHVWdQVDA5SUc1bGVIUk5iMlJsS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVZ0WlcxaWNtRnVZMlVnUFNCbWIyTjFjMmx1WnlBbUppQnlaVzFsYldKbGNsTmxiR1ZqZEdsdmJpaG9hWE4wYjNKNUxDQnZLVHRjYmlBZ0lDQjBaWGgwWVhKbFlTNWliSFZ5S0NrN0lDOHZJR0YyWlhKMElHTm9jbTl0WlNCeVpYQmhhVzUwSUdKMVozTmNibHh1SUNBZ0lHbG1JQ2h1WlhoMFRXOWtaU0E5UFQwZ0oyMWhjbXRrYjNkdUp5a2dlMXh1SUNBZ0lDQWdhV1lnS0dOMWNuSmxiblJOYjJSbElEMDlQU0FuYUhSdGJDY3BJSHRjYmlBZ0lDQWdJQ0FnZEdWNGRHRnlaV0V1ZG1Gc2RXVWdQU0J3WVhKelpTZ25jR0Z5YzJWSVZFMU1KeXdnZEdWNGRHRnlaV0V1ZG1Gc2RXVXBMblJ5YVcwb0tUdGNiaUFnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lIUmxlSFJoY21WaExuWmhiSFZsSUQwZ2NHRnljMlVvSjNCaGNuTmxTRlJOVENjc0lHVmthWFJoWW14bEtTNTBjbWx0S0NrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNCbGJITmxJR2xtSUNodVpYaDBUVzlrWlNBOVBUMGdKMmgwYld3bktTQjdYRzRnSUNBZ0lDQnBaaUFvWTNWeWNtVnVkRTF2WkdVZ1BUMDlJQ2R0WVhKclpHOTNiaWNwSUh0Y2JpQWdJQ0FnSUNBZ2RHVjRkR0Z5WldFdWRtRnNkV1VnUFNCd1lYSnpaU2duY0dGeWMyVk5ZWEpyWkc5M2JpY3NJSFJsZUhSaGNtVmhMblpoYkhWbEtTNTBjbWx0S0NrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCMFpYaDBZWEpsWVM1MllXeDFaU0E5SUdWa2FYUmhZbXhsTG1sdWJtVnlTRlJOVEM1MGNtbHRLQ2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2h1WlhoMFRXOWtaU0E5UFQwZ0ozZDVjMmwzZVdjbktTQjdYRzRnSUNBZ0lDQnBaaUFvWTNWeWNtVnVkRTF2WkdVZ1BUMDlJQ2R0WVhKclpHOTNiaWNwSUh0Y2JpQWdJQ0FnSUNBZ1pXUnBkR0ZpYkdVdWFXNXVaWEpJVkUxTUlEMGdjR0Z5YzJVb0ozQmhjbk5sVFdGeWEyUnZkMjRuTENCMFpYaDBZWEpsWVM1MllXeDFaU2t1Y21Wd2JHRmpaU2h5Y0dGeVlXZHlZWEJvTENBbkp5a3VkSEpwYlNncE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ1pXUnBkR0ZpYkdVdWFXNXVaWEpJVkUxTUlEMGdkR1Y0ZEdGeVpXRXVkbUZzZFdVdWNtVndiR0ZqWlNoeWNHRnlZV2R5WVhCb0xDQW5KeWt1ZEhKcGJTZ3BPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNibHh1SUNBZ0lHbG1JQ2h1WlhoMFRXOWtaU0E5UFQwZ0ozZDVjMmwzZVdjbktTQjdYRzRnSUNBZ0lDQmpiR0Z6YzJWekxtRmtaQ2gwWlhoMFlYSmxZU3dnSjNkckxXaHBaR1VuS1R0Y2JpQWdJQ0FnSUdOc1lYTnpaWE11Y20wb1pXUnBkR0ZpYkdVc0lDZDNheTFvYVdSbEp5azdYRzRnSUNBZ0lDQnBaaUFvY0d4aFkyVXBJSHNnWTJ4aGMzTmxjeTV5YlNod2JHRmpaU3dnSjNkckxXaHBaR1VuS1RzZ2ZWeHVJQ0FnSUNBZ2FXWWdLR1p2WTNWemFXNW5LU0I3SUhObGRGUnBiV1Z2ZFhRb1ptOWpkWE5GWkdsMFlXSnNaU3dnTUNrN0lIMWNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnWTJ4aGMzTmxjeTV5YlNoMFpYaDBZWEpsWVN3Z0ozZHJMV2hwWkdVbktUdGNiaUFnSUNBZ0lHTnNZWE56WlhNdVlXUmtLR1ZrYVhSaFlteGxMQ0FuZDJzdGFHbGtaU2NwTzF4dUlDQWdJQ0FnYVdZZ0tIQnNZV05sS1NCN0lHTnNZWE56WlhNdVlXUmtLSEJzWVdObExDQW5kMnN0YUdsa1pTY3BPeUI5WEc0Z0lDQWdJQ0JwWmlBb1ptOWpkWE5wYm1jcElIc2dkR1Y0ZEdGeVpXRXVabTlqZFhNb0tUc2dmVnh1SUNBZ0lIMWNiaUFnSUNCamJHRnpjMlZ6TG1Ga1pDaGlkWFIwYjI0c0lDZDNheTF0YjJSbExXRmpkR2wyWlNjcE8xeHVJQ0FnSUdOc1lYTnpaWE11Y20wb2IyeGtMQ0FuZDJzdGJXOWtaUzFoWTNScGRtVW5LVHRjYmlBZ0lDQmpiR0Z6YzJWekxtRmtaQ2h2YkdRc0lDZDNheTF0YjJSbExXbHVZV04wYVhabEp5azdYRzRnSUNBZ1kyeGhjM05sY3k1eWJTaGlkWFIwYjI0c0lDZDNheTF0YjJSbExXbHVZV04wYVhabEp5azdYRzRnSUNBZ1luVjBkRzl1TG5ObGRFRjBkSEpwWW5WMFpTZ25aR2x6WVdKc1pXUW5MQ0FuWkdsellXSnNaV1FuS1R0Y2JpQWdJQ0J2YkdRdWNtVnRiM1psUVhSMGNtbGlkWFJsS0Nka2FYTmhZbXhsWkNjcE8xeHVJQ0FnSUdWa2FYUnZjaTV0YjJSbElEMGdibVY0ZEUxdlpHVTdYRzVjYmlBZ0lDQnBaaUFvYnk1emRHOXlZV2RsS1NCN0lHeHpMbk5sZENodkxuTjBiM0poWjJVc0lHNWxlSFJOYjJSbEtUc2dmVnh1WEc0Z0lDQWdhR2x6ZEc5eWVTNXpaWFJKYm5CMWRFMXZaR1VvYm1WNGRFMXZaR1VwTzF4dUlDQWdJR2xtSUNoeVpXMWxiV0p5WVc1alpTa2dleUJ5WlcxbGJXSnlZVzVqWlM1MWJtMWhjbXNvS1RzZ2ZWeHVJQ0FnSUdacGNtVk1ZWFJsY2lnbmQyOXZabTFoY21zdGJXOWtaUzFqYUdGdVoyVW5LVHRjYmx4dUlDQWdJR1oxYm1OMGFXOXVJSEJoY25ObElDaHRaWFJvYjJRc0lHbHVjSFYwS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnYjF0dFpYUm9iMlJkS0dsdWNIVjBMQ0I3WEc0Z0lDQWdJQ0FnSUcxaGNtdGxjbk02SUhKbGJXVnRZbkpoYm1ObElDWW1JSEpsYldWdFluSmhibU5sTG0xaGNtdGxjbk1nZkh3Z1cxMWNiaUFnSUNBZ0lIMHBPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR1pwY21WTVlYUmxjaUFvZEhsd1pTa2dlMXh1SUNBZ0lITmxkRlJwYldWdmRYUW9ablZ1WTNScGIyNGdabWx5WlNBb0tTQjdYRzRnSUNBZ0lDQmpjbTl6YzNabGJuUXVabUZpY21sallYUmxLSFJsZUhSaGNtVmhMQ0IwZVhCbEtUdGNiaUFnSUNCOUxDQXdLVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdadlkzVnpSV1JwZEdGaWJHVWdLQ2tnZTF4dUlDQWdJR1ZrYVhSaFlteGxMbVp2WTNWektDazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJuWlhSTllYSnJaRzkzYmlBb0tTQjdYRzRnSUNBZ2FXWWdLR1ZrYVhSdmNpNXRiMlJsSUQwOVBTQW5kM2x6YVhkNVp5Y3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnZMbkJoY25ObFNGUk5UQ2hsWkdsMFlXSnNaU2s3WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2hsWkdsMGIzSXViVzlrWlNBOVBUMGdKMmgwYld3bktTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z2J5NXdZWEp6WlVoVVRVd29kR1Y0ZEdGeVpXRXVkbUZzZFdVcE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdkR1Y0ZEdGeVpXRXVkbUZzZFdVN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQm5aWFJQY2xObGRGWmhiSFZsSUNocGJuQjFkQ2tnZTF4dUlDQWdJSFpoY2lCdFlYSnJaRzkzYmlBOUlGTjBjbWx1WnlocGJuQjFkQ2s3WEc0Z0lDQWdkbUZ5SUhObGRITWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDA5UFNBeE8xeHVJQ0FnSUdsbUlDaHpaWFJ6S1NCN1hHNGdJQ0FnSUNCcFppQW9aV1JwZEc5eUxtMXZaR1VnUFQwOUlDZDNlWE5wZDNsbkp5a2dlMXh1SUNBZ0lDQWdJQ0JsWkdsMFlXSnNaUzVwYm01bGNraFVUVXdnUFNCaGMwaDBiV3dvS1R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUhSbGVIUmhjbVZoTG5aaGJIVmxJRDBnWldScGRHOXlMbTF2WkdVZ1BUMDlJQ2RvZEcxc0p5QS9JR0Z6U0hSdGJDZ3BJRG9nYldGeWEyUnZkMjQ3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JvYVhOMGIzSjVMbkpsYzJWMEtDazdYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGRIVnliaUJuWlhSTllYSnJaRzkzYmlncE8xeHVJQ0FnSUdaMWJtTjBhVzl1SUdGelNIUnRiQ0FvS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnYnk1d1lYSnpaVTFoY210a2IzZHVLRzFoY210a2IzZHVLVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJoWkdSRGIyMXRZVzVrUW5WMGRHOXVJQ2hwWkN3Z1kyOXRZbThzSUdadUtTQjdYRzRnSUNBZ2FXWWdLR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQVDA5SURJcElIdGNiaUFnSUNBZ0lHWnVJRDBnWTI5dFltODdYRzRnSUNBZ0lDQmpiMjFpYnlBOUlHNTFiR3c3WEc0Z0lDQWdmVnh1SUNBZ0lIWmhjaUJpZFhSMGIyNGdQU0IwWVdjb2V5QjBPaUFuWW5WMGRHOXVKeXdnWXpvZ0ozZHJMV052YlcxaGJtUW5MQ0J3T2lCamIyMXRZVzVrY3lCOUtUdGNiaUFnSUNCMllYSWdZM1Z6ZEc5dElEMGdieTV5Wlc1a1pYSXVZMjl0YldGdVpITTdYRzRnSUNBZ2RtRnlJSEpsYm1SbGNpQTlJSFI1Y0dWdlppQmpkWE4wYjIwZ1BUMDlJQ2RtZFc1amRHbHZiaWNnUHlCamRYTjBiMjBnT2lCeVpXNWtaWEpsY25NdVkyOXRiV0Z1WkhNN1hHNGdJQ0FnZG1GeUlIUnBkR3hsSUQwZ2MzUnlhVzVuY3k1MGFYUnNaWE5iYVdSZE8xeHVJQ0FnSUdsbUlDaDBhWFJzWlNrZ2UxeHVJQ0FnSUNBZ1luVjBkRzl1TG5ObGRFRjBkSEpwWW5WMFpTZ25kR2wwYkdVbkxDQnRZV01nUHlCdFlXTnBabmtvZEdsMGJHVXBJRG9nZEdsMGJHVXBPMXh1SUNBZ0lIMWNiaUFnSUNCaWRYUjBiMjR1ZEhsd1pTQTlJQ2RpZFhSMGIyNG5PMXh1SUNBZ0lHSjFkSFJ2Ymk1MFlXSkpibVJsZUNBOUlDMHhPMXh1SUNBZ0lISmxibVJsY2loaWRYUjBiMjRzSUdsa0tUdGNiaUFnSUNCamNtOXpjM1psYm5RdVlXUmtLR0oxZEhSdmJpd2dKMk5zYVdOckp5d2daMlYwUTI5dGJXRnVaRWhoYm1Sc1pYSW9jM1Z5Wm1GalpTd2dhR2x6ZEc5eWVTd2dabTRwS1R0Y2JpQWdJQ0JwWmlBb1kyOXRZbThwSUh0Y2JpQWdJQ0FnSUdGa1pFTnZiVzFoYm1Rb1kyOXRZbThzSUdadUtUdGNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJR0oxZEhSdmJqdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR0ZrWkVOdmJXMWhibVFnS0dOdmJXSnZMQ0JtYmlrZ2UxeHVJQ0FnSUd0aGJubGxMbTl1S0dOdmJXSnZMQ0JyWVc1NVpVOXdkR2x2Ym5Nc0lHZGxkRU52YlcxaGJtUklZVzVrYkdWeUtITjFjbVpoWTJVc0lHaHBjM1J2Y25rc0lHWnVLU2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCeWRXNURiMjF0WVc1a0lDaG1iaWtnZTF4dUlDQWdJR2RsZEVOdmJXMWhibVJJWVc1a2JHVnlLSE4xY21aaFkyVXNJR2hwYzNSdmNua3NJSEpsWVhKeVlXNW5aU2tvYm5Wc2JDazdYRzRnSUNBZ1puVnVZM1JwYjI0Z2NtVmhjbkpoYm1kbElDaGxMQ0J0YjJSbExDQmphSFZ1YTNNcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCbWJpNWpZV3hzS0hSb2FYTXNJR05vZFc1cmN5d2diVzlrWlNrN1hHNGdJQ0FnZlZ4dUlDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlIUmhaeUFvYjNCMGFXOXVjeWtnZTF4dUlDQjJZWElnYnlBOUlHOXdkR2x2Ym5NZ2ZId2dlMzA3WEc0Z0lIWmhjaUJsYkNBOUlHUnZZeTVqY21WaGRHVkZiR1Z0Wlc1MEtHOHVkQ0I4ZkNBblpHbDJKeWs3WEc0Z0lHVnNMbU5zWVhOelRtRnRaU0E5SUc4dVl5QjhmQ0FuSnp0Y2JpQWdjMlYwVkdWNGRDaGxiQ3dnYnk1NElIeDhJQ2NuS1R0Y2JpQWdhV1lnS0c4dWNDa2dleUJ2TG5BdVlYQndaVzVrUTJocGJHUW9aV3dwT3lCOVhHNGdJSEpsZEhWeWJpQmxiRHRjYm4xY2JseHVablZ1WTNScGIyNGdjM1J2Y0NBb1pTa2dlMXh1SUNCcFppQW9aU2tnZXlCbExuQnlaWFpsYm5SRVpXWmhkV3gwS0NrN0lHVXVjM1J2Y0ZCeWIzQmhaMkYwYVc5dUtDazdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdiV0ZqYVdaNUlDaDBaWGgwS1NCN1hHNGdJSEpsZEhWeWJpQjBaWGgwWEc0Z0lDQWdMbkpsY0d4aFkyVW9MMXhjWW1OMGNteGNYR0l2YVN3Z0oxeGNkVEl6TVRnbktWeHVJQ0FnSUM1eVpYQnNZV05sS0M5Y1hHSmhiSFJjWEdJdmFTd2dKMXhjZFRJek1qVW5LVnh1SUNBZ0lDNXlaWEJzWVdObEtDOWNYR0p6YUdsbWRGeGNZaTlwTENBblhGeDFNakZsTnljcE8xeHVmVnh1WEc1M2IyOW1iV0Z5YXk1bWFXNWtJRDBnWm1sdVpEdGNibmR2YjJadFlYSnJMbk4wY21sdVozTWdQU0J6ZEhKcGJtZHpPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0IzYjI5bWJXRnlhenRjYmlKZGZRPT0iXX0=
