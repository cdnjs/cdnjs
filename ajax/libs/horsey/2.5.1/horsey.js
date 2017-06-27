!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.horsey=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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
var win = global;
var rparagraph = /^<p>|<\/p>\n?$/g;

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
  var getSelection = o.getSelection || win.getSelection;
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
  var editor = o.editor;
  var textInput;
  var anyInput;
  var cachedChunks;
  var cachedNeedle;
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
    clear: clear,
    show: show,
    hide: hide,
    toggle: toggle,
    destroy: destroy,
    refreshPosition: refreshPosition,
    defaultRenderer: defaultRenderer,
    defaultGetText: defaultGetText,
    defaultGetValue: defaultGetValue,
    defaultSetter: defaultSetter,
    defaultFilter: defaultFilter,
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
      return (isText() ? appendText : appendHTML)(value);
    }
    userSet(value);
  }

  function filter (value, suggestion) {
    if (o.anchor) {
      return (isText() ? filterAnchoredText : filterAnchoredHTML)(value, suggestion);
    }
    return userFilter(value, suggestion);
  }

  function isText () { return !editor || isInput(attachment);}
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
      eye = bullseye(ul, attachment, { caret: anyInput && attachment.tagName !== 'INPUT', getSelection: getSelection });
      if (!visible()) { eye.sleep(); }
    }
    if (typeof suggestions === 'function' && !oneload.used) {
      if (remove || (anyInput && doc.activeElement !== attachment)) {
        crossvent[op](attachment, 'focus', oneload);
      } else {
        oneload();
      }
    }
    if (editor) {
      crossvent[op](editor.editable, 'horsey-filter', getChunksForFilters);
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
    return fuzzysearch(q, text.toLowerCase()) || fuzzysearch(q, value.toLowerCase());
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

  function getChunksForFilters () {
    editor.runCommand(function gotContext (chunks) {
      var text = chunks.before + chunks.selection;
      var anchored = false;
      var start = text.length;
      while (anchored === false && start >= 0) {
        cachedNeedle = text.substr(start - 1, text.length - start + 1);
        anchored = ranchorleft.test(cachedNeedle);
        start--;
      }
      if (anchored === false) {
        cachedNeedle = null;
      }
      cachedChunks = chunks;
    });
  }

  function filterAnchoredText (q, suggestion) {
    var position = sell(el);
    var input = loopbackToAnchor(q, position).text;
    if (input) {
      return userFilter(input, suggestion);
    }
  }

  function filterAnchoredHTML (q, suggestion) {
    if (cachedNeedle) {
      return userFilter(cachedNeedle, suggestion);
    }
  }

  function entitize (value) {
    if (editor && editor.mode !== 'markdown') {
      return editor.parseMarkdown(value).replace(rparagraph, '');
    }
    return value;
  }

  function appendText (value) {
    var entity = entitize(value);
    var current = el.value;
    var position = sell(el);
    var input = loopbackToAnchor(current, position);
    var left = current.substr(0, input.start);
    var right = current.substr(input.start + input.text.length + (position.end - position.start));
    var before = left + entity + ' ';

    el.value = before + right;
    sell(el, {
      start: before.length, end: before.length
    });
  }

  function appendHTML (value) {
    editor.runCommand(setEntity);
    function setEntity (chunks) {
      var entity = entitize(value);
      var left = cachedChunks.before;
      var len = left.length - 1;
      while (len > 0 && !ranchorright.test(left)) {
        left = left.substr(0, --len);
      }
      chunks.before = left.substr(0, len) + entity + '&nbsp;';
      chunks.after = cachedChunks.selection + cachedChunks.after;
      chunks.selection = '';
    }
  }
}

function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'; }

function defaultGetValue (suggestion) {
  return typeof suggestion === 'string' ? suggestion : suggestion.value;
}

function defaultGetText (suggestion) {
  return typeof suggestion === 'string' ? suggestion : suggestion.text;
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvcnNleS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHNlbGwgPSByZXF1aXJlKCdzZWxsJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgYnVsbHNleWUgPSByZXF1aXJlKCdidWxsc2V5ZScpO1xudmFyIGZ1enp5c2VhcmNoID0gcmVxdWlyZSgnZnV6enlzZWFyY2gnKTtcbnZhciBLRVlfRU5URVIgPSAxMztcbnZhciBLRVlfRVNDID0gMjc7XG52YXIgS0VZX1VQID0gMzg7XG52YXIgS0VZX0RPV04gPSA0MDtcbnZhciBjYWNoZSA9IFtdO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGRvY0VsZW1lbnQgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xudmFyIHdpbiA9IGdsb2JhbDtcbnZhciBycGFyYWdyYXBoID0gL148cD58PFxcL3A+XFxuPyQvZztcblxuZnVuY3Rpb24gZmluZCAoZWwpIHtcbiAgdmFyIGVudHJ5O1xuICB2YXIgaTtcbiAgZm9yIChpID0gMDsgaSA8IGNhY2hlLmxlbmd0aDsgaSsrKSB7XG4gICAgZW50cnkgPSBjYWNoZVtpXTtcbiAgICBpZiAoZW50cnkuZWwgPT09IGVsKSB7XG4gICAgICByZXR1cm4gZW50cnkuYXBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gaG9yc2V5IChlbCwgb3B0aW9ucykge1xuICB2YXIgY2FjaGVkID0gZmluZChlbCk7XG4gIGlmIChjYWNoZWQpIHtcbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG5cbiAgdmFyIG8gPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgcGFyZW50ID0gby5hcHBlbmRUbyB8fCBkb2MuYm9keTtcbiAgdmFyIHJlbmRlciA9IG8ucmVuZGVyIHx8IGRlZmF1bHRSZW5kZXJlcjtcbiAgdmFyIGdldFRleHQgPSBvLmdldFRleHQgfHwgZGVmYXVsdEdldFRleHQ7XG4gIHZhciBnZXRWYWx1ZSA9IG8uZ2V0VmFsdWUgfHwgZGVmYXVsdEdldFZhbHVlO1xuICB2YXIgZ2V0U2VsZWN0aW9uID0gby5nZXRTZWxlY3Rpb24gfHwgd2luLmdldFNlbGVjdGlvbjtcbiAgdmFyIGZvcm0gPSBvLmZvcm07XG4gIHZhciBsaW1pdCA9IHR5cGVvZiBvLmxpbWl0ID09PSAnbnVtYmVyJyA/IG8ubGltaXQgOiBJbmZpbml0eTtcbiAgdmFyIHN1Z2dlc3Rpb25zID0gby5zdWdnZXN0aW9ucztcbiAgdmFyIHVzZXJGaWx0ZXIgPSBvLmZpbHRlciB8fCBkZWZhdWx0RmlsdGVyO1xuICB2YXIgdXNlclNldCA9IG8uc2V0IHx8IGRlZmF1bHRTZXR0ZXI7XG4gIHZhciB1bCA9IHRhZygndWwnLCAnc2V5LWxpc3QnKTtcbiAgdmFyIHNlbGVjdGlvbiA9IG51bGw7XG4gIHZhciBvbmVsb2FkID0gb25jZShsb2FkaW5nKTtcbiAgdmFyIGV5ZTtcbiAgdmFyIGRlZmVycmVkRmlsdGVyaW5nID0gZGVmZXIoZmlsdGVyaW5nKTtcbiAgdmFyIGF0dGFjaG1lbnQgPSBlbDtcbiAgdmFyIGVkaXRvciA9IG8uZWRpdG9yO1xuICB2YXIgdGV4dElucHV0O1xuICB2YXIgYW55SW5wdXQ7XG4gIHZhciBjYWNoZWRDaHVua3M7XG4gIHZhciBjYWNoZWROZWVkbGU7XG4gIHZhciByYW5jaG9ybGVmdDtcbiAgdmFyIHJhbmNob3JyaWdodDtcblxuICBpZiAoby5hdXRvSGlkZU9uQmx1ciA9PT0gdm9pZCAwKSB7IG8uYXV0b0hpZGVPbkJsdXIgPSB0cnVlOyB9XG4gIGlmIChvLmF1dG9IaWRlT25DbGljayA9PT0gdm9pZCAwKSB7IG8uYXV0b0hpZGVPbkNsaWNrID0gdHJ1ZTsgfVxuICBpZiAoby5hdXRvU2hvd09uVXBEb3duID09PSB2b2lkIDApIHsgby5hdXRvU2hvd09uVXBEb3duID0gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJzsgfVxuICBpZiAoby5hbmNob3IpIHtcbiAgICByYW5jaG9ybGVmdCA9IG5ldyBSZWdFeHAoJ14nICsgby5hbmNob3IpO1xuICAgIHJhbmNob3JyaWdodCA9IG5ldyBSZWdFeHAoby5hbmNob3IgKyAnJCcpO1xuICB9XG5cbiAgdmFyIGFwaSA9IHtcbiAgICBhZGQ6IGFkZCxcbiAgICBjbGVhcjogY2xlYXIsXG4gICAgc2hvdzogc2hvdyxcbiAgICBoaWRlOiBoaWRlLFxuICAgIHRvZ2dsZTogdG9nZ2xlLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgcmVmcmVzaFBvc2l0aW9uOiByZWZyZXNoUG9zaXRpb24sXG4gICAgZGVmYXVsdFJlbmRlcmVyOiBkZWZhdWx0UmVuZGVyZXIsXG4gICAgZGVmYXVsdEdldFRleHQ6IGRlZmF1bHRHZXRUZXh0LFxuICAgIGRlZmF1bHRHZXRWYWx1ZTogZGVmYXVsdEdldFZhbHVlLFxuICAgIGRlZmF1bHRTZXR0ZXI6IGRlZmF1bHRTZXR0ZXIsXG4gICAgZGVmYXVsdEZpbHRlcjogZGVmYXVsdEZpbHRlcixcbiAgICByZXRhcmdldDogcmV0YXJnZXQsXG4gICAgYXR0YWNobWVudDogYXR0YWNobWVudCxcbiAgICBsaXN0OiB1bCxcbiAgICBzdWdnZXN0aW9uczogW11cbiAgfTtcbiAgdmFyIGVudHJ5ID0geyBlbDogZWwsIGFwaTogYXBpIH07XG5cbiAgcmV0YXJnZXQoZWwpO1xuICBjYWNoZS5wdXNoKGVudHJ5KTtcbiAgcGFyZW50LmFwcGVuZENoaWxkKHVsKTtcbiAgZWwuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnb2ZmJyk7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc3VnZ2VzdGlvbnMpKSB7XG4gICAgbG9hZGVkKHN1Z2dlc3Rpb25zKTtcbiAgfVxuXG4gIHJldHVybiBhcGk7XG5cbiAgZnVuY3Rpb24gcmV0YXJnZXQgKGVsKSB7XG4gICAgaW5wdXRFdmVudHModHJ1ZSk7XG4gICAgYXR0YWNobWVudCA9IGFwaS5hdHRhY2htZW50ID0gZWw7XG4gICAgdGV4dElucHV0ID0gYXR0YWNobWVudC50YWdOYW1lID09PSAnSU5QVVQnIHx8IGF0dGFjaG1lbnQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJztcbiAgICBhbnlJbnB1dCA9IHRleHRJbnB1dCB8fCBpc0VkaXRhYmxlKGF0dGFjaG1lbnQpO1xuICAgIGlucHV0RXZlbnRzKCk7XG4gIH1cblxuICBmdW5jdGlvbiByZWZyZXNoUG9zaXRpb24gKCkge1xuICAgIGlmIChleWUpIHsgZXllLnJlZnJlc2goKTsgfVxuICB9XG5cbiAgZnVuY3Rpb24gbG9hZGluZyAoKSB7XG4gICAgY3Jvc3N2ZW50LnJlbW92ZShhdHRhY2htZW50LCAnZm9jdXMnLCBvbmVsb2FkKTtcbiAgICBzdWdnZXN0aW9ucyhsb2FkZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZGVkIChzdWdnZXN0aW9ucykge1xuICAgIHN1Z2dlc3Rpb25zLmZvckVhY2goYWRkKTtcbiAgICBhcGkuc3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICB3aGlsZSAodWwubGFzdENoaWxkKSB7XG4gICAgICB1bC5yZW1vdmVDaGlsZCh1bC5sYXN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZCAoc3VnZ2VzdGlvbikge1xuICAgIHZhciBsaSA9IHRhZygnbGknLCAnc2V5LWl0ZW0nKTtcbiAgICByZW5kZXIobGksIHN1Z2dlc3Rpb24pO1xuICAgIGNyb3NzdmVudC5hZGQobGksICdjbGljaycsIGNsaWNrZWRTdWdnZXN0aW9uKTtcbiAgICBjcm9zc3ZlbnQuYWRkKGxpLCAnaG9yc2V5LWZpbHRlcicsIGZpbHRlckl0ZW0pO1xuICAgIGNyb3NzdmVudC5hZGQobGksICdob3JzZXktaGlkZScsIGhpZGVJdGVtKTtcbiAgICB1bC5hcHBlbmRDaGlsZChsaSk7XG4gICAgYXBpLnN1Z2dlc3Rpb25zLnB1c2goc3VnZ2VzdGlvbik7XG4gICAgcmV0dXJuIGxpO1xuXG4gICAgZnVuY3Rpb24gY2xpY2tlZFN1Z2dlc3Rpb24gKCkge1xuICAgICAgdmFyIHZhbHVlID0gZ2V0VmFsdWUoc3VnZ2VzdGlvbik7XG4gICAgICBzZXQodmFsdWUpO1xuICAgICAgaGlkZSgpO1xuICAgICAgYXR0YWNobWVudC5mb2N1cygpO1xuICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShhdHRhY2htZW50LCAnaG9yc2V5LXNlbGVjdGVkJywgdmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlckl0ZW0gKCkge1xuICAgICAgdmFyIHZhbHVlID0gdGV4dElucHV0ID8gZWwudmFsdWUgOiBlbC5pbm5lckhUTUw7XG4gICAgICBpZiAoZmlsdGVyKHZhbHVlLCBzdWdnZXN0aW9uKSkge1xuICAgICAgICBsaS5jbGFzc05hbWUgPSBsaS5jbGFzc05hbWUucmVwbGFjZSgvIHNleS1oaWRlL2csICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUobGksICdob3JzZXktaGlkZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhpZGVJdGVtICgpIHtcbiAgICAgIGlmICghaGlkZGVuKGxpKSkge1xuICAgICAgICBsaS5jbGFzc05hbWUgKz0gJyBzZXktaGlkZSc7XG4gICAgICAgIGlmIChzZWxlY3Rpb24gPT09IGxpKSB7XG4gICAgICAgICAgdW5zZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldCAodmFsdWUpIHtcbiAgICBpZiAoby5hbmNob3IpIHtcbiAgICAgIHJldHVybiAoaXNUZXh0KCkgPyBhcHBlbmRUZXh0IDogYXBwZW5kSFRNTCkodmFsdWUpO1xuICAgIH1cbiAgICB1c2VyU2V0KHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlciAodmFsdWUsIHN1Z2dlc3Rpb24pIHtcbiAgICBpZiAoby5hbmNob3IpIHtcbiAgICAgIHJldHVybiAoaXNUZXh0KCkgPyBmaWx0ZXJBbmNob3JlZFRleHQgOiBmaWx0ZXJBbmNob3JlZEhUTUwpKHZhbHVlLCBzdWdnZXN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIHVzZXJGaWx0ZXIodmFsdWUsIHN1Z2dlc3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNUZXh0ICgpIHsgcmV0dXJuICFlZGl0b3IgfHwgaXNJbnB1dChhdHRhY2htZW50KTt9XG4gIGZ1bmN0aW9uIHZpc2libGUgKCkgeyByZXR1cm4gdWwuY2xhc3NOYW1lLmluZGV4T2YoJ3NleS1zaG93JykgIT09IC0xOyB9XG4gIGZ1bmN0aW9uIGhpZGRlbiAobGkpIHsgcmV0dXJuIGxpLmNsYXNzTmFtZS5pbmRleE9mKCdzZXktaGlkZScpICE9PSAtMTsgfVxuXG4gIGZ1bmN0aW9uIHNob3cgKCkge1xuICAgIGlmICghdmlzaWJsZSgpKSB7XG4gICAgICB1bC5jbGFzc05hbWUgKz0gJyBzZXktc2hvdyc7XG4gICAgICBleWUucmVmcmVzaCgpO1xuICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShhdHRhY2htZW50LCAnaG9yc2V5LXNob3cnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVyIChlKSB7XG4gICAgdmFyIGxlZnQgPSBlLndoaWNoID09PSAxICYmICFlLm1ldGFLZXkgJiYgIWUuY3RybEtleTtcbiAgICBpZiAobGVmdCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjsgLy8gd2Ugb25seSBjYXJlIGFib3V0IGhvbmVzdCB0byBnb2QgbGVmdC1jbGlja3NcbiAgICB9XG4gICAgdG9nZ2xlKCk7XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGUgKCkge1xuICAgIGlmICghdmlzaWJsZSgpKSB7XG4gICAgICBzaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3QgKHN1Z2dlc3Rpb24pIHtcbiAgICB1bnNlbGVjdCgpO1xuICAgIGlmIChzdWdnZXN0aW9uKSB7XG4gICAgICBzZWxlY3Rpb24gPSBzdWdnZXN0aW9uO1xuICAgICAgc2VsZWN0aW9uLmNsYXNzTmFtZSArPSAnIHNleS1zZWxlY3RlZCc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdW5zZWxlY3QgKCkge1xuICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgIHNlbGVjdGlvbi5jbGFzc05hbWUgPSBzZWxlY3Rpb24uY2xhc3NOYW1lLnJlcGxhY2UoLyBzZXktc2VsZWN0ZWQvZywgJycpO1xuICAgICAgc2VsZWN0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlICh1cCwgbW92ZXMpIHtcbiAgICB2YXIgdG90YWwgPSB1bC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgaWYgKHRvdGFsIDwgbW92ZXMpIHtcbiAgICAgIHVuc2VsZWN0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0b3RhbCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZmlyc3QgPSB1cCA/ICdsYXN0Q2hpbGQnIDogJ2ZpcnN0Q2hpbGQnO1xuICAgIHZhciBuZXh0ID0gdXAgPyAncHJldmlvdXNTaWJsaW5nJyA6ICduZXh0U2libGluZyc7XG4gICAgdmFyIHN1Z2dlc3Rpb24gPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uW25leHRdIHx8IHVsW2ZpcnN0XTtcblxuICAgIHNlbGVjdChzdWdnZXN0aW9uKTtcblxuICAgIGlmIChoaWRkZW4oc3VnZ2VzdGlvbikpIHtcbiAgICAgIG1vdmUodXAsIG1vdmVzID8gbW92ZXMgKyAxIDogMSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZSAoKSB7XG4gICAgZXllLnNsZWVwKCk7XG4gICAgdWwuY2xhc3NOYW1lID0gdWwuY2xhc3NOYW1lLnJlcGxhY2UoLyBzZXktc2hvdy9nLCAnJyk7XG4gICAgdW5zZWxlY3QoKTtcbiAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGF0dGFjaG1lbnQsICdob3JzZXktaGlkZScpO1xuICB9XG5cbiAgZnVuY3Rpb24ga2V5ZG93biAoZSkge1xuICAgIHZhciBzaG93biA9IHZpc2libGUoKTtcbiAgICB2YXIgd2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAod2hpY2ggPT09IEtFWV9ET1dOKSB7XG4gICAgICBpZiAoYW55SW5wdXQgJiYgby5hdXRvU2hvd09uVXBEb3duKSB7XG4gICAgICAgIHNob3coKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaG93bikge1xuICAgICAgICBtb3ZlKCk7XG4gICAgICAgIHN0b3AoZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh3aGljaCA9PT0gS0VZX1VQKSB7XG4gICAgICBpZiAoYW55SW5wdXQgJiYgby5hdXRvU2hvd09uVXBEb3duKSB7XG4gICAgICAgIHNob3coKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaG93bikge1xuICAgICAgICBtb3ZlKHRydWUpO1xuICAgICAgICBzdG9wKGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2hvd24pIHtcbiAgICAgIGlmICh3aGljaCA9PT0gS0VZX0VOVEVSKSB7XG4gICAgICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKHNlbGVjdGlvbiwgJ2NsaWNrJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIHN0b3AoZSk7XG4gICAgICB9IGVsc2UgaWYgKHdoaWNoID09PSBLRVlfRVNDKSB7XG4gICAgICAgIGhpZGUoKTtcbiAgICAgICAgc3RvcChlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXJpbmcgKCkge1xuICAgIGlmICghdmlzaWJsZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoYXR0YWNobWVudCwgJ2hvcnNleS1maWx0ZXInKTtcbiAgICB2YXIgbGkgPSB1bC5maXJzdENoaWxkO1xuICAgIHZhciBjb3VudCA9IDA7XG4gICAgd2hpbGUgKGxpKSB7XG4gICAgICBpZiAoY291bnQgPj0gbGltaXQpIHtcbiAgICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShsaSwgJ2hvcnNleS1oaWRlJyk7XG4gICAgICB9XG4gICAgICBpZiAoY291bnQgPCBsaW1pdCkge1xuICAgICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGxpLCAnaG9yc2V5LWZpbHRlcicpO1xuICAgICAgICBpZiAobGkuY2xhc3NOYW1lLmluZGV4T2YoJ3NleS1oaWRlJykgPT09IC0xKSB7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGkgPSBsaS5uZXh0U2libGluZztcbiAgICB9XG4gICAgaWYgKCFzZWxlY3Rpb24pIHtcbiAgICAgIG1vdmUoKTtcbiAgICB9XG4gICAgaWYgKCFzZWxlY3Rpb24pIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZWZlcnJlZEZpbHRlcmluZ05vRW50ZXIgKGUpIHtcbiAgICB2YXIgd2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAod2hpY2ggPT09IEtFWV9FTlRFUikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkZWZlcnJlZEZpbHRlcmluZygpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVmZXJyZWRTaG93IChlKSB7XG4gICAgdmFyIHdoaWNoID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgaWYgKHdoaWNoID09PSBLRVlfRU5URVIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0VGltZW91dChzaG93LCAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhvcnNleUV2ZW50VGFyZ2V0IChlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQgPT09IGF0dGFjaG1lbnQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB3aGlsZSAodGFyZ2V0KSB7XG4gICAgICBpZiAodGFyZ2V0ID09PSB1bCB8fCB0YXJnZXQgPT09IGF0dGFjaG1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlT25CbHVyIChlKSB7XG4gICAgaWYgKGhvcnNleUV2ZW50VGFyZ2V0KGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhpZGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVPbkNsaWNrIChlKSB7XG4gICAgaWYgKGhvcnNleUV2ZW50VGFyZ2V0KGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhpZGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlucHV0RXZlbnRzIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGlmIChleWUpIHtcbiAgICAgIGV5ZS5kZXN0cm95KCk7XG4gICAgICBleWUgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoIXJlbW92ZSkge1xuICAgICAgZXllID0gYnVsbHNleWUodWwsIGF0dGFjaG1lbnQsIHsgY2FyZXQ6IGFueUlucHV0ICYmIGF0dGFjaG1lbnQudGFnTmFtZSAhPT0gJ0lOUFVUJywgZ2V0U2VsZWN0aW9uOiBnZXRTZWxlY3Rpb24gfSk7XG4gICAgICBpZiAoIXZpc2libGUoKSkgeyBleWUuc2xlZXAoKTsgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHN1Z2dlc3Rpb25zID09PSAnZnVuY3Rpb24nICYmICFvbmVsb2FkLnVzZWQpIHtcbiAgICAgIGlmIChyZW1vdmUgfHwgKGFueUlucHV0ICYmIGRvYy5hY3RpdmVFbGVtZW50ICE9PSBhdHRhY2htZW50KSkge1xuICAgICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdmb2N1cycsIG9uZWxvYWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25lbG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZWRpdG9yKSB7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGVkaXRvci5lZGl0YWJsZSwgJ2hvcnNleS1maWx0ZXInLCBnZXRDaHVua3NGb3JGaWx0ZXJzKTtcbiAgICB9XG4gICAgaWYgKGFueUlucHV0KSB7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdrZXlwcmVzcycsIGRlZmVycmVkU2hvdyk7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdrZXlwcmVzcycsIGRlZmVycmVkRmlsdGVyaW5nKTtcbiAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ2tleWRvd24nLCBkZWZlcnJlZEZpbHRlcmluZ05vRW50ZXIpO1xuICAgICAgY3Jvc3N2ZW50W29wXShhdHRhY2htZW50LCAncGFzdGUnLCBkZWZlcnJlZEZpbHRlcmluZyk7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdrZXlkb3duJywga2V5ZG93bik7XG4gICAgICBpZiAoby5hdXRvSGlkZU9uQmx1cikgeyBjcm9zc3ZlbnRbb3BdKGRvY0VsZW1lbnQsICdmb2N1cycsIGhpZGVPbkJsdXIsIHRydWUpOyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ2NsaWNrJywgdG9nZ2xlcik7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGRvY0VsZW1lbnQsICdrZXlkb3duJywga2V5ZG93bik7XG4gICAgfVxuICAgIGlmIChvLmF1dG9IaWRlT25DbGljaykgeyBjcm9zc3ZlbnRbb3BdKGRvYywgJ2NsaWNrJywgaGlkZU9uQ2xpY2spOyB9XG4gICAgaWYgKGZvcm0pIHsgY3Jvc3N2ZW50W29wXShmb3JtLCAnc3VibWl0JywgaGlkZSk7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGlucHV0RXZlbnRzKHRydWUpO1xuICAgIGlmIChwYXJlbnQuY29udGFpbnModWwpKSB7IHBhcmVudC5yZW1vdmVDaGlsZCh1bCk7IH1cbiAgICBjYWNoZS5zcGxpY2UoY2FjaGUuaW5kZXhPZihlbnRyeSksIDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdFNldHRlciAodmFsdWUpIHtcbiAgICBpZiAodGV4dElucHV0KSB7XG4gICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZWZhdWx0UmVuZGVyZXIgKGxpLCBzdWdnZXN0aW9uKSB7XG4gICAgbGkuaW5uZXJUZXh0ID0gbGkudGV4dENvbnRlbnQgPSBnZXRUZXh0KHN1Z2dlc3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdEZpbHRlciAocSwgc3VnZ2VzdGlvbikge1xuICAgIHZhciB0ZXh0ID0gZ2V0VGV4dChzdWdnZXN0aW9uKSB8fCAnJztcbiAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShzdWdnZXN0aW9uKSB8fCAnJztcbiAgICByZXR1cm4gZnV6enlzZWFyY2gocSwgdGV4dC50b0xvd2VyQ2FzZSgpKSB8fCBmdXp6eXNlYXJjaChxLCB2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb3BiYWNrVG9BbmNob3IgKHRleHQsIHApIHtcbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdmFyIGFuY2hvcmVkID0gZmFsc2U7XG4gICAgdmFyIHN0YXJ0ID0gcC5zdGFydDtcbiAgICB3aGlsZSAoYW5jaG9yZWQgPT09IGZhbHNlICYmIHN0YXJ0ID49IDApIHtcbiAgICAgIHJlc3VsdCA9IHRleHQuc3Vic3RyKHN0YXJ0IC0gMSwgcC5zdGFydCAtIHN0YXJ0ICsgMSk7XG4gICAgICBhbmNob3JlZCA9IHJhbmNob3JsZWZ0LnRlc3QocmVzdWx0KTtcbiAgICAgIHN0YXJ0LS07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB0ZXh0OiBhbmNob3JlZCA/IHJlc3VsdCA6IG51bGwsXG4gICAgICBzdGFydDogc3RhcnRcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2h1bmtzRm9yRmlsdGVycyAoKSB7XG4gICAgZWRpdG9yLnJ1bkNvbW1hbmQoZnVuY3Rpb24gZ290Q29udGV4dCAoY2h1bmtzKSB7XG4gICAgICB2YXIgdGV4dCA9IGNodW5rcy5iZWZvcmUgKyBjaHVua3Muc2VsZWN0aW9uO1xuICAgICAgdmFyIGFuY2hvcmVkID0gZmFsc2U7XG4gICAgICB2YXIgc3RhcnQgPSB0ZXh0Lmxlbmd0aDtcbiAgICAgIHdoaWxlIChhbmNob3JlZCA9PT0gZmFsc2UgJiYgc3RhcnQgPj0gMCkge1xuICAgICAgICBjYWNoZWROZWVkbGUgPSB0ZXh0LnN1YnN0cihzdGFydCAtIDEsIHRleHQubGVuZ3RoIC0gc3RhcnQgKyAxKTtcbiAgICAgICAgYW5jaG9yZWQgPSByYW5jaG9ybGVmdC50ZXN0KGNhY2hlZE5lZWRsZSk7XG4gICAgICAgIHN0YXJ0LS07XG4gICAgICB9XG4gICAgICBpZiAoYW5jaG9yZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGNhY2hlZE5lZWRsZSA9IG51bGw7XG4gICAgICB9XG4gICAgICBjYWNoZWRDaHVua3MgPSBjaHVua3M7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXJBbmNob3JlZFRleHQgKHEsIHN1Z2dlc3Rpb24pIHtcbiAgICB2YXIgcG9zaXRpb24gPSBzZWxsKGVsKTtcbiAgICB2YXIgaW5wdXQgPSBsb29wYmFja1RvQW5jaG9yKHEsIHBvc2l0aW9uKS50ZXh0O1xuICAgIGlmIChpbnB1dCkge1xuICAgICAgcmV0dXJuIHVzZXJGaWx0ZXIoaW5wdXQsIHN1Z2dlc3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlckFuY2hvcmVkSFRNTCAocSwgc3VnZ2VzdGlvbikge1xuICAgIGlmIChjYWNoZWROZWVkbGUpIHtcbiAgICAgIHJldHVybiB1c2VyRmlsdGVyKGNhY2hlZE5lZWRsZSwgc3VnZ2VzdGlvbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW50aXRpemUgKHZhbHVlKSB7XG4gICAgaWYgKGVkaXRvciAmJiBlZGl0b3IubW9kZSAhPT0gJ21hcmtkb3duJykge1xuICAgICAgcmV0dXJuIGVkaXRvci5wYXJzZU1hcmtkb3duKHZhbHVlKS5yZXBsYWNlKHJwYXJhZ3JhcGgsICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwZW5kVGV4dCAodmFsdWUpIHtcbiAgICB2YXIgZW50aXR5ID0gZW50aXRpemUodmFsdWUpO1xuICAgIHZhciBjdXJyZW50ID0gZWwudmFsdWU7XG4gICAgdmFyIHBvc2l0aW9uID0gc2VsbChlbCk7XG4gICAgdmFyIGlucHV0ID0gbG9vcGJhY2tUb0FuY2hvcihjdXJyZW50LCBwb3NpdGlvbik7XG4gICAgdmFyIGxlZnQgPSBjdXJyZW50LnN1YnN0cigwLCBpbnB1dC5zdGFydCk7XG4gICAgdmFyIHJpZ2h0ID0gY3VycmVudC5zdWJzdHIoaW5wdXQuc3RhcnQgKyBpbnB1dC50ZXh0Lmxlbmd0aCArIChwb3NpdGlvbi5lbmQgLSBwb3NpdGlvbi5zdGFydCkpO1xuICAgIHZhciBiZWZvcmUgPSBsZWZ0ICsgZW50aXR5ICsgJyAnO1xuXG4gICAgZWwudmFsdWUgPSBiZWZvcmUgKyByaWdodDtcbiAgICBzZWxsKGVsLCB7XG4gICAgICBzdGFydDogYmVmb3JlLmxlbmd0aCwgZW5kOiBiZWZvcmUubGVuZ3RoXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBlbmRIVE1MICh2YWx1ZSkge1xuICAgIGVkaXRvci5ydW5Db21tYW5kKHNldEVudGl0eSk7XG4gICAgZnVuY3Rpb24gc2V0RW50aXR5IChjaHVua3MpIHtcbiAgICAgIHZhciBlbnRpdHkgPSBlbnRpdGl6ZSh2YWx1ZSk7XG4gICAgICB2YXIgbGVmdCA9IGNhY2hlZENodW5rcy5iZWZvcmU7XG4gICAgICB2YXIgbGVuID0gbGVmdC5sZW5ndGggLSAxO1xuICAgICAgd2hpbGUgKGxlbiA+IDAgJiYgIXJhbmNob3JyaWdodC50ZXN0KGxlZnQpKSB7XG4gICAgICAgIGxlZnQgPSBsZWZ0LnN1YnN0cigwLCAtLWxlbik7XG4gICAgICB9XG4gICAgICBjaHVua3MuYmVmb3JlID0gbGVmdC5zdWJzdHIoMCwgbGVuKSArIGVudGl0eSArICcmbmJzcDsnO1xuICAgICAgY2h1bmtzLmFmdGVyID0gY2FjaGVkQ2h1bmtzLnNlbGVjdGlvbiArIGNhY2hlZENodW5rcy5hZnRlcjtcbiAgICAgIGNodW5rcy5zZWxlY3Rpb24gPSAnJztcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNJbnB1dCAoZWwpIHsgcmV0dXJuIGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJzsgfVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0VmFsdWUgKHN1Z2dlc3Rpb24pIHtcbiAgcmV0dXJuIHR5cGVvZiBzdWdnZXN0aW9uID09PSAnc3RyaW5nJyA/IHN1Z2dlc3Rpb24gOiBzdWdnZXN0aW9uLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0VGV4dCAoc3VnZ2VzdGlvbikge1xuICByZXR1cm4gdHlwZW9mIHN1Z2dlc3Rpb24gPT09ICdzdHJpbmcnID8gc3VnZ2VzdGlvbiA6IHN1Z2dlc3Rpb24udGV4dDtcbn1cblxuZnVuY3Rpb24gdGFnICh0eXBlLCBjbGFzc05hbWUpIHtcbiAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGVsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiBvbmNlIChmbikge1xuICB2YXIgZGlzcG9zZWQ7XG4gIGZ1bmN0aW9uIGRpc3Bvc2FibGUgKCkge1xuICAgIGlmIChkaXNwb3NlZCkgeyByZXR1cm47IH1cbiAgICBkaXNwb3NhYmxlLnVzZWQgPSBkaXNwb3NlZCA9IHRydWU7XG4gICAgKGZuIHx8IG5vb3ApLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIH1cbiAgcmV0dXJuIGRpc3Bvc2FibGU7XG59XG5mdW5jdGlvbiBkZWZlciAoZm4pIHsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgc2V0VGltZW91dChmbiwgMCk7IH07IH1cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuZnVuY3Rpb24gaXNFZGl0YWJsZSAoZWwpIHtcbiAgdmFyIHZhbHVlID0gZWwuZ2V0QXR0cmlidXRlKCdjb250ZW50RWRpdGFibGUnKTtcbiAgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGVsLnBhcmVudEVsZW1lbnQpIHtcbiAgICByZXR1cm4gaXNFZGl0YWJsZShlbC5wYXJlbnRFbGVtZW50KTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmhvcnNleS5maW5kID0gZmluZDtcbm1vZHVsZS5leHBvcnRzID0gaG9yc2V5O1xuIl19
},{"bullseye":2,"crossvent":7,"fuzzysearch":9,"sell":10}],2:[function(require,module,exports){
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

},{"./tailormade":4,"./throttle":5,"crossvent":7}],3:[function(require,module,exports){
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
},{"./throttle":5,"crossvent":7,"sell":3}],5:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{"./eventmap":8,"custom-event":6}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJob3JzZXkuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvYnVsbHNleWUuanMiLCJub2RlX21vZHVsZXMvYnVsbHNleWUvbm9kZV9tb2R1bGVzL3NlbGwvc2VsbC5qcyIsIm5vZGVfbW9kdWxlcy9idWxsc2V5ZS90YWlsb3JtYWRlLmpzIiwibm9kZV9tb2R1bGVzL2J1bGxzZXllL3Rocm90dGxlLmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9ub2RlX21vZHVsZXMvY3VzdG9tLWV2ZW50L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvZXZlbnRtYXAuanMiLCJub2RlX21vZHVsZXMvZnV6enlzZWFyY2gvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2VsbCA9IHJlcXVpcmUoJ3NlbGwnKTtcbnZhciBjcm9zc3ZlbnQgPSByZXF1aXJlKCdjcm9zc3ZlbnQnKTtcbnZhciBidWxsc2V5ZSA9IHJlcXVpcmUoJ2J1bGxzZXllJyk7XG52YXIgZnV6enlzZWFyY2ggPSByZXF1aXJlKCdmdXp6eXNlYXJjaCcpO1xudmFyIEtFWV9FTlRFUiA9IDEzO1xudmFyIEtFWV9FU0MgPSAyNztcbnZhciBLRVlfVVAgPSAzODtcbnZhciBLRVlfRE9XTiA9IDQwO1xudmFyIGNhY2hlID0gW107XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgZG9jRWxlbWVudCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG52YXIgd2luID0gZ2xvYmFsO1xudmFyIHJwYXJhZ3JhcGggPSAvXjxwPnw8XFwvcD5cXG4/JC9nO1xuXG5mdW5jdGlvbiBmaW5kIChlbCkge1xuICB2YXIgZW50cnk7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAwOyBpIDwgY2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBlbnRyeSA9IGNhY2hlW2ldO1xuICAgIGlmIChlbnRyeS5lbCA9PT0gZWwpIHtcbiAgICAgIHJldHVybiBlbnRyeS5hcGk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBob3JzZXkgKGVsLCBvcHRpb25zKSB7XG4gIHZhciBjYWNoZWQgPSBmaW5kKGVsKTtcbiAgaWYgKGNhY2hlZCkge1xuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cblxuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBwYXJlbnQgPSBvLmFwcGVuZFRvIHx8IGRvYy5ib2R5O1xuICB2YXIgcmVuZGVyID0gby5yZW5kZXIgfHwgZGVmYXVsdFJlbmRlcmVyO1xuICB2YXIgZ2V0VGV4dCA9IG8uZ2V0VGV4dCB8fCBkZWZhdWx0R2V0VGV4dDtcbiAgdmFyIGdldFZhbHVlID0gby5nZXRWYWx1ZSB8fCBkZWZhdWx0R2V0VmFsdWU7XG4gIHZhciBnZXRTZWxlY3Rpb24gPSBvLmdldFNlbGVjdGlvbiB8fCB3aW4uZ2V0U2VsZWN0aW9uO1xuICB2YXIgZm9ybSA9IG8uZm9ybTtcbiAgdmFyIGxpbWl0ID0gdHlwZW9mIG8ubGltaXQgPT09ICdudW1iZXInID8gby5saW1pdCA6IEluZmluaXR5O1xuICB2YXIgc3VnZ2VzdGlvbnMgPSBvLnN1Z2dlc3Rpb25zO1xuICB2YXIgdXNlckZpbHRlciA9IG8uZmlsdGVyIHx8IGRlZmF1bHRGaWx0ZXI7XG4gIHZhciB1c2VyU2V0ID0gby5zZXQgfHwgZGVmYXVsdFNldHRlcjtcbiAgdmFyIHVsID0gdGFnKCd1bCcsICdzZXktbGlzdCcpO1xuICB2YXIgc2VsZWN0aW9uID0gbnVsbDtcbiAgdmFyIG9uZWxvYWQgPSBvbmNlKGxvYWRpbmcpO1xuICB2YXIgZXllO1xuICB2YXIgZGVmZXJyZWRGaWx0ZXJpbmcgPSBkZWZlcihmaWx0ZXJpbmcpO1xuICB2YXIgYXR0YWNobWVudCA9IGVsO1xuICB2YXIgZWRpdG9yID0gby5lZGl0b3I7XG4gIHZhciB0ZXh0SW5wdXQ7XG4gIHZhciBhbnlJbnB1dDtcbiAgdmFyIGNhY2hlZENodW5rcztcbiAgdmFyIGNhY2hlZE5lZWRsZTtcbiAgdmFyIHJhbmNob3JsZWZ0O1xuICB2YXIgcmFuY2hvcnJpZ2h0O1xuXG4gIGlmIChvLmF1dG9IaWRlT25CbHVyID09PSB2b2lkIDApIHsgby5hdXRvSGlkZU9uQmx1ciA9IHRydWU7IH1cbiAgaWYgKG8uYXV0b0hpZGVPbkNsaWNrID09PSB2b2lkIDApIHsgby5hdXRvSGlkZU9uQ2xpY2sgPSB0cnVlOyB9XG4gIGlmIChvLmF1dG9TaG93T25VcERvd24gPT09IHZvaWQgMCkgeyBvLmF1dG9TaG93T25VcERvd24gPSBlbC50YWdOYW1lID09PSAnSU5QVVQnOyB9XG4gIGlmIChvLmFuY2hvcikge1xuICAgIHJhbmNob3JsZWZ0ID0gbmV3IFJlZ0V4cCgnXicgKyBvLmFuY2hvcik7XG4gICAgcmFuY2hvcnJpZ2h0ID0gbmV3IFJlZ0V4cChvLmFuY2hvciArICckJyk7XG4gIH1cblxuICB2YXIgYXBpID0ge1xuICAgIGFkZDogYWRkLFxuICAgIGNsZWFyOiBjbGVhcixcbiAgICBzaG93OiBzaG93LFxuICAgIGhpZGU6IGhpZGUsXG4gICAgdG9nZ2xlOiB0b2dnbGUsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICByZWZyZXNoUG9zaXRpb246IHJlZnJlc2hQb3NpdGlvbixcbiAgICBkZWZhdWx0UmVuZGVyZXI6IGRlZmF1bHRSZW5kZXJlcixcbiAgICBkZWZhdWx0R2V0VGV4dDogZGVmYXVsdEdldFRleHQsXG4gICAgZGVmYXVsdEdldFZhbHVlOiBkZWZhdWx0R2V0VmFsdWUsXG4gICAgZGVmYXVsdFNldHRlcjogZGVmYXVsdFNldHRlcixcbiAgICBkZWZhdWx0RmlsdGVyOiBkZWZhdWx0RmlsdGVyLFxuICAgIHJldGFyZ2V0OiByZXRhcmdldCxcbiAgICBhdHRhY2htZW50OiBhdHRhY2htZW50LFxuICAgIGxpc3Q6IHVsLFxuICAgIHN1Z2dlc3Rpb25zOiBbXVxuICB9O1xuICB2YXIgZW50cnkgPSB7IGVsOiBlbCwgYXBpOiBhcGkgfTtcblxuICByZXRhcmdldChlbCk7XG4gIGNhY2hlLnB1c2goZW50cnkpO1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQodWwpO1xuICBlbC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdvZmYnKTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShzdWdnZXN0aW9ucykpIHtcbiAgICBsb2FkZWQoc3VnZ2VzdGlvbnMpO1xuICB9XG5cbiAgcmV0dXJuIGFwaTtcblxuICBmdW5jdGlvbiByZXRhcmdldCAoZWwpIHtcbiAgICBpbnB1dEV2ZW50cyh0cnVlKTtcbiAgICBhdHRhY2htZW50ID0gYXBpLmF0dGFjaG1lbnQgPSBlbDtcbiAgICB0ZXh0SW5wdXQgPSBhdHRhY2htZW50LnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgYXR0YWNobWVudC50YWdOYW1lID09PSAnVEVYVEFSRUEnO1xuICAgIGFueUlucHV0ID0gdGV4dElucHV0IHx8IGlzRWRpdGFibGUoYXR0YWNobWVudCk7XG4gICAgaW5wdXRFdmVudHMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZnJlc2hQb3NpdGlvbiAoKSB7XG4gICAgaWYgKGV5ZSkgeyBleWUucmVmcmVzaCgpOyB9XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkaW5nICgpIHtcbiAgICBjcm9zc3ZlbnQucmVtb3ZlKGF0dGFjaG1lbnQsICdmb2N1cycsIG9uZWxvYWQpO1xuICAgIHN1Z2dlc3Rpb25zKGxvYWRlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkZWQgKHN1Z2dlc3Rpb25zKSB7XG4gICAgc3VnZ2VzdGlvbnMuZm9yRWFjaChhZGQpO1xuICAgIGFwaS5zdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgIHdoaWxlICh1bC5sYXN0Q2hpbGQpIHtcbiAgICAgIHVsLnJlbW92ZUNoaWxkKHVsLmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkIChzdWdnZXN0aW9uKSB7XG4gICAgdmFyIGxpID0gdGFnKCdsaScsICdzZXktaXRlbScpO1xuICAgIHJlbmRlcihsaSwgc3VnZ2VzdGlvbik7XG4gICAgY3Jvc3N2ZW50LmFkZChsaSwgJ2NsaWNrJywgY2xpY2tlZFN1Z2dlc3Rpb24pO1xuICAgIGNyb3NzdmVudC5hZGQobGksICdob3JzZXktZmlsdGVyJywgZmlsdGVySXRlbSk7XG4gICAgY3Jvc3N2ZW50LmFkZChsaSwgJ2hvcnNleS1oaWRlJywgaGlkZUl0ZW0pO1xuICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgICBhcGkuc3VnZ2VzdGlvbnMucHVzaChzdWdnZXN0aW9uKTtcbiAgICByZXR1cm4gbGk7XG5cbiAgICBmdW5jdGlvbiBjbGlja2VkU3VnZ2VzdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShzdWdnZXN0aW9uKTtcbiAgICAgIHNldCh2YWx1ZSk7XG4gICAgICBoaWRlKCk7XG4gICAgICBhdHRhY2htZW50LmZvY3VzKCk7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGF0dGFjaG1lbnQsICdob3JzZXktc2VsZWN0ZWQnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVySXRlbSAoKSB7XG4gICAgICB2YXIgdmFsdWUgPSB0ZXh0SW5wdXQgPyBlbC52YWx1ZSA6IGVsLmlubmVySFRNTDtcbiAgICAgIGlmIChmaWx0ZXIodmFsdWUsIHN1Z2dlc3Rpb24pKSB7XG4gICAgICAgIGxpLmNsYXNzTmFtZSA9IGxpLmNsYXNzTmFtZS5yZXBsYWNlKC8gc2V5LWhpZGUvZywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShsaSwgJ2hvcnNleS1oaWRlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZUl0ZW0gKCkge1xuICAgICAgaWYgKCFoaWRkZW4obGkpKSB7XG4gICAgICAgIGxpLmNsYXNzTmFtZSArPSAnIHNleS1oaWRlJztcbiAgICAgICAgaWYgKHNlbGVjdGlvbiA9PT0gbGkpIHtcbiAgICAgICAgICB1bnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0ICh2YWx1ZSkge1xuICAgIGlmIChvLmFuY2hvcikge1xuICAgICAgcmV0dXJuIChpc1RleHQoKSA/IGFwcGVuZFRleHQgOiBhcHBlbmRIVE1MKSh2YWx1ZSk7XG4gICAgfVxuICAgIHVzZXJTZXQodmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyICh2YWx1ZSwgc3VnZ2VzdGlvbikge1xuICAgIGlmIChvLmFuY2hvcikge1xuICAgICAgcmV0dXJuIChpc1RleHQoKSA/IGZpbHRlckFuY2hvcmVkVGV4dCA6IGZpbHRlckFuY2hvcmVkSFRNTCkodmFsdWUsIHN1Z2dlc3Rpb24pO1xuICAgIH1cbiAgICByZXR1cm4gdXNlckZpbHRlcih2YWx1ZSwgc3VnZ2VzdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBpc1RleHQgKCkgeyByZXR1cm4gIWVkaXRvciB8fCBpc0lucHV0KGF0dGFjaG1lbnQpO31cbiAgZnVuY3Rpb24gdmlzaWJsZSAoKSB7IHJldHVybiB1bC5jbGFzc05hbWUuaW5kZXhPZignc2V5LXNob3cnKSAhPT0gLTE7IH1cbiAgZnVuY3Rpb24gaGlkZGVuIChsaSkgeyByZXR1cm4gbGkuY2xhc3NOYW1lLmluZGV4T2YoJ3NleS1oaWRlJykgIT09IC0xOyB9XG5cbiAgZnVuY3Rpb24gc2hvdyAoKSB7XG4gICAgaWYgKCF2aXNpYmxlKCkpIHtcbiAgICAgIHVsLmNsYXNzTmFtZSArPSAnIHNleS1zaG93JztcbiAgICAgIGV5ZS5yZWZyZXNoKCk7XG4gICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGF0dGFjaG1lbnQsICdob3JzZXktc2hvdycpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZXIgKGUpIHtcbiAgICB2YXIgbGVmdCA9IGUud2hpY2ggPT09IDEgJiYgIWUubWV0YUtleSAmJiAhZS5jdHJsS2V5O1xuICAgIGlmIChsZWZ0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuOyAvLyB3ZSBvbmx5IGNhcmUgYWJvdXQgaG9uZXN0IHRvIGdvZCBsZWZ0LWNsaWNrc1xuICAgIH1cbiAgICB0b2dnbGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZSAoKSB7XG4gICAgaWYgKCF2aXNpYmxlKCkpIHtcbiAgICAgIHNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdCAoc3VnZ2VzdGlvbikge1xuICAgIHVuc2VsZWN0KCk7XG4gICAgaWYgKHN1Z2dlc3Rpb24pIHtcbiAgICAgIHNlbGVjdGlvbiA9IHN1Z2dlc3Rpb247XG4gICAgICBzZWxlY3Rpb24uY2xhc3NOYW1lICs9ICcgc2V5LXNlbGVjdGVkJztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bnNlbGVjdCAoKSB7XG4gICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgc2VsZWN0aW9uLmNsYXNzTmFtZSA9IHNlbGVjdGlvbi5jbGFzc05hbWUucmVwbGFjZSgvIHNleS1zZWxlY3RlZC9nLCAnJyk7XG4gICAgICBzZWxlY3Rpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUgKHVwLCBtb3Zlcykge1xuICAgIHZhciB0b3RhbCA9IHVsLmNoaWxkcmVuLmxlbmd0aDtcbiAgICBpZiAodG90YWwgPCBtb3Zlcykge1xuICAgICAgdW5zZWxlY3QoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRvdGFsID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBmaXJzdCA9IHVwID8gJ2xhc3RDaGlsZCcgOiAnZmlyc3RDaGlsZCc7XG4gICAgdmFyIG5leHQgPSB1cCA/ICdwcmV2aW91c1NpYmxpbmcnIDogJ25leHRTaWJsaW5nJztcbiAgICB2YXIgc3VnZ2VzdGlvbiA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb25bbmV4dF0gfHwgdWxbZmlyc3RdO1xuXG4gICAgc2VsZWN0KHN1Z2dlc3Rpb24pO1xuXG4gICAgaWYgKGhpZGRlbihzdWdnZXN0aW9uKSkge1xuICAgICAgbW92ZSh1cCwgbW92ZXMgPyBtb3ZlcyArIDEgOiAxKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlICgpIHtcbiAgICBleWUuc2xlZXAoKTtcbiAgICB1bC5jbGFzc05hbWUgPSB1bC5jbGFzc05hbWUucmVwbGFjZSgvIHNleS1zaG93L2csICcnKTtcbiAgICB1bnNlbGVjdCgpO1xuICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoYXR0YWNobWVudCwgJ2hvcnNleS1oaWRlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBrZXlkb3duIChlKSB7XG4gICAgdmFyIHNob3duID0gdmlzaWJsZSgpO1xuICAgIHZhciB3aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmICh3aGljaCA9PT0gS0VZX0RPV04pIHtcbiAgICAgIGlmIChhbnlJbnB1dCAmJiBvLmF1dG9TaG93T25VcERvd24pIHtcbiAgICAgICAgc2hvdygpO1xuICAgICAgfVxuICAgICAgaWYgKHNob3duKSB7XG4gICAgICAgIG1vdmUoKTtcbiAgICAgICAgc3RvcChlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHdoaWNoID09PSBLRVlfVVApIHtcbiAgICAgIGlmIChhbnlJbnB1dCAmJiBvLmF1dG9TaG93T25VcERvd24pIHtcbiAgICAgICAgc2hvdygpO1xuICAgICAgfVxuICAgICAgaWYgKHNob3duKSB7XG4gICAgICAgIG1vdmUodHJ1ZSk7XG4gICAgICAgIHN0b3AoZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzaG93bikge1xuICAgICAgaWYgKHdoaWNoID09PSBLRVlfRU5URVIpIHtcbiAgICAgICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUoc2VsZWN0aW9uLCAnY2xpY2snKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RvcChlKTtcbiAgICAgIH0gZWxzZSBpZiAod2hpY2ggPT09IEtFWV9FU0MpIHtcbiAgICAgICAgaGlkZSgpO1xuICAgICAgICBzdG9wKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AgKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlcmluZyAoKSB7XG4gICAgaWYgKCF2aXNpYmxlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY3Jvc3N2ZW50LmZhYnJpY2F0ZShhdHRhY2htZW50LCAnaG9yc2V5LWZpbHRlcicpO1xuICAgIHZhciBsaSA9IHVsLmZpcnN0Q2hpbGQ7XG4gICAgdmFyIGNvdW50ID0gMDtcbiAgICB3aGlsZSAobGkpIHtcbiAgICAgIGlmIChjb3VudCA+PSBsaW1pdCkge1xuICAgICAgICBjcm9zc3ZlbnQuZmFicmljYXRlKGxpLCAnaG9yc2V5LWhpZGUnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb3VudCA8IGxpbWl0KSB7XG4gICAgICAgIGNyb3NzdmVudC5mYWJyaWNhdGUobGksICdob3JzZXktZmlsdGVyJyk7XG4gICAgICAgIGlmIChsaS5jbGFzc05hbWUuaW5kZXhPZignc2V5LWhpZGUnKSA9PT0gLTEpIHtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaSA9IGxpLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGlvbikge1xuICAgICAgbW92ZSgpO1xuICAgIH1cbiAgICBpZiAoIXNlbGVjdGlvbikge1xuICAgICAgaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmVycmVkRmlsdGVyaW5nTm9FbnRlciAoZSkge1xuICAgIHZhciB3aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGlmICh3aGljaCA9PT0gS0VZX0VOVEVSKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlZmVycmVkRmlsdGVyaW5nKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWZlcnJlZFNob3cgKGUpIHtcbiAgICB2YXIgd2hpY2ggPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcbiAgICBpZiAod2hpY2ggPT09IEtFWV9FTlRFUikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KHNob3csIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gaG9yc2V5RXZlbnRUYXJnZXQgKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldCA9PT0gYXR0YWNobWVudCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHdoaWxlICh0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVsIHx8IHRhcmdldCA9PT0gYXR0YWNobWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVPbkJsdXIgKGUpIHtcbiAgICBpZiAoaG9yc2V5RXZlbnRUYXJnZXQoZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZU9uQ2xpY2sgKGUpIHtcbiAgICBpZiAoaG9yc2V5RXZlbnRUYXJnZXQoZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5wdXRFdmVudHMgKHJlbW92ZSkge1xuICAgIHZhciBvcCA9IHJlbW92ZSA/ICdyZW1vdmUnIDogJ2FkZCc7XG4gICAgaWYgKGV5ZSkge1xuICAgICAgZXllLmRlc3Ryb3koKTtcbiAgICAgIGV5ZSA9IG51bGw7XG4gICAgfVxuICAgIGlmICghcmVtb3ZlKSB7XG4gICAgICBleWUgPSBidWxsc2V5ZSh1bCwgYXR0YWNobWVudCwgeyBjYXJldDogYW55SW5wdXQgJiYgYXR0YWNobWVudC50YWdOYW1lICE9PSAnSU5QVVQnLCBnZXRTZWxlY3Rpb246IGdldFNlbGVjdGlvbiB9KTtcbiAgICAgIGlmICghdmlzaWJsZSgpKSB7IGV5ZS5zbGVlcCgpOyB9XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3VnZ2VzdGlvbnMgPT09ICdmdW5jdGlvbicgJiYgIW9uZWxvYWQudXNlZCkge1xuICAgICAgaWYgKHJlbW92ZSB8fCAoYW55SW5wdXQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQgIT09IGF0dGFjaG1lbnQpKSB7XG4gICAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ2ZvY3VzJywgb25lbG9hZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlZGl0b3IpIHtcbiAgICAgIGNyb3NzdmVudFtvcF0oZWRpdG9yLmVkaXRhYmxlLCAnaG9yc2V5LWZpbHRlcicsIGdldENodW5rc0ZvckZpbHRlcnMpO1xuICAgIH1cbiAgICBpZiAoYW55SW5wdXQpIHtcbiAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ2tleXByZXNzJywgZGVmZXJyZWRTaG93KTtcbiAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ2tleXByZXNzJywgZGVmZXJyZWRGaWx0ZXJpbmcpO1xuICAgICAgY3Jvc3N2ZW50W29wXShhdHRhY2htZW50LCAna2V5ZG93bicsIGRlZmVycmVkRmlsdGVyaW5nTm9FbnRlcik7XG4gICAgICBjcm9zc3ZlbnRbb3BdKGF0dGFjaG1lbnQsICdwYXN0ZScsIGRlZmVycmVkRmlsdGVyaW5nKTtcbiAgICAgIGNyb3NzdmVudFtvcF0oYXR0YWNobWVudCwgJ2tleWRvd24nLCBrZXlkb3duKTtcbiAgICAgIGlmIChvLmF1dG9IaWRlT25CbHVyKSB7IGNyb3NzdmVudFtvcF0oZG9jRWxlbWVudCwgJ2ZvY3VzJywgaGlkZU9uQmx1ciwgdHJ1ZSk7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgY3Jvc3N2ZW50W29wXShhdHRhY2htZW50LCAnY2xpY2snLCB0b2dnbGVyKTtcbiAgICAgIGNyb3NzdmVudFtvcF0oZG9jRWxlbWVudCwgJ2tleWRvd24nLCBrZXlkb3duKTtcbiAgICB9XG4gICAgaWYgKG8uYXV0b0hpZGVPbkNsaWNrKSB7IGNyb3NzdmVudFtvcF0oZG9jLCAnY2xpY2snLCBoaWRlT25DbGljayk7IH1cbiAgICBpZiAoZm9ybSkgeyBjcm9zc3ZlbnRbb3BdKGZvcm0sICdzdWJtaXQnLCBoaWRlKTsgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgaW5wdXRFdmVudHModHJ1ZSk7XG4gICAgaWYgKHBhcmVudC5jb250YWlucyh1bCkpIHsgcGFyZW50LnJlbW92ZUNoaWxkKHVsKTsgfVxuICAgIGNhY2hlLnNwbGljZShjYWNoZS5pbmRleE9mKGVudHJ5KSwgMSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWZhdWx0U2V0dGVyICh2YWx1ZSkge1xuICAgIGlmICh0ZXh0SW5wdXQpIHtcbiAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmF1bHRSZW5kZXJlciAobGksIHN1Z2dlc3Rpb24pIHtcbiAgICBsaS5pbm5lclRleHQgPSBsaS50ZXh0Q29udGVudCA9IGdldFRleHQoc3VnZ2VzdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBkZWZhdWx0RmlsdGVyIChxLCBzdWdnZXN0aW9uKSB7XG4gICAgdmFyIHRleHQgPSBnZXRUZXh0KHN1Z2dlc3Rpb24pIHx8ICcnO1xuICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKHN1Z2dlc3Rpb24pIHx8ICcnO1xuICAgIHJldHVybiBmdXp6eXNlYXJjaChxLCB0ZXh0LnRvTG93ZXJDYXNlKCkpIHx8IGZ1enp5c2VhcmNoKHEsIHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9vcGJhY2tUb0FuY2hvciAodGV4dCwgcCkge1xuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgYW5jaG9yZWQgPSBmYWxzZTtcbiAgICB2YXIgc3RhcnQgPSBwLnN0YXJ0O1xuICAgIHdoaWxlIChhbmNob3JlZCA9PT0gZmFsc2UgJiYgc3RhcnQgPj0gMCkge1xuICAgICAgcmVzdWx0ID0gdGV4dC5zdWJzdHIoc3RhcnQgLSAxLCBwLnN0YXJ0IC0gc3RhcnQgKyAxKTtcbiAgICAgIGFuY2hvcmVkID0gcmFuY2hvcmxlZnQudGVzdChyZXN1bHQpO1xuICAgICAgc3RhcnQtLTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHRleHQ6IGFuY2hvcmVkID8gcmVzdWx0IDogbnVsbCxcbiAgICAgIHN0YXJ0OiBzdGFydFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDaHVua3NGb3JGaWx0ZXJzICgpIHtcbiAgICBlZGl0b3IucnVuQ29tbWFuZChmdW5jdGlvbiBnb3RDb250ZXh0IChjaHVua3MpIHtcbiAgICAgIHZhciB0ZXh0ID0gY2h1bmtzLmJlZm9yZSArIGNodW5rcy5zZWxlY3Rpb247XG4gICAgICB2YXIgYW5jaG9yZWQgPSBmYWxzZTtcbiAgICAgIHZhciBzdGFydCA9IHRleHQubGVuZ3RoO1xuICAgICAgd2hpbGUgKGFuY2hvcmVkID09PSBmYWxzZSAmJiBzdGFydCA+PSAwKSB7XG4gICAgICAgIGNhY2hlZE5lZWRsZSA9IHRleHQuc3Vic3RyKHN0YXJ0IC0gMSwgdGV4dC5sZW5ndGggLSBzdGFydCArIDEpO1xuICAgICAgICBhbmNob3JlZCA9IHJhbmNob3JsZWZ0LnRlc3QoY2FjaGVkTmVlZGxlKTtcbiAgICAgICAgc3RhcnQtLTtcbiAgICAgIH1cbiAgICAgIGlmIChhbmNob3JlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY2FjaGVkTmVlZGxlID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNhY2hlZENodW5rcyA9IGNodW5rcztcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlckFuY2hvcmVkVGV4dCAocSwgc3VnZ2VzdGlvbikge1xuICAgIHZhciBwb3NpdGlvbiA9IHNlbGwoZWwpO1xuICAgIHZhciBpbnB1dCA9IGxvb3BiYWNrVG9BbmNob3IocSwgcG9zaXRpb24pLnRleHQ7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICByZXR1cm4gdXNlckZpbHRlcihpbnB1dCwgc3VnZ2VzdGlvbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyQW5jaG9yZWRIVE1MIChxLCBzdWdnZXN0aW9uKSB7XG4gICAgaWYgKGNhY2hlZE5lZWRsZSkge1xuICAgICAgcmV0dXJuIHVzZXJGaWx0ZXIoY2FjaGVkTmVlZGxlLCBzdWdnZXN0aW9uKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbnRpdGl6ZSAodmFsdWUpIHtcbiAgICBpZiAoZWRpdG9yICYmIGVkaXRvci5tb2RlICE9PSAnbWFya2Rvd24nKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLnBhcnNlTWFya2Rvd24odmFsdWUpLnJlcGxhY2UocnBhcmFncmFwaCwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBlbmRUZXh0ICh2YWx1ZSkge1xuICAgIHZhciBlbnRpdHkgPSBlbnRpdGl6ZSh2YWx1ZSk7XG4gICAgdmFyIGN1cnJlbnQgPSBlbC52YWx1ZTtcbiAgICB2YXIgcG9zaXRpb24gPSBzZWxsKGVsKTtcbiAgICB2YXIgaW5wdXQgPSBsb29wYmFja1RvQW5jaG9yKGN1cnJlbnQsIHBvc2l0aW9uKTtcbiAgICB2YXIgbGVmdCA9IGN1cnJlbnQuc3Vic3RyKDAsIGlucHV0LnN0YXJ0KTtcbiAgICB2YXIgcmlnaHQgPSBjdXJyZW50LnN1YnN0cihpbnB1dC5zdGFydCArIGlucHV0LnRleHQubGVuZ3RoICsgKHBvc2l0aW9uLmVuZCAtIHBvc2l0aW9uLnN0YXJ0KSk7XG4gICAgdmFyIGJlZm9yZSA9IGxlZnQgKyBlbnRpdHkgKyAnICc7XG5cbiAgICBlbC52YWx1ZSA9IGJlZm9yZSArIHJpZ2h0O1xuICAgIHNlbGwoZWwsIHtcbiAgICAgIHN0YXJ0OiBiZWZvcmUubGVuZ3RoLCBlbmQ6IGJlZm9yZS5sZW5ndGhcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGVuZEhUTUwgKHZhbHVlKSB7XG4gICAgZWRpdG9yLnJ1bkNvbW1hbmQoc2V0RW50aXR5KTtcbiAgICBmdW5jdGlvbiBzZXRFbnRpdHkgKGNodW5rcykge1xuICAgICAgdmFyIGVudGl0eSA9IGVudGl0aXplKHZhbHVlKTtcbiAgICAgIHZhciBsZWZ0ID0gY2FjaGVkQ2h1bmtzLmJlZm9yZTtcbiAgICAgIHZhciBsZW4gPSBsZWZ0Lmxlbmd0aCAtIDE7XG4gICAgICB3aGlsZSAobGVuID4gMCAmJiAhcmFuY2hvcnJpZ2h0LnRlc3QobGVmdCkpIHtcbiAgICAgICAgbGVmdCA9IGxlZnQuc3Vic3RyKDAsIC0tbGVuKTtcbiAgICAgIH1cbiAgICAgIGNodW5rcy5iZWZvcmUgPSBsZWZ0LnN1YnN0cigwLCBsZW4pICsgZW50aXR5ICsgJyZuYnNwOyc7XG4gICAgICBjaHVua3MuYWZ0ZXIgPSBjYWNoZWRDaHVua3Muc2VsZWN0aW9uICsgY2FjaGVkQ2h1bmtzLmFmdGVyO1xuICAgICAgY2h1bmtzLnNlbGVjdGlvbiA9ICcnO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc0lucHV0IChlbCkgeyByZXR1cm4gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCBlbC50YWdOYW1lID09PSAnVEVYVEFSRUEnOyB9XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXRWYWx1ZSAoc3VnZ2VzdGlvbikge1xuICByZXR1cm4gdHlwZW9mIHN1Z2dlc3Rpb24gPT09ICdzdHJpbmcnID8gc3VnZ2VzdGlvbiA6IHN1Z2dlc3Rpb24udmFsdWU7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXRUZXh0IChzdWdnZXN0aW9uKSB7XG4gIHJldHVybiB0eXBlb2Ygc3VnZ2VzdGlvbiA9PT0gJ3N0cmluZycgPyBzdWdnZXN0aW9uIDogc3VnZ2VzdGlvbi50ZXh0O1xufVxuXG5mdW5jdGlvbiB0YWcgKHR5cGUsIGNsYXNzTmFtZSkge1xuICB2YXIgZWwgPSBkb2MuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICByZXR1cm4gZWw7XG59XG5cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBkaXNwb3NlZDtcbiAgZnVuY3Rpb24gZGlzcG9zYWJsZSAoKSB7XG4gICAgaWYgKGRpc3Bvc2VkKSB7IHJldHVybjsgfVxuICAgIGRpc3Bvc2FibGUudXNlZCA9IGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAoZm4gfHwgbm9vcCkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgfVxuICByZXR1cm4gZGlzcG9zYWJsZTtcbn1cbmZ1bmN0aW9uIGRlZmVyIChmbikgeyByZXR1cm4gZnVuY3Rpb24gKCkgeyBzZXRUaW1lb3V0KGZuLCAwKTsgfTsgfVxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG5mdW5jdGlvbiBpc0VkaXRhYmxlIChlbCkge1xuICB2YXIgdmFsdWUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnRFZGl0YWJsZScpO1xuICBpZiAodmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZWwucGFyZW50RWxlbWVudCkge1xuICAgIHJldHVybiBpc0VkaXRhYmxlKGVsLnBhcmVudEVsZW1lbnQpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuaG9yc2V5LmZpbmQgPSBmaW5kO1xubW9kdWxlLmV4cG9ydHMgPSBob3JzZXk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1odmNuTmxlUzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhObGJHd2dQU0J5WlhGMWFYSmxLQ2R6Wld4c0p5azdYRzUyWVhJZ1kzSnZjM04yWlc1MElEMGdjbVZ4ZFdseVpTZ25ZM0p2YzNOMlpXNTBKeWs3WEc1MllYSWdZblZzYkhObGVXVWdQU0J5WlhGMWFYSmxLQ2RpZFd4c2MyVjVaU2NwTzF4dWRtRnlJR1oxZW5wNWMyVmhjbU5vSUQwZ2NtVnhkV2x5WlNnblpuVjZlbmx6WldGeVkyZ25LVHRjYm5aaGNpQkxSVmxmUlU1VVJWSWdQU0F4TXp0Y2JuWmhjaUJMUlZsZlJWTkRJRDBnTWpjN1hHNTJZWElnUzBWWlgxVlFJRDBnTXpnN1hHNTJZWElnUzBWWlgwUlBWMDRnUFNBME1EdGNiblpoY2lCallXTm9aU0E5SUZ0ZE8xeHVkbUZ5SUdSdll5QTlJR1J2WTNWdFpXNTBPMXh1ZG1GeUlHUnZZMFZzWlcxbGJuUWdQU0JrYjJNdVpHOWpkVzFsYm5SRmJHVnRaVzUwTzF4dWRtRnlJSGRwYmlBOUlHZHNiMkpoYkR0Y2JuWmhjaUJ5Y0dGeVlXZHlZWEJvSUQwZ0wxNDhjRDU4UEZ4Y0wzQStYRnh1UHlRdlp6dGNibHh1Wm5WdVkzUnBiMjRnWm1sdVpDQW9aV3dwSUh0Y2JpQWdkbUZ5SUdWdWRISjVPMXh1SUNCMllYSWdhVHRjYmlBZ1ptOXlJQ2hwSUQwZ01Ec2dhU0E4SUdOaFkyaGxMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnWlc1MGNua2dQU0JqWVdOb1pWdHBYVHRjYmlBZ0lDQnBaaUFvWlc1MGNua3VaV3dnUFQwOUlHVnNLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdaVzUwY25rdVlYQnBPMXh1SUNBZ0lIMWNiaUFnZlZ4dUlDQnlaWFIxY200Z2JuVnNiRHRjYm4xY2JseHVablZ1WTNScGIyNGdhRzl5YzJWNUlDaGxiQ3dnYjNCMGFXOXVjeWtnZTF4dUlDQjJZWElnWTJGamFHVmtJRDBnWm1sdVpDaGxiQ2s3WEc0Z0lHbG1JQ2hqWVdOb1pXUXBJSHRjYmlBZ0lDQnlaWFIxY200Z1kyRmphR1ZrTzF4dUlDQjlYRzVjYmlBZ2RtRnlJRzhnUFNCdmNIUnBiMjV6SUh4OElIdDlPMXh1SUNCMllYSWdjR0Z5Wlc1MElEMGdieTVoY0hCbGJtUlVieUI4ZkNCa2IyTXVZbTlrZVR0Y2JpQWdkbUZ5SUhKbGJtUmxjaUE5SUc4dWNtVnVaR1Z5SUh4OElHUmxabUYxYkhSU1pXNWtaWEpsY2p0Y2JpQWdkbUZ5SUdkbGRGUmxlSFFnUFNCdkxtZGxkRlJsZUhRZ2ZId2daR1ZtWVhWc2RFZGxkRlJsZUhRN1hHNGdJSFpoY2lCblpYUldZV3gxWlNBOUlHOHVaMlYwVm1Gc2RXVWdmSHdnWkdWbVlYVnNkRWRsZEZaaGJIVmxPMXh1SUNCMllYSWdaMlYwVTJWc1pXTjBhVzl1SUQwZ2J5NW5aWFJUWld4bFkzUnBiMjRnZkh3Z2QybHVMbWRsZEZObGJHVmpkR2x2Ymp0Y2JpQWdkbUZ5SUdadmNtMGdQU0J2TG1admNtMDdYRzRnSUhaaGNpQnNhVzFwZENBOUlIUjVjR1Z2WmlCdkxteHBiV2wwSUQwOVBTQW5iblZ0WW1WeUp5QS9JRzh1YkdsdGFYUWdPaUJKYm1acGJtbDBlVHRjYmlBZ2RtRnlJSE4xWjJkbGMzUnBiMjV6SUQwZ2J5NXpkV2RuWlhOMGFXOXVjenRjYmlBZ2RtRnlJSFZ6WlhKR2FXeDBaWElnUFNCdkxtWnBiSFJsY2lCOGZDQmtaV1poZFd4MFJtbHNkR1Z5TzF4dUlDQjJZWElnZFhObGNsTmxkQ0E5SUc4dWMyVjBJSHg4SUdSbFptRjFiSFJUWlhSMFpYSTdYRzRnSUhaaGNpQjFiQ0E5SUhSaFp5Z25kV3duTENBbmMyVjVMV3hwYzNRbktUdGNiaUFnZG1GeUlITmxiR1ZqZEdsdmJpQTlJRzUxYkd3N1hHNGdJSFpoY2lCdmJtVnNiMkZrSUQwZ2IyNWpaU2hzYjJGa2FXNW5LVHRjYmlBZ2RtRnlJR1Y1WlR0Y2JpQWdkbUZ5SUdSbFptVnljbVZrUm1sc2RHVnlhVzVuSUQwZ1pHVm1aWElvWm1sc2RHVnlhVzVuS1R0Y2JpQWdkbUZ5SUdGMGRHRmphRzFsYm5RZ1BTQmxiRHRjYmlBZ2RtRnlJR1ZrYVhSdmNpQTlJRzh1WldScGRHOXlPMXh1SUNCMllYSWdkR1Y0ZEVsdWNIVjBPMXh1SUNCMllYSWdZVzU1U1c1d2RYUTdYRzRnSUhaaGNpQmpZV05vWldSRGFIVnVhM003WEc0Z0lIWmhjaUJqWVdOb1pXUk9aV1ZrYkdVN1hHNGdJSFpoY2lCeVlXNWphRzl5YkdWbWREdGNiaUFnZG1GeUlISmhibU5vYjNKeWFXZG9kRHRjYmx4dUlDQnBaaUFvYnk1aGRYUnZTR2xrWlU5dVFteDFjaUE5UFQwZ2RtOXBaQ0F3S1NCN0lHOHVZWFYwYjBocFpHVlBia0pzZFhJZ1BTQjBjblZsT3lCOVhHNGdJR2xtSUNodkxtRjFkRzlJYVdSbFQyNURiR2xqYXlBOVBUMGdkbTlwWkNBd0tTQjdJRzh1WVhWMGIwaHBaR1ZQYmtOc2FXTnJJRDBnZEhKMVpUc2dmVnh1SUNCcFppQW9ieTVoZFhSdlUyaHZkMDl1VlhCRWIzZHVJRDA5UFNCMmIybGtJREFwSUhzZ2J5NWhkWFJ2VTJodmQwOXVWWEJFYjNkdUlEMGdaV3d1ZEdGblRtRnRaU0E5UFQwZ0owbE9VRlZVSnpzZ2ZWeHVJQ0JwWmlBb2J5NWhibU5vYjNJcElIdGNiaUFnSUNCeVlXNWphRzl5YkdWbWRDQTlJRzVsZHlCU1pXZEZlSEFvSjE0bklDc2dieTVoYm1Ob2IzSXBPMXh1SUNBZ0lISmhibU5vYjNKeWFXZG9kQ0E5SUc1bGR5QlNaV2RGZUhBb2J5NWhibU5vYjNJZ0t5QW5KQ2NwTzF4dUlDQjlYRzVjYmlBZ2RtRnlJR0Z3YVNBOUlIdGNiaUFnSUNCaFpHUTZJR0ZrWkN4Y2JpQWdJQ0JqYkdWaGNqb2dZMnhsWVhJc1hHNGdJQ0FnYzJodmR6b2djMmh2ZHl4Y2JpQWdJQ0JvYVdSbE9pQm9hV1JsTEZ4dUlDQWdJSFJ2WjJkc1pUb2dkRzluWjJ4bExGeHVJQ0FnSUdSbGMzUnliM2s2SUdSbGMzUnliM2tzWEc0Z0lDQWdjbVZtY21WemFGQnZjMmwwYVc5dU9pQnlaV1p5WlhOb1VHOXphWFJwYjI0c1hHNGdJQ0FnWkdWbVlYVnNkRkpsYm1SbGNtVnlPaUJrWldaaGRXeDBVbVZ1WkdWeVpYSXNYRzRnSUNBZ1pHVm1ZWFZzZEVkbGRGUmxlSFE2SUdSbFptRjFiSFJIWlhSVVpYaDBMRnh1SUNBZ0lHUmxabUYxYkhSSFpYUldZV3gxWlRvZ1pHVm1ZWFZzZEVkbGRGWmhiSFZsTEZ4dUlDQWdJR1JsWm1GMWJIUlRaWFIwWlhJNklHUmxabUYxYkhSVFpYUjBaWElzWEc0Z0lDQWdaR1ZtWVhWc2RFWnBiSFJsY2pvZ1pHVm1ZWFZzZEVacGJIUmxjaXhjYmlBZ0lDQnlaWFJoY21kbGREb2djbVYwWVhKblpYUXNYRzRnSUNBZ1lYUjBZV05vYldWdWREb2dZWFIwWVdOb2JXVnVkQ3hjYmlBZ0lDQnNhWE4wT2lCMWJDeGNiaUFnSUNCemRXZG5aWE4wYVc5dWN6b2dXMTFjYmlBZ2ZUdGNiaUFnZG1GeUlHVnVkSEo1SUQwZ2V5QmxiRG9nWld3c0lHRndhVG9nWVhCcElIMDdYRzVjYmlBZ2NtVjBZWEpuWlhRb1pXd3BPMXh1SUNCallXTm9aUzV3ZFhOb0tHVnVkSEo1S1R0Y2JpQWdjR0Z5Wlc1MExtRndjR1Z1WkVOb2FXeGtLSFZzS1R0Y2JpQWdaV3d1YzJWMFFYUjBjbWxpZFhSbEtDZGhkWFJ2WTI5dGNHeGxkR1VuTENBbmIyWm1KeWs3WEc1Y2JpQWdhV1lnS0VGeWNtRjVMbWx6UVhKeVlYa29jM1ZuWjJWemRHbHZibk1wS1NCN1hHNGdJQ0FnYkc5aFpHVmtLSE4xWjJkbGMzUnBiMjV6S1R0Y2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCaGNHazdYRzVjYmlBZ1puVnVZM1JwYjI0Z2NtVjBZWEpuWlhRZ0tHVnNLU0I3WEc0Z0lDQWdhVzV3ZFhSRmRtVnVkSE1vZEhKMVpTazdYRzRnSUNBZ1lYUjBZV05vYldWdWRDQTlJR0Z3YVM1aGRIUmhZMmh0Wlc1MElEMGdaV3c3WEc0Z0lDQWdkR1Y0ZEVsdWNIVjBJRDBnWVhSMFlXTm9iV1Z1ZEM1MFlXZE9ZVzFsSUQwOVBTQW5TVTVRVlZRbklIeDhJR0YwZEdGamFHMWxiblF1ZEdGblRtRnRaU0E5UFQwZ0oxUkZXRlJCVWtWQkp6dGNiaUFnSUNCaGJubEpibkIxZENBOUlIUmxlSFJKYm5CMWRDQjhmQ0JwYzBWa2FYUmhZbXhsS0dGMGRHRmphRzFsYm5RcE8xeHVJQ0FnSUdsdWNIVjBSWFpsYm5SektDazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ5WldaeVpYTm9VRzl6YVhScGIyNGdLQ2tnZTF4dUlDQWdJR2xtSUNobGVXVXBJSHNnWlhsbExuSmxabkpsYzJnb0tUc2dmVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnYkc5aFpHbHVaeUFvS1NCN1hHNGdJQ0FnWTNKdmMzTjJaVzUwTG5KbGJXOTJaU2hoZEhSaFkyaHRaVzUwTENBblptOWpkWE1uTENCdmJtVnNiMkZrS1R0Y2JpQWdJQ0J6ZFdkblpYTjBhVzl1Y3loc2IyRmtaV1FwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2JHOWhaR1ZrSUNoemRXZG5aWE4wYVc5dWN5a2dlMXh1SUNBZ0lITjFaMmRsYzNScGIyNXpMbVp2Y2tWaFkyZ29ZV1JrS1R0Y2JpQWdJQ0JoY0drdWMzVm5aMlZ6ZEdsdmJuTWdQU0J6ZFdkblpYTjBhVzl1Y3p0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHTnNaV0Z5SUNncElIdGNiaUFnSUNCM2FHbHNaU0FvZFd3dWJHRnpkRU5vYVd4a0tTQjdYRzRnSUNBZ0lDQjFiQzV5WlcxdmRtVkRhR2xzWkNoMWJDNXNZWE4wUTJocGJHUXBPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR0ZrWkNBb2MzVm5aMlZ6ZEdsdmJpa2dlMXh1SUNBZ0lIWmhjaUJzYVNBOUlIUmhaeWduYkdrbkxDQW5jMlY1TFdsMFpXMG5LVHRjYmlBZ0lDQnlaVzVrWlhJb2JHa3NJSE4xWjJkbGMzUnBiMjRwTzF4dUlDQWdJR055YjNOemRtVnVkQzVoWkdRb2JHa3NJQ2RqYkdsamF5Y3NJR05zYVdOclpXUlRkV2RuWlhOMGFXOXVLVHRjYmlBZ0lDQmpjbTl6YzNabGJuUXVZV1JrS0d4cExDQW5hRzl5YzJWNUxXWnBiSFJsY2ljc0lHWnBiSFJsY2tsMFpXMHBPMXh1SUNBZ0lHTnliM056ZG1WdWRDNWhaR1FvYkdrc0lDZG9iM0p6WlhrdGFHbGtaU2NzSUdocFpHVkpkR1Z0S1R0Y2JpQWdJQ0IxYkM1aGNIQmxibVJEYUdsc1pDaHNhU2s3WEc0Z0lDQWdZWEJwTG5OMVoyZGxjM1JwYjI1ekxuQjFjMmdvYzNWbloyVnpkR2x2YmlrN1hHNGdJQ0FnY21WMGRYSnVJR3hwTzF4dVhHNGdJQ0FnWm5WdVkzUnBiMjRnWTJ4cFkydGxaRk4xWjJkbGMzUnBiMjRnS0NrZ2UxeHVJQ0FnSUNBZ2RtRnlJSFpoYkhWbElEMGdaMlYwVm1Gc2RXVW9jM1ZuWjJWemRHbHZiaWs3WEc0Z0lDQWdJQ0J6WlhRb2RtRnNkV1VwTzF4dUlDQWdJQ0FnYUdsa1pTZ3BPMXh1SUNBZ0lDQWdZWFIwWVdOb2JXVnVkQzVtYjJOMWN5Z3BPMXh1SUNBZ0lDQWdZM0p2YzNOMlpXNTBMbVpoWW5KcFkyRjBaU2hoZEhSaFkyaHRaVzUwTENBbmFHOXljMlY1TFhObGJHVmpkR1ZrSnl3Z2RtRnNkV1VwTzF4dUlDQWdJSDFjYmx4dUlDQWdJR1oxYm1OMGFXOXVJR1pwYkhSbGNrbDBaVzBnS0NrZ2UxeHVJQ0FnSUNBZ2RtRnlJSFpoYkhWbElEMGdkR1Y0ZEVsdWNIVjBJRDhnWld3dWRtRnNkV1VnT2lCbGJDNXBibTVsY2toVVRVdzdYRzRnSUNBZ0lDQnBaaUFvWm1sc2RHVnlLSFpoYkhWbExDQnpkV2RuWlhOMGFXOXVLU2tnZTF4dUlDQWdJQ0FnSUNCc2FTNWpiR0Z6YzA1aGJXVWdQU0JzYVM1amJHRnpjMDVoYldVdWNtVndiR0ZqWlNndklITmxlUzFvYVdSbEwyY3NJQ2NuS1R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUdOeWIzTnpkbVZ1ZEM1bVlXSnlhV05oZEdVb2JHa3NJQ2RvYjNKelpYa3RhR2xrWlNjcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUdaMWJtTjBhVzl1SUdocFpHVkpkR1Z0SUNncElIdGNiaUFnSUNBZ0lHbG1JQ2doYUdsa1pHVnVLR3hwS1NrZ2UxeHVJQ0FnSUNBZ0lDQnNhUzVqYkdGemMwNWhiV1VnS3owZ0p5QnpaWGt0YUdsa1pTYzdYRzRnSUNBZ0lDQWdJR2xtSUNoelpXeGxZM1JwYjI0Z1BUMDlJR3hwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkVzV6Wld4bFkzUW9LVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhObGRDQW9kbUZzZFdVcElIdGNiaUFnSUNCcFppQW9ieTVoYm1Ob2IzSXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQW9hWE5VWlhoMEtDa2dQeUJoY0hCbGJtUlVaWGgwSURvZ1lYQndaVzVrU0ZSTlRDa29kbUZzZFdVcE8xeHVJQ0FnSUgxY2JpQWdJQ0IxYzJWeVUyVjBLSFpoYkhWbEtUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR1pwYkhSbGNpQW9kbUZzZFdVc0lITjFaMmRsYzNScGIyNHBJSHRjYmlBZ0lDQnBaaUFvYnk1aGJtTm9iM0lwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUFvYVhOVVpYaDBLQ2tnUHlCbWFXeDBaWEpCYm1Ob2IzSmxaRlJsZUhRZ09pQm1hV3gwWlhKQmJtTm9iM0psWkVoVVRVd3BLSFpoYkhWbExDQnpkV2RuWlhOMGFXOXVLVHRjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUhWelpYSkdhV3gwWlhJb2RtRnNkV1VzSUhOMVoyZGxjM1JwYjI0cE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdhWE5VWlhoMElDZ3BJSHNnY21WMGRYSnVJQ0ZsWkdsMGIzSWdmSHdnYVhOSmJuQjFkQ2hoZEhSaFkyaHRaVzUwS1R0OVhHNGdJR1oxYm1OMGFXOXVJSFpwYzJsaWJHVWdLQ2tnZXlCeVpYUjFjbTRnZFd3dVkyeGhjM05PWVcxbExtbHVaR1Y0VDJZb0ozTmxlUzF6YUc5M0p5a2dJVDA5SUMweE95QjlYRzRnSUdaMWJtTjBhVzl1SUdocFpHUmxiaUFvYkdrcElIc2djbVYwZFhKdUlHeHBMbU5zWVhOelRtRnRaUzVwYm1SbGVFOW1LQ2R6WlhrdGFHbGtaU2NwSUNFOVBTQXRNVHNnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJSE5vYjNjZ0tDa2dlMXh1SUNBZ0lHbG1JQ2doZG1semFXSnNaU2dwS1NCN1hHNGdJQ0FnSUNCMWJDNWpiR0Z6YzA1aGJXVWdLejBnSnlCelpYa3RjMmh2ZHljN1hHNGdJQ0FnSUNCbGVXVXVjbVZtY21WemFDZ3BPMXh1SUNBZ0lDQWdZM0p2YzNOMlpXNTBMbVpoWW5KcFkyRjBaU2hoZEhSaFkyaHRaVzUwTENBbmFHOXljMlY1TFhOb2IzY25LVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUIwYjJkbmJHVnlJQ2hsS1NCN1hHNGdJQ0FnZG1GeUlHeGxablFnUFNCbExuZG9hV05vSUQwOVBTQXhJQ1ltSUNGbExtMWxkR0ZMWlhrZ0ppWWdJV1V1WTNSeWJFdGxlVHRjYmlBZ0lDQnBaaUFvYkdWbWRDQTlQVDBnWm1Gc2MyVXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJqc2dMeThnZDJVZ2IyNXNlU0JqWVhKbElHRmliM1YwSUdodmJtVnpkQ0IwYnlCbmIyUWdiR1ZtZEMxamJHbGphM05jYmlBZ0lDQjlYRzRnSUNBZ2RHOW5aMnhsS0NrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQjBiMmRuYkdVZ0tDa2dlMXh1SUNBZ0lHbG1JQ2doZG1semFXSnNaU2dwS1NCN1hHNGdJQ0FnSUNCemFHOTNLQ2s3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lHaHBaR1VvS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCelpXeGxZM1FnS0hOMVoyZGxjM1JwYjI0cElIdGNiaUFnSUNCMWJuTmxiR1ZqZENncE8xeHVJQ0FnSUdsbUlDaHpkV2RuWlhOMGFXOXVLU0I3WEc0Z0lDQWdJQ0J6Wld4bFkzUnBiMjRnUFNCemRXZG5aWE4wYVc5dU8xeHVJQ0FnSUNBZ2MyVnNaV04wYVc5dUxtTnNZWE56VG1GdFpTQXJQU0FuSUhObGVTMXpaV3hsWTNSbFpDYzdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdkVzV6Wld4bFkzUWdLQ2tnZTF4dUlDQWdJR2xtSUNoelpXeGxZM1JwYjI0cElIdGNiaUFnSUNBZ0lITmxiR1ZqZEdsdmJpNWpiR0Z6YzA1aGJXVWdQU0J6Wld4bFkzUnBiMjR1WTJ4aGMzTk9ZVzFsTG5KbGNHeGhZMlVvTHlCelpYa3RjMlZzWldOMFpXUXZaeXdnSnljcE8xeHVJQ0FnSUNBZ2MyVnNaV04wYVc5dUlEMGdiblZzYkR0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCdGIzWmxJQ2gxY0N3Z2JXOTJaWE1wSUh0Y2JpQWdJQ0IyWVhJZ2RHOTBZV3dnUFNCMWJDNWphR2xzWkhKbGJpNXNaVzVuZEdnN1hHNGdJQ0FnYVdZZ0tIUnZkR0ZzSUR3Z2JXOTJaWE1wSUh0Y2JpQWdJQ0FnSUhWdWMyVnNaV04wS0NrN1hHNGdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2gwYjNSaGJDQTlQVDBnTUNrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJSDFjYmlBZ0lDQjJZWElnWm1seWMzUWdQU0IxY0NBL0lDZHNZWE4wUTJocGJHUW5JRG9nSjJacGNuTjBRMmhwYkdRbk8xeHVJQ0FnSUhaaGNpQnVaWGgwSUQwZ2RYQWdQeUFuY0hKbGRtbHZkWE5UYVdKc2FXNW5KeUE2SUNkdVpYaDBVMmxpYkdsdVp5YzdYRzRnSUNBZ2RtRnlJSE4xWjJkbGMzUnBiMjRnUFNCelpXeGxZM1JwYjI0Z0ppWWdjMlZzWldOMGFXOXVXMjVsZUhSZElIeDhJSFZzVzJacGNuTjBYVHRjYmx4dUlDQWdJSE5sYkdWamRDaHpkV2RuWlhOMGFXOXVLVHRjYmx4dUlDQWdJR2xtSUNob2FXUmtaVzRvYzNWbloyVnpkR2x2YmlrcElIdGNiaUFnSUNBZ0lHMXZkbVVvZFhBc0lHMXZkbVZ6SUQ4Z2JXOTJaWE1nS3lBeElEb2dNU2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnYUdsa1pTQW9LU0I3WEc0Z0lDQWdaWGxsTG5Oc1pXVndLQ2s3WEc0Z0lDQWdkV3d1WTJ4aGMzTk9ZVzFsSUQwZ2RXd3VZMnhoYzNOT1lXMWxMbkpsY0d4aFkyVW9MeUJ6WlhrdGMyaHZkeTluTENBbkp5azdYRzRnSUNBZ2RXNXpaV3hsWTNRb0tUdGNiaUFnSUNCamNtOXpjM1psYm5RdVptRmljbWxqWVhSbEtHRjBkR0ZqYUcxbGJuUXNJQ2RvYjNKelpYa3RhR2xrWlNjcE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdhMlY1Wkc5M2JpQW9aU2tnZTF4dUlDQWdJSFpoY2lCemFHOTNiaUE5SUhacGMybGliR1VvS1R0Y2JpQWdJQ0IyWVhJZ2QyaHBZMmdnUFNCbExuZG9hV05vSUh4OElHVXVhMlY1UTI5a1pUdGNiaUFnSUNCcFppQW9kMmhwWTJnZ1BUMDlJRXRGV1Y5RVQxZE9LU0I3WEc0Z0lDQWdJQ0JwWmlBb1lXNTVTVzV3ZFhRZ0ppWWdieTVoZFhSdlUyaHZkMDl1VlhCRWIzZHVLU0I3WEc0Z0lDQWdJQ0FnSUhOb2IzY29LVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR2xtSUNoemFHOTNiaWtnZTF4dUlDQWdJQ0FnSUNCdGIzWmxLQ2s3WEc0Z0lDQWdJQ0FnSUhOMGIzQW9aU2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2gzYUdsamFDQTlQVDBnUzBWWlgxVlFLU0I3WEc0Z0lDQWdJQ0JwWmlBb1lXNTVTVzV3ZFhRZ0ppWWdieTVoZFhSdlUyaHZkMDl1VlhCRWIzZHVLU0I3WEc0Z0lDQWdJQ0FnSUhOb2IzY29LVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR2xtSUNoemFHOTNiaWtnZTF4dUlDQWdJQ0FnSUNCdGIzWmxLSFJ5ZFdVcE8xeHVJQ0FnSUNBZ0lDQnpkRzl3S0dVcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb2MyaHZkMjRwSUh0Y2JpQWdJQ0FnSUdsbUlDaDNhR2xqYUNBOVBUMGdTMFZaWDBWT1ZFVlNLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaHpaV3hsWTNScGIyNHBJSHRjYmlBZ0lDQWdJQ0FnSUNCamNtOXpjM1psYm5RdVptRmljbWxqWVhSbEtITmxiR1ZqZEdsdmJpd2dKMk5zYVdOckp5azdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnYUdsa1pTZ3BPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUhOMGIzQW9aU2s3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0hkb2FXTm9JRDA5UFNCTFJWbGZSVk5ES1NCN1hHNGdJQ0FnSUNBZ0lHaHBaR1VvS1R0Y2JpQWdJQ0FnSUNBZ2MzUnZjQ2hsS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCemRHOXdJQ2hsS1NCN1hHNGdJQ0FnWlM1emRHOXdVSEp2Y0dGbllYUnBiMjRvS1R0Y2JpQWdJQ0JsTG5CeVpYWmxiblJFWldaaGRXeDBLQ2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCbWFXeDBaWEpwYm1jZ0tDa2dlMXh1SUNBZ0lHbG1JQ2doZG1semFXSnNaU2dwS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1SUNBZ0lHTnliM056ZG1WdWRDNW1ZV0p5YVdOaGRHVW9ZWFIwWVdOb2JXVnVkQ3dnSjJodmNuTmxlUzFtYVd4MFpYSW5LVHRjYmlBZ0lDQjJZWElnYkdrZ1BTQjFiQzVtYVhKemRFTm9hV3hrTzF4dUlDQWdJSFpoY2lCamIzVnVkQ0E5SURBN1hHNGdJQ0FnZDJocGJHVWdLR3hwS1NCN1hHNGdJQ0FnSUNCcFppQW9ZMjkxYm5RZ1BqMGdiR2x0YVhRcElIdGNiaUFnSUNBZ0lDQWdZM0p2YzNOMlpXNTBMbVpoWW5KcFkyRjBaU2hzYVN3Z0oyaHZjbk5sZVMxb2FXUmxKeWs3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JwWmlBb1kyOTFiblFnUENCc2FXMXBkQ2tnZTF4dUlDQWdJQ0FnSUNCamNtOXpjM1psYm5RdVptRmljbWxqWVhSbEtHeHBMQ0FuYUc5eWMyVjVMV1pwYkhSbGNpY3BPMXh1SUNBZ0lDQWdJQ0JwWmlBb2JHa3VZMnhoYzNOT1lXMWxMbWx1WkdWNFQyWW9KM05sZVMxb2FXUmxKeWtnUFQwOUlDMHhLU0I3WEc0Z0lDQWdJQ0FnSUNBZ1kyOTFiblFyS3p0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2JHa2dQU0JzYVM1dVpYaDBVMmxpYkdsdVp6dGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tDRnpaV3hsWTNScGIyNHBJSHRjYmlBZ0lDQWdJRzF2ZG1Vb0tUdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tDRnpaV3hsWTNScGIyNHBJSHRjYmlBZ0lDQWdJR2hwWkdVb0tUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmtaV1psY25KbFpFWnBiSFJsY21sdVowNXZSVzUwWlhJZ0tHVXBJSHRjYmlBZ0lDQjJZWElnZDJocFkyZ2dQU0JsTG5kb2FXTm9JSHg4SUdVdWEyVjVRMjlrWlR0Y2JpQWdJQ0JwWmlBb2QyaHBZMmdnUFQwOUlFdEZXVjlGVGxSRlVpa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JpQWdJQ0JrWldabGNuSmxaRVpwYkhSbGNtbHVaeWdwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1pHVm1aWEp5WldSVGFHOTNJQ2hsS1NCN1hHNGdJQ0FnZG1GeUlIZG9hV05vSUQwZ1pTNTNhR2xqYUNCOGZDQmxMbXRsZVVOdlpHVTdYRzRnSUNBZ2FXWWdLSGRvYVdOb0lEMDlQU0JMUlZsZlJVNVVSVklwSUh0Y2JpQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQjlYRzRnSUNBZ2MyVjBWR2x0Wlc5MWRDaHphRzkzTENBd0tUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR2h2Y25ObGVVVjJaVzUwVkdGeVoyVjBJQ2hsS1NCN1hHNGdJQ0FnZG1GeUlIUmhjbWRsZENBOUlHVXVkR0Z5WjJWME8xeHVJQ0FnSUdsbUlDaDBZWEpuWlhRZ1BUMDlJR0YwZEdGamFHMWxiblFwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUIwY25WbE8xeHVJQ0FnSUgxY2JpQWdJQ0IzYUdsc1pTQW9kR0Z5WjJWMEtTQjdYRzRnSUNBZ0lDQnBaaUFvZEdGeVoyVjBJRDA5UFNCMWJDQjhmQ0IwWVhKblpYUWdQVDA5SUdGMGRHRmphRzFsYm5RcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUnlkV1U3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0IwWVhKblpYUWdQU0IwWVhKblpYUXVjR0Z5Wlc1MFRtOWtaVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJvYVdSbFQyNUNiSFZ5SUNobEtTQjdYRzRnSUNBZ2FXWWdLR2h2Y25ObGVVVjJaVzUwVkdGeVoyVjBLR1VwS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1SUNBZ0lHaHBaR1VvS1R0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHaHBaR1ZQYmtOc2FXTnJJQ2hsS1NCN1hHNGdJQ0FnYVdZZ0tHaHZjbk5sZVVWMlpXNTBWR0Z5WjJWMEtHVXBLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVJQ0FnSUdocFpHVW9LVHRjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdsdWNIVjBSWFpsYm5SeklDaHlaVzF2ZG1VcElIdGNiaUFnSUNCMllYSWdiM0FnUFNCeVpXMXZkbVVnUHlBbmNtVnRiM1psSnlBNklDZGhaR1FuTzF4dUlDQWdJR2xtSUNobGVXVXBJSHRjYmlBZ0lDQWdJR1Y1WlM1a1pYTjBjbTk1S0NrN1hHNGdJQ0FnSUNCbGVXVWdQU0J1ZFd4c08xeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb0lYSmxiVzkyWlNrZ2UxeHVJQ0FnSUNBZ1pYbGxJRDBnWW5Wc2JITmxlV1VvZFd3c0lHRjBkR0ZqYUcxbGJuUXNJSHNnWTJGeVpYUTZJR0Z1ZVVsdWNIVjBJQ1ltSUdGMGRHRmphRzFsYm5RdWRHRm5UbUZ0WlNBaFBUMGdKMGxPVUZWVUp5d2daMlYwVTJWc1pXTjBhVzl1T2lCblpYUlRaV3hsWTNScGIyNGdmU2s3WEc0Z0lDQWdJQ0JwWmlBb0lYWnBjMmxpYkdVb0tTa2dleUJsZVdVdWMyeGxaWEFvS1RzZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2RIbHdaVzltSUhOMVoyZGxjM1JwYjI1eklEMDlQU0FuWm5WdVkzUnBiMjRuSUNZbUlDRnZibVZzYjJGa0xuVnpaV1FwSUh0Y2JpQWdJQ0FnSUdsbUlDaHlaVzF2ZG1VZ2ZId2dLR0Z1ZVVsdWNIVjBJQ1ltSUdSdll5NWhZM1JwZG1WRmJHVnRaVzUwSUNFOVBTQmhkSFJoWTJodFpXNTBLU2tnZTF4dUlDQWdJQ0FnSUNCamNtOXpjM1psYm5SYmIzQmRLR0YwZEdGamFHMWxiblFzSUNkbWIyTjFjeWNzSUc5dVpXeHZZV1FwTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnYjI1bGJHOWhaQ2dwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvWldScGRHOXlLU0I3WEc0Z0lDQWdJQ0JqY205emMzWmxiblJiYjNCZEtHVmthWFJ2Y2k1bFpHbDBZV0pzWlN3Z0oyaHZjbk5sZVMxbWFXeDBaWEluTENCblpYUkRhSFZ1YTNOR2IzSkdhV3gwWlhKektUdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tHRnVlVWx1Y0hWMEtTQjdYRzRnSUNBZ0lDQmpjbTl6YzNabGJuUmJiM0JkS0dGMGRHRmphRzFsYm5Rc0lDZHJaWGx3Y21WemN5Y3NJR1JsWm1WeWNtVmtVMmh2ZHlrN1hHNGdJQ0FnSUNCamNtOXpjM1psYm5SYmIzQmRLR0YwZEdGamFHMWxiblFzSUNkclpYbHdjbVZ6Y3ljc0lHUmxabVZ5Y21Wa1JtbHNkR1Z5YVc1bktUdGNiaUFnSUNBZ0lHTnliM056ZG1WdWRGdHZjRjBvWVhSMFlXTm9iV1Z1ZEN3Z0oydGxlV1J2ZDI0bkxDQmtaV1psY25KbFpFWnBiSFJsY21sdVowNXZSVzUwWlhJcE8xeHVJQ0FnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hoZEhSaFkyaHRaVzUwTENBbmNHRnpkR1VuTENCa1pXWmxjbkpsWkVacGJIUmxjbWx1WnlrN1hHNGdJQ0FnSUNCamNtOXpjM1psYm5SYmIzQmRLR0YwZEdGamFHMWxiblFzSUNkclpYbGtiM2R1Snl3Z2EyVjVaRzkzYmlrN1hHNGdJQ0FnSUNCcFppQW9ieTVoZFhSdlNHbGtaVTl1UW14MWNpa2dleUJqY205emMzWmxiblJiYjNCZEtHUnZZMFZzWlcxbGJuUXNJQ2RtYjJOMWN5Y3NJR2hwWkdWUGJrSnNkWElzSUhSeWRXVXBPeUI5WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lHTnliM056ZG1WdWRGdHZjRjBvWVhSMFlXTm9iV1Z1ZEN3Z0oyTnNhV05ySnl3Z2RHOW5aMnhsY2lrN1hHNGdJQ0FnSUNCamNtOXpjM1psYm5SYmIzQmRLR1J2WTBWc1pXMWxiblFzSUNkclpYbGtiM2R1Snl3Z2EyVjVaRzkzYmlrN1hHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNodkxtRjFkRzlJYVdSbFQyNURiR2xqYXlrZ2V5QmpjbTl6YzNabGJuUmJiM0JkS0dSdll5d2dKMk5zYVdOckp5d2dhR2xrWlU5dVEyeHBZMnNwT3lCOVhHNGdJQ0FnYVdZZ0tHWnZjbTBwSUhzZ1kzSnZjM04yWlc1MFcyOXdYU2htYjNKdExDQW5jM1ZpYldsMEp5d2dhR2xrWlNrN0lIMWNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJR1JsYzNSeWIza2dLQ2tnZTF4dUlDQWdJR2x1Y0hWMFJYWmxiblJ6S0hSeWRXVXBPMXh1SUNBZ0lHbG1JQ2h3WVhKbGJuUXVZMjl1ZEdGcGJuTW9kV3dwS1NCN0lIQmhjbVZ1ZEM1eVpXMXZkbVZEYUdsc1pDaDFiQ2s3SUgxY2JpQWdJQ0JqWVdOb1pTNXpjR3hwWTJVb1kyRmphR1V1YVc1a1pYaFBaaWhsYm5SeWVTa3NJREVwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1pHVm1ZWFZzZEZObGRIUmxjaUFvZG1Gc2RXVXBJSHRjYmlBZ0lDQnBaaUFvZEdWNGRFbHVjSFYwS1NCN1hHNGdJQ0FnSUNCbGJDNTJZV3gxWlNBOUlIWmhiSFZsTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQmxiQzVwYm01bGNraFVUVXdnUFNCMllXeDFaVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJrWldaaGRXeDBVbVZ1WkdWeVpYSWdLR3hwTENCemRXZG5aWE4wYVc5dUtTQjdYRzRnSUNBZ2JHa3VhVzV1WlhKVVpYaDBJRDBnYkdrdWRHVjRkRU52Ym5SbGJuUWdQU0JuWlhSVVpYaDBLSE4xWjJkbGMzUnBiMjRwTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z1pHVm1ZWFZzZEVacGJIUmxjaUFvY1N3Z2MzVm5aMlZ6ZEdsdmJpa2dlMXh1SUNBZ0lIWmhjaUIwWlhoMElEMGdaMlYwVkdWNGRDaHpkV2RuWlhOMGFXOXVLU0I4ZkNBbkp6dGNiaUFnSUNCMllYSWdkbUZzZFdVZ1BTQm5aWFJXWVd4MVpTaHpkV2RuWlhOMGFXOXVLU0I4ZkNBbkp6dGNiaUFnSUNCeVpYUjFjbTRnWm5WNmVubHpaV0Z5WTJnb2NTd2dkR1Y0ZEM1MGIweHZkMlZ5UTJGelpTZ3BLU0I4ZkNCbWRYcDZlWE5sWVhKamFDaHhMQ0IyWVd4MVpTNTBiMHh2ZDJWeVEyRnpaU2dwS1R0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHeHZiM0JpWVdOclZHOUJibU5vYjNJZ0tIUmxlSFFzSUhBcElIdGNiaUFnSUNCMllYSWdjbVZ6ZFd4MElEMGdKeWM3WEc0Z0lDQWdkbUZ5SUdGdVkyaHZjbVZrSUQwZ1ptRnNjMlU3WEc0Z0lDQWdkbUZ5SUhOMFlYSjBJRDBnY0M1emRHRnlkRHRjYmlBZ0lDQjNhR2xzWlNBb1lXNWphRzl5WldRZ1BUMDlJR1poYkhObElDWW1JSE4wWVhKMElENDlJREFwSUh0Y2JpQWdJQ0FnSUhKbGMzVnNkQ0E5SUhSbGVIUXVjM1ZpYzNSeUtITjBZWEowSUMwZ01Td2djQzV6ZEdGeWRDQXRJSE4wWVhKMElDc2dNU2s3WEc0Z0lDQWdJQ0JoYm1Ob2IzSmxaQ0E5SUhKaGJtTm9iM0pzWldaMExuUmxjM1FvY21WemRXeDBLVHRjYmlBZ0lDQWdJSE4wWVhKMExTMDdYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0IwWlhoME9pQmhibU5vYjNKbFpDQS9JSEpsYzNWc2RDQTZJRzUxYkd3c1hHNGdJQ0FnSUNCemRHRnlkRG9nYzNSaGNuUmNiaUFnSUNCOU8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdaMlYwUTJoMWJtdHpSbTl5Um1sc2RHVnljeUFvS1NCN1hHNGdJQ0FnWldScGRHOXlMbkoxYmtOdmJXMWhibVFvWm5WdVkzUnBiMjRnWjI5MFEyOXVkR1Y0ZENBb1kyaDFibXR6S1NCN1hHNGdJQ0FnSUNCMllYSWdkR1Y0ZENBOUlHTm9kVzVyY3k1aVpXWnZjbVVnS3lCamFIVnVhM011YzJWc1pXTjBhVzl1TzF4dUlDQWdJQ0FnZG1GeUlHRnVZMmh2Y21Wa0lEMGdabUZzYzJVN1hHNGdJQ0FnSUNCMllYSWdjM1JoY25RZ1BTQjBaWGgwTG14bGJtZDBhRHRjYmlBZ0lDQWdJSGRvYVd4bElDaGhibU5vYjNKbFpDQTlQVDBnWm1Gc2MyVWdKaVlnYzNSaGNuUWdQajBnTUNrZ2UxeHVJQ0FnSUNBZ0lDQmpZV05vWldST1pXVmtiR1VnUFNCMFpYaDBMbk4xWW5OMGNpaHpkR0Z5ZENBdElERXNJSFJsZUhRdWJHVnVaM1JvSUMwZ2MzUmhjblFnS3lBeEtUdGNiaUFnSUNBZ0lDQWdZVzVqYUc5eVpXUWdQU0J5WVc1amFHOXliR1ZtZEM1MFpYTjBLR05oWTJobFpFNWxaV1JzWlNrN1hHNGdJQ0FnSUNBZ0lITjBZWEowTFMwN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9ZVzVqYUc5eVpXUWdQVDA5SUdaaGJITmxLU0I3WEc0Z0lDQWdJQ0FnSUdOaFkyaGxaRTVsWldSc1pTQTlJRzUxYkd3N1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCallXTm9aV1JEYUhWdWEzTWdQU0JqYUhWdWEzTTdYRzRnSUNBZ2ZTazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJtYVd4MFpYSkJibU5vYjNKbFpGUmxlSFFnS0hFc0lITjFaMmRsYzNScGIyNHBJSHRjYmlBZ0lDQjJZWElnY0c5emFYUnBiMjRnUFNCelpXeHNLR1ZzS1R0Y2JpQWdJQ0IyWVhJZ2FXNXdkWFFnUFNCc2IyOXdZbUZqYTFSdlFXNWphRzl5S0hFc0lIQnZjMmwwYVc5dUtTNTBaWGgwTzF4dUlDQWdJR2xtSUNocGJuQjFkQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSFZ6WlhKR2FXeDBaWElvYVc1d2RYUXNJSE4xWjJkbGMzUnBiMjRwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUdacGJIUmxja0Z1WTJodmNtVmtTRlJOVENBb2NTd2djM1ZuWjJWemRHbHZiaWtnZTF4dUlDQWdJR2xtSUNoallXTm9aV1JPWldWa2JHVXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjFjMlZ5Um1sc2RHVnlLR05oWTJobFpFNWxaV1JzWlN3Z2MzVm5aMlZ6ZEdsdmJpazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdaVzUwYVhScGVtVWdLSFpoYkhWbEtTQjdYRzRnSUNBZ2FXWWdLR1ZrYVhSdmNpQW1KaUJsWkdsMGIzSXViVzlrWlNBaFBUMGdKMjFoY210a2IzZHVKeWtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR1ZrYVhSdmNpNXdZWEp6WlUxaGNtdGtiM2R1S0haaGJIVmxLUzV5WlhCc1lXTmxLSEp3WVhKaFozSmhjR2dzSUNjbktUdGNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJSFpoYkhWbE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdZWEJ3Wlc1a1ZHVjRkQ0FvZG1Gc2RXVXBJSHRjYmlBZ0lDQjJZWElnWlc1MGFYUjVJRDBnWlc1MGFYUnBlbVVvZG1Gc2RXVXBPMXh1SUNBZ0lIWmhjaUJqZFhKeVpXNTBJRDBnWld3dWRtRnNkV1U3WEc0Z0lDQWdkbUZ5SUhCdmMybDBhVzl1SUQwZ2MyVnNiQ2hsYkNrN1hHNGdJQ0FnZG1GeUlHbHVjSFYwSUQwZ2JHOXZjR0poWTJ0VWIwRnVZMmh2Y2loamRYSnlaVzUwTENCd2IzTnBkR2x2YmlrN1hHNGdJQ0FnZG1GeUlHeGxablFnUFNCamRYSnlaVzUwTG5OMVluTjBjaWd3TENCcGJuQjFkQzV6ZEdGeWRDazdYRzRnSUNBZ2RtRnlJSEpwWjJoMElEMGdZM1Z5Y21WdWRDNXpkV0p6ZEhJb2FXNXdkWFF1YzNSaGNuUWdLeUJwYm5CMWRDNTBaWGgwTG14bGJtZDBhQ0FySUNod2IzTnBkR2x2Ymk1bGJtUWdMU0J3YjNOcGRHbHZiaTV6ZEdGeWRDa3BPMXh1SUNBZ0lIWmhjaUJpWldadmNtVWdQU0JzWldaMElDc2daVzUwYVhSNUlDc2dKeUFuTzF4dVhHNGdJQ0FnWld3dWRtRnNkV1VnUFNCaVpXWnZjbVVnS3lCeWFXZG9kRHRjYmlBZ0lDQnpaV3hzS0dWc0xDQjdYRzRnSUNBZ0lDQnpkR0Z5ZERvZ1ltVm1iM0psTG14bGJtZDBhQ3dnWlc1a09pQmlaV1p2Y21VdWJHVnVaM1JvWEc0Z0lDQWdmU2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCaGNIQmxibVJJVkUxTUlDaDJZV3gxWlNrZ2UxeHVJQ0FnSUdWa2FYUnZjaTV5ZFc1RGIyMXRZVzVrS0hObGRFVnVkR2wwZVNrN1hHNGdJQ0FnWm5WdVkzUnBiMjRnYzJWMFJXNTBhWFI1SUNoamFIVnVhM01wSUh0Y2JpQWdJQ0FnSUhaaGNpQmxiblJwZEhrZ1BTQmxiblJwZEdsNlpTaDJZV3gxWlNrN1hHNGdJQ0FnSUNCMllYSWdiR1ZtZENBOUlHTmhZMmhsWkVOb2RXNXJjeTVpWldadmNtVTdYRzRnSUNBZ0lDQjJZWElnYkdWdUlEMGdiR1ZtZEM1c1pXNW5kR2dnTFNBeE8xeHVJQ0FnSUNBZ2QyaHBiR1VnS0d4bGJpQStJREFnSmlZZ0lYSmhibU5vYjNKeWFXZG9kQzUwWlhOMEtHeGxablFwS1NCN1hHNGdJQ0FnSUNBZ0lHeGxablFnUFNCc1pXWjBMbk4xWW5OMGNpZ3dMQ0F0TFd4bGJpazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQmphSFZ1YTNNdVltVm1iM0psSUQwZ2JHVm1kQzV6ZFdKemRISW9NQ3dnYkdWdUtTQXJJR1Z1ZEdsMGVTQXJJQ2NtYm1KemNEc25PMXh1SUNBZ0lDQWdZMmgxYm10ekxtRm1kR1Z5SUQwZ1kyRmphR1ZrUTJoMWJtdHpMbk5sYkdWamRHbHZiaUFySUdOaFkyaGxaRU5vZFc1cmN5NWhablJsY2p0Y2JpQWdJQ0FnSUdOb2RXNXJjeTV6Wld4bFkzUnBiMjRnUFNBbkp6dGNiaUFnSUNCOVhHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdhWE5KYm5CMWRDQW9aV3dwSUhzZ2NtVjBkWEp1SUdWc0xuUmhaMDVoYldVZ1BUMDlJQ2RKVGxCVlZDY2dmSHdnWld3dWRHRm5UbUZ0WlNBOVBUMGdKMVJGV0ZSQlVrVkJKenNnZlZ4dVhHNW1kVzVqZEdsdmJpQmtaV1poZFd4MFIyVjBWbUZzZFdVZ0tITjFaMmRsYzNScGIyNHBJSHRjYmlBZ2NtVjBkWEp1SUhSNWNHVnZaaUJ6ZFdkblpYTjBhVzl1SUQwOVBTQW5jM1J5YVc1bkp5QS9JSE4xWjJkbGMzUnBiMjRnT2lCemRXZG5aWE4wYVc5dUxuWmhiSFZsTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJrWldaaGRXeDBSMlYwVkdWNGRDQW9jM1ZuWjJWemRHbHZiaWtnZTF4dUlDQnlaWFIxY200Z2RIbHdaVzltSUhOMVoyZGxjM1JwYjI0Z1BUMDlJQ2R6ZEhKcGJtY25JRDhnYzNWbloyVnpkR2x2YmlBNklITjFaMmRsYzNScGIyNHVkR1Y0ZER0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnZEdGbklDaDBlWEJsTENCamJHRnpjMDVoYldVcElIdGNiaUFnZG1GeUlHVnNJRDBnWkc5akxtTnlaV0YwWlVWc1pXMWxiblFvZEhsd1pTazdYRzRnSUdWc0xtTnNZWE56VG1GdFpTQTlJR05zWVhOelRtRnRaVHRjYmlBZ2NtVjBkWEp1SUdWc08xeHVmVnh1WEc1bWRXNWpkR2x2YmlCdmJtTmxJQ2htYmlrZ2UxeHVJQ0IyWVhJZ1pHbHpjRzl6WldRN1hHNGdJR1oxYm1OMGFXOXVJR1JwYzNCdmMyRmliR1VnS0NrZ2UxeHVJQ0FnSUdsbUlDaGthWE53YjNObFpDa2dleUJ5WlhSMWNtNDdJSDFjYmlBZ0lDQmthWE53YjNOaFlteGxMblZ6WldRZ1BTQmthWE53YjNObFpDQTlJSFJ5ZFdVN1hHNGdJQ0FnS0dadUlIeDhJRzV2YjNBcExtRndjR3g1S0c1MWJHd3NJR0Z5WjNWdFpXNTBjeWs3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1JwYzNCdmMyRmliR1U3WEc1OVhHNW1kVzVqZEdsdmJpQmtaV1psY2lBb1ptNHBJSHNnY21WMGRYSnVJR1oxYm1OMGFXOXVJQ2dwSUhzZ2MyVjBWR2x0Wlc5MWRDaG1iaXdnTUNrN0lIMDdJSDFjYm1aMWJtTjBhVzl1SUc1dmIzQWdLQ2tnZTMxY2JseHVablZ1WTNScGIyNGdhWE5GWkdsMFlXSnNaU0FvWld3cElIdGNiaUFnZG1GeUlIWmhiSFZsSUQwZ1pXd3VaMlYwUVhSMGNtbGlkWFJsS0NkamIyNTBaVzUwUldScGRHRmliR1VuS1R0Y2JpQWdhV1lnS0haaGJIVmxJRDA5UFNBblptRnNjMlVuS1NCN1hHNGdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0I5WEc0Z0lHbG1JQ2gyWVd4MVpTQTlQVDBnSjNSeWRXVW5LU0I3WEc0Z0lDQWdjbVYwZFhKdUlIUnlkV1U3WEc0Z0lIMWNiaUFnYVdZZ0tHVnNMbkJoY21WdWRFVnNaVzFsYm5RcElIdGNiaUFnSUNCeVpYUjFjbTRnYVhORlpHbDBZV0pzWlNobGJDNXdZWEpsYm5SRmJHVnRaVzUwS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzU5WEc1Y2JtaHZjbk5sZVM1bWFXNWtJRDBnWm1sdVpEdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdhRzl5YzJWNU8xeHVJbDE5IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgdGFpbG9ybWFkZSA9IHJlcXVpcmUoJy4vdGFpbG9ybWFkZScpO1xuXG5mdW5jdGlvbiBidWxsc2V5ZSAoZWwsIHRhcmdldCwgb3B0aW9ucykge1xuICB2YXIgbyA9IG9wdGlvbnM7XG4gIHZhciBkb21UYXJnZXQgPSB0YXJnZXQgJiYgdGFyZ2V0LnRhZ05hbWU7XG5cbiAgaWYgKCFkb21UYXJnZXQgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIG8gPSB0YXJnZXQ7XG4gIH1cbiAgaWYgKCFkb21UYXJnZXQpIHtcbiAgICB0YXJnZXQgPSBlbDtcbiAgfVxuICBpZiAoIW8pIHsgbyA9IHt9OyB9XG5cbiAgdmFyIGRlc3Ryb3llZCA9IGZhbHNlO1xuICB2YXIgdGhyb3R0bGVkV3JpdGUgPSB0aHJvdHRsZSh3cml0ZSwgMzApO1xuICB2YXIgdGFpbG9yT3B0aW9ucyA9IHsgdXBkYXRlOiBvLmF1dG91cGRhdGVUb0NhcmV0ICE9PSBmYWxzZSAmJiB1cGRhdGUgfTtcbiAgdmFyIHRhaWxvciA9IG8uY2FyZXQgJiYgdGFpbG9ybWFkZSh0YXJnZXQsIHRhaWxvck9wdGlvbnMpO1xuXG4gIHdyaXRlKCk7XG5cbiAgaWYgKG8udHJhY2tpbmcgIT09IGZhbHNlKSB7XG4gICAgY3Jvc3N2ZW50LmFkZCh3aW5kb3csICdyZXNpemUnLCB0aHJvdHRsZWRXcml0ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlYWQ6IHJlYWROdWxsLFxuICAgIHJlZnJlc2g6IHdyaXRlLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgc2xlZXA6IHNsZWVwXG4gIH07XG5cbiAgZnVuY3Rpb24gc2xlZXAgKCkge1xuICAgIHRhaWxvck9wdGlvbnMuc2xlZXBpbmcgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZE51bGwgKCkgeyByZXR1cm4gcmVhZCgpOyB9XG5cbiAgZnVuY3Rpb24gcmVhZCAocmVhZGluZ3MpIHtcbiAgICB2YXIgYm91bmRzID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBzY3JvbGxUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmICh0YWlsb3IpIHtcbiAgICAgIHJlYWRpbmdzID0gdGFpbG9yLnJlYWQoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IChyZWFkaW5ncy5hYnNvbHV0ZSA/IDAgOiBib3VuZHMubGVmdCkgKyByZWFkaW5ncy54LFxuICAgICAgICB5OiAocmVhZGluZ3MuYWJzb2x1dGUgPyAwIDogYm91bmRzLnRvcCkgKyBzY3JvbGxUb3AgKyByZWFkaW5ncy55ICsgMjBcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB4OiBib3VuZHMubGVmdCxcbiAgICAgIHk6IGJvdW5kcy50b3AgKyBzY3JvbGxUb3BcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlIChyZWFkaW5ncykge1xuICAgIHdyaXRlKHJlYWRpbmdzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlIChyZWFkaW5ncykge1xuICAgIGlmIChkZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQnVsbHNleWUgY2FuXFwndCByZWZyZXNoIGFmdGVyIGJlaW5nIGRlc3Ryb3llZC4gQ3JlYXRlIGFub3RoZXIgaW5zdGFuY2UgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgaWYgKHRhaWxvciAmJiAhcmVhZGluZ3MpIHtcbiAgICAgIHRhaWxvck9wdGlvbnMuc2xlZXBpbmcgPSBmYWxzZTtcbiAgICAgIHRhaWxvci5yZWZyZXNoKCk7IHJldHVybjtcbiAgICB9XG4gICAgdmFyIHAgPSByZWFkKHJlYWRpbmdzKTtcbiAgICBpZiAoIXRhaWxvciAmJiB0YXJnZXQgIT09IGVsKSB7XG4gICAgICBwLnkgKz0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB9XG4gICAgZWwuc3R5bGUubGVmdCA9IHAueCArICdweCc7XG4gICAgZWwuc3R5bGUudG9wID0gcC55ICsgJ3B4JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0YWlsb3IpIHsgdGFpbG9yLmRlc3Ryb3koKTsgfVxuICAgIGNyb3NzdmVudC5yZW1vdmUod2luZG93LCAncmVzaXplJywgdGhyb3R0bGVkV3JpdGUpO1xuICAgIGRlc3Ryb3llZCA9IHRydWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWxsc2V5ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldCA9IGVhc3lHZXQ7XG52YXIgc2V0ID0gZWFzeVNldDtcblxuaWYgKGRvY3VtZW50LnNlbGVjdGlvbiAmJiBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UpIHtcbiAgZ2V0ID0gaGFyZEdldDtcbiAgc2V0ID0gaGFyZFNldDtcbn1cblxuZnVuY3Rpb24gZWFzeUdldCAoZWwpIHtcbiAgcmV0dXJuIHtcbiAgICBzdGFydDogZWwuc2VsZWN0aW9uU3RhcnQsXG4gICAgZW5kOiBlbC5zZWxlY3Rpb25FbmRcbiAgfTtcbn1cblxuZnVuY3Rpb24gaGFyZEdldCAoZWwpIHtcbiAgdmFyIGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIGlmIChhY3RpdmUgIT09IGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxuXG4gIHZhciByYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICB2YXIgYm9va21hcmsgPSByYW5nZS5nZXRCb29rbWFyaygpO1xuICB2YXIgb3JpZ2luYWwgPSBlbC52YWx1ZTtcbiAgdmFyIG1hcmtlciA9IGdldFVuaXF1ZU1hcmtlcihvcmlnaW5hbCk7XG4gIHZhciBwYXJlbnQgPSByYW5nZS5wYXJlbnRFbGVtZW50KCk7XG4gIGlmIChwYXJlbnQgPT09IG51bGwgfHwgIWlucHV0cyhwYXJlbnQpKSB7XG4gICAgcmV0dXJuIHJlc3VsdCgwLCAwKTtcbiAgfVxuICByYW5nZS50ZXh0ID0gbWFya2VyICsgcmFuZ2UudGV4dCArIG1hcmtlcjtcblxuICB2YXIgY29udGVudHMgPSBlbC52YWx1ZTtcblxuICBlbC52YWx1ZSA9IG9yaWdpbmFsO1xuICByYW5nZS5tb3ZlVG9Cb29rbWFyayhib29rbWFyayk7XG4gIHJhbmdlLnNlbGVjdCgpO1xuXG4gIHJldHVybiByZXN1bHQoY29udGVudHMuaW5kZXhPZihtYXJrZXIpLCBjb250ZW50cy5sYXN0SW5kZXhPZihtYXJrZXIpIC0gbWFya2VyLmxlbmd0aCk7XG5cbiAgZnVuY3Rpb24gcmVzdWx0IChzdGFydCwgZW5kKSB7XG4gICAgaWYgKGFjdGl2ZSAhPT0gZWwpIHsgLy8gZG9uJ3QgZGlzcnVwdCBwcmUtZXhpc3Rpbmcgc3RhdGVcbiAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgYWN0aXZlLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5ibHVyKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRVbmlxdWVNYXJrZXIgKGNvbnRlbnRzKSB7XG4gIHZhciBtYXJrZXI7XG4gIGRvIHtcbiAgICBtYXJrZXIgPSAnQEBtYXJrZXIuJyArIE1hdGgucmFuZG9tKCkgKiBuZXcgRGF0ZSgpO1xuICB9IHdoaWxlIChjb250ZW50cy5pbmRleE9mKG1hcmtlcikgIT09IC0xKTtcbiAgcmV0dXJuIG1hcmtlcjtcbn1cblxuZnVuY3Rpb24gaW5wdXRzIChlbCkge1xuICByZXR1cm4gKChlbC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsLnR5cGUgPT09ICd0ZXh0JykgfHwgZWwudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJyk7XG59XG5cbmZ1bmN0aW9uIGVhc3lTZXQgKGVsLCBwKSB7XG4gIGVsLnNlbGVjdGlvblN0YXJ0ID0gcGFyc2UoZWwsIHAuc3RhcnQpO1xuICBlbC5zZWxlY3Rpb25FbmQgPSBwYXJzZShlbCwgcC5lbmQpO1xufVxuXG5mdW5jdGlvbiBoYXJkU2V0IChlbCwgcCkge1xuICB2YXIgcmFuZ2UgPSBlbC5jcmVhdGVUZXh0UmFuZ2UoKTtcblxuICBpZiAocC5zdGFydCA9PT0gJ2VuZCcgJiYgcC5lbmQgPT09ICdlbmQnKSB7XG4gICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgIHJhbmdlLnNlbGVjdCgpO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIHBhcnNlKGVsLCBwLmVuZCkpO1xuICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgcGFyc2UoZWwsIHAuc3RhcnQpKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZSAoZWwsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gJ2VuZCcgPyBlbC52YWx1ZS5sZW5ndGggOiB2YWx1ZSB8fCAwO1xufVxuXG5mdW5jdGlvbiBzZWxsIChlbCwgcCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHNldChlbCwgcCk7XG4gIH1cbiAgcmV0dXJuIGdldChlbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VsbDtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHNlbGwgPSByZXF1aXJlKCdzZWxsJyk7XG52YXIgY3Jvc3N2ZW50ID0gcmVxdWlyZSgnY3Jvc3N2ZW50Jyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCcuL3Rocm90dGxlJyk7XG52YXIgcHJvcHMgPSBbXG4gICdkaXJlY3Rpb24nLFxuICAnYm94U2l6aW5nJyxcbiAgJ3dpZHRoJyxcbiAgJ2hlaWdodCcsXG4gICdvdmVyZmxvd1gnLFxuICAnb3ZlcmZsb3dZJyxcbiAgJ2JvcmRlclRvcFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdCb3R0b20nLFxuICAncGFkZGluZ0xlZnQnLFxuICAnZm9udFN0eWxlJyxcbiAgJ2ZvbnRWYXJpYW50JyxcbiAgJ2ZvbnRXZWlnaHQnLFxuICAnZm9udFN0cmV0Y2gnLFxuICAnZm9udFNpemUnLFxuICAnZm9udFNpemVBZGp1c3QnLFxuICAnbGluZUhlaWdodCcsXG4gICdmb250RmFtaWx5JyxcbiAgJ3RleHRBbGlnbicsXG4gICd0ZXh0VHJhbnNmb3JtJyxcbiAgJ3RleHRJbmRlbnQnLFxuICAndGV4dERlY29yYXRpb24nLFxuICAnbGV0dGVyU3BhY2luZycsXG4gICd3b3JkU3BhY2luZydcbl07XG52YXIgd2luID0gZ2xvYmFsO1xudmFyIGRvYyA9IGRvY3VtZW50O1xudmFyIGZmID0gd2luLm1veklubmVyU2NyZWVuWCAhPT0gbnVsbCAmJiB3aW4ubW96SW5uZXJTY3JlZW5YICE9PSB2b2lkIDA7XG5cbmZ1bmN0aW9uIHRhaWxvcm1hZGUgKGVsLCBvcHRpb25zKSB7XG4gIHZhciB0ZXh0SW5wdXQgPSBlbC50YWdOYW1lID09PSAnSU5QVVQnIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQSc7XG4gIHZhciB0aHJvdHRsZWRSZWZyZXNoID0gdGhyb3R0bGUocmVmcmVzaCwgMzApO1xuICB2YXIgbyA9IG9wdGlvbnMgfHwge307XG5cbiAgYmluZCgpO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZDogcmVhZFBvc2l0aW9uLFxuICAgIHJlZnJlc2g6IHRocm90dGxlZFJlZnJlc2gsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xuXG4gIGZ1bmN0aW9uIG5vb3AgKCkge31cbiAgZnVuY3Rpb24gcmVhZFBvc2l0aW9uICgpIHsgcmV0dXJuICh0ZXh0SW5wdXQgPyBjb29yZHNUZXh0IDogY29vcmRzSFRNTCkoKTsgfVxuXG4gIGZ1bmN0aW9uIHJlZnJlc2ggKCkge1xuICAgIGlmIChvLnNsZWVwaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiAoby51cGRhdGUgfHwgbm9vcCkocmVhZFBvc2l0aW9uKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29vcmRzVGV4dCAoKSB7XG4gICAgdmFyIHAgPSBzZWxsKGVsKTtcbiAgICB2YXIgY29udGV4dCA9IHByZXBhcmUoKTtcbiAgICB2YXIgcmVhZGluZ3MgPSByZWFkVGV4dENvb3Jkcyhjb250ZXh0LCBwLnN0YXJ0KTtcbiAgICBkb2MuYm9keS5yZW1vdmVDaGlsZChjb250ZXh0Lm1pcnJvcik7XG4gICAgcmV0dXJuIHJlYWRpbmdzO1xuICB9XG5cbiAgZnVuY3Rpb24gY29vcmRzSFRNTCAoKSB7XG4gICAgdmFyIHNlbCA9IChvLmdldFNlbGVjdGlvbiB8fCB3aW4uZ2V0U2VsZWN0aW9uKSgpO1xuICAgIGlmIChzZWwucmFuZ2VDb3VudCkge1xuICAgICAgdmFyIHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XG4gICAgICB2YXIgbmVlZHNUb1dvcmtBcm91bmROZXdsaW5lQnVnID0gcmFuZ2Uuc3RhcnRDb250YWluZXIubm9kZU5hbWUgPT09ICdQJyAmJiByYW5nZS5zdGFydE9mZnNldCA9PT0gMDtcbiAgICAgIGlmIChuZWVkc1RvV29ya0Fyb3VuZE5ld2xpbmVCdWcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiByYW5nZS5zdGFydENvbnRhaW5lci5vZmZzZXRMZWZ0LFxuICAgICAgICAgIHk6IHJhbmdlLnN0YXJ0Q29udGFpbmVyLm9mZnNldFRvcCxcbiAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKHJhbmdlLmdldENsaWVudFJlY3RzKSB7XG4gICAgICAgIHZhciByZWN0cyA9IHJhbmdlLmdldENsaWVudFJlY3RzKCk7XG4gICAgICAgIGlmIChyZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHJlY3RzWzBdLmxlZnQsXG4gICAgICAgICAgICB5OiByZWN0c1swXS50b3AsXG4gICAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgeDogMCwgeTogMCB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFRleHRDb29yZHMgKGNvbnRleHQsIHApIHtcbiAgICB2YXIgcmVzdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdmFyIG1pcnJvciA9IGNvbnRleHQubWlycm9yO1xuICAgIHZhciBjb21wdXRlZCA9IGNvbnRleHQuY29tcHV0ZWQ7XG5cbiAgICB3cml0ZShtaXJyb3IsIHJlYWQoZWwpLnN1YnN0cmluZygwLCBwKSk7XG5cbiAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgbWlycm9yLnRleHRDb250ZW50ID0gbWlycm9yLnRleHRDb250ZW50LnJlcGxhY2UoL1xccy9nLCAnXFx1MDBhMCcpO1xuICAgIH1cblxuICAgIHdyaXRlKHJlc3QsIHJlYWQoZWwpLnN1YnN0cmluZyhwKSB8fCAnLicpO1xuXG4gICAgbWlycm9yLmFwcGVuZENoaWxkKHJlc3QpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHJlc3Qub2Zmc2V0TGVmdCArIHBhcnNlSW50KGNvbXB1dGVkWydib3JkZXJMZWZ0V2lkdGgnXSksXG4gICAgICB5OiByZXN0Lm9mZnNldFRvcCArIHBhcnNlSW50KGNvbXB1dGVkWydib3JkZXJUb3BXaWR0aCddKVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChlbCkge1xuICAgIHJldHVybiB0ZXh0SW5wdXQgPyBlbC52YWx1ZSA6IGVsLmlubmVySFRNTDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXBhcmUgKCkge1xuICAgIHZhciBjb21wdXRlZCA9IHdpbi5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbCkgOiBlbC5jdXJyZW50U3R5bGU7XG4gICAgdmFyIG1pcnJvciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgc3R5bGUgPSBtaXJyb3Iuc3R5bGU7XG5cbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChtaXJyb3IpO1xuXG4gICAgaWYgKGVsLnRhZ05hbWUgIT09ICdJTlBVVCcpIHtcbiAgICAgIHN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnO1xuICAgIH1cbiAgICBzdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJztcbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIHByb3BzLmZvckVhY2goY29weSk7XG5cbiAgICBpZiAoZmYpIHtcbiAgICAgIHN0eWxlLndpZHRoID0gcGFyc2VJbnQoY29tcHV0ZWQud2lkdGgpIC0gMiArICdweCc7XG4gICAgICBpZiAoZWwuc2Nyb2xsSGVpZ2h0ID4gcGFyc2VJbnQoY29tcHV0ZWQuaGVpZ2h0KSkge1xuICAgICAgICBzdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB9XG4gICAgcmV0dXJuIHsgbWlycm9yOiBtaXJyb3IsIGNvbXB1dGVkOiBjb21wdXRlZCB9O1xuXG4gICAgZnVuY3Rpb24gY29weSAocHJvcCkge1xuICAgICAgc3R5bGVbcHJvcF0gPSBjb21wdXRlZFtwcm9wXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZSAoZWwsIHZhbHVlKSB7XG4gICAgaWYgKHRleHRJbnB1dCkge1xuICAgICAgZWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYmluZCAocmVtb3ZlKSB7XG4gICAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCAna2V5ZG93bicsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdrZXl1cCcsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdpbnB1dCcsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdwYXN0ZScsIHRocm90dGxlZFJlZnJlc2gpO1xuICAgIGNyb3NzdmVudFtvcF0oZWwsICdjaGFuZ2UnLCB0aHJvdHRsZWRSZWZyZXNoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICAgIGJpbmQodHJ1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0YWlsb3JtYWRlO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpZFd4c2MyVjVaUzkwWVdsc2IzSnRZV1JsTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2MyVnNiQ0E5SUhKbGNYVnBjbVVvSjNObGJHd25LVHRjYm5aaGNpQmpjbTl6YzNabGJuUWdQU0J5WlhGMWFYSmxLQ2RqY205emMzWmxiblFuS1R0Y2JuWmhjaUIwYUhKdmRIUnNaU0E5SUhKbGNYVnBjbVVvSnk0dmRHaHliM1IwYkdVbktUdGNiblpoY2lCd2NtOXdjeUE5SUZ0Y2JpQWdKMlJwY21WamRHbHZiaWNzWEc0Z0lDZGliM2hUYVhwcGJtY25MRnh1SUNBbmQybGtkR2duTEZ4dUlDQW5hR1ZwWjJoMEp5eGNiaUFnSjI5MlpYSm1iRzkzV0Njc1hHNGdJQ2R2ZG1WeVpteHZkMWtuTEZ4dUlDQW5ZbTl5WkdWeVZHOXdWMmxrZEdnbkxGeHVJQ0FuWW05eVpHVnlVbWxuYUhSWGFXUjBhQ2NzWEc0Z0lDZGliM0prWlhKQ2IzUjBiMjFYYVdSMGFDY3NYRzRnSUNkaWIzSmtaWEpNWldaMFYybGtkR2duTEZ4dUlDQW5jR0ZrWkdsdVoxUnZjQ2NzWEc0Z0lDZHdZV1JrYVc1blVtbG5hSFFuTEZ4dUlDQW5jR0ZrWkdsdVowSnZkSFJ2YlNjc1hHNGdJQ2R3WVdSa2FXNW5UR1ZtZENjc1hHNGdJQ2RtYjI1MFUzUjViR1VuTEZ4dUlDQW5abTl1ZEZaaGNtbGhiblFuTEZ4dUlDQW5abTl1ZEZkbGFXZG9kQ2NzWEc0Z0lDZG1iMjUwVTNSeVpYUmphQ2NzWEc0Z0lDZG1iMjUwVTJsNlpTY3NYRzRnSUNkbWIyNTBVMmw2WlVGa2FuVnpkQ2NzWEc0Z0lDZHNhVzVsU0dWcFoyaDBKeXhjYmlBZ0oyWnZiblJHWVcxcGJIa25MRnh1SUNBbmRHVjRkRUZzYVdkdUp5eGNiaUFnSjNSbGVIUlVjbUZ1YzJadmNtMG5MRnh1SUNBbmRHVjRkRWx1WkdWdWRDY3NYRzRnSUNkMFpYaDBSR1ZqYjNKaGRHbHZiaWNzWEc0Z0lDZHNaWFIwWlhKVGNHRmphVzVuSnl4Y2JpQWdKM2R2Y21SVGNHRmphVzVuSjF4dVhUdGNiblpoY2lCM2FXNGdQU0JuYkc5aVlXdzdYRzUyWVhJZ1pHOWpJRDBnWkc5amRXMWxiblE3WEc1MllYSWdabVlnUFNCM2FXNHViVzk2U1c1dVpYSlRZM0psWlc1WUlDRTlQU0J1ZFd4c0lDWW1JSGRwYmk1dGIzcEpibTVsY2xOamNtVmxibGdnSVQwOUlIWnZhV1FnTUR0Y2JseHVablZ1WTNScGIyNGdkR0ZwYkc5eWJXRmtaU0FvWld3c0lHOXdkR2x2Ym5NcElIdGNiaUFnZG1GeUlIUmxlSFJKYm5CMWRDQTlJR1ZzTG5SaFowNWhiV1VnUFQwOUlDZEpUbEJWVkNjZ2ZId2daV3d1ZEdGblRtRnRaU0E5UFQwZ0oxUkZXRlJCVWtWQkp6dGNiaUFnZG1GeUlIUm9jbTkwZEd4bFpGSmxabkpsYzJnZ1BTQjBhSEp2ZEhSc1pTaHlaV1p5WlhOb0xDQXpNQ2s3WEc0Z0lIWmhjaUJ2SUQwZ2IzQjBhVzl1Y3lCOGZDQjdmVHRjYmx4dUlDQmlhVzVrS0NrN1hHNWNiaUFnY21WMGRYSnVJSHRjYmlBZ0lDQnlaV0ZrT2lCeVpXRmtVRzl6YVhScGIyNHNYRzRnSUNBZ2NtVm1jbVZ6YURvZ2RHaHliM1IwYkdWa1VtVm1jbVZ6YUN4Y2JpQWdJQ0JrWlhOMGNtOTVPaUJrWlhOMGNtOTVYRzRnSUgwN1hHNWNiaUFnWm5WdVkzUnBiMjRnYm05dmNDQW9LU0I3ZlZ4dUlDQm1kVzVqZEdsdmJpQnlaV0ZrVUc5emFYUnBiMjRnS0NrZ2V5QnlaWFIxY200Z0tIUmxlSFJKYm5CMWRDQS9JR052YjNKa2MxUmxlSFFnT2lCamIyOXlaSE5JVkUxTUtTZ3BPeUI5WEc1Y2JpQWdablZ1WTNScGIyNGdjbVZtY21WemFDQW9LU0I3WEc0Z0lDQWdhV1lnS0c4dWMyeGxaWEJwYm1jcElIdGNiaUFnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlDaHZMblZ3WkdGMFpTQjhmQ0J1YjI5d0tTaHlaV0ZrVUc5emFYUnBiMjRvS1NrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmpiMjl5WkhOVVpYaDBJQ2dwSUh0Y2JpQWdJQ0IyWVhJZ2NDQTlJSE5sYkd3b1pXd3BPMXh1SUNBZ0lIWmhjaUJqYjI1MFpYaDBJRDBnY0hKbGNHRnlaU2dwTzF4dUlDQWdJSFpoY2lCeVpXRmthVzVuY3lBOUlISmxZV1JVWlhoMFEyOXZjbVJ6S0dOdmJuUmxlSFFzSUhBdWMzUmhjblFwTzF4dUlDQWdJR1J2WXk1aWIyUjVMbkpsYlc5MlpVTm9hV3hrS0dOdmJuUmxlSFF1YldseWNtOXlLVHRjYmlBZ0lDQnlaWFIxY200Z2NtVmhaR2x1WjNNN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQmpiMjl5WkhOSVZFMU1JQ2dwSUh0Y2JpQWdJQ0IyWVhJZ2MyVnNJRDBnS0c4dVoyVjBVMlZzWldOMGFXOXVJSHg4SUhkcGJpNW5aWFJUWld4bFkzUnBiMjRwS0NrN1hHNGdJQ0FnYVdZZ0tITmxiQzV5WVc1blpVTnZkVzUwS1NCN1hHNGdJQ0FnSUNCMllYSWdjbUZ1WjJVZ1BTQnpaV3d1WjJWMFVtRnVaMlZCZENnd0tUdGNiaUFnSUNBZ0lIWmhjaUJ1WldWa2MxUnZWMjl5YTBGeWIzVnVaRTVsZDJ4cGJtVkNkV2NnUFNCeVlXNW5aUzV6ZEdGeWRFTnZiblJoYVc1bGNpNXViMlJsVG1GdFpTQTlQVDBnSjFBbklDWW1JSEpoYm1kbExuTjBZWEowVDJabWMyVjBJRDA5UFNBd08xeHVJQ0FnSUNBZ2FXWWdLRzVsWldSelZHOVhiM0pyUVhKdmRXNWtUbVYzYkdsdVpVSjFaeWtnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnSUNBZ0lIZzZJSEpoYm1kbExuTjBZWEowUTI5dWRHRnBibVZ5TG05bVpuTmxkRXhsWm5Rc1hHNGdJQ0FnSUNBZ0lDQWdlVG9nY21GdVoyVXVjM1JoY25SRGIyNTBZV2x1WlhJdWIyWm1jMlYwVkc5d0xGeHVJQ0FnSUNBZ0lDQWdJR0ZpYzI5c2RYUmxPaUIwY25WbFhHNGdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnBaaUFvY21GdVoyVXVaMlYwUTJ4cFpXNTBVbVZqZEhNcElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUhKbFkzUnpJRDBnY21GdVoyVXVaMlYwUTJ4cFpXNTBVbVZqZEhNb0tUdGNiaUFnSUNBZ0lDQWdhV1lnS0hKbFkzUnpMbXhsYm1kMGFDQStJREFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZURvZ2NtVmpkSE5iTUYwdWJHVm1kQ3hjYmlBZ0lDQWdJQ0FnSUNBZ0lIazZJSEpsWTNSeld6QmRMblJ2Y0N4Y2JpQWdJQ0FnSUNBZ0lDQWdJR0ZpYzI5c2RYUmxPaUIwY25WbFhHNGdJQ0FnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z2V5QjRPaUF3TENCNU9pQXdJSDA3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCeVpXRmtWR1Y0ZEVOdmIzSmtjeUFvWTI5dWRHVjRkQ3dnY0NrZ2UxeHVJQ0FnSUhaaGNpQnlaWE4wSUQwZ1pHOWpMbU55WldGMFpVVnNaVzFsYm5Rb0ozTndZVzRuS1R0Y2JpQWdJQ0IyWVhJZ2JXbHljbTl5SUQwZ1kyOXVkR1Y0ZEM1dGFYSnliM0k3WEc0Z0lDQWdkbUZ5SUdOdmJYQjFkR1ZrSUQwZ1kyOXVkR1Y0ZEM1amIyMXdkWFJsWkR0Y2JseHVJQ0FnSUhkeWFYUmxLRzFwY25KdmNpd2djbVZoWkNobGJDa3VjM1ZpYzNSeWFXNW5LREFzSUhBcEtUdGNibHh1SUNBZ0lHbG1JQ2hsYkM1MFlXZE9ZVzFsSUQwOVBTQW5TVTVRVlZRbktTQjdYRzRnSUNBZ0lDQnRhWEp5YjNJdWRHVjRkRU52Ym5SbGJuUWdQU0J0YVhKeWIzSXVkR1Y0ZEVOdmJuUmxiblF1Y21Wd2JHRmpaU2d2WEZ4ekwyY3NJQ2RjWEhVd01HRXdKeWs3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdkM0pwZEdVb2NtVnpkQ3dnY21WaFpDaGxiQ2t1YzNWaWMzUnlhVzVuS0hBcElIeDhJQ2N1SnlrN1hHNWNiaUFnSUNCdGFYSnliM0l1WVhCd1pXNWtRMmhwYkdRb2NtVnpkQ2s3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdlRG9nY21WemRDNXZabVp6WlhSTVpXWjBJQ3NnY0dGeWMyVkpiblFvWTI5dGNIVjBaV1JiSjJKdmNtUmxja3hsWm5SWGFXUjBhQ2RkS1N4Y2JpQWdJQ0FnSUhrNklISmxjM1F1YjJabWMyVjBWRzl3SUNzZ2NHRnljMlZKYm5Rb1kyOXRjSFYwWldSYkoySnZjbVJsY2xSdmNGZHBaSFJvSjEwcFhHNGdJQ0FnZlR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlISmxZV1FnS0dWc0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUhSbGVIUkpibkIxZENBL0lHVnNMblpoYkhWbElEb2daV3d1YVc1dVpYSklWRTFNTzF4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2NISmxjR0Z5WlNBb0tTQjdYRzRnSUNBZ2RtRnlJR052YlhCMWRHVmtJRDBnZDJsdUxtZGxkRU52YlhCMWRHVmtVM1I1YkdVZ1B5Qm5aWFJEYjIxd2RYUmxaRk4wZVd4bEtHVnNLU0E2SUdWc0xtTjFjbkpsYm5SVGRIbHNaVHRjYmlBZ0lDQjJZWElnYldseWNtOXlJRDBnWkc5akxtTnlaV0YwWlVWc1pXMWxiblFvSjJScGRpY3BPMXh1SUNBZ0lIWmhjaUJ6ZEhsc1pTQTlJRzFwY25KdmNpNXpkSGxzWlR0Y2JseHVJQ0FnSUdSdll5NWliMlI1TG1Gd2NHVnVaRU5vYVd4a0tHMXBjbkp2Y2lrN1hHNWNiaUFnSUNCcFppQW9aV3d1ZEdGblRtRnRaU0FoUFQwZ0owbE9VRlZVSnlrZ2UxeHVJQ0FnSUNBZ2MzUjViR1V1ZDI5eVpGZHlZWEFnUFNBblluSmxZV3N0ZDI5eVpDYzdYRzRnSUNBZ2ZWeHVJQ0FnSUhOMGVXeGxMbmRvYVhSbFUzQmhZMlVnUFNBbmNISmxMWGR5WVhBbk8xeHVJQ0FnSUhOMGVXeGxMbkJ2YzJsMGFXOXVJRDBnSjJGaWMyOXNkWFJsSnp0Y2JpQWdJQ0J6ZEhsc1pTNTJhWE5wWW1sc2FYUjVJRDBnSjJocFpHUmxiaWM3WEc0Z0lDQWdjSEp2Y0hNdVptOXlSV0ZqYUNoamIzQjVLVHRjYmx4dUlDQWdJR2xtSUNobVppa2dlMXh1SUNBZ0lDQWdjM1I1YkdVdWQybGtkR2dnUFNCd1lYSnpaVWx1ZENoamIyMXdkWFJsWkM1M2FXUjBhQ2tnTFNBeUlDc2dKM0I0Snp0Y2JpQWdJQ0FnSUdsbUlDaGxiQzV6WTNKdmJHeElaV2xuYUhRZ1BpQndZWEp6WlVsdWRDaGpiMjF3ZFhSbFpDNW9aV2xuYUhRcEtTQjdYRzRnSUNBZ0lDQWdJSE4wZVd4bExtOTJaWEptYkc5M1dTQTlJQ2R6WTNKdmJHd25PMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCemRIbHNaUzV2ZG1WeVpteHZkeUE5SUNkb2FXUmtaVzRuTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z2V5QnRhWEp5YjNJNklHMXBjbkp2Y2l3Z1kyOXRjSFYwWldRNklHTnZiWEIxZEdWa0lIMDdYRzVjYmlBZ0lDQm1kVzVqZEdsdmJpQmpiM0I1SUNod2NtOXdLU0I3WEc0Z0lDQWdJQ0J6ZEhsc1pWdHdjbTl3WFNBOUlHTnZiWEIxZEdWa1czQnliM0JkTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdaMWJtTjBhVzl1SUhkeWFYUmxJQ2hsYkN3Z2RtRnNkV1VwSUh0Y2JpQWdJQ0JwWmlBb2RHVjRkRWx1Y0hWMEtTQjdYRzRnSUNBZ0lDQmxiQzUwWlhoMFEyOXVkR1Z1ZENBOUlIWmhiSFZsTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQmxiQzVwYm01bGNraFVUVXdnUFNCMllXeDFaVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJpYVc1a0lDaHlaVzF2ZG1VcElIdGNiaUFnSUNCMllYSWdiM0FnUFNCeVpXMXZkbVVnUHlBbmNtVnRiM1psSnlBNklDZGhaR1FuTzF4dUlDQWdJR055YjNOemRtVnVkRnR2Y0Ywb1pXd3NJQ2RyWlhsa2IzZHVKeXdnZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNobGJDd2dKMnRsZVhWd0p5d2dkR2h5YjNSMGJHVmtVbVZtY21WemFDazdYRzRnSUNBZ1kzSnZjM04yWlc1MFcyOXdYU2hsYkN3Z0oybHVjSFYwSnl3Z2RHaHliM1IwYkdWa1VtVm1jbVZ6YUNrN1hHNGdJQ0FnWTNKdmMzTjJaVzUwVzI5d1hTaGxiQ3dnSjNCaGMzUmxKeXdnZEdoeWIzUjBiR1ZrVW1WbWNtVnphQ2s3WEc0Z0lDQWdZM0p2YzNOMlpXNTBXMjl3WFNobGJDd2dKMk5vWVc1blpTY3NJSFJvY205MGRHeGxaRkpsWm5KbGMyZ3BPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWkdWemRISnZlU0FvS1NCN1hHNGdJQ0FnWW1sdVpDaDBjblZsS1R0Y2JpQWdmVnh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIUmhhV3h2Y20xaFpHVTdYRzRpWFgwPSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gdGhyb3R0bGUgKGZuLCBib3VuZGFyeSkge1xuICB2YXIgbGFzdCA9IC1JbmZpbml0eTtcbiAgdmFyIHRpbWVyO1xuICByZXR1cm4gZnVuY3Rpb24gYm91bmNlZCAoKSB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHVuYm91bmQoKTtcblxuICAgIGZ1bmN0aW9uIHVuYm91bmQgKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIHZhciBuZXh0ID0gbGFzdCArIGJvdW5kYXJ5O1xuICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICBpZiAobm93ID4gbmV4dCkge1xuICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICBmbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KHVuYm91bmQsIG5leHQgLSBub3cpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcblxudmFyIE5hdGl2ZUN1c3RvbUV2ZW50ID0gZ2xvYmFsLkN1c3RvbUV2ZW50O1xuXG5mdW5jdGlvbiB1c2VOYXRpdmUgKCkge1xuICB0cnkge1xuICAgIHZhciBwID0gbmV3IE5hdGl2ZUN1c3RvbUV2ZW50KCdjYXQnLCB7IGRldGFpbDogeyBmb286ICdiYXInIH0gfSk7XG4gICAgcmV0dXJuICAnY2F0JyA9PT0gcC50eXBlICYmICdiYXInID09PSBwLmRldGFpbC5mb287XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ3Jvc3MtYnJvd3NlciBgQ3VzdG9tRXZlbnRgIGNvbnN0cnVjdG9yLlxuICpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudC5DdXN0b21FdmVudFxuICpcbiAqIEBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZU5hdGl2ZSgpID8gTmF0aXZlQ3VzdG9tRXZlbnQgOlxuXG4vLyBJRSA+PSA5XG4nZnVuY3Rpb24nID09PSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRXZlbnQgPyBmdW5jdGlvbiBDdXN0b21FdmVudCAodHlwZSwgcGFyYW1zKSB7XG4gIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gIGlmIChwYXJhbXMpIHtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICB9IGVsc2Uge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgdm9pZCAwKTtcbiAgfVxuICByZXR1cm4gZTtcbn0gOlxuXG4vLyBJRSA8PSA4XG5mdW5jdGlvbiBDdXN0b21FdmVudCAodHlwZSwgcGFyYW1zKSB7XG4gIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgZS50eXBlID0gdHlwZTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuYnViYmxlcyA9IEJvb2xlYW4ocGFyYW1zLmJ1YmJsZXMpO1xuICAgIGUuY2FuY2VsYWJsZSA9IEJvb2xlYW4ocGFyYW1zLmNhbmNlbGFibGUpO1xuICAgIGUuZGV0YWlsID0gcGFyYW1zLmRldGFpbDtcbiAgfSBlbHNlIHtcbiAgICBlLmJ1YmJsZXMgPSBmYWxzZTtcbiAgICBlLmNhbmNlbGFibGUgPSBmYWxzZTtcbiAgICBlLmRldGFpbCA9IHZvaWQgMDtcbiAgfVxuICByZXR1cm4gZTtcbn1cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5amNtOXpjM1psYm5RdmJtOWtaVjl0YjJSMWJHVnpMMk4xYzNSdmJTMWxkbVZ1ZEM5cGJtUmxlQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbHh1ZG1GeUlFNWhkR2wyWlVOMWMzUnZiVVYyWlc1MElEMGdaMnh2WW1Gc0xrTjFjM1J2YlVWMlpXNTBPMXh1WEc1bWRXNWpkR2x2YmlCMWMyVk9ZWFJwZG1VZ0tDa2dlMXh1SUNCMGNua2dlMXh1SUNBZ0lIWmhjaUJ3SUQwZ2JtVjNJRTVoZEdsMlpVTjFjM1J2YlVWMlpXNTBLQ2RqWVhRbkxDQjdJR1JsZEdGcGJEb2dleUJtYjI4NklDZGlZWEluSUgwZ2ZTazdYRzRnSUNBZ2NtVjBkWEp1SUNBblkyRjBKeUE5UFQwZ2NDNTBlWEJsSUNZbUlDZGlZWEluSUQwOVBTQndMbVJsZEdGcGJDNW1iMjg3WEc0Z0lIMGdZMkYwWTJnZ0tHVXBJSHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNTlYRzVjYmk4cUtseHVJQ29nUTNKdmMzTXRZbkp2ZDNObGNpQmdRM1Z6ZEc5dFJYWmxiblJnSUdOdmJuTjBjblZqZEc5eUxseHVJQ3BjYmlBcUlHaDBkSEJ6T2k4dlpHVjJaV3h2Y0dWeUxtMXZlbWxzYkdFdWIzSm5MMlZ1TFZWVEwyUnZZM012VjJWaUwwRlFTUzlEZFhOMGIyMUZkbVZ1ZEM1RGRYTjBiMjFGZG1WdWRGeHVJQ3BjYmlBcUlFQndkV0pzYVdOY2JpQXFMMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhWelpVNWhkR2wyWlNncElEOGdUbUYwYVhabFEzVnpkRzl0UlhabGJuUWdPbHh1WEc0dkx5QkpSU0ErUFNBNVhHNG5ablZ1WTNScGIyNG5JRDA5UFNCMGVYQmxiMllnWkc5amRXMWxiblF1WTNKbFlYUmxSWFpsYm5RZ1B5Qm1kVzVqZEdsdmJpQkRkWE4wYjIxRmRtVnVkQ0FvZEhsd1pTd2djR0Z5WVcxektTQjdYRzRnSUhaaGNpQmxJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSWFpsYm5Rb0owTjFjM1J2YlVWMlpXNTBKeWs3WEc0Z0lHbG1JQ2h3WVhKaGJYTXBJSHRjYmlBZ0lDQmxMbWx1YVhSRGRYTjBiMjFGZG1WdWRDaDBlWEJsTENCd1lYSmhiWE11WW5WaVlteGxjeXdnY0dGeVlXMXpMbU5oYm1ObGJHRmliR1VzSUhCaGNtRnRjeTVrWlhSaGFXd3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJR1V1YVc1cGRFTjFjM1J2YlVWMlpXNTBLSFI1Y0dVc0lHWmhiSE5sTENCbVlXeHpaU3dnZG05cFpDQXdLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdaVHRjYm4wZ09seHVYRzR2THlCSlJTQThQU0E0WEc1bWRXNWpkR2x2YmlCRGRYTjBiMjFGZG1WdWRDQW9kSGx3WlN3Z2NHRnlZVzF6S1NCN1hHNGdJSFpoY2lCbElEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJYWmxiblJQWW1wbFkzUW9LVHRjYmlBZ1pTNTBlWEJsSUQwZ2RIbHdaVHRjYmlBZ2FXWWdLSEJoY21GdGN5a2dlMXh1SUNBZ0lHVXVZblZpWW14bGN5QTlJRUp2YjJ4bFlXNG9jR0Z5WVcxekxtSjFZbUpzWlhNcE8xeHVJQ0FnSUdVdVkyRnVZMlZzWVdKc1pTQTlJRUp2YjJ4bFlXNG9jR0Z5WVcxekxtTmhibU5sYkdGaWJHVXBPMXh1SUNBZ0lHVXVaR1YwWVdsc0lEMGdjR0Z5WVcxekxtUmxkR0ZwYkR0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCbExtSjFZbUpzWlhNZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0JsTG1OaGJtTmxiR0ZpYkdVZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0JsTG1SbGRHRnBiQ0E5SUhadmFXUWdNRHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdaVHRjYm4xY2JpSmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3VzdG9tRXZlbnQgPSByZXF1aXJlKCdjdXN0b20tZXZlbnQnKTtcbnZhciBldmVudG1hcCA9IHJlcXVpcmUoJy4vZXZlbnRtYXAnKTtcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBhZGRFdmVudCA9IGFkZEV2ZW50RWFzeTtcbnZhciByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50RWFzeTtcbnZhciBoYXJkQ2FjaGUgPSBbXTtcblxuaWYgKCFnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICBhZGRFdmVudCA9IGFkZEV2ZW50SGFyZDtcbiAgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEhhcmQ7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50RWFzeSAoZWwsIHR5cGUsIGZuLCBjYXB0dXJpbmcpIHtcbiAgcmV0dXJuIGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGNhcHR1cmluZyk7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50SGFyZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBlbC5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgd3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgcmV0dXJuIGVsLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCB1bndyYXAoZWwsIHR5cGUsIGZuKSk7XG59XG5cbmZ1bmN0aW9uIGZhYnJpY2F0ZUV2ZW50IChlbCwgdHlwZSwgbW9kZWwpIHtcbiAgdmFyIGUgPSBldmVudG1hcC5pbmRleE9mKHR5cGUpID09PSAtMSA/IG1ha2VDdXN0b21FdmVudCgpIDogbWFrZUNsYXNzaWNFdmVudCgpO1xuICBpZiAoZWwuZGlzcGF0Y2hFdmVudCkge1xuICAgIGVsLmRpc3BhdGNoRXZlbnQoZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuZmlyZUV2ZW50KCdvbicgKyB0eXBlLCBlKTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ2xhc3NpY0V2ZW50ICgpIHtcbiAgICB2YXIgZTtcbiAgICBpZiAoZG9jLmNyZWF0ZUV2ZW50KSB7XG4gICAgICBlID0gZG9jLmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgZS5pbml0RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIGU7XG4gIH1cbiAgZnVuY3Rpb24gbWFrZUN1c3RvbUV2ZW50ICgpIHtcbiAgICByZXR1cm4gbmV3IGN1c3RvbUV2ZW50KHR5cGUsIHsgZGV0YWlsOiBtb2RlbCB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwcGVyRmFjdG9yeSAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwcGVyIChvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSBvcmlnaW5hbEV2ZW50IHx8IGdsb2JhbC5ldmVudDtcbiAgICBlLnRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0ID0gZS5wcmV2ZW50RGVmYXVsdCB8fCBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdCAoKSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbiA9IGUuc3RvcFByb3BhZ2F0aW9uIHx8IGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbiAoKSB7IGUuY2FuY2VsQnViYmxlID0gdHJ1ZTsgfTtcbiAgICBlLndoaWNoID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgZm4uY2FsbChlbCwgZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgd3JhcHBlciA9IHVud3JhcChlbCwgdHlwZSwgZm4pIHx8IHdyYXBwZXJGYWN0b3J5KGVsLCB0eXBlLCBmbik7XG4gIGhhcmRDYWNoZS5wdXNoKHtcbiAgICB3cmFwcGVyOiB3cmFwcGVyLFxuICAgIGVsZW1lbnQ6IGVsLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgZm46IGZuXG4gIH0pO1xuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuZnVuY3Rpb24gdW53cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGkgPSBmaW5kKGVsLCB0eXBlLCBmbik7XG4gIGlmIChpKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBoYXJkQ2FjaGVbaV0ud3JhcHBlcjtcbiAgICBoYXJkQ2FjaGUuc3BsaWNlKGksIDEpOyAvLyBmcmVlIHVwIGEgdGFkIG9mIG1lbW9yeVxuICAgIHJldHVybiB3cmFwcGVyO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmQgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSwgaXRlbTtcbiAgZm9yIChpID0gMDsgaSA8IGhhcmRDYWNoZS5sZW5ndGg7IGkrKykge1xuICAgIGl0ZW0gPSBoYXJkQ2FjaGVbaV07XG4gICAgaWYgKGl0ZW0uZWxlbWVudCA9PT0gZWwgJiYgaXRlbS50eXBlID09PSB0eXBlICYmIGl0ZW0uZm4gPT09IGZuKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZDogYWRkRXZlbnQsXG4gIHJlbW92ZTogcmVtb3ZlRXZlbnQsXG4gIGZhYnJpY2F0ZTogZmFicmljYXRlRXZlbnRcbn07XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWpjbTl6YzNabGJuUXZjM0pqTDJOeWIzTnpkbVZ1ZEM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCamRYTjBiMjFGZG1WdWRDQTlJSEpsY1hWcGNtVW9KMk4xYzNSdmJTMWxkbVZ1ZENjcE8xeHVkbUZ5SUdWMlpXNTBiV0Z3SUQwZ2NtVnhkV2x5WlNnbkxpOWxkbVZ1ZEcxaGNDY3BPMXh1ZG1GeUlHUnZZeUE5SUdSdlkzVnRaVzUwTzF4dWRtRnlJR0ZrWkVWMlpXNTBJRDBnWVdSa1JYWmxiblJGWVhONU8xeHVkbUZ5SUhKbGJXOTJaVVYyWlc1MElEMGdjbVZ0YjNabFJYWmxiblJGWVhONU8xeHVkbUZ5SUdoaGNtUkRZV05vWlNBOUlGdGRPMXh1WEc1cFppQW9JV2RzYjJKaGJDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtTQjdYRzRnSUdGa1pFVjJaVzUwSUQwZ1lXUmtSWFpsYm5SSVlYSmtPMXh1SUNCeVpXMXZkbVZGZG1WdWRDQTlJSEpsYlc5MlpVVjJaVzUwU0dGeVpEdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1lXUmtSWFpsYm5SRllYTjVJQ2hsYkN3Z2RIbHdaU3dnWm00c0lHTmhjSFIxY21sdVp5a2dlMXh1SUNCeVpYUjFjbTRnWld3dVlXUmtSWFpsYm5STWFYTjBaVzVsY2loMGVYQmxMQ0JtYml3Z1kyRndkSFZ5YVc1bktUdGNibjFjYmx4dVpuVnVZM1JwYjI0Z1lXUmtSWFpsYm5SSVlYSmtJQ2hsYkN3Z2RIbHdaU3dnWm00cElIdGNiaUFnY21WMGRYSnVJR1ZzTG1GMGRHRmphRVYyWlc1MEtDZHZiaWNnS3lCMGVYQmxMQ0IzY21Gd0tHVnNMQ0IwZVhCbExDQm1iaWtwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WlcxdmRtVkZkbVZ1ZEVWaGMza2dLR1ZzTENCMGVYQmxMQ0JtYml3Z1kyRndkSFZ5YVc1bktTQjdYRzRnSUhKbGRIVnliaUJsYkM1eVpXMXZkbVZGZG1WdWRFeHBjM1JsYm1WeUtIUjVjR1VzSUdadUxDQmpZWEIwZFhKcGJtY3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaVzF2ZG1WRmRtVnVkRWhoY21RZ0tHVnNMQ0IwZVhCbExDQm1iaWtnZTF4dUlDQnlaWFIxY200Z1pXd3VaR1YwWVdOb1JYWmxiblFvSjI5dUp5QXJJSFI1Y0dVc0lIVnVkM0poY0NobGJDd2dkSGx3WlN3Z1ptNHBLVHRjYm4xY2JseHVablZ1WTNScGIyNGdabUZpY21sallYUmxSWFpsYm5RZ0tHVnNMQ0IwZVhCbExDQnRiMlJsYkNrZ2UxeHVJQ0IyWVhJZ1pTQTlJR1YyWlc1MGJXRndMbWx1WkdWNFQyWW9kSGx3WlNrZ1BUMDlJQzB4SUQ4Z2JXRnJaVU4xYzNSdmJVVjJaVzUwS0NrZ09pQnRZV3RsUTJ4aGMzTnBZMFYyWlc1MEtDazdYRzRnSUdsbUlDaGxiQzVrYVhOd1lYUmphRVYyWlc1MEtTQjdYRzRnSUNBZ1pXd3VaR2x6Y0dGMFkyaEZkbVZ1ZENobEtUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQmxiQzVtYVhKbFJYWmxiblFvSjI5dUp5QXJJSFI1Y0dVc0lHVXBPMXh1SUNCOVhHNGdJR1oxYm1OMGFXOXVJRzFoYTJWRGJHRnpjMmxqUlhabGJuUWdLQ2tnZTF4dUlDQWdJSFpoY2lCbE8xeHVJQ0FnSUdsbUlDaGtiMk11WTNKbFlYUmxSWFpsYm5RcElIdGNiaUFnSUNBZ0lHVWdQU0JrYjJNdVkzSmxZWFJsUlhabGJuUW9KMFYyWlc1MEp5azdYRzRnSUNBZ0lDQmxMbWx1YVhSRmRtVnVkQ2gwZVhCbExDQjBjblZsTENCMGNuVmxLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLR1J2WXk1amNtVmhkR1ZGZG1WdWRFOWlhbVZqZENrZ2UxeHVJQ0FnSUNBZ1pTQTlJR1J2WXk1amNtVmhkR1ZGZG1WdWRFOWlhbVZqZENncE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdaVHRjYmlBZ2ZWeHVJQ0JtZFc1amRHbHZiaUJ0WVd0bFEzVnpkRzl0UlhabGJuUWdLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQnVaWGNnWTNWemRHOXRSWFpsYm5Rb2RIbHdaU3dnZXlCa1pYUmhhV3c2SUcxdlpHVnNJSDBwTzF4dUlDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlIZHlZWEJ3WlhKR1lXTjBiM0o1SUNobGJDd2dkSGx3WlN3Z1ptNHBJSHRjYmlBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUhkeVlYQndaWElnS0c5eWFXZHBibUZzUlhabGJuUXBJSHRjYmlBZ0lDQjJZWElnWlNBOUlHOXlhV2RwYm1Gc1JYWmxiblFnZkh3Z1oyeHZZbUZzTG1WMlpXNTBPMXh1SUNBZ0lHVXVkR0Z5WjJWMElEMGdaUzUwWVhKblpYUWdmSHdnWlM1emNtTkZiR1Z0Wlc1ME8xeHVJQ0FnSUdVdWNISmxkbVZ1ZEVSbFptRjFiSFFnUFNCbExuQnlaWFpsYm5SRVpXWmhkV3gwSUh4OElHWjFibU4wYVc5dUlIQnlaWFpsYm5SRVpXWmhkV3gwSUNncElIc2daUzV5WlhSMWNtNVdZV3gxWlNBOUlHWmhiSE5sT3lCOU8xeHVJQ0FnSUdVdWMzUnZjRkJ5YjNCaFoyRjBhVzl1SUQwZ1pTNXpkRzl3VUhKdmNHRm5ZWFJwYjI0Z2ZId2dablZ1WTNScGIyNGdjM1J2Y0ZCeWIzQmhaMkYwYVc5dUlDZ3BJSHNnWlM1allXNWpaV3hDZFdKaWJHVWdQU0IwY25WbE95QjlPMXh1SUNBZ0lHVXVkMmhwWTJnZ1BTQmxMbmRvYVdOb0lIeDhJR1V1YTJWNVEyOWtaVHRjYmlBZ0lDQm1iaTVqWVd4c0tHVnNMQ0JsS1R0Y2JpQWdmVHRjYm4xY2JseHVablZ1WTNScGIyNGdkM0poY0NBb1pXd3NJSFI1Y0dVc0lHWnVLU0I3WEc0Z0lIWmhjaUIzY21Gd2NHVnlJRDBnZFc1M2NtRndLR1ZzTENCMGVYQmxMQ0JtYmlrZ2ZId2dkM0poY0hCbGNrWmhZM1J2Y25rb1pXd3NJSFI1Y0dVc0lHWnVLVHRjYmlBZ2FHRnlaRU5oWTJobExuQjFjMmdvZTF4dUlDQWdJSGR5WVhCd1pYSTZJSGR5WVhCd1pYSXNYRzRnSUNBZ1pXeGxiV1Z1ZERvZ1pXd3NYRzRnSUNBZ2RIbHdaVG9nZEhsd1pTeGNiaUFnSUNCbWJqb2dabTVjYmlBZ2ZTazdYRzRnSUhKbGRIVnliaUIzY21Gd2NHVnlPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjFibmR5WVhBZ0tHVnNMQ0IwZVhCbExDQm1iaWtnZTF4dUlDQjJZWElnYVNBOUlHWnBibVFvWld3c0lIUjVjR1VzSUdadUtUdGNiaUFnYVdZZ0tHa3BJSHRjYmlBZ0lDQjJZWElnZDNKaGNIQmxjaUE5SUdoaGNtUkRZV05vWlZ0cFhTNTNjbUZ3Y0dWeU8xeHVJQ0FnSUdoaGNtUkRZV05vWlM1emNHeHBZMlVvYVN3Z01TazdJQzh2SUdaeVpXVWdkWEFnWVNCMFlXUWdiMllnYldWdGIzSjVYRzRnSUNBZ2NtVjBkWEp1SUhkeVlYQndaWEk3WEc0Z0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z1ptbHVaQ0FvWld3c0lIUjVjR1VzSUdadUtTQjdYRzRnSUhaaGNpQnBMQ0JwZEdWdE8xeHVJQ0JtYjNJZ0tHa2dQU0F3T3lCcElEd2dhR0Z5WkVOaFkyaGxMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnYVhSbGJTQTlJR2hoY21SRFlXTm9aVnRwWFR0Y2JpQWdJQ0JwWmlBb2FYUmxiUzVsYkdWdFpXNTBJRDA5UFNCbGJDQW1KaUJwZEdWdExuUjVjR1VnUFQwOUlIUjVjR1VnSmlZZ2FYUmxiUzVtYmlBOVBUMGdabTRwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUh0Y2JpQWdZV1JrT2lCaFpHUkZkbVZ1ZEN4Y2JpQWdjbVZ0YjNabE9pQnlaVzF2ZG1WRmRtVnVkQ3hjYmlBZ1ptRmljbWxqWVhSbE9pQm1ZV0p5YVdOaGRHVkZkbVZ1ZEZ4dWZUdGNiaUpkZlE9PSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGV2ZW50bWFwID0gW107XG52YXIgZXZlbnRuYW1lID0gJyc7XG52YXIgcm9uID0gL15vbi87XG5cbmZvciAoZXZlbnRuYW1lIGluIGdsb2JhbCkge1xuICBpZiAocm9uLnRlc3QoZXZlbnRuYW1lKSkge1xuICAgIGV2ZW50bWFwLnB1c2goZXZlbnRuYW1lLnNsaWNlKDIpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50bWFwO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlqY205emMzWmxiblF2YzNKakwyVjJaVzUwYldGd0xtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUluZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCbGRtVnVkRzFoY0NBOUlGdGRPMXh1ZG1GeUlHVjJaVzUwYm1GdFpTQTlJQ2NuTzF4dWRtRnlJSEp2YmlBOUlDOWViMjR2TzF4dVhHNW1iM0lnS0dWMlpXNTBibUZ0WlNCcGJpQm5iRzlpWVd3cElIdGNiaUFnYVdZZ0tISnZiaTUwWlhOMEtHVjJaVzUwYm1GdFpTa3BJSHRjYmlBZ0lDQmxkbVZ1ZEcxaGNDNXdkWE5vS0dWMlpXNTBibUZ0WlM1emJHbGpaU2d5S1NrN1hHNGdJSDFjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQmxkbVZ1ZEcxaGNEdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZnV6enlzZWFyY2ggKG5lZWRsZSwgaGF5c3RhY2spIHtcbiAgdmFyIHRsZW4gPSBoYXlzdGFjay5sZW5ndGg7XG4gIHZhciBxbGVuID0gbmVlZGxlLmxlbmd0aDtcbiAgaWYgKHFsZW4gPiB0bGVuKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChxbGVuID09PSB0bGVuKSB7XG4gICAgcmV0dXJuIG5lZWRsZSA9PT0gaGF5c3RhY2s7XG4gIH1cbiAgb3V0ZXI6IGZvciAodmFyIGkgPSAwLCBqID0gMDsgaSA8IHFsZW47IGkrKykge1xuICAgIHZhciBuY2ggPSBuZWVkbGUuY2hhckNvZGVBdChpKTtcbiAgICB3aGlsZSAoaiA8IHRsZW4pIHtcbiAgICAgIGlmIChoYXlzdGFjay5jaGFyQ29kZUF0KGorKykgPT09IG5jaCkge1xuICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1enp5c2VhcmNoO1xuIl19
